/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('series-histogram-base', function (Y, NAME) {

/**
 * Provides core functionality for creating a bar or column series.
 *
 * @module charts
 * @submodule series-histogram
 */
var Y_Lang = Y.Lang;

/**
 * Histogram is the base class for Column and Bar series.
 *
 * @class Histogram
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-histogram
 */
function Histogram(){}

Histogram.prototype = {
    /**
     * Draws the series.
     *
     * @method drawSeries
     * @protected
     */
    drawSeries: function()
    {
        if(this.get("xcoords").length < 1)
        {
            return;
        }
        var style = this._copyObject(this.get("styles").marker),
            graphic = this.get("graphic"),
            setSize,
            calculatedSize,
            xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            i = 0,
            len = xcoords.length,
            top = ycoords[0],
            seriesTypeCollection = this.get("seriesTypeCollection"),
            seriesLen = seriesTypeCollection ? seriesTypeCollection.length : 0,
            seriesSize = 0,
            totalSize = 0,
            offset = 0,
            ratio,
            renderer,
            order = this.get("order"),
            graphOrder = this.get("graphOrder"),
            left,
            marker,
            setSizeKey,
            calculatedSizeKey,
            config,
            fillColors = null,
            borderColors = null,
            xMarkerPlane = [],
            yMarkerPlane = [],
            xMarkerPlaneLeft,
            xMarkerPlaneRight,
            yMarkerPlaneTop,
            yMarkerPlaneBottom,
            dimensions = {
                width: [],
                height: []
            },
            xvalues = [],
            yvalues = [],
            groupMarkers = this.get("groupMarkers");
        if(Y_Lang.isArray(style.fill.color))
        {
            fillColors = style.fill.color.concat();
        }
        if(Y_Lang.isArray(style.border.color))
        {
            borderColors = style.border.color.concat();
        }
        if(this.get("direction") === "vertical")
        {
            setSizeKey = "height";
            calculatedSizeKey = "width";
        }
        else
        {
            setSizeKey = "width";
            calculatedSizeKey = "height";
        }
        setSize = style[setSizeKey];
        calculatedSize = style[calculatedSizeKey];
        this._createMarkerCache();
        this._maxSize = graphic.get(setSizeKey);
        if(seriesTypeCollection && seriesLen > 1)
        {
            for(; i < seriesLen; ++i)
            {
                renderer = seriesTypeCollection[i];
                seriesSize += renderer.get("styles").marker[setSizeKey];
                if(order > i)
                {
                    offset = seriesSize;
                }
            }
            totalSize = len * seriesSize;
            if(totalSize > this._maxSize)
            {
                ratio = graphic.get(setSizeKey)/totalSize;
                seriesSize *= ratio;
                offset *= ratio;
                setSize *= ratio;
                setSize = Math.max(setSize, 1);
                this._maxSize = setSize;
            }
        }
        else
        {
            seriesSize = style[setSizeKey];
            totalSize = len * seriesSize;
            if(totalSize > this._maxSize)
            {
                seriesSize = this._maxSize/len;
                this._maxSize = seriesSize;
            }
        }
        offset -= seriesSize/2;
        for(i = 0; i < len; ++i)
        {
            xMarkerPlaneLeft = xcoords[i] - seriesSize/2;
            xMarkerPlaneRight = xMarkerPlaneLeft + seriesSize;
            yMarkerPlaneTop = ycoords[i] - seriesSize/2;
            yMarkerPlaneBottom = yMarkerPlaneTop + seriesSize;
            xMarkerPlane.push({start: xMarkerPlaneLeft, end: xMarkerPlaneRight});
            yMarkerPlane.push({start: yMarkerPlaneTop, end: yMarkerPlaneBottom});
            if(!groupMarkers && (isNaN(xcoords[i]) || isNaN(ycoords[i])))
            {
                this._markers.push(null);
                continue;
            }
            config = this._getMarkerDimensions(xcoords[i], ycoords[i], calculatedSize, offset);
            if(!isNaN(config.calculatedSize) && config.calculatedSize > 0)
            {
                top = config.top;
                left = config.left;

                if(groupMarkers)
                {
                    dimensions[setSizeKey][i] = setSize;
                    dimensions[calculatedSizeKey][i] = config.calculatedSize;
                    xvalues.push(left);
                    yvalues.push(top);
                }
                else
                {
                    style[setSizeKey] = setSize;
                    style[calculatedSizeKey] = config.calculatedSize;
                    style.x = left;
                    style.y = top;
                    if(fillColors)
                    {
                        style.fill.color = fillColors[i % fillColors.length];
                    }
                    if(borderColors)
                    {
                        style.border.color = borderColors[i % borderColors.length];
                    }
                    marker = this.getMarker(style, graphOrder, i);
                }

            }
            else if(!groupMarkers)
            {
                this._markers.push(null);
            }
        }
        this.set("xMarkerPlane", xMarkerPlane);
        this.set("yMarkerPlane", yMarkerPlane);
        if(groupMarkers)
        {
            this._createGroupMarker({
                fill: style.fill,
                border: style.border,
                dimensions: dimensions,
                xvalues: xvalues,
                yvalues: yvalues,
                shape: style.shape
            });
        }
        else
        {
            this._clearMarkerCache();
        }
    },

    /**
     * Collection of default colors used for marker fills in a series when not specified by user.
     *
     * @property _defaultFillColors
     * @type Array
     * @protected
     */
    _defaultFillColors: ["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"],

    /**
     * Gets the default style values for the markers.
     *
     * @method _getPlotDefaults
     * @return Object
     * @private
     */
    _getPlotDefaults: function()
    {
        var defs = {
            fill:{
                type: "solid",
                alpha: 1,
                colors:null,
                alphas: null,
                ratios: null
            },
            border:{
                weight: 0,
                alpha: 1
            },
            width: 12,
            height: 12,
            shape: "rect",

            padding:{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        };
        defs.fill.color = this._getDefaultColor(this.get("graphOrder"), "fill");
        defs.border.color = this._getDefaultColor(this.get("graphOrder"), "border");
        return defs;
    }
};

Y.Histogram = Histogram;


}, '3.15.0', {"requires": ["series-cartesian", "series-plot-util"]});
