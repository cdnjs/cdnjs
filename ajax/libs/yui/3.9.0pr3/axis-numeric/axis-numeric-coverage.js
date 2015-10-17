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
_yuitest_coverage["build/axis-numeric/axis-numeric.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/axis-numeric/axis-numeric.js",
    code: []
};
_yuitest_coverage["build/axis-numeric/axis-numeric.js"].code=["YUI.add('axis-numeric', function (Y, NAME) {","","/**"," * Provides functionality for drawing a numeric axis for use with a chart."," *"," * @module charts"," * @submodule axis-numeric"," */","Y_Lang = Y.Lang;","/**"," * NumericAxis draws a numeric axis."," *"," * @class NumericAxis"," * @constructor"," * @extends Axis"," * @uses NumericImpl"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis-numeric"," */","Y.NumericAxis = Y.Base.create(\"numericAxis\", Y.Axis, [Y.NumericImpl], {","    /**","     * Calculates and returns a value based on the number of labels and the index of","     * the current label.","     *","     * @method getLabelByIndex","     * @param {Number} i Index of the label.","     * @param {Number} l Total number of labels.","     * @return String","     * @private","     */","    _getLabelByIndex: function()","    {","        var i = arguments[0],","            l = arguments[1],","            min = this.get(\"minimum\"),","            max = this.get(\"maximum\"),","            increm = (max - min)/(l-1),","            label,","            roundingMethod = this.get(\"roundingMethod\");","            l -= 1;","        //respect the min and max. calculate all other labels.","        if(i === 0)","        {","            label = min;","        }","        else if(i === l)","        {","            label = max;","        }","        else","        {","            label = (i * increm);","            if(roundingMethod == \"niceNumber\")","            {","                label = this._roundToNearest(label, increm);","            }","            label += min;","        }","        return parseFloat(label);","    },","","    /**","     * Checks to see if data extends beyond the range of the axis. If so,","     * that data will need to be hidden. This method is internal, temporary and subject","     * to removal in the future.","     *","     * @method _hasDataOverflow","     * @protected","     * @return Boolean","     */","    _hasDataOverflow: function()","    {","        var roundingMethod,","            min,","            max;","        if(this.get(\"setMin\") || this.get(\"setMax\"))","        {","            return true;","        }","        roundingMethod = this.get(\"roundingMethod\");","        min = this._actualMinimum;","        max = this._actualMaximum;","        if(Y_Lang.isNumber(roundingMethod) && ((Y_Lang.isNumber(max) && max > this._dataMaximum) || (Y_Lang.isNumber(min) && min < this._dataMinimum)))","        {","            return true;","        }","        return false;","    }","});","","","","}, '@VERSION@', {\"requires\": [\"axis\", \"axis-numeric-base\"]});"];
_yuitest_coverage["build/axis-numeric/axis-numeric.js"].lines = {"1":0,"9":0,"20":0,"33":0,"40":0,"42":0,"44":0,"46":0,"48":0,"52":0,"53":0,"55":0,"57":0,"59":0,"73":0,"76":0,"78":0,"80":0,"81":0,"82":0,"83":0,"85":0,"87":0};
_yuitest_coverage["build/axis-numeric/axis-numeric.js"].functions = {"_getLabelByIndex:31":0,"_hasDataOverflow:71":0,"(anonymous 1):1":0};
_yuitest_coverage["build/axis-numeric/axis-numeric.js"].coveredLines = 23;
_yuitest_coverage["build/axis-numeric/axis-numeric.js"].coveredFunctions = 3;
_yuitest_coverline("build/axis-numeric/axis-numeric.js", 1);
YUI.add('axis-numeric', function (Y, NAME) {

/**
 * Provides functionality for drawing a numeric axis for use with a chart.
 *
 * @module charts
 * @submodule axis-numeric
 */
_yuitest_coverfunc("build/axis-numeric/axis-numeric.js", "(anonymous 1)", 1);
_yuitest_coverline("build/axis-numeric/axis-numeric.js", 9);
Y_Lang = Y.Lang;
/**
 * NumericAxis draws a numeric axis.
 *
 * @class NumericAxis
 * @constructor
 * @extends Axis
 * @uses NumericImpl
 * @param {Object} config (optional) Configuration parameters.
 * @submodule axis-numeric
 */
_yuitest_coverline("build/axis-numeric/axis-numeric.js", 20);
Y.NumericAxis = Y.Base.create("numericAxis", Y.Axis, [Y.NumericImpl], {
    /**
     * Calculates and returns a value based on the number of labels and the index of
     * the current label.
     *
     * @method getLabelByIndex
     * @param {Number} i Index of the label.
     * @param {Number} l Total number of labels.
     * @return String
     * @private
     */
    _getLabelByIndex: function()
    {
        _yuitest_coverfunc("build/axis-numeric/axis-numeric.js", "_getLabelByIndex", 31);
_yuitest_coverline("build/axis-numeric/axis-numeric.js", 33);
var i = arguments[0],
            l = arguments[1],
            min = this.get("minimum"),
            max = this.get("maximum"),
            increm = (max - min)/(l-1),
            label,
            roundingMethod = this.get("roundingMethod");
            _yuitest_coverline("build/axis-numeric/axis-numeric.js", 40);
l -= 1;
        //respect the min and max. calculate all other labels.
        _yuitest_coverline("build/axis-numeric/axis-numeric.js", 42);
if(i === 0)
        {
            _yuitest_coverline("build/axis-numeric/axis-numeric.js", 44);
label = min;
        }
        else {_yuitest_coverline("build/axis-numeric/axis-numeric.js", 46);
if(i === l)
        {
            _yuitest_coverline("build/axis-numeric/axis-numeric.js", 48);
label = max;
        }
        else
        {
            _yuitest_coverline("build/axis-numeric/axis-numeric.js", 52);
label = (i * increm);
            _yuitest_coverline("build/axis-numeric/axis-numeric.js", 53);
if(roundingMethod == "niceNumber")
            {
                _yuitest_coverline("build/axis-numeric/axis-numeric.js", 55);
label = this._roundToNearest(label, increm);
            }
            _yuitest_coverline("build/axis-numeric/axis-numeric.js", 57);
label += min;
        }}
        _yuitest_coverline("build/axis-numeric/axis-numeric.js", 59);
return parseFloat(label);
    },

    /**
     * Checks to see if data extends beyond the range of the axis. If so,
     * that data will need to be hidden. This method is internal, temporary and subject
     * to removal in the future.
     *
     * @method _hasDataOverflow
     * @protected
     * @return Boolean
     */
    _hasDataOverflow: function()
    {
        _yuitest_coverfunc("build/axis-numeric/axis-numeric.js", "_hasDataOverflow", 71);
_yuitest_coverline("build/axis-numeric/axis-numeric.js", 73);
var roundingMethod,
            min,
            max;
        _yuitest_coverline("build/axis-numeric/axis-numeric.js", 76);
if(this.get("setMin") || this.get("setMax"))
        {
            _yuitest_coverline("build/axis-numeric/axis-numeric.js", 78);
return true;
        }
        _yuitest_coverline("build/axis-numeric/axis-numeric.js", 80);
roundingMethod = this.get("roundingMethod");
        _yuitest_coverline("build/axis-numeric/axis-numeric.js", 81);
min = this._actualMinimum;
        _yuitest_coverline("build/axis-numeric/axis-numeric.js", 82);
max = this._actualMaximum;
        _yuitest_coverline("build/axis-numeric/axis-numeric.js", 83);
if(Y_Lang.isNumber(roundingMethod) && ((Y_Lang.isNumber(max) && max > this._dataMaximum) || (Y_Lang.isNumber(min) && min < this._dataMinimum)))
        {
            _yuitest_coverline("build/axis-numeric/axis-numeric.js", 85);
return true;
        }
        _yuitest_coverline("build/axis-numeric/axis-numeric.js", 87);
return false;
    }
});



}, '@VERSION@', {"requires": ["axis", "axis-numeric-base"]});
