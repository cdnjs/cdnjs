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
_yuitest_coverage["build/series-combospline-stacked/series-combospline-stacked.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-combospline-stacked/series-combospline-stacked.js",
    code: []
};
_yuitest_coverage["build/series-combospline-stacked/series-combospline-stacked.js"].code=["YUI.add('series-combospline-stacked', function (Y, NAME) {","","/**"," * Provides functionality for creating a stacked combospline series."," *"," * @module charts"," * @submodule series-combospline-stacked"," */","/**"," * The StackedComboSplineSeries class renders a combination of splines, plots and areaspline fills in a single series. Series"," * are stacked along the value axis to indicate each series contribution to a cumulative total. Each"," * series type has a corresponding boolean attribute indicating if it is rendered. By default, all three types are"," * rendered."," *"," * @class StackedComboSplineSeries"," * @extends StackedComboSeries"," * @uses CurveUtil"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-combospline-stacked"," */","Y.StackedComboSplineSeries = Y.Base.create(\"stackedComboSplineSeries\", Y.StackedComboSeries, [Y.CurveUtil], {","    /**","	 * @protected","     *","     * Draws the series.","     *","     * @method drawSeries","	 */","	drawSeries: function()","    {","        if(this.get(\"showAreaFill\"))","        {","            this.drawStackedAreaSpline();","        }","        if(this.get(\"showLines\"))","        {","            this.drawSpline();","        }","        if(this.get(\"showMarkers\"))","        {","            this.drawPlots();","        }","    }","}, {","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default stackedComboSpline","         */","        type : {","            value : \"stackedComboSpline\"","        },","","        /**","         * Indicates whether a fill is displayed.","         *","         * @attribute showAreaFill","         * @type Boolean","         * @default true","         */","        showAreaFill: {","            value: true","        }","    }","});","","","}, '@VERSION@', {\"requires\": [\"series-combo-stacked\", \"series-curve-util\"]});"];
_yuitest_coverage["build/series-combospline-stacked/series-combospline-stacked.js"].lines = {"1":0,"22":0,"32":0,"34":0,"36":0,"38":0,"40":0,"42":0};
_yuitest_coverage["build/series-combospline-stacked/series-combospline-stacked.js"].functions = {"drawSeries:30":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-combospline-stacked/series-combospline-stacked.js"].coveredLines = 8;
_yuitest_coverage["build/series-combospline-stacked/series-combospline-stacked.js"].coveredFunctions = 2;
_yuitest_coverline("build/series-combospline-stacked/series-combospline-stacked.js", 1);
YUI.add('series-combospline-stacked', function (Y, NAME) {

/**
 * Provides functionality for creating a stacked combospline series.
 *
 * @module charts
 * @submodule series-combospline-stacked
 */
/**
 * The StackedComboSplineSeries class renders a combination of splines, plots and areaspline fills in a single series. Series
 * are stacked along the value axis to indicate each series contribution to a cumulative total. Each
 * series type has a corresponding boolean attribute indicating if it is rendered. By default, all three types are
 * rendered.
 *
 * @class StackedComboSplineSeries
 * @extends StackedComboSeries
 * @uses CurveUtil
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-combospline-stacked
 */
_yuitest_coverfunc("build/series-combospline-stacked/series-combospline-stacked.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-combospline-stacked/series-combospline-stacked.js", 22);
Y.StackedComboSplineSeries = Y.Base.create("stackedComboSplineSeries", Y.StackedComboSeries, [Y.CurveUtil], {
    /**
	 * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
	 */
	drawSeries: function()
    {
        _yuitest_coverfunc("build/series-combospline-stacked/series-combospline-stacked.js", "drawSeries", 30);
_yuitest_coverline("build/series-combospline-stacked/series-combospline-stacked.js", 32);
if(this.get("showAreaFill"))
        {
            _yuitest_coverline("build/series-combospline-stacked/series-combospline-stacked.js", 34);
this.drawStackedAreaSpline();
        }
        _yuitest_coverline("build/series-combospline-stacked/series-combospline-stacked.js", 36);
if(this.get("showLines"))
        {
            _yuitest_coverline("build/series-combospline-stacked/series-combospline-stacked.js", 38);
this.drawSpline();
        }
        _yuitest_coverline("build/series-combospline-stacked/series-combospline-stacked.js", 40);
if(this.get("showMarkers"))
        {
            _yuitest_coverline("build/series-combospline-stacked/series-combospline-stacked.js", 42);
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
         * @default stackedComboSpline
         */
        type : {
            value : "stackedComboSpline"
        },

        /**
         * Indicates whether a fill is displayed.
         *
         * @attribute showAreaFill
         * @type Boolean
         * @default true
         */
        showAreaFill: {
            value: true
        }
    }
});


}, '@VERSION@', {"requires": ["series-combo-stacked", "series-curve-util"]});
