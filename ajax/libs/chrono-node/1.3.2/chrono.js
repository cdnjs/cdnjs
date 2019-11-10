(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.chrono = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//! moment.js locale configuration
//! locale : French [fr]
//! author : John Fischer : https://github.com/jfroffice

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var fr = moment.defineLocale('fr', {
    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
    ordinal : function (number, period) {
        switch (period) {
            // TODO: Return 'e' when day of month > 1. Move this case inside
            // block for masculine words below.
            // See https://github.com/moment/moment/issues/3375
            case 'D':
                return number + (number === 1 ? 'er' : '');

            // Words with masculine grammatical gender: mois, trimestre, jour
            default:
            case 'M':
            case 'Q':
            case 'DDD':
            case 'd':
                return number + (number === 1 ? 'er' : 'e');

            // Words with feminine grammatical gender: semaine
            case 'w':
            case 'W':
                return number + (number === 1 ? 're' : 'e');
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return fr;

})));

},{"../moment":2}],2:[function(require,module,exports){
//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    var k;
    for (k in obj) {
        // even if its not own property I'd still call it non-empty
        return false;
    }
    return true;
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
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

function createUTC (input, format, locale, strict) {
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
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

var some$1 = some;

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
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
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
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

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var keys$1 = keys;

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
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

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
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

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid()) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

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
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
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
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

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
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
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
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
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
var WEEK = 7;
var WEEKDAY = 8;

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

var indexOf$1 = indexOf;

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

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

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

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
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

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

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

// FORMATTING

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

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
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
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
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

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
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

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
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
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            require('./locale/' + name);
            // because defineLocale currently also sets the global locale, we
            // want to undo that for lazy loaded locales
            getSetGlobalLocale(oldLocale);
        } catch (e) { }
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
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

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, parentConfig = baseConfig;
        // MERGE
        if (locales[name] != null) {
            parentConfig = locales[name]._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
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

function listLocales() {
    return keys$1(locales);
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
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var basicRfcRegex = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var string, match, dayFormat,
        dateFormat, timeFormat, tzFormat;
    var timezones = {
        ' GMT': ' +0000',
        ' EDT': ' -0400',
        ' EST': ' -0500',
        ' CDT': ' -0500',
        ' CST': ' -0600',
        ' MDT': ' -0600',
        ' MST': ' -0700',
        ' PDT': ' -0700',
        ' PST': ' -0800'
    };
    var military = 'YXWVUTSRQPONZABCDEFGHIKLM';
    var timezone, timezoneIndex;

    string = config._i
        .replace(/\([^\)]*\)|[\n\t]/g, ' ') // Remove comments and folding whitespace
        .replace(/(\s\s+)/g, ' ') // Replace multiple-spaces with a single space
        .replace(/^\s|\s$/g, ''); // Remove leading and trailing spaces
    match = basicRfcRegex.exec(string);

    if (match) {
        dayFormat = match[1] ? 'ddd' + ((match[1].length === 5) ? ', ' : ' ') : '';
        dateFormat = 'D MMM ' + ((match[2].length > 10) ? 'YYYY ' : 'YY ');
        timeFormat = 'HH:mm' + (match[4] ? ':ss' : '');

        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        if (match[1]) { // day of week given
            var momentDate = new Date(match[2]);
            var momentDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][momentDate.getDay()];

            if (match[1].substr(0,3) !== momentDay) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return;
            }
        }

        switch (match[5].length) {
            case 2: // military
                if (timezoneIndex === 0) {
                    timezone = ' +0000';
                } else {
                    timezoneIndex = military.indexOf(match[5][1].toUpperCase()) - 12;
                    timezone = ((timezoneIndex < 0) ? ' -' : ' +') +
                        (('' + timezoneIndex).replace(/^-?/, '0')).match(/..$/)[0] + '00';
                }
                break;
            case 4: // Zone
                timezone = timezones[match[5]];
                break;
            default: // UT or +/-9999
                timezone = timezones[' GMT'];
        }
        match[5] = timezone;
        config._i = match.splice(1).join('');
        tzFormat = ' ZZ';
        config._f = dayFormat + dateFormat + timeFormat + tzFormat;
        configFromStringAndFormat(config);
        getParsingFlags(config).rfc2822 = true;
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
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

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
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
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
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
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
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
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
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
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
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
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

// date from string and array of format strings
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

        if (!isValid(tempConfig)) {
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
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
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

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
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
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
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

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(ordering.indexOf(key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
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

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
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

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

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

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

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
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
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
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
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
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
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
    } else if (isNumber(input)) {
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
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

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

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

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
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

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

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

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

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString() {
    if (!this.isValid()) {
        return null;
    }
    var m = this.clone().utc();
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        return this.toDate().toISOString();
    }
    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
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
        case 'date':
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

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

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

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


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
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0], 10);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
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
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
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

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

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

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
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
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
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

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
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
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds;
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

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

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


hooks.version = '2.18.1';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

return hooks;

})));

},{}],3:[function(require,module,exports){

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
};


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
};

exports.Chrono = Chrono;
exports.strict = new Chrono( options.strictOption() );
exports.casual = new Chrono( options.casualOption() );

exports.en = new Chrono( options.mergeOptions([
    options.en.casual, options.commonPostProcessing]));

exports.en_GB = new Chrono( options.mergeOptions([
    options.en_GB.casual, options.commonPostProcessing]));

exports.de = new Chrono( options.mergeOptions([
    options.de.casual, options.en, options.commonPostProcessing]));

exports.es = new Chrono( options.mergeOptions([
    options.es.casual, options.en, options.commonPostProcessing]));

exports.fr = new Chrono( options.mergeOptions([
    options.fr.casual, options.en, options.commonPostProcessing]));

exports.ja = new Chrono( options.mergeOptions([ 
    options.ja.casual, options.en, options.commonPostProcessing]));


exports.parse = function () {
    return exports.casual.parse.apply(exports.casual, arguments);
};

exports.parseDate = function () {
    return exports.casual.parseDate.apply(exports.casual, arguments);
};





},{"./options":4,"./parsers/parser":49,"./refiners/refiner":63,"./result":64}],4:[function(require,module,exports){
var parser = require('./parsers/parser');
var refiner = require('./refiners/refiner');


exports.mergeOptions = function(options) {

    var addedTypes = {};
    var mergedOption = {
        parsers: [],
        refiners: []
    };

    options.forEach(function (option) {

        if (option.call) {
            option = option.call();
        }

        if (option.parsers) {
            option.parsers.forEach(function (p) {
                if (!addedTypes[p.constructor]) {
                    mergedOption.parsers.push(p);
                    addedTypes[p.constructor] = true;
                }
            });
        }

        if (option.refiners) {
            option.refiners.forEach(function (r) {
                if (!addedTypes[r.constructor]) {
                    mergedOption.refiners.push(r);
                    addedTypes[r.constructor] = true;
                }
            });
        }
    });

    return mergedOption;
};


exports.commonPostProcessing = function() {
    return {
        refiners: [
            // These should be after all other refiners
            new refiner.ExtractTimezoneOffsetRefiner(),
            new refiner.ExtractTimezoneAbbrRefiner(),
            new refiner.UnlikelyFormatFilter()
        ]
    }
};


// -------------------------------------------------------------

exports.strictOption = function () {
    var strictConfig = {
        strict: true
    }

    return exports.mergeOptions([
        exports.en(strictConfig),
        exports.de(strictConfig),
        exports.es(strictConfig),
        exports.fr(strictConfig),
        exports.ja(strictConfig),
        exports.zh,
        exports.commonPostProcessing
    ]);
};

exports.casualOption = function () {
    return exports.mergeOptions([
        exports.en.casual,
        // Some German abbriviate overlap with common English
        exports.de({ strict: true }), 
        exports.es.casual,
        exports.fr.casual,
        exports.ja.casual,
        exports.zh,
        exports.commonPostProcessing
    ]);
};

// -------------------------------------------------------------

exports.de = function(config) {
    return {
        parsers: [
            new parser.DEDeadlineFormatParser(config),
            new parser.DEMonthNameLittleEndianParser(config),
            new parser.DEMonthNameParser(config),
            new parser.DESlashDateFormatParser(config),
            new parser.DETimeAgoFormatParser(config),
            new parser.DETimeExpressionParser(config)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),
            new refiner.DEMergeDateTimeRefiner(),
            new refiner.DEMergeDateRangeRefiner()
        ]
    }
};

exports.de.casual = function() {
    var option = exports.de({
        strict: false
    });
    option.parsers.unshift(new parser.DECasualDateParser());
    option.parsers.unshift(new parser.DEWeekdayParser());
    return option;
};



// -------------------------------------------------------------


exports.en = function(config) {
    return {
        parsers: [
            new parser.ENISOFormatParser(config),
            new parser.ENDeadlineFormatParser(config),
            new parser.ENMonthNameLittleEndianParser(config),
            new parser.ENMonthNameMiddleEndianParser(config),
            new parser.ENMonthNameParser(config),
            new parser.ENSlashDateFormatParser(config),
            new parser.ENSlashDateFormatStartWithYearParser(config),
            new parser.ENSlashMonthFormatParser(config),
            new parser.ENTimeAgoFormatParser(config),
            new parser.ENTimeExpressionParser(config)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),

            // English
            new refiner.ENMergeDateTimeRefiner(),
            new refiner.ENMergeDateRangeRefiner(),
            new refiner.ENPrioritizeSpecificDateRefiner()
        ]
    }
};

exports.en.casual = function(config) {
    config = config || {};
    config.strict = false;
    var option = exports.en(config);

    // EN
    option.parsers.unshift(new parser.ENCasualDateParser());
    option.parsers.unshift(new parser.ENCasualTimeParser());
    option.parsers.unshift(new parser.ENWeekdayParser());
    option.parsers.unshift(new parser.ENRelativeDateFormatParser());
    return option;
};


exports.en_GB = function(config) {
    config = config || {};
    config.littleEndian = true;
    return exports.en(config);
}

exports.en_GB.casual = function(config) {
    config = config || {};
    config.littleEndian = true;
    return exports.en.casual(config);
}

// -------------------------------------------------------------

exports.ja = function() {
    return {
        parsers: [
            new parser.JPStandardParser()
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),
            new refiner.JPMergeDateRangeRefiner()
        ]
    }
};

exports.ja.casual = function() {
    var option = exports.ja();
    option.parsers.unshift(new parser.JPCasualDateParser());
    return option;
};


// -------------------------------------------------------------


exports.es = function(config) {
    return {
        parsers: [
            new parser.ESTimeAgoFormatParser(config),
            new parser.ESDeadlineFormatParser(config),
            new parser.ESTimeExpressionParser(config),
            new parser.ESMonthNameLittleEndianParser(config),
            new parser.ESSlashDateFormatParser(config)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner()
        ]
    }
};

exports.es.casual = function() {
    var option = exports.es({ 
        strict: false 
    });

    option.parsers.unshift(new parser.ESCasualDateParser());
    option.parsers.unshift(new parser.ESWeekdayParser());
    return option;
};


// -------------------------------------------------------------

exports.fr = function(config) {
    return {
        parsers: [
            new parser.FRDeadlineFormatParser(config),
            new parser.FRMonthNameLittleEndianParser(config),
            new parser.FRSlashDateFormatParser(config),
            new parser.FRTimeAgoFormatParser(config),
            new parser.FRTimeExpressionParser(config)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),
            new refiner.FRMergeDateRangeRefiner(),
            new refiner.FRMergeDateTimeRefiner()
        ]
    }
};

exports.fr.casual = function() {
    var option = exports.fr({
        strict: false
    });

    option.parsers.unshift(new parser.FRCasualDateParser());
    option.parsers.unshift(new parser.FRWeekdayParser());
    option.parsers.unshift(new parser.FRRelativeDateFormatParser());
    return option;
};


// -------------------------------------------------------------

exports.zh = function() {
    return {
        parsers: [
            new parser.ZHHantDateParser(),
            new parser.ZHHantWeekdayParser(),
            new parser.ZHHantTimeExpressionParser(),
            new parser.ZHHantCasualDateParser(),
            new parser.ZHHantDeadlineFormatParser()
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner()
        ]
    }
};
},{"./parsers/parser":49,"./refiners/refiner":63}],5:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp(
    '(\\W|^)(' +
        'jetzt|' +
        '(?:heute|diesen)\\s*(morgen|vormittag|mittag|nachmittag|abend)|' +
        '(?:heute|diese)\\s*nacht|' +
        'heute|' +
        '(?:(?:ü|ue)ber)?morgen(?:\\s*(morgen|vormittag|mittag|nachmittag|abend|nacht))?|' +
        '(?:vor)?gestern(?:\\s*(morgen|vormittag|mittag|nachmittag|abend|nacht))?|' +
        'letzte\\s*nacht' +
    ')(?=\\W|$)', 'i');

exports.Parser = function DECasualDateParser() {

    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt) {
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

        if (/(?:heute|diese)\s*nacht/.test(lowerText)) {
            // Normally means this coming midnight
            result.start.imply('hour', 22);
            result.start.imply('meridiem', 1);
        } else if (/^(?:ü|ue)bermorgen/.test(lowerText)) {
            startMoment.add(refMoment.hour() > 1 ? 2 : 1, 'day');
        } else if (/^morgen/.test(lowerText)) {
            // Check not "Tomorrow" on late night
            if (refMoment.hour() > 1) {
                startMoment.add(1, 'day');
            }
        } else if (/^gestern/.test(lowerText)) {
            startMoment.add(-1, 'day');
        } else if (/^vorgestern/.test(lowerText)) {
            startMoment.add(-2, 'day');
        } else if (/letzte\s*nacht/.test(lowerText)) {
            result.start.imply('hour', 0);
            if (refMoment.hour() > 6) {
                startMoment.add(-1, 'day');
            }
        } else if (lowerText === 'jetzt') {
          result.start.imply('hour', refMoment.hour());
          result.start.imply('minute', refMoment.minute());
          result.start.imply('second', refMoment.second());
          result.start.imply('millisecond', refMoment.millisecond());
        }

        var secondMatch = match[3] || match[4] || match[5];
        if (secondMatch) {
            switch (secondMatch.toLowerCase()) {
                case 'morgen':
                    result.start.imply('hour', 6);
                    break;
                case 'vormittag':
                    result.start.imply('hour', 9);
                    break;
                case 'mittag':
                    result.start.imply('hour', 12);
                    break;
                case 'nachmittag':
                    result.start.imply('hour', 15);
                    result.start.imply('meridiem', 1);
                    break;
                case 'abend':
                    result.start.imply('hour', 18);
                    result.start.imply('meridiem', 1);
                    break;
                case 'nacht':
                    result.start.imply('hour', 0);
                    break;
            }
        }

        result.start.assign('day', startMoment.date())
        result.start.assign('month', startMoment.month() + 1)
        result.start.assign('year', startMoment.year())
        result.tags['DECasualDateParser'] = true;
        return result;
    }
}

},{"../../result":64,"../parser":49,"moment":2}],6:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/DE');

var PATTERN = new RegExp('(\\W|^)' +
    '(in|nach)\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|[0-9]+|einigen|eine[rm]\\s*halben|eine[rm])\\s*' +
    '(sekunden?|min(?:ute)?n?|stunden?|tag(?:en)?|wochen?|monat(?:en)?|jahr(?:en)?)\\s*' +
    '(?=\\W|$)', 'i'
);

var STRICT_PATTERN = new RegExp('(\\W|^)' +
    '(in|nach)\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|[0-9]+|eine(?:r|m)?)\\s*' +
    '(sekunden?|minuten?|stunden?|tag(?:en)?)\\s*' +
    '(?=\\W|$)', 'i'
);

exports.Parser = function DEDeadlineFormatParser(){
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
        } else if (num === 'einer' || num === 'einem') {
            num = 1;
        } else if (num === 'einigen') {
            num = 3;
        } else if (/halben/.test(num)) {
            num = 0.5;
        } else {
            num = parseInt(num);
        }

        var date = moment(ref);
        if (/tag|woche|monat|jahr/i.test(match[4])) {

            if (/tag/i.test(match[4])) {
                date.add(num, 'd');
            } else if (/woche/i.test(match[4])) {
                date.add(num * 7, 'd');
            } else if (/monat/i.test(match[4])) {
                date.add(num, 'month');
            } else if (/jahr/i.test(match[4])) {
                date.add(num, 'year');
            }

            result.start.assign('year', date.year());
            result.start.assign('month', date.month() + 1);
            result.start.assign('day', date.date());
            return result;
        }

        if (/stunde/i.test(match[4])) {

            date.add(num, 'hour');

        } else if (/min/i.test(match[4])) {

            date.add(num, 'minute');

        } else if (/sekunde/i.test(match[4])) {

            date.add(num, 'second');
        }

        result.start.imply('year', date.year());
        result.start.imply('month', date.month() + 1);
        result.start.imply('day', date.date());
        result.start.assign('hour', date.hour());
        result.start.assign('minute', date.minute());
        result.start.assign('second', date.second());
        result.tags['DEDeadlineFormatParser'] = true;
        return result;
    };
};

},{"../../result":64,"../../utils/DE":65,"../parser":49,"moment":2}],7:[function(require,module,exports){
/*


*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/DE');

var PATTERN = new RegExp('(\\W|^)' +
        '(?:am\\s*?)?' +
        '(?:(Sonntag|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|So|Mo|Di|Mi|Do|Fr|Sa)\\s*,?\\s*)?' +
        '(?:den\\s*)?' +
        '([0-9]{1,2})\\.' +
        '(?:\\s*(?:bis(?:\\s*(?:am|zum))?|\\-|\\–|\\s)\\s*([0-9]{1,2})\\.)?\\s*' +
        '(Jan(?:uar|\\.)?|Feb(?:ruar|\\.)?|Mär(?:z|\\.)?|Maerz|Mrz\\.?|Apr(?:il|\\.)?|Mai|Jun(?:i|\\.)?|Jul(?:i|\\.)?|Aug(?:ust|\\.)?|Sep(?:t|t\\.|tember|\\.)?|Okt(?:ober|\\.)?|Nov(?:ember|\\.)?|Dez(?:ember|\\.)?)' +
        '(?:' +
            ',?\\s*([0-9]{1,4}(?![^\\s]\\d))' +
            '(\\s*[vn]\\.?\\s*C(?:hr)?\\.?)?' +
        ')?' +
        '(?=\\W|$)', 'i'
    );

var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function DEMonthNameLittleEndianParser(){
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
                if (/v/i.test(match[YEAR_BE_GROUP])) {
                    // v.Chr.
                    year = -year;
                }
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

        result.tags['DEMonthNameLittleEndianParser'] = true;
        return result;
    };
}

},{"../../result":64,"../../utils/DE":65,"../parser":49,"moment":2}],8:[function(require,module,exports){
/*
    
    The parser for parsing month name and year.
    
    EX. 
        - Januar
        - Januar 2012
*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/DE');

var PATTERN = new RegExp('(^|\\D\\s+|[^\\w\\s])' +
    '(Jan\\.?|Januar|Feb\\.?|Februar|Mär\\.?|M(?:ä|ae)rz|Mrz\\.?|Apr\\.?|April|Mai\\.?|Jun\\.?|Juni|Jul\\.?|Juli|Aug\\.?|August|Sep\\.?|Sept\\.?|September|Okt\\.?|Oktober|Nov\\.?|November|Dez\\.?|Dezember)' + 
    '\\s*' +
    '(?:' +
        ',?\\s*(?:([0-9]{4})(\\s*[vn]\\.?\\s*C(?:hr)?\\.?)?|([0-9]{1,4})\\s*([vn]\\.?\\s*C(?:hr)?\\.?))' +
    ')?' +
    '(?=[^\\s\\w]|$)', 'i');

var MONTH_NAME_GROUP = 2;
var YEAR_GROUP = 3;
var YEAR_BE_GROUP = 4;
var YEAR_GROUP2 = 5;
var YEAR_BE_GROUP2 = 6;

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
        if (match[YEAR_GROUP] || match[YEAR_GROUP2]) {
            year = match[YEAR_GROUP] || match[YEAR_GROUP2];
            year = parseInt(year);

            if (match[YEAR_BE_GROUP] || match[YEAR_BE_GROUP2]) {
                if (/v/i.test(match[YEAR_BE_GROUP] || match[YEAR_BE_GROUP2])) {
                    // v.Chr.
                    year = -year;
                }

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

        result.tags['DEMonthNameParser'] = true;
        return result;
    }
}


},{"../../result":64,"../../utils/DE":65,"../parser":49,"moment":2}],9:[function(require,module,exports){
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
        '(?:am\\s*?)?' +
        '((?:sonntag|so|montag|mo|dienstag|di|mittwoch|mi|donnerstag|do|freitag|fr|samstag|sa))' +
        '\\s*\\,?\\s*' +
        '(?:den\\s*)?' +
    ')?' +
    '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' +
    '(?:' +
        '[\\/\\.\\-]' +
        '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' +
    ')?' +
    '(\\W|$)', 'i');

var DAYS_OFFSET = {
    'sonntag': 0, 'so': 0,
    'montag': 1, 'mo': 1,
    'dienstag': 2, 'di': 2,
    'mittwoch': 3, 'mi': 3,
    'donnerstag': 4, 'do': 4,
    'freitag': 5, 'fr': 5,
    'samstag': 6, 'sa': 6
};


var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;

var WEEKDAY_GROUP = 2;
var DAY_GROUP = 3;
var MONTH_GROUP = 4;
var YEAR_GROUP = 5;

exports.Parser = function DESlashDateFormatParser(argument) {
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

        if (month < 1 || month > 12) return null;
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

        result.tags['DESlashDateFormatParser'] = true;
        return result;
    };
};

},{"../../result":64,"../parser":49,"moment":2}],10:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/DE');

var PATTERN = new RegExp('' +
    '(\\W|^)vor\\s*' +
    '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|einigen|eine[rm]\\s*halben|eine[rm])\\s*' +
    '(sekunden?|min(?:ute)?n?|stunden?|wochen?|tag(?:en)?|monat(?:en)?|jahr(?:en)?)\\s*' +
    '(?=(?:\\W|$))', 'i');

var STRICT_PATTERN = new RegExp('' +
    '(\\W|^)vor\\s*' +
    '([0-9]+|eine(?:r|m))\\s*' +
    '(sekunden?|minuten?|stunden?|tag(?:en)?)' +
    '(?=(?:\\W|$))', 'i');

exports.Parser = function DETimeAgoFormatParser(){
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
        } else if (num === 'einer' || num === 'einem') {
            num = 1;
        } else if (num === 'einigen') {
            num = 3;
        } else if (/halben/.test(num)) {
            num = 0.5;
        } else {
            num = parseInt(num);
        }

        var date = moment(ref);

        if (/stunde|min|sekunde/i.test(match[3])) {
            if (/stunde/i.test(match[3])) {

                date.add(-num, 'hour');

            } else if (/min/i.test(match[3])) {

                date.add(-num, 'minute');

            } else if (/sekunde/i.test(match[3])) {

                date.add(-num, 'second');
            }

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.assign('hour', date.hour());
            result.start.assign('minute', date.minute());
            result.start.assign('second', date.second());
            result.tags['DETimeAgoFormatParser'] = true;
            return result;
        }

        if (/woche/i.test(match[3])) {
            date.add(-num, 'week');

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.imply('weekday', date.day());
            return result;
        }

        if (/tag/i.test(match[3])) {
            date.add(-num, 'd');
        }

        if (/monat/i.test(match[3])) {
            date.add(-num, 'month');
        }

        if (/jahr/i.test(match[3])) {

            date.add(-num, 'year');
        }

        result.start.assign('day', date.date());
        result.start.assign('month', date.month() + 1);
        result.start.assign('year', date.year());
        return result;

    };
}

},{"../../result":64,"../../utils/DE":65,"../parser":49,"moment":2}],11:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var ParsedComponents = require('../../result').ParsedComponents;

var FIRST_REG_PATTERN  = new RegExp("(^|\\s|T)" +
    "(?:(?:um|von)\\s*)?" + 
    "(\\d{1,4}|mittags?|mitternachts?)" + 
    "(?:" + 
        "(?:\\.|\\:|\\：)(\\d{1,2})" + 
        "(?:" + 
            "(?:\\:|\\：)(\\d{2})" + 
        ")?" + 
    ")?" +
    "(?:\\s*uhr)?" +
    "(?:\\s*(morgens|vormittags|mittags|nachmittags|abends|nachts))?" + 
    "(?=\\W|$)", 'i');


var SECOND_REG_PATTERN = new RegExp("^\\s*" + 
    "(\\-|\\–|\\~|\\〜|bis|\\?)\\s*" + 
    "(\\d{1,4})" +
    "(?:" + 
        "(?:\\.|\\:|\\：)(\\d{1,2})" + 
        "(?:" + 
            "(?:\\.|\\:|\\：)(\\d{1,2})" + 
        ")?" + 
    ")?" + 
    "(?:\\s*(morgens|vormittags|mittags|nachmittags|abends|nachts))?" + 
    "(?=\\W|$)", 'i');

var HOUR_GROUP    = 2;
var MINUTE_GROUP  = 3;
var SECOND_GROUP  = 4;
var AM_PM_HOUR_GROUP = 5;


exports.Parser = function DETimeExpressionParser() {
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
        result.tags['DETimeExpressionParser'] = true;

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
        if (/mittags?/i.test(match[HOUR_GROUP])) {
            meridiem = 1; 
            hour = 12;
        } else if (/mitternachts?/i.test(match[HOUR_GROUP])) {
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
        if (match[AM_PM_HOUR_GROUP] != null) {
            if (hour > 12) return null;
            var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if (ampm === 'morgens' || ampm === 'vormittags') {
                meridiem = 0; 
                if(hour == 12) hour = 0;
            } else {
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
        if (match[AM_PM_HOUR_GROUP] != null) {

            if (hour > 12) return null;

            var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if (ampm === 'morgens' || ampm === 'vormittags') {
                meridiem = 0; 
                if(hour == 12) {
                    hour = 0;
                    if (!result.end.isCertain('day')) {
                        result.end.imply('day', result.end.get('day') + 1);
                    }
                }
            } else {
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

},{"../../result":64,"../parser":49,"moment":2}],12:[function(require,module,exports){
/*


*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var DAYS_OFFSET = {
    'sonntag': 0, 'so': 0,
    'montag': 1, 'mo': 1,
    'dienstag': 2, 'di': 2,
    'mittwoch': 3, 'mi': 3,
    'donnerstag': 4, 'do': 4,
    'freitag': 5, 'fr': 5,
    'samstag': 6, 'sa': 6
};

var PATTERN = new RegExp('(\\W|^)' +
    '(?:(?:\\,|\\(|\\（)\\s*)?' +
    '(?:a[mn]\\s*?)?' +
    '(?:(diese[mn]|letzte[mn]|n(?:ä|ae)chste[mn])\\s*)?' +
    '(' + Object.keys(DAYS_OFFSET).join('|') + ')' +
    '(?:\\s*(?:\\,|\\)|\\）))?' +
    '(?:\\s*(diese|letzte|n(?:ä|ae)chste)\\s*woche)?' +
    '(?=\\W|$)', 'i');

var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.Parser = function DEWeekdayParser() {
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

        var refOffset = startMoment.day();
        var norm = prefix || postfix;
        norm = norm || '';
        norm = norm.toLowerCase();
        if (/letzte/.test(norm)) {
            startMoment.day(offset - 7);
        } else if (/n(?:ä|ae)chste/.test(norm)) {
            startMoment.day(offset + 7);
        } else if (/diese/.test(norm)) {
            if ( opt.forwardDatesOnly && refOffset > offset ) {
                startMoment.day(offset + 7);
            } else {
                startMoment.day(offset);
            }
        } else {
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

},{"../../result":64,"../parser":49,"moment":2}],13:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)(now|today|tonight|last\s*night|(?:tomorrow|tmr|yesterday)\s*|tomorrow|tmr|yesterday)(?=\W|$)/i;

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

        } else if (/^tomorrow|^tmr/.test(lowerText)) {

            // Check not "Tomorrow" on late night
            if(refMoment.hour() > 1) {
                startMoment.add(1, 'day');
            }

        } else if (/^yesterday/.test(lowerText)) {

            startMoment.add(-1, 'day');

        } else if(lowerText.match(/last\s*night/)) {

            result.start.imply('hour', 0);
            if (refMoment.hour() > 6) {
                startMoment.add(-1, 'day');
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

},{"../../result":64,"../parser":49,"moment":2}],14:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)((this)?\s*(morning|afternoon|evening|noon))/i;

var TIME_MATCH = 4;

exports.Parser = function ENCasualTimeParser(){

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

        if(!match[TIME_MATCH]) TIME_MATCH = 3;

        if (match[TIME_MATCH] == "afternoon") {

            result.start.imply('hour', opt['afternoon'] ? opt['afternoon'] : 15);

        } else if (match[TIME_MATCH] == "evening") {

            result.start.imply('hour', opt['evening'] ? opt['evening'] : 18);

        } else if (match[TIME_MATCH] == "morning") {

            result.start.imply('hour', opt['morning'] ? opt['morning'] : 6);

        } else if (match[TIME_MATCH] == "noon") {

            result.start.imply('hour', opt['noon'] ? opt['noon'] : 12);
        }

        result.tags['ENCasualTimeParser'] = true;
        return result;
    };
};

},{"../../result":64,"../parser":49,"moment":2}],15:[function(require,module,exports){
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

},{"../../result":64,"../../utils/EN":66,"../parser":49,"moment":2}],16:[function(require,module,exports){
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


},{"../../result":64,"../parser":49,"moment":2}],17:[function(require,module,exports){
/*


*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/EN');

var PATTERN = new RegExp('(\\W|^)' +
        '(?:on\\s*?)?' +
        '(?:(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\\s*,?\\s*)?' +
        '(([0-9]{1,2})(?:st|nd|rd|th)?|' + util.ORDINAL_WORDS_PATTERN + ')' +
        '(?:\\s*' +
            '(?:to|\\-|\\–|until|through|till|\\s)\\s*' +
            '(([0-9]{1,2})(?:st|nd|rd|th)?|' + util.ORDINAL_WORDS_PATTERN + ')' +
        ')?\\s*(?:of)?\\s*' +
        '(Jan(?:uary|\\.)?|Feb(?:ruary|\\.)?|Mar(?:ch|\\.)?|Apr(?:il|\\.)?|May|Jun(?:e|\\.)?|Jul(?:y|\\.)?|Aug(?:ust|\\.)?|Sep(?:tember|\\.)?|Oct(?:ober|\\.)?|Nov(?:ember|\\.)?|Dec(?:ember|\\.)?)' +
        '(?:' +
            ',?\\s*([0-9]{1,4}(?![^\\s]\\d))' +
            '(\\s*(?:BE|AD|BC))?' +
        ')?' +
        '(?=\\W|$)', 'i'
    );

var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_NUM_GROUP = 4;
var DATE_TO_GROUP = 5;
var DATE_TO_NUM_GROUP = 6;
var MONTH_NAME_GROUP = 7;
var YEAR_GROUP = 8;
var YEAR_BE_GROUP = 9;

exports.Parser = function ENMonthNameLittleEndianParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref
        });

        var month = match[MONTH_NAME_GROUP];
        month = util.MONTH_OFFSET[month.toLowerCase()];

        var day = match[DATE_NUM_GROUP] ?
            parseInt(match[DATE_NUM_GROUP]):
            util.ORDINAL_WORDS[match[DATE_GROUP].trim().replace('-', ' ').toLowerCase()];

        var year = null;
        if (match[YEAR_GROUP]) {
            year = match[YEAR_GROUP];
            year = parseInt(year);

            if(match[YEAR_BE_GROUP]){

                if (/BE/i.test(match[YEAR_BE_GROUP])) {
                    // Buddhist Era
                    year = year - 543;
                } else if (/BC/i.test(match[YEAR_BE_GROUP])) {
                    // Before Christ
                    year = -year;
                }

            } else if (year < 10) {

                // require single digit years to always have BC/AD
                return null;

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
            var endDate = match[DATE_TO_NUM_GROUP] ?
                parseInt(match[DATE_TO_NUM_GROUP]):
                util.ORDINAL_WORDS[match[DATE_TO_GROUP].trim().replace('-', ' ').toLowerCase()];

            result.end = result.start.clone();
            result.end.assign('day', endDate);
        }

        result.tags['ENMonthNameLittleEndianParser'] = true;
        return result;
    };
};

},{"../../result":64,"../../utils/EN":66,"../parser":49,"moment":2}],18:[function(require,module,exports){
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
        '(?:on\\s*?)?' +
        '(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun\\.?|Mon\\.?|Tue\\.?|Wed\\.?|Thu\\.?|Fri\\.?|Sat\\.?)' +
    '\\s*,?\\s*)?' +
    '(Jan\\.?|January|Feb\\.?|February|Mar\\.?|March|Apr\\.?|April|May\\.?|Jun\\.?|June|Jul\\.?|July|Aug\\.?|August|Sep\\.?|Sept\\.?|September|Oct\\.?|October|Nov\\.?|November|Dec\\.?|December)' +
    '\\s*' +
    '(([0-9]{1,2})(?:st|nd|rd|th)?|' + util.ORDINAL_WORDS_PATTERN +')\\s*' +
    '(?:' +
        '(?:to|\\-)\\s*' +
        '(([0-9]{1,2})(?:st|nd|rd|th)?| ' + util.ORDINAL_WORDS_PATTERN + ')\\s*' +
    ')?' +
    '(?:' +
        '\\s*,?\\s*(?:([0-9]{4})\\s*(BE|AD|BC)?|([0-9]{1,4})\\s*(AD|BC))\\s*' +
    ')?' +
    '(?=\\W|$)(?!\\:\\d)', 'i');

var WEEKDAY_GROUP = 2;
var MONTH_NAME_GROUP = 3;
var DATE_GROUP = 4;
var DATE_NUM_GROUP = 5;
var DATE_TO_GROUP = 6;
var DATE_TO_NUM_GROUP = 7;
var YEAR_GROUP = 8;
var YEAR_BE_GROUP = 9;
var YEAR_GROUP2 = 10;
var YEAR_BE_GROUP2 = 11;

exports.Parser = function ENMonthNameMiddleEndianParser(){
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
        var day = match[DATE_NUM_GROUP] ?
            parseInt(match[DATE_NUM_GROUP]) :
            util.ORDINAL_WORDS[match[DATE_GROUP].trim().replace('-', ' ').toLowerCase()];

        var year = null;
        if (match[YEAR_GROUP] || match[YEAR_GROUP2]) {
            year = match[YEAR_GROUP] || match[YEAR_GROUP2];
            year = parseInt(year);

            var yearBE = match[YEAR_BE_GROUP] || match[YEAR_BE_GROUP2];
            if (yearBE) {
                if (/BE/i.test(yearBE)) {
                    // Buddhist Era
                    year = year - 543;
                } else if (/BC/i.test(yearBE)) {
                    // Before Christ
                    year = -year;
                }
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
            var endDate = match[DATE_TO_NUM_GROUP] ?
                endDate = parseInt(match[DATE_TO_NUM_GROUP]) :
                util.ORDINAL_WORDS[match[DATE_TO_GROUP].replace('-', ' ').trim().toLowerCase()];

            result.end = result.start.clone();
            result.end.assign('day', endDate);
        }

        result.tags['ENMonthNameMiddleEndianParser'] = true;
        return result;
    }
};
},{"../../result":64,"../../utils/EN":66,"../parser":49,"moment":2}],19:[function(require,module,exports){
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
        '[,-]?\\s*([0-9]{4})(\\s*BE|AD|BC)?' +
    ')?' +
    '(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)', 'i');

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
                if (match[YEAR_BE_GROUP].match(/BE/)) {
                    // Buddhist Era
                    year = year - 543;
                } else if (match[YEAR_BE_GROUP].match(/BC/)) {
                    // Before Christ
                    year = -year;
                }

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

},{"../../result":64,"../../utils/EN":66,"../parser":49,"moment":2}],20:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/EN');

var PATTERN = new RegExp('(\\W|^)' +
    '(next|last|past)\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|[0-9]+|few|half(?:\\s*an?)?)?\\s*' +
    '(seconds?|min(?:ute)?s?|hours?|days?|weeks?|months?|years?)(?=\\s*)' +
    '(?=\\W|$)', 'i'
);

var MODIFIER_WORD_GROUP = 2;
var MULTIPLIER_WORD_GROUP = 3;
var RELATIVE_WORD_GROUP = 4;

exports.Parser = function ENRelativeDateFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; };

    this.extract = function(text, ref, match, opt){

        var index = match.index + match[1].length;
        var modifier = match[MODIFIER_WORD_GROUP].toLowerCase().match(/^next/) ? 1 : -1;
        var text  = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });
        result.tags['ENRelativeDateFormatParser'] = true;

        var num = match[MULTIPLIER_WORD_GROUP] === undefined ? '' : match[3].toLowerCase();
        if (util.INTEGER_WORDS[num] !== undefined) {
            num = util.INTEGER_WORDS[num];
        } else if (num === ''){
            num = 1;
        } else if (num.match(/few/i)){
            num = 3;
        } else if (num.match(/half/i)) {
            num = 0.5;
        } else {
            num = parseInt(num);
        }

        num *= modifier;

        var date = moment(ref);
        if (match[RELATIVE_WORD_GROUP].match(/day|week|month|year/i)) {

            if (match[RELATIVE_WORD_GROUP].match(/day/i)) {
                date.add(num, 'd');
                result.start.assign('year', date.year());
                result.start.assign('month', date.month() + 1);
                result.start.assign('day', date.date());
            } else if (match[RELATIVE_WORD_GROUP].match(/week/i)) {
                date.add(num * 7, 'd');
                // We don't know the exact date for next/last week so we imply
                // them
                result.start.imply('day', date.date());
                result.start.imply('month', date.month() + 1);
                result.start.imply('year', date.year());
            } else if (match[RELATIVE_WORD_GROUP].match(/month/i)) {
                date.add(num, 'month');
                // We don't know the exact day for next/last month
                result.start.imply('day', date.date());
                result.start.assign('year', date.year());
                result.start.assign('month', date.month() + 1);
            } else if (match[RELATIVE_WORD_GROUP].match(/year/i)) {
                date.add(num, 'year');
                // We don't know the exact day for month on next/last year
                result.start.imply('day', date.date());
                result.start.imply('month', date.month() + 1);
                result.start.assign('year', date.year());
            }

            return result;
        }

        if (match[RELATIVE_WORD_GROUP].match(/hour/i)) {

            date.add(num, 'hour');
            result.start.imply('minute', date.minute());
            result.start.imply('second', date.second());

        } else if (match[RELATIVE_WORD_GROUP].match(/min/i)) {

            date.add(num, 'minute');
            result.start.assign('minute', date.minute());
            result.start.imply('second', date.second());

        } else if (match[RELATIVE_WORD_GROUP].match(/second/i)) {

            date.add(num, 'second');
            result.start.assign('second', date.second());
            result.start.assign('minute', date.minute());
        }

        result.start.assign('hour', date.hour());
        result.start.assign('year', date.year());
        result.start.assign('month', date.month() + 1);
        result.start.assign('day', date.date());
        return result;
    };
};

},{"../../result":64,"../../utils/EN":66,"../parser":49,"moment":2}],21:[function(require,module,exports){
/*
    Date format with slash "/" (also "-" and ".") between numbers
    - Tuesday 11/3/2015 
    - 11/3/2015
    - 11/3

    By default the paser us "middle-endien" format (US English),
    then fallback to little-endian if failed.
    - 11/3/2015 = November 3rd, 2015
    - 23/4/2015 = April 23th, 2015

    If "littleEndian" config is set, the parser will try the little-endian first. 
    - 11/3/2015 = March 11th, 2015
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp('(\\W|^)' +
    '(?:' +
        '(?:on\\s*?)?' +
        '((?:sun|mon|tues?|wed(?:nes)?|thu(?:rs?)?|fri|sat(?:ur)?)(?:day)?)' +
        '\\s*\\,?\\s*' +
    ')?' +
    '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' +
    '(?:' +
        '[\\/\\.\\-]' +
        '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' +
    ')?' +
    '(\\W|$)', 'i');

var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thur': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6,}


var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;

var WEEKDAY_GROUP = 2;


var FIRST_NUMBERS_GROUP = 3;
var SECOND_NUMBERS_GROUP = 4;

var YEAR_GROUP = 5;

exports.Parser = function ENSlashDateFormatParser(config) {
    Parser.apply(this, arguments);
    config = config || {};
    var littleEndian  = config.littleEndian;
    var MONTH_GROUP = littleEndian ? SECOND_NUMBERS_GROUP : FIRST_NUMBERS_GROUP;
    var DAY_GROUP = littleEndian ? FIRST_NUMBERS_GROUP : SECOND_NUMBERS_GROUP;

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

},{"../../result":64,"../parser":49,"moment":2}],22:[function(require,module,exports){
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

},{"../../result":64,"../parser":49,"moment":2}],23:[function(require,module,exports){
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

},{"../../result":64,"../parser":49,"moment":2}],24:[function(require,module,exports){
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

},{"../../result":64,"../../utils/EN":66,"../parser":49,"moment":2}],25:[function(require,module,exports){
/*

*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var ParsedComponents = require('../../result').ParsedComponents;

var FIRST_REG_PATTERN  = new RegExp("(^|\\s|T)" +
    "(?:(?:at|from)\\s*)??" + 
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

            var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if(ampm == "a"){
                meridiem = 0; 
                if(hour == 12) {
                    hour = 0;
                    if (!result.end.isCertain('day')) {
                        result.end.imply('day', result.end.get('day') + 1);
                    }
                }
            }
            
            if(ampm == "p"){
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

},{"../../result":64,"../parser":49,"moment":2}],26:[function(require,module,exports){
/*


*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'tues':2, 'tue':2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thurs':4, 'thur': 4, 'thu': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6};

var PATTERN = new RegExp('(\\W|^)' +
    '(?:(?:\\,|\\(|\\（)\\s*)?' +
    '(?:on\\s*?)?' +
    '(?:(this|last|past|next)\\s*)?' +
    '(' + Object.keys(DAYS_OFFSET).join('|') + ')' +
    '(?:\\s*(?:\\,|\\)|\\）))?' +
    '(?:\\s*(this|last|past|next)\\s*week)?' +
    '(?=\\W|$)', 'i');

var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;


exports.updateParsedComponent = function updateParsedComponent(result, ref, offset, modifier) {

    var startMoment = moment(ref);
    var startMomentFixed = false;
    var refOffset = startMoment.day();

    if(modifier == 'last' || modifier == 'past') {
        startMoment.day(offset - 7);
        startMomentFixed = true;
    } else if(modifier == 'next') {
        startMoment.day(offset + 7);
        startMomentFixed = true;
    } else if(modifier == 'this') {
        startMoment.day(offset);
    } else {
        if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
            startMoment.day(offset - 7);
        } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
            startMoment.day(offset + 7);
        } else {
            startMoment.day(offset);
        }
    }

    result.start.assign('weekday', offset);
    if (startMomentFixed) {
        result.start.assign('day', startMoment.date());
        result.start.assign('month', startMoment.month() + 1);
        result.start.assign('year', startMoment.year());
    } else {
        result.start.imply('day', startMoment.date());
        result.start.imply('month', startMoment.month() + 1);
        result.start.imply('year', startMoment.year());
    }

    return result;
};


exports.Parser = function ENWeekdayParser() {
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; };

    this.extract = function(text, ref, match, opt){
        var index = match.index + match[1].length;
        var text = match[0].substr(match[1].length, match[0].length - match[1].length);
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        var offset = DAYS_OFFSET[dayOfWeek];
        if(offset === undefined) {
            return null;
        }

        var prefix = match[PREFIX_GROUP];
        var postfix = match[POSTFIX_GROUP];
        var norm = prefix || postfix;
        norm = norm || '';
        norm = norm.toLowerCase();

        exports.updateParsedComponent(result, ref, offset, norm);
        result.tags['ENWeekdayParser'] = true;

        return result;
    }
};

},{"../../result":64,"../parser":49,"moment":2}],27:[function(require,module,exports){
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

},{"../../result":64,"../parser":49,"moment":2}],28:[function(require,module,exports){
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

},{"../../result":64,"../parser":49,"moment":2}],29:[function(require,module,exports){
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
        '(?:\\s*(?:del?)?(\\s*[0-9]{1,4}(?![^\\s]\\d))(\\s*[ad]\\.?\\s*c\\.?|a\\.?\\s*d\\.?)?)?' +
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
                if (/a\.?\s*c\.?/i.test(match[YEAR_BE_GROUP])) {
                    // antes de Cristo
                    year = -year;
                }
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
},{"../../result":64,"../../utils/ES":67,"../parser":49,"moment":2}],30:[function(require,module,exports){
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
    '([0-1]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' +
    '(?:' +
        '[\\/\\.\\-]' +
        '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' +
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
                year = year + 1900;
            }else{
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

        result.tags['ESSlashDateFormatParser'] = true;
        return result;
    };
};
},{"../../result":64,"../parser":49,"moment":2}],31:[function(require,module,exports){
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

},{"../../result":64,"../parser":49,"moment":2}],32:[function(require,module,exports){
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

},{"../../result":64,"../parser":49,"moment":2}],33:[function(require,module,exports){
/*


*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var updateParsedComponent = require('../EN/ENWeekdayParser').updateParsedComponent;

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
            ref: ref
        });

        var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        var offset = DAYS_OFFSET[dayOfWeek];
        if(offset === undefined) return null;

        var modifier = null;
        var prefix = match[PREFIX_GROUP];
        var postfix = match[POSTFIX_GROUP];
        if (prefix || postfix) {
            var norm = prefix || postfix;
            norm = norm.toLowerCase();

            if(norm == 'pasado') {
                modifier = 'this';
            }
            else if(norm == 'próximo' || norm == 'proximo') {
                modifier = 'next';
            }
            else if(norm== 'este') {
                modifier =  'this';
            }
        }

        updateParsedComponent(result, ref, offset, modifier);
        result.tags['ESWeekdayParser'] = true;
        return result;
    }
}

},{"../../result":64,"../EN/ENWeekdayParser":26,"../parser":49,"moment":2}],34:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)(maintenant|aujourd'hui|ajd|cette\s*nuit|la\s*veille|(demain|hier)(\s*(matin|soir|aprem|après-midi))?|ce\s*(matin|soir)|cet\s*(après-midi|aprem))(?=\W|$)/i;

exports.Parser = function FRCasualDateParser(){

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

        if(lowerText.match(/demain/)){
            // Check not "Tomorrow" on late night
            if(refMoment.hour() > 1) {
                startMoment.add(1, 'day');
            }
        } 

        if(lowerText.match(/hier/)) {
            startMoment.add(-1, 'day');
        }

        if(lowerText.match(/cette\s*nuit/)){
            // Normally means this coming midnight
            result.start.imply('hour', 22);
            result.start.imply('meridiem', 1);

        } else if(lowerText.match(/la\s*veille/)) {

            result.start.imply('hour', 0);
            if (refMoment.hour() > 6) {
                startMoment.add(-1, 'day');
            }

        } else if (lowerText.match(/(après-midi|aprem)/)) {

            result.start.imply('hour', 14);

        } else if (lowerText.match(/(soir)/)) {

            result.start.imply('hour', 18);

        } else if (lowerText.match(/matin/)) {

            result.start.imply('hour', 8);

        }  else if (lowerText.match("maintenant")) {

          result.start.imply('hour', refMoment.hour());
          result.start.imply('minute', refMoment.minute());
          result.start.imply('second', refMoment.second());
          result.start.imply('millisecond', refMoment.millisecond());

        }

        result.start.assign('day', startMoment.date())
        result.start.assign('month', startMoment.month() + 1)
        result.start.assign('year', startMoment.year())
        result.tags['FRCasualDateParser'] = true;
        return result;
    }
}

},{"../../result":64,"../parser":49,"moment":2}],35:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/FR');

var PATTERN = new RegExp('(\\W|^)' +
    '(dans|en)\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|[0-9]+|une?|(?:\\s*quelques)?|demi(?:\\s*|-?)?)\\s*' +
    '(secondes?|min(?:ute)?s?|heures?|jours?|semaines?|mois|années?)\\s*' +
    '(?=\\W|$)', 'i'
);

var STRICT_PATTERN = new RegExp('(\\W|^)' +
    '(dans|en)\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|[0-9]+|un?)\\s*' +
    '(secondes?|minutes?|heures?|jours?)\\s*' +
    '(?=\\W|$)', 'i'
);

exports.Parser = function FRDeadlineFormatParser(){
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

        var num = match[3];
        if (util.INTEGER_WORDS[num] !== undefined) {
            num = util.INTEGER_WORDS[num];
        } else if (num === 'un' || num === 'une'){
            num = 1;
        } else if (num.match(/quelques?/i)){
            num = 3;
        } else if (num.match(/demi-?/i)) {
            num = 0.5;
        } else {
            num = parseInt(num);
        }

        var date = moment(ref);
        if (match[4].match(/jour|semaine|mois|année/i)) {

            if (match[4].match(/jour/)) {
                date.add(num, 'd');
            } else if (match[4].match(/semaine/i)) {
                date.add(num * 7, 'd');
            } else if (match[4].match(/mois/i)) {
                date.add(num, 'month');
            } else if (match[4].match(/année/i)) {
                date.add(num, 'year');
            }

            result.start.assign('year', date.year());
            result.start.assign('month', date.month() + 1);
            result.start.assign('day', date.date());
            return result;
        }

        if (match[4].match(/heure/i)) {

            date.add(num, 'hour');

        } else if (match[4].match(/min/i)) {

            date.add(num, 'minutes');

        } else if (match[4].match(/secondes/i)) {

            date.add(num, 'second');
        }

        result.start.imply('year', date.year());
        result.start.imply('month', date.month() + 1);
        result.start.imply('day', date.date());
        result.start.assign('hour', date.hour());
        result.start.assign('minute', date.minute());
        result.start.assign('second', date.second());
        result.tags['FRDeadlineFormatParser'] = true;
        return result;
    };
};

},{"../../result":64,"../../utils/FR":68,"../parser":49,"moment":2}],36:[function(require,module,exports){
/*


*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var util  = require('../../utils/FR');

var DAYS_OFFSET = util.WEEKDAY_OFFSET;

var PATTERN = new RegExp('(\\W|^)' +
        '(?:(Dimanche|Lundi|Mardi|mercredi|Jeudi|Vendredi|Samedi|Dim|Lun|Mar|Mer|Jeu|Ven|Sam)\\s*,?\\s*)?' +
        '([0-9]{1,2}|1er)' +
        '(?:\\s*(?:au|\\-|\\–|jusqu\'au?|\\s)\\s*([0-9]{1,2})(?:er)?)?\\s*(?:de)?\\s*' +
        '(Jan(?:vier|\\.)?|F[ée]v(?:rier|\\.)?|Mars|Avr(?:il|\\.)?|Mai|Juin|Juil(?:let|\\.)?|Ao[uû]t|Sept(?:embre|\\.)?|Oct(?:obre|\\.)?|Nov(?:embre|\\.)?|d[ée]c(?:embre|\\.)?)' +
        '(?:\\s*(\\s*[0-9]{1,4}(?![^\\s]\\d))(?:\\s*(AC|[ap]\\.?\\s*c(?:h(?:r)?)?\\.?\\s*n\\.?))?)?' +
        '(?=\\W|$)', 'i'
    );

var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function FRMonthNameLittleEndianParser(){
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
                if (/a/i.test(match[YEAR_BE_GROUP])) {
                    // Ante Christe natum
                    year = -year;
                }
            } else if (year < 100){

                year = year + 2000;
            }
        }

        if(year){
            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.assign('year', year);
        } else {

            // Find the most appropriated year
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

        // Text can be 'range' value. Such as '12 - 13 janvier 2012'
        if (match[DATE_TO_GROUP]) {
            result.end = result.start.clone();
            result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
        }

        result.tags['FRMonthNameLittleEndianParser'] = true;
        return result;
    };
}

},{"../../result":64,"../../utils/FR":68,"../parser":49,"moment":2}],37:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/FR');

// Load fr localization data from moment
require('moment/locale/fr');

var PATTERN = new RegExp('(\\W|^)' +
    '(?:les?|la|l\'|du|des?)\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|\\d+)?\\s*' +
    '(prochaine?s?|derni[eè]re?s?|pass[ée]e?s?|pr[ée]c[ée]dents?|suivante?s?)?\\s*' +
    '(secondes?|min(?:ute)?s?|heures?|jours?|semaines?|mois|trimestres?|années?)\\s*' +
    '(prochaine?s?|derni[eè]re?s?|pass[ée]e?s?|pr[ée]c[ée]dents?|suivante?s?)?' +
    '(?=\\W|$)', 'i'
);

var MULTIPLIER_GROUP = 2;
var MODIFIER_1_GROUP = 3;
var RELATIVE_WORD_GROUP = 4;
var MODIFIER_2_GROUP = 5;

exports.Parser = function FRRelativeDateFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; };

    this.extract = function(text, ref, match, opt){
        var index = match.index + match[1].length;
        var text  = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);

        // Multiplier
        var multiplier = match[MULTIPLIER_GROUP] === undefined ? '1' : match[MULTIPLIER_GROUP];
        if (util.INTEGER_WORDS[multiplier] !== undefined) {
            multiplier = util.INTEGER_WORDS[multiplier];
        } else {
            multiplier = parseInt(multiplier);
        }

        // Modifier
        var modifier = match[MODIFIER_1_GROUP] === undefined ?
                    (match[MODIFIER_2_GROUP] === undefined ? '' : match[MODIFIER_2_GROUP].toLowerCase())
                     : match[MODIFIER_1_GROUP].toLowerCase();
        if(!modifier) {
            // At least one modifier is mandatory to match this parser
            return;
        }

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });
        result.tags['FRRelativeDateFormatParser'] = true;

        var modifierFactor;
        switch(true) {
            case /prochaine?s?/.test(modifier):
            case /suivants?/.test(modifier):
                modifierFactor = 1;
                break;
            case /derni[eè]re?s?/.test(modifier):
            case /pass[ée]e?s?/.test(modifier):
            case /pr[ée]c[ée]dents?/.test(modifier):
                modifierFactor = -1;
                break;
        }

        var total = multiplier * modifierFactor;

        var dateFrom = moment(ref),
            dateTo = moment(ref);
        dateFrom.locale('fr');
        dateTo.locale('fr');
        var relative = match[RELATIVE_WORD_GROUP];
        var startOf;
        switch(true) {
            case /secondes?/.test(relative):
                dateFrom.add(total, 's');
                dateTo.add(modifierFactor, 's');
                startOf = 'second';
                break;
            case /min(?:ute)?s?/.test(relative):
                dateFrom.add(total, 'm');
                dateTo.add(modifierFactor, 'm');
                startOf = 'minute';
                break;
            case /heures?/.test(relative):
                dateFrom.add(total, 'h');
                dateTo.add(modifierFactor, 'h');
                startOf = 'hour';
                break;
            case /jours?/.test(relative):
                dateFrom.add(total, 'd');
                dateTo.add(modifierFactor, 'd');
                startOf = 'day';
                break;
            case /semaines?/.test(relative):
                dateFrom.add(total, 'w');
                dateTo.add(modifierFactor, 'w');
                startOf = 'week';
                break;
            case /mois?/.test(relative):
                dateFrom.add(total, 'M');
                dateTo.add(modifierFactor, 'M');
                startOf = 'month';
                break;
            case /trimestres?/.test(relative):
                dateFrom.add(total, 'Q');
                dateTo.add(modifierFactor, 'Q');
                startOf = 'quarter';
                break;
            case /années?/.test(relative):
                dateFrom.add(total, 'y');
                dateTo.add(modifierFactor, 'y');
                startOf = 'year';
                break;
        }

        // if we go forward, switch the start and end dates
        if(modifierFactor > 0) {
            var dateTmp = dateFrom;
            dateFrom = dateTo;
            dateTo = dateTmp;
        }

        // Get start and end of dates
        dateFrom.startOf(startOf);
        dateTo.endOf(startOf);

        // Assign results
        result.start.assign('year', dateFrom.year());
        result.start.assign('month', dateFrom.month() + 1);
        result.start.assign('day', dateFrom.date());
        result.start.assign('minute', dateFrom.minute());
        result.start.assign('second', dateFrom.second());
        result.start.assign('hour', dateFrom.hour());
        result.start.assign('millisecond', dateFrom.millisecond());

        result.end = result.start.clone();
        result.end.assign('year', dateTo.year());
        result.end.assign('month', dateTo.month() + 1);
        result.end.assign('day', dateTo.date());
        result.end.assign('minute', dateTo.minute());
        result.end.assign('second', dateTo.second());
        result.end.assign('hour', dateTo.hour());
        result.end.assign('millisecond', dateTo.millisecond());
        return result;
    };
};

},{"../../result":64,"../../utils/FR":68,"../parser":49,"moment":2,"moment/locale/fr":1}],38:[function(require,module,exports){
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
        '((?:dimanche|dim|lundi|lun|mardi|mar|mercredi|mer|jeudi|jeu|vendredi|ven|samedi|sam|le))' +
        '\\s*\\,?\\s*' +
    ')?' +
    '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' +
    '(?:' +
        '[\\/\\.\\-]' +
        '([0-9]{4}\s*\,?\s*|[0-9]{2}\s*\,?\s*)' +
    ')?' +
    '(\\W|$)', 'i');

var DAYS_OFFSET = { 'dimanche': 0, 'dim': 0, 'lundi': 1, 'lun': 1,'mardi': 2, 'mar':2, 'mercredi': 3, 'mer': 3,
    'jeudi': 4, 'jeu':4, 'vendredi': 5, 'ven': 5,'samedi': 6, 'sam': 6};


var OPENNING_GROUP = 1;
var ENDING_GROUP = 6;

// In French we use day/month/year
var WEEKDAY_GROUP = 2;
var DAY_GROUP = 3;
var MONTH_GROUP = 4;
var YEAR_GROUP = 5;

exports.Parser = function FRSlashDateFormatParser(argument) {
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

        day  = parseInt(day);
        month = parseInt(month);
        year = parseInt(year);

        if(month < 1 || month > 12) {
            if(month > 12) {
                // dd/mm/yyyy date format if day looks like a month, and month looks like a day.
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
                year = year + 1900;
            }else{
                year = year + 2000;
            }
        }

        result.start.assign('day', day);
        result.start.assign('month', month);
        result.start.assign('year', year);

        // Day of week
        if(match[WEEKDAY_GROUP]) {
            result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
        }

        result.tags['FRSlashDateFormatParser'] = true;
        return result;
    };
};
},{"../../result":64,"../parser":49,"moment":2}],39:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)il y a\s*([0-9]+|une?)\s*(minutes?|heures?|semaines?|jours?|mois|années?|ans?)(?=(?:\W|$))/i;

exports.Parser = function FRTimeAgoFormatParser(){
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
        result.tags['FRTimeAgoFormatParser'] = true;
        
        var num = parseInt(match[2]);
        if (isNaN(num)) {
          if (match[2].match(/demi/)) {
            num = 0.5;
          } else {
            num = 1;
          }
        }

        var date = moment(ref);

        if (match[3].match(/heure/) || match[3].match(/minute/)) {
            if (match[3].match(/heure/)) {

                date.add(-num, 'hour');

            } else if (match[3].match(/minute/)) {

                date.add(-num, 'minute');
            }

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.assign('hour', date.hour());
            result.start.assign('minute', date.minute());

            return result;
        }

        if (match[3].match(/semaine/)) {
            date.add(-num, 'week');

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.imply('weekday', date.day());
            return result;
        }

        if (match[3].match(/jour/)) {
            date.add(-num, 'd');
        }

        if (match[3].match(/mois/)) {
            date.add(-num, 'month');
        }

        if (match[3].match(/années?|ans?/)) {

            date.add(-num, 'year');
        }

        result.start.assign('day', date.date());
        result.start.assign('month', date.month() + 1);
        result.start.assign('year', date.year());
        return result;

    };
}

},{"../../result":64,"../parser":49,"moment":2}],40:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var ParsedComponents = require('../../result').ParsedComponents;

var FIRST_REG_PATTERN  = new RegExp("(^|\\s|T)" +
    "(?:(?:[àa])\\s*)?" +
    "(\\d{1,2}(?:h)?|midi|minuit)" +
    "(?:" +
        "(?:\\.|\\:|\\：|h)(\\d{1,2})(?:m)?" +
        "(?:" +
            "(?:\\:|\\：|m)(\\d{0,2})(?:s)?" +
        ")?" +
    ")?" +
    "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" +
    "(?=\\W|$)", 'i');


var SECOND_REG_PATTERN = new RegExp("^\\s*" +
    "(\\-|\\–|\\~|\\〜|[àa]|\\?)\\s*" +
    "(\\d{1,2}(?:h)?)" +
    "(?:" +
        "(?:\\.|\\:|\\：|h)(\\d{1,2})(?:m)?" +
        "(?:" +
            "(?:\\.|\\:|\\：|m)(\\d{1,2})(?:s)?" +
        ")?" +
    ")?" +
    "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" +
    "(?=\\W|$)", 'i');

var HOUR_GROUP    = 2;
var MINUTE_GROUP  = 3;
var SECOND_GROUP  = 4;
var AM_PM_HOUR_GROUP = 5;

exports.Parser = function FRTimeExpressionParser(){
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
        result.tags['FRTimeExpressionParser'] = true;

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
        if (match[HOUR_GROUP].toLowerCase() == "midi"){
            meridiem = 1;
            hour = 12;
        } else if (match[HOUR_GROUP].toLowerCase() == "minuit") {
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

},{"../../result":64,"../parser":49,"moment":2}],41:[function(require,module,exports){
/*


*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var updateParsedComponent = require('../EN/ENWeekdayParser').updateParsedComponent;

var DAYS_OFFSET = { 'dimanche': 0, 'dim': 0, 'lundi': 1, 'lun': 1,'mardi': 2, 'mar':2, 'mercredi': 3, 'mer': 3,
    'jeudi': 4, 'jeu':4, 'vendredi': 5, 'ven': 5,'samedi': 6, 'sam': 6};

var PATTERN = new RegExp('(\\s|^)' +
    '(?:(?:\\,|\\(|\\（)\\s*)?' +
    '(?:(ce)\\s*)?' +
    '(' + Object.keys(DAYS_OFFSET).join('|') + ')' +
    '(?:\\s*(?:\\,|\\)|\\）))?' +
    '(?:\\s*(dernier|prochain)\\s*)?' +
    '(?=\\W|$)', 'i');

var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;

exports.Parser = function FRWeekdayParser() {
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; };

    this.extract = function(text, ref, match, opt){
        var index = match.index + match[1].length;
        var text = match[0].substr(match[1].length, match[0].length - match[1].length);
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        var offset = DAYS_OFFSET[dayOfWeek];
        if(offset === undefined) return null;

        var modifier = null;
        var prefix = match[PREFIX_GROUP];
        var postfix = match[POSTFIX_GROUP];
        if (prefix || postfix) {
            var norm = prefix || postfix;
            norm = norm.toLowerCase();

            if(norm == 'dernier') {
                modifier = 'last';
            } else if(norm == 'prochain') {
                modifier = 'next';
            } else if(norm== 'ce') {
                modifier = 'this';
            }
        }

        updateParsedComponent(result, ref, offset, modifier);
        result.tags['FRWeekdayParser'] = true;
        return result;
    }
};


},{"../../result":64,"../EN/ENWeekdayParser":26,"../parser":49,"moment":2}],42:[function(require,module,exports){
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


},{"../../result":64,"../parser":49,"moment":2}],43:[function(require,module,exports){
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


},{"../../result":64,"../../utils/JP":69,"../parser":49,"moment":2}],44:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp(
    '(而家|立(?:刻|即)|即刻)|' +
    '(今|明|聽|昨|尋|琴)(早|朝|晚)|' +
    '(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|' +
    '(今|明|聽|昨|尋|琴)(?:日|天)' +
    '(?:[\\s|,|，]*)' +
    '(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?', 'i');

var NOW_GROUP = 1;
var DAY_GROUP_1 = 2;
var TIME_GROUP_1 = 3;
var TIME_GROUP_2 = 4;
var DAY_GROUP_3 = 5;
var TIME_GROUP_3 = 6;

exports.Parser = function ZHHantCasualDateParser() {

    Parser.apply(this, arguments);

    this.pattern = function() {
        return PATTERN;
    };

    this.extract = function(text, ref, match, opt) {
        text = match[0];
        var index = match.index;
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var refMoment = moment(ref);
        var startMoment = refMoment.clone();

        if (match[NOW_GROUP]) {
            result.start.imply('hour', refMoment.hour());
            result.start.imply('minute', refMoment.minute());
            result.start.imply('second', refMoment.second());
            result.start.imply('millisecond', refMoment.millisecond());
        } else if (match[DAY_GROUP_1]) {
            var day1 = match[DAY_GROUP_1];
            var time1 = match[TIME_GROUP_1];

            if (day1 == '明' || day1 == '聽') {
              // Check not "Tomorrow" on late night
              if(refMoment.hour() > 1) {
                  startMoment.add(1, 'day');
              }
            } else if (day1 == '昨' || day1 == '尋' || day1 == '琴') {
                startMoment.add(-1, 'day');
            }

            if (time1 == '早' || time1 == '朝') {
                result.start.imply('hour', 6);
            } else if (time1 == '晚') {
                result.start.imply('hour', 22);
                result.start.imply('meridiem', 1);
            }

        } else if (match[TIME_GROUP_2]) {
            var timeString2 = match[TIME_GROUP_2];
            var time2 = timeString2[0];
            if (time2 == '早' || time2 == '朝' || time2 == '上') {
                result.start.imply('hour', 6);
            } else if (time2 == '下' || time2 == '晏') {
                result.start.imply('hour', 15);
                result.start.imply('meridiem', 1);
            } else if (time2 == '中') {
                result.start.imply('hour', 12);
                result.start.imply('meridiem', 1);
            } else if (time2 == '夜' || time2 == '晚') {
                result.start.imply('hour', 22);
                result.start.imply('meridiem', 1);
            } else if (time2 == '凌') {
                result.start.imply('hour', 0);
            }

        } else if (match[DAY_GROUP_3]) {
            var day3 = match[DAY_GROUP_3];

            if (day3 == '明' || day3 == '聽') {
              // Check not "Tomorrow" on late night
              if(refMoment.hour() > 1) {
                  startMoment.add(1, 'day');
              }
            } else if (day3 == '昨' || day3 == '尋' || day3 == '琴') {
                startMoment.add(-1, 'day');
            }


            var timeString3 = match[TIME_GROUP_3];
            if (timeString3) {
                var time3 = timeString3[0];
                if (time3 == '早' || time3 == '朝' || time3 == '上') {
                    result.start.imply('hour', 6);
                } else if (time3 == '下' || time3 == '晏') {
                    result.start.imply('hour', 15);
                    result.start.imply('meridiem', 1);
                } else if (time3 == '中') {
                    result.start.imply('hour', 12);
                    result.start.imply('meridiem', 1);
                } else if (time3 == '夜' || time3 == '晚') {
                    result.start.imply('hour', 22);
                    result.start.imply('meridiem', 1);
                } else if (time3 == '凌') {
                    result.start.imply('hour', 0);
                }
            }
        }

        result.start.assign('day', startMoment.date())
        result.start.assign('month', startMoment.month() + 1)
        result.start.assign('year', startMoment.year())
        result.tags.ZHHantCasualDateParser = true;
        return result;
    };
};

},{"../../result":64,"../parser":49,"moment":2}],45:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var util = require('../../utils/ZH-Hant.js');

var PATTERN = new RegExp(
    '(\\d{2,4}|[' + Object.keys(util.NUMBER).join('') + ']{2,4})?' +
    '(?:\\s*)' +
    '(?:年)?' +
    '(?:[\\s|,|，]*)' +
    '(\\d{1,2}|[' + Object.keys(util.NUMBER).join('') + ']{1,2})' +
    '(?:\\s*)' +
    '(?:月)' +
    '(?:\\s*)' +
    '(\\d{1,2}|[' + Object.keys(util.NUMBER).join('') + ']{1,2})?' +
    '(?:\\s*)' +
    '(?:日|號)?'
);

var YEAR_GROUP = 1;
var MONTH_GROUP = 2;
var DAY_GROUP = 3;

exports.Parser = function ZHHantDateParser() {

    Parser.apply(this, arguments);

    this.pattern = function() {
        return PATTERN;
    };

    this.extract = function(text, ref, match, opt) {
        var startMoment = moment(ref);
        var result = new ParsedResult({
            text: match[0],
            index: match.index,
            ref: ref,
        });

        //Month
        var month = parseInt(match[MONTH_GROUP]);
        if (isNaN(month)) month = util.zhStringToNumber(match[MONTH_GROUP]);
        result.start.assign('month', month);

        //Day
        if (match[DAY_GROUP]) {
            var day = parseInt(match[DAY_GROUP]);
            if (isNaN(day)) day = util.zhStringToNumber(match[DAY_GROUP]);
            result.start.assign('day', day);
        } else {
            result.start.imply('day', startMoment.date());
        }

        //Year
        if (match[YEAR_GROUP]) {
            var year = parseInt(match[YEAR_GROUP]);
            if (isNaN(year)) year = util.zhStringToYear(match[YEAR_GROUP]);
            result.start.assign('year', year);
        } else {
            result.start.imply('year', startMoment.year());
        }

        result.tags.ZHHantDateParser = true;
        return result;
    };
};

},{"../../result":64,"../../utils/ZH-Hant.js":70,"../parser":49,"moment":2}],46:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var util = require('../../utils/ZH-Hant.js');

var PATTERN = new RegExp(
    '(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+|半|幾)(?:\\s*)' +
    '(?:個)?' +
    '(秒(?:鐘)?|分鐘|小時|鐘|日|天|星期|禮拜|月|年)' +
    '(?:(?:之|過)?後|(?:之)?內)', 'i'
);

var NUMBER_GROUP = 1;
var UNIT_GROUP = 2;

exports.Parser = function ZHHantCasualDateParser() {

    Parser.apply(this, arguments);

    this.pattern = function() {
        return PATTERN;
    };

    this.extract = function(text, ref, match, opt) {
      var index = match.index;
      text  = match[0];

      var result = new ParsedResult({
          index: index,
          text: text,
          ref: ref
      });

      var number = parseInt(match[NUMBER_GROUP]);
      if (isNaN(number)){
        number = util.zhStringToNumber(match[NUMBER_GROUP]);
      }

      if (isNaN(number)){
        var string = match[NUMBER_GROUP];
        if (string === '幾'){
          number = 3;
        }else if(string === '半'){
          number = 0.5;
        }else{

          //just in case
          return null;
        }
      }

      var date = moment(ref);
      var unit = match[UNIT_GROUP];
      var unitAbbr = unit[0];

      if (unitAbbr.match(/[日天星禮月年]/)){
        if(unitAbbr == '日' || unitAbbr == '天'){
          date.add(number, 'd');
        }else if(unitAbbr == '星' || unitAbbr == '禮'){
          date.add(number * 7, 'd');
        }else if(unitAbbr == '月'){
          date.add(number, 'month');
        }else if(unitAbbr == '年'){
          date.add(number, 'year');
        }

        result.start.assign('year', date.year());
        result.start.assign('month', date.month() + 1);
        result.start.assign('day', date.date());
        return result;
      }

      if(unitAbbr == '秒'){
        date.add(number, 'second');
      }else if(unitAbbr == '分'){
        date.add(number, 'minute');
      }else if(unitAbbr == '小' || unitAbbr == '鐘'){
        date.add(number, 'hour');
      }

      result.start.imply('year', date.year());
      result.start.imply('month', date.month() + 1);
      result.start.imply('day', date.date());
      result.start.assign('hour', date.hour());
      result.start.assign('minute', date.minute());
      result.start.assign('second', date.second());
      result.tags.ZHHantDeadlineFormatParser = true;
      return result;
    };
};

},{"../../result":64,"../../utils/ZH-Hant.js":70,"../parser":49,"moment":2}],47:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var ParsedComponents = require('../../result').ParsedComponents;

var util = require('../../utils/ZH-Hant.js');

var patternString1 = '(?:由|從|自)?' +
    '(?:' +
    '(今|明|聽|昨|尋|琴)(早|朝|晚)|' +
    '(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|' +
    '(今|明|聽|昨|尋|琴)(?:日|天)' +
    '(?:[\\s,，]*)' +
    '(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?' +
    ')?' +
    '(?:[\\s,，]*)' +
    '(?:(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)(?:\\s*)(?:點|時|:|：)' +
    '(?:\\s*)' +
    '(\\d+|半|正|整|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:分|:|：)?' +
    '(?:\\s*)' +
    '(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:秒)?)' +
    '(?:\\s*(A\.M\.|P\.M\.|AM?|PM?))?';

var patternString2 = '(?:\\s*(?:到|至|\\-|\\–|\\~|\\〜)\\s*)' +
    '(?:' +
    '(今|明|聽|昨|尋|琴)(早|朝|晚)|' +
    '(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|' +
    '(今|明|聽|昨|尋|琴)(?:日|天)' +
    '(?:[\\s,，]*)' +
    '(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?' +
    ')?' +
    '(?:[\\s,，]*)' +
    '(?:(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)(?:\\s*)(?:點|時|:|：)' +
    '(?:\\s*)' +
    '(\\d+|半|正|整|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:分|:|：)?' +
    '(?:\\s*)' +
    '(\\d+|[' + Object.keys(util.NUMBER).join('') + ']+)?(?:\\s*)(?:秒)?)' +
    '(?:\\s*(A\.M\.|P\.M\.|AM?|PM?))?';

var FIRST_REG_PATTERN = new RegExp(patternString1, 'i');
var SECOND_REG_PATTERN = new RegExp(patternString2, 'i');

var DAY_GROUP_1 = 1;
var ZH_AM_PM_HOUR_GROUP_1 = 2;
var ZH_AM_PM_HOUR_GROUP_2 = 3;
var DAY_GROUP_3 = 4;
var ZH_AM_PM_HOUR_GROUP_3 = 5;
var HOUR_GROUP = 6;
var MINUTE_GROUP = 7;
var SECOND_GROUP = 8;
var AM_PM_HOUR_GROUP = 9;

exports.Parser = function ZHHantTimeExpressionParser() {

    Parser.apply(this, arguments);

    this.pattern = function() {
        return FIRST_REG_PATTERN;
    };

    this.extract = function(text, ref, match, opt) {

        // This pattern can be overlaped Ex. [12] AM, 1[2] AM
        if (match.index > 0 && text[match.index - 1].match(/\w/)) return null;
        var refMoment = moment(ref);
        var result = new ParsedResult();
        result.ref = ref;
        result.index = match.index;
        result.text = match[0];
        result.tags.ZHTimeExpressionParser = true;

        var startMoment = refMoment.clone();

        // ----- Day
        if (match[DAY_GROUP_1]) {
            var day1 = match[DAY_GROUP_1];
            if (day1 == '明' || day1 == '聽') {
              // Check not "Tomorrow" on late night
              if(refMoment.hour() > 1) {
                  startMoment.add(1, 'day');
              }
            } else if (day1 == '昨' || day1 == '尋' || day1 == '琴') {
                startMoment.add(-1, 'day');
            }
            result.start.assign('day', startMoment.date());
            result.start.assign('month', startMoment.month() + 1);
            result.start.assign('year', startMoment.year());
        } else if (match[DAY_GROUP_3]) {
            var day3 = match[DAY_GROUP_3];
            if (day3 == '明' || day3 == '聽') {
                startMoment.add(1, 'day');
            } else if (day3 == '昨' || day3 == '尋' || day3 == '琴') {
                startMoment.add(-1, 'day');
            }
            result.start.assign('day', startMoment.date());
            result.start.assign('month', startMoment.month() + 1);
            result.start.assign('year', startMoment.year());
        } else {
            result.start.imply('day', startMoment.date());
            result.start.imply('month', startMoment.month() + 1);
            result.start.imply('year', startMoment.year());
        }

        var hour = 0;
        var minute = 0;
        var meridiem = -1;

        // ----- Second
        if (match[SECOND_GROUP]) {
            var second = parseInt(match[SECOND_GROUP]);
            if (isNaN(second)) {
                second = util.zhStringToNumber(match[SECOND_GROUP]);
            }
            if (second >= 60) return null;
            result.start.assign('second', second);
        }

        hour = parseInt(match[HOUR_GROUP]);
        if (isNaN(hour)) {
            hour = util.zhStringToNumber(match[HOUR_GROUP]);
        }

        // ----- Minutes
        if (match[MINUTE_GROUP]) {
            if (match[MINUTE_GROUP] == '半') {
                minute = 30;
            } else if (match[MINUTE_GROUP] == '正' || match[MINUTE_GROUP] == '整') {
                minute = 0;
            } else {
                minute = parseInt(match[MINUTE_GROUP]);
                if (isNaN(minute)) {
                    minute = util.zhStringToNumber(match[MINUTE_GROUP]);
                }
            }
        } else if (hour > 100) {
            minute = hour % 100;
            hour = parseInt(hour / 100);
        }

        if (minute >= 60) {
            return null;
        }

        if (hour > 24) {
            return null;
        }
        if (hour >= 12) {
            meridiem = 1;
        }

        // ----- AM & PM
        if (match[AM_PM_HOUR_GROUP]) {
            if (hour > 12) return null;
            var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if (ampm == "a") {
                meridiem = 0;
                if (hour == 12) hour = 0;
            }

            if (ampm == "p") {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (match[ZH_AM_PM_HOUR_GROUP_1]) {
            var zhAMPMString1 = match[ZH_AM_PM_HOUR_GROUP_1];
            var zhAMPM1 = zhAMPMString1[0];
            if (zhAMPM1 == '朝' || zhAMPM1 == '早') {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM1 == '晚') {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (match[ZH_AM_PM_HOUR_GROUP_2]) {
            var zhAMPMString2 = match[ZH_AM_PM_HOUR_GROUP_2];
            var zhAMPM2 = zhAMPMString2[0];
            if (zhAMPM2 == '上' || zhAMPM2 == '朝' || zhAMPM2 == '早' || zhAMPM2 == '凌') {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM2 == '下' || zhAMPM2 == '晏' || zhAMPM2 == '晚') {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (match[ZH_AM_PM_HOUR_GROUP_3]) {
            var zhAMPMString3 = match[ZH_AM_PM_HOUR_GROUP_3];
            var zhAMPM3 = zhAMPMString3[0];
            if (zhAMPM3 == '上' || zhAMPM3 == '朝' || zhAMPM3 == '早' || zhAMPM3 == '凌') {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM3 == '下' || zhAMPM3 == '晏' || zhAMPM3 == '晚') {
                meridiem = 1;
                if (hour != 12) hour += 12;
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

        var endMoment = startMoment.clone();
        result.end = new ParsedComponents(null, null);

        // ----- Day
        if (match[DAY_GROUP_1]) {
            var day1 = match[DAY_GROUP_1];
            if (day1 == '明' || day1 == '聽') {
              // Check not "Tomorrow" on late night
              if(refMoment.hour() > 1) {
                  endMoment.add(1, 'day');
              }
            } else if (day1 == '昨' || day1 == '尋' || day1 == '琴') {
                endMoment.add(-1, 'day');
            }
            result.end.assign('day', endMoment.date());
            result.end.assign('month', endMoment.month() + 1);
            result.end.assign('year', endMoment.year());
        } else if (match[DAY_GROUP_3]) {
            var day3 = match[DAY_GROUP_3];
            if (day3 == '明' || day3 == '聽') {
                endMoment.add(1, 'day');
            } else if (day3 == '昨' || day3 == '尋' || day3 == '琴') {
                endMoment.add(-1, 'day');
            }
            result.end.assign('day', endMoment.date());
            result.end.assign('month', endMoment.month() + 1);
            result.end.assign('year', endMoment.year());
        } else {
            result.end.imply('day', endMoment.date());
            result.end.imply('month', endMoment.month() + 1);
            result.end.imply('year', endMoment.year());
        }

        hour = 0;
        minute = 0;
        meridiem = -1;

        // ----- Second
        if (match[SECOND_GROUP]) {
            var second = parseInt(match[SECOND_GROUP]);
            if (isNaN(second)) {
                second = util.zhStringToNumber(match[SECOND_GROUP]);
            }

            if (second >= 60) return null;
            result.end.assign('second', second);
        }

        hour = parseInt(match[HOUR_GROUP]);
        if (isNaN(hour)) {
            hour = util.zhStringToNumber(match[HOUR_GROUP]);
        }

        // ----- Minutes
        if (match[MINUTE_GROUP]) {
            if (match[MINUTE_GROUP] == '半') {
                minute = 30;
            } else if (match[MINUTE_GROUP] == '正' || match[MINUTE_GROUP] == '整') {
                minute = 0;
            } else {
                minute = parseInt(match[MINUTE_GROUP]);
                if (isNaN(minute)) {
                    minute = util.zhStringToNumber(match[MINUTE_GROUP]);
                }
            }
        } else if (hour > 100) {
            minute = hour % 100;
            hour = parseInt(hour / 100);
        }

        if (minute >= 60) {
            return null;
        }

        if (hour > 24) {
            return null;
        }
        if (hour >= 12) {
            meridiem = 1;
        }

        // ----- AM & PM
        if (match[AM_PM_HOUR_GROUP]) {
            if (hour > 12) return null;
            var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if (ampm == "a") {
                meridiem = 0;
                if (hour == 12) hour = 0;
            }

            if (ampm == "p") {
                meridiem = 1;
                if (hour != 12) hour += 12;
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

        } else if (match[ZH_AM_PM_HOUR_GROUP_1]) {
            var zhAMPMString1 = match[ZH_AM_PM_HOUR_GROUP_1];
            var zhAMPM1 = zhAMPMString1[0];
            if (zhAMPM1 == '朝' || zhAMPM1 == '早') {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM1 == '晚') {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (match[ZH_AM_PM_HOUR_GROUP_2]) {
            var zhAMPMString2 = match[ZH_AM_PM_HOUR_GROUP_2];
            var zhAMPM2 = zhAMPMString2[0];
            if (zhAMPM2 == '上' || zhAMPM2 == '朝' || zhAMPM2 == '早' || zhAMPM2 == '凌') {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM2 == '下' || zhAMPM2 == '晏' || zhAMPM2 == '晚') {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (match[ZH_AM_PM_HOUR_GROUP_3]) {
            var zhAMPMString3 = match[ZH_AM_PM_HOUR_GROUP_3];
            var zhAMPM3 = zhAMPMString3[0];
            if (zhAMPM3 == '上' || zhAMPM3 == '朝' || zhAMPM3 == '早' || zhAMPM3 == '凌') {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM3 == '下' || zhAMPM3 == '晏' || zhAMPM3 == '晚') {
                meridiem = 1;
                if (hour != 12) hour += 12;
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
    };
};

},{"../../result":64,"../../utils/ZH-Hant.js":70,"../parser":49,"moment":2}],48:[function(require,module,exports){
/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var updateParsedComponent = require('../EN/ENWeekdayParser').updateParsedComponent;

var util = require('../../utils/ZH-Hant.js');

var PATTERN = new RegExp(
    '(上|今|下|這|呢)?' +
    '(?:個)?' +
    '(?:星期|禮拜)' +
    '(' + Object.keys(util.WEEKDAY_OFFSET).join('|') + ')'
);

var PREFIX_GROUP = 1;
var WEEKDAY_GROUP = 2;

exports.Parser = function ZHHantWeekdayParser() {

    Parser.apply(this, arguments);

    this.pattern = function() {
        return PATTERN;
    };

    this.extract = function(text, ref, match, opt) {
        var index = match.index;
        text = match[0];
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        var dayOfWeek = match[WEEKDAY_GROUP];
        var offset = util.WEEKDAY_OFFSET[dayOfWeek];
        if(offset === undefined) return null;

        var modifier = null;
        var prefix = match[PREFIX_GROUP];

        if(prefix == '上') {
            modifier = 'last';
        } else if(prefix == '下') {
            modifier = 'next';
        } else if(prefix == '今' || prefix == '這' || prefix == '呢') {
            modifier = 'this';
        }

        updateParsedComponent(result, ref, offset, modifier);
        result.tags['ZHHantWeekdayParser'] = true;
        return result;
    };
};

},{"../../result":64,"../../utils/ZH-Hant.js":70,"../EN/ENWeekdayParser":26,"../parser":49,"moment":2}],49:[function(require,module,exports){

function Parser(config) {

    config = config || {};
    var strictMode = config.strict;

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
exports.ENRelativeDateFormatParser = require('./EN/ENRelativeDateFormatParser').Parser;
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
exports.ENCasualTimeParser = require('./EN/ENCasualTimeParser').Parser;

exports.JPStandardParser = require('./JP/JPStandardParser').Parser;
exports.JPCasualDateParser = require('./JP/JPCasualDateParser').Parser;

exports.ESCasualDateParser = require('./ES/ESCasualDateParser').Parser;
exports.ESDeadlineFormatParser = require('./ES/ESDeadlineFormatParser').Parser;
exports.ESTimeAgoFormatParser = require('./ES/ESTimeAgoFormatParser').Parser;
exports.ESTimeExpressionParser = require('./ES/ESTimeExpressionParser').Parser;
exports.ESWeekdayParser = require('./ES/ESWeekdayParser').Parser;
exports.ESMonthNameLittleEndianParser = require('./ES/ESMonthNameLittleEndianParser').Parser;
exports.ESSlashDateFormatParser = require('./ES/ESSlashDateFormatParser').Parser;

exports.FRCasualDateParser = require('./FR/FRCasualDateParser').Parser;
exports.FRDeadlineFormatParser = require('./FR/FRDeadlineFormatParser').Parser;
exports.FRMonthNameLittleEndianParser = require('./FR/FRMonthNameLittleEndianParser').Parser;
exports.FRSlashDateFormatParser = require('./FR/FRSlashDateFormatParser').Parser;
exports.FRTimeAgoFormatParser = require('./FR/FRTimeAgoFormatParser').Parser;
exports.FRTimeExpressionParser = require('./FR/FRTimeExpressionParser').Parser;
exports.FRWeekdayParser = require('./FR/FRWeekdayParser').Parser;
exports.FRRelativeDateFormatParser = require('./FR/FRRelativeDateFormatParser').Parser;

exports.ZHHantDateParser = require('./ZH-Hant/ZHHantDateParser').Parser;
exports.ZHHantWeekdayParser = require('./ZH-Hant/ZHHantWeekdayParser').Parser;
exports.ZHHantTimeExpressionParser = require('./ZH-Hant/ZHHantTimeExpressionParser').Parser;
exports.ZHHantCasualDateParser = require('./ZH-Hant/ZHHantCasualDateParser').Parser;
exports.ZHHantDeadlineFormatParser = require('./ZH-Hant/ZHHantDeadlineFormatParser').Parser;

exports.DEDeadlineFormatParser = require('./DE/DEDeadlineFormatParser').Parser;
exports.DEMonthNameLittleEndianParser = require('./DE/DEMonthNameLittleEndianParser').Parser;
exports.DEMonthNameParser = require('./DE/DEMonthNameParser').Parser;
exports.DESlashDateFormatParser = require('./DE/DESlashDateFormatParser').Parser;
exports.DETimeAgoFormatParser = require('./DE/DETimeAgoFormatParser').Parser;
exports.DETimeExpressionParser = require('./DE/DETimeExpressionParser').Parser;
exports.DEWeekdayParser = require('./DE/DEWeekdayParser').Parser;
exports.DECasualDateParser = require('./DE/DECasualDateParser').Parser;

},{"./DE/DECasualDateParser":5,"./DE/DEDeadlineFormatParser":6,"./DE/DEMonthNameLittleEndianParser":7,"./DE/DEMonthNameParser":8,"./DE/DESlashDateFormatParser":9,"./DE/DETimeAgoFormatParser":10,"./DE/DETimeExpressionParser":11,"./DE/DEWeekdayParser":12,"./EN/ENCasualDateParser":13,"./EN/ENCasualTimeParser":14,"./EN/ENDeadlineFormatParser":15,"./EN/ENISOFormatParser":16,"./EN/ENMonthNameLittleEndianParser":17,"./EN/ENMonthNameMiddleEndianParser":18,"./EN/ENMonthNameParser":19,"./EN/ENRelativeDateFormatParser":20,"./EN/ENSlashDateFormatParser":21,"./EN/ENSlashDateFormatStartWithYearParser":22,"./EN/ENSlashMonthFormatParser":23,"./EN/ENTimeAgoFormatParser":24,"./EN/ENTimeExpressionParser":25,"./EN/ENWeekdayParser":26,"./ES/ESCasualDateParser":27,"./ES/ESDeadlineFormatParser":28,"./ES/ESMonthNameLittleEndianParser":29,"./ES/ESSlashDateFormatParser":30,"./ES/ESTimeAgoFormatParser":31,"./ES/ESTimeExpressionParser":32,"./ES/ESWeekdayParser":33,"./FR/FRCasualDateParser":34,"./FR/FRDeadlineFormatParser":35,"./FR/FRMonthNameLittleEndianParser":36,"./FR/FRRelativeDateFormatParser":37,"./FR/FRSlashDateFormatParser":38,"./FR/FRTimeAgoFormatParser":39,"./FR/FRTimeExpressionParser":40,"./FR/FRWeekdayParser":41,"./JP/JPCasualDateParser":42,"./JP/JPStandardParser":43,"./ZH-Hant/ZHHantCasualDateParser":44,"./ZH-Hant/ZHHantDateParser":45,"./ZH-Hant/ZHHantDeadlineFormatParser":46,"./ZH-Hant/ZHHantTimeExpressionParser":47,"./ZH-Hant/ZHHantWeekdayParser":48}],50:[function(require,module,exports){
/*
  
*/
var ENMergeDateRangeRefiner = require('../EN/ENMergeDateRangeRefiner').Refiner;

exports.Refiner = function DEMergeDateRangeRefiner() {
    ENMergeDateRangeRefiner.call(this);

    this.pattern = function () {
        return /^\s*(bis(?:\s*(?:am|zum))?|\-)\s*$/i
    };
};

},{"../EN/ENMergeDateRangeRefiner":52}],51:[function(require,module,exports){
/*
    
*/
var ParsedComponents = require('../../result').ParsedComponents;
var Refiner = require('../refiner').Refiner;

var mergeDateTimeComponent = require('../EN/ENMergeDateTimeRefiner').mergeDateTimeComponent;
var isDateOnly = require('../EN/ENMergeDateTimeRefiner').isDateOnly;
var isTimeOnly = require('../EN/ENMergeDateTimeRefiner').isTimeOnly;

var PATTERN = new RegExp("^\\s*(T|um|am|,|-)?\\s*$");

function isAbleToMerge(text, prevResult, curResult) {
    var textBetween = text.substring(prevResult.index + prevResult.text.length, curResult.index);
    return textBetween.match(PATTERN);
}

function mergeResult(text, dateResult, timeResult){

    var beginDate = dateResult.start;
    var beginTime = timeResult.start;    
    var beginDateTime = mergeDateTimeComponent(beginDate, beginTime);

    if (dateResult.end != null || timeResult.end != null) {
        
        var endDate   = dateResult.end == null ? dateResult.start : dateResult.end;            
        var endTime   = timeResult.end == null ? timeResult.start : timeResult.end;
        var endDateTime = mergeDateTimeComponent(endDate, endTime);
        
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
    dateResult.tags['DEMergeDateAndTimeRefiner'] = true;
    return dateResult;
}

exports.Refiner = function DEMergeDateTimeRefiner() {
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
},{"../../result":64,"../EN/ENMergeDateTimeRefiner":53,"../refiner":63}],52:[function(require,module,exports){
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

        if (fromResult.start.date().getTime() > toResult.start.date().getTime()) {
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


},{"../refiner":63}],53:[function(require,module,exports){
/*
    
*/
var ParsedComponents = require('../../result').ParsedComponents;
var Refiner = require('../refiner').Refiner;

var PATTERN = new RegExp("^\\s*(T|at|after|before|on|of|,|-)?\\s*$");

var isDateOnly = exports.isDateOnly = function(result) {
    return !result.start.isCertain('hour');
}
    
var isTimeOnly = exports.isTimeOnly = function(result) {
    return !result.start.isCertain('month') && !result.start.isCertain('weekday');
}

var isAbleToMerge = exports.isAbleToMerge = function(text, prevResult, curResult) {
    var textBetween = text.substring(prevResult.index + prevResult.text.length, curResult.index);
    return textBetween.match(PATTERN);
}

var mergeDateTimeComponent = exports.mergeDateTimeComponent = function(dateComponent, timeComponent) {
    var dateTimeComponent = dateComponent.clone();

    if (timeComponent.isCertain('hour')) {
        dateTimeComponent.assign('hour', timeComponent.get('hour'));
        dateTimeComponent.assign('minute', timeComponent.get('minute'));
        dateTimeComponent.assign('second', timeComponent.get('second'));
    } else {
        dateTimeComponent.imply('hour', timeComponent.get('hour'));
        dateTimeComponent.imply('minute', timeComponent.get('minute'));
        dateTimeComponent.imply('second', timeComponent.get('second'));
    }


    if (timeComponent.isCertain('meridiem')) {
        dateTimeComponent.assign('meridiem', timeComponent.get('meridiem'));
    } else if (
        timeComponent.get('meridiem') !== undefined &&
        dateTimeComponent.get('meridiem') === undefined
    ) {
        dateTimeComponent.imply('meridiem', timeComponent.get('meridiem'));
    }

    if (dateTimeComponent.get('meridiem') == 1 && dateTimeComponent.get('hour') < 12) {
        if (timeComponent.isCertain('hour')) {
            dateTimeComponent.assign('hour', dateTimeComponent.get('hour') + 12);
        } else {
            dateTimeComponent.imply('hour', dateTimeComponent.get('hour') + 12);
        }
    }

    return dateTimeComponent;
}


function mergeResult(text, dateResult, timeResult){

    var beginDate = dateResult.start;
    var beginTime = timeResult.start;
    var beginDateTime = mergeDateTimeComponent(beginDate, beginTime);
    
    if (dateResult.end != null || timeResult.end != null) {
        
        var endDate   = dateResult.end == null ? dateResult.start : dateResult.end;            
        var endTime   = timeResult.end == null ? timeResult.start : timeResult.end;
        var endDateTime = mergeDateTimeComponent(endDate, endTime);
        
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
                currResult = results[i + 1];
                i += 1;
                
            } else if (isDateOnly(currResult) && isTimeOnly(prevResult)
                    && isAbleToMerge(text, prevResult, currResult)) {
                
                prevResult = mergeResult(text, currResult, prevResult);
                currResult = results[i + 1];
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
},{"../../result":64,"../refiner":63}],54:[function(require,module,exports){
/*

*/
var ParsedComponents = require('../../result').ParsedComponents;
var Refiner = require('../refiner').Refiner;


var PATTERN = new RegExp("^\\s*(at|after|before|on|,|-|\\(|\\))?\\s*$");

function isMoreSpecific(prevResult, currResult) {
    var moreSpecific = false;

    if (prevResult.start.isCertain('year')) {
        if (!currResult.start.isCertain('year')) {
            moreSpecific = true;
        } else {
            if (prevResult.start.isCertain('month')) {
                if (!currResult.start.isCertain('month')) {
                    moreSpecific = true;
                } else {
                    if (prevResult.start.isCertain('day') && !currResult.start.isCertain('day')) {
                        moreSpecific = true;
                    }
                }
            }
        }
    }

    return moreSpecific;
}


function isAbleToMerge(text, prevResult, currResult) {
    var textBetween = text.substring(prevResult.index + prevResult.text.length, currResult.index);

    // Only accepts merge if one of them comes from casual relative date
    var includesRelativeResult = (prevResult.tags['ENRelativeDateFormatParser'] || currResult.tags['ENRelativeDateFormatParser']);

    // We assume they refer to the same date if all date fields are implied
    var referToSameDate = !prevResult.start.isCertain('day') && !prevResult.start.isCertain('month') && !prevResult.start.isCertain('year');

    // If both years are certain, that determines if they refer to the same date
    // but with one more specific than the other
    if (prevResult.start.isCertain('year') && currResult.start.isCertain('year'))
        referToSameDate = (prevResult.start.get('year') === currResult.start.get('year'));

    // We now test with the next level (month) if they refer to the same date
    if (prevResult.start.isCertain('month') && currResult.start.isCertain('month'))
        referToSameDate = (prevResult.start.get('month') === currResult.start.get('month')) && referToSameDate;

    return includesRelativeResult && textBetween.match(PATTERN) && referToSameDate;
}

function mergeResult(text, specificResult, nonSpecificResult){

    var specificDate = specificResult.start;
    var nonSpecificDate = nonSpecificResult.start;

    var startIndex = Math.min(specificResult.index, nonSpecificResult.index);
    var endIndex = Math.max(
            specificResult.index + specificResult.text.length,
            nonSpecificResult.index + nonSpecificResult.text.length);

    specificResult.index = startIndex;
    specificResult.text  = text.substring(startIndex, endIndex);

    for (var tag in nonSpecificResult.tags) {
        specificResult.tags[tag] = true;
    }
    specificResult.tags['ENPrioritizeSpecificDateRefiner'] = true;
    return specificResult;
}

exports.Refiner = function ENPrioritizeSpecificDateRefiner() {
    Refiner.call(this);

    this.refine = function(text, results, opt) {

        if (results.length < 2) return results;

        var mergedResult = [];
        var currResult = null;
        var prevResult = null;

        for (var i = 1; i < results.length; i++) {

            currResult = results[i];
            prevResult = results[i-1];

            if (isMoreSpecific(prevResult, currResult)
                    && isAbleToMerge(text, prevResult, currResult)) {

                prevResult = mergeResult(text, prevResult, currResult);
                currResult = null;
                i += 1;

            } else if (isMoreSpecific(currResult, prevResult)
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

},{"../../result":64,"../refiner":63}],55:[function(require,module,exports){
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

            if (!result.tags['ENTimeExpressionParser'] && !result.tags['ZHTimeExpressionParser'] && !result.tags['FRTimeExpressionParser'] && !result.tags['DETimeExpressionParser']) {
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

},{"./refiner":63}],56:[function(require,module,exports){
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

},{"./refiner":63}],57:[function(require,module,exports){
/*
  
*/
var Refiner = require('../refiner').Refiner;

exports.Refiner = function FRMergeDateRangeRefiner() {
    Refiner.call(this);

    this.pattern = function () { return /^\s*(à|a|\-)\s*$/i };

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


},{"../refiner":63}],58:[function(require,module,exports){
/*
    
*/
var ParsedComponents = require('../../result').ParsedComponents;
var Refiner = require('../refiner').Refiner;
var mergeDateTimeComponent = require('../EN/ENMergeDateTimeRefiner').mergeDateTimeComponent;

var PATTERN = new RegExp("^\\s*(T|à|a|vers|de|,|-)?\\s*$");

function isDateOnly(result) {
    return !result.start.isCertain('hour') || result.tags['FRCasualDateParser'];
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
    var beginDateTime = mergeDateTimeComponent(beginDate, beginTime);

    if (dateResult.end != null || timeResult.end != null) {
        
        var endDate   = dateResult.end == null ? dateResult.start : dateResult.end;            
        var endTime   = timeResult.end == null ? timeResult.start : timeResult.end;
        var endDateTime = mergeDateTimeComponent(endDate, endTime);
        
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
    dateResult.tags['FRMergeDateAndTimeRefiner'] = true;
    return dateResult;
}

exports.Refiner = function FRMergeDateTimeRefiner() {
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
},{"../../result":64,"../EN/ENMergeDateTimeRefiner":53,"../refiner":63}],59:[function(require,module,exports){
/*
    Enforce 'forwardDate' option to on the results. When there are missing component,
    e.g. "March 12-13 (without year)" or "Thursday", the refiner will try to adjust the result
    into the future instead of the past.
*/
var moment = require('moment');
var Refiner = require('./refiner').Refiner;

exports.Refiner = function ForwardDateRefiner() {
    Refiner.call(this);

    this.refine = function(text, results, opt) {

        if (!opt['forwardDate'] && !opt['forwardDatesOnly']) {
            return results;
        }

        results.forEach(function(result) {

            var refMoment = moment(result.ref);

            if (result.start.isCertain('day') && result.start.isCertain('month') &&
                !result.start.isCertain('year') &&
                refMoment.isAfter(result.start.moment())
            ) {
                // Adjust year into the future
                for (var i=0; i < 3 && refMoment.isAfter(result.start.moment()); i++) {
                    result.start.imply('year', result.start.get('year') + 1);

                    if (result.end && !result.end.isCertain('year')) {
                        result.end.imply('year', result.end.get('year') + 1);
                    }
                }

                result.tags['ExtractTimezoneOffsetRefiner'] = true;
            }

            if (!result.start.isCertain('day') && !result.start.isCertain('month') && !result.start.isCertain('year') &&
                result.start.isCertain('weekday') &&
                refMoment.isAfter(result.start.moment())
            ) {
                // Adjust date to the coming week
                if (refMoment.day() > result.start.get('weekday')) {
                    refMoment.day(result.start.get('weekday') + 7);
                } else {
                    refMoment.day(result.start.get('weekday'));
                }

                result.start.imply('day', refMoment.date());
                result.start.imply('month', refMoment.month() + 1);
                result.start.imply('year', refMoment.year());
                result.tags['ExtractTimezoneOffsetRefiner'] = true;
            }
        });

        return results;
    }
};

},{"./refiner":63,"moment":2}],60:[function(require,module,exports){
/*
  
*/
var ENMergeDateRangeRefiner = require('../EN/ENMergeDateRangeRefiner').Refiner;

exports.Refiner = function JPMergeDateRangeRefiner() {
    ENMergeDateRangeRefiner.call(this);

    this.pattern = function () { return /^\s*(から|ー)\s*$/i };
}


},{"../EN/ENMergeDateRangeRefiner":52}],61:[function(require,module,exports){
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
},{"./refiner":63}],62:[function(require,module,exports){
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
},{"./refiner":63}],63:[function(require,module,exports){

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
exports.ForwardDateRefiner = require('./ForwardDateRefiner').Refiner;
exports.UnlikelyFormatFilter = require('./UnlikelyFormatFilter').Refiner;

// EN refiners
exports.ENMergeDateTimeRefiner = require('./EN/ENMergeDateTimeRefiner').Refiner;
exports.ENMergeDateRangeRefiner = require('./EN/ENMergeDateRangeRefiner').Refiner;
exports.ENPrioritizeSpecificDateRefiner = require('./EN/ENPrioritizeSpecificDateRefiner').Refiner;

// JP refiners
exports.JPMergeDateRangeRefiner = require('./JP/JPMergeDateRangeRefiner').Refiner;

// FR refiners
exports.FRMergeDateRangeRefiner = require('./FR/FRMergeDateRangeRefiner').Refiner;
exports.FRMergeDateTimeRefiner = require('./FR/FRMergeDateTimeRefiner').Refiner;

// DE refiners
exports.DEMergeDateRangeRefiner = require('./DE/DEMergeDateRangeRefiner').Refiner;
exports.DEMergeDateTimeRefiner = require('./DE/DEMergeDateTimeRefiner').Refiner;

},{"./DE/DEMergeDateRangeRefiner":50,"./DE/DEMergeDateTimeRefiner":51,"./EN/ENMergeDateRangeRefiner":52,"./EN/ENMergeDateTimeRefiner":53,"./EN/ENPrioritizeSpecificDateRefiner":54,"./ExtractTimezoneAbbrRefiner":55,"./ExtractTimezoneOffsetRefiner":56,"./FR/FRMergeDateRangeRefiner":57,"./FR/FRMergeDateTimeRefiner":58,"./ForwardDateRefiner":59,"./JP/JPMergeDateRangeRefiner":60,"./OverlapRemovalRefiner":61,"./UnlikelyFormatFilter":62}],64:[function(require,module,exports){
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
    if (this.isCertain('timezoneOffset')) {
        dateMoment.utcOffset(this.get('timezoneOffset'))
    }

    if (dateMoment.get('year') != this.get('year')) return false;
    if (dateMoment.get('month') != this.get('month')-1) return false;
    if (dateMoment.get('date') != this.get('day')) return false;
    if (dateMoment.get('hour') != this.get('hour')) return false;
    if (dateMoment.get('minute') != this.get('minute')) return false;

    return true;
};

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
};



exports.ParsedComponents = ParsedComponents;
exports.ParsedResult = ParsedResult;

},{"moment":2}],65:[function(require,module,exports){
exports.WEEKDAY_OFFSET = { 
    'sonntag': 0, 
    'so': 0, 
    'montag': 1, 
    'mo': 1,
    'dienstag': 2, 
    'di':2, 
    'mittwoch': 3, 
    'mi': 3, 
    'donnerstag': 4, 
    'do': 4, 
    'freitag': 5, 
    'fr': 5,
    'samstag': 6, 
    'sa': 6
};
    
exports.MONTH_OFFSET = { 
    'januar': 1,
    'jan': 1,
    'jan.': 1,
    'februar': 2,
    'feb': 2,
    'feb.': 2,
    'märz': 3,
    'maerz': 3,
    'mär': 3,
    'mär.': 3,
    'mrz': 3,
    'mrz.': 3,
    'april': 4,
    'apr': 4,
    'apr.': 4,
    'mai': 5,
    'juni': 6,
    'jun': 6,
    'jun.': 6,
    'juli': 7,
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
    'oktober': 10,
    'okt': 10,
    'okt.': 10,
    'november': 11,
    'nov': 11,
    'nov.': 11,
    'dezember': 12,
    'dez': 12,
    'dez.': 12
};

exports.INTEGER_WORDS_PATTERN = '(?:eins|zwei|drei|vier|fünf|fuenf|sechs|sieben|acht|neun|zehn|elf|zwölf|zwoelf)';
exports.INTEGER_WORDS = {
    'eins' : 1,
    'zwei' : 2,
    'drei' : 3,
    'vier' : 4,
    'fünf' : 5,
    'fuenf': 5,
    'sechs' : 6,
    'sieben' : 7,
    'acht' : 8,
    'neun' : 9,
    'zehn' : 10,
    'elf' : 11,
    'zwölf' : 12,
    'zwoelf' : 12
};

},{}],66:[function(require,module,exports){
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
exports.INTEGER_WORDS_PATTERN = '(?:' + Object.keys(exports.INTEGER_WORDS).join('|') +')';

exports.ORDINAL_WORDS = {
    'first' : 1,
    'second': 2,
    'third': 3,
    'fourth': 4,
    'fifth': 5,
    'sixth': 6,
    'seventh': 7,
    'eighth': 8,
    'ninth': 9,
    'tenth': 10,
    'eleventh': 11,
    'twelfth': 12,
    'thirteenth': 13,
    'fourteenth': 14,
    'fifteenth': 15,
    'sixteenth': 16,
    'seventeenth': 17,
    'eighteenth': 18,
    'nineteenth': 19,
    'twentieth': 20,
    'twenty first': 21,
    'twenty second': 22,
    'twenty third': 23,
    'twenty fourth': 24,
    'twenty fifth': 25,
    'twenty sixth': 26,
    'twenty seventh': 27,
    'twenty eighth': 28,
    'twenty ninth': 29,
    'thirtieth': 30,
    'thirty first': 31
};
exports.ORDINAL_WORDS_PATTERN = '(?:' + Object.keys(exports.ORDINAL_WORDS).join('|').replace(/ /g, '[ -]') + ')';
},{}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
exports.WEEKDAY_OFFSET = { 
    'dimanche': 0, 
    'dim': 0, 
    'lundi': 1, 
    'lun': 1,
    'mardi': 2, 
    'mar':2, 
    'mercredi': 3, 
    'mer': 3, 
    'jeudi': 4, 
    'jeu': 4, 
    'vendredi': 5, 
    'ven': 5,
    'samedi': 6, 
    'sam': 6
};
    
exports.MONTH_OFFSET = { 
    'janvier': 1,
    'jan': 1,
    'jan.': 1,
    'février': 2,
    'fév': 2,
    'fév.': 2,
    'fevrier': 2,
    'fev': 2,
    'fev.': 2,
    'mars': 3,
    'mar': 3,
    'mar.': 3,
    'avril': 4,
    'avr': 4,
    'avr.': 4,
    'mai': 5,
    'juin': 6,
    'jun': 6,
    'juillet': 7,
    'jul': 7,
    'jul.': 7,
    'août': 8,
    'aout': 8,
    'septembre': 9,
    'sep': 9,
    'sep.': 9,
    'sept': 9,
    'sept.': 9,
    'octobre': 10,
    'oct': 10,
    'oct.': 10,
    'novembre': 11,
    'nov': 11,
    'nov.': 11,
    'décembre': 12,
    'decembre': 12,
    'dec': 12,
    'dec.': 12
};

exports.INTEGER_WORDS_PATTERN = '(?:un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|treize)';
exports.INTEGER_WORDS = {
    'un' : 1,
    'deux' : 2,
    'trois' : 3,
    'quatre' : 4,
    'cinq' : 5,
    'six' : 6,
    'sept' : 7,
    'huit' : 8,
    'neuf' : 9,
    'dix' : 10,
    'onze' : 11,
    'douze' : 12,
    'treize' : 13,
};

},{}],69:[function(require,module,exports){


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
},{}],70:[function(require,module,exports){
var NUMBER ={
  '零':0,
  '一':1,
  '二':2,
  '兩':2,
  '三':3,
  '四':4,
  '五':5,
  '六':6,
  '七':7,
  '八':8,
  '九':9,
  '十':10,
  '廿':20,
  '卅':30,
};

var WEEKDAY_OFFSET ={
  '天':0,
  '日':0,
  '一':1,
  '二':2,
  '三':3,
  '四':4,
  '五':5,
  '六':6,
};

exports.NUMBER = NUMBER;
exports.WEEKDAY_OFFSET = WEEKDAY_OFFSET;

exports.zhStringToNumber=function(text){
  var number = 0;
  for(var i=0; i<text.length ;i++){
    var char = text[i];
    if(char === '十'){
      number = number=== 0 ? NUMBER[char] : (number * NUMBER[char]);
    }else{
      number += NUMBER[char];
    }
  }
  return number;
};

exports.zhStringToYear=function(text){
  var string = '';
  for(var i=0; i<text.length ;i++){
    var char = text[i];
    string = string + NUMBER[char];
  }
  return parseInt(string);
};

},{}]},{},[3])(3)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci5qcyIsIm5vZGVfbW9kdWxlcy9tb21lbnQvbW9tZW50LmpzIiwic3JjL2Nocm9uby5qcyIsInNyYy9vcHRpb25zLmpzIiwic3JjL3BhcnNlcnMvREUvREVDYXN1YWxEYXRlUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvREUvREVEZWFkbGluZUZvcm1hdFBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0RFL0RFTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvREUvREVNb250aE5hbWVQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9ERS9ERVNsYXNoRGF0ZUZvcm1hdFBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0RFL0RFVGltZUFnb0Zvcm1hdFBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0RFL0RFVGltZUV4cHJlc3Npb25QYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9ERS9ERVdlZWtkYXlQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FTi9FTkNhc3VhbERhdGVQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FTi9FTkNhc3VhbFRpbWVQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FTi9FTkRlYWRsaW5lRm9ybWF0UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRU4vRU5JU09Gb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FTi9FTk1vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VOL0VOTW9udGhOYW1lTWlkZGxlRW5kaWFuUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRU4vRU5Nb250aE5hbWVQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FTi9FTlJlbGF0aXZlRGF0ZUZvcm1hdFBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VOL0VOU2xhc2hEYXRlRm9ybWF0UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRU4vRU5TbGFzaERhdGVGb3JtYXRTdGFydFdpdGhZZWFyUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRU4vRU5TbGFzaE1vbnRoRm9ybWF0UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRU4vRU5UaW1lQWdvRm9ybWF0UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRU4vRU5UaW1lRXhwcmVzc2lvblBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VOL0VOV2Vla2RheVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VTL0VTQ2FzdWFsRGF0ZVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VTL0VTRGVhZGxpbmVGb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9FUy9FU01vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VTL0VTU2xhc2hEYXRlRm9ybWF0UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRVMvRVNUaW1lQWdvRm9ybWF0UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRVMvRVNUaW1lRXhwcmVzc2lvblBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0VTL0VTV2Vla2RheVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0ZSL0ZSQ2FzdWFsRGF0ZVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0ZSL0ZSRGVhZGxpbmVGb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9GUi9GUk1vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlci5qcyIsInNyYy9wYXJzZXJzL0ZSL0ZSUmVsYXRpdmVEYXRlRm9ybWF0UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRlIvRlJTbGFzaERhdGVGb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9GUi9GUlRpbWVBZ29Gb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9GUi9GUlRpbWVFeHByZXNzaW9uUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvRlIvRlJXZWVrZGF5UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvSlAvSlBDYXN1YWxEYXRlUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvSlAvSlBTdGFuZGFyZFBhcnNlci5qcyIsInNyYy9wYXJzZXJzL1pILUhhbnQvWkhIYW50Q2FzdWFsRGF0ZVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL1pILUhhbnQvWkhIYW50RGF0ZVBhcnNlci5qcyIsInNyYy9wYXJzZXJzL1pILUhhbnQvWkhIYW50RGVhZGxpbmVGb3JtYXRQYXJzZXIuanMiLCJzcmMvcGFyc2Vycy9aSC1IYW50L1pISGFudFRpbWVFeHByZXNzaW9uUGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvWkgtSGFudC9aSEhhbnRXZWVrZGF5UGFyc2VyLmpzIiwic3JjL3BhcnNlcnMvcGFyc2VyLmpzIiwic3JjL3JlZmluZXJzL0RFL0RFTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyLmpzIiwic3JjL3JlZmluZXJzL0RFL0RFTWVyZ2VEYXRlVGltZVJlZmluZXIuanMiLCJzcmMvcmVmaW5lcnMvRU4vRU5NZXJnZURhdGVSYW5nZVJlZmluZXIuanMiLCJzcmMvcmVmaW5lcnMvRU4vRU5NZXJnZURhdGVUaW1lUmVmaW5lci5qcyIsInNyYy9yZWZpbmVycy9FTi9FTlByaW9yaXRpemVTcGVjaWZpY0RhdGVSZWZpbmVyLmpzIiwic3JjL3JlZmluZXJzL0V4dHJhY3RUaW1lem9uZUFiYnJSZWZpbmVyLmpzIiwic3JjL3JlZmluZXJzL0V4dHJhY3RUaW1lem9uZU9mZnNldFJlZmluZXIuanMiLCJzcmMvcmVmaW5lcnMvRlIvRlJNZXJnZURhdGVSYW5nZVJlZmluZXIuanMiLCJzcmMvcmVmaW5lcnMvRlIvRlJNZXJnZURhdGVUaW1lUmVmaW5lci5qcyIsInNyYy9yZWZpbmVycy9Gb3J3YXJkRGF0ZVJlZmluZXIuanMiLCJzcmMvcmVmaW5lcnMvSlAvSlBNZXJnZURhdGVSYW5nZVJlZmluZXIuanMiLCJzcmMvcmVmaW5lcnMvT3ZlcmxhcFJlbW92YWxSZWZpbmVyLmpzIiwic3JjL3JlZmluZXJzL1VubGlrZWx5Rm9ybWF0RmlsdGVyLmpzIiwic3JjL3JlZmluZXJzL3JlZmluZXIuanMiLCJzcmMvcmVzdWx0LmpzIiwic3JjL3V0aWxzL0RFLmpzIiwic3JjL3V0aWxzL0VOLmpzIiwic3JjL3V0aWxzL0VTLmpzIiwic3JjL3V0aWxzL0ZSLmpzIiwic3JjL3V0aWxzL0pQLmpzIiwic3JjL3V0aWxzL1pILUhhbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvMklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM1lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyEgbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXG4vLyEgbG9jYWxlIDogRnJlbmNoIFtmcl1cbi8vISBhdXRob3IgOiBKb2huIEZpc2NoZXIgOiBodHRwczovL2dpdGh1Yi5jb20vamZyb2ZmaWNlXG5cbjsoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnXG4gICAgICAgJiYgdHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicgPyBmYWN0b3J5KHJlcXVpcmUoJy4uL21vbWVudCcpKSA6XG4gICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWycuLi9tb21lbnQnXSwgZmFjdG9yeSkgOlxuICAgZmFjdG9yeShnbG9iYWwubW9tZW50KVxufSh0aGlzLCAoZnVuY3Rpb24gKG1vbWVudCkgeyAndXNlIHN0cmljdCc7XG5cblxudmFyIGZyID0gbW9tZW50LmRlZmluZUxvY2FsZSgnZnInLCB7XG4gICAgbW9udGhzIDogJ2phbnZpZXJfZsOpdnJpZXJfbWFyc19hdnJpbF9tYWlfanVpbl9qdWlsbGV0X2Fvw7t0X3NlcHRlbWJyZV9vY3RvYnJlX25vdmVtYnJlX2TDqWNlbWJyZScuc3BsaXQoJ18nKSxcbiAgICBtb250aHNTaG9ydCA6ICdqYW52Ll9mw6l2ci5fbWFyc19hdnIuX21haV9qdWluX2p1aWwuX2Fvw7t0X3NlcHQuX29jdC5fbm92Ll9kw6ljLicuc3BsaXQoJ18nKSxcbiAgICBtb250aHNQYXJzZUV4YWN0IDogdHJ1ZSxcbiAgICB3ZWVrZGF5cyA6ICdkaW1hbmNoZV9sdW5kaV9tYXJkaV9tZXJjcmVkaV9qZXVkaV92ZW5kcmVkaV9zYW1lZGknLnNwbGl0KCdfJyksXG4gICAgd2Vla2RheXNTaG9ydCA6ICdkaW0uX2x1bi5fbWFyLl9tZXIuX2pldS5fdmVuLl9zYW0uJy5zcGxpdCgnXycpLFxuICAgIHdlZWtkYXlzTWluIDogJ0RpX0x1X01hX01lX0plX1ZlX1NhJy5zcGxpdCgnXycpLFxuICAgIHdlZWtkYXlzUGFyc2VFeGFjdCA6IHRydWUsXG4gICAgbG9uZ0RhdGVGb3JtYXQgOiB7XG4gICAgICAgIExUIDogJ0hIOm1tJyxcbiAgICAgICAgTFRTIDogJ0hIOm1tOnNzJyxcbiAgICAgICAgTCA6ICdERC9NTS9ZWVlZJyxcbiAgICAgICAgTEwgOiAnRCBNTU1NIFlZWVknLFxuICAgICAgICBMTEwgOiAnRCBNTU1NIFlZWVkgSEg6bW0nLFxuICAgICAgICBMTExMIDogJ2RkZGQgRCBNTU1NIFlZWVkgSEg6bW0nXG4gICAgfSxcbiAgICBjYWxlbmRhciA6IHtcbiAgICAgICAgc2FtZURheSA6ICdbQXVqb3VyZOKAmWh1aSDDoF0gTFQnLFxuICAgICAgICBuZXh0RGF5IDogJ1tEZW1haW4gw6BdIExUJyxcbiAgICAgICAgbmV4dFdlZWsgOiAnZGRkZCBbw6BdIExUJyxcbiAgICAgICAgbGFzdERheSA6ICdbSGllciDDoF0gTFQnLFxuICAgICAgICBsYXN0V2VlayA6ICdkZGRkIFtkZXJuaWVyIMOgXSBMVCcsXG4gICAgICAgIHNhbWVFbHNlIDogJ0wnXG4gICAgfSxcbiAgICByZWxhdGl2ZVRpbWUgOiB7XG4gICAgICAgIGZ1dHVyZSA6ICdkYW5zICVzJyxcbiAgICAgICAgcGFzdCA6ICdpbCB5IGEgJXMnLFxuICAgICAgICBzIDogJ3F1ZWxxdWVzIHNlY29uZGVzJyxcbiAgICAgICAgbSA6ICd1bmUgbWludXRlJyxcbiAgICAgICAgbW0gOiAnJWQgbWludXRlcycsXG4gICAgICAgIGggOiAndW5lIGhldXJlJyxcbiAgICAgICAgaGggOiAnJWQgaGV1cmVzJyxcbiAgICAgICAgZCA6ICd1biBqb3VyJyxcbiAgICAgICAgZGQgOiAnJWQgam91cnMnLFxuICAgICAgICBNIDogJ3VuIG1vaXMnLFxuICAgICAgICBNTSA6ICclZCBtb2lzJyxcbiAgICAgICAgeSA6ICd1biBhbicsXG4gICAgICAgIHl5IDogJyVkIGFucydcbiAgICB9LFxuICAgIGRheU9mTW9udGhPcmRpbmFsUGFyc2U6IC9cXGR7MSwyfShlcnwpLyxcbiAgICBvcmRpbmFsIDogZnVuY3Rpb24gKG51bWJlciwgcGVyaW9kKSB7XG4gICAgICAgIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBSZXR1cm4gJ2UnIHdoZW4gZGF5IG9mIG1vbnRoID4gMS4gTW92ZSB0aGlzIGNhc2UgaW5zaWRlXG4gICAgICAgICAgICAvLyBibG9jayBmb3IgbWFzY3VsaW5lIHdvcmRzIGJlbG93LlxuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8zMzc1XG4gICAgICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtYmVyICsgKG51bWJlciA9PT0gMSA/ICdlcicgOiAnJyk7XG5cbiAgICAgICAgICAgIC8vIFdvcmRzIHdpdGggbWFzY3VsaW5lIGdyYW1tYXRpY2FsIGdlbmRlcjogbW9pcywgdHJpbWVzdHJlLCBqb3VyXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FzZSAnTSc6XG4gICAgICAgICAgICBjYXNlICdRJzpcbiAgICAgICAgICAgIGNhc2UgJ0RERCc6XG4gICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtYmVyICsgKG51bWJlciA9PT0gMSA/ICdlcicgOiAnZScpO1xuXG4gICAgICAgICAgICAvLyBXb3JkcyB3aXRoIGZlbWluaW5lIGdyYW1tYXRpY2FsIGdlbmRlcjogc2VtYWluZVxuICAgICAgICAgICAgY2FzZSAndyc6XG4gICAgICAgICAgICBjYXNlICdXJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtYmVyICsgKG51bWJlciA9PT0gMSA/ICdyZScgOiAnZScpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB3ZWVrIDoge1xuICAgICAgICBkb3cgOiAxLCAvLyBNb25kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICAgICAgZG95IDogNCAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gNHRoIGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxuICAgIH1cbn0pO1xuXG5yZXR1cm4gZnI7XG5cbn0pKSk7XG4iLCIvLyEgbW9tZW50LmpzXG4vLyEgdmVyc2lvbiA6IDIuMTguMVxuLy8hIGF1dGhvcnMgOiBUaW0gV29vZCwgSXNrcmVuIENoZXJuZXYsIE1vbWVudC5qcyBjb250cmlidXRvcnNcbi8vISBsaWNlbnNlIDogTUlUXG4vLyEgbW9tZW50anMuY29tXG5cbjsoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIGdsb2JhbC5tb21lbnQgPSBmYWN0b3J5KClcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG52YXIgaG9va0NhbGxiYWNrO1xuXG5mdW5jdGlvbiBob29rcyAoKSB7XG4gICAgcmV0dXJuIGhvb2tDYWxsYmFjay5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufVxuXG4vLyBUaGlzIGlzIGRvbmUgdG8gcmVnaXN0ZXIgdGhlIG1ldGhvZCBjYWxsZWQgd2l0aCBtb21lbnQoKVxuLy8gd2l0aG91dCBjcmVhdGluZyBjaXJjdWxhciBkZXBlbmRlbmNpZXMuXG5mdW5jdGlvbiBzZXRIb29rQ2FsbGJhY2sgKGNhbGxiYWNrKSB7XG4gICAgaG9va0NhbGxiYWNrID0gY2FsbGJhY2s7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkoaW5wdXQpIHtcbiAgICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBBcnJheSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChpbnB1dCkge1xuICAgIC8vIElFOCB3aWxsIHRyZWF0IHVuZGVmaW5lZCBhbmQgbnVsbCBhcyBvYmplY3QgaWYgaXQgd2Fzbid0IGZvclxuICAgIC8vIGlucHV0ICE9IG51bGxcbiAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3RFbXB0eShvYmopIHtcbiAgICB2YXIgaztcbiAgICBmb3IgKGsgaW4gb2JqKSB7XG4gICAgICAgIC8vIGV2ZW4gaWYgaXRzIG5vdCBvd24gcHJvcGVydHkgSSdkIHN0aWxsIGNhbGwgaXQgbm9uLWVtcHR5XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGlucHV0KSB7XG4gICAgcmV0dXJuIGlucHV0ID09PSB2b2lkIDA7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGlucHV0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG59XG5cbmZ1bmN0aW9uIGlzRGF0ZShpbnB1dCkge1xuICAgIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIERhdGUgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG5mdW5jdGlvbiBtYXAoYXJyLCBmbikge1xuICAgIHZhciByZXMgPSBbXSwgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHJlcy5wdXNoKGZuKGFycltpXSwgaSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBoYXNPd25Qcm9wKGEsIGIpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGEsIGIpO1xufVxuXG5mdW5jdGlvbiBleHRlbmQoYSwgYikge1xuICAgIGZvciAodmFyIGkgaW4gYikge1xuICAgICAgICBpZiAoaGFzT3duUHJvcChiLCBpKSkge1xuICAgICAgICAgICAgYVtpXSA9IGJbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaGFzT3duUHJvcChiLCAndG9TdHJpbmcnKSkge1xuICAgICAgICBhLnRvU3RyaW5nID0gYi50b1N0cmluZztcbiAgICB9XG5cbiAgICBpZiAoaGFzT3duUHJvcChiLCAndmFsdWVPZicpKSB7XG4gICAgICAgIGEudmFsdWVPZiA9IGIudmFsdWVPZjtcbiAgICB9XG5cbiAgICByZXR1cm4gYTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVVRDIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xuICAgIHJldHVybiBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCB0cnVlKS51dGMoKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFBhcnNpbmdGbGFncygpIHtcbiAgICAvLyBXZSBuZWVkIHRvIGRlZXAgY2xvbmUgdGhpcyBvYmplY3QuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZW1wdHkgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIHVudXNlZFRva2VucyAgICA6IFtdLFxuICAgICAgICB1bnVzZWRJbnB1dCAgICAgOiBbXSxcbiAgICAgICAgb3ZlcmZsb3cgICAgICAgIDogLTIsXG4gICAgICAgIGNoYXJzTGVmdE92ZXIgICA6IDAsXG4gICAgICAgIG51bGxJbnB1dCAgICAgICA6IGZhbHNlLFxuICAgICAgICBpbnZhbGlkTW9udGggICAgOiBudWxsLFxuICAgICAgICBpbnZhbGlkRm9ybWF0ICAgOiBmYWxzZSxcbiAgICAgICAgdXNlckludmFsaWRhdGVkIDogZmFsc2UsXG4gICAgICAgIGlzbyAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICBwYXJzZWREYXRlUGFydHMgOiBbXSxcbiAgICAgICAgbWVyaWRpZW0gICAgICAgIDogbnVsbCxcbiAgICAgICAgcmZjMjgyMiAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIHdlZWtkYXlNaXNtYXRjaCA6IGZhbHNlXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFyc2luZ0ZsYWdzKG0pIHtcbiAgICBpZiAobS5fcGYgPT0gbnVsbCkge1xuICAgICAgICBtLl9wZiA9IGRlZmF1bHRQYXJzaW5nRmxhZ3MoKTtcbiAgICB9XG4gICAgcmV0dXJuIG0uX3BmO1xufVxuXG52YXIgc29tZTtcbmlmIChBcnJheS5wcm90b3R5cGUuc29tZSkge1xuICAgIHNvbWUgPSBBcnJheS5wcm90b3R5cGUuc29tZTtcbn0gZWxzZSB7XG4gICAgc29tZSA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICAgICAgdmFyIHQgPSBPYmplY3QodGhpcyk7XG4gICAgICAgIHZhciBsZW4gPSB0Lmxlbmd0aCA+Pj4gMDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSBpbiB0ICYmIGZ1bi5jYWxsKHRoaXMsIHRbaV0sIGksIHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbn1cblxudmFyIHNvbWUkMSA9IHNvbWU7XG5cbmZ1bmN0aW9uIGlzVmFsaWQobSkge1xuICAgIGlmIChtLl9pc1ZhbGlkID09IG51bGwpIHtcbiAgICAgICAgdmFyIGZsYWdzID0gZ2V0UGFyc2luZ0ZsYWdzKG0pO1xuICAgICAgICB2YXIgcGFyc2VkUGFydHMgPSBzb21lJDEuY2FsbChmbGFncy5wYXJzZWREYXRlUGFydHMsIGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICByZXR1cm4gaSAhPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGlzTm93VmFsaWQgPSAhaXNOYU4obS5fZC5nZXRUaW1lKCkpICYmXG4gICAgICAgICAgICBmbGFncy5vdmVyZmxvdyA8IDAgJiZcbiAgICAgICAgICAgICFmbGFncy5lbXB0eSAmJlxuICAgICAgICAgICAgIWZsYWdzLmludmFsaWRNb250aCAmJlxuICAgICAgICAgICAgIWZsYWdzLmludmFsaWRXZWVrZGF5ICYmXG4gICAgICAgICAgICAhZmxhZ3MubnVsbElucHV0ICYmXG4gICAgICAgICAgICAhZmxhZ3MuaW52YWxpZEZvcm1hdCAmJlxuICAgICAgICAgICAgIWZsYWdzLnVzZXJJbnZhbGlkYXRlZCAmJlxuICAgICAgICAgICAgKCFmbGFncy5tZXJpZGllbSB8fCAoZmxhZ3MubWVyaWRpZW0gJiYgcGFyc2VkUGFydHMpKTtcblxuICAgICAgICBpZiAobS5fc3RyaWN0KSB7XG4gICAgICAgICAgICBpc05vd1ZhbGlkID0gaXNOb3dWYWxpZCAmJlxuICAgICAgICAgICAgICAgIGZsYWdzLmNoYXJzTGVmdE92ZXIgPT09IDAgJiZcbiAgICAgICAgICAgICAgICBmbGFncy51bnVzZWRUb2tlbnMubGVuZ3RoID09PSAwICYmXG4gICAgICAgICAgICAgICAgZmxhZ3MuYmlnSG91ciA9PT0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdC5pc0Zyb3plbiA9PSBudWxsIHx8ICFPYmplY3QuaXNGcm96ZW4obSkpIHtcbiAgICAgICAgICAgIG0uX2lzVmFsaWQgPSBpc05vd1ZhbGlkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGlzTm93VmFsaWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG0uX2lzVmFsaWQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUludmFsaWQgKGZsYWdzKSB7XG4gICAgdmFyIG0gPSBjcmVhdGVVVEMoTmFOKTtcbiAgICBpZiAoZmxhZ3MgIT0gbnVsbCkge1xuICAgICAgICBleHRlbmQoZ2V0UGFyc2luZ0ZsYWdzKG0pLCBmbGFncyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MobSkudXNlckludmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbTtcbn1cblxuLy8gUGx1Z2lucyB0aGF0IGFkZCBwcm9wZXJ0aWVzIHNob3VsZCBhbHNvIGFkZCB0aGUga2V5IGhlcmUgKG51bGwgdmFsdWUpLFxuLy8gc28gd2UgY2FuIHByb3Blcmx5IGNsb25lIG91cnNlbHZlcy5cbnZhciBtb21lbnRQcm9wZXJ0aWVzID0gaG9va3MubW9tZW50UHJvcGVydGllcyA9IFtdO1xuXG5mdW5jdGlvbiBjb3B5Q29uZmlnKHRvLCBmcm9tKSB7XG4gICAgdmFyIGksIHByb3AsIHZhbDtcblxuICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faXNBTW9tZW50T2JqZWN0KSkge1xuICAgICAgICB0by5faXNBTW9tZW50T2JqZWN0ID0gZnJvbS5faXNBTW9tZW50T2JqZWN0O1xuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2kpKSB7XG4gICAgICAgIHRvLl9pID0gZnJvbS5faTtcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9mKSkge1xuICAgICAgICB0by5fZiA9IGZyb20uX2Y7XG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fbCkpIHtcbiAgICAgICAgdG8uX2wgPSBmcm9tLl9sO1xuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3N0cmljdCkpIHtcbiAgICAgICAgdG8uX3N0cmljdCA9IGZyb20uX3N0cmljdDtcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl90em0pKSB7XG4gICAgICAgIHRvLl90em0gPSBmcm9tLl90em07XG4gICAgfVxuICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faXNVVEMpKSB7XG4gICAgICAgIHRvLl9pc1VUQyA9IGZyb20uX2lzVVRDO1xuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX29mZnNldCkpIHtcbiAgICAgICAgdG8uX29mZnNldCA9IGZyb20uX29mZnNldDtcbiAgICB9XG4gICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9wZikpIHtcbiAgICAgICAgdG8uX3BmID0gZ2V0UGFyc2luZ0ZsYWdzKGZyb20pO1xuICAgIH1cbiAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2xvY2FsZSkpIHtcbiAgICAgICAgdG8uX2xvY2FsZSA9IGZyb20uX2xvY2FsZTtcbiAgICB9XG5cbiAgICBpZiAobW9tZW50UHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBtb21lbnRQcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwcm9wID0gbW9tZW50UHJvcGVydGllc1tpXTtcbiAgICAgICAgICAgIHZhbCA9IGZyb21bcHJvcF07XG4gICAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHZhbCkpIHtcbiAgICAgICAgICAgICAgICB0b1twcm9wXSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0bztcbn1cblxudmFyIHVwZGF0ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcblxuLy8gTW9tZW50IHByb3RvdHlwZSBvYmplY3RcbmZ1bmN0aW9uIE1vbWVudChjb25maWcpIHtcbiAgICBjb3B5Q29uZmlnKHRoaXMsIGNvbmZpZyk7XG4gICAgdGhpcy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5fZCAhPSBudWxsID8gY29uZmlnLl9kLmdldFRpbWUoKSA6IE5hTik7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICB0aGlzLl9kID0gbmV3IERhdGUoTmFOKTtcbiAgICB9XG4gICAgLy8gUHJldmVudCBpbmZpbml0ZSBsb29wIGluIGNhc2UgdXBkYXRlT2Zmc2V0IGNyZWF0ZXMgbmV3IG1vbWVudFxuICAgIC8vIG9iamVjdHMuXG4gICAgaWYgKHVwZGF0ZUluUHJvZ3Jlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICBob29rcy51cGRhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzTW9tZW50IChvYmopIHtcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgTW9tZW50IHx8IChvYmogIT0gbnVsbCAmJiBvYmouX2lzQU1vbWVudE9iamVjdCAhPSBudWxsKTtcbn1cblxuZnVuY3Rpb24gYWJzRmxvb3IgKG51bWJlcikge1xuICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgIC8vIC0wIC0+IDBcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpIHx8IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRvSW50KGFyZ3VtZW50Rm9yQ29lcmNpb24pIHtcbiAgICB2YXIgY29lcmNlZE51bWJlciA9ICthcmd1bWVudEZvckNvZXJjaW9uLFxuICAgICAgICB2YWx1ZSA9IDA7XG5cbiAgICBpZiAoY29lcmNlZE51bWJlciAhPT0gMCAmJiBpc0Zpbml0ZShjb2VyY2VkTnVtYmVyKSkge1xuICAgICAgICB2YWx1ZSA9IGFic0Zsb29yKGNvZXJjZWROdW1iZXIpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuLy8gY29tcGFyZSB0d28gYXJyYXlzLCByZXR1cm4gdGhlIG51bWJlciBvZiBkaWZmZXJlbmNlc1xuZnVuY3Rpb24gY29tcGFyZUFycmF5cyhhcnJheTEsIGFycmF5MiwgZG9udENvbnZlcnQpIHtcbiAgICB2YXIgbGVuID0gTWF0aC5taW4oYXJyYXkxLmxlbmd0aCwgYXJyYXkyLmxlbmd0aCksXG4gICAgICAgIGxlbmd0aERpZmYgPSBNYXRoLmFicyhhcnJheTEubGVuZ3RoIC0gYXJyYXkyLmxlbmd0aCksXG4gICAgICAgIGRpZmZzID0gMCxcbiAgICAgICAgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKChkb250Q29udmVydCAmJiBhcnJheTFbaV0gIT09IGFycmF5MltpXSkgfHxcbiAgICAgICAgICAgICghZG9udENvbnZlcnQgJiYgdG9JbnQoYXJyYXkxW2ldKSAhPT0gdG9JbnQoYXJyYXkyW2ldKSkpIHtcbiAgICAgICAgICAgIGRpZmZzKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRpZmZzICsgbGVuZ3RoRGlmZjtcbn1cblxuZnVuY3Rpb24gd2Fybihtc2cpIHtcbiAgICBpZiAoaG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgKHR5cGVvZiBjb25zb2xlICE9PSAgJ3VuZGVmaW5lZCcpICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0RlcHJlY2F0aW9uIHdhcm5pbmc6ICcgKyBtc2cpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVwcmVjYXRlKG1zZywgZm4pIHtcbiAgICB2YXIgZmlyc3RUaW1lID0gdHJ1ZTtcblxuICAgIHJldHVybiBleHRlbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGhvb2tzLmRlcHJlY2F0aW9uSGFuZGxlcihudWxsLCBtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaXJzdFRpbWUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICB2YXIgYXJnO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhcmcgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1tpXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnICs9ICdcXG5bJyArIGkgKyAnXSAnO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJndW1lbnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgKz0ga2V5ICsgJzogJyArIGFyZ3VtZW50c1swXVtrZXldICsgJywgJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmcuc2xpY2UoMCwgLTIpOyAvLyBSZW1vdmUgdHJhaWxpbmcgY29tbWEgYW5kIHNwYWNlXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goYXJnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdhcm4obXNnICsgJ1xcbkFyZ3VtZW50czogJyArIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpLmpvaW4oJycpICsgJ1xcbicgKyAobmV3IEVycm9yKCkpLnN0YWNrKTtcbiAgICAgICAgICAgIGZpcnN0VGltZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0sIGZuKTtcbn1cblxudmFyIGRlcHJlY2F0aW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBkZXByZWNhdGVTaW1wbGUobmFtZSwgbXNnKSB7XG4gICAgaWYgKGhvb2tzLmRlcHJlY2F0aW9uSGFuZGxlciAhPSBudWxsKSB7XG4gICAgICAgIGhvb2tzLmRlcHJlY2F0aW9uSGFuZGxlcihuYW1lLCBtc2cpO1xuICAgIH1cbiAgICBpZiAoIWRlcHJlY2F0aW9uc1tuYW1lXSkge1xuICAgICAgICB3YXJuKG1zZyk7XG4gICAgICAgIGRlcHJlY2F0aW9uc1tuYW1lXSA9IHRydWU7XG4gICAgfVxufVxuXG5ob29rcy5zdXBwcmVzc0RlcHJlY2F0aW9uV2FybmluZ3MgPSBmYWxzZTtcbmhvb2tzLmRlcHJlY2F0aW9uSGFuZGxlciA9IG51bGw7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oaW5wdXQpIHtcbiAgICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBGdW5jdGlvbiB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG5mdW5jdGlvbiBzZXQgKGNvbmZpZykge1xuICAgIHZhciBwcm9wLCBpO1xuICAgIGZvciAoaSBpbiBjb25maWcpIHtcbiAgICAgICAgcHJvcCA9IGNvbmZpZ1tpXTtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ocHJvcCkpIHtcbiAgICAgICAgICAgIHRoaXNbaV0gPSBwcm9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpc1snXycgKyBpXSA9IHByb3A7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgIC8vIExlbmllbnQgb3JkaW5hbCBwYXJzaW5nIGFjY2VwdHMganVzdCBhIG51bWJlciBpbiBhZGRpdGlvbiB0b1xuICAgIC8vIG51bWJlciArIChwb3NzaWJseSkgc3R1ZmYgY29taW5nIGZyb20gX2RheU9mTW9udGhPcmRpbmFsUGFyc2UuXG4gICAgLy8gVE9ETzogUmVtb3ZlIFwib3JkaW5hbFBhcnNlXCIgZmFsbGJhY2sgaW4gbmV4dCBtYWpvciByZWxlYXNlLlxuICAgIHRoaXMuX2RheU9mTW9udGhPcmRpbmFsUGFyc2VMZW5pZW50ID0gbmV3IFJlZ0V4cChcbiAgICAgICAgKHRoaXMuX2RheU9mTW9udGhPcmRpbmFsUGFyc2Uuc291cmNlIHx8IHRoaXMuX29yZGluYWxQYXJzZS5zb3VyY2UpICtcbiAgICAgICAgICAgICd8JyArICgvXFxkezEsMn0vKS5zb3VyY2UpO1xufVxuXG5mdW5jdGlvbiBtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjaGlsZENvbmZpZykge1xuICAgIHZhciByZXMgPSBleHRlbmQoe30sIHBhcmVudENvbmZpZyksIHByb3A7XG4gICAgZm9yIChwcm9wIGluIGNoaWxkQ29uZmlnKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGNoaWxkQ29uZmlnLCBwcm9wKSkge1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KHBhcmVudENvbmZpZ1twcm9wXSkgJiYgaXNPYmplY3QoY2hpbGRDb25maWdbcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgcmVzW3Byb3BdID0ge307XG4gICAgICAgICAgICAgICAgZXh0ZW5kKHJlc1twcm9wXSwgcGFyZW50Q29uZmlnW3Byb3BdKTtcbiAgICAgICAgICAgICAgICBleHRlbmQocmVzW3Byb3BdLCBjaGlsZENvbmZpZ1twcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoaWxkQ29uZmlnW3Byb3BdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXNbcHJvcF0gPSBjaGlsZENvbmZpZ1twcm9wXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHJlc1twcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHByb3AgaW4gcGFyZW50Q29uZmlnKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wKHBhcmVudENvbmZpZywgcHJvcCkgJiZcbiAgICAgICAgICAgICAgICAhaGFzT3duUHJvcChjaGlsZENvbmZpZywgcHJvcCkgJiZcbiAgICAgICAgICAgICAgICBpc09iamVjdChwYXJlbnRDb25maWdbcHJvcF0pKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgY2hhbmdlcyB0byBwcm9wZXJ0aWVzIGRvbid0IG1vZGlmeSBwYXJlbnQgY29uZmlnXG4gICAgICAgICAgICByZXNbcHJvcF0gPSBleHRlbmQoe30sIHJlc1twcm9wXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gTG9jYWxlKGNvbmZpZykge1xuICAgIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnNldChjb25maWcpO1xuICAgIH1cbn1cblxudmFyIGtleXM7XG5cbmlmIChPYmplY3Qua2V5cykge1xuICAgIGtleXMgPSBPYmplY3Qua2V5cztcbn0gZWxzZSB7XG4gICAga2V5cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgdmFyIGksIHJlcyA9IFtdO1xuICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChvYmosIGkpKSB7XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xufVxuXG52YXIga2V5cyQxID0ga2V5cztcblxudmFyIGRlZmF1bHRDYWxlbmRhciA9IHtcbiAgICBzYW1lRGF5IDogJ1tUb2RheSBhdF0gTFQnLFxuICAgIG5leHREYXkgOiAnW1RvbW9ycm93IGF0XSBMVCcsXG4gICAgbmV4dFdlZWsgOiAnZGRkZCBbYXRdIExUJyxcbiAgICBsYXN0RGF5IDogJ1tZZXN0ZXJkYXkgYXRdIExUJyxcbiAgICBsYXN0V2VlayA6ICdbTGFzdF0gZGRkZCBbYXRdIExUJyxcbiAgICBzYW1lRWxzZSA6ICdMJ1xufTtcblxuZnVuY3Rpb24gY2FsZW5kYXIgKGtleSwgbW9tLCBub3cpIHtcbiAgICB2YXIgb3V0cHV0ID0gdGhpcy5fY2FsZW5kYXJba2V5XSB8fCB0aGlzLl9jYWxlbmRhclsnc2FtZUVsc2UnXTtcbiAgICByZXR1cm4gaXNGdW5jdGlvbihvdXRwdXQpID8gb3V0cHV0LmNhbGwobW9tLCBub3cpIDogb3V0cHV0O1xufVxuXG52YXIgZGVmYXVsdExvbmdEYXRlRm9ybWF0ID0ge1xuICAgIExUUyAgOiAnaDptbTpzcyBBJyxcbiAgICBMVCAgIDogJ2g6bW0gQScsXG4gICAgTCAgICA6ICdNTS9ERC9ZWVlZJyxcbiAgICBMTCAgIDogJ01NTU0gRCwgWVlZWScsXG4gICAgTExMICA6ICdNTU1NIEQsIFlZWVkgaDptbSBBJyxcbiAgICBMTExMIDogJ2RkZGQsIE1NTU0gRCwgWVlZWSBoOm1tIEEnXG59O1xuXG5mdW5jdGlvbiBsb25nRGF0ZUZvcm1hdCAoa2V5KSB7XG4gICAgdmFyIGZvcm1hdCA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV0sXG4gICAgICAgIGZvcm1hdFVwcGVyID0gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5LnRvVXBwZXJDYXNlKCldO1xuXG4gICAgaWYgKGZvcm1hdCB8fCAhZm9ybWF0VXBwZXIpIHtcbiAgICAgICAgcmV0dXJuIGZvcm1hdDtcbiAgICB9XG5cbiAgICB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldID0gZm9ybWF0VXBwZXIucmVwbGFjZSgvTU1NTXxNTXxERHxkZGRkL2csIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHZhbC5zbGljZSgxKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldO1xufVxuXG52YXIgZGVmYXVsdEludmFsaWREYXRlID0gJ0ludmFsaWQgZGF0ZSc7XG5cbmZ1bmN0aW9uIGludmFsaWREYXRlICgpIHtcbiAgICByZXR1cm4gdGhpcy5faW52YWxpZERhdGU7XG59XG5cbnZhciBkZWZhdWx0T3JkaW5hbCA9ICclZCc7XG52YXIgZGVmYXVsdERheU9mTW9udGhPcmRpbmFsUGFyc2UgPSAvXFxkezEsMn0vO1xuXG5mdW5jdGlvbiBvcmRpbmFsIChudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5fb3JkaW5hbC5yZXBsYWNlKCclZCcsIG51bWJlcik7XG59XG5cbnZhciBkZWZhdWx0UmVsYXRpdmVUaW1lID0ge1xuICAgIGZ1dHVyZSA6ICdpbiAlcycsXG4gICAgcGFzdCAgIDogJyVzIGFnbycsXG4gICAgcyAgOiAnYSBmZXcgc2Vjb25kcycsXG4gICAgc3MgOiAnJWQgc2Vjb25kcycsXG4gICAgbSAgOiAnYSBtaW51dGUnLFxuICAgIG1tIDogJyVkIG1pbnV0ZXMnLFxuICAgIGggIDogJ2FuIGhvdXInLFxuICAgIGhoIDogJyVkIGhvdXJzJyxcbiAgICBkICA6ICdhIGRheScsXG4gICAgZGQgOiAnJWQgZGF5cycsXG4gICAgTSAgOiAnYSBtb250aCcsXG4gICAgTU0gOiAnJWQgbW9udGhzJyxcbiAgICB5ICA6ICdhIHllYXInLFxuICAgIHl5IDogJyVkIHllYXJzJ1xufTtcblxuZnVuY3Rpb24gcmVsYXRpdmVUaW1lIChudW1iZXIsIHdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpIHtcbiAgICB2YXIgb3V0cHV0ID0gdGhpcy5fcmVsYXRpdmVUaW1lW3N0cmluZ107XG4gICAgcmV0dXJuIChpc0Z1bmN0aW9uKG91dHB1dCkpID9cbiAgICAgICAgb3V0cHV0KG51bWJlciwgd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSkgOlxuICAgICAgICBvdXRwdXQucmVwbGFjZSgvJWQvaSwgbnVtYmVyKTtcbn1cblxuZnVuY3Rpb24gcGFzdEZ1dHVyZSAoZGlmZiwgb3V0cHV0KSB7XG4gICAgdmFyIGZvcm1hdCA9IHRoaXMuX3JlbGF0aXZlVGltZVtkaWZmID4gMCA/ICdmdXR1cmUnIDogJ3Bhc3QnXTtcbiAgICByZXR1cm4gaXNGdW5jdGlvbihmb3JtYXQpID8gZm9ybWF0KG91dHB1dCkgOiBmb3JtYXQucmVwbGFjZSgvJXMvaSwgb3V0cHV0KTtcbn1cblxudmFyIGFsaWFzZXMgPSB7fTtcblxuZnVuY3Rpb24gYWRkVW5pdEFsaWFzICh1bml0LCBzaG9ydGhhbmQpIHtcbiAgICB2YXIgbG93ZXJDYXNlID0gdW5pdC50b0xvd2VyQ2FzZSgpO1xuICAgIGFsaWFzZXNbbG93ZXJDYXNlXSA9IGFsaWFzZXNbbG93ZXJDYXNlICsgJ3MnXSA9IGFsaWFzZXNbc2hvcnRoYW5kXSA9IHVuaXQ7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVVuaXRzKHVuaXRzKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB1bml0cyA9PT0gJ3N0cmluZycgPyBhbGlhc2VzW3VuaXRzXSB8fCBhbGlhc2VzW3VuaXRzLnRvTG93ZXJDYXNlKCldIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVPYmplY3RVbml0cyhpbnB1dE9iamVjdCkge1xuICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSB7fSxcbiAgICAgICAgbm9ybWFsaXplZFByb3AsXG4gICAgICAgIHByb3A7XG5cbiAgICBmb3IgKHByb3AgaW4gaW5wdXRPYmplY3QpIHtcbiAgICAgICAgaWYgKGhhc093blByb3AoaW5wdXRPYmplY3QsIHByb3ApKSB7XG4gICAgICAgICAgICBub3JtYWxpemVkUHJvcCA9IG5vcm1hbGl6ZVVuaXRzKHByb3ApO1xuICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRQcm9wKSB7XG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZElucHV0W25vcm1hbGl6ZWRQcm9wXSA9IGlucHV0T2JqZWN0W3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRJbnB1dDtcbn1cblxudmFyIHByaW9yaXRpZXMgPSB7fTtcblxuZnVuY3Rpb24gYWRkVW5pdFByaW9yaXR5KHVuaXQsIHByaW9yaXR5KSB7XG4gICAgcHJpb3JpdGllc1t1bml0XSA9IHByaW9yaXR5O1xufVxuXG5mdW5jdGlvbiBnZXRQcmlvcml0aXplZFVuaXRzKHVuaXRzT2JqKSB7XG4gICAgdmFyIHVuaXRzID0gW107XG4gICAgZm9yICh2YXIgdSBpbiB1bml0c09iaikge1xuICAgICAgICB1bml0cy5wdXNoKHt1bml0OiB1LCBwcmlvcml0eTogcHJpb3JpdGllc1t1XX0pO1xuICAgIH1cbiAgICB1bml0cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eTtcbiAgICB9KTtcbiAgICByZXR1cm4gdW5pdHM7XG59XG5cbmZ1bmN0aW9uIG1ha2VHZXRTZXQgKHVuaXQsIGtlZXBUaW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgc2V0JDEodGhpcywgdW5pdCwgdmFsdWUpO1xuICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIGtlZXBUaW1lKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGdldCh0aGlzLCB1bml0KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGdldCAobW9tLCB1bml0KSB7XG4gICAgcmV0dXJuIG1vbS5pc1ZhbGlkKCkgP1xuICAgICAgICBtb20uX2RbJ2dldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0oKSA6IE5hTjtcbn1cblxuZnVuY3Rpb24gc2V0JDEgKG1vbSwgdW5pdCwgdmFsdWUpIHtcbiAgICBpZiAobW9tLmlzVmFsaWQoKSkge1xuICAgICAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0odmFsdWUpO1xuICAgIH1cbn1cblxuLy8gTU9NRU5UU1xuXG5mdW5jdGlvbiBzdHJpbmdHZXQgKHVuaXRzKSB7XG4gICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgaWYgKGlzRnVuY3Rpb24odGhpc1t1bml0c10pKSB7XG4gICAgICAgIHJldHVybiB0aGlzW3VuaXRzXSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn1cblxuXG5mdW5jdGlvbiBzdHJpbmdTZXQgKHVuaXRzLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdW5pdHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplT2JqZWN0VW5pdHModW5pdHMpO1xuICAgICAgICB2YXIgcHJpb3JpdGl6ZWQgPSBnZXRQcmlvcml0aXplZFVuaXRzKHVuaXRzKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmlvcml0aXplZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpc1twcmlvcml0aXplZFtpXS51bml0XSh1bml0c1twcmlvcml0aXplZFtpXS51bml0XSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpc1t1bml0c10pKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1t1bml0c10odmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiB6ZXJvRmlsbChudW1iZXIsIHRhcmdldExlbmd0aCwgZm9yY2VTaWduKSB7XG4gICAgdmFyIGFic051bWJlciA9ICcnICsgTWF0aC5hYnMobnVtYmVyKSxcbiAgICAgICAgemVyb3NUb0ZpbGwgPSB0YXJnZXRMZW5ndGggLSBhYnNOdW1iZXIubGVuZ3RoLFxuICAgICAgICBzaWduID0gbnVtYmVyID49IDA7XG4gICAgcmV0dXJuIChzaWduID8gKGZvcmNlU2lnbiA/ICcrJyA6ICcnKSA6ICctJykgK1xuICAgICAgICBNYXRoLnBvdygxMCwgTWF0aC5tYXgoMCwgemVyb3NUb0ZpbGwpKS50b1N0cmluZygpLnN1YnN0cigxKSArIGFic051bWJlcjtcbn1cblxudmFyIGZvcm1hdHRpbmdUb2tlbnMgPSAvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oW0hoXW1tKHNzKT98TW98TU0/TT9NP3xEb3xERERvfEREP0Q/RD98ZGRkP2Q/fGRvP3x3W298d10/fFdbb3xXXT98UW8/fFlZWVlZWXxZWVlZWXxZWVlZfFlZfGdnKGdnZz8pP3xHRyhHR0c/KT98ZXxFfGF8QXxoaD98SEg/fGtrP3xtbT98c3M/fFN7MSw5fXx4fFh8eno/fFpaP3wuKS9nO1xuXG52YXIgbG9jYWxGb3JtYXR0aW5nVG9rZW5zID0gLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KExUU3xMVHxMTD9MP0w/fGx7MSw0fSkvZztcblxudmFyIGZvcm1hdEZ1bmN0aW9ucyA9IHt9O1xuXG52YXIgZm9ybWF0VG9rZW5GdW5jdGlvbnMgPSB7fTtcblxuLy8gdG9rZW46ICAgICdNJ1xuLy8gcGFkZGVkOiAgIFsnTU0nLCAyXVxuLy8gb3JkaW5hbDogICdNbydcbi8vIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7IHRoaXMubW9udGgoKSArIDEgfVxuZnVuY3Rpb24gYWRkRm9ybWF0VG9rZW4gKHRva2VuLCBwYWRkZWQsIG9yZGluYWwsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGZ1bmMgPSBjYWxsYmFjaztcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnc3RyaW5nJykge1xuICAgICAgICBmdW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbY2FsbGJhY2tdKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmICh0b2tlbikge1xuICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1t0b2tlbl0gPSBmdW5jO1xuICAgIH1cbiAgICBpZiAocGFkZGVkKSB7XG4gICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW3BhZGRlZFswXV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gemVyb0ZpbGwoZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCBwYWRkZWRbMV0sIHBhZGRlZFsyXSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChvcmRpbmFsKSB7XG4gICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW29yZGluYWxdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm9yZGluYWwoZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCB0b2tlbik7XG4gICAgICAgIH07XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVGb3JtYXR0aW5nVG9rZW5zKGlucHV0KSB7XG4gICAgaWYgKGlucHV0Lm1hdGNoKC9cXFtbXFxzXFxTXS8pKSB7XG4gICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9eXFxbfFxcXSQvZywgJycpO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXFxcXC9nLCAnJyk7XG59XG5cbmZ1bmN0aW9uIG1ha2VGb3JtYXRGdW5jdGlvbihmb3JtYXQpIHtcbiAgICB2YXIgYXJyYXkgPSBmb3JtYXQubWF0Y2goZm9ybWF0dGluZ1Rva2VucyksIGksIGxlbmd0aDtcblxuICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmb3JtYXRUb2tlbkZ1bmN0aW9uc1thcnJheVtpXV0pIHtcbiAgICAgICAgICAgIGFycmF5W2ldID0gZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJyYXlbaV0gPSByZW1vdmVGb3JtYXR0aW5nVG9rZW5zKGFycmF5W2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAobW9tKSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSAnJywgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gaXNGdW5jdGlvbihhcnJheVtpXSkgPyBhcnJheVtpXS5jYWxsKG1vbSwgZm9ybWF0KSA6IGFycmF5W2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbn1cblxuLy8gZm9ybWF0IGRhdGUgdXNpbmcgbmF0aXZlIGRhdGUgb2JqZWN0XG5mdW5jdGlvbiBmb3JtYXRNb21lbnQobSwgZm9ybWF0KSB7XG4gICAgaWYgKCFtLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gbS5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICB9XG5cbiAgICBmb3JtYXQgPSBleHBhbmRGb3JtYXQoZm9ybWF0LCBtLmxvY2FsZURhdGEoKSk7XG4gICAgZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0gPSBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSB8fCBtYWtlRm9ybWF0RnVuY3Rpb24oZm9ybWF0KTtcblxuICAgIHJldHVybiBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XShtKTtcbn1cblxuZnVuY3Rpb24gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbG9jYWxlKSB7XG4gICAgdmFyIGkgPSA1O1xuXG4gICAgZnVuY3Rpb24gcmVwbGFjZUxvbmdEYXRlRm9ybWF0VG9rZW5zKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUubG9uZ0RhdGVGb3JtYXQoaW5wdXQpIHx8IGlucHV0O1xuICAgIH1cblxuICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xuICAgIHdoaWxlIChpID49IDAgJiYgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLnRlc3QoZm9ybWF0KSkge1xuICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShsb2NhbEZvcm1hdHRpbmdUb2tlbnMsIHJlcGxhY2VMb25nRGF0ZUZvcm1hdFRva2Vucyk7XG4gICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xuICAgICAgICBpIC09IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm1hdDtcbn1cblxudmFyIG1hdGNoMSAgICAgICAgID0gL1xcZC87ICAgICAgICAgICAgLy8gICAgICAgMCAtIDlcbnZhciBtYXRjaDIgICAgICAgICA9IC9cXGRcXGQvOyAgICAgICAgICAvLyAgICAgIDAwIC0gOTlcbnZhciBtYXRjaDMgICAgICAgICA9IC9cXGR7M30vOyAgICAgICAgIC8vICAgICAwMDAgLSA5OTlcbnZhciBtYXRjaDQgICAgICAgICA9IC9cXGR7NH0vOyAgICAgICAgIC8vICAgIDAwMDAgLSA5OTk5XG52YXIgbWF0Y2g2ICAgICAgICAgPSAvWystXT9cXGR7Nn0vOyAgICAvLyAtOTk5OTk5IC0gOTk5OTk5XG52YXIgbWF0Y2gxdG8yICAgICAgPSAvXFxkXFxkPy87ICAgICAgICAgLy8gICAgICAgMCAtIDk5XG52YXIgbWF0Y2gzdG80ICAgICAgPSAvXFxkXFxkXFxkXFxkPy87ICAgICAvLyAgICAgOTk5IC0gOTk5OVxudmFyIG1hdGNoNXRvNiAgICAgID0gL1xcZFxcZFxcZFxcZFxcZFxcZD8vOyAvLyAgIDk5OTk5IC0gOTk5OTk5XG52YXIgbWF0Y2gxdG8zICAgICAgPSAvXFxkezEsM30vOyAgICAgICAvLyAgICAgICAwIC0gOTk5XG52YXIgbWF0Y2gxdG80ICAgICAgPSAvXFxkezEsNH0vOyAgICAgICAvLyAgICAgICAwIC0gOTk5OVxudmFyIG1hdGNoMXRvNiAgICAgID0gL1srLV0/XFxkezEsNn0vOyAgLy8gLTk5OTk5OSAtIDk5OTk5OVxuXG52YXIgbWF0Y2hVbnNpZ25lZCAgPSAvXFxkKy87ICAgICAgICAgICAvLyAgICAgICAwIC0gaW5mXG52YXIgbWF0Y2hTaWduZWQgICAgPSAvWystXT9cXGQrLzsgICAgICAvLyAgICAtaW5mIC0gaW5mXG5cbnZhciBtYXRjaE9mZnNldCAgICA9IC9afFsrLV1cXGRcXGQ6P1xcZFxcZC9naTsgLy8gKzAwOjAwIC0wMDowMCArMDAwMCAtMDAwMCBvciBaXG52YXIgbWF0Y2hTaG9ydE9mZnNldCA9IC9afFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/L2dpOyAvLyArMDAgLTAwICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxuXG52YXIgbWF0Y2hUaW1lc3RhbXAgPSAvWystXT9cXGQrKFxcLlxcZHsxLDN9KT8vOyAvLyAxMjM0NTY3ODkgMTIzNDU2Nzg5LjEyM1xuXG4vLyBhbnkgd29yZCAob3IgdHdvKSBjaGFyYWN0ZXJzIG9yIG51bWJlcnMgaW5jbHVkaW5nIHR3by90aHJlZSB3b3JkIG1vbnRoIGluIGFyYWJpYy5cbi8vIGluY2x1ZGVzIHNjb3R0aXNoIGdhZWxpYyB0d28gd29yZCBhbmQgaHlwaGVuYXRlZCBtb250aHNcbnZhciBtYXRjaFdvcmQgPSAvWzAtOV0qWydhLXpcXHUwMEEwLVxcdTA1RkZcXHUwNzAwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdK3xbXFx1MDYwMC1cXHUwNkZGXFwvXSsoXFxzKj9bXFx1MDYwMC1cXHUwNkZGXSspezEsMn0vaTtcblxuXG52YXIgcmVnZXhlcyA9IHt9O1xuXG5mdW5jdGlvbiBhZGRSZWdleFRva2VuICh0b2tlbiwgcmVnZXgsIHN0cmljdFJlZ2V4KSB7XG4gICAgcmVnZXhlc1t0b2tlbl0gPSBpc0Z1bmN0aW9uKHJlZ2V4KSA/IHJlZ2V4IDogZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGVEYXRhKSB7XG4gICAgICAgIHJldHVybiAoaXNTdHJpY3QgJiYgc3RyaWN0UmVnZXgpID8gc3RyaWN0UmVnZXggOiByZWdleDtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4gKHRva2VuLCBjb25maWcpIHtcbiAgICBpZiAoIWhhc093blByb3AocmVnZXhlcywgdG9rZW4pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKHVuZXNjYXBlRm9ybWF0KHRva2VuKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZ2V4ZXNbdG9rZW5dKGNvbmZpZy5fc3RyaWN0LCBjb25maWcuX2xvY2FsZSk7XG59XG5cbi8vIENvZGUgZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM1NjE0OTMvaXMtdGhlcmUtYS1yZWdleHAtZXNjYXBlLWZ1bmN0aW9uLWluLWphdmFzY3JpcHRcbmZ1bmN0aW9uIHVuZXNjYXBlRm9ybWF0KHMpIHtcbiAgICByZXR1cm4gcmVnZXhFc2NhcGUocy5yZXBsYWNlKCdcXFxcJywgJycpLnJlcGxhY2UoL1xcXFwoXFxbKXxcXFxcKFxcXSl8XFxbKFteXFxdXFxbXSopXFxdfFxcXFwoLikvZywgZnVuY3Rpb24gKG1hdGNoZWQsIHAxLCBwMiwgcDMsIHA0KSB7XG4gICAgICAgIHJldHVybiBwMSB8fCBwMiB8fCBwMyB8fCBwNDtcbiAgICB9KSk7XG59XG5cbmZ1bmN0aW9uIHJlZ2V4RXNjYXBlKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcbn1cblxudmFyIHRva2VucyA9IHt9O1xuXG5mdW5jdGlvbiBhZGRQYXJzZVRva2VuICh0b2tlbiwgY2FsbGJhY2spIHtcbiAgICB2YXIgaSwgZnVuYyA9IGNhbGxiYWNrO1xuICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRva2VuID0gW3Rva2VuXTtcbiAgICB9XG4gICAgaWYgKGlzTnVtYmVyKGNhbGxiYWNrKSkge1xuICAgICAgICBmdW5jID0gZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICAgICAgYXJyYXlbY2FsbGJhY2tdID0gdG9JbnQoaW5wdXQpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG9rZW5zW3Rva2VuW2ldXSA9IGZ1bmM7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRXZWVrUGFyc2VUb2tlbiAodG9rZW4sIGNhbGxiYWNrKSB7XG4gICAgYWRkUGFyc2VUb2tlbih0b2tlbiwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnLCB0b2tlbikge1xuICAgICAgICBjb25maWcuX3cgPSBjb25maWcuX3cgfHwge307XG4gICAgICAgIGNhbGxiYWNrKGlucHV0LCBjb25maWcuX3csIGNvbmZpZywgdG9rZW4pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRUaW1lVG9BcnJheUZyb21Ub2tlbih0b2tlbiwgaW5wdXQsIGNvbmZpZykge1xuICAgIGlmIChpbnB1dCAhPSBudWxsICYmIGhhc093blByb3AodG9rZW5zLCB0b2tlbikpIHtcbiAgICAgICAgdG9rZW5zW3Rva2VuXShpbnB1dCwgY29uZmlnLl9hLCBjb25maWcsIHRva2VuKTtcbiAgICB9XG59XG5cbnZhciBZRUFSID0gMDtcbnZhciBNT05USCA9IDE7XG52YXIgREFURSA9IDI7XG52YXIgSE9VUiA9IDM7XG52YXIgTUlOVVRFID0gNDtcbnZhciBTRUNPTkQgPSA1O1xudmFyIE1JTExJU0VDT05EID0gNjtcbnZhciBXRUVLID0gNztcbnZhciBXRUVLREFZID0gODtcblxudmFyIGluZGV4T2Y7XG5cbmlmIChBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xuICAgIGluZGV4T2YgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZjtcbn0gZWxzZSB7XG4gICAgaW5kZXhPZiA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIC8vIEkga25vd1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmICh0aGlzW2ldID09PSBvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG59XG5cbnZhciBpbmRleE9mJDEgPSBpbmRleE9mO1xuXG5mdW5jdGlvbiBkYXlzSW5Nb250aCh5ZWFyLCBtb250aCkge1xuICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCArIDEsIDApKS5nZXRVVENEYXRlKCk7XG59XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oJ00nLCBbJ01NJywgMl0sICdNbycsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5tb250aCgpICsgMTtcbn0pO1xuXG5hZGRGb3JtYXRUb2tlbignTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tb250aHNTaG9ydCh0aGlzLCBmb3JtYXQpO1xufSk7XG5cbmFkZEZvcm1hdFRva2VuKCdNTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tb250aHModGhpcywgZm9ybWF0KTtcbn0pO1xuXG4vLyBBTElBU0VTXG5cbmFkZFVuaXRBbGlhcygnbW9udGgnLCAnTScpO1xuXG4vLyBQUklPUklUWVxuXG5hZGRVbml0UHJpb3JpdHkoJ21vbnRoJywgOCk7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbignTScsICAgIG1hdGNoMXRvMik7XG5hZGRSZWdleFRva2VuKCdNTScsICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuYWRkUmVnZXhUb2tlbignTU1NJywgIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5tb250aHNTaG9ydFJlZ2V4KGlzU3RyaWN0KTtcbn0pO1xuYWRkUmVnZXhUb2tlbignTU1NTScsIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5tb250aHNSZWdleChpc1N0cmljdCk7XG59KTtcblxuYWRkUGFyc2VUb2tlbihbJ00nLCAnTU0nXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgIGFycmF5W01PTlRIXSA9IHRvSW50KGlucHV0KSAtIDE7XG59KTtcblxuYWRkUGFyc2VUb2tlbihbJ01NTScsICdNTU1NJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZywgdG9rZW4pIHtcbiAgICB2YXIgbW9udGggPSBjb25maWcuX2xvY2FsZS5tb250aHNQYXJzZShpbnB1dCwgdG9rZW4sIGNvbmZpZy5fc3RyaWN0KTtcbiAgICAvLyBpZiB3ZSBkaWRuJ3QgZmluZCBhIG1vbnRoIG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZC5cbiAgICBpZiAobW9udGggIT0gbnVsbCkge1xuICAgICAgICBhcnJheVtNT05USF0gPSBtb250aDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pbnZhbGlkTW9udGggPSBpbnB1dDtcbiAgICB9XG59KTtcblxuLy8gTE9DQUxFU1xuXG52YXIgTU9OVEhTX0lOX0ZPUk1BVCA9IC9EW29EXT8oXFxbW15cXFtcXF1dKlxcXXxcXHMpK01NTU0/LztcbnZhciBkZWZhdWx0TG9jYWxlTW9udGhzID0gJ0phbnVhcnlfRmVicnVhcnlfTWFyY2hfQXByaWxfTWF5X0p1bmVfSnVseV9BdWd1c3RfU2VwdGVtYmVyX09jdG9iZXJfTm92ZW1iZXJfRGVjZW1iZXInLnNwbGl0KCdfJyk7XG5mdW5jdGlvbiBsb2NhbGVNb250aHMgKG0sIGZvcm1hdCkge1xuICAgIGlmICghbSkge1xuICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHMpID8gdGhpcy5fbW9udGhzIDpcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1snc3RhbmRhbG9uZSddO1xuICAgIH1cbiAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHMpID8gdGhpcy5fbW9udGhzW20ubW9udGgoKV0gOlxuICAgICAgICB0aGlzLl9tb250aHNbKHRoaXMuX21vbnRocy5pc0Zvcm1hdCB8fCBNT05USFNfSU5fRk9STUFUKS50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJ11bbS5tb250aCgpXTtcbn1cblxudmFyIGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydCA9ICdKYW5fRmViX01hcl9BcHJfTWF5X0p1bl9KdWxfQXVnX1NlcF9PY3RfTm92X0RlYycuc3BsaXQoJ18nKTtcbmZ1bmN0aW9uIGxvY2FsZU1vbnRoc1Nob3J0IChtLCBmb3JtYXQpIHtcbiAgICBpZiAoIW0pIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzU2hvcnQpID8gdGhpcy5fbW9udGhzU2hvcnQgOlxuICAgICAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRbJ3N0YW5kYWxvbmUnXTtcbiAgICB9XG4gICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzU2hvcnQpID8gdGhpcy5fbW9udGhzU2hvcnRbbS5tb250aCgpXSA6XG4gICAgICAgIHRoaXMuX21vbnRoc1Nob3J0W01PTlRIU19JTl9GT1JNQVQudGVzdChmb3JtYXQpID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSddW20ubW9udGgoKV07XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVN0cmljdFBhcnNlKG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcbiAgICB2YXIgaSwgaWksIG1vbSwgbGxjID0gbW9udGhOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgaWYgKCF0aGlzLl9tb250aHNQYXJzZSkge1xuICAgICAgICAvLyB0aGlzIGlzIG5vdCB1c2VkXG4gICAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XG4gICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZSA9IFtdO1xuICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgKytpKSB7XG4gICAgICAgICAgICBtb20gPSBjcmVhdGVVVEMoWzIwMDAsIGldKTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0gPSB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0gPSB0aGlzLm1vbnRocyhtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0cmljdCkge1xuICAgICAgICBpZiAoZm9ybWF0ID09PSAnTU1NJykge1xuICAgICAgICAgICAgaWkgPSBpbmRleE9mJDEuY2FsbCh0aGlzLl9zaG9ydE1vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlpID0gaW5kZXhPZiQxLmNhbGwodGhpcy5fbG9uZ01vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YkMS5jYWxsKHRoaXMuX3Nob3J0TW9udGhzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWkgPSBpbmRleE9mJDEuY2FsbCh0aGlzLl9sb25nTW9udGhzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWkgPSBpbmRleE9mJDEuY2FsbCh0aGlzLl9sb25nTW9udGhzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWkgPSBpbmRleE9mJDEuY2FsbCh0aGlzLl9zaG9ydE1vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbG9jYWxlTW9udGhzUGFyc2UgKG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcbiAgICB2YXIgaSwgbW9tLCByZWdleDtcblxuICAgIGlmICh0aGlzLl9tb250aHNQYXJzZUV4YWN0KSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVTdHJpY3RQYXJzZS5jYWxsKHRoaXMsIG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fbW9udGhzUGFyc2UpIHtcbiAgICAgICAgdGhpcy5fbW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlID0gW107XG4gICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgPSBbXTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBhZGQgc29ydGluZ1xuICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgbW9udGggKG9yIGFiYnIpIGlzIGEgcHJlZml4IG9mIGFub3RoZXJcbiAgICAvLyBzZWUgc29ydGluZyBpbiBjb21wdXRlTW9udGhzUGFyc2VcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcbiAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCBpXSk7XG4gICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLm1vbnRocyhtb20sICcnKS5yZXBsYWNlKCcuJywgJycpICsgJyQnLCAnaScpO1xuICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy5tb250aHNTaG9ydChtb20sICcnKS5yZXBsYWNlKCcuJywgJycpICsgJyQnLCAnaScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3RyaWN0ICYmICF0aGlzLl9tb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgcmVnZXggPSAnXicgKyB0aGlzLm1vbnRocyhtb20sICcnKSArICd8XicgKyB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpO1xuICAgICAgICAgICAgdGhpcy5fbW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKHJlZ2V4LnJlcGxhY2UoJy4nLCAnJyksICdpJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcbiAgICAgICAgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdNTU1NJyAmJiB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfSBlbHNlIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NJyAmJiB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiB0aGlzLl9tb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBNT01FTlRTXG5cbmZ1bmN0aW9uIHNldE1vbnRoIChtb20sIHZhbHVlKSB7XG4gICAgdmFyIGRheU9mTW9udGg7XG5cbiAgICBpZiAoIW1vbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgLy8gTm8gb3BcbiAgICAgICAgcmV0dXJuIG1vbTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoL15cXGQrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdG9JbnQodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgPSBtb20ubG9jYWxlRGF0YSgpLm1vbnRoc1BhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgIC8vIFRPRE86IEFub3RoZXIgc2lsZW50IGZhaWx1cmU/XG4gICAgICAgICAgICBpZiAoIWlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb207XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkYXlPZk1vbnRoID0gTWF0aC5taW4obW9tLmRhdGUoKSwgZGF5c0luTW9udGgobW9tLnllYXIoKSwgdmFsdWUpKTtcbiAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgJ01vbnRoJ10odmFsdWUsIGRheU9mTW9udGgpO1xuICAgIHJldHVybiBtb207XG59XG5cbmZ1bmN0aW9uIGdldFNldE1vbnRoICh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIHNldE1vbnRoKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZ2V0KHRoaXMsICdNb250aCcpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGF5c0luTW9udGggKCkge1xuICAgIHJldHVybiBkYXlzSW5Nb250aCh0aGlzLnllYXIoKSwgdGhpcy5tb250aCgpKTtcbn1cblxudmFyIGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4ID0gbWF0Y2hXb3JkO1xuZnVuY3Rpb24gbW9udGhzU2hvcnRSZWdleCAoaXNTdHJpY3QpIHtcbiAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XG4gICAgICAgICAgICBjb21wdXRlTW9udGhzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0UmVnZXg7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNTaG9ydFJlZ2V4JykpIHtcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1Nob3J0UmVnZXggPSBkZWZhdWx0TW9udGhzU2hvcnRSZWdleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgICAgICB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4IDogdGhpcy5fbW9udGhzU2hvcnRSZWdleDtcbiAgICB9XG59XG5cbnZhciBkZWZhdWx0TW9udGhzUmVnZXggPSBtYXRjaFdvcmQ7XG5mdW5jdGlvbiBtb250aHNSZWdleCAoaXNTdHJpY3QpIHtcbiAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XG4gICAgICAgICAgICBjb21wdXRlTW9udGhzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTdHJpY3RSZWdleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNSZWdleDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1JlZ2V4JykpIHtcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1JlZ2V4ID0gZGVmYXVsdE1vbnRoc1JlZ2V4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgICAgICB0aGlzLl9tb250aHNTdHJpY3RSZWdleCA6IHRoaXMuX21vbnRoc1JlZ2V4O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY29tcHV0ZU1vbnRoc1BhcnNlICgpIHtcbiAgICBmdW5jdGlvbiBjbXBMZW5SZXYoYSwgYikge1xuICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcbiAgICB9XG5cbiAgICB2YXIgc2hvcnRQaWVjZXMgPSBbXSwgbG9uZ1BpZWNlcyA9IFtdLCBtaXhlZFBpZWNlcyA9IFtdLFxuICAgICAgICBpLCBtb207XG4gICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgaV0pO1xuICAgICAgICBzaG9ydFBpZWNlcy5wdXNoKHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykpO1xuICAgICAgICBsb25nUGllY2VzLnB1c2godGhpcy5tb250aHMobW9tLCAnJykpO1xuICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHRoaXMubW9udGhzKG1vbSwgJycpKTtcbiAgICAgICAgbWl4ZWRQaWVjZXMucHVzaCh0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpKTtcbiAgICB9XG4gICAgLy8gU29ydGluZyBtYWtlcyBzdXJlIGlmIG9uZSBtb250aCAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlciBpdFxuICAgIC8vIHdpbGwgbWF0Y2ggdGhlIGxvbmdlciBwaWVjZS5cbiAgICBzaG9ydFBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgbG9uZ1BpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgbWl4ZWRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgIHNob3J0UGllY2VzW2ldID0gcmVnZXhFc2NhcGUoc2hvcnRQaWVjZXNbaV0pO1xuICAgICAgICBsb25nUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobG9uZ1BpZWNlc1tpXSk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCAyNDsgaSsrKSB7XG4gICAgICAgIG1peGVkUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobWl4ZWRQaWVjZXNbaV0pO1xuICAgIH1cblxuICAgIHRoaXMuX21vbnRoc1JlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbWl4ZWRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgIHRoaXMuX21vbnRoc1Nob3J0UmVnZXggPSB0aGlzLl9tb250aHNSZWdleDtcbiAgICB0aGlzLl9tb250aHNTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIGxvbmdQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBzaG9ydFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG59XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oJ1knLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHkgPSB0aGlzLnllYXIoKTtcbiAgICByZXR1cm4geSA8PSA5OTk5ID8gJycgKyB5IDogJysnICsgeTtcbn0pO1xuXG5hZGRGb3JtYXRUb2tlbigwLCBbJ1lZJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy55ZWFyKCkgJSAxMDA7XG59KTtcblxuYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZJywgICA0XSwgICAgICAgMCwgJ3llYXInKTtcbmFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWVknLCAgNV0sICAgICAgIDAsICd5ZWFyJyk7XG5hZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVlZWScsIDYsIHRydWVdLCAwLCAneWVhcicpO1xuXG4vLyBBTElBU0VTXG5cbmFkZFVuaXRBbGlhcygneWVhcicsICd5Jyk7XG5cbi8vIFBSSU9SSVRJRVNcblxuYWRkVW5pdFByaW9yaXR5KCd5ZWFyJywgMSk7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbignWScsICAgICAgbWF0Y2hTaWduZWQpO1xuYWRkUmVnZXhUb2tlbignWVknLCAgICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuYWRkUmVnZXhUb2tlbignWVlZWScsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xuYWRkUmVnZXhUb2tlbignWVlZWVknLCAgbWF0Y2gxdG82LCBtYXRjaDYpO1xuYWRkUmVnZXhUb2tlbignWVlZWVlZJywgbWF0Y2gxdG82LCBtYXRjaDYpO1xuXG5hZGRQYXJzZVRva2VuKFsnWVlZWVknLCAnWVlZWVlZJ10sIFlFQVIpO1xuYWRkUGFyc2VUb2tlbignWVlZWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICBhcnJheVtZRUFSXSA9IGlucHV0Lmxlbmd0aCA9PT0gMiA/IGhvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KSA6IHRvSW50KGlucHV0KTtcbn0pO1xuYWRkUGFyc2VUb2tlbignWVknLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgYXJyYXlbWUVBUl0gPSBob29rcy5wYXJzZVR3b0RpZ2l0WWVhcihpbnB1dCk7XG59KTtcbmFkZFBhcnNlVG9rZW4oJ1knLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgYXJyYXlbWUVBUl0gPSBwYXJzZUludChpbnB1dCwgMTApO1xufSk7XG5cbi8vIEhFTFBFUlNcblxuZnVuY3Rpb24gZGF5c0luWWVhcih5ZWFyKSB7XG4gICAgcmV0dXJuIGlzTGVhcFllYXIoeWVhcikgPyAzNjYgOiAzNjU7XG59XG5cbmZ1bmN0aW9uIGlzTGVhcFllYXIoeWVhcikge1xuICAgIHJldHVybiAoeWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCkgfHwgeWVhciAlIDQwMCA9PT0gMDtcbn1cblxuLy8gSE9PS1NcblxuaG9va3MucGFyc2VUd29EaWdpdFllYXIgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICByZXR1cm4gdG9JbnQoaW5wdXQpICsgKHRvSW50KGlucHV0KSA+IDY4ID8gMTkwMCA6IDIwMDApO1xufTtcblxuLy8gTU9NRU5UU1xuXG52YXIgZ2V0U2V0WWVhciA9IG1ha2VHZXRTZXQoJ0Z1bGxZZWFyJywgdHJ1ZSk7XG5cbmZ1bmN0aW9uIGdldElzTGVhcFllYXIgKCkge1xuICAgIHJldHVybiBpc0xlYXBZZWFyKHRoaXMueWVhcigpKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGF0ZSAoeSwgbSwgZCwgaCwgTSwgcywgbXMpIHtcbiAgICAvLyBjYW4ndCBqdXN0IGFwcGx5KCkgdG8gY3JlYXRlIGEgZGF0ZTpcbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3EvMTgxMzQ4XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh5LCBtLCBkLCBoLCBNLCBzLCBtcyk7XG5cbiAgICAvLyB0aGUgZGF0ZSBjb25zdHJ1Y3RvciByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICBpZiAoeSA8IDEwMCAmJiB5ID49IDAgJiYgaXNGaW5pdGUoZGF0ZS5nZXRGdWxsWWVhcigpKSkge1xuICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKHkpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0ZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVVRDRGF0ZSAoeSkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMuYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG5cbiAgICAvLyB0aGUgRGF0ZS5VVEMgZnVuY3Rpb24gcmVtYXBzIHllYXJzIDAtOTkgdG8gMTkwMC0xOTk5XG4gICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwICYmIGlzRmluaXRlKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSkpIHtcbiAgICAgICAgZGF0ZS5zZXRVVENGdWxsWWVhcih5KTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGU7XG59XG5cbi8vIHN0YXJ0LW9mLWZpcnN0LXdlZWsgLSBzdGFydC1vZi15ZWFyXG5mdW5jdGlvbiBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpIHtcbiAgICB2YXIgLy8gZmlyc3Qtd2VlayBkYXkgLS0gd2hpY2ggamFudWFyeSBpcyBhbHdheXMgaW4gdGhlIGZpcnN0IHdlZWsgKDQgZm9yIGlzbywgMSBmb3Igb3RoZXIpXG4gICAgICAgIGZ3ZCA9IDcgKyBkb3cgLSBkb3ksXG4gICAgICAgIC8vIGZpcnN0LXdlZWsgZGF5IGxvY2FsIHdlZWtkYXkgLS0gd2hpY2ggbG9jYWwgd2Vla2RheSBpcyBmd2RcbiAgICAgICAgZndkbHcgPSAoNyArIGNyZWF0ZVVUQ0RhdGUoeWVhciwgMCwgZndkKS5nZXRVVENEYXkoKSAtIGRvdykgJSA3O1xuXG4gICAgcmV0dXJuIC1md2RsdyArIGZ3ZCAtIDE7XG59XG5cbi8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGUjQ2FsY3VsYXRpbmdfYV9kYXRlX2dpdmVuX3RoZV95ZWFyLjJDX3dlZWtfbnVtYmVyX2FuZF93ZWVrZGF5XG5mdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla3MoeWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcbiAgICB2YXIgbG9jYWxXZWVrZGF5ID0gKDcgKyB3ZWVrZGF5IC0gZG93KSAlIDcsXG4gICAgICAgIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpLFxuICAgICAgICBkYXlPZlllYXIgPSAxICsgNyAqICh3ZWVrIC0gMSkgKyBsb2NhbFdlZWtkYXkgKyB3ZWVrT2Zmc2V0LFxuICAgICAgICByZXNZZWFyLCByZXNEYXlPZlllYXI7XG5cbiAgICBpZiAoZGF5T2ZZZWFyIDw9IDApIHtcbiAgICAgICAgcmVzWWVhciA9IHllYXIgLSAxO1xuICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlzSW5ZZWFyKHJlc1llYXIpICsgZGF5T2ZZZWFyO1xuICAgIH0gZWxzZSBpZiAoZGF5T2ZZZWFyID4gZGF5c0luWWVhcih5ZWFyKSkge1xuICAgICAgICByZXNZZWFyID0geWVhciArIDE7XG4gICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhciAtIGRheXNJblllYXIoeWVhcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVzWWVhciA9IHllYXI7XG4gICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhcjtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB5ZWFyOiByZXNZZWFyLFxuICAgICAgICBkYXlPZlllYXI6IHJlc0RheU9mWWVhclxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHdlZWtPZlllYXIobW9tLCBkb3csIGRveSkge1xuICAgIHZhciB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KG1vbS55ZWFyKCksIGRvdywgZG95KSxcbiAgICAgICAgd2VlayA9IE1hdGguZmxvb3IoKG1vbS5kYXlPZlllYXIoKSAtIHdlZWtPZmZzZXQgLSAxKSAvIDcpICsgMSxcbiAgICAgICAgcmVzV2VlaywgcmVzWWVhcjtcblxuICAgIGlmICh3ZWVrIDwgMSkge1xuICAgICAgICByZXNZZWFyID0gbW9tLnllYXIoKSAtIDE7XG4gICAgICAgIHJlc1dlZWsgPSB3ZWVrICsgd2Vla3NJblllYXIocmVzWWVhciwgZG93LCBkb3kpO1xuICAgIH0gZWxzZSBpZiAod2VlayA+IHdlZWtzSW5ZZWFyKG1vbS55ZWFyKCksIGRvdywgZG95KSkge1xuICAgICAgICByZXNXZWVrID0gd2VlayAtIHdlZWtzSW5ZZWFyKG1vbS55ZWFyKCksIGRvdywgZG95KTtcbiAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCkgKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpO1xuICAgICAgICByZXNXZWVrID0gd2VlaztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB3ZWVrOiByZXNXZWVrLFxuICAgICAgICB5ZWFyOiByZXNZZWFyXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gd2Vla3NJblllYXIoeWVhciwgZG93LCBkb3kpIHtcbiAgICB2YXIgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSksXG4gICAgICAgIHdlZWtPZmZzZXROZXh0ID0gZmlyc3RXZWVrT2Zmc2V0KHllYXIgKyAxLCBkb3csIGRveSk7XG4gICAgcmV0dXJuIChkYXlzSW5ZZWFyKHllYXIpIC0gd2Vla09mZnNldCArIHdlZWtPZmZzZXROZXh0KSAvIDc7XG59XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oJ3cnLCBbJ3d3JywgMl0sICd3bycsICd3ZWVrJyk7XG5hZGRGb3JtYXRUb2tlbignVycsIFsnV1cnLCAyXSwgJ1dvJywgJ2lzb1dlZWsnKTtcblxuLy8gQUxJQVNFU1xuXG5hZGRVbml0QWxpYXMoJ3dlZWsnLCAndycpO1xuYWRkVW5pdEFsaWFzKCdpc29XZWVrJywgJ1cnKTtcblxuLy8gUFJJT1JJVElFU1xuXG5hZGRVbml0UHJpb3JpdHkoJ3dlZWsnLCA1KTtcbmFkZFVuaXRQcmlvcml0eSgnaXNvV2VlaycsIDUpO1xuXG4vLyBQQVJTSU5HXG5cbmFkZFJlZ2V4VG9rZW4oJ3cnLCAgbWF0Y2gxdG8yKTtcbmFkZFJlZ2V4VG9rZW4oJ3d3JywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuYWRkUmVnZXhUb2tlbignVycsICBtYXRjaDF0bzIpO1xuYWRkUmVnZXhUb2tlbignV1cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG5cbmFkZFdlZWtQYXJzZVRva2VuKFsndycsICd3dycsICdXJywgJ1dXJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgIHdlZWtbdG9rZW4uc3Vic3RyKDAsIDEpXSA9IHRvSW50KGlucHV0KTtcbn0pO1xuXG4vLyBIRUxQRVJTXG5cbi8vIExPQ0FMRVNcblxuZnVuY3Rpb24gbG9jYWxlV2VlayAobW9tKSB7XG4gICAgcmV0dXJuIHdlZWtPZlllYXIobW9tLCB0aGlzLl93ZWVrLmRvdywgdGhpcy5fd2Vlay5kb3kpLndlZWs7XG59XG5cbnZhciBkZWZhdWx0TG9jYWxlV2VlayA9IHtcbiAgICBkb3cgOiAwLCAvLyBTdW5kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICBkb3kgOiA2ICAvLyBUaGUgd2VlayB0aGF0IGNvbnRhaW5zIEphbiAxc3QgaXMgdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXIuXG59O1xuXG5mdW5jdGlvbiBsb2NhbGVGaXJzdERheU9mV2VlayAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dlZWsuZG93O1xufVxuXG5mdW5jdGlvbiBsb2NhbGVGaXJzdERheU9mWWVhciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dlZWsuZG95O1xufVxuXG4vLyBNT01FTlRTXG5cbmZ1bmN0aW9uIGdldFNldFdlZWsgKGlucHV0KSB7XG4gICAgdmFyIHdlZWsgPSB0aGlzLmxvY2FsZURhdGEoKS53ZWVrKHRoaXMpO1xuICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gd2VlayA6IHRoaXMuYWRkKChpbnB1dCAtIHdlZWspICogNywgJ2QnKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2V0SVNPV2VlayAoaW5wdXQpIHtcbiAgICB2YXIgd2VlayA9IHdlZWtPZlllYXIodGhpcywgMSwgNCkud2VlaztcbiAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWsgOiB0aGlzLmFkZCgoaW5wdXQgLSB3ZWVrKSAqIDcsICdkJyk7XG59XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oJ2QnLCAwLCAnZG8nLCAnZGF5Jyk7XG5cbmFkZEZvcm1hdFRva2VuKCdkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXNNaW4odGhpcywgZm9ybWF0KTtcbn0pO1xuXG5hZGRGb3JtYXRUb2tlbignZGRkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5c1Nob3J0KHRoaXMsIGZvcm1hdCk7XG59KTtcblxuYWRkRm9ybWF0VG9rZW4oJ2RkZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzKHRoaXMsIGZvcm1hdCk7XG59KTtcblxuYWRkRm9ybWF0VG9rZW4oJ2UnLCAwLCAwLCAnd2Vla2RheScpO1xuYWRkRm9ybWF0VG9rZW4oJ0UnLCAwLCAwLCAnaXNvV2Vla2RheScpO1xuXG4vLyBBTElBU0VTXG5cbmFkZFVuaXRBbGlhcygnZGF5JywgJ2QnKTtcbmFkZFVuaXRBbGlhcygnd2Vla2RheScsICdlJyk7XG5hZGRVbml0QWxpYXMoJ2lzb1dlZWtkYXknLCAnRScpO1xuXG4vLyBQUklPUklUWVxuYWRkVW5pdFByaW9yaXR5KCdkYXknLCAxMSk7XG5hZGRVbml0UHJpb3JpdHkoJ3dlZWtkYXknLCAxMSk7XG5hZGRVbml0UHJpb3JpdHkoJ2lzb1dlZWtkYXknLCAxMSk7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbignZCcsICAgIG1hdGNoMXRvMik7XG5hZGRSZWdleFRva2VuKCdlJywgICAgbWF0Y2gxdG8yKTtcbmFkZFJlZ2V4VG9rZW4oJ0UnLCAgICBtYXRjaDF0bzIpO1xuYWRkUmVnZXhUb2tlbignZGQnLCAgIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c01pblJlZ2V4KGlzU3RyaWN0KTtcbn0pO1xuYWRkUmVnZXhUb2tlbignZGRkJywgICBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgIHJldHVybiBsb2NhbGUud2Vla2RheXNTaG9ydFJlZ2V4KGlzU3RyaWN0KTtcbn0pO1xuYWRkUmVnZXhUb2tlbignZGRkZCcsICAgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzUmVnZXgoaXNTdHJpY3QpO1xufSk7XG5cbmFkZFdlZWtQYXJzZVRva2VuKFsnZGQnLCAnZGRkJywgJ2RkZGQnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgdmFyIHdlZWtkYXkgPSBjb25maWcuX2xvY2FsZS53ZWVrZGF5c1BhcnNlKGlucHV0LCB0b2tlbiwgY29uZmlnLl9zdHJpY3QpO1xuICAgIC8vIGlmIHdlIGRpZG4ndCBnZXQgYSB3ZWVrZGF5IG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZFxuICAgIGlmICh3ZWVrZGF5ICE9IG51bGwpIHtcbiAgICAgICAgd2Vlay5kID0gd2Vla2RheTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5pbnZhbGlkV2Vla2RheSA9IGlucHV0O1xuICAgIH1cbn0pO1xuXG5hZGRXZWVrUGFyc2VUb2tlbihbJ2QnLCAnZScsICdFJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgIHdlZWtbdG9rZW5dID0gdG9JbnQoaW5wdXQpO1xufSk7XG5cbi8vIEhFTFBFUlNcblxuZnVuY3Rpb24gcGFyc2VXZWVrZGF5KGlucHV0LCBsb2NhbGUpIHtcbiAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuXG4gICAgaWYgKCFpc05hTihpbnB1dCkpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGlucHV0LCAxMCk7XG4gICAgfVxuXG4gICAgaW5wdXQgPSBsb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCk7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBwYXJzZUlzb1dlZWtkYXkoaW5wdXQsIGxvY2FsZSkge1xuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCkgJSA3IHx8IDc7XG4gICAgfVxuICAgIHJldHVybiBpc05hTihpbnB1dCkgPyBudWxsIDogaW5wdXQ7XG59XG5cbi8vIExPQ0FMRVNcblxudmFyIGRlZmF1bHRMb2NhbGVXZWVrZGF5cyA9ICdTdW5kYXlfTW9uZGF5X1R1ZXNkYXlfV2VkbmVzZGF5X1RodXJzZGF5X0ZyaWRheV9TYXR1cmRheScuc3BsaXQoJ18nKTtcbmZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzIChtLCBmb3JtYXQpIHtcbiAgICBpZiAoIW0pIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fd2Vla2RheXMpID8gdGhpcy5fd2Vla2RheXMgOlxuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNbJ3N0YW5kYWxvbmUnXTtcbiAgICB9XG4gICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fd2Vla2RheXMpID8gdGhpcy5fd2Vla2RheXNbbS5kYXkoKV0gOlxuICAgICAgICB0aGlzLl93ZWVrZGF5c1t0aGlzLl93ZWVrZGF5cy5pc0Zvcm1hdC50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJ11bbS5kYXkoKV07XG59XG5cbnZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXNTaG9ydCA9ICdTdW5fTW9uX1R1ZV9XZWRfVGh1X0ZyaV9TYXQnLnNwbGl0KCdfJyk7XG5mdW5jdGlvbiBsb2NhbGVXZWVrZGF5c1Nob3J0IChtKSB7XG4gICAgcmV0dXJuIChtKSA/IHRoaXMuX3dlZWtkYXlzU2hvcnRbbS5kYXkoKV0gOiB0aGlzLl93ZWVrZGF5c1Nob3J0O1xufVxuXG52YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzTWluID0gJ1N1X01vX1R1X1dlX1RoX0ZyX1NhJy5zcGxpdCgnXycpO1xuZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNNaW4gKG0pIHtcbiAgICByZXR1cm4gKG0pID8gdGhpcy5fd2Vla2RheXNNaW5bbS5kYXkoKV0gOiB0aGlzLl93ZWVrZGF5c01pbjtcbn1cblxuZnVuY3Rpb24gaGFuZGxlU3RyaWN0UGFyc2UkMSh3ZWVrZGF5TmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcbiAgICB2YXIgaSwgaWksIG1vbSwgbGxjID0gd2Vla2RheU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2UpIHtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZSA9IFtdO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyArK2kpIHtcbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzKG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RyaWN0KSB7XG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdkZGRkJykge1xuICAgICAgICAgICAgaWkgPSBpbmRleE9mJDEuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQgPT09ICdkZGQnKSB7XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YkMS5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YkMS5jYWxsKHRoaXMuX21pbldlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ2RkZGQnKSB7XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YkMS5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWkgPSBpbmRleE9mJDEuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWkgPSBpbmRleE9mJDEuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQgPT09ICdkZGQnKSB7XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YkMS5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YkMS5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWkgPSBpbmRleE9mJDEuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlpID0gaW5kZXhPZiQxLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpaSA9IGluZGV4T2YkMS5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWkgPSBpbmRleE9mJDEuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsb2NhbGVXZWVrZGF5c1BhcnNlICh3ZWVrZGF5TmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcbiAgICB2YXIgaSwgbW9tLCByZWdleDtcblxuICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZVN0cmljdFBhcnNlJDEuY2FsbCh0aGlzLCB3ZWVrZGF5TmFtZSwgZm9ybWF0LCBzdHJpY3QpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZSkge1xuICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlID0gW107XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcblxuICAgICAgICBtb20gPSBjcmVhdGVVVEMoWzIwMDAsIDFdKS5kYXkoaSk7XG4gICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldKSB7XG4gICAgICAgICAgICB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy53ZWVrZGF5cyhtb20sICcnKS5yZXBsYWNlKCcuJywgJ1xcLj8nKSArICckJywgJ2knKTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFwuPycpICsgJyQnLCAnaScpO1xuICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy53ZWVrZGF5c01pbihtb20sICcnKS5yZXBsYWNlKCcuJywgJ1xcLj8nKSArICckJywgJ2knKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2VbaV0pIHtcbiAgICAgICAgICAgIHJlZ2V4ID0gJ14nICsgdGhpcy53ZWVrZGF5cyhtb20sICcnKSArICd8XicgKyB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykgKyAnfF4nICsgdGhpcy53ZWVrZGF5c01pbihtb20sICcnKTtcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKHJlZ2V4LnJlcGxhY2UoJy4nLCAnJyksICdpJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcbiAgICAgICAgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdkZGRkJyAmJiB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ2RkZCcgJiYgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfSBlbHNlIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnZGQnICYmIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9IGVsc2UgaWYgKCFzdHJpY3QgJiYgdGhpcy5fd2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIE1PTUVOVFNcblxuZnVuY3Rpb24gZ2V0U2V0RGF5T2ZXZWVrIChpbnB1dCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xuICAgIH1cbiAgICB2YXIgZGF5ID0gdGhpcy5faXNVVEMgPyB0aGlzLl9kLmdldFVUQ0RheSgpIDogdGhpcy5fZC5nZXREYXkoKTtcbiAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICBpbnB1dCA9IHBhcnNlV2Vla2RheShpbnB1dCwgdGhpcy5sb2NhbGVEYXRhKCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQoaW5wdXQgLSBkYXksICdkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRheTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFNldExvY2FsZURheU9mV2VlayAoaW5wdXQpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcbiAgICB9XG4gICAgdmFyIHdlZWtkYXkgPSAodGhpcy5kYXkoKSArIDcgLSB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3cpICUgNztcbiAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWtkYXkgOiB0aGlzLmFkZChpbnB1dCAtIHdlZWtkYXksICdkJyk7XG59XG5cbmZ1bmN0aW9uIGdldFNldElTT0RheU9mV2VlayAoaW5wdXQpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcbiAgICB9XG5cbiAgICAvLyBiZWhhdmVzIHRoZSBzYW1lIGFzIG1vbWVudCNkYXkgZXhjZXB0XG4gICAgLy8gYXMgYSBnZXR0ZXIsIHJldHVybnMgNyBpbnN0ZWFkIG9mIDAgKDEtNyByYW5nZSBpbnN0ZWFkIG9mIDAtNilcbiAgICAvLyBhcyBhIHNldHRlciwgc3VuZGF5IHNob3VsZCBiZWxvbmcgdG8gdGhlIHByZXZpb3VzIHdlZWsuXG5cbiAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICB2YXIgd2Vla2RheSA9IHBhcnNlSXNvV2Vla2RheShpbnB1dCwgdGhpcy5sb2NhbGVEYXRhKCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYXkodGhpcy5kYXkoKSAlIDcgPyB3ZWVrZGF5IDogd2Vla2RheSAtIDcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRheSgpIHx8IDc7XG4gICAgfVxufVxuXG52YXIgZGVmYXVsdFdlZWtkYXlzUmVnZXggPSBtYXRjaFdvcmQ7XG5mdW5jdGlvbiB3ZWVrZGF5c1JlZ2V4IChpc1N0cmljdCkge1xuICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XG4gICAgICAgICAgICBjb21wdXRlV2Vla2RheXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1N0cmljdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNSZWdleDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNSZWdleCA9IGRlZmF1bHRXZWVrZGF5c1JlZ2V4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1N0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXggOiB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuICAgIH1cbn1cblxudmFyIGRlZmF1bHRXZWVrZGF5c1Nob3J0UmVnZXggPSBtYXRjaFdvcmQ7XG5mdW5jdGlvbiB3ZWVrZGF5c1Nob3J0UmVnZXggKGlzU3RyaWN0KSB7XG4gICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcbiAgICAgICAgICAgIGNvbXB1dGVXZWVrZGF5c1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzU2hvcnRSZWdleCcpKSB7XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXggPSBkZWZhdWx0V2Vla2RheXNTaG9ydFJlZ2V4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4IDogdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4O1xuICAgIH1cbn1cblxudmFyIGRlZmF1bHRXZWVrZGF5c01pblJlZ2V4ID0gbWF0Y2hXb3JkO1xuZnVuY3Rpb24gd2Vla2RheXNNaW5SZWdleCAoaXNTdHJpY3QpIHtcbiAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xuICAgICAgICAgICAgY29tcHV0ZVdlZWtkYXlzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluUmVnZXg7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c01pblJlZ2V4JykpIHtcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzTWluUmVnZXggPSBkZWZhdWx0V2Vla2RheXNNaW5SZWdleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4IDogdGhpcy5fd2Vla2RheXNNaW5SZWdleDtcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gY29tcHV0ZVdlZWtkYXlzUGFyc2UgKCkge1xuICAgIGZ1bmN0aW9uIGNtcExlblJldihhLCBiKSB7XG4gICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xuICAgIH1cblxuICAgIHZhciBtaW5QaWVjZXMgPSBbXSwgc2hvcnRQaWVjZXMgPSBbXSwgbG9uZ1BpZWNlcyA9IFtdLCBtaXhlZFBpZWNlcyA9IFtdLFxuICAgICAgICBpLCBtb20sIG1pbnAsIHNob3J0cCwgbG9uZ3A7XG4gICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcbiAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCAxXSkuZGF5KGkpO1xuICAgICAgICBtaW5wID0gdGhpcy53ZWVrZGF5c01pbihtb20sICcnKTtcbiAgICAgICAgc2hvcnRwID0gdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpO1xuICAgICAgICBsb25ncCA9IHRoaXMud2Vla2RheXMobW9tLCAnJyk7XG4gICAgICAgIG1pblBpZWNlcy5wdXNoKG1pbnApO1xuICAgICAgICBzaG9ydFBpZWNlcy5wdXNoKHNob3J0cCk7XG4gICAgICAgIGxvbmdQaWVjZXMucHVzaChsb25ncCk7XG4gICAgICAgIG1peGVkUGllY2VzLnB1c2gobWlucCk7XG4gICAgICAgIG1peGVkUGllY2VzLnB1c2goc2hvcnRwKTtcbiAgICAgICAgbWl4ZWRQaWVjZXMucHVzaChsb25ncCk7XG4gICAgfVxuICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgd2Vla2RheSAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlciBpdFxuICAgIC8vIHdpbGwgbWF0Y2ggdGhlIGxvbmdlciBwaWVjZS5cbiAgICBtaW5QaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgIHNob3J0UGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICBsb25nUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICBtaXhlZFBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICBzaG9ydFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKHNob3J0UGllY2VzW2ldKTtcbiAgICAgICAgbG9uZ1BpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKGxvbmdQaWVjZXNbaV0pO1xuICAgICAgICBtaXhlZFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKG1peGVkUGllY2VzW2ldKTtcbiAgICB9XG5cbiAgICB0aGlzLl93ZWVrZGF5c1JlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbWl4ZWRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgIHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleCA9IHRoaXMuX3dlZWtkYXlzUmVnZXg7XG4gICAgdGhpcy5fd2Vla2RheXNNaW5SZWdleCA9IHRoaXMuX3dlZWtkYXlzUmVnZXg7XG5cbiAgICB0aGlzLl93ZWVrZGF5c1N0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbG9uZ1BpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG4gICAgdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgc2hvcnRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBtaW5QaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xufVxuXG4vLyBGT1JNQVRUSU5HXG5cbmZ1bmN0aW9uIGhGb3JtYXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaG91cnMoKSAlIDEyIHx8IDEyO1xufVxuXG5mdW5jdGlvbiBrRm9ybWF0KCkge1xuICAgIHJldHVybiB0aGlzLmhvdXJzKCkgfHwgMjQ7XG59XG5cbmFkZEZvcm1hdFRva2VuKCdIJywgWydISCcsIDJdLCAwLCAnaG91cicpO1xuYWRkRm9ybWF0VG9rZW4oJ2gnLCBbJ2hoJywgMl0sIDAsIGhGb3JtYXQpO1xuYWRkRm9ybWF0VG9rZW4oJ2snLCBbJ2trJywgMl0sIDAsIGtGb3JtYXQpO1xuXG5hZGRGb3JtYXRUb2tlbignaG1tJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnJyArIGhGb3JtYXQuYXBwbHkodGhpcykgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMik7XG59KTtcblxuYWRkRm9ybWF0VG9rZW4oJ2htbXNzJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnJyArIGhGb3JtYXQuYXBwbHkodGhpcykgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMikgK1xuICAgICAgICB6ZXJvRmlsbCh0aGlzLnNlY29uZHMoKSwgMik7XG59KTtcblxuYWRkRm9ybWF0VG9rZW4oJ0htbScsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJycgKyB0aGlzLmhvdXJzKCkgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMik7XG59KTtcblxuYWRkRm9ybWF0VG9rZW4oJ0htbXNzJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnJyArIHRoaXMuaG91cnMoKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKSArXG4gICAgICAgIHplcm9GaWxsKHRoaXMuc2Vjb25kcygpLCAyKTtcbn0pO1xuXG5mdW5jdGlvbiBtZXJpZGllbSAodG9rZW4sIGxvd2VyY2FzZSkge1xuICAgIGFkZEZvcm1hdFRva2VuKHRva2VuLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tZXJpZGllbSh0aGlzLmhvdXJzKCksIHRoaXMubWludXRlcygpLCBsb3dlcmNhc2UpO1xuICAgIH0pO1xufVxuXG5tZXJpZGllbSgnYScsIHRydWUpO1xubWVyaWRpZW0oJ0EnLCBmYWxzZSk7XG5cbi8vIEFMSUFTRVNcblxuYWRkVW5pdEFsaWFzKCdob3VyJywgJ2gnKTtcblxuLy8gUFJJT1JJVFlcbmFkZFVuaXRQcmlvcml0eSgnaG91cicsIDEzKTtcblxuLy8gUEFSU0lOR1xuXG5mdW5jdGlvbiBtYXRjaE1lcmlkaWVtIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5fbWVyaWRpZW1QYXJzZTtcbn1cblxuYWRkUmVnZXhUb2tlbignYScsICBtYXRjaE1lcmlkaWVtKTtcbmFkZFJlZ2V4VG9rZW4oJ0EnLCAgbWF0Y2hNZXJpZGllbSk7XG5hZGRSZWdleFRva2VuKCdIJywgIG1hdGNoMXRvMik7XG5hZGRSZWdleFRva2VuKCdoJywgIG1hdGNoMXRvMik7XG5hZGRSZWdleFRva2VuKCdrJywgIG1hdGNoMXRvMik7XG5hZGRSZWdleFRva2VuKCdISCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbmFkZFJlZ2V4VG9rZW4oJ2hoJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuYWRkUmVnZXhUb2tlbigna2snLCBtYXRjaDF0bzIsIG1hdGNoMik7XG5cbmFkZFJlZ2V4VG9rZW4oJ2htbScsIG1hdGNoM3RvNCk7XG5hZGRSZWdleFRva2VuKCdobW1zcycsIG1hdGNoNXRvNik7XG5hZGRSZWdleFRva2VuKCdIbW0nLCBtYXRjaDN0bzQpO1xuYWRkUmVnZXhUb2tlbignSG1tc3MnLCBtYXRjaDV0bzYpO1xuXG5hZGRQYXJzZVRva2VuKFsnSCcsICdISCddLCBIT1VSKTtcbmFkZFBhcnNlVG9rZW4oWydrJywgJ2trJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgIHZhciBrSW5wdXQgPSB0b0ludChpbnB1dCk7XG4gICAgYXJyYXlbSE9VUl0gPSBrSW5wdXQgPT09IDI0ID8gMCA6IGtJbnB1dDtcbn0pO1xuYWRkUGFyc2VUb2tlbihbJ2EnLCAnQSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICBjb25maWcuX2lzUG0gPSBjb25maWcuX2xvY2FsZS5pc1BNKGlucHV0KTtcbiAgICBjb25maWcuX21lcmlkaWVtID0gaW5wdXQ7XG59KTtcbmFkZFBhcnNlVG9rZW4oWydoJywgJ2hoJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQpO1xuICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB0cnVlO1xufSk7XG5hZGRQYXJzZVRva2VuKCdobW0nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICB2YXIgcG9zID0gaW5wdXQubGVuZ3RoIC0gMjtcbiAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MpKTtcbiAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvcykpO1xuICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB0cnVlO1xufSk7XG5hZGRQYXJzZVRva2VuKCdobW1zcycsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgIHZhciBwb3MxID0gaW5wdXQubGVuZ3RoIC0gNDtcbiAgICB2YXIgcG9zMiA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zMSkpO1xuICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMSwgMikpO1xuICAgIGFycmF5W1NFQ09ORF0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMikpO1xuICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB0cnVlO1xufSk7XG5hZGRQYXJzZVRva2VuKCdIbW0nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICB2YXIgcG9zID0gaW5wdXQubGVuZ3RoIC0gMjtcbiAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MpKTtcbiAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvcykpO1xufSk7XG5hZGRQYXJzZVRva2VuKCdIbW1zcycsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgIHZhciBwb3MxID0gaW5wdXQubGVuZ3RoIC0gNDtcbiAgICB2YXIgcG9zMiA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zMSkpO1xuICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMSwgMikpO1xuICAgIGFycmF5W1NFQ09ORF0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMikpO1xufSk7XG5cbi8vIExPQ0FMRVNcblxuZnVuY3Rpb24gbG9jYWxlSXNQTSAoaW5wdXQpIHtcbiAgICAvLyBJRTggUXVpcmtzIE1vZGUgJiBJRTcgU3RhbmRhcmRzIE1vZGUgZG8gbm90IGFsbG93IGFjY2Vzc2luZyBzdHJpbmdzIGxpa2UgYXJyYXlzXG4gICAgLy8gVXNpbmcgY2hhckF0IHNob3VsZCBiZSBtb3JlIGNvbXBhdGlibGUuXG4gICAgcmV0dXJuICgoaW5wdXQgKyAnJykudG9Mb3dlckNhc2UoKS5jaGFyQXQoMCkgPT09ICdwJyk7XG59XG5cbnZhciBkZWZhdWx0TG9jYWxlTWVyaWRpZW1QYXJzZSA9IC9bYXBdXFwuP20/XFwuPy9pO1xuZnVuY3Rpb24gbG9jYWxlTWVyaWRpZW0gKGhvdXJzLCBtaW51dGVzLCBpc0xvd2VyKSB7XG4gICAgaWYgKGhvdXJzID4gMTEpIHtcbiAgICAgICAgcmV0dXJuIGlzTG93ZXIgPyAncG0nIDogJ1BNJztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaXNMb3dlciA/ICdhbScgOiAnQU0nO1xuICAgIH1cbn1cblxuXG4vLyBNT01FTlRTXG5cbi8vIFNldHRpbmcgdGhlIGhvdXIgc2hvdWxkIGtlZXAgdGhlIHRpbWUsIGJlY2F1c2UgdGhlIHVzZXIgZXhwbGljaXRseVxuLy8gc3BlY2lmaWVkIHdoaWNoIGhvdXIgaGUgd2FudHMuIFNvIHRyeWluZyB0byBtYWludGFpbiB0aGUgc2FtZSBob3VyIChpblxuLy8gYSBuZXcgdGltZXpvbmUpIG1ha2VzIHNlbnNlLiBBZGRpbmcvc3VidHJhY3RpbmcgaG91cnMgZG9lcyBub3QgZm9sbG93XG4vLyB0aGlzIHJ1bGUuXG52YXIgZ2V0U2V0SG91ciA9IG1ha2VHZXRTZXQoJ0hvdXJzJywgdHJ1ZSk7XG5cbi8vIG1vbnRoc1xuLy8gd2Vla1xuLy8gd2Vla2RheXNcbi8vIG1lcmlkaWVtXG52YXIgYmFzZUNvbmZpZyA9IHtcbiAgICBjYWxlbmRhcjogZGVmYXVsdENhbGVuZGFyLFxuICAgIGxvbmdEYXRlRm9ybWF0OiBkZWZhdWx0TG9uZ0RhdGVGb3JtYXQsXG4gICAgaW52YWxpZERhdGU6IGRlZmF1bHRJbnZhbGlkRGF0ZSxcbiAgICBvcmRpbmFsOiBkZWZhdWx0T3JkaW5hbCxcbiAgICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiBkZWZhdWx0RGF5T2ZNb250aE9yZGluYWxQYXJzZSxcbiAgICByZWxhdGl2ZVRpbWU6IGRlZmF1bHRSZWxhdGl2ZVRpbWUsXG5cbiAgICBtb250aHM6IGRlZmF1bHRMb2NhbGVNb250aHMsXG4gICAgbW9udGhzU2hvcnQ6IGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydCxcblxuICAgIHdlZWs6IGRlZmF1bHRMb2NhbGVXZWVrLFxuXG4gICAgd2Vla2RheXM6IGRlZmF1bHRMb2NhbGVXZWVrZGF5cyxcbiAgICB3ZWVrZGF5c01pbjogZGVmYXVsdExvY2FsZVdlZWtkYXlzTWluLFxuICAgIHdlZWtkYXlzU2hvcnQ6IGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0LFxuXG4gICAgbWVyaWRpZW1QYXJzZTogZGVmYXVsdExvY2FsZU1lcmlkaWVtUGFyc2Vcbn07XG5cbi8vIGludGVybmFsIHN0b3JhZ2UgZm9yIGxvY2FsZSBjb25maWcgZmlsZXNcbnZhciBsb2NhbGVzID0ge307XG52YXIgbG9jYWxlRmFtaWxpZXMgPSB7fTtcbnZhciBnbG9iYWxMb2NhbGU7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUxvY2FsZShrZXkpIHtcbiAgICByZXR1cm4ga2V5ID8ga2V5LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnXycsICctJykgOiBrZXk7XG59XG5cbi8vIHBpY2sgdGhlIGxvY2FsZSBmcm9tIHRoZSBhcnJheVxuLy8gdHJ5IFsnZW4tYXUnLCAnZW4tZ2InXSBhcyAnZW4tYXUnLCAnZW4tZ2InLCAnZW4nLCBhcyBpbiBtb3ZlIHRocm91Z2ggdGhlIGxpc3QgdHJ5aW5nIGVhY2hcbi8vIHN1YnN0cmluZyBmcm9tIG1vc3Qgc3BlY2lmaWMgdG8gbGVhc3QsIGJ1dCBtb3ZlIHRvIHRoZSBuZXh0IGFycmF5IGl0ZW0gaWYgaXQncyBhIG1vcmUgc3BlY2lmaWMgdmFyaWFudCB0aGFuIHRoZSBjdXJyZW50IHJvb3RcbmZ1bmN0aW9uIGNob29zZUxvY2FsZShuYW1lcykge1xuICAgIHZhciBpID0gMCwgaiwgbmV4dCwgbG9jYWxlLCBzcGxpdDtcblxuICAgIHdoaWxlIChpIDwgbmFtZXMubGVuZ3RoKSB7XG4gICAgICAgIHNwbGl0ID0gbm9ybWFsaXplTG9jYWxlKG5hbWVzW2ldKS5zcGxpdCgnLScpO1xuICAgICAgICBqID0gc3BsaXQubGVuZ3RoO1xuICAgICAgICBuZXh0ID0gbm9ybWFsaXplTG9jYWxlKG5hbWVzW2kgKyAxXSk7XG4gICAgICAgIG5leHQgPSBuZXh0ID8gbmV4dC5zcGxpdCgnLScpIDogbnVsbDtcbiAgICAgICAgd2hpbGUgKGogPiAwKSB7XG4gICAgICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKHNwbGl0LnNsaWNlKDAsIGopLmpvaW4oJy0nKSk7XG4gICAgICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0ICYmIG5leHQubGVuZ3RoID49IGogJiYgY29tcGFyZUFycmF5cyhzcGxpdCwgbmV4dCwgdHJ1ZSkgPj0gaiAtIDEpIHtcbiAgICAgICAgICAgICAgICAvL3RoZSBuZXh0IGFycmF5IGl0ZW0gaXMgYmV0dGVyIHRoYW4gYSBzaGFsbG93ZXIgc3Vic3RyaW5nIG9mIHRoaXMgb25lXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqLS07XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gbG9hZExvY2FsZShuYW1lKSB7XG4gICAgdmFyIG9sZExvY2FsZSA9IG51bGw7XG4gICAgLy8gVE9ETzogRmluZCBhIGJldHRlciB3YXkgdG8gcmVnaXN0ZXIgYW5kIGxvYWQgYWxsIHRoZSBsb2NhbGVzIGluIE5vZGVcbiAgICBpZiAoIWxvY2FsZXNbbmFtZV0gJiYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSAmJlxuICAgICAgICAgICAgbW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvbGRMb2NhbGUgPSBnbG9iYWxMb2NhbGUuX2FiYnI7XG4gICAgICAgICAgICByZXF1aXJlKCcuL2xvY2FsZS8nICsgbmFtZSk7XG4gICAgICAgICAgICAvLyBiZWNhdXNlIGRlZmluZUxvY2FsZSBjdXJyZW50bHkgYWxzbyBzZXRzIHRoZSBnbG9iYWwgbG9jYWxlLCB3ZVxuICAgICAgICAgICAgLy8gd2FudCB0byB1bmRvIHRoYXQgZm9yIGxhenkgbG9hZGVkIGxvY2FsZXNcbiAgICAgICAgICAgIGdldFNldEdsb2JhbExvY2FsZShvbGRMb2NhbGUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7IH1cbiAgICB9XG4gICAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBsb2FkIGxvY2FsZSBhbmQgdGhlbiBzZXQgdGhlIGdsb2JhbCBsb2NhbGUuICBJZlxuLy8gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQgaW4sIGl0IHdpbGwgc2ltcGx5IHJldHVybiB0aGUgY3VycmVudCBnbG9iYWxcbi8vIGxvY2FsZSBrZXkuXG5mdW5jdGlvbiBnZXRTZXRHbG9iYWxMb2NhbGUgKGtleSwgdmFsdWVzKSB7XG4gICAgdmFyIGRhdGE7XG4gICAgaWYgKGtleSkge1xuICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWVzKSkge1xuICAgICAgICAgICAgZGF0YSA9IGdldExvY2FsZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IGRlZmluZUxvY2FsZShrZXksIHZhbHVlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgLy8gbW9tZW50LmR1cmF0aW9uLl9sb2NhbGUgPSBtb21lbnQuX2xvY2FsZSA9IGRhdGE7XG4gICAgICAgICAgICBnbG9iYWxMb2NhbGUgPSBkYXRhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGdsb2JhbExvY2FsZS5fYWJicjtcbn1cblxuZnVuY3Rpb24gZGVmaW5lTG9jYWxlIChuYW1lLCBjb25maWcpIHtcbiAgICBpZiAoY29uZmlnICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBwYXJlbnRDb25maWcgPSBiYXNlQ29uZmlnO1xuICAgICAgICBjb25maWcuYWJiciA9IG5hbWU7XG4gICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGRlcHJlY2F0ZVNpbXBsZSgnZGVmaW5lTG9jYWxlT3ZlcnJpZGUnLFxuICAgICAgICAgICAgICAgICAgICAndXNlIG1vbWVudC51cGRhdGVMb2NhbGUobG9jYWxlTmFtZSwgY29uZmlnKSB0byBjaGFuZ2UgJyArXG4gICAgICAgICAgICAgICAgICAgICdhbiBleGlzdGluZyBsb2NhbGUuIG1vbWVudC5kZWZpbmVMb2NhbGUobG9jYWxlTmFtZSwgJyArXG4gICAgICAgICAgICAgICAgICAgICdjb25maWcpIHNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIGNyZWF0aW5nIGEgbmV3IGxvY2FsZSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1NlZSBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL2RlZmluZS1sb2NhbGUvIGZvciBtb3JlIGluZm8uJyk7XG4gICAgICAgICAgICBwYXJlbnRDb25maWcgPSBsb2NhbGVzW25hbWVdLl9jb25maWc7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLnBhcmVudExvY2FsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobG9jYWxlc1tjb25maWcucGFyZW50TG9jYWxlXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gbG9jYWxlc1tjb25maWcucGFyZW50TG9jYWxlXS5fY29uZmlnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIWxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBjb25maWc6IGNvbmZpZ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxvY2FsZXNbbmFtZV0gPSBuZXcgTG9jYWxlKG1lcmdlQ29uZmlncyhwYXJlbnRDb25maWcsIGNvbmZpZykpO1xuXG4gICAgICAgIGlmIChsb2NhbGVGYW1pbGllc1tuYW1lXSkge1xuICAgICAgICAgICAgbG9jYWxlRmFtaWxpZXNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgIGRlZmluZUxvY2FsZSh4Lm5hbWUsIHguY29uZmlnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYmFja3dhcmRzIGNvbXBhdCBmb3Igbm93OiBhbHNvIHNldCB0aGUgbG9jYWxlXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGxvY2FsZSBBRlRFUiBhbGwgY2hpbGQgbG9jYWxlcyBoYXZlIGJlZW5cbiAgICAgICAgLy8gY3JlYXRlZCwgc28gd2Ugd29uJ3QgZW5kIHVwIHdpdGggdGhlIGNoaWxkIGxvY2FsZSBzZXQuXG4gICAgICAgIGdldFNldEdsb2JhbExvY2FsZShuYW1lKTtcblxuXG4gICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHVzZWZ1bCBmb3IgdGVzdGluZ1xuICAgICAgICBkZWxldGUgbG9jYWxlc1tuYW1lXTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMb2NhbGUobmFtZSwgY29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgICAgIHZhciBsb2NhbGUsIHBhcmVudENvbmZpZyA9IGJhc2VDb25maWc7XG4gICAgICAgIC8vIE1FUkdFXG4gICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHBhcmVudENvbmZpZyA9IGxvY2FsZXNbbmFtZV0uX2NvbmZpZztcbiAgICAgICAgfVxuICAgICAgICBjb25maWcgPSBtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjb25maWcpO1xuICAgICAgICBsb2NhbGUgPSBuZXcgTG9jYWxlKGNvbmZpZyk7XG4gICAgICAgIGxvY2FsZS5wYXJlbnRMb2NhbGUgPSBsb2NhbGVzW25hbWVdO1xuICAgICAgICBsb2NhbGVzW25hbWVdID0gbG9jYWxlO1xuXG4gICAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXQgZm9yIG5vdzogYWxzbyBzZXQgdGhlIGxvY2FsZVxuICAgICAgICBnZXRTZXRHbG9iYWxMb2NhbGUobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcGFzcyBudWxsIGZvciBjb25maWcgdG8gdW51cGRhdGUsIHVzZWZ1bCBmb3IgdGVzdHNcbiAgICAgICAgaWYgKGxvY2FsZXNbbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGxvY2FsZXNbbmFtZV0ucGFyZW50TG9jYWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxvY2FsZXNbbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBsb2NhbGVzW25hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xufVxuXG4vLyByZXR1cm5zIGxvY2FsZSBkYXRhXG5mdW5jdGlvbiBnZXRMb2NhbGUgKGtleSkge1xuICAgIHZhciBsb2NhbGU7XG5cbiAgICBpZiAoa2V5ICYmIGtleS5fbG9jYWxlICYmIGtleS5fbG9jYWxlLl9hYmJyKSB7XG4gICAgICAgIGtleSA9IGtleS5fbG9jYWxlLl9hYmJyO1xuICAgIH1cblxuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHJldHVybiBnbG9iYWxMb2NhbGU7XG4gICAgfVxuXG4gICAgaWYgKCFpc0FycmF5KGtleSkpIHtcbiAgICAgICAgLy9zaG9ydC1jaXJjdWl0IGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKGtleSk7XG4gICAgICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGU7XG4gICAgICAgIH1cbiAgICAgICAga2V5ID0gW2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGNob29zZUxvY2FsZShrZXkpO1xufVxuXG5mdW5jdGlvbiBsaXN0TG9jYWxlcygpIHtcbiAgICByZXR1cm4ga2V5cyQxKGxvY2FsZXMpO1xufVxuXG5mdW5jdGlvbiBjaGVja092ZXJmbG93IChtKSB7XG4gICAgdmFyIG92ZXJmbG93O1xuICAgIHZhciBhID0gbS5fYTtcblxuICAgIGlmIChhICYmIGdldFBhcnNpbmdGbGFncyhtKS5vdmVyZmxvdyA9PT0gLTIpIHtcbiAgICAgICAgb3ZlcmZsb3cgPVxuICAgICAgICAgICAgYVtNT05USF0gICAgICAgPCAwIHx8IGFbTU9OVEhdICAgICAgID4gMTEgID8gTU9OVEggOlxuICAgICAgICAgICAgYVtEQVRFXSAgICAgICAgPCAxIHx8IGFbREFURV0gICAgICAgID4gZGF5c0luTW9udGgoYVtZRUFSXSwgYVtNT05USF0pID8gREFURSA6XG4gICAgICAgICAgICBhW0hPVVJdICAgICAgICA8IDAgfHwgYVtIT1VSXSAgICAgICAgPiAyNCB8fCAoYVtIT1VSXSA9PT0gMjQgJiYgKGFbTUlOVVRFXSAhPT0gMCB8fCBhW1NFQ09ORF0gIT09IDAgfHwgYVtNSUxMSVNFQ09ORF0gIT09IDApKSA/IEhPVVIgOlxuICAgICAgICAgICAgYVtNSU5VVEVdICAgICAgPCAwIHx8IGFbTUlOVVRFXSAgICAgID4gNTkgID8gTUlOVVRFIDpcbiAgICAgICAgICAgIGFbU0VDT05EXSAgICAgIDwgMCB8fCBhW1NFQ09ORF0gICAgICA+IDU5ICA/IFNFQ09ORCA6XG4gICAgICAgICAgICBhW01JTExJU0VDT05EXSA8IDAgfHwgYVtNSUxMSVNFQ09ORF0gPiA5OTkgPyBNSUxMSVNFQ09ORCA6XG4gICAgICAgICAgICAtMTtcblxuICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd0RheU9mWWVhciAmJiAob3ZlcmZsb3cgPCBZRUFSIHx8IG92ZXJmbG93ID4gREFURSkpIHtcbiAgICAgICAgICAgIG92ZXJmbG93ID0gREFURTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd1dlZWtzICYmIG92ZXJmbG93ID09PSAtMSkge1xuICAgICAgICAgICAgb3ZlcmZsb3cgPSBXRUVLO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93V2Vla2RheSAmJiBvdmVyZmxvdyA9PT0gLTEpIHtcbiAgICAgICAgICAgIG92ZXJmbG93ID0gV0VFS0RBWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhtKS5vdmVyZmxvdyA9IG92ZXJmbG93O1xuICAgIH1cblxuICAgIHJldHVybiBtO1xufVxuXG4vLyBpc28gODYwMSByZWdleFxuLy8gMDAwMC0wMC0wMCAwMDAwLVcwMCBvciAwMDAwLVcwMC0wICsgVCArIDAwIG9yIDAwOjAwIG9yIDAwOjAwOjAwIG9yIDAwOjAwOjAwLjAwMCArICswMDowMCBvciArMDAwMCBvciArMDApXG52YXIgZXh0ZW5kZWRJc29SZWdleCA9IC9eXFxzKigoPzpbKy1dXFxkezZ9fFxcZHs0fSktKD86XFxkXFxkLVxcZFxcZHxXXFxkXFxkLVxcZHxXXFxkXFxkfFxcZFxcZFxcZHxcXGRcXGQpKSg/OihUfCApKFxcZFxcZCg/OjpcXGRcXGQoPzo6XFxkXFxkKD86Wy4sXVxcZCspPyk/KT8pKFtcXCtcXC1dXFxkXFxkKD86Oj9cXGRcXGQpP3xcXHMqWik/KT8kLztcbnZhciBiYXNpY0lzb1JlZ2V4ID0gL15cXHMqKCg/OlsrLV1cXGR7Nn18XFxkezR9KSg/OlxcZFxcZFxcZFxcZHxXXFxkXFxkXFxkfFdcXGRcXGR8XFxkXFxkXFxkfFxcZFxcZCkpKD86KFR8ICkoXFxkXFxkKD86XFxkXFxkKD86XFxkXFxkKD86Wy4sXVxcZCspPyk/KT8pKFtcXCtcXC1dXFxkXFxkKD86Oj9cXGRcXGQpP3xcXHMqWik/KT8kLztcblxudmFyIHR6UmVnZXggPSAvWnxbKy1dXFxkXFxkKD86Oj9cXGRcXGQpPy87XG5cbnZhciBpc29EYXRlcyA9IFtcbiAgICBbJ1lZWVlZWS1NTS1ERCcsIC9bKy1dXFxkezZ9LVxcZFxcZC1cXGRcXGQvXSxcbiAgICBbJ1lZWVktTU0tREQnLCAvXFxkezR9LVxcZFxcZC1cXGRcXGQvXSxcbiAgICBbJ0dHR0ctW1ddV1ctRScsIC9cXGR7NH0tV1xcZFxcZC1cXGQvXSxcbiAgICBbJ0dHR0ctW1ddV1cnLCAvXFxkezR9LVdcXGRcXGQvLCBmYWxzZV0sXG4gICAgWydZWVlZLURERCcsIC9cXGR7NH0tXFxkezN9L10sXG4gICAgWydZWVlZLU1NJywgL1xcZHs0fS1cXGRcXGQvLCBmYWxzZV0sXG4gICAgWydZWVlZWVlNTUREJywgL1srLV1cXGR7MTB9L10sXG4gICAgWydZWVlZTU1ERCcsIC9cXGR7OH0vXSxcbiAgICAvLyBZWVlZTU0gaXMgTk9UIGFsbG93ZWQgYnkgdGhlIHN0YW5kYXJkXG4gICAgWydHR0dHW1ddV1dFJywgL1xcZHs0fVdcXGR7M30vXSxcbiAgICBbJ0dHR0dbV11XVycsIC9cXGR7NH1XXFxkezJ9LywgZmFsc2VdLFxuICAgIFsnWVlZWURERCcsIC9cXGR7N30vXVxuXTtcblxuLy8gaXNvIHRpbWUgZm9ybWF0cyBhbmQgcmVnZXhlc1xudmFyIGlzb1RpbWVzID0gW1xuICAgIFsnSEg6bW06c3MuU1NTUycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZFxcLlxcZCsvXSxcbiAgICBbJ0hIOm1tOnNzLFNTU1MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGQsXFxkKy9dLFxuICAgIFsnSEg6bW06c3MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGQvXSxcbiAgICBbJ0hIOm1tJywgL1xcZFxcZDpcXGRcXGQvXSxcbiAgICBbJ0hIbW1zcy5TU1NTJywgL1xcZFxcZFxcZFxcZFxcZFxcZFxcLlxcZCsvXSxcbiAgICBbJ0hIbW1zcyxTU1NTJywgL1xcZFxcZFxcZFxcZFxcZFxcZCxcXGQrL10sXG4gICAgWydISG1tc3MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkL10sXG4gICAgWydISG1tJywgL1xcZFxcZFxcZFxcZC9dLFxuICAgIFsnSEgnLCAvXFxkXFxkL11cbl07XG5cbnZhciBhc3BOZXRKc29uUmVnZXggPSAvXlxcLz9EYXRlXFwoKFxcLT9cXGQrKS9pO1xuXG4vLyBkYXRlIGZyb20gaXNvIGZvcm1hdFxuZnVuY3Rpb24gY29uZmlnRnJvbUlTTyhjb25maWcpIHtcbiAgICB2YXIgaSwgbCxcbiAgICAgICAgc3RyaW5nID0gY29uZmlnLl9pLFxuICAgICAgICBtYXRjaCA9IGV4dGVuZGVkSXNvUmVnZXguZXhlYyhzdHJpbmcpIHx8IGJhc2ljSXNvUmVnZXguZXhlYyhzdHJpbmcpLFxuICAgICAgICBhbGxvd1RpbWUsIGRhdGVGb3JtYXQsIHRpbWVGb3JtYXQsIHR6Rm9ybWF0O1xuXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmlzbyA9IHRydWU7XG5cbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGlzb0RhdGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKGlzb0RhdGVzW2ldWzFdLmV4ZWMobWF0Y2hbMV0pKSB7XG4gICAgICAgICAgICAgICAgZGF0ZUZvcm1hdCA9IGlzb0RhdGVzW2ldWzBdO1xuICAgICAgICAgICAgICAgIGFsbG93VGltZSA9IGlzb0RhdGVzW2ldWzJdICE9PSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0ZUZvcm1hdCA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF0Y2hbM10pIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSBpc29UaW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNvVGltZXNbaV1bMV0uZXhlYyhtYXRjaFszXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2hbMl0gc2hvdWxkIGJlICdUJyBvciBzcGFjZVxuICAgICAgICAgICAgICAgICAgICB0aW1lRm9ybWF0ID0gKG1hdGNoWzJdIHx8ICcgJykgKyBpc29UaW1lc1tpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRpbWVGb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFsbG93VGltZSAmJiB0aW1lRm9ybWF0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaFs0XSkge1xuICAgICAgICAgICAgaWYgKHR6UmVnZXguZXhlYyhtYXRjaFs0XSkpIHtcbiAgICAgICAgICAgICAgICB0ekZvcm1hdCA9ICdaJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbmZpZy5fZiA9IGRhdGVGb3JtYXQgKyAodGltZUZvcm1hdCB8fCAnJykgKyAodHpGb3JtYXQgfHwgJycpO1xuICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxufVxuXG4vLyBSRkMgMjgyMiByZWdleDogRm9yIGRldGFpbHMgc2VlIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMyODIyI3NlY3Rpb24tMy4zXG52YXIgYmFzaWNSZmNSZWdleCA9IC9eKCg/Ok1vbnxUdWV8V2VkfFRodXxGcml8U2F0fFN1biksP1xccyk/KFxcZD9cXGRcXHMoPzpKYW58RmVifE1hcnxBcHJ8TWF5fEp1bnxKdWx8QXVnfFNlcHxPY3R8Tm92fERlYylcXHMoPzpcXGRcXGQpP1xcZFxcZFxccykoXFxkXFxkOlxcZFxcZCkoXFw6XFxkXFxkKT8oXFxzKD86VVR8R01UfFtFQ01QXVtTRF1UfFtBLUlLLVphLWlrLXpdfFsrLV1cXGR7NH0pKSQvO1xuXG4vLyBkYXRlIGFuZCB0aW1lIGZyb20gcmVmIDI4MjIgZm9ybWF0XG5mdW5jdGlvbiBjb25maWdGcm9tUkZDMjgyMihjb25maWcpIHtcbiAgICB2YXIgc3RyaW5nLCBtYXRjaCwgZGF5Rm9ybWF0LFxuICAgICAgICBkYXRlRm9ybWF0LCB0aW1lRm9ybWF0LCB0ekZvcm1hdDtcbiAgICB2YXIgdGltZXpvbmVzID0ge1xuICAgICAgICAnIEdNVCc6ICcgKzAwMDAnLFxuICAgICAgICAnIEVEVCc6ICcgLTA0MDAnLFxuICAgICAgICAnIEVTVCc6ICcgLTA1MDAnLFxuICAgICAgICAnIENEVCc6ICcgLTA1MDAnLFxuICAgICAgICAnIENTVCc6ICcgLTA2MDAnLFxuICAgICAgICAnIE1EVCc6ICcgLTA2MDAnLFxuICAgICAgICAnIE1TVCc6ICcgLTA3MDAnLFxuICAgICAgICAnIFBEVCc6ICcgLTA3MDAnLFxuICAgICAgICAnIFBTVCc6ICcgLTA4MDAnXG4gICAgfTtcbiAgICB2YXIgbWlsaXRhcnkgPSAnWVhXVlVUU1JRUE9OWkFCQ0RFRkdISUtMTSc7XG4gICAgdmFyIHRpbWV6b25lLCB0aW1lem9uZUluZGV4O1xuXG4gICAgc3RyaW5nID0gY29uZmlnLl9pXG4gICAgICAgIC5yZXBsYWNlKC9cXChbXlxcKV0qXFwpfFtcXG5cXHRdL2csICcgJykgLy8gUmVtb3ZlIGNvbW1lbnRzIGFuZCBmb2xkaW5nIHdoaXRlc3BhY2VcbiAgICAgICAgLnJlcGxhY2UoLyhcXHNcXHMrKS9nLCAnICcpIC8vIFJlcGxhY2UgbXVsdGlwbGUtc3BhY2VzIHdpdGggYSBzaW5nbGUgc3BhY2VcbiAgICAgICAgLnJlcGxhY2UoL15cXHN8XFxzJC9nLCAnJyk7IC8vIFJlbW92ZSBsZWFkaW5nIGFuZCB0cmFpbGluZyBzcGFjZXNcbiAgICBtYXRjaCA9IGJhc2ljUmZjUmVnZXguZXhlYyhzdHJpbmcpO1xuXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGRheUZvcm1hdCA9IG1hdGNoWzFdID8gJ2RkZCcgKyAoKG1hdGNoWzFdLmxlbmd0aCA9PT0gNSkgPyAnLCAnIDogJyAnKSA6ICcnO1xuICAgICAgICBkYXRlRm9ybWF0ID0gJ0QgTU1NICcgKyAoKG1hdGNoWzJdLmxlbmd0aCA+IDEwKSA/ICdZWVlZICcgOiAnWVkgJyk7XG4gICAgICAgIHRpbWVGb3JtYXQgPSAnSEg6bW0nICsgKG1hdGNoWzRdID8gJzpzcycgOiAnJyk7XG5cbiAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB0aGUgdmFuaWxsYSBKUyBEYXRlIG9iamVjdCB3aXRoIGFuIGluZGVwZW50ZW50IGRheS1vZi13ZWVrIGNoZWNrLlxuICAgICAgICBpZiAobWF0Y2hbMV0pIHsgLy8gZGF5IG9mIHdlZWsgZ2l2ZW5cbiAgICAgICAgICAgIHZhciBtb21lbnREYXRlID0gbmV3IERhdGUobWF0Y2hbMl0pO1xuICAgICAgICAgICAgdmFyIG1vbWVudERheSA9IFsnU3VuJywnTW9uJywnVHVlJywnV2VkJywnVGh1JywnRnJpJywnU2F0J11bbW9tZW50RGF0ZS5nZXREYXkoKV07XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXS5zdWJzdHIoMCwzKSAhPT0gbW9tZW50RGF5KSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykud2Vla2RheU1pc21hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKG1hdGNoWzVdLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAyOiAvLyBtaWxpdGFyeVxuICAgICAgICAgICAgICAgIGlmICh0aW1lem9uZUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWV6b25lID0gJyArMDAwMCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZXpvbmVJbmRleCA9IG1pbGl0YXJ5LmluZGV4T2YobWF0Y2hbNV1bMV0udG9VcHBlckNhc2UoKSkgLSAxMjtcbiAgICAgICAgICAgICAgICAgICAgdGltZXpvbmUgPSAoKHRpbWV6b25lSW5kZXggPCAwKSA/ICcgLScgOiAnICsnKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAoKCcnICsgdGltZXpvbmVJbmRleCkucmVwbGFjZSgvXi0/LywgJzAnKSkubWF0Y2goLy4uJC8pWzBdICsgJzAwJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6IC8vIFpvbmVcbiAgICAgICAgICAgICAgICB0aW1lem9uZSA9IHRpbWV6b25lc1ttYXRjaFs1XV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBVVCBvciArLy05OTk5XG4gICAgICAgICAgICAgICAgdGltZXpvbmUgPSB0aW1lem9uZXNbJyBHTVQnXTtcbiAgICAgICAgfVxuICAgICAgICBtYXRjaFs1XSA9IHRpbWV6b25lO1xuICAgICAgICBjb25maWcuX2kgPSBtYXRjaC5zcGxpY2UoMSkuam9pbignJyk7XG4gICAgICAgIHR6Rm9ybWF0ID0gJyBaWic7XG4gICAgICAgIGNvbmZpZy5fZiA9IGRheUZvcm1hdCArIGRhdGVGb3JtYXQgKyB0aW1lRm9ybWF0ICsgdHpGb3JtYXQ7XG4gICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykucmZjMjgyMiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxufVxuXG4vLyBkYXRlIGZyb20gaXNvIGZvcm1hdCBvciBmYWxsYmFja1xuZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZyhjb25maWcpIHtcbiAgICB2YXIgbWF0Y2hlZCA9IGFzcE5ldEpzb25SZWdleC5leGVjKGNvbmZpZy5faSk7XG5cbiAgICBpZiAobWF0Y2hlZCAhPT0gbnVsbCkge1xuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSgrbWF0Y2hlZFsxXSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25maWdGcm9tSVNPKGNvbmZpZyk7XG4gICAgaWYgKGNvbmZpZy5faXNWYWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5faXNWYWxpZDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uZmlnRnJvbVJGQzI4MjIoY29uZmlnKTtcbiAgICBpZiAoY29uZmlnLl9pc1ZhbGlkID09PSBmYWxzZSkge1xuICAgICAgICBkZWxldGUgY29uZmlnLl9pc1ZhbGlkO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBGaW5hbCBhdHRlbXB0LCB1c2UgSW5wdXQgRmFsbGJhY2tcbiAgICBob29rcy5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayhjb25maWcpO1xufVxuXG5ob29rcy5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayA9IGRlcHJlY2F0ZShcbiAgICAndmFsdWUgcHJvdmlkZWQgaXMgbm90IGluIGEgcmVjb2duaXplZCBSRkMyODIyIG9yIElTTyBmb3JtYXQuIG1vbWVudCBjb25zdHJ1Y3Rpb24gZmFsbHMgYmFjayB0byBqcyBEYXRlKCksICcgK1xuICAgICd3aGljaCBpcyBub3QgcmVsaWFibGUgYWNyb3NzIGFsbCBicm93c2VycyBhbmQgdmVyc2lvbnMuIE5vbiBSRkMyODIyL0lTTyBkYXRlIGZvcm1hdHMgYXJlICcgK1xuICAgICdkaXNjb3VyYWdlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGFuIHVwY29taW5nIG1ham9yIHJlbGVhc2UuIFBsZWFzZSByZWZlciB0byAnICtcbiAgICAnaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9qcy1kYXRlLyBmb3IgbW9yZSBpbmZvLicsXG4gICAgZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShjb25maWcuX2kgKyAoY29uZmlnLl91c2VVVEMgPyAnIFVUQycgOiAnJykpO1xuICAgIH1cbik7XG5cbi8vIFBpY2sgdGhlIGZpcnN0IGRlZmluZWQgb2YgdHdvIG9yIHRocmVlIGFyZ3VtZW50cy5cbmZ1bmN0aW9uIGRlZmF1bHRzKGEsIGIsIGMpIHtcbiAgICBpZiAoYSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBpZiAoYiAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBiO1xuICAgIH1cbiAgICByZXR1cm4gYztcbn1cblxuZnVuY3Rpb24gY3VycmVudERhdGVBcnJheShjb25maWcpIHtcbiAgICAvLyBob29rcyBpcyBhY3R1YWxseSB0aGUgZXhwb3J0ZWQgbW9tZW50IG9iamVjdFxuICAgIHZhciBub3dWYWx1ZSA9IG5ldyBEYXRlKGhvb2tzLm5vdygpKTtcbiAgICBpZiAoY29uZmlnLl91c2VVVEMpIHtcbiAgICAgICAgcmV0dXJuIFtub3dWYWx1ZS5nZXRVVENGdWxsWWVhcigpLCBub3dWYWx1ZS5nZXRVVENNb250aCgpLCBub3dWYWx1ZS5nZXRVVENEYXRlKCldO1xuICAgIH1cbiAgICByZXR1cm4gW25vd1ZhbHVlLmdldEZ1bGxZZWFyKCksIG5vd1ZhbHVlLmdldE1vbnRoKCksIG5vd1ZhbHVlLmdldERhdGUoKV07XG59XG5cbi8vIGNvbnZlcnQgYW4gYXJyYXkgdG8gYSBkYXRlLlxuLy8gdGhlIGFycmF5IHNob3VsZCBtaXJyb3IgdGhlIHBhcmFtZXRlcnMgYmVsb3dcbi8vIG5vdGU6IGFsbCB2YWx1ZXMgcGFzdCB0aGUgeWVhciBhcmUgb3B0aW9uYWwgYW5kIHdpbGwgZGVmYXVsdCB0byB0aGUgbG93ZXN0IHBvc3NpYmxlIHZhbHVlLlxuLy8gW3llYXIsIG1vbnRoLCBkYXkgLCBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmRdXG5mdW5jdGlvbiBjb25maWdGcm9tQXJyYXkgKGNvbmZpZykge1xuICAgIHZhciBpLCBkYXRlLCBpbnB1dCA9IFtdLCBjdXJyZW50RGF0ZSwgeWVhclRvVXNlO1xuXG4gICAgaWYgKGNvbmZpZy5fZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY3VycmVudERhdGUgPSBjdXJyZW50RGF0ZUFycmF5KGNvbmZpZyk7XG5cbiAgICAvL2NvbXB1dGUgZGF5IG9mIHRoZSB5ZWFyIGZyb20gd2Vla3MgYW5kIHdlZWtkYXlzXG4gICAgaWYgKGNvbmZpZy5fdyAmJiBjb25maWcuX2FbREFURV0gPT0gbnVsbCAmJiBjb25maWcuX2FbTU9OVEhdID09IG51bGwpIHtcbiAgICAgICAgZGF5T2ZZZWFyRnJvbVdlZWtJbmZvKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLy9pZiB0aGUgZGF5IG9mIHRoZSB5ZWFyIGlzIHNldCwgZmlndXJlIG91dCB3aGF0IGl0IGlzXG4gICAgaWYgKGNvbmZpZy5fZGF5T2ZZZWFyICE9IG51bGwpIHtcbiAgICAgICAgeWVhclRvVXNlID0gZGVmYXVsdHMoY29uZmlnLl9hW1lFQVJdLCBjdXJyZW50RGF0ZVtZRUFSXSk7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5fZGF5T2ZZZWFyID4gZGF5c0luWWVhcih5ZWFyVG9Vc2UpIHx8IGNvbmZpZy5fZGF5T2ZZZWFyID09PSAwKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dEYXlPZlllYXIgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0ZSA9IGNyZWF0ZVVUQ0RhdGUoeWVhclRvVXNlLCAwLCBjb25maWcuX2RheU9mWWVhcik7XG4gICAgICAgIGNvbmZpZy5fYVtNT05USF0gPSBkYXRlLmdldFVUQ01vbnRoKCk7XG4gICAgICAgIGNvbmZpZy5fYVtEQVRFXSA9IGRhdGUuZ2V0VVRDRGF0ZSgpO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQgdG8gY3VycmVudCBkYXRlLlxuICAgIC8vICogaWYgbm8geWVhciwgbW9udGgsIGRheSBvZiBtb250aCBhcmUgZ2l2ZW4sIGRlZmF1bHQgdG8gdG9kYXlcbiAgICAvLyAqIGlmIGRheSBvZiBtb250aCBpcyBnaXZlbiwgZGVmYXVsdCBtb250aCBhbmQgeWVhclxuICAgIC8vICogaWYgbW9udGggaXMgZ2l2ZW4sIGRlZmF1bHQgb25seSB5ZWFyXG4gICAgLy8gKiBpZiB5ZWFyIGlzIGdpdmVuLCBkb24ndCBkZWZhdWx0IGFueXRoaW5nXG4gICAgZm9yIChpID0gMDsgaSA8IDMgJiYgY29uZmlnLl9hW2ldID09IG51bGw7ICsraSkge1xuICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IGN1cnJlbnREYXRlW2ldO1xuICAgIH1cblxuICAgIC8vIFplcm8gb3V0IHdoYXRldmVyIHdhcyBub3QgZGVmYXVsdGVkLCBpbmNsdWRpbmcgdGltZVxuICAgIGZvciAoOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgIGNvbmZpZy5fYVtpXSA9IGlucHV0W2ldID0gKGNvbmZpZy5fYVtpXSA9PSBudWxsKSA/IChpID09PSAyID8gMSA6IDApIDogY29uZmlnLl9hW2ldO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciAyNDowMDowMC4wMDBcbiAgICBpZiAoY29uZmlnLl9hW0hPVVJdID09PSAyNCAmJlxuICAgICAgICAgICAgY29uZmlnLl9hW01JTlVURV0gPT09IDAgJiZcbiAgICAgICAgICAgIGNvbmZpZy5fYVtTRUNPTkRdID09PSAwICYmXG4gICAgICAgICAgICBjb25maWcuX2FbTUlMTElTRUNPTkRdID09PSAwKSB7XG4gICAgICAgIGNvbmZpZy5fbmV4dERheSA9IHRydWU7XG4gICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IDA7XG4gICAgfVxuXG4gICAgY29uZmlnLl9kID0gKGNvbmZpZy5fdXNlVVRDID8gY3JlYXRlVVRDRGF0ZSA6IGNyZWF0ZURhdGUpLmFwcGx5KG51bGwsIGlucHV0KTtcbiAgICAvLyBBcHBseSB0aW1lem9uZSBvZmZzZXQgZnJvbSBpbnB1dC4gVGhlIGFjdHVhbCB1dGNPZmZzZXQgY2FuIGJlIGNoYW5nZWRcbiAgICAvLyB3aXRoIHBhcnNlWm9uZS5cbiAgICBpZiAoY29uZmlnLl90em0gIT0gbnVsbCkge1xuICAgICAgICBjb25maWcuX2Quc2V0VVRDTWludXRlcyhjb25maWcuX2QuZ2V0VVRDTWludXRlcygpIC0gY29uZmlnLl90em0pO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuX25leHREYXkpIHtcbiAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gMjQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKSB7XG4gICAgdmFyIHcsIHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSwgdGVtcCwgd2Vla2RheU92ZXJmbG93O1xuXG4gICAgdyA9IGNvbmZpZy5fdztcbiAgICBpZiAody5HRyAhPSBudWxsIHx8IHcuVyAhPSBudWxsIHx8IHcuRSAhPSBudWxsKSB7XG4gICAgICAgIGRvdyA9IDE7XG4gICAgICAgIGRveSA9IDQ7XG5cbiAgICAgICAgLy8gVE9ETzogV2UgbmVlZCB0byB0YWtlIHRoZSBjdXJyZW50IGlzb1dlZWtZZWFyLCBidXQgdGhhdCBkZXBlbmRzIG9uXG4gICAgICAgIC8vIGhvdyB3ZSBpbnRlcnByZXQgbm93IChsb2NhbCwgdXRjLCBmaXhlZCBvZmZzZXQpLiBTbyBjcmVhdGVcbiAgICAgICAgLy8gYSBub3cgdmVyc2lvbiBvZiBjdXJyZW50IGNvbmZpZyAodGFrZSBsb2NhbC91dGMvb2Zmc2V0IGZsYWdzLCBhbmRcbiAgICAgICAgLy8gY3JlYXRlIG5vdykuXG4gICAgICAgIHdlZWtZZWFyID0gZGVmYXVsdHMody5HRywgY29uZmlnLl9hW1lFQVJdLCB3ZWVrT2ZZZWFyKGNyZWF0ZUxvY2FsKCksIDEsIDQpLnllYXIpO1xuICAgICAgICB3ZWVrID0gZGVmYXVsdHMody5XLCAxKTtcbiAgICAgICAgd2Vla2RheSA9IGRlZmF1bHRzKHcuRSwgMSk7XG4gICAgICAgIGlmICh3ZWVrZGF5IDwgMSB8fCB3ZWVrZGF5ID4gNykge1xuICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvdyA9IGNvbmZpZy5fbG9jYWxlLl93ZWVrLmRvdztcbiAgICAgICAgZG95ID0gY29uZmlnLl9sb2NhbGUuX3dlZWsuZG95O1xuXG4gICAgICAgIHZhciBjdXJXZWVrID0gd2Vla09mWWVhcihjcmVhdGVMb2NhbCgpLCBkb3csIGRveSk7XG5cbiAgICAgICAgd2Vla1llYXIgPSBkZWZhdWx0cyh3LmdnLCBjb25maWcuX2FbWUVBUl0sIGN1cldlZWsueWVhcik7XG5cbiAgICAgICAgLy8gRGVmYXVsdCB0byBjdXJyZW50IHdlZWsuXG4gICAgICAgIHdlZWsgPSBkZWZhdWx0cyh3LncsIGN1cldlZWsud2Vlayk7XG5cbiAgICAgICAgaWYgKHcuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyB3ZWVrZGF5IC0tIGxvdyBkYXkgbnVtYmVycyBhcmUgY29uc2lkZXJlZCBuZXh0IHdlZWtcbiAgICAgICAgICAgIHdlZWtkYXkgPSB3LmQ7XG4gICAgICAgICAgICBpZiAod2Vla2RheSA8IDAgfHwgd2Vla2RheSA+IDYpIHtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHcuZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyBsb2NhbCB3ZWVrZGF5IC0tIGNvdW50aW5nIHN0YXJ0cyBmcm9tIGJlZ2luaW5nIG9mIHdlZWtcbiAgICAgICAgICAgIHdlZWtkYXkgPSB3LmUgKyBkb3c7XG4gICAgICAgICAgICBpZiAody5lIDwgMCB8fCB3LmUgPiA2KSB7XG4gICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRlZmF1bHQgdG8gYmVnaW5pbmcgb2Ygd2Vla1xuICAgICAgICAgICAgd2Vla2RheSA9IGRvdztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAod2VlayA8IDEgfHwgd2VlayA+IHdlZWtzSW5ZZWFyKHdlZWtZZWFyLCBkb3csIGRveSkpIHtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93V2Vla3MgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAod2Vla2RheU92ZXJmbG93ICE9IG51bGwpIHtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93V2Vla2RheSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcCA9IGRheU9mWWVhckZyb21XZWVrcyh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpO1xuICAgICAgICBjb25maWcuX2FbWUVBUl0gPSB0ZW1wLnllYXI7XG4gICAgICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdGVtcC5kYXlPZlllYXI7XG4gICAgfVxufVxuXG4vLyBjb25zdGFudCB0aGF0IHJlZmVycyB0byB0aGUgSVNPIHN0YW5kYXJkXG5ob29rcy5JU09fODYwMSA9IGZ1bmN0aW9uICgpIHt9O1xuXG4vLyBjb25zdGFudCB0aGF0IHJlZmVycyB0byB0aGUgUkZDIDI4MjIgZm9ybVxuaG9va3MuUkZDXzI4MjIgPSBmdW5jdGlvbiAoKSB7fTtcblxuLy8gZGF0ZSBmcm9tIHN0cmluZyBhbmQgZm9ybWF0IHN0cmluZ1xuZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpIHtcbiAgICAvLyBUT0RPOiBNb3ZlIHRoaXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBjcmVhdGlvbiBmbG93IHRvIHByZXZlbnQgY2lyY3VsYXIgZGVwc1xuICAgIGlmIChjb25maWcuX2YgPT09IGhvb2tzLklTT184NjAxKSB7XG4gICAgICAgIGNvbmZpZ0Zyb21JU08oY29uZmlnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLl9mID09PSBob29rcy5SRkNfMjgyMikge1xuICAgICAgICBjb25maWdGcm9tUkZDMjgyMihjb25maWcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbmZpZy5fYSA9IFtdO1xuICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmVtcHR5ID0gdHJ1ZTtcblxuICAgIC8vIFRoaXMgYXJyYXkgaXMgdXNlZCB0byBtYWtlIGEgRGF0ZSwgZWl0aGVyIHdpdGggYG5ldyBEYXRlYCBvciBgRGF0ZS5VVENgXG4gICAgdmFyIHN0cmluZyA9ICcnICsgY29uZmlnLl9pLFxuICAgICAgICBpLCBwYXJzZWRJbnB1dCwgdG9rZW5zLCB0b2tlbiwgc2tpcHBlZCxcbiAgICAgICAgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCA9IDA7XG5cbiAgICB0b2tlbnMgPSBleHBhbmRGb3JtYXQoY29uZmlnLl9mLCBjb25maWcuX2xvY2FsZSkubWF0Y2goZm9ybWF0dGluZ1Rva2VucykgfHwgW107XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBwYXJzZWRJbnB1dCA9IChzdHJpbmcubWF0Y2goZ2V0UGFyc2VSZWdleEZvclRva2VuKHRva2VuLCBjb25maWcpKSB8fCBbXSlbMF07XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0b2tlbicsIHRva2VuLCAncGFyc2VkSW5wdXQnLCBwYXJzZWRJbnB1dCxcbiAgICAgICAgLy8gICAgICAgICAncmVnZXgnLCBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4odG9rZW4sIGNvbmZpZykpO1xuICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgIHNraXBwZWQgPSBzdHJpbmcuc3Vic3RyKDAsIHN0cmluZy5pbmRleE9mKHBhcnNlZElucHV0KSk7XG4gICAgICAgICAgICBpZiAoc2tpcHBlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkSW5wdXQucHVzaChza2lwcGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5zbGljZShzdHJpbmcuaW5kZXhPZihwYXJzZWRJbnB1dCkgKyBwYXJzZWRJbnB1dC5sZW5ndGgpO1xuICAgICAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCArPSBwYXJzZWRJbnB1dC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZG9uJ3QgcGFyc2UgaWYgaXQncyBub3QgYSBrbm93biB0b2tlblxuICAgICAgICBpZiAoZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dKSB7XG4gICAgICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkVGltZVRvQXJyYXlGcm9tVG9rZW4odG9rZW4sIHBhcnNlZElucHV0LCBjb25maWcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZy5fc3RyaWN0ICYmICFwYXJzZWRJbnB1dCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIHJlbWFpbmluZyB1bnBhcnNlZCBpbnB1dCBsZW5ndGggdG8gdGhlIHN0cmluZ1xuICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmNoYXJzTGVmdE92ZXIgPSBzdHJpbmdMZW5ndGggLSB0b3RhbFBhcnNlZElucHV0TGVuZ3RoO1xuICAgIGlmIChzdHJpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRJbnB1dC5wdXNoKHN0cmluZyk7XG4gICAgfVxuXG4gICAgLy8gY2xlYXIgXzEyaCBmbGFnIGlmIGhvdXIgaXMgPD0gMTJcbiAgICBpZiAoY29uZmlnLl9hW0hPVVJdIDw9IDEyICYmXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPT09IHRydWUgJiZcbiAgICAgICAgY29uZmlnLl9hW0hPVVJdID4gMCkge1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnBhcnNlZERhdGVQYXJ0cyA9IGNvbmZpZy5fYS5zbGljZSgwKTtcbiAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5tZXJpZGllbSA9IGNvbmZpZy5fbWVyaWRpZW07XG4gICAgLy8gaGFuZGxlIG1lcmlkaWVtXG4gICAgY29uZmlnLl9hW0hPVVJdID0gbWVyaWRpZW1GaXhXcmFwKGNvbmZpZy5fbG9jYWxlLCBjb25maWcuX2FbSE9VUl0sIGNvbmZpZy5fbWVyaWRpZW0pO1xuXG4gICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgY2hlY2tPdmVyZmxvdyhjb25maWcpO1xufVxuXG5cbmZ1bmN0aW9uIG1lcmlkaWVtRml4V3JhcCAobG9jYWxlLCBob3VyLCBtZXJpZGllbSkge1xuICAgIHZhciBpc1BtO1xuXG4gICAgaWYgKG1lcmlkaWVtID09IG51bGwpIHtcbiAgICAgICAgLy8gbm90aGluZyB0byBkb1xuICAgICAgICByZXR1cm4gaG91cjtcbiAgICB9XG4gICAgaWYgKGxvY2FsZS5tZXJpZGllbUhvdXIgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLm1lcmlkaWVtSG91cihob3VyLCBtZXJpZGllbSk7XG4gICAgfSBlbHNlIGlmIChsb2NhbGUuaXNQTSAhPSBudWxsKSB7XG4gICAgICAgIC8vIEZhbGxiYWNrXG4gICAgICAgIGlzUG0gPSBsb2NhbGUuaXNQTShtZXJpZGllbSk7XG4gICAgICAgIGlmIChpc1BtICYmIGhvdXIgPCAxMikge1xuICAgICAgICAgICAgaG91ciArPSAxMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzUG0gJiYgaG91ciA9PT0gMTIpIHtcbiAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBob3VyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRoaXMgaXMgbm90IHN1cHBvc2VkIHRvIGhhcHBlblxuICAgICAgICByZXR1cm4gaG91cjtcbiAgICB9XG59XG5cbi8vIGRhdGUgZnJvbSBzdHJpbmcgYW5kIGFycmF5IG9mIGZvcm1hdCBzdHJpbmdzXG5mdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nQW5kQXJyYXkoY29uZmlnKSB7XG4gICAgdmFyIHRlbXBDb25maWcsXG4gICAgICAgIGJlc3RNb21lbnQsXG5cbiAgICAgICAgc2NvcmVUb0JlYXQsXG4gICAgICAgIGksXG4gICAgICAgIGN1cnJlbnRTY29yZTtcblxuICAgIGlmIChjb25maWcuX2YubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRGb3JtYXQgPSB0cnVlO1xuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShOYU4pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IGNvbmZpZy5fZi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjdXJyZW50U2NvcmUgPSAwO1xuICAgICAgICB0ZW1wQ29uZmlnID0gY29weUNvbmZpZyh7fSwgY29uZmlnKTtcbiAgICAgICAgaWYgKGNvbmZpZy5fdXNlVVRDICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRlbXBDb25maWcuX3VzZVVUQyA9IGNvbmZpZy5fdXNlVVRDO1xuICAgICAgICB9XG4gICAgICAgIHRlbXBDb25maWcuX2YgPSBjb25maWcuX2ZbaV07XG4gICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQodGVtcENvbmZpZyk7XG5cbiAgICAgICAgaWYgKCFpc1ZhbGlkKHRlbXBDb25maWcpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGFueSBpbnB1dCB0aGF0IHdhcyBub3QgcGFyc2VkIGFkZCBhIHBlbmFsdHkgZm9yIHRoYXQgZm9ybWF0XG4gICAgICAgIGN1cnJlbnRTY29yZSArPSBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuY2hhcnNMZWZ0T3ZlcjtcblxuICAgICAgICAvL29yIHRva2Vuc1xuICAgICAgICBjdXJyZW50U2NvcmUgKz0gZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLnVudXNlZFRva2Vucy5sZW5ndGggKiAxMDtcblxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuc2NvcmUgPSBjdXJyZW50U2NvcmU7XG5cbiAgICAgICAgaWYgKHNjb3JlVG9CZWF0ID09IG51bGwgfHwgY3VycmVudFNjb3JlIDwgc2NvcmVUb0JlYXQpIHtcbiAgICAgICAgICAgIHNjb3JlVG9CZWF0ID0gY3VycmVudFNjb3JlO1xuICAgICAgICAgICAgYmVzdE1vbWVudCA9IHRlbXBDb25maWc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHRlbmQoY29uZmlnLCBiZXN0TW9tZW50IHx8IHRlbXBDb25maWcpO1xufVxuXG5mdW5jdGlvbiBjb25maWdGcm9tT2JqZWN0KGNvbmZpZykge1xuICAgIGlmIChjb25maWcuX2QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBpID0gbm9ybWFsaXplT2JqZWN0VW5pdHMoY29uZmlnLl9pKTtcbiAgICBjb25maWcuX2EgPSBtYXAoW2kueWVhciwgaS5tb250aCwgaS5kYXkgfHwgaS5kYXRlLCBpLmhvdXIsIGkubWludXRlLCBpLnNlY29uZCwgaS5taWxsaXNlY29uZF0sIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiBwYXJzZUludChvYmosIDEwKTtcbiAgICB9KTtcblxuICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGcm9tQ29uZmlnIChjb25maWcpIHtcbiAgICB2YXIgcmVzID0gbmV3IE1vbWVudChjaGVja092ZXJmbG93KHByZXBhcmVDb25maWcoY29uZmlnKSkpO1xuICAgIGlmIChyZXMuX25leHREYXkpIHtcbiAgICAgICAgLy8gQWRkaW5nIGlzIHNtYXJ0IGVub3VnaCBhcm91bmQgRFNUXG4gICAgICAgIHJlcy5hZGQoMSwgJ2QnKTtcbiAgICAgICAgcmVzLl9uZXh0RGF5ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVDb25maWcgKGNvbmZpZykge1xuICAgIHZhciBpbnB1dCA9IGNvbmZpZy5faSxcbiAgICAgICAgZm9ybWF0ID0gY29uZmlnLl9mO1xuXG4gICAgY29uZmlnLl9sb2NhbGUgPSBjb25maWcuX2xvY2FsZSB8fCBnZXRMb2NhbGUoY29uZmlnLl9sKTtcblxuICAgIGlmIChpbnB1dCA9PT0gbnVsbCB8fCAoZm9ybWF0ID09PSB1bmRlZmluZWQgJiYgaW5wdXQgPT09ICcnKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlSW52YWxpZCh7bnVsbElucHV0OiB0cnVlfSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uZmlnLl9pID0gaW5wdXQgPSBjb25maWcuX2xvY2FsZS5wcmVwYXJzZShpbnB1dCk7XG4gICAgfVxuXG4gICAgaWYgKGlzTW9tZW50KGlucHV0KSkge1xuICAgICAgICByZXR1cm4gbmV3IE1vbWVudChjaGVja092ZXJmbG93KGlucHV0KSk7XG4gICAgfSBlbHNlIGlmIChpc0RhdGUoaW5wdXQpKSB7XG4gICAgICAgIGNvbmZpZy5fZCA9IGlucHV0O1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShmb3JtYXQpKSB7XG4gICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRBcnJheShjb25maWcpO1xuICAgIH0gZWxzZSBpZiAoZm9ybWF0KSB7XG4gICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcbiAgICB9ICBlbHNlIHtcbiAgICAgICAgY29uZmlnRnJvbUlucHV0KGNvbmZpZyk7XG4gICAgfVxuXG4gICAgaWYgKCFpc1ZhbGlkKGNvbmZpZykpIHtcbiAgICAgICAgY29uZmlnLl9kID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uZmlnO1xufVxuXG5mdW5jdGlvbiBjb25maWdGcm9tSW5wdXQoY29uZmlnKSB7XG4gICAgdmFyIGlucHV0ID0gY29uZmlnLl9pO1xuICAgIGlmIChpc1VuZGVmaW5lZChpbnB1dCkpIHtcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaG9va3Mubm93KCkpO1xuICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShpbnB1dC52YWx1ZU9mKCkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25maWdGcm9tU3RyaW5nKGNvbmZpZyk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGlucHV0KSkge1xuICAgICAgICBjb25maWcuX2EgPSBtYXAoaW5wdXQuc2xpY2UoMCksIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChvYmosIDEwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoaW5wdXQpKSB7XG4gICAgICAgIGNvbmZpZ0Zyb21PYmplY3QoY29uZmlnKTtcbiAgICB9IGVsc2UgaWYgKGlzTnVtYmVyKGlucHV0KSkge1xuICAgICAgICAvLyBmcm9tIG1pbGxpc2Vjb25kc1xuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShpbnB1dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2soY29uZmlnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2FsT3JVVEMgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCBpc1VUQykge1xuICAgIHZhciBjID0ge307XG5cbiAgICBpZiAobG9jYWxlID09PSB0cnVlIHx8IGxvY2FsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgc3RyaWN0ID0gbG9jYWxlO1xuICAgICAgICBsb2NhbGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKChpc09iamVjdChpbnB1dCkgJiYgaXNPYmplY3RFbXB0eShpbnB1dCkpIHx8XG4gICAgICAgICAgICAoaXNBcnJheShpbnB1dCkgJiYgaW5wdXQubGVuZ3RoID09PSAwKSkge1xuICAgICAgICBpbnB1dCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gb2JqZWN0IGNvbnN0cnVjdGlvbiBtdXN0IGJlIGRvbmUgdGhpcyB3YXkuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MjNcbiAgICBjLl9pc0FNb21lbnRPYmplY3QgPSB0cnVlO1xuICAgIGMuX3VzZVVUQyA9IGMuX2lzVVRDID0gaXNVVEM7XG4gICAgYy5fbCA9IGxvY2FsZTtcbiAgICBjLl9pID0gaW5wdXQ7XG4gICAgYy5fZiA9IGZvcm1hdDtcbiAgICBjLl9zdHJpY3QgPSBzdHJpY3Q7XG5cbiAgICByZXR1cm4gY3JlYXRlRnJvbUNvbmZpZyhjKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTG9jYWwgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2FsT3JVVEMoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QsIGZhbHNlKTtcbn1cblxudmFyIHByb3RvdHlwZU1pbiA9IGRlcHJlY2F0ZShcbiAgICAnbW9tZW50KCkubWluIGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWF4IGluc3RlYWQuIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvbWluLW1heC8nLFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG90aGVyID0gY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmIG90aGVyLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG90aGVyIDwgdGhpcyA/IHRoaXMgOiBvdGhlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVJbnZhbGlkKCk7XG4gICAgICAgIH1cbiAgICB9XG4pO1xuXG52YXIgcHJvdG90eXBlTWF4ID0gZGVwcmVjYXRlKFxuICAgICdtb21lbnQoKS5tYXggaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudC5taW4gaW5zdGVhZC4gaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9taW4tbWF4LycsXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3RoZXIgPSBjcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gb3RoZXIgPiB0aGlzID8gdGhpcyA6IG90aGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWQoKTtcbiAgICAgICAgfVxuICAgIH1cbik7XG5cbi8vIFBpY2sgYSBtb21lbnQgbSBmcm9tIG1vbWVudHMgc28gdGhhdCBtW2ZuXShvdGhlcikgaXMgdHJ1ZSBmb3IgYWxsXG4vLyBvdGhlci4gVGhpcyByZWxpZXMgb24gdGhlIGZ1bmN0aW9uIGZuIHRvIGJlIHRyYW5zaXRpdmUuXG4vL1xuLy8gbW9tZW50cyBzaG91bGQgZWl0aGVyIGJlIGFuIGFycmF5IG9mIG1vbWVudCBvYmplY3RzIG9yIGFuIGFycmF5LCB3aG9zZVxuLy8gZmlyc3QgZWxlbWVudCBpcyBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cy5cbmZ1bmN0aW9uIHBpY2tCeShmbiwgbW9tZW50cykge1xuICAgIHZhciByZXMsIGk7XG4gICAgaWYgKG1vbWVudHMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkobW9tZW50c1swXSkpIHtcbiAgICAgICAgbW9tZW50cyA9IG1vbWVudHNbMF07XG4gICAgfVxuICAgIGlmICghbW9tZW50cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUxvY2FsKCk7XG4gICAgfVxuICAgIHJlcyA9IG1vbWVudHNbMF07XG4gICAgZm9yIChpID0gMTsgaSA8IG1vbWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKCFtb21lbnRzW2ldLmlzVmFsaWQoKSB8fCBtb21lbnRzW2ldW2ZuXShyZXMpKSB7XG4gICAgICAgICAgICByZXMgPSBtb21lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbi8vIFRPRE86IFVzZSBbXS5zb3J0IGluc3RlYWQ/XG5mdW5jdGlvbiBtaW4gKCkge1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgcmV0dXJuIHBpY2tCeSgnaXNCZWZvcmUnLCBhcmdzKTtcbn1cblxuZnVuY3Rpb24gbWF4ICgpIHtcbiAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgIHJldHVybiBwaWNrQnkoJ2lzQWZ0ZXInLCBhcmdzKTtcbn1cblxudmFyIG5vdyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gRGF0ZS5ub3cgPyBEYXRlLm5vdygpIDogKyhuZXcgRGF0ZSgpKTtcbn07XG5cbnZhciBvcmRlcmluZyA9IFsneWVhcicsICdxdWFydGVyJywgJ21vbnRoJywgJ3dlZWsnLCAnZGF5JywgJ2hvdXInLCAnbWludXRlJywgJ3NlY29uZCcsICdtaWxsaXNlY29uZCddO1xuXG5mdW5jdGlvbiBpc0R1cmF0aW9uVmFsaWQobSkge1xuICAgIGZvciAodmFyIGtleSBpbiBtKSB7XG4gICAgICAgIGlmICghKG9yZGVyaW5nLmluZGV4T2Yoa2V5KSAhPT0gLTEgJiYgKG1ba2V5XSA9PSBudWxsIHx8ICFpc05hTihtW2tleV0pKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciB1bml0SGFzRGVjaW1hbCA9IGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3JkZXJpbmcubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKG1bb3JkZXJpbmdbaV1dKSB7XG4gICAgICAgICAgICBpZiAodW5pdEhhc0RlY2ltYWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIG9ubHkgYWxsb3cgbm9uLWludGVnZXJzIGZvciBzbWFsbGVzdCB1bml0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyc2VGbG9hdChtW29yZGVyaW5nW2ldXSkgIT09IHRvSW50KG1bb3JkZXJpbmdbaV1dKSkge1xuICAgICAgICAgICAgICAgIHVuaXRIYXNEZWNpbWFsID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkJDEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzVmFsaWQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUludmFsaWQkMSgpIHtcbiAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24oTmFOKTtcbn1cblxuZnVuY3Rpb24gRHVyYXRpb24gKGR1cmF0aW9uKSB7XG4gICAgdmFyIG5vcm1hbGl6ZWRJbnB1dCA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGR1cmF0aW9uKSxcbiAgICAgICAgeWVhcnMgPSBub3JtYWxpemVkSW5wdXQueWVhciB8fCAwLFxuICAgICAgICBxdWFydGVycyA9IG5vcm1hbGl6ZWRJbnB1dC5xdWFydGVyIHx8IDAsXG4gICAgICAgIG1vbnRocyA9IG5vcm1hbGl6ZWRJbnB1dC5tb250aCB8fCAwLFxuICAgICAgICB3ZWVrcyA9IG5vcm1hbGl6ZWRJbnB1dC53ZWVrIHx8IDAsXG4gICAgICAgIGRheXMgPSBub3JtYWxpemVkSW5wdXQuZGF5IHx8IDAsXG4gICAgICAgIGhvdXJzID0gbm9ybWFsaXplZElucHV0LmhvdXIgfHwgMCxcbiAgICAgICAgbWludXRlcyA9IG5vcm1hbGl6ZWRJbnB1dC5taW51dGUgfHwgMCxcbiAgICAgICAgc2Vjb25kcyA9IG5vcm1hbGl6ZWRJbnB1dC5zZWNvbmQgfHwgMCxcbiAgICAgICAgbWlsbGlzZWNvbmRzID0gbm9ybWFsaXplZElucHV0Lm1pbGxpc2Vjb25kIHx8IDA7XG5cbiAgICB0aGlzLl9pc1ZhbGlkID0gaXNEdXJhdGlvblZhbGlkKG5vcm1hbGl6ZWRJbnB1dCk7XG5cbiAgICAvLyByZXByZXNlbnRhdGlvbiBmb3IgZGF0ZUFkZFJlbW92ZVxuICAgIHRoaXMuX21pbGxpc2Vjb25kcyA9ICttaWxsaXNlY29uZHMgK1xuICAgICAgICBzZWNvbmRzICogMWUzICsgLy8gMTAwMFxuICAgICAgICBtaW51dGVzICogNmU0ICsgLy8gMTAwMCAqIDYwXG4gICAgICAgIGhvdXJzICogMTAwMCAqIDYwICogNjA7IC8vdXNpbmcgMTAwMCAqIDYwICogNjAgaW5zdGVhZCBvZiAzNmU1IHRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IHJvdW5kaW5nIGVycm9ycyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMjk3OFxuICAgIC8vIEJlY2F1c2Ugb2YgZGF0ZUFkZFJlbW92ZSB0cmVhdHMgMjQgaG91cnMgYXMgZGlmZmVyZW50IGZyb20gYVxuICAgIC8vIGRheSB3aGVuIHdvcmtpbmcgYXJvdW5kIERTVCwgd2UgbmVlZCB0byBzdG9yZSB0aGVtIHNlcGFyYXRlbHlcbiAgICB0aGlzLl9kYXlzID0gK2RheXMgK1xuICAgICAgICB3ZWVrcyAqIDc7XG4gICAgLy8gSXQgaXMgaW1wb3NzaWJsZSB0cmFuc2xhdGUgbW9udGhzIGludG8gZGF5cyB3aXRob3V0IGtub3dpbmdcbiAgICAvLyB3aGljaCBtb250aHMgeW91IGFyZSBhcmUgdGFsa2luZyBhYm91dCwgc28gd2UgaGF2ZSB0byBzdG9yZVxuICAgIC8vIGl0IHNlcGFyYXRlbHkuXG4gICAgdGhpcy5fbW9udGhzID0gK21vbnRocyArXG4gICAgICAgIHF1YXJ0ZXJzICogMyArXG4gICAgICAgIHllYXJzICogMTI7XG5cbiAgICB0aGlzLl9kYXRhID0ge307XG5cbiAgICB0aGlzLl9sb2NhbGUgPSBnZXRMb2NhbGUoKTtcblxuICAgIHRoaXMuX2J1YmJsZSgpO1xufVxuXG5mdW5jdGlvbiBpc0R1cmF0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRHVyYXRpb247XG59XG5cbmZ1bmN0aW9uIGFic1JvdW5kIChudW1iZXIpIHtcbiAgICBpZiAobnVtYmVyIDwgMCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgtMSAqIG51bWJlcikgKiAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChudW1iZXIpO1xuICAgIH1cbn1cblxuLy8gRk9STUFUVElOR1xuXG5mdW5jdGlvbiBvZmZzZXQgKHRva2VuLCBzZXBhcmF0b3IpIHtcbiAgICBhZGRGb3JtYXRUb2tlbih0b2tlbiwgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy51dGNPZmZzZXQoKTtcbiAgICAgICAgdmFyIHNpZ24gPSAnKyc7XG4gICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAtb2Zmc2V0O1xuICAgICAgICAgICAgc2lnbiA9ICctJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2lnbiArIHplcm9GaWxsKH5+KG9mZnNldCAvIDYwKSwgMikgKyBzZXBhcmF0b3IgKyB6ZXJvRmlsbCh+fihvZmZzZXQpICUgNjAsIDIpO1xuICAgIH0pO1xufVxuXG5vZmZzZXQoJ1onLCAnOicpO1xub2Zmc2V0KCdaWicsICcnKTtcblxuLy8gUEFSU0lOR1xuXG5hZGRSZWdleFRva2VuKCdaJywgIG1hdGNoU2hvcnRPZmZzZXQpO1xuYWRkUmVnZXhUb2tlbignWlonLCBtYXRjaFNob3J0T2Zmc2V0KTtcbmFkZFBhcnNlVG9rZW4oWydaJywgJ1paJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgIGNvbmZpZy5fdXNlVVRDID0gdHJ1ZTtcbiAgICBjb25maWcuX3R6bSA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hTaG9ydE9mZnNldCwgaW5wdXQpO1xufSk7XG5cbi8vIEhFTFBFUlNcblxuLy8gdGltZXpvbmUgY2h1bmtlclxuLy8gJysxMDowMCcgPiBbJzEwJywgICcwMCddXG4vLyAnLTE1MzAnICA+IFsnLTE1JywgJzMwJ11cbnZhciBjaHVua09mZnNldCA9IC8oW1xcK1xcLV18XFxkXFxkKS9naTtcblxuZnVuY3Rpb24gb2Zmc2V0RnJvbVN0cmluZyhtYXRjaGVyLCBzdHJpbmcpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IChzdHJpbmcgfHwgJycpLm1hdGNoKG1hdGNoZXIpO1xuXG4gICAgaWYgKG1hdGNoZXMgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGNodW5rICAgPSBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV0gfHwgW107XG4gICAgdmFyIHBhcnRzICAgPSAoY2h1bmsgKyAnJykubWF0Y2goY2h1bmtPZmZzZXQpIHx8IFsnLScsIDAsIDBdO1xuICAgIHZhciBtaW51dGVzID0gKyhwYXJ0c1sxXSAqIDYwKSArIHRvSW50KHBhcnRzWzJdKTtcblxuICAgIHJldHVybiBtaW51dGVzID09PSAwID9cbiAgICAgIDAgOlxuICAgICAgcGFydHNbMF0gPT09ICcrJyA/IG1pbnV0ZXMgOiAtbWludXRlcztcbn1cblxuLy8gUmV0dXJuIGEgbW9tZW50IGZyb20gaW5wdXQsIHRoYXQgaXMgbG9jYWwvdXRjL3pvbmUgZXF1aXZhbGVudCB0byBtb2RlbC5cbmZ1bmN0aW9uIGNsb25lV2l0aE9mZnNldChpbnB1dCwgbW9kZWwpIHtcbiAgICB2YXIgcmVzLCBkaWZmO1xuICAgIGlmIChtb2RlbC5faXNVVEMpIHtcbiAgICAgICAgcmVzID0gbW9kZWwuY2xvbmUoKTtcbiAgICAgICAgZGlmZiA9IChpc01vbWVudChpbnB1dCkgfHwgaXNEYXRlKGlucHV0KSA/IGlucHV0LnZhbHVlT2YoKSA6IGNyZWF0ZUxvY2FsKGlucHV0KS52YWx1ZU9mKCkpIC0gcmVzLnZhbHVlT2YoKTtcbiAgICAgICAgLy8gVXNlIGxvdy1sZXZlbCBhcGksIGJlY2F1c2UgdGhpcyBmbiBpcyBsb3ctbGV2ZWwgYXBpLlxuICAgICAgICByZXMuX2Quc2V0VGltZShyZXMuX2QudmFsdWVPZigpICsgZGlmZik7XG4gICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldChyZXMsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWwoaW5wdXQpLmxvY2FsKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXREYXRlT2Zmc2V0IChtKSB7XG4gICAgLy8gT24gRmlyZWZveC4yNCBEYXRlI2dldFRpbWV6b25lT2Zmc2V0IHJldHVybnMgYSBmbG9hdGluZyBwb2ludC5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9wdWxsLzE4NzFcbiAgICByZXR1cm4gLU1hdGgucm91bmQobS5fZC5nZXRUaW1lem9uZU9mZnNldCgpIC8gMTUpICogMTU7XG59XG5cbi8vIEhPT0tTXG5cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgYSBtb21lbnQgaXMgbXV0YXRlZC5cbi8vIEl0IGlzIGludGVuZGVkIHRvIGtlZXAgdGhlIG9mZnNldCBpbiBzeW5jIHdpdGggdGhlIHRpbWV6b25lLlxuaG9va3MudXBkYXRlT2Zmc2V0ID0gZnVuY3Rpb24gKCkge307XG5cbi8vIE1PTUVOVFNcblxuLy8ga2VlcExvY2FsVGltZSA9IHRydWUgbWVhbnMgb25seSBjaGFuZ2UgdGhlIHRpbWV6b25lLCB3aXRob3V0XG4vLyBhZmZlY3RpbmcgdGhlIGxvY2FsIGhvdXIuIFNvIDU6MzE6MjYgKzAzMDAgLS1bdXRjT2Zmc2V0KDIsIHRydWUpXS0tPlxuLy8gNTozMToyNiArMDIwMCBJdCBpcyBwb3NzaWJsZSB0aGF0IDU6MzE6MjYgZG9lc24ndCBleGlzdCB3aXRoIG9mZnNldFxuLy8gKzAyMDAsIHNvIHdlIGFkanVzdCB0aGUgdGltZSBhcyBuZWVkZWQsIHRvIGJlIHZhbGlkLlxuLy9cbi8vIEtlZXBpbmcgdGhlIHRpbWUgYWN0dWFsbHkgYWRkcy9zdWJ0cmFjdHMgKG9uZSBob3VyKVxuLy8gZnJvbSB0aGUgYWN0dWFsIHJlcHJlc2VudGVkIHRpbWUuIFRoYXQgaXMgd2h5IHdlIGNhbGwgdXBkYXRlT2Zmc2V0XG4vLyBhIHNlY29uZCB0aW1lLiBJbiBjYXNlIGl0IHdhbnRzIHVzIHRvIGNoYW5nZSB0aGUgb2Zmc2V0IGFnYWluXG4vLyBfY2hhbmdlSW5Qcm9ncmVzcyA9PSB0cnVlIGNhc2UsIHRoZW4gd2UgaGF2ZSB0byBhZGp1c3QsIGJlY2F1c2Vcbi8vIHRoZXJlIGlzIG5vIHN1Y2ggdGltZSBpbiB0aGUgZ2l2ZW4gdGltZXpvbmUuXG5mdW5jdGlvbiBnZXRTZXRPZmZzZXQgKGlucHV0LCBrZWVwTG9jYWxUaW1lLCBrZWVwTWludXRlcykge1xuICAgIHZhciBvZmZzZXQgPSB0aGlzLl9vZmZzZXQgfHwgMCxcbiAgICAgICAgbG9jYWxBZGp1c3Q7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgfVxuICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpbnB1dCA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hTaG9ydE9mZnNldCwgaW5wdXQpO1xuICAgICAgICAgICAgaWYgKGlucHV0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoaW5wdXQpIDwgMTYgJiYgIWtlZXBNaW51dGVzKSB7XG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0ICogNjA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9pc1VUQyAmJiBrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgICAgICBsb2NhbEFkanVzdCA9IGdldERhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gaW5wdXQ7XG4gICAgICAgIHRoaXMuX2lzVVRDID0gdHJ1ZTtcbiAgICAgICAgaWYgKGxvY2FsQWRqdXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkKGxvY2FsQWRqdXN0LCAnbScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvZmZzZXQgIT09IGlucHV0KSB7XG4gICAgICAgICAgICBpZiAoIWtlZXBMb2NhbFRpbWUgfHwgdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIGFkZFN1YnRyYWN0KHRoaXMsIGNyZWF0ZUR1cmF0aW9uKGlucHV0IC0gb2Zmc2V0LCAnbScpLCAxLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9jaGFuZ2VJblByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/IG9mZnNldCA6IGdldERhdGVPZmZzZXQodGhpcyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRTZXRab25lIChpbnB1dCwga2VlcExvY2FsVGltZSkge1xuICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpbnB1dCA9IC1pbnB1dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXRjT2Zmc2V0KGlucHV0LCBrZWVwTG9jYWxUaW1lKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gLXRoaXMudXRjT2Zmc2V0KCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRPZmZzZXRUb1VUQyAoa2VlcExvY2FsVGltZSkge1xuICAgIHJldHVybiB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcbn1cblxuZnVuY3Rpb24gc2V0T2Zmc2V0VG9Mb2NhbCAoa2VlcExvY2FsVGltZSkge1xuICAgIGlmICh0aGlzLl9pc1VUQykge1xuICAgICAgICB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcbiAgICAgICAgdGhpcy5faXNVVEMgPSBmYWxzZTtcblxuICAgICAgICBpZiAoa2VlcExvY2FsVGltZSkge1xuICAgICAgICAgICAgdGhpcy5zdWJ0cmFjdChnZXREYXRlT2Zmc2V0KHRoaXMpLCAnbScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldCAoKSB7XG4gICAgaWYgKHRoaXMuX3R6bSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMudXRjT2Zmc2V0KHRoaXMuX3R6bSwgZmFsc2UsIHRydWUpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuX2kgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciB0Wm9uZSA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hPZmZzZXQsIHRoaXMuX2kpO1xuICAgICAgICBpZiAodFpvbmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQodFpvbmUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoMCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGhhc0FsaWduZWRIb3VyT2Zmc2V0IChpbnB1dCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpbnB1dCA9IGlucHV0ID8gY3JlYXRlTG9jYWwoaW5wdXQpLnV0Y09mZnNldCgpIDogMDtcblxuICAgIHJldHVybiAodGhpcy51dGNPZmZzZXQoKSAtIGlucHV0KSAlIDYwID09PSAwO1xufVxuXG5mdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZSAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy51dGNPZmZzZXQoKSA+IHRoaXMuY2xvbmUoKS5tb250aCgwKS51dGNPZmZzZXQoKSB8fFxuICAgICAgICB0aGlzLnV0Y09mZnNldCgpID4gdGhpcy5jbG9uZSgpLm1vbnRoKDUpLnV0Y09mZnNldCgpXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gaXNEYXlsaWdodFNhdmluZ1RpbWVTaGlmdGVkICgpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX2lzRFNUU2hpZnRlZCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRFNUU2hpZnRlZDtcbiAgICB9XG5cbiAgICB2YXIgYyA9IHt9O1xuXG4gICAgY29weUNvbmZpZyhjLCB0aGlzKTtcbiAgICBjID0gcHJlcGFyZUNvbmZpZyhjKTtcblxuICAgIGlmIChjLl9hKSB7XG4gICAgICAgIHZhciBvdGhlciA9IGMuX2lzVVRDID8gY3JlYXRlVVRDKGMuX2EpIDogY3JlYXRlTG9jYWwoYy5fYSk7XG4gICAgICAgIHRoaXMuX2lzRFNUU2hpZnRlZCA9IHRoaXMuaXNWYWxpZCgpICYmXG4gICAgICAgICAgICBjb21wYXJlQXJyYXlzKGMuX2EsIG90aGVyLnRvQXJyYXkoKSkgPiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2lzRFNUU2hpZnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9pc0RTVFNoaWZ0ZWQ7XG59XG5cbmZ1bmN0aW9uIGlzTG9jYWwgKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/ICF0aGlzLl9pc1VUQyA6IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1V0Y09mZnNldCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy5faXNVVEMgOiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNVdGMgKCkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMuX2lzVVRDICYmIHRoaXMuX29mZnNldCA9PT0gMCA6IGZhbHNlO1xufVxuXG4vLyBBU1AuTkVUIGpzb24gZGF0ZSBmb3JtYXQgcmVnZXhcbnZhciBhc3BOZXRSZWdleCA9IC9eKFxcLSk/KD86KFxcZCopWy4gXSk/KFxcZCspXFw6KFxcZCspKD86XFw6KFxcZCspKFxcLlxcZCopPyk/JC87XG5cbi8vIGZyb20gaHR0cDovL2RvY3MuY2xvc3VyZS1saWJyYXJ5Lmdvb2dsZWNvZGUuY29tL2dpdC9jbG9zdXJlX2dvb2dfZGF0ZV9kYXRlLmpzLnNvdXJjZS5odG1sXG4vLyBzb21ld2hhdCBtb3JlIGluIGxpbmUgd2l0aCA0LjQuMy4yIDIwMDQgc3BlYywgYnV0IGFsbG93cyBkZWNpbWFsIGFueXdoZXJlXG4vLyBhbmQgZnVydGhlciBtb2RpZmllZCB0byBhbGxvdyBmb3Igc3RyaW5ncyBjb250YWluaW5nIGJvdGggd2VlayBhbmQgZGF5XG52YXIgaXNvUmVnZXggPSAvXigtKT9QKD86KC0/WzAtOSwuXSopWSk/KD86KC0/WzAtOSwuXSopTSk/KD86KC0/WzAtOSwuXSopVyk/KD86KC0/WzAtOSwuXSopRCk/KD86VCg/OigtP1swLTksLl0qKUgpPyg/OigtP1swLTksLl0qKU0pPyg/OigtP1swLTksLl0qKVMpPyk/JC87XG5cbmZ1bmN0aW9uIGNyZWF0ZUR1cmF0aW9uIChpbnB1dCwga2V5KSB7XG4gICAgdmFyIGR1cmF0aW9uID0gaW5wdXQsXG4gICAgICAgIC8vIG1hdGNoaW5nIGFnYWluc3QgcmVnZXhwIGlzIGV4cGVuc2l2ZSwgZG8gaXQgb24gZGVtYW5kXG4gICAgICAgIG1hdGNoID0gbnVsbCxcbiAgICAgICAgc2lnbixcbiAgICAgICAgcmV0LFxuICAgICAgICBkaWZmUmVzO1xuXG4gICAgaWYgKGlzRHVyYXRpb24oaW5wdXQpKSB7XG4gICAgICAgIGR1cmF0aW9uID0ge1xuICAgICAgICAgICAgbXMgOiBpbnB1dC5fbWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgZCAgOiBpbnB1dC5fZGF5cyxcbiAgICAgICAgICAgIE0gIDogaW5wdXQuX21vbnRoc1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaXNOdW1iZXIoaW5wdXQpKSB7XG4gICAgICAgIGR1cmF0aW9uID0ge307XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgIGR1cmF0aW9uW2tleV0gPSBpbnB1dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGR1cmF0aW9uLm1pbGxpc2Vjb25kcyA9IGlucHV0O1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICghIShtYXRjaCA9IGFzcE5ldFJlZ2V4LmV4ZWMoaW5wdXQpKSkge1xuICAgICAgICBzaWduID0gKG1hdGNoWzFdID09PSAnLScpID8gLTEgOiAxO1xuICAgICAgICBkdXJhdGlvbiA9IHtcbiAgICAgICAgICAgIHkgIDogMCxcbiAgICAgICAgICAgIGQgIDogdG9JbnQobWF0Y2hbREFURV0pICAgICAgICAgICAgICAgICAgICAgICAgICogc2lnbixcbiAgICAgICAgICAgIGggIDogdG9JbnQobWF0Y2hbSE9VUl0pICAgICAgICAgICAgICAgICAgICAgICAgICogc2lnbixcbiAgICAgICAgICAgIG0gIDogdG9JbnQobWF0Y2hbTUlOVVRFXSkgICAgICAgICAgICAgICAgICAgICAgICogc2lnbixcbiAgICAgICAgICAgIHMgIDogdG9JbnQobWF0Y2hbU0VDT05EXSkgICAgICAgICAgICAgICAgICAgICAgICogc2lnbixcbiAgICAgICAgICAgIG1zIDogdG9JbnQoYWJzUm91bmQobWF0Y2hbTUlMTElTRUNPTkRdICogMTAwMCkpICogc2lnbiAvLyB0aGUgbWlsbGlzZWNvbmQgZGVjaW1hbCBwb2ludCBpcyBpbmNsdWRlZCBpbiB0aGUgbWF0Y2hcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKCEhKG1hdGNoID0gaXNvUmVnZXguZXhlYyhpbnB1dCkpKSB7XG4gICAgICAgIHNpZ24gPSAobWF0Y2hbMV0gPT09ICctJykgPyAtMSA6IDE7XG4gICAgICAgIGR1cmF0aW9uID0ge1xuICAgICAgICAgICAgeSA6IHBhcnNlSXNvKG1hdGNoWzJdLCBzaWduKSxcbiAgICAgICAgICAgIE0gOiBwYXJzZUlzbyhtYXRjaFszXSwgc2lnbiksXG4gICAgICAgICAgICB3IDogcGFyc2VJc28obWF0Y2hbNF0sIHNpZ24pLFxuICAgICAgICAgICAgZCA6IHBhcnNlSXNvKG1hdGNoWzVdLCBzaWduKSxcbiAgICAgICAgICAgIGggOiBwYXJzZUlzbyhtYXRjaFs2XSwgc2lnbiksXG4gICAgICAgICAgICBtIDogcGFyc2VJc28obWF0Y2hbN10sIHNpZ24pLFxuICAgICAgICAgICAgcyA6IHBhcnNlSXNvKG1hdGNoWzhdLCBzaWduKVxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPT0gbnVsbCkgey8vIGNoZWNrcyBmb3IgbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkdXJhdGlvbiA9PT0gJ29iamVjdCcgJiYgKCdmcm9tJyBpbiBkdXJhdGlvbiB8fCAndG8nIGluIGR1cmF0aW9uKSkge1xuICAgICAgICBkaWZmUmVzID0gbW9tZW50c0RpZmZlcmVuY2UoY3JlYXRlTG9jYWwoZHVyYXRpb24uZnJvbSksIGNyZWF0ZUxvY2FsKGR1cmF0aW9uLnRvKSk7XG5cbiAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgZHVyYXRpb24ubXMgPSBkaWZmUmVzLm1pbGxpc2Vjb25kcztcbiAgICAgICAgZHVyYXRpb24uTSA9IGRpZmZSZXMubW9udGhzO1xuICAgIH1cblxuICAgIHJldCA9IG5ldyBEdXJhdGlvbihkdXJhdGlvbik7XG5cbiAgICBpZiAoaXNEdXJhdGlvbihpbnB1dCkgJiYgaGFzT3duUHJvcChpbnB1dCwgJ19sb2NhbGUnKSkge1xuICAgICAgICByZXQuX2xvY2FsZSA9IGlucHV0Ll9sb2NhbGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbn1cblxuY3JlYXRlRHVyYXRpb24uZm4gPSBEdXJhdGlvbi5wcm90b3R5cGU7XG5jcmVhdGVEdXJhdGlvbi5pbnZhbGlkID0gY3JlYXRlSW52YWxpZCQxO1xuXG5mdW5jdGlvbiBwYXJzZUlzbyAoaW5wLCBzaWduKSB7XG4gICAgLy8gV2UnZCBub3JtYWxseSB1c2Ugfn5pbnAgZm9yIHRoaXMsIGJ1dCB1bmZvcnR1bmF0ZWx5IGl0IGFsc29cbiAgICAvLyBjb252ZXJ0cyBmbG9hdHMgdG8gaW50cy5cbiAgICAvLyBpbnAgbWF5IGJlIHVuZGVmaW5lZCwgc28gY2FyZWZ1bCBjYWxsaW5nIHJlcGxhY2Ugb24gaXQuXG4gICAgdmFyIHJlcyA9IGlucCAmJiBwYXJzZUZsb2F0KGlucC5yZXBsYWNlKCcsJywgJy4nKSk7XG4gICAgLy8gYXBwbHkgc2lnbiB3aGlsZSB3ZSdyZSBhdCBpdFxuICAgIHJldHVybiAoaXNOYU4ocmVzKSA/IDAgOiByZXMpICogc2lnbjtcbn1cblxuZnVuY3Rpb24gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcikge1xuICAgIHZhciByZXMgPSB7bWlsbGlzZWNvbmRzOiAwLCBtb250aHM6IDB9O1xuXG4gICAgcmVzLm1vbnRocyA9IG90aGVyLm1vbnRoKCkgLSBiYXNlLm1vbnRoKCkgK1xuICAgICAgICAob3RoZXIueWVhcigpIC0gYmFzZS55ZWFyKCkpICogMTI7XG4gICAgaWYgKGJhc2UuY2xvbmUoKS5hZGQocmVzLm1vbnRocywgJ00nKS5pc0FmdGVyKG90aGVyKSkge1xuICAgICAgICAtLXJlcy5tb250aHM7XG4gICAgfVxuXG4gICAgcmVzLm1pbGxpc2Vjb25kcyA9ICtvdGhlciAtICsoYmFzZS5jbG9uZSgpLmFkZChyZXMubW9udGhzLCAnTScpKTtcblxuICAgIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIG1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKSB7XG4gICAgdmFyIHJlcztcbiAgICBpZiAoIShiYXNlLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpKSB7XG4gICAgICAgIHJldHVybiB7bWlsbGlzZWNvbmRzOiAwLCBtb250aHM6IDB9O1xuICAgIH1cblxuICAgIG90aGVyID0gY2xvbmVXaXRoT2Zmc2V0KG90aGVyLCBiYXNlKTtcbiAgICBpZiAoYmFzZS5pc0JlZm9yZShvdGhlcikpIHtcbiAgICAgICAgcmVzID0gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVzID0gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShvdGhlciwgYmFzZSk7XG4gICAgICAgIHJlcy5taWxsaXNlY29uZHMgPSAtcmVzLm1pbGxpc2Vjb25kcztcbiAgICAgICAgcmVzLm1vbnRocyA9IC1yZXMubW9udGhzO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG59XG5cbi8vIFRPRE86IHJlbW92ZSAnbmFtZScgYXJnIGFmdGVyIGRlcHJlY2F0aW9uIGlzIHJlbW92ZWRcbmZ1bmN0aW9uIGNyZWF0ZUFkZGVyKGRpcmVjdGlvbiwgbmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBwZXJpb2QpIHtcbiAgICAgICAgdmFyIGR1ciwgdG1wO1xuICAgICAgICAvL2ludmVydCB0aGUgYXJndW1lbnRzLCBidXQgY29tcGxhaW4gYWJvdXQgaXRcbiAgICAgICAgaWYgKHBlcmlvZCAhPT0gbnVsbCAmJiAhaXNOYU4oK3BlcmlvZCkpIHtcbiAgICAgICAgICAgIGRlcHJlY2F0ZVNpbXBsZShuYW1lLCAnbW9tZW50KCkuJyArIG5hbWUgICsgJyhwZXJpb2QsIG51bWJlcikgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBtb21lbnQoKS4nICsgbmFtZSArICcobnVtYmVyLCBwZXJpb2QpLiAnICtcbiAgICAgICAgICAgICdTZWUgaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9hZGQtaW52ZXJ0ZWQtcGFyYW0vIGZvciBtb3JlIGluZm8uJyk7XG4gICAgICAgICAgICB0bXAgPSB2YWw7IHZhbCA9IHBlcmlvZDsgcGVyaW9kID0gdG1wO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsID0gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgPyArdmFsIDogdmFsO1xuICAgICAgICBkdXIgPSBjcmVhdGVEdXJhdGlvbih2YWwsIHBlcmlvZCk7XG4gICAgICAgIGFkZFN1YnRyYWN0KHRoaXMsIGR1ciwgZGlyZWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYWRkU3VidHJhY3QgKG1vbSwgZHVyYXRpb24sIGlzQWRkaW5nLCB1cGRhdGVPZmZzZXQpIHtcbiAgICB2YXIgbWlsbGlzZWNvbmRzID0gZHVyYXRpb24uX21pbGxpc2Vjb25kcyxcbiAgICAgICAgZGF5cyA9IGFic1JvdW5kKGR1cmF0aW9uLl9kYXlzKSxcbiAgICAgICAgbW9udGhzID0gYWJzUm91bmQoZHVyYXRpb24uX21vbnRocyk7XG5cbiAgICBpZiAoIW1vbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgLy8gTm8gb3BcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHVwZGF0ZU9mZnNldCA9IHVwZGF0ZU9mZnNldCA9PSBudWxsID8gdHJ1ZSA6IHVwZGF0ZU9mZnNldDtcblxuICAgIGlmIChtaWxsaXNlY29uZHMpIHtcbiAgICAgICAgbW9tLl9kLnNldFRpbWUobW9tLl9kLnZhbHVlT2YoKSArIG1pbGxpc2Vjb25kcyAqIGlzQWRkaW5nKTtcbiAgICB9XG4gICAgaWYgKGRheXMpIHtcbiAgICAgICAgc2V0JDEobW9tLCAnRGF0ZScsIGdldChtb20sICdEYXRlJykgKyBkYXlzICogaXNBZGRpbmcpO1xuICAgIH1cbiAgICBpZiAobW9udGhzKSB7XG4gICAgICAgIHNldE1vbnRoKG1vbSwgZ2V0KG1vbSwgJ01vbnRoJykgKyBtb250aHMgKiBpc0FkZGluZyk7XG4gICAgfVxuICAgIGlmICh1cGRhdGVPZmZzZXQpIHtcbiAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KG1vbSwgZGF5cyB8fCBtb250aHMpO1xuICAgIH1cbn1cblxudmFyIGFkZCAgICAgID0gY3JlYXRlQWRkZXIoMSwgJ2FkZCcpO1xudmFyIHN1YnRyYWN0ID0gY3JlYXRlQWRkZXIoLTEsICdzdWJ0cmFjdCcpO1xuXG5mdW5jdGlvbiBnZXRDYWxlbmRhckZvcm1hdChteU1vbWVudCwgbm93KSB7XG4gICAgdmFyIGRpZmYgPSBteU1vbWVudC5kaWZmKG5vdywgJ2RheXMnLCB0cnVlKTtcbiAgICByZXR1cm4gZGlmZiA8IC02ID8gJ3NhbWVFbHNlJyA6XG4gICAgICAgICAgICBkaWZmIDwgLTEgPyAnbGFzdFdlZWsnIDpcbiAgICAgICAgICAgIGRpZmYgPCAwID8gJ2xhc3REYXknIDpcbiAgICAgICAgICAgIGRpZmYgPCAxID8gJ3NhbWVEYXknIDpcbiAgICAgICAgICAgIGRpZmYgPCAyID8gJ25leHREYXknIDpcbiAgICAgICAgICAgIGRpZmYgPCA3ID8gJ25leHRXZWVrJyA6ICdzYW1lRWxzZSc7XG59XG5cbmZ1bmN0aW9uIGNhbGVuZGFyJDEgKHRpbWUsIGZvcm1hdHMpIHtcbiAgICAvLyBXZSB3YW50IHRvIGNvbXBhcmUgdGhlIHN0YXJ0IG9mIHRvZGF5LCB2cyB0aGlzLlxuICAgIC8vIEdldHRpbmcgc3RhcnQtb2YtdG9kYXkgZGVwZW5kcyBvbiB3aGV0aGVyIHdlJ3JlIGxvY2FsL3V0Yy9vZmZzZXQgb3Igbm90LlxuICAgIHZhciBub3cgPSB0aW1lIHx8IGNyZWF0ZUxvY2FsKCksXG4gICAgICAgIHNvZCA9IGNsb25lV2l0aE9mZnNldChub3csIHRoaXMpLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICBmb3JtYXQgPSBob29rcy5jYWxlbmRhckZvcm1hdCh0aGlzLCBzb2QpIHx8ICdzYW1lRWxzZSc7XG5cbiAgICB2YXIgb3V0cHV0ID0gZm9ybWF0cyAmJiAoaXNGdW5jdGlvbihmb3JtYXRzW2Zvcm1hdF0pID8gZm9ybWF0c1tmb3JtYXRdLmNhbGwodGhpcywgbm93KSA6IGZvcm1hdHNbZm9ybWF0XSk7XG5cbiAgICByZXR1cm4gdGhpcy5mb3JtYXQob3V0cHV0IHx8IHRoaXMubG9jYWxlRGF0YSgpLmNhbGVuZGFyKGZvcm1hdCwgdGhpcywgY3JlYXRlTG9jYWwobm93KSkpO1xufVxuXG5mdW5jdGlvbiBjbG9uZSAoKSB7XG4gICAgcmV0dXJuIG5ldyBNb21lbnQodGhpcyk7XG59XG5cbmZ1bmN0aW9uIGlzQWZ0ZXIgKGlucHV0LCB1bml0cykge1xuICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBjcmVhdGVMb2NhbChpbnB1dCk7XG4gICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxJbnB1dC5pc1ZhbGlkKCkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyghaXNVbmRlZmluZWQodW5pdHMpID8gdW5pdHMgOiAnbWlsbGlzZWNvbmQnKTtcbiAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpID4gbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsSW5wdXQudmFsdWVPZigpIDwgdGhpcy5jbG9uZSgpLnN0YXJ0T2YodW5pdHMpLnZhbHVlT2YoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzQmVmb3JlIChpbnB1dCwgdW5pdHMpIHtcbiAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogY3JlYXRlTG9jYWwoaW5wdXQpO1xuICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHMoIWlzVW5kZWZpbmVkKHVuaXRzKSA/IHVuaXRzIDogJ21pbGxpc2Vjb25kJyk7XG4gICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA8IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkuZW5kT2YodW5pdHMpLnZhbHVlT2YoKSA8IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNCZXR3ZWVuIChmcm9tLCB0bywgdW5pdHMsIGluY2x1c2l2aXR5KSB7XG4gICAgaW5jbHVzaXZpdHkgPSBpbmNsdXNpdml0eSB8fCAnKCknO1xuICAgIHJldHVybiAoaW5jbHVzaXZpdHlbMF0gPT09ICcoJyA/IHRoaXMuaXNBZnRlcihmcm9tLCB1bml0cykgOiAhdGhpcy5pc0JlZm9yZShmcm9tLCB1bml0cykpICYmXG4gICAgICAgIChpbmNsdXNpdml0eVsxXSA9PT0gJyknID8gdGhpcy5pc0JlZm9yZSh0bywgdW5pdHMpIDogIXRoaXMuaXNBZnRlcih0bywgdW5pdHMpKTtcbn1cblxuZnVuY3Rpb24gaXNTYW1lIChpbnB1dCwgdW5pdHMpIHtcbiAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogY3JlYXRlTG9jYWwoaW5wdXQpLFxuICAgICAgICBpbnB1dE1zO1xuICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMgfHwgJ21pbGxpc2Vjb25kJyk7XG4gICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA9PT0gbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXRNcyA9IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLnN0YXJ0T2YodW5pdHMpLnZhbHVlT2YoKSA8PSBpbnB1dE1zICYmIGlucHV0TXMgPD0gdGhpcy5jbG9uZSgpLmVuZE9mKHVuaXRzKS52YWx1ZU9mKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc1NhbWVPckFmdGVyIChpbnB1dCwgdW5pdHMpIHtcbiAgICByZXR1cm4gdGhpcy5pc1NhbWUoaW5wdXQsIHVuaXRzKSB8fCB0aGlzLmlzQWZ0ZXIoaW5wdXQsdW5pdHMpO1xufVxuXG5mdW5jdGlvbiBpc1NhbWVPckJlZm9yZSAoaW5wdXQsIHVuaXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNTYW1lKGlucHV0LCB1bml0cykgfHwgdGhpcy5pc0JlZm9yZShpbnB1dCx1bml0cyk7XG59XG5cbmZ1bmN0aW9uIGRpZmYgKGlucHV0LCB1bml0cywgYXNGbG9hdCkge1xuICAgIHZhciB0aGF0LFxuICAgICAgICB6b25lRGVsdGEsXG4gICAgICAgIGRlbHRhLCBvdXRwdXQ7XG5cbiAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiBOYU47XG4gICAgfVxuXG4gICAgdGhhdCA9IGNsb25lV2l0aE9mZnNldChpbnB1dCwgdGhpcyk7XG5cbiAgICBpZiAoIXRoYXQuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiBOYU47XG4gICAgfVxuXG4gICAgem9uZURlbHRhID0gKHRoYXQudXRjT2Zmc2V0KCkgLSB0aGlzLnV0Y09mZnNldCgpKSAqIDZlNDtcblxuICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuXG4gICAgaWYgKHVuaXRzID09PSAneWVhcicgfHwgdW5pdHMgPT09ICdtb250aCcgfHwgdW5pdHMgPT09ICdxdWFydGVyJykge1xuICAgICAgICBvdXRwdXQgPSBtb250aERpZmYodGhpcywgdGhhdCk7XG4gICAgICAgIGlmICh1bml0cyA9PT0gJ3F1YXJ0ZXInKSB7XG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgLyAzO1xuICAgICAgICB9IGVsc2UgaWYgKHVuaXRzID09PSAneWVhcicpIHtcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dCAvIDEyO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGVsdGEgPSB0aGlzIC0gdGhhdDtcbiAgICAgICAgb3V0cHV0ID0gdW5pdHMgPT09ICdzZWNvbmQnID8gZGVsdGEgLyAxZTMgOiAvLyAxMDAwXG4gICAgICAgICAgICB1bml0cyA9PT0gJ21pbnV0ZScgPyBkZWx0YSAvIDZlNCA6IC8vIDEwMDAgKiA2MFxuICAgICAgICAgICAgdW5pdHMgPT09ICdob3VyJyA/IGRlbHRhIC8gMzZlNSA6IC8vIDEwMDAgKiA2MCAqIDYwXG4gICAgICAgICAgICB1bml0cyA9PT0gJ2RheScgPyAoZGVsdGEgLSB6b25lRGVsdGEpIC8gODY0ZTUgOiAvLyAxMDAwICogNjAgKiA2MCAqIDI0LCBuZWdhdGUgZHN0XG4gICAgICAgICAgICB1bml0cyA9PT0gJ3dlZWsnID8gKGRlbHRhIC0gem9uZURlbHRhKSAvIDYwNDhlNSA6IC8vIDEwMDAgKiA2MCAqIDYwICogMjQgKiA3LCBuZWdhdGUgZHN0XG4gICAgICAgICAgICBkZWx0YTtcbiAgICB9XG4gICAgcmV0dXJuIGFzRmxvYXQgPyBvdXRwdXQgOiBhYnNGbG9vcihvdXRwdXQpO1xufVxuXG5mdW5jdGlvbiBtb250aERpZmYgKGEsIGIpIHtcbiAgICAvLyBkaWZmZXJlbmNlIGluIG1vbnRoc1xuICAgIHZhciB3aG9sZU1vbnRoRGlmZiA9ICgoYi55ZWFyKCkgLSBhLnllYXIoKSkgKiAxMikgKyAoYi5tb250aCgpIC0gYS5tb250aCgpKSxcbiAgICAgICAgLy8gYiBpcyBpbiAoYW5jaG9yIC0gMSBtb250aCwgYW5jaG9yICsgMSBtb250aClcbiAgICAgICAgYW5jaG9yID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiwgJ21vbnRocycpLFxuICAgICAgICBhbmNob3IyLCBhZGp1c3Q7XG5cbiAgICBpZiAoYiAtIGFuY2hvciA8IDApIHtcbiAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgLSAxLCAnbW9udGhzJyk7XG4gICAgICAgIC8vIGxpbmVhciBhY3Jvc3MgdGhlIG1vbnRoXG4gICAgICAgIGFkanVzdCA9IChiIC0gYW5jaG9yKSAvIChhbmNob3IgLSBhbmNob3IyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhbmNob3IyID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiArIDEsICdtb250aHMnKTtcbiAgICAgICAgLy8gbGluZWFyIGFjcm9zcyB0aGUgbW9udGhcbiAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvcjIgLSBhbmNob3IpO1xuICAgIH1cblxuICAgIC8vY2hlY2sgZm9yIG5lZ2F0aXZlIHplcm8sIHJldHVybiB6ZXJvIGlmIG5lZ2F0aXZlIHplcm9cbiAgICByZXR1cm4gLSh3aG9sZU1vbnRoRGlmZiArIGFkanVzdCkgfHwgMDtcbn1cblxuaG9va3MuZGVmYXVsdEZvcm1hdCA9ICdZWVlZLU1NLUREVEhIOm1tOnNzWic7XG5ob29rcy5kZWZhdWx0Rm9ybWF0VXRjID0gJ1lZWVktTU0tRERUSEg6bW06c3NbWl0nO1xuXG5mdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5sb2NhbGUoJ2VuJykuZm9ybWF0KCdkZGQgTU1NIEREIFlZWVkgSEg6bW06c3MgW0dNVF1aWicpO1xufVxuXG5mdW5jdGlvbiB0b0lTT1N0cmluZygpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgbSA9IHRoaXMuY2xvbmUoKS51dGMoKTtcbiAgICBpZiAobS55ZWFyKCkgPCAwIHx8IG0ueWVhcigpID4gOTk5OSkge1xuICAgICAgICByZXR1cm4gZm9ybWF0TW9tZW50KG0sICdZWVlZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nKTtcbiAgICB9XG4gICAgaWYgKGlzRnVuY3Rpb24oRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcpKSB7XG4gICAgICAgIC8vIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBpcyB+NTB4IGZhc3RlciwgdXNlIGl0IHdoZW4gd2UgY2FuXG4gICAgICAgIHJldHVybiB0aGlzLnRvRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXRNb21lbnQobSwgJ1lZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYSBodW1hbiByZWFkYWJsZSByZXByZXNlbnRhdGlvbiBvZiBhIG1vbWVudCB0aGF0IGNhblxuICogYWxzbyBiZSBldmFsdWF0ZWQgdG8gZ2V0IGEgbmV3IG1vbWVudCB3aGljaCBpcyB0aGUgc2FtZVxuICpcbiAqIEBsaW5rIGh0dHBzOi8vbm9kZWpzLm9yZy9kaXN0L2xhdGVzdC9kb2NzL2FwaS91dGlsLmh0bWwjdXRpbF9jdXN0b21faW5zcGVjdF9mdW5jdGlvbl9vbl9vYmplY3RzXG4gKi9cbmZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuICdtb21lbnQuaW52YWxpZCgvKiAnICsgdGhpcy5faSArICcgKi8pJztcbiAgICB9XG4gICAgdmFyIGZ1bmMgPSAnbW9tZW50JztcbiAgICB2YXIgem9uZSA9ICcnO1xuICAgIGlmICghdGhpcy5pc0xvY2FsKCkpIHtcbiAgICAgICAgZnVuYyA9IHRoaXMudXRjT2Zmc2V0KCkgPT09IDAgPyAnbW9tZW50LnV0YycgOiAnbW9tZW50LnBhcnNlWm9uZSc7XG4gICAgICAgIHpvbmUgPSAnWic7XG4gICAgfVxuICAgIHZhciBwcmVmaXggPSAnWycgKyBmdW5jICsgJyhcIl0nO1xuICAgIHZhciB5ZWFyID0gKDAgPD0gdGhpcy55ZWFyKCkgJiYgdGhpcy55ZWFyKCkgPD0gOTk5OSkgPyAnWVlZWScgOiAnWVlZWVlZJztcbiAgICB2YXIgZGF0ZXRpbWUgPSAnLU1NLUREW1RdSEg6bW06c3MuU1NTJztcbiAgICB2YXIgc3VmZml4ID0gem9uZSArICdbXCIpXSc7XG5cbiAgICByZXR1cm4gdGhpcy5mb3JtYXQocHJlZml4ICsgeWVhciArIGRhdGV0aW1lICsgc3VmZml4KTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0IChpbnB1dFN0cmluZykge1xuICAgIGlmICghaW5wdXRTdHJpbmcpIHtcbiAgICAgICAgaW5wdXRTdHJpbmcgPSB0aGlzLmlzVXRjKCkgPyBob29rcy5kZWZhdWx0Rm9ybWF0VXRjIDogaG9va3MuZGVmYXVsdEZvcm1hdDtcbiAgICB9XG4gICAgdmFyIG91dHB1dCA9IGZvcm1hdE1vbWVudCh0aGlzLCBpbnB1dFN0cmluZyk7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLnBvc3Rmb3JtYXQob3V0cHV0KTtcbn1cblxuZnVuY3Rpb24gZnJvbSAodGltZSwgd2l0aG91dFN1ZmZpeCkge1xuICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJlxuICAgICAgICAgICAgKChpc01vbWVudCh0aW1lKSAmJiB0aW1lLmlzVmFsaWQoKSkgfHxcbiAgICAgICAgICAgICBjcmVhdGVMb2NhbCh0aW1lKS5pc1ZhbGlkKCkpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVEdXJhdGlvbih7dG86IHRoaXMsIGZyb206IHRpbWV9KS5sb2NhbGUodGhpcy5sb2NhbGUoKSkuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZnJvbU5vdyAod2l0aG91dFN1ZmZpeCkge1xuICAgIHJldHVybiB0aGlzLmZyb20oY3JlYXRlTG9jYWwoKSwgd2l0aG91dFN1ZmZpeCk7XG59XG5cbmZ1bmN0aW9uIHRvICh0aW1lLCB3aXRob3V0U3VmZml4KSB7XG4gICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmXG4gICAgICAgICAgICAoKGlzTW9tZW50KHRpbWUpICYmIHRpbWUuaXNWYWxpZCgpKSB8fFxuICAgICAgICAgICAgIGNyZWF0ZUxvY2FsKHRpbWUpLmlzVmFsaWQoKSkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUR1cmF0aW9uKHtmcm9tOiB0aGlzLCB0bzogdGltZX0pLmxvY2FsZSh0aGlzLmxvY2FsZSgpKS5odW1hbml6ZSghd2l0aG91dFN1ZmZpeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0b05vdyAod2l0aG91dFN1ZmZpeCkge1xuICAgIHJldHVybiB0aGlzLnRvKGNyZWF0ZUxvY2FsKCksIHdpdGhvdXRTdWZmaXgpO1xufVxuXG4vLyBJZiBwYXNzZWQgYSBsb2NhbGUga2V5LCBpdCB3aWxsIHNldCB0aGUgbG9jYWxlIGZvciB0aGlzXG4vLyBpbnN0YW5jZS4gIE90aGVyd2lzZSwgaXQgd2lsbCByZXR1cm4gdGhlIGxvY2FsZSBjb25maWd1cmF0aW9uXG4vLyB2YXJpYWJsZXMgZm9yIHRoaXMgaW5zdGFuY2UuXG5mdW5jdGlvbiBsb2NhbGUgKGtleSkge1xuICAgIHZhciBuZXdMb2NhbGVEYXRhO1xuXG4gICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGUuX2FiYnI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV3TG9jYWxlRGF0YSA9IGdldExvY2FsZShrZXkpO1xuICAgICAgICBpZiAobmV3TG9jYWxlRGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NhbGUgPSBuZXdMb2NhbGVEYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxudmFyIGxhbmcgPSBkZXByZWNhdGUoXG4gICAgJ21vbWVudCgpLmxhbmcoKSBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkLCB1c2UgbW9tZW50KCkubG9jYWxlRGF0YSgpIHRvIGdldCB0aGUgbGFuZ3VhZ2UgY29uZmlndXJhdGlvbi4gVXNlIG1vbWVudCgpLmxvY2FsZSgpIHRvIGNoYW5nZSBsYW5ndWFnZXMuJyxcbiAgICBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG4pO1xuXG5mdW5jdGlvbiBsb2NhbGVEYXRhICgpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xufVxuXG5mdW5jdGlvbiBzdGFydE9mICh1bml0cykge1xuICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgIC8vIHRoZSBmb2xsb3dpbmcgc3dpdGNoIGludGVudGlvbmFsbHkgb21pdHMgYnJlYWsga2V5d29yZHNcbiAgICAvLyB0byB1dGlsaXplIGZhbGxpbmcgdGhyb3VnaCB0aGUgY2FzZXMuXG4gICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIHRoaXMubW9udGgoMCk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ3F1YXJ0ZXInOlxuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICB0aGlzLmRhdGUoMSk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICBjYXNlICdpc29XZWVrJzpcbiAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICB0aGlzLmhvdXJzKDApO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgIHRoaXMubWludXRlcygwKTtcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kcygwKTtcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgIHRoaXMubWlsbGlzZWNvbmRzKDApO1xuICAgIH1cblxuICAgIC8vIHdlZWtzIGFyZSBhIHNwZWNpYWwgY2FzZVxuICAgIGlmICh1bml0cyA9PT0gJ3dlZWsnKSB7XG4gICAgICAgIHRoaXMud2Vla2RheSgwKTtcbiAgICB9XG4gICAgaWYgKHVuaXRzID09PSAnaXNvV2VlaycpIHtcbiAgICAgICAgdGhpcy5pc29XZWVrZGF5KDEpO1xuICAgIH1cblxuICAgIC8vIHF1YXJ0ZXJzIGFyZSBhbHNvIHNwZWNpYWxcbiAgICBpZiAodW5pdHMgPT09ICdxdWFydGVyJykge1xuICAgICAgICB0aGlzLm1vbnRoKE1hdGguZmxvb3IodGhpcy5tb250aCgpIC8gMykgKiAzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gZW5kT2YgKHVuaXRzKSB7XG4gICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgaWYgKHVuaXRzID09PSB1bmRlZmluZWQgfHwgdW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gJ2RhdGUnIGlzIGFuIGFsaWFzIGZvciAnZGF5Jywgc28gaXQgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYXMgc3VjaC5cbiAgICBpZiAodW5pdHMgPT09ICdkYXRlJykge1xuICAgICAgICB1bml0cyA9ICdkYXknO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0YXJ0T2YodW5pdHMpLmFkZCgxLCAodW5pdHMgPT09ICdpc29XZWVrJyA/ICd3ZWVrJyA6IHVuaXRzKSkuc3VidHJhY3QoMSwgJ21zJyk7XG59XG5cbmZ1bmN0aW9uIHZhbHVlT2YgKCkge1xuICAgIHJldHVybiB0aGlzLl9kLnZhbHVlT2YoKSAtICgodGhpcy5fb2Zmc2V0IHx8IDApICogNjAwMDApO1xufVxuXG5mdW5jdGlvbiB1bml4ICgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLnZhbHVlT2YoKSAvIDEwMDApO1xufVxuXG5mdW5jdGlvbiB0b0RhdGUgKCkge1xuICAgIHJldHVybiBuZXcgRGF0ZSh0aGlzLnZhbHVlT2YoKSk7XG59XG5cbmZ1bmN0aW9uIHRvQXJyYXkgKCkge1xuICAgIHZhciBtID0gdGhpcztcbiAgICByZXR1cm4gW20ueWVhcigpLCBtLm1vbnRoKCksIG0uZGF0ZSgpLCBtLmhvdXIoKSwgbS5taW51dGUoKSwgbS5zZWNvbmQoKSwgbS5taWxsaXNlY29uZCgpXTtcbn1cblxuZnVuY3Rpb24gdG9PYmplY3QgKCkge1xuICAgIHZhciBtID0gdGhpcztcbiAgICByZXR1cm4ge1xuICAgICAgICB5ZWFyczogbS55ZWFyKCksXG4gICAgICAgIG1vbnRoczogbS5tb250aCgpLFxuICAgICAgICBkYXRlOiBtLmRhdGUoKSxcbiAgICAgICAgaG91cnM6IG0uaG91cnMoKSxcbiAgICAgICAgbWludXRlczogbS5taW51dGVzKCksXG4gICAgICAgIHNlY29uZHM6IG0uc2Vjb25kcygpLFxuICAgICAgICBtaWxsaXNlY29uZHM6IG0ubWlsbGlzZWNvbmRzKClcbiAgICB9O1xufVxuXG5mdW5jdGlvbiB0b0pTT04gKCkge1xuICAgIC8vIG5ldyBEYXRlKE5hTikudG9KU09OKCkgPT09IG51bGxcbiAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLnRvSVNPU3RyaW5nKCkgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkJDIgKCkge1xuICAgIHJldHVybiBpc1ZhbGlkKHRoaXMpO1xufVxuXG5mdW5jdGlvbiBwYXJzaW5nRmxhZ3MgKCkge1xuICAgIHJldHVybiBleHRlbmQoe30sIGdldFBhcnNpbmdGbGFncyh0aGlzKSk7XG59XG5cbmZ1bmN0aW9uIGludmFsaWRBdCAoKSB7XG4gICAgcmV0dXJuIGdldFBhcnNpbmdGbGFncyh0aGlzKS5vdmVyZmxvdztcbn1cblxuZnVuY3Rpb24gY3JlYXRpb25EYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGlucHV0OiB0aGlzLl9pLFxuICAgICAgICBmb3JtYXQ6IHRoaXMuX2YsXG4gICAgICAgIGxvY2FsZTogdGhpcy5fbG9jYWxlLFxuICAgICAgICBpc1VUQzogdGhpcy5faXNVVEMsXG4gICAgICAgIHN0cmljdDogdGhpcy5fc3RyaWN0XG4gICAgfTtcbn1cblxuLy8gRk9STUFUVElOR1xuXG5hZGRGb3JtYXRUb2tlbigwLCBbJ2dnJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy53ZWVrWWVhcigpICUgMTAwO1xufSk7XG5cbmFkZEZvcm1hdFRva2VuKDAsIFsnR0cnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmlzb1dlZWtZZWFyKCkgJSAxMDA7XG59KTtcblxuZnVuY3Rpb24gYWRkV2Vla1llYXJGb3JtYXRUb2tlbiAodG9rZW4sIGdldHRlcikge1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFt0b2tlbiwgdG9rZW4ubGVuZ3RoXSwgMCwgZ2V0dGVyKTtcbn1cblxuYWRkV2Vla1llYXJGb3JtYXRUb2tlbignZ2dnZycsICAgICAnd2Vla1llYXInKTtcbmFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ2dnZ2dnJywgICAgJ3dlZWtZZWFyJyk7XG5hZGRXZWVrWWVhckZvcm1hdFRva2VuKCdHR0dHJywgICdpc29XZWVrWWVhcicpO1xuYWRkV2Vla1llYXJGb3JtYXRUb2tlbignR0dHR0cnLCAnaXNvV2Vla1llYXInKTtcblxuLy8gQUxJQVNFU1xuXG5hZGRVbml0QWxpYXMoJ3dlZWtZZWFyJywgJ2dnJyk7XG5hZGRVbml0QWxpYXMoJ2lzb1dlZWtZZWFyJywgJ0dHJyk7XG5cbi8vIFBSSU9SSVRZXG5cbmFkZFVuaXRQcmlvcml0eSgnd2Vla1llYXInLCAxKTtcbmFkZFVuaXRQcmlvcml0eSgnaXNvV2Vla1llYXInLCAxKTtcblxuXG4vLyBQQVJTSU5HXG5cbmFkZFJlZ2V4VG9rZW4oJ0cnLCAgICAgIG1hdGNoU2lnbmVkKTtcbmFkZFJlZ2V4VG9rZW4oJ2cnLCAgICAgIG1hdGNoU2lnbmVkKTtcbmFkZFJlZ2V4VG9rZW4oJ0dHJywgICAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbmFkZFJlZ2V4VG9rZW4oJ2dnJywgICAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbmFkZFJlZ2V4VG9rZW4oJ0dHR0cnLCAgIG1hdGNoMXRvNCwgbWF0Y2g0KTtcbmFkZFJlZ2V4VG9rZW4oJ2dnZ2cnLCAgIG1hdGNoMXRvNCwgbWF0Y2g0KTtcbmFkZFJlZ2V4VG9rZW4oJ0dHR0dHJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcbmFkZFJlZ2V4VG9rZW4oJ2dnZ2dnJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcblxuYWRkV2Vla1BhcnNlVG9rZW4oWydnZ2dnJywgJ2dnZ2dnJywgJ0dHR0cnLCAnR0dHR0cnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgd2Vla1t0b2tlbi5zdWJzdHIoMCwgMildID0gdG9JbnQoaW5wdXQpO1xufSk7XG5cbmFkZFdlZWtQYXJzZVRva2VuKFsnZ2cnLCAnR0cnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgd2Vla1t0b2tlbl0gPSBob29rcy5wYXJzZVR3b0RpZ2l0WWVhcihpbnB1dCk7XG59KTtcblxuLy8gTU9NRU5UU1xuXG5mdW5jdGlvbiBnZXRTZXRXZWVrWWVhciAoaW5wdXQpIHtcbiAgICByZXR1cm4gZ2V0U2V0V2Vla1llYXJIZWxwZXIuY2FsbCh0aGlzLFxuICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgICAgICB0aGlzLndlZWsoKSxcbiAgICAgICAgICAgIHRoaXMud2Vla2RheSgpLFxuICAgICAgICAgICAgdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWsuZG93LFxuICAgICAgICAgICAgdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWsuZG95KTtcbn1cblxuZnVuY3Rpb24gZ2V0U2V0SVNPV2Vla1llYXIgKGlucHV0KSB7XG4gICAgcmV0dXJuIGdldFNldFdlZWtZZWFySGVscGVyLmNhbGwodGhpcyxcbiAgICAgICAgICAgIGlucHV0LCB0aGlzLmlzb1dlZWsoKSwgdGhpcy5pc29XZWVrZGF5KCksIDEsIDQpO1xufVxuXG5mdW5jdGlvbiBnZXRJU09XZWVrc0luWWVhciAoKSB7XG4gICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMueWVhcigpLCAxLCA0KTtcbn1cblxuZnVuY3Rpb24gZ2V0V2Vla3NJblllYXIgKCkge1xuICAgIHZhciB3ZWVrSW5mbyA9IHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrO1xuICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLnllYXIoKSwgd2Vla0luZm8uZG93LCB3ZWVrSW5mby5kb3kpO1xufVxuXG5mdW5jdGlvbiBnZXRTZXRXZWVrWWVhckhlbHBlcihpbnB1dCwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcbiAgICB2YXIgd2Vla3NUYXJnZXQ7XG4gICAgaWYgKGlucHV0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdlZWtPZlllYXIodGhpcywgZG93LCBkb3kpLnllYXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2Vla3NUYXJnZXQgPSB3ZWVrc0luWWVhcihpbnB1dCwgZG93LCBkb3kpO1xuICAgICAgICBpZiAod2VlayA+IHdlZWtzVGFyZ2V0KSB7XG4gICAgICAgICAgICB3ZWVrID0gd2Vla3NUYXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldFdlZWtBbGwuY2FsbCh0aGlzLCBpbnB1dCwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0V2Vla0FsbCh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcbiAgICB2YXIgZGF5T2ZZZWFyRGF0YSA9IGRheU9mWWVhckZyb21XZWVrcyh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpLFxuICAgICAgICBkYXRlID0gY3JlYXRlVVRDRGF0ZShkYXlPZlllYXJEYXRhLnllYXIsIDAsIGRheU9mWWVhckRhdGEuZGF5T2ZZZWFyKTtcblxuICAgIHRoaXMueWVhcihkYXRlLmdldFVUQ0Z1bGxZZWFyKCkpO1xuICAgIHRoaXMubW9udGgoZGF0ZS5nZXRVVENNb250aCgpKTtcbiAgICB0aGlzLmRhdGUoZGF0ZS5nZXRVVENEYXRlKCkpO1xuICAgIHJldHVybiB0aGlzO1xufVxuXG4vLyBGT1JNQVRUSU5HXG5cbmFkZEZvcm1hdFRva2VuKCdRJywgMCwgJ1FvJywgJ3F1YXJ0ZXInKTtcblxuLy8gQUxJQVNFU1xuXG5hZGRVbml0QWxpYXMoJ3F1YXJ0ZXInLCAnUScpO1xuXG4vLyBQUklPUklUWVxuXG5hZGRVbml0UHJpb3JpdHkoJ3F1YXJ0ZXInLCA3KTtcblxuLy8gUEFSU0lOR1xuXG5hZGRSZWdleFRva2VuKCdRJywgbWF0Y2gxKTtcbmFkZFBhcnNlVG9rZW4oJ1EnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgYXJyYXlbTU9OVEhdID0gKHRvSW50KGlucHV0KSAtIDEpICogMztcbn0pO1xuXG4vLyBNT01FTlRTXG5cbmZ1bmN0aW9uIGdldFNldFF1YXJ0ZXIgKGlucHV0KSB7XG4gICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyBNYXRoLmNlaWwoKHRoaXMubW9udGgoKSArIDEpIC8gMykgOiB0aGlzLm1vbnRoKChpbnB1dCAtIDEpICogMyArIHRoaXMubW9udGgoKSAlIDMpO1xufVxuXG4vLyBGT1JNQVRUSU5HXG5cbmFkZEZvcm1hdFRva2VuKCdEJywgWydERCcsIDJdLCAnRG8nLCAnZGF0ZScpO1xuXG4vLyBBTElBU0VTXG5cbmFkZFVuaXRBbGlhcygnZGF0ZScsICdEJyk7XG5cbi8vIFBSSU9ST0lUWVxuYWRkVW5pdFByaW9yaXR5KCdkYXRlJywgOSk7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbignRCcsICBtYXRjaDF0bzIpO1xuYWRkUmVnZXhUb2tlbignREQnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG5hZGRSZWdleFRva2VuKCdEbycsIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgLy8gVE9ETzogUmVtb3ZlIFwib3JkaW5hbFBhcnNlXCIgZmFsbGJhY2sgaW4gbmV4dCBtYWpvciByZWxlYXNlLlxuICAgIHJldHVybiBpc1N0cmljdCA/XG4gICAgICAobG9jYWxlLl9kYXlPZk1vbnRoT3JkaW5hbFBhcnNlIHx8IGxvY2FsZS5fb3JkaW5hbFBhcnNlKSA6XG4gICAgICBsb2NhbGUuX2RheU9mTW9udGhPcmRpbmFsUGFyc2VMZW5pZW50O1xufSk7XG5cbmFkZFBhcnNlVG9rZW4oWydEJywgJ0REJ10sIERBVEUpO1xuYWRkUGFyc2VUb2tlbignRG8nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgYXJyYXlbREFURV0gPSB0b0ludChpbnB1dC5tYXRjaChtYXRjaDF0bzIpWzBdLCAxMCk7XG59KTtcblxuLy8gTU9NRU5UU1xuXG52YXIgZ2V0U2V0RGF5T2ZNb250aCA9IG1ha2VHZXRTZXQoJ0RhdGUnLCB0cnVlKTtcblxuLy8gRk9STUFUVElOR1xuXG5hZGRGb3JtYXRUb2tlbignREREJywgWydEREREJywgM10sICdERERvJywgJ2RheU9mWWVhcicpO1xuXG4vLyBBTElBU0VTXG5cbmFkZFVuaXRBbGlhcygnZGF5T2ZZZWFyJywgJ0RERCcpO1xuXG4vLyBQUklPUklUWVxuYWRkVW5pdFByaW9yaXR5KCdkYXlPZlllYXInLCA0KTtcblxuLy8gUEFSU0lOR1xuXG5hZGRSZWdleFRva2VuKCdEREQnLCAgbWF0Y2gxdG8zKTtcbmFkZFJlZ2V4VG9rZW4oJ0REREQnLCBtYXRjaDMpO1xuYWRkUGFyc2VUb2tlbihbJ0RERCcsICdEREREJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdG9JbnQoaW5wdXQpO1xufSk7XG5cbi8vIEhFTFBFUlNcblxuLy8gTU9NRU5UU1xuXG5mdW5jdGlvbiBnZXRTZXREYXlPZlllYXIgKGlucHV0KSB7XG4gICAgdmFyIGRheU9mWWVhciA9IE1hdGgucm91bmQoKHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKSAtIHRoaXMuY2xvbmUoKS5zdGFydE9mKCd5ZWFyJykpIC8gODY0ZTUpICsgMTtcbiAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IGRheU9mWWVhciA6IHRoaXMuYWRkKChpbnB1dCAtIGRheU9mWWVhciksICdkJyk7XG59XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oJ20nLCBbJ21tJywgMl0sIDAsICdtaW51dGUnKTtcblxuLy8gQUxJQVNFU1xuXG5hZGRVbml0QWxpYXMoJ21pbnV0ZScsICdtJyk7XG5cbi8vIFBSSU9SSVRZXG5cbmFkZFVuaXRQcmlvcml0eSgnbWludXRlJywgMTQpO1xuXG4vLyBQQVJTSU5HXG5cbmFkZFJlZ2V4VG9rZW4oJ20nLCAgbWF0Y2gxdG8yKTtcbmFkZFJlZ2V4VG9rZW4oJ21tJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuYWRkUGFyc2VUb2tlbihbJ20nLCAnbW0nXSwgTUlOVVRFKTtcblxuLy8gTU9NRU5UU1xuXG52YXIgZ2V0U2V0TWludXRlID0gbWFrZUdldFNldCgnTWludXRlcycsIGZhbHNlKTtcblxuLy8gRk9STUFUVElOR1xuXG5hZGRGb3JtYXRUb2tlbigncycsIFsnc3MnLCAyXSwgMCwgJ3NlY29uZCcpO1xuXG4vLyBBTElBU0VTXG5cbmFkZFVuaXRBbGlhcygnc2Vjb25kJywgJ3MnKTtcblxuLy8gUFJJT1JJVFlcblxuYWRkVW5pdFByaW9yaXR5KCdzZWNvbmQnLCAxNSk7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbigncycsICBtYXRjaDF0bzIpO1xuYWRkUmVnZXhUb2tlbignc3MnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG5hZGRQYXJzZVRva2VuKFsncycsICdzcyddLCBTRUNPTkQpO1xuXG4vLyBNT01FTlRTXG5cbnZhciBnZXRTZXRTZWNvbmQgPSBtYWtlR2V0U2V0KCdTZWNvbmRzJywgZmFsc2UpO1xuXG4vLyBGT1JNQVRUSU5HXG5cbmFkZEZvcm1hdFRva2VuKCdTJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMDApO1xufSk7XG5cbmFkZEZvcm1hdFRva2VuKDAsIFsnU1MnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMCk7XG59KTtcblxuYWRkRm9ybWF0VG9rZW4oMCwgWydTU1MnLCAzXSwgMCwgJ21pbGxpc2Vjb25kJyk7XG5hZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1MnLCA0XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDtcbn0pO1xuYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTUycsIDVdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDtcbn0pO1xuYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1MnLCA2XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwO1xufSk7XG5hZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTU1MnLCA3XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDtcbn0pO1xuYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTUycsIDhdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDAwMDtcbn0pO1xuYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTU1MnLCA5XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDAwO1xufSk7XG5cblxuLy8gQUxJQVNFU1xuXG5hZGRVbml0QWxpYXMoJ21pbGxpc2Vjb25kJywgJ21zJyk7XG5cbi8vIFBSSU9SSVRZXG5cbmFkZFVuaXRQcmlvcml0eSgnbWlsbGlzZWNvbmQnLCAxNik7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbignUycsICAgIG1hdGNoMXRvMywgbWF0Y2gxKTtcbmFkZFJlZ2V4VG9rZW4oJ1NTJywgICBtYXRjaDF0bzMsIG1hdGNoMik7XG5hZGRSZWdleFRva2VuKCdTU1MnLCAgbWF0Y2gxdG8zLCBtYXRjaDMpO1xuXG52YXIgdG9rZW47XG5mb3IgKHRva2VuID0gJ1NTU1MnOyB0b2tlbi5sZW5ndGggPD0gOTsgdG9rZW4gKz0gJ1MnKSB7XG4gICAgYWRkUmVnZXhUb2tlbih0b2tlbiwgbWF0Y2hVbnNpZ25lZCk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTXMoaW5wdXQsIGFycmF5KSB7XG4gICAgYXJyYXlbTUlMTElTRUNPTkRdID0gdG9JbnQoKCcwLicgKyBpbnB1dCkgKiAxMDAwKTtcbn1cblxuZm9yICh0b2tlbiA9ICdTJzsgdG9rZW4ubGVuZ3RoIDw9IDk7IHRva2VuICs9ICdTJykge1xuICAgIGFkZFBhcnNlVG9rZW4odG9rZW4sIHBhcnNlTXMpO1xufVxuLy8gTU9NRU5UU1xuXG52YXIgZ2V0U2V0TWlsbGlzZWNvbmQgPSBtYWtlR2V0U2V0KCdNaWxsaXNlY29uZHMnLCBmYWxzZSk7XG5cbi8vIEZPUk1BVFRJTkdcblxuYWRkRm9ybWF0VG9rZW4oJ3onLCAgMCwgMCwgJ3pvbmVBYmJyJyk7XG5hZGRGb3JtYXRUb2tlbignenonLCAwLCAwLCAnem9uZU5hbWUnKTtcblxuLy8gTU9NRU5UU1xuXG5mdW5jdGlvbiBnZXRab25lQWJiciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gJ1VUQycgOiAnJztcbn1cblxuZnVuY3Rpb24gZ2V0Wm9uZU5hbWUgKCkge1xuICAgIHJldHVybiB0aGlzLl9pc1VUQyA/ICdDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZScgOiAnJztcbn1cblxudmFyIHByb3RvID0gTW9tZW50LnByb3RvdHlwZTtcblxucHJvdG8uYWRkICAgICAgICAgICAgICAgPSBhZGQ7XG5wcm90by5jYWxlbmRhciAgICAgICAgICA9IGNhbGVuZGFyJDE7XG5wcm90by5jbG9uZSAgICAgICAgICAgICA9IGNsb25lO1xucHJvdG8uZGlmZiAgICAgICAgICAgICAgPSBkaWZmO1xucHJvdG8uZW5kT2YgICAgICAgICAgICAgPSBlbmRPZjtcbnByb3RvLmZvcm1hdCAgICAgICAgICAgID0gZm9ybWF0O1xucHJvdG8uZnJvbSAgICAgICAgICAgICAgPSBmcm9tO1xucHJvdG8uZnJvbU5vdyAgICAgICAgICAgPSBmcm9tTm93O1xucHJvdG8udG8gICAgICAgICAgICAgICAgPSB0bztcbnByb3RvLnRvTm93ICAgICAgICAgICAgID0gdG9Ob3c7XG5wcm90by5nZXQgICAgICAgICAgICAgICA9IHN0cmluZ0dldDtcbnByb3RvLmludmFsaWRBdCAgICAgICAgID0gaW52YWxpZEF0O1xucHJvdG8uaXNBZnRlciAgICAgICAgICAgPSBpc0FmdGVyO1xucHJvdG8uaXNCZWZvcmUgICAgICAgICAgPSBpc0JlZm9yZTtcbnByb3RvLmlzQmV0d2VlbiAgICAgICAgID0gaXNCZXR3ZWVuO1xucHJvdG8uaXNTYW1lICAgICAgICAgICAgPSBpc1NhbWU7XG5wcm90by5pc1NhbWVPckFmdGVyICAgICA9IGlzU2FtZU9yQWZ0ZXI7XG5wcm90by5pc1NhbWVPckJlZm9yZSAgICA9IGlzU2FtZU9yQmVmb3JlO1xucHJvdG8uaXNWYWxpZCAgICAgICAgICAgPSBpc1ZhbGlkJDI7XG5wcm90by5sYW5nICAgICAgICAgICAgICA9IGxhbmc7XG5wcm90by5sb2NhbGUgICAgICAgICAgICA9IGxvY2FsZTtcbnByb3RvLmxvY2FsZURhdGEgICAgICAgID0gbG9jYWxlRGF0YTtcbnByb3RvLm1heCAgICAgICAgICAgICAgID0gcHJvdG90eXBlTWF4O1xucHJvdG8ubWluICAgICAgICAgICAgICAgPSBwcm90b3R5cGVNaW47XG5wcm90by5wYXJzaW5nRmxhZ3MgICAgICA9IHBhcnNpbmdGbGFncztcbnByb3RvLnNldCAgICAgICAgICAgICAgID0gc3RyaW5nU2V0O1xucHJvdG8uc3RhcnRPZiAgICAgICAgICAgPSBzdGFydE9mO1xucHJvdG8uc3VidHJhY3QgICAgICAgICAgPSBzdWJ0cmFjdDtcbnByb3RvLnRvQXJyYXkgICAgICAgICAgID0gdG9BcnJheTtcbnByb3RvLnRvT2JqZWN0ICAgICAgICAgID0gdG9PYmplY3Q7XG5wcm90by50b0RhdGUgICAgICAgICAgICA9IHRvRGF0ZTtcbnByb3RvLnRvSVNPU3RyaW5nICAgICAgID0gdG9JU09TdHJpbmc7XG5wcm90by5pbnNwZWN0ICAgICAgICAgICA9IGluc3BlY3Q7XG5wcm90by50b0pTT04gICAgICAgICAgICA9IHRvSlNPTjtcbnByb3RvLnRvU3RyaW5nICAgICAgICAgID0gdG9TdHJpbmc7XG5wcm90by51bml4ICAgICAgICAgICAgICA9IHVuaXg7XG5wcm90by52YWx1ZU9mICAgICAgICAgICA9IHZhbHVlT2Y7XG5wcm90by5jcmVhdGlvbkRhdGEgICAgICA9IGNyZWF0aW9uRGF0YTtcblxuLy8gWWVhclxucHJvdG8ueWVhciAgICAgICA9IGdldFNldFllYXI7XG5wcm90by5pc0xlYXBZZWFyID0gZ2V0SXNMZWFwWWVhcjtcblxuLy8gV2VlayBZZWFyXG5wcm90by53ZWVrWWVhciAgICA9IGdldFNldFdlZWtZZWFyO1xucHJvdG8uaXNvV2Vla1llYXIgPSBnZXRTZXRJU09XZWVrWWVhcjtcblxuLy8gUXVhcnRlclxucHJvdG8ucXVhcnRlciA9IHByb3RvLnF1YXJ0ZXJzID0gZ2V0U2V0UXVhcnRlcjtcblxuLy8gTW9udGhcbnByb3RvLm1vbnRoICAgICAgID0gZ2V0U2V0TW9udGg7XG5wcm90by5kYXlzSW5Nb250aCA9IGdldERheXNJbk1vbnRoO1xuXG4vLyBXZWVrXG5wcm90by53ZWVrICAgICAgICAgICA9IHByb3RvLndlZWtzICAgICAgICA9IGdldFNldFdlZWs7XG5wcm90by5pc29XZWVrICAgICAgICA9IHByb3RvLmlzb1dlZWtzICAgICA9IGdldFNldElTT1dlZWs7XG5wcm90by53ZWVrc0luWWVhciAgICA9IGdldFdlZWtzSW5ZZWFyO1xucHJvdG8uaXNvV2Vla3NJblllYXIgPSBnZXRJU09XZWVrc0luWWVhcjtcblxuLy8gRGF5XG5wcm90by5kYXRlICAgICAgID0gZ2V0U2V0RGF5T2ZNb250aDtcbnByb3RvLmRheSAgICAgICAgPSBwcm90by5kYXlzICAgICAgICAgICAgID0gZ2V0U2V0RGF5T2ZXZWVrO1xucHJvdG8ud2Vla2RheSAgICA9IGdldFNldExvY2FsZURheU9mV2VlaztcbnByb3RvLmlzb1dlZWtkYXkgPSBnZXRTZXRJU09EYXlPZldlZWs7XG5wcm90by5kYXlPZlllYXIgID0gZ2V0U2V0RGF5T2ZZZWFyO1xuXG4vLyBIb3VyXG5wcm90by5ob3VyID0gcHJvdG8uaG91cnMgPSBnZXRTZXRIb3VyO1xuXG4vLyBNaW51dGVcbnByb3RvLm1pbnV0ZSA9IHByb3RvLm1pbnV0ZXMgPSBnZXRTZXRNaW51dGU7XG5cbi8vIFNlY29uZFxucHJvdG8uc2Vjb25kID0gcHJvdG8uc2Vjb25kcyA9IGdldFNldFNlY29uZDtcblxuLy8gTWlsbGlzZWNvbmRcbnByb3RvLm1pbGxpc2Vjb25kID0gcHJvdG8ubWlsbGlzZWNvbmRzID0gZ2V0U2V0TWlsbGlzZWNvbmQ7XG5cbi8vIE9mZnNldFxucHJvdG8udXRjT2Zmc2V0ICAgICAgICAgICAgPSBnZXRTZXRPZmZzZXQ7XG5wcm90by51dGMgICAgICAgICAgICAgICAgICA9IHNldE9mZnNldFRvVVRDO1xucHJvdG8ubG9jYWwgICAgICAgICAgICAgICAgPSBzZXRPZmZzZXRUb0xvY2FsO1xucHJvdG8ucGFyc2Vab25lICAgICAgICAgICAgPSBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldDtcbnByb3RvLmhhc0FsaWduZWRIb3VyT2Zmc2V0ID0gaGFzQWxpZ25lZEhvdXJPZmZzZXQ7XG5wcm90by5pc0RTVCAgICAgICAgICAgICAgICA9IGlzRGF5bGlnaHRTYXZpbmdUaW1lO1xucHJvdG8uaXNMb2NhbCAgICAgICAgICAgICAgPSBpc0xvY2FsO1xucHJvdG8uaXNVdGNPZmZzZXQgICAgICAgICAgPSBpc1V0Y09mZnNldDtcbnByb3RvLmlzVXRjICAgICAgICAgICAgICAgID0gaXNVdGM7XG5wcm90by5pc1VUQyAgICAgICAgICAgICAgICA9IGlzVXRjO1xuXG4vLyBUaW1lem9uZVxucHJvdG8uem9uZUFiYnIgPSBnZXRab25lQWJicjtcbnByb3RvLnpvbmVOYW1lID0gZ2V0Wm9uZU5hbWU7XG5cbi8vIERlcHJlY2F0aW9uc1xucHJvdG8uZGF0ZXMgID0gZGVwcmVjYXRlKCdkYXRlcyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgZGF0ZSBpbnN0ZWFkLicsIGdldFNldERheU9mTW9udGgpO1xucHJvdG8ubW9udGhzID0gZGVwcmVjYXRlKCdtb250aHMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbnRoIGluc3RlYWQnLCBnZXRTZXRNb250aCk7XG5wcm90by55ZWFycyAgPSBkZXByZWNhdGUoJ3llYXJzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSB5ZWFyIGluc3RlYWQnLCBnZXRTZXRZZWFyKTtcbnByb3RvLnpvbmUgICA9IGRlcHJlY2F0ZSgnbW9tZW50KCkuem9uZSBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50KCkudXRjT2Zmc2V0IGluc3RlYWQuIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3Mvem9uZS8nLCBnZXRTZXRab25lKTtcbnByb3RvLmlzRFNUU2hpZnRlZCA9IGRlcHJlY2F0ZSgnaXNEU1RTaGlmdGVkIGlzIGRlcHJlY2F0ZWQuIFNlZSBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL2RzdC1zaGlmdGVkLyBmb3IgbW9yZSBpbmZvcm1hdGlvbicsIGlzRGF5bGlnaHRTYXZpbmdUaW1lU2hpZnRlZCk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVVuaXggKGlucHV0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2FsKGlucHV0ICogMTAwMCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUluWm9uZSAoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cykucGFyc2Vab25lKCk7XG59XG5cbmZ1bmN0aW9uIHByZVBhcnNlUG9zdEZvcm1hdCAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZztcbn1cblxudmFyIHByb3RvJDEgPSBMb2NhbGUucHJvdG90eXBlO1xuXG5wcm90byQxLmNhbGVuZGFyICAgICAgICA9IGNhbGVuZGFyO1xucHJvdG8kMS5sb25nRGF0ZUZvcm1hdCAgPSBsb25nRGF0ZUZvcm1hdDtcbnByb3RvJDEuaW52YWxpZERhdGUgICAgID0gaW52YWxpZERhdGU7XG5wcm90byQxLm9yZGluYWwgICAgICAgICA9IG9yZGluYWw7XG5wcm90byQxLnByZXBhcnNlICAgICAgICA9IHByZVBhcnNlUG9zdEZvcm1hdDtcbnByb3RvJDEucG9zdGZvcm1hdCAgICAgID0gcHJlUGFyc2VQb3N0Rm9ybWF0O1xucHJvdG8kMS5yZWxhdGl2ZVRpbWUgICAgPSByZWxhdGl2ZVRpbWU7XG5wcm90byQxLnBhc3RGdXR1cmUgICAgICA9IHBhc3RGdXR1cmU7XG5wcm90byQxLnNldCAgICAgICAgICAgICA9IHNldDtcblxuLy8gTW9udGhcbnByb3RvJDEubW9udGhzICAgICAgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzO1xucHJvdG8kMS5tb250aHNTaG9ydCAgICAgICA9ICAgICAgICBsb2NhbGVNb250aHNTaG9ydDtcbnByb3RvJDEubW9udGhzUGFyc2UgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzUGFyc2U7XG5wcm90byQxLm1vbnRoc1JlZ2V4ICAgICAgID0gbW9udGhzUmVnZXg7XG5wcm90byQxLm1vbnRoc1Nob3J0UmVnZXggID0gbW9udGhzU2hvcnRSZWdleDtcblxuLy8gV2Vla1xucHJvdG8kMS53ZWVrID0gbG9jYWxlV2VlaztcbnByb3RvJDEuZmlyc3REYXlPZlllYXIgPSBsb2NhbGVGaXJzdERheU9mWWVhcjtcbnByb3RvJDEuZmlyc3REYXlPZldlZWsgPSBsb2NhbGVGaXJzdERheU9mV2VlaztcblxuLy8gRGF5IG9mIFdlZWtcbnByb3RvJDEud2Vla2RheXMgICAgICAgPSAgICAgICAgbG9jYWxlV2Vla2RheXM7XG5wcm90byQxLndlZWtkYXlzTWluICAgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzTWluO1xucHJvdG8kMS53ZWVrZGF5c1Nob3J0ICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c1Nob3J0O1xucHJvdG8kMS53ZWVrZGF5c1BhcnNlICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c1BhcnNlO1xuXG5wcm90byQxLndlZWtkYXlzUmVnZXggICAgICAgPSAgICAgICAgd2Vla2RheXNSZWdleDtcbnByb3RvJDEud2Vla2RheXNTaG9ydFJlZ2V4ICA9ICAgICAgICB3ZWVrZGF5c1Nob3J0UmVnZXg7XG5wcm90byQxLndlZWtkYXlzTWluUmVnZXggICAgPSAgICAgICAgd2Vla2RheXNNaW5SZWdleDtcblxuLy8gSG91cnNcbnByb3RvJDEuaXNQTSA9IGxvY2FsZUlzUE07XG5wcm90byQxLm1lcmlkaWVtID0gbG9jYWxlTWVyaWRpZW07XG5cbmZ1bmN0aW9uIGdldCQxIChmb3JtYXQsIGluZGV4LCBmaWVsZCwgc2V0dGVyKSB7XG4gICAgdmFyIGxvY2FsZSA9IGdldExvY2FsZSgpO1xuICAgIHZhciB1dGMgPSBjcmVhdGVVVEMoKS5zZXQoc2V0dGVyLCBpbmRleCk7XG4gICAgcmV0dXJuIGxvY2FsZVtmaWVsZF0odXRjLCBmb3JtYXQpO1xufVxuXG5mdW5jdGlvbiBsaXN0TW9udGhzSW1wbCAoZm9ybWF0LCBpbmRleCwgZmllbGQpIHtcbiAgICBpZiAoaXNOdW1iZXIoZm9ybWF0KSkge1xuICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcblxuICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBnZXQkMShmb3JtYXQsIGluZGV4LCBmaWVsZCwgJ21vbnRoJyk7XG4gICAgfVxuXG4gICAgdmFyIGk7XG4gICAgdmFyIG91dCA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgIG91dFtpXSA9IGdldCQxKGZvcm1hdCwgaSwgZmllbGQsICdtb250aCcpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufVxuXG4vLyAoKVxuLy8gKDUpXG4vLyAoZm10LCA1KVxuLy8gKGZtdClcbi8vICh0cnVlKVxuLy8gKHRydWUsIDUpXG4vLyAodHJ1ZSwgZm10LCA1KVxuLy8gKHRydWUsIGZtdClcbmZ1bmN0aW9uIGxpc3RXZWVrZGF5c0ltcGwgKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgZmllbGQpIHtcbiAgICBpZiAodHlwZW9mIGxvY2FsZVNvcnRlZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGlmIChpc051bWJlcihmb3JtYXQpKSB7XG4gICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtYXQgPSBsb2NhbGVTb3J0ZWQ7XG4gICAgICAgIGluZGV4ID0gZm9ybWF0O1xuICAgICAgICBsb2NhbGVTb3J0ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoaXNOdW1iZXIoZm9ybWF0KSkge1xuICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XG4gICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XG4gICAgfVxuXG4gICAgdmFyIGxvY2FsZSA9IGdldExvY2FsZSgpLFxuICAgICAgICBzaGlmdCA9IGxvY2FsZVNvcnRlZCA/IGxvY2FsZS5fd2Vlay5kb3cgOiAwO1xuXG4gICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGdldCQxKGZvcm1hdCwgKGluZGV4ICsgc2hpZnQpICUgNywgZmllbGQsICdkYXknKTtcbiAgICB9XG5cbiAgICB2YXIgaTtcbiAgICB2YXIgb3V0ID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICBvdXRbaV0gPSBnZXQkMShmb3JtYXQsIChpICsgc2hpZnQpICUgNywgZmllbGQsICdkYXknKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gbGlzdE1vbnRocyAoZm9ybWF0LCBpbmRleCkge1xuICAgIHJldHVybiBsaXN0TW9udGhzSW1wbChmb3JtYXQsIGluZGV4LCAnbW9udGhzJyk7XG59XG5cbmZ1bmN0aW9uIGxpc3RNb250aHNTaG9ydCAoZm9ybWF0LCBpbmRleCkge1xuICAgIHJldHVybiBsaXN0TW9udGhzSW1wbChmb3JtYXQsIGluZGV4LCAnbW9udGhzU2hvcnQnKTtcbn1cblxuZnVuY3Rpb24gbGlzdFdlZWtkYXlzIChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgpIHtcbiAgICByZXR1cm4gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5cycpO1xufVxuXG5mdW5jdGlvbiBsaXN0V2Vla2RheXNTaG9ydCAobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4KSB7XG4gICAgcmV0dXJuIGxpc3RXZWVrZGF5c0ltcGwobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4LCAnd2Vla2RheXNTaG9ydCcpO1xufVxuXG5mdW5jdGlvbiBsaXN0V2Vla2RheXNNaW4gKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xuICAgIHJldHVybiBsaXN0V2Vla2RheXNJbXBsKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzTWluJyk7XG59XG5cbmdldFNldEdsb2JhbExvY2FsZSgnZW4nLCB7XG4gICAgZGF5T2ZNb250aE9yZGluYWxQYXJzZTogL1xcZHsxLDJ9KHRofHN0fG5kfHJkKS8sXG4gICAgb3JkaW5hbCA6IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgdmFyIGIgPSBudW1iZXIgJSAxMCxcbiAgICAgICAgICAgIG91dHB1dCA9ICh0b0ludChudW1iZXIgJSAxMDAgLyAxMCkgPT09IDEpID8gJ3RoJyA6XG4gICAgICAgICAgICAoYiA9PT0gMSkgPyAnc3QnIDpcbiAgICAgICAgICAgIChiID09PSAyKSA/ICduZCcgOlxuICAgICAgICAgICAgKGIgPT09IDMpID8gJ3JkJyA6ICd0aCc7XG4gICAgICAgIHJldHVybiBudW1iZXIgKyBvdXRwdXQ7XG4gICAgfVxufSk7XG5cbi8vIFNpZGUgZWZmZWN0IGltcG9ydHNcbmhvb2tzLmxhbmcgPSBkZXByZWNhdGUoJ21vbWVudC5sYW5nIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb21lbnQubG9jYWxlIGluc3RlYWQuJywgZ2V0U2V0R2xvYmFsTG9jYWxlKTtcbmhvb2tzLmxhbmdEYXRhID0gZGVwcmVjYXRlKCdtb21lbnQubGFuZ0RhdGEgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGVEYXRhIGluc3RlYWQuJywgZ2V0TG9jYWxlKTtcblxudmFyIG1hdGhBYnMgPSBNYXRoLmFicztcblxuZnVuY3Rpb24gYWJzICgpIHtcbiAgICB2YXIgZGF0YSAgICAgICAgICAgPSB0aGlzLl9kYXRhO1xuXG4gICAgdGhpcy5fbWlsbGlzZWNvbmRzID0gbWF0aEFicyh0aGlzLl9taWxsaXNlY29uZHMpO1xuICAgIHRoaXMuX2RheXMgICAgICAgICA9IG1hdGhBYnModGhpcy5fZGF5cyk7XG4gICAgdGhpcy5fbW9udGhzICAgICAgID0gbWF0aEFicyh0aGlzLl9tb250aHMpO1xuXG4gICAgZGF0YS5taWxsaXNlY29uZHMgID0gbWF0aEFicyhkYXRhLm1pbGxpc2Vjb25kcyk7XG4gICAgZGF0YS5zZWNvbmRzICAgICAgID0gbWF0aEFicyhkYXRhLnNlY29uZHMpO1xuICAgIGRhdGEubWludXRlcyAgICAgICA9IG1hdGhBYnMoZGF0YS5taW51dGVzKTtcbiAgICBkYXRhLmhvdXJzICAgICAgICAgPSBtYXRoQWJzKGRhdGEuaG91cnMpO1xuICAgIGRhdGEubW9udGhzICAgICAgICA9IG1hdGhBYnMoZGF0YS5tb250aHMpO1xuICAgIGRhdGEueWVhcnMgICAgICAgICA9IG1hdGhBYnMoZGF0YS55ZWFycyk7XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gYWRkU3VidHJhY3QkMSAoZHVyYXRpb24sIGlucHV0LCB2YWx1ZSwgZGlyZWN0aW9uKSB7XG4gICAgdmFyIG90aGVyID0gY3JlYXRlRHVyYXRpb24oaW5wdXQsIHZhbHVlKTtcblxuICAgIGR1cmF0aW9uLl9taWxsaXNlY29uZHMgKz0gZGlyZWN0aW9uICogb3RoZXIuX21pbGxpc2Vjb25kcztcbiAgICBkdXJhdGlvbi5fZGF5cyAgICAgICAgICs9IGRpcmVjdGlvbiAqIG90aGVyLl9kYXlzO1xuICAgIGR1cmF0aW9uLl9tb250aHMgICAgICAgKz0gZGlyZWN0aW9uICogb3RoZXIuX21vbnRocztcblxuICAgIHJldHVybiBkdXJhdGlvbi5fYnViYmxlKCk7XG59XG5cbi8vIHN1cHBvcnRzIG9ubHkgMi4wLXN0eWxlIGFkZCgxLCAncycpIG9yIGFkZChkdXJhdGlvbilcbmZ1bmN0aW9uIGFkZCQxIChpbnB1dCwgdmFsdWUpIHtcbiAgICByZXR1cm4gYWRkU3VidHJhY3QkMSh0aGlzLCBpbnB1dCwgdmFsdWUsIDEpO1xufVxuXG4vLyBzdXBwb3J0cyBvbmx5IDIuMC1zdHlsZSBzdWJ0cmFjdCgxLCAncycpIG9yIHN1YnRyYWN0KGR1cmF0aW9uKVxuZnVuY3Rpb24gc3VidHJhY3QkMSAoaW5wdXQsIHZhbHVlKSB7XG4gICAgcmV0dXJuIGFkZFN1YnRyYWN0JDEodGhpcywgaW5wdXQsIHZhbHVlLCAtMSk7XG59XG5cbmZ1bmN0aW9uIGFic0NlaWwgKG51bWJlcikge1xuICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG51bWJlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYnViYmxlICgpIHtcbiAgICB2YXIgbWlsbGlzZWNvbmRzID0gdGhpcy5fbWlsbGlzZWNvbmRzO1xuICAgIHZhciBkYXlzICAgICAgICAgPSB0aGlzLl9kYXlzO1xuICAgIHZhciBtb250aHMgICAgICAgPSB0aGlzLl9tb250aHM7XG4gICAgdmFyIGRhdGEgICAgICAgICA9IHRoaXMuX2RhdGE7XG4gICAgdmFyIHNlY29uZHMsIG1pbnV0ZXMsIGhvdXJzLCB5ZWFycywgbW9udGhzRnJvbURheXM7XG5cbiAgICAvLyBpZiB3ZSBoYXZlIGEgbWl4IG9mIHBvc2l0aXZlIGFuZCBuZWdhdGl2ZSB2YWx1ZXMsIGJ1YmJsZSBkb3duIGZpcnN0XG4gICAgLy8gY2hlY2s6IGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8yMTY2XG4gICAgaWYgKCEoKG1pbGxpc2Vjb25kcyA+PSAwICYmIGRheXMgPj0gMCAmJiBtb250aHMgPj0gMCkgfHxcbiAgICAgICAgICAgIChtaWxsaXNlY29uZHMgPD0gMCAmJiBkYXlzIDw9IDAgJiYgbW9udGhzIDw9IDApKSkge1xuICAgICAgICBtaWxsaXNlY29uZHMgKz0gYWJzQ2VpbChtb250aHNUb0RheXMobW9udGhzKSArIGRheXMpICogODY0ZTU7XG4gICAgICAgIGRheXMgPSAwO1xuICAgICAgICBtb250aHMgPSAwO1xuICAgIH1cblxuICAgIC8vIFRoZSBmb2xsb3dpbmcgY29kZSBidWJibGVzIHVwIHZhbHVlcywgc2VlIHRoZSB0ZXN0cyBmb3JcbiAgICAvLyBleGFtcGxlcyBvZiB3aGF0IHRoYXQgbWVhbnMuXG4gICAgZGF0YS5taWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHMgJSAxMDAwO1xuXG4gICAgc2Vjb25kcyAgICAgICAgICAgPSBhYnNGbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcbiAgICBkYXRhLnNlY29uZHMgICAgICA9IHNlY29uZHMgJSA2MDtcblxuICAgIG1pbnV0ZXMgICAgICAgICAgID0gYWJzRmxvb3Ioc2Vjb25kcyAvIDYwKTtcbiAgICBkYXRhLm1pbnV0ZXMgICAgICA9IG1pbnV0ZXMgJSA2MDtcblxuICAgIGhvdXJzICAgICAgICAgICAgID0gYWJzRmxvb3IobWludXRlcyAvIDYwKTtcbiAgICBkYXRhLmhvdXJzICAgICAgICA9IGhvdXJzICUgMjQ7XG5cbiAgICBkYXlzICs9IGFic0Zsb29yKGhvdXJzIC8gMjQpO1xuXG4gICAgLy8gY29udmVydCBkYXlzIHRvIG1vbnRoc1xuICAgIG1vbnRoc0Zyb21EYXlzID0gYWJzRmxvb3IoZGF5c1RvTW9udGhzKGRheXMpKTtcbiAgICBtb250aHMgKz0gbW9udGhzRnJvbURheXM7XG4gICAgZGF5cyAtPSBhYnNDZWlsKG1vbnRoc1RvRGF5cyhtb250aHNGcm9tRGF5cykpO1xuXG4gICAgLy8gMTIgbW9udGhzIC0+IDEgeWVhclxuICAgIHllYXJzID0gYWJzRmxvb3IobW9udGhzIC8gMTIpO1xuICAgIG1vbnRocyAlPSAxMjtcblxuICAgIGRhdGEuZGF5cyAgID0gZGF5cztcbiAgICBkYXRhLm1vbnRocyA9IG1vbnRocztcbiAgICBkYXRhLnllYXJzICA9IHllYXJzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGRheXNUb01vbnRocyAoZGF5cykge1xuICAgIC8vIDQwMCB5ZWFycyBoYXZlIDE0NjA5NyBkYXlzICh0YWtpbmcgaW50byBhY2NvdW50IGxlYXAgeWVhciBydWxlcylcbiAgICAvLyA0MDAgeWVhcnMgaGF2ZSAxMiBtb250aHMgPT09IDQ4MDBcbiAgICByZXR1cm4gZGF5cyAqIDQ4MDAgLyAxNDYwOTc7XG59XG5cbmZ1bmN0aW9uIG1vbnRoc1RvRGF5cyAobW9udGhzKSB7XG4gICAgLy8gdGhlIHJldmVyc2Ugb2YgZGF5c1RvTW9udGhzXG4gICAgcmV0dXJuIG1vbnRocyAqIDE0NjA5NyAvIDQ4MDA7XG59XG5cbmZ1bmN0aW9uIGFzICh1bml0cykge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIE5hTjtcbiAgICB9XG4gICAgdmFyIGRheXM7XG4gICAgdmFyIG1vbnRocztcbiAgICB2YXIgbWlsbGlzZWNvbmRzID0gdGhpcy5fbWlsbGlzZWNvbmRzO1xuXG4gICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG5cbiAgICBpZiAodW5pdHMgPT09ICdtb250aCcgfHwgdW5pdHMgPT09ICd5ZWFyJykge1xuICAgICAgICBkYXlzICAgPSB0aGlzLl9kYXlzICAgKyBtaWxsaXNlY29uZHMgLyA4NjRlNTtcbiAgICAgICAgbW9udGhzID0gdGhpcy5fbW9udGhzICsgZGF5c1RvTW9udGhzKGRheXMpO1xuICAgICAgICByZXR1cm4gdW5pdHMgPT09ICdtb250aCcgPyBtb250aHMgOiBtb250aHMgLyAxMjtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBoYW5kbGUgbWlsbGlzZWNvbmRzIHNlcGFyYXRlbHkgYmVjYXVzZSBvZiBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyAoaXNzdWUgIzE4NjcpXG4gICAgICAgIGRheXMgPSB0aGlzLl9kYXlzICsgTWF0aC5yb3VuZChtb250aHNUb0RheXModGhpcy5fbW9udGhzKSk7XG4gICAgICAgIHN3aXRjaCAodW5pdHMpIHtcbiAgICAgICAgICAgIGNhc2UgJ3dlZWsnICAgOiByZXR1cm4gZGF5cyAvIDcgICAgICsgbWlsbGlzZWNvbmRzIC8gNjA0OGU1O1xuICAgICAgICAgICAgY2FzZSAnZGF5JyAgICA6IHJldHVybiBkYXlzICAgICAgICAgKyBtaWxsaXNlY29uZHMgLyA4NjRlNTtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInICAgOiByZXR1cm4gZGF5cyAqIDI0ICAgICsgbWlsbGlzZWNvbmRzIC8gMzZlNTtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZScgOiByZXR1cm4gZGF5cyAqIDE0NDAgICsgbWlsbGlzZWNvbmRzIC8gNmU0O1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJyA6IHJldHVybiBkYXlzICogODY0MDAgKyBtaWxsaXNlY29uZHMgLyAxMDAwO1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vciBwcmV2ZW50cyBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyBoZXJlXG4gICAgICAgICAgICBjYXNlICdtaWxsaXNlY29uZCc6IHJldHVybiBNYXRoLmZsb29yKGRheXMgKiA4NjRlNSkgKyBtaWxsaXNlY29uZHM7XG4gICAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdW5pdCAnICsgdW5pdHMpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBUT0RPOiBVc2UgdGhpcy5hcygnbXMnKT9cbmZ1bmN0aW9uIHZhbHVlT2YkMSAoKSB7XG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gTmFOO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgK1xuICAgICAgICB0aGlzLl9kYXlzICogODY0ZTUgK1xuICAgICAgICAodGhpcy5fbW9udGhzICUgMTIpICogMjU5MmU2ICtcbiAgICAgICAgdG9JbnQodGhpcy5fbW9udGhzIC8gMTIpICogMzE1MzZlNlxuICAgICk7XG59XG5cbmZ1bmN0aW9uIG1ha2VBcyAoYWxpYXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcyhhbGlhcyk7XG4gICAgfTtcbn1cblxudmFyIGFzTWlsbGlzZWNvbmRzID0gbWFrZUFzKCdtcycpO1xudmFyIGFzU2Vjb25kcyAgICAgID0gbWFrZUFzKCdzJyk7XG52YXIgYXNNaW51dGVzICAgICAgPSBtYWtlQXMoJ20nKTtcbnZhciBhc0hvdXJzICAgICAgICA9IG1ha2VBcygnaCcpO1xudmFyIGFzRGF5cyAgICAgICAgID0gbWFrZUFzKCdkJyk7XG52YXIgYXNXZWVrcyAgICAgICAgPSBtYWtlQXMoJ3cnKTtcbnZhciBhc01vbnRocyAgICAgICA9IG1ha2VBcygnTScpO1xudmFyIGFzWWVhcnMgICAgICAgID0gbWFrZUFzKCd5Jyk7XG5cbmZ1bmN0aW9uIGdldCQyICh1bml0cykge1xuICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXNbdW5pdHMgKyAncyddKCkgOiBOYU47XG59XG5cbmZ1bmN0aW9uIG1ha2VHZXR0ZXIobmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMuX2RhdGFbbmFtZV0gOiBOYU47XG4gICAgfTtcbn1cblxudmFyIG1pbGxpc2Vjb25kcyA9IG1ha2VHZXR0ZXIoJ21pbGxpc2Vjb25kcycpO1xudmFyIHNlY29uZHMgICAgICA9IG1ha2VHZXR0ZXIoJ3NlY29uZHMnKTtcbnZhciBtaW51dGVzICAgICAgPSBtYWtlR2V0dGVyKCdtaW51dGVzJyk7XG52YXIgaG91cnMgICAgICAgID0gbWFrZUdldHRlcignaG91cnMnKTtcbnZhciBkYXlzICAgICAgICAgPSBtYWtlR2V0dGVyKCdkYXlzJyk7XG52YXIgbW9udGhzICAgICAgID0gbWFrZUdldHRlcignbW9udGhzJyk7XG52YXIgeWVhcnMgICAgICAgID0gbWFrZUdldHRlcigneWVhcnMnKTtcblxuZnVuY3Rpb24gd2Vla3MgKCkge1xuICAgIHJldHVybiBhYnNGbG9vcih0aGlzLmRheXMoKSAvIDcpO1xufVxuXG52YXIgcm91bmQgPSBNYXRoLnJvdW5kO1xudmFyIHRocmVzaG9sZHMgPSB7XG4gICAgc3M6IDQ0LCAgICAgICAgIC8vIGEgZmV3IHNlY29uZHMgdG8gc2Vjb25kc1xuICAgIHMgOiA0NSwgICAgICAgICAvLyBzZWNvbmRzIHRvIG1pbnV0ZVxuICAgIG0gOiA0NSwgICAgICAgICAvLyBtaW51dGVzIHRvIGhvdXJcbiAgICBoIDogMjIsICAgICAgICAgLy8gaG91cnMgdG8gZGF5XG4gICAgZCA6IDI2LCAgICAgICAgIC8vIGRheXMgdG8gbW9udGhcbiAgICBNIDogMTEgICAgICAgICAgLy8gbW9udGhzIHRvIHllYXJcbn07XG5cbi8vIGhlbHBlciBmdW5jdGlvbiBmb3IgbW9tZW50LmZuLmZyb20sIG1vbWVudC5mbi5mcm9tTm93LCBhbmQgbW9tZW50LmR1cmF0aW9uLmZuLmh1bWFuaXplXG5mdW5jdGlvbiBzdWJzdGl0dXRlVGltZUFnbyhzdHJpbmcsIG51bWJlciwgd2l0aG91dFN1ZmZpeCwgaXNGdXR1cmUsIGxvY2FsZSkge1xuICAgIHJldHVybiBsb2NhbGUucmVsYXRpdmVUaW1lKG51bWJlciB8fCAxLCAhIXdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpO1xufVxuXG5mdW5jdGlvbiByZWxhdGl2ZVRpbWUkMSAocG9zTmVnRHVyYXRpb24sIHdpdGhvdXRTdWZmaXgsIGxvY2FsZSkge1xuICAgIHZhciBkdXJhdGlvbiA9IGNyZWF0ZUR1cmF0aW9uKHBvc05lZ0R1cmF0aW9uKS5hYnMoKTtcbiAgICB2YXIgc2Vjb25kcyAgPSByb3VuZChkdXJhdGlvbi5hcygncycpKTtcbiAgICB2YXIgbWludXRlcyAgPSByb3VuZChkdXJhdGlvbi5hcygnbScpKTtcbiAgICB2YXIgaG91cnMgICAgPSByb3VuZChkdXJhdGlvbi5hcygnaCcpKTtcbiAgICB2YXIgZGF5cyAgICAgPSByb3VuZChkdXJhdGlvbi5hcygnZCcpKTtcbiAgICB2YXIgbW9udGhzICAgPSByb3VuZChkdXJhdGlvbi5hcygnTScpKTtcbiAgICB2YXIgeWVhcnMgICAgPSByb3VuZChkdXJhdGlvbi5hcygneScpKTtcblxuICAgIHZhciBhID0gc2Vjb25kcyA8PSB0aHJlc2hvbGRzLnNzICYmIFsncycsIHNlY29uZHNdICB8fFxuICAgICAgICAgICAgc2Vjb25kcyA8IHRocmVzaG9sZHMucyAgICYmIFsnc3MnLCBzZWNvbmRzXSB8fFxuICAgICAgICAgICAgbWludXRlcyA8PSAxICAgICAgICAgICAgICYmIFsnbSddICAgICAgICAgICB8fFxuICAgICAgICAgICAgbWludXRlcyA8IHRocmVzaG9sZHMubSAgICYmIFsnbW0nLCBtaW51dGVzXSB8fFxuICAgICAgICAgICAgaG91cnMgICA8PSAxICAgICAgICAgICAgICYmIFsnaCddICAgICAgICAgICB8fFxuICAgICAgICAgICAgaG91cnMgICA8IHRocmVzaG9sZHMuaCAgICYmIFsnaGgnLCBob3Vyc10gICB8fFxuICAgICAgICAgICAgZGF5cyAgICA8PSAxICAgICAgICAgICAgICYmIFsnZCddICAgICAgICAgICB8fFxuICAgICAgICAgICAgZGF5cyAgICA8IHRocmVzaG9sZHMuZCAgICYmIFsnZGQnLCBkYXlzXSAgICB8fFxuICAgICAgICAgICAgbW9udGhzICA8PSAxICAgICAgICAgICAgICYmIFsnTSddICAgICAgICAgICB8fFxuICAgICAgICAgICAgbW9udGhzICA8IHRocmVzaG9sZHMuTSAgICYmIFsnTU0nLCBtb250aHNdICB8fFxuICAgICAgICAgICAgeWVhcnMgICA8PSAxICAgICAgICAgICAgICYmIFsneSddICAgICAgICAgICB8fCBbJ3l5JywgeWVhcnNdO1xuXG4gICAgYVsyXSA9IHdpdGhvdXRTdWZmaXg7XG4gICAgYVszXSA9ICtwb3NOZWdEdXJhdGlvbiA+IDA7XG4gICAgYVs0XSA9IGxvY2FsZTtcbiAgICByZXR1cm4gc3Vic3RpdHV0ZVRpbWVBZ28uYXBwbHkobnVsbCwgYSk7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBzZXQgdGhlIHJvdW5kaW5nIGZ1bmN0aW9uIGZvciByZWxhdGl2ZSB0aW1lIHN0cmluZ3NcbmZ1bmN0aW9uIGdldFNldFJlbGF0aXZlVGltZVJvdW5kaW5nIChyb3VuZGluZ0Z1bmN0aW9uKSB7XG4gICAgaWYgKHJvdW5kaW5nRnVuY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gcm91bmQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2Yocm91bmRpbmdGdW5jdGlvbikgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcm91bmQgPSByb3VuZGluZ0Z1bmN0aW9uO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGFsbG93cyB5b3UgdG8gc2V0IGEgdGhyZXNob2xkIGZvciByZWxhdGl2ZSB0aW1lIHN0cmluZ3NcbmZ1bmN0aW9uIGdldFNldFJlbGF0aXZlVGltZVRocmVzaG9sZCAodGhyZXNob2xkLCBsaW1pdCkge1xuICAgIGlmICh0aHJlc2hvbGRzW3RocmVzaG9sZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChsaW1pdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aHJlc2hvbGRzW3RocmVzaG9sZF07XG4gICAgfVxuICAgIHRocmVzaG9sZHNbdGhyZXNob2xkXSA9IGxpbWl0O1xuICAgIGlmICh0aHJlc2hvbGQgPT09ICdzJykge1xuICAgICAgICB0aHJlc2hvbGRzLnNzID0gbGltaXQgLSAxO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaHVtYW5pemUgKHdpdGhTdWZmaXgpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgIH1cblxuICAgIHZhciBsb2NhbGUgPSB0aGlzLmxvY2FsZURhdGEoKTtcbiAgICB2YXIgb3V0cHV0ID0gcmVsYXRpdmVUaW1lJDEodGhpcywgIXdpdGhTdWZmaXgsIGxvY2FsZSk7XG5cbiAgICBpZiAod2l0aFN1ZmZpeCkge1xuICAgICAgICBvdXRwdXQgPSBsb2NhbGUucGFzdEZ1dHVyZSgrdGhpcywgb3V0cHV0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9jYWxlLnBvc3Rmb3JtYXQob3V0cHV0KTtcbn1cblxudmFyIGFicyQxID0gTWF0aC5hYnM7XG5cbmZ1bmN0aW9uIHRvSVNPU3RyaW5nJDEoKSB7XG4gICAgLy8gZm9yIElTTyBzdHJpbmdzIHdlIGRvIG5vdCB1c2UgdGhlIG5vcm1hbCBidWJibGluZyBydWxlczpcbiAgICAvLyAgKiBtaWxsaXNlY29uZHMgYnViYmxlIHVwIHVudGlsIHRoZXkgYmVjb21lIGhvdXJzXG4gICAgLy8gICogZGF5cyBkbyBub3QgYnViYmxlIGF0IGFsbFxuICAgIC8vICAqIG1vbnRocyBidWJibGUgdXAgdW50aWwgdGhleSBiZWNvbWUgeWVhcnNcbiAgICAvLyBUaGlzIGlzIGJlY2F1c2UgdGhlcmUgaXMgbm8gY29udGV4dC1mcmVlIGNvbnZlcnNpb24gYmV0d2VlbiBob3VycyBhbmQgZGF5c1xuICAgIC8vICh0aGluayBvZiBjbG9jayBjaGFuZ2VzKVxuICAgIC8vIGFuZCBhbHNvIG5vdCBiZXR3ZWVuIGRheXMgYW5kIG1vbnRocyAoMjgtMzEgZGF5cyBwZXIgbW9udGgpXG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICB9XG5cbiAgICB2YXIgc2Vjb25kcyA9IGFicyQxKHRoaXMuX21pbGxpc2Vjb25kcykgLyAxMDAwO1xuICAgIHZhciBkYXlzICAgICAgICAgPSBhYnMkMSh0aGlzLl9kYXlzKTtcbiAgICB2YXIgbW9udGhzICAgICAgID0gYWJzJDEodGhpcy5fbW9udGhzKTtcbiAgICB2YXIgbWludXRlcywgaG91cnMsIHllYXJzO1xuXG4gICAgLy8gMzYwMCBzZWNvbmRzIC0+IDYwIG1pbnV0ZXMgLT4gMSBob3VyXG4gICAgbWludXRlcyAgICAgICAgICAgPSBhYnNGbG9vcihzZWNvbmRzIC8gNjApO1xuICAgIGhvdXJzICAgICAgICAgICAgID0gYWJzRmxvb3IobWludXRlcyAvIDYwKTtcbiAgICBzZWNvbmRzICU9IDYwO1xuICAgIG1pbnV0ZXMgJT0gNjA7XG5cbiAgICAvLyAxMiBtb250aHMgLT4gMSB5ZWFyXG4gICAgeWVhcnMgID0gYWJzRmxvb3IobW9udGhzIC8gMTIpO1xuICAgIG1vbnRocyAlPSAxMjtcblxuXG4gICAgLy8gaW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2RvcmRpbGxlL21vbWVudC1pc29kdXJhdGlvbi9ibG9iL21hc3Rlci9tb21lbnQuaXNvZHVyYXRpb24uanNcbiAgICB2YXIgWSA9IHllYXJzO1xuICAgIHZhciBNID0gbW9udGhzO1xuICAgIHZhciBEID0gZGF5cztcbiAgICB2YXIgaCA9IGhvdXJzO1xuICAgIHZhciBtID0gbWludXRlcztcbiAgICB2YXIgcyA9IHNlY29uZHM7XG4gICAgdmFyIHRvdGFsID0gdGhpcy5hc1NlY29uZHMoKTtcblxuICAgIGlmICghdG90YWwpIHtcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgc2FtZSBhcyBDIydzIChOb2RhKSBhbmQgcHl0aG9uIChpc29kYXRlKS4uLlxuICAgICAgICAvLyBidXQgbm90IG90aGVyIEpTIChnb29nLmRhdGUpXG4gICAgICAgIHJldHVybiAnUDBEJztcbiAgICB9XG5cbiAgICByZXR1cm4gKHRvdGFsIDwgMCA/ICctJyA6ICcnKSArXG4gICAgICAgICdQJyArXG4gICAgICAgIChZID8gWSArICdZJyA6ICcnKSArXG4gICAgICAgIChNID8gTSArICdNJyA6ICcnKSArXG4gICAgICAgIChEID8gRCArICdEJyA6ICcnKSArXG4gICAgICAgICgoaCB8fCBtIHx8IHMpID8gJ1QnIDogJycpICtcbiAgICAgICAgKGggPyBoICsgJ0gnIDogJycpICtcbiAgICAgICAgKG0gPyBtICsgJ00nIDogJycpICtcbiAgICAgICAgKHMgPyBzICsgJ1MnIDogJycpO1xufVxuXG52YXIgcHJvdG8kMiA9IER1cmF0aW9uLnByb3RvdHlwZTtcblxucHJvdG8kMi5pc1ZhbGlkICAgICAgICA9IGlzVmFsaWQkMTtcbnByb3RvJDIuYWJzICAgICAgICAgICAgPSBhYnM7XG5wcm90byQyLmFkZCAgICAgICAgICAgID0gYWRkJDE7XG5wcm90byQyLnN1YnRyYWN0ICAgICAgID0gc3VidHJhY3QkMTtcbnByb3RvJDIuYXMgICAgICAgICAgICAgPSBhcztcbnByb3RvJDIuYXNNaWxsaXNlY29uZHMgPSBhc01pbGxpc2Vjb25kcztcbnByb3RvJDIuYXNTZWNvbmRzICAgICAgPSBhc1NlY29uZHM7XG5wcm90byQyLmFzTWludXRlcyAgICAgID0gYXNNaW51dGVzO1xucHJvdG8kMi5hc0hvdXJzICAgICAgICA9IGFzSG91cnM7XG5wcm90byQyLmFzRGF5cyAgICAgICAgID0gYXNEYXlzO1xucHJvdG8kMi5hc1dlZWtzICAgICAgICA9IGFzV2Vla3M7XG5wcm90byQyLmFzTW9udGhzICAgICAgID0gYXNNb250aHM7XG5wcm90byQyLmFzWWVhcnMgICAgICAgID0gYXNZZWFycztcbnByb3RvJDIudmFsdWVPZiAgICAgICAgPSB2YWx1ZU9mJDE7XG5wcm90byQyLl9idWJibGUgICAgICAgID0gYnViYmxlO1xucHJvdG8kMi5nZXQgICAgICAgICAgICA9IGdldCQyO1xucHJvdG8kMi5taWxsaXNlY29uZHMgICA9IG1pbGxpc2Vjb25kcztcbnByb3RvJDIuc2Vjb25kcyAgICAgICAgPSBzZWNvbmRzO1xucHJvdG8kMi5taW51dGVzICAgICAgICA9IG1pbnV0ZXM7XG5wcm90byQyLmhvdXJzICAgICAgICAgID0gaG91cnM7XG5wcm90byQyLmRheXMgICAgICAgICAgID0gZGF5cztcbnByb3RvJDIud2Vla3MgICAgICAgICAgPSB3ZWVrcztcbnByb3RvJDIubW9udGhzICAgICAgICAgPSBtb250aHM7XG5wcm90byQyLnllYXJzICAgICAgICAgID0geWVhcnM7XG5wcm90byQyLmh1bWFuaXplICAgICAgID0gaHVtYW5pemU7XG5wcm90byQyLnRvSVNPU3RyaW5nICAgID0gdG9JU09TdHJpbmckMTtcbnByb3RvJDIudG9TdHJpbmcgICAgICAgPSB0b0lTT1N0cmluZyQxO1xucHJvdG8kMi50b0pTT04gICAgICAgICA9IHRvSVNPU3RyaW5nJDE7XG5wcm90byQyLmxvY2FsZSAgICAgICAgID0gbG9jYWxlO1xucHJvdG8kMi5sb2NhbGVEYXRhICAgICA9IGxvY2FsZURhdGE7XG5cbi8vIERlcHJlY2F0aW9uc1xucHJvdG8kMi50b0lzb1N0cmluZyA9IGRlcHJlY2F0ZSgndG9Jc29TdHJpbmcoKSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIHRvSVNPU3RyaW5nKCkgaW5zdGVhZCAobm90aWNlIHRoZSBjYXBpdGFscyknLCB0b0lTT1N0cmluZyQxKTtcbnByb3RvJDIubGFuZyA9IGxhbmc7XG5cbi8vIFNpZGUgZWZmZWN0IGltcG9ydHNcblxuLy8gRk9STUFUVElOR1xuXG5hZGRGb3JtYXRUb2tlbignWCcsIDAsIDAsICd1bml4Jyk7XG5hZGRGb3JtYXRUb2tlbigneCcsIDAsIDAsICd2YWx1ZU9mJyk7XG5cbi8vIFBBUlNJTkdcblxuYWRkUmVnZXhUb2tlbigneCcsIG1hdGNoU2lnbmVkKTtcbmFkZFJlZ2V4VG9rZW4oJ1gnLCBtYXRjaFRpbWVzdGFtcCk7XG5hZGRQYXJzZVRva2VuKCdYJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgY29uZmlnLl9kID0gbmV3IERhdGUocGFyc2VGbG9hdChpbnB1dCwgMTApICogMTAwMCk7XG59KTtcbmFkZFBhcnNlVG9rZW4oJ3gnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSh0b0ludChpbnB1dCkpO1xufSk7XG5cbi8vIFNpZGUgZWZmZWN0IGltcG9ydHNcblxuXG5ob29rcy52ZXJzaW9uID0gJzIuMTguMSc7XG5cbnNldEhvb2tDYWxsYmFjayhjcmVhdGVMb2NhbCk7XG5cbmhvb2tzLmZuICAgICAgICAgICAgICAgICAgICA9IHByb3RvO1xuaG9va3MubWluICAgICAgICAgICAgICAgICAgID0gbWluO1xuaG9va3MubWF4ICAgICAgICAgICAgICAgICAgID0gbWF4O1xuaG9va3Mubm93ICAgICAgICAgICAgICAgICAgID0gbm93O1xuaG9va3MudXRjICAgICAgICAgICAgICAgICAgID0gY3JlYXRlVVRDO1xuaG9va3MudW5peCAgICAgICAgICAgICAgICAgID0gY3JlYXRlVW5peDtcbmhvb2tzLm1vbnRocyAgICAgICAgICAgICAgICA9IGxpc3RNb250aHM7XG5ob29rcy5pc0RhdGUgICAgICAgICAgICAgICAgPSBpc0RhdGU7XG5ob29rcy5sb2NhbGUgICAgICAgICAgICAgICAgPSBnZXRTZXRHbG9iYWxMb2NhbGU7XG5ob29rcy5pbnZhbGlkICAgICAgICAgICAgICAgPSBjcmVhdGVJbnZhbGlkO1xuaG9va3MuZHVyYXRpb24gICAgICAgICAgICAgID0gY3JlYXRlRHVyYXRpb247XG5ob29rcy5pc01vbWVudCAgICAgICAgICAgICAgPSBpc01vbWVudDtcbmhvb2tzLndlZWtkYXlzICAgICAgICAgICAgICA9IGxpc3RXZWVrZGF5cztcbmhvb2tzLnBhcnNlWm9uZSAgICAgICAgICAgICA9IGNyZWF0ZUluWm9uZTtcbmhvb2tzLmxvY2FsZURhdGEgICAgICAgICAgICA9IGdldExvY2FsZTtcbmhvb2tzLmlzRHVyYXRpb24gICAgICAgICAgICA9IGlzRHVyYXRpb247XG5ob29rcy5tb250aHNTaG9ydCAgICAgICAgICAgPSBsaXN0TW9udGhzU2hvcnQ7XG5ob29rcy53ZWVrZGF5c01pbiAgICAgICAgICAgPSBsaXN0V2Vla2RheXNNaW47XG5ob29rcy5kZWZpbmVMb2NhbGUgICAgICAgICAgPSBkZWZpbmVMb2NhbGU7XG5ob29rcy51cGRhdGVMb2NhbGUgICAgICAgICAgPSB1cGRhdGVMb2NhbGU7XG5ob29rcy5sb2NhbGVzICAgICAgICAgICAgICAgPSBsaXN0TG9jYWxlcztcbmhvb2tzLndlZWtkYXlzU2hvcnQgICAgICAgICA9IGxpc3RXZWVrZGF5c1Nob3J0O1xuaG9va3Mubm9ybWFsaXplVW5pdHMgICAgICAgID0gbm9ybWFsaXplVW5pdHM7XG5ob29rcy5yZWxhdGl2ZVRpbWVSb3VuZGluZyA9IGdldFNldFJlbGF0aXZlVGltZVJvdW5kaW5nO1xuaG9va3MucmVsYXRpdmVUaW1lVGhyZXNob2xkID0gZ2V0U2V0UmVsYXRpdmVUaW1lVGhyZXNob2xkO1xuaG9va3MuY2FsZW5kYXJGb3JtYXQgICAgICAgID0gZ2V0Q2FsZW5kYXJGb3JtYXQ7XG5ob29rcy5wcm90b3R5cGUgICAgICAgICAgICAgPSBwcm90bztcblxucmV0dXJuIGhvb2tzO1xuXG59KSkpO1xuIiwiXG52YXIgb3B0aW9ucyA9IGV4cG9ydHMub3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpO1xuXG5leHBvcnRzLnBhcnNlciA9IHJlcXVpcmUoJy4vcGFyc2Vycy9wYXJzZXInKTtcbmV4cG9ydHMucmVmaW5lciA9IHJlcXVpcmUoJy4vcmVmaW5lcnMvcmVmaW5lcicpO1xuXG5leHBvcnRzLlBhcnNlciA9IGV4cG9ydHMucGFyc2VyLlBhcnNlcjtcbmV4cG9ydHMuUmVmaW5lciA9IGV4cG9ydHMucmVmaW5lci5SZWZpbmVyO1xuZXhwb3J0cy5GaWx0ZXIgPSBleHBvcnRzLnJlZmluZXIuRmlsdGVyO1xuXG5leHBvcnRzLlBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xuZXhwb3J0cy5QYXJzZWRDb21wb25lbnRzID0gcmVxdWlyZSgnLi9yZXN1bHQnKS5QYXJzZWRDb21wb25lbnRzO1xuXG52YXIgQ2hyb25vID0gZnVuY3Rpb24ob3B0aW9uKSB7XG5cbiAgICBvcHRpb24gPSBvcHRpb24gfHwgZXhwb3J0cy5vcHRpb25zLmNhc3VhbE9wdGlvbigpO1xuXG4gICAgdGhpcy5vcHRpb24gPSBvcHRpb247XG4gICAgdGhpcy5wYXJzZXJzID0gbmV3IE9iamVjdChvcHRpb24ucGFyc2Vycyk7XG4gICAgdGhpcy5yZWZpbmVycyA9IG5ldyBPYmplY3Qob3B0aW9uLnJlZmluZXJzKTtcbn07XG5cblxuQ2hyb25vLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHRleHQsIHJlZkRhdGUsIG9wdCkge1xuXG4gICAgcmVmRGF0ZSA9IHJlZkRhdGUgfHwgbmV3IERhdGUoKTtcbiAgICBvcHQgPSBvcHQgfHwge307XG5cbiAgICB2YXIgYWxsUmVzdWx0cyA9IFtdO1xuXG4gICAgdGhpcy5wYXJzZXJzLmZvckVhY2goZnVuY3Rpb24gKHBhcnNlcikge1xuICAgICAgICB2YXIgcmVzdWx0cyA9IHBhcnNlci5leGVjdXRlKHRleHQsIHJlZkRhdGUsIG9wdCk7XG4gICAgICAgIGFsbFJlc3VsdHMgPSBhbGxSZXN1bHRzLmNvbmNhdChyZXN1bHRzKTtcbiAgICB9KTtcblxuICAgIGFsbFJlc3VsdHMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLmluZGV4IC0gYi5pbmRleDtcbiAgICB9KTtcblxuICAgIHRoaXMucmVmaW5lcnMuZm9yRWFjaChmdW5jdGlvbiAocmVmaW5lcikge1xuICAgICAgICBhbGxSZXN1bHRzID0gcmVmaW5lci5yZWZpbmUodGV4dCwgYWxsUmVzdWx0cywgb3B0KTtcbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gYWxsUmVzdWx0cztcbn07XG5cblxuQ2hyb25vLnByb3RvdHlwZS5wYXJzZURhdGUgPSBmdW5jdGlvbih0ZXh0LCByZWZEYXRlLCBvcHQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IHRoaXMucGFyc2UodGV4dCwgcmVmRGF0ZSwgb3B0KTtcbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiByZXN1bHRzWzBdLnN0YXJ0LmRhdGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnRzLkNocm9ubyA9IENocm9ubztcbmV4cG9ydHMuc3RyaWN0ID0gbmV3IENocm9ubyggb3B0aW9ucy5zdHJpY3RPcHRpb24oKSApO1xuZXhwb3J0cy5jYXN1YWwgPSBuZXcgQ2hyb25vKCBvcHRpb25zLmNhc3VhbE9wdGlvbigpICk7XG5cbmV4cG9ydHMuZW4gPSBuZXcgQ2hyb25vKCBvcHRpb25zLm1lcmdlT3B0aW9ucyhbXG4gICAgb3B0aW9ucy5lbi5jYXN1YWwsIG9wdGlvbnMuY29tbW9uUG9zdFByb2Nlc3NpbmddKSk7XG5cbmV4cG9ydHMuZW5fR0IgPSBuZXcgQ2hyb25vKCBvcHRpb25zLm1lcmdlT3B0aW9ucyhbXG4gICAgb3B0aW9ucy5lbl9HQi5jYXN1YWwsIG9wdGlvbnMuY29tbW9uUG9zdFByb2Nlc3NpbmddKSk7XG5cbmV4cG9ydHMuZGUgPSBuZXcgQ2hyb25vKCBvcHRpb25zLm1lcmdlT3B0aW9ucyhbXG4gICAgb3B0aW9ucy5kZS5jYXN1YWwsIG9wdGlvbnMuZW4sIG9wdGlvbnMuY29tbW9uUG9zdFByb2Nlc3NpbmddKSk7XG5cbmV4cG9ydHMuZXMgPSBuZXcgQ2hyb25vKCBvcHRpb25zLm1lcmdlT3B0aW9ucyhbXG4gICAgb3B0aW9ucy5lcy5jYXN1YWwsIG9wdGlvbnMuZW4sIG9wdGlvbnMuY29tbW9uUG9zdFByb2Nlc3NpbmddKSk7XG5cbmV4cG9ydHMuZnIgPSBuZXcgQ2hyb25vKCBvcHRpb25zLm1lcmdlT3B0aW9ucyhbXG4gICAgb3B0aW9ucy5mci5jYXN1YWwsIG9wdGlvbnMuZW4sIG9wdGlvbnMuY29tbW9uUG9zdFByb2Nlc3NpbmddKSk7XG5cbmV4cG9ydHMuamEgPSBuZXcgQ2hyb25vKCBvcHRpb25zLm1lcmdlT3B0aW9ucyhbIFxuICAgIG9wdGlvbnMuamEuY2FzdWFsLCBvcHRpb25zLmVuLCBvcHRpb25zLmNvbW1vblBvc3RQcm9jZXNzaW5nXSkpO1xuXG5cbmV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuY2FzdWFsLnBhcnNlLmFwcGx5KGV4cG9ydHMuY2FzdWFsLCBhcmd1bWVudHMpO1xufTtcblxuZXhwb3J0cy5wYXJzZURhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuY2FzdWFsLnBhcnNlRGF0ZS5hcHBseShleHBvcnRzLmNhc3VhbCwgYXJndW1lbnRzKTtcbn07XG5cblxuXG5cbiIsInZhciBwYXJzZXIgPSByZXF1aXJlKCcuL3BhcnNlcnMvcGFyc2VyJyk7XG52YXIgcmVmaW5lciA9IHJlcXVpcmUoJy4vcmVmaW5lcnMvcmVmaW5lcicpO1xuXG5cbmV4cG9ydHMubWVyZ2VPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICAgdmFyIGFkZGVkVHlwZXMgPSB7fTtcbiAgICB2YXIgbWVyZ2VkT3B0aW9uID0ge1xuICAgICAgICBwYXJzZXJzOiBbXSxcbiAgICAgICAgcmVmaW5lcnM6IFtdXG4gICAgfTtcblxuICAgIG9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAob3B0aW9uKSB7XG5cbiAgICAgICAgaWYgKG9wdGlvbi5jYWxsKSB7XG4gICAgICAgICAgICBvcHRpb24gPSBvcHRpb24uY2FsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbi5wYXJzZXJzKSB7XG4gICAgICAgICAgICBvcHRpb24ucGFyc2Vycy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhZGRlZFR5cGVzW3AuY29uc3RydWN0b3JdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlZE9wdGlvbi5wYXJzZXJzLnB1c2gocCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZGVkVHlwZXNbcC5jb25zdHJ1Y3Rvcl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbi5yZWZpbmVycykge1xuICAgICAgICAgICAgb3B0aW9uLnJlZmluZXJzLmZvckVhY2goZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFkZGVkVHlwZXNbci5jb25zdHJ1Y3Rvcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VkT3B0aW9uLnJlZmluZXJzLnB1c2gocik7XG4gICAgICAgICAgICAgICAgICAgIGFkZGVkVHlwZXNbci5jb25zdHJ1Y3Rvcl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWVyZ2VkT3B0aW9uO1xufTtcblxuXG5leHBvcnRzLmNvbW1vblBvc3RQcm9jZXNzaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVmaW5lcnM6IFtcbiAgICAgICAgICAgIC8vIFRoZXNlIHNob3VsZCBiZSBhZnRlciBhbGwgb3RoZXIgcmVmaW5lcnNcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLkV4dHJhY3RUaW1lem9uZU9mZnNldFJlZmluZXIoKSxcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLkV4dHJhY3RUaW1lem9uZUFiYnJSZWZpbmVyKCksXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5Vbmxpa2VseUZvcm1hdEZpbHRlcigpXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0cy5zdHJpY3RPcHRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0cmljdENvbmZpZyA9IHtcbiAgICAgICAgc3RyaWN0OiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGV4cG9ydHMubWVyZ2VPcHRpb25zKFtcbiAgICAgICAgZXhwb3J0cy5lbihzdHJpY3RDb25maWcpLFxuICAgICAgICBleHBvcnRzLmRlKHN0cmljdENvbmZpZyksXG4gICAgICAgIGV4cG9ydHMuZXMoc3RyaWN0Q29uZmlnKSxcbiAgICAgICAgZXhwb3J0cy5mcihzdHJpY3RDb25maWcpLFxuICAgICAgICBleHBvcnRzLmphKHN0cmljdENvbmZpZyksXG4gICAgICAgIGV4cG9ydHMuemgsXG4gICAgICAgIGV4cG9ydHMuY29tbW9uUG9zdFByb2Nlc3NpbmdcbiAgICBdKTtcbn07XG5cbmV4cG9ydHMuY2FzdWFsT3B0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBleHBvcnRzLm1lcmdlT3B0aW9ucyhbXG4gICAgICAgIGV4cG9ydHMuZW4uY2FzdWFsLFxuICAgICAgICAvLyBTb21lIEdlcm1hbiBhYmJyaXZpYXRlIG92ZXJsYXAgd2l0aCBjb21tb24gRW5nbGlzaFxuICAgICAgICBleHBvcnRzLmRlKHsgc3RyaWN0OiB0cnVlIH0pLCBcbiAgICAgICAgZXhwb3J0cy5lcy5jYXN1YWwsXG4gICAgICAgIGV4cG9ydHMuZnIuY2FzdWFsLFxuICAgICAgICBleHBvcnRzLmphLmNhc3VhbCxcbiAgICAgICAgZXhwb3J0cy56aCxcbiAgICAgICAgZXhwb3J0cy5jb21tb25Qb3N0UHJvY2Vzc2luZ1xuICAgIF0pO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnRzLmRlID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFyc2VyczogW1xuICAgICAgICAgICAgbmV3IHBhcnNlci5ERURlYWRsaW5lRm9ybWF0UGFyc2VyKGNvbmZpZyksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkRFTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyKGNvbmZpZyksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkRFTW9udGhOYW1lUGFyc2VyKGNvbmZpZyksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkRFU2xhc2hEYXRlRm9ybWF0UGFyc2VyKGNvbmZpZyksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkRFVGltZUFnb0Zvcm1hdFBhcnNlcihjb25maWcpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5ERVRpbWVFeHByZXNzaW9uUGFyc2VyKGNvbmZpZylcbiAgICAgICAgXSxcbiAgICAgICAgcmVmaW5lcnM6IFtcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLk92ZXJsYXBSZW1vdmFsUmVmaW5lcigpLFxuICAgICAgICAgICAgbmV3IHJlZmluZXIuRm9yd2FyZERhdGVSZWZpbmVyKCksXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5ERU1lcmdlRGF0ZVRpbWVSZWZpbmVyKCksXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5ERU1lcmdlRGF0ZVJhbmdlUmVmaW5lcigpXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLmRlLmNhc3VhbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcHRpb24gPSBleHBvcnRzLmRlKHtcbiAgICAgICAgc3RyaWN0OiBmYWxzZVxuICAgIH0pO1xuICAgIG9wdGlvbi5wYXJzZXJzLnVuc2hpZnQobmV3IHBhcnNlci5ERUNhc3VhbERhdGVQYXJzZXIoKSk7XG4gICAgb3B0aW9uLnBhcnNlcnMudW5zaGlmdChuZXcgcGFyc2VyLkRFV2Vla2RheVBhcnNlcigpKTtcbiAgICByZXR1cm4gb3B0aW9uO1xufTtcblxuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5leHBvcnRzLmVuID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFyc2VyczogW1xuICAgICAgICAgICAgbmV3IHBhcnNlci5FTklTT0Zvcm1hdFBhcnNlcihjb25maWcpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5FTkRlYWRsaW5lRm9ybWF0UGFyc2VyKGNvbmZpZyksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVOTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyKGNvbmZpZyksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVOTW9udGhOYW1lTWlkZGxlRW5kaWFuUGFyc2VyKGNvbmZpZyksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVOTW9udGhOYW1lUGFyc2VyKGNvbmZpZyksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVOU2xhc2hEYXRlRm9ybWF0UGFyc2VyKGNvbmZpZyksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVOU2xhc2hEYXRlRm9ybWF0U3RhcnRXaXRoWWVhclBhcnNlcihjb25maWcpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5FTlNsYXNoTW9udGhGb3JtYXRQYXJzZXIoY29uZmlnKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRU5UaW1lQWdvRm9ybWF0UGFyc2VyKGNvbmZpZyksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVOVGltZUV4cHJlc3Npb25QYXJzZXIoY29uZmlnKVxuICAgICAgICBdLFxuICAgICAgICByZWZpbmVyczogW1xuICAgICAgICAgICAgbmV3IHJlZmluZXIuT3ZlcmxhcFJlbW92YWxSZWZpbmVyKCksXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5Gb3J3YXJkRGF0ZVJlZmluZXIoKSxcblxuICAgICAgICAgICAgLy8gRW5nbGlzaFxuICAgICAgICAgICAgbmV3IHJlZmluZXIuRU5NZXJnZURhdGVUaW1lUmVmaW5lcigpLFxuICAgICAgICAgICAgbmV3IHJlZmluZXIuRU5NZXJnZURhdGVSYW5nZVJlZmluZXIoKSxcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLkVOUHJpb3JpdGl6ZVNwZWNpZmljRGF0ZVJlZmluZXIoKVxuICAgICAgICBdXG4gICAgfVxufTtcblxuZXhwb3J0cy5lbi5jYXN1YWwgPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgY29uZmlnLnN0cmljdCA9IGZhbHNlO1xuICAgIHZhciBvcHRpb24gPSBleHBvcnRzLmVuKGNvbmZpZyk7XG5cbiAgICAvLyBFTlxuICAgIG9wdGlvbi5wYXJzZXJzLnVuc2hpZnQobmV3IHBhcnNlci5FTkNhc3VhbERhdGVQYXJzZXIoKSk7XG4gICAgb3B0aW9uLnBhcnNlcnMudW5zaGlmdChuZXcgcGFyc2VyLkVOQ2FzdWFsVGltZVBhcnNlcigpKTtcbiAgICBvcHRpb24ucGFyc2Vycy51bnNoaWZ0KG5ldyBwYXJzZXIuRU5XZWVrZGF5UGFyc2VyKCkpO1xuICAgIG9wdGlvbi5wYXJzZXJzLnVuc2hpZnQobmV3IHBhcnNlci5FTlJlbGF0aXZlRGF0ZUZvcm1hdFBhcnNlcigpKTtcbiAgICByZXR1cm4gb3B0aW9uO1xufTtcblxuXG5leHBvcnRzLmVuX0dCID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgIGNvbmZpZy5saXR0bGVFbmRpYW4gPSB0cnVlO1xuICAgIHJldHVybiBleHBvcnRzLmVuKGNvbmZpZyk7XG59XG5cbmV4cG9ydHMuZW5fR0IuY2FzdWFsID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgIGNvbmZpZy5saXR0bGVFbmRpYW4gPSB0cnVlO1xuICAgIHJldHVybiBleHBvcnRzLmVuLmNhc3VhbChjb25maWcpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydHMuamEgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYXJzZXJzOiBbXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkpQU3RhbmRhcmRQYXJzZXIoKVxuICAgICAgICBdLFxuICAgICAgICByZWZpbmVyczogW1xuICAgICAgICAgICAgbmV3IHJlZmluZXIuT3ZlcmxhcFJlbW92YWxSZWZpbmVyKCksXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5Gb3J3YXJkRGF0ZVJlZmluZXIoKSxcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLkpQTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyKClcbiAgICAgICAgXVxuICAgIH1cbn07XG5cbmV4cG9ydHMuamEuY2FzdWFsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9wdGlvbiA9IGV4cG9ydHMuamEoKTtcbiAgICBvcHRpb24ucGFyc2Vycy51bnNoaWZ0KG5ldyBwYXJzZXIuSlBDYXN1YWxEYXRlUGFyc2VyKCkpO1xuICAgIHJldHVybiBvcHRpb247XG59O1xuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5leHBvcnRzLmVzID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFyc2VyczogW1xuICAgICAgICAgICAgbmV3IHBhcnNlci5FU1RpbWVBZ29Gb3JtYXRQYXJzZXIoY29uZmlnKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRVNEZWFkbGluZUZvcm1hdFBhcnNlcihjb25maWcpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5FU1RpbWVFeHByZXNzaW9uUGFyc2VyKGNvbmZpZyksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVTTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyKGNvbmZpZyksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkVTU2xhc2hEYXRlRm9ybWF0UGFyc2VyKGNvbmZpZylcbiAgICAgICAgXSxcbiAgICAgICAgcmVmaW5lcnM6IFtcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLk92ZXJsYXBSZW1vdmFsUmVmaW5lcigpLFxuICAgICAgICAgICAgbmV3IHJlZmluZXIuRm9yd2FyZERhdGVSZWZpbmVyKClcbiAgICAgICAgXVxuICAgIH1cbn07XG5cbmV4cG9ydHMuZXMuY2FzdWFsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9wdGlvbiA9IGV4cG9ydHMuZXMoeyBcbiAgICAgICAgc3RyaWN0OiBmYWxzZSBcbiAgICB9KTtcblxuICAgIG9wdGlvbi5wYXJzZXJzLnVuc2hpZnQobmV3IHBhcnNlci5FU0Nhc3VhbERhdGVQYXJzZXIoKSk7XG4gICAgb3B0aW9uLnBhcnNlcnMudW5zaGlmdChuZXcgcGFyc2VyLkVTV2Vla2RheVBhcnNlcigpKTtcbiAgICByZXR1cm4gb3B0aW9uO1xufTtcblxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydHMuZnIgPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYXJzZXJzOiBbXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkZSRGVhZGxpbmVGb3JtYXRQYXJzZXIoY29uZmlnKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRlJNb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXIoY29uZmlnKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRlJTbGFzaERhdGVGb3JtYXRQYXJzZXIoY29uZmlnKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuRlJUaW1lQWdvRm9ybWF0UGFyc2VyKGNvbmZpZyksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLkZSVGltZUV4cHJlc3Npb25QYXJzZXIoY29uZmlnKVxuICAgICAgICBdLFxuICAgICAgICByZWZpbmVyczogW1xuICAgICAgICAgICAgbmV3IHJlZmluZXIuT3ZlcmxhcFJlbW92YWxSZWZpbmVyKCksXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5Gb3J3YXJkRGF0ZVJlZmluZXIoKSxcbiAgICAgICAgICAgIG5ldyByZWZpbmVyLkZSTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyKCksXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5GUk1lcmdlRGF0ZVRpbWVSZWZpbmVyKClcbiAgICAgICAgXVxuICAgIH1cbn07XG5cbmV4cG9ydHMuZnIuY2FzdWFsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9wdGlvbiA9IGV4cG9ydHMuZnIoe1xuICAgICAgICBzdHJpY3Q6IGZhbHNlXG4gICAgfSk7XG5cbiAgICBvcHRpb24ucGFyc2Vycy51bnNoaWZ0KG5ldyBwYXJzZXIuRlJDYXN1YWxEYXRlUGFyc2VyKCkpO1xuICAgIG9wdGlvbi5wYXJzZXJzLnVuc2hpZnQobmV3IHBhcnNlci5GUldlZWtkYXlQYXJzZXIoKSk7XG4gICAgb3B0aW9uLnBhcnNlcnMudW5zaGlmdChuZXcgcGFyc2VyLkZSUmVsYXRpdmVEYXRlRm9ybWF0UGFyc2VyKCkpO1xuICAgIHJldHVybiBvcHRpb247XG59O1xuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0cy56aCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhcnNlcnM6IFtcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuWkhIYW50RGF0ZVBhcnNlcigpLFxuICAgICAgICAgICAgbmV3IHBhcnNlci5aSEhhbnRXZWVrZGF5UGFyc2VyKCksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLlpISGFudFRpbWVFeHByZXNzaW9uUGFyc2VyKCksXG4gICAgICAgICAgICBuZXcgcGFyc2VyLlpISGFudENhc3VhbERhdGVQYXJzZXIoKSxcbiAgICAgICAgICAgIG5ldyBwYXJzZXIuWkhIYW50RGVhZGxpbmVGb3JtYXRQYXJzZXIoKVxuICAgICAgICBdLFxuICAgICAgICByZWZpbmVyczogW1xuICAgICAgICAgICAgbmV3IHJlZmluZXIuT3ZlcmxhcFJlbW92YWxSZWZpbmVyKCksXG4gICAgICAgICAgICBuZXcgcmVmaW5lci5Gb3J3YXJkRGF0ZVJlZmluZXIoKVxuICAgICAgICBdXG4gICAgfVxufTsiLCIvKlxuXG5cbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoXG4gICAgJyhcXFxcV3xeKSgnICtcbiAgICAgICAgJ2pldHp0fCcgK1xuICAgICAgICAnKD86aGV1dGV8ZGllc2VuKVxcXFxzKihtb3JnZW58dm9ybWl0dGFnfG1pdHRhZ3xuYWNobWl0dGFnfGFiZW5kKXwnICtcbiAgICAgICAgJyg/OmhldXRlfGRpZXNlKVxcXFxzKm5hY2h0fCcgK1xuICAgICAgICAnaGV1dGV8JyArXG4gICAgICAgICcoPzooPzrDvHx1ZSliZXIpP21vcmdlbig/OlxcXFxzKihtb3JnZW58dm9ybWl0dGFnfG1pdHRhZ3xuYWNobWl0dGFnfGFiZW5kfG5hY2h0KSk/fCcgK1xuICAgICAgICAnKD86dm9yKT9nZXN0ZXJuKD86XFxcXHMqKG1vcmdlbnx2b3JtaXR0YWd8bWl0dGFnfG5hY2htaXR0YWd8YWJlbmR8bmFjaHQpKT98JyArXG4gICAgICAgICdsZXR6dGVcXFxccypuYWNodCcgK1xuICAgICcpKD89XFxcXFd8JCknLCAnaScpO1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIERFQ2FzdWFsRGF0ZVBhcnNlcigpIHtcblxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7IHJldHVybiBQQVRURVJOOyB9XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpIHtcbiAgICAgICAgdmFyIHRleHQgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlZk1vbWVudCA9IG1vbWVudChyZWYpO1xuICAgICAgICB2YXIgc3RhcnRNb21lbnQgPSByZWZNb21lbnQuY2xvbmUoKTtcbiAgICAgICAgdmFyIGxvd2VyVGV4dCA9IHRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoLyg/OmhldXRlfGRpZXNlKVxccypuYWNodC8udGVzdChsb3dlclRleHQpKSB7XG4gICAgICAgICAgICAvLyBOb3JtYWxseSBtZWFucyB0aGlzIGNvbWluZyBtaWRuaWdodFxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMjIpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKC9eKD86w7x8dWUpYmVybW9yZ2VuLy50ZXN0KGxvd2VyVGV4dCkpIHtcbiAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZChyZWZNb21lbnQuaG91cigpID4gMSA/IDIgOiAxLCAnZGF5Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoL15tb3JnZW4vLnRlc3QobG93ZXJUZXh0KSkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgbm90IFwiVG9tb3Jyb3dcIiBvbiBsYXRlIG5pZ2h0XG4gICAgICAgICAgICBpZiAocmVmTW9tZW50LmhvdXIoKSA+IDEpIHtcbiAgICAgICAgICAgICAgICBzdGFydE1vbWVudC5hZGQoMSwgJ2RheScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKC9eZ2VzdGVybi8udGVzdChsb3dlclRleHQpKSB7XG4gICAgICAgICAgICBzdGFydE1vbWVudC5hZGQoLTEsICdkYXknKTtcbiAgICAgICAgfSBlbHNlIGlmICgvXnZvcmdlc3Rlcm4vLnRlc3QobG93ZXJUZXh0KSkge1xuICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKC0yLCAnZGF5Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoL2xldHp0ZVxccypuYWNodC8udGVzdChsb3dlclRleHQpKSB7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAwKTtcbiAgICAgICAgICAgIGlmIChyZWZNb21lbnQuaG91cigpID4gNikge1xuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgtMSwgJ2RheScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGxvd2VyVGV4dCA9PT0gJ2pldHp0Jykge1xuICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIHJlZk1vbWVudC5ob3VyKCkpO1xuICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWludXRlJywgcmVmTW9tZW50Lm1pbnV0ZSgpKTtcbiAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3NlY29uZCcsIHJlZk1vbWVudC5zZWNvbmQoKSk7XG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtaWxsaXNlY29uZCcsIHJlZk1vbWVudC5taWxsaXNlY29uZCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZWNvbmRNYXRjaCA9IG1hdGNoWzNdIHx8IG1hdGNoWzRdIHx8IG1hdGNoWzVdO1xuICAgICAgICBpZiAoc2Vjb25kTWF0Y2gpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2Vjb25kTWF0Y2gudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vcmdlbic6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDYpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd2b3JtaXR0YWcnOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCA5KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWl0dGFnJzpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMTIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduYWNobWl0dGFnJzpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMTUpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FiZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMTgpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25hY2h0JzpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5Jywgc3RhcnRNb21lbnQuZGF0ZSgpKVxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIHN0YXJ0TW9tZW50Lm1vbnRoKCkgKyAxKVxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKVxuICAgICAgICByZXN1bHQudGFnc1snREVDYXN1YWxEYXRlUGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG52YXIgdXRpbCAgPSByZXF1aXJlKCcuLi8uLi91dGlscy9ERScpO1xuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICcoaW58bmFjaClcXFxccyonICtcbiAgICAnKCcrIHV0aWwuSU5URUdFUl9XT1JEU19QQVRURVJOICsgJ3xbMC05XSt8ZWluaWdlbnxlaW5lW3JtXVxcXFxzKmhhbGJlbnxlaW5lW3JtXSlcXFxccyonICtcbiAgICAnKHNla3VuZGVuP3xtaW4oPzp1dGUpP24/fHN0dW5kZW4/fHRhZyg/OmVuKT98d29jaGVuP3xtb25hdCg/OmVuKT98amFocig/OmVuKT8pXFxcXHMqJyArXG4gICAgJyg/PVxcXFxXfCQpJywgJ2knXG4pO1xuXG52YXIgU1RSSUNUX1BBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknICtcbiAgICAnKGlufG5hY2gpXFxcXHMqJyArXG4gICAgJygnKyB1dGlsLklOVEVHRVJfV09SRFNfUEFUVEVSTiArICd8WzAtOV0rfGVpbmUoPzpyfG0pPylcXFxccyonICtcbiAgICAnKHNla3VuZGVuP3xtaW51dGVuP3xzdHVuZGVuP3x0YWcoPzplbik/KVxcXFxzKicgK1xuICAgICcoPz1cXFxcV3wkKScsICdpJ1xuKTtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBERURlYWRsaW5lRm9ybWF0UGFyc2VyKCl7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTdHJpY3RNb2RlKCk/IFNUUklDVF9QQVRURVJOIDogUEFUVEVSTjtcbiAgICB9O1xuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICB2YXIgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIHRleHQgID0gbWF0Y2hbMF07XG4gICAgICAgIHRleHQgID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKTtcblxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWZcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG51bSA9IG1hdGNoWzNdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICh1dGlsLklOVEVHRVJfV09SRFNbbnVtXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBudW0gPSB1dGlsLklOVEVHRVJfV09SRFNbbnVtXTtcbiAgICAgICAgfSBlbHNlIGlmIChudW0gPT09ICdlaW5lcicgfHwgbnVtID09PSAnZWluZW0nKSB7XG4gICAgICAgICAgICBudW0gPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKG51bSA9PT0gJ2VpbmlnZW4nKSB7XG4gICAgICAgICAgICBudW0gPSAzO1xuICAgICAgICB9IGVsc2UgaWYgKC9oYWxiZW4vLnRlc3QobnVtKSkge1xuICAgICAgICAgICAgbnVtID0gMC41O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtID0gcGFyc2VJbnQobnVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYXRlID0gbW9tZW50KHJlZik7XG4gICAgICAgIGlmICgvdGFnfHdvY2hlfG1vbmF0fGphaHIvaS50ZXN0KG1hdGNoWzRdKSkge1xuXG4gICAgICAgICAgICBpZiAoL3RhZy9pLnRlc3QobWF0Y2hbNF0pKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnZCcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgvd29jaGUvaS50ZXN0KG1hdGNoWzRdKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuYWRkKG51bSAqIDcsICdkJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKC9tb25hdC9pLnRlc3QobWF0Y2hbNF0pKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnbW9udGgnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoL2phaHIvaS50ZXN0KG1hdGNoWzRdKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuYWRkKG51bSwgJ3llYXInKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKC9zdHVuZGUvaS50ZXN0KG1hdGNoWzRdKSkge1xuXG4gICAgICAgICAgICBkYXRlLmFkZChudW0sICdob3VyJyk7XG5cbiAgICAgICAgfSBlbHNlIGlmICgvbWluL2kudGVzdChtYXRjaFs0XSkpIHtcblxuICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnbWludXRlJyk7XG5cbiAgICAgICAgfSBlbHNlIGlmICgvc2VrdW5kZS9pLnRlc3QobWF0Y2hbNF0pKSB7XG5cbiAgICAgICAgICAgIGRhdGUuYWRkKG51bSwgJ3NlY29uZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdob3VyJywgZGF0ZS5ob3VyKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBkYXRlLm1pbnV0ZSgpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignc2Vjb25kJywgZGF0ZS5zZWNvbmQoKSk7XG4gICAgICAgIHJlc3VsdC50YWdzWydERURlYWRsaW5lRm9ybWF0UGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59O1xuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5cbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xudmFyIHV0aWwgID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvREUnKTtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknICtcbiAgICAgICAgJyg/OmFtXFxcXHMqPyk/JyArXG4gICAgICAgICcoPzooU29ubnRhZ3xNb250YWd8RGllbnN0YWd8TWl0dHdvY2h8RG9ubmVyc3RhZ3xGcmVpdGFnfFNhbXN0YWd8U298TW98RGl8TWl8RG98RnJ8U2EpXFxcXHMqLD9cXFxccyopPycgK1xuICAgICAgICAnKD86ZGVuXFxcXHMqKT8nICtcbiAgICAgICAgJyhbMC05XXsxLDJ9KVxcXFwuJyArXG4gICAgICAgICcoPzpcXFxccyooPzpiaXMoPzpcXFxccyooPzphbXx6dW0pKT98XFxcXC18XFxcXOKAk3xcXFxccylcXFxccyooWzAtOV17MSwyfSlcXFxcLik/XFxcXHMqJyArXG4gICAgICAgICcoSmFuKD86dWFyfFxcXFwuKT98RmViKD86cnVhcnxcXFxcLik/fE3DpHIoPzp6fFxcXFwuKT98TWFlcnp8TXJ6XFxcXC4/fEFwcig/OmlsfFxcXFwuKT98TWFpfEp1big/Oml8XFxcXC4pP3xKdWwoPzppfFxcXFwuKT98QXVnKD86dXN0fFxcXFwuKT98U2VwKD86dHx0XFxcXC58dGVtYmVyfFxcXFwuKT98T2t0KD86b2JlcnxcXFxcLik/fE5vdig/OmVtYmVyfFxcXFwuKT98RGV6KD86ZW1iZXJ8XFxcXC4pPyknICtcbiAgICAgICAgJyg/OicgK1xuICAgICAgICAgICAgJyw/XFxcXHMqKFswLTldezEsNH0oPyFbXlxcXFxzXVxcXFxkKSknICtcbiAgICAgICAgICAgICcoXFxcXHMqW3ZuXVxcXFwuP1xcXFxzKkMoPzpocik/XFxcXC4/KT8nICtcbiAgICAgICAgJyk/JyArXG4gICAgICAgICcoPz1cXFxcV3wkKScsICdpJ1xuICAgICk7XG5cbnZhciBXRUVLREFZX0dST1VQID0gMjtcbnZhciBEQVRFX0dST1VQID0gMztcbnZhciBEQVRFX1RPX0dST1VQID0gNDtcbnZhciBNT05USF9OQU1FX0dST1VQID0gNTtcbnZhciBZRUFSX0dST1VQID0gNjtcbnZhciBZRUFSX0JFX0dST1VQID0gNztcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBERU1vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7IHJldHVybiBQQVRURVJOOyB9XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIHRleHQ6IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtIG1hdGNoWzFdLmxlbmd0aCksXG4gICAgICAgICAgICBpbmRleDogbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGgsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfTkFNRV9HUk9VUF07XG4gICAgICAgIG1vbnRoID0gdXRpbC5NT05USF9PRkZTRVRbbW9udGgudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgdmFyIGRheSA9IG1hdGNoW0RBVEVfR1JPVVBdO1xuICAgICAgICBkYXkgPSBwYXJzZUludChkYXkpO1xuXG4gICAgICAgIHZhciB5ZWFyID0gbnVsbDtcbiAgICAgICAgaWYgKG1hdGNoW1lFQVJfR1JPVVBdKSB7XG4gICAgICAgICAgICB5ZWFyID0gbWF0Y2hbWUVBUl9HUk9VUF07XG4gICAgICAgICAgICB5ZWFyID0gcGFyc2VJbnQoeWVhcik7XG5cbiAgICAgICAgICAgIGlmKG1hdGNoW1lFQVJfQkVfR1JPVVBdKXtcbiAgICAgICAgICAgICAgICBpZiAoL3YvaS50ZXN0KG1hdGNoW1lFQVJfQkVfR1JPVVBdKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB2LkNoci5cbiAgICAgICAgICAgICAgICAgICAgeWVhciA9IC15ZWFyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhciA8IDEwMCl7XG5cbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciArIDIwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih5ZWFyKXtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy9GaW5kIHRoZSBtb3N0IGFwcHJvcHJpYXRlZCB5ZWFyXG4gICAgICAgICAgICB2YXIgcmVmTW9tZW50ID0gbW9tZW50KHJlZik7XG4gICAgICAgICAgICByZWZNb21lbnQubW9udGgobW9udGggLSAxKTtcbiAgICAgICAgICAgIHJlZk1vbWVudC5kYXRlKGRheSk7XG4gICAgICAgICAgICByZWZNb21lbnQueWVhcihtb21lbnQocmVmKS55ZWFyKCkpO1xuXG4gICAgICAgICAgICB2YXIgbmV4dFllYXIgPSByZWZNb21lbnQuY2xvbmUoKS5hZGQoMSwgJ3knKTtcbiAgICAgICAgICAgIHZhciBsYXN0WWVhciA9IHJlZk1vbWVudC5jbG9uZSgpLmFkZCgtMSwgJ3knKTtcbiAgICAgICAgICAgIGlmKCBNYXRoLmFicyhuZXh0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7XG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbmV4dFllYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBNYXRoLmFicyhsYXN0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7XG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbGFzdFllYXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIHJlZk1vbWVudC55ZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Vla2RheSBjb21wb25lbnRcbiAgICAgICAgaWYgKG1hdGNoW1dFRUtEQVlfR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgd2Vla2RheSA9IG1hdGNoW1dFRUtEQVlfR1JPVVBdO1xuICAgICAgICAgICAgd2Vla2RheSA9IHV0aWwuV0VFS0RBWV9PRkZTRVRbd2Vla2RheS50b0xvd2VyQ2FzZSgpXVxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignd2Vla2RheScsIHdlZWtkYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGV4dCBjYW4gYmUgJ3JhbmdlJyB2YWx1ZS4gU3VjaCBhcyAnMTIgLSAxMyBKYW51YXJ5IDIwMTInXG4gICAgICAgIGlmIChtYXRjaFtEQVRFX1RPX0dST1VQXSkge1xuICAgICAgICAgICAgcmVzdWx0LmVuZCA9IHJlc3VsdC5zdGFydC5jbG9uZSgpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2RheScsIHBhcnNlSW50KG1hdGNoW0RBVEVfVE9fR1JPVVBdKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQudGFnc1snREVNb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn1cbiIsIi8qXG4gICAgXG4gICAgVGhlIHBhcnNlciBmb3IgcGFyc2luZyBtb250aCBuYW1lIGFuZCB5ZWFyLlxuICAgIFxuICAgIEVYLiBcbiAgICAgICAgLSBKYW51YXJcbiAgICAgICAgLSBKYW51YXIgMjAxMlxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcbnZhciB1dGlsICA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0RFJyk7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnKF58XFxcXERcXFxccyt8W15cXFxcd1xcXFxzXSknICtcbiAgICAnKEphblxcXFwuP3xKYW51YXJ8RmViXFxcXC4/fEZlYnJ1YXJ8TcOkclxcXFwuP3xNKD86w6R8YWUpcnp8TXJ6XFxcXC4/fEFwclxcXFwuP3xBcHJpbHxNYWlcXFxcLj98SnVuXFxcXC4/fEp1bml8SnVsXFxcXC4/fEp1bGl8QXVnXFxcXC4/fEF1Z3VzdHxTZXBcXFxcLj98U2VwdFxcXFwuP3xTZXB0ZW1iZXJ8T2t0XFxcXC4/fE9rdG9iZXJ8Tm92XFxcXC4/fE5vdmVtYmVyfERlelxcXFwuP3xEZXplbWJlciknICsgXG4gICAgJ1xcXFxzKicgK1xuICAgICcoPzonICtcbiAgICAgICAgJyw/XFxcXHMqKD86KFswLTldezR9KShcXFxccypbdm5dXFxcXC4/XFxcXHMqQyg/OmhyKT9cXFxcLj8pP3woWzAtOV17MSw0fSlcXFxccyooW3ZuXVxcXFwuP1xcXFxzKkMoPzpocik/XFxcXC4/KSknICtcbiAgICAnKT8nICtcbiAgICAnKD89W15cXFxcc1xcXFx3XXwkKScsICdpJyk7XG5cbnZhciBNT05USF9OQU1FX0dST1VQID0gMjtcbnZhciBZRUFSX0dST1VQID0gMztcbnZhciBZRUFSX0JFX0dST1VQID0gNDtcbnZhciBZRUFSX0dST1VQMiA9IDU7XG52YXIgWUVBUl9CRV9HUk9VUDIgPSA2O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOTW9udGhOYW1lUGFyc2VyKCl7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cbiAgICBcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICB0ZXh0OiBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpLFxuICAgICAgICAgICAgaW5kZXg6IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoLFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIFxuICAgICAgICB2YXIgbW9udGggPSBtYXRjaFtNT05USF9OQU1FX0dST1VQXTtcbiAgICAgICAgbW9udGggPSB1dGlsLk1PTlRIX09GRlNFVFttb250aC50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICB2YXIgZGF5ID0gMTtcblxuICAgICAgICB2YXIgeWVhciA9IG51bGw7XG4gICAgICAgIGlmIChtYXRjaFtZRUFSX0dST1VQXSB8fCBtYXRjaFtZRUFSX0dST1VQMl0pIHtcbiAgICAgICAgICAgIHllYXIgPSBtYXRjaFtZRUFSX0dST1VQXSB8fCBtYXRjaFtZRUFSX0dST1VQMl07XG4gICAgICAgICAgICB5ZWFyID0gcGFyc2VJbnQoeWVhcik7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFtZRUFSX0JFX0dST1VQXSB8fCBtYXRjaFtZRUFSX0JFX0dST1VQMl0pIHtcbiAgICAgICAgICAgICAgICBpZiAoL3YvaS50ZXN0KG1hdGNoW1lFQVJfQkVfR1JPVVBdIHx8IG1hdGNoW1lFQVJfQkVfR1JPVVAyXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdi5DaHIuXG4gICAgICAgICAgICAgICAgICAgIHllYXIgPSAteWVhcjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhciA8IDEwMCl7IFxuXG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgKyAyMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoeWVhcil7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9GaW5kIHRoZSBtb3N0IGFwcHJvcHJpYXRlZCB5ZWFyXG4gICAgICAgICAgICB2YXIgcmVmTW9tZW50ID0gbW9tZW50KHJlZik7XG4gICAgICAgICAgICByZWZNb21lbnQubW9udGgobW9udGggLSAxKTtcbiAgICAgICAgICAgIHJlZk1vbWVudC5kYXRlKGRheSk7XG5cbiAgICAgICAgICAgIHZhciBuZXh0WWVhciA9IHJlZk1vbWVudC5jbG9uZSgpLmFkZCgxLCAneScpO1xuICAgICAgICAgICAgdmFyIGxhc3RZZWFyID0gcmVmTW9tZW50LmNsb25lKCkuYWRkKC0xLCAneScpO1xuICAgICAgICAgICAgaWYoIE1hdGguYWJzKG5leHRZZWFyLmRpZmYobW9tZW50KHJlZikpKSA8IE1hdGguYWJzKHJlZk1vbWVudC5kaWZmKG1vbWVudChyZWYpKSkgKXsgIFxuICAgICAgICAgICAgICAgIHJlZk1vbWVudCA9IG5leHRZZWFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggTWF0aC5hYnMobGFzdFllYXIuZGlmZihtb21lbnQocmVmKSkpIDwgTWF0aC5hYnMocmVmTW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApeyBcbiAgICAgICAgICAgICAgICByZWZNb21lbnQgPSBsYXN0WWVhcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBtb250aCk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCByZWZNb21lbnQueWVhcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC50YWdzWydERU1vbnRoTmFtZVBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbiIsIi8qXG4gICAgRGF0ZSBmb3JtYXQgd2l0aCBzbGFzaCBcIi9cIiAoYWxzbyBcIi1cIiBhbmQgXCIuXCIpIGJldHdlZW4gbnVtYmVyc1xuICAgIC0gVHVlc2RheSAxMS8zLzIwMTVcbiAgICAtIDExLzMvMjAxNVxuICAgIC0gMTEvM1xuKi9cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICcoPzonICtcbiAgICAgICAgJyg/OmFtXFxcXHMqPyk/JyArXG4gICAgICAgICcoKD86c29ubnRhZ3xzb3xtb250YWd8bW98ZGllbnN0YWd8ZGl8bWl0dHdvY2h8bWl8ZG9ubmVyc3RhZ3xkb3xmcmVpdGFnfGZyfHNhbXN0YWd8c2EpKScgK1xuICAgICAgICAnXFxcXHMqXFxcXCw/XFxcXHMqJyArXG4gICAgICAgICcoPzpkZW5cXFxccyopPycgK1xuICAgICcpPycgK1xuICAgICcoWzAtM117MCwxfVswLTldezF9KVtcXFxcL1xcXFwuXFxcXC1dKFswLTNdezAsMX1bMC05XXsxfSknICtcbiAgICAnKD86JyArXG4gICAgICAgICdbXFxcXC9cXFxcLlxcXFwtXScgK1xuICAgICAgICAnKFswLTldezR9XFxzKlxcLD9cXHMqfFswLTldezJ9XFxzKlxcLD9cXHMqKScgK1xuICAgICcpPycgK1xuICAgICcoXFxcXFd8JCknLCAnaScpO1xuXG52YXIgREFZU19PRkZTRVQgPSB7XG4gICAgJ3Nvbm50YWcnOiAwLCAnc28nOiAwLFxuICAgICdtb250YWcnOiAxLCAnbW8nOiAxLFxuICAgICdkaWVuc3RhZyc6IDIsICdkaSc6IDIsXG4gICAgJ21pdHR3b2NoJzogMywgJ21pJzogMyxcbiAgICAnZG9ubmVyc3RhZyc6IDQsICdkbyc6IDQsXG4gICAgJ2ZyZWl0YWcnOiA1LCAnZnInOiA1LFxuICAgICdzYW1zdGFnJzogNiwgJ3NhJzogNlxufTtcblxuXG52YXIgT1BFTk5JTkdfR1JPVVAgPSAxO1xudmFyIEVORElOR19HUk9VUCA9IDY7XG5cbnZhciBXRUVLREFZX0dST1VQID0gMjtcbnZhciBEQVlfR1JPVVAgPSAzO1xudmFyIE1PTlRIX0dST1VQID0gNDtcbnZhciBZRUFSX0dST1VQID0gNTtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBERVNsYXNoRGF0ZUZvcm1hdFBhcnNlcihhcmd1bWVudCkge1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gUEFUVEVSTjsgfTtcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIGlmKG1hdGNoW09QRU5OSU5HX0dST1VQXSA9PSAnLycgfHwgbWF0Y2hbRU5ESU5HX0dST1VQXSA9PSAnLycpIHtcbiAgICAgICAgICAgIC8vIExvbmcgc2tpcCwgaWYgdGhlcmUgaXMgc29tZSBvdmVybGFwcGluZyBsaWtlOlxuICAgICAgICAgICAgLy8gWFhbL1lZL1paXVxuICAgICAgICAgICAgLy8gW1hYL1lZL11aWlxuICAgICAgICAgICAgbWF0Y2guaW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoW09QRU5OSU5HX0dST1VQXS5sZW5ndGg7XG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoW09QRU5OSU5HX0dST1VQXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtIG1hdGNoW0VORElOR19HUk9VUF0ubGVuZ3RoKTtcblxuXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYodGV4dC5tYXRjaCgvXlxcZFxcLlxcZCQvKSkgcmV0dXJuO1xuICAgICAgICBpZih0ZXh0Lm1hdGNoKC9eXFxkXFwuXFxkezEsMn1cXC5cXGR7MSwyfSQvKSkgcmV0dXJuO1xuXG4gICAgICAgIC8vIE1NL2RkIC0+IE9LXG4gICAgICAgIC8vIE1NLmRkIC0+IE5HXG4gICAgICAgIGlmKCFtYXRjaFtZRUFSX0dST1VQXSAmJiBtYXRjaFswXS5pbmRleE9mKCcvJykgPCAwKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGRhdGUgPSBudWxsO1xuICAgICAgICB2YXIgeWVhciA9IG1hdGNoW1lFQVJfR1JPVVBdIHx8IG1vbWVudChyZWYpLnllYXIoKSArICcnO1xuICAgICAgICB2YXIgbW9udGggPSBtYXRjaFtNT05USF9HUk9VUF07XG4gICAgICAgIHZhciBkYXkgICA9IG1hdGNoW0RBWV9HUk9VUF07XG5cbiAgICAgICAgbW9udGggPSBwYXJzZUludChtb250aCk7XG4gICAgICAgIGRheSAgPSBwYXJzZUludChkYXkpO1xuICAgICAgICB5ZWFyID0gcGFyc2VJbnQoeWVhcik7XG5cbiAgICAgICAgaWYgKG1vbnRoIDwgMSB8fCBtb250aCA+IDEyKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYoZGF5IDwgMSB8fCBkYXkgPiAzMSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYoeWVhciA8IDEwMCl7XG4gICAgICAgICAgICBpZiAoeWVhciA+IDUwKSB7XG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgKyAxOTAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciArIDIwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHllYXIpO1xuXG4gICAgICAgIC8vRGF5IG9mIHdlZWtcbiAgICAgICAgaWYobWF0Y2hbV0VFS0RBWV9HUk9VUF0pIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3dlZWtkYXknLCBEQVlTX09GRlNFVFttYXRjaFtXRUVLREFZX0dST1VQXS50b0xvd2VyQ2FzZSgpXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQudGFnc1snREVTbGFzaERhdGVGb3JtYXRQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn07XG4iLCIvKlxuXG5cbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xudmFyIHV0aWwgID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvREUnKTtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcnICtcbiAgICAnKFxcXFxXfF4pdm9yXFxcXHMqJyArXG4gICAgJygnICsgdXRpbC5JTlRFR0VSX1dPUkRTX1BBVFRFUk4gKyAnfFswLTldK3xlaW5pZ2VufGVpbmVbcm1dXFxcXHMqaGFsYmVufGVpbmVbcm1dKVxcXFxzKicgK1xuICAgICcoc2VrdW5kZW4/fG1pbig/OnV0ZSk/bj98c3R1bmRlbj98d29jaGVuP3x0YWcoPzplbik/fG1vbmF0KD86ZW4pP3xqYWhyKD86ZW4pPylcXFxccyonICtcbiAgICAnKD89KD86XFxcXFd8JCkpJywgJ2knKTtcblxudmFyIFNUUklDVF9QQVRURVJOID0gbmV3IFJlZ0V4cCgnJyArXG4gICAgJyhcXFxcV3xeKXZvclxcXFxzKicgK1xuICAgICcoWzAtOV0rfGVpbmUoPzpyfG0pKVxcXFxzKicgK1xuICAgICcoc2VrdW5kZW4/fG1pbnV0ZW4/fHN0dW5kZW4/fHRhZyg/OmVuKT8pJyArXG4gICAgJyg/PSg/OlxcXFxXfCQpKScsICdpJyk7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gREVUaW1lQWdvRm9ybWF0UGFyc2VyKCl7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTdHJpY3RNb2RlKCk/IFNUUklDVF9QQVRURVJOIDogUEFUVEVSTjtcbiAgICB9O1xuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICBpZiAobWF0Y2guaW5kZXggPiAwICYmIHRleHRbbWF0Y2guaW5kZXgtMV0ubWF0Y2goL1xcdy8pKSByZXR1cm4gbnVsbDtcblxuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdO1xuICAgICAgICB0ZXh0ICA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtIG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHJlZjogcmVmXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBudW0gPSBtYXRjaFsyXS50b0xvd2VyQ2FzZSgpIDtcbiAgICAgICAgaWYgKHV0aWwuSU5URUdFUl9XT1JEU1tudW1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG51bSA9IHV0aWwuSU5URUdFUl9XT1JEU1tudW1dO1xuICAgICAgICB9IGVsc2UgaWYgKG51bSA9PT0gJ2VpbmVyJyB8fCBudW0gPT09ICdlaW5lbScpIHtcbiAgICAgICAgICAgIG51bSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtID09PSAnZWluaWdlbicpIHtcbiAgICAgICAgICAgIG51bSA9IDM7XG4gICAgICAgIH0gZWxzZSBpZiAoL2hhbGJlbi8udGVzdChudW0pKSB7XG4gICAgICAgICAgICBudW0gPSAwLjU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW0gPSBwYXJzZUludChudW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQocmVmKTtcblxuICAgICAgICBpZiAoL3N0dW5kZXxtaW58c2VrdW5kZS9pLnRlc3QobWF0Y2hbM10pKSB7XG4gICAgICAgICAgICBpZiAoL3N0dW5kZS9pLnRlc3QobWF0Y2hbM10pKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnaG91cicpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKC9taW4vaS50ZXN0KG1hdGNoWzNdKSkge1xuXG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQoLW51bSwgJ21pbnV0ZScpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKC9zZWt1bmRlL2kudGVzdChtYXRjaFszXSkpIHtcblxuICAgICAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdzZWNvbmQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdob3VyJywgZGF0ZS5ob3VyKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWludXRlJywgZGF0ZS5taW51dGUoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdzZWNvbmQnLCBkYXRlLnNlY29uZCgpKTtcbiAgICAgICAgICAgIHJlc3VsdC50YWdzWydERVRpbWVBZ29Gb3JtYXRQYXJzZXInXSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKC93b2NoZS9pLnRlc3QobWF0Y2hbM10pKSB7XG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnd2VlaycpO1xuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnd2Vla2RheScsIGRhdGUuZGF5KCkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgvdGFnL2kudGVzdChtYXRjaFszXSkpIHtcbiAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoL21vbmF0L2kudGVzdChtYXRjaFszXSkpIHtcbiAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdtb250aCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKC9qYWhyL2kudGVzdChtYXRjaFszXSkpIHtcblxuICAgICAgICAgICAgZGF0ZS5hZGQoLW51bSwgJ3llYXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH07XG59XG4iLCIvKlxuXG5cbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xudmFyIFBhcnNlZENvbXBvbmVudHMgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRDb21wb25lbnRzO1xuXG52YXIgRklSU1RfUkVHX1BBVFRFUk4gID0gbmV3IFJlZ0V4cChcIihefFxcXFxzfFQpXCIgK1xuICAgIFwiKD86KD86dW18dm9uKVxcXFxzKik/XCIgKyBcbiAgICBcIihcXFxcZHsxLDR9fG1pdHRhZ3M/fG1pdHRlcm5hY2h0cz8pXCIgKyBcbiAgICBcIig/OlwiICsgXG4gICAgICAgIFwiKD86XFxcXC58XFxcXDp8XFxcXO+8mikoXFxcXGR7MSwyfSlcIiArIFxuICAgICAgICBcIig/OlwiICsgXG4gICAgICAgICAgICBcIig/OlxcXFw6fFxcXFzvvJopKFxcXFxkezJ9KVwiICsgXG4gICAgICAgIFwiKT9cIiArIFxuICAgIFwiKT9cIiArXG4gICAgXCIoPzpcXFxccyp1aHIpP1wiICtcbiAgICBcIig/OlxcXFxzKihtb3JnZW5zfHZvcm1pdHRhZ3N8bWl0dGFnc3xuYWNobWl0dGFnc3xhYmVuZHN8bmFjaHRzKSk/XCIgKyBcbiAgICBcIig/PVxcXFxXfCQpXCIsICdpJyk7XG5cblxudmFyIFNFQ09ORF9SRUdfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqXCIgKyBcbiAgICBcIihcXFxcLXxcXFxc4oCTfFxcXFx+fFxcXFzjgJx8YmlzfFxcXFw/KVxcXFxzKlwiICsgXG4gICAgXCIoXFxcXGR7MSw0fSlcIiArXG4gICAgXCIoPzpcIiArIFxuICAgICAgICBcIig/OlxcXFwufFxcXFw6fFxcXFzvvJopKFxcXFxkezEsMn0pXCIgKyBcbiAgICAgICAgXCIoPzpcIiArIFxuICAgICAgICAgICAgXCIoPzpcXFxcLnxcXFxcOnxcXFxc77yaKShcXFxcZHsxLDJ9KVwiICsgXG4gICAgICAgIFwiKT9cIiArIFxuICAgIFwiKT9cIiArIFxuICAgIFwiKD86XFxcXHMqKG1vcmdlbnN8dm9ybWl0dGFnc3xtaXR0YWdzfG5hY2htaXR0YWdzfGFiZW5kc3xuYWNodHMpKT9cIiArIFxuICAgIFwiKD89XFxcXFd8JClcIiwgJ2knKTtcblxudmFyIEhPVVJfR1JPVVAgICAgPSAyO1xudmFyIE1JTlVURV9HUk9VUCAgPSAzO1xudmFyIFNFQ09ORF9HUk9VUCAgPSA0O1xudmFyIEFNX1BNX0hPVVJfR1JPVVAgPSA1O1xuXG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gREVUaW1lRXhwcmVzc2lvblBhcnNlcigpIHtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gRklSU1RfUkVHX1BBVFRFUk47IH1cbiAgICBcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpeyBcbiAgICAgICAgXG4gICAgICAgIC8vIFRoaXMgcGF0dGVybiBjYW4gYmUgb3ZlcmxhcGVkIEV4LiBbMTJdIEFNLCAxWzJdIEFNXG4gICAgICAgIGlmIChtYXRjaC5pbmRleCA+IDAgJiYgdGV4dFttYXRjaC5pbmRleC0xXS5tYXRjaCgvXFx3LykpIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgcmVmTW9tZW50ID0gbW9tZW50KHJlZik7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KCk7XG4gICAgICAgIHJlc3VsdC5yZWYgPSByZWY7XG4gICAgICAgIHJlc3VsdC5pbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICByZXN1bHQudGV4dCAgPSBtYXRjaFswXS5zdWJzdHJpbmcobWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0RFVGltZUV4cHJlc3Npb25QYXJzZXInXSA9IHRydWU7XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCAgIHJlZk1vbWVudC5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgcmVmTW9tZW50Lm1vbnRoKCkrMSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsICByZWZNb21lbnQueWVhcigpKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBob3VyID0gMDtcbiAgICAgICAgdmFyIG1pbnV0ZSA9IDA7XG4gICAgICAgIHZhciBtZXJpZGllbSA9IC0xO1xuXG4gICAgICAgIC8vIC0tLS0tIFNlY29uZFxuICAgICAgICBpZihtYXRjaFtTRUNPTkRfR1JPVVBdICE9IG51bGwpeyBcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBwYXJzZUludChtYXRjaFtTRUNPTkRfR1JPVVBdKTtcbiAgICAgICAgICAgIGlmKHNlY29uZCA+PSA2MCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3NlY29uZCcsIHNlY29uZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIC0tLS0tIEhvdXJzXG4gICAgICAgIGlmICgvbWl0dGFncz8vaS50ZXN0KG1hdGNoW0hPVVJfR1JPVVBdKSkge1xuICAgICAgICAgICAgbWVyaWRpZW0gPSAxOyBcbiAgICAgICAgICAgIGhvdXIgPSAxMjtcbiAgICAgICAgfSBlbHNlIGlmICgvbWl0dGVybmFjaHRzPy9pLnRlc3QobWF0Y2hbSE9VUl9HUk9VUF0pKSB7XG4gICAgICAgICAgICBtZXJpZGllbSA9IDA7IFxuICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBob3VyID0gcGFyc2VJbnQobWF0Y2hbSE9VUl9HUk9VUF0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyAtLS0tLSBNaW51dGVzXG4gICAgICAgIGlmKG1hdGNoW01JTlVURV9HUk9VUF0gIT0gbnVsbCl7IFxuICAgICAgICAgICAgbWludXRlID0gcGFyc2VJbnQobWF0Y2hbTUlOVVRFX0dST1VQXSk7XG4gICAgICAgIH0gZWxzZSBpZihob3VyID4gMTAwKSB7IFxuICAgICAgICAgICAgbWludXRlID0gaG91ciUxMDA7XG4gICAgICAgICAgICBob3VyICAgPSBwYXJzZUludChob3VyLzEwMCk7XG4gICAgICAgIH0gXG4gICAgICAgIFxuICAgICAgICBpZihtaW51dGUgPj0gNjApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaG91ciA+IDI0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaG91ciA+PSAxMikgeyBcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIC0tLS0tIEFNICYgUE0gIFxuICAgICAgICBpZiAobWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB2YXIgYW1wbSA9IG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ21vcmdlbnMnIHx8IGFtcG0gPT09ICd2b3JtaXR0YWdzJykge1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMDsgXG4gICAgICAgICAgICAgICAgaWYoaG91ciA9PSAxMikgaG91ciA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMTsgXG4gICAgICAgICAgICAgICAgaWYoaG91ciAhPSAxMikgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdob3VyJywgaG91cik7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21pbnV0ZScsIG1pbnV0ZSk7XG5cbiAgICAgICAgaWYgKG1lcmlkaWVtID49IDApIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21lcmlkaWVtJywgbWVyaWRpZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGhvdXIgPCAxMikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgIEV4dHJhY3RpbmcgdGhlICd0bycgY2h1bmtcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgbWF0Y2ggPSBTRUNPTkRfUkVHX1BBVFRFUk4uZXhlYyh0ZXh0LnN1YnN0cmluZyhyZXN1bHQuaW5kZXggKyByZXN1bHQudGV4dC5sZW5ndGgpKTtcbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgLy8gTm90IGFjY2VwdCBudW1iZXIgb25seSByZXN1bHRcbiAgICAgICAgICAgIGlmIChyZXN1bHQudGV4dC5tYXRjaCgvXlxcZCskLykpIHsgXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8vIFBhdHRlcm4gXCJZWS5ZWSAtWFhYWFwiIGlzIG1vcmUgbGlrZSB0aW1lem9uZSBvZmZzZXRcbiAgICAgICAgaWYgKG1hdGNoWzBdLm1hdGNoKC9eXFxzKihcXCt8XFwtKVxccypcXGR7Myw0fSQvKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHJlc3VsdC5lbmQgPT0gbnVsbCl7XG4gICAgICAgICAgICByZXN1bHQuZW5kID0gbmV3IFBhcnNlZENvbXBvbmVudHMobnVsbCwgcmVzdWx0LnN0YXJ0LmRhdGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaG91ciA9IDA7XG4gICAgICAgIHZhciBtaW51dGUgPSAwO1xuICAgICAgICB2YXIgbWVyaWRpZW0gPSAtMTtcblxuICAgICAgICAvLyAtLS0tLSBTZWNvbmRcbiAgICAgICAgaWYobWF0Y2hbU0VDT05EX0dST1VQXSAhPSBudWxsKXsgXG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gcGFyc2VJbnQobWF0Y2hbU0VDT05EX0dST1VQXSk7XG4gICAgICAgICAgICBpZihzZWNvbmQgPj0gNjApIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignc2Vjb25kJywgc2Vjb25kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhvdXIgPSBwYXJzZUludChtYXRjaFsyXSk7XG4gICAgICAgIFxuICAgICAgICAvLyAtLS0tLSBNaW51dGVcbiAgICAgICAgaWYgKG1hdGNoW01JTlVURV9HUk9VUF0hPSBudWxsKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG1pbnV0ZSA9IHBhcnNlSW50KG1hdGNoW01JTlVURV9HUk9VUF0pO1xuICAgICAgICAgICAgaWYobWludXRlID49IDYwKSByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSBpZiAoaG91ciA+IDEwMCkge1xuXG4gICAgICAgICAgICBtaW51dGUgPSBob3VyJTEwMDtcbiAgICAgICAgICAgIGhvdXIgICA9IHBhcnNlSW50KGhvdXIvMTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1pbnV0ZSA+PSA2MCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZihob3VyID4gMjQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VyID49IDEyKSB7IFxuICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyAtLS0tLSBBTSAmIFBNIFxuICAgICAgICBpZiAobWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF0gIT0gbnVsbCkge1xuXG4gICAgICAgICAgICBpZiAoaG91ciA+IDEyKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgdmFyIGFtcG0gPSBtYXRjaFtBTV9QTV9IT1VSX0dST1VQXVswXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKGFtcG0gPT09ICdtb3JnZW5zJyB8fCBhbXBtID09PSAndm9ybWl0dGFncycpIHtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDA7IFxuICAgICAgICAgICAgICAgIGlmKGhvdXIgPT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmVuZC5pc0NlcnRhaW4oJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KCdkYXknLCByZXN1bHQuZW5kLmdldCgnZGF5JykgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxOyBcbiAgICAgICAgICAgICAgICBpZihob3VyICE9IDEyKSBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ21lcmlkaWVtJykpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVyaWRpZW0gPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDApO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGFydC5nZXQoJ2hvdXInKSA9PSAxMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgIT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCByZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgKyAxMik7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnRleHQgPSByZXN1bHQudGV4dCArIG1hdGNoWzBdO1xuICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignaG91cicsIGhvdXIpO1xuICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignbWludXRlJywgbWludXRlKTtcbiAgICAgICAgaWYgKG1lcmlkaWVtID49IDApIHtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCdtZXJpZGllbScsIG1lcmlkaWVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzdGFydEF0UE0gPSByZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdtZXJpZGllbScpICYmIHJlc3VsdC5zdGFydC5nZXQoJ21lcmlkaWVtJykgPT0gMTtcbiAgICAgICAgICAgIGlmIChzdGFydEF0UE0gJiYgcmVzdWx0LnN0YXJ0LmdldCgnaG91cicpID4gaG91cikge1xuICAgICAgICAgICAgICAgIC8vIDEwcG0gLSAxIChhbSlcbiAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KCdtZXJpZGllbScsIDApO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhvdXIgPiAxMikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5lbmQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0LmVuZC5kYXRlKCkuZ2V0VGltZSgpIDwgcmVzdWx0LnN0YXJ0LmRhdGUoKS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQuaW1wbHkoJ2RheScsIHJlc3VsdC5lbmQuZ2V0KCdkYXknKSArIDEpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiLypcblxuXG4qL1xudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBEQVlTX09GRlNFVCA9IHtcbiAgICAnc29ubnRhZyc6IDAsICdzbyc6IDAsXG4gICAgJ21vbnRhZyc6IDEsICdtbyc6IDEsXG4gICAgJ2RpZW5zdGFnJzogMiwgJ2RpJzogMixcbiAgICAnbWl0dHdvY2gnOiAzLCAnbWknOiAzLFxuICAgICdkb25uZXJzdGFnJzogNCwgJ2RvJzogNCxcbiAgICAnZnJlaXRhZyc6IDUsICdmcic6IDUsXG4gICAgJ3NhbXN0YWcnOiA2LCAnc2EnOiA2XG59O1xuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICcoPzooPzpcXFxcLHxcXFxcKHxcXFxc77yIKVxcXFxzKik/JyArXG4gICAgJyg/OmFbbW5dXFxcXHMqPyk/JyArXG4gICAgJyg/OihkaWVzZVttbl18bGV0enRlW21uXXxuKD86w6R8YWUpY2hzdGVbbW5dKVxcXFxzKik/JyArXG4gICAgJygnICsgT2JqZWN0LmtleXMoREFZU19PRkZTRVQpLmpvaW4oJ3wnKSArICcpJyArXG4gICAgJyg/OlxcXFxzKig/OlxcXFwsfFxcXFwpfFxcXFzvvIkpKT8nICtcbiAgICAnKD86XFxcXHMqKGRpZXNlfGxldHp0ZXxuKD86w6R8YWUpY2hzdGUpXFxcXHMqd29jaGUpPycgK1xuICAgICcoPz1cXFxcV3wkKScsICdpJyk7XG5cbnZhciBQUkVGSVhfR1JPVVAgPSAyO1xudmFyIFdFRUtEQVlfR1JPVVAgPSAzO1xudmFyIFBPU1RGSVhfR1JPVVAgPSA0O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIERFV2Vla2RheVBhcnNlcigpIHtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfTtcblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtIG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGRheU9mV2VlayA9IG1hdGNoW1dFRUtEQVlfR1JPVVBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBvZmZzZXQgPSBEQVlTX09GRlNFVFtkYXlPZldlZWtdO1xuICAgICAgICBpZihvZmZzZXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgdmFyIHN0YXJ0TW9tZW50ID0gbW9tZW50KHJlZik7XG4gICAgICAgIHZhciBwcmVmaXggPSBtYXRjaFtQUkVGSVhfR1JPVVBdO1xuICAgICAgICB2YXIgcG9zdGZpeCA9IG1hdGNoW1BPU1RGSVhfR1JPVVBdO1xuXG4gICAgICAgIHZhciByZWZPZmZzZXQgPSBzdGFydE1vbWVudC5kYXkoKTtcbiAgICAgICAgdmFyIG5vcm0gPSBwcmVmaXggfHwgcG9zdGZpeDtcbiAgICAgICAgbm9ybSA9IG5vcm0gfHwgJyc7XG4gICAgICAgIG5vcm0gPSBub3JtLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICgvbGV0enRlLy50ZXN0KG5vcm0pKSB7XG4gICAgICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0IC0gNyk7XG4gICAgICAgIH0gZWxzZSBpZiAoL24oPzrDpHxhZSljaHN0ZS8udGVzdChub3JtKSkge1xuICAgICAgICAgICAgc3RhcnRNb21lbnQuZGF5KG9mZnNldCArIDcpO1xuICAgICAgICB9IGVsc2UgaWYgKC9kaWVzZS8udGVzdChub3JtKSkge1xuICAgICAgICAgICAgaWYgKCBvcHQuZm9yd2FyZERhdGVzT25seSAmJiByZWZPZmZzZXQgPiBvZmZzZXQgKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuZGF5KG9mZnNldCArIDcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICggb3B0LmZvcndhcmREYXRlc09ubHkgJiYgcmVmT2Zmc2V0ID4gb2Zmc2V0ICkge1xuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmRheShvZmZzZXQgKyA3KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW9wdC5mb3J3YXJkRGF0ZXNPbmx5ICYmIE1hdGguYWJzKG9mZnNldCAtIDcgLSByZWZPZmZzZXQpIDwgTWF0aC5hYnMob2Zmc2V0IC0gcmVmT2Zmc2V0KSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmRheShvZmZzZXQgLSA3KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW9wdC5mb3J3YXJkRGF0ZXNPbmx5ICYmIE1hdGguYWJzKG9mZnNldCArIDcgLSByZWZPZmZzZXQpIDwgTWF0aC5hYnMob2Zmc2V0IC0gcmVmT2Zmc2V0KSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmRheShvZmZzZXQgKyA3KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuZGF5KG9mZnNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd3ZWVrZGF5Jywgb2Zmc2V0KTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgc3RhcnRNb21lbnQubW9udGgoKSArIDEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn07XG4iLCIvKlxuXG5cbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xuXG52YXIgUEFUVEVSTiA9IC8oXFxXfF4pKG5vd3x0b2RheXx0b25pZ2h0fGxhc3RcXHMqbmlnaHR8KD86dG9tb3Jyb3d8dG1yfHllc3RlcmRheSlcXHMqfHRvbW9ycm93fHRtcnx5ZXN0ZXJkYXkpKD89XFxXfCQpL2k7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRU5DYXN1YWxEYXRlUGFyc2VyKCl7XG5cbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgpO1xuICAgICAgICB2YXIgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVmTW9tZW50ID0gbW9tZW50KHJlZik7XG4gICAgICAgIHZhciBzdGFydE1vbWVudCA9IHJlZk1vbWVudC5jbG9uZSgpO1xuICAgICAgICB2YXIgbG93ZXJUZXh0ID0gdGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKGxvd2VyVGV4dCA9PSAndG9uaWdodCcpe1xuICAgICAgICAgICAgLy8gTm9ybWFsbHkgbWVhbnMgdGhpcyBjb21pbmcgbWlkbmlnaHRcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDIyKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcblxuICAgICAgICB9IGVsc2UgaWYgKC9edG9tb3Jyb3d8XnRtci8udGVzdChsb3dlclRleHQpKSB7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIG5vdCBcIlRvbW9ycm93XCIgb24gbGF0ZSBuaWdodFxuICAgICAgICAgICAgaWYocmVmTW9tZW50LmhvdXIoKSA+IDEpIHtcbiAgICAgICAgICAgICAgICBzdGFydE1vbWVudC5hZGQoMSwgJ2RheScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAoL155ZXN0ZXJkYXkvLnRlc3QobG93ZXJUZXh0KSkge1xuXG4gICAgICAgICAgICBzdGFydE1vbWVudC5hZGQoLTEsICdkYXknKTtcblxuICAgICAgICB9IGVsc2UgaWYobG93ZXJUZXh0Lm1hdGNoKC9sYXN0XFxzKm5pZ2h0LykpIHtcblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMCk7XG4gICAgICAgICAgICBpZiAocmVmTW9tZW50LmhvdXIoKSA+IDYpIHtcbiAgICAgICAgICAgICAgICBzdGFydE1vbWVudC5hZGQoLTEsICdkYXknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKGxvd2VyVGV4dC5tYXRjaChcIm5vd1wiKSkge1xuXG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgcmVmTW9tZW50LmhvdXIoKSk7XG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtaW51dGUnLCByZWZNb21lbnQubWludXRlKCkpO1xuICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnc2Vjb25kJywgcmVmTW9tZW50LnNlY29uZCgpKTtcbiAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21pbGxpc2Vjb25kJywgcmVmTW9tZW50Lm1pbGxpc2Vjb25kKCkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgc3RhcnRNb21lbnQubW9udGgoKSArIDEpXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpXG4gICAgICAgIHJlc3VsdC50YWdzWydFTkNhc3VhbERhdGVQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIFBBVFRFUk4gPSAvKFxcV3xeKSgodGhpcyk/XFxzKihtb3JuaW5nfGFmdGVybm9vbnxldmVuaW5nfG5vb24pKS9pO1xuXG52YXIgVElNRV9NQVRDSCA9IDQ7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRU5DYXN1YWxUaW1lUGFyc2VyKCl7XG5cbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7IHJldHVybiBQQVRURVJOOyB9XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKCFtYXRjaFtUSU1FX01BVENIXSkgVElNRV9NQVRDSCA9IDM7XG5cbiAgICAgICAgaWYgKG1hdGNoW1RJTUVfTUFUQ0hdID09IFwiYWZ0ZXJub29uXCIpIHtcblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgb3B0WydhZnRlcm5vb24nXSA/IG9wdFsnYWZ0ZXJub29uJ10gOiAxNSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtUSU1FX01BVENIXSA9PSBcImV2ZW5pbmdcIikge1xuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCBvcHRbJ2V2ZW5pbmcnXSA/IG9wdFsnZXZlbmluZyddIDogMTgpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbVElNRV9NQVRDSF0gPT0gXCJtb3JuaW5nXCIpIHtcblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgb3B0Wydtb3JuaW5nJ10gPyBvcHRbJ21vcm5pbmcnXSA6IDYpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbVElNRV9NQVRDSF0gPT0gXCJub29uXCIpIHtcblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgb3B0Wydub29uJ10gPyBvcHRbJ25vb24nXSA6IDEyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC50YWdzWydFTkNhc3VhbFRpbWVQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn07XG4iLCIvKlxuXG5cbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xudmFyIHV0aWwgID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvRU4nKTtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknICtcbiAgICAnKHdpdGhpbnxpbilcXFxccyonICtcbiAgICAnKCcrIHV0aWwuSU5URUdFUl9XT1JEU19QQVRURVJOICsgJ3xbMC05XSt8YW4/KD86XFxcXHMqZmV3KT98aGFsZig/OlxcXFxzKmFuPyk/KVxcXFxzKicgK1xuICAgICcoc2Vjb25kcz98bWluKD86dXRlKT9zP3xob3Vycz98ZGF5cz98d2Vla3M/fG1vbnRocz98eWVhcnM/KVxcXFxzKicgK1xuICAgICcoPz1cXFxcV3wkKScsICdpJ1xuKTtcblxudmFyIFNUUklDVF9QQVRURVJOID0gbmV3IFJlZ0V4cCgnKFxcXFxXfF4pJyArXG4gICAgJyh3aXRoaW58aW4pXFxcXHMqJyArXG4gICAgJygnKyB1dGlsLklOVEVHRVJfV09SRFNfUEFUVEVSTiArICd8WzAtOV0rfGFuPylcXFxccyonICtcbiAgICAnKHNlY29uZHM/fG1pbnV0ZXM/fGhvdXJzP3xkYXlzPylcXFxccyonICtcbiAgICAnKD89XFxcXFd8JCknLCAnaSdcbik7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRU5EZWFkbGluZUZvcm1hdFBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzU3RyaWN0TW9kZSgpPyBTVFJJQ1RfUEFUVEVSTiA6IFBBVFRFUk47XG4gICAgfTtcblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG5cbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciB0ZXh0ICA9IG1hdGNoWzBdO1xuICAgICAgICB0ZXh0ICA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtIG1hdGNoWzFdLmxlbmd0aCk7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHJlZjogcmVmXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBudW0gPSBtYXRjaFszXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAodXRpbC5JTlRFR0VSX1dPUkRTW251bV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbnVtID0gdXRpbC5JTlRFR0VSX1dPUkRTW251bV07XG4gICAgICAgIH0gZWxzZSBpZiAobnVtID09PSAnYScgfHwgbnVtID09PSAnYW4nKXtcbiAgICAgICAgICAgIG51bSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtLm1hdGNoKC9mZXcvaSkpe1xuICAgICAgICAgICAgbnVtID0gMztcbiAgICAgICAgfSBlbHNlIGlmIChudW0ubWF0Y2goL2hhbGYvaSkpIHtcbiAgICAgICAgICAgIG51bSA9IDAuNTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG51bSA9IHBhcnNlSW50KG51bSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGF0ZSA9IG1vbWVudChyZWYpO1xuICAgICAgICBpZiAobWF0Y2hbNF0ubWF0Y2goL2RheXx3ZWVrfG1vbnRofHllYXIvaSkpIHtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzRdLm1hdGNoKC9kYXkvaSkpIHtcbiAgICAgICAgICAgICAgICBkYXRlLmFkZChudW0sICdkJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzRdLm1hdGNoKC93ZWVrL2kpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQobnVtICogNywgJ2QnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL21vbnRoL2kpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnbW9udGgnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL3llYXIvaSkpIHtcbiAgICAgICAgICAgICAgICBkYXRlLmFkZChudW0sICd5ZWFyJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRjaFs0XS5tYXRjaCgvaG91ci9pKSkge1xuXG4gICAgICAgICAgICBkYXRlLmFkZChudW0sICdob3VyJyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFs0XS5tYXRjaCgvbWluL2kpKSB7XG5cbiAgICAgICAgICAgIGRhdGUuYWRkKG51bSwgJ21pbnV0ZScpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL3NlY29uZC9pKSkge1xuXG4gICAgICAgICAgICBkYXRlLmFkZChudW0sICdzZWNvbmQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIGRhdGUuaG91cigpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWludXRlJywgZGF0ZS5taW51dGUoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3NlY29uZCcsIGRhdGUuc2Vjb25kKCkpO1xuICAgICAgICByZXN1bHQudGFnc1snRU5EZWFkbGluZUZvcm1hdFBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufTtcbiIsIi8qXG4gICAgSVNPIDg2MDFcbiAgICBodHRwOi8vd3d3LnczLm9yZy9UUi9OT1RFLWRhdGV0aW1lXG4gICAgLSBZWVlZLU1NLUREXG4gICAgLSBZWVlZLU1NLUREVGhoOm1tVFpEXG4gICAgLSBZWVlZLU1NLUREVGhoOm1tOnNzVFpEXG4gICAgLSBZWVlZLU1NLUREVGhoOm1tOnNzLnNUWkQgXG4gICAgLSBUWkQgPSAoWiBvciAraGg6bW0gb3IgLWhoOm1tKVxuKi9cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgXG4gICAgICAgICAgICArICcoWzAtOV17NH0pXFxcXC0oWzAtOV17MSwyfSlcXFxcLShbMC05XXsxLDJ9KSdcbiAgICAgICAgICAgICsgJyg/OlQnIC8vLi5cbiAgICAgICAgICAgICAgICArICcoWzAtOV17MSwyfSk6KFswLTldezEsMn0pJyAvLyBoaDptbVxuICAgICAgICAgICAgICAgICsgJyg/OjooWzAtOV17MSwyfSkoPzpcXFxcLihcXFxcZHsxLDR9KSk/KT8nIC8vIDpzcy5zXG4gICAgICAgICAgICAgICAgKyAnKD86WnwoWystXVxcXFxkezJ9KTo/KFxcXFxkezJ9KT8pPycgLy8gVFpEIChaIG9yIMKxaGg6bW0gb3IgwrFoaG1tIG9yIMKxaGgpXG4gICAgICAgICAgICArICcpPycgIC8vLi5cbiAgICAgICAgICAgICsgJyg/PVxcXFxXfCQpJywgJ2knKTtcblxudmFyIFlFQVJfTlVNQkVSX0dST1VQID0gMjtcbnZhciBNT05USF9OVU1CRVJfR1JPVVAgPSAzO1xudmFyIERBVEVfTlVNQkVSX0dST1VQICA9IDQ7XG52YXIgSE9VUl9OVU1CRVJfR1JPVVAgID0gNTtcbnZhciBNSU5VVEVfTlVNQkVSX0dST1VQID0gNjtcbnZhciBTRUNPTkRfTlVNQkVSX0dST1VQID0gNztcbnZhciBNSUxMSVNFQ09ORF9OVU1CRVJfR1JPVVAgPSA4O1xudmFyIFRaRF9IT1VSX09GRlNFVF9HUk9VUCA9IDk7XG52YXIgVFpEX01JTlVURV9PRkZTRVRfR1JPVVAgPSAxMDtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFTklTT0Zvcm1hdFBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIFxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxuICAgIFxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7IFxuICAgICAgICBcbiAgICAgICAgdmFyIHRleHQgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHBhcnNlSW50KG1hdGNoW1lFQVJfTlVNQkVSX0dST1VQXSkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIHBhcnNlSW50KG1hdGNoW01PTlRIX05VTUJFUl9HUk9VUF0pKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgcGFyc2VJbnQobWF0Y2hbREFURV9OVU1CRVJfR1JPVVBdKSk7XG5cbiAgICAgICAgaWYgKG1vbWVudChyZXN1bHQuc3RhcnQuZ2V0KCdtb250aCcpKSA+IDEyIHx8IG1vbWVudChyZXN1bHQuc3RhcnQuZ2V0KCdtb250aCcpKSA8IDEgfHxcbiAgICAgICAgICAgIG1vbWVudChyZXN1bHQuc3RhcnQuZ2V0KCdkYXknKSkgPiAzMSB8fCBtb21lbnQocmVzdWx0LnN0YXJ0LmdldCgnZGF5JykpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbSE9VUl9OVU1CRVJfR1JPVVBdICE9IG51bGwpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KG1hdGNoW0hPVVJfTlVNQkVSX0dST1VQXSkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWludXRlJyxcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQobWF0Y2hbTUlOVVRFX05VTUJFUl9HUk9VUF0pKTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoW1NFQ09ORF9OVU1CRVJfR1JPVVBdICE9IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3NlY29uZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUludChtYXRjaFtTRUNPTkRfTlVNQkVSX0dST1VQXSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWF0Y2hbTUlMTElTRUNPTkRfTlVNQkVSX0dST1VQXSAhPSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaWxsaXNlY29uZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUludChtYXRjaFtNSUxMSVNFQ09ORF9OVU1CRVJfR1JPVVBdKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFtUWkRfSE9VUl9PRkZTRVRfR1JPVVBdID09IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3RpbWV6b25lT2Zmc2V0JywgMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdmFyIG1pbnV0ZU9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIGhvdXJPZmZzZXQgPSBwYXJzZUludChtYXRjaFtUWkRfSE9VUl9PRkZTRVRfR1JPVVBdKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbVFpEX01JTlVURV9PRkZTRVRfR1JPVVBdICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZU9mZnNldCA9IHBhcnNlSW50KG1hdGNoW1RaRF9NSU5VVEVfT0ZGU0VUX0dST1VQXSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gaG91ck9mZnNldCAqIDYwO1xuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCAtPSBtaW51dGVPZmZzZXQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IG1pbnV0ZU9mZnNldDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd0aW1lem9uZU9mZnNldCcsIG9mZnNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJlc3VsdC50YWdzWydFTklTT0Zvcm1hdFBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG59XG5cbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcbnZhciB1dGlsICA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0VOJyk7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnKFxcXFxXfF4pJyArXG4gICAgICAgICcoPzpvblxcXFxzKj8pPycgK1xuICAgICAgICAnKD86KFN1bmRheXxNb25kYXl8VHVlc2RheXxXZWRuZXNkYXl8VGh1cnNkYXl8RnJpZGF5fFNhdHVyZGF5fFN1bnxNb258VHVlfFdlZHxUaHV8RnJpfFNhdClcXFxccyosP1xcXFxzKik/JyArXG4gICAgICAgICcoKFswLTldezEsMn0pKD86c3R8bmR8cmR8dGgpP3wnICsgdXRpbC5PUkRJTkFMX1dPUkRTX1BBVFRFUk4gKyAnKScgK1xuICAgICAgICAnKD86XFxcXHMqJyArXG4gICAgICAgICAgICAnKD86dG98XFxcXC18XFxcXOKAk3x1bnRpbHx0aHJvdWdofHRpbGx8XFxcXHMpXFxcXHMqJyArXG4gICAgICAgICAgICAnKChbMC05XXsxLDJ9KSg/OnN0fG5kfHJkfHRoKT98JyArIHV0aWwuT1JESU5BTF9XT1JEU19QQVRURVJOICsgJyknICtcbiAgICAgICAgJyk/XFxcXHMqKD86b2YpP1xcXFxzKicgK1xuICAgICAgICAnKEphbig/OnVhcnl8XFxcXC4pP3xGZWIoPzpydWFyeXxcXFxcLik/fE1hcig/OmNofFxcXFwuKT98QXByKD86aWx8XFxcXC4pP3xNYXl8SnVuKD86ZXxcXFxcLik/fEp1bCg/Onl8XFxcXC4pP3xBdWcoPzp1c3R8XFxcXC4pP3xTZXAoPzp0ZW1iZXJ8XFxcXC4pP3xPY3QoPzpvYmVyfFxcXFwuKT98Tm92KD86ZW1iZXJ8XFxcXC4pP3xEZWMoPzplbWJlcnxcXFxcLik/KScgK1xuICAgICAgICAnKD86JyArXG4gICAgICAgICAgICAnLD9cXFxccyooWzAtOV17MSw0fSg/IVteXFxcXHNdXFxcXGQpKScgK1xuICAgICAgICAgICAgJyhcXFxccyooPzpCRXxBRHxCQykpPycgK1xuICAgICAgICAnKT8nICtcbiAgICAgICAgJyg/PVxcXFxXfCQpJywgJ2knXG4gICAgKTtcblxudmFyIFdFRUtEQVlfR1JPVVAgPSAyO1xudmFyIERBVEVfR1JPVVAgPSAzO1xudmFyIERBVEVfTlVNX0dST1VQID0gNDtcbnZhciBEQVRFX1RPX0dST1VQID0gNTtcbnZhciBEQVRFX1RPX05VTV9HUk9VUCA9IDY7XG52YXIgTU9OVEhfTkFNRV9HUk9VUCA9IDc7XG52YXIgWUVBUl9HUk9VUCA9IDg7XG52YXIgWUVBUl9CRV9HUk9VUCA9IDk7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRU5Nb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICB0ZXh0OiBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpLFxuICAgICAgICAgICAgaW5kZXg6IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoLFxuICAgICAgICAgICAgcmVmOiByZWZcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfTkFNRV9HUk9VUF07XG4gICAgICAgIG1vbnRoID0gdXRpbC5NT05USF9PRkZTRVRbbW9udGgudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgdmFyIGRheSA9IG1hdGNoW0RBVEVfTlVNX0dST1VQXSA/XG4gICAgICAgICAgICBwYXJzZUludChtYXRjaFtEQVRFX05VTV9HUk9VUF0pOlxuICAgICAgICAgICAgdXRpbC5PUkRJTkFMX1dPUkRTW21hdGNoW0RBVEVfR1JPVVBdLnRyaW0oKS5yZXBsYWNlKCctJywgJyAnKS50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICB2YXIgeWVhciA9IG51bGw7XG4gICAgICAgIGlmIChtYXRjaFtZRUFSX0dST1VQXSkge1xuICAgICAgICAgICAgeWVhciA9IG1hdGNoW1lFQVJfR1JPVVBdO1xuICAgICAgICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIpO1xuXG4gICAgICAgICAgICBpZihtYXRjaFtZRUFSX0JFX0dST1VQXSl7XG5cbiAgICAgICAgICAgICAgICBpZiAoL0JFL2kudGVzdChtYXRjaFtZRUFSX0JFX0dST1VQXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQnVkZGhpc3QgRXJhXG4gICAgICAgICAgICAgICAgICAgIHllYXIgPSB5ZWFyIC0gNTQzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoL0JDL2kudGVzdChtYXRjaFtZRUFSX0JFX0dST1VQXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQmVmb3JlIENocmlzdFxuICAgICAgICAgICAgICAgICAgICB5ZWFyID0gLXllYXI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXIgPCAxMCkge1xuXG4gICAgICAgICAgICAgICAgLy8gcmVxdWlyZSBzaW5nbGUgZGlnaXQgeWVhcnMgdG8gYWx3YXlzIGhhdmUgQkMvQURcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDwgMTAwKXtcblxuICAgICAgICAgICAgICAgIHllYXIgPSB5ZWFyICsgMjAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHllYXIpe1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF5KTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHllYXIpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvL0ZpbmQgdGhlIG1vc3QgYXBwcm9wcmlhdGVkIHllYXJcbiAgICAgICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgICAgIHJlZk1vbWVudC5tb250aChtb250aCAtIDEpO1xuICAgICAgICAgICAgcmVmTW9tZW50LmRhdGUoZGF5KTtcbiAgICAgICAgICAgIHJlZk1vbWVudC55ZWFyKG1vbWVudChyZWYpLnllYXIoKSk7XG5cbiAgICAgICAgICAgIHZhciBuZXh0WWVhciA9IHJlZk1vbWVudC5jbG9uZSgpLmFkZCgxLCAneScpO1xuICAgICAgICAgICAgdmFyIGxhc3RZZWFyID0gcmVmTW9tZW50LmNsb25lKCkuYWRkKC0xLCAneScpO1xuICAgICAgICAgICAgaWYoIE1hdGguYWJzKG5leHRZZWFyLmRpZmYobW9tZW50KHJlZikpKSA8IE1hdGguYWJzKHJlZk1vbWVudC5kaWZmKG1vbWVudChyZWYpKSkgKXtcbiAgICAgICAgICAgICAgICByZWZNb21lbnQgPSBuZXh0WWVhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIE1hdGguYWJzKGxhc3RZZWFyLmRpZmYobW9tZW50KHJlZikpKSA8IE1hdGguYWJzKHJlZk1vbWVudC5kaWZmKG1vbWVudChyZWYpKSkgKXtcbiAgICAgICAgICAgICAgICByZWZNb21lbnQgPSBsYXN0WWVhcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF5KTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgcmVmTW9tZW50LnllYXIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZWVrZGF5IGNvbXBvbmVudFxuICAgICAgICBpZiAobWF0Y2hbV0VFS0RBWV9HUk9VUF0pIHtcbiAgICAgICAgICAgIHZhciB3ZWVrZGF5ID0gbWF0Y2hbV0VFS0RBWV9HUk9VUF07XG4gICAgICAgICAgICB3ZWVrZGF5ID0gdXRpbC5XRUVLREFZX09GRlNFVFt3ZWVrZGF5LnRvTG93ZXJDYXNlKCldXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd3ZWVrZGF5Jywgd2Vla2RheSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUZXh0IGNhbiBiZSAncmFuZ2UnIHZhbHVlLiBTdWNoIGFzICcxMiAtIDEzIEphbnVhcnkgMjAxMidcbiAgICAgICAgaWYgKG1hdGNoW0RBVEVfVE9fR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgZW5kRGF0ZSA9IG1hdGNoW0RBVEVfVE9fTlVNX0dST1VQXSA/XG4gICAgICAgICAgICAgICAgcGFyc2VJbnQobWF0Y2hbREFURV9UT19OVU1fR1JPVVBdKTpcbiAgICAgICAgICAgICAgICB1dGlsLk9SRElOQUxfV09SRFNbbWF0Y2hbREFURV9UT19HUk9VUF0udHJpbSgpLnJlcGxhY2UoJy0nLCAnICcpLnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICAgICAgICByZXN1bHQuZW5kID0gcmVzdWx0LnN0YXJ0LmNsb25lKCk7XG4gICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignZGF5JywgZW5kRGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQudGFnc1snRU5Nb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn07XG4iLCIvKlxuXG4gICAgVGhlIHBhcnNlciBmb3IgcGFyc2luZyBVUydzIGRhdGUgZm9ybWF0IHRoYXQgYmVnaW4gd2l0aCBtb250aCdzIG5hbWUuXG5cbiAgICBFWC5cbiAgICAgICAgLSBKYW51YXJ5IDEzXG4gICAgICAgIC0gSmFudWFyeSAxMywgMjAxMlxuICAgICAgICAtIEphbnVhcnkgMTMgLSAxNSwgMjAxMlxuICAgICAgICAtIFR1ZXNkYXksIEphbnVhcnkgMTMsIDIwMTJcblxuICAgIFdhdGNoIG91dCBmb3I6XG4gICAgICAgIC0gSmFudWFyeSAxMjowMFxuICAgICAgICAtIEphbnVhcnkgMTIuNDRcbiAgICAgICAgLSBKYW51YXJ5IDEyMjIzNDRcbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcblxudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG52YXIgdXRpbCAgPSByZXF1aXJlKCcuLi8uLi91dGlscy9FTicpO1xuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICcoPzonICtcbiAgICAgICAgJyg/Om9uXFxcXHMqPyk/JyArXG4gICAgICAgICcoU3VuZGF5fE1vbmRheXxUdWVzZGF5fFdlZG5lc2RheXxUaHVyc2RheXxGcmlkYXl8U2F0dXJkYXl8U3VuXFxcXC4/fE1vblxcXFwuP3xUdWVcXFxcLj98V2VkXFxcXC4/fFRodVxcXFwuP3xGcmlcXFxcLj98U2F0XFxcXC4/KScgK1xuICAgICdcXFxccyosP1xcXFxzKik/JyArXG4gICAgJyhKYW5cXFxcLj98SmFudWFyeXxGZWJcXFxcLj98RmVicnVhcnl8TWFyXFxcXC4/fE1hcmNofEFwclxcXFwuP3xBcHJpbHxNYXlcXFxcLj98SnVuXFxcXC4/fEp1bmV8SnVsXFxcXC4/fEp1bHl8QXVnXFxcXC4/fEF1Z3VzdHxTZXBcXFxcLj98U2VwdFxcXFwuP3xTZXB0ZW1iZXJ8T2N0XFxcXC4/fE9jdG9iZXJ8Tm92XFxcXC4/fE5vdmVtYmVyfERlY1xcXFwuP3xEZWNlbWJlciknICtcbiAgICAnXFxcXHMqJyArXG4gICAgJygoWzAtOV17MSwyfSkoPzpzdHxuZHxyZHx0aCk/fCcgKyB1dGlsLk9SRElOQUxfV09SRFNfUEFUVEVSTiArJylcXFxccyonICtcbiAgICAnKD86JyArXG4gICAgICAgICcoPzp0b3xcXFxcLSlcXFxccyonICtcbiAgICAgICAgJygoWzAtOV17MSwyfSkoPzpzdHxuZHxyZHx0aCk/fCAnICsgdXRpbC5PUkRJTkFMX1dPUkRTX1BBVFRFUk4gKyAnKVxcXFxzKicgK1xuICAgICcpPycgK1xuICAgICcoPzonICtcbiAgICAgICAgJ1xcXFxzKiw/XFxcXHMqKD86KFswLTldezR9KVxcXFxzKihCRXxBRHxCQyk/fChbMC05XXsxLDR9KVxcXFxzKihBRHxCQykpXFxcXHMqJyArXG4gICAgJyk/JyArXG4gICAgJyg/PVxcXFxXfCQpKD8hXFxcXDpcXFxcZCknLCAnaScpO1xuXG52YXIgV0VFS0RBWV9HUk9VUCA9IDI7XG52YXIgTU9OVEhfTkFNRV9HUk9VUCA9IDM7XG52YXIgREFURV9HUk9VUCA9IDQ7XG52YXIgREFURV9OVU1fR1JPVVAgPSA1O1xudmFyIERBVEVfVE9fR1JPVVAgPSA2O1xudmFyIERBVEVfVE9fTlVNX0dST1VQID0gNztcbnZhciBZRUFSX0dST1VQID0gODtcbnZhciBZRUFSX0JFX0dST1VQID0gOTtcbnZhciBZRUFSX0dST1VQMiA9IDEwO1xudmFyIFlFQVJfQkVfR1JPVVAyID0gMTE7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRU5Nb250aE5hbWVNaWRkbGVFbmRpYW5QYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICB0ZXh0OiBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpLFxuICAgICAgICAgICAgaW5kZXg6IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoLFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfTkFNRV9HUk9VUF07XG4gICAgICAgIG1vbnRoID0gdXRpbC5NT05USF9PRkZTRVRbbW9udGgudG9Mb3dlckNhc2UoKV07XG4gICAgICAgIHZhciBkYXkgPSBtYXRjaFtEQVRFX05VTV9HUk9VUF0gP1xuICAgICAgICAgICAgcGFyc2VJbnQobWF0Y2hbREFURV9OVU1fR1JPVVBdKSA6XG4gICAgICAgICAgICB1dGlsLk9SRElOQUxfV09SRFNbbWF0Y2hbREFURV9HUk9VUF0udHJpbSgpLnJlcGxhY2UoJy0nLCAnICcpLnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICAgIHZhciB5ZWFyID0gbnVsbDtcbiAgICAgICAgaWYgKG1hdGNoW1lFQVJfR1JPVVBdIHx8IG1hdGNoW1lFQVJfR1JPVVAyXSkge1xuICAgICAgICAgICAgeWVhciA9IG1hdGNoW1lFQVJfR1JPVVBdIHx8IG1hdGNoW1lFQVJfR1JPVVAyXTtcbiAgICAgICAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyKTtcblxuICAgICAgICAgICAgdmFyIHllYXJCRSA9IG1hdGNoW1lFQVJfQkVfR1JPVVBdIHx8IG1hdGNoW1lFQVJfQkVfR1JPVVAyXTtcbiAgICAgICAgICAgIGlmICh5ZWFyQkUpIHtcbiAgICAgICAgICAgICAgICBpZiAoL0JFL2kudGVzdCh5ZWFyQkUpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEJ1ZGRoaXN0IEVyYVxuICAgICAgICAgICAgICAgICAgICB5ZWFyID0geWVhciAtIDU0MztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKC9CQy9pLnRlc3QoeWVhckJFKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBCZWZvcmUgQ2hyaXN0XG4gICAgICAgICAgICAgICAgICAgIHllYXIgPSAteWVhcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXIgPCAxMDApe1xuXG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgKyAyMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoeWVhcil7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBtb250aCk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgeWVhcik7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vRmluZCB0aGUgbW9zdCBhcHByb3ByaWF0ZWQgeWVhclxuICAgICAgICAgICAgdmFyIHJlZk1vbWVudCA9IG1vbWVudChyZWYpO1xuICAgICAgICAgICAgcmVmTW9tZW50Lm1vbnRoKG1vbnRoIC0gMSk7XG4gICAgICAgICAgICByZWZNb21lbnQuZGF0ZShkYXkpO1xuXG4gICAgICAgICAgICB2YXIgbmV4dFllYXIgPSByZWZNb21lbnQuY2xvbmUoKS5hZGQoMSwgJ3knKTtcbiAgICAgICAgICAgIHZhciBsYXN0WWVhciA9IHJlZk1vbWVudC5jbG9uZSgpLmFkZCgtMSwgJ3knKTtcbiAgICAgICAgICAgIGlmKCBNYXRoLmFicyhuZXh0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7XG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbmV4dFllYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBNYXRoLmFicyhsYXN0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7XG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbGFzdFllYXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIHJlZk1vbWVudC55ZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Vla2RheSBjb21wb25lbnRcbiAgICAgICAgaWYgKG1hdGNoW1dFRUtEQVlfR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgd2Vla2RheSA9IG1hdGNoW1dFRUtEQVlfR1JPVVBdO1xuICAgICAgICAgICAgd2Vla2RheSA9IHV0aWwuV0VFS0RBWV9PRkZTRVRbd2Vla2RheS50b0xvd2VyQ2FzZSgpXVxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignd2Vla2RheScsIHdlZWtkYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGV4dCBjYW4gYmUgJ3JhbmdlJyB2YWx1ZS4gU3VjaCBhcyAnSmFudWFyeSAxMiAtIDEzLCAyMDEyJ1xuICAgICAgICBpZiAobWF0Y2hbREFURV9UT19HUk9VUF0pIHtcbiAgICAgICAgICAgIHZhciBlbmREYXRlID0gbWF0Y2hbREFURV9UT19OVU1fR1JPVVBdID9cbiAgICAgICAgICAgICAgICBlbmREYXRlID0gcGFyc2VJbnQobWF0Y2hbREFURV9UT19OVU1fR1JPVVBdKSA6XG4gICAgICAgICAgICAgICAgdXRpbC5PUkRJTkFMX1dPUkRTW21hdGNoW0RBVEVfVE9fR1JPVVBdLnJlcGxhY2UoJy0nLCAnICcpLnRyaW0oKS50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICAgICAgcmVzdWx0LmVuZCA9IHJlc3VsdC5zdGFydC5jbG9uZSgpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2RheScsIGVuZERhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VOTW9udGhOYW1lTWlkZGxlRW5kaWFuUGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn07IiwiLypcbiAgICBcbiAgICBUaGUgcGFyc2VyIGZvciBwYXJzaW5nIG1vbnRoIG5hbWUgYW5kIHllYXIuXG4gICAgXG4gICAgRVguIFxuICAgICAgICAtIEphbnVhcnlcbiAgICAgICAgLSBKYW51YXJ5IDIwMTJcbiAgICAgICAgLSBKYW51YXJ5LCAyMDEyXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5cbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xudmFyIHV0aWwgID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvRU4nKTtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXnxcXFxcRFxcXFxzK3xbXlxcXFx3XFxcXHNdKScgK1xuICAgICcoSmFuXFxcXC4/fEphbnVhcnl8RmViXFxcXC4/fEZlYnJ1YXJ5fE1hclxcXFwuP3xNYXJjaHxBcHJcXFxcLj98QXByaWx8TWF5XFxcXC4/fEp1blxcXFwuP3xKdW5lfEp1bFxcXFwuP3xKdWx5fEF1Z1xcXFwuP3xBdWd1c3R8U2VwXFxcXC4/fFNlcHRcXFxcLj98U2VwdGVtYmVyfE9jdFxcXFwuP3xPY3RvYmVyfE5vdlxcXFwuP3xOb3ZlbWJlcnxEZWNcXFxcLj98RGVjZW1iZXIpJyArIFxuICAgICdcXFxccyonICtcbiAgICAnKD86JyArXG4gICAgICAgICdbLC1dP1xcXFxzKihbMC05XXs0fSkoXFxcXHMqQkV8QUR8QkMpPycgK1xuICAgICcpPycgK1xuICAgICcoPz1bXlxcXFxzXFxcXHddfFxcXFxzK1teMC05XXxcXFxccyskfCQpJywgJ2knKTtcblxudmFyIE1PTlRIX05BTUVfR1JPVVAgPSAyO1xudmFyIFlFQVJfR1JPVVAgPSAzO1xudmFyIFlFQVJfQkVfR1JPVVAgPSA0O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOTW9udGhOYW1lUGFyc2VyKCl7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cbiAgICBcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICB0ZXh0OiBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpLFxuICAgICAgICAgICAgaW5kZXg6IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoLFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIFxuICAgICAgICB2YXIgbW9udGggPSBtYXRjaFtNT05USF9OQU1FX0dST1VQXTtcbiAgICAgICAgbW9udGggPSB1dGlsLk1PTlRIX09GRlNFVFttb250aC50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICB2YXIgZGF5ID0gMTtcblxuICAgICAgICB2YXIgeWVhciA9IG51bGw7XG4gICAgICAgIGlmIChtYXRjaFtZRUFSX0dST1VQXSkge1xuICAgICAgICAgICAgeWVhciA9IG1hdGNoW1lFQVJfR1JPVVBdO1xuICAgICAgICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIpO1xuXG4gICAgICAgICAgICBpZihtYXRjaFtZRUFSX0JFX0dST1VQXSl7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoW1lFQVJfQkVfR1JPVVBdLm1hdGNoKC9CRS8pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEJ1ZGRoaXN0IEVyYVxuICAgICAgICAgICAgICAgICAgICB5ZWFyID0geWVhciAtIDU0MztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW1lFQVJfQkVfR1JPVVBdLm1hdGNoKC9CQy8pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEJlZm9yZSBDaHJpc3RcbiAgICAgICAgICAgICAgICAgICAgeWVhciA9IC15ZWFyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDwgMTAwKXsgXG5cbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciArIDIwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih5ZWFyKXtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF5KTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHllYXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL0ZpbmQgdGhlIG1vc3QgYXBwcm9wcmlhdGVkIHllYXJcbiAgICAgICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgICAgIHJlZk1vbWVudC5tb250aChtb250aCAtIDEpO1xuICAgICAgICAgICAgcmVmTW9tZW50LmRhdGUoZGF5KTtcblxuICAgICAgICAgICAgdmFyIG5leHRZZWFyID0gcmVmTW9tZW50LmNsb25lKCkuYWRkKDEsICd5Jyk7XG4gICAgICAgICAgICB2YXIgbGFzdFllYXIgPSByZWZNb21lbnQuY2xvbmUoKS5hZGQoLTEsICd5Jyk7XG4gICAgICAgICAgICBpZiggTWF0aC5hYnMobmV4dFllYXIuZGlmZihtb21lbnQocmVmKSkpIDwgTWF0aC5hYnMocmVmTW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApeyAgXG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbmV4dFllYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBNYXRoLmFicyhsYXN0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7IFxuICAgICAgICAgICAgICAgIHJlZk1vbWVudCA9IGxhc3RZZWFyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIHJlZk1vbWVudC55ZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VOTW9udGhOYW1lUGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG52YXIgdXRpbCAgPSByZXF1aXJlKCcuLi8uLi91dGlscy9FTicpO1xuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICcobmV4dHxsYXN0fHBhc3QpXFxcXHMqJyArXG4gICAgJygnKyB1dGlsLklOVEVHRVJfV09SRFNfUEFUVEVSTiArICd8WzAtOV0rfGZld3xoYWxmKD86XFxcXHMqYW4/KT8pP1xcXFxzKicgK1xuICAgICcoc2Vjb25kcz98bWluKD86dXRlKT9zP3xob3Vycz98ZGF5cz98d2Vla3M/fG1vbnRocz98eWVhcnM/KSg/PVxcXFxzKiknICtcbiAgICAnKD89XFxcXFd8JCknLCAnaSdcbik7XG5cbnZhciBNT0RJRklFUl9XT1JEX0dST1VQID0gMjtcbnZhciBNVUxUSVBMSUVSX1dPUkRfR1JPVVAgPSAzO1xudmFyIFJFTEFUSVZFX1dPUkRfR1JPVVAgPSA0O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOUmVsYXRpdmVEYXRlRm9ybWF0UGFyc2VyKCl7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH07XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgbW9kaWZpZXIgPSBtYXRjaFtNT0RJRklFUl9XT1JEX0dST1VQXS50b0xvd2VyQ2FzZSgpLm1hdGNoKC9ebmV4dC8pID8gMSA6IC0xO1xuICAgICAgICB2YXIgdGV4dCAgPSBtYXRjaFswXTtcbiAgICAgICAgdGV4dCAgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZlxuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VOUmVsYXRpdmVEYXRlRm9ybWF0UGFyc2VyJ10gPSB0cnVlO1xuXG4gICAgICAgIHZhciBudW0gPSBtYXRjaFtNVUxUSVBMSUVSX1dPUkRfR1JPVVBdID09PSB1bmRlZmluZWQgPyAnJyA6IG1hdGNoWzNdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICh1dGlsLklOVEVHRVJfV09SRFNbbnVtXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBudW0gPSB1dGlsLklOVEVHRVJfV09SRFNbbnVtXTtcbiAgICAgICAgfSBlbHNlIGlmIChudW0gPT09ICcnKXtcbiAgICAgICAgICAgIG51bSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtLm1hdGNoKC9mZXcvaSkpe1xuICAgICAgICAgICAgbnVtID0gMztcbiAgICAgICAgfSBlbHNlIGlmIChudW0ubWF0Y2goL2hhbGYvaSkpIHtcbiAgICAgICAgICAgIG51bSA9IDAuNTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG51bSA9IHBhcnNlSW50KG51bSk7XG4gICAgICAgIH1cblxuICAgICAgICBudW0gKj0gbW9kaWZpZXI7XG5cbiAgICAgICAgdmFyIGRhdGUgPSBtb21lbnQocmVmKTtcbiAgICAgICAgaWYgKG1hdGNoW1JFTEFUSVZFX1dPUkRfR1JPVVBdLm1hdGNoKC9kYXl8d2Vla3xtb250aHx5ZWFyL2kpKSB7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFtSRUxBVElWRV9XT1JEX0dST1VQXS5tYXRjaCgvZGF5L2kpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnZCcpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW1JFTEFUSVZFX1dPUkRfR1JPVVBdLm1hdGNoKC93ZWVrL2kpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQobnVtICogNywgJ2QnKTtcbiAgICAgICAgICAgICAgICAvLyBXZSBkb24ndCBrbm93IHRoZSBleGFjdCBkYXRlIGZvciBuZXh0L2xhc3Qgd2VlayBzbyB3ZSBpbXBseVxuICAgICAgICAgICAgICAgIC8vIHRoZW1cbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtSRUxBVElWRV9XT1JEX0dST1VQXS5tYXRjaCgvbW9udGgvaSkpIHtcbiAgICAgICAgICAgICAgICBkYXRlLmFkZChudW0sICdtb250aCcpO1xuICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IGtub3cgdGhlIGV4YWN0IGRheSBmb3IgbmV4dC9sYXN0IG1vbnRoXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtSRUxBVElWRV9XT1JEX0dST1VQXS5tYXRjaCgveWVhci9pKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuYWRkKG51bSwgJ3llYXInKTtcbiAgICAgICAgICAgICAgICAvLyBXZSBkb24ndCBrbm93IHRoZSBleGFjdCBkYXkgZm9yIG1vbnRoIG9uIG5leHQvbGFzdCB5ZWFyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbUkVMQVRJVkVfV09SRF9HUk9VUF0ubWF0Y2goL2hvdXIvaSkpIHtcblxuICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnaG91cicpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtaW51dGUnLCBkYXRlLm1pbnV0ZSgpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnc2Vjb25kJywgZGF0ZS5zZWNvbmQoKSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtSRUxBVElWRV9XT1JEX0dST1VQXS5tYXRjaCgvbWluL2kpKSB7XG5cbiAgICAgICAgICAgIGRhdGUuYWRkKG51bSwgJ21pbnV0ZScpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWludXRlJywgZGF0ZS5taW51dGUoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3NlY29uZCcsIGRhdGUuc2Vjb25kKCkpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbUkVMQVRJVkVfV09SRF9HUk9VUF0ubWF0Y2goL3NlY29uZC9pKSkge1xuXG4gICAgICAgICAgICBkYXRlLmFkZChudW0sICdzZWNvbmQnKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3NlY29uZCcsIGRhdGUuc2Vjb25kKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWludXRlJywgZGF0ZS5taW51dGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdob3VyJywgZGF0ZS5ob3VyKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXRlLmRhdGUoKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn07XG4iLCIvKlxuICAgIERhdGUgZm9ybWF0IHdpdGggc2xhc2ggXCIvXCIgKGFsc28gXCItXCIgYW5kIFwiLlwiKSBiZXR3ZWVuIG51bWJlcnNcbiAgICAtIFR1ZXNkYXkgMTEvMy8yMDE1IFxuICAgIC0gMTEvMy8yMDE1XG4gICAgLSAxMS8zXG5cbiAgICBCeSBkZWZhdWx0IHRoZSBwYXNlciB1cyBcIm1pZGRsZS1lbmRpZW5cIiBmb3JtYXQgKFVTIEVuZ2xpc2gpLFxuICAgIHRoZW4gZmFsbGJhY2sgdG8gbGl0dGxlLWVuZGlhbiBpZiBmYWlsZWQuXG4gICAgLSAxMS8zLzIwMTUgPSBOb3ZlbWJlciAzcmQsIDIwMTVcbiAgICAtIDIzLzQvMjAxNSA9IEFwcmlsIDIzdGgsIDIwMTVcblxuICAgIElmIFwibGl0dGxlRW5kaWFuXCIgY29uZmlnIGlzIHNldCwgdGhlIHBhcnNlciB3aWxsIHRyeSB0aGUgbGl0dGxlLWVuZGlhbiBmaXJzdC4gXG4gICAgLSAxMS8zLzIwMTUgPSBNYXJjaCAxMXRoLCAyMDE1XG4qL1xudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnKFxcXFxXfF4pJyArXG4gICAgJyg/OicgK1xuICAgICAgICAnKD86b25cXFxccyo/KT8nICtcbiAgICAgICAgJygoPzpzdW58bW9ufHR1ZXM/fHdlZCg/Om5lcyk/fHRodSg/OnJzPyk/fGZyaXxzYXQoPzp1cik/KSg/OmRheSk/KScgK1xuICAgICAgICAnXFxcXHMqXFxcXCw/XFxcXHMqJyArXG4gICAgJyk/JyArXG4gICAgJyhbMC0zXXswLDF9WzAtOV17MX0pW1xcXFwvXFxcXC5cXFxcLV0oWzAtM117MCwxfVswLTldezF9KScgK1xuICAgICcoPzonICtcbiAgICAgICAgJ1tcXFxcL1xcXFwuXFxcXC1dJyArXG4gICAgICAgICcoWzAtOV17NH1cXHMqXFwsP1xccyp8WzAtOV17Mn1cXHMqXFwsP1xccyopJyArXG4gICAgJyk/JyArXG4gICAgJyhcXFxcV3wkKScsICdpJyk7XG5cbnZhciBEQVlTX09GRlNFVCA9IHsgJ3N1bmRheSc6IDAsICdzdW4nOiAwLCAnbW9uZGF5JzogMSwgJ21vbic6IDEsJ3R1ZXNkYXknOiAyLCAnd2VkbmVzZGF5JzogMywgJ3dlZCc6IDMsXG4gICAgJ3RodXJzZGF5JzogNCwgJ3RodXInOiA0LCdmcmlkYXknOiA1LCAnZnJpJzogNSwnc2F0dXJkYXknOiA2LCAnc2F0JzogNix9XG5cblxudmFyIE9QRU5OSU5HX0dST1VQID0gMTtcbnZhciBFTkRJTkdfR1JPVVAgPSA2O1xuXG52YXIgV0VFS0RBWV9HUk9VUCA9IDI7XG5cblxudmFyIEZJUlNUX05VTUJFUlNfR1JPVVAgPSAzO1xudmFyIFNFQ09ORF9OVU1CRVJTX0dST1VQID0gNDtcblxudmFyIFlFQVJfR1JPVVAgPSA1O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOU2xhc2hEYXRlRm9ybWF0UGFyc2VyKGNvbmZpZykge1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICB2YXIgbGl0dGxlRW5kaWFuICA9IGNvbmZpZy5saXR0bGVFbmRpYW47XG4gICAgdmFyIE1PTlRIX0dST1VQID0gbGl0dGxlRW5kaWFuID8gU0VDT05EX05VTUJFUlNfR1JPVVAgOiBGSVJTVF9OVU1CRVJTX0dST1VQO1xuICAgIHZhciBEQVlfR1JPVVAgPSBsaXR0bGVFbmRpYW4gPyBGSVJTVF9OVU1CRVJTX0dST1VQIDogU0VDT05EX05VTUJFUlNfR1JPVVA7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBQQVRURVJOOyB9O1xuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG5cbiAgICAgICAgaWYobWF0Y2hbT1BFTk5JTkdfR1JPVVBdID09ICcvJyB8fCBtYXRjaFtFTkRJTkdfR1JPVVBdID09ICcvJykge1xuICAgICAgICAgICAgLy8gTG9uZyBza2lwLCBpZiB0aGVyZSBpcyBzb21lIG92ZXJsYXBwaW5nIGxpa2U6XG4gICAgICAgICAgICAvLyBYWFsvWVkvWlpdXG4gICAgICAgICAgICAvLyBbWFgvWVkvXVpaXG4gICAgICAgICAgICBtYXRjaC5pbmRleCArPSBtYXRjaFswXS5sZW5ndGhcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbT1BFTk5JTkdfR1JPVVBdLmxlbmd0aDtcbiAgICAgICAgdmFyIHRleHQgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbT1BFTk5JTkdfR1JPVVBdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbRU5ESU5HX0dST1VQXS5sZW5ndGgpO1xuXG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZih0ZXh0Lm1hdGNoKC9eXFxkXFwuXFxkJC8pKSByZXR1cm47XG4gICAgICAgIGlmKHRleHQubWF0Y2goL15cXGRcXC5cXGR7MSwyfVxcLlxcZHsxLDJ9JC8pKSByZXR1cm47XG5cbiAgICAgICAgLy8gTU0vZGQgLT4gT0tcbiAgICAgICAgLy8gTU0uZGQgLT4gTkdcbiAgICAgICAgaWYoIW1hdGNoW1lFQVJfR1JPVVBdICYmIG1hdGNoWzBdLmluZGV4T2YoJy8nKSA8IDApIHJldHVybjtcblxuICAgICAgICB2YXIgZGF0ZSA9IG51bGw7XG4gICAgICAgIHZhciB5ZWFyID0gbWF0Y2hbWUVBUl9HUk9VUF0gfHwgbW9tZW50KHJlZikueWVhcigpICsgJyc7XG4gICAgICAgIHZhciBtb250aCA9IG1hdGNoW01PTlRIX0dST1VQXTtcbiAgICAgICAgdmFyIGRheSAgID0gbWF0Y2hbREFZX0dST1VQXTtcblxuICAgICAgICBtb250aCA9IHBhcnNlSW50KG1vbnRoKTtcbiAgICAgICAgZGF5ICA9IHBhcnNlSW50KGRheSk7XG4gICAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyKTtcblxuICAgICAgICBpZihtb250aCA8IDEgfHwgbW9udGggPiAxMikge1xuICAgICAgICAgICAgaWYobW9udGggPiAxMikge1xuICAgICAgICAgICAgICAgIC8vIGRkL21tL3l5eXkgZGF0ZSBmb3JtYXQgaWYgZGF5IGxvb2tzIGxpa2UgYSBtb250aCwgYW5kIG1vbnRoXG4gICAgICAgICAgICAgICAgLy8gbG9va3MgbGlrZSBhIGRheS5cbiAgICAgICAgICAgICAgICBpZiAoZGF5ID49IDEgJiYgZGF5IDw9IDEyICYmIG1vbnRoID49IDEzICYmIG1vbnRoIDw9IDMxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVuYW1iaWd1b3VzXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZGF5ID0gbW9udGg7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoID0gZGF5O1xuICAgICAgICAgICAgICAgICAgICBkYXkgPSB0ZGF5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYm90aCBtb250aCBhbmQgZGF5IGFyZSA8PSAxMlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZGF5IDwgMSB8fCBkYXkgPiAzMSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYoeWVhciA8IDEwMCl7XG4gICAgICAgICAgICBpZiAoeWVhciA+IDUwKSB7XG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgKyAxOTAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciArIDIwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHllYXIpO1xuXG4gICAgICAgIC8vRGF5IG9mIHdlZWtcbiAgICAgICAgaWYobWF0Y2hbV0VFS0RBWV9HUk9VUF0pIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3dlZWtkYXknLCBEQVlTX09GRlNFVFttYXRjaFtXRUVLREFZX0dST1VQXS50b0xvd2VyQ2FzZSgpXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQudGFnc1snRU5TbGFzaERhdGVGb3JtYXRQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn07XG4iLCIvKlxuICAgIERhdGUgZm9ybWF0IHdpdGggc2xhc2ggXCIvXCIgYmV0d2VlbiBudW1iZXJzIGxpa2UgRU5TbGFzaERhdGVGb3JtYXRQYXJzZXIsXG4gICAgYnV0IHRoaXMgcGFyc2VyIGV4cGVjdCB5ZWFyIGJlZm9yZSBtb250aCBhbmQgZGF0ZS4gXG4gICAgLSBZWVlZL01NL0REXG4gICAgLSBZWVlZLU1NLUREXG4gICAgLSBZWVlZLk1NLkREXG4qL1xudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnKFxcXFxXfF4pJyBcbiAgICAgICAgICAgICsgJyhbMC05XXs0fSlbXFxcXC1cXFxcLlxcXFwvXShbMC05XXsxLDJ9KVtcXFxcLVxcXFwuXFxcXC9dKFswLTldezEsMn0pJ1xuICAgICAgICAgICAgKyAnKD89XFxcXFd8JCknLCAnaScpO1xuXG52YXIgWUVBUl9OVU1CRVJfR1JPVVAgPSAyO1xudmFyIE1PTlRIX05VTUJFUl9HUk9VUCA9IDM7XG52YXIgREFURV9OVU1CRVJfR1JPVVAgID0gNDtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFTlNsYXNoRGF0ZUZvcm1hdFN0YXJ0V2l0aFllYXJQYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBcbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cbiAgICBcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBwYXJzZUludChtYXRjaFtZRUFSX05VTUJFUl9HUk9VUF0pKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBwYXJzZUludChtYXRjaFtNT05USF9OVU1CRVJfR1JPVVBdKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIHBhcnNlSW50KG1hdGNoW0RBVEVfTlVNQkVSX0dST1VQXSkpO1xuXG4gICAgICAgIGlmIChtb21lbnQocmVzdWx0LnN0YXJ0LmdldCgnbW9udGgnKSkgPiAxMiB8fCBtb21lbnQocmVzdWx0LnN0YXJ0LmdldCgnbW9udGgnKSkgPCAxIHx8XG4gICAgICAgICAgICBtb21lbnQocmVzdWx0LnN0YXJ0LmdldCgnZGF5JykpID4gMzEgfHwgbW9tZW50KHJlc3VsdC5zdGFydC5nZXQoJ2RheScpKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXN1bHQudGFnc1snRU5EYXRlRm9ybWF0UGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59XG4iLCIvKlxuICAgIE1vbnRoL1llYXIgZGF0ZSBmb3JtYXQgd2l0aCBzbGFzaCBcIi9cIiAoYWxzbyBcIi1cIiBhbmQgXCIuXCIpIGJldHdlZW4gbnVtYmVycyBcbiAgICAtIDExLzA1XG4gICAgLSAwNi8yMDA1XG4qL1xudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnKF58W15cXFxcZC9dXFxcXHMrfFteXFxcXHdcXFxcc10pJyArXG4gICAgJyhbMC05XXwwWzEtOV18MVswMTJdKS8oWzAtOV17NH0pJyArIFxuICAgICcoW15cXFxcZC9dfCQpJywgJ2knKTtcblxudmFyIE9QRU5OSU5HX0dST1VQID0gMTtcbnZhciBFTkRJTkdfR1JPVVAgPSA0O1xuXG52YXIgTU9OVEhfR1JPVVAgPSAyO1xudmFyIFlFQVJfR1JPVVAgPSAzO1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOU2xhc2hNb250aEZvcm1hdFBhcnNlcihhcmd1bWVudCkge1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gUEFUVEVSTjsgfTtcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuICAgICAgICBcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFtPUEVOTklOR19HUk9VUF0ubGVuZ3RoO1xuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFtPUEVOTklOR19HUk9VUF0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSAoMSArIG1hdGNoW0VORElOR19HUk9VUF0ubGVuZ3RoKSkudHJpbSgpO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGRhdGUgPSBudWxsO1xuICAgICAgICB2YXIgeWVhciA9IG1hdGNoW1lFQVJfR1JPVVBdIDtcbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfR1JPVVBdO1xuICAgICAgICB2YXIgZGF5ICAgPSAxO1xuICAgICAgICBcbiAgICAgICAgbW9udGggPSBwYXJzZUludChtb250aCk7XG4gICAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyKTtcblxuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRheSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgeWVhcik7XG5cbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VOU2xhc2hNb250aEZvcm1hdFBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufTtcbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG52YXIgdXRpbCAgPSByZXF1aXJlKCcuLi8uLi91dGlscy9FTicpO1xuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJycgK1xuICAgICcoXFxcXFd8XiknICtcbiAgICAnKD86d2l0aGluXFxcXHMqKT8nICtcbiAgICAnKCcgKyB1dGlsLklOVEVHRVJfV09SRFNfUEFUVEVSTiArICd8WzAtOV0rfGFuPyg/OlxcXFxzKmZldyk/fGhhbGYoPzpcXFxccyphbj8pPylcXFxccyonICtcbiAgICAnKHNlY29uZHM/fG1pbig/OnV0ZSk/cz98aG91cnM/fHdlZWtzP3xkYXlzP3xtb250aHM/fHllYXJzPylcXFxccyonICtcbiAgICAnKD86YWdvfGJlZm9yZXxlYXJsaWVyKSg/PSg/OlxcXFxXfCQpKScsICdpJyk7XG5cbnZhciBTVFJJQ1RfUEFUVEVSTiA9IG5ldyBSZWdFeHAoJycgK1xuICAgICcoXFxcXFd8XiknICtcbiAgICAnKD86d2l0aGluXFxcXHMqKT8nICtcbiAgICAnKFswLTldK3xhbj8pXFxcXHMqJyArXG4gICAgJyhzZWNvbmRzP3xtaW51dGVzP3xob3Vycz98ZGF5cz8pXFxcXHMqJyArXG4gICAgJ2Fnbyg/PSg/OlxcXFxXfCQpKScsICdpJyk7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRU5UaW1lQWdvRm9ybWF0UGFyc2VyKCl7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTdHJpY3RNb2RlKCk/IFNUUklDVF9QQVRURVJOIDogUEFUVEVSTjtcbiAgICB9O1xuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICBpZiAobWF0Y2guaW5kZXggPiAwICYmIHRleHRbbWF0Y2guaW5kZXgtMV0ubWF0Y2goL1xcdy8pKSByZXR1cm4gbnVsbDtcblxuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdO1xuICAgICAgICB0ZXh0ICA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtIG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHJlZjogcmVmXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBudW0gPSBtYXRjaFsyXS50b0xvd2VyQ2FzZSgpIDtcbiAgICAgICAgaWYgKHV0aWwuSU5URUdFUl9XT1JEU1tudW1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG51bSA9IHV0aWwuSU5URUdFUl9XT1JEU1tudW1dO1xuICAgICAgICB9IGVsc2UgaWYobnVtID09PSAnYScgfHwgbnVtID09PSAnYW4nKXtcbiAgICAgICAgICAgIG51bSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtLm1hdGNoKC9mZXcvKSkge1xuICAgICAgICAgICAgbnVtID0gMztcbiAgICAgICAgfSBlbHNlIGlmIChudW0ubWF0Y2goL2hhbGYvKSkge1xuICAgICAgICAgICAgbnVtID0gMC41O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtID0gcGFyc2VJbnQobnVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYXRlID0gbW9tZW50KHJlZik7XG5cbiAgICAgICAgaWYgKG1hdGNoWzNdLm1hdGNoKC9ob3VyfG1pbnxzZWNvbmQvaSkpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvaG91ci9pKSkge1xuXG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQoLW51bSwgJ2hvdXInKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFszXS5tYXRjaCgvbWluL2kpKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnbWludXRlJyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbM10ubWF0Y2goL3NlY29uZC9pKSkge1xuXG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQoLW51bSwgJ3NlY29uZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCBkYXRlLmhvdXIoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBkYXRlLm1pbnV0ZSgpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3NlY29uZCcsIGRhdGUuc2Vjb25kKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnRhZ3NbJ0VOVGltZUFnb0Zvcm1hdFBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL3dlZWsvaSkpIHtcbiAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICd3ZWVrJyk7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd3ZWVrZGF5JywgZGF0ZS5kYXkoKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoWzNdLm1hdGNoKC9kYXkvaSkpIHtcbiAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL21vbnRoL2kpKSB7XG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnbW9udGgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgveWVhci9pKSkge1xuXG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAneWVhcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgfTtcbn1cbiIsIi8qXG5cbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xudmFyIFBhcnNlZENvbXBvbmVudHMgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRDb21wb25lbnRzO1xuXG52YXIgRklSU1RfUkVHX1BBVFRFUk4gID0gbmV3IFJlZ0V4cChcIihefFxcXFxzfFQpXCIgK1xuICAgIFwiKD86KD86YXR8ZnJvbSlcXFxccyopPz9cIiArIFxuICAgIFwiKFxcXFxkezEsNH18bm9vbnxtaWRuaWdodClcIiArIFxuICAgIFwiKD86XCIgKyBcbiAgICAgICAgXCIoPzpcXFxcLnxcXFxcOnxcXFxc77yaKShcXFxcZHsxLDJ9KVwiICsgXG4gICAgICAgIFwiKD86XCIgKyBcbiAgICAgICAgICAgIFwiKD86XFxcXDp8XFxcXO+8mikoXFxcXGR7Mn0pXCIgKyBcbiAgICAgICAgXCIpP1wiICsgXG4gICAgXCIpP1wiICsgXG4gICAgXCIoPzpcXFxccyooQVxcXFwuTVxcXFwufFBcXFxcLk1cXFxcLnxBTT98UE0/KSk/XCIgKyBcbiAgICBcIig/PVxcXFxXfCQpXCIsICdpJyk7XG5cblxudmFyIFNFQ09ORF9SRUdfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqXCIgKyBcbiAgICBcIihcXFxcLXxcXFxc4oCTfFxcXFx+fFxcXFzjgJx8dG98XFxcXD8pXFxcXHMqXCIgKyBcbiAgICBcIihcXFxcZHsxLDR9KVwiICtcbiAgICBcIig/OlwiICsgXG4gICAgICAgIFwiKD86XFxcXC58XFxcXDp8XFxcXO+8mikoXFxcXGR7MSwyfSlcIiArIFxuICAgICAgICBcIig/OlwiICsgXG4gICAgICAgICAgICBcIig/OlxcXFwufFxcXFw6fFxcXFzvvJopKFxcXFxkezEsMn0pXCIgKyBcbiAgICAgICAgXCIpP1wiICsgXG4gICAgXCIpP1wiICsgXG4gICAgXCIoPzpcXFxccyooQVxcXFwuTVxcXFwufFBcXFxcLk1cXFxcLnxBTT98UE0/KSk/XCIgKyBcbiAgICBcIig/PVxcXFxXfCQpXCIsICdpJyk7XG5cbnZhciBIT1VSX0dST1VQICAgID0gMjtcbnZhciBNSU5VVEVfR1JPVVAgID0gMztcbnZhciBTRUNPTkRfR1JPVVAgID0gNDtcbnZhciBBTV9QTV9IT1VSX0dST1VQID0gNTtcblxuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVOVGltZUV4cHJlc3Npb25QYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gRklSU1RfUkVHX1BBVFRFUk47IH1cbiAgICBcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpeyBcbiAgICAgICAgXG4gICAgICAgIC8vIFRoaXMgcGF0dGVybiBjYW4gYmUgb3ZlcmxhcGVkIEV4LiBbMTJdIEFNLCAxWzJdIEFNXG4gICAgICAgIGlmIChtYXRjaC5pbmRleCA+IDAgJiYgdGV4dFttYXRjaC5pbmRleC0xXS5tYXRjaCgvXFx3LykpIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgcmVmTW9tZW50ID0gbW9tZW50KHJlZik7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KCk7XG4gICAgICAgIHJlc3VsdC5yZWYgPSByZWY7XG4gICAgICAgIHJlc3VsdC5pbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICByZXN1bHQudGV4dCAgPSBtYXRjaFswXS5zdWJzdHJpbmcobWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VOVGltZUV4cHJlc3Npb25QYXJzZXInXSA9IHRydWU7XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCAgIHJlZk1vbWVudC5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgcmVmTW9tZW50Lm1vbnRoKCkrMSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsICByZWZNb21lbnQueWVhcigpKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBob3VyID0gMDtcbiAgICAgICAgdmFyIG1pbnV0ZSA9IDA7XG4gICAgICAgIHZhciBtZXJpZGllbSA9IC0xO1xuXG4gICAgICAgIC8vIC0tLS0tIFNlY29uZFxuICAgICAgICBpZihtYXRjaFtTRUNPTkRfR1JPVVBdICE9IG51bGwpeyBcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBwYXJzZUludChtYXRjaFtTRUNPTkRfR1JPVVBdKTtcbiAgICAgICAgICAgIGlmKHNlY29uZCA+PSA2MCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3NlY29uZCcsIHNlY29uZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIC0tLS0tIEhvdXJzXG4gICAgICAgIGlmIChtYXRjaFtIT1VSX0dST1VQXS50b0xvd2VyQ2FzZSgpID09IFwibm9vblwiKXtcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTsgXG4gICAgICAgICAgICBob3VyID0gMTI7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbSE9VUl9HUk9VUF0udG9Mb3dlckNhc2UoKSA9PSBcIm1pZG5pZ2h0XCIpIHtcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMDsgXG4gICAgICAgICAgICBob3VyID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvdXIgPSBwYXJzZUludChtYXRjaFtIT1VSX0dST1VQXSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIC0tLS0tIE1pbnV0ZXNcbiAgICAgICAgaWYobWF0Y2hbTUlOVVRFX0dST1VQXSAhPSBudWxsKXsgXG4gICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChtYXRjaFtNSU5VVEVfR1JPVVBdKTtcbiAgICAgICAgfSBlbHNlIGlmKGhvdXIgPiAxMDApIHsgXG4gICAgICAgICAgICBtaW51dGUgPSBob3VyJTEwMDtcbiAgICAgICAgICAgIGhvdXIgICA9IHBhcnNlSW50KGhvdXIvMTAwKTtcbiAgICAgICAgfSBcbiAgICAgICAgXG4gICAgICAgIGlmKG1pbnV0ZSA+PSA2MCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZihob3VyID4gMjQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VyID49IDEyKSB7IFxuICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gLS0tLS0gQU0gJiBQTSAgXG4gICAgICAgIGlmKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB2YXIgYW1wbSA9IG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZihhbXBtID09IFwiYVwiKXtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDA7IFxuICAgICAgICAgICAgICAgIGlmKGhvdXIgPT0gMTIpIGhvdXIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihhbXBtID09IFwicFwiKXtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDE7IFxuICAgICAgICAgICAgICAgIGlmKGhvdXIgIT0gMTIpIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIGhvdXIpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBtaW51dGUpO1xuXG4gICAgICAgIGlmIChtZXJpZGllbSA+PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtZXJpZGllbScsIG1lcmlkaWVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChob3VyIDwgMTIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICBFeHRyYWN0aW5nIHRoZSAndG8nIGNodW5rXG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIG1hdGNoID0gU0VDT05EX1JFR19QQVRURVJOLmV4ZWModGV4dC5zdWJzdHJpbmcocmVzdWx0LmluZGV4ICsgcmVzdWx0LnRleHQubGVuZ3RoKSk7XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIC8vIE5vdCBhY2NlcHQgbnVtYmVyIG9ubHkgcmVzdWx0XG4gICAgICAgICAgICBpZiAocmVzdWx0LnRleHQubWF0Y2goL15cXGQrJC8pKSB7IFxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvLyBQYXR0ZXJuIFwiWVkuWVkgLVhYWFhcIiBpcyBtb3JlIGxpa2UgdGltZXpvbmUgb2Zmc2V0XG4gICAgICAgIGlmIChtYXRjaFswXS5tYXRjaCgvXlxccyooXFwrfFxcLSlcXHMqXFxkezMsNH0kLykpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZihyZXN1bHQuZW5kID09IG51bGwpe1xuICAgICAgICAgICAgcmVzdWx0LmVuZCA9IG5ldyBQYXJzZWRDb21wb25lbnRzKG51bGwsIHJlc3VsdC5zdGFydC5kYXRlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhvdXIgPSAwO1xuICAgICAgICB2YXIgbWludXRlID0gMDtcbiAgICAgICAgdmFyIG1lcmlkaWVtID0gLTE7XG5cbiAgICAgICAgLy8gLS0tLS0gU2Vjb25kXG4gICAgICAgIGlmKG1hdGNoW1NFQ09ORF9HUk9VUF0gIT0gbnVsbCl7IFxuICAgICAgICAgICAgdmFyIHNlY29uZCA9IHBhcnNlSW50KG1hdGNoW1NFQ09ORF9HUk9VUF0pO1xuICAgICAgICAgICAgaWYoc2Vjb25kID49IDYwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ3NlY29uZCcsIHNlY29uZCk7XG4gICAgICAgIH1cblxuICAgICAgICBob3VyID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuICAgICAgICBcbiAgICAgICAgLy8gLS0tLS0gTWludXRlXG4gICAgICAgIGlmIChtYXRjaFtNSU5VVEVfR1JPVVBdIT0gbnVsbCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChtYXRjaFtNSU5VVEVfR1JPVVBdKTtcbiAgICAgICAgICAgIGlmKG1pbnV0ZSA+PSA2MCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2UgaWYgKGhvdXIgPiAxMDApIHtcblxuICAgICAgICAgICAgbWludXRlID0gaG91ciUxMDA7XG4gICAgICAgICAgICBob3VyICAgPSBwYXJzZUludChob3VyLzEwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtaW51dGUgPj0gNjApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaG91ciA+IDI0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaG91ciA+PSAxMikgeyBcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gLS0tLS0gQU0gJiBQTSBcbiAgICAgICAgaWYgKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdICE9IG51bGwpe1xuXG4gICAgICAgICAgICBpZiAoaG91ciA+IDEyKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgdmFyIGFtcG0gPSBtYXRjaFtBTV9QTV9IT1VSX0dST1VQXVswXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYoYW1wbSA9PSBcImFcIil7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAwOyBcbiAgICAgICAgICAgICAgICBpZihob3VyID09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5lbmQuaXNDZXJ0YWluKCdkYXknKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnZGF5JywgcmVzdWx0LmVuZC5nZXQoJ2RheScpICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGFtcG0gPT0gXCJwXCIpe1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMTsgXG4gICAgICAgICAgICAgICAgaWYoaG91ciAhPSAxMikgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdtZXJpZGllbScpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lcmlkaWVtID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgPT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN0YXJ0LmdldCgnaG91cicpICE9IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdob3VyJywgcmVzdWx0LnN0YXJ0LmdldCgnaG91cicpICsgMTIpOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC50ZXh0ID0gcmVzdWx0LnRleHQgKyBtYXRjaFswXTtcbiAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2hvdXInLCBob3VyKTtcbiAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ21pbnV0ZScsIG1pbnV0ZSk7XG4gICAgICAgIGlmIChtZXJpZGllbSA+PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignbWVyaWRpZW0nLCBtZXJpZGllbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3RhcnRBdFBNID0gcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignbWVyaWRpZW0nKSAmJiByZXN1bHQuc3RhcnQuZ2V0KCdtZXJpZGllbScpID09IDE7XG4gICAgICAgICAgICBpZiAoc3RhcnRBdFBNICYmIHJlc3VsdC5zdGFydC5nZXQoJ2hvdXInKSA+IGhvdXIpIHtcbiAgICAgICAgICAgICAgICAvLyAxMHBtIC0gMSAoYW0pXG4gICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnbWVyaWRpZW0nLCAwKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VyID4gMTIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KCdtZXJpZGllbScsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdC5lbmQuZGF0ZSgpLmdldFRpbWUoKSA8IHJlc3VsdC5zdGFydC5kYXRlKCkuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KCdkYXknLCByZXN1bHQuZW5kLmdldCgnZGF5JykgKyAxKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qXG5cblxuKi9cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xuXG52YXIgREFZU19PRkZTRVQgPSB7ICdzdW5kYXknOiAwLCAnc3VuJzogMCwgJ21vbmRheSc6IDEsICdtb24nOiAxLCd0dWVzZGF5JzogMiwgJ3R1ZXMnOjIsICd0dWUnOjIsICd3ZWRuZXNkYXknOiAzLCAnd2VkJzogMyxcbiAgICAndGh1cnNkYXknOiA0LCAndGh1cnMnOjQsICd0aHVyJzogNCwgJ3RodSc6IDQsJ2ZyaWRheSc6IDUsICdmcmknOiA1LCdzYXR1cmRheSc6IDYsICdzYXQnOiA2fTtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknICtcbiAgICAnKD86KD86XFxcXCx8XFxcXCh8XFxcXO+8iClcXFxccyopPycgK1xuICAgICcoPzpvblxcXFxzKj8pPycgK1xuICAgICcoPzoodGhpc3xsYXN0fHBhc3R8bmV4dClcXFxccyopPycgK1xuICAgICcoJyArIE9iamVjdC5rZXlzKERBWVNfT0ZGU0VUKS5qb2luKCd8JykgKyAnKScgK1xuICAgICcoPzpcXFxccyooPzpcXFxcLHxcXFxcKXxcXFxc77yJKSk/JyArXG4gICAgJyg/OlxcXFxzKih0aGlzfGxhc3R8cGFzdHxuZXh0KVxcXFxzKndlZWspPycgK1xuICAgICcoPz1cXFxcV3wkKScsICdpJyk7XG5cbnZhciBQUkVGSVhfR1JPVVAgPSAyO1xudmFyIFdFRUtEQVlfR1JPVVAgPSAzO1xudmFyIFBPU1RGSVhfR1JPVVAgPSA0O1xuXG5cbmV4cG9ydHMudXBkYXRlUGFyc2VkQ29tcG9uZW50ID0gZnVuY3Rpb24gdXBkYXRlUGFyc2VkQ29tcG9uZW50KHJlc3VsdCwgcmVmLCBvZmZzZXQsIG1vZGlmaWVyKSB7XG5cbiAgICB2YXIgc3RhcnRNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICB2YXIgc3RhcnRNb21lbnRGaXhlZCA9IGZhbHNlO1xuICAgIHZhciByZWZPZmZzZXQgPSBzdGFydE1vbWVudC5kYXkoKTtcblxuICAgIGlmKG1vZGlmaWVyID09ICdsYXN0JyB8fCBtb2RpZmllciA9PSAncGFzdCcpIHtcbiAgICAgICAgc3RhcnRNb21lbnQuZGF5KG9mZnNldCAtIDcpO1xuICAgICAgICBzdGFydE1vbWVudEZpeGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYobW9kaWZpZXIgPT0gJ25leHQnKSB7XG4gICAgICAgIHN0YXJ0TW9tZW50LmRheShvZmZzZXQgKyA3KTtcbiAgICAgICAgc3RhcnRNb21lbnRGaXhlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmKG1vZGlmaWVyID09ICd0aGlzJykge1xuICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoTWF0aC5hYnMob2Zmc2V0IC0gNyAtIHJlZk9mZnNldCkgPCBNYXRoLmFicyhvZmZzZXQgLSByZWZPZmZzZXQpKSB7XG4gICAgICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0IC0gNyk7XG4gICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMob2Zmc2V0ICsgNyAtIHJlZk9mZnNldCkgPCBNYXRoLmFicyhvZmZzZXQgLSByZWZPZmZzZXQpKSB7XG4gICAgICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0ICsgNyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFydE1vbWVudC5kYXkob2Zmc2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3dlZWtkYXknLCBvZmZzZXQpO1xuICAgIGlmIChzdGFydE1vbWVudEZpeGVkKSB7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIHN0YXJ0TW9tZW50LmRhdGUoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgc3RhcnRNb21lbnQubW9udGgoKSArIDEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIHN0YXJ0TW9tZW50LmRhdGUoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIHN0YXJ0TW9tZW50LnllYXIoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFTldlZWtkYXlQYXJzZXIoKSB7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH07XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuICAgICAgICB2YXIgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIHRleHQgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWZcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGRheU9mV2VlayA9IG1hdGNoW1dFRUtEQVlfR1JPVVBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBvZmZzZXQgPSBEQVlTX09GRlNFVFtkYXlPZldlZWtdO1xuICAgICAgICBpZihvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHJlZml4ID0gbWF0Y2hbUFJFRklYX0dST1VQXTtcbiAgICAgICAgdmFyIHBvc3RmaXggPSBtYXRjaFtQT1NURklYX0dST1VQXTtcbiAgICAgICAgdmFyIG5vcm0gPSBwcmVmaXggfHwgcG9zdGZpeDtcbiAgICAgICAgbm9ybSA9IG5vcm0gfHwgJyc7XG4gICAgICAgIG5vcm0gPSBub3JtLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgZXhwb3J0cy51cGRhdGVQYXJzZWRDb21wb25lbnQocmVzdWx0LCByZWYsIG9mZnNldCwgbm9ybSk7XG4gICAgICAgIHJlc3VsdC50YWdzWydFTldlZWtkYXlQYXJzZXInXSA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59O1xuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxuLypcbiAgVmFsaWQgcGF0dGVybnM6XG4gIC0gZXN0YSBtYcOxYW5hIC0+IHRvZGF5IGluIHRoZSBtb3JuaW5nXG4gIC0gZXN0YSB0YXJkZSAtPiB0b2RheSBpbiB0aGUgYWZ0ZXJub29uL2V2ZW5pbmdcbiAgLSBlc3RhIG5vY2hlIC0+IHRvbmlnaHRcbiAgLSBheWVyIHBvciBsYSBtYcOxYW5hIC0+IHllc3RlcmRheSBpbiB0aGUgbW9ybmluZ1xuICAtIGF5ZXIgcG9yIGxhIHRhcmRlIC0+IHllc3RlcmRheSBpbiB0aGUgYWZ0ZXJub29uL2V2ZW5pbmdcbiAgLSBheWVyIHBvciBsYSBub2NoZSAtPiB5ZXN0ZXJkYXkgYXQgbmlnaHRcbiAgLSBtYcOxYW5hIHBvciBsYSBtYcOxYW5hIC0+IHRvbW9ycm93IGluIHRoZSBtb3JuaW5nXG4gIC0gbWHDsWFuYSBwb3IgbGEgdGFyZGUgLT4gdG9tb3Jyb3cgaW4gdGhlIGFmdGVybm9vbi9ldmVuaW5nXG4gIC0gbWHDsWFuYSBwb3IgbGEgbm9jaGUgLT4gdG9tb3Jyb3cgYXQgbmlnaHRcbiAgLSBhbm9jaGUgLT4gdG9tb3Jyb3cgYXQgbmlnaHRcbiAgLSBob3kgLT4gdG9kYXlcbiAgLSBheWVyIC0+IHllc3RlcmRheVxuICAtIG1hw7FhbmEgLT4gdG9tb3Jyb3dcbiAqL1xudmFyIFBBVFRFUk4gPSAvKFxcV3xeKShhaG9yYXxlc3RhXFxzKihtYcOxYW5hfHRhcmRlfG5vY2hlKXwoYXllcnxtYcOxYW5hKVxccypwb3JcXHMqbGFcXHMqKG1hw7FhbmF8dGFyZGV8bm9jaGUpfGhveXxtYcOxYW5hfGF5ZXJ8YW5vY2hlKSg/PVxcV3wkKS9pO1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVTQ2FzdWFsRGF0ZVBhcnNlcigpe1xuXG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG5cbiAgICAgICAgdmFyIHRleHQgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlZk1vbWVudCA9IG1vbWVudChyZWYpO1xuICAgICAgICB2YXIgc3RhcnRNb21lbnQgPSByZWZNb21lbnQuY2xvbmUoKTtcbiAgICAgICAgdmFyIGxvd2VyVGV4dCA9IHRleHQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG5cbiAgICAgICAgaWYobG93ZXJUZXh0ID09ICdtYcOxYW5hJyl7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIG5vdCBcIlRvbW9ycm93XCIgb24gbGF0ZSBuaWdodFxuICAgICAgICAgICAgaWYocmVmTW9tZW50LmhvdXIoKSA+IDEpIHtcbiAgICAgICAgICAgICAgICBzdGFydE1vbWVudC5hZGQoMSwgJ2RheScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZihsb3dlclRleHQgPT0gJ2F5ZXInKSB7XG5cbiAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgtMSwgJ2RheScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobG93ZXJUZXh0ID09ICdhbm9jaGUnKSB7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDApO1xuICAgICAgICAgICAgaWYgKHJlZk1vbWVudC5ob3VyKCkgPiA2KSB7XG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKC0xLCAnZGF5Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChsb3dlclRleHQubWF0Y2goXCJlc3RhXCIpKSB7XG5cbiAgICAgICAgICAgIHZhciBzZWNvbmRNYXRjaCA9IG1hdGNoWzNdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoc2Vjb25kTWF0Y2ggPT0gXCJ0YXJkZVwiKSB7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAxOCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Vjb25kTWF0Y2ggPT0gXCJtYcOxYW5hXCIpIHtcblxuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDYpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlY29uZE1hdGNoID09IFwibm9jaGVcIikge1xuXG4gICAgICAgICAgICAgIC8vIE5vcm1hbGx5IG1lYW5zIHRoaXMgY29taW5nIG1pZG5pZ2h0XG4gICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDIyKTtcbiAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDEpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobG93ZXJUZXh0Lm1hdGNoKC9wb3JcXHMqbGEvKSkge1xuXG4gICAgICAgICAgICB2YXIgZmlyc3RNYXRjaCA9IG1hdGNoWzRdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoZmlyc3RNYXRjaCA9PT0gJ2F5ZXInKSB7XG5cbiAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKC0xLCAnZGF5Jyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlyc3RNYXRjaCA9PT0gJ21hw7FhbmEnKSB7XG5cbiAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKDEsICdkYXknKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2Vjb25kTWF0Y2ggPSBtYXRjaFs1XS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHNlY29uZE1hdGNoID09IFwidGFyZGVcIikge1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMTgpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlY29uZE1hdGNoID09IFwibWHDsWFuYVwiKSB7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCA5KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWNvbmRNYXRjaCA9PSBcIm5vY2hlXCIpIHtcblxuICAgICAgICAgICAgICAvLyBOb3JtYWxseSBtZWFucyB0aGlzIGNvbWluZyBtaWRuaWdodFxuICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAyMik7XG4gICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAobG93ZXJUZXh0Lm1hdGNoKFwiYWhvcmFcIikpIHtcblxuICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIHJlZk1vbWVudC5ob3VyKCkpO1xuICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWludXRlJywgcmVmTW9tZW50Lm1pbnV0ZSgpKTtcbiAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3NlY29uZCcsIHJlZk1vbWVudC5zZWNvbmQoKSk7XG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtaWxsaXNlY29uZCcsIHJlZk1vbWVudC5taWxsaXNlY29uZCgpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5Jywgc3RhcnRNb21lbnQuZGF0ZSgpKVxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIHN0YXJ0TW9tZW50Lm1vbnRoKCkgKyAxKVxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKVxuICAgICAgICByZXN1bHQudGFnc1snRVNDYXN1YWxEYXRlUGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBQQVRURVJOID0gLyhcXFd8XikoZGVudHJvXFxzKmRlfGVuKVxccyooWzAtOV0rfG1lZGlbb2FdfHVuYT8pXFxzKihtaW51dG9zP3xob3Jhcz98ZFtpw61dYXM/KVxccyooPz0oPzpcXFd8JCkpL2k7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRVNEZWFkbGluZUZvcm1hdFBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7IHJldHVybiBQQVRURVJOOyB9XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgdGV4dCAgPSBtYXRjaFswXTtcbiAgICAgICAgdGV4dCAgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG51bSA9IHBhcnNlSW50KG1hdGNoWzNdKTtcbiAgICAgICAgaWYgKGlzTmFOKG51bSkpIHtcbiAgICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL21lZGkvKSkge1xuICAgICAgICAgICAgbnVtID0gMC41O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW0gPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYXRlID0gbW9tZW50KHJlZik7XG4gICAgICAgIGlmIChtYXRjaFs0XS5tYXRjaCgvZFtpw61dYS8pKSB7XG4gICAgICAgICAgICBkYXRlLmFkZChudW0sICdkJyk7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKG1hdGNoWzRdLm1hdGNoKC9ob3JhLykpIHtcblxuICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnaG91cicpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL21pbnV0by8pKSB7XG5cbiAgICAgICAgICAgIGRhdGUuYWRkKG51bSwgJ21pbnV0ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdob3VyJywgZGF0ZS5ob3VyKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBkYXRlLm1pbnV0ZSgpKTtcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VTRGVhZGxpbmVGb3JtYXRQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn1cbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIHV0aWwgID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvRVMnKTtcblxudmFyIERBWVNfT0ZGU0VUID0gdXRpbC5XRUVLREFZX09GRlNFVDtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknICtcbiAgICAgICAgJyg/OihEb21pbmdvfEx1bmVzfE1hcnRlc3xNacOpcmNvbGVzfE1pZXJjb2xlc3xKdWV2ZXN8Vmllcm5lc3xTw6FiYWRvfFNhYmFkb3xEb218THVufE1hcnxNaWV8SnVlfFZpZXxTYWIpXFxcXHMqLD9cXFxccyopPycgK1xuICAgICAgICAnKFswLTldezEsMn0pKD86wrp8wqp8wrApPycgK1xuICAgICAgICAnKD86XFxcXHMqKD86ZGVzZGV8ZGV8XFxcXC18XFxcXOKAk3xhbD98aGFzdGF8XFxcXHMpXFxcXHMqKFswLTldezEsMn0pKD86wrp8wqp8wrApPyk/XFxcXHMqKD86ZGUpP1xcXFxzKicgK1xuICAgICAgICAnKEVuZSg/OnJvfFxcXFwuKT98RmViKD86cmVyb3xcXFxcLik/fE1hcig/OnpvfFxcXFwuKT98QWJyKD86aWx8XFxcXC4pP3xNYXkoPzpvfFxcXFwuKT98SnVuKD86aW98XFxcXC4pP3xKdWwoPzppb3xcXFxcLik/fEFnbyg/OnN0b3xcXFxcLik/fFNlcCg/OnRpZW1icmV8XFxcXC4pP3xPY3QoPzp1YnJlfFxcXFwuKT98Tm92KD86aWVtYnJlfFxcXFwuKT98RGljKD86aWVtYnJlfFxcXFwuKT8pJyArXG4gICAgICAgICcoPzpcXFxccyooPzpkZWw/KT8oXFxcXHMqWzAtOV17MSw0fSg/IVteXFxcXHNdXFxcXGQpKShcXFxccypbYWRdXFxcXC4/XFxcXHMqY1xcXFwuP3xhXFxcXC4/XFxcXHMqZFxcXFwuPyk/KT8nICtcbiAgICAgICAgJyg/PVxcXFxXfCQpJywgJ2knXG4gICAgKTtcblxudmFyIFdFRUtEQVlfR1JPVVAgPSAyO1xudmFyIERBVEVfR1JPVVAgPSAzO1xudmFyIERBVEVfVE9fR1JPVVAgPSA0O1xudmFyIE1PTlRIX05BTUVfR1JPVVAgPSA1O1xudmFyIFlFQVJfR1JPVVAgPSA2O1xudmFyIFlFQVJfQkVfR1JPVVAgPSA3O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEVTTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyKCl7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKSxcbiAgICAgICAgICAgIGluZGV4OiBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbW9udGggPSBtYXRjaFtNT05USF9OQU1FX0dST1VQXTtcbiAgICAgICAgbW9udGggPSB1dGlsLk1PTlRIX09GRlNFVFttb250aC50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICB2YXIgZGF5ID0gbWF0Y2hbREFURV9HUk9VUF07XG4gICAgICAgIGRheSA9IHBhcnNlSW50KGRheSk7XG5cbiAgICAgICAgdmFyIHllYXIgPSBudWxsO1xuICAgICAgICBpZiAobWF0Y2hbWUVBUl9HUk9VUF0pIHtcbiAgICAgICAgICAgIHllYXIgPSBtYXRjaFtZRUFSX0dST1VQXTtcbiAgICAgICAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyKTtcblxuICAgICAgICAgICAgaWYobWF0Y2hbWUVBUl9CRV9HUk9VUF0pe1xuICAgICAgICAgICAgICAgIGlmICgvYVxcLj9cXHMqY1xcLj8vaS50ZXN0KG1hdGNoW1lFQVJfQkVfR1JPVVBdKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhbnRlcyBkZSBDcmlzdG9cbiAgICAgICAgICAgICAgICAgICAgeWVhciA9IC15ZWFyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhciA8IDEwMCl7XG5cbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciArIDIwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih5ZWFyKXtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy9GaW5kIHRoZSBtb3N0IGFwcHJvcHJpYXRlZCB5ZWFyXG4gICAgICAgICAgICB2YXIgcmVmTW9tZW50ID0gbW9tZW50KHJlZik7XG4gICAgICAgICAgICByZWZNb21lbnQubW9udGgobW9udGggLSAxKTtcbiAgICAgICAgICAgIHJlZk1vbWVudC5kYXRlKGRheSk7XG4gICAgICAgICAgICByZWZNb21lbnQueWVhcihtb21lbnQocmVmKS55ZWFyKCkpO1xuXG4gICAgICAgICAgICB2YXIgbmV4dFllYXIgPSByZWZNb21lbnQuY2xvbmUoKS5hZGQoMSwgJ3knKTtcbiAgICAgICAgICAgIHZhciBsYXN0WWVhciA9IHJlZk1vbWVudC5jbG9uZSgpLmFkZCgtMSwgJ3knKTtcbiAgICAgICAgICAgIGlmKCBNYXRoLmFicyhuZXh0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7XG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbmV4dFllYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBNYXRoLmFicyhsYXN0WWVhci5kaWZmKG1vbWVudChyZWYpKSkgPCBNYXRoLmFicyhyZWZNb21lbnQuZGlmZihtb21lbnQocmVmKSkpICl7XG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbGFzdFllYXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIHJlZk1vbWVudC55ZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Vla2RheSBjb21wb25lbnRcbiAgICAgICAgaWYgKG1hdGNoW1dFRUtEQVlfR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgd2Vla2RheSA9IG1hdGNoW1dFRUtEQVlfR1JPVVBdO1xuICAgICAgICAgICAgd2Vla2RheSA9IHV0aWwuV0VFS0RBWV9PRkZTRVRbd2Vla2RheS50b0xvd2VyQ2FzZSgpXVxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignd2Vla2RheScsIHdlZWtkYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGV4dCBjYW4gYmUgJ3JhbmdlJyB2YWx1ZS4gU3VjaCBhcyAnMTIgLSAxMyBKYW51YXJ5IDIwMTInXG4gICAgICAgIGlmIChtYXRjaFtEQVRFX1RPX0dST1VQXSkge1xuICAgICAgICAgICAgcmVzdWx0LmVuZCA9IHJlc3VsdC5zdGFydC5jbG9uZSgpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2RheScsIHBhcnNlSW50KG1hdGNoW0RBVEVfVE9fR1JPVVBdKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQudGFnc1snRVNNb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn0iLCIvKlxuICAgIERhdGUgZm9ybWF0IHdpdGggc2xhc2ggXCIvXCIgKGFsc28gXCItXCIgYW5kIFwiLlwiKSBiZXR3ZWVuIG51bWJlcnNcbiAgICAtIE1hcnRlcyAzLzExLzIwMTVcbiAgICAtIDMvMTEvMjAxNVxuICAgIC0gMy8xMVxuKi9cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICcoPzonICtcbiAgICAgICAgJygoPzpkb21pbmdvfGRvbXxsdW5lc3xsdW58bWFydGVzfG1hcnxtaVvDqWVdcmNvbGVzfG1pZXxqdWV2ZXN8anVlfHZpZXJuZXN8dmllfHNbw6FhXWJhZG98c2FiKSknICtcbiAgICAgICAgJ1xcXFxzKlxcXFwsP1xcXFxzKicgK1xuICAgICcpPycgK1xuICAgICcoWzAtMV17MCwxfVswLTldezF9KVtcXFxcL1xcXFwuXFxcXC1dKFswLTNdezAsMX1bMC05XXsxfSknICtcbiAgICAnKD86JyArXG4gICAgICAgICdbXFxcXC9cXFxcLlxcXFwtXScgK1xuICAgICAgICAnKFswLTldezR9XFxzKlxcLD9cXHMqfFswLTldezJ9XFxzKlxcLD9cXHMqKScgK1xuICAgICcpPycgK1xuICAgICcoXFxcXFd8JCknLCAnaScpO1xuXG52YXIgREFZU19PRkZTRVQgPSB7ICdkb21pbmdvJzogMCwgJ2RvbSc6IDAsICdsdW5lcyc6IDEsICdsdW4nOiAxLCAnbWFydGVzJzogMiwgJ21hcic6IDIsICdtaWVyY29sZXMnOiAzLCAnbWnDqXJjb2xlcyc6IDMsICdtaWUnOiAzLFxuICAgICdqdWV2ZXMnOiA0LCAnanVlJzogNCwgJ3ZpZXJuZXMnOiA1LCAndmllcic6IDUsICdzw6FiYWRvJzogNiwgJ3NhYmFkbyc6IDYsICdzYWInOiA2LH1cblxuXG52YXIgT1BFTk5JTkdfR1JPVVAgPSAxO1xudmFyIEVORElOR19HUk9VUCA9IDY7XG5cbi8vIGluIFNwYW5pc2ggd2UgdXNlIGRheS9tb250aC95ZWFyXG52YXIgV0VFS0RBWV9HUk9VUCA9IDI7XG52YXIgTU9OVEhfR1JPVVAgPSA0O1xudmFyIERBWV9HUk9VUCA9IDM7XG52YXIgWUVBUl9HUk9VUCA9IDU7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRVNTbGFzaERhdGVGb3JtYXRQYXJzZXIoYXJndW1lbnQpIHtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFBBVFRFUk47IH07XG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICBpZihtYXRjaFtPUEVOTklOR19HUk9VUF0gPT0gJy8nIHx8IG1hdGNoW0VORElOR19HUk9VUF0gPT0gJy8nKSB7XG4gICAgICAgICAgICAvLyBMb25nIHNraXAsIGlmIHRoZXJlIGlzIHNvbWUgb3ZlcmxhcHBpbmcgbGlrZTpcbiAgICAgICAgICAgIC8vIFhYWy9ZWS9aWl1cbiAgICAgICAgICAgIC8vIFtYWC9ZWS9dWlpcbiAgICAgICAgICAgIG1hdGNoLmluZGV4ICs9IG1hdGNoWzBdLmxlbmd0aFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFtPUEVOTklOR19HUk9VUF0ubGVuZ3RoO1xuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFtPUEVOTklOR19HUk9VUF0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFtFTkRJTkdfR1JPVVBdLmxlbmd0aCk7XG5cblxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHRleHQubWF0Y2goL15cXGRcXC5cXGQkLykpIHJldHVybjtcbiAgICAgICAgaWYodGV4dC5tYXRjaCgvXlxcZFxcLlxcZHsxLDJ9XFwuXFxkezEsMn0kLykpIHJldHVybjtcblxuICAgICAgICAvLyBNTS9kZCAtPiBPS1xuICAgICAgICAvLyBNTS5kZCAtPiBOR1xuICAgICAgICBpZighbWF0Y2hbWUVBUl9HUk9VUF0gJiYgbWF0Y2hbMF0uaW5kZXhPZignLycpIDwgMCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBkYXRlID0gbnVsbDtcbiAgICAgICAgdmFyIHllYXIgPSBtYXRjaFtZRUFSX0dST1VQXSB8fCBtb21lbnQocmVmKS55ZWFyKCkgKyAnJztcbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfR1JPVVBdO1xuICAgICAgICB2YXIgZGF5ICAgPSBtYXRjaFtEQVlfR1JPVVBdO1xuXG4gICAgICAgIG1vbnRoID0gcGFyc2VJbnQobW9udGgpO1xuICAgICAgICBkYXkgID0gcGFyc2VJbnQoZGF5KTtcbiAgICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIpO1xuXG4gICAgICAgIGlmKG1vbnRoIDwgMSB8fCBtb250aCA+IDEyKSB7XG4gICAgICAgICAgICBpZihtb250aCA+IDEyKSB7XG4gICAgICAgICAgICAgICAgLy8gZGQvbW0veXl5eSBkYXRlIGZvcm1hdCBpZiBkYXkgbG9va3MgbGlrZSBhIG1vbnRoLCBhbmQgbW9udGhcbiAgICAgICAgICAgICAgICAvLyBsb29rcyBsaWtlIGEgZGF5LlxuICAgICAgICAgICAgICAgIGlmIChkYXkgPj0gMSAmJiBkYXkgPD0gMTIgJiYgbW9udGggPj0gMTMgJiYgbW9udGggPD0gMzEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5hbWJpZ3VvdXNcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRkYXkgPSBtb250aDtcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSBkYXk7XG4gICAgICAgICAgICAgICAgICAgIGRheSA9IHRkYXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBib3RoIG1vbnRoIGFuZCBkYXkgYXJlIDw9IDEyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihkYXkgPCAxIHx8IGRheSA+IDMxKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZih5ZWFyIDwgMTAwKXtcbiAgICAgICAgICAgIGlmKHllYXIgPiA1MCl7XG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgKyAxOTAwO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgKyAyMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF5KTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBtb250aCk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcblxuICAgICAgICAvL0RheSBvZiB3ZWVrXG4gICAgICAgIGlmKG1hdGNoW1dFRUtEQVlfR1JPVVBdKSB7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd3ZWVrZGF5JywgREFZU19PRkZTRVRbbWF0Y2hbV0VFS0RBWV9HUk9VUF0udG9Mb3dlckNhc2UoKV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0VTU2xhc2hEYXRlRm9ybWF0UGFyc2VyJ10gPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59OyIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBQQVRURVJOID0gLyhcXFd8XiloYWNlXFxzKihbMC05XSt8bWVkaVtvYV18dW5hPylcXHMqKG1pbnV0b3M/fGhvcmFzP3xzZW1hbmFzP3xkW2nDrV1hcz98bWVzKGVzKT98YcOxb3M/KSg/PSg/OlxcV3wkKSkvaTtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFU1RpbWVBZ29Gb3JtYXRQYXJzZXIoKXtcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUEFUVEVSTjtcbiAgICB9XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuXG4gICAgICAgIGlmIChtYXRjaC5pbmRleCA+IDAgJiYgdGV4dFttYXRjaC5pbmRleC0xXS5tYXRjaCgvXFx3LykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF07XG4gICAgICAgIHRleHQgID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgICAgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcblxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBudW0gPSBwYXJzZUludChtYXRjaFsyXSk7XG4gICAgICAgIGlmIChpc05hTihudW0pKSB7XG4gICAgICAgICAgaWYgKG1hdGNoWzJdLm1hdGNoKC9tZWRpLykpIHtcbiAgICAgICAgICAgIG51bSA9IDAuNTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGF0ZSA9IG1vbWVudChyZWYpO1xuXG4gICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvaG9yYS8pIHx8IG1hdGNoWzNdLm1hdGNoKC9taW51dG8vKSkge1xuICAgICAgICAgICAgaWYgKG1hdGNoWzNdLm1hdGNoKC9ob3JhLykpIHtcblxuICAgICAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdob3VyJyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbM10ubWF0Y2goL21pbnV0by8pKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnbWludXRlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIGRhdGUuaG91cigpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21pbnV0ZScsIGRhdGUubWludXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnRhZ3NbJ0VTVGltZUFnb0Zvcm1hdFBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL3NlbWFuYS8pKSB7XG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnd2VlaycpO1xuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnd2Vla2RheScsIGRhdGUuZGF5KCkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvZFtpw61dYS8pKSB7XG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoWzNdLm1hdGNoKC9tZXMvKSkge1xuICAgICAgICAgICAgZGF0ZS5hZGQoLW51bSwgJ21vbnRoJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL2HDsW8vKSkge1xuXG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAneWVhcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgfTtcbn1cbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG52YXIgUGFyc2VkQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZENvbXBvbmVudHM7XG5cbnZhciBGSVJTVF9SRUdfUEFUVEVSTiAgPSBuZXcgUmVnRXhwKFwiKF58XFxcXHN8VClcIiArXG4gICAgXCIoPzooPzphIGxhcz98YWw/fGRlc2RlfGRlKVxcXFxzKik/XCIgK1xuICAgIFwiKFxcXFxkezEsNH18bWVkaW9kW2nDrV1hfG1lZGlhbm9jaGUpXCIgK1xuICAgIFwiKD86XCIgK1xuICAgICAgICBcIig/OlxcXFwufFxcXFw6fFxcXFzvvJopKFxcXFxkezEsMn0pXCIgK1xuICAgICAgICBcIig/OlwiICtcbiAgICAgICAgICAgIFwiKD86XFxcXDp8XFxcXO+8mikoXFxcXGR7Mn0pXCIgK1xuICAgICAgICBcIik/XCIgK1xuICAgIFwiKT9cIiArXG4gICAgXCIoPzpcXFxccyooQVxcXFwuTVxcXFwufFBcXFxcLk1cXFxcLnxBTT98UE0/KSk/XCIgK1xuICAgIFwiKD89XFxcXFd8JClcIiwgJ2knKTtcblxuXG52YXIgU0VDT05EX1JFR19QQVRURVJOID0gbmV3IFJlZ0V4cChcIl5cXFxccypcIiArXG4gICAgXCIoXFxcXC18XFxcXOKAk3xcXFxcfnxcXFxc44CcfGEoPzpcXHMqbGFzKT98XFxcXD8pXFxcXHMqXCIgK1xuICAgIFwiKFxcXFxkezEsNH0pXCIgK1xuICAgIFwiKD86XCIgK1xuICAgICAgICBcIig/OlxcXFwufFxcXFw6fFxcXFzvvJopKFxcXFxkezEsMn0pXCIgK1xuICAgICAgICBcIig/OlwiICtcbiAgICAgICAgICAgIFwiKD86XFxcXC58XFxcXDp8XFxcXO+8mikoXFxcXGR7MSwyfSlcIiArXG4gICAgICAgIFwiKT9cIiArXG4gICAgXCIpP1wiICtcbiAgICBcIig/OlxcXFxzKihBXFxcXC5NXFxcXC58UFxcXFwuTVxcXFwufEFNP3xQTT8pKT9cIiArXG4gICAgXCIoPz1cXFxcV3wkKVwiLCAnaScpO1xuXG52YXIgSE9VUl9HUk9VUCAgICA9IDI7XG52YXIgTUlOVVRFX0dST1VQICA9IDM7XG52YXIgU0VDT05EX0dST1VQICA9IDQ7XG52YXIgQU1fUE1fSE9VUl9HUk9VUCA9IDU7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRVNUaW1lRXhwcmVzc2lvblBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7IHJldHVybiBGSVJTVF9SRUdfUEFUVEVSTjsgfVxuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcblxuICAgICAgICAvLyBUaGlzIHBhdHRlcm4gY2FuIGJlIG92ZXJsYXBlZCBFeC4gWzEyXSBBTSwgMVsyXSBBTVxuICAgICAgICBpZiAobWF0Y2guaW5kZXggPiAwICYmIHRleHRbbWF0Y2guaW5kZXgtMV0ubWF0Y2goL1xcdy8pKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdmFyIHJlZk1vbWVudCA9IG1vbWVudChyZWYpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCgpO1xuICAgICAgICByZXN1bHQucmVmID0gcmVmO1xuICAgICAgICByZXN1bHQuaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgcmVzdWx0LnRleHQgID0gbWF0Y2hbMF0uc3Vic3RyaW5nKG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIHJlc3VsdC50YWdzWydFU1RpbWVFeHByZXNzaW9uUGFyc2VyJ10gPSB0cnVlO1xuXG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgICByZWZNb21lbnQuZGF0ZSgpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtb250aCcsIHJlZk1vbWVudC5tb250aCgpKzEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCAgcmVmTW9tZW50LnllYXIoKSk7XG5cbiAgICAgICAgdmFyIGhvdXIgPSAwO1xuICAgICAgICB2YXIgbWludXRlID0gMDtcbiAgICAgICAgdmFyIG1lcmlkaWVtID0gLTE7XG5cbiAgICAgICAgLy8gLS0tLS0gU2Vjb25kXG4gICAgICAgIGlmKG1hdGNoW1NFQ09ORF9HUk9VUF0gIT0gbnVsbCl7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gcGFyc2VJbnQobWF0Y2hbU0VDT05EX0dST1VQXSk7XG4gICAgICAgICAgICBpZihzZWNvbmQgPj0gNjApIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdzZWNvbmQnLCBzZWNvbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gLS0tLS0gSG91cnNcbiAgICAgICAgaWYgKG1hdGNoW0hPVVJfR1JPVVBdLnRvTG93ZXJDYXNlKCkubWF0Y2goL21lZGlvZC8pKXtcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgICAgIGhvdXIgPSAxMjtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtIT1VSX0dST1VQXS50b0xvd2VyQ2FzZSgpID09IFwibWVkaWFub2NoZVwiKSB7XG4gICAgICAgICAgICBtZXJpZGllbSA9IDA7XG4gICAgICAgICAgICBob3VyID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvdXIgPSBwYXJzZUludChtYXRjaFtIT1VSX0dST1VQXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBNaW51dGVzXG4gICAgICAgIGlmKG1hdGNoW01JTlVURV9HUk9VUF0gIT0gbnVsbCl7XG4gICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChtYXRjaFtNSU5VVEVfR1JPVVBdKTtcbiAgICAgICAgfSBlbHNlIGlmKGhvdXIgPiAxMDApIHtcbiAgICAgICAgICAgIG1pbnV0ZSA9IGhvdXIlMTAwO1xuICAgICAgICAgICAgaG91ciAgID0gcGFyc2VJbnQoaG91ci8xMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWludXRlID49IDYwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGhvdXIgPiAyNCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvdXIgPj0gMTIpIHtcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIC0tLS0tIEFNICYgUE1cbiAgICAgICAgaWYobWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYoaG91ciA+IDEyKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHZhciBhbXBtID0gbWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF1bMF0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmKGFtcG0gPT0gXCJhXCIpe1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMDtcbiAgICAgICAgICAgICAgICBpZihob3VyID09IDEyKSBob3VyID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoYW1wbSA9PSBcInBcIil7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICAgICAgICAgIGlmKGhvdXIgIT0gMTIpIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIGhvdXIpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBtaW51dGUpO1xuICAgICAgICBpZiAobWVyaWRpZW0gPj0gMCkge1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWVyaWRpZW0nLCBtZXJpZGllbSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgIEV4dHJhY3RpbmcgdGhlICd0bycgY2h1bmtcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgbWF0Y2ggPSBTRUNPTkRfUkVHX1BBVFRFUk4uZXhlYyh0ZXh0LnN1YnN0cmluZyhyZXN1bHQuaW5kZXggKyByZXN1bHQudGV4dC5sZW5ndGgpKTtcbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgLy8gTm90IGFjY2VwdCBudW1iZXIgb25seSByZXN1bHRcbiAgICAgICAgICAgIGlmIChyZXN1bHQudGV4dC5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgLy8gUGF0dGVybiBcIllZLllZIC1YWFhYXCIgaXMgbW9yZSBsaWtlIHRpbWV6b25lIG9mZnNldFxuICAgICAgICBpZiAobWF0Y2hbMF0ubWF0Y2goL15cXHMqKFxcK3xcXC0pXFxzKlxcZHszLDR9JC8pKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYocmVzdWx0LmVuZCA9PSBudWxsKXtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQgPSBuZXcgUGFyc2VkQ29tcG9uZW50cyhudWxsLCByZXN1bHQuc3RhcnQuZGF0ZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBob3VyID0gMDtcbiAgICAgICAgdmFyIG1pbnV0ZSA9IDA7XG4gICAgICAgIHZhciBtZXJpZGllbSA9IC0xO1xuXG4gICAgICAgIC8vIC0tLS0tIFNlY29uZFxuICAgICAgICBpZihtYXRjaFtTRUNPTkRfR1JPVVBdICE9IG51bGwpe1xuICAgICAgICAgICAgdmFyIHNlY29uZCA9IHBhcnNlSW50KG1hdGNoW1NFQ09ORF9HUk9VUF0pO1xuICAgICAgICAgICAgaWYoc2Vjb25kID49IDYwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ3NlY29uZCcsIHNlY29uZCk7XG4gICAgICAgIH1cblxuICAgICAgICBob3VyID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuXG4gICAgICAgIC8vIC0tLS0tIE1pbnV0ZVxuICAgICAgICBpZiAobWF0Y2hbTUlOVVRFX0dST1VQXSE9IG51bGwpIHtcblxuICAgICAgICAgICAgbWludXRlID0gcGFyc2VJbnQobWF0Y2hbTUlOVVRFX0dST1VQXSk7XG4gICAgICAgICAgICBpZihtaW51dGUgPj0gNjApIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgfSBlbHNlIGlmIChob3VyID4gMTAwKSB7XG5cbiAgICAgICAgICAgIG1pbnV0ZSA9IGhvdXIlMTAwO1xuICAgICAgICAgICAgaG91ciAgID0gcGFyc2VJbnQoaG91ci8xMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWludXRlID49IDYwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGhvdXIgPiAyNCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvdXIgPj0gMTIpIHtcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIC0tLS0tIEFNICYgUE1cbiAgICAgICAgaWYgKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdICE9IG51bGwpe1xuXG4gICAgICAgICAgICBpZiAoaG91ciA+IDEyKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgaWYobWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF1bMF0udG9Mb3dlckNhc2UoKSA9PSBcImFcIil7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAwO1xuICAgICAgICAgICAgICAgIGlmKGhvdXIgPT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmVuZC5pc0NlcnRhaW4oJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KCdkYXknLCByZXN1bHQuZW5kLmdldCgnZGF5JykgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYobWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF1bMF0udG9Mb3dlckNhc2UoKSA9PSBcInBcIil7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICAgICAgICAgIGlmKGhvdXIgIT0gMTIpIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignbWVyaWRpZW0nKSkge1xuICAgICAgICAgICAgICAgIGlmIChtZXJpZGllbSA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgPT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGFydC5nZXQoJ2hvdXInKSAhPSAxMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIHJlc3VsdC5zdGFydC5nZXQoJ2hvdXInKSArIDEyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYoaG91ciA+PSAxMikge1xuICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnRleHQgPSByZXN1bHQudGV4dCArIG1hdGNoWzBdO1xuICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignaG91cicsIGhvdXIpO1xuICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignbWludXRlJywgbWludXRlKTtcbiAgICAgICAgaWYgKG1lcmlkaWVtID49IDApIHtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCdtZXJpZGllbScsIG1lcmlkaWVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQuZW5kLmRhdGUoKS5nZXRUaW1lKCkgPCByZXN1bHQuc3RhcnQuZGF0ZSgpLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnZGF5JywgcmVzdWx0LmVuZC5nZXQoJ2RheScpICsgMSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiLypcblxuXG4qL1xudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG52YXIgdXBkYXRlUGFyc2VkQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vRU4vRU5XZWVrZGF5UGFyc2VyJykudXBkYXRlUGFyc2VkQ29tcG9uZW50O1xuXG52YXIgREFZU19PRkZTRVQgPSB7ICdkb21pbmdvJzogMCwgJ2RvbSc6IDAsICdsdW5lcyc6IDEsICdsdW4nOiAxLCAnbWFydGVzJzogMiwgJ21hcic6MiwgJ21pZXJjb2xlcyc6IDMsICdtacOpcmNvbGVzJzogMywgJ21pZSc6IDMsXG4gICAgJ2p1ZXZlcyc6IDQsICdqdWUnOiA0LCAndmllcm5lcyc6IDUsICd2aWVyJzogNSwgJ3NhYmFkbyc6IDYsICdzw6FiYWRvJzogNiwgJ3NhYic6IDYsfVxuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xuICAgICcoPzooPzpcXFxcLHxcXFxcKHxcXFxc77yIKVxcXFxzKik/JyArXG4gICAgJyg/Oihlc3RlfHBhc2Fkb3xwcltvw7NdeGltbylcXFxccyopPycgK1xuICAgICcoJyArIE9iamVjdC5rZXlzKERBWVNfT0ZGU0VUKS5qb2luKCd8JykgKyAnKScgK1xuICAgICcoPzpcXFxccyooPzpcXFxcLHxcXFxcKXxcXFxc77yJKSk/JyArXG4gICAgJyg/OlxcXFxzKihlc3RlfHBhc2Fkb3xwclvDs29deGltbylcXFxccyp3ZWVrKT8nICtcbiAgICAnKD89XFxcXFd8JCknLCAnaScpO1xuXG52YXIgUFJFRklYX0dST1VQID0gMjtcbnZhciBXRUVLREFZX0dST1VQID0gMztcbnZhciBQT1NURklYX0dST1VQID0gNDtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBFU1dlZWtkYXlQYXJzZXIoKSB7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtIG1hdGNoWzFdLmxlbmd0aCk7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZlxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZGF5T2ZXZWVrID0gbWF0Y2hbV0VFS0RBWV9HUk9VUF0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIG9mZnNldCA9IERBWVNfT0ZGU0VUW2RheU9mV2Vla107XG4gICAgICAgIGlmKG9mZnNldCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcblxuICAgICAgICB2YXIgbW9kaWZpZXIgPSBudWxsO1xuICAgICAgICB2YXIgcHJlZml4ID0gbWF0Y2hbUFJFRklYX0dST1VQXTtcbiAgICAgICAgdmFyIHBvc3RmaXggPSBtYXRjaFtQT1NURklYX0dST1VQXTtcbiAgICAgICAgaWYgKHByZWZpeCB8fCBwb3N0Zml4KSB7XG4gICAgICAgICAgICB2YXIgbm9ybSA9IHByZWZpeCB8fCBwb3N0Zml4O1xuICAgICAgICAgICAgbm9ybSA9IG5vcm0udG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYobm9ybSA9PSAncGFzYWRvJykge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gJ3RoaXMnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihub3JtID09ICdwcsOzeGltbycgfHwgbm9ybSA9PSAncHJveGltbycpIHtcbiAgICAgICAgICAgICAgICBtb2RpZmllciA9ICduZXh0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYobm9ybT09ICdlc3RlJykge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gICd0aGlzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZVBhcnNlZENvbXBvbmVudChyZXN1bHQsIHJlZiwgb2Zmc2V0LCBtb2RpZmllcik7XG4gICAgICAgIHJlc3VsdC50YWdzWydFU1dlZWtkYXlQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiLypcclxuXHJcblxyXG4qL1xyXG5cclxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xyXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xyXG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xyXG5cclxudmFyIFBBVFRFUk4gPSAvKFxcV3xeKShtYWludGVuYW50fGF1am91cmQnaHVpfGFqZHxjZXR0ZVxccypudWl0fGxhXFxzKnZlaWxsZXwoZGVtYWlufGhpZXIpKFxccyoobWF0aW58c29pcnxhcHJlbXxhcHLDqHMtbWlkaSkpP3xjZVxccyoobWF0aW58c29pcil8Y2V0XFxzKihhcHLDqHMtbWlkaXxhcHJlbSkpKD89XFxXfCQpL2k7XHJcblxyXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEZSQ2FzdWFsRGF0ZVBhcnNlcigpe1xyXG5cclxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxyXG5cclxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCk7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgIHJlZjogcmVmLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgcmVmTW9tZW50ID0gbW9tZW50KHJlZik7XHJcbiAgICAgICAgdmFyIHN0YXJ0TW9tZW50ID0gcmVmTW9tZW50LmNsb25lKCk7XHJcbiAgICAgICAgdmFyIGxvd2VyVGV4dCA9IHRleHQudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgaWYobG93ZXJUZXh0Lm1hdGNoKC9kZW1haW4vKSl7XHJcbiAgICAgICAgICAgIC8vIENoZWNrIG5vdCBcIlRvbW9ycm93XCIgb24gbGF0ZSBuaWdodFxyXG4gICAgICAgICAgICBpZihyZWZNb21lbnQuaG91cigpID4gMSkge1xyXG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKDEsICdkYXknKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIGlmKGxvd2VyVGV4dC5tYXRjaCgvaGllci8pKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgtMSwgJ2RheScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobG93ZXJUZXh0Lm1hdGNoKC9jZXR0ZVxccypudWl0Lykpe1xyXG4gICAgICAgICAgICAvLyBOb3JtYWxseSBtZWFucyB0aGlzIGNvbWluZyBtaWRuaWdodFxyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAyMik7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmKGxvd2VyVGV4dC5tYXRjaCgvbGFcXHMqdmVpbGxlLykpIHtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDApO1xyXG4gICAgICAgICAgICBpZiAocmVmTW9tZW50LmhvdXIoKSA+IDYpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgtMSwgJ2RheScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAobG93ZXJUZXh0Lm1hdGNoKC8oYXByw6hzLW1pZGl8YXByZW0pLykpIHtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDE0KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChsb3dlclRleHQubWF0Y2goLyhzb2lyKS8pKSB7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAxOCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAobG93ZXJUZXh0Lm1hdGNoKC9tYXRpbi8pKSB7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCA4KTtcclxuXHJcbiAgICAgICAgfSAgZWxzZSBpZiAobG93ZXJUZXh0Lm1hdGNoKFwibWFpbnRlbmFudFwiKSkge1xyXG5cclxuICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIHJlZk1vbWVudC5ob3VyKCkpO1xyXG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtaW51dGUnLCByZWZNb21lbnQubWludXRlKCkpO1xyXG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdzZWNvbmQnLCByZWZNb21lbnQuc2Vjb25kKCkpO1xyXG4gICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtaWxsaXNlY29uZCcsIHJlZk1vbWVudC5taWxsaXNlY29uZCgpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpXHJcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSlcclxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKVxyXG4gICAgICAgIHJlc3VsdC50YWdzWydGUkNhc3VhbERhdGVQYXJzZXInXSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG4iLCIvKlxyXG5cclxuXHJcbiovXHJcblxyXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XHJcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XHJcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XHJcbnZhciB1dGlsICA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0ZSJyk7XHJcblxyXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xyXG4gICAgJyhkYW5zfGVuKVxcXFxzKicgK1xyXG4gICAgJygnKyB1dGlsLklOVEVHRVJfV09SRFNfUEFUVEVSTiArICd8WzAtOV0rfHVuZT98KD86XFxcXHMqcXVlbHF1ZXMpP3xkZW1pKD86XFxcXHMqfC0/KT8pXFxcXHMqJyArXHJcbiAgICAnKHNlY29uZGVzP3xtaW4oPzp1dGUpP3M/fGhldXJlcz98am91cnM/fHNlbWFpbmVzP3xtb2lzfGFubsOpZXM/KVxcXFxzKicgK1xyXG4gICAgJyg/PVxcXFxXfCQpJywgJ2knXHJcbik7XHJcblxyXG52YXIgU1RSSUNUX1BBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknICtcclxuICAgICcoZGFuc3xlbilcXFxccyonICtcclxuICAgICcoJysgdXRpbC5JTlRFR0VSX1dPUkRTX1BBVFRFUk4gKyAnfFswLTldK3x1bj8pXFxcXHMqJyArXHJcbiAgICAnKHNlY29uZGVzP3xtaW51dGVzP3xoZXVyZXM/fGpvdXJzPylcXFxccyonICtcclxuICAgICcoPz1cXFxcV3wkKScsICdpJ1xyXG4pO1xyXG5cclxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBGUkRlYWRsaW5lRm9ybWF0UGFyc2VyKCl7XHJcbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1N0cmljdE1vZGUoKT8gU1RSSUNUX1BBVFRFUk4gOiBQQVRURVJOO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xyXG5cclxuICAgICAgICB2YXIgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcclxuICAgICAgICB2YXIgdGV4dCAgPSBtYXRjaFswXTtcclxuICAgICAgICB0ZXh0ICA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFsxXS5sZW5ndGgsIG1hdGNoWzBdLmxlbmd0aCAtIG1hdGNoWzFdLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgICByZWY6IHJlZlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgbnVtID0gbWF0Y2hbM107XHJcbiAgICAgICAgaWYgKHV0aWwuSU5URUdFUl9XT1JEU1tudW1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbnVtID0gdXRpbC5JTlRFR0VSX1dPUkRTW251bV07XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW0gPT09ICd1bicgfHwgbnVtID09PSAndW5lJyl7XHJcbiAgICAgICAgICAgIG51bSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW0ubWF0Y2goL3F1ZWxxdWVzPy9pKSl7XHJcbiAgICAgICAgICAgIG51bSA9IDM7XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW0ubWF0Y2goL2RlbWktPy9pKSkge1xyXG4gICAgICAgICAgICBudW0gPSAwLjU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbnVtID0gcGFyc2VJbnQobnVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBkYXRlID0gbW9tZW50KHJlZik7XHJcbiAgICAgICAgaWYgKG1hdGNoWzRdLm1hdGNoKC9qb3VyfHNlbWFpbmV8bW9pc3xhbm7DqWUvaSkpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaFs0XS5tYXRjaCgvam91ci8pKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlLmFkZChudW0sICdkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL3NlbWFpbmUvaSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGUuYWRkKG51bSAqIDcsICdkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL21vaXMvaSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGUuYWRkKG51bSwgJ21vbnRoJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL2FubsOpZS9pKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAneWVhcicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXRlLmRhdGUoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF0Y2hbNF0ubWF0Y2goL2hldXJlL2kpKSB7XHJcblxyXG4gICAgICAgICAgICBkYXRlLmFkZChudW0sICdob3VyJyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNF0ubWF0Y2goL21pbi9pKSkge1xyXG5cclxuICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnbWludXRlcycpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzRdLm1hdGNoKC9zZWNvbmRlcy9pKSkge1xyXG5cclxuICAgICAgICAgICAgZGF0ZS5hZGQobnVtLCAnc2Vjb25kJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBkYXRlLnllYXIoKSk7XHJcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtb250aCcsIGRhdGUubW9udGgoKSArIDEpO1xyXG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgZGF0ZS5kYXRlKCkpO1xyXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCBkYXRlLmhvdXIoKSk7XHJcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWludXRlJywgZGF0ZS5taW51dGUoKSk7XHJcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignc2Vjb25kJywgZGF0ZS5zZWNvbmQoKSk7XHJcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0ZSRGVhZGxpbmVGb3JtYXRQYXJzZXInXSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbn07XHJcbiIsIi8qXHJcblxyXG5cclxuKi9cclxuXHJcbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcclxuXHJcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XHJcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XHJcblxyXG52YXIgdXRpbCAgPSByZXF1aXJlKCcuLi8uLi91dGlscy9GUicpO1xyXG5cclxudmFyIERBWVNfT0ZGU0VUID0gdXRpbC5XRUVLREFZX09GRlNFVDtcclxuXHJcbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cCgnKFxcXFxXfF4pJyArXHJcbiAgICAgICAgJyg/OihEaW1hbmNoZXxMdW5kaXxNYXJkaXxtZXJjcmVkaXxKZXVkaXxWZW5kcmVkaXxTYW1lZGl8RGltfEx1bnxNYXJ8TWVyfEpldXxWZW58U2FtKVxcXFxzKiw/XFxcXHMqKT8nICtcclxuICAgICAgICAnKFswLTldezEsMn18MWVyKScgK1xyXG4gICAgICAgICcoPzpcXFxccyooPzphdXxcXFxcLXxcXFxc4oCTfGp1c3F1XFwnYXU/fFxcXFxzKVxcXFxzKihbMC05XXsxLDJ9KSg/OmVyKT8pP1xcXFxzKig/OmRlKT9cXFxccyonICtcclxuICAgICAgICAnKEphbig/OnZpZXJ8XFxcXC4pP3xGW8OpZV12KD86cmllcnxcXFxcLik/fE1hcnN8QXZyKD86aWx8XFxcXC4pP3xNYWl8SnVpbnxKdWlsKD86bGV0fFxcXFwuKT98QW9bdcO7XXR8U2VwdCg/OmVtYnJlfFxcXFwuKT98T2N0KD86b2JyZXxcXFxcLik/fE5vdig/OmVtYnJlfFxcXFwuKT98ZFvDqWVdYyg/OmVtYnJlfFxcXFwuKT8pJyArXHJcbiAgICAgICAgJyg/OlxcXFxzKihcXFxccypbMC05XXsxLDR9KD8hW15cXFxcc11cXFxcZCkpKD86XFxcXHMqKEFDfFthcF1cXFxcLj9cXFxccypjKD86aCg/OnIpPyk/XFxcXC4/XFxcXHMqblxcXFwuPykpPyk/JyArXHJcbiAgICAgICAgJyg/PVxcXFxXfCQpJywgJ2knXHJcbiAgICApO1xyXG5cclxudmFyIFdFRUtEQVlfR1JPVVAgPSAyO1xyXG52YXIgREFURV9HUk9VUCA9IDM7XHJcbnZhciBEQVRFX1RPX0dST1VQID0gNDtcclxudmFyIE1PTlRIX05BTUVfR1JPVVAgPSA1O1xyXG52YXIgWUVBUl9HUk9VUCA9IDY7XHJcbnZhciBZRUFSX0JFX0dST1VQID0gNztcclxuXHJcbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRlJNb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXIoKXtcclxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxyXG5cclxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcclxuICAgICAgICAgICAgdGV4dDogbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKSxcclxuICAgICAgICAgICAgaW5kZXg6IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoLFxyXG4gICAgICAgICAgICByZWY6IHJlZixcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfTkFNRV9HUk9VUF07XHJcbiAgICAgICAgbW9udGggPSB1dGlsLk1PTlRIX09GRlNFVFttb250aC50b0xvd2VyQ2FzZSgpXTtcclxuXHJcbiAgICAgICAgdmFyIGRheSA9IG1hdGNoW0RBVEVfR1JPVVBdO1xyXG4gICAgICAgIGRheSA9IHBhcnNlSW50KGRheSk7XHJcblxyXG4gICAgICAgIHZhciB5ZWFyID0gbnVsbDtcclxuICAgICAgICBpZiAobWF0Y2hbWUVBUl9HUk9VUF0pIHtcclxuICAgICAgICAgICAgeWVhciA9IG1hdGNoW1lFQVJfR1JPVVBdO1xyXG4gICAgICAgICAgICB5ZWFyID0gcGFyc2VJbnQoeWVhcik7XHJcblxyXG4gICAgICAgICAgICBpZihtYXRjaFtZRUFSX0JFX0dST1VQXSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoL2EvaS50ZXN0KG1hdGNoW1lFQVJfQkVfR1JPVVBdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFudGUgQ2hyaXN0ZSBuYXR1bVxyXG4gICAgICAgICAgICAgICAgICAgIHllYXIgPSAteWVhcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDwgMTAwKXtcclxuXHJcbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciArIDIwMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHllYXIpe1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXkpO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcclxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHllYXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBtb3N0IGFwcHJvcHJpYXRlZCB5ZWFyXHJcbiAgICAgICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcclxuICAgICAgICAgICAgcmVmTW9tZW50Lm1vbnRoKG1vbnRoIC0gMSk7XHJcbiAgICAgICAgICAgIHJlZk1vbWVudC5kYXRlKGRheSk7XHJcbiAgICAgICAgICAgIHJlZk1vbWVudC55ZWFyKG1vbWVudChyZWYpLnllYXIoKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV4dFllYXIgPSByZWZNb21lbnQuY2xvbmUoKS5hZGQoMSwgJ3knKTtcclxuICAgICAgICAgICAgdmFyIGxhc3RZZWFyID0gcmVmTW9tZW50LmNsb25lKCkuYWRkKC0xLCAneScpO1xyXG4gICAgICAgICAgICBpZiggTWF0aC5hYnMobmV4dFllYXIuZGlmZihtb21lbnQocmVmKSkpIDwgTWF0aC5hYnMocmVmTW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApe1xyXG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbmV4dFllYXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiggTWF0aC5hYnMobGFzdFllYXIuZGlmZihtb21lbnQocmVmKSkpIDwgTWF0aC5hYnMocmVmTW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApe1xyXG4gICAgICAgICAgICAgICAgcmVmTW9tZW50ID0gbGFzdFllYXI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCByZWZNb21lbnQueWVhcigpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFdlZWtkYXkgY29tcG9uZW50XHJcbiAgICAgICAgaWYgKG1hdGNoW1dFRUtEQVlfR1JPVVBdKSB7XHJcbiAgICAgICAgICAgIHZhciB3ZWVrZGF5ID0gbWF0Y2hbV0VFS0RBWV9HUk9VUF07XHJcbiAgICAgICAgICAgIHdlZWtkYXkgPSB1dGlsLldFRUtEQVlfT0ZGU0VUW3dlZWtkYXkudG9Mb3dlckNhc2UoKV1cclxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignd2Vla2RheScsIHdlZWtkYXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGV4dCBjYW4gYmUgJ3JhbmdlJyB2YWx1ZS4gU3VjaCBhcyAnMTIgLSAxMyBqYW52aWVyIDIwMTInXHJcbiAgICAgICAgaWYgKG1hdGNoW0RBVEVfVE9fR1JPVVBdKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lbmQgPSByZXN1bHQuc3RhcnQuY2xvbmUoKTtcclxuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2RheScsIHBhcnNlSW50KG1hdGNoW0RBVEVfVE9fR1JPVVBdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHQudGFnc1snRlJNb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXInXSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbn1cclxuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcbnZhciB1dGlsICA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL0ZSJyk7XG5cbi8vIExvYWQgZnIgbG9jYWxpemF0aW9uIGRhdGEgZnJvbSBtb21lbnRcbnJlcXVpcmUoJ21vbWVudC9sb2NhbGUvZnInKTtcblxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXFd8XiknICtcbiAgICAnKD86bGVzP3xsYXxsXFwnfGR1fGRlcz8pXFxcXHMqJyArXG4gICAgJygnKyB1dGlsLklOVEVHRVJfV09SRFNfUEFUVEVSTiArICd8XFxcXGQrKT9cXFxccyonICtcbiAgICAnKHByb2NoYWluZT9zP3xkZXJuaVtlw6hdcmU/cz98cGFzc1vDqWVdZT9zP3xwclvDqWVdY1vDqWVdZGVudHM/fHN1aXZhbnRlP3M/KT9cXFxccyonICtcbiAgICAnKHNlY29uZGVzP3xtaW4oPzp1dGUpP3M/fGhldXJlcz98am91cnM/fHNlbWFpbmVzP3xtb2lzfHRyaW1lc3RyZXM/fGFubsOpZXM/KVxcXFxzKicgK1xuICAgICcocHJvY2hhaW5lP3M/fGRlcm5pW2XDqF1yZT9zP3xwYXNzW8OpZV1lP3M/fHByW8OpZV1jW8OpZV1kZW50cz98c3VpdmFudGU/cz8pPycgK1xuICAgICcoPz1cXFxcV3wkKScsICdpJ1xuKTtcblxudmFyIE1VTFRJUExJRVJfR1JPVVAgPSAyO1xudmFyIE1PRElGSUVSXzFfR1JPVVAgPSAzO1xudmFyIFJFTEFUSVZFX1dPUkRfR1JPVVAgPSA0O1xudmFyIE1PRElGSUVSXzJfR1JPVVAgPSA1O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEZSUmVsYXRpdmVEYXRlRm9ybWF0UGFyc2VyKCl7XG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH07XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xuICAgICAgICB2YXIgaW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIHRleHQgID0gbWF0Y2hbMF07XG4gICAgICAgIHRleHQgID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKTtcblxuICAgICAgICAvLyBNdWx0aXBsaWVyXG4gICAgICAgIHZhciBtdWx0aXBsaWVyID0gbWF0Y2hbTVVMVElQTElFUl9HUk9VUF0gPT09IHVuZGVmaW5lZCA/ICcxJyA6IG1hdGNoW01VTFRJUExJRVJfR1JPVVBdO1xuICAgICAgICBpZiAodXRpbC5JTlRFR0VSX1dPUkRTW211bHRpcGxpZXJdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG11bHRpcGxpZXIgPSB1dGlsLklOVEVHRVJfV09SRFNbbXVsdGlwbGllcl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtdWx0aXBsaWVyID0gcGFyc2VJbnQobXVsdGlwbGllcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNb2RpZmllclxuICAgICAgICB2YXIgbW9kaWZpZXIgPSBtYXRjaFtNT0RJRklFUl8xX0dST1VQXSA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgICAgICAgICAgKG1hdGNoW01PRElGSUVSXzJfR1JPVVBdID09PSB1bmRlZmluZWQgPyAnJyA6IG1hdGNoW01PRElGSUVSXzJfR1JPVVBdLnRvTG93ZXJDYXNlKCkpXG4gICAgICAgICAgICAgICAgICAgICA6IG1hdGNoW01PRElGSUVSXzFfR1JPVVBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmKCFtb2RpZmllcikge1xuICAgICAgICAgICAgLy8gQXQgbGVhc3Qgb25lIG1vZGlmaWVyIGlzIG1hbmRhdG9yeSB0byBtYXRjaCB0aGlzIHBhcnNlclxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHJlZjogcmVmXG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQudGFnc1snRlJSZWxhdGl2ZURhdGVGb3JtYXRQYXJzZXInXSA9IHRydWU7XG5cbiAgICAgICAgdmFyIG1vZGlmaWVyRmFjdG9yO1xuICAgICAgICBzd2l0Y2godHJ1ZSkge1xuICAgICAgICAgICAgY2FzZSAvcHJvY2hhaW5lP3M/Ly50ZXN0KG1vZGlmaWVyKTpcbiAgICAgICAgICAgIGNhc2UgL3N1aXZhbnRzPy8udGVzdChtb2RpZmllcik6XG4gICAgICAgICAgICAgICAgbW9kaWZpZXJGYWN0b3IgPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAvZGVybmlbZcOoXXJlP3M/Ly50ZXN0KG1vZGlmaWVyKTpcbiAgICAgICAgICAgIGNhc2UgL3Bhc3Nbw6llXWU/cz8vLnRlc3QobW9kaWZpZXIpOlxuICAgICAgICAgICAgY2FzZSAvcHJbw6llXWNbw6llXWRlbnRzPy8udGVzdChtb2RpZmllcik6XG4gICAgICAgICAgICAgICAgbW9kaWZpZXJGYWN0b3IgPSAtMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3RhbCA9IG11bHRpcGxpZXIgKiBtb2RpZmllckZhY3RvcjtcblxuICAgICAgICB2YXIgZGF0ZUZyb20gPSBtb21lbnQocmVmKSxcbiAgICAgICAgICAgIGRhdGVUbyA9IG1vbWVudChyZWYpO1xuICAgICAgICBkYXRlRnJvbS5sb2NhbGUoJ2ZyJyk7XG4gICAgICAgIGRhdGVUby5sb2NhbGUoJ2ZyJyk7XG4gICAgICAgIHZhciByZWxhdGl2ZSA9IG1hdGNoW1JFTEFUSVZFX1dPUkRfR1JPVVBdO1xuICAgICAgICB2YXIgc3RhcnRPZjtcbiAgICAgICAgc3dpdGNoKHRydWUpIHtcbiAgICAgICAgICAgIGNhc2UgL3NlY29uZGVzPy8udGVzdChyZWxhdGl2ZSk6XG4gICAgICAgICAgICAgICAgZGF0ZUZyb20uYWRkKHRvdGFsLCAncycpO1xuICAgICAgICAgICAgICAgIGRhdGVUby5hZGQobW9kaWZpZXJGYWN0b3IsICdzJyk7XG4gICAgICAgICAgICAgICAgc3RhcnRPZiA9ICdzZWNvbmQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAvbWluKD86dXRlKT9zPy8udGVzdChyZWxhdGl2ZSk6XG4gICAgICAgICAgICAgICAgZGF0ZUZyb20uYWRkKHRvdGFsLCAnbScpO1xuICAgICAgICAgICAgICAgIGRhdGVUby5hZGQobW9kaWZpZXJGYWN0b3IsICdtJyk7XG4gICAgICAgICAgICAgICAgc3RhcnRPZiA9ICdtaW51dGUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAvaGV1cmVzPy8udGVzdChyZWxhdGl2ZSk6XG4gICAgICAgICAgICAgICAgZGF0ZUZyb20uYWRkKHRvdGFsLCAnaCcpO1xuICAgICAgICAgICAgICAgIGRhdGVUby5hZGQobW9kaWZpZXJGYWN0b3IsICdoJyk7XG4gICAgICAgICAgICAgICAgc3RhcnRPZiA9ICdob3VyJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgL2pvdXJzPy8udGVzdChyZWxhdGl2ZSk6XG4gICAgICAgICAgICAgICAgZGF0ZUZyb20uYWRkKHRvdGFsLCAnZCcpO1xuICAgICAgICAgICAgICAgIGRhdGVUby5hZGQobW9kaWZpZXJGYWN0b3IsICdkJyk7XG4gICAgICAgICAgICAgICAgc3RhcnRPZiA9ICdkYXknO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAvc2VtYWluZXM/Ly50ZXN0KHJlbGF0aXZlKTpcbiAgICAgICAgICAgICAgICBkYXRlRnJvbS5hZGQodG90YWwsICd3Jyk7XG4gICAgICAgICAgICAgICAgZGF0ZVRvLmFkZChtb2RpZmllckZhY3RvciwgJ3cnKTtcbiAgICAgICAgICAgICAgICBzdGFydE9mID0gJ3dlZWsnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAvbW9pcz8vLnRlc3QocmVsYXRpdmUpOlxuICAgICAgICAgICAgICAgIGRhdGVGcm9tLmFkZCh0b3RhbCwgJ00nKTtcbiAgICAgICAgICAgICAgICBkYXRlVG8uYWRkKG1vZGlmaWVyRmFjdG9yLCAnTScpO1xuICAgICAgICAgICAgICAgIHN0YXJ0T2YgPSAnbW9udGgnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAvdHJpbWVzdHJlcz8vLnRlc3QocmVsYXRpdmUpOlxuICAgICAgICAgICAgICAgIGRhdGVGcm9tLmFkZCh0b3RhbCwgJ1EnKTtcbiAgICAgICAgICAgICAgICBkYXRlVG8uYWRkKG1vZGlmaWVyRmFjdG9yLCAnUScpO1xuICAgICAgICAgICAgICAgIHN0YXJ0T2YgPSAncXVhcnRlcic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIC9hbm7DqWVzPy8udGVzdChyZWxhdGl2ZSk6XG4gICAgICAgICAgICAgICAgZGF0ZUZyb20uYWRkKHRvdGFsLCAneScpO1xuICAgICAgICAgICAgICAgIGRhdGVUby5hZGQobW9kaWZpZXJGYWN0b3IsICd5Jyk7XG4gICAgICAgICAgICAgICAgc3RhcnRPZiA9ICd5ZWFyJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHdlIGdvIGZvcndhcmQsIHN3aXRjaCB0aGUgc3RhcnQgYW5kIGVuZCBkYXRlc1xuICAgICAgICBpZihtb2RpZmllckZhY3RvciA+IDApIHtcbiAgICAgICAgICAgIHZhciBkYXRlVG1wID0gZGF0ZUZyb207XG4gICAgICAgICAgICBkYXRlRnJvbSA9IGRhdGVUbztcbiAgICAgICAgICAgIGRhdGVUbyA9IGRhdGVUbXA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXQgc3RhcnQgYW5kIGVuZCBvZiBkYXRlc1xuICAgICAgICBkYXRlRnJvbS5zdGFydE9mKHN0YXJ0T2YpO1xuICAgICAgICBkYXRlVG8uZW5kT2Yoc3RhcnRPZik7XG5cbiAgICAgICAgLy8gQXNzaWduIHJlc3VsdHNcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIGRhdGVGcm9tLnllYXIoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgZGF0ZUZyb20ubW9udGgoKSArIDEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXRlRnJvbS5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBkYXRlRnJvbS5taW51dGUoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3NlY29uZCcsIGRhdGVGcm9tLnNlY29uZCgpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIGRhdGVGcm9tLmhvdXIoKSk7XG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21pbGxpc2Vjb25kJywgZGF0ZUZyb20ubWlsbGlzZWNvbmQoKSk7XG5cbiAgICAgICAgcmVzdWx0LmVuZCA9IHJlc3VsdC5zdGFydC5jbG9uZSgpO1xuICAgICAgICByZXN1bHQuZW5kLmFzc2lnbigneWVhcicsIGRhdGVUby55ZWFyKCkpO1xuICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignbW9udGgnLCBkYXRlVG8ubW9udGgoKSArIDEpO1xuICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignZGF5JywgZGF0ZVRvLmRhdGUoKSk7XG4gICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCdtaW51dGUnLCBkYXRlVG8ubWludXRlKCkpO1xuICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignc2Vjb25kJywgZGF0ZVRvLnNlY29uZCgpKTtcbiAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2hvdXInLCBkYXRlVG8uaG91cigpKTtcbiAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ21pbGxpc2Vjb25kJywgZGF0ZVRvLm1pbGxpc2Vjb25kKCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59O1xuIiwiLypcclxuICAgIERhdGUgZm9ybWF0IHdpdGggc2xhc2ggXCIvXCIgKGFsc28gXCItXCIgYW5kIFwiLlwiKSBiZXR3ZWVuIG51bWJlcnNcclxuICAgIC0gTWFydGVzIDMvMTEvMjAxNVxyXG4gICAgLSAzLzExLzIwMTVcclxuICAgIC0gMy8xMVxyXG4qL1xyXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XHJcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XHJcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XHJcblxyXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoJyhcXFxcV3xeKScgK1xyXG4gICAgJyg/OicgK1xyXG4gICAgICAgICcoKD86ZGltYW5jaGV8ZGltfGx1bmRpfGx1bnxtYXJkaXxtYXJ8bWVyY3JlZGl8bWVyfGpldWRpfGpldXx2ZW5kcmVkaXx2ZW58c2FtZWRpfHNhbXxsZSkpJyArXHJcbiAgICAgICAgJ1xcXFxzKlxcXFwsP1xcXFxzKicgK1xyXG4gICAgJyk/JyArXHJcbiAgICAnKFswLTNdezAsMX1bMC05XXsxfSlbXFxcXC9cXFxcLlxcXFwtXShbMC0zXXswLDF9WzAtOV17MX0pJyArXHJcbiAgICAnKD86JyArXHJcbiAgICAgICAgJ1tcXFxcL1xcXFwuXFxcXC1dJyArXHJcbiAgICAgICAgJyhbMC05XXs0fVxccypcXCw/XFxzKnxbMC05XXsyfVxccypcXCw/XFxzKiknICtcclxuICAgICcpPycgK1xyXG4gICAgJyhcXFxcV3wkKScsICdpJyk7XHJcblxyXG52YXIgREFZU19PRkZTRVQgPSB7ICdkaW1hbmNoZSc6IDAsICdkaW0nOiAwLCAnbHVuZGknOiAxLCAnbHVuJzogMSwnbWFyZGknOiAyLCAnbWFyJzoyLCAnbWVyY3JlZGknOiAzLCAnbWVyJzogMyxcclxuICAgICdqZXVkaSc6IDQsICdqZXUnOjQsICd2ZW5kcmVkaSc6IDUsICd2ZW4nOiA1LCdzYW1lZGknOiA2LCAnc2FtJzogNn07XHJcblxyXG5cclxudmFyIE9QRU5OSU5HX0dST1VQID0gMTtcclxudmFyIEVORElOR19HUk9VUCA9IDY7XHJcblxyXG4vLyBJbiBGcmVuY2ggd2UgdXNlIGRheS9tb250aC95ZWFyXHJcbnZhciBXRUVLREFZX0dST1VQID0gMjtcclxudmFyIERBWV9HUk9VUCA9IDM7XHJcbnZhciBNT05USF9HUk9VUCA9IDQ7XHJcbnZhciBZRUFSX0dST1VQID0gNTtcclxuXHJcbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gRlJTbGFzaERhdGVGb3JtYXRQYXJzZXIoYXJndW1lbnQpIHtcclxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFBBVFRFUk47IH07XHJcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xyXG5cclxuICAgICAgICBpZihtYXRjaFtPUEVOTklOR19HUk9VUF0gPT0gJy8nIHx8IG1hdGNoW0VORElOR19HUk9VUF0gPT0gJy8nKSB7XHJcbiAgICAgICAgICAgIC8vIExvbmcgc2tpcCwgaWYgdGhlcmUgaXMgc29tZSBvdmVybGFwcGluZyBsaWtlOlxyXG4gICAgICAgICAgICAvLyBYWFsvWVkvWlpdXHJcbiAgICAgICAgICAgIC8vIFtYWC9ZWS9dWlpcclxuICAgICAgICAgICAgbWF0Y2guaW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbT1BFTk5JTkdfR1JPVVBdLmxlbmd0aDtcclxuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdLnN1YnN0cihtYXRjaFtPUEVOTklOR19HUk9VUF0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFtFTkRJTkdfR1JPVVBdLmxlbmd0aCk7XHJcblxyXG5cclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XHJcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgcmVmOiByZWYsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmKHRleHQubWF0Y2goL15cXGRcXC5cXGQkLykpIHJldHVybjtcclxuICAgICAgICBpZih0ZXh0Lm1hdGNoKC9eXFxkXFwuXFxkezEsMn1cXC5cXGR7MSwyfSQvKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBNTS9kZCAtPiBPS1xyXG4gICAgICAgIC8vIE1NLmRkIC0+IE5HXHJcbiAgICAgICAgaWYoIW1hdGNoW1lFQVJfR1JPVVBdICYmIG1hdGNoWzBdLmluZGV4T2YoJy8nKSA8IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIGRhdGUgPSBudWxsO1xyXG4gICAgICAgIHZhciB5ZWFyID0gbWF0Y2hbWUVBUl9HUk9VUF0gfHwgbW9tZW50KHJlZikueWVhcigpICsgJyc7XHJcbiAgICAgICAgdmFyIG1vbnRoID0gbWF0Y2hbTU9OVEhfR1JPVVBdO1xyXG4gICAgICAgIHZhciBkYXkgICA9IG1hdGNoW0RBWV9HUk9VUF07XHJcblxyXG4gICAgICAgIGRheSAgPSBwYXJzZUludChkYXkpO1xyXG4gICAgICAgIG1vbnRoID0gcGFyc2VJbnQobW9udGgpO1xyXG4gICAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyKTtcclxuXHJcbiAgICAgICAgaWYobW9udGggPCAxIHx8IG1vbnRoID4gMTIpIHtcclxuICAgICAgICAgICAgaWYobW9udGggPiAxMikge1xyXG4gICAgICAgICAgICAgICAgLy8gZGQvbW0veXl5eSBkYXRlIGZvcm1hdCBpZiBkYXkgbG9va3MgbGlrZSBhIG1vbnRoLCBhbmQgbW9udGggbG9va3MgbGlrZSBhIGRheS5cclxuICAgICAgICAgICAgICAgIGlmIChkYXkgPj0gMSAmJiBkYXkgPD0gMTIgJiYgbW9udGggPj0gMTMgJiYgbW9udGggPD0gMzEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1bmFtYmlndW91c1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZGF5ID0gbW9udGg7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSBkYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5ID0gdGRheTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGJvdGggbW9udGggYW5kIGRheSBhcmUgPD0gMTJcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXkgPCAxIHx8IGRheSA+IDMxKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgaWYoeWVhciA8IDEwMCl7XHJcbiAgICAgICAgICAgIGlmKHllYXIgPiA1MCl7XHJcbiAgICAgICAgICAgICAgICB5ZWFyID0geWVhciArIDE5MDA7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgeWVhciA9IHllYXIgKyAyMDAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBkYXkpO1xyXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgbW9udGgpO1xyXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcclxuXHJcbiAgICAgICAgLy8gRGF5IG9mIHdlZWtcclxuICAgICAgICBpZihtYXRjaFtXRUVLREFZX0dST1VQXSkge1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd3ZWVrZGF5JywgREFZU19PRkZTRVRbbWF0Y2hbV0VFS0RBWV9HUk9VUF0udG9Mb3dlckNhc2UoKV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0ZSU2xhc2hEYXRlRm9ybWF0UGFyc2VyJ10gPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG59OyIsIi8qXHJcblxyXG5cclxuKi9cclxuXHJcbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcclxudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcclxudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcclxuXHJcbnZhciBQQVRURVJOID0gLyhcXFd8XilpbCB5IGFcXHMqKFswLTldK3x1bmU/KVxccyoobWludXRlcz98aGV1cmVzP3xzZW1haW5lcz98am91cnM/fG1vaXN8YW5uw6llcz98YW5zPykoPz0oPzpcXFd8JCkpL2k7XHJcblxyXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEZSVGltZUFnb0Zvcm1hdFBhcnNlcigpe1xyXG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFBBVFRFUk47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXtcclxuXHJcbiAgICAgICAgaWYgKG1hdGNoLmluZGV4ID4gMCAmJiB0ZXh0W21hdGNoLmluZGV4LTFdLm1hdGNoKC9cXHcvKSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF07XHJcbiAgICAgICAgdGV4dCAgPSBtYXRjaFswXS5zdWJzdHIobWF0Y2hbMV0ubGVuZ3RoLCBtYXRjaFswXS5sZW5ndGggLSBtYXRjaFsxXS5sZW5ndGgpO1xyXG4gICAgICAgIGluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgICByZWY6IHJlZixcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXN1bHQudGFnc1snRlJUaW1lQWdvRm9ybWF0UGFyc2VyJ10gPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBudW0gPSBwYXJzZUludChtYXRjaFsyXSk7XHJcbiAgICAgICAgaWYgKGlzTmFOKG51bSkpIHtcclxuICAgICAgICAgIGlmIChtYXRjaFsyXS5tYXRjaCgvZGVtaS8pKSB7XHJcbiAgICAgICAgICAgIG51bSA9IDAuNTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG51bSA9IDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZGF0ZSA9IG1vbWVudChyZWYpO1xyXG5cclxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL2hldXJlLykgfHwgbWF0Y2hbM10ubWF0Y2goL21pbnV0ZS8pKSB7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvaGV1cmUvKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdob3VyJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzNdLm1hdGNoKC9taW51dGUvKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdtaW51dGUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXRlLmRhdGUoKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcclxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdob3VyJywgZGF0ZS5ob3VyKCkpO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBkYXRlLm1pbnV0ZSgpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL3NlbWFpbmUvKSkge1xyXG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnd2VlaycpO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdkYXknLCBkYXRlLmRhdGUoKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcclxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgZGF0ZS55ZWFyKCkpO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3dlZWtkYXknLCBkYXRlLmRheSgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvam91ci8pKSB7XHJcbiAgICAgICAgICAgIGRhdGUuYWRkKC1udW0sICdkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF0Y2hbM10ubWF0Y2goL21vaXMvKSkge1xyXG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAnbW9udGgnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtYXRjaFszXS5tYXRjaCgvYW5uw6llcz98YW5zPy8pKSB7XHJcblxyXG4gICAgICAgICAgICBkYXRlLmFkZCgtbnVtLCAneWVhcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF0ZS5kYXRlKCkpO1xyXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XHJcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIGRhdGUueWVhcigpKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICAgIH07XHJcbn1cclxuIiwiLypcclxuXHJcblxyXG4qL1xyXG5cclxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xyXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xyXG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xyXG52YXIgUGFyc2VkQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZENvbXBvbmVudHM7XHJcblxyXG52YXIgRklSU1RfUkVHX1BBVFRFUk4gID0gbmV3IFJlZ0V4cChcIihefFxcXFxzfFQpXCIgK1xyXG4gICAgXCIoPzooPzpbw6BhXSlcXFxccyopP1wiICtcclxuICAgIFwiKFxcXFxkezEsMn0oPzpoKT98bWlkaXxtaW51aXQpXCIgK1xyXG4gICAgXCIoPzpcIiArXHJcbiAgICAgICAgXCIoPzpcXFxcLnxcXFxcOnxcXFxc77yafGgpKFxcXFxkezEsMn0pKD86bSk/XCIgK1xyXG4gICAgICAgIFwiKD86XCIgK1xyXG4gICAgICAgICAgICBcIig/OlxcXFw6fFxcXFzvvJp8bSkoXFxcXGR7MCwyfSkoPzpzKT9cIiArXHJcbiAgICAgICAgXCIpP1wiICtcclxuICAgIFwiKT9cIiArXHJcbiAgICBcIig/OlxcXFxzKihBXFxcXC5NXFxcXC58UFxcXFwuTVxcXFwufEFNP3xQTT8pKT9cIiArXHJcbiAgICBcIig/PVxcXFxXfCQpXCIsICdpJyk7XHJcblxyXG5cclxudmFyIFNFQ09ORF9SRUdfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqXCIgK1xyXG4gICAgXCIoXFxcXC18XFxcXOKAk3xcXFxcfnxcXFxc44CcfFvDoGFdfFxcXFw/KVxcXFxzKlwiICtcclxuICAgIFwiKFxcXFxkezEsMn0oPzpoKT8pXCIgK1xyXG4gICAgXCIoPzpcIiArXHJcbiAgICAgICAgXCIoPzpcXFxcLnxcXFxcOnxcXFxc77yafGgpKFxcXFxkezEsMn0pKD86bSk/XCIgK1xyXG4gICAgICAgIFwiKD86XCIgK1xyXG4gICAgICAgICAgICBcIig/OlxcXFwufFxcXFw6fFxcXFzvvJp8bSkoXFxcXGR7MSwyfSkoPzpzKT9cIiArXHJcbiAgICAgICAgXCIpP1wiICtcclxuICAgIFwiKT9cIiArXHJcbiAgICBcIig/OlxcXFxzKihBXFxcXC5NXFxcXC58UFxcXFwuTVxcXFwufEFNP3xQTT8pKT9cIiArXHJcbiAgICBcIig/PVxcXFxXfCQpXCIsICdpJyk7XHJcblxyXG52YXIgSE9VUl9HUk9VUCAgICA9IDI7XHJcbnZhciBNSU5VVEVfR1JPVVAgID0gMztcclxudmFyIFNFQ09ORF9HUk9VUCAgPSA0O1xyXG52YXIgQU1fUE1fSE9VUl9HUk9VUCA9IDU7XHJcblxyXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEZSVGltZUV4cHJlc3Npb25QYXJzZXIoKXtcclxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gRklSU1RfUkVHX1BBVFRFUk47IH1cclxuXHJcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xyXG5cclxuICAgICAgICAvLyBUaGlzIHBhdHRlcm4gY2FuIGJlIG92ZXJsYXBlZCBFeC4gWzEyXSBBTSwgMVsyXSBBTVxyXG4gICAgICAgIGlmIChtYXRjaC5pbmRleCA+IDAgJiYgdGV4dFttYXRjaC5pbmRleC0xXS5tYXRjaCgvXFx3LykpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCgpO1xyXG4gICAgICAgIHJlc3VsdC5yZWYgPSByZWY7XHJcbiAgICAgICAgcmVzdWx0LmluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XHJcbiAgICAgICAgcmVzdWx0LnRleHQgID0gbWF0Y2hbMF0uc3Vic3RyaW5nKG1hdGNoWzFdLmxlbmd0aCk7XHJcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ0ZSVGltZUV4cHJlc3Npb25QYXJzZXInXSA9IHRydWU7XHJcblxyXG4gICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5JywgICByZWZNb21lbnQuZGF0ZSgpKTtcclxuICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgcmVmTW9tZW50Lm1vbnRoKCkrMSk7XHJcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgIHJlZk1vbWVudC55ZWFyKCkpO1xyXG5cclxuICAgICAgICB2YXIgaG91ciA9IDA7XHJcbiAgICAgICAgdmFyIG1pbnV0ZSA9IDA7XHJcbiAgICAgICAgdmFyIG1lcmlkaWVtID0gLTE7XHJcblxyXG4gICAgICAgIC8vIC0tLS0tIFNlY29uZFxyXG4gICAgICAgIGlmKG1hdGNoW1NFQ09ORF9HUk9VUF0gIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHZhciBzZWNvbmQgPSBwYXJzZUludChtYXRjaFtTRUNPTkRfR1JPVVBdKTtcclxuICAgICAgICAgICAgaWYoc2Vjb25kID49IDYwKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3NlY29uZCcsIHNlY29uZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAtLS0tLSBIb3Vyc1xyXG4gICAgICAgIGlmIChtYXRjaFtIT1VSX0dST1VQXS50b0xvd2VyQ2FzZSgpID09IFwibWlkaVwiKXtcclxuICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xyXG4gICAgICAgICAgICBob3VyID0gMTI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtIT1VSX0dST1VQXS50b0xvd2VyQ2FzZSgpID09IFwibWludWl0XCIpIHtcclxuICAgICAgICAgICAgbWVyaWRpZW0gPSAwO1xyXG4gICAgICAgICAgICBob3VyID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBob3VyID0gcGFyc2VJbnQobWF0Y2hbSE9VUl9HUk9VUF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLS0tLS0gTWludXRlc1xyXG4gICAgICAgIGlmKG1hdGNoW01JTlVURV9HUk9VUF0gIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIG1pbnV0ZSA9IHBhcnNlSW50KG1hdGNoW01JTlVURV9HUk9VUF0pO1xyXG4gICAgICAgIH0gZWxzZSBpZihob3VyID4gMTAwKSB7XHJcbiAgICAgICAgICAgIG1pbnV0ZSA9IGhvdXIlMTAwO1xyXG4gICAgICAgICAgICBob3VyICAgPSBwYXJzZUludChob3VyLzEwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihtaW51dGUgPj0gNjApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihob3VyID4gMjQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChob3VyID49IDEyKSB7XHJcbiAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIC0tLS0tIEFNICYgUE1cclxuICAgICAgICBpZihtYXRjaFtBTV9QTV9IT1VSX0dST1VQXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIHZhciBhbXBtID0gbWF0Y2hbQU1fUE1fSE9VUl9HUk9VUF1bMF0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYoYW1wbSA9PSBcImFcIil7XHJcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZihob3VyID09IDEyKSBob3VyID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoYW1wbSA9PSBcInBcIil7XHJcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDE7XHJcbiAgICAgICAgICAgICAgICBpZihob3VyICE9IDEyKSBob3VyICs9IDEyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCBob3VyKTtcclxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBtaW51dGUpO1xyXG4gICAgICAgIGlmIChtZXJpZGllbSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21lcmlkaWVtJywgbWVyaWRpZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgIEV4dHJhY3RpbmcgdGhlICd0bycgY2h1bmtcclxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgIG1hdGNoID0gU0VDT05EX1JFR19QQVRURVJOLmV4ZWModGV4dC5zdWJzdHJpbmcocmVzdWx0LmluZGV4ICsgcmVzdWx0LnRleHQubGVuZ3RoKSk7XHJcbiAgICAgICAgaWYgKCFtYXRjaCkge1xyXG4gICAgICAgICAgICAvLyBOb3QgYWNjZXB0IG51bWJlciBvbmx5IHJlc3VsdFxyXG4gICAgICAgICAgICBpZiAocmVzdWx0LnRleHQubWF0Y2goL15cXGQrJC8pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvLyBQYXR0ZXJuIFwiWVkuWVkgLVhYWFhcIiBpcyBtb3JlIGxpa2UgdGltZXpvbmUgb2Zmc2V0XHJcbiAgICAgICAgaWYgKG1hdGNoWzBdLm1hdGNoKC9eXFxzKihcXCt8XFwtKVxccypcXGR7Myw0fSQvKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYocmVzdWx0LmVuZCA9PSBudWxsKXtcclxuICAgICAgICAgICAgcmVzdWx0LmVuZCA9IG5ldyBQYXJzZWRDb21wb25lbnRzKG51bGwsIHJlc3VsdC5zdGFydC5kYXRlKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGhvdXIgPSAwO1xyXG4gICAgICAgIHZhciBtaW51dGUgPSAwO1xyXG4gICAgICAgIHZhciBtZXJpZGllbSA9IC0xO1xyXG5cclxuICAgICAgICAvLyAtLS0tLSBTZWNvbmRcclxuICAgICAgICBpZihtYXRjaFtTRUNPTkRfR1JPVVBdICE9IG51bGwpe1xyXG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gcGFyc2VJbnQobWF0Y2hbU0VDT05EX0dST1VQXSk7XHJcbiAgICAgICAgICAgIGlmKHNlY29uZCA+PSA2MCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignc2Vjb25kJywgc2Vjb25kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhvdXIgPSBwYXJzZUludChtYXRjaFsyXSk7XHJcblxyXG4gICAgICAgIC8vIC0tLS0tIE1pbnV0ZVxyXG4gICAgICAgIGlmIChtYXRjaFtNSU5VVEVfR1JPVVBdIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgbWludXRlID0gcGFyc2VJbnQobWF0Y2hbTUlOVVRFX0dST1VQXSk7XHJcbiAgICAgICAgICAgIGlmKG1pbnV0ZSA+PSA2MCkgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChob3VyID4gMTAwKSB7XHJcblxyXG4gICAgICAgICAgICBtaW51dGUgPSBob3VyJTEwMDtcclxuICAgICAgICAgICAgaG91ciAgID0gcGFyc2VJbnQoaG91ci8xMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobWludXRlID49IDYwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaG91ciA+IDI0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaG91ciA+PSAxMikge1xyXG4gICAgICAgICAgICBtZXJpZGllbSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAtLS0tLSBBTSAmIFBNXHJcbiAgICAgICAgaWYgKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdICE9IG51bGwpe1xyXG5cclxuICAgICAgICAgICAgaWYgKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZihtYXRjaFtBTV9QTV9IT1VSX0dST1VQXVswXS50b0xvd2VyQ2FzZSgpID09IFwiYVwiKXtcclxuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMDtcclxuICAgICAgICAgICAgICAgIGlmKGhvdXIgPT0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICBob3VyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5lbmQuaXNDZXJ0YWluKCdkYXknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmltcGx5KCdkYXknLCByZXN1bHQuZW5kLmdldCgnZGF5JykgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdWzBdLnRvTG93ZXJDYXNlKCkgPT0gXCJwXCIpe1xyXG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYoaG91ciAhPSAxMikgaG91ciArPSAxMjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdtZXJpZGllbScpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVyaWRpZW0gPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgPT0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgIT0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignaG91cicsIHJlc3VsdC5zdGFydC5nZXQoJ2hvdXInKSArIDEyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmKGhvdXIgPj0gMTIpIHtcclxuICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzdWx0LnRleHQgPSByZXN1bHQudGV4dCArIG1hdGNoWzBdO1xyXG4gICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCdob3VyJywgaG91cik7XHJcbiAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ21pbnV0ZScsIG1pbnV0ZSk7XHJcbiAgICAgICAgaWYgKG1lcmlkaWVtID49IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ21lcmlkaWVtJywgbWVyaWRpZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdC5lbmQuZGF0ZSgpLmdldFRpbWUoKSA8IHJlc3VsdC5zdGFydC5kYXRlKCkuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lbmQuaW1wbHkoJ2RheScsIHJlc3VsdC5lbmQuZ2V0KCdkYXknKSArIDEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcbiIsIi8qXHJcblxyXG5cclxuKi9cclxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xyXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xyXG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xyXG52YXIgdXBkYXRlUGFyc2VkQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vRU4vRU5XZWVrZGF5UGFyc2VyJykudXBkYXRlUGFyc2VkQ29tcG9uZW50O1xyXG5cclxudmFyIERBWVNfT0ZGU0VUID0geyAnZGltYW5jaGUnOiAwLCAnZGltJzogMCwgJ2x1bmRpJzogMSwgJ2x1bic6IDEsJ21hcmRpJzogMiwgJ21hcic6MiwgJ21lcmNyZWRpJzogMywgJ21lcic6IDMsXHJcbiAgICAnamV1ZGknOiA0LCAnamV1Jzo0LCAndmVuZHJlZGknOiA1LCAndmVuJzogNSwnc2FtZWRpJzogNiwgJ3NhbSc6IDZ9O1xyXG5cclxudmFyIFBBVFRFUk4gPSBuZXcgUmVnRXhwKCcoXFxcXHN8XiknICtcclxuICAgICcoPzooPzpcXFxcLHxcXFxcKHxcXFxc77yIKVxcXFxzKik/JyArXHJcbiAgICAnKD86KGNlKVxcXFxzKik/JyArXHJcbiAgICAnKCcgKyBPYmplY3Qua2V5cyhEQVlTX09GRlNFVCkuam9pbignfCcpICsgJyknICtcclxuICAgICcoPzpcXFxccyooPzpcXFxcLHxcXFxcKXxcXFxc77yJKSk/JyArXHJcbiAgICAnKD86XFxcXHMqKGRlcm5pZXJ8cHJvY2hhaW4pXFxcXHMqKT8nICtcclxuICAgICcoPz1cXFxcV3wkKScsICdpJyk7XHJcblxyXG52YXIgUFJFRklYX0dST1VQID0gMjtcclxudmFyIFdFRUtEQVlfR1JPVVAgPSAzO1xyXG52YXIgUE9TVEZJWF9HUk9VUCA9IDQ7XHJcblxyXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEZSV2Vla2RheVBhcnNlcigpIHtcclxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfTtcclxuXHJcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpe1xyXG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xyXG4gICAgICAgIHZhciB0ZXh0ID0gbWF0Y2hbMF0uc3Vic3RyKG1hdGNoWzFdLmxlbmd0aCwgbWF0Y2hbMF0ubGVuZ3RoIC0gbWF0Y2hbMV0ubGVuZ3RoKTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgICAgICAgcmVmOiByZWZcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGRheU9mV2VlayA9IG1hdGNoW1dFRUtEQVlfR1JPVVBdLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdmFyIG9mZnNldCA9IERBWVNfT0ZGU0VUW2RheU9mV2Vla107XHJcbiAgICAgICAgaWYob2Zmc2V0ID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICB2YXIgbW9kaWZpZXIgPSBudWxsO1xyXG4gICAgICAgIHZhciBwcmVmaXggPSBtYXRjaFtQUkVGSVhfR1JPVVBdO1xyXG4gICAgICAgIHZhciBwb3N0Zml4ID0gbWF0Y2hbUE9TVEZJWF9HUk9VUF07XHJcbiAgICAgICAgaWYgKHByZWZpeCB8fCBwb3N0Zml4KSB7XHJcbiAgICAgICAgICAgIHZhciBub3JtID0gcHJlZml4IHx8IHBvc3RmaXg7XHJcbiAgICAgICAgICAgIG5vcm0gPSBub3JtLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZihub3JtID09ICdkZXJuaWVyJykge1xyXG4gICAgICAgICAgICAgICAgbW9kaWZpZXIgPSAnbGFzdCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihub3JtID09ICdwcm9jaGFpbicpIHtcclxuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gJ25leHQnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYobm9ybT09ICdjZScpIHtcclxuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gJ3RoaXMnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVQYXJzZWRDb21wb25lbnQocmVzdWx0LCByZWYsIG9mZnNldCwgbW9kaWZpZXIpO1xyXG4gICAgICAgIHJlc3VsdC50YWdzWydGUldlZWtkYXlQYXJzZXInXSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufTtcclxuXHJcbiIsIi8qXG4gICAgXG4gICAgXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIFBBVFRFUk4gPSAv5LuK5pelfOW9k+aXpXzmmKjml6V85piO5pelfOS7iuWknHzku4rlpJV85LuK5pmpfOS7iuacnS9pO1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIEpQQ2FzdWFsRGF0ZVBhcnNlcigpe1xuICAgIFxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBcbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHsgcmV0dXJuIFBBVFRFUk47IH1cbiAgICBcbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpeyBcbiAgICAgICAgXG4gICAgICAgIHZhciBpbmRleCA9IG1hdGNoLmluZGV4O1xuICAgICAgICB2YXIgdGV4dCA9IG1hdGNoWzBdO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgdmFyIHN0YXJ0TW9tZW50ID0gcmVmTW9tZW50LmNsb25lKCk7XG5cbiAgICAgICAgaWYodGV4dCA9PSAn5LuK5aScJyB8fCB0ZXh0ID09ICfku4rlpJUnIHx8IHRleHQgPT0gJ+S7iuaZqScpe1xuICAgICAgICAgICAgLy8gTm9ybWFsbHkgbWVhbnMgdGhpcyBjb21pbmcgbWlkbmlnaHQgXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAyMik7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG5cbiAgICAgICAgfSBlbHNlIGlmKHRleHQgPT0gJ+aYjuaXpScpe1xuXG4gICAgICAgICAgICAvLyBDaGVjayBub3QgXCJUb21vcnJvd1wiIG9uIGxhdGUgbmlnaHRcbiAgICAgICAgICAgIGlmKHJlZk1vbWVudC5ob3VyKCkgPiA0KSB7XG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKDEsICdkYXknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYodGV4dCA9PSAn5pio5pelJykge1xuXG4gICAgICAgICAgICBzdGFydE1vbWVudC5hZGQoLTEsICdkYXknKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRleHQubWF0Y2goXCLku4rmnJ1cIikpIHtcblxuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgNik7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgc3RhcnRNb21lbnQubW9udGgoKSArIDEpXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpXG4gICAgICAgIHJlc3VsdC50YWdzWydKUENhc3VhbERhdGVQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG4iLCIvKlxuICAgIFxuICAgIFxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIHV0aWwgID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvSlAnKTsgXG52YXIgUEFUVEVSTiA9IC8oPzoo5ZCMfCgo5pit5ZKMfOW5s+aIkCk/KFswLTnvvJAt77yZXXsyLDR9KSkp5bm0XFxzKik/KFswLTnvvJAt77yZXXsxLDJ9KeaciFxccyooWzAtOe+8kC3vvJldezEsMn0p5pelL2k7XG4gIFxudmFyIFlFQVJfR1JPVVAgICAgICAgID0gMjtcbnZhciBFUkFfR1JPVVAgICAgICAgICA9IDM7XG52YXIgWUVBUl9OVU1CRVJfR1JPVVAgPSA0O1xudmFyIE1PTlRIX0dST1VQICAgICAgID0gNTtcbnZhciBEQVlfR1JPVVAgICAgICAgICA9IDY7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gSlBTdGFuZGFyZFBhcnNlcigpe1xuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIFxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gUEFUVEVSTjsgfVxuICAgIFxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCl7IFxuXG4gICAgICAgIHZhciBzdGFydE1vbWVudCA9IG1vbWVudChyZWYpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgICB0ZXh0OiBtYXRjaFswXSxcbiAgICAgICAgICAgIGluZGV4OiBtYXRjaC5pbmRleCxcbiAgICAgICAgICAgIHJlZjogcmVmLFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBtb250aCA9IG1hdGNoW01PTlRIX0dST1VQXTtcbiAgICAgICAgbW9udGggPSB1dGlsLnRvSGFua2FrdShtb250aCk7XG4gICAgICAgIG1vbnRoID0gcGFyc2VJbnQobW9udGgpO1xuXG4gICAgICAgIHZhciBkYXkgPSBtYXRjaFtEQVlfR1JPVVBdO1xuICAgICAgICBkYXkgPSB1dGlsLnRvSGFua2FrdShkYXkpO1xuICAgICAgICBkYXkgPSBwYXJzZUludChkYXkpO1xuXG4gICAgICAgIHN0YXJ0TW9tZW50LnNldCgnZGF0ZScsIGRheSk7XG4gICAgICAgIHN0YXJ0TW9tZW50LnNldCgnbW9udGgnLCBtb250aCAtIDEpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIHN0YXJ0TW9tZW50Lm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICBpZiAoIW1hdGNoW1lFQVJfR1JPVVBdKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vRmluZCB0aGUgbW9zdCBhcHByb3ByaWF0ZWQgeWVhclxuICAgICAgICAgICAgc3RhcnRNb21lbnQueWVhcihtb21lbnQocmVmKS55ZWFyKCkpO1xuICAgICAgICAgICAgdmFyIG5leHRZZWFyID0gc3RhcnRNb21lbnQuY2xvbmUoKS5hZGQoMSwgJ3knKTtcbiAgICAgICAgICAgIHZhciBsYXN0WWVhciA9IHN0YXJ0TW9tZW50LmNsb25lKCkuYWRkKC0xLCAneScpO1xuICAgICAgICAgICAgaWYoIE1hdGguYWJzKG5leHRZZWFyLmRpZmYobW9tZW50KHJlZikpKSA8IE1hdGguYWJzKHN0YXJ0TW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApeyAgXG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQgPSBuZXh0WWVhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIE1hdGguYWJzKGxhc3RZZWFyLmRpZmYobW9tZW50KHJlZikpKSA8IE1hdGguYWJzKHN0YXJ0TW9tZW50LmRpZmYobW9tZW50KHJlZikpKSApeyBcbiAgICAgICAgICAgICAgICBzdGFydE1vbWVudCA9IGxhc3RZZWFyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbWUVBUl9HUk9VUF0ubWF0Y2goJ+WQjOW5tCcpKSB7XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgeWVhciA9IG1hdGNoW1lFQVJfTlVNQkVSX0dST1VQXTtcbiAgICAgICAgICAgIHllYXIgPSB1dGlsLnRvSGFua2FrdSh5ZWFyKTtcbiAgICAgICAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyKTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoW0VSQV9HUk9VUF0gPT0gJ+W5s+aIkCcpIHtcbiAgICAgICAgICAgICAgICB5ZWFyICs9IDE5ODg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW0VSQV9HUk9VUF0gPT0gJ+aYreWSjCcpIHtcbiAgICAgICAgICAgICAgICB5ZWFyICs9IDE5MjU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCB5ZWFyKTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICByZXN1bHQudGFnc1snSlBTdGFuZGFyZFBhcnNlciddID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG59XG5cbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cChcbiAgICAnKOiAjOWutnznq4soPzrliLt85Y2zKXzljbPliLspfCcgK1xuICAgICco5LuKfOaYjnzogb185piofOWwi3znkLQpKOaXqXzmnJ185pmaKXwnICtcbiAgICAnKOS4iig/OuWNiHzmmZ0pfOacnSg/OuaXqSl85pepKD865LiKKXzkuIsoPzrljYh85pmdKXzmmY8oPzrmmZ0pfOaZmig/OuS4iil85aScKD865pmaKT985LitKD865Y2IKXzlh4woPzrmmagpKXwnICtcbiAgICAnKOS7inzmmI586IG9fOaYqHzlsIt855C0KSg/OuaXpXzlpKkpJyArXG4gICAgJyg/OltcXFxcc3wsfO+8jF0qKScgK1xuICAgICcoPzoo5LiKKD865Y2IfOaZnSl85pydKD865pepKXzml6koPzrkuIopfOS4iyg/OuWNiHzmmZ0pfOaZjyg/OuaZnSl85pmaKD865LiKKXzlpJwoPzrmmZopP3zkuK0oPzrljYgpfOWHjCg/OuaZqCkpKT8nLCAnaScpO1xuXG52YXIgTk9XX0dST1VQID0gMTtcbnZhciBEQVlfR1JPVVBfMSA9IDI7XG52YXIgVElNRV9HUk9VUF8xID0gMztcbnZhciBUSU1FX0dST1VQXzIgPSA0O1xudmFyIERBWV9HUk9VUF8zID0gNTtcbnZhciBUSU1FX0dST1VQXzMgPSA2O1xuXG5leHBvcnRzLlBhcnNlciA9IGZ1bmN0aW9uIFpISGFudENhc3VhbERhdGVQYXJzZXIoKSB7XG5cbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUEFUVEVSTjtcbiAgICB9O1xuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KSB7XG4gICAgICAgIHRleHQgPSBtYXRjaFswXTtcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXg7XG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgUGFyc2VkUmVzdWx0KHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlZk1vbWVudCA9IG1vbWVudChyZWYpO1xuICAgICAgICB2YXIgc3RhcnRNb21lbnQgPSByZWZNb21lbnQuY2xvbmUoKTtcblxuICAgICAgICBpZiAobWF0Y2hbTk9XX0dST1VQXSkge1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgcmVmTW9tZW50LmhvdXIoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21pbnV0ZScsIHJlZk1vbWVudC5taW51dGUoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3NlY29uZCcsIHJlZk1vbWVudC5zZWNvbmQoKSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21pbGxpc2Vjb25kJywgcmVmTW9tZW50Lm1pbGxpc2Vjb25kKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW0RBWV9HUk9VUF8xXSkge1xuICAgICAgICAgICAgdmFyIGRheTEgPSBtYXRjaFtEQVlfR1JPVVBfMV07XG4gICAgICAgICAgICB2YXIgdGltZTEgPSBtYXRjaFtUSU1FX0dST1VQXzFdO1xuXG4gICAgICAgICAgICBpZiAoZGF5MSA9PSAn5piOJyB8fCBkYXkxID09ICfogb0nKSB7XG4gICAgICAgICAgICAgIC8vIENoZWNrIG5vdCBcIlRvbW9ycm93XCIgb24gbGF0ZSBuaWdodFxuICAgICAgICAgICAgICBpZihyZWZNb21lbnQuaG91cigpID4gMSkge1xuICAgICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKDEsICdkYXknKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXkxID09ICfmmKgnIHx8IGRheTEgPT0gJ+WwiycgfHwgZGF5MSA9PSAn55C0Jykge1xuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgtMSwgJ2RheScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGltZTEgPT0gJ+aXqScgfHwgdGltZTEgPT0gJ+acnScpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCA2KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZTEgPT0gJ+aZmicpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAyMik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbVElNRV9HUk9VUF8yXSkge1xuICAgICAgICAgICAgdmFyIHRpbWVTdHJpbmcyID0gbWF0Y2hbVElNRV9HUk9VUF8yXTtcbiAgICAgICAgICAgIHZhciB0aW1lMiA9IHRpbWVTdHJpbmcyWzBdO1xuICAgICAgICAgICAgaWYgKHRpbWUyID09ICfml6knIHx8IHRpbWUyID09ICfmnJ0nIHx8IHRpbWUyID09ICfkuIonKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgNik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRpbWUyID09ICfkuIsnIHx8IHRpbWUyID09ICfmmY8nKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMTUpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZTIgPT0gJ+S4rScpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAxMik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lMiA9PSAn5aScJyB8fCB0aW1lMiA9PSAn5pmaJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDIyKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRpbWUyID09ICflh4wnKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtEQVlfR1JPVVBfM10pIHtcbiAgICAgICAgICAgIHZhciBkYXkzID0gbWF0Y2hbREFZX0dST1VQXzNdO1xuXG4gICAgICAgICAgICBpZiAoZGF5MyA9PSAn5piOJyB8fCBkYXkzID09ICfogb0nKSB7XG4gICAgICAgICAgICAgIC8vIENoZWNrIG5vdCBcIlRvbW9ycm93XCIgb24gbGF0ZSBuaWdodFxuICAgICAgICAgICAgICBpZihyZWZNb21lbnQuaG91cigpID4gMSkge1xuICAgICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKDEsICdkYXknKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXkzID09ICfmmKgnIHx8IGRheTMgPT0gJ+WwiycgfHwgZGF5MyA9PSAn55C0Jykge1xuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgtMSwgJ2RheScpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciB0aW1lU3RyaW5nMyA9IG1hdGNoW1RJTUVfR1JPVVBfM107XG4gICAgICAgICAgICBpZiAodGltZVN0cmluZzMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGltZTMgPSB0aW1lU3RyaW5nM1swXTtcbiAgICAgICAgICAgICAgICBpZiAodGltZTMgPT0gJ+aXqScgfHwgdGltZTMgPT0gJ+acnScgfHwgdGltZTMgPT0gJ+S4iicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgNik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lMyA9PSAn5LiLJyB8fCB0aW1lMyA9PSAn5pmPJykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAxNSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRpbWUzID09ICfkuK0nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnaG91cicsIDEyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZTMgPT0gJ+WknCcgfHwgdGltZTMgPT0gJ+aZmicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdob3VyJywgMjIpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lMyA9PSAn5YeMJykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2hvdXInLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ21vbnRoJywgc3RhcnRNb21lbnQubW9udGgoKSArIDEpXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpXG4gICAgICAgIHJlc3VsdC50YWdzLlpISGFudENhc3VhbERhdGVQYXJzZXIgPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59O1xuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlscy9aSC1IYW50LmpzJyk7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cChcbiAgICAnKFxcXFxkezIsNH18WycgKyBPYmplY3Qua2V5cyh1dGlsLk5VTUJFUikuam9pbignJykgKyAnXXsyLDR9KT8nICtcbiAgICAnKD86XFxcXHMqKScgK1xuICAgICcoPzrlubQpPycgK1xuICAgICcoPzpbXFxcXHN8LHzvvIxdKiknICtcbiAgICAnKFxcXFxkezEsMn18WycgKyBPYmplY3Qua2V5cyh1dGlsLk5VTUJFUikuam9pbignJykgKyAnXXsxLDJ9KScgK1xuICAgICcoPzpcXFxccyopJyArXG4gICAgJyg/OuaciCknICtcbiAgICAnKD86XFxcXHMqKScgK1xuICAgICcoXFxcXGR7MSwyfXxbJyArIE9iamVjdC5rZXlzKHV0aWwuTlVNQkVSKS5qb2luKCcnKSArICddezEsMn0pPycgK1xuICAgICcoPzpcXFxccyopJyArXG4gICAgJyg/OuaXpXzomZ8pPydcbik7XG5cbnZhciBZRUFSX0dST1VQID0gMTtcbnZhciBNT05USF9HUk9VUCA9IDI7XG52YXIgREFZX0dST1VQID0gMztcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBaSEhhbnREYXRlUGFyc2VyKCkge1xuXG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFBBVFRFUk47XG4gICAgfTtcblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCkge1xuICAgICAgICB2YXIgc3RhcnRNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgdGV4dDogbWF0Y2hbMF0sXG4gICAgICAgICAgICBpbmRleDogbWF0Y2guaW5kZXgsXG4gICAgICAgICAgICByZWY6IHJlZixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Nb250aFxuICAgICAgICB2YXIgbW9udGggPSBwYXJzZUludChtYXRjaFtNT05USF9HUk9VUF0pO1xuICAgICAgICBpZiAoaXNOYU4obW9udGgpKSBtb250aCA9IHV0aWwuemhTdHJpbmdUb051bWJlcihtYXRjaFtNT05USF9HUk9VUF0pO1xuICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtb250aCcsIG1vbnRoKTtcblxuICAgICAgICAvL0RheVxuICAgICAgICBpZiAobWF0Y2hbREFZX0dST1VQXSkge1xuICAgICAgICAgICAgdmFyIGRheSA9IHBhcnNlSW50KG1hdGNoW0RBWV9HUk9VUF0pO1xuICAgICAgICAgICAgaWYgKGlzTmFOKGRheSkpIGRheSA9IHV0aWwuemhTdHJpbmdUb051bWJlcihtYXRjaFtEQVlfR1JPVVBdKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2RheScsIGRheSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIHN0YXJ0TW9tZW50LmRhdGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1llYXJcbiAgICAgICAgaWYgKG1hdGNoW1lFQVJfR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgeWVhciA9IHBhcnNlSW50KG1hdGNoW1lFQVJfR1JPVVBdKTtcbiAgICAgICAgICAgIGlmIChpc05hTih5ZWFyKSkgeWVhciA9IHV0aWwuemhTdHJpbmdUb1llYXIobWF0Y2hbWUVBUl9HUk9VUF0pO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIHllYXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC50YWdzLlpISGFudERhdGVQYXJzZXIgPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59O1xuIiwiLypcblxuXG4qL1xuXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi4vcGFyc2VyJykuUGFyc2VyO1xudmFyIFBhcnNlZFJlc3VsdCA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZFJlc3VsdDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlscy9aSC1IYW50LmpzJyk7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cChcbiAgICAnKFxcXFxkK3xbJyArIE9iamVjdC5rZXlzKHV0aWwuTlVNQkVSKS5qb2luKCcnKSArICddK3zljYp85bm+KSg/OlxcXFxzKiknICtcbiAgICAnKD865YCLKT8nICtcbiAgICAnKOenkig/OumQmCk/fOWIhumQmHzlsI/mmYJ86ZCYfOaXpXzlpKl85pif5pyffOemruaLnHzmnIh85bm0KScgK1xuICAgICcoPzooPzrkuYt86YGOKT/lvox8KD865LmLKT/lhacpJywgJ2knXG4pO1xuXG52YXIgTlVNQkVSX0dST1VQID0gMTtcbnZhciBVTklUX0dST1VQID0gMjtcblxuZXhwb3J0cy5QYXJzZXIgPSBmdW5jdGlvbiBaSEhhbnRDYXN1YWxEYXRlUGFyc2VyKCkge1xuXG4gICAgUGFyc2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFBBVFRFUk47XG4gICAgfTtcblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCkge1xuICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXg7XG4gICAgICB0ZXh0ICA9IG1hdGNoWzBdO1xuXG4gICAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh7XG4gICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgcmVmOiByZWZcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgbnVtYmVyID0gcGFyc2VJbnQobWF0Y2hbTlVNQkVSX0dST1VQXSk7XG4gICAgICBpZiAoaXNOYU4obnVtYmVyKSl7XG4gICAgICAgIG51bWJlciA9IHV0aWwuemhTdHJpbmdUb051bWJlcihtYXRjaFtOVU1CRVJfR1JPVVBdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTmFOKG51bWJlcikpe1xuICAgICAgICB2YXIgc3RyaW5nID0gbWF0Y2hbTlVNQkVSX0dST1VQXTtcbiAgICAgICAgaWYgKHN0cmluZyA9PT0gJ+W5vicpe1xuICAgICAgICAgIG51bWJlciA9IDM7XG4gICAgICAgIH1lbHNlIGlmKHN0cmluZyA9PT0gJ+WNiicpe1xuICAgICAgICAgIG51bWJlciA9IDAuNTtcbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAvL2p1c3QgaW4gY2FzZVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXRlID0gbW9tZW50KHJlZik7XG4gICAgICB2YXIgdW5pdCA9IG1hdGNoW1VOSVRfR1JPVVBdO1xuICAgICAgdmFyIHVuaXRBYmJyID0gdW5pdFswXTtcblxuICAgICAgaWYgKHVuaXRBYmJyLm1hdGNoKC9b5pel5aSp5pif56au5pyI5bm0XS8pKXtcbiAgICAgICAgaWYodW5pdEFiYnIgPT0gJ+aXpScgfHwgdW5pdEFiYnIgPT0gJ+WkqScpe1xuICAgICAgICAgIGRhdGUuYWRkKG51bWJlciwgJ2QnKTtcbiAgICAgICAgfWVsc2UgaWYodW5pdEFiYnIgPT0gJ+aYnycgfHwgdW5pdEFiYnIgPT0gJ+emricpe1xuICAgICAgICAgIGRhdGUuYWRkKG51bWJlciAqIDcsICdkJyk7XG4gICAgICAgIH1lbHNlIGlmKHVuaXRBYmJyID09ICfmnIgnKXtcbiAgICAgICAgICBkYXRlLmFkZChudW1iZXIsICdtb250aCcpO1xuICAgICAgICB9ZWxzZSBpZih1bml0QWJiciA9PSAn5bm0Jyl7XG4gICAgICAgICAgZGF0ZS5hZGQobnVtYmVyLCAneWVhcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigneWVhcicsIGRhdGUueWVhcigpKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBkYXRlLm1vbnRoKCkgKyAxKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignZGF5JywgZGF0ZS5kYXRlKCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuXG4gICAgICBpZih1bml0QWJiciA9PSAn56eSJyl7XG4gICAgICAgIGRhdGUuYWRkKG51bWJlciwgJ3NlY29uZCcpO1xuICAgICAgfWVsc2UgaWYodW5pdEFiYnIgPT0gJ+WIhicpe1xuICAgICAgICBkYXRlLmFkZChudW1iZXIsICdtaW51dGUnKTtcbiAgICAgIH1lbHNlIGlmKHVuaXRBYmJyID09ICflsI8nIHx8IHVuaXRBYmJyID09ICfpkJgnKXtcbiAgICAgICAgZGF0ZS5hZGQobnVtYmVyLCAnaG91cicpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBkYXRlLnllYXIoKSk7XG4gICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21vbnRoJywgZGF0ZS5tb250aCgpICsgMSk7XG4gICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIGRhdGUuZGF0ZSgpKTtcbiAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCBkYXRlLmhvdXIoKSk7XG4gICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdtaW51dGUnLCBkYXRlLm1pbnV0ZSgpKTtcbiAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3NlY29uZCcsIGRhdGUuc2Vjb25kKCkpO1xuICAgICAgcmVzdWx0LnRhZ3MuWkhIYW50RGVhZGxpbmVGb3JtYXRQYXJzZXIgPSB0cnVlO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufTtcbiIsIi8qXG5cblxuKi9cblxudmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4uL3BhcnNlcicpLlBhcnNlcjtcbnZhciBQYXJzZWRSZXN1bHQgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRSZXN1bHQ7XG52YXIgUGFyc2VkQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZENvbXBvbmVudHM7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvWkgtSGFudC5qcycpO1xuXG52YXIgcGF0dGVyblN0cmluZzEgPSAnKD8655SxfOW+nnzoh6opPycgK1xuICAgICcoPzonICtcbiAgICAnKOS7inzmmI586IG9fOaYqHzlsIt855C0KSjml6l85pydfOaZmil8JyArXG4gICAgJyjkuIooPzrljYh85pmdKXzmnJ0oPzrml6kpfOaXqSg/OuS4iil85LiLKD865Y2IfOaZnSl85pmPKD865pmdKXzmmZooPzrkuIopfOWknCg/OuaZmik/fOS4rSg/OuWNiCl85YeMKD865pmoKSl8JyArXG4gICAgJyjku4p85piOfOiBvXzmmKh85bCLfOeQtCkoPzrml6V85aSpKScgK1xuICAgICcoPzpbXFxcXHMs77yMXSopJyArXG4gICAgJyg/OijkuIooPzrljYh85pmdKXzmnJ0oPzrml6kpfOaXqSg/OuS4iil85LiLKD865Y2IfOaZnSl85pmPKD865pmdKXzmmZooPzrkuIopfOWknCg/OuaZmik/fOS4rSg/OuWNiCl85YeMKD865pmoKSkpPycgK1xuICAgICcpPycgK1xuICAgICcoPzpbXFxcXHMs77yMXSopJyArXG4gICAgJyg/OihcXFxcZCt8WycgKyBPYmplY3Qua2V5cyh1dGlsLk5VTUJFUikuam9pbignJykgKyAnXSspKD86XFxcXHMqKSg/Oum7nnzmmYJ8OnzvvJopJyArXG4gICAgJyg/OlxcXFxzKiknICtcbiAgICAnKFxcXFxkK3zljYp85q2jfOaVtHxbJyArIE9iamVjdC5rZXlzKHV0aWwuTlVNQkVSKS5qb2luKCcnKSArICddKyk/KD86XFxcXHMqKSg/OuWIhnw6fO+8mik/JyArXG4gICAgJyg/OlxcXFxzKiknICtcbiAgICAnKFxcXFxkK3xbJyArIE9iamVjdC5rZXlzKHV0aWwuTlVNQkVSKS5qb2luKCcnKSArICddKyk/KD86XFxcXHMqKSg/Ouenkik/KScgK1xuICAgICcoPzpcXFxccyooQVxcLk1cXC58UFxcLk1cXC58QU0/fFBNPykpPyc7XG5cbnZhciBwYXR0ZXJuU3RyaW5nMiA9ICcoPzpcXFxccyooPzrliLB86IezfFxcXFwtfFxcXFzigJN8XFxcXH58XFxcXOOAnClcXFxccyopJyArXG4gICAgJyg/OicgK1xuICAgICco5LuKfOaYjnzogb185piofOWwi3znkLQpKOaXqXzmnJ185pmaKXwnICtcbiAgICAnKOS4iig/OuWNiHzmmZ0pfOacnSg/OuaXqSl85pepKD865LiKKXzkuIsoPzrljYh85pmdKXzmmY8oPzrmmZ0pfOaZmig/OuS4iil85aScKD865pmaKT985LitKD865Y2IKXzlh4woPzrmmagpKXwnICtcbiAgICAnKOS7inzmmI586IG9fOaYqHzlsIt855C0KSg/OuaXpXzlpKkpJyArXG4gICAgJyg/OltcXFxccyzvvIxdKiknICtcbiAgICAnKD86KOS4iig/OuWNiHzmmZ0pfOacnSg/OuaXqSl85pepKD865LiKKXzkuIsoPzrljYh85pmdKXzmmY8oPzrmmZ0pfOaZmig/OuS4iil85aScKD865pmaKT985LitKD865Y2IKXzlh4woPzrmmagpKSk/JyArXG4gICAgJyk/JyArXG4gICAgJyg/OltcXFxccyzvvIxdKiknICtcbiAgICAnKD86KFxcXFxkK3xbJyArIE9iamVjdC5rZXlzKHV0aWwuTlVNQkVSKS5qb2luKCcnKSArICddKykoPzpcXFxccyopKD866buefOaZgnw6fO+8miknICtcbiAgICAnKD86XFxcXHMqKScgK1xuICAgICcoXFxcXGQrfOWNinzmraN85pW0fFsnICsgT2JqZWN0LmtleXModXRpbC5OVU1CRVIpLmpvaW4oJycpICsgJ10rKT8oPzpcXFxccyopKD865YiGfDp877yaKT8nICtcbiAgICAnKD86XFxcXHMqKScgK1xuICAgICcoXFxcXGQrfFsnICsgT2JqZWN0LmtleXModXRpbC5OVU1CRVIpLmpvaW4oJycpICsgJ10rKT8oPzpcXFxccyopKD8656eSKT8pJyArXG4gICAgJyg/OlxcXFxzKihBXFwuTVxcLnxQXFwuTVxcLnxBTT98UE0/KSk/JztcblxudmFyIEZJUlNUX1JFR19QQVRURVJOID0gbmV3IFJlZ0V4cChwYXR0ZXJuU3RyaW5nMSwgJ2knKTtcbnZhciBTRUNPTkRfUkVHX1BBVFRFUk4gPSBuZXcgUmVnRXhwKHBhdHRlcm5TdHJpbmcyLCAnaScpO1xuXG52YXIgREFZX0dST1VQXzEgPSAxO1xudmFyIFpIX0FNX1BNX0hPVVJfR1JPVVBfMSA9IDI7XG52YXIgWkhfQU1fUE1fSE9VUl9HUk9VUF8yID0gMztcbnZhciBEQVlfR1JPVVBfMyA9IDQ7XG52YXIgWkhfQU1fUE1fSE9VUl9HUk9VUF8zID0gNTtcbnZhciBIT1VSX0dST1VQID0gNjtcbnZhciBNSU5VVEVfR1JPVVAgPSA3O1xudmFyIFNFQ09ORF9HUk9VUCA9IDg7XG52YXIgQU1fUE1fSE9VUl9HUk9VUCA9IDk7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gWkhIYW50VGltZUV4cHJlc3Npb25QYXJzZXIoKSB7XG5cbiAgICBQYXJzZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gRklSU1RfUkVHX1BBVFRFUk47XG4gICAgfTtcblxuICAgIHRoaXMuZXh0cmFjdCA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgbWF0Y2gsIG9wdCkge1xuXG4gICAgICAgIC8vIFRoaXMgcGF0dGVybiBjYW4gYmUgb3ZlcmxhcGVkIEV4LiBbMTJdIEFNLCAxWzJdIEFNXG4gICAgICAgIGlmIChtYXRjaC5pbmRleCA+IDAgJiYgdGV4dFttYXRjaC5pbmRleCAtIDFdLm1hdGNoKC9cXHcvKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciByZWZNb21lbnQgPSBtb21lbnQocmVmKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoKTtcbiAgICAgICAgcmVzdWx0LnJlZiA9IHJlZjtcbiAgICAgICAgcmVzdWx0LmluZGV4ID0gbWF0Y2guaW5kZXg7XG4gICAgICAgIHJlc3VsdC50ZXh0ID0gbWF0Y2hbMF07XG4gICAgICAgIHJlc3VsdC50YWdzLlpIVGltZUV4cHJlc3Npb25QYXJzZXIgPSB0cnVlO1xuXG4gICAgICAgIHZhciBzdGFydE1vbWVudCA9IHJlZk1vbWVudC5jbG9uZSgpO1xuXG4gICAgICAgIC8vIC0tLS0tIERheVxuICAgICAgICBpZiAobWF0Y2hbREFZX0dST1VQXzFdKSB7XG4gICAgICAgICAgICB2YXIgZGF5MSA9IG1hdGNoW0RBWV9HUk9VUF8xXTtcbiAgICAgICAgICAgIGlmIChkYXkxID09ICfmmI4nIHx8IGRheTEgPT0gJ+iBvScpIHtcbiAgICAgICAgICAgICAgLy8gQ2hlY2sgbm90IFwiVG9tb3Jyb3dcIiBvbiBsYXRlIG5pZ2h0XG4gICAgICAgICAgICAgIGlmKHJlZk1vbWVudC5ob3VyKCkgPiAxKSB7XG4gICAgICAgICAgICAgICAgICBzdGFydE1vbWVudC5hZGQoMSwgJ2RheScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRheTEgPT0gJ+aYqCcgfHwgZGF5MSA9PSAn5bCLJyB8fCBkYXkxID09ICfnkLQnKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKC0xLCAnZGF5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtEQVlfR1JPVVBfM10pIHtcbiAgICAgICAgICAgIHZhciBkYXkzID0gbWF0Y2hbREFZX0dST1VQXzNdO1xuICAgICAgICAgICAgaWYgKGRheTMgPT0gJ+aYjicgfHwgZGF5MyA9PSAn6IG9Jykge1xuICAgICAgICAgICAgICAgIHN0YXJ0TW9tZW50LmFkZCgxLCAnZGF5Jyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRheTMgPT0gJ+aYqCcgfHwgZGF5MyA9PSAn5bCLJyB8fCBkYXkzID09ICfnkLQnKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRNb21lbnQuYWRkKC0xLCAnZGF5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdkYXknLCBzdGFydE1vbWVudC5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCd5ZWFyJywgc3RhcnRNb21lbnQueWVhcigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnZGF5Jywgc3RhcnRNb21lbnQuZGF0ZSgpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCBzdGFydE1vbWVudC5tb250aCgpICsgMSk7XG4gICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ3llYXInLCBzdGFydE1vbWVudC55ZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhvdXIgPSAwO1xuICAgICAgICB2YXIgbWludXRlID0gMDtcbiAgICAgICAgdmFyIG1lcmlkaWVtID0gLTE7XG5cbiAgICAgICAgLy8gLS0tLS0gU2Vjb25kXG4gICAgICAgIGlmIChtYXRjaFtTRUNPTkRfR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gcGFyc2VJbnQobWF0Y2hbU0VDT05EX0dST1VQXSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4oc2Vjb25kKSkge1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IHV0aWwuemhTdHJpbmdUb051bWJlcihtYXRjaFtTRUNPTkRfR1JPVVBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWNvbmQgPj0gNjApIHJldHVybiBudWxsO1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignc2Vjb25kJywgc2Vjb25kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhvdXIgPSBwYXJzZUludChtYXRjaFtIT1VSX0dST1VQXSk7XG4gICAgICAgIGlmIChpc05hTihob3VyKSkge1xuICAgICAgICAgICAgaG91ciA9IHV0aWwuemhTdHJpbmdUb051bWJlcihtYXRjaFtIT1VSX0dST1VQXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBNaW51dGVzXG4gICAgICAgIGlmIChtYXRjaFtNSU5VVEVfR1JPVVBdKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hbTUlOVVRFX0dST1VQXSA9PSAn5Y2KJykge1xuICAgICAgICAgICAgICAgIG1pbnV0ZSA9IDMwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtNSU5VVEVfR1JPVVBdID09ICfmraMnIHx8IG1hdGNoW01JTlVURV9HUk9VUF0gPT0gJ+aVtCcpIHtcbiAgICAgICAgICAgICAgICBtaW51dGUgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChtYXRjaFtNSU5VVEVfR1JPVVBdKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWludXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBtaW51dGUgPSB1dGlsLnpoU3RyaW5nVG9OdW1iZXIobWF0Y2hbTUlOVVRFX0dST1VQXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGhvdXIgPiAxMDApIHtcbiAgICAgICAgICAgIG1pbnV0ZSA9IGhvdXIgJSAxMDA7XG4gICAgICAgICAgICBob3VyID0gcGFyc2VJbnQoaG91ciAvIDEwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWludXRlID49IDYwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3VyID4gMjQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VyID49IDEyKSB7XG4gICAgICAgICAgICBtZXJpZGllbSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBBTSAmIFBNXG4gICAgICAgIGlmIChtYXRjaFtBTV9QTV9IT1VSX0dST1VQXSkge1xuICAgICAgICAgICAgaWYgKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB2YXIgYW1wbSA9IG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoYW1wbSA9PSBcImFcIikge1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoaG91ciA9PSAxMikgaG91ciA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbXBtID09IFwicFwiKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICAgICAgICAgIGlmIChob3VyICE9IDEyKSBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW1pIX0FNX1BNX0hPVVJfR1JPVVBfMV0pIHtcbiAgICAgICAgICAgIHZhciB6aEFNUE1TdHJpbmcxID0gbWF0Y2hbWkhfQU1fUE1fSE9VUl9HUk9VUF8xXTtcbiAgICAgICAgICAgIHZhciB6aEFNUE0xID0gemhBTVBNU3RyaW5nMVswXTtcbiAgICAgICAgICAgIGlmICh6aEFNUE0xID09ICfmnJ0nIHx8IHpoQU1QTTEgPT0gJ+aXqScpIHtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGhvdXIgPT0gMTIpIGhvdXIgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh6aEFNUE0xID09ICfmmZonKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICAgICAgICAgIGlmIChob3VyICE9IDEyKSBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW1pIX0FNX1BNX0hPVVJfR1JPVVBfMl0pIHtcbiAgICAgICAgICAgIHZhciB6aEFNUE1TdHJpbmcyID0gbWF0Y2hbWkhfQU1fUE1fSE9VUl9HUk9VUF8yXTtcbiAgICAgICAgICAgIHZhciB6aEFNUE0yID0gemhBTVBNU3RyaW5nMlswXTtcbiAgICAgICAgICAgIGlmICh6aEFNUE0yID09ICfkuIonIHx8IHpoQU1QTTIgPT0gJ+acnScgfHwgemhBTVBNMiA9PSAn5pepJyB8fCB6aEFNUE0yID09ICflh4wnKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAwO1xuICAgICAgICAgICAgICAgIGlmIChob3VyID09IDEyKSBob3VyID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoemhBTVBNMiA9PSAn5LiLJyB8fCB6aEFNUE0yID09ICfmmY8nIHx8IHpoQU1QTTIgPT0gJ+aZmicpIHtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGhvdXIgIT0gMTIpIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbWkhfQU1fUE1fSE9VUl9HUk9VUF8zXSkge1xuICAgICAgICAgICAgdmFyIHpoQU1QTVN0cmluZzMgPSBtYXRjaFtaSF9BTV9QTV9IT1VSX0dST1VQXzNdO1xuICAgICAgICAgICAgdmFyIHpoQU1QTTMgPSB6aEFNUE1TdHJpbmczWzBdO1xuICAgICAgICAgICAgaWYgKHpoQU1QTTMgPT0gJ+S4iicgfHwgemhBTVBNMyA9PSAn5pydJyB8fCB6aEFNUE0zID09ICfml6knIHx8IHpoQU1QTTMgPT0gJ+WHjCcpIHtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGhvdXIgPT0gMTIpIGhvdXIgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh6aEFNUE0zID09ICfkuIsnIHx8IHpoQU1QTTMgPT0gJ+aZjycgfHwgemhBTVBNMyA9PSAn5pmaJykge1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoaG91ciAhPSAxMikgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCBob3VyKTtcbiAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWludXRlJywgbWludXRlKTtcblxuICAgICAgICBpZiAobWVyaWRpZW0gPj0gMCkge1xuICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbignbWVyaWRpZW0nLCBtZXJpZGllbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaG91ciA8IDEyKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ21lcmlkaWVtJywgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgIEV4dHJhY3RpbmcgdGhlICd0bycgY2h1bmtcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICBtYXRjaCA9IFNFQ09ORF9SRUdfUEFUVEVSTi5leGVjKHRleHQuc3Vic3RyaW5nKHJlc3VsdC5pbmRleCArIHJlc3VsdC50ZXh0Lmxlbmd0aCkpO1xuICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICAvLyBOb3QgYWNjZXB0IG51bWJlciBvbmx5IHJlc3VsdFxuICAgICAgICAgICAgaWYgKHJlc3VsdC50ZXh0Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRNb21lbnQgPSBzdGFydE1vbWVudC5jbG9uZSgpO1xuICAgICAgICByZXN1bHQuZW5kID0gbmV3IFBhcnNlZENvbXBvbmVudHMobnVsbCwgbnVsbCk7XG5cbiAgICAgICAgLy8gLS0tLS0gRGF5XG4gICAgICAgIGlmIChtYXRjaFtEQVlfR1JPVVBfMV0pIHtcbiAgICAgICAgICAgIHZhciBkYXkxID0gbWF0Y2hbREFZX0dST1VQXzFdO1xuICAgICAgICAgICAgaWYgKGRheTEgPT0gJ+aYjicgfHwgZGF5MSA9PSAn6IG9Jykge1xuICAgICAgICAgICAgICAvLyBDaGVjayBub3QgXCJUb21vcnJvd1wiIG9uIGxhdGUgbmlnaHRcbiAgICAgICAgICAgICAgaWYocmVmTW9tZW50LmhvdXIoKSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgIGVuZE1vbWVudC5hZGQoMSwgJ2RheScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRheTEgPT0gJ+aYqCcgfHwgZGF5MSA9PSAn5bCLJyB8fCBkYXkxID09ICfnkLQnKSB7XG4gICAgICAgICAgICAgICAgZW5kTW9tZW50LmFkZCgtMSwgJ2RheScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ2RheScsIGVuZE1vbWVudC5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ21vbnRoJywgZW5kTW9tZW50Lm1vbnRoKCkgKyAxKTtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCd5ZWFyJywgZW5kTW9tZW50LnllYXIoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbREFZX0dST1VQXzNdKSB7XG4gICAgICAgICAgICB2YXIgZGF5MyA9IG1hdGNoW0RBWV9HUk9VUF8zXTtcbiAgICAgICAgICAgIGlmIChkYXkzID09ICfmmI4nIHx8IGRheTMgPT0gJ+iBvScpIHtcbiAgICAgICAgICAgICAgICBlbmRNb21lbnQuYWRkKDEsICdkYXknKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF5MyA9PSAn5pioJyB8fCBkYXkzID09ICflsIsnIHx8IGRheTMgPT0gJ+eQtCcpIHtcbiAgICAgICAgICAgICAgICBlbmRNb21lbnQuYWRkKC0xLCAnZGF5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignZGF5JywgZW5kTW9tZW50LmRhdGUoKSk7XG4gICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignbW9udGgnLCBlbmRNb21lbnQubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ3llYXInLCBlbmRNb21lbnQueWVhcigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5lbmQuaW1wbHkoJ2RheScsIGVuZE1vbWVudC5kYXRlKCkpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnbW9udGgnLCBlbmRNb21lbnQubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgneWVhcicsIGVuZE1vbWVudC55ZWFyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaG91ciA9IDA7XG4gICAgICAgIG1pbnV0ZSA9IDA7XG4gICAgICAgIG1lcmlkaWVtID0gLTE7XG5cbiAgICAgICAgLy8gLS0tLS0gU2Vjb25kXG4gICAgICAgIGlmIChtYXRjaFtTRUNPTkRfR1JPVVBdKSB7XG4gICAgICAgICAgICB2YXIgc2Vjb25kID0gcGFyc2VJbnQobWF0Y2hbU0VDT05EX0dST1VQXSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4oc2Vjb25kKSkge1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IHV0aWwuemhTdHJpbmdUb051bWJlcihtYXRjaFtTRUNPTkRfR1JPVVBdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNlY29uZCA+PSA2MCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbignc2Vjb25kJywgc2Vjb25kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhvdXIgPSBwYXJzZUludChtYXRjaFtIT1VSX0dST1VQXSk7XG4gICAgICAgIGlmIChpc05hTihob3VyKSkge1xuICAgICAgICAgICAgaG91ciA9IHV0aWwuemhTdHJpbmdUb051bWJlcihtYXRjaFtIT1VSX0dST1VQXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBNaW51dGVzXG4gICAgICAgIGlmIChtYXRjaFtNSU5VVEVfR1JPVVBdKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hbTUlOVVRFX0dST1VQXSA9PSAn5Y2KJykge1xuICAgICAgICAgICAgICAgIG1pbnV0ZSA9IDMwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtNSU5VVEVfR1JPVVBdID09ICfmraMnIHx8IG1hdGNoW01JTlVURV9HUk9VUF0gPT0gJ+aVtCcpIHtcbiAgICAgICAgICAgICAgICBtaW51dGUgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtaW51dGUgPSBwYXJzZUludChtYXRjaFtNSU5VVEVfR1JPVVBdKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWludXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBtaW51dGUgPSB1dGlsLnpoU3RyaW5nVG9OdW1iZXIobWF0Y2hbTUlOVVRFX0dST1VQXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGhvdXIgPiAxMDApIHtcbiAgICAgICAgICAgIG1pbnV0ZSA9IGhvdXIgJSAxMDA7XG4gICAgICAgICAgICBob3VyID0gcGFyc2VJbnQoaG91ciAvIDEwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWludXRlID49IDYwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3VyID4gMjQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VyID49IDEyKSB7XG4gICAgICAgICAgICBtZXJpZGllbSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSBBTSAmIFBNXG4gICAgICAgIGlmIChtYXRjaFtBTV9QTV9IT1VSX0dST1VQXSkge1xuICAgICAgICAgICAgaWYgKGhvdXIgPiAxMikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB2YXIgYW1wbSA9IG1hdGNoW0FNX1BNX0hPVVJfR1JPVVBdWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoYW1wbSA9PSBcImFcIikge1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoaG91ciA9PSAxMikgaG91ciA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbXBtID09IFwicFwiKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICAgICAgICAgIGlmIChob3VyICE9IDEyKSBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ21lcmlkaWVtJykpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVyaWRpZW0gPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbWVyaWRpZW0nLCAwKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN0YXJ0LmdldCgnaG91cicpID09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuYXNzaWduKCdob3VyJywgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCdtZXJpZGllbScsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgIT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ2hvdXInLCByZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgKyAxMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtaSF9BTV9QTV9IT1VSX0dST1VQXzFdKSB7XG4gICAgICAgICAgICB2YXIgemhBTVBNU3RyaW5nMSA9IG1hdGNoW1pIX0FNX1BNX0hPVVJfR1JPVVBfMV07XG4gICAgICAgICAgICB2YXIgemhBTVBNMSA9IHpoQU1QTVN0cmluZzFbMF07XG4gICAgICAgICAgICBpZiAoemhBTVBNMSA9PSAn5pydJyB8fCB6aEFNUE0xID09ICfml6knKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAwO1xuICAgICAgICAgICAgICAgIGlmIChob3VyID09IDEyKSBob3VyID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoemhBTVBNMSA9PSAn5pmaJykge1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoaG91ciAhPSAxMikgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtaSF9BTV9QTV9IT1VSX0dST1VQXzJdKSB7XG4gICAgICAgICAgICB2YXIgemhBTVBNU3RyaW5nMiA9IG1hdGNoW1pIX0FNX1BNX0hPVVJfR1JPVVBfMl07XG4gICAgICAgICAgICB2YXIgemhBTVBNMiA9IHpoQU1QTVN0cmluZzJbMF07XG4gICAgICAgICAgICBpZiAoemhBTVBNMiA9PSAn5LiKJyB8fCB6aEFNUE0yID09ICfmnJ0nIHx8IHpoQU1QTTIgPT0gJ+aXqScgfHwgemhBTVBNMiA9PSAn5YeMJykge1xuICAgICAgICAgICAgICAgIG1lcmlkaWVtID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoaG91ciA9PSAxMikgaG91ciA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHpoQU1QTTIgPT0gJ+S4iycgfHwgemhBTVBNMiA9PSAn5pmPJyB8fCB6aEFNUE0yID09ICfmmZonKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAxO1xuICAgICAgICAgICAgICAgIGlmIChob3VyICE9IDEyKSBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW1pIX0FNX1BNX0hPVVJfR1JPVVBfM10pIHtcbiAgICAgICAgICAgIHZhciB6aEFNUE1TdHJpbmczID0gbWF0Y2hbWkhfQU1fUE1fSE9VUl9HUk9VUF8zXTtcbiAgICAgICAgICAgIHZhciB6aEFNUE0zID0gemhBTVBNU3RyaW5nM1swXTtcbiAgICAgICAgICAgIGlmICh6aEFNUE0zID09ICfkuIonIHx8IHpoQU1QTTMgPT0gJ+acnScgfHwgemhBTVBNMyA9PSAn5pepJyB8fCB6aEFNUE0zID09ICflh4wnKSB7XG4gICAgICAgICAgICAgICAgbWVyaWRpZW0gPSAwO1xuICAgICAgICAgICAgICAgIGlmIChob3VyID09IDEyKSBob3VyID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoemhBTVBNMyA9PSAn5LiLJyB8fCB6aEFNUE0zID09ICfmmY8nIHx8IHpoQU1QTTMgPT0gJ+aZmicpIHtcbiAgICAgICAgICAgICAgICBtZXJpZGllbSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGhvdXIgIT0gMTIpIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQudGV4dCA9IHJlc3VsdC50ZXh0ICsgbWF0Y2hbMF07XG4gICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCdob3VyJywgaG91cik7XG4gICAgICAgIHJlc3VsdC5lbmQuYXNzaWduKCdtaW51dGUnLCBtaW51dGUpO1xuICAgICAgICBpZiAobWVyaWRpZW0gPj0gMCkge1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ21lcmlkaWVtJywgbWVyaWRpZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHN0YXJ0QXRQTSA9IHJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ21lcmlkaWVtJykgJiYgcmVzdWx0LnN0YXJ0LmdldCgnbWVyaWRpZW0nKSA9PSAxO1xuICAgICAgICAgICAgaWYgKHN0YXJ0QXRQTSAmJiByZXN1bHQuc3RhcnQuZ2V0KCdob3VyJykgPiBob3VyKSB7XG4gICAgICAgICAgICAgICAgLy8gMTBwbSAtIDEgKGFtKVxuICAgICAgICAgICAgICAgIHJlc3VsdC5lbmQuaW1wbHkoJ21lcmlkaWVtJywgMCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaG91ciA+IDEyKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnbWVyaWRpZW0nLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQuZW5kLmRhdGUoKS5nZXRUaW1lKCkgPCByZXN1bHQuc3RhcnQuZGF0ZSgpLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgcmVzdWx0LmVuZC5pbXBseSgnZGF5JywgcmVzdWx0LmVuZC5nZXQoJ2RheScpICsgMSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn07XG4iLCIvKlxuXG5cbiovXG5cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKCcuLi9wYXJzZXInKS5QYXJzZXI7XG52YXIgUGFyc2VkUmVzdWx0ID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkUmVzdWx0O1xudmFyIHVwZGF0ZVBhcnNlZENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL0VOL0VOV2Vla2RheVBhcnNlcicpLnVwZGF0ZVBhcnNlZENvbXBvbmVudDtcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlscy9aSC1IYW50LmpzJyk7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cChcbiAgICAnKOS4inzku4p85LiLfOmAmXzlkaIpPycgK1xuICAgICcoPzrlgIspPycgK1xuICAgICcoPzrmmJ/mnJ9856au5oucKScgK1xuICAgICcoJyArIE9iamVjdC5rZXlzKHV0aWwuV0VFS0RBWV9PRkZTRVQpLmpvaW4oJ3wnKSArICcpJ1xuKTtcblxudmFyIFBSRUZJWF9HUk9VUCA9IDE7XG52YXIgV0VFS0RBWV9HUk9VUCA9IDI7XG5cbmV4cG9ydHMuUGFyc2VyID0gZnVuY3Rpb24gWkhIYW50V2Vla2RheVBhcnNlcigpIHtcblxuICAgIFBhcnNlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBQQVRURVJOO1xuICAgIH07XG5cbiAgICB0aGlzLmV4dHJhY3QgPSBmdW5jdGlvbih0ZXh0LCByZWYsIG1hdGNoLCBvcHQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gbWF0Y2guaW5kZXg7XG4gICAgICAgIHRleHQgPSBtYXRjaFswXTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBQYXJzZWRSZXN1bHQoe1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHJlZjogcmVmXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBkYXlPZldlZWsgPSBtYXRjaFtXRUVLREFZX0dST1VQXTtcbiAgICAgICAgdmFyIG9mZnNldCA9IHV0aWwuV0VFS0RBWV9PRkZTRVRbZGF5T2ZXZWVrXTtcbiAgICAgICAgaWYob2Zmc2V0ID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHZhciBtb2RpZmllciA9IG51bGw7XG4gICAgICAgIHZhciBwcmVmaXggPSBtYXRjaFtQUkVGSVhfR1JPVVBdO1xuXG4gICAgICAgIGlmKHByZWZpeCA9PSAn5LiKJykge1xuICAgICAgICAgICAgbW9kaWZpZXIgPSAnbGFzdCc7XG4gICAgICAgIH0gZWxzZSBpZihwcmVmaXggPT0gJ+S4iycpIHtcbiAgICAgICAgICAgIG1vZGlmaWVyID0gJ25leHQnO1xuICAgICAgICB9IGVsc2UgaWYocHJlZml4ID09ICfku4onIHx8IHByZWZpeCA9PSAn6YCZJyB8fCBwcmVmaXggPT0gJ+WRoicpIHtcbiAgICAgICAgICAgIG1vZGlmaWVyID0gJ3RoaXMnO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlUGFyc2VkQ29tcG9uZW50KHJlc3VsdCwgcmVmLCBvZmZzZXQsIG1vZGlmaWVyKTtcbiAgICAgICAgcmVzdWx0LnRhZ3NbJ1pISGFudFdlZWtkYXlQYXJzZXInXSA9IHRydWU7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn07XG4iLCJcbmZ1bmN0aW9uIFBhcnNlcihjb25maWcpIHtcblxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICB2YXIgc3RyaWN0TW9kZSA9IGNvbmZpZy5zdHJpY3Q7XG5cbiAgICB0aGlzLmlzU3RyaWN0TW9kZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gKHN0cmljdE1vZGUgPT0gdHJ1ZSkgfTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gLy4vaTsgfVxuXG4gICAgdGhpcy5leHRyYWN0ID0gZnVuY3Rpb24odGV4dCwgcmVmLCBtYXRjaCwgb3B0KXsgcmV0dXJuIG51bGw7IH1cblxuICAgIHRoaXMuZXhlY3V0ZSA9IGZ1bmN0aW9uKHRleHQsIHJlZiwgb3B0KSB7XG5cbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgdmFyIHJlZ2V4ID0gdGhpcy5wYXR0ZXJuKCk7XG5cbiAgICAgICAgdmFyIHJlbWFpbmluZ1RleHQgPSB0ZXh0O1xuICAgICAgICB2YXIgbWF0Y2ggPSByZWdleC5leGVjKHJlbWFpbmluZ1RleHQpO1xuXG4gICAgICAgIHdoaWxlIChtYXRjaCkge1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgbWF0Y2ggaW5kZXggb24gdGhlIGZ1bGwgdGV4dDtcbiAgICAgICAgICAgIG1hdGNoLmluZGV4ICs9IHRleHQubGVuZ3RoIC0gcmVtYWluaW5nVGV4dC5sZW5ndGg7XG5cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmV4dHJhY3QodGV4dCwgcmVmLCBtYXRjaCwgb3B0KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgIC8vIElmIHN1Y2Nlc3MsIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgcmVzdWx0XG4gICAgICAgICAgICAgICAgcmVtYWluaW5nVGV4dCA9IHRleHQuc3Vic3RyaW5nKHJlc3VsdC5pbmRleCArIHJlc3VsdC50ZXh0Lmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTdHJpY3RNb2RlKCkgfHwgcmVzdWx0Lmhhc1Bvc3NpYmxlRGF0ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgZmFpbCwgbW92ZSBvbiBieSAxXG4gICAgICAgICAgICAgICAgcmVtYWluaW5nVGV4dCA9IHRleHQuc3Vic3RyaW5nKG1hdGNoLmluZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1hdGNoID0gcmVnZXguZXhlYyhyZW1haW5pbmdUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlZmluZXJzKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmluZXJzLmZvckVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZWZpbmVyLnJlZmluZShyZXN1bHRzLCB0ZXh0LCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxufVxuXG5leHBvcnRzLlBhcnNlciA9IFBhcnNlcjtcblxuZXhwb3J0cy5FTklTT0Zvcm1hdFBhcnNlciA9IHJlcXVpcmUoJy4vRU4vRU5JU09Gb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVORGVhZGxpbmVGb3JtYXRQYXJzZXIgPSByZXF1aXJlKCcuL0VOL0VORGVhZGxpbmVGb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVOUmVsYXRpdmVEYXRlRm9ybWF0UGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTlJlbGF0aXZlRGF0ZUZvcm1hdFBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRU5Nb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXIgPSByZXF1aXJlKCcuL0VOL0VOTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FTk1vbnRoTmFtZU1pZGRsZUVuZGlhblBhcnNlciA9IHJlcXVpcmUoJy4vRU4vRU5Nb250aE5hbWVNaWRkbGVFbmRpYW5QYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVOTW9udGhOYW1lUGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTk1vbnRoTmFtZVBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRU5TbGFzaERhdGVGb3JtYXRQYXJzZXIgPSByZXF1aXJlKCcuL0VOL0VOU2xhc2hEYXRlRm9ybWF0UGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FTlNsYXNoRGF0ZUZvcm1hdFN0YXJ0V2l0aFllYXJQYXJzZXIgPSByZXF1aXJlKCcuL0VOL0VOU2xhc2hEYXRlRm9ybWF0U3RhcnRXaXRoWWVhclBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRU5TbGFzaE1vbnRoRm9ybWF0UGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTlNsYXNoTW9udGhGb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVOVGltZUFnb0Zvcm1hdFBhcnNlciA9IHJlcXVpcmUoJy4vRU4vRU5UaW1lQWdvRm9ybWF0UGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FTlRpbWVFeHByZXNzaW9uUGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTlRpbWVFeHByZXNzaW9uUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FTldlZWtkYXlQYXJzZXIgPSByZXF1aXJlKCcuL0VOL0VOV2Vla2RheVBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRU5DYXN1YWxEYXRlUGFyc2VyID0gcmVxdWlyZSgnLi9FTi9FTkNhc3VhbERhdGVQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVOQ2FzdWFsVGltZVBhcnNlciA9IHJlcXVpcmUoJy4vRU4vRU5DYXN1YWxUaW1lUGFyc2VyJykuUGFyc2VyO1xuXG5leHBvcnRzLkpQU3RhbmRhcmRQYXJzZXIgPSByZXF1aXJlKCcuL0pQL0pQU3RhbmRhcmRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkpQQ2FzdWFsRGF0ZVBhcnNlciA9IHJlcXVpcmUoJy4vSlAvSlBDYXN1YWxEYXRlUGFyc2VyJykuUGFyc2VyO1xuXG5leHBvcnRzLkVTQ2FzdWFsRGF0ZVBhcnNlciA9IHJlcXVpcmUoJy4vRVMvRVNDYXN1YWxEYXRlUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FU0RlYWRsaW5lRm9ybWF0UGFyc2VyID0gcmVxdWlyZSgnLi9FUy9FU0RlYWRsaW5lRm9ybWF0UGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5FU1RpbWVBZ29Gb3JtYXRQYXJzZXIgPSByZXF1aXJlKCcuL0VTL0VTVGltZUFnb0Zvcm1hdFBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRVNUaW1lRXhwcmVzc2lvblBhcnNlciA9IHJlcXVpcmUoJy4vRVMvRVNUaW1lRXhwcmVzc2lvblBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRVNXZWVrZGF5UGFyc2VyID0gcmVxdWlyZSgnLi9FUy9FU1dlZWtkYXlQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkVTTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyID0gcmVxdWlyZSgnLi9FUy9FU01vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRVNTbGFzaERhdGVGb3JtYXRQYXJzZXIgPSByZXF1aXJlKCcuL0VTL0VTU2xhc2hEYXRlRm9ybWF0UGFyc2VyJykuUGFyc2VyO1xuXG5leHBvcnRzLkZSQ2FzdWFsRGF0ZVBhcnNlciA9IHJlcXVpcmUoJy4vRlIvRlJDYXN1YWxEYXRlUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5GUkRlYWRsaW5lRm9ybWF0UGFyc2VyID0gcmVxdWlyZSgnLi9GUi9GUkRlYWRsaW5lRm9ybWF0UGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5GUk1vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlciA9IHJlcXVpcmUoJy4vRlIvRlJNb250aE5hbWVMaXR0bGVFbmRpYW5QYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkZSU2xhc2hEYXRlRm9ybWF0UGFyc2VyID0gcmVxdWlyZSgnLi9GUi9GUlNsYXNoRGF0ZUZvcm1hdFBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuRlJUaW1lQWdvRm9ybWF0UGFyc2VyID0gcmVxdWlyZSgnLi9GUi9GUlRpbWVBZ29Gb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkZSVGltZUV4cHJlc3Npb25QYXJzZXIgPSByZXF1aXJlKCcuL0ZSL0ZSVGltZUV4cHJlc3Npb25QYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkZSV2Vla2RheVBhcnNlciA9IHJlcXVpcmUoJy4vRlIvRlJXZWVrZGF5UGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5GUlJlbGF0aXZlRGF0ZUZvcm1hdFBhcnNlciA9IHJlcXVpcmUoJy4vRlIvRlJSZWxhdGl2ZURhdGVGb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5cbmV4cG9ydHMuWkhIYW50RGF0ZVBhcnNlciA9IHJlcXVpcmUoJy4vWkgtSGFudC9aSEhhbnREYXRlUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5aSEhhbnRXZWVrZGF5UGFyc2VyID0gcmVxdWlyZSgnLi9aSC1IYW50L1pISGFudFdlZWtkYXlQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLlpISGFudFRpbWVFeHByZXNzaW9uUGFyc2VyID0gcmVxdWlyZSgnLi9aSC1IYW50L1pISGFudFRpbWVFeHByZXNzaW9uUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5aSEhhbnRDYXN1YWxEYXRlUGFyc2VyID0gcmVxdWlyZSgnLi9aSC1IYW50L1pISGFudENhc3VhbERhdGVQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLlpISGFudERlYWRsaW5lRm9ybWF0UGFyc2VyID0gcmVxdWlyZSgnLi9aSC1IYW50L1pISGFudERlYWRsaW5lRm9ybWF0UGFyc2VyJykuUGFyc2VyO1xuXG5leHBvcnRzLkRFRGVhZGxpbmVGb3JtYXRQYXJzZXIgPSByZXF1aXJlKCcuL0RFL0RFRGVhZGxpbmVGb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkRFTW9udGhOYW1lTGl0dGxlRW5kaWFuUGFyc2VyID0gcmVxdWlyZSgnLi9ERS9ERU1vbnRoTmFtZUxpdHRsZUVuZGlhblBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuREVNb250aE5hbWVQYXJzZXIgPSByZXF1aXJlKCcuL0RFL0RFTW9udGhOYW1lUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5ERVNsYXNoRGF0ZUZvcm1hdFBhcnNlciA9IHJlcXVpcmUoJy4vREUvREVTbGFzaERhdGVGb3JtYXRQYXJzZXInKS5QYXJzZXI7XG5leHBvcnRzLkRFVGltZUFnb0Zvcm1hdFBhcnNlciA9IHJlcXVpcmUoJy4vREUvREVUaW1lQWdvRm9ybWF0UGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5ERVRpbWVFeHByZXNzaW9uUGFyc2VyID0gcmVxdWlyZSgnLi9ERS9ERVRpbWVFeHByZXNzaW9uUGFyc2VyJykuUGFyc2VyO1xuZXhwb3J0cy5ERVdlZWtkYXlQYXJzZXIgPSByZXF1aXJlKCcuL0RFL0RFV2Vla2RheVBhcnNlcicpLlBhcnNlcjtcbmV4cG9ydHMuREVDYXN1YWxEYXRlUGFyc2VyID0gcmVxdWlyZSgnLi9ERS9ERUNhc3VhbERhdGVQYXJzZXInKS5QYXJzZXI7XG4iLCIvKlxuICBcbiovXG52YXIgRU5NZXJnZURhdGVSYW5nZVJlZmluZXIgPSByZXF1aXJlKCcuLi9FTi9FTk1lcmdlRGF0ZVJhbmdlUmVmaW5lcicpLlJlZmluZXI7XG5cbmV4cG9ydHMuUmVmaW5lciA9IGZ1bmN0aW9uIERFTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyKCkge1xuICAgIEVOTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLnBhdHRlcm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAvXlxccyooYmlzKD86XFxzKig/OmFtfHp1bSkpP3xcXC0pXFxzKiQvaVxuICAgIH07XG59O1xuIiwiLypcbiAgICBcbiovXG52YXIgUGFyc2VkQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZENvbXBvbmVudHM7XG52YXIgUmVmaW5lciA9IHJlcXVpcmUoJy4uL3JlZmluZXInKS5SZWZpbmVyO1xuXG52YXIgbWVyZ2VEYXRlVGltZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL0VOL0VOTWVyZ2VEYXRlVGltZVJlZmluZXInKS5tZXJnZURhdGVUaW1lQ29tcG9uZW50O1xudmFyIGlzRGF0ZU9ubHkgPSByZXF1aXJlKCcuLi9FTi9FTk1lcmdlRGF0ZVRpbWVSZWZpbmVyJykuaXNEYXRlT25seTtcbnZhciBpc1RpbWVPbmx5ID0gcmVxdWlyZSgnLi4vRU4vRU5NZXJnZURhdGVUaW1lUmVmaW5lcicpLmlzVGltZU9ubHk7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cChcIl5cXFxccyooVHx1bXxhbXwsfC0pP1xcXFxzKiRcIik7XG5cbmZ1bmN0aW9uIGlzQWJsZVRvTWVyZ2UodGV4dCwgcHJldlJlc3VsdCwgY3VyUmVzdWx0KSB7XG4gICAgdmFyIHRleHRCZXR3ZWVuID0gdGV4dC5zdWJzdHJpbmcocHJldlJlc3VsdC5pbmRleCArIHByZXZSZXN1bHQudGV4dC5sZW5ndGgsIGN1clJlc3VsdC5pbmRleCk7XG4gICAgcmV0dXJuIHRleHRCZXR3ZWVuLm1hdGNoKFBBVFRFUk4pO1xufVxuXG5mdW5jdGlvbiBtZXJnZVJlc3VsdCh0ZXh0LCBkYXRlUmVzdWx0LCB0aW1lUmVzdWx0KXtcblxuICAgIHZhciBiZWdpbkRhdGUgPSBkYXRlUmVzdWx0LnN0YXJ0O1xuICAgIHZhciBiZWdpblRpbWUgPSB0aW1lUmVzdWx0LnN0YXJ0OyAgICBcbiAgICB2YXIgYmVnaW5EYXRlVGltZSA9IG1lcmdlRGF0ZVRpbWVDb21wb25lbnQoYmVnaW5EYXRlLCBiZWdpblRpbWUpO1xuXG4gICAgaWYgKGRhdGVSZXN1bHQuZW5kICE9IG51bGwgfHwgdGltZVJlc3VsdC5lbmQgIT0gbnVsbCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIGVuZERhdGUgICA9IGRhdGVSZXN1bHQuZW5kID09IG51bGwgPyBkYXRlUmVzdWx0LnN0YXJ0IDogZGF0ZVJlc3VsdC5lbmQ7ICAgICAgICAgICAgXG4gICAgICAgIHZhciBlbmRUaW1lICAgPSB0aW1lUmVzdWx0LmVuZCA9PSBudWxsID8gdGltZVJlc3VsdC5zdGFydCA6IHRpbWVSZXN1bHQuZW5kO1xuICAgICAgICB2YXIgZW5kRGF0ZVRpbWUgPSBtZXJnZURhdGVUaW1lQ29tcG9uZW50KGVuZERhdGUsIGVuZFRpbWUpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGRhdGVSZXN1bHQuZW5kID09IG51bGwgJiYgZW5kRGF0ZVRpbWUuZGF0ZSgpLmdldFRpbWUoKSA8IGJlZ2luRGF0ZVRpbWUuZGF0ZSgpLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgLy8gRXguIDlwbSAtIDFhbVxuICAgICAgICAgICAgaWYgKGVuZERhdGVUaW1lLmlzQ2VydGFpbignZGF5JykpIHtcbiAgICAgICAgICAgICAgICBlbmREYXRlVGltZS5hc3NpZ24oJ2RheScsIGVuZERhdGVUaW1lLmdldCgnZGF5JykgKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZW5kRGF0ZVRpbWUuaW1wbHkoJ2RheScsIGVuZERhdGVUaW1lLmdldCgnZGF5JykgKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGVSZXN1bHQuZW5kID0gZW5kRGF0ZVRpbWU7XG4gICAgfVxuXG4gICAgZGF0ZVJlc3VsdC5zdGFydCA9IGJlZ2luRGF0ZVRpbWU7ICAgIFxuXG4gICAgdmFyIHN0YXJ0SW5kZXggPSBNYXRoLm1pbihkYXRlUmVzdWx0LmluZGV4LCB0aW1lUmVzdWx0LmluZGV4KTtcbiAgICB2YXIgZW5kSW5kZXggPSBNYXRoLm1heChcbiAgICAgICAgICAgIGRhdGVSZXN1bHQuaW5kZXggKyBkYXRlUmVzdWx0LnRleHQubGVuZ3RoLCBcbiAgICAgICAgICAgIHRpbWVSZXN1bHQuaW5kZXggKyB0aW1lUmVzdWx0LnRleHQubGVuZ3RoKTtcbiAgICBcbiAgICBkYXRlUmVzdWx0LmluZGV4ID0gc3RhcnRJbmRleDtcbiAgICBkYXRlUmVzdWx0LnRleHQgID0gdGV4dC5zdWJzdHJpbmcoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuXG4gICAgZm9yICh2YXIgdGFnIGluIHRpbWVSZXN1bHQudGFncykge1xuICAgICAgICBkYXRlUmVzdWx0LnRhZ3NbdGFnXSA9IHRydWU7XG4gICAgfVxuICAgIGRhdGVSZXN1bHQudGFnc1snREVNZXJnZURhdGVBbmRUaW1lUmVmaW5lciddID0gdHJ1ZTtcbiAgICByZXR1cm4gZGF0ZVJlc3VsdDtcbn1cblxuZXhwb3J0cy5SZWZpbmVyID0gZnVuY3Rpb24gREVNZXJnZURhdGVUaW1lUmVmaW5lcigpIHtcbiAgICBSZWZpbmVyLmNhbGwodGhpcyk7XG5cblxuICAgIHRoaXMucmVmaW5lID0gZnVuY3Rpb24odGV4dCwgcmVzdWx0cywgb3B0KSB7IFxuXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA8IDIpIHJldHVybiByZXN1bHRzO1xuXG4gICAgICAgIHZhciBtZXJnZWRSZXN1bHQgPSBbXTtcbiAgICAgICAgdmFyIGN1cnJSZXN1bHQgPSBudWxsO1xuICAgICAgICB2YXIgcHJldlJlc3VsdCA9IG51bGw7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGN1cnJSZXN1bHQgPSByZXN1bHRzW2ldO1xuICAgICAgICAgICAgcHJldlJlc3VsdCA9IHJlc3VsdHNbaS0xXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGlzRGF0ZU9ubHkocHJldlJlc3VsdCkgJiYgaXNUaW1lT25seShjdXJyUmVzdWx0KSBcbiAgICAgICAgICAgICAgICAgICAgJiYgaXNBYmxlVG9NZXJnZSh0ZXh0LCBwcmV2UmVzdWx0LCBjdXJyUmVzdWx0KSkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHByZXZSZXN1bHQgPSBtZXJnZVJlc3VsdCh0ZXh0LCBwcmV2UmVzdWx0LCBjdXJyUmVzdWx0KTtcbiAgICAgICAgICAgICAgICBjdXJyUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZU9ubHkoY3VyclJlc3VsdCkgJiYgaXNUaW1lT25seShwcmV2UmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAmJiBpc0FibGVUb01lcmdlKHRleHQsIHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcHJldlJlc3VsdCA9IG1lcmdlUmVzdWx0KHRleHQsIGN1cnJSZXN1bHQsIHByZXZSZXN1bHQpO1xuICAgICAgICAgICAgICAgIGN1cnJSZXN1bHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbWVyZ2VkUmVzdWx0LnB1c2gocHJldlJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VyclJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgICAgICBtZXJnZWRSZXN1bHQucHVzaChjdXJyUmVzdWx0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtZXJnZWRSZXN1bHQ7XG4gICAgfVxufSIsIi8qXG4gIFxuKi9cbnZhciBSZWZpbmVyID0gcmVxdWlyZSgnLi4vcmVmaW5lcicpLlJlZmluZXI7XG5cbmV4cG9ydHMuUmVmaW5lciA9IGZ1bmN0aW9uIEVOTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyKCkge1xuICAgIFJlZmluZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIC9eXFxzKih0b3xcXC0pXFxzKiQvaSB9O1xuXG4gICAgdGhpcy5yZWZpbmUgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHRzLCBvcHQpIHtcblxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPCAyKSByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgXG4gICAgICAgIHZhciBtZXJnZWRSZXN1bHQgPSBbXTtcbiAgICAgICAgdmFyIGN1cnJSZXN1bHQgPSBudWxsO1xuICAgICAgICB2YXIgcHJldlJlc3VsdCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBpPTE7IGk8cmVzdWx0cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGN1cnJSZXN1bHQgPSByZXN1bHRzW2ldO1xuICAgICAgICAgICAgcHJldlJlc3VsdCA9IHJlc3VsdHNbaS0xXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFwcmV2UmVzdWx0LmVuZCAmJiAhY3VyclJlc3VsdC5lbmQgXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5pc0FibGVUb01lcmdlKHRleHQsIHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpKSB7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHByZXZSZXN1bHQgPSB0aGlzLm1lcmdlUmVzdWx0KHRleHQsIHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpO1xuICAgICAgICAgICAgICAgIGN1cnJSZXN1bHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbWVyZ2VkUmVzdWx0LnB1c2gocHJldlJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChjdXJyUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1lcmdlZFJlc3VsdC5wdXNoKGN1cnJSZXN1bHQpO1xuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gbWVyZ2VkUmVzdWx0O1xuICAgIH07XG5cbiAgICB0aGlzLmlzQWJsZVRvTWVyZ2UgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHQxLCByZXN1bHQyKSB7XG4gICAgICAgIHZhciBiZWdpbiA9IHJlc3VsdDEuaW5kZXggKyByZXN1bHQxLnRleHQubGVuZ3RoO1xuICAgICAgICB2YXIgZW5kICAgPSByZXN1bHQyLmluZGV4O1xuICAgICAgICB2YXIgdGV4dEJldHdlZW4gPSB0ZXh0LnN1YnN0cmluZyhiZWdpbixlbmQpO1xuXG4gICAgICAgIHJldHVybiB0ZXh0QmV0d2Vlbi5tYXRjaCh0aGlzLnBhdHRlcm4oKSk7XG4gICAgfTtcblxuICAgIHRoaXMuaXNXZWVrZGF5UmVzdWx0ID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignd2Vla2RheScpICYmICFyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdkYXknKTtcbiAgICB9O1xuXG4gICAgdGhpcy5tZXJnZVJlc3VsdCA9IGZ1bmN0aW9uKHRleHQsIGZyb21SZXN1bHQsIHRvUmVzdWx0KSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzV2Vla2RheVJlc3VsdChmcm9tUmVzdWx0KSAmJiAhdGhpcy5pc1dlZWtkYXlSZXN1bHQodG9SZXN1bHQpKSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0b1Jlc3VsdC5zdGFydC5rbm93blZhbHVlcykge1xuICAgICAgICAgICAgICAgIGlmICghZnJvbVJlc3VsdC5zdGFydC5pc0NlcnRhaW4oa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tUmVzdWx0LnN0YXJ0LmFzc2lnbihrZXksIHRvUmVzdWx0LnN0YXJ0LmdldChrZXkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBmcm9tUmVzdWx0LnN0YXJ0Lmtub3duVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0b1Jlc3VsdC5zdGFydC5pc0NlcnRhaW4oa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0b1Jlc3VsdC5zdGFydC5hc3NpZ24oa2V5LCBmcm9tUmVzdWx0LnN0YXJ0LmdldChrZXkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJvbVJlc3VsdC5zdGFydC5kYXRlKCkuZ2V0VGltZSgpID4gdG9SZXN1bHQuc3RhcnQuZGF0ZSgpLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgdmFyIHRtcCA9IHRvUmVzdWx0O1xuICAgICAgICAgICAgdG9SZXN1bHQgPSBmcm9tUmVzdWx0O1xuICAgICAgICAgICAgZnJvbVJlc3VsdCA9IHRtcDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZnJvbVJlc3VsdC5lbmQgPSB0b1Jlc3VsdC5zdGFydDtcblxuICAgICAgICBcblxuICAgICAgICBmb3IgKHZhciB0YWcgaW4gdG9SZXN1bHQudGFncykge1xuICAgICAgICAgICAgZnJvbVJlc3VsdC50YWdzW3RhZ10gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgICAgIFxuICAgICAgICB2YXIgc3RhcnRJbmRleCA9IE1hdGgubWluKGZyb21SZXN1bHQuaW5kZXgsIHRvUmVzdWx0LmluZGV4KTtcbiAgICAgICAgdmFyIGVuZEluZGV4ID0gTWF0aC5tYXgoXG4gICAgICAgICAgICBmcm9tUmVzdWx0LmluZGV4ICsgZnJvbVJlc3VsdC50ZXh0Lmxlbmd0aCwgXG4gICAgICAgICAgICB0b1Jlc3VsdC5pbmRleCArIHRvUmVzdWx0LnRleHQubGVuZ3RoKTtcbiAgICAgICAgICAgIFxuICAgICAgICBmcm9tUmVzdWx0LmluZGV4ID0gc3RhcnRJbmRleDtcbiAgICAgICAgZnJvbVJlc3VsdC50ZXh0ICA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcbiAgICAgICAgZnJvbVJlc3VsdC50YWdzW3RoaXMuY29uc3RydWN0b3IubmFtZV0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gZnJvbVJlc3VsdDtcbiAgICB9XG59O1xuXG4iLCIvKlxuICAgIFxuKi9cbnZhciBQYXJzZWRDb21wb25lbnRzID0gcmVxdWlyZSgnLi4vLi4vcmVzdWx0JykuUGFyc2VkQ29tcG9uZW50cztcbnZhciBSZWZpbmVyID0gcmVxdWlyZSgnLi4vcmVmaW5lcicpLlJlZmluZXI7XG5cbnZhciBQQVRURVJOID0gbmV3IFJlZ0V4cChcIl5cXFxccyooVHxhdHxhZnRlcnxiZWZvcmV8b258b2Z8LHwtKT9cXFxccyokXCIpO1xuXG52YXIgaXNEYXRlT25seSA9IGV4cG9ydHMuaXNEYXRlT25seSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgIHJldHVybiAhcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignaG91cicpO1xufVxuICAgIFxudmFyIGlzVGltZU9ubHkgPSBleHBvcnRzLmlzVGltZU9ubHkgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICByZXR1cm4gIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ21vbnRoJykgJiYgIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3dlZWtkYXknKTtcbn1cblxudmFyIGlzQWJsZVRvTWVyZ2UgPSBleHBvcnRzLmlzQWJsZVRvTWVyZ2UgPSBmdW5jdGlvbih0ZXh0LCBwcmV2UmVzdWx0LCBjdXJSZXN1bHQpIHtcbiAgICB2YXIgdGV4dEJldHdlZW4gPSB0ZXh0LnN1YnN0cmluZyhwcmV2UmVzdWx0LmluZGV4ICsgcHJldlJlc3VsdC50ZXh0Lmxlbmd0aCwgY3VyUmVzdWx0LmluZGV4KTtcbiAgICByZXR1cm4gdGV4dEJldHdlZW4ubWF0Y2goUEFUVEVSTik7XG59XG5cbnZhciBtZXJnZURhdGVUaW1lQ29tcG9uZW50ID0gZXhwb3J0cy5tZXJnZURhdGVUaW1lQ29tcG9uZW50ID0gZnVuY3Rpb24oZGF0ZUNvbXBvbmVudCwgdGltZUNvbXBvbmVudCkge1xuICAgIHZhciBkYXRlVGltZUNvbXBvbmVudCA9IGRhdGVDb21wb25lbnQuY2xvbmUoKTtcblxuICAgIGlmICh0aW1lQ29tcG9uZW50LmlzQ2VydGFpbignaG91cicpKSB7XG4gICAgICAgIGRhdGVUaW1lQ29tcG9uZW50LmFzc2lnbignaG91cicsIHRpbWVDb21wb25lbnQuZ2V0KCdob3VyJykpO1xuICAgICAgICBkYXRlVGltZUNvbXBvbmVudC5hc3NpZ24oJ21pbnV0ZScsIHRpbWVDb21wb25lbnQuZ2V0KCdtaW51dGUnKSk7XG4gICAgICAgIGRhdGVUaW1lQ29tcG9uZW50LmFzc2lnbignc2Vjb25kJywgdGltZUNvbXBvbmVudC5nZXQoJ3NlY29uZCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkYXRlVGltZUNvbXBvbmVudC5pbXBseSgnaG91cicsIHRpbWVDb21wb25lbnQuZ2V0KCdob3VyJykpO1xuICAgICAgICBkYXRlVGltZUNvbXBvbmVudC5pbXBseSgnbWludXRlJywgdGltZUNvbXBvbmVudC5nZXQoJ21pbnV0ZScpKTtcbiAgICAgICAgZGF0ZVRpbWVDb21wb25lbnQuaW1wbHkoJ3NlY29uZCcsIHRpbWVDb21wb25lbnQuZ2V0KCdzZWNvbmQnKSk7XG4gICAgfVxuXG5cbiAgICBpZiAodGltZUNvbXBvbmVudC5pc0NlcnRhaW4oJ21lcmlkaWVtJykpIHtcbiAgICAgICAgZGF0ZVRpbWVDb21wb25lbnQuYXNzaWduKCdtZXJpZGllbScsIHRpbWVDb21wb25lbnQuZ2V0KCdtZXJpZGllbScpKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0aW1lQ29tcG9uZW50LmdldCgnbWVyaWRpZW0nKSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIGRhdGVUaW1lQ29tcG9uZW50LmdldCgnbWVyaWRpZW0nKSA9PT0gdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICAgIGRhdGVUaW1lQ29tcG9uZW50LmltcGx5KCdtZXJpZGllbScsIHRpbWVDb21wb25lbnQuZ2V0KCdtZXJpZGllbScpKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0ZVRpbWVDb21wb25lbnQuZ2V0KCdtZXJpZGllbScpID09IDEgJiYgZGF0ZVRpbWVDb21wb25lbnQuZ2V0KCdob3VyJykgPCAxMikge1xuICAgICAgICBpZiAodGltZUNvbXBvbmVudC5pc0NlcnRhaW4oJ2hvdXInKSkge1xuICAgICAgICAgICAgZGF0ZVRpbWVDb21wb25lbnQuYXNzaWduKCdob3VyJywgZGF0ZVRpbWVDb21wb25lbnQuZ2V0KCdob3VyJykgKyAxMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRlVGltZUNvbXBvbmVudC5pbXBseSgnaG91cicsIGRhdGVUaW1lQ29tcG9uZW50LmdldCgnaG91cicpICsgMTIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGVUaW1lQ29tcG9uZW50O1xufVxuXG5cbmZ1bmN0aW9uIG1lcmdlUmVzdWx0KHRleHQsIGRhdGVSZXN1bHQsIHRpbWVSZXN1bHQpe1xuXG4gICAgdmFyIGJlZ2luRGF0ZSA9IGRhdGVSZXN1bHQuc3RhcnQ7XG4gICAgdmFyIGJlZ2luVGltZSA9IHRpbWVSZXN1bHQuc3RhcnQ7XG4gICAgdmFyIGJlZ2luRGF0ZVRpbWUgPSBtZXJnZURhdGVUaW1lQ29tcG9uZW50KGJlZ2luRGF0ZSwgYmVnaW5UaW1lKTtcbiAgICBcbiAgICBpZiAoZGF0ZVJlc3VsdC5lbmQgIT0gbnVsbCB8fCB0aW1lUmVzdWx0LmVuZCAhPSBudWxsKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZW5kRGF0ZSAgID0gZGF0ZVJlc3VsdC5lbmQgPT0gbnVsbCA/IGRhdGVSZXN1bHQuc3RhcnQgOiBkYXRlUmVzdWx0LmVuZDsgICAgICAgICAgICBcbiAgICAgICAgdmFyIGVuZFRpbWUgICA9IHRpbWVSZXN1bHQuZW5kID09IG51bGwgPyB0aW1lUmVzdWx0LnN0YXJ0IDogdGltZVJlc3VsdC5lbmQ7XG4gICAgICAgIHZhciBlbmREYXRlVGltZSA9IG1lcmdlRGF0ZVRpbWVDb21wb25lbnQoZW5kRGF0ZSwgZW5kVGltZSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZGF0ZVJlc3VsdC5lbmQgPT0gbnVsbCAmJiBlbmREYXRlVGltZS5kYXRlKCkuZ2V0VGltZSgpIDwgYmVnaW5EYXRlVGltZS5kYXRlKCkuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICAvLyBFeC4gOXBtIC0gMWFtXG4gICAgICAgICAgICBpZiAoZW5kRGF0ZVRpbWUuaXNDZXJ0YWluKCdkYXknKSkge1xuICAgICAgICAgICAgICAgIGVuZERhdGVUaW1lLmFzc2lnbignZGF5JywgZW5kRGF0ZVRpbWUuZ2V0KCdkYXknKSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbmREYXRlVGltZS5pbXBseSgnZGF5JywgZW5kRGF0ZVRpbWUuZ2V0KCdkYXknKSArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGF0ZVJlc3VsdC5lbmQgPSBlbmREYXRlVGltZTtcbiAgICB9XG5cbiAgICBkYXRlUmVzdWx0LnN0YXJ0ID0gYmVnaW5EYXRlVGltZTsgICAgXG5cbiAgICB2YXIgc3RhcnRJbmRleCA9IE1hdGgubWluKGRhdGVSZXN1bHQuaW5kZXgsIHRpbWVSZXN1bHQuaW5kZXgpO1xuICAgIHZhciBlbmRJbmRleCA9IE1hdGgubWF4KFxuICAgICAgICAgICAgZGF0ZVJlc3VsdC5pbmRleCArIGRhdGVSZXN1bHQudGV4dC5sZW5ndGgsIFxuICAgICAgICAgICAgdGltZVJlc3VsdC5pbmRleCArIHRpbWVSZXN1bHQudGV4dC5sZW5ndGgpO1xuICAgIFxuICAgIGRhdGVSZXN1bHQuaW5kZXggPSBzdGFydEluZGV4O1xuICAgIGRhdGVSZXN1bHQudGV4dCAgPSB0ZXh0LnN1YnN0cmluZyhzdGFydEluZGV4LCBlbmRJbmRleCk7XG5cbiAgICBmb3IgKHZhciB0YWcgaW4gdGltZVJlc3VsdC50YWdzKSB7XG4gICAgICAgIGRhdGVSZXN1bHQudGFnc1t0YWddID0gdHJ1ZTtcbiAgICB9XG4gICAgZGF0ZVJlc3VsdC50YWdzWydFTk1lcmdlRGF0ZUFuZFRpbWVSZWZpbmVyJ10gPSB0cnVlO1xuICAgIHJldHVybiBkYXRlUmVzdWx0O1xufVxuXG5leHBvcnRzLlJlZmluZXIgPSBmdW5jdGlvbiBFTk1lcmdlRGF0ZVRpbWVSZWZpbmVyKCkge1xuICAgIFJlZmluZXIuY2FsbCh0aGlzKTtcblxuXG4gICAgdGhpcy5yZWZpbmUgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHRzLCBvcHQpIHsgXG5cbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoIDwgMikgcmV0dXJuIHJlc3VsdHM7XG5cbiAgICAgICAgdmFyIG1lcmdlZFJlc3VsdCA9IFtdO1xuICAgICAgICB2YXIgY3VyclJlc3VsdCA9IG51bGw7XG4gICAgICAgIHZhciBwcmV2UmVzdWx0ID0gbnVsbDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgY3VyclJlc3VsdCA9IHJlc3VsdHNbaV07XG4gICAgICAgICAgICBwcmV2UmVzdWx0ID0gcmVzdWx0c1tpLTFdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoaXNEYXRlT25seShwcmV2UmVzdWx0KSAmJiBpc1RpbWVPbmx5KGN1cnJSZXN1bHQpIFxuICAgICAgICAgICAgICAgICAgICAmJiBpc0FibGVUb01lcmdlKHRleHQsIHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcHJldlJlc3VsdCA9IG1lcmdlUmVzdWx0KHRleHQsIHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpO1xuICAgICAgICAgICAgICAgIGN1cnJSZXN1bHQgPSByZXN1bHRzW2kgKyAxXTtcbiAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZU9ubHkoY3VyclJlc3VsdCkgJiYgaXNUaW1lT25seShwcmV2UmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAmJiBpc0FibGVUb01lcmdlKHRleHQsIHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcHJldlJlc3VsdCA9IG1lcmdlUmVzdWx0KHRleHQsIGN1cnJSZXN1bHQsIHByZXZSZXN1bHQpO1xuICAgICAgICAgICAgICAgIGN1cnJSZXN1bHQgPSByZXN1bHRzW2kgKyAxXTtcbiAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG1lcmdlZFJlc3VsdC5wdXNoKHByZXZSZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgbWVyZ2VkUmVzdWx0LnB1c2goY3VyclJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVyZ2VkUmVzdWx0O1xuICAgIH1cbn0iLCIvKlxuXG4qL1xudmFyIFBhcnNlZENvbXBvbmVudHMgPSByZXF1aXJlKCcuLi8uLi9yZXN1bHQnKS5QYXJzZWRDb21wb25lbnRzO1xudmFyIFJlZmluZXIgPSByZXF1aXJlKCcuLi9yZWZpbmVyJykuUmVmaW5lcjtcblxuXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqKGF0fGFmdGVyfGJlZm9yZXxvbnwsfC18XFxcXCh8XFxcXCkpP1xcXFxzKiRcIik7XG5cbmZ1bmN0aW9uIGlzTW9yZVNwZWNpZmljKHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpIHtcbiAgICB2YXIgbW9yZVNwZWNpZmljID0gZmFsc2U7XG5cbiAgICBpZiAocHJldlJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3llYXInKSkge1xuICAgICAgICBpZiAoIWN1cnJSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCd5ZWFyJykpIHtcbiAgICAgICAgICAgIG1vcmVTcGVjaWZpYyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocHJldlJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ21vbnRoJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdtb250aCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vcmVTcGVjaWZpYyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdkYXknKSAmJiAhY3VyclJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3JlU3BlY2lmaWMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vcmVTcGVjaWZpYztcbn1cblxuXG5mdW5jdGlvbiBpc0FibGVUb01lcmdlKHRleHQsIHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpIHtcbiAgICB2YXIgdGV4dEJldHdlZW4gPSB0ZXh0LnN1YnN0cmluZyhwcmV2UmVzdWx0LmluZGV4ICsgcHJldlJlc3VsdC50ZXh0Lmxlbmd0aCwgY3VyclJlc3VsdC5pbmRleCk7XG5cbiAgICAvLyBPbmx5IGFjY2VwdHMgbWVyZ2UgaWYgb25lIG9mIHRoZW0gY29tZXMgZnJvbSBjYXN1YWwgcmVsYXRpdmUgZGF0ZVxuICAgIHZhciBpbmNsdWRlc1JlbGF0aXZlUmVzdWx0ID0gKHByZXZSZXN1bHQudGFnc1snRU5SZWxhdGl2ZURhdGVGb3JtYXRQYXJzZXInXSB8fCBjdXJyUmVzdWx0LnRhZ3NbJ0VOUmVsYXRpdmVEYXRlRm9ybWF0UGFyc2VyJ10pO1xuXG4gICAgLy8gV2UgYXNzdW1lIHRoZXkgcmVmZXIgdG8gdGhlIHNhbWUgZGF0ZSBpZiBhbGwgZGF0ZSBmaWVsZHMgYXJlIGltcGxpZWRcbiAgICB2YXIgcmVmZXJUb1NhbWVEYXRlID0gIXByZXZSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdkYXknKSAmJiAhcHJldlJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ21vbnRoJykgJiYgIXByZXZSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCd5ZWFyJyk7XG5cbiAgICAvLyBJZiBib3RoIHllYXJzIGFyZSBjZXJ0YWluLCB0aGF0IGRldGVybWluZXMgaWYgdGhleSByZWZlciB0byB0aGUgc2FtZSBkYXRlXG4gICAgLy8gYnV0IHdpdGggb25lIG1vcmUgc3BlY2lmaWMgdGhhbiB0aGUgb3RoZXJcbiAgICBpZiAocHJldlJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3llYXInKSAmJiBjdXJyUmVzdWx0LnN0YXJ0LmlzQ2VydGFpbigneWVhcicpKVxuICAgICAgICByZWZlclRvU2FtZURhdGUgPSAocHJldlJlc3VsdC5zdGFydC5nZXQoJ3llYXInKSA9PT0gY3VyclJlc3VsdC5zdGFydC5nZXQoJ3llYXInKSk7XG5cbiAgICAvLyBXZSBub3cgdGVzdCB3aXRoIHRoZSBuZXh0IGxldmVsIChtb250aCkgaWYgdGhleSByZWZlciB0byB0aGUgc2FtZSBkYXRlXG4gICAgaWYgKHByZXZSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdtb250aCcpICYmIGN1cnJSZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdtb250aCcpKVxuICAgICAgICByZWZlclRvU2FtZURhdGUgPSAocHJldlJlc3VsdC5zdGFydC5nZXQoJ21vbnRoJykgPT09IGN1cnJSZXN1bHQuc3RhcnQuZ2V0KCdtb250aCcpKSAmJiByZWZlclRvU2FtZURhdGU7XG5cbiAgICByZXR1cm4gaW5jbHVkZXNSZWxhdGl2ZVJlc3VsdCAmJiB0ZXh0QmV0d2Vlbi5tYXRjaChQQVRURVJOKSAmJiByZWZlclRvU2FtZURhdGU7XG59XG5cbmZ1bmN0aW9uIG1lcmdlUmVzdWx0KHRleHQsIHNwZWNpZmljUmVzdWx0LCBub25TcGVjaWZpY1Jlc3VsdCl7XG5cbiAgICB2YXIgc3BlY2lmaWNEYXRlID0gc3BlY2lmaWNSZXN1bHQuc3RhcnQ7XG4gICAgdmFyIG5vblNwZWNpZmljRGF0ZSA9IG5vblNwZWNpZmljUmVzdWx0LnN0YXJ0O1xuXG4gICAgdmFyIHN0YXJ0SW5kZXggPSBNYXRoLm1pbihzcGVjaWZpY1Jlc3VsdC5pbmRleCwgbm9uU3BlY2lmaWNSZXN1bHQuaW5kZXgpO1xuICAgIHZhciBlbmRJbmRleCA9IE1hdGgubWF4KFxuICAgICAgICAgICAgc3BlY2lmaWNSZXN1bHQuaW5kZXggKyBzcGVjaWZpY1Jlc3VsdC50ZXh0Lmxlbmd0aCxcbiAgICAgICAgICAgIG5vblNwZWNpZmljUmVzdWx0LmluZGV4ICsgbm9uU3BlY2lmaWNSZXN1bHQudGV4dC5sZW5ndGgpO1xuXG4gICAgc3BlY2lmaWNSZXN1bHQuaW5kZXggPSBzdGFydEluZGV4O1xuICAgIHNwZWNpZmljUmVzdWx0LnRleHQgID0gdGV4dC5zdWJzdHJpbmcoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuXG4gICAgZm9yICh2YXIgdGFnIGluIG5vblNwZWNpZmljUmVzdWx0LnRhZ3MpIHtcbiAgICAgICAgc3BlY2lmaWNSZXN1bHQudGFnc1t0YWddID0gdHJ1ZTtcbiAgICB9XG4gICAgc3BlY2lmaWNSZXN1bHQudGFnc1snRU5Qcmlvcml0aXplU3BlY2lmaWNEYXRlUmVmaW5lciddID0gdHJ1ZTtcbiAgICByZXR1cm4gc3BlY2lmaWNSZXN1bHQ7XG59XG5cbmV4cG9ydHMuUmVmaW5lciA9IGZ1bmN0aW9uIEVOUHJpb3JpdGl6ZVNwZWNpZmljRGF0ZVJlZmluZXIoKSB7XG4gICAgUmVmaW5lci5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy5yZWZpbmUgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHRzLCBvcHQpIHtcblxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPCAyKSByZXR1cm4gcmVzdWx0cztcblxuICAgICAgICB2YXIgbWVyZ2VkUmVzdWx0ID0gW107XG4gICAgICAgIHZhciBjdXJyUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgdmFyIHByZXZSZXN1bHQgPSBudWxsO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBjdXJyUmVzdWx0ID0gcmVzdWx0c1tpXTtcbiAgICAgICAgICAgIHByZXZSZXN1bHQgPSByZXN1bHRzW2ktMV07XG5cbiAgICAgICAgICAgIGlmIChpc01vcmVTcGVjaWZpYyhwcmV2UmVzdWx0LCBjdXJyUmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAmJiBpc0FibGVUb01lcmdlKHRleHQsIHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpKSB7XG5cbiAgICAgICAgICAgICAgICBwcmV2UmVzdWx0ID0gbWVyZ2VSZXN1bHQodGV4dCwgcHJldlJlc3VsdCwgY3VyclJlc3VsdCk7XG4gICAgICAgICAgICAgICAgY3VyclJlc3VsdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaSArPSAxO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzTW9yZVNwZWNpZmljKGN1cnJSZXN1bHQsIHByZXZSZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICYmIGlzQWJsZVRvTWVyZ2UodGV4dCwgcHJldlJlc3VsdCwgY3VyclJlc3VsdCkpIHtcblxuICAgICAgICAgICAgICAgIHByZXZSZXN1bHQgPSBtZXJnZVJlc3VsdCh0ZXh0LCBjdXJyUmVzdWx0LCBwcmV2UmVzdWx0KTtcbiAgICAgICAgICAgICAgICBjdXJyUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lcmdlZFJlc3VsdC5wdXNoKHByZXZSZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgbWVyZ2VkUmVzdWx0LnB1c2goY3VyclJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVyZ2VkUmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qXG5cbiovXG52YXIgUmVmaW5lciA9IHJlcXVpcmUoJy4vcmVmaW5lcicpLlJlZmluZXI7XG5cbi8vIE1hcCBBQkJSIC0+IE9mZnNldCBpbiBtaW51dGVcbnZhciBUSU1FWk9ORV9BQkJSX01BUCA9IHt9O1xudmFyIFRJTUVaT05FX05BTUVfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqXFxcXCg/KFtBLVpdezIsNH0pXFxcXCk/KD89XFxcXFd8JClcIiwgJ2knKTtcblxuZXhwb3J0cy5SZWZpbmVyID0gZnVuY3Rpb24gRXh0cmFjdFRpbWV6b25lQWJiclJlZmluZXIoKSB7XG5cdFJlZmluZXIuY2FsbCh0aGlzKTtcblxuXHR0aGlzLnJlZmluZSA9IGZ1bmN0aW9uKHRleHQsIHJlc3VsdHMsIG9wdCkge1xuXG5cdFx0cmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKHJlc3VsdCkge1xuXG4gICAgICAgICAgICBpZiAoIXJlc3VsdC50YWdzWydFTlRpbWVFeHByZXNzaW9uUGFyc2VyJ10gJiYgIXJlc3VsdC50YWdzWydaSFRpbWVFeHByZXNzaW9uUGFyc2VyJ10gJiYgIXJlc3VsdC50YWdzWydGUlRpbWVFeHByZXNzaW9uUGFyc2VyJ10gJiYgIXJlc3VsdC50YWdzWydERVRpbWVFeHByZXNzaW9uUGFyc2VyJ10pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtYXRjaCA9IFRJTUVaT05FX05BTUVfUEFUVEVSTi5leGVjKHRleHQuc3Vic3RyaW5nKHJlc3VsdC5pbmRleCArIHJlc3VsdC50ZXh0Lmxlbmd0aCkpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWV6b25lQWJiciA9IG1hdGNoWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKFRJTUVaT05FX0FCQlJfTUFQW3RpbWV6b25lQWJicl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gVElNRVpPTkVfQUJCUl9NQVBbdGltZXpvbmVBYmJyXTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3RpbWV6b25lT2Zmc2V0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmFzc2lnbigndGltZXpvbmVPZmZzZXQnLCB0aW1lem9uZU9mZnNldCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5lbmQgIT0gbnVsbCAmJiAhcmVzdWx0LmVuZC5pc0NlcnRhaW4oJ3RpbWV6b25lT2Zmc2V0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmVuZC5hc3NpZ24oJ3RpbWV6b25lT2Zmc2V0JywgdGltZXpvbmVPZmZzZXQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdC50ZXh0ICs9IG1hdGNoWzBdO1xuICAgICAgICAgICAgICAgIHJlc3VsdC50YWdzWydFeHRyYWN0VGltZXpvbmVBYmJyUmVmaW5lciddID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblx0XHR9KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcblx0fVxufVxuXG4vLyBUT0RPOiBNb3ZlIHRoaXMgdG8gc29tZSBjb25maWd1cmF0aW9uXG5USU1FWk9ORV9BQkJSX01BUCA9IHtcIkFDRFRcIjo2MzAsXCJBQ1NUXCI6NTcwLFwiQURUXCI6LTE4MCxcIkFFRFRcIjo2NjAsXCJBRVNUXCI6NjAwLFwiQUZUXCI6MjcwLFwiQUtEVFwiOi00ODAsXCJBS1NUXCI6LTU0MCxcIkFMTVRcIjozNjAsXCJBTVNUXCI6LTE4MCxcIkFNVFwiOi0yNDAsXCJBTkFTVFwiOjcyMCxcIkFOQVRcIjo3MjAsXCJBUVRUXCI6MzAwLFwiQVJUXCI6LTE4MCxcIkFTVFwiOi0yNDAsXCJBV0RUXCI6NTQwLFwiQVdTVFwiOjQ4MCxcIkFaT1NUXCI6MCxcIkFaT1RcIjotNjAsXCJBWlNUXCI6MzAwLFwiQVpUXCI6MjQwLFwiQk5UXCI6NDgwLFwiQk9UXCI6LTI0MCxcIkJSU1RcIjotMTIwLFwiQlJUXCI6LTE4MCxcIkJTVFwiOjYwLFwiQlRUXCI6MzYwLFwiQ0FTVFwiOjQ4MCxcIkNBVFwiOjEyMCxcIkNDVFwiOjM5MCxcIkNEVFwiOi0zMDAsXCJDRVNUXCI6MTIwLFwiQ0VUXCI6NjAsXCJDSEFEVFwiOjgyNSxcIkNIQVNUXCI6NzY1LFwiQ0tUXCI6LTYwMCxcIkNMU1RcIjotMTgwLFwiQ0xUXCI6LTI0MCxcIkNPVFwiOi0zMDAsXCJDU1RcIjotMzYwLFwiQ1ZUXCI6LTYwLFwiQ1hUXCI6NDIwLFwiQ2hTVFwiOjYwMCxcIkRBVlRcIjo0MjAsXCJFQVNTVFwiOi0zMDAsXCJFQVNUXCI6LTM2MCxcIkVBVFwiOjE4MCxcIkVDVFwiOi0zMDAsXCJFRFRcIjotMjQwLFwiRUVTVFwiOjE4MCxcIkVFVFwiOjEyMCxcIkVHU1RcIjowLFwiRUdUXCI6LTYwLFwiRVNUXCI6LTMwMCxcIkVUXCI6LTMwMCxcIkZKU1RcIjo3ODAsXCJGSlRcIjo3MjAsXCJGS1NUXCI6LTE4MCxcIkZLVFwiOi0yNDAsXCJGTlRcIjotMTIwLFwiR0FMVFwiOi0zNjAsXCJHQU1UXCI6LTU0MCxcIkdFVFwiOjI0MCxcIkdGVFwiOi0xODAsXCJHSUxUXCI6NzIwLFwiR01UXCI6MCxcIkdTVFwiOjI0MCxcIkdZVFwiOi0yNDAsXCJIQUFcIjotMTgwLFwiSEFDXCI6LTMwMCxcIkhBRFRcIjotNTQwLFwiSEFFXCI6LTI0MCxcIkhBUFwiOi00MjAsXCJIQVJcIjotMzYwLFwiSEFTVFwiOi02MDAsXCJIQVRcIjotOTAsXCJIQVlcIjotNDgwLFwiSEtUXCI6NDgwLFwiSExWXCI6LTIxMCxcIkhOQVwiOi0yNDAsXCJITkNcIjotMzYwLFwiSE5FXCI6LTMwMCxcIkhOUFwiOi00ODAsXCJITlJcIjotNDIwLFwiSE5UXCI6LTE1MCxcIkhOWVwiOi01NDAsXCJIT1ZUXCI6NDIwLFwiSUNUXCI6NDIwLFwiSURUXCI6MTgwLFwiSU9UXCI6MzYwLFwiSVJEVFwiOjI3MCxcIklSS1NUXCI6NTQwLFwiSVJLVFwiOjU0MCxcIklSU1RcIjoyMTAsXCJJU1RcIjo2MCxcIkpTVFwiOjU0MCxcIktHVFwiOjM2MCxcIktSQVNUXCI6NDgwLFwiS1JBVFwiOjQ4MCxcIktTVFwiOjU0MCxcIktVWVRcIjoyNDAsXCJMSERUXCI6NjYwLFwiTEhTVFwiOjYzMCxcIkxJTlRcIjo4NDAsXCJNQUdTVFwiOjcyMCxcIk1BR1RcIjo3MjAsXCJNQVJUXCI6LTUxMCxcIk1BV1RcIjozMDAsXCJNRFRcIjotMzYwLFwiTUVTWlwiOjEyMCxcIk1FWlwiOjYwLFwiTUhUXCI6NzIwLFwiTU1UXCI6MzkwLFwiTVNEXCI6MjQwLFwiTVNLXCI6MjQwLFwiTVNUXCI6LTQyMCxcIk1VVFwiOjI0MCxcIk1WVFwiOjMwMCxcIk1ZVFwiOjQ4MCxcIk5DVFwiOjY2MCxcIk5EVFwiOi05MCxcIk5GVFwiOjY5MCxcIk5PVlNUXCI6NDIwLFwiTk9WVFwiOjM2MCxcIk5QVFwiOjM0NSxcIk5TVFwiOi0xNTAsXCJOVVRcIjotNjYwLFwiTlpEVFwiOjc4MCxcIk5aU1RcIjo3MjAsXCJPTVNTVFwiOjQyMCxcIk9NU1RcIjo0MjAsXCJQRFRcIjotNDIwLFwiUEVUXCI6LTMwMCxcIlBFVFNUXCI6NzIwLFwiUEVUVFwiOjcyMCxcIlBHVFwiOjYwMCxcIlBIT1RcIjo3ODAsXCJQSFRcIjo0ODAsXCJQS1RcIjozMDAsXCJQTURUXCI6LTEyMCxcIlBNU1RcIjotMTgwLFwiUE9OVFwiOjY2MCxcIlBTVFwiOi00ODAsXCJQVFwiOi00ODAsXCJQV1RcIjo1NDAsXCJQWVNUXCI6LTE4MCxcIlBZVFwiOi0yNDAsXCJSRVRcIjoyNDAsXCJTQU1UXCI6MjQwLFwiU0FTVFwiOjEyMCxcIlNCVFwiOjY2MCxcIlNDVFwiOjI0MCxcIlNHVFwiOjQ4MCxcIlNSVFwiOi0xODAsXCJTU1RcIjotNjYwLFwiVEFIVFwiOi02MDAsXCJURlRcIjozMDAsXCJUSlRcIjozMDAsXCJUS1RcIjo3ODAsXCJUTFRcIjo1NDAsXCJUTVRcIjozMDAsXCJUVlRcIjo3MjAsXCJVTEFUXCI6NDgwLFwiVVRDXCI6MCxcIlVZU1RcIjotMTIwLFwiVVlUXCI6LTE4MCxcIlVaVFwiOjMwMCxcIlZFVFwiOi0yMTAsXCJWTEFTVFwiOjY2MCxcIlZMQVRcIjo2NjAsXCJWVVRcIjo2NjAsXCJXQVNUXCI6MTIwLFwiV0FUXCI6NjAsXCJXRVNUXCI6NjAsXCJXRVNaXCI6NjAsXCJXRVRcIjowLFwiV0VaXCI6MCxcIldGVFwiOjcyMCxcIldHU1RcIjotMTIwLFwiV0dUXCI6LTE4MCxcIldJQlwiOjQyMCxcIldJVFwiOjU0MCxcIldJVEFcIjo0ODAsXCJXU1RcIjo3ODAsXCJXVFwiOjAsXCJZQUtTVFwiOjYwMCxcIllBS1RcIjo2MDAsXCJZQVBUXCI6NjAwLFwiWUVLU1RcIjozNjAsXCJZRUtUXCI6MzYwfVxuIiwiLypcbiAgXG4qL1xudmFyIFJlZmluZXIgPSByZXF1aXJlKCcuL3JlZmluZXInKS5SZWZpbmVyO1xuXG5cbnZhciBUSU1FWk9ORV9PRkZTRVRfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqKEdNVHxVVEMpPyhcXFxcK3xcXFxcLSkoXFxcXGR7MSwyfSk6PyhcXFxcZHsyfSlcIiwgJ2knKTtcbnZhciBUSU1FWk9ORV9PRkZTRVRfU0lHTl9HUk9VUCA9IDI7XG52YXIgVElNRVpPTkVfT0ZGU0VUX0hPVVJfT0ZGU0VUX0dST1VQID0gMztcbnZhciBUSU1FWk9ORV9PRkZTRVRfTUlOVVRFX09GRlNFVF9HUk9VUCA9IDQ7XG5cbmV4cG9ydHMuUmVmaW5lciA9IGZ1bmN0aW9uIEV4dHJhY3RUaW1lem9uZU9mZnNldFJlZmluZXIoKSB7XG4gICAgUmVmaW5lci5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy5yZWZpbmUgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHRzLCBvcHQpIHtcblxuICAgICAgICByZXN1bHRzLmZvckVhY2goZnVuY3Rpb24ocmVzdWx0KSB7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCd0aW1lem9uZU9mZnNldCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBUSU1FWk9ORV9PRkZTRVRfUEFUVEVSTi5leGVjKHRleHQuc3Vic3RyaW5nKHJlc3VsdC5pbmRleCArIHJlc3VsdC50ZXh0Lmxlbmd0aCkpO1xuICAgICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGhvdXJPZmZzZXQgPSBwYXJzZUludChtYXRjaFtUSU1FWk9ORV9PRkZTRVRfSE9VUl9PRkZTRVRfR1JPVVBdKTtcbiAgICAgICAgICAgIHZhciBtaW51dGVPZmZzZXQgPSBwYXJzZUludChtYXRjaFtUSU1FWk9ORV9PRkZTRVRfTUlOVVRFX09GRlNFVF9HUk9VUF0pO1xuICAgICAgICAgICAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gaG91ck9mZnNldCAqIDYwICsgbWludXRlT2Zmc2V0O1xuICAgICAgICAgICAgaWYgKG1hdGNoW1RJTUVaT05FX09GRlNFVF9TSUdOX0dST1VQXSA9PT0gJy0nKSB7XG4gICAgICAgICAgICAgICAgdGltZXpvbmVPZmZzZXQgPSAtdGltZXpvbmVPZmZzZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQuZW5kICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZW5kLmFzc2lnbigndGltZXpvbmVPZmZzZXQnLCB0aW1lem9uZU9mZnNldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdC5zdGFydC5hc3NpZ24oJ3RpbWV6b25lT2Zmc2V0JywgdGltZXpvbmVPZmZzZXQpO1xuICAgICAgICAgICAgcmVzdWx0LnRleHQgKz0gbWF0Y2hbMF07XG4gICAgICAgICAgICByZXN1bHQudGFnc1snRXh0cmFjdFRpbWV6b25lT2Zmc2V0UmVmaW5lciddID0gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxufVxuIiwiLypcclxuICBcclxuKi9cclxudmFyIFJlZmluZXIgPSByZXF1aXJlKCcuLi9yZWZpbmVyJykuUmVmaW5lcjtcclxuXHJcbmV4cG9ydHMuUmVmaW5lciA9IGZ1bmN0aW9uIEZSTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyKCkge1xyXG4gICAgUmVmaW5lci5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIC9eXFxzKijDoHxhfFxcLSlcXHMqJC9pIH07XHJcblxyXG4gICAgdGhpcy5yZWZpbmUgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHRzLCBvcHQpIHtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoIDwgMikgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIG1lcmdlZFJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHZhciBjdXJyUmVzdWx0ID0gbnVsbDtcclxuICAgICAgICB2YXIgcHJldlJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yICh2YXIgaT0xOyBpPHJlc3VsdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY3VyclJlc3VsdCA9IHJlc3VsdHNbaV07XHJcbiAgICAgICAgICAgIHByZXZSZXN1bHQgPSByZXN1bHRzW2ktMV07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIXByZXZSZXN1bHQuZW5kICYmICFjdXJyUmVzdWx0LmVuZCBcclxuICAgICAgICAgICAgICAgICYmIHRoaXMuaXNBYmxlVG9NZXJnZSh0ZXh0LCBwcmV2UmVzdWx0LCBjdXJyUmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcHJldlJlc3VsdCA9IHRoaXMubWVyZ2VSZXN1bHQodGV4dCwgcHJldlJlc3VsdCwgY3VyclJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBjdXJyUmVzdWx0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGkgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbWVyZ2VkUmVzdWx0LnB1c2gocHJldlJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChjdXJyUmVzdWx0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbWVyZ2VkUmVzdWx0LnB1c2goY3VyclJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lcmdlZFJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pc0FibGVUb01lcmdlID0gZnVuY3Rpb24odGV4dCwgcmVzdWx0MSwgcmVzdWx0Mikge1xyXG4gICAgICAgIHZhciBiZWdpbiA9IHJlc3VsdDEuaW5kZXggKyByZXN1bHQxLnRleHQubGVuZ3RoO1xyXG4gICAgICAgIHZhciBlbmQgICA9IHJlc3VsdDIuaW5kZXg7XHJcbiAgICAgICAgdmFyIHRleHRCZXR3ZWVuID0gdGV4dC5zdWJzdHJpbmcoYmVnaW4sZW5kKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHRCZXR3ZWVuLm1hdGNoKHRoaXMucGF0dGVybigpKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pc1dlZWtkYXlSZXN1bHQgPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ3dlZWtkYXknKSAmJiAhcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignZGF5Jyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubWVyZ2VSZXN1bHQgPSBmdW5jdGlvbih0ZXh0LCBmcm9tUmVzdWx0LCB0b1Jlc3VsdCkge1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNXZWVrZGF5UmVzdWx0KGZyb21SZXN1bHQpICYmICF0aGlzLmlzV2Vla2RheVJlc3VsdCh0b1Jlc3VsdCkpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0b1Jlc3VsdC5zdGFydC5rbm93blZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmcm9tUmVzdWx0LnN0YXJ0LmlzQ2VydGFpbihrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbVJlc3VsdC5zdGFydC5hc3NpZ24oa2V5LCB0b1Jlc3VsdC5zdGFydC5nZXQoa2V5KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBmcm9tUmVzdWx0LnN0YXJ0Lmtub3duVmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRvUmVzdWx0LnN0YXJ0LmlzQ2VydGFpbihrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9SZXN1bHQuc3RhcnQuYXNzaWduKGtleSwgZnJvbVJlc3VsdC5zdGFydC5nZXQoa2V5KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmcm9tUmVzdWx0LnN0YXJ0LmRhdGUoKS5nZXRUaW1lKCkgPiB0b1Jlc3VsdC5zdGFydC5kYXRlKCkpIHtcclxuICAgICAgICAgICAgdmFyIHRtcCA9IHRvUmVzdWx0O1xyXG4gICAgICAgICAgICB0b1Jlc3VsdCA9IGZyb21SZXN1bHQ7XHJcbiAgICAgICAgICAgIGZyb21SZXN1bHQgPSB0bXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZyb21SZXN1bHQuZW5kID0gdG9SZXN1bHQuc3RhcnQ7XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBmb3IgKHZhciB0YWcgaW4gdG9SZXN1bHQudGFncykge1xyXG4gICAgICAgICAgICBmcm9tUmVzdWx0LnRhZ3NbdGFnXSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdmFyIHN0YXJ0SW5kZXggPSBNYXRoLm1pbihmcm9tUmVzdWx0LmluZGV4LCB0b1Jlc3VsdC5pbmRleCk7XHJcbiAgICAgICAgdmFyIGVuZEluZGV4ID0gTWF0aC5tYXgoXHJcbiAgICAgICAgICAgIGZyb21SZXN1bHQuaW5kZXggKyBmcm9tUmVzdWx0LnRleHQubGVuZ3RoLCBcclxuICAgICAgICAgICAgdG9SZXN1bHQuaW5kZXggKyB0b1Jlc3VsdC50ZXh0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGZyb21SZXN1bHQuaW5kZXggPSBzdGFydEluZGV4O1xyXG4gICAgICAgIGZyb21SZXN1bHQudGV4dCAgPSB0ZXh0LnN1YnN0cmluZyhzdGFydEluZGV4LCBlbmRJbmRleCk7XHJcbiAgICAgICAgZnJvbVJlc3VsdC50YWdzW3RoaXMuY29uc3RydWN0b3IubmFtZV0gPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmcm9tUmVzdWx0O1xyXG4gICAgfVxyXG59O1xyXG5cclxuIiwiLypcclxuICAgIFxyXG4qL1xyXG52YXIgUGFyc2VkQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4uLy4uL3Jlc3VsdCcpLlBhcnNlZENvbXBvbmVudHM7XHJcbnZhciBSZWZpbmVyID0gcmVxdWlyZSgnLi4vcmVmaW5lcicpLlJlZmluZXI7XHJcbnZhciBtZXJnZURhdGVUaW1lQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vRU4vRU5NZXJnZURhdGVUaW1lUmVmaW5lcicpLm1lcmdlRGF0ZVRpbWVDb21wb25lbnQ7XHJcblxyXG52YXIgUEFUVEVSTiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqKFR8w6B8YXx2ZXJzfGRlfCx8LSk/XFxcXHMqJFwiKTtcclxuXHJcbmZ1bmN0aW9uIGlzRGF0ZU9ubHkocmVzdWx0KSB7XHJcbiAgICByZXR1cm4gIXJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ2hvdXInKSB8fCByZXN1bHQudGFnc1snRlJDYXN1YWxEYXRlUGFyc2VyJ107XHJcbn1cclxuICAgIFxyXG5mdW5jdGlvbiBpc1RpbWVPbmx5KHJlc3VsdCkge1xyXG4gICAgcmV0dXJuICFyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdtb250aCcpICYmICFyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCd3ZWVrZGF5Jyk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpc0FibGVUb01lcmdlKHRleHQsIHByZXZSZXN1bHQsIGN1clJlc3VsdCkge1xyXG4gICAgdmFyIHRleHRCZXR3ZWVuID0gdGV4dC5zdWJzdHJpbmcocHJldlJlc3VsdC5pbmRleCArIHByZXZSZXN1bHQudGV4dC5sZW5ndGgsIGN1clJlc3VsdC5pbmRleCk7XHJcbiAgICByZXR1cm4gdGV4dEJldHdlZW4ubWF0Y2goUEFUVEVSTik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1lcmdlUmVzdWx0KHRleHQsIGRhdGVSZXN1bHQsIHRpbWVSZXN1bHQpe1xyXG5cclxuICAgIHZhciBiZWdpbkRhdGUgPSBkYXRlUmVzdWx0LnN0YXJ0O1xyXG4gICAgdmFyIGJlZ2luVGltZSA9IHRpbWVSZXN1bHQuc3RhcnQ7XHJcbiAgICB2YXIgYmVnaW5EYXRlVGltZSA9IG1lcmdlRGF0ZVRpbWVDb21wb25lbnQoYmVnaW5EYXRlLCBiZWdpblRpbWUpO1xyXG5cclxuICAgIGlmIChkYXRlUmVzdWx0LmVuZCAhPSBudWxsIHx8IHRpbWVSZXN1bHQuZW5kICE9IG51bGwpIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgZW5kRGF0ZSAgID0gZGF0ZVJlc3VsdC5lbmQgPT0gbnVsbCA/IGRhdGVSZXN1bHQuc3RhcnQgOiBkYXRlUmVzdWx0LmVuZDsgICAgICAgICAgICBcclxuICAgICAgICB2YXIgZW5kVGltZSAgID0gdGltZVJlc3VsdC5lbmQgPT0gbnVsbCA/IHRpbWVSZXN1bHQuc3RhcnQgOiB0aW1lUmVzdWx0LmVuZDtcclxuICAgICAgICB2YXIgZW5kRGF0ZVRpbWUgPSBtZXJnZURhdGVUaW1lQ29tcG9uZW50KGVuZERhdGUsIGVuZFRpbWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChkYXRlUmVzdWx0LmVuZCA9PSBudWxsICYmIGVuZERhdGVUaW1lLmRhdGUoKS5nZXRUaW1lKCkgPCBiZWdpbkRhdGVUaW1lLmRhdGUoKS5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgLy8gRXguIDlwbSAtIDFhbVxyXG4gICAgICAgICAgICBpZiAoZW5kRGF0ZVRpbWUuaXNDZXJ0YWluKCdkYXknKSkge1xyXG4gICAgICAgICAgICAgICAgZW5kRGF0ZVRpbWUuYXNzaWduKCdkYXknLCBlbmREYXRlVGltZS5nZXQoJ2RheScpICsgMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbmREYXRlVGltZS5pbXBseSgnZGF5JywgZW5kRGF0ZVRpbWUuZ2V0KCdkYXknKSArIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRlUmVzdWx0LmVuZCA9IGVuZERhdGVUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGRhdGVSZXN1bHQuc3RhcnQgPSBiZWdpbkRhdGVUaW1lOyAgICBcclxuXHJcbiAgICB2YXIgc3RhcnRJbmRleCA9IE1hdGgubWluKGRhdGVSZXN1bHQuaW5kZXgsIHRpbWVSZXN1bHQuaW5kZXgpO1xyXG4gICAgdmFyIGVuZEluZGV4ID0gTWF0aC5tYXgoXHJcbiAgICAgICAgICAgIGRhdGVSZXN1bHQuaW5kZXggKyBkYXRlUmVzdWx0LnRleHQubGVuZ3RoLCBcclxuICAgICAgICAgICAgdGltZVJlc3VsdC5pbmRleCArIHRpbWVSZXN1bHQudGV4dC5sZW5ndGgpO1xyXG4gICAgXHJcbiAgICBkYXRlUmVzdWx0LmluZGV4ID0gc3RhcnRJbmRleDtcclxuICAgIGRhdGVSZXN1bHQudGV4dCAgPSB0ZXh0LnN1YnN0cmluZyhzdGFydEluZGV4LCBlbmRJbmRleCk7XHJcblxyXG4gICAgZm9yICh2YXIgdGFnIGluIHRpbWVSZXN1bHQudGFncykge1xyXG4gICAgICAgIGRhdGVSZXN1bHQudGFnc1t0YWddID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGRhdGVSZXN1bHQudGFnc1snRlJNZXJnZURhdGVBbmRUaW1lUmVmaW5lciddID0gdHJ1ZTtcclxuICAgIHJldHVybiBkYXRlUmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnRzLlJlZmluZXIgPSBmdW5jdGlvbiBGUk1lcmdlRGF0ZVRpbWVSZWZpbmVyKCkge1xyXG4gICAgUmVmaW5lci5jYWxsKHRoaXMpO1xyXG5cclxuXHJcbiAgICB0aGlzLnJlZmluZSA9IGZ1bmN0aW9uKHRleHQsIHJlc3VsdHMsIG9wdCkgeyBcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoIDwgMikgcmV0dXJuIHJlc3VsdHM7XHJcblxyXG4gICAgICAgIHZhciBtZXJnZWRSZXN1bHQgPSBbXTtcclxuICAgICAgICB2YXIgY3VyclJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgdmFyIHByZXZSZXN1bHQgPSBudWxsO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGN1cnJSZXN1bHQgPSByZXN1bHRzW2ldO1xyXG4gICAgICAgICAgICBwcmV2UmVzdWx0ID0gcmVzdWx0c1tpLTFdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGlzRGF0ZU9ubHkocHJldlJlc3VsdCkgJiYgaXNUaW1lT25seShjdXJyUmVzdWx0KSBcclxuICAgICAgICAgICAgICAgICAgICAmJiBpc0FibGVUb01lcmdlKHRleHQsIHByZXZSZXN1bHQsIGN1cnJSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHByZXZSZXN1bHQgPSBtZXJnZVJlc3VsdCh0ZXh0LCBwcmV2UmVzdWx0LCBjdXJyUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGN1cnJSZXN1bHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaSArPSAxO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlT25seShjdXJyUmVzdWx0KSAmJiBpc1RpbWVPbmx5KHByZXZSZXN1bHQpXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgaXNBYmxlVG9NZXJnZSh0ZXh0LCBwcmV2UmVzdWx0LCBjdXJyUmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBwcmV2UmVzdWx0ID0gbWVyZ2VSZXN1bHQodGV4dCwgY3VyclJlc3VsdCwgcHJldlJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBjdXJyUmVzdWx0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGkgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbWVyZ2VkUmVzdWx0LnB1c2gocHJldlJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3VyclJlc3VsdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIG1lcmdlZFJlc3VsdC5wdXNoKGN1cnJSZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lcmdlZFJlc3VsdDtcclxuICAgIH1cclxufSIsIi8qXG4gICAgRW5mb3JjZSAnZm9yd2FyZERhdGUnIG9wdGlvbiB0byBvbiB0aGUgcmVzdWx0cy4gV2hlbiB0aGVyZSBhcmUgbWlzc2luZyBjb21wb25lbnQsXG4gICAgZS5nLiBcIk1hcmNoIDEyLTEzICh3aXRob3V0IHllYXIpXCIgb3IgXCJUaHVyc2RheVwiLCB0aGUgcmVmaW5lciB3aWxsIHRyeSB0byBhZGp1c3QgdGhlIHJlc3VsdFxuICAgIGludG8gdGhlIGZ1dHVyZSBpbnN0ZWFkIG9mIHRoZSBwYXN0LlxuKi9cbnZhciBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbnZhciBSZWZpbmVyID0gcmVxdWlyZSgnLi9yZWZpbmVyJykuUmVmaW5lcjtcblxuZXhwb3J0cy5SZWZpbmVyID0gZnVuY3Rpb24gRm9yd2FyZERhdGVSZWZpbmVyKCkge1xuICAgIFJlZmluZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMucmVmaW5lID0gZnVuY3Rpb24odGV4dCwgcmVzdWx0cywgb3B0KSB7XG5cbiAgICAgICAgaWYgKCFvcHRbJ2ZvcndhcmREYXRlJ10gJiYgIW9wdFsnZm9yd2FyZERhdGVzT25seSddKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbihyZXN1bHQpIHtcblxuICAgICAgICAgICAgdmFyIHJlZk1vbWVudCA9IG1vbWVudChyZXN1bHQucmVmKTtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ2RheScpICYmIHJlc3VsdC5zdGFydC5pc0NlcnRhaW4oJ21vbnRoJykgJiZcbiAgICAgICAgICAgICAgICAhcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbigneWVhcicpICYmXG4gICAgICAgICAgICAgICAgcmVmTW9tZW50LmlzQWZ0ZXIocmVzdWx0LnN0YXJ0Lm1vbWVudCgpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRqdXN0IHllYXIgaW50byB0aGUgZnV0dXJlXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpIDwgMyAmJiByZWZNb21lbnQuaXNBZnRlcihyZXN1bHQuc3RhcnQubW9tZW50KCkpOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmltcGx5KCd5ZWFyJywgcmVzdWx0LnN0YXJ0LmdldCgneWVhcicpICsgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5lbmQgJiYgIXJlc3VsdC5lbmQuaXNDZXJ0YWluKCd5ZWFyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5lbmQuaW1wbHkoJ3llYXInLCByZXN1bHQuZW5kLmdldCgneWVhcicpICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXN1bHQudGFnc1snRXh0cmFjdFRpbWV6b25lT2Zmc2V0UmVmaW5lciddID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFyZXN1bHQuc3RhcnQuaXNDZXJ0YWluKCdkYXknKSAmJiAhcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignbW9udGgnKSAmJiAhcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbigneWVhcicpICYmXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXJ0LmlzQ2VydGFpbignd2Vla2RheScpICYmXG4gICAgICAgICAgICAgICAgcmVmTW9tZW50LmlzQWZ0ZXIocmVzdWx0LnN0YXJ0Lm1vbWVudCgpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRqdXN0IGRhdGUgdG8gdGhlIGNvbWluZyB3ZWVrXG4gICAgICAgICAgICAgICAgaWYgKHJlZk1vbWVudC5kYXkoKSA+IHJlc3VsdC5zdGFydC5nZXQoJ3dlZWtkYXknKSkge1xuICAgICAgICAgICAgICAgICAgICByZWZNb21lbnQuZGF5KHJlc3VsdC5zdGFydC5nZXQoJ3dlZWtkYXknKSArIDcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZk1vbWVudC5kYXkocmVzdWx0LnN0YXJ0LmdldCgnd2Vla2RheScpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhcnQuaW1wbHkoJ2RheScsIHJlZk1vbWVudC5kYXRlKCkpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgnbW9udGgnLCByZWZNb21lbnQubW9udGgoKSArIDEpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGFydC5pbXBseSgneWVhcicsIHJlZk1vbWVudC55ZWFyKCkpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC50YWdzWydFeHRyYWN0VGltZXpvbmVPZmZzZXRSZWZpbmVyJ10gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG59O1xuIiwiLypcbiAgXG4qL1xudmFyIEVOTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyID0gcmVxdWlyZSgnLi4vRU4vRU5NZXJnZURhdGVSYW5nZVJlZmluZXInKS5SZWZpbmVyO1xuXG5leHBvcnRzLlJlZmluZXIgPSBmdW5jdGlvbiBKUE1lcmdlRGF0ZVJhbmdlUmVmaW5lcigpIHtcbiAgICBFTk1lcmdlRGF0ZVJhbmdlUmVmaW5lci5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy5wYXR0ZXJuID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gL15cXHMqKOOBi+OCiXzjg7wpXFxzKiQvaSB9O1xufVxuXG4iLCIvKlxuICBcbiovXG52YXIgUmVmaW5lciA9IHJlcXVpcmUoJy4vcmVmaW5lcicpLlJlZmluZXI7XG5cbmV4cG9ydHMuUmVmaW5lciA9IGZ1bmN0aW9uIE92ZXJsYXBSZW1vdmFsUmVmaW5lcigpIHtcblx0UmVmaW5lci5jYWxsKHRoaXMpO1xuXHRcblxuXHR0aGlzLnJlZmluZSA9IGZ1bmN0aW9uKHRleHQsIHJlc3VsdHMsIG9wdCkgeyBcblxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPCAyKSByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgXG4gICAgICAgIHZhciBmaWx0ZXJlZFJlc3VsdHMgPSBbXTtcbiAgICAgICAgdmFyIHByZXZSZXN1bHQgPSByZXN1bHRzWzBdO1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIgaT0xOyBpPHJlc3VsdHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzdWx0c1tpXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgb3ZlcmxhcCwgY29tcGFyZSB0aGUgbGVuZ3RoIGFuZCBkaXNjYXJkIHRoZSBzaG9ydGVyIG9uZVxuICAgICAgICAgICAgaWYgKHJlc3VsdC5pbmRleCA8IHByZXZSZXN1bHQuaW5kZXggKyBwcmV2UmVzdWx0LnRleHQubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnRleHQubGVuZ3RoID4gcHJldlJlc3VsdC50ZXh0Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIHByZXZSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZFJlc3VsdHMucHVzaChwcmV2UmVzdWx0KTtcbiAgICAgICAgICAgICAgICBwcmV2UmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBUaGUgbGFzdCBvbmVcbiAgICAgICAgaWYgKHByZXZSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgZmlsdGVyZWRSZXN1bHRzLnB1c2gocHJldlJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlsdGVyZWRSZXN1bHRzO1xuICAgIH1cbn0iLCIvKlxuICBcbiovXG52YXIgRmlsdGVyID0gcmVxdWlyZSgnLi9yZWZpbmVyJykuRmlsdGVyO1xuXG5leHBvcnRzLlJlZmluZXIgPSBmdW5jdGlvbiBVbmxpa2VseUZvcm1hdEZpbHRlcigpIHtcbiAgICBGaWx0ZXIuY2FsbCh0aGlzKTtcbiAgICBcblxuICAgIHRoaXMuaXNWYWxpZCA9IGZ1bmN0aW9uKHRleHQsIHJlc3VsdCwgb3B0KSB7IFxuXG4gICAgICAgIGlmIChyZXN1bHQudGV4dC5yZXBsYWNlKCcgJywnJykubWF0Y2goL15cXGQqKFxcLlxcZCopPyQvKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7IFxuICAgIH1cbn0iLCJcbmV4cG9ydHMuUmVmaW5lciA9IGZ1bmN0aW9uIFJlZmluZXIoKSB7IFxuXG4gICAgdGhpcy5yZWZpbmUgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHRzLCBvcHQpIHsgcmV0dXJuIHJlc3VsdHM7IH07XG59XG5cbmV4cG9ydHMuRmlsdGVyID0gZnVuY3Rpb24gRmlsdGVyKCkgeyBcbiAgICBcbiAgICBleHBvcnRzLlJlZmluZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMuaXNWYWxpZCA9IGZ1bmN0aW9uKHRleHQsIHJlc3VsdCwgb3B0KSB7IHJldHVybiB0cnVlOyB9XG4gICAgdGhpcy5yZWZpbmUgPSBmdW5jdGlvbih0ZXh0LCByZXN1bHRzLCBvcHQpIHsgXG5cbiAgICAgICAgdmFyIGZpbHRlcmVkUmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIGk9MDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc3VsdHNbaV07XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKHRleHQsIHJlc3VsdCwgb3B0KSkge1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkUmVzdWx0LnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmaWx0ZXJlZFJlc3VsdDtcbiAgICB9XG59XG5cblxuLy8gQ29tbW9uIHJlZmluZXJzXG5leHBvcnRzLk92ZXJsYXBSZW1vdmFsUmVmaW5lciA9IHJlcXVpcmUoJy4vT3ZlcmxhcFJlbW92YWxSZWZpbmVyJykuUmVmaW5lcjtcbmV4cG9ydHMuRXh0cmFjdFRpbWV6b25lT2Zmc2V0UmVmaW5lciA9IHJlcXVpcmUoJy4vRXh0cmFjdFRpbWV6b25lT2Zmc2V0UmVmaW5lcicpLlJlZmluZXI7XG5leHBvcnRzLkV4dHJhY3RUaW1lem9uZUFiYnJSZWZpbmVyID0gcmVxdWlyZSgnLi9FeHRyYWN0VGltZXpvbmVBYmJyUmVmaW5lcicpLlJlZmluZXI7XG5leHBvcnRzLkZvcndhcmREYXRlUmVmaW5lciA9IHJlcXVpcmUoJy4vRm9yd2FyZERhdGVSZWZpbmVyJykuUmVmaW5lcjtcbmV4cG9ydHMuVW5saWtlbHlGb3JtYXRGaWx0ZXIgPSByZXF1aXJlKCcuL1VubGlrZWx5Rm9ybWF0RmlsdGVyJykuUmVmaW5lcjtcblxuLy8gRU4gcmVmaW5lcnNcbmV4cG9ydHMuRU5NZXJnZURhdGVUaW1lUmVmaW5lciA9IHJlcXVpcmUoJy4vRU4vRU5NZXJnZURhdGVUaW1lUmVmaW5lcicpLlJlZmluZXI7XG5leHBvcnRzLkVOTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyID0gcmVxdWlyZSgnLi9FTi9FTk1lcmdlRGF0ZVJhbmdlUmVmaW5lcicpLlJlZmluZXI7XG5leHBvcnRzLkVOUHJpb3JpdGl6ZVNwZWNpZmljRGF0ZVJlZmluZXIgPSByZXF1aXJlKCcuL0VOL0VOUHJpb3JpdGl6ZVNwZWNpZmljRGF0ZVJlZmluZXInKS5SZWZpbmVyO1xuXG4vLyBKUCByZWZpbmVyc1xuZXhwb3J0cy5KUE1lcmdlRGF0ZVJhbmdlUmVmaW5lciA9IHJlcXVpcmUoJy4vSlAvSlBNZXJnZURhdGVSYW5nZVJlZmluZXInKS5SZWZpbmVyO1xuXG4vLyBGUiByZWZpbmVyc1xuZXhwb3J0cy5GUk1lcmdlRGF0ZVJhbmdlUmVmaW5lciA9IHJlcXVpcmUoJy4vRlIvRlJNZXJnZURhdGVSYW5nZVJlZmluZXInKS5SZWZpbmVyO1xuZXhwb3J0cy5GUk1lcmdlRGF0ZVRpbWVSZWZpbmVyID0gcmVxdWlyZSgnLi9GUi9GUk1lcmdlRGF0ZVRpbWVSZWZpbmVyJykuUmVmaW5lcjtcblxuLy8gREUgcmVmaW5lcnNcbmV4cG9ydHMuREVNZXJnZURhdGVSYW5nZVJlZmluZXIgPSByZXF1aXJlKCcuL0RFL0RFTWVyZ2VEYXRlUmFuZ2VSZWZpbmVyJykuUmVmaW5lcjtcbmV4cG9ydHMuREVNZXJnZURhdGVUaW1lUmVmaW5lciA9IHJlcXVpcmUoJy4vREUvREVNZXJnZURhdGVUaW1lUmVmaW5lcicpLlJlZmluZXI7XG4iLCJ2YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5cbmZ1bmN0aW9uIFBhcnNlZFJlc3VsdChyZXN1bHQpe1xuICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7fTtcblxuICAgIHRoaXMucmVmICAgPSByZXN1bHQucmVmO1xuICAgIHRoaXMuaW5kZXggPSByZXN1bHQuaW5kZXg7XG4gICAgdGhpcy50ZXh0ICA9IHJlc3VsdC50ZXh0O1xuICAgIHRoaXMudGFncyAgPSByZXN1bHQudGFncyB8fCB7fTtcblxuICAgIHRoaXMuc3RhcnQgPSBuZXcgUGFyc2VkQ29tcG9uZW50cyhyZXN1bHQuc3RhcnQsIHJlc3VsdC5yZWYpXG4gICAgaWYocmVzdWx0LmVuZCl7XG4gICAgICAgIHRoaXMuZW5kID0gbmV3IFBhcnNlZENvbXBvbmVudHMocmVzdWx0LmVuZCwgcmVzdWx0LnJlZilcbiAgICB9XG59XG5cblBhcnNlZFJlc3VsdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IFBhcnNlZFJlc3VsdCh0aGlzKTtcbiAgICByZXN1bHQudGFncyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy50YWdzKSk7XG4gICAgcmVzdWx0LnN0YXJ0ID0gdGhpcy5zdGFydC5jbG9uZSgpO1xuICAgIGlmICh0aGlzLmVuZCkge1xuICAgICAgICByZXN1bHQuZW5kID0gdGhpcy5lbmQuY2xvbmUoKTtcbiAgICB9XG59XG5cblBhcnNlZFJlc3VsdC5wcm90b3R5cGUuaGFzUG9zc2libGVEYXRlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0LmlzUG9zc2libGVEYXRlKCkgJiYgKCF0aGlzLmVuZCB8fCB0aGlzLmVuZC5pc1Bvc3NpYmxlRGF0ZSgpKTtcbn1cblxuXG5mdW5jdGlvbiBQYXJzZWRDb21wb25lbnRzIChjb21wb25lbnRzLCByZWYpe1xuXG4gICAgdGhpcy5rbm93blZhbHVlcyA9IHt9O1xuICAgIHRoaXMuaW1wbGllZFZhbHVlcyA9IHt9O1xuXG4gICAgaWYgKGNvbXBvbmVudHMpIHtcbiAgICAgICAgZm9yIChrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICAgICAgdGhpcy5rbm93blZhbHVlc1trZXldID0gY29tcG9uZW50c1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlZikge1xuICAgICAgICByZWYgPSBtb21lbnQocmVmKTtcbiAgICAgICAgdGhpcy5pbXBseSgnZGF5JywgcmVmLmRhdGUoKSlcbiAgICAgICAgdGhpcy5pbXBseSgnbW9udGgnLCByZWYubW9udGgoKSArIDEpXG4gICAgICAgIHRoaXMuaW1wbHkoJ3llYXInLCByZWYueWVhcigpKVxuICAgIH1cbiAgICBcblxuICAgIHRoaXMuaW1wbHkoJ2hvdXInLCAxMik7XG4gICAgdGhpcy5pbXBseSgnbWludXRlJywgMCk7XG4gICAgdGhpcy5pbXBseSgnc2Vjb25kJywgMCk7XG4gICAgdGhpcy5pbXBseSgnbWlsbGlzZWNvbmQnLCAwKTtcbn1cblxuUGFyc2VkQ29tcG9uZW50cy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbXBvbmVudCA9IG5ldyBQYXJzZWRDb21wb25lbnRzKCk7XG4gICAgY29tcG9uZW50Lmtub3duVmFsdWVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmtub3duVmFsdWVzKSk7XG4gICAgY29tcG9uZW50LmltcGxpZWRWYWx1ZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuaW1wbGllZFZhbHVlcykpO1xuICAgIHJldHVybiBjb21wb25lbnQ7XG59O1xuXG5QYXJzZWRDb21wb25lbnRzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihjb21wb25lbnQsIHZhbHVlKSB7XG4gICAgaWYgKGNvbXBvbmVudCBpbiB0aGlzLmtub3duVmFsdWVzKSByZXR1cm4gdGhpcy5rbm93blZhbHVlc1tjb21wb25lbnRdO1xuICAgIGlmIChjb21wb25lbnQgaW4gdGhpcy5pbXBsaWVkVmFsdWVzKSByZXR1cm4gdGhpcy5pbXBsaWVkVmFsdWVzW2NvbXBvbmVudF07XG59O1xuXG5QYXJzZWRDb21wb25lbnRzLnByb3RvdHlwZS5hc3NpZ24gPSBmdW5jdGlvbihjb21wb25lbnQsIHZhbHVlKSB7XG4gICAgdGhpcy5rbm93blZhbHVlc1tjb21wb25lbnRdID0gdmFsdWU7XG4gICAgZGVsZXRlIHRoaXMuaW1wbGllZFZhbHVlc1tjb21wb25lbnRdO1xufTtcblxuUGFyc2VkQ29tcG9uZW50cy5wcm90b3R5cGUuaW1wbHkgPSBmdW5jdGlvbihjb21wb25lbnQsIHZhbHVlKSB7XG4gICAgaWYgKGNvbXBvbmVudCBpbiB0aGlzLmtub3duVmFsdWVzKSByZXR1cm47XG4gICAgdGhpcy5pbXBsaWVkVmFsdWVzW2NvbXBvbmVudF0gPSB2YWx1ZTtcbn07XG5cblBhcnNlZENvbXBvbmVudHMucHJvdG90eXBlLmlzQ2VydGFpbiA9IGZ1bmN0aW9uKGNvbXBvbmVudCkge1xuICAgIHJldHVybiBjb21wb25lbnQgaW4gdGhpcy5rbm93blZhbHVlcztcbn07XG5cblBhcnNlZENvbXBvbmVudHMucHJvdG90eXBlLmlzUG9zc2libGVEYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRhdGVNb21lbnQgPSB0aGlzLm1vbWVudCgpO1xuICAgIGlmICh0aGlzLmlzQ2VydGFpbigndGltZXpvbmVPZmZzZXQnKSkge1xuICAgICAgICBkYXRlTW9tZW50LnV0Y09mZnNldCh0aGlzLmdldCgndGltZXpvbmVPZmZzZXQnKSlcbiAgICB9XG5cbiAgICBpZiAoZGF0ZU1vbWVudC5nZXQoJ3llYXInKSAhPSB0aGlzLmdldCgneWVhcicpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGRhdGVNb21lbnQuZ2V0KCdtb250aCcpICE9IHRoaXMuZ2V0KCdtb250aCcpLTEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZGF0ZU1vbWVudC5nZXQoJ2RhdGUnKSAhPSB0aGlzLmdldCgnZGF5JykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZGF0ZU1vbWVudC5nZXQoJ2hvdXInKSAhPSB0aGlzLmdldCgnaG91cicpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGRhdGVNb21lbnQuZ2V0KCdtaW51dGUnKSAhPSB0aGlzLmdldCgnbWludXRlJykpIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB0cnVlO1xufTtcblxuUGFyc2VkQ29tcG9uZW50cy5wcm90b3R5cGUuZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRlTW9tZW50ID0gdGhpcy5tb21lbnQoKTtcbiAgICByZXR1cm4gZGF0ZU1vbWVudC50b0RhdGUoKTtcbn07XG5cblBhcnNlZENvbXBvbmVudHMucHJvdG90eXBlLm1vbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRlTW9tZW50ID0gbW9tZW50KCk7XG5cbiAgICBkYXRlTW9tZW50LnNldCgneWVhcicsIHRoaXMuZ2V0KCd5ZWFyJykpO1xuICAgIGRhdGVNb21lbnQuc2V0KCdtb250aCcsIHRoaXMuZ2V0KCdtb250aCcpLTEpO1xuICAgIGRhdGVNb21lbnQuc2V0KCdkYXRlJywgdGhpcy5nZXQoJ2RheScpKTtcbiAgICBkYXRlTW9tZW50LnNldCgnaG91cicsIHRoaXMuZ2V0KCdob3VyJykpO1xuICAgIGRhdGVNb21lbnQuc2V0KCdtaW51dGUnLCB0aGlzLmdldCgnbWludXRlJykpO1xuICAgIGRhdGVNb21lbnQuc2V0KCdzZWNvbmQnLCB0aGlzLmdldCgnc2Vjb25kJykpO1xuICAgIGRhdGVNb21lbnQuc2V0KCdtaWxsaXNlY29uZCcsIHRoaXMuZ2V0KCdtaWxsaXNlY29uZCcpKTtcblxuICAgIC8vIEphdmFzY3JpcHQgRGF0ZSBPYmplY3QgcmV0dXJuIG1pbnVzIHRpbWV6b25lIG9mZnNldFxuICAgIHZhciBjdXJyZW50VGltZXpvbmVPZmZzZXQgPSBkYXRlTW9tZW50LnV0Y09mZnNldCgpO1xuICAgIHZhciB0YXJnZXRUaW1lem9uZU9mZnNldCA9IHRoaXMuaXNDZXJ0YWluKCd0aW1lem9uZU9mZnNldCcpID8gXG4gICAgICAgIHRoaXMuZ2V0KCd0aW1lem9uZU9mZnNldCcpIDogY3VycmVudFRpbWV6b25lT2Zmc2V0O1xuXG4gICAgdmFyIGFkanVzdFRpbWV6b25lT2Zmc2V0ID0gdGFyZ2V0VGltZXpvbmVPZmZzZXQgLSBjdXJyZW50VGltZXpvbmVPZmZzZXQ7XG4gICAgZGF0ZU1vbWVudC5hZGQoLWFkanVzdFRpbWV6b25lT2Zmc2V0LCAnbWludXRlcycpO1xuXG4gICAgcmV0dXJuIGRhdGVNb21lbnQ7XG59O1xuXG5cblxuZXhwb3J0cy5QYXJzZWRDb21wb25lbnRzID0gUGFyc2VkQ29tcG9uZW50cztcbmV4cG9ydHMuUGFyc2VkUmVzdWx0ID0gUGFyc2VkUmVzdWx0O1xuIiwiZXhwb3J0cy5XRUVLREFZX09GRlNFVCA9IHsgXG4gICAgJ3Nvbm50YWcnOiAwLCBcbiAgICAnc28nOiAwLCBcbiAgICAnbW9udGFnJzogMSwgXG4gICAgJ21vJzogMSxcbiAgICAnZGllbnN0YWcnOiAyLCBcbiAgICAnZGknOjIsIFxuICAgICdtaXR0d29jaCc6IDMsIFxuICAgICdtaSc6IDMsIFxuICAgICdkb25uZXJzdGFnJzogNCwgXG4gICAgJ2RvJzogNCwgXG4gICAgJ2ZyZWl0YWcnOiA1LCBcbiAgICAnZnInOiA1LFxuICAgICdzYW1zdGFnJzogNiwgXG4gICAgJ3NhJzogNlxufTtcbiAgICBcbmV4cG9ydHMuTU9OVEhfT0ZGU0VUID0geyBcbiAgICAnamFudWFyJzogMSxcbiAgICAnamFuJzogMSxcbiAgICAnamFuLic6IDEsXG4gICAgJ2ZlYnJ1YXInOiAyLFxuICAgICdmZWInOiAyLFxuICAgICdmZWIuJzogMixcbiAgICAnbcOkcnonOiAzLFxuICAgICdtYWVyeic6IDMsXG4gICAgJ23DpHInOiAzLFxuICAgICdtw6RyLic6IDMsXG4gICAgJ21yeic6IDMsXG4gICAgJ21yei4nOiAzLFxuICAgICdhcHJpbCc6IDQsXG4gICAgJ2Fwcic6IDQsXG4gICAgJ2Fwci4nOiA0LFxuICAgICdtYWknOiA1LFxuICAgICdqdW5pJzogNixcbiAgICAnanVuJzogNixcbiAgICAnanVuLic6IDYsXG4gICAgJ2p1bGknOiA3LFxuICAgICdqdWwnOiA3LFxuICAgICdqdWwuJzogNyxcbiAgICAnYXVndXN0JzogOCxcbiAgICAnYXVnJzogOCxcbiAgICAnYXVnLic6IDgsXG4gICAgJ3NlcHRlbWJlcic6IDksXG4gICAgJ3NlcCc6IDksXG4gICAgJ3NlcC4nOiA5LFxuICAgICdzZXB0JzogOSxcbiAgICAnc2VwdC4nOiA5LFxuICAgICdva3RvYmVyJzogMTAsXG4gICAgJ29rdCc6IDEwLFxuICAgICdva3QuJzogMTAsXG4gICAgJ25vdmVtYmVyJzogMTEsXG4gICAgJ25vdic6IDExLFxuICAgICdub3YuJzogMTEsXG4gICAgJ2RlemVtYmVyJzogMTIsXG4gICAgJ2Rleic6IDEyLFxuICAgICdkZXouJzogMTJcbn07XG5cbmV4cG9ydHMuSU5URUdFUl9XT1JEU19QQVRURVJOID0gJyg/OmVpbnN8endlaXxkcmVpfHZpZXJ8ZsO8bmZ8ZnVlbmZ8c2VjaHN8c2llYmVufGFjaHR8bmV1bnx6ZWhufGVsZnx6d8O2bGZ8endvZWxmKSc7XG5leHBvcnRzLklOVEVHRVJfV09SRFMgPSB7XG4gICAgJ2VpbnMnIDogMSxcbiAgICAnendlaScgOiAyLFxuICAgICdkcmVpJyA6IDMsXG4gICAgJ3ZpZXInIDogNCxcbiAgICAnZsO8bmYnIDogNSxcbiAgICAnZnVlbmYnOiA1LFxuICAgICdzZWNocycgOiA2LFxuICAgICdzaWViZW4nIDogNyxcbiAgICAnYWNodCcgOiA4LFxuICAgICduZXVuJyA6IDksXG4gICAgJ3plaG4nIDogMTAsXG4gICAgJ2VsZicgOiAxMSxcbiAgICAnenfDtmxmJyA6IDEyLFxuICAgICd6d29lbGYnIDogMTJcbn07XG4iLCJleHBvcnRzLldFRUtEQVlfT0ZGU0VUID0geyBcbiAgICAnc3VuZGF5JzogMCwgXG4gICAgJ3N1bic6IDAsIFxuICAgICdtb25kYXknOiAxLCBcbiAgICAnbW9uJzogMSxcbiAgICAndHVlc2RheSc6IDIsIFxuICAgICd0dWUnOjIsIFxuICAgICd3ZWRuZXNkYXknOiAzLCBcbiAgICAnd2VkJzogMywgXG4gICAgJ3RodXJzZGF5JzogNCwgXG4gICAgJ3RodXInOiA0LCBcbiAgICAndGh1JzogNCxcbiAgICAnZnJpZGF5JzogNSwgXG4gICAgJ2ZyaSc6IDUsXG4gICAgJ3NhdHVyZGF5JzogNiwgXG4gICAgJ3NhdCc6IDZcbn07XG4gICAgXG5leHBvcnRzLk1PTlRIX09GRlNFVCA9IHsgXG4gICAgJ2phbnVhcnknOiAxLFxuICAgICdqYW4nOiAxLFxuICAgICdqYW4uJzogMSxcbiAgICAnZmVicnVhcnknOiAyLFxuICAgICdmZWInOiAyLFxuICAgICdmZWIuJzogMixcbiAgICAnbWFyY2gnOiAzLFxuICAgICdtYXInOiAzLFxuICAgICdtYXIuJzogMyxcbiAgICAnYXByaWwnOiA0LFxuICAgICdhcHInOiA0LFxuICAgICdhcHIuJzogNCxcbiAgICAnbWF5JzogNSxcbiAgICAnanVuZSc6IDYsXG4gICAgJ2p1bic6IDYsXG4gICAgJ2p1bi4nOiA2LFxuICAgICdqdWx5JzogNyxcbiAgICAnanVsJzogNyxcbiAgICAnanVsLic6IDcsXG4gICAgJ2F1Z3VzdCc6IDgsXG4gICAgJ2F1Zyc6IDgsXG4gICAgJ2F1Zy4nOiA4LFxuICAgICdzZXB0ZW1iZXInOiA5LFxuICAgICdzZXAnOiA5LFxuICAgICdzZXAuJzogOSxcbiAgICAnc2VwdCc6IDksXG4gICAgJ3NlcHQuJzogOSxcbiAgICAnb2N0b2Jlcic6IDEwLFxuICAgICdvY3QnOiAxMCxcbiAgICAnb2N0Lic6IDEwLFxuICAgICdub3ZlbWJlcic6IDExLFxuICAgICdub3YnOiAxMSxcbiAgICAnbm92Lic6IDExLFxuICAgICdkZWNlbWJlcic6IDEyLFxuICAgICdkZWMnOiAxMixcbiAgICAnZGVjLic6IDEyXG59O1xuXG5leHBvcnRzLklOVEVHRVJfV09SRFMgPSB7XG4gICAgJ29uZScgOiAxLFxuICAgICd0d28nIDogMixcbiAgICAndGhyZWUnIDogMyxcbiAgICAnZm91cicgOiA0LFxuICAgICdmaXZlJyA6IDUsXG4gICAgJ3NpeCcgOiA2LFxuICAgICdzZXZlbicgOiA3LFxuICAgICdlaWdodCcgOiA4LFxuICAgICduaW5lJyA6IDksXG4gICAgJ3RlbicgOiAxMCxcbiAgICAnZWxldmVuJyA6IDExLFxuICAgICd0d2VsdmUnIDogMTJcbn07XG5leHBvcnRzLklOVEVHRVJfV09SRFNfUEFUVEVSTiA9ICcoPzonICsgT2JqZWN0LmtleXMoZXhwb3J0cy5JTlRFR0VSX1dPUkRTKS5qb2luKCd8JykgKycpJztcblxuZXhwb3J0cy5PUkRJTkFMX1dPUkRTID0ge1xuICAgICdmaXJzdCcgOiAxLFxuICAgICdzZWNvbmQnOiAyLFxuICAgICd0aGlyZCc6IDMsXG4gICAgJ2ZvdXJ0aCc6IDQsXG4gICAgJ2ZpZnRoJzogNSxcbiAgICAnc2l4dGgnOiA2LFxuICAgICdzZXZlbnRoJzogNyxcbiAgICAnZWlnaHRoJzogOCxcbiAgICAnbmludGgnOiA5LFxuICAgICd0ZW50aCc6IDEwLFxuICAgICdlbGV2ZW50aCc6IDExLFxuICAgICd0d2VsZnRoJzogMTIsXG4gICAgJ3RoaXJ0ZWVudGgnOiAxMyxcbiAgICAnZm91cnRlZW50aCc6IDE0LFxuICAgICdmaWZ0ZWVudGgnOiAxNSxcbiAgICAnc2l4dGVlbnRoJzogMTYsXG4gICAgJ3NldmVudGVlbnRoJzogMTcsXG4gICAgJ2VpZ2h0ZWVudGgnOiAxOCxcbiAgICAnbmluZXRlZW50aCc6IDE5LFxuICAgICd0d2VudGlldGgnOiAyMCxcbiAgICAndHdlbnR5IGZpcnN0JzogMjEsXG4gICAgJ3R3ZW50eSBzZWNvbmQnOiAyMixcbiAgICAndHdlbnR5IHRoaXJkJzogMjMsXG4gICAgJ3R3ZW50eSBmb3VydGgnOiAyNCxcbiAgICAndHdlbnR5IGZpZnRoJzogMjUsXG4gICAgJ3R3ZW50eSBzaXh0aCc6IDI2LFxuICAgICd0d2VudHkgc2V2ZW50aCc6IDI3LFxuICAgICd0d2VudHkgZWlnaHRoJzogMjgsXG4gICAgJ3R3ZW50eSBuaW50aCc6IDI5LFxuICAgICd0aGlydGlldGgnOiAzMCxcbiAgICAndGhpcnR5IGZpcnN0JzogMzFcbn07XG5leHBvcnRzLk9SRElOQUxfV09SRFNfUEFUVEVSTiA9ICcoPzonICsgT2JqZWN0LmtleXMoZXhwb3J0cy5PUkRJTkFMX1dPUkRTKS5qb2luKCd8JykucmVwbGFjZSgvIC9nLCAnWyAtXScpICsgJyknOyIsImV4cG9ydHMuV0VFS0RBWV9PRkZTRVQgPSB7XG4gICAgJ2RvbWluZ28nOiAwLFxuICAgICdkb20nOiAwLFxuICAgICdsdW5lcyc6IDEsXG4gICAgJ2x1bic6IDEsXG4gICAgJ21hcnRlcyc6IDIsXG4gICAgJ21hcic6MixcbiAgICAnbWnDqXJjb2xlcyc6IDMsXG4gICAgJ21pZXJjb2xlcyc6IDMsXG4gICAgJ21pZSc6IDMsXG4gICAgJ2p1ZXZlcyc6IDQsXG4gICAgJ2p1ZSc6IDQsXG4gICAgJ3ZpZXJuZXMnOiA1LFxuICAgICd2aWUnOiA1LFxuICAgICdzw6FiYWRvJzogNixcbiAgICAnc2FiYWRvJzogNixcbiAgICAnc2FiJzogNix9XG5cbmV4cG9ydHMuTU9OVEhfT0ZGU0VUID0ge1xuICAgICdlbmVybyc6IDEsXG4gICAgJ2VuZSc6IDEsXG4gICAgJ2VuZS4nOiAxLFxuICAgICdmZWJyZXJvJzogMixcbiAgICAnZmViJzogMixcbiAgICAnZmViLic6IDIsXG4gICAgJ21hcnpvJzogMyxcbiAgICAnbWFyJzogMyxcbiAgICAnbWFyLic6IDMsXG4gICAgJ2FicmlsJzogNCxcbiAgICAnYWJyJzogNCxcbiAgICAnYWJyLic6IDQsXG4gICAgJ21heW8nOiA1LFxuICAgICdtYXknOiA1LFxuICAgICdtYXkuJzogNSxcbiAgICAnanVuaW8nOiA2LFxuICAgICdqdW4nOiA2LFxuICAgICdqdW4uJzogNixcbiAgICAnanVsaW8nOiA3LFxuICAgICdqdWwnOiA3LFxuICAgICdqdWwuJzogNyxcbiAgICAnYWdvc3RvJzogOCxcbiAgICAnYWdvJzogOCxcbiAgICAnYWdvLic6IDgsXG4gICAgJ3NlcHRpZW1icmUnOiA5LFxuICAgICdzZXAnOiA5LFxuICAgICdzZXB0JzogOSxcbiAgICAnc2VwLic6IDksXG4gICAgJ3NlcHQuJzogOSxcbiAgICAnb2N0dWJyZSc6IDEwLFxuICAgICdvY3QnOiAxMCxcbiAgICAnb2N0Lic6IDEwLFxuICAgICdub3ZpZW1icmUnOiAxMSxcbiAgICAnbm92JzogMTEsXG4gICAgJ25vdi4nOiAxMSxcbiAgICAnZGljaWVtYnJlJzogMTIsXG4gICAgJ2RpYyc6IDEyLFxuICAgICdkaWMuJzogMTIsXG59XG4iLCJleHBvcnRzLldFRUtEQVlfT0ZGU0VUID0geyBcclxuICAgICdkaW1hbmNoZSc6IDAsIFxyXG4gICAgJ2RpbSc6IDAsIFxyXG4gICAgJ2x1bmRpJzogMSwgXHJcbiAgICAnbHVuJzogMSxcclxuICAgICdtYXJkaSc6IDIsIFxyXG4gICAgJ21hcic6MiwgXHJcbiAgICAnbWVyY3JlZGknOiAzLCBcclxuICAgICdtZXInOiAzLCBcclxuICAgICdqZXVkaSc6IDQsIFxyXG4gICAgJ2pldSc6IDQsIFxyXG4gICAgJ3ZlbmRyZWRpJzogNSwgXHJcbiAgICAndmVuJzogNSxcclxuICAgICdzYW1lZGknOiA2LCBcclxuICAgICdzYW0nOiA2XHJcbn07XHJcbiAgICBcclxuZXhwb3J0cy5NT05USF9PRkZTRVQgPSB7IFxyXG4gICAgJ2phbnZpZXInOiAxLFxyXG4gICAgJ2phbic6IDEsXHJcbiAgICAnamFuLic6IDEsXHJcbiAgICAnZsOpdnJpZXInOiAyLFxyXG4gICAgJ2bDqXYnOiAyLFxyXG4gICAgJ2bDqXYuJzogMixcclxuICAgICdmZXZyaWVyJzogMixcclxuICAgICdmZXYnOiAyLFxyXG4gICAgJ2Zldi4nOiAyLFxyXG4gICAgJ21hcnMnOiAzLFxyXG4gICAgJ21hcic6IDMsXHJcbiAgICAnbWFyLic6IDMsXHJcbiAgICAnYXZyaWwnOiA0LFxyXG4gICAgJ2F2cic6IDQsXHJcbiAgICAnYXZyLic6IDQsXHJcbiAgICAnbWFpJzogNSxcclxuICAgICdqdWluJzogNixcclxuICAgICdqdW4nOiA2LFxyXG4gICAgJ2p1aWxsZXQnOiA3LFxyXG4gICAgJ2p1bCc6IDcsXHJcbiAgICAnanVsLic6IDcsXHJcbiAgICAnYW/Du3QnOiA4LFxyXG4gICAgJ2FvdXQnOiA4LFxyXG4gICAgJ3NlcHRlbWJyZSc6IDksXHJcbiAgICAnc2VwJzogOSxcclxuICAgICdzZXAuJzogOSxcclxuICAgICdzZXB0JzogOSxcclxuICAgICdzZXB0Lic6IDksXHJcbiAgICAnb2N0b2JyZSc6IDEwLFxyXG4gICAgJ29jdCc6IDEwLFxyXG4gICAgJ29jdC4nOiAxMCxcclxuICAgICdub3ZlbWJyZSc6IDExLFxyXG4gICAgJ25vdic6IDExLFxyXG4gICAgJ25vdi4nOiAxMSxcclxuICAgICdkw6ljZW1icmUnOiAxMixcclxuICAgICdkZWNlbWJyZSc6IDEyLFxyXG4gICAgJ2RlYyc6IDEyLFxyXG4gICAgJ2RlYy4nOiAxMlxyXG59O1xyXG5cclxuZXhwb3J0cy5JTlRFR0VSX1dPUkRTX1BBVFRFUk4gPSAnKD86dW58ZGV1eHx0cm9pc3xxdWF0cmV8Y2lucXxzaXh8c2VwdHxodWl0fG5ldWZ8ZGl4fG9uemV8ZG91emV8dHJlaXplKSc7XHJcbmV4cG9ydHMuSU5URUdFUl9XT1JEUyA9IHtcclxuICAgICd1bicgOiAxLFxyXG4gICAgJ2RldXgnIDogMixcclxuICAgICd0cm9pcycgOiAzLFxyXG4gICAgJ3F1YXRyZScgOiA0LFxyXG4gICAgJ2NpbnEnIDogNSxcclxuICAgICdzaXgnIDogNixcclxuICAgICdzZXB0JyA6IDcsXHJcbiAgICAnaHVpdCcgOiA4LFxyXG4gICAgJ25ldWYnIDogOSxcclxuICAgICdkaXgnIDogMTAsXHJcbiAgICAnb256ZScgOiAxMSxcclxuICAgICdkb3V6ZScgOiAxMixcclxuICAgICd0cmVpemUnIDogMTMsXHJcbn07XHJcbiIsIlxuXG4vKipcbiAqIHRvLWhhbmtha3UuanNcbiAqIGNvbnZlcnQgdG8gYXNjaWkgY29kZSBzdHJpbmdzLlxuICpcbiAqIEB2ZXJzaW9uIDEuMC4xXG4gKiBAYXV0aG9yIHRoaW5rNDlcbiAqIEB1cmwgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vOTY0NTkyXG4gKiBAbGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocCAoVGhlIE1JVCBMaWNlbnNlKVxuICovXG4gXG5leHBvcnRzLnRvSGFua2FrdSA9IChmdW5jdGlvbiAoU3RyaW5nLCBmcm9tQ2hhckNvZGUpIHtcbiBcbiAgICBmdW5jdGlvbiB0b0hhbmtha3UgKHN0cmluZykge1xuICAgICAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvXFx1MjAxOS9nLCAnXFx1MDAyNycpLnJlcGxhY2UoL1xcdTIwMUQvZywgJ1xcdTAwMjInKS5yZXBsYWNlKC9cXHUzMDAwL2csICdcXHUwMDIwJykucmVwbGFjZSgvXFx1RkZFNS9nLCAnXFx1MDBBNScpLnJlcGxhY2UoL1tcXHVGRjAxXFx1RkYwMy1cXHVGRjA2XFx1RkYwOFxcdUZGMDlcXHVGRjBDLVxcdUZGMTlcXHVGRjFDLVxcdUZGMUZcXHVGRjIxLVxcdUZGM0JcXHVGRjNEXFx1RkYzRlxcdUZGNDEtXFx1RkY1QlxcdUZGNURcXHVGRjVFXS9nLCBhbHBoYU51bSk7XG4gICAgfVxuIFxuICAgIGZ1bmN0aW9uIGFscGhhTnVtICh0b2tlbikge1xuICAgICAgICByZXR1cm4gZnJvbUNoYXJDb2RlKHRva2VuLmNoYXJDb2RlQXQoMCkgLSA2NTI0OCk7XG4gICAgfVxuIFxuICAgIHJldHVybiB0b0hhbmtha3U7XG59KShTdHJpbmcsIFN0cmluZy5mcm9tQ2hhckNvZGUpO1xuXG4vKipcbiAqIHRvLXplbmtha3UuanNcbiAqIGNvbnZlcnQgdG8gbXVsdGkgYnl0ZSBzdHJpbmdzLlxuICpcbiAqIEB2ZXJzaW9uIDEuMC4yXG4gKiBAYXV0aG9yIHRoaW5rNDlcbiAqIEB1cmwgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vOTY0NTkyXG4gKiBAbGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocCAoVGhlIE1JVCBMaWNlbnNlKVxuICovXG5leHBvcnRzLnRvWmVua2FrdSA9IChmdW5jdGlvbiAoU3RyaW5nLCBmcm9tQ2hhckNvZGUpIHtcbiBcbiAgICBmdW5jdGlvbiB0b1plbmtha3UgKHN0cmluZykge1xuICAgICAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvXFx1MDAyMC9nLCAnXFx1MzAwMCcpLnJlcGxhY2UoL1xcdTAwMjIvZywgJ1xcdTIwMUQnKS5yZXBsYWNlKC9cXHUwMDI3L2csICdcXHUyMDE5JykucmVwbGFjZSgvXFx1MDBBNS9nLCAnXFx1RkZFNScpLnJlcGxhY2UoL1shIy0mKCksLTlcXHUwMDNDLT9BLVtcXHUwMDVEX2Ete31+XS9nLCBhbHBoYU51bSk7XG4gICAgfVxuIFxuICAgIGZ1bmN0aW9uIGFscGhhTnVtICh0b2tlbikge1xuICAgICAgICByZXR1cm4gZnJvbUNoYXJDb2RlKHRva2VuLmNoYXJDb2RlQXQoMCkgKyA2NTI0OCk7XG4gICAgfVxuIFxuICAgIHJldHVybiB0b1plbmtha3U7XG59KShTdHJpbmcsIFN0cmluZy5mcm9tQ2hhckNvZGUpOyIsInZhciBOVU1CRVIgPXtcbiAgJ+mbtic6MCxcbiAgJ+S4gCc6MSxcbiAgJ+S6jCc6MixcbiAgJ+WFqSc6MixcbiAgJ+S4iSc6MyxcbiAgJ+Wbmyc6NCxcbiAgJ+S6lCc6NSxcbiAgJ+WFrSc6NixcbiAgJ+S4gyc6NyxcbiAgJ+WFqyc6OCxcbiAgJ+S5nSc6OSxcbiAgJ+WNgSc6MTAsXG4gICflu78nOjIwLFxuICAn5Y2FJzozMCxcbn07XG5cbnZhciBXRUVLREFZX09GRlNFVCA9e1xuICAn5aSpJzowLFxuICAn5pelJzowLFxuICAn5LiAJzoxLFxuICAn5LqMJzoyLFxuICAn5LiJJzozLFxuICAn5ZubJzo0LFxuICAn5LqUJzo1LFxuICAn5YWtJzo2LFxufTtcblxuZXhwb3J0cy5OVU1CRVIgPSBOVU1CRVI7XG5leHBvcnRzLldFRUtEQVlfT0ZGU0VUID0gV0VFS0RBWV9PRkZTRVQ7XG5cbmV4cG9ydHMuemhTdHJpbmdUb051bWJlcj1mdW5jdGlvbih0ZXh0KXtcbiAgdmFyIG51bWJlciA9IDA7XG4gIGZvcih2YXIgaT0wOyBpPHRleHQubGVuZ3RoIDtpKyspe1xuICAgIHZhciBjaGFyID0gdGV4dFtpXTtcbiAgICBpZihjaGFyID09PSAn5Y2BJyl7XG4gICAgICBudW1iZXIgPSBudW1iZXI9PT0gMCA/IE5VTUJFUltjaGFyXSA6IChudW1iZXIgKiBOVU1CRVJbY2hhcl0pO1xuICAgIH1lbHNle1xuICAgICAgbnVtYmVyICs9IE5VTUJFUltjaGFyXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bWJlcjtcbn07XG5cbmV4cG9ydHMuemhTdHJpbmdUb1llYXI9ZnVuY3Rpb24odGV4dCl7XG4gIHZhciBzdHJpbmcgPSAnJztcbiAgZm9yKHZhciBpPTA7IGk8dGV4dC5sZW5ndGggO2krKyl7XG4gICAgdmFyIGNoYXIgPSB0ZXh0W2ldO1xuICAgIHN0cmluZyA9IHN0cmluZyArIE5VTUJFUltjaGFyXTtcbiAgfVxuICByZXR1cm4gcGFyc2VJbnQoc3RyaW5nKTtcbn07XG4iXX0=
