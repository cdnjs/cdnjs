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
_yuitest_coverage["build/axis-category/axis-category.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/axis-category/axis-category.js",
    code: []
};
_yuitest_coverage["build/axis-category/axis-category.js"].code=["YUI.add('axis-category', function (Y, NAME) {","","/**"," * Provides functionality for drawing a category axis for use with a chart."," *"," * @module charts"," * @submodule axis-category"," */","/**"," * CategoryAxis draws a category axis for a chart."," *"," * @class CategoryAxis"," * @constructor"," * @extends Axis"," * @uses CategoryImpl"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis-category"," */","Y.CategoryAxis = Y.Base.create(\"categoryAxis\", Y.Axis, [Y.CategoryImpl], {","    /**","     * Returns a string corresponding to the first label on an","     * axis.","     *","     * @method getMinimumValue","     * @return String","     */","    getMinimumValue: function()","    {","        var data = this.get(\"data\"),","            label = data[0];","        return label;","    },","","    /**","     * Returns a string corresponding to the last label on an","     * axis.","     *","     * @method getMaximumValue","     * @return String","     */","    getMaximumValue: function()","    {","        var data = this.get(\"data\"),","            len = data.length - 1,","            label = data[len];","        return label;","    },","","    /**","     * Calculates and returns a value based on the number of labels and the index of","     * the current label.","     *","     * @method _getLabelByIndex","     * @param {Number} i Index of the label.","     * @param {Number} l Total number of labels.","     * @param {String} direction The direction of the axis. (vertical or horizontal)","     * @return String","     * @private","     */","    _getLabelByIndex: function(i, l, direction)","    {","        var label,","            data = this.get(\"data\");","        if(direction && direction === \"vertical\")","        {","            label = data[l - (i + 1)];","        }","        else","        {","            label = data[i];","        }","        return label;","    }","});","","","","}, '@VERSION@', {\"requires\": [\"axis\", \"axis-category-base\"]});"];
_yuitest_coverage["build/axis-category/axis-category.js"].lines = {"1":0,"19":0,"29":0,"31":0,"43":0,"46":0,"62":0,"64":0,"66":0,"70":0,"72":0};
_yuitest_coverage["build/axis-category/axis-category.js"].functions = {"getMinimumValue:27":0,"getMaximumValue:41":0,"_getLabelByIndex:60":0,"(anonymous 1):1":0};
_yuitest_coverage["build/axis-category/axis-category.js"].coveredLines = 11;
_yuitest_coverage["build/axis-category/axis-category.js"].coveredFunctions = 4;
_yuitest_coverline("build/axis-category/axis-category.js", 1);
YUI.add('axis-category', function (Y, NAME) {

/**
 * Provides functionality for drawing a category axis for use with a chart.
 *
 * @module charts
 * @submodule axis-category
 */
/**
 * CategoryAxis draws a category axis for a chart.
 *
 * @class CategoryAxis
 * @constructor
 * @extends Axis
 * @uses CategoryImpl
 * @param {Object} config (optional) Configuration parameters.
 * @submodule axis-category
 */
_yuitest_coverfunc("build/axis-category/axis-category.js", "(anonymous 1)", 1);
_yuitest_coverline("build/axis-category/axis-category.js", 19);
Y.CategoryAxis = Y.Base.create("categoryAxis", Y.Axis, [Y.CategoryImpl], {
    /**
     * Returns a string corresponding to the first label on an
     * axis.
     *
     * @method getMinimumValue
     * @return String
     */
    getMinimumValue: function()
    {
        _yuitest_coverfunc("build/axis-category/axis-category.js", "getMinimumValue", 27);
_yuitest_coverline("build/axis-category/axis-category.js", 29);
var data = this.get("data"),
            label = data[0];
        _yuitest_coverline("build/axis-category/axis-category.js", 31);
return label;
    },

    /**
     * Returns a string corresponding to the last label on an
     * axis.
     *
     * @method getMaximumValue
     * @return String
     */
    getMaximumValue: function()
    {
        _yuitest_coverfunc("build/axis-category/axis-category.js", "getMaximumValue", 41);
_yuitest_coverline("build/axis-category/axis-category.js", 43);
var data = this.get("data"),
            len = data.length - 1,
            label = data[len];
        _yuitest_coverline("build/axis-category/axis-category.js", 46);
return label;
    },

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
        _yuitest_coverfunc("build/axis-category/axis-category.js", "_getLabelByIndex", 60);
_yuitest_coverline("build/axis-category/axis-category.js", 62);
var label,
            data = this.get("data");
        _yuitest_coverline("build/axis-category/axis-category.js", 64);
if(direction && direction === "vertical")
        {
            _yuitest_coverline("build/axis-category/axis-category.js", 66);
label = data[l - (i + 1)];
        }
        else
        {
            _yuitest_coverline("build/axis-category/axis-category.js", 70);
label = data[i];
        }
        _yuitest_coverline("build/axis-category/axis-category.js", 72);
return label;
    }
});



}, '@VERSION@', {"requires": ["axis", "axis-category-base"]});
