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
_yuitest_coverage["build/series-column/series-column.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-column/series-column.js",
    code: []
};
_yuitest_coverage["build/series-column/series-column.js"].code=["YUI.add('series-column', function (Y, NAME) {","","/**"," * Provides functionality for creating a column series."," *"," * @module charts"," * @submodule series-column"," */","/**"," * The ColumnSeries class renders columns positioned horizontally along a category or time axis. The columns'"," * lengths are proportional to the values they represent along a vertical axis."," * and the relevant data points."," *"," * @class ColumnSeries"," * @extends MarkerSeries"," * @uses Histogram"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-column"," */","Y.ColumnSeries = Y.Base.create(\"columnSeries\", Y.MarkerSeries, [Y.Histogram], {","    /**","     * Helper method for calculating the size of markers.","     *","     * @method _getMarkerDimensions","     * @param {Number} xcoord The x-coordinate representing the data point for the marker.","     * @param {Number} ycoord The y-coordinate representing the data point for the marker.","     * @param {Number} calculatedSize The calculated size for the marker. For a `BarSeries` is it the width. For a `ColumnSeries` it is the height.","     * @param {Number} offset Distance of position offset dictated by other marker series in the same graph.","     * @return Object","     * @private","     */","    _getMarkerDimensions: function(xcoord, ycoord, calculatedSize, offset)","    {","        var config = {","            left: xcoord + offset","        };","        if(this._bottomOrigin >= ycoord)","        {","            config.top = ycoord;","            config.calculatedSize = this._bottomOrigin - config.top;","        }","        else","        {","            config.top = this._bottomOrigin;","            config.calculatedSize = ycoord - this._bottomOrigin;","        }","        return config;","    },","","    /**","     * Resizes and positions markers based on a mouse interaction.","     *","     * @method updateMarkerState","     * @param {String} type state of the marker","     * @param {Number} i index of the marker","     * @protected","     */","    updateMarkerState: function(type, i)","    {","        if(this._markers && this._markers[i])","        {","            var styles = Y.clone(this.get(\"styles\").marker),","                markerStyles,","                state = this._getState(type),","                xcoords = this.get(\"xcoords\"),","                ycoords = this.get(\"ycoords\"),","                marker = this._markers[i],","                markers,","                seriesStyles,","                seriesCollection = this.get(\"seriesTypeCollection\"),","                seriesLen = seriesCollection.length,","                seriesSize = 0,","                offset = 0,","                renderer,","                n = 0,","                xs = [],","                order = this.get(\"order\"),","                config;","            markerStyles = state === \"off\" || !styles[state] ? Y.clone(styles) : Y.clone(styles[state]);","            markerStyles.fill.color = this._getItemColor(markerStyles.fill.color, i);","            markerStyles.border.color = this._getItemColor(markerStyles.border.color, i);","            config = this._getMarkerDimensions(xcoords[i], ycoords[i], styles.width, offset);","            markerStyles.height = config.calculatedSize;","            markerStyles.width = Math.min(this._maxSize, markerStyles.width);","            marker.set(markerStyles);","            for(; n < seriesLen; ++n)","            {","                xs[n] = xcoords[i] + seriesSize;","                seriesStyles = seriesCollection[n].get(\"styles\").marker;","                seriesSize += Math.min(this._maxSize, seriesStyles.width);","                if(order > n)","                {","                    offset = seriesSize;","                }","                offset -= seriesSize/2;","            }","            for(n = 0; n < seriesLen; ++n)","            {","                markers = seriesCollection[n].get(\"markers\");","                if(markers)","                {","                    renderer = markers[i];","                    if(renderer && renderer !== undefined)","                    {","                        renderer.set(\"x\", (xs[n] - seriesSize/2));","                    }","                }","            }","        }","    }","}, {","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @readOnly","         * @default column","         */","        type: {","            value: \"column\"","        }","","        /**","         * Style properties used for drawing markers. This attribute is inherited from `MarkerSeries`. Below are the default values:","         *  <dl>","         *      <dt>fill</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the graph. The color","         *              will be retrieved from the below array:<br/>","         *              `[\"#66007f\", \"#a86f41\", \"#295454\", \"#996ab2\", \"#e8cdb7\", \"#90bdbd\",\"#000000\",\"#c3b8ca\", \"#968373\", \"#678585\"]`","         *              </dd>","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>border</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph. The color","         *              will be retrieved from the below array:<br/>","         *              `[\"#205096\", \"#b38206\", \"#000000\", \"#94001e\", \"#9d6fa0\", \"#e55b00\", \"#5e85c9\", \"#adab9e\", \"#6ac291\", \"#006457\"]`","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>","         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>width</dt><dd>indicates the width of the marker. The default value is 12.</dd>","         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a `mouseover` event. The default","         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,","         *      the default value for `marker.over.fill.color` is equivalent to `marker.fill.color`.</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","","","}, '@VERSION@', {\"requires\": [\"series-marker\", \"series-histogram-base\"]});"];
_yuitest_coverage["build/series-column/series-column.js"].lines = {"1":0,"21":0,"35":0,"38":0,"40":0,"41":0,"45":0,"46":0,"48":0,"61":0,"63":0,"80":0,"81":0,"82":0,"83":0,"84":0,"85":0,"86":0,"87":0,"89":0,"90":0,"91":0,"92":0,"94":0,"96":0,"98":0,"100":0,"101":0,"103":0,"104":0,"106":0};
_yuitest_coverage["build/series-column/series-column.js"].functions = {"_getMarkerDimensions:33":0,"updateMarkerState:59":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-column/series-column.js"].coveredLines = 31;
_yuitest_coverage["build/series-column/series-column.js"].coveredFunctions = 3;
_yuitest_coverline("build/series-column/series-column.js", 1);
YUI.add('series-column', function (Y, NAME) {

/**
 * Provides functionality for creating a column series.
 *
 * @module charts
 * @submodule series-column
 */
/**
 * The ColumnSeries class renders columns positioned horizontally along a category or time axis. The columns'
 * lengths are proportional to the values they represent along a vertical axis.
 * and the relevant data points.
 *
 * @class ColumnSeries
 * @extends MarkerSeries
 * @uses Histogram
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-column
 */
_yuitest_coverfunc("build/series-column/series-column.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-column/series-column.js", 21);
Y.ColumnSeries = Y.Base.create("columnSeries", Y.MarkerSeries, [Y.Histogram], {
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
        _yuitest_coverfunc("build/series-column/series-column.js", "_getMarkerDimensions", 33);
_yuitest_coverline("build/series-column/series-column.js", 35);
var config = {
            left: xcoord + offset
        };
        _yuitest_coverline("build/series-column/series-column.js", 38);
if(this._bottomOrigin >= ycoord)
        {
            _yuitest_coverline("build/series-column/series-column.js", 40);
config.top = ycoord;
            _yuitest_coverline("build/series-column/series-column.js", 41);
config.calculatedSize = this._bottomOrigin - config.top;
        }
        else
        {
            _yuitest_coverline("build/series-column/series-column.js", 45);
config.top = this._bottomOrigin;
            _yuitest_coverline("build/series-column/series-column.js", 46);
config.calculatedSize = ycoord - this._bottomOrigin;
        }
        _yuitest_coverline("build/series-column/series-column.js", 48);
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
        _yuitest_coverfunc("build/series-column/series-column.js", "updateMarkerState", 59);
_yuitest_coverline("build/series-column/series-column.js", 61);
if(this._markers && this._markers[i])
        {
            _yuitest_coverline("build/series-column/series-column.js", 63);
var styles = Y.clone(this.get("styles").marker),
                markerStyles,
                state = this._getState(type),
                xcoords = this.get("xcoords"),
                ycoords = this.get("ycoords"),
                marker = this._markers[i],
                markers,
                seriesStyles,
                seriesCollection = this.get("seriesTypeCollection"),
                seriesLen = seriesCollection.length,
                seriesSize = 0,
                offset = 0,
                renderer,
                n = 0,
                xs = [],
                order = this.get("order"),
                config;
            _yuitest_coverline("build/series-column/series-column.js", 80);
markerStyles = state === "off" || !styles[state] ? Y.clone(styles) : Y.clone(styles[state]);
            _yuitest_coverline("build/series-column/series-column.js", 81);
markerStyles.fill.color = this._getItemColor(markerStyles.fill.color, i);
            _yuitest_coverline("build/series-column/series-column.js", 82);
markerStyles.border.color = this._getItemColor(markerStyles.border.color, i);
            _yuitest_coverline("build/series-column/series-column.js", 83);
config = this._getMarkerDimensions(xcoords[i], ycoords[i], styles.width, offset);
            _yuitest_coverline("build/series-column/series-column.js", 84);
markerStyles.height = config.calculatedSize;
            _yuitest_coverline("build/series-column/series-column.js", 85);
markerStyles.width = Math.min(this._maxSize, markerStyles.width);
            _yuitest_coverline("build/series-column/series-column.js", 86);
marker.set(markerStyles);
            _yuitest_coverline("build/series-column/series-column.js", 87);
for(; n < seriesLen; ++n)
            {
                _yuitest_coverline("build/series-column/series-column.js", 89);
xs[n] = xcoords[i] + seriesSize;
                _yuitest_coverline("build/series-column/series-column.js", 90);
seriesStyles = seriesCollection[n].get("styles").marker;
                _yuitest_coverline("build/series-column/series-column.js", 91);
seriesSize += Math.min(this._maxSize, seriesStyles.width);
                _yuitest_coverline("build/series-column/series-column.js", 92);
if(order > n)
                {
                    _yuitest_coverline("build/series-column/series-column.js", 94);
offset = seriesSize;
                }
                _yuitest_coverline("build/series-column/series-column.js", 96);
offset -= seriesSize/2;
            }
            _yuitest_coverline("build/series-column/series-column.js", 98);
for(n = 0; n < seriesLen; ++n)
            {
                _yuitest_coverline("build/series-column/series-column.js", 100);
markers = seriesCollection[n].get("markers");
                _yuitest_coverline("build/series-column/series-column.js", 101);
if(markers)
                {
                    _yuitest_coverline("build/series-column/series-column.js", 103);
renderer = markers[i];
                    _yuitest_coverline("build/series-column/series-column.js", 104);
if(renderer && renderer !== undefined)
                    {
                        _yuitest_coverline("build/series-column/series-column.js", 106);
renderer.set("x", (xs[n] - seriesSize/2));
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
         * @readOnly
         * @default column
         */
        type: {
            value: "column"
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
         *      <dt>width</dt><dd>indicates the width of the marker. The default value is 12.</dd>
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
