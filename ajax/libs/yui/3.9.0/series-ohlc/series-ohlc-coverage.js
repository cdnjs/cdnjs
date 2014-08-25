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
_yuitest_coverage["build/series-ohlc/series-ohlc.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-ohlc/series-ohlc.js",
    code: []
};
_yuitest_coverage["build/series-ohlc/series-ohlc.js"].code=["YUI.add('series-ohlc', function (Y, NAME) {","","/**"," * Provides functionality for creating a ohlc series."," *"," * @module charts"," * @submodule series-ohlc"," */","/**"," * The OHLCSeries class renders lines representing the open, high, low and close"," * values for a chart. "," *"," * @class OHLCSeries"," * @extends RangeSeries"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-ohlc"," */","function OHLCSeries()","{","    OHLCSeries.superclass.constructor.apply(this, arguments);","}","","OHLCSeries.NAME = \"ohlcSeries\";","","OHLCSeries.ATTRS = {","    /**","     * Read-only attribute indicating the type of series.","     *","     * @attribute type","     * @type String","     * @readOnly","     * @default ohlc","     */","    type: {","        value: \"ohlc\"","    },","","    /**","     * The graphic in which drawings will be rendered.","     *","     * @attribute graphic","     * @type Graphic","     */","    graphic: {","        lazyAdd: false,","","        setter: function(val) {","            //woraround for Attribute order of operations bug","            if(!this.get(\"rendered\")) {","                this.set(\"rendered\", true);","            }","            this.set(\"upmarker\", val.addShape({","               type: \"path\" ","            }));","            this.set(\"downmarker\", val.addShape({","               type: \"path\" ","            }));","            return val;","        }","    },","","    upmarker: {},","","    downmarker: {}","","    /**","     * Style properties used for drawing markers. This attribute is inherited from `RangeSeries`. Below are the default values:","     *  <dl>","     *      <dt>upmarker</dt><dd>Properties for a marker representing a period that closes higher than it opens.    ","     *          <dl>","     *              <dt>fill</dt><dd>A hash containing the following values:","     *                  <dl>","     *                      <dt>color</dt><dd>Color of the fill. The default value is \"#00aa00\".</dd>","     *                      </dd>","     *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>","     *                  </dl>","     *              </dd>","     *              <dt>border</dt><dd>A hash containing the following values:","     *                  <dl>","     *                      <dt>color</dt><dd>Color of the border. The default value is \"#000000\".</dd>","     *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>","     *                      <dt>weight</dt><dd>Number indicating the width of the border. The default value is 0.</dd>","     *                  </dl>","     *              </dd>","     *          </dl>","     *      </dd>","     *      <dt>downmarker</dt><dd>Properties for a marker representing a period that opens higher than it closes.    ","     *          <dl>","     *              <dt>fill</dt><dd>A hash containing the following values:","     *                  <dl>","     *                      <dt>color</dt><dd>Color of the fill. The default value is \"#aa0000\".</dd>","     *                      </dd>","     *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>","     *                  </dl>","     *              </dd>","     *              <dt>border</dt><dd>A hash containing the following values:","     *                  <dl>","     *                      <dt>color</dt><dd>Color of the border. The default value is \"#000000\".</dd> ","     *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>","     *                      <dt>weight</dt><dd>Number indicating the width of the border. The default value is 0.</dd>","     *                  </dl>","     *              </dd>","     *          </dl>","     *      </dd>","     *  </dl>","     *","     * @attribute styles","     * @type Object","     */","};","","Y.extend(OHLCSeries, Y.RangeSeries, {","    /**","     * Draws markers for an OHLC series.","     *","     * @method","     * @param {Array} xcoords The xcoordinates to be plotted.","     * @param {Array} opencoords The coordinates representing the open values.","     * @param {Array} highcoords The coordinates representing the high values.","     * @param {Array} lowcoords The coordinates representing the low values.","     * @param {Array} closecoords The coordinates representing the close values.","     * @param {Number} len The number of x coordinates to plot.","     * @param {Number} width The width of each ohlc marker.","     * @param {Number} halfwidth Half the width of each ohlc marker.","     * @param {Object} styles The styles for the series.","     * @private","     */","    _drawMarkers: function(xcoords, opencoords, highcoords, lowcoords, closecoords, len, width, halfwidth, styles)","    {","        var upmarker = this.get(\"upmarker\"),","            downmarker = this.get(\"downmarker\"),","            opencoord,","            highcoord,","            lowcoord,","            closecoord,","            left,","            right,","            leftPadding = styles.padding.left,","            marker,","            up;","        upmarker.set(styles.upmarker);","        downmarker.set(styles.downmarker);","        upmarker.clear();","        downmarker.clear();","        for(i = 0; i < len; i = i + 1)","        {","            cx = xcoords[i] + leftPadding;","            left = cx - halfwidth;","            right = cx + halfwidth;","            opencoord = opencoords[i];","            highcoord = highcoords[i];","            lowcoord = lowcoords[i];","            closecoord = closecoords[i];","            up = opencoord > closecoord;","            height = lowcoord - highcoord;","            marker = up ? upmarker : downmarker;","            marker.moveTo(left, opencoord);","            marker.lineTo(cx, opencoord);","            marker.moveTo(cx, highcoord);","            marker.lineTo(cx, lowcoord);","            marker.moveTo(cx, closecoord);","            marker.lineTo(right, closecoord);","        }","        upmarker.end();","        downmarker.end();","    },","","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} visible indicates visibilitye","     * @private","     */","    _toggleVisible: function(visible)","    {","        this.get(\"upmarker\").set(\"visible\", visible);","        this.get(\"downmarker\").set(\"visible\", visible);","    },","","    /**","     * Destructor implementation for the CartesianSeries class. Calls destroy on all Graphic instances.","     *","     * @method destructor","     * @protected","     */","    destructor: function()","    {","        var upmarker = this.get(\"upmarker\"),","            downmarker = this.get(\"downmarker\");","        if(upmarker) ","        {","            upmarker.destroy();","        }","        if(downmarker) ","        {","            downmarker.destroy();","        }","    },","","    /**","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     * @private","     */","    _getDefaultStyles: function()","    {","        var styles = {","            upmarker: {","                stroke: {","                    color: \"#00aa00\",","                    alpha: 1,","                    weight: 1","                }","            },","            downmarker: {","                stroke: {","                    color: \"#aa0000\",","                    alpha: 1,","                    weight: 1","                }","            }","        };","        return this._mergeStyles(styles, OHLCSeries.superclass._getDefaultStyles());","    }","});","Y.OHLCSeries = OHLCSeries;","","","}, '@VERSION@', {\"requires\": [\"series-range\"]});"];
_yuitest_coverage["build/series-ohlc/series-ohlc.js"].lines = {"1":0,"19":0,"21":0,"24":0,"26":0,"50":0,"51":0,"53":0,"56":0,"59":0,"113":0,"131":0,"142":0,"143":0,"144":0,"145":0,"146":0,"148":0,"149":0,"150":0,"151":0,"152":0,"153":0,"154":0,"155":0,"156":0,"157":0,"158":0,"159":0,"160":0,"161":0,"162":0,"163":0,"165":0,"166":0,"178":0,"179":0,"190":0,"192":0,"194":0,"196":0,"198":0,"212":0,"228":0,"231":0};
_yuitest_coverage["build/series-ohlc/series-ohlc.js"].functions = {"OHLCSeries:19":0,"setter:48":0,"_drawMarkers:129":0,"_toggleVisible:176":0,"destructor:188":0,"_getDefaultStyles:210":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-ohlc/series-ohlc.js"].coveredLines = 45;
_yuitest_coverage["build/series-ohlc/series-ohlc.js"].coveredFunctions = 7;
_yuitest_coverline("build/series-ohlc/series-ohlc.js", 1);
YUI.add('series-ohlc', function (Y, NAME) {

/**
 * Provides functionality for creating a ohlc series.
 *
 * @module charts
 * @submodule series-ohlc
 */
/**
 * The OHLCSeries class renders lines representing the open, high, low and close
 * values for a chart. 
 *
 * @class OHLCSeries
 * @extends RangeSeries
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-ohlc
 */
_yuitest_coverfunc("build/series-ohlc/series-ohlc.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-ohlc/series-ohlc.js", 19);
function OHLCSeries()
{
    _yuitest_coverfunc("build/series-ohlc/series-ohlc.js", "OHLCSeries", 19);
_yuitest_coverline("build/series-ohlc/series-ohlc.js", 21);
OHLCSeries.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/series-ohlc/series-ohlc.js", 24);
OHLCSeries.NAME = "ohlcSeries";

_yuitest_coverline("build/series-ohlc/series-ohlc.js", 26);
OHLCSeries.ATTRS = {
    /**
     * Read-only attribute indicating the type of series.
     *
     * @attribute type
     * @type String
     * @readOnly
     * @default ohlc
     */
    type: {
        value: "ohlc"
    },

    /**
     * The graphic in which drawings will be rendered.
     *
     * @attribute graphic
     * @type Graphic
     */
    graphic: {
        lazyAdd: false,

        setter: function(val) {
            //woraround for Attribute order of operations bug
            _yuitest_coverfunc("build/series-ohlc/series-ohlc.js", "setter", 48);
_yuitest_coverline("build/series-ohlc/series-ohlc.js", 50);
if(!this.get("rendered")) {
                _yuitest_coverline("build/series-ohlc/series-ohlc.js", 51);
this.set("rendered", true);
            }
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 53);
this.set("upmarker", val.addShape({
               type: "path" 
            }));
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 56);
this.set("downmarker", val.addShape({
               type: "path" 
            }));
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 59);
return val;
        }
    },

    upmarker: {},

    downmarker: {}

    /**
     * Style properties used for drawing markers. This attribute is inherited from `RangeSeries`. Below are the default values:
     *  <dl>
     *      <dt>upmarker</dt><dd>Properties for a marker representing a period that closes higher than it opens.    
     *          <dl>
     *              <dt>fill</dt><dd>A hash containing the following values:
     *                  <dl>
     *                      <dt>color</dt><dd>Color of the fill. The default value is "#00aa00".</dd>
     *                      </dd>
     *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>
     *                  </dl>
     *              </dd>
     *              <dt>border</dt><dd>A hash containing the following values:
     *                  <dl>
     *                      <dt>color</dt><dd>Color of the border. The default value is "#000000".</dd>
     *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>
     *                      <dt>weight</dt><dd>Number indicating the width of the border. The default value is 0.</dd>
     *                  </dl>
     *              </dd>
     *          </dl>
     *      </dd>
     *      <dt>downmarker</dt><dd>Properties for a marker representing a period that opens higher than it closes.    
     *          <dl>
     *              <dt>fill</dt><dd>A hash containing the following values:
     *                  <dl>
     *                      <dt>color</dt><dd>Color of the fill. The default value is "#aa0000".</dd>
     *                      </dd>
     *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>
     *                  </dl>
     *              </dd>
     *              <dt>border</dt><dd>A hash containing the following values:
     *                  <dl>
     *                      <dt>color</dt><dd>Color of the border. The default value is "#000000".</dd> 
     *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>
     *                      <dt>weight</dt><dd>Number indicating the width of the border. The default value is 0.</dd>
     *                  </dl>
     *              </dd>
     *          </dl>
     *      </dd>
     *  </dl>
     *
     * @attribute styles
     * @type Object
     */
};

_yuitest_coverline("build/series-ohlc/series-ohlc.js", 113);
Y.extend(OHLCSeries, Y.RangeSeries, {
    /**
     * Draws markers for an OHLC series.
     *
     * @method
     * @param {Array} xcoords The xcoordinates to be plotted.
     * @param {Array} opencoords The coordinates representing the open values.
     * @param {Array} highcoords The coordinates representing the high values.
     * @param {Array} lowcoords The coordinates representing the low values.
     * @param {Array} closecoords The coordinates representing the close values.
     * @param {Number} len The number of x coordinates to plot.
     * @param {Number} width The width of each ohlc marker.
     * @param {Number} halfwidth Half the width of each ohlc marker.
     * @param {Object} styles The styles for the series.
     * @private
     */
    _drawMarkers: function(xcoords, opencoords, highcoords, lowcoords, closecoords, len, width, halfwidth, styles)
    {
        _yuitest_coverfunc("build/series-ohlc/series-ohlc.js", "_drawMarkers", 129);
_yuitest_coverline("build/series-ohlc/series-ohlc.js", 131);
var upmarker = this.get("upmarker"),
            downmarker = this.get("downmarker"),
            opencoord,
            highcoord,
            lowcoord,
            closecoord,
            left,
            right,
            leftPadding = styles.padding.left,
            marker,
            up;
        _yuitest_coverline("build/series-ohlc/series-ohlc.js", 142);
upmarker.set(styles.upmarker);
        _yuitest_coverline("build/series-ohlc/series-ohlc.js", 143);
downmarker.set(styles.downmarker);
        _yuitest_coverline("build/series-ohlc/series-ohlc.js", 144);
upmarker.clear();
        _yuitest_coverline("build/series-ohlc/series-ohlc.js", 145);
downmarker.clear();
        _yuitest_coverline("build/series-ohlc/series-ohlc.js", 146);
for(i = 0; i < len; i = i + 1)
        {
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 148);
cx = xcoords[i] + leftPadding;
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 149);
left = cx - halfwidth;
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 150);
right = cx + halfwidth;
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 151);
opencoord = opencoords[i];
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 152);
highcoord = highcoords[i];
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 153);
lowcoord = lowcoords[i];
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 154);
closecoord = closecoords[i];
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 155);
up = opencoord > closecoord;
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 156);
height = lowcoord - highcoord;
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 157);
marker = up ? upmarker : downmarker;
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 158);
marker.moveTo(left, opencoord);
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 159);
marker.lineTo(cx, opencoord);
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 160);
marker.moveTo(cx, highcoord);
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 161);
marker.lineTo(cx, lowcoord);
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 162);
marker.moveTo(cx, closecoord);
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 163);
marker.lineTo(right, closecoord);
        }
        _yuitest_coverline("build/series-ohlc/series-ohlc.js", 165);
upmarker.end();
        _yuitest_coverline("build/series-ohlc/series-ohlc.js", 166);
downmarker.end();
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
        _yuitest_coverfunc("build/series-ohlc/series-ohlc.js", "_toggleVisible", 176);
_yuitest_coverline("build/series-ohlc/series-ohlc.js", 178);
this.get("upmarker").set("visible", visible);
        _yuitest_coverline("build/series-ohlc/series-ohlc.js", 179);
this.get("downmarker").set("visible", visible);
    },

    /**
     * Destructor implementation for the CartesianSeries class. Calls destroy on all Graphic instances.
     *
     * @method destructor
     * @protected
     */
    destructor: function()
    {
        _yuitest_coverfunc("build/series-ohlc/series-ohlc.js", "destructor", 188);
_yuitest_coverline("build/series-ohlc/series-ohlc.js", 190);
var upmarker = this.get("upmarker"),
            downmarker = this.get("downmarker");
        _yuitest_coverline("build/series-ohlc/series-ohlc.js", 192);
if(upmarker) 
        {
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 194);
upmarker.destroy();
        }
        _yuitest_coverline("build/series-ohlc/series-ohlc.js", 196);
if(downmarker) 
        {
            _yuitest_coverline("build/series-ohlc/series-ohlc.js", 198);
downmarker.destroy();
        }
    },

    /**
     * Gets the default value for the `styles` attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     * @private
     */
    _getDefaultStyles: function()
    {
        _yuitest_coverfunc("build/series-ohlc/series-ohlc.js", "_getDefaultStyles", 210);
_yuitest_coverline("build/series-ohlc/series-ohlc.js", 212);
var styles = {
            upmarker: {
                stroke: {
                    color: "#00aa00",
                    alpha: 1,
                    weight: 1
                }
            },
            downmarker: {
                stroke: {
                    color: "#aa0000",
                    alpha: 1,
                    weight: 1
                }
            }
        };
        _yuitest_coverline("build/series-ohlc/series-ohlc.js", 228);
return this._mergeStyles(styles, OHLCSeries.superclass._getDefaultStyles());
    }
});
_yuitest_coverline("build/series-ohlc/series-ohlc.js", 231);
Y.OHLCSeries = OHLCSeries;


}, '@VERSION@', {"requires": ["series-range"]});
