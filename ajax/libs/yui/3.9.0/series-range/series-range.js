YUI.add('series-range', function (Y, NAME) {

/**
 * Provides functionality for creating a range series.
 *
 * @module charts
 * @submodule series-range
 */

/**
 * An abstract class for creating range series instances.
 * RangeSeries is used by the following classes:
 * <ul>
 *      <li>{{#crossLink "CandlestickSeries"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "OHLCSeries"}}{{/crossLink}}</li>
 *  </ul>
 *
 * @class RangeSeries
 * @extends CartesianSeries 
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-range
 */
function RangeSeries() 
{
    RangeSeries.superclass.constructor.apply(this, arguments);    
}

RangeSeries.NAME = "rangeSeries";

RangeSeries.ATTRS = {
    /**
     * Read-only attribute indicating the type of series.
     *
     * @attribute type
     * @type String
     * @default range
     */
    type: {
        value: "range"
    },

    /**
     * Values to be used for open, high, low and close keys. 
     *
     * @attribute ohlc
     * @type Object
     */    
    ohlckeys: {
        valueFn: function() {
            return {
                open: "open",
                high: "high",
                low: "low",
                close: "close"
            };
        }
    }
};

Y.extend(RangeSeries, Y.CartesianSeries, {
    /**
     * Draws the series.
     *
     * @method drawSeries
     * @protected
     */
    drawSeries: function()
    {
        var xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            styles = this.get("styles"),
            padding = styles.padding,
            i,
            len = xcoords.length,
            dataWidth = this.get("width") - (padding.left + padding.right),
            keys = this.get("ohlckeys"),
            opencoords = ycoords[keys.open],
            highcoords = ycoords[keys.high],
            lowcoords = ycoords[keys.low],
            closecoords = ycoords[keys.close],
            width = dataWidth/len,
            halfwidth = width/2;
        this._drawMarkers(xcoords, opencoords, highcoords, lowcoords, closecoords, len, width, halfwidth, styles);
    }
});

Y.RangeSeries = RangeSeries; 




}, '@VERSION@', {"requires": ["series-cartesian"]});
