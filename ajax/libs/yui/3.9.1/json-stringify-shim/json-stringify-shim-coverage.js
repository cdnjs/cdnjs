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
_yuitest_coverage["build/json-stringify-shim/json-stringify-shim.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/json-stringify-shim/json-stringify-shim.js",
    code: []
};
_yuitest_coverage["build/json-stringify-shim/json-stringify-shim.js"].code=["YUI.add('json-stringify-shim', function (Y, NAME) {","","// All internals kept private for security reasons","var Lang      = Y.Lang,","    isFunction= Lang.isFunction,","    isObject  = Lang.isObject,","    isArray   = Lang.isArray,","    _toStr    = Object.prototype.toString,","    UNDEFINED = 'undefined',","    OBJECT    = 'object',","    NULL      = 'null',","    STRING    = 'string',","    NUMBER    = 'number',","    BOOLEAN   = 'boolean',","    DATE      = 'date',","    _allowable= {","        'undefined'        : UNDEFINED,","        'string'           : STRING,","        '[object String]'  : STRING,","        'number'           : NUMBER,","        '[object Number]'  : NUMBER,","        'boolean'          : BOOLEAN,","        '[object Boolean]' : BOOLEAN,","        '[object Date]'    : DATE,","        '[object RegExp]'  : OBJECT","    },","    EMPTY     = '',","    OPEN_O    = '{',","    CLOSE_O   = '}',","    OPEN_A    = '[',","    CLOSE_A   = ']',","    COMMA     = ',',","    COMMA_CR  = \",\\n\",","    CR        = \"\\n\",","    COLON     = ':',","    COLON_SP  = ': ',","    QUOTE     = '\"',","","    // Regex used to capture characters that need escaping before enclosing","    // their containing string in quotes.","    _SPECIAL = /[\\x00-\\x07\\x0b\\x0e-\\x1f\\x7f-\\x9f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]/g,","","    // Character substitution map for common escapes and special characters.","    _COMMON = [","        [/\\\\/g, '\\\\\\\\'],","        [/\\\"/g, '\\\\\"'],","        [/\\x08/g, '\\\\b'],","        [/\\x09/g, '\\\\t'],","        [/\\x0a/g, '\\\\n'],","        [/\\x0c/g, '\\\\f'],","        [/\\x0d/g, '\\\\r']","    ],","    _COMMON_LENGTH = _COMMON.length,","","    // In-process optimization for special character escapes that haven't yet","    // been promoted to _COMMON","    _CHAR = {},","","    // Per-char counter to determine if it's worth fast tracking a special","    // character escape sequence.","    _CHAR_COUNT, _CACHE_THRESHOLD;","","// Utility function used to determine how to serialize a variable.","function _type(o) {","    var t = typeof o;","    return  _allowable[t] ||              // number, string, boolean, undefined","            _allowable[_toStr.call(o)] || // Number, String, Boolean, Date","            (t === OBJECT ?","                (o ? OBJECT : NULL) :     // object, array, null, misc natives","                UNDEFINED);               // function, unknown","}","","// Escapes a special character to a safe Unicode representation","function _char(c) {","    if (!_CHAR[c]) {","        _CHAR[c] = '\\\\u'+('0000'+(+(c.charCodeAt(0))).toString(16)).slice(-4);","        _CHAR_COUNT[c] = 0;","    }","","    // === to avoid this conditional for the remainder of the current operation","    if (++_CHAR_COUNT[c] === _CACHE_THRESHOLD) {","        _COMMON.push([new RegExp(c, 'g'), _CHAR[c]]);","        _COMMON_LENGTH = _COMMON.length;","    }","","    return _CHAR[c];","}","","// Enclose escaped strings in quotes","function _string(s) {","    var i, chr;","","    // Preprocess the string against common characters to avoid function","    // overhead associated with replacement via function.","    for (i = 0; i < _COMMON_LENGTH; i++) {","        chr = _COMMON[i];","        s = s.replace(chr[0], chr[1]);","    }","    ","    // original function replace for the not-as-common set of chars","    return QUOTE + s.replace(_SPECIAL, _char) + QUOTE;","}","","// Adds the provided space to the beginning of every line in the input string","function _indent(s,space) {","    return s.replace(/^/gm, space);","}","","Y.JSON.stringify = function _stringify(o,w,space) {","    if (o === undefined) {","        return undefined;","    }","","    var replacer = isFunction(w) ? w : null,","        format   = _toStr.call(space).match(/String|Number/) || [],","        _date    = Y.JSON.dateToString,","        stack    = [],","        tmp,i,len;","","    _CHAR_COUNT      = {};","    _CACHE_THRESHOLD = Y.JSON.charCacheThreshold;","","    if (replacer || !isArray(w)) {","        w = undefined;","    }","","    // Ensure whitelist keys are unique (bug 2110391)","    if (w) {","        tmp = {};","        for (i = 0, len = w.length; i < len; ++i) {","            tmp[w[i]] = true;","        }","        w = tmp;","    }","","    // Per the spec, strings are truncated to 10 characters and numbers","    // are converted to that number of spaces (max 10)","    space = format[0] === 'Number' ?","                new Array(Math.min(Math.max(0,space),10)+1).join(\" \") :","                (space || EMPTY).slice(0,10);","","    function _serialize(h,key) {","        var value = h[key],","            t     = _type(value),","            a     = [],","            colon = space ? COLON_SP : COLON,","            arr, i, keys, k, v;","","        // Per the ECMA 5 spec, toJSON is applied before the replacer is","        // called.  Also per the spec, Date.prototype.toJSON has been added, so","        // Date instances should be serialized prior to exposure to the","        // replacer.  I disagree with this decision, but the spec is the spec.","        if (isObject(value) && isFunction(value.toJSON)) {","            value = value.toJSON(key);","        } else if (t === DATE) {","            value = _date(value);","        }","","        if (isFunction(replacer)) {","            value = replacer.call(h,key,value);","        }","","        if (value !== h[key]) {","            t = _type(value);","        }","","        switch (t) {","            case DATE    : // intentional fallthrough.  Pre-replacer Dates are","                           // serialized in the toJSON stage.  Dates here would","                           // have been produced by the replacer.","            case OBJECT  : break;","            case STRING  : return _string(value);","            case NUMBER  : return isFinite(value) ? value+EMPTY : NULL;","            case BOOLEAN : return value+EMPTY;","            case NULL    : return NULL;","            default      : return undefined;","        }","","        // Check for cyclical references in nested objects","        for (i = stack.length - 1; i >= 0; --i) {","            if (stack[i] === value) {","                throw new Error(\"JSON.stringify. Cyclical reference\");","            }","        }","","        arr = isArray(value);","","        // Add the object to the processing stack","        stack.push(value);","","        if (arr) { // Array","            for (i = value.length - 1; i >= 0; --i) {","                a[i] = _serialize(value, i) || NULL;","            }","        } else {   // Object","            // If whitelist provided, take only those keys","            keys = w || value;","            i = 0;","","            for (k in keys) {","                if (keys.hasOwnProperty(k)) {","                    v = _serialize(value, k);","                    if (v) {","                        a[i++] = _string(k) + colon + v;","                    }","                }","            }","        }","","        // remove the array from the stack","        stack.pop();","","        if (space && a.length) {","            return arr ?","                OPEN_A + CR + _indent(a.join(COMMA_CR), space) + CR + CLOSE_A :","                OPEN_O + CR + _indent(a.join(COMMA_CR), space) + CR + CLOSE_O;","        } else {","            return arr ?","                OPEN_A + a.join(COMMA) + CLOSE_A :","                OPEN_O + a.join(COMMA) + CLOSE_O;","        }","    }","","    // process the input","    return _serialize({'':o},'');","};","","// Property available for testing if the implementation being used","// is native or a shim","Y.JSON.stringify.isShim = true;","","}, '@VERSION@', {\"requires\": [\"json-stringify\"]});"];
_yuitest_coverage["build/json-stringify-shim/json-stringify-shim.js"].lines = {"1":0,"4":0,"64":0,"65":0,"66":0,"74":0,"75":0,"76":0,"77":0,"81":0,"82":0,"83":0,"86":0,"90":0,"91":0,"95":0,"96":0,"97":0,"101":0,"105":0,"106":0,"109":0,"110":0,"111":0,"114":0,"120":0,"121":0,"123":0,"124":0,"128":0,"129":0,"130":0,"131":0,"133":0,"138":0,"142":0,"143":0,"153":0,"154":0,"155":0,"156":0,"159":0,"160":0,"163":0,"164":0,"167":0,"171":0,"172":0,"173":0,"174":0,"175":0,"176":0,"180":0,"181":0,"182":0,"186":0,"189":0,"191":0,"192":0,"193":0,"197":0,"198":0,"200":0,"201":0,"202":0,"203":0,"204":0,"211":0,"213":0,"214":0,"218":0,"225":0,"230":0};
_yuitest_coverage["build/json-stringify-shim/json-stringify-shim.js"].functions = {"_type:64":0,"_char:74":0,"_string:90":0,"_indent:105":0,"_serialize:142":0,"_stringify:109":0,"(anonymous 1):1":0};
_yuitest_coverage["build/json-stringify-shim/json-stringify-shim.js"].coveredLines = 73;
_yuitest_coverage["build/json-stringify-shim/json-stringify-shim.js"].coveredFunctions = 7;
_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 1);
YUI.add('json-stringify-shim', function (Y, NAME) {

// All internals kept private for security reasons
_yuitest_coverfunc("build/json-stringify-shim/json-stringify-shim.js", "(anonymous 1)", 1);
_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 4);
var Lang      = Y.Lang,
    isFunction= Lang.isFunction,
    isObject  = Lang.isObject,
    isArray   = Lang.isArray,
    _toStr    = Object.prototype.toString,
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
_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 64);
function _type(o) {
    _yuitest_coverfunc("build/json-stringify-shim/json-stringify-shim.js", "_type", 64);
_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 65);
var t = typeof o;
    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 66);
return  _allowable[t] ||              // number, string, boolean, undefined
            _allowable[_toStr.call(o)] || // Number, String, Boolean, Date
            (t === OBJECT ?
                (o ? OBJECT : NULL) :     // object, array, null, misc natives
                UNDEFINED);               // function, unknown
}

// Escapes a special character to a safe Unicode representation
_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 74);
function _char(c) {
    _yuitest_coverfunc("build/json-stringify-shim/json-stringify-shim.js", "_char", 74);
_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 75);
if (!_CHAR[c]) {
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 76);
_CHAR[c] = '\\u'+('0000'+(+(c.charCodeAt(0))).toString(16)).slice(-4);
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 77);
_CHAR_COUNT[c] = 0;
    }

    // === to avoid this conditional for the remainder of the current operation
    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 81);
if (++_CHAR_COUNT[c] === _CACHE_THRESHOLD) {
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 82);
_COMMON.push([new RegExp(c, 'g'), _CHAR[c]]);
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 83);
_COMMON_LENGTH = _COMMON.length;
    }

    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 86);
return _CHAR[c];
}

// Enclose escaped strings in quotes
_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 90);
function _string(s) {
    _yuitest_coverfunc("build/json-stringify-shim/json-stringify-shim.js", "_string", 90);
_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 91);
var i, chr;

    // Preprocess the string against common characters to avoid function
    // overhead associated with replacement via function.
    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 95);
for (i = 0; i < _COMMON_LENGTH; i++) {
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 96);
chr = _COMMON[i];
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 97);
s = s.replace(chr[0], chr[1]);
    }
    
    // original function replace for the not-as-common set of chars
    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 101);
return QUOTE + s.replace(_SPECIAL, _char) + QUOTE;
}

// Adds the provided space to the beginning of every line in the input string
_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 105);
function _indent(s,space) {
    _yuitest_coverfunc("build/json-stringify-shim/json-stringify-shim.js", "_indent", 105);
_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 106);
return s.replace(/^/gm, space);
}

_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 109);
Y.JSON.stringify = function _stringify(o,w,space) {
    _yuitest_coverfunc("build/json-stringify-shim/json-stringify-shim.js", "_stringify", 109);
_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 110);
if (o === undefined) {
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 111);
return undefined;
    }

    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 114);
var replacer = isFunction(w) ? w : null,
        format   = _toStr.call(space).match(/String|Number/) || [],
        _date    = Y.JSON.dateToString,
        stack    = [],
        tmp,i,len;

    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 120);
_CHAR_COUNT      = {};
    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 121);
_CACHE_THRESHOLD = Y.JSON.charCacheThreshold;

    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 123);
if (replacer || !isArray(w)) {
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 124);
w = undefined;
    }

    // Ensure whitelist keys are unique (bug 2110391)
    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 128);
if (w) {
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 129);
tmp = {};
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 130);
for (i = 0, len = w.length; i < len; ++i) {
            _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 131);
tmp[w[i]] = true;
        }
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 133);
w = tmp;
    }

    // Per the spec, strings are truncated to 10 characters and numbers
    // are converted to that number of spaces (max 10)
    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 138);
space = format[0] === 'Number' ?
                new Array(Math.min(Math.max(0,space),10)+1).join(" ") :
                (space || EMPTY).slice(0,10);

    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 142);
function _serialize(h,key) {
        _yuitest_coverfunc("build/json-stringify-shim/json-stringify-shim.js", "_serialize", 142);
_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 143);
var value = h[key],
            t     = _type(value),
            a     = [],
            colon = space ? COLON_SP : COLON,
            arr, i, keys, k, v;

        // Per the ECMA 5 spec, toJSON is applied before the replacer is
        // called.  Also per the spec, Date.prototype.toJSON has been added, so
        // Date instances should be serialized prior to exposure to the
        // replacer.  I disagree with this decision, but the spec is the spec.
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 153);
if (isObject(value) && isFunction(value.toJSON)) {
            _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 154);
value = value.toJSON(key);
        } else {_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 155);
if (t === DATE) {
            _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 156);
value = _date(value);
        }}

        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 159);
if (isFunction(replacer)) {
            _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 160);
value = replacer.call(h,key,value);
        }

        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 163);
if (value !== h[key]) {
            _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 164);
t = _type(value);
        }

        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 167);
switch (t) {
            case DATE    : // intentional fallthrough.  Pre-replacer Dates are
                           // serialized in the toJSON stage.  Dates here would
                           // have been produced by the replacer.
            case OBJECT  : _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 171);
break;
            case STRING  : _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 172);
return _string(value);
            case NUMBER  : _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 173);
return isFinite(value) ? value+EMPTY : NULL;
            case BOOLEAN : _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 174);
return value+EMPTY;
            case NULL    : _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 175);
return NULL;
            default      : _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 176);
return undefined;
        }

        // Check for cyclical references in nested objects
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 180);
for (i = stack.length - 1; i >= 0; --i) {
            _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 181);
if (stack[i] === value) {
                _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 182);
throw new Error("JSON.stringify. Cyclical reference");
            }
        }

        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 186);
arr = isArray(value);

        // Add the object to the processing stack
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 189);
stack.push(value);

        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 191);
if (arr) { // Array
            _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 192);
for (i = value.length - 1; i >= 0; --i) {
                _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 193);
a[i] = _serialize(value, i) || NULL;
            }
        } else {   // Object
            // If whitelist provided, take only those keys
            _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 197);
keys = w || value;
            _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 198);
i = 0;

            _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 200);
for (k in keys) {
                _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 201);
if (keys.hasOwnProperty(k)) {
                    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 202);
v = _serialize(value, k);
                    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 203);
if (v) {
                        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 204);
a[i++] = _string(k) + colon + v;
                    }
                }
            }
        }

        // remove the array from the stack
        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 211);
stack.pop();

        _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 213);
if (space && a.length) {
            _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 214);
return arr ?
                OPEN_A + CR + _indent(a.join(COMMA_CR), space) + CR + CLOSE_A :
                OPEN_O + CR + _indent(a.join(COMMA_CR), space) + CR + CLOSE_O;
        } else {
            _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 218);
return arr ?
                OPEN_A + a.join(COMMA) + CLOSE_A :
                OPEN_O + a.join(COMMA) + CLOSE_O;
        }
    }

    // process the input
    _yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 225);
return _serialize({'':o},'');
};

// Property available for testing if the implementation being used
// is native or a shim
_yuitest_coverline("build/json-stringify-shim/json-stringify-shim.js", 230);
Y.JSON.stringify.isShim = true;

}, '@VERSION@', {"requires": ["json-stringify"]});
