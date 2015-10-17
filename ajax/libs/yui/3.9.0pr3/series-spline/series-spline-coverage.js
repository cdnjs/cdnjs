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
_yuitest_coverage["build/series-spline/series-spline.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-spline/series-spline.js",
    code: []
};
_yuitest_coverage["build/series-spline/series-spline.js"].code=["YUI.add('series-spline', function (Y, NAME) {","","/**"," * Provides functionality for creating a spline series."," *"," * @module charts"," * @submodule series-spline"," */","/**"," * SplineSeries renders a graph with data points connected by a curve."," *"," * @class SplineSeries"," * @extends LineSeries"," * @uses CurveUtil"," * @uses Lines"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-spline"," */","Y.SplineSeries = Y.Base.create(\"splineSeries\",  Y.LineSeries, [Y.CurveUtil, Y.Lines], {","    /**","     * @protected","     *","     * Draws the series.","     *","     * @method drawSeries","     */","    drawSeries: function()","    {","        this.drawSpline();","    }","}, {","	ATTRS : {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default spline","         */","        type : {","            value:\"spline\"","        }","","        /**","         * Style properties used for drawing lines. This attribute is inherited from `Renderer`.","         * Below are the default values:","         *  <dl>","         *      <dt>color</dt><dd>The color of the line. The default value is determined by the order of the series on","         *      the graph. The color will be retrieved from the following array:","         *      `[\"#426ab3\", \"#d09b2c\", \"#000000\", \"#b82837\", \"#b384b5\", \"#ff7200\", \"#779de3\", \"#cbc8ba\", \"#7ed7a6\", \"#007a6c\"]`","         *      <dt>weight</dt><dd>Number that indicates the width of the line. The default value is 6.</dd>","         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the line. The default value is 1.</dd>","         *      <dt>lineType</dt><dd>Indicates whether the line is solid or dashed. The default value is solid.</dd>","         *      <dt>dashLength</dt><dd>When the `lineType` is dashed, indicates the length of the dash. The default value","         *      is 10.</dd>","         *      <dt>gapSpace</dt><dd>When the `lineType` is dashed, indicates the distance between dashes. The default value is","         *      10.</dd>","         *      <dt>connectDiscontinuousPoints</dt><dd>Indicates whether or not to connect lines when there is a missing or null","         *      value between points. The default value is true.</dd>","         *      <dt>discontinuousType</dt><dd>Indicates whether the line between discontinuous points is solid or dashed. The","         *      default value is solid.</dd>","         *      <dt>discontinuousDashLength</dt><dd>When the `discontinuousType` is dashed, indicates the length of the dash.","         *      The default value is 10.</dd>","         *      <dt>discontinuousGapSpace</dt><dd>When the `discontinuousType` is dashed, indicates the distance between dashes.","         *      The default value is 10.</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","","","","","","","","","}, '@VERSION@', {\"requires\": [\"series-line\", \"series-curve-util\"]});"];
_yuitest_coverage["build/series-spline/series-spline.js"].lines = {"1":0,"20":0,"30":0};
_yuitest_coverage["build/series-spline/series-spline.js"].functions = {"drawSeries:28":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-spline/series-spline.js"].coveredLines = 3;
_yuitest_coverage["build/series-spline/series-spline.js"].coveredFunctions = 2;
_yuitest_coverline("build/series-spline/series-spline.js", 1);
YUI.add('series-spline', function (Y, NAME) {

/**
 * Provides functionality for creating a spline series.
 *
 * @module charts
 * @submodule series-spline
 */
/**
 * SplineSeries renders a graph with data points connected by a curve.
 *
 * @class SplineSeries
 * @extends LineSeries
 * @uses CurveUtil
 * @uses Lines
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-spline
 */
_yuitest_coverfunc("build/series-spline/series-spline.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-spline/series-spline.js", 20);
Y.SplineSeries = Y.Base.create("splineSeries",  Y.LineSeries, [Y.CurveUtil, Y.Lines], {
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        _yuitest_coverfunc("build/series-spline/series-spline.js", "drawSeries", 28);
_yuitest_coverline("build/series-spline/series-spline.js", 30);
this.drawSpline();
    }
}, {
	ATTRS : {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default spline
         */
        type : {
            value:"spline"
        }

        /**
         * Style properties used for drawing lines. This attribute is inherited from `Renderer`.
         * Below are the default values:
         *  <dl>
         *      <dt>color</dt><dd>The color of the line. The default value is determined by the order of the series on
         *      the graph. The color will be retrieved from the following array:
         *      `["#426ab3", "#d09b2c", "#000000", "#b82837", "#b384b5", "#ff7200", "#779de3", "#cbc8ba", "#7ed7a6", "#007a6c"]`
         *      <dt>weight</dt><dd>Number that indicates the width of the line. The default value is 6.</dd>
         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the line. The default value is 1.</dd>
         *      <dt>lineType</dt><dd>Indicates whether the line is solid or dashed. The default value is solid.</dd>
         *      <dt>dashLength</dt><dd>When the `lineType` is dashed, indicates the length of the dash. The default value
         *      is 10.</dd>
         *      <dt>gapSpace</dt><dd>When the `lineType` is dashed, indicates the distance between dashes. The default value is
         *      10.</dd>
         *      <dt>connectDiscontinuousPoints</dt><dd>Indicates whether or not to connect lines when there is a missing or null
         *      value between points. The default value is true.</dd>
         *      <dt>discontinuousType</dt><dd>Indicates whether the line between discontinuous points is solid or dashed. The
         *      default value is solid.</dd>
         *      <dt>discontinuousDashLength</dt><dd>When the `discontinuousType` is dashed, indicates the length of the dash.
         *      The default value is 10.</dd>
         *      <dt>discontinuousGapSpace</dt><dd>When the `discontinuousType` is dashed, indicates the distance between dashes.
         *      The default value is 10.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});








}, '@VERSION@', {"requires": ["series-line", "series-curve-util"]});
