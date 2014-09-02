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
_yuitest_coverage["build/series-curve-util/series-curve-util.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-curve-util/series-curve-util.js",
    code: []
};
_yuitest_coverage["build/series-curve-util/series-curve-util.js"].code=["YUI.add('series-curve-util', function (Y, NAME) {","","/**"," * Provides functionality for drawing curves in a series."," *"," * @module charts"," * @submodule series-curve-util"," */","/**"," * Utility class used for calculating curve points."," *"," * @class CurveUtil"," * @constructor"," * @submodule series-curve-util"," */","function CurveUtil()","{","}","","CurveUtil.prototype = {","    /**","     * Creates an array of start, end and control points for splines.","     *","     * @method getCurveControlPoints","     * @param {Array} xcoords Collection of x-coordinates used for calculate the curves","     * @param {Array} ycoords Collection of y-coordinates used for calculate the curves","     * @return Object","     * @protected","     */","    getCurveControlPoints: function(xcoords, ycoords)","    {","		var outpoints = [],","            i = 1,","            l = xcoords.length - 1,","		    xvals = [],","		    yvals = [];","","","		// Too few points, need at least two","		if (l < 1)","        {","			return null;","		}","","        outpoints[0] = {","            startx: xcoords[0],","            starty: ycoords[0],","            endx: xcoords[1],","            endy: ycoords[1]","        };","","		// Special case, the Bezier should be a straight line","        if (l === 1)","        {","			outpoints[0].ctrlx1 = (2.0*xcoords[0] + xcoords[1])/3.0;","			outpoints[0].ctrly2 = (2.0*ycoords[0] + ycoords[1])/3.0;","			outpoints[0].ctrlx2 = 2.0*outpoints[0].ctrlx1 - xcoords[0];","            outpoints[0].ctrly2 = 2.0*outpoints[0].ctrly1 - ycoords[0];","            return outpoints;","		}","","		for (; i < l; ++i)","        {","			outpoints.push({startx: Math.round(xcoords[i]), starty: Math.round(ycoords[i]), endx: Math.round(xcoords[i+1]), endy: Math.round(ycoords[i+1])});","			xvals[i] = 4.0 * xcoords[i] + 2*xcoords[i+1];","			yvals[i] = 4.0*ycoords[i] + 2*ycoords[i+1];","		}","","		xvals[0] = xcoords[0] + (2.0 * xcoords[1]);","		xvals[l-1] = (8.0 * xcoords[l-1] + xcoords[l]) / 2.0;","		xvals = this.getControlPoints(xvals.concat());","        yvals[0] = ycoords[0] + (2.0 * ycoords[1]);","		yvals[l-1] = (8.0 * ycoords[l-1] + ycoords[l]) / 2.0;","		yvals = this.getControlPoints(yvals.concat());","","        for (i = 0; i < l; ++i)","        {","			outpoints[i].ctrlx1 = Math.round(xvals[i]);","            outpoints[i].ctrly1 = Math.round(yvals[i]);","","			if (i < l-1)","            {","				outpoints[i].ctrlx2 = Math.round(2*xcoords[i+1] - xvals[i+1]);","                outpoints[i].ctrly2 = Math.round(2*ycoords[i+1] - yvals[i+1]);","			}","			else","            {","				outpoints[i].ctrlx2 = Math.round((xcoords[l] + xvals[l-1])/2);","                outpoints[i].ctrly2 = Math.round((ycoords[l] + yvals[l-1])/2);","			}","		}","","		return outpoints;","	},","","    /**","     * Gets the control points for the curve.","     *","     * @method getControlPoints","     * @param {Array} vals Collection of values coords used to generate control points.","     * @return Array","     * @private","     */","	getControlPoints: function(vals)","    {","		var l = vals.length,","            x = [],","            tmp = [],","            b = 2.0,","            i = 1;","		x[0] = vals[0] / b;","		for (; i < l; ++i)","        {","			tmp[i] = 1/b;","			b = (i < l-1 ? 4.0 : 3.5) - tmp[i];","			x[i] = (vals[i] - x[i-1]) / b;","		}","","		for (i = 1; i < l; ++i)","        {","			x[l-i-1] -= tmp[l-i] * x[l-i];","		}","","		return x;","	}","};","Y.CurveUtil = CurveUtil;","","","}, '@VERSION@');"];
_yuitest_coverage["build/series-curve-util/series-curve-util.js"].lines = {"1":0,"16":0,"20":0,"32":0,"40":0,"42":0,"45":0,"53":0,"55":0,"56":0,"57":0,"58":0,"59":0,"62":0,"64":0,"65":0,"66":0,"69":0,"70":0,"71":0,"72":0,"73":0,"74":0,"76":0,"78":0,"79":0,"81":0,"83":0,"84":0,"88":0,"89":0,"93":0,"106":0,"111":0,"112":0,"114":0,"115":0,"116":0,"119":0,"121":0,"124":0,"127":0};
_yuitest_coverage["build/series-curve-util/series-curve-util.js"].functions = {"CurveUtil:16":0,"getCurveControlPoints:30":0,"getControlPoints:104":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-curve-util/series-curve-util.js"].coveredLines = 42;
_yuitest_coverage["build/series-curve-util/series-curve-util.js"].coveredFunctions = 4;
_yuitest_coverline("build/series-curve-util/series-curve-util.js", 1);
YUI.add('series-curve-util', function (Y, NAME) {

/**
 * Provides functionality for drawing curves in a series.
 *
 * @module charts
 * @submodule series-curve-util
 */
/**
 * Utility class used for calculating curve points.
 *
 * @class CurveUtil
 * @constructor
 * @submodule series-curve-util
 */
_yuitest_coverfunc("build/series-curve-util/series-curve-util.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-curve-util/series-curve-util.js", 16);
function CurveUtil()
{
}

_yuitest_coverline("build/series-curve-util/series-curve-util.js", 20);
CurveUtil.prototype = {
    /**
     * Creates an array of start, end and control points for splines.
     *
     * @method getCurveControlPoints
     * @param {Array} xcoords Collection of x-coordinates used for calculate the curves
     * @param {Array} ycoords Collection of y-coordinates used for calculate the curves
     * @return Object
     * @protected
     */
    getCurveControlPoints: function(xcoords, ycoords)
    {
		_yuitest_coverfunc("build/series-curve-util/series-curve-util.js", "getCurveControlPoints", 30);
_yuitest_coverline("build/series-curve-util/series-curve-util.js", 32);
var outpoints = [],
            i = 1,
            l = xcoords.length - 1,
		    xvals = [],
		    yvals = [];


		// Too few points, need at least two
		_yuitest_coverline("build/series-curve-util/series-curve-util.js", 40);
if (l < 1)
        {
			_yuitest_coverline("build/series-curve-util/series-curve-util.js", 42);
return null;
		}

        _yuitest_coverline("build/series-curve-util/series-curve-util.js", 45);
outpoints[0] = {
            startx: xcoords[0],
            starty: ycoords[0],
            endx: xcoords[1],
            endy: ycoords[1]
        };

		// Special case, the Bezier should be a straight line
        _yuitest_coverline("build/series-curve-util/series-curve-util.js", 53);
if (l === 1)
        {
			_yuitest_coverline("build/series-curve-util/series-curve-util.js", 55);
outpoints[0].ctrlx1 = (2.0*xcoords[0] + xcoords[1])/3.0;
			_yuitest_coverline("build/series-curve-util/series-curve-util.js", 56);
outpoints[0].ctrly2 = (2.0*ycoords[0] + ycoords[1])/3.0;
			_yuitest_coverline("build/series-curve-util/series-curve-util.js", 57);
outpoints[0].ctrlx2 = 2.0*outpoints[0].ctrlx1 - xcoords[0];
            _yuitest_coverline("build/series-curve-util/series-curve-util.js", 58);
outpoints[0].ctrly2 = 2.0*outpoints[0].ctrly1 - ycoords[0];
            _yuitest_coverline("build/series-curve-util/series-curve-util.js", 59);
return outpoints;
		}

		_yuitest_coverline("build/series-curve-util/series-curve-util.js", 62);
for (; i < l; ++i)
        {
			_yuitest_coverline("build/series-curve-util/series-curve-util.js", 64);
outpoints.push({startx: Math.round(xcoords[i]), starty: Math.round(ycoords[i]), endx: Math.round(xcoords[i+1]), endy: Math.round(ycoords[i+1])});
			_yuitest_coverline("build/series-curve-util/series-curve-util.js", 65);
xvals[i] = 4.0 * xcoords[i] + 2*xcoords[i+1];
			_yuitest_coverline("build/series-curve-util/series-curve-util.js", 66);
yvals[i] = 4.0*ycoords[i] + 2*ycoords[i+1];
		}

		_yuitest_coverline("build/series-curve-util/series-curve-util.js", 69);
xvals[0] = xcoords[0] + (2.0 * xcoords[1]);
		_yuitest_coverline("build/series-curve-util/series-curve-util.js", 70);
xvals[l-1] = (8.0 * xcoords[l-1] + xcoords[l]) / 2.0;
		_yuitest_coverline("build/series-curve-util/series-curve-util.js", 71);
xvals = this.getControlPoints(xvals.concat());
        _yuitest_coverline("build/series-curve-util/series-curve-util.js", 72);
yvals[0] = ycoords[0] + (2.0 * ycoords[1]);
		_yuitest_coverline("build/series-curve-util/series-curve-util.js", 73);
yvals[l-1] = (8.0 * ycoords[l-1] + ycoords[l]) / 2.0;
		_yuitest_coverline("build/series-curve-util/series-curve-util.js", 74);
yvals = this.getControlPoints(yvals.concat());

        _yuitest_coverline("build/series-curve-util/series-curve-util.js", 76);
for (i = 0; i < l; ++i)
        {
			_yuitest_coverline("build/series-curve-util/series-curve-util.js", 78);
outpoints[i].ctrlx1 = Math.round(xvals[i]);
            _yuitest_coverline("build/series-curve-util/series-curve-util.js", 79);
outpoints[i].ctrly1 = Math.round(yvals[i]);

			_yuitest_coverline("build/series-curve-util/series-curve-util.js", 81);
if (i < l-1)
            {
				_yuitest_coverline("build/series-curve-util/series-curve-util.js", 83);
outpoints[i].ctrlx2 = Math.round(2*xcoords[i+1] - xvals[i+1]);
                _yuitest_coverline("build/series-curve-util/series-curve-util.js", 84);
outpoints[i].ctrly2 = Math.round(2*ycoords[i+1] - yvals[i+1]);
			}
			else
            {
				_yuitest_coverline("build/series-curve-util/series-curve-util.js", 88);
outpoints[i].ctrlx2 = Math.round((xcoords[l] + xvals[l-1])/2);
                _yuitest_coverline("build/series-curve-util/series-curve-util.js", 89);
outpoints[i].ctrly2 = Math.round((ycoords[l] + yvals[l-1])/2);
			}
		}

		_yuitest_coverline("build/series-curve-util/series-curve-util.js", 93);
return outpoints;
	},

    /**
     * Gets the control points for the curve.
     *
     * @method getControlPoints
     * @param {Array} vals Collection of values coords used to generate control points.
     * @return Array
     * @private
     */
	getControlPoints: function(vals)
    {
		_yuitest_coverfunc("build/series-curve-util/series-curve-util.js", "getControlPoints", 104);
_yuitest_coverline("build/series-curve-util/series-curve-util.js", 106);
var l = vals.length,
            x = [],
            tmp = [],
            b = 2.0,
            i = 1;
		_yuitest_coverline("build/series-curve-util/series-curve-util.js", 111);
x[0] = vals[0] / b;
		_yuitest_coverline("build/series-curve-util/series-curve-util.js", 112);
for (; i < l; ++i)
        {
			_yuitest_coverline("build/series-curve-util/series-curve-util.js", 114);
tmp[i] = 1/b;
			_yuitest_coverline("build/series-curve-util/series-curve-util.js", 115);
b = (i < l-1 ? 4.0 : 3.5) - tmp[i];
			_yuitest_coverline("build/series-curve-util/series-curve-util.js", 116);
x[i] = (vals[i] - x[i-1]) / b;
		}

		_yuitest_coverline("build/series-curve-util/series-curve-util.js", 119);
for (i = 1; i < l; ++i)
        {
			_yuitest_coverline("build/series-curve-util/series-curve-util.js", 121);
x[l-i-1] -= tmp[l-i] * x[l-i];
		}

		_yuitest_coverline("build/series-curve-util/series-curve-util.js", 124);
return x;
	}
};
_yuitest_coverline("build/series-curve-util/series-curve-util.js", 127);
Y.CurveUtil = CurveUtil;


}, '@VERSION@');
