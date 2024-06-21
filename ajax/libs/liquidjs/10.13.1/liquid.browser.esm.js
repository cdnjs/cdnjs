/*
 * liquidjs@10.13.1, https://github.com/harttle/liquidjs
 * (c) 2016-2024 harttle
 * Released under the MIT License.
 */
class Token {
    constructor(kind, input, begin, end, file) {
        this.kind = kind;
        this.input = input;
        this.begin = begin;
        this.end = end;
        this.file = file;
    }
    getText() {
        return this.input.slice(this.begin, this.end);
    }
    getPosition() {
        let [row, col] = [1, 1];
        for (let i = 0; i < this.begin; i++) {
            if (this.input[i] === '\n') {
                row++;
                col = 1;
            }
            else
                col++;
        }
        return [row, col];
    }
    size() {
        return this.end - this.begin;
    }
}

class Drop {
    liquidMethodMissing(key) {
        return undefined;
    }
}

const toString$1 = Object.prototype.toString;
const toLowerCase = String.prototype.toLowerCase;
const hasOwnProperty = Object.hasOwnProperty;
function isString(value) {
    return typeof value === 'string';
}
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(value) {
    return typeof value === 'function';
}
function isPromise(val) {
    return val && isFunction(val.then);
}
function isIterator(val) {
    return val && isFunction(val.next) && isFunction(val.throw) && isFunction(val.return);
}
function escapeRegex(str) {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function stringify(value) {
    value = toValue(value);
    if (isString(value))
        return value;
    if (isNil(value))
        return '';
    if (isArray(value))
        return value.map(x => stringify(x)).join('');
    return String(value);
}
function toEnumerable(val) {
    val = toValue(val);
    if (isArray(val))
        return val;
    if (isString(val) && val.length > 0)
        return [val];
    if (isIterable(val))
        return Array.from(val);
    if (isObject(val))
        return Object.keys(val).map((key) => [key, val[key]]);
    return [];
}
function toArray(val) {
    val = toValue(val);
    if (isNil(val))
        return [];
    if (isArray(val))
        return val;
    return [val];
}
function toValue(value) {
    return (value instanceof Drop && isFunction(value.valueOf)) ? value.valueOf() : value;
}
function isNumber(value) {
    return typeof value === 'number';
}
function toLiquid(value) {
    if (value && isFunction(value.toLiquid))
        return toLiquid(value.toLiquid());
    return value;
}
function isNil(value) {
    return value == null;
}
function isUndefined(value) {
    return value === undefined;
}
function isArray(value) {
    // be compatible with IE 8
    return toString$1.call(value) === '[object Array]';
}
function isIterable(value) {
    return isObject(value) && Symbol.iterator in value;
}
/*
 * Iterates over own enumerable string keyed properties of an object and invokes iteratee for each property.
 * The iteratee is invoked with three arguments: (value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning false.
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @return {Object} Returns object.
 */
function forOwn(obj, iteratee) {
    obj = obj || {};
    for (const k in obj) {
        if (hasOwnProperty.call(obj, k)) {
            if (iteratee(obj[k], k, obj) === false)
                break;
        }
    }
    return obj;
}
function last(arr) {
    return arr[arr.length - 1];
}
/*
 * Checks if value is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))
 * @param {any} value The value to check.
 * @return {Boolean} Returns true if value is an object, else false.
 */
function isObject(value) {
    const type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
}
function range(start, stop, step = 1) {
    const arr = [];
    for (let i = start; i < stop; i += step) {
        arr.push(i);
    }
    return arr;
}
function padStart(str, length, ch = ' ') {
    return pad(str, length, ch, (str, ch) => ch + str);
}
function padEnd(str, length, ch = ' ') {
    return pad(str, length, ch, (str, ch) => str + ch);
}
function pad(str, length, ch, add) {
    str = String(str);
    let n = length - str.length;
    while (n-- > 0)
        str = add(str, ch);
    return str;
}
function identify(val) {
    return val;
}
function changeCase(str) {
    const hasLowerCase = [...str].some(ch => ch >= 'a' && ch <= 'z');
    return hasLowerCase ? str.toUpperCase() : str.toLowerCase();
}
function ellipsis(str, N) {
    return str.length > N ? str.slice(0, N - 3) + '...' : str;
}
// compare string in case-insensitive way, undefined values to the tail
function caseInsensitiveCompare(a, b) {
    if (a == null && b == null)
        return 0;
    if (a == null)
        return 1;
    if (b == null)
        return -1;
    a = toLowerCase.call(a);
    b = toLowerCase.call(b);
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}
function argumentsToValue(fn) {
    return (...args) => fn(...args.map(toValue));
}
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

/**
 * targeting ES5, extends Error won't create a proper prototype chain, need a trait to kee track of classes
 */
const TRAIT = '__liquidClass__';
class LiquidError extends Error {
    constructor(err, token) {
        /**
         * note: for ES5 targeting, `this` will be replaced by return value of Error(),
         * thus everything on `this` will be lost, avoid calling `LiquidError` methods here
         */
        super(typeof err === 'string' ? err : err.message);
        this.context = '';
        if (typeof err !== 'string')
            Object.defineProperty(this, 'originalError', { value: err, enumerable: false });
        Object.defineProperty(this, 'token', { value: token, enumerable: false });
        Object.defineProperty(this, TRAIT, { value: 'LiquidError', enumerable: false });
    }
    update() {
        Object.defineProperty(this, 'context', { value: mkContext(this.token), enumerable: false });
        this.message = mkMessage(this.message, this.token);
        this.stack = this.message + '\n' + this.context +
            '\n' + this.stack;
        if (this.originalError)
            this.stack += '\nFrom ' + this.originalError.stack;
    }
    static is(obj) {
        return (obj === null || obj === void 0 ? void 0 : obj[TRAIT]) === 'LiquidError';
    }
}
class TokenizationError extends LiquidError {
    constructor(message, token) {
        super(message, token);
        this.name = 'TokenizationError';
        super.update();
    }
}
class ParseError extends LiquidError {
    constructor(err, token) {
        super(err, token);
        this.name = 'ParseError';
        this.message = err.message;
        super.update();
    }
}
class RenderError extends LiquidError {
    constructor(err, tpl) {
        super(err, tpl.token);
        this.name = 'RenderError';
        this.message = err.message;
        super.update();
    }
    static is(obj) {
        return obj.name === 'RenderError';
    }
}
class UndefinedVariableError extends LiquidError {
    constructor(err, token) {
        super(err, token);
        this.name = 'UndefinedVariableError';
        this.message = err.message;
        super.update();
    }
}
// only used internally; raised where we don't have token information,
// so it can't be an UndefinedVariableError.
class InternalUndefinedVariableError extends Error {
    constructor(variableName) {
        super(`undefined variable: ${variableName}`);
        this.name = 'InternalUndefinedVariableError';
        this.variableName = variableName;
    }
}
class AssertionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AssertionError';
        this.message = message + '';
    }
}
function mkContext(token) {
    const [line, col] = token.getPosition();
    const lines = token.input.split('\n');
    const begin = Math.max(line - 2, 1);
    const end = Math.min(line + 3, lines.length);
    const context = range(begin, end + 1)
        .map(lineNumber => {
        const rowIndicator = (lineNumber === line) ? '>> ' : '   ';
        const num = padStart(String(lineNumber), String(end).length);
        let text = `${rowIndicator}${num}| `;
        const colIndicator = lineNumber === line
            ? '\n' + padStart('^', col + text.length)
            : '';
        text += lines[lineNumber - 1];
        text += colIndicator;
        return text;
    })
        .join('\n');
    return context;
}
function mkMessage(msg, token) {
    if (token.file)
        msg += `, file:${token.file}`;
    const [line, col] = token.getPosition();
    msg += `, line:${line}, col:${col}`;
    return msg;
}

// **DO NOT CHANGE THIS FILE**
//
// This file is generated by bin/character-gen.js
// bitmask character types to boost performance
const TYPES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 4, 4, 4, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 8, 0, 0, 0, 0, 8, 0, 0, 0, 64, 0, 65, 0, 0, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 0, 0, 2, 2, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
const WORD = 1;
const BLANK = 4;
const QUOTE = 8;
const INLINE_BLANK = 16;
const NUMBER = 32;
const SIGN = 64;
const PUNCTUATION = 128;
function isWord(char) {
    const code = char.charCodeAt(0);
    return code >= 128 ? !TYPES[code] : !!(TYPES[code] & WORD);
}
TYPES[160] = TYPES[5760] = TYPES[6158] = TYPES[8192] = TYPES[8193] = TYPES[8194] = TYPES[8195] = TYPES[8196] = TYPES[8197] = TYPES[8198] = TYPES[8199] = TYPES[8200] = TYPES[8201] = TYPES[8202] = TYPES[8232] = TYPES[8233] = TYPES[8239] = TYPES[8287] = TYPES[12288] = BLANK;
TYPES[8220] = TYPES[8221] = PUNCTUATION;

function assert(predicate, message) {
    if (!predicate) {
        const msg = typeof message === 'function'
            ? message()
            : (message || `expect ${predicate} to be true`);
        throw new AssertionError(msg);
    }
}

class NullDrop extends Drop {
    equals(value) {
        return isNil(toValue(value));
    }
    gt() {
        return false;
    }
    geq() {
        return false;
    }
    lt() {
        return false;
    }
    leq() {
        return false;
    }
    valueOf() {
        return null;
    }
}

class EmptyDrop extends Drop {
    equals(value) {
        if (value instanceof EmptyDrop)
            return false;
        value = toValue(value);
        if (isString(value) || isArray(value))
            return value.length === 0;
        if (isObject(value))
            return Object.keys(value).length === 0;
        return false;
    }
    gt() {
        return false;
    }
    geq() {
        return false;
    }
    lt() {
        return false;
    }
    leq() {
        return false;
    }
    valueOf() {
        return '';
    }
}

class BlankDrop extends EmptyDrop {
    equals(value) {
        if (value === false)
            return true;
        if (isNil(toValue(value)))
            return true;
        if (isString(value))
            return /^\s*$/.test(value);
        return super.equals(value);
    }
}

class ForloopDrop extends Drop {
    constructor(length, collection, variable) {
        super();
        this.i = 0;
        this.length = length;
        this.name = `${variable}-${collection}`;
    }
    next() {
        this.i++;
    }
    index0() {
        return this.i;
    }
    index() {
        return this.i + 1;
    }
    first() {
        return this.i === 0;
    }
    last() {
        return this.i === this.length - 1;
    }
    rindex() {
        return this.length - this.i;
    }
    rindex0() {
        return this.length - this.i - 1;
    }
    valueOf() {
        return JSON.stringify(this);
    }
}

class BlockDrop extends Drop {
    constructor(
    // the block render from layout template
    superBlockRender = () => '') {
        super();
        this.superBlockRender = superBlockRender;
    }
    /**
     * Provide parent access in child block by
     * {{ block.super }}
     */
    super() {
        return this.superBlockRender();
    }
}

function isComparable(arg) {
    return (arg &&
        isFunction(arg.equals) &&
        isFunction(arg.gt) &&
        isFunction(arg.geq) &&
        isFunction(arg.lt) &&
        isFunction(arg.leq));
}

const nil = new NullDrop();
const literalValues = {
    'true': true,
    'false': false,
    'nil': nil,
    'null': nil,
    'empty': new EmptyDrop(),
    'blank': new BlankDrop()
};

function createTrie(input) {
    const trie = {};
    for (const [name, data] of Object.entries(input)) {
        let node = trie;
        for (let i = 0; i < name.length; i++) {
            const c = name[i];
            node[c] = node[c] || {};
            if (i === name.length - 1 && isWord(name[i])) {
                node[c].needBoundary = true;
            }
            node = node[c];
        }
        node.data = data;
        node.end = true;
    }
    return trie;
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

// convert an async iterator to a Promise
function toPromise(val) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isIterator(val))
            return val;
        let value;
        let done = false;
        let next = 'next';
        do {
            const state = val[next](value);
            done = state.done;
            value = state.value;
            next = 'next';
            try {
                if (isIterator(value))
                    value = toPromise(value);
                if (isPromise(value))
                    value = yield value;
            }
            catch (err) {
                next = 'throw';
                value = err;
            }
        } while (!done);
        return value;
    });
}
// convert an async iterator to a value in a synchronous manner
function toValueSync(val) {
    if (!isIterator(val))
        return val;
    let value;
    let done = false;
    let next = 'next';
    do {
        const state = val[next](value);
        done = state.done;
        value = state.value;
        next = 'next';
        if (isIterator(value)) {
            try {
                value = toValueSync(value);
            }
            catch (err) {
                next = 'throw';
                value = err;
            }
        }
    } while (!done);
    return value;
}

const rFormat = /%([-_0^#:]+)?(\d+)?([EO])?(.)/;
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];
const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];
const monthNamesShort = monthNames.map(abbr);
const dayNamesShort = dayNames.map(abbr);
function abbr(str) {
    return str.slice(0, 3);
}
// prototype extensions
function daysInMonth(d) {
    const feb = isLeapYear(d) ? 29 : 28;
    return [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}
function getDayOfYear(d) {
    let num = 0;
    for (let i = 0; i < d.getMonth(); ++i) {
        num += daysInMonth(d)[i];
    }
    return num + d.getDate();
}
function getWeekOfYear(d, startDay) {
    // Skip to startDay of this week
    const now = getDayOfYear(d) + (startDay - d.getDay());
    // Find the first startDay of the year
    const jan1 = new Date(d.getFullYear(), 0, 1);
    const then = (7 - jan1.getDay() + startDay);
    return String(Math.floor((now - then) / 7) + 1);
}
function isLeapYear(d) {
    const year = d.getFullYear();
    return !!((year & 3) === 0 && (year % 100 || (year % 400 === 0 && year)));
}
function ordinal(d) {
    const date = d.getDate();
    if ([11, 12, 13].includes(date))
        return 'th';
    switch (date % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}
function century(d) {
    return parseInt(d.getFullYear().toString().substring(0, 2), 10);
}
// default to 0
const padWidths = {
    d: 2,
    e: 2,
    H: 2,
    I: 2,
    j: 3,
    k: 2,
    l: 2,
    L: 3,
    m: 2,
    M: 2,
    S: 2,
    U: 2,
    W: 2
};
// default to '0'
const padChars = {
    a: ' ',
    A: ' ',
    b: ' ',
    B: ' ',
    c: ' ',
    e: ' ',
    k: ' ',
    l: ' ',
    p: ' ',
    P: ' '
};
function getTimezoneOffset(d, opts) {
    const nOffset = Math.abs(d.getTimezoneOffset());
    const h = Math.floor(nOffset / 60);
    const m = nOffset % 60;
    return (d.getTimezoneOffset() > 0 ? '-' : '+') +
        padStart(h, 2, '0') +
        (opts.flags[':'] ? ':' : '') +
        padStart(m, 2, '0');
}
const formatCodes = {
    a: (d) => dayNamesShort[d.getDay()],
    A: (d) => dayNames[d.getDay()],
    b: (d) => monthNamesShort[d.getMonth()],
    B: (d) => monthNames[d.getMonth()],
    c: (d) => d.toLocaleString(),
    C: (d) => century(d),
    d: (d) => d.getDate(),
    e: (d) => d.getDate(),
    H: (d) => d.getHours(),
    I: (d) => String(d.getHours() % 12 || 12),
    j: (d) => getDayOfYear(d),
    k: (d) => d.getHours(),
    l: (d) => String(d.getHours() % 12 || 12),
    L: (d) => d.getMilliseconds(),
    m: (d) => d.getMonth() + 1,
    M: (d) => d.getMinutes(),
    N: (d, opts) => {
        const width = Number(opts.width) || 9;
        const str = String(d.getMilliseconds()).slice(0, width);
        return padEnd(str, width, '0');
    },
    p: (d) => (d.getHours() < 12 ? 'AM' : 'PM'),
    P: (d) => (d.getHours() < 12 ? 'am' : 'pm'),
    q: (d) => ordinal(d),
    s: (d) => Math.round(d.getTime() / 1000),
    S: (d) => d.getSeconds(),
    u: (d) => d.getDay() || 7,
    U: (d) => getWeekOfYear(d, 0),
    w: (d) => d.getDay(),
    W: (d) => getWeekOfYear(d, 1),
    x: (d) => d.toLocaleDateString(),
    X: (d) => d.toLocaleTimeString(),
    y: (d) => d.getFullYear().toString().slice(2, 4),
    Y: (d) => d.getFullYear(),
    z: getTimezoneOffset,
    Z: (d, opts) => {
        if (d.getTimezoneName) {
            return d.getTimezoneName() || getTimezoneOffset(d, opts);
        }
        return (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : '');
    },
    't': () => '\t',
    'n': () => '\n',
    '%': () => '%'
};
formatCodes.h = formatCodes.b;
function strftime(d, formatStr) {
    let output = '';
    let remaining = formatStr;
    let match;
    while ((match = rFormat.exec(remaining))) {
        output += remaining.slice(0, match.index);
        remaining = remaining.slice(match.index + match[0].length);
        output += format(d, match);
    }
    return output + remaining;
}
function format(d, match) {
    const [input, flagStr = '', width, modifier, conversion] = match;
    const convert = formatCodes[conversion];
    if (!convert)
        return input;
    const flags = {};
    for (const flag of flagStr)
        flags[flag] = true;
    let ret = String(convert(d, { flags, width, modifier }));
    let padChar = padChars[conversion] || '0';
    let padWidth = width || padWidths[conversion] || 0;
    if (flags['^'])
        ret = ret.toUpperCase();
    else if (flags['#'])
        ret = changeCase(ret);
    if (flags['_'])
        padChar = ' ';
    else if (flags['0'])
        padChar = '0';
    if (flags['-'])
        padWidth = 0;
    return padStart(ret, padWidth, padChar);
}

// one minute in milliseconds
const OneMinute = 60000;
const ISO8601_TIMEZONE_PATTERN = /([zZ]|([+-])(\d{2}):(\d{2}))$/;
/**
 * A date implementation with timezone info, just like Ruby date
 *
 * Implementation:
 * - create a Date offset by it's timezone difference, avoiding overriding a bunch of methods
 * - rewrite getTimezoneOffset() to trick strftime
 */
class TimezoneDate {
    constructor(init, timezone) {
        this.date = init instanceof TimezoneDate
            ? init.date
            : new Date(init);
        this.timezoneOffset = isString(timezone) ? TimezoneDate.getTimezoneOffset(timezone, this.date) : timezone;
        this.timezoneName = isString(timezone) ? timezone : '';
        const diff = (this.date.getTimezoneOffset() - this.timezoneOffset) * OneMinute;
        const time = this.date.getTime() + diff;
        this.displayDate = new Date(time);
    }
    getTime() {
        return this.displayDate.getTime();
    }
    getMilliseconds() {
        return this.displayDate.getMilliseconds();
    }
    getSeconds() {
        return this.displayDate.getSeconds();
    }
    getMinutes() {
        return this.displayDate.getMinutes();
    }
    getHours() {
        return this.displayDate.getHours();
    }
    getDay() {
        return this.displayDate.getDay();
    }
    getDate() {
        return this.displayDate.getDate();
    }
    getMonth() {
        return this.displayDate.getMonth();
    }
    getFullYear() {
        return this.displayDate.getFullYear();
    }
    toLocaleString(locale, init) {
        if (init === null || init === void 0 ? void 0 : init.timeZone) {
            return this.date.toLocaleString(locale, init);
        }
        return this.displayDate.toLocaleString(locale, init);
    }
    toLocaleTimeString(locale) {
        return this.displayDate.toLocaleTimeString(locale);
    }
    toLocaleDateString(locale) {
        return this.displayDate.toLocaleDateString(locale);
    }
    getTimezoneOffset() {
        return this.timezoneOffset;
    }
    getTimezoneName() {
        return this.timezoneName;
    }
    /**
     * Create a Date object fixed to it's declared Timezone. Both
     * - 2021-08-06T02:29:00.000Z and
     * - 2021-08-06T02:29:00.000+08:00
     * will always be displayed as
     * - 2021-08-06 02:29:00
     * regardless timezoneOffset in JavaScript realm
     *
     * The implementation hack:
     * Instead of calling `.getMonth()`/`.getUTCMonth()` respect to `preserveTimezones`,
     * we create a different Date to trick strftime, it's both simpler and more performant.
     * Given that a template is expected to be parsed fewer times than rendered.
     */
    static createDateFixedToTimezone(dateString) {
        const m = dateString.match(ISO8601_TIMEZONE_PATTERN);
        // representing a UTC timestamp
        if (m && m[1] === 'Z') {
            return new TimezoneDate(+new Date(dateString), 0);
        }
        // has a timezone specified
        if (m && m[2] && m[3] && m[4]) {
            const [, , sign, hours, minutes] = m;
            const offset = (sign === '+' ? -1 : 1) * (parseInt(hours, 10) * 60 + parseInt(minutes, 10));
            return new TimezoneDate(+new Date(dateString), offset);
        }
        return new Date(dateString);
    }
    static getTimezoneOffset(timezoneName, date = new Date()) {
        const localDateString = date.toLocaleString('en-US', { timeZone: timezoneName });
        const utcDateString = date.toLocaleString('en-US', { timeZone: 'UTC' });
        const localDate = new Date(localDateString);
        const utcDate = new Date(utcDateString);
        return (+utcDate - +localDate) / (60 * 1000);
    }
}

class DelimitedToken extends Token {
    constructor(kind, [contentBegin, contentEnd], input, begin, end, trimLeft, trimRight, file) {
        super(kind, input, begin, end, file);
        this.trimLeft = false;
        this.trimRight = false;
        const tl = input[contentBegin] === '-';
        const tr = input[contentEnd - 1] === '-';
        let l = tl ? contentBegin + 1 : contentBegin;
        let r = tr ? contentEnd - 1 : contentEnd;
        while (l < r && (TYPES[input.charCodeAt(l)] & BLANK))
            l++;
        while (r > l && (TYPES[input.charCodeAt(r - 1)] & BLANK))
            r--;
        this.contentRange = [l, r];
        this.trimLeft = tl || trimLeft;
        this.trimRight = tr || trimRight;
    }
    get content() {
        return this.input.slice(this.contentRange[0], this.contentRange[1]);
    }
}

class TagToken extends DelimitedToken {
    constructor(input, begin, end, options, file) {
        const { trimTagLeft, trimTagRight, tagDelimiterLeft, tagDelimiterRight } = options;
        const [valueBegin, valueEnd] = [begin + tagDelimiterLeft.length, end - tagDelimiterRight.length];
        super(TokenKind.Tag, [valueBegin, valueEnd], input, begin, end, trimTagLeft, trimTagRight, file);
        this.tokenizer = new Tokenizer(input, options.operators, file, this.contentRange);
        this.name = this.tokenizer.readTagName();
        this.tokenizer.assert(this.name, `illegal tag syntax, tag name expected`);
        this.tokenizer.skipBlank();
    }
    get args() {
        return this.tokenizer.input.slice(this.tokenizer.p, this.contentRange[1]);
    }
}

class OutputToken extends DelimitedToken {
    constructor(input, begin, end, options, file) {
        const { trimOutputLeft, trimOutputRight, outputDelimiterLeft, outputDelimiterRight } = options;
        const valueRange = [begin + outputDelimiterLeft.length, end - outputDelimiterRight.length];
        super(TokenKind.Output, valueRange, input, begin, end, trimOutputLeft, trimOutputRight, file);
    }
}

class HTMLToken extends Token {
    constructor(input, begin, end, file) {
        super(TokenKind.HTML, input, begin, end, file);
        this.input = input;
        this.begin = begin;
        this.end = end;
        this.file = file;
        this.trimLeft = 0;
        this.trimRight = 0;
    }
    getContent() {
        return this.input.slice(this.begin + this.trimLeft, this.end - this.trimRight);
    }
}

class NumberToken extends Token {
    constructor(input, begin, end, file) {
        super(TokenKind.Number, input, begin, end, file);
        this.input = input;
        this.begin = begin;
        this.end = end;
        this.file = file;
        this.content = Number(this.getText());
    }
}

class IdentifierToken extends Token {
    constructor(input, begin, end, file) {
        super(TokenKind.Word, input, begin, end, file);
        this.input = input;
        this.begin = begin;
        this.end = end;
        this.file = file;
        this.content = this.getText();
    }
    isNumber(allowSign = false) {
        const begin = allowSign && TYPES[this.input.charCodeAt(this.begin)] & SIGN
            ? this.begin + 1
            : this.begin;
        for (let i = begin; i < this.end; i++) {
            if (!(TYPES[this.input.charCodeAt(i)] & NUMBER))
                return false;
        }
        return true;
    }
}

class LiteralToken extends Token {
    constructor(input, begin, end, file) {
        super(TokenKind.Literal, input, begin, end, file);
        this.input = input;
        this.begin = begin;
        this.end = end;
        this.file = file;
        this.literal = this.getText();
        this.content = literalValues[this.literal];
    }
}

const operatorPrecedences = {
    '==': 2,
    '!=': 2,
    '>': 2,
    '<': 2,
    '>=': 2,
    '<=': 2,
    'contains': 2,
    'not': 1,
    'and': 0,
    'or': 0
};
const operatorTypes = {
    '==': 0 /* OperatorType.Binary */,
    '!=': 0 /* OperatorType.Binary */,
    '>': 0 /* OperatorType.Binary */,
    '<': 0 /* OperatorType.Binary */,
    '>=': 0 /* OperatorType.Binary */,
    '<=': 0 /* OperatorType.Binary */,
    'contains': 0 /* OperatorType.Binary */,
    'not': 1 /* OperatorType.Unary */,
    'and': 0 /* OperatorType.Binary */,
    'or': 0 /* OperatorType.Binary */
};
class OperatorToken extends Token {
    constructor(input, begin, end, file) {
        super(TokenKind.Operator, input, begin, end, file);
        this.input = input;
        this.begin = begin;
        this.end = end;
        this.file = file;
        this.operator = this.getText();
    }
    getPrecedence() {
        const key = this.getText();
        return key in operatorPrecedences ? operatorPrecedences[key] : 1;
    }
}

class PropertyAccessToken extends Token {
    constructor(variable, props, input, begin, end, file) {
        super(TokenKind.PropertyAccess, input, begin, end, file);
        this.variable = variable;
        this.props = props;
    }
}

class FilterToken extends Token {
    constructor(name, args, input, begin, end, file) {
        super(TokenKind.Filter, input, begin, end, file);
        this.name = name;
        this.args = args;
    }
}

class HashToken extends Token {
    constructor(input, begin, end, name, value, file) {
        super(TokenKind.Hash, input, begin, end, file);
        this.input = input;
        this.begin = begin;
        this.end = end;
        this.name = name;
        this.value = value;
        this.file = file;
    }
}

const rHex = /[\da-fA-F]/;
const rOct = /[0-7]/;
const escapeChar = {
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t',
    v: '\x0B'
};
function hexVal(c) {
    const code = c.charCodeAt(0);
    if (code >= 97)
        return code - 87;
    if (code >= 65)
        return code - 55;
    return code - 48;
}
function parseStringLiteral(str) {
    let ret = '';
    for (let i = 1; i < str.length - 1; i++) {
        if (str[i] !== '\\') {
            ret += str[i];
            continue;
        }
        if (escapeChar[str[i + 1]] !== undefined) {
            ret += escapeChar[str[++i]];
        }
        else if (str[i + 1] === 'u') {
            let val = 0;
            let j = i + 2;
            while (j <= i + 5 && rHex.test(str[j])) {
                val = val * 16 + hexVal(str[j++]);
            }
            i = j - 1;
            ret += String.fromCharCode(val);
        }
        else if (!rOct.test(str[i + 1])) {
            ret += str[++i];
        }
        else {
            let j = i + 1;
            let val = 0;
            while (j <= i + 3 && rOct.test(str[j])) {
                val = val * 8 + hexVal(str[j++]);
            }
            i = j - 1;
            ret += String.fromCharCode(val);
        }
    }
    return ret;
}

class QuotedToken extends Token {
    constructor(input, begin, end, file) {
        super(TokenKind.Quoted, input, begin, end, file);
        this.input = input;
        this.begin = begin;
        this.end = end;
        this.file = file;
        this.content = parseStringLiteral(this.getText());
    }
}

class RangeToken extends Token {
    constructor(input, begin, end, lhs, rhs, file) {
        super(TokenKind.Range, input, begin, end, file);
        this.input = input;
        this.begin = begin;
        this.end = end;
        this.lhs = lhs;
        this.rhs = rhs;
        this.file = file;
    }
}

/**
 * LiquidTagToken is different from TagToken by not having delimiters `{%` or `%}`
 */
class LiquidTagToken extends DelimitedToken {
    constructor(input, begin, end, options, file) {
        super(TokenKind.Tag, [begin, end], input, begin, end, false, false, file);
        this.tokenizer = new Tokenizer(input, options.operators, file, this.contentRange);
        this.name = this.tokenizer.readTagName();
        this.tokenizer.assert(this.name, 'illegal liquid tag syntax');
        this.tokenizer.skipBlank();
        this.args = this.tokenizer.remaining();
    }
}

/**
 * value expression with optional filters
 * e.g.
 * {% assign foo="bar" | append: "coo" %}
 */
class FilteredValueToken extends Token {
    constructor(initial, filters, input, begin, end, file) {
        super(TokenKind.FilteredValue, input, begin, end, file);
        this.initial = initial;
        this.filters = filters;
        this.input = input;
        this.begin = begin;
        this.end = end;
        this.file = file;
    }
}

class SimpleEmitter {
    constructor() {
        this.buffer = '';
    }
    write(html) {
        this.buffer += stringify(html);
    }
}

class StreamedEmitter {
    constructor() {
        this.buffer = '';
        this.stream = null;
        throw new Error('streaming not supported in browser');
    }
}

class KeepingTypeEmitter {
    constructor() {
        this.buffer = '';
    }
    write(html) {
        html = toValue(html);
        // This will only preserve the type if the value is isolated.
        // I.E:
        // {{ my-port }} -> 42
        // {{ my-host }}:{{ my-port }} -> 'host:42'
        if (typeof html !== 'string' && this.buffer === '') {
            this.buffer = html;
        }
        else {
            this.buffer = stringify(this.buffer) + stringify(html);
        }
    }
}

class Render {
    renderTemplatesToNodeStream(templates, ctx) {
        const emitter = new StreamedEmitter();
        Promise.resolve().then(() => toPromise(this.renderTemplates(templates, ctx, emitter)))
            .then(() => emitter.end(), err => emitter.error(err));
        return emitter.stream;
    }
    *renderTemplates(templates, ctx, emitter) {
        if (!emitter) {
            emitter = ctx.opts.keepOutputType ? new KeepingTypeEmitter() : new SimpleEmitter();
        }
        for (const tpl of templates) {
            try {
                // if tpl.render supports emitter, it'll return empty `html`
                const html = yield tpl.render(ctx, emitter);
                // if not, it'll return an `html`, write to the emitter for it
                html && emitter.write(html);
                if (emitter['break'] || emitter['continue'])
                    break;
            }
            catch (e) {
                const err = RenderError.is(e) ? e : new RenderError(e, tpl);
                throw err;
            }
        }
        return emitter.buffer;
    }
}

class Expression {
    constructor(tokens) {
        this.postfix = [...toPostfix(tokens)];
    }
    *evaluate(ctx, lenient) {
        assert(ctx, 'unable to evaluate: context not defined');
        const operands = [];
        for (const token of this.postfix) {
            if (isOperatorToken(token)) {
                const r = operands.pop();
                let result;
                if (operatorTypes[token.operator] === 1 /* OperatorType.Unary */) {
                    result = yield ctx.opts.operators[token.operator](r, ctx);
                }
                else {
                    const l = operands.pop();
                    result = yield ctx.opts.operators[token.operator](l, r, ctx);
                }
                operands.push(result);
            }
            else {
                operands.push(yield evalToken(token, ctx, lenient));
            }
        }
        return operands[0];
    }
    valid() {
        return !!this.postfix.length;
    }
}
function* evalToken(token, ctx, lenient = false) {
    if (!token)
        return;
    if ('content' in token)
        return token.content;
    if (isPropertyAccessToken(token))
        return yield evalPropertyAccessToken(token, ctx, lenient);
    if (isRangeToken(token))
        return yield evalRangeToken(token, ctx);
}
function* evalPropertyAccessToken(token, ctx, lenient) {
    const props = [];
    for (const prop of token.props) {
        props.push((yield evalToken(prop, ctx, false)));
    }
    try {
        if (token.variable) {
            const variable = yield evalToken(token.variable, ctx, lenient);
            return yield ctx._getFromScope(variable, props);
        }
        else {
            return yield ctx._get(props);
        }
    }
    catch (e) {
        if (lenient && e.name === 'InternalUndefinedVariableError')
            return null;
        throw (new UndefinedVariableError(e, token));
    }
}
function evalQuotedToken(token) {
    return token.content;
}
function* evalRangeToken(token, ctx) {
    const low = yield evalToken(token.lhs, ctx);
    const high = yield evalToken(token.rhs, ctx);
    return range(+low, +high + 1);
}
function* toPostfix(tokens) {
    const ops = [];
    for (const token of tokens) {
        if (isOperatorToken(token)) {
            while (ops.length && ops[ops.length - 1].getPrecedence() > token.getPrecedence()) {
                yield ops.pop();
            }
            ops.push(token);
        }
        else
            yield token;
    }
    while (ops.length) {
        yield ops.pop();
    }
}

function isTruthy(val, ctx) {
    return !isFalsy(val, ctx);
}
function isFalsy(val, ctx) {
    if (ctx.opts.jsTruthy) {
        return !val;
    }
    else {
        return val === false || undefined === val || val === null;
    }
}

const defaultOperators = {
    '==': equals,
    '!=': (l, r) => !equals(l, r),
    '>': (l, r) => {
        if (isComparable(l))
            return l.gt(r);
        if (isComparable(r))
            return r.lt(l);
        return toValue(l) > toValue(r);
    },
    '<': (l, r) => {
        if (isComparable(l))
            return l.lt(r);
        if (isComparable(r))
            return r.gt(l);
        return toValue(l) < toValue(r);
    },
    '>=': (l, r) => {
        if (isComparable(l))
            return l.geq(r);
        if (isComparable(r))
            return r.leq(l);
        return toValue(l) >= toValue(r);
    },
    '<=': (l, r) => {
        if (isComparable(l))
            return l.leq(r);
        if (isComparable(r))
            return r.geq(l);
        return toValue(l) <= toValue(r);
    },
    'contains': (l, r) => {
        l = toValue(l);
        if (isArray(l))
            return l.some((i) => equals(i, r));
        if (isFunction(l === null || l === void 0 ? void 0 : l.indexOf))
            return l.indexOf(toValue(r)) > -1;
        return false;
    },
    'not': (v, ctx) => isFalsy(toValue(v), ctx),
    'and': (l, r, ctx) => isTruthy(toValue(l), ctx) && isTruthy(toValue(r), ctx),
    'or': (l, r, ctx) => isTruthy(toValue(l), ctx) || isTruthy(toValue(r), ctx)
};
function equals(lhs, rhs) {
    if (isComparable(lhs))
        return lhs.equals(rhs);
    if (isComparable(rhs))
        return rhs.equals(lhs);
    lhs = toValue(lhs);
    rhs = toValue(rhs);
    if (isArray(lhs)) {
        return isArray(rhs) && arrayEquals(lhs, rhs);
    }
    return lhs === rhs;
}
function arrayEquals(lhs, rhs) {
    if (lhs.length !== rhs.length)
        return false;
    return !lhs.some((value, i) => !equals(value, rhs[i]));
}

class Node {
    constructor(key, value, next, prev) {
        this.key = key;
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}
class LRU {
    constructor(limit, size = 0) {
        this.limit = limit;
        this.size = size;
        this.cache = {};
        this.head = new Node('HEAD', null, null, null);
        this.tail = new Node('TAIL', null, null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    write(key, value) {
        if (this.cache[key]) {
            this.cache[key].value = value;
        }
        else {
            const node = new Node(key, value, this.head.next, this.head);
            this.head.next.prev = node;
            this.head.next = node;
            this.cache[key] = node;
            this.size++;
            this.ensureLimit();
        }
    }
    read(key) {
        if (!this.cache[key])
            return;
        const { value } = this.cache[key];
        this.remove(key);
        this.write(key, value);
        return value;
    }
    remove(key) {
        const node = this.cache[key];
        node.prev.next = node.next;
        node.next.prev = node.prev;
        delete this.cache[key];
        this.size--;
    }
    clear() {
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.size = 0;
        this.cache = {};
    }
    ensureLimit() {
        if (this.size > this.limit)
            this.remove(this.tail.prev.key);
    }
}

function domResolve(root, path) {
    const base = document.createElement('base');
    base.href = root;
    const head = document.getElementsByTagName('head')[0];
    head.insertBefore(base, head.firstChild);
    const a = document.createElement('a');
    a.href = path;
    const resolved = a.href;
    head.removeChild(base);
    return resolved;
}
function resolve(root, filepath, ext) {
    if (root.length && last(root) !== '/')
        root += '/';
    const url = domResolve(root, filepath);
    return url.replace(/^(\w+:\/\/[^/]+)(\/[^?]+)/, (str, origin, path) => {
        const last = path.split('/').pop();
        if (/\.\w+$/.test(last))
            return str;
        return origin + path + ext;
    });
}
function readFile(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText);
                }
                else {
                    reject(new Error(xhr.statusText));
                }
            };
            xhr.onerror = () => {
                reject(new Error('An error occurred whilst receiving the response.'));
            };
            xhr.open('GET', url);
            xhr.send();
        });
    });
}
function readFileSync(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    if (xhr.status < 200 || xhr.status >= 300) {
        throw new Error(xhr.statusText);
    }
    return xhr.responseText;
}
function exists(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        return true;
    });
}
function existsSync(filepath) {
    return true;
}
function dirname(filepath) {
    return domResolve(filepath, '.');
}
const sep = '/';

var fs = /*#__PURE__*/Object.freeze({
  __proto__: null,
  resolve: resolve,
  readFile: readFile,
  readFileSync: readFileSync,
  exists: exists,
  existsSync: existsSync,
  dirname: dirname,
  sep: sep
});

function defaultFilter(value, defaultValue, ...args) {
    value = toValue(value);
    if (isArray(value) || isString(value))
        return value.length ? value : defaultValue;
    if (value === false && (new Map(args)).get('allow_false'))
        return false;
    return isFalsy(value, this.context) ? defaultValue : value;
}
function json(value, space = 0) {
    return JSON.stringify(value, null, space);
}
function inspect(value, space = 0) {
    const ancestors = [];
    return JSON.stringify(value, function (_key, value) {
        if (typeof value !== 'object' || value === null)
            return value;
        // `this` is the object that value is contained in, i.e., its direct parent.
        while (ancestors.length > 0 && ancestors[ancestors.length - 1] !== this)
            ancestors.pop();
        if (ancestors.includes(value))
            return '[Circular]';
        ancestors.push(value);
        return value;
    }, space);
}
function to_integer(value) {
    return Number(value);
}
const raw = {
    raw: true,
    handler: identify
};
var misc = {
    default: defaultFilter,
    raw,
    jsonify: json,
    to_integer,
    json,
    inspect
};

const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&#34;',
    "'": '&#39;'
};
const unescapeMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&#34;': '"',
    '&#39;': "'"
};
function escape(str) {
    return stringify(str).replace(/&|<|>|"|'/g, m => escapeMap[m]);
}
function xml_escape(str) {
    return escape(str);
}
function unescape(str) {
    return stringify(str).replace(/&(amp|lt|gt|#34|#39);/g, m => unescapeMap[m]);
}
function escape_once(str) {
    return escape(unescape(stringify(str)));
}
function newline_to_br(v) {
    return stringify(v).replace(/\r?\n/gm, '<br />\n');
}
function strip_html(v) {
    return stringify(v).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<.*?>|<!--[\s\S]*?-->/g, '');
}

var htmlFilters = /*#__PURE__*/Object.freeze({
  __proto__: null,
  escape: escape,
  xml_escape: xml_escape,
  escape_once: escape_once,
  newline_to_br: newline_to_br,
  strip_html: strip_html
});

const defaultOptions = {
    root: ['.'],
    layouts: ['.'],
    partials: ['.'],
    relativeReference: true,
    jekyllInclude: false,
    cache: undefined,
    extname: '',
    fs: fs,
    dynamicPartials: true,
    jsTruthy: false,
    dateFormat: '%A, %B %-e, %Y at %-l:%M %P %z',
    trimTagRight: false,
    trimTagLeft: false,
    trimOutputRight: false,
    trimOutputLeft: false,
    greedy: true,
    tagDelimiterLeft: '{%',
    tagDelimiterRight: '%}',
    outputDelimiterLeft: '{{',
    outputDelimiterRight: '}}',
    preserveTimezones: false,
    strictFilters: false,
    strictVariables: false,
    ownPropertyOnly: true,
    lenientIf: false,
    globals: {},
    keepOutputType: false,
    operators: defaultOperators
};
function normalize(options) {
    if (options.hasOwnProperty('root')) {
        if (!options.hasOwnProperty('partials'))
            options.partials = options.root;
        if (!options.hasOwnProperty('layouts'))
            options.layouts = options.root;
    }
    if (options.hasOwnProperty('cache')) {
        let cache;
        if (typeof options.cache === 'number')
            cache = options.cache > 0 ? new LRU(options.cache) : undefined;
        else if (typeof options.cache === 'object')
            cache = options.cache;
        else
            cache = options.cache ? new LRU(1024) : undefined;
        options.cache = cache;
    }
    options = Object.assign(Object.assign(Object.assign({}, defaultOptions), (options.jekyllInclude ? { dynamicPartials: false } : {})), options);
    if ((!options.fs.dirname || !options.fs.sep) && options.relativeReference) {
        console.warn('[LiquidJS] `fs.dirname` and `fs.sep` are required for relativeReference, set relativeReference to `false` to suppress this warning');
        options.relativeReference = false;
    }
    options.root = normalizeDirectoryList(options.root);
    options.partials = normalizeDirectoryList(options.partials);
    options.layouts = normalizeDirectoryList(options.layouts);
    options.outputEscape = options.outputEscape && getOutputEscapeFunction(options.outputEscape);
    return options;
}
function getOutputEscapeFunction(nameOrFunction) {
    if (nameOrFunction === 'escape')
        return escape;
    if (nameOrFunction === 'json')
        return misc.json;
    assert(isFunction(nameOrFunction), '`outputEscape` need to be of type string or function');
    return nameOrFunction;
}
function normalizeDirectoryList(value) {
    let list = [];
    if (isArray(value))
        list = value;
    if (isString(value))
        list = [value];
    return list;
}

function whiteSpaceCtrl(tokens, options) {
    let inRaw = false;
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (!isDelimitedToken(token))
            continue;
        if (!inRaw && token.trimLeft) {
            trimLeft(tokens[i - 1], options.greedy);
        }
        if (isTagToken(token)) {
            if (token.name === 'raw')
                inRaw = true;
            else if (token.name === 'endraw')
                inRaw = false;
        }
        if (!inRaw && token.trimRight) {
            trimRight(tokens[i + 1], options.greedy);
        }
    }
}
function trimLeft(token, greedy) {
    if (!token || !isHTMLToken(token))
        return;
    const mask = greedy ? BLANK : INLINE_BLANK;
    while (TYPES[token.input.charCodeAt(token.end - 1 - token.trimRight)] & mask)
        token.trimRight++;
}
function trimRight(token, greedy) {
    if (!token || !isHTMLToken(token))
        return;
    const mask = greedy ? BLANK : INLINE_BLANK;
    while (TYPES[token.input.charCodeAt(token.begin + token.trimLeft)] & mask)
        token.trimLeft++;
    if (token.input.charAt(token.begin + token.trimLeft) === '\n')
        token.trimLeft++;
}

class Tokenizer {
    constructor(input, operators = defaultOptions.operators, file, range) {
        this.input = input;
        this.file = file;
        this.rawBeginAt = -1;
        this.p = range ? range[0] : 0;
        this.N = range ? range[1] : input.length;
        this.opTrie = createTrie(operators);
        this.literalTrie = createTrie(literalValues);
    }
    readExpression() {
        return new Expression(this.readExpressionTokens());
    }
    *readExpressionTokens() {
        while (this.p < this.N) {
            const operator = this.readOperator();
            if (operator) {
                yield operator;
                continue;
            }
            const operand = this.readValue();
            if (operand) {
                yield operand;
                continue;
            }
            return;
        }
    }
    readOperator() {
        this.skipBlank();
        const end = this.matchTrie(this.opTrie);
        if (end === -1)
            return;
        return new OperatorToken(this.input, this.p, (this.p = end), this.file);
    }
    matchTrie(trie) {
        let node = trie;
        let i = this.p;
        let info;
        while (node[this.input[i]] && i < this.N) {
            node = node[this.input[i++]];
            if (node['end'])
                info = node;
        }
        if (!info)
            return -1;
        if (info['needBoundary'] && isWord(this.peek(i - this.p)))
            return -1;
        return i;
    }
    readFilteredValue() {
        const begin = this.p;
        const initial = this.readExpression();
        this.assert(initial.valid(), `invalid value expression: ${this.snapshot()}`);
        const filters = this.readFilters();
        return new FilteredValueToken(initial, filters, this.input, begin, this.p, this.file);
    }
    readFilters() {
        const filters = [];
        while (true) {
            const filter = this.readFilter();
            if (!filter)
                return filters;
            filters.push(filter);
        }
    }
    readFilter() {
        this.skipBlank();
        if (this.end())
            return null;
        this.assert(this.peek() === '|', `expected "|" before filter`);
        this.p++;
        const begin = this.p;
        const name = this.readIdentifier();
        if (!name.size()) {
            this.assert(this.end(), `expected filter name`);
            return null;
        }
        const args = [];
        this.skipBlank();
        if (this.peek() === ':') {
            do {
                ++this.p;
                const arg = this.readFilterArg();
                arg && args.push(arg);
                this.skipBlank();
                this.assert(this.end() || this.peek() === ',' || this.peek() === '|', () => `unexpected character ${this.snapshot()}`);
            } while (this.peek() === ',');
        }
        else if (this.peek() === '|' || this.end()) ;
        else {
            throw this.error('expected ":" after filter name');
        }
        return new FilterToken(name.getText(), args, this.input, begin, this.p, this.file);
    }
    readFilterArg() {
        const key = this.readValue();
        if (!key)
            return;
        this.skipBlank();
        if (this.peek() !== ':')
            return key;
        ++this.p;
        const value = this.readValue();
        return [key.getText(), value];
    }
    readTopLevelTokens(options = defaultOptions) {
        const tokens = [];
        while (this.p < this.N) {
            const token = this.readTopLevelToken(options);
            tokens.push(token);
        }
        whiteSpaceCtrl(tokens, options);
        return tokens;
    }
    readTopLevelToken(options) {
        const { tagDelimiterLeft, outputDelimiterLeft } = options;
        if (this.rawBeginAt > -1)
            return this.readEndrawOrRawContent(options);
        if (this.match(tagDelimiterLeft))
            return this.readTagToken(options);
        if (this.match(outputDelimiterLeft))
            return this.readOutputToken(options);
        return this.readHTMLToken([tagDelimiterLeft, outputDelimiterLeft]);
    }
    readHTMLToken(stopStrings) {
        const begin = this.p;
        while (this.p < this.N) {
            if (stopStrings.some(str => this.match(str)))
                break;
            ++this.p;
        }
        return new HTMLToken(this.input, begin, this.p, this.file);
    }
    readTagToken(options = defaultOptions) {
        const { file, input } = this;
        const begin = this.p;
        if (this.readToDelimiter(options.tagDelimiterRight) === -1) {
            throw this.error(`tag ${this.snapshot(begin)} not closed`, begin);
        }
        const token = new TagToken(input, begin, this.p, options, file);
        if (token.name === 'raw')
            this.rawBeginAt = begin;
        return token;
    }
    readToDelimiter(delimiter, respectQuoted = false) {
        this.skipBlank();
        while (this.p < this.N) {
            if (respectQuoted && (this.peekType() & QUOTE)) {
                this.readQuoted();
                continue;
            }
            ++this.p;
            if (this.rmatch(delimiter))
                return this.p;
        }
        return -1;
    }
    readOutputToken(options = defaultOptions) {
        const { file, input } = this;
        const { outputDelimiterRight } = options;
        const begin = this.p;
        if (this.readToDelimiter(outputDelimiterRight, true) === -1) {
            throw this.error(`output ${this.snapshot(begin)} not closed`, begin);
        }
        return new OutputToken(input, begin, this.p, options, file);
    }
    readEndrawOrRawContent(options) {
        const { tagDelimiterLeft, tagDelimiterRight } = options;
        const begin = this.p;
        let leftPos = this.readTo(tagDelimiterLeft) - tagDelimiterLeft.length;
        while (this.p < this.N) {
            if (this.readIdentifier().getText() !== 'endraw') {
                leftPos = this.readTo(tagDelimiterLeft) - tagDelimiterLeft.length;
                continue;
            }
            while (this.p <= this.N) {
                if (this.rmatch(tagDelimiterRight)) {
                    const end = this.p;
                    if (begin === leftPos) {
                        this.rawBeginAt = -1;
                        return new TagToken(this.input, begin, end, options, this.file);
                    }
                    else {
                        this.p = leftPos;
                        return new HTMLToken(this.input, begin, leftPos, this.file);
                    }
                }
                if (this.rmatch(tagDelimiterLeft))
                    break;
                this.p++;
            }
        }
        throw this.error(`raw ${this.snapshot(this.rawBeginAt)} not closed`, begin);
    }
    readLiquidTagTokens(options = defaultOptions) {
        const tokens = [];
        while (this.p < this.N) {
            const token = this.readLiquidTagToken(options);
            token && tokens.push(token);
        }
        return tokens;
    }
    readLiquidTagToken(options) {
        this.skipBlank();
        if (this.end())
            return;
        const begin = this.p;
        this.readToDelimiter('\n');
        const end = this.p;
        return new LiquidTagToken(this.input, begin, end, options, this.file);
    }
    error(msg, pos = this.p) {
        return new TokenizationError(msg, new IdentifierToken(this.input, pos, this.N, this.file));
    }
    assert(pred, msg, pos) {
        if (!pred)
            throw this.error(typeof msg === 'function' ? msg() : msg, pos);
    }
    snapshot(begin = this.p) {
        return JSON.stringify(ellipsis(this.input.slice(begin, this.N), 32));
    }
    /**
     * @deprecated use #readIdentifier instead
     */
    readWord() {
        return this.readIdentifier();
    }
    readIdentifier() {
        this.skipBlank();
        const begin = this.p;
        while (!this.end() && isWord(this.peek()))
            ++this.p;
        return new IdentifierToken(this.input, begin, this.p, this.file);
    }
    readNonEmptyIdentifier() {
        const id = this.readIdentifier();
        return id.size() ? id : undefined;
    }
    readTagName() {
        this.skipBlank();
        // Handle inline comment tags
        if (this.input[this.p] === '#')
            return this.input.slice(this.p, ++this.p);
        return this.readIdentifier().getText();
    }
    readHashes(jekyllStyle) {
        const hashes = [];
        while (true) {
            const hash = this.readHash(jekyllStyle);
            if (!hash)
                return hashes;
            hashes.push(hash);
        }
    }
    readHash(jekyllStyle) {
        this.skipBlank();
        if (this.peek() === ',')
            ++this.p;
        const begin = this.p;
        const name = this.readNonEmptyIdentifier();
        if (!name)
            return;
        let value;
        this.skipBlank();
        const sep = jekyllStyle ? '=' : ':';
        if (this.peek() === sep) {
            ++this.p;
            value = this.readValue();
        }
        return new HashToken(this.input, begin, this.p, name, value, this.file);
    }
    remaining() {
        return this.input.slice(this.p, this.N);
    }
    advance(step = 1) {
        this.p += step;
    }
    end() {
        return this.p >= this.N;
    }
    readTo(end) {
        while (this.p < this.N) {
            ++this.p;
            if (this.rmatch(end))
                return this.p;
        }
        return -1;
    }
    readValue() {
        this.skipBlank();
        const begin = this.p;
        const variable = this.readLiteral() || this.readQuoted() || this.readRange() || this.readNumber();
        const props = this.readProperties(!variable);
        if (!props.length)
            return variable;
        return new PropertyAccessToken(variable, props, this.input, begin, this.p);
    }
    readScopeValue() {
        this.skipBlank();
        const begin = this.p;
        const props = this.readProperties();
        if (!props.length)
            return undefined;
        return new PropertyAccessToken(undefined, props, this.input, begin, this.p);
    }
    readProperties(isBegin = true) {
        const props = [];
        while (true) {
            if (this.peek() === '[') {
                this.p++;
                const prop = this.readValue() || new IdentifierToken(this.input, this.p, this.p, this.file);
                this.assert(this.readTo(']') !== -1, '[ not closed');
                props.push(prop);
                continue;
            }
            if (isBegin && !props.length) {
                const prop = this.readNonEmptyIdentifier();
                if (prop) {
                    props.push(prop);
                    continue;
                }
            }
            if (this.peek() === '.' && this.peek(1) !== '.') { // skip range syntax
                this.p++;
                const prop = this.readNonEmptyIdentifier();
                if (!prop)
                    break;
                props.push(prop);
                continue;
            }
            break;
        }
        return props;
    }
    readNumber() {
        this.skipBlank();
        let decimalFound = false;
        let digitFound = false;
        let n = 0;
        if (this.peekType() & SIGN)
            n++;
        while (this.p + n <= this.N) {
            if (this.peekType(n) & NUMBER) {
                digitFound = true;
                n++;
            }
            else if (this.peek(n) === '.' && this.peek(n + 1) !== '.') {
                if (decimalFound || !digitFound)
                    return;
                decimalFound = true;
                n++;
            }
            else
                break;
        }
        if (digitFound && !isWord(this.peek(n))) {
            const num = new NumberToken(this.input, this.p, this.p + n, this.file);
            this.advance(n);
            return num;
        }
    }
    readLiteral() {
        this.skipBlank();
        const end = this.matchTrie(this.literalTrie);
        if (end === -1)
            return;
        const literal = new LiteralToken(this.input, this.p, end, this.file);
        this.p = end;
        return literal;
    }
    readRange() {
        this.skipBlank();
        const begin = this.p;
        if (this.peek() !== '(')
            return;
        ++this.p;
        const lhs = this.readValueOrThrow();
        this.p += 2;
        const rhs = this.readValueOrThrow();
        ++this.p;
        return new RangeToken(this.input, begin, this.p, lhs, rhs, this.file);
    }
    readValueOrThrow() {
        const value = this.readValue();
        this.assert(value, () => `unexpected token ${this.snapshot()}, value expected`);
        return value;
    }
    readQuoted() {
        this.skipBlank();
        const begin = this.p;
        if (!(this.peekType() & QUOTE))
            return;
        ++this.p;
        let escaped = false;
        while (this.p < this.N) {
            ++this.p;
            if (this.input[this.p - 1] === this.input[begin] && !escaped)
                break;
            if (escaped)
                escaped = false;
            else if (this.input[this.p - 1] === '\\')
                escaped = true;
        }
        return new QuotedToken(this.input, begin, this.p, this.file);
    }
    *readFileNameTemplate(options) {
        const { outputDelimiterLeft } = options;
        const htmlStopStrings = [',', ' ', outputDelimiterLeft];
        const htmlStopStringSet = new Set(htmlStopStrings);
        // break on ',' and ' ', outputDelimiterLeft only stops HTML token
        while (this.p < this.N && !htmlStopStringSet.has(this.peek())) {
            yield this.match(outputDelimiterLeft)
                ? this.readOutputToken(options)
                : this.readHTMLToken(htmlStopStrings);
        }
    }
    match(word) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] !== this.input[this.p + i])
                return false;
        }
        return true;
    }
    rmatch(pattern) {
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[pattern.length - 1 - i] !== this.input[this.p - 1 - i])
                return false;
        }
        return true;
    }
    peekType(n = 0) {
        return this.p + n >= this.N ? 0 : TYPES[this.input.charCodeAt(this.p + n)];
    }
    peek(n = 0) {
        return this.p + n >= this.N ? '' : this.input[this.p + n];
    }
    skipBlank() {
        while (this.peekType() & BLANK)
            ++this.p;
    }
}

class ParseStream {
    constructor(tokens, parseToken) {
        this.handlers = {};
        this.stopRequested = false;
        this.tokens = tokens;
        this.parseToken = parseToken;
    }
    on(name, cb) {
        this.handlers[name] = cb;
        return this;
    }
    trigger(event, arg) {
        const h = this.handlers[event];
        return h ? (h.call(this, arg), true) : false;
    }
    start() {
        this.trigger('start');
        let token;
        while (!this.stopRequested && (token = this.tokens.shift())) {
            if (this.trigger('token', token))
                continue;
            if (isTagToken(token) && this.trigger(`tag:${token.name}`, token)) {
                continue;
            }
            const template = this.parseToken(token, this.tokens);
            this.trigger('template', template);
        }
        if (!this.stopRequested)
            this.trigger('end');
        return this;
    }
    stop() {
        this.stopRequested = true;
        return this;
    }
}

class TemplateImpl {
    constructor(token) {
        this.token = token;
    }
}

class Tag extends TemplateImpl {
    constructor(token, remainTokens, liquid) {
        super(token);
        this.name = token.name;
        this.liquid = liquid;
        this.tokenizer = token.tokenizer;
    }
}

/**
 * Key-Value Pairs Representing Tag Arguments
 * Example:
 *    For the markup `, foo:'bar', coo:2 reversed %}`,
 *    hash['foo'] === 'bar'
 *    hash['coo'] === 2
 *    hash['reversed'] === undefined
 */
class Hash {
    constructor(markup, jekyllStyle) {
        this.hash = {};
        const tokenizer = new Tokenizer(markup, {});
        for (const hash of tokenizer.readHashes(jekyllStyle)) {
            this.hash[hash.name.content] = hash.value;
        }
    }
    *render(ctx) {
        const hash = {};
        for (const key of Object.keys(this.hash)) {
            hash[key] = this.hash[key] === undefined ? true : yield evalToken(this.hash[key], ctx);
        }
        return hash;
    }
}

function createTagClass(options) {
    return class extends Tag {
        constructor(token, tokens, liquid) {
            super(token, tokens, liquid);
            if (isFunction(options.parse)) {
                options.parse.call(this, token, tokens);
            }
        }
        *render(ctx, emitter) {
            const hash = (yield new Hash(this.token.args).render(ctx));
            return yield options.render.call(this, ctx, emitter, hash);
        }
    };
}

function isKeyValuePair(arr) {
    return isArray(arr);
}

class Filter {
    constructor(name, options, args, liquid) {
        this.name = name;
        this.handler = isFunction(options)
            ? options
            : (isFunction(options === null || options === void 0 ? void 0 : options.handler) ? options.handler : identify);
        this.raw = !isFunction(options) && !!(options === null || options === void 0 ? void 0 : options.raw);
        this.args = args;
        this.liquid = liquid;
    }
    *render(value, context) {
        const argv = [];
        for (const arg of this.args) {
            if (isKeyValuePair(arg))
                argv.push([arg[0], yield evalToken(arg[1], context)]);
            else
                argv.push(yield evalToken(arg, context));
        }
        return yield this.handler.apply({ context, liquid: this.liquid }, [value, ...argv]);
    }
}

class Value {
    /**
     * @param str the value to be valuated, eg.: "foobar" | truncate: 3
     */
    constructor(input, liquid) {
        this.filters = [];
        const token = typeof input === 'string'
            ? new Tokenizer(input, liquid.options.operators).readFilteredValue()
            : input;
        this.initial = token.initial;
        this.filters = token.filters.map(({ name, args }) => new Filter(name, this.getFilter(liquid, name), args, liquid));
    }
    *value(ctx, lenient) {
        lenient = lenient || (ctx.opts.lenientIf && this.filters.length > 0 && this.filters[0].name === 'default');
        let val = yield this.initial.evaluate(ctx, lenient);
        for (const filter of this.filters) {
            val = yield filter.render(val, ctx);
        }
        return val;
    }
    getFilter(liquid, name) {
        const impl = liquid.filters[name];
        assert(impl || !liquid.options.strictFilters, () => `undefined filter: ${name}`);
        return impl;
    }
}

class Output extends TemplateImpl {
    constructor(token, liquid) {
        var _a;
        super(token);
        const tokenizer = new Tokenizer(token.input, liquid.options.operators, token.file, token.contentRange);
        this.value = new Value(tokenizer.readFilteredValue(), liquid);
        const filters = this.value.filters;
        const outputEscape = liquid.options.outputEscape;
        if (!((_a = filters[filters.length - 1]) === null || _a === void 0 ? void 0 : _a.raw) && outputEscape) {
            filters.push(new Filter(toString.call(outputEscape), outputEscape, [], liquid));
        }
    }
    *render(ctx, emitter) {
        const val = yield this.value.value(ctx, false);
        emitter.write(val);
    }
}

class HTML extends TemplateImpl {
    constructor(token) {
        super(token);
        this.str = token.getContent();
    }
    *render(ctx, emitter) {
        emitter.write(this.str);
    }
}

var LookupType;
(function (LookupType) {
    LookupType["Partials"] = "partials";
    LookupType["Layouts"] = "layouts";
    LookupType["Root"] = "root";
})(LookupType || (LookupType = {}));
class Loader {
    constructor(options) {
        this.options = options;
        if (options.relativeReference) {
            const sep = options.fs.sep;
            assert(sep, '`fs.sep` is required for relative reference');
            const rRelativePath = new RegExp(['.' + sep, '..' + sep, './', '../'].map(prefix => escapeRegex(prefix)).join('|'));
            this.shouldLoadRelative = (referencedFile) => rRelativePath.test(referencedFile);
        }
        else {
            this.shouldLoadRelative = (referencedFile) => false;
        }
        this.contains = this.options.fs.contains || (() => true);
    }
    *lookup(file, type, sync, currentFile) {
        const { fs } = this.options;
        const dirs = this.options[type];
        for (const filepath of this.candidates(file, dirs, currentFile, type !== LookupType.Root)) {
            if (sync ? fs.existsSync(filepath) : yield fs.exists(filepath))
                return filepath;
        }
        throw this.lookupError(file, dirs);
    }
    *candidates(file, dirs, currentFile, enforceRoot) {
        const { fs, extname } = this.options;
        if (this.shouldLoadRelative(file) && currentFile) {
            const referenced = fs.resolve(this.dirname(currentFile), file, extname);
            for (const dir of dirs) {
                if (!enforceRoot || this.contains(dir, referenced)) {
                    // the relatively referenced file is within one of root dirs
                    yield referenced;
                    break;
                }
            }
        }
        for (const dir of dirs) {
            const referenced = fs.resolve(dir, file, extname);
            if (!enforceRoot || this.contains(dir, referenced)) {
                yield referenced;
            }
        }
        if (fs.fallback !== undefined) {
            const filepath = fs.fallback(file);
            if (filepath !== undefined)
                yield filepath;
        }
    }
    dirname(path) {
        const fs = this.options.fs;
        assert(fs.dirname, '`fs.dirname` is required for relative reference');
        return fs.dirname(path);
    }
    lookupError(file, roots) {
        const err = new Error('ENOENT');
        err.message = `ENOENT: Failed to lookup "${file}" in "${roots}"`;
        err.code = 'ENOENT';
        return err;
    }
}

class Parser {
    constructor(liquid) {
        this.liquid = liquid;
        this.cache = this.liquid.options.cache;
        this.fs = this.liquid.options.fs;
        this.parseFile = this.cache ? this._parseFileCached : this._parseFile;
        this.loader = new Loader(this.liquid.options);
    }
    parse(html, filepath) {
        const tokenizer = new Tokenizer(html, this.liquid.options.operators, filepath);
        const tokens = tokenizer.readTopLevelTokens(this.liquid.options);
        return this.parseTokens(tokens);
    }
    parseTokens(tokens) {
        let token;
        const templates = [];
        while ((token = tokens.shift())) {
            templates.push(this.parseToken(token, tokens));
        }
        return templates;
    }
    parseToken(token, remainTokens) {
        try {
            if (isTagToken(token)) {
                const TagClass = this.liquid.tags[token.name];
                assert(TagClass, `tag "${token.name}" not found`);
                return new TagClass(token, remainTokens, this.liquid);
            }
            if (isOutputToken(token)) {
                return new Output(token, this.liquid);
            }
            return new HTML(token);
        }
        catch (e) {
            if (LiquidError.is(e))
                throw e;
            throw new ParseError(e, token);
        }
    }
    parseStream(tokens) {
        return new ParseStream(tokens, (token, tokens) => this.parseToken(token, tokens));
    }
    *_parseFileCached(file, sync, type = LookupType.Root, currentFile) {
        const cache = this.cache;
        const key = this.loader.shouldLoadRelative(file) ? currentFile + ',' + file : type + ':' + file;
        const tpls = yield cache.read(key);
        if (tpls)
            return tpls;
        const task = this._parseFile(file, sync, type, currentFile);
        // sync mode: exec the task and cache the result
        // async mode: cache the task before exec
        const taskOrTpl = sync ? yield task : toPromise(task);
        cache.write(key, taskOrTpl);
        // note: concurrent tasks will be reused, cache for failed task is removed until its end
        try {
            return yield taskOrTpl;
        }
        catch (err) {
            cache.remove(key);
            throw err;
        }
    }
    *_parseFile(file, sync, type = LookupType.Root, currentFile) {
        const filepath = yield this.loader.lookup(file, type, sync, currentFile);
        return this.liquid.parse(sync ? this.fs.readFileSync(filepath) : yield this.fs.readFile(filepath), filepath);
    }
}

var TokenKind;
(function (TokenKind) {
    TokenKind[TokenKind["Number"] = 1] = "Number";
    TokenKind[TokenKind["Literal"] = 2] = "Literal";
    TokenKind[TokenKind["Tag"] = 4] = "Tag";
    TokenKind[TokenKind["Output"] = 8] = "Output";
    TokenKind[TokenKind["HTML"] = 16] = "HTML";
    TokenKind[TokenKind["Filter"] = 32] = "Filter";
    TokenKind[TokenKind["Hash"] = 64] = "Hash";
    TokenKind[TokenKind["PropertyAccess"] = 128] = "PropertyAccess";
    TokenKind[TokenKind["Word"] = 256] = "Word";
    TokenKind[TokenKind["Range"] = 512] = "Range";
    TokenKind[TokenKind["Quoted"] = 1024] = "Quoted";
    TokenKind[TokenKind["Operator"] = 2048] = "Operator";
    TokenKind[TokenKind["FilteredValue"] = 4096] = "FilteredValue";
    TokenKind[TokenKind["Delimited"] = 12] = "Delimited";
})(TokenKind || (TokenKind = {}));

function isDelimitedToken(val) {
    return !!(getKind(val) & TokenKind.Delimited);
}
function isOperatorToken(val) {
    return getKind(val) === TokenKind.Operator;
}
function isHTMLToken(val) {
    return getKind(val) === TokenKind.HTML;
}
function isOutputToken(val) {
    return getKind(val) === TokenKind.Output;
}
function isTagToken(val) {
    return getKind(val) === TokenKind.Tag;
}
function isQuotedToken(val) {
    return getKind(val) === TokenKind.Quoted;
}
function isLiteralToken(val) {
    return getKind(val) === TokenKind.Literal;
}
function isNumberToken(val) {
    return getKind(val) === TokenKind.Number;
}
function isPropertyAccessToken(val) {
    return getKind(val) === TokenKind.PropertyAccess;
}
function isWordToken(val) {
    return getKind(val) === TokenKind.Word;
}
function isRangeToken(val) {
    return getKind(val) === TokenKind.Range;
}
function getKind(val) {
    return val ? val.kind : -1;
}

var typeGuards = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isDelimitedToken: isDelimitedToken,
  isOperatorToken: isOperatorToken,
  isHTMLToken: isHTMLToken,
  isOutputToken: isOutputToken,
  isTagToken: isTagToken,
  isQuotedToken: isQuotedToken,
  isLiteralToken: isLiteralToken,
  isNumberToken: isNumberToken,
  isPropertyAccessToken: isPropertyAccessToken,
  isWordToken: isWordToken,
  isRangeToken: isRangeToken
});

class Context {
    constructor(env = {}, opts = defaultOptions, renderOptions = {}) {
        var _a, _b, _c;
        /**
         * insert a Context-level empty scope,
         * for tags like `{% capture %}` `{% assign %}` to operate
         */
        this.scopes = [{}];
        this.registers = {};
        this.sync = !!renderOptions.sync;
        this.opts = opts;
        this.globals = (_a = renderOptions.globals) !== null && _a !== void 0 ? _a : opts.globals;
        this.environments = isObject(env) ? env : Object(env);
        this.strictVariables = (_b = renderOptions.strictVariables) !== null && _b !== void 0 ? _b : this.opts.strictVariables;
        this.ownPropertyOnly = (_c = renderOptions.ownPropertyOnly) !== null && _c !== void 0 ? _c : opts.ownPropertyOnly;
    }
    getRegister(key) {
        return (this.registers[key] = this.registers[key] || {});
    }
    setRegister(key, value) {
        return (this.registers[key] = value);
    }
    saveRegister(...keys) {
        return keys.map(key => [key, this.getRegister(key)]);
    }
    restoreRegister(keyValues) {
        return keyValues.forEach(([key, value]) => this.setRegister(key, value));
    }
    getAll() {
        return [this.globals, this.environments, ...this.scopes]
            .reduce((ctx, val) => __assign(ctx, val), {});
    }
    /**
     * @deprecated use `_get()` or `getSync()` instead
     */
    get(paths) {
        return this.getSync(paths);
    }
    getSync(paths) {
        return toValueSync(this._get(paths));
    }
    *_get(paths) {
        const scope = this.findScope(paths[0]);
        return yield this._getFromScope(scope, paths);
    }
    /**
     * @deprecated use `_get()` instead
     */
    getFromScope(scope, paths) {
        return toValueSync(this._getFromScope(scope, paths));
    }
    *_getFromScope(scope, paths, strictVariables = this.strictVariables) {
        if (isString(paths))
            paths = paths.split('.');
        for (let i = 0; i < paths.length; i++) {
            scope = yield readProperty(scope, paths[i], this.ownPropertyOnly);
            if (strictVariables && isUndefined(scope)) {
                throw new InternalUndefinedVariableError(paths.slice(0, i + 1).join('.'));
            }
        }
        return scope;
    }
    push(ctx) {
        return this.scopes.push(ctx);
    }
    pop() {
        return this.scopes.pop();
    }
    bottom() {
        return this.scopes[0];
    }
    findScope(key) {
        for (let i = this.scopes.length - 1; i >= 0; i--) {
            const candidate = this.scopes[i];
            if (key in candidate)
                return candidate;
        }
        if (key in this.environments)
            return this.environments;
        return this.globals;
    }
}
function readProperty(obj, key, ownPropertyOnly) {
    obj = toLiquid(obj);
    if (isNil(obj))
        return obj;
    if (isArray(obj) && key < 0)
        return obj[obj.length + +key];
    const value = readJSProperty(obj, key, ownPropertyOnly);
    if (value === undefined && obj instanceof Drop)
        return obj.liquidMethodMissing(key);
    if (isFunction(value))
        return value.call(obj);
    if (key === 'size')
        return readSize(obj);
    else if (key === 'first')
        return readFirst(obj);
    else if (key === 'last')
        return readLast(obj);
    return value;
}
function readJSProperty(obj, key, ownPropertyOnly) {
    if (ownPropertyOnly && !Object.hasOwnProperty.call(obj, key) && !(obj instanceof Drop))
        return undefined;
    return obj[key];
}
function readFirst(obj) {
    if (isArray(obj))
        return obj[0];
    return obj['first'];
}
function readLast(obj) {
    if (isArray(obj))
        return obj[obj.length - 1];
    return obj['last'];
}
function readSize(obj) {
    if (obj.hasOwnProperty('size') || obj['size'] !== undefined)
        return obj['size'];
    if (isArray(obj) || isString(obj))
        return obj.length;
    if (typeof obj === 'object')
        return Object.keys(obj).length;
}

var BlockMode;
(function (BlockMode) {
    /* store rendered html into blocks */
    BlockMode[BlockMode["OUTPUT"] = 0] = "OUTPUT";
    /* output rendered html directly */
    BlockMode[BlockMode["STORE"] = 1] = "STORE";
})(BlockMode || (BlockMode = {}));

const abs = argumentsToValue(Math.abs);
const at_least = argumentsToValue(Math.max);
const at_most = argumentsToValue(Math.min);
const ceil = argumentsToValue(Math.ceil);
const divided_by = argumentsToValue((dividend, divisor, integerArithmetic = false) => integerArithmetic ? Math.floor(dividend / divisor) : dividend / divisor);
const floor = argumentsToValue(Math.floor);
const minus = argumentsToValue((v, arg) => v - arg);
const modulo = argumentsToValue((v, arg) => v % arg);
const times = argumentsToValue((v, arg) => v * arg);
function round(v, arg = 0) {
    v = toValue(v);
    arg = toValue(arg);
    const amp = Math.pow(10, arg);
    return Math.round(v * amp) / amp;
}
function plus(v, arg) {
    v = toValue(v);
    arg = toValue(arg);
    return Number(v) + Number(arg);
}

var mathFilters = /*#__PURE__*/Object.freeze({
  __proto__: null,
  abs: abs,
  at_least: at_least,
  at_most: at_most,
  ceil: ceil,
  divided_by: divided_by,
  floor: floor,
  minus: minus,
  modulo: modulo,
  times: times,
  round: round,
  plus: plus
});

const url_decode = (x) => decodeURIComponent(stringify(x)).replace(/\+/g, ' ');
const url_encode = (x) => encodeURIComponent(stringify(x)).replace(/%20/g, '+');
const cgi_escape = (x) => encodeURIComponent(stringify(x))
    .replace(/%20/g, '+')
    .replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
const uri_escape = (x) => encodeURI(stringify(x))
    .replace(/%5B/g, '[')
    .replace(/%5D/g, ']');
const rSlugifyDefault = /[^\p{M}\p{L}\p{Nd}]+/ug;
const rSlugifyReplacers = {
    'raw': /\s+/g,
    'default': rSlugifyDefault,
    'pretty': /[^\p{M}\p{L}\p{Nd}._~!$&'()+,;=@]+/ug,
    'ascii': /[^A-Za-z0-9]+/g,
    'latin': rSlugifyDefault,
    'none': null
};
function slugify(str, mode = 'default', cased = false) {
    str = stringify(str);
    const replacer = rSlugifyReplacers[mode];
    if (replacer) {
        if (mode === 'latin')
            str = removeAccents(str);
        str = str.replace(replacer, '-').replace(/^-|-$/g, '');
    }
    return cased ? str : str.toLowerCase();
}
function removeAccents(str) {
    return str.replace(/[àáâãäå]/g, 'a')
        .replace(/[æ]/g, 'ae')
        .replace(/[ç]/g, 'c')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/[ð]/g, 'd')
        .replace(/[ñ]/g, 'n')
        .replace(/[òóôõöø]/g, 'o')
        .replace(/[ùúûü]/g, 'u')
        .replace(/[ýÿ]/g, 'y')
        .replace(/[ß]/g, 'ss')
        .replace(/[œ]/g, 'oe')
        .replace(/[þ]/g, 'th')
        .replace(/[ẞ]/g, 'SS')
        .replace(/[Œ]/g, 'OE')
        .replace(/[Þ]/g, 'TH');
}

var urlFilters = /*#__PURE__*/Object.freeze({
  __proto__: null,
  url_decode: url_decode,
  url_encode: url_encode,
  cgi_escape: cgi_escape,
  uri_escape: uri_escape,
  slugify: slugify
});

const join = argumentsToValue((v, arg) => toArray(v).join(arg === undefined ? ' ' : arg));
const last$1 = argumentsToValue((v) => isArray(v) ? last(v) : '');
const first = argumentsToValue((v) => isArray(v) ? v[0] : '');
const reverse = argumentsToValue((v) => [...toArray(v)].reverse());
function* sort(arr, property) {
    const values = [];
    for (const item of toArray(arr)) {
        values.push([
            item,
            property ? yield this.context._getFromScope(item, stringify(property).split('.'), false) : item
        ]);
    }
    return values.sort((lhs, rhs) => {
        const lvalue = lhs[1];
        const rvalue = rhs[1];
        return lvalue < rvalue ? -1 : (lvalue > rvalue ? 1 : 0);
    }).map(tuple => tuple[0]);
}
function sort_natural(input, property) {
    const propertyString = stringify(property);
    const compare = property === undefined
        ? caseInsensitiveCompare
        : (lhs, rhs) => caseInsensitiveCompare(lhs[propertyString], rhs[propertyString]);
    return [...toArray(input)].sort(compare);
}
const size = (v) => (v && v.length) || 0;
function* map(arr, property) {
    const results = [];
    for (const item of toArray(arr)) {
        results.push(yield this.context._getFromScope(item, stringify(property), false));
    }
    return results;
}
function* sum(arr, property) {
    let sum = 0;
    for (const item of toArray(arr)) {
        const data = Number(property ? yield this.context._getFromScope(item, stringify(property), false) : item);
        sum += Number.isNaN(data) ? 0 : data;
    }
    return sum;
}
function compact(arr) {
    return toArray(arr).filter(x => !isNil(toValue(x)));
}
function concat(v, arg = []) {
    return toArray(v).concat(toArray(arg));
}
function push(v, arg) {
    return concat(v, [arg]);
}
function unshift(v, arg) {
    const clone = [...toArray(v)];
    clone.unshift(arg);
    return clone;
}
function pop(v) {
    const clone = [...toArray(v)];
    clone.pop();
    return clone;
}
function shift(v) {
    const clone = [...toArray(v)];
    clone.shift();
    return clone;
}
function slice(v, begin, length = 1) {
    v = toValue(v);
    if (isNil(v))
        return [];
    if (!isArray(v))
        v = stringify(v);
    begin = begin < 0 ? v.length + begin : begin;
    return v.slice(begin, begin + length);
}
function* where(arr, property, expected) {
    const values = [];
    arr = toArray(arr);
    const token = new Tokenizer(stringify(property)).readScopeValue();
    for (const item of arr) {
        values.push(yield evalToken(token, new Context(item)));
    }
    return arr.filter((_, i) => {
        if (expected === undefined)
            return isTruthy(values[i], this.context);
        return equals(values[i], expected);
    });
}
function* where_exp(arr, itemName, exp) {
    const filtered = [];
    const keyTemplate = new Value(stringify(exp), this.liquid);
    for (const item of toArray(arr)) {
        const value = yield keyTemplate.value(new Context({ [itemName]: item }));
        if (value)
            filtered.push(item);
    }
    return filtered;
}
function* group_by(arr, property) {
    const map = new Map();
    arr = toArray(arr);
    const token = new Tokenizer(stringify(property)).readScopeValue();
    for (const item of arr) {
        const key = yield evalToken(token, new Context(item));
        if (!map.has(key))
            map.set(key, []);
        map.get(key).push(item);
    }
    return [...map.entries()].map(([name, items]) => ({ name, items }));
}
function* group_by_exp(arr, itemName, exp) {
    const map = new Map();
    const keyTemplate = new Value(stringify(exp), this.liquid);
    for (const item of toArray(arr)) {
        const key = yield keyTemplate.value(new Context({ [itemName]: item }));
        if (!map.has(key))
            map.set(key, []);
        map.get(key).push(item);
    }
    return [...map.entries()].map(([name, items]) => ({ name, items }));
}
function* find(arr, property, expected) {
    const token = new Tokenizer(stringify(property)).readScopeValue();
    for (const item of toArray(arr)) {
        const value = yield evalToken(token, new Context(item));
        if (equals(value, expected))
            return item;
    }
    return null;
}
function* find_exp(arr, itemName, exp) {
    const predicate = new Value(stringify(exp), this.liquid);
    for (const item of toArray(arr)) {
        const value = yield predicate.value(new Context({ [itemName]: item }));
        if (value)
            return item;
    }
    return null;
}
function uniq(arr) {
    arr = toValue(arr);
    const u = {};
    return (arr || []).filter(val => {
        if (hasOwnProperty.call(u, String(val)))
            return false;
        u[String(val)] = true;
        return true;
    });
}
function sample(v, count = 1) {
    v = toValue(v);
    if (isNil(v))
        return [];
    if (!isArray(v))
        v = stringify(v);
    const shuffled = [...v].sort(() => Math.random() - 0.5);
    if (count === 1)
        return shuffled[0];
    return shuffled.slice(0, count);
}

var arrayFilters = /*#__PURE__*/Object.freeze({
  __proto__: null,
  join: join,
  last: last$1,
  first: first,
  reverse: reverse,
  sort: sort,
  sort_natural: sort_natural,
  size: size,
  map: map,
  sum: sum,
  compact: compact,
  concat: concat,
  push: push,
  unshift: unshift,
  pop: pop,
  shift: shift,
  slice: slice,
  where: where,
  where_exp: where_exp,
  group_by: group_by,
  group_by_exp: group_by_exp,
  find: find,
  find_exp: find_exp,
  uniq: uniq,
  sample: sample
});

function date(v, format, timezoneOffset) {
    const date = parseDate(v, this.context.opts, timezoneOffset);
    if (!date)
        return v;
    format = toValue(format);
    format = isNil(format) ? this.context.opts.dateFormat : stringify(format);
    return strftime(date, format);
}
function date_to_xmlschema(v) {
    return date.call(this, v, '%Y-%m-%dT%H:%M:%S%:z');
}
function date_to_rfc822(v) {
    return date.call(this, v, '%a, %d %b %Y %H:%M:%S %z');
}
function date_to_string(v, type, style) {
    return stringify_date.call(this, v, '%b', type, style);
}
function date_to_long_string(v, type, style) {
    return stringify_date.call(this, v, '%B', type, style);
}
function stringify_date(v, month_type, type, style) {
    const date = parseDate(v, this.context.opts);
    if (!date)
        return v;
    if (type === 'ordinal') {
        const d = date.getDate();
        return style === 'US'
            ? strftime(date, `${month_type} ${d}%q, %Y`)
            : strftime(date, `${d}%q ${month_type} %Y`);
    }
    return strftime(date, `%d ${month_type} %Y`);
}
function parseDate(v, opts, timezoneOffset) {
    let date;
    v = toValue(v);
    if (v === 'now' || v === 'today') {
        date = new Date();
    }
    else if (isNumber(v)) {
        date = new Date(v * 1000);
    }
    else if (isString(v)) {
        if (/^\d+$/.test(v)) {
            date = new Date(+v * 1000);
        }
        else if (opts.preserveTimezones) {
            date = TimezoneDate.createDateFixedToTimezone(v);
        }
        else {
            date = new Date(v);
        }
    }
    else {
        date = v;
    }
    if (!isValidDate(date))
        return;
    if (timezoneOffset !== undefined) {
        date = new TimezoneDate(date, timezoneOffset);
    }
    else if (!(date instanceof TimezoneDate) && opts.timezoneOffset !== undefined) {
        date = new TimezoneDate(date, opts.timezoneOffset);
    }
    return date;
}
function isValidDate(date) {
    return (date instanceof Date || date instanceof TimezoneDate) && !isNaN(date.getTime());
}

var dateFilters = /*#__PURE__*/Object.freeze({
  __proto__: null,
  date: date,
  date_to_xmlschema: date_to_xmlschema,
  date_to_rfc822: date_to_rfc822,
  date_to_string: date_to_string,
  date_to_long_string: date_to_long_string
});

/**
 * String related filters
 *
 * * prefer stringify() to String() since `undefined`, `null` should eval ''
 */
const rCJKWord = /[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/gu;
// Word boundary followed by word characters (for detecting words)
const rNonCJKWord = /[^\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF\s]+/gu;
function append(v, arg) {
    assert(arguments.length === 2, 'append expect 2 arguments');
    return stringify(v) + stringify(arg);
}
function prepend(v, arg) {
    assert(arguments.length === 2, 'prepend expect 2 arguments');
    return stringify(arg) + stringify(v);
}
function lstrip(v, chars) {
    if (chars) {
        chars = escapeRegExp(stringify(chars));
        return stringify(v).replace(new RegExp(`^[${chars}]+`, 'g'), '');
    }
    return stringify(v).replace(/^\s+/, '');
}
function downcase(v) {
    return stringify(v).toLowerCase();
}
function upcase(str) {
    return stringify(str).toUpperCase();
}
function remove(v, arg) {
    return stringify(v).split(stringify(arg)).join('');
}
function remove_first(v, l) {
    return stringify(v).replace(stringify(l), '');
}
function remove_last(v, l) {
    const str = stringify(v);
    const pattern = stringify(l);
    const index = str.lastIndexOf(pattern);
    if (index === -1)
        return str;
    return str.substring(0, index) + str.substring(index + pattern.length);
}
function rstrip(str, chars) {
    if (chars) {
        chars = escapeRegExp(stringify(chars));
        return stringify(str).replace(new RegExp(`[${chars}]+$`, 'g'), '');
    }
    return stringify(str).replace(/\s+$/, '');
}
function split(v, arg) {
    const arr = stringify(v).split(stringify(arg));
    // align to ruby split, which is the behavior of shopify/liquid
    // see: https://ruby-doc.org/core-2.4.0/String.html#method-i-split
    while (arr.length && arr[arr.length - 1] === '')
        arr.pop();
    return arr;
}
function strip(v, chars) {
    if (chars) {
        chars = escapeRegExp(stringify(chars));
        return stringify(v)
            .replace(new RegExp(`^[${chars}]+`, 'g'), '')
            .replace(new RegExp(`[${chars}]+$`, 'g'), '');
    }
    return stringify(v).trim();
}
function strip_newlines(v) {
    return stringify(v).replace(/\r?\n/gm, '');
}
function capitalize(str) {
    str = stringify(str);
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function replace(v, pattern, replacement) {
    return stringify(v).split(stringify(pattern)).join(replacement);
}
function replace_first(v, arg1, arg2) {
    return stringify(v).replace(stringify(arg1), arg2);
}
function replace_last(v, arg1, arg2) {
    const str = stringify(v);
    const pattern = stringify(arg1);
    const index = str.lastIndexOf(pattern);
    if (index === -1)
        return str;
    const replacement = stringify(arg2);
    return str.substring(0, index) + replacement + str.substring(index + pattern.length);
}
function truncate(v, l = 50, o = '...') {
    v = stringify(v);
    if (v.length <= l)
        return v;
    return v.substring(0, l - o.length) + o;
}
function truncatewords(v, words = 15, o = '...') {
    const arr = stringify(v).split(/\s+/);
    if (words <= 0)
        words = 1;
    let ret = arr.slice(0, words).join(' ');
    if (arr.length >= words)
        ret += o;
    return ret;
}
function normalize_whitespace(v) {
    v = stringify(v);
    return v.replace(/\s+/g, ' ');
}
function number_of_words(input, mode) {
    input = stringify(input).trim();
    if (!input)
        return 0;
    switch (mode) {
        case 'cjk':
            // Count CJK characters and words
            return (input.match(rCJKWord) || []).length + (input.match(rNonCJKWord) || []).length;
        case 'auto':
            // Count CJK characters, if none, count words
            return rCJKWord.test(input)
                ? input.match(rCJKWord).length + (input.match(rNonCJKWord) || []).length
                : input.split(/\s+/).length;
        default:
            // Count words only
            return input.split(/\s+/).length;
    }
}
function array_to_sentence_string(array, connector = 'and') {
    switch (array.length) {
        case 0:
            return '';
        case 1:
            return array[0];
        case 2:
            return `${array[0]} ${connector} ${array[1]}`;
        default:
            return `${array.slice(0, -1).join(', ')}, ${connector} ${array[array.length - 1]}`;
    }
}

var stringFilters = /*#__PURE__*/Object.freeze({
  __proto__: null,
  append: append,
  prepend: prepend,
  lstrip: lstrip,
  downcase: downcase,
  upcase: upcase,
  remove: remove,
  remove_first: remove_first,
  remove_last: remove_last,
  rstrip: rstrip,
  split: split,
  strip: strip,
  strip_newlines: strip_newlines,
  capitalize: capitalize,
  replace: replace,
  replace_first: replace_first,
  replace_last: replace_last,
  truncate: truncate,
  truncatewords: truncatewords,
  normalize_whitespace: normalize_whitespace,
  number_of_words: number_of_words,
  array_to_sentence_string: array_to_sentence_string
});

const filters = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, htmlFilters), mathFilters), urlFilters), arrayFilters), dateFilters), stringFilters), misc);

class AssignTag extends Tag {
    constructor(token, remainTokens, liquid) {
        super(token, remainTokens, liquid);
        this.key = this.tokenizer.readIdentifier().content;
        this.tokenizer.assert(this.key, 'expected variable name');
        this.tokenizer.skipBlank();
        this.tokenizer.assert(this.tokenizer.peek() === '=', 'expected "="');
        this.tokenizer.advance();
        this.value = new Value(this.tokenizer.readFilteredValue(), this.liquid);
    }
    *render(ctx) {
        ctx.bottom()[this.key] = yield this.value.value(ctx, this.liquid.options.lenientIf);
    }
}

const MODIFIERS = ['offset', 'limit', 'reversed'];
class ForTag extends Tag {
    constructor(token, remainTokens, liquid) {
        super(token, remainTokens, liquid);
        const variable = this.tokenizer.readIdentifier();
        const inStr = this.tokenizer.readIdentifier();
        const collection = this.tokenizer.readValue();
        if (!variable.size() || inStr.content !== 'in' || !collection) {
            throw new Error(`illegal tag: ${token.getText()}`);
        }
        this.variable = variable.content;
        this.collection = collection;
        this.hash = new Hash(this.tokenizer.remaining());
        this.templates = [];
        this.elseTemplates = [];
        let p;
        const stream = this.liquid.parser.parseStream(remainTokens)
            .on('start', () => (p = this.templates))
            .on('tag:else', () => (p = this.elseTemplates))
            .on('tag:endfor', () => stream.stop())
            .on('template', (tpl) => p.push(tpl))
            .on('end', () => {
            throw new Error(`tag ${token.getText()} not closed`);
        });
        stream.start();
    }
    *render(ctx, emitter) {
        const r = this.liquid.renderer;
        let collection = toEnumerable(yield evalToken(this.collection, ctx));
        if (!collection.length) {
            yield r.renderTemplates(this.elseTemplates, ctx, emitter);
            return;
        }
        const continueKey = 'continue-' + this.variable + '-' + this.collection.getText();
        ctx.push({ continue: ctx.getRegister(continueKey) });
        const hash = yield this.hash.render(ctx);
        ctx.pop();
        const modifiers = this.liquid.options.orderedFilterParameters
            ? Object.keys(hash).filter(x => MODIFIERS.includes(x))
            : MODIFIERS.filter(x => hash[x] !== undefined);
        collection = modifiers.reduce((collection, modifier) => {
            if (modifier === 'offset')
                return offset(collection, hash['offset']);
            if (modifier === 'limit')
                return limit(collection, hash['limit']);
            return reversed(collection);
        }, collection);
        ctx.setRegister(continueKey, (hash['offset'] || 0) + collection.length);
        const scope = { forloop: new ForloopDrop(collection.length, this.collection.getText(), this.variable) };
        ctx.push(scope);
        for (const item of collection) {
            scope[this.variable] = item;
            yield r.renderTemplates(this.templates, ctx, emitter);
            if (emitter['break']) {
                emitter['break'] = false;
                break;
            }
            emitter['continue'] = false;
            scope.forloop.next();
        }
        ctx.pop();
    }
}
function reversed(arr) {
    return [...arr].reverse();
}
function offset(arr, count) {
    return arr.slice(count);
}
function limit(arr, count) {
    return arr.slice(0, count);
}

class CaptureTag extends Tag {
    constructor(tagToken, remainTokens, liquid) {
        super(tagToken, remainTokens, liquid);
        this.templates = [];
        this.variable = this.readVariableName();
        while (remainTokens.length) {
            const token = remainTokens.shift();
            if (isTagToken(token) && token.name === 'endcapture')
                return;
            this.templates.push(liquid.parser.parseToken(token, remainTokens));
        }
        throw new Error(`tag ${tagToken.getText()} not closed`);
    }
    *render(ctx) {
        const r = this.liquid.renderer;
        const html = yield r.renderTemplates(this.templates, ctx);
        ctx.bottom()[this.variable] = html;
    }
    readVariableName() {
        const word = this.tokenizer.readIdentifier().content;
        if (word)
            return word;
        const quoted = this.tokenizer.readQuoted();
        if (quoted)
            return evalQuotedToken(quoted);
        throw this.tokenizer.error('invalid capture name');
    }
}

class CaseTag extends Tag {
    constructor(tagToken, remainTokens, liquid) {
        super(tagToken, remainTokens, liquid);
        this.branches = [];
        this.elseTemplates = [];
        this.value = new Value(this.tokenizer.readFilteredValue(), this.liquid);
        this.elseTemplates = [];
        let p = [];
        let elseCount = 0;
        const stream = this.liquid.parser.parseStream(remainTokens)
            .on('tag:when', (token) => {
            if (elseCount > 0) {
                return;
            }
            p = [];
            const values = [];
            while (!token.tokenizer.end()) {
                values.push(token.tokenizer.readValueOrThrow());
                token.tokenizer.skipBlank();
                if (token.tokenizer.peek() === ',') {
                    token.tokenizer.readTo(',');
                }
                else {
                    token.tokenizer.readTo('or');
                }
            }
            this.branches.push({
                values,
                templates: p
            });
        })
            .on('tag:else', () => {
            elseCount++;
            p = this.elseTemplates;
        })
            .on('tag:endcase', () => stream.stop())
            .on('template', (tpl) => {
            if (p !== this.elseTemplates || elseCount === 1) {
                p.push(tpl);
            }
        })
            .on('end', () => {
            throw new Error(`tag ${tagToken.getText()} not closed`);
        });
        stream.start();
    }
    *render(ctx, emitter) {
        const r = this.liquid.renderer;
        const target = toValue(yield this.value.value(ctx, ctx.opts.lenientIf));
        let branchHit = false;
        for (const branch of this.branches) {
            for (const valueToken of branch.values) {
                const value = yield evalToken(valueToken, ctx, ctx.opts.lenientIf);
                if (equals(target, value)) {
                    yield r.renderTemplates(branch.templates, ctx, emitter);
                    branchHit = true;
                    break;
                }
            }
        }
        if (!branchHit) {
            yield r.renderTemplates(this.elseTemplates, ctx, emitter);
        }
    }
}

class CommentTag extends Tag {
    constructor(tagToken, remainTokens, liquid) {
        super(tagToken, remainTokens, liquid);
        while (remainTokens.length) {
            const token = remainTokens.shift();
            if (isTagToken(token) && token.name === 'endcomment')
                return;
        }
        throw new Error(`tag ${tagToken.getText()} not closed`);
    }
    render() { }
}

class RenderTag extends Tag {
    constructor(token, remainTokens, liquid) {
        super(token, remainTokens, liquid);
        const tokenizer = this.tokenizer;
        this.file = parseFilePath(tokenizer, this.liquid);
        this.currentFile = token.file;
        while (!tokenizer.end()) {
            tokenizer.skipBlank();
            const begin = tokenizer.p;
            const keyword = tokenizer.readIdentifier();
            if (keyword.content === 'with' || keyword.content === 'for') {
                tokenizer.skipBlank();
                // can be normal key/value pair, like "with: true"
                if (tokenizer.peek() !== ':') {
                    const value = tokenizer.readValue();
                    // can be normal key, like "with,"
                    if (value) {
                        const beforeAs = tokenizer.p;
                        const asStr = tokenizer.readIdentifier();
                        let alias;
                        if (asStr.content === 'as')
                            alias = tokenizer.readIdentifier();
                        else
                            tokenizer.p = beforeAs;
                        this[keyword.content] = { value, alias: alias && alias.content };
                        tokenizer.skipBlank();
                        if (tokenizer.peek() === ',')
                            tokenizer.advance();
                        continue; // matched!
                    }
                }
            }
            /**
             * restore cursor if with/for not matched
             */
            tokenizer.p = begin;
            break;
        }
        this.hash = new Hash(tokenizer.remaining());
    }
    *render(ctx, emitter) {
        const { liquid, hash } = this;
        const filepath = (yield renderFilePath(this['file'], ctx, liquid));
        assert(filepath, () => `illegal file path "${filepath}"`);
        const childCtx = new Context({}, ctx.opts, { sync: ctx.sync, globals: ctx.globals, strictVariables: ctx.strictVariables });
        const scope = childCtx.bottom();
        __assign(scope, yield hash.render(ctx));
        if (this['with']) {
            const { value, alias } = this['with'];
            scope[alias || filepath] = yield evalToken(value, ctx);
        }
        if (this['for']) {
            const { value, alias } = this['for'];
            const collection = toEnumerable(yield evalToken(value, ctx));
            scope['forloop'] = new ForloopDrop(collection.length, value.getText(), alias);
            for (const item of collection) {
                scope[alias] = item;
                const templates = (yield liquid._parsePartialFile(filepath, childCtx.sync, this['currentFile']));
                yield liquid.renderer.renderTemplates(templates, childCtx, emitter);
                scope['forloop'].next();
            }
        }
        else {
            const templates = (yield liquid._parsePartialFile(filepath, childCtx.sync, this['currentFile']));
            yield liquid.renderer.renderTemplates(templates, childCtx, emitter);
        }
    }
}
/**
 * @return null for "none",
 * @return Template[] for quoted with tags and/or filters
 * @return Token for expression (not quoted)
 * @throws TypeError if cannot read next token
 */
function parseFilePath(tokenizer, liquid) {
    if (liquid.options.dynamicPartials) {
        const file = tokenizer.readValue();
        tokenizer.assert(file, 'illegal file path');
        if (file.getText() === 'none')
            return;
        if (isQuotedToken(file)) {
            // for filenames like "files/{{file}}", eval as liquid template
            const templates = liquid.parse(evalQuotedToken(file));
            return optimize(templates);
        }
        return file;
    }
    const tokens = [...tokenizer.readFileNameTemplate(liquid.options)];
    const templates = optimize(liquid.parser.parseTokens(tokens));
    return templates === 'none' ? undefined : templates;
}
function optimize(templates) {
    // for filenames like "files/file.liquid", extract the string directly
    if (templates.length === 1 && isHTMLToken(templates[0].token))
        return templates[0].token.getContent();
    return templates;
}
function* renderFilePath(file, ctx, liquid) {
    if (typeof file === 'string')
        return file;
    if (Array.isArray(file))
        return liquid.renderer.renderTemplates(file, ctx);
    return yield evalToken(file, ctx);
}

class IncludeTag extends Tag {
    constructor(token, remainTokens, liquid) {
        super(token, remainTokens, liquid);
        const { tokenizer } = token;
        this['file'] = parseFilePath(tokenizer, this.liquid);
        this['currentFile'] = token.file;
        const begin = tokenizer.p;
        const withStr = tokenizer.readIdentifier();
        if (withStr.content === 'with') {
            tokenizer.skipBlank();
            if (tokenizer.peek() !== ':') {
                this.withVar = tokenizer.readValue();
            }
            else
                tokenizer.p = begin;
        }
        else
            tokenizer.p = begin;
        this.hash = new Hash(tokenizer.remaining(), this.liquid.options.jekyllInclude);
    }
    *render(ctx, emitter) {
        const { liquid, hash, withVar } = this;
        const { renderer } = liquid;
        const filepath = (yield renderFilePath(this['file'], ctx, liquid));
        assert(filepath, () => `illegal file path "${filepath}"`);
        const saved = ctx.saveRegister('blocks', 'blockMode');
        ctx.setRegister('blocks', {});
        ctx.setRegister('blockMode', BlockMode.OUTPUT);
        const scope = (yield hash.render(ctx));
        if (withVar)
            scope[filepath] = yield evalToken(withVar, ctx);
        const templates = (yield liquid._parsePartialFile(filepath, ctx.sync, this['currentFile']));
        ctx.push(ctx.opts.jekyllInclude ? { include: scope } : scope);
        yield renderer.renderTemplates(templates, ctx, emitter);
        ctx.pop();
        ctx.restoreRegister(saved);
    }
}

class DecrementTag extends Tag {
    constructor(token, remainTokens, liquid) {
        super(token, remainTokens, liquid);
        this.variable = this.tokenizer.readIdentifier().content;
    }
    render(context, emitter) {
        const scope = context.environments;
        if (!isNumber(scope[this.variable])) {
            scope[this.variable] = 0;
        }
        emitter.write(stringify(--scope[this.variable]));
    }
}

class CycleTag extends Tag {
    constructor(token, remainTokens, liquid) {
        super(token, remainTokens, liquid);
        this.candidates = [];
        const group = this.tokenizer.readValue();
        this.tokenizer.skipBlank();
        if (group) {
            if (this.tokenizer.peek() === ':') {
                this.group = group;
                this.tokenizer.advance();
            }
            else
                this.candidates.push(group);
        }
        while (!this.tokenizer.end()) {
            const value = this.tokenizer.readValue();
            if (value)
                this.candidates.push(value);
            this.tokenizer.readTo(',');
        }
        this.tokenizer.assert(this.candidates.length, () => `empty candidates: "${token.getText()}"`);
    }
    *render(ctx, emitter) {
        const group = (yield evalToken(this.group, ctx));
        const fingerprint = `cycle:${group}:` + this.candidates.join(',');
        const groups = ctx.getRegister('cycle');
        let idx = groups[fingerprint];
        if (idx === undefined) {
            idx = groups[fingerprint] = 0;
        }
        const candidate = this.candidates[idx];
        idx = (idx + 1) % this.candidates.length;
        groups[fingerprint] = idx;
        return yield evalToken(candidate, ctx);
    }
}

class IfTag extends Tag {
    constructor(tagToken, remainTokens, liquid) {
        super(tagToken, remainTokens, liquid);
        this.branches = [];
        this.elseTemplates = [];
        let p = [];
        let elseCount = 0;
        liquid.parser.parseStream(remainTokens)
            .on('start', () => this.branches.push({
            value: new Value(tagToken.args, this.liquid),
            templates: (p = [])
        }))
            .on('tag:elsif', (token) => {
            if (elseCount > 0) {
                p = [];
                return;
            }
            this.branches.push({
                value: new Value(token.args, this.liquid),
                templates: (p = [])
            });
        })
            .on('tag:else', () => {
            elseCount++;
            p = this.elseTemplates;
        })
            .on('tag:endif', function () { this.stop(); })
            .on('template', (tpl) => {
            if (p !== this.elseTemplates || elseCount === 1) {
                p.push(tpl);
            }
        })
            .on('end', () => { throw new Error(`tag ${tagToken.getText()} not closed`); })
            .start();
    }
    *render(ctx, emitter) {
        const r = this.liquid.renderer;
        for (const { value, templates } of this.branches) {
            const v = yield value.value(ctx, ctx.opts.lenientIf);
            if (isTruthy(v, ctx)) {
                yield r.renderTemplates(templates, ctx, emitter);
                return;
            }
        }
        yield r.renderTemplates(this.elseTemplates, ctx, emitter);
    }
}

class IncrementTag extends Tag {
    constructor(token, remainTokens, liquid) {
        super(token, remainTokens, liquid);
        this.variable = this.tokenizer.readIdentifier().content;
    }
    render(context, emitter) {
        const scope = context.environments;
        if (!isNumber(scope[this.variable])) {
            scope[this.variable] = 0;
        }
        const val = scope[this.variable];
        scope[this.variable]++;
        emitter.write(stringify(val));
    }
}

class LayoutTag extends Tag {
    constructor(token, remainTokens, liquid) {
        super(token, remainTokens, liquid);
        this.file = parseFilePath(this.tokenizer, this.liquid);
        this['currentFile'] = token.file;
        this.args = new Hash(this.tokenizer.remaining());
        this.templates = this.liquid.parser.parseTokens(remainTokens);
    }
    *render(ctx, emitter) {
        const { liquid, args, file } = this;
        const { renderer } = liquid;
        if (file === undefined) {
            ctx.setRegister('blockMode', BlockMode.OUTPUT);
            yield renderer.renderTemplates(this.templates, ctx, emitter);
            return;
        }
        const filepath = (yield renderFilePath(this.file, ctx, liquid));
        assert(filepath, () => `illegal file path "${filepath}"`);
        const templates = (yield liquid._parseLayoutFile(filepath, ctx.sync, this['currentFile']));
        // render remaining contents and store rendered results
        ctx.setRegister('blockMode', BlockMode.STORE);
        const html = yield renderer.renderTemplates(this.templates, ctx);
        const blocks = ctx.getRegister('blocks');
        // set whole content to anonymous block if anonymous doesn't specified
        if (blocks[''] === undefined)
            blocks[''] = (parent, emitter) => emitter.write(html);
        ctx.setRegister('blockMode', BlockMode.OUTPUT);
        // render the layout file use stored blocks
        ctx.push((yield args.render(ctx)));
        yield renderer.renderTemplates(templates, ctx, emitter);
        ctx.pop();
    }
}

class BlockTag extends Tag {
    constructor(token, remainTokens, liquid) {
        super(token, remainTokens, liquid);
        this.templates = [];
        const match = /\w+/.exec(token.args);
        this.block = match ? match[0] : '';
        while (remainTokens.length) {
            const token = remainTokens.shift();
            if (isTagToken(token) && token.name === 'endblock')
                return;
            const template = liquid.parser.parseToken(token, remainTokens);
            this.templates.push(template);
        }
        throw new Error(`tag ${token.getText()} not closed`);
    }
    *render(ctx, emitter) {
        const blockRender = this.getBlockRender(ctx);
        if (ctx.getRegister('blockMode') === BlockMode.STORE) {
            ctx.getRegister('blocks')[this.block] = blockRender;
        }
        else {
            yield blockRender(new BlockDrop(), emitter);
        }
    }
    getBlockRender(ctx) {
        const { liquid, templates } = this;
        const renderChild = ctx.getRegister('blocks')[this.block];
        const renderCurrent = function* (superBlock, emitter) {
            // add {{ block.super }} support when rendering
            ctx.push({ block: superBlock });
            yield liquid.renderer.renderTemplates(templates, ctx, emitter);
            ctx.pop();
        };
        return renderChild
            ? (superBlock, emitter) => renderChild(new BlockDrop(() => renderCurrent(superBlock, emitter)), emitter)
            : renderCurrent;
    }
}

class RawTag extends Tag {
    constructor(tagToken, remainTokens, liquid) {
        super(tagToken, remainTokens, liquid);
        this.tokens = [];
        while (remainTokens.length) {
            const token = remainTokens.shift();
            if (isTagToken(token) && token.name === 'endraw')
                return;
            this.tokens.push(token);
        }
        throw new Error(`tag ${tagToken.getText()} not closed`);
    }
    render() {
        return this.tokens.map((token) => token.getText()).join('');
    }
}

class TablerowloopDrop extends ForloopDrop {
    constructor(length, cols, collection, variable) {
        super(length, collection, variable);
        this.length = length;
        this.cols = cols;
    }
    row() {
        return Math.floor(this.i / this.cols) + 1;
    }
    col0() {
        return (this.i % this.cols);
    }
    col() {
        return this.col0() + 1;
    }
    col_first() {
        return this.col0() === 0;
    }
    col_last() {
        return this.col() === this.cols;
    }
}

class TablerowTag extends Tag {
    constructor(tagToken, remainTokens, liquid) {
        super(tagToken, remainTokens, liquid);
        const variable = this.tokenizer.readIdentifier();
        this.tokenizer.skipBlank();
        const predicate = this.tokenizer.readIdentifier();
        const collectionToken = this.tokenizer.readValue();
        if (predicate.content !== 'in' || !collectionToken) {
            throw new Error(`illegal tag: ${tagToken.getText()}`);
        }
        this.variable = variable.content;
        this.collection = collectionToken;
        this.args = new Hash(this.tokenizer.remaining());
        this.templates = [];
        let p;
        const stream = this.liquid.parser.parseStream(remainTokens)
            .on('start', () => (p = this.templates))
            .on('tag:endtablerow', () => stream.stop())
            .on('template', (tpl) => p.push(tpl))
            .on('end', () => {
            throw new Error(`tag ${tagToken.getText()} not closed`);
        });
        stream.start();
    }
    *render(ctx, emitter) {
        let collection = toEnumerable(yield evalToken(this.collection, ctx));
        const args = (yield this.args.render(ctx));
        const offset = args.offset || 0;
        const limit = (args.limit === undefined) ? collection.length : args.limit;
        collection = collection.slice(offset, offset + limit);
        const cols = args.cols || collection.length;
        const r = this.liquid.renderer;
        const tablerowloop = new TablerowloopDrop(collection.length, cols, this.collection.getText(), this.variable);
        const scope = { tablerowloop };
        ctx.push(scope);
        for (let idx = 0; idx < collection.length; idx++, tablerowloop.next()) {
            scope[this.variable] = collection[idx];
            if (tablerowloop.col0() === 0) {
                if (tablerowloop.row() !== 1)
                    emitter.write('</tr>');
                emitter.write(`<tr class="row${tablerowloop.row()}">`);
            }
            emitter.write(`<td class="col${tablerowloop.col()}">`);
            yield r.renderTemplates(this.templates, ctx, emitter);
            emitter.write('</td>');
        }
        if (collection.length)
            emitter.write('</tr>');
        ctx.pop();
    }
}

class UnlessTag extends Tag {
    constructor(tagToken, remainTokens, liquid) {
        super(tagToken, remainTokens, liquid);
        this.branches = [];
        this.elseTemplates = [];
        let p = [];
        let elseCount = 0;
        this.liquid.parser.parseStream(remainTokens)
            .on('start', () => this.branches.push({
            value: new Value(tagToken.args, this.liquid),
            test: isFalsy,
            templates: (p = [])
        }))
            .on('tag:elsif', (token) => {
            if (elseCount > 0) {
                p = [];
                return;
            }
            this.branches.push({
                value: new Value(token.args, this.liquid),
                test: isTruthy,
                templates: (p = [])
            });
        })
            .on('tag:else', () => {
            elseCount++;
            p = this.elseTemplates;
        })
            .on('tag:endunless', function () { this.stop(); })
            .on('template', (tpl) => {
            if (p !== this.elseTemplates || elseCount === 1) {
                p.push(tpl);
            }
        })
            .on('end', () => { throw new Error(`tag ${tagToken.getText()} not closed`); })
            .start();
    }
    *render(ctx, emitter) {
        const r = this.liquid.renderer;
        for (const { value, test, templates } of this.branches) {
            const v = yield value.value(ctx, ctx.opts.lenientIf);
            if (test(v, ctx)) {
                yield r.renderTemplates(templates, ctx, emitter);
                return;
            }
        }
        yield r.renderTemplates(this.elseTemplates, ctx, emitter);
    }
}

class BreakTag extends Tag {
    render(ctx, emitter) {
        emitter['break'] = true;
    }
}

class ContinueTag extends Tag {
    render(ctx, emitter) {
        emitter['continue'] = true;
    }
}

class EchoTag extends Tag {
    constructor(token, remainTokens, liquid) {
        super(token, remainTokens, liquid);
        this.tokenizer.skipBlank();
        if (!this.tokenizer.end()) {
            this.value = new Value(this.tokenizer.readFilteredValue(), this.liquid);
        }
    }
    *render(ctx, emitter) {
        if (!this.value)
            return;
        const val = yield this.value.value(ctx, false);
        emitter.write(val);
    }
}

class LiquidTag extends Tag {
    constructor(token, remainTokens, liquid) {
        super(token, remainTokens, liquid);
        const tokens = this.tokenizer.readLiquidTagTokens(this.liquid.options);
        this.templates = this.liquid.parser.parseTokens(tokens);
    }
    *render(ctx, emitter) {
        yield this.liquid.renderer.renderTemplates(this.templates, ctx, emitter);
    }
}

class InlineCommentTag extends Tag {
    constructor(tagToken, remainTokens, liquid) {
        super(tagToken, remainTokens, liquid);
        if (tagToken.args.search(/\n\s*[^#\s]/g) !== -1) {
            throw new Error('every line of an inline comment must start with a \'#\' character');
        }
    }
    render() { }
}

const tags = {
    assign: AssignTag,
    'for': ForTag,
    capture: CaptureTag,
    'case': CaseTag,
    comment: CommentTag,
    include: IncludeTag,
    render: RenderTag,
    decrement: DecrementTag,
    increment: IncrementTag,
    cycle: CycleTag,
    'if': IfTag,
    layout: LayoutTag,
    block: BlockTag,
    raw: RawTag,
    tablerow: TablerowTag,
    unless: UnlessTag,
    'break': BreakTag,
    'continue': ContinueTag,
    echo: EchoTag,
    liquid: LiquidTag,
    '#': InlineCommentTag
};

class Liquid {
    constructor(opts = {}) {
        this.renderer = new Render();
        this.filters = {};
        this.tags = {};
        this.options = normalize(opts);
        this.parser = new Parser(this);
        forOwn(tags, (conf, name) => this.registerTag(name, conf));
        forOwn(filters, (handler, name) => this.registerFilter(name, handler));
    }
    parse(html, filepath) {
        return this.parser.parse(html, filepath);
    }
    _render(tpl, scope, renderOptions) {
        const ctx = scope instanceof Context ? scope : new Context(scope, this.options, renderOptions);
        return this.renderer.renderTemplates(tpl, ctx);
    }
    render(tpl, scope, renderOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return toPromise(this._render(tpl, scope, Object.assign(Object.assign({}, renderOptions), { sync: false })));
        });
    }
    renderSync(tpl, scope, renderOptions) {
        return toValueSync(this._render(tpl, scope, Object.assign(Object.assign({}, renderOptions), { sync: true })));
    }
    renderToNodeStream(tpl, scope, renderOptions = {}) {
        const ctx = new Context(scope, this.options, renderOptions);
        return this.renderer.renderTemplatesToNodeStream(tpl, ctx);
    }
    _parseAndRender(html, scope, renderOptions) {
        const tpl = this.parse(html);
        return this._render(tpl, scope, renderOptions);
    }
    parseAndRender(html, scope, renderOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return toPromise(this._parseAndRender(html, scope, Object.assign(Object.assign({}, renderOptions), { sync: false })));
        });
    }
    parseAndRenderSync(html, scope, renderOptions) {
        return toValueSync(this._parseAndRender(html, scope, Object.assign(Object.assign({}, renderOptions), { sync: true })));
    }
    _parsePartialFile(file, sync, currentFile) {
        return this.parser.parseFile(file, sync, LookupType.Partials, currentFile);
    }
    _parseLayoutFile(file, sync, currentFile) {
        return this.parser.parseFile(file, sync, LookupType.Layouts, currentFile);
    }
    _parseFile(file, sync, lookupType, currentFile) {
        return this.parser.parseFile(file, sync, lookupType, currentFile);
    }
    parseFile(file, lookupType) {
        return __awaiter(this, void 0, void 0, function* () {
            return toPromise(this.parser.parseFile(file, false, lookupType));
        });
    }
    parseFileSync(file, lookupType) {
        return toValueSync(this.parser.parseFile(file, true, lookupType));
    }
    *_renderFile(file, ctx, renderFileOptions) {
        const templates = (yield this._parseFile(file, renderFileOptions.sync, renderFileOptions.lookupType));
        return yield this._render(templates, ctx, renderFileOptions);
    }
    renderFile(file, ctx, renderFileOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return toPromise(this._renderFile(file, ctx, Object.assign(Object.assign({}, renderFileOptions), { sync: false })));
        });
    }
    renderFileSync(file, ctx, renderFileOptions) {
        return toValueSync(this._renderFile(file, ctx, Object.assign(Object.assign({}, renderFileOptions), { sync: true })));
    }
    renderFileToNodeStream(file, scope, renderOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const templates = yield this.parseFile(file);
            return this.renderToNodeStream(templates, scope, renderOptions);
        });
    }
    _evalValue(str, scope) {
        const value = new Value(str, this);
        const ctx = scope instanceof Context ? scope : new Context(scope, this.options);
        return value.value(ctx);
    }
    evalValue(str, scope) {
        return __awaiter(this, void 0, void 0, function* () {
            return toPromise(this._evalValue(str, scope));
        });
    }
    evalValueSync(str, scope) {
        return toValueSync(this._evalValue(str, scope));
    }
    registerFilter(name, filter) {
        this.filters[name] = filter;
    }
    registerTag(name, tag) {
        this.tags[name] = isFunction(tag) ? tag : createTagClass(tag);
    }
    plugin(plugin) {
        return plugin.call(this, Liquid);
    }
    express() {
        const self = this; // eslint-disable-line
        let firstCall = true;
        return function (filePath, ctx, callback) {
            if (firstCall) {
                firstCall = false;
                const dirs = normalizeDirectoryList(this.root);
                self.options.root.unshift(...dirs);
                self.options.layouts.unshift(...dirs);
                self.options.partials.unshift(...dirs);
            }
            self.renderFile(filePath, ctx).then(html => callback(null, html), callback);
        };
    }
}

/* istanbul ignore file */
const version = '10.13.1';

export { AssertionError, AssignTag, BlockTag, BreakTag, CaptureTag, CaseTag, CommentTag, Context, ContinueTag, CycleTag, DecrementTag, Drop, EchoTag, Expression, Filter, ForTag, Hash, IfTag, IncludeTag, IncrementTag, InlineCommentTag, LayoutTag, Liquid, LiquidError, LiquidTag, Output, ParseError, ParseStream, RawTag, RenderError, RenderTag, TablerowTag, Tag, TagToken, TimezoneDate, Token, TokenKind, TokenizationError, Tokenizer, typeGuards as TypeGuards, UndefinedVariableError, UnlessTag, Value, assert, createTrie, defaultOperators, defaultOptions, evalQuotedToken, evalToken, filters, isFalsy, isTruthy, tags, toPromise, toValue, toValueSync, version };
