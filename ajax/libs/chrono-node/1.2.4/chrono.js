!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.chrono=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//! moment.js
//! version : 2.10.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = getParsingFlags(from);
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(+config._d);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function Locale() {
    }

    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && typeof module !== 'undefined' &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (typeof values === 'undefined') {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, values) {
        if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
                locales[name] = new Locale();
            }
            locales[name].set(values);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function get_set__set (mom, unit, value) {
        return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = typeof regex === 'function' ? regex : function (isStrict) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  matchWord);
    addRegexToken('MMMM', matchWord);

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m) {
        return this._months[m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m) {
        return this._monthsShort[m.month()];
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true,
            msgWithStack = msg + '\n' + (new Error()).stack;

        return extend(function () {
            if (firstTime) {
                warn(msgWithStack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;

    var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
        ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
        ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d{2}/],
        ['YYYY-DDD', /\d{4}-\d{3}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
        ['HH:mm', /(T| )\d\d:\d\d/],
        ['HH', /(T| )\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = from_string__isoRegex.exec(string);

        if (match) {
            getParsingFlags(config).iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be 'T' or undefined
                    config._f = isoDates[i][0] + (match[6] || ' ');
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(matchOffset)) {
                config._f += 'Z';
            }
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYY', 'YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', false);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = createUTCDate(year, 0, 1).getUTCDay();
        var daysToAdd;
        var dayOfYear;

        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year      : dayOfYear > 0 ? year      : year - 1,
            dayOfYear : dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];
        }
        return [now.getFullYear(), now.getMonth(), now.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond];

        configFromArray(config);
    }

    function createFromConfig (config) {
        var input = config._i,
            format = config._f,
            res;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        res = new Moment(checkOverflow(config));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             return other < this ? this : other;
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            return other > this ? this : other;
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchOffset);
    addRegexToken('ZZ', matchOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(string) {
        var matches = ((string || '').match(matchOffset) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
        return model._isUTC ? local__createLocal(input).zone(model._offset || 0) : local__createLocal(input).local();
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(input);
            }
            if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!input) {
            input = 0;
        }
        else {
            input = local__createLocal(input).utcOffset();
        }

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (this._a) {
            var other = this._isUTC ? create_utc__createUTC(this._a) : local__createLocal(this._a);
            return this.isValid() && compareArrays(this._a, other.toArray()) > 0;
        }

        return false;
    }

    function isLocal () {
        return !this._isUTC;
    }

    function isUtcOffset () {
        return this._isUTC;
    }

    function isUtc () {
        return this._isUTC && this._offset === 0;
    }

    var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    var create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = create__isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                d : parseIso(match[4], sign),
                h : parseIso(match[5], sign),
                m : parseIso(match[6], sign),
                s : parseIso(match[7], sign),
                w : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
        return this.format(this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var inputMs;
        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this > +input;
        } else {
            inputMs = isMoment(input) ? +input : +local__createLocal(input);
            return inputMs < +this.clone().startOf(units);
        }
    }

    function isBefore (input, units) {
        var inputMs;
        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this < +input;
        } else {
            inputMs = isMoment(input) ? +input : +local__createLocal(input);
            return +this.clone().endOf(units) < inputMs;
        }
    }

    function isBetween (from, to, units) {
        return this.isAfter(from, units) && this.isBefore(to, units);
    }

    function isSame (input, units) {
        var inputMs;
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this === +input;
        } else {
            inputMs = +local__createLocal(input);
            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
        }
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function diff (input, units, asFloat) {
        var that = cloneWithOffset(input, this),
            zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4,
            delta, output;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        return -(wholeMonthDiff + adjust);
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if ('function' === typeof Date.prototype.toISOString) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }
        return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }
        return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }
        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return +this._d - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(+this / 1000);
    }

    function toDate () {
        return this._offset ? new Date(+this) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // HELPERS

    function weeksInYear(year, dow, doy) {
        return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    // MOMENTS

    function getSetWeekYear (input) {
        var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        return input == null ? year : this.add((input - year), 'y');
    }

    function getSetISOWeekYear (input) {
        var year = weekOfYear(this, 1, 4).year;
        return input == null ? year : this.add((input - year), 'y');
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    addFormatToken('Q', 0, 0, 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   matchWord);
    addRegexToken('ddd',  matchWord);
    addRegexToken('dddd', matchWord);

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config) {
        var weekday = config._locale.weekdaysParse(input);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = locale.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m) {
        return this._weekdays[m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function localeWeekdaysParse (weekdayName) {
        var i, mom, regex;

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            if (!this._weekdaysParse[i]) {
                mom = local__createLocal([2000, 1]).day(i);
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, function () {
        return this.hours() % 12 || 12;
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    function millisecond__milliseconds (token) {
        addFormatToken(0, [token, 3], 0, 'millisecond');
    }

    millisecond__milliseconds('SSS');
    millisecond__milliseconds('SSSS');

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);
    addRegexToken('SSSS', matchUnsigned);
    addParseToken(['S', 'SS', 'SSS', 'SSSS'], function (input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    });

    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add          = add_subtract__add;
    momentPrototype__proto.calendar     = moment_calendar__calendar;
    momentPrototype__proto.clone        = clone;
    momentPrototype__proto.diff         = diff;
    momentPrototype__proto.endOf        = endOf;
    momentPrototype__proto.format       = format;
    momentPrototype__proto.from         = from;
    momentPrototype__proto.fromNow      = fromNow;
    momentPrototype__proto.to           = to;
    momentPrototype__proto.toNow        = toNow;
    momentPrototype__proto.get          = getSet;
    momentPrototype__proto.invalidAt    = invalidAt;
    momentPrototype__proto.isAfter      = isAfter;
    momentPrototype__proto.isBefore     = isBefore;
    momentPrototype__proto.isBetween    = isBetween;
    momentPrototype__proto.isSame       = isSame;
    momentPrototype__proto.isValid      = moment_valid__isValid;
    momentPrototype__proto.lang         = lang;
    momentPrototype__proto.locale       = locale;
    momentPrototype__proto.localeData   = localeData;
    momentPrototype__proto.max          = prototypeMax;
    momentPrototype__proto.min          = prototypeMin;
    momentPrototype__proto.parsingFlags = parsingFlags;
    momentPrototype__proto.set          = getSet;
    momentPrototype__proto.startOf      = startOf;
    momentPrototype__proto.subtract     = add_subtract__subtract;
    momentPrototype__proto.toArray      = toArray;
    momentPrototype__proto.toDate       = toDate;
    momentPrototype__proto.toISOString  = moment_format__toISOString;
    momentPrototype__proto.toJSON       = moment_format__toISOString;
    momentPrototype__proto.toString     = toString;
    momentPrototype__proto.unix         = unix;
    momentPrototype__proto.valueOf      = to_type__valueOf;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return typeof output === 'function' ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY LT',
        LLLL : 'dddd, MMMM D, YYYY LT'
    };

    function longDateFormat (key) {
        var output = this._longDateFormat[key];
        if (!output && this._longDateFormat[key.toUpperCase()]) {
            output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                return val.slice(1);
            });
            this._longDateFormat[key] = output;
        }
        return output;
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (typeof output === 'function') ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (typeof prop === 'function') {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months       =        localeMonths;
    prototype__proto._months      = defaultLocaleMonths;
    prototype__proto.monthsShort  =        localeMonthsShort;
    prototype__proto._monthsShort = defaultLocaleMonthsShort;
    prototype__proto.monthsParse  =        localeMonthsParse;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function list (format, index, field, count, setter) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, setter);
        }

        var i;
        var out = [];
        for (i = 0; i < count; i++) {
            out[i] = lists__get(format, i, field, setter);
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return list(format, index, 'months', 12, 'month');
    }

    function lists__listMonthsShort (format, index) {
        return list(format, index, 'monthsShort', 12, 'month');
    }

    function lists__listWeekdays (format, index) {
        return list(format, index, 'weekdays', 7, 'day');
    }

    function lists__listWeekdaysShort (format, index) {
        return list(format, index, 'weekdaysShort', 7, 'day');
    }

    function lists__listWeekdaysMin (format, index) {
        return list(format, index, 'weekdaysMin', 7, 'day');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years = 0;

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // Accurately convert days to years, assume start from year 0.
        years = absFloor(daysToYears(days));
        days -= absFloor(yearsToDays(years));

        // 30 days to a month
        // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
        months += absFloor(days / 30);
        days   %= 30;

        // 12 months -> 1 year
        years  += absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToYears (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        return days * 400 / 146097;
    }

    function yearsToDays (years) {
        // years * 365 + absFloor(years / 4) -
        //     absFloor(years / 100) + absFloor(years / 400);
        return years * 146097 / 400;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToYears(days) * 12;
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(yearsToDays(this._months / 12));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var duration_get__milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes === 1          && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   === 1          && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    === 1          && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  === 1          && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   === 1          && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = iso_string__abs(this.years());
        var M = iso_string__abs(this.months());
        var D = iso_string__abs(this.days());
        var h = iso_string__abs(this.hours());
        var m = iso_string__abs(this.minutes());
        var s = iso_string__abs(this.seconds() + this.milliseconds() / 1000);
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = duration_get__milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.10.3';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
},{}],2:[function(require,module,exports){

var options = exports.options = require('./options');

exports.parser = require('./parsers/parser');
exports.refiner = require('./refiners/refiner');

exports.Parser = exports.parser.Parser;
exports.Refiner = exports.refiner.Refiner;
exports.Filter = exports.refiner.Filter;

exports.ParsedResult = require('./result').ParsedResult;
exports.ParsedComponents = require('./result').ParsedComponents;

var Chrono = function(option) {

    option = option || exports.options.casualOption();

    this.option = option;
    this.parsers = new Object(option.parsers);
    this.refiners = new Object(option.refiners);
}


Chrono.prototype.parse = function(text, refDate, opt) {

    refDate = refDate || new Date();
    opt = opt || {};

    var allResults = [];

    this.parsers.forEach(function (parser) {
        var results = parser.execute(text, refDate, opt);
        allResults = allResults.concat(results);
    });

    allResults.sort(function(a, b) {
        return a.index - b.index;
    });
    
    this.refiners.forEach(function (refiner) {
        allResults = refiner.refine(text, allResults, opt);
    });
    
    return allResults;
};


Chrono.prototype.parseDate = function(text, refDate, opt) {
    var results = this.parse(text, refDate, opt);
    if (results.length > 0) {
        return results[0].start.date();
    }
    return null;
}

exports.Chrono = Chrono;
exports.strict = new Chrono( options.strictOption() );
exports.casual = new Chrono( options.casualOption() );

exports.parse = function () {
    return exports.casual.parse.apply(exports.casual, arguments);
}

exports.parseDate = function () {
    return exports.casual.parseDate.apply(exports.casual, arguments);
}

},{"./options":3,"./parsers/parser":25,"./refiners/refiner":33,"./result":34}],3:[function(require,module,exports){
var parser = require('./parsers/parser');
var refiner = require('./refiners/refiner');

function baseOption(strictMode) {

    return {
        parsers: [

            // EN
            new parser.ENISOFormatParser(strictMode),
            new parser.ENDeadlineFormatParser(strictMode),
            new parser.ENMonthNameLittleEndianParser(strictMode),
            new parser.ENMonthNameMiddleEndianParser(strictMode),
            new parser.ENMonthNameParser(strictMode),
            new parser.ENSlashDateFormatParser(strictMode),
            new parser.ENSlashDateFormatStartWithYearParser(strictMode),
            new parser.ENSlashMonthFormatParser(strictMode),
            new parser.ENTimeAgoFormatParser(strictMode),
            new parser.ENTimeExpressionParser(strictMode),

            // JP
            new parser.JPStandardParser(strictMode),

            // ES
            new parser.ESTimeAgoFormatParser(strictMode),
            new parser.ESDeadlineFormatParser(strictMode),
            new parser.ESTimeExpressionParser(strictMode),
            new parser.ESMonthNameLittleEndianParser(strictMode),
            new parser.ESSlashDateFormatParser(strictMode),
        ],

        refiners: [
            // Removing overlaping first
            new refiner.OverlapRemovalRefiner(),

            // ETC
            new refiner.ENMergeDateTimeRefiner(),
            new refiner.ENMergeDateRangeRefiner(),
            new refiner.JPMergeDateRangeRefiner(),

            // Extract additional info later
            new refiner.ExtractTimezoneOffsetRefiner(),
            new refiner.ExtractTimezoneAbbrRefiner(),
            new refiner.UnlikelyFormatFilter()
        ]
    }
}



exports.strictOption = function () {
    return baseOption(true);
};


exports.casualOption = function () {

    var options = baseOption(false);

    // EN
    options.parsers.unshift(new parser.ENCasualDateParser());
    options.parsers.unshift(new parser.ENWeekdayParser());

    // JP
    options.parsers.unshift(new parser.JPCasualDateParser());

    // ES
    options.parsers.unshift(new parser.ESCasualDateParser());
    options.parsers.unshift(new parser.ESWeekdayParser());


    return options;
};

},{"./parsers/parser":25,"./refiners/refiner":33}],4:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)(now|today|tonight|tomorrow|tmr|yesterday|last\s*night|this\s*(morning|afternoon|evening))(?=\W|$)/i;

exports.Parser = function ENCasualDateParser(){

    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var text = match[0].substr(match[1].length);
        var index = match.index + match[1].length;
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var refMoment = moment(ref);
        var startMoment = refMoment.clone();
        var lowerText = text.toLowerCase();

        if(lowerText == 'tonight'){
            // Normally means this coming midnight
            result.start.imply('hour', 22);
            result.start.imply('meridiem', 1);

        } else if(lowerText == 'tomorrow' || lowerText == 'tmr'){

            // Check not "Tomorrow" on late night
            if(refMoment.hour() > 1) {
                startMoment.add(1, 'day');
            }

        } else if(lowerText == 'yesterday') {

            startMoment.add(-1, 'day');
        }
        else if(lowerText.match(/last\s*night/)) {

            result.start.imply('hour', 0);
            if (refMoment.hour() > 6) {
                startMoment.add(-1, 'day');
            }

        } else if (lowerText.match("this")) {

            var secondMatch = match[3].toLowerCase();
            if (secondMatch == "afternoon") {

                result.start.imply('hour', 15);

            } else if (secondMatch == "evening") {

                result.start.imply('hour', 18);

            } else if (secondMatch == "morning") {

                result.start.imply('hour', 6);
            }

        } else if (lowerText.match("now")) {

          result.start.imply('hour', refMoment.hour());
          result.start.imply('minute', refMoment.minute());
          result.start.imply('second', refMoment.second());
          result.start.imply('millisecond', refMoment.millisecond());

        }

        result.start.assign('day', startMoment.date())
        result.start.assign('month', startMoment.month() + 1)
        result.start.assign('year', startMoment.year())
        result.tags['ENCasualDateParser'] = true;
        return result;
    }
}

},{"../../result":34,"../parser":25,"moment":1}],5:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/EN');

var PATTERN = new RegExp('(\\W|^)' +
    '(within|in)\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|[0-9]+|an?(?:\\s*few)?|half(?:\\s*an?)?)\\s*' +
    '(seconds?|min(?:ute)?s?|hours?|days?|weeks?|months?|years?)\\s*' +
    '(?=\\W|$)', 'i'
);

var STRICT_PATTERN = new RegExp('(\\W|^)' +
    '(within|in)\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|[0-9]+|an?)\\s*' +
    '(seconds?|minutes?|hours?|days?)\\s*' +
    '(?=\\W|$)', 'i'
);

exports.Parser = function ENDeadlineFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() {
        return this.isStrictMode()? STRICT_PATTERN : PATTERN;
    };

    this.extract = function(text, ref, match, opt){

        var index = match.index + match[1].length;
        var text  = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        var num = match[3].toLowerCase();
        if (util.INTEGER_WORDS[num] !== undefined) {
            num = util.INTEGER_WORDS[num];
        } else if (num === 'a' || num === 'an'){
            num = 1;
        } else if (num.match(/few/i)){
            num = 3;
        } else if (num.match(/half/i)) {
            num = 0.5;
        } else {
            num = parseInt(num);
        }

        var date = moment(ref);
        if (match[4].match(/day|week|month|year/i)) {

            if (match[4].match(/day/i)) {
                date.add(num, 'd');
            } else if (match[4].match(/week/i)) {
                date.add(num * 7, 'd');
            } else if (match[4].match(/month/i)) {
                date.add(num, 'month');
            } else if (match[4].match(/year/i)) {
                date.add(num, 'year');
            }

            result.start.assign('year', date.year());
            result.start.assign('month', date.month() + 1);
            result.start.assign('day', date.date());
            return result;
        }

        if (match[4].match(/hour/i)) {

            date.add(num, 'hour');

        } else if (match[4].match(/min/i)) {

            date.add(num, 'minute');

        } else if (match[4].match(/second/i)) {

            date.add(num, 'second');
        }

        result.start.imply('year', date.year());
        result.start.imply('month', date.month() + 1);
        result.start.imply('day', date.date());
        result.start.assign('hour', date.hour());
        result.start.assign('minute', date.minute());
        result.start.assign('second', date.second());
        result.tags['ENDeadlineFormatParser'] = true;
        return result;
    };
};

},{"../../result":34,"../../utils/EN":35,"../parser":25,"moment":1}],6:[function(require,module,exports){
/*
    ISO 8601
    http://www.w3.org/TR/NOTE-datetime
    - YYYY-MM-DD
    - YYYY-MM-DDThh:mmTZD
    - YYYY-MM-DDThh:mm:ssTZD
    - YYYY-MM-DDThh:mm:ss.sTZD 
    - TZD = (Z or +hh:mm or -hh:mm)
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp('(\\W|^)' 
            + '([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})'
            + '(?:T' //..
                + '([0-9]{1,2}):([0-9]{1,2})' // hh:mm
                + '(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?' // :ss.s
                + '(?:Z|([+-]\\d{2}):?(\\d{2})?)?' // TZD (Z or ±hh:mm or ±hhmm or ±hh)
            + ')?'  //..
            + '(?=\\W|$)', 'i');

var YEAR_NUMBER_GROUP = 2;
var MONTH_NUMBER_GROUP = 3;
var DATE_NUMBER_GROUP  = 4;
var HOUR_NUMBER_GROUP  = 5;
var MINUTE_NUMBER_GROUP = 6;
var SECOND_NUMBER_GROUP = 7;
var MILLISECOND_NUMBER_GROUP = 8;
var TZD_HOUR_OFFSET_GROUP = 9;
var TZD_MINUTE_OFFSET_GROUP = 10;

exports.Parser = function ENISOFormatParser(){
    Parser.apply(this, arguments);
    
    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 
        
        var text = match[0].substr(match[1].length);
        var index = match.index + match[1].length;

        var result = new ParsedResult({
            text: text,
            index: index,
            ref: ref,
        })
        
        result.start.assign('year', parseInt(match[YEAR_NUMBER_GROUP]));
        result.start.assign('month', parseInt(match[MONTH_NUMBER_GROUP]));
        result.start.assign('day', parseInt(match[DATE_NUMBER_GROUP]));

        if (moment(result.start.get('month')) > 12 || moment(result.start.get('month')) < 1 ||
            moment(result.start.get('day')) > 31 || moment(result.start.get('day')) < 1) {
            return null;
        }

        if (match[HOUR_NUMBER_GROUP] != null) {
            
            result.start.assign('hour',
                    parseInt(match[HOUR_NUMBER_GROUP]));
            result.start.assign('minute',
                    parseInt(match[MINUTE_NUMBER_GROUP]));

            if (match[SECOND_NUMBER_GROUP] != null) {

                result.start.assign('second',
                        parseInt(match[SECOND_NUMBER_GROUP]));
            }

            if (match[MILLISECOND_NUMBER_GROUP] != null) {

                result.start.assign('millisecond',
                        parseInt(match[MILLISECOND_NUMBER_GROUP]));
            }

            if (match[TZD_HOUR_OFFSET_GROUP] == null) {

                result.start.assign('timezoneOffset', 0);
            } else {

                var minuteOffset = 0;
                var hourOffset = parseInt(match[TZD_HOUR_OFFSET_GROUP]);
                if (match[TZD_MINUTE_OFFSET_GROUP] != null)
                    minuteOffset = parseInt(match[TZD_MINUTE_OFFSET_GROUP]);

                var offset = hourOffset * 60;
                if (offset < 0) {
                    offset -= minuteOffset;
                } else {
                    offset += minuteOffset;
                }

                result.start.assign('timezoneOffset', offset);
            }
        }
        
        result.tags['ENISOFormatParser'] = true;
        return result;
    };

}


},{"../../result":34,"../parser":25,"moment":1}],7:[function(require,module,exports){
/*
    
    
*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/EN');
    
var PATTERN = new RegExp('(\\W|^)' +
        '(?:(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\\s*,?\\s*)?' + 
        '([0-9]{1,2})(?:st|nd|rd|th)?' + 
        '(?:\\s*(?:to|\\-|\\–|until|through|till|\\s)\\s*([0-9]{1,2})(?:st|nd|rd|th)?)?\\s*(?:of)?\\s*' + 
        '(Jan(?:uary|\\.)?|Feb(?:ruary|\\.)?|Mar(?:ch|\\.)?|Apr(?:il|\\.)?|May|Jun(?:e|\\.)?|Jul(?:y|\\.)?|Aug(?:ust|\\.)?|Sep(?:tember|\\.)?|Oct(?:ober|\\.)?|Nov(?:ember|\\.)?|Dec(?:ember|\\.)?)' +
        '(?:' +
            ',?\\s*([0-9]{2,4}(?![^\\s]\\d))' +
            '(\\s*BE)?' +
        ')?' +
        '(?=\\W|$)', 'i'
    );

var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function ENMonthNameLittleEndianParser(){
    Parser.apply(this, arguments);
    
    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 

        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref,
        });

        var month = match[MONTH_NAME_GROUP];
        month = util.MONTH_OFFSET[month.toLowerCase()];

        var day = match[DATE_GROUP];
        day = parseInt(day);

        var year = null;
        if (match[YEAR_GROUP]) {
            year = match[YEAR_GROUP];
            year = parseInt(year);

            if(match[YEAR_BE_GROUP]){ 
                //BC
                year = year - 543;

            } else if (year < 100){ 

                year = year + 2000;
            }
        }

        if(year){
            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.assign('year', year);
        } else {
            
            //Find the most appropriated year
            var refMoment = moment(ref);
            refMoment.month(month - 1);
            refMoment.date(day);
            refMoment.year(moment(ref).year());

            var nextYear = refMoment.clone().add(1, 'y');
            var lastYear = refMoment.clone().add(-1, 'y');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){  
                refMoment = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){ 
                refMoment = lastYear;
            }

            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.imply('year', refMoment.year());
        }
        
        // Weekday component
        if (match[WEEKDAY_GROUP]) {
            var weekday = match[WEEKDAY_GROUP];
            weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()]
            result.start.assign('weekday', weekday);
        }

        // Text can be 'range' value. Such as '12 - 13 January 2012'
        if (match[DATE_TO_GROUP]) {
            result.end = result.start.clone();
            result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
        }

        result.tags['ENMonthNameLittleEndianParser'] = true;
        return result;
    };
}


},{"../../result":34,"../../utils/EN":35,"../parser":25,"moment":1}],8:[function(require,module,exports){
/*
    
    The parser for parsing US's date format that begin with month's name.
    
    EX. 
        - January 13
        - January 13, 2012
        - January 13 - 15, 2012
        - Tuesday, January 13, 2012

    Watch out for:
        - January 12:00
        - January 12.44
        - January 1222344
*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/EN');
    
var PATTERN = new RegExp('(\\W|^)' +
    '(?:' +
        '(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun\\.?|Mon\\.?|Tue\\.?|Wed\\.?|Thu\\.?|Fri\\.?|Sat\\.?)' + 
    '\\s*,?\\s*)?' +
    '(Jan\\.?|January|Feb\\.?|February|Mar\\.?|March|Apr\\.?|April|May\\.?|Jun\\.?|June|Jul\\.?|July|Aug\\.?|August|Sep\\.?|Sept\\.?|September|Oct\\.?|October|Nov\\.?|November|Dec\\.?|December)' + 
    '\\s*' +
    '([0-9]{1,2})(?:st|nd|rd|th)?\\s*' + 
    '(?:' + 
        '(?:to|\\-)\\s*' + 
        '([0-9]{1,2})(?:st|nd|rd|th)?\\s*' + 
    ')?' + 
    '(?:' +
        '\\s*,?\\s*([0-9]{4})(\\s*BE)?\\s*' +
    ')?' + 
    '(?=\\W|$)(?!\\:\\d)', 'i');

var WEEKDAY_GROUP = 2;
var MONTH_NAME_GROUP = 3;
var DATE_GROUP = 4;
var DATE_TO_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function ENMonthNameMiddleEndianParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){

        if (text.indexOf('5 May 12:00') >= 0) {
            console.log(match)
        }

        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref,
        });

        
        var month = match[MONTH_NAME_GROUP];
        month = util.MONTH_OFFSET[month.toLowerCase()];

        var day = match[DATE_GROUP];
        day = parseInt(day);

        var year = null;
        if (match[YEAR_GROUP]) {
            year = match[YEAR_GROUP];
            year = parseInt(year);

            if(match[YEAR_BE_GROUP]){ 
                //BC
                year = year - 543;

            } else if (year < 100){ 

                year = year + 2000;
            }
        }

        if(year){
            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.assign('year', year);
        } else {
            
            //Find the most appropriated year
            var refMoment = moment(ref);
            refMoment.month(month - 1);
            refMoment.date(day);

            var nextYear = refMoment.clone().add(1, 'y');
            var lastYear = refMoment.clone().add(-1, 'y');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){  
                refMoment = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){ 
                refMoment = lastYear;
            }

            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.imply('year', refMoment.year());
        }
        
        // Weekday component
        if (match[WEEKDAY_GROUP]) {
            var weekday = match[WEEKDAY_GROUP];
            weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()]
            result.start.assign('weekday', weekday);
        }

        // Text can be 'range' value. Such as 'January 12 - 13, 2012'
        if (match[DATE_TO_GROUP]) {
            result.end = result.start.clone();
            result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
        }

        result.tags['ENMonthNameMiddleEndianParser'] = true;
        return result;
    }
}


},{"../../result":34,"../../utils/EN":35,"../parser":25,"moment":1}],9:[function(require,module,exports){
/*
    
    The parser for parsing month name and year.
    
    EX. 
        - January
        - January 2012
        - January, 2012
*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/EN');

var PATTERN = new RegExp('(^|\\D\\s+|[^\\w\\s])' +
    '(Jan\\.?|January|Feb\\.?|February|Mar\\.?|March|Apr\\.?|April|May\\.?|Jun\\.?|June|Jul\\.?|July|Aug\\.?|August|Sep\\.?|Sept\\.?|September|Oct\\.?|October|Nov\\.?|November|Dec\\.?|December)' + 
    '\\s*' +
    '(?:' +
        ',?\\s*([0-9]{4})(\\s*BE)?' +
    ')?' +
    '(?=[^\\s\\w]|$)', 'i');

var MONTH_NAME_GROUP = 2;
var YEAR_GROUP = 3;
var YEAR_BE_GROUP = 4;

exports.Parser = function ENMonthNameParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){
        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref,
        });

        
        var month = match[MONTH_NAME_GROUP];
        month = util.MONTH_OFFSET[month.toLowerCase()];

        var day = 1;

        var year = null;
        if (match[YEAR_GROUP]) {
            year = match[YEAR_GROUP];
            year = parseInt(year);

            if(match[YEAR_BE_GROUP]){ 
                //BC
                year = year - 543;

            } else if (year < 100){ 

                year = year + 2000;
            }
        }

        if(year){
            result.start.imply('day', day);
            result.start.assign('month', month);
            result.start.assign('year', year);
        } else {
            
            //Find the most appropriated year
            var refMoment = moment(ref);
            refMoment.month(month - 1);
            refMoment.date(day);

            var nextYear = refMoment.clone().add(1, 'y');
            var lastYear = refMoment.clone().add(-1, 'y');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){  
                refMoment = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){ 
                refMoment = lastYear;
            }

            result.start.imply('day', day);
            result.start.assign('month', month);
            result.start.imply('year', refMoment.year());
        }

        result.tags['ENMonthNameParser'] = true;
        return result;
    }
}


},{"../../result":34,"../../utils/EN":35,"../parser":25,"moment":1}],10:[function(require,module,exports){
/*
    Date format with slash "/" (also "-" and ".") between numbers 
    - Tuesday 11/3/2015
    - 11/3/2015
    - 11/3
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp('(\\W|^)' + 
    '(?:' + 
        '((?:sun|mon|tues?|wed(?:nes)?|thu(?:rs?)?|fri|sat(?:ur)?)(?:day)?)' +
        '\\s*\\,?\\s*' +
    ')?' + 
    '([0-9]{1,2})[\\/\\.\\-]([0-9]{1,2})' + 
    '(?:' + 
        '[\\/\\.\\-]' + 
        '([0-9]{4}|[0-9]{2})' + 
    ')?' + 
    '(\\W|$)', 'i');

var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thur': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6,}


var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;

var WEEKDAY_GROUP = 2;
var MONTH_GROUP = 3;
var DAY_GROUP = 4;
var YEAR_GROUP = 5;

exports.Parser = function ENSlashDateFormatParser(argument) {
    Parser.apply(this, arguments);

    this.pattern = function () { return PATTERN; };
    this.extract = function(text, ref, match, opt){
        
        if(match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
            // Long skip, if there is some overlapping like:
            // XX[/YY/ZZ]
            // [XX/YY/]ZZ
            match.index += match[0].length
            return;
        }

        var index = match.index + match[OPENNING_GROUP].length;
        var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);


        var result = new ParsedResult({
            text: text,
            index: index,
            ref: ref,
        });
            
        if(text.match(/^\d\.\d$/)) return;
        if(text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return;
        
        // MM/dd -> OK
        // MM.dd -> NG
        if(!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;

        var date = null;
        var year = match[YEAR_GROUP] || moment(ref).year() + '';
        var month = match[MONTH_GROUP];
        var day   = match[DAY_GROUP];
        
        month = parseInt(month);
        day  = parseInt(day);
        year = parseInt(year);

        if(month < 1 || month > 12) {
            if(month > 12) {
                // dd/mm/yyyy date format if day looks like a month, and month
                // looks like a day.
                if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
                    // unambiguous
                    var tday = month;
                    month = day;
                    day = tday;
                }
                else {
                    // both month and day are <= 12
                    return null;
                }
            }
        }
        if(day < 1 || day > 31) return null;

        if(year < 100){
            if (year > 50) {
                year = year + 1900; 
            } else {
                year = year + 2000; 
            }
        }

        result.start.assign('day', day);
        result.start.assign('month', month);
        result.start.assign('year', year);

        //Day of week
        if(match[WEEKDAY_GROUP]) {
            result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
        }

        result.tags['ENSlashDateFormatParser'] = true;
        return result;
    };
};

},{"../../result":34,"../parser":25,"moment":1}],11:[function(require,module,exports){
/*
    Date format with slash "/" between numbers like ENSlashDateFormatParser,
    but this parser expect year before month and date. 
    - YYYY/MM/DD
    - YYYY-MM-DD
    - YYYY.MM.DD
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp('(\\W|^)' 
            + '([0-9]{4})[\\-\\.\\/]([0-9]{1,2})[\\-\\.\\/]([0-9]{1,2})'
            + '(?=\\W|$)', 'i');

var YEAR_NUMBER_GROUP = 2;
var MONTH_NUMBER_GROUP = 3;
var DATE_NUMBER_GROUP  = 4;

exports.Parser = function ENSlashDateFormatStartWithYearParser(){
    Parser.apply(this, arguments);
    
    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){

        var text = match[0].substr(match[1].length);
        var index = match.index + match[1].length;

        var result = new ParsedResult({
            text: text,
            index: index,
            ref: ref,
        })
        
        result.start.assign('year', parseInt(match[YEAR_NUMBER_GROUP]));
        result.start.assign('month', parseInt(match[MONTH_NUMBER_GROUP]));
        result.start.assign('day', parseInt(match[DATE_NUMBER_GROUP]));

        if (moment(result.start.get('month')) > 12 || moment(result.start.get('month')) < 1 ||
            moment(result.start.get('day')) > 31 || moment(result.start.get('day')) < 1) {
            return null;
        }
        
        result.tags['ENDateFormatParser'] = true;
        return result;
    };
}

},{"../../result":34,"../parser":25,"moment":1}],12:[function(require,module,exports){
/*
    Month/Year date format with slash "/" (also "-" and ".") between numbers 
    - 11/05
    - 06/2005
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp('(^|[^\\d/]\\s+|[^\\w\\s])' +
    '([0-9]|0[1-9]|1[012])/([0-9]{4})' + 
    '([^\\d/]|$)', 'i');

var OPENNING_GROUP = 1;
var ENDING_GROUP = 4;

var MONTH_GROUP = 2;
var YEAR_GROUP = 3;

exports.Parser = function ENSlashMonthFormatParser(argument) {
    Parser.apply(this, arguments);

    this.pattern = function () { return PATTERN; };
    this.extract = function(text, ref, match, opt){
        
        var index = match.index + match[OPENNING_GROUP].length;
        var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - (1 + match[ENDING_GROUP].length)).trim();

        var result = new ParsedResult({
            text: text,
            index: index,
            ref: ref,
        });

        var date = null;
        var year = match[YEAR_GROUP] ;
        var month = match[MONTH_GROUP];
        var day   = 1;
        
        month = parseInt(month);
        year = parseInt(year);

        result.start.imply('day', day);
        result.start.assign('month', month);
        result.start.assign('year', year);

        result.tags['ENSlashMonthFormatParser'] = true;
        return result;
    };
};

},{"../../result":34,"../parser":25,"moment":1}],13:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/EN');

var PATTERN = new RegExp('' +
    '(\\W|^)' +
    '(?:within\\s*)?' +
    '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|an?(?:\\s*few)?|half(?:\\s*an?)?)\\s*' +
    '(seconds?|min(?:ute)?s?|hours?|weeks?|days?|months?|years?)\\s*' +
    '(?:ago|before|earlier)(?=(?:\\W|$))', 'i');

var STRICT_PATTERN = new RegExp('' +
    '(\\W|^)' +
    '(?:within\\s*)?' +
    '([0-9]+|an?)\\s*' +
    '(seconds?|minutes?|hours?|days?)\\s*' +
    'ago(?=(?:\\W|$))', 'i');

exports.Parser = function ENTimeAgoFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() {
        return this.isStrictMode()? STRICT_PATTERN : PATTERN;
    };

    this.extract = function(text, ref, match, opt){

        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;

        var text = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);
        index = match.index + match[1].length;

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        var num = match[2].toLowerCase() ;
        if (util.INTEGER_WORDS[num] !== undefined) {
            num = util.INTEGER_WORDS[num];
        } else if(num === 'a' || num === 'an'){
            num = 1;
        } else if (num.match(/few/)) {
            num = 3;
        } else if (num.match(/half/)) {
            num = 0.5;
        } else {
            num = parseInt(num);
        }

        var date = moment(ref);

        if (match[3].match(/hour|min|second/i)) {
            if (match[3].match(/hour/i)) {

                date.add(-num, 'hour');

            } else if (match[3].match(/min/i)) {

                date.add(-num, 'minute');

            } else if (match[3].match(/second/i)) {

                date.add(-num, 'second');
            }

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.assign('hour', date.hour());
            result.start.assign('minute', date.minute());
            result.start.assign('second', date.second());
            result.tags['ENTimeAgoFormatParser'] = true;
            return result;
        }

        if (match[3].match(/week/i)) {
            date.add(-num, 'week');

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.imply('weekday', date.day());
            return result;
        }

        if (match[3].match(/day/i)) {
            date.add(-num, 'd');
        }

        if (match[3].match(/month/i)) {
            date.add(-num, 'month');
        }

        if (match[3].match(/year/i)) {

            date.add(-num, 'year');
        }

        result.start.assign('day', date.date());
        result.start.assign('month', date.month() + 1);
        result.start.assign('year', date.year());
        return result;

    };
}

},{"../../result":34,"../../utils/EN":35,"../parser":25,"moment":1}],14:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var ParsedComponents = require('../../result').ParsedComponents;

var FIRST_REG_PATTERN  = new RegExp("(^|\\s|T)" +
    "(?:(?:at|from)\\s*)?" + 
    "(\\d{1,4}|noon|midnight)" + 
    "(?:" + 
        "(?:\\.|\\:|\\：)(\\d{1,2})" + 
        "(?:" + 
            "(?:\\:|\\：)(\\d{2})" + 
        ")?" + 
    ")?" + 
    "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + 
    "(?=\\W|$)", 'i');


var SECOND_REG_PATTERN = new RegExp("^\\s*" + 
    "(\\-|\\–|\\~|\\〜|to|\\?)\\s*" + 
    "(\\d{1,4})" +
    "(?:" + 
        "(?:\\.|\\:|\\：)(\\d{1,2})" + 
        "(?:" + 
            "(?:\\.|\\:|\\：)(\\d{1,2})" + 
        ")?" + 
    ")?" + 
    "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" + 
    "(?=\\W|$)", 'i');

var HOUR_GROUP    = 2;
var MINUTE_GROUP  = 3;
var SECOND_GROUP  = 4;
var AM_PM_HOUR_GROUP = 5;


exports.Parser = function ENTimeExpressionParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return FIRST_REG_PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 
        
        // This pattern can be overlaped Ex. [12] AM, 1[2] AM
        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;
        var refMoment = moment(ref);
        var result = new ParsedResult();
        result.ref = ref;
        result.index = match.index + match[1].length;
        result.text  = match[0].substring(match[1].length);
        result.tags['ENTimeExpressionParser'] = true;

        result.start.imply('day',   refMoment.date());
        result.start.imply('month', refMoment.month()+1);
        result.start.imply('year',  refMoment.year());
        
        var hour = 0;
        var minute = 0;
        var meridiem = -1;

        // ----- Second
        if(match[SECOND_GROUP] != null){ 
            var second = parseInt(match[SECOND_GROUP]);
            if(second >= 60) return null;

            result.start.assign('second', second);
        }
        
        // ----- Hours
        if (match[HOUR_GROUP].toLowerCase() == "noon"){
            meridiem = 1; 
            hour = 12;
        } else if (match[HOUR_GROUP].toLowerCase() == "midnight") {
            meridiem = 0; 
            hour = 0;
        } else {
            hour = parseInt(match[HOUR_GROUP]);
        }
        
        // ----- Minutes
        if(match[MINUTE_GROUP] != null){ 
            minute = parseInt(match[MINUTE_GROUP]);
        } else if(hour > 100) { 
            minute = hour%100;
            hour   = parseInt(hour/100);
        } 
        
        if(minute >= 60) {
            return null;
        }

        if(hour > 24) {
            return null;
        }
        if (hour >= 12) { 
            meridiem = 1;
        }

        // ----- AM & PM  
        if(match[AM_PM_HOUR_GROUP] != null) {
            if(hour > 12) return null;
            var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if(ampm == "a"){
                meridiem = 0; 
                if(hour == 12) hour = 0;
            }
            
            if(ampm == "p"){
                meridiem = 1; 
                if(hour != 12) hour += 12;
            }
        } 

        result.start.assign('hour', hour);
        result.start.assign('minute', minute);

        if (meridiem >= 0) {
            result.start.assign('meridiem', meridiem);
        } else {
            if (hour < 12) {
                result.start.imply('meridiem', 0);
            } else {
                result.start.imply('meridiem', 1);
            }
        }
        
        // ==============================================================
        //                  Extracting the 'to' chunk
        // ==============================================================
        match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));
        if (!match) {
            // Not accept number only result
            if (result.text.match(/^\d+$/)) { 
                return null;
            }
            return result;
        }



        // Pattern "YY.YY -XXXX" is more like timezone offset
        if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
            return result;
        }

        if(result.end == null){
            result.end = new ParsedComponents(null, result.start.date());
        }

        var hour = 0;
        var minute = 0;
        var meridiem = -1;

        // ----- Second
        if(match[SECOND_GROUP] != null){ 
            var second = parseInt(match[SECOND_GROUP]);
            if(second >= 60) return null;

            result.end.assign('second', second);
        }

        hour = parseInt(match[2]);
        
        // ----- Minute
        if (match[MINUTE_GROUP]!= null) {
            
            minute = parseInt(match[MINUTE_GROUP]);
            if(minute >= 60) return result;
            
        } else if (hour > 100) {

            minute = hour%100;
            hour   = parseInt(hour/100);
        }

        if(minute >= 60) {
            return null;
        }

        if(hour > 24) {
            return null;
        }
        if (hour >= 12) { 
            meridiem = 1;
        }
        
        // ----- AM & PM 
        if (match[AM_PM_HOUR_GROUP] != null){

            if (hour > 12) return null;

            if(match[AM_PM_HOUR_GROUP][0].toLowerCase() == "a"){
                meridiem = 0; 
                if(hour == 12) {
                    hour = 0;
                    if (!result.end.isCertain('day')) {
                        result.end.imply('day', result.end.get('day') + 1);
                    }
                }
            }
            
            if(match[AM_PM_HOUR_GROUP][0].toLowerCase() == "p"){
                meridiem = 1; 
                if(hour != 12) hour += 12;
            }
            
            if (!result.start.isCertain('meridiem')) {
                if (meridiem == 0) {
                    
                    result.start.imply('meridiem', 0);
                    
                    if (result.start.get('hour') == 12) {
                        result.start.assign('hour', 0);
                    }

                } else {

                    result.start.imply('meridiem', 1);
                    
                    if (result.start.get('hour') != 12) {
                        result.start.assign('hour', result.start.get('hour') + 12); 
                    }
                }
            }
        }

        result.text = result.text + match[0];
        result.end.assign('hour', hour);
        result.end.assign('minute', minute);
        if (meridiem >= 0) {
            result.end.assign('meridiem', meridiem);
        } else {
            var startAtPM = result.start.isCertain('meridiem') && result.start.get('meridiem') == 1;
            if (startAtPM && result.start.get('hour') > hour) {
                // 10pm - 1 (am)
                result.end.imply('meridiem', 0);

            } else if (hour > 12) {
                result.end.imply('meridiem', 1);
            }
        }

        if (result.end.date().getTime() < result.start.date().getTime()) {
            result.end.imply('day', result.end.get('day') + 1)
        }
        
        return result;
    }
}


},{"../../result":34,"../parser":25,"moment":1}],15:[function(require,module,exports){
/*


*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'tues':2, 'tue':2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thurs':4, 'thur': 4, 'thu': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6};

var PATTERN = new RegExp('(\\W|^)' +
    '(?:(?:\\,|\\(|\\（)\\s*)?' +
    '(?:(this|last|next)\\s*)?' +
    '(' + Object.keys(DAYS_OFFSET).join('|') + ')' +
    '(?:\\s*(?:\\,|\\)|\\）))?' +
    '(?:\\s*(this|last|next)\\s*week)?' +
    '(?=\\W|$)', 'i');

var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.Parser = function ENWeekdayParser() {
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; };

    this.extract = function(text, ref, match, opt){
        var index = match.index + match[1].length;
        var text = match[0].substr(match[1].length, match[0].length - match[1].length);
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        var offset = DAYS_OFFSET[dayOfWeek];
        if(offset === undefined) return null;

        var startMoment = moment(ref);
        var prefix = match[PREFIX_GROUP];
        var postfix = match[POSTFIX_GROUP];

        if (prefix || postfix) {
            var norm = prefix || postfix;
            norm = norm.toLowerCase();

            if(norm == 'last')
                startMoment.day(offset - 7);
            else if(norm == 'next')
                startMoment.day(offset + 7);
            else if(norm== 'this')
                startMoment.day(offset);
        } else{
            var refOffset = startMoment.day();
            if ( opt.forwardDatesOnly && refOffset > offset ) {
              startMoment.day(offset + 7);
            } else if (!opt.forwardDatesOnly && Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
              startMoment.day(offset - 7);
            } else if (!opt.forwardDatesOnly && Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
              startMoment.day(offset + 7);
            } else {
              startMoment.day(offset);
            }
        }

        result.start.assign('weekday', offset);
        result.start.imply('day', startMoment.date());
        result.start.imply('month', startMoment.month() + 1);
        result.start.imply('year', startMoment.year());
        return result;
    }
};


},{"../../result":34,"../parser":25,"moment":1}],16:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

/*
  Valid patterns:
  - esta mañana -> today in the morning
  - esta tarde -> today in the afternoon/evening
  - esta noche -> tonight
  - ayer por la mañana -> yesterday in the morning
  - ayer por la tarde -> yesterday in the afternoon/evening
  - ayer por la noche -> yesterday at night
  - mañana por la mañana -> tomorrow in the morning
  - mañana por la tarde -> tomorrow in the afternoon/evening
  - mañana por la noche -> tomorrow at night
  - anoche -> tomorrow at night
  - hoy -> today
  - ayer -> yesterday
  - mañana -> tomorrow
 */
var PATTERN = /(\W|^)(ahora|esta\s*(mañana|tarde|noche)|(ayer|mañana)\s*por\s*la\s*(mañana|tarde|noche)|hoy|mañana|ayer|anoche)(?=\W|$)/i;

exports.Parser = function ESCasualDateParser(){

    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var text = match[0].substr(match[1].length);
        var index = match.index + match[1].length;
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var refMoment = moment(ref);
        var startMoment = refMoment.clone();
        var lowerText = text.toLowerCase().replace(/\s+/g, ' ');

        if(lowerText == 'mañana'){

            // Check not "Tomorrow" on late night
            if(refMoment.hour() > 1) {
                startMoment.add(1, 'day');
            }

        } else if(lowerText == 'ayer') {

            startMoment.add(-1, 'day');
        }
        else if(lowerText == 'anoche') {

            result.start.imply('hour', 0);
            if (refMoment.hour() > 6) {
                startMoment.add(-1, 'day');
            }

        } else if (lowerText.match("esta")) {

            var secondMatch = match[3].toLowerCase();
            if (secondMatch == "tarde") {

                result.start.imply('hour', 18);

            } else if (secondMatch == "mañana") {

                result.start.imply('hour', 6);

            } else if (secondMatch == "noche") {

              // Normally means this coming midnight
              result.start.imply('hour', 22);
              result.start.imply('meridiem', 1);

            }
        } else if (lowerText.match(/por\s*la/)) {

            var firstMatch = match[4].toLowerCase();
            if (firstMatch === 'ayer') {

              startMoment.add(-1, 'day');

            } else if (firstMatch === 'mañana') {

              startMoment.add(1, 'day');

            }

            var secondMatch = match[5].toLowerCase();
            if (secondMatch == "tarde") {

                result.start.imply('hour', 18);

            } else if (secondMatch == "mañana") {

                result.start.imply('hour', 9);

            } else if (secondMatch == "noche") {

              // Normally means this coming midnight
              result.start.imply('hour', 22);
              result.start.imply('meridiem', 1);

            }

        } else if (lowerText.match("ahora")) {

          result.start.imply('hour', refMoment.hour());
          result.start.imply('minute', refMoment.minute());
          result.start.imply('second', refMoment.second());
          result.start.imply('millisecond', refMoment.millisecond());

        }

        result.start.assign('day', startMoment.date())
        result.start.assign('month', startMoment.month() + 1)
        result.start.assign('year', startMoment.year())
        result.tags['ESCasualDateParser'] = true;
        return result;
    }
}

},{"../../result":34,"../parser":25,"moment":1}],17:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)(dentro\s*de|en)\s*([0-9]+|medi[oa]|una?)\s*(minutos?|horas?|d[ií]as?)\s*(?=(?:\W|$))/i;

exports.Parser = function ESDeadlineFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var index = match.index + match[1].length;
        var text  = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var num = parseInt(match[3]);
        if (isNaN(num)) {
          if (match[3].match(/medi/)) {
            num = 0.5;
          } else {
            num = 1;
          }
        }

        var date = moment(ref);
        if (match[4].match(/d[ií]a/)) {
            date.add(num, 'd');

            result.start.assign('year', date.year());
            result.start.assign('month', date.month() + 1);
            result.start.assign('day', date.date());
            return result;
        }


        if (match[4].match(/hora/)) {

            date.add(num, 'hour');

        } else if (match[4].match(/minuto/)) {

            date.add(num, 'minute');
        }

        result.start.imply('year', date.year());
        result.start.imply('month', date.month() + 1);
        result.start.imply('day', date.date());
        result.start.assign('hour', date.hour());
        result.start.assign('minute', date.minute());
        result.tags['ESDeadlineFormatParser'] = true;
        return result;
    };
}

},{"../../result":34,"../parser":25,"moment":1}],18:[function(require,module,exports){
/*


*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var util  = require('../../utils/ES');

var DAYS_OFFSET = util.WEEKDAY_OFFSET;

var PATTERN = new RegExp('(\\W|^)' +
        '(?:(Domingo|Lunes|Martes|Miércoles|Miercoles|Jueves|Viernes|Sábado|Sabado|Dom|Lun|Mar|Mie|Jue|Vie|Sab)\\s*,?\\s*)?' +
        '([0-9]{1,2})(?:º|ª|°)?' +
        '(?:\\s*(?:desde|de|\\-|\\–|al?|hasta|\\s)\\s*([0-9]{1,2})(?:º|ª|°)?)?\\s*(?:de)?\\s*' +
        '(Ene(?:ro|\\.)?|Feb(?:rero|\\.)?|Mar(?:zo|\\.)?|Abr(?:il|\\.)?|May(?:o|\\.)?|Jun(?:io|\\.)?|Jul(?:io|\\.)?|Ago(?:sto|\\.)?|Sep(?:tiembre|\\.)?|Oct(?:ubre|\\.)?|Nov(?:iembre|\\.)?|Dic(?:iembre|\\.)?)' +
        '(?:\\s*(?:del?)?(\\s*[0-9]{2,4}(?![^\\s]\\d))(\\s*AC)?)?' +
        '(?=\\W|$)', 'i'
    );

var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function ESMonthNameLittleEndianParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref,
        });

        var month = match[MONTH_NAME_GROUP];
        month = util.MONTH_OFFSET[month.toLowerCase()];

        var day = match[DATE_GROUP];
        day = parseInt(day);

        var year = null;
        if (match[YEAR_GROUP]) {
            year = match[YEAR_GROUP];
            year = parseInt(year);

            if(match[YEAR_BE_GROUP]){
                //BC
                year = year - 543;

            } else if (year < 100){

                year = year + 2000;
            }
        }

        if(year){
            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.assign('year', year);
        } else {

            //Find the most appropriated year
            var refMoment = moment(ref);
            refMoment.month(month - 1);
            refMoment.date(day);
            refMoment.year(moment(ref).year());

            var nextYear = refMoment.clone().add(1, 'y');
            var lastYear = refMoment.clone().add(-1, 'y');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){
                refMoment = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){
                refMoment = lastYear;
            }

            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.imply('year', refMoment.year());
        }

        // Weekday component
        if (match[WEEKDAY_GROUP]) {
            var weekday = match[WEEKDAY_GROUP];
            weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()]
            result.start.assign('weekday', weekday);
        }

        // Text can be 'range' value. Such as '12 - 13 January 2012'
        if (match[DATE_TO_GROUP]) {
            result.end = result.start.clone();
            result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
        }

        result.tags['ESMonthNameLittleEndianParser'] = true;
        return result;
    };
}

},{"../../result":34,"../../utils/ES":36,"../parser":25,"moment":1}],19:[function(require,module,exports){
/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Martes 3/11/2015
    - 3/11/2015
    - 3/11
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp('(\\W|^)' +
    '(?:' +
        '((?:domingo|dom|lunes|lun|martes|mar|mi[ée]rcoles|mie|jueves|jue|viernes|vie|s[áa]bado|sab))' +
        '\\s*\\,?\\s*' +
    ')?' +
    '([0-9]{1,2})[\\/\\.\\-]([0-9]{1,2})' +
    '(?:' +
        '[\\/\\.\\-]' +
        '([0-9]{4}|[0-9]{2})' +
    ')?' +
    '(\\W|$)', 'i');

var DAYS_OFFSET = { 'domingo': 0, 'dom': 0, 'lunes': 1, 'lun': 1, 'martes': 2, 'mar': 2, 'miercoles': 3, 'miércoles': 3, 'mie': 3,
    'jueves': 4, 'jue': 4, 'viernes': 5, 'vier': 5, 'sábado': 6, 'sabado': 6, 'sab': 6,}


var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;

// in Spanish we use day/month/year
var WEEKDAY_GROUP = 2;
var MONTH_GROUP = 4;
var DAY_GROUP = 3;
var YEAR_GROUP = 5;

exports.Parser = function ESSlashDateFormatParser(argument) {
    Parser.apply(this, arguments);

    this.pattern = function () { return PATTERN; };
    this.extract = function(text, ref, match, opt){

        if(match[OPENNING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
            // Long skip, if there is some overlapping like:
            // XX[/YY/ZZ]
            // [XX/YY/]ZZ
            match.index += match[0].length
            return;
        }

        var index = match.index + match[OPENNING_GROUP].length;
        var text = match[0].substr(match[OPENNING_GROUP].length, match[0].length - match[ENDING_GROUP].length);


        var result = new ParsedResult({
            text: text,
            index: index,
            ref: ref,
        });

        if(text.match(/^\d\.\d$/)) return;
        if(text.match(/^\d\.\d{1,2}\.\d{1,2}$/)) return;

        // MM/dd -> OK
        // MM.dd -> NG
        if(!match[YEAR_GROUP] && match[0].indexOf('/') < 0) return;

        var date = null;
        var year = match[YEAR_GROUP] || moment(ref).year() + '';
        var month = match[MONTH_GROUP];
        var day   = match[DAY_GROUP];

        month = parseInt(month);
        day  = parseInt(day);
        year = parseInt(year);

        if(month < 1 || month > 12) {
            if(month > 12) {
                // dd/mm/yyyy date format if day looks like a month, and month
                // looks like a day.
                if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
                    // unambiguous
                    var tday = month;
                    month = day;
                    day = tday;
                }
                else {
                    // both month and day are <= 12
                    return null;
                }
            }
        }
        if(day < 1 || day > 31) return null;

        if(year < 100){
            if(year > 50){
                year = year + 2500 - 543; //BE
            }else{
                year = year + 2000; //AD
            }
        }

        result.start.assign('day', day);
        result.start.assign('month', month);
        result.start.assign('year', year);

        //Day of week
        if(match[WEEKDAY_GROUP]) {
            result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
        }

        result.tags['ESSlashDateFormatParser'] = true;
        return result;
    };
};

},{"../../result":34,"../parser":25,"moment":1}],20:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)hace\s*([0-9]+|medi[oa]|una?)\s*(minutos?|horas?|semanas?|d[ií]as?|mes(es)?|años?)(?=(?:\W|$))/i;

exports.Parser = function ESTimeAgoFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() {
        return PATTERN;
    }

    this.extract = function(text, ref, match, opt){

        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;

        var text = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);
        index = match.index + match[1].length;

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var num = parseInt(match[2]);
        if (isNaN(num)) {
          if (match[2].match(/medi/)) {
            num = 0.5;
          } else {
            num = 1;
          }
        }

        var date = moment(ref);

        if (match[3].match(/hora/) || match[3].match(/minuto/)) {
            if (match[3].match(/hora/)) {

                date.add(-num, 'hour');

            } else if (match[3].match(/minuto/)) {

                date.add(-num, 'minute');
            }

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.assign('hour', date.hour());
            result.start.assign('minute', date.minute());
            result.tags['ESTimeAgoFormatParser'] = true;
            return result;
        }

        if (match[3].match(/semana/)) {
            date.add(-num, 'week');

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.imply('weekday', date.day());
            return result;
        }

        if (match[3].match(/d[ií]a/)) {
            date.add(-num, 'd');
        }

        if (match[3].match(/mes/)) {
            date.add(-num, 'month');
        }

        if (match[3].match(/año/)) {

            date.add(-num, 'year');
        }

        result.start.assign('day', date.date());
        result.start.assign('month', date.month() + 1);
        result.start.assign('year', date.year());
        return result;

    };
}

},{"../../result":34,"../parser":25,"moment":1}],21:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var ParsedComponents = require('../../result').ParsedComponents;

var FIRST_REG_PATTERN  = new RegExp("(^|\\s|T)" +
    "(?:(?:a las?|al?|desde|de)\\s*)?" +
    "(\\d{1,4}|mediod[ií]a|medianoche)" +
    "(?:" +
        "(?:\\.|\\:|\\：)(\\d{1,2})" +
        "(?:" +
            "(?:\\:|\\：)(\\d{2})" +
        ")?" +
    ")?" +
    "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" +
    "(?=\\W|$)", 'i');


var SECOND_REG_PATTERN = new RegExp("^\\s*" +
    "(\\-|\\–|\\~|\\〜|a(?:\s*las)?|\\?)\\s*" +
    "(\\d{1,4})" +
    "(?:" +
        "(?:\\.|\\:|\\：)(\\d{1,2})" +
        "(?:" +
            "(?:\\.|\\:|\\：)(\\d{1,2})" +
        ")?" +
    ")?" +
    "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" +
    "(?=\\W|$)", 'i');

var HOUR_GROUP    = 2;
var MINUTE_GROUP  = 3;
var SECOND_GROUP  = 4;
var AM_PM_HOUR_GROUP = 5;

exports.Parser = function ESTimeExpressionParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return FIRST_REG_PATTERN; }

    this.extract = function(text, ref, match, opt){

        // This pattern can be overlaped Ex. [12] AM, 1[2] AM
        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;
        var refMoment = moment(ref);
        var result = new ParsedResult();
        result.ref = ref;
        result.index = match.index + match[1].length;
        result.text  = match[0].substring(match[1].length);
        result.tags['ESTimeExpressionParser'] = true;

        result.start.imply('day',   refMoment.date());
        result.start.imply('month', refMoment.month()+1);
        result.start.imply('year',  refMoment.year());

        var hour = 0;
        var minute = 0;
        var meridiem = -1;

        // ----- Second
        if(match[SECOND_GROUP] != null){
            var second = parseInt(match[SECOND_GROUP]);
            if(second >= 60) return null;

            result.start.assign('second', second);
        }

        // ----- Hours
        if (match[HOUR_GROUP].toLowerCase().match(/mediod/)){
            meridiem = 1;
            hour = 12;
        } else if (match[HOUR_GROUP].toLowerCase() == "medianoche") {
            meridiem = 0;
            hour = 0;
        } else {
            hour = parseInt(match[HOUR_GROUP]);
        }

        // ----- Minutes
        if(match[MINUTE_GROUP] != null){
            minute = parseInt(match[MINUTE_GROUP]);
        } else if(hour > 100) {
            minute = hour%100;
            hour   = parseInt(hour/100);
        }

        if(minute >= 60) {
            return null;
        }

        if(hour > 24) {
            return null;
        }
        if (hour >= 12) {
            meridiem = 1;
        }

        // ----- AM & PM
        if(match[AM_PM_HOUR_GROUP] != null) {
            if(hour > 12) return null;
            var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if(ampm == "a"){
                meridiem = 0;
                if(hour == 12) hour = 0;
            }

            if(ampm == "p"){
                meridiem = 1;
                if(hour != 12) hour += 12;
            }
        }
        result.start.assign('hour', hour);
        result.start.assign('minute', minute);
        if (meridiem >= 0) {
            result.start.assign('meridiem', meridiem);
        }

        // ==============================================================
        //                  Extracting the 'to' chunk
        // ==============================================================
        match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));
        if (!match) {
            // Not accept number only result
            if (result.text.match(/^\d+$/)) {
                return null;
            }
            return result;
        }



        // Pattern "YY.YY -XXXX" is more like timezone offset
        if (match[0].match(/^\s*(\+|\-)\s*\d{3,4}$/)) {
            return result;
        }

        if(result.end == null){
            result.end = new ParsedComponents(null, result.start.date());
        }

        var hour = 0;
        var minute = 0;
        var meridiem = -1;

        // ----- Second
        if(match[SECOND_GROUP] != null){
            var second = parseInt(match[SECOND_GROUP]);
            if(second >= 60) return null;

            result.end.assign('second', second);
        }

        hour = parseInt(match[2]);

        // ----- Minute
        if (match[MINUTE_GROUP]!= null) {

            minute = parseInt(match[MINUTE_GROUP]);
            if(minute >= 60) return result;

        } else if (hour > 100) {

            minute = hour%100;
            hour   = parseInt(hour/100);
        }

        if(minute >= 60) {
            return null;
        }

        if(hour > 24) {
            return null;
        }
        if (hour >= 12) {
            meridiem = 1;
        }

        // ----- AM & PM
        if (match[AM_PM_HOUR_GROUP] != null){

            if (hour > 12) return null;

            if(match[AM_PM_HOUR_GROUP][0].toLowerCase() == "a"){
                meridiem = 0;
                if(hour == 12) {
                    hour = 0;
                    if (!result.end.isCertain('day')) {
                        result.end.imply('day', result.end.get('day') + 1);
                    }
                }
            }

            if(match[AM_PM_HOUR_GROUP][0].toLowerCase() == "p"){
                meridiem = 1;
                if(hour != 12) hour += 12;
            }

            if (!result.start.isCertain('meridiem')) {
                if (meridiem == 0) {

                    result.start.imply('meridiem', 0);

                    if (result.start.get('hour') == 12) {
                        result.start.assign('hour', 0);
                    }

                } else {

                    result.start.imply('meridiem', 1);

                    if (result.start.get('hour') != 12) {
                        result.start.assign('hour', result.start.get('hour') + 12);
                    }
                }
            }

        } else if(hour >= 12) {
            meridiem = 1;
        }

        result.text = result.text + match[0];
        result.end.assign('hour', hour);
        result.end.assign('minute', minute);
        if (meridiem >= 0) {
            result.end.assign('meridiem', meridiem);
        }

        if (result.end.date().getTime() < result.start.date().getTime()) {
            result.end.imply('day', result.end.get('day') + 1)
        }

        return result;
    }
}

},{"../../result":34,"../parser":25,"moment":1}],22:[function(require,module,exports){
/*


*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var DAYS_OFFSET = { 'domingo': 0, 'dom': 0, 'lunes': 1, 'lun': 1, 'martes': 2, 'mar':2, 'miercoles': 3, 'miércoles': 3, 'mie': 3,
    'jueves': 4, 'jue': 4, 'viernes': 5, 'vier': 5, 'sabado': 6, 'sábado': 6, 'sab': 6,}

var PATTERN = new RegExp('(\\W|^)' +
    '(?:(?:\\,|\\(|\\（)\\s*)?' +
    '(?:(este|pasado|pr[oó]ximo)\\s*)?' +
    '(' + Object.keys(DAYS_OFFSET).join('|') + ')' +
    '(?:\\s*(?:\\,|\\)|\\）))?' +
    '(?:\\s*(este|pasado|pr[óo]ximo)\\s*week)?' +
    '(?=\\W|$)', 'i');

var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.Parser = function ESWeekdayParser() {
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){
        var index = match.index + match[1].length;
        var text = match[0].substr(match[1].length, match[0].length - match[1].length);
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        var offset = DAYS_OFFSET[dayOfWeek];
        if(offset === undefined) return null;

        var startMoment = moment(ref);
        var prefix = match[PREFIX_GROUP];
        var postfix = match[POSTFIX_GROUP];

        if (prefix || postfix) {
            var norm = prefix || postfix;
            norm = norm.toLowerCase();

            if(norm == 'pasado')
                startMoment.day(offset - 7)
            else if(norm == 'próximo' || norm == 'proximo')
                startMoment.day(offset + 7)
            else if(norm== 'este')
                startMoment.day(offset);
        } else{
            var refOffset = startMoment.day();
            if ( opt.forwardDatesOnly && refOffset > offset ) {
              startMoment.day(offset + 7);
            } else if (!opt.forwardDatesOnly && Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
              startMoment.day(offset - 7);
            } else if (!opt.forwardDatesOnly && Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
              startMoment.day(offset + 7);
            } else {
              startMoment.day(offset);
            }
        }

        result.start.assign('weekday', offset);
        result.start.imply('day', startMoment.date())
        result.start.imply('month', startMoment.month() + 1)
        result.start.imply('year', startMoment.year())
        return result;
    }
}

},{"../../result":34,"../parser":25,"moment":1}],23:[function(require,module,exports){
/*
    
    
*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /今日|当日|昨日|明日|今夜|今夕|今晩|今朝/i;

exports.Parser = function JPCasualDateParser(){
    
    Parser.apply(this, arguments);
        
    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 
        
        var index = match.index;
        var text = match[0];
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var refMoment = moment(ref);
        var startMoment = refMoment.clone();

        if(text == '今夜' || text == '今夕' || text == '今晩'){
            // Normally means this coming midnight 
            result.start.imply('hour', 22);
            result.start.imply('meridiem', 1);

        } else if(text == '明日'){

            // Check not "Tomorrow" on late night
            if(refMoment.hour() > 4) {
                startMoment.add(1, 'day');
            }

        } else if(text == '昨日') {

            startMoment.add(-1, 'day');

        } else if (text.match("今朝")) {

            result.start.imply('hour', 6);
            result.start.imply('meridiem', 0);
        }

        result.start.assign('day', startMoment.date())
        result.start.assign('month', startMoment.month() + 1)
        result.start.assign('year', startMoment.year())
        result.tags['JPCasualDateParser'] = true;
        return result;
    }
}


},{"../../result":34,"../parser":25,"moment":1}],24:[function(require,module,exports){
/*
    
    
*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var util  = require('../../utils/JP'); 
var PATTERN = /(?:(同|((昭和|平成)?([0-9０-９]{2,4})))年\s*)?([0-9０-９]{1,2})月\s*([0-9０-９]{1,2})日/i;
  
var YEAR_GROUP        = 2;
var ERA_GROUP         = 3;
var YEAR_NUMBER_GROUP = 4;
var MONTH_GROUP       = 5;
var DAY_GROUP         = 6;

exports.Parser = function JPStandardParser(){
    Parser.apply(this, arguments);
    
    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 

        var startMoment = moment(ref);
        var result = new ParsedResult({
            text: match[0],
            index: match.index,
            ref: ref,
        });
        
        var month = match[MONTH_GROUP];
        month = util.toHankaku(month);
        month = parseInt(month);

        var day = match[DAY_GROUP];
        day = util.toHankaku(day);
        day = parseInt(day);

        startMoment.set('date', day);
        startMoment.set('month', month - 1);
        result.start.assign('day', startMoment.date());
        result.start.assign('month', startMoment.month() + 1);
            
        if (!match[YEAR_GROUP]) {
            
            //Find the most appropriated year
            startMoment.year(moment(ref).year());
            var nextYear = startMoment.clone().add(1, 'y');
            var lastYear = startMoment.clone().add(-1, 'y');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(startMoment.diff(moment(ref))) ){  
                startMoment = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(startMoment.diff(moment(ref))) ){ 
                startMoment = lastYear;
            }

            result.start.assign('day', startMoment.date());
            result.start.assign('month', startMoment.month() + 1);
            result.start.imply('year', startMoment.year());

        } else if (match[YEAR_GROUP].match('同年')) {

            result.start.assign('year', startMoment.year());

        } else {
            var year = match[YEAR_NUMBER_GROUP];
            year = util.toHankaku(year);
            year = parseInt(year);

            if (match[ERA_GROUP] == '平成') {
                year += 1988;
            } else if (match[ERA_GROUP] == '昭和') {
                year += 1925;
            }

            result.start.assign('year', year);
        }
        

        result.tags['JPStandardParser'] = true;
        return result;
    };

}


},{"../../result":34,"../../utils/JP":37,"../parser":25,"moment":1}],25:[function(require,module,exports){

function Parser(strictMode) {

    this.isStrictMode = function() { return (strictMode == true) };

    this.pattern = function() { return /./i; }

    this.extract = function(text, ref, match, opt){ return null; }

    this.execute = function(text, ref, opt) {

        var results = [];
        var regex = this.pattern();

        var remainingText = text;
        var match = regex.exec(remainingText);

        while (match) {

            // Calculate match index on the full text;
            match.index += text.length - remainingText.length;

            var result = this.extract(text, ref, match, opt);
            if (result) {

                // If success, start from the end of the result
                remainingText = text.substring(result.index + result.text.length);

                if (!this.isStrictMode() || result.hasPossibleDates()) {
                    results.push(result);
                }

            } else {
                // If fail, move on by 1
                remainingText = text.substring(match.index + 1);
            }

            match = regex.exec(remainingText);
        }

        if (this.refiners) {
            this.refiners.forEach(function () {
                results = refiner.refine(results, text, options);
            });
        }

        return results;
    }
}

exports.Parser = Parser;

exports.ENISOFormatParser = require('./EN/ENISOFormatParser').Parser;
exports.ENDeadlineFormatParser = require('./EN/ENDeadlineFormatParser').Parser;
exports.ENMonthNameLittleEndianParser = require('./EN/ENMonthNameLittleEndianParser').Parser;
exports.ENMonthNameMiddleEndianParser = require('./EN/ENMonthNameMiddleEndianParser').Parser;
exports.ENMonthNameParser = require('./EN/ENMonthNameParser').Parser;
exports.ENSlashDateFormatParser = require('./EN/ENSlashDateFormatParser').Parser;
exports.ENSlashDateFormatStartWithYearParser = require('./EN/ENSlashDateFormatStartWithYearParser').Parser;
exports.ENSlashMonthFormatParser = require('./EN/ENSlashMonthFormatParser').Parser;
exports.ENTimeAgoFormatParser = require('./EN/ENTimeAgoFormatParser').Parser;
exports.ENTimeExpressionParser = require('./EN/ENTimeExpressionParser').Parser;
exports.ENWeekdayParser = require('./EN/ENWeekdayParser').Parser;
exports.ENCasualDateParser = require('./EN/ENCasualDateParser').Parser;

exports.JPStandardParser = require('./JP/JPStandardParser').Parser;
exports.JPCasualDateParser = require('./JP/JPCasualDateParser').Parser;


exports.ESCasualDateParser = require('./ES/ESCasualDateParser').Parser;
exports.ESDeadlineFormatParser = require('./ES/ESDeadlineFormatParser').Parser;
exports.ESTimeAgoFormatParser = require('./ES/ESTimeAgoFormatParser').Parser;
exports.ESTimeExpressionParser = require('./ES/ESTimeExpressionParser').Parser;
exports.ESWeekdayParser = require('./ES/ESWeekdayParser').Parser;
exports.ESMonthNameLittleEndianParser = require('./ES/ESMonthNameLittleEndianParser').Parser;
exports.ESSlashDateFormatParser = require('./ES/ESSlashDateFormatParser').Parser;

},{"./EN/ENCasualDateParser":4,"./EN/ENDeadlineFormatParser":5,"./EN/ENISOFormatParser":6,"./EN/ENMonthNameLittleEndianParser":7,"./EN/ENMonthNameMiddleEndianParser":8,"./EN/ENMonthNameParser":9,"./EN/ENSlashDateFormatParser":10,"./EN/ENSlashDateFormatStartWithYearParser":11,"./EN/ENSlashMonthFormatParser":12,"./EN/ENTimeAgoFormatParser":13,"./EN/ENTimeExpressionParser":14,"./EN/ENWeekdayParser":15,"./ES/ESCasualDateParser":16,"./ES/ESDeadlineFormatParser":17,"./ES/ESMonthNameLittleEndianParser":18,"./ES/ESSlashDateFormatParser":19,"./ES/ESTimeAgoFormatParser":20,"./ES/ESTimeExpressionParser":21,"./ES/ESWeekdayParser":22,"./JP/JPCasualDateParser":23,"./JP/JPStandardParser":24}],26:[function(require,module,exports){
/*
  
*/
var Refiner = require('../refiner').Refiner;

exports.Refiner = function ENMergeDateRangeRefiner() {
    Refiner.call(this);

    this.pattern = function () { return /^\s*(to|\-)\s*$/i };

    this.refine = function(text, results, opt) {

        if (results.length < 2) return results;
        
        var mergedResult = [];
        var currResult = null;
        var prevResult = null;
        
        for (var i=1; i<results.length; i++){
            
            currResult = results[i];
            prevResult = results[i-1];
            
            if (!prevResult.end && !currResult.end 
                && this.isAbleToMerge(text, prevResult, currResult)) {
              
                prevResult = this.mergeResult(text, prevResult, currResult);
                currResult = null;
                i += 1;
            }
            
            mergedResult.push(prevResult);
        }
        
        if (currResult != null) {
            mergedResult.push(currResult);
        }


        return mergedResult;
    };

    this.isAbleToMerge = function(text, result1, result2) {
        var begin = result1.index + result1.text.length;
        var end   = result2.index;
        var textBetween = text.substring(begin,end);

        return textBetween.match(this.pattern());
    };

    this.isWeekdayResult = function (result) {
        return result.start.isCertain('weekday') && !result.start.isCertain('day');
    };

    this.mergeResult = function(text, fromResult, toResult) {

        if (!this.isWeekdayResult(fromResult) && !this.isWeekdayResult(toResult)) {

            for (var key in toResult.start.knownValues) {
                if (!fromResult.start.isCertain(key)) {
                    fromResult.start.assign(key, toResult.start.get(key));
                }
            }

            for (var key in fromResult.start.knownValues) {
                if (!toResult.start.isCertain(key)) {
                    toResult.start.assign(key, fromResult.start.get(key));
                }
            }
        }

        if (fromResult.start.date().getTime() > toResult.start.date()) {
            var tmp = toResult;
            toResult = fromResult;
            fromResult = tmp;
        }
        
        fromResult.end = toResult.start;

        

        for (var tag in toResult.tags) {
            fromResult.tags[tag] = true;
        }

            
        var startIndex = Math.min(fromResult.index, toResult.index);
        var endIndex = Math.max(
            fromResult.index + fromResult.text.length, 
            toResult.index + toResult.text.length);
            
        fromResult.index = startIndex;
        fromResult.text  = text.substring(startIndex, endIndex);
        fromResult.tags[this.constructor.name] = true;
        return fromResult;
    }
};


},{"../refiner":33}],27:[function(require,module,exports){
/*
    
*/
var ParsedComponents = require('../../result').ParsedComponents;
var Refiner = require('../refiner').Refiner;



var PATTERN = new RegExp("^\\s*(T|at|on|of|,|-)?\\s*$");

function isDateOnly(result) {
    return !result.start.isCertain('hour');
}
    
function isTimeOnly(result) {
    return !result.start.isCertain('month') && !result.start.isCertain('weekday');
}


function isAbleToMerge(text, prevResult, curResult) {
    var textBetween = text.substring(prevResult.index + prevResult.text.length, curResult.index);
    return textBetween.match(PATTERN);
}

function mergeResult(text, dateResult, timeResult){

    var beginDate = dateResult.start;
    var beginTime = timeResult.start;
        
    var beginDateTime = beginDate.clone();
    beginDateTime.assign('hour', beginTime.get('hour'));
    beginDateTime.assign('minute', beginTime.get('minute'));
    beginDateTime.assign('second', beginTime.get('second'));
        
    if (beginTime.isCertain('meridiem')) {
        beginDateTime.assign('meridiem', beginTime.get('meridiem'));
    } else if (
        beginTime.get('meridiem') !== undefined &&
        beginDateTime.get('meridiem') === undefined
    ) {
        beginDateTime.imply('meridiem', beginTime.get('meridiem'));
    }

    if (beginDateTime.get('meridiem') == 1 && beginDateTime.get('hour') < 12) {
        beginDateTime.assign('hour', beginDateTime.get('hour') + 12);
    }

    if (dateResult.end != null || timeResult.end != null) {
        
        var endDate   = dateResult.end == null ? dateResult.start : dateResult.end;            
        var endTime   = timeResult.end == null ? timeResult.start : timeResult.end;

        var endDateTime = endDate.clone();
        endDateTime.assign('hour', endTime.get('hour'));
        endDateTime.assign('minute', endTime.get('minute'));
        endDateTime.assign('second', endTime.get('second'));
        
        if (endTime.isCertain('meridiem')) {
            endDateTime.assign('meridiem', endTime.get('meridiem'));
        } else if (beginTime.get('meridiem') != null) {
            endDateTime.imply('meridiem', endTime.get('meridiem'));
        }
        
        if (dateResult.end == null && endDateTime.date().getTime() < beginDateTime.date().getTime()) {
            // Ex. 9pm - 1am
            if (endDateTime.isCertain('day')) {
                endDateTime.assign('day', endDateTime.get('day') + 1);
            } else {
                endDateTime.imply('day', endDateTime.get('day') + 1);
            }
        }

        dateResult.end = endDateTime;
    }

    dateResult.start = beginDateTime;    

    var startIndex = Math.min(dateResult.index, timeResult.index);
    var endIndex = Math.max(
            dateResult.index + dateResult.text.length, 
            timeResult.index + timeResult.text.length);
    
    dateResult.index = startIndex;
    dateResult.text  = text.substring(startIndex, endIndex);

    for (var tag in timeResult.tags) {
        dateResult.tags[tag] = true;
    }
    dateResult.tags['ENMergeDateAndTimeRefiner'] = true;
    return dateResult;
}

exports.Refiner = function ENMergeDateTimeRefiner() {
    Refiner.call(this);


    this.refine = function(text, results, opt) { 

        if (results.length < 2) return results;

        var mergedResult = [];
        var currResult = null;
        var prevResult = null;

        for (var i = 1; i < results.length; i++) {

            currResult = results[i];
            prevResult = results[i-1];
            
            if (isDateOnly(prevResult) && isTimeOnly(currResult) 
                    && isAbleToMerge(text, prevResult, currResult)) {
                
                prevResult = mergeResult(text, prevResult, currResult);
                currResult = null;
                i += 1;
                
            } else if (isDateOnly(currResult) && isTimeOnly(prevResult)
                    && isAbleToMerge(text, prevResult, currResult)) {
                
                prevResult = mergeResult(text, currResult, prevResult);
                currResult = null;
                i += 1;
            }
            
            mergedResult.push(prevResult);
        }

        if (currResult != null) {
            mergedResult.push(currResult);
        }

        return mergedResult;
    }
}
},{"../../result":34,"../refiner":33}],28:[function(require,module,exports){
/*
  
*/
var Refiner = require('./refiner').Refiner;

// Map ABBR -> Offset in minute
var TIMEZONE_ABBR_MAP = {};
var TIMEZONE_NAME_PATTERN = new RegExp("^\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)", 'i');

exports.Refiner = function ExtractTimezoneAbbrRefiner() {
	Refiner.call(this);

	this.refine = function(text, results, opt) {

		results.forEach(function(result) {

            if (!result.tags['ENTimeExpressionParser']) {
                return;
            }

            var match = TIMEZONE_NAME_PATTERN.exec(text.substring(result.index + result.text.length));
            if (match) {
                var timezoneAbbr = match[1].toUpperCase();
                if (TIMEZONE_ABBR_MAP[timezoneAbbr] === undefined) {
                    return;
                }

                var timezoneOffset = TIMEZONE_ABBR_MAP[timezoneAbbr];
                if (!result.start.isCertain('timezoneOffset')) {
                    result.start.assign('timezoneOffset', timezoneOffset);
                }

                if (result.end != null && !result.end.isCertain('timezoneOffset')) {
                    result.end.assign('timezoneOffset', timezoneOffset);
                }

                result.text += match[0];
                result.tags['ExtractTimezoneAbbrRefiner'] = true;
            }
		});

        return results;
	}
}

// TODO: Move this to some configuration
TIMEZONE_ABBR_MAP = {"ACDT":630,"ACST":570,"ADT":-180,"AEDT":660,"AEST":600,"AFT":270,"AKDT":-480,"AKST":-540,"ALMT":360,"AMST":-180,"AMT":-240,"ANAST":720,"ANAT":720,"AQTT":300,"ART":-180,"AST":-240,"AWDT":540,"AWST":480,"AZOST":0,"AZOT":-60,"AZST":300,"AZT":240,"BNT":480,"BOT":-240,"BRST":-120,"BRT":-180,"BST":60,"BTT":360,"CAST":480,"CAT":120,"CCT":390,"CDT":-300,"CEST":120,"CET":60,"CHADT":825,"CHAST":765,"CKT":-600,"CLST":-180,"CLT":-240,"COT":-300,"CST":-360,"CVT":-60,"CXT":420,"ChST":600,"DAVT":420,"EASST":-300,"EAST":-360,"EAT":180,"ECT":-300,"EDT":-240,"EEST":180,"EET":120,"EGST":0,"EGT":-60,"EST":-300,"ET":-300,"FJST":780,"FJT":720,"FKST":-180,"FKT":-240,"FNT":-120,"GALT":-360,"GAMT":-540,"GET":240,"GFT":-180,"GILT":720,"GMT":0,"GST":240,"GYT":-240,"HAA":-180,"HAC":-300,"HADT":-540,"HAE":-240,"HAP":-420,"HAR":-360,"HAST":-600,"HAT":-90,"HAY":-480,"HKT":480,"HLV":-210,"HNA":-240,"HNC":-360,"HNE":-300,"HNP":-480,"HNR":-420,"HNT":-150,"HNY":-540,"HOVT":420,"ICT":420,"IDT":180,"IOT":360,"IRDT":270,"IRKST":540,"IRKT":540,"IRST":210,"IST":60,"JST":540,"KGT":360,"KRAST":480,"KRAT":480,"KST":540,"KUYT":240,"LHDT":660,"LHST":630,"LINT":840,"MAGST":720,"MAGT":720,"MART":-510,"MAWT":300,"MDT":-360,"MESZ":120,"MEZ":60,"MHT":720,"MMT":390,"MSD":240,"MSK":240,"MST":-420,"MUT":240,"MVT":300,"MYT":480,"NCT":660,"NDT":-90,"NFT":690,"NOVST":420,"NOVT":360,"NPT":345,"NST":-150,"NUT":-660,"NZDT":780,"NZST":720,"OMSST":420,"OMST":420,"PDT":-420,"PET":-300,"PETST":720,"PETT":720,"PGT":600,"PHOT":780,"PHT":480,"PKT":300,"PMDT":-120,"PMST":-180,"PONT":660,"PST":-480,"PT":-480,"PWT":540,"PYST":-180,"PYT":-240,"RET":240,"SAMT":240,"SAST":120,"SBT":660,"SCT":240,"SGT":480,"SRT":-180,"SST":-660,"TAHT":-600,"TFT":300,"TJT":300,"TKT":780,"TLT":540,"TMT":300,"TVT":720,"ULAT":480,"UTC":0,"UYST":-120,"UYT":-180,"UZT":300,"VET":-210,"VLAST":660,"VLAT":660,"VUT":660,"WAST":120,"WAT":60,"WEST":60,"WESZ":60,"WET":0,"WEZ":0,"WFT":720,"WGST":-120,"WGT":-180,"WIB":420,"WIT":540,"WITA":480,"WST":780,"WT":0,"YAKST":600,"YAKT":600,"YAPT":600,"YEKST":360,"YEKT":360}
},{"./refiner":33}],29:[function(require,module,exports){
/*
  
*/
var Refiner = require('./refiner').Refiner;


var TIMEZONE_OFFSET_PATTERN = new RegExp("^\\s*(GMT|UTC)?(\\+|\\-)(\\d{1,2}):?(\\d{2})", 'i');
var TIMEZONE_OFFSET_SIGN_GROUP = 2;
var TIMEZONE_OFFSET_HOUR_OFFSET_GROUP = 3;
var TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP = 4;

exports.Refiner = function ExtractTimezoneOffsetRefiner() {
    Refiner.call(this);

    this.refine = function(text, results, opt) {

        results.forEach(function(result) {

            if (result.start.isCertain('timezoneOffset')) {
                return;
            }

            var match = TIMEZONE_OFFSET_PATTERN.exec(text.substring(result.index + result.text.length));
            if (!match) {
                return;
            }

            var hourOffset = parseInt(match[TIMEZONE_OFFSET_HOUR_OFFSET_GROUP]);
            var minuteOffset = parseInt(match[TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP]);
            var timezoneOffset = hourOffset * 60 + minuteOffset;
            if (match[TIMEZONE_OFFSET_SIGN_GROUP] === '-') {
                timezoneOffset = -timezoneOffset;
            }

            if (result.end != null) {
                result.end.assign('timezoneOffset', timezoneOffset);
            }

            result.start.assign('timezoneOffset', timezoneOffset);
            result.text += match[0];
            result.tags['ExtractTimezoneOffsetRefiner'] = true;
        });

        return results;
    }
}

},{"./refiner":33}],30:[function(require,module,exports){
/*
  
*/
var ENMergeDateRangeRefiner = require('../EN/ENMergeDateRangeRefiner').Refiner;

exports.Refiner = function JPMergeDateRangeRefiner() {
    ENMergeDateRangeRefiner.call(this);

    this.pattern = function () { return /^\s*(から|ー)\s*$/i };
}


},{"../EN/ENMergeDateRangeRefiner":26}],31:[function(require,module,exports){
/*
  
*/
var Refiner = require('./refiner').Refiner;

exports.Refiner = function OverlapRemovalRefiner() {
	Refiner.call(this);
	

	this.refine = function(text, results, opt) { 

        if (results.length < 2) return results;
        
        var filteredResults = [];
        var prevResult = results[0];
        
        for (var i=1; i<results.length; i++){
            
            var result = results[i];
            
            // If overlap, compare the length and discard the shorter one
            if (result.index < prevResult.index + prevResult.text.length) {

                if (result.text.length > prevResult.text.length){
                    prevResult = result;
                }
                
            } else {
                filteredResults.push(prevResult);
                prevResult = result;
            }
        }
        
        // The last one
        if (prevResult != null) {
            filteredResults.push(prevResult);
        }

        return filteredResults;
    }
}
},{"./refiner":33}],32:[function(require,module,exports){
/*
  
*/
var Filter = require('./refiner').Filter;

exports.Refiner = function UnlikelyFormatFilter() {
    Filter.call(this);
    

    this.isValid = function(text, result, opt) { 

        if (result.text.replace(' ','').match(/^\d*(\.\d*)?$/)) {
            return false;
        }

        return true; 
    }
}
},{"./refiner":33}],33:[function(require,module,exports){

exports.Refiner = function Refiner() { 

    this.refine = function(text, results, opt) { return results; };
}

exports.Filter = function Filter() { 
    
    exports.Refiner.call(this);

    this.isValid = function(text, result, opt) { return true; }
    this.refine = function(text, results, opt) { 

        var filteredResult = [];
        for (var i=0; i < results.length; i++) {

            var result = results[i];
            if (this.isValid(text, result, opt)) {
                filteredResult.push(result);
            }
        }

        return filteredResult;
    }
}


// Common refiners
exports.OverlapRemovalRefiner = require('./OverlapRemovalRefiner').Refiner;
exports.ExtractTimezoneOffsetRefiner = require('./ExtractTimezoneOffsetRefiner').Refiner;
exports.ExtractTimezoneAbbrRefiner = require('./ExtractTimezoneAbbrRefiner').Refiner;
exports.UnlikelyFormatFilter = require('./UnlikelyFormatFilter').Refiner;

// EN refiners
exports.ENMergeDateTimeRefiner = require('./EN/ENMergeDateTimeRefiner').Refiner;
exports.ENMergeDateRangeRefiner = require('./EN/ENMergeDateRangeRefiner').Refiner;

// JP refiners
exports.JPMergeDateRangeRefiner = require('./JP/JPMergeDateRangeRefiner').Refiner;


},{"./EN/ENMergeDateRangeRefiner":26,"./EN/ENMergeDateTimeRefiner":27,"./ExtractTimezoneAbbrRefiner":28,"./ExtractTimezoneOffsetRefiner":29,"./JP/JPMergeDateRangeRefiner":30,"./OverlapRemovalRefiner":31,"./UnlikelyFormatFilter":32}],34:[function(require,module,exports){
var moment = require('moment');

function ParsedResult(result){
    result = result || {};

    this.ref   = result.ref;
    this.index = result.index;
    this.text  = result.text;
    this.tags  = result.tags || {};

    this.start = new ParsedComponents(result.start, result.ref)
    if(result.end){
        this.end = new ParsedComponents(result.end, result.ref)
    }
}

ParsedResult.prototype.clone = function() {
    var result = new ParsedResult(this);
    result.tags = JSON.parse(JSON.stringify(this.tags));
    result.start = this.start.clone();
    if (this.end) {
        result.end = this.end.clone();
    }
}

ParsedResult.prototype.hasPossibleDates = function() {
    return this.start.isPossibleDate() && (!this.end || this.end.isPossibleDate());
}


function ParsedComponents (components, ref){

    this.knownValues = {};
    this.impliedValues = {};

    if (components) {
        for (key in components) {
            this.knownValues[key] = components[key];
        }
    }

    if (ref) {
        ref = moment(ref);
        this.imply('day', ref.date())
        this.imply('month', ref.month() + 1)
        this.imply('year', ref.year())
    }
    

    this.imply('hour', 12);
    this.imply('minute', 0);
    this.imply('second', 0);
    this.imply('millisecond', 0);
}

ParsedComponents.prototype.clone = function () {
    var component = new ParsedComponents();
    component.knownValues = JSON.parse(JSON.stringify(this.knownValues));
    component.impliedValues = JSON.parse(JSON.stringify(this.impliedValues));
    return component;
};

ParsedComponents.prototype.get = function(component, value) {
    if (component in this.knownValues) return this.knownValues[component];
    if (component in this.impliedValues) return this.impliedValues[component];
};

ParsedComponents.prototype.assign = function(component, value) {
    this.knownValues[component] = value;
    delete this.impliedValues[component];
};

ParsedComponents.prototype.imply = function(component, value) {
    if (component in this.knownValues) return;
    this.impliedValues[component] = value;
};

ParsedComponents.prototype.isCertain = function(component) {
    return component in this.knownValues;
};

ParsedComponents.prototype.isPossibleDate = function() {
    
    var dateMoment = this.moment();

    if (dateMoment.get('year') != this.get('year')) return false;
    if (dateMoment.get('month') != this.get('month')-1) return false;
    if (dateMoment.get('date') != this.get('day')) return false;
    if (dateMoment.get('hour') != this.get('hour')) return false;
    if (dateMoment.get('minute') != this.get('minute')) return false;

    return true;
}

ParsedComponents.prototype.date = function() {
    var dateMoment = this.moment();
    return dateMoment.toDate();
};

ParsedComponents.prototype.moment = function() {
    var dateMoment = moment();

    dateMoment.set('year', this.get('year'));
    dateMoment.set('month', this.get('month')-1);
    dateMoment.set('date', this.get('day'));
    dateMoment.set('hour', this.get('hour'));
    dateMoment.set('minute', this.get('minute'));
    dateMoment.set('second', this.get('second'));
    dateMoment.set('millisecond', this.get('millisecond'));

    // Javascript Date Object return minus timezone offset
    var currentTimezoneOffset = dateMoment.utcOffset();
    var targetTimezoneOffset = this.isCertain('timezoneOffset') ? 
        this.get('timezoneOffset') : currentTimezoneOffset;

    var adjustTimezoneOffset = targetTimezoneOffset - currentTimezoneOffset;
    dateMoment.add(-adjustTimezoneOffset, 'minutes');

    return dateMoment;
}



exports.ParsedComponents = ParsedComponents;
exports.ParsedResult = ParsedResult;

},{"moment":1}],35:[function(require,module,exports){
exports.WEEKDAY_OFFSET = { 
    'sunday': 0, 
    'sun': 0, 
    'monday': 1, 
    'mon': 1,
    'tuesday': 2, 
    'tue':2, 
    'wednesday': 3, 
    'wed': 3, 
    'thursday': 4, 
    'thur': 4, 
    'thu': 4,
    'friday': 5, 
    'fri': 5,
    'saturday': 6, 
    'sat': 6
};
    
exports.MONTH_OFFSET = { 
    'january': 1,
    'jan': 1,
    'jan.': 1,
    'february': 2,
    'feb': 2,
    'feb.': 2,
    'march': 3,
    'mar': 3,
    'mar.': 3,
    'april': 4,
    'apr': 4,
    'apr.': 4,
    'may': 5,
    'june': 6,
    'jun': 6,
    'jun.': 6,
    'july': 7,
    'jul': 7,
    'jul.': 7,
    'august': 8,
    'aug': 8,
    'aug.': 8,
    'september': 9,
    'sep': 9,
    'sep.': 9,
    'sept': 9,
    'sept.': 9,
    'october': 10,
    'oct': 10,
    'oct.': 10,
    'november': 11,
    'nov': 11,
    'nov.': 11,
    'december': 12,
    'dec': 12,
    'dec.': 12
};

exports.INTEGER_WORDS_PATTERN = '(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)';
exports.INTEGER_WORDS = {
    'one' : 1,
    'two' : 2,
    'three' : 3,
    'four' : 4,
    'five' : 5,
    'six' : 6,
    'seven' : 7,
    'eight' : 8,
    'nine' : 9,
    'ten' : 10,
    'eleven' : 11,
    'twelve' : 12
};

},{}],36:[function(require,module,exports){
exports.WEEKDAY_OFFSET = {
    'domingo': 0,
    'dom': 0,
    'lunes': 1,
    'lun': 1,
    'martes': 2,
    'mar':2,
    'miércoles': 3,
    'miercoles': 3,
    'mie': 3,
    'jueves': 4,
    'jue': 4,
    'viernes': 5,
    'vie': 5,
    'sábado': 6,
    'sabado': 6,
    'sab': 6,}

exports.MONTH_OFFSET = {
    'enero': 1,
    'ene': 1,
    'ene.': 1,
    'febrero': 2,
    'feb': 2,
    'feb.': 2,
    'marzo': 3,
    'mar': 3,
    'mar.': 3,
    'abril': 4,
    'abr': 4,
    'abr.': 4,
    'mayo': 5,
    'may': 5,
    'may.': 5,
    'junio': 6,
    'jun': 6,
    'jun.': 6,
    'julio': 7,
    'jul': 7,
    'jul.': 7,
    'agosto': 8,
    'ago': 8,
    'ago.': 8,
    'septiembre': 9,
    'sep': 9,
    'sept': 9,
    'sep.': 9,
    'sept.': 9,
    'octubre': 10,
    'oct': 10,
    'oct.': 10,
    'noviembre': 11,
    'nov': 11,
    'nov.': 11,
    'diciembre': 12,
    'dic': 12,
    'dic.': 12,
}

},{}],37:[function(require,module,exports){


/**
 * to-hankaku.js
 * convert to ascii code strings.
 *
 * @version 1.0.1
 * @author think49
 * @url https://gist.github.com/964592
 * @license http://www.opensource.org/licenses/mit-license.php (The MIT License)
 */
 
exports.toHankaku = (function (String, fromCharCode) {
 
    function toHankaku (string) {
        return String(string).replace(/\u2019/g, '\u0027').replace(/\u201D/g, '\u0022').replace(/\u3000/g, '\u0020').replace(/\uFFE5/g, '\u00A5').replace(/[\uFF01\uFF03-\uFF06\uFF08\uFF09\uFF0C-\uFF19\uFF1C-\uFF1F\uFF21-\uFF3B\uFF3D\uFF3F\uFF41-\uFF5B\uFF5D\uFF5E]/g, alphaNum);
    }
 
    function alphaNum (token) {
        return fromCharCode(token.charCodeAt(0) - 65248);
    }
 
    return toHankaku;
})(String, String.fromCharCode);

/**
 * to-zenkaku.js
 * convert to multi byte strings.
 *
 * @version 1.0.2
 * @author think49
 * @url https://gist.github.com/964592
 * @license http://www.opensource.org/licenses/mit-license.php (The MIT License)
 */
exports.toZenkaku = (function (String, fromCharCode) {
 
    function toZenkaku (string) {
        return String(string).replace(/\u0020/g, '\u3000').replace(/\u0022/g, '\u201D').replace(/\u0027/g, '\u2019').replace(/\u00A5/g, '\uFFE5').replace(/[!#-&(),-9\u003C-?A-[\u005D_a-{}~]/g, alphaNum);
    }
 
    function alphaNum (token) {
        return fromCharCode(token.charCodeAt(0) + 65248);
    }
 
    return toZenkaku;
})(String, String.fromCharCode);
},{}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbW9tZW50L21vbWVudC5qcyIsInNyYy9jaHJvbm8uanMiLCJzcmMvb3B0aW9ucy5qcyIsInNyYy9wYXJzZXJzL0VOL0VOQ2FzdWFsRGF0ZVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VOL0VORGVhZGxpbmVGb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FTi9FTklTT0Zvcm1hdFBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VOL0VOTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRU4vRU5Nb250aE5hbWVNaWRkbGVFbmRpYW5QYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FTi9FTk1vbnRoTmFtZVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VOL0VOU2xhc2hEYXRlRm9ybWF0UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRU4vRU5TbGFzaERhdGVGb3JtYXRTdGFydFdpdGhZZWFyUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRU4vRU5TbGFzaE1vbnRoRm9ybWF0UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRU4vRU5UaW1lQWdvRm9ybWF0UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRU4vRU5UaW1lRXhwcmVzc2lvblBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VOL0VOV2Vla2RheVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VTL0VTQ2FzdWFsRGF0ZVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VTL0VTRGVhZGxpbmVGb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FUy9FU01vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VTL0VTU2xhc2hEYXRlRm9ybWF0UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRVMvRVNUaW1lQWdvRm9ybWF0UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRVMvRVNUaW1lRXhwcmVzc2lvblBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VTL0VTV2Vla2RheVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0pQL0pQQ2FzdWFsRGF0ZVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0pQL0pQU3RhbmRhcmRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9wYXJzZXIuanMiLCJzcmMvcmVmaW5lcnMvRU4vRU5NZXJnZURhdGVSYW5nZVJlZmluZXIuanMiLCJzcmMvcmVmaW5lcnMvRU4vRU5NZXJnZURhdGVUaW1lUmVmaW5lci5qcyIsInNyYy9yZWZpbmVycy9FeHRyYWN0VGltZXpvbmVBYmJyUmVmaW5lci5qcyIsInNyYy9yZWZpbmVycy9FeHRyYWN0VGltZXpvbmVPZmZzZXRSZWZpbmVyLmpzIiwic3JjL3JlZmluZXJzL0pQL0pQTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyLmpzIiwic3JjL3JlZmluZXJzL092ZXJsYXBSZW1vdmFsUmVmaW5lci5qcyIsInNyYy9yZWZpbmVycy9Vbmxpa2VseUZvcm1hdEZpbHRlci5qcyIsInNyYy9yZWZpbmVycy9yZWZpbmVyLmpzIiwic3JjL3Jlc3VsdC5qcyIsInNyYy91dGlscy9FTi5qcyIsInNyYy91dGlscy9FUy5qcyIsInNyYy91dGlscy9KUC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0aUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9QQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8hIG1vbWVudC5qc1xuLy8hIHZlcnNpb24gOiAyLjEwLjNcbi8vISBhdXRob3JzIDogVGltIFdvb2QsIElza3JlbiBDaGVybmV2LCBNb21lbnQuanMgY29udHJpYnV0b3JzXG4vLyEgbGljZW5zZSA6IE1JVFxuLy8hIG1vbWVudGpzLmNvbVxuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIGdsb2JhbC5tb21lbnQgPSBmYWN0b3J5KClcbn0odGhpcywgZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgaG9va0NhbGxiYWNrO1xuXG4gICAgZnVuY3Rpb24gdXRpbHNfaG9va3NfX2hvb2tzICgpIHtcbiAgICAgICAgcmV0dXJuIGhvb2tDYWxsYmFjay5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgaXMgZG9uZSB0byByZWdpc3RlciB0aGUgbWV0aG9kIGNhbGxlZCB3aXRoIG1vbWVudCgpXG4gICAgLy8gd2l0aG91dCBjcmVhdGluZyBjaXJjdWxhciBkZXBlbmRlbmNpZXMuXG4gICAgZnVuY3Rpb24gc2V0SG9va0NhbGxiYWNrIChjYWxsYmFjaykge1xuICAgICAgICBob29rQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0FycmF5KGlucHV0KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGF0ZShpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBEYXRlIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IERhdGVdJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXAoYXJyLCBmbikge1xuICAgICAgICB2YXIgcmVzID0gW10sIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKGZuKGFycltpXSwgaSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzT3duUHJvcChhLCBiKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYSwgYik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kKGEsIGIpIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBiKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChiLCBpKSkge1xuICAgICAgICAgICAgICAgIGFbaV0gPSBiW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc093blByb3AoYiwgJ3RvU3RyaW5nJykpIHtcbiAgICAgICAgICAgIGEudG9TdHJpbmcgPSBiLnRvU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc093blByb3AoYiwgJ3ZhbHVlT2YnKSkge1xuICAgICAgICAgICAgYS52YWx1ZU9mID0gYi52YWx1ZU9mO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlX3V0Y19fY3JlYXRlVVRDIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWxPclVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgdHJ1ZSkudXRjKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVmYXVsdFBhcnNpbmdGbGFncygpIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBkZWVwIGNsb25lIHRoaXMgb2JqZWN0LlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZW1wdHkgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICB1bnVzZWRUb2tlbnMgICAgOiBbXSxcbiAgICAgICAgICAgIHVudXNlZElucHV0ICAgICA6IFtdLFxuICAgICAgICAgICAgb3ZlcmZsb3cgICAgICAgIDogLTIsXG4gICAgICAgICAgICBjaGFyc0xlZnRPdmVyICAgOiAwLFxuICAgICAgICAgICAgbnVsbElucHV0ICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICBpbnZhbGlkTW9udGggICAgOiBudWxsLFxuICAgICAgICAgICAgaW52YWxpZEZvcm1hdCAgIDogZmFsc2UsXG4gICAgICAgICAgICB1c2VySW52YWxpZGF0ZWQgOiBmYWxzZSxcbiAgICAgICAgICAgIGlzbyAgICAgICAgICAgICA6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UGFyc2luZ0ZsYWdzKG0pIHtcbiAgICAgICAgaWYgKG0uX3BmID09IG51bGwpIHtcbiAgICAgICAgICAgIG0uX3BmID0gZGVmYXVsdFBhcnNpbmdGbGFncygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLl9wZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZF9faXNWYWxpZChtKSB7XG4gICAgICAgIGlmIChtLl9pc1ZhbGlkID09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBmbGFncyA9IGdldFBhcnNpbmdGbGFncyhtKTtcbiAgICAgICAgICAgIG0uX2lzVmFsaWQgPSAhaXNOYU4obS5fZC5nZXRUaW1lKCkpICYmXG4gICAgICAgICAgICAgICAgZmxhZ3Mub3ZlcmZsb3cgPCAwICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLmVtcHR5ICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRNb250aCAmJlxuICAgICAgICAgICAgICAgICFmbGFncy5udWxsSW5wdXQgJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MuaW52YWxpZEZvcm1hdCAmJlxuICAgICAgICAgICAgICAgICFmbGFncy51c2VySW52YWxpZGF0ZWQ7XG5cbiAgICAgICAgICAgIGlmIChtLl9zdHJpY3QpIHtcbiAgICAgICAgICAgICAgICBtLl9pc1ZhbGlkID0gbS5faXNWYWxpZCAmJlxuICAgICAgICAgICAgICAgICAgICBmbGFncy5jaGFyc0xlZnRPdmVyID09PSAwICYmXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLnVudXNlZFRva2Vucy5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MuYmlnSG91ciA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLl9pc1ZhbGlkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkX19jcmVhdGVJbnZhbGlkIChmbGFncykge1xuICAgICAgICB2YXIgbSA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhOYU4pO1xuICAgICAgICBpZiAoZmxhZ3MgIT0gbnVsbCkge1xuICAgICAgICAgICAgZXh0ZW5kKGdldFBhcnNpbmdGbGFncyhtKSwgZmxhZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKG0pLnVzZXJJbnZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG5cbiAgICB2YXIgbW9tZW50UHJvcGVydGllcyA9IHV0aWxzX2hvb2tzX19ob29rcy5tb21lbnRQcm9wZXJ0aWVzID0gW107XG5cbiAgICBmdW5jdGlvbiBjb3B5Q29uZmlnKHRvLCBmcm9tKSB7XG4gICAgICAgIHZhciBpLCBwcm9wLCB2YWw7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmcm9tLl9pc0FNb21lbnRPYmplY3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0by5faXNBTW9tZW50T2JqZWN0ID0gZnJvbS5faXNBTW9tZW50T2JqZWN0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZnJvbS5faSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRvLl9pID0gZnJvbS5faTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyb20uX2YgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0by5fZiA9IGZyb20uX2Y7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBmcm9tLl9sICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdG8uX2wgPSBmcm9tLl9sO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZnJvbS5fc3RyaWN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdG8uX3N0cmljdCA9IGZyb20uX3N0cmljdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyb20uX3R6bSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRvLl90em0gPSBmcm9tLl90em07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBmcm9tLl9pc1VUQyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRvLl9pc1VUQyA9IGZyb20uX2lzVVRDO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZnJvbS5fb2Zmc2V0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdG8uX29mZnNldCA9IGZyb20uX29mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyb20uX3BmICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdG8uX3BmID0gZ2V0UGFyc2luZ0ZsYWdzKGZyb20pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZnJvbS5fbG9jYWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdG8uX2xvY2FsZSA9IGZyb20uX2xvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb21lbnRQcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoaSBpbiBtb21lbnRQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgcHJvcCA9IG1vbWVudFByb3BlcnRpZXNbaV07XG4gICAgICAgICAgICAgICAgdmFsID0gZnJvbVtwcm9wXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvO1xuICAgIH1cblxuICAgIHZhciB1cGRhdGVJblByb2dyZXNzID0gZmFsc2U7XG5cbiAgICAvLyBNb21lbnQgcHJvdG90eXBlIG9iamVjdFxuICAgIGZ1bmN0aW9uIE1vbWVudChjb25maWcpIHtcbiAgICAgICAgY29weUNvbmZpZyh0aGlzLCBjb25maWcpO1xuICAgICAgICB0aGlzLl9kID0gbmV3IERhdGUoK2NvbmZpZy5fZCk7XG4gICAgICAgIC8vIFByZXZlbnQgaW5maW5pdGUgbG9vcCBpbiBjYXNlIHVwZGF0ZU9mZnNldCBjcmVhdGVzIG5ldyBtb21lbnRcbiAgICAgICAgLy8gb2JqZWN0cy5cbiAgICAgICAgaWYgKHVwZGF0ZUluUHJvZ3Jlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB1cGRhdGVJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgICAgICB1cGRhdGVJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc01vbWVudCAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBNb21lbnQgfHwgKG9iaiAhPSBudWxsICYmIG9iai5faXNBTW9tZW50T2JqZWN0ICE9IG51bGwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSW50KGFyZ3VtZW50Rm9yQ29lcmNpb24pIHtcbiAgICAgICAgdmFyIGNvZXJjZWROdW1iZXIgPSArYXJndW1lbnRGb3JDb2VyY2lvbixcbiAgICAgICAgICAgIHZhbHVlID0gMDtcblxuICAgICAgICBpZiAoY29lcmNlZE51bWJlciAhPT0gMCAmJiBpc0Zpbml0ZShjb2VyY2VkTnVtYmVyKSkge1xuICAgICAgICAgICAgaWYgKGNvZXJjZWROdW1iZXIgPj0gMCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0aC5mbG9vcihjb2VyY2VkTnVtYmVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLmNlaWwoY29lcmNlZE51bWJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcGFyZUFycmF5cyhhcnJheTEsIGFycmF5MiwgZG9udENvbnZlcnQpIHtcbiAgICAgICAgdmFyIGxlbiA9IE1hdGgubWluKGFycmF5MS5sZW5ndGgsIGFycmF5Mi5sZW5ndGgpLFxuICAgICAgICAgICAgbGVuZ3RoRGlmZiA9IE1hdGguYWJzKGFycmF5MS5sZW5ndGggLSBhcnJheTIubGVuZ3RoKSxcbiAgICAgICAgICAgIGRpZmZzID0gMCxcbiAgICAgICAgICAgIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKChkb250Q29udmVydCAmJiBhcnJheTFbaV0gIT09IGFycmF5MltpXSkgfHxcbiAgICAgICAgICAgICAgICAoIWRvbnRDb252ZXJ0ICYmIHRvSW50KGFycmF5MVtpXSkgIT09IHRvSW50KGFycmF5MltpXSkpKSB7XG4gICAgICAgICAgICAgICAgZGlmZnMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlmZnMgKyBsZW5ndGhEaWZmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIExvY2FsZSgpIHtcbiAgICB9XG5cbiAgICB2YXIgbG9jYWxlcyA9IHt9O1xuICAgIHZhciBnbG9iYWxMb2NhbGU7XG5cbiAgICBmdW5jdGlvbiBub3JtYWxpemVMb2NhbGUoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgPyBrZXkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCdfJywgJy0nKSA6IGtleTtcbiAgICB9XG5cbiAgICAvLyBwaWNrIHRoZSBsb2NhbGUgZnJvbSB0aGUgYXJyYXlcbiAgICAvLyB0cnkgWydlbi1hdScsICdlbi1nYiddIGFzICdlbi1hdScsICdlbi1nYicsICdlbicsIGFzIGluIG1vdmUgdGhyb3VnaCB0aGUgbGlzdCB0cnlpbmcgZWFjaFxuICAgIC8vIHN1YnN0cmluZyBmcm9tIG1vc3Qgc3BlY2lmaWMgdG8gbGVhc3QsIGJ1dCBtb3ZlIHRvIHRoZSBuZXh0IGFycmF5IGl0ZW0gaWYgaXQncyBhIG1vcmUgc3BlY2lmaWMgdmFyaWFudCB0aGFuIHRoZSBjdXJyZW50IHJvb3RcbiAgICBmdW5jdGlvbiBjaG9vc2VMb2NhbGUobmFtZXMpIHtcbiAgICAgICAgdmFyIGkgPSAwLCBqLCBuZXh0LCBsb2NhbGUsIHNwbGl0O1xuXG4gICAgICAgIHdoaWxlIChpIDwgbmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzcGxpdCA9IG5vcm1hbGl6ZUxvY2FsZShuYW1lc1tpXSkuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgIGogPSBzcGxpdC5sZW5ndGg7XG4gICAgICAgICAgICBuZXh0ID0gbm9ybWFsaXplTG9jYWxlKG5hbWVzW2kgKyAxXSk7XG4gICAgICAgICAgICBuZXh0ID0gbmV4dCA/IG5leHQuc3BsaXQoJy0nKSA6IG51bGw7XG4gICAgICAgICAgICB3aGlsZSAoaiA+IDApIHtcbiAgICAgICAgICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKHNwbGl0LnNsaWNlKDAsIGopLmpvaW4oJy0nKSk7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmV4dCAmJiBuZXh0Lmxlbmd0aCA+PSBqICYmIGNvbXBhcmVBcnJheXMoc3BsaXQsIG5leHQsIHRydWUpID49IGogLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhlIG5leHQgYXJyYXkgaXRlbSBpcyBiZXR0ZXIgdGhhbiBhIHNoYWxsb3dlciBzdWJzdHJpbmcgb2YgdGhpcyBvbmVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGotLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkTG9jYWxlKG5hbWUpIHtcbiAgICAgICAgdmFyIG9sZExvY2FsZSA9IG51bGw7XG4gICAgICAgIC8vIFRPRE86IEZpbmQgYSBiZXR0ZXIgd2F5IHRvIHJlZ2lzdGVyIGFuZCBsb2FkIGFsbCB0aGUgbG9jYWxlcyBpbiBOb2RlXG4gICAgICAgIGlmICghbG9jYWxlc1tuYW1lXSAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBvbGRMb2NhbGUgPSBnbG9iYWxMb2NhbGUuX2FiYnI7XG4gICAgICAgICAgICAgICAgcmVxdWlyZSgnLi9sb2NhbGUvJyArIG5hbWUpO1xuICAgICAgICAgICAgICAgIC8vIGJlY2F1c2UgZGVmaW5lTG9jYWxlIGN1cnJlbnRseSBhbHNvIHNldHMgdGhlIGdsb2JhbCBsb2NhbGUsIHdlXG4gICAgICAgICAgICAgICAgLy8gd2FudCB0byB1bmRvIHRoYXQgZm9yIGxhenkgbG9hZGVkIGxvY2FsZXNcbiAgICAgICAgICAgICAgICBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlKG9sZExvY2FsZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgbG9hZCBsb2NhbGUgYW5kIHRoZW4gc2V0IHRoZSBnbG9iYWwgbG9jYWxlLiAgSWZcbiAgICAvLyBubyBhcmd1bWVudHMgYXJlIHBhc3NlZCBpbiwgaXQgd2lsbCBzaW1wbHkgcmV0dXJuIHRoZSBjdXJyZW50IGdsb2JhbFxuICAgIC8vIGxvY2FsZSBrZXkuXG4gICAgZnVuY3Rpb24gbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZSAoa2V5LCB2YWx1ZXMpIHtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWVzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGVmaW5lTG9jYWxlKGtleSwgdmFsdWVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAvLyBtb21lbnQuZHVyYXRpb24uX2xvY2FsZSA9IG1vbWVudC5fbG9jYWxlID0gZGF0YTtcbiAgICAgICAgICAgICAgICBnbG9iYWxMb2NhbGUgPSBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZS5fYWJicjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVMb2NhbGUgKG5hbWUsIHZhbHVlcykge1xuICAgICAgICBpZiAodmFsdWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YWx1ZXMuYWJiciA9IG5hbWU7XG4gICAgICAgICAgICBpZiAoIWxvY2FsZXNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbmV3IExvY2FsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxlc1tuYW1lXS5zZXQodmFsdWVzKTtcblxuICAgICAgICAgICAgLy8gYmFja3dhcmRzIGNvbXBhdCBmb3Igbm93OiBhbHNvIHNldCB0aGUgbG9jYWxlXG4gICAgICAgICAgICBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHVzZWZ1bCBmb3IgdGVzdGluZ1xuICAgICAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybnMgbG9jYWxlIGRhdGFcbiAgICBmdW5jdGlvbiBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlIChrZXkpIHtcbiAgICAgICAgdmFyIGxvY2FsZTtcblxuICAgICAgICBpZiAoa2V5ICYmIGtleS5fbG9jYWxlICYmIGtleS5fbG9jYWxlLl9hYmJyKSB7XG4gICAgICAgICAgICBrZXkgPSBrZXkuX2xvY2FsZS5fYWJicjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsTG9jYWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc0FycmF5KGtleSkpIHtcbiAgICAgICAgICAgIC8vc2hvcnQtY2lyY3VpdCBldmVyeXRoaW5nIGVsc2VcbiAgICAgICAgICAgIGxvY2FsZSA9IGxvYWRMb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5ID0gW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hvb3NlTG9jYWxlKGtleSk7XG4gICAgfVxuXG4gICAgdmFyIGFsaWFzZXMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGFkZFVuaXRBbGlhcyAodW5pdCwgc2hvcnRoYW5kKSB7XG4gICAgICAgIHZhciBsb3dlckNhc2UgPSB1bml0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGFsaWFzZXNbbG93ZXJDYXNlXSA9IGFsaWFzZXNbbG93ZXJDYXNlICsgJ3MnXSA9IGFsaWFzZXNbc2hvcnRoYW5kXSA9IHVuaXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplVW5pdHModW5pdHMpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB1bml0cyA9PT0gJ3N0cmluZycgPyBhbGlhc2VzW3VuaXRzXSB8fCBhbGlhc2VzW3VuaXRzLnRvTG93ZXJDYXNlKCldIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZU9iamVjdFVuaXRzKGlucHV0T2JqZWN0KSB7XG4gICAgICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSB7fSxcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wLFxuICAgICAgICAgICAgcHJvcDtcblxuICAgICAgICBmb3IgKHByb3AgaW4gaW5wdXRPYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKGlucHV0T2JqZWN0LCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wID0gbm9ybWFsaXplVW5pdHMocHJvcCk7XG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRQcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRJbnB1dFtub3JtYWxpemVkUHJvcF0gPSBpbnB1dE9iamVjdFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9ybWFsaXplZElucHV0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VHZXRTZXQgKHVuaXQsIGtlZXBUaW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZ2V0X3NldF9fc2V0KHRoaXMsIHVuaXQsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIGtlZXBUaW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldF9zZXRfX2dldCh0aGlzLCB1bml0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRfc2V0X19nZXQgKG1vbSwgdW5pdCkge1xuICAgICAgICByZXR1cm4gbW9tLl9kWydnZXQnICsgKG1vbS5faXNVVEMgPyAnVVRDJyA6ICcnKSArIHVuaXRdKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0X3NldF9fc2V0IChtb20sIHVuaXQsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0odmFsdWUpO1xuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldCAodW5pdHMsIHZhbHVlKSB7XG4gICAgICAgIHZhciB1bml0O1xuICAgICAgICBpZiAodHlwZW9mIHVuaXRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZm9yICh1bml0IGluIHVuaXRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQodW5pdCwgdW5pdHNbdW5pdF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNbdW5pdHNdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbdW5pdHNdKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB6ZXJvRmlsbChudW1iZXIsIHRhcmdldExlbmd0aCwgZm9yY2VTaWduKSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSAnJyArIE1hdGguYWJzKG51bWJlciksXG4gICAgICAgICAgICBzaWduID0gbnVtYmVyID49IDA7XG5cbiAgICAgICAgd2hpbGUgKG91dHB1dC5sZW5ndGggPCB0YXJnZXRMZW5ndGgpIHtcbiAgICAgICAgICAgIG91dHB1dCA9ICcwJyArIG91dHB1dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHNpZ24gPyAoZm9yY2VTaWduID8gJysnIDogJycpIDogJy0nKSArIG91dHB1dDtcbiAgICB9XG5cbiAgICB2YXIgZm9ybWF0dGluZ1Rva2VucyA9IC8oXFxbW15cXFtdKlxcXSl8KFxcXFwpPyhNb3xNTT9NP00/fERvfERERG98REQ/RD9EP3xkZGQ/ZD98ZG8/fHdbb3x3XT98V1tvfFddP3xRfFlZWVlZWXxZWVlZWXxZWVlZfFlZfGdnKGdnZz8pP3xHRyhHR0c/KT98ZXxFfGF8QXxoaD98SEg/fG1tP3xzcz98U3sxLDR9fHh8WHx6ej98Wlo/fC4pL2c7XG5cbiAgICB2YXIgbG9jYWxGb3JtYXR0aW5nVG9rZW5zID0gLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KExUU3xMVHxMTD9MP0w/fGx7MSw0fSkvZztcblxuICAgIHZhciBmb3JtYXRGdW5jdGlvbnMgPSB7fTtcblxuICAgIHZhciBmb3JtYXRUb2tlbkZ1bmN0aW9ucyA9IHt9O1xuXG4gICAgLy8gdG9rZW46ICAgICdNJ1xuICAgIC8vIHBhZGRlZDogICBbJ01NJywgMl1cbiAgICAvLyBvcmRpbmFsOiAgJ01vJ1xuICAgIC8vIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7IHRoaXMubW9udGgoKSArIDEgfVxuICAgIGZ1bmN0aW9uIGFkZEZvcm1hdFRva2VuICh0b2tlbiwgcGFkZGVkLCBvcmRpbmFsLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgZnVuYyA9IGNhbGxiYWNrO1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1tjYWxsYmFja10oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1t0b2tlbl0gPSBmdW5jO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYWRkZWQpIHtcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW3BhZGRlZFswXV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHplcm9GaWxsKGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgcGFkZGVkWzFdLCBwYWRkZWRbMl0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkaW5hbCkge1xuICAgICAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbb3JkaW5hbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm9yZGluYWwoZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCB0b2tlbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRm9ybWF0dGluZ1Rva2VucyhpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQubWF0Y2goL1xcW1tcXHNcXFNdLykpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9eXFxbfFxcXSQvZywgJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9cXFxcL2csICcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlRm9ybWF0RnVuY3Rpb24oZm9ybWF0KSB7XG4gICAgICAgIHZhciBhcnJheSA9IGZvcm1hdC5tYXRjaChmb3JtYXR0aW5nVG9rZW5zKSwgaSwgbGVuZ3RoO1xuXG4gICAgICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dKSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSBmb3JtYXRUb2tlbkZ1bmN0aW9uc1thcnJheVtpXV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gcmVtb3ZlRm9ybWF0dGluZ1Rva2VucyhhcnJheVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1vbSkge1xuICAgICAgICAgICAgdmFyIG91dHB1dCA9ICcnO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IGFycmF5W2ldIGluc3RhbmNlb2YgRnVuY3Rpb24gPyBhcnJheVtpXS5jYWxsKG1vbSwgZm9ybWF0KSA6IGFycmF5W2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBmb3JtYXQgZGF0ZSB1c2luZyBuYXRpdmUgZGF0ZSBvYmplY3RcbiAgICBmdW5jdGlvbiBmb3JtYXRNb21lbnQobSwgZm9ybWF0KSB7XG4gICAgICAgIGlmICghbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBtLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybWF0ID0gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbS5sb2NhbGVEYXRhKCkpO1xuXG4gICAgICAgIGlmICghZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0pIHtcbiAgICAgICAgICAgIGZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdID0gbWFrZUZvcm1hdEZ1bmN0aW9uKGZvcm1hdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0obSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbG9jYWxlKSB7XG4gICAgICAgIHZhciBpID0gNTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlTG9uZ0RhdGVGb3JtYXRUb2tlbnMoaW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGUubG9uZ0RhdGVGb3JtYXQoaW5wdXQpIHx8IGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLmxhc3RJbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChpID49IDAgJiYgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLnRlc3QoZm9ybWF0KSkge1xuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UobG9jYWxGb3JtYXR0aW5nVG9rZW5zLCByZXBsYWNlTG9uZ0RhdGVGb3JtYXRUb2tlbnMpO1xuICAgICAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICBpIC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybWF0O1xuICAgIH1cblxuICAgIHZhciBtYXRjaDEgICAgICAgICA9IC9cXGQvOyAgICAgICAgICAgIC8vICAgICAgIDAgLSA5XG4gICAgdmFyIG1hdGNoMiAgICAgICAgID0gL1xcZFxcZC87ICAgICAgICAgIC8vICAgICAgMDAgLSA5OVxuICAgIHZhciBtYXRjaDMgICAgICAgICA9IC9cXGR7M30vOyAgICAgICAgIC8vICAgICAwMDAgLSA5OTlcbiAgICB2YXIgbWF0Y2g0ICAgICAgICAgPSAvXFxkezR9LzsgICAgICAgICAvLyAgICAwMDAwIC0gOTk5OVxuICAgIHZhciBtYXRjaDYgICAgICAgICA9IC9bKy1dP1xcZHs2fS87ICAgIC8vIC05OTk5OTkgLSA5OTk5OTlcbiAgICB2YXIgbWF0Y2gxdG8yICAgICAgPSAvXFxkXFxkPy87ICAgICAgICAgLy8gICAgICAgMCAtIDk5XG4gICAgdmFyIG1hdGNoMXRvMyAgICAgID0gL1xcZHsxLDN9LzsgICAgICAgLy8gICAgICAgMCAtIDk5OVxuICAgIHZhciBtYXRjaDF0bzQgICAgICA9IC9cXGR7MSw0fS87ICAgICAgIC8vICAgICAgIDAgLSA5OTk5XG4gICAgdmFyIG1hdGNoMXRvNiAgICAgID0gL1srLV0/XFxkezEsNn0vOyAgLy8gLTk5OTk5OSAtIDk5OTk5OVxuXG4gICAgdmFyIG1hdGNoVW5zaWduZWQgID0gL1xcZCsvOyAgICAgICAgICAgLy8gICAgICAgMCAtIGluZlxuICAgIHZhciBtYXRjaFNpZ25lZCAgICA9IC9bKy1dP1xcZCsvOyAgICAgIC8vICAgIC1pbmYgLSBpbmZcblxuICAgIHZhciBtYXRjaE9mZnNldCAgICA9IC9afFsrLV1cXGRcXGQ6P1xcZFxcZC9naTsgLy8gKzAwOjAwIC0wMDowMCArMDAwMCAtMDAwMCBvciBaXG5cbiAgICB2YXIgbWF0Y2hUaW1lc3RhbXAgPSAvWystXT9cXGQrKFxcLlxcZHsxLDN9KT8vOyAvLyAxMjM0NTY3ODkgMTIzNDU2Nzg5LjEyM1xuXG4gICAgLy8gYW55IHdvcmQgKG9yIHR3bykgY2hhcmFjdGVycyBvciBudW1iZXJzIGluY2x1ZGluZyB0d28vdGhyZWUgd29yZCBtb250aCBpbiBhcmFiaWMuXG4gICAgdmFyIG1hdGNoV29yZCA9IC9bMC05XSpbJ2EtelxcdTAwQTAtXFx1MDVGRlxcdTA3MDAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0rfFtcXHUwNjAwLVxcdTA2RkZcXC9dKyhcXHMqP1tcXHUwNjAwLVxcdTA2RkZdKyl7MSwyfS9pO1xuXG4gICAgdmFyIHJlZ2V4ZXMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGFkZFJlZ2V4VG9rZW4gKHRva2VuLCByZWdleCwgc3RyaWN0UmVnZXgpIHtcbiAgICAgICAgcmVnZXhlc1t0b2tlbl0gPSB0eXBlb2YgcmVnZXggPT09ICdmdW5jdGlvbicgPyByZWdleCA6IGZ1bmN0aW9uIChpc1N0cmljdCkge1xuICAgICAgICAgICAgcmV0dXJuIChpc1N0cmljdCAmJiBzdHJpY3RSZWdleCkgPyBzdHJpY3RSZWdleCA6IHJlZ2V4O1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBhcnNlUmVnZXhGb3JUb2tlbiAodG9rZW4sIGNvbmZpZykge1xuICAgICAgICBpZiAoIWhhc093blByb3AocmVnZXhlcywgdG9rZW4pKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCh1bmVzY2FwZUZvcm1hdCh0b2tlbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZ2V4ZXNbdG9rZW5dKGNvbmZpZy5fc3RyaWN0LCBjb25maWcuX2xvY2FsZSk7XG4gICAgfVxuXG4gICAgLy8gQ29kZSBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU2MTQ5My9pcy10aGVyZS1hLXJlZ2V4cC1lc2NhcGUtZnVuY3Rpb24taW4tamF2YXNjcmlwdFxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlRm9ybWF0KHMpIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZSgnXFxcXCcsICcnKS5yZXBsYWNlKC9cXFxcKFxcWyl8XFxcXChcXF0pfFxcWyhbXlxcXVxcW10qKVxcXXxcXFxcKC4pL2csIGZ1bmN0aW9uIChtYXRjaGVkLCBwMSwgcDIsIHAzLCBwNCkge1xuICAgICAgICAgICAgcmV0dXJuIHAxIHx8IHAyIHx8IHAzIHx8IHA0O1xuICAgICAgICB9KS5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcbiAgICB9XG5cbiAgICB2YXIgdG9rZW5zID0ge307XG5cbiAgICBmdW5jdGlvbiBhZGRQYXJzZVRva2VuICh0b2tlbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGksIGZ1bmMgPSBjYWxsYmFjaztcbiAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRva2VuID0gW3Rva2VuXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgZnVuYyA9IGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgICAgICAgICBhcnJheVtjYWxsYmFja10gPSB0b0ludChpbnB1dCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0b2tlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdG9rZW5zW3Rva2VuW2ldXSA9IGZ1bmM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRXZWVrUGFyc2VUb2tlbiAodG9rZW4sIGNhbGxiYWNrKSB7XG4gICAgICAgIGFkZFBhcnNlVG9rZW4odG9rZW4sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgICAgIGNvbmZpZy5fdyA9IGNvbmZpZy5fdyB8fCB7fTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGlucHV0LCBjb25maWcuX3csIGNvbmZpZywgdG9rZW4pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUaW1lVG9BcnJheUZyb21Ub2tlbih0b2tlbiwgaW5wdXQsIGNvbmZpZykge1xuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCAmJiBoYXNPd25Qcm9wKHRva2VucywgdG9rZW4pKSB7XG4gICAgICAgICAgICB0b2tlbnNbdG9rZW5dKGlucHV0LCBjb25maWcuX2EsIGNvbmZpZywgdG9rZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIFlFQVIgPSAwO1xuICAgIHZhciBNT05USCA9IDE7XG4gICAgdmFyIERBVEUgPSAyO1xuICAgIHZhciBIT1VSID0gMztcbiAgICB2YXIgTUlOVVRFID0gNDtcbiAgICB2YXIgU0VDT05EID0gNTtcbiAgICB2YXIgTUlMTElTRUNPTkQgPSA2O1xuXG4gICAgZnVuY3Rpb24gZGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoICsgMSwgMCkpLmdldFVUQ0RhdGUoKTtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignTScsIFsnTU0nLCAyXSwgJ01vJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb250aCgpICsgMTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdNTU0nLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tb250aHNTaG9ydCh0aGlzLCBmb3JtYXQpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ01NTU0nLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tb250aHModGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnbW9udGgnLCAnTScpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignTScsICAgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignTU0nLCAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdNTU0nLCAgbWF0Y2hXb3JkKTtcbiAgICBhZGRSZWdleFRva2VuKCdNTU1NJywgbWF0Y2hXb3JkKTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydNJywgJ01NJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbTU9OVEhdID0gdG9JbnQoaW5wdXQpIC0gMTtcbiAgICB9KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydNTU0nLCAnTU1NTSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHZhciBtb250aCA9IGNvbmZpZy5fbG9jYWxlLm1vbnRoc1BhcnNlKGlucHV0LCB0b2tlbiwgY29uZmlnLl9zdHJpY3QpO1xuICAgICAgICAvLyBpZiB3ZSBkaWRuJ3QgZmluZCBhIG1vbnRoIG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZC5cbiAgICAgICAgaWYgKG1vbnRoICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFycmF5W01PTlRIXSA9IG1vbnRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZE1vbnRoID0gaW5wdXQ7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIHZhciBkZWZhdWx0TG9jYWxlTW9udGhzID0gJ0phbnVhcnlfRmVicnVhcnlfTWFyY2hfQXByaWxfTWF5X0p1bmVfSnVseV9BdWd1c3RfU2VwdGVtYmVyX09jdG9iZXJfTm92ZW1iZXJfRGVjZW1iZXInLnNwbGl0KCdfJyk7XG4gICAgZnVuY3Rpb24gbG9jYWxlTW9udGhzIChtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb250aHNbbS5tb250aCgpXTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZU1vbnRoc1Nob3J0ID0gJ0phbl9GZWJfTWFyX0Fwcl9NYXlfSnVuX0p1bF9BdWdfU2VwX09jdF9Ob3ZfRGVjJy5zcGxpdCgnXycpO1xuICAgIGZ1bmN0aW9uIGxvY2FsZU1vbnRoc1Nob3J0IChtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFttLm1vbnRoKCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZU1vbnRoc1BhcnNlIChtb250aE5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XG4gICAgICAgIHZhciBpLCBtb20sIHJlZ2V4O1xuXG4gICAgICAgIGlmICghdGhpcy5fbW9udGhzUGFyc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhbMjAwMCwgaV0pO1xuICAgICAgICAgICAgaWYgKHN0cmljdCAmJiAhdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLm1vbnRocyhtb20sICcnKS5yZXBsYWNlKCcuJywgJycpICsgJyQnLCAnaScpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykucmVwbGFjZSgnLicsICcnKSArICckJywgJ2knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc3RyaWN0ICYmICF0aGlzLl9tb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHJlZ2V4ID0gJ14nICsgdGhpcy5tb250aHMobW9tLCAnJykgKyAnfF4nICsgdGhpcy5tb250aHNTaG9ydChtb20sICcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAocmVnZXgucmVwbGFjZSgnLicsICcnKSwgJ2knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XG4gICAgICAgICAgICBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ01NTU0nICYmIHRoaXMuX2xvbmdNb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ01NTScgJiYgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiB0aGlzLl9tb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIHNldE1vbnRoIChtb20sIHZhbHVlKSB7XG4gICAgICAgIHZhciBkYXlPZk1vbnRoO1xuXG4gICAgICAgIC8vIFRPRE86IE1vdmUgdGhpcyBvdXQgb2YgaGVyZSFcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbW9tLmxvY2FsZURhdGEoKS5tb250aHNQYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICAvLyBUT0RPOiBBbm90aGVyIHNpbGVudCBmYWlsdXJlP1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGF5T2ZNb250aCA9IE1hdGgubWluKG1vbS5kYXRlKCksIGRheXNJbk1vbnRoKG1vbS55ZWFyKCksIHZhbHVlKSk7XG4gICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyAnTW9udGgnXSh2YWx1ZSwgZGF5T2ZNb250aCk7XG4gICAgICAgIHJldHVybiBtb207XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0TW9udGggKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzZXRNb250aCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0X3NldF9fZ2V0KHRoaXMsICdNb250aCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF5c0luTW9udGggKCkge1xuICAgICAgICByZXR1cm4gZGF5c0luTW9udGgodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tPdmVyZmxvdyAobSkge1xuICAgICAgICB2YXIgb3ZlcmZsb3c7XG4gICAgICAgIHZhciBhID0gbS5fYTtcblxuICAgICAgICBpZiAoYSAmJiBnZXRQYXJzaW5nRmxhZ3MobSkub3ZlcmZsb3cgPT09IC0yKSB7XG4gICAgICAgICAgICBvdmVyZmxvdyA9XG4gICAgICAgICAgICAgICAgYVtNT05USF0gICAgICAgPCAwIHx8IGFbTU9OVEhdICAgICAgID4gMTEgID8gTU9OVEggOlxuICAgICAgICAgICAgICAgIGFbREFURV0gICAgICAgIDwgMSB8fCBhW0RBVEVdICAgICAgICA+IGRheXNJbk1vbnRoKGFbWUVBUl0sIGFbTU9OVEhdKSA/IERBVEUgOlxuICAgICAgICAgICAgICAgIGFbSE9VUl0gICAgICAgIDwgMCB8fCBhW0hPVVJdICAgICAgICA+IDI0IHx8IChhW0hPVVJdID09PSAyNCAmJiAoYVtNSU5VVEVdICE9PSAwIHx8IGFbU0VDT05EXSAhPT0gMCB8fCBhW01JTExJU0VDT05EXSAhPT0gMCkpID8gSE9VUiA6XG4gICAgICAgICAgICAgICAgYVtNSU5VVEVdICAgICAgPCAwIHx8IGFbTUlOVVRFXSAgICAgID4gNTkgID8gTUlOVVRFIDpcbiAgICAgICAgICAgICAgICBhW1NFQ09ORF0gICAgICA8IDAgfHwgYVtTRUNPTkRdICAgICAgPiA1OSAgPyBTRUNPTkQgOlxuICAgICAgICAgICAgICAgIGFbTUlMTElTRUNPTkRdIDwgMCB8fCBhW01JTExJU0VDT05EXSA+IDk5OSA/IE1JTExJU0VDT05EIDpcbiAgICAgICAgICAgICAgICAtMTtcblxuICAgICAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhtKS5fb3ZlcmZsb3dEYXlPZlllYXIgJiYgKG92ZXJmbG93IDwgWUVBUiB8fCBvdmVyZmxvdyA+IERBVEUpKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3cgPSBEQVRFO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MobSkub3ZlcmZsb3cgPSBvdmVyZmxvdztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhcm4obXNnKSB7XG4gICAgICAgIGlmICh1dGlsc19ob29rc19faG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID09PSBmYWxzZSAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0RlcHJlY2F0aW9uIHdhcm5pbmc6ICcgKyBtc2cpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVwcmVjYXRlKG1zZywgZm4pIHtcbiAgICAgICAgdmFyIGZpcnN0VGltZSA9IHRydWUsXG4gICAgICAgICAgICBtc2dXaXRoU3RhY2sgPSBtc2cgKyAnXFxuJyArIChuZXcgRXJyb3IoKSkuc3RhY2s7XG5cbiAgICAgICAgcmV0dXJuIGV4dGVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoZmlyc3RUaW1lKSB7XG4gICAgICAgICAgICAgICAgd2Fybihtc2dXaXRoU3RhY2spO1xuICAgICAgICAgICAgICAgIGZpcnN0VGltZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sIGZuKTtcbiAgICB9XG5cbiAgICB2YXIgZGVwcmVjYXRpb25zID0ge307XG5cbiAgICBmdW5jdGlvbiBkZXByZWNhdGVTaW1wbGUobmFtZSwgbXNnKSB7XG4gICAgICAgIGlmICghZGVwcmVjYXRpb25zW25hbWVdKSB7XG4gICAgICAgICAgICB3YXJuKG1zZyk7XG4gICAgICAgICAgICBkZXByZWNhdGlvbnNbbmFtZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnN1cHByZXNzRGVwcmVjYXRpb25XYXJuaW5ncyA9IGZhbHNlO1xuXG4gICAgdmFyIGZyb21fc3RyaW5nX19pc29SZWdleCA9IC9eXFxzKig/OlsrLV1cXGR7Nn18XFxkezR9KS0oPzooXFxkXFxkLVxcZFxcZCl8KFdcXGRcXGQkKXwoV1xcZFxcZC1cXGQpfChcXGRcXGRcXGQpKSgoVHwgKShcXGRcXGQoOlxcZFxcZCg6XFxkXFxkKFxcLlxcZCspPyk/KT8pPyhbXFwrXFwtXVxcZFxcZCg/Ojo/XFxkXFxkKT98XFxzKlopPyk/JC87XG5cbiAgICB2YXIgaXNvRGF0ZXMgPSBbXG4gICAgICAgIFsnWVlZWVlZLU1NLUREJywgL1srLV1cXGR7Nn0tXFxkezJ9LVxcZHsyfS9dLFxuICAgICAgICBbJ1lZWVktTU0tREQnLCAvXFxkezR9LVxcZHsyfS1cXGR7Mn0vXSxcbiAgICAgICAgWydHR0dHLVtXXVdXLUUnLCAvXFxkezR9LVdcXGR7Mn0tXFxkL10sXG4gICAgICAgIFsnR0dHRy1bV11XVycsIC9cXGR7NH0tV1xcZHsyfS9dLFxuICAgICAgICBbJ1lZWVktREREJywgL1xcZHs0fS1cXGR7M30vXVxuICAgIF07XG5cbiAgICAvLyBpc28gdGltZSBmb3JtYXRzIGFuZCByZWdleGVzXG4gICAgdmFyIGlzb1RpbWVzID0gW1xuICAgICAgICBbJ0hIOm1tOnNzLlNTU1MnLCAvKFR8IClcXGRcXGQ6XFxkXFxkOlxcZFxcZFxcLlxcZCsvXSxcbiAgICAgICAgWydISDptbTpzcycsIC8oVHwgKVxcZFxcZDpcXGRcXGQ6XFxkXFxkL10sXG4gICAgICAgIFsnSEg6bW0nLCAvKFR8IClcXGRcXGQ6XFxkXFxkL10sXG4gICAgICAgIFsnSEgnLCAvKFR8IClcXGRcXGQvXVxuICAgIF07XG5cbiAgICB2YXIgYXNwTmV0SnNvblJlZ2V4ID0gL15cXC8/RGF0ZVxcKChcXC0/XFxkKykvaTtcblxuICAgIC8vIGRhdGUgZnJvbSBpc28gZm9ybWF0XG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUlTTyhjb25maWcpIHtcbiAgICAgICAgdmFyIGksIGwsXG4gICAgICAgICAgICBzdHJpbmcgPSBjb25maWcuX2ksXG4gICAgICAgICAgICBtYXRjaCA9IGZyb21fc3RyaW5nX19pc29SZWdleC5leGVjKHN0cmluZyk7XG5cbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pc28gPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChpID0gMCwgbCA9IGlzb0RhdGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpc29EYXRlc1tpXVsxXS5leGVjKHN0cmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2hbNV0gc2hvdWxkIGJlICdUJyBvciB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLl9mID0gaXNvRGF0ZXNbaV1bMF0gKyAobWF0Y2hbNl0gfHwgJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gMCwgbCA9IGlzb1RpbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpc29UaW1lc1tpXVsxXS5leGVjKHN0cmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLl9mICs9IGlzb1RpbWVzW2ldWzBdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RyaW5nLm1hdGNoKG1hdGNoT2Zmc2V0KSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5fZiArPSAnWic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRhdGUgZnJvbSBpc28gZm9ybWF0IG9yIGZhbGxiYWNrXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZyhjb25maWcpIHtcbiAgICAgICAgdmFyIG1hdGNoZWQgPSBhc3BOZXRKc29uUmVnZXguZXhlYyhjb25maWcuX2kpO1xuXG4gICAgICAgIGlmIChtYXRjaGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSgrbWF0Y2hlZFsxXSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWdGcm9tSVNPKGNvbmZpZyk7XG4gICAgICAgIGlmIChjb25maWcuX2lzVmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLl9pc1ZhbGlkO1xuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlsc19ob29rc19faG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSBkZXByZWNhdGUoXG4gICAgICAgICdtb21lbnQgY29uc3RydWN0aW9uIGZhbGxzIGJhY2sgdG8ganMgRGF0ZS4gVGhpcyBpcyAnICtcbiAgICAgICAgJ2Rpc2NvdXJhZ2VkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdXBjb21pbmcgbWFqb3IgJyArXG4gICAgICAgICdyZWxlYXNlLiBQbGVhc2UgcmVmZXIgdG8gJyArXG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQwNyBmb3IgbW9yZSBpbmZvLicsXG4gICAgICAgIGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5faSArIChjb25maWcuX3VzZVVUQyA/ICcgVVRDJyA6ICcnKSk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRGF0ZSAoeSwgbSwgZCwgaCwgTSwgcywgbXMpIHtcbiAgICAgICAgLy9jYW4ndCBqdXN0IGFwcGx5KCkgdG8gY3JlYXRlIGEgZGF0ZTpcbiAgICAgICAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE4MTM0OC9pbnN0YW50aWF0aW5nLWEtamF2YXNjcmlwdC1vYmplY3QtYnktY2FsbGluZy1wcm90b3R5cGUtY29uc3RydWN0b3ItYXBwbHlcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh5LCBtLCBkLCBoLCBNLCBzLCBtcyk7XG5cbiAgICAgICAgLy90aGUgZGF0ZSBjb25zdHJ1Y3RvciBkb2Vzbid0IGFjY2VwdCB5ZWFycyA8IDE5NzBcbiAgICAgICAgaWYgKHkgPCAxOTcwKSB7XG4gICAgICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVVUQ0RhdGUgKHkpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQy5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcbiAgICAgICAgaWYgKHkgPCAxOTcwKSB7XG4gICAgICAgICAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVknLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55ZWFyKCkgJSAxMDA7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVknLCAgIDRdLCAgICAgICAwLCAneWVhcicpO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWVknLCAgNV0sICAgICAgIDAsICd5ZWFyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZWVknLCA2LCB0cnVlXSwgMCwgJ3llYXInKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygneWVhcicsICd5Jyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdZJywgICAgICBtYXRjaFNpZ25lZCk7XG4gICAgYWRkUmVnZXhUb2tlbignWVknLCAgICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZWVknLCAgIG1hdGNoMXRvNCwgbWF0Y2g0KTtcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZWScsICBtYXRjaDF0bzYsIG1hdGNoNik7XG4gICAgYWRkUmVnZXhUb2tlbignWVlZWVlZJywgbWF0Y2gxdG82LCBtYXRjaDYpO1xuXG4gICAgYWRkUGFyc2VUb2tlbihbJ1lZWVknLCAnWVlZWVknLCAnWVlZWVlZJ10sIFlFQVIpO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1lZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtZRUFSXSA9IHV0aWxzX2hvb2tzX19ob29rcy5wYXJzZVR3b0RpZ2l0WWVhcihpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICBmdW5jdGlvbiBkYXlzSW5ZZWFyKHllYXIpIHtcbiAgICAgICAgcmV0dXJuIGlzTGVhcFllYXIoeWVhcikgPyAzNjYgOiAzNjU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNMZWFwWWVhcih5ZWFyKSB7XG4gICAgICAgIHJldHVybiAoeWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCkgfHwgeWVhciAlIDQwMCA9PT0gMDtcbiAgICB9XG5cbiAgICAvLyBIT09LU1xuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnBhcnNlVHdvRGlnaXRZZWFyID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0b0ludChpbnB1dCkgKyAodG9JbnQoaW5wdXQpID4gNjggPyAxOTAwIDogMjAwMCk7XG4gICAgfTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXRZZWFyID0gbWFrZUdldFNldCgnRnVsbFllYXInLCBmYWxzZSk7XG5cbiAgICBmdW5jdGlvbiBnZXRJc0xlYXBZZWFyICgpIHtcbiAgICAgICAgcmV0dXJuIGlzTGVhcFllYXIodGhpcy55ZWFyKCkpO1xuICAgIH1cblxuICAgIGFkZEZvcm1hdFRva2VuKCd3JywgWyd3dycsIDJdLCAnd28nLCAnd2VlaycpO1xuICAgIGFkZEZvcm1hdFRva2VuKCdXJywgWydXVycsIDJdLCAnV28nLCAnaXNvV2VlaycpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCd3ZWVrJywgJ3cnKTtcbiAgICBhZGRVbml0QWxpYXMoJ2lzb1dlZWsnLCAnVycpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigndycsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ3d3JywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1cnLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdXVycsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcblxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsndycsICd3dycsICdXJywgJ1dXJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB3ZWVrW3Rva2VuLnN1YnN0cigwLCAxKV0gPSB0b0ludChpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICAvLyBmaXJzdERheU9mV2VlayAgICAgICAwID0gc3VuLCA2ID0gc2F0XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgdGhlIGRheSBvZiB0aGUgd2VlayB0aGF0IHN0YXJ0cyB0aGUgd2Vla1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICh1c3VhbGx5IHN1bmRheSBvciBtb25kYXkpXG4gICAgLy8gZmlyc3REYXlPZldlZWtPZlllYXIgMCA9IHN1biwgNiA9IHNhdFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgIHRoZSBmaXJzdCB3ZWVrIGlzIHRoZSB3ZWVrIHRoYXQgY29udGFpbnMgdGhlIGZpcnN0XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgb2YgdGhpcyBkYXkgb2YgdGhlIHdlZWtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAoZWcuIElTTyB3ZWVrcyB1c2UgdGh1cnNkYXkgKDQpKVxuICAgIGZ1bmN0aW9uIHdlZWtPZlllYXIobW9tLCBmaXJzdERheU9mV2VlaywgZmlyc3REYXlPZldlZWtPZlllYXIpIHtcbiAgICAgICAgdmFyIGVuZCA9IGZpcnN0RGF5T2ZXZWVrT2ZZZWFyIC0gZmlyc3REYXlPZldlZWssXG4gICAgICAgICAgICBkYXlzVG9EYXlPZldlZWsgPSBmaXJzdERheU9mV2Vla09mWWVhciAtIG1vbS5kYXkoKSxcbiAgICAgICAgICAgIGFkanVzdGVkTW9tZW50O1xuXG5cbiAgICAgICAgaWYgKGRheXNUb0RheU9mV2VlayA+IGVuZCkge1xuICAgICAgICAgICAgZGF5c1RvRGF5T2ZXZWVrIC09IDc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF5c1RvRGF5T2ZXZWVrIDwgZW5kIC0gNykge1xuICAgICAgICAgICAgZGF5c1RvRGF5T2ZXZWVrICs9IDc7XG4gICAgICAgIH1cblxuICAgICAgICBhZGp1c3RlZE1vbWVudCA9IGxvY2FsX19jcmVhdGVMb2NhbChtb20pLmFkZChkYXlzVG9EYXlPZldlZWssICdkJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3ZWVrOiBNYXRoLmNlaWwoYWRqdXN0ZWRNb21lbnQuZGF5T2ZZZWFyKCkgLyA3KSxcbiAgICAgICAgICAgIHllYXI6IGFkanVzdGVkTW9tZW50LnllYXIoKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIExPQ0FMRVNcblxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWsgKG1vbSkge1xuICAgICAgICByZXR1cm4gd2Vla09mWWVhcihtb20sIHRoaXMuX3dlZWsuZG93LCB0aGlzLl93ZWVrLmRveSkud2VlaztcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWsgPSB7XG4gICAgICAgIGRvdyA6IDAsIC8vIFN1bmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuICAgICAgICBkb3kgOiA2ICAvLyBUaGUgd2VlayB0aGF0IGNvbnRhaW5zIEphbiAxc3QgaXMgdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXIuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGxvY2FsZUZpcnN0RGF5T2ZXZWVrICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWsuZG93O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZUZpcnN0RGF5T2ZZZWFyICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWsuZG95O1xuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWsgKGlucHV0KSB7XG4gICAgICAgIHZhciB3ZWVrID0gdGhpcy5sb2NhbGVEYXRhKCkud2Vlayh0aGlzKTtcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldElTT1dlZWsgKGlucHV0KSB7XG4gICAgICAgIHZhciB3ZWVrID0gd2Vla09mWWVhcih0aGlzLCAxLCA0KS53ZWVrO1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWsgOiB0aGlzLmFkZCgoaW5wdXQgLSB3ZWVrKSAqIDcsICdkJyk7XG4gICAgfVxuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0RERCcsIFsnRERERCcsIDNdLCAnREREbycsICdkYXlPZlllYXInKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnZGF5T2ZZZWFyJywgJ0RERCcpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignREREJywgIG1hdGNoMXRvMyk7XG4gICAgYWRkUmVnZXhUb2tlbignRERERCcsIG1hdGNoMyk7XG4gICAgYWRkUGFyc2VUb2tlbihbJ0RERCcsICdEREREJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2RheU9mWWVhciA9IHRvSW50KGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIC8vaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlI0NhbGN1bGF0aW5nX2FfZGF0ZV9naXZlbl90aGVfeWVhci4yQ193ZWVrX251bWJlcl9hbmRfd2Vla2RheVxuICAgIGZ1bmN0aW9uIGRheU9mWWVhckZyb21XZWVrcyh5ZWFyLCB3ZWVrLCB3ZWVrZGF5LCBmaXJzdERheU9mV2Vla09mWWVhciwgZmlyc3REYXlPZldlZWspIHtcbiAgICAgICAgdmFyIGQgPSBjcmVhdGVVVENEYXRlKHllYXIsIDAsIDEpLmdldFVUQ0RheSgpO1xuICAgICAgICB2YXIgZGF5c1RvQWRkO1xuICAgICAgICB2YXIgZGF5T2ZZZWFyO1xuXG4gICAgICAgIGQgPSBkID09PSAwID8gNyA6IGQ7XG4gICAgICAgIHdlZWtkYXkgPSB3ZWVrZGF5ICE9IG51bGwgPyB3ZWVrZGF5IDogZmlyc3REYXlPZldlZWs7XG4gICAgICAgIGRheXNUb0FkZCA9IGZpcnN0RGF5T2ZXZWVrIC0gZCArIChkID4gZmlyc3REYXlPZldlZWtPZlllYXIgPyA3IDogMCkgLSAoZCA8IGZpcnN0RGF5T2ZXZWVrID8gNyA6IDApO1xuICAgICAgICBkYXlPZlllYXIgPSA3ICogKHdlZWsgLSAxKSArICh3ZWVrZGF5IC0gZmlyc3REYXlPZldlZWspICsgZGF5c1RvQWRkICsgMTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeWVhciAgICAgIDogZGF5T2ZZZWFyID4gMCA/IHllYXIgICAgICA6IHllYXIgLSAxLFxuICAgICAgICAgICAgZGF5T2ZZZWFyIDogZGF5T2ZZZWFyID4gMCA/IGRheU9mWWVhciA6IGRheXNJblllYXIoeWVhciAtIDEpICsgZGF5T2ZZZWFyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0RGF5T2ZZZWFyIChpbnB1dCkge1xuICAgICAgICB2YXIgZGF5T2ZZZWFyID0gTWF0aC5yb3VuZCgodGhpcy5jbG9uZSgpLnN0YXJ0T2YoJ2RheScpIC0gdGhpcy5jbG9uZSgpLnN0YXJ0T2YoJ3llYXInKSkgLyA4NjRlNSkgKyAxO1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IGRheU9mWWVhciA6IHRoaXMuYWRkKChpbnB1dCAtIGRheU9mWWVhciksICdkJyk7XG4gICAgfVxuXG4gICAgLy8gUGljayB0aGUgZmlyc3QgZGVmaW5lZCBvZiB0d28gb3IgdGhyZWUgYXJndW1lbnRzLlxuICAgIGZ1bmN0aW9uIGRlZmF1bHRzKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGIgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3VycmVudERhdGVBcnJheShjb25maWcpIHtcbiAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGlmIChjb25maWcuX3VzZVVUQykge1xuICAgICAgICAgICAgcmV0dXJuIFtub3cuZ2V0VVRDRnVsbFllYXIoKSwgbm93LmdldFVUQ01vbnRoKCksIG5vdy5nZXRVVENEYXRlKCldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbbm93LmdldEZ1bGxZZWFyKCksIG5vdy5nZXRNb250aCgpLCBub3cuZ2V0RGF0ZSgpXTtcbiAgICB9XG5cbiAgICAvLyBjb252ZXJ0IGFuIGFycmF5IHRvIGEgZGF0ZS5cbiAgICAvLyB0aGUgYXJyYXkgc2hvdWxkIG1pcnJvciB0aGUgcGFyYW1ldGVycyBiZWxvd1xuICAgIC8vIG5vdGU6IGFsbCB2YWx1ZXMgcGFzdCB0aGUgeWVhciBhcmUgb3B0aW9uYWwgYW5kIHdpbGwgZGVmYXVsdCB0byB0aGUgbG93ZXN0IHBvc3NpYmxlIHZhbHVlLlxuICAgIC8vIFt5ZWFyLCBtb250aCwgZGF5ICwgaG91ciwgbWludXRlLCBzZWNvbmQsIG1pbGxpc2Vjb25kXVxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21BcnJheSAoY29uZmlnKSB7XG4gICAgICAgIHZhciBpLCBkYXRlLCBpbnB1dCA9IFtdLCBjdXJyZW50RGF0ZSwgeWVhclRvVXNlO1xuXG4gICAgICAgIGlmIChjb25maWcuX2QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnREYXRlID0gY3VycmVudERhdGVBcnJheShjb25maWcpO1xuXG4gICAgICAgIC8vY29tcHV0ZSBkYXkgb2YgdGhlIHllYXIgZnJvbSB3ZWVrcyBhbmQgd2Vla2RheXNcbiAgICAgICAgaWYgKGNvbmZpZy5fdyAmJiBjb25maWcuX2FbREFURV0gPT0gbnVsbCAmJiBjb25maWcuX2FbTU9OVEhdID09IG51bGwpIHtcbiAgICAgICAgICAgIGRheU9mWWVhckZyb21XZWVrSW5mbyhjb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pZiB0aGUgZGF5IG9mIHRoZSB5ZWFyIGlzIHNldCwgZmlndXJlIG91dCB3aGF0IGl0IGlzXG4gICAgICAgIGlmIChjb25maWcuX2RheU9mWWVhcikge1xuICAgICAgICAgICAgeWVhclRvVXNlID0gZGVmYXVsdHMoY29uZmlnLl9hW1lFQVJdLCBjdXJyZW50RGF0ZVtZRUFSXSk7XG5cbiAgICAgICAgICAgIGlmIChjb25maWcuX2RheU9mWWVhciA+IGRheXNJblllYXIoeWVhclRvVXNlKSkge1xuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLl9vdmVyZmxvd0RheU9mWWVhciA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGUgPSBjcmVhdGVVVENEYXRlKHllYXJUb1VzZSwgMCwgY29uZmlnLl9kYXlPZlllYXIpO1xuICAgICAgICAgICAgY29uZmlnLl9hW01PTlRIXSA9IGRhdGUuZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtEQVRFXSA9IGRhdGUuZ2V0VVRDRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVmYXVsdCB0byBjdXJyZW50IGRhdGUuXG4gICAgICAgIC8vICogaWYgbm8geWVhciwgbW9udGgsIGRheSBvZiBtb250aCBhcmUgZ2l2ZW4sIGRlZmF1bHQgdG8gdG9kYXlcbiAgICAgICAgLy8gKiBpZiBkYXkgb2YgbW9udGggaXMgZ2l2ZW4sIGRlZmF1bHQgbW9udGggYW5kIHllYXJcbiAgICAgICAgLy8gKiBpZiBtb250aCBpcyBnaXZlbiwgZGVmYXVsdCBvbmx5IHllYXJcbiAgICAgICAgLy8gKiBpZiB5ZWFyIGlzIGdpdmVuLCBkb24ndCBkZWZhdWx0IGFueXRoaW5nXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAzICYmIGNvbmZpZy5fYVtpXSA9PSBudWxsOyArK2kpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtpXSA9IGlucHV0W2ldID0gY3VycmVudERhdGVbaV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBaZXJvIG91dCB3aGF0ZXZlciB3YXMgbm90IGRlZmF1bHRlZCwgaW5jbHVkaW5nIHRpbWVcbiAgICAgICAgZm9yICg7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtpXSA9IGlucHV0W2ldID0gKGNvbmZpZy5fYVtpXSA9PSBudWxsKSA/IChpID09PSAyID8gMSA6IDApIDogY29uZmlnLl9hW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgZm9yIDI0OjAwOjAwLjAwMFxuICAgICAgICBpZiAoY29uZmlnLl9hW0hPVVJdID09PSAyNCAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtNSU5VVEVdID09PSAwICYmXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW1NFQ09ORF0gPT09IDAgJiZcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbTUlMTElTRUNPTkRdID09PSAwKSB7XG4gICAgICAgICAgICBjb25maWcuX25leHREYXkgPSB0cnVlO1xuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZy5fZCA9IChjb25maWcuX3VzZVVUQyA/IGNyZWF0ZVVUQ0RhdGUgOiBjcmVhdGVEYXRlKS5hcHBseShudWxsLCBpbnB1dCk7XG4gICAgICAgIC8vIEFwcGx5IHRpbWV6b25lIG9mZnNldCBmcm9tIGlucHV0LiBUaGUgYWN0dWFsIHV0Y09mZnNldCBjYW4gYmUgY2hhbmdlZFxuICAgICAgICAvLyB3aXRoIHBhcnNlWm9uZS5cbiAgICAgICAgaWYgKGNvbmZpZy5fdHptICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZC5zZXRVVENNaW51dGVzKGNvbmZpZy5fZC5nZXRVVENNaW51dGVzKCkgLSBjb25maWcuX3R6bSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLl9uZXh0RGF5KSB7XG4gICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPSAyNDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRheU9mWWVhckZyb21XZWVrSW5mbyhjb25maWcpIHtcbiAgICAgICAgdmFyIHcsIHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSwgdGVtcDtcblxuICAgICAgICB3ID0gY29uZmlnLl93O1xuICAgICAgICBpZiAody5HRyAhPSBudWxsIHx8IHcuVyAhPSBudWxsIHx8IHcuRSAhPSBudWxsKSB7XG4gICAgICAgICAgICBkb3cgPSAxO1xuICAgICAgICAgICAgZG95ID0gNDtcblxuICAgICAgICAgICAgLy8gVE9ETzogV2UgbmVlZCB0byB0YWtlIHRoZSBjdXJyZW50IGlzb1dlZWtZZWFyLCBidXQgdGhhdCBkZXBlbmRzIG9uXG4gICAgICAgICAgICAvLyBob3cgd2UgaW50ZXJwcmV0IG5vdyAobG9jYWwsIHV0YywgZml4ZWQgb2Zmc2V0KS4gU28gY3JlYXRlXG4gICAgICAgICAgICAvLyBhIG5vdyB2ZXJzaW9uIG9mIGN1cnJlbnQgY29uZmlnICh0YWtlIGxvY2FsL3V0Yy9vZmZzZXQgZmxhZ3MsIGFuZFxuICAgICAgICAgICAgLy8gY3JlYXRlIG5vdykuXG4gICAgICAgICAgICB3ZWVrWWVhciA9IGRlZmF1bHRzKHcuR0csIGNvbmZpZy5fYVtZRUFSXSwgd2Vla09mWWVhcihsb2NhbF9fY3JlYXRlTG9jYWwoKSwgMSwgNCkueWVhcik7XG4gICAgICAgICAgICB3ZWVrID0gZGVmYXVsdHMody5XLCAxKTtcbiAgICAgICAgICAgIHdlZWtkYXkgPSBkZWZhdWx0cyh3LkUsIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG93ID0gY29uZmlnLl9sb2NhbGUuX3dlZWsuZG93O1xuICAgICAgICAgICAgZG95ID0gY29uZmlnLl9sb2NhbGUuX3dlZWsuZG95O1xuXG4gICAgICAgICAgICB3ZWVrWWVhciA9IGRlZmF1bHRzKHcuZ2csIGNvbmZpZy5fYVtZRUFSXSwgd2Vla09mWWVhcihsb2NhbF9fY3JlYXRlTG9jYWwoKSwgZG93LCBkb3kpLnllYXIpO1xuICAgICAgICAgICAgd2VlayA9IGRlZmF1bHRzKHcudywgMSk7XG5cbiAgICAgICAgICAgIGlmICh3LmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIHdlZWtkYXkgLS0gbG93IGRheSBudW1iZXJzIGFyZSBjb25zaWRlcmVkIG5leHQgd2Vla1xuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSB3LmQ7XG4gICAgICAgICAgICAgICAgaWYgKHdlZWtkYXkgPCBkb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgKyt3ZWVrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAody5lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBsb2NhbCB3ZWVrZGF5IC0tIGNvdW50aW5nIHN0YXJ0cyBmcm9tIGJlZ2luaW5nIG9mIHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gdy5lICsgZG93O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IHRvIGJlZ2luaW5nIG9mIHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gZG93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRlbXAgPSBkYXlPZlllYXJGcm9tV2Vla3Mod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRveSwgZG93KTtcblxuICAgICAgICBjb25maWcuX2FbWUVBUl0gPSB0ZW1wLnllYXI7XG4gICAgICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdGVtcC5kYXlPZlllYXI7XG4gICAgfVxuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLklTT184NjAxID0gZnVuY3Rpb24gKCkge307XG5cbiAgICAvLyBkYXRlIGZyb20gc3RyaW5nIGFuZCBmb3JtYXQgc3RyaW5nXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpIHtcbiAgICAgICAgLy8gVE9ETzogTW92ZSB0aGlzIHRvIGFub3RoZXIgcGFydCBvZiB0aGUgY3JlYXRpb24gZmxvdyB0byBwcmV2ZW50IGNpcmN1bGFyIGRlcHNcbiAgICAgICAgaWYgKGNvbmZpZy5fZiA9PT0gdXRpbHNfaG9va3NfX2hvb2tzLklTT184NjAxKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tSVNPKGNvbmZpZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcuX2EgPSBbXTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuZW1wdHkgPSB0cnVlO1xuXG4gICAgICAgIC8vIFRoaXMgYXJyYXkgaXMgdXNlZCB0byBtYWtlIGEgRGF0ZSwgZWl0aGVyIHdpdGggYG5ldyBEYXRlYCBvciBgRGF0ZS5VVENgXG4gICAgICAgIHZhciBzdHJpbmcgPSAnJyArIGNvbmZpZy5faSxcbiAgICAgICAgICAgIGksIHBhcnNlZElucHV0LCB0b2tlbnMsIHRva2VuLCBza2lwcGVkLFxuICAgICAgICAgICAgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgICAgIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGggPSAwO1xuXG4gICAgICAgIHRva2VucyA9IGV4cGFuZEZvcm1hdChjb25maWcuX2YsIGNvbmZpZy5fbG9jYWxlKS5tYXRjaChmb3JtYXR0aW5nVG9rZW5zKSB8fCBbXTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIHBhcnNlZElucHV0ID0gKHN0cmluZy5tYXRjaChnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4odG9rZW4sIGNvbmZpZykpIHx8IFtdKVswXTtcbiAgICAgICAgICAgIGlmIChwYXJzZWRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHNraXBwZWQgPSBzdHJpbmcuc3Vic3RyKDAsIHN0cmluZy5pbmRleE9mKHBhcnNlZElucHV0KSk7XG4gICAgICAgICAgICAgICAgaWYgKHNraXBwZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRJbnB1dC5wdXNoKHNraXBwZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmcuc2xpY2Uoc3RyaW5nLmluZGV4T2YocGFyc2VkSW5wdXQpICsgcGFyc2VkSW5wdXQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0b3RhbFBhcnNlZElucHV0TGVuZ3RoICs9IHBhcnNlZElucHV0Lmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRvbid0IHBhcnNlIGlmIGl0J3Mgbm90IGEga25vd24gdG9rZW5cbiAgICAgICAgICAgIGlmIChmb3JtYXRUb2tlbkZ1bmN0aW9uc1t0b2tlbl0pIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuZW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWRkVGltZVRvQXJyYXlGcm9tVG9rZW4odG9rZW4sIHBhcnNlZElucHV0LCBjb25maWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29uZmlnLl9zdHJpY3QgJiYgIXBhcnNlZElucHV0KSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIHJlbWFpbmluZyB1bnBhcnNlZCBpbnB1dCBsZW5ndGggdG8gdGhlIHN0cmluZ1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5jaGFyc0xlZnRPdmVyID0gc3RyaW5nTGVuZ3RoIC0gdG90YWxQYXJzZWRJbnB1dExlbmd0aDtcbiAgICAgICAgaWYgKHN0cmluZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRJbnB1dC5wdXNoKHN0cmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGVhciBfMTJoIGZsYWcgaWYgaG91ciBpcyA8PSAxMlxuICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA8PSAxMiAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA+IDApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaGFuZGxlIG1lcmlkaWVtXG4gICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IG1lcmlkaWVtRml4V3JhcChjb25maWcuX2xvY2FsZSwgY29uZmlnLl9hW0hPVVJdLCBjb25maWcuX21lcmlkaWVtKTtcblxuICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcbiAgICAgICAgY2hlY2tPdmVyZmxvdyhjb25maWcpO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gbWVyaWRpZW1GaXhXcmFwIChsb2NhbGUsIGhvdXIsIG1lcmlkaWVtKSB7XG4gICAgICAgIHZhciBpc1BtO1xuXG4gICAgICAgIGlmIChtZXJpZGllbSA9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBub3RoaW5nIHRvIGRvXG4gICAgICAgICAgICByZXR1cm4gaG91cjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9jYWxlLm1lcmlkaWVtSG91ciAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlLm1lcmlkaWVtSG91cihob3VyLCBtZXJpZGllbSk7XG4gICAgICAgIH0gZWxzZSBpZiAobG9jYWxlLmlzUE0gIT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gRmFsbGJhY2tcbiAgICAgICAgICAgIGlzUG0gPSBsb2NhbGUuaXNQTShtZXJpZGllbSk7XG4gICAgICAgICAgICBpZiAoaXNQbSAmJiBob3VyIDwgMTIpIHtcbiAgICAgICAgICAgICAgICBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc1BtICYmIGhvdXIgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaG91cjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgbm90IHN1cHBvc2VkIHRvIGhhcHBlblxuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nQW5kQXJyYXkoY29uZmlnKSB7XG4gICAgICAgIHZhciB0ZW1wQ29uZmlnLFxuICAgICAgICAgICAgYmVzdE1vbWVudCxcblxuICAgICAgICAgICAgc2NvcmVUb0JlYXQsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgY3VycmVudFNjb3JlO1xuXG4gICAgICAgIGlmIChjb25maWcuX2YubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pbnZhbGlkRm9ybWF0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKE5hTik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29uZmlnLl9mLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjdXJyZW50U2NvcmUgPSAwO1xuICAgICAgICAgICAgdGVtcENvbmZpZyA9IGNvcHlDb25maWcoe30sIGNvbmZpZyk7XG4gICAgICAgICAgICBpZiAoY29uZmlnLl91c2VVVEMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRlbXBDb25maWcuX3VzZVVUQyA9IGNvbmZpZy5fdXNlVVRDO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGVtcENvbmZpZy5fZiA9IGNvbmZpZy5fZltpXTtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQodGVtcENvbmZpZyk7XG5cbiAgICAgICAgICAgIGlmICghdmFsaWRfX2lzVmFsaWQodGVtcENvbmZpZykpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW55IGlucHV0IHRoYXQgd2FzIG5vdCBwYXJzZWQgYWRkIGEgcGVuYWx0eSBmb3IgdGhhdCBmb3JtYXRcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSArPSBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuY2hhcnNMZWZ0T3ZlcjtcblxuICAgICAgICAgICAgLy9vciB0b2tlbnNcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSArPSBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykudW51c2VkVG9rZW5zLmxlbmd0aCAqIDEwO1xuXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuc2NvcmUgPSBjdXJyZW50U2NvcmU7XG5cbiAgICAgICAgICAgIGlmIChzY29yZVRvQmVhdCA9PSBudWxsIHx8IGN1cnJlbnRTY29yZSA8IHNjb3JlVG9CZWF0KSB7XG4gICAgICAgICAgICAgICAgc2NvcmVUb0JlYXQgPSBjdXJyZW50U2NvcmU7XG4gICAgICAgICAgICAgICAgYmVzdE1vbWVudCA9IHRlbXBDb25maWc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBleHRlbmQoY29uZmlnLCBiZXN0TW9tZW50IHx8IHRlbXBDb25maWcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21PYmplY3QoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcuX2QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpID0gbm9ybWFsaXplT2JqZWN0VW5pdHMoY29uZmlnLl9pKTtcbiAgICAgICAgY29uZmlnLl9hID0gW2kueWVhciwgaS5tb250aCwgaS5kYXkgfHwgaS5kYXRlLCBpLmhvdXIsIGkubWludXRlLCBpLnNlY29uZCwgaS5taWxsaXNlY29uZF07XG5cbiAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRnJvbUNvbmZpZyAoY29uZmlnKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IGNvbmZpZy5faSxcbiAgICAgICAgICAgIGZvcm1hdCA9IGNvbmZpZy5fZixcbiAgICAgICAgICAgIHJlcztcblxuICAgICAgICBjb25maWcuX2xvY2FsZSA9IGNvbmZpZy5fbG9jYWxlIHx8IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoY29uZmlnLl9sKTtcblxuICAgICAgICBpZiAoaW5wdXQgPT09IG51bGwgfHwgKGZvcm1hdCA9PT0gdW5kZWZpbmVkICYmIGlucHV0ID09PSAnJykpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZF9fY3JlYXRlSW52YWxpZCh7bnVsbElucHV0OiB0cnVlfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uZmlnLl9pID0gaW5wdXQgPSBjb25maWcuX2xvY2FsZS5wcmVwYXJzZShpbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNNb21lbnQoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1vbWVudChjaGVja092ZXJmbG93KGlucHV0KSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShmb3JtYXQpKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kQXJyYXkoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBpbnB1dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21JbnB1dChjb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzID0gbmV3IE1vbWVudChjaGVja092ZXJmbG93KGNvbmZpZykpO1xuICAgICAgICBpZiAocmVzLl9uZXh0RGF5KSB7XG4gICAgICAgICAgICAvLyBBZGRpbmcgaXMgc21hcnQgZW5vdWdoIGFyb3VuZCBEU1RcbiAgICAgICAgICAgIHJlcy5hZGQoMSwgJ2QnKTtcbiAgICAgICAgICAgIHJlcy5fbmV4dERheSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUlucHV0KGNvbmZpZykge1xuICAgICAgICB2YXIgaW5wdXQgPSBjb25maWcuX2k7XG4gICAgICAgIGlmIChpbnB1dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZShpbnB1dCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKCtpbnB1dCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZyhjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb25maWcuX2EgPSBtYXAoaW5wdXQuc2xpY2UoMCksIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQob2JqLCAxMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZihpbnB1dCkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tT2JqZWN0KGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mKGlucHV0KSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIC8vIGZyb20gbWlsbGlzZWNvbmRzXG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShpbnB1dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2soY29uZmlnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxvY2FsT3JVVEMgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCBpc1VUQykge1xuICAgICAgICB2YXIgYyA9IHt9O1xuXG4gICAgICAgIGlmICh0eXBlb2YobG9jYWxlKSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICBzdHJpY3QgPSBsb2NhbGU7XG4gICAgICAgICAgICBsb2NhbGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gb2JqZWN0IGNvbnN0cnVjdGlvbiBtdXN0IGJlIGRvbmUgdGhpcyB3YXkuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDIzXG4gICAgICAgIGMuX2lzQU1vbWVudE9iamVjdCA9IHRydWU7XG4gICAgICAgIGMuX3VzZVVUQyA9IGMuX2lzVVRDID0gaXNVVEM7XG4gICAgICAgIGMuX2wgPSBsb2NhbGU7XG4gICAgICAgIGMuX2kgPSBpbnB1dDtcbiAgICAgICAgYy5fZiA9IGZvcm1hdDtcbiAgICAgICAgYy5fc3RyaWN0ID0gc3RyaWN0O1xuXG4gICAgICAgIHJldHVybiBjcmVhdGVGcm9tQ29uZmlnKGMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsX19jcmVhdGVMb2NhbCAoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUxvY2FsT3JVVEMoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QsIGZhbHNlKTtcbiAgICB9XG5cbiAgICB2YXIgcHJvdG90eXBlTWluID0gZGVwcmVjYXRlKFxuICAgICAgICAgJ21vbWVudCgpLm1pbiBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50Lm1pbiBpbnN0ZWFkLiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTU0OCcsXG4gICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgdmFyIG90aGVyID0gbG9jYWxfX2NyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgcmV0dXJuIG90aGVyIDwgdGhpcyA/IHRoaXMgOiBvdGhlcjtcbiAgICAgICAgIH1cbiAgICAgKTtcblxuICAgIHZhciBwcm90b3R5cGVNYXggPSBkZXByZWNhdGUoXG4gICAgICAgICdtb21lbnQoKS5tYXggaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudC5tYXggaW5zdGVhZC4gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE1NDgnLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb3RoZXIgPSBsb2NhbF9fY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBvdGhlciA+IHRoaXMgPyB0aGlzIDogb3RoZXI7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gUGljayBhIG1vbWVudCBtIGZyb20gbW9tZW50cyBzbyB0aGF0IG1bZm5dKG90aGVyKSBpcyB0cnVlIGZvciBhbGxcbiAgICAvLyBvdGhlci4gVGhpcyByZWxpZXMgb24gdGhlIGZ1bmN0aW9uIGZuIHRvIGJlIHRyYW5zaXRpdmUuXG4gICAgLy9cbiAgICAvLyBtb21lbnRzIHNob3VsZCBlaXRoZXIgYmUgYW4gYXJyYXkgb2YgbW9tZW50IG9iamVjdHMgb3IgYW4gYXJyYXksIHdob3NlXG4gICAgLy8gZmlyc3QgZWxlbWVudCBpcyBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cy5cbiAgICBmdW5jdGlvbiBwaWNrQnkoZm4sIG1vbWVudHMpIHtcbiAgICAgICAgdmFyIHJlcywgaTtcbiAgICAgICAgaWYgKG1vbWVudHMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkobW9tZW50c1swXSkpIHtcbiAgICAgICAgICAgIG1vbWVudHMgPSBtb21lbnRzWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbW9tZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbF9fY3JlYXRlTG9jYWwoKTtcbiAgICAgICAgfVxuICAgICAgICByZXMgPSBtb21lbnRzWzBdO1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbW9tZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKG1vbWVudHNbaV1bZm5dKHJlcykpIHtcbiAgICAgICAgICAgICAgICByZXMgPSBtb21lbnRzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogVXNlIFtdLnNvcnQgaW5zdGVhZD9cbiAgICBmdW5jdGlvbiBtaW4gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgICAgICByZXR1cm4gcGlja0J5KCdpc0JlZm9yZScsIGFyZ3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1heCAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgICAgIHJldHVybiBwaWNrQnkoJ2lzQWZ0ZXInLCBhcmdzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBEdXJhdGlvbiAoZHVyYXRpb24pIHtcbiAgICAgICAgdmFyIG5vcm1hbGl6ZWRJbnB1dCA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGR1cmF0aW9uKSxcbiAgICAgICAgICAgIHllYXJzID0gbm9ybWFsaXplZElucHV0LnllYXIgfHwgMCxcbiAgICAgICAgICAgIHF1YXJ0ZXJzID0gbm9ybWFsaXplZElucHV0LnF1YXJ0ZXIgfHwgMCxcbiAgICAgICAgICAgIG1vbnRocyA9IG5vcm1hbGl6ZWRJbnB1dC5tb250aCB8fCAwLFxuICAgICAgICAgICAgd2Vla3MgPSBub3JtYWxpemVkSW5wdXQud2VlayB8fCAwLFxuICAgICAgICAgICAgZGF5cyA9IG5vcm1hbGl6ZWRJbnB1dC5kYXkgfHwgMCxcbiAgICAgICAgICAgIGhvdXJzID0gbm9ybWFsaXplZElucHV0LmhvdXIgfHwgMCxcbiAgICAgICAgICAgIG1pbnV0ZXMgPSBub3JtYWxpemVkSW5wdXQubWludXRlIHx8IDAsXG4gICAgICAgICAgICBzZWNvbmRzID0gbm9ybWFsaXplZElucHV0LnNlY29uZCB8fCAwLFxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzID0gbm9ybWFsaXplZElucHV0Lm1pbGxpc2Vjb25kIHx8IDA7XG5cbiAgICAgICAgLy8gcmVwcmVzZW50YXRpb24gZm9yIGRhdGVBZGRSZW1vdmVcbiAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzID0gK21pbGxpc2Vjb25kcyArXG4gICAgICAgICAgICBzZWNvbmRzICogMWUzICsgLy8gMTAwMFxuICAgICAgICAgICAgbWludXRlcyAqIDZlNCArIC8vIDEwMDAgKiA2MFxuICAgICAgICAgICAgaG91cnMgKiAzNmU1OyAvLyAxMDAwICogNjAgKiA2MFxuICAgICAgICAvLyBCZWNhdXNlIG9mIGRhdGVBZGRSZW1vdmUgdHJlYXRzIDI0IGhvdXJzIGFzIGRpZmZlcmVudCBmcm9tIGFcbiAgICAgICAgLy8gZGF5IHdoZW4gd29ya2luZyBhcm91bmQgRFNULCB3ZSBuZWVkIHRvIHN0b3JlIHRoZW0gc2VwYXJhdGVseVxuICAgICAgICB0aGlzLl9kYXlzID0gK2RheXMgK1xuICAgICAgICAgICAgd2Vla3MgKiA3O1xuICAgICAgICAvLyBJdCBpcyBpbXBvc3NpYmxlIHRyYW5zbGF0ZSBtb250aHMgaW50byBkYXlzIHdpdGhvdXQga25vd2luZ1xuICAgICAgICAvLyB3aGljaCBtb250aHMgeW91IGFyZSBhcmUgdGFsa2luZyBhYm91dCwgc28gd2UgaGF2ZSB0byBzdG9yZVxuICAgICAgICAvLyBpdCBzZXBhcmF0ZWx5LlxuICAgICAgICB0aGlzLl9tb250aHMgPSArbW9udGhzICtcbiAgICAgICAgICAgIHF1YXJ0ZXJzICogMyArXG4gICAgICAgICAgICB5ZWFycyAqIDEyO1xuXG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcblxuICAgICAgICB0aGlzLl9sb2NhbGUgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKCk7XG5cbiAgICAgICAgdGhpcy5fYnViYmxlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEdXJhdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBEdXJhdGlvbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvZmZzZXQgKHRva2VuLCBzZXBhcmF0b3IpIHtcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4odG9rZW4sIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLnV0Y09mZnNldCgpO1xuICAgICAgICAgICAgdmFyIHNpZ24gPSAnKyc7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XG4gICAgICAgICAgICAgICAgc2lnbiA9ICctJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzaWduICsgemVyb0ZpbGwofn4ob2Zmc2V0IC8gNjApLCAyKSArIHNlcGFyYXRvciArIHplcm9GaWxsKH5+KG9mZnNldCkgJSA2MCwgMik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9mZnNldCgnWicsICc6Jyk7XG4gICAgb2Zmc2V0KCdaWicsICcnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ1onLCAgbWF0Y2hPZmZzZXQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1paJywgbWF0Y2hPZmZzZXQpO1xuICAgIGFkZFBhcnNlVG9rZW4oWydaJywgJ1paJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX3VzZVVUQyA9IHRydWU7XG4gICAgICAgIGNvbmZpZy5fdHptID0gb2Zmc2V0RnJvbVN0cmluZyhpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICAvLyB0aW1lem9uZSBjaHVua2VyXG4gICAgLy8gJysxMDowMCcgPiBbJzEwJywgICcwMCddXG4gICAgLy8gJy0xNTMwJyAgPiBbJy0xNScsICczMCddXG4gICAgdmFyIGNodW5rT2Zmc2V0ID0gLyhbXFwrXFwtXXxcXGRcXGQpL2dpO1xuXG4gICAgZnVuY3Rpb24gb2Zmc2V0RnJvbVN0cmluZyhzdHJpbmcpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSAoKHN0cmluZyB8fCAnJykubWF0Y2gobWF0Y2hPZmZzZXQpIHx8IFtdKTtcbiAgICAgICAgdmFyIGNodW5rICAgPSBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV0gfHwgW107XG4gICAgICAgIHZhciBwYXJ0cyAgID0gKGNodW5rICsgJycpLm1hdGNoKGNodW5rT2Zmc2V0KSB8fCBbJy0nLCAwLCAwXTtcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSArKHBhcnRzWzFdICogNjApICsgdG9JbnQocGFydHNbMl0pO1xuXG4gICAgICAgIHJldHVybiBwYXJ0c1swXSA9PT0gJysnID8gbWludXRlcyA6IC1taW51dGVzO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIG1vbWVudCBmcm9tIGlucHV0LCB0aGF0IGlzIGxvY2FsL3V0Yy96b25lIGVxdWl2YWxlbnQgdG8gbW9kZWwuXG4gICAgZnVuY3Rpb24gY2xvbmVXaXRoT2Zmc2V0KGlucHV0LCBtb2RlbCkge1xuICAgICAgICB2YXIgcmVzLCBkaWZmO1xuICAgICAgICBpZiAobW9kZWwuX2lzVVRDKSB7XG4gICAgICAgICAgICByZXMgPSBtb2RlbC5jbG9uZSgpO1xuICAgICAgICAgICAgZGlmZiA9IChpc01vbWVudChpbnB1dCkgfHwgaXNEYXRlKGlucHV0KSA/ICtpbnB1dCA6ICtsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpKSAtICgrcmVzKTtcbiAgICAgICAgICAgIC8vIFVzZSBsb3ctbGV2ZWwgYXBpLCBiZWNhdXNlIHRoaXMgZm4gaXMgbG93LWxldmVsIGFwaS5cbiAgICAgICAgICAgIHJlcy5fZC5zZXRUaW1lKCtyZXMuX2QgKyBkaWZmKTtcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQocmVzLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCkubG9jYWwoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbW9kZWwuX2lzVVRDID8gbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KS56b25lKG1vZGVsLl9vZmZzZXQgfHwgMCkgOiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpLmxvY2FsKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0ZU9mZnNldCAobSkge1xuICAgICAgICAvLyBPbiBGaXJlZm94LjI0IERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyBhIGZsb2F0aW5nIHBvaW50LlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9wdWxsLzE4NzFcbiAgICAgICAgcmV0dXJuIC1NYXRoLnJvdW5kKG0uX2QuZ2V0VGltZXpvbmVPZmZzZXQoKSAvIDE1KSAqIDE1O1xuICAgIH1cblxuICAgIC8vIEhPT0tTXG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyIGEgbW9tZW50IGlzIG11dGF0ZWQuXG4gICAgLy8gSXQgaXMgaW50ZW5kZWQgdG8ga2VlcCB0aGUgb2Zmc2V0IGluIHN5bmMgd2l0aCB0aGUgdGltZXpvbmUuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgLy8ga2VlcExvY2FsVGltZSA9IHRydWUgbWVhbnMgb25seSBjaGFuZ2UgdGhlIHRpbWV6b25lLCB3aXRob3V0XG4gICAgLy8gYWZmZWN0aW5nIHRoZSBsb2NhbCBob3VyLiBTbyA1OjMxOjI2ICswMzAwIC0tW3V0Y09mZnNldCgyLCB0cnVlKV0tLT5cbiAgICAvLyA1OjMxOjI2ICswMjAwIEl0IGlzIHBvc3NpYmxlIHRoYXQgNTozMToyNiBkb2Vzbid0IGV4aXN0IHdpdGggb2Zmc2V0XG4gICAgLy8gKzAyMDAsIHNvIHdlIGFkanVzdCB0aGUgdGltZSBhcyBuZWVkZWQsIHRvIGJlIHZhbGlkLlxuICAgIC8vXG4gICAgLy8gS2VlcGluZyB0aGUgdGltZSBhY3R1YWxseSBhZGRzL3N1YnRyYWN0cyAob25lIGhvdXIpXG4gICAgLy8gZnJvbSB0aGUgYWN0dWFsIHJlcHJlc2VudGVkIHRpbWUuIFRoYXQgaXMgd2h5IHdlIGNhbGwgdXBkYXRlT2Zmc2V0XG4gICAgLy8gYSBzZWNvbmQgdGltZS4gSW4gY2FzZSBpdCB3YW50cyB1cyB0byBjaGFuZ2UgdGhlIG9mZnNldCBhZ2FpblxuICAgIC8vIF9jaGFuZ2VJblByb2dyZXNzID09IHRydWUgY2FzZSwgdGhlbiB3ZSBoYXZlIHRvIGFkanVzdCwgYmVjYXVzZVxuICAgIC8vIHRoZXJlIGlzIG5vIHN1Y2ggdGltZSBpbiB0aGUgZ2l2ZW4gdGltZXpvbmUuXG4gICAgZnVuY3Rpb24gZ2V0U2V0T2Zmc2V0IChpbnB1dCwga2VlcExvY2FsVGltZSkge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fb2Zmc2V0IHx8IDAsXG4gICAgICAgICAgICBsb2NhbEFkanVzdDtcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBvZmZzZXRGcm9tU3RyaW5nKGlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhpbnB1dCkgPCAxNikge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXQgKiA2MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5faXNVVEMgJiYga2VlcExvY2FsVGltZSkge1xuICAgICAgICAgICAgICAgIGxvY2FsQWRqdXN0ID0gZ2V0RGF0ZU9mZnNldCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IGlucHV0O1xuICAgICAgICAgICAgdGhpcy5faXNVVEMgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGxvY2FsQWRqdXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChsb2NhbEFkanVzdCwgJ20nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IGlucHV0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFrZWVwTG9jYWxUaW1lIHx8IHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCh0aGlzLCBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKGlucHV0IC0gb2Zmc2V0LCAnbScpLCAxLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyBvZmZzZXQgOiBnZXREYXRlT2Zmc2V0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0Wm9uZSAoaW5wdXQsIGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSAtaW5wdXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KGlucHV0LCBrZWVwTG9jYWxUaW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gLXRoaXMudXRjT2Zmc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb1VUQyAoa2VlcExvY2FsVGltZSkge1xuICAgICAgICByZXR1cm4gdGhpcy51dGNPZmZzZXQoMCwga2VlcExvY2FsVGltZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0T2Zmc2V0VG9Mb2NhbCAoa2VlcExvY2FsVGltZSkge1xuICAgICAgICBpZiAodGhpcy5faXNVVEMpIHtcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KDAsIGtlZXBMb2NhbFRpbWUpO1xuICAgICAgICAgICAgdGhpcy5faXNVVEMgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnRyYWN0KGdldERhdGVPZmZzZXQodGhpcyksICdtJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0T2Zmc2V0VG9QYXJzZWRPZmZzZXQgKCkge1xuICAgICAgICBpZiAodGhpcy5fdHptKSB7XG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCh0aGlzLl90em0pO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLl9pID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQob2Zmc2V0RnJvbVN0cmluZyh0aGlzLl9pKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzQWxpZ25lZEhvdXJPZmZzZXQgKGlucHV0KSB7XG4gICAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgICAgIGlucHV0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0ID0gbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KS51dGNPZmZzZXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAodGhpcy51dGNPZmZzZXQoKSAtIGlucHV0KSAlIDYwID09PSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGF5bGlnaHRTYXZpbmdUaW1lICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KCkgPiB0aGlzLmNsb25lKCkubW9udGgoMCkudXRjT2Zmc2V0KCkgfHxcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KCkgPiB0aGlzLmNsb25lKCkubW9udGgoNSkudXRjT2Zmc2V0KClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZVNoaWZ0ZWQgKCkge1xuICAgICAgICBpZiAodGhpcy5fYSkge1xuICAgICAgICAgICAgdmFyIG90aGVyID0gdGhpcy5faXNVVEMgPyBjcmVhdGVfdXRjX19jcmVhdGVVVEModGhpcy5fYSkgOiBsb2NhbF9fY3JlYXRlTG9jYWwodGhpcy5fYSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgJiYgY29tcGFyZUFycmF5cyh0aGlzLl9hLCBvdGhlci50b0FycmF5KCkpID4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0xvY2FsICgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLl9pc1VUQztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1V0Y09mZnNldCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1VUQztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1V0YyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyAmJiB0aGlzLl9vZmZzZXQgPT09IDA7XG4gICAgfVxuXG4gICAgdmFyIGFzcE5ldFJlZ2V4ID0gLyhcXC0pPyg/OihcXGQqKVxcLik/KFxcZCspXFw6KFxcZCspKD86XFw6KFxcZCspXFwuPyhcXGR7M30pPyk/LztcblxuICAgIC8vIGZyb20gaHR0cDovL2RvY3MuY2xvc3VyZS1saWJyYXJ5Lmdvb2dsZWNvZGUuY29tL2dpdC9jbG9zdXJlX2dvb2dfZGF0ZV9kYXRlLmpzLnNvdXJjZS5odG1sXG4gICAgLy8gc29tZXdoYXQgbW9yZSBpbiBsaW5lIHdpdGggNC40LjMuMiAyMDA0IHNwZWMsIGJ1dCBhbGxvd3MgZGVjaW1hbCBhbnl3aGVyZVxuICAgIHZhciBjcmVhdGVfX2lzb1JlZ2V4ID0gL14oLSk/UCg/Oig/OihbMC05LC5dKilZKT8oPzooWzAtOSwuXSopTSk/KD86KFswLTksLl0qKUQpPyg/OlQoPzooWzAtOSwuXSopSCk/KD86KFswLTksLl0qKU0pPyg/OihbMC05LC5dKilTKT8pP3woWzAtOSwuXSopVykkLztcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24gKGlucHV0LCBrZXkpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gaW5wdXQsXG4gICAgICAgICAgICAvLyBtYXRjaGluZyBhZ2FpbnN0IHJlZ2V4cCBpcyBleHBlbnNpdmUsIGRvIGl0IG9uIGRlbWFuZFxuICAgICAgICAgICAgbWF0Y2ggPSBudWxsLFxuICAgICAgICAgICAgc2lnbixcbiAgICAgICAgICAgIHJldCxcbiAgICAgICAgICAgIGRpZmZSZXM7XG5cbiAgICAgICAgaWYgKGlzRHVyYXRpb24oaW5wdXQpKSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBtcyA6IGlucHV0Ll9taWxsaXNlY29uZHMsXG4gICAgICAgICAgICAgICAgZCAgOiBpbnB1dC5fZGF5cyxcbiAgICAgICAgICAgICAgICBNICA6IGlucHV0Ll9tb250aHNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbltrZXldID0gaW5wdXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uLm1pbGxpc2Vjb25kcyA9IGlucHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCEhKG1hdGNoID0gYXNwTmV0UmVnZXguZXhlYyhpbnB1dCkpKSB7XG4gICAgICAgICAgICBzaWduID0gKG1hdGNoWzFdID09PSAnLScpID8gLTEgOiAxO1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeSAgOiAwLFxuICAgICAgICAgICAgICAgIGQgIDogdG9JbnQobWF0Y2hbREFURV0pICAgICAgICAqIHNpZ24sXG4gICAgICAgICAgICAgICAgaCAgOiB0b0ludChtYXRjaFtIT1VSXSkgICAgICAgICogc2lnbixcbiAgICAgICAgICAgICAgICBtICA6IHRvSW50KG1hdGNoW01JTlVURV0pICAgICAgKiBzaWduLFxuICAgICAgICAgICAgICAgIHMgIDogdG9JbnQobWF0Y2hbU0VDT05EXSkgICAgICAqIHNpZ24sXG4gICAgICAgICAgICAgICAgbXMgOiB0b0ludChtYXRjaFtNSUxMSVNFQ09ORF0pICogc2lnblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmICghIShtYXRjaCA9IGNyZWF0ZV9faXNvUmVnZXguZXhlYyhpbnB1dCkpKSB7XG4gICAgICAgICAgICBzaWduID0gKG1hdGNoWzFdID09PSAnLScpID8gLTEgOiAxO1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeSA6IHBhcnNlSXNvKG1hdGNoWzJdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBNIDogcGFyc2VJc28obWF0Y2hbM10sIHNpZ24pLFxuICAgICAgICAgICAgICAgIGQgOiBwYXJzZUlzbyhtYXRjaFs0XSwgc2lnbiksXG4gICAgICAgICAgICAgICAgaCA6IHBhcnNlSXNvKG1hdGNoWzVdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBtIDogcGFyc2VJc28obWF0Y2hbNl0sIHNpZ24pLFxuICAgICAgICAgICAgICAgIHMgOiBwYXJzZUlzbyhtYXRjaFs3XSwgc2lnbiksXG4gICAgICAgICAgICAgICAgdyA6IHBhcnNlSXNvKG1hdGNoWzhdLCBzaWduKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChkdXJhdGlvbiA9PSBudWxsKSB7Ly8gY2hlY2tzIGZvciBudWxsIG9yIHVuZGVmaW5lZFxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZHVyYXRpb24gPT09ICdvYmplY3QnICYmICgnZnJvbScgaW4gZHVyYXRpb24gfHwgJ3RvJyBpbiBkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIGRpZmZSZXMgPSBtb21lbnRzRGlmZmVyZW5jZShsb2NhbF9fY3JlYXRlTG9jYWwoZHVyYXRpb24uZnJvbSksIGxvY2FsX19jcmVhdGVMb2NhbChkdXJhdGlvbi50bykpO1xuXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHt9O1xuICAgICAgICAgICAgZHVyYXRpb24ubXMgPSBkaWZmUmVzLm1pbGxpc2Vjb25kcztcbiAgICAgICAgICAgIGR1cmF0aW9uLk0gPSBkaWZmUmVzLm1vbnRocztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldCA9IG5ldyBEdXJhdGlvbihkdXJhdGlvbik7XG5cbiAgICAgICAgaWYgKGlzRHVyYXRpb24oaW5wdXQpICYmIGhhc093blByb3AoaW5wdXQsICdfbG9jYWxlJykpIHtcbiAgICAgICAgICAgIHJldC5fbG9jYWxlID0gaW5wdXQuX2xvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgY3JlYXRlX19jcmVhdGVEdXJhdGlvbi5mbiA9IER1cmF0aW9uLnByb3RvdHlwZTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlSXNvIChpbnAsIHNpZ24pIHtcbiAgICAgICAgLy8gV2UnZCBub3JtYWxseSB1c2Ugfn5pbnAgZm9yIHRoaXMsIGJ1dCB1bmZvcnR1bmF0ZWx5IGl0IGFsc29cbiAgICAgICAgLy8gY29udmVydHMgZmxvYXRzIHRvIGludHMuXG4gICAgICAgIC8vIGlucCBtYXkgYmUgdW5kZWZpbmVkLCBzbyBjYXJlZnVsIGNhbGxpbmcgcmVwbGFjZSBvbiBpdC5cbiAgICAgICAgdmFyIHJlcyA9IGlucCAmJiBwYXJzZUZsb2F0KGlucC5yZXBsYWNlKCcsJywgJy4nKSk7XG4gICAgICAgIC8vIGFwcGx5IHNpZ24gd2hpbGUgd2UncmUgYXQgaXRcbiAgICAgICAgcmV0dXJuIChpc05hTihyZXMpID8gMCA6IHJlcykgKiBzaWduO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpIHtcbiAgICAgICAgdmFyIHJlcyA9IHttaWxsaXNlY29uZHM6IDAsIG1vbnRoczogMH07XG5cbiAgICAgICAgcmVzLm1vbnRocyA9IG90aGVyLm1vbnRoKCkgLSBiYXNlLm1vbnRoKCkgK1xuICAgICAgICAgICAgKG90aGVyLnllYXIoKSAtIGJhc2UueWVhcigpKSAqIDEyO1xuICAgICAgICBpZiAoYmFzZS5jbG9uZSgpLmFkZChyZXMubW9udGhzLCAnTScpLmlzQWZ0ZXIob3RoZXIpKSB7XG4gICAgICAgICAgICAtLXJlcy5tb250aHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXMubWlsbGlzZWNvbmRzID0gK290aGVyIC0gKyhiYXNlLmNsb25lKCkuYWRkKHJlcy5tb250aHMsICdNJykpO1xuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpIHtcbiAgICAgICAgdmFyIHJlcztcbiAgICAgICAgb3RoZXIgPSBjbG9uZVdpdGhPZmZzZXQob3RoZXIsIGJhc2UpO1xuICAgICAgICBpZiAoYmFzZS5pc0JlZm9yZShvdGhlcikpIHtcbiAgICAgICAgICAgIHJlcyA9IHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzID0gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShvdGhlciwgYmFzZSk7XG4gICAgICAgICAgICByZXMubWlsbGlzZWNvbmRzID0gLXJlcy5taWxsaXNlY29uZHM7XG4gICAgICAgICAgICByZXMubW9udGhzID0gLXJlcy5tb250aHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFkZGVyKGRpcmVjdGlvbiwgbmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgcGVyaW9kKSB7XG4gICAgICAgICAgICB2YXIgZHVyLCB0bXA7XG4gICAgICAgICAgICAvL2ludmVydCB0aGUgYXJndW1lbnRzLCBidXQgY29tcGxhaW4gYWJvdXQgaXRcbiAgICAgICAgICAgIGlmIChwZXJpb2QgIT09IG51bGwgJiYgIWlzTmFOKCtwZXJpb2QpKSB7XG4gICAgICAgICAgICAgICAgZGVwcmVjYXRlU2ltcGxlKG5hbWUsICdtb21lbnQoKS4nICsgbmFtZSAgKyAnKHBlcmlvZCwgbnVtYmVyKSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG1vbWVudCgpLicgKyBuYW1lICsgJyhudW1iZXIsIHBlcmlvZCkuJyk7XG4gICAgICAgICAgICAgICAgdG1wID0gdmFsOyB2YWwgPSBwZXJpb2Q7IHBlcmlvZCA9IHRtcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFsID0gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgPyArdmFsIDogdmFsO1xuICAgICAgICAgICAgZHVyID0gY3JlYXRlX19jcmVhdGVEdXJhdGlvbih2YWwsIHBlcmlvZCk7XG4gICAgICAgICAgICBhZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0KHRoaXMsIGR1ciwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QgKG1vbSwgZHVyYXRpb24sIGlzQWRkaW5nLCB1cGRhdGVPZmZzZXQpIHtcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IGR1cmF0aW9uLl9taWxsaXNlY29uZHMsXG4gICAgICAgICAgICBkYXlzID0gZHVyYXRpb24uX2RheXMsXG4gICAgICAgICAgICBtb250aHMgPSBkdXJhdGlvbi5fbW9udGhzO1xuICAgICAgICB1cGRhdGVPZmZzZXQgPSB1cGRhdGVPZmZzZXQgPT0gbnVsbCA/IHRydWUgOiB1cGRhdGVPZmZzZXQ7XG5cbiAgICAgICAgaWYgKG1pbGxpc2Vjb25kcykge1xuICAgICAgICAgICAgbW9tLl9kLnNldFRpbWUoK21vbS5fZCArIG1pbGxpc2Vjb25kcyAqIGlzQWRkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF5cykge1xuICAgICAgICAgICAgZ2V0X3NldF9fc2V0KG1vbSwgJ0RhdGUnLCBnZXRfc2V0X19nZXQobW9tLCAnRGF0ZScpICsgZGF5cyAqIGlzQWRkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobW9udGhzKSB7XG4gICAgICAgICAgICBzZXRNb250aChtb20sIGdldF9zZXRfX2dldChtb20sICdNb250aCcpICsgbW9udGhzICogaXNBZGRpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGVPZmZzZXQpIHtcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQobW9tLCBkYXlzIHx8IG1vbnRocyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgYWRkX3N1YnRyYWN0X19hZGQgICAgICA9IGNyZWF0ZUFkZGVyKDEsICdhZGQnKTtcbiAgICB2YXIgYWRkX3N1YnRyYWN0X19zdWJ0cmFjdCA9IGNyZWF0ZUFkZGVyKC0xLCAnc3VidHJhY3QnKTtcblxuICAgIGZ1bmN0aW9uIG1vbWVudF9jYWxlbmRhcl9fY2FsZW5kYXIgKHRpbWUpIHtcbiAgICAgICAgLy8gV2Ugd2FudCB0byBjb21wYXJlIHRoZSBzdGFydCBvZiB0b2RheSwgdnMgdGhpcy5cbiAgICAgICAgLy8gR2V0dGluZyBzdGFydC1vZi10b2RheSBkZXBlbmRzIG9uIHdoZXRoZXIgd2UncmUgbG9jYWwvdXRjL29mZnNldCBvciBub3QuXG4gICAgICAgIHZhciBub3cgPSB0aW1lIHx8IGxvY2FsX19jcmVhdGVMb2NhbCgpLFxuICAgICAgICAgICAgc29kID0gY2xvbmVXaXRoT2Zmc2V0KG5vdywgdGhpcykuc3RhcnRPZignZGF5JyksXG4gICAgICAgICAgICBkaWZmID0gdGhpcy5kaWZmKHNvZCwgJ2RheXMnLCB0cnVlKSxcbiAgICAgICAgICAgIGZvcm1hdCA9IGRpZmYgPCAtNiA/ICdzYW1lRWxzZScgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCAtMSA/ICdsYXN0V2VlaycgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCAwID8gJ2xhc3REYXknIDpcbiAgICAgICAgICAgICAgICBkaWZmIDwgMSA/ICdzYW1lRGF5JyA6XG4gICAgICAgICAgICAgICAgZGlmZiA8IDIgPyAnbmV4dERheScgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCA3ID8gJ25leHRXZWVrJyA6ICdzYW1lRWxzZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdCh0aGlzLmxvY2FsZURhdGEoKS5jYWxlbmRhcihmb3JtYXQsIHRoaXMsIGxvY2FsX19jcmVhdGVMb2NhbChub3cpKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvbmUgKCkge1xuICAgICAgICByZXR1cm4gbmV3IE1vbWVudCh0aGlzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0FmdGVyIChpbnB1dCwgdW5pdHMpIHtcbiAgICAgICAgdmFyIGlucHV0TXM7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModHlwZW9mIHVuaXRzICE9PSAndW5kZWZpbmVkJyA/IHVuaXRzIDogJ21pbGxpc2Vjb25kJyk7XG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICAgICAgaW5wdXQgPSBpc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCk7XG4gICAgICAgICAgICByZXR1cm4gK3RoaXMgPiAraW5wdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnB1dE1zID0gaXNNb21lbnQoaW5wdXQpID8gK2lucHV0IDogK2xvY2FsX19jcmVhdGVMb2NhbChpbnB1dCk7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXRNcyA8ICt0aGlzLmNsb25lKCkuc3RhcnRPZih1bml0cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0JlZm9yZSAoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHZhciBpbnB1dE1zO1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHR5cGVvZiB1bml0cyAhPT0gJ3VuZGVmaW5lZCcgPyB1bml0cyA6ICdtaWxsaXNlY29uZCcpO1xuICAgICAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgICAgIGlucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpO1xuICAgICAgICAgICAgcmV0dXJuICt0aGlzIDwgK2lucHV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5wdXRNcyA9IGlzTW9tZW50KGlucHV0KSA/ICtpbnB1dCA6ICtsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpO1xuICAgICAgICAgICAgcmV0dXJuICt0aGlzLmNsb25lKCkuZW5kT2YodW5pdHMpIDwgaW5wdXRNcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQmV0d2VlbiAoZnJvbSwgdG8sIHVuaXRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQWZ0ZXIoZnJvbSwgdW5pdHMpICYmIHRoaXMuaXNCZWZvcmUodG8sIHVuaXRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1NhbWUgKGlucHV0LCB1bml0cykge1xuICAgICAgICB2YXIgaW5wdXRNcztcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyB8fCAnbWlsbGlzZWNvbmQnKTtcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgICAgICBpbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KTtcbiAgICAgICAgICAgIHJldHVybiArdGhpcyA9PT0gK2lucHV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5wdXRNcyA9ICtsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpO1xuICAgICAgICAgICAgcmV0dXJuICsodGhpcy5jbG9uZSgpLnN0YXJ0T2YodW5pdHMpKSA8PSBpbnB1dE1zICYmIGlucHV0TXMgPD0gKyh0aGlzLmNsb25lKCkuZW5kT2YodW5pdHMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFic0Zsb29yIChudW1iZXIpIHtcbiAgICAgICAgaWYgKG51bWJlciA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwobnVtYmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKG51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaWZmIChpbnB1dCwgdW5pdHMsIGFzRmxvYXQpIHtcbiAgICAgICAgdmFyIHRoYXQgPSBjbG9uZVdpdGhPZmZzZXQoaW5wdXQsIHRoaXMpLFxuICAgICAgICAgICAgem9uZURlbHRhID0gKHRoYXQudXRjT2Zmc2V0KCkgLSB0aGlzLnV0Y09mZnNldCgpKSAqIDZlNCxcbiAgICAgICAgICAgIGRlbHRhLCBvdXRwdXQ7XG5cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG5cbiAgICAgICAgaWYgKHVuaXRzID09PSAneWVhcicgfHwgdW5pdHMgPT09ICdtb250aCcgfHwgdW5pdHMgPT09ICdxdWFydGVyJykge1xuICAgICAgICAgICAgb3V0cHV0ID0gbW9udGhEaWZmKHRoaXMsIHRoYXQpO1xuICAgICAgICAgICAgaWYgKHVuaXRzID09PSAncXVhcnRlcicpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgLyAzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh1bml0cyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0IC8gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWx0YSA9IHRoaXMgLSB0aGF0O1xuICAgICAgICAgICAgb3V0cHV0ID0gdW5pdHMgPT09ICdzZWNvbmQnID8gZGVsdGEgLyAxZTMgOiAvLyAxMDAwXG4gICAgICAgICAgICAgICAgdW5pdHMgPT09ICdtaW51dGUnID8gZGVsdGEgLyA2ZTQgOiAvLyAxMDAwICogNjBcbiAgICAgICAgICAgICAgICB1bml0cyA9PT0gJ2hvdXInID8gZGVsdGEgLyAzNmU1IDogLy8gMTAwMCAqIDYwICogNjBcbiAgICAgICAgICAgICAgICB1bml0cyA9PT0gJ2RheScgPyAoZGVsdGEgLSB6b25lRGVsdGEpIC8gODY0ZTUgOiAvLyAxMDAwICogNjAgKiA2MCAqIDI0LCBuZWdhdGUgZHN0XG4gICAgICAgICAgICAgICAgdW5pdHMgPT09ICd3ZWVrJyA/IChkZWx0YSAtIHpvbmVEZWx0YSkgLyA2MDQ4ZTUgOiAvLyAxMDAwICogNjAgKiA2MCAqIDI0ICogNywgbmVnYXRlIGRzdFxuICAgICAgICAgICAgICAgIGRlbHRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhc0Zsb2F0ID8gb3V0cHV0IDogYWJzRmxvb3Iob3V0cHV0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb250aERpZmYgKGEsIGIpIHtcbiAgICAgICAgLy8gZGlmZmVyZW5jZSBpbiBtb250aHNcbiAgICAgICAgdmFyIHdob2xlTW9udGhEaWZmID0gKChiLnllYXIoKSAtIGEueWVhcigpKSAqIDEyKSArIChiLm1vbnRoKCkgLSBhLm1vbnRoKCkpLFxuICAgICAgICAgICAgLy8gYiBpcyBpbiAoYW5jaG9yIC0gMSBtb250aCwgYW5jaG9yICsgMSBtb250aClcbiAgICAgICAgICAgIGFuY2hvciA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYsICdtb250aHMnKSxcbiAgICAgICAgICAgIGFuY2hvcjIsIGFkanVzdDtcblxuICAgICAgICBpZiAoYiAtIGFuY2hvciA8IDApIHtcbiAgICAgICAgICAgIGFuY2hvcjIgPSBhLmNsb25lKCkuYWRkKHdob2xlTW9udGhEaWZmIC0gMSwgJ21vbnRocycpO1xuICAgICAgICAgICAgLy8gbGluZWFyIGFjcm9zcyB0aGUgbW9udGhcbiAgICAgICAgICAgIGFkanVzdCA9IChiIC0gYW5jaG9yKSAvIChhbmNob3IgLSBhbmNob3IyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFuY2hvcjIgPSBhLmNsb25lKCkuYWRkKHdob2xlTW9udGhEaWZmICsgMSwgJ21vbnRocycpO1xuICAgICAgICAgICAgLy8gbGluZWFyIGFjcm9zcyB0aGUgbW9udGhcbiAgICAgICAgICAgIGFkanVzdCA9IChiIC0gYW5jaG9yKSAvIChhbmNob3IyIC0gYW5jaG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtKHdob2xlTW9udGhEaWZmICsgYWRqdXN0KTtcbiAgICB9XG5cbiAgICB1dGlsc19ob29rc19faG9va3MuZGVmYXVsdEZvcm1hdCA9ICdZWVlZLU1NLUREVEhIOm1tOnNzWic7XG5cbiAgICBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkubG9jYWxlKCdlbicpLmZvcm1hdCgnZGRkIE1NTSBERCBZWVlZIEhIOm1tOnNzIFtHTVRdWlonKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb21lbnRfZm9ybWF0X190b0lTT1N0cmluZyAoKSB7XG4gICAgICAgIHZhciBtID0gdGhpcy5jbG9uZSgpLnV0YygpO1xuICAgICAgICBpZiAoMCA8IG0ueWVhcigpICYmIG0ueWVhcigpIDw9IDk5OTkpIHtcbiAgICAgICAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBuYXRpdmUgaW1wbGVtZW50YXRpb24gaXMgfjUweCBmYXN0ZXIsIHVzZSBpdCB3aGVuIHdlIGNhblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXRNb21lbnQobSwgJ1lZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXRNb21lbnQobSwgJ1lZWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0IChpbnB1dFN0cmluZykge1xuICAgICAgICB2YXIgb3V0cHV0ID0gZm9ybWF0TW9tZW50KHRoaXMsIGlucHV0U3RyaW5nIHx8IHV0aWxzX2hvb2tzX19ob29rcy5kZWZhdWx0Rm9ybWF0KTtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLnBvc3Rmb3JtYXQob3V0cHV0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmcm9tICh0aW1lLCB3aXRob3V0U3VmZml4KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKHt0bzogdGhpcywgZnJvbTogdGltZX0pLmxvY2FsZSh0aGlzLmxvY2FsZSgpKS5odW1hbml6ZSghd2l0aG91dFN1ZmZpeCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZnJvbU5vdyAod2l0aG91dFN1ZmZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mcm9tKGxvY2FsX19jcmVhdGVMb2NhbCgpLCB3aXRob3V0U3VmZml4KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0byAodGltZSwgd2l0aG91dFN1ZmZpeCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlX19jcmVhdGVEdXJhdGlvbih7ZnJvbTogdGhpcywgdG86IHRpbWV9KS5sb2NhbGUodGhpcy5sb2NhbGUoKSkuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvTm93ICh3aXRob3V0U3VmZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvKGxvY2FsX19jcmVhdGVMb2NhbCgpLCB3aXRob3V0U3VmZml4KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGUgKGtleSkge1xuICAgICAgICB2YXIgbmV3TG9jYWxlRGF0YTtcblxuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGUuX2FiYnI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdMb2NhbGVEYXRhID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZShrZXkpO1xuICAgICAgICAgICAgaWYgKG5ld0xvY2FsZURhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsZSA9IG5ld0xvY2FsZURhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsYW5nID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50KCkubGFuZygpIGlzIGRlcHJlY2F0ZWQuIEluc3RlYWQsIHVzZSBtb21lbnQoKS5sb2NhbGVEYXRhKCkgdG8gZ2V0IHRoZSBsYW5ndWFnZSBjb25maWd1cmF0aW9uLiBVc2UgbW9tZW50KCkubG9jYWxlKCkgdG8gY2hhbmdlIGxhbmd1YWdlcy4nLFxuICAgICAgICBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGZ1bmN0aW9uIGxvY2FsZURhdGEgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0T2YgKHVuaXRzKSB7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICAvLyB0aGUgZm9sbG93aW5nIHN3aXRjaCBpbnRlbnRpb25hbGx5IG9taXRzIGJyZWFrIGtleXdvcmRzXG4gICAgICAgIC8vIHRvIHV0aWxpemUgZmFsbGluZyB0aHJvdWdoIHRoZSBjYXNlcy5cbiAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIHRoaXMubW9udGgoMCk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ3F1YXJ0ZXInOlxuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICB0aGlzLmRhdGUoMSk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICBjYXNlICdpc29XZWVrJzpcbiAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgIHRoaXMuaG91cnMoMCk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgdGhpcy5taW51dGVzKDApO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgdGhpcy5zZWNvbmRzKDApO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgdGhpcy5taWxsaXNlY29uZHMoMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3ZWVrcyBhcmUgYSBzcGVjaWFsIGNhc2VcbiAgICAgICAgaWYgKHVuaXRzID09PSAnd2VlaycpIHtcbiAgICAgICAgICAgIHRoaXMud2Vla2RheSgwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodW5pdHMgPT09ICdpc29XZWVrJykge1xuICAgICAgICAgICAgdGhpcy5pc29XZWVrZGF5KDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcXVhcnRlcnMgYXJlIGFsc28gc3BlY2lhbFxuICAgICAgICBpZiAodW5pdHMgPT09ICdxdWFydGVyJykge1xuICAgICAgICAgICAgdGhpcy5tb250aChNYXRoLmZsb29yKHRoaXMubW9udGgoKSAvIDMpICogMyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRPZiAodW5pdHMpIHtcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgICAgIGlmICh1bml0cyA9PT0gdW5kZWZpbmVkIHx8IHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydE9mKHVuaXRzKS5hZGQoMSwgKHVuaXRzID09PSAnaXNvV2VlaycgPyAnd2VlaycgOiB1bml0cykpLnN1YnRyYWN0KDEsICdtcycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvX3R5cGVfX3ZhbHVlT2YgKCkge1xuICAgICAgICByZXR1cm4gK3RoaXMuX2QgLSAoKHRoaXMuX29mZnNldCB8fCAwKSAqIDYwMDAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bml4ICgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoK3RoaXMgLyAxMDAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0RhdGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2V0ID8gbmV3IERhdGUoK3RoaXMpIDogdGhpcy5fZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0FycmF5ICgpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzO1xuICAgICAgICByZXR1cm4gW20ueWVhcigpLCBtLm1vbnRoKCksIG0uZGF0ZSgpLCBtLmhvdXIoKSwgbS5taW51dGUoKSwgbS5zZWNvbmQoKSwgbS5taWxsaXNlY29uZCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb21lbnRfdmFsaWRfX2lzVmFsaWQgKCkge1xuICAgICAgICByZXR1cm4gdmFsaWRfX2lzVmFsaWQodGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2luZ0ZsYWdzICgpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZCh7fSwgZ2V0UGFyc2luZ0ZsYWdzKHRoaXMpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnZhbGlkQXQgKCkge1xuICAgICAgICByZXR1cm4gZ2V0UGFyc2luZ0ZsYWdzKHRoaXMpLm92ZXJmbG93O1xuICAgIH1cblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnZ2cnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53ZWVrWWVhcigpICUgMTAwO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydHRycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzb1dlZWtZZWFyKCkgJSAxMDA7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBhZGRXZWVrWWVhckZvcm1hdFRva2VuICh0b2tlbiwgZ2V0dGVyKSB7XG4gICAgICAgIGFkZEZvcm1hdFRva2VuKDAsIFt0b2tlbiwgdG9rZW4ubGVuZ3RoXSwgMCwgZ2V0dGVyKTtcbiAgICB9XG5cbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdnZ2dnJywgICAgICd3ZWVrWWVhcicpO1xuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ2dnZ2dnJywgICAgJ3dlZWtZZWFyJyk7XG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignR0dHRycsICAnaXNvV2Vla1llYXInKTtcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdHR0dHRycsICdpc29XZWVrWWVhcicpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCd3ZWVrWWVhcicsICdnZycpO1xuICAgIGFkZFVuaXRBbGlhcygnaXNvV2Vla1llYXInLCAnR0cnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ0cnLCAgICAgIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdnJywgICAgICBtYXRjaFNpZ25lZCk7XG4gICAgYWRkUmVnZXhUb2tlbignR0cnLCAgICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnJywgICAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdHR0dHJywgICBtYXRjaDF0bzQsIG1hdGNoNCk7XG4gICAgYWRkUmVnZXhUb2tlbignZ2dnZycsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHR0dHJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcbiAgICBhZGRSZWdleFRva2VuKCdnZ2dnZycsICBtYXRjaDF0bzYsIG1hdGNoNik7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2dnZ2cnLCAnZ2dnZ2cnLCAnR0dHRycsICdHR0dHRyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgd2Vla1t0b2tlbi5zdWJzdHIoMCwgMildID0gdG9JbnQoaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydnZycsICdHRyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgd2Vla1t0b2tlbl0gPSB1dGlsc19ob29rc19faG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgZnVuY3Rpb24gd2Vla3NJblllYXIoeWVhciwgZG93LCBkb3kpIHtcbiAgICAgICAgcmV0dXJuIHdlZWtPZlllYXIobG9jYWxfX2NyZWF0ZUxvY2FsKFt5ZWFyLCAxMSwgMzEgKyBkb3cgLSBkb3ldKSwgZG93LCBkb3kpLndlZWs7XG4gICAgfVxuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0V2Vla1llYXIgKGlucHV0KSB7XG4gICAgICAgIHZhciB5ZWFyID0gd2Vla09mWWVhcih0aGlzLCB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3csIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRveSkueWVhcjtcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB5ZWFyIDogdGhpcy5hZGQoKGlucHV0IC0geWVhciksICd5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPV2Vla1llYXIgKGlucHV0KSB7XG4gICAgICAgIHZhciB5ZWFyID0gd2Vla09mWWVhcih0aGlzLCAxLCA0KS55ZWFyO1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHllYXIgOiB0aGlzLmFkZCgoaW5wdXQgLSB5ZWFyKSwgJ3knKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJU09XZWVrc0luWWVhciAoKSB7XG4gICAgICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLnllYXIoKSwgMSwgNCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0V2Vla3NJblllYXIgKCkge1xuICAgICAgICB2YXIgd2Vla0luZm8gPSB0aGlzLmxvY2FsZURhdGEoKS5fd2VlaztcbiAgICAgICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMueWVhcigpLCB3ZWVrSW5mby5kb3csIHdlZWtJbmZvLmRveSk7XG4gICAgfVxuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1EnLCAwLCAwLCAncXVhcnRlcicpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdxdWFydGVyJywgJ1EnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ1EnLCBtYXRjaDEpO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1EnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W01PTlRIXSA9ICh0b0ludChpbnB1dCkgLSAxKSAqIDM7XG4gICAgfSk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRTZXRRdWFydGVyIChpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IE1hdGguY2VpbCgodGhpcy5tb250aCgpICsgMSkgLyAzKSA6IHRoaXMubW9udGgoKGlucHV0IC0gMSkgKiAzICsgdGhpcy5tb250aCgpICUgMyk7XG4gICAgfVxuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0QnLCBbJ0REJywgMl0sICdEbycsICdkYXRlJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2RhdGUnLCAnRCcpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignRCcsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0REJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0RvJywgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGlzU3RyaWN0ID8gbG9jYWxlLl9vcmRpbmFsUGFyc2UgOiBsb2NhbGUuX29yZGluYWxQYXJzZUxlbmllbnQ7XG4gICAgfSk7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnRCcsICdERCddLCBEQVRFKTtcbiAgICBhZGRQYXJzZVRva2VuKCdEbycsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbREFURV0gPSB0b0ludChpbnB1dC5tYXRjaChtYXRjaDF0bzIpWzBdLCAxMCk7XG4gICAgfSk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0RGF5T2ZNb250aCA9IG1ha2VHZXRTZXQoJ0RhdGUnLCB0cnVlKTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkJywgMCwgJ2RvJywgJ2RheScpO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2RkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXNNaW4odGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5c1Nob3J0KHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZGRkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZScsIDAsIDAsICd3ZWVrZGF5Jyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ0UnLCAwLCAwLCAnaXNvV2Vla2RheScpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdkYXknLCAnZCcpO1xuICAgIGFkZFVuaXRBbGlhcygnd2Vla2RheScsICdlJyk7XG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrZGF5JywgJ0UnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ2QnLCAgICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2UnLCAgICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0UnLCAgICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkJywgICBtYXRjaFdvcmQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkZCcsICBtYXRjaFdvcmQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkZGQnLCBtYXRjaFdvcmQpO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydkZCcsICdkZGQnLCAnZGRkZCddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZykge1xuICAgICAgICB2YXIgd2Vla2RheSA9IGNvbmZpZy5fbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQpO1xuICAgICAgICAvLyBpZiB3ZSBkaWRuJ3QgZ2V0IGEgd2Vla2RheSBuYW1lLCBtYXJrIHRoZSBkYXRlIGFzIGludmFsaWRcbiAgICAgICAgaWYgKHdlZWtkYXkgIT0gbnVsbCkge1xuICAgICAgICAgICAgd2Vlay5kID0gd2Vla2RheTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRXZWVrZGF5ID0gaW5wdXQ7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsnZCcsICdlJywgJ0UnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHdlZWtbdG9rZW5dID0gdG9JbnQoaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgZnVuY3Rpb24gcGFyc2VXZWVrZGF5KGlucHV0LCBsb2NhbGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICghaXNOYU4oaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBwYXJzZUludChpbnB1dCwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBsb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG5cbiAgICAvLyBMT0NBTEVTXG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzID0gJ1N1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5Jy5zcGxpdCgnXycpO1xuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzIChtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1ttLmRheSgpXTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzU2hvcnQgPSAnU3VuX01vbl9UdWVfV2VkX1RodV9GcmlfU2F0Jy5zcGxpdCgnXycpO1xuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzU2hvcnQgKG0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRbbS5kYXkoKV07XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrZGF5c01pbiA9ICdTdV9Nb19UdV9XZV9UaF9Gcl9TYScuc3BsaXQoJ18nKTtcbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5c01pbiAobSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5bbS5kYXkoKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNQYXJzZSAod2Vla2RheU5hbWUpIHtcbiAgICAgICAgdmFyIGksIG1vbSwgcmVnZXg7XG5cbiAgICAgICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlKSB7XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIG1vbSA9IGxvY2FsX19jcmVhdGVMb2NhbChbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgICAgICAgICByZWdleCA9ICdeJyArIHRoaXMud2Vla2RheXMobW9tLCAnJykgKyAnfF4nICsgdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpICsgJ3xeJyArIHRoaXMud2Vla2RheXNNaW4obW9tLCAnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAocmVnZXgucmVwbGFjZSgnLicsICcnKSwgJ2knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XG4gICAgICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0RGF5T2ZXZWVrIChpbnB1dCkge1xuICAgICAgICB2YXIgZGF5ID0gdGhpcy5faXNVVEMgPyB0aGlzLl9kLmdldFVUQ0RheSgpIDogdGhpcy5fZC5nZXREYXkoKTtcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlucHV0ID0gcGFyc2VXZWVrZGF5KGlucHV0LCB0aGlzLmxvY2FsZURhdGEoKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZGQoaW5wdXQgLSBkYXksICdkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGF5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0TG9jYWxlRGF5T2ZXZWVrIChpbnB1dCkge1xuICAgICAgICB2YXIgd2Vla2RheSA9ICh0aGlzLmRheSgpICsgNyAtIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRvdykgJSA3O1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWtkYXkgOiB0aGlzLmFkZChpbnB1dCAtIHdlZWtkYXksICdkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPRGF5T2ZXZWVrIChpbnB1dCkge1xuICAgICAgICAvLyBiZWhhdmVzIHRoZSBzYW1lIGFzIG1vbWVudCNkYXkgZXhjZXB0XG4gICAgICAgIC8vIGFzIGEgZ2V0dGVyLCByZXR1cm5zIDcgaW5zdGVhZCBvZiAwICgxLTcgcmFuZ2UgaW5zdGVhZCBvZiAwLTYpXG4gICAgICAgIC8vIGFzIGEgc2V0dGVyLCBzdW5kYXkgc2hvdWxkIGJlbG9uZyB0byB0aGUgcHJldmlvdXMgd2Vlay5cbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB0aGlzLmRheSgpIHx8IDcgOiB0aGlzLmRheSh0aGlzLmRheSgpICUgNyA/IGlucHV0IDogaW5wdXQgLSA3KTtcbiAgICB9XG5cbiAgICBhZGRGb3JtYXRUb2tlbignSCcsIFsnSEgnLCAyXSwgMCwgJ2hvdXInKTtcbiAgICBhZGRGb3JtYXRUb2tlbignaCcsIFsnaGgnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ob3VycygpICUgMTIgfHwgMTI7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBtZXJpZGllbSAodG9rZW4sIGxvd2VyY2FzZSkge1xuICAgICAgICBhZGRGb3JtYXRUb2tlbih0b2tlbiwgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm1lcmlkaWVtKHRoaXMuaG91cnMoKSwgdGhpcy5taW51dGVzKCksIGxvd2VyY2FzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1lcmlkaWVtKCdhJywgdHJ1ZSk7XG4gICAgbWVyaWRpZW0oJ0EnLCBmYWxzZSk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2hvdXInLCAnaCcpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgZnVuY3Rpb24gbWF0Y2hNZXJpZGllbSAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLl9tZXJpZGllbVBhcnNlO1xuICAgIH1cblxuICAgIGFkZFJlZ2V4VG9rZW4oJ2EnLCAgbWF0Y2hNZXJpZGllbSk7XG4gICAgYWRkUmVnZXhUb2tlbignQScsICBtYXRjaE1lcmlkaWVtKTtcbiAgICBhZGRSZWdleFRva2VuKCdIJywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignaCcsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0hIJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2hoJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuXG4gICAgYWRkUGFyc2VUb2tlbihbJ0gnLCAnSEgnXSwgSE9VUik7XG4gICAgYWRkUGFyc2VUb2tlbihbJ2EnLCAnQSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl9pc1BtID0gY29uZmlnLl9sb2NhbGUuaXNQTShpbnB1dCk7XG4gICAgICAgIGNvbmZpZy5fbWVyaWRpZW0gPSBpbnB1dDtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKFsnaCcsICdoaCddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dCk7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgLy8gTE9DQUxFU1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlSXNQTSAoaW5wdXQpIHtcbiAgICAgICAgLy8gSUU4IFF1aXJrcyBNb2RlICYgSUU3IFN0YW5kYXJkcyBNb2RlIGRvIG5vdCBhbGxvdyBhY2Nlc3Npbmcgc3RyaW5ncyBsaWtlIGFycmF5c1xuICAgICAgICAvLyBVc2luZyBjaGFyQXQgc2hvdWxkIGJlIG1vcmUgY29tcGF0aWJsZS5cbiAgICAgICAgcmV0dXJuICgoaW5wdXQgKyAnJykudG9Mb3dlckNhc2UoKS5jaGFyQXQoMCkgPT09ICdwJyk7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVNZXJpZGllbVBhcnNlID0gL1thcF1cXC4/bT9cXC4/L2k7XG4gICAgZnVuY3Rpb24gbG9jYWxlTWVyaWRpZW0gKGhvdXJzLCBtaW51dGVzLCBpc0xvd2VyKSB7XG4gICAgICAgIGlmIChob3VycyA+IDExKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNMb3dlciA/ICdwbScgOiAnUE0nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGlzTG93ZXIgPyAnYW0nIDogJ0FNJztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgLy8gU2V0dGluZyB0aGUgaG91ciBzaG91bGQga2VlcCB0aGUgdGltZSwgYmVjYXVzZSB0aGUgdXNlciBleHBsaWNpdGx5XG4gICAgLy8gc3BlY2lmaWVkIHdoaWNoIGhvdXIgaGUgd2FudHMuIFNvIHRyeWluZyB0byBtYWludGFpbiB0aGUgc2FtZSBob3VyIChpblxuICAgIC8vIGEgbmV3IHRpbWV6b25lKSBtYWtlcyBzZW5zZS4gQWRkaW5nL3N1YnRyYWN0aW5nIGhvdXJzIGRvZXMgbm90IGZvbGxvd1xuICAgIC8vIHRoaXMgcnVsZS5cbiAgICB2YXIgZ2V0U2V0SG91ciA9IG1ha2VHZXRTZXQoJ0hvdXJzJywgdHJ1ZSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignbScsIFsnbW0nLCAyXSwgMCwgJ21pbnV0ZScpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdtaW51dGUnLCAnbScpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignbScsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ21tJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFBhcnNlVG9rZW4oWydtJywgJ21tJ10sIE1JTlVURSk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0TWludXRlID0gbWFrZUdldFNldCgnTWludXRlcycsIGZhbHNlKTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdzJywgWydzcycsIDJdLCAwLCAnc2Vjb25kJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ3NlY29uZCcsICdzJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdzJywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignc3MnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUGFyc2VUb2tlbihbJ3MnLCAnc3MnXSwgU0VDT05EKTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXRTZWNvbmQgPSBtYWtlR2V0U2V0KCdTZWNvbmRzJywgZmFsc2UpO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMDApO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTUycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBtaWxsaXNlY29uZF9fbWlsbGlzZWNvbmRzICh0b2tlbikge1xuICAgICAgICBhZGRGb3JtYXRUb2tlbigwLCBbdG9rZW4sIDNdLCAwLCAnbWlsbGlzZWNvbmQnKTtcbiAgICB9XG5cbiAgICBtaWxsaXNlY29uZF9fbWlsbGlzZWNvbmRzKCdTU1MnKTtcbiAgICBtaWxsaXNlY29uZF9fbWlsbGlzZWNvbmRzKCdTU1NTJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ21pbGxpc2Vjb25kJywgJ21zJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdTJywgICAgbWF0Y2gxdG8zLCBtYXRjaDEpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1NTJywgICBtYXRjaDF0bzMsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignU1NTJywgIG1hdGNoMXRvMywgbWF0Y2gzKTtcbiAgICBhZGRSZWdleFRva2VuKCdTU1NTJywgbWF0Y2hVbnNpZ25lZCk7XG4gICAgYWRkUGFyc2VUb2tlbihbJ1MnLCAnU1MnLCAnU1NTJywgJ1NTU1MnXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtNSUxMSVNFQ09ORF0gPSB0b0ludCgoJzAuJyArIGlucHV0KSAqIDEwMDApO1xuICAgIH0pO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldE1pbGxpc2Vjb25kID0gbWFrZUdldFNldCgnTWlsbGlzZWNvbmRzJywgZmFsc2UpO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ3onLCAgMCwgMCwgJ3pvbmVBYmJyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ3p6JywgMCwgMCwgJ3pvbmVOYW1lJyk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRab25lQWJiciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/ICdVVEMnIDogJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Wm9uZU5hbWUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyAnQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUnIDogJyc7XG4gICAgfVxuXG4gICAgdmFyIG1vbWVudFByb3RvdHlwZV9fcHJvdG8gPSBNb21lbnQucHJvdG90eXBlO1xuXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5hZGQgICAgICAgICAgPSBhZGRfc3VidHJhY3RfX2FkZDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmNhbGVuZGFyICAgICA9IG1vbWVudF9jYWxlbmRhcl9fY2FsZW5kYXI7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5jbG9uZSAgICAgICAgPSBjbG9uZTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRpZmYgICAgICAgICA9IGRpZmY7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5lbmRPZiAgICAgICAgPSBlbmRPZjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmZvcm1hdCAgICAgICA9IGZvcm1hdDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmZyb20gICAgICAgICA9IGZyb207XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5mcm9tTm93ICAgICAgPSBmcm9tTm93O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG8gICAgICAgICAgID0gdG87XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b05vdyAgICAgICAgPSB0b05vdztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmdldCAgICAgICAgICA9IGdldFNldDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmludmFsaWRBdCAgICA9IGludmFsaWRBdDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzQWZ0ZXIgICAgICA9IGlzQWZ0ZXI7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0JlZm9yZSAgICAgPSBpc0JlZm9yZTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzQmV0d2VlbiAgICA9IGlzQmV0d2VlbjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzU2FtZSAgICAgICA9IGlzU2FtZTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzVmFsaWQgICAgICA9IG1vbWVudF92YWxpZF9faXNWYWxpZDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmxhbmcgICAgICAgICA9IGxhbmc7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sb2NhbGUgICAgICAgPSBsb2NhbGU7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sb2NhbGVEYXRhICAgPSBsb2NhbGVEYXRhO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWF4ICAgICAgICAgID0gcHJvdG90eXBlTWF4O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWluICAgICAgICAgID0gcHJvdG90eXBlTWluO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ucGFyc2luZ0ZsYWdzID0gcGFyc2luZ0ZsYWdzO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc2V0ICAgICAgICAgID0gZ2V0U2V0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc3RhcnRPZiAgICAgID0gc3RhcnRPZjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnN1YnRyYWN0ICAgICA9IGFkZF9zdWJ0cmFjdF9fc3VidHJhY3Q7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b0FycmF5ICAgICAgPSB0b0FycmF5O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9EYXRlICAgICAgID0gdG9EYXRlO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9JU09TdHJpbmcgID0gbW9tZW50X2Zvcm1hdF9fdG9JU09TdHJpbmc7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by50b0pTT04gICAgICAgPSBtb21lbnRfZm9ybWF0X190b0lTT1N0cmluZztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvU3RyaW5nICAgICA9IHRvU3RyaW5nO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udW5peCAgICAgICAgID0gdW5peDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnZhbHVlT2YgICAgICA9IHRvX3R5cGVfX3ZhbHVlT2Y7XG5cbiAgICAvLyBZZWFyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by55ZWFyICAgICAgID0gZ2V0U2V0WWVhcjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzTGVhcFllYXIgPSBnZXRJc0xlYXBZZWFyO1xuXG4gICAgLy8gV2VlayBZZWFyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrWWVhciAgICA9IGdldFNldFdlZWtZZWFyO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNvV2Vla1llYXIgPSBnZXRTZXRJU09XZWVrWWVhcjtcblxuICAgIC8vIFF1YXJ0ZXJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnF1YXJ0ZXIgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnF1YXJ0ZXJzID0gZ2V0U2V0UXVhcnRlcjtcblxuICAgIC8vIE1vbnRoXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5tb250aCAgICAgICA9IGdldFNldE1vbnRoO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5c0luTW9udGggPSBnZXREYXlzSW5Nb250aDtcblxuICAgIC8vIFdlZWtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLndlZWsgICAgICAgICAgID0gbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrcyAgICAgICAgPSBnZXRTZXRXZWVrO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNvV2VlayAgICAgICAgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWtzICAgICA9IGdldFNldElTT1dlZWs7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrc0luWWVhciAgICA9IGdldFdlZWtzSW5ZZWFyO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNvV2Vla3NJblllYXIgPSBnZXRJU09XZWVrc0luWWVhcjtcblxuICAgIC8vIERheVxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF0ZSAgICAgICA9IGdldFNldERheU9mTW9udGg7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kYXkgICAgICAgID0gbW9tZW50UHJvdG90eXBlX19wcm90by5kYXlzICAgICAgICAgICAgID0gZ2V0U2V0RGF5T2ZXZWVrO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla2RheSAgICA9IGdldFNldExvY2FsZURheU9mV2VlaztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWtkYXkgPSBnZXRTZXRJU09EYXlPZldlZWs7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kYXlPZlllYXIgID0gZ2V0U2V0RGF5T2ZZZWFyO1xuXG4gICAgLy8gSG91clxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaG91ciA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaG91cnMgPSBnZXRTZXRIb3VyO1xuXG4gICAgLy8gTWludXRlXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5taW51dGUgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1pbnV0ZXMgPSBnZXRTZXRNaW51dGU7XG5cbiAgICAvLyBTZWNvbmRcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnNlY29uZCA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc2Vjb25kcyA9IGdldFNldFNlY29uZDtcblxuICAgIC8vIE1pbGxpc2Vjb25kXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5taWxsaXNlY29uZCA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWlsbGlzZWNvbmRzID0gZ2V0U2V0TWlsbGlzZWNvbmQ7XG5cbiAgICAvLyBPZmZzZXRcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnV0Y09mZnNldCAgICAgICAgICAgID0gZ2V0U2V0T2Zmc2V0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udXRjICAgICAgICAgICAgICAgICAgPSBzZXRPZmZzZXRUb1VUQztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmxvY2FsICAgICAgICAgICAgICAgID0gc2V0T2Zmc2V0VG9Mb2NhbDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnBhcnNlWm9uZSAgICAgICAgICAgID0gc2V0T2Zmc2V0VG9QYXJzZWRPZmZzZXQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5oYXNBbGlnbmVkSG91ck9mZnNldCA9IGhhc0FsaWduZWRIb3VyT2Zmc2V0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNEU1QgICAgICAgICAgICAgICAgPSBpc0RheWxpZ2h0U2F2aW5nVGltZTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzRFNUU2hpZnRlZCAgICAgICAgID0gaXNEYXlsaWdodFNhdmluZ1RpbWVTaGlmdGVkO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNMb2NhbCAgICAgICAgICAgICAgPSBpc0xvY2FsO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNVdGNPZmZzZXQgICAgICAgICAgPSBpc1V0Y09mZnNldDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzVXRjICAgICAgICAgICAgICAgID0gaXNVdGM7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1VUQyAgICAgICAgICAgICAgICA9IGlzVXRjO1xuXG4gICAgLy8gVGltZXpvbmVcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnpvbmVBYmJyID0gZ2V0Wm9uZUFiYnI7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by56b25lTmFtZSA9IGdldFpvbmVOYW1lO1xuXG4gICAgLy8gRGVwcmVjYXRpb25zXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5kYXRlcyAgPSBkZXByZWNhdGUoJ2RhdGVzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSBkYXRlIGluc3RlYWQuJywgZ2V0U2V0RGF5T2ZNb250aCk7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5tb250aHMgPSBkZXByZWNhdGUoJ21vbnRocyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgbW9udGggaW5zdGVhZCcsIGdldFNldE1vbnRoKTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnllYXJzICA9IGRlcHJlY2F0ZSgneWVhcnMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIHllYXIgaW5zdGVhZCcsIGdldFNldFllYXIpO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uem9uZSAgID0gZGVwcmVjYXRlKCdtb21lbnQoKS56b25lIGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQoKS51dGNPZmZzZXQgaW5zdGVhZC4gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE3NzknLCBnZXRTZXRab25lKTtcblxuICAgIHZhciBtb21lbnRQcm90b3R5cGUgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvO1xuXG4gICAgZnVuY3Rpb24gbW9tZW50X19jcmVhdGVVbml4IChpbnB1dCkge1xuICAgICAgICByZXR1cm4gbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0ICogMTAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9tZW50X19jcmVhdGVJblpvbmUgKCkge1xuICAgICAgICByZXR1cm4gbG9jYWxfX2NyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cykucGFyc2Vab25lKCk7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRDYWxlbmRhciA9IHtcbiAgICAgICAgc2FtZURheSA6ICdbVG9kYXkgYXRdIExUJyxcbiAgICAgICAgbmV4dERheSA6ICdbVG9tb3Jyb3cgYXRdIExUJyxcbiAgICAgICAgbmV4dFdlZWsgOiAnZGRkZCBbYXRdIExUJyxcbiAgICAgICAgbGFzdERheSA6ICdbWWVzdGVyZGF5IGF0XSBMVCcsXG4gICAgICAgIGxhc3RXZWVrIDogJ1tMYXN0XSBkZGRkIFthdF0gTFQnLFxuICAgICAgICBzYW1lRWxzZSA6ICdMJ1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVfY2FsZW5kYXJfX2NhbGVuZGFyIChrZXksIG1vbSwgbm93KSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLl9jYWxlbmRhcltrZXldO1xuICAgICAgICByZXR1cm4gdHlwZW9mIG91dHB1dCA9PT0gJ2Z1bmN0aW9uJyA/IG91dHB1dC5jYWxsKG1vbSwgbm93KSA6IG91dHB1dDtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvbmdEYXRlRm9ybWF0ID0ge1xuICAgICAgICBMVFMgIDogJ2g6bW06c3MgQScsXG4gICAgICAgIExUICAgOiAnaDptbSBBJyxcbiAgICAgICAgTCAgICA6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICAgTEwgICA6ICdNTU1NIEQsIFlZWVknLFxuICAgICAgICBMTEwgIDogJ01NTU0gRCwgWVlZWSBMVCcsXG4gICAgICAgIExMTEwgOiAnZGRkZCwgTU1NTSBELCBZWVlZIExUJ1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb25nRGF0ZUZvcm1hdCAoa2V5KSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldO1xuICAgICAgICBpZiAoIW91dHB1dCAmJiB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV0pIHtcbiAgICAgICAgICAgIG91dHB1dCA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXS5yZXBsYWNlKC9NTU1NfE1NfEREfGRkZGQvZywgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwuc2xpY2UoMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV0gPSBvdXRwdXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdEludmFsaWREYXRlID0gJ0ludmFsaWQgZGF0ZSc7XG5cbiAgICBmdW5jdGlvbiBpbnZhbGlkRGF0ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZhbGlkRGF0ZTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdE9yZGluYWwgPSAnJWQnO1xuICAgIHZhciBkZWZhdWx0T3JkaW5hbFBhcnNlID0gL1xcZHsxLDJ9LztcblxuICAgIGZ1bmN0aW9uIG9yZGluYWwgKG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JkaW5hbC5yZXBsYWNlKCclZCcsIG51bWJlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlUGFyc2VQb3N0Rm9ybWF0IChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdFJlbGF0aXZlVGltZSA9IHtcbiAgICAgICAgZnV0dXJlIDogJ2luICVzJyxcbiAgICAgICAgcGFzdCAgIDogJyVzIGFnbycsXG4gICAgICAgIHMgIDogJ2EgZmV3IHNlY29uZHMnLFxuICAgICAgICBtICA6ICdhIG1pbnV0ZScsXG4gICAgICAgIG1tIDogJyVkIG1pbnV0ZXMnLFxuICAgICAgICBoICA6ICdhbiBob3VyJyxcbiAgICAgICAgaGggOiAnJWQgaG91cnMnLFxuICAgICAgICBkICA6ICdhIGRheScsXG4gICAgICAgIGRkIDogJyVkIGRheXMnLFxuICAgICAgICBNICA6ICdhIG1vbnRoJyxcbiAgICAgICAgTU0gOiAnJWQgbW9udGhzJyxcbiAgICAgICAgeSAgOiAnYSB5ZWFyJyxcbiAgICAgICAgeXkgOiAnJWQgeWVhcnMnXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbGF0aXZlX19yZWxhdGl2ZVRpbWUgKG51bWJlciwgd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSkge1xuICAgICAgICB2YXIgb3V0cHV0ID0gdGhpcy5fcmVsYXRpdmVUaW1lW3N0cmluZ107XG4gICAgICAgIHJldHVybiAodHlwZW9mIG91dHB1dCA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgICAgICAgICAgb3V0cHV0KG51bWJlciwgd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSkgOlxuICAgICAgICAgICAgb3V0cHV0LnJlcGxhY2UoLyVkL2ksIG51bWJlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFzdEZ1dHVyZSAoZGlmZiwgb3V0cHV0KSB7XG4gICAgICAgIHZhciBmb3JtYXQgPSB0aGlzLl9yZWxhdGl2ZVRpbWVbZGlmZiA+IDAgPyAnZnV0dXJlJyA6ICdwYXN0J107XG4gICAgICAgIHJldHVybiB0eXBlb2YgZm9ybWF0ID09PSAnZnVuY3Rpb24nID8gZm9ybWF0KG91dHB1dCkgOiBmb3JtYXQucmVwbGFjZSgvJXMvaSwgb3V0cHV0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVfc2V0X19zZXQgKGNvbmZpZykge1xuICAgICAgICB2YXIgcHJvcCwgaTtcbiAgICAgICAgZm9yIChpIGluIGNvbmZpZykge1xuICAgICAgICAgICAgcHJvcCA9IGNvbmZpZ1tpXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXNbaV0gPSBwcm9wO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzWydfJyArIGldID0gcHJvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBMZW5pZW50IG9yZGluYWwgcGFyc2luZyBhY2NlcHRzIGp1c3QgYSBudW1iZXIgaW4gYWRkaXRpb24gdG9cbiAgICAgICAgLy8gbnVtYmVyICsgKHBvc3NpYmx5KSBzdHVmZiBjb21pbmcgZnJvbSBfb3JkaW5hbFBhcnNlTGVuaWVudC5cbiAgICAgICAgdGhpcy5fb3JkaW5hbFBhcnNlTGVuaWVudCA9IG5ldyBSZWdFeHAodGhpcy5fb3JkaW5hbFBhcnNlLnNvdXJjZSArICd8JyArICgvXFxkezEsMn0vKS5zb3VyY2UpO1xuICAgIH1cblxuICAgIHZhciBwcm90b3R5cGVfX3Byb3RvID0gTG9jYWxlLnByb3RvdHlwZTtcblxuICAgIHByb3RvdHlwZV9fcHJvdG8uX2NhbGVuZGFyICAgICAgID0gZGVmYXVsdENhbGVuZGFyO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uY2FsZW5kYXIgICAgICAgID0gbG9jYWxlX2NhbGVuZGFyX19jYWxlbmRhcjtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9sb25nRGF0ZUZvcm1hdCA9IGRlZmF1bHRMb25nRGF0ZUZvcm1hdDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLmxvbmdEYXRlRm9ybWF0ICA9IGxvbmdEYXRlRm9ybWF0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX2ludmFsaWREYXRlICAgID0gZGVmYXVsdEludmFsaWREYXRlO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uaW52YWxpZERhdGUgICAgID0gaW52YWxpZERhdGU7XG4gICAgcHJvdG90eXBlX19wcm90by5fb3JkaW5hbCAgICAgICAgPSBkZWZhdWx0T3JkaW5hbDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLm9yZGluYWwgICAgICAgICA9IG9yZGluYWw7XG4gICAgcHJvdG90eXBlX19wcm90by5fb3JkaW5hbFBhcnNlICAgPSBkZWZhdWx0T3JkaW5hbFBhcnNlO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ucHJlcGFyc2UgICAgICAgID0gcHJlUGFyc2VQb3N0Rm9ybWF0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8ucG9zdGZvcm1hdCAgICAgID0gcHJlUGFyc2VQb3N0Rm9ybWF0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX3JlbGF0aXZlVGltZSAgID0gZGVmYXVsdFJlbGF0aXZlVGltZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLnJlbGF0aXZlVGltZSAgICA9IHJlbGF0aXZlX19yZWxhdGl2ZVRpbWU7XG4gICAgcHJvdG90eXBlX19wcm90by5wYXN0RnV0dXJlICAgICAgPSBwYXN0RnV0dXJlO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uc2V0ICAgICAgICAgICAgID0gbG9jYWxlX3NldF9fc2V0O1xuXG4gICAgLy8gTW9udGhcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRocyAgICAgICA9ICAgICAgICBsb2NhbGVNb250aHM7XG4gICAgcHJvdG90eXBlX19wcm90by5fbW9udGhzICAgICAgPSBkZWZhdWx0TG9jYWxlTW9udGhzO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ubW9udGhzU2hvcnQgID0gICAgICAgIGxvY2FsZU1vbnRoc1Nob3J0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX21vbnRoc1Nob3J0ID0gZGVmYXVsdExvY2FsZU1vbnRoc1Nob3J0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8ubW9udGhzUGFyc2UgID0gICAgICAgIGxvY2FsZU1vbnRoc1BhcnNlO1xuXG4gICAgLy8gV2Vla1xuICAgIHByb3RvdHlwZV9fcHJvdG8ud2VlayA9IGxvY2FsZVdlZWs7XG4gICAgcHJvdG90eXBlX19wcm90by5fd2VlayA9IGRlZmF1bHRMb2NhbGVXZWVrO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uZmlyc3REYXlPZlllYXIgPSBsb2NhbGVGaXJzdERheU9mWWVhcjtcbiAgICBwcm90b3R5cGVfX3Byb3RvLmZpcnN0RGF5T2ZXZWVrID0gbG9jYWxlRmlyc3REYXlPZldlZWs7XG5cbiAgICAvLyBEYXkgb2YgV2Vla1xuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXMgICAgICAgPSAgICAgICAgbG9jYWxlV2Vla2RheXM7XG4gICAgcHJvdG90eXBlX19wcm90by5fd2Vla2RheXMgICAgICA9IGRlZmF1bHRMb2NhbGVXZWVrZGF5cztcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzTWluICAgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzTWluO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWtkYXlzTWluICAgPSBkZWZhdWx0TG9jYWxlV2Vla2RheXNNaW47XG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5c1Nob3J0ICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c1Nob3J0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWtkYXlzU2hvcnQgPSBkZWZhdWx0TG9jYWxlV2Vla2RheXNTaG9ydDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzUGFyc2UgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzUGFyc2U7XG5cbiAgICAvLyBIb3Vyc1xuICAgIHByb3RvdHlwZV9fcHJvdG8uaXNQTSA9IGxvY2FsZUlzUE07XG4gICAgcHJvdG90eXBlX19wcm90by5fbWVyaWRpZW1QYXJzZSA9IGRlZmF1bHRMb2NhbGVNZXJpZGllbVBhcnNlO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ubWVyaWRpZW0gPSBsb2NhbGVNZXJpZGllbTtcblxuICAgIGZ1bmN0aW9uIGxpc3RzX19nZXQgKGZvcm1hdCwgaW5kZXgsIGZpZWxkLCBzZXR0ZXIpIHtcbiAgICAgICAgdmFyIGxvY2FsZSA9IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoKTtcbiAgICAgICAgdmFyIHV0YyA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQygpLnNldChzZXR0ZXIsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGxvY2FsZVtmaWVsZF0odXRjLCBmb3JtYXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3QgKGZvcm1hdCwgaW5kZXgsIGZpZWxkLCBjb3VudCwgc2V0dGVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XG4gICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XG5cbiAgICAgICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0c19fZ2V0KGZvcm1hdCwgaW5kZXgsIGZpZWxkLCBzZXR0ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIG91dFtpXSA9IGxpc3RzX19nZXQoZm9ybWF0LCBpLCBmaWVsZCwgc2V0dGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0TW9udGhzIChmb3JtYXQsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsaXN0KGZvcm1hdCwgaW5kZXgsICdtb250aHMnLCAxMiwgJ21vbnRoJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RNb250aHNTaG9ydCAoZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdChmb3JtYXQsIGluZGV4LCAnbW9udGhzU2hvcnQnLCAxMiwgJ21vbnRoJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RXZWVrZGF5cyAoZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdChmb3JtYXQsIGluZGV4LCAnd2Vla2RheXMnLCA3LCAnZGF5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RXZWVrZGF5c1Nob3J0IChmb3JtYXQsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsaXN0KGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5c1Nob3J0JywgNywgJ2RheScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RzX19saXN0V2Vla2RheXNNaW4gKGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3QoZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzTWluJywgNywgJ2RheScpO1xuICAgIH1cblxuICAgIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUoJ2VuJywge1xuICAgICAgICBvcmRpbmFsUGFyc2U6IC9cXGR7MSwyfSh0aHxzdHxuZHxyZCkvLFxuICAgICAgICBvcmRpbmFsIDogZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgICAgICAgdmFyIGIgPSBudW1iZXIgJSAxMCxcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSAodG9JbnQobnVtYmVyICUgMTAwIC8gMTApID09PSAxKSA/ICd0aCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAxKSA/ICdzdCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAyKSA/ICduZCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAzKSA/ICdyZCcgOiAndGgnO1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlciArIG91dHB1dDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU2lkZSBlZmZlY3QgaW1wb3J0c1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5sYW5nID0gZGVwcmVjYXRlKCdtb21lbnQubGFuZyBpcyBkZXByZWNhdGVkLiBVc2UgbW9tZW50LmxvY2FsZSBpbnN0ZWFkLicsIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUpO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5sYW5nRGF0YSA9IGRlcHJlY2F0ZSgnbW9tZW50LmxhbmdEYXRhIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb21lbnQubG9jYWxlRGF0YSBpbnN0ZWFkLicsIGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUpO1xuXG4gICAgdmFyIG1hdGhBYnMgPSBNYXRoLmFicztcblxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2Fic19fYWJzICgpIHtcbiAgICAgICAgdmFyIGRhdGEgICAgICAgICAgID0gdGhpcy5fZGF0YTtcblxuICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgPSBtYXRoQWJzKHRoaXMuX21pbGxpc2Vjb25kcyk7XG4gICAgICAgIHRoaXMuX2RheXMgICAgICAgICA9IG1hdGhBYnModGhpcy5fZGF5cyk7XG4gICAgICAgIHRoaXMuX21vbnRocyAgICAgICA9IG1hdGhBYnModGhpcy5fbW9udGhzKTtcblxuICAgICAgICBkYXRhLm1pbGxpc2Vjb25kcyAgPSBtYXRoQWJzKGRhdGEubWlsbGlzZWNvbmRzKTtcbiAgICAgICAgZGF0YS5zZWNvbmRzICAgICAgID0gbWF0aEFicyhkYXRhLnNlY29uZHMpO1xuICAgICAgICBkYXRhLm1pbnV0ZXMgICAgICAgPSBtYXRoQWJzKGRhdGEubWludXRlcyk7XG4gICAgICAgIGRhdGEuaG91cnMgICAgICAgICA9IG1hdGhBYnMoZGF0YS5ob3Vycyk7XG4gICAgICAgIGRhdGEubW9udGhzICAgICAgICA9IG1hdGhBYnMoZGF0YS5tb250aHMpO1xuICAgICAgICBkYXRhLnllYXJzICAgICAgICAgPSBtYXRoQWJzKGRhdGEueWVhcnMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QgKGR1cmF0aW9uLCBpbnB1dCwgdmFsdWUsIGRpcmVjdGlvbikge1xuICAgICAgICB2YXIgb3RoZXIgPSBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKGlucHV0LCB2YWx1ZSk7XG5cbiAgICAgICAgZHVyYXRpb24uX21pbGxpc2Vjb25kcyArPSBkaXJlY3Rpb24gKiBvdGhlci5fbWlsbGlzZWNvbmRzO1xuICAgICAgICBkdXJhdGlvbi5fZGF5cyAgICAgICAgICs9IGRpcmVjdGlvbiAqIG90aGVyLl9kYXlzO1xuICAgICAgICBkdXJhdGlvbi5fbW9udGhzICAgICAgICs9IGRpcmVjdGlvbiAqIG90aGVyLl9tb250aHM7XG5cbiAgICAgICAgcmV0dXJuIGR1cmF0aW9uLl9idWJibGUoKTtcbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0cyBvbmx5IDIuMC1zdHlsZSBhZGQoMSwgJ3MnKSBvciBhZGQoZHVyYXRpb24pXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGQgKGlucHV0LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCh0aGlzLCBpbnB1dCwgdmFsdWUsIDEpO1xuICAgIH1cblxuICAgIC8vIHN1cHBvcnRzIG9ubHkgMi4wLXN0eWxlIHN1YnRyYWN0KDEsICdzJykgb3Igc3VidHJhY3QoZHVyYXRpb24pXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19zdWJ0cmFjdCAoaW5wdXQsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0KHRoaXMsIGlucHV0LCB2YWx1ZSwgLTEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1YmJsZSAoKSB7XG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSB0aGlzLl9taWxsaXNlY29uZHM7XG4gICAgICAgIHZhciBkYXlzICAgICAgICAgPSB0aGlzLl9kYXlzO1xuICAgICAgICB2YXIgbW9udGhzICAgICAgID0gdGhpcy5fbW9udGhzO1xuICAgICAgICB2YXIgZGF0YSAgICAgICAgID0gdGhpcy5fZGF0YTtcbiAgICAgICAgdmFyIHNlY29uZHMsIG1pbnV0ZXMsIGhvdXJzLCB5ZWFycyA9IDA7XG5cbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBjb2RlIGJ1YmJsZXMgdXAgdmFsdWVzLCBzZWUgdGhlIHRlc3RzIGZvclxuICAgICAgICAvLyBleGFtcGxlcyBvZiB3aGF0IHRoYXQgbWVhbnMuXG4gICAgICAgIGRhdGEubWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzICUgMTAwMDtcblxuICAgICAgICBzZWNvbmRzICAgICAgICAgICA9IGFic0Zsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xuICAgICAgICBkYXRhLnNlY29uZHMgICAgICA9IHNlY29uZHMgJSA2MDtcblxuICAgICAgICBtaW51dGVzICAgICAgICAgICA9IGFic0Zsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICAgIGRhdGEubWludXRlcyAgICAgID0gbWludXRlcyAlIDYwO1xuXG4gICAgICAgIGhvdXJzICAgICAgICAgICAgID0gYWJzRmxvb3IobWludXRlcyAvIDYwKTtcbiAgICAgICAgZGF0YS5ob3VycyAgICAgICAgPSBob3VycyAlIDI0O1xuXG4gICAgICAgIGRheXMgKz0gYWJzRmxvb3IoaG91cnMgLyAyNCk7XG5cbiAgICAgICAgLy8gQWNjdXJhdGVseSBjb252ZXJ0IGRheXMgdG8geWVhcnMsIGFzc3VtZSBzdGFydCBmcm9tIHllYXIgMC5cbiAgICAgICAgeWVhcnMgPSBhYnNGbG9vcihkYXlzVG9ZZWFycyhkYXlzKSk7XG4gICAgICAgIGRheXMgLT0gYWJzRmxvb3IoeWVhcnNUb0RheXMoeWVhcnMpKTtcblxuICAgICAgICAvLyAzMCBkYXlzIHRvIGEgbW9udGhcbiAgICAgICAgLy8gVE9ETyAoaXNrcmVuKTogVXNlIGFuY2hvciBkYXRlIChsaWtlIDFzdCBKYW4pIHRvIGNvbXB1dGUgdGhpcy5cbiAgICAgICAgbW9udGhzICs9IGFic0Zsb29yKGRheXMgLyAzMCk7XG4gICAgICAgIGRheXMgICAlPSAzMDtcblxuICAgICAgICAvLyAxMiBtb250aHMgLT4gMSB5ZWFyXG4gICAgICAgIHllYXJzICArPSBhYnNGbG9vcihtb250aHMgLyAxMik7XG4gICAgICAgIG1vbnRocyAlPSAxMjtcblxuICAgICAgICBkYXRhLmRheXMgICA9IGRheXM7XG4gICAgICAgIGRhdGEubW9udGhzID0gbW9udGhzO1xuICAgICAgICBkYXRhLnllYXJzICA9IHllYXJzO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRheXNUb1llYXJzIChkYXlzKSB7XG4gICAgICAgIC8vIDQwMCB5ZWFycyBoYXZlIDE0NjA5NyBkYXlzICh0YWtpbmcgaW50byBhY2NvdW50IGxlYXAgeWVhciBydWxlcylcbiAgICAgICAgcmV0dXJuIGRheXMgKiA0MDAgLyAxNDYwOTc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24geWVhcnNUb0RheXMgKHllYXJzKSB7XG4gICAgICAgIC8vIHllYXJzICogMzY1ICsgYWJzRmxvb3IoeWVhcnMgLyA0KSAtXG4gICAgICAgIC8vICAgICBhYnNGbG9vcih5ZWFycyAvIDEwMCkgKyBhYnNGbG9vcih5ZWFycyAvIDQwMCk7XG4gICAgICAgIHJldHVybiB5ZWFycyAqIDE0NjA5NyAvIDQwMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcyAodW5pdHMpIHtcbiAgICAgICAgdmFyIGRheXM7XG4gICAgICAgIHZhciBtb250aHM7XG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSB0aGlzLl9taWxsaXNlY29uZHM7XG5cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG5cbiAgICAgICAgaWYgKHVuaXRzID09PSAnbW9udGgnIHx8IHVuaXRzID09PSAneWVhcicpIHtcbiAgICAgICAgICAgIGRheXMgICA9IHRoaXMuX2RheXMgICArIG1pbGxpc2Vjb25kcyAvIDg2NGU1O1xuICAgICAgICAgICAgbW9udGhzID0gdGhpcy5fbW9udGhzICsgZGF5c1RvWWVhcnMoZGF5cykgKiAxMjtcbiAgICAgICAgICAgIHJldHVybiB1bml0cyA9PT0gJ21vbnRoJyA/IG1vbnRocyA6IG1vbnRocyAvIDEyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaGFuZGxlIG1pbGxpc2Vjb25kcyBzZXBhcmF0ZWx5IGJlY2F1c2Ugb2YgZmxvYXRpbmcgcG9pbnQgbWF0aCBlcnJvcnMgKGlzc3VlICMxODY3KVxuICAgICAgICAgICAgZGF5cyA9IHRoaXMuX2RheXMgKyBNYXRoLnJvdW5kKHllYXJzVG9EYXlzKHRoaXMuX21vbnRocyAvIDEyKSk7XG4gICAgICAgICAgICBzd2l0Y2ggKHVuaXRzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnd2VlaycgICA6IHJldHVybiBkYXlzIC8gNyAgICAgKyBtaWxsaXNlY29uZHMgLyA2MDQ4ZTU7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF5JyAgICA6IHJldHVybiBkYXlzICAgICAgICAgKyBtaWxsaXNlY29uZHMgLyA4NjRlNTtcbiAgICAgICAgICAgICAgICBjYXNlICdob3VyJyAgIDogcmV0dXJuIGRheXMgKiAyNCAgICArIG1pbGxpc2Vjb25kcyAvIDM2ZTU7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWludXRlJyA6IHJldHVybiBkYXlzICogMTQ0MCAgKyBtaWxsaXNlY29uZHMgLyA2ZTQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2Vjb25kJyA6IHJldHVybiBkYXlzICogODY0MDAgKyBtaWxsaXNlY29uZHMgLyAxMDAwO1xuICAgICAgICAgICAgICAgIC8vIE1hdGguZmxvb3IgcHJldmVudHMgZmxvYXRpbmcgcG9pbnQgbWF0aCBlcnJvcnMgaGVyZVxuICAgICAgICAgICAgICAgIGNhc2UgJ21pbGxpc2Vjb25kJzogcmV0dXJuIE1hdGguZmxvb3IoZGF5cyAqIDg2NGU1KSArIG1pbGxpc2Vjb25kcztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdW5pdCAnICsgdW5pdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETzogVXNlIHRoaXMuYXMoJ21zJyk/XG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYXNfX3ZhbHVlT2YgKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzICtcbiAgICAgICAgICAgIHRoaXMuX2RheXMgKiA4NjRlNSArXG4gICAgICAgICAgICAodGhpcy5fbW9udGhzICUgMTIpICogMjU5MmU2ICtcbiAgICAgICAgICAgIHRvSW50KHRoaXMuX21vbnRocyAvIDEyKSAqIDMxNTM2ZTZcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlQXMgKGFsaWFzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcyhhbGlhcyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGFzTWlsbGlzZWNvbmRzID0gbWFrZUFzKCdtcycpO1xuICAgIHZhciBhc1NlY29uZHMgICAgICA9IG1ha2VBcygncycpO1xuICAgIHZhciBhc01pbnV0ZXMgICAgICA9IG1ha2VBcygnbScpO1xuICAgIHZhciBhc0hvdXJzICAgICAgICA9IG1ha2VBcygnaCcpO1xuICAgIHZhciBhc0RheXMgICAgICAgICA9IG1ha2VBcygnZCcpO1xuICAgIHZhciBhc1dlZWtzICAgICAgICA9IG1ha2VBcygndycpO1xuICAgIHZhciBhc01vbnRocyAgICAgICA9IG1ha2VBcygnTScpO1xuICAgIHZhciBhc1llYXJzICAgICAgICA9IG1ha2VBcygneScpO1xuXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fZ2V0X19nZXQgKHVuaXRzKSB7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICByZXR1cm4gdGhpc1t1bml0cyArICdzJ10oKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlR2V0dGVyKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhW25hbWVdO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBkdXJhdGlvbl9nZXRfX21pbGxpc2Vjb25kcyA9IG1ha2VHZXR0ZXIoJ21pbGxpc2Vjb25kcycpO1xuICAgIHZhciBzZWNvbmRzICAgICAgPSBtYWtlR2V0dGVyKCdzZWNvbmRzJyk7XG4gICAgdmFyIG1pbnV0ZXMgICAgICA9IG1ha2VHZXR0ZXIoJ21pbnV0ZXMnKTtcbiAgICB2YXIgaG91cnMgICAgICAgID0gbWFrZUdldHRlcignaG91cnMnKTtcbiAgICB2YXIgZGF5cyAgICAgICAgID0gbWFrZUdldHRlcignZGF5cycpO1xuICAgIHZhciBtb250aHMgICAgICAgPSBtYWtlR2V0dGVyKCdtb250aHMnKTtcbiAgICB2YXIgeWVhcnMgICAgICAgID0gbWFrZUdldHRlcigneWVhcnMnKTtcblxuICAgIGZ1bmN0aW9uIHdlZWtzICgpIHtcbiAgICAgICAgcmV0dXJuIGFic0Zsb29yKHRoaXMuZGF5cygpIC8gNyk7XG4gICAgfVxuXG4gICAgdmFyIHJvdW5kID0gTWF0aC5yb3VuZDtcbiAgICB2YXIgdGhyZXNob2xkcyA9IHtcbiAgICAgICAgczogNDUsICAvLyBzZWNvbmRzIHRvIG1pbnV0ZVxuICAgICAgICBtOiA0NSwgIC8vIG1pbnV0ZXMgdG8gaG91clxuICAgICAgICBoOiAyMiwgIC8vIGhvdXJzIHRvIGRheVxuICAgICAgICBkOiAyNiwgIC8vIGRheXMgdG8gbW9udGhcbiAgICAgICAgTTogMTEgICAvLyBtb250aHMgdG8geWVhclxuICAgIH07XG5cbiAgICAvLyBoZWxwZXIgZnVuY3Rpb24gZm9yIG1vbWVudC5mbi5mcm9tLCBtb21lbnQuZm4uZnJvbU5vdywgYW5kIG1vbWVudC5kdXJhdGlvbi5mbi5odW1hbml6ZVxuICAgIGZ1bmN0aW9uIHN1YnN0aXR1dGVUaW1lQWdvKHN0cmluZywgbnVtYmVyLCB3aXRob3V0U3VmZml4LCBpc0Z1dHVyZSwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUucmVsYXRpdmVUaW1lKG51bWJlciB8fCAxLCAhIXdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2h1bWFuaXplX19yZWxhdGl2ZVRpbWUgKHBvc05lZ0R1cmF0aW9uLCB3aXRob3V0U3VmZml4LCBsb2NhbGUpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gY3JlYXRlX19jcmVhdGVEdXJhdGlvbihwb3NOZWdEdXJhdGlvbikuYWJzKCk7XG4gICAgICAgIHZhciBzZWNvbmRzICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdzJykpO1xuICAgICAgICB2YXIgbWludXRlcyAgPSByb3VuZChkdXJhdGlvbi5hcygnbScpKTtcbiAgICAgICAgdmFyIGhvdXJzICAgID0gcm91bmQoZHVyYXRpb24uYXMoJ2gnKSk7XG4gICAgICAgIHZhciBkYXlzICAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdkJykpO1xuICAgICAgICB2YXIgbW9udGhzICAgPSByb3VuZChkdXJhdGlvbi5hcygnTScpKTtcbiAgICAgICAgdmFyIHllYXJzICAgID0gcm91bmQoZHVyYXRpb24uYXMoJ3knKSk7XG5cbiAgICAgICAgdmFyIGEgPSBzZWNvbmRzIDwgdGhyZXNob2xkcy5zICYmIFsncycsIHNlY29uZHNdICB8fFxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgPT09IDEgICAgICAgICAgJiYgWydtJ10gICAgICAgICAgIHx8XG4gICAgICAgICAgICAgICAgbWludXRlcyA8IHRocmVzaG9sZHMubSAmJiBbJ21tJywgbWludXRlc10gfHxcbiAgICAgICAgICAgICAgICBob3VycyAgID09PSAxICAgICAgICAgICYmIFsnaCddICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIGhvdXJzICAgPCB0aHJlc2hvbGRzLmggJiYgWydoaCcsIGhvdXJzXSAgIHx8XG4gICAgICAgICAgICAgICAgZGF5cyAgICA9PT0gMSAgICAgICAgICAmJiBbJ2QnXSAgICAgICAgICAgfHxcbiAgICAgICAgICAgICAgICBkYXlzICAgIDwgdGhyZXNob2xkcy5kICYmIFsnZGQnLCBkYXlzXSAgICB8fFxuICAgICAgICAgICAgICAgIG1vbnRocyAgPT09IDEgICAgICAgICAgJiYgWydNJ10gICAgICAgICAgIHx8XG4gICAgICAgICAgICAgICAgbW9udGhzICA8IHRocmVzaG9sZHMuTSAmJiBbJ01NJywgbW9udGhzXSAgfHxcbiAgICAgICAgICAgICAgICB5ZWFycyAgID09PSAxICAgICAgICAgICYmIFsneSddICAgICAgICAgICB8fCBbJ3l5JywgeWVhcnNdO1xuXG4gICAgICAgIGFbMl0gPSB3aXRob3V0U3VmZml4O1xuICAgICAgICBhWzNdID0gK3Bvc05lZ0R1cmF0aW9uID4gMDtcbiAgICAgICAgYVs0XSA9IGxvY2FsZTtcbiAgICAgICAgcmV0dXJuIHN1YnN0aXR1dGVUaW1lQWdvLmFwcGx5KG51bGwsIGEpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBzZXQgYSB0aHJlc2hvbGQgZm9yIHJlbGF0aXZlIHRpbWUgc3RyaW5nc1xuICAgIGZ1bmN0aW9uIGR1cmF0aW9uX2h1bWFuaXplX19nZXRTZXRSZWxhdGl2ZVRpbWVUaHJlc2hvbGQgKHRocmVzaG9sZCwgbGltaXQpIHtcbiAgICAgICAgaWYgKHRocmVzaG9sZHNbdGhyZXNob2xkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpbWl0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aHJlc2hvbGRzW3RocmVzaG9sZF07XG4gICAgICAgIH1cbiAgICAgICAgdGhyZXNob2xkc1t0aHJlc2hvbGRdID0gbGltaXQ7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGh1bWFuaXplICh3aXRoU3VmZml4KSB7XG4gICAgICAgIHZhciBsb2NhbGUgPSB0aGlzLmxvY2FsZURhdGEoKTtcbiAgICAgICAgdmFyIG91dHB1dCA9IGR1cmF0aW9uX2h1bWFuaXplX19yZWxhdGl2ZVRpbWUodGhpcywgIXdpdGhTdWZmaXgsIGxvY2FsZSk7XG5cbiAgICAgICAgaWYgKHdpdGhTdWZmaXgpIHtcbiAgICAgICAgICAgIG91dHB1dCA9IGxvY2FsZS5wYXN0RnV0dXJlKCt0aGlzLCBvdXRwdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxvY2FsZS5wb3N0Zm9ybWF0KG91dHB1dCk7XG4gICAgfVxuXG4gICAgdmFyIGlzb19zdHJpbmdfX2FicyA9IE1hdGguYWJzO1xuXG4gICAgZnVuY3Rpb24gaXNvX3N0cmluZ19fdG9JU09TdHJpbmcoKSB7XG4gICAgICAgIC8vIGluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9kb3JkaWxsZS9tb21lbnQtaXNvZHVyYXRpb24vYmxvYi9tYXN0ZXIvbW9tZW50Lmlzb2R1cmF0aW9uLmpzXG4gICAgICAgIHZhciBZID0gaXNvX3N0cmluZ19fYWJzKHRoaXMueWVhcnMoKSk7XG4gICAgICAgIHZhciBNID0gaXNvX3N0cmluZ19fYWJzKHRoaXMubW9udGhzKCkpO1xuICAgICAgICB2YXIgRCA9IGlzb19zdHJpbmdfX2Ficyh0aGlzLmRheXMoKSk7XG4gICAgICAgIHZhciBoID0gaXNvX3N0cmluZ19fYWJzKHRoaXMuaG91cnMoKSk7XG4gICAgICAgIHZhciBtID0gaXNvX3N0cmluZ19fYWJzKHRoaXMubWludXRlcygpKTtcbiAgICAgICAgdmFyIHMgPSBpc29fc3RyaW5nX19hYnModGhpcy5zZWNvbmRzKCkgKyB0aGlzLm1pbGxpc2Vjb25kcygpIC8gMTAwMCk7XG4gICAgICAgIHZhciB0b3RhbCA9IHRoaXMuYXNTZWNvbmRzKCk7XG5cbiAgICAgICAgaWYgKCF0b3RhbCkge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUgc2FtZSBhcyBDIydzIChOb2RhKSBhbmQgcHl0aG9uIChpc29kYXRlKS4uLlxuICAgICAgICAgICAgLy8gYnV0IG5vdCBvdGhlciBKUyAoZ29vZy5kYXRlKVxuICAgICAgICAgICAgcmV0dXJuICdQMEQnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICh0b3RhbCA8IDAgPyAnLScgOiAnJykgK1xuICAgICAgICAgICAgJ1AnICtcbiAgICAgICAgICAgIChZID8gWSArICdZJyA6ICcnKSArXG4gICAgICAgICAgICAoTSA/IE0gKyAnTScgOiAnJykgK1xuICAgICAgICAgICAgKEQgPyBEICsgJ0QnIDogJycpICtcbiAgICAgICAgICAgICgoaCB8fCBtIHx8IHMpID8gJ1QnIDogJycpICtcbiAgICAgICAgICAgIChoID8gaCArICdIJyA6ICcnKSArXG4gICAgICAgICAgICAobSA/IG0gKyAnTScgOiAnJykgK1xuICAgICAgICAgICAgKHMgPyBzICsgJ1MnIDogJycpO1xuICAgIH1cblxuICAgIHZhciBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvID0gRHVyYXRpb24ucHJvdG90eXBlO1xuXG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hYnMgICAgICAgICAgICA9IGR1cmF0aW9uX2Fic19fYWJzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYWRkICAgICAgICAgICAgPSBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZDtcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnN1YnRyYWN0ICAgICAgID0gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19zdWJ0cmFjdDtcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzICAgICAgICAgICAgID0gYXM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc01pbGxpc2Vjb25kcyA9IGFzTWlsbGlzZWNvbmRzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNTZWNvbmRzICAgICAgPSBhc1NlY29uZHM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc01pbnV0ZXMgICAgICA9IGFzTWludXRlcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzSG91cnMgICAgICAgID0gYXNIb3VycztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzRGF5cyAgICAgICAgID0gYXNEYXlzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNXZWVrcyAgICAgICAgPSBhc1dlZWtzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNNb250aHMgICAgICAgPSBhc01vbnRocztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzWWVhcnMgICAgICAgID0gYXNZZWFycztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnZhbHVlT2YgICAgICAgID0gZHVyYXRpb25fYXNfX3ZhbHVlT2Y7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5fYnViYmxlICAgICAgICA9IGJ1YmJsZTtcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmdldCAgICAgICAgICAgID0gZHVyYXRpb25fZ2V0X19nZXQ7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5taWxsaXNlY29uZHMgICA9IGR1cmF0aW9uX2dldF9fbWlsbGlzZWNvbmRzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uc2Vjb25kcyAgICAgICAgPSBzZWNvbmRzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubWludXRlcyAgICAgICAgPSBtaW51dGVzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uaG91cnMgICAgICAgICAgPSBob3VycztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmRheXMgICAgICAgICAgID0gZGF5cztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLndlZWtzICAgICAgICAgID0gd2Vla3M7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5tb250aHMgICAgICAgICA9IG1vbnRocztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnllYXJzICAgICAgICAgID0geWVhcnM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5odW1hbml6ZSAgICAgICA9IGh1bWFuaXplO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8udG9JU09TdHJpbmcgICAgPSBpc29fc3RyaW5nX190b0lTT1N0cmluZztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnRvU3RyaW5nICAgICAgID0gaXNvX3N0cmluZ19fdG9JU09TdHJpbmc7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by50b0pTT04gICAgICAgICA9IGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubG9jYWxlICAgICAgICAgPSBsb2NhbGU7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5sb2NhbGVEYXRhICAgICA9IGxvY2FsZURhdGE7XG5cbiAgICAvLyBEZXByZWNhdGlvbnNcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnRvSXNvU3RyaW5nID0gZGVwcmVjYXRlKCd0b0lzb1N0cmluZygpIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgdG9JU09TdHJpbmcoKSBpbnN0ZWFkIChub3RpY2UgdGhlIGNhcGl0YWxzKScsIGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nKTtcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmxhbmcgPSBsYW5nO1xuXG4gICAgLy8gU2lkZSBlZmZlY3QgaW1wb3J0c1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1gnLCAwLCAwLCAndW5peCcpO1xuICAgIGFkZEZvcm1hdFRva2VuKCd4JywgMCwgMCwgJ3ZhbHVlT2YnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ3gnLCBtYXRjaFNpZ25lZCk7XG4gICAgYWRkUmVnZXhUb2tlbignWCcsIG1hdGNoVGltZXN0YW1wKTtcbiAgICBhZGRQYXJzZVRva2VuKCdYJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKHBhcnNlRmxvYXQoaW5wdXQsIDEwKSAqIDEwMDApO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ3gnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUodG9JbnQoaW5wdXQpKTtcbiAgICB9KTtcblxuICAgIC8vIFNpZGUgZWZmZWN0IGltcG9ydHNcblxuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnZlcnNpb24gPSAnMi4xMC4zJztcblxuICAgIHNldEhvb2tDYWxsYmFjayhsb2NhbF9fY3JlYXRlTG9jYWwpO1xuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmZuICAgICAgICAgICAgICAgICAgICA9IG1vbWVudFByb3RvdHlwZTtcbiAgICB1dGlsc19ob29rc19faG9va3MubWluICAgICAgICAgICAgICAgICAgID0gbWluO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5tYXggICAgICAgICAgICAgICAgICAgPSBtYXg7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnV0YyAgICAgICAgICAgICAgICAgICA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQztcbiAgICB1dGlsc19ob29rc19faG9va3MudW5peCAgICAgICAgICAgICAgICAgID0gbW9tZW50X19jcmVhdGVVbml4O1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5tb250aHMgICAgICAgICAgICAgICAgPSBsaXN0c19fbGlzdE1vbnRocztcbiAgICB1dGlsc19ob29rc19faG9va3MuaXNEYXRlICAgICAgICAgICAgICAgID0gaXNEYXRlO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5sb2NhbGUgICAgICAgICAgICAgICAgPSBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5pbnZhbGlkICAgICAgICAgICAgICAgPSB2YWxpZF9fY3JlYXRlSW52YWxpZDtcbiAgICB1dGlsc19ob29rc19faG9va3MuZHVyYXRpb24gICAgICAgICAgICAgID0gY3JlYXRlX19jcmVhdGVEdXJhdGlvbjtcbiAgICB1dGlsc19ob29rc19faG9va3MuaXNNb21lbnQgICAgICAgICAgICAgID0gaXNNb21lbnQ7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLndlZWtkYXlzICAgICAgICAgICAgICA9IGxpc3RzX19saXN0V2Vla2RheXM7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnBhcnNlWm9uZSAgICAgICAgICAgICA9IG1vbWVudF9fY3JlYXRlSW5ab25lO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5sb2NhbGVEYXRhICAgICAgICAgICAgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5pc0R1cmF0aW9uICAgICAgICAgICAgPSBpc0R1cmF0aW9uO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5tb250aHNTaG9ydCAgICAgICAgICAgPSBsaXN0c19fbGlzdE1vbnRoc1Nob3J0O1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy53ZWVrZGF5c01pbiAgICAgICAgICAgPSBsaXN0c19fbGlzdFdlZWtkYXlzTWluO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5kZWZpbmVMb2NhbGUgICAgICAgICAgPSBkZWZpbmVMb2NhbGU7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLndlZWtkYXlzU2hvcnQgICAgICAgICA9IGxpc3RzX19saXN0V2Vla2RheXNTaG9ydDtcbiAgICB1dGlsc19ob29rc19faG9va3Mubm9ybWFsaXplVW5pdHMgICAgICAgID0gbm9ybWFsaXplVW5pdHM7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnJlbGF0aXZlVGltZVRocmVzaG9sZCA9IGR1cmF0aW9uX2h1bWFuaXplX19nZXRTZXRSZWxhdGl2ZVRpbWVUaHJlc2hvbGQ7XG5cbiAgICB2YXIgX21vbWVudCA9IHV0aWxzX2hvb2tzX19ob29rcztcblxuICAgIHJldHVybiBfbW9tZW50O1xuXG59KSk7IiwiXG52YXIgb3B0aW9ucyA9IGV4cG9ydHMub3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpO1xuXG5leHBvcnRzLnBhcnNlciA9IHJlcXVpcmUoJy4vcGFyc2Vycy9wYXJzZXInKTtcbmV4cG9ydHMucmVmaW5lciA9IHJlcXVpcmUoJy4vcmVmaW5lcnMvcmVmaW5lcicpO1xuXG5leHBvcnRzLlBhcnNlciA9IGV4cG9ydHMucGFyc2VyLlBhcnNlcjtcbmV4cG9ydHMuUmVmaW5lciA9IGV4cG9ydHMucmVmaW5lci5SZWZpbmVyO1xuZXhwb3J0cy5GaWx0ZXIgPSBleHBvcnRzLnJlZmluZXIuRmlsdGVyO1xuXG5leHBvcnRzLlBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xuZXhwb3J0cy5QYXJzZWRDb21wb25lbnRzID0gcmVxdWlyZSgnLi9yZXN1bHQnKS5QYXJzZWRDb21wb25lbnRzO1xuXG52YXIgQ2hyb25vID0gZnVuY3Rpb24ob3B0aW9uKSB7XG5cbiAgICBvcHRpb24gPSBvcHRpb24gfHwgZXhwb3J0cy5vcHRpb25zLmNhc3VhbE9wdGlvbigpO1xuXG4gICAgdGhpcy5vcHRpb24gPSBvcHRpb247XG4gICAgdGhpcy5wYXJzZXJzID0gbmV3IE9iamVjdChvcHRpb24ucGFyc2Vycyk7XG4gICAgdGhpcy5yZWZpbmVycyA9IG5ldyBPYmplY3Qob3B0aW9uLnJlZmluZXJzKTtcbn1cblxuXG5DaHJvbm8ucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24odGV4dCwgcmVmRGF0ZSwgb3B0KSB7XG5cbiAgICByZWZEYXRlID0gcmVmRGF0ZSB8fCBuZXcgRGF0ZSgpO1xuICAgIG9wdCA9IG9wdCB8fCB7fTtcblxuICAgIHZhciBhbGxSZXN1bHRzID0gW107XG5cbiAgICB0aGlzLnBhcnNlcnMuZm9yRWFjaChmdW5jdGlvbiAocGFyc2VyKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gcGFyc2VyLmV4ZWN1dGUodGV4dCwgcmVmRGF0ZSwgb3B0KTtcbiAgICAgICAgYWxsUmVzdWx0cyA9IGFsbFJlc3VsdHMuY29uY2F0KHJlc3VsdHMpO1xuICAgIH0pO1xuXG4gICAgYWxsUmVzdWx0cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEuaW5kZXggLSBiLmluZGV4O1xuICAgIH0pO1xuICAgIFxuICAgIHRoaXMucmVmaW5lcnMuZm9yRWFjaChmdW5jdGlvbiAocmVmaW5lcikge1xuICAgICAgICBhbGxSZXN1bHRzID0gcmVmaW5lci5yZWZpbmUodGV4dCwgYWxsUmVzdWx0cywgb3B0KTtcbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gYWxsUmVzdWx0cztcbn07XG5cblxuQ2hyb25vLnByb3RvdHlwZS5wYXJzZURhdGUgPSBmdW5jdGlvbih0ZXh0LCByZWZEYXRlLCBvcHQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IHRoaXMucGFyc2UodGV4dCwgcmVmRGF0ZSwgb3B0KTtcbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiByZXN1bHRzWzBdLnN0YXJ0LmRhdGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydHMuQ2hyb25vID0gQ2hyb25vO1xuZXhwb3J0cy5zdHJpY3QgPSBuZXcgQ2hyb25vKCBvcHRpb25zLnN0cmljdE9wdGlvbigpICk7XG5leHBvcnRzLmNhc3VhbCA9IG5ldyBDaHJvbm8oIG9wdGlvbnMuY2FzdWFsT3B0aW9uKCkgKTtcblxuZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5jYXN1YWwucGFyc2UuYXBwbHkoZXhwb3J0cy5jYXN1YWwsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydHMucGFyc2VEYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBleHBvcnRzLmNhc3VhbC5wYXJzZURhdGUuYXBwbHkoZXhwb3J0cy5jYXN1YWwsIGFyZ3VtZW50cyk7XG59XG4iLCJ2YXIgcGFyc2VyID0gcmVxdWlyZSgnLi9wYXJzZXJzL3BhcnNlcicpO1xudmFyIHJlZmluZXIgPSByZXF1aXJlKCcuL3JlZmluZXJzL3JlZmluZXInKTtcblxuZnVuY3Rpb24gYmFzZU9wdGlvbihzdHJpY3RNb2RlKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwYXJzZXJzOiBbXG5cbiAgICAgICAgICAgIC8vIEVOXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVOSVNPRm9ybWF0UGFyc2VyKHN0cmljdE1vZGUpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5FTkRlYWRsaW5lRm9ybWF0UGFyc2VyKHN0cmljdE1vZGUpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5FTk1vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlcihzdHJpY3RNb2RlKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRU5Nb250aE5hbWVNaWRkbGVFbmRpYW5QYXJzZXIoc3RyaWN0TW9kZSksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVOTW9udGhOYW1lUGFyc2VyKHN0cmljdE1vZGUpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5FTlNsYXNoRGF0ZUZvcm1hdFBhcnNlcihzdHJpY3RNb2RlKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRU5TbGFzaERhdGVGb3JtYXRTdGFydFdpdGhZZWFyUGFyc2VyKHN0cmljdE1vZGUpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5FTlNsYXNoTW9udGhGb3JtYXRQYXJzZXIoc3RyaWN0TW9kZSksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVOVGltZUFnb0Zvcm1hdFBhcnNlcihzdHJpY3RNb2RlKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRU5UaW1lRXhwcmVzc2lvblBhcnNlcihzdHJpY3RNb2RlKSxcblxuICAgICAgICAgICAgLy8gSlBcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuSlBTdGFuZGFyZFBhcnNlcihzdHJpY3RNb2RlKSxcblxuICAgICAgICAgICAgLy8gRVNcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRVNUaW1lQWdvRm9ybWF0UGFyc2VyKHN0cmljdE1vZGUpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5FU0RlYWRsaW5lRm9ybWF0UGFyc2VyKHN0cmljdE1vZGUpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5FU1RpbWVFeHByZXNzaW9uUGFyc2VyKHN0cmljdE1vZGUpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5FU01vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlcihzdHJpY3RNb2RlKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRVNTbGFzaERhdGVGb3JtYXRQYXJzZXIoc3RyaWN0TW9kZSksXG4gICAgICAgIF0sXG5cbiAgICAgICAgcmVmaW5lcnM6IFtcbiAgICAgICAgICAgIC8vIFJlbW92aW5nIG92ZXJsYXBpbmcgZmlyc3RcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLk92ZXJsYXBSZW1vdmFsUmVmaW5lcigpLFxuXG4gICAgICAgICAgICAvLyBFVENcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLkVOTWVyZ2VEYXRlVGltZVJlZmluZXIoKSxcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLkVOTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyKCksXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5KUE1lcmdlRGF0ZVJhbmdlUmVmaW5lcigpLFxuXG4gICAgICAgICAgICAvLyBFeHRyYWN0IGFkZGl0aW9uYWwgaW5mbyBsYXRlclxuICAgICAgICAgICAgbmV3IHJlZmluZXIuRXh0cmFjdFRpbWV6b25lT2Zmc2V0UmVmaW5lcigpLFxuICAgICAgICAgICAgbmV3IHJlZmluZXIuRXh0cmFjdFRpbWV6b25lQWJiclJlZmluZXIoKSxcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLlVubGlrZWx5Rm9ybWF0RmlsdGVyKClcbiAgICAgICAgXVxuICAgIH1cbn1cblxuXG5cbmV4cG9ydHMuc3RyaWN0T3B0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBiYXNlT3B0aW9uKHRydWUpO1xufTtcblxuXG5leHBvcnRzLmNhc3VhbE9wdGlvbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBvcHRpb25zID0gYmFzZU9wdGlvbihmYWxzZSk7XG5cbiAgICAvLyBFTlxuICAgIG9wdGlvbnMucGFyc2Vycy51bnNoaWZ0KG5ldyBwYXJzZXIuRU5DYXN1YWxEYXRlUGFyc2VyKCkpO1xuICAgIG9wdGlvbnMucGFyc2Vycy51bnNoaWZ0KG5ldyBwYXJzZXIuRU5XZWVrZGF5UGFyc2VyKCkpO1xuXG4gICAgLy8gSlBcbiAgICBvcHRpb25zLnBhcnNlcnMudW5zaGlmdChuZXcgcGFyc2VyLkpQQ2FzdWFsRGF0ZVBhcnNlcigpKTtcblxuICAgIC8vIEVTXG4gICAgb3B0aW9ucy5wYXJzZXJzLnVuc2hpZnQobmV3IHBhcnNlci5FU0Nhc3VhbERhdGVQYXJzZXIoKSk7XG4gICAgb3B0aW9ucy5wYXJzZXJzLnVuc2hpZnQobmV3IHBhcnNlci5FU1dlZWtkYXlQYXJzZXIoKSk7XG5cblxuICAgIHJldHVybiBvcHRpb25zO1xufTtcbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBQQVRURVJOID0gLyhcXFd8Xikobm93fHRvZGF5fHRvbmlnaHR8dG9tb3Jyb3d8dG1yfHllc3RlcmRheXxsYXN0XFxzKm5pZ2h0fHRoaXNcXHMqKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmcpKSg/PVxcV3wkKS9pO1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOQ2FzdWFsRGF0ZVBhcnNlcigpe1xuXG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG5cbiAgICAgICAgdmFyIHRleHQgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlZk1vbWVudCA9IG1vbWVudChyZWYpO1xuICAgICAgICB2YXIgc3RhcnRNb21lbnQgPSByZWZNb21lbnQuY2xvbmUoKTtcbiAgICAgICAgdmFyIGxvd2VyVGV4dCA9IHRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZihsb3dlclRleHQgPT0gJ3RvbmlnaHQnKXtcbiAgICAgICAgICAgIC8vIE5vcm1hbGx5IG1lYW5zIHRoaXMgY29taW5nIG1pZG5pZ2h0XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAyMik7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG5cbiAgICAgICAgfSBlbHNlIGlmKGxvd2VyVGV4dCA9PSAndG9tb3Jyb3cnIHx8IGxvd2VyVGV4dCA9PSAndG1yJyl7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIG5vdCBcIlRvbW9ycm93XCIgb24gbGF0ZSBuaWdodFxuICAgICAgICAgICAgaWYocmVmTW9tZW50LmhvdXIoKSA+IDEpIHtcbiAgICAgICAgICAgICAgICBzdGFydE1vbWVudC5hZGQoMSwgJ2RheScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZihsb3dlclRleHQgPT0gJ3llc3RlcmRheScpIHtcblxuICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKC0xLCAnZGF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihsb3dlclRleHQubWF0Y2goL2xhc3RcXHMqbmlnaHQvKSkge1xuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAwKTtcbiAgICAgICAgICAgIGlmIChyZWZNb21lbnQuaG91cigpID4gNikge1xuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgtMSwgJ2RheScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAobG93ZXJUZXh0Lm1hdGNoKFwidGhpc1wiKSkge1xuXG4gICAgICAgICAgICB2YXIgc2Vjb25kTWF0Y2ggPSBtYXRjaFszXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHNlY29uZE1hdGNoID09IFwiYWZ0ZXJub29uXCIpIHtcblxuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDE1KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWNvbmRNYXRjaCA9PSBcImV2ZW5pbmdcIikge1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMTgpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlY29uZE1hdGNoID09IFwibW9ybmluZ1wiKSB7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCA2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKGxvd2VyVGV4dC5tYXRjaChcIm5vd1wiKSkge1xuXG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgcmVmTW9tZW50LmhvdXIoKSk7XG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtaW51dGUnLCByZWZNb21lbnQubWludXRlKCkpO1xuICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnc2Vjb25kJywgcmVmTW9tZW50LnNlY29uZCgpKTtcbiAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21pbGxpc2Vjb25kJywgcmVmTW9tZW50Lm1pbGxpc2Vjb25kKCkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgc3RhcnRNb21lbnQubW9udGgoKSArIDEpXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpXG4gICAgICAgIHJlc3VsdC50YWdzWydFTkNhc3VhbERhdGVQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcbnZhciB1dGlsICA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0VOJyk7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnKFxcXFxXfF4pJyArXG4gICAgJyh3aXRoaW58aW4pXFxcXHMqJyArXG4gICAgJygnKyB1dGlsLklOVEVHRVJfV09SRFNfUEFUVEVSTiArICd8WzAtOV0rfGFuPyg/OlxcXFxzKmZldyk/fGhhbGYoPzpcXFxccyphbj8pPylcXFxccyonICtcbiAgICAnKHNlY29uZHM/fG1pbig/OnV0ZSk/cz98aG91cnM/fGRheXM/fHdlZWtzP3xtb250aHM/fHllYXJzPylcXFxccyonICtcbiAgICAnKD89XFxcXFd8JCknLCAnaSdcbik7XG5cbnZhciBTVFJJQ1RfUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICcod2l0aGlufGluKVxcXFxzKicgK1xuICAgICcoJysgdXRpbC5JTlRFR0VSX1dPUkRTX1BBVFRFUk4gKyAnfFswLTldK3xhbj8pXFxcXHMqJyArXG4gICAgJyhzZWNvbmRzP3xtaW51dGVzP3xob3Vycz98ZGF5cz8pXFxcXHMqJyArXG4gICAgJyg/PVxcXFxXfCQpJywgJ2knXG4pO1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVORGVhZGxpbmVGb3JtYXRQYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1N0cmljdE1vZGUoKT8gU1RSSUNUX1BBVFRFUk4gOiBQQVRURVJOO1xuICAgIH07XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgdGV4dCAgPSBtYXRjaFswXTtcbiAgICAgICAgdGV4dCAgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZlxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbnVtID0gbWF0Y2hbM10udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHV0aWwuSU5URUdFUl9XT1JEU1tudW1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG51bSA9IHV0aWwuSU5URUdFUl9XT1JEU1tudW1dO1xuICAgICAgICB9IGVsc2UgaWYgKG51bSA9PT0gJ2EnIHx8IG51bSA9PT0gJ2FuJyl7XG4gICAgICAgICAgICBudW0gPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKG51bS5tYXRjaCgvZmV3L2kpKXtcbiAgICAgICAgICAgIG51bSA9IDM7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtLm1hdGNoKC9oYWxmL2kpKSB7XG4gICAgICAgICAgICBudW0gPSAwLjU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW0gPSBwYXJzZUludChudW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQocmVmKTtcbiAgICAgICAgaWYgKG1hdGNoWzRdLm1hdGNoKC9kYXl8d2Vla3xtb250aHx5ZWFyL2kpKSB7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFs0XS5tYXRjaCgvZGF5L2kpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnZCcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFs0XS5tYXRjaCgvd2Vlay9pKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuYWRkKG51bSAqIDcsICdkJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzRdLm1hdGNoKC9tb250aC9pKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuYWRkKG51bSwgJ21vbnRoJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzRdLm1hdGNoKC95ZWFyL2kpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAneWVhcicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbNF0ubWF0Y2goL2hvdXIvaSkpIHtcblxuICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnaG91cicpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL21pbi9pKSkge1xuXG4gICAgICAgICAgICBkYXRlLmFkZChudW0sICdtaW51dGUnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzRdLm1hdGNoKC9zZWNvbmQvaSkpIHtcblxuICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnc2Vjb25kJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCBkYXRlLmhvdXIoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21pbnV0ZScsIGRhdGUubWludXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdzZWNvbmQnLCBkYXRlLnNlY29uZCgpKTtcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VORGVhZGxpbmVGb3JtYXRQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn07XG4iLCIvKlxuICAgIElTTyA4NjAxXG4gICAgaHR0cDovL3d3dy53My5vcmcvVFIvTk9URS1kYXRldGltZVxuICAgIC0gWVlZWS1NTS1ERFxuICAgIC0gWVlZWS1NTS1ERFRoaDptbVRaRFxuICAgIC0gWVlZWS1NTS1ERFRoaDptbTpzc1RaRFxuICAgIC0gWVlZWS1NTS1ERFRoaDptbTpzcy5zVFpEIFxuICAgIC0gVFpEID0gKFogb3IgK2hoOm1tIG9yIC1oaDptbSlcbiovXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknIFxuICAgICAgICAgICAgKyAnKFswLTldezR9KVxcXFwtKFswLTldezEsMn0pXFxcXC0oWzAtOV17MSwyfSknXG4gICAgICAgICAgICArICcoPzpUJyAvLy4uXG4gICAgICAgICAgICAgICAgKyAnKFswLTldezEsMn0pOihbMC05XXsxLDJ9KScgLy8gaGg6bW1cbiAgICAgICAgICAgICAgICArICcoPzo6KFswLTldezEsMn0pKD86XFxcXC4oXFxcXGR7MSw0fSkpPyk/JyAvLyA6c3Muc1xuICAgICAgICAgICAgICAgICsgJyg/Olp8KFsrLV1cXFxcZHsyfSk6PyhcXFxcZHsyfSk/KT8nIC8vIFRaRCAoWiBvciDCsWhoOm1tIG9yIMKxaGhtbSBvciDCsWhoKVxuICAgICAgICAgICAgKyAnKT8nICAvLy4uXG4gICAgICAgICAgICArICcoPz1cXFxcV3wkKScsICdpJyk7XG5cbnZhciBZRUFSX05VTUJFUl9HUk9VUCA9IDI7XG52YXIgTU9OVEhfTlVNQkVSX0dST1VQID0gMztcbnZhciBEQVRFX05VTUJFUl9HUk9VUCAgPSA0O1xudmFyIEhPVVJfTlVNQkVSX0dST1VQICA9IDU7XG52YXIgTUlOVVRFX05VTUJFUl9HUk9VUCA9IDY7XG52YXIgU0VDT05EX05VTUJFUl9HUk9VUCA9IDc7XG52YXIgTUlMTElTRUNPTkRfTlVNQkVSX0dST1VQID0gODtcbnZhciBUWkRfSE9VUl9PRkZTRVRfR1JPVVAgPSA5O1xudmFyIFRaRF9NSU5VVEVfT0ZGU0VUX0dST1VQID0gMTA7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRU5JU09Gb3JtYXRQYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBcbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cbiAgICBcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpeyBcbiAgICAgICAgXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBwYXJzZUludChtYXRjaFtZRUFSX05VTUJFUl9HUk9VUF0pKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBwYXJzZUludChtYXRjaFtNT05USF9OVU1CRVJfR1JPVVBdKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIHBhcnNlSW50KG1hdGNoW0RBVEVfTlVNQkVSX0dST1VQXSkpO1xuXG4gICAgICAgIGlmIChtb21lbnQocmVzdWx0LnN0YXJ0LmdldCgnbW9udGgnKSkgPiAxMiB8fCBtb21lbnQocmVzdWx0LnN0YXJ0LmdldCgnbW9udGgnKSkgPCAxIHx8XG4gICAgICAgICAgICBtb21lbnQocmVzdWx0LnN0YXJ0LmdldCgnZGF5JykpID4gMzEgfHwgbW9tZW50KHJlc3VsdC5zdGFydC5nZXQoJ2RheScpKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoW0hPVVJfTlVNQkVSX0dST1VQXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLFxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChtYXRjaFtIT1VSX05VTUJFUl9HUk9VUF0pKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21pbnV0ZScsXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KG1hdGNoW01JTlVURV9OVU1CRVJfR1JPVVBdKSk7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFtTRUNPTkRfTlVNQkVSX0dST1VQXSAhPSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdzZWNvbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQobWF0Y2hbU0VDT05EX05VTUJFUl9HUk9VUF0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hdGNoW01JTExJU0VDT05EX05VTUJFUl9HUk9VUF0gIT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWlsbGlzZWNvbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQobWF0Y2hbTUlMTElTRUNPTkRfTlVNQkVSX0dST1VQXSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWF0Y2hbVFpEX0hPVVJfT0ZGU0VUX0dST1VQXSA9PSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd0aW1lem9uZU9mZnNldCcsIDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHZhciBtaW51dGVPZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgIHZhciBob3VyT2Zmc2V0ID0gcGFyc2VJbnQobWF0Y2hbVFpEX0hPVVJfT0ZGU0VUX0dST1VQXSk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoW1RaRF9NSU5VVEVfT0ZGU0VUX0dST1VQXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBtaW51dGVPZmZzZXQgPSBwYXJzZUludChtYXRjaFtUWkRfTUlOVVRFX09GRlNFVF9HUk9VUF0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IGhvdXJPZmZzZXQgKiA2MDtcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgLT0gbWludXRlT2Zmc2V0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSBtaW51dGVPZmZzZXQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigndGltZXpvbmVPZmZzZXQnLCBvZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXN1bHQudGFnc1snRU5JU09Gb3JtYXRQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxufVxuXG4iLCIvKlxuICAgIFxuICAgIFxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcbnZhciB1dGlsICA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0VOJyk7XG4gICAgXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICAgICAnKD86KFN1bmRheXxNb25kYXl8VHVlc2RheXxXZWRuZXNkYXl8VGh1cnNkYXl8RnJpZGF5fFNhdHVyZGF5fFN1bnxNb258VHVlfFdlZHxUaHV8RnJpfFNhdClcXFxccyosP1xcXFxzKik/JyArIFxuICAgICAgICAnKFswLTldezEsMn0pKD86c3R8bmR8cmR8dGgpPycgKyBcbiAgICAgICAgJyg/OlxcXFxzKig/OnRvfFxcXFwtfFxcXFzigJN8dW50aWx8dGhyb3VnaHx0aWxsfFxcXFxzKVxcXFxzKihbMC05XXsxLDJ9KSg/OnN0fG5kfHJkfHRoKT8pP1xcXFxzKig/Om9mKT9cXFxccyonICsgXG4gICAgICAgICcoSmFuKD86dWFyeXxcXFxcLik/fEZlYig/OnJ1YXJ5fFxcXFwuKT98TWFyKD86Y2h8XFxcXC4pP3xBcHIoPzppbHxcXFxcLik/fE1heXxKdW4oPzplfFxcXFwuKT98SnVsKD86eXxcXFxcLik/fEF1Zyg/OnVzdHxcXFxcLik/fFNlcCg/OnRlbWJlcnxcXFxcLik/fE9jdCg/Om9iZXJ8XFxcXC4pP3xOb3YoPzplbWJlcnxcXFxcLik/fERlYyg/OmVtYmVyfFxcXFwuKT8pJyArXG4gICAgICAgICcoPzonICtcbiAgICAgICAgICAgICcsP1xcXFxzKihbMC05XXsyLDR9KD8hW15cXFxcc11cXFxcZCkpJyArXG4gICAgICAgICAgICAnKFxcXFxzKkJFKT8nICtcbiAgICAgICAgJyk/JyArXG4gICAgICAgICcoPz1cXFxcV3wkKScsICdpJ1xuICAgICk7XG5cbnZhciBXRUVLREFZX0dST1VQID0gMjtcbnZhciBEQVRFX0dST1VQID0gMztcbnZhciBEQVRFX1RPX0dST1VQID0gNDtcbnZhciBNT05USF9OQU1FX0dST1VQID0gNTtcbnZhciBZRUFSX0dST1VQID0gNjtcbnZhciBZRUFSX0JFX0dST1VQID0gNztcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFTk1vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIFxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxuICAgIFxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7IFxuXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIHRleHQ6IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtIG1hdGNoWzFdLmxlbmd0aCksXG4gICAgICAgICAgICBpbmRleDogbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGgsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfTkFNRV9HUk9VUF07XG4gICAgICAgIG1vbnRoID0gdXRpbC5NT05USF9PRkZTRVRbbW9udGgudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgdmFyIGRheSA9IG1hdGNoW0RBVEVfR1JPVVBdO1xuICAgICAgICBkYXkgPSBwYXJzZUludChkYXkpO1xuXG4gICAgICAgIHZhciB5ZWFyID0gbnVsbDtcbiAgICAgICAgaWYgKG1hdGNoW1lFQVJfR1JPVVBdKSB7XG4gICAgICAgICAgICB5ZWFyID0gbWF0Y2hbWUVBUl9HUk9VUF07XG4gICAgICAgICAgICB5ZWFyID0gcGFyc2VJbnQoeWVhcik7XG5cbiAgICAgICAgICAgIGlmKG1hdGNoW1lFQVJfQkVfR1JPVVBdKXsgXG4gICAgICAgICAgICAgICAgLy9CQ1xuICAgICAgICAgICAgICAgIHllYXIgPSB5ZWFyIC0gNTQzO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXIgPCAxMDApeyBcblxuICAgICAgICAgICAgICAgIHllYXIgPSB5ZWFyICsgMjAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHllYXIpe1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF5KTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHllYXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL0ZpbmQgdGhlIG1vc3QgYXBwcm9wcmlhdGVkIHllYXJcbiAgICAgICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgICAgIHJlZk1vbWVudC5tb250aChtb250aCAtIDEpO1xuICAgICAgICAgICAgcmVmTW9tZW50LmRhdGUoZGF5KTtcbiAgICAgICAgICAgIHJlZk1vbWVudC55ZWFyKG1vbWVudChyZWYpLnllYXIoKSk7XG5cbiAgICAgICAgICAgIHZhciBuZXh0WWVhciA9IHJlZk1vbWVudC5jbG9uZSgpLmFkZCgxLCAneScpO1xuICAgICAgICAgICAgdmFyIGxhc3RZZWFyID0gcmVmTW9tZW50LmNsb25lKCkuYWRkKC0xLCAneScpO1xuICAgICAgICAgICAgaWYoIE1hdGguYWJzKG5leHRZZWFyLmRpZmYobW9tZW50KHJlZikpKSA8IE1hdGguYWJzKHJlZk1vbWVudC5kaWZmKG1vbWVudChyZWYpKSkgKXsgIFxuICAgICAgICAgICAgICAgIHJlZk1vbWVudCA9IG5leHRZZWFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggTWF0aC5hYnMobGFzdFllYXIuZGlmZihtb21lbnQocmVmKSkpIDwgTWF0aC5hYnMocmVmTW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApeyBcbiAgICAgICAgICAgICAgICByZWZNb21lbnQgPSBsYXN0WWVhcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF5KTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgcmVmTW9tZW50LnllYXIoKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFdlZWtkYXkgY29tcG9uZW50XG4gICAgICAgIGlmIChtYXRjaFtXRUVLREFZX0dST1VQXSkge1xuICAgICAgICAgICAgdmFyIHdlZWtkYXkgPSBtYXRjaFtXRUVLREFZX0dST1VQXTtcbiAgICAgICAgICAgIHdlZWtkYXkgPSB1dGlsLldFRUtEQVlfT0ZGU0VUW3dlZWtkYXkudG9Mb3dlckNhc2UoKV1cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3dlZWtkYXknLCB3ZWVrZGF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRleHQgY2FuIGJlICdyYW5nZScgdmFsdWUuIFN1Y2ggYXMgJzEyIC0gMTMgSmFudWFyeSAyMDEyJ1xuICAgICAgICBpZiAobWF0Y2hbREFURV9UT19HUk9VUF0pIHtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQgPSByZXN1bHQuc3RhcnQuY2xvbmUoKTtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCdkYXknLCBwYXJzZUludChtYXRjaFtEQVRFX1RPX0dST1VQXSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VOTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59XG5cbiIsIi8qXG4gICAgXG4gICAgVGhlIHBhcnNlciBmb3IgcGFyc2luZyBVUydzIGRhdGUgZm9ybWF0IHRoYXQgYmVnaW4gd2l0aCBtb250aCdzIG5hbWUuXG4gICAgXG4gICAgRVguIFxuICAgICAgICAtIEphbnVhcnkgMTNcbiAgICAgICAgLSBKYW51YXJ5IDEzLCAyMDEyXG4gICAgICAgIC0gSmFudWFyeSAxMyAtIDE1LCAyMDEyXG4gICAgICAgIC0gVHVlc2RheSwgSmFudWFyeSAxMywgMjAxMlxuXG4gICAgV2F0Y2ggb3V0IGZvcjpcbiAgICAgICAgLSBKYW51YXJ5IDEyOjAwXG4gICAgICAgIC0gSmFudWFyeSAxMi40NFxuICAgICAgICAtIEphbnVhcnkgMTIyMjM0NFxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcbnZhciB1dGlsICA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0VOJyk7XG4gICAgXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICcoPzonICtcbiAgICAgICAgJyhTdW5kYXl8TW9uZGF5fFR1ZXNkYXl8V2VkbmVzZGF5fFRodXJzZGF5fEZyaWRheXxTYXR1cmRheXxTdW5cXFxcLj98TW9uXFxcXC4/fFR1ZVxcXFwuP3xXZWRcXFxcLj98VGh1XFxcXC4/fEZyaVxcXFwuP3xTYXRcXFxcLj8pJyArIFxuICAgICdcXFxccyosP1xcXFxzKik/JyArXG4gICAgJyhKYW5cXFxcLj98SmFudWFyeXxGZWJcXFxcLj98RmVicnVhcnl8TWFyXFxcXC4/fE1hcmNofEFwclxcXFwuP3xBcHJpbHxNYXlcXFxcLj98SnVuXFxcXC4/fEp1bmV8SnVsXFxcXC4/fEp1bHl8QXVnXFxcXC4/fEF1Z3VzdHxTZXBcXFxcLj98U2VwdFxcXFwuP3xTZXB0ZW1iZXJ8T2N0XFxcXC4/fE9jdG9iZXJ8Tm92XFxcXC4/fE5vdmVtYmVyfERlY1xcXFwuP3xEZWNlbWJlciknICsgXG4gICAgJ1xcXFxzKicgK1xuICAgICcoWzAtOV17MSwyfSkoPzpzdHxuZHxyZHx0aCk/XFxcXHMqJyArIFxuICAgICcoPzonICsgXG4gICAgICAgICcoPzp0b3xcXFxcLSlcXFxccyonICsgXG4gICAgICAgICcoWzAtOV17MSwyfSkoPzpzdHxuZHxyZHx0aCk/XFxcXHMqJyArIFxuICAgICcpPycgKyBcbiAgICAnKD86JyArXG4gICAgICAgICdcXFxccyosP1xcXFxzKihbMC05XXs0fSkoXFxcXHMqQkUpP1xcXFxzKicgK1xuICAgICcpPycgKyBcbiAgICAnKD89XFxcXFd8JCkoPyFcXFxcOlxcXFxkKScsICdpJyk7XG5cbnZhciBXRUVLREFZX0dST1VQID0gMjtcbnZhciBNT05USF9OQU1FX0dST1VQID0gMztcbnZhciBEQVRFX0dST1VQID0gNDtcbnZhciBEQVRFX1RPX0dST1VQID0gNTtcbnZhciBZRUFSX0dST1VQID0gNjtcbnZhciBZRUFSX0JFX0dST1VQID0gNztcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFTk1vbnRoTmFtZU1pZGRsZUVuZGlhblBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7IHJldHVybiBQQVRURVJOOyB9XG4gICAgXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICBpZiAodGV4dC5pbmRleE9mKCc1IE1heSAxMjowMCcpID49IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1hdGNoKVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKSxcbiAgICAgICAgICAgIGluZGV4OiBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcblxuICAgICAgICBcbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfTkFNRV9HUk9VUF07XG4gICAgICAgIG1vbnRoID0gdXRpbC5NT05USF9PRkZTRVRbbW9udGgudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgdmFyIGRheSA9IG1hdGNoW0RBVEVfR1JPVVBdO1xuICAgICAgICBkYXkgPSBwYXJzZUludChkYXkpO1xuXG4gICAgICAgIHZhciB5ZWFyID0gbnVsbDtcbiAgICAgICAgaWYgKG1hdGNoW1lFQVJfR1JPVVBdKSB7XG4gICAgICAgICAgICB5ZWFyID0gbWF0Y2hbWUVBUl9HUk9VUF07XG4gICAgICAgICAgICB5ZWFyID0gcGFyc2VJbnQoeWVhcik7XG5cbiAgICAgICAgICAgIGlmKG1hdGNoW1lFQVJfQkVfR1JPVVBdKXsgXG4gICAgICAgICAgICAgICAgLy9CQ1xuICAgICAgICAgICAgICAgIHllYXIgPSB5ZWFyIC0gNTQzO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXIgPCAxMDApeyBcblxuICAgICAgICAgICAgICAgIHllYXIgPSB5ZWFyICsgMjAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHllYXIpe1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF5KTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHllYXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL0ZpbmQgdGhlIG1vc3QgYXBwcm9wcmlhdGVkIHllYXJcbiAgICAgICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgICAgIHJlZk1vbWVudC5tb250aChtb250aCAtIDEpO1xuICAgICAgICAgICAgcmVmTW9tZW50LmRhdGUoZGF5KTtcblxuICAgICAgICAgICAgdmFyIG5leHRZZWFyID0gcmVmTW9tZW50LmNsb25lKCkuYWRkKDEsICd5Jyk7XG4gICAgICAgICAgICB2YXIgbGFzdFllYXIgPSByZWZNb21lbnQuY2xvbmUoKS5hZGQoLTEsICd5Jyk7XG4gICAgICAgICAgICBpZiggTWF0aC5hYnMobmV4dFllYXIuZGlmZihtb21lbnQocmVmKSkpIDwgTWF0aC5hYnMocmVmTW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApeyAgXG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbmV4dFllYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBNYXRoLmFicyhsYXN0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7IFxuICAgICAgICAgICAgICAgIHJlZk1vbWVudCA9IGxhc3RZZWFyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBtb250aCk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCByZWZNb21lbnQueWVhcigpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gV2Vla2RheSBjb21wb25lbnRcbiAgICAgICAgaWYgKG1hdGNoW1dFRUtEQVlfR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgd2Vla2RheSA9IG1hdGNoW1dFRUtEQVlfR1JPVVBdO1xuICAgICAgICAgICAgd2Vla2RheSA9IHV0aWwuV0VFS0RBWV9PRkZTRVRbd2Vla2RheS50b0xvd2VyQ2FzZSgpXVxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignd2Vla2RheScsIHdlZWtkYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGV4dCBjYW4gYmUgJ3JhbmdlJyB2YWx1ZS4gU3VjaCBhcyAnSmFudWFyeSAxMiAtIDEzLCAyMDEyJ1xuICAgICAgICBpZiAobWF0Y2hbREFURV9UT19HUk9VUF0pIHtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQgPSByZXN1bHQuc3RhcnQuY2xvbmUoKTtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCdkYXknLCBwYXJzZUludChtYXRjaFtEQVRFX1RPX0dST1VQXSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VOTW9udGhOYW1lTWlkZGxlRW5kaWFuUGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuIiwiLypcbiAgICBcbiAgICBUaGUgcGFyc2VyIGZvciBwYXJzaW5nIG1vbnRoIG5hbWUgYW5kIHllYXIuXG4gICAgXG4gICAgRVguIFxuICAgICAgICAtIEphbnVhcnlcbiAgICAgICAgLSBKYW51YXJ5IDIwMTJcbiAgICAgICAgLSBKYW51YXJ5LCAyMDEyXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5cbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xudmFyIHV0aWwgID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvRU4nKTtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXnxcXFxcRFxcXFxzK3xbXlxcXFx3XFxcXHNdKScgK1xuICAgICcoSmFuXFxcXC4/fEphbnVhcnl8RmViXFxcXC4/fEZlYnJ1YXJ5fE1hclxcXFwuP3xNYXJjaHxBcHJcXFxcLj98QXByaWx8TWF5XFxcXC4/fEp1blxcXFwuP3xKdW5lfEp1bFxcXFwuP3xKdWx5fEF1Z1xcXFwuP3xBdWd1c3R8U2VwXFxcXC4/fFNlcHRcXFxcLj98U2VwdGVtYmVyfE9jdFxcXFwuP3xPY3RvYmVyfE5vdlxcXFwuP3xOb3ZlbWJlcnxEZWNcXFxcLj98RGVjZW1iZXIpJyArIFxuICAgICdcXFxccyonICtcbiAgICAnKD86JyArXG4gICAgICAgICcsP1xcXFxzKihbMC05XXs0fSkoXFxcXHMqQkUpPycgK1xuICAgICcpPycgK1xuICAgICcoPz1bXlxcXFxzXFxcXHddfCQpJywgJ2knKTtcblxudmFyIE1PTlRIX05BTUVfR1JPVVAgPSAyO1xudmFyIFlFQVJfR1JPVVAgPSAzO1xudmFyIFlFQVJfQkVfR1JPVVAgPSA0O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOTW9udGhOYW1lUGFyc2VyKCl7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cbiAgICBcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICB0ZXh0OiBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpLFxuICAgICAgICAgICAgaW5kZXg6IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoLFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIFxuICAgICAgICB2YXIgbW9udGggPSBtYXRjaFtNT05USF9OQU1FX0dST1VQXTtcbiAgICAgICAgbW9udGggPSB1dGlsLk1PTlRIX09GRlNFVFttb250aC50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICB2YXIgZGF5ID0gMTtcblxuICAgICAgICB2YXIgeWVhciA9IG51bGw7XG4gICAgICAgIGlmIChtYXRjaFtZRUFSX0dST1VQXSkge1xuICAgICAgICAgICAgeWVhciA9IG1hdGNoW1lFQVJfR1JPVVBdO1xuICAgICAgICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIpO1xuXG4gICAgICAgICAgICBpZihtYXRjaFtZRUFSX0JFX0dST1VQXSl7IFxuICAgICAgICAgICAgICAgIC8vQkNcbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciAtIDU0MztcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDwgMTAwKXsgXG5cbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciArIDIwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih5ZWFyKXtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF5KTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHllYXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL0ZpbmQgdGhlIG1vc3QgYXBwcm9wcmlhdGVkIHllYXJcbiAgICAgICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgICAgIHJlZk1vbWVudC5tb250aChtb250aCAtIDEpO1xuICAgICAgICAgICAgcmVmTW9tZW50LmRhdGUoZGF5KTtcblxuICAgICAgICAgICAgdmFyIG5leHRZZWFyID0gcmVmTW9tZW50LmNsb25lKCkuYWRkKDEsICd5Jyk7XG4gICAgICAgICAgICB2YXIgbGFzdFllYXIgPSByZWZNb21lbnQuY2xvbmUoKS5hZGQoLTEsICd5Jyk7XG4gICAgICAgICAgICBpZiggTWF0aC5hYnMobmV4dFllYXIuZGlmZihtb21lbnQocmVmKSkpIDwgTWF0aC5hYnMocmVmTW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApeyAgXG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbmV4dFllYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBNYXRoLmFicyhsYXN0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7IFxuICAgICAgICAgICAgICAgIHJlZk1vbWVudCA9IGxhc3RZZWFyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIHJlZk1vbWVudC55ZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VOTW9udGhOYW1lUGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuIiwiLypcbiAgICBEYXRlIGZvcm1hdCB3aXRoIHNsYXNoIFwiL1wiIChhbHNvIFwiLVwiIGFuZCBcIi5cIikgYmV0d2VlbiBudW1iZXJzIFxuICAgIC0gVHVlc2RheSAxMS8zLzIwMTVcbiAgICAtIDExLzMvMjAxNVxuICAgIC0gMTEvM1xuKi9cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgKyBcbiAgICAnKD86JyArIFxuICAgICAgICAnKCg/OnN1bnxtb258dHVlcz98d2VkKD86bmVzKT98dGh1KD86cnM/KT98ZnJpfHNhdCg/OnVyKT8pKD86ZGF5KT8pJyArXG4gICAgICAgICdcXFxccypcXFxcLD9cXFxccyonICtcbiAgICAnKT8nICsgXG4gICAgJyhbMC05XXsxLDJ9KVtcXFxcL1xcXFwuXFxcXC1dKFswLTldezEsMn0pJyArIFxuICAgICcoPzonICsgXG4gICAgICAgICdbXFxcXC9cXFxcLlxcXFwtXScgKyBcbiAgICAgICAgJyhbMC05XXs0fXxbMC05XXsyfSknICsgXG4gICAgJyk/JyArIFxuICAgICcoXFxcXFd8JCknLCAnaScpO1xuXG52YXIgREFZU19PRkZTRVQgPSB7ICdzdW5kYXknOiAwLCAnc3VuJzogMCwgJ21vbmRheSc6IDEsICdtb24nOiAxLCd0dWVzZGF5JzogMiwgJ3dlZG5lc2RheSc6IDMsICd3ZWQnOiAzLFxuICAgICd0aHVyc2RheSc6IDQsICd0aHVyJzogNCwnZnJpZGF5JzogNSwgJ2ZyaSc6IDUsJ3NhdHVyZGF5JzogNiwgJ3NhdCc6IDYsfVxuXG5cbnZhciBPUEVOTklOR19HUk9VUCA9IDE7XG52YXIgRU5ESU5HX0dST1VQID0gNjtcblxudmFyIFdFRUtEQVlfR1JPVVAgPSAyO1xudmFyIE1PTlRIX0dST1VQID0gMztcbnZhciBEQVlfR1JPVVAgPSA0O1xudmFyIFlFQVJfR1JPVVAgPSA1O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOU2xhc2hEYXRlRm9ybWF0UGFyc2VyKGFyZ3VtZW50KSB7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBQQVRURVJOOyB9O1xuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG4gICAgICAgIFxuICAgICAgICBpZihtYXRjaFtPUEVOTklOR19HUk9VUF0gPT0gJy8nIHx8IG1hdGNoW0VORElOR19HUk9VUF0gPT0gJy8nKSB7XG4gICAgICAgICAgICAvLyBMb25nIHNraXAsIGlmIHRoZXJlIGlzIHNvbWUgb3ZlcmxhcHBpbmcgbGlrZTpcbiAgICAgICAgICAgIC8vIFhYWy9ZWS9aWl1cbiAgICAgICAgICAgIC8vIFtYWC9ZWS9dWlpcbiAgICAgICAgICAgIG1hdGNoLmluZGV4ICs9IG1hdGNoWzBdLmxlbmd0aFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFtPUEVOTklOR19HUk9VUF0ubGVuZ3RoO1xuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFtPUEVOTklOR19HUk9VUF0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFtFTkRJTkdfR1JPVVBdLmxlbmd0aCk7XG5cblxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIGlmKHRleHQubWF0Y2goL15cXGRcXC5cXGQkLykpIHJldHVybjtcbiAgICAgICAgaWYodGV4dC5tYXRjaCgvXlxcZFxcLlxcZHsxLDJ9XFwuXFxkezEsMn0kLykpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIC8vIE1NL2RkIC0+IE9LXG4gICAgICAgIC8vIE1NLmRkIC0+IE5HXG4gICAgICAgIGlmKCFtYXRjaFtZRUFSX0dST1VQXSAmJiBtYXRjaFswXS5pbmRleE9mKCcvJykgPCAwKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGRhdGUgPSBudWxsO1xuICAgICAgICB2YXIgeWVhciA9IG1hdGNoW1lFQVJfR1JPVVBdIHx8IG1vbWVudChyZWYpLnllYXIoKSArICcnO1xuICAgICAgICB2YXIgbW9udGggPSBtYXRjaFtNT05USF9HUk9VUF07XG4gICAgICAgIHZhciBkYXkgICA9IG1hdGNoW0RBWV9HUk9VUF07XG4gICAgICAgIFxuICAgICAgICBtb250aCA9IHBhcnNlSW50KG1vbnRoKTtcbiAgICAgICAgZGF5ICA9IHBhcnNlSW50KGRheSk7XG4gICAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyKTtcblxuICAgICAgICBpZihtb250aCA8IDEgfHwgbW9udGggPiAxMikge1xuICAgICAgICAgICAgaWYobW9udGggPiAxMikge1xuICAgICAgICAgICAgICAgIC8vIGRkL21tL3l5eXkgZGF0ZSBmb3JtYXQgaWYgZGF5IGxvb2tzIGxpa2UgYSBtb250aCwgYW5kIG1vbnRoXG4gICAgICAgICAgICAgICAgLy8gbG9va3MgbGlrZSBhIGRheS5cbiAgICAgICAgICAgICAgICBpZiAoZGF5ID49IDEgJiYgZGF5IDw9IDEyICYmIG1vbnRoID49IDEzICYmIG1vbnRoIDw9IDMxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVuYW1iaWd1b3VzXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZGF5ID0gbW9udGg7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoID0gZGF5O1xuICAgICAgICAgICAgICAgICAgICBkYXkgPSB0ZGF5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYm90aCBtb250aCBhbmQgZGF5IGFyZSA8PSAxMlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZGF5IDwgMSB8fCBkYXkgPiAzMSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYoeWVhciA8IDEwMCl7XG4gICAgICAgICAgICBpZiAoeWVhciA+IDUwKSB7XG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgKyAxOTAwOyBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgKyAyMDAwOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgeWVhcik7XG5cbiAgICAgICAgLy9EYXkgb2Ygd2Vla1xuICAgICAgICBpZihtYXRjaFtXRUVLREFZX0dST1VQXSkge1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignd2Vla2RheScsIERBWVNfT0ZGU0VUW21hdGNoW1dFRUtEQVlfR1JPVVBdLnRvTG93ZXJDYXNlKCldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC50YWdzWydFTlNsYXNoRGF0ZUZvcm1hdFBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufTtcbiIsIi8qXG4gICAgRGF0ZSBmb3JtYXQgd2l0aCBzbGFzaCBcIi9cIiBiZXR3ZWVuIG51bWJlcnMgbGlrZSBFTlNsYXNoRGF0ZUZvcm1hdFBhcnNlcixcbiAgICBidXQgdGhpcyBwYXJzZXIgZXhwZWN0IHllYXIgYmVmb3JlIG1vbnRoIGFuZCBkYXRlLiBcbiAgICAtIFlZWVkvTU0vRERcbiAgICAtIFlZWVktTU0tRERcbiAgICAtIFlZWVkuTU0uRERcbiovXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknIFxuICAgICAgICAgICAgKyAnKFswLTldezR9KVtcXFxcLVxcXFwuXFxcXC9dKFswLTldezEsMn0pW1xcXFwtXFxcXC5cXFxcL10oWzAtOV17MSwyfSknXG4gICAgICAgICAgICArICcoPz1cXFxcV3wkKScsICdpJyk7XG5cbnZhciBZRUFSX05VTUJFUl9HUk9VUCA9IDI7XG52YXIgTU9OVEhfTlVNQkVSX0dST1VQID0gMztcbnZhciBEQVRFX05VTUJFUl9HUk9VUCAgPSA0O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOU2xhc2hEYXRlRm9ybWF0U3RhcnRXaXRoWWVhclBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIFxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxuICAgIFxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG5cbiAgICAgICAgdmFyIHRleHQgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHBhcnNlSW50KG1hdGNoW1lFQVJfTlVNQkVSX0dST1VQXSkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIHBhcnNlSW50KG1hdGNoW01PTlRIX05VTUJFUl9HUk9VUF0pKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgcGFyc2VJbnQobWF0Y2hbREFURV9OVU1CRVJfR1JPVVBdKSk7XG5cbiAgICAgICAgaWYgKG1vbWVudChyZXN1bHQuc3RhcnQuZ2V0KCdtb250aCcpKSA+IDEyIHx8IG1vbWVudChyZXN1bHQuc3RhcnQuZ2V0KCdtb250aCcpKSA8IDEgfHxcbiAgICAgICAgICAgIG1vbWVudChyZXN1bHQuc3RhcnQuZ2V0KCdkYXknKSkgPiAzMSB8fCBtb21lbnQocmVzdWx0LnN0YXJ0LmdldCgnZGF5JykpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJlc3VsdC50YWdzWydFTkRhdGVGb3JtYXRQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn1cbiIsIi8qXG4gICAgTW9udGgvWWVhciBkYXRlIGZvcm1hdCB3aXRoIHNsYXNoIFwiL1wiIChhbHNvIFwiLVwiIGFuZCBcIi5cIikgYmV0d2VlbiBudW1iZXJzIFxuICAgIC0gMTEvMDVcbiAgICAtIDA2LzIwMDVcbiovXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXnxbXlxcXFxkL11cXFxccyt8W15cXFxcd1xcXFxzXSknICtcbiAgICAnKFswLTldfDBbMS05XXwxWzAxMl0pLyhbMC05XXs0fSknICsgXG4gICAgJyhbXlxcXFxkL118JCknLCAnaScpO1xuXG52YXIgT1BFTk5JTkdfR1JPVVAgPSAxO1xudmFyIEVORElOR19HUk9VUCA9IDQ7XG5cbnZhciBNT05USF9HUk9VUCA9IDI7XG52YXIgWUVBUl9HUk9VUCA9IDM7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRU5TbGFzaE1vbnRoRm9ybWF0UGFyc2VyKGFyZ3VtZW50KSB7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBQQVRURVJOOyB9O1xuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG4gICAgICAgIFxuICAgICAgICB2YXIgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoW09QRU5OSU5HX0dST1VQXS5sZW5ndGg7XG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoW09QRU5OSU5HX0dST1VQXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtICgxICsgbWF0Y2hbRU5ESU5HX0dST1VQXS5sZW5ndGgpKS50cmltKCk7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZGF0ZSA9IG51bGw7XG4gICAgICAgIHZhciB5ZWFyID0gbWF0Y2hbWUVBUl9HUk9VUF0gO1xuICAgICAgICB2YXIgbW9udGggPSBtYXRjaFtNT05USF9HUk9VUF07XG4gICAgICAgIHZhciBkYXkgICA9IDE7XG4gICAgICAgIFxuICAgICAgICBtb250aCA9IHBhcnNlSW50KG1vbnRoKTtcbiAgICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIpO1xuXG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF5KTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBtb250aCk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcblxuICAgICAgICByZXN1bHQudGFnc1snRU5TbGFzaE1vbnRoRm9ybWF0UGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59O1xuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcbnZhciB1dGlsICA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0VOJyk7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnJyArXG4gICAgJyhcXFxcV3xeKScgK1xuICAgICcoPzp3aXRoaW5cXFxccyopPycgK1xuICAgICcoJyArIHV0aWwuSU5URUdFUl9XT1JEU19QQVRURVJOICsgJ3xbMC05XSt8YW4/KD86XFxcXHMqZmV3KT98aGFsZig/OlxcXFxzKmFuPyk/KVxcXFxzKicgK1xuICAgICcoc2Vjb25kcz98bWluKD86dXRlKT9zP3xob3Vycz98d2Vla3M/fGRheXM/fG1vbnRocz98eWVhcnM/KVxcXFxzKicgK1xuICAgICcoPzphZ298YmVmb3JlfGVhcmxpZXIpKD89KD86XFxcXFd8JCkpJywgJ2knKTtcblxudmFyIFNUUklDVF9QQVRURVJOID0gbmV3IFJlZ0V4cCgnJyArXG4gICAgJyhcXFxcV3xeKScgK1xuICAgICcoPzp3aXRoaW5cXFxccyopPycgK1xuICAgICcoWzAtOV0rfGFuPylcXFxccyonICtcbiAgICAnKHNlY29uZHM/fG1pbnV0ZXM/fGhvdXJzP3xkYXlzPylcXFxccyonICtcbiAgICAnYWdvKD89KD86XFxcXFd8JCkpJywgJ2knKTtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFTlRpbWVBZ29Gb3JtYXRQYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1N0cmljdE1vZGUoKT8gU1RSSUNUX1BBVFRFUk4gOiBQQVRURVJOO1xuICAgIH07XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIGlmIChtYXRjaC5pbmRleCA+IDAgJiYgdGV4dFttYXRjaC5pbmRleC0xXS5tYXRjaCgvXFx3LykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF07XG4gICAgICAgIHRleHQgID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcblxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWZcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG51bSA9IG1hdGNoWzJdLnRvTG93ZXJDYXNlKCkgO1xuICAgICAgICBpZiAodXRpbC5JTlRFR0VSX1dPUkRTW251bV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbnVtID0gdXRpbC5JTlRFR0VSX1dPUkRTW251bV07XG4gICAgICAgIH0gZWxzZSBpZihudW0gPT09ICdhJyB8fCBudW0gPT09ICdhbicpe1xuICAgICAgICAgICAgbnVtID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChudW0ubWF0Y2goL2Zldy8pKSB7XG4gICAgICAgICAgICBudW0gPSAzO1xuICAgICAgICB9IGVsc2UgaWYgKG51bS5tYXRjaCgvaGFsZi8pKSB7XG4gICAgICAgICAgICBudW0gPSAwLjU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW0gPSBwYXJzZUludChudW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQocmVmKTtcblxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL2hvdXJ8bWlufHNlY29uZC9pKSkge1xuICAgICAgICAgICAgaWYgKG1hdGNoWzNdLm1hdGNoKC9ob3VyL2kpKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnaG91cicpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzNdLm1hdGNoKC9taW4vaSkpIHtcblxuICAgICAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdtaW51dGUnKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFszXS5tYXRjaCgvc2Vjb25kL2kpKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnc2Vjb25kJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIGRhdGUuaG91cigpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21pbnV0ZScsIGRhdGUubWludXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignc2Vjb25kJywgZGF0ZS5zZWNvbmQoKSk7XG4gICAgICAgICAgICByZXN1bHQudGFnc1snRU5UaW1lQWdvRm9ybWF0UGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvd2Vlay9pKSkge1xuICAgICAgICAgICAgZGF0ZS5hZGQoLW51bSwgJ3dlZWsnKTtcblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3dlZWtkYXknLCBkYXRlLmRheSgpKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL2RheS9pKSkge1xuICAgICAgICAgICAgZGF0ZS5hZGQoLW51bSwgJ2QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvbW9udGgvaSkpIHtcbiAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdtb250aCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoWzNdLm1hdGNoKC95ZWFyL2kpKSB7XG5cbiAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICd5ZWFyJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9O1xufVxuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcbnZhciBQYXJzZWRDb21wb25lbnRzID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkQ29tcG9uZW50cztcblxudmFyIEZJUlNUX1JFR19QQVRURVJOICA9IG5ldyBSZWdFeHAoXCIoXnxcXFxcc3xUKVwiICtcbiAgICBcIig/Oig/OmF0fGZyb20pXFxcXHMqKT9cIiArIFxuICAgIFwiKFxcXFxkezEsNH18bm9vbnxtaWRuaWdodClcIiArIFxuICAgIFwiKD86XCIgKyBcbiAgICAgICAgXCIoPzpcXFxcLnxcXFxcOnxcXFxc77yaKShcXFxcZHsxLDJ9KVwiICsgXG4gICAgICAgIFwiKD86XCIgKyBcbiAgICAgICAgICAgIFwiKD86XFxcXDp8XFxcXO+8mikoXFxcXGR7Mn0pXCIgKyBcbiAgICAgICAgXCIpP1wiICsgXG4gICAgXCIpP1wiICsgXG4gICAgXCIoPzpcXFxccyooQVxcXFwuTVxcXFwufFBcXFxcLk1cXFxcLnxBTT98UE0/KSk/XCIgKyBcbiAgICBcIig/PVxcXFxXfCQpXCIsICdpJyk7XG5cblxudmFyIFNFQ09ORF9SRUdfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqXCIgKyBcbiAgICBcIihcXFxcLXxcXFxc4oCTfFxcXFx+fFxcXFzjgJx8dG98XFxcXD8pXFxcXHMqXCIgKyBcbiAgICBcIihcXFxcZHsxLDR9KVwiICtcbiAgICBcIig/OlwiICsgXG4gICAgICAgIFwiKD86XFxcXC58XFxcXDp8XFxcXO+8mikoXFxcXGR7MSwyfSlcIiArIFxuICAgICAgICBcIig/OlwiICsgXG4gICAgICAgICAgICBcIig/OlxcXFwufFxcXFw6fFxcXFzvvJopKFxcXFxkezEsMn0pXCIgKyBcbiAgICAgICAgXCIpP1wiICsgXG4gICAgXCIpP1wiICsgXG4gICAgXCIoPzpcXFxccyooQVxcXFwuTVxcXFwufFBcXFxcLk1cXFxcLnxBTT98UE0/KSk/XCIgKyBcbiAgICBcIig/PVxcXFxXfCQpXCIsICdpJyk7XG5cbnZhciBIT1VSX0dST1VQICAgID0gMjtcbnZhciBNSU5VVEVfR1JPVVAgID0gMztcbnZhciBTRUNPTkRfR1JPVVAgID0gNDtcbnZhciBBTV9QTV9IT1VSX0dST1VQID0gNTtcblxuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOVGltZUV4cHJlc3Npb25QYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gRklSU1RfUkVHX1BBVFRFUk47IH1cbiAgICBcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpeyBcbiAgICAgICAgXG4gICAgICAgIC8vIFRoaXMgcGF0dGVybiBjYW4gYmUgb3ZlcmxhcGVkIEV4LiBbMTJdIEFNLCAxWzJdIEFNXG4gICAgICAgIGlmIChtYXRjaC5pbmRleCA+IDAgJiYgdGV4dFttYXRjaC5pbmRleC0xXS5tYXRjaCgvXFx3LykpIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgcmVmTW9tZW50ID0gbW9tZW50KHJlZik7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KCk7XG4gICAgICAgIHJlc3VsdC5yZWYgPSByZWY7XG4gICAgICAgIHJlc3VsdC5pbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICByZXN1bHQudGV4dCAgPSBtYXRjaFswXS5zdWJzdHJpbmcobWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VOVGltZUV4cHJlc3Npb25QYXJzZXInXSA9IHRydWU7XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCAgIHJlZk1vbWVudC5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgcmVmTW9tZW50Lm1vbnRoKCkrMSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsICByZWZNb21lbnQueWVhcigpKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBob3VyID0gMDtcbiAgICAgICAgdmFyIG1pbnV0ZSA9IDA7XG4gICAgICAgIHZhciBtZXJpZGllbSA9IC0xO1xuXG4gICAgICAgIC8vIC0tLS0tIFNlY29uZFxuICAgICAgICBpZihtYXRjaFtTRUNPTkRfR1JPVVBdICE9IG51bGwpeyBcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBwYXJzZUludChtYXRjaFtTRUNPTkRfR1JPVVBdKTtcbiAgICAgICAgICAgIGlmKHNlY29uZCA+PSA2MCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3NlY29uZCcsIHNlY29uZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIC0tLS0tIEhvdXJzXG4gICAgICAgIGlmIChtYXRjaFtIT1VSX0dST1VQXS50b0xvd2VyQ2FzZSgpID09IFwibm9vblwiKXtcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTsgXG4gICAgICAgICAgICBob3VyID0gMTI7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbSE9VUl9HUk9VUF0udG9Mb3dlckNhc2UoKSA9PSBcIm1pZG5pZ2h0XCIpIHtcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMDsgXG4gICAgICAgICAgICBob3VyID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvdXIgPSBwYXJzZUludChtYXRjaFtIT1VSX0dST1VQXSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIC0tLS0tIE1pbnV0ZXNcbiAgICAgICAgaWYobWF0Y2hbTUlOVVRFX0dST1VQXSAhPSBudWxsKXsgXG4gICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChtYXRjaFtNSU5VVEVfR1JPVVBdKTtcbiAgICAgICAgfSBlbHNlIGlmKGhvdXIgPiAxMDApIHsgXG4gICAgICAgICAgICBtaW51dGUgPSBob3VyJTEwMDtcbiAgICAgICAgICAgIGhvdXIgICA9IHBhcnNlSW50KGhvdXIvMTAwKTtcbiAgICAgICAgfSBcbiAgICAgICAgXG4gICAgICAgIGlmKG1pbnV0ZSA+PSA2MCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZihob3VyID4gMjQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VyID49IDEyKSB7IFxuICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gLS0tLS0gQU0gJiBQTSAgXG4gICAgICAgIGlmKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB2YXIgYW1wbSA9IG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZihhbXBtID09IFwiYVwiKXtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDA7IFxuICAgICAgICAgICAgICAgIGlmKGhvdXIgPT0gMTIpIGhvdXIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihhbXBtID09IFwicFwiKXtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDE7IFxuICAgICAgICAgICAgICAgIGlmKGhvdXIgIT0gMTIpIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIGhvdXIpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBtaW51dGUpO1xuXG4gICAgICAgIGlmIChtZXJpZGllbSA+PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtZXJpZGllbScsIG1lcmlkaWVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChob3VyIDwgMTIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICBFeHRyYWN0aW5nIHRoZSAndG8nIGNodW5rXG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIG1hdGNoID0gU0VDT05EX1JFR19QQVRURVJOLmV4ZWModGV4dC5zdWJzdHJpbmcocmVzdWx0LmluZGV4ICsgcmVzdWx0LnRleHQubGVuZ3RoKSk7XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIC8vIE5vdCBhY2NlcHQgbnVtYmVyIG9ubHkgcmVzdWx0XG4gICAgICAgICAgICBpZiAocmVzdWx0LnRleHQubWF0Y2goL15cXGQrJC8pKSB7IFxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvLyBQYXR0ZXJuIFwiWVkuWVkgLVhYWFhcIiBpcyBtb3JlIGxpa2UgdGltZXpvbmUgb2Zmc2V0XG4gICAgICAgIGlmIChtYXRjaFswXS5tYXRjaCgvXlxccyooXFwrfFxcLSlcXHMqXFxkezMsNH0kLykpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZihyZXN1bHQuZW5kID09IG51bGwpe1xuICAgICAgICAgICAgcmVzdWx0LmVuZCA9IG5ldyBQYXJzZWRDb21wb25lbnRzKG51bGwsIHJlc3VsdC5zdGFydC5kYXRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhvdXIgPSAwO1xuICAgICAgICB2YXIgbWludXRlID0gMDtcbiAgICAgICAgdmFyIG1lcmlkaWVtID0gLTE7XG5cbiAgICAgICAgLy8gLS0tLS0gU2Vjb25kXG4gICAgICAgIGlmKG1hdGNoW1NFQ09ORF9HUk9VUF0gIT0gbnVsbCl7IFxuICAgICAgICAgICAgdmFyIHNlY29uZCA9IHBhcnNlSW50KG1hdGNoW1NFQ09ORF9HUk9VUF0pO1xuICAgICAgICAgICAgaWYoc2Vjb25kID49IDYwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ3NlY29uZCcsIHNlY29uZCk7XG4gICAgICAgIH1cblxuICAgICAgICBob3VyID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuICAgICAgICBcbiAgICAgICAgLy8gLS0tLS0gTWludXRlXG4gICAgICAgIGlmIChtYXRjaFtNSU5VVEVfR1JPVVBdIT0gbnVsbCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChtYXRjaFtNSU5VVEVfR1JPVVBdKTtcbiAgICAgICAgICAgIGlmKG1pbnV0ZSA+PSA2MCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2UgaWYgKGhvdXIgPiAxMDApIHtcblxuICAgICAgICAgICAgbWludXRlID0gaG91ciUxMDA7XG4gICAgICAgICAgICBob3VyICAgPSBwYXJzZUludChob3VyLzEwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtaW51dGUgPj0gNjApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaG91ciA+IDI0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaG91ciA+PSAxMikgeyBcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gLS0tLS0gQU0gJiBQTSBcbiAgICAgICAgaWYgKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdICE9IG51bGwpe1xuXG4gICAgICAgICAgICBpZiAoaG91ciA+IDEyKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgaWYobWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF1bMF0udG9Mb3dlckNhc2UoKSA9PSBcImFcIil7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAwOyBcbiAgICAgICAgICAgICAgICBpZihob3VyID09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5lbmQuaXNDZXJ0YWluKCdkYXknKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnZGF5JywgcmVzdWx0LmVuZC5nZXQoJ2RheScpICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdWzBdLnRvTG93ZXJDYXNlKCkgPT0gXCJwXCIpe1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMTsgXG4gICAgICAgICAgICAgICAgaWYoaG91ciAhPSAxMikgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdtZXJpZGllbScpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lcmlkaWVtID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgPT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN0YXJ0LmdldCgnaG91cicpICE9IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdob3VyJywgcmVzdWx0LnN0YXJ0LmdldCgnaG91cicpICsgMTIpOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC50ZXh0ID0gcmVzdWx0LnRleHQgKyBtYXRjaFswXTtcbiAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2hvdXInLCBob3VyKTtcbiAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ21pbnV0ZScsIG1pbnV0ZSk7XG4gICAgICAgIGlmIChtZXJpZGllbSA+PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignbWVyaWRpZW0nLCBtZXJpZGllbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3RhcnRBdFBNID0gcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignbWVyaWRpZW0nKSAmJiByZXN1bHQuc3RhcnQuZ2V0KCdtZXJpZGllbScpID09IDE7XG4gICAgICAgICAgICBpZiAoc3RhcnRBdFBNICYmIHJlc3VsdC5zdGFydC5nZXQoJ2hvdXInKSA+IGhvdXIpIHtcbiAgICAgICAgICAgICAgICAvLyAxMHBtIC0gMSAoYW0pXG4gICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnbWVyaWRpZW0nLCAwKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VyID4gMTIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KCdtZXJpZGllbScsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdC5lbmQuZGF0ZSgpLmdldFRpbWUoKSA8IHJlc3VsdC5zdGFydC5kYXRlKCkuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KCdkYXknLCByZXN1bHQuZW5kLmdldCgnZGF5JykgKyAxKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuIiwiLypcblxuXG4qL1xudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBEQVlTX09GRlNFVCA9IHsgJ3N1bmRheSc6IDAsICdzdW4nOiAwLCAnbW9uZGF5JzogMSwgJ21vbic6IDEsJ3R1ZXNkYXknOiAyLCAndHVlcyc6MiwgJ3R1ZSc6MiwgJ3dlZG5lc2RheSc6IDMsICd3ZWQnOiAzLFxuICAgICd0aHVyc2RheSc6IDQsICd0aHVycyc6NCwgJ3RodXInOiA0LCAndGh1JzogNCwnZnJpZGF5JzogNSwgJ2ZyaSc6IDUsJ3NhdHVyZGF5JzogNiwgJ3NhdCc6IDZ9O1xuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICcoPzooPzpcXFxcLHxcXFxcKHxcXFxc77yIKVxcXFxzKik/JyArXG4gICAgJyg/Oih0aGlzfGxhc3R8bmV4dClcXFxccyopPycgK1xuICAgICcoJyArIE9iamVjdC5rZXlzKERBWVNfT0ZGU0VUKS5qb2luKCd8JykgKyAnKScgK1xuICAgICcoPzpcXFxccyooPzpcXFxcLHxcXFxcKXxcXFxc77yJKSk/JyArXG4gICAgJyg/OlxcXFxzKih0aGlzfGxhc3R8bmV4dClcXFxccyp3ZWVrKT8nICtcbiAgICAnKD89XFxcXFd8JCknLCAnaScpO1xuXG52YXIgUFJFRklYX0dST1VQID0gMjtcbnZhciBXRUVLREFZX0dST1VQID0gMztcbnZhciBQT1NURklYX0dST1VQID0gNDtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFTldlZWtkYXlQYXJzZXIoKSB7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH07XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuICAgICAgICB2YXIgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIHRleHQgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBkYXlPZldlZWsgPSBtYXRjaFtXRUVLREFZX0dST1VQXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gREFZU19PRkZTRVRbZGF5T2ZXZWVrXTtcbiAgICAgICAgaWYob2Zmc2V0ID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHZhciBzdGFydE1vbWVudCA9IG1vbWVudChyZWYpO1xuICAgICAgICB2YXIgcHJlZml4ID0gbWF0Y2hbUFJFRklYX0dST1VQXTtcbiAgICAgICAgdmFyIHBvc3RmaXggPSBtYXRjaFtQT1NURklYX0dST1VQXTtcblxuICAgICAgICBpZiAocHJlZml4IHx8IHBvc3RmaXgpIHtcbiAgICAgICAgICAgIHZhciBub3JtID0gcHJlZml4IHx8IHBvc3RmaXg7XG4gICAgICAgICAgICBub3JtID0gbm9ybS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZihub3JtID09ICdsYXN0JylcbiAgICAgICAgICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0IC0gNyk7XG4gICAgICAgICAgICBlbHNlIGlmKG5vcm0gPT0gJ25leHQnKVxuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmRheShvZmZzZXQgKyA3KTtcbiAgICAgICAgICAgIGVsc2UgaWYobm9ybT09ICd0aGlzJylcbiAgICAgICAgICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0KTtcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgdmFyIHJlZk9mZnNldCA9IHN0YXJ0TW9tZW50LmRheSgpO1xuICAgICAgICAgICAgaWYgKCBvcHQuZm9yd2FyZERhdGVzT25seSAmJiByZWZPZmZzZXQgPiBvZmZzZXQgKSB7XG4gICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmRheShvZmZzZXQgKyA3KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW9wdC5mb3J3YXJkRGF0ZXNPbmx5ICYmIE1hdGguYWJzKG9mZnNldCAtIDcgLSByZWZPZmZzZXQpIDwgTWF0aC5hYnMob2Zmc2V0IC0gcmVmT2Zmc2V0KSkge1xuICAgICAgICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0IC0gNyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFvcHQuZm9yd2FyZERhdGVzT25seSAmJiBNYXRoLmFicyhvZmZzZXQgKyA3IC0gcmVmT2Zmc2V0KSA8IE1hdGguYWJzKG9mZnNldCAtIHJlZk9mZnNldCkpIHtcbiAgICAgICAgICAgICAgc3RhcnRNb21lbnQuZGF5KG9mZnNldCArIDcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RhcnRNb21lbnQuZGF5KG9mZnNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd3ZWVrZGF5Jywgb2Zmc2V0KTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgc3RhcnRNb21lbnQubW9udGgoKSArIDEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn07XG5cbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbi8qXG4gIFZhbGlkIHBhdHRlcm5zOlxuICAtIGVzdGEgbWHDsWFuYSAtPiB0b2RheSBpbiB0aGUgbW9ybmluZ1xuICAtIGVzdGEgdGFyZGUgLT4gdG9kYXkgaW4gdGhlIGFmdGVybm9vbi9ldmVuaW5nXG4gIC0gZXN0YSBub2NoZSAtPiB0b25pZ2h0XG4gIC0gYXllciBwb3IgbGEgbWHDsWFuYSAtPiB5ZXN0ZXJkYXkgaW4gdGhlIG1vcm5pbmdcbiAgLSBheWVyIHBvciBsYSB0YXJkZSAtPiB5ZXN0ZXJkYXkgaW4gdGhlIGFmdGVybm9vbi9ldmVuaW5nXG4gIC0gYXllciBwb3IgbGEgbm9jaGUgLT4geWVzdGVyZGF5IGF0IG5pZ2h0XG4gIC0gbWHDsWFuYSBwb3IgbGEgbWHDsWFuYSAtPiB0b21vcnJvdyBpbiB0aGUgbW9ybmluZ1xuICAtIG1hw7FhbmEgcG9yIGxhIHRhcmRlIC0+IHRvbW9ycm93IGluIHRoZSBhZnRlcm5vb24vZXZlbmluZ1xuICAtIG1hw7FhbmEgcG9yIGxhIG5vY2hlIC0+IHRvbW9ycm93IGF0IG5pZ2h0XG4gIC0gYW5vY2hlIC0+IHRvbW9ycm93IGF0IG5pZ2h0XG4gIC0gaG95IC0+IHRvZGF5XG4gIC0gYXllciAtPiB5ZXN0ZXJkYXlcbiAgLSBtYcOxYW5hIC0+IHRvbW9ycm93XG4gKi9cbnZhciBQQVRURVJOID0gLyhcXFd8XikoYWhvcmF8ZXN0YVxccyoobWHDsWFuYXx0YXJkZXxub2NoZSl8KGF5ZXJ8bWHDsWFuYSlcXHMqcG9yXFxzKmxhXFxzKihtYcOxYW5hfHRhcmRlfG5vY2hlKXxob3l8bWHDsWFuYXxheWVyfGFub2NoZSkoPz1cXFd8JCkvaTtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFU0Nhc3VhbERhdGVQYXJzZXIoKXtcblxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7IHJldHVybiBQQVRURVJOOyB9XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgdmFyIHN0YXJ0TW9tZW50ID0gcmVmTW9tZW50LmNsb25lKCk7XG4gICAgICAgIHZhciBsb3dlclRleHQgPSB0ZXh0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuXG4gICAgICAgIGlmKGxvd2VyVGV4dCA9PSAnbWHDsWFuYScpe1xuXG4gICAgICAgICAgICAvLyBDaGVjayBub3QgXCJUb21vcnJvd1wiIG9uIGxhdGUgbmlnaHRcbiAgICAgICAgICAgIGlmKHJlZk1vbWVudC5ob3VyKCkgPiAxKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKDEsICdkYXknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYobG93ZXJUZXh0ID09ICdheWVyJykge1xuXG4gICAgICAgICAgICBzdGFydE1vbWVudC5hZGQoLTEsICdkYXknKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGxvd2VyVGV4dCA9PSAnYW5vY2hlJykge1xuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAwKTtcbiAgICAgICAgICAgIGlmIChyZWZNb21lbnQuaG91cigpID4gNikge1xuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgtMSwgJ2RheScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAobG93ZXJUZXh0Lm1hdGNoKFwiZXN0YVwiKSkge1xuXG4gICAgICAgICAgICB2YXIgc2Vjb25kTWF0Y2ggPSBtYXRjaFszXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHNlY29uZE1hdGNoID09IFwidGFyZGVcIikge1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMTgpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlY29uZE1hdGNoID09IFwibWHDsWFuYVwiKSB7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCA2KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWNvbmRNYXRjaCA9PSBcIm5vY2hlXCIpIHtcblxuICAgICAgICAgICAgICAvLyBOb3JtYWxseSBtZWFucyB0aGlzIGNvbWluZyBtaWRuaWdodFxuICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAyMik7XG4gICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGxvd2VyVGV4dC5tYXRjaCgvcG9yXFxzKmxhLykpIHtcblxuICAgICAgICAgICAgdmFyIGZpcnN0TWF0Y2ggPSBtYXRjaFs0XS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKGZpcnN0TWF0Y2ggPT09ICdheWVyJykge1xuXG4gICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgtMSwgJ2RheScpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpcnN0TWF0Y2ggPT09ICdtYcOxYW5hJykge1xuXG4gICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgxLCAnZGF5Jyk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNlY29uZE1hdGNoID0gbWF0Y2hbNV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChzZWNvbmRNYXRjaCA9PSBcInRhcmRlXCIpIHtcblxuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDE4KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWNvbmRNYXRjaCA9PSBcIm1hw7FhbmFcIikge1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgOSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Vjb25kTWF0Y2ggPT0gXCJub2NoZVwiKSB7XG5cbiAgICAgICAgICAgICAgLy8gTm9ybWFsbHkgbWVhbnMgdGhpcyBjb21pbmcgbWlkbmlnaHRcbiAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMjIpO1xuICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKGxvd2VyVGV4dC5tYXRjaChcImFob3JhXCIpKSB7XG5cbiAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCByZWZNb21lbnQuaG91cigpKTtcbiAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21pbnV0ZScsIHJlZk1vbWVudC5taW51dGUoKSk7XG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdzZWNvbmQnLCByZWZNb21lbnQuc2Vjb25kKCkpO1xuICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWlsbGlzZWNvbmQnLCByZWZNb21lbnQubWlsbGlzZWNvbmQoKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIHN0YXJ0TW9tZW50LmRhdGUoKSlcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSlcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHN0YXJ0TW9tZW50LnllYXIoKSlcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VTQ2FzdWFsRGF0ZVBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCIvKlxuXG5cbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xuXG52YXIgUEFUVEVSTiA9IC8oXFxXfF4pKGRlbnRyb1xccypkZXxlbilcXHMqKFswLTldK3xtZWRpW29hXXx1bmE/KVxccyoobWludXRvcz98aG9yYXM/fGRbacOtXWFzPylcXHMqKD89KD86XFxXfCQpKS9pO1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVTRGVhZGxpbmVGb3JtYXRQYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICB2YXIgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIHRleHQgID0gbWF0Y2hbMF07XG4gICAgICAgIHRleHQgID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKTtcblxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBudW0gPSBwYXJzZUludChtYXRjaFszXSk7XG4gICAgICAgIGlmIChpc05hTihudW0pKSB7XG4gICAgICAgICAgaWYgKG1hdGNoWzNdLm1hdGNoKC9tZWRpLykpIHtcbiAgICAgICAgICAgIG51bSA9IDAuNTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGF0ZSA9IG1vbWVudChyZWYpO1xuICAgICAgICBpZiAobWF0Y2hbNF0ubWF0Y2goL2RbacOtXWEvKSkge1xuICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnZCcpO1xuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChtYXRjaFs0XS5tYXRjaCgvaG9yYS8pKSB7XG5cbiAgICAgICAgICAgIGRhdGUuYWRkKG51bSwgJ2hvdXInKTtcblxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzRdLm1hdGNoKC9taW51dG8vKSkge1xuXG4gICAgICAgICAgICBkYXRlLmFkZChudW0sICdtaW51dGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIGRhdGUuaG91cigpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWludXRlJywgZGF0ZS5taW51dGUoKSk7XG4gICAgICAgIHJlc3VsdC50YWdzWydFU0RlYWRsaW5lRm9ybWF0UGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59XG4iLCIvKlxuXG5cbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcblxudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciB1dGlsICA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0VTJyk7XG5cbnZhciBEQVlTX09GRlNFVCA9IHV0aWwuV0VFS0RBWV9PRkZTRVQ7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnKFxcXFxXfF4pJyArXG4gICAgICAgICcoPzooRG9taW5nb3xMdW5lc3xNYXJ0ZXN8TWnDqXJjb2xlc3xNaWVyY29sZXN8SnVldmVzfFZpZXJuZXN8U8OhYmFkb3xTYWJhZG98RG9tfEx1bnxNYXJ8TWllfEp1ZXxWaWV8U2FiKVxcXFxzKiw/XFxcXHMqKT8nICtcbiAgICAgICAgJyhbMC05XXsxLDJ9KSg/OsK6fMKqfMKwKT8nICtcbiAgICAgICAgJyg/OlxcXFxzKig/OmRlc2RlfGRlfFxcXFwtfFxcXFzigJN8YWw/fGhhc3RhfFxcXFxzKVxcXFxzKihbMC05XXsxLDJ9KSg/OsK6fMKqfMKwKT8pP1xcXFxzKig/OmRlKT9cXFxccyonICtcbiAgICAgICAgJyhFbmUoPzpyb3xcXFxcLik/fEZlYig/OnJlcm98XFxcXC4pP3xNYXIoPzp6b3xcXFxcLik/fEFicig/OmlsfFxcXFwuKT98TWF5KD86b3xcXFxcLik/fEp1big/OmlvfFxcXFwuKT98SnVsKD86aW98XFxcXC4pP3xBZ28oPzpzdG98XFxcXC4pP3xTZXAoPzp0aWVtYnJlfFxcXFwuKT98T2N0KD86dWJyZXxcXFxcLik/fE5vdig/OmllbWJyZXxcXFxcLik/fERpYyg/OmllbWJyZXxcXFxcLik/KScgK1xuICAgICAgICAnKD86XFxcXHMqKD86ZGVsPyk/KFxcXFxzKlswLTldezIsNH0oPyFbXlxcXFxzXVxcXFxkKSkoXFxcXHMqQUMpPyk/JyArXG4gICAgICAgICcoPz1cXFxcV3wkKScsICdpJ1xuICAgICk7XG5cbnZhciBXRUVLREFZX0dST1VQID0gMjtcbnZhciBEQVRFX0dST1VQID0gMztcbnZhciBEQVRFX1RPX0dST1VQID0gNDtcbnZhciBNT05USF9OQU1FX0dST1VQID0gNTtcbnZhciBZRUFSX0dST1VQID0gNjtcbnZhciBZRUFSX0JFX0dST1VQID0gNztcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFU01vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7IHJldHVybiBQQVRURVJOOyB9XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIHRleHQ6IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtIG1hdGNoWzFdLmxlbmd0aCksXG4gICAgICAgICAgICBpbmRleDogbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGgsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfTkFNRV9HUk9VUF07XG4gICAgICAgIG1vbnRoID0gdXRpbC5NT05USF9PRkZTRVRbbW9udGgudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgdmFyIGRheSA9IG1hdGNoW0RBVEVfR1JPVVBdO1xuICAgICAgICBkYXkgPSBwYXJzZUludChkYXkpO1xuXG4gICAgICAgIHZhciB5ZWFyID0gbnVsbDtcbiAgICAgICAgaWYgKG1hdGNoW1lFQVJfR1JPVVBdKSB7XG4gICAgICAgICAgICB5ZWFyID0gbWF0Y2hbWUVBUl9HUk9VUF07XG4gICAgICAgICAgICB5ZWFyID0gcGFyc2VJbnQoeWVhcik7XG5cbiAgICAgICAgICAgIGlmKG1hdGNoW1lFQVJfQkVfR1JPVVBdKXtcbiAgICAgICAgICAgICAgICAvL0JDXG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgLSA1NDM7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhciA8IDEwMCl7XG5cbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciArIDIwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih5ZWFyKXtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy9GaW5kIHRoZSBtb3N0IGFwcHJvcHJpYXRlZCB5ZWFyXG4gICAgICAgICAgICB2YXIgcmVmTW9tZW50ID0gbW9tZW50KHJlZik7XG4gICAgICAgICAgICByZWZNb21lbnQubW9udGgobW9udGggLSAxKTtcbiAgICAgICAgICAgIHJlZk1vbWVudC5kYXRlKGRheSk7XG4gICAgICAgICAgICByZWZNb21lbnQueWVhcihtb21lbnQocmVmKS55ZWFyKCkpO1xuXG4gICAgICAgICAgICB2YXIgbmV4dFllYXIgPSByZWZNb21lbnQuY2xvbmUoKS5hZGQoMSwgJ3knKTtcbiAgICAgICAgICAgIHZhciBsYXN0WWVhciA9IHJlZk1vbWVudC5jbG9uZSgpLmFkZCgtMSwgJ3knKTtcbiAgICAgICAgICAgIGlmKCBNYXRoLmFicyhuZXh0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7XG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbmV4dFllYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBNYXRoLmFicyhsYXN0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7XG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbGFzdFllYXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIHJlZk1vbWVudC55ZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Vla2RheSBjb21wb25lbnRcbiAgICAgICAgaWYgKG1hdGNoW1dFRUtEQVlfR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgd2Vla2RheSA9IG1hdGNoW1dFRUtEQVlfR1JPVVBdO1xuICAgICAgICAgICAgd2Vla2RheSA9IHV0aWwuV0VFS0RBWV9PRkZTRVRbd2Vla2RheS50b0xvd2VyQ2FzZSgpXVxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignd2Vla2RheScsIHdlZWtkYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGV4dCBjYW4gYmUgJ3JhbmdlJyB2YWx1ZS4gU3VjaCBhcyAnMTIgLSAxMyBKYW51YXJ5IDIwMTInXG4gICAgICAgIGlmIChtYXRjaFtEQVRFX1RPX0dST1VQXSkge1xuICAgICAgICAgICAgcmVzdWx0LmVuZCA9IHJlc3VsdC5zdGFydC5jbG9uZSgpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2RheScsIHBhcnNlSW50KG1hdGNoW0RBVEVfVE9fR1JPVVBdKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQudGFnc1snRVNNb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn1cbiIsIi8qXG4gICAgRGF0ZSBmb3JtYXQgd2l0aCBzbGFzaCBcIi9cIiAoYWxzbyBcIi1cIiBhbmQgXCIuXCIpIGJldHdlZW4gbnVtYmVyc1xuICAgIC0gTWFydGVzIDMvMTEvMjAxNVxuICAgIC0gMy8xMS8yMDE1XG4gICAgLSAzLzExXG4qL1xudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnKFxcXFxXfF4pJyArXG4gICAgJyg/OicgK1xuICAgICAgICAnKCg/OmRvbWluZ298ZG9tfGx1bmVzfGx1bnxtYXJ0ZXN8bWFyfG1pW8OpZV1yY29sZXN8bWllfGp1ZXZlc3xqdWV8dmllcm5lc3x2aWV8c1vDoWFdYmFkb3xzYWIpKScgK1xuICAgICAgICAnXFxcXHMqXFxcXCw/XFxcXHMqJyArXG4gICAgJyk/JyArXG4gICAgJyhbMC05XXsxLDJ9KVtcXFxcL1xcXFwuXFxcXC1dKFswLTldezEsMn0pJyArXG4gICAgJyg/OicgK1xuICAgICAgICAnW1xcXFwvXFxcXC5cXFxcLV0nICtcbiAgICAgICAgJyhbMC05XXs0fXxbMC05XXsyfSknICtcbiAgICAnKT8nICtcbiAgICAnKFxcXFxXfCQpJywgJ2knKTtcblxudmFyIERBWVNfT0ZGU0VUID0geyAnZG9taW5nbyc6IDAsICdkb20nOiAwLCAnbHVuZXMnOiAxLCAnbHVuJzogMSwgJ21hcnRlcyc6IDIsICdtYXInOiAyLCAnbWllcmNvbGVzJzogMywgJ21pw6lyY29sZXMnOiAzLCAnbWllJzogMyxcbiAgICAnanVldmVzJzogNCwgJ2p1ZSc6IDQsICd2aWVybmVzJzogNSwgJ3ZpZXInOiA1LCAnc8OhYmFkbyc6IDYsICdzYWJhZG8nOiA2LCAnc2FiJzogNix9XG5cblxudmFyIE9QRU5OSU5HX0dST1VQID0gMTtcbnZhciBFTkRJTkdfR1JPVVAgPSA2O1xuXG4vLyBpbiBTcGFuaXNoIHdlIHVzZSBkYXkvbW9udGgveWVhclxudmFyIFdFRUtEQVlfR1JPVVAgPSAyO1xudmFyIE1PTlRIX0dST1VQID0gNDtcbnZhciBEQVlfR1JPVVAgPSAzO1xudmFyIFlFQVJfR1JPVVAgPSA1O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVTU2xhc2hEYXRlRm9ybWF0UGFyc2VyKGFyZ3VtZW50KSB7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBQQVRURVJOOyB9O1xuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG5cbiAgICAgICAgaWYobWF0Y2hbT1BFTk5JTkdfR1JPVVBdID09ICcvJyB8fCBtYXRjaFtFTkRJTkdfR1JPVVBdID09ICcvJykge1xuICAgICAgICAgICAgLy8gTG9uZyBza2lwLCBpZiB0aGVyZSBpcyBzb21lIG92ZXJsYXBwaW5nIGxpa2U6XG4gICAgICAgICAgICAvLyBYWFsvWVkvWlpdXG4gICAgICAgICAgICAvLyBbWFgvWVkvXVpaXG4gICAgICAgICAgICBtYXRjaC5pbmRleCArPSBtYXRjaFswXS5sZW5ndGhcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbT1BFTk5JTkdfR1JPVVBdLmxlbmd0aDtcbiAgICAgICAgdmFyIHRleHQgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbT1BFTk5JTkdfR1JPVVBdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbRU5ESU5HX0dST1VQXS5sZW5ndGgpO1xuXG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZih0ZXh0Lm1hdGNoKC9eXFxkXFwuXFxkJC8pKSByZXR1cm47XG4gICAgICAgIGlmKHRleHQubWF0Y2goL15cXGRcXC5cXGR7MSwyfVxcLlxcZHsxLDJ9JC8pKSByZXR1cm47XG5cbiAgICAgICAgLy8gTU0vZGQgLT4gT0tcbiAgICAgICAgLy8gTU0uZGQgLT4gTkdcbiAgICAgICAgaWYoIW1hdGNoW1lFQVJfR1JPVVBdICYmIG1hdGNoWzBdLmluZGV4T2YoJy8nKSA8IDApIHJldHVybjtcblxuICAgICAgICB2YXIgZGF0ZSA9IG51bGw7XG4gICAgICAgIHZhciB5ZWFyID0gbWF0Y2hbWUVBUl9HUk9VUF0gfHwgbW9tZW50KHJlZikueWVhcigpICsgJyc7XG4gICAgICAgIHZhciBtb250aCA9IG1hdGNoW01PTlRIX0dST1VQXTtcbiAgICAgICAgdmFyIGRheSAgID0gbWF0Y2hbREFZX0dST1VQXTtcblxuICAgICAgICBtb250aCA9IHBhcnNlSW50KG1vbnRoKTtcbiAgICAgICAgZGF5ICA9IHBhcnNlSW50KGRheSk7XG4gICAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyKTtcblxuICAgICAgICBpZihtb250aCA8IDEgfHwgbW9udGggPiAxMikge1xuICAgICAgICAgICAgaWYobW9udGggPiAxMikge1xuICAgICAgICAgICAgICAgIC8vIGRkL21tL3l5eXkgZGF0ZSBmb3JtYXQgaWYgZGF5IGxvb2tzIGxpa2UgYSBtb250aCwgYW5kIG1vbnRoXG4gICAgICAgICAgICAgICAgLy8gbG9va3MgbGlrZSBhIGRheS5cbiAgICAgICAgICAgICAgICBpZiAoZGF5ID49IDEgJiYgZGF5IDw9IDEyICYmIG1vbnRoID49IDEzICYmIG1vbnRoIDw9IDMxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVuYW1iaWd1b3VzXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZGF5ID0gbW9udGg7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoID0gZGF5O1xuICAgICAgICAgICAgICAgICAgICBkYXkgPSB0ZGF5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYm90aCBtb250aCBhbmQgZGF5IGFyZSA8PSAxMlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZGF5IDwgMSB8fCBkYXkgPiAzMSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYoeWVhciA8IDEwMCl7XG4gICAgICAgICAgICBpZih5ZWFyID4gNTApe1xuICAgICAgICAgICAgICAgIHllYXIgPSB5ZWFyICsgMjUwMCAtIDU0MzsgLy9CRVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgKyAyMDAwOyAvL0FEXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHllYXIpO1xuXG4gICAgICAgIC8vRGF5IG9mIHdlZWtcbiAgICAgICAgaWYobWF0Y2hbV0VFS0RBWV9HUk9VUF0pIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3dlZWtkYXknLCBEQVlTX09GRlNFVFttYXRjaFtXRUVLREFZX0dST1VQXS50b0xvd2VyQ2FzZSgpXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQudGFnc1snRVNTbGFzaERhdGVGb3JtYXRQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn07XG4iLCIvKlxuXG5cbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xuXG52YXIgUEFUVEVSTiA9IC8oXFxXfF4paGFjZVxccyooWzAtOV0rfG1lZGlbb2FdfHVuYT8pXFxzKihtaW51dG9zP3xob3Jhcz98c2VtYW5hcz98ZFtpw61dYXM/fG1lcyhlcyk/fGHDsW9zPykoPz0oPzpcXFd8JCkpL2k7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRVNUaW1lQWdvRm9ybWF0UGFyc2VyKCl7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFBBVFRFUk47XG4gICAgfVxuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICBpZiAobWF0Y2guaW5kZXggPiAwICYmIHRleHRbbWF0Y2guaW5kZXgtMV0ubWF0Y2goL1xcdy8pKSByZXR1cm4gbnVsbDtcblxuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdO1xuICAgICAgICB0ZXh0ICA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtIG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbnVtID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuICAgICAgICBpZiAoaXNOYU4obnVtKSkge1xuICAgICAgICAgIGlmIChtYXRjaFsyXS5tYXRjaCgvbWVkaS8pKSB7XG4gICAgICAgICAgICBudW0gPSAwLjU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG51bSA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQocmVmKTtcblxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL2hvcmEvKSB8fCBtYXRjaFszXS5tYXRjaCgvbWludXRvLykpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvaG9yYS8pKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnaG91cicpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzNdLm1hdGNoKC9taW51dG8vKSkge1xuXG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQoLW51bSwgJ21pbnV0ZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCBkYXRlLmhvdXIoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBkYXRlLm1pbnV0ZSgpKTtcbiAgICAgICAgICAgIHJlc3VsdC50YWdzWydFU1RpbWVBZ29Gb3JtYXRQYXJzZXInXSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoWzNdLm1hdGNoKC9zZW1hbmEvKSkge1xuICAgICAgICAgICAgZGF0ZS5hZGQoLW51bSwgJ3dlZWsnKTtcblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3dlZWtkYXknLCBkYXRlLmRheSgpKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL2RbacOtXWEvKSkge1xuICAgICAgICAgICAgZGF0ZS5hZGQoLW51bSwgJ2QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvbWVzLykpIHtcbiAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdtb250aCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoWzNdLm1hdGNoKC9hw7FvLykpIHtcblxuICAgICAgICAgICAgZGF0ZS5hZGQoLW51bSwgJ3llYXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH07XG59XG4iLCIvKlxuXG5cbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xudmFyIFBhcnNlZENvbXBvbmVudHMgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRDb21wb25lbnRzO1xuXG52YXIgRklSU1RfUkVHX1BBVFRFUk4gID0gbmV3IFJlZ0V4cChcIihefFxcXFxzfFQpXCIgK1xuICAgIFwiKD86KD86YSBsYXM/fGFsP3xkZXNkZXxkZSlcXFxccyopP1wiICtcbiAgICBcIihcXFxcZHsxLDR9fG1lZGlvZFtpw61dYXxtZWRpYW5vY2hlKVwiICtcbiAgICBcIig/OlwiICtcbiAgICAgICAgXCIoPzpcXFxcLnxcXFxcOnxcXFxc77yaKShcXFxcZHsxLDJ9KVwiICtcbiAgICAgICAgXCIoPzpcIiArXG4gICAgICAgICAgICBcIig/OlxcXFw6fFxcXFzvvJopKFxcXFxkezJ9KVwiICtcbiAgICAgICAgXCIpP1wiICtcbiAgICBcIik/XCIgK1xuICAgIFwiKD86XFxcXHMqKEFcXFxcLk1cXFxcLnxQXFxcXC5NXFxcXC58QU0/fFBNPykpP1wiICtcbiAgICBcIig/PVxcXFxXfCQpXCIsICdpJyk7XG5cblxudmFyIFNFQ09ORF9SRUdfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqXCIgK1xuICAgIFwiKFxcXFwtfFxcXFzigJN8XFxcXH58XFxcXOOAnHxhKD86XFxzKmxhcyk/fFxcXFw/KVxcXFxzKlwiICtcbiAgICBcIihcXFxcZHsxLDR9KVwiICtcbiAgICBcIig/OlwiICtcbiAgICAgICAgXCIoPzpcXFxcLnxcXFxcOnxcXFxc77yaKShcXFxcZHsxLDJ9KVwiICtcbiAgICAgICAgXCIoPzpcIiArXG4gICAgICAgICAgICBcIig/OlxcXFwufFxcXFw6fFxcXFzvvJopKFxcXFxkezEsMn0pXCIgK1xuICAgICAgICBcIik/XCIgK1xuICAgIFwiKT9cIiArXG4gICAgXCIoPzpcXFxccyooQVxcXFwuTVxcXFwufFBcXFxcLk1cXFxcLnxBTT98UE0/KSk/XCIgK1xuICAgIFwiKD89XFxcXFd8JClcIiwgJ2knKTtcblxudmFyIEhPVVJfR1JPVVAgICAgPSAyO1xudmFyIE1JTlVURV9HUk9VUCAgPSAzO1xudmFyIFNFQ09ORF9HUk9VUCAgPSA0O1xudmFyIEFNX1BNX0hPVVJfR1JPVVAgPSA1O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVTVGltZUV4cHJlc3Npb25QYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gRklSU1RfUkVHX1BBVFRFUk47IH1cblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG5cbiAgICAgICAgLy8gVGhpcyBwYXR0ZXJuIGNhbiBiZSBvdmVybGFwZWQgRXguIFsxMl0gQU0sIDFbMl0gQU1cbiAgICAgICAgaWYgKG1hdGNoLmluZGV4ID4gMCAmJiB0ZXh0W21hdGNoLmluZGV4LTFdLm1hdGNoKC9cXHcvKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoKTtcbiAgICAgICAgcmVzdWx0LnJlZiA9IHJlZjtcbiAgICAgICAgcmVzdWx0LmluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHJlc3VsdC50ZXh0ICA9IG1hdGNoWzBdLnN1YnN0cmluZyhtYXRjaFsxXS5sZW5ndGgpO1xuICAgICAgICByZXN1bHQudGFnc1snRVNUaW1lRXhwcmVzc2lvblBhcnNlciddID0gdHJ1ZTtcblxuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsICAgcmVmTW9tZW50LmRhdGUoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCByZWZNb21lbnQubW9udGgoKSsxKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgIHJlZk1vbWVudC55ZWFyKCkpO1xuXG4gICAgICAgIHZhciBob3VyID0gMDtcbiAgICAgICAgdmFyIG1pbnV0ZSA9IDA7XG4gICAgICAgIHZhciBtZXJpZGllbSA9IC0xO1xuXG4gICAgICAgIC8vIC0tLS0tIFNlY29uZFxuICAgICAgICBpZihtYXRjaFtTRUNPTkRfR1JPVVBdICE9IG51bGwpe1xuICAgICAgICAgICAgdmFyIHNlY29uZCA9IHBhcnNlSW50KG1hdGNoW1NFQ09ORF9HUk9VUF0pO1xuICAgICAgICAgICAgaWYoc2Vjb25kID49IDYwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignc2Vjb25kJywgc2Vjb25kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIC0tLS0tIEhvdXJzXG4gICAgICAgIGlmIChtYXRjaFtIT1VSX0dST1VQXS50b0xvd2VyQ2FzZSgpLm1hdGNoKC9tZWRpb2QvKSl7XG4gICAgICAgICAgICBtZXJpZGllbSA9IDE7XG4gICAgICAgICAgICBob3VyID0gMTI7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbSE9VUl9HUk9VUF0udG9Mb3dlckNhc2UoKSA9PSBcIm1lZGlhbm9jaGVcIikge1xuICAgICAgICAgICAgbWVyaWRpZW0gPSAwO1xuICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBob3VyID0gcGFyc2VJbnQobWF0Y2hbSE9VUl9HUk9VUF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gLS0tLS0gTWludXRlc1xuICAgICAgICBpZihtYXRjaFtNSU5VVEVfR1JPVVBdICE9IG51bGwpe1xuICAgICAgICAgICAgbWludXRlID0gcGFyc2VJbnQobWF0Y2hbTUlOVVRFX0dST1VQXSk7XG4gICAgICAgIH0gZWxzZSBpZihob3VyID4gMTAwKSB7XG4gICAgICAgICAgICBtaW51dGUgPSBob3VyJTEwMDtcbiAgICAgICAgICAgIGhvdXIgICA9IHBhcnNlSW50KGhvdXIvMTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1pbnV0ZSA+PSA2MCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZihob3VyID4gMjQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VyID49IDEyKSB7XG4gICAgICAgICAgICBtZXJpZGllbSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBBTSAmIFBNXG4gICAgICAgIGlmKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB2YXIgYW1wbSA9IG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZihhbXBtID09IFwiYVwiKXtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDA7XG4gICAgICAgICAgICAgICAgaWYoaG91ciA9PSAxMikgaG91ciA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGFtcG0gPT0gXCJwXCIpe1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgICAgICAgICBpZihob3VyICE9IDEyKSBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCBob3VyKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWludXRlJywgbWludXRlKTtcbiAgICAgICAgaWYgKG1lcmlkaWVtID49IDApIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21lcmlkaWVtJywgbWVyaWRpZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICBFeHRyYWN0aW5nIHRoZSAndG8nIGNodW5rXG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIG1hdGNoID0gU0VDT05EX1JFR19QQVRURVJOLmV4ZWModGV4dC5zdWJzdHJpbmcocmVzdWx0LmluZGV4ICsgcmVzdWx0LnRleHQubGVuZ3RoKSk7XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIC8vIE5vdCBhY2NlcHQgbnVtYmVyIG9ubHkgcmVzdWx0XG4gICAgICAgICAgICBpZiAocmVzdWx0LnRleHQubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8vIFBhdHRlcm4gXCJZWS5ZWSAtWFhYWFwiIGlzIG1vcmUgbGlrZSB0aW1lem9uZSBvZmZzZXRcbiAgICAgICAgaWYgKG1hdGNoWzBdLm1hdGNoKC9eXFxzKihcXCt8XFwtKVxccypcXGR7Myw0fSQvKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHJlc3VsdC5lbmQgPT0gbnVsbCl7XG4gICAgICAgICAgICByZXN1bHQuZW5kID0gbmV3IFBhcnNlZENvbXBvbmVudHMobnVsbCwgcmVzdWx0LnN0YXJ0LmRhdGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaG91ciA9IDA7XG4gICAgICAgIHZhciBtaW51dGUgPSAwO1xuICAgICAgICB2YXIgbWVyaWRpZW0gPSAtMTtcblxuICAgICAgICAvLyAtLS0tLSBTZWNvbmRcbiAgICAgICAgaWYobWF0Y2hbU0VDT05EX0dST1VQXSAhPSBudWxsKXtcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBwYXJzZUludChtYXRjaFtTRUNPTkRfR1JPVVBdKTtcbiAgICAgICAgICAgIGlmKHNlY29uZCA+PSA2MCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCdzZWNvbmQnLCBzZWNvbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaG91ciA9IHBhcnNlSW50KG1hdGNoWzJdKTtcblxuICAgICAgICAvLyAtLS0tLSBNaW51dGVcbiAgICAgICAgaWYgKG1hdGNoW01JTlVURV9HUk9VUF0hPSBudWxsKSB7XG5cbiAgICAgICAgICAgIG1pbnV0ZSA9IHBhcnNlSW50KG1hdGNoW01JTlVURV9HUk9VUF0pO1xuICAgICAgICAgICAgaWYobWludXRlID49IDYwKSByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaG91ciA+IDEwMCkge1xuXG4gICAgICAgICAgICBtaW51dGUgPSBob3VyJTEwMDtcbiAgICAgICAgICAgIGhvdXIgICA9IHBhcnNlSW50KGhvdXIvMTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1pbnV0ZSA+PSA2MCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZihob3VyID4gMjQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VyID49IDEyKSB7XG4gICAgICAgICAgICBtZXJpZGllbSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBBTSAmIFBNXG4gICAgICAgIGlmIChtYXRjaFtBTV9QTV9IT1VSX0dST1VQXSAhPSBudWxsKXtcblxuICAgICAgICAgICAgaWYgKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIGlmKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdWzBdLnRvTG93ZXJDYXNlKCkgPT0gXCJhXCIpe1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMDtcbiAgICAgICAgICAgICAgICBpZihob3VyID09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5lbmQuaXNDZXJ0YWluKCdkYXknKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnZGF5JywgcmVzdWx0LmVuZC5nZXQoJ2RheScpICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdWzBdLnRvTG93ZXJDYXNlKCkgPT0gXCJwXCIpe1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgICAgICAgICBpZihob3VyICE9IDEyKSBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ21lcmlkaWVtJykpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVyaWRpZW0gPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAwKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN0YXJ0LmdldCgnaG91cicpID09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdob3VyJywgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgIT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCByZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgKyAxMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmKGhvdXIgPj0gMTIpIHtcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC50ZXh0ID0gcmVzdWx0LnRleHQgKyBtYXRjaFswXTtcbiAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2hvdXInLCBob3VyKTtcbiAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ21pbnV0ZScsIG1pbnV0ZSk7XG4gICAgICAgIGlmIChtZXJpZGllbSA+PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignbWVyaWRpZW0nLCBtZXJpZGllbSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0LmVuZC5kYXRlKCkuZ2V0VGltZSgpIDwgcmVzdWx0LnN0YXJ0LmRhdGUoKS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQuaW1wbHkoJ2RheScsIHJlc3VsdC5lbmQuZ2V0KCdkYXknKSArIDEpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qXG5cblxuKi9cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xuXG52YXIgREFZU19PRkZTRVQgPSB7ICdkb21pbmdvJzogMCwgJ2RvbSc6IDAsICdsdW5lcyc6IDEsICdsdW4nOiAxLCAnbWFydGVzJzogMiwgJ21hcic6MiwgJ21pZXJjb2xlcyc6IDMsICdtacOpcmNvbGVzJzogMywgJ21pZSc6IDMsXG4gICAgJ2p1ZXZlcyc6IDQsICdqdWUnOiA0LCAndmllcm5lcyc6IDUsICd2aWVyJzogNSwgJ3NhYmFkbyc6IDYsICdzw6FiYWRvJzogNiwgJ3NhYic6IDYsfVxuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICcoPzooPzpcXFxcLHxcXFxcKHxcXFxc77yIKVxcXFxzKik/JyArXG4gICAgJyg/Oihlc3RlfHBhc2Fkb3xwcltvw7NdeGltbylcXFxccyopPycgK1xuICAgICcoJyArIE9iamVjdC5rZXlzKERBWVNfT0ZGU0VUKS5qb2luKCd8JykgKyAnKScgK1xuICAgICcoPzpcXFxccyooPzpcXFxcLHxcXFxcKXxcXFxc77yJKSk/JyArXG4gICAgJyg/OlxcXFxzKihlc3RlfHBhc2Fkb3xwclvDs29deGltbylcXFxccyp3ZWVrKT8nICtcbiAgICAnKD89XFxcXFd8JCknLCAnaScpO1xuXG52YXIgUFJFRklYX0dST1VQID0gMjtcbnZhciBXRUVLREFZX0dST1VQID0gMztcbnZhciBQT1NURklYX0dST1VQID0gNDtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFU1dlZWtkYXlQYXJzZXIoKSB7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtIG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGRheU9mV2VlayA9IG1hdGNoW1dFRUtEQVlfR1JPVVBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBvZmZzZXQgPSBEQVlTX09GRlNFVFtkYXlPZldlZWtdO1xuICAgICAgICBpZihvZmZzZXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgdmFyIHN0YXJ0TW9tZW50ID0gbW9tZW50KHJlZik7XG4gICAgICAgIHZhciBwcmVmaXggPSBtYXRjaFtQUkVGSVhfR1JPVVBdO1xuICAgICAgICB2YXIgcG9zdGZpeCA9IG1hdGNoW1BPU1RGSVhfR1JPVVBdO1xuXG4gICAgICAgIGlmIChwcmVmaXggfHwgcG9zdGZpeCkge1xuICAgICAgICAgICAgdmFyIG5vcm0gPSBwcmVmaXggfHwgcG9zdGZpeDtcbiAgICAgICAgICAgIG5vcm0gPSBub3JtLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKG5vcm0gPT0gJ3Bhc2FkbycpXG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuZGF5KG9mZnNldCAtIDcpXG4gICAgICAgICAgICBlbHNlIGlmKG5vcm0gPT0gJ3Byw7N4aW1vJyB8fCBub3JtID09ICdwcm94aW1vJylcbiAgICAgICAgICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0ICsgNylcbiAgICAgICAgICAgIGVsc2UgaWYobm9ybT09ICdlc3RlJylcbiAgICAgICAgICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0KTtcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgdmFyIHJlZk9mZnNldCA9IHN0YXJ0TW9tZW50LmRheSgpO1xuICAgICAgICAgICAgaWYgKCBvcHQuZm9yd2FyZERhdGVzT25seSAmJiByZWZPZmZzZXQgPiBvZmZzZXQgKSB7XG4gICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmRheShvZmZzZXQgKyA3KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW9wdC5mb3J3YXJkRGF0ZXNPbmx5ICYmIE1hdGguYWJzKG9mZnNldCAtIDcgLSByZWZPZmZzZXQpIDwgTWF0aC5hYnMob2Zmc2V0IC0gcmVmT2Zmc2V0KSkge1xuICAgICAgICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0IC0gNyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFvcHQuZm9yd2FyZERhdGVzT25seSAmJiBNYXRoLmFicyhvZmZzZXQgKyA3IC0gcmVmT2Zmc2V0KSA8IE1hdGguYWJzKG9mZnNldCAtIHJlZk9mZnNldCkpIHtcbiAgICAgICAgICAgICAgc3RhcnRNb21lbnQuZGF5KG9mZnNldCArIDcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RhcnRNb21lbnQuZGF5KG9mZnNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd3ZWVrZGF5Jywgb2Zmc2V0KTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpXG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSlcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qXG4gICAgXG4gICAgXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIFBBVFRFUk4gPSAv5LuK5pelfOW9k+aXpXzmmKjml6V85piO5pelfOS7iuWknHzku4rlpJV85LuK5pmpfOS7iuacnS9pO1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEpQQ2FzdWFsRGF0ZVBhcnNlcigpe1xuICAgIFxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBcbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cbiAgICBcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpeyBcbiAgICAgICAgXG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4O1xuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgdmFyIHN0YXJ0TW9tZW50ID0gcmVmTW9tZW50LmNsb25lKCk7XG5cbiAgICAgICAgaWYodGV4dCA9PSAn5LuK5aScJyB8fCB0ZXh0ID09ICfku4rlpJUnIHx8IHRleHQgPT0gJ+S7iuaZqScpe1xuICAgICAgICAgICAgLy8gTm9ybWFsbHkgbWVhbnMgdGhpcyBjb21pbmcgbWlkbmlnaHQgXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAyMik7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG5cbiAgICAgICAgfSBlbHNlIGlmKHRleHQgPT0gJ+aYjuaXpScpe1xuXG4gICAgICAgICAgICAvLyBDaGVjayBub3QgXCJUb21vcnJvd1wiIG9uIGxhdGUgbmlnaHRcbiAgICAgICAgICAgIGlmKHJlZk1vbWVudC5ob3VyKCkgPiA0KSB7XG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKDEsICdkYXknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYodGV4dCA9PSAn5pio5pelJykge1xuXG4gICAgICAgICAgICBzdGFydE1vbWVudC5hZGQoLTEsICdkYXknKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRleHQubWF0Y2goXCLku4rmnJ1cIikpIHtcblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgNik7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgc3RhcnRNb21lbnQubW9udGgoKSArIDEpXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpXG4gICAgICAgIHJlc3VsdC50YWdzWydKUENhc3VhbERhdGVQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG4iLCIvKlxuICAgIFxuICAgIFxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIHV0aWwgID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvSlAnKTsgXG52YXIgUEFUVEVSTiA9IC8oPzoo5ZCMfCgo5pit5ZKMfOW5s+aIkCk/KFswLTnvvJAt77yZXXsyLDR9KSkp5bm0XFxzKik/KFswLTnvvJAt77yZXXsxLDJ9KeaciFxccyooWzAtOe+8kC3vvJldezEsMn0p5pelL2k7XG4gIFxudmFyIFlFQVJfR1JPVVAgICAgICAgID0gMjtcbnZhciBFUkFfR1JPVVAgICAgICAgICA9IDM7XG52YXIgWUVBUl9OVU1CRVJfR1JPVVAgPSA0O1xudmFyIE1PTlRIX0dST1VQICAgICAgID0gNTtcbnZhciBEQVlfR1JPVVAgICAgICAgICA9IDY7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gSlBTdGFuZGFyZFBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIFxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxuICAgIFxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7IFxuXG4gICAgICAgIHZhciBzdGFydE1vbWVudCA9IG1vbWVudChyZWYpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICB0ZXh0OiBtYXRjaFswXSxcbiAgICAgICAgICAgIGluZGV4OiBtYXRjaC5pbmRleCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBtb250aCA9IG1hdGNoW01PTlRIX0dST1VQXTtcbiAgICAgICAgbW9udGggPSB1dGlsLnRvSGFua2FrdShtb250aCk7XG4gICAgICAgIG1vbnRoID0gcGFyc2VJbnQobW9udGgpO1xuXG4gICAgICAgIHZhciBkYXkgPSBtYXRjaFtEQVlfR1JPVVBdO1xuICAgICAgICBkYXkgPSB1dGlsLnRvSGFua2FrdShkYXkpO1xuICAgICAgICBkYXkgPSBwYXJzZUludChkYXkpO1xuXG4gICAgICAgIHN0YXJ0TW9tZW50LnNldCgnZGF0ZScsIGRheSk7XG4gICAgICAgIHN0YXJ0TW9tZW50LnNldCgnbW9udGgnLCBtb250aCAtIDEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIHN0YXJ0TW9tZW50Lm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICBpZiAoIW1hdGNoW1lFQVJfR1JPVVBdKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vRmluZCB0aGUgbW9zdCBhcHByb3ByaWF0ZWQgeWVhclxuICAgICAgICAgICAgc3RhcnRNb21lbnQueWVhcihtb21lbnQocmVmKS55ZWFyKCkpO1xuICAgICAgICAgICAgdmFyIG5leHRZZWFyID0gc3RhcnRNb21lbnQuY2xvbmUoKS5hZGQoMSwgJ3knKTtcbiAgICAgICAgICAgIHZhciBsYXN0WWVhciA9IHN0YXJ0TW9tZW50LmNsb25lKCkuYWRkKC0xLCAneScpO1xuICAgICAgICAgICAgaWYoIE1hdGguYWJzKG5leHRZZWFyLmRpZmYobW9tZW50KHJlZikpKSA8IE1hdGguYWJzKHN0YXJ0TW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApeyAgXG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQgPSBuZXh0WWVhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIE1hdGguYWJzKGxhc3RZZWFyLmRpZmYobW9tZW50KHJlZikpKSA8IE1hdGguYWJzKHN0YXJ0TW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApeyBcbiAgICAgICAgICAgICAgICBzdGFydE1vbWVudCA9IGxhc3RZZWFyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbWUVBUl9HUk9VUF0ubWF0Y2goJ+WQjOW5tCcpKSB7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgeWVhciA9IG1hdGNoW1lFQVJfTlVNQkVSX0dST1VQXTtcbiAgICAgICAgICAgIHllYXIgPSB1dGlsLnRvSGFua2FrdSh5ZWFyKTtcbiAgICAgICAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyKTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoW0VSQV9HUk9VUF0gPT0gJ+W5s+aIkCcpIHtcbiAgICAgICAgICAgICAgICB5ZWFyICs9IDE5ODg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW0VSQV9HUk9VUF0gPT0gJ+aYreWSjCcpIHtcbiAgICAgICAgICAgICAgICB5ZWFyICs9IDE5MjU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICByZXN1bHQudGFnc1snSlBTdGFuZGFyZFBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG59XG5cbiIsIlxuZnVuY3Rpb24gUGFyc2VyKHN0cmljdE1vZGUpIHtcblxuICAgIHRoaXMuaXNTdHJpY3RNb2RlID0gZnVuY3Rpb24oKSB7IHJldHVybiAoc3RyaWN0TW9kZSA9PSB0cnVlKSB9O1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7IHJldHVybiAvLi9pOyB9XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgdGhpcy5leGVjdXRlID0gZnVuY3Rpb24odGV4dCwgcmVmLCBvcHQpIHtcblxuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICB2YXIgcmVnZXggPSB0aGlzLnBhdHRlcm4oKTtcblxuICAgICAgICB2YXIgcmVtYWluaW5nVGV4dCA9IHRleHQ7XG4gICAgICAgIHZhciBtYXRjaCA9IHJlZ2V4LmV4ZWMocmVtYWluaW5nVGV4dCk7XG5cbiAgICAgICAgd2hpbGUgKG1hdGNoKSB7XG5cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBtYXRjaCBpbmRleCBvbiB0aGUgZnVsbCB0ZXh0O1xuICAgICAgICAgICAgbWF0Y2guaW5kZXggKz0gdGV4dC5sZW5ndGggLSByZW1haW5pbmdUZXh0Lmxlbmd0aDtcblxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuZXh0cmFjdCh0ZXh0LCByZWYsIG1hdGNoLCBvcHQpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgc3VjY2Vzcywgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSByZXN1bHRcbiAgICAgICAgICAgICAgICByZW1haW5pbmdUZXh0ID0gdGV4dC5zdWJzdHJpbmcocmVzdWx0LmluZGV4ICsgcmVzdWx0LnRleHQubGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1N0cmljdE1vZGUoKSB8fCByZXN1bHQuaGFzUG9zc2libGVEYXRlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBmYWlsLCBtb3ZlIG9uIGJ5IDFcbiAgICAgICAgICAgICAgICByZW1haW5pbmdUZXh0ID0gdGV4dC5zdWJzdHJpbmcobWF0Y2guaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWF0Y2ggPSByZWdleC5leGVjKHJlbWFpbmluZ1RleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVmaW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMucmVmaW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IHJlZmluZXIucmVmaW5lKHJlc3VsdHMsIHRleHQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG59XG5cbmV4cG9ydHMuUGFyc2VyID0gUGFyc2VyO1xuXG5leHBvcnRzLkVOSVNPRm9ybWF0UGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTklTT0Zvcm1hdFBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRU5EZWFkbGluZUZvcm1hdFBhcnNlciA9IHJlcXVpcmUoJy4vRU4vRU5EZWFkbGluZUZvcm1hdFBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRU5Nb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXIgPSByZXF1aXJlKCcuL0VOL0VOTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FTk1vbnRoTmFtZU1pZGRsZUVuZGlhblBhcnNlciA9IHJlcXVpcmUoJy4vRU4vRU5Nb250aE5hbWVNaWRkbGVFbmRpYW5QYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVOTW9udGhOYW1lUGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTk1vbnRoTmFtZVBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRU5TbGFzaERhdGVGb3JtYXRQYXJzZXIgPSByZXF1aXJlKCcuL0VOL0VOU2xhc2hEYXRlRm9ybWF0UGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FTlNsYXNoRGF0ZUZvcm1hdFN0YXJ0V2l0aFllYXJQYXJzZXIgPSByZXF1aXJlKCcuL0VOL0VOU2xhc2hEYXRlRm9ybWF0U3RhcnRXaXRoWWVhclBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRU5TbGFzaE1vbnRoRm9ybWF0UGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTlNsYXNoTW9udGhGb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVOVGltZUFnb0Zvcm1hdFBhcnNlciA9IHJlcXVpcmUoJy4vRU4vRU5UaW1lQWdvRm9ybWF0UGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FTlRpbWVFeHByZXNzaW9uUGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTlRpbWVFeHByZXNzaW9uUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FTldlZWtkYXlQYXJzZXIgPSByZXF1aXJlKCcuL0VOL0VOV2Vla2RheVBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRU5DYXN1YWxEYXRlUGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTkNhc3VhbERhdGVQYXJzZXInKS5QYXJzZXI7XG5cbmV4cG9ydHMuSlBTdGFuZGFyZFBhcnNlciA9IHJlcXVpcmUoJy4vSlAvSlBTdGFuZGFyZFBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuSlBDYXN1YWxEYXRlUGFyc2VyID0gcmVxdWlyZSgnLi9KUC9KUENhc3VhbERhdGVQYXJzZXInKS5QYXJzZXI7XG5cblxuZXhwb3J0cy5FU0Nhc3VhbERhdGVQYXJzZXIgPSByZXF1aXJlKCcuL0VTL0VTQ2FzdWFsRGF0ZVBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRVNEZWFkbGluZUZvcm1hdFBhcnNlciA9IHJlcXVpcmUoJy4vRVMvRVNEZWFkbGluZUZvcm1hdFBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRVNUaW1lQWdvRm9ybWF0UGFyc2VyID0gcmVxdWlyZSgnLi9FUy9FU1RpbWVBZ29Gb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVTVGltZUV4cHJlc3Npb25QYXJzZXIgPSByZXF1aXJlKCcuL0VTL0VTVGltZUV4cHJlc3Npb25QYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVTV2Vla2RheVBhcnNlciA9IHJlcXVpcmUoJy4vRVMvRVNXZWVrZGF5UGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FU01vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlciA9IHJlcXVpcmUoJy4vRVMvRVNNb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVTU2xhc2hEYXRlRm9ybWF0UGFyc2VyID0gcmVxdWlyZSgnLi9FUy9FU1NsYXNoRGF0ZUZvcm1hdFBhcnNlcicpLlBhcnNlcjtcbiIsIi8qXG4gIFxuKi9cbnZhciBSZWZpbmVyID0gcmVxdWlyZSgnLi4vcmVmaW5lcicpLlJlZmluZXI7XG5cbmV4cG9ydHMuUmVmaW5lciA9IGZ1bmN0aW9uIEVOTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyKCkge1xuICAgIFJlZmluZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIC9eXFxzKih0b3xcXC0pXFxzKiQvaSB9O1xuXG4gICAgdGhpcy5yZWZpbmUgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHRzLCBvcHQpIHtcblxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPCAyKSByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgXG4gICAgICAgIHZhciBtZXJnZWRSZXN1bHQgPSBbXTtcbiAgICAgICAgdmFyIGN1cnJSZXN1bHQgPSBudWxsO1xuICAgICAgICB2YXIgcHJldlJlc3VsdCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBpPTE7IGk8cmVzdWx0cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGN1cnJSZXN1bHQgPSByZXN1bHRzW2ldO1xuICAgICAgICAgICAgcHJldlJlc3VsdCA9IHJlc3VsdHNbaS0xXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFwcmV2UmVzdWx0LmVuZCAmJiAhY3VyclJlc3VsdC5lbmQgXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5pc0FibGVUb01lcmdlKHRleHQsIHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpKSB7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHByZXZSZXN1bHQgPSB0aGlzLm1lcmdlUmVzdWx0KHRleHQsIHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpO1xuICAgICAgICAgICAgICAgIGN1cnJSZXN1bHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbWVyZ2VkUmVzdWx0LnB1c2gocHJldlJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChjdXJyUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1lcmdlZFJlc3VsdC5wdXNoKGN1cnJSZXN1bHQpO1xuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gbWVyZ2VkUmVzdWx0O1xuICAgIH07XG5cbiAgICB0aGlzLmlzQWJsZVRvTWVyZ2UgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHQxLCByZXN1bHQyKSB7XG4gICAgICAgIHZhciBiZWdpbiA9IHJlc3VsdDEuaW5kZXggKyByZXN1bHQxLnRleHQubGVuZ3RoO1xuICAgICAgICB2YXIgZW5kICAgPSByZXN1bHQyLmluZGV4O1xuICAgICAgICB2YXIgdGV4dEJldHdlZW4gPSB0ZXh0LnN1YnN0cmluZyhiZWdpbixlbmQpO1xuXG4gICAgICAgIHJldHVybiB0ZXh0QmV0d2Vlbi5tYXRjaCh0aGlzLnBhdHRlcm4oKSk7XG4gICAgfTtcblxuICAgIHRoaXMuaXNXZWVrZGF5UmVzdWx0ID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignd2Vla2RheScpICYmICFyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdkYXknKTtcbiAgICB9O1xuXG4gICAgdGhpcy5tZXJnZVJlc3VsdCA9IGZ1bmN0aW9uKHRleHQsIGZyb21SZXN1bHQsIHRvUmVzdWx0KSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzV2Vla2RheVJlc3VsdChmcm9tUmVzdWx0KSAmJiAhdGhpcy5pc1dlZWtkYXlSZXN1bHQodG9SZXN1bHQpKSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0b1Jlc3VsdC5zdGFydC5rbm93blZhbHVlcykge1xuICAgICAgICAgICAgICAgIGlmICghZnJvbVJlc3VsdC5zdGFydC5pc0NlcnRhaW4oa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tUmVzdWx0LnN0YXJ0LmFzc2lnbihrZXksIHRvUmVzdWx0LnN0YXJ0LmdldChrZXkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBmcm9tUmVzdWx0LnN0YXJ0Lmtub3duVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0b1Jlc3VsdC5zdGFydC5pc0NlcnRhaW4oa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0b1Jlc3VsdC5zdGFydC5hc3NpZ24oa2V5LCBmcm9tUmVzdWx0LnN0YXJ0LmdldChrZXkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJvbVJlc3VsdC5zdGFydC5kYXRlKCkuZ2V0VGltZSgpID4gdG9SZXN1bHQuc3RhcnQuZGF0ZSgpKSB7XG4gICAgICAgICAgICB2YXIgdG1wID0gdG9SZXN1bHQ7XG4gICAgICAgICAgICB0b1Jlc3VsdCA9IGZyb21SZXN1bHQ7XG4gICAgICAgICAgICBmcm9tUmVzdWx0ID0gdG1wO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmcm9tUmVzdWx0LmVuZCA9IHRvUmVzdWx0LnN0YXJ0O1xuXG4gICAgICAgIFxuXG4gICAgICAgIGZvciAodmFyIHRhZyBpbiB0b1Jlc3VsdC50YWdzKSB7XG4gICAgICAgICAgICBmcm9tUmVzdWx0LnRhZ3NbdGFnXSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAgICAgXG4gICAgICAgIHZhciBzdGFydEluZGV4ID0gTWF0aC5taW4oZnJvbVJlc3VsdC5pbmRleCwgdG9SZXN1bHQuaW5kZXgpO1xuICAgICAgICB2YXIgZW5kSW5kZXggPSBNYXRoLm1heChcbiAgICAgICAgICAgIGZyb21SZXN1bHQuaW5kZXggKyBmcm9tUmVzdWx0LnRleHQubGVuZ3RoLCBcbiAgICAgICAgICAgIHRvUmVzdWx0LmluZGV4ICsgdG9SZXN1bHQudGV4dC5sZW5ndGgpO1xuICAgICAgICAgICAgXG4gICAgICAgIGZyb21SZXN1bHQuaW5kZXggPSBzdGFydEluZGV4O1xuICAgICAgICBmcm9tUmVzdWx0LnRleHQgID0gdGV4dC5zdWJzdHJpbmcoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICAgICAgICBmcm9tUmVzdWx0LnRhZ3NbdGhpcy5jb25zdHJ1Y3Rvci5uYW1lXSA9IHRydWU7XG4gICAgICAgIHJldHVybiBmcm9tUmVzdWx0O1xuICAgIH1cbn07XG5cbiIsIi8qXG4gICAgXG4qL1xudmFyIFBhcnNlZENvbXBvbmVudHMgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRDb21wb25lbnRzO1xudmFyIFJlZmluZXIgPSByZXF1aXJlKCcuLi9yZWZpbmVyJykuUmVmaW5lcjtcblxuXG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cChcIl5cXFxccyooVHxhdHxvbnxvZnwsfC0pP1xcXFxzKiRcIik7XG5cbmZ1bmN0aW9uIGlzRGF0ZU9ubHkocmVzdWx0KSB7XG4gICAgcmV0dXJuICFyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdob3VyJyk7XG59XG4gICAgXG5mdW5jdGlvbiBpc1RpbWVPbmx5KHJlc3VsdCkge1xuICAgIHJldHVybiAhcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignbW9udGgnKSAmJiAhcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignd2Vla2RheScpO1xufVxuXG5cbmZ1bmN0aW9uIGlzQWJsZVRvTWVyZ2UodGV4dCwgcHJldlJlc3VsdCwgY3VyUmVzdWx0KSB7XG4gICAgdmFyIHRleHRCZXR3ZWVuID0gdGV4dC5zdWJzdHJpbmcocHJldlJlc3VsdC5pbmRleCArIHByZXZSZXN1bHQudGV4dC5sZW5ndGgsIGN1clJlc3VsdC5pbmRleCk7XG4gICAgcmV0dXJuIHRleHRCZXR3ZWVuLm1hdGNoKFBBVFRFUk4pO1xufVxuXG5mdW5jdGlvbiBtZXJnZVJlc3VsdCh0ZXh0LCBkYXRlUmVzdWx0LCB0aW1lUmVzdWx0KXtcblxuICAgIHZhciBiZWdpbkRhdGUgPSBkYXRlUmVzdWx0LnN0YXJ0O1xuICAgIHZhciBiZWdpblRpbWUgPSB0aW1lUmVzdWx0LnN0YXJ0O1xuICAgICAgICBcbiAgICB2YXIgYmVnaW5EYXRlVGltZSA9IGJlZ2luRGF0ZS5jbG9uZSgpO1xuICAgIGJlZ2luRGF0ZVRpbWUuYXNzaWduKCdob3VyJywgYmVnaW5UaW1lLmdldCgnaG91cicpKTtcbiAgICBiZWdpbkRhdGVUaW1lLmFzc2lnbignbWludXRlJywgYmVnaW5UaW1lLmdldCgnbWludXRlJykpO1xuICAgIGJlZ2luRGF0ZVRpbWUuYXNzaWduKCdzZWNvbmQnLCBiZWdpblRpbWUuZ2V0KCdzZWNvbmQnKSk7XG4gICAgICAgIFxuICAgIGlmIChiZWdpblRpbWUuaXNDZXJ0YWluKCdtZXJpZGllbScpKSB7XG4gICAgICAgIGJlZ2luRGF0ZVRpbWUuYXNzaWduKCdtZXJpZGllbScsIGJlZ2luVGltZS5nZXQoJ21lcmlkaWVtJykpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGJlZ2luVGltZS5nZXQoJ21lcmlkaWVtJykgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBiZWdpbkRhdGVUaW1lLmdldCgnbWVyaWRpZW0nKSA9PT0gdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICAgIGJlZ2luRGF0ZVRpbWUuaW1wbHkoJ21lcmlkaWVtJywgYmVnaW5UaW1lLmdldCgnbWVyaWRpZW0nKSk7XG4gICAgfVxuXG4gICAgaWYgKGJlZ2luRGF0ZVRpbWUuZ2V0KCdtZXJpZGllbScpID09IDEgJiYgYmVnaW5EYXRlVGltZS5nZXQoJ2hvdXInKSA8IDEyKSB7XG4gICAgICAgIGJlZ2luRGF0ZVRpbWUuYXNzaWduKCdob3VyJywgYmVnaW5EYXRlVGltZS5nZXQoJ2hvdXInKSArIDEyKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0ZVJlc3VsdC5lbmQgIT0gbnVsbCB8fCB0aW1lUmVzdWx0LmVuZCAhPSBudWxsKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZW5kRGF0ZSAgID0gZGF0ZVJlc3VsdC5lbmQgPT0gbnVsbCA/IGRhdGVSZXN1bHQuc3RhcnQgOiBkYXRlUmVzdWx0LmVuZDsgICAgICAgICAgICBcbiAgICAgICAgdmFyIGVuZFRpbWUgICA9IHRpbWVSZXN1bHQuZW5kID09IG51bGwgPyB0aW1lUmVzdWx0LnN0YXJ0IDogdGltZVJlc3VsdC5lbmQ7XG5cbiAgICAgICAgdmFyIGVuZERhdGVUaW1lID0gZW5kRGF0ZS5jbG9uZSgpO1xuICAgICAgICBlbmREYXRlVGltZS5hc3NpZ24oJ2hvdXInLCBlbmRUaW1lLmdldCgnaG91cicpKTtcbiAgICAgICAgZW5kRGF0ZVRpbWUuYXNzaWduKCdtaW51dGUnLCBlbmRUaW1lLmdldCgnbWludXRlJykpO1xuICAgICAgICBlbmREYXRlVGltZS5hc3NpZ24oJ3NlY29uZCcsIGVuZFRpbWUuZ2V0KCdzZWNvbmQnKSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZW5kVGltZS5pc0NlcnRhaW4oJ21lcmlkaWVtJykpIHtcbiAgICAgICAgICAgIGVuZERhdGVUaW1lLmFzc2lnbignbWVyaWRpZW0nLCBlbmRUaW1lLmdldCgnbWVyaWRpZW0nKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoYmVnaW5UaW1lLmdldCgnbWVyaWRpZW0nKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBlbmREYXRlVGltZS5pbXBseSgnbWVyaWRpZW0nLCBlbmRUaW1lLmdldCgnbWVyaWRpZW0nKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChkYXRlUmVzdWx0LmVuZCA9PSBudWxsICYmIGVuZERhdGVUaW1lLmRhdGUoKS5nZXRUaW1lKCkgPCBiZWdpbkRhdGVUaW1lLmRhdGUoKS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIC8vIEV4LiA5cG0gLSAxYW1cbiAgICAgICAgICAgIGlmIChlbmREYXRlVGltZS5pc0NlcnRhaW4oJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgZW5kRGF0ZVRpbWUuYXNzaWduKCdkYXknLCBlbmREYXRlVGltZS5nZXQoJ2RheScpICsgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVuZERhdGVUaW1lLmltcGx5KCdkYXknLCBlbmREYXRlVGltZS5nZXQoJ2RheScpICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkYXRlUmVzdWx0LmVuZCA9IGVuZERhdGVUaW1lO1xuICAgIH1cblxuICAgIGRhdGVSZXN1bHQuc3RhcnQgPSBiZWdpbkRhdGVUaW1lOyAgICBcblxuICAgIHZhciBzdGFydEluZGV4ID0gTWF0aC5taW4oZGF0ZVJlc3VsdC5pbmRleCwgdGltZVJlc3VsdC5pbmRleCk7XG4gICAgdmFyIGVuZEluZGV4ID0gTWF0aC5tYXgoXG4gICAgICAgICAgICBkYXRlUmVzdWx0LmluZGV4ICsgZGF0ZVJlc3VsdC50ZXh0Lmxlbmd0aCwgXG4gICAgICAgICAgICB0aW1lUmVzdWx0LmluZGV4ICsgdGltZVJlc3VsdC50ZXh0Lmxlbmd0aCk7XG4gICAgXG4gICAgZGF0ZVJlc3VsdC5pbmRleCA9IHN0YXJ0SW5kZXg7XG4gICAgZGF0ZVJlc3VsdC50ZXh0ICA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcblxuICAgIGZvciAodmFyIHRhZyBpbiB0aW1lUmVzdWx0LnRhZ3MpIHtcbiAgICAgICAgZGF0ZVJlc3VsdC50YWdzW3RhZ10gPSB0cnVlO1xuICAgIH1cbiAgICBkYXRlUmVzdWx0LnRhZ3NbJ0VOTWVyZ2VEYXRlQW5kVGltZVJlZmluZXInXSA9IHRydWU7XG4gICAgcmV0dXJuIGRhdGVSZXN1bHQ7XG59XG5cbmV4cG9ydHMuUmVmaW5lciA9IGZ1bmN0aW9uIEVOTWVyZ2VEYXRlVGltZVJlZmluZXIoKSB7XG4gICAgUmVmaW5lci5jYWxsKHRoaXMpO1xuXG5cbiAgICB0aGlzLnJlZmluZSA9IGZ1bmN0aW9uKHRleHQsIHJlc3VsdHMsIG9wdCkgeyBcblxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPCAyKSByZXR1cm4gcmVzdWx0cztcblxuICAgICAgICB2YXIgbWVyZ2VkUmVzdWx0ID0gW107XG4gICAgICAgIHZhciBjdXJyUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgdmFyIHByZXZSZXN1bHQgPSBudWxsO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBjdXJyUmVzdWx0ID0gcmVzdWx0c1tpXTtcbiAgICAgICAgICAgIHByZXZSZXN1bHQgPSByZXN1bHRzW2ktMV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpc0RhdGVPbmx5KHByZXZSZXN1bHQpICYmIGlzVGltZU9ubHkoY3VyclJlc3VsdCkgXG4gICAgICAgICAgICAgICAgICAgICYmIGlzQWJsZVRvTWVyZ2UodGV4dCwgcHJldlJlc3VsdCwgY3VyclJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwcmV2UmVzdWx0ID0gbWVyZ2VSZXN1bHQodGV4dCwgcHJldlJlc3VsdCwgY3VyclJlc3VsdCk7XG4gICAgICAgICAgICAgICAgY3VyclJlc3VsdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0RhdGVPbmx5KGN1cnJSZXN1bHQpICYmIGlzVGltZU9ubHkocHJldlJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgJiYgaXNBYmxlVG9NZXJnZSh0ZXh0LCBwcmV2UmVzdWx0LCBjdXJyUmVzdWx0KSkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHByZXZSZXN1bHQgPSBtZXJnZVJlc3VsdCh0ZXh0LCBjdXJyUmVzdWx0LCBwcmV2UmVzdWx0KTtcbiAgICAgICAgICAgICAgICBjdXJyUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG1lcmdlZFJlc3VsdC5wdXNoKHByZXZSZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgbWVyZ2VkUmVzdWx0LnB1c2goY3VyclJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVyZ2VkUmVzdWx0O1xuICAgIH1cbn0iLCIvKlxuICBcbiovXG52YXIgUmVmaW5lciA9IHJlcXVpcmUoJy4vcmVmaW5lcicpLlJlZmluZXI7XG5cbi8vIE1hcCBBQkJSIC0+IE9mZnNldCBpbiBtaW51dGVcbnZhciBUSU1FWk9ORV9BQkJSX01BUCA9IHt9O1xudmFyIFRJTUVaT05FX05BTUVfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqXFxcXCg/KFtBLVpdezIsNH0pXFxcXCk/KD89XFxcXFd8JClcIiwgJ2knKTtcblxuZXhwb3J0cy5SZWZpbmVyID0gZnVuY3Rpb24gRXh0cmFjdFRpbWV6b25lQWJiclJlZmluZXIoKSB7XG5cdFJlZmluZXIuY2FsbCh0aGlzKTtcblxuXHR0aGlzLnJlZmluZSA9IGZ1bmN0aW9uKHRleHQsIHJlc3VsdHMsIG9wdCkge1xuXG5cdFx0cmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKHJlc3VsdCkge1xuXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC50YWdzWydFTlRpbWVFeHByZXNzaW9uUGFyc2VyJ10pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtYXRjaCA9IFRJTUVaT05FX05BTUVfUEFUVEVSTi5leGVjKHRleHQuc3Vic3RyaW5nKHJlc3VsdC5pbmRleCArIHJlc3VsdC50ZXh0Lmxlbmd0aCkpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWV6b25lQWJiciA9IG1hdGNoWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKFRJTUVaT05FX0FCQlJfTUFQW3RpbWV6b25lQWJicl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gVElNRVpPTkVfQUJCUl9NQVBbdGltZXpvbmVBYmJyXTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3RpbWV6b25lT2Zmc2V0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigndGltZXpvbmVPZmZzZXQnLCB0aW1lem9uZU9mZnNldCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5lbmQgIT0gbnVsbCAmJiAhcmVzdWx0LmVuZC5pc0NlcnRhaW4oJ3RpbWV6b25lT2Zmc2V0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ3RpbWV6b25lT2Zmc2V0JywgdGltZXpvbmVPZmZzZXQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdC50ZXh0ICs9IG1hdGNoWzBdO1xuICAgICAgICAgICAgICAgIHJlc3VsdC50YWdzWydFeHRyYWN0VGltZXpvbmVBYmJyUmVmaW5lciddID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblx0XHR9KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcblx0fVxufVxuXG4vLyBUT0RPOiBNb3ZlIHRoaXMgdG8gc29tZSBjb25maWd1cmF0aW9uXG5USU1FWk9ORV9BQkJSX01BUCA9IHtcIkFDRFRcIjo2MzAsXCJBQ1NUXCI6NTcwLFwiQURUXCI6LTE4MCxcIkFFRFRcIjo2NjAsXCJBRVNUXCI6NjAwLFwiQUZUXCI6MjcwLFwiQUtEVFwiOi00ODAsXCJBS1NUXCI6LTU0MCxcIkFMTVRcIjozNjAsXCJBTVNUXCI6LTE4MCxcIkFNVFwiOi0yNDAsXCJBTkFTVFwiOjcyMCxcIkFOQVRcIjo3MjAsXCJBUVRUXCI6MzAwLFwiQVJUXCI6LTE4MCxcIkFTVFwiOi0yNDAsXCJBV0RUXCI6NTQwLFwiQVdTVFwiOjQ4MCxcIkFaT1NUXCI6MCxcIkFaT1RcIjotNjAsXCJBWlNUXCI6MzAwLFwiQVpUXCI6MjQwLFwiQk5UXCI6NDgwLFwiQk9UXCI6LTI0MCxcIkJSU1RcIjotMTIwLFwiQlJUXCI6LTE4MCxcIkJTVFwiOjYwLFwiQlRUXCI6MzYwLFwiQ0FTVFwiOjQ4MCxcIkNBVFwiOjEyMCxcIkNDVFwiOjM5MCxcIkNEVFwiOi0zMDAsXCJDRVNUXCI6MTIwLFwiQ0VUXCI6NjAsXCJDSEFEVFwiOjgyNSxcIkNIQVNUXCI6NzY1LFwiQ0tUXCI6LTYwMCxcIkNMU1RcIjotMTgwLFwiQ0xUXCI6LTI0MCxcIkNPVFwiOi0zMDAsXCJDU1RcIjotMzYwLFwiQ1ZUXCI6LTYwLFwiQ1hUXCI6NDIwLFwiQ2hTVFwiOjYwMCxcIkRBVlRcIjo0MjAsXCJFQVNTVFwiOi0zMDAsXCJFQVNUXCI6LTM2MCxcIkVBVFwiOjE4MCxcIkVDVFwiOi0zMDAsXCJFRFRcIjotMjQwLFwiRUVTVFwiOjE4MCxcIkVFVFwiOjEyMCxcIkVHU1RcIjowLFwiRUdUXCI6LTYwLFwiRVNUXCI6LTMwMCxcIkVUXCI6LTMwMCxcIkZKU1RcIjo3ODAsXCJGSlRcIjo3MjAsXCJGS1NUXCI6LTE4MCxcIkZLVFwiOi0yNDAsXCJGTlRcIjotMTIwLFwiR0FMVFwiOi0zNjAsXCJHQU1UXCI6LTU0MCxcIkdFVFwiOjI0MCxcIkdGVFwiOi0xODAsXCJHSUxUXCI6NzIwLFwiR01UXCI6MCxcIkdTVFwiOjI0MCxcIkdZVFwiOi0yNDAsXCJIQUFcIjotMTgwLFwiSEFDXCI6LTMwMCxcIkhBRFRcIjotNTQwLFwiSEFFXCI6LTI0MCxcIkhBUFwiOi00MjAsXCJIQVJcIjotMzYwLFwiSEFTVFwiOi02MDAsXCJIQVRcIjotOTAsXCJIQVlcIjotNDgwLFwiSEtUXCI6NDgwLFwiSExWXCI6LTIxMCxcIkhOQVwiOi0yNDAsXCJITkNcIjotMzYwLFwiSE5FXCI6LTMwMCxcIkhOUFwiOi00ODAsXCJITlJcIjotNDIwLFwiSE5UXCI6LTE1MCxcIkhOWVwiOi01NDAsXCJIT1ZUXCI6NDIwLFwiSUNUXCI6NDIwLFwiSURUXCI6MTgwLFwiSU9UXCI6MzYwLFwiSVJEVFwiOjI3MCxcIklSS1NUXCI6NTQwLFwiSVJLVFwiOjU0MCxcIklSU1RcIjoyMTAsXCJJU1RcIjo2MCxcIkpTVFwiOjU0MCxcIktHVFwiOjM2MCxcIktSQVNUXCI6NDgwLFwiS1JBVFwiOjQ4MCxcIktTVFwiOjU0MCxcIktVWVRcIjoyNDAsXCJMSERUXCI6NjYwLFwiTEhTVFwiOjYzMCxcIkxJTlRcIjo4NDAsXCJNQUdTVFwiOjcyMCxcIk1BR1RcIjo3MjAsXCJNQVJUXCI6LTUxMCxcIk1BV1RcIjozMDAsXCJNRFRcIjotMzYwLFwiTUVTWlwiOjEyMCxcIk1FWlwiOjYwLFwiTUhUXCI6NzIwLFwiTU1UXCI6MzkwLFwiTVNEXCI6MjQwLFwiTVNLXCI6MjQwLFwiTVNUXCI6LTQyMCxcIk1VVFwiOjI0MCxcIk1WVFwiOjMwMCxcIk1ZVFwiOjQ4MCxcIk5DVFwiOjY2MCxcIk5EVFwiOi05MCxcIk5GVFwiOjY5MCxcIk5PVlNUXCI6NDIwLFwiTk9WVFwiOjM2MCxcIk5QVFwiOjM0NSxcIk5TVFwiOi0xNTAsXCJOVVRcIjotNjYwLFwiTlpEVFwiOjc4MCxcIk5aU1RcIjo3MjAsXCJPTVNTVFwiOjQyMCxcIk9NU1RcIjo0MjAsXCJQRFRcIjotNDIwLFwiUEVUXCI6LTMwMCxcIlBFVFNUXCI6NzIwLFwiUEVUVFwiOjcyMCxcIlBHVFwiOjYwMCxcIlBIT1RcIjo3ODAsXCJQSFRcIjo0ODAsXCJQS1RcIjozMDAsXCJQTURUXCI6LTEyMCxcIlBNU1RcIjotMTgwLFwiUE9OVFwiOjY2MCxcIlBTVFwiOi00ODAsXCJQVFwiOi00ODAsXCJQV1RcIjo1NDAsXCJQWVNUXCI6LTE4MCxcIlBZVFwiOi0yNDAsXCJSRVRcIjoyNDAsXCJTQU1UXCI6MjQwLFwiU0FTVFwiOjEyMCxcIlNCVFwiOjY2MCxcIlNDVFwiOjI0MCxcIlNHVFwiOjQ4MCxcIlNSVFwiOi0xODAsXCJTU1RcIjotNjYwLFwiVEFIVFwiOi02MDAsXCJURlRcIjozMDAsXCJUSlRcIjozMDAsXCJUS1RcIjo3ODAsXCJUTFRcIjo1NDAsXCJUTVRcIjozMDAsXCJUVlRcIjo3MjAsXCJVTEFUXCI6NDgwLFwiVVRDXCI6MCxcIlVZU1RcIjotMTIwLFwiVVlUXCI6LTE4MCxcIlVaVFwiOjMwMCxcIlZFVFwiOi0yMTAsXCJWTEFTVFwiOjY2MCxcIlZMQVRcIjo2NjAsXCJWVVRcIjo2NjAsXCJXQVNUXCI6MTIwLFwiV0FUXCI6NjAsXCJXRVNUXCI6NjAsXCJXRVNaXCI6NjAsXCJXRVRcIjowLFwiV0VaXCI6MCxcIldGVFwiOjcyMCxcIldHU1RcIjotMTIwLFwiV0dUXCI6LTE4MCxcIldJQlwiOjQyMCxcIldJVFwiOjU0MCxcIldJVEFcIjo0ODAsXCJXU1RcIjo3ODAsXCJXVFwiOjAsXCJZQUtTVFwiOjYwMCxcIllBS1RcIjo2MDAsXCJZQVBUXCI6NjAwLFwiWUVLU1RcIjozNjAsXCJZRUtUXCI6MzYwfSIsIi8qXG4gIFxuKi9cbnZhciBSZWZpbmVyID0gcmVxdWlyZSgnLi9yZWZpbmVyJykuUmVmaW5lcjtcblxuXG52YXIgVElNRVpPTkVfT0ZGU0VUX1BBVFRFUk4gPSBuZXcgUmVnRXhwKFwiXlxcXFxzKihHTVR8VVRDKT8oXFxcXCt8XFxcXC0pKFxcXFxkezEsMn0pOj8oXFxcXGR7Mn0pXCIsICdpJyk7XG52YXIgVElNRVpPTkVfT0ZGU0VUX1NJR05fR1JPVVAgPSAyO1xudmFyIFRJTUVaT05FX09GRlNFVF9IT1VSX09GRlNFVF9HUk9VUCA9IDM7XG52YXIgVElNRVpPTkVfT0ZGU0VUX01JTlVURV9PRkZTRVRfR1JPVVAgPSA0O1xuXG5leHBvcnRzLlJlZmluZXIgPSBmdW5jdGlvbiBFeHRyYWN0VGltZXpvbmVPZmZzZXRSZWZpbmVyKCkge1xuICAgIFJlZmluZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMucmVmaW5lID0gZnVuY3Rpb24odGV4dCwgcmVzdWx0cywgb3B0KSB7XG5cbiAgICAgICAgcmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKHJlc3VsdCkge1xuXG4gICAgICAgICAgICBpZiAocmVzdWx0LnN0YXJ0LmlzQ2VydGFpbigndGltZXpvbmVPZmZzZXQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1hdGNoID0gVElNRVpPTkVfT0ZGU0VUX1BBVFRFUk4uZXhlYyh0ZXh0LnN1YnN0cmluZyhyZXN1bHQuaW5kZXggKyByZXN1bHQudGV4dC5sZW5ndGgpKTtcbiAgICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBob3VyT2Zmc2V0ID0gcGFyc2VJbnQobWF0Y2hbVElNRVpPTkVfT0ZGU0VUX0hPVVJfT0ZGU0VUX0dST1VQXSk7XG4gICAgICAgICAgICB2YXIgbWludXRlT2Zmc2V0ID0gcGFyc2VJbnQobWF0Y2hbVElNRVpPTkVfT0ZGU0VUX01JTlVURV9PRkZTRVRfR1JPVVBdKTtcbiAgICAgICAgICAgIHZhciB0aW1lem9uZU9mZnNldCA9IGhvdXJPZmZzZXQgKiA2MCArIG1pbnV0ZU9mZnNldDtcbiAgICAgICAgICAgIGlmIChtYXRjaFtUSU1FWk9ORV9PRkZTRVRfU0lHTl9HUk9VUF0gPT09ICctJykge1xuICAgICAgICAgICAgICAgIHRpbWV6b25lT2Zmc2V0ID0gLXRpbWV6b25lT2Zmc2V0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVzdWx0LmVuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ3RpbWV6b25lT2Zmc2V0JywgdGltZXpvbmVPZmZzZXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd0aW1lem9uZU9mZnNldCcsIHRpbWV6b25lT2Zmc2V0KTtcbiAgICAgICAgICAgIHJlc3VsdC50ZXh0ICs9IG1hdGNoWzBdO1xuICAgICAgICAgICAgcmVzdWx0LnRhZ3NbJ0V4dHJhY3RUaW1lem9uZU9mZnNldFJlZmluZXInXSA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbn1cbiIsIi8qXG4gIFxuKi9cbnZhciBFTk1lcmdlRGF0ZVJhbmdlUmVmaW5lciA9IHJlcXVpcmUoJy4uL0VOL0VOTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyJykuUmVmaW5lcjtcblxuZXhwb3J0cy5SZWZpbmVyID0gZnVuY3Rpb24gSlBNZXJnZURhdGVSYW5nZVJlZmluZXIoKSB7XG4gICAgRU5NZXJnZURhdGVSYW5nZVJlZmluZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIC9eXFxzKijjgYvjgol844O8KVxccyokL2kgfTtcbn1cblxuIiwiLypcbiAgXG4qL1xudmFyIFJlZmluZXIgPSByZXF1aXJlKCcuL3JlZmluZXInKS5SZWZpbmVyO1xuXG5leHBvcnRzLlJlZmluZXIgPSBmdW5jdGlvbiBPdmVybGFwUmVtb3ZhbFJlZmluZXIoKSB7XG5cdFJlZmluZXIuY2FsbCh0aGlzKTtcblx0XG5cblx0dGhpcy5yZWZpbmUgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHRzLCBvcHQpIHsgXG5cbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoIDwgMikgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIFxuICAgICAgICB2YXIgZmlsdGVyZWRSZXN1bHRzID0gW107XG4gICAgICAgIHZhciBwcmV2UmVzdWx0ID0gcmVzdWx0c1swXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGk9MTsgaTxyZXN1bHRzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc3VsdHNbaV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIElmIG92ZXJsYXAsIGNvbXBhcmUgdGhlIGxlbmd0aCBhbmQgZGlzY2FyZCB0aGUgc2hvcnRlciBvbmVcbiAgICAgICAgICAgIGlmIChyZXN1bHQuaW5kZXggPCBwcmV2UmVzdWx0LmluZGV4ICsgcHJldlJlc3VsdC50ZXh0Lmxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC50ZXh0Lmxlbmd0aCA+IHByZXZSZXN1bHQudGV4dC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBwcmV2UmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyZWRSZXN1bHRzLnB1c2gocHJldlJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcHJldlJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gVGhlIGxhc3Qgb25lXG4gICAgICAgIGlmIChwcmV2UmVzdWx0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZpbHRlcmVkUmVzdWx0cy5wdXNoKHByZXZSZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkUmVzdWx0cztcbiAgICB9XG59IiwiLypcbiAgXG4qL1xudmFyIEZpbHRlciA9IHJlcXVpcmUoJy4vcmVmaW5lcicpLkZpbHRlcjtcblxuZXhwb3J0cy5SZWZpbmVyID0gZnVuY3Rpb24gVW5saWtlbHlGb3JtYXRGaWx0ZXIoKSB7XG4gICAgRmlsdGVyLmNhbGwodGhpcyk7XG4gICAgXG5cbiAgICB0aGlzLmlzVmFsaWQgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHQsIG9wdCkgeyBcblxuICAgICAgICBpZiAocmVzdWx0LnRleHQucmVwbGFjZSgnICcsJycpLm1hdGNoKC9eXFxkKihcXC5cXGQqKT8kLykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlOyBcbiAgICB9XG59IiwiXG5leHBvcnRzLlJlZmluZXIgPSBmdW5jdGlvbiBSZWZpbmVyKCkgeyBcblxuICAgIHRoaXMucmVmaW5lID0gZnVuY3Rpb24odGV4dCwgcmVzdWx0cywgb3B0KSB7IHJldHVybiByZXN1bHRzOyB9O1xufVxuXG5leHBvcnRzLkZpbHRlciA9IGZ1bmN0aW9uIEZpbHRlcigpIHsgXG4gICAgXG4gICAgZXhwb3J0cy5SZWZpbmVyLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLmlzVmFsaWQgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHQsIG9wdCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIHRoaXMucmVmaW5lID0gZnVuY3Rpb24odGV4dCwgcmVzdWx0cywgb3B0KSB7IFxuXG4gICAgICAgIHZhciBmaWx0ZXJlZFJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSByZXN1bHRzW2ldO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCh0ZXh0LCByZXN1bHQsIG9wdCkpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZFJlc3VsdC5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlsdGVyZWRSZXN1bHQ7XG4gICAgfVxufVxuXG5cbi8vIENvbW1vbiByZWZpbmVyc1xuZXhwb3J0cy5PdmVybGFwUmVtb3ZhbFJlZmluZXIgPSByZXF1aXJlKCcuL092ZXJsYXBSZW1vdmFsUmVmaW5lcicpLlJlZmluZXI7XG5leHBvcnRzLkV4dHJhY3RUaW1lem9uZU9mZnNldFJlZmluZXIgPSByZXF1aXJlKCcuL0V4dHJhY3RUaW1lem9uZU9mZnNldFJlZmluZXInKS5SZWZpbmVyO1xuZXhwb3J0cy5FeHRyYWN0VGltZXpvbmVBYmJyUmVmaW5lciA9IHJlcXVpcmUoJy4vRXh0cmFjdFRpbWV6b25lQWJiclJlZmluZXInKS5SZWZpbmVyO1xuZXhwb3J0cy5Vbmxpa2VseUZvcm1hdEZpbHRlciA9IHJlcXVpcmUoJy4vVW5saWtlbHlGb3JtYXRGaWx0ZXInKS5SZWZpbmVyO1xuXG4vLyBFTiByZWZpbmVyc1xuZXhwb3J0cy5FTk1lcmdlRGF0ZVRpbWVSZWZpbmVyID0gcmVxdWlyZSgnLi9FTi9FTk1lcmdlRGF0ZVRpbWVSZWZpbmVyJykuUmVmaW5lcjtcbmV4cG9ydHMuRU5NZXJnZURhdGVSYW5nZVJlZmluZXIgPSByZXF1aXJlKCcuL0VOL0VOTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyJykuUmVmaW5lcjtcblxuLy8gSlAgcmVmaW5lcnNcbmV4cG9ydHMuSlBNZXJnZURhdGVSYW5nZVJlZmluZXIgPSByZXF1aXJlKCcuL0pQL0pQTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyJykuUmVmaW5lcjtcblxuIiwidmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuXG5mdW5jdGlvbiBQYXJzZWRSZXN1bHQocmVzdWx0KXtcbiAgICByZXN1bHQgPSByZXN1bHQgfHwge307XG5cbiAgICB0aGlzLnJlZiAgID0gcmVzdWx0LnJlZjtcbiAgICB0aGlzLmluZGV4ID0gcmVzdWx0LmluZGV4O1xuICAgIHRoaXMudGV4dCAgPSByZXN1bHQudGV4dDtcbiAgICB0aGlzLnRhZ3MgID0gcmVzdWx0LnRhZ3MgfHwge307XG5cbiAgICB0aGlzLnN0YXJ0ID0gbmV3IFBhcnNlZENvbXBvbmVudHMocmVzdWx0LnN0YXJ0LCByZXN1bHQucmVmKVxuICAgIGlmKHJlc3VsdC5lbmQpe1xuICAgICAgICB0aGlzLmVuZCA9IG5ldyBQYXJzZWRDb21wb25lbnRzKHJlc3VsdC5lbmQsIHJlc3VsdC5yZWYpXG4gICAgfVxufVxuXG5QYXJzZWRSZXN1bHQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQodGhpcyk7XG4gICAgcmVzdWx0LnRhZ3MgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMudGFncykpO1xuICAgIHJlc3VsdC5zdGFydCA9IHRoaXMuc3RhcnQuY2xvbmUoKTtcbiAgICBpZiAodGhpcy5lbmQpIHtcbiAgICAgICAgcmVzdWx0LmVuZCA9IHRoaXMuZW5kLmNsb25lKCk7XG4gICAgfVxufVxuXG5QYXJzZWRSZXN1bHQucHJvdG90eXBlLmhhc1Bvc3NpYmxlRGF0ZXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydC5pc1Bvc3NpYmxlRGF0ZSgpICYmICghdGhpcy5lbmQgfHwgdGhpcy5lbmQuaXNQb3NzaWJsZURhdGUoKSk7XG59XG5cblxuZnVuY3Rpb24gUGFyc2VkQ29tcG9uZW50cyAoY29tcG9uZW50cywgcmVmKXtcblxuICAgIHRoaXMua25vd25WYWx1ZXMgPSB7fTtcbiAgICB0aGlzLmltcGxpZWRWYWx1ZXMgPSB7fTtcblxuICAgIGlmIChjb21wb25lbnRzKSB7XG4gICAgICAgIGZvciAoa2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMua25vd25WYWx1ZXNba2V5XSA9IGNvbXBvbmVudHNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZWYpIHtcbiAgICAgICAgcmVmID0gbW9tZW50KHJlZik7XG4gICAgICAgIHRoaXMuaW1wbHkoJ2RheScsIHJlZi5kYXRlKCkpXG4gICAgICAgIHRoaXMuaW1wbHkoJ21vbnRoJywgcmVmLm1vbnRoKCkgKyAxKVxuICAgICAgICB0aGlzLmltcGx5KCd5ZWFyJywgcmVmLnllYXIoKSlcbiAgICB9XG4gICAgXG5cbiAgICB0aGlzLmltcGx5KCdob3VyJywgMTIpO1xuICAgIHRoaXMuaW1wbHkoJ21pbnV0ZScsIDApO1xuICAgIHRoaXMuaW1wbHkoJ3NlY29uZCcsIDApO1xuICAgIHRoaXMuaW1wbHkoJ21pbGxpc2Vjb25kJywgMCk7XG59XG5cblBhcnNlZENvbXBvbmVudHMucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb21wb25lbnQgPSBuZXcgUGFyc2VkQ29tcG9uZW50cygpO1xuICAgIGNvbXBvbmVudC5rbm93blZhbHVlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5rbm93blZhbHVlcykpO1xuICAgIGNvbXBvbmVudC5pbXBsaWVkVmFsdWVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmltcGxpZWRWYWx1ZXMpKTtcbiAgICByZXR1cm4gY29tcG9uZW50O1xufTtcblxuUGFyc2VkQ29tcG9uZW50cy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oY29tcG9uZW50LCB2YWx1ZSkge1xuICAgIGlmIChjb21wb25lbnQgaW4gdGhpcy5rbm93blZhbHVlcykgcmV0dXJuIHRoaXMua25vd25WYWx1ZXNbY29tcG9uZW50XTtcbiAgICBpZiAoY29tcG9uZW50IGluIHRoaXMuaW1wbGllZFZhbHVlcykgcmV0dXJuIHRoaXMuaW1wbGllZFZhbHVlc1tjb21wb25lbnRdO1xufTtcblxuUGFyc2VkQ29tcG9uZW50cy5wcm90b3R5cGUuYXNzaWduID0gZnVuY3Rpb24oY29tcG9uZW50LCB2YWx1ZSkge1xuICAgIHRoaXMua25vd25WYWx1ZXNbY29tcG9uZW50XSA9IHZhbHVlO1xuICAgIGRlbGV0ZSB0aGlzLmltcGxpZWRWYWx1ZXNbY29tcG9uZW50XTtcbn07XG5cblBhcnNlZENvbXBvbmVudHMucHJvdG90eXBlLmltcGx5ID0gZnVuY3Rpb24oY29tcG9uZW50LCB2YWx1ZSkge1xuICAgIGlmIChjb21wb25lbnQgaW4gdGhpcy5rbm93blZhbHVlcykgcmV0dXJuO1xuICAgIHRoaXMuaW1wbGllZFZhbHVlc1tjb21wb25lbnRdID0gdmFsdWU7XG59O1xuXG5QYXJzZWRDb21wb25lbnRzLnByb3RvdHlwZS5pc0NlcnRhaW4gPSBmdW5jdGlvbihjb21wb25lbnQpIHtcbiAgICByZXR1cm4gY29tcG9uZW50IGluIHRoaXMua25vd25WYWx1ZXM7XG59O1xuXG5QYXJzZWRDb21wb25lbnRzLnByb3RvdHlwZS5pc1Bvc3NpYmxlRGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHZhciBkYXRlTW9tZW50ID0gdGhpcy5tb21lbnQoKTtcblxuICAgIGlmIChkYXRlTW9tZW50LmdldCgneWVhcicpICE9IHRoaXMuZ2V0KCd5ZWFyJykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZGF0ZU1vbWVudC5nZXQoJ21vbnRoJykgIT0gdGhpcy5nZXQoJ21vbnRoJyktMSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChkYXRlTW9tZW50LmdldCgnZGF0ZScpICE9IHRoaXMuZ2V0KCdkYXknKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChkYXRlTW9tZW50LmdldCgnaG91cicpICE9IHRoaXMuZ2V0KCdob3VyJykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZGF0ZU1vbWVudC5nZXQoJ21pbnV0ZScpICE9IHRoaXMuZ2V0KCdtaW51dGUnKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cblBhcnNlZENvbXBvbmVudHMucHJvdG90eXBlLmRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGF0ZU1vbWVudCA9IHRoaXMubW9tZW50KCk7XG4gICAgcmV0dXJuIGRhdGVNb21lbnQudG9EYXRlKCk7XG59O1xuXG5QYXJzZWRDb21wb25lbnRzLnByb3RvdHlwZS5tb21lbnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGF0ZU1vbWVudCA9IG1vbWVudCgpO1xuXG4gICAgZGF0ZU1vbWVudC5zZXQoJ3llYXInLCB0aGlzLmdldCgneWVhcicpKTtcbiAgICBkYXRlTW9tZW50LnNldCgnbW9udGgnLCB0aGlzLmdldCgnbW9udGgnKS0xKTtcbiAgICBkYXRlTW9tZW50LnNldCgnZGF0ZScsIHRoaXMuZ2V0KCdkYXknKSk7XG4gICAgZGF0ZU1vbWVudC5zZXQoJ2hvdXInLCB0aGlzLmdldCgnaG91cicpKTtcbiAgICBkYXRlTW9tZW50LnNldCgnbWludXRlJywgdGhpcy5nZXQoJ21pbnV0ZScpKTtcbiAgICBkYXRlTW9tZW50LnNldCgnc2Vjb25kJywgdGhpcy5nZXQoJ3NlY29uZCcpKTtcbiAgICBkYXRlTW9tZW50LnNldCgnbWlsbGlzZWNvbmQnLCB0aGlzLmdldCgnbWlsbGlzZWNvbmQnKSk7XG5cbiAgICAvLyBKYXZhc2NyaXB0IERhdGUgT2JqZWN0IHJldHVybiBtaW51cyB0aW1lem9uZSBvZmZzZXRcbiAgICB2YXIgY3VycmVudFRpbWV6b25lT2Zmc2V0ID0gZGF0ZU1vbWVudC51dGNPZmZzZXQoKTtcbiAgICB2YXIgdGFyZ2V0VGltZXpvbmVPZmZzZXQgPSB0aGlzLmlzQ2VydGFpbigndGltZXpvbmVPZmZzZXQnKSA/IFxuICAgICAgICB0aGlzLmdldCgndGltZXpvbmVPZmZzZXQnKSA6IGN1cnJlbnRUaW1lem9uZU9mZnNldDtcblxuICAgIHZhciBhZGp1c3RUaW1lem9uZU9mZnNldCA9IHRhcmdldFRpbWV6b25lT2Zmc2V0IC0gY3VycmVudFRpbWV6b25lT2Zmc2V0O1xuICAgIGRhdGVNb21lbnQuYWRkKC1hZGp1c3RUaW1lem9uZU9mZnNldCwgJ21pbnV0ZXMnKTtcblxuICAgIHJldHVybiBkYXRlTW9tZW50O1xufVxuXG5cblxuZXhwb3J0cy5QYXJzZWRDb21wb25lbnRzID0gUGFyc2VkQ29tcG9uZW50cztcbmV4cG9ydHMuUGFyc2VkUmVzdWx0ID0gUGFyc2VkUmVzdWx0O1xuIiwiZXhwb3J0cy5XRUVLREFZX09GRlNFVCA9IHsgXG4gICAgJ3N1bmRheSc6IDAsIFxuICAgICdzdW4nOiAwLCBcbiAgICAnbW9uZGF5JzogMSwgXG4gICAgJ21vbic6IDEsXG4gICAgJ3R1ZXNkYXknOiAyLCBcbiAgICAndHVlJzoyLCBcbiAgICAnd2VkbmVzZGF5JzogMywgXG4gICAgJ3dlZCc6IDMsIFxuICAgICd0aHVyc2RheSc6IDQsIFxuICAgICd0aHVyJzogNCwgXG4gICAgJ3RodSc6IDQsXG4gICAgJ2ZyaWRheSc6IDUsIFxuICAgICdmcmknOiA1LFxuICAgICdzYXR1cmRheSc6IDYsIFxuICAgICdzYXQnOiA2XG59O1xuICAgIFxuZXhwb3J0cy5NT05USF9PRkZTRVQgPSB7IFxuICAgICdqYW51YXJ5JzogMSxcbiAgICAnamFuJzogMSxcbiAgICAnamFuLic6IDEsXG4gICAgJ2ZlYnJ1YXJ5JzogMixcbiAgICAnZmViJzogMixcbiAgICAnZmViLic6IDIsXG4gICAgJ21hcmNoJzogMyxcbiAgICAnbWFyJzogMyxcbiAgICAnbWFyLic6IDMsXG4gICAgJ2FwcmlsJzogNCxcbiAgICAnYXByJzogNCxcbiAgICAnYXByLic6IDQsXG4gICAgJ21heSc6IDUsXG4gICAgJ2p1bmUnOiA2LFxuICAgICdqdW4nOiA2LFxuICAgICdqdW4uJzogNixcbiAgICAnanVseSc6IDcsXG4gICAgJ2p1bCc6IDcsXG4gICAgJ2p1bC4nOiA3LFxuICAgICdhdWd1c3QnOiA4LFxuICAgICdhdWcnOiA4LFxuICAgICdhdWcuJzogOCxcbiAgICAnc2VwdGVtYmVyJzogOSxcbiAgICAnc2VwJzogOSxcbiAgICAnc2VwLic6IDksXG4gICAgJ3NlcHQnOiA5LFxuICAgICdzZXB0Lic6IDksXG4gICAgJ29jdG9iZXInOiAxMCxcbiAgICAnb2N0JzogMTAsXG4gICAgJ29jdC4nOiAxMCxcbiAgICAnbm92ZW1iZXInOiAxMSxcbiAgICAnbm92JzogMTEsXG4gICAgJ25vdi4nOiAxMSxcbiAgICAnZGVjZW1iZXInOiAxMixcbiAgICAnZGVjJzogMTIsXG4gICAgJ2RlYy4nOiAxMlxufTtcblxuZXhwb3J0cy5JTlRFR0VSX1dPUkRTX1BBVFRFUk4gPSAnKD86b25lfHR3b3x0aHJlZXxmb3VyfGZpdmV8c2l4fHNldmVufGVpZ2h0fG5pbmV8dGVufGVsZXZlbnx0d2VsdmUpJztcbmV4cG9ydHMuSU5URUdFUl9XT1JEUyA9IHtcbiAgICAnb25lJyA6IDEsXG4gICAgJ3R3bycgOiAyLFxuICAgICd0aHJlZScgOiAzLFxuICAgICdmb3VyJyA6IDQsXG4gICAgJ2ZpdmUnIDogNSxcbiAgICAnc2l4JyA6IDYsXG4gICAgJ3NldmVuJyA6IDcsXG4gICAgJ2VpZ2h0JyA6IDgsXG4gICAgJ25pbmUnIDogOSxcbiAgICAndGVuJyA6IDEwLFxuICAgICdlbGV2ZW4nIDogMTEsXG4gICAgJ3R3ZWx2ZScgOiAxMlxufTtcbiIsImV4cG9ydHMuV0VFS0RBWV9PRkZTRVQgPSB7XG4gICAgJ2RvbWluZ28nOiAwLFxuICAgICdkb20nOiAwLFxuICAgICdsdW5lcyc6IDEsXG4gICAgJ2x1bic6IDEsXG4gICAgJ21hcnRlcyc6IDIsXG4gICAgJ21hcic6MixcbiAgICAnbWnDqXJjb2xlcyc6IDMsXG4gICAgJ21pZXJjb2xlcyc6IDMsXG4gICAgJ21pZSc6IDMsXG4gICAgJ2p1ZXZlcyc6IDQsXG4gICAgJ2p1ZSc6IDQsXG4gICAgJ3ZpZXJuZXMnOiA1LFxuICAgICd2aWUnOiA1LFxuICAgICdzw6FiYWRvJzogNixcbiAgICAnc2FiYWRvJzogNixcbiAgICAnc2FiJzogNix9XG5cbmV4cG9ydHMuTU9OVEhfT0ZGU0VUID0ge1xuICAgICdlbmVybyc6IDEsXG4gICAgJ2VuZSc6IDEsXG4gICAgJ2VuZS4nOiAxLFxuICAgICdmZWJyZXJvJzogMixcbiAgICAnZmViJzogMixcbiAgICAnZmViLic6IDIsXG4gICAgJ21hcnpvJzogMyxcbiAgICAnbWFyJzogMyxcbiAgICAnbWFyLic6IDMsXG4gICAgJ2FicmlsJzogNCxcbiAgICAnYWJyJzogNCxcbiAgICAnYWJyLic6IDQsXG4gICAgJ21heW8nOiA1LFxuICAgICdtYXknOiA1LFxuICAgICdtYXkuJzogNSxcbiAgICAnanVuaW8nOiA2LFxuICAgICdqdW4nOiA2LFxuICAgICdqdW4uJzogNixcbiAgICAnanVsaW8nOiA3LFxuICAgICdqdWwnOiA3LFxuICAgICdqdWwuJzogNyxcbiAgICAnYWdvc3RvJzogOCxcbiAgICAnYWdvJzogOCxcbiAgICAnYWdvLic6IDgsXG4gICAgJ3NlcHRpZW1icmUnOiA5LFxuICAgICdzZXAnOiA5LFxuICAgICdzZXB0JzogOSxcbiAgICAnc2VwLic6IDksXG4gICAgJ3NlcHQuJzogOSxcbiAgICAnb2N0dWJyZSc6IDEwLFxuICAgICdvY3QnOiAxMCxcbiAgICAnb2N0Lic6IDEwLFxuICAgICdub3ZpZW1icmUnOiAxMSxcbiAgICAnbm92JzogMTEsXG4gICAgJ25vdi4nOiAxMSxcbiAgICAnZGljaWVtYnJlJzogMTIsXG4gICAgJ2RpYyc6IDEyLFxuICAgICdkaWMuJzogMTIsXG59XG4iLCJcblxuLyoqXG4gKiB0by1oYW5rYWt1LmpzXG4gKiBjb252ZXJ0IHRvIGFzY2lpIGNvZGUgc3RyaW5ncy5cbiAqXG4gKiBAdmVyc2lvbiAxLjAuMVxuICogQGF1dGhvciB0aGluazQ5XG4gKiBAdXJsIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tLzk2NDU5MlxuICogQGxpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHAgKFRoZSBNSVQgTGljZW5zZSlcbiAqL1xuIFxuZXhwb3J0cy50b0hhbmtha3UgPSAoZnVuY3Rpb24gKFN0cmluZywgZnJvbUNoYXJDb2RlKSB7XG4gXG4gICAgZnVuY3Rpb24gdG9IYW5rYWt1IChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1xcdTIwMTkvZywgJ1xcdTAwMjcnKS5yZXBsYWNlKC9cXHUyMDFEL2csICdcXHUwMDIyJykucmVwbGFjZSgvXFx1MzAwMC9nLCAnXFx1MDAyMCcpLnJlcGxhY2UoL1xcdUZGRTUvZywgJ1xcdTAwQTUnKS5yZXBsYWNlKC9bXFx1RkYwMVxcdUZGMDMtXFx1RkYwNlxcdUZGMDhcXHVGRjA5XFx1RkYwQy1cXHVGRjE5XFx1RkYxQy1cXHVGRjFGXFx1RkYyMS1cXHVGRjNCXFx1RkYzRFxcdUZGM0ZcXHVGRjQxLVxcdUZGNUJcXHVGRjVEXFx1RkY1RV0vZywgYWxwaGFOdW0pO1xuICAgIH1cbiBcbiAgICBmdW5jdGlvbiBhbHBoYU51bSAodG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIGZyb21DaGFyQ29kZSh0b2tlbi5jaGFyQ29kZUF0KDApIC0gNjUyNDgpO1xuICAgIH1cbiBcbiAgICByZXR1cm4gdG9IYW5rYWt1O1xufSkoU3RyaW5nLCBTdHJpbmcuZnJvbUNoYXJDb2RlKTtcblxuLyoqXG4gKiB0by16ZW5rYWt1LmpzXG4gKiBjb252ZXJ0IHRvIG11bHRpIGJ5dGUgc3RyaW5ncy5cbiAqXG4gKiBAdmVyc2lvbiAxLjAuMlxuICogQGF1dGhvciB0aGluazQ5XG4gKiBAdXJsIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tLzk2NDU5MlxuICogQGxpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHAgKFRoZSBNSVQgTGljZW5zZSlcbiAqL1xuZXhwb3J0cy50b1plbmtha3UgPSAoZnVuY3Rpb24gKFN0cmluZywgZnJvbUNoYXJDb2RlKSB7XG4gXG4gICAgZnVuY3Rpb24gdG9aZW5rYWt1IChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1xcdTAwMjAvZywgJ1xcdTMwMDAnKS5yZXBsYWNlKC9cXHUwMDIyL2csICdcXHUyMDFEJykucmVwbGFjZSgvXFx1MDAyNy9nLCAnXFx1MjAxOScpLnJlcGxhY2UoL1xcdTAwQTUvZywgJ1xcdUZGRTUnKS5yZXBsYWNlKC9bISMtJigpLC05XFx1MDAzQy0/QS1bXFx1MDA1RF9hLXt9fl0vZywgYWxwaGFOdW0pO1xuICAgIH1cbiBcbiAgICBmdW5jdGlvbiBhbHBoYU51bSAodG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIGZyb21DaGFyQ29kZSh0b2tlbi5jaGFyQ29kZUF0KDApICsgNjUyNDgpO1xuICAgIH1cbiBcbiAgICByZXR1cm4gdG9aZW5rYWt1O1xufSkoU3RyaW5nLCBTdHJpbmcuZnJvbUNoYXJDb2RlKTsiXX0=
