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
_yuitest_coverage["build/axis-stacked/axis-stacked.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/axis-stacked/axis-stacked.js",
    code: []
};
_yuitest_coverage["build/axis-stacked/axis-stacked.js"].code=["YUI.add('axis-stacked', function (Y, NAME) {","","/**"," * Provides functionality for drawing a stacked numeric axis for use with a chart."," *"," * @module charts"," * @submodule axis-stacked"," */","/**"," * StackedAxis draws a stacked numeric axis for a chart."," *"," * @class StackedAxis"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @extends NumericAxis"," * @uses StackedImpl"," * @submodule axis-stacked"," */","Y.StackedAxis = Y.Base.create(\"stackedAxis\", Y.NumericAxis, [Y.StackedImpl]);","","","","}, '@VERSION@', {\"requires\": [\"axis-numeric\", \"axis-stacked-base\"]});"];
_yuitest_coverage["build/axis-stacked/axis-stacked.js"].lines = {"1":0,"19":0};
_yuitest_coverage["build/axis-stacked/axis-stacked.js"].functions = {"(anonymous 1):1":0};
_yuitest_coverage["build/axis-stacked/axis-stacked.js"].coveredLines = 2;
_yuitest_coverage["build/axis-stacked/axis-stacked.js"].coveredFunctions = 1;
_yuitest_coverline("build/axis-stacked/axis-stacked.js", 1);
YUI.add('axis-stacked', function (Y, NAME) {

/**
 * Provides functionality for drawing a stacked numeric axis for use with a chart.
 *
 * @module charts
 * @submodule axis-stacked
 */
/**
 * StackedAxis draws a stacked numeric axis for a chart.
 *
 * @class StackedAxis
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @extends NumericAxis
 * @uses StackedImpl
 * @submodule axis-stacked
 */
_yuitest_coverfunc("build/axis-stacked/axis-stacked.js", "(anonymous 1)", 1);
_yuitest_coverline("build/axis-stacked/axis-stacked.js", 19);
Y.StackedAxis = Y.Base.create("stackedAxis", Y.NumericAxis, [Y.StackedImpl]);



}, '@VERSION@', {"requires": ["axis-numeric", "axis-stacked-base"]});
