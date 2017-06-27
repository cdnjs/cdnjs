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
_yuitest_coverage["build/datatype-date-parse/datatype-date-parse.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/datatype-date-parse/datatype-date-parse.js",
    code: []
};
_yuitest_coverage["build/datatype-date-parse/datatype-date-parse.js"].code=["YUI.add('datatype-date-parse', function (Y, NAME) {","","/**"," * Parse number submodule."," *"," * @module datatype-date"," * @submodule datatype-date-parse"," * @for Date"," */","Y.mix(Y.namespace(\"Date\"), {","    /**","     * Converts data to type Date.","     *","     * @method parse","     * @param data {Date|Number|String} date object, timestamp (string or number), or string parsable by Date.parse","     * @return {Date} a Date object or null if unable to parse","     */","    parse: function(data) {","        var val = new Date(+data || data);","        if (Y.Lang.isDate(val)) {","            return val;","        } else {","            return null;","        }","    }","});","","// Add Parsers shortcut","Y.namespace(\"Parsers\").date = Y.Date.parse;","","Y.namespace(\"DataType\");","Y.DataType.Date = Y.Date;","","","}, '@VERSION@');"];
_yuitest_coverage["build/datatype-date-parse/datatype-date-parse.js"].lines = {"1":0,"10":0,"19":0,"20":0,"21":0,"23":0,"29":0,"31":0,"32":0};
_yuitest_coverage["build/datatype-date-parse/datatype-date-parse.js"].functions = {"parse:18":0,"(anonymous 1):1":0};
_yuitest_coverage["build/datatype-date-parse/datatype-date-parse.js"].coveredLines = 9;
_yuitest_coverage["build/datatype-date-parse/datatype-date-parse.js"].coveredFunctions = 2;
_yuitest_coverline("build/datatype-date-parse/datatype-date-parse.js", 1);
YUI.add('datatype-date-parse', function (Y, NAME) {

/**
 * Parse number submodule.
 *
 * @module datatype-date
 * @submodule datatype-date-parse
 * @for Date
 */
_yuitest_coverfunc("build/datatype-date-parse/datatype-date-parse.js", "(anonymous 1)", 1);
_yuitest_coverline("build/datatype-date-parse/datatype-date-parse.js", 10);
Y.mix(Y.namespace("Date"), {
    /**
     * Converts data to type Date.
     *
     * @method parse
     * @param data {Date|Number|String} date object, timestamp (string or number), or string parsable by Date.parse
     * @return {Date} a Date object or null if unable to parse
     */
    parse: function(data) {
        _yuitest_coverfunc("build/datatype-date-parse/datatype-date-parse.js", "parse", 18);
_yuitest_coverline("build/datatype-date-parse/datatype-date-parse.js", 19);
var val = new Date(+data || data);
        _yuitest_coverline("build/datatype-date-parse/datatype-date-parse.js", 20);
if (Y.Lang.isDate(val)) {
            _yuitest_coverline("build/datatype-date-parse/datatype-date-parse.js", 21);
return val;
        } else {
            _yuitest_coverline("build/datatype-date-parse/datatype-date-parse.js", 23);
return null;
        }
    }
});

// Add Parsers shortcut
_yuitest_coverline("build/datatype-date-parse/datatype-date-parse.js", 29);
Y.namespace("Parsers").date = Y.Date.parse;

_yuitest_coverline("build/datatype-date-parse/datatype-date-parse.js", 31);
Y.namespace("DataType");
_yuitest_coverline("build/datatype-date-parse/datatype-date-parse.js", 32);
Y.DataType.Date = Y.Date;


}, '@VERSION@');
