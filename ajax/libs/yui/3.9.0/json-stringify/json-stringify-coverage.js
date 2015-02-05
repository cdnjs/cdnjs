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
_yuitest_coverage["build/json-stringify/json-stringify.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/json-stringify/json-stringify.js",
    code: []
};
_yuitest_coverage["build/json-stringify/json-stringify.js"].code=["YUI.add('json-stringify', function (Y, NAME) {","","/**"," * Provides Y.JSON.stringify method for converting objects to JSON strings."," *"," * @module json"," * @submodule json-stringify"," * @for JSON"," * @static"," */","var COLON     = ':',","    _JSON     = Y.config.global.JSON;","","Y.mix(Y.namespace('JSON'), {","    /**","     * Serializes a Date instance as a UTC date string.  Used internally by","     * stringify.  Override this method if you need Dates serialized in a","     * different format.","     *","     * @method dateToString","     * @param d {Date} The Date to serialize","     * @return {String} stringified Date in UTC format YYYY-MM-DDTHH:mm:SSZ","     * @deprecated Use a replacer function","     * @static","     */","    dateToString: function (d) {","        function _zeroPad(v) {","            return v < 10 ? '0' + v : v;","        }","","        return d.getUTCFullYear()           + '-' +","              _zeroPad(d.getUTCMonth() + 1) + '-' +","              _zeroPad(d.getUTCDate())      + 'T' +","              _zeroPad(d.getUTCHours())     + COLON +","              _zeroPad(d.getUTCMinutes())   + COLON +","              _zeroPad(d.getUTCSeconds())   + 'Z';","    },","","    /**","     * <p>Converts an arbitrary value to a JSON string representation.</p>","     *","     * <p>Objects with cyclical references will trigger an exception.</p>","     *","     * <p>If a whitelist is provided, only matching object keys will be","     * included.  Alternately, a replacer function may be passed as the","     * second parameter.  This function is executed on every value in the","     * input, and its return value will be used in place of the original value.","     * This is useful to serialize specialized objects or class instances.</p>","     *","     * <p>If a positive integer or non-empty string is passed as the third","     * parameter, the output will be formatted with carriage returns and","     * indentation for readability.  If a String is passed (such as \"\\t\") it","     * will be used once for each indentation level.  If a number is passed,","     * that number of spaces will be used.</p>","     *","     * @method stringify","     * @param o {MIXED} any arbitrary value to convert to JSON string","     * @param w {Array|Function} (optional) whitelist of acceptable object","     *                  keys to include, or a replacer function to modify the","     *                  raw value before serialization","     * @param ind {Number|String} (optional) indentation character or depth of","     *                  spaces to format the output.","     * @return {string} JSON string representation of the input","     * @static","     */","    stringify: function () {","        return _JSON.stringify.apply(_JSON, arguments);","    },","","    /**","     * <p>Number of occurrences of a special character within a single call to","     * stringify that should trigger promotion of that character to a dedicated","     * preprocess step for future calls.  This is only used in environments","     * that don't support native JSON, or when useNativeJSONStringify is set to","     * false.</p>","     *","     * <p>So, if set to 50 and an object is passed to stringify that includes","     * strings containing the special character \\x07 more than 50 times,","     * subsequent calls to stringify will process object strings through a","     * faster serialization path for \\x07 before using the generic, slower,","     * replacement process for all special characters.</p>","     *","     * <p>To prime the preprocessor cache, set this value to 1, then call","     * <code>Y.JSON.stringify(\"<em>(all special characters to","     * cache)</em>\");</code>, then return this setting to a more conservative","     * value.</p>","     *","     * <p>Special characters \\ \" \\b \\t \\n \\f \\r are already cached.</p>","     *","     * @property charCacheThreshold","     * @static","     * @default 100","     * @type {Number}","     */","    charCacheThreshold: 100","});","","}, '@VERSION@', {\"requires\": [\"yui-base\"]});"];
_yuitest_coverage["build/json-stringify/json-stringify.js"].lines = {"1":0,"11":0,"14":0,"27":0,"28":0,"31":0,"67":0};
_yuitest_coverage["build/json-stringify/json-stringify.js"].functions = {"_zeroPad:27":0,"dateToString:26":0,"stringify:66":0,"(anonymous 1):1":0};
_yuitest_coverage["build/json-stringify/json-stringify.js"].coveredLines = 7;
_yuitest_coverage["build/json-stringify/json-stringify.js"].coveredFunctions = 4;
_yuitest_coverline("build/json-stringify/json-stringify.js", 1);
YUI.add('json-stringify', function (Y, NAME) {

/**
 * Provides Y.JSON.stringify method for converting objects to JSON strings.
 *
 * @module json
 * @submodule json-stringify
 * @for JSON
 * @static
 */
_yuitest_coverfunc("build/json-stringify/json-stringify.js", "(anonymous 1)", 1);
_yuitest_coverline("build/json-stringify/json-stringify.js", 11);
var COLON     = ':',
    _JSON     = Y.config.global.JSON;

_yuitest_coverline("build/json-stringify/json-stringify.js", 14);
Y.mix(Y.namespace('JSON'), {
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
    dateToString: function (d) {
        _yuitest_coverfunc("build/json-stringify/json-stringify.js", "dateToString", 26);
_yuitest_coverline("build/json-stringify/json-stringify.js", 27);
function _zeroPad(v) {
            _yuitest_coverfunc("build/json-stringify/json-stringify.js", "_zeroPad", 27);
_yuitest_coverline("build/json-stringify/json-stringify.js", 28);
return v < 10 ? '0' + v : v;
        }

        _yuitest_coverline("build/json-stringify/json-stringify.js", 31);
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
    stringify: function () {
        _yuitest_coverfunc("build/json-stringify/json-stringify.js", "stringify", 66);
_yuitest_coverline("build/json-stringify/json-stringify.js", 67);
return _JSON.stringify.apply(_JSON, arguments);
    },

    /**
     * <p>Number of occurrences of a special character within a single call to
     * stringify that should trigger promotion of that character to a dedicated
     * preprocess step for future calls.  This is only used in environments
     * that don't support native JSON, or when useNativeJSONStringify is set to
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

}, '@VERSION@', {"requires": ["yui-base"]});
