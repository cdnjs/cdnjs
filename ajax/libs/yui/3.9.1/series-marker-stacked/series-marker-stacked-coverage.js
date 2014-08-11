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
_yuitest_coverage["build/series-marker-stacked/series-marker-stacked.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-marker-stacked/series-marker-stacked.js",
    code: []
};
_yuitest_coverage["build/series-marker-stacked/series-marker-stacked.js"].code=["YUI.add('series-marker-stacked', function (Y, NAME) {","","/**"," * Provides functionality for creating a stacked marker series."," *"," * @module charts"," * @submodule series-marker-stacked"," */","/**"," * StackedMarkerSeries plots markers with different series stacked along the value axis to indicate each"," * series' contribution to a cumulative total."," *"," * @class StackedMarkerSeries"," * @constructor"," * @extends MarkerSeries"," * @uses StackingUtil"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-marker-stacked"," */","Y.StackedMarkerSeries = Y.Base.create(\"stackedMarkerSeries\", Y.MarkerSeries, [Y.StackingUtil], {","    /**","     * @protected","     *","     * Calculates the coordinates for the series. Overrides base implementation.","     *","     * @method setAreaData","     */","    setAreaData: function()","    {","        Y.StackedMarkerSeries.superclass.setAreaData.apply(this);","        this._stackCoordinates.apply(this);","    }","}, {","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default stackedMarker","         */","        type: {","            value:\"stackedMarker\"","        }","    }","});","","","","}, '@VERSION@', {\"requires\": [\"series-stacked\", \"series-marker\"]});"];
_yuitest_coverage["build/series-marker-stacked/series-marker-stacked.js"].lines = {"1":0,"20":0,"30":0,"31":0};
_yuitest_coverage["build/series-marker-stacked/series-marker-stacked.js"].functions = {"setAreaData:28":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-marker-stacked/series-marker-stacked.js"].coveredLines = 4;
_yuitest_coverage["build/series-marker-stacked/series-marker-stacked.js"].coveredFunctions = 2;
_yuitest_coverline("build/series-marker-stacked/series-marker-stacked.js", 1);
YUI.add('series-marker-stacked', function (Y, NAME) {

/**
 * Provides functionality for creating a stacked marker series.
 *
 * @module charts
 * @submodule series-marker-stacked
 */
/**
 * StackedMarkerSeries plots markers with different series stacked along the value axis to indicate each
 * series' contribution to a cumulative total.
 *
 * @class StackedMarkerSeries
 * @constructor
 * @extends MarkerSeries
 * @uses StackingUtil
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-marker-stacked
 */
_yuitest_coverfunc("build/series-marker-stacked/series-marker-stacked.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-marker-stacked/series-marker-stacked.js", 20);
Y.StackedMarkerSeries = Y.Base.create("stackedMarkerSeries", Y.MarkerSeries, [Y.StackingUtil], {
    /**
     * @protected
     *
     * Calculates the coordinates for the series. Overrides base implementation.
     *
     * @method setAreaData
     */
    setAreaData: function()
    {
        _yuitest_coverfunc("build/series-marker-stacked/series-marker-stacked.js", "setAreaData", 28);
_yuitest_coverline("build/series-marker-stacked/series-marker-stacked.js", 30);
Y.StackedMarkerSeries.superclass.setAreaData.apply(this);
        _yuitest_coverline("build/series-marker-stacked/series-marker-stacked.js", 31);
this._stackCoordinates.apply(this);
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedMarker
         */
        type: {
            value:"stackedMarker"
        }
    }
});



}, '@VERSION@', {"requires": ["series-stacked", "series-marker"]});
