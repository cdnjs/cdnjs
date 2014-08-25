/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

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
function OHLCSeries()
{
    OHLCSeries.superclass.constructor.apply(this, arguments);
}

OHLCSeries.NAME = "ohlcSeries";

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
            if(!this.get("rendered")) {
                this.set("rendered", true);
            }
            this.set("upmarker", val.addShape({
               type: "path"
            }));
            this.set("downmarker", val.addShape({
               type: "path"
            }));
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
            up,
            cx,
            i,
            height;
        upmarker.set(styles.upmarker);
        downmarker.set(styles.downmarker);
        upmarker.clear();
        downmarker.clear();
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
            height = lowcoord - highcoord;
            marker = up ? upmarker : downmarker;
            marker.moveTo(left, opencoord);
            marker.lineTo(cx, opencoord);
            marker.moveTo(cx, highcoord);
            marker.lineTo(cx, lowcoord);
            marker.moveTo(cx, closecoord);
            marker.lineTo(right, closecoord);
        }
        upmarker.end();
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
        this.get("upmarker").set("visible", visible);
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
        var upmarker = this.get("upmarker"),
            downmarker = this.get("downmarker");
        if(upmarker)
        {
            upmarker.destroy();
        }
        if(downmarker)
        {
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
        return this._mergeStyles(styles, OHLCSeries.superclass._getDefaultStyles());
    }
});
Y.OHLCSeries = OHLCSeries;


}, '3.15.0', {"requires": ["series-range"]});
