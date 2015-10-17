YUI.add('json-parse', function(Y) {

/**
 * <p>The JSON module adds support for serializing JavaScript objects into
 * JSON strings and parsing JavaScript objects from strings in JSON format.</p>
 *
 * <p>The JSON namespace is added to your YUI instance including static methods
 * Y.JSON.parse(..) and Y.JSON.stringify(..).</p>
 *
 * <p>The functionality and method signatures follow the ECMAScript 5
 * specification.  In browsers with native JSON support, the native
 * implementation is used.</p>
 *
 * <p>The <code>json</code> module is a rollup of <code>json-parse</code> and
 * <code>json-stringify</code>.</p>
 * 
 * <p>As their names suggest, <code>json-parse</code> adds support for parsing
 * JSON data (Y.JSON.parse) and <code>json-stringify</code> for serializing
 * JavaScript data into JSON strings (Y.JSON.stringify).  You may choose to
 * include either of the submodules individually if you don't need the
 * complementary functionality, or include the rollup for both.</p>
 *
 * @module json
 * @class JSON
 * @static
 */

/**
 * Provides Y.JSON.parse method to accept JSON strings and return native
 * JavaScript objects.
 *
 * @module json
 * @submodule json-parse
 * @for JSON
 * @static
 */


// All internals kept private for security reasons


    /**
     * Alias to native browser implementation of the JSON object if available.
     *
     * @property Native
     * @type {Object}
     * @private
     */
var Native = Y.config.win.JSON,

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
     * @private
     */
    _ESCAPES = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,

    /**
     * Second step in the safety evaluation.  Regex used to replace all simple
     * values with ']' characters.
     *
     * @property _VALUES
     * @type {RegExp}
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
     * @private
     */
    _BRACKETS = /(?:^|:|,)(?:\s*\[)+/g,

    /**
     * Final step in the safety evaluation.  Regex used to test the string left
     * after all previous replacements for invalid characters.
     *
     * @property _INVALID
     * @type {RegExp}
     * @private
     */
    _INVALID = /[^\],:{}\s]/,
    
    /**
     * Test for JSON string of simple data string, number, boolean, or null.
     * E.g. '"some string"', "true", "false", "null", or numbers "-123e+7"
     * This was needed for some WIP native implementations (FF3.1b2) but may be
     * unnecessary now.
     *
     * @property _SIMPLE
     * @type {RegExp}
     * @private
     */
    _SIMPLE = /^\s*(?:"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)\s*$/,

    /**
     * Replaces specific unicode characters with their appropriate \unnnn
     * format. Some browsers ignore certain characters during eval.
     *
     * @method escapeException
     * @param c {String} Unicode character
     * @return {String} the \unnnn escapement of the character
     * @private
     */
    _escapeException = function (c) {
        return '\\u'+('0000'+(+(c.charCodeAt(0))).toString(16)).slice(-4);
    },

    /**
     * Traverses nested objects, applying a reviver function to each (key,value)
     * from the scope if the key:value's containing object.  The value returned
     * from the function will replace the original value in the key:value pair.
     * If the value returned is undefined, the key will be omitted from the
     * returned object.
     *
     * @method _revive
     * @param data {MIXED} Any JavaScript data
     * @param reviver {Function} filter or mutation function
     * @return {MIXED} The results of the filtered data
     * @private
     */
    _revive = function (data, reviver) {
        var walk = function (o,key) {
            var k,v,value = o[key];
            if (value && typeof value === 'object') {
                for (k in value) {
                    if (value.hasOwnProperty(k)) {
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
    },

    /**
     * Parse a JSON string, returning the native JavaScript representation.
     *
     * @param s {string} JSON string data
     * @param reviver {function} (optional) function(k,v) passed each key value
     *          pair of object literals, allowing pruning or altering values
     * @return {MIXED} the native JavaScript representation of the JSON string
     * @throws SyntaxError
     * @method parse
     * @static
     */
    // JavaScript implementation in lieu of native browser support.  Based on
    // the json2.js library from http://json.org
    _parse = function (s,reviver) {
        if (typeof s === 'string') {
            // Replace certain Unicode characters that are otherwise handled
            // incorrectly by some browser implementations.
            // NOTE: This modifies the input if such characters are found!
            s = s.replace(_UNICODE_EXCEPTIONS, _escapeException);
            
            // Test for any remaining invalid characters
            if (!_INVALID.test(s.replace(_ESCAPES,'@').
                                 replace(_VALUES,']').
                                 replace(_BRACKETS,''))) {

                // Eval the text into a JavaScript data structure, apply any
                // reviver function, and return
                return _revive( eval('(' + s + ')'), reviver );
            }
        }

        throw new SyntaxError('JSON.parse');
    },
    
    test;


// Test the level of native browser support
if (Native && Object.prototype.toString.call(Native) === '[object JSON]') {
    try {
        test = Native.parse('{"x":1}', function (k,v) {return k=='x' ? 2 : v;});
        switch (test.x) {
            case 1 : // Reviver not supported
                _parse = function (s,reviver) {
                    return _SIMPLE.test(s) ?
                            eval('(' + s + ')') :
                            _revive(Native.parse(s), reviver);
                };
                break;

            case 2 : // Full support
                _parse = function (s, reviver) {
                    return Native.parse(s, reviver);
                };
                break;

            // default is JS implementation
        }
    }
    catch (e) {} // defer to JS implementation
}

Y.mix(Y.namespace('JSON'),{ parse : _parse });


}, '@VERSION@' );
YUI.add('json-stringify', function(Y) {

/**
 * Provides Y.JSON.stringify method for converting objects to JSON strings.
 *
 * @module json
 * @submodule json-stringify
 * @for JSON
 * @static
 */
var _toString = Object.prototype.toString,
    Lang      = Y.Lang,
    isFunction= Lang.isFunction,
    isArray   = Lang.isArray,
    type      = Lang.type,
    STRING    = 'string',
    NUMBER    = 'number',
    BOOLEAN   = 'boolean',
    OBJECT    = 'object',
    ARRAY     = 'array',
    REGEXP    = 'regexp',
    ERROR     = 'error',
    NULL      = 'null',
    DATE      = 'date',
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

Y.mix(Y.namespace('JSON'),{
    /**
     * Regex used to capture characters that need escaping before enclosing
     * their containing string in quotes.
     *
     * @property _SPECIAL_CHARS
     * @type {RegExp}
     * @protected
     */
    _SPECIAL_CHARS : /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,

    /**
     * Character substitution map for common escapes and special characters.
     *
     * @property _CHARS
     * @type {Object}
     * @static
     * @protected
     */
    _CHARS : {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    },

    /**
     * Serializes a Date instance as a UTC date string.  Used internally by
     * stringify.  Override this method if you need Dates serialized in a
     * different format.
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

        return QUOTE + d.getUTCFullYear()   + '-' +
              _zeroPad(d.getUTCMonth() + 1) + '-' +
              _zeroPad(d.getUTCDate())      + 'T' +
              _zeroPad(d.getUTCHours())     + COLON +
              _zeroPad(d.getUTCMinutes())   + COLON +
              _zeroPad(d.getUTCSeconds())   + 'Z' + QUOTE;
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
     * @method stringify
     * @param o {MIXED} any arbitrary value to convert to JSON string
     * @param w {Array|Function} (optional) whitelist of acceptable object
     *                  keys to include, or a replacer function to modify the
     *                  raw value before serialization
     * @param ind {Number|String} (optional) indentation character or depth of
     *                  spaces to format the output.
     * @return {string} JSON string representation of the input
     * @static
     */
    stringify : function (o,w,ind) {

        var m      = Y.JSON._CHARS,
            str_re = Y.JSON._SPECIAL_CHARS,
            rep    = isFunction(w) ? w : null,
            pstack = [], // Processing stack used for cyclical ref protection
            _date  = Y.JSON.dateToString, // Use configured date serialization
            format = _toString.call(ind).match(/String|Number/);

        if (rep || typeof w !== 'object') {
            w = undefined;
        }

        if (format) {
            // String instances and primatives are left alone.  String objects
            // coerce for the indenting operations.
            if (format[0] === 'Number') {

                // force numeric indent values between {0,100} per the spec
                // This also converts Number instances to primative
                ind = new Array(Math.min(Math.max(0,ind),100)+1).join(" ");
            }

            // turn off formatting for 0 or empty string
            format = ind;
        }

        // escape encode special characters
        function _char(c) {
            if (!m[c]) {
                m[c]='\\u'+('0000'+(+(c.charCodeAt(0))).toString(16)).slice(-4);
            }
            return m[c];
        }

        // Enclose the escaped string in double quotes
        function _string(s) {
            return QUOTE + s.replace(str_re, _char) + QUOTE;
        }

        // Check for cyclical references
        function _cyclicalTest(o) {
            for (var i = pstack.length - 1; i >= 0; --i) {
                if (pstack[i] === o) {
                    throw new Error("JSON.stringify. Cyclical reference");
                }
            }
            return false;
        }

        function _indent(s) {
            return s.replace(/^/gm,ind);
        }

        function _object(o,arr) {
            // Add the object to the processing stack
            pstack.push(o);

            var a = [],
                colon = format ? COLON_SP : COLON,
                i, j, len, k, v;

            if (arr) { // Array
                for (i = o.length - 1; i >= 0; --i) {
                    a[i] = _stringify(o,i) || NULL;
                }
            } else {   // Object
                // If whitelist provided, take only those keys
                k = isArray(w) ? w : Y.Object.keys(o);

                for (i = 0, j = 0, len = k.length; i < len; ++i) {
                    if (typeof k[i] === STRING) {
                        v = _stringify(o,k[i]);
                        if (v) {
                            a[j++] = _string(k[i]) + colon + v;
                        }
                    }
                }
            }

            // remove the array from the stack
            pstack.pop();

            if (format && a.length) {
                return arr ?
                    OPEN_A + CR + _indent(a.join(COMMA_CR)) + CR + CLOSE_A :
                    OPEN_O + CR + _indent(a.join(COMMA_CR)) + CR + CLOSE_O;
            } else {
                return arr ?
                    OPEN_A + a.join(COMMA) + CLOSE_A :
                    OPEN_O + a.join(COMMA) + CLOSE_O;
            }
        }

        // Worker function.  Fork behavior on data type and recurse objects.
        function _stringify(h,key) {
            var o = isFunction(rep) ? rep.call(h,key,h[key]) : h[key],
                t = type(o);

            if (t === OBJECT) {
                if (/String|Number|Boolean/.test(_toString.call(o))) {
                    o = o.valueOf();
                    t = type(o);
                }
            }

            switch (t) {
                case STRING  : return _string(o);
                case NUMBER  : return isFinite(o) ? o+EMPTY : NULL;
                case BOOLEAN : return o+EMPTY;
                case DATE    : return _date(o);
                case NULL    : return NULL;
                case ARRAY   : _cyclicalTest(o); return _object(o,true);
                case REGEXP  : // intentional fall through
                case ERROR   : // intentional fall through
                case OBJECT  : _cyclicalTest(o); return _object(o);
                default      : return undefined;
            }
        }

        // process the input
        return _stringify({'':o},EMPTY);
    }
});


}, '@VERSION@' );


YUI.add('json', function(Y){}, '@VERSION@' ,{use:['json-parse', 'json-stringify']});

