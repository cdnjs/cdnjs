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
_yuitest_coverage["build/series-fill-util/series-fill-util.js"].code=["YUI.add('series-fill-util', function (Y, NAME) {","","/**"," * Provides functionality for drawing fills in a series."," *"," * @module charts"," * @submodule series-fill-util"," */","var Y_Lang = Y.Lang;","","/**"," * Utility class used for drawing area fills."," *"," * @class Fills"," * @constructor"," * @submodule series-fill-util"," */","function Fills(cfg)","{","    var attrs = {","        area: {","            getter: function()","            {","                return this._defaults || this._getAreaDefaults();","            },","","            setter: function(val)","            {","                var defaults = this._defaults || this._getAreaDefaults();","                this._defaults = Y.merge(defaults, val);","            }","        }","    };","    this.addAttrs(attrs, cfg);","    this.get(\"styles\");","}","","Fills.prototype = {","    /**","     * Returns a path shape used for drawing fills.","     *","     * @method _getPath","     * @return Path","     * @private","     */","    _getPath: function()","    {","        var path = this._path;","        if(!path)","        {","            path = this.get(\"graphic\").addShape({type:\"path\"});","            this._path = path;","        }","        return path;","    },","","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} visible indicates visibilitye","     * @private","     */","    _toggleVisible: function(visible)","    {","        if(this._path)","        {","            this._path.set(\"visible\", visible);","        }","    },","","    /**","     * Draws fill","     *","     * @method drawFill","     * @param {Array} xcoords The x-coordinates for the series.","     * @param {Array} ycoords The y-coordinates for the series.","     * @protected","     */","    drawFill: function(xcoords, ycoords)","    {","        if(xcoords.length < 1)","        {","            return;","        }","        var isNumber = Y_Lang.isNumber,","            len = xcoords.length,","            firstX = xcoords[0],","            firstY = ycoords[0],","            lastValidX = firstX,","            lastValidY = firstY,","            nextX,","            nextY,","            pointValid,","            noPointsRendered = true,","            i = 0,","            styles = this.get(\"styles\").area,","            path = this._getPath(),","            color = styles.color || this._getDefaultColor(this.get(\"graphOrder\"), \"slice\");","        path.clear();","        path.set(\"fill\", {","            color: color,","            opacity: styles.alpha","        });","        path.set(\"stroke\", {weight: 0});","        for(; i < len; i = ++i)","        {","            nextX = xcoords[i];","            nextY = ycoords[i];","            pointValid = isNumber(nextX) && isNumber(nextY);","            if(!pointValid)","            {","                continue;","            }","            if(noPointsRendered)","            {","                this._firstValidX = nextX;","                this._firstValidY = nextY;","                noPointsRendered = false;","                path.moveTo(nextX, nextY);","            }","            else","            {","                path.lineTo(nextX, nextY);","            }","            lastValidX = nextX;","            lastValidY = nextY;","        }","        this._lastValidX = lastValidX;","        this._lastValidY = lastValidY;","        path.end();","    },","","    /**","     * Draws a fill for a spline","     *","     * @method drawAreaSpline","     * @protected","     */","    drawAreaSpline: function()","    {","        if(this.get(\"xcoords\").length < 1)","        {","            return;","        }","        var xcoords = this.get(\"xcoords\"),","            ycoords = this.get(\"ycoords\"),","            curvecoords = this.getCurveControlPoints(xcoords, ycoords),","            len = curvecoords.length,","            cx1,","            cx2,","            cy1,","            cy2,","            x,","            y,","            i = 0,","            firstX = xcoords[0],","            firstY = ycoords[0],","            styles = this.get(\"styles\").area,","            path = this._getPath(),","            color = styles.color || this._getDefaultColor(this.get(\"graphOrder\"), \"slice\");","        path.set(\"fill\", {","            color: color,","            opacity: styles.alpha","        });","        path.set(\"stroke\", {weight: 0});","        path.moveTo(firstX, firstY);","        for(; i < len; i = ++i)","        {","            x = curvecoords[i].endx;","            y = curvecoords[i].endy;","            cx1 = curvecoords[i].ctrlx1;","            cx2 = curvecoords[i].ctrlx2;","            cy1 = curvecoords[i].ctrly1;","            cy2 = curvecoords[i].ctrly2;","            path.curveTo(cx1, cy1, cx2, cy2, x, y);","        }","        if(this.get(\"direction\") === \"vertical\")","        {","            path.lineTo(this._leftOrigin, y);","            path.lineTo(this._leftOrigin, firstY);","        }","        else","        {","            path.lineTo(x, this._bottomOrigin);","            path.lineTo(firstX, this._bottomOrigin);","        }","        path.lineTo(firstX, firstY);","        path.end();","    },","","    /**","     * Draws a a stacked area spline","     *","     * @method drawStackedAreaSpline","     * @protected","     */","    drawStackedAreaSpline: function()","    {","        if(this.get(\"xcoords\").length < 1)","        {","            return;","        }","        var xcoords = this.get(\"xcoords\"),","            ycoords = this.get(\"ycoords\"),","            curvecoords,","            order = this.get(\"order\"),","            type = this.get(\"type\"),","            seriesCollection = this.get(\"seriesTypeCollection\"),","            prevXCoords,","            prevYCoords,","            len,","            cx1,","            cx2,","            cy1,","            cy2,","            x,","            y,","            i = 0,","            firstX,","            firstY,","            styles = this.get(\"styles\").area,","            path = this._getPath(),","            color = styles.color || this._getDefaultColor(this.get(\"graphOrder\"), \"slice\");","        firstX = xcoords[0];","        firstY = ycoords[0];","        curvecoords = this.getCurveControlPoints(xcoords, ycoords);","        len = curvecoords.length;","        path.set(\"fill\", {","            color: color,","            opacity: styles.alpha","        });","        path.set(\"stroke\", {weight: 0});","        path.moveTo(firstX, firstY);","        for(; i < len; i = ++i)","        {","            x = curvecoords[i].endx;","            y = curvecoords[i].endy;","            cx1 = curvecoords[i].ctrlx1;","            cx2 = curvecoords[i].ctrlx2;","            cy1 = curvecoords[i].ctrly1;","            cy2 = curvecoords[i].ctrly2;","            path.curveTo(cx1, cy1, cx2, cy2, x, y);","        }","        if(order > 0)","        {","            prevXCoords = seriesCollection[order - 1].get(\"xcoords\").concat().reverse();","            prevYCoords = seriesCollection[order - 1].get(\"ycoords\").concat().reverse();","            curvecoords = this.getCurveControlPoints(prevXCoords, prevYCoords);","            i = 0;","            len = curvecoords.length;","            path.lineTo(prevXCoords[0], prevYCoords[0]);","            for(; i < len; i = ++i)","            {","                x = curvecoords[i].endx;","                y = curvecoords[i].endy;","                cx1 = curvecoords[i].ctrlx1;","                cx2 = curvecoords[i].ctrlx2;","                cy1 = curvecoords[i].ctrly1;","                cy2 = curvecoords[i].ctrly2;","                path.curveTo(cx1, cy1, cx2, cy2, x, y);","            }","        }","        else","        {","            if(this.get(\"direction\") === \"vertical\")","            {","                path.lineTo(this._leftOrigin, ycoords[ycoords.length-1]);","                path.lineTo(this._leftOrigin, firstY);","            }","            else","            {","                path.lineTo(xcoords[xcoords.length-1], this._bottomOrigin);","                path.lineTo(firstX, this._bottomOrigin);","            }","","        }","        path.lineTo(firstX, firstY);","        path.end();","    },","","    /**","     * Storage for default area styles.","     *","     * @property _defaults","     * @type Object","     * @private","     */","    _defaults: null,","","    /**","     * Concatenates coordinate array with correct coordinates for closing an area fill.","     *","     * @method _getClosingPoints","     * @return Array","     * @protected","     */","    _getClosingPoints: function()","    {","        var xcoords = this.get(\"xcoords\").concat(),","            ycoords = this.get(\"ycoords\").concat(),","            firstValidIndex,","            lastValidIndex;","        if(this.get(\"direction\") === \"vertical\")","        {","            lastValidIndex = this._getLastValidIndex(xcoords);","            firstValidIndex = this._getFirstValidIndex(xcoords);","            ycoords.push(ycoords[lastValidIndex]);","            ycoords.push(ycoords[firstValidIndex]);","            xcoords.push(this._leftOrigin);","            xcoords.push(this._leftOrigin);","        }","        else","        {","            lastValidIndex = this._getLastValidIndex(ycoords);","            firstValidIndex = this._getFirstValidIndex(ycoords);","            xcoords.push(xcoords[lastValidIndex]);","            xcoords.push(xcoords[firstValidIndex]);","            ycoords.push(this._bottomOrigin);","            ycoords.push(this._bottomOrigin);","        }","        xcoords.push(xcoords[0]);","        ycoords.push(ycoords[0]);","        return [xcoords, ycoords];","    },","","    /**","     * Returns the order of the series closest to the current series that has a valid value for the current index.","     *","     * @method _getHighestValidOrder","     * @param {Array} seriesCollection Array of series of a given type.","     * @param {Number} index Index of the series item.","     * @param {Number} order Index of the the series in the seriesCollection","     * @param {String} direction Indicates the direction of the series","     * @return Number","     * @private","     */","    _getHighestValidOrder: function(seriesCollection, index, order, direction)","    {","        var coords = direction == \"vertical\" ? \"stackedXCoords\" : \"stackedYCoords\",","            coord;","        while(isNaN(coord) && order > -1)","        {","          order = order - 1;","          if(order > -1)","          {","            coord = seriesCollection[order].get(coords)[index];","          }","        }","        return order;","    },","","    /**","     * Returns an array containing the x and y coordinates for a given series and index.","     *","     * @method _getCoordsByOrderAndIndex","     * @param {Array} seriesCollection Array of series of a given type.","     * @param {Number} index Index of the series item.","     * @param {Number} order Index of the the series in the seriesCollection","     * @param {String} direction Indicates the direction of the series","     * @return Array","     * @private","     */","    _getCoordsByOrderAndIndex: function(seriesCollection, index, order, direction)","    {","        var xcoord,","            ycoord;","        if(direction == \"vertical\")","        {","            xcoord = order < 0 ? this._leftOrigin : seriesCollection[order].get(\"stackedXCoords\")[index];","            ycoord = this.get(\"stackedYCoords\")[index];","        }","        else","        {","            xcoord = this.get(\"stackedXCoords\")[index];","            ycoord = order < 0 ? this._bottomOrigin : seriesCollection[order].get(\"stackedYCoords\")[index];","        }","        return [xcoord, ycoord];","    },","","    /**","     * Concatenates coordinate array with the correct coordinates for closing an area stack.","     *","     * @method _getStackedClosingPoints","     * @return Array","     * @protected","     */","    _getStackedClosingPoints: function()","    {","        var order = this.get(\"order\"),","            type = this.get(\"type\"),","            direction = this.get(\"direction\"),","            seriesCollection = this.get(\"seriesTypeCollection\"),","            firstValidIndex,","            lastValidIndex,","            xcoords = this.get(\"stackedXCoords\"),","            ycoords = this.get(\"stackedYCoords\"),","            limit,","            previousSeries,","            previousSeriesFirstValidIndex,","            previousSeriesLastValidIndex,","            previousXCoords,","            previousYCoords,","            coords,","            closingXCoords,","            closingYCoords,","            currentIndex,","            highestValidOrder,","            oldOrder;","        if(order < 1)","        {","          return this._getClosingPoints();","        }","","        previousSeries = seriesCollection[order - 1];","        previousXCoords = previousSeries.get(\"stackedXCoords\").concat();","        previousYCoords = previousSeries.get(\"stackedYCoords\").concat();","        if(direction == \"vertical\")","        {","            firstValidIndex = this._getFirstValidIndex(xcoords);","            lastValidIndex = this._getLastValidIndex(xcoords);","            previousSeriesFirstValidIndex = previousSeries._getFirstValidIndex(previousXCoords);","            previousSeriesLastValidIndex = previousSeries._getLastValidIndex(previousXCoords);","        }","        else","        {","            firstValidIndex = this._getFirstValidIndex(ycoords);","            lastValidIndex = this._getLastValidIndex(ycoords);","            previousSeriesFirstValidIndex = previousSeries._getFirstValidIndex(previousYCoords);","            previousSeriesLastValidIndex = previousSeries._getLastValidIndex(previousYCoords);","        }","        if(previousSeriesLastValidIndex >= firstValidIndex && previousSeriesFirstValidIndex <= lastValidIndex)","        {","            previousSeriesFirstValidIndex = Math.max(firstValidIndex, previousSeriesFirstValidIndex);","            previousSeriesLastValidIndex = Math.min(lastValidIndex, previousSeriesLastValidIndex);","            previousXCoords = previousXCoords.slice(previousSeriesFirstValidIndex, previousSeriesLastValidIndex + 1);","            previousYCoords = previousYCoords.slice(previousSeriesFirstValidIndex, previousSeriesLastValidIndex + 1);","            limit = previousSeriesFirstValidIndex;","        }","        else","        {","            limit = lastValidIndex;","        }","","        closingXCoords = [xcoords[firstValidIndex]];","        closingYCoords = [ycoords[firstValidIndex]];","        currentIndex = firstValidIndex;","        while((isNaN(highestValidOrder) || highestValidOrder < order - 1) && currentIndex <= limit)","        {","            oldOrder = highestValidOrder;","            highestValidOrder = this._getHighestValidOrder(seriesCollection, currentIndex, order, direction);","            if(!isNaN(oldOrder) && highestValidOrder > oldOrder)","            {","                coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, oldOrder, direction);","                closingXCoords.push(coords[0]);","                closingYCoords.push(coords[1]);","            }","            coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, highestValidOrder, direction);","            closingXCoords.push(coords[0]);","            closingYCoords.push(coords[1]);","            currentIndex = currentIndex + 1;","        }","        if(previousXCoords && previousXCoords.length > 0 && previousSeriesLastValidIndex > firstValidIndex && previousSeriesFirstValidIndex < lastValidIndex)","        {","            closingXCoords = closingXCoords.concat(previousXCoords);","            closingYCoords = closingYCoords.concat(previousYCoords);","            highestValidOrder = order -1;","        }","        currentIndex = Math.max(firstValidIndex, previousSeriesLastValidIndex);","        order = order - 1;","        highestValidOrder = NaN;","        while(currentIndex <= lastValidIndex)","        {","            oldOrder = highestValidOrder;","            highestValidOrder = this._getHighestValidOrder(seriesCollection, currentIndex, order, direction);","            if(!isNaN(oldOrder))","            {","                if(highestValidOrder > oldOrder)","                {","                    coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, oldOrder, direction);","                    closingXCoords.push(coords[0]);","                    closingYCoords.push(coords[1]);","                }","                else if(highestValidOrder < oldOrder)","                {","                    coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex - 1, highestValidOrder, direction);","                    closingXCoords.push(coords[0]);","                    closingYCoords.push(coords[1]);","                }","            }","            coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, highestValidOrder, direction);","            closingXCoords.push(coords[0]);","            closingYCoords.push(coords[1]);","            currentIndex = currentIndex + 1;","        }","","        closingXCoords.reverse();","        closingYCoords.reverse();","        return [xcoords.concat(closingXCoords), ycoords.concat(closingYCoords)];","    },","","    /**","     * Returns default values for area styles.","     *","     * @method _getAreaDefaults","     * @return Object","     * @private","     */","    _getAreaDefaults: function()","    {","        return {","        };","    }","};","Y.augment(Fills, Y.Attribute);","Y.Fills = Fills;","","","}, '@VERSION@');"];
_yuitest_coverage["build/series-fill-util/series-fill-util.js"].lines = {"1":0,"9":0,"18":0,"20":0,"24":0,"29":0,"30":0,"34":0,"35":0,"38":0,"48":0,"49":0,"51":0,"52":0,"54":0,"66":0,"68":0,"82":0,"84":0,"86":0,"100":0,"101":0,"105":0,"106":0,"108":0,"109":0,"110":0,"111":0,"113":0,"115":0,"117":0,"118":0,"119":0,"120":0,"124":0,"126":0,"127":0,"129":0,"130":0,"131":0,"142":0,"144":0,"146":0,"162":0,"166":0,"167":0,"168":0,"170":0,"171":0,"172":0,"173":0,"174":0,"175":0,"176":0,"178":0,"180":0,"181":0,"185":0,"186":0,"188":0,"189":0,"200":0,"202":0,"204":0,"225":0,"226":0,"227":0,"228":0,"229":0,"233":0,"234":0,"235":0,"237":0,"238":0,"239":0,"240":0,"241":0,"242":0,"243":0,"245":0,"247":0,"248":0,"249":0,"250":0,"251":0,"252":0,"253":0,"255":0,"256":0,"257":0,"258":0,"259":0,"260":0,"261":0,"266":0,"268":0,"269":0,"273":0,"274":0,"278":0,"279":0,"300":0,"304":0,"306":0,"307":0,"308":0,"309":0,"310":0,"311":0,"315":0,"316":0,"317":0,"318":0,"319":0,"320":0,"322":0,"323":0,"324":0,"340":0,"342":0,"344":0,"345":0,"347":0,"350":0,"366":0,"368":0,"370":0,"371":0,"375":0,"376":0,"378":0,"390":0,"410":0,"412":0,"415":0,"416":0,"417":0,"418":0,"420":0,"421":0,"422":0,"423":0,"427":0,"428":0,"429":0,"430":0,"432":0,"434":0,"435":0,"436":0,"437":0,"438":0,"442":0,"445":0,"446":0,"447":0,"448":0,"450":0,"451":0,"452":0,"454":0,"455":0,"456":0,"458":0,"459":0,"460":0,"461":0,"463":0,"465":0,"466":0,"467":0,"469":0,"470":0,"471":0,"472":0,"474":0,"475":0,"476":0,"478":0,"480":0,"481":0,"482":0,"484":0,"486":0,"487":0,"488":0,"491":0,"492":0,"493":0,"494":0,"497":0,"498":0,"499":0,"511":0,"515":0,"516":0};
_yuitest_coverage["build/series-fill-util/series-fill-util.js"].functions = {"getter:22":0,"setter:27":0,"Fills:18":0,"_getPath:46":0,"_toggleVisible:64":0,"drawFill:80":0,"drawAreaSpline:140":0,"drawStackedAreaSpline:198":0,"_getClosingPoints:298":0,"_getHighestValidOrder:338":0,"_getCoordsByOrderAndIndex:364":0,"_getStackedClosingPoints:388":0,"_getAreaDefaults:509":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-fill-util/series-fill-util.js"].coveredLines = 196;
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
function Fills(cfg)
{
    _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "Fills", 18);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 20);
var attrs = {
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
    _yuitest_coverline("build/series-fill-util/series-fill-util.js", 34);
this.addAttrs(attrs, cfg);
    _yuitest_coverline("build/series-fill-util/series-fill-util.js", 35);
this.get("styles");
}

_yuitest_coverline("build/series-fill-util/series-fill-util.js", 38);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "_getPath", 46);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 48);
var path = this._path;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 49);
if(!path)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 51);
path = this.get("graphic").addShape({type:"path"});
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 52);
this._path = path;
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 54);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "_toggleVisible", 64);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 66);
if(this._path)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 68);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "drawFill", 80);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 82);
if(xcoords.length < 1)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 84);
return;
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 86);
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
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 100);
path.clear();
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 101);
path.set("fill", {
            color: color,
            opacity: styles.alpha
        });
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 105);
path.set("stroke", {weight: 0});
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 106);
for(; i < len; i = ++i)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 108);
nextX = xcoords[i];
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 109);
nextY = ycoords[i];
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 110);
pointValid = isNumber(nextX) && isNumber(nextY);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 111);
if(!pointValid)
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 113);
continue;
            }
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 115);
if(noPointsRendered)
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 117);
this._firstValidX = nextX;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 118);
this._firstValidY = nextY;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 119);
noPointsRendered = false;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 120);
path.moveTo(nextX, nextY);
            }
            else
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 124);
path.lineTo(nextX, nextY);
            }
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 126);
lastValidX = nextX;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 127);
lastValidY = nextY;
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 129);
this._lastValidX = lastValidX;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 130);
this._lastValidY = lastValidY;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 131);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "drawAreaSpline", 140);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 142);
if(this.get("xcoords").length < 1)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 144);
return;
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 146);
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
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 162);
path.set("fill", {
            color: color,
            opacity: styles.alpha
        });
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 166);
path.set("stroke", {weight: 0});
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 167);
path.moveTo(firstX, firstY);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 168);
for(; i < len; i = ++i)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 170);
x = curvecoords[i].endx;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 171);
y = curvecoords[i].endy;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 172);
cx1 = curvecoords[i].ctrlx1;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 173);
cx2 = curvecoords[i].ctrlx2;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 174);
cy1 = curvecoords[i].ctrly1;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 175);
cy2 = curvecoords[i].ctrly2;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 176);
path.curveTo(cx1, cy1, cx2, cy2, x, y);
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 178);
if(this.get("direction") === "vertical")
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 180);
path.lineTo(this._leftOrigin, y);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 181);
path.lineTo(this._leftOrigin, firstY);
        }
        else
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 185);
path.lineTo(x, this._bottomOrigin);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 186);
path.lineTo(firstX, this._bottomOrigin);
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 188);
path.lineTo(firstX, firstY);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 189);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "drawStackedAreaSpline", 198);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 200);
if(this.get("xcoords").length < 1)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 202);
return;
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 204);
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
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 225);
firstX = xcoords[0];
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 226);
firstY = ycoords[0];
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 227);
curvecoords = this.getCurveControlPoints(xcoords, ycoords);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 228);
len = curvecoords.length;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 229);
path.set("fill", {
            color: color,
            opacity: styles.alpha
        });
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 233);
path.set("stroke", {weight: 0});
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 234);
path.moveTo(firstX, firstY);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 235);
for(; i < len; i = ++i)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 237);
x = curvecoords[i].endx;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 238);
y = curvecoords[i].endy;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 239);
cx1 = curvecoords[i].ctrlx1;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 240);
cx2 = curvecoords[i].ctrlx2;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 241);
cy1 = curvecoords[i].ctrly1;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 242);
cy2 = curvecoords[i].ctrly2;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 243);
path.curveTo(cx1, cy1, cx2, cy2, x, y);
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 245);
if(order > 0)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 247);
prevXCoords = seriesCollection[order - 1].get("xcoords").concat().reverse();
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 248);
prevYCoords = seriesCollection[order - 1].get("ycoords").concat().reverse();
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 249);
curvecoords = this.getCurveControlPoints(prevXCoords, prevYCoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 250);
i = 0;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 251);
len = curvecoords.length;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 252);
path.lineTo(prevXCoords[0], prevYCoords[0]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 253);
for(; i < len; i = ++i)
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 255);
x = curvecoords[i].endx;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 256);
y = curvecoords[i].endy;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 257);
cx1 = curvecoords[i].ctrlx1;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 258);
cx2 = curvecoords[i].ctrlx2;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 259);
cy1 = curvecoords[i].ctrly1;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 260);
cy2 = curvecoords[i].ctrly2;
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 261);
path.curveTo(cx1, cy1, cx2, cy2, x, y);
            }
        }
        else
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 266);
if(this.get("direction") === "vertical")
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 268);
path.lineTo(this._leftOrigin, ycoords[ycoords.length-1]);
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 269);
path.lineTo(this._leftOrigin, firstY);
            }
            else
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 273);
path.lineTo(xcoords[xcoords.length-1], this._bottomOrigin);
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 274);
path.lineTo(firstX, this._bottomOrigin);
            }

        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 278);
path.lineTo(firstX, firstY);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 279);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "_getClosingPoints", 298);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 300);
var xcoords = this.get("xcoords").concat(),
            ycoords = this.get("ycoords").concat(),
            firstValidIndex,
            lastValidIndex;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 304);
if(this.get("direction") === "vertical")
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 306);
lastValidIndex = this._getLastValidIndex(xcoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 307);
firstValidIndex = this._getFirstValidIndex(xcoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 308);
ycoords.push(ycoords[lastValidIndex]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 309);
ycoords.push(ycoords[firstValidIndex]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 310);
xcoords.push(this._leftOrigin);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 311);
xcoords.push(this._leftOrigin);
        }
        else
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 315);
lastValidIndex = this._getLastValidIndex(ycoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 316);
firstValidIndex = this._getFirstValidIndex(ycoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 317);
xcoords.push(xcoords[lastValidIndex]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 318);
xcoords.push(xcoords[firstValidIndex]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 319);
ycoords.push(this._bottomOrigin);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 320);
ycoords.push(this._bottomOrigin);
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 322);
xcoords.push(xcoords[0]);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 323);
ycoords.push(ycoords[0]);
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 324);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "_getHighestValidOrder", 338);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 340);
var coords = direction == "vertical" ? "stackedXCoords" : "stackedYCoords",
            coord;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 342);
while(isNaN(coord) && order > -1)
        {
          _yuitest_coverline("build/series-fill-util/series-fill-util.js", 344);
order = order - 1;
          _yuitest_coverline("build/series-fill-util/series-fill-util.js", 345);
if(order > -1)
          {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 347);
coord = seriesCollection[order].get(coords)[index];
          }
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 350);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "_getCoordsByOrderAndIndex", 364);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 366);
var xcoord,
            ycoord;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 368);
if(direction == "vertical")
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 370);
xcoord = order < 0 ? this._leftOrigin : seriesCollection[order].get("stackedXCoords")[index];
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 371);
ycoord = this.get("stackedYCoords")[index];
        }
        else
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 375);
xcoord = this.get("stackedXCoords")[index];
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 376);
ycoord = order < 0 ? this._bottomOrigin : seriesCollection[order].get("stackedYCoords")[index];
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 378);
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
        _yuitest_coverfunc("build/series-fill-util/series-fill-util.js", "_getStackedClosingPoints", 388);
_yuitest_coverline("build/series-fill-util/series-fill-util.js", 390);
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
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 410);
if(order < 1)
        {
          _yuitest_coverline("build/series-fill-util/series-fill-util.js", 412);
return this._getClosingPoints();
        }

        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 415);
previousSeries = seriesCollection[order - 1];
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 416);
previousXCoords = previousSeries.get("stackedXCoords").concat();
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 417);
previousYCoords = previousSeries.get("stackedYCoords").concat();
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 418);
if(direction == "vertical")
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 420);
firstValidIndex = this._getFirstValidIndex(xcoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 421);
lastValidIndex = this._getLastValidIndex(xcoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 422);
previousSeriesFirstValidIndex = previousSeries._getFirstValidIndex(previousXCoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 423);
previousSeriesLastValidIndex = previousSeries._getLastValidIndex(previousXCoords);
        }
        else
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 427);
firstValidIndex = this._getFirstValidIndex(ycoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 428);
lastValidIndex = this._getLastValidIndex(ycoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 429);
previousSeriesFirstValidIndex = previousSeries._getFirstValidIndex(previousYCoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 430);
previousSeriesLastValidIndex = previousSeries._getLastValidIndex(previousYCoords);
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 432);
if(previousSeriesLastValidIndex >= firstValidIndex && previousSeriesFirstValidIndex <= lastValidIndex)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 434);
previousSeriesFirstValidIndex = Math.max(firstValidIndex, previousSeriesFirstValidIndex);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 435);
previousSeriesLastValidIndex = Math.min(lastValidIndex, previousSeriesLastValidIndex);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 436);
previousXCoords = previousXCoords.slice(previousSeriesFirstValidIndex, previousSeriesLastValidIndex + 1);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 437);
previousYCoords = previousYCoords.slice(previousSeriesFirstValidIndex, previousSeriesLastValidIndex + 1);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 438);
limit = previousSeriesFirstValidIndex;
        }
        else
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 442);
limit = lastValidIndex;
        }

        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 445);
closingXCoords = [xcoords[firstValidIndex]];
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 446);
closingYCoords = [ycoords[firstValidIndex]];
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 447);
currentIndex = firstValidIndex;
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 448);
while((isNaN(highestValidOrder) || highestValidOrder < order - 1) && currentIndex <= limit)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 450);
oldOrder = highestValidOrder;
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 451);
highestValidOrder = this._getHighestValidOrder(seriesCollection, currentIndex, order, direction);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 452);
if(!isNaN(oldOrder) && highestValidOrder > oldOrder)
            {
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 454);
coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, oldOrder, direction);
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 455);
closingXCoords.push(coords[0]);
                _yuitest_coverline("build/series-fill-util/series-fill-util.js", 456);
closingYCoords.push(coords[1]);
            }
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 458);
coords = this._getCoordsByOrderAndIndex(seriesCollection, currentIndex, highestValidOrder, direction);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 459);
closingXCoords.push(coords[0]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 460);
closingYCoords.push(coords[1]);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 461);
currentIndex = currentIndex + 1;
        }
        _yuitest_coverline("build/series-fill-util/series-fill-util.js", 463);
if(previousXCoords && previousXCoords.length > 0 && previousSeriesLastValidIndex > firstValidIndex && previousSeriesFirstValidIndex < lastValidIndex)
        {
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 465);
closingXCoords = closingXCoords.concat(previousXCoords);
            _yuitest_coverline("build/series-fill-util/series-fill-util.js", 466);
closingYCoords = closingYCoords.concat(previousYCoords);
            _yuitest_coverline("build/series-fill-util/ser