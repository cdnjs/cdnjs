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
_yuitest_coverage["build/series-line/series-line.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-line/series-line.js",
    code: []
};
_yuitest_coverage["build/series-line/series-line.js"].code=["YUI.add('series-line', function (Y, NAME) {","","/**"," * Provides functionality for creating a line series."," *"," * @module charts"," * @submodule series-line"," */","/**"," * The LineSeries class renders quantitative data on a graph by connecting relevant data points."," *"," * @class LineSeries"," * @extends CartesianSeries"," * @uses Lines"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-line"," */","Y.LineSeries = Y.Base.create(\"lineSeries\", Y.CartesianSeries, [Y.Lines], {","    /**","     * @protected","     *","     * @method drawSeries","     */","    drawSeries: function()","    {","        this.drawLines();","    },","","    /**","     * @protected","     *","     * Method used by `styles` setter. Overrides base implementation.","     *","     * @method _setStyles","     * @param {Object} newStyles Hash of properties to update.","     * @return Object","     */","    _setStyles: function(val)","    {","        if(!val.line)","        {","            val = {line:val};","        }","        return Y.LineSeries.superclass._setStyles.apply(this, [val]);","    },","","    /**","     * @protected","     *","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     */","    _getDefaultStyles: function()","    {","        var styles = this._mergeStyles({line:this._getLineDefaults()}, Y.LineSeries.superclass._getDefaultStyles());","        return styles;","    }","},","{","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default line","         */","        type: {","            value:\"line\"","        }","","        /**","         * Style properties used for drawing lines. This attribute is inherited from `Renderer`. Below are the","         * default values:","         *  <dl>","         *      <dt>color</dt><dd>The color of the line. The default value is determined by the order of the series","         *      on the graph. The color will be retrieved from the following array:","         *      `[\"#426ab3\", \"#d09b2c\", \"#000000\", \"#b82837\", \"#b384b5\", \"#ff7200\", \"#779de3\", \"#cbc8ba\", \"#7ed7a6\", \"#007a6c\"]`","         *      <dt>weight</dt><dd>Number that indicates the width of the line. The default value is 6.</dd>","         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the line. The default value is 1.</dd>","         *      <dt>lineType</dt><dd>Indicates whether the line is solid or dashed. The default value is solid.</dd>","         *      <dt>dashLength</dt><dd>When the `lineType` is dashed, indicates the length of the dash. The default","         *      value is 10.</dd>","         *      <dt>gapSpace</dt><dd>When the `lineType` is dashed, indicates the distance between dashes. The default","         *      value is 10.</dd>","         *      <dt>connectDiscontinuousPoints</dt><dd>Indicates whether or not to connect lines when there is a missing","         *      or null value between points. The default value is true.</dd>","         *      <dt>discontinuousType</dt><dd>Indicates whether the line between discontinuous points is solid or dashed.","         *      The default value is solid.</dd>","         *      <dt>discontinuousDashLength</dt><dd>When the `discontinuousType` is dashed, indicates the length of the","         *      dash. The default value is 10.</dd>","         *      <dt>discontinuousGapSpace</dt><dd>When the `discontinuousType` is dashed, indicates the distance between","         *      dashes. The default value is 10.</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","","","","","","","","","}, '@VERSION@', {\"requires\": [\"series-cartesian\", \"series-line-util\"]});"];
_yuitest_coverage["build/series-line/series-line.js"].lines = {"1":0,"19":0,"27":0,"41":0,"43":0,"45":0,"59":0,"60":0};
_yuitest_coverage["build/series-line/series-line.js"].functions = {"drawSeries:25":0,"_setStyles:39":0,"_getDefaultStyles:57":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-line/series-line.js"].coveredLines = 8;
_yuitest_coverage["build/series-line/series-line.js"].coveredFunctions = 4;
_yuitest_coverline("build/series-line/series-line.js", 1);
YUI.add('series-line', function (Y, NAME) {

/**
 * Provides functionality for creating a line series.
 *
 * @module charts
 * @submodule series-line
 */
/**
 * The LineSeries class renders quantitative data on a graph by connecting relevant data points.
 *
 * @class LineSeries
 * @extends CartesianSeries
 * @uses Lines
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-line
 */
_yuitest_coverfunc("build/series-line/series-line.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-line/series-line.js", 19);
Y.LineSeries = Y.Base.create("lineSeries", Y.CartesianSeries, [Y.Lines], {
    /**
     * @protected
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        _yuitest_coverfunc("build/series-line/series-line.js", "drawSeries", 25);
_yuitest_coverline("build/series-line/series-line.js", 27);
this.drawLines();
    },

    /**
     * @protected
     *
     * Method used by `styles` setter. Overrides base implementation.
     *
     * @method _setStyles
     * @param {Object} newStyles Hash of properties to update.
     * @return Object
     */
    _setStyles: function(val)
    {
        _yuitest_coverfunc("build/series-line/series-line.js", "_setStyles", 39);
_yuitest_coverline("build/series-line/series-line.js", 41);
if(!val.line)
        {
            _yuitest_coverline("build/series-line/series-line.js", 43);
val = {line:val};
        }
        _yuitest_coverline("build/series-line/series-line.js", 45);
return Y.LineSeries.superclass._setStyles.apply(this, [val]);
    },

    /**
     * @protected
     *
     * Gets the default value for the `styles` attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     */
    _getDefaultStyles: function()
    {
        _yuitest_coverfunc("build/series-line/series-line.js", "_getDefaultStyles", 57);
_yuitest_coverline("build/series-line/series-line.js", 59);
var styles = this._mergeStyles({line:this._getLineDefaults()}, Y.LineSeries.superclass._getDefaultStyles());
        _yuitest_coverline("build/series-line/series-line.js", 60);
return styles;
    }
},
{
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default line
         */
        type: {
            value:"line"
        }

        /**
         * Style properties used for drawing lines. This attribute is inherited from `Renderer`. Below are the
         * default values:
         *  <dl>
         *      <dt>color</dt><dd>The color of the line. The default value is determined by the order of the series
         *      on the graph. The color will be retrieved from the following array:
         *      `["#426ab3", "#d09b2c", "#000000", "#b82837", "#b384b5", "#ff7200", "#779de3", "#cbc8ba", "#7ed7a6", "#007a6c"]`
         *      <dt>weight</dt><dd>Number that indicates the width of the line. The default value is 6.</dd>
         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the line. The default value is 1.</dd>
         *      <dt>lineType</dt><dd>Indicates whether the line is solid or dashed. The default value is solid.</dd>
         *      <dt>dashLength</dt><dd>When the `lineType` is dashed, indicates the length of the dash. The default
         *      value is 10.</dd>
         *      <dt>gapSpace</dt><dd>When the `lineType` is dashed, indicates the distance between dashes. The default
         *      value is 10.</dd>
         *      <dt>connectDiscontinuousPoints</dt><dd>Indicates whether or not to connect lines when there is a missing
         *      or null value between points. The default value is true.</dd>
         *      <dt>discontinuousType</dt><dd>Indicates whether the line between discontinuous points is solid or dashed.
         *      The default value is solid.</dd>
         *      <dt>discontinuousDashLength</dt><dd>When the `discontinuousType` is dashed, indicates the length of the
         *      dash. The default value is 10.</dd>
         *      <dt>discontinuousGapSpace</dt><dd>When the `discontinuousType` is dashed, indicates the distance between
         *      dashes. The default value is 10.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});








}, '@VERSION@', {"requires": ["series-cartesian", "series-line-util"]});
