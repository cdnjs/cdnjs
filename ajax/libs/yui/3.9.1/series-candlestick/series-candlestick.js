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
function CandlestickSeries()
{
    CandlestickSeries.superclass.constructor.apply(this, arguments);
}

CandlestickSeries.NAME = "candlestickSeries";

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
            if(!this.get("rendered")) {
                this.set("rendered", true);
            }
            this.set("upcandle", val.addShape({
               type: "path"
            }));
            this.set("downcandle", val.addShape({
               type: "path"
            }));
            this.set("wick", val.addShape({
               type: "path"
            }));
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
        upcandle.set(styles.upcandle);
        downcandle.set(styles.downcandle);
        wick.set(styles.wick);
        upcandle.clear();
        downcandle.clear();
        wick.clear();
        for(i = 0; i < len; i = i + 1)
        {
            cx = xcoords[i] + leftPadding;
            left = cx - halfwidth;
            right = cx + halfwidth;
            opencoord = opencoords[i];
            highcoord = highcoords[i];
            lowcoord = lowcoords[i];
            closecoord = closecoords[i];
            up = opencoord > closecoord;
            top = up ? closecoord : opencoord;
            bottom = up ? opencoord : closecoord;
            height = bottom - top;
            candle = up ? upcandle : downcandle;
            candle.drawRect(left, top, width, height);
            wick.moveTo(cx, highcoord);
            wick.lineTo(cx, lowcoord);
        }
        upcandle.end();
        downcandle.end();
        wick.end();
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
        this.get("upcandle").set("visible", visible);
        this.get("downcandle").set("visible", visible);
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
        var upcandle = this.get("upcandle"),
            downcandle = this.get("downcandle"),
            wick = this.get("wick");
        if(upcandle)
        {
            upcandle.destroy();
        }
        if(downcandle)
        {
            downcandle.destroy();
        }
        if(wick)
        {
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
        return this._mergeStyles(styles, CandlestickSeries.superclass._getDefaultStyles());
    }
});
Y.CandlestickSeries = CandlestickSeries;


}, '@VERSION@', {"requires": ["series-range"]});
