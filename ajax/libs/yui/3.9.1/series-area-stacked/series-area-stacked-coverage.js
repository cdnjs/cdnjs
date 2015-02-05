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
_yuitest_coverage["build/series-area-stacked/series-area-stacked.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-area-stacked/series-area-stacked.js",
    code: []
};
_yuitest_coverage["build/series-area-stacked/series-area-stacked.js"].code=["YUI.add('series-area-stacked', function (Y, NAME) {","","/**"," * Provides functionality for creating a stacked area series."," *"," * @module charts"," * @submodule series-area-stacked"," */","/**"," * StackedAreaSeries area fills to display data showing its contribution to a whole."," *"," * @class StackedAreaSeries"," * @extends AreaSeries"," * @uses StackingUtil"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-area-stacked"," */","Y.StackedAreaSeries = Y.Base.create(\"stackedAreaSeries\", Y.AreaSeries, [Y.StackingUtil], {","    /**","     * @protected","     *","     * Calculates the coordinates for the series. Overrides base implementation.","     *","     * @method setAreaData","     */","    setAreaData: function()","    {","        Y.StackedAreaSeries.superclass.setAreaData.apply(this);","        this._stackCoordinates.apply(this);","    },","","    /**","     * @protected","     *","     * Draws the series","     *","     * @method drawSeries","     */","	drawSeries: function()","    {","        this.drawFill.apply(this, this._getStackedClosingPoints());","    }","}, {","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default stackedArea","         */","        type: {","            value:\"stackedArea\"","        }","    }","});","","","}, '@VERSION@', {\"requires\": [\"series-stacked\", \"series-area\"]});"];
_yuitest_coverage["build/series-area-stacked/series-area-stacked.js"].lines = {"1":0,"19":0,"29":0,"30":0,"42":0};
_yuitest_coverage["build/series-area-stacked/series-area-stacked.js"].functions = {"setAreaData:27":0,"drawSeries:40":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-area-stacked/series-area-stacked.js"].coveredLines = 5;
_yuitest_coverage["build/series-area-stacked/series-area-stacked.js"].coveredFunctions = 3;
_yuitest_coverline("build/series-area-stacked/series-area-stacked.js", 1);
YUI.add('series-area-stacked', function (Y, NAME) {

/**
 * Provides functionality for creating a stacked area series.
 *
 * @module charts
 * @submodule series-area-stacked
 */
/**
 * StackedAreaSeries area fills to display data showing its contribution to a whole.
 *
 * @class StackedAreaSeries
 * @extends AreaSeries
 * @uses StackingUtil
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-area-stacked
 */
_yuitest_coverfunc("build/series-area-stacked/series-area-stacked.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-area-stacked/series-area-stacked.js", 19);
Y.StackedAreaSeries = Y.Base.create("stackedAreaSeries", Y.AreaSeries, [Y.StackingUtil], {
    /**
     * @protected
     *
     * Calculates the coordinates for the series. Overrides base implementation.
     *
     * @method setAreaData
     */
    setAreaData: function()
    {
        _yuitest_coverfunc("build/series-area-stacked/series-area-stacked.js", "setAreaData", 27);
_yuitest_coverline("build/series-area-stacked/series-area-stacked.js", 29);
Y.StackedAreaSeries.superclass.setAreaData.apply(this);
        _yuitest_coverline("build/series-area-stacked/series-area-stacked.js", 30);
this._stackCoordinates.apply(this);
    },

    /**
     * @protected
     *
     * Draws the series
     *
     * @method drawSeries
     */
	drawSeries: function()
    {
        _yuitest_coverfunc("build/series-area-stacked/series-area-stacked.js", "drawSeries", 40);
_yuitest_coverline("build/series-area-stacked/series-area-stacked.js", 42);
this.drawFill.apply(this, this._getStackedClosingPoints());
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedArea
         */
        type: {
            value:"stackedArea"
        }
    }
});


}, '@VERSION@', {"requires": ["series-stacked", "series-area"]});
