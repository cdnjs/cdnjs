if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["/build/json-stringify/json-stringify.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/json-stringify/json-stringify.js",
    code: []
};
_yuitest_coverage["/build/json-stringify/json-stringify.js"].code=["YUI.add('json-stringify', function(Y) {","","/**"," * Provides Y.JSON.stringify method for converting objects to JSON strings."," *"," * @module json"," * @submodule json-stringify"," * @for JSON"," * @static"," */","var _JSON     = (Y.config.win || {}).JSON,","    Lang      = Y.Lang,","    isFunction= Lang.isFunction,","    isObject  = Lang.isObject,","    isArray   = Lang.isArray,","    _toStr    = Object.prototype.toString,","    Native    = (_toStr.call(_JSON) === '[object JSON]' && _JSON),","    useNative = !!Native,","    UNDEFINED = 'undefined',","    OBJECT    = 'object',","    NULL      = 'null',","    STRING    = 'string',","    NUMBER    = 'number',","    BOOLEAN   = 'boolean',","    DATE      = 'date',","    _allowable= {","        'undefined'        : UNDEFINED,","        'string'           : STRING,","        '[object String]'  : STRING,","        'number'           : NUMBER,","        '[object Number]'  : NUMBER,","        'boolean'          : BOOLEAN,","        '[object Boolean]' : BOOLEAN,","        '[object Date]'    : DATE,","        '[object RegExp]'  : OBJECT","    },","    EMPTY     = '',","    OPEN_O    = '{',","    CLOSE_O   = '}',","    OPEN_A    = '[',","    CLOSE_A   = ']',","    COMMA     = ',',","    COMMA_CR  = \",\\n\",","    CR        = \"\\n\",","    COLON     = ':',","    COLON_SP  = ': ',","    QUOTE     = '\"',","","    // Regex used to capture characters that need escaping before enclosing","    // their containing string in quotes.","    _SPECIAL = /[\\x00-\\x07\\x0b\\x0e-\\x1f\\x7f-\\x9f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]/g,","","    // Character substitution map for common escapes and special characters.","    _COMMON = [","        [/\\\\/g, '\\\\\\\\'],","        [/\\\"/g, '\\\\\"'],","        [/\\x08/g, '\\\\b'],","        [/\\x09/g, '\\\\t'],","        [/\\x0a/g, '\\\\n'],","        [/\\x0c/g, '\\\\f'],","        [/\\x0d/g, '\\\\r']","    ],","    _COMMON_LENGTH = _COMMON.length,","","    // In-process optimization for special character escapes that haven't yet","    // been promoted to _COMMON","    _CHAR = {},","","    // Per-char counter to determine if it's worth fast tracking a special","    // character escape sequence.","    _CHAR_COUNT, _CACHE_THRESHOLD;","","// Utility function used to determine how to serialize a variable.","function _type(o) {","    var t = typeof o;","    return  _allowable[t] ||              // number, string, boolean, undefined","            _allowable[_toStr.call(o)] || // Number, String, Boolean, Date","            (t === OBJECT ?","                (o ? OBJECT : NULL) :     // object, array, null, misc natives","                UNDEFINED);               // function, unknown","}","","// Escapes a special character to a safe Unicode representation","function _char(c) {","    if (!_CHAR[c]) {","        _CHAR[c] = '\\\\u'+('0000'+(+(c.charCodeAt(0))).toString(16)).slice(-4);","        _CHAR_COUNT[c] = 0;","    }","","    // === to avoid this conditional for the remainder of the current operation","    if (++_CHAR_COUNT[c] === _CACHE_THRESHOLD) {","        _COMMON.push([new RegExp(c, 'g'), _CHAR[c]]);","        _COMMON_LENGTH = _COMMON.length;","    }","","    return _CHAR[c];","}","","// Enclose escaped strings in quotes","function _string(s) {","    var i, chr;","","    // Preprocess the string against common characters to avoid function","    // overhead associated with replacement via function.","    for (i = 0; i < _COMMON_LENGTH; i++) {","        chr = _COMMON[i];","        s = s.replace(chr[0], chr[1]);","    }","    ","    // original function replace for the not-as-common set of chars","    return QUOTE + s.replace(_SPECIAL, _char) + QUOTE;","}","","// Adds the provided space to the beginning of every line in the input string","function _indent(s,space) {","    return s.replace(/^/gm, space);","}","","// JavaScript implementation of stringify (see API declaration of stringify)","function _stringify(o,w,space) {","    if (o === undefined) {","        return undefined;","    }","","    var replacer = isFunction(w) ? w : null,","        format   = _toStr.call(space).match(/String|Number/) || [],","        _date    = Y.JSON.dateToString,","        stack    = [],","        tmp,i,len;","","    _CHAR_COUNT      = {};","    _CACHE_THRESHOLD = Y.JSON.charCacheThreshold;","","    if (replacer || !isArray(w)) {","        w = undefined;","    }","","    // Ensure whitelist keys are unique (bug 2110391)","    if (w) {","        tmp = {};","        for (i = 0, len = w.length; i < len; ++i) {","            tmp[w[i]] = true;","        }","        w = tmp;","    }","","    // Per the spec, strings are truncated to 10 characters and numbers","    // are converted to that number of spaces (max 10)","    space = format[0] === 'Number' ?","                new Array(Math.min(Math.max(0,space),10)+1).join(\" \") :","                (space || EMPTY).slice(0,10);","","    function _serialize(h,key) {","        var value = h[key],","            t     = _type(value),","            a     = [],","            colon = space ? COLON_SP : COLON,","            arr, i, keys, k, v;","","        // Per the ECMA 5 spec, toJSON is applied before the replacer is","        // called.  Also per the spec, Date.prototype.toJSON has been added, so","        // Date instances should be serialized prior to exposure to the","        // replacer.  I disagree with this decision, but the spec is the spec.","        if (isObject(value) && isFunction(value.toJSON)) {","            value = value.toJSON(key);","        } else if (t === DATE) {","            value = _date(value);","        }","","        if (isFunction(replacer)) {","            value = replacer.call(h,key,value);","        }","","        if (value !== h[key]) {","            t = _type(value);","        }","","        switch (t) {","            case DATE    : // intentional fallthrough.  Pre-replacer Dates are","                           // serialized in the toJSON stage.  Dates here would","                           // have been produced by the replacer.","            case OBJECT  : break;","            case STRING  : return _string(value);","            case NUMBER  : return isFinite(value) ? value+EMPTY : NULL;","            case BOOLEAN : return value+EMPTY;","            case NULL    : return NULL;","            default      : return undefined;","        }","","        // Check for cyclical references in nested objects","        for (i = stack.length - 1; i >= 0; --i) {","            if (stack[i] === value) {","                throw new Error(\"JSON.stringify. Cyclical reference\");","            }","        }","","        arr = isArray(value);","","        // Add the object to the processing stack","        stack.push(value);","","        if (arr) { // Array","            for (i = value.length - 1; i >= 0; --i) {","                a[i] = _serialize(value, i) || NULL;","            }","        } else {   // Object","            // If whitelist provided, take only those keys","            keys = w || value;","            i = 0;","","            for (k in keys) {","                if (keys.hasOwnProperty(k)) {","                    v = _serialize(value, k);","                    if (v) {","                        a[i++] = _string(k) + colon + v;","                    }","                }","            }","        }","","        // remove the array from the stack","        stack.pop();","","        if (space && a.length) {","            return arr ?","                OPEN_A + CR + _indent(a.join(COMMA_CR), space) + CR + CLOSE_A :","                OPEN_O + CR + _indent(a.join(COMMA_CR), space) + CR + CLOSE_O;","        } else {","            return arr ?","                OPEN_A + a.join(COMMA) + CLOSE_A :","                OPEN_O + a.join(COMMA) + CLOSE_O;","        }","    }","","    // process the input","    return _serialize({'':o},'');","}","","// Double check basic native functionality.  This is primarily to catch broken","// early JSON API implementations in Firefox 3.1 beta1 and beta2.","if ( Native ) {","    try {","        useNative = ( '0' === Native.stringify(0) );","    } catch ( e ) {","        useNative = false;","    }","}","","Y.mix(Y.namespace('JSON'),{","    /**","     * Leverage native JSON stringify if the browser has a native","     * implementation.  In general, this is a good idea.  See the Known Issues","     * section in the JSON user guide for caveats.  The default value is true","     * for browsers with native JSON support.","     *","     * @property useNativeStringify","     * @type Boolean","     * @default true","     * @static","     */","    useNativeStringify : useNative,","","    /**","     * Serializes a Date instance as a UTC date string.  Used internally by","     * stringify.  Override this method if you need Dates serialized in a","     * different format.","     *","     * @method dateToString","     * @param d {Date} The Date to serialize","     * @return {String} stringified Date in UTC format YYYY-MM-DDTHH:mm:SSZ","     * @deprecated Use a replacer function","     * @static","     */","    dateToString : function (d) {","        function _zeroPad(v) {","            return v < 10 ? '0' + v : v;","        }","","        return d.getUTCFullYear()           + '-' +","              _zeroPad(d.getUTCMonth() + 1) + '-' +","              _zeroPad(d.getUTCDate())      + 'T' +","              _zeroPad(d.getUTCHours())     + COLON +","              _zeroPad(d.getUTCMinutes())   + COLON +","              _zeroPad(d.getUTCSeconds())   + 'Z';","    },","","    /**","     * <p>Converts an arbitrary value to a JSON string representation.</p>","     *","     * <p>Objects with cyclical references will trigger an exception.</p>","     *","     * <p>If a whitelist is provided, only matching object keys will be","     * included.  Alternately, a replacer function may be passed as the","     * second parameter.  This function is executed on every value in the","     * input, and its return value will be used in place of the original value.","     * This is useful to serialize specialized objects or class instances.</p>","     *","     * <p>If a positive integer or non-empty string is passed as the third","     * parameter, the output will be formatted with carriage returns and","     * indentation for readability.  If a String is passed (such as \"\\t\") it","     * will be used once for each indentation level.  If a number is passed,","     * that number of spaces will be used.</p>","     *","     * @method stringify","     * @param o {MIXED} any arbitrary value to convert to JSON string","     * @param w {Array|Function} (optional) whitelist of acceptable object","     *                  keys to include, or a replacer function to modify the","     *                  raw value before serialization","     * @param ind {Number|String} (optional) indentation character or depth of","     *                  spaces to format the output.","     * @return {string} JSON string representation of the input","     * @static","     */","    stringify : function (o,w,ind) {","        return Native && Y.JSON.useNativeStringify ?","            Native.stringify(o,w,ind) : _stringify(o,w,ind);","    },","","    /**","     * <p>Number of occurrences of a special character within a single call to","     * stringify that should trigger promotion of that character to a dedicated","     * preprocess step for future calls.  This is only used in environments","     * that don't support native JSON, or when useNativeStringify is set to","     * false.</p>","     *","     * <p>So, if set to 50 and an object is passed to stringify that includes","     * strings containing the special character \\x07 more than 50 times,","     * subsequent calls to stringify will process object strings through a","     * faster serialization path for \\x07 before using the generic, slower,","     * replacement process for all special characters.</p>","     *","     * <p>To prime the preprocessor cache, set this value to 1, then call","     * <code>Y.JSON.stringify(\"<em>(all special characters to","     * cache)</em>\");</code>, then return this setting to a more conservative","     * value.</p>","     *","     * <p>Special characters \\ \" \\b \\t \\n \\f \\r are already cached.</p>","     *","     * @property charCacheThreshold","     * @static","     * @default 100","     * @type {Number}","     */","    charCacheThreshold: 100","});","","","}, '@VERSION@' ,{requires:['yui-base']});"];
_yuitest_coverage["/build/json-stringify/json-stringify.js"].lines = {"1":0,"11":0,"74":0,"75":0,"76":0,"84":0,"85":0,"86":0,"87":0,"91":0,"92":0,"93":0,"96":0,"100":0,"101":0,"105":0,"106":0,"107":0,"111":0,"115":0,"116":0,"120":0,"121":0,"122":0,"125":0,"131":0,"132":0,"134":0,"135":0,"139":0,"140":0,"141":0,"142":0,"144":0,"149":0,"153":0,"154":0,"164":0,"165":0,"166":0,"167":0,"170":0,"171":0,"174":0,"175":0,"178":0,"182":0,"183":0,"184":0,"185":0,"186":0,"187":0,"191":0,"192":0,"193":0,"197":0,"200":0,"202":0,"203":0,"204":0,"208":0,"209":0,"211":0,"212":0,"213":0,"214":0,"215":0,"222":0,"224":0,"225":0,"229":0,"236":0,"241":0,"242":0,"243":0,"245":0,"249":0,"275":0,"276":0,"279":0,"315":0};
_yuitest_coverage["/build/json-stringify/json-stringify.js"].functions = {"_type:74":0,"_char:84":0,"_string:100":0,"_indent:115":0,"_serialize:153":0,"_stringify:120":0,"_zeroPad:275":0,"dateToString:274":0,"stringify:314":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/json-stringify/json-stringify.js"].coveredLines = 81;
_yuitest_coverage["/build/json-stringify/json-stringify.js"].coveredFunctions = 10;
_yuitest_coverline("/build/json-stringify/json-stringify.js", 1);
YUI.add('json-stringify', function(Y) {

/**
 * Provides Y.JSON.stringify method for converting objects to JSON strings.
 *
 * @module json
 * @submodule json-stringify
 * @for JSON
 * @static
 */
_yuitest_coverfunc("/build/json-stringify/json-stringify.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/json-stringify/json-stringify.js", 11);
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
    _SPECIAL = /[\x00-\x07\x0b\x0e-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,

    // Character substitution map for common escapes and special characters.
    _COMMON = [
        [/\\/g, '\\\\'],
        [/\"/g, '\\"'],
        [/\x08/g, '\\b'],
        [/\x09/g, '\\t'],
        [/\x0a/g, '\\n'],
        [/\x0c/g, '\\f'],
        [/\x0d/g, '\\r']
    ],
    _COMMON_LENGTH = _COMMON.length,

    // In-process optimization for special character escapes that haven't yet
    // been promoted to _COMMON
    _CHAR = {},

    // Per-char counter to determine if it's worth fast tracking a special
    // character escape sequence.
    _CHAR_COUNT, _CACHE_THRESHOLD;

// Utility function used to determine how to serialize a variable.
_yuitest_coverline("/build/json-stringify/json-stringify.js", 74);
function _type(o) {
    _yuitest_coverfunc("/build/json-stringify/json-stringify.js", "_type", 74);
_yuitest_coverline("/build/json-stringify/json-stringify.js", 75);
var t = typeof o;
    _yuitest_coverline("/build/json-stringify/json-stringify.js", 76);
return  _allowable[t] ||              // number, string, boolean, undefined
            _allowable[_toStr.call(o)] || // Number, String, Boolean, Date
            (t === OBJECT ?
                (o ? OBJECT : NULL) :     // object, array, null, misc natives
                UNDEFINED);               // function, unknown
}

// Escapes a special character to a safe Unicode representation
_yuitest_coverline("/build/json-stringify/json-stringify.js", 84);
function _char(c) {
    _yuitest_coverfunc("/build/json-stringify/json-stringify.js", "_char", 84);
_yuitest_coverline("/build/json-stringify/json-stringify.js", 85);
if (!_CHAR[c]) {
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 86);
_CHAR[c] = '\\u'+('0000'+(+(c.charCodeAt(0))).toString(16)).slice(-4);
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 87);
_CHAR_COUNT[c] = 0;
    }

    // === to avoid this conditional for the remainder of the current operation
    _yuitest_coverline("/build/json-stringify/json-stringify.js", 91);
if (++_CHAR_COUNT[c] === _CACHE_THRESHOLD) {
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 92);
_COMMON.push([new RegExp(c, 'g'), _CHAR[c]]);
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 93);
_COMMON_LENGTH = _COMMON.length;
    }

    _yuitest_coverline("/build/json-stringify/json-stringify.js", 96);
return _CHAR[c];
}

// Enclose escaped strings in quotes
_yuitest_coverline("/build/json-stringify/json-stringify.js", 100);
function _string(s) {
    _yuitest_coverfunc("/build/json-stringify/json-stringify.js", "_string", 100);
_yuitest_coverline("/build/json-stringify/json-stringify.js", 101);
var i, chr;

    // Preprocess the string against common characters to avoid function
    // overhead associated with replacement via function.
    _yuitest_coverline("/build/json-stringify/json-stringify.js", 105);
for (i = 0; i < _COMMON_LENGTH; i++) {
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 106);
chr = _COMMON[i];
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 107);
s = s.replace(chr[0], chr[1]);
    }
    
    // original function replace for the not-as-common set of chars
    _yuitest_coverline("/build/json-stringify/json-stringify.js", 111);
return QUOTE + s.replace(_SPECIAL, _char) + QUOTE;
}

// Adds the provided space to the beginning of every line in the input string
_yuitest_coverline("/build/json-stringify/json-stringify.js", 115);
function _indent(s,space) {
    _yuitest_coverfunc("/build/json-stringify/json-stringify.js", "_indent", 115);
_yuitest_coverline("/build/json-stringify/json-stringify.js", 116);
return s.replace(/^/gm, space);
}

// JavaScript implementation of stringify (see API declaration of stringify)
_yuitest_coverline("/build/json-stringify/json-stringify.js", 120);
function _stringify(o,w,space) {
    _yuitest_coverfunc("/build/json-stringify/json-stringify.js", "_stringify", 120);
_yuitest_coverline("/build/json-stringify/json-stringify.js", 121);
if (o === undefined) {
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 122);
return undefined;
    }

    _yuitest_coverline("/build/json-stringify/json-stringify.js", 125);
var replacer = isFunction(w) ? w : null,
        format   = _toStr.call(space).match(/String|Number/) || [],
        _date    = Y.JSON.dateToString,
        stack    = [],
        tmp,i,len;

    _yuitest_coverline("/build/json-stringify/json-stringify.js", 131);
_CHAR_COUNT      = {};
    _yuitest_coverline("/build/json-stringify/json-stringify.js", 132);
_CACHE_THRESHOLD = Y.JSON.charCacheThreshold;

    _yuitest_coverline("/build/json-stringify/json-stringify.js", 134);
if (replacer || !isArray(w)) {
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 135);
w = undefined;
    }

    // Ensure whitelist keys are unique (bug 2110391)
    _yuitest_coverline("/build/json-stringify/json-stringify.js", 139);
if (w) {
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 140);
tmp = {};
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 141);
for (i = 0, len = w.length; i < len; ++i) {
            _yuitest_coverline("/build/json-stringify/json-stringify.js", 142);
tmp[w[i]] = true;
        }
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 144);
w = tmp;
    }

    // Per the spec, strings are truncated to 10 characters and numbers
    // are converted to that number of spaces (max 10)
    _yuitest_coverline("/build/json-stringify/json-stringify.js", 149);
space = format[0] === 'Number' ?
                new Array(Math.min(Math.max(0,space),10)+1).join(" ") :
                (space || EMPTY).slice(0,10);

    _yuitest_coverline("/build/json-stringify/json-stringify.js", 153);
function _serialize(h,key) {
        _yuitest_coverfunc("/build/json-stringify/json-stringify.js", "_serialize", 153);
_yuitest_coverline("/build/json-stringify/json-stringify.js", 154);
var value = h[key],
            t     = _type(value),
            a     = [],
            colon = space ? COLON_SP : COLON,
            arr, i, keys, k, v;

        // Per the ECMA 5 spec, toJSON is applied before the replacer is
        // called.  Also per the spec, Date.prototype.toJSON has been added, so
        // Date instances should be serialized prior to exposure to the
        // replacer.  I disagree with this decision, but the spec is the spec.
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 164);
if (isObject(value) && isFunction(value.toJSON)) {
            _yuitest_coverline("/build/json-stringify/json-stringify.js", 165);
value = value.toJSON(key);
        } else {_yuitest_coverline("/build/json-stringify/json-stringify.js", 166);
if (t === DATE) {
            _yuitest_coverline("/build/json-stringify/json-stringify.js", 167);
value = _date(value);
        }}

        _yuitest_coverline("/build/json-stringify/json-stringify.js", 170);
if (isFunction(replacer)) {
            _yuitest_coverline("/build/json-stringify/json-stringify.js", 171);
value = replacer.call(h,key,value);
        }

        _yuitest_coverline("/build/json-stringify/json-stringify.js", 174);
if (value !== h[key]) {
            _yuitest_coverline("/build/json-stringify/json-stringify.js", 175);
t = _type(value);
        }

        _yuitest_coverline("/build/json-stringify/json-stringify.js", 178);
switch (t) {
            case DATE    : // intentional fallthrough.  Pre-replacer Dates are
                           // serialized in the toJSON stage.  Dates here would
                           // have been produced by the replacer.
            case OBJECT  : _yuitest_coverline("/build/json-stringify/json-stringify.js", 182);
break;
            case STRING  : _yuitest_coverline("/build/json-stringify/json-stringify.js", 183);
return _string(value);
            case NUMBER  : _yuitest_coverline("/build/json-stringify/json-stringify.js", 184);
return isFinite(value) ? value+EMPTY : NULL;
            case BOOLEAN : _yuitest_coverline("/build/json-stringify/json-stringify.js", 185);
return value+EMPTY;
            case NULL    : _yuitest_coverline("/build/json-stringify/json-stringify.js", 186);
return NULL;
            default      : _yuitest_coverline("/build/json-stringify/json-stringify.js", 187);
return undefined;
        }

        // Check for cyclical references in nested objects
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 191);
for (i = stack.length - 1; i >= 0; --i) {
            _yuitest_coverline("/build/json-stringify/json-stringify.js", 192);
if (stack[i] === value) {
                _yuitest_coverline("/build/json-stringify/json-stringify.js", 193);
throw new Error("JSON.stringify. Cyclical reference");
            }
        }

        _yuitest_coverline("/build/json-stringify/json-stringify.js", 197);
arr = isArray(value);

        // Add the object to the processing stack
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 200);
stack.push(value);

        _yuitest_coverline("/build/json-stringify/json-stringify.js", 202);
if (arr) { // Array
            _yuitest_coverline("/build/json-stringify/json-stringify.js", 203);
for (i = value.length - 1; i >= 0; --i) {
                _yuitest_coverline("/build/json-stringify/json-stringify.js", 204);
a[i] = _serialize(value, i) || NULL;
            }
        } else {   // Object
            // If whitelist provided, take only those keys
            _yuitest_coverline("/build/json-stringify/json-stringify.js", 208);
keys = w || value;
            _yuitest_coverline("/build/json-stringify/json-stringify.js", 209);
i = 0;

            _yuitest_coverline("/build/json-stringify/json-stringify.js", 211);
for (k in keys) {
                _yuitest_coverline("/build/json-stringify/json-stringify.js", 212);
if (keys.hasOwnProperty(k)) {
                    _yuitest_coverline("/build/json-stringify/json-stringify.js", 213);
v = _serialize(value, k);
                    _yuitest_coverline("/build/json-stringify/json-stringify.js", 214);
if (v) {
                        _yuitest_coverline("/build/json-stringify/json-stringify.js", 215);
a[i++] = _string(k) + colon + v;
                    }
                }
            }
        }

        // remove the array from the stack
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 222);
stack.pop();

        _yuitest_coverline("/build/json-stringify/json-stringify.js", 224);
if (space && a.length) {
            _yuitest_coverline("/build/json-stringify/json-stringify.js", 225);
return arr ?
                OPEN_A + CR + _indent(a.join(COMMA_CR), space) + CR + CLOSE_A :
                OPEN_O + CR + _indent(a.join(COMMA_CR), space) + CR + CLOSE_O;
        } else {
            _yuitest_coverline("/build/json-stringify/json-stringify.js", 229);
return arr ?
                OPEN_A + a.join(COMMA) + CLOSE_A :
                OPEN_O + a.join(COMMA) + CLOSE_O;
        }
    }

    // process the input
    _yuitest_coverline("/build/json-stringify/json-stringify.js", 236);
return _serialize({'':o},'');
}

// Double check basic native functionality.  This is primarily to catch broken
// early JSON API implementations in Firefox 3.1 beta1 and beta2.
_yuitest_coverline("/build/json-stringify/json-stringify.js", 241);
if ( Native ) {
    _yuitest_coverline("/build/json-stringify/json-stringify.js", 242);
try {
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 243);
useNative = ( '0' === Native.stringify(0) );
    } catch ( e ) {
        _yuitest_coverline("/build/json-stringify/json-stringify.js", 245);
useNative = false;
    }
}

_yuitest_coverline("/build/json-stringify/json-stringify.js", 249);
Y.mix(Y.namespace('JSON'),{
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
        _yuitest_coverfunc("/build/json-stringify/json-stringify.js", "dateToString", 274);
_yuitest_coverline("/build/json-stringify/json-stringify.js", 275);
function _zeroPad(v) {
            _yuitest_coverfunc("/build/json-stringify/json-stringify.js", "_zeroPad", 275);
_yuitest_coverline("/build/json-stringify/json-stringify.js", 276);
return v < 10 ? '0' + v : v;
        }

        _yuitest_coverline("/build/json-stringify/json-stringify.js", 279);
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
        _yuitest_coverfunc("/build/json-stringify/json-stringify.js", "stringify", 314);
_yuitest_coverline("/build/json-stringify/json-stringify.js", 315);
return Native && Y.JSON.useNativeStringify ?
            Native.stringify(o,w,ind) : _stringify(o,w,ind);
    },

    /**
     * <p>Number of occurrences of a special character within a single call to
     * stringify that should trigger promotion of that character to a dedicated
     * preprocess step for future calls.  This is only used in environments
     * that don't support native JSON, or when useNativeStringify is set to
     * false.</p>
     *
     * <p>So, if set to 50 and an object is passed to stringify that includes
     * strings containing the special character \x07 more than 50 times,
     * subsequent calls to stringify will process object strings through a
     * faster serialization path for \x07 before using the generic, slower,
     * replacement process for all special characters.</p>
     *
     * <p>To prime the preprocessor cache, set this value to 1, then call
     * <code>Y.JSON.stringify("<em>(all special characters to
     * cache)</em>");</code>, then return this setting to a more conservative
     * value.</p>
     *
     * <p>Special characters \ " \b \t \n \f \r are already cached.</p>
     *
     * @property charCacheThreshold
     * @static
     * @default 100
     * @type {Number}
     */
    charCacheThreshold: 100
});


}, '@VERSION@' ,{requires:['yui-base']});
