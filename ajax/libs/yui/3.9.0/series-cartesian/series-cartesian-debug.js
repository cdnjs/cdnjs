YUI.add('series-cartesian', function (Y, NAME) {

/**
 * Provides functionality for creating a cartesian chart series.
 *
 * @module charts
 * @submodule series-cartesian
 */
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
        var xAxis = this.get("xAxis"),
            yAxis = this.get("yAxis");
        if(xAxis)
        {
            this._xDataReadyHandle = xAxis.after("dataReady", Y.bind(this._xDataChangeHandler, this));
            this._xDataUpdateHandle = xAxis.after("dataUpdate", Y.bind(this._xDataChangeHandler, this));
        }
        if(yAxis)
        {
            this._yDataReadyHandle = yAxis.after("dataReady", Y.bind(this._yDataChangeHandler, this));
            this._yDataUpdateHandle = yAxis.after("dataUpdate", Y.bind(this._yDataChangeHandler, this));
        }
        this._xAxisChangeHandle = this.after("xAxisChange", this._xAxisChangeHandler);
        this._yAxisChangeHandle = this.after("yAxisChange", this._yAxisChangeHandler);
        this._stylesChangeHandle = this.after("stylesChange", function(e) {
            var axesReady = this._updateAxisBase();
            if(axesReady)
            {
                this.draw();
            }
        });
        this._widthChangeHandle = this.after("widthChange", function(e) {
            var axesReady = this._updateAxisBase();
            if(axesReady)
            {
                this.draw();
            }
        });
        this._heightChangeHandle = this.after("heightChange", function(e) {
            var axesReady = this._updateAxisBase();
            if(axesReady)
            {
                this.draw();
            }
        });
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
        var xAxis = this.get("xAxis");
        xAxis.after("dataReady", Y.bind(this._xDataChangeHandler, this));
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
        var yAxis = this.get("yAxis");
        yAxis.after("dataReady", Y.bind(this._yDataChangeHandler, this));
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
        var axesReady = this._updateAxisBase();
        if(axesReady)
        {
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
        var axesReady = this._updateAxisBase();
        if(axesReady)
        {
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
        var xAxis = this.get("xAxis"),
            yAxis = this.get("yAxis"),
            xKey = this.get("xKey"),
            yKey = this.get("yKey"),
            yData,
            xData,
            xReady,
            yReady,
            ready;
        if(!xAxis || !yAxis || !xKey || !yKey)
        {
            ready = false;
        }
        else 
        {
            xData = xAxis.getDataByKey(xKey);
            yData = yAxis.getDataByKey(yKey);
            if(Y_Lang.isArray(xKey))
            {
                xReady = (xData && Y.Object.size(xData) > 0) ? this._checkForDataByKey(xData, xKey) : false;
            }
            else
            {
                xReady = xData ? true : false;
            }
            if(Y_Lang.isArray(yKey))
            {
                yReady = (yData && Y.Object.size(yData) > 0) ? this._checkForDataByKey(yData, yKey) : false;
            }
            else
            {
                yReady = yData ? true : false;
            }
            ready = xReady && yReady;
            if(ready)
            {
                this.set("xData", xData);
                this.set("yData", yData);
            }
        }
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
        var i,
            len = keys.length,
            hasData = false;
        for(i = 0; i < len; i = i + 1) 
        {
            if(obj[keys[i]])
            {
                hasData = true;
                break;
            }
        }
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
        if((this.get("xData") && this.get("yData")) || this._updateAxisBase())
        {
            this.draw();
        }
        else
        {
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
        graphic.set("width", w);
        graphic.set("height", h);
        xOffset *= 0.5;
        yOffset *= 0.5;
        //Assuming a vertical graph has a range/category for its vertical axis.
        if(direction === "vertical")
        {
            yData = yData.reverse();
        }
        this._leftOrigin = Math.round(((0 - xMin) * xScaleFactor) + leftPadding + xOffset);
        this._bottomOrigin = Math.round((dataHeight + topPadding + yOffset));
        if(yMin < 0)
        {
            this._bottomOrigin = this._bottomOrigin - ((0 - yMin) * yScaleFactor);
        }
        xcoords = this._getXCoords(xData, xMin, dataWidth, xScaleFactor, xOffset, dataLength, leftPadding);
        ycoords = this._getYCoords(yData, yMin, dataHeight, yScaleFactor, yOffset, dataLength, topPadding);
        this.set("xcoords", xcoords);
		this.set("ycoords", ycoords);
        this._dataLength = dataLength;
        this._setXMarkerPlane(xcoords, dataLength); 
        this._setYMarkerPlane(ycoords, dataLength); 
    },
    
    /**
     * Used to cache xData and yData in the setAreaData method. Returns a copy of an array if an array is received as the param
     * and returns an object literal of array copies if an object literal is received as the param.
     *
     * @method _copyData
     * @param {Array|Object} val The object or array to be copied. 
     * @return Array|Object
     * @private
     */
    _copyData: function(val)
    {
        var copy;
        if(Y_Lang.isArray(val))
        {
            copy = val.concat();
        }
        else
        {
            copy = {};
            for(key in val)
            {
                if(val.hasOwnProperty(key))
                {
                    copy[key] = val[key].concat();
                }
            }
        }
        return copy;
    },

    /**
     * Sets the marker plane for the series when the coords argument is an array. If the coords argument
     * is an object literal no marker plane is set.
     *
     * @method _setXMarkerPlane
     * @param {Array|Object} coords An array of x coordinates or an object literal containing key value pairs mapped to
     * an array of coordinates.
     * @param {Number} dataLength The length of data for the series.
     * @private 
     */
    _setXMarkerPlane: function(coords, dataLength)
    {
        var i = 0,
            xMarkerPlane = [],
            xMarkerPlaneOffset = this.get("xMarkerPlaneOffset"),
            nextX;
        if(Y_Lang.isArray(coords))
        {
            for(i = 0; i < dataLength; i = i + 1) 
            {
                nextX = coords[i]; 
                xMarkerPlane.push({start:nextX - xMarkerPlaneOffset, end: nextX + xMarkerPlaneOffset});
            }
            this.set("xMarkerPlane", xMarkerPlane);
        }
    },

    /**
     * Sets the marker plane for the series when the coords argument is an array. If the coords argument
     * is an object literal no marker plane is set.
     *
     * @method _setYMarkerPlane
     * @param {Array|Object} coords An array of y coordinates or an object literal containing key value pairs mapped to
     * an array of coordinates.
     * @param {Number} dataLength The length of data for the series.
     * @private 
     */
    _setYMarkerPlane: function(coords, dataLength)
    {
        var i = 0,
            yMarkerPlane = [],
            yMarkerPlaneOffset = this.get("yMarkerPlaneOffset"),
            nextY;
        if(Y_Lang.isArray(coords))
        {
            for(i = 0; i < dataLength; i = i + 1) 
            {
                nextY = coords[i]; 
                yMarkerPlane.push({start:nextY - yMarkerPlaneOffset, end: nextY + yMarkerPlaneOffset});
            }
            this.set("yMarkerPlane", yMarkerPlane);
        }
    },

    /**
     * Gets the x-coordinates for a series. Used by the setAreaData method. Returns an array when an array is received as the first argument.
     * Returns an object literal when an object literal is received as the first argument.
     *
     * @method _getXCoords
     * @param {Array|Object} xData An array of data values mapped to the x axis or an object literal containing key values pairs of data values mapped to the x axis.
     * @param {Number} xMin The minimum value of the x axis.
     * @param {Number} dataWidth The width used to calculate the x-coordinates.
     * @param {Number} xScaleFactor The ratio used to calculate x-coordinates.
     * @param {Number} xOffset The distance of the first and last x-coordinate from the beginning and end of the x-axis.
     * @param {Number} dataLength The number of data points in the arrays. 
     * @param {Number} leftPadding The left padding of the series.
     * @return Array|Object
     * @private
     */
    _getXCoords: function(xData, xMin, dataWidth, xScaleFactor, xOffset, dataLength, leftPadding) 
    {
        var isNumber = Y_Lang.isNumber,
			xcoords,
            xValue,
            nextX,
            key,
            i;
        if(Y_Lang.isArray(xData))
        {
            xcoords = [];
            for (i = 0; i < dataLength; ++i)
            {
                xValue = parseFloat(xData[i]);
                if(isNumber(xValue))
                {
                    nextX = (((xValue - xMin) * xScaleFactor) + leftPadding + xOffset);
                }
                else
                {
                    nextX = NaN;
                }
                xcoords.push(nextX);
            }
        }
        else
        {
            xcoords = {};
            for(key in xData)
            {
                if(xData.hasOwnProperty(key))
                {
                    xcoords[key] = this._getXCoords.apply(
                        this,
                        [xData[key], xMin, dataWidth, xScaleFactor, xOffset, dataLength, leftPadding]
                    );
                }
            }
        }
        return xcoords; 
    },
    
    /**
     * Gets the y-coordinates for a series. Used by the setAreaData method. Returns an array when an array is received as the first argument.
     * Returns an object literal when an object literal is received as the first argument.
     *
     * @method _getYCoords
     * @param {Array|Object} yData An array of data values mapped to the y axis or an object literal containing key values pairs of data values mapped to the y axis.
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
        var isNumber = Y_Lang.isNumber,
			ycoords,
            yValue,
            nextY,
            key,
            i;
        if(Y_Lang.isArray(yData))
        {
            ycoords = [];
            for (i = 0; i < dataLength; ++i)
            {
                yValue = parseFloat(yData[i]);
                if(isNumber(yValue))
                {
                    nextY = ((dataHeight + topPadding + yOffset) - (yValue - yMin) * yScaleFactor);
                }
                else
                {
                    nextY = NaN;
                }
                ycoords.push(nextY);
            }
        }
        else
        {
            ycoords = {};
            for(key in yData)
            {
                if(yData.hasOwnProperty(key))
                {
                    ycoords[key] = this._getYCoords.apply(
                        this,
                        [yData[key], yMin, dataHeight, yScaleFactor, yOffset, dataLength, topPadding]
                    );     
                }
            }
        }
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
        var coord,
            i = -1,
            limit = coords.length;
        while(!Y_Lang.isNumber(coord) && i < limit)
        {
            i += 1;
            coord = coords[i];
        }
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
        var coord,
            i = coords.length,
            limit = -1;
        while(!Y_Lang.isNumber(coord) && i > limit)
        {
            i -= 1;
            coord = coords[i];
        }
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
        var w = this.get("width"),
            h = this.get("height"),
            xcoords,
            ycoords;
        if(this.get("rendered"))
        {
            if((isFinite(w) && isFinite(h) && w > 0 && h > 0) && ((this.get("xData") && this.get("yData")) || this._updateAxisBase()))
            {
                if(this._drawing)
                {
                    this._callLater = true;
                    return;
                }
                this._drawing = true;
                this._callLater = false;
                this.setAreaData();
                xcoords = this.get("xcoords");
                ycoords = this.get("ycoords");
                if(xcoords && ycoords && xcoords.length > 0)
                {
                    this.drawSeries();
                }
                this._drawing = false;
                if(this._callLater)
                {
                    this.draw();
                }
                else
                {
                    this._toggleVisible(this.get("visible"));
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
     * Destructor implementation for the CartesianSeries class. Calls destroy on all Graphic instances.
     *
     * @method destructor
     * @protected
     */
    destructor: function()
    {
        if(this.get("rendered"))
        {
            if(this._xDataReadyHandle)
            {
                this._xDataReadyHandle.detach();
            }
            if(this._xDataUpdateHandle)
            {
                this._xDataUpdateHandle.detach();
            }
            if(this._yDataReadyHandle)
            {
                this._yDataReadyHandle.detach();
            }
            if(this._yDataUpdateHandle)
            {
                this._yDataUpdateHandle.detach();
            }
            this._xAxisChangeHandle.detach();
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
                return this._xDisplayName || this.get("xKey");
            },

            setter: function(val)
            {
                this._xDisplayName = val.toString();
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
                return this._yDisplayName || this.get("yKey");
            },

            setter: function(val)
            {
                this._yDisplayName = val.toString();
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
                return this.get("direction") == "vertical" ? this.get("yDisplayName") : this.get("xDisplayName");
           },

            setter: function(val)
            {
                if(this.get("direction") == "vertical")
                {
                    this._yDisplayName = val;
                }
                else
                {
                    this._xDisplayName = val;
                }
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
                return this.get("direction") == "vertical" ? this.get("xDisplayName") : this.get("yDisplayName");
            },

            setter: function(val)
            {
                if(this.get("direction") == "vertical")
                {
                    this._xDisplayName = val;
                }
                else
                {
                    this._yDisplayName = val;
                }
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
                if(Y_Lang.isArray(val))
                {
                    return val;
                }
                else
                {
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
                if(Y_Lang.isArray(val))
                {
                    return val;
                }
                else
                {
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
                var marker = this.get("styles").marker;
                if(marker && marker.width && isFinite(marker.width))
                {
                    return marker.width * 0.5;
                }
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
                var marker = this.get("styles").marker;
                if(marker && marker.height && isFinite(marker.height))
                {
                    return marker.height * 0.5;
                }
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
