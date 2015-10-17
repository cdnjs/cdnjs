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
_yuitest_coverage["build/series-base/series-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-base/series-base.js",
    code: []
};
_yuitest_coverage["build/series-base/series-base.js"].code=["YUI.add('series-base', function (Y, NAME) {","","/**"," * Provides functionality for creating a chart series."," *"," * @module charts"," * @submodule series-base"," */","var Y_Lang = Y.Lang;","","/**"," * The CartesianSeries class creates a chart with horizontal and vertical axes."," *"," * @class CartesianSeries"," * @extends Base"," * @uses Renderer"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-base"," */","Y.CartesianSeries = Y.Base.create(\"cartesianSeries\", Y.Base, [Y.Renderer], {","    /**","     * Storage for `xDisplayName` attribute.","     *","     * @property _xDisplayName","     * @type String","     * @private","     */","    _xDisplayName: null,","","    /**","     * Storage for `yDisplayName` attribute.","     *","     * @property _yDisplayName","     * @type String","     * @private","     */","    _yDisplayName: null,","","    /**","     * Th x-coordinate for the left edge of the series.","     *","     * @property _leftOrigin","     * @type String","     * @private","     */","    _leftOrigin: null,","","    /**","     * The y-coordinate for the bottom edge of the series.","     *","     * @property _bottomOrigin","     * @type String","     * @private","     */","    _bottomOrigin: null,","","    /**","     * @method render","     * @private","     */","    render: function()","    {","        this._setCanvas();","        this.addListeners();","        this.validate();","    },","","    /**","     * Adds event listeners.","     *","     * @method addListeners","     * @private","     */","    addListeners: function()","    {","        var xAxis = this.get(\"xAxis\"),","            yAxis = this.get(\"yAxis\");","        if(xAxis)","        {","            this._xDataReadyHandle = xAxis.after(\"dataReady\", Y.bind(this._xDataChangeHandler, this));","            this._xDataUpdateHandle = xAxis.after(\"dataUpdate\", Y.bind(this._xDataChangeHandler, this));","        }","        if(yAxis)","        {","            this._yDataReadyHandle = yAxis.after(\"dataReady\", Y.bind(this._yDataChangeHandler, this));","            this._yDataUpdateHandle = yAxis.after(\"dataUpdate\", Y.bind(this._yDataChangeHandler, this));","        }","        this._xAxisChangeHandle = this.after(\"xAxisChange\", this._xAxisChangeHandler);","        this._yAxisChangeHandle = this.after(\"yAxisChange\", this._yAxisChangeHandler);","        this._stylesChangeHandle = this.after(\"stylesChange\", function(e) {","            var axesReady = this._updateAxisBase();","            if(axesReady)","            {","                this.draw();","            }","        });","        this._widthChangeHandle = this.after(\"widthChange\", function(e) {","            var axesReady = this._updateAxisBase();","            if(axesReady)","            {","                this.draw();","            }","        });","        this._heightChangeHandle = this.after(\"heightChange\", function(e) {","            var axesReady = this._updateAxisBase();","            if(axesReady)","            {","                this.draw();","            }","        });","        this._visibleChangeHandle = this.after(\"visibleChange\", this._handleVisibleChange);","    },","","    /**","     * Event handler for the xAxisChange event.","     *","     * @method _xAxisChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _xAxisChangeHandler: function(e)","    {","        var xAxis = this.get(\"xAxis\");","        xAxis.after(\"dataReady\", Y.bind(this._xDataChangeHandler, this));","        xAxis.after(\"dataUpdate\", Y.bind(this._xDataChangeHandler, this));","    },","","    /**","     * Event handler the yAxisChange event.","     *","     * @method _yAxisChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _yAxisChangeHandler: function(e)","    {","        var yAxis = this.get(\"yAxis\");","        yAxis.after(\"dataReady\", Y.bind(this._yDataChangeHandler, this));","        yAxis.after(\"dataUpdate\", Y.bind(this._yDataChangeHandler, this));","    },","","    /**","     * Constant used to generate unique id.","     *","     * @property GUID","     * @type String","     * @private","     */","    GUID: \"yuicartesianseries\",","","    /**","     * Event handler for xDataChange event.","     *","     * @method _xDataChangeHandler","     * @param {Object} event Event object.","     * @private","     */","    _xDataChangeHandler: function(event)","    {","        var axesReady = this._updateAxisBase();","        if(axesReady)","        {","            this.draw();","        }","    },","","    /**","     * Event handler for yDataChange event.","     *","     * @method _yDataChangeHandler","     * @param {Object} event Event object.","     * @private","     */","    _yDataChangeHandler: function(event)","    {","        var axesReady = this._updateAxisBase();","        if(axesReady)","        {","            this.draw();","        }","    },","","    /**","     * Checks to ensure that both xAxis and yAxis data are available. If so, set the `xData` and `yData` attributes","     * and return `true`. Otherwise, return `false`.","     *","     * @method _updateAxisBase","     * @return Boolean","     * @private","     */","    _updateAxisBase: function()","    {","        var xAxis = this.get(\"xAxis\"),","            yAxis = this.get(\"yAxis\"),","            xKey = this.get(\"xKey\"),","            yKey = this.get(\"yKey\"),","            yData,","            xData;","        if(!xAxis || !yAxis || !xKey || !yKey)","        {","            return false;","        }","        xData = xAxis.getDataByKey(xKey);","        yData = yAxis.getDataByKey(yKey);","        if(!xData || !yData)","        {","            return false;","        }","        this.set(\"xData\", xData.concat());","        this.set(\"yData\", yData.concat());","        return true;","    },","","    /**","     * Draws the series is the xAxis and yAxis data are both available.","     *","     * @method validate","     * @private","     */","    validate: function()","    {","        if((this.get(\"xData\") && this.get(\"yData\")) || this._updateAxisBase())","        {","            this.draw();","        }","        else","        {","            this.fire(\"drawingComplete\");","        }","    },","","    /**","     * Creates a `Graphic` instance.","     *","     * @method _setCanvas","     * @protected","     */","    _setCanvas: function()","    {","        var graph = this.get(\"graph\"),","            graphic = graph.get(\"graphic\");","        this.set(\"graphic\", graphic);","    },","","    /**","     * Calculates the coordinates for the series.","     *","     * @method setAreaData","     * @protected","     */","    setAreaData: function()","    {","        var isNumber = Y_Lang.isNumber,","            nextX, nextY,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            xAxis = this.get(\"xAxis\"),","            yAxis = this.get(\"yAxis\"),","            xData = this.get(\"xData\").concat(),","            yData = this.get(\"yData\").concat(),","            xValue,","            yValue,","            xOffset = xAxis.getEdgeOffset(xData.length, w),","            yOffset = yAxis.getEdgeOffset(yData.length, h),","            padding = this.get(\"styles\").padding,","			leftPadding = padding.left,","			topPadding = padding.top,","			dataWidth = w - (leftPadding + padding.right + xOffset),","			dataHeight = h - (topPadding + padding.bottom + yOffset),","			xcoords = [],","			ycoords = [],","			xMax = xAxis.get(\"maximum\"),","			xMin = xAxis.get(\"minimum\"),","			yMax = yAxis.get(\"maximum\"),","			yMin = yAxis.get(\"minimum\"),","            xScaleFactor = dataWidth / (xMax - xMin),","			yScaleFactor = dataHeight / (yMax - yMin),","            dataLength,","            direction = this.get(\"direction\"),","            i = 0,","            xMarkerPlane = [],","            yMarkerPlane = [],","            xMarkerPlaneOffset = this.get(\"xMarkerPlaneOffset\"),","            yMarkerPlaneOffset = this.get(\"yMarkerPlaneOffset\"),","            graphic = this.get(\"graphic\");","        graphic.set(\"width\", w);","        graphic.set(\"height\", h);","        dataLength = xData.length;","        xOffset *= 0.5;","        yOffset *= 0.5;","        //Assuming a vertical graph has a range/category for its vertical axis.","        if(direction === \"vertical\")","        {","            yData = yData.reverse();","        }","        this._leftOrigin = Math.round(((0 - xMin) * xScaleFactor) + leftPadding + xOffset);","        this._bottomOrigin = Math.round((dataHeight + topPadding + yOffset));","        if(yMin < 0)","        {","            this._bottomOrigin = this._bottomOrigin - ((0 - yMin) * yScaleFactor);","        }","        for (; i < dataLength; ++i)","		{","            xValue = parseFloat(xData[i]);","            yValue = parseFloat(yData[i]);","            if(isNumber(xValue))","            {","                nextX = (((xValue - xMin) * xScaleFactor) + leftPadding + xOffset);","            }","            else","            {","                nextX = NaN;","            }","            if(isNumber(yValue))","            {","			    nextY = ((dataHeight + topPadding + yOffset) - (yValue - yMin) * yScaleFactor);","            }","            else","            {","                nextY = NaN;","            }","            xcoords.push(nextX);","            ycoords.push(nextY);","            xMarkerPlane.push({start:nextX - xMarkerPlaneOffset, end: nextX + xMarkerPlaneOffset});","            yMarkerPlane.push({start:nextY - yMarkerPlaneOffset, end: nextY + yMarkerPlaneOffset});","        }","        this.set(\"xcoords\", xcoords);","		this.set(\"ycoords\", ycoords);","        this.set(\"xMarkerPlane\", xMarkerPlane);","        this.set(\"yMarkerPlane\", yMarkerPlane);","        this._dataLength = dataLength;","    },","","    /**","     * Finds the first valid index of an array coordinates.","     *","     * @method _getFirstValidIndex","     * @param {Array} coords An array of x or y coordinates.","     * @return Number","     * @private","     */","    _getFirstValidIndex: function(coords)","    {","        var coord,","            i = -1,","            limit = coords.length;","        while(!Y_Lang.isNumber(coord) && i < limit)","        {","            i += 1;","            coord = coords[i];","        }","        return i;","    },","","    /**","     * Finds the last valid index of an array coordinates.","     *","     * @method _getLastValidIndex","     * @param {Array} coords An array of x or y coordinates.","     * @return Number","     * @private","     */","    _getLastValidIndex: function(coords)","    {","        var coord,","            i = coords.length,","            limit = -1;","        while(!Y_Lang.isNumber(coord) && i > limit)","        {","            i -= 1;","            coord = coords[i];","        }","        return i;","    },","","    /**","     * Draws the series.","     *","     * @method draw","     * @protected","     */","    draw: function()","    {","        var w = this.get(\"width\"),","            h = this.get(\"height\");","        if(this.get(\"rendered\"))","        {","            if((isFinite(w) && isFinite(h) && w > 0 && h > 0) && ((this.get(\"xData\") && this.get(\"yData\")) || this._updateAxisBase()))","            {","                if(this._drawing)","                {","                    this._callLater = true;","                    return;","                }","                this._drawing = true;","                this._callLater = false;","                this.setAreaData();","                if(this.get(\"xcoords\") && this.get(\"ycoords\"))","                {","                    this.drawSeries();","                }","                this._drawing = false;","                if(this._callLater)","                {","                    this.draw();","                }","                else","                {","                    this._toggleVisible(this.get(\"visible\"));","                    this.fire(\"drawingComplete\");","                }","            }","        }","    },","","    /**","     * Default value for plane offsets when the parent chart's `interactiveType` is `planar`.","     *","     * @property _defaultPlaneOffset","     * @type Number","     * @private","     */","    _defaultPlaneOffset: 4,","","    /**","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     * @protected","     */","    _getDefaultStyles: function()","    {","        return {padding:{","                top: 0,","                left: 0,","                right: 0,","                bottom: 0","            }};","    },","","    /**","     * Collection of default colors used for lines in a series when not specified by user.","     *","     * @property _defaultLineColors","     * @type Array","     * @protected","     */","    _defaultLineColors:[\"#426ab3\", \"#d09b2c\", \"#000000\", \"#b82837\", \"#b384b5\", \"#ff7200\", \"#779de3\", \"#cbc8ba\", \"#7ed7a6\", \"#007a6c\"],","","    /**","     * Collection of default colors used for marker fills in a series when not specified by user.","     *","     * @property _defaultFillColors","     * @type Array","     * @protected","     */","    _defaultFillColors:[\"#6084d0\", \"#eeb647\", \"#6c6b5f\", \"#d6484f\", \"#ce9ed1\", \"#ff9f3b\", \"#93b7ff\", \"#e0ddd0\", \"#94ecba\", \"#309687\"],","","    /**","     * Collection of default colors used for marker borders in a series when not specified by user.","     *","     * @property _defaultBorderColors","     * @type Array","     * @protected","     */","    _defaultBorderColors:[\"#205096\", \"#b38206\", \"#000000\", \"#94001e\", \"#9d6fa0\", \"#e55b00\", \"#5e85c9\", \"#adab9e\", \"#6ac291\", \"#006457\"],","","    /**","     * Collection of default colors used for area fills, histogram fills and pie fills in a series when not specified by user.","     *","     * @property _defaultSliceColors","     * @type Array","     * @protected","     */","    _defaultSliceColors: [\"#66007f\", \"#a86f41\", \"#295454\", \"#996ab2\", \"#e8cdb7\", \"#90bdbd\",\"#000000\",\"#c3b8ca\", \"#968373\", \"#678585\"],","","    /**","     * Parses a color based on a series order and type.","     *","     * @method _getDefaultColor","     * @param {Number} index Index indicating the series order.","     * @param {String} type Indicates which type of object needs the color.","     * @return String","     * @protected","     */","    _getDefaultColor: function(index, type)","    {","        var colors = {","                line: this._defaultLineColors,","                fill: this._defaultFillColors,","                border: this._defaultBorderColors,","                slice: this._defaultSliceColors","            },","            col = colors[type] || colors.fill,","            l = col.length;","        index = index || 0;","        if(index >= l)","        {","            index = index % l;","        }","        type = type || \"fill\";","        return colors[type][index];","    },","","    /**","     * Shows/hides contents of the series.","     *","     * @method _handleVisibleChange","     * @param {Object} e Event object.","     * @protected","     */","    _handleVisibleChange: function(e)","    {","        this._toggleVisible(this.get(\"visible\"));","    },","","    /**","     * Returns the sum of all values for the series.","     *","     * @method getTotalValues","     * @return Number","     */","    getTotalValues: function()","    {","        var valueCoord = this.get(\"direction\") === \"vertical\" ? \"x\" : \"y\",","            total = this.get(valueCoord + \"Axis\").getTotalByKey(this.get(valueCoord + \"Key\"));","        return total;","    },","","    /**","     * Destructor implementation for the CartesianSeries class. Calls destroy on all Graphic instances.","     *","     * @method destructor","     * @protected","     */","    destructor: function()","    {","        var marker,","            markers = this.get(\"markers\");","        if(this.get(\"rendered\"))","        {","            if(this._xDataReadyHandle)","            {","                this._xDataReadyHandle.detach();","            }","            if(this._xDataUpdateHandle)","            {","                this._xDataUpdateHandle.detach();","            }","            if(this._yDataReadyHandle)","            {","                this._yDataReadyHandle.detach();","            }","            if(this._yDataUpdateHandle)","            {","                this._yDataUpdateHandle.detach();","            }","            this._xAxisChangeHandle.detach();","            this._yAxisChangeHandle.detach();","            this._stylesChangeHandle.detach();","            this._widthChangeHandle.detach();","            this._heightChangeHandle.detach();","            this._visibleChangeHandle.detach();","        }","        while(markers && markers.length > 0)","        {","            marker = markers.shift();","            if(marker && marker instanceof Y.Shape)","            {","                marker.destroy();","            }","        }","        if(this._path)","        {","            this._path.destroy();","            this._path = null;","        }","        if(this._lineGraphic)","        {","            this._lineGraphic.destroy();","            this._lineGraphic = null;","        }","        if(this._groupMarker)","        {","            this._groupMarker.destroy();","            this._groupMarker = null;","        }","    },","","    /**","     * Returns a reference to the parent container to which all chart elements are contained. When the series is bound to a `Chart` instance, the `Chart` instance is","     * the reference. If nothing is set as the `chart` attribute, the `_getChart` method will return a reference to the `graphic` attribute.","     *","     * @method _getChart","     * @return {Object}","     * @private ","     */","    _getChart:function() {","        var chart,","            graph = this.get(\"graph\");","        if(graph)","        {","            chart = graph.get(\"chart\");","        }","        if(!chart) ","        {","            chart = this.get(\"graphic\");","        }","        return chart;","    }","        /**","         * Event handle for the x-axis' dataReady event.","         *","         * @property _xDataReadyHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the x-axis dataUpdate event.","         *","         * @property _xDataUpdateHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the y-axis dataReady event.","         *","         * @property _yDataReadyHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the y-axis dataUpdate event.","         * @property _yDataUpdateHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the xAxisChange event.","         * @property _xAxisChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the yAxisChange event.","         * @property _yAxisChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the stylesChange event.","         * @property _stylesChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the widthChange event.","         * @property _widthChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the heightChange event.","         * @property _heightChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the visibleChange event.","         * @property _visibleChangeHandle","         * @type {EventHandle}","         * @private","         */","}, {","    ATTRS: {","        /**","         * The graphic in which drawings will be rendered.","         *","         * @attribute graphic","         * @type Graphic","         */","        graphic: {","            lazyAdd: false,","","            setter: function(val) {","                //woraround for Attribute order of operations bug","                if(!this.get(\"rendered\")) {","                    this.set(\"rendered\", true);","                }","                return val;","            }","        },","","        /**","         * An array of all series of the same type used within a chart application.","         *","         * @attribute seriesTypeCollection","         * @type Array","         */","        seriesTypeCollection: {},","        ","        /**","         * Name used for for displaying data related to the x-coordinate.","         *","         * @attribute xDisplayName","         * @type String","         */","        xDisplayName: {","            getter: function()","            {","                return this._xDisplayName || this.get(\"xKey\");","            },","","            setter: function(val)","            {","                this._xDisplayName = val.toString();","                return val;","            }","        },","","        /**","         * Name used for for displaying data related to the y-coordinate.","         *","         * @attribute yDisplayName","         * @type String","         */","        yDisplayName: {","            getter: function()","            {","                return this._yDisplayName || this.get(\"yKey\");","            },","","            setter: function(val)","            {","                this._yDisplayName = val.toString();","                return val;","            }","        },","","        /**","         * Name used for for displaying category data","         *","         * @attribute categoryDisplayName","         * @type String","         * @readOnly","         */","        categoryDisplayName: {","            lazyAdd: false,","","            getter: function()","            {","                return this.get(\"direction\") == \"vertical\" ? this.get(\"yDisplayName\") : this.get(\"xDisplayName\");","           },","","            setter: function(val)","            {","                if(this.get(\"direction\") == \"vertical\")","                {","                    this._yDisplayName = val;","                }","                else","                {","                    this._xDisplayName = val;","                }","                return val;","            }","        },","","        /**","         * Name used for for displaying value data","         *","         * @attribute valueDisplayName","         * @type String","         * @readOnly","         */","        valueDisplayName: {","            lazyAdd: false,","","            getter: function()","            {","                return this.get(\"direction\") == \"vertical\" ? this.get(\"xDisplayName\") : this.get(\"yDisplayName\");","            },","","            setter: function(val)","            {","                if(this.get(\"direction\") == \"vertical\")","                {","                    this._xDisplayName = val;","                }","                else","                {","                    this._yDisplayName = val;","                }","                return val;","            }","        },","","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default cartesian","         */","        type: {","            value: \"cartesian\"","        },","","        /**","         * Order of this instance of this `type`.","         *","         * @attribute order","         * @type Number","         */","        order: {},","","        /**","         * Order of the instance","         *","         * @attribute graphOrder","         * @type Number","         */","        graphOrder: {},","","        /**","         * x coordinates for the series.","         *","         * @attribute xcoords","         * @type Array","         */","        xcoords: {},","","        /**","         * y coordinates for the series","         *","         * @attribute ycoords","         * @type Array","         */","        ycoords: {},","","        /**","         * Reference to the `Chart` application. If no `Chart` application is present, a reference to the `Graphic` instance that","         * the series is drawn into will be returned.","         *","         * @attribute chart","         * @type ChartBase","         */","        chart: {","            getter: function()","            {","                var chart,","                    graph = this.get(\"graph\");","                if(graph)","                {","                    chart = graph.get(\"chart\");","                }","                return chart;","            }","        },","","        /**","         * Reference to the `Graph` in which the series is drawn into.","         *","         * @attribute graph","         * @type Graph","         */","        graph: {},","","        /**","         * Reference to the `Axis` instance used for assigning","         * x-values to the graph.","         *","         * @attribute xAxis","         * @type Axis","         */","        xAxis: {},","","        /**","         * Reference to the `Axis` instance used for assigning","         * y-values to the graph.","         *","         * @attribute yAxis","         * @type Axis","         */","        yAxis: {},","","        /**","         * Indicates which array to from the hash of value arrays in","         * the x-axis `Axis` instance.","         *","         * @attribute xKey","         * @type String","         */","        xKey: {","            setter: function(val)","            {","                return val.toString();","            }","        },","","        /**","         * Indicates which array to from the hash of value arrays in","         * the y-axis `Axis` instance.","         *","         * @attribute yKey","         * @type String","         */","        yKey: {","            setter: function(val)","            {","                return val.toString();","            }","        },","","        /**","         * Array of x values for the series.","         *","         * @attribute xData","         * @type Array","         */","        xData: {},","","        /**","         * Array of y values for the series.","         *","         * @attribute yData","         * @type Array","         */","        yData: {},","","        /**","         * Indicates whether the Series has been through its initial set up.","         *","         * @attribute rendered","         * @type Boolean","         */","        rendered: {","            value: false","        },","","        /*","         * Returns the width of the parent graph","         *","         * @attribute width","         * @type Number","         */","        width: {","            readOnly: true,","","            getter: function()","            {","                return this.get(\"graphic\").get(\"width\");","            }","        },","","        /**","         * Returns the height of the parent graph","         *","         * @attribute height","         * @type Number","         */","        height: {","            readOnly: true,","","            getter: function()","            {","                return this.get(\"graphic\").get(\"height\");","            }","        },","","        /**","         * Indicates whether to show the series","         *","         * @attribute visible","         * @type Boolean","         * @default true","         */","        visible: {","            value: true","        },","","        /**","         * Collection of area maps along the xAxis. Used to determine mouseover for multiple","         * series.","         *","         * @attribute xMarkerPlane","         * @type Array","         */","        xMarkerPlane: {},","","        /**","         * Collection of area maps along the yAxis. Used to determine mouseover for multiple","         * series.","         *","         * @attribute yMarkerPlane","         * @type Array","         */","        yMarkerPlane: {},","","        /**","         * Distance from a data coordinate to the left/right for setting a hotspot.","         *","         * @attribute xMarkerPlaneOffset","         * @type Number","         */","        xMarkerPlaneOffset: {","            getter: function() {","                var marker = this.get(\"styles\").marker;","                if(marker && marker.width && isFinite(marker.width))","                {","                    return marker.width * 0.5;","                }","                return this._defaultPlaneOffset;","            }","        },","","        /**","         * Distance from a data coordinate to the top/bottom for setting a hotspot.","         *","         * @attribute yMarkerPlaneOffset","         * @type Number","         */","        yMarkerPlaneOffset: {","            getter: function() {","                var marker = this.get(\"styles\").marker;","                if(marker && marker.height && isFinite(marker.height))","                {","                    return marker.height * 0.5;","                }","                return this._defaultPlaneOffset;","            }","        },","","        /**","         * Direction of the series","         *","         * @attribute direction","         * @type String","         */","        direction: {","            value: \"horizontal\"","        },","","        /**","         * Indicates whether or not markers for a series will be grouped and rendered in a single complex shape instance.","         *","         * @attribute groupMarkers","         * @type Boolean","         */","        groupMarkers: {","            getter: function()","            {","                var graph,","                    groupMarkers = this._groupMarkers;","                if(!groupMarkers) {","                    graph = this.get(\"graph\");","                    if(graph) ","                    {","                        groupMarkers = graph.get(\"groupMarkers\");","                    }","                }","                return groupMarkers;","            },","","            setter: function(val)","            {","                this._groupMarkers = val;","                return val;","            }","        }","    }","});","","","}, '@VERSION@', {\"requires\": [\"graphics\", \"axis-base\"]});"];
_yuitest_coverage["build/series-base/series-base.js"].lines = {"1":0,"9":0,"21":0,"64":0,"65":0,"66":0,"77":0,"79":0,"81":0,"82":0,"84":0,"86":0,"87":0,"89":0,"90":0,"91":0,"92":0,"93":0,"95":0,"98":0,"99":0,"100":0,"102":0,"105":0,"106":0,"107":0,"109":0,"112":0,"124":0,"125":0,"126":0,"138":0,"139":0,"140":0,"161":0,"162":0,"164":0,"177":0,"178":0,"180":0,"194":0,"200":0,"202":0,"204":0,"205":0,"206":0,"208":0,"210":0,"211":0,"212":0,"223":0,"225":0,"229":0,"241":0,"243":0,"254":0,"287":0,"288":0,"289":0,"290":0,"291":0,"293":0,"295":0,"297":0,"298":0,"299":0,"301":0,"303":0,"305":0,"306":0,"307":0,"309":0,"313":0,"315":0,"317":0,"321":0,"323":0,"324":0,"325":0,"326":0,"328":0,"329":0,"330":0,"331":0,"332":0,"345":0,"348":0,"350":0,"351":0,"353":0,"366":0,"369":0,"371":0,"372":0,"374":0,"385":0,"387":0,"389":0,"391":0,"393":0,"394":0,"396":0,"397":0,"398":0,"399":0,"401":0,"403":0,"404":0,"406":0,"410":0,"411":0,"436":0,"491":0,"499":0,"500":0,"502":0,"504":0,"505":0,"517":0,"528":0,"530":0,"541":0,"543":0,"545":0,"547":0,"549":0,"551":0,"553":0,"555":0,"557":0,"559":0,"561":0,"562":0,"563":0,"564":0,"565":0,"566":0,"568":0,"570":0,"571":0,"573":0,"576":0,"578":0,"579":0,"581":0,"583":0,"584":0,"586":0,"588":0,"589":0,"602":0,"604":0,"606":0,"608":0,"610":0,"612":0,"699":0,"700":0,"702":0,"723":0,"728":0,"729":0,"742":0,"747":0,"748":0,"764":0,"769":0,"771":0,"775":0,"777":0,"793":0,"798":0,"800":0,"804":0,"806":0,"863":0,"865":0,"867":0,"869":0,"909":0,"923":0,"964":0,"979":0,"1020":0,"1021":0,"1023":0,"1025":0,"1037":0,"1038":0,"1040":0,"1042":0,"1065":0,"1067":0,"1068":0,"1069":0,"1071":0,"1074":0,"1079":0,"1080":0};
_yuitest_coverage["build/series-base/series-base.js"].functions = {"render:62":0,"(anonymous 2):91":0,"(anonymous 3):98":0,"(anonymous 4):105":0,"addListeners:75":0,"_xAxisChangeHandler:122":0,"_yAxisChangeHandler:136":0,"_xDataChangeHandler:159":0,"_yDataChangeHandler:175":0,"_updateAxisBase:192":0,"validate:221":0,"_setCanvas:239":0,"setAreaData:252":0,"_getFirstValidIndex:343":0,"_getLastValidIndex:364":0,"draw:383":0,"_getDefaultStyles:434":0,"_getDefaultColor:489":0,"_handleVisibleChange:515":0,"getTotalValues:526":0,"destructor:539":0,"_getChart:601":0,"setter:697":0,"getter:721":0,"setter:726":0,"getter:740":0,"setter:745":0,"getter:762":0,"setter:767":0,"getter:791":0,"setter:796":0,"getter:861":0,"setter:907":0,"setter:921":0,"getter:962":0,"getter:977":0,"getter:1019":0,"getter:1036":0,"getter:1063":0,"setter:1077":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-base/series-base.js"].coveredLines = 199;
_yuitest_coverage["build/series-base/series-base.js"].coveredFunctions = 41;
_yuitest_coverline("build/series-base/series-base.js", 1);
YUI.add('series-base', function (Y, NAME) {

/**
 * Provides functionality for creating a chart series.
 *
 * @module charts
 * @submodule series-base
 */
_yuitest_coverfunc("build/series-base/series-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-base/series-base.js", 9);
var Y_Lang = Y.Lang;

/**
 * The CartesianSeries class creates a chart with horizontal and vertical axes.
 *
 * @class CartesianSeries
 * @extends Base
 * @uses Renderer
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-base
 */
_yuitest_coverline("build/series-base/series-base.js", 21);
Y.CartesianSeries = Y.Base.create("cartesianSeries", Y.Base, [Y.Renderer], {
    /**
     * Storage for `xDisplayName` attribute.
     *
     * @property _xDisplayName
     * @type String
     * @private
     */
    _xDisplayName: null,

    /**
     * Storage for `yDisplayName` attribute.
     *
     * @property _yDisplayName
     * @type String
     * @private
     */
    _yDisplayName: null,

    /**
     * Th x-coordinate for the left edge of the series.
     *
     * @property _leftOrigin
     * @type String
     * @private
     */
    _leftOrigin: null,

    /**
     * The y-coordinate for the bottom edge of the series.
     *
     * @property _bottomOrigin
     * @type String
     * @private
     */
    _bottomOrigin: null,

    /**
     * @method render
     * @private
     */
    render: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "render", 62);
_yuitest_coverline("build/series-base/series-base.js", 64);
this._setCanvas();
        _yuitest_coverline("build/series-base/series-base.js", 65);
this.addListeners();
        _yuitest_coverline("build/series-base/series-base.js", 66);
this.validate();
    },

    /**
     * Adds event listeners.
     *
     * @method addListeners
     * @private
     */
    addListeners: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "addListeners", 75);
_yuitest_coverline("build/series-base/series-base.js", 77);
var xAxis = this.get("xAxis"),
            yAxis = this.get("yAxis");
        _yuitest_coverline("build/series-base/series-base.js", 79);
if(xAxis)
        {
            _yuitest_coverline("build/series-base/series-base.js", 81);
this._xDataReadyHandle = xAxis.after("dataReady", Y.bind(this._xDataChangeHandler, this));
            _yuitest_coverline("build/series-base/series-base.js", 82);
this._xDataUpdateHandle = xAxis.after("dataUpdate", Y.bind(this._xDataChangeHandler, this));
        }
        _yuitest_coverline("build/series-base/series-base.js", 84);
if(yAxis)
        {
            _yuitest_coverline("build/series-base/series-base.js", 86);
this._yDataReadyHandle = yAxis.after("dataReady", Y.bind(this._yDataChangeHandler, this));
            _yuitest_coverline("build/series-base/series-base.js", 87);
this._yDataUpdateHandle = yAxis.after("dataUpdate", Y.bind(this._yDataChangeHandler, this));
        }
        _yuitest_coverline("build/series-base/series-base.js", 89);
this._xAxisChangeHandle = this.after("xAxisChange", this._xAxisChangeHandler);
        _yuitest_coverline("build/series-base/series-base.js", 90);
this._yAxisChangeHandle = this.after("yAxisChange", this._yAxisChangeHandler);
        _yuitest_coverline("build/series-base/series-base.js", 91);
this._stylesChangeHandle = this.after("stylesChange", function(e) {
            _yuitest_coverfunc("build/series-base/series-base.js", "(anonymous 2)", 91);
_yuitest_coverline("build/series-base/series-base.js", 92);
var axesReady = this._updateAxisBase();
            _yuitest_coverline("build/series-base/series-base.js", 93);
if(axesReady)
            {
                _yuitest_coverline("build/series-base/series-base.js", 95);
this.draw();
            }
        });
        _yuitest_coverline("build/series-base/series-base.js", 98);
this._widthChangeHandle = this.after("widthChange", function(e) {
            _yuitest_coverfunc("build/series-base/series-base.js", "(anonymous 3)", 98);
_yuitest_coverline("build/series-base/series-base.js", 99);
var axesReady = this._updateAxisBase();
            _yuitest_coverline("build/series-base/series-base.js", 100);
if(axesReady)
            {
                _yuitest_coverline("build/series-base/series-base.js", 102);
this.draw();
            }
        });
        _yuitest_coverline("build/series-base/series-base.js", 105);
this._heightChangeHandle = this.after("heightChange", function(e) {
            _yuitest_coverfunc("build/series-base/series-base.js", "(anonymous 4)", 105);
_yuitest_coverline("build/series-base/series-base.js", 106);
var axesReady = this._updateAxisBase();
            _yuitest_coverline("build/series-base/series-base.js", 107);
if(axesReady)
            {
                _yuitest_coverline("build/series-base/series-base.js", 109);
this.draw();
            }
        });
        _yuitest_coverline("build/series-base/series-base.js", 112);
this._visibleChangeHandle = this.after("visibleChange", this._handleVisibleChange);
    },

    /**
     * Event handler for the xAxisChange event.
     *
     * @method _xAxisChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _xAxisChangeHandler: function(e)
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "_xAxisChangeHandler", 122);
_yuitest_coverline("build/series-base/series-base.js", 124);
var xAxis = this.get("xAxis");
        _yuitest_coverline("build/series-base/series-base.js", 125);
xAxis.after("dataReady", Y.bind(this._xDataChangeHandler, this));
        _yuitest_coverline("build/series-base/series-base.js", 126);
xAxis.after("dataUpdate", Y.bind(this._xDataChangeHandler, this));
    },

    /**
     * Event handler the yAxisChange event.
     *
     * @method _yAxisChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _yAxisChangeHandler: function(e)
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "_yAxisChangeHandler", 136);
_yuitest_coverline("build/series-base/series-base.js", 138);
var yAxis = this.get("yAxis");
        _yuitest_coverline("build/series-base/series-base.js", 139);
yAxis.after("dataReady", Y.bind(this._yDataChangeHandler, this));
        _yuitest_coverline("build/series-base/series-base.js", 140);
yAxis.after("dataUpdate", Y.bind(this._yDataChangeHandler, this));
    },

    /**
     * Constant used to generate unique id.
     *
     * @property GUID
     * @type String
     * @private
     */
    GUID: "yuicartesianseries",

    /**
     * Event handler for xDataChange event.
     *
     * @method _xDataChangeHandler
     * @param {Object} event Event object.
     * @private
     */
    _xDataChangeHandler: function(event)
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "_xDataChangeHandler", 159);
_yuitest_coverline("build/series-base/series-base.js", 161);
var axesReady = this._updateAxisBase();
        _yuitest_coverline("build/series-base/series-base.js", 162);
if(axesReady)
        {
            _yuitest_coverline("build/series-base/series-base.js", 164);
this.draw();
        }
    },

    /**
     * Event handler for yDataChange event.
     *
     * @method _yDataChangeHandler
     * @param {Object} event Event object.
     * @private
     */
    _yDataChangeHandler: function(event)
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "_yDataChangeHandler", 175);
_yuitest_coverline("build/series-base/series-base.js", 177);
var axesReady = this._updateAxisBase();
        _yuitest_coverline("build/series-base/series-base.js", 178);
if(axesReady)
        {
            _yuitest_coverline("build/series-base/series-base.js", 180);
this.draw();
        }
    },

    /**
     * Checks to ensure that both xAxis and yAxis data are available. If so, set the `xData` and `yData` attributes
     * and return `true`. Otherwise, return `false`.
     *
     * @method _updateAxisBase
     * @return Boolean
     * @private
     */
    _updateAxisBase: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "_updateAxisBase", 192);
_yuitest_coverline("build/series-base/series-base.js", 194);
var xAxis = this.get("xAxis"),
            yAxis = this.get("yAxis"),
            xKey = this.get("xKey"),
            yKey = this.get("yKey"),
            yData,
            xData;
        _yuitest_coverline("build/series-base/series-base.js", 200);
if(!xAxis || !yAxis || !xKey || !yKey)
        {
            _yuitest_coverline("build/series-base/series-base.js", 202);
return false;
        }
        _yuitest_coverline("build/series-base/series-base.js", 204);
xData = xAxis.getDataByKey(xKey);
        _yuitest_coverline("build/series-base/series-base.js", 205);
yData = yAxis.getDataByKey(yKey);
        _yuitest_coverline("build/series-base/series-base.js", 206);
if(!xData || !yData)
        {
            _yuitest_coverline("build/series-base/series-base.js", 208);
return false;
        }
        _yuitest_coverline("build/series-base/series-base.js", 210);
this.set("xData", xData.concat());
        _yuitest_coverline("build/series-base/series-base.js", 211);
this.set("yData", yData.concat());
        _yuitest_coverline("build/series-base/series-base.js", 212);
return true;
    },

    /**
     * Draws the series is the xAxis and yAxis data are both available.
     *
     * @method validate
     * @private
     */
    validate: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "validate", 221);
_yuitest_coverline("build/series-base/series-base.js", 223);
if((this.get("xData") && this.get("yData")) || this._updateAxisBase())
        {
            _yuitest_coverline("build/series-base/series-base.js", 225);
this.draw();
        }
        else
        {
            _yuitest_coverline("build/series-base/series-base.js", 229);
this.fire("drawingComplete");
        }
    },

    /**
     * Creates a `Graphic` instance.
     *
     * @method _setCanvas
     * @protected
     */
    _setCanvas: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "_setCanvas", 239);
_yuitest_coverline("build/series-base/series-base.js", 241);
var graph = this.get("graph"),
            graphic = graph.get("graphic");
        _yuitest_coverline("build/series-base/series-base.js", 243);
this.set("graphic", graphic);
    },

    /**
     * Calculates the coordinates for the series.
     *
     * @method setAreaData
     * @protected
     */
    setAreaData: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "setAreaData", 252);
_yuitest_coverline("build/series-base/series-base.js", 254);
var isNumber = Y_Lang.isNumber,
            nextX, nextY,
            w = this.get("width"),
            h = this.get("height"),
            xAxis = this.get("xAxis"),
            yAxis = this.get("yAxis"),
            xData = this.get("xData").concat(),
            yData = this.get("yData").concat(),
            xValue,
            yValue,
            xOffset = xAxis.getEdgeOffset(xData.length, w),
            yOffset = yAxis.getEdgeOffset(yData.length, h),
            padding = this.get("styles").padding,
			leftPadding = padding.left,
			topPadding = padding.top,
			dataWidth = w - (leftPadding + padding.right + xOffset),
			dataHeight = h - (topPadding + padding.bottom + yOffset),
			xcoords = [],
			ycoords = [],
			xMax = xAxis.get("maximum"),
			xMin = xAxis.get("minimum"),
			yMax = yAxis.get("maximum"),
			yMin = yAxis.get("minimum"),
            xScaleFactor = dataWidth / (xMax - xMin),
			yScaleFactor = dataHeight / (yMax - yMin),
            dataLength,
            direction = this.get("direction"),
            i = 0,
            xMarkerPlane = [],
            yMarkerPlane = [],
            xMarkerPlaneOffset = this.get("xMarkerPlaneOffset"),
            yMarkerPlaneOffset = this.get("yMarkerPlaneOffset"),
            graphic = this.get("graphic");
        _yuitest_coverline("build/series-base/series-base.js", 287);
graphic.set("width", w);
        _yuitest_coverline("build/series-base/series-base.js", 288);
graphic.set("height", h);
        _yuitest_coverline("build/series-base/series-base.js", 289);
dataLength = xData.length;
        _yuitest_coverline("build/series-base/series-base.js", 290);
xOffset *= 0.5;
        _yuitest_coverline("build/series-base/series-base.js", 291);
yOffset *= 0.5;
        //Assuming a vertical graph has a range/category for its vertical axis.
        _yuitest_coverline("build/series-base/series-base.js", 293);
if(direction === "vertical")
        {
            _yuitest_coverline("build/series-base/series-base.js", 295);
yData = yData.reverse();
        }
        _yuitest_coverline("build/series-base/series-base.js", 297);
this._leftOrigin = Math.round(((0 - xMin) * xScaleFactor) + leftPadding + xOffset);
        _yuitest_coverline("build/series-base/series-base.js", 298);
this._bottomOrigin = Math.round((dataHeight + topPadding + yOffset));
        _yuitest_coverline("build/series-base/series-base.js", 299);
if(yMin < 0)
        {
            _yuitest_coverline("build/series-base/series-base.js", 301);
this._bottomOrigin = this._bottomOrigin - ((0 - yMin) * yScaleFactor);
        }
        _yuitest_coverline("build/series-base/series-base.js", 303);
for (; i < dataLength; ++i)
		{
            _yuitest_coverline("build/series-base/series-base.js", 305);
xValue = parseFloat(xData[i]);
            _yuitest_coverline("build/series-base/series-base.js", 306);
yValue = parseFloat(yData[i]);
            _yuitest_coverline("build/series-base/series-base.js", 307);
if(isNumber(xValue))
            {
                _yuitest_coverline("build/series-base/series-base.js", 309);
nextX = (((xValue - xMin) * xScaleFactor) + leftPadding + xOffset);
            }
            else
            {
                _yuitest_coverline("build/series-base/series-base.js", 313);
nextX = NaN;
            }
            _yuitest_coverline("build/series-base/series-base.js", 315);
if(isNumber(yValue))
            {
			    _yuitest_coverline("build/series-base/series-base.js", 317);
nextY = ((dataHeight + topPadding + yOffset) - (yValue - yMin) * yScaleFactor);
            }
            else
            {
                _yuitest_coverline("build/series-base/series-base.js", 321);
nextY = NaN;
            }
            _yuitest_coverline("build/series-base/series-base.js", 323);
xcoords.push(nextX);
            _yuitest_coverline("build/series-base/series-base.js", 324);
ycoords.push(nextY);
            _yuitest_coverline("build/series-base/series-base.js", 325);
xMarkerPlane.push({start:nextX - xMarkerPlaneOffset, end: nextX + xMarkerPlaneOffset});
            _yuitest_coverline("build/series-base/series-base.js", 326);
yMarkerPlane.push({start:nextY - yMarkerPlaneOffset, end: nextY + yMarkerPlaneOffset});
        }
        _yuitest_coverline("build/series-base/series-base.js", 328);
this.set("xcoords", xcoords);
		_yuitest_coverline("build/series-base/series-base.js", 329);
this.set("ycoords", ycoords);
        _yuitest_coverline("build/series-base/series-base.js", 330);
this.set("xMarkerPlane", xMarkerPlane);
        _yuitest_coverline("build/series-base/series-base.js", 331);
this.set("yMarkerPlane", yMarkerPlane);
        _yuitest_coverline("build/series-base/series-base.js", 332);
this._dataLength = dataLength;
    },

    /**
     * Finds the first valid index of an array coordinates.
     *
     * @method _getFirstValidIndex
     * @param {Array} coords An array of x or y coordinates.
     * @return Number
     * @private
     */
    _getFirstValidIndex: function(coords)
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "_getFirstValidIndex", 343);
_yuitest_coverline("build/series-base/series-base.js", 345);
var coord,
            i = -1,
            limit = coords.length;
        _yuitest_coverline("build/series-base/series-base.js", 348);
while(!Y_Lang.isNumber(coord) && i < limit)
        {
            _yuitest_coverline("build/series-base/series-base.js", 350);
i += 1;
            _yuitest_coverline("build/series-base/series-base.js", 351);
coord = coords[i];
        }
        _yuitest_coverline("build/series-base/series-base.js", 353);
return i;
    },

    /**
     * Finds the last valid index of an array coordinates.
     *
     * @method _getLastValidIndex
     * @param {Array} coords An array of x or y coordinates.
     * @return Number
     * @private
     */
    _getLastValidIndex: function(coords)
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "_getLastValidIndex", 364);
_yuitest_coverline("build/series-base/series-base.js", 366);
var coord,
            i = coords.length,
            limit = -1;
        _yuitest_coverline("build/series-base/series-base.js", 369);
while(!Y_Lang.isNumber(coord) && i > limit)
        {
            _yuitest_coverline("build/series-base/series-base.js", 371);
i -= 1;
            _yuitest_coverline("build/series-base/series-base.js", 372);
coord = coords[i];
        }
        _yuitest_coverline("build/series-base/series-base.js", 374);
return i;
    },

    /**
     * Draws the series.
     *
     * @method draw
     * @protected
     */
    draw: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "draw", 383);
_yuitest_coverline("build/series-base/series-base.js", 385);
var w = this.get("width"),
            h = this.get("height");
        _yuitest_coverline("build/series-base/series-base.js", 387);
if(this.get("rendered"))
        {
            _yuitest_coverline("build/series-base/series-base.js", 389);
if((isFinite(w) && isFinite(h) && w > 0 && h > 0) && ((this.get("xData") && this.get("yData")) || this._updateAxisBase()))
            {
                _yuitest_coverline("build/series-base/series-base.js", 391);
if(this._drawing)
                {
                    _yuitest_coverline("build/series-base/series-base.js", 393);
this._callLater = true;
                    _yuitest_coverline("build/series-base/series-base.js", 394);
return;
                }
                _yuitest_coverline("build/series-base/series-base.js", 396);
this._drawing = true;
                _yuitest_coverline("build/series-base/series-base.js", 397);
this._callLater = false;
                _yuitest_coverline("build/series-base/series-base.js", 398);
this.setAreaData();
                _yuitest_coverline("build/series-base/series-base.js", 399);
if(this.get("xcoords") && this.get("ycoords"))
                {
                    _yuitest_coverline("build/series-base/series-base.js", 401);
this.drawSeries();
                }
                _yuitest_coverline("build/series-base/series-base.js", 403);
this._drawing = false;
                _yuitest_coverline("build/series-base/series-base.js", 404);
if(this._callLater)
                {
                    _yuitest_coverline("build/series-base/series-base.js", 406);
this.draw();
                }
                else
                {
                    _yuitest_coverline("build/series-base/series-base.js", 410);
this._toggleVisible(this.get("visible"));
                    _yuitest_coverline("build/series-base/series-base.js", 411);
this.fire("drawingComplete");
                }
            }
        }
    },

    /**
     * Default value for plane offsets when the parent chart's `interactiveType` is `planar`.
     *
     * @property _defaultPlaneOffset
     * @type Number
     * @private
     */
    _defaultPlaneOffset: 4,

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
        _yuitest_coverfunc("build/series-base/series-base.js", "_getDefaultStyles", 434);
_yuitest_coverline("build/series-base/series-base.js", 436);
return {padding:{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }};
    },

    /**
     * Collection of default colors used for lines in a series when not specified by user.
     *
     * @property _defaultLineColors
     * @type Array
     * @protected
     */
    _defaultLineColors:["#426ab3", "#d09b2c", "#000000", "#b82837", "#b384b5", "#ff7200", "#779de3", "#cbc8ba", "#7ed7a6", "#007a6c"],

    /**
     * Collection of default colors used for marker fills in a series when not specified by user.
     *
     * @property _defaultFillColors
     * @type Array
     * @protected
     */
    _defaultFillColors:["#6084d0", "#eeb647", "#6c6b5f", "#d6484f", "#ce9ed1", "#ff9f3b", "#93b7ff", "#e0ddd0", "#94ecba", "#309687"],

    /**
     * Collection of default colors used for marker borders in a series when not specified by user.
     *
     * @property _defaultBorderColors
     * @type Array
     * @protected
     */
    _defaultBorderColors:["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"],

    /**
     * Collection of default colors used for area fills, histogram fills and pie fills in a series when not specified by user.
     *
     * @property _defaultSliceColors
     * @type Array
     * @protected
     */
    _defaultSliceColors: ["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"],

    /**
     * Parses a color based on a series order and type.
     *
     * @method _getDefaultColor
     * @param {Number} index Index indicating the series order.
     * @param {String} type Indicates which type of object needs the color.
     * @return String
     * @protected
     */
    _getDefaultColor: function(index, type)
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "_getDefaultColor", 489);
_yuitest_coverline("build/series-base/series-base.js", 491);
var colors = {
                line: this._defaultLineColors,
                fill: this._defaultFillColors,
                border: this._defaultBorderColors,
                slice: this._defaultSliceColors
            },
            col = colors[type] || colors.fill,
            l = col.length;
        _yuitest_coverline("build/series-base/series-base.js", 499);
index = index || 0;
        _yuitest_coverline("build/series-base/series-base.js", 500);
if(index >= l)
        {
            _yuitest_coverline("build/series-base/series-base.js", 502);
index = index % l;
        }
        _yuitest_coverline("build/series-base/series-base.js", 504);
type = type || "fill";
        _yuitest_coverline("build/series-base/series-base.js", 505);
return colors[type][index];
    },

    /**
     * Shows/hides contents of the series.
     *
     * @method _handleVisibleChange
     * @param {Object} e Event object.
     * @protected
     */
    _handleVisibleChange: function(e)
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "_handleVisibleChange", 515);
_yuitest_coverline("build/series-base/series-base.js", 517);
this._toggleVisible(this.get("visible"));
    },

    /**
     * Returns the sum of all values for the series.
     *
     * @method getTotalValues
     * @return Number
     */
    getTotalValues: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "getTotalValues", 526);
_yuitest_coverline("build/series-base/series-base.js", 528);
var valueCoord = this.get("direction") === "vertical" ? "x" : "y",
            total = this.get(valueCoord + "Axis").getTotalByKey(this.get(valueCoord + "Key"));
        _yuitest_coverline("build/series-base/series-base.js", 530);
return total;
    },

    /**
     * Destructor implementation for the CartesianSeries class. Calls destroy on all Graphic instances.
     *
     * @method destructor
     * @protected
     */
    destructor: function()
    {
        _yuitest_coverfunc("build/series-base/series-base.js", "destructor", 539);
_yuitest_coverline("build/series-base/series-base.js", 541);
var marker,
            markers = this.get("markers");
        _yuitest_coverline("build/series-base/series-base.js", 543);
if(this.get("rendered"))
        {
            _yuitest_coverline("build/series-base/series-base.js", 545);
if(this._xDataReadyHandle)
            {
                _yuitest_coverline("build/series-base/series-base.js", 547);
this._xDataReadyHandle.detach();
            }
            _yuitest_coverline("build/series-base/series-base.js", 549);
if(this._xDataUpdateHandle)
            {
                _yuitest_coverline("build/series-base/series-base.js", 551);
this._xDataUpdateHandle.detach();
            }
            _yuitest_coverline("build/series-base/series-base.js", 553);
if(this._yDataReadyHandle)
            {
                _yuitest_coverline("build/series-base/series-base.js", 555);
this._yDataReadyHandle.detach();
            }
            _yuitest_coverline("build/series-base/series-base.js", 557);
if(this._yDataUpdateHandle)
            {
                _yuitest_coverline("build/series-base/series-base.js", 559);
this._yDataUpdateHandle.detach();
            }
            _yuitest_coverline("build/series-base/series-base.js", 561);
this._xAxisChangeHandle.detach();
            _yuitest_coverline("build/series-base/series-base.js", 562);
this._yAxisChangeHandle.detach();
            _yuitest_coverline("build/series-base/series-base.js", 563);
this._stylesChangeHandle.detach();
            _yuitest_coverline("build/series-base/series-base.js", 564);
this._widthChangeHandle.detach();
            _yuitest_coverline("build/series-base/series-base.js", 565);
this._heightChangeHandle.detach();
            _yuitest_coverline("build/series-base/series-base.js", 566);
this._visibleChangeHandle.detach();
        }
        _yuitest_coverline("build/series-base/series-base.js", 568);
while(markers && markers.length > 0)
        {
            _yuitest_coverline("build/series-base/series-base.js", 570);
marker = markers.shift();
            _yuitest_coverline("build/series-base/series-base.js", 571);
if(marker && marker instanceof Y.Shape)
            {
                _yuitest_coverline("build/series-base/series-base.js", 573);
marker.destroy();
            }
        }
        _yuitest_coverline("build/series-base/series-base.js", 576);
if(this._path)
        {
            _yuitest_coverline("build/series-base/series-base.js", 578);
this._path.destroy();
            _yuitest_coverline("build/series-base/series-base.js", 579);
this._path = null;
        }
        _yuitest_coverline("build/series-base/series-base.js", 581);
if(this._lineGraphic)
        {
            _yuitest_coverline("build/series-base/series-base.js", 583);
this._lineGraphic.destroy();
            _yuitest_coverline("build/series-base/series-base.js", 584);
this._lineGraphic = null;
        }
        _yuitest_coverline("build/series-base/series-base.js", 586);
if(this._groupMarker)
        {
            _yuitest_coverline("build/series-base/series-base.js", 588);
this._groupMarker.destroy();
            _yuitest_coverline("build/series-base/series-base.js", 589);
this._groupMarker = null;
        }
    },

    /**
     * Returns a reference to the parent container to which all chart elements are contained. When the series is bound to a `Chart` instance, the `Chart` instance is
     * the reference. If nothing is set as the `chart` attribute, the `_getChart` method will return a reference to the `graphic` attribute.
     *
     * @method _getChart
     * @return {Object}
     * @private 
     */
    _getChart:function() {
        _yuitest_coverfunc("build/series-base/series-base.js", "_getChart", 601);
_yuitest_coverline("build/series-base/series-base.js", 602);
var chart,
            graph = this.get("graph");
        _yuitest_coverline("build/series-base/series-base.js", 604);
if(graph)
        {
            _yuitest_coverline("build/series-base/series-base.js", 606);
chart = graph.get("chart");
        }
        _yuitest_coverline("build/series-base/series-base.js", 608);
if(!chart) 
        {
            _yuitest_coverline("build/series-base/series-base.js", 610);
chart = this.get("graphic");
        }
        _yuitest_coverline("build/series-base/series-base.js", 612);
return chart;
    }
        /**
         * Event handle for the x-axis' dataReady event.
         *
         * @property _xDataReadyHandle
         * @type {EventHandle}
         * @private
         */

        /**
         * Event handle for the x-axis dataUpdate event.
         *
         * @property _xDataUpdateHandle
         * @type {EventHandle}
         * @private
         */

        /**
         * Event handle for the y-axis dataReady event.
         *
         * @property _yDataReadyHandle
         * @type {EventHandle}
         * @private
         */

        /**
         * Event handle for the y-axis dataUpdate event.
         * @property _yDataUpdateHandle
         * @type {EventHandle}
         * @private
         */

        /**
         * Event handle for the xAxisChange event.
         * @property _xAxisChangeHandle
         * @type {EventHandle}
         * @private
         */

        /**
         * Event handle for the yAxisChange event.
         * @property _yAxisChangeHandle
         * @type {EventHandle}
         * @private
         */

        /**
         * Event handle for the stylesChange event.
         * @property _stylesChangeHandle
         * @type {EventHandle}
         * @private
         */

        /**
         * Event handle for the widthChange event.
         * @property _widthChangeHandle
         * @type {EventHandle}
         * @private
         */

        /**
         * Event handle for the heightChange event.
         * @property _heightChangeHandle
         * @type {EventHandle}
         * @private
         */

        /**
         * Event handle for the visibleChange event.
         * @property _visibleChangeHandle
         * @type {EventHandle}
         * @private
         */
}, {
    ATTRS: {
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
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 697);
_yuitest_coverline("build/series-base/series-base.js", 699);
if(!this.get("rendered")) {
                    _yuitest_coverline("build/series-base/series-base.js", 700);
this.set("rendered", true);
                }
                _yuitest_coverline("build/series-base/series-base.js", 702);
return val;
            }
        },

        /**
         * An array of all series of the same type used within a chart application.
         *
         * @attribute seriesTypeCollection
         * @type Array
         */
        seriesTypeCollection: {},
        
        /**
         * Name used for for displaying data related to the x-coordinate.
         *
         * @attribute xDisplayName
         * @type String
         */
        xDisplayName: {
            getter: function()
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 721);
_yuitest_coverline("build/series-base/series-base.js", 723);
return this._xDisplayName || this.get("xKey");
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 726);
_yuitest_coverline("build/series-base/series-base.js", 728);
this._xDisplayName = val.toString();
                _yuitest_coverline("build/series-base/series-base.js", 729);
return val;
            }
        },

        /**
         * Name used for for displaying data related to the y-coordinate.
         *
         * @attribute yDisplayName
         * @type String
         */
        yDisplayName: {
            getter: function()
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 740);
_yuitest_coverline("build/series-base/series-base.js", 742);
return this._yDisplayName || this.get("yKey");
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 745);
_yuitest_coverline("build/series-base/series-base.js", 747);
this._yDisplayName = val.toString();
                _yuitest_coverline("build/series-base/series-base.js", 748);
return val;
            }
        },

        /**
         * Name used for for displaying category data
         *
         * @attribute categoryDisplayName
         * @type String
         * @readOnly
         */
        categoryDisplayName: {
            lazyAdd: false,

            getter: function()
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 762);
_yuitest_coverline("build/series-base/series-base.js", 764);
return this.get("direction") == "vertical" ? this.get("yDisplayName") : this.get("xDisplayName");
           },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 767);
_yuitest_coverline("build/series-base/series-base.js", 769);
if(this.get("direction") == "vertical")
                {
                    _yuitest_coverline("build/series-base/series-base.js", 771);
this._yDisplayName = val;
                }
                else
                {
                    _yuitest_coverline("build/series-base/series-base.js", 775);
this._xDisplayName = val;
                }
                _yuitest_coverline("build/series-base/series-base.js", 777);
return val;
            }
        },

        /**
         * Name used for for displaying value data
         *
         * @attribute valueDisplayName
         * @type String
         * @readOnly
         */
        valueDisplayName: {
            lazyAdd: false,

            getter: function()
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 791);
_yuitest_coverline("build/series-base/series-base.js", 793);
return this.get("direction") == "vertical" ? this.get("xDisplayName") : this.get("yDisplayName");
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 796);
_yuitest_coverline("build/series-base/series-base.js", 798);
if(this.get("direction") == "vertical")
                {
                    _yuitest_coverline("build/series-base/series-base.js", 800);
this._xDisplayName = val;
                }
                else
                {
                    _yuitest_coverline("build/series-base/series-base.js", 804);
this._yDisplayName = val;
                }
                _yuitest_coverline("build/series-base/series-base.js", 806);
return val;
            }
        },

        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default cartesian
         */
        type: {
            value: "cartesian"
        },

        /**
         * Order of this instance of this `type`.
         *
         * @attribute order
         * @type Number
         */
        order: {},

        /**
         * Order of the instance
         *
         * @attribute graphOrder
         * @type Number
         */
        graphOrder: {},

        /**
         * x coordinates for the series.
         *
         * @attribute xcoords
         * @type Array
         */
        xcoords: {},

        /**
         * y coordinates for the series
         *
         * @attribute ycoords
         * @type Array
         */
        ycoords: {},

        /**
         * Reference to the `Chart` application. If no `Chart` application is present, a reference to the `Graphic` instance that
         * the series is drawn into will be returned.
         *
         * @attribute chart
         * @type ChartBase
         */
        chart: {
            getter: function()
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 861);
_yuitest_coverline("build/series-base/series-base.js", 863);
var chart,
                    graph = this.get("graph");
                _yuitest_coverline("build/series-base/series-base.js", 865);
if(graph)
                {
                    _yuitest_coverline("build/series-base/series-base.js", 867);
chart = graph.get("chart");
                }
                _yuitest_coverline("build/series-base/series-base.js", 869);
return chart;
            }
        },

        /**
         * Reference to the `Graph` in which the series is drawn into.
         *
         * @attribute graph
         * @type Graph
         */
        graph: {},

        /**
         * Reference to the `Axis` instance used for assigning
         * x-values to the graph.
         *
         * @attribute xAxis
         * @type Axis
         */
        xAxis: {},

        /**
         * Reference to the `Axis` instance used for assigning
         * y-values to the graph.
         *
         * @attribute yAxis
         * @type Axis
         */
        yAxis: {},

        /**
         * Indicates which array to from the hash of value arrays in
         * the x-axis `Axis` instance.
         *
         * @attribute xKey
         * @type String
         */
        xKey: {
            setter: function(val)
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 907);
_yuitest_coverline("build/series-base/series-base.js", 909);
return val.toString();
            }
        },

        /**
         * Indicates which array to from the hash of value arrays in
         * the y-axis `Axis` instance.
         *
         * @attribute yKey
         * @type String
         */
        yKey: {
            setter: function(val)
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 921);
_yuitest_coverline("build/series-base/series-base.js", 923);
return val.toString();
            }
        },

        /**
         * Array of x values for the series.
         *
         * @attribute xData
         * @type Array
         */
        xData: {},

        /**
         * Array of y values for the series.
         *
         * @attribute yData
         * @type Array
         */
        yData: {},

        /**
         * Indicates whether the Series has been through its initial set up.
         *
         * @attribute rendered
         * @type Boolean
         */
        rendered: {
            value: false
        },

        /*
         * Returns the width of the parent graph
         *
         * @attribute width
         * @type Number
         */
        width: {
            readOnly: true,

            getter: function()
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 962);
_yuitest_coverline("build/series-base/series-base.js", 964);
return this.get("graphic").get("width");
            }
        },

        /**
         * Returns the height of the parent graph
         *
         * @attribute height
         * @type Number
         */
        height: {
            readOnly: true,

            getter: function()
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 977);
_yuitest_coverline("build/series-base/series-base.js", 979);
return this.get("graphic").get("height");
            }
        },

        /**
         * Indicates whether to show the series
         *
         * @attribute visible
         * @type Boolean
         * @default true
         */
        visible: {
            value: true
        },

        /**
         * Collection of area maps along the xAxis. Used to determine mouseover for multiple
         * series.
         *
         * @attribute xMarkerPlane
         * @type Array
         */
        xMarkerPlane: {},

        /**
         * Collection of area maps along the yAxis. Used to determine mouseover for multiple
         * series.
         *
         * @attribute yMarkerPlane
         * @type Array
         */
        yMarkerPlane: {},

        /**
         * Distance from a data coordinate to the left/right for setting a hotspot.
         *
         * @attribute xMarkerPlaneOffset
         * @type Number
         */
        xMarkerPlaneOffset: {
            getter: function() {
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 1019);
_yuitest_coverline("build/series-base/series-base.js", 1020);
var marker = this.get("styles").marker;
                _yuitest_coverline("build/series-base/series-base.js", 1021);
if(marker && marker.width && isFinite(marker.width))
                {
                    _yuitest_coverline("build/series-base/series-base.js", 1023);
return marker.width * 0.5;
                }
                _yuitest_coverline("build/series-base/series-base.js", 1025);
return this._defaultPlaneOffset;
            }
        },

        /**
         * Distance from a data coordinate to the top/bottom for setting a hotspot.
         *
         * @attribute yMarkerPlaneOffset
         * @type Number
         */
        yMarkerPlaneOffset: {
            getter: function() {
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 1036);
_yuitest_coverline("build/series-base/series-base.js", 1037);
var marker = this.get("styles").marker;
                _yuitest_coverline("build/series-base/series-base.js", 1038);
if(marker && marker.height && isFinite(marker.height))
                {
                    _yuitest_coverline("build/series-base/series-base.js", 1040);
return marker.height * 0.5;
                }
                _yuitest_coverline("build/series-base/series-base.js", 1042);
return this._defaultPlaneOffset;
            }
        },

        /**
         * Direction of the series
         *
         * @attribute direction
         * @type String
         */
        direction: {
            value: "horizontal"
        },

        /**
         * Indicates whether or not markers for a series will be grouped and rendered in a single complex shape instance.
         *
         * @attribute groupMarkers
         * @type Boolean
         */
        groupMarkers: {
            getter: function()
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 1063);
_yuitest_coverline("build/series-base/series-base.js", 1065);
var graph,
                    groupMarkers = this._groupMarkers;
                _yuitest_coverline("build/series-base/series-base.js", 1067);
if(!groupMarkers) {
                    _yuitest_coverline("build/series-base/series-base.js", 1068);
graph = this.get("graph");
                    _yuitest_coverline("build/series-base/series-base.js", 1069);
if(graph) 
                    {
                        _yuitest_coverline("build/series-base/series-base.js", 1071);
groupMarkers = graph.get("groupMarkers");
                    }
                }
                _yuitest_coverline("build/series-base/series-base.js", 1074);
return groupMarkers;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 1077);
_yuitest_coverline("build/series-base/series-base.js", 1079);
this._groupMarkers = val;
                _yuitest_coverline("build/series-base/series-base.js", 1080);
return val;
            }
        }
    }
});


}, '@VERSION@', {"requires": ["graphics", "axis-base"]});
