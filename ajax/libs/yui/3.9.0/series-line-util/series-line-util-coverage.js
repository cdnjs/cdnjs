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
_yuitest_coverage["build/series-line-util/series-line-util.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-line-util/series-line-util.js",
    code: []
};
_yuitest_coverage["build/series-line-util/series-line-util.js"].code=["YUI.add('series-line-util', function (Y, NAME) {","","/**"," * Provides functionality for drawing lines in a series."," *"," * @module charts"," * @submodule series-line-util"," */","/**"," * Utility class used for drawing lines."," *"," * @class Lines"," * @constructor"," * @submodule series-line-util"," */","var Y_Lang = Y.Lang;","function Lines(){}","","Lines.prototype = {","    /**","     * @property _lineDefaults","     * @type Object","     * @private","     */","    _lineDefaults: null,","","    /**","     * Creates a graphic in which to draw a series.","     *","     * @method _getGraphic","     * @return Graphic","     * @private","     */","    _getGraphic: function()","    {","        var graphic = this.get(\"graphic\") || this.get(\"graph\").get(\"graphic\");","        if(!this._lineGraphic)","        {","            this._lineGraphic = graphic.addShape({type: \"path\"});","        }","        this._lineGraphic.clear();","        return this._lineGraphic;","    },","","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} visible indicates visibilitye","     * @private","     */","    _toggleVisible: function(visible)","    {","        if(this._lineGraphic)","        {","            this._lineGraphic.set(\"visible\", visible);","        }","    },","","    /**","     * Draws lines for the series.","     *","     * @method drawLines","     * @protected","     */","    drawLines: function()","    {","        if(this.get(\"xcoords\").length < 1)","        {","            return;","        }","        var isNumber = Y_Lang.isNumber,","            xcoords,","            ycoords,","            direction = this.get(\"direction\"),","            len,","            lastPointValid,","            pointValid,","            noPointsRendered = true,","            lastValidX,","            lastValidY,","            nextX,","            nextY,","            i,","            styles = this.get(\"styles\").line,","            lineType = styles.lineType,","            lc = styles.color || this._getDefaultColor(this.get(\"graphOrder\"), \"line\"),","            lineAlpha = styles.alpha,","            dashLength = styles.dashLength,","            gapSpace = styles.gapSpace,","            connectDiscontinuousPoints = styles.connectDiscontinuousPoints,","            discontinuousType = styles.discontinuousType,","            discontinuousDashLength = styles.discontinuousDashLength,","            discontinuousGapSpace = styles.discontinuousGapSpace,","            path = this._getGraphic();","        if(this._stacked)","        {","            xcoords = this.get(\"stackedXCoords\");","            ycoords = this.get(\"stackedYCoords\");","        }","        else","        {","            xcoords = this.get(\"xcoords\");","            ycoords = this.get(\"ycoords\");","        }","        len = direction === \"vertical\" ? ycoords.length : xcoords.length;","        path.set(\"stroke\", {","            weight: styles.weight,","            color: lc,","            opacity: lineAlpha","        });","        for(i = 0; i < len; i = ++i)","        {","            nextX = xcoords[i];","            nextY = ycoords[i];","            pointValid = isNumber(nextX) && isNumber(nextY);","            if(!pointValid)","            {","                lastPointValid = pointValid;","                continue;","            }","            if(noPointsRendered)","            {","                noPointsRendered = false;","                path.moveTo(nextX, nextY);","            }","            else if(lastPointValid)","            {","                if(lineType != \"dashed\")","                {","                    path.lineTo(nextX, nextY);","                }","                else","                {","                    this.drawDashedLine(path, lastValidX, lastValidY, nextX, nextY,","                                                dashLength,","                                                gapSpace);","                }","            }","            else if(!connectDiscontinuousPoints)","            {","                path.moveTo(nextX, nextY);","            }","            else","            {","                if(discontinuousType != \"solid\")","                {","                    this.drawDashedLine(path, lastValidX, lastValidY, nextX, nextY,","                                                discontinuousDashLength,","                                                discontinuousGapSpace);","                }","                else","                {","                    path.lineTo(nextX, nextY);","                }","            }","            lastValidX = nextX;","            lastValidY = nextY;","            lastPointValid = true;","        }","        path.end();","    },","","    /**","     * Connects data points with a consistent curve for a series.","     *","     * @method drawSpline","     * @protected","     */","    drawSpline: function()","    {","        if(this.get(\"xcoords\").length < 1)","        {","            return;","        }","        var xcoords = this.get(\"xcoords\"),","            ycoords = this.get(\"ycoords\"),","            curvecoords = this.getCurveControlPoints(xcoords, ycoords),","            len = curvecoords.length,","            cx1,","            cx2,","            cy1,","            cy2,","            x,","            y,","            i = 0,","            styles = this.get(\"styles\").line,","            path = this._getGraphic(),","            lineAlpha = styles.alpha,","            color = styles.color || this._getDefaultColor(this.get(\"graphOrder\"), \"line\");","        path.set(\"stroke\", {","            weight: styles.weight,","            color: color,","            opacity: lineAlpha","        });","        path.moveTo(xcoords[0], ycoords[0]);","        for(; i < len; i = ++i)","        {","            x = curvecoords[i].endx;","            y = curvecoords[i].endy;","            cx1 = curvecoords[i].ctrlx1;","            cx2 = curvecoords[i].ctrlx2;","            cy1 = curvecoords[i].ctrly1;","            cy2 = curvecoords[i].ctrly2;","            path.curveTo(cx1, cy1, cx2, cy2, x, y);","        }","        path.end();","    },","","    /**","     * Draws a dashed line between two points.","     *","     * @method drawDashedLine","     * @param {Number} xStart	The x position of the start of the line","     * @param {Number} yStart	The y position of the start of the line","     * @param {Number} xEnd		The x position of the end of the line","     * @param {Number} yEnd		The y position of the end of the line","     * @param {Number} dashSize	the size of dashes, in pixels","     * @param {Number} gapSize	the size of gaps between dashes, in pixels","     * @private","     */","    drawDashedLine: function(path, xStart, yStart, xEnd, yEnd, dashSize, gapSize)","    {","        dashSize = dashSize || 10;","        gapSize = gapSize || 10;","        var segmentLength = dashSize + gapSize,","            xDelta = xEnd - xStart,","            yDelta = yEnd - yStart,","            delta = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2)),","            segmentCount = Math.floor(Math.abs(delta / segmentLength)),","            radians = Math.atan2(yDelta, xDelta),","            xCurrent = xStart,","            yCurrent = yStart,","            i;","        xDelta = Math.cos(radians) * segmentLength;","        yDelta = Math.sin(radians) * segmentLength;","","        for(i = 0; i < segmentCount; ++i)","        {","            path.moveTo(xCurrent, yCurrent);","            path.lineTo(xCurrent + Math.cos(radians) * dashSize, yCurrent + Math.sin(radians) * dashSize);","            xCurrent += xDelta;","            yCurrent += yDelta;","        }","","        path.moveTo(xCurrent, yCurrent);","        delta = Math.sqrt((xEnd - xCurrent) * (xEnd - xCurrent) + (yEnd - yCurrent) * (yEnd - yCurrent));","","        if(delta > dashSize)","        {","            path.lineTo(xCurrent + Math.cos(radians) * dashSize, yCurrent + Math.sin(radians) * dashSize);","        }","        else if(delta > 0)","        {","            path.lineTo(xCurrent + Math.cos(radians) * delta, yCurrent + Math.sin(radians) * delta);","        }","","        path.moveTo(xEnd, yEnd);","    },","","    /**","     * Default values for `styles` attribute.","     *","     * @method _getLineDefaults","     * @return Object","     * @protected","     */","    _getLineDefaults: function()","    {","        return {","            alpha: 1,","            weight: 6,","            lineType:\"solid\",","            dashLength:10,","            gapSpace:10,","            connectDiscontinuousPoints:true,","            discontinuousType:\"solid\",","            discontinuousDashLength:10,","            discontinuousGapSpace:10","        };","    }","};","Y.augment(Lines, Y.Attribute);","Y.Lines = Lines;","","","}, '@VERSION@');"];
_yuitest_coverage["build/series-line-util/series-line-util.js"].lines = {"1":0,"16":0,"17":0,"19":0,"36":0,"37":0,"39":0,"41":0,"42":0,"54":0,"56":0,"68":0,"70":0,"72":0,"96":0,"98":0,"99":0,"103":0,"104":0,"106":0,"107":0,"112":0,"114":0,"115":0,"116":0,"117":0,"119":0,"120":0,"122":0,"124":0,"125":0,"127":0,"129":0,"131":0,"135":0,"140":0,"142":0,"146":0,"148":0,"154":0,"157":0,"158":0,"159":0,"161":0,"172":0,"174":0,"176":0,"191":0,"196":0,"197":0,"199":0,"200":0,"201":0,"202":0,"203":0,"204":0,"205":0,"207":0,"224":0,"225":0,"226":0,"235":0,"236":0,"238":0,"240":0,"241":0,"242":0,"243":0,"246":0,"247":0,"249":0,"251":0,"253":0,"255":0,"258":0,"270":0,"283":0,"284":0};
_yuitest_coverage["build/series-line-util/series-line-util.js"].functions = {"Lines:17":0,"_getGraphic:34":0,"_toggleVisible:52":0,"drawLines:66":0,"drawSpline:170":0,"drawDashedLine:222":0,"_getLineDefaults:268":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-line-util/series-line-util.js"].coveredLines = 78;
_yuitest_coverage["build/series-line-util/series-line-util.js"].coveredFunctions = 8;
_yuitest_coverline("build/series-line-util/series-line-util.js", 1);
YUI.add('series-line-util', function (Y, NAME) {

/**
 * Provides functionality for drawing lines in a series.
 *
 * @module charts
 * @submodule series-line-util
 */
/**
 * Utility class used for drawing lines.
 *
 * @class Lines
 * @constructor
 * @submodule series-line-util
 */
_yuitest_coverfunc("build/series-line-util/series-line-util.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-line-util/series-line-util.js", 16);
var Y_Lang = Y.Lang;
_yuitest_coverline("build/series-line-util/series-line-util.js", 17);
function Lines(){}

_yuitest_coverline("build/series-line-util/series-line-util.js", 19);
Lines.prototype = {
    /**
     * @property _lineDefaults
     * @type Object
     * @private
     */
    _lineDefaults: null,

    /**
     * Creates a graphic in which to draw a series.
     *
     * @method _getGraphic
     * @return Graphic
     * @private
     */
    _getGraphic: function()
    {
        _yuitest_coverfunc("build/series-line-util/series-line-util.js", "_getGraphic", 34);
_yuitest_coverline("build/series-line-util/series-line-util.js", 36);
var graphic = this.get("graphic") || this.get("graph").get("graphic");
        _yuitest_coverline("build/series-line-util/series-line-util.js", 37);
if(!this._lineGraphic)
        {
            _yuitest_coverline("build/series-line-util/series-line-util.js", 39);
this._lineGraphic = graphic.addShape({type: "path"});
        }
        _yuitest_coverline("build/series-line-util/series-line-util.js", 41);
this._lineGraphic.clear();
        _yuitest_coverline("build/series-line-util/series-line-util.js", 42);
return this._lineGraphic;
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
        _yuitest_coverfunc("build/series-line-util/series-line-util.js", "_toggleVisible", 52);
_yuitest_coverline("build/series-line-util/series-line-util.js", 54);
if(this._lineGraphic)
        {
            _yuitest_coverline("build/series-line-util/series-line-util.js", 56);
this._lineGraphic.set("visible", visible);
        }
    },

    /**
     * Draws lines for the series.
     *
     * @method drawLines
     * @protected
     */
    drawLines: function()
    {
        _yuitest_coverfunc("build/series-line-util/series-line-util.js", "drawLines", 66);
_yuitest_coverline("build/series-line-util/series-line-util.js", 68);
if(this.get("xcoords").length < 1)
        {
            _yuitest_coverline("build/series-line-util/series-line-util.js", 70);
return;
        }
        _yuitest_coverline("build/series-line-util/series-line-util.js", 72);
var isNumber = Y_Lang.isNumber,
            xcoords,
            ycoords,
            direction = this.get("direction"),
            len,
            lastPointValid,
            pointValid,
            noPointsRendered = true,
            lastValidX,
            lastValidY,
            nextX,
            nextY,
            i,
            styles = this.get("styles").line,
            lineType = styles.lineType,
            lc = styles.color || this._getDefaultColor(this.get("graphOrder"), "line"),
            lineAlpha = styles.alpha,
            dashLength = styles.dashLength,
            gapSpace = styles.gapSpace,
            connectDiscontinuousPoints = styles.connectDiscontinuousPoints,
            discontinuousType = styles.discontinuousType,
            discontinuousDashLength = styles.discontinuousDashLength,
            discontinuousGapSpace = styles.discontinuousGapSpace,
            path = this._getGraphic();
        _yuitest_coverline("build/series-line-util/series-line-util.js", 96);
if(this._stacked)
        {
            _yuitest_coverline("build/series-line-util/series-line-util.js", 98);
xcoords = this.get("stackedXCoords");
            _yuitest_coverline("build/series-line-util/series-line-util.js", 99);
ycoords = this.get("stackedYCoords");
        }
        else
        {
            _yuitest_coverline("build/series-line-util/series-line-util.js", 103);
xcoords = this.get("xcoords");
            _yuitest_coverline("build/series-line-util/series-line-util.js", 104);
ycoords = this.get("ycoords");
        }
        _yuitest_coverline("build/series-line-util/series-line-util.js", 106);
len = direction === "vertical" ? ycoords.length : xcoords.length;
        _yuitest_coverline("build/series-line-util/series-line-util.js", 107);
path.set("stroke", {
            weight: styles.weight,
            color: lc,
            opacity: lineAlpha
        });
        _yuitest_coverline("build/series-line-util/series-line-util.js", 112);
for(i = 0; i < len; i = ++i)
        {
            _yuitest_coverline("build/series-line-util/series-line-util.js", 114);
nextX = xcoords[i];
            _yuitest_coverline("build/series-line-util/series-line-util.js", 115);
nextY = ycoords[i];
            _yuitest_coverline("build/series-line-util/series-line-util.js", 116);
pointValid = isNumber(nextX) && isNumber(nextY);
            _yuitest_coverline("build/series-line-util/series-line-util.js", 117);
if(!pointValid)
            {
                _yuitest_coverline("build/series-line-util/series-line-util.js", 119);
lastPointValid = pointValid;
                _yuitest_coverline("build/series-line-util/series-line-util.js", 120);
continue;
            }
            _yuitest_coverline("build/series-line-util/series-line-util.js", 122);
if(noPointsRendered)
            {
                _yuitest_coverline("build/series-line-util/series-line-util.js", 124);
noPointsRendered = false;
                _yuitest_coverline("build/series-line-util/series-line-util.js", 125);
path.moveTo(nextX, nextY);
            }
            else {_yuitest_coverline("build/series-line-util/series-line-util.js", 127);
if(lastPointValid)
            {
                _yuitest_coverline("build/series-line-util/series-line-util.js", 129);
if(lineType != "dashed")
                {
                    _yuitest_coverline("build/series-line-util/series-line-util.js", 131);
path.lineTo(nextX, nextY);
                }
                else
                {
                    _yuitest_coverline("build/series-line-util/series-line-util.js", 135);
this.drawDashedLine(path, lastValidX, lastValidY, nextX, nextY,
                                                dashLength,
                                                gapSpace);
                }
            }
            else {_yuitest_coverline("build/series-line-util/series-line-util.js", 140);
if(!connectDiscontinuousPoints)
            {
                _yuitest_coverline("build/series-line-util/series-line-util.js", 142);
path.moveTo(nextX, nextY);
            }
            else
            {
                _yuitest_coverline("build/series-line-util/series-line-util.js", 146);
if(discontinuousType != "solid")
                {
                    _yuitest_coverline("build/series-line-util/series-line-util.js", 148);
this.drawDashedLine(path, lastValidX, lastValidY, nextX, nextY,
                                                discontinuousDashLength,
                                                discontinuousGapSpace);
                }
                else
                {
                    _yuitest_coverline("build/series-line-util/series-line-util.js", 154);
path.lineTo(nextX, nextY);
                }
            }}}
            _yuitest_coverline("build/series-line-util/series-line-util.js", 157);
lastValidX = nextX;
            _yuitest_coverline("build/series-line-util/series-line-util.js", 158);
lastValidY = nextY;
            _yuitest_coverline("build/series-line-util/series-line-util.js", 159);
lastPointValid = true;
        }
        _yuitest_coverline("build/series-line-util/series-line-util.js", 161);
path.end();
    },

    /**
     * Connects data points with a consistent curve for a series.
     *
     * @method drawSpline
     * @protected
     */
    drawSpline: function()
    {
        _yuitest_coverfunc("build/series-line-util/series-line-util.js", "drawSpline", 170);
_yuitest_coverline("build/series-line-util/series-line-util.js", 172);
if(this.get("xcoords").length < 1)
        {
            _yuitest_coverline("build/series-line-util/series-line-util.js", 174);
return;
        }
        _yuitest_coverline("build/series-line-util/series-line-util.js", 176);
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
            styles = this.get("styles").line,
            path = this._getGraphic(),
            lineAlpha = styles.alpha,
            color = styles.color || this._getDefaultColor(this.get("graphOrder"), "line");
        _yuitest_coverline("build/series-line-util/series-line-util.js", 191);
path.set("stroke", {
            weight: styles.weight,
            color: color,
            opacity: lineAlpha
        });
        _yuitest_coverline("build/series-line-util/series-line-util.js", 196);
path.moveTo(xcoords[0], ycoords[0]);
        _yuitest_coverline("build/series-line-util/series-line-util.js", 197);
for(; i < len; i = ++i)
        {
            _yuitest_coverline("build/series-line-util/series-line-util.js", 199);
x = curvecoords[i].endx;
            _yuitest_coverline("build/series-line-util/series-line-util.js", 200);
y = curvecoords[i].endy;
            _yuitest_coverline("build/series-line-util/series-line-util.js", 201);
cx1 = curvecoords[i].ctrlx1;
            _yuitest_coverline("build/series-line-util/series-line-util.js", 202);
cx2 = curvecoords[i].ctrlx2;
            _yuitest_coverline("build/series-line-util/series-line-util.js", 203);
cy1 = curvecoords[i].ctrly1;
            _yuitest_coverline("build/series-line-util/series-line-util.js", 204);
cy2 = curvecoords[i].ctrly2;
            _yuitest_coverline("build/series-line-util/series-line-util.js", 205);
path.curveTo(cx1, cy1, cx2, cy2, x, y);
        }
        _yuitest_coverline("build/series-line-util/series-line-util.js", 207);
path.end();
    },

    /**
     * Draws a dashed line between two points.
     *
     * @method drawDashedLine
     * @param {Number} xStart	The x position of the start of the line
     * @param {Number} yStart	The y position of the start of the line
     * @param {Number} xEnd		The x position of the end of the line
     * @param {Number} yEnd		The y position of the end of the line
     * @param {Number} dashSize	the size of dashes, in pixels
     * @param {Number} gapSize	the size of gaps between dashes, in pixels
     * @private
     */
    drawDashedLine: function(path, xStart, yStart, xEnd, yEnd, dashSize, gapSize)
    {
        _yuitest_coverfunc("build/series-line-util/series-line-util.js", "drawDashedLine", 222);
_yuitest_coverline("build/series-line-util/series-line-util.js", 224);
dashSize = dashSize || 10;
        _yuitest_coverline("build/series-line-util/series-line-util.js", 225);
gapSize = gapSize || 10;
        _yuitest_coverline("build/series-line-util/series-line-util.js", 226);
var segmentLength = dashSize + gapSize,
            xDelta = xEnd - xStart,
            yDelta = yEnd - yStart,
            delta = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2)),
            segmentCount = Math.floor(Math.abs(delta / segmentLength)),
            radians = Math.atan2(yDelta, xDelta),
            xCurrent = xStart,
            yCurrent = yStart,
            i;
        _yuitest_coverline("build/series-line-util/series-line-util.js", 235);
xDelta = Math.cos(radians) * segmentLength;
        _yuitest_coverline("build/series-line-util/series-line-util.js", 236);
yDelta = Math.sin(radians) * segmentLength;

        _yuitest_coverline("build/series-line-util/series-line-util.js", 238);
for(i = 0; i < segmentCount; ++i)
        {
            _yuitest_coverline("build/series-line-util/series-line-util.js", 240);
path.moveTo(xCurrent, yCurrent);
            _yuitest_coverline("build/series-line-util/series-line-util.js", 241);
path.lineTo(xCurrent + Math.cos(radians) * dashSize, yCurrent + Math.sin(radians) * dashSize);
            _yuitest_coverline("build/series-line-util/series-line-util.js", 242);
xCurrent += xDelta;
            _yuitest_coverline("build/series-line-util/series-line-util.js", 243);
yCurrent += yDelta;
        }

        _yuitest_coverline("build/series-line-util/series-line-util.js", 246);
path.moveTo(xCurrent, yCurrent);
        _yuitest_coverline("build/series-line-util/series-line-util.js", 247);
delta = Math.sqrt((xEnd - xCurrent) * (xEnd - xCurrent) + (yEnd - yCurrent) * (yEnd - yCurrent));

        _yuitest_coverline("build/series-line-util/series-line-util.js", 249);
if(delta > dashSize)
        {
            _yuitest_coverline("build/series-line-util/series-line-util.js", 251);
path.lineTo(xCurrent + Math.cos(radians) * dashSize, yCurrent + Math.sin(radians) * dashSize);
        }
        else {_yuitest_coverline("build/series-line-util/series-line-util.js", 253);
if(delta > 0)
        {
            _yuitest_coverline("build/series-line-util/series-line-util.js", 255);
path.lineTo(xCurrent + Math.cos(radians) * delta, yCurrent + Math.sin(radians) * delta);
        }}

        _yuitest_coverline("build/series-line-util/series-line-util.js", 258);
path.moveTo(xEnd, yEnd);
    },

    /**
     * Default values for `styles` attribute.
     *
     * @method _getLineDefaults
     * @return Object
     * @protected
     */
    _getLineDefaults: function()
    {
        _yuitest_coverfunc("build/series-line-util/series-line-util.js", "_getLineDefaults", 268);
_yuitest_coverline("build/series-line-util/series-line-util.js", 270);
return {
            alpha: 1,
            weight: 6,
            lineType:"solid",
            dashLength:10,
            gapSpace:10,
            connectDiscontinuousPoints:true,
            discontinuousType:"solid",
            discontinuousDashLength:10,
            discontinuousGapSpace:10
        };
    }
};
_yuitest_coverline("build/series-line-util/series-line-util.js", 283);
Y.augment(Lines, Y.Attribute);
_yuitest_coverline("build/series-line-util/series-line-util.js", 284);
Y.Lines = Lines;


}, '@VERSION@');
