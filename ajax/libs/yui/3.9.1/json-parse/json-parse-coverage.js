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
_yuitest_coverage["build/json-parse/json-parse.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/json-parse/json-parse.js",
    code: []
};
_yuitest_coverage["build/json-parse/json-parse.js"].code=["YUI.add('json-parse', function (Y, NAME) {","","var _JSON = Y.config.global.JSON;","","Y.namespace('JSON').parse = function (obj, reviver, space) {","    return _JSON.parse((typeof obj === 'string' ? obj : obj + ''), reviver, space);","};","","","}, '@VERSION@', {\"requires\": [\"yui-base\"]});"];
_yuitest_coverage["build/json-parse/json-parse.js"].lines = {"1":0,"3":0,"5":0,"6":0};
_yuitest_coverage["build/json-parse/json-parse.js"].functions = {"parse:5":0,"(anonymous 1):1":0};
_yuitest_coverage["build/json-parse/json-parse.js"].coveredLines = 4;
_yuitest_coverage["build/json-parse/json-parse.js"].coveredFunctions = 2;
_yuitest_coverline("build/json-parse/json-parse.js", 1);
YUI.add('json-parse', function (Y, NAME) {

_yuitest_coverfunc("build/json-parse/json-parse.js", "(anonymous 1)", 1);
_yuitest_coverline("build/json-parse/json-parse.js", 3);
var _JSON = Y.config.global.JSON;

_yuitest_coverline("build/json-parse/json-parse.js", 5);
Y.namespace('JSON').parse = function (obj, reviver, space) {
    _yuitest_coverfunc("build/json-parse/json-parse.js", "parse", 5);
_yuitest_coverline("build/json-parse/json-parse.js", 6);
return _JSON.parse((typeof obj === 'string' ? obj : obj + ''), reviver, space);
};


}, '@VERSION@', {"requires": ["yui-base"]});
