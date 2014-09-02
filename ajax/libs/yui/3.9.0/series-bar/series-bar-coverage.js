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
_yuitest_coverage["build/series-bar/series-bar.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-bar/series-bar.js",
    code: []
};
_yuitest_coverage["build/series-bar/series-bar.js"].code=["YUI.add('series-bar', function (Y, NAME) {","","/**"," * Provides functionality for creating a bar series."," *"," * @module charts"," * @submodule series-bar"," */","/**"," * The BarSeries class renders bars positioned vertically along a category or time axis. The bars'"," * lengths are proportional to the values they represent along a horizontal axis."," * and the relevant data points."," *"," * @class BarSeries"," * @extends MarkerSeries"," * @uses Histogram"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-bar"," */","Y.BarSeries = Y.Base.create(\"barSeries\", Y.MarkerSeries, [Y.Histogram], {","    /**","     * Helper method for calculating the size of markers.","     *","     * @method _getMarkerDimensions","     * @param {Number} xcoord The x-coordinate representing the data point for the marker.","     * @param {Number} ycoord The y-coordinate representing the data point for the marker.","     * @param {Number} calculatedSize The calculated size for the marker. For a `BarSeries` is it the width. For a `ColumnSeries` it is the height.","     * @param {Number} offset Distance of position offset dictated by other marker series in the same graph.","     * @return Object","     * @private","     */","    _getMarkerDimensions: function(xcoord, ycoord, calculatedSize, offset)","    {","        var config = {","            top: ycoord + offset","        };","        if(xcoord >= this._leftOrigin)","        {","            config.left = this._leftOrigin;","            config.calculatedSize = xcoord - config.left;","        }","        else","        {","            config.left = xcoord;","            config.calculatedSize = this._leftOrigin - xcoord;","        }","        return config;","    },","","    /**","     * Resizes and positions markers based on a mouse interaction.","     *","     * @method updateMarkerState","     * @param {String} type state of the marker","     * @param {Number} i index of the marker","     * @protected","     */","    updateMarkerState: function(type, i)","    {","        if(this._markers && this._markers[i])","        {","            var styles = Y.clone(this.get(\"styles\").marker),","                markerStyles,","                state = this._getState(type),","                xcoords = this.get(\"xcoords\"),","                ycoords = this.get(\"ycoords\"),","                marker = this._markers[i],","                markers,","                seriesCollection = this.get(\"seriesTypeCollection\"),","                seriesLen = seriesCollection.length,","                seriesStyles,","                seriesSize = 0,","                offset = 0,","                renderer,","                n = 0,","                ys = [],","                order = this.get(\"order\"),","                config;","            markerStyles = state == \"off\" || !styles[state] ? styles : styles[state];","            markerStyles.fill.color = this._getItemColor(markerStyles.fill.color, i);","            markerStyles.border.color = this._getItemColor(markerStyles.border.color, i);","            config = this._getMarkerDimensions(xcoords[i], ycoords[i], styles.height, offset);","            markerStyles.width = config.calculatedSize;","            markerStyles.height = Math.min(this._maxSize, markerStyles.height);","            marker.set(markerStyles);","            for(; n < seriesLen; ++n)","            {","                ys[n] = ycoords[i] + seriesSize;","                seriesStyles = seriesCollection[n].get(\"styles\").marker;","                seriesSize += Math.min(this._maxSize, seriesStyles.height);","                if(order > n)","                {","                    offset = seriesSize;","                }","                offset -= seriesSize/2;","            }","            for(n = 0; n < seriesLen; ++n)","            {","                markers = seriesCollection[n].get(\"markers\");","                if(markers)","                {","                    renderer = markers[i];","                    if(renderer && renderer !== undefined)","                    {","                        renderer.set(\"y\", (ys[n] - seriesSize/2));","                    }","                }","            }","        }","    }","}, {","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default bar","         */","        type: {","            value: \"bar\"","        },","","        /**","         * Indicates the direction of the category axis that the bars are plotted against.","         *","         * @attribute direction","         * @type String","         */","        direction: {","            value: \"vertical\"","        }","","        /**","         * Style properties used for drawing markers. This attribute is inherited from `MarkerSeries`. Below are the default values:","         *  <dl>","         *      <dt>fill</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the graph. The color","         *              will be retrieved from the below array:<br/>","         *              `[\"#66007f\", \"#a86f41\", \"#295454\", \"#996ab2\", \"#e8cdb7\", \"#90bdbd\",\"#000000\",\"#c3b8ca\", \"#968373\", \"#678585\"]`","         *              </dd>","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>border</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph. The color","         *              will be retrieved from the below array:<br/>","         *              `[\"#205096\", \"#b38206\", \"#000000\", \"#94001e\", \"#9d6fa0\", \"#e55b00\", \"#5e85c9\", \"#adab9e\", \"#6ac291\", \"#006457\"]`","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>","         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>height</dt><dd>indicates the width of the marker. The default value is 12.</dd>","         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a `mouseover` event. The default","         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,","         *      the default value for `marker.over.fill.color` is equivalent to `marker.fill.color`.</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","","","}, '@VERSION@', {\"requires\": [\"series-marker\", \"series-histogram-base\"]});"];
_yuitest_coverage["build/series-bar/series-bar.js"].lines = {"1":0,"21":0,"35":0,"38":0,"40":0,"41":0,"45":0,"46":0,"48":0,"61":0,"63":0,"80":0,"81":0,"82":0,"83":0,"84":0,"85":0,"86":0,"87":0,"89":0,"90":0,"91":0,"92":0,"94":0,"96":0,"98":0,"100":0,"101":0,"103":0,"104":0,"106":0};
_yuitest_coverage["build/series-bar/series-bar.js"].functions = {"_getMarkerDimensions:33":0,"updateMarkerState:59":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-bar/series-bar.js"].coveredLines = 31;
_yuitest_coverage["build/series-bar/series-bar.js"].coveredFunctions = 3;
_yuitest_coverline("build/series-bar/series-bar.js", 1);
YUI.add('series-bar', function (Y, NAME) {

/**
 * Provides functionality for creating a bar series.
 *
 * @module charts
 * @submodule series-bar
 */
/**
 * The BarSeries class renders bars positioned vertically along a category or time axis. The bars'
 * lengths are proportional to the values they represent along a horizontal axis.
 * and the relevant data points.
 *
 * @class BarSeries
 * @extends MarkerSeries
 * @uses Histogram
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-bar
 */
_yuitest_coverfunc("build/series-bar/series-bar.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-bar/series-bar.js", 21);
Y.BarSeries = Y.Base.create("barSeries", Y.MarkerSeries, [Y.Histogram], {
    /**
     * Helper method for calculating the size of markers.
     *
     * @method _getMarkerDimensions
     * @param {Number} xcoord The x-coordinate representing the data point for the marker.
     * @param {Number} ycoord The y-coordinate representing the data point for the marker.
     * @param {Number} calculatedSize The calculated size for the marker. For a `BarSeries` is it the width. For a `ColumnSeries` it is the height.
     * @param {Number} offset Distance of position offset dictated by other marker series in the same graph.
     * @return Object
     * @private
     */
    _getMarkerDimensions: function(xcoord, ycoord, calculatedSize, offset)
    {
        _yuitest_coverfunc("build/series-bar/series-bar.js", "_getMarkerDimensions", 33);
_yuitest_coverline("build/series-bar/series-bar.js", 35);
var config = {
            top: ycoord + offset
        };
        _yuitest_coverline("build/series-bar/series-bar.js", 38);
if(xcoord >= this._leftOrigin)
        {
            _yuitest_coverline("build/series-bar/series-bar.js", 40);
config.left = this._leftOrigin;
            _yuitest_coverline("build/series-bar/series-bar.js", 41);
config.calculatedSize = xcoord - config.left;
        }
        else
        {
            _yuitest_coverline("build/series-bar/series-bar.js", 45);
config.left = xcoord;
            _yuitest_coverline("build/series-bar/series-bar.js", 46);
config.calculatedSize = this._leftOrigin - xcoord;
        }
        _yuitest_coverline("build/series-bar/series-bar.js", 48);
return config;
    },

    /**
     * Resizes and positions markers based on a mouse interaction.
     *
     * @method updateMarkerState
     * @param {String} type state of the marker
     * @param {Number} i index of the marker
     * @protected
     */
    updateMarkerState: function(type, i)
    {
        _yuitest_coverfunc("build/series-bar/series-bar.js", "updateMarkerState", 59);
_yuitest_coverline("build/series-bar/series-bar.js", 61);
if(this._markers && this._markers[i])
        {
            _yuitest_coverline("build/series-bar/series-bar.js", 63);
var styles = Y.clone(this.get("styles").marker),
                markerStyles,
                state = this._getState(type),
                xcoords = this.get("xcoords"),
                ycoords = this.get("ycoords"),
                marker = this._markers[i],
                markers,
                seriesCollection = this.get("seriesTypeCollection"),
                seriesLen = seriesCollection.length,
                seriesStyles,
                seriesSize = 0,
                offset = 0,
                renderer,
                n = 0,
                ys = [],
                order = this.get("order"),
                config;
            _yuitest_coverline("build/series-bar/series-bar.js", 80);
markerStyles = state == "off" || !styles[state] ? styles : styles[state];
            _yuitest_coverline("build/series-bar/series-bar.js", 81);
markerStyles.fill.color = this._getItemColor(markerStyles.fill.color, i);
            _yuitest_coverline("build/series-bar/series-bar.js", 82);
markerStyles.border.color = this._getItemColor(markerStyles.border.color, i);
            _yuitest_coverline("build/series-bar/series-bar.js", 83);
config = this._getMarkerDimensions(xcoords[i], ycoords[i], styles.height, offset);
            _yuitest_coverline("build/series-bar/series-bar.js", 84);
markerStyles.width = config.calculatedSize;
            _yuitest_coverline("build/series-bar/series-bar.js", 85);
markerStyles.height = Math.min(this._maxSize, markerStyles.height);
            _yuitest_coverline("build/series-bar/series-bar.js", 86);
marker.set(markerStyles);
            _yuitest_coverline("build/series-bar/series-bar.js", 87);
for(; n < seriesLen; ++n)
            {
                _yuitest_coverline("build/series-bar/series-bar.js", 89);
ys[n] = ycoords[i] + seriesSize;
                _yuitest_coverline("build/series-bar/series-bar.js", 90);
seriesStyles = seriesCollection[n].get("styles").marker;
                _yuitest_coverline("build/series-bar/series-bar.js", 91);
seriesSize += Math.min(this._maxSize, seriesStyles.height);
                _yuitest_coverline("build/series-bar/series-bar.js", 92);
if(order > n)
                {
                    _yuitest_coverline("build/series-bar/series-bar.js", 94);
offset = seriesSize;
                }
                _yuitest_coverline("build/series-bar/series-bar.js", 96);
offset -= seriesSize/2;
            }
            _yuitest_coverline("build/series-bar/series-bar.js", 98);
for(n = 0; n < seriesLen; ++n)
            {
                _yuitest_coverline("build/series-bar/series-bar.js", 100);
markers = seriesCollection[n].get("markers");
                _yuitest_coverline("build/series-bar/series-bar.js", 101);
if(markers)
                {
                    _yuitest_coverline("build/series-bar/series-bar.js", 103);
renderer = markers[i];
                    _yuitest_coverline("build/series-bar/series-bar.js", 104);
if(renderer && renderer !== undefined)
                    {
                        _yuitest_coverline("build/series-bar/series-bar.js", 106);
renderer.set("y", (ys[n] - seriesSize/2));
                    }
                }
            }
        }
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default bar
         */
        type: {
            value: "bar"
        },

        /**
         * Indicates the direction of the category axis that the bars are plotted against.
         *
         * @attribute direction
         * @type String
         */
        direction: {
            value: "vertical"
        }

        /**
         * Style properties used for drawing markers. This attribute is inherited from `MarkerSeries`. Below are the default values:
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
         *      <dt>height</dt><dd>indicates the width of the marker. The default value is 12.</dd>
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


}, '@VERSION@', {"requires": ["series-marker", "series-histogram-base"]});
