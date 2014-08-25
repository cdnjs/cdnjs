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
_yuitest_coverage["build/series-marker/series-marker.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-marker/series-marker.js",
    code: []
};
_yuitest_coverage["build/series-marker/series-marker.js"].code=["YUI.add('series-marker', function (Y, NAME) {","","/**"," * Provides functionality for creating a marker series."," *"," * @module charts"," * @submodule series-marker"," */","/**"," * The MarkerSeries class renders quantitative data by plotting relevant data points"," * on a graph."," *"," * @class MarkerSeries"," * @extends CartesianSeries"," * @uses Plots"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-marker"," */","Y.MarkerSeries = Y.Base.create(\"markerSeries\", Y.CartesianSeries, [Y.Plots], {","    /**","     * @protected","     *","     * Method used by `styles` setter. Overrides base implementation.","     *","     * @method _setStyles","     * @param {Object} newStyles Hash of properties to update.","     * @return Object","     */","    _setStyles: function(val)","    {","        if(!val.marker)","        {","            val = {marker:val};","        }","        val = this._parseMarkerStyles(val);","        return Y.MarkerSeries.superclass._mergeStyles.apply(this, [val, this._getDefaultStyles()]);","    }","},{","    ATTRS : {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default marker","         */","        type: {","            value:\"marker\"","        }","","        /**","         * Style properties used for drawing markers. This attribute is inherited from `Renderer`. Below are the default","         * values:","         *  <dl>","         *      <dt>fill</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on","         *              the graph. The color will be retrieved from the below array:<br/>","         *              `[\"#6084d0\", \"#eeb647\", \"#6c6b5f\", \"#d6484f\", \"#ce9ed1\", \"#ff9f3b\", \"#93b7ff\", \"#e0ddd0\", \"#94ecba\", \"#309687\"]`","         *              </dd>","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>border</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on","         *              the graph. The color will be retrieved from the below array:<br/>","         *              `[\"#205096\", \"#b38206\", \"#000000\", \"#94001e\", \"#9d6fa0\", \"#e55b00\", \"#5e85c9\", \"#adab9e\", \"#6ac291\", \"#006457\"]`","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>","         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>width</dt><dd>indicates the width of the marker. The default value is 10.</dd>","         *      <dt>height</dt><dd>indicates the height of the marker The default value is 10.</dd>","         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a `mouseover` event. The default","         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,","         *      the default value for `marker.over.fill.color` is equivalent to `marker.fill.color`.</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","","","","}, '@VERSION@', {\"requires\": [\"series-cartesian\", \"series-plot-util\"]});"];
_yuitest_coverage["build/series-marker/series-marker.js"].lines = {"1":0,"20":0,"32":0,"34":0,"36":0,"37":0};
_yuitest_coverage["build/series-marker/series-marker.js"].functions = {"_setStyles:30":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-marker/series-marker.js"].coveredLines = 6;
_yuitest_coverage["build/series-marker/series-marker.js"].coveredFunctions = 2;
_yuitest_coverline("build/series-marker/series-marker.js", 1);
YUI.add('series-marker', function (Y, NAME) {

/**
 * Provides functionality for creating a marker series.
 *
 * @module charts
 * @submodule series-marker
 */
/**
 * The MarkerSeries class renders quantitative data by plotting relevant data points
 * on a graph.
 *
 * @class MarkerSeries
 * @extends CartesianSeries
 * @uses Plots
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-marker
 */
_yuitest_coverfunc("build/series-marker/series-marker.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-marker/series-marker.js", 20);
Y.MarkerSeries = Y.Base.create("markerSeries", Y.CartesianSeries, [Y.Plots], {
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
        _yuitest_coverfunc("build/series-marker/series-marker.js", "_setStyles", 30);
_yuitest_coverline("build/series-marker/series-marker.js", 32);
if(!val.marker)
        {
            _yuitest_coverline("build/series-marker/series-marker.js", 34);
val = {marker:val};
        }
        _yuitest_coverline("build/series-marker/series-marker.js", 36);
val = this._parseMarkerStyles(val);
        _yuitest_coverline("build/series-marker/series-marker.js", 37);
return Y.MarkerSeries.superclass._mergeStyles.apply(this, [val, this._getDefaultStyles()]);
    }
},{
    ATTRS : {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default marker
         */
        type: {
            value:"marker"
        }

        /**
         * Style properties used for drawing markers. This attribute is inherited from `Renderer`. Below are the default
         * values:
         *  <dl>
         *      <dt>fill</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on
         *              the graph. The color will be retrieved from the below array:<br/>
         *              `["#6084d0", "#eeb647", "#6c6b5f", "#d6484f", "#ce9ed1", "#ff9f3b", "#93b7ff", "#e0ddd0", "#94ecba", "#309687"]`
         *              </dd>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>border</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on
         *              the graph. The color will be retrieved from the below array:<br/>
         *              `["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"]`
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>
         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>width</dt><dd>indicates the width of the marker. The default value is 10.</dd>
         *      <dt>height</dt><dd>indicates the height of the marker The default value is 10.</dd>
         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a `mouseover` event. The default
         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,
         *      the default value for `marker.over.fill.color` is equivalent to `marker.fill.color`.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});



}, '@VERSION@', {"requires": ["series-cartesian", "series-plot-util"]});
