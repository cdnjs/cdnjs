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
_yuitest_coverage["build/axis-category/axis-category.js"].code=["YUI.add('axis-category', function (Y, NAME) {","","/**"," * Provides functionality for drawing a category axis for use with a chart."," *"," * @module charts"," * @submodule axis-category"," */","/**"," * CategoryAxis draws a category axis for a chart."," *"," * @class CategoryAxis"," * @constructor"," * @extends Axis"," * @uses CategoryImpl"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis-category"," */","Y.CategoryAxis = Y.Base.create(\"categoryAxis\", Y.Axis, [Y.CategoryImpl], {","    /**","     * Returns the distance between major units on an axis.","     *","     * @method getMajorUnitDistance","     * @param {Number} len Number of ticks","     * @param {Number} uiLen Size of the axis.","     * @param {Object} majorUnit Hash of properties used to determine the majorUnit","     * @return Number","     */","    getMajorUnitDistance: function(len, uiLen, majorUnit)","    {","        var dist;","        if(majorUnit.determinant === \"count\")","        {","            dist = uiLen/len;","        }","        else if(majorUnit.determinant === \"distance\")","        {","            dist = majorUnit.distance;","        }","        return dist;","    },","","    /**","     * Returns a string corresponding to the first label on an","     * axis.","     *","     * @method getMinimumValue","     * @return String","     */","    getMinimumValue: function()","    {","        var data = this.get(\"data\"),","            label = data[0];","        return label;","    },","","    /**","     * Returns a string corresponding to the last label on an","     * axis.","     *","     * @method getMaximumValue","     * @return String","     */","    getMaximumValue: function()","    {","        var data = this.get(\"data\"),","            len = data.length - 1,","            label = data[len];","        return label;","    },","","    /**","     * Calculates and returns a value based on the number of labels and the index of","     * the current label.","     *","     * @method _getLabelByIndex","     * @param {Number} i Index of the label.","     * @param {Number} l Total number of labels.","     * @param {String} direction The direction of the axis. (vertical or horizontal)","     * @return String","     * @private","     */","    _getLabelByIndex: function(i, l, direction)","    {","        var label,","            data = this.get(\"data\");","        if(direction && direction == \"vertical\")","        {","            label = data[i];","        }","        else","        {","            label = data[l - (i + 1)];","        }","        return label;","    }","});","","","","}, '@VERSION@', {\"requires\": [\"axis\", \"axis-category-base\"]});"];
_yuitest_coverage["build/axis-category/axis-category.js"].lines = {"1":0,"19":0,"31":0,"32":0,"34":0,"36":0,"38":0,"40":0,"52":0,"54":0,"66":0,"69":0,"85":0,"87":0,"89":0,"93":0,"95":0};
_yuitest_coverage["build/axis-category/axis-category.js"].functions = {"getMajorUnitDistance:29":0,"getMinimumValue:50":0,"getMaximumValue:64":0,"_getLabelByIndex:83":0,"(anonymous 1):1":0};
_yuitest_coverage["build/axis-category/axis-category.js"].coveredLines = 17;
_yuitest_coverage["build/axis-category/axis-category.js"].coveredFunctions = 5;
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
     * Returns the distance between major units on an axis.
     *
     * @method getMajorUnitDistance
     * @param {Number} len Number of ticks
     * @param {Number} uiLen Size of the axis.
     * @param {Object} majorUnit Hash of properties used to determine the majorUnit
     * @return Number
     */
    getMajorUnitDistance: function(len, uiLen, majorUnit)
    {
        _yuitest_coverfunc("build/axis-category/axis-category.js", "getMajorUnitDistance", 29);
_yuitest_coverline("build/axis-category/axis-category.js", 31);
var dist;
        _yuitest_coverline("build/axis-category/axis-category.js", 32);
if(majorUnit.determinant === "count")
        {
            _yuitest_coverline("build/axis-category/axis-category.js", 34);
dist = uiLen/len;
        }
        else {_yuitest_coverline("build/axis-category/axis-category.js", 36);
if(majorUnit.determinant === "distance")
        {
            _yuitest_coverline("build/axis-category/axis-category.js", 38);
dist = majorUnit.distance;
        }}
        _yuitest_coverline("build/axis-category/axis-category.js", 40);
return dist;
    },

    /**
     * Returns a string corresponding to the first label on an
     * axis.
     *
     * @method getMinimumValue
     * @return String
     */
    getMinimumValue: function()
    {
        _yuitest_coverfunc("build/axis-category/axis-category.js", "getMinimumValue", 50);
_yuitest_coverline("build/axis-category/axis-category.js", 52);
var data = this.get("data"),
            label = data[0];
        _yuitest_coverline("build/axis-category/axis-category.js", 54);
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
        _yuitest_coverfunc("build/axis-category/axis-category.js", "getMaximumValue", 64);
_yuitest_coverline("build/axis-category/axis-category.js", 66);
var data = this.get("data"),
            len = data.length - 1,
            label = data[len];
        _yuitest_coverline("build/axis-category/axis-category.js", 69);
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
        _yuitest_coverfunc("build/axis-category/axis-category.js", "_getLabelByIndex", 83);
_yuitest_coverline("build/axis-category/axis-category.js", 85);
var label,
            data = this.get("data");
        _yuitest_coverline("build/axis-category/axis-category.js", 87);
if(direction && direction == "vertical")
        {
            _yuitest_coverline("build/axis-category/axis-category.js", 89);
label = data[i];
        }
        else
        {
            _yuitest_coverline("build/axis-category/axis-category.js", 93);
label = data[l - (i + 1)];
        }
        _yuitest_coverline("build/axis-category/axis-category.js", 95);
return label;
    }
});



}, '@VERSION@', {"requires": ["axis", "axis-category-base"]});
