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
_yuitest_coverage["build/series-bar-stacked/series-bar-stacked.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-bar-stacked/series-bar-stacked.js",
    code: []
};
_yuitest_coverage["build/series-bar-stacked/series-bar-stacked.js"].code=["YUI.add('series-bar-stacked', function (Y, NAME) {","","/**"," * Provides functionality for creating a stacked bar series."," *"," * @module charts"," * @submodule series-bar-stacked"," */","var Y_Lang = Y.Lang;","","/**"," * The StackedBarSeries renders bar chart in which series are stacked horizontally to show"," * their contribution to the cumulative total."," *"," * @class StackedBarSeries"," * @extends BarSeries"," * @uses StackingUtil"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-bar-stacked"," */","Y.StackedBarSeries = Y.Base.create(\"stackedBarSeries\", Y.BarSeries, [Y.StackingUtil], {","    /**","     * @protected","     *","     * Draws the series.","     *","     * @method drawSeries","     */","    drawSeries: function()","	{","        if(this.get(\"xcoords\").length < 1)","        {","            return;","        }","","        var isNumber = Y_Lang.isNumber,","            style = Y.clone(this.get(\"styles\").marker),","            w = style.width,","            h = style.height,","            xcoords = this.get(\"xcoords\"),","            ycoords = this.get(\"ycoords\"),","            i = 0,","            len = xcoords.length,","            top = ycoords[0],","            seriesCollection = this.get(\"seriesTypeCollection\"),","            ratio,","            order = this.get(\"order\"),","            graphOrder = this.get(\"graphOrder\"),","            left,","            marker,","            lastCollection,","            negativeBaseValues,","            positiveBaseValues,","            fillColors,","            borderColors,","            useOrigin = order === 0,","            totalHeight = len * h,","            dimensions = {","                width: [],","                height: []","            },","            xvalues = [],","            yvalues = [],","            groupMarkers = this.get(\"groupMarkers\");","        if(Y_Lang.isArray(style.fill.color))","        {","            fillColors = style.fill.color.concat();","        }","        if(Y_Lang.isArray(style.border.color))","        {","            borderColors = style.border.color.concat();","        }","        this._createMarkerCache();","        if(totalHeight > this.get(\"height\"))","        {","            ratio = this.get(\"height\")/totalHeight;","            h *= ratio;","            h = Math.max(h, 1);","        }","        if(!useOrigin)","        {","            lastCollection = seriesCollection[order - 1];","            negativeBaseValues = lastCollection.get(\"negativeBaseValues\");","            positiveBaseValues = lastCollection.get(\"positiveBaseValues\");","            if(!negativeBaseValues || !positiveBaseValues)","            {","                useOrigin = true;","                positiveBaseValues = [];","                negativeBaseValues = [];","            }","        }","        else","        {","            negativeBaseValues = [];","            positiveBaseValues = [];","        }","        this.set(\"negativeBaseValues\", negativeBaseValues);","        this.set(\"positiveBaseValues\", positiveBaseValues);","        for(i = 0; i < len; ++i)","        {","            top = ycoords[i];","            left = xcoords[i];","            if(!isNumber(top) || !isNumber(left))","            {","                if(useOrigin)","                {","                    positiveBaseValues[i] = this._leftOrigin;","                    negativeBaseValues[i] = this._leftOrigin;","                }","                this._markers.push(null);","                continue;","            }","            if(useOrigin)","            {","                w = Math.abs(left - this._leftOrigin);","                if(left > this._leftOrigin)","                {","                    positiveBaseValues[i] = left;","                    negativeBaseValues[i] = this._leftOrigin;","                    left -= w;","                }","                else if(left < this._leftOrigin)","                {","                    positiveBaseValues[i] = this._leftOrigin;","                    negativeBaseValues[i] = left;","                }","                else","                {","                    positiveBaseValues[i] = left;","                    negativeBaseValues[i] = this._leftOrigin;","                }","            }","            else","            {","                if(left < this._leftOrigin)","                {","                    left = negativeBaseValues[i] - (this._leftOrigin - xcoords[i]);","                    w = negativeBaseValues[i] - left;","                    negativeBaseValues[i] = left;","                }","                else if(left >= this._leftOrigin)","                {","                    left += (positiveBaseValues[i] - this._leftOrigin);","                    w = left - positiveBaseValues[i];","                    positiveBaseValues[i] = left;","                    left -= w;","                }","            }","            if(!isNaN(w) && w > 0)","            {","                top -= h/2;","                if(groupMarkers)","                {","                    dimensions.width[i] = w;","                    dimensions.height[i] = h;","                    xvalues.push(left);","                    yvalues.push(top);","                }","                else","                {","                    style.width = w;","                    style.height = h;","                    style.x = left;","                    style.y = top;","                    if(fillColors)","                    {","                        style.fill.color = fillColors[i % fillColors.length];","                    }","                    if(borderColors)","                    {","                        style.border.color = borderColors[i % borderColors.length];","                    }","                    marker = this.getMarker(style, graphOrder, i);","                }","            }","            else if(!groupMarkers)","            {","                this._markers.push(null);","            }","        }","        if(groupMarkers)","        {","            this._createGroupMarker({","                fill: style.fill,","                border: style.border,","                dimensions: dimensions,","                xvalues: xvalues,","                yvalues: yvalues,","                shape: style.shape","            });","        }","        else","        {","            this._clearMarkerCache();","        }","    },","","    /**","     * @protected","     *","     * Resizes and positions markers based on a mouse interaction.","     *","     * @method updateMarkerState","     * @param {String} type state of the marker","     * @param {Number} i index of the marker","     */","    updateMarkerState: function(type, i)","    {","        if(this._markers[i])","        {","            var state = this._getState(type),","                ycoords = this.get(\"ycoords\"),","                marker = this._markers[i],","                styles = this.get(\"styles\").marker,","                h = styles.height,","                markerStyles = state === \"off\" || !styles[state] ? Y.clone(styles) : Y.clone(styles[state]),","                fillColor,","                borderColor;","            markerStyles.y = (ycoords[i] - h/2);","            markerStyles.x = marker.get(\"x\");","            markerStyles.width = marker.get(\"width\");","            markerStyles.id = marker.get(\"id\");","            fillColor = markerStyles.fill.color;","            borderColor = markerStyles.border.color;","            if(Y_Lang.isArray(fillColor))","            {","                markerStyles.fill.color = fillColor[i % fillColor.length];","            }","            else","            {","                markerStyles.fill.color = this._getItemColor(markerStyles.fill.color, i);","            }","            if(Y_Lang.isArray(borderColor))","            {","                markerStyles.border.color = borderColor[i % borderColor.length];","            }","            else","            {","                markerStyles.border.color = this._getItemColor(markerStyles.border.color, i);","            }","            marker.set(markerStyles);","        }","    },","","    /**","     * @protected","     *","     * Returns default values for the `styles` attribute.","     *","     * @method _getPlotDefaults","     * @return Object","     */","    _getPlotDefaults: function()","    {","        var defs = {","            fill:{","                type: \"solid\",","                alpha: 1,","                colors:null,","                alphas: null,","                ratios: null","            },","            border:{","                weight: 0,","                alpha: 1","            },","            width: 24,","            height: 24,","            shape: \"rect\",","","            padding:{","                top: 0,","                left: 0,","                right: 0,","                bottom: 0","            }","        };","        defs.fill.color = this._getDefaultColor(this.get(\"graphOrder\"), \"fill\");","        defs.border.color = this._getDefaultColor(this.get(\"graphOrder\"), \"border\");","        return defs;","    }","}, {","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default stackedBar","         */","        type: {","            value: \"stackedBar\"","        },","","        /**","         * Direction of the series","         *","         * @attribute direction","         * @type String","         * @default vertical","         */","        direction: {","            value: \"vertical\"","        },","","        /**","         * @private","         *","         * @attribute negativeBaseValues","         * @type Array","         * @default null","         */","        negativeBaseValues: {","            value: null","        },","","        /**","         * @private","         *","         * @attribute positiveBaseValues","         * @type Array","         * @default null","         */","        positiveBaseValues: {","            value: null","        }","","        /**","         * Style properties used for drawing markers. This attribute is inherited from `BarSeries`. Below are the default values:","         *  <dl>","         *      <dt>fill</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the graph. The color","         *              will be retrieved from the below array:<br/>","         *              `[\"#66007f\", \"#a86f41\", \"#295454\", \"#996ab2\", \"#e8cdb7\", \"#90bdbd\",\"#000000\",\"#c3b8ca\", \"#968373\", \"#678585\"]`","         *              </dd>","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>border</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph. The color","         *              will be retrieved from the below array:<br/>","         *              `[\"#205096\", \"#b38206\", \"#000000\", \"#94001e\", \"#9d6fa0\", \"#e55b00\", \"#5e85c9\", \"#adab9e\", \"#6ac291\", \"#006457\"]`","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>","         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>height</dt><dd>indicates the width of the marker. The default value is 24.</dd>","         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a `mouseover` event. The default","         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,","         *      the default value for `marker.over.fill.color` is equivalent to `marker.fill.color`.</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","","","","}, '@VERSION@', {\"requires\": [\"series-stacked\", \"series-bar\"]});"];
_yuitest_coverage["build/series-bar-stacked/series-bar-stacked.js"].lines = {"1":0,"9":0,"22":0,"32":0,"34":0,"37":0,"66":0,"68":0,"70":0,"72":0,"74":0,"75":0,"77":0,"78":0,"79":0,"81":0,"83":0,"84":0,"85":0,"86":0,"88":0,"89":0,"90":0,"95":0,"96":0,"98":0,"99":0,"100":0,"102":0,"103":0,"104":0,"106":0,"108":0,"109":0,"111":0,"112":0,"114":0,"116":0,"117":0,"119":0,"120":0,"121":0,"123":0,"125":0,"126":0,"130":0,"131":0,"136":0,"138":0,"139":0,"140":0,"142":0,"144":0,"145":0,"146":0,"147":0,"150":0,"152":0,"153":0,"155":0,"156":0,"157":0,"158":0,"162":0,"163":0,"164":0,"165":0,"166":0,"168":0,"170":0,"172":0,"174":0,"177":0,"179":0,"182":0,"184":0,"195":0,"210":0,"212":0,"220":0,"221":0,"222":0,"223":0,"224":0,"225":0,"226":0,"228":0,"232":0,"234":0,"236":0,"240":0,"242":0,"256":0,"279":0,"280":0,"281":0};
_yuitest_coverage["build/series-bar-stacked/series-bar-stacked.js"].functions = {"drawSeries:30":0,"updateMarkerState:208":0,"_getPlotDefaults:254":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-bar-stacked/series-bar-stacked.js"].coveredLines = 96;
_yuitest_coverage["build/series-bar-stacked/series-bar-stacked.js"].coveredFunctions = 4;
_yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 1);
YUI.add('series-bar-stacked', function (Y, NAME) {

/**
 * Provides functionality for creating a stacked bar series.
 *
 * @module charts
 * @submodule series-bar-stacked
 */
_yuitest_coverfunc("build/series-bar-stacked/series-bar-stacked.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 9);
var Y_Lang = Y.Lang;

/**
 * The StackedBarSeries renders bar chart in which series are stacked horizontally to show
 * their contribution to the cumulative total.
 *
 * @class StackedBarSeries
 * @extends BarSeries
 * @uses StackingUtil
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-bar-stacked
 */
_yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 22);
Y.StackedBarSeries = Y.Base.create("stackedBarSeries", Y.BarSeries, [Y.StackingUtil], {
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
	{
        _yuitest_coverfunc("build/series-bar-stacked/series-bar-stacked.js", "drawSeries", 30);
_yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 32);
if(this.get("xcoords").length < 1)
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 34);
return;
        }

        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 37);
var isNumber = Y_Lang.isNumber,
            style = Y.clone(this.get("styles").marker),
            w = style.width,
            h = style.height,
            xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            i = 0,
            len = xcoords.length,
            top = ycoords[0],
            seriesCollection = this.get("seriesTypeCollection"),
            ratio,
            order = this.get("order"),
            graphOrder = this.get("graphOrder"),
            left,
            marker,
            lastCollection,
            negativeBaseValues,
            positiveBaseValues,
            fillColors,
            borderColors,
            useOrigin = order === 0,
            totalHeight = len * h,
            dimensions = {
                width: [],
                height: []
            },
            xvalues = [],
            yvalues = [],
            groupMarkers = this.get("groupMarkers");
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 66);
if(Y_Lang.isArray(style.fill.color))
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 68);
fillColors = style.fill.color.concat();
        }
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 70);
if(Y_Lang.isArray(style.border.color))
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 72);
borderColors = style.border.color.concat();
        }
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 74);
this._createMarkerCache();
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 75);
if(totalHeight > this.get("height"))
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 77);
ratio = this.get("height")/totalHeight;
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 78);
h *= ratio;
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 79);
h = Math.max(h, 1);
        }
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 81);
if(!useOrigin)
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 83);
lastCollection = seriesCollection[order - 1];
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 84);
negativeBaseValues = lastCollection.get("negativeBaseValues");
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 85);
positiveBaseValues = lastCollection.get("positiveBaseValues");
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 86);
if(!negativeBaseValues || !positiveBaseValues)
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 88);
useOrigin = true;
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 89);
positiveBaseValues = [];
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 90);
negativeBaseValues = [];
            }
        }
        else
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 95);
negativeBaseValues = [];
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 96);
positiveBaseValues = [];
        }
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 98);
this.set("negativeBaseValues", negativeBaseValues);
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 99);
this.set("positiveBaseValues", positiveBaseValues);
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 100);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 102);
top = ycoords[i];
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 103);
left = xcoords[i];
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 104);
if(!isNumber(top) || !isNumber(left))
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 106);
if(useOrigin)
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 108);
positiveBaseValues[i] = this._leftOrigin;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 109);
negativeBaseValues[i] = this._leftOrigin;
                }
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 111);
this._markers.push(null);
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 112);
continue;
            }
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 114);
if(useOrigin)
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 116);
w = Math.abs(left - this._leftOrigin);
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 117);
if(left > this._leftOrigin)
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 119);
positiveBaseValues[i] = left;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 120);
negativeBaseValues[i] = this._leftOrigin;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 121);
left -= w;
                }
                else {_yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 123);
if(left < this._leftOrigin)
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 125);
positiveBaseValues[i] = this._leftOrigin;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 126);
negativeBaseValues[i] = left;
                }
                else
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 130);
positiveBaseValues[i] = left;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 131);
negativeBaseValues[i] = this._leftOrigin;
                }}
            }
            else
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 136);
if(left < this._leftOrigin)
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 138);
left = negativeBaseValues[i] - (this._leftOrigin - xcoords[i]);
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 139);
w = negativeBaseValues[i] - left;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 140);
negativeBaseValues[i] = left;
                }
                else {_yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 142);
if(left >= this._leftOrigin)
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 144);
left += (positiveBaseValues[i] - this._leftOrigin);
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 145);
w = left - positiveBaseValues[i];
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 146);
positiveBaseValues[i] = left;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 147);
left -= w;
                }}
            }
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 150);
if(!isNaN(w) && w > 0)
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 152);
top -= h/2;
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 153);
if(groupMarkers)
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 155);
dimensions.width[i] = w;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 156);
dimensions.height[i] = h;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 157);
xvalues.push(left);
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 158);
yvalues.push(top);
                }
                else
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 162);
style.width = w;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 163);
style.height = h;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 164);
style.x = left;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 165);
style.y = top;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 166);
if(fillColors)
                    {
                        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 168);
style.fill.color = fillColors[i % fillColors.length];
                    }
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 170);
if(borderColors)
                    {
                        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 172);
style.border.color = borderColors[i % borderColors.length];
                    }
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 174);
marker = this.getMarker(style, graphOrder, i);
                }
            }
            else {_yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 177);
if(!groupMarkers)
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 179);
this._markers.push(null);
            }}
        }
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 182);
if(groupMarkers)
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 184);
this._createGroupMarker({
                fill: style.fill,
                border: style.border,
                dimensions: dimensions,
                xvalues: xvalues,
                yvalues: yvalues,
                shape: style.shape
            });
        }
        else
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 195);
this._clearMarkerCache();
        }
    },

    /**
     * @protected
     *
     * Resizes and positions markers based on a mouse interaction.
     *
     * @method updateMarkerState
     * @param {String} type state of the marker
     * @param {Number} i index of the marker
     */
    updateMarkerState: function(type, i)
    {
        _yuitest_coverfunc("build/series-bar-stacked/series-bar-stacked.js", "updateMarkerState", 208);
_yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 210);
if(this._markers[i])
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 212);
var state = this._getState(type),
                ycoords = this.get("ycoords"),
                marker = this._markers[i],
                styles = this.get("styles").marker,
                h = styles.height,
                markerStyles = state === "off" || !styles[state] ? Y.clone(styles) : Y.clone(styles[state]),
                fillColor,
                borderColor;
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 220);
markerStyles.y = (ycoords[i] - h/2);
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 221);
markerStyles.x = marker.get("x");
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 222);
markerStyles.width = marker.get("width");
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 223);
markerStyles.id = marker.get("id");
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 224);
fillColor = markerStyles.fill.color;
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 225);
borderColor = markerStyles.border.color;
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 226);
if(Y_Lang.isArray(fillColor))
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 228);
markerStyles.fill.color = fillColor[i % fillColor.length];
            }
            else
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 232);
markerStyles.fill.color = this._getItemColor(markerStyles.fill.color, i);
            }
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 234);
if(Y_Lang.isArray(borderColor))
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 236);
markerStyles.border.color = borderColor[i % borderColor.length];
            }
            else
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 240);
markerStyles.border.color = this._getItemColor(markerStyles.border.color, i);
            }
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 242);
marker.set(markerStyles);
        }
    },

    /**
     * @protected
     *
     * Returns default values for the `styles` attribute.
     *
     * @method _getPlotDefaults
     * @return Object
     */
    _getPlotDefaults: function()
    {
        _yuitest_coverfunc("build/series-bar-stacked/series-bar-stacked.js", "_getPlotDefaults", 254);
_yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 256);
var defs = {
            fill:{
                type: "solid",
                alpha: 1,
                colors:null,
                alphas: null,
                ratios: null
            },
            border:{
                weight: 0,
                alpha: 1
            },
            width: 24,
            height: 24,
            shape: "rect",

            padding:{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        };
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 279);
defs.fill.color = this._getDefaultColor(this.get("graphOrder"), "fill");
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 280);
defs.border.color = this._getDefaultColor(this.get("graphOrder"), "border");
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 281);
return defs;
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedBar
         */
        type: {
            value: "stackedBar"
        },

        /**
         * Direction of the series
         *
         * @attribute direction
         * @type String
         * @default vertical
         */
        direction: {
            value: "vertical"
        },

        /**
         * @private
         *
         * @attribute negativeBaseValues
         * @type Array
         * @default null
         */
        negativeBaseValues: {
            value: null
        },

        /**
         * @private
         *
         * @attribute positiveBaseValues
         * @type Array
         * @default null
         */
        positiveBaseValues: {
            value: null
        }

        /**
         * Style properties used for drawing markers. This attribute is inherited from `BarSeries`. Below are the default values:
         *  <dl>
         *      <dt>fill</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              `["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"]`
         *              </dd>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>border</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              `["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"]`
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>
         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>height</dt><dd>indicates the width of the marker. The default value is 24.</dd>
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



}, '@VERSION@', {"requires": ["series-stacked", "series-bar"]});
