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
_yuitest_coverage["build/axis-time/axis-time.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/axis-time/axis-time.js",
    code: []
};
_yuitest_coverage["build/axis-time/axis-time.js"].code=["YUI.add('axis-time', function (Y, NAME) {","","/**"," * Provides functionality for drawing a time axis for use with a chart."," *"," * @module charts"," * @submodule axis-time"," */","/**"," * TimeAxis draws a time-based axis for a chart."," *"," * @class TimeAxis"," * @constructor"," * @extends Axis"," * @uses TimeImpl"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis-time"," */","Y.TimeAxis = Y.Base.create(\"timeAxis\", Y.Axis, [Y.TimeImpl], {","    /**","     * Calculates and returns a value based on the number of labels and the index of","     * the current label.","     *","     * @method _getLabelByIndex","     * @param {Number} i Index of the label.","     * @param {Number} l Total number of labels.","     * @param {String} direction The direction of the axis. (vertical or horizontal)","     * @return String","     * @private","     */","    _getLabelByIndex: function(i, l, direction)","    {","        var min = this.get(\"minimum\"),","            max = this.get(\"maximum\"),","            increm,","            label;","            l -= 1;","        increm = ((max - min)/l) * i;","        if(direction && direction === \"vertical\")","        {","            label = max - increm;","        }","        else","        {","            label = min + increm;","        }","        return label;","    }","});","","","","}, '@VERSION@', {\"requires\": [\"axis\", \"axis-time-base\"]});"];
_yuitest_coverage["build/axis-time/axis-time.js"].lines = {"1":0,"19":0,"33":0,"37":0,"38":0,"39":0,"41":0,"45":0,"47":0};
_yuitest_coverage["build/axis-time/axis-time.js"].functions = {"_getLabelByIndex:31":0,"(anonymous 1):1":0};
_yuitest_coverage["build/axis-time/axis-time.js"].coveredLines = 9;
_yuitest_coverage["build/axis-time/axis-time.js"].coveredFunctions = 2;
_yuitest_coverline("build/axis-time/axis-time.js", 1);
YUI.add('axis-time', function (Y, NAME) {

/**
 * Provides functionality for drawing a time axis for use with a chart.
 *
 * @module charts
 * @submodule axis-time
 */
/**
 * TimeAxis draws a time-based axis for a chart.
 *
 * @class TimeAxis
 * @constructor
 * @extends Axis
 * @uses TimeImpl
 * @param {Object} config (optional) Configuration parameters.
 * @submodule axis-time
 */
_yuitest_coverfunc("build/axis-time/axis-time.js", "(anonymous 1)", 1);
_yuitest_coverline("build/axis-time/axis-time.js", 19);
Y.TimeAxis = Y.Base.create("timeAxis", Y.Axis, [Y.TimeImpl], {
    /**
     * Calculates and returns a value based on the number of labels and the index of
     * the current label.
     *
     * @method _getLabelByIndex
     * @param {Number} i Index of the label.
     * @param {Number} l Total number of labels.
     * @param {String} direction The direction of the axis. (vertical or horizontal)
     * @return String
     * @private
     */
    _getLabelByIndex: function(i, l, direction)
    {
        _yuitest_coverfunc("build/axis-time/axis-time.js", "_getLabelByIndex", 31);
_yuitest_coverline("build/axis-time/axis-time.js", 33);
var min = this.get("minimum"),
            max = this.get("maximum"),
            increm,
            label;
            _yuitest_coverline("build/axis-time/axis-time.js", 37);
l -= 1;
        _yuitest_coverline("build/axis-time/axis-time.js", 38);
increm = ((max - min)/l) * i;
        _yuitest_coverline("build/axis-time/axis-time.js", 39);
if(direction && direction === "vertical")
        {
            _yuitest_coverline("build/axis-time/axis-time.js", 41);
label = max - increm;
        }
        else
        {
            _yuitest_coverline("build/axis-time/axis-time.js", 45);
label = min + increm;
        }
        _yuitest_coverline("build/axis-time/axis-time.js", 47);
return label;
    }
});



}, '@VERSION@', {"requires": ["axis", "axis-time-base"]});
