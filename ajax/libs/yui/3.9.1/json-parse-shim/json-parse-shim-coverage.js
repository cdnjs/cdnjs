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
_yuitest_coverage["build/json-parse-shim/json-parse-shim.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/json-parse-shim/json-parse-shim.js",
    code: []
};
_yuitest_coverage["build/json-parse-shim/json-parse-shim.js"].code=["YUI.add('json-parse-shim', function (Y, NAME) {","","/**"," * <p>The JSON module adds support for serializing JavaScript objects into"," * JSON strings and parsing JavaScript objects from strings in JSON format.</p>"," *"," * <p>The JSON namespace is added to your YUI instance including static methods"," * Y.JSON.parse(..) and Y.JSON.stringify(..).</p>"," *"," * <p>The functionality and method signatures follow the ECMAScript 5"," * specification.  In browsers with native JSON support, the native"," * implementation is used.</p>"," *"," * <p>The <code>json</code> module is a rollup of <code>json-parse</code> and"," * <code>json-stringify</code>.</p>"," *"," * <p>As their names suggest, <code>json-parse</code> adds support for parsing"," * JSON data (Y.JSON.parse) and <code>json-stringify</code> for serializing"," * JavaScript data into JSON strings (Y.JSON.stringify).  You may choose to"," * include either of the submodules individually if you don't need the"," * complementary functionality, or include the rollup for both.</p>"," *"," * @module json"," * @main json"," * @class JSON"," * @static"," */","","/**"," * Provides Y.JSON.parse method to accept JSON strings and return native"," * JavaScript objects."," *"," * @module json"," * @submodule json-parse"," * @for JSON"," * @static"," */","","","    /**","     * Replace certain Unicode characters that JavaScript may handle incorrectly","     * during eval--either by deleting them or treating them as line","     * endings--with escape sequences.","     * IMPORTANT NOTE: This regex will be used to modify the input if a match is","     * found.","     *","     * @property _UNICODE_EXCEPTIONS","     * @type {RegExp}","     * @private","     */","var _UNICODE_EXCEPTIONS = /[\\u0000\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]/g,","","","    /**","     * First step in the safety evaluation.  Regex used to replace all escape","     * sequences (i.e. \"\\\\\", etc) with '@' characters (a non-JSON character).","     *","     * @property _ESCAPES","     * @type {RegExp}","     * @private","     */","    _ESCAPES = /\\\\(?:[\"\\\\\\/bfnrt]|u[0-9a-fA-F]{4})/g,","","    /**","     * Second step in the safety evaluation.  Regex used to replace all simple","     * values with ']' characters.","     *","     * @property _VALUES","     * @type {RegExp}","     * @private","     */","    _VALUES  = /\"[^\"\\\\\\n\\r]*\"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?/g,","","    /**","     * Third step in the safety evaluation.  Regex used to remove all open","     * square brackets following a colon, comma, or at the beginning of the","     * string.","     *","     * @property _BRACKETS","     * @type {RegExp}","     * @private","     */","    _BRACKETS = /(?:^|:|,)(?:\\s*\\[)+/g,","","    /**","     * Final step in the safety evaluation.  Regex used to test the string left","     * after all previous replacements for invalid characters.","     *","     * @property _UNSAFE","     * @type {RegExp}","     * @private","     */","    _UNSAFE = /[^\\],:{}\\s]/,","","    /**","     * Replaces specific unicode characters with their appropriate \\unnnn","     * format. Some browsers ignore certain characters during eval.","     *","     * @method escapeException","     * @param c {String} Unicode character","     * @return {String} the \\unnnn escapement of the character","     * @private","     */","    _escapeException = function (c) {","        return '\\\\u'+('0000'+(+(c.charCodeAt(0))).toString(16)).slice(-4);","    },","","    /**","     * Traverses nested objects, applying a reviver function to each (key,value)","     * from the scope if the key:value's containing object.  The value returned","     * from the function will replace the original value in the key:value pair.","     * If the value returned is undefined, the key will be omitted from the","     * returned object.","     *","     * @method _revive","     * @param data {MIXED} Any JavaScript data","     * @param reviver {Function} filter or mutation function","     * @return {MIXED} The results of the filtered data","     * @private","     */","    _revive = function (data, reviver) {","        var walk = function (o,key) {","            var k,v,value = o[key];","            if (value && typeof value === 'object') {","                for (k in value) {","                    if (value.hasOwnProperty(k)) {","                        v = walk(value, k);","                        if (v === undefined) {","                            delete value[k];","                        } else {","                            value[k] = v;","                        }","                    }","                }","            }","            return reviver.call(o,key,value);","        };","","        return typeof reviver === 'function' ? walk({'':data},'') : data;","    };","","/**"," * Parse a JSON string, returning the native JavaScript representation."," *"," * @param s {string} JSON string data"," * @param reviver {function} (optional) function(k,v) passed each key value"," *          pair of object literals, allowing pruning or altering values"," * @return {MIXED} the native JavaScript representation of the JSON string"," * @throws SyntaxError"," * @method parse"," * @static"," */","// JavaScript implementation in lieu of native browser support.  Based on","// the json2.js library from http://json.org","Y.JSON.parse = function (s,reviver) {","    if (typeof s !== 'string') {","        s += '';","    }","","    // Replace certain Unicode characters that are otherwise handled","    // incorrectly by some browser implementations.","    // NOTE: This modifies the input if such characters are found!","    s = s.replace(_UNICODE_EXCEPTIONS, _escapeException);","","    // Test for any remaining invalid characters","    if (!_UNSAFE.test(s.replace(_ESCAPES,'@').","                        replace(_VALUES,']').","                        replace(_BRACKETS,''))) {","","        // Eval the text into a JavaScript data structure, apply any","        // reviver function, and return","        return _revive( eval('(' + s + ')'), reviver );","    }","","    throw new SyntaxError('JSON.parse');","};","","// Property available for testing if the implementation being used","// is native or a shim","Y.JSON.parse.isShim = true;","","}, '@VERSION@', {\"requires\": [\"json-parse\"]});"];
_yuitest_coverage["build/json-parse-shim/json-parse-shim.js"].lines = {"1":0,"51":0,"105":0,"122":0,"123":0,"124":0,"125":0,"126":0,"127":0,"128":0,"129":0,"131":0,"136":0,"139":0,"155":0,"156":0,"157":0,"163":0,"166":0,"172":0,"175":0,"180":0};
_yuitest_coverage["build/json-parse-shim/json-parse-shim.js"].functions = {"_escapeException:104":0,"walk:122":0,"_revive:121":0,"parse:155":0,"(anonymous 1):1":0};
_yuitest_coverage["build/json-parse-shim/json-parse-shim.js"].coveredLines = 22;
_yuitest_coverage["build/json-parse-shim/json-parse-shim.js"].coveredFunctions = 5;
_yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 1);
YUI.add('json-parse-shim', function (Y, NAME) {

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
 * @main json
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
_yuitest_coverfunc("build/json-parse-shim/json-parse-shim.js", "(anonymous 1)", 1);
_yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 51);
var _UNICODE_EXCEPTIONS = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,


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
        _yuitest_coverfunc("build/json-parse-shim/json-parse-shim.js", "_escapeException", 104);
_yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 105);
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
        _yuitest_coverfunc("build/json-parse-shim/json-parse-shim.js", "_revive", 121);
_yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 122);
var walk = function (o,key) {
            _yuitest_coverfunc("build/json-parse-shim/json-parse-shim.js", "walk", 122);
_yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 123);
var k,v,value = o[key];
            _yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 124);
if (value && typeof value === 'object') {
                _yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 125);
for (k in value) {
                    _yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 126);
if (value.hasOwnProperty(k)) {
                        _yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 127);
v = walk(value, k);
                        _yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 128);
if (v === undefined) {
                            _yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 129);
delete value[k];
                        } else {
                            _yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 131);
value[k] = v;
                        }
                    }
                }
            }
            _yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 136);
return reviver.call(o,key,value);
        };

        _yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 139);
return typeof reviver === 'function' ? walk({'':data},'') : data;
    };

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
_yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 155);
Y.JSON.parse = function (s,reviver) {
    _yuitest_coverfunc("build/json-parse-shim/json-parse-shim.js", "parse", 155);
_yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 156);
if (typeof s !== 'string') {
        _yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 157);
s += '';
    }

    // Replace certain Unicode characters that are otherwise handled
    // incorrectly by some browser implementations.
    // NOTE: This modifies the input if such characters are found!
    _yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 163);
s = s.replace(_UNICODE_EXCEPTIONS, _escapeException);

    // Test for any remaining invalid characters
    _yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 166);
if (!_UNSAFE.test(s.replace(_ESCAPES,'@').
                        replace(_VALUES,']').
                        replace(_BRACKETS,''))) {

        // Eval the text into a JavaScript data structure, apply any
        // reviver function, and return
        _yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 172);
return _revive( eval('(' + s + ')'), reviver );
    }

    _yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 175);
throw new SyntaxError('JSON.parse');
};

// Property available for testing if the implementation being used
// is native or a shim
_yuitest_coverline("build/json-parse-shim/json-parse-shim.js", 180);
Y.JSON.parse.isShim = true;

}, '@VERSION@', {"requires": ["json-parse"]});
