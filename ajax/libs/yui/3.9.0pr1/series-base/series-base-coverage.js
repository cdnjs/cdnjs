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
_yuitest_coverage["build/series-base/series-base.js"].code=["YUI.add('series-base', function (Y, NAME) {","","/**"," * Provides functionality for creating a chart series."," *"," * @module charts"," * @submodule series-base"," */","var Y_Lang = Y.Lang;","","/**"," * The CartesianSeries class creates a chart with horizontal and vertical axes."," *"," * @class CartesianSeries"," * @extends Base"," * @uses Renderer"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-base"," */","Y.CartesianSeries = Y.Base.create(\"cartesianSeries\", Y.Base, [Y.Renderer], {","    /**","     * Storage for `xDisplayName` attribute.","     *","     * @property _xDisplayName","     * @type String","     * @private","     */","    _xDisplayName: null,","","    /**","     * Storage for `yDisplayName` attribute.","     *","     * @property _yDisplayName","     * @type String","     * @private","     */","    _yDisplayName: null,","","    /**","     * Th x-coordinate for the left edge of the series.","     *","     * @property _leftOrigin","     * @type String","     * @private","     */","    _leftOrigin: null,","","    /**","     * The y-coordinate for the bottom edge of the series.","     *","     * @property _bottomOrigin","     * @type String","     * @private","     */","    _bottomOrigin: null,","","    /**","     * @method render","     * @private","     */","    render: function()","    {","        this._setCanvas();","        this.addListeners();","        this.set(\"rendered\", true);","        this.validate();","    },","","    /**","     * Adds event listeners.","     *","     * @method addListeners","     * @private","     */","    addListeners: function()","    {","        var xAxis = this.get(\"xAxis\"),","            yAxis = this.get(\"yAxis\");","        if(xAxis)","        {","            this._xDataReadyHandle = xAxis.after(\"dataReady\", Y.bind(this._xDataChangeHandler, this));","            this._xDataUpdateHandle = xAxis.after(\"dataUpdate\", Y.bind(this._xDataChangeHandler, this));","        }","        if(yAxis)","        {","            this._yDataReadyHandle = yAxis.after(\"dataReady\", Y.bind(this._yDataChangeHandler, this));","            this._yDataUpdateHandle = yAxis.after(\"dataUpdate\", Y.bind(this._yDataChangeHandler, this));","        }","        this._xAxisChangeHandle = this.after(\"xAxisChange\", this._xAxisChangeHandler);","        this._yAxisChangeHandle = this.after(\"yAxisChange\", this._yAxisChangeHandler);","        this._stylesChangeHandle = this.after(\"stylesChange\", function(e) {","            var axesReady = this._updateAxisBase();","            if(axesReady)","            {","                this.draw();","            }","        });","        this._widthChangeHandle = this.after(\"widthChange\", function(e) {","            var axesReady = this._updateAxisBase();","            if(axesReady)","            {","                this.draw();","            }","        });","        this._heightChangeHandle = this.after(\"heightChange\", function(e) {","            var axesReady = this._updateAxisBase();","            if(axesReady)","            {","                this.draw();","            }","        });","        this._visibleChangeHandle = this.after(\"visibleChange\", this._handleVisibleChange);","    },","","    /**","     * Event handler for the xAxisChange event.","     *","     * @method _xAxisChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _xAxisChangeHandler: function(e)","    {","        var xAxis = this.get(\"xAxis\");","        xAxis.after(\"dataReady\", Y.bind(this._xDataChangeHandler, this));","        xAxis.after(\"dataUpdate\", Y.bind(this._xDataChangeHandler, this));","    },","","    /**","     * Event handler the yAxisChange event.","     *","     * @method _yAxisChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _yAxisChangeHandler: function(e)","    {","        var yAxis = this.get(\"yAxis\");","        yAxis.after(\"dataReady\", Y.bind(this._yDataChangeHandler, this));","        yAxis.after(\"dataUpdate\", Y.bind(this._yDataChangeHandler, this));","    },","","    /**","     * Constant used to generate unique id.","     *","     * @property GUID","     * @type String","     * @private","     */","    GUID: \"yuicartesianseries\",","","    /**","     * Event handler for xDataChange event.","     *","     * @method _xDataChangeHandler","     * @param {Object} event Event object.","     * @private","     */","    _xDataChangeHandler: function(event)","    {","        var axesReady = this._updateAxisBase();","        if(axesReady)","        {","            this.draw();","        }","    },","","    /**","     * Event handler for yDataChange event.","     *","     * @method _yDataChangeHandler","     * @param {Object} event Event object.","     * @private","     */","    _yDataChangeHandler: function(event)","    {","        var axesReady = this._updateAxisBase();","        if(axesReady)","        {","            this.draw();","        }","    },","","    /**","     * Checks to ensure that both xAxis and yAxis data are available. If so, set the `xData` and `yData` attributes","     * and return `true`. Otherwise, return `false`.","     *","     * @method _updateAxisBase","     * @return Boolean","     * @private","     */","    _updateAxisBase: function()","    {","        var xAxis = this.get(\"xAxis\"),","            yAxis = this.get(\"yAxis\"),","            xKey = this.get(\"xKey\"),","            yKey = this.get(\"yKey\"),","            yData,","            xData;","        if(!xAxis || !yAxis || !xKey || !yKey)","        {","            return false;","        }","        xData = xAxis.getDataByKey(xKey);","        yData = yAxis.getDataByKey(yKey);","        if(!xData || !yData)","        {","            return false;","        }","        this.set(\"xData\", xData.concat());","        this.set(\"yData\", yData.concat());","        return true;","    },","","    /**","     * Draws the series is the xAxis and yAxis data are both available.","     *","     * @method validate","     * @private","     */","    validate: function()","    {","        if((this.get(\"xData\") && this.get(\"yData\")) || this._updateAxisBase())","        {","            this.draw();","        }","        else","        {","            this.fire(\"drawingComplete\");","        }","    },","","    /**","     * Creates a `Graphic` instance.","     *","     * @method _setCanvas","     * @protected","     */","    _setCanvas: function()","    {","        var graph = this.get(\"graph\"),","            graphic = graph.get(\"graphic\");","        this.set(\"graphic\", graphic);","    },","","    /**","     * Calculates the coordinates for the series.","     *","     * @method setAreaData","     * @protected","     */","    setAreaData: function()","    {","        var isNumber = Y_Lang.isNumber,","            nextX, nextY,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            xAxis = this.get(\"xAxis\"),","            yAxis = this.get(\"yAxis\"),","            xData = this.get(\"xData\").concat(),","            yData = this.get(\"yData\").concat(),","            xValue,","            yValue,","            xOffset = xAxis.getEdgeOffset(xData.length, w),","            yOffset = yAxis.getEdgeOffset(yData.length, h),","            padding = this.get(\"styles\").padding,","			leftPadding = padding.left,","			topPadding = padding.top,","			dataWidth = w - (leftPadding + padding.right + xOffset),","			dataHeight = h - (topPadding + padding.bottom + yOffset),","			xcoords = [],","			ycoords = [],","			xMax = xAxis.get(\"maximum\"),","			xMin = xAxis.get(\"minimum\"),","			yMax = yAxis.get(\"maximum\"),","			yMin = yAxis.get(\"minimum\"),","            xScaleFactor = dataWidth / (xMax - xMin),","			yScaleFactor = dataHeight / (yMax - yMin),","            dataLength,","            direction = this.get(\"direction\"),","            i = 0,","            xMarkerPlane = [],","            yMarkerPlane = [],","            xMarkerPlaneOffset = this.get(\"xMarkerPlaneOffset\"),","            yMarkerPlaneOffset = this.get(\"yMarkerPlaneOffset\"),","            graphic = this.get(\"graphic\");","        graphic.set(\"width\", w);","        graphic.set(\"height\", h);","        dataLength = xData.length;","        xOffset *= 0.5;","        yOffset *= 0.5;","        //Assuming a vertical graph has a range/category for its vertical axis.","        if(direction === \"vertical\")","        {","            yData = yData.reverse();","        }","        this._leftOrigin = Math.round(((0 - xMin) * xScaleFactor) + leftPadding + xOffset);","        this._bottomOrigin = Math.round((dataHeight + topPadding + yOffset));","        if(yMin < 0)","        {","            this._bottomOrigin = this._bottomOrigin - ((0 - yMin) * yScaleFactor);","        }","        for (; i < dataLength; ++i)","		{","            xValue = parseFloat(xData[i]);","            yValue = parseFloat(yData[i]);","            if(isNumber(xValue))","            {","                nextX = (((xValue - xMin) * xScaleFactor) + leftPadding + xOffset);","            }","            else","            {","                nextX = NaN;","            }","            if(isNumber(yValue))","            {","			    nextY = ((dataHeight + topPadding + yOffset) - (yValue - yMin) * yScaleFactor);","            }","            else","            {","                nextY = NaN;","            }","            xcoords.push(nextX);","            ycoords.push(nextY);","            xMarkerPlane.push({start:nextX - xMarkerPlaneOffset, end: nextX + xMarkerPlaneOffset});","            yMarkerPlane.push({start:nextY - yMarkerPlaneOffset, end: nextY + yMarkerPlaneOffset});","        }","        this.set(\"xcoords\", xcoords);","		this.set(\"ycoords\", ycoords);","        this.set(\"xMarkerPlane\", xMarkerPlane);","        this.set(\"yMarkerPlane\", yMarkerPlane);","        this._dataLength = dataLength;","    },","","    /**","     * Finds the first valid index of an array coordinates.","     *","     * @method _getFirstValidIndex","     * @param {Array} coords An array of x or y coordinates.","     * @return Number","     * @private","     */","    _getFirstValidIndex: function(coords)","    {","        var coord,","            i = -1,","            limit = coords.length;","        while(!Y_Lang.isNumber(coord) && i < limit)","        {","            i += 1;","            coord = coords[i];","        }","        return i;","    },","","    /**","     * Finds the last valid index of an array coordinates.","     *","     * @method _getLastValidIndex","     * @param {Array} coords An array of x or y coordinates.","     * @return Number","     * @private","     */","    _getLastValidIndex: function(coords)","    {","        var coord,","            i = coords.length,","            limit = -1;","        while(!Y_Lang.isNumber(coord) && i > limit)","        {","            i -= 1;","            coord = coords[i];","        }","        return i;","    },","","    /**","     * Draws the series.","     *","     * @method draw","     * @protected","     */","    draw: function()","    {","        var w = this.get(\"width\"),","            h = this.get(\"height\");","        if(this.get(\"rendered\"))","        {","            if((isFinite(w) && isFinite(h) && w > 0 && h > 0) && ((this.get(\"xData\") && this.get(\"yData\")) || this._updateAxisBase()))","            {","                if(this._drawing)","                {","                    this._callLater = true;","                    return;","                }","                this._drawing = true;","                this._callLater = false;","                this.setAreaData();","                if(this.get(\"xcoords\") && this.get(\"ycoords\"))","                {","                    this.drawSeries();","                }","                this._drawing = false;","                if(this._callLater)","                {","                    this.draw();","                }","                else","                {","                    this._toggleVisible(this.get(\"visible\"));","                    this.fire(\"drawingComplete\");","                }","            }","        }","    },","","    /**","     * Default value for plane offsets when the parent chart's `interactiveType` is `planar`.","     *","     * @property _defaultPlaneOffset","     * @type Number","     * @private","     */","    _defaultPlaneOffset: 4,","","    /**","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     * @protected","     */","    _getDefaultStyles: function()","    {","        return {padding:{","                top: 0,","                left: 0,","                right: 0,","                bottom: 0","            }};","    },","","    /**","     * Collection of default colors used for lines in a series when not specified by user.","     *","     * @property _defaultLineColors","     * @type Array","     * @protected","     */","    _defaultLineColors:[\"#426ab3\", \"#d09b2c\", \"#000000\", \"#b82837\", \"#b384b5\", \"#ff7200\", \"#779de3\", \"#cbc8ba\", \"#7ed7a6\", \"#007a6c\"],","","    /**","     * Collection of default colors used for marker fills in a series when not specified by user.","     *","     * @property _defaultFillColors","     * @type Array","     * @protected","     */","    _defaultFillColors:[\"#6084d0\", \"#eeb647\", \"#6c6b5f\", \"#d6484f\", \"#ce9ed1\", \"#ff9f3b\", \"#93b7ff\", \"#e0ddd0\", \"#94ecba\", \"#309687\"],","","    /**","     * Collection of default colors used for marker borders in a series when not specified by user.","     *","     * @property _defaultBorderColors","     * @type Array","     * @protected","     */","    _defaultBorderColors:[\"#205096\", \"#b38206\", \"#000000\", \"#94001e\", \"#9d6fa0\", \"#e55b00\", \"#5e85c9\", \"#adab9e\", \"#6ac291\", \"#006457\"],","","    /**","     * Collection of default colors used for area fills, histogram fills and pie fills in a series when not specified by user.","     *","     * @property _defaultSliceColors","     * @type Array","     * @protected","     */","    _defaultSliceColors: [\"#66007f\", \"#a86f41\", \"#295454\", \"#996ab2\", \"#e8cdb7\", \"#90bdbd\",\"#000000\",\"#c3b8ca\", \"#968373\", \"#678585\"],","","    /**","     * Parses a color based on a series order and type.","     *","     * @method _getDefaultColor","     * @param {Number} index Index indicating the series order.","     * @param {String} type Indicates which type of object needs the color.","     * @return String","     * @protected","     */","    _getDefaultColor: function(index, type)","    {","        var colors = {","                line: this._defaultLineColors,","                fill: this._defaultFillColors,","                border: this._defaultBorderColors,","                slice: this._defaultSliceColors","            },","            col = colors[type] || colors.fill,","            l = col.length;","        index = index || 0;","        if(index >= l)","        {","            index = index % l;","        }","        type = type || \"fill\";","        return colors[type][index];","    },","","    /**","     * Shows/hides contents of the series.","     *","     * @method _handleVisibleChange","     * @param {Object} e Event object.","     * @protected","     */","    _handleVisibleChange: function(e)","    {","        this._toggleVisible(this.get(\"visible\"));","    },","","    /**","     * Returns the sum of all values for the series.","     *","     * @method getTotalValues","     * @return Number","     */","    getTotalValues: function()","    {","        var valueCoord = this.get(\"direction\") === \"vertical\" ? \"x\" : \"y\",","            total = this.get(valueCoord + \"Axis\").getTotalByKey(this.get(valueCoord + \"Key\"));","        return total;","    },","","    /**","     * Destructor implementation for the CartesianSeries class. Calls destroy on all Graphic instances.","     *","     * @method destructor","     * @protected","     */","    destructor: function()","    {","        var marker,","            markers = this.get(\"markers\");","        if(this.get(\"rendered\"))","        {","            if(this._xDataReadyHandle)","            {","                this._xDataReadyHandle.detach();","            }","            if(this._xDataUpdateHandle)","            {","                this._xDataUpdateHandle.detach();","            }","            if(this._yDataReadyHandle)","            {","                this._yDataReadyHandle.detach();","            }","            if(this._yDataUpdateHandle)","            {","                this._yDataUpdateHandle.detach();","            }","            this._xAxisChangeHandle.detach();","            this._yAxisChangeHandle.detach();","            this._stylesChangeHandle.detach();","            this._widthChangeHandle.detach();","            this._heightChangeHandle.detach();","            this._visibleChangeHandle.detach();","        }","        while(markers && markers.length > 0)","        {","            marker = markers.shift();","            if(marker && marker instanceof Y.Shape)","            {","                marker.destroy();","            }","        }","        if(this._path)","        {","            this._path.destroy();","            this._path = null;","        }","        if(this._lineGraphic)","        {","            this._lineGraphic.destroy();","            this._lineGraphic = null;","        }","        if(this._groupMarker)","        {","            this._groupMarker.destroy();","            this._groupMarker = null;","        }","    },","","    /**","     * Returns a reference to the parent container to which all chart elements are contained. When the series is bound to a `Chart` instance, the `Chart` instance is","     * the reference. If nothing is set as the `chart` attribute, the `_getChart` method will return a reference to the `graphic` attribute.","     *","     * @method _getChart","     * @return {Object}","     * @private ","     */","    _getChart:function() {","        var chart,","            graph = this.get(\"graph\");","        if(graph)","        {","            chart = graph.get(\"chart\");","        }","        if(!chart) ","        {","            chart = this.get(\"graphic\");","        }","        return chart;","    }","        /**","         * Event handle for the x-axis' dataReady event.","         *","         * @property _xDataReadyHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the x-axis dataUpdate event.","         *","         * @property _xDataUpdateHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the y-axis dataReady event.","         *","         * @property _yDataReadyHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the y-axis dataUpdate event.","         * @property _yDataUpdateHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the xAxisChange event.","         * @property _xAxisChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the yAxisChange event.","         * @property _yAxisChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the stylesChange event.","         * @property _stylesChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the widthChange event.","         * @property _widthChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the heightChange event.","         * @property _heightChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the visibleChange event.","         * @property _visibleChangeHandle","         * @type {EventHandle}","         * @private","         */","}, {","    ATTRS: {","        /**","         * An array of all series of the same type used within a chart application.","         *","         * @attribute seriesTypeCollection","         * @type Array","         */","        seriesTypeCollection: {},","        ","        /**","         * Name used for for displaying data related to the x-coordinate.","         *","         * @attribute xDisplayName","         * @type String","         */","        xDisplayName: {","            getter: function()","            {","                return this._xDisplayName || this.get(\"xKey\");","            },","","            setter: function(val)","            {","                this._xDisplayName = val.toString();","                return val;","            }","        },","","        /**","         * Name used for for displaying data related to the y-coordinate.","         *","         * @attribute yDisplayName","         * @type String","         */","        yDisplayName: {","            getter: function()","            {","                return this._yDisplayName || this.get(\"yKey\");","            },","","            setter: function(val)","            {","                this._yDisplayName = val.toString();","                return val;","            }","        },","","        /**","         * Name used for for displaying category data","         *","         * @attribute categoryDisplayName","         * @type String","         * @readOnly","         */","        categoryDisplayName: {","            lazyAdd: false,","","            getter: function()","            {","                return this.get(\"direction\") == \"vertical\" ? this.get(\"yDisplayName\") : this.get(\"xDisplayName\");","           },","","            setter: function(val)","            {","                if(this.get(\"direction\") == \"vertical\")","                {","                    this._yDisplayName = val;","                }","                else","                {","                    this._xDisplayName = val;","                }","                return val;","            }","        },","","        /**","         * Name used for for displaying value data","         *","         * @attribute valueDisplayName","         * @type String","         * @readOnly","         */","        valueDisplayName: {","            lazyAdd: false,","","            getter: function()","            {","                return this.get(\"direction\") == \"vertical\" ? this.get(\"xDisplayName\") : this.get(\"yDisplayName\");","            },","","            setter: function(val)","            {","                if(this.get(\"direction\") == \"vertical\")","                {","                    this._xDisplayName = val;","                }","                else","                {","                    this._yDisplayName = val;","                }","                return val;","            }","        },","","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default cartesian","         */","        type: {","            value: \"cartesian\"","        },","","        /**","         * Order of this instance of this `type`.","         *","         * @attribute order","         * @type Number","         */","        order: {},","","        /**","         * Order of the instance","         *","         * @attribute graphOrder","         * @type Number","         */","        graphOrder: {},","","        /**","         * x coordinates for the series.","         *","         * @attribute xcoords","         * @type Array","         */","        xcoords: {},","","        /**","         * y coordinates for the series","         *","         * @attribute ycoords","         * @type Array","         */","        ycoords: {},","","        /**","         * Reference to the `Chart` application. If no `Chart` application is present, a reference to the `Graphic` instance that","         * the series is drawn into will be returned.","         *","         * @attribute chart","         * @type ChartBase","         */","        chart: {","            getter: function()","            {","                var chart,","                    graph = this.get(\"graph\");","                if(graph)","                {","                    chart = graph.get(\"chart\");","                }","                return chart;","            }","        },","","        /**","         * Reference to the `Graph` in which the series is drawn into.","         *","         * @attribute graph","         * @type Graph","         */","        graph: {},","","        /**","         * Reference to the `Axis` instance used for assigning","         * x-values to the graph.","         *","         * @attribute xAxis","         * @type Axis","         */","        xAxis: {},","","        /**","         * Reference to the `Axis` instance used for assigning","         * y-values to the graph.","         *","         * @attribute yAxis","         * @type Axis","         */","        yAxis: {},","","        /**","         * Indicates which array to from the hash of value arrays in","         * the x-axis `Axis` instance.","         *","         * @attribute xKey","         * @type String","         */","        xKey: {","            setter: function(val)","            {","                return val.toString();","            }","        },","","        /**","         * Indicates which array to from the hash of value arrays in","         * the y-axis `Axis` instance.","         *","         * @attribute yKey","         * @type String","         */","        yKey: {","            setter: function(val)","            {","                return val.toString();","            }","        },","","        /**","         * Array of x values for the series.","         *","         * @attribute xData","         * @type Array","         */","        xData: {},","","        /**","         * Array of y values for the series.","         *","         * @attribute yData","         * @type Array","         */","        yData: {},","","        /**","         * Indicates whether the Series has been through its initial set up.","         *","         * @attribute rendered","         * @type Boolean","         */","        rendered: {","            value: false","        },","","        /*","         * Returns the width of the parent graph","         *","         * @attribute width","         * @type Number","         */","        width: {","            readOnly: true,","","            getter: function()","            {","                return this.get(\"graphic\").get(\"width\");","            }","        },","","        /**","         * Returns the height of the parent graph","         *","         * @attribute height","         * @type Number","         */","        height: {","            readOnly: true,","","            getter: function()","            {","                return this.get(\"graphic\").get(\"height\");","            }","        },","","        /**","         * Indicates whether to show the series","         *","         * @attribute visible","         * @type Boolean","         * @default true","         */","        visible: {","            value: true","        },","","        /**","         * Collection of area maps along the xAxis. Used to determine mouseover for multiple","         * series.","         *","         * @attribute xMarkerPlane","         * @type Array","         */","        xMarkerPlane: {},","","        /**","         * Collection of area maps along the yAxis. Used to determine mouseover for multiple","         * series.","         *","         * @attribute yMarkerPlane","         * @type Array","         */","        yMarkerPlane: {},","","        /**","         * Distance from a data coordinate to the left/right for setting a hotspot.","         *","         * @attribute xMarkerPlaneOffset","         * @type Number","         */","        xMarkerPlaneOffset: {","            getter: function() {","                var marker = this.get(\"styles\").marker;","                if(marker && marker.width && isFinite(marker.width))","                {","                    return marker.width * 0.5;","                }","                return this._defaultPlaneOffset;","            }","        },","","        /**","         * Distance from a data coordinate to the top/bottom for setting a hotspot.","         *","         * @attribute yMarkerPlaneOffset","         * @type Number","         */","        yMarkerPlaneOffset: {","            getter: function() {","                var marker = this.get(\"styles\").marker;","                if(marker && marker.height && isFinite(marker.height))","                {","                    return marker.height * 0.5;","                }","                return this._defaultPlaneOffset;","            }","        },","","        /**","         * Direction of the series","         *","         * @attribute direction","         * @type String","         */","        direction: {","            value: \"horizontal\"","        },","","        /**","         * Indicates whether or not markers for a series will be grouped and rendered in a single complex shape instance.","         *","         * @attribute groupMarkers","         * @type Boolean","         */","        groupMarkers: {","            getter: function()","            {","                var graph,","                    groupMarkers = this._groupMarkers;","                if(!groupMarkers) {","                    graph = this.get(\"graph\");","                    if(graph) ","                    {","                        groupMarkers = graph.get(\"groupMarkers\");","                    }","                }","                return groupMarkers;","            },","","            setter: function(val)","            {","                this._groupMarkers = val;","                return val;","            }","        }","    }","});","","","}, '@VERSION@', {\"requires\": [\"graphics\", \"axis-base\"]});"];
_yuitest_coverage["build/series-base/series-base.js"].lines = {"1":0,"9":0,"21":0,"64":0,"65":0,"66":0,"67":0,"78":0,"80":0,"82":0,"83":0,"85":0,"87":0,"88":0,"90":0,"91":0,"92":0,"93":0,"94":0,"96":0,"99":0,"100":0,"101":0,"103":0,"106":0,"107":0,"108":0,"110":0,"113":0,"125":0,"126":0,"127":0,"139":0,"140":0,"141":0,"162":0,"163":0,"165":0,"178":0,"179":0,"181":0,"195":0,"201":0,"203":0,"205":0,"206":0,"207":0,"209":0,"211":0,"212":0,"213":0,"224":0,"226":0,"230":0,"242":0,"244":0,"255":0,"288":0,"289":0,"290":0,"291":0,"292":0,"294":0,"296":0,"298":0,"299":0,"300":0,"302":0,"304":0,"306":0,"307":0,"308":0,"310":0,"314":0,"316":0,"318":0,"322":0,"324":0,"325":0,"326":0,"327":0,"329":0,"330":0,"331":0,"332":0,"333":0,"346":0,"349":0,"351":0,"352":0,"354":0,"367":0,"370":0,"372":0,"373":0,"375":0,"386":0,"388":0,"390":0,"392":0,"394":0,"395":0,"397":0,"398":0,"399":0,"400":0,"402":0,"404":0,"405":0,"407":0,"411":0,"412":0,"437":0,"492":0,"500":0,"501":0,"503":0,"505":0,"506":0,"518":0,"529":0,"531":0,"542":0,"544":0,"546":0,"548":0,"550":0,"552":0,"554":0,"556":0,"558":0,"560":0,"562":0,"563":0,"564":0,"565":0,"566":0,"567":0,"569":0,"571":0,"572":0,"574":0,"577":0,"579":0,"580":0,"582":0,"584":0,"585":0,"587":0,"589":0,"590":0,"603":0,"605":0,"607":0,"609":0,"611":0,"613":0,"706":0,"711":0,"712":0,"725":0,"730":0,"731":0,"747":0,"752":0,"754":0,"758":0,"760":0,"776":0,"781":0,"783":0,"787":0,"789":0,"846":0,"848":0,"850":0,"852":0,"892":0,"906":0,"947":0,"962":0,"1003":0,"1004":0,"1006":0,"1008":0,"1020":0,"1021":0,"1023":0,"1025":0,"1048":0,"1050":0,"1051":0,"1052":0,"1054":0,"1057":0,"1062":0,"1063":0};
_yuitest_coverage["build/series-base/series-base.js"].functions = {"render:62":0,"(anonymous 2):92":0,"(anonymous 3):99":0,"(anonymous 4):106":0,"addListeners:76":0,"_xAxisChangeHandler:123":0,"_yAxisChangeHandler:137":0,"_xDataChangeHandler:160":0,"_yDataChangeHandler:176":0,"_updateAxisBase:193":0,"validate:222":0,"_setCanvas:240":0,"setAreaData:253":0,"_getFirstValidIndex:344":0,"_getLastValidIndex:365":0,"draw:384":0,"_getDefaultStyles:435":0,"_getDefaultColor:490":0,"_handleVisibleChange:516":0,"getTotalValues:527":0,"destructor:540":0,"_getChart:602":0,"getter:704":0,"setter:709":0,"getter:723":0,"setter:728":0,"getter:745":0,"setter:750":0,"getter:774":0,"setter:779":0,"getter:844":0,"setter:890":0,"setter:904":0,"getter:945":0,"getter:960":0,"getter:1002":0,"getter:1019":0,"getter:1046":0,"setter:1060":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-base/series-base.js"].coveredLines = 197;
_yuitest_coverage["build/series-base/series-base.js"].coveredFunctions = 40;
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
this.set("rendered", true);
        _yuitest_coverline("build/series-base/series-base.js", 67);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "addListeners", 76);
_yuitest_coverline("build/series-base/series-base.js", 78);
var xAxis = this.get("xAxis"),
            yAxis = this.get("yAxis");
        _yuitest_coverline("build/series-base/series-base.js", 80);
if(xAxis)
        {
            _yuitest_coverline("build/series-base/series-base.js", 82);
this._xDataReadyHandle = xAxis.after("dataReady", Y.bind(this._xDataChangeHandler, this));
            _yuitest_coverline("build/series-base/series-base.js", 83);
this._xDataUpdateHandle = xAxis.after("dataUpdate", Y.bind(this._xDataChangeHandler, this));
        }
        _yuitest_coverline("build/series-base/series-base.js", 85);
if(yAxis)
        {
            _yuitest_coverline("build/series-base/series-base.js", 87);
this._yDataReadyHandle = yAxis.after("dataReady", Y.bind(this._yDataChangeHandler, this));
            _yuitest_coverline("build/series-base/series-base.js", 88);
this._yDataUpdateHandle = yAxis.after("dataUpdate", Y.bind(this._yDataChangeHandler, this));
        }
        _yuitest_coverline("build/series-base/series-base.js", 90);
this._xAxisChangeHandle = this.after("xAxisChange", this._xAxisChangeHandler);
        _yuitest_coverline("build/series-base/series-base.js", 91);
this._yAxisChangeHandle = this.after("yAxisChange", this._yAxisChangeHandler);
        _yuitest_coverline("build/series-base/series-base.js", 92);
this._stylesChangeHandle = this.after("stylesChange", function(e) {
            _yuitest_coverfunc("build/series-base/series-base.js", "(anonymous 2)", 92);
_yuitest_coverline("build/series-base/series-base.js", 93);
var axesReady = this._updateAxisBase();
            _yuitest_coverline("build/series-base/series-base.js", 94);
if(axesReady)
            {
                _yuitest_coverline("build/series-base/series-base.js", 96);
this.draw();
            }
        });
        _yuitest_coverline("build/series-base/series-base.js", 99);
this._widthChangeHandle = this.after("widthChange", function(e) {
            _yuitest_coverfunc("build/series-base/series-base.js", "(anonymous 3)", 99);
_yuitest_coverline("build/series-base/series-base.js", 100);
var axesReady = this._updateAxisBase();
            _yuitest_coverline("build/series-base/series-base.js", 101);
if(axesReady)
            {
                _yuitest_coverline("build/series-base/series-base.js", 103);
this.draw();
            }
        });
        _yuitest_coverline("build/series-base/series-base.js", 106);
this._heightChangeHandle = this.after("heightChange", function(e) {
            _yuitest_coverfunc("build/series-base/series-base.js", "(anonymous 4)", 106);
_yuitest_coverline("build/series-base/series-base.js", 107);
var axesReady = this._updateAxisBase();
            _yuitest_coverline("build/series-base/series-base.js", 108);
if(axesReady)
            {
                _yuitest_coverline("build/series-base/series-base.js", 110);
this.draw();
            }
        });
        _yuitest_coverline("build/series-base/series-base.js", 113);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "_xAxisChangeHandler", 123);
_yuitest_coverline("build/series-base/series-base.js", 125);
var xAxis = this.get("xAxis");
        _yuitest_coverline("build/series-base/series-base.js", 126);
xAxis.after("dataReady", Y.bind(this._xDataChangeHandler, this));
        _yuitest_coverline("build/series-base/series-base.js", 127);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "_yAxisChangeHandler", 137);
_yuitest_coverline("build/series-base/series-base.js", 139);
var yAxis = this.get("yAxis");
        _yuitest_coverline("build/series-base/series-base.js", 140);
yAxis.after("dataReady", Y.bind(this._yDataChangeHandler, this));
        _yuitest_coverline("build/series-base/series-base.js", 141);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "_xDataChangeHandler", 160);
_yuitest_coverline("build/series-base/series-base.js", 162);
var axesReady = this._updateAxisBase();
        _yuitest_coverline("build/series-base/series-base.js", 163);
if(axesReady)
        {
            _yuitest_coverline("build/series-base/series-base.js", 165);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "_yDataChangeHandler", 176);
_yuitest_coverline("build/series-base/series-base.js", 178);
var axesReady = this._updateAxisBase();
        _yuitest_coverline("build/series-base/series-base.js", 179);
if(axesReady)
        {
            _yuitest_coverline("build/series-base/series-base.js", 181);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "_updateAxisBase", 193);
_yuitest_coverline("build/series-base/series-base.js", 195);
var xAxis = this.get("xAxis"),
            yAxis = this.get("yAxis"),
            xKey = this.get("xKey"),
            yKey = this.get("yKey"),
            yData,
            xData;
        _yuitest_coverline("build/series-base/series-base.js", 201);
if(!xAxis || !yAxis || !xKey || !yKey)
        {
            _yuitest_coverline("build/series-base/series-base.js", 203);
return false;
        }
        _yuitest_coverline("build/series-base/series-base.js", 205);
xData = xAxis.getDataByKey(xKey);
        _yuitest_coverline("build/series-base/series-base.js", 206);
yData = yAxis.getDataByKey(yKey);
        _yuitest_coverline("build/series-base/series-base.js", 207);
if(!xData || !yData)
        {
            _yuitest_coverline("build/series-base/series-base.js", 209);
return false;
        }
        _yuitest_coverline("build/series-base/series-base.js", 211);
this.set("xData", xData.concat());
        _yuitest_coverline("build/series-base/series-base.js", 212);
this.set("yData", yData.concat());
        _yuitest_coverline("build/series-base/series-base.js", 213);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "validate", 222);
_yuitest_coverline("build/series-base/series-base.js", 224);
if((this.get("xData") && this.get("yData")) || this._updateAxisBase())
        {
            _yuitest_coverline("build/series-base/series-base.js", 226);
this.draw();
        }
        else
        {
            _yuitest_coverline("build/series-base/series-base.js", 230);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "_setCanvas", 240);
_yuitest_coverline("build/series-base/series-base.js", 242);
var graph = this.get("graph"),
            graphic = graph.get("graphic");
        _yuitest_coverline("build/series-base/series-base.js", 244);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "setAreaData", 253);
_yuitest_coverline("build/series-base/series-base.js", 255);
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
        _yuitest_coverline("build/series-base/series-base.js", 288);
graphic.set("width", w);
        _yuitest_coverline("build/series-base/series-base.js", 289);
graphic.set("height", h);
        _yuitest_coverline("build/series-base/series-base.js", 290);
dataLength = xData.length;
        _yuitest_coverline("build/series-base/series-base.js", 291);
xOffset *= 0.5;
        _yuitest_coverline("build/series-base/series-base.js", 292);
yOffset *= 0.5;
        //Assuming a vertical graph has a range/category for its vertical axis.
        _yuitest_coverline("build/series-base/series-base.js", 294);
if(direction === "vertical")
        {
            _yuitest_coverline("build/series-base/series-base.js", 296);
yData = yData.reverse();
        }
        _yuitest_coverline("build/series-base/series-base.js", 298);
this._leftOrigin = Math.round(((0 - xMin) * xScaleFactor) + leftPadding + xOffset);
        _yuitest_coverline("build/series-base/series-base.js", 299);
this._bottomOrigin = Math.round((dataHeight + topPadding + yOffset));
        _yuitest_coverline("build/series-base/series-base.js", 300);
if(yMin < 0)
        {
            _yuitest_coverline("build/series-base/series-base.js", 302);
this._bottomOrigin = this._bottomOrigin - ((0 - yMin) * yScaleFactor);
        }
        _yuitest_coverline("build/series-base/series-base.js", 304);
for (; i < dataLength; ++i)
		{
            _yuitest_coverline("build/series-base/series-base.js", 306);
xValue = parseFloat(xData[i]);
            _yuitest_coverline("build/series-base/series-base.js", 307);
yValue = parseFloat(yData[i]);
            _yuitest_coverline("build/series-base/series-base.js", 308);
if(isNumber(xValue))
            {
                _yuitest_coverline("build/series-base/series-base.js", 310);
nextX = (((xValue - xMin) * xScaleFactor) + leftPadding + xOffset);
            }
            else
            {
                _yuitest_coverline("build/series-base/series-base.js", 314);
nextX = NaN;
            }
            _yuitest_coverline("build/series-base/series-base.js", 316);
if(isNumber(yValue))
            {
			    _yuitest_coverline("build/series-base/series-base.js", 318);
nextY = ((dataHeight + topPadding + yOffset) - (yValue - yMin) * yScaleFactor);
            }
            else
            {
                _yuitest_coverline("build/series-base/series-base.js", 322);
nextY = NaN;
            }
            _yuitest_coverline("build/series-base/series-base.js", 324);
xcoords.push(nextX);
            _yuitest_coverline("build/series-base/series-base.js", 325);
ycoords.push(nextY);
            _yuitest_coverline("build/series-base/series-base.js", 326);
xMarkerPlane.push({start:nextX - xMarkerPlaneOffset, end: nextX + xMarkerPlaneOffset});
            _yuitest_coverline("build/series-base/series-base.js", 327);
yMarkerPlane.push({start:nextY - yMarkerPlaneOffset, end: nextY + yMarkerPlaneOffset});
        }
        _yuitest_coverline("build/series-base/series-base.js", 329);
this.set("xcoords", xcoords);
		_yuitest_coverline("build/series-base/series-base.js", 330);
this.set("ycoords", ycoords);
        _yuitest_coverline("build/series-base/series-base.js", 331);
this.set("xMarkerPlane", xMarkerPlane);
        _yuitest_coverline("build/series-base/series-base.js", 332);
this.set("yMarkerPlane", yMarkerPlane);
        _yuitest_coverline("build/series-base/series-base.js", 333);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "_getFirstValidIndex", 344);
_yuitest_coverline("build/series-base/series-base.js", 346);
var coord,
            i = -1,
            limit = coords.length;
        _yuitest_coverline("build/series-base/series-base.js", 349);
while(!Y_Lang.isNumber(coord) && i < limit)
        {
            _yuitest_coverline("build/series-base/series-base.js", 351);
i += 1;
            _yuitest_coverline("build/series-base/series-base.js", 352);
coord = coords[i];
        }
        _yuitest_coverline("build/series-base/series-base.js", 354);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "_getLastValidIndex", 365);
_yuitest_coverline("build/series-base/series-base.js", 367);
var coord,
            i = coords.length,
            limit = -1;
        _yuitest_coverline("build/series-base/series-base.js", 370);
while(!Y_Lang.isNumber(coord) && i > limit)
        {
            _yuitest_coverline("build/series-base/series-base.js", 372);
i -= 1;
            _yuitest_coverline("build/series-base/series-base.js", 373);
coord = coords[i];
        }
        _yuitest_coverline("build/series-base/series-base.js", 375);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "draw", 384);
_yuitest_coverline("build/series-base/series-base.js", 386);
var w = this.get("width"),
            h = this.get("height");
        _yuitest_coverline("build/series-base/series-base.js", 388);
if(this.get("rendered"))
        {
            _yuitest_coverline("build/series-base/series-base.js", 390);
if((isFinite(w) && isFinite(h) && w > 0 && h > 0) && ((this.get("xData") && this.get("yData")) || this._updateAxisBase()))
            {
                _yuitest_coverline("build/series-base/series-base.js", 392);
if(this._drawing)
                {
                    _yuitest_coverline("build/series-base/series-base.js", 394);
this._callLater = true;
                    _yuitest_coverline("build/series-base/series-base.js", 395);
return;
                }
                _yuitest_coverline("build/series-base/series-base.js", 397);
this._drawing = true;
                _yuitest_coverline("build/series-base/series-base.js", 398);
this._callLater = false;
                _yuitest_coverline("build/series-base/series-base.js", 399);
this.setAreaData();
                _yuitest_coverline("build/series-base/series-base.js", 400);
if(this.get("xcoords") && this.get("ycoords"))
                {
                    _yuitest_coverline("build/series-base/series-base.js", 402);
this.drawSeries();
                }
                _yuitest_coverline("build/series-base/series-base.js", 404);
this._drawing = false;
                _yuitest_coverline("build/series-base/series-base.js", 405);
if(this._callLater)
                {
                    _yuitest_coverline("build/series-base/series-base.js", 407);
this.draw();
                }
                else
                {
                    _yuitest_coverline("build/series-base/series-base.js", 411);
this._toggleVisible(this.get("visible"));
                    _yuitest_coverline("build/series-base/series-base.js", 412);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "_getDefaultStyles", 435);
_yuitest_coverline("build/series-base/series-base.js", 437);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "_getDefaultColor", 490);
_yuitest_coverline("build/series-base/series-base.js", 492);
var colors = {
                line: this._defaultLineColors,
                fill: this._defaultFillColors,
                border: this._defaultBorderColors,
                slice: this._defaultSliceColors
            },
            col = colors[type] || colors.fill,
            l = col.length;
        _yuitest_coverline("build/series-base/series-base.js", 500);
index = index || 0;
        _yuitest_coverline("build/series-base/series-base.js", 501);
if(index >= l)
        {
            _yuitest_coverline("build/series-base/series-base.js", 503);
index = index % l;
        }
        _yuitest_coverline("build/series-base/series-base.js", 505);
type = type || "fill";
        _yuitest_coverline("build/series-base/series-base.js", 506);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "_handleVisibleChange", 516);
_yuitest_coverline("build/series-base/series-base.js", 518);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "getTotalValues", 527);
_yuitest_coverline("build/series-base/series-base.js", 529);
var valueCoord = this.get("direction") === "vertical" ? "x" : "y",
            total = this.get(valueCoord + "Axis").getTotalByKey(this.get(valueCoord + "Key"));
        _yuitest_coverline("build/series-base/series-base.js", 531);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "destructor", 540);
_yuitest_coverline("build/series-base/series-base.js", 542);
var marker,
            markers = this.get("markers");
        _yuitest_coverline("build/series-base/series-base.js", 544);
if(this.get("rendered"))
        {
            _yuitest_coverline("build/series-base/series-base.js", 546);
if(this._xDataReadyHandle)
            {
                _yuitest_coverline("build/series-base/series-base.js", 548);
this._xDataReadyHandle.detach();
            }
            _yuitest_coverline("build/series-base/series-base.js", 550);
if(this._xDataUpdateHandle)
            {
                _yuitest_coverline("build/series-base/series-base.js", 552);
this._xDataUpdateHandle.detach();
            }
            _yuitest_coverline("build/series-base/series-base.js", 554);
if(this._yDataReadyHandle)
            {
                _yuitest_coverline("build/series-base/series-base.js", 556);
this._yDataReadyHandle.detach();
            }
            _yuitest_coverline("build/series-base/series-base.js", 558);
if(this._yDataUpdateHandle)
            {
                _yuitest_coverline("build/series-base/series-base.js", 560);
this._yDataUpdateHandle.detach();
            }
            _yuitest_coverline("build/series-base/series-base.js", 562);
this._xAxisChangeHandle.detach();
            _yuitest_coverline("build/series-base/series-base.js", 563);
this._yAxisChangeHandle.detach();
            _yuitest_coverline("build/series-base/series-base.js", 564);
this._stylesChangeHandle.detach();
            _yuitest_coverline("build/series-base/series-base.js", 565);
this._widthChangeHandle.detach();
            _yuitest_coverline("build/series-base/series-base.js", 566);
this._heightChangeHandle.detach();
            _yuitest_coverline("build/series-base/series-base.js", 567);
this._visibleChangeHandle.detach();
        }
        _yuitest_coverline("build/series-base/series-base.js", 569);
while(markers && markers.length > 0)
        {
            _yuitest_coverline("build/series-base/series-base.js", 571);
marker = markers.shift();
            _yuitest_coverline("build/series-base/series-base.js", 572);
if(marker && marker instanceof Y.Shape)
            {
                _yuitest_coverline("build/series-base/series-base.js", 574);
marker.destroy();
            }
        }
        _yuitest_coverline("build/series-base/series-base.js", 577);
if(this._path)
        {
            _yuitest_coverline("build/series-base/series-base.js", 579);
this._path.destroy();
            _yuitest_coverline("build/series-base/series-base.js", 580);
this._path = null;
        }
        _yuitest_coverline("build/series-base/series-base.js", 582);
if(this._lineGraphic)
        {
            _yuitest_coverline("build/series-base/series-base.js", 584);
this._lineGraphic.destroy();
            _yuitest_coverline("build/series-base/series-base.js", 585);
this._lineGraphic = null;
        }
        _yuitest_coverline("build/series-base/series-base.js", 587);
if(this._groupMarker)
        {
            _yuitest_coverline("build/series-base/series-base.js", 589);
this._groupMarker.destroy();
            _yuitest_coverline("build/series-base/series-base.js", 590);
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
        _yuitest_coverfunc("build/series-base/series-base.js", "_getChart", 602);
_yuitest_coverline("build/series-base/series-base.js", 603);
var chart,
            graph = this.get("graph");
        _yuitest_coverline("build/series-base/series-base.js", 605);
if(graph)
        {
            _yuitest_coverline("build/series-base/series-base.js", 607);
chart = graph.get("chart");
        }
        _yuitest_coverline("build/series-base/series-base.js", 609);
if(!chart) 
        {
            _yuitest_coverline("build/series-base/series-base.js", 611);
chart = this.get("graphic");
        }
        _yuitest_coverline("build/series-base/series-base.js", 613);
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
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 704);
_yuitest_coverline("build/series-base/series-base.js", 706);
return this._xDisplayName || this.get("xKey");
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 709);
_yuitest_coverline("build/series-base/series-base.js", 711);
this._xDisplayName = val.toString();
                _yuitest_coverline("build/series-base/series-base.js", 712);
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
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 723);
_yuitest_coverline("build/series-base/series-base.js", 725);
return this._yDisplayName || this.get("yKey");
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 728);
_yuitest_coverline("build/series-base/series-base.js", 730);
this._yDisplayName = val.toString();
                _yuitest_coverline("build/series-base/series-base.js", 731);
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
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 745);
_yuitest_coverline("build/series-base/series-base.js", 747);
return this.get("direction") == "vertical" ? this.get("yDisplayName") : this.get("xDisplayName");
           },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 750);
_yuitest_coverline("build/series-base/series-base.js", 752);
if(this.get("direction") == "vertical")
                {
                    _yuitest_coverline("build/series-base/series-base.js", 754);
this._yDisplayName = val;
                }
                else
                {
                    _yuitest_coverline("build/series-base/series-base.js", 758);
this._xDisplayName = val;
                }
                _yuitest_coverline("build/series-base/series-base.js", 760);
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
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 774);
_yuitest_coverline("build/series-base/series-base.js", 776);
return this.get("direction") == "vertical" ? this.get("xDisplayName") : this.get("yDisplayName");
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 779);
_yuitest_coverline("build/series-base/series-base.js", 781);
if(this.get("direction") == "vertical")
                {
                    _yuitest_coverline("build/series-base/series-base.js", 783);
this._xDisplayName = val;
                }
                else
                {
                    _yuitest_coverline("build/series-base/series-base.js", 787);
this._yDisplayName = val;
                }
                _yuitest_coverline("build/series-base/series-base.js", 789);
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
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 844);
_yuitest_coverline("build/series-base/series-base.js", 846);
var chart,
                    graph = this.get("graph");
                _yuitest_coverline("build/series-base/series-base.js", 848);
if(graph)
                {
                    _yuitest_coverline("build/series-base/series-base.js", 850);
chart = graph.get("chart");
                }
                _yuitest_coverline("build/series-base/series-base.js", 852);
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
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 890);
_yuitest_coverline("build/series-base/series-base.js", 892);
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
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 904);
_yuitest_coverline("build/series-base/series-base.js", 906);
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
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 945);
_yuitest_coverline("build/series-base/series-base.js", 947);
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
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 960);
_yuitest_coverline("build/series-base/series-base.js", 962);
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
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 1002);
_yuitest_coverline("build/series-base/series-base.js", 1003);
var marker = this.get("styles").marker;
                _yuitest_coverline("build/series-base/series-base.js", 1004);
if(marker && marker.width && isFinite(marker.width))
                {
                    _yuitest_coverline("build/series-base/series-base.js", 1006);
return marker.width * 0.5;
                }
                _yuitest_coverline("build/series-base/series-base.js", 1008);
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
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 1019);
_yuitest_coverline("build/series-base/series-base.js", 1020);
var marker = this.get("styles").marker;
                _yuitest_coverline("build/series-base/series-base.js", 1021);
if(marker && marker.height && isFinite(marker.height))
                {
                    _yuitest_coverline("build/series-base/series-base.js", 1023);
return marker.height * 0.5;
                }
                _yuitest_coverline("build/series-base/series-base.js", 1025);
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
                _yuitest_coverfunc("build/series-base/series-base.js", "getter", 1046);
_yuitest_coverline("build/series-base/series-base.js", 1048);
var graph,
                    groupMarkers = this._groupMarkers;
                _yuitest_coverline("build/series-base/series-base.js", 1050);
if(!groupMarkers) {
                    _yuitest_coverline("build/series-base/series-base.js", 1051);
graph = this.get("graph");
                    _yuitest_coverline("build/series-base/series-base.js", 1052);
if(graph) 
                    {
                        _yuitest_coverline("build/series-base/series-base.js", 1054);
groupMarkers = graph.get("groupMarkers");
                    }
                }
                _yuitest_coverline("build/series-base/series-base.js", 1057);
return groupMarkers;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-base/series-base.js", "setter", 1060);
_yuitest_coverline("build/series-base/series-base.js", 1062);
this._groupMarkers = val;
                _yuitest_coverline("build/series-base/series-base.js", 1063);
return val;
            }
        }
    }
});


}, '@VERSION@', {"requires": ["graphics", "axis-base"]});
