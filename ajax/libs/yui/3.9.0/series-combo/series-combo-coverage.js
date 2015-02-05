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
_yuitest_coverage["build/series-combo/series-combo.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-combo/series-combo.js",
    code: []
};
_yuitest_coverage["build/series-combo/series-combo.js"].code=["YUI.add('series-combo', function (Y, NAME) {","","/**"," * Provides functionality for creating a combo series."," *"," * @module charts"," * @submodule series-combo"," */","/**"," * The ComboSeries class renders a combination of lines, plots and area fills in a single series."," * Each series type has a corresponding boolean attribute indicating if it is rendered. By default,"," * lines and plots are rendered and area is not."," *"," * @class ComboSeries"," * @extends CartesianSeries"," * @uses Fills"," * @uses Lines"," * @uses Plots"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-combo"," */","Y.ComboSeries = Y.Base.create(\"comboSeries\", Y.CartesianSeries, [Y.Fills, Y.Lines, Y.Plots], {","	/**","     * @protected","     *","     * Draws the series.","     *","     * @method drawSeries","     */","    drawSeries: function()","    {","        if(this.get(\"showAreaFill\"))","        {","            this.drawFill.apply(this, this._getClosingPoints());","        }","        if(this.get(\"showLines\"))","        {","            this.drawLines();","        }","        if(this.get(\"showMarkers\"))","        {","            this.drawPlots();","        }","    },","","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} visible indicates visibilitye","     * @private","     */","    _toggleVisible: function(visible)","    {","        var markers,","            marker,","            len,","            i;","        if(this.get(\"showAreaFill\") && this._path)","        {","            this._path.set(\"visible\", visible);","        }","        if(this.get(\"showLines\") && this._lineGraphic)","        {","            this._lineGraphic.set(\"visible\", visible);","        }","        if(this.get(\"showMarkers\"))","        {","            markers = this.get(\"markers\");","            if(markers)","            {","                i = 0;","                len = markers.length;","                for(; i < len; ++i)","                {","                    marker = markers[i];","                    if(marker)","                    {","                        marker.set(\"visible\", visible);","                    }","                }","            }","        }","    },","","    /**","     * @protected","     *","     * Returns the default hash for the `styles` attribute.","     *","     * @method _getDefaultStyles","     * @return Object","     */","    _getDefaultStyles: function()","    {","        var styles = Y.ComboSeries.superclass._getDefaultStyles();","        styles.line = this._getLineDefaults();","        styles.marker = this._getPlotDefaults();","        styles.area = this._getAreaDefaults();","        return styles;","    }","},","{","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default combo","         */","        type: {","            value:\"combo\"","        },","","        /**","         * Indicates whether a fill is displayed.","         *","         * @attribute showAreaFill","         * @type Boolean","         * @default false","         */","        showAreaFill: {","            value: false","        },","","        /**","         * Indicates whether lines are displayed.","         *","         * @attribute showLines","         * @type Boolean","         * @default true","         */","        showLines: {","            value: true","        },","","        /**","         * Indicates whether markers are displayed.","         *","         * @attribute showMarkers","         * @type Boolean","         * @default true","         */","        showMarkers: {","            value: true","        },","","        /**","         * Reference to the styles of the markers. These styles can also","         * be accessed through the `styles` attribute. Below are default","         * values:","         *  <dl>","         *      <dt>fill</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the","         *              graph. The color will be retrieved from the below array:<br/>","         *              `[\"#6084d0\", \"#eeb647\", \"#6c6b5f\", \"#d6484f\", \"#ce9ed1\", \"#ff9f3b\", \"#93b7ff\", \"#e0ddd0\", \"#94ecba\", \"#309687\"]`","         *              </dd>","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>border</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph.","         *              The color will be retrieved from the below array:<br/>","         *              `[\"#205096\", \"#b38206\", \"#000000\", \"#94001e\", \"#9d6fa0\", \"#e55b00\", \"#5e85c9\", \"#adab9e\", \"#6ac291\", \"#006457\"]`","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>","         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>width</dt><dd>indicates the width of the marker. The default value is 10.</dd>","         *      <dt>height</dt><dd>indicates the height of the marker The default value is 10.</dd>","         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a `mouseover` event. The default","         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,","         *      the default value for `marker.over.fill.color` is equivalent to `marker.fill.color`.</dd>","         *  </dl>","         *","         * @attribute marker","         * @type Object","         */","        marker: {","            lazyAdd: false,","            getter: function()","            {","                return this.get(\"styles\").marker;","            },","            setter: function(val)","            {","                this.set(\"styles\", {marker:val});","            }","        },","","        /**","         * Reference to the styles of the lines. These styles can also be accessed through the `styles` attribute.","         * Below are the default values:","         *  <dl>","         *      <dt>color</dt><dd>The color of the line. The default value is determined by the order of the series on the graph. The color","         *      will be retrieved from the following array:","         *      `[\"#426ab3\", \"#d09b2c\", \"#000000\", \"#b82837\", \"#b384b5\", \"#ff7200\", \"#779de3\", \"#cbc8ba\", \"#7ed7a6\", \"#007a6c\"]`","         *      <dt>weight</dt><dd>Number that indicates the width of the line. The default value is 6.</dd>","         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the line. The default value is 1.</dd>","         *      <dt>lineType</dt><dd>Indicates whether the line is solid or dashed. The default value is solid.</dd>","         *      <dt>dashLength</dt><dd>When the `lineType` is dashed, indicates the length of the dash. The default value is 10.</dd>","         *      <dt>gapSpace</dt><dd>When the `lineType` is dashed, indicates the distance between dashes. The default value is 10.</dd>","         *      <dt>connectDiscontinuousPoints</dt><dd>Indicates whether or not to connect lines when there is a missing or null value","         *      between points. The default value is true.</dd>","         *      <dt>discontinuousType</dt><dd>Indicates whether the line between discontinuous points is solid or dashed. The default","         *      value is solid.</dd>","         *      <dt>discontinuousDashLength</dt><dd>When the `discontinuousType` is dashed, indicates the length of the dash. The default","         *      value is 10.</dd>","         *      <dt>discontinuousGapSpace</dt><dd>When the `discontinuousType` is dashed, indicates the distance between dashes. The default","         *      value is 10.</dd>","         *  </dl>","         *","         * @attribute line","         * @type Object","         */","        line: {","            lazyAdd: false,","            getter: function()","            {","                return this.get(\"styles\").line;","            },","            setter: function(val)","            {","                this.set(\"styles\", {line:val});","            }","        },","","        /**","         * Reference to the styles of the area fills. These styles can also be accessed through the `styles` attribute.","         * Below are the default values:","         *","         *  <dl>","         *      <dt>color</dt><dd>The color of the fill. The default value is determined by the order of the series on the","         *      graph. The color will be retrieved from the following array:","         *      `[\"#66007f\", \"#a86f41\", \"#295454\", \"#996ab2\", \"#e8cdb7\", \"#90bdbd\",\"#000000\",\"#c3b8ca\", \"#968373\", \"#678585\"]`","         *      </dd>","         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1</dd>","         *  </dl>","         *","         * @attribute area","         * @type Object","         */","        area: {","            lazyAdd: false,","            getter: function()","            {","                return this.get(\"styles\").area;","            },","            setter: function(val)","            {","                this.set(\"styles\", {area:val});","            }","        }","","        /**","         * Style properties for the series. Contains a key indexed hash of the following:","         *  <dl>","         *      <dt>marker</dt><dd>Style properties for the markers in the series. Specific style attributes are listed","         *      <a href=\"#attr_marker\">here</a>.</dd>","         *      <dt>line</dt><dd>Style properties for the lines in the series. Specific","         *      style attributes are listed <a href=\"#attr_line\">here</a>.</dd>","         *      <dt>area</dt><dd>Style properties for the area fills in the series. Specific style attributes are listed","         *      <a href=\"#attr_area\">here</a>.</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","","","","","","","","","}, '@VERSION@', {\"requires\": [\"series-cartesian\", \"series-line-util\", \"series-plot-util\", \"series-fill-util\"]});"];
_yuitest_coverage["build/series-combo/series-combo.js"].lines = {"1":0,"23":0,"33":0,"35":0,"37":0,"39":0,"41":0,"43":0,"56":0,"60":0,"62":0,"64":0,"66":0,"68":0,"70":0,"71":0,"73":0,"74":0,"75":0,"77":0,"78":0,"80":0,"97":0,"98":0,"99":0,"100":0,"101":0,"187":0,"191":0,"224":0,"228":0,"251":0,"255":0};
_yuitest_coverage["build/series-combo/series-combo.js"].functions = {"drawSeries:31":0,"_toggleVisible:54":0,"_getDefaultStyles:95":0,"getter:185":0,"setter:189":0,"getter:222":0,"setter:226":0,"getter:249":0,"setter:253":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-combo/series-combo.js"].coveredLines = 33;
_yuitest_coverage["build/series-combo/series-combo.js"].coveredFunctions = 10;
_yuitest_coverline("build/series-combo/series-combo.js", 1);
YUI.add('series-combo', function (Y, NAME) {

/**
 * Provides functionality for creating a combo series.
 *
 * @module charts
 * @submodule series-combo
 */
/**
 * The ComboSeries class renders a combination of lines, plots and area fills in a single series.
 * Each series type has a corresponding boolean attribute indicating if it is rendered. By default,
 * lines and plots are rendered and area is not.
 *
 * @class ComboSeries
 * @extends CartesianSeries
 * @uses Fills
 * @uses Lines
 * @uses Plots
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-combo
 */
_yuitest_coverfunc("build/series-combo/series-combo.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-combo/series-combo.js", 23);
Y.ComboSeries = Y.Base.create("comboSeries", Y.CartesianSeries, [Y.Fills, Y.Lines, Y.Plots], {
	/**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        _yuitest_coverfunc("build/series-combo/series-combo.js", "drawSeries", 31);
_yuitest_coverline("build/series-combo/series-combo.js", 33);
if(this.get("showAreaFill"))
        {
            _yuitest_coverline("build/series-combo/series-combo.js", 35);
this.drawFill.apply(this, this._getClosingPoints());
        }
        _yuitest_coverline("build/series-combo/series-combo.js", 37);
if(this.get("showLines"))
        {
            _yuitest_coverline("build/series-combo/series-combo.js", 39);
this.drawLines();
        }
        _yuitest_coverline("build/series-combo/series-combo.js", 41);
if(this.get("showMarkers"))
        {
            _yuitest_coverline("build/series-combo/series-combo.js", 43);
this.drawPlots();
        }
    },

    /**
     * Toggles visibility
     *
     * @method _toggleVisible
     * @param {Boolean} visible indicates visibilitye
     * @private
     */
    _toggleVisible: function(visible)
    {
        _yuitest_coverfunc("build/series-combo/series-combo.js", "_toggleVisible", 54);
_yuitest_coverline("build/series-combo/series-combo.js", 56);
var markers,
            marker,
            len,
            i;
        _yuitest_coverline("build/series-combo/series-combo.js", 60);
if(this.get("showAreaFill") && this._path)
        {
            _yuitest_coverline("build/series-combo/series-combo.js", 62);
this._path.set("visible", visible);
        }
        _yuitest_coverline("build/series-combo/series-combo.js", 64);
if(this.get("showLines") && this._lineGraphic)
        {
            _yuitest_coverline("build/series-combo/series-combo.js", 66);
this._lineGraphic.set("visible", visible);
        }
        _yuitest_coverline("build/series-combo/series-combo.js", 68);
if(this.get("showMarkers"))
        {
            _yuitest_coverline("build/series-combo/series-combo.js", 70);
markers = this.get("markers");
            _yuitest_coverline("build/series-combo/series-combo.js", 71);
if(markers)
            {
                _yuitest_coverline("build/series-combo/series-combo.js", 73);
i = 0;
                _yuitest_coverline("build/series-combo/series-combo.js", 74);
len = markers.length;
                _yuitest_coverline("build/series-combo/series-combo.js", 75);
for(; i < len; ++i)
                {
                    _yuitest_coverline("build/series-combo/series-combo.js", 77);
marker = markers[i];
                    _yuitest_coverline("build/series-combo/series-combo.js", 78);
if(marker)
                    {
                        _yuitest_coverline("build/series-combo/series-combo.js", 80);
marker.set("visible", visible);
                    }
                }
            }
        }
    },

    /**
     * @protected
     *
     * Returns the default hash for the `styles` attribute.
     *
     * @method _getDefaultStyles
     * @return Object
     */
    _getDefaultStyles: function()
    {
        _yuitest_coverfunc("build/series-combo/series-combo.js", "_getDefaultStyles", 95);
_yuitest_coverline("build/series-combo/series-combo.js", 97);
var styles = Y.ComboSeries.superclass._getDefaultStyles();
        _yuitest_coverline("build/series-combo/series-combo.js", 98);
styles.line = this._getLineDefaults();
        _yuitest_coverline("build/series-combo/series-combo.js", 99);
styles.marker = this._getPlotDefaults();
        _yuitest_coverline("build/series-combo/series-combo.js", 100);
styles.area = this._getAreaDefaults();
        _yuitest_coverline("build/series-combo/series-combo.js", 101);
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
         * @default combo
         */
        type: {
            value:"combo"
        },

        /**
         * Indicates whether a fill is displayed.
         *
         * @attribute showAreaFill
         * @type Boolean
         * @default false
         */
        showAreaFill: {
            value: false
        },

        /**
         * Indicates whether lines are displayed.
         *
         * @attribute showLines
         * @type Boolean
         * @default true
         */
        showLines: {
            value: true
        },

        /**
         * Indicates whether markers are displayed.
         *
         * @attribute showMarkers
         * @type Boolean
         * @default true
         */
        showMarkers: {
            value: true
        },

        /**
         * Reference to the styles of the markers. These styles can also
         * be accessed through the `styles` attribute. Below are default
         * values:
         *  <dl>
         *      <dt>fill</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the
         *              graph. The color will be retrieved from the below array:<br/>
         *              `["#6084d0", "#eeb647", "#6c6b5f", "#d6484f", "#ce9ed1", "#ff9f3b", "#93b7ff", "#e0ddd0", "#94ecba", "#309687"]`
         *              </dd>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>border</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph.
         *              The color will be retrieved from the below array:<br/>
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
         * @attribute marker
         * @type Object
         */
        marker: {
            lazyAdd: false,
            getter: function()
            {
                _yuitest_coverfunc("build/series-combo/series-combo.js", "getter", 185);
_yuitest_coverline("build/series-combo/series-combo.js", 187);
return this.get("styles").marker;
            },
            setter: function(val)
            {
                _yuitest_coverfunc("build/series-combo/series-combo.js", "setter", 189);
_yuitest_coverline("build/series-combo/series-combo.js", 191);
this.set("styles", {marker:val});
            }
        },

        /**
         * Reference to the styles of the lines. These styles can also be accessed through the `styles` attribute.
         * Below are the default values:
         *  <dl>
         *      <dt>color</dt><dd>The color of the line. The default value is determined by the order of the series on the graph. The color
         *      will be retrieved from the following array:
         *      `["#426ab3", "#d09b2c", "#000000", "#b82837", "#b384b5", "#ff7200", "#779de3", "#cbc8ba", "#7ed7a6", "#007a6c"]`
         *      <dt>weight</dt><dd>Number that indicates the width of the line. The default value is 6.</dd>
         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the line. The default value is 1.</dd>
         *      <dt>lineType</dt><dd>Indicates whether the line is solid or dashed. The default value is solid.</dd>
         *      <dt>dashLength</dt><dd>When the `lineType` is dashed, indicates the length of the dash. The default value is 10.</dd>
         *      <dt>gapSpace</dt><dd>When the `lineType` is dashed, indicates the distance between dashes. The default value is 10.</dd>
         *      <dt>connectDiscontinuousPoints</dt><dd>Indicates whether or not to connect lines when there is a missing or null value
         *      between points. The default value is true.</dd>
         *      <dt>discontinuousType</dt><dd>Indicates whether the line between discontinuous points is solid or dashed. The default
         *      value is solid.</dd>
         *      <dt>discontinuousDashLength</dt><dd>When the `discontinuousType` is dashed, indicates the length of the dash. The default
         *      value is 10.</dd>
         *      <dt>discontinuousGapSpace</dt><dd>When the `discontinuousType` is dashed, indicates the distance between dashes. The default
         *      value is 10.</dd>
         *  </dl>
         *
         * @attribute line
         * @type Object
         */
        line: {
            lazyAdd: false,
            getter: function()
            {
                _yuitest_coverfunc("build/series-combo/series-combo.js", "getter", 222);
_yuitest_coverline("build/series-combo/series-combo.js", 224);
return this.get("styles").line;
            },
            setter: function(val)
            {
                _yuitest_coverfunc("build/series-combo/series-combo.js", "setter", 226);
_yuitest_coverline("build/series-combo/series-combo.js", 228);
this.set("styles", {line:val});
            }
        },

        /**
         * Reference to the styles of the area fills. These styles can also be accessed through the `styles` attribute.
         * Below are the default values:
         *
         *  <dl>
         *      <dt>color</dt><dd>The color of the fill. The default value is determined by the order of the series on the
         *      graph. The color will be retrieved from the following array:
         *      `["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"]`
         *      </dd>
         *      <dt>alpha</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1</dd>
         *  </dl>
         *
         * @attribute area
         * @type Object
         */
        area: {
            lazyAdd: false,
            getter: function()
            {
                _yuitest_coverfunc("build/series-combo/series-combo.js", "getter", 249);
_yuitest_coverline("build/series-combo/series-combo.js", 251);
return this.get("styles").area;
            },
            setter: function(val)
            {
                _yuitest_coverfunc("build/series-combo/series-combo.js", "setter", 253);
_yuitest_coverline("build/series-combo/series-combo.js", 255);
this.set("styles", {area:val});
            }
        }

        /**
         * Style properties for the series. Contains a key indexed hash of the following:
         *  <dl>
         *      <dt>marker</dt><dd>Style properties for the markers in the series. Specific style attributes are listed
         *      <a href="#attr_marker">here</a>.</dd>
         *      <dt>line</dt><dd>Style properties for the lines in the series. Specific
         *      style attributes are listed <a href="#attr_line">here</a>.</dd>
         *      <dt>area</dt><dd>Style properties for the area fills in the series. Specific style attributes are listed
         *      <a href="#attr_area">here</a>.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});








}, '@VERSION@', {"requires": ["series-cartesian", "series-line-util", "series-plot-util", "series-fill-util"]});
