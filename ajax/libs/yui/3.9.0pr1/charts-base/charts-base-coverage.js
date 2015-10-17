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
_yuitest_coverage["build/charts-base/charts-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/charts-base/charts-base.js",
    code: []
};
_yuitest_coverage["build/charts-base/charts-base.js"].code=["YUI.add('charts-base', function (Y, NAME) {","","/**"," * Provides functionality for creating charts."," *"," * @module charts"," * @submodule charts-base"," */","var CONFIG = Y.config,","    WINDOW = CONFIG.win,","    DOCUMENT = CONFIG.doc,","    Y_Lang = Y.Lang,","    IS_STRING = Y_Lang.isString,","    Y_DOM = Y.DOM,","    _getClassName = Y.ClassNameManager.getClassName,","    SERIES_MARKER = _getClassName(\"seriesmarker\");","","/**"," * Gridlines draws gridlines on a Graph."," *"," * @module charts"," * @submodule charts-base"," * @class Gridlines"," * @constructor"," * @extends Base"," * @uses Renderer"," */","Y.Gridlines = Y.Base.create(\"gridlines\", Y.Base, [Y.Renderer], {","    /**","     * Reference to the `Path` element used for drawing Gridlines.","     *","     * @property _path","     * @type Path","     * @private","     */","    _path: null,","","    /**","     * Removes the Gridlines.","     *","     * @method remove","     * @private","     */","    remove: function()","    {","        var path = this._path;","        if(path)","        {","            path.destroy();","        }","    },","","    /**","     * Draws the gridlines","     *","     * @method draw","     * @protected","     */","    draw: function()","    {","        if(this.get(\"axis\") && this.get(\"graph\"))","        {","            this._drawGridlines();","        }","    },","","    /**","     * Algorithm for drawing gridlines","     *","     * @method _drawGridlines","     * @private","     */","    _drawGridlines: function()","    {","        var path,","            axis = this.get(\"axis\"),","            axisPosition = axis.get(\"position\"),","            points,","            i = 0,","            l,","            direction = this.get(\"direction\"),","            graph = this.get(\"graph\"),","            w = graph.get(\"width\"),","            h = graph.get(\"height\"),","            line = this.get(\"styles\").line,","            color = line.color,","            weight = line.weight,","            alpha = line.alpha,","            count = this.get(\"count\"),","            lineFunction = direction == \"vertical\" ? this._verticalLine : this._horizontalLine;","        if(isFinite(w) && isFinite(h) && w > 0 && h > 0)","        {","            if(count && Y.Lang.isNumber(count))","            {","                points = this._getPoints(count, w, h);","            }","            else if(axisPosition != \"none\" && axis && axis.get(\"tickPoints\"))","            {","                points = axis.get(\"tickPoints\");","            }","            else","            {","                points = this._getPoints(axis.get(\"styles\").majorUnit.count, w, h);","            }","            l = points.length;","            path = graph.get(\"gridlines\");","            path.set(\"width\", w);","            path.set(\"height\", h);","            path.set(\"stroke\", {","                weight: weight,","                color: color,","                opacity: alpha","            });","            for(i = 0; i < l; i = i + 1)","            {","                lineFunction(path, points[i], w, h);","            }","            path.end();","        }","    },","","    /**","     * Calculates the coordinates for the gridlines based on a count.","     *","     * @method _getPoints","     * @param {Number} count Number of gridlines","     * @return Array","     * @private","     */","    _getPoints: function(count, w, h)","    {","        var i,","            points = [],","            multiplier,","            divisor = count - 1;","        for(i = 0; i < count; i = i + 1)","        {","            multiplier = i/divisor;","            points[i] = {","                x: w * multiplier,","                y: h * multiplier","            };","        }","        return points;","    },","","    /**","     * Algorithm for horizontal lines.","     *","     * @method _horizontalLine","     * @param {Path} path Reference to path element","     * @param {Object} pt Coordinates corresponding to a major unit of an axis.","     * @param {Number} w Width of the Graph","     * @param {Number} h Height of the Graph","     * @private","     */","    _horizontalLine: function(path, pt, w, h)","    {","        path.moveTo(0, pt.y);","        path.lineTo(w, pt.y);","    },","","    /**","     * Algorithm for vertical lines.","     *","     * @method _verticalLine","     * @param {Path} path Reference to path element","     * @param {Object} pt Coordinates corresponding to a major unit of an axis.","     * @param {Number} w Width of the Graph","     * @param {Number} h Height of the Graph","     * @private","     */","    _verticalLine: function(path, pt, w, h)","    {","        path.moveTo(pt.x, 0);","        path.lineTo(pt.x, h);","    },","","    /**","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     * @protected","     */","    _getDefaultStyles: function()","    {","        var defs = {","            line: {","                color:\"#f0efe9\",","                weight: 1,","                alpha: 1","            }","        };","        return defs;","    }","","},","{","    ATTRS: {","        /**","         * Indicates the direction of the gridline.","         *","         * @attribute direction","         * @type String","         */","        direction: {},","","        /**","         * Indicate the `Axis` in which to bind","         * the gridlines.","         *","         * @attribute axis","         * @type Axis","         */","        axis: {},","","        /**","         * Indicates the `Graph` in which the gridlines","         * are drawn.","         *","         * @attribute graph","         * @type Graph","         */","        graph: {},","","        /**","         * Indicates the number of gridlines to display. If no value is set, gridlines will equal the number of ticks in","         * the corresponding axis.","         *","         * @attribute count","         * @type Number","         */","        count: {}","    }","});","/**"," * Graph manages and contains series instances for a `CartesianChart`"," * instance."," *"," * @module charts"," * @submodule charts-base"," * @class Graph"," * @constructor"," * @extends Widget"," * @uses Renderer"," */","Y.Graph = Y.Base.create(\"graph\", Y.Widget, [Y.Renderer], {","    /**","     * @method bindUI","     * @private","     */","    bindUI: function()","    {","        var bb = this.get(\"boundingBox\");","        bb.setStyle(\"position\", \"absolute\");","        this.after(\"widthChange\", this._sizeChangeHandler);","        this.after(\"heightChange\", this._sizeChangeHandler);","        this.after(\"stylesChange\", this._updateStyles);","        this.after(\"groupMarkersChange\", this._drawSeries);","    },","","    /**","     * @method syncUI","     * @private","     */","    syncUI: function()","    {","        var background,","            cb,","            bg,","            sc = this.get(\"seriesCollection\"),","            series,","            i = 0,","            len = sc ? sc.length : 0,","            hgl = this.get(\"horizontalGridlines\"),","            vgl = this.get(\"verticalGridlines\");","        if(this.get(\"showBackground\"))","        {","            background = this.get(\"background\");","            cb = this.get(\"contentBox\");","            bg = this.get(\"styles\").background;","            bg.stroke = bg.border;","            bg.stroke.opacity = bg.stroke.alpha;","            bg.fill.opacity = bg.fill.alpha;","            bg.width = this.get(\"width\");","            bg.height = this.get(\"height\");","            bg.type = bg.shape;","            background.set(bg);","        }","        for(; i < len; ++i)","        {","            series = sc[i];","            if(series instanceof Y.CartesianSeries)","            {","                series.render();","            }","        }","        if(hgl && hgl instanceof Y.Gridlines)","        {","            hgl.draw();","        }","        if(vgl && vgl instanceof Y.Gridlines)","        {","            vgl.draw();","        }","    },","","    /**","     * Object of arrays containing series mapped to a series type.","     *","     * @property seriesTypes","     * @type Object","     * @private","     */","    seriesTypes: null,","","    /**","     * Returns a series instance based on an index.","     *","     * @method getSeriesByIndex","     * @param {Number} val index of the series","     * @return CartesianSeries","     */","    getSeriesByIndex: function(val)","    {","        var col = this.get(\"seriesCollection\"),","            series;","        if(col && col.length > val)","        {","            series = col[val];","        }","        return series;","    },","","    /**","     * Returns a series instance based on a key value.","     *","     * @method getSeriesByKey","     * @param {String} val key value of the series","     * @return CartesianSeries","     */","    getSeriesByKey: function(val)","    {","        var obj = this._seriesDictionary,","            series;","        if(obj && obj.hasOwnProperty(val))","        {","            series = obj[val];","        }","        return series;","    },","","    /**","     * Adds dispatcher to a `_dispatcher` used to","     * to ensure all series have redrawn before for firing event.","     *","     * @method addDispatcher","     * @param {CartesianSeries} val series instance to add","     * @protected","     */","    addDispatcher: function(val)","    {","        if(!this._dispatchers)","        {","            this._dispatchers = [];","        }","        this._dispatchers.push(val);","    },","","    /**","     * Collection of series to be displayed in the graph.","     *","     * @property _seriesCollection","     * @type Array","     * @private","     */","    _seriesCollection: null,","","    /**","     * Object containing key value pairs of `CartesianSeries` instances.","     *","     * @property _seriesDictionary","     * @type Object","     * @private","     */","    _seriesDictionary: null,","","    /**","     * Parses series instances to be displayed in the graph.","     *","     * @method _parseSeriesCollection","     * @param {Array} Collection of `CartesianSeries` instances or objects container `CartesianSeries` attributes values.","     * @private","     */","    _parseSeriesCollection: function(val)","    {","        if(!val)","        {","            return;","        }","        var len = val.length,","            i = 0,","            series,","            seriesKey;","        this._seriesCollection = [];","        this._seriesDictionary = {};","        this.seriesTypes = [];","        for(; i < len; ++i)","        {","            series = val[i];","            if(!(series instanceof Y.CartesianSeries) && !(series instanceof Y.PieSeries))","            {","                this._createSeries(series);","                continue;","            }","            this._addSeries(series);","        }","        len = this._seriesCollection.length;","        for(i = 0; i < len; ++i)","        {","            series = this.get(\"seriesCollection\")[i];","            seriesKey = series.get(\"direction\") == \"horizontal\" ? \"yKey\" : \"xKey\";","            this._seriesDictionary[series.get(seriesKey)] = series;","        }","    },","","    /**","     * Adds a series to the graph.","     *","     * @method _addSeries","     * @param {CartesianSeries} series Series to add to the graph.","     * @private","     */","    _addSeries: function(series)","    {","        var type = series.get(\"type\"),","            seriesCollection = this.get(\"seriesCollection\"),","            graphSeriesLength = seriesCollection.length,","            seriesTypes = this.seriesTypes,","            typeSeriesCollection;","        if(!series.get(\"graph\"))","        {","            series.set(\"graph\", this);","        }","        seriesCollection.push(series);","        if(!seriesTypes.hasOwnProperty(type))","        {","            this.seriesTypes[type] = [];","        }","        typeSeriesCollection = this.seriesTypes[type];","        series.set(\"graphOrder\", graphSeriesLength);","        series.set(\"order\", typeSeriesCollection.length);","        typeSeriesCollection.push(series);","        series.set(\"seriesTypeCollection\", typeSeriesCollection);","        this.addDispatcher(series);","        series.after(\"drawingComplete\", Y.bind(this._drawingCompleteHandler, this));","        this.fire(\"seriesAdded\", series);","    },","","    /**","     * Creates a `CartesianSeries` instance from an object containing attribute key value pairs. The key value pairs include","     * attributes for the specific series and a type value which defines the type of series to be used.","     *","     * @method createSeries","     * @param {Object} seriesData Series attribute key value pairs.","     * @private","     */","    _createSeries: function(seriesData)","    {","        var type = seriesData.type,","            seriesCollection = this.get(\"seriesCollection\"),","            seriesTypes = this.seriesTypes,","            typeSeriesCollection,","            seriesType,","            series;","            seriesData.graph = this;","        if(!seriesTypes.hasOwnProperty(type))","        {","            seriesTypes[type] = [];","        }","        typeSeriesCollection = seriesTypes[type];","        seriesData.graph = this;","        seriesData.order = typeSeriesCollection.length;","        seriesData.graphOrder = seriesCollection.length;","        seriesType = this._getSeries(seriesData.type);","        series = new seriesType(seriesData);","        this.addDispatcher(series);","        series.after(\"drawingComplete\", Y.bind(this._drawingCompleteHandler, this));","        typeSeriesCollection.push(series);","        seriesCollection.push(series);","        series.set(\"seriesTypeCollection\", typeSeriesCollection);","        if(this.get(\"rendered\"))","        {","            series.render();","        }","    },","","    /**","     * String reference for pre-defined `Series` classes.","     *","     * @property _seriesMap","     * @type Object","     * @private","     */","    _seriesMap: {","        line : Y.LineSeries,","        column : Y.ColumnSeries,","        bar : Y.BarSeries,","        area :  Y.AreaSeries,","        candlestick : Y.CandlestickSeries,","        ohlc : Y.OHLCSeries,","        stackedarea : Y.StackedAreaSeries,","        stackedline : Y.StackedLineSeries,","        stackedcolumn : Y.StackedColumnSeries,","        stackedbar : Y.StackedBarSeries,","        markerseries : Y.MarkerSeries,","        spline : Y.SplineSeries,","        areaspline : Y.AreaSplineSeries,","        stackedspline : Y.StackedSplineSeries,","        stackedareaspline : Y.StackedAreaSplineSeries,","        stackedmarkerseries : Y.StackedMarkerSeries,","        pie : Y.PieSeries,","        combo : Y.ComboSeries,","        stackedcombo : Y.StackedComboSeries,","        combospline : Y.ComboSplineSeries,","        stackedcombospline : Y.StackedComboSplineSeries","    },","","    /**","     * Returns a specific `CartesianSeries` class based on key value from a look up table of a direct reference to a","     * class. When specifying a key value, the following options are available:","     *","     *  <table>","     *      <tr><th>Key Value</th><th>Class</th></tr>","     *      <tr><td>line</td><td>Y.LineSeries</td></tr>","     *      <tr><td>column</td><td>Y.ColumnSeries</td></tr>","     *      <tr><td>bar</td><td>Y.BarSeries</td></tr>","     *      <tr><td>area</td><td>Y.AreaSeries</td></tr>","     *      <tr><td>stackedarea</td><td>Y.StackedAreaSeries</td></tr>","     *      <tr><td>stackedline</td><td>Y.StackedLineSeries</td></tr>","     *      <tr><td>stackedcolumn</td><td>Y.StackedColumnSeries</td></tr>","     *      <tr><td>stackedbar</td><td>Y.StackedBarSeries</td></tr>","     *      <tr><td>markerseries</td><td>Y.MarkerSeries</td></tr>","     *      <tr><td>spline</td><td>Y.SplineSeries</td></tr>","     *      <tr><td>areaspline</td><td>Y.AreaSplineSeries</td></tr>","     *      <tr><td>stackedspline</td><td>Y.StackedSplineSeries</td></tr>","     *      <tr><td>stackedareaspline</td><td>Y.StackedAreaSplineSeries</td></tr>","     *      <tr><td>stackedmarkerseries</td><td>Y.StackedMarkerSeries</td></tr>","     *      <tr><td>pie</td><td>Y.PieSeries</td></tr>","     *      <tr><td>combo</td><td>Y.ComboSeries</td></tr>","     *      <tr><td>stackedcombo</td><td>Y.StackedComboSeries</td></tr>","     *      <tr><td>combospline</td><td>Y.ComboSplineSeries</td></tr>","     *      <tr><td>stackedcombospline</td><td>Y.StackedComboSplineSeries</td></tr>","     *  </table>","     *","     * When referencing a class directly, you can specify any of the above classes or any custom class that extends","     * `CartesianSeries` or `PieSeries`.","     *","     * @method _getSeries","     * @param {String | Object} type Series type.","     * @return CartesianSeries","     * @private","     */","    _getSeries: function(type)","    {","        var seriesClass;","        if(Y_Lang.isString(type))","        {","            seriesClass = this._seriesMap[type];","        }","        else","        {","            seriesClass = type;","        }","        return seriesClass;","    },","","    /**","     * Event handler for marker events.","     *","     * @method _markerEventHandler","     * @param {Object} e Event object.","     * @private","     */","    _markerEventHandler: function(e)","    {","        var type = e.type,","            markerNode = e.currentTarget,","            strArr = markerNode.getAttribute(\"id\").split(\"_\"),","            series = this.getSeriesByIndex(strArr[1]),","            index = strArr[2];","        series.updateMarkerState(type, index);","    },","","    /**","     * Collection of `CartesianSeries` instances to be redrawn.","     *","     * @property _dispatchers","     * @type Array","     * @private","     */","    _dispatchers: null,","","    /**","     * Updates the `Graph` styles.","     *","     * @method _updateStyles","     * @private","     */","    _updateStyles: function()","    {","        var styles = this.get(\"styles\").background,","            border = styles.border;","            border.opacity = border.alpha;","            styles.stroke = border;","            styles.fill.opacity = styles.fill.alpha;","        this.get(\"background\").set(styles);","        this._sizeChangeHandler();","    },","","    /**","     * Event handler for size changes.","     *","     * @method _sizeChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _sizeChangeHandler: function(e)","    {","        var hgl = this.get(\"horizontalGridlines\"),","            vgl = this.get(\"verticalGridlines\"),","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            bg = this.get(\"styles\").background,","            weight,","            background;","        if(bg && bg.border)","        {","            weight = bg.border.weight || 0;","        }","        if(this.get(\"showBackground\"))","        {","            background = this.get(\"background\");","            if(w && h)","            {","                background.set(\"width\", w);","                background.set(\"height\", h);","            }","        }","        if(this._gridlines)","        {","            this._gridlines.clear();","        }","        if(hgl && hgl instanceof Y.Gridlines)","        {","            hgl.draw();","        }","        if(vgl && vgl instanceof Y.Gridlines)","        {","            vgl.draw();","        }","        this._drawSeries();","    },","","    /**","     * Draws each series.","     *","     * @method _drawSeries","     * @private","     */","    _drawSeries: function()","    {","        if(this._drawing)","        {","            this._callLater = true;","            return;","        }","        var sc,","            i,","            len,","            graphic = this.get(\"graphic\");","        graphic.set(\"autoDraw\", false);","        this._callLater = false;","        this._drawing = true;","        sc = this.get(\"seriesCollection\");","        i = 0;","        len = sc ? sc.length : 0;","        for(; i < len; ++i)","        {","            sc[i].draw();","            if((!sc[i].get(\"xcoords\") || !sc[i].get(\"ycoords\")) && !sc[i] instanceof Y.PieSeries)","            {","                this._callLater = true;","                break;","            }","        }","        this._drawing = false;","        if(this._callLater)","        {","            this._drawSeries();","        }","    },","","    /**","     * Event handler for series drawingComplete event.","     *","     * @method _drawingCompleteHandler","     * @param {Object} e Event object.","     * @private","     */","    _drawingCompleteHandler: function(e)","    {","        var series = e.currentTarget,","            graphic,","            index = Y.Array.indexOf(this._dispatchers, series);","        if(index > -1)","        {","            this._dispatchers.splice(index, 1);","        }","        if(this._dispatchers.length < 1)","        {","            graphic = this.get(\"graphic\");","            if(!graphic.get(\"autoDraw\"))","            {","                graphic._redraw();","            }","            this.fire(\"chartRendered\");","        }","    },","","    /**","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     * @protected","     */","    _getDefaultStyles: function()","    {","        var defs = {","            background: {","                shape: \"rect\",","                fill:{","                    color:\"#faf9f2\"","                },","                border: {","                    color:\"#dad8c9\",","                    weight: 1","                }","            }","        };","        return defs;","    },","","    /**","     * Destructor implementation Graph class. Removes all Graphic instances from the widget.","     *","     * @method destructor","     * @protected","     */","    destructor: function()","    {","        if(this._graphic)","        {","            this._graphic.destroy();","            this._graphic = null;","        }","        if(this._background)","        {","            this._background.get(\"graphic\").destroy();","            this._background = null;","        }","        if(this._gridlines)","        {","            this._gridlines.get(\"graphic\").destroy();","            this._gridlines = null;","        }","    }","}, {","    ATTRS: {","        /**","         * The x-coordinate for the graph.","         *","         * @attribute x","         * @type Number","         * @protected","         */","        x: {","            setter: function(val)","            {","                this.get(\"boundingBox\").setStyle(\"left\", val + \"px\");","                return val;","            }","        },","","        /**","         * The y-coordinate for the graph.","         *","         * @attribute y","         * @type Number","         * @protected","         */","        y: {","            setter: function(val)","            {","                this.get(\"boundingBox\").setStyle(\"top\", val + \"px\");","                return val;","            }","        },","","        /**","         * Reference to the chart instance using the graph.","         *","         * @attribute chart","         * @type ChartBase","         * @readOnly","         */","        chart: {","            getter: function() {","                var chart = this._state.chart || this;","                return chart;","            }","        },","","        /**","         * Collection of series. When setting the `seriesCollection` the array can contain a combination of either","         * `CartesianSeries` instances or object literals with properties that will define a series.","         *","         * @attribute seriesCollection","         * @type CartesianSeries","         */","        seriesCollection: {","            getter: function()","            {","                return this._seriesCollection;","            },","","            setter: function(val)","            {","                this._parseSeriesCollection(val);","                return this._seriesCollection;","            }","        },","","        /**","         * Indicates whether the `Graph` has a background.","         *","         * @attribute showBackground","         * @type Boolean","         * @default true","         */","        showBackground: {","            value: true","        },","","        /**","         * Read-only hash lookup for all series on in the `Graph`.","         *","         * @attribute seriesDictionary","         * @type Object","         * @readOnly","         */","        seriesDictionary: {","            readOnly: true,","","            getter: function()","            {","                return this._seriesDictionary;","            }","        },","","        /**","         * Reference to the horizontal `Gridlines` instance.","         *","         * @attribute horizontalGridlines","         * @type Gridlines","         * @default null","         */","        horizontalGridlines: {","            value: null,","","            setter: function(val)","            {","                var cfg,","                    key,","                    gl = this.get(\"horizontalGridlines\");","                if(gl && gl instanceof Y.Gridlines)","                {","                    gl.remove();","                }","                if(val instanceof Y.Gridlines)","                {","                    gl = val;","                    val.set(\"graph\", this);","                    return val;","                }","                else if(val)","                {","                    cfg = {","                        direction: \"horizonal\",","                        graph: this","                    };","                    for(key in val)","                    {","                        if(val.hasOwnProperty(key))","                        {","                            cfg[key] = val[key];","                        }","                    }","                    gl = new Y.Gridlines(cfg);","                    return gl;","                }","            }","        },","","        /**","         * Reference to the vertical `Gridlines` instance.","         *","         * @attribute verticalGridlines","         * @type Gridlines","         * @default null","         */","        verticalGridlines: {","            value: null,","","            setter: function(val)","            {","                var cfg,","                    key,","                    gl = this.get(\"verticalGridlines\");","                if(gl && gl instanceof Y.Gridlines)","                {","                    gl.remove();","                }","                if(val instanceof Y.Gridlines)","                {","                    gl = val;","                    val.set(\"graph\", this);","                    return val;","                }","                else if(val)","                {","                    cfg = {","                        direction: \"vertical\",","                        graph: this","                    };","                    for(key in val)","                    {","                        if(val.hasOwnProperty(key))","                        {","                            cfg[key] = val[key];","                        }","                    }","                    gl = new Y.Gridlines(cfg);","                    return gl;","                }","            }","        },","","        /**","         * Reference to graphic instance used for the background.","         *","         * @attribute background","         * @type Graphic","         * @readOnly","         */","        background: {","            getter: function()","            {","                if(!this._background)","                {","                    this._backgroundGraphic = new Y.Graphic({render:this.get(\"contentBox\")});","                    this._backgroundGraphic.get(\"node\").style.zIndex = 0;","                    this._background = this._backgroundGraphic.addShape({type: \"rect\"});","                }","                return this._background;","            }","        },","","        /**","         * Reference to graphic instance used for gridlines.","         *","         * @attribute gridlines","         * @type Graphic","         * @readOnly","         */","        gridlines: {","            readOnly: true,","","            getter: function()","            {","                if(!this._gridlines)","                {","                    this._gridlinesGraphic = new Y.Graphic({render:this.get(\"contentBox\")});","                    this._gridlinesGraphic.get(\"node\").style.zIndex = 1;","                    this._gridlines = this._gridlinesGraphic.addShape({type: \"path\"});","                }","                return this._gridlines;","            }","        },","","        /**","         * Reference to graphic instance used for series.","         *","         * @attribute graphic","         * @type Graphic","         * @readOnly","         */","        graphic: {","            readOnly: true,","","            getter: function()","            {","                if(!this._graphic)","                {","                    this._graphic = new Y.Graphic({render:this.get(\"contentBox\")});","                    this._graphic.get(\"node\").style.zIndex = 2;","                    this._graphic.set(\"autoDraw\", false);","                }","                return this._graphic;","            }","        },","","        /**","         * Indicates whether or not markers for a series will be grouped and rendered in a single complex shape instance.","         *","         * @attribute groupMarkers","         * @type Boolean","         */","        groupMarkers: {","            value: false","        }","","        /**","         * Style properties used for drawing a background. Below are the default values:","         *  <dl>","         *      <dt>background</dt><dd>An object containing the following values:","         *          <dl>","         *              <dt>fill</dt><dd>Defines the style properties for the fill. Contains the following values:","         *                  <dl>","         *                      <dt>color</dt><dd>Color of the fill. The default value is #faf9f2.</dd>","         *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the background fill.","         *                      The default value is 1.</dd>","         *                  </dl>","         *              </dd>","         *              <dt>border</dt><dd>Defines the style properties for the border. Contains the following values:","         *                  <dl>","         *                      <dt>color</dt><dd>Color of the border. The default value is #dad8c9.</dd>","         *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the background border.","         *                      The default value is 1.</dd>","         *                      <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>","         *                  </dl>","         *              </dd>","         *          </dl>","         *      </dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","/**"," * The ChartBase class is an abstract class used to create charts."," *"," * @class ChartBase"," * @constructor"," * @submodule charts-base"," */","function ChartBase() {}","","ChartBase.ATTRS = {","    /**","     * Data used to generate the chart.","     *","     * @attribute dataProvider","     * @type Array","     */","    dataProvider: {","        lazyAdd: false,","","        valueFn: function()","        {","            var defDataProvider = [];","            if(!this._seriesKeysExplicitlySet)","            {","                this._seriesKeys = this._buildSeriesKeys(defDataProvider);","            }","            return defDataProvider;","        },","","        setter: function(val)","        {","            var dataProvider = this._setDataValues(val);","            if(!this._seriesKeysExplicitlySet)","            {","                this._seriesKeys = this._buildSeriesKeys(dataProvider);","            }","            return dataProvider;","        }","    },","","    /**","     * A collection of keys that map to the series axes. If no keys are set,","     * they will be generated automatically depending on the data structure passed into","     * the chart.","     *","     * @attribute seriesKeys","     * @type Array","     */","    seriesKeys: {","        getter: function()","        {","            return this._seriesKeys;","        },","","        setter: function(val)","        {","            this._seriesKeysExplicitlySet = true;","            this._seriesKeys = val;","            return val;","        }","    },","","    /**","     * Sets the `aria-label` for the chart.","     *","     * @attribute ariaLabel","     * @type String","     */","    ariaLabel: {","        value: \"Chart Application\",","","        setter: function(val)","        {","            var cb = this.get(\"contentBox\");","            if(cb)","            {","                cb.setAttribute(\"aria-label\", val);","            }","            return val;","        }","    },","","    /**","     * Sets the aria description for the chart.","     *","     * @attribute ariaDescription","     * @type String","     */","    ariaDescription: {","        value: \"Use the up and down keys to navigate between series. Use the left and right keys to navigate through items in a series.\",","","        setter: function(val)","        {","            if(this._description)","            {","                this._description.setContent(\"\");","                this._description.appendChild(DOCUMENT.createTextNode(val));","            }","            return val;","        }","    },","","    /**","     * Reference to the default tooltip available for the chart.","     * <p>Contains the following properties:</p>","     *  <dl>","     *      <dt>node</dt><dd>Reference to the actual dom node</dd>","     *      <dt>showEvent</dt><dd>Event that should trigger the tooltip</dd>","     *      <dt>hideEvent</dt><dd>Event that should trigger the removal of a tooltip (can be an event or an array of events)</dd>","     *      <dt>styles</dt><dd>A hash of style properties that will be applied to the tooltip node</dd>","     *      <dt>show</dt><dd>Indicates whether or not to show the tooltip</dd>","     *      <dt>markerEventHandler</dt><dd>Displays and hides tooltip based on marker events</dd>","     *      <dt>planarEventHandler</dt><dd>Displays and hides tooltip based on planar events</dd>","     *      <dt>markerLabelFunction</dt><dd>Reference to the function used to format a marker event triggered tooltip's text.","     *      The method contains the following arguments:","     *  <dl>","     *      <dt>categoryItem</dt><dd>An object containing the following:","     *  <dl>","     *      <dt>axis</dt><dd>The axis to which the category is bound.</dd>","     *      <dt>displayName</dt><dd>The display name set to the category (defaults to key if not provided).</dd>","     *      <dt>key</dt><dd>The key of the category.</dd>","     *      <dt>value</dt><dd>The value of the category.</dd>","     *  </dl>","     *  </dd>","     *  <dt>valueItem</dt><dd>An object containing the following:","     *      <dl>","     *          <dt>axis</dt><dd>The axis to which the item's series is bound.</dd>","     *          <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>","     *          <dt>key</dt><dd>The key for the series.</dd>","     *          <dt>value</dt><dd>The value for the series item.</dd>","     *      </dl>","     *  </dd>","     *  <dt>itemIndex</dt><dd>The index of the item within the series.</dd>","     *  <dt>series</dt><dd> The `CartesianSeries` instance of the item.</dd>","     *  <dt>seriesIndex</dt><dd>The index of the series in the `seriesCollection`.</dd>","     *  </dl>","     *  The method returns an `HTMLElement` which is written into the DOM using `appendChild`. If you override this method and choose","     *  to return an html string, you will also need to override the tooltip's `setTextFunction` method to accept an html string.","     *  </dd>","     *  <dt>planarLabelFunction</dt><dd>Reference to the function used to format a planar event triggered tooltip's text","     *  <dl>","     *      <dt>categoryAxis</dt><dd> `CategoryAxis` Reference to the categoryAxis of the chart.","     *      <dt>valueItems</dt><dd>Array of objects for each series that has a data point in the coordinate plane of the event. Each","     *      object contains the following data:","     *  <dl>","     *      <dt>axis</dt><dd>The value axis of the series.</dd>","     *      <dt>key</dt><dd>The key for the series.</dd>","     *      <dt>value</dt><dd>The value for the series item.</dd>","     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>","     *  </dl>","     *  </dd>","     *      <dt>index</dt><dd>The index of the item within its series.</dd>","     *      <dt>seriesArray</dt><dd>Array of series instances for each value item.</dd>","     *      <dt>seriesIndex</dt><dd>The index of the series in the `seriesCollection`.</dd>","     *  </dl>","     *  </dd>","     *  </dl>","     *  The method returns an `HTMLElement` which is written into the DOM using `appendChild`. If you override this method and choose","     *  to return an html string, you will also need to override the tooltip's `setTextFunction` method to accept an html string.","     *  </dd>","     *  <dt>setTextFunction</dt><dd>Method that writes content returned from `planarLabelFunction` or `markerLabelFunction` into the","     *  the tooltip node. Has the following signature:","     *  <dl>","     *      <dt>label</dt><dd>The `HTMLElement` that the content is to be added.</dd>","     *      <dt>val</dt><dd>The content to be rendered into tooltip. This can be a `String` or `HTMLElement`. If an HTML string is used,","     *      it will be rendered as a string.</dd>","     *  </dl>","     *  </dd>","     *  </dl>","     * @attribute tooltip","     * @type Object","     */","    tooltip: {","        valueFn: \"_getTooltip\",","","        setter: function(val)","        {","            return this._updateTooltip(val);","        }","    },","","    /**","     * The key value used for the chart's category axis.","     *","     * @attribute categoryKey","     * @type String","     * @default category","     */","    categoryKey: {","        value: \"category\"","    },","","    /**","     * Indicates the type of axis to use for the category axis.","     *","     *  <dl>","     *      <dt>category</dt><dd>Specifies a `CategoryAxis`.</dd>","     *      <dt>time</dt><dd>Specifies a `TimeAxis</dd>","     *  </dl>","     *","     * @attribute categoryType","     * @type String","     * @default category","     */","    categoryType:{","        value:\"category\"","    },","","    /**","     * Indicates the the type of interactions that will fire events.","     *","     *  <dl>","     *      <dt>marker</dt><dd>Events will be broadcasted when the mouse interacts with individual markers.</dd>","     *      <dt>planar</dt><dd>Events will be broadcasted when the mouse intersects the plane of any markers on the chart.</dd>","     *      <dt>none</dt><dd>No events will be broadcasted.</dd>","     *  </dl>","     *","     * @attribute interactionType","     * @type String","     * @default marker","     */","    interactionType: {","        value: \"marker\"","    },","","    /**","     * Reference to all the axes in the chart.","     *","     * @attribute axesCollection","     * @type Array","     */","    axesCollection: {},","","    /**","     * Reference to graph instance.","     *","     * @attribute graph","     * @type Graph","     */","    graph: {","        valueFn: \"_getGraph\"","    },","","    /**","     * Indicates whether or not markers for a series will be grouped and rendered in a single complex shape instance.","     *","     * @attribute groupMarkers","     * @type Boolean","     */","    groupMarkers: {","        value: false","    }","};","","ChartBase.prototype = {","    /**","     * Handles groupMarkers change event.","     *","     * @method _groupMarkersChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _groupMarkersChangeHandler: function(e)","    {","        var graph = this.get(\"graph\"),","            useGroupMarkers = e.newVal;","        if(graph)","        {","            graph.set(\"groupMarkers\", useGroupMarkers);","        }","    },","","    /**","     * Handler for itemRendered event.","     *","     * @method _itemRendered","     * @param {Object} e Event object.","     * @private","     */","    _itemRendered: function(e)","    {","        this._itemRenderQueue = this._itemRenderQueue.splice(1 + Y.Array.indexOf(this._itemRenderQueue, e.currentTarget), 1);","        if(this._itemRenderQueue.length < 1)","        {","            this._redraw();","        }","    },","","    /**","     * Default value function for the `Graph` attribute.","     *","     * @method _getGraph","     * @return Graph","     * @private","     */","    _getGraph: function()","    {","        var graph = new Y.Graph({","            chart:this,","            groupMarkers: this.get(\"groupMarkers\")","        });","        graph.after(\"chartRendered\", Y.bind(function(e) {","            this.fire(\"chartRendered\");","        }, this));","        return graph;","    },","","    /**","     * Returns a series instance by index or key value.","     *","     * @method getSeries","     * @param val","     * @return CartesianSeries","     */","    getSeries: function(val)","    {","        var series = null,","            graph = this.get(\"graph\");","        if(graph)","        {","            if(Y_Lang.isNumber(val))","            {","                series = graph.getSeriesByIndex(val);","            }","            else","            {","                series = graph.getSeriesByKey(val);","            }","        }","        return series;","    },","","    /**","     * Returns an `Axis` instance by key reference. If the axis was explicitly set through the `axes` attribute,","     * the key will be the same as the key used in the `axes` object. For default axes, the key for","     * the category axis is the value of the `categoryKey` (`category`). For the value axis, the default","     * key is `values`.","     *","     * @method getAxisByKey","     * @param {String} val Key reference used to look up the axis.","     * @return Axis","     */","    getAxisByKey: function(val)","    {","        var axis,","            axes = this.get(\"axes\");","        if(axes && axes.hasOwnProperty(val))","        {","            axis = axes[val];","        }","        return axis;","    },","","    /**","     * Returns the category axis for the chart.","     *","     * @method getCategoryAxis","     * @return Axis","     */","    getCategoryAxis: function()","    {","        var axis,","            key = this.get(\"categoryKey\"),","            axes = this.get(\"axes\");","        if(axes.hasOwnProperty(key))","        {","            axis = axes[key];","        }","        return axis;","    },","","    /**","     * Default direction of the chart.","     *","     * @property _direction","     * @type String","     * @default horizontal","     * @private","     */","    _direction: \"horizontal\",","","    /**","     * Storage for the `dataProvider` attribute.","     *","     * @property _dataProvider","     * @type Array","     * @private","     */","    _dataProvider: null,","","    /**","     * Setter method for `dataProvider` attribute.","     *","     * @method _setDataValues","     * @param {Array} val Array to be set as `dataProvider`.","     * @return Array","     * @private","     */","    _setDataValues: function(val)","    {","        if(Y_Lang.isArray(val[0]))","        {","            var hash,","                dp = [],","                cats = val[0],","                i = 0,","                l = cats.length,","                n,","                sl = val.length;","            for(; i < l; ++i)","            {","                hash = {category:cats[i]};","                for(n = 1; n < sl; ++n)","                {","                    hash[\"series\" + n] = val[n][i];","                }","                dp[i] = hash;","            }","            return dp;","        }","        return val;","    },","","    /**","     * Storage for `seriesCollection` attribute.","     *","     * @property _seriesCollection","     * @type Array","     * @private","     */","    _seriesCollection: null,","","    /**","     * Setter method for `seriesCollection` attribute.","     *","     * @property _setSeriesCollection","     * @param {Array} val Array of either `CartesianSeries` instances or objects containing series attribute key value pairs.","     * @private","     */","    _setSeriesCollection: function(val)","    {","        this._seriesCollection = val;","    },","    /**","     * Helper method that returns the axis class that a key references.","     *","     * @method _getAxisClass","     * @param {String} t The type of axis.","     * @return Axis","     * @private","     */","    _getAxisClass: function(t)","    {","        return this._axisClass[t];","    },","","    /**","     * Key value pairs of axis types.","     *","     * @property _axisClass","     * @type Object","     * @private","     */","    _axisClass: {","        stacked: Y.StackedAxis,","        numeric: Y.NumericAxis,","        category: Y.CategoryAxis,","        time: Y.TimeAxis","    },","","    /**","     * Collection of axes.","     *","     * @property _axes","     * @type Array","     * @private","     */","    _axes: null,","","    /**","     * @method initializer","     * @private","     */","    initializer: function()","    {","        this._itemRenderQueue = [];","        this._seriesIndex = -1;","        this._itemIndex = -1;","        this.after(\"dataProviderChange\", this._dataProviderChangeHandler);","    },","","    /**","     * @method renderUI","     * @private","     */","    renderUI: function()","    {","        var tt = this.get(\"tooltip\"),","            bb = this.get(\"boundingBox\"),","            cb = this.get(\"contentBox\");","        //move the position = absolute logic to a class file","        bb.setStyle(\"position\", \"absolute\");","        cb.setStyle(\"position\", \"absolute\");","        this._addAxes();","        this._addSeries();","        if(tt && tt.show)","        {","            this._addTooltip();","        }","        this._setAriaElements(bb, cb);","    },","","    /**","     * Creates an aria `live-region`, `aria-label` and `aria-describedby` for the Chart.","     *","     * @method _setAriaElements","     * @param {Node} cb Reference to the Chart's `contentBox` attribute.","     * @private","     */","    _setAriaElements: function(bb, cb)","    {","        var description = this._getAriaOffscreenNode(),","            id = this.get(\"id\") + \"_description\",","            liveRegion = this._getAriaOffscreenNode();","        cb.set(\"tabIndex\", 0);","        cb.set(\"role\", \"img\");","        cb.setAttribute(\"aria-label\", this.get(\"ariaLabel\"));","        cb.setAttribute(\"aria-describedby\", id);","        description.set(\"id\", id);","        description.set(\"tabIndex\", -1);","        description.appendChild(DOCUMENT.createTextNode(this.get(\"ariaDescription\")));","        liveRegion.set(\"id\", \"live-region\");","        liveRegion.set(\"aria-live\", \"polite\");","        liveRegion.set(\"aria-atomic\", \"true\");","        liveRegion.set(\"role\", \"status\");","        bb.setAttribute(\"role\", \"application\");","        bb.appendChild(description);","        bb.appendChild(liveRegion);","        this._description = description;","        this._liveRegion = liveRegion;","    },","","    /**","     * Sets a node offscreen for use as aria-description or aria-live-regin.","     *","     * @method _setOffscreen","     * @return Node","     * @private","     */","    _getAriaOffscreenNode: function()","    {","        var node = Y.Node.create(\"<div></div>\"),","            ie = Y.UA.ie,","            clipRect = (ie && ie < 8) ? \"rect(1px 1px 1px 1px)\" : \"rect(1px, 1px, 1px, 1px)\";","        node.setStyle(\"position\", \"absolute\");","        node.setStyle(\"height\", \"1px\");","        node.setStyle(\"width\", \"1px\");","        node.setStyle(\"overflow\", \"hidden\");","        node.setStyle(\"clip\", clipRect);","        return node;","    },","","    /**","     * @method syncUI","     * @private","     */","    syncUI: function()","    {","        this._redraw();","    },","","    /**","     * @method bindUI","     * @private","     */","    bindUI: function()","    {","        this.after(\"tooltipChange\", Y.bind(this._tooltipChangeHandler, this));","        this.after(\"widthChange\", this._sizeChanged);","        this.after(\"heightChange\", this._sizeChanged);","        this.after(\"groupMarkersChange\", this._groupMarkersChangeHandler);","        var tt = this.get(\"tooltip\"),","            hideEvent = \"mouseout\",","            showEvent = \"mouseover\",","            cb = this.get(\"contentBox\"),","            interactionType = this.get(\"interactionType\"),","            i = 0,","            len,","            markerClassName = \".\" + SERIES_MARKER,","            isTouch = ((WINDOW && (\"ontouchstart\" in WINDOW)) && !(Y.UA.chrome && Y.UA.chrome < 6));","        Y.on(\"keydown\", Y.bind(function(e) {","            var key = e.keyCode,","                numKey = parseFloat(key),","                msg;","            if(numKey > 36 && numKey < 41)","            {","                e.halt();","                msg = this._getAriaMessage(numKey);","                this._liveRegion.setContent(\"\");","                this._liveRegion.appendChild(DOCUMENT.createTextNode(msg));","            }","        }, this), this.get(\"contentBox\"));","        if(interactionType == \"marker\")","        {","            //if touch capabilities, toggle tooltip on touchend. otherwise, the tooltip attribute's hideEvent/showEvent types.","            hideEvent = tt.hideEvent;","            showEvent = tt.showEvent;","            if(isTouch)","            {","                Y.delegate(\"touchend\", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);","                //hide active tooltip if the chart is touched","                Y.on(\"touchend\", Y.bind(function(e) {","                    //only halt the event if it originated from the chart","                    if(cb.contains(e.target))","                    {","                        e.halt(true);","                    }","                    if(this._activeMarker)","                    {","                        this._activeMarker = null;","                        this.hideTooltip(e);","                    }","                }, this));","            }","            else","            {","                Y.delegate(\"mouseenter\", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);","                Y.delegate(\"mousedown\", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);","                Y.delegate(\"mouseup\", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);","                Y.delegate(\"mouseleave\", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);","                Y.delegate(\"click\", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);","                Y.delegate(\"mousemove\", Y.bind(this._positionTooltip, this), cb, markerClassName);","            }","        }","        else if(interactionType == \"planar\")","        {","            if(isTouch)","            {","                this._overlay.on(\"touchend\", Y.bind(this._planarEventDispatcher, this));","            }","            else","            {","                this._overlay.on(\"mousemove\", Y.bind(this._planarEventDispatcher, this));","                this.on(\"mouseout\", this.hideTooltip);","            }","        }","        if(tt)","        {","            this.on(\"markerEvent:touchend\", Y.bind(function(e) {","                var marker = e.series.get(\"markers\")[e.index];","                if(this._activeMarker && marker === this._activeMarker)","                {","                    this._activeMarker = null;","                    this.hideTooltip(e);","                }","                else","                {","","                    this._activeMarker = marker;","                    tt.markerEventHandler.apply(this, [e]);","                }","            }, this));","            if(hideEvent && showEvent && hideEvent == showEvent)","            {","                this.on(interactionType + \"Event:\" + hideEvent, this.toggleTooltip);","            }","            else","            {","                if(showEvent)","                {","                    this.on(interactionType + \"Event:\" + showEvent, tt[interactionType + \"EventHandler\"]);","                }","                if(hideEvent)","                {","                    if(Y_Lang.isArray(hideEvent))","                    {","                        len = hideEvent.length;","                        for(; i < len; ++i)","                        {","                            this.on(interactionType + \"Event:\" + hideEvent[i], this.hideTooltip);","                        }","                    }","                    this.on(interactionType + \"Event:\" + hideEvent, this.hideTooltip);","                }","            }","        }","    },","","    /**","     * Event handler for marker events.","     *","     * @method _markerEventDispatcher","     * @param {Object} e Event object.","     * @private","     */","    _markerEventDispatcher: function(e)","    {","        var type = e.type,","            cb = this.get(\"contentBox\"),","            markerNode = e.currentTarget,","            strArr = markerNode.getAttribute(\"id\").split(\"_\"),","            index = strArr.pop(),","            seriesIndex = strArr.pop(),","            series = this.getSeries(parseInt(seriesIndex, 10)),","            items = this.getSeriesItems(series, index),","            isTouch = e && e.hasOwnProperty(\"changedTouches\"),","            pageX = isTouch ? e.changedTouches[0].pageX : e.pageX,","            pageY = isTouch ? e.changedTouches[0].pageY : e.pageY,","            x = pageX - cb.getX(),","            y = pageY - cb.getY();","        if(type == \"mouseenter\")","        {","            type = \"mouseover\";","        }","        else if(type == \"mouseleave\")","        {","            type = \"mouseout\";","        }","        series.updateMarkerState(type, index);","        e.halt();","        /**","         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mouseover event.","         *","         *","         * @event markerEvent:mouseover","         * @preventable false","         * @param {EventFacade} e Event facade with the following additional","         *   properties:","         *  <dl>","         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>","         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>","         *      <dt>node</dt><dd>The dom node of the marker.</dd>","         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>","         *      <dt>index</dt><dd>Index of the marker in the series.</dd>","         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>","         *  </dl>","         */","        /**","         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mouseout event.","         *","         * @event markerEvent:mouseout","         * @preventable false","         * @param {EventFacade} e Event facade with the following additional","         *   properties:","         *  <dl>","         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>","         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>","         *      <dt>node</dt><dd>The dom node of the marker.</dd>","         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>","         *      <dt>index</dt><dd>Index of the marker in the series.</dd>","         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>","         *  </dl>","         */","        /**","         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mousedown event.","         *","         * @event markerEvent:mousedown","         * @preventable false","         * @param {EventFacade} e Event facade with the following additional","         *   properties:","         *  <dl>","         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>","         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>","         *      <dt>node</dt><dd>The dom node of the marker.</dd>","         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>","         *      <dt>index</dt><dd>Index of the marker in the series.</dd>","         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>","         *  </dl>","         */","        /**","         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mouseup event.","         *","         * @event markerEvent:mouseup","         * @preventable false","         * @param {EventFacade} e Event facade with the following additional","         *   properties:","         *  <dl>","         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>","         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>","         *      <dt>node</dt><dd>The dom node of the marker.</dd>","         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>","         *      <dt>index</dt><dd>Index of the marker in the series.</dd>","         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>","         *  </dl>","         */","        /**","         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a click event.","         *","         * @event markerEvent:click","         * @preventable false","         * @param {EventFacade} e Event facade with the following additional","         *   properties:","         *  <dl>","         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>","         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>","         *      <dt>node</dt><dd>The dom node of the marker.</dd>","         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>pageX</dt><dd>The x location of the event on the page (including scroll)</dd>","         *      <dt>pageY</dt><dd>The y location of the event on the page (including scroll)</dd>","         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>","         *      <dt>index</dt><dd>Index of the marker in the series.</dd>","         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>","         *      <dt>originEvent</dt><dd>Underlying dom event.</dd>","         *  </dl>","         */","        this.fire(\"markerEvent:\" + type, {","            originEvent: e,","            pageX:pageX,","            pageY:pageY,","            categoryItem:items.category,","            valueItem:items.value,","            node:markerNode,","            x:x,","            y:y,","            series:series,","            index:index,","            seriesIndex:seriesIndex","        });","    },","","    /**","     * Event handler for dataProviderChange.","     *","     * @method _dataProviderChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _dataProviderChangeHandler: function(e)","    {","        var dataProvider = e.newVal,","            axes,","            i,","            axis;","        this._seriesIndex = -1;","        this._itemIndex = -1;","        if(this instanceof Y.CartesianChart)","        {","            this.set(\"axes\", this.get(\"axes\"));","            this.set(\"seriesCollection\", this.get(\"seriesCollection\"));","        }","        axes = this.get(\"axes\");","        if(axes)","        {","            for(i in axes)","            {","                if(axes.hasOwnProperty(i))","                {","                    axis = axes[i];","                    if(axis instanceof Y.Axis)","                    {","                        if(axis.get(\"position\") != \"none\")","                        {","                            this._addToAxesRenderQueue(axis);","                        }","                        axis.set(\"dataProvider\", dataProvider);","                    }","                }","            }","        }","    },","","    /**","     * Event listener for toggling the tooltip. If a tooltip is visible, hide it. If not, it","     * will create and show a tooltip based on the event object.","     *","     * @method toggleTooltip","     * @param {Object} e Event object.","     */","    toggleTooltip: function(e)","    {","        var tt = this.get(\"tooltip\");","        if(tt.visible)","        {","            this.hideTooltip();","        }","        else","        {","            tt.markerEventHandler.apply(this, [e]);","        }","    },","","    /**","     * Shows a tooltip","     *","     * @method _showTooltip","     * @param {String} msg Message to dispaly in the tooltip.","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @private","     */","    _showTooltip: function(msg, x, y)","    {","        var tt = this.get(\"tooltip\"),","            node = tt.node;","        if(msg)","        {","            tt.visible = true;","            tt.setTextFunction(node, msg);","            node.setStyle(\"top\", y + \"px\");","            node.setStyle(\"left\", x + \"px\");","            node.setStyle(\"visibility\", \"visible\");","        }","    },","","    /**","     * Positions the tooltip","     *","     * @method _positionTooltip","     * @param {Object} e Event object.","     * @private","     */","    _positionTooltip: function(e)","    {","        var tt = this.get(\"tooltip\"),","            node = tt.node,","            cb = this.get(\"contentBox\"),","            x = (e.pageX + 10) - cb.getX(),","            y = (e.pageY + 10) - cb.getY();","        if(node)","        {","            node.setStyle(\"left\", x + \"px\");","            node.setStyle(\"top\", y + \"px\");","        }","    },","","    /**","     * Hides the default tooltip","     *","     * @method hideTooltip","     */","    hideTooltip: function()","    {","        var tt = this.get(\"tooltip\"),","            node = tt.node;","        tt.visible = false;","        node.set(\"innerHTML\", \"\");","        node.setStyle(\"left\", -10000);","        node.setStyle(\"top\", -10000);","        node.setStyle(\"visibility\", \"hidden\");","    },","","    /**","     * Adds a tooltip to the dom.","     *","     * @method _addTooltip","     * @private","     */","    _addTooltip: function()","    {","        var tt = this.get(\"tooltip\"),","            id = this.get(\"id\") + \"_tooltip\",","            cb = this.get(\"contentBox\"),","            oldNode = DOCUMENT.getElementById(id);","        if(oldNode)","        {","            cb.removeChild(oldNode);","        }","        tt.node.set(\"id\", id);","        tt.node.setStyle(\"visibility\", \"hidden\");","        cb.appendChild(tt.node);","    },","","    /**","     * Updates the tooltip attribute.","     *","     * @method _updateTooltip","     * @param {Object} val Object containing properties for the tooltip.","     * @return Object","     * @private","     */","    _updateTooltip: function(val)","    {","        var tt = this.get(\"tooltip\") || this._getTooltip(),","            i,","            styles,","            node,","            props = {","                markerLabelFunction:\"markerLabelFunction\",","                planarLabelFunction:\"planarLabelFunction\",","                setTextFunction:\"setTextFunction\",","                showEvent:\"showEvent\",","                hideEvent:\"hideEvent\",","                markerEventHandler:\"markerEventHandler\",","                planarEventHandler:\"planarEventHandler\",","                show:\"show\"","            };","        if(Y_Lang.isObject(val))","        {","            styles = val.styles;","            node = Y.one(val.node) || tt.node;","            if(styles)","            {","                for(i in styles)","                {","                    if(styles.hasOwnProperty(i))","                    {","                        node.setStyle(i, styles[i]);","                    }","                }","            }","            for(i in props)","            {","                if(val.hasOwnProperty(i))","                {","                    tt[i] = val[i];","                }","            }","            tt.node = node;","        }","        return tt;","    },","","    /**","     * Default getter for `tooltip` attribute.","     *","     * @method _getTooltip","     * @return Object","     * @private","     */","    _getTooltip: function()","    {","        var node = DOCUMENT.createElement(\"div\"),","            tooltipClass = _getClassName(\"chart-tooltip\"),","            tt = {","                setTextFunction: this._setText,","                markerLabelFunction: this._tooltipLabelFunction,","                planarLabelFunction: this._planarLabelFunction,","                show: true,","                hideEvent: \"mouseout\",","                showEvent: \"mouseover\",","                markerEventHandler: function(e)","                {","                    var tt = this.get(\"tooltip\"),","                    msg = tt.markerLabelFunction.apply(this, [e.categoryItem, e.valueItem, e.index, e.series, e.seriesIndex]);","                    this._showTooltip(msg, e.x + 10, e.y + 10);","                },","                planarEventHandler: function(e)","                {","                    var tt = this.get(\"tooltip\"),","                        msg ,","                        categoryAxis = this.get(\"categoryAxis\");","                    msg = tt.planarLabelFunction.apply(this, [categoryAxis, e.valueItem, e.index, e.items, e.seriesIndex]);","                    this._showTooltip(msg, e.x + 10, e.y + 10);","                }","            };","        node = Y.one(node);","        node.set(\"id\", this.get(\"id\") + \"_tooltip\");","        node.setStyle(\"fontSize\", \"85%\");","        node.setStyle(\"opacity\", \"0.83\");","        node.setStyle(\"position\", \"absolute\");","        node.setStyle(\"paddingTop\", \"2px\");","        node.setStyle(\"paddingRight\", \"5px\");","        node.setStyle(\"paddingBottom\", \"4px\");","        node.setStyle(\"paddingLeft\", \"2px\");","        node.setStyle(\"backgroundColor\", \"#fff\");","        node.setStyle(\"border\", \"1px solid #dbdccc\");","        node.setStyle(\"pointerEvents\", \"none\");","        node.setStyle(\"zIndex\", 3);","        node.setStyle(\"whiteSpace\", \"noWrap\");","        node.setStyle(\"visibility\", \"hidden\");","        node.addClass(tooltipClass);","        tt.node = Y.one(node);","        return tt;","    },","","    /**","     * Formats tooltip text when `interactionType` is `planar`.","     *","     * @method _planarLabelFunction","     * @param {Axis} categoryAxis Reference to the categoryAxis of the chart.","     * @param {Array} valueItems Array of objects for each series that has a data point in the coordinate plane of the event.","     * Each object contains the following data:","     *  <dl>","     *      <dt>axis</dt><dd>The value axis of the series.</dd>","     *      <dt>key</dt><dd>The key for the series.</dd>","     *      <dt>value</dt><dd>The value for the series item.</dd>","     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>","     *  </dl>","     *  @param {Number} index The index of the item within its series.","     *  @param {Array} seriesArray Array of series instances for each value item.","     *  @param {Number} seriesIndex The index of the series in the `seriesCollection`.","     *  @return {String | HTML}","     * @private","     */","    _planarLabelFunction: function(categoryAxis, valueItems, index, seriesArray, seriesIndex)","    {","        var msg = DOCUMENT.createElement(\"div\"),","            valueItem,","            i = 0,","            len = seriesArray.length,","            axis,","            categoryValue,","            seriesValue,","            series;","        if(categoryAxis)","        {","            categoryValue = categoryAxis.get(\"labelFunction\").apply(this, [categoryAxis.getKeyValueAt(this.get(\"categoryKey\"), index), categoryAxis.get(\"labelFormat\")]);","            if(!Y_Lang.isObject(categoryValue))","            {","                categoryValue = DOCUMENT.createTextNode(categoryValue);","            }","            msg.appendChild(categoryValue);","        }","","        for(; i < len; ++i)","        {","            series = seriesArray[i];","            if(series.get(\"visible\"))","            {","                valueItem = valueItems[i];","                axis = valueItem.axis;","                seriesValue =  axis.get(\"labelFunction\").apply(this, [axis.getKeyValueAt(valueItem.key, index), axis.get(\"labelFormat\")]);","                msg.appendChild(DOCUMENT.createElement(\"br\"));","                msg.appendChild(DOCUMENT.createTextNode(valueItem.displayName));","                msg.appendChild(DOCUMENT.createTextNode(\": \"));","                if(!Y_Lang.isObject(seriesValue))","                {","                    seriesValue = DOCUMENT.createTextNode(seriesValue);","                }","                msg.appendChild(seriesValue);","            }","        }","        return msg;","    },","","    /**","     * Formats tooltip text when `interactionType` is `marker`.","     *","     * @method _tooltipLabelFunction","     * @param {Object} categoryItem An object containing the following:","     *  <dl>","     *      <dt>axis</dt><dd>The axis to which the category is bound.</dd>","     *      <dt>displayName</dt><dd>The display name set to the category (defaults to key if not provided)</dd>","     *      <dt>key</dt><dd>The key of the category.</dd>","     *      <dt>value</dt><dd>The value of the category</dd>","     *  </dl>","     * @param {Object} valueItem An object containing the following:","     *  <dl>","     *      <dt>axis</dt><dd>The axis to which the item's series is bound.</dd>","     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>","     *      <dt>key</dt><dd>The key for the series.</dd>","     *      <dt>value</dt><dd>The value for the series item.</dd>","     *  </dl>","     * @param {Number} itemIndex The index of the item within the series.","     * @param {CartesianSeries} series The `CartesianSeries` instance of the item.","     * @param {Number} seriesIndex The index of the series in the `seriesCollection`.","     * @return {String | HTML}","     * @private","     */","    _tooltipLabelFunction: function(categoryItem, valueItem, itemIndex, series, seriesIndex)","    {","        var msg = DOCUMENT.createElement(\"div\"),","            categoryValue = categoryItem.axis.get(\"labelFunction\").apply(this, [categoryItem.value, categoryItem.axis.get(\"labelFormat\")]),","            seriesValue = valueItem.axis.get(\"labelFunction\").apply(this, [valueItem.value, valueItem.axis.get(\"labelFormat\")]);","        msg.appendChild(DOCUMENT.createTextNode(categoryItem.displayName));","        msg.appendChild(DOCUMENT.createTextNode(\": \"));","        if(!Y_Lang.isObject(categoryValue))","        {","            categoryValue = DOCUMENT.createTextNode(categoryValue);","        }","        msg.appendChild(categoryValue);","        msg.appendChild(DOCUMENT.createElement(\"br\"));","        msg.appendChild(DOCUMENT.createTextNode(valueItem.displayName));","        msg.appendChild(DOCUMENT.createTextNode(\": \"));","        if(!Y_Lang.isObject(seriesValue))","        {","            seriesValue = DOCUMENT.createTextNode(seriesValue);","        }","        msg.appendChild(seriesValue);","        return msg;","    },","","    /**","     * Event handler for the tooltipChange.","     *","     * @method _tooltipChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _tooltipChangeHandler: function(e)","    {","        if(this.get(\"tooltip\"))","        {","            var tt = this.get(\"tooltip\"),","                node = tt.node,","                show = tt.show,","                cb = this.get(\"contentBox\");","            if(node && show)","            {","                if(!cb.contains(node))","                {","                    this._addTooltip();","                }","            }","        }","    },","","    /**","     * Updates the content of text field. This method writes a value into a text field using","     * `appendChild`. If the value is a `String`, it is converted to a `TextNode` first.","     *","     * @method _setText","     * @param label {HTMLElement} label to be updated","     * @param val {String} value with which to update the label","     * @private","     */","    _setText: function(textField, val)","    {","        textField.setContent(\"\");","        if(Y_Lang.isNumber(val))","        {","            val = val + \"\";","        }","        else if(!val)","        {","            val = \"\";","        }","        if(IS_STRING(val))","        {","            val = DOCUMENT.createTextNode(val);","        }","        textField.appendChild(val);","    },","","    /**","     * Returns all the keys contained in a  `dataProvider`.","     *","     * @method _getAllKeys","     * @param {Array} dp Collection of objects to be parsed.","     * @return Object","     */","    _getAllKeys: function(dp)","    {","        var i = 0,","            len = dp.length,","            item,","            key,","            keys = {};","        for(; i < len; ++i)","        {","            item = dp[i];","            for(key in item)","            {","                if(item.hasOwnProperty(key))","                {","                    keys[key] = true;","                }","            }","        }","        return keys;","    },","","    /**","     * Constructs seriesKeys if not explicitly specified.","     *","     * @method _buildSeriesKeys","     * @param {Array} dataProvider The dataProvider for the chart.","     * @return Array","     * @private","     */","    _buildSeriesKeys: function(dataProvider)","    {","        var allKeys,","            catKey = this.get(\"categoryKey\"),","            keys = [],","            i;","        if(this._seriesKeysExplicitlySet)","        {","            return this._seriesKeys;","        }","        allKeys = this._getAllKeys(dataProvider);","        for(i in allKeys)","        {","            if(allKeys.hasOwnProperty(i) && i != catKey)","            {","                keys.push(i);","            }","        }","        return keys;","    }","};","Y.ChartBase = ChartBase;","/**"," * The CartesianChart class creates a chart with horizontal and vertical axes."," *"," * @class CartesianChart"," * @extends ChartBase"," * @constructor"," * @submodule charts-base"," */","Y.CartesianChart = Y.Base.create(\"cartesianChart\", Y.Widget, [Y.ChartBase], {","    /**","     * @method renderUI","     * @private","     */","    renderUI: function()","    {","        var bb = this.get(\"boundingBox\"),","            cb = this.get(\"contentBox\"),","            tt = this.get(\"tooltip\"),","            overlay,","            overlayClass = _getClassName(\"overlay\");","        //move the position = absolute logic to a class file","        bb.setStyle(\"position\", \"absolute\");","        cb.setStyle(\"position\", \"absolute\");","        this._addAxes();","        this._addGridlines();","        this._addSeries();","        if(tt && tt.show)","        {","            this._addTooltip();","        }","        //If there is a style definition. Force them to set.","        this.get(\"styles\");","        if(this.get(\"interactionType\") == \"planar\")","        {","            overlay = DOCUMENT.createElement(\"div\");","            this.get(\"contentBox\").appendChild(overlay);","            this._overlay = Y.one(overlay);","            this._overlay.set(\"id\", this.get(\"id\") + \"_overlay\");","            this._overlay.setStyle(\"position\", \"absolute\");","            this._overlay.setStyle(\"background\", \"#fff\");","            this._overlay.setStyle(\"opacity\", 0);","            this._overlay.addClass(overlayClass);","            this._overlay.setStyle(\"zIndex\", 4);","        }","        this._setAriaElements(bb, cb);","        this._redraw();","    },","","    /**","     * When `interactionType` is set to `planar`, listens for mouse move events and fires `planarEvent:mouseover` or `planarEvent:mouseout`","     * depending on the position of the mouse in relation to data points on the `Chart`.","     *","     * @method _planarEventDispatcher","     * @param {Object} e Event object.","     * @private","     */","    _planarEventDispatcher: function(e)","    {","        var graph = this.get(\"graph\"),","            bb = this.get(\"boundingBox\"),","            cb = graph.get(\"contentBox\"),","            isTouch = e && e.hasOwnProperty(\"changedTouches\"),","            pageX = isTouch ? e.changedTouches[0].pageX : e.pageX,","            pageY = isTouch ? e.changedTouches[0].pageY : e.pageY,","            posX = pageX - bb.getX(),","            posY = pageY - bb.getY(),","            offset = {","                x: pageX - cb.getX(),","                y: pageY - cb.getY()","            },","            sc = graph.get(\"seriesCollection\"),","            series,","            i = 0,","            index,","            oldIndex = this._selectedIndex,","            item,","            items = [],","            categoryItems = [],","            valueItems = [],","            direction = this.get(\"direction\"),","            hasMarkers,","            catAxis,","            valAxis,","            coord,","            //data columns and area data could be created on a graph level","            markerPlane,","            len,","            coords;","        e.halt(true);","        if(direction == \"horizontal\")","        {","            catAxis = \"x\";","            valAxis = \"y\";","        }","        else","        {","            valAxis = \"x\";","            catAxis = \"y\";","        }","        coord = offset[catAxis];","        if(sc)","        {","            len = sc.length;","            while(i < len && !markerPlane)","            {","                if(sc[i])","                {","                    markerPlane = sc[i].get(catAxis + \"MarkerPlane\");","                }","                i++;","            }","        }","        if(markerPlane)","        {","            len = markerPlane.length;","            for(i = 0; i < len; ++i)","            {","                if(coord <= markerPlane[i].end && coord >= markerPlane[i].start)","                {","                    index = i;","                    break;","                }","            }","            len = sc.length;","            for(i = 0; i < len; ++i)","            {","                series = sc[i];","                coords = series.get(valAxis + \"coords\");","                hasMarkers = series.get(\"markers\");","                if(hasMarkers && !isNaN(oldIndex) && oldIndex > -1)","                {","                    series.updateMarkerState(\"mouseout\", oldIndex);","                }","                if(coords && coords[index] > -1)","                {","                    if(hasMarkers && !isNaN(index) && index > -1)","                    {","                        series.updateMarkerState(\"mouseover\", index);","                    }","                    item = this.getSeriesItems(series, index);","                    categoryItems.push(item.category);","                    valueItems.push(item.value);","                    items.push(series);","                }","","            }","            this._selectedIndex = index;","","            /**","             * Broadcasts when `interactionType` is set to `planar` and a series' marker plane has received a mouseover event.","             *","             *","             * @event planarEvent:mouseover","             * @preventable false","             * @param {EventFacade} e Event facade with the following additional","             *   properties:","             *  <dl>","             *      <dt>categoryItem</dt><dd>An array of hashes, each containing information about the category `Axis` of each marker","             *      whose plane has been intersected.</dd>","             *      <dt>valueItem</dt><dd>An array of hashes, each containing information about the value `Axis` of each marker whose","             *      plane has been intersected.</dd>","             *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>","             *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>","             *      <dt>pageX</dt><dd>The x location of the event on the page (including scroll)</dd>","             *      <dt>pageY</dt><dd>The y location of the event on the page (including scroll)</dd>","             *      <dt>items</dt><dd>An array including all the series which contain a marker whose plane has been intersected.</dd>","             *      <dt>index</dt><dd>Index of the markers in their respective series.</dd>","             *      <dt>originEvent</dt><dd>Underlying dom event.</dd>","             *  </dl>","             */","            /**","             * Broadcasts when `interactionType` is set to `planar` and a series' marker plane has received a mouseout event.","             *","             * @event planarEvent:mouseout","             * @preventable false","             * @param {EventFacade} e","             */","            if(index > -1)","            {","                this.fire(\"planarEvent:mouseover\", {","                    categoryItem:categoryItems,","                    valueItem:valueItems,","                    x:posX,","                    y:posY,","                    pageX:pageX,","                    pageY:pageY,","                    items:items,","                    index:index,","                    originEvent:e","                });","            }","            else","            {","                this.fire(\"planarEvent:mouseout\");","            }","        }","    },","","    /**","     * Indicates the default series type for the chart.","     *","     * @property _type","     * @type {String}","     * @private","     */","    _type: \"combo\",","","    /**","     * Queue of axes instances that will be updated. This method is used internally to determine when all axes have been updated.","     *","     * @property _itemRenderQueue","     * @type Array","     * @private","     */","    _itemRenderQueue: null,","","    /**","     * Adds an `Axis` instance to the `_itemRenderQueue`.","     *","     * @method _addToAxesRenderQueue","     * @param {Axis} axis An `Axis` instance.","     * @private","     */","    _addToAxesRenderQueue: function(axis)","    {","        if(!this._itemRenderQueue)","        {","            this._itemRenderQueue = [];","        }","        if(Y.Array.indexOf(this._itemRenderQueue, axis) < 0)","        {","            this._itemRenderQueue.push(axis);","        }","    },","","    /**","     * Adds axis instance to the appropriate array based on position","     *","     * @method _addToAxesCollection","     * @param {String} position The position of the axis","     * @param {Axis} axis The `Axis` instance","     */","    _addToAxesCollection: function(position, axis)","    {","        var axesCollection = this.get(position + \"AxesCollection\");","        if(!axesCollection)","        {","            axesCollection = [];","            this.set(position + \"AxesCollection\", axesCollection);","        }","        axesCollection.push(axis);","    },","","    /**","     * Returns the default value for the `seriesCollection` attribute.","     *","     * @method _getDefaultSeriesCollection","     * @param {Array} val Array containing either `CartesianSeries` instances or objects containing data to construct series instances.","     * @return Array","     * @private","     */","    _getDefaultSeriesCollection: function()","    {","        var seriesCollection,","            dataProvider = this.get(\"dataProvider\");","        if(dataProvider)","        {","            seriesCollection = this._parseSeriesCollection();","        }","        return seriesCollection;","    },","","    /**","     * Parses and returns a series collection from an object and default properties.","     *","     * @method _parseSeriesCollection","     * @param {Object} val Object contain properties for series being set.","     * @return Object","     * @private","     */","    _parseSeriesCollection: function(val)","    {","        var dir = this.get(\"direction\"),","            sc = [],","            catAxis,","            valAxis,","            tempKeys = [],","            series,","            seriesKeys = this.get(\"seriesKeys\").concat(),","            i,","            index,","            l,","            type = this.get(\"type\"),","            key,","            catKey,","            seriesKey,","            graph,","            orphans = [],","            categoryKey = this.get(\"categoryKey\"),","            showMarkers = this.get(\"showMarkers\"),","            showAreaFill = this.get(\"showAreaFill\"),","            showLines = this.get(\"showLines\");","        val = val || [];","        if(dir == \"vertical\")","        {","            catAxis = \"yAxis\";","            catKey = \"yKey\";","            valAxis = \"xAxis\";","            seriesKey = \"xKey\";","        }","        else","        {","            catAxis = \"xAxis\";","            catKey = \"xKey\";","            valAxis = \"yAxis\";","            seriesKey = \"yKey\";","        }","        l = val.length;","        while(val && val.length > 0)","        {","            series = val.shift();","            key = this._getBaseAttribute(series, seriesKey);","            if(key)","            {","                index = Y.Array.indexOf(seriesKeys, key);","                if(index > -1)","                {","                    seriesKeys.splice(index, 1);","                    tempKeys.push(key);","                    sc.push(series);","                }","                else","                {","                    orphans.push(series);","                }","            }","            else","            {","                orphans.push(series);","            }","        }","        while(orphans.length > 0)","        {","            series = orphans.shift();","            if(seriesKeys.length > 0)","            {","                key = seriesKeys.shift();","                this._setBaseAttribute(series, seriesKey, key);","                tempKeys.push(key);","                sc.push(series);","            }","            else if(series instanceof Y.CartesianSeries)","            {","                series.destroy(true);","            }","        }","        if(seriesKeys.length > 0)","        {","            tempKeys = tempKeys.concat(seriesKeys);","        }","        l = tempKeys.length;","        for(i = 0; i < l; ++i)","        {","            series = sc[i] || {type:type};","            if(series instanceof Y.CartesianSeries)","            {","                this._parseSeriesAxes(series);","                continue;","            }","","            series[catKey] = series[catKey] || categoryKey;","            series[seriesKey] = series[seriesKey] || seriesKeys.shift();","            series[catAxis] = this._getCategoryAxis();","            series[valAxis] = this._getSeriesAxis(series[seriesKey]);","","            series.type = series.type || type;","            series.direction = series.direction || dir;","","            if((series.type == \"combo\" || series.type == \"stackedcombo\" || series.type == \"combospline\" || series.type == \"stackedcombospline\"))","            {","                if(showAreaFill !== null)","                {","                    series.showAreaFill = (series.showAreaFill !== null && series.showAreaFill !== undefined) ? series.showAreaFill : showAreaFill;","                }","                if(showMarkers !== null)","                {","                    series.showMarkers = (series.showMarkers !== null && series.showMarkers !== undefined) ? series.showMarkers : showMarkers;","                }","                if(showLines !== null)","                {","                    series.showLines = (series.showLines !== null && series.showLines !== undefined) ? series.showLines : showLines;","                }","            }","            sc[i] = series;","        }","        if(sc)","        {","            graph = this.get(\"graph\");","            graph.set(\"seriesCollection\", sc);","            sc = graph.get(\"seriesCollection\");","        }","        return sc;","    },","","    /**","     * Parse and sets the axes for a series instance.","     *","     * @method _parseSeriesAxes","     * @param {CartesianSeries} series A `CartesianSeries` instance.","     * @private","     */","    _parseSeriesAxes: function(series)","    {","        var axes = this.get(\"axes\"),","            xAxis = series.get(\"xAxis\"),","            yAxis = series.get(\"yAxis\"),","            YAxis = Y.Axis,","            axis;","        if(xAxis && !(xAxis instanceof YAxis) && Y_Lang.isString(xAxis) && axes.hasOwnProperty(xAxis))","        {","            axis = axes[xAxis];","            if(axis instanceof YAxis)","            {","                series.set(\"xAxis\", axis);","            }","        }","        if(yAxis && !(yAxis instanceof YAxis) && Y_Lang.isString(yAxis) && axes.hasOwnProperty(yAxis))","        {","            axis = axes[yAxis];","            if(axis instanceof YAxis)","            {","                series.set(\"yAxis\", axis);","            }","        }","","    },","","    /**","     * Returns the category axis instance for the chart.","     *","     * @method _getCategoryAxis","     * @return Axis","     * @private","     */","    _getCategoryAxis: function()","    {","        var axis,","            axes = this.get(\"axes\"),","            categoryAxisName = this.get(\"categoryAxisName\") || this.get(\"categoryKey\");","        axis = axes[categoryAxisName];","        return axis;","    },","","    /**","     * Returns the value axis for a series.","     *","     * @method _getSeriesAxis","     * @param {String} key The key value used to determine the axis instance.","     * @return Axis","     * @private","     */","    _getSeriesAxis:function(key, axisName)","    {","        var axes = this.get(\"axes\"),","            i,","            keys,","            axis;","        if(axes)","        {","            if(axisName && axes.hasOwnProperty(axisName))","            {","                axis = axes[axisName];","            }","            else","            {","                for(i in axes)","                {","                    if(axes.hasOwnProperty(i))","                    {","                        keys = axes[i].get(\"keys\");","                        if(keys && keys.hasOwnProperty(key))","                        {","                            axis = axes[i];","                            break;","                        }","                    }","                }","            }","        }","        return axis;","    },","","    /**","     * Gets an attribute from an object, using a getter for Base objects and a property for object","     * literals. Used for determining attributes from series/axis references which can be an actual class instance","     * or a hash of properties that will be used to create a class instance.","     *","     * @method _getBaseAttribute","     * @param {Object} item Object or instance in which the attribute resides.","     * @param {String} key Attribute whose value will be returned.","     * @return Object","     * @private","     */","    _getBaseAttribute: function(item, key)","    {","        if(item instanceof Y.Base)","        {","            return item.get(key);","        }","        if(item.hasOwnProperty(key))","        {","            return item[key];","        }","        return null;","    },","","    /**","     * Sets an attribute on an object, using a setter of Base objects and a property for object","     * literals. Used for setting attributes on a Base class, either directly or to be stored in an object literal","     * for use at instantiation.","     *","     * @method _setBaseAttribute","     * @param {Object} item Object or instance in which the attribute resides.","     * @param {String} key Attribute whose value will be assigned.","     * @param {Object} value Value to be assigned to the attribute.","     * @private","     */","    _setBaseAttribute: function(item, key, value)","    {","        if(item instanceof Y.Base)","        {","            item.set(key, value);","        }","        else","        {","            item[key] = value;","        }","    },","","    /**","     * Creates `Axis` instances.","     *","     * @method _setAxes","     * @param {Object} val Object containing `Axis` instances or objects in which to construct `Axis` instances.","     * @return Object","     * @private","     */","    _setAxes: function(val)","    {","        var hash = this._parseAxes(val),","            axes = {},","            axesAttrs = {","                edgeOffset: \"edgeOffset\",","                position: \"position\",","                overlapGraph:\"overlapGraph\",","                labelFunction:\"labelFunction\",","                labelFunctionScope:\"labelFunctionScope\",","                labelFormat:\"labelFormat\",","                appendLabelFunction: \"appendLabelFunction\",","                appendTitleFunction: \"appendTitleFunction\",","                maximum:\"maximum\",","                minimum:\"minimum\",","                roundingMethod:\"roundingMethod\",","                alwaysShowZero:\"alwaysShowZero\",","                title:\"title\",","                width:\"width\",","                height:\"height\"","            },","            dp = this.get(\"dataProvider\"),","            ai,","            i,","            pos,","            axis,","            axisPosition,","            dh,","            axisClass,","            config,","            axesCollection;","        for(i in hash)","        {","            if(hash.hasOwnProperty(i))","            {","                dh = hash[i];","                if(dh instanceof Y.Axis)","                {","                    axis = dh;","                }","                else","                {","                    axis = null;","                    config = {};","                    config.dataProvider = dh.dataProvider || dp;","                    config.keys = dh.keys;","","                    if(dh.hasOwnProperty(\"roundingUnit\"))","                    {","                        config.roundingUnit = dh.roundingUnit;","                    }","                    pos = dh.position;","                    if(dh.styles)","                    {","                        config.styles = dh.styles;","                    }","                    config.position = dh.position;","                    for(ai in axesAttrs)","                    {","                        if(axesAttrs.hasOwnProperty(ai) && dh.hasOwnProperty(ai))","                        {","                            config[ai] = dh[ai];","                        }","                    }","","                    //only check for existing axis if we constructed the default axes already","                    if(val)","                    {","                        axis = this.getAxisByKey(i);","                    }","","                    if(axis && axis instanceof Y.Axis)","                    {","                        axisPosition = axis.get(\"position\");","                        if(pos != axisPosition)","                        {","                            if(axisPosition != \"none\")","                            {","                                axesCollection = this.get(axisPosition + \"AxesCollection\");","                                axesCollection.splice(Y.Array.indexOf(axesCollection, axis), 1);","                            }","                            if(pos != \"none\")","                            {","                                this._addToAxesCollection(pos, axis);","                            }","                        }","                        axis.setAttrs(config);","                    }","                    else","                    {","                        axisClass = this._getAxisClass(dh.type);","                        axis = new axisClass(config);","                        axis.after(\"axisRendered\", Y.bind(this._itemRendered, this));","                    }","                }","","                if(axis)","                {","                    axesCollection = this.get(pos + \"AxesCollection\");","                    if(axesCollection && Y.Array.indexOf(axesCollection, axis) > 0)","                    {","                        axis.set(\"overlapGraph\", false);","                    }","                    axes[i] = axis;","                }","            }","        }","        return axes;","    },","","    /**","     * Adds axes to the chart.","     *","     * @method _addAxes","     * @private","     */","    _addAxes: function()","    {","        var axes = this.get(\"axes\"),","            i,","            axis,","            pos,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            node = Y.Node.one(this._parentNode);","        if(!this._axesCollection)","        {","            this._axesCollection = [];","        }","        for(i in axes)","        {","            if(axes.hasOwnProperty(i))","            {","                axis = axes[i];","                if(axis instanceof Y.Axis)","                {","                    if(!w)","                    {","                        this.set(\"width\", node.get(\"offsetWidth\"));","                        w = this.get(\"width\");","                    }","                    if(!h)","                    {","                        this.set(\"height\", node.get(\"offsetHeight\"));","                        h = this.get(\"height\");","                    }","                    this._addToAxesRenderQueue(axis);","                    pos = axis.get(\"position\");","                    if(!this.get(pos + \"AxesCollection\"))","                    {","                        this.set(pos + \"AxesCollection\", [axis]);","                    }","                    else","                    {","                        this.get(pos + \"AxesCollection\").push(axis);","                    }","                    this._axesCollection.push(axis);","                    if(axis.get(\"keys\").hasOwnProperty(this.get(\"categoryKey\")))","                    {","                        this.set(\"categoryAxis\", axis);","                    }","                    axis.render(this.get(\"contentBox\"));","                }","            }","        }","    },","","    /**","     * Renders the Graph.","     *","     * @method _addSeries","     * @private","     */","    _addSeries: function()","    {","        var graph = this.get(\"graph\"),","            sc = this.get(\"seriesCollection\");","        graph.render(this.get(\"contentBox\"));","","    },","","    /**","     * Adds gridlines to the chart.","     *","     * @method _addGridlines","     * @private","     */","    _addGridlines: function()","    {","        var graph = this.get(\"graph\"),","            hgl = this.get(\"horizontalGridlines\"),","            vgl = this.get(\"verticalGridlines\"),","            direction = this.get(\"direction\"),","            leftAxesCollection = this.get(\"leftAxesCollection\"),","            rightAxesCollection = this.get(\"rightAxesCollection\"),","            bottomAxesCollection = this.get(\"bottomAxesCollection\"),","            topAxesCollection = this.get(\"topAxesCollection\"),","            seriesAxesCollection,","            catAxis = this.get(\"categoryAxis\"),","            hAxis,","            vAxis;","        if(this._axesCollection)","        {","            seriesAxesCollection = this._axesCollection.concat();","            seriesAxesCollection.splice(Y.Array.indexOf(seriesAxesCollection, catAxis), 1);","        }","        if(hgl)","        {","            if(leftAxesCollection && leftAxesCollection[0])","            {","                hAxis = leftAxesCollection[0];","            }","            else if(rightAxesCollection && rightAxesCollection[0])","            {","                hAxis = rightAxesCollection[0];","            }","            else","            {","                hAxis = direction == \"horizontal\" ? catAxis : seriesAxesCollection[0];","            }","            if(!this._getBaseAttribute(hgl, \"axis\") && hAxis)","            {","                this._setBaseAttribute(hgl, \"axis\", hAxis);","            }","            if(this._getBaseAttribute(hgl, \"axis\"))","            {","                graph.set(\"horizontalGridlines\", hgl);","            }","        }","        if(vgl)","        {","            if(bottomAxesCollection && bottomAxesCollection[0])","            {","                vAxis = bottomAxesCollection[0];","            }","            else if (topAxesCollection && topAxesCollection[0])","            {","                vAxis = topAxesCollection[0];","            }","            else","            {","                vAxis = direction == \"vertical\" ? catAxis : seriesAxesCollection[0];","            }","            if(!this._getBaseAttribute(vgl, \"axis\") && vAxis)","            {","                this._setBaseAttribute(vgl, \"axis\", vAxis);","            }","            if(this._getBaseAttribute(vgl, \"axis\"))","            {","                graph.set(\"verticalGridlines\", vgl);","            }","        }","    },","","    /**","     * Default Function for the axes attribute.","     *","     * @method _getDefaultAxes","     * @return Object","     * @private","     */","    _getDefaultAxes: function()","    {","        var axes;","        if(this.get(\"dataProvider\"))","        {","            axes = this._parseAxes();","        }","        return axes;","    },","","    /**","     * Generates and returns a key-indexed object containing `Axis` instances or objects used to create `Axis` instances.","     *","     * @method _parseAxes","     * @param {Object} axes Object containing `Axis` instances or `Axis` attributes.","     * @return Object","     * @private","     */","    _parseAxes: function(axes)","    {","        var catKey = this.get(\"categoryKey\"),","            axis,","            attr,","            keys,","            newAxes = {},","            claimedKeys = [],","            categoryAxisName = this.get(\"categoryAxisName\") || this.get(\"categoryKey\"),","            valueAxisName = this.get(\"valueAxisName\"),","            seriesKeys = this.get(\"seriesKeys\").concat(),","            i,","            l,","            ii,","            ll,","            cIndex,","            direction = this.get(\"direction\"),","            seriesPosition,","            categoryPosition,","            valueAxes = [],","            seriesAxis = this.get(\"stacked\") ? \"stacked\" : \"numeric\";","        if(direction == \"vertical\")","        {","            seriesPosition = \"bottom\";","            categoryPosition = \"left\";","        }","        else","        {","            seriesPosition = \"left\";","            categoryPosition = \"bottom\";","        }","        if(axes)","        {","            for(i in axes)","            {","                if(axes.hasOwnProperty(i))","                {","                    axis = axes[i];","                    keys = this._getBaseAttribute(axis, \"keys\");","                    attr = this._getBaseAttribute(axis, \"type\");","                    if(attr == \"time\" || attr == \"category\")","                    {","                        categoryAxisName = i;","                        this.set(\"categoryAxisName\", i);","                        if(Y_Lang.isArray(keys) && keys.length > 0)","                        {","                            catKey = keys[0];","                            this.set(\"categoryKey\", catKey);","                        }","                        newAxes[i] = axis;","                    }","                    else if(i == categoryAxisName)","                    {","                        newAxes[i] = axis;","                    }","                    else","                    {","                        newAxes[i] = axis;","                        if(i != valueAxisName && keys && Y_Lang.isArray(keys))","                        {","                            ll = keys.length;","                            for(ii = 0; ii < ll; ++ii)","                            {","                                claimedKeys.push(keys[ii]);","                            }","                            valueAxes.push(newAxes[i]);","                        }","                        if(!(this._getBaseAttribute(newAxes[i], \"type\")))","                        {","                            this._setBaseAttribute(newAxes[i], \"type\", seriesAxis);","                        }","                        if(!(this._getBaseAttribute(newAxes[i], \"position\")))","                        {","                            this._setBaseAttribute(newAxes[i], \"position\", this._getDefaultAxisPosition(newAxes[i], valueAxes, seriesPosition));","                        }","                    }","                }","            }","        }","        cIndex = Y.Array.indexOf(seriesKeys, catKey);","        if(cIndex > -1)","        {","            seriesKeys.splice(cIndex, 1);","        }","        l = claimedKeys.length;","        for(i = 0; i < l; ++i)","        {","            cIndex = Y.Array.indexOf(seriesKeys, claimedKeys[i]);","            if(cIndex > -1)","            {","                seriesKeys.splice(cIndex, 1);","            }","        }","        if(!newAxes.hasOwnProperty(categoryAxisName))","        {","            newAxes[categoryAxisName] = {};","        }","        if(!(this._getBaseAttribute(newAxes[categoryAxisName], \"keys\")))","        {","            this._setBaseAttribute(newAxes[categoryAxisName], \"keys\", [catKey]);","        }","","        if(!(this._getBaseAttribute(newAxes[categoryAxisName], \"position\")))","        {","            this._setBaseAttribute(newAxes[categoryAxisName], \"position\", categoryPosition);","        }","","        if(!(this._getBaseAttribute(newAxes[categoryAxisName], \"type\")))","        {","            this._setBaseAttribute(newAxes[categoryAxisName], \"type\", this.get(\"categoryType\"));","        }","        if(!newAxes.hasOwnProperty(valueAxisName) && seriesKeys && seriesKeys.length > 0)","        {","            newAxes[valueAxisName] = {keys:seriesKeys};","            valueAxes.push(newAxes[valueAxisName]);","        }","        if(claimedKeys.length > 0)","        {","            if(seriesKeys.length > 0)","            {","                seriesKeys = claimedKeys.concat(seriesKeys);","            }","            else","            {","                seriesKeys = claimedKeys;","            }","        }","        if(newAxes.hasOwnProperty(valueAxisName))","        {","            if(!(this._getBaseAttribute(newAxes[valueAxisName], \"position\")))","            {","                this._setBaseAttribute(newAxes[valueAxisName], \"position\", this._getDefaultAxisPosition(newAxes[valueAxisName], valueAxes, seriesPosition));","            }","            this._setBaseAttribute(newAxes[valueAxisName], \"type\", seriesAxis);","            this._setBaseAttribute(newAxes[valueAxisName], \"keys\", seriesKeys);","        }","        if(!this._seriesKeysExplicitlySet)","        {","            this._seriesKeys = seriesKeys;","        }","        return newAxes;","    },","","    /**","     * Determines the position of an axis when one is not specified.","     *","     * @method _getDefaultAxisPosition","     * @param {Axis} axis `Axis` instance.","     * @param {Array} valueAxes Array of `Axis` instances.","     * @param {String} position Default position depending on the direction of the chart and type of axis.","     * @return String","     * @private","     */","    _getDefaultAxisPosition: function(axis, valueAxes, position)","    {","        var direction = this.get(\"direction\"),","            i = Y.Array.indexOf(valueAxes, axis);","","        if(valueAxes[i - 1] && valueAxes[i - 1].position)","        {","            if(direction == \"horizontal\")","            {","                if(valueAxes[i - 1].position == \"left\")","                {","                    position = \"right\";","                }","                else if(valueAxes[i - 1].position == \"right\")","                {","                    position = \"left\";","                }","            }","            else","            {","                if (valueAxes[i -1].position == \"bottom\")","                {","                    position = \"top\";","                }","                else","                {","                    position = \"bottom\";","                }","            }","        }","        return position;","    },","","","    /**","     * Returns an object literal containing a categoryItem and a valueItem for a given series index. Below is the structure of each:","     *","     * @method getSeriesItems","     * @param {CartesianSeries} series Reference to a series.","     * @param {Number} index Index of the specified item within a series.","     * @return Object An object literal containing the following:","     *","     *  <dl>","     *      <dt>categoryItem</dt><dd>Object containing the following data related to the category axis of the series.","     *  <dl>","     *      <dt>axis</dt><dd>Reference to the category axis of the series.</dd>","     *      <dt>key</dt><dd>Category key for the series.</dd>","     *      <dt>value</dt><dd>Value on the axis corresponding to the series index.</dd>","     *  </dl>","     *      </dd>","     *      <dt>valueItem</dt><dd>Object containing the following data related to the category axis of the series.","     *  <dl>","     *      <dt>axis</dt><dd>Reference to the value axis of the series.</dd>","     *      <dt>key</dt><dd>Value key for the series.</dd>","     *      <dt>value</dt><dd>Value on the axis corresponding to the series index.</dd>","     *  </dl>","     *      </dd>","     *  </dl>","     */","    getSeriesItems: function(series, index)","    {","        var xAxis = series.get(\"xAxis\"),","            yAxis = series.get(\"yAxis\"),","            xKey = series.get(\"xKey\"),","            yKey = series.get(\"yKey\"),","            categoryItem,","            valueItem;","        if(this.get(\"direction\") == \"vertical\")","        {","            categoryItem = {","                axis:yAxis,","                key:yKey,","                value:yAxis.getKeyValueAt(yKey, index)","            };","            valueItem = {","                axis:xAxis,","                key:xKey,","                value: xAxis.getKeyValueAt(xKey, index)","            };","        }","        else","        {","            valueItem = {","                axis:yAxis,","                key:yKey,","                value:yAxis.getKeyValueAt(yKey, index)","            };","            categoryItem = {","                axis:xAxis,","                key:xKey,","                value: xAxis.getKeyValueAt(xKey, index)","            };","        }","        categoryItem.displayName = series.get(\"categoryDisplayName\");","        valueItem.displayName = series.get(\"valueDisplayName\");","        categoryItem.value = categoryItem.axis.getKeyValueAt(categoryItem.key, index);","        valueItem.value = valueItem.axis.getKeyValueAt(valueItem.key, index);","        return {category:categoryItem, value:valueItem};","    },","","    /**","     * Handler for sizeChanged event.","     *","     * @method _sizeChanged","     * @param {Object} e Event object.","     * @private","     */","    _sizeChanged: function(e)","    {","        if(this._axesCollection)","        {","            var ac = this._axesCollection,","                i = 0,","                l = ac.length;","            for(; i < l; ++i)","            {","                this._addToAxesRenderQueue(ac[i]);","            }","            this._redraw();","        }","    },","","    /**","     * Returns the maximum distance in pixels that the extends outside the top bounds of all vertical axes.","     *","     * @method _getTopOverflow","     * @param {Array} set1 Collection of axes to check.","     * @param {Array} set2 Seconf collection of axes to check.","     * @param {Number} width Width of the axes","     * @return Number","     * @private","     */","    _getTopOverflow: function(set1, set2, height)","    {","        var i = 0,","            len,","            overflow = 0,","            axis;","        if(set1)","        {","            len = set1.length;","            for(; i < len; ++i)","            {","                axis = set1[i];","                overflow = Math.max(overflow, Math.abs(axis.getMaxLabelBounds().top) - (axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, height) * 0.5));","            }","        }","        if(set2)","        {","            i = 0;","            len = set2.length;","            for(; i < len; ++i)","            {","                axis = set2[i];","                overflow = Math.max(overflow, Math.abs(axis.getMaxLabelBounds().top) - (axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, height) * 0.5));","            }","        }","        return overflow;","    },","","    /**","     * Returns the maximum distance in pixels that the extends outside the right bounds of all horizontal axes.","     *","     * @method _getRightOverflow","     * @param {Array} set1 Collection of axes to check.","     * @param {Array} set2 Seconf collection of axes to check.","     * @param {Number} width Width of the axes","     * @return Number","     * @private","     */","    _getRightOverflow: function(set1, set2, width)","    {","        var i = 0,","            len,","            overflow = 0,","            axis;","        if(set1)","        {","            len = set1.length;","            for(; i < len; ++i)","            {","                axis = set1[i];","                overflow = Math.max(overflow, axis.getMaxLabelBounds().right - (axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, width) * 0.5));","            }","        }","        if(set2)","        {","            i = 0;","            len = set2.length;","            for(; i < len; ++i)","            {","                axis = set2[i];","                overflow = Math.max(overflow, axis.getMaxLabelBounds().right - (axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, width) * 0.5));","            }","        }","        return overflow;","    },","","    /**","     * Returns the maximum distance in pixels that the extends outside the left bounds of all horizontal axes.","     *","     * @method _getLeftOverflow","     * @param {Array} set1 Collection of axes to check.","     * @param {Array} set2 Seconf collection of axes to check.","     * @param {Number} width Width of the axes","     * @return Number","     * @private","     */","    _getLeftOverflow: function(set1, set2, width)","    {","        var i = 0,","            len,","            overflow = 0,","            axis;","        if(set1)","        {","            len = set1.length;","            for(; i < len; ++i)","            {","                axis = set1[i];","                overflow = Math.max(overflow, Math.abs(axis.getMinLabelBounds().left) - (axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, width) * 0.5));","            }","        }","        if(set2)","        {","            i = 0;","            len = set2.length;","            for(; i < len; ++i)","            {","                axis = set2[i];","                overflow = Math.max(overflow, Math.abs(axis.getMinLabelBounds().left) - (axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, width) * 0.5));","            }","        }","        return overflow;","    },","","    /**","     * Returns the maximum distance in pixels that the extends outside the bottom bounds of all vertical axes.","     *","     * @method _getBottomOverflow","     * @param {Array} set1 Collection of axes to check.","     * @param {Array} set2 Seconf collection of axes to check.","     * @param {Number} height Height of the axes","     * @return Number","     * @private","     */","    _getBottomOverflow: function(set1, set2, height)","    {","        var i = 0,","            len,","            overflow = 0,","            axis;","        if(set1)","        {","            len = set1.length;","            for(; i < len; ++i)","            {","                axis = set1[i];","                overflow = Math.max(overflow, axis.getMinLabelBounds().bottom - (axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, height) * 0.5));","            }","        }","        if(set2)","        {","            i = 0;","            len = set2.length;","            for(; i < len; ++i)","            {","                axis = set2[i];","                overflow = Math.max(overflow, axis.getMinLabelBounds().bottom - (axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, height) * 0.5));","            }","        }","        return overflow;","    },","","    /**","     * Redraws and position all the components of the chart instance.","     *","     * @method _redraw","     * @private","     */","    _redraw: function()","    {","        if(this._drawing)","        {","            this._callLater = true;","            return;","        }","        this._drawing = true;","        this._callLater = false;","        var w = this.get(\"width\"),","            h = this.get(\"height\"),","            leftPaneWidth = 0,","            rightPaneWidth = 0,","            topPaneHeight = 0,","            bottomPaneHeight = 0,","            leftAxesCollection = this.get(\"leftAxesCollection\"),","            rightAxesCollection = this.get(\"rightAxesCollection\"),","            topAxesCollection = this.get(\"topAxesCollection\"),","            bottomAxesCollection = this.get(\"bottomAxesCollection\"),","            i = 0,","            l,","            axis,","            graphOverflow = \"visible\",","            graph = this.get(\"graph\"),","            topOverflow,","            bottomOverflow,","            leftOverflow,","            rightOverflow,","            graphWidth,","            graphHeight,","            graphX,","            graphY,","            allowContentOverflow = this.get(\"allowContentOverflow\"),","            diff,","            rightAxesXCoords,","            leftAxesXCoords,","            topAxesYCoords,","            bottomAxesYCoords,","            graphRect = {};","        if(leftAxesCollection)","        {","            leftAxesXCoords = [];","            l = leftAxesCollection.length;","            for(i = l - 1; i > -1; --i)","            {","                leftAxesXCoords.unshift(leftPaneWidth);","                leftPaneWidth += leftAxesCollection[i].get(\"width\");","            }","        }","        if(rightAxesCollection)","        {","            rightAxesXCoords = [];","            l = rightAxesCollection.length;","            i = 0;","            for(i = l - 1; i > -1; --i)","            {","                rightPaneWidth += rightAxesCollection[i].get(\"width\");","                rightAxesXCoords.unshift(w - rightPaneWidth);","            }","        }","        if(topAxesCollection)","        {","            topAxesYCoords = [];","            l = topAxesCollection.length;","            for(i = l - 1; i > -1; --i)","            {","                topAxesYCoords.unshift(topPaneHeight);","                topPaneHeight += topAxesCollection[i].get(\"height\");","            }","        }","        if(bottomAxesCollection)","        {","            bottomAxesYCoords = [];","            l = bottomAxesCollection.length;","            for(i = l - 1; i > -1; --i)","            {","                bottomPaneHeight += bottomAxesCollection[i].get(\"height\");","                bottomAxesYCoords.unshift(h - bottomPaneHeight);","            }","        }","","        graphWidth = w - (leftPaneWidth + rightPaneWidth);","        graphHeight = h - (bottomPaneHeight + topPaneHeight);","        graphRect.left = leftPaneWidth;","        graphRect.top = topPaneHeight;","        graphRect.bottom = h - bottomPaneHeight;","        graphRect.right = w - rightPaneWidth;","        if(!allowContentOverflow)","        {","            topOverflow = this._getTopOverflow(leftAxesCollection, rightAxesCollection);","            bottomOverflow = this._getBottomOverflow(leftAxesCollection, rightAxesCollection);","            leftOverflow = this._getLeftOverflow(bottomAxesCollection, topAxesCollection);","            rightOverflow = this._getRightOverflow(bottomAxesCollection, topAxesCollection);","","            diff = topOverflow - topPaneHeight;","            if(diff > 0)","            {","                graphRect.top = topOverflow;","                if(topAxesYCoords)","                {","                    i = 0;","                    l = topAxesYCoords.length;","                    for(; i < l; ++i)","                    {","                        topAxesYCoords[i] += diff;","                    }","                }","            }","","            diff = bottomOverflow - bottomPaneHeight;","            if(diff > 0)","            {","                graphRect.bottom = h - bottomOverflow;","                if(bottomAxesYCoords)","                {","                    i = 0;","                    l = bottomAxesYCoords.length;","                    for(; i < l; ++i)","                    {","                        bottomAxesYCoords[i] -= diff;","                    }","                }","            }","","            diff = leftOverflow - leftPaneWidth;","            if(diff > 0)","            {","                graphRect.left = leftOverflow;","                if(leftAxesXCoords)","                {","                    i = 0;","                    l = leftAxesXCoords.length;","                    for(; i < l; ++i)","                    {","                        leftAxesXCoords[i] += diff;","                    }","                }","            }","","            diff = rightOverflow - rightPaneWidth;","            if(diff > 0)","            {","                graphRect.right = w - rightOverflow;","                if(rightAxesXCoords)","                {","                    i = 0;","                    l = rightAxesXCoords.length;","                    for(; i < l; ++i)","                    {","                        rightAxesXCoords[i] -= diff;","                    }","                }","            }","        }","        graphWidth = graphRect.right - graphRect.left;","        graphHeight = graphRect.bottom - graphRect.top;","        graphX = graphRect.left;","        graphY = graphRect.top;","        if(topAxesCollection)","        {","            l = topAxesCollection.length;","            i = 0;","            for(; i < l; i++)","            {","                axis = topAxesCollection[i];","                if(axis.get(\"width\") !== graphWidth)","                {","                    axis.set(\"width\", graphWidth);","                }","                axis.get(\"boundingBox\").setStyle(\"left\", graphX + \"px\");","                axis.get(\"boundingBox\").setStyle(\"top\", topAxesYCoords[i] + \"px\");","            }","            if(axis._hasDataOverflow())","            {","                graphOverflow = \"hidden\";","            }","        }","        if(bottomAxesCollection)","        {","            l = bottomAxesCollection.length;","            i = 0;","            for(; i < l; i++)","            {","                axis = bottomAxesCollection[i];","                if(axis.get(\"width\") !== graphWidth)","                {","                    axis.set(\"width\", graphWidth);","                }","                axis.get(\"boundingBox\").setStyle(\"left\", graphX + \"px\");","                axis.get(\"boundingBox\").setStyle(\"top\", bottomAxesYCoords[i] + \"px\");","            }","            if(axis._hasDataOverflow())","            {","                graphOverflow = \"hidden\";","            }","        }","        if(leftAxesCollection)","        {","            l = leftAxesCollection.length;","            i = 0;","            for(; i < l; ++i)","            {","                axis = leftAxesCollection[i];","                axis.get(\"boundingBox\").setStyle(\"top\", graphY + \"px\");","                axis.get(\"boundingBox\").setStyle(\"left\", leftAxesXCoords[i] + \"px\");","                if(axis.get(\"height\") !== graphHeight)","                {","                    axis.set(\"height\", graphHeight);","                }","            }","            if(axis._hasDataOverflow())","            {","                graphOverflow = \"hidden\";","            }","        }","        if(rightAxesCollection)","        {","            l = rightAxesCollection.length;","            i = 0;","            for(; i < l; ++i)","            {","                axis = rightAxesCollection[i];","                axis.get(\"boundingBox\").setStyle(\"top\", graphY + \"px\");","                axis.get(\"boundingBox\").setStyle(\"left\", rightAxesXCoords[i] + \"px\");","                if(axis.get(\"height\") !== graphHeight)","                {","                    axis.set(\"height\", graphHeight);","                }","            }","            if(axis._hasDataOverflow())","            {","                graphOverflow = \"hidden\";","            }","        }","        this._drawing = false;","        if(this._callLater)","        {","            this._redraw();","            return;","        }","        if(graph)","        {","            graph.get(\"boundingBox\").setStyle(\"left\", graphX + \"px\");","            graph.get(\"boundingBox\").setStyle(\"top\", graphY + \"px\");","            graph.set(\"width\", graphWidth);","            graph.set(\"height\", graphHeight);","            graph.get(\"boundingBox\").setStyle(\"overflow\", graphOverflow);","        }","","        if(this._overlay)","        {","            this._overlay.setStyle(\"left\", graphX + \"px\");","            this._overlay.setStyle(\"top\", graphY + \"px\");","            this._overlay.setStyle(\"width\", graphWidth + \"px\");","            this._overlay.setStyle(\"height\", graphHeight + \"px\");","        }","    },","","    /**","     * Destructor implementation for the CartesianChart class. Calls destroy on all axes, series and the Graph instance.","     * Removes the tooltip and overlay HTML elements.","     *","     * @method destructor","     * @protected","     */","    destructor: function()","    {","        var graph = this.get(\"graph\"),","            i = 0,","            len,","            seriesCollection = this.get(\"seriesCollection\"),","            axesCollection = this._axesCollection,","            tooltip = this.get(\"tooltip\").node;","        if(this._description)","        {","            this._description.empty();","            this._description.remove(true);","        }","        if(this._liveRegion)","        {","            this._liveRegion.empty();","            this._liveRegion.remove(true);","        }","        len = seriesCollection ? seriesCollection.length : 0;","        for(; i < len; ++i)","        {","            if(seriesCollection[i] instanceof Y.CartesianSeries)","            {","                seriesCollection[i].destroy(true);","            }","        }","        len = axesCollection ? axesCollection.length : 0;","        for(i = 0; i < len; ++i)","        {","            if(axesCollection[i] instanceof Y.Axis)","            {","                axesCollection[i].destroy(true);","            }","        }","        if(graph)","        {","            graph.destroy(true);","        }","        if(tooltip)","        {","            tooltip.empty();","            tooltip.remove(true);","        }","        if(this._overlay)","        {","            this._overlay.empty();","            this._overlay.remove(true);","        }","    },","","    /**","     * Returns the appropriate message based on the key press.","     *","     * @method _getAriaMessage","     * @param {Number} key The keycode that was pressed.","     * @return String","     */","    _getAriaMessage: function(key)","    {","        var msg = \"\",","            series,","            items,","            categoryItem,","            valueItem,","            seriesIndex = this._seriesIndex,","            itemIndex = this._itemIndex,","            seriesCollection = this.get(\"seriesCollection\"),","            len = seriesCollection.length,","            dataLength;","        if(key % 2 === 0)","        {","            if(len > 1)","            {","                if(key === 38)","                {","                    seriesIndex = seriesIndex < 1 ? len - 1 : seriesIndex - 1;","                }","                else if(key === 40)","                {","                    seriesIndex = seriesIndex >= len - 1 ? 0 : seriesIndex + 1;","                }","                this._itemIndex = -1;","            }","            else","            {","                seriesIndex = 0;","            }","            this._seriesIndex = seriesIndex;","            series = this.getSeries(parseInt(seriesIndex, 10));","            msg = series.get(\"valueDisplayName\") + \" series.\";","        }","        else","        {","            if(seriesIndex > -1)","            {","                msg = \"\";","                series = this.getSeries(parseInt(seriesIndex, 10));","            }","            else","            {","                seriesIndex = 0;","                this._seriesIndex = seriesIndex;","                series = this.getSeries(parseInt(seriesIndex, 10));","                msg = series.get(\"valueDisplayName\") + \" series.\";","            }","            dataLength = series._dataLength ? series._dataLength : 0;","            if(key === 37)","            {","                itemIndex = itemIndex > 0 ? itemIndex - 1 : dataLength - 1;","            }","            else if(key === 39)","            {","                itemIndex = itemIndex >= dataLength - 1 ? 0 : itemIndex + 1;","            }","            this._itemIndex = itemIndex;","            items = this.getSeriesItems(series, itemIndex);","            categoryItem = items.category;","            valueItem = items.value;","            if(categoryItem && valueItem && categoryItem.value && valueItem.value)","            {","                msg += categoryItem.displayName + \": \" + categoryItem.axis.formatLabel.apply(this, [categoryItem.value, categoryItem.axis.get(\"labelFormat\")]) + \", \";","                msg += valueItem.displayName + \": \" + valueItem.axis.formatLabel.apply(this, [valueItem.value, valueItem.axis.get(\"labelFormat\")]) + \", \";","            }","           else","            {","                msg += \"No data available.\";","            }","            msg += (itemIndex + 1) + \" of \" + dataLength + \". \";","        }","        return msg;","    }","}, {","    ATTRS: {","        /**","         * Indicates whether axis labels are allowed to overflow beyond the bounds of the chart's content box.","         *","         * @attribute allowContentOverflow","         * @type Boolean","         */","        allowContentOverflow: {","            value: false","        },","","        /**","         * Style object for the axes.","         *","         * @attribute axesStyles","         * @type Object","         * @private","         */","        axesStyles: {","            getter: function()","            {","                var axes = this.get(\"axes\"),","                    i,","                    styles = this._axesStyles;","                if(axes)","                {","                    for(i in axes)","                    {","                        if(axes.hasOwnProperty(i) && axes[i] instanceof Y.Axis)","                        {","                            if(!styles)","                            {","                                styles = {};","                            }","                            styles[i] = axes[i].get(\"styles\");","                        }","                    }","                }","                return styles;","            },","","            setter: function(val)","            {","                var axes = this.get(\"axes\"),","                    i;","                for(i in val)","                {","                    if(val.hasOwnProperty(i) && axes.hasOwnProperty(i))","                    {","                        this._setBaseAttribute(axes[i], \"styles\", val[i]);","                    }","                }","            }","        },","","        /**","         * Style object for the series","         *","         * @attribute seriesStyles","         * @type Object","         * @private","         */","        seriesStyles: {","            getter: function()","            {","                var styles = this._seriesStyles,","                    graph = this.get(\"graph\"),","                    dict,","                    i;","                if(graph)","                {","                    dict = graph.get(\"seriesDictionary\");","                    if(dict)","                    {","                        styles = {};","                        for(i in dict)","                        {","                            if(dict.hasOwnProperty(i))","                            {","                                styles[i] = dict[i].get(\"styles\");","                            }","                        }","                    }","                }","                return styles;","            },","","            setter: function(val)","            {","                var i,","                    l,","                    s;","","                if(Y_Lang.isArray(val))","                {","                    s = this.get(\"seriesCollection\");","                    i = 0;","                    l = val.length;","","                    for(; i < l; ++i)","                    {","                        this._setBaseAttribute(s[i], \"styles\", val[i]);","                    }","                }","                else","                {","                    for(i in val)","                    {","                        if(val.hasOwnProperty(i))","                        {","                            s = this.getSeries(i);","                            this._setBaseAttribute(s, \"styles\", val[i]);","                        }","                    }","                }","            }","        },","","        /**","         * Styles for the graph.","         *","         * @attribute graphStyles","         * @type Object","         * @private","         */","        graphStyles: {","            getter: function()","            {","                var graph = this.get(\"graph\");","                if(graph)","                {","                    return(graph.get(\"styles\"));","                }","                return this._graphStyles;","            },","","            setter: function(val)","            {","                var graph = this.get(\"graph\");","                this._setBaseAttribute(graph, \"styles\", val);","            }","","        },","","        /**","         * Style properties for the chart. Contains a key indexed hash of the following:","         *  <dl>","         *      <dt>series</dt><dd>A key indexed hash containing references to the `styles` attribute for each series in the chart.","         *      Specific style attributes vary depending on the series:","         *      <ul>","         *          <li><a href=\"AreaSeries.html#attr_styles\">AreaSeries</a></li>","         *          <li><a href=\"BarSeries.html#attr_styles\">BarSeries</a></li>","         *          <li><a href=\"ColumnSeries.html#attr_styles\">ColumnSeries</a></li>","         *          <li><a href=\"ComboSeries.html#attr_styles\">ComboSeries</a></li>","         *          <li><a href=\"LineSeries.html#attr_styles\">LineSeries</a></li>","         *          <li><a href=\"MarkerSeries.html#attr_styles\">MarkerSeries</a></li>","         *          <li><a href=\"SplineSeries.html#attr_styles\">SplineSeries</a></li>","         *      </ul>","         *      </dd>","         *      <dt>axes</dt><dd>A key indexed hash containing references to the `styles` attribute for each axes in the chart. Specific","         *      style attributes can be found in the <a href=\"Axis.html#attr_styles\">Axis</a> class.</dd>","         *      <dt>graph</dt><dd>A reference to the `styles` attribute in the chart. Specific style attributes can be found in the","         *      <a href=\"Graph.html#attr_styles\">Graph</a> class.</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","        styles: {","            getter: function()","            {","                var styles = {","                    axes: this.get(\"axesStyles\"),","                    series: this.get(\"seriesStyles\"),","                    graph: this.get(\"graphStyles\")","                };","                return styles;","            },","            setter: function(val)","            {","                if(val.hasOwnProperty(\"axes\"))","                {","                    if(this.get(\"axesStyles\"))","                    {","                        this.set(\"axesStyles\", val.axes);","                    }","                    else","                    {","                        this._axesStyles = val.axes;","                    }","                }","                if(val.hasOwnProperty(\"series\"))","                {","                    if(this.get(\"seriesStyles\"))","                    {","                        this.set(\"seriesStyles\", val.series);","                    }","                    else","                    {","                        this._seriesStyles = val.series;","                    }","                }","                if(val.hasOwnProperty(\"graph\"))","                {","                    this.set(\"graphStyles\", val.graph);","                }","            }","        },","","        /**","         * Axes to appear in the chart. This can be a key indexed hash of axis instances or object literals","         * used to construct the appropriate axes.","         *","         * @attribute axes","         * @type Object","         */","        axes: {","            valueFn: \"_getDefaultAxes\",","","            setter: function(val)","            {","                if(this.get(\"dataProvider\"))","                {","                    val = this._setAxes(val);","                }","                return val;","            }","        },","","        /**","         * Collection of series to appear on the chart. This can be an array of Series instances or object literals","         * used to construct the appropriate series.","         *","         * @attribute seriesCollection","         * @type Array","         */","        seriesCollection: {","            valueFn: \"_getDefaultSeriesCollection\",","","            setter: function(val)","            {","                if(this.get(\"dataProvider\"))","                {","                    val = this._parseSeriesCollection(val);","                }","                return val;","            }","        },","","        /**","         * Reference to the left-aligned axes for the chart.","         *","         * @attribute leftAxesCollection","         * @type Array","         * @private","         */","        leftAxesCollection: {},","","        /**","         * Reference to the bottom-aligned axes for the chart.","         *","         * @attribute bottomAxesCollection","         * @type Array","         * @private","         */","        bottomAxesCollection: {},","","        /**","         * Reference to the right-aligned axes for the chart.","         *","         * @attribute rightAxesCollection","         * @type Array","         * @private","         */","        rightAxesCollection: {},","","        /**","         * Reference to the top-aligned axes for the chart.","         *","         * @attribute topAxesCollection","         * @type Array","         * @private","         */","        topAxesCollection: {},","","        /**","         * Indicates whether or not the chart is stacked.","         *","         * @attribute stacked","         * @type Boolean","         */","        stacked: {","            value: false","        },","","        /**","         * Direction of chart's category axis when there is no series collection specified. Charts can","         * be horizontal or vertical. When the chart type is column, the chart is horizontal.","         * When the chart type is bar, the chart is vertical.","         *","         * @attribute direction","         * @type String","         */","        direction: {","            getter: function()","            {","                var type = this.get(\"type\");","                if(type == \"bar\")","                {","                    return \"vertical\";","                }","                else if(type == \"column\")","                {","                    return \"horizontal\";","                }","                return this._direction;","            },","","            setter: function(val)","            {","                this._direction = val;","                return this._direction;","            }","        },","","        /**","         * Indicates whether or not an area is filled in a combo chart.","         *","         * @attribute showAreaFill","         * @type Boolean","         */","        showAreaFill: {},","","        /**","         * Indicates whether to display markers in a combo chart.","         *","         * @attribute showMarkers","         * @type Boolean","         */","        showMarkers:{},","","        /**","         * Indicates whether to display lines in a combo chart.","         *","         * @attribute showLines","         * @type Boolean","         */","        showLines:{},","","        /**","         * Indicates the key value used to identify a category axis in the `axes` hash. If","         * not specified, the categoryKey attribute value will be used.","         *","         * @attribute categoryAxisName","         * @type String","         */","        categoryAxisName: {","        },","","        /**","         * Indicates the key value used to identify a the series axis when an axis not generated.","         *","         * @attribute valueAxisName","         * @type String","         */","        valueAxisName: {","            value: \"values\"","        },","","        /**","         * Reference to the horizontalGridlines for the chart.","         *","         * @attribute horizontalGridlines","         * @type Gridlines","         */","        horizontalGridlines: {","            getter: function()","            {","                var graph = this.get(\"graph\");","                if(graph)","                {","                    return graph.get(\"horizontalGridlines\");","                }","                return this._horizontalGridlines;","            },","            setter: function(val)","            {","                var graph = this.get(\"graph\");","                if(val && !Y_Lang.isObject(val))","                {","                    val = {};","                }","                if(graph)","                {","                    graph.set(\"horizontalGridlines\", val);","                }","                else","                {","                    this._horizontalGridlines = val;","                }","            }","        },","","        /**","         * Reference to the verticalGridlines for the chart.","         *","         * @attribute verticalGridlines","         * @type Gridlines","         */","        verticalGridlines: {","            getter: function()","            {","                var graph = this.get(\"graph\");","                if(graph)","                {","                    return graph.get(\"verticalGridlines\");","                }","                return this._verticalGridlines;","            },","            setter: function(val)","            {","                var graph = this.get(\"graph\");","                if(val && !Y_Lang.isObject(val))","                {","                    val = {};","                }","                if(graph)","                {","                    graph.set(\"verticalGridlines\", val);","                }","                else","                {","                    this._verticalGridlines = val;","                }","            }","        },","","        /**","         * Type of chart when there is no series collection specified.","         *","         * @attribute type","         * @type String","         */","        type: {","            getter: function()","            {","                if(this.get(\"stacked\"))","                {","                    return \"stacked\" + this._type;","                }","                return this._type;","            },","","            setter: function(val)","            {","                if(this._type == \"bar\")","                {","                    if(val != \"bar\")","                    {","                        this.set(\"direction\", \"horizontal\");","                    }","                }","                else","                {","                    if(val == \"bar\")","                    {","                        this.set(\"direction\", \"vertical\");","                    }","                }","                this._type = val;","                return this._type;","            }","        },","","        /**","         * Reference to the category axis used by the chart.","         *","         * @attribute categoryAxis","         * @type Axis","         */","        categoryAxis:{}","    }","});","/**"," * The PieChart class creates a pie chart"," *"," * @class PieChart"," * @extends ChartBase"," * @constructor"," * @submodule charts-base"," */","Y.PieChart = Y.Base.create(\"pieChart\", Y.Widget, [Y.ChartBase], {","    /**","     * Calculates and returns a `seriesCollection`.","     *","     * @method _getSeriesCollection","     * @return Array","     * @private","     */","    _getSeriesCollection: function()","    {","        if(this._seriesCollection)","        {","            return this._seriesCollection;","        }","        var axes = this.get(\"axes\"),","            sc = [],","            seriesKeys,","            i = 0,","            l,","            type = this.get(\"type\"),","            key,","            catAxis = \"categoryAxis\",","            catKey = \"categoryKey\",","            valAxis = \"valueAxis\",","            seriesKey = \"valueKey\";","        if(axes)","        {","            seriesKeys = axes.values.get(\"keyCollection\");","            key = axes.category.get(\"keyCollection\")[0];","            l = seriesKeys.length;","            for(; i < l; ++i)","            {","                sc[i] = {type:type};","                sc[i][catAxis] = \"category\";","                sc[i][valAxis] = \"values\";","                sc[i][catKey] = key;","                sc[i][seriesKey] = seriesKeys[i];","            }","        }","        this._seriesCollection = sc;","        return sc;","    },","","    /**","     * Creates `Axis` instances.","     *","     * @method _parseAxes","     * @param {Object} val Object containing `Axis` instances or objects in which to construct `Axis` instances.","     * @return Object","     * @private","     */","    _parseAxes: function(hash)","    {","        if(!this._axes)","        {","            this._axes = {};","        }","        var i, pos, axis, dh, config, axisClass,","            type = this.get(\"type\"),","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            node = Y.Node.one(this._parentNode);","        if(!w)","        {","            this.set(\"width\", node.get(\"offsetWidth\"));","            w = this.get(\"width\");","        }","        if(!h)","        {","            this.set(\"height\", node.get(\"offsetHeight\"));","            h = this.get(\"height\");","        }","        for(i in hash)","        {","            if(hash.hasOwnProperty(i))","            {","                dh = hash[i];","                pos = type == \"pie\" ? \"none\" : dh.position;","                axisClass = this._getAxisClass(dh.type);","                config = {dataProvider:this.get(\"dataProvider\")};","                if(dh.hasOwnProperty(\"roundingUnit\"))","                {","                    config.roundingUnit = dh.roundingUnit;","                }","                config.keys = dh.keys;","                config.width = w;","                config.height = h;","                config.position = pos;","                config.styles = dh.styles;","                axis = new axisClass(config);","                axis.on(\"axisRendered\", Y.bind(this._itemRendered, this));","                this._axes[i] = axis;","            }","        }","    },","","    /**","     * Adds axes to the chart.","     *","     * @method _addAxes","     * @private","     */","    _addAxes: function()","    {","        var axes = this.get(\"axes\"),","            i,","            axis,","            p;","        if(!axes)","        {","            this.set(\"axes\", this._getDefaultAxes());","            axes = this.get(\"axes\");","        }","        if(!this._axesCollection)","        {","            this._axesCollection = [];","        }","        for(i in axes)","        {","            if(axes.hasOwnProperty(i))","            {","                axis = axes[i];","                p = axis.get(\"position\");","                if(!this.get(p + \"AxesCollection\"))","                {","                    this.set(p + \"AxesCollection\", [axis]);","                }","                else","                {","                    this.get(p + \"AxesCollection\").push(axis);","                }","                this._axesCollection.push(axis);","            }","        }","    },","","    /**","     * Renders the Graph.","     *","     * @method _addSeries","     * @private","     */","    _addSeries: function()","    {","        var graph = this.get(\"graph\"),","            seriesCollection = this.get(\"seriesCollection\");","        this._parseSeriesAxes(seriesCollection);","        graph.set(\"showBackground\", false);","        graph.set(\"width\", this.get(\"width\"));","        graph.set(\"height\", this.get(\"height\"));","        graph.set(\"seriesCollection\", seriesCollection);","        this._seriesCollection = graph.get(\"seriesCollection\");","        graph.render(this.get(\"contentBox\"));","    },","","    /**","     * Parse and sets the axes for the chart.","     *","     * @method _parseSeriesAxes","     * @param {Array} c A collection `PieSeries` instance.","     * @private","     */","    _parseSeriesAxes: function(c)","    {","        var i = 0,","            len = c.length,","            s,","            axes = this.get(\"axes\"),","            axis;","        for(; i < len; ++i)","        {","            s = c[i];","            if(s)","            {","                //If series is an actual series instance,","                //replace axes attribute string ids with axes","                if(s instanceof Y.PieSeries)","                {","                    axis = s.get(\"categoryAxis\");","                    if(axis && !(axis instanceof Y.Axis))","                    {","                        s.set(\"categoryAxis\", axes[axis]);","                    }","                    axis = s.get(\"valueAxis\");","                    if(axis && !(axis instanceof Y.Axis))","                    {","                        s.set(\"valueAxis\", axes[axis]);","                    }","                    continue;","                }","                s.categoryAxis = axes.category;","                s.valueAxis = axes.values;","                if(!s.type)","                {","                    s.type = this.get(\"type\");","                }","            }","        }","    },","","    /**","     * Generates and returns a key-indexed object containing `Axis` instances or objects used to create `Axis` instances.","     *","     * @method _getDefaultAxes","     * @return Object","     * @private","     */","    _getDefaultAxes: function()","    {","        var catKey = this.get(\"categoryKey\"),","            seriesKeys = this.get(\"seriesKeys\").concat(),","            seriesAxis = \"numeric\";","        return {","            values:{","                keys:seriesKeys,","                type:seriesAxis","            },","            category:{","                keys:[catKey],","                type:this.get(\"categoryType\")","            }","        };","    },","","    /**","     * Returns an object literal containing a categoryItem and a valueItem for a given series index.","     *","     * @method getSeriesItem","     * @param series Reference to a series.","     * @param index Index of the specified item within a series.","     * @return Object","     */","    getSeriesItems: function(series, index)","    {","        var categoryItem = {","                axis: series.get(\"categoryAxis\"),","                key: series.get(\"categoryKey\"),","                displayName: series.get(\"categoryDisplayName\")","            },","            valueItem = {","                axis: series.get(\"valueAxis\"),","                key: series.get(\"valueKey\"),","                displayName: series.get(\"valueDisplayName\")","            };","        categoryItem.value = categoryItem.axis.getKeyValueAt(categoryItem.key, index);","        valueItem.value = valueItem.axis.getKeyValueAt(valueItem.key, index);","        return {category:categoryItem, value:valueItem};","    },","","    /**","     * Handler for sizeChanged event.","     *","     * @method _sizeChanged","     * @param {Object} e Event object.","     * @private","     */","    _sizeChanged: function(e)","    {","        this._redraw();","    },","","    /**","     * Redraws the chart instance.","     *","     * @method _redraw","     * @private","     */","    _redraw: function()","    {","        var graph = this.get(\"graph\"),","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            dimension;","        if(graph)","        {","            dimension = Math.min(w, h);","            graph.set(\"width\", dimension);","            graph.set(\"height\", dimension);","        }","    },","","    /**","     * Formats tooltip text for a pie chart.","     *","     * @method _tooltipLabelFunction","     * @param {Object} categoryItem An object containing the following:","     *  <dl>","     *      <dt>axis</dt><dd>The axis to which the category is bound.</dd>","     *      <dt>displayName</dt><dd>The display name set to the category (defaults to key if not provided)</dd>","     *      <dt>key</dt><dd>The key of the category.</dd>","     *      <dt>value</dt><dd>The value of the category</dd>","     *  </dl>","     * @param {Object} valueItem An object containing the following:","     *  <dl>","     *      <dt>axis</dt><dd>The axis to which the item's series is bound.</dd>","     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>","     *      <dt>key</dt><dd>The key for the series.</dd>","     *      <dt>value</dt><dd>The value for the series item.</dd>","     *  </dl>","     * @param {Number} itemIndex The index of the item within the series.","     * @param {CartesianSeries} series The `PieSeries` instance of the item.","     * @param {Number} seriesIndex The index of the series in the `seriesCollection`.","     * @return {HTML}","     * @private","     */","    _tooltipLabelFunction: function(categoryItem, valueItem, itemIndex, series, seriesIndex)","    {","        var msg = DOCUMENT.createElement(\"div\"),","            total = series.getTotalValues(),","            pct = Math.round((valueItem.value / total) * 10000)/100;","        msg.appendChild(DOCUMENT.createTextNode(categoryItem.displayName +","        \": \" + categoryItem.axis.get(\"labelFunction\").apply(this, [categoryItem.value, categoryItem.axis.get(\"labelFormat\")])));","        msg.appendChild(DOCUMENT.createElement(\"br\"));","        msg.appendChild(DOCUMENT.createTextNode(valueItem.displayName +","        \": \" + valueItem.axis.get(\"labelFunction\").apply(this, [valueItem.value, valueItem.axis.get(\"labelFormat\")])));","        msg.appendChild(DOCUMENT.createElement(\"br\"));","        msg.appendChild(DOCUMENT.createTextNode(pct + \"%\"));","        return msg;","    },","","    /**","     * Returns the appropriate message based on the key press.","     *","     * @method _getAriaMessage","     * @param {Number} key The keycode that was pressed.","     * @return String","     */","    _getAriaMessage: function(key)","    {","        var msg = \"\",","            categoryItem,","            items,","            series,","            valueItem,","            seriesIndex = 0,","            itemIndex = this._itemIndex,","            seriesCollection = this.get(\"seriesCollection\"),","            len,","            total,","            pct,","            markers;","        series = this.getSeries(parseInt(seriesIndex, 10));","        markers = series.get(\"markers\");","        len = markers && markers.length ? markers.length : 0;","        if(key === 37)","        {","            itemIndex = itemIndex > 0 ? itemIndex - 1 : len - 1;","        }","        else if(key === 39)","        {","            itemIndex = itemIndex >= len - 1 ? 0 : itemIndex + 1;","        }","        this._itemIndex = itemIndex;","        items = this.getSeriesItems(series, itemIndex);","        categoryItem = items.category;","        valueItem = items.value;","        total = series.getTotalValues();","        pct = Math.round((valueItem.value / total) * 10000)/100;","        if(categoryItem && valueItem)","        {","            msg += categoryItem.displayName + \": \" + categoryItem.axis.formatLabel.apply(this, [categoryItem.value, categoryItem.axis.get(\"labelFormat\")]) + \", \";","            msg += valueItem.displayName + \": \" + valueItem.axis.formatLabel.apply(this, [valueItem.value, valueItem.axis.get(\"labelFormat\")]) + \", \";","            msg += \"Percent of total \" + valueItem.displayName + \": \" + pct + \"%,\";","        }","        else","        {","            msg += \"No data available,\";","        }","        msg += (itemIndex + 1) + \" of \" + len + \". \";","        return msg;","    }","}, {","    ATTRS: {","        /**","         * Sets the aria description for the chart.","         *","         * @attribute ariaDescription","         * @type String","         */","        ariaDescription: {","            value: \"Use the left and right keys to navigate through items.\",","","            setter: function(val)","            {","                if(this._description)","                {","                    this._description.setContent(\"\");","                    this._description.appendChild(DOCUMENT.createTextNode(val));","                }","                return val;","            }","        },","","        /**","         * Axes to appear in the chart.","         *","         * @attribute axes","         * @type Object","         */","        axes: {","            getter: function()","            {","                return this._axes;","            },","","            setter: function(val)","            {","                this._parseAxes(val);","            }","        },","","        /**","         * Collection of series to appear on the chart. This can be an array of Series instances or object literals","         * used to describe a Series instance.","         *","         * @attribute seriesCollection","         * @type Array","         */","        seriesCollection: {","            getter: function()","            {","                return this._getSeriesCollection();","            },","","            setter: function(val)","            {","                return this._setSeriesCollection(val);","            }","        },","","        /**","         * Type of chart when there is no series collection specified.","         *","         * @attribute type","         * @type String","         */","        type: {","            value: \"pie\"","        }","    }","});","/**"," * The Chart class is the basic application used to create a chart."," *"," * @module charts"," * @class Chart"," * @constructor"," */","function Chart(cfg)","{","    if(cfg.type != \"pie\")","    {","        return new Y.CartesianChart(cfg);","    }","    else","    {","        return new Y.PieChart(cfg);","    }","}","Y.Chart = Chart;","","","}, '@VERSION@', {","    \"requires\": [","        \"dom\",","        \"event-mouseenter\",","        \"event-touch\",","        \"graphics-group\",","        \"axes\",","        \"series-cartesian\",","        \"series-pie\",","        \"series-cartesian-stacked\"","    ]","});"];
_yuitest_coverage["build/charts-base/charts-base.js"].lines = {"1":0,"9":0,"28":0,"46":0,"47":0,"49":0,"61":0,"63":0,"75":0,"91":0,"93":0,"95":0,"97":0,"99":0,"103":0,"105":0,"106":0,"107":0,"108":0,"109":0,"114":0,"116":0,"118":0,"132":0,"136":0,"138":0,"139":0,"144":0,"159":0,"160":0,"175":0,"176":0,"189":0,"196":0,"249":0,"256":0,"257":0,"258":0,"259":0,"260":0,"261":0,"270":0,"279":0,"281":0,"282":0,"283":0,"284":0,"285":0,"286":0,"287":0,"288":0,"289":0,"290":0,"292":0,"294":0,"295":0,"297":0,"300":0,"302":0,"304":0,"306":0,"328":0,"330":0,"332":0,"334":0,"346":0,"348":0,"350":0,"352":0,"365":0,"367":0,"369":0,"399":0,"401":0,"403":0,"407":0,"408":0,"409":0,"410":0,"412":0,"413":0,"415":0,"416":0,"418":0,"420":0,"421":0,"423":0,"424":0,"425":0,"438":0,"443":0,"445":0,"447":0,"448":0,"450":0,"452":0,"453":0,"454":0,"455":0,"456":0,"457":0,"458":0,"459":0,"472":0,"478":0,"479":0,"481":0,"483":0,"484":0,"485":0,"486":0,"487":0,"488":0,"489":0,"490":0,"491":0,"492":0,"493":0,"494":0,"496":0,"568":0,"569":0,"571":0,"575":0,"577":0,"589":0,"594":0,"614":0,"616":0,"617":0,"618":0,"619":0,"620":0,"632":0,"639":0,"641":0,"643":0,"645":0,"646":0,"648":0,"649":0,"652":0,"654":0,"656":0,"658":0,"660":0,"662":0,"664":0,"675":0,"677":0,"678":0,"680":0,"684":0,"685":0,"686":0,"687":0,"688":0,"689":0,"690":0,"692":0,"693":0,"695":0,"696":0,"699":0,"700":0,"702":0,"715":0,"718":0,"720":0,"722":0,"724":0,"725":0,"727":0,"729":0,"743":0,"755":0,"766":0,"768":0,"769":0,"771":0,"773":0,"774":0,"776":0,"778":0,"779":0,"794":0,"795":0,"809":0,"810":0,"823":0,"824":0,"838":0,"843":0,"844":0,"871":0,"887":0,"890":0,"892":0,"894":0,"896":0,"897":0,"898":0,"900":0,"902":0,"906":0,"908":0,"910":0,"913":0,"914":0,"931":0,"934":0,"936":0,"938":0,"940":0,"941":0,"942":0,"944":0,"946":0,"950":0,"952":0,"954":0,"957":0,"958":0,"973":0,"975":0,"976":0,"977":0,"979":0,"995":0,"997":0,"998":0,"999":0,"1001":0,"1017":0,"1019":0,"1020":0,"1021":0,"1023":0,"1073":0,"1075":0,"1087":0,"1088":0,"1090":0,"1092":0,"1097":0,"1098":0,"1100":0,"1102":0,"1117":0,"1122":0,"1123":0,"1124":0,"1139":0,"1140":0,"1142":0,"1144":0,"1159":0,"1161":0,"1162":0,"1164":0,"1243":0,"1320":0,"1330":0,"1332":0,"1334":0,"1347":0,"1348":0,"1350":0,"1363":0,"1367":0,"1368":0,"1370":0,"1382":0,"1384":0,"1386":0,"1388":0,"1392":0,"1395":0,"1410":0,"1412":0,"1414":0,"1416":0,"1427":0,"1430":0,"1432":0,"1434":0,"1466":0,"1468":0,"1475":0,"1477":0,"1478":0,"1480":0,"1482":0,"1484":0,"1486":0,"1507":0,"1519":0,"1551":0,"1552":0,"1553":0,"1554":0,"1563":0,"1567":0,"1568":0,"1569":0,"1570":0,"1571":0,"1573":0,"1575":0,"1587":0,"1590":0,"1591":0,"1592":0,"1593":0,"1594":0,"1595":0,"1596":0,"1597":0,"1598":0,"1599":0,"1600":0,"1601":0,"1602":0,"1603":0,"1604":0,"1605":0,"1617":0,"1620":0,"1621":0,"1622":0,"1623":0,"1624":0,"1625":0,"1634":0,"1643":0,"1644":0,"1645":0,"1646":0,"1647":0,"1656":0,"1657":0,"1660":0,"1662":0,"1663":0,"1664":0,"1665":0,"1668":0,"1671":0,"1672":0,"1673":0,"1675":0,"1677":0,"1679":0,"1681":0,"1683":0,"1685":0,"1686":0,"1692":0,"1693":0,"1694":0,"1695":0,"1696":0,"1697":0,"1700":0,"1702":0,"1704":0,"1708":0,"1709":0,"1712":0,"1714":0,"1715":0,"1716":0,"1718":0,"1719":0,"1724":0,"1725":0,"1728":0,"1730":0,"1734":0,"1736":0,"1738":0,"1740":0,"1742":0,"1743":0,"1745":0,"1748":0,"1763":0,"1776":0,"1778":0,"1780":0,"1782":0,"1784":0,"1785":0,"1880":0,"1904":0,"1908":0,"1909":0,"1910":0,"1912":0,"1913":0,"1915":0,"1916":0,"1918":0,"1920":0,"1922":0,"1923":0,"1925":0,"1927":0,"1929":0,"1945":0,"1946":0,"1948":0,"1952":0,"1967":0,"1969":0,"1971":0,"1972":0,"1973":0,"1974":0,"1975":0,"1988":0,"1993":0,"1995":0,"1996":0,"2007":0,"2009":0,"2010":0,"2011":0,"2012":0,"2013":0,"2024":0,"2028":0,"2030":0,"2032":0,"2033":0,"2034":0,"2047":0,"2061":0,"2063":0,"2064":0,"2065":0,"2067":0,"2069":0,"2071":0,"2075":0,"2077":0,"2079":0,"2082":0,"2084":0,"2096":0,"2107":0,"2109":0,"2113":0,"2116":0,"2117":0,"2120":0,"2121":0,"2122":0,"2123":0,"2124":0,"2125":0,"2126":0,"2127":0,"2128":0,"2129":0,"2130":0,"2131":0,"2132":0,"2133":0,"2134":0,"2135":0,"2136":0,"2137":0,"2161":0,"2169":0,"2171":0,"2172":0,"2174":0,"2176":0,"2179":0,"2181":0,"2182":0,"2184":0,"2185":0,"2186":0,"2187":0,"2188":0,"2189":0,"2190":0,"2192":0,"2194":0,"2197":0,"2226":0,"2229":0,"2230":0,"2231":0,"2233":0,"2235":0,"2236":0,"2237":0,"2238":0,"2239":0,"2241":0,"2243":0,"2244":0,"2256":0,"2258":0,"2262":0,"2264":0,"2266":0,"2283":0,"2284":0,"2286":0,"2288":0,"2290":0,"2292":0,"2294":0,"2296":0,"2308":0,"2313":0,"2315":0,"2316":0,"2318":0,"2320":0,"2324":0,"2337":0,"2341":0,"2343":0,"2345":0,"2346":0,"2348":0,"2350":0,"2353":0,"2356":0,"2365":0,"2372":0,"2378":0,"2379":0,"2380":0,"2381":0,"2382":0,"2383":0,"2385":0,"2388":0,"2389":0,"2391":0,"2392":0,"2393":0,"2394":0,"2395":0,"2396":0,"2397":0,"2398":0,"2399":0,"2401":0,"2402":0,"2415":0,"2445":0,"2446":0,"2448":0,"2449":0,"2453":0,"2454":0,"2456":0,"2457":0,"2459":0,"2460":0,"2462":0,"2464":0,"2466":0,"2469":0,"2471":0,"2472":0,"2474":0,"2476":0,"2477":0,"2480":0,"2481":0,"2483":0,"2484":0,"2485":0,"2486":0,"2488":0,"2490":0,"2492":0,"2494":0,"2496":0,"2497":0,"2498":0,"2499":0,"2503":0,"2534":0,"2536":0,"2550":0,"2582":0,"2584":0,"2586":0,"2588":0,"2601":0,"2602":0,"2604":0,"2605":0,"2607":0,"2620":0,"2622":0,"2624":0,"2626":0,"2639":0,"2659":0,"2660":0,"2662":0,"2663":0,"2664":0,"2665":0,"2669":0,"2670":0,"2671":0,"2672":0,"2674":0,"2675":0,"2677":0,"2678":0,"2679":0,"2681":0,"2682":0,"2684":0,"2685":0,"2686":0,"2690":0,"2695":0,"2698":0,"2700":0,"2701":0,"2703":0,"2704":0,"2705":0,"2706":0,"2708":0,"2710":0,"2713":0,"2715":0,"2717":0,"2718":0,"2720":0,"2721":0,"2723":0,"2724":0,"2727":0,"2728":0,"2729":0,"2730":0,"2732":0,"2733":0,"2735":0,"2737":0,"2739":0,"2741":0,"2743":0,"2745":0,"2747":0,"2750":0,"2752":0,"2754":0,"2755":0,"2756":0,"2758":0,"2770":0,"2775":0,"2777":0,"2778":0,"2780":0,"2783":0,"2785":0,"2786":0,"2788":0,"2803":0,"2806":0,"2807":0,"2820":0,"2824":0,"2826":0,"2828":0,"2832":0,"2834":0,"2836":0,"2837":0,"2839":0,"2840":0,"2846":0,"2862":0,"2864":0,"2866":0,"2868":0,"2870":0,"2886":0,"2888":0,"2892":0,"2906":0,"2935":0,"2937":0,"2939":0,"2940":0,"2942":0,"2946":0,"2947":0,"2948":0,"2949":0,"2951":0,"2953":0,"2955":0,"2956":0,"2958":0,"2960":0,"2961":0,"2963":0,"2965":0,"2970":0,"2972":0,"2975":0,"2977":0,"2978":0,"2980":0,"2982":0,"2983":0,"2985":0,"2987":0,"2990":0,"2994":0,"2995":0,"2996":0,"3000":0,"3002":0,"3003":0,"3005":0,"3007":0,"3011":0,"3022":0,"3029":0,"3031":0,"3033":0,"3035":0,"3037":0,"3038":0,"3040":0,"3042":0,"3043":0,"3045":0,"3047":0,"3048":0,"3050":0,"3051":0,"3052":0,"3054":0,"3058":0,"3060":0,"3061":0,"3063":0,"3065":0,"3079":0,"3081":0,"3093":0,"3105":0,"3107":0,"3108":0,"3110":0,"3112":0,"3114":0,"3116":0,"3118":0,"3122":0,"3124":0,"3126":0,"3128":0,"3130":0,"3133":0,"3135":0,"3137":0,"3139":0,"3141":0,"3145":0,"3147":0,"3149":0,"3151":0,"3153":0,"3167":0,"3168":0,"3170":0,"3172":0,"3185":0,"3204":0,"3206":0,"3207":0,"3211":0,"3212":0,"3214":0,"3216":0,"3218":0,"3220":0,"3221":0,"3222":0,"3223":0,"3225":0,"3226":0,"3227":0,"3229":0,"3230":0,"3232":0,"3234":0,"3236":0,"3240":0,"3241":0,"3243":0,"3244":0,"3246":0,"3248":0,"3250":0,"3252":0,"3254":0,"3256":0,"3262":0,"3263":0,"3265":0,"3267":0,"3268":0,"3270":0,"3271":0,"3273":0,"3276":0,"3278":0,"3280":0,"3282":0,"3285":0,"3287":0,"3290":0,"3292":0,"3294":0,"3296":0,"3297":0,"3299":0,"3301":0,"3303":0,"3307":0,"3310":0,"3312":0,"3314":0,"3316":0,"3317":0,"3319":0,"3321":0,"3323":0,"3338":0,"3341":0,"3343":0,"3345":0,"3347":0,"3349":0,"3351":0,"3356":0,"3358":0,"3362":0,"3366":0,"3397":0,"3403":0,"3405":0,"3410":0,"3418":0,"3423":0,"3429":0,"3430":0,"3431":0,"3432":0,"3433":0,"3445":0,"3447":0,"3450":0,"3452":0,"3454":0,"3470":0,"3474":0,"3476":0,"3477":0,"3479":0,"3480":0,"3483":0,"3485":0,"3486":0,"3487":0,"3489":0,"3490":0,"3493":0,"3508":0,"3512":0,"3514":0,"3515":0,"3517":0,"3518":0,"3521":0,"3523":0,"3524":0,"3525":0,"3527":0,"3528":0,"3531":0,"3546":0,"3550":0,"3552":0,"3553":0,"3555":0,"3556":0,"3559":0,"3561":0,"3562":0,"3563":0,"3565":0,"3566":0,"3569":0,"3584":0,"3588":0,"3590":0,"3591":0,"3593":0,"3594":0,"3597":0,"3599":0,"3600":0,"3601":0,"3603":0,"3604":0,"3607":0,"3618":0,"3620":0,"3621":0,"3623":0,"3624":0,"3625":0,"3655":0,"3657":0,"3658":0,"3659":0,"3661":0,"3662":0,"3665":0,"3667":0,"3668":0,"3669":0,"3670":0,"3672":0,"3673":0,"3676":0,"3678":0,"3679":0,"3680":0,"3682":0,"3683":0,"3686":0,"3688":0,"3689":0,"3690":0,"3692":0,"3693":0,"3697":0,"3698":0,"3699":0,"3700":0,"3701":0,"3702":0,"3703":0,"3705":0,"3706":0,"3707":0,"3708":0,"3710":0,"3711":0,"3713":0,"3714":0,"3716":0,"3717":0,"3718":0,"3720":0,"3725":0,"3726":0,"3728":0,"3729":0,"3731":0,"3732":0,"3733":0,"3735":0,"3740":0,"3741":0,"3743":0,"3744":0,"3746":0,"3747":0,"3748":0,"3750":0,"3755":0,"3756":0,"3758":0,"3759":0,"3761":0,"3762":0,"3763":0,"3765":0,"3770":0,"3771":0,"3772":0,"3773":0,"3774":0,"3776":0,"3777":0,"3778":0,"3780":0,"3781":0,"3783":0,"3785":0,"3786":0,"3788":0,"3790":0,"3793":0,"3795":0,"3796":0,"3797":0,"3799":0,"3800":0,"3802":0,"3804":0,"3805":0,"3807":0,"3809":0,"3812":0,"3814":0,"3815":0,"3816":0,"3818":0,"3819":0,"3820":0,"3821":0,"3823":0,"3826":0,"3828":0,"3831":0,"3833":0,"3834":0,"3835":0,"3837":0,"3838":0,"3839":0,"3840":0,"3842":0,"3845":0,"3847":0,"3850":0,"3851":0,"3853":0,"3854":0,"3856":0,"3858":0,"3859":0,"3860":0,"3861":0,"3862":0,"3865":0,"3867":0,"3868":0,"3869":0,"3870":0,"3883":0,"3889":0,"3891":0,"3892":0,"3894":0,"3896":0,"3897":0,"3899":0,"3900":0,"3902":0,"3904":0,"3907":0,"3908":0,"3910":0,"3912":0,"3915":0,"3917":0,"3919":0,"3921":0,"3922":0,"3924":0,"3926":0,"3927":0,"3940":0,"3950":0,"3952":0,"3954":0,"3956":0,"3958":0,"3960":0,"3962":0,"3966":0,"3968":0,"3969":0,"3970":0,"3974":0,"3976":0,"3977":0,"3981":0,"3982":0,"3983":0,"3984":0,"3986":0,"3987":0,"3989":0,"3991":0,"3993":0,"3995":0,"3996":0,"3997":0,"3998":0,"3999":0,"4001":0,"4002":0,"4006":0,"4008":0,"4010":0,"4034":0,"4037":0,"4039":0,"4041":0,"4043":0,"4045":0,"4047":0,"4051":0,"4056":0,"4058":0,"4060":0,"4062":0,"4078":0,"4082":0,"4084":0,"4085":0,"4087":0,"4088":0,"4090":0,"4092":0,"4097":0,"4102":0,"4106":0,"4108":0,"4109":0,"4110":0,"4112":0,"4114":0,"4119":0,"4121":0,"4123":0,"4124":0,"4141":0,"4142":0,"4144":0,"4146":0,"4151":0,"4152":0,"4184":0,"4189":0,"4193":0,"4195":0,"4197":0,"4201":0,"4204":0,"4206":0,"4208":0,"4212":0,"4215":0,"4217":0,"4234":0,"4236":0,"4238":0,"4254":0,"4256":0,"4258":0,"4319":0,"4320":0,"4322":0,"4324":0,"4326":0,"4328":0,"4333":0,"4334":0,"4391":0,"4392":0,"4394":0,"4396":0,"4400":0,"4401":0,"4403":0,"4405":0,"4407":0,"4411":0,"4425":0,"4426":0,"4428":0,"4430":0,"4434":0,"4435":0,"4437":0,"4439":0,"4441":0,"4445":0,"4459":0,"4461":0,"4463":0,"4468":0,"4470":0,"4472":0,"4477":0,"4479":0,"4482":0,"4483":0,"4504":0,"4514":0,"4516":0,"4518":0,"4529":0,"4531":0,"4532":0,"4533":0,"4534":0,"4536":0,"4537":0,"4538":0,"4539":0,"4540":0,"4543":0,"4544":0,"4557":0,"4559":0,"4561":0,"4566":0,"4568":0,"4569":0,"4571":0,"4573":0,"4574":0,"4576":0,"4578":0,"4580":0,"4581":0,"4582":0,"4583":0,"4584":0,"4586":0,"4588":0,"4589":0,"4590":0,"4591":0,"4592":0,"4593":0,"4594":0,"4595":0,"4608":0,"4612":0,"4614":0,"4615":0,"4617":0,"4619":0,"4621":0,"4623":0,"4625":0,"4626":0,"4627":0,"4629":0,"4633":0,"4635":0,"4648":0,"4650":0,"4651":0,"4652":0,"4653":0,"4654":0,"4655":0,"4656":0,"4668":0,"4673":0,"4675":0,"4676":0,"4680":0,"4682":0,"4683":0,"4685":0,"4687":0,"4688":0,"4690":0,"4692":0,"4694":0,"4695":0,"4696":0,"4698":0,"4713":0,"4716":0,"4738":0,"4748":0,"4749":0,"4750":0,"4762":0,"4773":0,"4777":0,"4779":0,"4780":0,"4781":0,"4811":0,"4814":0,"4816":0,"4817":0,"4819":0,"4820":0,"4821":0,"4833":0,"4845":0,"4846":0,"4847":0,"4848":0,"4850":0,"4852":0,"4854":0,"4856":0,"4857":0,"4858":0,"4859":0,"4860":0,"4861":0,"4862":0,"4864":0,"4865":0,"4866":0,"4870":0,"4872":0,"4873":0,"4888":0,"4890":0,"4891":0,"4893":0,"4906":0,"4911":0,"4925":0,"4930":0,"4952":0,"4954":0,"4956":0,"4960":0,"4963":0};
_yuitest_coverage["build/charts-base/charts-base.js"].functions = {"remove:44":0,"draw:59":0,"_drawGridlines:73":0,"_getPoints:130":0,"_horizontalLine:157":0,"_verticalLine:173":0,"_getDefaultStyles:187":0,"bindUI:254":0,"syncUI:268":0,"getSeriesByIndex:326":0,"getSeriesByKey:344":0,"addDispatcher:363":0,"_parseSeriesCollection:397":0,"_addSeries:436":0,"_createSeries:470":0,"_getSeries:566":0,"_markerEventHandler:587":0,"_updateStyles:612":0,"_sizeChangeHandler:630":0,"_drawSeries:673":0,"_drawingCompleteHandler:713":0,"_getDefaultStyles:741":0,"destructor:764":0,"setter:792":0,"setter:807":0,"getter:822":0,"getter:836":0,"setter:841":0,"getter:869":0,"setter:885":0,"setter:929":0,"getter:971":0,"getter:993":0,"getter:1015":0,"ChartBase:1073":0,"valueFn:1085":0,"setter:1095":0,"getter:1115":0,"setter:1120":0,"setter:1137":0,"setter:1157":0,"setter:1241":0,"_groupMarkersChangeHandler:1328":0,"_itemRendered:1345":0,"(anonymous 2):1367":0,"_getGraph:1361":0,"getSeries:1380":0,"getAxisByKey:1408":0,"getCategoryAxis:1425":0,"_setDataValues:1464":0,"_setSeriesCollection:1505":0,"_getAxisClass:1517":0,"initializer:1549":0,"renderUI:1561":0,"_setAriaElements:1585":0,"_getAriaOffscreenNode:1615":0,"syncUI:1632":0,"(anonymous 3):1656":0,"(anonymous 4):1677":0,"(anonymous 5):1714":0,"bindUI:1641":0,"_markerEventDispatcher:1761":0,"_dataProviderChangeHandler:1902":0,"toggleTooltip:1943":0,"_showTooltip:1965":0,"_positionTooltip:1986":0,"hideTooltip:2005":0,"_addTooltip:2022":0,"_updateTooltip:2045":0,"markerEventHandler:2105":0,"planarEventHandler:2111":0,"_getTooltip:2094":0,"_planarLabelFunction:2159":0,"_tooltipLabelFunction:2224":0,"_tooltipChangeHandler:2254":0,"_setText:2281":0,"_getAllKeys:2306":0,"_buildSeriesKeys:2335":0,"renderUI:2370":0,"_planarEventDispatcher:2413":0,"_addToAxesRenderQueue:2580":0,"_addToAxesCollection:2599":0,"_getDefaultSeriesCollection:2618":0,"_parseSeriesCollection:2637":0,"_parseSeriesAxes:2768":0,"_getCategoryAxis:2801":0,"_getSeriesAxis:2818":0,"_getBaseAttribute:2860":0,"_setBaseAttribute:2884":0,"_setAxes:2904":0,"_addAxes:3020":0,"_addSeries:3077":0,"_addGridlines:3091":0,"_getDefaultAxes:3165":0,"_parseAxes:3183":0,"_getDefaultAxisPosition:3336":0,"getSeriesItems:3395":0,"_sizeChanged:3443":0,"_getTopOverflow:3468":0,"_getRightOverflow:3506":0,"_getLeftOverflow:3544":0,"_getBottomOverflow:3582":0,"_redraw:3616":0,"destructor:3881":0,"_getAriaMessage:3938":0,"getter:4032":0,"setter:4054":0,"getter:4076":0,"setter:4100":0,"getter:4139":0,"setter:4149":0,"getter:4182":0,"setter:4191":0,"setter:4232":0,"setter:4252":0,"getter:4317":0,"setter:4331":0,"getter:4389":0,"setter:4398":0,"getter:4423":0,"setter:4432":0,"getter:4457":0,"setter:4466":0,"_getSeriesCollection:4512":0,"_parseAxes:4555":0,"_addAxes:4606":0,"_addSeries:4646":0,"_parseSeriesAxes:4666":0,"_getDefaultAxes:4711":0,"getSeriesItems:4736":0,"_sizeChanged:4760":0,"_redraw:4771":0,"_tooltipLabelFunction:4809":0,"_getAriaMessage:4831":0,"setter:4886":0,"getter:4904":0,"setter:4909":0,"getter:4923":0,"setter:4928":0,"Chart:4952":0,"(anonymous 1):1":0};
_yuitest_coverage["build/charts-base/charts-base.js"].coveredLines = 1349;
_yuitest_coverage["build/charts-base/charts-base.js"].coveredFunctions = 141;
_yuitest_coverline("build/charts-base/charts-base.js", 1);
YUI.add('charts-base', function (Y, NAME) {

/**
 * Provides functionality for creating charts.
 *
 * @module charts
 * @submodule charts-base
 */
_yuitest_coverfunc("build/charts-base/charts-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/charts-base/charts-base.js", 9);
var CONFIG = Y.config,
    WINDOW = CONFIG.win,
    DOCUMENT = CONFIG.doc,
    Y_Lang = Y.Lang,
    IS_STRING = Y_Lang.isString,
    Y_DOM = Y.DOM,
    _getClassName = Y.ClassNameManager.getClassName,
    SERIES_MARKER = _getClassName("seriesmarker");

/**
 * Gridlines draws gridlines on a Graph.
 *
 * @module charts
 * @submodule charts-base
 * @class Gridlines
 * @constructor
 * @extends Base
 * @uses Renderer
 */
_yuitest_coverline("build/charts-base/charts-base.js", 28);
Y.Gridlines = Y.Base.create("gridlines", Y.Base, [Y.Renderer], {
    /**
     * Reference to the `Path` element used for drawing Gridlines.
     *
     * @property _path
     * @type Path
     * @private
     */
    _path: null,

    /**
     * Removes the Gridlines.
     *
     * @method remove
     * @private
     */
    remove: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "remove", 44);
_yuitest_coverline("build/charts-base/charts-base.js", 46);
var path = this._path;
        _yuitest_coverline("build/charts-base/charts-base.js", 47);
if(path)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 49);
path.destroy();
        }
    },

    /**
     * Draws the gridlines
     *
     * @method draw
     * @protected
     */
    draw: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "draw", 59);
_yuitest_coverline("build/charts-base/charts-base.js", 61);
if(this.get("axis") && this.get("graph"))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 63);
this._drawGridlines();
        }
    },

    /**
     * Algorithm for drawing gridlines
     *
     * @method _drawGridlines
     * @private
     */
    _drawGridlines: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_drawGridlines", 73);
_yuitest_coverline("build/charts-base/charts-base.js", 75);
var path,
            axis = this.get("axis"),
            axisPosition = axis.get("position"),
            points,
            i = 0,
            l,
            direction = this.get("direction"),
            graph = this.get("graph"),
            w = graph.get("width"),
            h = graph.get("height"),
            line = this.get("styles").line,
            color = line.color,
            weight = line.weight,
            alpha = line.alpha,
            count = this.get("count"),
            lineFunction = direction == "vertical" ? this._verticalLine : this._horizontalLine;
        _yuitest_coverline("build/charts-base/charts-base.js", 91);
if(isFinite(w) && isFinite(h) && w > 0 && h > 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 93);
if(count && Y.Lang.isNumber(count))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 95);
points = this._getPoints(count, w, h);
            }
            else {_yuitest_coverline("build/charts-base/charts-base.js", 97);
if(axisPosition != "none" && axis && axis.get("tickPoints"))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 99);
points = axis.get("tickPoints");
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 103);
points = this._getPoints(axis.get("styles").majorUnit.count, w, h);
            }}
            _yuitest_coverline("build/charts-base/charts-base.js", 105);
l = points.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 106);
path = graph.get("gridlines");
            _yuitest_coverline("build/charts-base/charts-base.js", 107);
path.set("width", w);
            _yuitest_coverline("build/charts-base/charts-base.js", 108);
path.set("height", h);
            _yuitest_coverline("build/charts-base/charts-base.js", 109);
path.set("stroke", {
                weight: weight,
                color: color,
                opacity: alpha
            });
            _yuitest_coverline("build/charts-base/charts-base.js", 114);
for(i = 0; i < l; i = i + 1)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 116);
lineFunction(path, points[i], w, h);
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 118);
path.end();
        }
    },

    /**
     * Calculates the coordinates for the gridlines based on a count.
     *
     * @method _getPoints
     * @param {Number} count Number of gridlines
     * @return Array
     * @private
     */
    _getPoints: function(count, w, h)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getPoints", 130);
_yuitest_coverline("build/charts-base/charts-base.js", 132);
var i,
            points = [],
            multiplier,
            divisor = count - 1;
        _yuitest_coverline("build/charts-base/charts-base.js", 136);
for(i = 0; i < count; i = i + 1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 138);
multiplier = i/divisor;
            _yuitest_coverline("build/charts-base/charts-base.js", 139);
points[i] = {
                x: w * multiplier,
                y: h * multiplier
            };
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 144);
return points;
    },

    /**
     * Algorithm for horizontal lines.
     *
     * @method _horizontalLine
     * @param {Path} path Reference to path element
     * @param {Object} pt Coordinates corresponding to a major unit of an axis.
     * @param {Number} w Width of the Graph
     * @param {Number} h Height of the Graph
     * @private
     */
    _horizontalLine: function(path, pt, w, h)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_horizontalLine", 157);
_yuitest_coverline("build/charts-base/charts-base.js", 159);
path.moveTo(0, pt.y);
        _yuitest_coverline("build/charts-base/charts-base.js", 160);
path.lineTo(w, pt.y);
    },

    /**
     * Algorithm for vertical lines.
     *
     * @method _verticalLine
     * @param {Path} path Reference to path element
     * @param {Object} pt Coordinates corresponding to a major unit of an axis.
     * @param {Number} w Width of the Graph
     * @param {Number} h Height of the Graph
     * @private
     */
    _verticalLine: function(path, pt, w, h)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_verticalLine", 173);
_yuitest_coverline("build/charts-base/charts-base.js", 175);
path.moveTo(pt.x, 0);
        _yuitest_coverline("build/charts-base/charts-base.js", 176);
path.lineTo(pt.x, h);
    },

    /**
     * Gets the default value for the `styles` attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     * @protected
     */
    _getDefaultStyles: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getDefaultStyles", 187);
_yuitest_coverline("build/charts-base/charts-base.js", 189);
var defs = {
            line: {
                color:"#f0efe9",
                weight: 1,
                alpha: 1
            }
        };
        _yuitest_coverline("build/charts-base/charts-base.js", 196);
return defs;
    }

},
{
    ATTRS: {
        /**
         * Indicates the direction of the gridline.
         *
         * @attribute direction
         * @type String
         */
        direction: {},

        /**
         * Indicate the `Axis` in which to bind
         * the gridlines.
         *
         * @attribute axis
         * @type Axis
         */
        axis: {},

        /**
         * Indicates the `Graph` in which the gridlines
         * are drawn.
         *
         * @attribute graph
         * @type Graph
         */
        graph: {},

        /**
         * Indicates the number of gridlines to display. If no value is set, gridlines will equal the number of ticks in
         * the corresponding axis.
         *
         * @attribute count
         * @type Number
         */
        count: {}
    }
});
/**
 * Graph manages and contains series instances for a `CartesianChart`
 * instance.
 *
 * @module charts
 * @submodule charts-base
 * @class Graph
 * @constructor
 * @extends Widget
 * @uses Renderer
 */
_yuitest_coverline("build/charts-base/charts-base.js", 249);
Y.Graph = Y.Base.create("graph", Y.Widget, [Y.Renderer], {
    /**
     * @method bindUI
     * @private
     */
    bindUI: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "bindUI", 254);
_yuitest_coverline("build/charts-base/charts-base.js", 256);
var bb = this.get("boundingBox");
        _yuitest_coverline("build/charts-base/charts-base.js", 257);
bb.setStyle("position", "absolute");
        _yuitest_coverline("build/charts-base/charts-base.js", 258);
this.after("widthChange", this._sizeChangeHandler);
        _yuitest_coverline("build/charts-base/charts-base.js", 259);
this.after("heightChange", this._sizeChangeHandler);
        _yuitest_coverline("build/charts-base/charts-base.js", 260);
this.after("stylesChange", this._updateStyles);
        _yuitest_coverline("build/charts-base/charts-base.js", 261);
this.after("groupMarkersChange", this._drawSeries);
    },

    /**
     * @method syncUI
     * @private
     */
    syncUI: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "syncUI", 268);
_yuitest_coverline("build/charts-base/charts-base.js", 270);
var background,
            cb,
            bg,
            sc = this.get("seriesCollection"),
            series,
            i = 0,
            len = sc ? sc.length : 0,
            hgl = this.get("horizontalGridlines"),
            vgl = this.get("verticalGridlines");
        _yuitest_coverline("build/charts-base/charts-base.js", 279);
if(this.get("showBackground"))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 281);
background = this.get("background");
            _yuitest_coverline("build/charts-base/charts-base.js", 282);
cb = this.get("contentBox");
            _yuitest_coverline("build/charts-base/charts-base.js", 283);
bg = this.get("styles").background;
            _yuitest_coverline("build/charts-base/charts-base.js", 284);
bg.stroke = bg.border;
            _yuitest_coverline("build/charts-base/charts-base.js", 285);
bg.stroke.opacity = bg.stroke.alpha;
            _yuitest_coverline("build/charts-base/charts-base.js", 286);
bg.fill.opacity = bg.fill.alpha;
            _yuitest_coverline("build/charts-base/charts-base.js", 287);
bg.width = this.get("width");
            _yuitest_coverline("build/charts-base/charts-base.js", 288);
bg.height = this.get("height");
            _yuitest_coverline("build/charts-base/charts-base.js", 289);
bg.type = bg.shape;
            _yuitest_coverline("build/charts-base/charts-base.js", 290);
background.set(bg);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 292);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 294);
series = sc[i];
            _yuitest_coverline("build/charts-base/charts-base.js", 295);
if(series instanceof Y.CartesianSeries)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 297);
series.render();
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 300);
if(hgl && hgl instanceof Y.Gridlines)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 302);
hgl.draw();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 304);
if(vgl && vgl instanceof Y.Gridlines)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 306);
vgl.draw();
        }
    },

    /**
     * Object of arrays containing series mapped to a series type.
     *
     * @property seriesTypes
     * @type Object
     * @private
     */
    seriesTypes: null,

    /**
     * Returns a series instance based on an index.
     *
     * @method getSeriesByIndex
     * @param {Number} val index of the series
     * @return CartesianSeries
     */
    getSeriesByIndex: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "getSeriesByIndex", 326);
_yuitest_coverline("build/charts-base/charts-base.js", 328);
var col = this.get("seriesCollection"),
            series;
        _yuitest_coverline("build/charts-base/charts-base.js", 330);
if(col && col.length > val)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 332);
series = col[val];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 334);
return series;
    },

    /**
     * Returns a series instance based on a key value.
     *
     * @method getSeriesByKey
     * @param {String} val key value of the series
     * @return CartesianSeries
     */
    getSeriesByKey: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "getSeriesByKey", 344);
_yuitest_coverline("build/charts-base/charts-base.js", 346);
var obj = this._seriesDictionary,
            series;
        _yuitest_coverline("build/charts-base/charts-base.js", 348);
if(obj && obj.hasOwnProperty(val))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 350);
series = obj[val];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 352);
return series;
    },

    /**
     * Adds dispatcher to a `_dispatcher` used to
     * to ensure all series have redrawn before for firing event.
     *
     * @method addDispatcher
     * @param {CartesianSeries} val series instance to add
     * @protected
     */
    addDispatcher: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "addDispatcher", 363);
_yuitest_coverline("build/charts-base/charts-base.js", 365);
if(!this._dispatchers)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 367);
this._dispatchers = [];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 369);
this._dispatchers.push(val);
    },

    /**
     * Collection of series to be displayed in the graph.
     *
     * @property _seriesCollection
     * @type Array
     * @private
     */
    _seriesCollection: null,

    /**
     * Object containing key value pairs of `CartesianSeries` instances.
     *
     * @property _seriesDictionary
     * @type Object
     * @private
     */
    _seriesDictionary: null,

    /**
     * Parses series instances to be displayed in the graph.
     *
     * @method _parseSeriesCollection
     * @param {Array} Collection of `CartesianSeries` instances or objects container `CartesianSeries` attributes values.
     * @private
     */
    _parseSeriesCollection: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_parseSeriesCollection", 397);
_yuitest_coverline("build/charts-base/charts-base.js", 399);
if(!val)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 401);
return;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 403);
var len = val.length,
            i = 0,
            series,
            seriesKey;
        _yuitest_coverline("build/charts-base/charts-base.js", 407);
this._seriesCollection = [];
        _yuitest_coverline("build/charts-base/charts-base.js", 408);
this._seriesDictionary = {};
        _yuitest_coverline("build/charts-base/charts-base.js", 409);
this.seriesTypes = [];
        _yuitest_coverline("build/charts-base/charts-base.js", 410);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 412);
series = val[i];
            _yuitest_coverline("build/charts-base/charts-base.js", 413);
if(!(series instanceof Y.CartesianSeries) && !(series instanceof Y.PieSeries))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 415);
this._createSeries(series);
                _yuitest_coverline("build/charts-base/charts-base.js", 416);
continue;
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 418);
this._addSeries(series);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 420);
len = this._seriesCollection.length;
        _yuitest_coverline("build/charts-base/charts-base.js", 421);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 423);
series = this.get("seriesCollection")[i];
            _yuitest_coverline("build/charts-base/charts-base.js", 424);
seriesKey = series.get("direction") == "horizontal" ? "yKey" : "xKey";
            _yuitest_coverline("build/charts-base/charts-base.js", 425);
this._seriesDictionary[series.get(seriesKey)] = series;
        }
    },

    /**
     * Adds a series to the graph.
     *
     * @method _addSeries
     * @param {CartesianSeries} series Series to add to the graph.
     * @private
     */
    _addSeries: function(series)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addSeries", 436);
_yuitest_coverline("build/charts-base/charts-base.js", 438);
var type = series.get("type"),
            seriesCollection = this.get("seriesCollection"),
            graphSeriesLength = seriesCollection.length,
            seriesTypes = this.seriesTypes,
            typeSeriesCollection;
        _yuitest_coverline("build/charts-base/charts-base.js", 443);
if(!series.get("graph"))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 445);
series.set("graph", this);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 447);
seriesCollection.push(series);
        _yuitest_coverline("build/charts-base/charts-base.js", 448);
if(!seriesTypes.hasOwnProperty(type))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 450);
this.seriesTypes[type] = [];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 452);
typeSeriesCollection = this.seriesTypes[type];
        _yuitest_coverline("build/charts-base/charts-base.js", 453);
series.set("graphOrder", graphSeriesLength);
        _yuitest_coverline("build/charts-base/charts-base.js", 454);
series.set("order", typeSeriesCollection.length);
        _yuitest_coverline("build/charts-base/charts-base.js", 455);
typeSeriesCollection.push(series);
        _yuitest_coverline("build/charts-base/charts-base.js", 456);
series.set("seriesTypeCollection", typeSeriesCollection);
        _yuitest_coverline("build/charts-base/charts-base.js", 457);
this.addDispatcher(series);
        _yuitest_coverline("build/charts-base/charts-base.js", 458);
series.after("drawingComplete", Y.bind(this._drawingCompleteHandler, this));
        _yuitest_coverline("build/charts-base/charts-base.js", 459);
this.fire("seriesAdded", series);
    },

    /**
     * Creates a `CartesianSeries` instance from an object containing attribute key value pairs. The key value pairs include
     * attributes for the specific series and a type value which defines the type of series to be used.
     *
     * @method createSeries
     * @param {Object} seriesData Series attribute key value pairs.
     * @private
     */
    _createSeries: function(seriesData)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_createSeries", 470);
_yuitest_coverline("build/charts-base/charts-base.js", 472);
var type = seriesData.type,
            seriesCollection = this.get("seriesCollection"),
            seriesTypes = this.seriesTypes,
            typeSeriesCollection,
            seriesType,
            series;
            _yuitest_coverline("build/charts-base/charts-base.js", 478);
seriesData.graph = this;
        _yuitest_coverline("build/charts-base/charts-base.js", 479);
if(!seriesTypes.hasOwnProperty(type))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 481);
seriesTypes[type] = [];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 483);
typeSeriesCollection = seriesTypes[type];
        _yuitest_coverline("build/charts-base/charts-base.js", 484);
seriesData.graph = this;
        _yuitest_coverline("build/charts-base/charts-base.js", 485);
seriesData.order = typeSeriesCollection.length;
        _yuitest_coverline("build/charts-base/charts-base.js", 486);
seriesData.graphOrder = seriesCollection.length;
        _yuitest_coverline("build/charts-base/charts-base.js", 487);
seriesType = this._getSeries(seriesData.type);
        _yuitest_coverline("build/charts-base/charts-base.js", 488);
series = new seriesType(seriesData);
        _yuitest_coverline("build/charts-base/charts-base.js", 489);
this.addDispatcher(series);
        _yuitest_coverline("build/charts-base/charts-base.js", 490);
series.after("drawingComplete", Y.bind(this._drawingCompleteHandler, this));
        _yuitest_coverline("build/charts-base/charts-base.js", 491);
typeSeriesCollection.push(series);
        _yuitest_coverline("build/charts-base/charts-base.js", 492);
seriesCollection.push(series);
        _yuitest_coverline("build/charts-base/charts-base.js", 493);
series.set("seriesTypeCollection", typeSeriesCollection);
        _yuitest_coverline("build/charts-base/charts-base.js", 494);
if(this.get("rendered"))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 496);
series.render();
        }
    },

    /**
     * String reference for pre-defined `Series` classes.
     *
     * @property _seriesMap
     * @type Object
     * @private
     */
    _seriesMap: {
        line : Y.LineSeries,
        column : Y.ColumnSeries,
        bar : Y.BarSeries,
        area :  Y.AreaSeries,
        candlestick : Y.CandlestickSeries,
        ohlc : Y.OHLCSeries,
        stackedarea : Y.StackedAreaSeries,
        stackedline : Y.StackedLineSeries,
        stackedcolumn : Y.StackedColumnSeries,
        stackedbar : Y.StackedBarSeries,
        markerseries : Y.MarkerSeries,
        spline : Y.SplineSeries,
        areaspline : Y.AreaSplineSeries,
        stackedspline : Y.StackedSplineSeries,
        stackedareaspline : Y.StackedAreaSplineSeries,
        stackedmarkerseries : Y.StackedMarkerSeries,
        pie : Y.PieSeries,
        combo : Y.ComboSeries,
        stackedcombo : Y.StackedComboSeries,
        combospline : Y.ComboSplineSeries,
        stackedcombospline : Y.StackedComboSplineSeries
    },

    /**
     * Returns a specific `CartesianSeries` class based on key value from a look up table of a direct reference to a
     * class. When specifying a key value, the following options are available:
     *
     *  <table>
     *      <tr><th>Key Value</th><th>Class</th></tr>
     *      <tr><td>line</td><td>Y.LineSeries</td></tr>
     *      <tr><td>column</td><td>Y.ColumnSeries</td></tr>
     *      <tr><td>bar</td><td>Y.BarSeries</td></tr>
     *      <tr><td>area</td><td>Y.AreaSeries</td></tr>
     *      <tr><td>stackedarea</td><td>Y.StackedAreaSeries</td></tr>
     *      <tr><td>stackedline</td><td>Y.StackedLineSeries</td></tr>
     *      <tr><td>stackedcolumn</td><td>Y.StackedColumnSeries</td></tr>
     *      <tr><td>stackedbar</td><td>Y.StackedBarSeries</td></tr>
     *      <tr><td>markerseries</td><td>Y.MarkerSeries</td></tr>
     *      <tr><td>spline</td><td>Y.SplineSeries</td></tr>
     *      <tr><td>areaspline</td><td>Y.AreaSplineSeries</td></tr>
     *      <tr><td>stackedspline</td><td>Y.StackedSplineSeries</td></tr>
     *      <tr><td>stackedareaspline</td><td>Y.StackedAreaSplineSeries</td></tr>
     *      <tr><td>stackedmarkerseries</td><td>Y.StackedMarkerSeries</td></tr>
     *      <tr><td>pie</td><td>Y.PieSeries</td></tr>
     *      <tr><td>combo</td><td>Y.ComboSeries</td></tr>
     *      <tr><td>stackedcombo</td><td>Y.StackedComboSeries</td></tr>
     *      <tr><td>combospline</td><td>Y.ComboSplineSeries</td></tr>
     *      <tr><td>stackedcombospline</td><td>Y.StackedComboSplineSeries</td></tr>
     *  </table>
     *
     * When referencing a class directly, you can specify any of the above classes or any custom class that extends
     * `CartesianSeries` or `PieSeries`.
     *
     * @method _getSeries
     * @param {String | Object} type Series type.
     * @return CartesianSeries
     * @private
     */
    _getSeries: function(type)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getSeries", 566);
_yuitest_coverline("build/charts-base/charts-base.js", 568);
var seriesClass;
        _yuitest_coverline("build/charts-base/charts-base.js", 569);
if(Y_Lang.isString(type))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 571);
seriesClass = this._seriesMap[type];
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 575);
seriesClass = type;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 577);
return seriesClass;
    },

    /**
     * Event handler for marker events.
     *
     * @method _markerEventHandler
     * @param {Object} e Event object.
     * @private
     */
    _markerEventHandler: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_markerEventHandler", 587);
_yuitest_coverline("build/charts-base/charts-base.js", 589);
var type = e.type,
            markerNode = e.currentTarget,
            strArr = markerNode.getAttribute("id").split("_"),
            series = this.getSeriesByIndex(strArr[1]),
            index = strArr[2];
        _yuitest_coverline("build/charts-base/charts-base.js", 594);
series.updateMarkerState(type, index);
    },

    /**
     * Collection of `CartesianSeries` instances to be redrawn.
     *
     * @property _dispatchers
     * @type Array
     * @private
     */
    _dispatchers: null,

    /**
     * Updates the `Graph` styles.
     *
     * @method _updateStyles
     * @private
     */
    _updateStyles: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_updateStyles", 612);
_yuitest_coverline("build/charts-base/charts-base.js", 614);
var styles = this.get("styles").background,
            border = styles.border;
            _yuitest_coverline("build/charts-base/charts-base.js", 616);
border.opacity = border.alpha;
            _yuitest_coverline("build/charts-base/charts-base.js", 617);
styles.stroke = border;
            _yuitest_coverline("build/charts-base/charts-base.js", 618);
styles.fill.opacity = styles.fill.alpha;
        _yuitest_coverline("build/charts-base/charts-base.js", 619);
this.get("background").set(styles);
        _yuitest_coverline("build/charts-base/charts-base.js", 620);
this._sizeChangeHandler();
    },

    /**
     * Event handler for size changes.
     *
     * @method _sizeChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _sizeChangeHandler: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_sizeChangeHandler", 630);
_yuitest_coverline("build/charts-base/charts-base.js", 632);
var hgl = this.get("horizontalGridlines"),
            vgl = this.get("verticalGridlines"),
            w = this.get("width"),
            h = this.get("height"),
            bg = this.get("styles").background,
            weight,
            background;
        _yuitest_coverline("build/charts-base/charts-base.js", 639);
if(bg && bg.border)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 641);
weight = bg.border.weight || 0;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 643);
if(this.get("showBackground"))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 645);
background = this.get("background");
            _yuitest_coverline("build/charts-base/charts-base.js", 646);
if(w && h)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 648);
background.set("width", w);
                _yuitest_coverline("build/charts-base/charts-base.js", 649);
background.set("height", h);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 652);
if(this._gridlines)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 654);
this._gridlines.clear();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 656);
if(hgl && hgl instanceof Y.Gridlines)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 658);
hgl.draw();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 660);
if(vgl && vgl instanceof Y.Gridlines)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 662);
vgl.draw();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 664);
this._drawSeries();
    },

    /**
     * Draws each series.
     *
     * @method _drawSeries
     * @private
     */
    _drawSeries: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_drawSeries", 673);
_yuitest_coverline("build/charts-base/charts-base.js", 675);
if(this._drawing)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 677);
this._callLater = true;
            _yuitest_coverline("build/charts-base/charts-base.js", 678);
return;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 680);
var sc,
            i,
            len,
            graphic = this.get("graphic");
        _yuitest_coverline("build/charts-base/charts-base.js", 684);
graphic.set("autoDraw", false);
        _yuitest_coverline("build/charts-base/charts-base.js", 685);
this._callLater = false;
        _yuitest_coverline("build/charts-base/charts-base.js", 686);
this._drawing = true;
        _yuitest_coverline("build/charts-base/charts-base.js", 687);
sc = this.get("seriesCollection");
        _yuitest_coverline("build/charts-base/charts-base.js", 688);
i = 0;
        _yuitest_coverline("build/charts-base/charts-base.js", 689);
len = sc ? sc.length : 0;
        _yuitest_coverline("build/charts-base/charts-base.js", 690);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 692);
sc[i].draw();
            _yuitest_coverline("build/charts-base/charts-base.js", 693);
if((!sc[i].get("xcoords") || !sc[i].get("ycoords")) && !sc[i] instanceof Y.PieSeries)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 695);
this._callLater = true;
                _yuitest_coverline("build/charts-base/charts-base.js", 696);
break;
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 699);
this._drawing = false;
        _yuitest_coverline("build/charts-base/charts-base.js", 700);
if(this._callLater)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 702);
this._drawSeries();
        }
    },

    /**
     * Event handler for series drawingComplete event.
     *
     * @method _drawingCompleteHandler
     * @param {Object} e Event object.
     * @private
     */
    _drawingCompleteHandler: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_drawingCompleteHandler", 713);
_yuitest_coverline("build/charts-base/charts-base.js", 715);
var series = e.currentTarget,
            graphic,
            index = Y.Array.indexOf(this._dispatchers, series);
        _yuitest_coverline("build/charts-base/charts-base.js", 718);
if(index > -1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 720);
this._dispatchers.splice(index, 1);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 722);
if(this._dispatchers.length < 1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 724);
graphic = this.get("graphic");
            _yuitest_coverline("build/charts-base/charts-base.js", 725);
if(!graphic.get("autoDraw"))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 727);
graphic._redraw();
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 729);
this.fire("chartRendered");
        }
    },

    /**
     * Gets the default value for the `styles` attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     * @protected
     */
    _getDefaultStyles: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getDefaultStyles", 741);
_yuitest_coverline("build/charts-base/charts-base.js", 743);
var defs = {
            background: {
                shape: "rect",
                fill:{
                    color:"#faf9f2"
                },
                border: {
                    color:"#dad8c9",
                    weight: 1
                }
            }
        };
        _yuitest_coverline("build/charts-base/charts-base.js", 755);
return defs;
    },

    /**
     * Destructor implementation Graph class. Removes all Graphic instances from the widget.
     *
     * @method destructor
     * @protected
     */
    destructor: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "destructor", 764);
_yuitest_coverline("build/charts-base/charts-base.js", 766);
if(this._graphic)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 768);
this._graphic.destroy();
            _yuitest_coverline("build/charts-base/charts-base.js", 769);
this._graphic = null;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 771);
if(this._background)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 773);
this._background.get("graphic").destroy();
            _yuitest_coverline("build/charts-base/charts-base.js", 774);
this._background = null;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 776);
if(this._gridlines)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 778);
this._gridlines.get("graphic").destroy();
            _yuitest_coverline("build/charts-base/charts-base.js", 779);
this._gridlines = null;
        }
    }
}, {
    ATTRS: {
        /**
         * The x-coordinate for the graph.
         *
         * @attribute x
         * @type Number
         * @protected
         */
        x: {
            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 792);
_yuitest_coverline("build/charts-base/charts-base.js", 794);
this.get("boundingBox").setStyle("left", val + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 795);
return val;
            }
        },

        /**
         * The y-coordinate for the graph.
         *
         * @attribute y
         * @type Number
         * @protected
         */
        y: {
            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 807);
_yuitest_coverline("build/charts-base/charts-base.js", 809);
this.get("boundingBox").setStyle("top", val + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 810);
return val;
            }
        },

        /**
         * Reference to the chart instance using the graph.
         *
         * @attribute chart
         * @type ChartBase
         * @readOnly
         */
        chart: {
            getter: function() {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 822);
_yuitest_coverline("build/charts-base/charts-base.js", 823);
var chart = this._state.chart || this;
                _yuitest_coverline("build/charts-base/charts-base.js", 824);
return chart;
            }
        },

        /**
         * Collection of series. When setting the `seriesCollection` the array can contain a combination of either
         * `CartesianSeries` instances or object literals with properties that will define a series.
         *
         * @attribute seriesCollection
         * @type CartesianSeries
         */
        seriesCollection: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 836);
_yuitest_coverline("build/charts-base/charts-base.js", 838);
return this._seriesCollection;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 841);
_yuitest_coverline("build/charts-base/charts-base.js", 843);
this._parseSeriesCollection(val);
                _yuitest_coverline("build/charts-base/charts-base.js", 844);
return this._seriesCollection;
            }
        },

        /**
         * Indicates whether the `Graph` has a background.
         *
         * @attribute showBackground
         * @type Boolean
         * @default true
         */
        showBackground: {
            value: true
        },

        /**
         * Read-only hash lookup for all series on in the `Graph`.
         *
         * @attribute seriesDictionary
         * @type Object
         * @readOnly
         */
        seriesDictionary: {
            readOnly: true,

            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 869);
_yuitest_coverline("build/charts-base/charts-base.js", 871);
return this._seriesDictionary;
            }
        },

        /**
         * Reference to the horizontal `Gridlines` instance.
         *
         * @attribute horizontalGridlines
         * @type Gridlines
         * @default null
         */
        horizontalGridlines: {
            value: null,

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 885);
_yuitest_coverline("build/charts-base/charts-base.js", 887);
var cfg,
                    key,
                    gl = this.get("horizontalGridlines");
                _yuitest_coverline("build/charts-base/charts-base.js", 890);
if(gl && gl instanceof Y.Gridlines)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 892);
gl.remove();
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 894);
if(val instanceof Y.Gridlines)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 896);
gl = val;
                    _yuitest_coverline("build/charts-base/charts-base.js", 897);
val.set("graph", this);
                    _yuitest_coverline("build/charts-base/charts-base.js", 898);
return val;
                }
                else {_yuitest_coverline("build/charts-base/charts-base.js", 900);
if(val)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 902);
cfg = {
                        direction: "horizonal",
                        graph: this
                    };
                    _yuitest_coverline("build/charts-base/charts-base.js", 906);
for(key in val)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 908);
if(val.hasOwnProperty(key))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 910);
cfg[key] = val[key];
                        }
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 913);
gl = new Y.Gridlines(cfg);
                    _yuitest_coverline("build/charts-base/charts-base.js", 914);
return gl;
                }}
            }
        },

        /**
         * Reference to the vertical `Gridlines` instance.
         *
         * @attribute verticalGridlines
         * @type Gridlines
         * @default null
         */
        verticalGridlines: {
            value: null,

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 929);
_yuitest_coverline("build/charts-base/charts-base.js", 931);
var cfg,
                    key,
                    gl = this.get("verticalGridlines");
                _yuitest_coverline("build/charts-base/charts-base.js", 934);
if(gl && gl instanceof Y.Gridlines)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 936);
gl.remove();
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 938);
if(val instanceof Y.Gridlines)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 940);
gl = val;
                    _yuitest_coverline("build/charts-base/charts-base.js", 941);
val.set("graph", this);
                    _yuitest_coverline("build/charts-base/charts-base.js", 942);
return val;
                }
                else {_yuitest_coverline("build/charts-base/charts-base.js", 944);
if(val)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 946);
cfg = {
                        direction: "vertical",
                        graph: this
                    };
                    _yuitest_coverline("build/charts-base/charts-base.js", 950);
for(key in val)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 952);
if(val.hasOwnProperty(key))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 954);
cfg[key] = val[key];
                        }
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 957);
gl = new Y.Gridlines(cfg);
                    _yuitest_coverline("build/charts-base/charts-base.js", 958);
return gl;
                }}
            }
        },

        /**
         * Reference to graphic instance used for the background.
         *
         * @attribute background
         * @type Graphic
         * @readOnly
         */
        background: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 971);
_yuitest_coverline("build/charts-base/charts-base.js", 973);
if(!this._background)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 975);
this._backgroundGraphic = new Y.Graphic({render:this.get("contentBox")});
                    _yuitest_coverline("build/charts-base/charts-base.js", 976);
this._backgroundGraphic.get("node").style.zIndex = 0;
                    _yuitest_coverline("build/charts-base/charts-base.js", 977);
this._background = this._backgroundGraphic.addShape({type: "rect"});
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 979);
return this._background;
            }
        },

        /**
         * Reference to graphic instance used for gridlines.
         *
         * @attribute gridlines
         * @type Graphic
         * @readOnly
         */
        gridlines: {
            readOnly: true,

            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 993);
_yuitest_coverline("build/charts-base/charts-base.js", 995);
if(!this._gridlines)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 997);
this._gridlinesGraphic = new Y.Graphic({render:this.get("contentBox")});
                    _yuitest_coverline("build/charts-base/charts-base.js", 998);
this._gridlinesGraphic.get("node").style.zIndex = 1;
                    _yuitest_coverline("build/charts-base/charts-base.js", 999);
this._gridlines = this._gridlinesGraphic.addShape({type: "path"});
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 1001);
return this._gridlines;
            }
        },

        /**
         * Reference to graphic instance used for series.
         *
         * @attribute graphic
         * @type Graphic
         * @readOnly
         */
        graphic: {
            readOnly: true,

            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 1015);
_yuitest_coverline("build/charts-base/charts-base.js", 1017);
if(!this._graphic)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 1019);
this._graphic = new Y.Graphic({render:this.get("contentBox")});
                    _yuitest_coverline("build/charts-base/charts-base.js", 1020);
this._graphic.get("node").style.zIndex = 2;
                    _yuitest_coverline("build/charts-base/charts-base.js", 1021);
this._graphic.set("autoDraw", false);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 1023);
return this._graphic;
            }
        },

        /**
         * Indicates whether or not markers for a series will be grouped and rendered in a single complex shape instance.
         *
         * @attribute groupMarkers
         * @type Boolean
         */
        groupMarkers: {
            value: false
        }

        /**
         * Style properties used for drawing a background. Below are the default values:
         *  <dl>
         *      <dt>background</dt><dd>An object containing the following values:
         *          <dl>
         *              <dt>fill</dt><dd>Defines the style properties for the fill. Contains the following values:
         *                  <dl>
         *                      <dt>color</dt><dd>Color of the fill. The default value is #faf9f2.</dd>
         *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the background fill.
         *                      The default value is 1.</dd>
         *                  </dl>
         *              </dd>
         *              <dt>border</dt><dd>Defines the style properties for the border. Contains the following values:
         *                  <dl>
         *                      <dt>color</dt><dd>Color of the border. The default value is #dad8c9.</dd>
         *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the background border.
         *                      The default value is 1.</dd>
         *                      <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>
         *                  </dl>
         *              </dd>
         *          </dl>
         *      </dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});
/**
 * The ChartBase class is an abstract class used to create charts.
 *
 * @class ChartBase
 * @constructor
 * @submodule charts-base
 */
_yuitest_coverline("build/charts-base/charts-base.js", 1073);
function ChartBase() {}

_yuitest_coverline("build/charts-base/charts-base.js", 1075);
ChartBase.ATTRS = {
    /**
     * Data used to generate the chart.
     *
     * @attribute dataProvider
     * @type Array
     */
    dataProvider: {
        lazyAdd: false,

        valueFn: function()
        {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "valueFn", 1085);
_yuitest_coverline("build/charts-base/charts-base.js", 1087);
var defDataProvider = [];
            _yuitest_coverline("build/charts-base/charts-base.js", 1088);
if(!this._seriesKeysExplicitlySet)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1090);
this._seriesKeys = this._buildSeriesKeys(defDataProvider);
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 1092);
return defDataProvider;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 1095);
_yuitest_coverline("build/charts-base/charts-base.js", 1097);
var dataProvider = this._setDataValues(val);
            _yuitest_coverline("build/charts-base/charts-base.js", 1098);
if(!this._seriesKeysExplicitlySet)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1100);
this._seriesKeys = this._buildSeriesKeys(dataProvider);
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 1102);
return dataProvider;
        }
    },

    /**
     * A collection of keys that map to the series axes. If no keys are set,
     * they will be generated automatically depending on the data structure passed into
     * the chart.
     *
     * @attribute seriesKeys
     * @type Array
     */
    seriesKeys: {
        getter: function()
        {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 1115);
_yuitest_coverline("build/charts-base/charts-base.js", 1117);
return this._seriesKeys;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 1120);
_yuitest_coverline("build/charts-base/charts-base.js", 1122);
this._seriesKeysExplicitlySet = true;
            _yuitest_coverline("build/charts-base/charts-base.js", 1123);
this._seriesKeys = val;
            _yuitest_coverline("build/charts-base/charts-base.js", 1124);
return val;
        }
    },

    /**
     * Sets the `aria-label` for the chart.
     *
     * @attribute ariaLabel
     * @type String
     */
    ariaLabel: {
        value: "Chart Application",

        setter: function(val)
        {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 1137);
_yuitest_coverline("build/charts-base/charts-base.js", 1139);
var cb = this.get("contentBox");
            _yuitest_coverline("build/charts-base/charts-base.js", 1140);
if(cb)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1142);
cb.setAttribute("aria-label", val);
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 1144);
return val;
        }
    },

    /**
     * Sets the aria description for the chart.
     *
     * @attribute ariaDescription
     * @type String
     */
    ariaDescription: {
        value: "Use the up and down keys to navigate between series. Use the left and right keys to navigate through items in a series.",

        setter: function(val)
        {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 1157);
_yuitest_coverline("build/charts-base/charts-base.js", 1159);
if(this._description)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1161);
this._description.setContent("");
                _yuitest_coverline("build/charts-base/charts-base.js", 1162);
this._description.appendChild(DOCUMENT.createTextNode(val));
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 1164);
return val;
        }
    },

    /**
     * Reference to the default tooltip available for the chart.
     * <p>Contains the following properties:</p>
     *  <dl>
     *      <dt>node</dt><dd>Reference to the actual dom node</dd>
     *      <dt>showEvent</dt><dd>Event that should trigger the tooltip</dd>
     *      <dt>hideEvent</dt><dd>Event that should trigger the removal of a tooltip (can be an event or an array of events)</dd>
     *      <dt>styles</dt><dd>A hash of style properties that will be applied to the tooltip node</dd>
     *      <dt>show</dt><dd>Indicates whether or not to show the tooltip</dd>
     *      <dt>markerEventHandler</dt><dd>Displays and hides tooltip based on marker events</dd>
     *      <dt>planarEventHandler</dt><dd>Displays and hides tooltip based on planar events</dd>
     *      <dt>markerLabelFunction</dt><dd>Reference to the function used to format a marker event triggered tooltip's text.
     *      The method contains the following arguments:
     *  <dl>
     *      <dt>categoryItem</dt><dd>An object containing the following:
     *  <dl>
     *      <dt>axis</dt><dd>The axis to which the category is bound.</dd>
     *      <dt>displayName</dt><dd>The display name set to the category (defaults to key if not provided).</dd>
     *      <dt>key</dt><dd>The key of the category.</dd>
     *      <dt>value</dt><dd>The value of the category.</dd>
     *  </dl>
     *  </dd>
     *  <dt>valueItem</dt><dd>An object containing the following:
     *      <dl>
     *          <dt>axis</dt><dd>The axis to which the item's series is bound.</dd>
     *          <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>
     *          <dt>key</dt><dd>The key for the series.</dd>
     *          <dt>value</dt><dd>The value for the series item.</dd>
     *      </dl>
     *  </dd>
     *  <dt>itemIndex</dt><dd>The index of the item within the series.</dd>
     *  <dt>series</dt><dd> The `CartesianSeries` instance of the item.</dd>
     *  <dt>seriesIndex</dt><dd>The index of the series in the `seriesCollection`.</dd>
     *  </dl>
     *  The method returns an `HTMLElement` which is written into the DOM using `appendChild`. If you override this method and choose
     *  to return an html string, you will also need to override the tooltip's `setTextFunction` method to accept an html string.
     *  </dd>
     *  <dt>planarLabelFunction</dt><dd>Reference to the function used to format a planar event triggered tooltip's text
     *  <dl>
     *      <dt>categoryAxis</dt><dd> `CategoryAxis` Reference to the categoryAxis of the chart.
     *      <dt>valueItems</dt><dd>Array of objects for each series that has a data point in the coordinate plane of the event. Each
     *      object contains the following data:
     *  <dl>
     *      <dt>axis</dt><dd>The value axis of the series.</dd>
     *      <dt>key</dt><dd>The key for the series.</dd>
     *      <dt>value</dt><dd>The value for the series item.</dd>
     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>
     *  </dl>
     *  </dd>
     *      <dt>index</dt><dd>The index of the item within its series.</dd>
     *      <dt>seriesArray</dt><dd>Array of series instances for each value item.</dd>
     *      <dt>seriesIndex</dt><dd>The index of the series in the `seriesCollection`.</dd>
     *  </dl>
     *  </dd>
     *  </dl>
     *  The method returns an `HTMLElement` which is written into the DOM using `appendChild`. If you override this method and choose
     *  to return an html string, you will also need to override the tooltip's `setTextFunction` method to accept an html string.
     *  </dd>
     *  <dt>setTextFunction</dt><dd>Method that writes content returned from `planarLabelFunction` or `markerLabelFunction` into the
     *  the tooltip node. Has the following signature:
     *  <dl>
     *      <dt>label</dt><dd>The `HTMLElement` that the content is to be added.</dd>
     *      <dt>val</dt><dd>The content to be rendered into tooltip. This can be a `String` or `HTMLElement`. If an HTML string is used,
     *      it will be rendered as a string.</dd>
     *  </dl>
     *  </dd>
     *  </dl>
     * @attribute tooltip
     * @type Object
     */
    tooltip: {
        valueFn: "_getTooltip",

        setter: function(val)
        {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 1241);
_yuitest_coverline("build/charts-base/charts-base.js", 1243);
return this._updateTooltip(val);
        }
    },

    /**
     * The key value used for the chart's category axis.
     *
     * @attribute categoryKey
     * @type String
     * @default category
     */
    categoryKey: {
        value: "category"
    },

    /**
     * Indicates the type of axis to use for the category axis.
     *
     *  <dl>
     *      <dt>category</dt><dd>Specifies a `CategoryAxis`.</dd>
     *      <dt>time</dt><dd>Specifies a `TimeAxis</dd>
     *  </dl>
     *
     * @attribute categoryType
     * @type String
     * @default category
     */
    categoryType:{
        value:"category"
    },

    /**
     * Indicates the the type of interactions that will fire events.
     *
     *  <dl>
     *      <dt>marker</dt><dd>Events will be broadcasted when the mouse interacts with individual markers.</dd>
     *      <dt>planar</dt><dd>Events will be broadcasted when the mouse intersects the plane of any markers on the chart.</dd>
     *      <dt>none</dt><dd>No events will be broadcasted.</dd>
     *  </dl>
     *
     * @attribute interactionType
     * @type String
     * @default marker
     */
    interactionType: {
        value: "marker"
    },

    /**
     * Reference to all the axes in the chart.
     *
     * @attribute axesCollection
     * @type Array
     */
    axesCollection: {},

    /**
     * Reference to graph instance.
     *
     * @attribute graph
     * @type Graph
     */
    graph: {
        valueFn: "_getGraph"
    },

    /**
     * Indicates whether or not markers for a series will be grouped and rendered in a single complex shape instance.
     *
     * @attribute groupMarkers
     * @type Boolean
     */
    groupMarkers: {
        value: false
    }
};

_yuitest_coverline("build/charts-base/charts-base.js", 1320);
ChartBase.prototype = {
    /**
     * Handles groupMarkers change event.
     *
     * @method _groupMarkersChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _groupMarkersChangeHandler: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_groupMarkersChangeHandler", 1328);
_yuitest_coverline("build/charts-base/charts-base.js", 1330);
var graph = this.get("graph"),
            useGroupMarkers = e.newVal;
        _yuitest_coverline("build/charts-base/charts-base.js", 1332);
if(graph)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1334);
graph.set("groupMarkers", useGroupMarkers);
        }
    },

    /**
     * Handler for itemRendered event.
     *
     * @method _itemRendered
     * @param {Object} e Event object.
     * @private
     */
    _itemRendered: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_itemRendered", 1345);
_yuitest_coverline("build/charts-base/charts-base.js", 1347);
this._itemRenderQueue = this._itemRenderQueue.splice(1 + Y.Array.indexOf(this._itemRenderQueue, e.currentTarget), 1);
        _yuitest_coverline("build/charts-base/charts-base.js", 1348);
if(this._itemRenderQueue.length < 1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1350);
this._redraw();
        }
    },

    /**
     * Default value function for the `Graph` attribute.
     *
     * @method _getGraph
     * @return Graph
     * @private
     */
    _getGraph: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getGraph", 1361);
_yuitest_coverline("build/charts-base/charts-base.js", 1363);
var graph = new Y.Graph({
            chart:this,
            groupMarkers: this.get("groupMarkers")
        });
        _yuitest_coverline("build/charts-base/charts-base.js", 1367);
graph.after("chartRendered", Y.bind(function(e) {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "(anonymous 2)", 1367);
_yuitest_coverline("build/charts-base/charts-base.js", 1368);
this.fire("chartRendered");
        }, this));
        _yuitest_coverline("build/charts-base/charts-base.js", 1370);
return graph;
    },

    /**
     * Returns a series instance by index or key value.
     *
     * @method getSeries
     * @param val
     * @return CartesianSeries
     */
    getSeries: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "getSeries", 1380);
_yuitest_coverline("build/charts-base/charts-base.js", 1382);
var series = null,
            graph = this.get("graph");
        _yuitest_coverline("build/charts-base/charts-base.js", 1384);
if(graph)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1386);
if(Y_Lang.isNumber(val))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1388);
series = graph.getSeriesByIndex(val);
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1392);
series = graph.getSeriesByKey(val);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 1395);
return series;
    },

    /**
     * Returns an `Axis` instance by key reference. If the axis was explicitly set through the `axes` attribute,
     * the key will be the same as the key used in the `axes` object. For default axes, the key for
     * the category axis is the value of the `categoryKey` (`category`). For the value axis, the default
     * key is `values`.
     *
     * @method getAxisByKey
     * @param {String} val Key reference used to look up the axis.
     * @return Axis
     */
    getAxisByKey: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "getAxisByKey", 1408);
_yuitest_coverline("build/charts-base/charts-base.js", 1410);
var axis,
            axes = this.get("axes");
        _yuitest_coverline("build/charts-base/charts-base.js", 1412);
if(axes && axes.hasOwnProperty(val))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1414);
axis = axes[val];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 1416);
return axis;
    },

    /**
     * Returns the category axis for the chart.
     *
     * @method getCategoryAxis
     * @return Axis
     */
    getCategoryAxis: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "getCategoryAxis", 1425);
_yuitest_coverline("build/charts-base/charts-base.js", 1427);
var axis,
            key = this.get("categoryKey"),
            axes = this.get("axes");
        _yuitest_coverline("build/charts-base/charts-base.js", 1430);
if(axes.hasOwnProperty(key))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1432);
axis = axes[key];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 1434);
return axis;
    },

    /**
     * Default direction of the chart.
     *
     * @property _direction
     * @type String
     * @default horizontal
     * @private
     */
    _direction: "horizontal",

    /**
     * Storage for the `dataProvider` attribute.
     *
     * @property _dataProvider
     * @type Array
     * @private
     */
    _dataProvider: null,

    /**
     * Setter method for `dataProvider` attribute.
     *
     * @method _setDataValues
     * @param {Array} val Array to be set as `dataProvider`.
     * @return Array
     * @private
     */
    _setDataValues: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_setDataValues", 1464);
_yuitest_coverline("build/charts-base/charts-base.js", 1466);
if(Y_Lang.isArray(val[0]))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1468);
var hash,
                dp = [],
                cats = val[0],
                i = 0,
                l = cats.length,
                n,
                sl = val.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 1475);
for(; i < l; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1477);
hash = {category:cats[i]};
                _yuitest_coverline("build/charts-base/charts-base.js", 1478);
for(n = 1; n < sl; ++n)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 1480);
hash["series" + n] = val[n][i];
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 1482);
dp[i] = hash;
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 1484);
return dp;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 1486);
return val;
    },

    /**
     * Storage for `seriesCollection` attribute.
     *
     * @property _seriesCollection
     * @type Array
     * @private
     */
    _seriesCollection: null,

    /**
     * Setter method for `seriesCollection` attribute.
     *
     * @property _setSeriesCollection
     * @param {Array} val Array of either `CartesianSeries` instances or objects containing series attribute key value pairs.
     * @private
     */
    _setSeriesCollection: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_setSeriesCollection", 1505);
_yuitest_coverline("build/charts-base/charts-base.js", 1507);
this._seriesCollection = val;
    },
    /**
     * Helper method that returns the axis class that a key references.
     *
     * @method _getAxisClass
     * @param {String} t The type of axis.
     * @return Axis
     * @private
     */
    _getAxisClass: function(t)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getAxisClass", 1517);
_yuitest_coverline("build/charts-base/charts-base.js", 1519);
return this._axisClass[t];
    },

    /**
     * Key value pairs of axis types.
     *
     * @property _axisClass
     * @type Object
     * @private
     */
    _axisClass: {
        stacked: Y.StackedAxis,
        numeric: Y.NumericAxis,
        category: Y.CategoryAxis,
        time: Y.TimeAxis
    },

    /**
     * Collection of axes.
     *
     * @property _axes
     * @type Array
     * @private
     */
    _axes: null,

    /**
     * @method initializer
     * @private
     */
    initializer: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "initializer", 1549);
_yuitest_coverline("build/charts-base/charts-base.js", 1551);
this._itemRenderQueue = [];
        _yuitest_coverline("build/charts-base/charts-base.js", 1552);
this._seriesIndex = -1;
        _yuitest_coverline("build/charts-base/charts-base.js", 1553);
this._itemIndex = -1;
        _yuitest_coverline("build/charts-base/charts-base.js", 1554);
this.after("dataProviderChange", this._dataProviderChangeHandler);
    },

    /**
     * @method renderUI
     * @private
     */
    renderUI: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "renderUI", 1561);
_yuitest_coverline("build/charts-base/charts-base.js", 1563);
var tt = this.get("tooltip"),
            bb = this.get("boundingBox"),
            cb = this.get("contentBox");
        //move the position = absolute logic to a class file
        _yuitest_coverline("build/charts-base/charts-base.js", 1567);
bb.setStyle("position", "absolute");
        _yuitest_coverline("build/charts-base/charts-base.js", 1568);
cb.setStyle("position", "absolute");
        _yuitest_coverline("build/charts-base/charts-base.js", 1569);
this._addAxes();
        _yuitest_coverline("build/charts-base/charts-base.js", 1570);
this._addSeries();
        _yuitest_coverline("build/charts-base/charts-base.js", 1571);
if(tt && tt.show)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1573);
this._addTooltip();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 1575);
this._setAriaElements(bb, cb);
    },

    /**
     * Creates an aria `live-region`, `aria-label` and `aria-describedby` for the Chart.
     *
     * @method _setAriaElements
     * @param {Node} cb Reference to the Chart's `contentBox` attribute.
     * @private
     */
    _setAriaElements: function(bb, cb)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_setAriaElements", 1585);
_yuitest_coverline("build/charts-base/charts-base.js", 1587);
var description = this._getAriaOffscreenNode(),
            id = this.get("id") + "_description",
            liveRegion = this._getAriaOffscreenNode();
        _yuitest_coverline("build/charts-base/charts-base.js", 1590);
cb.set("tabIndex", 0);
        _yuitest_coverline("build/charts-base/charts-base.js", 1591);
cb.set("role", "img");
        _yuitest_coverline("build/charts-base/charts-base.js", 1592);
cb.setAttribute("aria-label", this.get("ariaLabel"));
        _yuitest_coverline("build/charts-base/charts-base.js", 1593);
cb.setAttribute("aria-describedby", id);
        _yuitest_coverline("build/charts-base/charts-base.js", 1594);
description.set("id", id);
        _yuitest_coverline("build/charts-base/charts-base.js", 1595);
description.set("tabIndex", -1);
        _yuitest_coverline("build/charts-base/charts-base.js", 1596);
description.appendChild(DOCUMENT.createTextNode(this.get("ariaDescription")));
        _yuitest_coverline("build/charts-base/charts-base.js", 1597);
liveRegion.set("id", "live-region");
        _yuitest_coverline("build/charts-base/charts-base.js", 1598);
liveRegion.set("aria-live", "polite");
        _yuitest_coverline("build/charts-base/charts-base.js", 1599);
liveRegion.set("aria-atomic", "true");
        _yuitest_coverline("build/charts-base/charts-base.js", 1600);
liveRegion.set("role", "status");
        _yuitest_coverline("build/charts-base/charts-base.js", 1601);
bb.setAttribute("role", "application");
        _yuitest_coverline("build/charts-base/charts-base.js", 1602);
bb.appendChild(description);
        _yuitest_coverline("build/charts-base/charts-base.js", 1603);
bb.appendChild(liveRegion);
        _yuitest_coverline("build/charts-base/charts-base.js", 1604);
this._description = description;
        _yuitest_coverline("build/charts-base/charts-base.js", 1605);
this._liveRegion = liveRegion;
    },

    /**
     * Sets a node offscreen for use as aria-description or aria-live-regin.
     *
     * @method _setOffscreen
     * @return Node
     * @private
     */
    _getAriaOffscreenNode: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getAriaOffscreenNode", 1615);
_yuitest_coverline("build/charts-base/charts-base.js", 1617);
var node = Y.Node.create("<div></div>"),
            ie = Y.UA.ie,
            clipRect = (ie && ie < 8) ? "rect(1px 1px 1px 1px)" : "rect(1px, 1px, 1px, 1px)";
        _yuitest_coverline("build/charts-base/charts-base.js", 1620);
node.setStyle("position", "absolute");
        _yuitest_coverline("build/charts-base/charts-base.js", 1621);
node.setStyle("height", "1px");
        _yuitest_coverline("build/charts-base/charts-base.js", 1622);
node.setStyle("width", "1px");
        _yuitest_coverline("build/charts-base/charts-base.js", 1623);
node.setStyle("overflow", "hidden");
        _yuitest_coverline("build/charts-base/charts-base.js", 1624);
node.setStyle("clip", clipRect);
        _yuitest_coverline("build/charts-base/charts-base.js", 1625);
return node;
    },

    /**
     * @method syncUI
     * @private
     */
    syncUI: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "syncUI", 1632);
_yuitest_coverline("build/charts-base/charts-base.js", 1634);
this._redraw();
    },

    /**
     * @method bindUI
     * @private
     */
    bindUI: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "bindUI", 1641);
_yuitest_coverline("build/charts-base/charts-base.js", 1643);
this.after("tooltipChange", Y.bind(this._tooltipChangeHandler, this));
        _yuitest_coverline("build/charts-base/charts-base.js", 1644);
this.after("widthChange", this._sizeChanged);
        _yuitest_coverline("build/charts-base/charts-base.js", 1645);
this.after("heightChange", this._sizeChanged);
        _yuitest_coverline("build/charts-base/charts-base.js", 1646);
this.after("groupMarkersChange", this._groupMarkersChangeHandler);
        _yuitest_coverline("build/charts-base/charts-base.js", 1647);
var tt = this.get("tooltip"),
            hideEvent = "mouseout",
            showEvent = "mouseover",
            cb = this.get("contentBox"),
            interactionType = this.get("interactionType"),
            i = 0,
            len,
            markerClassName = "." + SERIES_MARKER,
            isTouch = ((WINDOW && ("ontouchstart" in WINDOW)) && !(Y.UA.chrome && Y.UA.chrome < 6));
        _yuitest_coverline("build/charts-base/charts-base.js", 1656);
Y.on("keydown", Y.bind(function(e) {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "(anonymous 3)", 1656);
_yuitest_coverline("build/charts-base/charts-base.js", 1657);
var key = e.keyCode,
                numKey = parseFloat(key),
                msg;
            _yuitest_coverline("build/charts-base/charts-base.js", 1660);
if(numKey > 36 && numKey < 41)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1662);
e.halt();
                _yuitest_coverline("build/charts-base/charts-base.js", 1663);
msg = this._getAriaMessage(numKey);
                _yuitest_coverline("build/charts-base/charts-base.js", 1664);
this._liveRegion.setContent("");
                _yuitest_coverline("build/charts-base/charts-base.js", 1665);
this._liveRegion.appendChild(DOCUMENT.createTextNode(msg));
            }
        }, this), this.get("contentBox"));
        _yuitest_coverline("build/charts-base/charts-base.js", 1668);
if(interactionType == "marker")
        {
            //if touch capabilities, toggle tooltip on touchend. otherwise, the tooltip attribute's hideEvent/showEvent types.
            _yuitest_coverline("build/charts-base/charts-base.js", 1671);
hideEvent = tt.hideEvent;
            _yuitest_coverline("build/charts-base/charts-base.js", 1672);
showEvent = tt.showEvent;
            _yuitest_coverline("build/charts-base/charts-base.js", 1673);
if(isTouch)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1675);
Y.delegate("touchend", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);
                //hide active tooltip if the chart is touched
                _yuitest_coverline("build/charts-base/charts-base.js", 1677);
Y.on("touchend", Y.bind(function(e) {
                    //only halt the event if it originated from the chart
                    _yuitest_coverfunc("build/charts-base/charts-base.js", "(anonymous 4)", 1677);
_yuitest_coverline("build/charts-base/charts-base.js", 1679);
if(cb.contains(e.target))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 1681);
e.halt(true);
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 1683);
if(this._activeMarker)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 1685);
this._activeMarker = null;
                        _yuitest_coverline("build/charts-base/charts-base.js", 1686);
this.hideTooltip(e);
                    }
                }, this));
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1692);
Y.delegate("mouseenter", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);
                _yuitest_coverline("build/charts-base/charts-base.js", 1693);
Y.delegate("mousedown", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);
                _yuitest_coverline("build/charts-base/charts-base.js", 1694);
Y.delegate("mouseup", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);
                _yuitest_coverline("build/charts-base/charts-base.js", 1695);
Y.delegate("mouseleave", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);
                _yuitest_coverline("build/charts-base/charts-base.js", 1696);
Y.delegate("click", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);
                _yuitest_coverline("build/charts-base/charts-base.js", 1697);
Y.delegate("mousemove", Y.bind(this._positionTooltip, this), cb, markerClassName);
            }
        }
        else {_yuitest_coverline("build/charts-base/charts-base.js", 1700);
if(interactionType == "planar")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1702);
if(isTouch)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1704);
this._overlay.on("touchend", Y.bind(this._planarEventDispatcher, this));
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1708);
this._overlay.on("mousemove", Y.bind(this._planarEventDispatcher, this));
                _yuitest_coverline("build/charts-base/charts-base.js", 1709);
this.on("mouseout", this.hideTooltip);
            }
        }}
        _yuitest_coverline("build/charts-base/charts-base.js", 1712);
if(tt)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1714);
this.on("markerEvent:touchend", Y.bind(function(e) {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "(anonymous 5)", 1714);
_yuitest_coverline("build/charts-base/charts-base.js", 1715);
var marker = e.series.get("markers")[e.index];
                _yuitest_coverline("build/charts-base/charts-base.js", 1716);
if(this._activeMarker && marker === this._activeMarker)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 1718);
this._activeMarker = null;
                    _yuitest_coverline("build/charts-base/charts-base.js", 1719);
this.hideTooltip(e);
                }
                else
                {

                    _yuitest_coverline("build/charts-base/charts-base.js", 1724);
this._activeMarker = marker;
                    _yuitest_coverline("build/charts-base/charts-base.js", 1725);
tt.markerEventHandler.apply(this, [e]);
                }
            }, this));
            _yuitest_coverline("build/charts-base/charts-base.js", 1728);
if(hideEvent && showEvent && hideEvent == showEvent)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1730);
this.on(interactionType + "Event:" + hideEvent, this.toggleTooltip);
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1734);
if(showEvent)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 1736);
this.on(interactionType + "Event:" + showEvent, tt[interactionType + "EventHandler"]);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 1738);
if(hideEvent)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 1740);
if(Y_Lang.isArray(hideEvent))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 1742);
len = hideEvent.length;
                        _yuitest_coverline("build/charts-base/charts-base.js", 1743);
for(; i < len; ++i)
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 1745);
this.on(interactionType + "Event:" + hideEvent[i], this.hideTooltip);
                        }
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 1748);
this.on(interactionType + "Event:" + hideEvent, this.hideTooltip);
                }
            }
        }
    },

    /**
     * Event handler for marker events.
     *
     * @method _markerEventDispatcher
     * @param {Object} e Event object.
     * @private
     */
    _markerEventDispatcher: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_markerEventDispatcher", 1761);
_yuitest_coverline("build/charts-base/charts-base.js", 1763);
var type = e.type,
            cb = this.get("contentBox"),
            markerNode = e.currentTarget,
            strArr = markerNode.getAttribute("id").split("_"),
            index = strArr.pop(),
            seriesIndex = strArr.pop(),
            series = this.getSeries(parseInt(seriesIndex, 10)),
            items = this.getSeriesItems(series, index),
            isTouch = e && e.hasOwnProperty("changedTouches"),
            pageX = isTouch ? e.changedTouches[0].pageX : e.pageX,
            pageY = isTouch ? e.changedTouches[0].pageY : e.pageY,
            x = pageX - cb.getX(),
            y = pageY - cb.getY();
        _yuitest_coverline("build/charts-base/charts-base.js", 1776);
if(type == "mouseenter")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1778);
type = "mouseover";
        }
        else {_yuitest_coverline("build/charts-base/charts-base.js", 1780);
if(type == "mouseleave")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1782);
type = "mouseout";
        }}
        _yuitest_coverline("build/charts-base/charts-base.js", 1784);
series.updateMarkerState(type, index);
        _yuitest_coverline("build/charts-base/charts-base.js", 1785);
e.halt();
        /**
         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mouseover event.
         *
         *
         * @event markerEvent:mouseover
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>
         *  </dl>
         */
        /**
         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mouseout event.
         *
         * @event markerEvent:mouseout
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>
         *  </dl>
         */
        /**
         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mousedown event.
         *
         * @event markerEvent:mousedown
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>
         *  </dl>
         */
        /**
         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mouseup event.
         *
         * @event markerEvent:mouseup
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>
         *  </dl>
         */
        /**
         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a click event.
         *
         * @event markerEvent:click
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>pageX</dt><dd>The x location of the event on the page (including scroll)</dd>
         *      <dt>pageY</dt><dd>The y location of the event on the page (including scroll)</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>
         *      <dt>originEvent</dt><dd>Underlying dom event.</dd>
         *  </dl>
         */
        _yuitest_coverline("build/charts-base/charts-base.js", 1880);
this.fire("markerEvent:" + type, {
            originEvent: e,
            pageX:pageX,
            pageY:pageY,
            categoryItem:items.category,
            valueItem:items.value,
            node:markerNode,
            x:x,
            y:y,
            series:series,
            index:index,
            seriesIndex:seriesIndex
        });
    },

    /**
     * Event handler for dataProviderChange.
     *
     * @method _dataProviderChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _dataProviderChangeHandler: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_dataProviderChangeHandler", 1902);
_yuitest_coverline("build/charts-base/charts-base.js", 1904);
var dataProvider = e.newVal,
            axes,
            i,
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 1908);
this._seriesIndex = -1;
        _yuitest_coverline("build/charts-base/charts-base.js", 1909);
this._itemIndex = -1;
        _yuitest_coverline("build/charts-base/charts-base.js", 1910);
if(this instanceof Y.CartesianChart)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1912);
this.set("axes", this.get("axes"));
            _yuitest_coverline("build/charts-base/charts-base.js", 1913);
this.set("seriesCollection", this.get("seriesCollection"));
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 1915);
axes = this.get("axes");
        _yuitest_coverline("build/charts-base/charts-base.js", 1916);
if(axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1918);
for(i in axes)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1920);
if(axes.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 1922);
axis = axes[i];
                    _yuitest_coverline("build/charts-base/charts-base.js", 1923);
if(axis instanceof Y.Axis)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 1925);
if(axis.get("position") != "none")
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 1927);
this._addToAxesRenderQueue(axis);
                        }
                        _yuitest_coverline("build/charts-base/charts-base.js", 1929);
axis.set("dataProvider", dataProvider);
                    }
                }
            }
        }
    },

    /**
     * Event listener for toggling the tooltip. If a tooltip is visible, hide it. If not, it
     * will create and show a tooltip based on the event object.
     *
     * @method toggleTooltip
     * @param {Object} e Event object.
     */
    toggleTooltip: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "toggleTooltip", 1943);
_yuitest_coverline("build/charts-base/charts-base.js", 1945);
var tt = this.get("tooltip");
        _yuitest_coverline("build/charts-base/charts-base.js", 1946);
if(tt.visible)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1948);
this.hideTooltip();
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1952);
tt.markerEventHandler.apply(this, [e]);
        }
    },

    /**
     * Shows a tooltip
     *
     * @method _showTooltip
     * @param {String} msg Message to dispaly in the tooltip.
     * @param {Number} x x-coordinate
     * @param {Number} y y-coordinate
     * @private
     */
    _showTooltip: function(msg, x, y)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_showTooltip", 1965);
_yuitest_coverline("build/charts-base/charts-base.js", 1967);
var tt = this.get("tooltip"),
            node = tt.node;
        _yuitest_coverline("build/charts-base/charts-base.js", 1969);
if(msg)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1971);
tt.visible = true;
            _yuitest_coverline("build/charts-base/charts-base.js", 1972);
tt.setTextFunction(node, msg);
            _yuitest_coverline("build/charts-base/charts-base.js", 1973);
node.setStyle("top", y + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 1974);
node.setStyle("left", x + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 1975);
node.setStyle("visibility", "visible");
        }
    },

    /**
     * Positions the tooltip
     *
     * @method _positionTooltip
     * @param {Object} e Event object.
     * @private
     */
    _positionTooltip: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_positionTooltip", 1986);
_yuitest_coverline("build/charts-base/charts-base.js", 1988);
var tt = this.get("tooltip"),
            node = tt.node,
            cb = this.get("contentBox"),
            x = (e.pageX + 10) - cb.getX(),
            y = (e.pageY + 10) - cb.getY();
        _yuitest_coverline("build/charts-base/charts-base.js", 1993);
if(node)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1995);
node.setStyle("left", x + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 1996);
node.setStyle("top", y + "px");
        }
    },

    /**
     * Hides the default tooltip
     *
     * @method hideTooltip
     */
    hideTooltip: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "hideTooltip", 2005);
_yuitest_coverline("build/charts-base/charts-base.js", 2007);
var tt = this.get("tooltip"),
            node = tt.node;
        _yuitest_coverline("build/charts-base/charts-base.js", 2009);
tt.visible = false;
        _yuitest_coverline("build/charts-base/charts-base.js", 2010);
node.set("innerHTML", "");
        _yuitest_coverline("build/charts-base/charts-base.js", 2011);
node.setStyle("left", -10000);
        _yuitest_coverline("build/charts-base/charts-base.js", 2012);
node.setStyle("top", -10000);
        _yuitest_coverline("build/charts-base/charts-base.js", 2013);
node.setStyle("visibility", "hidden");
    },

    /**
     * Adds a tooltip to the dom.
     *
     * @method _addTooltip
     * @private
     */
    _addTooltip: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addTooltip", 2022);
_yuitest_coverline("build/charts-base/charts-base.js", 2024);
var tt = this.get("tooltip"),
            id = this.get("id") + "_tooltip",
            cb = this.get("contentBox"),
            oldNode = DOCUMENT.getElementById(id);
        _yuitest_coverline("build/charts-base/charts-base.js", 2028);
if(oldNode)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2030);
cb.removeChild(oldNode);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2032);
tt.node.set("id", id);
        _yuitest_coverline("build/charts-base/charts-base.js", 2033);
tt.node.setStyle("visibility", "hidden");
        _yuitest_coverline("build/charts-base/charts-base.js", 2034);
cb.appendChild(tt.node);
    },

    /**
     * Updates the tooltip attribute.
     *
     * @method _updateTooltip
     * @param {Object} val Object containing properties for the tooltip.
     * @return Object
     * @private
     */
    _updateTooltip: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_updateTooltip", 2045);
_yuitest_coverline("build/charts-base/charts-base.js", 2047);
var tt = this.get("tooltip") || this._getTooltip(),
            i,
            styles,
            node,
            props = {
                markerLabelFunction:"markerLabelFunction",
                planarLabelFunction:"planarLabelFunction",
                setTextFunction:"setTextFunction",
                showEvent:"showEvent",
                hideEvent:"hideEvent",
                markerEventHandler:"markerEventHandler",
                planarEventHandler:"planarEventHandler",
                show:"show"
            };
        _yuitest_coverline("build/charts-base/charts-base.js", 2061);
if(Y_Lang.isObject(val))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2063);
styles = val.styles;
            _yuitest_coverline("build/charts-base/charts-base.js", 2064);
node = Y.one(val.node) || tt.node;
            _yuitest_coverline("build/charts-base/charts-base.js", 2065);
if(styles)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2067);
for(i in styles)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2069);
if(styles.hasOwnProperty(i))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2071);
node.setStyle(i, styles[i]);
                    }
                }
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 2075);
for(i in props)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2077);
if(val.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2079);
tt[i] = val[i];
                }
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 2082);
tt.node = node;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2084);
return tt;
    },

    /**
     * Default getter for `tooltip` attribute.
     *
     * @method _getTooltip
     * @return Object
     * @private
     */
    _getTooltip: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getTooltip", 2094);
_yuitest_coverline("build/charts-base/charts-base.js", 2096);
var node = DOCUMENT.createElement("div"),
            tooltipClass = _getClassName("chart-tooltip"),
            tt = {
                setTextFunction: this._setText,
                markerLabelFunction: this._tooltipLabelFunction,
                planarLabelFunction: this._planarLabelFunction,
                show: true,
                hideEvent: "mouseout",
                showEvent: "mouseover",
                markerEventHandler: function(e)
                {
                    _yuitest_coverfunc("build/charts-base/charts-base.js", "markerEventHandler", 2105);
_yuitest_coverline("build/charts-base/charts-base.js", 2107);
var tt = this.get("tooltip"),
                    msg = tt.markerLabelFunction.apply(this, [e.categoryItem, e.valueItem, e.index, e.series, e.seriesIndex]);
                    _yuitest_coverline("build/charts-base/charts-base.js", 2109);
this._showTooltip(msg, e.x + 10, e.y + 10);
                },
                planarEventHandler: function(e)
                {
                    _yuitest_coverfunc("build/charts-base/charts-base.js", "planarEventHandler", 2111);
_yuitest_coverline("build/charts-base/charts-base.js", 2113);
var tt = this.get("tooltip"),
                        msg ,
                        categoryAxis = this.get("categoryAxis");
                    _yuitest_coverline("build/charts-base/charts-base.js", 2116);
msg = tt.planarLabelFunction.apply(this, [categoryAxis, e.valueItem, e.index, e.items, e.seriesIndex]);
                    _yuitest_coverline("build/charts-base/charts-base.js", 2117);
this._showTooltip(msg, e.x + 10, e.y + 10);
                }
            };
        _yuitest_coverline("build/charts-base/charts-base.js", 2120);
node = Y.one(node);
        _yuitest_coverline("build/charts-base/charts-base.js", 2121);
node.set("id", this.get("id") + "_tooltip");
        _yuitest_coverline("build/charts-base/charts-base.js", 2122);
node.setStyle("fontSize", "85%");
        _yuitest_coverline("build/charts-base/charts-base.js", 2123);
node.setStyle("opacity", "0.83");
        _yuitest_coverline("build/charts-base/charts-base.js", 2124);
node.setStyle("position", "absolute");
        _yuitest_coverline("build/charts-base/charts-base.js", 2125);
node.setStyle("paddingTop", "2px");
        _yuitest_coverline("build/charts-base/charts-base.js", 2126);
node.setStyle("paddingRight", "5px");
        _yuitest_coverline("build/charts-base/charts-base.js", 2127);
node.setStyle("paddingBottom", "4px");
        _yuitest_coverline("build/charts-base/charts-base.js", 2128);
node.setStyle("paddingLeft", "2px");
        _yuitest_coverline("build/charts-base/charts-base.js", 2129);
node.setStyle("backgroundColor", "#fff");
        _yuitest_coverline("build/charts-base/charts-base.js", 2130);
node.setStyle("border", "1px solid #dbdccc");
        _yuitest_coverline("build/charts-base/charts-base.js", 2131);
node.setStyle("pointerEvents", "none");
        _yuitest_coverline("build/charts-base/charts-base.js", 2132);
node.setStyle("zIndex", 3);
        _yuitest_coverline("build/charts-base/charts-base.js", 2133);
node.setStyle("whiteSpace", "noWrap");
        _yuitest_coverline("build/charts-base/charts-base.js", 2134);
node.setStyle("visibility", "hidden");
        _yuitest_coverline("build/charts-base/charts-base.js", 2135);
node.addClass(tooltipClass);
        _yuitest_coverline("build/charts-base/charts-base.js", 2136);
tt.node = Y.one(node);
        _yuitest_coverline("build/charts-base/charts-base.js", 2137);
return tt;
    },

    /**
     * Formats tooltip text when `interactionType` is `planar`.
     *
     * @method _planarLabelFunction
     * @param {Axis} categoryAxis Reference to the categoryAxis of the chart.
     * @param {Array} valueItems Array of objects for each series that has a data point in the coordinate plane of the event.
     * Each object contains the following data:
     *  <dl>
     *      <dt>axis</dt><dd>The value axis of the series.</dd>
     *      <dt>key</dt><dd>The key for the series.</dd>
     *      <dt>value</dt><dd>The value for the series item.</dd>
     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>
     *  </dl>
     *  @param {Number} index The index of the item within its series.
     *  @param {Array} seriesArray Array of series instances for each value item.
     *  @param {Number} seriesIndex The index of the series in the `seriesCollection`.
     *  @return {String | HTML}
     * @private
     */
    _planarLabelFunction: function(categoryAxis, valueItems, index, seriesArray, seriesIndex)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_planarLabelFunction", 2159);
_yuitest_coverline("build/charts-base/charts-base.js", 2161);
var msg = DOCUMENT.createElement("div"),
            valueItem,
            i = 0,
            len = seriesArray.length,
            axis,
            categoryValue,
            seriesValue,
            series;
        _yuitest_coverline("build/charts-base/charts-base.js", 2169);
if(categoryAxis)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2171);
categoryValue = categoryAxis.get("labelFunction").apply(this, [categoryAxis.getKeyValueAt(this.get("categoryKey"), index), categoryAxis.get("labelFormat")]);
            _yuitest_coverline("build/charts-base/charts-base.js", 2172);
if(!Y_Lang.isObject(categoryValue))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2174);
categoryValue = DOCUMENT.createTextNode(categoryValue);
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 2176);
msg.appendChild(categoryValue);
        }

        _yuitest_coverline("build/charts-base/charts-base.js", 2179);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2181);
series = seriesArray[i];
            _yuitest_coverline("build/charts-base/charts-base.js", 2182);
if(series.get("visible"))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2184);
valueItem = valueItems[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 2185);
axis = valueItem.axis;
                _yuitest_coverline("build/charts-base/charts-base.js", 2186);
seriesValue =  axis.get("labelFunction").apply(this, [axis.getKeyValueAt(valueItem.key, index), axis.get("labelFormat")]);
                _yuitest_coverline("build/charts-base/charts-base.js", 2187);
msg.appendChild(DOCUMENT.createElement("br"));
                _yuitest_coverline("build/charts-base/charts-base.js", 2188);
msg.appendChild(DOCUMENT.createTextNode(valueItem.displayName));
                _yuitest_coverline("build/charts-base/charts-base.js", 2189);
msg.appendChild(DOCUMENT.createTextNode(": "));
                _yuitest_coverline("build/charts-base/charts-base.js", 2190);
if(!Y_Lang.isObject(seriesValue))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2192);
seriesValue = DOCUMENT.createTextNode(seriesValue);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 2194);
msg.appendChild(seriesValue);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2197);
return msg;
    },

    /**
     * Formats tooltip text when `interactionType` is `marker`.
     *
     * @method _tooltipLabelFunction
     * @param {Object} categoryItem An object containing the following:
     *  <dl>
     *      <dt>axis</dt><dd>The axis to which the category is bound.</dd>
     *      <dt>displayName</dt><dd>The display name set to the category (defaults to key if not provided)</dd>
     *      <dt>key</dt><dd>The key of the category.</dd>
     *      <dt>value</dt><dd>The value of the category</dd>
     *  </dl>
     * @param {Object} valueItem An object containing the following:
     *  <dl>
     *      <dt>axis</dt><dd>The axis to which the item's series is bound.</dd>
     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>
     *      <dt>key</dt><dd>The key for the series.</dd>
     *      <dt>value</dt><dd>The value for the series item.</dd>
     *  </dl>
     * @param {Number} itemIndex The index of the item within the series.
     * @param {CartesianSeries} series The `CartesianSeries` instance of the item.
     * @param {Number} seriesIndex The index of the series in the `seriesCollection`.
     * @return {String | HTML}
     * @private
     */
    _tooltipLabelFunction: function(categoryItem, valueItem, itemIndex, series, seriesIndex)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_tooltipLabelFunction", 2224);
_yuitest_coverline("build/charts-base/charts-base.js", 2226);
var msg = DOCUMENT.createElement("div"),
            categoryValue = categoryItem.axis.get("labelFunction").apply(this, [categoryItem.value, categoryItem.axis.get("labelFormat")]),
            seriesValue = valueItem.axis.get("labelFunction").apply(this, [valueItem.value, valueItem.axis.get("labelFormat")]);
        _yuitest_coverline("build/charts-base/charts-base.js", 2229);
msg.appendChild(DOCUMENT.createTextNode(categoryItem.displayName));
        _yuitest_coverline("build/charts-base/charts-base.js", 2230);
msg.appendChild(DOCUMENT.createTextNode(": "));
        _yuitest_coverline("build/charts-base/charts-base.js", 2231);
if(!Y_Lang.isObject(categoryValue))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2233);
categoryValue = DOCUMENT.createTextNode(categoryValue);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2235);
msg.appendChild(categoryValue);
        _yuitest_coverline("build/charts-base/charts-base.js", 2236);
msg.appendChild(DOCUMENT.createElement("br"));
        _yuitest_coverline("build/charts-base/charts-base.js", 2237);
msg.appendChild(DOCUMENT.createTextNode(valueItem.displayName));
        _yuitest_coverline("build/charts-base/charts-base.js", 2238);
msg.appendChild(DOCUMENT.createTextNode(": "));
        _yuitest_coverline("build/charts-base/charts-base.js", 2239);
if(!Y_Lang.isObject(seriesValue))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2241);
seriesValue = DOCUMENT.createTextNode(seriesValue);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2243);
msg.appendChild(seriesValue);
        _yuitest_coverline("build/charts-base/charts-base.js", 2244);
return msg;
    },

    /**
     * Event handler for the tooltipChange.
     *
     * @method _tooltipChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _tooltipChangeHandler: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_tooltipChangeHandler", 2254);
_yuitest_coverline("build/charts-base/charts-base.js", 2256);
if(this.get("tooltip"))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2258);
var tt = this.get("tooltip"),
                node = tt.node,
                show = tt.show,
                cb = this.get("contentBox");
            _yuitest_coverline("build/charts-base/charts-base.js", 2262);
if(node && show)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2264);
if(!cb.contains(node))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2266);
this._addTooltip();
                }
            }
        }
    },

    /**
     * Updates the content of text field. This method writes a value into a text field using
     * `appendChild`. If the value is a `String`, it is converted to a `TextNode` first.
     *
     * @method _setText
     * @param label {HTMLElement} label to be updated
     * @param val {String} value with which to update the label
     * @private
     */
    _setText: function(textField, val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_setText", 2281);
_yuitest_coverline("build/charts-base/charts-base.js", 2283);
textField.setContent("");
        _yuitest_coverline("build/charts-base/charts-base.js", 2284);
if(Y_Lang.isNumber(val))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2286);
val = val + "";
        }
        else {_yuitest_coverline("build/charts-base/charts-base.js", 2288);
if(!val)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2290);
val = "";
        }}
        _yuitest_coverline("build/charts-base/charts-base.js", 2292);
if(IS_STRING(val))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2294);
val = DOCUMENT.createTextNode(val);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2296);
textField.appendChild(val);
    },

    /**
     * Returns all the keys contained in a  `dataProvider`.
     *
     * @method _getAllKeys
     * @param {Array} dp Collection of objects to be parsed.
     * @return Object
     */
    _getAllKeys: function(dp)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getAllKeys", 2306);
_yuitest_coverline("build/charts-base/charts-base.js", 2308);
var i = 0,
            len = dp.length,
            item,
            key,
            keys = {};
        _yuitest_coverline("build/charts-base/charts-base.js", 2313);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2315);
item = dp[i];
            _yuitest_coverline("build/charts-base/charts-base.js", 2316);
for(key in item)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2318);
if(item.hasOwnProperty(key))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2320);
keys[key] = true;
                }
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2324);
return keys;
    },

    /**
     * Constructs seriesKeys if not explicitly specified.
     *
     * @method _buildSeriesKeys
     * @param {Array} dataProvider The dataProvider for the chart.
     * @return Array
     * @private
     */
    _buildSeriesKeys: function(dataProvider)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_buildSeriesKeys", 2335);
_yuitest_coverline("build/charts-base/charts-base.js", 2337);
var allKeys,
            catKey = this.get("categoryKey"),
            keys = [],
            i;
        _yuitest_coverline("build/charts-base/charts-base.js", 2341);
if(this._seriesKeysExplicitlySet)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2343);
return this._seriesKeys;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2345);
allKeys = this._getAllKeys(dataProvider);
        _yuitest_coverline("build/charts-base/charts-base.js", 2346);
for(i in allKeys)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2348);
if(allKeys.hasOwnProperty(i) && i != catKey)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2350);
keys.push(i);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2353);
return keys;
    }
};
_yuitest_coverline("build/charts-base/charts-base.js", 2356);
Y.ChartBase = ChartBase;
/**
 * The CartesianChart class creates a chart with horizontal and vertical axes.
 *
 * @class CartesianChart
 * @extends ChartBase
 * @constructor
 * @submodule charts-base
 */
_yuitest_coverline("build/charts-base/charts-base.js", 2365);
Y.CartesianChart = Y.Base.create("cartesianChart", Y.Widget, [Y.ChartBase], {
    /**
     * @method renderUI
     * @private
     */
    renderUI: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "renderUI", 2370);
_yuitest_coverline("build/charts-base/charts-base.js", 2372);
var bb = this.get("boundingBox"),
            cb = this.get("contentBox"),
            tt = this.get("tooltip"),
            overlay,
            overlayClass = _getClassName("overlay");
        //move the position = absolute logic to a class file
        _yuitest_coverline("build/charts-base/charts-base.js", 2378);
bb.setStyle("position", "absolute");
        _yuitest_coverline("build/charts-base/charts-base.js", 2379);
cb.setStyle("position", "absolute");
        _yuitest_coverline("build/charts-base/charts-base.js", 2380);
this._addAxes();
        _yuitest_coverline("build/charts-base/charts-base.js", 2381);
this._addGridlines();
        _yuitest_coverline("build/charts-base/charts-base.js", 2382);
this._addSeries();
        _yuitest_coverline("build/charts-base/charts-base.js", 2383);
if(tt && tt.show)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2385);
this._addTooltip();
        }
        //If there is a style definition. Force them to set.
        _yuitest_coverline("build/charts-base/charts-base.js", 2388);
this.get("styles");
        _yuitest_coverline("build/charts-base/charts-base.js", 2389);
if(this.get("interactionType") == "planar")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2391);
overlay = DOCUMENT.createElement("div");
            _yuitest_coverline("build/charts-base/charts-base.js", 2392);
this.get("contentBox").appendChild(overlay);
            _yuitest_coverline("build/charts-base/charts-base.js", 2393);
this._overlay = Y.one(overlay);
            _yuitest_coverline("build/charts-base/charts-base.js", 2394);
this._overlay.set("id", this.get("id") + "_overlay");
            _yuitest_coverline("build/charts-base/charts-base.js", 2395);
this._overlay.setStyle("position", "absolute");
            _yuitest_coverline("build/charts-base/charts-base.js", 2396);
this._overlay.setStyle("background", "#fff");
            _yuitest_coverline("build/charts-base/charts-base.js", 2397);
this._overlay.setStyle("opacity", 0);
            _yuitest_coverline("build/charts-base/charts-base.js", 2398);
this._overlay.addClass(overlayClass);
            _yuitest_coverline("build/charts-base/charts-base.js", 2399);
this._overlay.setStyle("zIndex", 4);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2401);
this._setAriaElements(bb, cb);
        _yuitest_coverline("build/charts-base/charts-base.js", 2402);
this._redraw();
    },

    /**
     * When `interactionType` is set to `planar`, listens for mouse move events and fires `planarEvent:mouseover` or `planarEvent:mouseout`
     * depending on the position of the mouse in relation to data points on the `Chart`.
     *
     * @method _planarEventDispatcher
     * @param {Object} e Event object.
     * @private
     */
    _planarEventDispatcher: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_planarEventDispatcher", 2413);
_yuitest_coverline("build/charts-base/charts-base.js", 2415);
var graph = this.get("graph"),
            bb = this.get("boundingBox"),
            cb = graph.get("contentBox"),
            isTouch = e && e.hasOwnProperty("changedTouches"),
            pageX = isTouch ? e.changedTouches[0].pageX : e.pageX,
            pageY = isTouch ? e.changedTouches[0].pageY : e.pageY,
            posX = pageX - bb.getX(),
            posY = pageY - bb.getY(),
            offset = {
                x: pageX - cb.getX(),
                y: pageY - cb.getY()
            },
            sc = graph.get("seriesCollection"),
            series,
            i = 0,
            index,
            oldIndex = this._selectedIndex,
            item,
            items = [],
            categoryItems = [],
            valueItems = [],
            direction = this.get("direction"),
            hasMarkers,
            catAxis,
            valAxis,
            coord,
            //data columns and area data could be created on a graph level
            markerPlane,
            len,
            coords;
        _yuitest_coverline("build/charts-base/charts-base.js", 2445);
e.halt(true);
        _yuitest_coverline("build/charts-base/charts-base.js", 2446);
if(direction == "horizontal")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2448);
catAxis = "x";
            _yuitest_coverline("build/charts-base/charts-base.js", 2449);
valAxis = "y";
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2453);
valAxis = "x";
            _yuitest_coverline("build/charts-base/charts-base.js", 2454);
catAxis = "y";
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2456);
coord = offset[catAxis];
        _yuitest_coverline("build/charts-base/charts-base.js", 2457);
if(sc)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2459);
len = sc.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 2460);
while(i < len && !markerPlane)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2462);
if(sc[i])
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2464);
markerPlane = sc[i].get(catAxis + "MarkerPlane");
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 2466);
i++;
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2469);
if(markerPlane)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2471);
len = markerPlane.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 2472);
for(i = 0; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2474);
if(coord <= markerPlane[i].end && coord >= markerPlane[i].start)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2476);
index = i;
                    _yuitest_coverline("build/charts-base/charts-base.js", 2477);
break;
                }
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 2480);
len = sc.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 2481);
for(i = 0; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2483);
series = sc[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 2484);
coords = series.get(valAxis + "coords");
                _yuitest_coverline("build/charts-base/charts-base.js", 2485);
hasMarkers = series.get("markers");
                _yuitest_coverline("build/charts-base/charts-base.js", 2486);
if(hasMarkers && !isNaN(oldIndex) && oldIndex > -1)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2488);
series.updateMarkerState("mouseout", oldIndex);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 2490);
if(coords && coords[index] > -1)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2492);
if(hasMarkers && !isNaN(index) && index > -1)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2494);
series.updateMarkerState("mouseover", index);
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 2496);
item = this.getSeriesItems(series, index);
                    _yuitest_coverline("build/charts-base/charts-base.js", 2497);
categoryItems.push(item.category);
                    _yuitest_coverline("build/charts-base/charts-base.js", 2498);
valueItems.push(item.value);
                    _yuitest_coverline("build/charts-base/charts-base.js", 2499);
items.push(series);
                }

            }
            _yuitest_coverline("build/charts-base/charts-base.js", 2503);
this._selectedIndex = index;

            /**
             * Broadcasts when `interactionType` is set to `planar` and a series' marker plane has received a mouseover event.
             *
             *
             * @event planarEvent:mouseover
             * @preventable false
             * @param {EventFacade} e Event facade with the following additional
             *   properties:
             *  <dl>
             *      <dt>categoryItem</dt><dd>An array of hashes, each containing information about the category `Axis` of each marker
             *      whose plane has been intersected.</dd>
             *      <dt>valueItem</dt><dd>An array of hashes, each containing information about the value `Axis` of each marker whose
             *      plane has been intersected.</dd>
             *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
             *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
             *      <dt>pageX</dt><dd>The x location of the event on the page (including scroll)</dd>
             *      <dt>pageY</dt><dd>The y location of the event on the page (including scroll)</dd>
             *      <dt>items</dt><dd>An array including all the series which contain a marker whose plane has been intersected.</dd>
             *      <dt>index</dt><dd>Index of the markers in their respective series.</dd>
             *      <dt>originEvent</dt><dd>Underlying dom event.</dd>
             *  </dl>
             */
            /**
             * Broadcasts when `interactionType` is set to `planar` and a series' marker plane has received a mouseout event.
             *
             * @event planarEvent:mouseout
             * @preventable false
             * @param {EventFacade} e
             */
            _yuitest_coverline("build/charts-base/charts-base.js", 2534);
if(index > -1)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2536);
this.fire("planarEvent:mouseover", {
                    categoryItem:categoryItems,
                    valueItem:valueItems,
                    x:posX,
                    y:posY,
                    pageX:pageX,
                    pageY:pageY,
                    items:items,
                    index:index,
                    originEvent:e
                });
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2550);
this.fire("planarEvent:mouseout");
            }
        }
    },

    /**
     * Indicates the default series type for the chart.
     *
     * @property _type
     * @type {String}
     * @private
     */
    _type: "combo",

    /**
     * Queue of axes instances that will be updated. This method is used internally to determine when all axes have been updated.
     *
     * @property _itemRenderQueue
     * @type Array
     * @private
     */
    _itemRenderQueue: null,

    /**
     * Adds an `Axis` instance to the `_itemRenderQueue`.
     *
     * @method _addToAxesRenderQueue
     * @param {Axis} axis An `Axis` instance.
     * @private
     */
    _addToAxesRenderQueue: function(axis)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addToAxesRenderQueue", 2580);
_yuitest_coverline("build/charts-base/charts-base.js", 2582);
if(!this._itemRenderQueue)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2584);
this._itemRenderQueue = [];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2586);
if(Y.Array.indexOf(this._itemRenderQueue, axis) < 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2588);
this._itemRenderQueue.push(axis);
        }
    },

    /**
     * Adds axis instance to the appropriate array based on position
     *
     * @method _addToAxesCollection
     * @param {String} position The position of the axis
     * @param {Axis} axis The `Axis` instance
     */
    _addToAxesCollection: function(position, axis)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addToAxesCollection", 2599);
_yuitest_coverline("build/charts-base/charts-base.js", 2601);
var axesCollection = this.get(position + "AxesCollection");
        _yuitest_coverline("build/charts-base/charts-base.js", 2602);
if(!axesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2604);
axesCollection = [];
            _yuitest_coverline("build/charts-base/charts-base.js", 2605);
this.set(position + "AxesCollection", axesCollection);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2607);
axesCollection.push(axis);
    },

    /**
     * Returns the default value for the `seriesCollection` attribute.
     *
     * @method _getDefaultSeriesCollection
     * @param {Array} val Array containing either `CartesianSeries` instances or objects containing data to construct series instances.
     * @return Array
     * @private
     */
    _getDefaultSeriesCollection: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getDefaultSeriesCollection", 2618);
_yuitest_coverline("build/charts-base/charts-base.js", 2620);
var seriesCollection,
            dataProvider = this.get("dataProvider");
        _yuitest_coverline("build/charts-base/charts-base.js", 2622);
if(dataProvider)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2624);
seriesCollection = this._parseSeriesCollection();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2626);
return seriesCollection;
    },

    /**
     * Parses and returns a series collection from an object and default properties.
     *
     * @method _parseSeriesCollection
     * @param {Object} val Object contain properties for series being set.
     * @return Object
     * @private
     */
    _parseSeriesCollection: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_parseSeriesCollection", 2637);
_yuitest_coverline("build/charts-base/charts-base.js", 2639);
var dir = this.get("direction"),
            sc = [],
            catAxis,
            valAxis,
            tempKeys = [],
            series,
            seriesKeys = this.get("seriesKeys").concat(),
            i,
            index,
            l,
            type = this.get("type"),
            key,
            catKey,
            seriesKey,
            graph,
            orphans = [],
            categoryKey = this.get("categoryKey"),
            showMarkers = this.get("showMarkers"),
            showAreaFill = this.get("showAreaFill"),
            showLines = this.get("showLines");
        _yuitest_coverline("build/charts-base/charts-base.js", 2659);
val = val || [];
        _yuitest_coverline("build/charts-base/charts-base.js", 2660);
if(dir == "vertical")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2662);
catAxis = "yAxis";
            _yuitest_coverline("build/charts-base/charts-base.js", 2663);
catKey = "yKey";
            _yuitest_coverline("build/charts-base/charts-base.js", 2664);
valAxis = "xAxis";
            _yuitest_coverline("build/charts-base/charts-base.js", 2665);
seriesKey = "xKey";
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2669);
catAxis = "xAxis";
            _yuitest_coverline("build/charts-base/charts-base.js", 2670);
catKey = "xKey";
            _yuitest_coverline("build/charts-base/charts-base.js", 2671);
valAxis = "yAxis";
            _yuitest_coverline("build/charts-base/charts-base.js", 2672);
seriesKey = "yKey";
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2674);
l = val.length;
        _yuitest_coverline("build/charts-base/charts-base.js", 2675);
while(val && val.length > 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2677);
series = val.shift();
            _yuitest_coverline("build/charts-base/charts-base.js", 2678);
key = this._getBaseAttribute(series, seriesKey);
            _yuitest_coverline("build/charts-base/charts-base.js", 2679);
if(key)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2681);
index = Y.Array.indexOf(seriesKeys, key);
                _yuitest_coverline("build/charts-base/charts-base.js", 2682);
if(index > -1)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2684);
seriesKeys.splice(index, 1);
                    _yuitest_coverline("build/charts-base/charts-base.js", 2685);
tempKeys.push(key);
                    _yuitest_coverline("build/charts-base/charts-base.js", 2686);
sc.push(series);
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2690);
orphans.push(series);
                }
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2695);
orphans.push(series);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2698);
while(orphans.length > 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2700);
series = orphans.shift();
            _yuitest_coverline("build/charts-base/charts-base.js", 2701);
if(seriesKeys.length > 0)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2703);
key = seriesKeys.shift();
                _yuitest_coverline("build/charts-base/charts-base.js", 2704);
this._setBaseAttribute(series, seriesKey, key);
                _yuitest_coverline("build/charts-base/charts-base.js", 2705);
tempKeys.push(key);
                _yuitest_coverline("build/charts-base/charts-base.js", 2706);
sc.push(series);
            }
            else {_yuitest_coverline("build/charts-base/charts-base.js", 2708);
if(series instanceof Y.CartesianSeries)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2710);
series.destroy(true);
            }}
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2713);
if(seriesKeys.length > 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2715);
tempKeys = tempKeys.concat(seriesKeys);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2717);
l = tempKeys.length;
        _yuitest_coverline("build/charts-base/charts-base.js", 2718);
for(i = 0; i < l; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2720);
series = sc[i] || {type:type};
            _yuitest_coverline("build/charts-base/charts-base.js", 2721);
if(series instanceof Y.CartesianSeries)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2723);
this._parseSeriesAxes(series);
                _yuitest_coverline("build/charts-base/charts-base.js", 2724);
continue;
            }

            _yuitest_coverline("build/charts-base/charts-base.js", 2727);
series[catKey] = series[catKey] || categoryKey;
            _yuitest_coverline("build/charts-base/charts-base.js", 2728);
series[seriesKey] = series[seriesKey] || seriesKeys.shift();
            _yuitest_coverline("build/charts-base/charts-base.js", 2729);
series[catAxis] = this._getCategoryAxis();
            _yuitest_coverline("build/charts-base/charts-base.js", 2730);
series[valAxis] = this._getSeriesAxis(series[seriesKey]);

            _yuitest_coverline("build/charts-base/charts-base.js", 2732);
series.type = series.type || type;
            _yuitest_coverline("build/charts-base/charts-base.js", 2733);
series.direction = series.direction || dir;

            _yuitest_coverline("build/charts-base/charts-base.js", 2735);
if((series.type == "combo" || series.type == "stackedcombo" || series.type == "combospline" || series.type == "stackedcombospline"))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2737);
if(showAreaFill !== null)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2739);
series.showAreaFill = (series.showAreaFill !== null && series.showAreaFill !== undefined) ? series.showAreaFill : showAreaFill;
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 2741);
if(showMarkers !== null)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2743);
series.showMarkers = (series.showMarkers !== null && series.showMarkers !== undefined) ? series.showMarkers : showMarkers;
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 2745);
if(showLines !== null)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2747);
series.showLines = (series.showLines !== null && series.showLines !== undefined) ? series.showLines : showLines;
                }
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 2750);
sc[i] = series;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2752);
if(sc)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2754);
graph = this.get("graph");
            _yuitest_coverline("build/charts-base/charts-base.js", 2755);
graph.set("seriesCollection", sc);
            _yuitest_coverline("build/charts-base/charts-base.js", 2756);
sc = graph.get("seriesCollection");
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2758);
return sc;
    },

    /**
     * Parse and sets the axes for a series instance.
     *
     * @method _parseSeriesAxes
     * @param {CartesianSeries} series A `CartesianSeries` instance.
     * @private
     */
    _parseSeriesAxes: function(series)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_parseSeriesAxes", 2768);
_yuitest_coverline("build/charts-base/charts-base.js", 2770);
var axes = this.get("axes"),
            xAxis = series.get("xAxis"),
            yAxis = series.get("yAxis"),
            YAxis = Y.Axis,
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 2775);
if(xAxis && !(xAxis instanceof YAxis) && Y_Lang.isString(xAxis) && axes.hasOwnProperty(xAxis))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2777);
axis = axes[xAxis];
            _yuitest_coverline("build/charts-base/charts-base.js", 2778);
if(axis instanceof YAxis)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2780);
series.set("xAxis", axis);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2783);
if(yAxis && !(yAxis instanceof YAxis) && Y_Lang.isString(yAxis) && axes.hasOwnProperty(yAxis))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2785);
axis = axes[yAxis];
            _yuitest_coverline("build/charts-base/charts-base.js", 2786);
if(axis instanceof YAxis)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2788);
series.set("yAxis", axis);
            }
        }

    },

    /**
     * Returns the category axis instance for the chart.
     *
     * @method _getCategoryAxis
     * @return Axis
     * @private
     */
    _getCategoryAxis: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getCategoryAxis", 2801);
_yuitest_coverline("build/charts-base/charts-base.js", 2803);
var axis,
            axes = this.get("axes"),
            categoryAxisName = this.get("categoryAxisName") || this.get("categoryKey");
        _yuitest_coverline("build/charts-base/charts-base.js", 2806);
axis = axes[categoryAxisName];
        _yuitest_coverline("build/charts-base/charts-base.js", 2807);
return axis;
    },

    /**
     * Returns the value axis for a series.
     *
     * @method _getSeriesAxis
     * @param {String} key The key value used to determine the axis instance.
     * @return Axis
     * @private
     */
    _getSeriesAxis:function(key, axisName)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getSeriesAxis", 2818);
_yuitest_coverline("build/charts-base/charts-base.js", 2820);
var axes = this.get("axes"),
            i,
            keys,
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 2824);
if(axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2826);
if(axisName && axes.hasOwnProperty(axisName))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2828);
axis = axes[axisName];
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2832);
for(i in axes)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2834);
if(axes.hasOwnProperty(i))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2836);
keys = axes[i].get("keys");
                        _yuitest_coverline("build/charts-base/charts-base.js", 2837);
if(keys && keys.hasOwnProperty(key))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 2839);
axis = axes[i];
                            _yuitest_coverline("build/charts-base/charts-base.js", 2840);
break;
                        }
                    }
                }
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2846);
return axis;
    },

    /**
     * Gets an attribute from an object, using a getter for Base objects and a property for object
     * literals. Used for determining attributes from series/axis references which can be an actual class instance
     * or a hash of properties that will be used to create a class instance.
     *
     * @method _getBaseAttribute
     * @param {Object} item Object or instance in which the attribute resides.
     * @param {String} key Attribute whose value will be returned.
     * @return Object
     * @private
     */
    _getBaseAttribute: function(item, key)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getBaseAttribute", 2860);
_yuitest_coverline("build/charts-base/charts-base.js", 2862);
if(item instanceof Y.Base)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2864);
return item.get(key);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2866);
if(item.hasOwnProperty(key))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2868);
return item[key];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2870);
return null;
    },

    /**
     * Sets an attribute on an object, using a setter of Base objects and a property for object
     * literals. Used for setting attributes on a Base class, either directly or to be stored in an object literal
     * for use at instantiation.
     *
     * @method _setBaseAttribute
     * @param {Object} item Object or instance in which the attribute resides.
     * @param {String} key Attribute whose value will be assigned.
     * @param {Object} value Value to be assigned to the attribute.
     * @private
     */
    _setBaseAttribute: function(item, key, value)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_setBaseAttribute", 2884);
_yuitest_coverline("build/charts-base/charts-base.js", 2886);
if(item instanceof Y.Base)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2888);
item.set(key, value);
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2892);
item[key] = value;
        }
    },

    /**
     * Creates `Axis` instances.
     *
     * @method _setAxes
     * @param {Object} val Object containing `Axis` instances or objects in which to construct `Axis` instances.
     * @return Object
     * @private
     */
    _setAxes: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_setAxes", 2904);
_yuitest_coverline("build/charts-base/charts-base.js", 2906);
var hash = this._parseAxes(val),
            axes = {},
            axesAttrs = {
                edgeOffset: "edgeOffset",
                position: "position",
                overlapGraph:"overlapGraph",
                labelFunction:"labelFunction",
                labelFunctionScope:"labelFunctionScope",
                labelFormat:"labelFormat",
                appendLabelFunction: "appendLabelFunction",
                appendTitleFunction: "appendTitleFunction",
                maximum:"maximum",
                minimum:"minimum",
                roundingMethod:"roundingMethod",
                alwaysShowZero:"alwaysShowZero",
                title:"title",
                width:"width",
                height:"height"
            },
            dp = this.get("dataProvider"),
            ai,
            i,
            pos,
            axis,
            axisPosition,
            dh,
            axisClass,
            config,
            axesCollection;
        _yuitest_coverline("build/charts-base/charts-base.js", 2935);
for(i in hash)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2937);
if(hash.hasOwnProperty(i))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2939);
dh = hash[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 2940);
if(dh instanceof Y.Axis)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2942);
axis = dh;
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2946);
axis = null;
                    _yuitest_coverline("build/charts-base/charts-base.js", 2947);
config = {};
                    _yuitest_coverline("build/charts-base/charts-base.js", 2948);
config.dataProvider = dh.dataProvider || dp;
                    _yuitest_coverline("build/charts-base/charts-base.js", 2949);
config.keys = dh.keys;

                    _yuitest_coverline("build/charts-base/charts-base.js", 2951);
if(dh.hasOwnProperty("roundingUnit"))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2953);
config.roundingUnit = dh.roundingUnit;
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 2955);
pos = dh.position;
                    _yuitest_coverline("build/charts-base/charts-base.js", 2956);
if(dh.styles)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2958);
config.styles = dh.styles;
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 2960);
config.position = dh.position;
                    _yuitest_coverline("build/charts-base/charts-base.js", 2961);
for(ai in axesAttrs)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2963);
if(axesAttrs.hasOwnProperty(ai) && dh.hasOwnProperty(ai))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 2965);
config[ai] = dh[ai];
                        }
                    }

                    //only check for existing axis if we constructed the default axes already
                    _yuitest_coverline("build/charts-base/charts-base.js", 2970);
if(val)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2972);
axis = this.getAxisByKey(i);
                    }

                    _yuitest_coverline("build/charts-base/charts-base.js", 2975);
if(axis && axis instanceof Y.Axis)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2977);
axisPosition = axis.get("position");
                        _yuitest_coverline("build/charts-base/charts-base.js", 2978);
if(pos != axisPosition)
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 2980);
if(axisPosition != "none")
                            {
                                _yuitest_coverline("build/charts-base/charts-base.js", 2982);
axesCollection = this.get(axisPosition + "AxesCollection");
                                _yuitest_coverline("build/charts-base/charts-base.js", 2983);
axesCollection.splice(Y.Array.indexOf(axesCollection, axis), 1);
                            }
                            _yuitest_coverline("build/charts-base/charts-base.js", 2985);
if(pos != "none")
                            {
                                _yuitest_coverline("build/charts-base/charts-base.js", 2987);
this._addToAxesCollection(pos, axis);
                            }
                        }
                        _yuitest_coverline("build/charts-base/charts-base.js", 2990);
axis.setAttrs(config);
                    }
                    else
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2994);
axisClass = this._getAxisClass(dh.type);
                        _yuitest_coverline("build/charts-base/charts-base.js", 2995);
axis = new axisClass(config);
                        _yuitest_coverline("build/charts-base/charts-base.js", 2996);
axis.after("axisRendered", Y.bind(this._itemRendered, this));
                    }
                }

                _yuitest_coverline("build/charts-base/charts-base.js", 3000);
if(axis)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3002);
axesCollection = this.get(pos + "AxesCollection");
                    _yuitest_coverline("build/charts-base/charts-base.js", 3003);
if(axesCollection && Y.Array.indexOf(axesCollection, axis) > 0)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3005);
axis.set("overlapGraph", false);
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 3007);
axes[i] = axis;
                }
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3011);
return axes;
    },

    /**
     * Adds axes to the chart.
     *
     * @method _addAxes
     * @private
     */
    _addAxes: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addAxes", 3020);
_yuitest_coverline("build/charts-base/charts-base.js", 3022);
var axes = this.get("axes"),
            i,
            axis,
            pos,
            w = this.get("width"),
            h = this.get("height"),
            node = Y.Node.one(this._parentNode);
        _yuitest_coverline("build/charts-base/charts-base.js", 3029);
if(!this._axesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3031);
this._axesCollection = [];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3033);
for(i in axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3035);
if(axes.hasOwnProperty(i))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3037);
axis = axes[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3038);
if(axis instanceof Y.Axis)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3040);
if(!w)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3042);
this.set("width", node.get("offsetWidth"));
                        _yuitest_coverline("build/charts-base/charts-base.js", 3043);
w = this.get("width");
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 3045);
if(!h)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3047);
this.set("height", node.get("offsetHeight"));
                        _yuitest_coverline("build/charts-base/charts-base.js", 3048);
h = this.get("height");
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 3050);
this._addToAxesRenderQueue(axis);
                    _yuitest_coverline("build/charts-base/charts-base.js", 3051);
pos = axis.get("position");
                    _yuitest_coverline("build/charts-base/charts-base.js", 3052);
if(!this.get(pos + "AxesCollection"))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3054);
this.set(pos + "AxesCollection", [axis]);
                    }
                    else
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3058);
this.get(pos + "AxesCollection").push(axis);
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 3060);
this._axesCollection.push(axis);
                    _yuitest_coverline("build/charts-base/charts-base.js", 3061);
if(axis.get("keys").hasOwnProperty(this.get("categoryKey")))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3063);
this.set("categoryAxis", axis);
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 3065);
axis.render(this.get("contentBox"));
                }
            }
        }
    },

    /**
     * Renders the Graph.
     *
     * @method _addSeries
     * @private
     */
    _addSeries: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addSeries", 3077);
_yuitest_coverline("build/charts-base/charts-base.js", 3079);
var graph = this.get("graph"),
            sc = this.get("seriesCollection");
        _yuitest_coverline("build/charts-base/charts-base.js", 3081);
graph.render(this.get("contentBox"));

    },

    /**
     * Adds gridlines to the chart.
     *
     * @method _addGridlines
     * @private
     */
    _addGridlines: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addGridlines", 3091);
_yuitest_coverline("build/charts-base/charts-base.js", 3093);
var graph = this.get("graph"),
            hgl = this.get("horizontalGridlines"),
            vgl = this.get("verticalGridlines"),
            direction = this.get("direction"),
            leftAxesCollection = this.get("leftAxesCollection"),
            rightAxesCollection = this.get("rightAxesCollection"),
            bottomAxesCollection = this.get("bottomAxesCollection"),
            topAxesCollection = this.get("topAxesCollection"),
            seriesAxesCollection,
            catAxis = this.get("categoryAxis"),
            hAxis,
            vAxis;
        _yuitest_coverline("build/charts-base/charts-base.js", 3105);
if(this._axesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3107);
seriesAxesCollection = this._axesCollection.concat();
            _yuitest_coverline("build/charts-base/charts-base.js", 3108);
seriesAxesCollection.splice(Y.Array.indexOf(seriesAxesCollection, catAxis), 1);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3110);
if(hgl)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3112);
if(leftAxesCollection && leftAxesCollection[0])
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3114);
hAxis = leftAxesCollection[0];
            }
            else {_yuitest_coverline("build/charts-base/charts-base.js", 3116);
if(rightAxesCollection && rightAxesCollection[0])
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3118);
hAxis = rightAxesCollection[0];
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3122);
hAxis = direction == "horizontal" ? catAxis : seriesAxesCollection[0];
            }}
            _yuitest_coverline("build/charts-base/charts-base.js", 3124);
if(!this._getBaseAttribute(hgl, "axis") && hAxis)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3126);
this._setBaseAttribute(hgl, "axis", hAxis);
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3128);
if(this._getBaseAttribute(hgl, "axis"))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3130);
graph.set("horizontalGridlines", hgl);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3133);
if(vgl)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3135);
if(bottomAxesCollection && bottomAxesCollection[0])
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3137);
vAxis = bottomAxesCollection[0];
            }
            else {_yuitest_coverline("build/charts-base/charts-base.js", 3139);
if (topAxesCollection && topAxesCollection[0])
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3141);
vAxis = topAxesCollection[0];
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3145);
vAxis = direction == "vertical" ? catAxis : seriesAxesCollection[0];
            }}
            _yuitest_coverline("build/charts-base/charts-base.js", 3147);
if(!this._getBaseAttribute(vgl, "axis") && vAxis)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3149);
this._setBaseAttribute(vgl, "axis", vAxis);
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3151);
if(this._getBaseAttribute(vgl, "axis"))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3153);
graph.set("verticalGridlines", vgl);
            }
        }
    },

    /**
     * Default Function for the axes attribute.
     *
     * @method _getDefaultAxes
     * @return Object
     * @private
     */
    _getDefaultAxes: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getDefaultAxes", 3165);
_yuitest_coverline("build/charts-base/charts-base.js", 3167);
var axes;
        _yuitest_coverline("build/charts-base/charts-base.js", 3168);
if(this.get("dataProvider"))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3170);
axes = this._parseAxes();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3172);
return axes;
    },

    /**
     * Generates and returns a key-indexed object containing `Axis` instances or objects used to create `Axis` instances.
     *
     * @method _parseAxes
     * @param {Object} axes Object containing `Axis` instances or `Axis` attributes.
     * @return Object
     * @private
     */
    _parseAxes: function(axes)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_parseAxes", 3183);
_yuitest_coverline("build/charts-base/charts-base.js", 3185);
var catKey = this.get("categoryKey"),
            axis,
            attr,
            keys,
            newAxes = {},
            claimedKeys = [],
            categoryAxisName = this.get("categoryAxisName") || this.get("categoryKey"),
            valueAxisName = this.get("valueAxisName"),
            seriesKeys = this.get("seriesKeys").concat(),
            i,
            l,
            ii,
            ll,
            cIndex,
            direction = this.get("direction"),
            seriesPosition,
            categoryPosition,
            valueAxes = [],
            seriesAxis = this.get("stacked") ? "stacked" : "numeric";
        _yuitest_coverline("build/charts-base/charts-base.js", 3204);
if(direction == "vertical")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3206);
seriesPosition = "bottom";
            _yuitest_coverline("build/charts-base/charts-base.js", 3207);
categoryPosition = "left";
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3211);
seriesPosition = "left";
            _yuitest_coverline("build/charts-base/charts-base.js", 3212);
categoryPosition = "bottom";
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3214);
if(axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3216);
for(i in axes)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3218);
if(axes.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3220);
axis = axes[i];
                    _yuitest_coverline("build/charts-base/charts-base.js", 3221);
keys = this._getBaseAttribute(axis, "keys");
                    _yuitest_coverline("build/charts-base/charts-base.js", 3222);
attr = this._getBaseAttribute(axis, "type");
                    _yuitest_coverline("build/charts-base/charts-base.js", 3223);
if(attr == "time" || attr == "category")
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3225);
categoryAxisName = i;
                        _yuitest_coverline("build/charts-base/charts-base.js", 3226);
this.set("categoryAxisName", i);
                        _yuitest_coverline("build/charts-base/charts-base.js", 3227);
if(Y_Lang.isArray(keys) && keys.length > 0)
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 3229);
catKey = keys[0];
                            _yuitest_coverline("build/charts-base/charts-base.js", 3230);
this.set("categoryKey", catKey);
                        }
                        _yuitest_coverline("build/charts-base/charts-base.js", 3232);
newAxes[i] = axis;
                    }
                    else {_yuitest_coverline("build/charts-base/charts-base.js", 3234);
if(i == categoryAxisName)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3236);
newAxes[i] = axis;
                    }
                    else
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3240);
newAxes[i] = axis;
                        _yuitest_coverline("build/charts-base/charts-base.js", 3241);
if(i != valueAxisName && keys && Y_Lang.isArray(keys))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 3243);
ll = keys.length;
                            _yuitest_coverline("build/charts-base/charts-base.js", 3244);
for(ii = 0; ii < ll; ++ii)
                            {
                                _yuitest_coverline("build/charts-base/charts-base.js", 3246);
claimedKeys.push(keys[ii]);
                            }
                            _yuitest_coverline("build/charts-base/charts-base.js", 3248);
valueAxes.push(newAxes[i]);
                        }
                        _yuitest_coverline("build/charts-base/charts-base.js", 3250);
if(!(this._getBaseAttribute(newAxes[i], "type")))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 3252);
this._setBaseAttribute(newAxes[i], "type", seriesAxis);
                        }
                        _yuitest_coverline("build/charts-base/charts-base.js", 3254);
if(!(this._getBaseAttribute(newAxes[i], "position")))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 3256);
this._setBaseAttribute(newAxes[i], "position", this._getDefaultAxisPosition(newAxes[i], valueAxes, seriesPosition));
                        }
                    }}
                }
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3262);
cIndex = Y.Array.indexOf(seriesKeys, catKey);
        _yuitest_coverline("build/charts-base/charts-base.js", 3263);
if(cIndex > -1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3265);
seriesKeys.splice(cIndex, 1);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3267);
l = claimedKeys.length;
        _yuitest_coverline("build/charts-base/charts-base.js", 3268);
for(i = 0; i < l; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3270);
cIndex = Y.Array.indexOf(seriesKeys, claimedKeys[i]);
            _yuitest_coverline("build/charts-base/charts-base.js", 3271);
if(cIndex > -1)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3273);
seriesKeys.splice(cIndex, 1);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3276);
if(!newAxes.hasOwnProperty(categoryAxisName))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3278);
newAxes[categoryAxisName] = {};
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3280);
if(!(this._getBaseAttribute(newAxes[categoryAxisName], "keys")))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3282);
this._setBaseAttribute(newAxes[categoryAxisName], "keys", [catKey]);
        }

        _yuitest_coverline("build/charts-base/charts-base.js", 3285);
if(!(this._getBaseAttribute(newAxes[categoryAxisName], "position")))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3287);
this._setBaseAttribute(newAxes[categoryAxisName], "position", categoryPosition);
        }

        _yuitest_coverline("build/charts-base/charts-base.js", 3290);
if(!(this._getBaseAttribute(newAxes[categoryAxisName], "type")))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3292);
this._setBaseAttribute(newAxes[categoryAxisName], "type", this.get("categoryType"));
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3294);
if(!newAxes.hasOwnProperty(valueAxisName) && seriesKeys && seriesKeys.length > 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3296);
newAxes[valueAxisName] = {keys:seriesKeys};
            _yuitest_coverline("build/charts-base/charts-base.js", 3297);
valueAxes.push(newAxes[valueAxisName]);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3299);
if(claimedKeys.length > 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3301);
if(seriesKeys.length > 0)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3303);
seriesKeys = claimedKeys.concat(seriesKeys);
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3307);
seriesKeys = claimedKeys;
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3310);
if(newAxes.hasOwnProperty(valueAxisName))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3312);
if(!(this._getBaseAttribute(newAxes[valueAxisName], "position")))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3314);
this._setBaseAttribute(newAxes[valueAxisName], "position", this._getDefaultAxisPosition(newAxes[valueAxisName], valueAxes, seriesPosition));
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3316);
this._setBaseAttribute(newAxes[valueAxisName], "type", seriesAxis);
            _yuitest_coverline("build/charts-base/charts-base.js", 3317);
this._setBaseAttribute(newAxes[valueAxisName], "keys", seriesKeys);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3319);
if(!this._seriesKeysExplicitlySet)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3321);
this._seriesKeys = seriesKeys;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3323);
return newAxes;
    },

    /**
     * Determines the position of an axis when one is not specified.
     *
     * @method _getDefaultAxisPosition
     * @param {Axis} axis `Axis` instance.
     * @param {Array} valueAxes Array of `Axis` instances.
     * @param {String} position Default position depending on the direction of the chart and type of axis.
     * @return String
     * @private
     */
    _getDefaultAxisPosition: function(axis, valueAxes, position)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getDefaultAxisPosition", 3336);
_yuitest_coverline("build/charts-base/charts-base.js", 3338);
var direction = this.get("direction"),
            i = Y.Array.indexOf(valueAxes, axis);

        _yuitest_coverline("build/charts-base/charts-base.js", 3341);
if(valueAxes[i - 1] && valueAxes[i - 1].position)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3343);
if(direction == "horizontal")
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3345);
if(valueAxes[i - 1].position == "left")
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3347);
position = "right";
                }
                else {_yuitest_coverline("build/charts-base/charts-base.js", 3349);
if(valueAxes[i - 1].position == "right")
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3351);
position = "left";
                }}
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3356);
if (valueAxes[i -1].position == "bottom")
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3358);
position = "top";
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3362);
position = "bottom";
                }
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3366);
return position;
    },


    /**
     * Returns an object literal containing a categoryItem and a valueItem for a given series index. Below is the structure of each:
     *
     * @method getSeriesItems
     * @param {CartesianSeries} series Reference to a series.
     * @param {Number} index Index of the specified item within a series.
     * @return Object An object literal containing the following:
     *
     *  <dl>
     *      <dt>categoryItem</dt><dd>Object containing the following data related to the category axis of the series.
     *  <dl>
     *      <dt>axis</dt><dd>Reference to the category axis of the series.</dd>
     *      <dt>key</dt><dd>Category key for the series.</dd>
     *      <dt>value</dt><dd>Value on the axis corresponding to the series index.</dd>
     *  </dl>
     *      </dd>
     *      <dt>valueItem</dt><dd>Object containing the following data related to the category axis of the series.
     *  <dl>
     *      <dt>axis</dt><dd>Reference to the value axis of the series.</dd>
     *      <dt>key</dt><dd>Value key for the series.</dd>
     *      <dt>value</dt><dd>Value on the axis corresponding to the series index.</dd>
     *  </dl>
     *      </dd>
     *  </dl>
     */
    getSeriesItems: function(series, index)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "getSeriesItems", 3395);
_yuitest_coverline("build/charts-base/charts-base.js", 3397);
var xAxis = series.get("xAxis"),
            yAxis = series.get("yAxis"),
            xKey = series.get("xKey"),
            yKey = series.get("yKey"),
            categoryItem,
            valueItem;
        _yuitest_coverline("build/charts-base/charts-base.js", 3403);
if(this.get("direction") == "vertical")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3405);
categoryItem = {
                axis:yAxis,
                key:yKey,
                value:yAxis.getKeyValueAt(yKey, index)
            };
            _yuitest_coverline("build/charts-base/charts-base.js", 3410);
valueItem = {
                axis:xAxis,
                key:xKey,
                value: xAxis.getKeyValueAt(xKey, index)
            };
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3418);
valueItem = {
                axis:yAxis,
                key:yKey,
                value:yAxis.getKeyValueAt(yKey, index)
            };
            _yuitest_coverline("build/charts-base/charts-base.js", 3423);
categoryItem = {
                axis:xAxis,
                key:xKey,
                value: xAxis.getKeyValueAt(xKey, index)
            };
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3429);
categoryItem.displayName = series.get("categoryDisplayName");
        _yuitest_coverline("build/charts-base/charts-base.js", 3430);
valueItem.displayName = series.get("valueDisplayName");
        _yuitest_coverline("build/charts-base/charts-base.js", 3431);
categoryItem.value = categoryItem.axis.getKeyValueAt(categoryItem.key, index);
        _yuitest_coverline("build/charts-base/charts-base.js", 3432);
valueItem.value = valueItem.axis.getKeyValueAt(valueItem.key, index);
        _yuitest_coverline("build/charts-base/charts-base.js", 3433);
return {category:categoryItem, value:valueItem};
    },

    /**
     * Handler for sizeChanged event.
     *
     * @method _sizeChanged
     * @param {Object} e Event object.
     * @private
     */
    _sizeChanged: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_sizeChanged", 3443);
_yuitest_coverline("build/charts-base/charts-base.js", 3445);
if(this._axesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3447);
var ac = this._axesCollection,
                i = 0,
                l = ac.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3450);
for(; i < l; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3452);
this._addToAxesRenderQueue(ac[i]);
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3454);
this._redraw();
        }
    },

    /**
     * Returns the maximum distance in pixels that the extends outside the top bounds of all vertical axes.
     *
     * @method _getTopOverflow
     * @param {Array} set1 Collection of axes to check.
     * @param {Array} set2 Seconf collection of axes to check.
     * @param {Number} width Width of the axes
     * @return Number
     * @private
     */
    _getTopOverflow: function(set1, set2, height)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getTopOverflow", 3468);
_yuitest_coverline("build/charts-base/charts-base.js", 3470);
var i = 0,
            len,
            overflow = 0,
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 3474);
if(set1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3476);
len = set1.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3477);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3479);
axis = set1[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3480);
overflow = Math.max(overflow, Math.abs(axis.getMaxLabelBounds().top) - (axis.getEdgeOffset(axis.get("styles").majorTicks.count, height) * 0.5));
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3483);
if(set2)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3485);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3486);
len = set2.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3487);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3489);
axis = set2[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3490);
overflow = Math.max(overflow, Math.abs(axis.getMaxLabelBounds().top) - (axis.getEdgeOffset(axis.get("styles").majorTicks.count, height) * 0.5));
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3493);
return overflow;
    },

    /**
     * Returns the maximum distance in pixels that the extends outside the right bounds of all horizontal axes.
     *
     * @method _getRightOverflow
     * @param {Array} set1 Collection of axes to check.
     * @param {Array} set2 Seconf collection of axes to check.
     * @param {Number} width Width of the axes
     * @return Number
     * @private
     */
    _getRightOverflow: function(set1, set2, width)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getRightOverflow", 3506);
_yuitest_coverline("build/charts-base/charts-base.js", 3508);
var i = 0,
            len,
            overflow = 0,
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 3512);
if(set1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3514);
len = set1.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3515);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3517);
axis = set1[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3518);
overflow = Math.max(overflow, axis.getMaxLabelBounds().right - (axis.getEdgeOffset(axis.get("styles").majorTicks.count, width) * 0.5));
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3521);
if(set2)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3523);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3524);
len = set2.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3525);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3527);
axis = set2[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3528);
overflow = Math.max(overflow, axis.getMaxLabelBounds().right - (axis.getEdgeOffset(axis.get("styles").majorTicks.count, width) * 0.5));
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3531);
return overflow;
    },

    /**
     * Returns the maximum distance in pixels that the extends outside the left bounds of all horizontal axes.
     *
     * @method _getLeftOverflow
     * @param {Array} set1 Collection of axes to check.
     * @param {Array} set2 Seconf collection of axes to check.
     * @param {Number} width Width of the axes
     * @return Number
     * @private
     */
    _getLeftOverflow: function(set1, set2, width)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getLeftOverflow", 3544);
_yuitest_coverline("build/charts-base/charts-base.js", 3546);
var i = 0,
            len,
            overflow = 0,
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 3550);
if(set1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3552);
len = set1.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3553);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3555);
axis = set1[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3556);
overflow = Math.max(overflow, Math.abs(axis.getMinLabelBounds().left) - (axis.getEdgeOffset(axis.get("styles").majorTicks.count, width) * 0.5));
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3559);
if(set2)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3561);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3562);
len = set2.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3563);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3565);
axis = set2[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3566);
overflow = Math.max(overflow, Math.abs(axis.getMinLabelBounds().left) - (axis.getEdgeOffset(axis.get("styles").majorTicks.count, width) * 0.5));
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3569);
return overflow;
    },

    /**
     * Returns the maximum distance in pixels that the extends outside the bottom bounds of all vertical axes.
     *
     * @method _getBottomOverflow
     * @param {Array} set1 Collection of axes to check.
     * @param {Array} set2 Seconf collection of axes to check.
     * @param {Number} height Height of the axes
     * @return Number
     * @private
     */
    _getBottomOverflow: function(set1, set2, height)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getBottomOverflow", 3582);
_yuitest_coverline("build/charts-base/charts-base.js", 3584);
var i = 0,
            len,
            overflow = 0,
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 3588);
if(set1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3590);
len = set1.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3591);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3593);
axis = set1[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3594);
overflow = Math.max(overflow, axis.getMinLabelBounds().bottom - (axis.getEdgeOffset(axis.get("styles").majorTicks.count, height) * 0.5));
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3597);
if(set2)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3599);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3600);
len = set2.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3601);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3603);
axis = set2[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3604);
overflow = Math.max(overflow, axis.getMinLabelBounds().bottom - (axis.getEdgeOffset(axis.get("styles").majorTicks.count, height) * 0.5));
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3607);
return overflow;
    },

    /**
     * Redraws and position all the components of the chart instance.
     *
     * @method _redraw
     * @private
     */
    _redraw: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_redraw", 3616);
_yuitest_coverline("build/charts-base/charts-base.js", 3618);
if(this._drawing)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3620);
this._callLater = true;
            _yuitest_coverline("build/charts-base/charts-base.js", 3621);
return;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3623);
this._drawing = true;
        _yuitest_coverline("build/charts-base/charts-base.js", 3624);
this._callLater = false;
        _yuitest_coverline("build/charts-base/charts-base.js", 3625);
var w = this.get("width"),
            h = this.get("height"),
            leftPaneWidth = 0,
            rightPaneWidth = 0,
            topPaneHeight = 0,
            bottomPaneHeight = 0,
            leftAxesCollection = this.get("leftAxesCollection"),
            rightAxesCollection = this.get("rightAxesCollection"),
            topAxesCollection = this.get("topAxesCollection"),
            bottomAxesCollection = this.get("bottomAxesCollection"),
            i = 0,
            l,
            axis,
            graphOverflow = "visible",
            graph = this.get("graph"),
            topOverflow,
            bottomOverflow,
            leftOverflow,
            rightOverflow,
            graphWidth,
            graphHeight,
            graphX,
            graphY,
            allowContentOverflow = this.get("allowContentOverflow"),
            diff,
            rightAxesXCoords,
            leftAxesXCoords,
            topAxesYCoords,
            bottomAxesYCoords,
            graphRect = {};
        _yuitest_coverline("build/charts-base/charts-base.js", 3655);
if(leftAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3657);
leftAxesXCoords = [];
            _yuitest_coverline("build/charts-base/charts-base.js", 3658);
l = leftAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3659);
for(i = l - 1; i > -1; --i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3661);
leftAxesXCoords.unshift(leftPaneWidth);
                _yuitest_coverline("build/charts-base/charts-base.js", 3662);
leftPaneWidth += leftAxesCollection[i].get("width");
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3665);
if(rightAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3667);
rightAxesXCoords = [];
            _yuitest_coverline("build/charts-base/charts-base.js", 3668);
l = rightAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3669);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3670);
for(i = l - 1; i > -1; --i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3672);
rightPaneWidth += rightAxesCollection[i].get("width");
                _yuitest_coverline("build/charts-base/charts-base.js", 3673);
rightAxesXCoords.unshift(w - rightPaneWidth);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3676);
if(topAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3678);
topAxesYCoords = [];
            _yuitest_coverline("build/charts-base/charts-base.js", 3679);
l = topAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3680);
for(i = l - 1; i > -1; --i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3682);
topAxesYCoords.unshift(topPaneHeight);
                _yuitest_coverline("build/charts-base/charts-base.js", 3683);
topPaneHeight += topAxesCollection[i].get("height");
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3686);
if(bottomAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3688);
bottomAxesYCoords = [];
            _yuitest_coverline("build/charts-base/charts-base.js", 3689);
l = bottomAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3690);
for(i = l - 1; i > -1; --i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3692);
bottomPaneHeight += bottomAxesCollection[i].get("height");
                _yuitest_coverline("build/charts-base/charts-base.js", 3693);
bottomAxesYCoords.unshift(h - bottomPaneHeight);
            }
        }

        _yuitest_coverline("build/charts-base/charts-base.js", 3697);
graphWidth = w - (leftPaneWidth + rightPaneWidth);
        _yuitest_coverline("build/charts-base/charts-base.js", 3698);
graphHeight = h - (bottomPaneHeight + topPaneHeight);
        _yuitest_coverline("build/charts-base/charts-base.js", 3699);
graphRect.left = leftPaneWidth;
        _yuitest_coverline("build/charts-base/charts-base.js", 3700);
graphRect.top = topPaneHeight;
        _yuitest_coverline("build/charts-base/charts-base.js", 3701);
graphRect.bottom = h - bottomPaneHeight;
        _yuitest_coverline("build/charts-base/charts-base.js", 3702);
graphRect.right = w - rightPaneWidth;
        _yuitest_coverline("build/charts-base/charts-base.js", 3703);
if(!allowContentOverflow)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3705);
topOverflow = this._getTopOverflow(leftAxesCollection, rightAxesCollection);
            _yuitest_coverline("build/charts-base/charts-base.js", 3706);
bottomOverflow = this._getBottomOverflow(leftAxesCollection, rightAxesCollection);
            _yuitest_coverline("build/charts-base/charts-base.js", 3707);
leftOverflow = this._getLeftOverflow(bottomAxesCollection, topAxesCollection);
            _yuitest_coverline("build/charts-base/charts-base.js", 3708);
rightOverflow = this._getRightOverflow(bottomAxesCollection, topAxesCollection);

            _yuitest_coverline("build/charts-base/charts-base.js", 3710);
diff = topOverflow - topPaneHeight;
            _yuitest_coverline("build/charts-base/charts-base.js", 3711);
if(diff > 0)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3713);
graphRect.top = topOverflow;
                _yuitest_coverline("build/charts-base/charts-base.js", 3714);
if(topAxesYCoords)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3716);
i = 0;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3717);
l = topAxesYCoords.length;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3718);
for(; i < l; ++i)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3720);
topAxesYCoords[i] += diff;
                    }
                }
            }

            _yuitest_coverline("build/charts-base/charts-base.js", 3725);
diff = bottomOverflow - bottomPaneHeight;
            _yuitest_coverline("build/charts-base/charts-base.js", 3726);
if(diff > 0)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3728);
graphRect.bottom = h - bottomOverflow;
                _yuitest_coverline("build/charts-base/charts-base.js", 3729);
if(bottomAxesYCoords)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3731);
i = 0;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3732);
l = bottomAxesYCoords.length;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3733);
for(; i < l; ++i)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3735);
bottomAxesYCoords[i] -= diff;
                    }
                }
            }

            _yuitest_coverline("build/charts-base/charts-base.js", 3740);
diff = leftOverflow - leftPaneWidth;
            _yuitest_coverline("build/charts-base/charts-base.js", 3741);
if(diff > 0)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3743);
graphRect.left = leftOverflow;
                _yuitest_coverline("build/charts-base/charts-base.js", 3744);
if(leftAxesXCoords)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3746);
i = 0;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3747);
l = leftAxesXCoords.length;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3748);
for(; i < l; ++i)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3750);
leftAxesXCoords[i] += diff;
                    }
                }
            }

            _yuitest_coverline("build/charts-base/charts-base.js", 3755);
diff = rightOverflow - rightPaneWidth;
            _yuitest_coverline("build/charts-base/charts-base.js", 3756);
if(diff > 0)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3758);
graphRect.right = w - rightOverflow;
                _yuitest_coverline("build/charts-base/charts-base.js", 3759);
if(rightAxesXCoords)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3761);
i = 0;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3762);
l = rightAxesXCoords.length;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3763);
for(; i < l; ++i)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3765);
rightAxesXCoords[i] -= diff;
                    }
                }
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3770);
graphWidth = graphRect.right - graphRect.left;
        _yuitest_coverline("build/charts-base/charts-base.js", 3771);
graphHeight = graphRect.bottom - graphRect.top;
        _yuitest_coverline("build/charts-base/charts-base.js", 3772);
graphX = graphRect.left;
        _yuitest_coverline("build/charts-base/charts-base.js", 3773);
graphY = graphRect.top;
        _yuitest_coverline("build/charts-base/charts-base.js", 3774);
if(topAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3776);
l = topAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3777);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3778);
for(; i < l; i++)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3780);
axis = topAxesCollection[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3781);
if(axis.get("width") !== graphWidth)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3783);
axis.set("width", graphWidth);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 3785);
axis.get("boundingBox").setStyle("left", graphX + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 3786);
axis.get("boundingBox").setStyle("top", topAxesYCoords[i] + "px");
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3788);
if(axis._hasDataOverflow())
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3790);
graphOverflow = "hidden";
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3793);
if(bottomAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3795);
l = bottomAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3796);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3797);
for(; i < l; i++)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3799);
axis = bottomAxesCollection[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3800);
if(axis.get("width") !== graphWidth)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3802);
axis.set("width", graphWidth);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 3804);
axis.get("boundingBox").setStyle("left", graphX + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 3805);
axis.get("boundingBox").setStyle("top", bottomAxesYCoords[i] + "px");
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3807);
if(axis._hasDataOverflow())
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3809);
graphOverflow = "hidden";
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3812);
if(leftAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3814);
l = leftAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3815);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3816);
for(; i < l; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3818);
axis = leftAxesCollection[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3819);
axis.get("boundingBox").setStyle("top", graphY + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 3820);
axis.get("boundingBox").setStyle("left", leftAxesXCoords[i] + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 3821);
if(axis.get("height") !== graphHeight)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3823);
axis.set("height", graphHeight);
                }
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3826);
if(axis._hasDataOverflow())
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3828);
graphOverflow = "hidden";
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3831);
if(rightAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3833);
l = rightAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3834);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3835);
for(; i < l; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3837);
axis = rightAxesCollection[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3838);
axis.get("boundingBox").setStyle("top", graphY + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 3839);
axis.get("boundingBox").setStyle("left", rightAxesXCoords[i] + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 3840);
if(axis.get("height") !== graphHeight)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3842);
axis.set("height", graphHeight);
                }
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3845);
if(axis._hasDataOverflow())
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3847);
graphOverflow = "hidden";
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3850);
this._drawing = false;
        _yuitest_coverline("build/charts-base/charts-base.js", 3851);
if(this._callLater)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3853);
this._redraw();
            _yuitest_coverline("build/charts-base/charts-base.js", 3854);
return;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3856);
if(graph)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3858);
graph.get("boundingBox").setStyle("left", graphX + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 3859);
graph.get("boundingBox").setStyle("top", graphY + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 3860);
graph.set("width", graphWidth);
            _yuitest_coverline("build/charts-base/charts-base.js", 3861);
graph.set("height", graphHeight);
            _yuitest_coverline("build/charts-base/charts-base.js", 3862);
graph.get("boundingBox").setStyle("overflow", graphOverflow);
        }

        _yuitest_coverline("build/charts-base/charts-base.js", 3865);
if(this._overlay)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3867);
this._overlay.setStyle("left", graphX + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 3868);
this._overlay.setStyle("top", graphY + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 3869);
this._overlay.setStyle("width", graphWidth + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 3870);
this._overlay.setStyle("height", graphHeight + "px");
        }
    },

    /**
     * Destructor implementation for the CartesianChart class. Calls destroy on all axes, series and the Graph instance.
     * Removes the tooltip and overlay HTML elements.
     *
     * @method destructor
     * @protected
     */
    destructor: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "destructor", 3881);
_yuitest_coverline("build/charts-base/charts-base.js", 3883);
var graph = this.get("graph"),
            i = 0,
            len,
            seriesCollection = this.get("seriesCollection"),
            axesCollection = this._axesCollection,
            tooltip = this.get("tooltip").node;
        _yuitest_coverline("build/charts-base/charts-base.js", 3889);
if(this._description)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3891);
this._description.empty();
            _yuitest_coverline("build/charts-base/charts-base.js", 3892);
this._description.remove(true);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3894);
if(this._liveRegion)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3896);
this._liveRegion.empty();
            _yuitest_coverline("build/charts-base/charts-base.js", 3897);
this._liveRegion.remove(true);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3899);
len = seriesCollection ? seriesCollection.length : 0;
        _yuitest_coverline("build/charts-base/charts-base.js", 3900);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3902);
if(seriesCollection[i] instanceof Y.CartesianSeries)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3904);
seriesCollection[i].destroy(true);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3907);
len = axesCollection ? axesCollection.length : 0;
        _yuitest_coverline("build/charts-base/charts-base.js", 3908);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3910);
if(axesCollection[i] instanceof Y.Axis)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3912);
axesCollection[i].destroy(true);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3915);
if(graph)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3917);
graph.destroy(true);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3919);
if(tooltip)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3921);
tooltip.empty();
            _yuitest_coverline("build/charts-base/charts-base.js", 3922);
tooltip.remove(true);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3924);
if(this._overlay)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3926);
this._overlay.empty();
            _yuitest_coverline("build/charts-base/charts-base.js", 3927);
this._overlay.remove(true);
        }
    },

    /**
     * Returns the appropriate message based on the key press.
     *
     * @method _getAriaMessage
     * @param {Number} key The keycode that was pressed.
     * @return String
     */
    _getAriaMessage: function(key)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getAriaMessage", 3938);
_yuitest_coverline("build/charts-base/charts-base.js", 3940);
var msg = "",
            series,
            items,
            categoryItem,
            valueItem,
            seriesIndex = this._seriesIndex,
            itemIndex = this._itemIndex,
            seriesCollection = this.get("seriesCollection"),
            len = seriesCollection.length,
            dataLength;
        _yuitest_coverline("build/charts-base/charts-base.js", 3950);
if(key % 2 === 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3952);
if(len > 1)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3954);
if(key === 38)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3956);
seriesIndex = seriesIndex < 1 ? len - 1 : seriesIndex - 1;
                }
                else {_yuitest_coverline("build/charts-base/charts-base.js", 3958);
if(key === 40)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3960);
seriesIndex = seriesIndex >= len - 1 ? 0 : seriesIndex + 1;
                }}
                _yuitest_coverline("build/charts-base/charts-base.js", 3962);
this._itemIndex = -1;
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3966);
seriesIndex = 0;
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3968);
this._seriesIndex = seriesIndex;
            _yuitest_coverline("build/charts-base/charts-base.js", 3969);
series = this.getSeries(parseInt(seriesIndex, 10));
            _yuitest_coverline("build/charts-base/charts-base.js", 3970);
msg = series.get("valueDisplayName") + " series.";
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3974);
if(seriesIndex > -1)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3976);
msg = "";
                _yuitest_coverline("build/charts-base/charts-base.js", 3977);
series = this.getSeries(parseInt(seriesIndex, 10));
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3981);
seriesIndex = 0;
                _yuitest_coverline("build/charts-base/charts-base.js", 3982);
this._seriesIndex = seriesIndex;
                _yuitest_coverline("build/charts-base/charts-base.js", 3983);
series = this.getSeries(parseInt(seriesIndex, 10));
                _yuitest_coverline("build/charts-base/charts-base.js", 3984);
msg = series.get("valueDisplayName") + " series.";
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3986);
dataLength = series._dataLength ? series._dataLength : 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3987);
if(key === 37)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3989);
itemIndex = itemIndex > 0 ? itemIndex - 1 : dataLength - 1;
            }
            else {_yuitest_coverline("build/charts-base/charts-base.js", 3991);
if(key === 39)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3993);
itemIndex = itemIndex >= dataLength - 1 ? 0 : itemIndex + 1;
            }}
            _yuitest_coverline("build/charts-base/charts-base.js", 3995);
this._itemIndex = itemIndex;
            _yuitest_coverline("build/charts-base/charts-base.js", 3996);
items = this.getSeriesItems(series, itemIndex);
            _yuitest_coverline("build/charts-base/charts-base.js", 3997);
categoryItem = items.category;
            _yuitest_coverline("build/charts-base/charts-base.js", 3998);
valueItem = items.value;
            _yuitest_coverline("build/charts-base/charts-base.js", 3999);
if(categoryItem && valueItem && categoryItem.value && valueItem.value)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4001);
msg += categoryItem.displayName + ": " + categoryItem.axis.formatLabel.apply(this, [categoryItem.value, categoryItem.axis.get("labelFormat")]) + ", ";
                _yuitest_coverline("build/charts-base/charts-base.js", 4002);
msg += valueItem.displayName + ": " + valueItem.axis.formatLabel.apply(this, [valueItem.value, valueItem.axis.get("labelFormat")]) + ", ";
            }
           else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4006);
msg += "No data available.";
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 4008);
msg += (itemIndex + 1) + " of " + dataLength + ". ";
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4010);
return msg;
    }
}, {
    ATTRS: {
        /**
         * Indicates whether axis labels are allowed to overflow beyond the bounds of the chart's content box.
         *
         * @attribute allowContentOverflow
         * @type Boolean
         */
        allowContentOverflow: {
            value: false
        },

        /**
         * Style object for the axes.
         *
         * @attribute axesStyles
         * @type Object
         * @private
         */
        axesStyles: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4032);
_yuitest_coverline("build/charts-base/charts-base.js", 4034);
var axes = this.get("axes"),
                    i,
                    styles = this._axesStyles;
                _yuitest_coverline("build/charts-base/charts-base.js", 4037);
if(axes)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4039);
for(i in axes)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4041);
if(axes.hasOwnProperty(i) && axes[i] instanceof Y.Axis)
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 4043);
if(!styles)
                            {
                                _yuitest_coverline("build/charts-base/charts-base.js", 4045);
styles = {};
                            }
                            _yuitest_coverline("build/charts-base/charts-base.js", 4047);
styles[i] = axes[i].get("styles");
                        }
                    }
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4051);
return styles;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4054);
_yuitest_coverline("build/charts-base/charts-base.js", 4056);
var axes = this.get("axes"),
                    i;
                _yuitest_coverline("build/charts-base/charts-base.js", 4058);
for(i in val)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4060);
if(val.hasOwnProperty(i) && axes.hasOwnProperty(i))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4062);
this._setBaseAttribute(axes[i], "styles", val[i]);
                    }
                }
            }
        },

        /**
         * Style object for the series
         *
         * @attribute seriesStyles
         * @type Object
         * @private
         */
        seriesStyles: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4076);
_yuitest_coverline("build/charts-base/charts-base.js", 4078);
var styles = this._seriesStyles,
                    graph = this.get("graph"),
                    dict,
                    i;
                _yuitest_coverline("build/charts-base/charts-base.js", 4082);
if(graph)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4084);
dict = graph.get("seriesDictionary");
                    _yuitest_coverline("build/charts-base/charts-base.js", 4085);
if(dict)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4087);
styles = {};
                        _yuitest_coverline("build/charts-base/charts-base.js", 4088);
for(i in dict)
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 4090);
if(dict.hasOwnProperty(i))
                            {
                                _yuitest_coverline("build/charts-base/charts-base.js", 4092);
styles[i] = dict[i].get("styles");
                            }
                        }
                    }
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4097);
return styles;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4100);
_yuitest_coverline("build/charts-base/charts-base.js", 4102);
var i,
                    l,
                    s;

                _yuitest_coverline("build/charts-base/charts-base.js", 4106);
if(Y_Lang.isArray(val))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4108);
s = this.get("seriesCollection");
                    _yuitest_coverline("build/charts-base/charts-base.js", 4109);
i = 0;
                    _yuitest_coverline("build/charts-base/charts-base.js", 4110);
l = val.length;

                    _yuitest_coverline("build/charts-base/charts-base.js", 4112);
for(; i < l; ++i)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4114);
this._setBaseAttribute(s[i], "styles", val[i]);
                    }
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4119);
for(i in val)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4121);
if(val.hasOwnProperty(i))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 4123);
s = this.getSeries(i);
                            _yuitest_coverline("build/charts-base/charts-base.js", 4124);
this._setBaseAttribute(s, "styles", val[i]);
                        }
                    }
                }
            }
        },

        /**
         * Styles for the graph.
         *
         * @attribute graphStyles
         * @type Object
         * @private
         */
        graphStyles: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4139);
_yuitest_coverline("build/charts-base/charts-base.js", 4141);
var graph = this.get("graph");
                _yuitest_coverline("build/charts-base/charts-base.js", 4142);
if(graph)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4144);
return(graph.get("styles"));
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4146);
return this._graphStyles;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4149);
_yuitest_coverline("build/charts-base/charts-base.js", 4151);
var graph = this.get("graph");
                _yuitest_coverline("build/charts-base/charts-base.js", 4152);
this._setBaseAttribute(graph, "styles", val);
            }

        },

        /**
         * Style properties for the chart. Contains a key indexed hash of the following:
         *  <dl>
         *      <dt>series</dt><dd>A key indexed hash containing references to the `styles` attribute for each series in the chart.
         *      Specific style attributes vary depending on the series:
         *      <ul>
         *          <li><a href="AreaSeries.html#attr_styles">AreaSeries</a></li>
         *          <li><a href="BarSeries.html#attr_styles">BarSeries</a></li>
         *          <li><a href="ColumnSeries.html#attr_styles">ColumnSeries</a></li>
         *          <li><a href="ComboSeries.html#attr_styles">ComboSeries</a></li>
         *          <li><a href="LineSeries.html#attr_styles">LineSeries</a></li>
         *          <li><a href="MarkerSeries.html#attr_styles">MarkerSeries</a></li>
         *          <li><a href="SplineSeries.html#attr_styles">SplineSeries</a></li>
         *      </ul>
         *      </dd>
         *      <dt>axes</dt><dd>A key indexed hash containing references to the `styles` attribute for each axes in the chart. Specific
         *      style attributes can be found in the <a href="Axis.html#attr_styles">Axis</a> class.</dd>
         *      <dt>graph</dt><dd>A reference to the `styles` attribute in the chart. Specific style attributes can be found in the
         *      <a href="Graph.html#attr_styles">Graph</a> class.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
        styles: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4182);
_yuitest_coverline("build/charts-base/charts-base.js", 4184);
var styles = {
                    axes: this.get("axesStyles"),
                    series: this.get("seriesStyles"),
                    graph: this.get("graphStyles")
                };
                _yuitest_coverline("build/charts-base/charts-base.js", 4189);
return styles;
            },
            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4191);
_yuitest_coverline("build/charts-base/charts-base.js", 4193);
if(val.hasOwnProperty("axes"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4195);
if(this.get("axesStyles"))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4197);
this.set("axesStyles", val.axes);
                    }
                    else
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4201);
this._axesStyles = val.axes;
                    }
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4204);
if(val.hasOwnProperty("series"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4206);
if(this.get("seriesStyles"))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4208);
this.set("seriesStyles", val.series);
                    }
                    else
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4212);
this._seriesStyles = val.series;
                    }
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4215);
if(val.hasOwnProperty("graph"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4217);
this.set("graphStyles", val.graph);
                }
            }
        },

        /**
         * Axes to appear in the chart. This can be a key indexed hash of axis instances or object literals
         * used to construct the appropriate axes.
         *
         * @attribute axes
         * @type Object
         */
        axes: {
            valueFn: "_getDefaultAxes",

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4232);
_yuitest_coverline("build/charts-base/charts-base.js", 4234);
if(this.get("dataProvider"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4236);
val = this._setAxes(val);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4238);
return val;
            }
        },

        /**
         * Collection of series to appear on the chart. This can be an array of Series instances or object literals
         * used to construct the appropriate series.
         *
         * @attribute seriesCollection
         * @type Array
         */
        seriesCollection: {
            valueFn: "_getDefaultSeriesCollection",

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4252);
_yuitest_coverline("build/charts-base/charts-base.js", 4254);
if(this.get("dataProvider"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4256);
val = this._parseSeriesCollection(val);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4258);
return val;
            }
        },

        /**
         * Reference to the left-aligned axes for the chart.
         *
         * @attribute leftAxesCollection
         * @type Array
         * @private
         */
        leftAxesCollection: {},

        /**
         * Reference to the bottom-aligned axes for the chart.
         *
         * @attribute bottomAxesCollection
         * @type Array
         * @private
         */
        bottomAxesCollection: {},

        /**
         * Reference to the right-aligned axes for the chart.
         *
         * @attribute rightAxesCollection
         * @type Array
         * @private
         */
        rightAxesCollection: {},

        /**
         * Reference to the top-aligned axes for the chart.
         *
         * @attribute topAxesCollection
         * @type Array
         * @private
         */
        topAxesCollection: {},

        /**
         * Indicates whether or not the chart is stacked.
         *
         * @attribute stacked
         * @type Boolean
         */
        stacked: {
            value: false
        },

        /**
         * Direction of chart's category axis when there is no series collection specified. Charts can
         * be horizontal or vertical. When the chart type is column, the chart is horizontal.
         * When the chart type is bar, the chart is vertical.
         *
         * @attribute direction
         * @type String
         */
        direction: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4317);
_yuitest_coverline("build/charts-base/charts-base.js", 4319);
var type = this.get("type");
                _yuitest_coverline("build/charts-base/charts-base.js", 4320);
if(type == "bar")
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4322);
return "vertical";
                }
                else {_yuitest_coverline("build/charts-base/charts-base.js", 4324);
if(type == "column")
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4326);
return "horizontal";
                }}
                _yuitest_coverline("build/charts-base/charts-base.js", 4328);
return this._direction;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4331);
_yuitest_coverline("build/charts-base/charts-base.js", 4333);
this._direction = val;
                _yuitest_coverline("build/charts-base/charts-base.js", 4334);
return this._direction;
            }
        },

        /**
         * Indicates whether or not an area is filled in a combo chart.
         *
         * @attribute showAreaFill
         * @type Boolean
         */
        showAreaFill: {},

        /**
         * Indicates whether to display markers in a combo chart.
         *
         * @attribute showMarkers
         * @type Boolean
         */
        showMarkers:{},

        /**
         * Indicates whether to display lines in a combo chart.
         *
         * @attribute showLines
         * @type Boolean
         */
        showLines:{},

        /**
         * Indicates the key value used to identify a category axis in the `axes` hash. If
         * not specified, the categoryKey attribute value will be used.
         *
         * @attribute categoryAxisName
         * @type String
         */
        categoryAxisName: {
        },

        /**
         * Indicates the key value used to identify a the series axis when an axis not generated.
         *
         * @attribute valueAxisName
         * @type String
         */
        valueAxisName: {
            value: "values"
        },

        /**
         * Reference to the horizontalGridlines for the chart.
         *
         * @attribute horizontalGridlines
         * @type Gridlines
         */
        horizontalGridlines: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4389);
_yuitest_coverline("build/charts-base/charts-base.js", 4391);
var graph = this.get("graph");
                _yuitest_coverline("build/charts-base/charts-base.js", 4392);
if(graph)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4394);
return graph.get("horizontalGridlines");
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4396);
return this._horizontalGridlines;
            },
            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4398);
_yuitest_coverline("build/charts-base/charts-base.js", 4400);
var graph = this.get("graph");
                _yuitest_coverline("build/charts-base/charts-base.js", 4401);
if(val && !Y_Lang.isObject(val))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4403);
val = {};
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4405);
if(graph)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4407);
graph.set("horizontalGridlines", val);
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4411);
this._horizontalGridlines = val;
                }
            }
        },

        /**
         * Reference to the verticalGridlines for the chart.
         *
         * @attribute verticalGridlines
         * @type Gridlines
         */
        verticalGridlines: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4423);
_yuitest_coverline("build/charts-base/charts-base.js", 4425);
var graph = this.get("graph");
                _yuitest_coverline("build/charts-base/charts-base.js", 4426);
if(graph)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4428);
return graph.get("verticalGridlines");
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4430);
return this._verticalGridlines;
            },
            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4432);
_yuitest_coverline("build/charts-base/charts-base.js", 4434);
var graph = this.get("graph");
                _yuitest_coverline("build/charts-base/charts-base.js", 4435);
if(val && !Y_Lang.isObject(val))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4437);
val = {};
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4439);
if(graph)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4441);
graph.set("verticalGridlines", val);
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4445);
this._verticalGridlines = val;
                }
            }
        },

        /**
         * Type of chart when there is no series collection specified.
         *
         * @attribute type
         * @type String
         */
        type: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4457);
_yuitest_coverline("build/charts-base/charts-base.js", 4459);
if(this.get("stacked"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4461);
return "stacked" + this._type;
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4463);
return this._type;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4466);
_yuitest_coverline("build/charts-base/charts-base.js", 4468);
if(this._type == "bar")
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4470);
if(val != "bar")
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4472);
this.set("direction", "horizontal");
                    }
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4477);
if(val == "bar")
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4479);
this.set("direction", "vertical");
                    }
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4482);
this._type = val;
                _yuitest_coverline("build/charts-base/charts-base.js", 4483);
return this._type;
            }
        },

        /**
         * Reference to the category axis used by the chart.
         *
         * @attribute categoryAxis
         * @type Axis
         */
        categoryAxis:{}
    }
});
/**
 * The PieChart class creates a pie chart
 *
 * @class PieChart
 * @extends ChartBase
 * @constructor
 * @submodule charts-base
 */
_yuitest_coverline("build/charts-base/charts-base.js", 4504);
Y.PieChart = Y.Base.create("pieChart", Y.Widget, [Y.ChartBase], {
    /**
     * Calculates and returns a `seriesCollection`.
     *
     * @method _getSeriesCollection
     * @return Array
     * @private
     */
    _getSeriesCollection: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getSeriesCollection", 4512);
_yuitest_coverline("build/charts-base/charts-base.js", 4514);
if(this._seriesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4516);
return this._seriesCollection;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4518);
var axes = this.get("axes"),
            sc = [],
            seriesKeys,
            i = 0,
            l,
            type = this.get("type"),
            key,
            catAxis = "categoryAxis",
            catKey = "categoryKey",
            valAxis = "valueAxis",
            seriesKey = "valueKey";
        _yuitest_coverline("build/charts-base/charts-base.js", 4529);
if(axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4531);
seriesKeys = axes.values.get("keyCollection");
            _yuitest_coverline("build/charts-base/charts-base.js", 4532);
key = axes.category.get("keyCollection")[0];
            _yuitest_coverline("build/charts-base/charts-base.js", 4533);
l = seriesKeys.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 4534);
for(; i < l; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4536);
sc[i] = {type:type};
                _yuitest_coverline("build/charts-base/charts-base.js", 4537);
sc[i][catAxis] = "category";
                _yuitest_coverline("build/charts-base/charts-base.js", 4538);
sc[i][valAxis] = "values";
                _yuitest_coverline("build/charts-base/charts-base.js", 4539);
sc[i][catKey] = key;
                _yuitest_coverline("build/charts-base/charts-base.js", 4540);
sc[i][seriesKey] = seriesKeys[i];
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4543);
this._seriesCollection = sc;
        _yuitest_coverline("build/charts-base/charts-base.js", 4544);
return sc;
    },

    /**
     * Creates `Axis` instances.
     *
     * @method _parseAxes
     * @param {Object} val Object containing `Axis` instances or objects in which to construct `Axis` instances.
     * @return Object
     * @private
     */
    _parseAxes: function(hash)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_parseAxes", 4555);
_yuitest_coverline("build/charts-base/charts-base.js", 4557);
if(!this._axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4559);
this._axes = {};
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4561);
var i, pos, axis, dh, config, axisClass,
            type = this.get("type"),
            w = this.get("width"),
            h = this.get("height"),
            node = Y.Node.one(this._parentNode);
        _yuitest_coverline("build/charts-base/charts-base.js", 4566);
if(!w)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4568);
this.set("width", node.get("offsetWidth"));
            _yuitest_coverline("build/charts-base/charts-base.js", 4569);
w = this.get("width");
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4571);
if(!h)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4573);
this.set("height", node.get("offsetHeight"));
            _yuitest_coverline("build/charts-base/charts-base.js", 4574);
h = this.get("height");
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4576);
for(i in hash)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4578);
if(hash.hasOwnProperty(i))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4580);
dh = hash[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 4581);
pos = type == "pie" ? "none" : dh.position;
                _yuitest_coverline("build/charts-base/charts-base.js", 4582);
axisClass = this._getAxisClass(dh.type);
                _yuitest_coverline("build/charts-base/charts-base.js", 4583);
config = {dataProvider:this.get("dataProvider")};
                _yuitest_coverline("build/charts-base/charts-base.js", 4584);
if(dh.hasOwnProperty("roundingUnit"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4586);
config.roundingUnit = dh.roundingUnit;
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4588);
config.keys = dh.keys;
                _yuitest_coverline("build/charts-base/charts-base.js", 4589);
config.width = w;
                _yuitest_coverline("build/charts-base/charts-base.js", 4590);
config.height = h;
                _yuitest_coverline("build/charts-base/charts-base.js", 4591);
config.position = pos;
                _yuitest_coverline("build/charts-base/charts-base.js", 4592);
config.styles = dh.styles;
                _yuitest_coverline("build/charts-base/charts-base.js", 4593);
axis = new axisClass(config);
                _yuitest_coverline("build/charts-base/charts-base.js", 4594);
axis.on("axisRendered", Y.bind(this._itemRendered, this));
                _yuitest_coverline("build/charts-base/charts-base.js", 4595);
this._axes[i] = axis;
            }
        }
    },

    /**
     * Adds axes to the chart.
     *
     * @method _addAxes
     * @private
     */
    _addAxes: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addAxes", 4606);
_yuitest_coverline("build/charts-base/charts-base.js", 4608);
var axes = this.get("axes"),
            i,
            axis,
            p;
        _yuitest_coverline("build/charts-base/charts-base.js", 4612);
if(!axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4614);
this.set("axes", this._getDefaultAxes());
            _yuitest_coverline("build/charts-base/charts-base.js", 4615);
axes = this.get("axes");
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4617);
if(!this._axesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4619);
this._axesCollection = [];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4621);
for(i in axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4623);
if(axes.hasOwnProperty(i))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4625);
axis = axes[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 4626);
p = axis.get("position");
                _yuitest_coverline("build/charts-base/charts-base.js", 4627);
if(!this.get(p + "AxesCollection"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4629);
this.set(p + "AxesCollection", [axis]);
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4633);
this.get(p + "AxesCollection").push(axis);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4635);
this._axesCollection.push(axis);
            }
        }
    },

    /**
     * Renders the Graph.
     *
     * @method _addSeries
     * @private
     */
    _addSeries: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addSeries", 4646);
_yuitest_coverline("build/charts-base/charts-base.js", 4648);
var graph = this.get("graph"),
            seriesCollection = this.get("seriesCollection");
        _yuitest_coverline("build/charts-base/charts-base.js", 4650);
this._parseSeriesAxes(seriesCollection);
        _yuitest_coverline("build/charts-base/charts-base.js", 4651);
graph.set("showBackground", false);
        _yuitest_coverline("build/charts-base/charts-base.js", 4652);
graph.set("width", this.get("width"));
        _yuitest_coverline("build/charts-base/charts-base.js", 4653);
graph.set("height", this.get("height"));
        _yuitest_coverline("build/charts-base/charts-base.js", 4654);
graph.set("seriesCollection", seriesCollection);
        _yuitest_coverline("build/charts-base/charts-base.js", 4655);
this._seriesCollection = graph.get("seriesCollection");
        _yuitest_coverline("build/charts-base/charts-base.js", 4656);
graph.render(this.get("contentBox"));
    },

    /**
     * Parse and sets the axes for the chart.
     *
     * @method _parseSeriesAxes
     * @param {Array} c A collection `PieSeries` instance.
     * @private
     */
    _parseSeriesAxes: function(c)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_parseSeriesAxes", 4666);
_yuitest_coverline("build/charts-base/charts-base.js", 4668);
var i = 0,
            len = c.length,
            s,
            axes = this.get("axes"),
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 4673);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4675);
s = c[i];
            _yuitest_coverline("build/charts-base/charts-base.js", 4676);
if(s)
            {
                //If series is an actual series instance,
                //replace axes attribute string ids with axes
                _yuitest_coverline("build/charts-base/charts-base.js", 4680);
if(s instanceof Y.PieSeries)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4682);
axis = s.get("categoryAxis");
                    _yuitest_coverline("build/charts-base/charts-base.js", 4683);
if(axis && !(axis instanceof Y.Axis))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4685);
s.set("categoryAxis", axes[axis]);
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 4687);
axis = s.get("valueAxis");
                    _yuitest_coverline("build/charts-base/charts-base.js", 4688);
if(axis && !(axis instanceof Y.Axis))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4690);
s.set("valueAxis", axes[axis]);
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 4692);
continue;
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4694);
s.categoryAxis = axes.category;
                _yuitest_coverline("build/charts-base/charts-base.js", 4695);
s.valueAxis = axes.values;
                _yuitest_coverline("build/charts-base/charts-base.js", 4696);
if(!s.type)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4698);
s.type = this.get("type");
                }
            }
        }
    },

    /**
     * Generates and returns a key-indexed object containing `Axis` instances or objects used to create `Axis` instances.
     *
     * @method _getDefaultAxes
     * @return Object
     * @private
     */
    _getDefaultAxes: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getDefaultAxes", 4711);
_yuitest_coverline("build/charts-base/charts-base.js", 4713);
var catKey = this.get("categoryKey"),
            seriesKeys = this.get("seriesKeys").concat(),
            seriesAxis = "numeric";
        _yuitest_coverline("build/charts-base/charts-base.js", 4716);
return {
            values:{
                keys:seriesKeys,
                type:seriesAxis
            },
            category:{
                keys:[catKey],
                type:this.get("categoryType")
            }
        };
    },

    /**
     * Returns an object literal containing a categoryItem and a valueItem for a given series index.
     *
     * @method getSeriesItem
     * @param series Reference to a series.
     * @param index Index of the specified item within a series.
     * @return Object
     */
    getSeriesItems: function(series, index)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "getSeriesItems", 4736);
_yuitest_coverline("build/charts-base/charts-base.js", 4738);
var categoryItem = {
                axis: series.get("categoryAxis"),
                key: series.get("categoryKey"),
                displayName: series.get("categoryDisplayName")
            },
            valueItem = {
                axis: series.get("valueAxis"),
                key: series.get("valueKey"),
                displayName: series.get("valueDisplayName")
            };
        _yuitest_coverline("build/charts-base/charts-base.js", 4748);
categoryItem.value = categoryItem.axis.getKeyValueAt(categoryItem.key, index);
        _yuitest_coverline("build/charts-base/charts-base.js", 4749);
valueItem.value = valueItem.axis.getKeyValueAt(valueItem.key, index);
        _yuitest_coverline("build/charts-base/charts-base.js", 4750);
return {category:categoryItem, value:valueItem};
    },

    /**
     * Handler for sizeChanged event.
     *
     * @method _sizeChanged
     * @param {Object} e Event object.
     * @private
     */
    _sizeChanged: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_sizeChanged", 4760);
_yuitest_coverline("build/charts-base/charts-base.js", 4762);
this._redraw();
    },

    /**
     * Redraws the chart instance.
     *
     * @method _redraw
     * @private
     */
    _redraw: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_redraw", 4771);
_yuitest_coverline("build/charts-base/charts-base.js", 4773);
var graph = this.get("graph"),
            w = this.get("width"),
            h = this.get("height"),
            dimension;
        _yuitest_coverline("build/charts-base/charts-base.js", 4777);
if(graph)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4779);
dimension = Math.min(w, h);
            _yuitest_coverline("build/charts-base/charts-base.js", 4780);
graph.set("width", dimension);
            _yuitest_coverline("build/charts-base/charts-base.js", 4781);
graph.set("height", dimension);
        }
    },

    /**
     * Formats tooltip text for a pie chart.
     *
     * @method _tooltipLabelFunction
     * @param {Object} categoryItem An object containing the following:
     *  <dl>
     *      <dt>axis</dt><dd>The axis to which the category is bound.</dd>
     *      <dt>displayName</dt><dd>The display name set to the category (defaults to key if not provided)</dd>
     *      <dt>key</dt><dd>The key of the category.</dd>
     *      <dt>value</dt><dd>The value of the category</dd>
     *  </dl>
     * @param {Object} valueItem An object containing the following:
     *  <dl>
     *      <dt>axis</dt><dd>The axis to which the item's series is bound.</dd>
     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>
     *      <dt>key</dt><dd>The key for the series.</dd>
     *      <dt>value</dt><dd>The value for the series item.</dd>
     *  </dl>
     * @param {Number} itemIndex The index of the item within the series.
     * @param {CartesianSeries} series The `PieSeries` instance of the item.
     * @param {Number} seriesIndex The index of the series in the `seriesCollection`.
     * @return {HTML}
     * @private
     */
    _tooltipLabelFunction: function(categoryItem, valueItem, itemIndex, series, seriesIndex)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_tooltipLabelFunction", 4809);
_yuitest_coverline("build/charts-base/charts-base.js", 4811);
var msg = DOCUMENT.createElement("div"),
            total = series.getTotalValues(),
            pct = Math.round((valueItem.value / total) * 10000)/100;
        _yuitest_coverline("build/charts-base/charts-base.js", 4814);
msg.appendChild(DOCUMENT.createTextNode(categoryItem.displayName +
        ": " + categoryItem.axis.get("labelFunction").apply(this, [categoryItem.value, categoryItem.axis.get("labelFormat")])));
        _yuitest_coverline("build/charts-base/charts-base.js", 4816);
msg.appendChild(DOCUMENT.createElement("br"));
        _yuitest_coverline("build/charts-base/charts-base.js", 4817);
msg.appendChild(DOCUMENT.createTextNode(valueItem.displayName +
        ": " + valueItem.axis.get("labelFunction").apply(this, [valueItem.value, valueItem.axis.get("labelFormat")])));
        _yuitest_coverline("build/charts-base/charts-base.js", 4819);
msg.appendChild(DOCUMENT.createElement("br"));
        _yuitest_coverline("build/charts-base/charts-base.js", 4820);
msg.appendChild(DOCUMENT.createTextNode(pct + "%"));
        _yuitest_coverline("build/charts-base/charts-base.js", 4821);
return msg;
    },

    /**
     * Returns the appropriate message based on the key press.
     *
     * @method _getAriaMessage
     * @param {Number} key The keycode that was pressed.
     * @return String
     */
    _getAriaMessage: function(key)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getAriaMessage", 4831);
_yuitest_coverline("build/charts-base/charts-base.js", 4833);
var msg = "",
            categoryItem,
            items,
            series,
            valueItem,
            seriesIndex = 0,
            itemIndex = this._itemIndex,
            seriesCollection = this.get("seriesCollection"),
            len,
            total,
            pct,
            markers;
        _yuitest_coverline("build/charts-base/charts-base.js", 4845);
series = this.getSeries(parseInt(seriesIndex, 10));
        _yuitest_coverline("build/charts-base/charts-base.js", 4846);
markers = series.get("markers");
        _yuitest_coverline("build/charts-base/charts-base.js", 4847);
len = markers && markers.length ? markers.length : 0;
        _yuitest_coverline("build/charts-base/charts-base.js", 4848);
if(key === 37)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4850);
itemIndex = itemIndex > 0 ? itemIndex - 1 : len - 1;
        }
        else {_yuitest_coverline("build/charts-base/charts-base.js", 4852);
if(key === 39)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4854);
itemIndex = itemIndex >= len - 1 ? 0 : itemIndex + 1;
        }}
        _yuitest_coverline("build/charts-base/charts-base.js", 4856);
this._itemIndex = itemIndex;
        _yuitest_coverline("build/charts-base/charts-base.js", 4857);
items = this.getSeriesItems(series, itemIndex);
        _yuitest_coverline("build/charts-base/charts-base.js", 4858);
categoryItem = items.category;
        _yuitest_coverline("build/charts-base/charts-base.js", 4859);
valueItem = items.value;
        _yuitest_coverline("build/charts-base/charts-base.js", 4860);
total = series.getTotalValues();
        _yuitest_coverline("build/charts-base/charts-base.js", 4861);
pct = Math.round((valueItem.value / total) * 10000)/100;
        _yuitest_coverline("build/charts-base/charts-base.js", 4862);
if(categoryItem && valueItem)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4864);
msg += categoryItem.displayName + ": " + categoryItem.axis.formatLabel.apply(this, [categoryItem.value, categoryItem.axis.get("labelFormat")]) + ", ";
            _yuitest_coverline("build/charts-base/charts-base.js", 4865);
msg += valueItem.displayName + ": " + valueItem.axis.formatLabel.apply(this, [valueItem.value, valueItem.axis.get("labelFormat")]) + ", ";
            _yuitest_coverline("build/charts-base/charts-base.js", 4866);
msg += "Percent of total " + valueItem.displayName + ": " + pct + "%,";
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4870);
msg += "No data available,";
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4872);
msg += (itemIndex + 1) + " of " + len + ". ";
        _yuitest_coverline("build/charts-base/charts-base.js", 4873);
return msg;
    }
}, {
    ATTRS: {
        /**
         * Sets the aria description for the chart.
         *
         * @attribute ariaDescription
         * @type String
         */
        ariaDescription: {
            value: "Use the left and right keys to navigate through items.",

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4886);
_yuitest_coverline("build/charts-base/charts-base.js", 4888);
if(this._description)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4890);
this._description.setContent("");
                    _yuitest_coverline("build/charts-base/charts-base.js", 4891);
this._description.appendChild(DOCUMENT.createTextNode(val));
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4893);
return val;
            }
        },

        /**
         * Axes to appear in the chart.
         *
         * @attribute axes
         * @type Object
         */
        axes: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4904);
_yuitest_coverline("build/charts-base/charts-base.js", 4906);
return this._axes;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4909);
_yuitest_coverline("build/charts-base/charts-base.js", 4911);
this._parseAxes(val);
            }
        },

        /**
         * Collection of series to appear on the chart. This can be an array of Series instances or object literals
         * used to describe a Series instance.
         *
         * @attribute seriesCollection
         * @type Array
         */
        seriesCollection: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4923);
_yuitest_coverline("build/charts-base/charts-base.js", 4925);
return this._getSeriesCollection();
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4928);
_yuitest_coverline("build/charts-base/charts-base.js", 4930);
return this._setSeriesCollection(val);
            }
        },

        /**
         * Type of chart when there is no series collection specified.
         *
         * @attribute type
         * @type String
         */
        type: {
            value: "pie"
        }
    }
});
/**
 * The Chart class is the basic application used to create a chart.
 *
 * @module charts
 * @class Chart
 * @constructor
 */
_yuitest_coverline("build/charts-base/charts-base.js", 4952);
function Chart(cfg)
{
    _yuitest_coverfunc("build/charts-base/charts-base.js", "Chart", 4952);
_yuitest_coverline("build/charts-base/charts-base.js", 4954);
if(cfg.type != "pie")
    {
        _yuitest_coverline("build/charts-base/charts-base.js", 4956);
return new Y.CartesianChart(cfg);
    }
    else
    {
        _yuitest_coverline("build/charts-base/charts-base.js", 4960);
return new Y.PieChart(cfg);
    }
}
_yuitest_coverline("build/charts-base/charts-base.js", 4963);
Y.Chart = Chart;


}, '@VERSION@', {
    "requires": [
        "dom",
        "event-mouseenter",
        "event-touch",
        "graphics-group",
        "axes",
        "series-cartesian",
        "series-pie",
        "series-cartesian-stacked"
    ]
});
