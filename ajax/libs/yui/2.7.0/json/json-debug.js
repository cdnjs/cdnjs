/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.7.0r2
*/
/**
 * Provides methods to parse JSON strings and convert objects to JSON strings.
 * @module json
 * @class JSON
 * @static
 */
YAHOO.lang.JSON = (function () {

var l = YAHOO.lang,

    /**
     * Replace certain Unicode characters that JavaScript may handle incorrectly
     * during eval--either by deleting them or treating them as line
     * endings--with escape sequences.
     * IMPORTANT NOTE: This regex will be used to modify the input if a match is
     * found.
     * @property _UNICODE_EXCEPTIONS
     * @type {RegExp}
     * @private
     */
    _UNICODE_EXCEPTIONS = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,

    /**
     * First step in the validation.  Regex used to replace all escape
     * sequences (i.e. "\\", etc) with '@' characters (a non-JSON character).
     * @property _ESCAPES
     * @type {RegExp}
     * @static
     * @private
     */
    _ESCAPES = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,

    /**
     * Second step in the validation.  Regex used to replace all simple
     * values with ']' characters.
     * @property _VALUES
     * @type {RegExp}
     * @static
     * @private
     */
    _VALUES  = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,

    /**
     * Third step in the validation.  Regex used to remove all open square
     * brackets following a colon, comma, or at the beginning of the string.
     * @property _BRACKETS
     * @type {RegExp}
     * @static
     * @private
     */
    _BRACKETS = /(?:^|:|,)(?:\s*\[)+/g,

    /**
     * Final step in the validation.  Regex used to test the string left after
     * all previous replacements for invalid characters.
     * @property _INVALID
     * @type {RegExp}
     * @static
     * @private
     */
    _INVALID  = /^[\],:{}\s]*$/,

    /**
     * Regex used to replace special characters in strings for JSON
     * stringification.
     * @property _SPECIAL_CHARS
     * @type {RegExp}
     * @static
     * @private
     */
    _SPECIAL_CHARS = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,

    /**
     * Character substitution map for common escapes and special characters.
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
    };

/**
 * Traverses nested objects, applying a filter or reviver function to
 * each value.  The value returned from the function will replace the
 * original value in the key:value pair.  If the value returned is
 * undefined, the key will be omitted from the returned object.
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
 * Escapes a special character to a safe Unicode representation
 * @method _char
 * @param c {String} single character to escape
 * @return {String} safe Unicode escape
 */
function _char(c) {
    if (!_CHARS[c]) {
        _CHARS[c] =  '\\u'+('0000'+(+(c.charCodeAt(0))).toString(16)).slice(-4);
    }
    return _CHARS[c];
}

/**
 * Replace certain Unicode characters that may be handled incorrectly by
 * some browser implementations.
 * @method _prepare
 * @param s {String} parse input
 * @return {String} sanitized JSON string ready to be validated/parsed
 * @private
 */
function _prepare(s) {
    return s.replace(_UNICODE_EXCEPTIONS, _char);
}

/**
 * Four step determination whether a string is valid JSON.  In three steps,
 * escape sequences, safe values, and properly placed open square brackets
 * are replaced with placeholders or removed.  Then in the final step, the
 * result of all these replacements is checked for invalid characters.
 * @method _isValid
 * @param str {String} JSON string to be tested
 * @return {boolean} is the string safe for eval?
 * @static
 */
function _isValid(str) {
    return l.isString(str) &&
            _INVALID.test(str.
            replace(_ESCAPES,'@').
            replace(_VALUES,']').
            replace(_BRACKETS,''));
}

/**
 * Enclose escaped strings in quotes
 * @method _string
 * @param s {String} string to wrap
 * @return {String} '"'+s+'"' after s has had special characters escaped
 * @private
 */
function _string(s) {
    return '"' + s.replace(_SPECIAL_CHARS, _char) + '"';
}

/**
 * Worker function used by public stringify.
 * @method _stringify
 * @param h {Object} object holding the key
 * @param key {String} String key in object h to serialize
 * @param depth {Number} depth to serialize
 * @param w {Array|Function} array of whitelisted keys OR replacer function
 * @param pstack {Array} used to protect against recursion
 * @return {String} serialized version of o
 */
function _stringify(h,key,d,w,pstack) {
    var o = typeof w === 'function' ? w.call(h,key,h[key]) : h[key],
        i,len,j, // array iteration
        k,v,     // object iteration
        isArray, // forking in typeof 'object'
        a;       // composition array for performance over string concat

    if (o instanceof Date) {
        o = l.JSON.dateToString(o);
    } else if (o instanceof String || o instanceof Boolean || o instanceof Number) {
        o = o.valueOf();
    }

    switch (typeof o) {
        case 'string' : return _string(o);
        case 'number' : return isFinite(o) ? String(o) : 'null';
        case 'boolean': return String(o);
        case 'object' :
            // null
            if (o === null) {
                return 'null';
            }

            // Check for cyclical references
            for (i = pstack.length - 1; i >= 0; --i) {
                if (pstack[i] === o) {
                    return 'null';
                }
            }

            // Add the object to the processing stack
            pstack[pstack.length] = o;

            a = [];
            isArray = l.isArray(o);

            // Only recurse if we're above depth config
            if (d > 0) {
                // Array
                if (isArray) {
                    for (i = o.length - 1; i >= 0; --i) {
                        a[i] = _stringify(o,i,d-1,w,pstack) || 'null';
                    }

                // Object
                } else {
                    j = 0;
                    // Use whitelist keys if provided as an array
                    if (l.isArray(w)) {
                        for (i = 0, len = w.length; i < len; ++i) {
                            k = w[i];
                            v = _stringify(o,k,d-1,w,pstack);
                            if (v) {
                                a[j++] = _string(k) + ':' + v;
                            }
                        }
                    } else {
                        for (k in o) {
                            if (typeof k === 'string' && l.hasOwnProperty(o,k)) {
                                v = _stringify(o,k,d-1,w,pstack);
                                if (v) {
                                    a[j++] = _string(k) + ':' + v;
                                }
                            }
                        }
                    }

                    // sort object keys for easier readability
                    a.sort();
                }
            }

            // remove the object from the stack
            pstack.pop();

            return isArray ? '['+a.join(',')+']' : '{'+a.join(',')+'}';
    }

    return undefined; // invalid input
}

// Return the public API
return {
    /**
     * Four step determination whether a string is valid JSON.  In three steps,
     * escape sequences, safe values, and properly placed open square brackets
     * are replaced with placeholders or removed.  Then in the final step, the
     * result of all these replacements is checked for invalid characters.
     * @method isValid
     * @param str {String} JSON string to be tested
     * @return {boolean} is the string safe for eval?
     * @static
     */
    isValid : function (s) {
        return _isValid(_prepare(s));
    },

    /**
     * Parse a JSON string, returning the native JavaScript representation.
     * Only minor modifications from http://www.json.org/json2.js.
     * @param s {string} JSON string data
     * @param reviver {function} (optional) function(k,v) passed each key:value
     *          pair of object literals, allowing pruning or altering values
     * @return {MIXED} the native JavaScript representation of the JSON string
     * @throws SyntaxError
     * @method parse
     * @static
     */
    parse : function (s,reviver) {
        // sanitize
        s = _prepare(s);

        // Ensure valid JSON
        if (_isValid(s)) {
            // Eval the text into a JavaScript data structure, apply the
            // reviver function if provided, and return
            return _revive( eval('(' + s + ')'), reviver );
        }

        // The text is not valid JSON
        throw new SyntaxError('parseJSON');
    },

    /**
     * Converts an arbitrary value to a JSON string representation.
     * Cyclical object or array references are replaced with null.
     * If a whitelist is provided, only matching object keys will be included.
     * If a depth limit is provided, objects and arrays at that depth will
     * be stringified as empty.
     * @method stringify
     * @param o {MIXED} any arbitrary object to convert to JSON string
     * @param w {Array|Function} (optional) whitelist of acceptable object keys to include OR a function(value,key) to alter values before serialization
     * @param d {number} (optional) depth limit to recurse objects/arrays (practical minimum 1)
     * @return {string} JSON string representation of the input
     * @static
     */
    stringify : function (o,w,d) {
        if (o !== undefined) {
            // Ensure whitelist keys are unique (bug 2110391)
            if (l.isArray(w)) {
                w = (function (a) {
                    var uniq=[],map={},v,i,j,len;
                    for (i=0,j=0,len=a.length; i<len; ++i) {
                        v = a[i];
                        if (typeof v === 'string' && map[v] === undefined) {
                            uniq[(map[v] = j++)] = v;
                        }
                    }
                    return uniq;
                })(w);
            }

            // Default depth to POSITIVE_INFINITY
            d = d >= 0 ? d : 1/0;

            // process the input
            return _stringify({'':o},'',d,w,[]);
        }

        return undefined;
    },

    /**
     * Serializes a Date instance as a UTC date string.  Used internally by
     * stringify.  Override this method if you need Dates serialized in a
     * different format.
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
            _zeroPad(d.getUTCHours())     + ':' +
            _zeroPad(d.getUTCMinutes())   + ':' +
            _zeroPad(d.getUTCSeconds())   + 'Z';
    },

    /**
     * Reconstitute Date instances from the default JSON UTC serialization.
     * Reference this from a reviver function to rebuild Dates during the
     * parse operation.
     * @method stringToDate
     * @param str {String} String serialization of a Date
     * @return {Date}
     */
    stringToDate : function (str) {
        if (/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/.test(str)) {
            var d = new Date();
            d.setUTCFullYear(RegExp.$1, (RegExp.$2|0)-1, RegExp.$3);
            d.setUTCHours(RegExp.$4, RegExp.$5, RegExp.$6);
            return d;
        }
        return str;
    }
};

})();
YAHOO.register("json", YAHOO.lang.JSON, {version: "2.7.0r2", build: "1799"});
