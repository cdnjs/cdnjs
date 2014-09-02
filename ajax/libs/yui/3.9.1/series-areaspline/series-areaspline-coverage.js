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
_yuitest_coverage["build/series-areaspline/series-areaspline.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-areaspline/series-areaspline.js",
    code: []
};
_yuitest_coverage["build/series-areaspline/series-areaspline.js"].code=["YUI.add('series-areaspline', function (Y, NAME) {","","/**"," * Provides functionality for creating an areaspline series."," *"," * @module charts"," * @submodule series-areaspline"," */","/**"," * AreaSplineSeries renders an area graph with data points connected by a curve."," *"," * @class AreaSplineSeries"," * @extends AreaSeries"," * @uses CurveUtil"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-areaspline"," */","Y.AreaSplineSeries = Y.Base.create(\"areaSplineSeries\", Y.AreaSeries, [Y.CurveUtil], {","    /**","     * @protected","     *","     * Draws the series.","     *","     * @method drawSeries","     */","    drawSeries: function()","    {","        this.drawAreaSpline();","    }","}, {","	ATTRS : {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default areaSpline","         */","        type: {","            value:\"areaSpline\"","        }","","        /**","         * Style properties used for drawing area fills. This attribute is inherited from `Renderer`. Below are the default values:","         *","         *  <dl>","         *      <dt>color</dt><dd>The color of the fill. The default value is determined by the order of the series on the graph. The color will be","         *      retrieved from the following array:","         *      `[\"#66007f\", \"#a86f41\", \"#295454\", \"#996ab2\", \"#e8cdb7\", \"#90bdbd\",\"#000000\",\"#c3b8ca\", \"#968373\", \"#678585\"]`","         *      </dd>","         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","","","","}, '@VERSION@', {\"requires\": [\"series-area\", \"series-curve-util\"]});"];
_yuitest_coverage["build/series-areaspline/series-areaspline.js"].lines = {"1":0,"19":0,"29":0};
_yuitest_coverage["build/series-areaspline/series-areaspline.js"].functions = {"drawSeries:27":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-areaspline/series-areaspline.js"].coveredLines = 3;
_yuitest_coverage["build/series-areaspline/series-areaspline.js"].coveredFunctions = 2;
_yuitest_coverline("build/series-areaspline/series-areaspline.js", 1);
YUI.add('series-areaspline', function (Y, NAME) {

/**
 * Provides functionality for creating an areaspline series.
 *
 * @module charts
 * @submodule series-areaspline
 */
/**
 * AreaSplineSeries renders an area graph with data points connected by a curve.
 *
 * @class AreaSplineSeries
 * @extends AreaSeries
 * @uses CurveUtil
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-areaspline
 */
_yuitest_coverfunc("build/series-areaspline/series-areaspline.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-areaspline/series-areaspline.js", 19);
Y.AreaSplineSeries = Y.Base.create("areaSplineSeries", Y.AreaSeries, [Y.CurveUtil], {
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        _yuitest_coverfunc("build/series-areaspline/series-areaspline.js", "drawSeries", 27);
_yuitest_coverline("build/series-areaspline/series-areaspline.js", 29);
this.drawAreaSpline();
    }
}, {
	ATTRS : {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default areaSpline
         */
        type: {
            value:"areaSpline"
        }

        /**
         * Style properties used for drawing area fills. This attribute is inherited from `Renderer`. Below are the default values:
         *
         *  <dl>
         *      <dt>color</dt><dd>The color of the fill. The default value is determined by the order of the series on the graph. The color will be
         *      retrieved from the following array:
         *      `["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"]`
         *      </dd>
         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});



}, '@VERSION@', {"requires": ["series-area", "series-curve-util"]});
