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
_yuitest_coverage["build/series-candlestick/series-candlestick.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-candlestick/series-candlestick.js",
    code: []
};
_yuitest_coverage["build/series-candlestick/series-candlestick.js"].code=["YUI.add('series-candlestick', function (Y, NAME) {","","/**"," * Provides functionality for creating a candlestick series."," *"," * @module charts"," * @submodule series-candlestick"," */","/**"," * The CandlestickSeries class renders columns (candles) and lines (wicks) representing the open, high, low and close"," * values for a chart."," *"," * @class CandlestickSeries"," * @extends RangeSeries"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-candlestick"," */","function CandlestickSeries()","{","    CandlestickSeries.superclass.constructor.apply(this, arguments);","}","","CandlestickSeries.NAME = \"candlestickSeries\";","","CandlestickSeries.ATTRS = {","    /**","     * Read-only attribute indicating the type of series.","     *","     * @attribute type","     * @type String","     * @readOnly","     * @default candlestick","     */","    type: {","        value: \"candlestick\"","    },","","    /**","     * The graphic in which drawings will be rendered.","     *","     * @attribute graphic","     * @type Graphic","     */","    graphic: {","        lazyAdd: false,","","        setter: function(val) {","            //woraround for Attribute order of operations bug","            if(!this.get(\"rendered\")) {","                this.set(\"rendered\", true);","            }","            this.set(\"upcandle\", val.addShape({","               type: \"path\"","            }));","            this.set(\"downcandle\", val.addShape({","               type: \"path\"","            }));","            this.set(\"wick\", val.addShape({","               type: \"path\"","            }));","            return val;","        }","    },","","    /**","     * Reference to the candlestick used when the close value is higher than the open value.","     *","     * @attribute upcandle","     * @type Path","     */","    upcandle: {},","","    /**","     * Reference to the candlestick used when the open value is higher than the close value.","     *","     * @attribute downcandle","     * @type Path","     */","    downcandle: {},","","    /**","     * Reference to the line drawn between the high and low values.","     *","     * @attribute wick","     * @type Path","     */","    wick: {}","","    /**","     * Style properties used for drawing candles and wicks. This attribute is inherited from `RangeSeries`. Below are the default values:","     *  <dl>","     *      <dt>upcandle</dt><dd>Properties for a candle representing a period that closes higher than it opens.","     *          <dl>","     *              <dt>fill</dt><dd>A hash containing the following values:","     *                  <dl>","     *                      <dt>color</dt><dd>Color of the fill. The default value is \"#00aa00\".</dd>","     *                      </dd>","     *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>","     *                  </dl>","     *              </dd>","     *              <dt>border</dt><dd>A hash containing the following values:","     *                  <dl>","     *                      <dt>color</dt><dd>Color of the border. The default value is \"#000000\".</dd>","     *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>","     *                      <dt>weight</dt><dd>Number indicating the width of the border. The default value is 0.</dd>","     *                  </dl>","     *              </dd>","     *          </dl>","     *      </dd>","     *      <dt>downcandle</dt><dd>Properties for a candle representing a period that opens higher than it closes.","     *          <dl>","     *              <dt>fill</dt><dd>A hash containing the following values:","     *                  <dl>","     *                      <dt>color</dt><dd>Color of the fill. The default value is \"#aa0000\".</dd>","     *                      </dd>","     *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>","     *                  </dl>","     *              </dd>","     *              <dt>border</dt><dd>A hash containing the following values:","     *                  <dl>","     *                      <dt>color</dt><dd>Color of the border. The default value is \"#000000\".</dd>","     *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>","     *                      <dt>weight</dt><dd>Number indicating the width of the border. The default value is 0.</dd>","     *                  </dl>","     *              </dd>","     *          </dl>","     *      </dd>","     *      <dt>wick</dt><dd>Properties for the wick, which is a line drawn from the high point of the period to the low point of the period.","     *          <dl>","     *              <dt>color</dt><dd>The color of the wick. The default value is \"#000000\".</dd>","     *              <dt>weight</dt><dd>The weight of the wick. The default value is 1.</dd>","     *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the wick. The default value is 1.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","     *","     * @attribute styles","     * @type Object","     */","};","","Y.extend(CandlestickSeries, Y.RangeSeries, {","    /**","     * Draws markers for an Candlestick series.","     *","     * @method","     * @param {Array} xcoords The xcoordinates to be plotted.","     * @param {Array} opencoords The coordinates representing the open values.","     * @param {Array} highcoords The coordinates representing the high values.","     * @param {Array} lowcoords The coordinates representing the low values.","     * @param {Array} closecoords The coordinates representing the close values.","     * @param {Number} len The number of x coordinates to plot.","     * @param {Number} width The width of each candlestick marker.","     * @param {Number} halfwidth Half the width of each candlestick marker.","     * @param {Object} styles The styles for the series.","     * @private","     */","    _drawMarkers: function(xcoords, opencoords, highcoords, lowcoords, closecoords, len, width, halfwidth, styles)","    {","        var upcandle = this.get(\"upcandle\"),","            downcandle = this.get(\"downcandle\"),","            wick = this.get(\"wick\"),","            cx,","            opencoord,","            highcoord,","            lowcoord,","            closecoord,","            left,","            right,","            top,","            bottom,","            leftPadding = styles.padding.left,","            up;","        upcandle.set(styles.upcandle);","        downcandle.set(styles.downcandle);","        wick.set(styles.wick);","        upcandle.clear();","        downcandle.clear();","        wick.clear();","        for(i = 0; i < len; i = i + 1)","        {","            cx = xcoords[i] + leftPadding;","            left = cx - halfwidth;","            right = cx + halfwidth;","            opencoord = opencoords[i];","            highcoord = highcoords[i];","            lowcoord = lowcoords[i];","            closecoord = closecoords[i];","            up = opencoord > closecoord;","            top = up ? closecoord : opencoord;","            bottom = up ? opencoord : closecoord;","            height = bottom - top;","            candle = up ? upcandle : downcandle;","            candle.drawRect(left, top, width, height);","            wick.moveTo(cx, highcoord);","            wick.lineTo(cx, lowcoord);","        }","        upcandle.end();","        downcandle.end();","        wick.end();","        wick.toBack();","    },","","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} visible indicates visibilitye","     * @private","     */","    _toggleVisible: function(visible)","    {","        this.get(\"upcandle\").set(\"visible\", visible);","        this.get(\"downcandle\").set(\"visible\", visible);","        this.get(\"wick\").set(\"visible\", visible);","    },","","    /**","     * Destructor implementation for the CartesianSeries class. Calls destroy on all Graphic instances.","     *","     * @method destructor","     * @protected","     */","    destructor: function()","    {","        var upcandle = this.get(\"upcandle\"),","            downcandle = this.get(\"downcandle\"),","            wick = this.get(\"wick\");","        if(upcandle)","        {","            upcandle.destroy();","        }","        if(downcandle)","        {","            downcandle.destroy();","        }","        if(wick)","        {","            wick.destroy();","        }","    },","","    /**","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     * @private","     */","    _getDefaultStyles: function()","    {","        var styles = {","            upcandle: {","                fill: {","                    color: \"#00aa00\",","                    alpha: 1","                },","                stroke: {","                    color: \"#000000\",","                    alpha: 1,","                    weight: 0","                }","            },","            downcandle: {","                fill: {","                    color: \"#aa0000\",","                    alpha: 1","                },","                stroke: {","                    color: \"#000000\",","                    alpha: 1,","                    weight: 0","                }","            },","            wick: {","                stroke: {","                    color: \"#000000\",","                    alpha: 1,","                    weight: 1","                }","            }","        };","        return this._mergeStyles(styles, CandlestickSeries.superclass._getDefaultStyles());","    }","});","Y.CandlestickSeries = CandlestickSeries;","","","}, '@VERSION@', {\"requires\": [\"series-range\"]});"];
_yuitest_coverage["build/series-candlestick/series-candlestick.js"].lines = {"1":0,"19":0,"21":0,"24":0,"26":0,"50":0,"51":0,"53":0,"56":0,"59":0,"62":0,"143":0,"161":0,"175":0,"176":0,"177":0,"178":0,"179":0,"180":0,"181":0,"183":0,"184":0,"185":0,"186":0,"187":0,"188":0,"189":0,"190":0,"191":0,"192":0,"193":0,"194":0,"195":0,"196":0,"197":0,"199":0,"200":0,"201":0,"202":0,"214":0,"215":0,"216":0,"227":0,"230":0,"232":0,"234":0,"236":0,"238":0,"240":0,"254":0,"285":0,"288":0};
_yuitest_coverage["build/series-candlestick/series-candlestick.js"].functions = {"CandlestickSeries:19":0,"setter:48":0,"_drawMarkers:159":0,"_toggleVisible:212":0,"destructor:225":0,"_getDefaultStyles:252":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-candlestick/series-candlestick.js"].coveredLines = 52;
_yuitest_coverage["build/series-candlestick/series-candlestick.js"].coveredFunctions = 7;
_yuitest_coverline("build/series-candlestick/series-candlestick.js", 1);
YUI.add('series-candlestick', function (Y, NAME) {

/**
 * Provides functionality for creating a candlestick series.
 *
 * @module charts
 * @submodule series-candlestick
 */
/**
 * The CandlestickSeries class renders columns (candles) and lines (wicks) representing the open, high, low and close
 * values for a chart.
 *
 * @class CandlestickSeries
 * @extends RangeSeries
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-candlestick
 */
_yuitest_coverfunc("build/series-candlestick/series-candlestick.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-candlestick/series-candlestick.js", 19);
function CandlestickSeries()
{
    _yuitest_coverfunc("build/series-candlestick/series-candlestick.js", "CandlestickSeries", 19);
_yuitest_coverline("build/series-candlestick/series-candlestick.js", 21);
CandlestickSeries.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/series-candlestick/series-candlestick.js", 24);
CandlestickSeries.NAME = "candlestickSeries";

_yuitest_coverline("build/series-candlestick/series-candlestick.js", 26);
CandlestickSeries.ATTRS = {
    /**
     * Read-only attribute indicating the type of series.
     *
     * @attribute type
     * @type String
     * @readOnly
     * @default candlestick
     */
    type: {
        value: "candlestick"
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
            _yuitest_coverfunc("build/series-candlestick/series-candlestick.js", "setter", 48);
_yuitest_coverline("build/series-candlestick/series-candlestick.js", 50);
if(!this.get("rendered")) {
                _yuitest_coverline("build/series-candlestick/series-candlestick.js", 51);
this.set("rendered", true);
            }
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 53);
this.set("upcandle", val.addShape({
               type: "path"
            }));
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 56);
this.set("downcandle", val.addShape({
               type: "path"
            }));
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 59);
this.set("wick", val.addShape({
               type: "path"
            }));
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 62);
return val;
        }
    },

    /**
     * Reference to the candlestick used when the close value is higher than the open value.
     *
     * @attribute upcandle
     * @type Path
     */
    upcandle: {},

    /**
     * Reference to the candlestick used when the open value is higher than the close value.
     *
     * @attribute downcandle
     * @type Path
     */
    downcandle: {},

    /**
     * Reference to the line drawn between the high and low values.
     *
     * @attribute wick
     * @type Path
     */
    wick: {}

    /**
     * Style properties used for drawing candles and wicks. This attribute is inherited from `RangeSeries`. Below are the default values:
     *  <dl>
     *      <dt>upcandle</dt><dd>Properties for a candle representing a period that closes higher than it opens.
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
     *      <dt>downcandle</dt><dd>Properties for a candle representing a period that opens higher than it closes.
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
     *      <dt>wick</dt><dd>Properties for the wick, which is a line drawn from the high point of the period to the low point of the period.
     *          <dl>
     *              <dt>color</dt><dd>The color of the wick. The default value is "#000000".</dd>
     *              <dt>weight</dt><dd>The weight of the wick. The default value is 1.</dd>
     *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the wick. The default value is 1.</dd>
     *          </dl>
     *      </dd>
     *  </dl>
     *
     * @attribute styles
     * @type Object
     */
};

_yuitest_coverline("build/series-candlestick/series-candlestick.js", 143);
Y.extend(CandlestickSeries, Y.RangeSeries, {
    /**
     * Draws markers for an Candlestick series.
     *
     * @method
     * @param {Array} xcoords The xcoordinates to be plotted.
     * @param {Array} opencoords The coordinates representing the open values.
     * @param {Array} highcoords The coordinates representing the high values.
     * @param {Array} lowcoords The coordinates representing the low values.
     * @param {Array} closecoords The coordinates representing the close values.
     * @param {Number} len The number of x coordinates to plot.
     * @param {Number} width The width of each candlestick marker.
     * @param {Number} halfwidth Half the width of each candlestick marker.
     * @param {Object} styles The styles for the series.
     * @private
     */
    _drawMarkers: function(xcoords, opencoords, highcoords, lowcoords, closecoords, len, width, halfwidth, styles)
    {
        _yuitest_coverfunc("build/series-candlestick/series-candlestick.js", "_drawMarkers", 159);
_yuitest_coverline("build/series-candlestick/series-candlestick.js", 161);
var upcandle = this.get("upcandle"),
            downcandle = this.get("downcandle"),
            wick = this.get("wick"),
            cx,
            opencoord,
            highcoord,
            lowcoord,
            closecoord,
            left,
            right,
            top,
            bottom,
            leftPadding = styles.padding.left,
            up;
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 175);
upcandle.set(styles.upcandle);
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 176);
downcandle.set(styles.downcandle);
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 177);
wick.set(styles.wick);
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 178);
upcandle.clear();
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 179);
downcandle.clear();
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 180);
wick.clear();
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 181);
for(i = 0; i < len; i = i + 1)
        {
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 183);
cx = xcoords[i] + leftPadding;
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 184);
left = cx - halfwidth;
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 185);
right = cx + halfwidth;
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 186);
opencoord = opencoords[i];
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 187);
highcoord = highcoords[i];
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 188);
lowcoord = lowcoords[i];
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 189);
closecoord = closecoords[i];
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 190);
up = opencoord > closecoord;
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 191);
top = up ? closecoord : opencoord;
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 192);
bottom = up ? opencoord : closecoord;
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 193);
height = bottom - top;
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 194);
candle = up ? upcandle : downcandle;
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 195);
candle.drawRect(left, top, width, height);
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 196);
wick.moveTo(cx, highcoord);
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 197);
wick.lineTo(cx, lowcoord);
        }
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 199);
upcandle.end();
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 200);
downcandle.end();
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 201);
wick.end();
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 202);
wick.toBack();
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
        _yuitest_coverfunc("build/series-candlestick/series-candlestick.js", "_toggleVisible", 212);
_yuitest_coverline("build/series-candlestick/series-candlestick.js", 214);
this.get("upcandle").set("visible", visible);
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 215);
this.get("downcandle").set("visible", visible);
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 216);
this.get("wick").set("visible", visible);
    },

    /**
     * Destructor implementation for the CartesianSeries class. Calls destroy on all Graphic instances.
     *
     * @method destructor
     * @protected
     */
    destructor: function()
    {
        _yuitest_coverfunc("build/series-candlestick/series-candlestick.js", "destructor", 225);
_yuitest_coverline("build/series-candlestick/series-candlestick.js", 227);
var upcandle = this.get("upcandle"),
            downcandle = this.get("downcandle"),
            wick = this.get("wick");
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 230);
if(upcandle)
        {
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 232);
upcandle.destroy();
        }
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 234);
if(downcandle)
        {
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 236);
downcandle.destroy();
        }
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 238);
if(wick)
        {
            _yuitest_coverline("build/series-candlestick/series-candlestick.js", 240);
wick.destroy();
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
        _yuitest_coverfunc("build/series-candlestick/series-candlestick.js", "_getDefaultStyles", 252);
_yuitest_coverline("build/series-candlestick/series-candlestick.js", 254);
var styles = {
            upcandle: {
                fill: {
                    color: "#00aa00",
                    alpha: 1
                },
                stroke: {
                    color: "#000000",
                    alpha: 1,
                    weight: 0
                }
            },
            downcandle: {
                fill: {
                    color: "#aa0000",
                    alpha: 1
                },
                stroke: {
                    color: "#000000",
                    alpha: 1,
                    weight: 0
                }
            },
            wick: {
                stroke: {
                    color: "#000000",
                    alpha: 1,
                    weight: 1
                }
            }
        };
        _yuitest_coverline("build/series-candlestick/series-candlestick.js", 285);
return this._mergeStyles(styles, CandlestickSeries.superclass._getDefaultStyles());
    }
});
_yuitest_coverline("build/series-candlestick/series-candlestick.js", 288);
Y.CandlestickSeries = CandlestickSeries;


}, '@VERSION@', {"requires": ["series-range"]});
