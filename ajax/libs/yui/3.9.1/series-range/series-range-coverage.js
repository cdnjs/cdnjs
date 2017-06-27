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
_yuitest_coverage["build/series-range/series-range.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-range/series-range.js",
    code: []
};
_yuitest_coverage["build/series-range/series-range.js"].code=["YUI.add('series-range', function (Y, NAME) {","","/**"," * Provides functionality for creating a range series."," *"," * @module charts"," * @submodule series-range"," */","","/**"," * An abstract class for creating range series instances."," * RangeSeries is used by the following classes:"," * <ul>"," *      <li>{{#crossLink \"CandlestickSeries\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"OHLCSeries\"}}{{/crossLink}}</li>"," *  </ul>"," *"," * @class RangeSeries"," * @extends CartesianSeries"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-range"," */","function RangeSeries()","{","    RangeSeries.superclass.constructor.apply(this, arguments);","}","","RangeSeries.NAME = \"rangeSeries\";","","RangeSeries.ATTRS = {","    /**","     * Read-only attribute indicating the type of series.","     *","     * @attribute type","     * @type String","     * @default range","     */","    type: {","        value: \"range\"","    },","","    /**","     * Values to be used for open, high, low and close keys.","     *","     * @attribute ohlc","     * @type Object","     */","    ohlckeys: {","        valueFn: function() {","            return {","                open: \"open\",","                high: \"high\",","                low: \"low\",","                close: \"close\"","            };","        }","    }","};","","Y.extend(RangeSeries, Y.CartesianSeries, {","    /**","     * Draws the series.","     *","     * @method drawSeries","     * @protected","     */","    drawSeries: function()","    {","        var xcoords = this.get(\"xcoords\"),","            ycoords = this.get(\"ycoords\"),","            styles = this.get(\"styles\"),","            padding = styles.padding,","            len = xcoords.length,","            dataWidth = this.get(\"width\") - (padding.left + padding.right),","            keys = this.get(\"ohlckeys\"),","            opencoords = ycoords[keys.open],","            highcoords = ycoords[keys.high],","            lowcoords = ycoords[keys.low],","            closecoords = ycoords[keys.close],","            width = dataWidth/len,","            halfwidth = width/2;","        this._drawMarkers(xcoords, opencoords, highcoords, lowcoords, closecoords, len, width, halfwidth, styles);","    }","});","","Y.RangeSeries = RangeSeries;","","","","","}, '@VERSION@', {\"requires\": [\"series-cartesian\"]});"];
_yuitest_coverage["build/series-range/series-range.js"].lines = {"1":0,"24":0,"26":0,"29":0,"31":0,"51":0,"61":0,"70":0,"83":0,"87":0};
_yuitest_coverage["build/series-range/series-range.js"].functions = {"RangeSeries:24":0,"valueFn:50":0,"drawSeries:68":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-range/series-range.js"].coveredLines = 10;
_yuitest_coverage["build/series-range/series-range.js"].coveredFunctions = 4;
_yuitest_coverline("build/series-range/series-range.js", 1);
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
_yuitest_coverfunc("build/series-range/series-range.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-range/series-range.js", 24);
function RangeSeries()
{
    _yuitest_coverfunc("build/series-range/series-range.js", "RangeSeries", 24);
_yuitest_coverline("build/series-range/series-range.js", 26);
RangeSeries.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/series-range/series-range.js", 29);
RangeSeries.NAME = "rangeSeries";

_yuitest_coverline("build/series-range/series-range.js", 31);
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
            _yuitest_coverfunc("build/series-range/series-range.js", "valueFn", 50);
_yuitest_coverline("build/series-range/series-range.js", 51);
return {
                open: "open",
                high: "high",
                low: "low",
                close: "close"
            };
        }
    }
};

_yuitest_coverline("build/series-range/series-range.js", 61);
Y.extend(RangeSeries, Y.CartesianSeries, {
    /**
     * Draws the series.
     *
     * @method drawSeries
     * @protected
     */
    drawSeries: function()
    {
        _yuitest_coverfunc("build/series-range/series-range.js", "drawSeries", 68);
_yuitest_coverline("build/series-range/series-range.js", 70);
var xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            styles = this.get("styles"),
            padding = styles.padding,
            len = xcoords.length,
            dataWidth = this.get("width") - (padding.left + padding.right),
            keys = this.get("ohlckeys"),
            opencoords = ycoords[keys.open],
            highcoords = ycoords[keys.high],
            lowcoords = ycoords[keys.low],
            closecoords = ycoords[keys.close],
            width = dataWidth/len,
            halfwidth = width/2;
        _yuitest_coverline("build/series-range/series-range.js", 83);
this._drawMarkers(xcoords, opencoords, highcoords, lowcoords, closecoords, len, width, halfwidth, styles);
    }
});

_yuitest_coverline("build/series-range/series-range.js", 87);
Y.RangeSeries = RangeSeries;




}, '@VERSION@', {"requires": ["series-cartesian"]});
