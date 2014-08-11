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
_yuitest_coverage["build/series-histogram-base/series-histogram-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-histogram-base/series-histogram-base.js",
    code: []
};
_yuitest_coverage["build/series-histogram-base/series-histogram-base.js"].code=["YUI.add('series-histogram-base', function (Y, NAME) {","","/**"," * Provides core functionality for creating a bar or column series."," *"," * @module charts"," * @submodule series-histogram"," */","var Y_Lang = Y.Lang;","","/**"," * Histogram is the base class for Column and Bar series."," *"," * @class Histogram"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-histogram"," */","function Histogram(){}","","Histogram.prototype = {","    /**","     * Draws the series.","     *","     * @method drawSeries","     * @protected","     */","    drawSeries: function()","    {","        if(this.get(\"xcoords\").length < 1)","        {","            return;","        }","        var style = Y.clone(this.get(\"styles\").marker),","            graphic = this.get(\"graphic\"),","            setSize,","            calculatedSize,","            xcoords = this.get(\"xcoords\"),","            ycoords = this.get(\"ycoords\"),","            i = 0,","            len = xcoords.length,","            top = ycoords[0],","            seriesTypeCollection = this.get(\"seriesTypeCollection\"),","            seriesLen = seriesTypeCollection.length || 0,","            seriesSize = 0,","            totalSize = 0,","            offset = 0,","            ratio,","            renderer,","            order = this.get(\"order\"),","            graphOrder = this.get(\"graphOrder\"),","            left,","            marker,","            setSizeKey,","            calculatedSizeKey,","            config,","            fillColors = null,","            borderColors = null,","            xMarkerPlane = [],","            yMarkerPlane = [],","            xMarkerPlaneLeft,","            xMarkerPlaneRight,","            yMarkerPlaneTop,","            yMarkerPlaneBottom,","            dimensions = {","                width: [],","                height: []","            },","            xvalues = [],","            yvalues = [],","            groupMarkers = this.get(\"groupMarkers\");","        if(Y_Lang.isArray(style.fill.color))","        {","            fillColors = style.fill.color.concat();","        }","        if(Y_Lang.isArray(style.border.color))","        {","            borderColors = style.border.color.concat();","        }","        if(this.get(\"direction\") === \"vertical\")","        {","            setSizeKey = \"height\";","            calculatedSizeKey = \"width\";","        }","        else","        {","            setSizeKey = \"width\";","            calculatedSizeKey = \"height\";","        }","        setSize = style[setSizeKey];","        calculatedSize = style[calculatedSizeKey];","        this._createMarkerCache();","        for(; i < seriesLen; ++i)","        {","            renderer = seriesTypeCollection[i];","            seriesSize += renderer.get(\"styles\").marker[setSizeKey];","            if(order > i)","            {","                offset = seriesSize;","            }","        }","        totalSize = len * seriesSize;","        this._maxSize = graphic.get(setSizeKey);","        if(totalSize > this._maxSize)","        {","            ratio = graphic.get(setSizeKey)/totalSize;","            seriesSize *= ratio;","            offset *= ratio;","            setSize *= ratio;","            setSize = Math.max(setSize, 1);","            this._maxSize = setSize;","        }","        offset -= seriesSize/2;","        for(i = 0; i < len; ++i)","        {","            xMarkerPlaneLeft = xcoords[i] - seriesSize/2;","            xMarkerPlaneRight = xMarkerPlaneLeft + seriesSize;","            yMarkerPlaneTop = ycoords[i] - seriesSize/2;","            yMarkerPlaneBottom = yMarkerPlaneTop + seriesSize;","            xMarkerPlane.push({start: xMarkerPlaneLeft, end: xMarkerPlaneRight});","            yMarkerPlane.push({start: yMarkerPlaneTop, end: yMarkerPlaneBottom});","            if(isNaN(xcoords[i]) || isNaN(ycoords[i]))","            {","                this._markers.push(null);","                continue;","            }","            config = this._getMarkerDimensions(xcoords[i], ycoords[i], calculatedSize, offset);","            if(!isNaN(config.calculatedSize) && config.calculatedSize > 0)","            {","                top = config.top;","                left = config.left;","","                if(groupMarkers)","                {","                    dimensions[setSizeKey][i] = setSize;","                    dimensions[calculatedSizeKey][i] = config.calculatedSize;","                    xvalues.push(left);","                    yvalues.push(top);","                }","                else","                {","                    style[setSizeKey] = setSize;","                    style[calculatedSizeKey] = config.calculatedSize;","                    style.x = left;","                    style.y = top;","                    if(fillColors)","                    {","                        style.fill.color = fillColors[i % fillColors.length];","                    }","                    if(borderColors)","                    {","                        style.border.color = borderColors[i % borderColors.length];","                    }","                    marker = this.getMarker(style, graphOrder, i);","                }","","            }","            else if(!groupMarkers)","            {","                this._markers.push(null);","            }","        }","        this.set(\"xMarkerPlane\", xMarkerPlane);","        this.set(\"yMarkerPlane\", yMarkerPlane);","        if(groupMarkers)","        {","            this._createGroupMarker({","                fill: style.fill,","                border: style.border,","                dimensions: dimensions,","                xvalues: xvalues,","                yvalues: yvalues,","                shape: style.shape","            });","        }","        else","        {","            this._clearMarkerCache();","        }","    },","","    /**","     * Collection of default colors used for marker fills in a series when not specified by user.","     *","     * @property _defaultFillColors","     * @type Array","     * @protected","     */","    _defaultFillColors: [\"#66007f\", \"#a86f41\", \"#295454\", \"#996ab2\", \"#e8cdb7\", \"#90bdbd\",\"#000000\",\"#c3b8ca\", \"#968373\", \"#678585\"],","","    /**","     * Gets the default style values for the markers.","     *","     * @method _getPlotDefaults","     * @return Object","     * @private","     */","    _getPlotDefaults: function()","    {","        var defs = {","            fill:{","                type: \"solid\",","                alpha: 1,","                colors:null,","                alphas: null,","                ratios: null","            },","            border:{","                weight: 0,","                alpha: 1","            },","            width: 12,","            height: 12,","            shape: \"rect\",","","            padding:{","                top: 0,","                left: 0,","                right: 0,","                bottom: 0","            }","        };","        defs.fill.color = this._getDefaultColor(this.get(\"graphOrder\"), \"fill\");","        defs.border.color = this._getDefaultColor(this.get(\"graphOrder\"), \"border\");","        return defs;","    }","};","","Y.Histogram = Histogram;","","","}, '@VERSION@', {\"requires\": [\"series-cartesian\", \"series-plot-util\"]});"];
_yuitest_coverage["build/series-histogram-base/series-histogram-base.js"].lines = {"1":0,"9":0,"19":0,"21":0,"30":0,"32":0,"34":0,"72":0,"74":0,"76":0,"78":0,"80":0,"82":0,"83":0,"87":0,"88":0,"90":0,"91":0,"92":0,"93":0,"95":0,"96":0,"97":0,"99":0,"102":0,"103":0,"104":0,"106":0,"107":0,"108":0,"109":0,"110":0,"111":0,"113":0,"114":0,"116":0,"117":0,"118":0,"119":0,"120":0,"121":0,"122":0,"124":0,"125":0,"127":0,"128":0,"130":0,"131":0,"133":0,"135":0,"136":0,"137":0,"138":0,"142":0,"143":0,"144":0,"145":0,"146":0,"148":0,"150":0,"152":0,"154":0,"158":0,"160":0,"163":0,"164":0,"165":0,"167":0,"178":0,"200":0,"223":0,"224":0,"225":0,"229":0};
_yuitest_coverage["build/series-histogram-base/series-histogram-base.js"].functions = {"Histogram:19":0,"drawSeries:28":0,"_getPlotDefaults:198":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-histogram-base/series-histogram-base.js"].coveredLines = 74;
_yuitest_coverage["build/series-histogram-base/series-histogram-base.js"].coveredFunctions = 4;
_yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 1);
YUI.add('series-histogram-base', function (Y, NAME) {

/**
 * Provides core functionality for creating a bar or column series.
 *
 * @module charts
 * @submodule series-histogram
 */
_yuitest_coverfunc("build/series-histogram-base/series-histogram-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 9);
var Y_Lang = Y.Lang;

/**
 * Histogram is the base class for Column and Bar series.
 *
 * @class Histogram
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-histogram
 */
_yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 19);
function Histogram(){}

_yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 21);
Histogram.prototype = {
    /**
     * Draws the series.
     *
     * @method drawSeries
     * @protected
     */
    drawSeries: function()
    {
        _yuitest_coverfunc("build/series-histogram-base/series-histogram-base.js", "drawSeries", 28);
_yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 30);
if(this.get("xcoords").length < 1)
        {
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 32);
return;
        }
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 34);
var style = Y.clone(this.get("styles").marker),
            graphic = this.get("graphic"),
            setSize,
            calculatedSize,
            xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            i = 0,
            len = xcoords.length,
            top = ycoords[0],
            seriesTypeCollection = this.get("seriesTypeCollection"),
            seriesLen = seriesTypeCollection.length || 0,
            seriesSize = 0,
            totalSize = 0,
            offset = 0,
            ratio,
            renderer,
            order = this.get("order"),
            graphOrder = this.get("graphOrder"),
            left,
            marker,
            setSizeKey,
            calculatedSizeKey,
            config,
            fillColors = null,
            borderColors = null,
            xMarkerPlane = [],
            yMarkerPlane = [],
            xMarkerPlaneLeft,
            xMarkerPlaneRight,
            yMarkerPlaneTop,
            yMarkerPlaneBottom,
            dimensions = {
                width: [],
                height: []
            },
            xvalues = [],
            yvalues = [],
            groupMarkers = this.get("groupMarkers");
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 72);
if(Y_Lang.isArray(style.fill.color))
        {
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 74);
fillColors = style.fill.color.concat();
        }
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 76);
if(Y_Lang.isArray(style.border.color))
        {
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 78);
borderColors = style.border.color.concat();
        }
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 80);
if(this.get("direction") === "vertical")
        {
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 82);
setSizeKey = "height";
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 83);
calculatedSizeKey = "width";
        }
        else
        {
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 87);
setSizeKey = "width";
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 88);
calculatedSizeKey = "height";
        }
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 90);
setSize = style[setSizeKey];
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 91);
calculatedSize = style[calculatedSizeKey];
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 92);
this._createMarkerCache();
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 93);
for(; i < seriesLen; ++i)
        {
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 95);
renderer = seriesTypeCollection[i];
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 96);
seriesSize += renderer.get("styles").marker[setSizeKey];
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 97);
if(order > i)
            {
                _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 99);
offset = seriesSize;
            }
        }
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 102);
totalSize = len * seriesSize;
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 103);
this._maxSize = graphic.get(setSizeKey);
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 104);
if(totalSize > this._maxSize)
        {
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 106);
ratio = graphic.get(setSizeKey)/totalSize;
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 107);
seriesSize *= ratio;
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 108);
offset *= ratio;
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 109);
setSize *= ratio;
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 110);
setSize = Math.max(setSize, 1);
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 111);
this._maxSize = setSize;
        }
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 113);
offset -= seriesSize/2;
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 114);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 116);
xMarkerPlaneLeft = xcoords[i] - seriesSize/2;
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 117);
xMarkerPlaneRight = xMarkerPlaneLeft + seriesSize;
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 118);
yMarkerPlaneTop = ycoords[i] - seriesSize/2;
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 119);
yMarkerPlaneBottom = yMarkerPlaneTop + seriesSize;
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 120);
xMarkerPlane.push({start: xMarkerPlaneLeft, end: xMarkerPlaneRight});
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 121);
yMarkerPlane.push({start: yMarkerPlaneTop, end: yMarkerPlaneBottom});
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 122);
if(isNaN(xcoords[i]) || isNaN(ycoords[i]))
            {
                _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 124);
this._markers.push(null);
                _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 125);
continue;
            }
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 127);
config = this._getMarkerDimensions(xcoords[i], ycoords[i], calculatedSize, offset);
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 128);
if(!isNaN(config.calculatedSize) && config.calculatedSize > 0)
            {
                _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 130);
top = config.top;
                _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 131);
left = config.left;

                _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 133);
if(groupMarkers)
                {
                    _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 135);
dimensions[setSizeKey][i] = setSize;
                    _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 136);
dimensions[calculatedSizeKey][i] = config.calculatedSize;
                    _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 137);
xvalues.push(left);
                    _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 138);
yvalues.push(top);
                }
                else
                {
                    _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 142);
style[setSizeKey] = setSize;
                    _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 143);
style[calculatedSizeKey] = config.calculatedSize;
                    _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 144);
style.x = left;
                    _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 145);
style.y = top;
                    _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 146);
if(fillColors)
                    {
                        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 148);
style.fill.color = fillColors[i % fillColors.length];
                    }
                    _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 150);
if(borderColors)
                    {
                        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 152);
style.border.color = borderColors[i % borderColors.length];
                    }
                    _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 154);
marker = this.getMarker(style, graphOrder, i);
                }

            }
            else {_yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 158);
if(!groupMarkers)
            {
                _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 160);
this._markers.push(null);
            }}
        }
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 163);
this.set("xMarkerPlane", xMarkerPlane);
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 164);
this.set("yMarkerPlane", yMarkerPlane);
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 165);
if(groupMarkers)
        {
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 167);
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
            _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 178);
this._clearMarkerCache();
        }
    },

    /**
     * Collection of default colors used for marker fills in a series when not specified by user.
     *
     * @property _defaultFillColors
     * @type Array
     * @protected
     */
    _defaultFillColors: ["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"],

    /**
     * Gets the default style values for the markers.
     *
     * @method _getPlotDefaults
     * @return Object
     * @private
     */
    _getPlotDefaults: function()
    {
        _yuitest_coverfunc("build/series-histogram-base/series-histogram-base.js", "_getPlotDefaults", 198);
_yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 200);
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
            width: 12,
            height: 12,
            shape: "rect",

            padding:{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        };
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 223);
defs.fill.color = this._getDefaultColor(this.get("graphOrder"), "fill");
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 224);
defs.border.color = this._getDefaultColor(this.get("graphOrder"), "border");
        _yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 225);
return defs;
    }
};

_yuitest_coverline("build/series-histogram-base/series-histogram-base.js", 229);
Y.Histogram = Histogram;


}, '@VERSION@', {"requires": ["series-cartesian", "series-plot-util"]});
