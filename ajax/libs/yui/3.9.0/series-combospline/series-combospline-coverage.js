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
_yuitest_coverage["build/series-combospline/series-combospline.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-combospline/series-combospline.js",
    code: []
};
_yuitest_coverage["build/series-combospline/series-combospline.js"].code=["YUI.add('series-combospline', function (Y, NAME) {","","/**"," * Provides functionality for creating a combospline series."," *"," * @module charts"," * @submodule series-combospline"," */","/**"," * The ComboSplineSeries class renders a combination of splines, plots and areaspline fills in a single series. Each"," * series type has a corresponding boolean attribute indicating if it is rendered. By default, splines and plots"," * are rendered and areaspline is not."," *"," * @class ComboSplineSeries"," * @extends ComboSeries"," * @uses CurveUtil"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-combospline"," */","Y.ComboSplineSeries = Y.Base.create(\"comboSplineSeries\", Y.ComboSeries, [Y.CurveUtil], {","    /**","     * @protected","     *","     * Draws the series.","     *","     * @method drawSeries","     */","    drawSeries: function()","    {","        if(this.get(\"showAreaFill\"))","        {","            this.drawAreaSpline();","        }","        if(this.get(\"showLines\"))","        {","            this.drawSpline();","        }","        if(this.get(\"showMarkers\"))","        {","            this.drawPlots();","        }","    }","}, {","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default comboSpline","         */","        type: {","            value : \"comboSpline\"","        }","    }","});","","","}, '@VERSION@', {\"requires\": [\"series-combo\", \"series-curve-util\"]});"];
_yuitest_coverage["build/series-combospline/series-combospline.js"].lines = {"1":0,"21":0,"31":0,"33":0,"35":0,"37":0,"39":0,"41":0};
_yuitest_coverage["build/series-combospline/series-combospline.js"].functions = {"drawSeries:29":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-combospline/series-combospline.js"].coveredLines = 8;
_yuitest_coverage["build/series-combospline/series-combospline.js"].coveredFunctions = 2;
_yuitest_coverline("build/series-combospline/series-combospline.js", 1);
YUI.add('series-combospline', function (Y, NAME) {

/**
 * Provides functionality for creating a combospline series.
 *
 * @module charts
 * @submodule series-combospline
 */
/**
 * The ComboSplineSeries class renders a combination of splines, plots and areaspline fills in a single series. Each
 * series type has a corresponding boolean attribute indicating if it is rendered. By default, splines and plots
 * are rendered and areaspline is not.
 *
 * @class ComboSplineSeries
 * @extends ComboSeries
 * @uses CurveUtil
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-combospline
 */
_yuitest_coverfunc("build/series-combospline/series-combospline.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-combospline/series-combospline.js", 21);
Y.ComboSplineSeries = Y.Base.create("comboSplineSeries", Y.ComboSeries, [Y.CurveUtil], {
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        _yuitest_coverfunc("build/series-combospline/series-combospline.js", "drawSeries", 29);
_yuitest_coverline("build/series-combospline/series-combospline.js", 31);
if(this.get("showAreaFill"))
        {
            _yuitest_coverline("build/series-combospline/series-combospline.js", 33);
this.drawAreaSpline();
        }
        _yuitest_coverline("build/series-combospline/series-combospline.js", 35);
if(this.get("showLines"))
        {
            _yuitest_coverline("build/series-combospline/series-combospline.js", 37);
this.drawSpline();
        }
        _yuitest_coverline("build/series-combospline/series-combospline.js", 39);
if(this.get("showMarkers"))
        {
            _yuitest_coverline("build/series-combospline/series-combospline.js", 41);
this.drawPlots();
        }
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default comboSpline
         */
        type: {
            value : "comboSpline"
        }
    }
});


}, '@VERSION@', {"requires": ["series-combo", "series-curve-util"]});
