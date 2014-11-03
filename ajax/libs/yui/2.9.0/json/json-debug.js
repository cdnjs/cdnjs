/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 * Provides methods to parse JSON strings and convert objects to JSON strings.
 *
 * @module json
 * @class JSON
 * @namespace YAHOO.lang
 * @static
 */
(function () {

var l = YAHOO.lang,
    isFunction = l.isFunction,
    isObject   = l.isObject,
    isArray    = l.isArray,
    _toStr     = Object.prototype.toString,
                 // 'this' is the global object.  window in browser env.  Keep
                 // the code env agnostic.  Caja requies window, unfortunately.
    Native     = (YAHOO.env.ua.caja ? window : this).JSON,

/* Variables used by parse */

    /**
     * Replace certain Unicode characters that JavaScript may handle incorrectly
     * during eval--either by deleting them or treating them as line
     * endings--with escape sequences.
     * IMPORTANT NOTE: This regex will be used to modify the input if a match is
     * found.
     *
     * @property _UNICODE_EXCEPTIONS
     * @type {RegExp}
     * @private
     */
    _UNICODE_EXCEPTIONS = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,

    /**
     * First step in the safety evaluation.  Regex used to replace all escape
     * sequences (i.e. "\\", etc) with '@' characters (a non-JSON character).
     *
     * @property _ESCAPES
     * @type {RegExp}
     * @static
     * @private
     */
    _ESCAPES = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,

    /**
     * Second step in the safety evaluation.  Regex used to replace all simple
     * values with ']' characters.
     *
     * @property _VALUES
     * @type {RegExp}
     * @static
     * @private
     */
    _VALUES  = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,

    /**
     * Third step in the safety evaluation.  Regex used to remove all open
     * square brackets following a colon, comma, or at the beginning of the
     * string.
     *
     * @property _BRACKETS
     * @type {RegExp}
     * @static
     * @private
     */
    _BRACKETS = /(?:^|:|,)(?:\s*\[)+/g,

    /**
     * Final step in the safety evaluation.  Regex used to test the string left
     * after all previous replacements for invalid characters.
     *
     * @property _UNSAFE
     * @type {RegExp}
     * @static
     * @private
     */
    _UNSAFE  = /[^\],:{}\s]/,


/* Variables used by stringify */

    /**
     * Regex used to replace special characters in strings for JSON
     * stringification.
     *
     * @property _SPECIAL_CHARS
     * @type {RegExp}
     * @static
     * @private
     */
    _SPECIAL_CHARS = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,

    /**
     * Character substitution map for common escapes and special characters.
     *
     * @property _CHARS
     * @type {Object}
     * @static
     * @private
     */
    _CHARS = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    },
    
    UNDEFINED = 'undefined',
    OBJECT    = 'object',
    NULL      = 'null',
    STRING    = 'string',
    NUMBER    = 'number',
    BOOLEAN   = 'boolean',
    DATE      = 'date',
    _allowable = {
        'undefined'        : UNDEFINED,
        'string'           : STRING,
        '[object String]'  : STRING,
        'number'           : NUMBER,
        '[object Number]'  : NUMBER,
        'boolean'          : BOOLEAN,
        '[object Boolean]' : BOOLEAN,
        '[object Date]'    : DATE,
        '[object RegExp]'  : OBJECT
    },
    EMPTY     = '',
    OPEN_O    = '{',
    CLOSE_O   = '}',
    OPEN_A    = '[',
    CLOSE_A   = ']',
    COMMA     = ',',
    COMMA_CR  = ",\n",
    CR        = "\n",
    COLON     = ':',
    COLON_SP  = ': ',
    QUOTE     = '"';

// Only accept JSON objects that report a [[Class]] of JSON
Native = _toStr.call(Native) === '[object JSON]' && Native;

// Escapes a special character to a safe Unicode representation
function _char(c) {
    if (!_CHARS[c]) {
        _CHARS[c] =  '\\u'+('0000'+(+(c.charCodeAt(0))).toString(16)).slice(-4);
    }
    return _CHARS[c];
}


/* functions used by parse */

/**
 * Traverses nested objects, applying a filter or reviver function to
 * each value.  The value returned from the function will replace the
 * original value in the key:value pair.  If the value returned is
 * undefined, the key will be omitted from the returned object.
 *
 * @method _revive
 * @param data {MIXED} Any JavaScript data
 * @param reviver {Function} filter or mutation function
 * @return {MIXED} The results of the filtered/mutated data structure
 * @private
 */
function _revive(data, reviver) {
    var walk = function (o,key) {
        var k,v,value = o[key];
        if (value && typeof value === 'object') {
            for (k in value) {
                if (l.hasOwnProperty(value,k)) {
                    v = walk(value, k);
                    if (v === undefined) {
                        delete value[k];
                    } else {
                        value[k] = v;
                    }
                }
            }
        }
        return reviver.call(o,key,value);
    };

    return typeof reviver === 'function' ? walk({'':data},'') : data;
}

/**
 * Replace certain Unicode characters that may be handled incorrectly by
 * some browser implementations.
 *
 * @method _prepare
 * @param s {String} parse input
 * @return {String} sanitized JSON string ready to be validated/parsed
 * @private
 */
function _prepare(s) {
    return s.replace(_UNICODE_EXCEPTIONS, _char);
}

function _isSafe(str) {
    return l.isString(str) &&
            !_UNSAFE.test(str.replace(_ESCAPES,'@').
                             replace(_VALUES,']').
                             replace(_BRACKETS,''));
}

function _parse(s,reviver) {
    // sanitize
    s = _prepare(s);

    // Ensure valid JSON
    if (_isSafe(s)) {
        // Eval the text into a JavaScript data structure, apply the
        // reviver function if provided, and return
        return _revive( eval('(' + s + ')'), reviver );
    }

    // The text is not valid JSON
    throw new SyntaxError('JSON.parse');
}



/* functions used by stringify */

// Utility function used to determine how to serialize a variable.
function _type(o) {
    var t = typeof o;
    return  _allowable[t] ||              // number, string, boolean, undefined
            _allowable[_toStr.call(o)] || // Number, String, Boolean, Date
            (t === OBJECT ?
                (o ? OBJECT : NULL) :     // object, array, null, misc natives
                UNDEFINED);               // function, unknown
}

// Enclose escaped strings in quotes
function _string(s) {
    return QUOTE + s.replace(_SPECIAL_CHARS, _char) + QUOTE;
}

// Adds the provided space to the beginning of every line in the input string
function _indent(s,space) {
    return s.replace(/^/gm, space);
}

// JavaScript implementation of stringify (see API declaration of stringify)
function _stringify(o,w,space) {
    if (o === undefined) {
        return undefined;
    }

    var replacer = isFunction(w) ? w : null,
        format   = _toStr.call(space).match(/String|Number/) || [],
        _date    = YAHOO.lang.JSON.dateToString,
        stack    = [],
        tmp,i,len;

    if (replacer || !isArray(w)) {
        w = undefined;
    }

    // Ensure whitelist keys are unique (bug 2110391)
    if (w) {
        tmp = {};
        for (i = 0, len = w.length; i < len; ++i) {
            tmp[w[i]] = true;
        }
        w = tmp;
    }

    // Per the spec, strings are truncated to 10 characters and numbers
    // are converted to that number of spaces (max 10)
    space = format[0] === 'Number' ?
                new Array(Math.min(Math.max(0,space),10)+1).join(" ") :
                (space || EMPTY).slice(0,10);

    function _serialize(h,key) {
        var value = h[key],
            t     = _type(value),
            a     = [],
            colon = space ? COLON_SP : COLON,
            arr, i, keys, k, v;

        // Per the ECMA 5 spec, toJSON is applied before the replacer is
        // called.  Also per the spec, Date.prototype.toJSON has been added, so
        // Date instances should be serialized prior to exposure to the
        // replacer.  I disagree with this decision, but the spec is the spec.
        if (isObject(value) && isFunction(value.toJSON)) {
            value = value.toJSON(key);
        } else if (t === DATE) {
            value = _date(value);
        }

        if (isFunction(replacer)) {
            value = replacer.call(h,key,value);
        }

        if (value !== h[key]) {
            t = _type(value);
        }

        switch (t) {
            case DATE    : // intentional fallthrough.  Pre-replacer Dates are
                           // serialized in the toJSON stage.  Dates here would
                           // have been produced by the replacer.
            case OBJECT  : break;
            case STRING  : return _string(value);
            case NUMBER  : return isFinite(value) ? value+EMPTY : NULL;
            case BOOLEAN : return value+EMPTY;
            case NULL    : return NULL;
            default      : return undefined;
        }

        // Check for cyclical references in nested objects
        for (i = stack.length - 1; i >= 0; --i) {
            if (stack[i] === value) {
                throw new Error("JSON.stringify. Cyclical reference");
            }
        }

        arr = isArray(value);

        // Add the object to the processing stack
        stack.push(value);

        if (arr) { // Array
            for (i = value.length - 1; i >= 0; --i) {
                a[i] = _serialize(value, i) || NULL;
            }
        } else {   // Object
            // If whitelist provided, take only those keys
            keys = w || value;
            i = 0;

            for (k in keys) {
                if (l.hasOwnProperty(keys, k)) {
                    v = _serialize(value, k);
                    if (v) {
                        a[i++] = _string(k) + colon + v;
                    }
                }
            }
        }

        // remove the array from the stack
        stack.pop();

        if (space && a.length) {
            return arr ?
                OPEN_A + CR + _indent(a.join(COMMA_CR), space) + CR + CLOSE_A :
                OPEN_O + CR + _indent(a.join(COMMA_CR), space) + CR + CLOSE_O;
        } else {
            return arr ?
                OPEN_A + a.join(COMMA) + CLOSE_A :
                OPEN_O + a.join(COMMA) + CLOSE_O;
        }
    }

    // process the input
    return _serialize({'':o},'');
}


/* Public API */
YAHOO.lang.JSON = {
    /**
     * Leverage native JSON parse if the browser has a native implementation.
     * In general, this is a good idea.  See the Known Issues section in the
     * JSON user guide for caveats.  The default value is true for browsers with
     * native JSON support.
     *
     * @property useNativeParse
     * @type Boolean
     * @default true
     * @static
     */
    useNativeParse : !!Native,

    /**
     * Leverage native JSON stringify if the browser has a native
     * implementation.  In general, this is a good idea.  See the Known Issues
     * section in the JSON user guide for caveats.  The default value is true
     * for browsers with native JSON support.
     *
     * @property useNativeStringify
     * @type Boolean
     * @default true
     * @static
     */
    useNativeStringify : !!Native,

    /**
     * Four step determination whether a string is safe to eval. In three steps,
     * escape sequences, safe values, and properly placed open square brackets
     * are replaced with placeholders or removed.  Then in the final step, the
     * result of all these replacements is checked for invalid characters.
     *
     * @method isSafe
     * @param str {String} JSON string to be tested
     * @return {boolean} is the string safe for eval?
     * @static
     */
    isSafe : function (s) {
        return _isSafe(_prepare(s));
    },

    /**
     * <p>Parse a JSON string, returning the native JavaScript
     * representation.</p>
     *
     * <p>When lang.JSON.useNativeParse is true, this will defer to the native
     * JSON.parse if the browser has a native implementation.  Otherwise, a
     * JavaScript implementation based on http://www.json.org/json2.js
     * is used.</p>
     *
     * @method parse
     * @param s {string} JSON string data
     * @param reviver {function} (optional) function(k,v) passed each key:value
     *          pair of object literals, allowing pruning or altering values
     * @return {MIXED} the native JavaScript representation of the JSON string
     * @throws SyntaxError
     * @static
     */
    parse : function (s,reviver) {
        if (typeof s !== 'string') {
            s += '';
        }

        return Native && YAHOO.lang.JSON.useNativeParse ?
            Native.parse(s,reviver) : _parse(s,reviver);
    },

    /**
     * <p>Converts an arbitrary value to a JSON string representation.</p>
     *
     * <p>Objects with cyclical references will trigger an exception.</p>
     *
     * <p>If a whitelist is provided, only matching object keys will be
     * included.  Alternately, a replacer function may be passed as the
     * second parameter.  This function is executed on every value in the
     * input, and its return value will be used in place of the original value.
     * This is useful to serialize specialized objects or class instances.</p>
     *
     * <p>If a positive integer or non-empty string is passed as the third
     * parameter, the output will be formatted with carriage returns and
     * indentation for readability.  If a String is passed (such as "\t") it
     * will be used once for each indentation level.  If a number is passed,
     * that number of spaces will be used.</p>
     *
     * <p>When lang.JSON.useNativeStringify is true, this will defer to the
     * native JSON.stringify if the browser has a native implementation.
     * Otherwise, a JavaScript implementation is used.</p>
     *
     * @method stringify
     * @param o {MIXED} any arbitrary object to convert to JSON string
     * @param w {Array|Function} (optional) whitelist of acceptable object keys
     *                  to include OR a function(value,key) to alter values
     *                  before serialization
     * @param space {Number|String} (optional) indentation character(s) or
     *                  depthy of spaces to format the output 
     * @return {string} JSON string representation of the input
     * @throws Error
     * @static
     */
    stringify : function (o,w,space) {
        return Native && YAHOO.lang.JSON.useNativeStringify ?
            Native.stringify(o,w,space) : _stringify(o,w,space);
    },

    /**
     * Serializes a Date instance as a UTC date string.  Used internally by
     * the JavaScript implementation of stringify.  If you need a different
     * Date serialization format, override this method.  If you change this,
     * you should also set useNativeStringify to false, since native JSON
     * implementations serialize Dates per the ECMAScript 5 spec.  You've been
     * warned.
     *
     * @method dateToString
     * @param d {Date} The Date to serialize
     * @return {String} stringified Date in UTC format YYYY-MM-DDTHH:mm:SSZ
     * @static
     */
    dateToString : function (d) {
        function _zeroPad(v) {
            return v < 10 ? '0' + v : v;
        }

        return d.getUTCFullYear()         + '-' +
            _zeroPad(d.getUTCMonth() + 1) + '-' +
            _zeroPad(d.getUTCDate())      + 'T' +
            _zeroPad(d.getUTCHours())     + COLON +
            _zeroPad(d.getUTCMinutes())   + COLON +
            _zeroPad(d.getUTCSeconds())   + 'Z';
    },

    /**
     * Reconstitute Date instances from the default JSON UTC serialization.
     * Reference this from a reviver function to rebuild Dates during the
     * parse operation.
     *
     * @method stringToDate
     * @param str {String} String serialization of a Date
     * @return {Date}
     */
    stringToDate : function (str) {
        var m = str.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z$/);
        if (m) {
            var d = new Date();
            d.setUTCFullYear(m[1], m[2]-1, m[3]);
            d.setUTCHours(m[4], m[5], m[6], (m[7] || 0));
            return d;
        }
        return str;
    }
};

/**
 * <p>Four step determination whether a string is safe to eval. In three steps,
 * escape sequences, safe values, and properly placed open square brackets
 * are replaced with placeholders or removed.  Then in the final step, the
 * result of all these replacements is checked for invalid characters.</p>
 *
 * <p>This is an alias for isSafe.</p>
 *
 * @method isValid
 * @param str {String} JSON string to be tested
 * @return {boolean} is the string safe for eval?
 * @static
 * @deprecated use isSafe
 */
YAHOO.lang.JSON.isValid = YAHOO.lang.JSON.isSafe;

})();
YAHOO.register("json", YAHOO.lang.JSON, {version: "2.9.0", build: "2800"});
