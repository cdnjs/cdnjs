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
_yuitest_coverage["build/series-combo-stacked/series-combo-stacked.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-combo-stacked/series-combo-stacked.js",
    code: []
};
_yuitest_coverage["build/series-combo-stacked/series-combo-stacked.js"].code=["YUI.add('series-combo-stacked', function (Y, NAME) {","","/**"," * Provides functionality for creating a stacked combo series."," *"," * @module charts"," * @submodule series-combo-stacked"," */","/**"," * The StackedComboSeries class renders a combination of lines, plots and area fills in a single series. Series"," * are stacked along the value axis to indicate each series contribution to a cumulative total. Each"," * series type has a corresponding boolean attribute indicating if it is rendered. By default, all three types are"," * rendered."," *"," * @class StackedComboSeries"," * @extends ComboSeries"," * @uses StackingUtil"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-combo-stacked"," */","Y.StackedComboSeries = Y.Base.create(\"stackedComboSeries\", Y.ComboSeries, [Y.StackingUtil], {","    /**","     * @protected","     *","     * Calculates the coordinates for the series. Overrides base implementation.","     *","     * @method setAreaData","     */","    setAreaData: function()","    {","        Y.StackedComboSeries.superclass.setAreaData.apply(this);","        this._stackCoordinates.apply(this);","    },","","    /**","     * @protected","     *","     * Draws the series.","     *","     * @method drawSeries","     */","    drawSeries: function()","    {","        if(this.get(\"showAreaFill\"))","        {","            this.drawFill.apply(this, this._getStackedClosingPoints());","        }","        if(this.get(\"showLines\"))","        {","            this.drawLines();","        }","        if(this.get(\"showMarkers\"))","        {","            this.drawPlots();","        }","    }","","}, {","    ATTRS : {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default stackedCombo","         */","        type: {","            value: \"stackedCombo\"","        },","","        /**","         * Indicates whether a fill is displayed.","         *","         * @attribute showAreaFill","         * @type Boolean","         * @default true","         */","        showAreaFill: {","            value: true","        }","    }","});","","","}, '@VERSION@', {\"requires\": [\"series-stacked\", \"series-combo\"]});"];
_yuitest_coverage["build/series-combo-stacked/series-combo-stacked.js"].lines = {"1":0,"22":0,"32":0,"33":0,"45":0,"47":0,"49":0,"51":0,"53":0,"55":0};
_yuitest_coverage["build/series-combo-stacked/series-combo-stacked.js"].functions = {"setAreaData:30":0,"drawSeries:43":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-combo-stacked/series-combo-stacked.js"].coveredLines = 10;
_yuitest_coverage["build/series-combo-stacked/series-combo-stacked.js"].coveredFunctions = 3;
_yuitest_coverline("build/series-combo-stacked/series-combo-stacked.js", 1);
YUI.add('series-combo-stacked', function (Y, NAME) {

/**
 * Provides functionality for creating a stacked combo series.
 *
 * @module charts
 * @submodule series-combo-stacked
 */
/**
 * The StackedComboSeries class renders a combination of lines, plots and area fills in a single series. Series
 * are stacked along the value axis to indicate each series contribution to a cumulative total. Each
 * series type has a corresponding boolean attribute indicating if it is rendered. By default, all three types are
 * rendered.
 *
 * @class StackedComboSeries
 * @extends ComboSeries
 * @uses StackingUtil
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-combo-stacked
 */
_yuitest_coverfunc("build/series-combo-stacked/series-combo-stacked.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-combo-stacked/series-combo-stacked.js", 22);
Y.StackedComboSeries = Y.Base.create("stackedComboSeries", Y.ComboSeries, [Y.StackingUtil], {
    /**
     * @protected
     *
     * Calculates the coordinates for the series. Overrides base implementation.
     *
     * @method setAreaData
     */
    setAreaData: function()
    {
        _yuitest_coverfunc("build/series-combo-stacked/series-combo-stacked.js", "setAreaData", 30);
_yuitest_coverline("build/series-combo-stacked/series-combo-stacked.js", 32);
Y.StackedComboSeries.superclass.setAreaData.apply(this);
        _yuitest_coverline("build/series-combo-stacked/series-combo-stacked.js", 33);
this._stackCoordinates.apply(this);
    },

    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        _yuitest_coverfunc("build/series-combo-stacked/series-combo-stacked.js", "drawSeries", 43);
_yuitest_coverline("build/series-combo-stacked/series-combo-stacked.js", 45);
if(this.get("showAreaFill"))
        {
            _yuitest_coverline("build/series-combo-stacked/series-combo-stacked.js", 47);
this.drawFill.apply(this, this._getStackedClosingPoints());
        }
        _yuitest_coverline("build/series-combo-stacked/series-combo-stacked.js", 49);
if(this.get("showLines"))
        {
            _yuitest_coverline("build/series-combo-stacked/series-combo-stacked.js", 51);
this.drawLines();
        }
        _yuitest_coverline("build/series-combo-stacked/series-combo-stacked.js", 53);
if(this.get("showMarkers"))
        {
            _yuitest_coverline("build/series-combo-stacked/series-combo-stacked.js", 55);
this.drawPlots();
        }
    }

}, {
    ATTRS : {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedCombo
         */
        type: {
            value: "stackedCombo"
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


}, '@VERSION@', {"requires": ["series-stacked", "series-combo"]});
