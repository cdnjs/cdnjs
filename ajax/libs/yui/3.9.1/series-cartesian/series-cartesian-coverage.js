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
_yuitest_coverage["build/series-cartesian/series-cartesian.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-cartesian/series-cartesian.js",
    code: []
};
_yuitest_coverage["build/series-cartesian/series-cartesian.js"].code=["YUI.add('series-cartesian', function (Y, NAME) {","","/**"," * Provides functionality for creating a cartesian chart series."," *"," * @module charts"," * @submodule series-cartesian"," */","var Y_Lang = Y.Lang;","","/**"," * An abstract class for creating series instances with horizontal and vertical axes."," * CartesianSeries provides the core functionality used by the following classes:"," * <ul>"," *      <li>{{#crossLink \"LineSeries\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"MarkerSeries\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"AreaSeries\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"SplineSeries\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"AreaSplineSeries\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"ComboSeries\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"ComboSplineSeries\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"Histogram\"}}{{/crossLink}}</li>"," *  </ul>"," *"," * @class CartesianSeries"," * @extends SeriesBase"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-base"," */","Y.CartesianSeries = Y.Base.create(\"cartesianSeries\", Y.SeriesBase, [], {","    /**","     * Storage for `xDisplayName` attribute.","     *","     * @property _xDisplayName","     * @type String","     * @private","     */","    _xDisplayName: null,","","    /**","     * Storage for `yDisplayName` attribute.","     *","     * @property _yDisplayName","     * @type String","     * @private","     */","    _yDisplayName: null,","","    /**","     * Th x-coordinate for the left edge of the series.","     *","     * @property _leftOrigin","     * @type String","     * @private","     */","    _leftOrigin: null,","","    /**","     * The y-coordinate for the bottom edge of the series.","     *","     * @property _bottomOrigin","     * @type String","     * @private","     */","    _bottomOrigin: null,","","    /**","     * Adds event listeners.","     *","     * @method addListeners","     * @private","     */","    addListeners: function()","    {","        var xAxis = this.get(\"xAxis\"),","            yAxis = this.get(\"yAxis\");","        if(xAxis)","        {","            this._xDataReadyHandle = xAxis.after(\"dataReady\", Y.bind(this._xDataChangeHandler, this));","            this._xDataUpdateHandle = xAxis.after(\"dataUpdate\", Y.bind(this._xDataChangeHandler, this));","        }","        if(yAxis)","        {","            this._yDataReadyHandle = yAxis.after(\"dataReady\", Y.bind(this._yDataChangeHandler, this));","            this._yDataUpdateHandle = yAxis.after(\"dataUpdate\", Y.bind(this._yDataChangeHandler, this));","        }","        this._xAxisChangeHandle = this.after(\"xAxisChange\", this._xAxisChangeHandler);","        this._yAxisChangeHandle = this.after(\"yAxisChange\", this._yAxisChangeHandler);","        this._stylesChangeHandle = this.after(\"stylesChange\", function() {","            var axesReady = this._updateAxisBase();","            if(axesReady)","            {","                this.draw();","            }","        });","        this._widthChangeHandle = this.after(\"widthChange\", function() {","            var axesReady = this._updateAxisBase();","            if(axesReady)","            {","                this.draw();","            }","        });","        this._heightChangeHandle = this.after(\"heightChange\", function() {","            var axesReady = this._updateAxisBase();","            if(axesReady)","            {","                this.draw();","            }","        });","        this._visibleChangeHandle = this.after(\"visibleChange\", this._handleVisibleChange);","    },","","    /**","     * Event handler for the xAxisChange event.","     *","     * @method _xAxisChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _xAxisChangeHandler: function()","    {","        var xAxis = this.get(\"xAxis\");","        xAxis.after(\"dataReady\", Y.bind(this._xDataChangeHandler, this));","        xAxis.after(\"dataUpdate\", Y.bind(this._xDataChangeHandler, this));","    },","","    /**","     * Event handler the yAxisChange event.","     *","     * @method _yAxisChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _yAxisChangeHandler: function()","    {","        var yAxis = this.get(\"yAxis\");","        yAxis.after(\"dataReady\", Y.bind(this._yDataChangeHandler, this));","        yAxis.after(\"dataUpdate\", Y.bind(this._yDataChangeHandler, this));","    },","","    /**","     * Constant used to generate unique id.","     *","     * @property GUID","     * @type String","     * @private","     */","    GUID: \"yuicartesianseries\",","","    /**","     * Event handler for xDataChange event.","     *","     * @method _xDataChangeHandler","     * @param {Object} event Event object.","     * @private","     */","    _xDataChangeHandler: function()","    {","        var axesReady = this._updateAxisBase();","        if(axesReady)","        {","            this.draw();","        }","    },","","    /**","     * Event handler for yDataChange event.","     *","     * @method _yDataChangeHandler","     * @param {Object} event Event object.","     * @private","     */","    _yDataChangeHandler: function()","    {","        var axesReady = this._updateAxisBase();","        if(axesReady)","        {","            this.draw();","        }","    },","","    /**","     * Checks to ensure that both xAxis and yAxis data are available. If so, set the `xData` and `yData` attributes","     * and return `true`. Otherwise, return `false`.","     *","     * @method _updateAxisBase","     * @return Boolean","     * @private","     */","    _updateAxisBase: function()","    {","        var xAxis = this.get(\"xAxis\"),","            yAxis = this.get(\"yAxis\"),","            xKey = this.get(\"xKey\"),","            yKey = this.get(\"yKey\"),","            yData,","            xData,","            xReady,","            yReady,","            ready;","        if(!xAxis || !yAxis || !xKey || !yKey)","        {","            ready = false;","        }","        else","        {","            xData = xAxis.getDataByKey(xKey);","            yData = yAxis.getDataByKey(yKey);","            if(Y_Lang.isArray(xKey))","            {","                xReady = (xData && Y.Object.size(xData) > 0) ? this._checkForDataByKey(xData, xKey) : false;","            }","            else","            {","                xReady = xData ? true : false;","            }","            if(Y_Lang.isArray(yKey))","            {","                yReady = (yData && Y.Object.size(yData) > 0) ? this._checkForDataByKey(yData, yKey) : false;","            }","            else","            {","                yReady = yData ? true : false;","            }","            ready = xReady && yReady;","            if(ready)","            {","                this.set(\"xData\", xData);","                this.set(\"yData\", yData);","            }","        }","        return ready;","    },","","    /**","     * Checks to see if all keys of a data object exist and contain data.","     *","     * @method _checkForDataByKey","     * @param {Object} obj The object to check","     * @param {Array} keys The keys to check","     * @return Boolean","     * @private","     */","    _checkForDataByKey: function(obj, keys)","    {","        var i,","            len = keys.length,","            hasData = false;","        for(i = 0; i < len; i = i + 1)","        {","            if(obj[keys[i]])","            {","                hasData = true;","                break;","            }","        }","        return hasData;","    },","","    /**","     * Draws the series is the xAxis and yAxis data are both available.","     *","     * @method validate","     * @private","     */","    validate: function()","    {","        if((this.get(\"xData\") && this.get(\"yData\")) || this._updateAxisBase())","        {","            this.draw();","        }","        else","        {","            this.fire(\"drawingComplete\");","        }","    },","","    /**","     * Calculates the coordinates for the series.","     *","     * @method setAreaData","     * @protected","     */","    setAreaData: function()","    {","        var w = this.get(\"width\"),","            h = this.get(\"height\"),","            xAxis = this.get(\"xAxis\"),","            yAxis = this.get(\"yAxis\"),","            xData = this._copyData(this.get(\"xData\")),","            yData = this._copyData(this.get(\"yData\")),","            direction = this.get(\"direction\"),","            dataLength = direction === \"vertical\" ? yData.length : xData.length,","            xOffset = xAxis.getEdgeOffset(dataLength, w),","            yOffset = yAxis.getEdgeOffset(dataLength, h),","            padding = this.get(\"styles\").padding,","			leftPadding = padding.left,","			topPadding = padding.top,","			dataWidth = w - (leftPadding + padding.right + xOffset),","			dataHeight = h - (topPadding + padding.bottom + yOffset),","			xMax = xAxis.get(\"maximum\"),","			xMin = xAxis.get(\"minimum\"),","			yMax = yAxis.get(\"maximum\"),","			yMin = yAxis.get(\"minimum\"),","            xScaleFactor = dataWidth / (xMax - xMin),","			yScaleFactor = dataHeight / (yMax - yMin),","            graphic = this.get(\"graphic\"),","            xcoords,","            ycoords;","        graphic.set(\"width\", w);","        graphic.set(\"height\", h);","        xOffset *= 0.5;","        yOffset *= 0.5;","        //Assuming a vertical graph has a range/category for its vertical axis.","        if(direction === \"vertical\")","        {","            yData = yData.reverse();","        }","        this._leftOrigin = Math.round(((0 - xMin) * xScaleFactor) + leftPadding + xOffset);","        this._bottomOrigin = Math.round((dataHeight + topPadding + yOffset));","        if(yMin < 0)","        {","            this._bottomOrigin = this._bottomOrigin - ((0 - yMin) * yScaleFactor);","        }","        xcoords = this._getXCoords(xData, xMin, dataWidth, xScaleFactor, xOffset, dataLength, leftPadding);","        ycoords = this._getYCoords(yData, yMin, dataHeight, yScaleFactor, yOffset, dataLength, topPadding);","        this.set(\"xcoords\", xcoords);","		this.set(\"ycoords\", ycoords);","        this._dataLength = dataLength;","        this._setXMarkerPlane(xcoords, dataLength);","        this._setYMarkerPlane(ycoords, dataLength);","    },","","    /**","     * Used to cache xData and yData in the setAreaData method. Returns a copy of an","     * array if an array is received as the param and returns an object literal of","     * array copies if an object literal is received as the param.","     *","     * @method _copyData","     * @param {Array|Object} val The object or array to be copied.","     * @return Array|Object","     * @private","     */","    _copyData: function(val)","    {","        var copy,","            key;","        if(Y_Lang.isArray(val))","        {","            copy = val.concat();","        }","        else","        {","            copy = {};","            for(key in val)","            {","                if(val.hasOwnProperty(key))","                {","                    copy[key] = val[key].concat();","                }","            }","        }","        return copy;","    },","","    /**","     * Sets the marker plane for the series when the coords argument is an array.","     * If the coords argument is an object literal no marker plane is set.","     *","     * @method _setXMarkerPlane","     * @param {Array|Object} coords An array of x coordinates or an object literal","     * containing key value pairs mapped to an array of coordinates.","     * @param {Number} dataLength The length of data for the series.","     * @private","     */","    _setXMarkerPlane: function(coords, dataLength)","    {","        var i = 0,","            xMarkerPlane = [],","            xMarkerPlaneOffset = this.get(\"xMarkerPlaneOffset\"),","            nextX;","        if(Y_Lang.isArray(coords))","        {","            for(i = 0; i < dataLength; i = i + 1)","            {","                nextX = coords[i];","                xMarkerPlane.push({start:nextX - xMarkerPlaneOffset, end: nextX + xMarkerPlaneOffset});","            }","            this.set(\"xMarkerPlane\", xMarkerPlane);","        }","    },","","    /**","     * Sets the marker plane for the series when the coords argument is an array.","     * If the coords argument is an object literal no marker plane is set.","     *","     * @method _setYMarkerPlane","     * @param {Array|Object} coords An array of y coordinates or an object literal","     * containing key value pairs mapped to an array of coordinates.","     * @param {Number} dataLength The length of data for the series.","     * @private","     */","    _setYMarkerPlane: function(coords, dataLength)","    {","        var i = 0,","            yMarkerPlane = [],","            yMarkerPlaneOffset = this.get(\"yMarkerPlaneOffset\"),","            nextY;","        if(Y_Lang.isArray(coords))","        {","            for(i = 0; i < dataLength; i = i + 1)","            {","                nextY = coords[i];","                yMarkerPlane.push({start:nextY - yMarkerPlaneOffset, end: nextY + yMarkerPlaneOffset});","            }","            this.set(\"yMarkerPlane\", yMarkerPlane);","        }","    },","","    /**","     * Gets the x-coordinates for a series. Used by the setAreaData method.","     * Returns an array when an array is received as the first argument.","     * Returns an object literal when an object literal is received as the first argument.","     *","     * @method _getXCoords","     * @param {Array|Object} xData An array of data values mapped to the x axis or an","     * object literal containing key values pairs of data values mapped to the x axis.","     * @param {Number} xMin The minimum value of the x axis.","     * @param {Number} dataWidth The width used to calculate the x-coordinates.","     * @param {Number} xScaleFactor The ratio used to calculate x-coordinates.","     * @param {Number} xOffset The distance of the first and last x-coordinate from the","     * beginning and end of the x-axis.","     * @param {Number} dataLength The number of data points in the arrays.","     * @param {Number} leftPadding The left padding of the series.","     * @return Array|Object","     * @private","     */","    _getXCoords: function(xData, xMin, dataWidth, xScaleFactor, xOffset, dataLength, leftPadding)","    {","        var isNumber = Y_Lang.isNumber,","			xcoords,","            xValue,","            nextX,","            key,","            i;","        if(Y_Lang.isArray(xData))","        {","            xcoords = [];","            for (i = 0; i < dataLength; ++i)","            {","                xValue = parseFloat(xData[i]);","                if(isNumber(xValue))","                {","                    nextX = (((xValue - xMin) * xScaleFactor) + leftPadding + xOffset);","                }","                else","                {","                    nextX = NaN;","                }","                xcoords.push(nextX);","            }","        }","        else","        {","            xcoords = {};","            for(key in xData)","            {","                if(xData.hasOwnProperty(key))","                {","                    xcoords[key] = this._getXCoords.apply(","                        this,","                        [xData[key], xMin, dataWidth, xScaleFactor, xOffset, dataLength, leftPadding]","                    );","                }","            }","        }","        return xcoords;","    },","","    /**","     * Gets the y-coordinates for a series. Used by the setAreaData method.","     * Returns an array when an array is received as the first argument.","     * Returns an object literal when an object literal is received as the first argument.","     *","     * @method _getYCoords","     * @param {Array|Object} yData An array of data values mapped to the y axis or an","     * object literal containing key values pairs of data values mapped to the y axis.","     * @param {Number} yMin The minimum value of the y axis.","     * @param {Number} dataHeight The height used to calculate the y-coordinates.","     * @param {Number} yScaleFactor The ratio used to calculate y-coordinates.","     * @param {Number} yOffset The distance of the first and last y-coordinate from the beginning and end of the y-axis.","     * @param {Number} dataLength The number of data points in the arrays.","     * @param {Number} topPadding The top padding of the series.","     * @return Array|Object","     * @private","     */","    _getYCoords: function(yData, yMin, dataHeight, yScaleFactor, yOffset, dataLength, topPadding)","    {","        var isNumber = Y_Lang.isNumber,","			ycoords,","            yValue,","            nextY,","            key,","            i;","        if(Y_Lang.isArray(yData))","        {","            ycoords = [];","            for (i = 0; i < dataLength; ++i)","            {","                yValue = parseFloat(yData[i]);","                if(isNumber(yValue))","                {","                    nextY = ((dataHeight + topPadding + yOffset) - (yValue - yMin) * yScaleFactor);","                }","                else","                {","                    nextY = NaN;","                }","                ycoords.push(nextY);","            }","        }","        else","        {","            ycoords = {};","            for(key in yData)","            {","                if(yData.hasOwnProperty(key))","                {","                    ycoords[key] = this._getYCoords.apply(","                        this,","                        [yData[key], yMin, dataHeight, yScaleFactor, yOffset, dataLength, topPadding]","                    );","                }","            }","        }","        return ycoords;","    },","","    /**","     * Finds the first valid index of an array coordinates.","     *","     * @method _getFirstValidIndex","     * @param {Array} coords An array of x or y coordinates.","     * @return Number","     * @private","     */","    _getFirstValidIndex: function(coords)","    {","        var coord,","            i = -1,","            limit = coords.length;","        while(!Y_Lang.isNumber(coord) && i < limit)","        {","            i += 1;","            coord = coords[i];","        }","        return i;","    },","","    /**","     * Finds the last valid index of an array coordinates.","     *","     * @method _getLastValidIndex","     * @param {Array} coords An array of x or y coordinates.","     * @return Number","     * @private","     */","    _getLastValidIndex: function(coords)","    {","        var coord,","            i = coords.length,","            limit = -1;","        while(!Y_Lang.isNumber(coord) && i > limit)","        {","            i -= 1;","            coord = coords[i];","        }","        return i;","    },","","    /**","     * Draws the series.","     *","     * @method draw","     * @protected","     */","    draw: function()","    {","        var w = this.get(\"width\"),","            h = this.get(\"height\"),","            xcoords,","            ycoords;","        if(this.get(\"rendered\"))","        {","            if((isFinite(w) && isFinite(h) && w > 0 && h > 0) &&","                ((this.get(\"xData\") && this.get(\"yData\")) ||","                this._updateAxisBase()))","            {","                if(this._drawing)","                {","                    this._callLater = true;","                    return;","                }","                this._drawing = true;","                this._callLater = false;","                this.setAreaData();","                xcoords = this.get(\"xcoords\");","                ycoords = this.get(\"ycoords\");","                if(xcoords && ycoords && xcoords.length > 0)","                {","                    this.drawSeries();","                }","                this._drawing = false;","                if(this._callLater)","                {","                    this.draw();","                }","                else","                {","                    this._toggleVisible(this.get(\"visible\"));","                    this.fire(\"drawingComplete\");","                }","            }","        }","    },","","    /**","     * Default value for plane offsets when the parent chart's `interactiveType` is `planar`.","     *","     * @property _defaultPlaneOffset","     * @type Number","     * @private","     */","    _defaultPlaneOffset: 4,","","    /**","     * Destructor implementation for the CartesianSeries class.","     * Calls destroy on all Graphic instances.","     *","     * @method destructor","     * @protected","     */","    destructor: function()","    {","        if(this.get(\"rendered\"))","        {","            if(this._xDataReadyHandle)","            {","                this._xDataReadyHandle.detach();","            }","            if(this._xDataUpdateHandle)","            {","                this._xDataUpdateHandle.detach();","            }","            if(this._yDataReadyHandle)","            {","                this._yDataReadyHandle.detach();","            }","            if(this._yDataUpdateHandle)","            {","                this._yDataUpdateHandle.detach();","            }","            this._xAxisChangeHandle.detach();","            this._yAxisChangeHandle.detach();","        }","    }","        /**","         * Event handle for the x-axis' dataReady event.","         *","         * @property _xDataReadyHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the x-axis dataUpdate event.","         *","         * @property _xDataUpdateHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the y-axis dataReady event.","         *","         * @property _yDataReadyHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the y-axis dataUpdate event.","         * @property _yDataUpdateHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the xAxisChange event.","         * @property _xAxisChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the yAxisChange event.","         * @property _yAxisChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the stylesChange event.","         * @property _stylesChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the widthChange event.","         * @property _widthChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the heightChange event.","         * @property _heightChangeHandle","         * @type {EventHandle}","         * @private","         */","","        /**","         * Event handle for the visibleChange event.","         * @property _visibleChangeHandle","         * @type {EventHandle}","         * @private","         */","}, {","    ATTRS: {","        /**","         * An array of all series of the same type used within a chart application.","         *","         * @attribute seriesTypeCollection","         * @type Array","         */","        seriesTypeCollection: {},","","        /**","         * Name used for for displaying data related to the x-coordinate.","         *","         * @attribute xDisplayName","         * @type String","         */","        xDisplayName: {","            getter: function()","            {","                return this._xDisplayName || this.get(\"xKey\");","            },","","            setter: function(val)","            {","                this._xDisplayName = val.toString();","                return val;","            }","        },","","        /**","         * Name used for for displaying data related to the y-coordinate.","         *","         * @attribute yDisplayName","         * @type String","         */","        yDisplayName: {","            getter: function()","            {","                return this._yDisplayName || this.get(\"yKey\");","            },","","            setter: function(val)","            {","                this._yDisplayName = val.toString();","                return val;","            }","        },","","        /**","         * Name used for for displaying category data","         *","         * @attribute categoryDisplayName","         * @type String","         * @readOnly","         */","        categoryDisplayName: {","            lazyAdd: false,","","            getter: function()","            {","                return this.get(\"direction\") === \"vertical\" ? this.get(\"yDisplayName\") : this.get(\"xDisplayName\");","            },","","            setter: function(val)","            {","                if(this.get(\"direction\") === \"vertical\")","                {","                    this._yDisplayName = val;","                }","                else","                {","                    this._xDisplayName = val;","                }","                return val;","            }","        },","","        /**","         * Name used for for displaying value data","         *","         * @attribute valueDisplayName","         * @type String","         * @readOnly","         */","        valueDisplayName: {","            lazyAdd: false,","","            getter: function()","            {","                return this.get(\"direction\") === \"vertical\" ? this.get(\"xDisplayName\") : this.get(\"yDisplayName\");","            },","","            setter: function(val)","            {","                if(this.get(\"direction\") === \"vertical\")","                {","                    this._xDisplayName = val;","                }","                else","                {","                    this._yDisplayName = val;","                }","                return val;","            }","        },","","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default cartesian","         */","        type: {","            value: \"cartesian\"","        },","","        /**","         * Order of this instance of this `type`.","         *","         * @attribute order","         * @type Number","         */","        order: {},","","        /**","         * Order of the instance","         *","         * @attribute graphOrder","         * @type Number","         */","        graphOrder: {},","","        /**","         * x coordinates for the series.","         *","         * @attribute xcoords","         * @type Array","         */","        xcoords: {},","","        /**","         * y coordinates for the series","         *","         * @attribute ycoords","         * @type Array","         */","        ycoords: {},","","        /**","         * Reference to the `Axis` instance used for assigning","         * x-values to the graph.","         *","         * @attribute xAxis","         * @type Axis","         */","        xAxis: {},","","        /**","         * Reference to the `Axis` instance used for assigning","         * y-values to the graph.","         *","         * @attribute yAxis","         * @type Axis","         */","        yAxis: {},","","        /**","         * Indicates which array to from the hash of value arrays in","         * the x-axis `Axis` instance.","         *","         * @attribute xKey","         * @type String","         */","        xKey: {","            setter: function(val)","            {","                if(Y_Lang.isArray(val))","                {","                    return val;","                }","                else","                {","                    return val.toString();","                }","            }","        },","","        /**","         * Indicates which array to from the hash of value arrays in","         * the y-axis `Axis` instance.","         *","         * @attribute yKey","         * @type String","         */","        yKey: {","            setter: function(val)","            {","                if(Y_Lang.isArray(val))","                {","                    return val;","                }","                else","                {","                    return val.toString();","                }","            }","        },","","        /**","         * Array of x values for the series.","         *","         * @attribute xData","         * @type Array","         */","        xData: {},","","        /**","         * Array of y values for the series.","         *","         * @attribute yData","         * @type Array","         */","        yData: {},","","        /**","         * Collection of area maps along the xAxis. Used to determine mouseover for multiple","         * series.","         *","         * @attribute xMarkerPlane","         * @type Array","         */","        xMarkerPlane: {},","","        /**","         * Collection of area maps along the yAxis. Used to determine mouseover for multiple","         * series.","         *","         * @attribute yMarkerPlane","         * @type Array","         */","        yMarkerPlane: {},","","        /**","         * Distance from a data coordinate to the left/right for setting a hotspot.","         *","         * @attribute xMarkerPlaneOffset","         * @type Number","         */","        xMarkerPlaneOffset: {","            getter: function() {","                var marker = this.get(\"styles\").marker;","                if(marker && marker.width && isFinite(marker.width))","                {","                    return marker.width * 0.5;","                }","                return this._defaultPlaneOffset;","            }","        },","","        /**","         * Distance from a data coordinate to the top/bottom for setting a hotspot.","         *","         * @attribute yMarkerPlaneOffset","         * @type Number","         */","        yMarkerPlaneOffset: {","            getter: function() {","                var marker = this.get(\"styles\").marker;","                if(marker && marker.height && isFinite(marker.height))","                {","                    return marker.height * 0.5;","                }","                return this._defaultPlaneOffset;","            }","        },","","        /**","         * Direction of the series","         *","         * @attribute direction","         * @type String","         */","        direction: {","            value: \"horizontal\"","        }","    }","});","","","}, '@VERSION@', {\"requires\": [\"series-base\"]});"];
_yuitest_coverage["build/series-cartesian/series-cartesian.js"].lines = {"1":0,"9":0,"31":0,"76":0,"78":0,"80":0,"81":0,"83":0,"85":0,"86":0,"88":0,"89":0,"90":0,"91":0,"92":0,"94":0,"97":0,"98":0,"99":0,"101":0,"104":0,"105":0,"106":0,"108":0,"111":0,"123":0,"124":0,"125":0,"137":0,"138":0,"139":0,"160":0,"161":0,"163":0,"176":0,"177":0,"179":0,"193":0,"202":0,"204":0,"208":0,"209":0,"210":0,"212":0,"216":0,"218":0,"220":0,"224":0,"226":0,"227":0,"229":0,"230":0,"233":0,"247":0,"250":0,"252":0,"254":0,"255":0,"258":0,"269":0,"271":0,"275":0,"287":0,"311":0,"312":0,"313":0,"314":0,"316":0,"318":0,"320":0,"321":0,"322":0,"324":0,"326":0,"327":0,"328":0,"329":0,"330":0,"331":0,"332":0,"347":0,"349":0,"351":0,"355":0,"356":0,"358":0,"360":0,"364":0,"379":0,"383":0,"385":0,"387":0,"388":0,"390":0,"406":0,"410":0,"412":0,"414":0,"415":0,"417":0,"441":0,"447":0,"449":0,"450":0,"452":0,"453":0,"455":0,"459":0,"461":0,"466":0,"467":0,"469":0,"471":0,"478":0,"500":0,"506":0,"508":0,"509":0,"511":0,"512":0,"514":0,"518":0,"520":0,"525":0,"526":0,"528":0,"530":0,"537":0,"550":0,"553":0,"555":0,"556":0,"558":0,"571":0,"574":0,"576":0,"577":0,"579":0,"590":0,"594":0,"596":0,"600":0,"602":0,"603":0,"605":0,"606":0,"607":0,"608":0,"609":0,"610":0,"612":0,"614":0,"615":0,"617":0,"621":0,"622":0,"646":0,"648":0,"650":0,"652":0,"654":0,"656":0,"658":0,"660":0,"662":0,"664":0,"665":0,"759":0,"764":0,"765":0,"778":0,"783":0,"784":0,"800":0,"805":0,"807":0,"811":0,"813":0,"829":0,"834":0,"836":0,"840":0,"842":0,"917":0,"919":0,"923":0,"938":0,"940":0,"944":0,"991":0,"992":0,"994":0,"996":0,"1008":0,"1009":0,"1011":0,"1013":0};
_yuitest_coverage["build/series-cartesian/series-cartesian.js"].functions = {"(anonymous 2):90":0,"(anonymous 3):97":0,"(anonymous 4):104":0,"addListeners:74":0,"_xAxisChangeHandler:121":0,"_yAxisChangeHandler:135":0,"_xDataChangeHandler:158":0,"_yDataChangeHandler:174":0,"_updateAxisBase:191":0,"_checkForDataByKey:245":0,"validate:267":0,"setAreaData:285":0,"_copyData:345":0,"_setXMarkerPlane:377":0,"_setYMarkerPlane:404":0,"_getXCoords:439":0,"_getYCoords:498":0,"_getFirstValidIndex:548":0,"_getLastValidIndex:569":0,"draw:588":0,"destructor:644":0,"getter:757":0,"setter:762":0,"getter:776":0,"setter:781":0,"getter:798":0,"setter:803":0,"getter:827":0,"setter:832":0,"setter:915":0,"setter:936":0,"getter:990":0,"getter:1007":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-cartesian/series-cartesian.js"].coveredLines = 197;
_yuitest_coverage["build/series-cartesian/series-cartesian.js"].coveredFunctions = 34;
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 1);
YUI.add('series-cartesian', function (Y, NAME) {

/**
 * Provides functionality for creating a cartesian chart series.
 *
 * @module charts
 * @submodule series-cartesian
 */
_yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 9);
var Y_Lang = Y.Lang;

/**
 * An abstract class for creating series instances with horizontal and vertical axes.
 * CartesianSeries provides the core functionality used by the following classes:
 * <ul>
 *      <li>{{#crossLink "LineSeries"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "MarkerSeries"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "AreaSeries"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "SplineSeries"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "AreaSplineSeries"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "ComboSeries"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "ComboSplineSeries"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "Histogram"}}{{/crossLink}}</li>
 *  </ul>
 *
 * @class CartesianSeries
 * @extends SeriesBase
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-base
 */
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 31);
Y.CartesianSeries = Y.Base.create("cartesianSeries", Y.SeriesBase, [], {
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
     * Adds event listeners.
     *
     * @method addListeners
     * @private
     */
    addListeners: function()
    {
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "addListeners", 74);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 76);
var xAxis = this.get("xAxis"),
            yAxis = this.get("yAxis");
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 78);
if(xAxis)
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 80);
this._xDataReadyHandle = xAxis.after("dataReady", Y.bind(this._xDataChangeHandler, this));
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 81);
this._xDataUpdateHandle = xAxis.after("dataUpdate", Y.bind(this._xDataChangeHandler, this));
        }
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 83);
if(yAxis)
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 85);
this._yDataReadyHandle = yAxis.after("dataReady", Y.bind(this._yDataChangeHandler, this));
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 86);
this._yDataUpdateHandle = yAxis.after("dataUpdate", Y.bind(this._yDataChangeHandler, this));
        }
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 88);
this._xAxisChangeHandle = this.after("xAxisChange", this._xAxisChangeHandler);
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 89);
this._yAxisChangeHandle = this.after("yAxisChange", this._yAxisChangeHandler);
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 90);
this._stylesChangeHandle = this.after("stylesChange", function() {
            _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "(anonymous 2)", 90);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 91);
var axesReady = this._updateAxisBase();
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 92);
if(axesReady)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 94);
this.draw();
            }
        });
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 97);
this._widthChangeHandle = this.after("widthChange", function() {
            _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "(anonymous 3)", 97);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 98);
var axesReady = this._updateAxisBase();
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 99);
if(axesReady)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 101);
this.draw();
            }
        });
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 104);
this._heightChangeHandle = this.after("heightChange", function() {
            _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "(anonymous 4)", 104);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 105);
var axesReady = this._updateAxisBase();
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 106);
if(axesReady)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 108);
this.draw();
            }
        });
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 111);
this._visibleChangeHandle = this.after("visibleChange", this._handleVisibleChange);
    },

    /**
     * Event handler for the xAxisChange event.
     *
     * @method _xAxisChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _xAxisChangeHandler: function()
    {
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "_xAxisChangeHandler", 121);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 123);
var xAxis = this.get("xAxis");
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 124);
xAxis.after("dataReady", Y.bind(this._xDataChangeHandler, this));
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 125);
xAxis.after("dataUpdate", Y.bind(this._xDataChangeHandler, this));
    },

    /**
     * Event handler the yAxisChange event.
     *
     * @method _yAxisChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _yAxisChangeHandler: function()
    {
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "_yAxisChangeHandler", 135);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 137);
var yAxis = this.get("yAxis");
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 138);
yAxis.after("dataReady", Y.bind(this._yDataChangeHandler, this));
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 139);
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
    _xDataChangeHandler: function()
    {
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "_xDataChangeHandler", 158);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 160);
var axesReady = this._updateAxisBase();
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 161);
if(axesReady)
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 163);
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
    _yDataChangeHandler: function()
    {
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "_yDataChangeHandler", 174);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 176);
var axesReady = this._updateAxisBase();
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 177);
if(axesReady)
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 179);
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
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "_updateAxisBase", 191);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 193);
var xAxis = this.get("xAxis"),
            yAxis = this.get("yAxis"),
            xKey = this.get("xKey"),
            yKey = this.get("yKey"),
            yData,
            xData,
            xReady,
            yReady,
            ready;
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 202);
if(!xAxis || !yAxis || !xKey || !yKey)
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 204);
ready = false;
        }
        else
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 208);
xData = xAxis.getDataByKey(xKey);
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 209);
yData = yAxis.getDataByKey(yKey);
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 210);
if(Y_Lang.isArray(xKey))
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 212);
xReady = (xData && Y.Object.size(xData) > 0) ? this._checkForDataByKey(xData, xKey) : false;
            }
            else
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 216);
xReady = xData ? true : false;
            }
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 218);
if(Y_Lang.isArray(yKey))
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 220);
yReady = (yData && Y.Object.size(yData) > 0) ? this._checkForDataByKey(yData, yKey) : false;
            }
            else
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 224);
yReady = yData ? true : false;
            }
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 226);
ready = xReady && yReady;
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 227);
if(ready)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 229);
this.set("xData", xData);
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 230);
this.set("yData", yData);
            }
        }
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 233);
return ready;
    },

    /**
     * Checks to see if all keys of a data object exist and contain data.
     *
     * @method _checkForDataByKey
     * @param {Object} obj The object to check
     * @param {Array} keys The keys to check
     * @return Boolean
     * @private
     */
    _checkForDataByKey: function(obj, keys)
    {
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "_checkForDataByKey", 245);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 247);
var i,
            len = keys.length,
            hasData = false;
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 250);
for(i = 0; i < len; i = i + 1)
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 252);
if(obj[keys[i]])
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 254);
hasData = true;
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 255);
break;
            }
        }
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 258);
return hasData;
    },

    /**
     * Draws the series is the xAxis and yAxis data are both available.
     *
     * @method validate
     * @private
     */
    validate: function()
    {
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "validate", 267);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 269);
if((this.get("xData") && this.get("yData")) || this._updateAxisBase())
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 271);
this.draw();
        }
        else
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 275);
this.fire("drawingComplete");
        }
    },

    /**
     * Calculates the coordinates for the series.
     *
     * @method setAreaData
     * @protected
     */
    setAreaData: function()
    {
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "setAreaData", 285);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 287);
var w = this.get("width"),
            h = this.get("height"),
            xAxis = this.get("xAxis"),
            yAxis = this.get("yAxis"),
            xData = this._copyData(this.get("xData")),
            yData = this._copyData(this.get("yData")),
            direction = this.get("direction"),
            dataLength = direction === "vertical" ? yData.length : xData.length,
            xOffset = xAxis.getEdgeOffset(dataLength, w),
            yOffset = yAxis.getEdgeOffset(dataLength, h),
            padding = this.get("styles").padding,
			leftPadding = padding.left,
			topPadding = padding.top,
			dataWidth = w - (leftPadding + padding.right + xOffset),
			dataHeight = h - (topPadding + padding.bottom + yOffset),
			xMax = xAxis.get("maximum"),
			xMin = xAxis.get("minimum"),
			yMax = yAxis.get("maximum"),
			yMin = yAxis.get("minimum"),
            xScaleFactor = dataWidth / (xMax - xMin),
			yScaleFactor = dataHeight / (yMax - yMin),
            graphic = this.get("graphic"),
            xcoords,
            ycoords;
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 311);
graphic.set("width", w);
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 312);
graphic.set("height", h);
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 313);
xOffset *= 0.5;
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 314);
yOffset *= 0.5;
        //Assuming a vertical graph has a range/category for its vertical axis.
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 316);
if(direction === "vertical")
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 318);
yData = yData.reverse();
        }
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 320);
this._leftOrigin = Math.round(((0 - xMin) * xScaleFactor) + leftPadding + xOffset);
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 321);
this._bottomOrigin = Math.round((dataHeight + topPadding + yOffset));
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 322);
if(yMin < 0)
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 324);
this._bottomOrigin = this._bottomOrigin - ((0 - yMin) * yScaleFactor);
        }
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 326);
xcoords = this._getXCoords(xData, xMin, dataWidth, xScaleFactor, xOffset, dataLength, leftPadding);
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 327);
ycoords = this._getYCoords(yData, yMin, dataHeight, yScaleFactor, yOffset, dataLength, topPadding);
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 328);
this.set("xcoords", xcoords);
		_yuitest_coverline("build/series-cartesian/series-cartesian.js", 329);
this.set("ycoords", ycoords);
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 330);
this._dataLength = dataLength;
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 331);
this._setXMarkerPlane(xcoords, dataLength);
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 332);
this._setYMarkerPlane(ycoords, dataLength);
    },

    /**
     * Used to cache xData and yData in the setAreaData method. Returns a copy of an
     * array if an array is received as the param and returns an object literal of
     * array copies if an object literal is received as the param.
     *
     * @method _copyData
     * @param {Array|Object} val The object or array to be copied.
     * @return Array|Object
     * @private
     */
    _copyData: function(val)
    {
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "_copyData", 345);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 347);
var copy,
            key;
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 349);
if(Y_Lang.isArray(val))
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 351);
copy = val.concat();
        }
        else
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 355);
copy = {};
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 356);
for(key in val)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 358);
if(val.hasOwnProperty(key))
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 360);
copy[key] = val[key].concat();
                }
            }
        }
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 364);
return copy;
    },

    /**
     * Sets the marker plane for the series when the coords argument is an array.
     * If the coords argument is an object literal no marker plane is set.
     *
     * @method _setXMarkerPlane
     * @param {Array|Object} coords An array of x coordinates or an object literal
     * containing key value pairs mapped to an array of coordinates.
     * @param {Number} dataLength The length of data for the series.
     * @private
     */
    _setXMarkerPlane: function(coords, dataLength)
    {
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "_setXMarkerPlane", 377);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 379);
var i = 0,
            xMarkerPlane = [],
            xMarkerPlaneOffset = this.get("xMarkerPlaneOffset"),
            nextX;
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 383);
if(Y_Lang.isArray(coords))
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 385);
for(i = 0; i < dataLength; i = i + 1)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 387);
nextX = coords[i];
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 388);
xMarkerPlane.push({start:nextX - xMarkerPlaneOffset, end: nextX + xMarkerPlaneOffset});
            }
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 390);
this.set("xMarkerPlane", xMarkerPlane);
        }
    },

    /**
     * Sets the marker plane for the series when the coords argument is an array.
     * If the coords argument is an object literal no marker plane is set.
     *
     * @method _setYMarkerPlane
     * @param {Array|Object} coords An array of y coordinates or an object literal
     * containing key value pairs mapped to an array of coordinates.
     * @param {Number} dataLength The length of data for the series.
     * @private
     */
    _setYMarkerPlane: function(coords, dataLength)
    {
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "_setYMarkerPlane", 404);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 406);
var i = 0,
            yMarkerPlane = [],
            yMarkerPlaneOffset = this.get("yMarkerPlaneOffset"),
            nextY;
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 410);
if(Y_Lang.isArray(coords))
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 412);
for(i = 0; i < dataLength; i = i + 1)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 414);
nextY = coords[i];
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 415);
yMarkerPlane.push({start:nextY - yMarkerPlaneOffset, end: nextY + yMarkerPlaneOffset});
            }
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 417);
this.set("yMarkerPlane", yMarkerPlane);
        }
    },

    /**
     * Gets the x-coordinates for a series. Used by the setAreaData method.
     * Returns an array when an array is received as the first argument.
     * Returns an object literal when an object literal is received as the first argument.
     *
     * @method _getXCoords
     * @param {Array|Object} xData An array of data values mapped to the x axis or an
     * object literal containing key values pairs of data values mapped to the x axis.
     * @param {Number} xMin The minimum value of the x axis.
     * @param {Number} dataWidth The width used to calculate the x-coordinates.
     * @param {Number} xScaleFactor The ratio used to calculate x-coordinates.
     * @param {Number} xOffset The distance of the first and last x-coordinate from the
     * beginning and end of the x-axis.
     * @param {Number} dataLength The number of data points in the arrays.
     * @param {Number} leftPadding The left padding of the series.
     * @return Array|Object
     * @private
     */
    _getXCoords: function(xData, xMin, dataWidth, xScaleFactor, xOffset, dataLength, leftPadding)
    {
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "_getXCoords", 439);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 441);
var isNumber = Y_Lang.isNumber,
			xcoords,
            xValue,
            nextX,
            key,
            i;
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 447);
if(Y_Lang.isArray(xData))
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 449);
xcoords = [];
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 450);
for (i = 0; i < dataLength; ++i)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 452);
xValue = parseFloat(xData[i]);
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 453);
if(isNumber(xValue))
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 455);
nextX = (((xValue - xMin) * xScaleFactor) + leftPadding + xOffset);
                }
                else
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 459);
nextX = NaN;
                }
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 461);
xcoords.push(nextX);
            }
        }
        else
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 466);
xcoords = {};
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 467);
for(key in xData)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 469);
if(xData.hasOwnProperty(key))
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 471);
xcoords[key] = this._getXCoords.apply(
                        this,
                        [xData[key], xMin, dataWidth, xScaleFactor, xOffset, dataLength, leftPadding]
                    );
                }
            }
        }
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 478);
return xcoords;
    },

    /**
     * Gets the y-coordinates for a series. Used by the setAreaData method.
     * Returns an array when an array is received as the first argument.
     * Returns an object literal when an object literal is received as the first argument.
     *
     * @method _getYCoords
     * @param {Array|Object} yData An array of data values mapped to the y axis or an
     * object literal containing key values pairs of data values mapped to the y axis.
     * @param {Number} yMin The minimum value of the y axis.
     * @param {Number} dataHeight The height used to calculate the y-coordinates.
     * @param {Number} yScaleFactor The ratio used to calculate y-coordinates.
     * @param {Number} yOffset The distance of the first and last y-coordinate from the beginning and end of the y-axis.
     * @param {Number} dataLength The number of data points in the arrays.
     * @param {Number} topPadding The top padding of the series.
     * @return Array|Object
     * @private
     */
    _getYCoords: function(yData, yMin, dataHeight, yScaleFactor, yOffset, dataLength, topPadding)
    {
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "_getYCoords", 498);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 500);
var isNumber = Y_Lang.isNumber,
			ycoords,
            yValue,
            nextY,
            key,
            i;
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 506);
if(Y_Lang.isArray(yData))
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 508);
ycoords = [];
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 509);
for (i = 0; i < dataLength; ++i)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 511);
yValue = parseFloat(yData[i]);
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 512);
if(isNumber(yValue))
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 514);
nextY = ((dataHeight + topPadding + yOffset) - (yValue - yMin) * yScaleFactor);
                }
                else
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 518);
nextY = NaN;
                }
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 520);
ycoords.push(nextY);
            }
        }
        else
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 525);
ycoords = {};
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 526);
for(key in yData)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 528);
if(yData.hasOwnProperty(key))
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 530);
ycoords[key] = this._getYCoords.apply(
                        this,
                        [yData[key], yMin, dataHeight, yScaleFactor, yOffset, dataLength, topPadding]
                    );
                }
            }
        }
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 537);
return ycoords;
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
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "_getFirstValidIndex", 548);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 550);
var coord,
            i = -1,
            limit = coords.length;
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 553);
while(!Y_Lang.isNumber(coord) && i < limit)
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 555);
i += 1;
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 556);
coord = coords[i];
        }
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 558);
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
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "_getLastValidIndex", 569);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 571);
var coord,
            i = coords.length,
            limit = -1;
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 574);
while(!Y_Lang.isNumber(coord) && i > limit)
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 576);
i -= 1;
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 577);
coord = coords[i];
        }
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 579);
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
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "draw", 588);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 590);
var w = this.get("width"),
            h = this.get("height"),
            xcoords,
            ycoords;
        _yuitest_coverline("build/series-cartesian/series-cartesian.js", 594);
if(this.get("rendered"))
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 596);
if((isFinite(w) && isFinite(h) && w > 0 && h > 0) &&
                ((this.get("xData") && this.get("yData")) ||
                this._updateAxisBase()))
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 600);
if(this._drawing)
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 602);
this._callLater = true;
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 603);
return;
                }
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 605);
this._drawing = true;
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 606);
this._callLater = false;
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 607);
this.setAreaData();
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 608);
xcoords = this.get("xcoords");
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 609);
ycoords = this.get("ycoords");
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 610);
if(xcoords && ycoords && xcoords.length > 0)
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 612);
this.drawSeries();
                }
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 614);
this._drawing = false;
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 615);
if(this._callLater)
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 617);
this.draw();
                }
                else
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 621);
this._toggleVisible(this.get("visible"));
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 622);
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
     * Destructor implementation for the CartesianSeries class.
     * Calls destroy on all Graphic instances.
     *
     * @method destructor
     * @protected
     */
    destructor: function()
    {
        _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "destructor", 644);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 646);
if(this.get("rendered"))
        {
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 648);
if(this._xDataReadyHandle)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 650);
this._xDataReadyHandle.detach();
            }
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 652);
if(this._xDataUpdateHandle)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 654);
this._xDataUpdateHandle.detach();
            }
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 656);
if(this._yDataReadyHandle)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 658);
this._yDataReadyHandle.detach();
            }
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 660);
if(this._yDataUpdateHandle)
            {
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 662);
this._yDataUpdateHandle.detach();
            }
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 664);
this._xAxisChangeHandle.detach();
            _yuitest_coverline("build/series-cartesian/series-cartesian.js", 665);
this._yAxisChangeHandle.detach();
        }
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
                _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "getter", 757);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 759);
return this._xDisplayName || this.get("xKey");
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "setter", 762);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 764);
this._xDisplayName = val.toString();
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 765);
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
                _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "getter", 776);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 778);
return this._yDisplayName || this.get("yKey");
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "setter", 781);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 783);
this._yDisplayName = val.toString();
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 784);
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
                _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "getter", 798);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 800);
return this.get("direction") === "vertical" ? this.get("yDisplayName") : this.get("xDisplayName");
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "setter", 803);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 805);
if(this.get("direction") === "vertical")
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 807);
this._yDisplayName = val;
                }
                else
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 811);
this._xDisplayName = val;
                }
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 813);
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
                _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "getter", 827);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 829);
return this.get("direction") === "vertical" ? this.get("xDisplayName") : this.get("yDisplayName");
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "setter", 832);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 834);
if(this.get("direction") === "vertical")
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 836);
this._xDisplayName = val;
                }
                else
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 840);
this._yDisplayName = val;
                }
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 842);
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
                _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "setter", 915);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 917);
if(Y_Lang.isArray(val))
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 919);
return val;
                }
                else
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 923);
return val.toString();
                }
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
                _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "setter", 936);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 938);
if(Y_Lang.isArray(val))
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 940);
return val;
                }
                else
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 944);
return val.toString();
                }
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
                _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "getter", 990);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 991);
var marker = this.get("styles").marker;
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 992);
if(marker && marker.width && isFinite(marker.width))
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 994);
return marker.width * 0.5;
                }
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 996);
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
                _yuitest_coverfunc("build/series-cartesian/series-cartesian.js", "getter", 1007);
_yuitest_coverline("build/series-cartesian/series-cartesian.js", 1008);
var marker = this.get("styles").marker;
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 1009);
if(marker && marker.height && isFinite(marker.height))
                {
                    _yuitest_coverline("build/series-cartesian/series-cartesian.js", 1011);
return marker.height * 0.5;
                }
                _yuitest_coverline("build/series-cartesian/series-cartesian.js", 1013);
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
        }
    }
});


}, '@VERSION@', {"requires": ["series-base"]});
