YUI.add('json-stringify', function(Y) {

/**
 * Provides Y.JSON.stringify method for converting objects to JSON strings.
 * @module json
 * @submodule json-stringify
 * @for JSON
 * @static
 */
var _toString = Object.prototype.toString,
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
    QUOTE     = '"';

Y.mix(Y.namespace('JSON'),{
    /**
     * Regex used to capture characters that need escaping before enclosing
     * their containing string in quotes.
     * @property _SPECIAL_CHARS
     * @type {RegExp}
     * @private
     */
    _SPECIAL_CHARS : /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,

    /**
     * Character substitution map for common escapes and special characters.
     * @property _CHARS
     * @type {Object}
     * @static
     * @private
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
     * Converts an arbitrary value to a JSON string representation.
     * Cyclical object or array references are replaced with null.
     * If a whitelist is provided, only matching object keys will be included.
     * If a positive integer or non-empty string is passed as the third
     * parameter, the output will be formatted with carriage returns and
     * indentation for readability.  If a String is passed (such as "\t") it
     * will be used once for each indentation level.  If a number is passed,
     * that number of spaces will be used.
     * @method stringify
     * @param o {MIXED} any arbitrary object to convert to JSON string
     * @param w {Array|Function} (optional) whitelist of acceptable object
     *                  keys to include, or a replacer function to modify the
     *                  raw value before serialization
     * @param ind {Number|String} (optional) indentation character or depth of
     *                  spaces to format the output.
     * @return {string} JSON string representation of the input
     * @static
     * @public
     */
    stringify : function (o,w,ind) {

        var m      = Y.JSON._CHARS,
            str_re = Y.JSON._SPECIAL_CHARS,
            rep    = Y.Lang.isFunction(w) ? w : null,
            pstack = [], // Processing stack used for cyclical ref protection
            _date  = Y.JSON.dateToString; // Use configured date serialization

        if (rep || typeof w !== 'object') {
            w = undefined;
        }

        if (ind) {
            ind = Y.Lang.isNumber(ind) ? new Array(ind+1).join(" ") :
                  Y.Lang.isString(ind) ? ind :
                  null;
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

            var a = [], i, j, len, k, v;

            if (arr) { // Array
                for (i = o.length - 1; i >= 0; --i) {
                    a[i] = _stringify(o,i) || NULL;
                }
            } else {   // Object
                // If whitelist provided, take only those keys
                k = Y.Lang.isArray(w) ? w : Y.Object.keys(w || o);

                for (i = 0, j = 0, len = k.length; i < len; ++i) {
                    if (typeof k[i] === STRING) {
                        v = _stringify(o,k[i]);
                        if (v) {
                            a[j++] = _string(k[i]) + COLON + v;
                        }
                    }
                }
            }

            // remove the array from the stack
            pstack.pop();

            if (ind) {
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
            var o = Y.Lang.isFunction(rep) ? rep.call(h,key,h[key]) : h[key],
                t = Y.Lang.type(o);

            if (t === OBJECT) {
                if (/String|Number|Boolean/.test(_toString.call(o))) {
                    o = o.valueOf();
                    t = Y.Lang.type(o);
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
