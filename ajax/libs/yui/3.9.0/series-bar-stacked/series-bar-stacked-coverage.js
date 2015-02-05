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
_yuitest_coverage["build/series-bar-stacked/series-bar-stacked.js"].code=["YUI.add('series-bar-stacked', function (Y, NAME) {","","/**"," * Provides functionality for creating a stacked bar series."," *"," * @module charts"," * @submodule series-bar-stacked"," */","var Y_Lang = Y.Lang;","","/**"," * The StackedBarSeries renders bar chart in which series are stacked horizontally to show"," * their contribution to the cumulative total."," *"," * @class StackedBarSeries"," * @extends BarSeries"," * @uses StackingUtil"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-bar-stacked"," */","Y.StackedBarSeries = Y.Base.create(\"stackedBarSeries\", Y.BarSeries, [Y.StackingUtil], {","    /**","     * @protected","     *","     * Draws the series.","     *","     * @method drawSeries","     */","    drawSeries: function()","	{","        if(this.get(\"xcoords\").length < 1)","        {","            return;","        }","","        var isNumber = Y_Lang.isNumber,","            style = Y.clone(this.get(\"styles\").marker),","            w = style.width,","            h = style.height,","            xcoords = this.get(\"xcoords\"),","            ycoords = this.get(\"ycoords\"),","            i = 0,","            len = xcoords.length,","            top = ycoords[0],","            type = this.get(\"type\"),","            seriesCollection = this.get(\"seriesTypeCollection\"),","            ratio,","            order = this.get(\"order\"),","            graphOrder = this.get(\"graphOrder\"),","            left,","            marker,","            lastCollection,","            negativeBaseValues,","            positiveBaseValues,","            fillColors,","            borderColors,","            useOrigin = order === 0,","            totalHeight = len * h,","            dimensions = {","                width: [],","                height: []","            },","            xvalues = [],","            yvalues = [],","            groupMarkers = this.get(\"groupMarkers\");","        if(Y_Lang.isArray(style.fill.color))","        {","            fillColors = style.fill.color.concat();","        }","        if(Y_Lang.isArray(style.border.color))","        {","            borderColors = style.border.color.concat();","        }","        this._createMarkerCache();","        if(totalHeight > this.get(\"height\"))","        {","            ratio = this.get(\"height\")/totalHeight;","            h *= ratio;","            h = Math.max(h, 1);","        }","        if(!useOrigin)","        {","            lastCollection = seriesCollection[order - 1];","            negativeBaseValues = lastCollection.get(\"negativeBaseValues\");","            positiveBaseValues = lastCollection.get(\"positiveBaseValues\");","            if(!negativeBaseValues || !positiveBaseValues)","            {","                useOrigin = true;","                positiveBaseValues = [];","                negativeBaseValues = [];","            }","        }","        else","        {","            negativeBaseValues = [];","            positiveBaseValues = [];","        }","        this.set(\"negativeBaseValues\", negativeBaseValues);","        this.set(\"positiveBaseValues\", positiveBaseValues);","        for(i = 0; i < len; ++i)","        {","            top = ycoords[i];","            left = xcoords[i];","            if(!isNumber(top) || !isNumber(left))","            {","                if(useOrigin)","                {","                    positiveBaseValues[i] = this._leftOrigin;","                    negativeBaseValues[i] = this._leftOrigin;","                }","                this._markers.push(null);","                continue;","            }","            if(useOrigin)","            {","                w = Math.abs(left - this._leftOrigin);","                if(left > this._leftOrigin)","                {","                    positiveBaseValues[i] = left;","                    negativeBaseValues[i] = this._leftOrigin;","                    left -= w;","                }","                else if(left < this._leftOrigin)","                {","                    positiveBaseValues[i] = this._leftOrigin;","                    negativeBaseValues[i] = left;","                }","                else","                {","                    positiveBaseValues[i] = left;","                    negativeBaseValues[i] = this._leftOrigin;","                }","            }","            else","            {","                if(left < this._leftOrigin)","                {","                    left = negativeBaseValues[i] - (this._leftOrigin - xcoords[i]);","                    w = negativeBaseValues[i] - left;","                    negativeBaseValues[i] = left;","                }","                else if(left >= this._leftOrigin)","                {","                    left += (positiveBaseValues[i] - this._leftOrigin);","                    w = left - positiveBaseValues[i];","                    positiveBaseValues[i] = left;","                    left -= w;","                }","            }","            if(!isNaN(w) && w > 0)","            {","                top -= h/2;","                if(groupMarkers)","                {","                    dimensions.width[i] = w;","                    dimensions.height[i] = h;","                    xvalues.push(left);","                    yvalues.push(top);","                }","                else","                {","                    style.width = w;","                    style.height = h;","                    style.x = left;","                    style.y = top;","                    if(fillColors)","                    {","                        style.fill.color = fillColors[i % fillColors.length];","                    }","                    if(borderColors)","                    {","                        style.border.color = borderColors[i % borderColors.length];","                    }","                    marker = this.getMarker(style, graphOrder, i);","                }","            }","            else if(!groupMarkers)","            {","                this._markers.push(null);","            }","        }","        if(groupMarkers)","        {","            this._createGroupMarker({","                fill: style.fill,","                border: style.border,","                dimensions: dimensions,","                xvalues: xvalues,","                yvalues: yvalues,","                shape: style.shape","            });","        }","        else","        {","            this._clearMarkerCache();","        }","    },","","    /**","     * @protected","     *","     * Resizes and positions markers based on a mouse interaction.","     *","     * @method updateMarkerState","     * @param {String} type state of the marker","     * @param {Number} i index of the marker","     */","    updateMarkerState: function(type, i)","    {","        if(this._markers[i])","        {","            var state = this._getState(type),","                ycoords = this.get(\"ycoords\"),","                marker = this._markers[i],","                styles = this.get(\"styles\").marker,","                h = styles.height,","                markerStyles = state == \"off\" || !styles[state] ? Y.clone(styles) : Y.clone(styles[state]),","                fillColor,","                borderColor;","            markerStyles.y = (ycoords[i] - h/2);","            markerStyles.x = marker.get(\"x\");","            markerStyles.width = marker.get(\"width\");","            markerStyles.id = marker.get(\"id\");","            fillColor = markerStyles.fill.color;","            borderColor = markerStyles.border.color;","            if(Y_Lang.isArray(fillColor))","            {","                markerStyles.fill.color = fillColor[i % fillColor.length];","            }","            else","            {","                markerStyles.fill.color = this._getItemColor(markerStyles.fill.color, i);","            }","            if(Y_Lang.isArray(borderColor))","            {","                markerStyles.border.color = borderColor[i % borderColor.length];","            }","            else","            {","                markerStyles.border.color = this._getItemColor(markerStyles.border.color, i);","            }","            marker.set(markerStyles);","        }","    },","","    /**","     * @protected","     *","     * Returns default values for the `styles` attribute.","     *","     * @method _getPlotDefaults","     * @return Object","     */","    _getPlotDefaults: function()","    {","        var defs = {","            fill:{","                type: \"solid\",","                alpha: 1,","                colors:null,","                alphas: null,","                ratios: null","            },","            border:{","                weight: 0,","                alpha: 1","            },","            width: 24,","            height: 24,","            shape: \"rect\",","","            padding:{","                top: 0,","                left: 0,","                right: 0,","                bottom: 0","            }","        };","        defs.fill.color = this._getDefaultColor(this.get(\"graphOrder\"), \"fill\");","        defs.border.color = this._getDefaultColor(this.get(\"graphOrder\"), \"border\");","        return defs;","    }","}, {","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default stackedBar","         */","        type: {","            value: \"stackedBar\"","        },","","        /**","         * Direction of the series","         *","         * @attribute direction","         * @type String","         * @default vertical","         */","        direction: {","            value: \"vertical\"","        },","","        /**","         * @private","         *","         * @attribute negativeBaseValues","         * @type Array","         * @default null","         */","        negativeBaseValues: {","            value: null","        },","","        /**","         * @private","         *","         * @attribute positiveBaseValues","         * @type Array","         * @default null","         */","        positiveBaseValues: {","            value: null","        }","","        /**","         * Style properties used for drawing markers. This attribute is inherited from `BarSeries`. Below are the default values:","         *  <dl>","         *      <dt>fill</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the graph. The color","         *              will be retrieved from the below array:<br/>","         *              `[\"#66007f\", \"#a86f41\", \"#295454\", \"#996ab2\", \"#e8cdb7\", \"#90bdbd\",\"#000000\",\"#c3b8ca\", \"#968373\", \"#678585\"]`","         *              </dd>","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>border</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph. The color","         *              will be retrieved from the below array:<br/>","         *              `[\"#205096\", \"#b38206\", \"#000000\", \"#94001e\", \"#9d6fa0\", \"#e55b00\", \"#5e85c9\", \"#adab9e\", \"#6ac291\", \"#006457\"]`","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>","         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>height</dt><dd>indicates the width of the marker. The default value is 24.</dd>","         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a `mouseover` event. The default","         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,","         *      the default value for `marker.over.fill.color` is equivalent to `marker.fill.color`.</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","","","","}, '@VERSION@', {\"requires\": [\"series-stacked\", \"series-bar\"]});"];
_yuitest_coverage["build/series-bar-stacked/series-bar-stacked.js"].lines = {"1":0,"9":0,"22":0,"32":0,"34":0,"37":0,"67":0,"69":0,"71":0,"73":0,"75":0,"76":0,"78":0,"79":0,"80":0,"82":0,"84":0,"85":0,"86":0,"87":0,"89":0,"90":0,"91":0,"96":0,"97":0,"99":0,"100":0,"101":0,"103":0,"104":0,"105":0,"107":0,"109":0,"110":0,"112":0,"113":0,"115":0,"117":0,"118":0,"120":0,"121":0,"122":0,"124":0,"126":0,"127":0,"131":0,"132":0,"137":0,"139":0,"140":0,"141":0,"143":0,"145":0,"146":0,"147":0,"148":0,"151":0,"153":0,"154":0,"156":0,"157":0,"158":0,"159":0,"163":0,"164":0,"165":0,"166":0,"167":0,"169":0,"171":0,"173":0,"175":0,"178":0,"180":0,"183":0,"185":0,"196":0,"211":0,"213":0,"221":0,"222":0,"223":0,"224":0,"225":0,"226":0,"227":0,"229":0,"233":0,"235":0,"237":0,"241":0,"243":0,"257":0,"280":0,"281":0,"282":0};
_yuitest_coverage["build/series-bar-stacked/series-bar-stacked.js"].functions = {"drawSeries:30":0,"updateMarkerState:209":0,"_getPlotDefaults:255":0,"(anonymous 1):1":0};
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
            type = this.get("type"),
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
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 67);
if(Y_Lang.isArray(style.fill.color))
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 69);
fillColors = style.fill.color.concat();
        }
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 71);
if(Y_Lang.isArray(style.border.color))
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 73);
borderColors = style.border.color.concat();
        }
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 75);
this._createMarkerCache();
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 76);
if(totalHeight > this.get("height"))
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 78);
ratio = this.get("height")/totalHeight;
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 79);
h *= ratio;
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 80);
h = Math.max(h, 1);
        }
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 82);
if(!useOrigin)
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 84);
lastCollection = seriesCollection[order - 1];
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 85);
negativeBaseValues = lastCollection.get("negativeBaseValues");
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 86);
positiveBaseValues = lastCollection.get("positiveBaseValues");
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 87);
if(!negativeBaseValues || !positiveBaseValues)
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 89);
useOrigin = true;
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 90);
positiveBaseValues = [];
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 91);
negativeBaseValues = [];
            }
        }
        else
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 96);
negativeBaseValues = [];
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 97);
positiveBaseValues = [];
        }
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 99);
this.set("negativeBaseValues", negativeBaseValues);
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 100);
this.set("positiveBaseValues", positiveBaseValues);
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 101);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 103);
top = ycoords[i];
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 104);
left = xcoords[i];
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 105);
if(!isNumber(top) || !isNumber(left))
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 107);
if(useOrigin)
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 109);
positiveBaseValues[i] = this._leftOrigin;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 110);
negativeBaseValues[i] = this._leftOrigin;
                }
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 112);
this._markers.push(null);
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 113);
continue;
            }
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 115);
if(useOrigin)
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 117);
w = Math.abs(left - this._leftOrigin);
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 118);
if(left > this._leftOrigin)
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 120);
positiveBaseValues[i] = left;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 121);
negativeBaseValues[i] = this._leftOrigin;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 122);
left -= w;
                }
                else {_yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 124);
if(left < this._leftOrigin)
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 126);
positiveBaseValues[i] = this._leftOrigin;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 127);
negativeBaseValues[i] = left;
                }
                else
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 131);
positiveBaseValues[i] = left;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 132);
negativeBaseValues[i] = this._leftOrigin;
                }}
            }
            else
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 137);
if(left < this._leftOrigin)
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 139);
left = negativeBaseValues[i] - (this._leftOrigin - xcoords[i]);
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 140);
w = negativeBaseValues[i] - left;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 141);
negativeBaseValues[i] = left;
                }
                else {_yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 143);
if(left >= this._leftOrigin)
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 145);
left += (positiveBaseValues[i] - this._leftOrigin);
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 146);
w = left - positiveBaseValues[i];
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 147);
positiveBaseValues[i] = left;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 148);
left -= w;
                }}
            }
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 151);
if(!isNaN(w) && w > 0)
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 153);
top -= h/2;
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 154);
if(groupMarkers)
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 156);
dimensions.width[i] = w;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 157);
dimensions.height[i] = h;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 158);
xvalues.push(left);
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 159);
yvalues.push(top);
                }
                else
                {
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 163);
style.width = w;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 164);
style.height = h;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 165);
style.x = left;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 166);
style.y = top;
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 167);
if(fillColors)
                    {
                        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 169);
style.fill.color = fillColors[i % fillColors.length];
                    }
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 171);
if(borderColors)
                    {
                        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 173);
style.border.color = borderColors[i % borderColors.length];
                    }
                    _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 175);
marker = this.getMarker(style, graphOrder, i);
                }
            }
            else {_yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 178);
if(!groupMarkers)
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 180);
this._markers.push(null);
            }}
        }
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 183);
if(groupMarkers)
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 185);
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
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 196);
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
        _yuitest_coverfunc("build/series-bar-stacked/series-bar-stacked.js", "updateMarkerState", 209);
_yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 211);
if(this._markers[i])
        {
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 213);
var state = this._getState(type),
                ycoords = this.get("ycoords"),
                marker = this._markers[i],
                styles = this.get("styles").marker,
                h = styles.height,
                markerStyles = state == "off" || !styles[state] ? Y.clone(styles) : Y.clone(styles[state]),
                fillColor,
                borderColor;
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 221);
markerStyles.y = (ycoords[i] - h/2);
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 222);
markerStyles.x = marker.get("x");
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 223);
markerStyles.width = marker.get("width");
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 224);
markerStyles.id = marker.get("id");
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 225);
fillColor = markerStyles.fill.color;
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 226);
borderColor = markerStyles.border.color;
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 227);
if(Y_Lang.isArray(fillColor))
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 229);
markerStyles.fill.color = fillColor[i % fillColor.length];
            }
            else
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 233);
markerStyles.fill.color = this._getItemColor(markerStyles.fill.color, i);
            }
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 235);
if(Y_Lang.isArray(borderColor))
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 237);
markerStyles.border.color = borderColor[i % borderColor.length];
            }
            else
            {
                _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 241);
markerStyles.border.color = this._getItemColor(markerStyles.border.color, i);
            }
            _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 243);
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
        _yuitest_coverfunc("build/series-bar-stacked/series-bar-stacked.js", "_getPlotDefaults", 255);
_yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 257);
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
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 280);
defs.fill.color = this._getDefaultColor(this.get("graphOrder"), "fill");
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 281);
defs.border.color = this._getDefaultColor(this.get("graphOrder"), "border");
        _yuitest_coverline("build/series-bar-stacked/series-bar-stacked.js", 282);
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
