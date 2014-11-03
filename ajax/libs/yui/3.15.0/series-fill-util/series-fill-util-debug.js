/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('series-fill-util', function (Y, NAME) {

/**
 * Provides functionality for drawing fills in a series.
 *
 * @module charts
 * @submodule series-fill-util
 */
var Y_Lang = Y.Lang;

/**
 * Utility class used for drawing area fills.
 *
 * @class Fills
 * @constructor
 * @submodule series-fill-util
 */
function Fills() {}

Fills.ATTRS = {
    area: {
        getter: function()
        {
            return this._defaults || this._getAreaDefaults();
        },

        setter: function(val)
        {
            var defaults = this._defaults || this._getAreaDefaults();
            this._defaults = Y.merge(defaults, val);
        }
    }
};

Fills.prototype = {
    /**
     * Returns a path shape used for drawing fills.
     *
     * @method _getPath
     * @return Path
     * @private
     */
    _getPath: function()
    {
        var path = this._path;
        if(!path)
        {
            path = this.get("graphic").addShape({type:"path"});
            this._path = path;
        }
        return path;
    },

    /**
     * Toggles visibility
     *
     * @method _toggleVisible
     * @param {Boolean} visible indicates visibilitye
     * @private
     */
    _toggleVisible: function(visible)
    {
        if(this._path)
        {
            this._path.set("visible", visible);
        }
    },

    /**
     * Draws fill
     *
     * @method drawFill
     * @param {Array} xcoords The x-coordinates for the series.
     * @param {Array} ycoords The y-coordinates for the series.
     * @protected
     */
    drawFill: function(xcoords, ycoords)
    {
        if(xcoords.length < 1)
        {
            return;
        }
        var isNumber = Y_Lang.isNumber,
            len = xcoords.length,
            firstX = xcoords[0],
            firstY = ycoords[0],
            lastValidX = firstX,
            lastValidY = firstY,
            nextX,
            nextY,
            pointValid,
            noPointsRendered = true,
            i = 0,
            styles = this.get("styles").area,
            path = this._getPath(),
            color = styles.color || this._getDefaultColor(this.get("graphOrder"), "slice");
        path.clear();
        path.set("fill", {
            color: color,
            opacity: styles.alpha
        });
        path.set("stroke", {weight: 0});
        for(; i < len; i = ++i)
        {
            nextX = xcoords[i];
            nextY = ycoords[i];
            pointValid = isNumber(nextX) && isNumber(nextY);
            if(!pointValid)
            {
                continue;
            }
            if(noPointsRendered)
            {
                this._firstValidX = nextX;
                this._firstValidY = nextY;
                noPointsRendered = false;
                path.moveTo(nextX, nextY);
            }
            else
            {
                path.lineTo(nextX, nextY);
            }
            lastValidX = nextX;
            lastValidY = nextY;
        }
        this._lastValidX = lastValidX;
        this._lastValidY = lastValidY;
        path.end();
    },

    /**
     * Draws a fill for a spline
     *
     * @method drawAreaSpline
     * @protected
     */
    drawAreaSpline: function()
    {
        if(this.get("xcoords").length < 1)
        {
            return;
        }
        var xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            curvecoords = this.getCurveControlPoints(xcoords, ycoords),
            len = curvecoords.length,
            cx1,
            cx2,
            cy1,
            cy2,
            x,
            y,
            i = 0,
            firstX = xcoords[0],
            firstY = ycoords[0],
            styles = this.get("styles").area,
            path = this._getPath(),
            color = styles.color || this._getDefaultColor(this.get("graphOrder"), "slice");
        path.set("fill", {
            color: color,
            opacity: styles.alpha
        });
        path.set("stroke", {weight: 0});
        path.moveTo(firstX, firstY);
        for(; i < len; i = ++i)
        {
            x = curvecoords[i].endx;
            y = curvecoords[i].endy;
            cx1 = curvecoords[i].ctrlx1;
            cx2 = curvecoords[i].ctrlx2;
            cy1 = curvecoords[i].ctrly1;
            cy2 = curvecoords[i].ctrly2;
            path.curveTo(cx1, cy1, cx2, cy2, x, y);
        }
        if(this.get("direction") === "vertical")
        {
            path.lineTo(this._leftOrigin, y);
            path.lineTo(this._leftOrigin, firstY);
        }
        else
        {
            path.lineTo(x, this._bottomOrigin);
            path.lineTo(firstX, this._bottomOrigin);
        }
        path.lineTo(firstX, firstY);
        path.end();
    },

    /**
     * Draws a a stacked area spline
     *
     * @method drawStackedAreaSpline
     * @protected
     */
    drawStackedAreaSpline: function()
    {
        if(this.get("xcoords").length < 1)
        {
            return;
        }
        var xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            curvecoords,
            order = this.get("order"),
            seriesCollection = this.get("seriesTypeCollection"),
            prevXCoords,
            prevYCoords,
            len,
            cx1,
            cx2,
            cy1,
            cy2,
            x,
            y,
            i = 0,
            firstX,
            firstY,
            styles = this.get("styles").area,
            path = this._getPath(),
            color = styles.color || this._getDefaultColor(this.get("graphOrder"), "slice");
        firstX = xcoords[0];
        firstY = ycoords[0];
        curvecoords = this.getCurveControlPoints(xcoords, ycoords);
        len = curvecoords.length;
        path.set("fill", {
            color: color,
            opacity: styles.alpha
        });
        path.set("stroke", {weight: 0});
        path.moveTo(firstX, firstY);
        for(; i < len; i = ++i)
        {
            x = curvecoords[i].endx;
            y = curvecoords[i].endy;
            cx1 = curvecoords[i].ctrlx1;
            cx2 = curvecoords[i].ctrlx2;
            cy1 = curvecoords[i].ctrly1;
            cy2 = curvecoords[i].ctrly2;
            path.curveTo(cx1, cy1, cx2, cy2, x, y);
        }
        if(order > 0)
        {
            prevXCoords = seriesCollection[order - 1].get("xcoords").concat().reverse();
            prevYCoords = seriesCollection[order - 1].get("ycoords").concat().reverse();
            curvecoords = this.getCurveControlPoints(prevXCoords, prevYCoords);
            i = 0;
            len = curvecoords.length;
            path.lineTo(prevXCoords[0], prevYCoords[0]);
            for(; i < len; i = ++i)
            {
                x = curvecoords[i].endx;
                y = curvecoords[i].endy;
                cx1 = curvecoords[i].ctrlx1;
                cx2 = curvecoords[i].ctrlx2;
                cy1 = curvecoords[i].ctrly1;
                cy2 = curvecoords[i].ctrly2;
                path.curveTo(cx1, cy1, cx2, cy2, x, y);
            }
        }
        else
        {
            if(this.get("direction") === "vertical")
            {
                path.lineTo(this._leftOrigin, ycoords[ycoords.length-1]);
                path.lineTo(this._leftOrigin, firstY);
            }
            else
            {
                path.lineTo(xcoords[xcoords.length-1], this._bottomOrigin);
                path.lineTo(firstX, this._bottomOrigin);
            }

        }
        path.lineTo(firstX, firstY);
        path.end();
    },

    /**
     * Storage for default area styles.
     *
     * @property _defaults
     * @type Object
     * @private
     */
    _defaults: null,

    /**
     * Concatenates coordinate array with correct coordinates for closing an area fill.
     *
     * @method _getClosingPoints
     * @return Array
     * @protected
     */
    _getClosingPoints: function()
    {
        var xcoords = this.get("xcoords").concat(),
            ycoords = this.get("ycoords").concat(),
            firstValidIndex,
            lastValidIndex;
        if(this.get("direction") === "vertical")
        {
            lastValidIndex = this._getLastValidIndex(xcoords);
            firstValidIndex = this._getFirstValidIndex(xcoords);
            ycoords.push(ycoords[lastValidIndex]);
            ycoords.push(ycoords[firstValidIndex]);
            xcoords.push(this._leftOrigin);
            xcoords.push(this._leftOrigin);
        }
        else
        {
            lastValidIndex = this._getLastValidIndex(ycoords);
            firstValidIndex = this._getFirstValidIndex(ycoords);
            xcoords.push(xcoords[lastValidIndex]);
            xcoords.push(xcoords[firstValidIndex]);
            ycoords.push(this._bottomOrigin);
            ycoords.push(this._bottomOrigin);
        }
        xcoords.push(xcoords[0]);
        ycoords.push(ycoords[0]);
        return [xcoords, ycoords];
    },

    /**
     * Returns the order of the series closest to the current series that has a valid value for the current index.
     *
     * @method _getHighestValidOrder
     * @param {Array} seriesCollection Array of series of a given type.
     * @param {Number} index Index of the series item.
     * @param {Number} order Index of the the series in the seriesCollection
     * @param {String} direction Indicates the direction of the series
     * @return Number
     * @private
     */
    _getHighestValidOrder: function(seriesCollection, index, order, direction)
    {
        var coords = direction === "vertical" ? "stackedXCoords" : "stackedYCoords",
            coord;
        while(isNaN(coord) && order > -1)
        {
          order = order - 1;
          if(order > -1)
          {
            coord = seriesCollection[order].get(coords)[index];
          }
        }
        return order;
    },

    /**
     * Returns an array containing the x and y coordinates for a given series and index.
     *
     * @method _getCoordsByOrderAndIndex
     * @param {Array} seriesCollection Array of series of a given type.
     * @param {Number} index Index of the series item.
     * @param {Number} order Index of the the series in the seriesCollection
     * @param {String} direction Indicates the direction of the series
     * @return Array
     * @private
     */
    _getCoordsByOrderAndIndex: function(seriesCollection, index, order, direction)
    {
        var xcoord,
            ycoord;
        if(direction === "vertical")
        {
            xcoord = order < 0 ? this._leftOrigin : seriesCollection[order].get("stackedXCoords")[index];
            ycoord = this.get("stackedYCoords")[index];
        }
        else
        {
            xcoord = this.get("stackedXCoords")[index];
            ycoord = order < 0 ? this._bottomOrigin : seriesCollection[order].get("stackedYCoords")[index];
        }
        return [xcoord, ycoord];
    },

    /**
     * Concatenates coordinate array with the correct coordinates for closing an area stack.
     *
     * @method _getStackedClosingPoints
     * @return Array
     * @protected
     */
    _getStackedClosingPoints: function()
    {
        var order = this.get("order"),
            direction = this.get("direction"),
            seriesCollection = this.get("seriesTypeCollection"),
            firstValidIndex,
            lastValidIndex,
            xcoords = this.get("stackedXCoords"),
            ycoords = this.get("stackedYCoords"),
            limit,
            previousSeries,
            previousSeriesFirstValidIndex,
            previousSeriesLastValidIndex,
            previousXCoords,
            previousYCoords,
            coords,
            closingXCoords,
            closingYCoords,
            currentIndex,
            highestValidOrder,
            oldOrder;
        if(order < 1)
        {
          return this._getClosingPoints();
        }

        previousSeries = seriesCollection[order - 1];
        previousXCoords = previousSeries.get("stackedXCoords").concat();
        previousYCoords = previousSeries.get("stackedYCoords").concat();
        if(direction === "vertical")
        {
            firstValidIndex = this._getFirstValidIndex(xcoords);
            lastValidIndex = this._getLastValidIndex(xcoords);
            previousSeriesFirstValidIndex = previousSeries._getFirstValidIndex(previousXCoords);
            previousSeriesLastValidIndex = previousSeries._getLastValidIndex(previousXCoords);
        }
        else
        {
            firstValidIndex = this._getFirstValidIndex(ycoords);
            lastValidIndex = this._getLastValidIndex(ycoords);
            previousSeriesFirstValidIndex = previousSeries._getFirstValidIndex(previousYCoords);
            previousSeriesLastValidIndex = previousSeries._getLastValidIndex(previousYCoords);
        }
        if(previousSeriesLastValidIndex >= firstValidIndex && previousSeriesFirstValidIndex <= lastValidIndex)
        {
            previousSeriesFirstValidIndex = Math.max(firstValidIndex, previousSeriesFirstValidIndex);
            previousSeriesLastValidIndex = Math.min(lastValidIndex, previousSeriesLastValidIndex);
            previousXCoords = previousXCoords.slice(previousSeriesFirstValidIndex, previousSeriesLastValidIndex + 1);
            previousYCoords = previousYCoords.slice(previousSeriesFirstValidIndex, previousSeriesLastValidIndex + 1);
            limit = previousSeriesFirstValidIndex;
        }
        else
        {
            limit = lastValidIndex;
        }

        closingXCoords = [xcoords[firstValidIndex]];
        closingYCoords = [ycoords[firstValidIndex]];
        currentIndex = firstValidIndex;
        while((isNaN(highestValidOrder) || highestValidOrder < order - 1) && currentIndex <= limit)
        {
            oldOrder = highestValidOrder;
            highestValidOrder = this._getHighestValidOrder(seriesCollection, currentIndex, order, direction);
            if(!isNaN(oldOrder) && highestValidOrder > oldOrder)
            {
                coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, oldOrder, direction);
                closingXCoords.push(coords[0]);
                closingYCoords.push(coords[1]);
            }
            coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, highestValidOrder, direction);
            closingXCoords.push(coords[0]);
            closingYCoords.push(coords[1]);
            currentIndex = currentIndex + 1;
        }
        if(previousXCoords &&
            previousXCoords.length > 0 &&
            previousSeriesLastValidIndex > firstValidIndex &&
            previousSeriesFirstValidIndex < lastValidIndex)
        {
            closingXCoords = closingXCoords.concat(previousXCoords);
            closingYCoords = closingYCoords.concat(previousYCoords);
            highestValidOrder = order -1;
        }
        currentIndex = Math.max(firstValidIndex, previousSeriesLastValidIndex);
        order = order - 1;
        highestValidOrder = NaN;
        while(currentIndex <= lastValidIndex)
        {
            oldOrder = highestValidOrder;
            highestValidOrder = this._getHighestValidOrder(seriesCollection, currentIndex, order, direction);
            if(!isNaN(oldOrder))
            {
                if(highestValidOrder > oldOrder)
                {
                    coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, oldOrder, direction);
                    closingXCoords.push(coords[0]);
                    closingYCoords.push(coords[1]);
                }
                else if(highestValidOrder < oldOrder)
                {
                    coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex - 1, highestValidOrder, direction);
                    closingXCoords.push(coords[0]);
                    closingYCoords.push(coords[1]);
                }
            }
            coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, highestValidOrder, direction);
            closingXCoords.push(coords[0]);
            closingYCoords.push(coords[1]);
            currentIndex = currentIndex + 1;
        }

        closingXCoords.reverse();
        closingYCoords.reverse();
        return [xcoords.concat(closingXCoords), ycoords.concat(closingYCoords)];
    },

    /**
     * Returns default values for area styles.
     *
     * @method _getAreaDefaults
     * @return Object
     * @private
     */
    _getAreaDefaults: function()
    {
        return {
        };
    }
};
Y.augment(Fills, Y.Attribute);
Y.Fills = Fills;


}, '3.15.0');
