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
_yuitest_coverage["build/series-areaspline-stacked/series-areaspline-stacked.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-areaspline-stacked/series-areaspline-stacked.js",
    code: []
};
_yuitest_coverage["build/series-areaspline-stacked/series-areaspline-stacked.js"].code=["YUI.add('series-areaspline-stacked', function (Y, NAME) {","","/**"," * Provides functionality for creating a stacked area spline series."," *"," * @module charts"," * @submodule series-areaspline-stacked"," */","/**"," * StackedAreaSplineSeries creates a stacked area chart with points data points connected by a curve."," *"," * @class StackedAreaSplineSeries"," * @extends AreaSeries"," * @uses CurveUtil"," * @uses StackingUtil"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-areaspline-stacked"," */","Y.StackedAreaSplineSeries = Y.Base.create(\"stackedAreaSplineSeries\", Y.AreaSeries, [Y.CurveUtil, Y.StackingUtil], {","    /**","     * @protected","     *","     * Draws the series.","     *","     * @method drawSeries","     */","    drawSeries: function()","    {","        this._stackCoordinates();","        this.drawStackedAreaSpline();","    }","}, {","    ATTRS : {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default stackedAreaSpline","         */","        type: {","            value:\"stackedAreaSpline\"","        }","    }","});","","","","}, '@VERSION@', {\"requires\": [\"series-stacked\", \"series-areaspline\"]});"];
_yuitest_coverage["build/series-areaspline-stacked/series-areaspline-stacked.js"].lines = {"1":0,"20":0,"30":0,"31":0};
_yuitest_coverage["build/series-areaspline-stacked/series-areaspline-stacked.js"].functions = {"drawSeries:28":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-areaspline-stacked/series-areaspline-stacked.js"].coveredLines = 4;
_yuitest_coverage["build/series-areaspline-stacked/series-areaspline-stacked.js"].coveredFunctions = 2;
_yuitest_coverline("build/series-areaspline-stacked/series-areaspline-stacked.js", 1);
YUI.add('series-areaspline-stacked', function (Y, NAME) {

/**
 * Provides functionality for creating a stacked area spline series.
 *
 * @module charts
 * @submodule series-areaspline-stacked
 */
/**
 * StackedAreaSplineSeries creates a stacked area chart with points data points connected by a curve.
 *
 * @class StackedAreaSplineSeries
 * @extends AreaSeries
 * @uses CurveUtil
 * @uses StackingUtil
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-areaspline-stacked
 */
_yuitest_coverfunc("build/series-areaspline-stacked/series-areaspline-stacked.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-areaspline-stacked/series-areaspline-stacked.js", 20);
Y.StackedAreaSplineSeries = Y.Base.create("stackedAreaSplineSeries", Y.AreaSeries, [Y.CurveUtil, Y.StackingUtil], {
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        _yuitest_coverfunc("build/series-areaspline-stacked/series-areaspline-stacked.js", "drawSeries", 28);
_yuitest_coverline("build/series-areaspline-stacked/series-areaspline-stacked.js", 30);
this._stackCoordinates();
        _yuitest_coverline("build/series-areaspline-stacked/series-areaspline-stacked.js", 31);
this.drawStackedAreaSpline();
    }
}, {
    ATTRS : {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedAreaSpline
         */
        type: {
            value:"stackedAreaSpline"
        }
    }
});



}, '@VERSION@', {"requires": ["series-stacked", "series-areaspline"]});
