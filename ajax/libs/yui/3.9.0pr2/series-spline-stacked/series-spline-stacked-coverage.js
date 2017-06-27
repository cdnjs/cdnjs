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
_yuitest_coverage["build/series-spline-stacked/series-spline-stacked.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-spline-stacked/series-spline-stacked.js",
    code: []
};
_yuitest_coverage["build/series-spline-stacked/series-spline-stacked.js"].code=["YUI.add('series-spline-stacked', function (Y, NAME) {","","/**"," * Provides functionality for creating a stacked spline series."," *"," * @module charts"," * @submodule series-spline-stacked"," */","/**"," * StackedSplineSeries creates spline graphs in which the different series are stacked along a value axis"," * to indicate their contribution to a cumulative total."," *"," * @class StackedSplineSeries"," * @constructor"," * @extends SplineSeries"," * @uses StackingUtil"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-spline-stacked"," */","Y.StackedSplineSeries = Y.Base.create(\"stackedSplineSeries\", Y.SplineSeries, [Y.StackingUtil], {","    /**","     * @protected","     *","     * Calculates the coordinates for the series. Overrides base implementation.","     *","     * @method setAreaData","     */","    setAreaData: function()","    {","        Y.StackedSplineSeries.superclass.setAreaData.apply(this);","        this._stackCoordinates.apply(this);","    }","}, {","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default stackedSpline","         */","        type: {","            value:\"stackedSpline\"","        }","    }","});","","","","}, '@VERSION@', {\"requires\": [\"series-stacked\", \"series-spline\"]});"];
_yuitest_coverage["build/series-spline-stacked/series-spline-stacked.js"].lines = {"1":0,"20":0,"30":0,"31":0};
_yuitest_coverage["build/series-spline-stacked/series-spline-stacked.js"].functions = {"setAreaData:28":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-spline-stacked/series-spline-stacked.js"].coveredLines = 4;
_yuitest_coverage["build/series-spline-stacked/series-spline-stacked.js"].coveredFunctions = 2;
_yuitest_coverline("build/series-spline-stacked/series-spline-stacked.js", 1);
YUI.add('series-spline-stacked', function (Y, NAME) {

/**
 * Provides functionality for creating a stacked spline series.
 *
 * @module charts
 * @submodule series-spline-stacked
 */
/**
 * StackedSplineSeries creates spline graphs in which the different series are stacked along a value axis
 * to indicate their contribution to a cumulative total.
 *
 * @class StackedSplineSeries
 * @constructor
 * @extends SplineSeries
 * @uses StackingUtil
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-spline-stacked
 */
_yuitest_coverfunc("build/series-spline-stacked/series-spline-stacked.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-spline-stacked/series-spline-stacked.js", 20);
Y.StackedSplineSeries = Y.Base.create("stackedSplineSeries", Y.SplineSeries, [Y.StackingUtil], {
    /**
     * @protected
     *
     * Calculates the coordinates for the series. Overrides base implementation.
     *
     * @method setAreaData
     */
    setAreaData: function()
    {
        _yuitest_coverfunc("build/series-spline-stacked/series-spline-stacked.js", "setAreaData", 28);
_yuitest_coverline("build/series-spline-stacked/series-spline-stacked.js", 30);
Y.StackedSplineSeries.superclass.setAreaData.apply(this);
        _yuitest_coverline("build/series-spline-stacked/series-spline-stacked.js", 31);
this._stackCoordinates.apply(this);
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedSpline
         */
        type: {
            value:"stackedSpline"
        }
    }
});



}, '@VERSION@', {"requires": ["series-stacked", "series-spline"]});
