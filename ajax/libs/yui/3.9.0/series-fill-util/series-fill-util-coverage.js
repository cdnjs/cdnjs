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
_yuitest_coverage["build/series-fill-util/series-fill-util.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-fill-util/series-fill-util.js",
    code: []
};
_yuitest_coverage["build/series-fill-util/series-fill-util.js"].code=["YUI.add('series-fill-util', function (Y, NAME) {","","/**"," * Provides functionality for drawing fills in a series."," *"," * @module charts"," * @submodule series-fill-util"," */","var Y_Lang = Y.Lang;","","/**"," * Utility class used for drawing area fills."," *"," * @class Fills"," * @constructor"," * @submodule series-fill-util"," */","function Fills(cfg) {}","","Fills.ATTRS = {","    area: {","        getter: function()","        {","            return this._defaults || this._getAreaDefaults();","        },","","        setter: function(val)","        {","            var defaults = this._defaults || this._getAreaDefaults();","            this._defaults = Y.merge(defaults, val);","        }","    }","};","","Fills.prototype = {","    /**","     * Returns a path shape used for drawing fills.","     *","     * @method _getPath","     * @return Path","     * @private","     */","    _getPath: function()","    {","        var path = this._path;","        if(!path)","        {","            path = this.get(\"graphic\").addShape({type:\"path\"});","            this._path = path;","        }","        return path;","    },","","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} visible indicates visibilitye","     * @private","     */","    _toggleVisible: function(visible)","    {","        if(this._path)","        {","            this._path.set(\"visible\", visible);","        }","    },","","    /**","     * Draws fill","     *","     * @method drawFill","     * @param {Array} xcoords The x-coordinates for the series.","     * @param {Array} ycoords The y-coordinates for the series.","     * @protected","     */","    drawFill: function(xcoords, ycoords)","    {","        if(xcoords.length < 1)","        {","            return;","        }","        var isNumber = Y_Lang.isNumber,","            len = xcoords.length,","            firstX = xcoords[0],","            firstY = ycoords[0],","            lastValidX = firstX,","            lastValidY = firstY,","            nextX,","            nextY,","            pointValid,","            noPointsRendered = true,","            i = 0,","            styles = this.get(\"styles\").area,","            path = this._getPath(),","            color = styles.color || this._getDefaultColor(this.get(\"graphOrder\"), \"slice\");","        path.clear();","        path.set(\"fill\", {","            color: color,","            opacity: styles.alpha","        });","        path.set(\"stroke\", {weight: 0});","        for(; i < len; i = ++i)","        {","            nextX = xcoords[i];","            nextY = ycoords[i];","            pointValid = isNumber(nextX) && isNumber(nextY);","            if(!pointValid)","            {","                continue;","            }","            if(noPointsRendered)","            {","                this._firstValidX = nextX;","                this._firstValidY = nextY;","                noPointsRendered = false;","                path.moveTo(nextX, nextY);","            }","            else","            {","                path.lineTo(nextX, nextY);","            }","            lastValidX = nextX;","            lastValidY = nextY;","        }","        this._lastValidX = lastValidX;","        this._lastValidY = lastValidY;","        path.end();","    },","","    /**","     * Draws a fill for a spline","     *","     * @method drawAreaSpline","     * @protected","     */","    drawAreaSpline: function()","    {","        if(this.get(\"xcoords\").length < 1)","        {","            return;","        }","        var xcoords = this.get(\"xcoords\"),","            ycoords = this.get(\"ycoords\"),","            curvecoords = this.getCurveControlPoints(xcoords, ycoords),","            len = curvecoords.length,","            cx1,","            cx2,","            cy1,","            cy2,","            x,","            y,","            i = 0,","            firstX = xcoords[0],","            firstY = ycoords[0],","            styles = this.get(\"styles\").area,","            path = this._getPath(),","            color = styles.color || this._getDefaultColor(this.get(\"graphOrder\"), \"slice\");","        path.set(\"fill\", {","            color: color,","            opacity: styles.alpha","        });","        path.set(\"stroke\", {weight: 0});","        path.moveTo(firstX, firstY);","        for(; i < len; i = ++i)","        {","            x = curvecoords[i].endx;","            y = curvecoords[i].endy;","            cx1 = curvecoords[i].ctrlx1;","            cx2 = curvecoords[i].ctrlx2;","            cy1 = curvecoords[i].ctrly1;","            cy2 = curvecoords[i].ctrly2;","            path.curveTo(cx1, cy1, cx2, cy2, x, y);","        }","        if(this.get(\"direction\") === \"vertical\")","        {","            path.lineTo(this._leftOrigin, y);","            path.lineTo(this._leftOrigin, firstY);","        }","        else","        {","            path.lineTo(x, this._bottomOrigin);","            path.lineTo(firstX, this._bottomOrigin);","        }","        path.lineTo(firstX, firstY);","        path.end();","    },","","    /**","     * Draws a a stacked area spline","     *","     * @method drawStackedAreaSpline","     * @protected","     */","    drawStackedAreaSpline: function()","    {","        if(this.get(\"xcoords\").length < 1)","        {","            return;","        }","        var xcoords = this.get(\"xcoords\"),","            ycoords = this.get(\"ycoords\"),","            curvecoords,","            order = this.get(\"order\"),","            type = this.get(\"type\"),","            seriesCollection = this.get(\"seriesTypeCollection\"),","            prevXCoords,","            prevYCoords,","            len,","            cx1,","            cx2,","            cy1,","            cy2,","            x,","            y,","            i = 0,","            firstX,","            firstY,","            styles = this.get(\"styles\").area,","            path = this._getPath(),","            color = styles.color || this._getDefaultColor(this.get(\"graphOrder\"), \"slice\");","        firstX = xcoords[0];","        firstY = ycoords[0];","        curvecoords = this.getCurveControlPoints(xcoords, ycoords);","        len = curvecoords.length;","        path.set(\"fill\", {","            color: color,","            opacity: styles.alpha","        });","        path.set(\"stroke\", {weight: 0});","        path.moveTo(firstX, firstY);","        for(; i < len; i = ++i)","        {","            x = curvecoords[i].endx;","            y = curvecoords[i].endy;","            cx1 = curvecoords[i].ctrlx1;","            cx2 = curvecoords[i].ctrlx2;","            cy1 = curvecoords[i].ctrly1;","            cy2 = curvecoords[i].ctrly2;","            path.curveTo(cx1, cy1, cx2, cy2, x, y);","        }","        if(order > 0)","        {","            prevXCoords = seriesCollection[order - 1].get(\"xcoords\").concat().reverse();","            prevYCoords = seriesCollection[order - 1].get(\"ycoords\").concat().reverse();","            curvecoords = this.getCurveControlPoints(prevXCoords, prevYCoords);","            i = 0;","            len = curvecoords.length;","            path.lineTo(prevXCoords[0], prevYCoords[0]);","            for(; i < len; i = ++i)","            {","                x = curvecoords[i].endx;","                y = curvecoords[i].endy;","                cx1 = curvecoords[i].ctrlx1;","                cx2 = curvecoords[i].ctrlx2;","                cy1 = curvecoords[i].ctrly1;","                cy2 = curvecoords[i].ctrly2;","                path.curveTo(cx1, cy1, cx2, cy2, x, y);","            }","        }","        else","        {","            if(this.get(\"direction\") === \"vertical\")","            {","                path.lineTo(this._leftOrigin, ycoords[ycoords.length-1]);","                path.lineTo(this._leftOrigin, firstY);","            }","            else","            {","                path.lineTo(xcoords[xcoords.length-1], this._bottomOrigin);","                path.lineTo(firstX, this._bottomOrigin);","            }","","        }","        path.lineTo(firstX, firstY);","        path.end();","    },","","    /**","     * Storage for default area styles.","     *","     * @property _defaults","     * @type Object","     * @private","     */","    _defaults: null,","","    /**","     * Concatenates coordinate array with correct coordinates for closing an area fill.","     *","     * @method _getClosingPoints","     * @return Array","     * @protected","     */","    _getClosingPoints: function()","    {","        var xcoords = this.get(\"xcoords\").concat(),","            ycoords = this.get(\"ycoords\").concat(),","            firstValidIndex,","            lastValidIndex;","        if(this.get(\"direction\") === \"vertical\")","        {","            lastValidIndex = this._getLastValidIndex(xcoords);","            firstValidIndex = this._getFirstValidIndex(xcoords);","            ycoords.push(ycoords[lastValidIndex]);","            ycoords.push(ycoords[firstValidIndex]);","            xcoords.push(this._leftOrigin);","            xcoords.push(this._leftOrigin);","        }","        else","        {","            lastValidIndex = this._getLastValidIndex(ycoords);","            firstValidIndex = this._getFirstValidIndex(ycoords);","            xcoords.push(xcoords[lastValidIndex]);","            xcoords.push(xcoords[firstValidIndex]);","            ycoords.push(this._bottomOrigin);","            ycoords.push(this._bottomOrigin);","        }","        xcoords.push(xcoords[0]);","        ycoords.push(ycoords[0]);","        return [xcoords, ycoords];","    },","","    /**","     * Returns the order of the series closest to the current series that has a valid value for the current index.","     *","     * @method _getHighestValidOrder","     * @param {Array} seriesCollection Array of series of a given type.","     * @param {Number} index Index of the series item.","     * @param {Number} order Index of the the series in the seriesCollection","     * @param {String} direction Indicates the direction of the series","     * @return Number","     * @private","     */","    _getHighestValidOrder: function(seriesCollection, index, order, direction)","    {","        var coords = direction == \"vertical\" ? \"stackedXCoords\" : \"stackedYCoords\",","            coord;","        while(isNaN(coord) && order > -1)","        {","          order = order - 1;","          if(order > -1)","          {","            coord = seriesCollection[order].get(coords)[index];","          }","        }","        return order;","    },","","    /**","     * Returns an array containing the x and y coordinates for a given series and index.","     *","     * @method _getCoordsByOrderAndIndex","     * @param {Array} seriesCollection Array of series of a given type.","     * @param {Number} index Index of the series item.","     * @param {Number} order Index of the the series in the seriesCollection","     * @param {String} direction Indicates the direction of the series","     * @return Array","     * @private","     */","    _getCoordsByOrderAndIndex: function(seriesCollection, index, order, direction)","    {","        var xcoord,","            ycoord;","        if(direction == \"vertical\")","        {","            xcoord = order < 0 ? this._leftOrigin : seriesCollection[order].get(\"stackedXCoords\")[index];","            ycoord = this.get(\"stackedYCoords\")[index];","        }","        else","        {","            xcoord = this.get(\"stackedXCoords\")[index];","            ycoord = order < 0 ? this._bottomOrigin : seriesCollection[order].get(\"stackedYCoords\")[index];","        }","        return [xcoord, ycoord];","    },","","    /**","     * Concatenates coordinate array with the correct coordinates for closing an area stack.","     *","     * @method _getStackedClosingPoints","     * @return Array","     * @protected","     */","    _getStackedClosingPoints: function()","    {","        var order = this.get(\"order\"),","            type = this.get(\"type\"),","            direction = this.get(\"direction\"),","            seriesCollection = this.get(\"seriesTypeCollection\"),","            firstValidIndex,","            lastValidIndex,","            xcoords = this.get(\"stackedXCoords\"),","            ycoords = this.get(\"stackedYCoords\"),","            limit,","            previousSeries,","            previousSeriesFirstValidIndex,","            previousSeriesLastValidIndex,","            previousXCoords,","            previousYCoords,","            coords,","            closingXCoords,","            closingYCoords,","            currentIndex,","            highestValidOrder,","            oldOrder;","        if(order < 1)","        {","          return this._getClosingPoints();","        }","","        previousSeries = seriesCollection[order - 1];","        previousXCoords = previousSeries.get(\"stackedXCoords\").concat();","        previousYCoords = previousSeries.get(\"stackedYCoords\").concat();","        if(direction == \"vertical\")","        {","            firstValidIndex = this._getFirstValidIndex(xcoords);","            lastValidIndex = this._getLastValidIndex(xcoords);","            previousSeriesFirstValidIndex = previousSeries._getFirstValidIndex(previousXCoords);","            previousSeriesLastValidIndex = previousSeries._getLastValidIndex(previousXCoords);","        }","        else","        {","            firstValidIndex = this._getFirstValidIndex(ycoords);","            lastValidIndex = this._getLastValidIndex(ycoords);","            previousSeriesFirstValidIndex = previousSeries._getFirstValidIndex(previousYCoords);","            previousSeriesLastValidIndex = previousSeries._getLastValidIndex(previousYCoords);","        }","        if(previousSeriesLastValidIndex >= firstValidIndex && previousSeriesFirstValidIndex <= lastValidIndex)","        {","            previousSeriesFirstValidIndex = Math.max(firstValidIndex, previousSeriesFirstValidIndex);","            previousSeriesLastValidIndex = Math.min(lastValidIndex, previousSeriesLastValidIndex);","            previousXCoords = previousXCoords.slice(previousSeriesFirstValidIndex, previousSeriesLastValidIndex + 1);","            previousYCoords = previousYCoords.slice(previousSeriesFirstValidIndex, previousSeriesLastValidIndex + 1);","            limit = previousSeriesFirstValidIndex;","        }","        else","        {","            limit = lastValidIndex;","        }","","        closingXCoords = [xcoords[firstValidIndex]];","        closingYCoords = [ycoords[firstValidIndex]];","        currentIndex = firstValidIndex;","        while((isNaN(highestValidOrder) || highestValidOrder < order - 1) && currentIndex <= limit)","        {","            oldOrder = highestValidOrder;","            highestValidOrder = this._getHighestValidOrder(seriesCollection, currentIndex, order, direction);","            if(!isNaN(oldOrder) && highestValidOrder > oldOrder)","            {","                coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, oldOrder, direction);","                closingXCoords.push(coords[0]);","                closingYCoords.push(coords[1]);","            }","            coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, highestValidOrder, direction);","            closingXCoords.push(coords[0]);","            closingYCoords.push(coords[1]);","            currentIndex = currentIndex + 1;","        }","        if(previousXCoords && previousXCoords.length > 0 && previousSeriesLastValidIndex > firstValidIndex && previousSeriesFirstValidIndex < lastValidIndex)","        {","            closingXCoords = closingXCoords.concat(previousXCoords);","            closingYCoords = closingYCoords.concat(previousYCoords);","            highestValidOrder = order -1;","        }","        currentIndex = Math.max(firstValidIndex, previousSeriesLastValidIndex);","        order = order - 1;","        highestValidOrder = NaN;","        while(currentIndex <= lastValidIndex)","        {","            oldOrder = highestValidOrder;","            highestValidOrder = this._getHighestValidOrder(seriesCollection, currentIndex, order, direction);","            if(!isNaN(oldOrder))","            {","                if(highestValidOrder > oldOrder)","                {","                    coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, oldOrder, direction);","                    closingXCoords.push(coords[0]);","                    closingYCoords.push(coords[1]);","                }","                else if(highestValidOrder < oldOrder)","                {","                    coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex - 1, highestValidOrder, direction);","                    closingXCoords.push(coords[0]);","                    closingYCoords.push(coords[1]);","                }","            }","            coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, highestValidOrder, direction);","            closingXCoords.push(coords[0]);","            closingYCoords.push(coords[1]);","            currentIndex = currentIndex + 1;","        }","","        closingXCoords.reverse();","        closingYCoords.reverse();","        return [xcoords.concat(closingXCoords), ycoords.concat(closingYCoords)];","    },","","    /**","     * Returns default values for area styles.","     *","     * @method _getAreaDefaults","     * @return Object","     * @private","     */","    _getAreaDefaults: function()","    {","        return {","        };","    }","};","Y.augment(Fills, Y.Attribute);","Y.Fills = Fills;","","","}, '@VERSION@');"];
_yuitest_coverage["build/series-fill-util/series-fill-util.js"].lines = {"1":0,"9":0,"18":0,"20":0,"24":0,"29":0,"30":0,"35":0,"45":0,"46":0,"48":0,"49":0,"51":0,"63":0,"65":0,"79":0,"81":0,"83":0,"97":0,"98":0,"102":0,"103":0,"105":0,"106":0,"107":0,"108":0,"110":0,"112":0,"114":0,"115":0,"116":0,"117":0,"121":0,"123":0,"124":0,"126":0,"127":0,"128":0,"139":0,"141":0,"143":0,"159":0,"163":0,"164":0,"165":0,"167":0,"168":0,"169":0,"170":0,"171":0,"172":0,"173":0,"175":0,"177":0,"178":0,"182":0,"183":0,"185":0,"186":0,"197":0,"199":0,"201":0,"222":0,"223":0,"224":0,"225":0,"226":0,"230":0,"231":0,"232":0,"234":0,"235":0,"236":0,"237":0,"238":0,"239":0,"240":0,"242":0,"244":0,"245":0,"246":0,"247":0,"248":0,"249":0,"250":0,"252":0,"253":0,"254":0,"255":0,"256":0,"257":0,"258":0,"263":0,"265":0,"266":0,"270":0,"271":0,"275":0,"276":0,"297":0,"301":0,"303":0,"304":0,"305":0,"306":0,"307":0,"308":0,"312":0,"313":0,"314":0,"315":0,"316":0,"317":0,"319":0,"320":0,"321":0,"337":0,"339":0,"341":0,"342":0,"344":0,"347":0,"363":0,"365":0,"367":0,"368":0,"372":0,"373":0,"375":0,"387":0,"407":0,"409":0,"412":0,"413":0,"414":0,"415":0,"417":0,"418":0,"419":0,"420":0,"424":0,"425":0,"426":0,"427":0,"429":0,"431":0,"432":0,"433":0,"434":0,"435":0,"439":0,"442":0,"443":0,"444":0,"445":0,"447":0,"448":0,"449":0,"451":0,"452":0,"453":0,"455":0,"456":0,"457":0,"458":0,"460":0,"462":0,"463":0,"464":0,"466":0,"467":0,"468":0,"469":0,"471":0,"472":0,"473":0,"475":0,"477":0,"478":0,"479":0,"481":0,"483":0,"484":0,"485":0,"488":0,"489":0,"490":0,"491":0,"494":0,"495":0,"496":0,"508":0,"512":0,"513":0};
_yuitest_coverage["build/series-fill-util/series-fill-util.js"].functions = {"Fills:18":0,"getter:22":0,"setter:27":0,"_getPath:43":0,"_toggleVisible:61":0,"drawFill:77":0,"drawAreaSpline:137":0,"drawStackedAreaSpline:195":0,"_getClosingPoints:295":0,"_getHighestValidOrder:335":0,"_getCoordsByOrderAndIndex:361":0,"_getStackedClosingPoints:385":0,"_getAreaDefaults:506":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-fill-util/series-fill-util.js"].coveredLines = 194;
_yuitest_coverage["build/series-fill-util/series-fill-util.js"].coveredFunctions = 14;
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 1);
YUI.add('series-fill-util', function (Y, NAME) {

/**
 * Provides functionality for drawing fills in a series.
 *
 * @module charts
 * @submodule series-fill-util
 */
_yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 9);
var Y_Lang = Y.Lang;

/**
 * Utility class used for drawing area fills.
 *
 * @class Fills
 * @constructor
 * @submodule series-fill-util
 */
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 18);
function Fills(cfg) {}

_yuitest_coverline("build/series-fill-util/series-fill-util.js", 20);
Fills.ATTRS = {
    area: {
        getter: function()
        {
            _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "getter", 22);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 24);
return this._defaults || this._getAreaDefaults();
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "setter", 27);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 29);
var defaults = this._defaults || this._getAreaDefaults();
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 30);
this._defaults = Y.merge(defaults, val);
        }
    }
};

_yuitest_coverline("build/series-fill-util/series-fill-util.js", 35);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "_getPath", 43);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 45);
var path = this._path;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 46);
if(!path)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 48);
path = this.get("graphic").addShape({type:"path"});
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 49);
this._path = path;
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 51);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "_toggleVisible", 61);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 63);
if(this._path)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 65);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "drawFill", 77);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 79);
if(xcoords.length < 1)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 81);
return;
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 83);
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
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 97);
path.clear();
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 98);
path.set("fill", {
            color: color,
            opacity: styles.alpha
        });
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 102);
path.set("stroke", {weight: 0});
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 103);
for(; i < len; i = ++i)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 105);
nextX = xcoords[i];
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 106);
nextY = ycoords[i];
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 107);
pointValid = isNumber(nextX) && isNumber(nextY);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 108);
if(!pointValid)
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 110);
continue;
            }
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 112);
if(noPointsRendered)
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 114);
this._firstValidX = nextX;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 115);
this._firstValidY = nextY;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 116);
noPointsRendered = false;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 117);
path.moveTo(nextX, nextY);
            }
            else
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 121);
path.lineTo(nextX, nextY);
            }
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 123);
lastValidX = nextX;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 124);
lastValidY = nextY;
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 126);
this._lastValidX = lastValidX;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 127);
this._lastValidY = lastValidY;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 128);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "drawAreaSpline", 137);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 139);
if(this.get("xcoords").length < 1)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 141);
return;
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 143);
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
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 159);
path.set("fill", {
            color: color,
            opacity: styles.alpha
        });
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 163);
path.set("stroke", {weight: 0});
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 164);
path.moveTo(firstX, firstY);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 165);
for(; i < len; i = ++i)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 167);
x = curvecoords[i].endx;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 168);
y = curvecoords[i].endy;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 169);
cx1 = curvecoords[i].ctrlx1;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 170);
cx2 = curvecoords[i].ctrlx2;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 171);
cy1 = curvecoords[i].ctrly1;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 172);
cy2 = curvecoords[i].ctrly2;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 173);
path.curveTo(cx1, cy1, cx2, cy2, x, y);
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 175);
if(this.get("direction") === "vertical")
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 177);
path.lineTo(this._leftOrigin, y);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 178);
path.lineTo(this._leftOrigin, firstY);
        }
        else
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 182);
path.lineTo(x, this._bottomOrigin);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 183);
path.lineTo(firstX, this._bottomOrigin);
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 185);
path.lineTo(firstX, firstY);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 186);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "drawStackedAreaSpline", 195);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 197);
if(this.get("xcoords").length < 1)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 199);
return;
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 201);
var xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            curvecoords,
            order = this.get("order"),
            type = this.get("type"),
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
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 222);
firstX = xcoords[0];
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 223);
firstY = ycoords[0];
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 224);
curvecoords = this.getCurveControlPoints(xcoords, ycoords);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 225);
len = curvecoords.length;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 226);
path.set("fill", {
            color: color,
            opacity: styles.alpha
        });
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 230);
path.set("stroke", {weight: 0});
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 231);
path.moveTo(firstX, firstY);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 232);
for(; i < len; i = ++i)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 234);
x = curvecoords[i].endx;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 235);
y = curvecoords[i].endy;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 236);
cx1 = curvecoords[i].ctrlx1;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 237);
cx2 = curvecoords[i].ctrlx2;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 238);
cy1 = curvecoords[i].ctrly1;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 239);
cy2 = curvecoords[i].ctrly2;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 240);
path.curveTo(cx1, cy1, cx2, cy2, x, y);
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 242);
if(order > 0)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 244);
prevXCoords = seriesCollection[order - 1].get("xcoords").concat().reverse();
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 245);
prevYCoords = seriesCollection[order - 1].get("ycoords").concat().reverse();
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 246);
curvecoords = this.getCurveControlPoints(prevXCoords, prevYCoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 247);
i = 0;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 248);
len = curvecoords.length;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 249);
path.lineTo(prevXCoords[0], prevYCoords[0]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 250);
for(; i < len; i = ++i)
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 252);
x = curvecoords[i].endx;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 253);
y = curvecoords[i].endy;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 254);
cx1 = curvecoords[i].ctrlx1;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 255);
cx2 = curvecoords[i].ctrlx2;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 256);
cy1 = curvecoords[i].ctrly1;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 257);
cy2 = curvecoords[i].ctrly2;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 258);
path.curveTo(cx1, cy1, cx2, cy2, x, y);
            }
        }
        else
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 263);
if(this.get("direction") === "vertical")
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 265);
path.lineTo(this._leftOrigin, ycoords[ycoords.length-1]);
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 266);
path.lineTo(this._leftOrigin, firstY);
            }
            else
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 270);
path.lineTo(xcoords[xcoords.length-1], this._bottomOrigin);
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 271);
path.lineTo(firstX, this._bottomOrigin);
            }

        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 275);
path.lineTo(firstX, firstY);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 276);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "_getClosingPoints", 295);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 297);
var xcoords = this.get("xcoords").concat(),
            ycoords = this.get("ycoords").concat(),
            firstValidIndex,
            lastValidIndex;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 301);
if(this.get("direction") === "vertical")
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 303);
lastValidIndex = this._getLastValidIndex(xcoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 304);
firstValidIndex = this._getFirstValidIndex(xcoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 305);
ycoords.push(ycoords[lastValidIndex]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 306);
ycoords.push(ycoords[firstValidIndex]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 307);
xcoords.push(this._leftOrigin);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 308);
xcoords.push(this._leftOrigin);
        }
        else
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 312);
lastValidIndex = this._getLastValidIndex(ycoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 313);
firstValidIndex = this._getFirstValidIndex(ycoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 314);
xcoords.push(xcoords[lastValidIndex]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 315);
xcoords.push(xcoords[firstValidIndex]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 316);
ycoords.push(this._bottomOrigin);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 317);
ycoords.push(this._bottomOrigin);
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 319);
xcoords.push(xcoords[0]);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 320);
ycoords.push(ycoords[0]);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 321);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "_getHighestValidOrder", 335);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 337);
var coords = direction == "vertical" ? "stackedXCoords" : "stackedYCoords",
            coord;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 339);
while(isNaN(coord) && order > -1)
        {
          _yuitest_coverline("build/series-fill-util/series-fill-util.js", 341);
order = order - 1;
          _yuitest_coverline("build/series-fill-util/series-fill-util.js", 342);
if(order > -1)
          {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 344);
coord = seriesCollection[order].get(coords)[index];
          }
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 347);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "_getCoordsByOrderAndIndex", 361);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 363);
var xcoord,
            ycoord;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 365);
if(direction == "vertical")
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 367);
xcoord = order < 0 ? this._leftOrigin : seriesCollection[order].get("stackedXCoords")[index];
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 368);
ycoord = this.get("stackedYCoords")[index];
        }
        else
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 372);
xcoord = this.get("stackedXCoords")[index];
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 373);
ycoord = order < 0 ? this._bottomOrigin : seriesCollection[order].get("stackedYCoords")[index];
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 375);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "_getStackedClosingPoints", 385);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 387);
var order = this.get("order"),
            type = this.get("type"),
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
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 407);
if(order < 1)
        {
          _yuitest_coverline("build/series-fill-util/series-fill-util.js", 409);
return this._getClosingPoints();
        }

        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 412);
previousSeries = seriesCollection[order - 1];
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 413);
previousXCoords = previousSeries.get("stackedXCoords").concat();
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 414);
previousYCoords = previousSeries.get("stackedYCoords").concat();
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 415);
if(direction == "vertical")
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 417);
firstValidIndex = this._getFirstValidIndex(xcoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 418);
lastValidIndex = this._getLastValidIndex(xcoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 419);
previousSeriesFirstValidIndex = previousSeries._getFirstValidIndex(previousXCoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 420);
previousSeriesLastValidIndex = previousSeries._getLastValidIndex(previousXCoords);
        }
        else
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 424);
firstValidIndex = this._getFirstValidIndex(ycoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 425);
lastValidIndex = this._getLastValidIndex(ycoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 426);
previousSeriesFirstValidIndex = previousSeries._getFirstValidIndex(previousYCoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 427);
previousSeriesLastValidIndex = previousSeries._getLastValidIndex(previousYCoords);
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 429);
if(previousSeriesLastValidIndex >= firstValidIndex && previousSeriesFirstValidIndex <= lastValidIndex)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 431);
previousSeriesFirstValidIndex = Math.max(firstValidIndex, previousSeriesFirstValidIndex);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 432);
previousSeriesLastValidIndex = Math.min(lastValidIndex, previousSeriesLastValidIndex);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 433);
previousXCoords = previousXCoords.slice(previousSeriesFirstValidIndex, previousSeriesLastValidIndex + 1);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 434);
previousYCoords = previousYCoords.slice(previousSeriesFirstValidIndex, previousSeriesLastValidIndex + 1);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 435);
limit = previousSeriesFirstValidIndex;
        }
        else
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 439);
limit = lastValidIndex;
        }

        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 442);
closingXCoords = [xcoords[firstValidIndex]];
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 443);
closingYCoords = [ycoords[firstValidIndex]];
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 444);
currentIndex = firstValidIndex;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 445);
while((isNaN(highestValidOrder) || highestValidOrder < order - 1) && currentIndex <= limit)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 447);
oldOrder = highestValidOrder;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 448);
highestValidOrder = this._getHighestValidOrder(seriesCollection, currentIndex, order, direction);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 449);
if(!isNaN(oldOrder) && highestValidOrder > oldOrder)
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 451);
coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, oldOrder, direction);
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 452);
closingXCoords.push(coords[0]);
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 453);
closingYCoords.push(coords[1]);
            }
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 455);
coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, highestValidOrder, direction);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 456);
closingXCoords.push(coords[0]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 457);
closingYCoords.push(coords[1]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 458);
currentIndex = currentIndex + 1;
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 460);
if(previousXCoords && previousXCoords.length > 0 && previousSeriesLastValidIndex > firstValidIndex && previousSeriesFirstValidIndex < lastValidIndex)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 462);
closingXCoords = closingXCoords.concat(previousXCoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 463);
closingYCoords = closingYCoords.concat(previousYCoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 464);
highestValidOrder = order -1;
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 466);
currentIndex = Math.max(firstValidIndex, previousSeriesLastValidIndex);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 467);
order = order - 1;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 468);
highestValidOrder = NaN;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 469);
while(currentIndex <= lastValidIndex)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 471);
oldOrder = highestValidOrder;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 472);
highestValidOrder = this._getHighestValidOrder(seriesCollection, currentIndex, order, direction);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 473);
if(!isNaN(oldOrder))
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 475);
if(highestValidOrder > oldOrder)
                {
                    _yuitest_coverline("build/series-fill-util/series-fill-util.js", 477);
coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, oldOrder, direction);
                    _yuitest_coverline("build/series-fill-util/series-fill-util.js", 478);
closingXCoords.push(coords[0]);
                    _yuitest_coverline("build/series-fill-util/series-fill-util.js", 479);
closingYCoords.push(coords[1]);
                }
                else {_yuitest_coverline("build/series-fill-util/series-fill-util.js", 481);
if(highestValidOrder < oldOrder)
                {
                    _yuitest_coverline("build/series-fill-util/series-fill-util.js", 483);
coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex - 1, highestValidOrder, direction);
                    _yuitest_coverline("build/series-fill-util/series-fill-util.js", 484);
closingXCoords.push(coords[0]);
                    _yuitest_coverline("build/series-fill-util/series-fill-util.js", 485);
closingYCoords.push(coords[1]);
                }}
            }
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 488);
coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, highestValidOrder, direction);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 489);
closingXCoords.push(coords[0]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 490);
closingYCoords.push(coords[1]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 491);
currentIndex = currentIndex + 1;
        }

        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 494);
closingXCoords.reverse();
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 495);
closingYCoords.reverse();
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 496);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "_getAreaDefaults", 506);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 508);
return {
        };
    }
};
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 512);
Y.augment(Fills, Y.Attribute);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 513);
Y.Fills = Fills;


}, '@VERSION@');
