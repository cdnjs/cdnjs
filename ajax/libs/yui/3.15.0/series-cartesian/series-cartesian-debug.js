/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

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
        this._stylesChangeHandle = this.after("stylesChange", function() {
            var axesReady = this._updateAxisBase();
            if(axesReady)
            {
                this.draw();
            }
        });
        this._widthChangeHandle = this.after("widthChange", function() {
            var axesReady = this._updateAxisBase();
            if(axesReady)
            {
                this.draw();
            }
        });
        this._heightChangeHandle = this.after("heightChange", function() {
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
    _xAxisChangeHandler: function()
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
    _yAxisChangeHandler: function()
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
    _xDataChangeHandler: function()
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
    _yDataChangeHandler: function()
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
            xOffset = xAxis.getEdgeOffset(xAxis.getTotalMajorUnits(), w),
            yOffset = yAxis.getEdgeOffset(yAxis.getTotalMajorUnits(), h),
            padding = this.get("styles").padding,
			leftPadding = padding.left,
			topPadding = padding.top,
			dataWidth = w - (leftPadding + padding.right + xOffset * 2),
			dataHeight = h - (topPadding + padding.bottom + yOffset * 2),
			xMax = xAxis.get("maximum"),
			xMin = xAxis.get("minimum"),
			yMax = yAxis.get("maximum"),
			yMin = yAxis.get("minimum"),
            graphic = this.get("graphic"),
            yAxisType = yAxis.get("type"),
            reverseYCoords = (yAxisType === "numeric" || yAxisType === "stacked"),
            xcoords,
            ycoords,
            xOriginValue = xAxis.getOrigin(),
            yOriginValue = yAxis.getOrigin();
        graphic.set("width", w);
        graphic.set("height", h);
        xOffset = xOffset + leftPadding;
        yOffset = reverseYCoords ? yOffset + dataHeight + topPadding + padding.bottom : topPadding + yOffset;
        this._leftOrigin = Math.round(xAxis._getCoordFromValue(xMin, xMax, dataWidth, xOriginValue, xOffset, false));
        this._bottomOrigin = Math.round(yAxis._getCoordFromValue(yMin, yMax, dataHeight, yOriginValue, yOffset, reverseYCoords));

        xcoords = this._getCoords(xMin, xMax, dataWidth, xData, xAxis, xOffset, false);
        ycoords = this._getCoords(yMin, yMax, dataHeight, yData, yAxis, yOffset, reverseYCoords);
        this.set("xcoords", xcoords);
		this.set("ycoords", ycoords);
        this._dataLength = dataLength;
        this._setXMarkerPlane(xcoords, dataLength);
        this._setYMarkerPlane(ycoords, dataLength);
    },

    /**
     * Returns either an array coordinates or an object key valued arrays of coordinates depending on the input.
     * If the input data is an array, an array is returned. If the input data is an object, an object will be returned.
     *
     * @method _getCoords
     * @param {Number} min The minimum value of the range of data.
     * @param {Number} max The maximum value of the range of data.
     * @param {Number} length The length, in pixels, of across which the coordinates will be calculated.
     * @param {AxisBase} axis The axis in which the data is bound.
     * @param {Number} offset The value in which to offet the first coordinate.
     * @param {Boolean} reverse Indicates whether to calculate the coordinates in reverse order.
     * @return Array|Object
     * @private
     */
    _getCoords: function(min, max, length, data, axis, offset, reverse)
    {
        var coords,
            key;
        if(Y_Lang.isArray(data))
        {
            coords = axis._getCoordsFromValues(min, max, length, data, offset, reverse);
        }
        else
        {
            coords = {};
            for(key in data)
            {
                if(data.hasOwnProperty(key))
                {
                    coords[key] = this._getCoords.apply(this, [min, max, length, data[key], axis, offset, reverse]);
                }
            }
        }
        return coords;
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
        var copy,
            key;
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
            if((isFinite(w) && isFinite(h) && w > 0 && h > 0) &&
                ((this.get("xData") && this.get("yData")) ||
                this._updateAxisBase()))
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
     * Destructor implementation for the CartesianSeries class.
     * Calls destroy on all Graphic instances.
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
            if(this._xAxisChangeHandle)
            {
                this._xAxisChangeHandle.detach();
            }
            if(this._yAxisChangeHandle)
            {
                this._yAxisChangeHandle.detach();
            }
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
                return this.get("direction") === "vertical" ? this.get("yDisplayName") : this.get("xDisplayName");
            },

            setter: function(val)
            {
                if(this.get("direction") === "vertical")
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
                return this.get("direction") === "vertical" ? this.get("xDisplayName") : this.get("yDisplayName");
            },

            setter: function(val)
            {
                if(this.get("direction") === "vertical")
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


}, '3.15.0', {"requires": ["series-base"]});
