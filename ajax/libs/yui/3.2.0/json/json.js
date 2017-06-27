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
function fromGlobal(ref) {
    return (Y.config.win || this || {})[ref];
}


    /**
     * Alias to native browser implementation of the JSON object if available.
     *
     * @property Native
     * @type {Object}
     * @private
     */
var _JSON  = fromGlobal('JSON'),
    // Create an indirect reference to eval to allow for minification
    _eval  = fromGlobal('eval'),
    Native = (Object.prototype.toString.call(_JSON) === '[object JSON]' && _JSON),
    useNative = !!Native,

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
     * @property _UNSAFE
     * @type {RegExp}
     * @private
     */
    _UNSAFE = /[^\],:{}\s]/,
    
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
        // Replace certain Unicode characters that are otherwise handled
        // incorrectly by some browser implementations.
        // NOTE: This modifies the input if such characters are found!
        s = s.replace(_UNICODE_EXCEPTIONS, _escapeException);
        
        // Test for any remaining invalid characters
        if (!_UNSAFE.test(s.replace(_ESCAPES,'@').
                            replace(_VALUES,']').
                            replace(_BRACKETS,''))) {

            // Eval the text into a JavaScript data structure, apply any
            // reviver function, and return
            return _revive( _eval('(' + s + ')'), reviver );
        }

        throw new SyntaxError('JSON.parse');
    };
    
Y.namespace('JSON').parse = function (s,reviver) {
        if (typeof s !== 'string') {
            s += '';
        }

        return Native && Y.JSON.useNativeParse ?
            Native.parse(s,reviver) : _parse(s,reviver);
};

function workingNative( k, v ) {
    return k === "ok" ? true : v;
}

// Double check basic functionality.  This is mainly to catch early broken
// implementations of the JSON API in Firefox 3.1 beta1 and beta2
if ( Native ) {
    try {
        useNative = ( Native.parse( '{"ok":false}', workingNative ) ).ok;
    }
    catch ( e ) {
        useNative = false;
    }
}

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
Y.JSON.useNativeParse = useNative;


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
var _JSON     = (Y.config.win || {}).JSON,
    Lang      = Y.Lang,
    isFunction= Lang.isFunction,
    isObject  = Lang.isObject,
    isArray   = Lang.isArray,
    _toStr    = Object.prototype.toString,
    Native    = (_toStr.call(_JSON) === '[object JSON]' && _JSON),
    useNative = !!Native,
    UNDEFINED = 'undefined',
    OBJECT    = 'object',
    NULL      = 'null',
    STRING    = 'string',
    NUMBER    = 'number',
    BOOLEAN   = 'boolean',
    DATE      = 'date',
    _allowable= {
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
    QUOTE     = '"',

    // Regex used to capture characters that need escaping before enclosing
    // their containing string in quotes.
    _SPECIAL_CHARS = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,

    // Character substitution map for common escapes and special characters.
    _CHARS = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    };


// Utility function used to determine how to serialize a variable.
function _type(o) {
    var t = typeof o;
    return  _allowable[t] ||              // number, string, boolean, undefined
            _allowable[_toStr.call(o)] || // Number, String, Boolean, Date
            (t === OBJECT ?
                (o ? OBJECT : NULL) :     // object, array, null, misc natives
                UNDEFINED);               // function, unknown
}

// Escapes a special character to a safe Unicode representation
function _char(c) {
    if (!_CHARS[c]) {
        _CHARS[c] =  '\\u'+('0000'+(+(c.charCodeAt(0))).toString(16)).slice(-4);
    }
    return _CHARS[c];
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
        _date    = Y.JSON.dateToString,
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
                if (keys.hasOwnProperty(k)) {
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

// Double check basic native functionality.  This is primarily to catch broken
// early JSON API implementations in Firefox 3.1 beta1 and beta2.
if ( Native ) {
    try {
        useNative = ( '0' === Native.stringify(0) );
    } catch ( e ) {
        useNative = false;
    }
}

Y.mix(Y.namespace('JSON'),{
    /**
     * Leverage native JSON stringify if the browser has a native
     * implementation.  In general, this is a good idea.  See the Known Issues
     * section in the JSON user guide for caveats.  The default value is true
     * for browsers with native JSON support.
     *
     * @property JSON.useNativeStringify
     * @type Boolean
     * @default true
     * @static
     */
    useNativeStringify : useNative,

    /**
     * Serializes a Date instance as a UTC date string.  Used internally by
     * stringify.  Override this method if you need Dates serialized in a
     * different format.
     *
     * @method dateToString
     * @param d {Date} The Date to serialize
     * @return {String} stringified Date in UTC format YYYY-MM-DDTHH:mm:SSZ
     * @deprecated Use a replacer function
     * @static
     */
    dateToString : function (d) {
        function _zeroPad(v) {
            return v < 10 ? '0' + v : v;
        }

        return d.getUTCFullYear()           + '-' +
              _zeroPad(d.getUTCMonth() + 1) + '-' +
              _zeroPad(d.getUTCDate())      + 'T' +
              _zeroPad(d.getUTCHours())     + COLON +
              _zeroPad(d.getUTCMinutes())   + COLON +
              _zeroPad(d.getUTCSeconds())   + 'Z';
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
        return Native && Y.JSON.useNativeStringify ?
            Native.stringify(o,w,ind) : _stringify(o,w,ind);
    }
});


}, '@VERSION@' );


YUI.add('json', function(Y){}, '@VERSION@' ,{use:['json-parse', 'json-stringify']});

