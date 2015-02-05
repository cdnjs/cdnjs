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
_yuitest_coverage["build/series-area/series-area.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-area/series-area.js",
    code: []
};
_yuitest_coverage["build/series-area/series-area.js"].code=["YUI.add('series-area', function (Y, NAME) {","","/**"," * Provides functionality for creating a area series."," *"," * @module charts"," * @submodule series-area"," */","/**"," * The AreaSeries class renders quantitative data on a graph by creating a fill between 0"," * and the relevant data points."," *"," * @class AreaSeries"," * @extends CartesianSeries"," * @uses Fills"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-area"," */","Y.AreaSeries = Y.Base.create(\"areaSeries\", Y.CartesianSeries, [Y.Fills], {","    /**","     * @protected","     *","     * Renders the series.","     *","     * @method drawSeries","     */","    drawSeries: function()","    {","        this.drawFill.apply(this, this._getClosingPoints());","    },","","    /**","     * @protected","     *","     * Method used by `styles` setter. Overrides base implementation.","     *","     * @method _setStyles","     * @param {Object} newStyles Hash of properties to update.","     * @return Object","     */","    _setStyles: function(val)","    {","        if(!val.area)","        {","            val = {area:val};","        }","        return Y.AreaSeries.superclass._setStyles.apply(this, [val]);","    },","","    /**","     * @protected","     *","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     */","    _getDefaultStyles: function()","    {","        var styles = this._mergeStyles({area:this._getAreaDefaults()}, Y.AreaSeries.superclass._getDefaultStyles());","        return styles;","    }","},","{","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default area","         */","        type: {","            value:\"area\"","        }","","        /**","         * Style properties used for drawing area fills. This attribute is inherited from `Renderer`. Below are the default values:","         *","         *  <dl>","         *      <dt>color</dt><dd>The color of the fill. The default value is determined by the order of the series on the graph. The color will be","         *      retrieved from the following array:","         *      `[\"#66007f\", \"#a86f41\", \"#295454\", \"#996ab2\", \"#e8cdb7\", \"#90bdbd\",\"#000000\",\"#c3b8ca\", \"#968373\", \"#678585\"]`","         *      </dd>","         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","","","","","","","","","}, '@VERSION@', {\"requires\": [\"series-cartesian\", \"series-fill-util\"]});"];
_yuitest_coverage["build/series-area/series-area.js"].lines = {"1":0,"20":0,"30":0,"44":0,"46":0,"48":0,"62":0,"63":0};
_yuitest_coverage["build/series-area/series-area.js"].functions = {"drawSeries:28":0,"_setStyles:42":0,"_getDefaultStyles:60":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-area/series-area.js"].coveredLines = 8;
_yuitest_coverage["build/series-area/series-area.js"].coveredFunctions = 4;
_yuitest_coverline("build/series-area/series-area.js", 1);
YUI.add('series-area', function (Y, NAME) {

/**
 * Provides functionality for creating a area series.
 *
 * @module charts
 * @submodule series-area
 */
/**
 * The AreaSeries class renders quantitative data on a graph by creating a fill between 0
 * and the relevant data points.
 *
 * @class AreaSeries
 * @extends CartesianSeries
 * @uses Fills
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-area
 */
_yuitest_coverfunc("build/series-area/series-area.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-area/series-area.js", 20);
Y.AreaSeries = Y.Base.create("areaSeries", Y.CartesianSeries, [Y.Fills], {
    /**
     * @protected
     *
     * Renders the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        _yuitest_coverfunc("build/series-area/series-area.js", "drawSeries", 28);
_yuitest_coverline("build/series-area/series-area.js", 30);
this.drawFill.apply(this, this._getClosingPoints());
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
        _yuitest_coverfunc("build/series-area/series-area.js", "_setStyles", 42);
_yuitest_coverline("build/series-area/series-area.js", 44);
if(!val.area)
        {
            _yuitest_coverline("build/series-area/series-area.js", 46);
val = {area:val};
        }
        _yuitest_coverline("build/series-area/series-area.js", 48);
return Y.AreaSeries.superclass._setStyles.apply(this, [val]);
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
        _yuitest_coverfunc("build/series-area/series-area.js", "_getDefaultStyles", 60);
_yuitest_coverline("build/series-area/series-area.js", 62);
var styles = this._mergeStyles({area:this._getAreaDefaults()}, Y.AreaSeries.superclass._getDefaultStyles());
        _yuitest_coverline("build/series-area/series-area.js", 63);
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
         * @default area
         */
        type: {
            value:"area"
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








}, '@VERSION@', {"requires": ["series-cartesian", "series-fill-util"]});
