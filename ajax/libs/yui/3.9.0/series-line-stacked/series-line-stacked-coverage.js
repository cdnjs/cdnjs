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
_yuitest_coverage["build/series-line-stacked/series-line-stacked.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-line-stacked/series-line-stacked.js",
    code: []
};
_yuitest_coverage["build/series-line-stacked/series-line-stacked.js"].code=["YUI.add('series-line-stacked', function (Y, NAME) {","","/**"," * Provides functionality for creatiing a stacked line series."," *"," * @module charts"," * @submodule series-line-stacked"," */","/**"," * StackedLineSeries creates line graphs in which the different series are stacked along a value axis"," * to indicate their contribution to a cumulative total."," *"," * @class StackedLineSeries"," * @constructor"," * @extends  LineSeries"," * @uses StackingUtil"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-line-stacked"," */","Y.StackedLineSeries = Y.Base.create(\"stackedLineSeries\", Y.LineSeries, [Y.StackingUtil], {","    /**","     * @protected","     *","     * Calculates the coordinates for the series. Overrides base implementation.","     *","     * @method setAreaData","     */","    setAreaData: function()","    {","        Y.StackedLineSeries.superclass.setAreaData.apply(this);","        this._stackCoordinates.apply(this);","    }","}, {","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default stackedLine","         */","        type: {","            value:\"stackedLine\"","        }","    }","});","","","}, '@VERSION@', {\"requires\": [\"series-stacked\", \"series-line\"]});"];
_yuitest_coverage["build/series-line-stacked/series-line-stacked.js"].lines = {"1":0,"20":0,"30":0,"31":0};
_yuitest_coverage["build/series-line-stacked/series-line-stacked.js"].functions = {"setAreaData:28":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-line-stacked/series-line-stacked.js"].coveredLines = 4;
_yuitest_coverage["build/series-line-stacked/series-line-stacked.js"].coveredFunctions = 2;
_yuitest_coverline("build/series-line-stacked/series-line-stacked.js", 1);
YUI.add('series-line-stacked', function (Y, NAME) {

/**
 * Provides functionality for creatiing a stacked line series.
 *
 * @module charts
 * @submodule series-line-stacked
 */
/**
 * StackedLineSeries creates line graphs in which the different series are stacked along a value axis
 * to indicate their contribution to a cumulative total.
 *
 * @class StackedLineSeries
 * @constructor
 * @extends  LineSeries
 * @uses StackingUtil
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-line-stacked
 */
_yuitest_coverfunc("build/series-line-stacked/series-line-stacked.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-line-stacked/series-line-stacked.js", 20);
Y.StackedLineSeries = Y.Base.create("stackedLineSeries", Y.LineSeries, [Y.StackingUtil], {
    /**
     * @protected
     *
     * Calculates the coordinates for the series. Overrides base implementation.
     *
     * @method setAreaData
     */
    setAreaData: function()
    {
        _yuitest_coverfunc("build/series-line-stacked/series-line-stacked.js", "setAreaData", 28);
_yuitest_coverline("build/series-line-stacked/series-line-stacked.js", 30);
Y.StackedLineSeries.superclass.setAreaData.apply(this);
        _yuitest_coverline("build/series-line-stacked/series-line-stacked.js", 31);
this._stackCoordinates.apply(this);
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedLine
         */
        type: {
            value:"stackedLine"
        }
    }
});


}, '@VERSION@', {"requires": ["series-stacked", "series-line"]});
