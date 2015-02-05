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
_yuitest_coverage["build/series-stacked/series-stacked.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-stacked/series-stacked.js",
    code: []
};
_yuitest_coverage["build/series-stacked/series-stacked.js"].code=["YUI.add('series-stacked', function (Y, NAME) {","","/**"," * Provides functionality for creating stacked series."," *"," * @module charts"," * @submodule series-stacked"," */","var Y_Lang = Y.Lang;","","/**"," * Utility class used for creating stacked series."," *"," * @module charts"," * @class StackingUtil"," * @constructor"," * @submodule series-stacked"," */","function StackingUtil(){}","","StackingUtil.prototype = {","    /**","     * Indicates whether the series is stacked.","     *","     * @property _stacked","     * @private","     */","    _stacked: true,","","    /**","     * @protected","     *","     * Adjusts coordinate values for stacked series.","     *","     * @method _stackCoordinates","     */","    _stackCoordinates: function()","    {","        if(this.get(\"direction\") === \"vertical\")","        {","            this._stackXCoords();","        }","        else","        {","            this._stackYCoords();","        }","    },","","    /**","     * Stacks coordinates for a stacked vertical series.","     *","     * @method _stackXCoords","     * @protected","     */","    _stackXCoords: function()","    {","        var order = this.get(\"order\"),","            seriesCollection = this.get(\"seriesTypeCollection\"),","            i = 0,","            xcoords = this.get(\"xcoords\"),","            ycoords = this.get(\"ycoords\"),","            len,","            coord,","            prevCoord,","            prevOrder,","            stackedXCoords = xcoords.concat(),","            prevXCoords,","            prevYCoords,","            nullIndices = [],","            nullIndex;","        if(order > 0)","        {","            prevXCoords = seriesCollection[order - 1].get(\"stackedXCoords\");","            prevYCoords = seriesCollection[order - 1].get(\"stackedYCoords\");","            len = prevXCoords.length;","        }","        else","        {","            len = xcoords.length;","        }","        for(; i < len; i = i + 1)","        {","            if(Y_Lang.isNumber(xcoords[i]))","            {","                if(order > 0)","                {","                    prevCoord = prevXCoords[i];","                    if(!Y_Lang.isNumber(prevCoord))","                    {","                        prevOrder = order;","                        while(prevOrder >  - 1 && !Y_Lang.isNumber(prevCoord))","                        {","                            prevOrder = prevOrder - 1;","                            if(prevOrder > -1)","                            {","                                prevCoord = seriesCollection[prevOrder].get(\"stackedXCoords\")[i];","                            }","                            else","                            {","                                prevCoord = this._leftOrigin;","                            }","                        }","                    }","                    xcoords[i] = xcoords[i] + prevCoord;","                }","                stackedXCoords[i] = xcoords[i];","            }","            else","            {","                nullIndices.push(i);","            }","        }","        this._cleanXNaN(stackedXCoords, ycoords);","        len = nullIndices.length;","        if(len > 0)","        {","            for(i = 0; i < len; i = i + 1)","            {","                nullIndex = nullIndices[i];","                coord = order > 0 ? prevXCoords[nullIndex] : this._leftOrigin;","                stackedXCoords[nullIndex] =  Math.max(stackedXCoords[nullIndex], coord);","            }","        }","        this.set(\"stackedXCoords\", stackedXCoords);","        this.set(\"stackedYCoords\", ycoords);","    },","","    /**","     * Stacks coordinates for a stacked horizontal series.","     *","     * @method _stackYCoords","     * @protected","     */","    _stackYCoords: function()","    {","        var order = this.get(\"order\"),","            graphic = this.get(\"graphic\"),","            h = graphic.get(\"height\"),","            seriesCollection = this.get(\"seriesTypeCollection\"),","            i = 0,","            xcoords = this.get(\"xcoords\"),","            ycoords = this.get(\"ycoords\"),","            len,","            coord,","            prevCoord,","            prevOrder,","            stackedYCoords = ycoords.concat(),","            prevXCoords,","            prevYCoords,","            nullIndices = [],","            nullIndex;","        if(order > 0)","        {","            prevXCoords = seriesCollection[order - 1].get(\"stackedXCoords\");","            prevYCoords = seriesCollection[order - 1].get(\"stackedYCoords\");","            len = prevYCoords.length;","        }","        else","        {","            len = ycoords.length;","        }","        for(; i < len; i = i + 1)","        {","            if(Y_Lang.isNumber(ycoords[i]))","            {","                if(order > 0)","                {","                    prevCoord = prevYCoords[i];","                    if(!Y_Lang.isNumber(prevCoord))","                    {","                        prevOrder = order;","                        while(prevOrder >  - 1 && !Y_Lang.isNumber(prevCoord))","                        {","                            prevOrder = prevOrder - 1;","                            if(prevOrder > -1)","                            {","                                prevCoord = seriesCollection[prevOrder].get(\"stackedYCoords\")[i];","                            }","                            else","                            {","                                prevCoord = this._bottomOrigin;","                            }","                        }","                    }","                    ycoords[i] = prevCoord - (h - ycoords[i]);","                }","                stackedYCoords[i] = ycoords[i];","            }","            else","            {","                nullIndices.push(i);","            }","        }","        this._cleanYNaN(xcoords, stackedYCoords);","        len = nullIndices.length;","        if(len > 0)","        {","            for(i = 0; i < len; i = i + 1)","            {","                nullIndex = nullIndices[i];","                coord = order > 0 ? prevYCoords[nullIndex] : h;","                stackedYCoords[nullIndex] =  Math.min(stackedYCoords[nullIndex], coord);","            }","        }","        this.set(\"stackedXCoords\", xcoords);","        this.set(\"stackedYCoords\", stackedYCoords);","    },","","    /**","     * Cleans invalid x-coordinates by calculating their value based on the corresponding y-coordinate, the","     * previous valid x-coordinate with its corresponding y-coordinate and the next valid x-coordinate with","     * its corresponding y-coordinate. If there is no previous or next valid x-coordinate, the value will not","     * be altered.","     *","     * @method _cleanXNaN","     * @param {Array} xcoords An array of x-coordinate values","     * @param {Array} ycoords An arry of y-coordinate values","     * @private","     */","    _cleanXNaN: function(xcoords, ycoords)","    {","        var previousValidIndex,","            nextValidIndex,","            previousValidX,","            previousValidY,","            x,","            y,","            nextValidX,","            nextValidY,","            isNumber = Y_Lang.isNumber,","            m,","            i = 0,","            len = ycoords.length;","        for(; i < len; ++i)","        {","            x = xcoords[i];","            y = ycoords[i];","            //if x is invalid, calculate where it should be","            if(!isNumber(x) && i > 0 && i < len - 1)","            {","                previousValidY = ycoords[i - 1];","                //check to see if the previous value is valid","                previousValidX = this._getPreviousValidCoordValue(xcoords, i);","                nextValidY = ycoords[i + 1];","                nextValidX = this._getNextValidCoordValue(xcoords, i);","                //check to see if the next value is valid","                if(isNumber(previousValidX) && isNumber(nextValidX))","                {","                    //calculate slope and solve for x","                    m = (nextValidY - previousValidY) / (nextValidX - previousValidX);","                    xcoords[i] = (y + (m * previousValidX) - previousValidY)/m;","                }","                previousValidIndex = NaN;","                nextValidIndex = NaN;","            }","        }","    },","","    /**","     * Returns the previous valid (numeric) value in an array if available.","     *","     * @method _getPreviousValidCoordValue","     * @param {Array} coords Array of values","     * @param {Number} index The index in the array in which to begin searching.","     * @return Number","     * @private","     */","    _getPreviousValidCoordValue: function(coords, index)","    {","        var coord,","            isNumber = Y_Lang.isNumber,","            limit = -1;","        while(!isNumber(coord) && index > limit)","        {","            index = index - 1;","            coord = coords[index];","        }","        return coord;","    },","","    /**","     * Returns the next valid (numeric) value in an array if available.","     *","     * @method _getNextValidCoordValue","     * @param {Array} coords Array of values","     * @param {Number} index The index in the array in which to begin searching.","     * @return Number","     * @private","     */","    _getNextValidCoordValue: function(coords, index)","    {","        var coord,","            isNumber = Y_Lang.isNumber,","            limit = coords.length;","        while(!isNumber(coord) && index < limit)","        {","            index = index + 1;","            coord = coords[index];","        }","        return coord;","    },","","    /**","     * Cleans invalid y-coordinates by calculating their value based on the corresponding x-coordinate, the","     * previous valid y-coordinate with its corresponding x-coordinate and the next valid y-coordinate with","     * its corresponding x-coordinate. If there is no previous or next valid y-coordinate, the value will not","     * be altered.","     *","     * @method _cleanYNaN","     * @param {Array} xcoords An array of x-coordinate values","     * @param {Array} ycoords An arry of y-coordinate values","     * @private","     */","    _cleanYNaN: function(xcoords, ycoords)","    {","        var previousValidIndex,","            nextValidIndex,","            previousValidX,","            previousValidY,","            x,","            y,","            nextValidX,","            nextValidY,","            isNumber = Y_Lang.isNumber,","            m,","            i = 0,","            len = xcoords.length;","        for(; i < len; ++i)","        {","            x = xcoords[i];","            y = ycoords[i];","            //if y is invalid, calculate where it should be","            if(!isNumber(y) && i > 0 && i < len - 1)","            {","                //check to see if the previous value is valid","                previousValidX = xcoords[i - 1];","                previousValidY = this._getPreviousValidCoordValue(ycoords, i);","                //check to see if the next value is valid","                nextValidX = xcoords[i + 1];","                nextValidY = this._getNextValidCoordValue(ycoords, i);","                if(isNumber(previousValidY) && isNumber(nextValidY))","                {","                    //calculate slope and solve for y","                    m = (nextValidY - previousValidY) / (nextValidX - previousValidX);","                    ycoords[i] = previousValidY + ((m * x) - (m * previousValidX));","                }","                previousValidIndex = NaN;","                nextValidIndex = NaN;","            }","        }","    }","};","Y.StackingUtil = StackingUtil;","","","}, '@VERSION@', {\"requires\": [\"axis-stacked\"]});"];
_yuitest_coverage["build/series-stacked/series-stacked.js"].lines = {"1":0,"9":0,"19":0,"21":0,"39":0,"41":0,"45":0,"57":0,"71":0,"73":0,"74":0,"75":0,"79":0,"81":0,"83":0,"85":0,"87":0,"88":0,"90":0,"91":0,"93":0,"94":0,"96":0,"100":0,"104":0,"106":0,"110":0,"113":0,"114":0,"115":0,"117":0,"119":0,"120":0,"121":0,"124":0,"125":0,"136":0,"152":0,"154":0,"155":0,"156":0,"160":0,"162":0,"164":0,"166":0,"168":0,"169":0,"171":0,"172":0,"174":0,"175":0,"177":0,"181":0,"185":0,"187":0,"191":0,"194":0,"195":0,"196":0,"198":0,"200":0,"201":0,"202":0,"205":0,"206":0,"222":0,"234":0,"236":0,"237":0,"239":0,"241":0,"243":0,"244":0,"245":0,"247":0,"250":0,"251":0,"253":0,"254":0,"270":0,"273":0,"275":0,"276":0,"278":0,"292":0,"295":0,"297":0,"298":0,"300":0,"316":0,"328":0,"330":0,"331":0,"333":0,"336":0,"337":0,"339":0,"340":0,"341":0,"344":0,"345":0,"347":0,"348":0,"353":0};
_yuitest_coverage["build/series-stacked/series-stacked.js"].functions = {"StackingUtil:19":0,"_stackCoordinates:37":0,"_stackXCoords:55":0,"_stackYCoords:134":0,"_cleanXNaN:220":0,"_getPreviousValidCoordValue:268":0,"_getNextValidCoordValue:290":0,"_cleanYNaN:314":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-stacked/series-stacked.js"].coveredLines = 104;
_yuitest_coverage["build/series-stacked/series-stacked.js"].coveredFunctions = 9;
_yuitest_coverline("build/series-stacked/series-stacked.js", 1);
YUI.add('series-stacked', function (Y, NAME) {

/**
 * Provides functionality for creating stacked series.
 *
 * @module charts
 * @submodule series-stacked
 */
_yuitest_coverfunc("build/series-stacked/series-stacked.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-stacked/series-stacked.js", 9);
var Y_Lang = Y.Lang;

/**
 * Utility class used for creating stacked series.
 *
 * @module charts
 * @class StackingUtil
 * @constructor
 * @submodule series-stacked
 */
_yuitest_coverline("build/series-stacked/series-stacked.js", 19);
function StackingUtil(){}

_yuitest_coverline("build/series-stacked/series-stacked.js", 21);
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
        _yuitest_coverfunc("build/series-stacked/series-stacked.js", "_stackCoordinates", 37);
_yuitest_coverline("build/series-stacked/series-stacked.js", 39);
if(this.get("direction") === "vertical")
        {
            _yuitest_coverline("build/series-stacked/series-stacked.js", 41);
this._stackXCoords();
        }
        else
        {
            _yuitest_coverline("build/series-stacked/series-stacked.js", 45);
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
        _yuitest_coverfunc("build/series-stacked/series-stacked.js", "_stackXCoords", 55);
_yuitest_coverline("build/series-stacked/series-stacked.js", 57);
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
        _yuitest_coverline("build/series-stacked/series-stacked.js", 71);
if(order > 0)
        {
            _yuitest_coverline("build/series-stacked/series-stacked.js", 73);
prevXCoords = seriesCollection[order - 1].get("stackedXCoords");
            _yuitest_coverline("build/series-stacked/series-stacked.js", 74);
prevYCoords = seriesCollection[order - 1].get("stackedYCoords");
            _yuitest_coverline("build/series-stacked/series-stacked.js", 75);
len = prevXCoords.length;
        }
        else
        {
            _yuitest_coverline("build/series-stacked/series-stacked.js", 79);
len = xcoords.length;
        }
        _yuitest_coverline("build/series-stacked/series-stacked.js", 81);
for(; i < len; i = i + 1)
        {
            _yuitest_coverline("build/series-stacked/series-stacked.js", 83);
if(Y_Lang.isNumber(xcoords[i]))
            {
                _yuitest_coverline("build/series-stacked/series-stacked.js", 85);
if(order > 0)
                {
                    _yuitest_coverline("build/series-stacked/series-stacked.js", 87);
prevCoord = prevXCoords[i];
                    _yuitest_coverline("build/series-stacked/series-stacked.js", 88);
if(!Y_Lang.isNumber(prevCoord))
                    {
                        _yuitest_coverline("build/series-stacked/series-stacked.js", 90);
prevOrder = order;
                        _yuitest_coverline("build/series-stacked/series-stacked.js", 91);
while(prevOrder >  - 1 && !Y_Lang.isNumber(prevCoord))
                        {
                            _yuitest_coverline("build/series-stacked/series-stacked.js", 93);
prevOrder = prevOrder - 1;
                            _yuitest_coverline("build/series-stacked/series-stacked.js", 94);
if(prevOrder > -1)
                            {
                                _yuitest_coverline("build/series-stacked/series-stacked.js", 96);
prevCoord = seriesCollection[prevOrder].get("stackedXCoords")[i];
                            }
                            else
                            {
                                _yuitest_coverline("build/series-stacked/series-stacked.js", 100);
prevCoord = this._leftOrigin;
                            }
                        }
                    }
                    _yuitest_coverline("build/series-stacked/series-stacked.js", 104);
xcoords[i] = xcoords[i] + prevCoord;
                }
                _yuitest_coverline("build/series-stacked/series-stacked.js", 106);
stackedXCoords[i] = xcoords[i];
            }
            else
            {
                _yuitest_coverline("build/series-stacked/series-stacked.js", 110);
nullIndices.push(i);
            }
        }
        _yuitest_coverline("build/series-stacked/series-stacked.js", 113);
this._cleanXNaN(stackedXCoords, ycoords);
        _yuitest_coverline("build/series-stacked/series-stacked.js", 114);
len = nullIndices.length;
        _yuitest_coverline("build/series-stacked/series-stacked.js", 115);
if(len > 0)
        {
            _yuitest_coverline("build/series-stacked/series-stacked.js", 117);
for(i = 0; i < len; i = i + 1)
            {
                _yuitest_coverline("build/series-stacked/series-stacked.js", 119);
nullIndex = nullIndices[i];
                _yuitest_coverline("build/series-stacked/series-stacked.js", 120);
coord = order > 0 ? prevXCoords[nullIndex] : this._leftOrigin;
                _yuitest_coverline("build/series-stacked/series-stacked.js", 121);
stackedXCoords[nullIndex] =  Math.max(stackedXCoords[nullIndex], coord);
            }
        }
        _yuitest_coverline("build/series-stacked/series-stacked.js", 124);
this.set("stackedXCoords", stackedXCoords);
        _yuitest_coverline("build/series-stacked/series-stacked.js", 125);
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
        _yuitest_coverfunc("build/series-stacked/series-stacked.js", "_stackYCoords", 134);
_yuitest_coverline("build/series-stacked/series-stacked.js", 136);
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
        _yuitest_coverline("build/series-stacked/series-stacked.js", 152);
if(order > 0)
        {
            _yuitest_coverline("build/series-stacked/series-stacked.js", 154);
prevXCoords = seriesCollection[order - 1].get("stackedXCoords");
            _yuitest_coverline("build/series-stacked/series-stacked.js", 155);
prevYCoords = seriesCollection[order - 1].get("stackedYCoords");
            _yuitest_coverline("build/series-stacked/series-stacked.js", 156);
len = prevYCoords.length;
        }
        else
        {
            _yuitest_coverline("build/series-stacked/series-stacked.js", 160);
len = ycoords.length;
        }
        _yuitest_coverline("build/series-stacked/series-stacked.js", 162);
for(; i < len; i = i + 1)
        {
            _yuitest_coverline("build/series-stacked/series-stacked.js", 164);
if(Y_Lang.isNumber(ycoords[i]))
            {
                _yuitest_coverline("build/series-stacked/series-stacked.js", 166);
if(order > 0)
                {
                    _yuitest_coverline("build/series-stacked/series-stacked.js", 168);
prevCoord = prevYCoords[i];
                    _yuitest_coverline("build/series-stacked/series-stacked.js", 169);
if(!Y_Lang.isNumber(prevCoord))
                    {
                        _yuitest_coverline("build/series-stacked/series-stacked.js", 171);
prevOrder = order;
                        _yuitest_coverline("build/series-stacked/series-stacked.js", 172);
while(prevOrder >  - 1 && !Y_Lang.isNumber(prevCoord))
                        {
                            _yuitest_coverline("build/series-stacked/series-stacked.js", 174);
prevOrder = prevOrder - 1;
                            _yuitest_coverline("build/series-stacked/series-stacked.js", 175);
if(prevOrder > -1)
                            {
                                _yuitest_coverline("build/series-stacked/series-stacked.js", 177);
prevCoord = seriesCollection[prevOrder].get("stackedYCoords")[i];
                            }
                            else
                            {
                                _yuitest_coverline("build/series-stacked/series-stacked.js", 181);
prevCoord = this._bottomOrigin;
                            }
                        }
                    }
                    _yuitest_coverline("build/series-stacked/series-stacked.js", 185);
ycoords[i] = prevCoord - (h - ycoords[i]);
                }
                _yuitest_coverline("build/series-stacked/series-stacked.js", 187);
stackedYCoords[i] = ycoords[i];
            }
            else
            {
                _yuitest_coverline("build/series-stacked/series-stacked.js", 191);
nullIndices.push(i);
            }
        }
        _yuitest_coverline("build/series-stacked/series-stacked.js", 194);
this._cleanYNaN(xcoords, stackedYCoords);
        _yuitest_coverline("build/series-stacked/series-stacked.js", 195);
len = nullIndices.length;
        _yuitest_coverline("build/series-stacked/series-stacked.js", 196);
if(len > 0)
        {
            _yuitest_coverline("build/series-stacked/series-stacked.js", 198);
for(i = 0; i < len; i = i + 1)
            {
                _yuitest_coverline("build/series-stacked/series-stacked.js", 200);
nullIndex = nullIndices[i];
                _yuitest_coverline("build/series-stacked/series-stacked.js", 201);
coord = order > 0 ? prevYCoords[nullIndex] : h;
                _yuitest_coverline("build/series-stacked/series-stacked.js", 202);
stackedYCoords[nullIndex] =  Math.min(stackedYCoords[nullIndex], coord);
            }
        }
        _yuitest_coverline("build/series-stacked/series-stacked.js", 205);
this.set("stackedXCoords", xcoords);
        _yuitest_coverline("build/series-stacked/series-stacked.js", 206);
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
        _yuitest_coverfunc("build/series-stacked/series-stacked.js", "_cleanXNaN", 220);
_yuitest_coverline("build/series-stacked/series-stacked.js", 222);
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
        _yuitest_coverline("build/series-stacked/series-stacked.js", 234);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/series-stacked/series-stacked.js", 236);
x = xcoords[i];
            _yuitest_coverline("build/series-stacked/series-stacked.js", 237);
y = ycoords[i];
            //if x is invalid, calculate where it should be
            _yuitest_coverline("build/series-stacked/series-stacked.js", 239);
if(!isNumber(x) && i > 0 && i < len - 1)
            {
                _yuitest_coverline("build/series-stacked/series-stacked.js", 241);
previousValidY = ycoords[i - 1];
                //check to see if the previous value is valid
                _yuitest_coverline("build/series-stacked/series-stacked.js", 243);
previousValidX = this._getPreviousValidCoordValue(xcoords, i);
                _yuitest_coverline("build/series-stacked/series-stacked.js", 244);
nextValidY = ycoords[i + 1];
                _yuitest_coverline("build/series-stacked/series-stacked.js", 245);
nextValidX = this._getNextValidCoordValue(xcoords, i);
                //check to see if the next value is valid
                _yuitest_coverline("build/series-stacked/series-stacked.js", 247);
if(isNumber(previousValidX) && isNumber(nextValidX))
                {
                    //calculate slope and solve for x
                    _yuitest_coverline("build/series-stacked/series-stacked.js", 250);
m = (nextValidY - previousValidY) / (nextValidX - previousValidX);
                    _yuitest_coverline("build/series-stacked/series-stacked.js", 251);
xcoords[i] = (y + (m * previousValidX) - previousValidY)/m;
                }
                _yuitest_coverline("build/series-stacked/series-stacked.js", 253);
previousValidIndex = NaN;
                _yuitest_coverline("build/series-stacked/series-stacked.js", 254);
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
        _yuitest_coverfunc("build/series-stacked/series-stacked.js", "_getPreviousValidCoordValue", 268);
_yuitest_coverline("build/series-stacked/series-stacked.js", 270);
var coord,
            isNumber = Y_Lang.isNumber,
            limit = -1;
        _yuitest_coverline("build/series-stacked/series-stacked.js", 273);
while(!isNumber(coord) && index > limit)
        {
            _yuitest_coverline("build/series-stacked/series-stacked.js", 275);
index = index - 1;
            _yuitest_coverline("build/series-stacked/series-stacked.js", 276);
coord = coords[index];
        }
        _yuitest_coverline("build/series-stacked/series-stacked.js", 278);
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
        _yuitest_coverfunc("build/series-stacked/series-stacked.js", "_getNextValidCoordValue", 290);
_yuitest_coverline("build/series-stacked/series-stacked.js", 292);
var coord,
            isNumber = Y_Lang.isNumber,
            limit = coords.length;
        _yuitest_coverline("build/series-stacked/series-stacked.js", 295);
while(!isNumber(coord) && index < limit)
        {
            _yuitest_coverline("build/series-stacked/series-stacked.js", 297);
index = index + 1;
            _yuitest_coverline("build/series-stacked/series-stacked.js", 298);
coord = coords[index];
        }
        _yuitest_coverline("build/series-stacked/series-stacked.js", 300);
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
        _yuitest_coverfunc("build/series-stacked/series-stacked.js", "_cleanYNaN", 314);
_yuitest_coverline("build/series-stacked/series-stacked.js", 316);
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
        _yuitest_coverline("build/series-stacked/series-stacked.js", 328);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/series-stacked/series-stacked.js", 330);
x = xcoords[i];
            _yuitest_coverline("build/series-stacked/series-stacked.js", 331);
y = ycoords[i];
            //if y is invalid, calculate where it should be
            _yuitest_coverline("build/series-stacked/series-stacked.js", 333);
if(!isNumber(y) && i > 0 && i < len - 1)
            {
                //check to see if the previous value is valid
                _yuitest_coverline("build/series-stacked/series-stacked.js", 336);
previousValidX = xcoords[i - 1];
                _yuitest_coverline("build/series-stacked/series-stacked.js", 337);
previousValidY = this._getPreviousValidCoordValue(ycoords, i);
                //check to see if the next value is valid
                _yuitest_coverline("build/series-stacked/series-stacked.js", 339);
nextValidX = xcoords[i + 1];
                _yuitest_coverline("build/series-stacked/series-stacked.js", 340);
nextValidY = this._getNextValidCoordValue(ycoords, i);
                _yuitest_coverline("build/series-stacked/series-stacked.js", 341);
if(isNumber(previousValidY) && isNumber(nextValidY))
                {
                    //calculate slope and solve for y
                    _yuitest_coverline("build/series-stacked/series-stacked.js", 344);
m = (nextValidY - previousValidY) / (nextValidX - previousValidX);
                    _yuitest_coverline("build/series-stacked/series-stacked.js", 345);
ycoords[i] = previousValidY + ((m * x) - (m * previousValidX));
                }
                _yuitest_coverline("build/series-stacked/series-stacked.js", 347);
previousValidIndex = NaN;
                _yuitest_coverline("build/series-stacked/series-stacked.js", 348);
nextValidIndex = NaN;
            }
        }
    }
};
_yuitest_coverline("build/series-stacked/series-stacked.js", 353);
Y.StackingUtil = StackingUtil;


}, '@VERSION@', {"requires": ["axis-stacked"]});
