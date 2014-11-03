/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('series-stacked', function (Y, NAME) {

/**
 * Provides functionality for creating stacked series.
 *
 * @module charts
 * @submodule series-stacked
 */
var Y_Lang = Y.Lang;

/**
 * Utility class used for creating stacked series.
 *
 * @module charts
 * @class StackingUtil
 * @constructor
 * @submodule series-stacked
 */
function StackingUtil(){}

StackingUtil.prototype = {
    /**
     * Indicates whether the series is stacked.
     *
     * @property _stacked
     * @private
     */
    _stacked: true,

    /**
     * @protected
     *
     * Adjusts coordinate values for stacked series.
     *
     * @method _stackCoordinates
     */
    _stackCoordinates: function()
    {
        if(this.get("direction") === "vertical")
        {
            this._stackXCoords();
        }
        else
        {
            this._stackYCoords();
        }
    },

    /**
     * Stacks coordinates for a stacked vertical series.
     *
     * @method _stackXCoords
     * @protected
     */
    _stackXCoords: function()
    {
        var order = this.get("order"),
            seriesCollection = this.get("seriesTypeCollection"),
            i = 0,
            xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            len,
            coord,
            prevCoord,
            prevOrder,
            stackedXCoords = xcoords.concat(),
            prevXCoords,
            prevYCoords,
            nullIndices = [],
            nullIndex;
        if(order > 0)
        {
            prevXCoords = seriesCollection[order - 1].get("stackedXCoords");
            prevYCoords = seriesCollection[order - 1].get("stackedYCoords");
            len = prevXCoords.length;
        }
        else
        {
            len = xcoords.length;
        }
        for(; i < len; i = i + 1)
        {
            if(Y_Lang.isNumber(xcoords[i]))
            {
                if(order > 0)
                {
                    prevCoord = prevXCoords[i];
                    if(!Y_Lang.isNumber(prevCoord))
                    {
                        prevOrder = order;
                        while(prevOrder >  - 1 && !Y_Lang.isNumber(prevCoord))
                        {
                            prevOrder = prevOrder - 1;
                            if(prevOrder > -1)
                            {
                                prevCoord = seriesCollection[prevOrder].get("stackedXCoords")[i];
                            }
                            else
                            {
                                prevCoord = this._leftOrigin;
                            }
                        }
                    }
                    xcoords[i] = xcoords[i] + prevCoord;
                }
                stackedXCoords[i] = xcoords[i];
            }
            else
            {
                nullIndices.push(i);
            }
        }
        this._cleanXNaN(stackedXCoords, ycoords);
        len = nullIndices.length;
        if(len > 0)
        {
            for(i = 0; i < len; i = i + 1)
            {
                nullIndex = nullIndices[i];
                coord = order > 0 ? prevXCoords[nullIndex] : this._leftOrigin;
                stackedXCoords[nullIndex] =  Math.max(stackedXCoords[nullIndex], coord);
            }
        }
        this.set("stackedXCoords", stackedXCoords);
        this.set("stackedYCoords", ycoords);
    },

    /**
     * Stacks coordinates for a stacked horizontal series.
     *
     * @method _stackYCoords
     * @protected
     */
    _stackYCoords: function()
    {
        var order = this.get("order"),
            graphic = this.get("graphic"),
            h = graphic.get("height"),
            seriesCollection = this.get("seriesTypeCollection"),
            i = 0,
            xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            len,
            coord,
            prevCoord,
            prevOrder,
            stackedYCoords = ycoords.concat(),
            prevXCoords,
            prevYCoords,
            nullIndices = [],
            nullIndex;
        if(order > 0)
        {
            prevXCoords = seriesCollection[order - 1].get("stackedXCoords");
            prevYCoords = seriesCollection[order - 1].get("stackedYCoords");
            len = prevYCoords.length;
        }
        else
        {
            len = ycoords.length;
        }
        for(; i < len; i = i + 1)
        {
            if(Y_Lang.isNumber(ycoords[i]))
            {
                if(order > 0)
                {
                    prevCoord = prevYCoords[i];
                    if(!Y_Lang.isNumber(prevCoord))
                    {
                        prevOrder = order;
                        while(prevOrder >  - 1 && !Y_Lang.isNumber(prevCoord))
                        {
                            prevOrder = prevOrder - 1;
                            if(prevOrder > -1)
                            {
                                prevCoord = seriesCollection[prevOrder].get("stackedYCoords")[i];
                            }
                            else
                            {
                                prevCoord = this._bottomOrigin;
                            }
                        }
                    }
                    ycoords[i] = prevCoord - (h - ycoords[i]);
                }
                stackedYCoords[i] = ycoords[i];
            }
            else
            {
                nullIndices.push(i);
            }
        }
        this._cleanYNaN(xcoords, stackedYCoords);
        len = nullIndices.length;
        if(len > 0)
        {
            for(i = 0; i < len; i = i + 1)
            {
                nullIndex = nullIndices[i];
                coord = order > 0 ? prevYCoords[nullIndex] : h;
                stackedYCoords[nullIndex] =  Math.min(stackedYCoords[nullIndex], coord);
            }
        }
        this.set("stackedXCoords", xcoords);
        this.set("stackedYCoords", stackedYCoords);
    },

    /**
     * Cleans invalid x-coordinates by calculating their value based on the corresponding y-coordinate, the
     * previous valid x-coordinate with its corresponding y-coordinate and the next valid x-coordinate with
     * its corresponding y-coordinate. If there is no previous or next valid x-coordinate, the value will not
     * be altered.
     *
     * @method _cleanXNaN
     * @param {Array} xcoords An array of x-coordinate values
     * @param {Array} ycoords An arry of y-coordinate values
     * @private
     */
    _cleanXNaN: function(xcoords, ycoords)
    {
        var previousValidIndex,
            nextValidIndex,
            previousValidX,
            previousValidY,
            x,
            y,
            nextValidX,
            nextValidY,
            isNumber = Y_Lang.isNumber,
            m,
            i = 0,
            len = ycoords.length;
        for(; i < len; ++i)
        {
            x = xcoords[i];
            y = ycoords[i];
            //if x is invalid, calculate where it should be
            if(!isNumber(x) && i > 0 && i < len - 1)
            {
                previousValidY = ycoords[i - 1];
                //check to see if the previous value is valid
                previousValidX = this._getPreviousValidCoordValue(xcoords, i);
                nextValidY = ycoords[i + 1];
                nextValidX = this._getNextValidCoordValue(xcoords, i);
                //check to see if the next value is valid
                if(isNumber(previousValidX) && isNumber(nextValidX))
                {
                    //calculate slope and solve for x
                    m = (nextValidY - previousValidY) / (nextValidX - previousValidX);
                    xcoords[i] = (y + (m * previousValidX) - previousValidY)/m;
                }
                previousValidIndex = NaN;
                nextValidIndex = NaN;
            }
        }
    },

    /**
     * Returns the previous valid (numeric) value in an array if available.
     *
     * @method _getPreviousValidCoordValue
     * @param {Array} coords Array of values
     * @param {Number} index The index in the array in which to begin searching.
     * @return Number
     * @private
     */
    _getPreviousValidCoordValue: function(coords, index)
    {
        var coord,
            isNumber = Y_Lang.isNumber,
            limit = -1;
        while(!isNumber(coord) && index > limit)
        {
            index = index - 1;
            coord = coords[index];
        }
        return coord;
    },

    /**
     * Returns the next valid (numeric) value in an array if available.
     *
     * @method _getNextValidCoordValue
     * @param {Array} coords Array of values
     * @param {Number} index The index in the array in which to begin searching.
     * @return Number
     * @private
     */
    _getNextValidCoordValue: function(coords, index)
    {
        var coord,
            isNumber = Y_Lang.isNumber,
            limit = coords.length;
        while(!isNumber(coord) && index < limit)
        {
            index = index + 1;
            coord = coords[index];
        }
        return coord;
    },

    /**
     * Cleans invalid y-coordinates by calculating their value based on the corresponding x-coordinate, the
     * previous valid y-coordinate with its corresponding x-coordinate and the next valid y-coordinate with
     * its corresponding x-coordinate. If there is no previous or next valid y-coordinate, the value will not
     * be altered.
     *
     * @method _cleanYNaN
     * @param {Array} xcoords An array of x-coordinate values
     * @param {Array} ycoords An arry of y-coordinate values
     * @private
     */
    _cleanYNaN: function(xcoords, ycoords)
    {
        var previousValidIndex,
            nextValidIndex,
            previousValidX,
            previousValidY,
            x,
            y,
            nextValidX,
            nextValidY,
            isNumber = Y_Lang.isNumber,
            m,
            i = 0,
            len = xcoords.length;
        for(; i < len; ++i)
        {
            x = xcoords[i];
            y = ycoords[i];
            //if y is invalid, calculate where it should be
            if(!isNumber(y) && i > 0 && i < len - 1)
            {
                //check to see if the previous value is valid
                previousValidX = xcoords[i - 1];
                previousValidY = this._getPreviousValidCoordValue(ycoords, i);
                //check to see if the next value is valid
                nextValidX = xcoords[i + 1];
                nextValidY = this._getNextValidCoordValue(ycoords, i);
                if(isNumber(previousValidY) && isNumber(nextValidY))
                {
                    //calculate slope and solve for y
                    m = (nextValidY - previousValidY) / (nextValidX - previousValidX);
                    ycoords[i] = previousValidY + ((m * x) - (m * previousValidX));
                }
                previousValidIndex = NaN;
                nextValidIndex = NaN;
            }
        }
    }
};
Y.StackingUtil = StackingUtil;


}, '3.15.0', {"requires": ["axis-stacked"]});
