/**
* jsBezier-0.6
*
* Copyright (c) 2010 - 2013 Simon Porritt (simon.porritt@gmail.com)
*
* licensed under the MIT license.
* 
* a set of Bezier curve functions that deal with Beziers, used by jsPlumb, and perhaps useful for other people.  These functions work with Bezier
* curves of arbitrary degree.
*
* - functions are all in the 'jsBezier' namespace.  
* 
* - all input points should be in the format {x:.., y:..}. all output points are in this format too.
* 
* - all input curves should be in the format [ {x:.., y:..}, {x:.., y:..}, {x:.., y:..}, {x:.., y:..} ]
* 
* - 'location' as used as an input here refers to a decimal in the range 0-1 inclusive, which indicates a point some proportion along the length
* of the curve.  location as output has the same format and meaning.
* 
* 
* Function List:
* --------------
* 
* distanceFromCurve(point, curve)
* 
* 	Calculates the distance that the given point lies from the given Bezier.  Note that it is computed relative to the center of the Bezier,
* so if you have stroked the curve with a wide pen you may wish to take that into account!  The distance returned is relative to the values 
* of the curve and the point - it will most likely be pixels.
* 
* gradientAtPoint(curve, location)
* 
* 	Calculates the gradient to the curve at the given location, as a decimal between 0 and 1 inclusive.
*
* gradientAtPointAlongCurveFrom (curve, location)
*
*	Calculates the gradient at the point on the given curve that is 'distance' units from location. 
* 
* nearestPointOnCurve(point, curve) 
* 
*	Calculates the nearest point to the given point on the given curve.  The return value of this is a JS object literal, containing both the
*point's coordinates and also the 'location' of the point (see above), for example:  { point:{x:551,y:150}, location:0.263365 }.
* 
* pointOnCurve(curve, location)
* 
* 	Calculates the coordinates of the point on the given Bezier curve at the given location.  
* 		
* pointAlongCurveFrom(curve, location, distance)
* 
* 	Calculates the coordinates of the point on the given curve that is 'distance' units from location.  'distance' should be in the same coordinate
* space as that used to construct the Bezier curve.  For an HTML Canvas usage, for example, distance would be a measure of pixels.
*
* locationAlongCurveFrom(curve, location, distance)
* 
* 	Calculates the location on the given curve that is 'distance' units from location.  'distance' should be in the same coordinate
* space as that used to construct the Bezier curve.  For an HTML Canvas usage, for example, distance would be a measure of pixels.
* 
* perpendicularToCurveAt(curve, location, length, distance)
* 
* 	Calculates the perpendicular to the given curve at the given location.  length is the length of the line you wish for (it will be centered
* on the point at 'location'). distance is optional, and allows you to specify a point along the path from the given location as the center of
* the perpendicular returned.  The return value of this is an array of two points: [ {x:...,y:...}, {x:...,y:...} ].  
*  
* 
*/

(function() {
	
	if(typeof Math.sgn == "undefined") {
		Math.sgn = function(x) { return x == 0 ? 0 : x > 0 ? 1 :-1; };
	}
	
	var Vectors = {
			subtract 	: 	function(v1, v2) { return {x:v1.x - v2.x, y:v1.y - v2.y }; },
			dotProduct	: 	function(v1, v2) { return (v1.x * v2.x)  + (v1.y * v2.y); },
			square		:	function(v) { return Math.sqrt((v.x * v.x) + (v.y * v.y)); },
			scale		:	function(v, s) { return {x:v.x * s, y:v.y * s }; }
		},
		
		maxRecursion = 64, 
		flatnessTolerance = Math.pow(2.0,-maxRecursion-1);

	/**
	 * Calculates the distance that the point lies from the curve.
	 * 
	 * @param point a point in the form {x:567, y:3342}
	 * @param curve a Bezier curve in the form [{x:..., y:...}, {x:..., y:...}, {x:..., y:...}, {x:..., y:...}].  note that this is currently
	 * hardcoded to assume cubiz beziers, but would be better off supporting any degree. 
	 * @return a JS object literal containing location and distance, for example: {location:0.35, distance:10}.  Location is analogous to the location
	 * argument you pass to the pointOnPath function: it is a ratio of distance travelled along the curve.  Distance is the distance in pixels from
	 * the point to the curve. 
	 */
	var _distanceFromCurve = function(point, curve) {
		var candidates = [],     
	    	w = _convertToBezier(point, curve),
	    	degree = curve.length - 1, higherDegree = (2 * degree) - 1,
	    	numSolutions = _findRoots(w, higherDegree, candidates, 0),
			v = Vectors.subtract(point, curve[0]), dist = Vectors.square(v), t = 0.0;

	    for (var i = 0; i < numSolutions; i++) {
			v = Vectors.subtract(point, _bezier(curve, degree, candidates[i], null, null));
	    	var newDist = Vectors.square(v);
	    	if (newDist < dist) {
	            dist = newDist;
	        	t = candidates[i];
		    }
	    }
	    v = Vectors.subtract(point, curve[degree]);
		newDist = Vectors.square(v);
	    if (newDist < dist) {
	        dist = newDist;
	    	t = 1.0;
	    }
		return {location:t, distance:dist};
	};
	/**
	 * finds the nearest point on the curve to the given point.
	 */
	var _nearestPointOnCurve = function(point, curve) {    
		var td = _distanceFromCurve(point, curve);
	    return {point:_bezier(curve, curve.length - 1, td.location, null, null), location:td.location};
	};
	var _convertToBezier = function(point, curve) {
		var degree = curve.length - 1, higherDegree = (2 * degree) - 1,
	    	c = [], d = [], cdTable = [], w = [],
	    	z = [ [1.0, 0.6, 0.3, 0.1], [0.4, 0.6, 0.6, 0.4], [0.1, 0.3, 0.6, 1.0] ];	
	    	
	    for (var i = 0; i <= degree; i++) c[i] = Vectors.subtract(curve[i], point);
	    for (var i = 0; i <= degree - 1; i++) { 
			d[i] = Vectors.subtract(curve[i+1], curve[i]);
			d[i] = Vectors.scale(d[i], 3.0);
	    }
	    for (var row = 0; row <= degree - 1; row++) {
			for (var column = 0; column <= degree; column++) {
				if (!cdTable[row]) cdTable[row] = [];
		    	cdTable[row][column] = Vectors.dotProduct(d[row], c[column]);
			}
	    }
	    for (i = 0; i <= higherDegree; i++) {
			if (!w[i]) w[i] = [];
			w[i].y = 0.0;
			w[i].x = parseFloat(i) / higherDegree;
	    }
	    var n = degree, m = degree-1;
	    for (var k = 0; k <= n + m; k++) {
			var lb = Math.max(0, k - m),
				ub = Math.min(k, n);
			for (i = lb; i <= ub; i++) {
		    	j = k - i;
		    	w[i+j].y += cdTable[j][i] * z[j][i];
			}
	    }
	    return w;
	};
	/**
	 * counts how many roots there are.
	 */
	var _findRoots = function(w, degree, t, depth) {  
	    var left = [], right = [],	
	    	left_count, right_count,	
	    	left_t = [], right_t = [];
	    	
	    switch (_getCrossingCount(w, degree)) {
	       	case 0 : {	
	       		return 0;	
	       	}
	       	case 1 : {	
	       		if (depth >= maxRecursion) {
	       			t[0] = (w[0].x + w[degree].x) / 2.0;
	       			return 1;
	       		}
	       		if (_isFlatEnough(w, degree)) {
	       			t[0] = _computeXIntercept(w, degree);
	       			return 1;
	       		}
	       		break;
	       	}
	    }
	    _bezier(w, degree, 0.5, left, right);
	    left_count  = _findRoots(left,  degree, left_t, depth+1);
	    right_count = _findRoots(right, degree, right_t, depth+1);
	    for (var i = 0; i < left_count; i++) t[i] = left_t[i];
	    for (var i = 0; i < right_count; i++) t[i+left_count] = right_t[i];    
		return (left_count+right_count);
	};
	var _getCrossingCount = function(curve, degree) {
	    var n_crossings = 0, sign, old_sign;		    	
	    sign = old_sign = Math.sgn(curve[0].y);
	    for (var i = 1; i <= degree; i++) {
			sign = Math.sgn(curve[i].y);
			if (sign != old_sign) n_crossings++;
			old_sign = sign;
	    }
	    return n_crossings;
	};
	var _isFlatEnough = function(curve, degree) {
	    var  error,
	    	intercept_1, intercept_2, left_intercept, right_intercept,
	    	a, b, c, det, dInv, a1, b1, c1, a2, b2, c2;
	    a = curve[0].y - curve[degree].y;
	    b = curve[degree].x - curve[0].x;
	    c = curve[0].x * curve[degree].y - curve[degree].x * curve[0].y;
	
	    var max_distance_above = max_distance_below = 0.0;
	    
	    for (var i = 1; i < degree; i++) {
	        var value = a * curve[i].x + b * curve[i].y + c;       
	        if (value > max_distance_above)
	            max_distance_above = value;
	        else if (value < max_distance_below)
	        	max_distance_below = value;
	    }
	    
	    a1 = 0.0; b1 = 1.0; c1 = 0.0; a2 = a; b2 = b;
	    c2 = c - max_distance_above;
	    det = a1 * b2 - a2 * b1;
	    dInv = 1.0/det;
	    intercept_1 = (b1 * c2 - b2 * c1) * dInv;
	    a2 = a; b2 = b; c2 = c - max_distance_below;
	    det = a1 * b2 - a2 * b1;
	    dInv = 1.0/det;
	    intercept_2 = (b1 * c2 - b2 * c1) * dInv;
	    left_intercept = Math.min(intercept_1, intercept_2);
	    right_intercept = Math.max(intercept_1, intercept_2);
	    error = right_intercept - left_intercept;
	    return (error < flatnessTolerance)? 1 : 0;
	};
	var _computeXIntercept = function(curve, degree) {
	    var XLK = 1.0, YLK = 0.0,
	    	XNM = curve[degree].x - curve[0].x, YNM = curve[degree].y - curve[0].y,
	    	XMK = curve[0].x - 0.0, YMK = curve[0].y - 0.0,
	    	det = XNM*YLK - YNM*XLK, detInv = 1.0/det,
	    	S = (XNM*YMK - YNM*XMK) * detInv; 
	    return 0.0 + XLK * S;
	};
	var _bezier = function(curve, degree, t, left, right) {
	    var temp = [[]];
	    for (var j =0; j <= degree; j++) temp[0][j] = curve[j];
	    for (var i = 1; i <= degree; i++) {	
			for (var j =0 ; j <= degree - i; j++) {
				if (!temp[i]) temp[i] = [];
				if (!temp[i][j]) temp[i][j] = {};
		    	temp[i][j].x = (1.0 - t) * temp[i-1][j].x + t * temp[i-1][j+1].x;
		    	temp[i][j].y = (1.0 - t) * temp[i-1][j].y + t * temp[i-1][j+1].y;
			}
	    }    
	    if (left != null) 
	    	for (j = 0; j <= degree; j++) left[j]  = temp[j][0];
	    if (right != null)
			for (j = 0; j <= degree; j++) right[j] = temp[degree-j][j];
	    
	    return (temp[degree][0]);
	};
	
	var _curveFunctionCache = {};
	var _getCurveFunctions = function(order) {
		var fns = _curveFunctionCache[order];
		if (!fns) {
			fns = [];			
			var f_term = function() { return function(t) { return Math.pow(t, order); }; },
				l_term = function() { return function(t) { return Math.pow((1-t), order); }; },
				c_term = function(c) { return function(t) { return c; }; },
				t_term = function() { return function(t) { return t; }; },
				one_minus_t_term = function() { return function(t) { return 1-t; }; },
				_termFunc = function(terms) {
					return function(t) {
						var p = 1;
						for (var i = 0; i < terms.length; i++) p = p * terms[i](t);
						return p;
					};
				};
			
			fns.push(new f_term());  // first is t to the power of the curve order		
			for (var i = 1; i < order; i++) {
				var terms = [new c_term(order)];
				for (var j = 0 ; j < (order - i); j++) terms.push(new t_term());
				for (var j = 0 ; j < i; j++) terms.push(new one_minus_t_term());
				fns.push(new _termFunc(terms));
			}
			fns.push(new l_term());  // last is (1-t) to the power of the curve order
		
			_curveFunctionCache[order] = fns;
		}
			
		return fns;
	};
	
	
	/**
	 * calculates a point on the curve, for a Bezier of arbitrary order.
	 * @param curve an array of control points, eg [{x:10,y:20}, {x:50,y:50}, {x:100,y:100}, {x:120,y:100}].  For a cubic bezier this should have four points.
	 * @param location a decimal indicating the distance along the curve the point should be located at.  this is the distance along the curve as it travels, taking the way it bends into account.  should be a number from 0 to 1, inclusive.
	 */
	var _pointOnPath = function(curve, location) {		
		var cc = _getCurveFunctions(curve.length - 1),
			_x = 0, _y = 0;
		for (var i = 0; i < curve.length ; i++) {
			_x = _x + (curve[i].x * cc[i](location));
			_y = _y + (curve[i].y * cc[i](location));
		}
		
		return {x:_x, y:_y};
	};
	
	var _dist = function(p1,p2) {
		return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
	};

	var _isPoint = function(curve) {
		return curve[0].x == curve[1].x && curve[0].y == curve[1].y;
	};
	
	/**
	 * finds the point that is 'distance' along the path from 'location'.  this method returns both the x,y location of the point and also
	 * its 'location' (proportion of travel along the path); the method below - _pointAlongPathFrom - calls this method and just returns the
	 * point.
	 */
	var _pointAlongPath = function(curve, location, distance) {

		if (_isPoint(curve)) {
			return {
				point:curve[0],
				location:location
			};
		}

		var prev = _pointOnPath(curve, location), 
			tally = 0, 
			curLoc = location, 
			direction = distance > 0 ? 1 : -1, 
			cur = null;
			
		while (tally < Math.abs(distance)) {
			curLoc += (0.005 * direction);
			cur = _pointOnPath(curve, curLoc);
			tally += _dist(cur, prev);	
			prev = cur;
		}
		return {point:cur, location:curLoc};        	
	};
	
	var _length = function(curve) {
		if (_isPoint(curve)) return 0;

		var prev = _pointOnPath(curve, 0),
			tally = 0,
			curLoc = 0,
			direction = 1,
			cur = null;
			
		while (curLoc < 1) {
			curLoc += (0.005 * direction);
			cur = _pointOnPath(curve, curLoc);
			tally += _dist(cur, prev);	
			prev = cur;
		}
		return tally;
	};
	
	/**
	 * finds the point that is 'distance' along the path from 'location'.  
	 */
	var _pointAlongPathFrom = function(curve, location, distance) {
		return _pointAlongPath(curve, location, distance).point;
	};

	/**
	 * finds the location that is 'distance' along the path from 'location'.  
	 */
	var _locationAlongPathFrom = function(curve, location, distance) {
		return _pointAlongPath(curve, location, distance).location;
	};
	
	/**
	 * returns the gradient of the curve at the given location, which is a decimal between 0 and 1 inclusive.
	 * 
	 * thanks // http://bimixual.org/AnimationLibrary/beziertangents.html
	 */
	var _gradientAtPoint = function(curve, location) {
		var p1 = _pointOnPath(curve, location),	
			p2 = _pointOnPath(curve.slice(0, curve.length - 1), location),
			dy = p2.y - p1.y, dx = p2.x - p1.x;
		return dy == 0 ? Infinity : Math.atan(dy / dx);		
	};
	
	/**
	returns the gradient of the curve at the point which is 'distance' from the given location.
	if this point is greater than location 1, the gradient at location 1 is returned.
	if this point is less than location 0, the gradient at location 0 is returned.
	*/
	var _gradientAtPointAlongPathFrom = function(curve, location, distance) {
		var p = _pointAlongPath(curve, location, distance);
		if (p.location > 1) p.location = 1;
		if (p.location < 0) p.location = 0;		
		return _gradientAtPoint(curve, p.location);		
	};

	/**
	 * calculates a line that is 'length' pixels long, perpendicular to, and centered on, the path at 'distance' pixels from the given location.
	 * if distance is not supplied, the perpendicular for the given location is computed (ie. we set distance to zero).
	 */
	var _perpendicularToPathAt = function(curve, location, length, distance) {
		distance = distance == null ? 0 : distance;
		var p = _pointAlongPath(curve, location, distance),
			m = _gradientAtPoint(curve, p.location),
			_theta2 = Math.atan(-1 / m),
			y =  length / 2 * Math.sin(_theta2),
			x =  length / 2 * Math.cos(_theta2);
		return [{x:p.point.x + x, y:p.point.y + y}, {x:p.point.x - x, y:p.point.y - y}];
	};
	
	var jsBezier = window.jsBezier = {
		distanceFromCurve : _distanceFromCurve,
		gradientAtPoint : _gradientAtPoint,
		gradientAtPointAlongCurveFrom : _gradientAtPointAlongPathFrom,
		nearestPointOnCurve : _nearestPointOnCurve,
		pointOnCurve : _pointOnPath,		
		pointAlongCurveFrom : _pointAlongPathFrom,
		perpendicularToCurveAt : _perpendicularToPathAt,
		locationAlongCurveFrom:_locationAlongPathFrom,
		getLength:_length
	};
})();

/**
 * jsPlumbGeom v0.1
 *
 * Various geometry functions written as part of jsPlumb and perhaps useful for others.
 *
 * Copyright (c) 2013 Simon Porritt
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
;(function() {

	
	"use strict";

	// Establish the root object, `window` in the browser, or `global` on the server.
	var root = this;
	var jsPlumbGeom;
	if (typeof exports !== 'undefined') {
		jsPlumbGeom = exports;
	} else {
		jsPlumbGeom = root.jsPlumbGeom = {};
	}

	var _isa = function(a) { return Object.prototype.toString.call(a) === "[object Array]"; },
		_pointHelper = function(p1, p2, fn) {
		    p1 = _isa(p1) ? p1 : [p1.x, p1.y];
		    p2 = _isa(p2) ? p2 : [p2.x, p2.y];    
		    return fn(p1, p2);
		},
		/**
		* @name jsPlumbGeom.gradient
		* @function
		* @desc Calculates the gradient of a line between the two points.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The gradient of a line between the two points.
		*/
		_gradient = jsPlumbGeom.gradient = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) { 
		        if (_p2[0] == _p1[0])
		            return _p2[1] > _p1[1] ? Infinity : -Infinity;
		        else if (_p2[1] == _p1[1]) 
		            return _p2[0] > _p1[0] ? 0 : -0;
		        else 
		            return (_p2[1] - _p1[1]) / (_p2[0] - _p1[0]); 
		    });		
		},
		/**
		* @name jsPlumbGeom.normal
		* @function
		* @desc Calculates the gradient of a normal to a line between the two points.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The gradient of a normal to a line between the two points.
		*/
		_normal = jsPlumbGeom.normal = function(p1, p2) {
		    return -1 / _gradient(p1, p2);
		},
		/**
		* @name jsPlumbGeom.lineLength
		* @function
		* @desc Calculates the length of a line between the two points.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The length of a line between the two points.
		*/
		_lineLength = jsPlumbGeom.lineLength = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) {
		        return Math.sqrt(Math.pow(_p2[1] - _p1[1], 2) + Math.pow(_p2[0] - _p1[0], 2));			
		    });
		},
		/**
		* @name jsPlumbGeom.quadrant
		* @function
		* @desc Calculates the quadrant in which the angle between the two points lies. 
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Integer} The quadrant - 1 for upper right, 2 for lower right, 3 for lower left, 4 for upper left.
		*/
		_quadrant = jsPlumbGeom.quadrant = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) {
		        if (_p2[0] > _p1[0]) {
		            return (_p2[1] > _p1[1]) ? 2 : 1;
		        }
		        else if (_p2[0] == _p1[0]) {
		            return _p2[1] > _p1[1] ? 2 : 1;    
		        }
		        else {
		            return (_p2[1] > _p1[1]) ? 3 : 4;
		        }
		    });
		},
		/**
		* @name jsPlumbGeom.theta
		* @function
		* @desc Calculates the angle between the two points. 
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The angle between the two points.
		*/
		_theta = jsPlumbGeom.theta = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) {
		        var m = _gradient(_p1, _p2),
		            t = Math.atan(m),
		            s = _quadrant(_p1, _p2);
		        if ((s == 4 || s== 3)) t += Math.PI;
		        if (t < 0) t += (2 * Math.PI);
		    
		        return t;
		    });
		},
		/**
		* @name jsPlumbGeom.intersects
		* @function
		* @desc Calculates whether or not the two rectangles intersect.
		* @param {Rectangle} r1 First rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
		* @param {Rectangle} r2 Second rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
		* @return {Boolean} True if the rectangles intersect, false otherwise.
		*/
		_intersects = jsPlumbGeom.intersects = function(r1, r2) {
		    var x1 = r1.x, x2 = r1.x + r1.w, y1 = r1.y, y2 = r1.y + r1.h,
		        a1 = r2.x, a2 = r2.x + r2.w, b1 = r2.y, b2 = r2.y + r2.h;
		
			return  ( (x1 <= a1 && a1 <= x2) && (y1 <= b1 && b1 <= y2) ) ||
			        ( (x1 <= a2 && a2 <= x2) && (y1 <= b1 && b1 <= y2) ) ||
			        ( (x1 <= a1 && a1 <= x2) && (y1 <= b2 && b2 <= y2) ) ||
			        ( (x1 <= a2 && a1 <= x2) && (y1 <= b2 && b2 <= y2) ) ||	
			        ( (a1 <= x1 && x1 <= a2) && (b1 <= y1 && y1 <= b2) ) ||
			        ( (a1 <= x2 && x2 <= a2) && (b1 <= y1 && y1 <= b2) ) ||
			        ( (a1 <= x1 && x1 <= a2) && (b1 <= y2 && y2 <= b2) ) ||
			        ( (a1 <= x2 && x1 <= a2) && (b1 <= y2 && y2 <= b2) );
		},
		_segmentMultipliers = [null, [1, -1], [1, 1], [-1, 1], [-1, -1] ],
		_inverseSegmentMultipliers = [null, [-1, -1], [-1, 1], [1, 1], [1, -1] ],
		/**
		* @name jsPlumbGeom.pointOnLine
		* @function
		* @desc Calculates a point on the line from `fromPoint` to `toPoint` that is `distance` units along the length of the line.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Point} Point on the line, in the form `{ x:..., y:... }`.
		*/
		_pointOnLine = jsPlumbGeom.pointOnLine = function(fromPoint, toPoint, distance) {
		    var m = _gradient(fromPoint, toPoint),
		        s = _quadrant(fromPoint, toPoint),
		        segmentMultiplier = distance > 0 ? _segmentMultipliers[s] : _inverseSegmentMultipliers[s],
		        theta = Math.atan(m),
		        y = Math.abs(distance * Math.sin(theta)) * segmentMultiplier[1],
		        x =  Math.abs(distance * Math.cos(theta)) * segmentMultiplier[0];
		    return { x:fromPoint.x + x, y:fromPoint.y + y };
		},
		/**
		* @name jsPlumbGeom.perpendicularLineTo
		* @function
		* @desc Calculates a line of length `length` that is perpendicular to the line from `fromPoint` to `toPoint` and passes through `toPoint`.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Line} Perpendicular line, in the form `[ { x:..., y:... }, { x:..., y:... } ]`.
		*/        
		_perpendicularLineTo = jsPlumbGeom.perpendicularLineTo = function(fromPoint, toPoint, length) {
		    var m = _gradient(fromPoint, toPoint),
		        theta2 = Math.atan(-1 / m),
		        y =  length / 2 * Math.sin(theta2),
		        x =  length / 2 * Math.cos(theta2);
		    return [{x:toPoint.x + x, y:toPoint.y + y}, {x:toPoint.x - x, y:toPoint.y - y}];
		};	
}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 1.5.5
 * 
 * Provides a way to visually connect elements on an HTML page, using either SVG or VML.  
 * 
 * This file contains the util functions
 *
 * Copyright (c) 2010 - 2013 Simon Porritt (http://jsplumb.org)
 * 
 * http://jsplumb.org
 * http://github.com/sporritt/jsplumb
 * http://code.google.com/p/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */

;(function() {

    var _isa = function(a) { return Object.prototype.toString.call(a) === "[object Array]"; },
        _isnum = function(n) { return Object.prototype.toString.call(n) === "[object Number]"; },
        _iss = function(s) { return typeof s === "string"; },
        _isb = function(s) { return typeof s === "boolean"; },
        _isnull = function(s) { return s == null; },  
        _iso = function(o) { return o == null ? false : Object.prototype.toString.call(o) === "[object Object]"; },
        _isd = function(o) { return Object.prototype.toString.call(o) === "[object Date]"; },
        _isf = function(o) { return Object.prototype.toString.call(o) === "[object Function]"; },
        _ise = function(o) {
            for (var i in o) { if (o.hasOwnProperty(i)) return false; }
            return true;
        },
        pointHelper = function(p1, p2, fn) {
            p1 = _isa(p1) ? p1 : [p1.x, p1.y];
            p2 = _isa(p2) ? p2 : [p2.x, p2.y];    
            return fn(p1, p2);
        };
    
    jsPlumbUtil = {        
        isArray : _isa,        
        isString : _iss,        
        isBoolean: _isb,        
        isNull : _isnull,        
        isObject : _iso,
        isDate : _isd,
        isFunction: _isf,
        isEmpty:_ise,
        isNumber:_isnum,
        clone : function(a) {
            if (_iss(a)) return "" + a;
            else if (_isb(a)) return !!a;
            else if (_isd(a)) return new Date(a.getTime());
            else if (_isf(a)) return a;
            else if (_isa(a)) {
                var b = [];
                for (var i = 0; i < a.length; i++)
                    b.push(this.clone(a[i]));
                return b;
            }
            else if (_iso(a)) {
                var c = {};
                for (var j in a)
                    c[j] = this.clone(a[j]);
                return c;		
            }
            else return a;
        },
        merge : function(a, b) {		
            var c = this.clone(a);		
            for (var i in b) {
                if (c[i] == null || _iss(b[i]) || _isb(b[i]))
                    c[i] = b[i];
                else {
                    if (_isa(b[i])/* && this.isArray(c[i])*/) {
                        var ar = [];
                        // if c's object is also an array we can keep its values.
                        if (_isa(c[i])) ar.push.apply(ar, c[i]);
                        ar.push.apply(ar, b[i]);
                        c[i] = ar;
                    }
                    else if(_iso(b[i])) {	
                        // overwite c's value with an object if it is not already one.
                        if (!_iso(c[i])) 
                            c[i] = {};
                        for (var j in b[i])
                            c[i][j] = b[i][j];
                    }
                }
            }
            return c;
        },
        copyValues:function(names, from, to) {
            for (var i = 0; i < names.length; i++)
                to[names[i]] = from[names[i]];
        },
        //
        // chain a list of functions, supplied by [ object, method name, args ], and return on the first
        // one that returns the failValue. if none return the failValue, return the successValue.
        //
        functionChain : function(successValue, failValue, fns) {        
            for (var i = 0; i < fns.length; i++) {
                var o = fns[i][0][fns[i][1]].apply(fns[i][0], fns[i][2]);
                if (o === failValue) {
                    return o;
                }
            }                
            return successValue;
        },
        // take the given model and expand out any parameters.
        populate : function(model, values) {		
            // for a string, see if it has parameter matches, and if so, try to make the substitutions.
            var getValue = function(fromString) {
                    var matches = fromString.match(/(\${.*?})/g);
                    if (matches != null) {
                        for (var i = 0; i < matches.length; i++) {
                            var val = values[matches[i].substring(2, matches[i].length - 1)];
                            if (val != null) {
                                fromString = fromString.replace(matches[i], val);
                            }
                        }							
                    }
                    return fromString;
                },		
                // process one entry.
                _one = function(d) {
                    if (d != null) {
                        if (_iss(d)) {
                            return getValue(d);
                        }
                        else if (_isa(d)) {
                            var r = [];	
                            for (var i = 0; i < d.length; i++)
                                r.push(_one(d[i]));
                            return r;
                        }
                        else if (_iso(d)) {
                            var s = {};
                            for (var j in d) {
                                s[j] = _one(d[j]);
                            }
                            return s;
                        }
                        else {
                            return d;
                        }
                    }
                };
            
            return _one(model);	
        },
        convertStyle : function(s, ignoreAlpha) {
            // TODO: jsPlumb should support a separate 'opacity' style member.
            if ("transparent" === s) return s;
            var o = s,
                pad = function(n) { return n.length == 1 ? "0" + n : n; },
                hex = function(k) { return pad(Number(k).toString(16)); },
                pattern = /(rgb[a]?\()(.*)(\))/;
            if (s.match(pattern)) {
                var parts = s.match(pattern)[2].split(",");
                o = "#" + hex(parts[0]) + hex(parts[1]) + hex(parts[2]);
                if (!ignoreAlpha && parts.length == 4) 
                    o = o + hex(parts[3]);
            }
            return o;
        },
        findWithFunction : function(a, f) {
            if (a)
                for (var i = 0; i < a.length; i++) if (f(a[i])) return i;
            return -1;
        },
        clampToGrid : function(x, y, grid, dontClampX, dontClampY) {
            var _gridClamp = function(n, g) { 
                var e = n % g, 
                    f = Math.floor(n / g), 
                    inc = e >= (g / 2) ? 1 : 0; 
                return (f + inc) * g; 
            };
            return [
                dontClampX || grid == null ? x : _gridClamp(x, grid[0]),
                dontClampY || grid == null ? y : _gridClamp(y, grid[1])
            ];		
        },
        indexOf : function(l, v) {
            return jsPlumbUtil.findWithFunction(l, function(_v) { return _v == v; });	
        },
        removeWithFunction : function(a, f) {
            var idx = jsPlumbUtil.findWithFunction(a, f);
            if (idx > -1) a.splice(idx, 1);
            return idx != -1;
        },
        remove : function(l, v) {
            var idx = jsPlumbUtil.indexOf(l, v);	
            if (idx > -1) l.splice(idx, 1);
            return idx != -1;
        },
        // TODO support insert index
        addWithFunction : function(list, item, hashFunction) {
            if (jsPlumbUtil.findWithFunction(list, hashFunction) == -1) list.push(item);
        },
        addToList : function(map, key, value, insertAtStart) {
            var l = map[key];
            if (l == null) {
                l = [];
                map[key] = l;
            }
            l[insertAtStart ? "unshift" : "push"](value);
            return l;
        },
        //
        // extends the given obj (which can be an array) with the given constructor function, prototype functions, and
        // class members, any of which may be null.
        //
        extend : function(child, parent, _protoFn, _protoAtts) {
            _protoFn = _protoFn || {};
            _protoAtts = _protoAtts || {};
            parent = _isa(parent) ? parent : [ parent ];            

            for (var i = 0; i < parent.length; i++) {
                for (var j in parent[i].prototype) {
                    if(parent[i].prototype.hasOwnProperty(j)) {
                        child.prototype[j] = parent[i].prototype[j];
                    }
                }
            }

            var _makeFn = function(name) {
                return function() {
                    for (var i = 0; i < parent.length; i++) {
                        if (parent[i].prototype[name])
                            parent[i].prototype[name].apply(this, arguments);
                    }                    
                    return _protoFn[name].apply(this, arguments);
                };
            };

            for (var k in _protoFn) {
                child.prototype[k] = _makeFn(k);
            }

            return child;
        },
        uuid : function() {
            return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            }));
        },
        logEnabled : true,
        log : function() {
            if (jsPlumbUtil.logEnabled && typeof console != "undefined") {
                try {
                    var msg = arguments[arguments.length - 1];
                    console.log(msg);
                }
                catch (e) {} 
            }
        },
        group : function(g) { if (jsPlumbUtil.logEnabled && typeof console != "undefined") console.group(g); },
        groupEnd : function(g) { if (jsPlumbUtil.logEnabled && typeof console != "undefined") console.groupEnd(g); },
        time : function(t) { if (jsPlumbUtil.logEnabled && typeof console != "undefined") console.time(t); },
        timeEnd : function(t) { if (jsPlumbUtil.logEnabled && typeof console != "undefined") console.timeEnd(t); },
        
        /**
		 * helper to remove an element from the DOM.
		 */
		removeElement : function(element) {
			if (element != null && element.parentNode != null) {
				element.parentNode.removeChild(element);
			}
		},
        /**
		 * helper to remove a list of elements from the DOM.
		 */
		removeElements : function(elements) {
			for ( var i = 0; i < elements.length; i++)
				jsPlumbUtil.removeElement(elements[i]);
		},
        /*
         * Function: sizeElement 
         * Helper to size and position an element. You would typically use
         * this when writing your own Connector or Endpoint implementation.
         * 
         * Parameters: 
         *  x - [int] x position for the element origin 
         *  y - [int] y position for the element origin 
         *  w - [int] width of the element 
         *  h - [int] height of the element
         *  
         */
        sizeElement : function(el, x, y, w, h) {
            if (el) {
                el.style.height = h + "px";
                el.height = h;
                el.style.width = w + "px";
                el.width = w;
                el.style.left = x + "px";
                el.style.top = y + "px";
            }
        },
        /**
        * @name jsPlumbUtil.wrap
        * @desc Wraps one function with another, creating a placeholder for the
        * wrapped function if it was null. this is used to wrap the various
        * drag/drop event functions - to allow jsPlumb to be notified of
        * important lifecycle events without imposing itself on the user's
        * drag/drop functionality. 
        * @param {Function} wrappedFunction original function to wrap; may be null.
        * @param {Function} newFunction function to wrap the original with.
        * @param {Object} [returnOnThisValue] Optional. Indicates that the wrappedFunction should 
        * not be executed if the newFunction returns a value matching 'returnOnThisValue'.
        * note that this is a simple comparison and only works for primitives right now.
        */        
        wrap : function(wrappedFunction, newFunction, returnOnThisValue) {
            wrappedFunction = wrappedFunction || function() { };
            newFunction = newFunction || function() { };
            return function() {
                var r = null;
                try {
                    r = newFunction.apply(this, arguments);
                } catch (e) {
                    jsPlumbUtil.log("jsPlumb function failed : " + e);
                }
                if (returnOnThisValue == null || (r !== returnOnThisValue)) {
                    try {
                        r = wrappedFunction.apply(this, arguments);
                    } catch (e) {
                        jsPlumbUtil.log("wrapped function failed : " + e);
                    }
                }
                return r;
            };
        }
    };

    
    jsPlumbUtil.EventGenerator = function() {
        var _listeners = {}, eventsSuspended = false;
        
        // this is a list of events that should re-throw any errors that occur during their dispatch. as of 1.3.0 this is private to
        // jsPlumb, but it seems feasible that people might want to manipulate this list.  the thinking is that we don't want event
        // listeners to bring down jsPlumb - or do we.  i can't make up my mind about this, but i know i want to hear about it if the "ready"
        // event fails, because then my page has most likely not initialised.  so i have this halfway-house solution.  it will be interesting
        // to hear what other people think.
        var eventsToDieOn = [ "ready" ];
                                        
        this.bind = function(event, listener, insertAtStart) {
            jsPlumbUtil.addToList(_listeners, event, listener, insertAtStart);     
            return this;        
        };
                 
        this.fire = function(event, value, originalEvent) {
            if (!eventsSuspended && _listeners[event]) {
                // instead of looping through the array we get a counter and a length, because it is possible
                // that an event fired from here could cause the object to get cleaned up, which would throw
                // away the listeners. so after each cycle through the loop we check to ensure we haven't
                // been nuked.
                var l = _listeners[event].length, i = 0, _gone = false, ret = null;
                if (!this.shouldFireEvent || this.shouldFireEvent(event, value, originalEvent)) {
                    while (!_gone && i < l && ret !== false) {                    
                    
                        // doing it this way rather than catching and then possibly re-throwing means that an error propagated by this
                        // method will have the whole call stack available in the debugger.
                        if (jsPlumbUtil.findWithFunction(eventsToDieOn, function(e) { return e === event; }) != -1) 
                            _listeners[event][i](value, originalEvent);
                        else {
                            // for events we don't want to die on, catch and log.
                            try {                            
                                ret = _listeners[event][i](value, originalEvent);
                            } catch (e) {
                                jsPlumbUtil.log("jsPlumb: fire failed for event " + event + " : " + e);
                            }
                        }
                        i++;
                        if (_listeners == null || _listeners[event] == null) _gone = true;                    
                    }
                }
            }
            return this;
        };
        
        this.unbind = function(event) {
            if (event)
                delete _listeners[event];
            else {
                _listeners = {};
            }
            return this;
        };
        
        this.getListener = function(forEvent) {
            return _listeners[forEvent];
        };              
        this.setSuspendEvents = function(val) {
            eventsSuspended = val;    
        };        
        this.isSuspendEvents = function() {
            return eventsSuspended;
        };        
        this.cleanupListeners = function() {
            for (var i in _listeners) {
                _listeners[i].splice(0);
                delete _listeners[i];
            }
        };
    };


    jsPlumbUtil.EventGenerator.prototype = {
        cleanup:function() {
            this.cleanupListeners();
        }
    };


    // thanks MDC
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FFunction%2Fbind
    if (!Function.prototype.bind) {
      Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
          // closest thing possible to the ECMAScript 5 internal IsCallable function
          throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1), 
            fToBind = this, 
            fNOP = function () {},
            fBound = function () {
              return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                                   aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
      };
    }

})();
/*
 * jsPlumb
 * 
 * Title:jsPlumb 1.5.5
 * 
 * Provides a way to visually connect elements on an HTML page, using either SVG, Canvas
 * elements, or VML.  
 * 
 * This file contains the base functionality for DOM type adapters. 
 *
 * Copyright (c) 2010 - 2013 Simon Porritt (http://jsplumb.org)
 * 
 * http://jsplumb.org
 * http://github.com/sporritt/jsplumb
 * http://code.google.com/p/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;(function() {
    
		var canvasAvailable = !!document.createElement('canvas').getContext,
		svgAvailable = !!window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"),
		// http://stackoverflow.com/questions/654112/how-do-you-detect-support-for-vml-or-svg-in-a-browser
		vmlAvailable = function() {		    
            if (vmlAvailable.vml === undefined) { 
                var a = document.body.appendChild(document.createElement('div'));
            	a.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
            	var b = a.firstChild;
            	if (b != null && b.style != null) {
	            	b.style.behavior = "url(#default#VML)";
	            	vmlAvailable.vml = b ? typeof b.adj == "object": true;
	            }
	            else
	            	vmlAvailable.vml = false;
            	a.parentNode.removeChild(a);
            }
            return vmlAvailable.vml;
		};
        
    /**
		Manages dragging for some instance of jsPlumb.
	*/
	var DragManager = function(_currentInstance) {		
		var _draggables = {}, _dlist = [], _delements = {}, _elementsWithEndpoints = {},			
			// elementids mapped to the draggable to which they belong.
			_draggablesForElements = {};			

        /**
            register some element as draggable.  right now the drag init stuff is done elsewhere, and it is
            possible that will continue to be the case.
        */
		this.register = function(el) {
            var jpcl = jsPlumb.CurrentLibrary,
            	_el = jpcl.getElementObject(el),
            	id = _currentInstance.getId(el),                
                parentOffset = jpcl.getOffset(_el);
                    
            if (!_draggables[id]) {
                _draggables[id] = el;
                _dlist.push(el);
                _delements[id] = {};
            }
				
			// look for child elements that have endpoints and register them against this draggable.
			var _oneLevel = function(p, startOffset) {
                if (p) {											
                    for (var i = 0; i < p.childNodes.length; i++) {
                        if (p.childNodes[i].nodeType != 3 && p.childNodes[i].nodeType != 8) {
                            var cEl = jpcl.getElementObject(p.childNodes[i]),
                                cid = _currentInstance.getId(p.childNodes[i], null, true);
                            if (cid && _elementsWithEndpoints[cid] && _elementsWithEndpoints[cid] > 0) {
                                var cOff = jpcl.getOffset(cEl);
                                _delements[id][cid] = {
                                    id:cid,
                                    offset:{
                                        left:cOff.left - parentOffset.left,
                                        top:cOff.top - parentOffset.top
                                    }
                                };
                                _draggablesForElements[cid] = id;
                            }
                            _oneLevel(p.childNodes[i]);
                        }	
                    }
                }
			};

			_oneLevel(el);
		};
		
		// refresh the offsets for child elements of this element. 
		this.updateOffsets = function(elId) {
			var jpcl = jsPlumb.CurrentLibrary,
				el = jpcl.getElementObject(elId),
				domEl = jpcl.getDOMElement(el),
				id = _currentInstance.getId(domEl),
				children = _delements[id],
				parentOffset = jpcl.getOffset(el);
				
			if (children) {
				for (var i in children) {
					var cel = jpcl.getElementObject(i),
						cOff = jpcl.getOffset(cel);
						
					_delements[id][i] = {
						id:i,
						offset:{
							left:cOff.left - parentOffset.left,
							top:cOff.top - parentOffset.top
						}
					};
					_draggablesForElements[i] = id;
				}
			}
		};

		/**
			notification that an endpoint was added to the given el.  we go up from that el's parent
			node, looking for a parent that has been registered as a draggable. if we find one, we add this
			el to that parent's list of elements to update on drag (if it is not there already)
		*/
		this.endpointAdded = function(el) {
			var jpcl = jsPlumb.CurrentLibrary, b = document.body, id = _currentInstance.getId(el), 
				c = jpcl.getElementObject(el), 
				cLoc = jsPlumb.CurrentLibrary.getOffset(c),
				p = el.parentNode, done = p == b;

			_elementsWithEndpoints[id] = _elementsWithEndpoints[id] ? _elementsWithEndpoints[id] + 1 : 1;

			while (p != null && p != b) {
				var pid = _currentInstance.getId(p, null, true);
				if (pid && _draggables[pid]) {
					var idx = -1, pEl = jpcl.getElementObject(p), pLoc = jpcl.getOffset(pEl);
					
					if (_delements[pid][id] == null) {						
						_delements[pid][id] = {
							id:id,
							offset:{
								left:cLoc.left - pLoc.left,
								top:cLoc.top - pLoc.top
							}
						};
						_draggablesForElements[id] = pid;
					}
					break;
				}
				p = p.parentNode;
			}	
		};

		this.endpointDeleted = function(endpoint) {
			if (_elementsWithEndpoints[endpoint.elementId]) {
				_elementsWithEndpoints[endpoint.elementId]--;
				if (_elementsWithEndpoints[endpoint.elementId] <= 0) {
					for (var i in _delements) {
						if (_delements[i]) {
                            delete _delements[i][endpoint.elementId];
                            delete _draggablesForElements[endpoint.elementId];
                        }
					}
				}
			}		
		};	
		
		this.changeId = function(oldId, newId) {				
			_delements[newId] = _delements[oldId];			
			_delements[oldId] = {};
			_draggablesForElements[newId] = _draggablesForElements[oldId];
			_draggablesForElements[oldId] = null;			
		};

		this.getElementsForDraggable = function(id) {
			return _delements[id];	
		};

		this.elementRemoved = function(elementId) {
			var elId = _draggablesForElements[elementId];
			if (elId) {
				delete _delements[elId][elementId];
				delete _draggablesForElements[elementId];
			}
		};

		this.reset = function() {
			_draggables = {};
			_dlist = [];
			_delements = {};
			_elementsWithEndpoints = {};
		};

		//
		// notification drag ended. from 1.5.5 we check automatically if need to update some
		// ancestor's offsets.
		//
		this.dragEnded = function(el) {			
			var id = _currentInstance.getId(el),
				ancestor = _draggablesForElements[id];

			if (ancestor) this.updateOffsets(ancestor);
		};

		this.setParent = function(el, elId, p, pId) {
			var current = _draggablesForElements[elId];
			if (current) {
				if (!_delements[pId])
					_delements[pId] = {};
				_delements[pId][elId] = _delements[current][elId];
				delete _delements[current][elId];
				var pLoc = jsPlumb.CurrentLibrary.getOffset(p),
					cLoc = jsPlumb.CurrentLibrary.getOffset(el);
				_delements[pId][elId].offset = {
					left:cLoc.left - pLoc.left,
					top:cLoc.top - pLoc.top
				};				
				_draggablesForElements[elId] = pId;
			}			
		};
		
	};
        
    // for those browsers that dont have it.  they still don't have it! but at least they won't crash.
	if (!window.console)
		window.console = { time:function(){}, timeEnd:function(){}, group:function(){}, groupEnd:function(){}, log:function(){} };
            
    window.jsPlumbAdapter = {
        
        headless:false,

        getAttribute:function(el, attName) {
        	return el.getAttribute(attName);
        },

        setAttribute:function(el, a, v) {
        	el.setAttribute(a, v);
        },
        
        appendToRoot : function(node) {
            document.body.appendChild(node);
        },
        getRenderModes : function() {
            return [ "canvas", "svg", "vml" ];
        },
        isRenderModeAvailable : function(m) {
            return {
                "canvas":canvasAvailable,
                "svg":svgAvailable,
                "vml":vmlAvailable()
            }[m];
        },
        getDragManager : function(_jsPlumb) {
            return new DragManager(_jsPlumb);
        },
        setRenderMode : function(mode) {
            var renderMode;
            
            if (mode) {
				mode = mode.toLowerCase();            
			            
                var canvasAvailable = this.isRenderModeAvailable("canvas"),
                    svgAvailable = this.isRenderModeAvailable("svg"),
                    vmlAvailable = this.isRenderModeAvailable("vml");
                
                // now test we actually have the capability to do this.						
                if (mode === "svg") {
                    if (svgAvailable) renderMode = "svg";
                    else if (canvasAvailable) renderMode = "canvas";
                    else if (vmlAvailable) renderMode = "vml";
                }
                else if (mode === "canvas" && canvasAvailable) renderMode = "canvas";
                else if (vmlAvailable) renderMode = "vml";
            }

			return renderMode;
        }
    };
    

    /*

    addClass:

    add: function( elem, classNames ) {
    jQuery.each((classNames || "").split(/\s+/), function(i, className){
        if ( elem.nodeType == 1 && !jQuery.className.has( elem.className, className ) )
            elem.className += (elem.className ? " " : "") + className;
        });
    },
    */

    /*

	removeClass:

    elem.className = classNames !== undefined ?
    	jQuery.grep(elem.className.split(/\s+/), function(className){
    		return !jQuery.className.has( classNames, className );
    	}).join(" ") :

*/

})();
/**
 * @module jsPlumb
 * @description Provides a way to visually connect elements on an HTML page, using either SVG, Canvas
 * elements, or VML.   
 * 
 * - [Demo Site](http://jsplumb.org)
 * - [GitHub](http://github.com/sporritt/jsplumb)
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 *
 * Copyright (c) 2010 - 2013 Simon Porritt (simon.porritt@gmail.com)
 */
;(function() {
			
    var _ju = jsPlumbUtil,
    	_addClass = function(el, clazz) { jsPlumb.CurrentLibrary.addClass(_gel(el), clazz); },
		_hasClass = function(el, clazz) { return jsPlumb.CurrentLibrary.hasClass(_gel(el), clazz); },
		_removeClass = function(el, clazz) { jsPlumb.CurrentLibrary.removeClass(_gel(el), clazz); },
		_gel = function(el) { return jsPlumb.CurrentLibrary.getElementObject(el); },
		_dom = function(el) { return jsPlumb.CurrentLibrary.getDOMElement(el); },		
		_getOffset = function(el, _instance) {
            var o = jsPlumb.CurrentLibrary.getOffset(_gel(el));
			if (_instance != null) {
                var z = _instance.getZoom();
                return {left:o.left / z, top:o.top / z };    
            }
            else
                return o;
        },		
		_getSize = function(el) {
            return jsPlumb.CurrentLibrary.getSize(_gel(el));
        },
		
		/**
		 * creates a timestamp, using milliseconds since 1970, but as a string.
		 */
		_timestamp = function() { return "" + (new Date()).getTime(); },

		// helper method to update the hover style whenever it, or paintStyle, changes.
		// we use paintStyle as the foundation and merge hoverPaintStyle over the
		// top.
		_updateHoverStyle = function(component) {
			if (component._jsPlumb.paintStyle && component._jsPlumb.hoverPaintStyle) {
				var mergedHoverStyle = {};
				jsPlumb.extend(mergedHoverStyle, component._jsPlumb.paintStyle);
				jsPlumb.extend(mergedHoverStyle, component._jsPlumb.hoverPaintStyle);
				delete component._jsPlumb.hoverPaintStyle;
				// we want the fillStyle of paintStyle to override a gradient, if possible.
				if (mergedHoverStyle.gradient && component._jsPlumb.paintStyle.fillStyle)
					delete mergedHoverStyle.gradient;
				component._jsPlumb.hoverPaintStyle = mergedHoverStyle;
			}
		},		
		events = [ "click", "dblclick", "mouseenter", "mouseout", "mousemove", "mousedown", "mouseup", "contextmenu" ],
		eventFilters = { "mouseout":"mouseexit" },
		_updateAttachedElements = function(component, state, timestamp, sourceElement) {
			var affectedElements = component.getAttachedElements();
			if (affectedElements) {
				for (var i = 0, j = affectedElements.length; i < j; i++) {
					if (!sourceElement || sourceElement != affectedElements[i])
						affectedElements[i].setHover(state, true, timestamp);			// tell the attached elements not to inform their own attached elements.
				}
			}
		},
		_splitType = function(t) { return t == null ? null : t.split(" "); },		
		_applyTypes = function(component, params, doNotRepaint) {
			if (component.getDefaultType) {
				var td = component.getTypeDescriptor();
					
				var o = _ju.merge({}, component.getDefaultType());
				for (var i = 0, j = component._jsPlumb.types.length; i < j; i++)
					o = _ju.merge(o, component._jsPlumb.instance.getType(component._jsPlumb.types[i], td));						
					
				if (params) {
					o = _ju.populate(o, params);
				}
			
				component.applyType(o, doNotRepaint);					
				if (!doNotRepaint) component.repaint();
			}
		},		

// ------------------------------ BEGIN jsPlumbUIComponent --------------------------------------------

		jsPlumbUIComponent = window.jsPlumbUIComponent = function(params) {

			jsPlumbUtil.EventGenerator.apply(this, arguments);

			var self = this, 
				a = arguments, 				 				
				idPrefix = self.idPrefix,
				id = idPrefix + (new Date()).getTime(),
				jpcl = jsPlumb.CurrentLibrary;

			this._jsPlumb = { 
				instance: params._jsPlumb,
				parameters:params.parameters || {},
				paintStyle:null,
				hoverPaintStyle:null,
				paintStyleInUse:null,
				hover:false,
				beforeDetach:params.beforeDetach,
				beforeDrop:params.beforeDrop,
				overlayPlacements : [],
				hoverClass: params.hoverClass || params._jsPlumb.Defaults.HoverClass || jsPlumb.Defaults.HoverClass,
				types:[]
			};

			this.getId = function() { return id; };	
			
			// all components can generate events
			
			if (params.events) {
				for (var i in params.events)
					self.bind(i, params.events[i]);
			}

			// all components get this clone function.
			// TODO issue 116 showed a problem with this - it seems 'a' that is in
			// the clone function's scope is shared by all invocations of it, the classic
			// JS closure problem.  for now, jsPlumb does a version of this inline where 
			// it used to call clone.  but it would be nice to find some time to look
			// further at this.
			this.clone = function() {
				var o = {};//new Object();
				this.constructor.apply(o, a);
				return o;
			}.bind(this);				
						
			// user can supply a beforeDetach callback, which will be executed before a detach
			// is performed; returning false prevents the detach.			
			this.isDetachAllowed = function(connection) {
				var r = true;
				if (this._jsPlumb.beforeDetach) {
					try { 
						r = this._jsPlumb.beforeDetach(connection); 
					}
					catch (e) { _ju.log("jsPlumb: beforeDetach callback failed", e); }
				}
				return r;
			};
			
			// user can supply a beforeDrop callback, which will be executed before a dropped
			// connection is confirmed. user can return false to reject connection.			
			this.isDropAllowed = function(sourceId, targetId, scope, connection, dropEndpoint) {
				var r = this._jsPlumb.instance.checkCondition("beforeDrop", { 
					sourceId:sourceId, 
					targetId:targetId, 
					scope:scope,
					connection:connection,
					dropEndpoint:dropEndpoint 
				});
				if (this._jsPlumb.beforeDrop) {
					try { 
						r = this._jsPlumb.beforeDrop({ 
							sourceId:sourceId, 
							targetId:targetId, 
							scope:scope, 
							connection:connection,
							dropEndpoint:dropEndpoint
						}); 
					}
					catch (e) { _ju.log("jsPlumb: beforeDrop callback failed", e); }
				}
				return r;
			};													

		    var boundListeners = [],
		    	bindAListener = function(obj, type, fn) {
			    	boundListeners.push([obj, type, fn]);
			    	obj.bind(type, fn);
			    },
		    	domListeners = [],
            	bindOne = function(o, c, evt) {
					var filteredEvent = eventFilters[evt] || evt,
						fn = function(ee) {
							c.fire(filteredEvent, c, ee);
						};
					domListeners.push([o, evt, fn]);
					jpcl.bind(o, evt, fn);
				},
				unbindOne = function(o, evt, fn) {
					var filteredEvent = eventFilters[evt] || evt;
					jpcl.unbind(o, evt, fn);
				};

            this.bindListeners = function(obj, _self, _hoverFunction) {
                bindAListener(obj, "click", function(ep, e) { _self.fire("click", _self, e); });             
             	bindAListener(obj, "dblclick", function(ep, e) { _self.fire("dblclick", _self, e); });
                bindAListener(obj, "contextmenu", function(ep, e) { _self.fire("contextmenu", _self, e); });
                bindAListener(obj, "mouseenter", function(ep, e) {
                    if (!_self.isHover()) {
                        _hoverFunction(true);
                        _self.fire("mouseenter", _self, e);
                    }
                });
                bindAListener(obj, "mouseexit", function(ep, e) {
                    if (_self.isHover()) {
                        _hoverFunction(false);
                        _self.fire("mouseexit", _self, e);
                    }
                });	  
                bindAListener(obj, "mousedown", function(ep, e) { _self.fire("mousedown", _self, e); });
                bindAListener(obj, "mouseup", function(ep, e) { _self.fire("mouseup", _self, e); });
            };

            this.unbindListeners = function() {
            	for (var i = 0; i < boundListeners.length; i++) {
            		var o = boundListeners[i];
            		o[0].unbind(o[1], o[2]);
            	}            	
            	boundListeners = null;
            };            
		    
		    this.attachListeners = function(o, c) {
				for (var i = 0, j = events.length; i < j; i++) {
					bindOne(o, c, events[i]); 			
				}
			};	
			this.detachListeners = function() {
				for (var i = 0; i < domListeners.length; i++) {
					unbindOne(domListeners[i][0], domListeners[i][1], domListeners[i][2]);
				}
				domListeners = null;
			};	   		    
		    
		    this.reattachListenersForElement = function(o) {
			    if (arguments.length > 1) {
		    		for (var i = 0, j = events.length; i < j; i++)
		    			unbindOne(o, events[i]);
			    	for (i = 1, j = arguments.length; i < j; i++)
		    			this.attachListeners(o, arguments[i]);
		    	}
		    };		    	    			                      
		};

		jsPlumbUtil.extend(jsPlumbUIComponent, jsPlumbUtil.EventGenerator, {
			
			getParameter : function(name) { 
				return this._jsPlumb.parameters[name]; 
			},
			
			setParameter : function(name, value) { 
				this._jsPlumb.parameters[name] = value; 
			},
			
			getParameters : function() { 
				return this._jsPlumb.parameters; 
			},			
			
			setParameters : function(p) { 
				this._jsPlumb.parameters = p; 
			},			
			
			addClass : function(clazz) {
			    if (this.canvas != null)
			        _addClass(this.canvas, clazz);
			},
						
			removeClass : function(clazz) {
			    if (this.canvas != null)
			        _removeClass(this.canvas, clazz);
			},
			
			setType : function(typeId, params, doNotRepaint) {				
				this._jsPlumb.types = _splitType(typeId) || [];
				_applyTypes(this, params, doNotRepaint);									
			},
			
			getType : function() {
				return this._jsPlumb.types;
			},
			
			reapplyTypes : function(params, doNotRepaint) {
				_applyTypes(this, params, doNotRepaint);
			},
			
			hasType : function(typeId) {
				return jsPlumbUtil.indexOf(this._jsPlumb.types, typeId) != -1;
			},
			
			addType : function(typeId, params, doNotRepaint) {
				var t = _splitType(typeId), _cont = false;
				if (t != null) {
					for (var i = 0, j = t.length; i < j; i++) {
						if (!this.hasType(t[i])) {
							this._jsPlumb.types.push(t[i]);
							_cont = true;						
						}
					}
					if (_cont) _applyTypes(this, params, doNotRepaint);
				}
			},
			
			removeType : function(typeId, doNotRepaint) {
				var t = _splitType(typeId), _cont = false, _one = function(tt) {
						var idx = _ju.indexOf(this._jsPlumb.types, tt);
						if (idx != -1) {
							this._jsPlumb.types.splice(idx, 1);
							return true;
						}
						return false;
					}.bind(this);
				
				if (t != null) {
					for (var i = 0,j = t.length; i < j; i++) {
						_cont = _one(t[i]) || _cont;
					}
					if (_cont) _applyTypes(this, null, doNotRepaint);
				}
			},
			
			toggleType : function(typeId, params, doNotRepaint) {
				var t = _splitType(typeId);
				if (t != null) {
					for (var i = 0, j = t.length; i < j; i++) {
						var idx = jsPlumbUtil.indexOf(this._jsPlumb.types, t[i]);
						if (idx != -1)
							this._jsPlumb.types.splice(idx, 1);
						else
							this._jsPlumb.types.push(t[i]);
					}
						
					_applyTypes(this, params, doNotRepaint);
				}
			},
			applyType : function(t, doNotRepaint) {
				this.setPaintStyle(t.paintStyle, doNotRepaint);				
				this.setHoverPaintStyle(t.hoverPaintStyle, doNotRepaint);
				if (t.parameters){
					for (var i in t.parameters)
						this.setParameter(i, t.parameters[i]);
				}
			},
			setPaintStyle : function(style, doNotRepaint) {
//		    	this._jsPlumb.paintStyle = jsPlumb.extend({}, style);
// TODO figure out if we want components to clone paintStyle so as not to share it.
				this._jsPlumb.paintStyle = style;
		    	this._jsPlumb.paintStyleInUse = this._jsPlumb.paintStyle;
		    	_updateHoverStyle(this);
		    	if (!doNotRepaint) this.repaint();
		    },
		    getPaintStyle : function() {
		    	return this._jsPlumb.paintStyle;
		    },
		    setHoverPaintStyle : function(style, doNotRepaint) {		    	
		    	//this._jsPlumb.hoverPaintStyle = jsPlumb.extend({}, style);
// TODO figure out if we want components to clone paintStyle so as not to share it.		    	
		    	this._jsPlumb.hoverPaintStyle = style;
		    	_updateHoverStyle(this);
		    	if (!doNotRepaint) this.repaint();
		    },
		    getHoverPaintStyle : function() {
		    	return this._jsPlumb.hoverPaintStyle;
		    },
			cleanup:function() {		
				this.unbindListeners();
				this.detachListeners();
			},
			destroy:function() {
				this.cleanupListeners();
				this.clone = null;				
				this._jsPlumb = null;
			},
			
			isHover : function() { return this._jsPlumb.hover; },
			
			setHover : function(hover, ignoreAttachedElements, timestamp) {
				var jpcl = jsPlumb.CurrentLibrary;
		    	// while dragging, we ignore these events.  this keeps the UI from flashing and
		    	// swishing and whatevering.
				if (this._jsPlumb && !this._jsPlumb.instance.currentlyDragging && !this._jsPlumb.instance.isHoverSuspended()) {
		    
			    	this._jsPlumb.hover = hover;
                        
                    if (this.canvas != null) {
                        if (this._jsPlumb.instance.hoverClass != null) {                            
                            jpcl[hover ? "addClass" : "removeClass"](this.canvas, this._jsPlumb.instance.hoverClass);						                            
                        }                                              
                    }
		   		 	if (this._jsPlumb.hoverPaintStyle != null) {
						this._jsPlumb.paintStyleInUse = hover ? this._jsPlumb.hoverPaintStyle : this._jsPlumb.paintStyle;
						if (!this._jsPlumb.instance.isSuspendDrawing()) {
							timestamp = timestamp || _timestamp();
							this.repaint({timestamp:timestamp, recalc:false});
						}
					}
					// get the list of other affected elements, if supported by this component.
					// for a connection, its the endpoints.  for an endpoint, its the connections! surprise.
					if (this.getAttachedElements && !ignoreAttachedElements)
						_updateAttachedElements(this, hover, _timestamp(), this);
				}
		    }
		});

// ------------------------------ END jsPlumbUIComponent --------------------------------------------

// ------------------------------ BEGIN OverlayCapablejsPlumbUIComponent --------------------------------------------

		var _internalLabelOverlayId = "__label",
			// helper to get the index of some overlay
			_getOverlayIndex = function(component, id) {
				var idx = -1;
				for (var i = 0, j = component._jsPlumb.overlays.length; i < j; i++) {
					if (id === component._jsPlumb.overlays[i].id) {
						idx = i;
						break;
					}
				}
				return idx;
			},
			// this is a shortcut helper method to let people add a label as
			// overlay.						
			_makeLabelOverlay = function(component, params) {

				var _params = {
					cssClass:params.cssClass,
					labelStyle : component.labelStyle,					
					id:_internalLabelOverlayId,
					component:component,
					_jsPlumb:component._jsPlumb.instance  // TODO not necessary, since the instance can be accessed through the component.
				},
				mergedParams = jsPlumb.extend(_params, params);

				return new jsPlumb.Overlays[component._jsPlumb.instance.getRenderMode()].Label( mergedParams );
			},
			_processOverlay = function(component, o) {
				var _newOverlay = null;
				if (_ju.isArray(o)) {	// this is for the shorthand ["Arrow", { width:50 }] syntax
					// there's also a three arg version:
					// ["Arrow", { width:50 }, {location:0.7}] 
					// which merges the 3rd arg into the 2nd.
					var type = o[0],
						// make a copy of the object so as not to mess up anyone else's reference...
						p = jsPlumb.extend({component:component, _jsPlumb:component._jsPlumb.instance}, o[1]);
					if (o.length == 3) jsPlumb.extend(p, o[2]);
					_newOverlay = new jsPlumb.Overlays[component._jsPlumb.instance.getRenderMode()][type](p);					
				} else if (o.constructor == String) {
					_newOverlay = new jsPlumb.Overlays[component._jsPlumb.instance.getRenderMode()][o]({component:component, _jsPlumb:component._jsPlumb.instance});
				} else {
					_newOverlay = o;
				}										
					
				component._jsPlumb.overlays.push(_newOverlay);
			},
			_calculateOverlaysToAdd = function(component, params) {
				var defaultKeys = component.defaultOverlayKeys || [], o = params.overlays,
					checkKey = function(k) {
						return component._jsPlumb.instance.Defaults[k] || jsPlumb.Defaults[k] || [];
					};
				
				if (!o) o = [];

				for (var i = 0, j = defaultKeys.length; i < j; i++)
					o.unshift.apply(o, checkKey(defaultKeys[i]));
				
				return o;
			},		
			OverlayCapableJsPlumbUIComponent = window.OverlayCapableJsPlumbUIComponent = function(params) {

				jsPlumbUIComponent.apply(this, arguments);
				this._jsPlumb.overlays = [];			

				var _overlays = _calculateOverlaysToAdd(this, params);
				if (_overlays) {
					for (var i = 0, j = _overlays.length; i < j; i++) {
						_processOverlay(this, _overlays[i]);
					}
				}
				
				if (params.label) {
					var loc = params.labelLocation || this.defaultLabelLocation || 0.5,
						labelStyle = params.labelStyle || this._jsPlumb.instance.Defaults.LabelStyle || jsPlumb.Defaults.LabelStyle;

					this._jsPlumb.overlays.push(_makeLabelOverlay(this, {
						label:params.label,
						location:loc,
						labelStyle:labelStyle
					}));
				}			                                  
			};

		jsPlumbUtil.extend(OverlayCapableJsPlumbUIComponent, jsPlumbUIComponent, {
			applyType : function(t, doNotRepaint) {			
				this.removeAllOverlays(doNotRepaint);
				if (t.overlays) {
					for (var i = 0, j = t.overlays.length; i < j; i++)
						this.addOverlay(t.overlays[i], true);
				}
			},
			setHover : function(hover, ignoreAttachedElements, timestamp) {            
				if (this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged()) {
	                for (var i = 0, j = this._jsPlumb.overlays.length; i < j; i++) {
						this._jsPlumb.overlays[i][hover ? "addClass":"removeClass"](this._jsPlumb.instance.hoverClass);
					}
				}
            },
            addOverlay : function(overlay, doNotRepaint) { 
				_processOverlay(this, overlay); 
				if (!doNotRepaint) this.repaint();
			},
			getOverlay : function(id) {
				var idx = _getOverlayIndex(this, id);
				return idx >= 0 ? this._jsPlumb.overlays[idx] : null;
			},			
			getOverlays : function() {
				return this._jsPlumb.overlays;
			},			
			hideOverlay : function(id) {
				var o = this.getOverlay(id);
				if (o) o.hide();
			},
			hideOverlays : function() {
				for (var i = 0, j = this._jsPlumb.overlays.length; i < j; i++)
					this._jsPlumb.overlays[i].hide();
			},
			showOverlay : function(id) {
				var o = this.getOverlay(id);
				if (o) o.show();
			},
			showOverlays : function() {
				for (var i = 0, j = this._jsPlumb.overlays.length; i < j; i++)
					this._jsPlumb.overlays[i].show();
			},
			removeAllOverlays : function(doNotRepaint) {
				for (var i = 0, j = this._jsPlumb.overlays.length; i < j; i++) {
					if (this._jsPlumb.overlays[i].cleanup) this._jsPlumb.overlays[i].cleanup();
				}

				this._jsPlumb.overlays.splice(0, this._jsPlumb.overlays.length);
				this._jsPlumb.overlayPositions = null;
				if (!doNotRepaint)
					this.repaint();
			},
			removeOverlay : function(overlayId) {
				var idx = _getOverlayIndex(this, overlayId);
				if (idx != -1) {
					var o = this._jsPlumb.overlays[idx];
					if (o.cleanup) o.cleanup();
					this._jsPlumb.overlays.splice(idx, 1);
					this._jsPlumb.overlayPositions && delete this._jsPlumb.overlayPositions[overlayId];
				}
			},
			removeOverlays : function() {
				for (var i = 0, j = arguments.length; i < j; i++)
					this.removeOverlay(arguments[i]);
			},
			getLabel : function() {
				var lo = this.getOverlay(_internalLabelOverlayId);
				return lo != null ? lo.getLabel() : null;
			},		
			getLabelOverlay : function() {
				return this.getOverlay(_internalLabelOverlayId);
			},
			setLabel : function(l) {
				var lo = this.getOverlay(_internalLabelOverlayId);
				if (!lo) {
					var params = l.constructor == String || l.constructor == Function ? { label:l } : l;
					lo = _makeLabelOverlay(this, params);	
					this._jsPlumb.overlays.push(lo);
				}
				else {
					if (l.constructor == String || l.constructor == Function) lo.setLabel(l);
					else {
						if (l.label) lo.setLabel(l.label);
						if (l.location) lo.setLocation(l.location);
					}
				}
				
				if (!this._jsPlumb.instance.isSuspendDrawing()) 
					this.repaint();
			},
			cleanup:function() {
				for (var i = 0; i < this._jsPlumb.overlays.length; i++) {
					this._jsPlumb.overlays[i].cleanup();
					this._jsPlumb.overlays[i].destroy();
				}
				this._jsPlumb.overlays.splice(0);
				this._jsPlumb.overlayPositions = null;
			},
			setVisible:function(v) {
				this[v ? "showOverlays" : "hideOverlays"]();
			},
			setAbsoluteOverlayPosition:function(overlay, xy) {
				this._jsPlumb.overlayPositions = this._jsPlumb.overlayPositions || {};
				this._jsPlumb.overlayPositions[overlay.id] = xy;
			},
			getAbsoluteOverlayPosition:function(overlay) {
				return this._jsPlumb.overlayPositions ? this._jsPlumb.overlayPositions[overlay.id] : null;
			}
		});		

// ------------------------------ END OverlayCapablejsPlumbUIComponent --------------------------------------------
		
		var _jsPlumbInstanceIndex = 0,
			getInstanceIndex = function() {
				var i = _jsPlumbInstanceIndex + 1;
				_jsPlumbInstanceIndex++;
				return i;
			};

		var jsPlumbInstance = window.jsPlumbInstance = function(_defaults) {
				
			this.Defaults = {
				Anchor : "BottomCenter",
				Anchors : [ null, null ],
	            ConnectionsDetachable : true,
	            ConnectionOverlays : [ ],
	            Connector : "Bezier",
				Container : null,
				DoNotThrowErrors:false,
				DragOptions : { },
				DropOptions : { },
				Endpoint : "Dot",
				EndpointOverlays : [ ],
				Endpoints : [ null, null ],
				EndpointStyle : { fillStyle : "#456" },
				EndpointStyles : [ null, null ],
				EndpointHoverStyle : null,
				EndpointHoverStyles : [ null, null ],
				HoverPaintStyle : null,
				LabelStyle : { color : "black" },
				LogEnabled : false,
				Overlays : [ ],
				MaxConnections : 1, 
				PaintStyle : { lineWidth : 8, strokeStyle : "#456" },            
				ReattachConnections:false,
				RenderMode : "svg",
				Scope : "jsPlumb_DefaultScope"
			};
			if (_defaults) jsPlumb.extend(this.Defaults, _defaults);
		
			this.logEnabled = this.Defaults.LogEnabled;
			this._connectionTypes = {};
			this._endpointTypes = {};		

			jsPlumbUtil.EventGenerator.apply(this);

			var _currentInstance = this,
				_instanceIndex = getInstanceIndex(),
				_bb = _currentInstance.bind,
				_initialDefaults = {},
	            _zoom = 1,
	            _info = function(el) {
	            	var _el = _dom(el);	
	            	return { el:_el, id:(jsPlumbUtil.isString(el) && _el == null) ? el : _getId(_el) };
	            };
            
	        this.getInstanceIndex = function() { return _instanceIndex; };

        	this.setZoom = function(z, repaintEverything) {
            	_zoom = z;
            	if (repaintEverything) _currentInstance.repaintEverything();
        	};
        	this.getZoom = function() { return _zoom; };
                        
			for (var i in this.Defaults)
				_initialDefaults[i] = this.Defaults[i];
			
			this.bind = function(event, fn) {		
				if ("ready" === event && initialized) fn();
				else _bb.apply(_currentInstance,[event, fn]);
			};

			_currentInstance.importDefaults = function(d) {
				for (var i in d) {
					_currentInstance.Defaults[i] = d[i];
				}	
				return _currentInstance;
			};		
			
			_currentInstance.restoreDefaults = function() {
				_currentInstance.Defaults = jsPlumb.extend({}, _initialDefaults);
				return _currentInstance;
			};
		
		    var log = null,
		        resizeTimer = null,
		        initialized = false,
		        // TODO remove from window scope       
		        connections = [],
		        // map of element id -> endpoint lists. an element can have an arbitrary
		        // number of endpoints on it, and not all of them have to be connected
		        // to anything.         
		        endpointsByElement = {},
		        endpointsByUUID = {},
		        offsets = {},
		        offsetTimestamps = {},
		        floatingConnections = {},
		        draggableStates = {},		
		        connectionBeingDragged = false,
		        sizes = [],
		        _suspendDrawing = false,
		        _suspendedAt = null,
		        DEFAULT_SCOPE = this.Defaults.Scope,
		        renderMode = null,  // will be set in init()		
		        _curIdStamp = 1,
		        _idstamp = function() { return "" + _curIdStamp++; },							
		
				//
				// appends an element to some other element, which is calculated as follows:
				// 
				// 1. if _currentInstance.Defaults.Container exists, use that element.
				// 2. if the 'parent' parameter exists, use that.
				// 3. otherwise just use the root element (for DOM usage, the document body).
				// 
				//
				_appendElement = function(el, parent) {
					if (_currentInstance.Defaults.Container)
						jsPlumb.CurrentLibrary.appendElement(el, _currentInstance.Defaults.Container);
					else if (!parent)
						jsPlumbAdapter.appendToRoot(el);
					else
						jsPlumb.CurrentLibrary.appendElement(el, parent);
				},		
				
				//
				// YUI, for some reason, put the result of a Y.all call into an object that contains
				// a '_nodes' array, instead of handing back an array-like object like the other
				// libraries do.
				//
				_convertYUICollection = function(c) {
					return c._nodes ? c._nodes : c;
				},                

			//
			// Draws an endpoint and its connections. this is the main entry point into drawing connections as well
			// as endpoints, since jsPlumb is endpoint-centric under the hood.
			// 
			// @param element element to draw (of type library specific element object)
			// @param ui UI object from current library's event system. optional.
			// @param timestamp timestamp for this paint cycle. used to speed things up a little by cutting down the amount of offset calculations we do.
			// @param clearEdits defaults to false; indicates that mouse edits for connectors should be cleared
			///
			_draw = function(element, ui, timestamp, clearEdits) {

				// TODO is it correct to filter by headless at this top level? how would a headless adapter ever repaint?
	            if (!jsPlumbAdapter.headless && !_suspendDrawing) {
				    var id = _getId(element),
				    	repaintEls = _currentInstance.dragManager.getElementsForDraggable(id);			    

				    if (timestamp == null) timestamp = _timestamp();

				    // update the offset of everything _before_ we try to draw anything.
				    var o = _updateOffset( { elId : id, offset : ui, recalc : false, timestamp : timestamp });

			        if (repaintEls) {
			    	    for (var i in repaintEls) {									 							
			    	    	// TODO this seems to cause a lag, but we provide the offset, so in theory it 
			    	    	// should not.  is the timestamp failing?
				    		_updateOffset( { 
				    			elId : repaintEls[i].id, 
				    			offset : {
									left:o.o.left + repaintEls[i].offset.left,
					    			top:o.o.top + repaintEls[i].offset.top
					    		}, 
				    			recalc : false, 
				    			timestamp : timestamp 
				    		});
				    	}
				    }	
				    		          

				    _currentInstance.anchorManager.redraw(id, ui, timestamp, null, clearEdits);
				    
				    if (repaintEls) {
					    for (var j in repaintEls) {
							_currentInstance.anchorManager.redraw(repaintEls[j].id, ui, timestamp, repaintEls[j].offset, clearEdits, true);			    	
					    }
					}		
	            }
			},

			//
			// executes the given function against the given element if the first
			// argument is an object, or the list of elements, if the first argument
			// is a list. the function passed in takes (element, elementId) as
			// arguments.
			//
			_elementProxy = function(element, fn) {
				var retVal = null, el, id;
				if (_ju.isArray(element)) {
					retVal = [];
					for ( var i = 0, j = element.length; i < j; i++) {
						el = _gel(element[i]);
						id = _currentInstance.getAttribute(el, "id");
						retVal.push(fn(el, id)); // append return values to what we will return
					}
				} else {
					el = _gel(element);
					id = _currentInstance.getAttribute(el, "id");
					retVal = fn(el, id);
				}
				return retVal;
			},				

			//
			// gets an Endpoint by uuid.
			//
			_getEndpoint = function(uuid) { return endpointsByUUID[uuid]; },

		/**
		 * inits a draggable if it's not already initialised.
		 * TODO: somehow abstract this to the adapter, because the concept of "draggable" has no
		 * place on the server.
		 */
		_initDraggableIfNecessary = function(element, isDraggable, dragOptions) {
			// TODO move to DragManager?
			if (!jsPlumbAdapter.headless) {
				var _draggable = isDraggable == null ? false : isDraggable, jpcl = jsPlumb.CurrentLibrary;
				if (_draggable) {
					if (jpcl.isDragSupported(element) && !jpcl.isAlreadyDraggable(element)) {
						var options = dragOptions || _currentInstance.Defaults.DragOptions || jsPlumb.Defaults.DragOptions;
						options = jsPlumb.extend( {}, options); // make a copy.
						var dragEvent = jpcl.dragEvents.drag,
							stopEvent = jpcl.dragEvents.stop,
							startEvent = jpcl.dragEvents.start;
	
						options[startEvent] = _ju.wrap(options[startEvent], function() {
							_currentInstance.setHoverSuspended(true);							
							_currentInstance.select({source:element}).addClass(_currentInstance.elementDraggingClass + " " + _currentInstance.sourceElementDraggingClass, true);
							_currentInstance.select({target:element}).addClass(_currentInstance.elementDraggingClass + " " + _currentInstance.targetElementDraggingClass, true);
							_currentInstance.setConnectionBeingDragged(true);
						});
	
						options[dragEvent] = _ju.wrap(options[dragEvent], function() {                            
							var ui = jpcl.getUIPosition(arguments, _currentInstance.getZoom());
							_draw(element, ui, null, true);
							_addClass(element, "jsPlumb_dragged");
						});
						options[stopEvent] = _ju.wrap(options[stopEvent], function() {
							var ui = jpcl.getUIPosition(arguments, _currentInstance.getZoom());
							_draw(element, ui);
							_removeClass(element, "jsPlumb_dragged");
							_currentInstance.setHoverSuspended(false);							
							_currentInstance.select({source:element}).removeClass(_currentInstance.elementDraggingClass + " " + _currentInstance.sourceElementDraggingClass, true);
							_currentInstance.select({target:element}).removeClass(_currentInstance.elementDraggingClass + " " + _currentInstance.targetElementDraggingClass, true);
							_currentInstance.setConnectionBeingDragged(false);
							_currentInstance.dragManager.dragEnded(element);
						});
						var elId = _getId(element); // need ID
						draggableStates[elId] = true;  
						var draggable = draggableStates[elId];
						options.disabled = draggable == null ? false : !draggable;
						jpcl.initDraggable(element, options, false, _currentInstance);
						_currentInstance.dragManager.register(element);
					}
				}
			}
		},
		
		/*
		* prepares a final params object that can be passed to _newConnection, taking into account defaults, events, etc.
		*/
		_prepareConnectionParams = function(params, referenceParams) {
			var _p = jsPlumb.extend( { }, params);
			if (referenceParams) jsPlumb.extend(_p, referenceParams);
			
			// hotwire endpoints passed as source or target to sourceEndpoint/targetEndpoint, respectively.
			if (_p.source) {
				if (_p.source.endpoint) 
					_p.sourceEndpoint = _p.source;
				else
					_p.source = _dom(_p.source);
			}
			if (_p.target) {
				if (_p.target.endpoint) 
					_p.targetEndpoint = _p.target;
				else
					_p.target = _dom(_p.target);
			}
			
			// test for endpoint uuids to connect
			if (params.uuids) {
				_p.sourceEndpoint = _getEndpoint(params.uuids[0]);
				_p.targetEndpoint = _getEndpoint(params.uuids[1]);
			}						

			// now ensure that if we do have Endpoints already, they're not full.
			// source:
			if (_p.sourceEndpoint && _p.sourceEndpoint.isFull()) {
				_ju.log(_currentInstance, "could not add connection; source endpoint is full");
				return;
			}

			// target:
			if (_p.targetEndpoint && _p.targetEndpoint.isFull()) {
				_ju.log(_currentInstance, "could not add connection; target endpoint is full");
				return;
			}
			
			// if source endpoint mandates connection type and nothing specified in our params, use it.
			if (!_p.type && _p.sourceEndpoint)
				_p.type = _p.sourceEndpoint.connectionType;
			
			// copy in any connectorOverlays that were specified on the source endpoint.
			// it doesnt copy target endpoint overlays.  i'm not sure if we want it to or not.
			if (_p.sourceEndpoint && _p.sourceEndpoint.connectorOverlays) {
				_p.overlays = _p.overlays || [];
				for (var i = 0, j = _p.sourceEndpoint.connectorOverlays.length; i < j; i++) {
					_p.overlays.push(_p.sourceEndpoint.connectorOverlays[i]);
				}
			}		
            
            // pointer events
            if (!_p["pointer-events"] && _p.sourceEndpoint && _p.sourceEndpoint.connectorPointerEvents)
                _p["pointer-events"] = _p.sourceEndpoint.connectorPointerEvents;
									
			// if there's a target specified (which of course there should be), and there is no
			// target endpoint specified, and 'newConnection' was not set to true, then we check to
			// see if a prior call to makeTarget has provided us with the specs for the target endpoint, and
			// we use those if so.  additionally, if the makeTarget call was specified with 'uniqueEndpoint' set
			// to true, then if that target endpoint has already been created, we re-use it.

			var tid, tep, existingUniqueEndpoint, newEndpoint;

			// TODO: this code can be refactored to be a little dry.
			if (_p.target && !_p.target.endpoint && !_p.targetEndpoint && !_p.newConnection) {
				tid = _getId(_p.target);
				tep =_targetEndpointDefinitions[tid];
				existingUniqueEndpoint = _targetEndpoints[tid];			

				if (tep) {			
					// if target not enabled, return.
					if (!_targetsEnabled[tid]) return;

					// TODO this is dubious. i think it is there so that the endpoint can subsequently
					// be dragged (ie it kicks off the draggable registration). but it is dubious.
					tep.isTarget = true;

					// check for max connections??						
					newEndpoint = existingUniqueEndpoint != null ? existingUniqueEndpoint : _currentInstance.addEndpoint(_p.target, tep);
					if (_targetEndpointsUnique[tid]) _targetEndpoints[tid] = newEndpoint;
					 _p.targetEndpoint = newEndpoint;
					 // TODO test options to makeTarget to see if we should do this?
					 newEndpoint._doNotDeleteOnDetach = false; // reset.
					 newEndpoint._deleteOnDetach = true;					 
				}
			}

			// same thing, but for source.
			if (_p.source && !_p.source.endpoint && !_p.sourceEndpoint && !_p.newConnection) {
				tid = _getId(_p.source);
				tep = _sourceEndpointDefinitions[tid];
				existingUniqueEndpoint = _sourceEndpoints[tid];				

				if (tep) {
					// if source not enabled, return.					
					if (!_sourcesEnabled[tid]) return;

					// TODO this is dubious. i think it is there so that the endpoint can subsequently
					// be dragged (ie it kicks off the draggable registration). but it is dubious.
					//tep.isSource = true;
				
					newEndpoint = existingUniqueEndpoint != null ? existingUniqueEndpoint : _currentInstance.addEndpoint(_p.source, tep);
					if (_sourceEndpointsUnique[tid]) _sourceEndpoints[tid] = newEndpoint;
					 _p.sourceEndpoint = newEndpoint;
					 // TODO test options to makeSource to see if we should do this?
					 newEndpoint._doNotDeleteOnDetach = false; // reset.
					 newEndpoint._deleteOnDetach = true;
				}
			}
			
			return _p;
		},
		
		_newConnection = function(params) {
			var connectionFunc = _currentInstance.Defaults.ConnectionType || _currentInstance.getDefaultConnectionType(),
			    endpointFunc = _currentInstance.Defaults.EndpointType || jsPlumb.Endpoint,
			    parent = jsPlumb.CurrentLibrary.getParent;
			
			if (params.container)
				params.parent = params.container;
			else {
				if (params.sourceEndpoint)
					params.parent = params.sourceEndpoint.parent;
				else if (params.source.constructor == endpointFunc)
					params.parent = params.source.parent;
				else params.parent = parent(params.source);
			}
			
			params._jsPlumb = _currentInstance;
            params.newConnection = _newConnection;
            params.newEndpoint = _newEndpoint;
            params.endpointsByUUID = endpointsByUUID;             
            params.endpointsByElement = endpointsByElement;  
            params.finaliseConnection = _finaliseConnection;
			var con = new connectionFunc(params);
			con.id = "con_" + _idstamp();
			_eventFireProxy("click", "click", con);
			_eventFireProxy("dblclick", "dblclick", con);
            _eventFireProxy("contextmenu", "contextmenu", con);

            // if the connection is draggable, then maybe we need to tell the target endpoint to init the
            // dragging code. it won't run again if it already configured to be draggable.
            if (con.isDetachable()) {
            	con.endpoints[0].initDraggable();
            	con.endpoints[1].initDraggable();
            }

			return con;
		},
		
		//
		// adds the connection to the backing model, fires an event if necessary and then redraws
		//
		_finaliseConnection = function(jpc, params, originalEvent, doInformAnchorManager) {
            params = params || {};
			// add to list of connections (by scope).
            if (!jpc.suspendedEndpoint)
			    connections.push(jpc);
			
            // always inform the anchor manager
            // except that if jpc has a suspended endpoint it's not true to say the
            // connection is new; it has just (possibly) moved. the question is whether
            // to make that call here or in the anchor manager.  i think perhaps here.
            if (jpc.suspendedEndpoint == null || doInformAnchorManager)
            	_currentInstance.anchorManager.newConnection(jpc);

			// force a paint
			_draw(jpc.source);
			
			// fire an event
			if (!params.doNotFireConnectionEvent && params.fireEvent !== false) {
			
				var eventArgs = {
					connection:jpc,
					source : jpc.source, target : jpc.target,
					sourceId : jpc.sourceId, targetId : jpc.targetId,
					sourceEndpoint : jpc.endpoints[0], targetEndpoint : jpc.endpoints[1]
				};
			
				_currentInstance.fire("connection", eventArgs, originalEvent);
			}
		},
		
		_eventFireProxy = function(event, proxyEvent, obj) {
			obj.bind(event, function(originalObject, originalEvent) {
				_currentInstance.fire(proxyEvent, obj, originalEvent);
			});
		},
		
		/*
		 * for the given endpoint params, returns an appropriate parent element for the UI elements that will be added.
		 * this function is used by _newEndpoint (directly below), and also in the makeSource function in jsPlumb.
		 * 
		 *   the logic is to first look for a "container" member of params, and pass that back if found.  otherwise we
		 *   handoff to the 'getParent' function in the current library.
		 */
		_getParentFromParams = function(params) {
			if (params.container)
				return params.container;
			else {
                var tag = jsPlumb.CurrentLibrary.getTagName(params.source),
                    p = jsPlumb.CurrentLibrary.getParent(params.source);
                if (tag && tag.toLowerCase() === "td")
                    return jsPlumb.CurrentLibrary.getParent(p);
                else return p;
            }
		},
		
		/*
			factory method to prepare a new endpoint.  this should always be used instead of creating Endpoints
			manually, since this method attaches event listeners and an id.
		*/
		_newEndpoint = function(params) {
				var endpointFunc = _currentInstance.Defaults.EndpointType || jsPlumb.Endpoint;
				var _p = jsPlumb.extend({}, params);				
				_p.parent = _getParentFromParams(_p);
				_p._jsPlumb = _currentInstance;
                _p.newConnection = _newConnection;
                _p.newEndpoint = _newEndpoint;                
                _p.endpointsByUUID = endpointsByUUID;             
                _p.endpointsByElement = endpointsByElement;  
                _p.finaliseConnection = _finaliseConnection;
                _p.fireDetachEvent = fireDetachEvent;
                _p.fireMoveEvent = fireMoveEvent;
                _p.floatingConnections = floatingConnections;
                _p.getParentFromParams = _getParentFromParams;
                _p.elementId = _getId(_p.source);                
				var ep = new endpointFunc(_p);			
				ep.id = "ep_" + _idstamp();
				_eventFireProxy("click", "endpointClick", ep);
				_eventFireProxy("dblclick", "endpointDblClick", ep);
				_eventFireProxy("contextmenu", "contextmenu", ep);
				if (!jsPlumbAdapter.headless)
					_currentInstance.dragManager.endpointAdded(_p.source);
			return ep;
		},
		
		/*
		 * performs the given function operation on all the connections found
		 * for the given element id; this means we find all the endpoints for
		 * the given element, and then for each endpoint find the connectors
		 * connected to it. then we pass each connection in to the given
		 * function.		 
		 */
		_operation = function(elId, func, endpointFunc) {
			var endpoints = endpointsByElement[elId];
			if (endpoints && endpoints.length) {
				for ( var i = 0, ii = endpoints.length; i < ii; i++) {
					for ( var j = 0, jj = endpoints[i].connections.length; j < jj; j++) {
						var retVal = func(endpoints[i].connections[j]);
						// if the function passed in returns true, we exit.
						// most functions return false.
						if (retVal) return;
					}
					if (endpointFunc) endpointFunc(endpoints[i]);
				}
			}
		},	
		
		_setDraggable = function(element, draggable) {
			return _elementProxy(element, function(el, id) {
				draggableStates[id] = draggable;
				if (jsPlumb.CurrentLibrary.isDragSupported(el)) {
					jsPlumb.CurrentLibrary.setDraggable(el, draggable);
				}
			});
		},
		/*
		 * private method to do the business of hiding/showing.
		 * 
		 * @param el
		 *            either Id of the element in question or a library specific
		 *            object for the element.
		 * @param state
		 *            String specifying a value for the css 'display' property
		 *            ('block' or 'none').
		 */
		_setVisible = function(el, state, alsoChangeEndpoints) {
			state = state === "block";
			var endpointFunc = null;
			if (alsoChangeEndpoints) {
				if (state) endpointFunc = function(ep) {
					ep.setVisible(true, true, true);
				};
				else endpointFunc = function(ep) {
					ep.setVisible(false, true, true);
				};
			}
			var info = _info(el);
			_operation(info.id, function(jpc) {
				if (state && alsoChangeEndpoints) {		
					// this test is necessary because this functionality is new, and i wanted to maintain backwards compatibility.
					// this block will only set a connection to be visible if the other endpoint in the connection is also visible.
					var oidx = jpc.sourceId === info.id ? 1 : 0;
					if (jpc.endpoints[oidx].isVisible()) jpc.setVisible(true);
				}
				else  // the default behaviour for show, and what always happens for hide, is to just set the visibility without getting clever.
					jpc.setVisible(state);
			}, endpointFunc);
		},
		/*
		 * toggles the draggable state of the given element(s).
		 * el is either an id, or an element object, or a list of ids/element objects.
		 */
		_toggleDraggable = function(el) {
			return _elementProxy(el, function(el, elId) {
				var state = draggableStates[elId] == null ? false : draggableStates[elId];
				state = !state;
				draggableStates[elId] = state;
				jsPlumb.CurrentLibrary.setDraggable(el, state);
				return state;
			});
		},
		/**
		 * private method to do the business of toggling hiding/showing.
		 */
		_toggleVisible = function(elId, changeEndpoints) {
			var endpointFunc = null;
			if (changeEndpoints) {
				endpointFunc = function(ep) {
					var state = ep.isVisible();
					ep.setVisible(!state);
				};
			}
			_operation(elId, function(jpc) {
				var state = jpc.isVisible();
				jpc.setVisible(!state);				
			}, endpointFunc);
			// todo this should call _elementProxy, and pass in the
			// _operation(elId, f) call as a function. cos _toggleDraggable does
			// that.
		},
		/**
		 * updates the offset and size for a given element, and stores the
		 * values. if 'offset' is not null we use that (it would have been
		 * passed in from a drag call) because it's faster; but if it is null,
		 * or if 'recalc' is true in order to force a recalculation, we get the current values.
		 */
		_updateOffset = function(params) {
			var timestamp = params.timestamp, recalc = params.recalc, offset = params.offset, elId = params.elId, s;
			if (_suspendDrawing && !timestamp) timestamp = _suspendedAt;
			if (!recalc) {
				if (timestamp && timestamp === offsetTimestamps[elId]) {			
					return {o:params.offset || offsets[elId], s:sizes[elId]};
				}
			}			
			if (recalc || !offset) { // if forced repaint or no offset available, we recalculate.
				// get the current size and offset, and store them
				s = _gel(elId);
				if (s != null) {						
					sizes[elId] = _getSize(s);
					offsets[elId] = _getOffset(s, _currentInstance);
					offsetTimestamps[elId] = timestamp;
				}
			} else {
				offsets[elId] = offset;
                if (sizes[elId] == null) {
                    s = _gel(elId);
                    if (s != null) sizes[elId] = _getSize(s);
                }
                offsetTimestamps[elId] = timestamp;
            }
			
			if(offsets[elId] && !offsets[elId].right) {
				offsets[elId].right = offsets[elId].left + sizes[elId][0];
				offsets[elId].bottom = offsets[elId].top + sizes[elId][1];	
				offsets[elId].width = sizes[elId][0];
				offsets[elId].height = sizes[elId][1];	
				offsets[elId].centerx = offsets[elId].left + (offsets[elId].width / 2);
				offsets[elId].centery = offsets[elId].top + (offsets[elId].height / 2);				
			}
			return {o:offsets[elId], s:sizes[elId]};
		},

		// TODO comparison performance
		_getCachedData = function(elId) {
			var o = offsets[elId];
			if (!o) 
                return _updateOffset({elId:elId});
			else
                return {o:o, s:sizes[elId]};
		},

		/**
		 * gets an id for the given element, creating and setting one if
		 * necessary.  the id is of the form
		 *
		 *	jsPlumb_<instance index>_<index in instance>
		 *
		 * where "index in instance" is a monotonically increasing integer that starts at 0,
		 * for each instance.  this method is used not only to assign ids to elements that do not
		 * have them but also to connections and endpoints.
		 */
		_getId = function(element, uuid, doNotCreateIfNotFound) {
			if (jsPlumbUtil.isString(element)) return element;			
			if (element == null) return null;			
			var id = jsPlumbAdapter.getAttribute(element, "id");
			if (!id || id === "undefined") {
				// check if fixed uuid parameter is given
				if (arguments.length == 2 && arguments[1] !== undefined)
					id = uuid;
				else if (arguments.length == 1 || (arguments.length == 3 && !arguments[2]))
					id = "jsPlumb_" + _instanceIndex + "_" + _idstamp();
				
                if (!doNotCreateIfNotFound) jsPlumbAdapter.setAttribute(element, "id", id);
			}
			return id;
		};

		this.setConnectionBeingDragged = function(v) {
			connectionBeingDragged = v;
		};
		this.isConnectionBeingDragged = function() {
			return connectionBeingDragged;
		};
    
		this.connectorClass = "_jsPlumb_connector";            		
		this.hoverClass = "_jsPlumb_hover";            		
		this.endpointClass = "_jsPlumb_endpoint";		
		this.endpointConnectedClass = "_jsPlumb_endpoint_connected";		
		this.endpointFullClass = "_jsPlumb_endpoint_full";		
		this.endpointDropAllowedClass = "_jsPlumb_endpoint_drop_allowed";		
		this.endpointDropForbiddenClass = "_jsPlumb_endpoint_drop_forbidden";		
		this.overlayClass = "_jsPlumb_overlay";				
		this.draggingClass = "_jsPlumb_dragging";		
		this.elementDraggingClass = "_jsPlumb_element_dragging";			
		this.sourceElementDraggingClass = "_jsPlumb_source_element_dragging";
		this.targetElementDraggingClass = "_jsPlumb_target_element_dragging";
		this.endpointAnchorClassPrefix = "_jsPlumb_endpoint_anchor";
		this.hoverSourceClass = "_jsPlumb_source_hover";	
		this.hoverTargetClass = "_jsPlumb_target_hover";
		this.dragSelectClass = "_jsPlumb_drag_select";

		this.Anchors = {};		
		this.Connectors = {  "canvas":{}, "svg":{}, "vml":{} };				
		this.Endpoints = { "canvas":{}, "svg":{}, "vml":{} };
		this.Overlays = { "canvas":{}, "svg":{}, "vml":{}};		
		this.ConnectorRenderers = {};				
		this.SVG = "svg";
		this.CANVAS = "canvas";		
		this.VML = "vml";
				

// --------------------------- jsPLumbInstance public API ---------------------------------------------------------
					
		
		this.addEndpoint = function(el, params, referenceParams) {
			referenceParams = referenceParams || {};
			var p = jsPlumb.extend({}, referenceParams);
			jsPlumb.extend(p, params);
			p.endpoint = p.endpoint || _currentInstance.Defaults.Endpoint || jsPlumb.Defaults.Endpoint;
			p.paintStyle = p.paintStyle || _currentInstance.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle;
            // YUI wrapper
			el = _convertYUICollection(el);							

			var results = [], 
				inputs = (_ju.isArray(el) || (el.length != null && !_ju.isString(el))) ? el : [ el ];
						
			for (var i = 0, j = inputs.length; i < j; i++) {
				var _el = _dom(inputs[i]), id = _getId(_el);
				p.source = _el;

                _updateOffset({ elId : id, timestamp:_suspendedAt });
				var e = _newEndpoint(p);
				if (p.parentAnchor) e.parentAnchor = p.parentAnchor;
				_ju.addToList(endpointsByElement, id, e);
				var myOffset = offsets[id], 
					myWH = sizes[id],
					anchorLoc = e.anchor.compute( { xy : [ myOffset.left, myOffset.top ], wh : myWH, element : e, timestamp:_suspendedAt }),
					endpointPaintParams = { anchorLoc : anchorLoc, timestamp:_suspendedAt };
				
				if (_suspendDrawing) endpointPaintParams.recalc = false;
				if (!_suspendDrawing) e.paint(endpointPaintParams);
				
				results.push(e);
				e._doNotDeleteOnDetach = true; // mark this as being added via addEndpoint.				
			}
			
			return results.length == 1 ? results[0] : results;
		};
		
		
		this.addEndpoints = function(el, endpoints, referenceParams) {
			var results = [];
			for ( var i = 0, j = endpoints.length; i < j; i++) {
				var e = _currentInstance.addEndpoint(el, endpoints[i], referenceParams);
				if (_ju.isArray(e))
					Array.prototype.push.apply(results, e);
				else results.push(e);
			}
			return results;
		};
		
		this.animate = function(el, properties, options) {
			options = options || {};
			var ele = _gel(el), 
				id = _getId(el),
				stepFunction = jsPlumb.CurrentLibrary.dragEvents.step,
				completeFunction = jsPlumb.CurrentLibrary.dragEvents.complete;

			options[stepFunction] = _ju.wrap(options[stepFunction], function() {
				_currentInstance.repaint(id);
			});

			// onComplete repaints, just to make sure everything looks good at the end of the animation.
			options[completeFunction] = _ju.wrap(options[completeFunction], function() {
				_currentInstance.repaint(id);
			});

			jsPlumb.CurrentLibrary.animate(ele, properties, options);
		};		
		
		/**
		* checks for a listener for the given condition, executing it if found, passing in the given value.
		* condition listeners would have been attached using "bind" (which is, you could argue, now overloaded, since
		* firing click events etc is a bit different to what this does).  i thought about adding a "bindCondition"
		* or something, but decided against it, for the sake of simplicity. jsPlumb will never fire one of these
		* condition events anyway.
		*/
		this.checkCondition = function(conditionName, value) {
			var l = _currentInstance.getListener(conditionName),
				r = true;
				
			if (l && l.length > 0) {
				try {
					for (var i = 0, j = l.length; i < j; i++) {
						r = r && l[i](value); 
					}
				}
				catch (e) { 
					_ju.log(_currentInstance, "cannot check condition [" + conditionName + "]" + e); 
				}
			}
			return r;
		};
		
		/**
		 * checks a condition asynchronously: fires the event handler and passes the handler
		 * a 'proceed' function and a 'stop' function. The handler MUST execute one or other
		 * of these once it has made up its mind.
		 *
		 * Note that although this reads the listener list for the given condition, it
		 * does not loop through and hit each listener, because that, with asynchronous
		 * callbacks, would be messy. so it uses only the first listener registered.
		 */ 
		this.checkASyncCondition = function(conditionName, value, proceed, stop) {
			var l = _currentInstance.getListener(conditionName);
				
			if (l && l.length > 0) {
				try {
					l[0](value, proceed, stop); 					
				}
				catch (e) { 
					_ju.log(_currentInstance, "cannot asynchronously check condition [" + conditionName + "]" + e); 
				}
			}	
		};

		
		this.connect = function(params, referenceParams) {
			// prepare a final set of parameters to create connection with
			var _p = _prepareConnectionParams(params, referenceParams), jpc;
			// TODO probably a nicer return value if the connection was not made.  _prepareConnectionParams
			// will return null (and log something) if either endpoint was full.  what would be nicer is to 
			// create a dedicated 'error' object.
			if (_p) {
				// create the connection.  it is not yet registered 
				jpc = _newConnection(_p);
				// now add it the model, fire an event, and redraw
				_finaliseConnection(jpc, _p);										
			}
			return jpc;
		};		
		
		this.deleteEndpoint = function(object, doNotRepaintAfterwards) {
			var _is = _currentInstance.setSuspendDrawing(true);
			var endpoint = (typeof object == "string") ? endpointsByUUID[object] : object;			
			if (endpoint) {		
				_currentInstance.deleteObject({
					endpoint:endpoint
				});
			}
			if(!_is) _currentInstance.setSuspendDrawing(false, doNotRepaintAfterwards);
			return _currentInstance;									
		};		
		
		this.deleteEveryEndpoint = function() {
			var _is = _currentInstance.setSuspendDrawing(true);
			for ( var id in endpointsByElement) {
				var endpoints = endpointsByElement[id];
				if (endpoints && endpoints.length) {
					for ( var i = 0, j = endpoints.length; i < j; i++) {
						_currentInstance.deleteEndpoint(endpoints[i], true);
					}
				}
			}			
			endpointsByElement = {};			
			endpointsByUUID = {};
			_currentInstance.anchorManager.reset();
			_currentInstance.dragManager.reset();							
			if(!_is) _currentInstance.setSuspendDrawing(false);
			return _currentInstance;
		};

		var fireDetachEvent = function(jpc, doFireEvent, originalEvent) {
            // may have been given a connection, or in special cases, an object
            var connType =  _currentInstance.Defaults.ConnectionType || _currentInstance.getDefaultConnectionType(),
                argIsConnection = jpc.constructor == connType,
                params = argIsConnection ? {
                    connection:jpc,
				    source : jpc.source, target : jpc.target,
				    sourceId : jpc.sourceId, targetId : jpc.targetId,
				    sourceEndpoint : jpc.endpoints[0], targetEndpoint : jpc.endpoints[1]
                } : jpc;

			if (doFireEvent)
				_currentInstance.fire("connectionDetached", params, originalEvent);
			
            _currentInstance.anchorManager.connectionDetached(params);
		};	

		var fireMoveEvent = function(params, evt) {
			_currentInstance.fire("connectionMoved", params, evt);
		};

		this.unregisterEndpoint = function(endpoint) {
			if (endpoint._jsPlumb.uuid) endpointsByUUID[endpoint._jsPlumb.uuid] = null;				
			_currentInstance.anchorManager.deleteEndpoint(endpoint);			
			// TODO at least replace this with a removeWithFunction call.			
			for (var e in endpointsByElement) {
				var endpoints = endpointsByElement[e];
				if (endpoints) {
					var newEndpoints = [];
					for (var i = 0, j = endpoints.length; i < j; i++)
						if (endpoints[i] != endpoint) newEndpoints.push(endpoints[i]);
					
					endpointsByElement[e] = newEndpoints;
				}
				if(endpointsByElement[e].length <1){
					delete endpointsByElement[e];
				}
			}
		};
				
		this.detach = function() {

            if (arguments.length === 0) return;
            var connType =  _currentInstance.Defaults.ConnectionType || _currentInstance.getDefaultConnectionType(),
                firstArgIsConnection = arguments[0].constructor == connType,
                params = arguments.length == 2 ? firstArgIsConnection ? (arguments[1] || {}) : arguments[0] : arguments[0],
                fireEvent = (params.fireEvent !== false),
                forceDetach = params.forceDetach,
                conn = firstArgIsConnection ? arguments[0] : params.connection;
                                                    
				if (conn) {             
                    if (forceDetach || jsPlumbUtil.functionChain(true, false, [
                            [ conn.endpoints[0], "isDetachAllowed", [ conn ] ],    
                            [ conn.endpoints[1], "isDetachAllowed", [ conn ] ],
                            [ conn, "isDetachAllowed", [ conn ] ],
                            [ _currentInstance, "checkCondition", [ "beforeDetach", conn ] ] ])) {
                        
                        conn.endpoints[0].detach(conn, false, true, fireEvent); 
                    }
                }
                else {
					var _p = jsPlumb.extend( {}, params); // a backwards compatibility hack: source should be thought of as 'params' in this case.
					// test for endpoint uuids to detach
					if (_p.uuids) {
						_getEndpoint(_p.uuids[0]).detachFrom(_getEndpoint(_p.uuids[1]), fireEvent);
					} else if (_p.sourceEndpoint && _p.targetEndpoint) {
						_p.sourceEndpoint.detachFrom(_p.targetEndpoint);
					} else {
						var sourceId = _getId(_dom(_p.source)),
						    targetId = _getId(_dom(_p.target));
						_operation(sourceId, function(jpc) {
						    if ((jpc.sourceId == sourceId && jpc.targetId == targetId) || (jpc.targetId == sourceId && jpc.sourceId == targetId)) {
							    if (_currentInstance.checkCondition("beforeDetach", jpc)) {
                                    jpc.endpoints[0].detach(jpc, false, true, fireEvent);
								}
							}
						});
					}
				}
		};

		this.detachAllConnections = function(el, params) {
            params = params || {};
            el = _dom(el);
			var id = _getId(el),
                endpoints = endpointsByElement[id];
			if (endpoints && endpoints.length) {
				for ( var i = 0, j = endpoints.length; i < j; i++) {
					endpoints[i].detachAll(params.fireEvent !== false);
				}
			}
			return _currentInstance;
		};

		this.detachEveryConnection = function(params) {
            params = params || {};
            _currentInstance.doWhileSuspended(function() {
				for ( var id in endpointsByElement) {
					var endpoints = endpointsByElement[id];
					if (endpoints && endpoints.length) {
						for ( var i = 0, j = endpoints.length; i < j; i++) {
							endpoints[i].detachAll(params.fireEvent !== false);
						}
					}
				}
				connections.splice(0);
			});
			return _currentInstance;
		};

		/// not public.  but of course its exposed. how to change this.
		this.deleteObject = function(params) {
			var result = {
					endpoints : {}, 
					connections : {},
					endpointCount:0,
					connectionCount:0
				},
				fireEvent = params.fireEvent !== false,
				deleteAttachedObjects = params.deleteAttachedObjects !== false;

			var unravelConnection = function(connection) {
				if(connection != null && result.connections[connection.id] == null) {
					if (connection._jsPlumb != null) connection.setHover(false);
					result.connections[connection.id] = connection;
					result.connectionCount++;
					if (deleteAttachedObjects) {
						for (var j = 0; j < connection.endpoints.length; j++) {
							if (connection.endpoints[j]._deleteOnDetach)
								unravelEndpoint(connection.endpoints[j]);
						}
					}					
				}
			};
			var unravelEndpoint = function(endpoint) {
				if(endpoint != null && result.endpoints[endpoint.id] == null) {
					if (endpoint._jsPlumb != null) endpoint.setHover(false);
					result.endpoints[endpoint.id] = endpoint;
					result.endpointCount++;

					if (deleteAttachedObjects) {
						for (var i = 0; i < endpoint.connections.length; i++) {
							var c = endpoint.connections[i];
							unravelConnection(c);						
						}
					}
				}
			};

			if (params.connection) 
				unravelConnection(params.connection);
			else unravelEndpoint(params.endpoint);

			// loop through connections
			for (var i in result.connections) {
				var c = result.connections[i];
				c.endpoints[0].detachFromConnection(c);
				c.endpoints[1].detachFromConnection(c);
				//_currentInstance.unregisterConnection(c);
				jsPlumbUtil.removeWithFunction(connections, function(_c) {
				    return c.id == _c.id;
				});
				fireDetachEvent(c, fireEvent, params.originalEvent);
				c.cleanup();
				c.destroy();
			}

			// loop through endpoints
			for (var j in result.endpoints) {
				var e = result.endpoints[j];	
				_currentInstance.unregisterEndpoint(e);
				// FIRE some endpoint deleted event?
				e.cleanup();
				e.destroy();
			}	

			return result;
		};
 
		this.draggable = function(el, options) {
			var i,j,ele;
			// allows for array or jquery/mootools selector
			if (typeof el == 'object' && el.length) {
				for (i = 0, j = el.length; i < j; i++) {
					ele = _dom(el[i]);
					if (ele) _initDraggableIfNecessary(ele, true, options);
				}
			} 
			// allows for YUI selector
			else if (el._nodes) { 	// TODO this is YUI specific; really the logic should be forced
				// into the library adapters (for jquery and mootools aswell)
				for (i = 0, j = el._nodes.length; i < j; i++) {
					ele = _dom(el._nodes[i]);
					if (ele) _initDraggableIfNecessary(ele, true, options);
				}
			}
			else {				
				ele = _dom(el);
				if (ele) _initDraggableIfNecessary(ele, true, options);
			}
			return _currentInstance;
		};


		// just a library-agnostic wrapper.
		this.extend = function(o1, o2) {
			return jsPlumb.CurrentLibrary.extend(o1, o2);
		};

		// helpers for select/selectEndpoints
		var _setOperation = function(list, func, args, selector) {
				for (var i = 0, j = list.length; i < j; i++) {
					list[i][func].apply(list[i], args);
				}	
				return selector(list);
			},
			_getOperation = function(list, func, args) {
				var out = [];
				for (var i = 0, j = list.length; i < j; i++) {					
					out.push([ list[i][func].apply(list[i], args), list[i] ]);
				}	
				return out;
			},
			setter = function(list, func, selector) {
				return function() {
					return _setOperation(list, func, arguments, selector);
				};
			},
			getter = function(list, func) {
				return function() {
					return _getOperation(list, func, arguments);
				};	
			},
			prepareList = function(input, doNotGetIds) {
				var r = [];
				if (input) {
					if (typeof input == 'string') {
						if (input === "*") return input;
						r.push(input);
					}
					else {
						input = _gel(input);
						if (doNotGetIds) r = input;
						else { 
							for (var i = 0, j = input.length; i < j; i++) 
								r.push(_info(input[i]).id);
						}	
					}
				}
				return r;
			},
			filterList = function(list, value, missingIsFalse) {
				if (list === "*") return true;
				return list.length > 0 ? jsPlumbUtil.indexOf(list, value) != -1 : !missingIsFalse;
			};

		// get some connections, specifying source/target/scope
		this.getConnections = function(options, flat) {
			if (!options) {
				options = {};
			} else if (options.constructor == String) {
				options = { "scope": options };
			}
			var scope = options.scope || _currentInstance.getDefaultScope(),
				scopes = prepareList(scope, true),
				sources = prepareList(options.source),
				targets = prepareList(options.target),			
				results = (!flat && scopes.length > 1) ? {} : [],
				_addOne = function(scope, obj) {
					if (!flat && scopes.length > 1) {
						var ss = results[scope];
						if (ss == null) {
							ss = results[scope] = [];
						}
						ss.push(obj);
					} else results.push(obj);
				};
			
			for ( var j = 0, jj = connections.length; j < jj; j++) {
				var c = connections[j];
				if (filterList(scopes, c.scope) && filterList(sources, c.sourceId) && filterList(targets, c.targetId))
					_addOne(c.scope, c);
			}
			
			return results;
		};
		
		var _curryEach = function(list, executor) {
				return function(f) {
					for (var i = 0, ii = list.length; i < ii; i++) {
						f(list[i]);
					}
					return executor(list);
				};		
			},
			_curryGet = function(list) {
				return function(idx) {
					return list[idx];
				};
			};
			
		var _makeCommonSelectHandler = function(list, executor) {
            var out = {
                    length:list.length,
				    each:_curryEach(list, executor),
				    get:_curryGet(list)
                },
                setters = ["setHover", "removeAllOverlays", "setLabel", "addClass", "addOverlay", "removeOverlay", 
                           "removeOverlays", "showOverlay", "hideOverlay", "showOverlays", "hideOverlays", "setPaintStyle",
                           "setHoverPaintStyle", "setSuspendEvents", "setParameter", "setParameters", "setVisible", 
                           "repaint", "addType", "toggleType", "removeType", "removeClass", "setType", "bind", "unbind" ],
                
                getters = ["getLabel", "getOverlay", "isHover", "getParameter", "getParameters", "getPaintStyle",
                           "getHoverPaintStyle", "isVisible", "hasType", "getType", "isSuspendEvents" ],
                i, ii;
            
            for (i = 0, ii = setters.length; i < ii; i++)
                out[setters[i]] = setter(list, setters[i], executor);
            
            for (i = 0, ii = getters.length; i < ii; i++)
                out[getters[i]] = getter(list, getters[i]);       
            
            return out;
		};
		
		var	_makeConnectionSelectHandler = function(list) {
			var common = _makeCommonSelectHandler(list, _makeConnectionSelectHandler);
			return jsPlumb.CurrentLibrary.extend(common, {
				// setters									
				setDetachable:setter(list, "setDetachable", _makeConnectionSelectHandler),
				setReattach:setter(list, "setReattach", _makeConnectionSelectHandler),
				setConnector:setter(list, "setConnector", _makeConnectionSelectHandler),			
				detach:function() {
					for (var i = 0, ii = list.length; i < ii; i++)
						_currentInstance.detach(list[i]);
				},				
				// getters
				isDetachable:getter(list, "isDetachable"),
				isReattach:getter(list, "isReattach")
			});
		};
		
		var	_makeEndpointSelectHandler = function(list) {
			var common = _makeCommonSelectHandler(list, _makeEndpointSelectHandler);
			return jsPlumb.CurrentLibrary.extend(common, {
				setEnabled:setter(list, "setEnabled", _makeEndpointSelectHandler),				
				setAnchor:setter(list, "setAnchor", _makeEndpointSelectHandler),
				isEnabled:getter(list, "isEnabled"),
				detachAll:function() {
					for (var i = 0, ii = list.length; i < ii; i++)
						list[i].detachAll();
				},
				"remove":function() {
					for (var i = 0, ii = list.length; i < ii; i++)
						_currentInstance.deleteObject({endpoint:list[i]});
				}
			});
		};
			

		this.select = function(params) {
			params = params || {};
			params.scope = params.scope || "*";
			return _makeConnectionSelectHandler(params.connections || _currentInstance.getConnections(params, true));							
		};		

		this.selectEndpoints = function(params) {
			params = params || {};
			params.scope = params.scope || "*";
			var noElementFilters = !params.element && !params.source && !params.target,			
				elements = noElementFilters ? "*" : prepareList(params.element),
				sources = noElementFilters ? "*" : prepareList(params.source),
				targets = noElementFilters ? "*" : prepareList(params.target),
				scopes = prepareList(params.scope, true);
			
			var ep = [];
			
			for (var el in endpointsByElement) {
				var either = filterList(elements, el, true),
					source = filterList(sources, el, true),
					sourceMatchExact = sources != "*",
					target = filterList(targets, el, true),
					targetMatchExact = targets != "*"; 
					
				// if they requested 'either' then just match scope. otherwise if they requested 'source' (not as a wildcard) then we have to match only endpoints that have isSource set to to true, and the same thing with isTarget.  
				if ( either || source  || target ) {
					inner:
					for (var i = 0, ii = endpointsByElement[el].length; i < ii; i++) {
						var _ep = endpointsByElement[el][i];
						if (filterList(scopes, _ep.scope, true)) {
						
							var noMatchSource = (sourceMatchExact && sources.length > 0 && !_ep.isSource),
								noMatchTarget = (targetMatchExact && targets.length > 0 && !_ep.isTarget);
						
							if (noMatchSource || noMatchTarget)								  
								  continue inner; 
							 							
							ep.push(_ep);		
						}
					}
				}					
			}
			
			return _makeEndpointSelectHandler(ep);
		};

		// get all connections managed by the instance of jsplumb.
		this.getAllConnections = function() { return connections; };
		this.getDefaultScope = function() { return DEFAULT_SCOPE; };
		// get an endpoint by uuid.
		this.getEndpoint = _getEndpoint;				
		// get endpoints for some element.
		this.getEndpoints = function(el) { return endpointsByElement[_info(el).id]; };		
		// gets the default endpoint type. used when subclassing. see wiki.
		this.getDefaultEndpointType = function() { return jsPlumb.Endpoint; };		
		// gets the default connection type. used when subclassing.  see wiki.
		this.getDefaultConnectionType = function() { return jsPlumb.Connection; };
		/*
		 * Gets an element's id, creating one if necessary. really only exposed
		 * for the lib-specific functionality to access; would be better to pass
		 * the current instance into the lib-specific code (even though this is
		 * a static call. i just don't want to expose it to the public API).
		 */
		this.getId = _getId;
		this.getOffset = function(id) { 
			var o = offsets[id]; 
			return _updateOffset({elId:id});
		};

		this.getSelector = function() {
			return jsPlumb.CurrentLibrary.getSelector.apply(null, arguments);
		};
		
		// get the size of the element with the given id, perhaps from cache.
		this.getSize = function(id) { 
			var s = sizes[id]; 
			if (!s) _updateOffset({elId:id});
			return sizes[id];
		};		
		
		this.appendElement = _appendElement;
		
		var _hoverSuspended = false;
		this.isHoverSuspended = function() { return _hoverSuspended; };
		this.setHoverSuspended = function(s) { _hoverSuspended = s; };

		var _isAvailable = function(m) {
			return function() {
				return jsPlumbAdapter.isRenderModeAvailable(m);
			};
		};
		this.isCanvasAvailable = _isAvailable("canvas");
		this.isSVGAvailable = _isAvailable("svg");
		this.isVMLAvailable = _isAvailable("vml");

		// set an element's connections to be hidden
		this.hide = function(el, changeEndpoints) {
			_setVisible(el, "none", changeEndpoints);
			return _currentInstance;
		};
		
		// exposed for other objects to use to get a unique id.
		this.idstamp = _idstamp;

		this.connectorsInitialized = false;
		var connectorTypes = [], rendererTypes = ["canvas", "svg", "vml"];
		this.registerConnectorType = function(connector, name) {
			connectorTypes.push([connector, name]);
		};
		
		/**
		 * callback from the current library to tell us to prepare ourselves (attach
		 * mouse listeners etc; can't do that until the library has provided a bind method)		 
		 */
		this.init = function() {
			var _oneType = function(renderer, name, fn) {
				jsPlumb.Connectors[renderer][name] = function() {
					fn.apply(this, arguments);
					jsPlumb.ConnectorRenderers[renderer].apply(this, arguments);		
				};
				jsPlumbUtil.extend(jsPlumb.Connectors[renderer][name], [ fn, jsPlumb.ConnectorRenderers[renderer]]);
			};

			if (!jsPlumb.connectorsInitialized) {
				for (var i = 0; i < connectorTypes.length; i++) {
					for (var j = 0; j < rendererTypes.length; j++) {
						_oneType(rendererTypes[j], connectorTypes[i][1], connectorTypes[i][0]);												
					}

				}
				jsPlumb.connectorsInitialized = true;
			}
			
			if (!initialized) {                
                _currentInstance.anchorManager = new jsPlumb.AnchorManager({jsPlumbInstance:_currentInstance});                
				_currentInstance.setRenderMode(_currentInstance.Defaults.RenderMode);  // calling the method forces the capability logic to be run.														
				initialized = true;
				_currentInstance.fire("ready", _currentInstance);
			}
		}.bind(this);		
		
		this.log = log;
		this.jsPlumbUIComponent = jsPlumbUIComponent;		

		/*
		 * Creates an anchor with the given params.
		 * 
		 * 
		 * Returns: The newly created Anchor.
		 * Throws: an error if a named anchor was not found.
		 */
		this.makeAnchor = function() {
			var pp, _a = function(t, p) {
				if (jsPlumb.Anchors[t]) return new jsPlumb.Anchors[t](p);
				if (!_currentInstance.Defaults.DoNotThrowErrors)
					throw { msg:"jsPlumb: unknown anchor type '" + t + "'" };
			};
			if (arguments.length === 0) return null;
			var specimen = arguments[0], elementId = arguments[1], jsPlumbInstance = arguments[2], newAnchor = null;			
			// if it appears to be an anchor already...
			if (specimen.compute && specimen.getOrientation) return specimen;  //TODO hazy here about whether it should be added or is already added somehow.
			// is it the name of an anchor type?
			else if (typeof specimen == "string") {
				newAnchor = _a(arguments[0], {elementId:elementId, jsPlumbInstance:_currentInstance});
			}
			// is it an array? it will be one of:
			// 		an array of [spec, params] - this defines a single anchor, which may be dynamic, but has parameters.
			//		an array of arrays - this defines some dynamic anchors
			//		an array of numbers - this defines a single anchor.				
			else if (_ju.isArray(specimen)) {
				if (_ju.isArray(specimen[0]) || _ju.isString(specimen[0])) {
					// if [spec, params] format
					if (specimen.length == 2 && _ju.isObject(specimen[1])) {
						// if first arg is a string, its a named anchor with params
						if (_ju.isString(specimen[0])) {
							pp = jsPlumb.extend({elementId:elementId, jsPlumbInstance:_currentInstance}, specimen[1]);
							newAnchor = _a(specimen[0], pp);
						}
						// otherwise first arg is array, second is params. we treat as a dynamic anchor, which is fine
						// even if the first arg has only one entry. you could argue all anchors should be implicitly dynamic in fact.
						else {
							pp = jsPlumb.extend({elementId:elementId, jsPlumbInstance:_currentInstance, anchors:specimen[0]}, specimen[1]);
							newAnchor = new jsPlumb.DynamicAnchor(pp);
						}
					}
					else
						newAnchor = new jsPlumb.DynamicAnchor({anchors:specimen, selector:null, elementId:elementId, jsPlumbInstance:jsPlumbInstance});

				}
				else {
					var anchorParams = {
						x:specimen[0], y:specimen[1],
						orientation : (specimen.length >= 4) ? [ specimen[2], specimen[3] ] : [0,0],
						offsets : (specimen.length >= 6) ? [ specimen[4], specimen[5] ] : [ 0, 0 ],
						elementId:elementId,
                        jsPlumbInstance:jsPlumbInstance,
                        cssClass:specimen.length == 7 ? specimen[6] : null
					};						
					newAnchor = new jsPlumb.Anchor(anchorParams);
					newAnchor.clone = function() { return new jsPlumb.Anchor(anchorParams); };						 					
				}
			}
			
			if (!newAnchor.id) newAnchor.id = "anchor_" + _idstamp();
			return newAnchor;
		};

		/**
		 * makes a list of anchors from the given list of types or coords, eg
		 * ["TopCenter", "RightMiddle", "BottomCenter", [0, 1, -1, -1] ]
		 */
		this.makeAnchors = function(types, elementId, jsPlumbInstance) {
			var r = [];
			for ( var i = 0, ii = types.length; i < ii; i++) {
				if (typeof types[i] == "string")
					r.push(jsPlumb.Anchors[types[i]]({elementId:elementId, jsPlumbInstance:jsPlumbInstance}));
				else if (_ju.isArray(types[i]))
					r.push(_currentInstance.makeAnchor(types[i], elementId, jsPlumbInstance));
			}
			return r;
		};

		/**
		 * Makes a dynamic anchor from the given list of anchors (which may be in shorthand notation as strings or dimension arrays, or Anchor
		 * objects themselves) and the given, optional, anchorSelector function (jsPlumb uses a default if this is not provided; most people will
		 * not need to provide this - i think). 
		 */
		this.makeDynamicAnchor = function(anchors, anchorSelector) {
			return new jsPlumb.DynamicAnchor({anchors:anchors, selector:anchorSelector, elementId:null, jsPlumbInstance:_currentInstance});
		};
		
// --------------------- makeSource/makeTarget ---------------------------------------------- 
		
		var _targetEndpointDefinitions = {},
			_targetEndpoints = {},
			_targetEndpointsUnique = {},
			_targetMaxConnections = {},
			_setEndpointPaintStylesAndAnchor = function(ep, epIndex) {
				ep.paintStyle = ep.paintStyle ||
				 				_currentInstance.Defaults.EndpointStyles[epIndex] ||
	                            _currentInstance.Defaults.EndpointStyle ||
	                            jsPlumb.Defaults.EndpointStyles[epIndex] ||
	                            jsPlumb.Defaults.EndpointStyle;
				ep.hoverPaintStyle = ep.hoverPaintStyle ||
	                           _currentInstance.Defaults.EndpointHoverStyles[epIndex] ||
	                           _currentInstance.Defaults.EndpointHoverStyle ||
	                           jsPlumb.Defaults.EndpointHoverStyles[epIndex] ||
	                           jsPlumb.Defaults.EndpointHoverStyle;                            

				ep.anchor = ep.anchor ||
	                      	_currentInstance.Defaults.Anchors[epIndex] ||
	                      	_currentInstance.Defaults.Anchor ||
	                      	jsPlumb.Defaults.Anchors[epIndex] ||
	                      	jsPlumb.Defaults.Anchor;                           
					
				ep.endpoint = ep.endpoint ||
							  _currentInstance.Defaults.Endpoints[epIndex] ||
							  _currentInstance.Defaults.Endpoint ||
							  jsPlumb.Defaults.Endpoints[epIndex] ||
							  jsPlumb.Defaults.Endpoint;
			},
			// TODO put all the source stuff inside one parent, keyed by id.
			_sourceEndpointDefinitions = {},
			_sourceEndpoints = {},
			_sourceEndpointsUnique = {},
			_sourcesEnabled = {},
			_sourceTriggers = {},
			_sourceMaxConnections = {},
			_targetsEnabled = {},
			selectorFilter = function(evt, _el, selector) {	            
                var t = evt.target || evt.srcElement, ok = false, 
                    sel = _currentInstance.getSelector(_el, selector);
                for (var j = 0; j < sel.length; j++) {
                    if (sel[j] == t) {
                        ok = true;
                        break;
                    }
                }
                return ok;	            
	        };

		// see API docs
		this.makeTarget = function(el, params, referenceParams) {						
			
			// put jsplumb ref into params without altering the params passed in
			var p = jsPlumb.extend({_jsPlumb:_currentInstance}, referenceParams);
			jsPlumb.extend(p, params);

			// calculate appropriate paint styles and anchor from the params given			
			_setEndpointPaintStylesAndAnchor(p, 1);                               

			var jpcl = jsPlumb.CurrentLibrary,
			    targetScope = p.scope || _currentInstance.Defaults.Scope,
			    deleteEndpointsOnDetach = !(p.deleteEndpointsOnDetach === false),
			    maxConnections = p.maxConnections || -1,
				onMaxConnections = p.onMaxConnections,

				_doOne = function(el) {
					
					// get the element's id and store the endpoint definition for it.  jsPlumb.connect calls will look for one of these,
					// and use the endpoint definition if found.
					// decode the info for this element (id and element)
					var elInfo = _info(el), 
						elid = elInfo.id,
						proxyComponent = new jsPlumbUIComponent(p),
						dropOptions = jsPlumb.extend({}, p.dropOptions || {});

					// store the definitions keyed against the element id.
					_targetEndpointDefinitions[elid] = p;
					_targetEndpointsUnique[elid] = p.uniqueEndpoint;
					_targetMaxConnections[elid] = maxConnections;
					_targetsEnabled[elid] = true;				

					var _drop = function() {
						_currentInstance.currentlyDragging = false;
						var originalEvent = jsPlumb.CurrentLibrary.getDropEvent(arguments),
							targetCount = _currentInstance.select({target:elid}).length,
							draggable = _gel(jpcl.getDragObject(arguments)),
							id = _currentInstance.getAttribute(draggable, "dragId"),										
							scope = _currentInstance.getAttribute(draggable, "originalScope"),
							jpc = floatingConnections[id],
							idx = jpc.endpoints[0].isFloating() ? 0 : 1,
							// this is not necessarily correct. if the source is being dragged,
							// then the source endpoint is actually the currently suspended endpoint.
							source = jpc.endpoints[0],
							_endpoint = p.endpoint ? jsPlumb.extend({}, p.endpoint) : {};					
							
						if (!_targetsEnabled[elid] || _targetMaxConnections[elid] > 0 && targetCount >= _targetMaxConnections[elid]){
							if (onMaxConnections) {
								// TODO here we still have the id of the floating element, not the
								// actual target.
								onMaxConnections({
									element:elInfo.el,
									connection:jpc
								}, originalEvent);
							}
							return false;
						}

						// unlock the source anchor to allow it to refresh its position if necessary
						source.anchor.locked = false;					
											
						// restore the original scope if necessary (issue 57)
						if (scope) jpcl.setDragScope(draggable, scope);		

						// if no suspendedEndpoint and not pending, it is likely there was a drop on two 
						// elements that are on top of each other. abort.
						if (jpc.suspendedEndpoint == null && !jpc.pending)
							return false;		
						
						// check if drop is allowed here.					
						// if the source is being dragged then in fact
						// the source and target ids to pass into the drop interceptor are
						// source - elid
						// target - jpc's targetId
						// 
						// otherwise the ids are
						// source - jpc.sourceId
						// target - elid
						//
						var _continue = proxyComponent.isDropAllowed(idx === 0 ? elid : jpc.sourceId, idx === 0 ? jpc.targetId : elid, jpc.scope, jpc, null);							

						// reinstate any suspended endpoint; this just puts the connection back into
						// a state in which it will report sensible values if someone asks it about
						// its target.  we're going to throw this connection away shortly so it doesnt matter
						// if we manipulate it a bit.
						if (jpc.suspendedEndpoint) {
							jpc[idx ? "targetId" : "sourceId"] = jpc.suspendedEndpoint.elementId;
							jpc[idx ? "target" : "source"] = jpc.suspendedEndpoint.element;
							jpc.endpoints[idx] = jpc.suspendedEndpoint;
						}																										
						
						if (_continue) {
																	
							// make a new Endpoint for the target, or get it from the cache if uniqueEndpoint
                            // is set.
							var _el = jpcl.getElementObject(elInfo.el),
								newEndpoint = _targetEndpoints[elid];

                            // if no cached endpoint, or there was one but it has been cleaned up
                            // (ie. detached), then create a new one.
                            if (newEndpoint == null || newEndpoint._jsPlumb == null)
                                newEndpoint = _currentInstance.addEndpoint(_el, p);

							if (p.uniqueEndpoint) _targetEndpoints[elid] = newEndpoint;  // may of course just store what it just pulled out. that's ok.
							// TODO test options to makeTarget to see if we should do this?
							newEndpoint._doNotDeleteOnDetach = false; // reset.
							newEndpoint._deleteOnDetach = true;
																	
							// if the anchor has a 'positionFinder' set, then delegate to that function to find
							// out where to locate the anchor.
							if (newEndpoint.anchor.positionFinder != null) {
								var dropPosition = jpcl.getUIPosition(arguments, _currentInstance.getZoom()),
								elPosition = _getOffset(_el, _currentInstance),
								elSize = _getSize(_el),
								ap = newEndpoint.anchor.positionFinder(dropPosition, elPosition, elSize, newEndpoint.anchor.constructorParams);
								newEndpoint.anchor.x = ap[0];
								newEndpoint.anchor.y = ap[1];
								// now figure an orientation for it..kind of hard to know what to do actually. probably the best thing i can do is to
								// support specifying an orientation in the anchor's spec. if one is not supplied then i will make the orientation 
								// be what will cause the most natural link to the source: it will be pointing at the source, but it needs to be
								// specified in one axis only, and so how to make that choice? i think i will use whichever axis is the one in which
								// the target is furthest away from the source.
							}
							
							// change the target endpoint and target element information. really this should be 
							// done on a method on connection
							jpc[idx ? "target" : "source"] = newEndpoint.element;
							jpc[idx ? "targetId" : "sourceId"] = newEndpoint.elementId;
							jpc.endpoints[idx].detachFromConnection(jpc);
							if (jpc.endpoints[idx]._deleteOnDetach)
								jpc.endpoints[idx].deleteAfterDragStop = true; // tell this endpoint to delet itself after drag stop.
							// set new endpoint, and configure the settings for endpoints to delete on detach
							newEndpoint.addConnection(jpc);
							jpc.endpoints[idx] = newEndpoint;
							jpc.deleteEndpointsOnDetach = deleteEndpointsOnDetach;						

							// inform the anchor manager to update its target endpoint for this connection.
							// TODO refactor to make this a single method.
							if (idx == 1)
								_currentInstance.anchorManager.updateOtherEndpoint(jpc.sourceId, jpc.suspendedElementId, jpc.targetId, jpc);
							else
								_currentInstance.anchorManager.sourceChanged(jpc.suspendedEndpoint.elementId, jpc.sourceId, jpc);

							_finaliseConnection(jpc, null, originalEvent);
							jpc.pending = false;

						}				
						// if not allowed to drop...
						else {
							// TODO this code is identical (pretty much) to what happens when a connection
							// dragged from a normal endpoint is in this situation. refactor.
							// is this an existing connection, and will we reattach?
							// TODO also this assumes the source needs to detach - is that always valid?
							if (jpc.suspendedEndpoint) {							
								if (jpc.isReattach()) {
									jpc.setHover(false);
									jpc.floatingAnchorIndex = null;
									jpc.suspendedEndpoint.addConnection(jpc);
									_currentInstance.repaint(source.elementId);
								}
								else
									source.detach(jpc, false, true, true, originalEvent);  // otherwise, detach the connection and tell everyone about it.
							}
							
						}														
					};
					
					// wrap drop events as needed and initialise droppable
					var dropEvent = jpcl.dragEvents.drop;
					dropOptions.scope = dropOptions.scope || targetScope;
					dropOptions[dropEvent] = _ju.wrap(dropOptions[dropEvent], _drop);				
					jpcl.initDroppable(_gel(elInfo.el), dropOptions, true);
				};
			
			// YUI collection fix
			el = _convertYUICollection(el);			
			// make an array if only given one element
			var inputs = el.length && el.constructor != String ? el : [ el ];
						
			// register each one in the list.
			for (var i = 0, ii = inputs.length; i < ii; i++) {							
				_doOne(inputs[i]);
			}

			return _currentInstance;
		};

		// see api docs
		this.unmakeTarget = function(el, doNotClearArrays) {
			var info = _info(el);

			jsPlumb.CurrentLibrary.destroyDroppable(info.el);
			// TODO this is not an exhaustive unmake of a target, since it does not remove the droppable stuff from
			// the element.  the effect will be to prevent it from behaving as a target, but it's not completely purged.
			if (!doNotClearArrays) {
				delete _targetEndpointDefinitions[info.id];
				delete _targetEndpointsUnique[info.id];
				delete _targetMaxConnections[info.id];
				delete _targetsEnabled[info.id];                
			}

			return _currentInstance;
		};						

	    // see api docs
		this.makeSource = function(el, params, referenceParams) {
			var p = jsPlumb.extend({}, referenceParams);
			jsPlumb.extend(p, params);
			_setEndpointPaintStylesAndAnchor(p, 0);   
			var jpcl = jsPlumb.CurrentLibrary,
				maxConnections = p.maxConnections || -1,
				onMaxConnections = p.onMaxConnections,
				_doOne = function(elInfo) {
					// get the element's id and store the endpoint definition for it.  jsPlumb.connect calls will look for one of these,
					// and use the endpoint definition if found.
					var elid = elInfo.id,
						_el = _gel(elInfo.el),
						parentElement = function() {
							return p.parent == null ? null : p.parent === "parent" ? elInfo.el.parentNode : _dom(p.parent);
						},
						idToRegisterAgainst = p.parent != null ? _currentInstance.getId(parentElement()) : elid;
					
					_sourceEndpointDefinitions[idToRegisterAgainst] = p;
					_sourceEndpointsUnique[idToRegisterAgainst] = p.uniqueEndpoint;
					_sourcesEnabled[idToRegisterAgainst] = true;

					var stopEvent = jpcl.dragEvents.stop,
						dragEvent = jpcl.dragEvents.drag,
						dragOptions = jsPlumb.extend({ }, p.dragOptions || {}),
						existingDrag = dragOptions.drag,
						existingStop = dragOptions.stop,
						ep = null,
						endpointAddedButNoDragYet = false;
				
					_sourceMaxConnections[idToRegisterAgainst] = maxConnections;	

					// set scope if its not set in dragOptions but was passed in in params
					dragOptions.scope = dragOptions.scope || p.scope;

					dragOptions[dragEvent] = _ju.wrap(dragOptions[dragEvent], function() {
						if (existingDrag) existingDrag.apply(this, arguments);
						endpointAddedButNoDragYet = false;
					});
					
					dragOptions[stopEvent] = _ju.wrap(dragOptions[stopEvent], function() { 

						if (existingStop) existingStop.apply(this, arguments);								
	                    _currentInstance.currentlyDragging = false;						
						if (ep._jsPlumb != null) { // if not cleaned up...

							jpcl.unbind(ep.canvas, "mousedown"); 
									
							// reset the anchor to the anchor that was initially provided. the one we were using to drag
							// the connection was just a placeholder that was located at the place the user pressed the
							// mouse button to initiate the drag.
							var anchorDef = p.anchor || _currentInstance.Defaults.Anchor,
								oldAnchor = ep.anchor,
								oldConnection = ep.connections[0],
								newAnchor = _currentInstance.makeAnchor(anchorDef, elid, _currentInstance),
								_el = ep.element;

							// if the anchor has a 'positionFinder' set, then delegate to that function to find
							// out where to locate the anchor. issue 117.
							if (newAnchor.positionFinder != null) {
								var elPosition = _getOffset(_el, _currentInstance),
									elSize = _getSize(_el),
									dropPosition = { left:elPosition.left + (oldAnchor.x * elSize[0]), top:elPosition.top + (oldAnchor.y * elSize[1]) },
									ap = newAnchor.positionFinder(dropPosition, elPosition, elSize, newAnchor.constructorParams);

								newAnchor.x = ap[0];
								newAnchor.y = ap[1];
							}

							ep.setAnchor(newAnchor, true);																							
							
							if (p.parent) {						
								var parent = parentElement();
								if (parent) {	
									var potentialParent = p.container || _currentInstance.Defaults.Container || jsPlumb.Defaults.Container;
									ep.setElement(parent, potentialParent);
								}
							}						
							
							ep.repaint();			
							_currentInstance.repaint(ep.elementId);																		
							_currentInstance.repaint(oldConnection.targetId);
						}				
					});
					// when the user presses the mouse, add an Endpoint, if we are enabled.
					var mouseDownListener = function(e) {

						// if disabled, return.
						if (!_sourcesEnabled[idToRegisterAgainst]) return;
	                    
	                    // if a filter was given, run it, and return if it says no.
						if (p.filter) {
							var evt = jpcl.getOriginalEvent(e),
								r = jsPlumbUtil.isString(p.filter) ? selectorFilter(evt, _el, p.filter) : p.filter(evt, _el);
							
							if (r === false) return;
						}
						
						// if maxConnections reached
						var sourceCount = _currentInstance.select({source:idToRegisterAgainst}).length;
						if (_sourceMaxConnections[idToRegisterAgainst] >= 0 && sourceCount >= _sourceMaxConnections[idToRegisterAgainst]) {
							if (onMaxConnections) {
								onMaxConnections({
									element:_el,
									maxConnections:maxConnections
								}, e);
							}
							return false;
						}					

						// make sure we have the latest offset for this div 
						var myOffsetInfo = _updateOffset({elId:elid}).o,
							z = _currentInstance.getZoom(),		
							x = ( ((e.pageX || e.page.x) / z) - myOffsetInfo.left) / myOffsetInfo.width, 
						    y = ( ((e.pageY || e.page.y) / z) - myOffsetInfo.top) / myOffsetInfo.height,
						    parentX = x, 
						    parentY = y;					
								
						// if there is a parent, the endpoint will actually be added to it now, rather than the div
						// that was the source.  in that case, we have to adjust the anchor position so it refers to
						// the parent.
						if (p.parent) {
							var pEl = parentElement(), pId = _getId(pEl);
							myOffsetInfo = _updateOffset({elId:pId}).o;
							parentX = ((e.pageX || e.page.x) - myOffsetInfo.left) / myOffsetInfo.width; 
						    parentY = ((e.pageY || e.page.y) - myOffsetInfo.top) / myOffsetInfo.height;
						}											
						
						// we need to override the anchor in here, and force 'isSource', but we don't want to mess with
						// the params passed in, because after a connection is established we're going to reset the endpoint
						// to have the anchor we were given.
						var tempEndpointParams = {};
						jsPlumb.extend(tempEndpointParams, p);
						tempEndpointParams.isSource = true;
						tempEndpointParams.anchor = [x,y,0,0];
						tempEndpointParams.parentAnchor = [ parentX, parentY, 0, 0 ];
						tempEndpointParams.dragOptions = dragOptions;
						// if a parent was given we need to turn that into a "container" argument.  this is, by default,
						// the parent of the element we will move to, so parent of p.parent in this case.  however, if
						// the user has specified a 'container' on the endpoint definition or on 
						// the defaults, we should use that.
						if (p.parent) {
							var potentialParent = tempEndpointParams.container || _currentInstance.Defaults.Container || jsPlumb.Defaults.Container;
							if (potentialParent)
								tempEndpointParams.container = potentialParent;
							else
								tempEndpointParams.container = jsPlumb.CurrentLibrary.getParent(parentElement());
						}
						
						ep = _currentInstance.addEndpoint(elid, tempEndpointParams);

						endpointAddedButNoDragYet = true;
						// we set this to prevent connections from firing attach events before this function has had a chance
						// to move the endpoint.
						ep.endpointWillMoveAfterConnection = p.parent != null;
						ep.endpointWillMoveTo = p.parent ? parentElement() : null;

						// TODO test options to makeSource to see if we should do this?
						ep._doNotDeleteOnDetach = false; // reset.
						ep._deleteOnDetach = true;

	                    var _delTempEndpoint = function() {
							// this mouseup event is fired only if no dragging occurred, by jquery and yui, but for mootools
							// it is fired even if dragging has occurred, in which case we would blow away a perfectly
							// legitimate endpoint, were it not for this check.  the flag is set after adding an
							// endpoint and cleared in a drag listener we set in the dragOptions above.
							if(endpointAddedButNoDragYet) {
								 endpointAddedButNoDragYet = false;
								_currentInstance.deleteEndpoint(ep);
	                        }
						};

						_currentInstance.registerListener(ep.canvas, "mouseup", _delTempEndpoint);
	                    _currentInstance.registerListener(_el, "mouseup", _delTempEndpoint);
						
						// and then trigger its mousedown event, which will kick off a drag, which will start dragging
						// a new connection from this endpoint.
						jpcl.trigger(ep.canvas, "mousedown", e);
						
					};
	               
	                // register this on jsPlumb so that it can be cleared by a reset.
	                _currentInstance.registerListener(_el, "mousedown", mouseDownListener);
	                _sourceTriggers[elid] = mouseDownListener;

	                // lastly, if a filter was provided, set it as a dragFilter on the element,
	                // to prevent the element drag function from kicking in when we want to
	                // drag a new connection
	                if (p.filter && jsPlumbUtil.isString(p.filter)) {
	                	jpcl.setDragFilter(_el, p.filter);
	                }
				};
			
			el = _convertYUICollection(el);			
			
			var inputs = el.length && el.constructor != String ? el : [ el ];
						
			for (var i = 0, ii = inputs.length; i < ii; i++) {			
				_doOne(_info(inputs[i]));
			}

			return _currentInstance;
		};
	
		// see api docs		
		this.unmakeSource = function(el, doNotClearArrays) {
			var info = _info(el),
				mouseDownListener = _sourceTriggers[info.id];
			
			if (mouseDownListener) 
				_currentInstance.unregisterListener(info.el, "mousedown", mouseDownListener);

			if (!doNotClearArrays) {
				delete _sourceEndpointDefinitions[info.id];
				delete _sourceEndpointsUnique[info.id];
				delete _sourcesEnabled[info.id];
				delete _sourceTriggers[info.id];
				delete _sourceMaxConnections[info.id];
			}

			return _currentInstance;
		};

		// see api docs
		this.unmakeEverySource = function() {
			for (var i in _sourcesEnabled)
				_currentInstance.unmakeSource(i, true);

			_sourceEndpointDefinitions = {};
			_sourceEndpointsUnique = {};
			_sourcesEnabled = {};
			_sourceTriggers = {};
		};
		
		// see api docs
		this.unmakeEveryTarget = function() {
			for (var i in _targetsEnabled)
				_currentInstance.unmakeTarget(i, true);
			
			_targetEndpointDefinitions = {};
			_targetEndpointsUnique = {};
			_targetMaxConnections = {};
			_targetsEnabled = {};

			return _currentInstance;
		};			

		// does the work of setting a source enabled or disabled.
		var _setEnabled = function(type, el, state, toggle) {
			var a = type == "source" ? _sourcesEnabled : _targetsEnabled;									
			el = _convertYUICollection(el);

			if (_ju.isString(el)) a[el] = toggle ? !a[el] : state;
			else if (el.length) {				
				for (var i = 0, ii = el.length; i < ii; i++) {
					var info = _info(el[i]);
					a[info.id] = toggle ? !a[info.id] : state;
				}
			}	
			return _currentInstance;
		};

		this.toggleSourceEnabled = function(el) {
			_setEnabled("source", el, null, true);	
			return _currentInstance.isSourceEnabled(el);
		};

		this.setSourceEnabled = function(el, state) { return _setEnabled("source", el, state); };
		this.isSource = function(el) { return _sourcesEnabled[_info(el).id] != null; };		
		this.isSourceEnabled = function(el) { return _sourcesEnabled[_info(el).id] === true; };

		this.toggleTargetEnabled = function(el) {
			_setEnabled("target", el, null, true);	
			return _currentInstance.isTargetEnabled(el);
		};
		
		this.isTarget = function(el) { return _targetsEnabled[_info(el).id] != null; };		
		this.isTargetEnabled = function(el) { return _targetsEnabled[_info(el).id] === true; };
		this.setTargetEnabled = function(el, state) { return _setEnabled("target", el, state); };

// --------------------- end makeSource/makeTarget ---------------------------------------------- 				
				
		this.ready = function(fn) {
			_currentInstance.bind("ready", fn);
		};

		// repaint some element's endpoints and connections
		this.repaint = function(el, ui, timestamp) {
			// support both lists...
			if (typeof el == 'object' && el.length)
				for ( var i = 0, ii = el.length; i < ii; i++) {			
					_draw(el[i], ui, timestamp);
				}
			else // ...and single strings.								
				_draw(el, ui, timestamp);
				
			return _currentInstance;
		};

		// repaint every endpoint and connection.
		this.repaintEverything = function(clearEdits) {	
			// TODO this timestamp causes continuous anchors to not repaint properly.
			// fix this. do not just take out the timestamp. it runs a lot faster with 
			// the timestamp included.
			//var timestamp = null;
			var timestamp = _timestamp();
			for ( var elId in endpointsByElement) {
				_draw(elId, null, timestamp, clearEdits);				
			}
			return _currentInstance;
		};

		
		this.removeAllEndpoints = function(el, recurse) {
            var _one = function(_el) {                            	
                var info = _info(_el),
                    ebe = endpointsByElement[info.id],
                    i, ii;

                if (ebe) {
                    for ( i = 0, ii = ebe.length; i < ii; i++) 
                        _currentInstance.deleteEndpoint(ebe[i]);
                }
                delete endpointsByElement[info.id];
                
                if (recurse) {
                    if (info.el && info.el.nodeType != 3 && info.el.nodeType != 8 ) {
                        for ( i = 0, ii = info.el.childNodes.length; i < ii; i++) {
                            _one(info.el.childNodes[i]);
                        }
                    }
                }
                
            };
            _one(el);
			return _currentInstance;
		};
                    
        /**
        * Remove the given element, including cleaning up all endpoints registered for it.
        * This is exposed in the public API but also used internally by jsPlumb when removing the
        * element associated with a connection drag.
        */
        this.remove = function(el, doNotRepaint) {
        	var info = _info(el);        	
            _currentInstance.doWhileSuspended(function() {
            	_currentInstance.removeAllEndpoints(info.id, true);
            	_currentInstance.dragManager.elementRemoved(info.id);
            	delete floatingConnections[info.id];     
            	_currentInstance.anchorManager.clearFor(info.id);						
            	_currentInstance.anchorManager.removeFloatingConnection(info.id);
            }, doNotRepaint === false);
            if(info.el) jsPlumb.CurrentLibrary.removeElement(info.el);
        };

		var _registeredListeners = {},
			_unbindRegisteredListeners = function() {
				for (var i in _registeredListeners) {
					for (var j = 0, jj = _registeredListeners[i].length; j < jj; j++) {
						var info = _registeredListeners[i][j];
						jsPlumb.CurrentLibrary.unbind(info.el, info.event, info.listener);
					}
				}
				_registeredListeners = {};
			};

        // internal register listener method.  gives us a hook to clean things up
        // with if the user calls jsPlumb.reset.
        this.registerListener = function(el, type, listener) {
            jsPlumb.CurrentLibrary.bind(el, type, listener);
            jsPlumbUtil.addToList(_registeredListeners, type, {el:el, event:type, listener:listener});
        };

        this.unregisterListener = function(el, type, listener) {
        	jsPlumb.CurrentLibrary.unbind(el, type, listener);
        	jsPlumbUtil.removeWithFunction(_registeredListeners, function(rl) {
        		return rl.type == type && rl.listener == listener;
        	});
        };
		
		this.reset = function() {			
			_currentInstance.deleteEveryEndpoint();
			_currentInstance.unbind();
			_targetEndpointDefinitions = {};
			_targetEndpoints = {};
			_targetEndpointsUnique = {};
			_targetMaxConnections = {};
			_sourceEndpointDefinitions = {};
			_sourceEndpoints = {};
			_sourceEndpointsUnique = {};
			_sourceMaxConnections = {};
			connections.splice(0);
			_unbindRegisteredListeners();
			_currentInstance.anchorManager.reset();
			if (!jsPlumbAdapter.headless)
				_currentInstance.dragManager.reset();
		};
		

		this.setDefaultScope = function(scope) {
			DEFAULT_SCOPE = scope;
			return _currentInstance;
		};

		// sets whether or not some element should be currently draggable.
		this.setDraggable = _setDraggable;

		// sets the id of some element, changing whatever we need to to keep track.
		this.setId = function(el, newId, doNotSetAttribute) {
			// 
			var id;

			if (jsPlumbUtil.isString(el)) {
				id = el;				
			}
			else {
				el = _dom(el);
				id = _currentInstance.getId(el);
			}

			var sConns = _currentInstance.getConnections({source:id, scope:'*'}, true),
				tConns = _currentInstance.getConnections({target:id, scope:'*'}, true);

			newId = "" + newId;

			if (!doNotSetAttribute) {
				el = _dom(id);
				jsPlumbAdapter.setAttribute(el, "id", newId);
			}
			else
				el = _dom(newId);

			endpointsByElement[newId] = endpointsByElement[id] || [];
			for (var i = 0, ii = endpointsByElement[newId].length; i < ii; i++) {
				endpointsByElement[newId][i].setElementId(newId);
				endpointsByElement[newId][i].setReferenceElement(el);
			}
			delete endpointsByElement[id];

			_currentInstance.anchorManager.changeId(id, newId);
			if (!jsPlumbAdapter.headless)		
				_currentInstance.dragManager.changeId(id, newId);

			var _conns = function(list, epIdx, type) {
				for (var i = 0, ii = list.length; i < ii; i++) {
					list[i].endpoints[epIdx].setElementId(newId);
					list[i].endpoints[epIdx].setReferenceElement(el);
					list[i][type + "Id"] = newId;
					list[i][type] = el;
				}
			};
			_conns(sConns, 0, "source");
			_conns(tConns, 1, "target");

			_currentInstance.repaint(newId);
		};		

		this.setDebugLog = function(debugLog) {
			log = debugLog;
		};
			          	
		this.setSuspendDrawing = function(val, repaintAfterwards) {
			var curVal = _suspendDrawing;
		    _suspendDrawing = val;
				if (val) _suspendedAt = new Date().getTime(); else _suspendedAt = null;
		    if (repaintAfterwards) _currentInstance.repaintEverything();
		    return curVal;
		};
        	
        // returns whether or not drawing is currently suspended.		
		this.isSuspendDrawing = function() {
			return _suspendDrawing;
		};
            
        // return timestamp for when drawing was suspended.
        this.getSuspendedAt = function() { return _suspendedAt; };

        /**
        * @doc function
        * @name jsPlumb.class:doWhileSuspended
        * @param {function} fn Function to run while suspended.
        * @param {boolean} doNotRepaintAfterwards If true, jsPlumb won't run a full repaint. Otherwise it will.
        * @description Suspends drawing, runs the given function, then re-enables drawing (and repaints, unless you tell it not to)
        */
        this.doWhileSuspended = function(fn, doNotRepaintAfterwards) {     
        	var _wasSuspended = _currentInstance.isSuspendDrawing();        	
        	if (!_wasSuspended)
				_currentInstance.setSuspendDrawing(true);
			try {
				fn();
			}
			catch (e) {
				_ju.log("Function run while suspended failed", e);
			}			
			if (!_wasSuspended)
				_currentInstance.setSuspendDrawing(false, !doNotRepaintAfterwards);
        };
            
        this.updateOffset = _updateOffset;
        this.getOffset = function(elId) { return offsets[elId]; };
        this.getSize = function(elId) { return sizes[elId]; };            
        this.getCachedData = _getCachedData;
        this.timestamp = _timestamp;
		
		
		
		/**
		 * @doc function
		 * @name jsPlumb.class:setRenderMode
		 * @param {string} mode One of `jsPlumb.SVG, `jsPlumb.VML` or `jsPlumb.CANVAS`.
		 * @description Sets render mode.  jsPlumb will fall back to VML if it determines that
		 * what you asked for is not supported (and that VML is).  If you asked for VML but the browser does
		 * not support it, jsPlumb uses SVG.
		 * @return {string} The render mode that jsPlumb set, which of course may be different from that requested.
		 */
		this.setRenderMode = function(mode) {			
			renderMode = jsPlumbAdapter.setRenderMode(mode);
			var i, ii;
			// only add this if the renderer is canvas; we dont want these listeners registered on te
			// entire document otherwise.
			if (renderMode == jsPlumb.CANVAS) {
				var bindOne = function(event) {
	                jsPlumb.CurrentLibrary.bind(document, event, function(e) {
	                    if (!_currentInstance.currentlyDragging && renderMode == jsPlumb.CANVAS) {
	                        // try connections first
	                        for (i = 0, ii = connections.length; i < ii; i++ ) {
                                var t = connections[i].getConnector()[event](e);
                                if (t) return;	
                            }
	                        for (var el in endpointsByElement) {
	                            var ee = endpointsByElement[el];
	                            for ( i = 0, ii = ee.length; i < ii; i++ ) {
	                                if (ee[i].endpoint[event] && ee[i].endpoint[event](e)) return;
	                            }
	                        }
	                    }
	                });					
				};
				bindOne("click");bindOne("dblclick");bindOne("mousemove");bindOne("mousedown");bindOne("mouseup");bindOne("contextmenu");				
			}

			return renderMode;
		};
		
		/**
		 * @doc function
		 * @name jsPlumb.class:getRenderMode
		 * @description Gets the current render mode for this instance of jsPlumb.
		 * @return {string} The current render mode - "canvas", "svg" or "vml".
		 */
		this.getRenderMode = function() { return renderMode; };
		
		this.show = function(el, changeEndpoints) {
			_setVisible(el, "block", changeEndpoints);
			return _currentInstance;
		};		

		/**
		 * gets some test hooks. nothing writable.
		 */
		this.getTestHarness = function() {
			return {
				endpointsByElement : endpointsByElement,  
				endpointCount : function(elId) {
					var e = endpointsByElement[elId];
					return e ? e.length : 0;
				},
				connectionCount : function(scope) {
					scope = scope || DEFAULT_SCOPE;
					var c = _currentInstance.getConnections({scope:scope});
					return c ? c.length : 0;
				},
				getId : _getId,
				makeAnchor:self.makeAnchor,
				makeDynamicAnchor:self.makeDynamicAnchor
			};
		};
		
		
		// TODO: update this method to return the current state.
		this.toggleVisible = _toggleVisible;
		this.toggleDraggable = _toggleDraggable;						
		this.addListener = this.bind;
		
        /*
            helper method to take an xy location and adjust it for the parent's offset and scroll.
        */
		this.adjustForParentOffsetAndScroll = function(xy, el) {

			var offsetParent = null, result = xy;
			if (el.tagName.toLowerCase() === "svg" && el.parentNode) {
				offsetParent = el.parentNode;
			}
			else if (el.offsetParent) {
				offsetParent = el.offsetParent;					
			}
			if (offsetParent != null) {
				var po = offsetParent.tagName.toLowerCase() === "body" ? {left:0,top:0} : _getOffset(offsetParent, _currentInstance),
					so = offsetParent.tagName.toLowerCase() === "body" ? {left:0,top:0} : {left:offsetParent.scrollLeft, top:offsetParent.scrollTop};					

				// i thought it might be cool to do this:
				//	lastReturnValue[0] = lastReturnValue[0] - offsetParent.offsetLeft + offsetParent.scrollLeft;
				//	lastReturnValue[1] = lastReturnValue[1] - offsetParent.offsetTop + offsetParent.scrollTop;					
				// but i think it ignores margins.  my reasoning was that it's quicker to not hand off to some underlying					
				// library.
				
				result[0] = xy[0] - po.left + so.left;
				result[1] = xy[1] - po.top + so.top;
			}
		
			return result;
			
		};

		if (!jsPlumbAdapter.headless) {
			_currentInstance.dragManager = jsPlumbAdapter.getDragManager(_currentInstance);
			_currentInstance.recalculateOffsets = _currentInstance.dragManager.updateOffsets;
	    }	    
				    
    };

    jsPlumbUtil.extend(jsPlumbInstance, jsPlumbUtil.EventGenerator, {
    	setAttribute : function(el, a, v) {
    		jsPlumbAdapter.setAttribute(el, a, v);
    	},
    	getAttribute : function(el, a) {
    		return jsPlumbAdapter.getAttribute(jsPlumb.CurrentLibrary.getDOMElement(el), a);
    	},    	
    	registerConnectionType : function(id, type) {
    		this._connectionTypes[id] = jsPlumb.extend({}, type);
    	},    	
    	registerConnectionTypes : function(types) {
    		for (var i in types)
    			this._connectionTypes[i] = jsPlumb.extend({}, types[i]);
    	},    	    	
    	registerEndpointType : function(id, type) {
    		this._endpointTypes[id] = jsPlumb.extend({}, type);
    	},    	
    	registerEndpointTypes : function(types) {
    		for (var i in types)
    			this._endpointTypes[i] = jsPlumb.extend({}, types[i]);
    	},    	
    	getType : function(id, typeDescriptor) {
    		return typeDescriptor ===  "connection" ? this._connectionTypes[id] : this._endpointTypes[id];
    	},
    	setIdChanged : function(oldId, newId) {
    		this.setId(oldId, newId, true);
    	},
    	// set parent: change the parent for some node and update all the registrations we need to.
    	setParent : function(el, newParent) {
    		var jpcl = jsPlumb.CurrentLibrary,
    			_el = jpcl.getElementObject(el),
    			_dom = jpcl.getDOMElement(_el),
    			_id = this.getId(_dom),
    			_pel = jpcl.getElementObject(newParent),
    			_pdom = jpcl.getDOMElement(_pel),
    			_pid = this.getId(_pdom);

    		_dom.parentNode.removeChild(_dom);
    		_pdom.appendChild(_dom);
    		this.dragManager.setParent(_el, _id, _pel, _pid);
    	}
    });

// --------------------- static instance + AMD registration -------------------------------------------	
	
// create static instance and assign to window if window exists.	
	var jsPlumb = new jsPlumbInstance();
	// register on window if defined (lets us run on server)
	if (typeof window != 'undefined') window.jsPlumb = jsPlumb;	
	// add 'getInstance' method to static instance
	/**
	* @name jsPlumb.getInstance
	* @param {object} [_defaults] Optional default settings for the new instance.
	* @desc Gets a new instance of jsPlumb.
	*/
	jsPlumb.getInstance = function(_defaults) {
		var j = new jsPlumbInstance(_defaults);
		j.init();
		return j;
	};
// maybe register static instance as an AMD module, and getInstance method too.
	if ( typeof define === "function") {
		define( "jsplumb", [], function () { return jsPlumb; } );
		define( "jsplumbinstance", [], function () { return jsPlumb.getInstance(); } );
	}
 // CommonJS 
	if (typeof exports !== 'undefined') {
      exports.jsPlumb = jsPlumb;
  	}
	
	
// --------------------- end static instance + AMD registration -------------------------------------------		
	
})();


;(function() {
        
    // create the drag handler for a connection
    var _makeConnectionDragHandler = function(placeholder, _jsPlumb) {
        var stopped = false;
        return {
            drag : function() {
                if (stopped) {
                    stopped = false;
                    return true;
                }
                var _ui = jsPlumb.CurrentLibrary.getUIPosition(arguments, _jsPlumb.getZoom());
        
                if (placeholder.element) {
                    jsPlumb.CurrentLibrary.setOffset(placeholder.element, _ui);                    
                    _jsPlumb.repaint(placeholder.element, _ui);
                }
            },
            stopDrag : function() {
                stopped = true;
            }
        };
    };
        
    // creates a placeholder div for dragging purposes, adds it to the DOM, and pre-computes its offset.    
    var _makeDraggablePlaceholder = function(placeholder, parent, _jsPlumb) {
        var n = document.createElement("div");
        n.style.position = "absolute";
        var placeholderDragElement = jsPlumb.CurrentLibrary.getElementObject(n);
        jsPlumb.CurrentLibrary.appendElement(n, parent);
        var id = _jsPlumb.getId(n);
        _jsPlumb.updateOffset( { elId : id });
        // create and assign an id, and initialize the offset.
        placeholder.id = id;
        placeholder.element = n;
    };
    
    // create a floating endpoint (for drag connections)
    var _makeFloatingEndpoint = function(paintStyle, referenceAnchor, endpoint, referenceCanvas, sourceElement, _jsPlumb, _newEndpoint) {			
        var floatingAnchor = new jsPlumb.FloatingAnchor( { reference : referenceAnchor, referenceCanvas : referenceCanvas, jsPlumbInstance:_jsPlumb });
        //setting the scope here should not be the way to fix that mootools issue.  it should be fixed by not
        // adding the floating endpoint as a droppable.  that makes more sense anyway!
        return _newEndpoint({ paintStyle : paintStyle, endpoint : endpoint, anchor : floatingAnchor, source : sourceElement, scope:"__floating" });
    };

    var typeParameters = [ "connectorStyle", "connectorHoverStyle", "connectorOverlays",
                "connector", "connectionType", "connectorClass", "connectorHoverClass" ];

    // a helper function that tries to find a connection to the given element, and returns it if so. if elementWithPrecedence is null,
    // or no connection to it is found, we return the first connection in our list.
    var findConnectionToUseForDynamicAnchor = function(ep, elementWithPrecedence) {
        var idx = 0;
        if (elementWithPrecedence != null) {
            for (var i = 0; i < ep.connections.length; i++) {
                if (ep.connections[i].sourceId == elementWithPrecedence || ep.connections[i].targetId == elementWithPrecedence) {
                    idx = i;
                    break;
                }
            }
        }
        
        return ep.connections[idx];
    };

    var findConnectionIndex = function(conn, ep) {
        return jsPlumbUtil.findWithFunction(ep.connections, function(c) { return c.id == conn.id; });
    };

    jsPlumb.Endpoint = function(params) {
        var _jsPlumb = params._jsPlumb,
            jpcl = jsPlumb.CurrentLibrary,
            _att = jsPlumbAdapter.getAttribute,
            _gel = jpcl.getElementObject,
            _dom = jpcl.getDOMElement,
            _ju = jsPlumbUtil,            
            _newConnection = params.newConnection,
            _newEndpoint = params.newEndpoint,
            _finaliseConnection = params.finaliseConnection,
            _fireDetachEvent = params.fireDetachEvent,
            _fireMoveEvent = params.fireMoveEvent,
            floatingConnections = params.floatingConnections;
        
        this.idPrefix = "_jsplumb_e_";			
        this.defaultLabelLocation = [ 0.5, 0.5 ];
        this.defaultOverlayKeys = ["Overlays", "EndpointOverlays"];
        this.parent = params.parent;
        OverlayCapableJsPlumbUIComponent.apply(this, arguments);        
        
// TYPE		
                
        this.getDefaultType = function() {								
            return {
                parameters:{},
                scope:null,
                maxConnections:this._jsPlumb.instance.Defaults.MaxConnections,
                paintStyle:this._jsPlumb.instance.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle,
                endpoint:this._jsPlumb.instance.Defaults.Endpoint || jsPlumb.Defaults.Endpoint,
                hoverPaintStyle:this._jsPlumb.instance.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle,				
                overlays:this._jsPlumb.instance.Defaults.EndpointOverlays || jsPlumb.Defaults.EndpointOverlays,
                connectorStyle:params.connectorStyle,				
                connectorHoverStyle:params.connectorHoverStyle,
                connectorClass:params.connectorClass,
                connectorHoverClass:params.connectorHoverClass,
                connectorOverlays:params.connectorOverlays,
                connector:params.connector,
                connectorTooltip:params.connectorTooltip
            };
        };
        			
// END TYPE
            
        this._jsPlumb.enabled = !(params.enabled === false);
        this._jsPlumb.visible = true;        
        this.element = _dom(params.source);  
        this._jsPlumb.uuid = params.uuid;
        this._jsPlumb.floatingEndpoint = null;  
        var inPlaceCopy = null;
        if (this._jsPlumb.uuid) params.endpointsByUUID[this._jsPlumb.uuid] = this;
        this.elementId = params.elementId;
        
        this._jsPlumb.connectionCost = params.connectionCost;
        this._jsPlumb.connectionsDirected = params.connectionsDirected;        
        this._jsPlumb.currentAnchorClass = "";
        this._jsPlumb.events = {};
            
        var  _updateAnchorClass = function() {
            jpcl.removeClass(this.element, _jsPlumb.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass);
            this.removeClass(_jsPlumb.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass);
            this._jsPlumb.currentAnchorClass = this.anchor.getCssClass();
            this.addClass(_jsPlumb.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass);
            jpcl.addClass(this.element, _jsPlumb.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass);
        }.bind(this);
        
        this.setAnchor = function(anchorParams, doNotRepaint) {
            this._jsPlumb.instance.continuousAnchorFactory.clear(this.elementId);
            this.anchor = this._jsPlumb.instance.makeAnchor(anchorParams, this.elementId, _jsPlumb);
            _updateAnchorClass();
            this.anchor.bind("anchorChanged", function(currentAnchor) {
                this.fire("anchorChanged", {endpoint:this, anchor:currentAnchor});
                _updateAnchorClass();
            }.bind(this));
            if (!doNotRepaint)
                this._jsPlumb.instance.repaint(this.elementId);
            return this;
        };

        var anchorParamsToUse = params.anchor ? params.anchor : params.anchors ? params.anchors : (_jsPlumb.Defaults.Anchor || "Top");
        this.setAnchor(anchorParamsToUse, true);

        // endpoint delegates to first connection for hover, if there is one.
        var internalHover = function(state) {
          if (this.connections.length > 0)
            this.connections[0].setHover(state, false);
          else
            this.setHover(state);
        }.bind(this);
            
        // ANCHOR MANAGER
        if (!params._transient) // in place copies, for example, are transient.  they will never need to be retrieved during a paint cycle, because they dont move, and then they are deleted.
            this._jsPlumb.instance.anchorManager.add(this, this.elementId);
        
        this.setEndpoint = function(ep) {

            if (this.endpoint != null) {
                this.endpoint.cleanup();
                this.endpoint.destroy();
            }

            var _e = function(t, p) {
                var rm = _jsPlumb.getRenderMode();
                if (jsPlumb.Endpoints[rm][t]) return new jsPlumb.Endpoints[rm][t](p);
                if (!_jsPlumb.Defaults.DoNotThrowErrors)
                    throw { msg:"jsPlumb: unknown endpoint type '" + t + "'" };
            };            

            var endpointArgs = {
                _jsPlumb:this._jsPlumb.instance,
                cssClass:params.cssClass,
                parent:params.parent,
                container:params.container,
                tooltip:params.tooltip,
                connectorTooltip:params.connectorTooltip,
                endpoint:this
            };
            if (_ju.isString(ep)) 
                this.endpoint = _e(ep, endpointArgs);
            else if (_ju.isArray(ep)) {
                endpointArgs = _ju.merge(ep[1], endpointArgs);
                this.endpoint = _e(ep[0], endpointArgs);
            }
            else {
                this.endpoint = ep.clone();
            }

            // assign a clone function using a copy of endpointArgs. this is used when a drag starts: the endpoint that was dragged is cloned,
            // and the clone is left in its place while the original one goes off on a magical journey. 
            // the copy is to get around a closure problem, in which endpointArgs ends up getting shared by
            // the whole world.
            var argsForClone = jsPlumb.extend({}, endpointArgs);						
            this.endpoint.clone = function() {
                // TODO this, and the code above, can be refactored to be more dry.
                if (_ju.isString(ep)) 
                    return _e(ep, endpointArgs);
                else if (_ju.isArray(ep)) {
                    endpointArgs = _ju.merge(ep[1], endpointArgs);
                    return _e(ep[0], endpointArgs);
                }
            }.bind(this);

            this.type = this.endpoint.type;
            // bind listeners from endpoint to self, with the internal hover function defined above.
            this.bindListeners(this.endpoint, this, internalHover);
        };
         
        this.setEndpoint(params.endpoint || _jsPlumb.Defaults.Endpoint || jsPlumb.Defaults.Endpoint || "Dot");							                    
        this.setPaintStyle(params.paintStyle || params.style || _jsPlumb.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle, true);
        this.setHoverPaintStyle(params.hoverPaintStyle || _jsPlumb.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle, true);
        this._jsPlumb.paintStyleInUse = this.getPaintStyle();

        _ju.copyValues(typeParameters, params, this);        

        this.isSource = params.isSource || false;
        this.isTarget = params.isTarget || false;        
        this._jsPlumb.maxConnections = params.maxConnections || _jsPlumb.Defaults.MaxConnections; // maximum number of connections this endpoint can be the source of.                
        this.canvas = this.endpoint.canvas;		
        // add anchor class (need to do this on construction because we set anchor first)
        this.addClass(_jsPlumb.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass);	
        jpcl.addClass(this.element, _jsPlumb.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass);
        this.connections = params.connections || [];
        this.connectorPointerEvents = params["connector-pointer-events"];
        
        this.scope = params.scope || _jsPlumb.getDefaultScope();        
        this.timestamp = null;
        this.reattachConnections = params.reattach || _jsPlumb.Defaults.ReattachConnections;
        this.connectionsDetachable = _jsPlumb.Defaults.ConnectionsDetachable;
        if (params.connectionsDetachable === false || params.detachable === false)
            this.connectionsDetachable = false;
        this.dragAllowedWhenFull = params.dragAllowedWhenFull || true;
        
        if (params.onMaxConnections)
            this.bind("maxConnections", params.onMaxConnections);        
        
        //
        // add a connection. not part of public API.
        //
        this.addConnection = function(connection) {
            this.connections.push(connection);                  
            this[(this.connections.length > 0 ? "add" : "remove") + "Class"](_jsPlumb.endpointConnectedClass);       
            this[(this.isFull() ? "add" : "remove") + "Class"](_jsPlumb.endpointFullClass); 
        };	
        
        this.detachFromConnection = function(connection, idx) {
            idx = idx == null ? findConnectionIndex(connection, this) : idx;
            if (idx >= 0) {
                this.connections.splice(idx, 1);
                this[(this.connections.length > 0 ? "add" : "remove") + "Class"](_jsPlumb.endpointConnectedClass);       
                this[(this.isFull() ? "add" : "remove") + "Class"](_jsPlumb.endpointFullClass);                 
            }
        };

        this.detach = function(connection, ignoreTarget, forceDetach, fireEvent, originalEvent, endpointBeingDeleted, connectionIndex) {

            var idx = connectionIndex == null ? findConnectionIndex(connection, this) : connectionIndex,
                actuallyDetached = false;
                fireEvent = (fireEvent !== false);

            if (idx >= 0) {		                
                if (forceDetach || connection._forceDetach || (connection.isDetachable() && connection.isDetachAllowed(connection) && this.isDetachAllowed(connection) )) {

                    //connection.setHover(false);

                    _jsPlumb.deleteObject({
                        connection:connection, 
                        fireEvent:(!ignoreTarget && fireEvent), 
                        originalEvent:originalEvent
                    });
                    actuallyDetached = true;                       
                }
            }
            return actuallyDetached;
        };	

        this.detachAll = function(fireEvent, originalEvent) {
            while (this.connections.length > 0) {
                // TODO this could pass the index in to the detach method to save some time (index will always be zero in this while loop)
                // TODO now it defaults to fireEvent true.  will that mess with things?
                this.detach(this.connections[0], false, true, fireEvent !== false, originalEvent, this, 0);
            }
            return this;
        };                
        this.detachFrom = function(targetEndpoint, fireEvent, originalEvent) {
            var c = [];
            for ( var i = 0; i < this.connections.length; i++) {
                if (this.connections[i].endpoints[1] == targetEndpoint || this.connections[i].endpoints[0] == targetEndpoint) {
                    c.push(this.connections[i]);
                }
            }
            for ( var j = 0; j < c.length; j++) {
                this.detach(c[j], false, true, fireEvent, originalEvent);				
            }
            return this;
        };	        
        
        this.getElement = function() {
            return this.element;
        };		
                 
        // container not supported in 1.5.5; you cannot change the container once it is set.
        // it might come back int a future release.
        this.setElement = function(el/*, container*/) {
            var parentId = this._jsPlumb.instance.getId(el),
                curId = this.elementId;
            // remove the endpoint from the list for the current endpoint's element
            _ju.removeWithFunction(params.endpointsByElement[this.elementId], function(e) {
                return e.id == this.id;
            }.bind(this));
            this.element = _dom(el);
            this.elementId = _jsPlumb.getId(this.element);                         
            _jsPlumb.anchorManager.rehomeEndpoint(this, curId, this.element);
            _jsPlumb.dragManager.endpointAdded(this.element);            
            _ju.addToList(params.endpointsByElement, parentId, this);            
            return this;
        };
                
        /**
         * private but must be exposed.
         */
        this.makeInPlaceCopy = function() {
            var loc = this.anchor.getCurrentLocation({element:this}),
                o = this.anchor.getOrientation(this),
                acc = this.anchor.getCssClass(),
                inPlaceAnchor = {
                    bind:function() { },
                    compute:function() { return [ loc[0], loc[1] ]; },
                    getCurrentLocation : function() { return [ loc[0], loc[1] ]; },
                    getOrientation:function() { return o; },
                    getCssClass:function() { return acc; }
                };

            return _newEndpoint( { 
                anchor : inPlaceAnchor, 
                source : this.element, 
                paintStyle : this.getPaintStyle(), 
                endpoint : params.hideOnDrag ? "Blank" : this.endpoint,
                _transient:true,
                scope:this.scope
            });
        };
                

        /**
         * private but needs to be exposed.
         */
        this.isFloating = function() {
            return this.anchor != null && this.anchor.isFloating;
        };
        
        /**
         * returns a connection from the pool; used when dragging starts.  just gets the head of the array if it can.
         */
        this.connectorSelector = function() {
            var candidate = this.connections[0];
            if (this.isTarget && candidate) return candidate;
            else {
                return (this.connections.length < this._jsPlumb.maxConnections) || this._jsPlumb.maxConnections == -1 ? null : candidate;
            }
        };        
        
        this.setStyle = this.setPaintStyle;        
        
        this.paint = function(params) {
            params = params || {};
            var timestamp = params.timestamp, recalc = !(params.recalc === false);								
            if (!timestamp || this.timestamp !== timestamp) {						
                
                // TODO check: is this is a safe performance enhancement?
                var info = _jsPlumb.updateOffset({ elId:this.elementId, timestamp:timestamp/*, recalc:recalc*/ });                

                var xy = params.offset ? params.offset.o : info.o;
                if(xy != null) {
                    var ap = params.anchorPoint,connectorPaintStyle = params.connectorPaintStyle;
                    if (ap == null) {
                        var wh = params.dimensions || info.s,                       
                            anchorParams = { xy : [ xy.left, xy.top ], wh : wh, element : this, timestamp : timestamp };
                        if (recalc && this.anchor.isDynamic && this.connections.length > 0) {
                            var c = findConnectionToUseForDynamicAnchor(this, params.elementWithPrecedence),
                                oIdx = c.endpoints[0] == this ? 1 : 0,
                                oId = oIdx === 0 ? c.sourceId : c.targetId,
                                oInfo = _jsPlumb.getCachedData(oId),
                                oOffset = oInfo.o, oWH = oInfo.s;
                            anchorParams.txy = [ oOffset.left, oOffset.top ];
                            anchorParams.twh = oWH;
                            anchorParams.tElement = c.endpoints[oIdx];
                        }
                        ap = this.anchor.compute(anchorParams);
                    }
                                        
                    this.endpoint.compute(ap, this.anchor.getOrientation(this), this._jsPlumb.paintStyleInUse, connectorPaintStyle || this.paintStyleInUse);
                    this.endpoint.paint(this._jsPlumb.paintStyleInUse, this.anchor);					
                    this.timestamp = timestamp;

                    // paint overlays
                    for ( var i = 0; i < this._jsPlumb.overlays.length; i++) {
                        var o = this._jsPlumb.overlays[i];
                        if (o.isVisible()) { 
                            this._jsPlumb.overlayPlacements[i] = o.draw(this.endpoint, this._jsPlumb.paintStyleInUse);
                            o.paint(this._jsPlumb.overlayPlacements[i]);    
                        }
                    }
                }
            }
        };

        this.repaint = this.paint; 

        var draggingInitialised = false;
        this.initDraggable = function() {
            // is this a connection source? we make it draggable and have the
            // drag listener maintain a connection with a floating endpoint.
            if (!draggingInitialised && jpcl.isDragSupported(this.element)) {
                var placeholderInfo = { id:null, element:null },
                    jpc = null,
                    existingJpc = false,
                    existingJpcParams = null,
                    _dragHandler = _makeConnectionDragHandler(placeholderInfo, _jsPlumb);

                var start = function() {    
                // drag might have started on an endpoint that is not actually a source, but which has
                // one or more connections.
                    jpc = this.connectorSelector();
                    var _continue = true;
                    // if not enabled, return
                    if (!this.isEnabled()) _continue = false;
                    // if no connection and we're not a source, return.
                    if (jpc == null && !this.isSource) _continue = false;
                    // otherwise if we're full and not allowed to drag, also return false.
                    if (this.isSource && this.isFull() && !this.dragAllowedWhenFull) _continue = false;
                    // if the connection was setup as not detachable or one of its endpoints
                    // was setup as connectionsDetachable = false, or Defaults.ConnectionsDetachable
                    // is set to false...
                    if (jpc != null && !jpc.isDetachable()) _continue = false;

                    if (_continue === false) {
                        // this is for mootools and yui. returning false from this causes jquery to stop drag.
                        // the events are wrapped in both mootools and yui anyway, but i don't think returning
                        // false from the start callback would stop a drag.
                        if (jpcl.stopDrag) jpcl.stopDrag();
                        _dragHandler.stopDrag();
                        return false;
                    }

                    // clear hover for all connections for this endpoint before continuing.
                    for (var i = 0; i < this.connections.length; i++)
                        this.connections[i].setHover(false);

                    this.addClass("endpointDrag");
                    _jsPlumb.setConnectionBeingDragged(true);

                    // if we're not full but there was a connection, make it null. we'll create a new one.
                    if (jpc && !this.isFull() && this.isSource) jpc = null;

                    _jsPlumb.updateOffset( { elId : this.elementId });
                    inPlaceCopy = this.makeInPlaceCopy();
                    inPlaceCopy.referenceEndpoint = this;
                    inPlaceCopy.paint();                                                                
                    
                    _makeDraggablePlaceholder(placeholderInfo, this.parent, _jsPlumb);
                    
                    // set the offset of this div to be where 'inPlaceCopy' is, to start with.
                    // TODO merge this code with the code in both Anchor and FloatingAnchor, because it
                    // does the same stuff.
                    var ipcoel = _gel(inPlaceCopy.canvas),
                        ipco = jsPlumb.CurrentLibrary.getOffset(ipcoel, _jsPlumb),
                        po = _jsPlumb.adjustForParentOffsetAndScroll([ipco.left, ipco.top], inPlaceCopy.canvas),
                        canvasElement = _gel(this.canvas);                               
                        
                    jpcl.setOffset(placeholderInfo.element, {left:po[0], top:po[1]});                                                           
                    
                    // when using makeSource and a parent, we first draw the source anchor on the source element, then
                    // move it to the parent.  note that this happens after drawing the placeholder for the
                    // first time.
                    if (this.parentAnchor) this.anchor = _jsPlumb.makeAnchor(this.parentAnchor, this.elementId, _jsPlumb);
                    
                    // store the id of the dragging div and the source element. the drop function will pick these up.                   
                    _jsPlumb.setAttribute(this.canvas, "dragId", placeholderInfo.id);
                    _jsPlumb.setAttribute(this.canvas, "elId", this.elementId);

                    this._jsPlumb.floatingEndpoint = _makeFloatingEndpoint(this.getPaintStyle(), this.anchor, this.endpoint, this.canvas, placeholderInfo.element, _jsPlumb, _newEndpoint);
                    // TODO we should not know about DOM here. make the library adapter do this (or the 
                        // dom adapter)
                    this.canvas.style.visibility = "hidden";            
                    
                    if (jpc == null) {                                                                                                                                                         
                        this.anchor.locked = true;
                        this.setHover(false, false);                        
                        // create a connection. one end is this endpoint, the other is a floating endpoint.                    
                        jpc = _newConnection({
                            sourceEndpoint : this,
                            targetEndpoint : this._jsPlumb.floatingEndpoint,
                            source : this.endpointWillMoveTo || this.element,  // for makeSource with parent option.  ensure source element is represented correctly.
                            target : placeholderInfo.element,
                            anchors : [ this.anchor, this._jsPlumb.floatingEndpoint.anchor ],
                            paintStyle : params.connectorStyle, // this can be null. Connection will use the default.
                            hoverPaintStyle:params.connectorHoverStyle,
                            connector : params.connector, // this can also be null. Connection will use the default.
                            overlays : params.connectorOverlays,
                            type:this.connectionType,
                            cssClass:this.connectorClass,
                            hoverClass:this.connectorHoverClass
                        });
                        jpc.pending = true; // mark this connection as not having been established.
                        jpc.addClass(_jsPlumb.draggingClass);
                        this._jsPlumb.floatingEndpoint.addClass(_jsPlumb.draggingClass);
                        // fire an event that informs that a connection is being dragged                        
                        _jsPlumb.fire("connectionDrag", jpc);

                    } else {
                        existingJpc = true;
                        jpc.setHover(false);                        
                        // if existing connection, allow to be dropped back on the source endpoint (issue 51).
                        _initDropTarget(ipcoel, false, true);
                        // new anchor idx
                        var anchorIdx = jpc.endpoints[0].id == this.id ? 0 : 1;
                        jpc.floatingAnchorIndex = anchorIdx;                    // save our anchor index as the connection's floating index.                        
                        this.detachFromConnection(jpc);                         // detach from the connection while dragging is occurring.
                        
                        // store the original scope (issue 57)
                        var dragScope = jsPlumb.CurrentLibrary.getDragScope(canvasElement);
                        _jsPlumb.setAttribute(this.canvas, "originalScope", dragScope);
                        // now we want to get this endpoint's DROP scope, and set it for now: we can only be dropped on drop zones
                        // that have our drop scope (issue 57).
                        var dropScope = jpcl.getDropScope(canvasElement);
                        jpcl.setDragScope(canvasElement, dropScope);

                        // fire an event that informs that a connection is being dragged. we do this before
                        // replacing the original target with the floating element info.
                        _jsPlumb.fire("connectionDrag", jpc);
                
                        // now we replace ourselves with the temporary div we created above:
                        if (anchorIdx === 0) {
                            existingJpcParams = [ jpc.source, jpc.sourceId, canvasElement, dragScope ];
                            jpc.source = placeholderInfo.element;
                            jpc.sourceId = placeholderInfo.id;
                        } else {
                            existingJpcParams = [ jpc.target, jpc.targetId, canvasElement, dragScope ];
                            jpc.target = placeholderInfo.element;
                            jpc.targetId = placeholderInfo.id;
                        }

                        // lock the other endpoint; if it is dynamic it will not move while the drag is occurring.
                        jpc.endpoints[anchorIdx === 0 ? 1 : 0].anchor.locked = true;
                        // store the original endpoint and assign the new floating endpoint for the drag.
                        jpc.suspendedEndpoint = jpc.endpoints[anchorIdx];
                        
                        // PROVIDE THE SUSPENDED ELEMENT, BE IT A SOURCE OR TARGET (ISSUE 39)
                        jpc.suspendedElement = jpc.endpoints[anchorIdx].getElement();
                        jpc.suspendedElementId = jpc.endpoints[anchorIdx].elementId;
                        jpc.suspendedElementType = anchorIdx === 0 ? "source" : "target";
                        
                        jpc.suspendedEndpoint.setHover(false);
                        this._jsPlumb.floatingEndpoint.referenceEndpoint = jpc.suspendedEndpoint;
                        jpc.endpoints[anchorIdx] = this._jsPlumb.floatingEndpoint;

                        jpc.addClass(_jsPlumb.draggingClass);
                        this._jsPlumb.floatingEndpoint.addClass(_jsPlumb.draggingClass);                    

                    }
                    // register it and register connection on it.
                    floatingConnections[placeholderInfo.id] = jpc;
                    _jsPlumb.anchorManager.addFloatingConnection(placeholderInfo.id, jpc);               
                    // only register for the target endpoint; we will not be dragging the source at any time
                    // before this connection is either discarded or made into a permanent connection.
                    _ju.addToList(params.endpointsByElement, placeholderInfo.id, this._jsPlumb.floatingEndpoint);
                    // tell jsplumb about it
                    _jsPlumb.currentlyDragging = true;
                }.bind(this);

                var dragOptions = params.dragOptions || {},
                    defaultOpts = jsPlumb.extend( {}, jpcl.defaultDragOptions),
                    startEvent = jpcl.dragEvents.start,
                    stopEvent = jpcl.dragEvents.stop,
                    dragEvent = jpcl.dragEvents.drag;
                
                dragOptions = jsPlumb.extend(defaultOpts, dragOptions);
                dragOptions.scope = dragOptions.scope || this.scope;
                dragOptions[startEvent] = _ju.wrap(dragOptions[startEvent], start, false);
                // extracted drag handler function so can be used by makeSource
                dragOptions[dragEvent] = _ju.wrap(dragOptions[dragEvent], _dragHandler.drag);
                dragOptions[stopEvent] = _ju.wrap(dragOptions[stopEvent],
                    function() {        

                        _jsPlumb.setConnectionBeingDragged(false);  
                        // if no endpoints, jpc already cleaned up.
                        if (jpc.endpoints != null) {          
                            // get the actual drop event (decode from library args to stop function)
                            var originalEvent = jpcl.getDropEvent(arguments);                                       
                            // unlock the other endpoint (if it is dynamic, it would have been locked at drag start)
                            var idx = jpc.floatingAnchorIndex == null ? 1 : jpc.floatingAnchorIndex;
                            jpc.endpoints[idx === 0 ? 1 : 0].anchor.locked = false;
                            // WHY does this need to happen?  i suppose because the connection might not get 
                            // deleted.  TODO: i dont want to know about css classes inside jsplumb, ideally.
                            jpc.removeClass(_jsPlumb.draggingClass);   
                        
                            // if we have the floating endpoint then the connection has not been dropped
                            // on another endpoint.  If it is a new connection we throw it away. If it is an 
                            // existing connection we check to see if we should reattach it, throwing it away 
                            // if not.
                            if (jpc.endpoints[idx] == this._jsPlumb.floatingEndpoint) {
                                // 6a. if the connection was an existing one...
                                if (existingJpc && jpc.suspendedEndpoint) {
                                    // fix for issue35, thanks Sylvain Gizard: when firing the detach event make sure the
                                    // floating endpoint has been replaced.
                                    if (idx === 0) {
                                        jpc.source = existingJpcParams[0];
                                        jpc.sourceId = existingJpcParams[1];
                                    } else {
                                        jpc.target = existingJpcParams[0];
                                        jpc.targetId = existingJpcParams[1];
                                    }
                                    
                                    // restore the original scope (issue 57)
                                    jpcl.setDragScope(existingJpcParams[2], existingJpcParams[3]);
                                    jpc.endpoints[idx] = jpc.suspendedEndpoint;
                                    // IF the connection should be reattached, or the other endpoint refuses detach, then
                                    // reset the connection to its original state
                                    if (jpc.isReattach() || jpc._forceReattach || jpc._forceDetach || !jpc.endpoints[idx === 0 ? 1 : 0].detach(jpc, false, false, true, originalEvent)) {                                   
                                        jpc.setHover(false);
                                        jpc.floatingAnchorIndex = null;
                                        jpc._forceDetach = null;
                                        jpc._forceReattach = null;
                                        this._jsPlumb.floatingEndpoint.detachFromConnection(jpc);
                                        jpc.suspendedEndpoint.addConnection(jpc);
                                        _jsPlumb.repaint(existingJpcParams[1]);
                                    }
                                }                                                               
                            }
                        }

                        // remove the element associated with the floating endpoint 
                        // (and its associated floating endpoint and visual artefacts)                                        
                        _jsPlumb.remove(placeholderInfo.element, false);
                        // remove the inplace copy
                        _jsPlumb.remove(inPlaceCopy.canvas, false);

                        // makeTargets sets this flag, to tell us we have been replaced and should delete ourself.
                        if (this.deleteAfterDragStop) {                        
                            _jsPlumb.deleteObject({endpoint:this});
                        }
                        else {
                            if (this._jsPlumb) {
                                this._jsPlumb.floatingEndpoint = null;
                                // repaint this endpoint.
                                // make our canvas visible (TODO: hand off to library; we should not know about DOM)
                                this.canvas.style.visibility = "visible";
                                // unlock our anchor
                                this.anchor.locked = false;
                                this.paint({recalc:false});                        
                            }
                        }                                                    

                        // although the connection is no longer valid, there are use cases where this is useful.
                        _jsPlumb.fire("connectionDragStop", jpc, originalEvent);

                        // tell jsplumb that dragging is finished.
                        _jsPlumb.currentlyDragging = false;

                        jpc = null;

                    }.bind(this));
                
                var i = _gel(this.canvas);              
                jpcl.initDraggable(i, dragOptions, true, _jsPlumb);

                draggingInitialised = true;
            }
        };

        // if marked as source or target at create time, init the dragging.
        if (this.isSource || this.isTarget)
            this.initDraggable();        

        // pulled this out into a function so we can reuse it for the inPlaceCopy canvas; you can now drop detached connections
        // back onto the endpoint you detached it from.
        var _initDropTarget = function(canvas, forceInit, isTransient, endpoint) {
            if ((this.isTarget || forceInit) && jpcl.isDropSupported(this.element)) {
                var dropOptions = params.dropOptions || _jsPlumb.Defaults.DropOptions || jsPlumb.Defaults.DropOptions;
                dropOptions = jsPlumb.extend( {}, dropOptions);
                dropOptions.scope = dropOptions.scope || this.scope;
                var dropEvent = jpcl.dragEvents.drop,
                    overEvent = jpcl.dragEvents.over,
                    outEvent = jpcl.dragEvents.out,
                    drop = function() {                        

                        this.removeClass(_jsPlumb.endpointDropAllowedClass);
                        this.removeClass(_jsPlumb.endpointDropForbiddenClass);
                                                    
                        var originalEvent = jpcl.getDropEvent(arguments),
                            draggable = _gel(jpcl.getDragObject(arguments)),
                            id = _jsPlumb.getAttribute(draggable, "dragId"),
                            elId = _jsPlumb.getAttribute(draggable, "elId"),						
                            scope = _jsPlumb.getAttribute(draggable, "originalScope"),
                            jpc = floatingConnections[id];
                            
                        // if this is a drop back where the connection came from, mark it force rettach and
                        // return; the stop handler will reattach. without firing an event.
                        var redrop = jpc.suspendedEndpoint && (jpc.suspendedEndpoint.id == this.id ||
                                        this.referenceEndpoint && jpc.suspendedEndpoint.id == this.referenceEndpoint.id) ;							
                        if (redrop) {								
                            jpc._forceReattach = true;
                            return;
                        }

                        if (jpc != null) {
                            var idx = jpc.floatingAnchorIndex == null ? 1 : jpc.floatingAnchorIndex, oidx = idx === 0 ? 1 : 0;
                            
                            // restore the original scope if necessary (issue 57)						
                            if (scope) jsPlumb.CurrentLibrary.setDragScope(draggable, scope);							
                            
                            var endpointEnabled = endpoint != null ? endpoint.isEnabled() : true;
                            
                            if (this.isFull()) {
                                this.fire("maxConnections", { 
                                    endpoint:this, 
                                    connection:jpc, 
                                    maxConnections:this._jsPlumb.maxConnections 
                                }, originalEvent);
                            }
                                                            
                            if (!this.isFull() && !(idx === 0 && !this.isSource) && !(idx == 1 && !this.isTarget) && endpointEnabled) {
                                var _doContinue = true;

                                // the second check here is for the case that the user is dropping it back
                                // where it came from.
                                if (jpc.suspendedEndpoint && jpc.suspendedEndpoint.id != this.id) {
                                    if (idx === 0) {
                                        jpc.source = jpc.suspendedEndpoint.element;
                                        jpc.sourceId = jpc.suspendedEndpoint.elementId;
                                    } else {
                                        jpc.target = jpc.suspendedEndpoint.element;
                                        jpc.targetId = jpc.suspendedEndpoint.elementId;
                                    }

                                    if (!jpc.isDetachAllowed(jpc) || !jpc.endpoints[idx].isDetachAllowed(jpc) || !jpc.suspendedEndpoint.isDetachAllowed(jpc) || !_jsPlumb.checkCondition("beforeDetach", jpc))
                                        _doContinue = false;								
                                }
            
                                // these have to be set before testing for beforeDrop.
                                if (idx === 0) {
                                    jpc.source = this.element;
                                    jpc.sourceId = this.elementId;
                                } else {
                                    jpc.target = this.element;
                                    jpc.targetId = this.elementId;
                                }
                                                            
// ------------ wrap the execution path in a function so we can support asynchronous beforeDrop																
                                    
                                // we want to execute this regardless.
                                var commonFunction = function() {
                                    jpc.floatingAnchorIndex = null;
                                };	
                                                                                                
                                var continueFunction = function() {
                                    jpc.pending = false;

                                    // remove this jpc from the current endpoint
                                    jpc.endpoints[idx].detachFromConnection(jpc);
                                    if (jpc.suspendedEndpoint) jpc.suspendedEndpoint.detachFromConnection(jpc);
                                    jpc.endpoints[idx] = this;
                                    this.addConnection(jpc);
                                    
                                    // copy our parameters in to the connection:
                                    var params = this.getParameters();
                                    for (var aParam in params)
                                        jpc.setParameter(aParam, params[aParam]);

                                    if (!jpc.suspendedEndpoint) {  
                                        // if not an existing connection and
                                        if (params.draggable)
                                            jsPlumb.CurrentLibrary.initDraggable(this.element, dragOptions, true, _jsPlumb);
                                    }
                                    else {
                                        var suspendedElement = jpc.suspendedEndpoint.getElement(), suspendedElementId = jpc.suspendedEndpoint.elementId;
                                        _fireMoveEvent({
                                            index:idx,
                                            originalSourceId:idx === 0 ? suspendedElementId : jpc.sourceId,
                                            newSourceId:idx === 0 ? this.elementId : jpc.sourceId,
                                            originalTargetId:idx == 1 ? suspendedElementId : jpc.targetId,
                                            newTargetId:idx == 1 ? this.elementId : jpc.targetId,
                                            originalSourceEndpoint:idx === 0 ? jpc.suspendedEndpoint : jpc.endpoints[0],
                                            newSourceEndpoint:idx === 0 ? this : jpc.endpoints[0],
                                            originalTargetEndpoint:idx == 1 ? jpc.suspendedEndpoint : jpc.endpoints[1],
                                            newTargetEndpoint:idx == 1 ? this : jpc.endpoints[1],
                                            connection:jpc
                                        }, originalEvent);
                                       /* var suspendedElement = jpc.suspendedEndpoint.getElement(), suspendedElementId = jpc.suspendedEndpoint.elementId;
                                        // fire a detach event
                                        _fireDetachEvent({
                                            source : idx === 0 ? suspendedElement : jpc.source, 
                                            target : idx == 1 ? suspendedElement : jpc.target,
                                            sourceId : idx === 0 ? suspendedElementId : jpc.sourceId, 
                                            targetId : idx == 1 ? suspendedElementId : jpc.targetId,
                                            sourceEndpoint : idx === 0 ? jpc.suspendedEndpoint : jpc.endpoints[0], 
                                            targetEndpoint : idx == 1 ? jpc.suspendedEndpoint : jpc.endpoints[1],
                                            connection : jpc
                                        }, true, originalEvent);*/
                                    }

                                    // TODO this is like the makeTarget drop code.
                                    if (idx == 1)
                                        _jsPlumb.anchorManager.updateOtherEndpoint(jpc.sourceId, jpc.suspendedElementId, jpc.targetId, jpc);
                                    else                                    
                                        _jsPlumb.anchorManager.sourceChanged(jpc.suspendedEndpoint.elementId, jpc.sourceId, jpc);                                   

                                    // finalise will inform the anchor manager and also add to
                                    // connectionsByScope if necessary.
                                    // TODO if this is not set to true, then dragging a connection's target to a new
                                    // target causes the connection to be forgotten. however if it IS set to true, then
                                    // the opposite happens: dragging by source causes the connection to get forgotten
                                    // about and then if you delete it jsplumb breaks.
                                    _finaliseConnection(jpc, null, originalEvent/*, true*/);
                                    
                                    commonFunction();
                                }.bind(this);
                                
                                var dontContinueFunction = function() {
                                    // otherwise just put it back on the endpoint it was on before the drag.
                                    if (jpc.suspendedEndpoint) {									
                                        jpc.endpoints[idx] = jpc.suspendedEndpoint;
                                        jpc.setHover(false);
                                        jpc._forceDetach = true;
                                        if (idx === 0) {
                                            jpc.source = jpc.suspendedEndpoint.element;
                                            jpc.sourceId = jpc.suspendedEndpoint.elementId;
                                        } else {
                                            jpc.target = jpc.suspendedEndpoint.element;
                                            jpc.targetId = jpc.suspendedEndpoint.elementId;
                                        }
                                        jpc.suspendedEndpoint.addConnection(jpc);

                                        jpc.endpoints[0].repaint();
                                        jpc.repaint();
                                        _jsPlumb.repaint(jpc.sourceId);
                                        jpc._forceDetach = false;
                                    }
                                    
                                    commonFunction();
                                };
                                
// --------------------------------------
                                // now check beforeDrop.  this will be available only on Endpoints that are setup to
                                // have a beforeDrop condition (although, secretly, under the hood all Endpoints and 
                                // the Connection have them, because they are on jsPlumbUIComponent.  shhh!), because
                                // it only makes sense to have it on a target endpoint.
                                _doContinue = _doContinue && this.isDropAllowed(jpc.sourceId, jpc.targetId, jpc.scope, jpc, this);
                                                                                                                    
                                if (_doContinue) {
                                    continueFunction();
                                }
                                else {
                                    dontContinueFunction();
                                }
                            }
                            _jsPlumb.currentlyDragging = false;
                        }
                    }.bind(this);
                
                dropOptions[dropEvent] = _ju.wrap(dropOptions[dropEvent], drop);
                dropOptions[overEvent] = _ju.wrap(dropOptions[overEvent], function() {					
                    var draggable = jpcl.getDragObject(arguments),
                        id = _jsPlumb.getAttribute(draggable, "dragId"),
                        _jpc = floatingConnections[id];
                        
                    if (_jpc != null) {								
                        var idx = _jpc.floatingAnchorIndex == null ? 1 : _jpc.floatingAnchorIndex;
                        // here we should fire the 'over' event if we are a target and this is a new connection,
                        // or we are the same as the floating endpoint.								
                        var _cont = (this.isTarget && _jpc.floatingAnchorIndex !== 0) || (_jpc.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id == _jpc.suspendedEndpoint.id);
                        if (_cont) {
                            var bb = _jsPlumb.checkCondition("checkDropAllowed", { 
                                sourceEndpoint:_jpc.endpoints[idx], 
                                targetEndpoint:this,
                                connection:_jpc
                            }); 
                            this[(bb ? "add" : "remove") + "Class"](_jsPlumb.endpointDropAllowedClass);
                            this[(bb ? "remove" : "add") + "Class"](_jsPlumb.endpointDropForbiddenClass);
                            _jpc.endpoints[idx].anchor.over(this.anchor, this);
                        }
                    }						
                }.bind(this));	

                dropOptions[outEvent] = _ju.wrap(dropOptions[outEvent], function() {					
                    var draggable = jpcl.getDragObject(arguments),
                        id = _jsPlumb.getAttribute( draggable, "dragId"),
                        _jpc = floatingConnections[id];
                        
                    if (_jpc != null) {
                        var idx = _jpc.floatingAnchorIndex == null ? 1 : _jpc.floatingAnchorIndex;
                        var _cont = (this.isTarget && _jpc.floatingAnchorIndex !== 0) || (_jpc.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id == _jpc.suspendedEndpoint.id);
                        if (_cont) {
                            this.removeClass(_jsPlumb.endpointDropAllowedClass);
                            this.removeClass(_jsPlumb.endpointDropForbiddenClass);
                            _jpc.endpoints[idx].anchor.out();
                        }
                    }
                }.bind(this));
                jpcl.initDroppable(canvas, dropOptions, true, isTransient);
            }
        }.bind(this);
        
        // initialise the endpoint's canvas as a drop target.  this will be ignored if the endpoint is not a target or drag is not supported.
        _initDropTarget(_gel(this.canvas), true, !(params._transient || this.anchor.isFloating), this);
        
         // finally, set type if it was provided
         if (params.type)
            this.addType(params.type, params.data, _jsPlumb.isSuspendDrawing());

        return this;        					
    };

    jsPlumbUtil.extend(jsPlumb.Endpoint, OverlayCapableJsPlumbUIComponent, {
        getTypeDescriptor : function() { return "endpoint"; },        
        isVisible : function() { return this._jsPlumb.visible; },
        setVisible : function(v, doNotChangeConnections, doNotNotifyOtherEndpoint) {
            this._jsPlumb.visible = v;
            if (this.canvas) this.canvas.style.display = v ? "block" : "none";
            this[v ? "showOverlays" : "hideOverlays"]();
            if (!doNotChangeConnections) {
                for (var i = 0; i < this.connections.length; i++) {
                    this.connections[i].setVisible(v);
                    if (!doNotNotifyOtherEndpoint) {
                        var oIdx = this === this.connections[i].endpoints[0] ? 1 : 0;
                        // only change the other endpoint if this is its only connection.
                        if (this.connections[i].endpoints[oIdx].connections.length == 1) this.connections[i].endpoints[oIdx].setVisible(v, true, true);
                    }
                }
            }
        },
        getAttachedElements : function() {
            return this.connections;
        },
        applyType : function(t, doNotRepaint) {         
            if (t.maxConnections != null) this._jsPlumb.maxConnections = t.maxConnections;
            if (t.scope) this.scope = t.scope;
            jsPlumbUtil.copyValues(typeParameters, t, this);
            if (t.anchor) {
                this.anchor = this._jsPlumb.instance.makeAnchor(t.anchor);
            }
        },
        isEnabled : function() { return this._jsPlumb.enabled; },
        setEnabled : function(e) { this._jsPlumb.enabled = e; },
        cleanup : function() {            
            jsPlumb.CurrentLibrary.removeClass(this.element, this._jsPlumb.instance.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass);            
            this.anchor = null;
            this.endpoint.cleanup();
            this.endpoint.destroy();
            this.endpoint = null;
            // drag/drop
            var i = jsPlumb.CurrentLibrary.getElementObject(this.canvas);              
            jsPlumb.CurrentLibrary.destroyDraggable(i);
            jsPlumb.CurrentLibrary.destroyDroppable(i);
        },
        setHover : function(h) {
            if (this.endpoint && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged())
                this.endpoint.setHover(h);            
        },
        isFull : function() {
            return !(this.isFloating() || this._jsPlumb.maxConnections < 1 || this.connections.length < this._jsPlumb.maxConnections);              
        },
        getConnectionCost : function() { return this._jsPlumb.connectionCost; },
        setConnectionCost : function(c) {
            this._jsPlumb.connectionCost = c; 
        },
        areConnectionsDirected : function() { return this._jsPlumb.connectionsDirected; },
        setConnectionsDirected : function(b) { this._jsPlumb.connectionsDirected = b; },
        setElementId : function(_elId) {
            this.elementId = _elId;
            this.anchor.elementId = _elId;
        },        
        setReferenceElement : function(_el) {
            this.element = jsPlumb.CurrentLibrary.getDOMElement(_el);
        },
        setDragAllowedWhenFull : function(allowed) {
            this.dragAllowedWhenFull = allowed;
        },
        equals : function(endpoint) {
            return this.anchor.equals(endpoint.anchor);
        },
        getUuid : function() {
            return this._jsPlumb.uuid;
        },
        computeAnchor : function(params) {
            return this.anchor.compute(params);
        }
    });
})();
;(function() {

    var makeConnector = function(_jsPlumb, renderMode, connectorName, connectorArgs) {
            if (!_jsPlumb.Defaults.DoNotThrowErrors && jsPlumb.Connectors[renderMode][connectorName] == null)
                    throw { msg:"jsPlumb: unknown connector type '" + connectorName + "'" };

            return new jsPlumb.Connectors[renderMode][connectorName](connectorArgs);  
        },
        _makeAnchor = function(anchorParams, elementId, _jsPlumb) {
            return (anchorParams) ? _jsPlumb.makeAnchor(anchorParams, elementId, _jsPlumb) : null;
        },
        prepareEndpoint = function(_jsPlumb, _newEndpoint, conn, existing, index, params, element, elementId, connectorPaintStyle, connectorHoverPaintStyle) {
            var e;
            if (existing) {
                conn.endpoints[index] = existing;
                existing.addConnection(conn);                   
            } else {
                if (!params.endpoints) params.endpoints = [ null, null ];
                var ep = params.endpoints[index]  || params.endpoint || _jsPlumb.Defaults.Endpoints[index] || jsPlumb.Defaults.Endpoints[index] || _jsPlumb.Defaults.Endpoint || jsPlumb.Defaults.Endpoint;
                if (!params.endpointStyles) params.endpointStyles = [ null, null ];
                if (!params.endpointHoverStyles) params.endpointHoverStyles = [ null, null ];
                var es = params.endpointStyles[index] || params.endpointStyle || _jsPlumb.Defaults.EndpointStyles[index] || jsPlumb.Defaults.EndpointStyles[index] || _jsPlumb.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle;
                // Endpoints derive their fillStyle from the connector's strokeStyle, if no fillStyle was specified.
                if (es.fillStyle == null && connectorPaintStyle != null)
                    es.fillStyle = connectorPaintStyle.strokeStyle;
                
                // TODO: decide if the endpoint should derive the connection's outline width and color.  currently it does:
                //*
                if (es.outlineColor == null && connectorPaintStyle != null) 
                    es.outlineColor = connectorPaintStyle.outlineColor;
                if (es.outlineWidth == null && connectorPaintStyle != null) 
                    es.outlineWidth = connectorPaintStyle.outlineWidth;
                //*/
                
                var ehs = params.endpointHoverStyles[index] || params.endpointHoverStyle || _jsPlumb.Defaults.EndpointHoverStyles[index] || jsPlumb.Defaults.EndpointHoverStyles[index] || _jsPlumb.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle;
                // endpoint hover fill style is derived from connector's hover stroke style.  TODO: do we want to do this by default? for sure?
                if (connectorHoverPaintStyle != null) {
                    if (ehs == null) ehs = {};
                    if (ehs.fillStyle == null) {
                        ehs.fillStyle = connectorHoverPaintStyle.strokeStyle;
                    }
                }
                var a = params.anchors ? params.anchors[index] : 
                        params.anchor ? params.anchor :
                        _makeAnchor(_jsPlumb.Defaults.Anchors[index], elementId, _jsPlumb) || 
                        _makeAnchor(jsPlumb.Defaults.Anchors[index], elementId,_jsPlumb) || 
                        _makeAnchor(_jsPlumb.Defaults.Anchor, elementId,_jsPlumb) || 
                        _makeAnchor(jsPlumb.Defaults.Anchor, elementId, _jsPlumb),                  
                    u = params.uuids ? params.uuids[index] : null;
                    e = _newEndpoint({ 
                        paintStyle : es,  hoverPaintStyle:ehs,  endpoint : ep,  connections : [ conn ], 
                        uuid : u,  anchor : a,  source : element, scope  : params.scope, container:params.container,
                        reattach:params.reattach || _jsPlumb.Defaults.ReattachConnections,
                        detachable:params.detachable || _jsPlumb.Defaults.ConnectionsDetachable
                    });
                conn.endpoints[index] = e;
                
                if (params.drawEndpoints === false) e.setVisible(false, true, true);
                                    
            }
            return e;
        };
    
    jsPlumb.Connection = function(params) {
        var _newConnection = params.newConnection,
            _newEndpoint = params.newEndpoint,
            jpcl = jsPlumb.CurrentLibrary,
            _att = jpcl.getAttribute,
            _gel = jpcl.getElementObject,
            _dom = jpcl.getDOMElement,
            _ju = jsPlumbUtil,
            _getOffset = jpcl.getOffset;

        this.connector = null;                        
        this.idPrefix = "_jsplumb_c_";
        this.defaultLabelLocation = 0.5;
        this.defaultOverlayKeys = ["Overlays", "ConnectionOverlays"];
        this.parent = params.parent;
        // if a new connection is the result of moving some existing connection, params.previousConnection
        // will have that Connection in it. listeners for the jsPlumbConnection event can look for that
        // member and take action if they need to.
        this.previousConnection = params.previousConnection;
        this.source = _dom(params.source);
        this.target = _dom(params.target);
        // sourceEndpoint and targetEndpoint override source/target, if they are present. but 
        // source is not overridden if the Endpoint has declared it is not the final target of a connection;
        // instead we use the source that the Endpoint declares will be the final source element.
        if (params.sourceEndpoint) this.source = params.sourceEndpoint.endpointWillMoveTo || params.sourceEndpoint.getElement();            
        if (params.targetEndpoint) this.target = params.targetEndpoint.getElement();        

        OverlayCapableJsPlumbUIComponent.apply(this, arguments);

        this.sourceId = this._jsPlumb.instance.getId(this.source);
        this.targetId = this._jsPlumb.instance.getId(this.target);
        this.scope = params.scope; // scope may have been passed in to the connect call. if it wasn't, we will pull it from the source endpoint, after having initialised the endpoints.            
        this.endpoints = [];
        this.endpointStyles = [];
            
        var _jsPlumb = this._jsPlumb.instance;    
        this._jsPlumb.visible = true;
        this._jsPlumb.editable = params.editable === true;    
        this._jsPlumb.params = {
            parent:params.parent,
            cssClass:params.cssClass,
            container:params.container,
            "pointer-events":params["pointer-events"],
            editorParams:params.editorParams
        };   
        this._jsPlumb.lastPaintedAt = null;              
        this.getDefaultType = function() {
            return {
                parameters:{},
                scope:null,
                detachable:this._jsPlumb.instance.Defaults.ConnectionsDetachable,
                rettach:this._jsPlumb.instance.Defaults.ReattachConnections,
                paintStyle:this._jsPlumb.instance.Defaults.PaintStyle || jsPlumb.Defaults.PaintStyle,
                connector:this._jsPlumb.instance.Defaults.Connector || jsPlumb.Defaults.Connector,
                hoverPaintStyle:this._jsPlumb.instance.Defaults.HoverPaintStyle || jsPlumb.Defaults.HoverPaintStyle,				
                overlays:this._jsPlumb.instance.Defaults.ConnectorOverlays || jsPlumb.Defaults.ConnectorOverlays
            };
        };
        
// INITIALISATION CODE			
                            
        // wrapped the main function to return null if no input given. this lets us cascade defaults properly.
        
        var eS = prepareEndpoint(_jsPlumb, _newEndpoint, this, params.sourceEndpoint, 0, params, this.source, this.sourceId, params.paintStyle, params.hoverPaintStyle);			
        if (eS) _ju.addToList(params.endpointsByElement, this.sourceId, eS);						
        var eT = prepareEndpoint(_jsPlumb, _newEndpoint, this, params.targetEndpoint, 1, params, this.target, this.targetId, params.paintStyle, params.hoverPaintStyle);
        if (eT) _ju.addToList(params.endpointsByElement, this.targetId, eT);
        // if scope not set, set it to be the scope for the source endpoint.
        if (!this.scope) this.scope = this.endpoints[0].scope;		
                
        // if explicitly told to (or not to) delete endpoints on detach, override endpoint's preferences
        if (params.deleteEndpointsOnDetach != null) {
            this.endpoints[0]._deleteOnDetach = params.deleteEndpointsOnDetach;
            this.endpoints[1]._deleteOnDetach = params.deleteEndpointsOnDetach;
        }
        else {
            // otherwise, unless the endpoints say otherwise, mark them for deletion.
            if (!this.endpoints[0]._doNotDeleteOnDetach) this.endpoints[0]._deleteOnDetach = true;
            if (!this.endpoints[1]._doNotDeleteOnDetach) this.endpoints[1]._deleteOnDetach = true;
        }   
                    
        // TODO these could surely be refactored into some method that tries them one at a time until something exists
        this.setConnector(this.endpoints[0].connector || 
                          this.endpoints[1].connector || 
                          params.connector || 
                          _jsPlumb.Defaults.Connector || 
                          jsPlumb.Defaults.Connector, true);

        if (params.path)
            this.connector.setPath(params.path);
        
        this.setPaintStyle(this.endpoints[0].connectorStyle || 
                           this.endpoints[1].connectorStyle || 
                           params.paintStyle || 
                           _jsPlumb.Defaults.PaintStyle || 
                           jsPlumb.Defaults.PaintStyle, true);
                    
        this.setHoverPaintStyle(this.endpoints[0].connectorHoverStyle || 
                                this.endpoints[1].connectorHoverStyle || 
                                params.hoverPaintStyle || 
                                _jsPlumb.Defaults.HoverPaintStyle || 
                                jsPlumb.Defaults.HoverPaintStyle, true);
        
        this._jsPlumb.paintStyleInUse = this.getPaintStyle();
        
        var _suspendedAt = _jsPlumb.getSuspendedAt();
        _jsPlumb.updateOffset( { elId : this.sourceId, timestamp:_suspendedAt });
        _jsPlumb.updateOffset( { elId : this.targetId, timestamp:_suspendedAt });

//*
        if(!_jsPlumb.isSuspendDrawing()) {                    
            // paint the endpoints
            var myInfo = _jsPlumb.getCachedData(this.sourceId),
                myOffset = myInfo.o, myWH = myInfo.s,
                otherInfo = _jsPlumb.getCachedData(this.targetId),
                otherOffset = otherInfo.o,
                otherWH = otherInfo.s,
                initialTimestamp = _suspendedAt || _jsPlumb.timestamp(),
                anchorLoc = this.endpoints[0].anchor.compute( {
                    xy : [ myOffset.left, myOffset.top ], wh : myWH, element : this.endpoints[0],
                    elementId:this.endpoints[0].elementId,
                    txy : [ otherOffset.left, otherOffset.top ], twh : otherWH, tElement : this.endpoints[1],
                    timestamp:initialTimestamp
                });

            this.endpoints[0].paint( { anchorLoc : anchorLoc, timestamp:initialTimestamp });

            anchorLoc = this.endpoints[1].anchor.compute( {
                xy : [ otherOffset.left, otherOffset.top ], wh : otherWH, element : this.endpoints[1],
                elementId:this.endpoints[1].elementId,				
                txy : [ myOffset.left, myOffset.top ], twh : myWH, tElement : this.endpoints[0],
                timestamp:initialTimestamp				
            });
            this.endpoints[1].paint({ anchorLoc : anchorLoc, timestamp:initialTimestamp });
        }
        //*/
                                
// END INITIALISATION CODE			
        
// DETACHABLE 				
        this._jsPlumb.detachable = _jsPlumb.Defaults.ConnectionsDetachable;
        if (params.detachable === false) this._jsPlumb.detachable = false;
        if(this.endpoints[0].connectionsDetachable === false) this._jsPlumb.detachable = false;
        if(this.endpoints[1].connectionsDetachable === false) this._jsPlumb.detachable = false;                
// REATTACH
        this._jsPlumb.reattach = params.reattach || this.endpoints[0].reattachConnections || this.endpoints[1].reattachConnections || _jsPlumb.Defaults.ReattachConnections;
// COST + DIRECTIONALITY
        // if cost not supplied, try to inherit from source endpoint
        this._jsPlumb.cost = params.cost || this.endpoints[0].getConnectionCost();			        
        this._jsPlumb.directed = params.directed;
        // inherit directed flag if set no source endpoint
        if (params.directed == null) this._jsPlumb.directed = this.endpoints[0].areConnectionsDirected();        
// END COST + DIRECTIONALITY
                    
// PARAMETERS						
        // merge all the parameters objects into the connection.  parameters set
        // on the connection take precedence; then source endpoint params, then
        // finally target endpoint params.
        // TODO jsPlumb.extend could be made to take more than two args, and it would
        // apply the second through nth args in order.
        var _p = jsPlumb.extend({}, this.endpoints[1].getParameters());
        jsPlumb.extend(_p, this.endpoints[0].getParameters());
        jsPlumb.extend(_p, this.getParameters());
        this.setParameters(_p);
// END PARAMETERS

// PAINTING
                  
        // the very last thing we do is apply types, if there are any.
        var _types = [params.type, this.endpoints[0].connectionType, this.endpoints[1].connectionType ].join(" ");
        if (/[a-zA-Z]/.test(_types))
            this.addType(_types, params.data, true);        

        
// END PAINTING    
    };

    jsPlumbUtil.extend(jsPlumb.Connection, OverlayCapableJsPlumbUIComponent, {
        applyType : function(t, doNotRepaint) {            
            if (t.detachable != null) this.setDetachable(t.detachable);
            if (t.reattach != null) this.setReattach(t.reattach);
            if (t.scope) this.scope = t.scope;
            //editable = t.editable;  // TODO
            this.setConnector(t.connector, doNotRepaint);
        },
        getTypeDescriptor : function() { return "connection"; },
        getAttachedElements : function() {
            return this.endpoints;
        },
        addClass : function(c, informEndpoints) {        
            if (informEndpoints) {
                this.endpoints[0].addClass(c);
                this.endpoints[1].addClass(c); 
                if (this.suspendedEndpoint) this.suspendedEndpoint.addClass(c);                   
            }
            if (this.connector) {
                this.connector.addClass(c);
            }
        },
        removeClass : function(c, informEndpoints) {            
            if (informEndpoints) {
                this.endpoints[0].removeClass(c);
                this.endpoints[1].removeClass(c);                    
                if (this.suspendedEndpoint) this.suspendedEndpoint.removeClass(c);
            }
            if (this.connector) {
                this.connector.removeClass(c);
            }
        },
        isVisible : function() { return this._jsPlumb.visible; },
        setVisible : function(v) {
            this._jsPlumb.visible = v;
            //this[v ? "showOverlays" : "hideOverlays"]();
            if (this.connector) 
                this.connector.setVisible(v);
            this.repaint();
        },

        /* TODO move to connecto editors; it should put these on the prototype.

        setEditable : function(e) {
            if (this.connector && this.connector.isEditable())
                this._jsPlumb.editable = e;
            
            return this._jsPlumb.editable;
        },
        isEditable : function() { return this._jsPlumb.editable; },
        editStarted : function() {  
            this.setSuspendEvents(true);
            this.fire("editStarted", {
                path:this.connector.getPath()
            });            
            this._jsPlumb.instance.setHoverSuspended(true);
        },
        editCompleted : function() {            
            this.fire("editCompleted", {
                path:this.connector.getPath()
            });       
            this.setSuspendEvents(false);
            this.setHover(false);     
            this._jsPlumb.instance.setHoverSuspended(false);
        },
        editCanceled : function() {
            this.fire("editCanceled", {
                path:this.connector.getPath()
            });
            this.setHover(false);
            this._jsPlumb.instance.setHoverSuspended(false);
        },

*/

        cleanup:function() {
            //this.endpointsToDeleteOnDetach = null;
            this.endpoints = null;
            this.source = null;
            this.target = null;                    
            if (this.connector != null) {
                this.connector.cleanup();            
                this.connector.destroy();
            }
            this.connector = null;
        },
        isDetachable : function() {
            return this._jsPlumb.detachable === true;
        },
        setDetachable : function(detachable) {
          this._jsPlumb.detachable = detachable === true;
        },
        isReattach : function() {
            return this._jsPlumb.reattach === true;
        },        
        setReattach : function(reattach) {
          this._jsPlumb.reattach = reattach === true;
        },
        setHover : function(state) {
            if (this.connector && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged()) {
                this.connector.setHover(state);
                jsPlumb.CurrentLibrary[state ? "addClass" : "removeClass"](this.source, this._jsPlumb.instance.hoverSourceClass);
                jsPlumb.CurrentLibrary[state ? "addClass" : "removeClass"](this.target, this._jsPlumb.instance.hoverTargetClass);
            }
        },
        getCost : function() { return this._jsPlumb.cost; },
        setCost : function(c) { this._jsPlumb.cost = c; },
        isDirected : function() { return this._jsPlumb.directed === true; },
        //
        // changes the parent element of this connection to newParent.  not exposed for the public API.
        //
        // TODO ensure moveParent method still works (the overlay stuff in particular)
        moveParent : function(newParent) {
            var jpcl = jsPlumb.CurrentLibrary, curParent = jpcl.getParent(this.connector.canvas);               
            if (this.connector.bgCanvas) {
                jpcl.removeElement(this.connector.bgCanvas);
                jpcl.appendElement(this.connector.bgCanvas, newParent);
            }
            jpcl.removeElement(this.connector.canvas);
            jpcl.appendElement(this.connector.canvas, newParent);                
            // this only applies for DOMOverlays
            for (var i = 0; i < this._jsPlumb.overlays.length; i++) {
                if (this._jsPlumb.overlays[i].isAppendedAtTopLevel) {
                    jpcl.removeElement(this._jsPlumb.overlays[i].canvas);
                    jpcl.appendElement(this._jsPlumb.overlays[i].canvas, newParent);
                    if (this._jsPlumb.overlays[i].reattachListeners) 
                        this._jsPlumb.overlays[i].reattachListeners(this.connector);
                }
            }
            if (this.connector.reattachListeners)       // this is for SVG/VML; change an element's parent and you have to reinit its listeners.
                this.connector.reattachListeners();     // the Canvas implementation doesn't have to care about this
        },
        getConnector : function() { return this.connector; },
        setConnector : function(connectorSpec, doNotRepaint) {
            var _ju = jsPlumbUtil;
            if (this.connector != null) {
                this.connector.cleanup();
                this.connector.destroy();
            }

            var connectorArgs = { 
                    _jsPlumb:this._jsPlumb.instance, 
                    parent:this._jsPlumb.params.parent, 
                    cssClass:this._jsPlumb.params.cssClass, 
                    container:this._jsPlumb.params.container,                 
                    "pointer-events":this._jsPlumb.params["pointer-events"]
                },
                renderMode = this._jsPlumb.instance.getRenderMode();
            
            if (_ju.isString(connectorSpec)) 
                this.connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec, connectorArgs); // lets you use a string as shorthand.
            else if (_ju.isArray(connectorSpec)) {
                if (connectorSpec.length == 1)
                    this.connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec[0], connectorArgs);
                else
                    this.connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec[0], _ju.merge(connectorSpec[1], connectorArgs));
            }
            // binds mouse listeners to the current connector.
            this.bindListeners(this.connector, this, function(state) {                
                this.setHover(state, false);                
            }.bind(this));
            
            this.canvas = this.connector.canvas;

            if (this._jsPlumb.editable && jsPlumb.ConnectorEditors != null && jsPlumb.ConnectorEditors[this.connector.type] && this.connector.isEditable()) {
                new jsPlumb.ConnectorEditors[this.connector.type]({
                    connector:this.connector,
                    connection:this,
                    params:this._jsPlumb.params.editorParams || { }
                });
            }
            else {                    
                this._jsPlumb.editable = false;
            }                
                
            if (!doNotRepaint) this.repaint();
        },
        paint : function(params) {
                    
            if (!this._jsPlumb.instance.isSuspendDrawing() && this._jsPlumb.visible) {
                    
                params = params || {};
                var elId = params.elId, ui = params.ui, recalc = params.recalc, timestamp = params.timestamp,
                    // if the moving object is not the source we must transpose the two references.
                    swap = false,
                    tId = swap ? this.sourceId : this.targetId, sId = swap ? this.targetId : this.sourceId,                    
                    tIdx = swap ? 0 : 1, sIdx = swap ? 1 : 0;

                if (timestamp == null || timestamp != this._jsPlumb.lastPaintedAt) {                        
                    var sourceInfo = this._jsPlumb.instance.updateOffset( { elId : sId, offset : ui, recalc : recalc, timestamp : timestamp }).o,
                        targetInfo = this._jsPlumb.instance.updateOffset( { elId : tId, timestamp : timestamp }).o, // update the target if this is a forced repaint. otherwise, only the source has been moved.
                        sE = this.endpoints[sIdx], tE = this.endpoints[tIdx];

                    if (params.clearEdits) {
                        this._jsPlumb.overlayPositions = null;
                        sE.anchor.clearUserDefinedLocation();
                        tE.anchor.clearUserDefinedLocation();
                        this.connector.setEdited(false);
                    }
                    
                    var sAnchorP = sE.anchor.getCurrentLocation({xy:[sourceInfo.left,sourceInfo.top], wh:[sourceInfo.width, sourceInfo.height], element:sE, timestamp:timestamp}),              
                        tAnchorP = tE.anchor.getCurrentLocation({xy:[targetInfo.left,targetInfo.top], wh:[targetInfo.width, targetInfo.height], element:tE, timestamp:timestamp});                                                 
                        
                    this.connector.resetBounds();

                    this.connector.compute({
                        sourcePos:sAnchorP,
                        targetPos:tAnchorP, 
                        sourceEndpoint:this.endpoints[sIdx],
                        targetEndpoint:this.endpoints[tIdx],
                        lineWidth:this._jsPlumb.paintStyleInUse.lineWidth,                                          
                        sourceInfo:sourceInfo,
                        targetInfo:targetInfo,
                        clearEdits:params.clearEdits === true
                    });                                                                                        

                    var overlayExtents = { minX:Infinity, minY:Infinity, maxX:-Infinity, maxY:-Infinity };
                                        
                    // compute overlays. we do this first so we can get their placements, and adjust the
                    // container if needs be (if an overlay would be clipped)
                    for ( var i = 0; i < this._jsPlumb.overlays.length; i++) {
                        var o = this._jsPlumb.overlays[i];
                        if (o.isVisible()) {                            
                            this._jsPlumb.overlayPlacements[i] = o.draw(this.connector, this._jsPlumb.paintStyleInUse, this.getAbsoluteOverlayPosition(o));
                            overlayExtents.minX = Math.min(overlayExtents.minX, this._jsPlumb.overlayPlacements[i].minX);
                            overlayExtents.maxX = Math.max(overlayExtents.maxX, this._jsPlumb.overlayPlacements[i].maxX);
                            overlayExtents.minY = Math.min(overlayExtents.minY, this._jsPlumb.overlayPlacements[i].minY);
                            overlayExtents.maxY = Math.max(overlayExtents.maxY, this._jsPlumb.overlayPlacements[i].maxY);
                        }
                    }

                    var lineWidth = parseFloat(this._jsPlumb.paintStyleInUse.lineWidth || 1) / 2,
                        outlineWidth = parseFloat(this._jsPlumb.paintStyleInUse.lineWidth || 0),
                        extents = {
                            xmin : Math.min(this.connector.bounds.minX - (lineWidth + outlineWidth), overlayExtents.minX),
                            ymin : Math.min(this.connector.bounds.minY - (lineWidth + outlineWidth), overlayExtents.minY),
                            xmax : Math.max(this.connector.bounds.maxX + (lineWidth + outlineWidth), overlayExtents.maxX),
                            ymax : Math.max(this.connector.bounds.maxY + (lineWidth + outlineWidth), overlayExtents.maxY)
                        };

                    // paint the connector.
                    this.connector.paint(this._jsPlumb.paintStyleInUse, null, extents);  
                    // and then the overlays
                    for ( var j = 0; j < this._jsPlumb.overlays.length; j++) {
                        var p = this._jsPlumb.overlays[j];
                        if (p.isVisible()) {
                            p.paint(this._jsPlumb.overlayPlacements[j], extents);    
                        }
                    }                                                                          
                }
                this._jsPlumb.lastPaintedAt = timestamp;                        
            }       
        },
        /*
         * Function: repaint
         * Repaints the Connection. No parameters exposed to public API.
         */
        repaint : function(params) {
            params = params || {};            
            this.paint({ elId : this.sourceId, recalc : !(params.recalc === false), timestamp:params.timestamp, clearEdits:params.clearEdits });
        }
        
    }); // END Connection class            
})();
/*
 * jsPlumb
 * 
 * Title:jsPlumb 1.5.5
 * 
 * Provides a way to visually connect elements on an HTML page, using either SVG, Canvas
 * elements, or VML.  
 * 
 * This file contains the code for creating and manipulating anchors.
 *
 * Copyright (c) 2010 - 2013 Simon Porritt (simon.porritt@gmail.com)
 * 
 * http://jsplumb.org
 * http://github.com/sporritt/jsplumb
 * http://code.google.com/p/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;(function() {	
    
    //
	// manages anchors for all elements.
	//
	jsPlumb.AnchorManager = function(params) {
		var _amEndpoints = {},
            continuousAnchors = {},
            continuousAnchorLocations = {},
            userDefinedContinuousAnchorLocations = {},        
            continuousAnchorOrientations = {},
            Orientation = { HORIZONTAL : "horizontal", VERTICAL : "vertical", DIAGONAL : "diagonal", IDENTITY:"identity" },
			connectionsByElementId = {},
			self = this,
            anchorLists = {},
            jsPlumbInstance = params.jsPlumbInstance,
            jpcl = jsPlumb.CurrentLibrary,
            floatingConnections = {},
            // TODO this functions uses a crude method of determining orientation between two elements.
            // 'diagonal' should be chosen when the angle of the line between the two centers is around
            // one of 45, 135, 225 and 315 degrees. maybe +- 15 degrees.
            // used by AnchorManager.redraw
            calculateOrientation = function(sourceId, targetId, sd, td, sourceAnchor, targetAnchor) {
        
                if (sourceId === targetId) return {
                    orientation:Orientation.IDENTITY,
                    a:["top", "top"]
                };
        
                var theta = Math.atan2((td.centery - sd.centery) , (td.centerx - sd.centerx)),
                    theta2 = Math.atan2((sd.centery - td.centery) , (sd.centerx - td.centerx)),
                    h = ((sd.left <= td.left && sd.right >= td.left) || (sd.left <= td.right && sd.right >= td.right) ||
                        (sd.left <= td.left && sd.right >= td.right) || (td.left <= sd.left && td.right >= sd.right)),
                    v = ((sd.top <= td.top && sd.bottom >= td.top) || (sd.top <= td.bottom && sd.bottom >= td.bottom) ||
                        (sd.top <= td.top && sd.bottom >= td.bottom) || (td.top <= sd.top && td.bottom >= sd.bottom)),
                    possiblyTranslateEdges = function(edges) {
                        // this function checks to see if either anchor is Continuous, and if so, runs the suggested edge
                        // through the anchor: Continuous anchors can say which faces they support, and they get to choose 
                        // whether a certain face is honoured, or, if not, which face to replace it with. the behaviour when
                        // choosing an alternate face is to try for the opposite face first, then the next one clockwise, and then
                        // the opposite of that one.
                        return [
                            sourceAnchor.isContinuous ? sourceAnchor.verifyEdge(edges[0]) : edges[0],    
                            targetAnchor.isContinuous ? targetAnchor.verifyEdge(edges[1]) : edges[1]
                        ];
                    },
                    out = {
                        orientation:Orientation.DIAGONAL,
                        theta:theta,
                        theta2:theta2
                    };                        
                
                if (! (h || v)) {                    
                    if (td.left > sd.left && td.top > sd.top)
                        out.a = ["right", "top"];
                    else if (td.left > sd.left && sd.top > td.top)
                        out.a = [ "top", "left"];
                    else if (td.left < sd.left && td.top < sd.top)
                        out.a = [ "top", "right"];
                    else if (td.left < sd.left && td.top > sd.top)
                        out.a = ["left", "top" ];                            
                }
                else if (h) {
                    out.orientation = Orientation.HORIZONTAL;
                    out.a = sd.top < td.top ? ["bottom", "top"] : ["top", "bottom"];                    
                }
                else {
                    out.orientation = Orientation.VERTICAL;
                    out.a = sd.left < td.left ? ["right", "left"] : ["left", "right"];
                }
                
                out.a = possiblyTranslateEdges(out.a);
                return out;
            },
                // used by placeAnchors function
            placeAnchorsOnLine = function(desc, elementDimensions, elementPosition,
                            connections, horizontal, otherMultiplier, reverse) {
                var a = [], step = elementDimensions[horizontal ? 0 : 1] / (connections.length + 1);
        
                for (var i = 0; i < connections.length; i++) {
                    var val = (i + 1) * step, other = otherMultiplier * elementDimensions[horizontal ? 1 : 0];
                    if (reverse)
                      val = elementDimensions[horizontal ? 0 : 1] - val;
        
                    var dx = (horizontal ? val : other), x = elementPosition[0] + dx,  xp = dx / elementDimensions[0],
                        dy = (horizontal ? other : val), y = elementPosition[1] + dy, yp = dy / elementDimensions[1];
        
                    a.push([ x, y, xp, yp, connections[i][1], connections[i][2] ]);
                }
        
                return a;
            },
            // used by edgeSortFunctions        
            currySort = function(reverseAngles) {
                return function(a,b) {
                    var r = true;
                    if (reverseAngles) {
                        /*if (a[0][0] < b[0][0])
                            r = true;
                        else
                            r = a[0][1] > b[0][1];*/
                        r = a[0][0] < b[0][0];
                    }
                    else {
                        /*if (a[0][0] > b[0][0])
                            r= true;
                        else
                            r =a[0][1] > b[0][1];
                        */
                        r = a[0][0] > b[0][0];
                    }
                    return r === false ? -1 : 1;
                };
            },
                // used by edgeSortFunctions
            leftSort = function(a,b) {
                // first get adjusted values
                var p1 = a[0][0] < 0 ? -Math.PI - a[0][0] : Math.PI - a[0][0],
                p2 = b[0][0] < 0 ? -Math.PI - b[0][0] : Math.PI - b[0][0];
                if (p1 > p2) return 1;
                else return a[0][1] > b[0][1] ? 1 : -1;
            },
                // used by placeAnchors
            edgeSortFunctions = {
                "top":function(a, b) { return a[0] > b[0] ? 1 : -1; },
                "right":currySort(true),
                "bottom":currySort(true),
                "left":leftSort
            },
                // used by placeAnchors
            _sortHelper = function(_array, _fn) { return _array.sort(_fn); },
                // used by AnchorManager.redraw
            placeAnchors = function(elementId, _anchorLists) {		
                var cd = jsPlumbInstance.getCachedData(elementId), sS = cd.s, sO = cd.o,
                placeSomeAnchors = function(desc, elementDimensions, elementPosition, unsortedConnections, isHorizontal, otherMultiplier, orientation) {
                    if (unsortedConnections.length > 0) {
                        var sc = _sortHelper(unsortedConnections, edgeSortFunctions[desc]), // puts them in order based on the target element's pos on screen
                            reverse = desc === "right" || desc === "top",
                            anchors = placeAnchorsOnLine(desc, elementDimensions,
                                                     elementPosition, sc,
                                                     isHorizontal, otherMultiplier, reverse );
        
                        // takes a computed anchor position and adjusts it for parent offset and scroll, then stores it.
                        var _setAnchorLocation = function(endpoint, anchorPos) {
                            var a = jsPlumbInstance.adjustForParentOffsetAndScroll([anchorPos[0], anchorPos[1]], endpoint.canvas);
                            continuousAnchorLocations[endpoint.id] = [ a[0], a[1], anchorPos[2], anchorPos[3] ];
                            continuousAnchorOrientations[endpoint.id] = orientation;
                        };
        
                        for (var i = 0; i < anchors.length; i++) {
                            var c = anchors[i][4], weAreSource = c.endpoints[0].elementId === elementId, weAreTarget = c.endpoints[1].elementId === elementId;
                            if (weAreSource)
                                _setAnchorLocation(c.endpoints[0], anchors[i]);
                            else if (weAreTarget)
                                _setAnchorLocation(c.endpoints[1], anchors[i]);
                        }
                    }
                };
        
                placeSomeAnchors("bottom", sS, [sO.left,sO.top], _anchorLists.bottom, true, 1, [0,1]);
                placeSomeAnchors("top", sS, [sO.left,sO.top], _anchorLists.top, true, 0, [0,-1]);
                placeSomeAnchors("left", sS, [sO.left,sO.top], _anchorLists.left, false, 0, [-1,0]);
                placeSomeAnchors("right", sS, [sO.left,sO.top], _anchorLists.right, false, 1, [1,0]);
            };

        this.reset = function() {
            _amEndpoints = {};
            connectionsByElementId = {};
            anchorLists = {};
        };			
        this.addFloatingConnection = function(key, conn) {
            floatingConnections[key] = conn;
        };
        this.removeFloatingConnection = function(key) {
            delete floatingConnections[key];
        };                                                 
        this.newConnection = function(conn) {
			var sourceId = conn.sourceId, targetId = conn.targetId,
				ep = conn.endpoints,
                doRegisterTarget = true,
                registerConnection = function(otherIndex, otherEndpoint, otherAnchor, elId, c) {
					if ((sourceId == targetId) && otherAnchor.isContinuous){
                       // remove the target endpoint's canvas.  we dont need it.
                        jpcl.removeElement(ep[1].canvas);
                        doRegisterTarget = false;
                    }
					jsPlumbUtil.addToList(connectionsByElementId, elId, [c, otherEndpoint, otherAnchor.constructor == jsPlumb.DynamicAnchor]);
			    };

			registerConnection(0, ep[0], ep[0].anchor, targetId, conn);
            if (doRegisterTarget)
            	registerConnection(1, ep[1], ep[1].anchor, sourceId, conn);
		};
        var removeEndpointFromAnchorLists = function(endpoint) {
            (function(list, eId) {
                if (list) {  // transient anchors dont get entries in this list.
                    var f = function(e) { return e[4] == eId; };
                    jsPlumbUtil.removeWithFunction(list.top, f);
                    jsPlumbUtil.removeWithFunction(list.left, f);
                    jsPlumbUtil.removeWithFunction(list.bottom, f);
                    jsPlumbUtil.removeWithFunction(list.right, f);
                }
            })(anchorLists[endpoint.elementId], endpoint.id);
        };
		this.connectionDetached = function(connInfo) {
            var connection = connInfo.connection || connInfo,
			    sourceId = connInfo.sourceId,
                targetId = connInfo.targetId,
				ep = connection.endpoints,
				removeConnection = function(otherIndex, otherEndpoint, otherAnchor, elId, c) {
					if (otherAnchor != null && otherAnchor.constructor == jsPlumb.FloatingAnchor) {
						// no-op
					}
					else {
						jsPlumbUtil.removeWithFunction(connectionsByElementId[elId], function(_c) {
							return _c[0].id == c.id;
						});
					}
				};
				
			removeConnection(1, ep[1], ep[1].anchor, sourceId, connection);
			removeConnection(0, ep[0], ep[0].anchor, targetId, connection);

            // remove from anchorLists            
            removeEndpointFromAnchorLists(connection.endpoints[0]);
            removeEndpointFromAnchorLists(connection.endpoints[1]);

            self.redraw(connection.sourceId);
            self.redraw(connection.targetId);
		};
		this.add = function(endpoint, elementId) {
			jsPlumbUtil.addToList(_amEndpoints, elementId, endpoint);
		};
		this.changeId = function(oldId, newId) {
			connectionsByElementId[newId] = connectionsByElementId[oldId];
			_amEndpoints[newId] = _amEndpoints[oldId];
			delete connectionsByElementId[oldId];
			delete _amEndpoints[oldId];	
		};
		this.getConnectionsFor = function(elementId) {
			return connectionsByElementId[elementId] || [];
		};
		this.getEndpointsFor = function(elementId) {
			return _amEndpoints[elementId] || [];
		};
		this.deleteEndpoint = function(endpoint) {
			jsPlumbUtil.removeWithFunction(_amEndpoints[endpoint.elementId], function(e) {
				return e.id == endpoint.id;
			});
            removeEndpointFromAnchorLists(endpoint);
		};
		this.clearFor = function(elementId) {
			delete _amEndpoints[elementId];
			_amEndpoints[elementId] = [];
		};
        // updates the given anchor list by either updating an existing anchor's info, or adding it. this function
        // also removes the anchor from its previous list, if the edge it is on has changed.
        // all connections found along the way (those that are connected to one of the faces this function
        // operates on) are added to the connsToPaint list, as are their endpoints. in this way we know to repaint
        // them wthout having to calculate anything else about them.
        var _updateAnchorList = function(lists, theta, order, conn, aBoolean, otherElId, idx, reverse, edgeId, elId, connsToPaint, endpointsToPaint) {        
            // first try to find the exact match, but keep track of the first index of a matching element id along the way.s
            var exactIdx = -1,
                firstMatchingElIdx = -1,
                endpoint = conn.endpoints[idx],
                endpointId = endpoint.id,
                oIdx = [1,0][idx],
                values = [ [ theta, order ], conn, aBoolean, otherElId, endpointId ],
                listToAddTo = lists[edgeId],
                listToRemoveFrom = endpoint._continuousAnchorEdge ? lists[endpoint._continuousAnchorEdge] : null;

            if (listToRemoveFrom) {
                var rIdx = jsPlumbUtil.findWithFunction(listToRemoveFrom, function(e) { return e[4] == endpointId; });
                if (rIdx != -1) {
                    listToRemoveFrom.splice(rIdx, 1);
                    // get all connections from this list
                    for (var i = 0; i < listToRemoveFrom.length; i++) {
                        jsPlumbUtil.addWithFunction(connsToPaint, listToRemoveFrom[i][1], function(c) { return c.id == listToRemoveFrom[i][1].id; });
                        jsPlumbUtil.addWithFunction(endpointsToPaint, listToRemoveFrom[i][1].endpoints[idx], function(e) { return e.id == listToRemoveFrom[i][1].endpoints[idx].id; });
                        jsPlumbUtil.addWithFunction(endpointsToPaint, listToRemoveFrom[i][1].endpoints[oIdx], function(e) { return e.id == listToRemoveFrom[i][1].endpoints[oIdx].id; });
                    }
                }
            }

            for (i = 0; i < listToAddTo.length; i++) {
                if (params.idx == 1 && listToAddTo[i][3] === otherElId && firstMatchingElIdx == -1)
                    firstMatchingElIdx = i;
                jsPlumbUtil.addWithFunction(connsToPaint, listToAddTo[i][1], function(c) { return c.id == listToAddTo[i][1].id; });                
                jsPlumbUtil.addWithFunction(endpointsToPaint, listToAddTo[i][1].endpoints[idx], function(e) { return e.id == listToAddTo[i][1].endpoints[idx].id; });
                jsPlumbUtil.addWithFunction(endpointsToPaint, listToAddTo[i][1].endpoints[oIdx], function(e) { return e.id == listToAddTo[i][1].endpoints[oIdx].id; });
            }
            if (exactIdx != -1) {
                listToAddTo[exactIdx] = values;
            }
            else {
                var insertIdx = reverse ? firstMatchingElIdx != -1 ? firstMatchingElIdx : 0 : listToAddTo.length; // of course we will get this from having looked through the array shortly.
                listToAddTo.splice(insertIdx, 0, values);
            }

            // store this for next time.
            endpoint._continuousAnchorEdge = edgeId;
        };

        //
        // find the entry in an endpoint's list for this connection and update its target endpoint
        // with the current target in the connection.
        // 
        //
        this.updateOtherEndpoint = function(elId, oldTargetId, newTargetId, connection) {
            var sIndex = jsPlumbUtil.findWithFunction(connectionsByElementId[elId], function(i) {
                    return i[0].id === connection.id;
                }),
                tIndex = jsPlumbUtil.findWithFunction(connectionsByElementId[oldTargetId], function(i) {
                    return i[0].id === connection.id;
                });

            // update or add data for source
            if (sIndex != -1) {
                connectionsByElementId[elId][sIndex][0] = connection;
                connectionsByElementId[elId][sIndex][1] = connection.endpoints[1];
                connectionsByElementId[elId][sIndex][2] = connection.endpoints[1].anchor.constructor == jsPlumb.DynamicAnchor;
            }

            // remove entry for previous target (if there)
            if (tIndex > -1) {

                connectionsByElementId[oldTargetId].splice(tIndex, 1);
                // add entry for new target
                jsPlumbUtil.addToList(connectionsByElementId, newTargetId, [connection, connection.endpoints[0], connection.endpoints[0].anchor.constructor == jsPlumb.DynamicAnchor]);         
            }
        };       
        
        //
        // notification that the connection given has changed source from the originalId to the newId.
        // This involves:
        // 1. removing the connection from the list of connections stored for the originalId
        // 2. updating the source information for the target of the connection
        // 3. re-registering the connection in connectionsByElementId with the newId
        //
        this.sourceChanged = function(originalId, newId, connection) {            
            // remove the entry that points from the old source to the target
            jsPlumbUtil.removeWithFunction(connectionsByElementId[originalId], function(info) {
                return info[0].id === connection.id;
            });
            // find entry for target and update it
            var tIdx = jsPlumbUtil.findWithFunction(connectionsByElementId[connection.targetId], function(i) {
                return i[0].id === connection.id;
            });
            if (tIdx > -1) {
                connectionsByElementId[connection.targetId][tIdx][0] = connection;
                connectionsByElementId[connection.targetId][tIdx][1] = connection.endpoints[0];
                connectionsByElementId[connection.targetId][tIdx][2] = connection.endpoints[0].anchor.constructor == jsPlumb.DynamicAnchor;
            }
            // add entry for new source
            jsPlumbUtil.addToList(connectionsByElementId, newId, [connection, connection.endpoints[1], connection.endpoints[1].anchor.constructor == jsPlumb.DynamicAnchor]);         
        };

        //
        // moves the given endpoint from `currentId` to `element`.
        // This involves:
        //
        // 1. changing the key in _amEndpoints under which the endpoint is stored
        // 2. changing the source or target values in all of the endpoint's connections
        // 3. changing the array in connectionsByElementId in which the endpoint's connections
        //    are stored (done by either sourceChanged or updateOtherEndpoint)
        //
        this.rehomeEndpoint = function(ep, currentId, element) {
            var eps = _amEndpoints[currentId] || [], 
                elementId = jsPlumbInstance.getId(element);
                
            if (elementId !== currentId) {
                var idx = jsPlumbUtil.indexOf(eps, ep);
                if (idx > -1) {
                    var _ep = eps.splice(idx, 1)[0];
                    self.add(_ep, elementId);
                }
            }

            for (var i = 0; i < ep.connections.length; i++) {                
                if (ep.connections[i].sourceId == currentId) {
                    ep.connections[i].sourceId = ep.elementId;
                    ep.connections[i].source = ep.element;                  
                    self.sourceChanged(currentId, ep.elementId, ep.connections[i]);
                }
                else if(ep.connections[i].targetId == currentId) {
                    ep.connections[i].targetId = ep.elementId;
                    ep.connections[i].target = ep.element;   
                    self.updateOtherEndpoint(ep.connections[i].sourceId, currentId, ep.elementId, ep.connections[i]);               
                }
            }   
        };

		this.redraw = function(elementId, ui, timestamp, offsetToUI, clearEdits, doNotRecalcEndpoint) {
		
			if (!jsPlumbInstance.isSuspendDrawing()) {
				// get all the endpoints for this element
				var ep = _amEndpoints[elementId] || [],
					endpointConnections = connectionsByElementId[elementId] || [],
					connectionsToPaint = [],
					endpointsToPaint = [],
	                anchorsToUpdate = [];
	            
				timestamp = timestamp || jsPlumbInstance.timestamp();
				// offsetToUI are values that would have been calculated in the dragManager when registering
				// an endpoint for an element that had a parent (somewhere in the hierarchy) that had been
				// registered as draggable.
				offsetToUI = offsetToUI || {left:0, top:0};
				if (ui) {
					ui = {
						left:ui.left + offsetToUI.left,
						top:ui.top + offsetToUI.top
					};
				}
									
				// valid for one paint cycle.
				var myOffset = jsPlumbInstance.updateOffset( { elId : elementId, offset : ui, recalc : false, timestamp : timestamp }),
	                orientationCache = {};
				
				// actually, first we should compute the orientation of this element to all other elements to which
				// this element is connected with a continuous anchor (whether both ends of the connection have
				// a continuous anchor or just one)
	                        
	            for (var i = 0; i < endpointConnections.length; i++) {
	                var conn = endpointConnections[i][0],
						sourceId = conn.sourceId,
	                    targetId = conn.targetId,
	                    sourceContinuous = conn.endpoints[0].anchor.isContinuous,
	                    targetContinuous = conn.endpoints[1].anchor.isContinuous;
	
	                if (sourceContinuous || targetContinuous) {
		                var oKey = sourceId + "_" + targetId,
		                    oKey2 = targetId + "_" + sourceId,
		                    o = orientationCache[oKey],
		                    oIdx = conn.sourceId == elementId ? 1 : 0;
	
		                if (sourceContinuous && !anchorLists[sourceId]) anchorLists[sourceId] = { top:[], right:[], bottom:[], left:[] };
		                if (targetContinuous && !anchorLists[targetId]) anchorLists[targetId] = { top:[], right:[], bottom:[], left:[] };
	
		                if (elementId != targetId) jsPlumbInstance.updateOffset( { elId : targetId, timestamp : timestamp }); 
		                if (elementId != sourceId) jsPlumbInstance.updateOffset( { elId : sourceId, timestamp : timestamp }); 
	
		                var td = jsPlumbInstance.getCachedData(targetId),
							sd = jsPlumbInstance.getCachedData(sourceId);
	
		                if (targetId == sourceId && (sourceContinuous || targetContinuous)) {
		                    // here we may want to improve this by somehow determining the face we'd like
						    // to put the connector on.  ideally, when drawing, the face should be calculated
						    // by determining which face is closest to the point at which the mouse button
							// was released.  for now, we're putting it on the top face.                            
		                    _updateAnchorList(
                                anchorLists[sourceId], 
                                -Math.PI / 2, 
                                0, 
                                conn, 
                                false, 
                                targetId, 
                                0, false, "top", sourceId, connectionsToPaint, endpointsToPaint);
						}
		                else {
		                    if (!o) {
		                        o = calculateOrientation(sourceId, targetId, sd.o, td.o, conn.endpoints[0].anchor, conn.endpoints[1].anchor);
		                        orientationCache[oKey] = o;
		                        // this would be a performance enhancement, but the computed angles need to be clamped to
		                        //the (-PI/2 -> PI/2) range in order for the sorting to work properly.
		                    /*  orientationCache[oKey2] = {
		                            orientation:o.orientation,
		                            a:[o.a[1], o.a[0]],
		                            theta:o.theta + Math.PI,
		                            theta2:o.theta2 + Math.PI
		                        };*/
		                    }
		                    if (sourceContinuous) _updateAnchorList(anchorLists[sourceId], o.theta, 0, conn, false, targetId, 0, false, o.a[0], sourceId, connectionsToPaint, endpointsToPaint);
		                    if (targetContinuous) _updateAnchorList(anchorLists[targetId], o.theta2, -1, conn, true, sourceId, 1, true, o.a[1], targetId, connectionsToPaint, endpointsToPaint);
		                }
	
		                if (sourceContinuous) jsPlumbUtil.addWithFunction(anchorsToUpdate, sourceId, function(a) { return a === sourceId; });
		                if (targetContinuous) jsPlumbUtil.addWithFunction(anchorsToUpdate, targetId, function(a) { return a === targetId; });
		                jsPlumbUtil.addWithFunction(connectionsToPaint, conn, function(c) { return c.id == conn.id; });
		                if ((sourceContinuous && oIdx === 0) || (targetContinuous && oIdx === 1))
		                	jsPlumbUtil.addWithFunction(endpointsToPaint, conn.endpoints[oIdx], function(e) { return e.id == conn.endpoints[oIdx].id; });
		            }
	            }				
				// place Endpoints whose anchors are continuous but have no Connections
				for (i = 0; i < ep.length; i++) {
					if (ep[i].connections.length === 0 && ep[i].anchor.isContinuous) {
						if (!anchorLists[elementId]) anchorLists[elementId] = { top:[], right:[], bottom:[], left:[] };
						_updateAnchorList(anchorLists[elementId], -Math.PI / 2, 0, {endpoints:[ep[i], ep[i]], paint:function(){}}, false, elementId, 0, false, "top", elementId, connectionsToPaint, endpointsToPaint);
						jsPlumbUtil.addWithFunction(anchorsToUpdate, elementId, function(a) { return a === elementId; });
					}
				}
	            // now place all the continuous anchors we need to;
	            for (i = 0; i < anchorsToUpdate.length; i++) {
					placeAnchors(anchorsToUpdate[i], anchorLists[anchorsToUpdate[i]]);
				}

				// now that continuous anchors have been placed, paint all the endpoints for this element
	            // TODO performance: add the endpoint ids to a temp array, and then when iterating in the next
	            // loop, check that we didn't just paint that endpoint. we can probably shave off a few more milliseconds this way.
				for (i = 0; i < ep.length; i++) {				
                    ep[i].paint( { timestamp : timestamp, offset : myOffset, dimensions : myOffset.s, recalc:doNotRecalcEndpoint !== true });
				}
	            // ... and any other endpoints we came across as a result of the continuous anchors.
	            for (i = 0; i < endpointsToPaint.length; i++) {
                    var cd = jsPlumbInstance.getCachedData(endpointsToPaint[i].elementId);
                    // dont use timestamp for this endpoint, as it is not for the current element and we may 
                    // have needed to recalculate anchor position due to the element for the endpoint moving.
                    //endpointsToPaint[i].paint( { timestamp : null, offset : cd, dimensions : cd.s });

                    endpointsToPaint[i].paint( { timestamp : timestamp, offset : cd, dimensions : cd.s });
				}

				// paint all the standard and "dynamic connections", which are connections whose other anchor is
				// static and therefore does need to be recomputed; we make sure that happens only one time.
	
				// TODO we could have compiled a list of these in the first pass through connections; might save some time.
				for (i = 0; i < endpointConnections.length; i++) {
					var otherEndpoint = endpointConnections[i][1];
					if (otherEndpoint.anchor.constructor == jsPlumb.DynamicAnchor) {			 							
						otherEndpoint.paint({ elementWithPrecedence:elementId, timestamp:timestamp });								
	                    jsPlumbUtil.addWithFunction(connectionsToPaint, endpointConnections[i][0], function(c) { return c.id == endpointConnections[i][0].id; });
						// all the connections for the other endpoint now need to be repainted
						for (var k = 0; k < otherEndpoint.connections.length; k++) {
							if (otherEndpoint.connections[k] !== endpointConnections[i][0])							
	                            jsPlumbUtil.addWithFunction(connectionsToPaint, otherEndpoint.connections[k], function(c) { return c.id == otherEndpoint.connections[k].id; });
						}
					} else if (otherEndpoint.anchor.constructor == jsPlumb.Anchor) {					
	                    jsPlumbUtil.addWithFunction(connectionsToPaint, endpointConnections[i][0], function(c) { return c.id == endpointConnections[i][0].id; });
					}
				}
				// paint current floating connection for this element, if there is one.
				var fc = floatingConnections[elementId];
				if (fc) 
					fc.paint({timestamp:timestamp, recalc:false, elId:elementId});
				                
				// paint all the connections
				for (i = 0; i < connectionsToPaint.length; i++) {
					// if not a connection between the two elements in question dont use the timestamp.
                    var ts  =timestamp;// ((connectionsToPaint[i].sourceId == sourceId && connectionsToPaint[i].targetId == targetId) ||
                               //(connectionsToPaint[i].sourceId == targetId && connectionsToPaint[i].targetId == sourceId)) ? timestamp : null;
                    connectionsToPaint[i].paint({elId:elementId, timestamp:ts, recalc:false, clearEdits:clearEdits});
				}
			}
		};        
        
        var ContinuousAnchor = function(anchorParams) {
            jsPlumbUtil.EventGenerator.apply(this);
            this.type = "Continuous";
            this.isDynamic = true;
            this.isContinuous = true;
            var faces = anchorParams.faces || ["top", "right", "bottom", "left"],
                clockwise = !(anchorParams.clockwise === false),
                availableFaces = { },
                opposites = { "top":"bottom", "right":"left","left":"right","bottom":"top" },
                clockwiseOptions = { "top":"right", "right":"bottom","left":"top","bottom":"left" },
                antiClockwiseOptions = { "top":"left", "right":"top","left":"bottom","bottom":"right" },
                secondBest = clockwise ? clockwiseOptions : antiClockwiseOptions,
                lastChoice = clockwise ? antiClockwiseOptions : clockwiseOptions,
                cssClass = anchorParams.cssClass || "";
            
            for (var i = 0; i < faces.length; i++) { availableFaces[faces[i]] = true; }
          
            // if the given edge is supported, returns it. otherwise looks for a substitute that _is_
            // supported. if none supported we also return the request edge.
            this.verifyEdge = function(edge) {
                if (availableFaces[edge]) return edge;
                else if (availableFaces[opposites[edge]]) return opposites[edge];
                else if (availableFaces[secondBest[edge]]) return secondBest[edge];
                else if (availableFaces[lastChoice[edge]]) return lastChoice[edge];
                return edge; // we have to give them something.
            };
            
            this.compute = function(params) {
                return userDefinedContinuousAnchorLocations[params.element.id] || continuousAnchorLocations[params.element.id] || [0,0];
            };
            this.getCurrentLocation = function(params) {
                return userDefinedContinuousAnchorLocations[params.element.id] || continuousAnchorLocations[params.element.id] || [0,0];
            };
            this.getOrientation = function(endpoint) {
                return continuousAnchorOrientations[endpoint.id] || [0,0];
            };
            this.clearUserDefinedLocation = function() { 
                delete userDefinedContinuousAnchorLocations[anchorParams.elementId]; 
            };
            this.setUserDefinedLocation = function(loc) { 
                userDefinedContinuousAnchorLocations[anchorParams.elementId] = loc; 
            };            
            this.getCssClass = function() { return cssClass; };
            this.setCssClass = function(c) { cssClass = c; };
        };        
        
        // continuous anchors
        jsPlumbInstance.continuousAnchorFactory = {
            get:function(params) {
                var existing = continuousAnchors[params.elementId];
                if (!existing) {
                    existing = new ContinuousAnchor(params);                    
                    continuousAnchors[params.elementId] = existing;
                }
                return existing;
            },
            clear:function(elementId) {
                delete continuousAnchors[elementId];
            }
        };
	};
    
    /**
     * Anchors model a position on some element at which an Endpoint may be located.  They began as a first class citizen of jsPlumb, ie. a user
     * was required to create these themselves, but over time this has been replaced by the concept of referring to them either by name (eg. "TopMiddle"),
     * or by an array describing their coordinates (eg. [ 0, 0.5, 0, -1 ], which is the same as "TopMiddle").  jsPlumb now handles all of the
     * creation of Anchors without user intervention.
     */
    jsPlumb.Anchor = function(params) {       
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.elementId = params.elementId;  
        this.cssClass = params.cssClass || "";      
        this.userDefinedLocation = null;
        this.orientation = params.orientation || [ 0, 0 ];

        jsPlumbUtil.EventGenerator.apply(this);
        
        var jsPlumbInstance = params.jsPlumbInstance;//,
            //lastTimestamp = null;//, lastReturnValue = null;
        
        this.lastReturnValue = null;
        this.offsets = params.offsets || [ 0, 0 ];
        this.timestamp = null;        
        this.compute = function(params) {
            
            var xy = params.xy, wh = params.wh, element = params.element, timestamp = params.timestamp; 

            if(params.clearUserDefinedLocation)
                this.userDefinedLocation = null;
            
            if (timestamp && timestamp === self.timestamp)
                return this.lastReturnValue;        
            
            if (this.userDefinedLocation != null) {
                this.lastReturnValue = this.userDefinedLocation;
            }
            else {                
                
                this.lastReturnValue = [ xy[0] + (this.x * wh[0]) + this.offsets[0], xy[1] + (this.y * wh[1]) + this.offsets[1] ];                    
                // adjust loc if there is an offsetParent
                this.lastReturnValue = jsPlumbInstance.adjustForParentOffsetAndScroll(this.lastReturnValue, element.canvas);
            }
            
            this.timestamp = timestamp;
            return this.lastReturnValue;
        };

        this.getCurrentLocation = function(params) { 
            return (this.lastReturnValue == null || (params.timestamp != null && this.timestamp != params.timestamp)) ? this.compute(params) : this.lastReturnValue; 
        };
    };
    jsPlumbUtil.extend(jsPlumb.Anchor, jsPlumbUtil.EventGenerator, {
        equals : function(anchor) {
            if (!anchor) return false;
            var ao = anchor.getOrientation(),
                o = this.getOrientation();
            return this.x == anchor.x && this.y == anchor.y && this.offsets[0] == anchor.offsets[0] && this.offsets[1] == anchor.offsets[1] && o[0] == ao[0] && o[1] == ao[1];
        },
        getUserDefinedLocation : function() { 
            return this.userDefinedLocation;
        },        
        setUserDefinedLocation : function(l) {
            this.userDefinedLocation = l;
        },
        clearUserDefinedLocation : function() {
            this.userDefinedLocation = null;
        },
        getOrientation : function(_endpoint) { return this.orientation; },
        getCssClass : function() { return this.cssClass; }
    });

    /**
     * An Anchor that floats. its orientation is computed dynamically from
     * its position relative to the anchor it is floating relative to.  It is used when creating 
     * a connection through drag and drop.
     * 
     * TODO FloatingAnchor could totally be refactored to extend Anchor just slightly.
     */
    jsPlumb.FloatingAnchor = function(params) {
        
        jsPlumb.Anchor.apply(this, arguments);

        // this is the anchor that this floating anchor is referenced to for
        // purposes of calculating the orientation.
        var ref = params.reference,
            jpcl = jsPlumb.CurrentLibrary,
            jsPlumbInstance = params.jsPlumbInstance,
            // the canvas this refers to.
            refCanvas = params.referenceCanvas,
            size = jpcl.getSize(jpcl.getElementObject(refCanvas)),
            // these are used to store the current relative position of our
            // anchor wrt the reference anchor. they only indicate
            // direction, so have a value of 1 or -1 (or, very rarely, 0). these
            // values are written by the compute method, and read
            // by the getOrientation method.
            xDir = 0, yDir = 0,
            // temporary member used to store an orientation when the floating
            // anchor is hovering over another anchor.
            orientation = null,
            _lastResult = null;

        // clear from parent. we want floating anchor orientation to always be computed.
        this.orientation = null;

        // set these to 0 each; they are used by certain types of connectors in the loopback case,
        // when the connector is trying to clear the element it is on. but for floating anchor it's not
        // very important.
        this.x = 0; this.y = 0;

        this.isFloating = true;

        this.compute = function(params) {
            var xy = params.xy, element = params.element,
            result = [ xy[0] + (size[0] / 2), xy[1] + (size[1] / 2) ]; // return origin of the element. we may wish to improve this so that any object can be the drag proxy.
                        
            // adjust loc if there is an offsetParent
            result = jsPlumbInstance.adjustForParentOffsetAndScroll(result, element.canvas);
            
            _lastResult = result;
            return result;
        };

        this.getOrientation = function(_endpoint) {
            if (orientation) return orientation;
            else {
                var o = ref.getOrientation(_endpoint);
                // here we take into account the orientation of the other
                // anchor: if it declares zero for some direction, we declare zero too. this might not be the most awesome. perhaps we can come
                // up with a better way. it's just so that the line we draw looks like it makes sense. maybe this wont make sense.
                return [ Math.abs(o[0]) * xDir * -1,
                        Math.abs(o[1]) * yDir * -1 ];
            }
        };

        /**
         * notification the endpoint associated with this anchor is hovering
         * over another anchor; we want to assume that anchor's orientation
         * for the duration of the hover.
         */
        this.over = function(anchor, endpoint) { 
            orientation = anchor.getOrientation(endpoint); 
        };

        /**
         * notification the endpoint associated with this anchor is no
         * longer hovering over another anchor; we should resume calculating
         * orientation as we normally do.
         */
        this.out = function() { orientation = null; };

        this.getCurrentLocation = function(params) { return _lastResult == null ? this.compute(params) : _lastResult; };
    };
    jsPlumbUtil.extend(jsPlumb.FloatingAnchor, jsPlumb.Anchor);

    var _convertAnchor = function(anchor, jsPlumbInstance, elementId) { 
        return anchor.constructor == jsPlumb.Anchor ? anchor: jsPlumbInstance.makeAnchor(anchor, elementId, jsPlumbInstance); 
    };

    /* 
     * A DynamicAnchor is an Anchor that contains a list of other Anchors, which it cycles
     * through at compute time to find the one that is located closest to
     * the center of the target element, and returns that Anchor's compute
     * method result. this causes endpoints to follow each other with
     * respect to the orientation of their target elements, which is a useful
     * feature for some applications.
     * 
     */
    jsPlumb.DynamicAnchor = function(params) {
        jsPlumb.Anchor.apply(this, arguments);
        
        this.isSelective = true;
        this.isDynamic = true;			
        this.anchors = [];
        this.elementId = params.elementId;
        this.jsPlumbInstance = params.jsPlumbInstance;

        for (var i = 0; i < params.anchors.length; i++) 
            this.anchors[i] = _convertAnchor(params.anchors[i], this.jsPlumbInstance, this.elementId);			
        this.addAnchor = function(anchor) { this.anchors.push(_convertAnchor(anchor, this.jsPlumbInstance, this.elementId)); };
        this.getAnchors = function() { return this.anchors; };
        this.locked = false;
        var _curAnchor = this.anchors.length > 0 ? this.anchors[0] : null,
            _curIndex = this.anchors.length > 0 ? 0 : -1,
            _lastAnchor = _curAnchor,
            self = this,
        
            // helper method to calculate the distance between the centers of the two elements.
            _distance = function(anchor, cx, cy, xy, wh) {
                var ax = xy[0] + (anchor.x * wh[0]), ay = xy[1] + (anchor.y * wh[1]),				
                    acx = xy[0] + (wh[0] / 2), acy = xy[1] + (wh[1] / 2);
                return (Math.sqrt(Math.pow(cx - ax, 2) + Math.pow(cy - ay, 2)) +
                        Math.sqrt(Math.pow(acx - ax, 2) + Math.pow(acy - ay, 2)));
            },        
            // default method uses distance between element centers.  you can provide your own method in the dynamic anchor
            // constructor (and also to jsPlumb.makeDynamicAnchor). the arguments to it are four arrays: 
            // xy - xy loc of the anchor's element
            // wh - anchor's element's dimensions
            // txy - xy loc of the element of the other anchor in the connection
            // twh - dimensions of the element of the other anchor in the connection.
            // anchors - the list of selectable anchors
            _anchorSelector = params.selector || function(xy, wh, txy, twh, anchors) {
                var cx = txy[0] + (twh[0] / 2), cy = txy[1] + (twh[1] / 2);
                var minIdx = -1, minDist = Infinity;
                for ( var i = 0; i < anchors.length; i++) {
                    var d = _distance(anchors[i], cx, cy, xy, wh);
                    if (d < minDist) {
                        minIdx = i + 0;
                        minDist = d;
                    }
                }
                return anchors[minIdx];
            };
        
        this.compute = function(params) {				
            var xy = params.xy, wh = params.wh, timestamp = params.timestamp, txy = params.txy, twh = params.twh;				
            
            if(params.clearUserDefinedLocation)
                userDefinedLocation = null;

            this.timestamp = timestamp;            
            
            var udl = self.getUserDefinedLocation();
            if (udl != null) {
                return udl;
            }
            
            // if anchor is locked or an opposite element was not given, we
            // maintain our state. anchor will be locked
            // if it is the source of a drag and drop.
            if (this.locked || txy == null || twh == null)
                return _curAnchor.compute(params);				
            else
                params.timestamp = null; // otherwise clear this, i think. we want the anchor to compute.
            
            _curAnchor = _anchorSelector(xy, wh, txy, twh, this.anchors);
            this.x = _curAnchor.x;
            this.y = _curAnchor.y;        

            if (_curAnchor != _lastAnchor)
                this.fire("anchorChanged", _curAnchor);

            _lastAnchor = _curAnchor;
            
            return _curAnchor.compute(params);
        };

        this.getCurrentLocation = function(params) {
            return this.getUserDefinedLocation() || (_curAnchor != null ? _curAnchor.getCurrentLocation(params) : null);
        };

        this.getOrientation = function(_endpoint) { return _curAnchor != null ? _curAnchor.getOrientation(_endpoint) : [ 0, 0 ]; };
        this.over = function(anchor, endpoint) { if (_curAnchor != null) _curAnchor.over(anchor, endpoint); };
        this.out = function() { if (_curAnchor != null) _curAnchor.out(); };

        this.getCssClass = function() { return (_curAnchor && _curAnchor.getCssClass()) || ""; };
    };    
    jsPlumbUtil.extend(jsPlumb.DynamicAnchor, jsPlumb.Anchor);        
    
// -------- basic anchors ------------------    
    var _curryAnchor = function(x, y, ox, oy, type, fnInit) {
        jsPlumb.Anchors[type] = function(params) {
            var a = params.jsPlumbInstance.makeAnchor([ x, y, ox, oy, 0, 0 ], params.elementId, params.jsPlumbInstance);
            a.type = type;
            if (fnInit) fnInit(a, params);
            return a;
        };
    };
    	
	_curryAnchor(0.5, 0, 0,-1, "TopCenter");
    _curryAnchor(0.5, 1, 0, 1, "BottomCenter");
    _curryAnchor(0, 0.5, -1, 0, "LeftMiddle");
    _curryAnchor(1, 0.5, 1, 0, "RightMiddle");
    // from 1.4.2: Top, Right, Bottom, Left
    _curryAnchor(0.5, 0, 0,-1, "Top");
    _curryAnchor(0.5, 1, 0, 1, "Bottom");
    _curryAnchor(0, 0.5, -1, 0, "Left");
    _curryAnchor(1, 0.5, 1, 0, "Right");
    _curryAnchor(0.5, 0.5, 0, 0, "Center");
    _curryAnchor(1, 0, 0,-1, "TopRight");
    _curryAnchor(1, 1, 0, 1, "BottomRight");
    _curryAnchor(0, 0, 0, -1, "TopLeft");
    _curryAnchor(0, 1, 0, 1, "BottomLeft");
    
// ------- dynamic anchors -------------------    
			
    // default dynamic anchors chooses from Top, Right, Bottom, Left
	jsPlumb.Defaults.DynamicAnchors = function(params) {
		return params.jsPlumbInstance.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], params.elementId, params.jsPlumbInstance);
	};
    
    // default dynamic anchors bound to name 'AutoDefault'
	jsPlumb.Anchors.AutoDefault  = function(params) { 
		var a = params.jsPlumbInstance.makeDynamicAnchor(jsPlumb.Defaults.DynamicAnchors(params));
		a.type = "AutoDefault";
		return a;
	};	
    
// ------- continuous anchors -------------------    
    
    var _curryContinuousAnchor = function(type, faces) {
        jsPlumb.Anchors[type] = function(params) {
            var a = params.jsPlumbInstance.makeAnchor(["Continuous", { faces:faces }], params.elementId, params.jsPlumbInstance);
            a.type = type;
            return a;
        };
    };
    
    jsPlumb.Anchors.Continuous = function(params) {
		return params.jsPlumbInstance.continuousAnchorFactory.get(params);
	};
                
    _curryContinuousAnchor("ContinuousLeft", ["left"]);    
    _curryContinuousAnchor("ContinuousTop", ["top"]);                 
    _curryContinuousAnchor("ContinuousBottom", ["bottom"]);                 
    _curryContinuousAnchor("ContinuousRight", ["right"]); 
    
// ------- position assign anchors -------------------    
    
    // this anchor type lets you assign the position at connection time.
	_curryAnchor(0, 0, 0, 0, "Assign", function(anchor, params) {
		// find what to use as the "position finder". the user may have supplied a String which represents
		// the id of a position finder in jsPlumb.AnchorPositionFinders, or the user may have supplied the
		// position finder as a function.  we find out what to use and then set it on the anchor.
		var pf = params.position || "Fixed";
		anchor.positionFinder = pf.constructor == String ? params.jsPlumbInstance.AnchorPositionFinders[pf] : pf;
		// always set the constructor params; the position finder might need them later (the Grid one does,
		// for example)
		anchor.constructorParams = params;
	});	

    // these are the default anchor positions finders, which are used by the makeTarget function.  supplying
    // a position finder argument to that function allows you to specify where the resulting anchor will
    // be located
	jsPlumbInstance.prototype.AnchorPositionFinders = {
		"Fixed": function(dp, ep, es, params) {
			return [ (dp.left - ep.left) / es[0], (dp.top - ep.top) / es[1] ];	
		},
		"Grid":function(dp, ep, es, params) {
			var dx = dp.left - ep.left, dy = dp.top - ep.top,
				gx = es[0] / (params.grid[0]), gy = es[1] / (params.grid[1]),
				mx = Math.floor(dx / gx), my = Math.floor(dy / gy);
			return [ ((mx * gx) + (gx / 2)) / es[0], ((my * gy) + (gy / 2)) / es[1] ];
		}
	};
    
// ------- perimeter anchors -------------------    
		
	jsPlumb.Anchors.Perimeter = function(params) {
		params = params || {};
		var anchorCount = params.anchorCount || 60,
			shape = params.shape;
		
		if (!shape) throw new Error("no shape supplied to Perimeter Anchor type");		
		
		var _circle = function() {
                var r = 0.5, step = Math.PI * 2 / anchorCount, current = 0, a = [];
                for (var i = 0; i < anchorCount; i++) {
                    var x = r + (r * Math.sin(current)),
                        y = r + (r * Math.cos(current));                                
                    a.push( [ x, y, 0, 0 ] );
                    current += step;
                }
                return a;	
            },
            _path = function(segments) {
                var anchorsPerFace = anchorCount / segments.length, a = [],
                    _computeFace = function(x1, y1, x2, y2, fractionalLength) {
                        anchorsPerFace = anchorCount * fractionalLength;
                        var dx = (x2 - x1) / anchorsPerFace, dy = (y2 - y1) / anchorsPerFace;
                        for (var i = 0; i < anchorsPerFace; i++) {
                            a.push( [
                                x1 + (dx * i),
                                y1 + (dy * i),
                                0,
                                0
                            ]);
                        }
                    };
								
                for (var i = 0; i < segments.length; i++)
                    _computeFace.apply(null, segments[i]);
														
                return a;					
            },
			_shape = function(faces) {												
                var s = [];
                for (var i = 0; i < faces.length; i++) {
                    s.push([faces[i][0], faces[i][1], faces[i][2], faces[i][3], 1 / faces.length]);
                }
                return _path(s);
			},
			_rectangle = function() {
				return _shape([
					[ 0, 0, 1, 0 ], [ 1, 0, 1, 1 ], [ 1, 1, 0, 1 ], [ 0, 1, 0, 0 ]
				]);		
			};
		
		var _shapes = {
			"Circle":_circle,
			"Ellipse":_circle,
			"Diamond":function() {
				return _shape([
						[ 0.5, 0, 1, 0.5 ], [ 1, 0.5, 0.5, 1 ], [ 0.5, 1, 0, 0.5 ], [ 0, 0.5, 0.5, 0 ]
				]);
			},
			"Rectangle":_rectangle,
			"Square":_rectangle,
			"Triangle":function() {
				return _shape([
						[ 0.5, 0, 1, 1 ], [ 1, 1, 0, 1 ], [ 0, 1, 0.5, 0]
				]);	
			},
			"Path":function(params) {
                var points = params.points, p = [], tl = 0;
				for (var i = 0; i < points.length - 1; i++) {
                    var l = Math.sqrt(Math.pow(points[i][2] - points[i][0]) + Math.pow(points[i][3] - points[i][1]));
                    tl += l;
					p.push([points[i][0], points[i][1], points[i+1][0], points[i+1][1], l]);						
				}
                for (var j = 0; j < p.length; j++) {
                    p[j][4] = p[j][4] / tl;
                }
				return _path(p);
			}
		},
        _rotate = function(points, amountInDegrees) {
            var o = [], theta = amountInDegrees / 180 * Math.PI ;
            for (var i = 0; i < points.length; i++) {
                var _x = points[i][0] - 0.5,
                    _y = points[i][1] - 0.5;
                    
                o.push([
                    0.5 + ((_x * Math.cos(theta)) - (_y * Math.sin(theta))),
                    0.5 + ((_x * Math.sin(theta)) + (_y * Math.cos(theta))),
                    points[i][2],
                    points[i][3]
                ]);
            }
            return o;
        };
		
		if (!_shapes[shape]) throw new Error("Shape [" + shape + "] is unknown by Perimeter Anchor type");
		
		var da = _shapes[shape](params);
        if (params.rotation) da = _rotate(da, params.rotation);
        var a = params.jsPlumbInstance.makeDynamicAnchor(da);
		a.type = "Perimeter";
		return a;
	};
})();
/*
 * jsPlumb
 * 
 * Title:jsPlumb 1.5.5
 * 
 * Provides a way to visually connect elements on an HTML page, using either SVG, Canvas
 * elements, or VML.  
 * 
 * This file contains the default Connectors, Endpoint and Overlay definitions.
 *
 * Copyright (c) 2010 - 2013 Simon Porritt (http://jsplumb.org)
 * 
 * http://jsplumb.org
 * http://github.com/sporritt/jsplumb
 * http://code.google.com/p/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */

;(function() {	
				
	/**
	 * 
	 * Helper class to consume unused mouse events by components that are DOM elements and
	 * are used by all of the different rendering modes.
	 * 
	 */
	jsPlumb.DOMElementComponent = jsPlumbUtil.extend(jsPlumb.jsPlumbUIComponent, function(params) {		
		// when render mode is canvas, these functions may be called by the canvas mouse handler.  
		// this component is safe to pipe this stuff to /dev/null.
		this.mousemove = 
		this.dblclick  = 
		this.click = 
		this.mousedown = 
		this.mouseup = function(e) { };					
	});
	
	jsPlumb.Segments = {
        	
        /*
         * Class: AbstractSegment
         * A Connector is made up of 1..N Segments, each of which has a Type, such as 'Straight', 'Arc',
         * 'Bezier'. This is new from 1.4.2, and gives us a lot more flexibility when drawing connections: things such
         * as rounded corners for flowchart connectors, for example, or a straight line stub for Bezier connections, are
         * much easier to do now.
         *
         * A Segment is responsible for providing coordinates for painting it, and also must be able to report its length.
         * 
         */ 
        AbstractSegment : function(params) { 
            this.params = params;
            
            /**
            * Function: findClosestPointOnPath
            * Finds the closest point on this segment to the given [x, y], 
            * returning both the x and y of the point plus its distance from
            * the supplied point, and its location along the length of the
            * path inscribed by the segment.  This implementation returns
            * Infinity for distance and null values for everything else;
            * subclasses are expected to override.
            */
            this.findClosestPointOnPath = function(x, y) {
                return {
                    d:Infinity,
                    x:null,
                    y:null,
                    l:null
                };
            };

            this.getBounds = function() {
                return {
                    minX:Math.min(params.x1, params.x2),
                    minY:Math.min(params.y1, params.y2),
                    maxX:Math.max(params.x1, params.x2),
                    maxY:Math.max(params.y1, params.y2)
                };
            };
        },
        Straight : function(params) {
            var _super = jsPlumb.Segments.AbstractSegment.apply(this, arguments),
                length, m, m2, x1, x2, y1, y2,
                _recalc = function() {
                    length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    m = jsPlumbGeom.gradient({x:x1, y:y1}, {x:x2, y:y2});
                    m2 = -1 / m;                
                };
                
            this.type = "Straight";
            
            this.getLength = function() { return length; };
            this.getGradient = function() { return m; };
                
            this.getCoordinates = function() {
                return { x1:x1,y1:y1,x2:x2,y2:y2 };
            };
            this.setCoordinates = function(coords) {
                x1 = coords.x1; y1 = coords.y1; x2 = coords.x2; y2 = coords.y2;
                _recalc();
            };
            this.setCoordinates({x1:params.x1, y1:params.y1, x2:params.x2, y2:params.y2});

            this.getBounds = function() {
                return {
                    minX:Math.min(x1, x2),
                    minY:Math.min(y1, y2),
                    maxX:Math.max(x1, x2),
                    maxY:Math.max(y1, y2)
                };
            };
            
            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive. for the straight line segment this is simple maths.
             */
             this.pointOnPath = function(location, absolute) {
                if (location === 0 && !absolute)
                    return { x:x1, y:y1 };
                else if (location == 1 && !absolute)
                    return { x:x2, y:y2 };
                else {
                    var l = absolute ? location > 0 ? location : length + location : location * length;
                    return jsPlumbGeom.pointOnLine({x:x1, y:y1}, {x:x2, y:y2}, l);
                }
            };
            
            /**
             * returns the gradient of the segment at the given point - which for us is constant.
             */
            this.gradientAtPoint = function(_) {
                return m;
            };
            
            /**
             * returns the point on the segment's path that is 'distance' along the length of the path from 'location', where 
             * 'location' is a decimal from 0 to 1 inclusive, and 'distance' is a number of pixels.
             * this hands off to jsPlumbUtil to do the maths, supplying two points and the distance.
             */            
            this.pointAlongPathFrom = function(location, distance, absolute) {            
                var p = this.pointOnPath(location, absolute),
                    farAwayPoint = distance <= 0 ? {x:x1, y:y1} : {x:x2, y:y2 };

                /*
                location == 1 ? {
                                        x:x1 + ((x2 - x1) * 10),
                                        y:y1 + ((y1 - y2) * 10)
                                    } : 
                */
    
                if (distance <= 0 && Math.abs(distance) > 1) distance *= -1;
    
                return jsPlumbGeom.pointOnLine(p, farAwayPoint, distance);
            };
            
            // is c between a and b?
            var within = function(a,b,c) {
                return c >= Math.min(a,b) && c <= Math.max(a,b); 
            };
            // find which of a and b is closest to c
            var closest = function(a,b,c) {
                return Math.abs(c - a) < Math.abs(c - b) ? a : b;
            };
            
            /**
                Function: findClosestPointOnPath
                Finds the closest point on this segment to [x,y]. See
                notes on this method in AbstractSegment.
            */
            this.findClosestPointOnPath = function(x, y) {
                var out = {
                    d:Infinity,
                    x:null,
                    y:null,
                    l:null,
                    x1:x1,
                    x2:x2,
                    y1:y1,
                    y2:y2
                };

                if (m === 0) {                  
                    out.y = y1;
                    out.x = within(x1, x2, x) ? x : closest(x1, x2, x);
                }
                else if (m == Infinity || m == -Infinity) {
                    out.x = x1;                
                    out.y = within(y1, y2, y) ? y : closest(y1, y2, y);
                }
                else {
                    // closest point lies on normal from given point to this line.  
                    var b = y1 - (m * x1),
                        b2 = y - (m2 * x),                    
                    // y1 = m.x1 + b and y1 = m2.x1 + b2
                    // so m.x1 + b = m2.x1 + b2
                    // x1(m - m2) = b2 - b
                    // x1 = (b2 - b) / (m - m2)
                        _x1 = (b2 -b) / (m - m2),
                        _y1 = (m * _x1) + b;
                                        
                    out.x = within(x1,x2,_x1) ? _x1 : closest(x1,x2,_x1);//_x1;
                    out.y = within(y1,y2,_y1) ? _y1 : closest(y1,y2,_y1);//_y1;                    
                }

                var fractionInSegment = jsPlumbGeom.lineLength([ out.x, out.y ], [ x1, y1 ]);
                out.d = jsPlumbGeom.lineLength([x,y], [out.x, out.y]);
                out.l = fractionInSegment / length;            
                return out;
            };        
        },
	
        /*
            Arc Segment. You need to supply:
    
            r   -   radius
            cx  -   center x for the arc
            cy  -   center y for the arc
            ac  -   whether the arc is anticlockwise or not. default is clockwise.
    
            and then either:
    
            startAngle  -   startAngle for the arc.
            endAngle    -   endAngle for the arc.
    
            or:
    
            x1          -   x for start point
            y1          -   y for start point
            x2          -   x for end point
            y2          -   y for end point
    
        */
        Arc : function(params) {
            var _super = jsPlumb.Segments.AbstractSegment.apply(this, arguments),
                _calcAngle = function(_x, _y) {
                    return jsPlumbGeom.theta([params.cx, params.cy], [_x, _y]);    
                },
                _calcAngleForLocation = function(segment, location) {
                    if (segment.anticlockwise) {
                        var sa = segment.startAngle < segment.endAngle ? segment.startAngle + TWO_PI : segment.startAngle,
                            s = Math.abs(sa - segment.endAngle);
                        return sa - (s * location);                    
                    }
                    else {
                        var ea = segment.endAngle < segment.startAngle ? segment.endAngle + TWO_PI : segment.endAngle,
                            ss = Math.abs (ea - segment.startAngle);
                    
                        return segment.startAngle + (ss * location);
                    }
                },
                TWO_PI = 2 * Math.PI;
            
            this.radius = params.r;
            this.anticlockwise = params.ac;			
            this.type = "Arc";
                
            if (params.startAngle && params.endAngle) {
                this.startAngle = params.startAngle;
                this.endAngle = params.endAngle;            
                this.x1 = params.cx + (this.radius * Math.cos(params.startAngle));     
                this.y1 = params.cy + (this.radius * Math.sin(params.startAngle));            
                this.x2 = params.cx + (this.radius * Math.cos(params.endAngle));     
                this.y2 = params.cy + (this.radius * Math.sin(params.endAngle));                        
            }
            else {
                this.startAngle = _calcAngle(params.x1, params.y1);
                this.endAngle = _calcAngle(params.x2, params.y2);            
                this.x1 = params.x1;
                this.y1 = params.y1;
                this.x2 = params.x2;
                this.y2 = params.y2;            
            }
            
            if (this.endAngle < 0) this.endAngle += TWO_PI;
            if (this.startAngle < 0) this.startAngle += TWO_PI;   

            // segment is used by vml     
            this.segment = jsPlumbGeom.quadrant([this.x1, this.y1], [this.x2, this.y2]);
            
            // we now have startAngle and endAngle as positive numbers, meaning the
            // absolute difference (|d|) between them is the sweep (s) of this arc, unless the
            // arc is 'anticlockwise' in which case 's' is given by 2PI - |d|.
            
            var ea = this.endAngle < this.startAngle ? this.endAngle + TWO_PI : this.endAngle;
            this.sweep = Math.abs (ea - this.startAngle);
            if (this.anticlockwise) this.sweep = TWO_PI - this.sweep;
            var circumference = 2 * Math.PI * this.radius,
                frac = this.sweep / TWO_PI,
                length = circumference * frac;
            
            this.getLength = function() {
                return length;
            };

            this.getBounds = function() {
                return {
                    minX:params.cx - params.r,
                    maxX:params.cx + params.r,
                    minY:params.cy - params.r,
                    maxY:params.cy + params.r
                };
            };
            
            var VERY_SMALL_VALUE = 0.0000000001,
                gentleRound = function(n) {
                    var f = Math.floor(n), r = Math.ceil(n);
                    if (n - f < VERY_SMALL_VALUE) 
                        return f;    
                    else if (r - n < VERY_SMALL_VALUE)
                        return r;
                    return n;
                };
            
            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive. 
             */
            this.pointOnPath = function(location, absolute) {            
                
                if (location === 0) {
                    return { x:this.x1, y:this.y1, theta:this.startAngle };    
                }
                else if (location == 1) {
                    return { x:this.x2, y:this.y2, theta:this.endAngle };                    
                }
                
                if (absolute) {
                    location = location / length;
                }
    
                var angle = _calcAngleForLocation(this, location),
                    _x = params.cx + (params.r * Math.cos(angle)),
                    _y  = params.cy + (params.r * Math.sin(angle));					
    
                return { x:gentleRound(_x), y:gentleRound(_y), theta:angle };
            };
            
            /**
             * returns the gradient of the segment at the given point.
             */
            this.gradientAtPoint = function(location, absolute) {
                var p = this.pointOnPath(location, absolute);
                var m = jsPlumbGeom.normal( [ params.cx, params.cy ], [p.x, p.y ] );
                if (!this.anticlockwise && (m == Infinity || m == -Infinity)) m *= -1;
                return m;
            };	              
                    
            this.pointAlongPathFrom = function(location, distance, absolute) {
                var p = this.pointOnPath(location, absolute),
                    arcSpan = distance / circumference * 2 * Math.PI,
                    dir = this.anticlockwise ? -1 : 1,
                    startAngle = p.theta + (dir * arcSpan),				
                    startX = params.cx + (this.radius * Math.cos(startAngle)),
                    startY = params.cy + (this.radius * Math.sin(startAngle));	
    
                return {x:startX, y:startY};
            };	            
        },
	
        Bezier : function(params) {
            var _super = jsPlumb.Segments.AbstractSegment.apply(this, arguments),
                curve = [	
                    { x:params.x1, y:params.y1},
                    { x:params.cp1x, y:params.cp1y },
                    { x:params.cp2x, y:params.cp2y },
                    { x:params.x2, y:params.y2 }
                ],
                // although this is not a strictly rigorous determination of bounds
                // of a bezier curve, it works for the types of curves that this segment
                // type produces.
                bounds = {
                    minX:Math.min(params.x1, params.x2, params.cp1x, params.cp2x),
                    minY:Math.min(params.y1, params.y2, params.cp1y, params.cp2y),
                    maxX:Math.max(params.x1, params.x2, params.cp1x, params.cp2x),
                    maxY:Math.max(params.y1, params.y2, params.cp1y, params.cp2y)
                };
                
            this.type = "Bezier";            
            
            var _translateLocation = function(_curve, location, absolute) {
                if (absolute)
                    location = jsBezier.locationAlongCurveFrom(_curve, location > 0 ? 0 : 1, location);
    
                return location;
            };		
            
            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive. 
             */
            this.pointOnPath = function(location, absolute) {
                location = _translateLocation(curve, location, absolute);                
                return jsBezier.pointOnCurve(curve, location);
            };
            
            /**
             * returns the gradient of the segment at the given point.
             */
            this.gradientAtPoint = function(location, absolute) {
                location = _translateLocation(curve, location, absolute);
                return jsBezier.gradientAtPoint(curve, location);        	
            };	              
            
            this.pointAlongPathFrom = function(location, distance, absolute) {
                location = _translateLocation(curve, location, absolute);
                return jsBezier.pointAlongCurveFrom(curve, location, distance);
            };
            
            this.getLength = function() {
                return jsBezier.getLength(curve);				
            };

            this.getBounds = function() {
                return bounds;
            };
        }
    };

    /*
        Class: AbstractComponent
        Superclass for AbstractConnector and AbstractEndpoint.
    */
    var AbstractComponent = function() {        
        this.resetBounds = function() {
            this.bounds = { minX:Infinity, minY:Infinity, maxX:-Infinity, maxY:-Infinity };
        };
        this.resetBounds();        
    };
	
	/*
	 * Class: AbstractConnector
	 * Superclass for all Connectors; here is where Segments are managed.  This is exposed on jsPlumb just so it
	 * can be accessed from other files. You should not try to instantiate one of these directly.
	 *
	 * When this class is asked for a pointOnPath, or gradient etc, it must first figure out which segment to dispatch
	 * that request to. This is done by keeping track of the total connector length as segments are added, and also
	 * their cumulative ratios to the total length.  Then when the right segment is found it is a simple case of dispatching
	 * the request to it (and adjusting 'location' so that it is relative to the beginning of that segment.)
	 */ 
	jsPlumb.Connectors.AbstractConnector = function(params) {
		
        AbstractComponent.apply(this, arguments);        

		var //self = this, 
            segments = [],
            editing = false,
			totalLength = 0,
			segmentProportions = [],
			segmentProportionalLengths = [],        
            stub = params.stub || 0, 
            sourceStub = jsPlumbUtil.isArray(stub) ? stub[0] : stub,
            targetStub = jsPlumbUtil.isArray(stub) ? stub[1] : stub,
            gap = params.gap || 0,
            sourceGap = jsPlumbUtil.isArray(gap) ? gap[0] : gap,
            targetGap = jsPlumbUtil.isArray(gap) ? gap[1] : gap,
            userProvidedSegments = null,
            edited = false,
            paintInfo = null;            
        
        // subclasses should override.
        this.isEditable = function() { return false; };                        
        this.setEdited = function(ed) { edited = ed; };

        // to be overridden by subclasses.
        this.getPath = function() { };
        this.setPath = function(path) { };
        
        /**
        * Function: findSegmentForPoint
        * Returns the segment that is closest to the given [x,y],
        * null if nothing found.  This function returns a JS 
        * object with:
        *
        *   d   -   distance from segment
        *   l   -   proportional location in segment
        *   x   -   x point on the segment
        *   y   -   y point on the segment
        *   s   -   the segment itself.
        */ 
        this.findSegmentForPoint = function(x, y) {
            var out = { d:Infinity, s:null, x:null, y:null, l:null };
            for (var i = 0; i < segments.length; i++) {
                var _s = segments[i].findClosestPointOnPath(x, y);
                if (_s.d < out.d) {
                    out.d = _s.d; 
                    out.l = _s.l; 
                    out.x = _s.x;
                    out.y = _s.y; 
                    out.s = segments[i];
                    out.x1 = _s.x1;
                    out.x2 = _s.x2;
                    out.y1 = _s.y1;
                    out.y2 = _s.y2;
                    out.index = i;
                }
            }
            
            return out;                
        };
			
		var _updateSegmentProportions = function() {
                var curLoc = 0;
                for (var i = 0; i < segments.length; i++) {
                    var sl = segments[i].getLength();
                    segmentProportionalLengths[i] = sl / totalLength;
                    segmentProportions[i] = [curLoc, (curLoc += (sl / totalLength)) ];
                }
            },
		
            /**
             * returns [segment, proportion of travel in segment, segment index] for the segment 
             * that contains the point which is 'location' distance along the entire path, where 
             * 'location' is a decimal between 0 and 1 inclusive. in this connector type, paths 
             * are made up of a list of segments, each of which contributes some fraction to
             * the total length. 
             * From 1.3.10 this also supports the 'absolute' property, which lets us specify a location
             * as the absolute distance in pixels, rather than a proportion of the total path. 
             */
            _findSegmentForLocation = function(location, absolute) {
                if (absolute) {
                    location = location > 0 ? location / totalLength : (totalLength + location) / totalLength;
                }
    
                var idx = segmentProportions.length - 1, inSegmentProportion = 1;
                //if (location < 1) {
                    for (var i = 0; i < segmentProportions.length; i++) {
                        if (segmentProportions[i][1] >= location) {
                            idx = i;
                            // todo is this correct for all connector path types?
                            inSegmentProportion = location == 1 ? 1 : location === 0 ? 0 : (location - segmentProportions[i][0]) / segmentProportionalLengths[i];                    
                            break;
                        }
                    }
                //}
                return { segment:segments[idx], proportion:inSegmentProportion, index:idx };
            },		
            _addSegment = function(conn, type, params) {
                if (params.x1 == params.x2 && params.y1 == params.y2) return;
                var s = new jsPlumb.Segments[type](params);
                segments.push(s);
                totalLength += s.getLength();	
                conn.updateBounds(s);	                                
            },					
            _clearSegments = function() {
                totalLength = 0;
                segments.splice(0, segments.length);
                segmentProportions.splice(0, segmentProportions.length);
                segmentProportionalLengths.splice(0, segmentProportionalLengths.length);
            };
        
        this.setSegments = function(_segs) {
            userProvidedSegments = [];
            totalLength = 0;
            for (var i = 0; i < _segs.length; i++) {      
                userProvidedSegments.push(_segs[i]);
                totalLength += _segs[i].getLength();			            
            }            
        };  
        
        var _prepareCompute = function(params) {
            this.lineWidth = params.lineWidth;
            var segment = jsPlumbGeom.quadrant(params.sourcePos, params.targetPos),
                swapX = params.targetPos[0] < params.sourcePos[0],
                swapY = params.targetPos[1] < params.sourcePos[1],
                lw = params.lineWidth || 1,       
                so = params.sourceEndpoint.anchor.getOrientation(params.sourceEndpoint), 
                to = params.targetEndpoint.anchor.getOrientation(params.targetEndpoint),
                x = swapX ? params.targetPos[0] : params.sourcePos[0], 
                y = swapY ? params.targetPos[1] : params.sourcePos[1],
                w = Math.abs(params.targetPos[0] - params.sourcePos[0]),
                h = Math.abs(params.targetPos[1] - params.sourcePos[1]);
            
            // if either anchor does not have an orientation set, we derive one from their relative
            // positions.  we fix the axis to be the one in which the two elements are further apart, and
            // point each anchor at the other element.  this is also used when dragging a new connection.
            if (so[0] === 0 && so[1] === 0 || to[0] === 0 && to[1] === 0) {
                var index = w > h ? 0 : 1, oIndex = [1,0][index];
                so = []; to = [];
                so[index] = params.sourcePos[index] > params.targetPos[index] ? -1 : 1;
                to[index] = params.sourcePos[index] > params.targetPos[index] ? 1 : -1;
                so[oIndex] = 0; to[oIndex] = 0;
            }                    
            
            var sx = swapX ? w + (sourceGap * so[0])  : sourceGap * so[0], 
                sy = swapY ? h + (sourceGap * so[1])  : sourceGap * so[1], 
                tx = swapX ? targetGap * to[0] : w + (targetGap * to[0]),
                ty = swapY ? targetGap * to[1] : h + (targetGap * to[1]),
                oProduct = ((so[0] * to[0]) + (so[1] * to[1]));        
            
            var result = {
                sx:sx, sy:sy, tx:tx, ty:ty, lw:lw, 
                xSpan:Math.abs(tx - sx),
                ySpan:Math.abs(ty - sy),                
                mx:(sx + tx) / 2,
                my:(sy + ty) / 2,                
                so:so, to:to, x:x, y:y, w:w, h:h,
                segment : segment,
                startStubX : sx + (so[0] * sourceStub), 
                startStubY : sy + (so[1] * sourceStub),
                endStubX : tx + (to[0] * targetStub), 
                endStubY : ty + (to[1] * targetStub),
                isXGreaterThanStubTimes2 : Math.abs(sx - tx) > (sourceStub + targetStub),
                isYGreaterThanStubTimes2 : Math.abs(sy - ty) > (sourceStub + targetStub),
                opposite:oProduct == -1,
                perpendicular:oProduct === 0,
                orthogonal:oProduct == 1,
                sourceAxis : so[0] === 0 ? "y" : "x",
                points:[x, y, w, h, sx, sy, tx, ty ]
            };
            result.anchorOrientation = result.opposite ? "opposite" : result.orthogonal ? "orthogonal" : "perpendicular";
            return result;
        };
		
		this.getSegments = function() { return segments; };

        this.updateBounds = function(segment) {
            var segBounds = segment.getBounds();
            this.bounds.minX = Math.min(this.bounds.minX, segBounds.minX);
            this.bounds.maxX = Math.max(this.bounds.maxX, segBounds.maxX);
            this.bounds.minY = Math.min(this.bounds.minY, segBounds.minY);
            this.bounds.maxY = Math.max(this.bounds.maxY, segBounds.maxY);              
        };
        
        var dumpSegmentsToConsole = function() {
            console.log("SEGMENTS:");
            for (var i = 0; i < segments.length; i++) {
                console.log(segments[i].type, segments[i].getLength(), segmentProportions[i]);
            }
        };
		
		this.pointOnPath = function(location, absolute) {
            var seg = _findSegmentForLocation(location, absolute);      
            return seg.segment && seg.segment.pointOnPath(seg.proportion, absolute) || [0,0];
        };
        
        this.gradientAtPoint = function(location) {
            var seg = _findSegmentForLocation(location, absolute);          
            return seg.segment && seg.segment.gradientAtPoint(seg.proportion, absolute) || 0;
        };
        
        this.pointAlongPathFrom = function(location, distance, absolute) {
            var seg = _findSegmentForLocation(location, absolute);
            // TODO what happens if this crosses to the next segment?
            return seg.segment && seg.segment.pointAlongPathFrom(seg.proportion, distance, false) || [0,0];
        };
		
		this.compute = function(params)  {
            if (!edited)
                paintInfo = _prepareCompute.call(this, params);
            
            _clearSegments();
            this._compute(paintInfo, params);
            this.x = paintInfo.points[0];
            this.y = paintInfo.points[1];
            this.w = paintInfo.points[2];
            this.h = paintInfo.points[3];               
            this.segment = paintInfo.segment;         
            _updateSegmentProportions();            
		};
		
		return {
			addSegment:_addSegment,
            prepareCompute:_prepareCompute,
            sourceStub:sourceStub,
            targetStub:targetStub,
            maxStub:Math.max(sourceStub, targetStub),            
            sourceGap:sourceGap,
            targetGap:targetGap,
            maxGap:Math.max(sourceGap, targetGap)
		};		
	};
    jsPlumbUtil.extend(jsPlumb.Connectors.AbstractConnector, AbstractComponent);
	
    /**
     * Class: Connectors.Straight
     * The Straight connector draws a simple straight line between the two anchor points.  It does not have any constructor parameters.
     */
    var Straight = jsPlumb.Connectors.Straight = function() {
    	this.type = "Straight";
		var _super =  jsPlumb.Connectors.AbstractConnector.apply(this, arguments);		

        this._compute = function(paintInfo, _) {                        
            _super.addSegment(this, "Straight", {x1:paintInfo.sx, y1:paintInfo.sy, x2:paintInfo.startStubX, y2:paintInfo.startStubY});                                                
            _super.addSegment(this, "Straight", {x1:paintInfo.startStubX, y1:paintInfo.startStubY, x2:paintInfo.endStubX, y2:paintInfo.endStubY});                        
            _super.addSegment(this, "Straight", {x1:paintInfo.endStubX, y1:paintInfo.endStubY, x2:paintInfo.tx, y2:paintInfo.ty});                                    
        };                    
    };
    jsPlumbUtil.extend(jsPlumb.Connectors.Straight, jsPlumb.Connectors.AbstractConnector);
    jsPlumb.registerConnectorType(Straight, "Straight");
                    
    /**
     * Class:Connectors.Bezier
     * This Connector draws a Bezier curve with two control points.  You can provide a 'curviness' value which gets applied to jsPlumb's
     * internal voodoo machine and ends up generating locations for the two control points.  See the constructor documentation below.
     */
    /**
     * Function:Constructor
     * 
     * Parameters:
     * 	curviness - How 'curvy' you want the curve to be! This is a directive for the placement of control points, not endpoints of the curve, so your curve does not 
     * actually touch the given point, but it has the tendency to lean towards it.  The larger this value, the greater the curve is pulled from a straight line.
     * Optional; defaults to 150.
     * stub - optional value for a distance to travel from the connector's endpoint before beginning the Bezier curve. defaults to 0.
     * 
     */
    var Bezier = function(params) {
        params = params || {};

    	var _super =  jsPlumb.Connectors.AbstractConnector.apply(this, arguments),
            stub = params.stub || 50,
            majorAnchor = params.curviness || 150,
            minorAnchor = 10;            

        this.type = "Bezier";	
        this.getCurviness = function() { return majorAnchor; };	
        
        this._findControlPoint = function(point, sourceAnchorPosition, targetAnchorPosition, sourceEndpoint, targetEndpoint) {
        	// determine if the two anchors are perpendicular to each other in their orientation.  we swap the control 
        	// points around if so (code could be tightened up)
        	var soo = sourceEndpoint.anchor.getOrientation(sourceEndpoint), 
        		too = targetEndpoint.anchor.getOrientation(targetEndpoint),
        		perpendicular = soo[0] != too[0] || soo[1] == too[1],
            	p = [];                
            	
            if (!perpendicular) {
                if (soo[0] === 0) // X
                    p.push(sourceAnchorPosition[0] < targetAnchorPosition[0] ? point[0] + minorAnchor : point[0] - minorAnchor);
                else p.push(point[0] - (majorAnchor * soo[0]));
                                 
                if (soo[1] === 0) // Y
                	p.push(sourceAnchorPosition[1] < targetAnchorPosition[1] ? point[1] + minorAnchor : point[1] - minorAnchor);
                else p.push(point[1] + (majorAnchor * too[1]));
            }
             else {
                if (too[0] === 0) // X
                	p.push(targetAnchorPosition[0] < sourceAnchorPosition[0] ? point[0] + minorAnchor : point[0] - minorAnchor);
                else p.push(point[0] + (majorAnchor * too[0]));
                
                if (too[1] === 0) // Y
                	p.push(targetAnchorPosition[1] < sourceAnchorPosition[1] ? point[1] + minorAnchor : point[1] - minorAnchor);
                else p.push(point[1] + (majorAnchor * soo[1]));
             }

            return p;                
        };        

        this._compute = function(paintInfo, p) {                                
			var sp = p.sourcePos,
				tp = p.targetPos,				
                _w = Math.abs(sp[0] - tp[0]),
                _h = Math.abs(sp[1] - tp[1]),            
                _sx = sp[0] < tp[0] ? _w : 0,
                _sy = sp[1] < tp[1] ? _h : 0,
                _tx = sp[0] < tp[0] ? 0 : _w,
                _ty = sp[1] < tp[1] ? 0 : _h,
                _CP = this._findControlPoint([_sx, _sy], sp, tp, p.sourceEndpoint, p.targetEndpoint),
                _CP2 = this._findControlPoint([_tx, _ty], tp, sp, p.targetEndpoint, p.sourceEndpoint);

			_super.addSegment(this, "Bezier", {
				x1:_sx, y1:_sy, x2:_tx, y2:_ty,
				cp1x:_CP[0], cp1y:_CP[1], cp2x:_CP2[0], cp2y:_CP2[1]
			});                    
        };               
    };    
    jsPlumbUtil.extend(Bezier, jsPlumb.Connectors.AbstractConnector);
    jsPlumb.registerConnectorType(Bezier, "Bezier");
    
 // ********************************* END OF CONNECTOR TYPES *******************************************************************
    
 // ********************************* ENDPOINT TYPES *******************************************************************
    
    jsPlumb.Endpoints.AbstractEndpoint = function(params) {
        AbstractComponent.apply(this, arguments);
        var compute = this.compute = function(anchorPoint, orientation, endpointStyle, connectorPaintStyle) {    
            var out = this._compute.apply(this, arguments);
            this.x = out[0];
            this.y = out[1];
            this.w = out[2];
            this.h = out[3];
            this.bounds.minX = this.x;
            this.bounds.minY = this.y;
            this.bounds.maxX = this.x + this.w;
            this.bounds.maxY = this.y + this.h;
            return out;
        };
        return {
            compute:compute,
            cssClass:params.cssClass
        };
    };
    jsPlumbUtil.extend(jsPlumb.Endpoints.AbstractEndpoint, AbstractComponent);
    
    /**
     * Class: Endpoints.Dot
     * A round endpoint, with default radius 10 pixels.
     */    	
    	
	/**
	 * Function: Constructor
	 * 
	 * Parameters:
	 * 
	 * 	radius	-	radius of the endpoint.  defaults to 10 pixels.
	 */
	jsPlumb.Endpoints.Dot = function(params) {        
		this.type = "Dot";
		var _super = jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
		params = params || {};				
		this.radius = params.radius || 10;
		this.defaultOffset = 0.5 * this.radius;
		this.defaultInnerRadius = this.radius / 3;			
		
		this._compute = function(anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
			this.radius = endpointStyle.radius || this.radius;
			var	x = anchorPoint[0] - this.radius,
				y = anchorPoint[1] - this.radius,
                w = this.radius * 2,
                h = this.radius * 2;

            if (endpointStyle.strokeStyle) {
                var lw = endpointStyle.lineWidth || 1;
                x -= lw;
                y -= lw;
                w += (lw * 2);
                h += (lw * 2);
            }
			return [ x, y, w, h, this.radius ];
		};
	};
    jsPlumbUtil.extend(jsPlumb.Endpoints.Dot, jsPlumb.Endpoints.AbstractEndpoint);
	
	/**
	 * Class: Endpoints.Rectangle
	 * A Rectangular Endpoint, with default size 20x20.
	 */
	/**
	 * Function: Constructor
	 * 
	 * Parameters:
	 * 
	 * 	width	- width of the endpoint. defaults to 20 pixels.
	 * 	height	- height of the endpoint. defaults to 20 pixels.	
	 */
	jsPlumb.Endpoints.Rectangle = function(params) {
		this.type = "Rectangle";
		var _super = jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
		params = params || {};
		this.width = params.width || 20;
		this.height = params.height || 20;
		
		this._compute = function(anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
			var width = endpointStyle.width || this.width,
				height = endpointStyle.height || this.height,
				x = anchorPoint[0] - (width/2),
				y = anchorPoint[1] - (height/2);
                
			return [ x, y, width, height];
		};
	};
    jsPlumbUtil.extend(jsPlumb.Endpoints.Rectangle, jsPlumb.Endpoints.AbstractEndpoint);
	

    var DOMElementEndpoint = function(params) {
        jsPlumb.DOMElementComponent.apply(this, arguments);        
        this._jsPlumb.displayElements = [  ];                
    };
    jsPlumbUtil.extend(DOMElementEndpoint, jsPlumb.DOMElementComponent, {
       // jsPlumb.Endpoints.AbstractEndpoint
        getDisplayElements : function() { 
            return this._jsPlumb.displayElements; 
        },        
        appendDisplayElement : function(el) {
            this._jsPlumb.displayElements.push(el);
        }
    });

	/**
	 * Class: Endpoints.Image
	 * Draws an image as the Endpoint.
	 */
	/**
	 * Function: Constructor
	 * 
	 * Parameters:
	 * 
	 * 	src	-	location of the image to use.

    TODO: multiple references to self. not sure quite how to get rid of them entirely. perhaps self = null in the cleanup
    function will suffice

    TODO this class still leaks memory.

	 */
	jsPlumb.Endpoints.Image = function(params) {
				
		this.type = "Image";
		DOMElementEndpoint.apply(this, arguments);
        jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
		
		var _onload = params.onload, 
            src = params.src || params.url,
            parent = params.parent,
            clazz = params.cssClass ? " " + params.cssClass : "";

        this._jsPlumb.img = new Image();		
        this._jsPlumb.ready = false;
        this._jsPlumb.initialized = false;
        this._jsPlumb.deleted = false;
        this._jsPlumb.widthToUse = params.width;
        this._jsPlumb.heightToUse = params.height;
        this._jsPlumb.endpoint = params.endpoint;

		this._jsPlumb.img.onload = function() {
            // check we weren't actually discarded before use (in fact mostly happens in tests)
            if (this._jsPlumb != null) {
    			this._jsPlumb.ready = true;            
    			this._jsPlumb.widthToUse = this._jsPlumb.widthToUse || this._jsPlumb.img.width;
    			this._jsPlumb.heightToUse = this._jsPlumb.heightToUse || this._jsPlumb.img.height;
                if (_onload) {
                    _onload(this);
                }
            }
		}.bind(this);        

        /*
            Function: setImage
            Sets the Image to use in this Endpoint.  

            Parameters:
            img         -   may be a URL or an Image object
            onload      -   optional; a callback to execute once the image has loaded.
        */
        this._jsPlumb.endpoint.setImage = function(_img, onload) {
            var s = _img.constructor == String ? _img : _img.src;
            _onload = onload; 
            this._jsPlumb.img.src = s;

            if (this.canvas != null)
                this.canvas.setAttribute("src", this._jsPlumb.img.src);
        }.bind(this);

        this._jsPlumb.endpoint.setImage(src, _onload);
        /*        
            var s = src.constructor == String ? src : src.src;
            //_onload = onload; 
            this._jsPlumb.img.src = src;

            if (this.canvas != null)
                this.canvas.setAttribute("src", this._jsPlumb.img.src);
       // }.bind(this);

        //this._jsPlumb.endpoint.setImage(src, _onload);*/

		this._compute = function(anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
			this.anchorPoint = anchorPoint;
			if (this._jsPlumb.ready) return [anchorPoint[0] - this._jsPlumb.widthToUse / 2, anchorPoint[1] - this._jsPlumb.heightToUse / 2, 
									this._jsPlumb.widthToUse, this._jsPlumb.heightToUse];
			else return [0,0,0,0];
		};
		
		this.canvas = document.createElement("img");
		this.canvas.style.margin = 0;
		this.canvas.style.padding = 0;
		this.canvas.style.outline = 0;
		this.canvas.style.position = "absolute";		
		this.canvas.className = this._jsPlumb.instance.endpointClass + clazz;
		if (this._jsPlumb.widthToUse) this.canvas.setAttribute("width", this._jsPlumb.widthToUse);
		if (this._jsPlumb.heightToUse) this.canvas.setAttribute("height", this._jsPlumb.heightToUse);		
		this._jsPlumb.instance.appendElement(this.canvas, parent);
		this.attachListeners(this.canvas, this);		
		
		this.actuallyPaint = function(d, style, anchor) {
			if (!this._jsPlumb.deleted) {
				if (!this._jsPlumb.initialized) {
					this.canvas.setAttribute("src", this._jsPlumb.img.src);
					this.appendDisplayElement(this.canvas);
					this._jsPlumb.initialized = true;
				}
				var x = this.anchorPoint[0] - (this._jsPlumb.widthToUse / 2),
					y = this.anchorPoint[1] - (this._jsPlumb.heightToUse / 2);
				jsPlumbUtil.sizeElement(this.canvas, x, y, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse);
			}
		};
		
		this.paint = function(style, anchor) {
            if (this._jsPlumb != null) {  // may have been deleted
    			if (this._jsPlumb.ready) {
        			this.actuallyPaint(style, anchor);
    			}
    			else { 
    				window.setTimeout(function() {    					
    					this.paint(style, anchor);
    				}.bind(this), 200);
    			}
            }
		};				
	};
    jsPlumbUtil.extend(jsPlumb.Endpoints.Image, [ DOMElementEndpoint, jsPlumb.Endpoints.AbstractEndpoint ], {
        cleanup : function() {            
            this._jsPlumb.deleted = true;
            jsPlumbUtil.removeElement(this.canvas);
            this.canvas = null;
        } 
    });
	
	/*
	 * Class: Endpoints.Blank
	 * An Endpoint that paints nothing (visible) on the screen.  Supports cssClass and hoverClass parameters like all Endpoints.
	 */
	jsPlumb.Endpoints.Blank = function(params) {
		var _super = jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
		this.type = "Blank";
		DOMElementEndpoint.apply(this, arguments);		
		this._compute = function(anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
			return [anchorPoint[0], anchorPoint[1],10,0];
		};
		
		this.canvas = document.createElement("div");
		this.canvas.style.display = "block";
		this.canvas.style.width = "1px";
		this.canvas.style.height = "1px";
		this.canvas.style.background = "transparent";
		this.canvas.style.position = "absolute";
		this.canvas.className = this._jsPlumb.endpointClass;
		jsPlumb.appendElement(this.canvas, params.parent);
		
		this.paint = function(style, anchor) {
			jsPlumbUtil.sizeElement(this.canvas, this.x, this.y, this.w, this.h);	
		};
	};
    jsPlumbUtil.extend(jsPlumb.Endpoints.Blank, [jsPlumb.Endpoints.AbstractEndpoint, DOMElementEndpoint], {
        cleanup:function() {
            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
        }
    });
	
	/*
	 * Class: Endpoints.Triangle
	 * A triangular Endpoint.  
	 */
	/*
	 * Function: Constructor
	 * 
	 * Parameters:
	 * 
	 * 	width	-	width of the triangle's base.  defaults to 55 pixels.
	 * 	height	-	height of the triangle from base to apex.  defaults to 55 pixels.
	 */
	jsPlumb.Endpoints.Triangle = function(params) {        
		this.type = "Triangle";
        var _super = jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
		params = params || {  };
		params.width = params.width || 55;
		params.height = params.height || 55;
		this.width = params.width;
		this.height = params.height;
		this._compute = function(anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
			var width = endpointStyle.width || self.width,
			height = endpointStyle.height || self.height,
			x = anchorPoint[0] - (width/2),
			y = anchorPoint[1] - (height/2);
			return [ x, y, width, height ];
		};
	};
// ********************************* END OF ENDPOINT TYPES *******************************************************************
	

// ********************************* OVERLAY DEFINITIONS ***********************************************************************    

	var AbstractOverlay = jsPlumb.Overlays.AbstractOverlay = function(params) {
		this.visible = true;
        this.isAppendedAtTopLevel = true;
		this.component = params.component;
		this.loc = params.location == null ? 0.5 : params.location;
        this.endpointLoc = params.endpointLocation == null ? [ 0.5, 0.5] : params.endpointLocation;		
	};
    AbstractOverlay.prototype = {
        cleanup:function() {  
           this.component = null;
           this.canvas = null;
           this.endpointLoc = null;
        },
        setVisible : function(val) { 
            this.visible = val;
            // TODO this is only actually necessary for canvas. so, the Canvas overlay should
            // override setVisible and call this.
            //this.component.repaint();
        },
        isVisible : function() { return this.visible; },
        hide : function() { this.setVisible(false); },
        show : function() { this.setVisible(true); },        
        incrementLocation : function(amount) {
            this.loc += amount;
            this.component.repaint();
        },
        setLocation : function(l) {
            this.loc = l;
            this.component.repaint();
        },
        getLocation : function() {
            return this.loc;
        }
    };
	
	
	/*
	 * Class: Overlays.Arrow
	 * 
	 * An arrow overlay, defined by four points: the head, the two sides of the tail, and a 'foldback' point at some distance along the length
	 * of the arrow that lines from each tail point converge into.  The foldback point is defined using a decimal that indicates some fraction
	 * of the length of the arrow and has a default value of 0.623.  A foldback point value of 1 would mean that the arrow had a straight line
	 * across the tail.  
	 */
	/*
	 * Function: Constructor
	 * 
	 * Parameters:
	 * 
	 * 	length - distance in pixels from head to tail baseline. default 20.
	 * 	width - width in pixels of the tail baseline. default 20.
	 * 	fillStyle - style to use when filling the arrow.  defaults to "black".
	 * 	strokeStyle - style to use when stroking the arrow. defaults to null, which means the arrow is not stroked.
	 * 	lineWidth - line width to use when stroking the arrow. defaults to 1, but only used if strokeStyle is not null.
	 * 	foldback - distance (as a decimal from 0 to 1 inclusive) along the length of the arrow marking the point the tail points should fold back to.  defaults to 0.623.
	 * 	location - distance (as a decimal from 0 to 1 inclusive) marking where the arrow should sit on the connector. defaults to 0.5.
	 * 	direction - indicates the direction the arrow points in. valid values are -1 and 1; 1 is default.
	 */
	jsPlumb.Overlays.Arrow = function(params) {
		this.type = "Arrow";
		AbstractOverlay.apply(this, arguments);
        this.isAppendedAtTopLevel = false;
		params = params || {};
		var _ju = jsPlumbUtil, _jg = jsPlumbGeom;
		
    	this.length = params.length || 20;
    	this.width = params.width || 20;
    	this.id = params.id;
    	var direction = (params.direction || 1) < 0 ? -1 : 1,
    	    paintStyle = params.paintStyle || { lineWidth:1 },
    	    // how far along the arrow the lines folding back in come to. default is 62.3%.
    	    foldback = params.foldback || 0.623;
    	    	
    	this.computeMaxSize = function() { return self.width * 1.5; };    	
    	//this.cleanup = function() { };  // nothing to clean up for Arrows    
    	this.draw = function(component, currentConnectionPaintStyle) {

            var hxy, mid, txy, tail, cxy;
            if (component.pointAlongPathFrom) {

                if (_ju.isString(this.loc) || this.loc > 1 || this.loc < 0) {                    
                    var l = parseInt(this.loc, 10),
                        fromLoc = this.loc < 0 ? 1 : 0;
                    hxy = component.pointAlongPathFrom(fromLoc, l, false);
                    mid = component.pointAlongPathFrom(fromLoc, l - (direction * this.length / 2), false);
                    txy = _jg.pointOnLine(hxy, mid, this.length);
                }
                else if (this.loc == 1) {                
					hxy = component.pointOnPath(this.loc);					           
                    mid = component.pointAlongPathFrom(this.loc, -(this.length));
					txy = _jg.pointOnLine(hxy, mid, this.length);
					
					if (direction == -1) {
						var _ = txy;
						txy = hxy;
						hxy = _;
					}
                }
                else if (this.loc === 0) {					                    
					txy = component.pointOnPath(this.loc);                    
					mid = component.pointAlongPathFrom(this.loc, this.length);                    
					hxy = _jg.pointOnLine(txy, mid, this.length);                    
					if (direction == -1) {
						var __ = txy;
						txy = hxy;
						hxy = __;
					}
                }
                else {                    
    			    hxy = component.pointAlongPathFrom(this.loc, direction * this.length / 2);
                    mid = component.pointOnPath(this.loc);
                    txy = _jg.pointOnLine(hxy, mid, this.length);
                }

                tail = _jg.perpendicularLineTo(hxy, txy, this.width);
                cxy = _jg.pointOnLine(hxy, txy, foldback * this.length);    			
    			
    			var d = { hxy:hxy, tail:tail, cxy:cxy },
    			    strokeStyle = paintStyle.strokeStyle || currentConnectionPaintStyle.strokeStyle,
    			    fillStyle = paintStyle.fillStyle || currentConnectionPaintStyle.strokeStyle,
    			    lineWidth = paintStyle.lineWidth || currentConnectionPaintStyle.lineWidth,
                    info = {
                        component:component, 
                        d:d, 
                        lineWidth:lineWidth, 
                        strokeStyle:strokeStyle, 
                        fillStyle:fillStyle,
                        minX:Math.min(hxy.x, tail[0].x, tail[1].x),
                        maxX:Math.max(hxy.x, tail[0].x, tail[1].x),
                        minY:Math.min(hxy.y, tail[0].y, tail[1].y),
                        maxY:Math.max(hxy.y, tail[0].y, tail[1].y)
                    };    			
						    
                return info;
            }
            else return {component:component, minX:0,maxX:0,minY:0,maxY:0};
    	};
    };    
    jsPlumbUtil.extend(jsPlumb.Overlays.Arrow, AbstractOverlay);      
    
    /*
     * Class: Overlays.PlainArrow
	 * 
	 * A basic arrow.  This is in fact just one instance of the more generic case in which the tail folds back on itself to some
	 * point along the length of the arrow: in this case, that foldback point is the full length of the arrow.  so it just does
	 * a 'call' to Arrow with foldback set appropriately.       
	 */
    /*
     * Function: Constructor
     * See <Overlays.Arrow> for allowed parameters for this overlay.
     */
    jsPlumb.Overlays.PlainArrow = function(params) {
    	params = params || {};    	
    	var p = jsPlumb.extend(params, {foldback:1});
    	jsPlumb.Overlays.Arrow.call(this, p);
    	this.type = "PlainArrow";
    };
    jsPlumbUtil.extend(jsPlumb.Overlays.PlainArrow, jsPlumb.Overlays.Arrow);
        
    /*
     * Class: Overlays.Diamond
     * 
	 * A diamond. Like PlainArrow, this is a concrete case of the more generic case of the tail points converging on some point...it just
	 * happens that in this case, that point is greater than the length of the the arrow.    
	 * 
	 *      this could probably do with some help with positioning...due to the way it reuses the Arrow paint code, what Arrow thinks is the
	 *      center is actually 1/4 of the way along for this guy.  but we don't have any knowledge of pixels at this point, so we're kind of
	 *      stuck when it comes to helping out the Arrow class. possibly we could pass in a 'transpose' parameter or something. the value
	 *      would be -l/4 in this case - move along one quarter of the total length.
	 */
    /*
     * Function: Constructor
     * See <Overlays.Arrow> for allowed parameters for this overlay.
     */
    jsPlumb.Overlays.Diamond = function(params) {
    	params = params || {};    	
    	var l = params.length || 40,
    	    p = jsPlumb.extend(params, {length:l/2, foldback:2});
    	jsPlumb.Overlays.Arrow.call(this, p);
    	this.type = "Diamond";
    };
    jsPlumbUtil.extend(jsPlumb.Overlays.Diamond, jsPlumb.Overlays.Arrow);

    var _getDimensions = function(component) {
        if (component._jsPlumb.cachedDimensions == null)
            component._jsPlumb.cachedDimensions = component.getDimensions();
        return component._jsPlumb.cachedDimensions;
    };      
	
	// abstract superclass for overlays that add an element to the DOM.
    var AbstractDOMOverlay = function(params) {
		jsPlumb.DOMElementComponent.apply(this, arguments);
    	AbstractOverlay.apply(this, arguments);
		
		var jpcl = jsPlumb.CurrentLibrary;		
		this.id = params.id;
        this._jsPlumb.div = null;		
        this._jsPlumb.initialised = false;
        this._jsPlumb.component = params.component;
        this._jsPlumb.cachedDimensions = null;
        this._jsPlumb.create = params.create;
		
		this.getElement = function() {
			if (this._jsPlumb.div == null) {
                var div = this._jsPlumb.div = jpcl.getDOMElement(this._jsPlumb.create(this._jsPlumb.component));                
                div.style.position   =   "absolute";     
                var clazz = params._jsPlumb.overlayClass + " " + 
                    (this.cssClass ? this.cssClass : 
                    params.cssClass ? params.cssClass : "");        
                div.className = clazz;
                this._jsPlumb.instance.appendElement(div, this._jsPlumb.component.parent);
                this._jsPlumb.instance.getId(div);      
                this.attachListeners(div, this);
                this.canvas = div;
			}
    		return this._jsPlumb.div;
    	};
				
		this.draw = function(component, currentConnectionPaintStyle, absolutePosition) {
	    	var td = _getDimensions(this);
	    	if (td != null && td.length == 2) {
				var cxy = { x:0,y:0 };

                // absolutePosition would have been set by a call to connection.setAbsoluteOverlayPosition.
                if (absolutePosition) {
                    cxy = { x:absolutePosition[0], y:absolutePosition[1] };
                }
                else if (component.pointOnPath) {
                    var loc = this.loc, absolute = false;
                    if (jsPlumbUtil.isString(this.loc) || this.loc < 0 || this.loc > 1) {
                        loc = parseInt(this.loc, 10);
                        absolute = true;
                    }
                    cxy = component.pointOnPath(loc, absolute);  // a connection
                }
                else {
                    var locToUse = this.loc.constructor == Array ? this.loc : this.endpointLoc;
                    cxy = { x:locToUse[0] * component.w,
                            y:locToUse[1] * component.h };      
                } 
                           
				var minx = cxy.x - (td[0] / 2),
				    miny = cxy.y - (td[1] / 2);

                return {
                    component:component, 
                    d:{ minx:minx, miny:miny, td:td, cxy:cxy },
                    minX:minx, 
                    maxX:minx + td[0], 
                    minY:miny, 
                    maxY:miny + td[1]
                };								
        	}
	    	else return {minX:0,maxX:0,minY:0,maxY:0};
	    };	   	   		
	};
    jsPlumbUtil.extend(AbstractDOMOverlay, [jsPlumb.DOMElementComponent, AbstractOverlay], {
        getDimensions : function() {            
            return jsPlumb.CurrentLibrary.getSize(jsPlumb.CurrentLibrary.getElementObject(this.getElement()));            
        },
        setVisible : function(state) {
            this._jsPlumb.div.style.display = state ? "block" : "none";
        },
        /*
         * Function: clearCachedDimensions
         * Clears the cached dimensions for the label. As a performance enhancement, label dimensions are
         * cached from 1.3.12 onwards. The cache is cleared when you change the label text, of course, but
         * there are other reasons why the text dimensions might change - if you make a change through CSS, for
         * example, you might change the font size.  in that case you should explicitly call this method.
         */
        clearCachedDimensions : function() {
            this._jsPlumb.cachedDimensions = null;
        },
        cleanup : function() {
            if (this._jsPlumb.div != null) 
                jsPlumb.CurrentLibrary.removeElement(this._jsPlumb.div);
        },
        computeMaxSize : function() {
            var td = _getDimensions(this);
            return Math.max(td[0], td[1]);
        },
        reattachListeners : function(connector) {
            if (this._jsPlumb.div) {
                this.reattachListenersForElement(this._jsPlumb.div, this, connector);
            }
        },
        paint : function(p, containerExtents) {
            if (!this._jsPlumb.initialised) {
                this.getElement();
                p.component.appendDisplayElement(this._jsPlumb.div);
                this.attachListeners(this._jsPlumb.div, p.component);
                this._jsPlumb.initialised = true;
            }
            this._jsPlumb.div.style.left = (p.component.x + p.d.minx) + "px";
            this._jsPlumb.div.style.top = (p.component.y + p.d.miny) + "px";            
        }
    });
	
	/*
     * Class: Overlays.Custom
     * A Custom overlay. You supply a 'create' function which returns some DOM element, and jsPlumb positions it.
     * The 'create' function is passed a Connection or Endpoint.
     */
    /*
     * Function: Constructor
     * 
     * Parameters:
     * 	create - function for jsPlumb to call that returns a DOM element.
     * 	location - distance (as a decimal from 0 to 1 inclusive) marking where the label should sit on the connector. defaults to 0.5.
     * 	id - optional id to use for later retrieval of this overlay.
     * 	
     */
    jsPlumb.Overlays.Custom = function(params) {
    	this.type = "Custom";    	
    	AbstractDOMOverlay.apply(this, arguments);		    	        		    	    		
    };
    jsPlumbUtil.extend(jsPlumb.Overlays.Custom, AbstractDOMOverlay);

    jsPlumb.Overlays.GuideLines = function() {
        var self = this;
        self.length = 50;
        self.lineWidth = 5;
        this.type = "GuideLines";
        AbstractOverlay.apply(this, arguments);
        jsPlumb.jsPlumbUIComponent.apply(this, arguments);
        this.draw = function(connector, currentConnectionPaintStyle) {

            var head = connector.pointAlongPathFrom(self.loc, self.length / 2),
                mid = connector.pointOnPath(self.loc),
                tail = jsPlumbGeom.pointOnLine(head, mid, self.length),
                tailLine = jsPlumbGeom.perpendicularLineTo(head, tail, 40),
                headLine = jsPlumbGeom.perpendicularLineTo(tail, head, 20);

            return {
                connector:connector,
                head:head,
                tail:tail,
                headLine:headLine,
                tailLine:tailLine,                
                minX:Math.min(head.x, tail.x, headLine[0].x, headLine[1].x), 
                minY:Math.min(head.y, tail.y, headLine[0].y, headLine[1].y), 
                maxX:Math.max(head.x, tail.x, headLine[0].x, headLine[1].x), 
                maxY:Math.max(head.y, tail.y, headLine[0].y, headLine[1].y)
            };
        };

       // this.cleanup = function() { };  // nothing to clean up for GuideLines
    };
    
    /*
     * Class: Overlays.Label
     
     */
    /*
     * Function: Constructor
     * 
     * Parameters:
     * 	cssClass - optional css class string to append to css class. This string is appended "as-is", so you can of course have multiple classes
     *             defined.  This parameter is preferred to using labelStyle, borderWidth and borderStyle.
     * 	label - the label to paint.  May be a string or a function that returns a string.  Nothing will be painted if your label is null or your
     *         label function returns null.  empty strings _will_ be painted.
     * 	location - distance (as a decimal from 0 to 1 inclusive) marking where the label should sit on the connector. defaults to 0.5.
     * 	id - optional id to use for later retrieval of this overlay.
     * 
     * 	
     */
    jsPlumb.Overlays.Label =  function(params) {		   
		this.labelStyle = params.labelStyle;
        
        var labelWidth = null, labelHeight =  null, labelText = null, labelPadding = null;
		this.cssClass = this.labelStyle != null ? this.labelStyle.cssClass : null;
		var p = jsPlumb.extend({
            create : function() {
                return document.createElement("div");
            }}, params);
    	jsPlumb.Overlays.Custom.call(this, p);
		this.type = "Label";    	
        this.label = params.label || "";
        this.labelText = null;
        if (this.labelStyle) {
            var el = this.getElement();            
            this.labelStyle.font = this.labelStyle.font || "12px sans-serif";
            el.style.font = this.labelStyle.font;
            el.style.color = this.labelStyle.color || "black";
            if (this.labelStyle.fillStyle) el.style.background = this.labelStyle.fillStyle;
            if (this.labelStyle.borderWidth > 0) {
                var dStyle = this.labelStyle.borderStyle ? this.labelStyle.borderStyle : "black";
                el.style.border = this.labelStyle.borderWidth  + "px solid " + dStyle;
            }
            if (this.labelStyle.padding) el.style.padding = this.labelStyle.padding;            
        }

    };
    jsPlumbUtil.extend(jsPlumb.Overlays.Label, jsPlumb.Overlays.Custom, {
        cleanup:function() {
            this.div = null;
            this.label = null;
            this.labelText = null;
            this.cssClass = null;
            this.labelStyle = null;
        },
        getLabel : function() {
            return this.label;
        },
        /*
         * Function: setLabel
         * sets the label's, um, label.  you would think i'd call this function
         * 'setText', but you can pass either a Function or a String to this, so
         * it makes more sense as 'setLabel'. This uses innerHTML on the label div, so keep
         * that in mind if you need escaped HTML.
         */
        setLabel : function(l) {
            this.label = l;
            this.labelText = null;
            this.clearCachedDimensions();
            this.update();
            this.component.repaint();
        },
        getDimensions : function() {                
            this.update();
            return AbstractDOMOverlay.prototype.getDimensions.apply(this, arguments);
        },
        update : function() {
            if (typeof this.label == "function") {
                var lt = this.label(this);
                this.getElement().innerHTML = lt.replace(/\r\n/g, "<br/>");
            }
            else {
                if (this.labelText == null) {
                    this.labelText = this.label;
                    this.getElement().innerHTML = this.labelText.replace(/\r\n/g, "<br/>");
                }
            }
        }
    });		

 // ********************************* END OF OVERLAY DEFINITIONS ***********************************************************************
    
})();
/*
 * jsPlumb
 * 
 * Title:jsPlumb 1.5.5
 * 
 * Provides a way to visually connect elements on an HTML page, using either SVG, Canvas
 * elements, or VML.  
 * 
 * This file contains the 'flowchart' connectors, consisting of vertical and horizontal line segments.
 *
 * Copyright (c) 2010 - 2013 Simon Porritt (simon.porritt@gmail.com)
 * 
 * http://jsplumb.org
 * http://github.com/sporritt/jsplumb
 * http://code.google.com/p/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;(function() {
   
    /**
     * Function: Constructor
     * 
     * Parameters:
     * 	stub - minimum length for the stub at each end of the connector. This can be an integer, giving a value for both ends of the connections, 
     * or an array of two integers, giving separate values for each end. The default is an integer with value 30 (pixels). 
     *  gap  - gap to leave between the end of the connector and the element on which the endpoint resides. if you make this larger than stub then you will see some odd looking behaviour.  
                Like stub, this can be an array or a single value. defaults to 0 pixels for each end.     
     * cornerRadius - optional, defines the radius of corners between segments. defaults to 0 (hard edged corners).
     * alwaysRespectStubs - defaults to false. whether or not the connectors should always draw the stub, or, if the two elements
                            are in close proximity to each other (closer than the sum of the two stubs), to adjust the stubs.
     */
    var Flowchart = function(params) {
        this.type = "Flowchart";
        params = params || {};
        params.stub = params.stub == null ? 30 : params.stub;
        var self = this,
            _super =  jsPlumb.Connectors.AbstractConnector.apply(this, arguments),		
            midpoint = params.midpoint == null ? 0.5 : params.midpoint,
            points = [], segments = [],
            grid = params.grid,
            alwaysRespectStubs = params.alwaysRespectStubs,
            userSuppliedSegments = null,
            lastx = null, lasty = null, lastOrientation,	
            cornerRadius = params.cornerRadius != null ? params.cornerRadius : 0,	
            sgn = function(n) { return n < 0 ? -1 : n === 0 ? 0 : 1; },            
            /**
             * helper method to add a segment.
             */
            addSegment = function(segments, x, y, paintInfo) {
                if (lastx == x && lasty == y) return;
                var lx = lastx == null ? paintInfo.sx : lastx,
                    ly = lasty == null ? paintInfo.sy : lasty,
                    o = lx == x ? "v" : "h",
                    sgnx = sgn(x - lx),
                    sgny = sgn(y - ly);
                    
                lastx = x;
                lasty = y;				    		                
                segments.push([lx, ly, x, y, o, sgnx, sgny]);
            },
            segLength = function(s) {
                return Math.sqrt(Math.pow(s[0] - s[2], 2) + Math.pow(s[1] - s[3], 2));    
            },
            _cloneArray = function(a) { var _a = []; _a.push.apply(_a, a); return _a;},
            updateMinMax = function(a1) {
                self.bounds.minX = Math.min(self.bounds.minX, a1[2]);
                self.bounds.maxX = Math.max(self.bounds.maxX, a1[2]);
                self.bounds.minY = Math.min(self.bounds.minY, a1[3]);
                self.bounds.maxY = Math.max(self.bounds.maxY, a1[3]);    
            },
            writeSegments = function(conn, segments, paintInfo) {
                var current, next;                
                for (var i = 0; i < segments.length - 1; i++) {
                    
                    current = current || _cloneArray(segments[i]);
                    next = _cloneArray(segments[i + 1]);
                    if (cornerRadius > 0 && current[4] != next[4]) {
                        var radiusToUse = Math.min(cornerRadius, segLength(current), segLength(next));
                        // right angle. adjust current segment's end point, and next segment's start point.
                        current[2] -= current[5] * radiusToUse;
                        current[3] -= current[6] * radiusToUse;
                        next[0] += next[5] * radiusToUse;
                        next[1] += next[6] * radiusToUse;														                         			
                        var ac = (current[6] == next[5] && next[5] == 1) ||
                                 ((current[6] == next[5] && next[5] === 0) && current[5] != next[6]) ||
                                 (current[6] == next[5] && next[5] == -1),
                            sgny = next[1] > current[3] ? 1 : -1,
                            sgnx = next[0] > current[2] ? 1 : -1,
                            sgnEqual = sgny == sgnx,
                            cx = (sgnEqual && ac || (!sgnEqual && !ac)) ? next[0] : current[2],
                            cy = (sgnEqual && ac || (!sgnEqual && !ac)) ? current[3] : next[1];                                                        
                        
                        _super.addSegment(conn, "Straight", {
                            x1:current[0], y1:current[1], x2:current[2], y2:current[3]
                        });
                            
                        _super.addSegment(conn, "Arc", {
                            r:radiusToUse, 
                            x1:current[2], 
                            y1:current[3], 
                            x2:next[0], 
                            y2:next[1],
                            cx:cx,
                            cy:cy,
                            ac:ac
                        });	                                            
                    }
                    else {                 
                        // dx + dy are used to adjust for line width.
                        var dx = (current[2] == current[0]) ? 0 : (current[2] > current[0]) ? (paintInfo.lw / 2) : -(paintInfo.lw / 2),
                            dy = (current[3] == current[1]) ? 0 : (current[3] > current[1]) ? (paintInfo.lw / 2) : -(paintInfo.lw / 2);
                        _super.addSegment(conn, "Straight", {
                            x1:current[0]- dx, y1:current[1]-dy, x2:current[2] + dx, y2:current[3] + dy
                        });
                    }                    
                    current = next;
                }
                // last segment
                _super.addSegment(conn, "Straight", {
                    x1:next[0], y1:next[1], x2:next[2], y2:next[3]
                });                             
            };
        
        this.setSegments = function(s) {
            userSuppliedSegments = s;
        };
        
        this.isEditable = function() { return true; };
        
        /*
            Function: getOriginalSegments
            Gets the segments before the addition of rounded corners. This is used by the flowchart
            connector editor, since it only wants to concern itself with the original segments.
        */
        this.getOriginalSegments = function() {
            return userSuppliedSegments || segments;
        };
        
        this._compute = function(paintInfo, params) {
            
            if (params.clearEdits)
                userSuppliedSegments = null;
            
            if (userSuppliedSegments != null) {
                writeSegments(this, userSuppliedSegments, paintInfo);                
                return;
            }
            
            segments = [];
            lastx = null; lasty = null;
            lastOrientation = null;          
            
            var midx = paintInfo.startStubX + ((paintInfo.endStubX - paintInfo.startStubX) * midpoint),
                midy = paintInfo.startStubY + ((paintInfo.endStubY - paintInfo.startStubY) * midpoint);                                                                                                    
    
            var findClearedLine = function(start, mult, anchorPos, dimension) {
                    return start + (mult * (( 1 - anchorPos) * dimension) + _super.maxStub);
                },
                orientations = { x:[ 0, 1 ], y:[ 1, 0 ] },
                commonStubCalculator = function(axis) {
                    return [ paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY ];                    
                },
                stubCalculators = {
                    perpendicular:commonStubCalculator,
                    orthogonal:commonStubCalculator,
                    opposite:function(axis) {  
                        var pi = paintInfo,
                            idx = axis == "x" ? 0 : 1, 
                            areInProximity = {
                                "x":function() {                                    
                                    return ( (pi.so[idx] == 1 && ( 
                                        ( (pi.startStubX > pi.endStubX) && (pi.tx > pi.startStubX) ) ||
                                        ( (pi.sx > pi.endStubX) && (pi.tx > pi.sx))))) ||

                                        ( (pi.so[idx] == -1 && ( 
                                            ( (pi.startStubX < pi.endStubX) && (pi.tx < pi.startStubX) ) ||
                                            ( (pi.sx < pi.endStubX) && (pi.tx < pi.sx)))));
                                },
                                "y":function() {                                     
                                    return ( (pi.so[idx] == 1 && ( 
                                        ( (pi.startStubY > pi.endStubY) && (pi.ty > pi.startStubY) ) ||
                                        ( (pi.sy > pi.endStubY) && (pi.ty > pi.sy))))) ||

                                        ( (pi.so[idx] == -1 && ( 
                                        ( (pi.startStubY < pi.endStubY) && (pi.ty < pi.startStubY) ) ||
                                        ( (pi.sy < pi.endStubY) && (pi.ty < pi.sy)))));
                                }
                            };

                        if (!alwaysRespectStubs && areInProximity[axis]()) {                   
                            return {
                                "x":[(paintInfo.sx + paintInfo.tx) / 2, paintInfo.startStubY, (paintInfo.sx + paintInfo.tx) / 2, paintInfo.endStubY],
                                "y":[paintInfo.startStubX, (paintInfo.sy + paintInfo.ty) / 2, paintInfo.endStubX, (paintInfo.sy + paintInfo.ty) / 2]
                            }[axis];
                        }
                        else {
                            return [ paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY ];   
                        }
                    }
                },
                lineCalculators = {
                    perpendicular : function(axis, ss, oss, es, oes) {
                        var pi = paintInfo, 
                            sis = {
                                x:[ [ [ 1,2,3,4 ], null, [ 2,1,4,3 ] ], null, [ [ 4,3,2,1 ], null, [ 3,4,1,2 ] ] ],
                                y:[ [ [ 3,2,1,4 ], null, [ 2,3,4,1 ] ], null, [ [ 4,1,2,3 ], null, [ 1,4,3,2 ] ] ]
                            },
                            stubs = { 
                                x:[ [ pi.startStubX, pi.endStubX ] , null, [ pi.endStubX, pi.startStubX ] ],
                                y:[ [ pi.startStubY, pi.endStubY ] , null, [ pi.endStubY, pi.startStubY ] ]
                            },
                            midLines = {
                                x:[ [ midx, pi.startStubY ], [ midx, pi.endStubY ] ],
                                y:[ [ pi.startStubX, midy ], [ pi.endStubX, midy ] ]
                            },
                            linesToEnd = {
                                x:[ [ pi.endStubX, pi.startStubY ] ],
                                y:[ [ pi.startStubX, pi.endStubY ] ]
                            },
                            startToEnd = {
                                x:[ [ pi.startStubX, pi.endStubY ], [ pi.endStubX, pi.endStubY ] ],        
                                y:[ [ pi.endStubX, pi.startStubY ], [ pi.endStubX, pi.endStubY ] ]
                            },
                            startToMidToEnd = {
                                x:[ [ pi.startStubX, midy ], [ pi.endStubX, midy ], [ pi.endStubX, pi.endStubY ] ],
                                y:[ [ midx, pi.startStubY ], [ midx, pi.endStubY ], [ pi.endStubX, pi.endStubY ] ]
                            },
                            otherStubs = {
                                x:[ pi.startStubY, pi.endStubY ],
                                y:[ pi.startStubX, pi.endStubX ]                                    
                            },
                            soIdx = orientations[axis][0], toIdx = orientations[axis][1],
                            _so = pi.so[soIdx] + 1,
                            _to = pi.to[toIdx] + 1,
                            otherFlipped = (pi.to[toIdx] == -1 && (otherStubs[axis][1] < otherStubs[axis][0])) || (pi.to[toIdx] == 1 && (otherStubs[axis][1] > otherStubs[axis][0])),
                            stub1 = stubs[axis][_so][0],
                            stub2 = stubs[axis][_so][1],
                            segmentIndexes = sis[axis][_so][_to];

                        if (pi.segment == segmentIndexes[3] || (pi.segment == segmentIndexes[2] && otherFlipped)) {
                            return midLines[axis];       
                        }
                        else if (pi.segment == segmentIndexes[2] && stub2 < stub1) {
                            return linesToEnd[axis];
                        }
                        else if ((pi.segment == segmentIndexes[2] && stub2 >= stub1) || (pi.segment == segmentIndexes[1] && !otherFlipped)) {
                            return startToMidToEnd[axis];
                        }
                        else if (pi.segment == segmentIndexes[0] || (pi.segment == segmentIndexes[1] && otherFlipped)) {
                            return startToEnd[axis];  
                        }                                
                    },
                    orthogonal : function(axis, startStub, otherStartStub, endStub, otherEndStub) {                    
                        var pi = paintInfo,                                            
                            extent = {
                                "x":pi.so[0] == -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub),
                                "y":pi.so[1] == -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub)
                            }[axis];
                                                
                        return {
                            "x":[ [ extent, otherStartStub ],[ extent, otherEndStub ], [ endStub, otherEndStub ] ],
                            "y":[ [ otherStartStub, extent ], [ otherEndStub, extent ], [ otherEndStub, endStub ] ]
                        }[axis];                    
                    },
                    opposite : function(axis, ss, oss, es, oes) {                                                
                        var pi = paintInfo,
                            otherAxis = {"x":"y","y":"x"}[axis], 
                            dim = {"x":"height","y":"width"}[axis],
                            comparator = pi["is" + axis.toUpperCase() + "GreaterThanStubTimes2"];

                        if (params.sourceEndpoint.elementId == params.targetEndpoint.elementId) {
                            var _val = oss + ((1 - params.sourceEndpoint.anchor[otherAxis]) * params.sourceInfo[dim]) + _super.maxStub;
                            return {
                                "x":[ [ ss, _val ], [ es, _val ] ],
                                "y":[ [ _val, ss ], [ _val, es ] ]
                            }[axis];
                            
                        }                                                        
                        else if (!comparator || (pi.so[idx] == 1 && ss > es) || (pi.so[idx] == -1 && ss < es)) {                                            
                            return {
                                "x":[[ ss, midy ], [ es, midy ]],
                                "y":[[ midx, ss ], [ midx, es ]]
                            }[axis];
                        }
                        else if ((pi.so[idx] == 1 && ss < es) || (pi.so[idx] == -1 && ss > es)) {
                            return {
                                "x":[[ midx, pi.sy ], [ midx, pi.ty ]],
                                "y":[[ pi.sx, midy ], [ pi.tx, midy ]]
                            }[axis];
                        }                        
                    }
                };

            var stubs = stubCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis),
                idx = paintInfo.sourceAxis == "x" ? 0 : 1,
                oidx = paintInfo.sourceAxis == "x" ? 1 : 0,                            
                ss = stubs[idx],
                oss = stubs[oidx],
                es = stubs[idx + 2],
                oes = stubs[oidx + 2];

            // add the start stub segment.
            addSegment(segments, stubs[0], stubs[1], paintInfo);           

            // compute the rest of the line
            var p = lineCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis, ss, oss, es, oes);            
            if (p) {
                for (var i = 0; i < p.length; i++) {                	
                    addSegment(segments, p[i][0], p[i][1], paintInfo);
                }
            }          
            
            // line to end stub
            addSegment(segments, stubs[2], stubs[3], paintInfo);
    
            // end stub to end
            addSegment(segments, paintInfo.tx, paintInfo.ty, paintInfo);               
            
            writeSegments(this, segments, paintInfo);                            
        };	

        this.getPath = function() {
            var _last = null, _lastAxis = null, s = [], segs = userSuppliedSegments || segments;
            for (var i = 0; i < segs.length; i++) {
                var seg = segs[i], axis = seg[4], axisIndex = (axis == "v" ? 3 : 2);
                if (_last != null && _lastAxis === axis) {
                    _last[axisIndex] = seg[axisIndex];                            
                }
                else {
                    if (seg[0] != seg[2] || seg[1] != seg[3]) {
                        s.push({
                            start:[ seg[0], seg[1] ],
                            end:[ seg[2], seg[3] ]
                        });                    
                        _last = seg;
                        _lastAxis = seg[4];
                    }
                }
            }
            return s;
        };	

        this.setPath = function(path) {
            userSuppliedSegments = [];
            for (var i = 0; i < path.length; i++) {
                 var lx = path[i].start[0],
                    ly = path[i].start[1],
                    x = path[i].end[0],
                    y = path[i].end[1],
                    o = lx == x ? "v" : "h",
                    sgnx = sgn(x - lx),
                    sgny = sgn(y - ly);

                userSuppliedSegments.push([lx, ly, x, y, o, sgnx, sgny]);
            }
        };
    };

    jsPlumbUtil.extend(Flowchart, jsPlumb.Connectors.AbstractConnector);
    jsPlumb.registerConnectorType(Flowchart, "Flowchart");
})();
/*
 * jsPlumb
 *
 * Title:jsPlumb 1.5.5
 *
 * Provides a way to visually connect elements on an HTML page, using either SVG, Canvas
 * elements, or VML.
 *
 * This file contains the state machine connectors.
 *
 * Thanks to Brainstorm Mobile Solutions for supporting the development of these.
 *
 * Copyright (c) 2010 - 2013 Simon Porritt (simon.porritt@gmail.com)
 *
 * http://jsplumb.org
 * http://github.com/sporritt/jsplumb
 * http://code.google.com/p/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */

;(function() {

	var Line = function(x1, y1, x2, y2) {

		this.m = (y2 - y1) / (x2 - x1);
		this.b = -1 * ((this.m * x1) - y1);
	
		this.rectIntersect = function(x,y,w,h) {
			var results = [], xInt, yInt;
		
			// 	try top face
			// 	the equation of the top face is y = (0 * x) + b; y = b.
			xInt = (y - this.b) / this.m;
			// test that the X value is in the line's range.
			if (xInt >= x && xInt <= (x + w)) results.push([ xInt, (this.m * xInt) + this.b ]);
		
			// try right face
			yInt = (this.m * (x + w)) + this.b;
			if (yInt >= y && yInt <= (y + h)) results.push([ (yInt - this.b) / this.m, yInt ]);
		
			// 	bottom face
			xInt = ((y + h) - this.b) / this.m;
			// test that the X value is in the line's range.
			if (xInt >= x && xInt <= (x + w)) results.push([ xInt, (this.m * xInt) + this.b ]);
		
			// try left face
			yInt = (this.m * x) + this.b;
			if (yInt >= y && yInt <= (y + h)) results.push([ (yInt - this.b) / this.m, yInt ]);

			if (results.length == 2) {
				var midx = (results[0][0] + results[1][0]) / 2, midy = (results[0][1] + results[1][1]) / 2;
				results.push([ midx,midy ]);
				// now calculate the segment inside the rectangle where the midpoint lies.
				var xseg = midx <= x + (w / 2) ? -1 : 1,
					yseg = midy <= y + (h / 2) ? -1 : 1;
				results.push([xseg, yseg]);
				return results;
			}
		
			return null;

		};
	},
	_segment = function(x1, y1, x2, y2) {
		if (x1 <= x2 && y2 <= y1) return 1;
		else if (x1 <= x2 && y1 <= y2) return 2;
		else if (x2 <= x1 && y2 >= y1) return 3;
		return 4;
	},
		
		// the control point we will use depends on the faces to which each end of the connection is assigned, specifically whether or not the
		// two faces are parallel or perpendicular.  if they are parallel then the control point lies on the midpoint of the axis in which they
		// are parellel and varies only in the other axis; this variation is proportional to the distance that the anchor points lie from the
		// center of that face.  if the two faces are perpendicular then the control point is at some distance from both the midpoints; the amount and
		// direction are dependent on the orientation of the two elements. 'seg', passed in to this method, tells you which segment the target element
		// lies in with respect to the source: 1 is top right, 2 is bottom right, 3 is bottom left, 4 is top left.
		//
		// sourcePos and targetPos are arrays of info about where on the source and target each anchor is located.  their contents are:
		//
		// 0 - absolute x
		// 1 - absolute y
		// 2 - proportional x in element (0 is left edge, 1 is right edge)
		// 3 - proportional y in element (0 is top edge, 1 is bottom edge)
		// 	
	_findControlPoint = function(midx, midy, segment, sourceEdge, targetEdge, dx, dy, distance, proximityLimit) {
        // TODO (maybe)
        // - if anchor pos is 0.5, make the control point take into account the relative position of the elements.
        if (distance <= proximityLimit) return [midx, midy];

        if (segment === 1) {
            if (sourceEdge[3] <= 0 && targetEdge[3] >= 1) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
            else if (sourceEdge[2] >= 1 && targetEdge[2] <= 0) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
            else return [ midx + (-1 * dx) , midy + (-1 * dy) ];
        }
        else if (segment === 2) {
            if (sourceEdge[3] >= 1 && targetEdge[3] <= 0) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
            else if (sourceEdge[2] >= 1 && targetEdge[2] <= 0) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
            else return [ midx + (1 * dx) , midy + (-1 * dy) ];
        }
        else if (segment === 3) {
            if (sourceEdge[3] >= 1 && targetEdge[3] <= 0) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
            else if (sourceEdge[2] <= 0 && targetEdge[2] >= 1) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
            else return [ midx + (-1 * dx) , midy + (-1 * dy) ];
        }
        else if (segment === 4) {
            if (sourceEdge[3] <= 0 && targetEdge[3] >= 1) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
            else if (sourceEdge[2] <= 0 && targetEdge[2] >= 1) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
            else return [ midx + (1 * dx) , midy + (-1 * dy) ];
        }

	};	
	
	/**
     * Class: Connectors.StateMachine
     * Provides 'state machine' connectors.
     */
	/*
	 * Function: Constructor
	 * 
	 * Parameters:
	 * curviness -	measure of how "curvy" the connectors will be.  this is translated as the distance that the
     *                Bezier curve's control point is from the midpoint of the straight line connecting the two
     *              endpoints, and does not mean that the connector is this wide.  The Bezier curve never reaches
     *              its control points; they act as gravitational masses. defaults to 10.
	 * margin	-	distance from element to start and end connectors, in pixels.  defaults to 5.
	 * proximityLimit  -   sets the distance beneath which the elements are consider too close together to bother
	 *						with fancy curves. by default this is 80 pixels.
	 * loopbackRadius	-	the radius of a loopback connector.  optional; defaults to 25.
	 * showLoopback   -   If set to false this tells the connector that it is ok to paint connections whose source and target is the same element with a connector running through the element. The default value for this is true; the connector always makes a loopback connection loop around the element rather than passing through it.
	*/
	var StateMachine = function(params) {
		params = params || {};
		this.type = "StateMachine";

		var self = this,
			_super =  jsPlumb.Connectors.AbstractConnector.apply(this, arguments),
			curviness = params.curviness || 10,
			margin = params.margin || 5,
			proximityLimit = params.proximityLimit || 80,
			clockwise = params.orientation && params.orientation === "clockwise",
			loopbackRadius = params.loopbackRadius || 25,
			showLoopback = params.showLoopback !== false;
		
		this._compute = function(paintInfo, params) {
			var w = Math.abs(params.sourcePos[0] - params.targetPos[0]),
				h = Math.abs(params.sourcePos[1] - params.targetPos[1]),
				x = Math.min(params.sourcePos[0], params.targetPos[0]),
				y = Math.min(params.sourcePos[1], params.targetPos[1]);				
		
			if (!showLoopback || (params.sourceEndpoint.elementId !== params.targetEndpoint.elementId)) {                            
				var _sx = params.sourcePos[0] < params.targetPos[0] ? 0  : w,
					_sy = params.sourcePos[1] < params.targetPos[1] ? 0:h,
					_tx = params.sourcePos[0] < params.targetPos[0] ? w : 0,
					_ty = params.sourcePos[1] < params.targetPos[1] ? h : 0;
            
				// now adjust for the margin
				if (params.sourcePos[2] === 0) _sx -= margin;
            	if (params.sourcePos[2] === 1) _sx += margin;
            	if (params.sourcePos[3] === 0) _sy -= margin;
            	if (params.sourcePos[3] === 1) _sy += margin;
            	if (params.targetPos[2] === 0) _tx -= margin;
            	if (params.targetPos[2] === 1) _tx += margin;
            	if (params.targetPos[3] === 0) _ty -= margin;
            	if (params.targetPos[3] === 1) _ty += margin;

            	//
	            // these connectors are quadratic bezier curves, having a single control point. if both anchors 
    	        // are located at 0.5 on their respective faces, the control point is set to the midpoint and you
        	    // get a straight line.  this is also the case if the two anchors are within 'proximityLimit', since
           	 	// it seems to make good aesthetic sense to do that. outside of that, the control point is positioned 
           	 	// at 'curviness' pixels away along the normal to the straight line connecting the two anchors.
	            // 
   	        	// there may be two improvements to this.  firstly, we might actually support the notion of avoiding nodes
            	// in the UI, or at least making a good effort at doing so.  if a connection would pass underneath some node,
            	// for example, we might increase the distance the control point is away from the midpoint in a bid to
            	// steer it around that node.  this will work within limits, but i think those limits would also be the likely
            	// limits for, once again, aesthetic good sense in the layout of a chart using these connectors.
            	//
            	// the second possible change is actually two possible changes: firstly, it is possible we should gradually
            	// decrease the 'curviness' as the distance between the anchors decreases; start tailing it off to 0 at some
            	// point (which should be configurable).  secondly, we might slightly increase the 'curviness' for connectors
            	// with respect to how far their anchor is from the center of its respective face. this could either look cool,
            	// or stupid, and may indeed work only in a way that is so subtle as to have been a waste of time.
            	//

				var _midx = (_sx + _tx) / 2, _midy = (_sy + _ty) / 2, 
            	    m2 = (-1 * _midx) / _midy, theta2 = Math.atan(m2),
            	    dy =  (m2 == Infinity || m2 == -Infinity) ? 0 : Math.abs(curviness / 2 * Math.sin(theta2)),
				    dx =  (m2 == Infinity || m2 == -Infinity) ? 0 : Math.abs(curviness / 2 * Math.cos(theta2)),
				    segment = _segment(_sx, _sy, _tx, _ty),
				    distance = Math.sqrt(Math.pow(_tx - _sx, 2) + Math.pow(_ty - _sy, 2)),			
	            	// calculate the control point.  this code will be where we'll put in a rudimentary element avoidance scheme; it
	            	// will work by extending the control point to force the curve to be, um, curvier.
					_controlPoint = _findControlPoint(_midx,
                                                  _midy,
                                                  segment,
                                                  params.sourcePos,
                                                  params.targetPos,
                                                  curviness, curviness,
                                                  distance,
                                                  proximityLimit);

				_super.addSegment(this, "Bezier", {
					x1:_tx, y1:_ty, x2:_sx, y2:_sy,
					cp1x:_controlPoint[0], cp1y:_controlPoint[1],
					cp2x:_controlPoint[0], cp2y:_controlPoint[1]
				});				
            }
            else {
            	// a loopback connector.  draw an arc from one anchor to the other.            	
        		var x1 = params.sourcePos[0], x2 = params.sourcePos[0], y1 = params.sourcePos[1] - margin, y2 = params.sourcePos[1] - margin, 				
					cx = x1, cy = y1 - loopbackRadius,				
					// canvas sizing stuff, to ensure the whole painted area is visible.
					_w = 2 * loopbackRadius, 
					_h = 2 * loopbackRadius,
					_x = cx - loopbackRadius, 
					_y = cy - loopbackRadius;

				paintInfo.points[0] = _x;
				paintInfo.points[1] = _y;
				paintInfo.points[2] = _w;
				paintInfo.points[3] = _h;
				
				// ADD AN ARC SEGMENT.
				_super.addSegment(this, "Arc", {
					loopback:true,
					x1:(x1 - _x) + 4,
					y1:y1 - _y,
					startAngle:0,
					endAngle: 2 * Math.PI,
					r:loopbackRadius,
					ac:!clockwise,
					x2:(x1 - _x) - 4,
					y2:y1 - _y,
					cx:cx - _x,
					cy:cy - _y
				});
            }                           
        };                        
	};
	jsPlumb.registerConnectorType(StateMachine, "StateMachine");
})();

/*
    	// a possible rudimentary avoidance scheme, old now, perhaps not useful.
        //      if (avoidSelector) {
		//		    var testLine = new Line(sourcePos[0] + _sx,sourcePos[1] + _sy,sourcePos[0] + _tx,sourcePos[1] + _ty);
		//		    var sel = jsPlumb.getSelector(avoidSelector);
		//		    for (var i = 0; i < sel.length; i++) {
		//			    var id = jsPlumb.getId(sel[i]);
		//			    if (id != sourceEndpoint.elementId && id != targetEndpoint.elementId) {
		//				    o = jsPlumb.getOffset(id), s = jsPlumb.getSize(id);
//
//						    if (o && s) {
//							    var collision = testLine.rectIntersect(o.left,o.top,s[0],s[1]);
//							    if (collision) {
								    // set the control point to be a certain distance from the midpoint of the two points that
								    // the line crosses on the rectangle.
								    // TODO where will this 75 number come from?
					//			    _controlX = collision[2][0] + (75 * collision[3][0]);
				//	/			    _controlY = collision[2][1] + (75 * collision[3][1]);
//							    }
//						    }
					//  }
	//			    }
              //}
    */

;(function() {

	var Bezier = function(params) {
        params = params || {};

    	var self = this,
			_super =  jsPlumb.Connectors.AbstractConnector.apply(this, arguments),
            stub = params.stub || 50,
            majorAnchor = params.curviness || 150,
            minorAnchor = 10;            

        this.type = "Bezier";	
        this.getCurviness = function() { return majorAnchor; };	
        
        this._findControlPoint = function(point, sourceAnchorPosition, targetAnchorPosition, sourceEndpoint, targetEndpoint) {
        	// determine if the two anchors are perpendicular to each other in their orientation.  we swap the control 
        	// points around if so (code could be tightened up)
        	var soo = sourceEndpoint.anchor.getOrientation(sourceEndpoint), 
        		too = targetEndpoint.anchor.getOrientation(targetEndpoint),
        		perpendicular = soo[0] != too[0] || soo[1] == too[1],
            	p = [];                
            	
            if (!perpendicular) {
                if (soo[0] === 0) // X
                    p.push(sourceAnchorPosition[0] < targetAnchorPosition[0] ? point[0] + minorAnchor : point[0] - minorAnchor);
                else p.push(point[0] - (majorAnchor * soo[0]));
                                 
                if (soo[1] === 0) // Y
                	p.push(sourceAnchorPosition[1] < targetAnchorPosition[1] ? point[1] + minorAnchor : point[1] - minorAnchor);
                else p.push(point[1] + (majorAnchor * too[1]));
            }
             else {
                if (too[0] === 0) // X
                	p.push(targetAnchorPosition[0] < sourceAnchorPosition[0] ? point[0] + minorAnchor : point[0] - minorAnchor);
                else p.push(point[0] + (majorAnchor * too[0]));
                
                if (too[1] === 0) // Y
                	p.push(targetAnchorPosition[1] < sourceAnchorPosition[1] ? point[1] + minorAnchor : point[1] - minorAnchor);
                else p.push(point[1] + (majorAnchor * soo[1]));
             }

            return p;                
        };        

        this._compute = function(paintInfo, p) {                                
			var sp = p.sourcePos,
				tp = p.targetPos,				
                _w = Math.abs(sp[0] - tp[0]),
                _h = Math.abs(sp[1] - tp[1]),            
                _sx = sp[0] < tp[0] ? _w : 0,
                _sy = sp[1] < tp[1] ? _h : 0,
                _tx = sp[0] < tp[0] ? 0 : _w,
                _ty = sp[1] < tp[1] ? 0 : _h,
                _CP = self._findControlPoint([_sx, _sy], sp, tp, p.sourceEndpoint, p.targetEndpoint),
                _CP2 = self._findControlPoint([_tx, _ty], tp, sp, p.targetEndpoint, p.sourceEndpoint);

			_super.addSegment(this, "Bezier", {
				x1:_sx, y1:_sy, x2:_tx, y2:_ty,
				cp1x:_CP[0], cp1y:_CP[1], cp2x:_CP2[0], cp2y:_CP2[1]
			});                    
        }; 
	};

	jsPlumb.registerConnectorType(Bezier, "Bezier");

})();
/*
 * jsPlumb
 * 
 * Title:jsPlumb 1.5.5
 * 
 * Provides a way to visually connect elements on an HTML page, using either SVG, Canvas
 * elements, or VML.  
 * 
 * This file contains the HTML5 canvas renderers.  Support for canvas was dropped in 1.4.2.
 * This is being kept around because canvas might make a comeback as a single-page solution
 * that also supports node rendering.
 *
 * Copyright (c) 2010 - 2013 Simon Porritt (http://jsplumb.org)
 * 
 * http://jsplumb.org
 * http://github.com/sporritt/jsplumb
 * http://code.google.com/p/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */

;(function() {

	
// ********************************* CANVAS RENDERERS FOR CONNECTORS AND ENDPOINTS *******************************************************************
		
	// TODO refactor to renderer common script.  put a ref to jsPlumb.sizeCanvas in there too.
	var _connectionBeingDragged = null,
	    _hasClass = function(el, clazz) { return jsPlumb.CurrentLibrary.hasClass(_getElementObject(el), clazz); },
	    _getElementObject = function(el) { return jsPlumb.CurrentLibrary.getElementObject(el); },
	    _getOffset = function(el) { return jsPlumb.CurrentLibrary.getOffset(_getElementObject(el)); },
	    _pageXY = function(el) { return jsPlumb.CurrentLibrary.getPageXY(el); },
	    _clientXY = function(el) { return jsPlumb.CurrentLibrary.getClientXY(el); };
	
	/*
	 * Class:CanvasMouseAdapter
	 * Provides support for mouse events on canvases.  
	 */
	var CanvasMouseAdapter = window.CanvasMouseAdapter = function() {
		var self = this;
		this.overlayPlacements = [];
		jsPlumb.jsPlumbUIComponent.apply(this, arguments);
		jsPlumbUtil.EventGenerator.apply(this, arguments);
		/**
		 * returns whether or not the given event is ojver a painted area of the canvas. 
		 */
	    this._over = function(e) {		    			  		    	
			var o = _getOffset(_getElementObject(self.canvas)),
				pageXY = _pageXY(e),
				x = pageXY[0] - o.left, y = pageXY[1] - o.top;
			if (x > 0 && y > 0 && x < self.canvas.width && y < self.canvas.height) {
				// first check overlays
				for ( var i = 0; i < self.overlayPlacements.length; i++) {
					var p = self.overlayPlacements[i];
					if (p && (p[0] <= x && p[1] >= x && p[2] <= y && p[3] >= y))
						return true;
				}		    	
				// then the canvas
				var d = self.canvas.getContext("2d").getImageData(parseInt(x, 10), parseInt(y, 10), 1, 1);
				return d.data[0] !== 0 || d.data[1] !== 0 || d.data[2] !== 0 || d.data[3] !== 0;		  
			}
			return false;
	    };
	    
	    var _mouseover = false, _mouseDown = false, _posWhenMouseDown = null, _mouseWasDown = false,
		    _nullSafeHasClass = function(el, clazz) {
		    	return el !== null && _hasClass(el, clazz);
		    };
	    this.mousemove = function(e) {		    
	    	var pageXY = _pageXY(e), clientXY = _clientXY(e),	   
	    	ee = document.elementFromPoint(clientXY[0], clientXY[1]),
	    	eventSourceWasOverlay = _nullSafeHasClass(ee, "_jsPlumb_overlay");	    	
			var _continue = _connectionBeingDragged === null && (_nullSafeHasClass(ee, "_jsPlumb_endpoint") || _nullSafeHasClass(ee, "_jsPlumb_connector"));
			if (!_mouseover && _continue && self._over(e)) {
				_mouseover = true;
				self.fire("mouseenter", self, e);		
				return true;
			}
			// TODO here there is a remote chance that the overlay the mouse moved onto
			// is actually not an overlay for the current component. a more thorough check would
			// be to ensure the overlay belonged to the current component.  
			else if (_mouseover && (!self._over(e) || !_continue) && !eventSourceWasOverlay) {
				_mouseover = false;
				self.fire("mouseexit", self, e);				
			}
			self.fire("mousemove", self, e);
	    };
	    		    		    
	    this.click = function(e) {	    		
			if (_mouseover && self._over(e) && !_mouseWasDown) 
	    		self.fire("click", self, e);		    	
	    	_mouseWasDown = false;
	    };
	    
	    this.dblclick = function(e) {
	    	if (_mouseover && self._over(e) && !_mouseWasDown) 
	    		self.fire("dblclick", self, e);		    	
	    	_mouseWasDown = false;
	    };
	    
	    this.mousedown = function(e) {
	    	if(self._over(e) && !_mouseDown) {
	    		_mouseDown = true;	    		
	    		_posWhenMouseDown = _getOffset(_getElementObject(self.canvas));
	    		self.fire("mousedown", self, e);
	    	}
	    };
	    
	    this.mouseup = function(e) {
	    	_mouseDown = false;
	    	self.fire("mouseup", self, e);
	    };

        this.contextmenu = function(e) {
          if (_mouseover && self._over(e) && !_mouseWasDown)
            self.fire("contextmenu", self, e);
          _mouseWasDown = false;
        };
	};
	jsPlumbUtil.extend(CanvasMouseAdapter, [ jsPlumb.jsPlumbUIComponent, jsPlumbUtil.EventGenerator ]);		
	
	var _newCanvas = function(params) {
		var canvas = document.createElement("canvas");
		params._jsPlumb.instance.appendElement(canvas, params.parent);
		canvas.style.position = "absolute";
		if (params["class"]) canvas.className = params["class"];
		// set an id. if no id on the element and if uuid was supplied it
		// will be used, otherwise we'll create one.
		params._jsPlumb.instance.getId(canvas, params.uuid);
		if (params.tooltip) canvas.setAttribute("title", params.tooltip);

		return canvas;
	};	

	var CanvasComponent = window.CanvasComponent = function(params) {
		CanvasMouseAdapter.apply(this, arguments);

		var displayElements = [ ];
		this.getDisplayElements = function() { return displayElements; };
		this.appendDisplayElement = function(el) { displayElements.push(el); };
	};
	jsPlumbUtil.extend(CanvasComponent, CanvasMouseAdapter, {
		setVisible:function(state) { 			
			this.canvas.style.display = state ? "block" : "none";
		}
	});
	
	var segmentMultipliers = [null, [1, -1], [1, 1], [-1, 1], [-1, -1] ];
	var maybeMakeGradient = function(ctx, style, gradientFunction) {
		if (style.gradient) {
			var g = gradientFunction();
			for ( var i = 0; i < style.gradient.stops.length; i++)
				g.addColorStop(style.gradient.stops[i][0], style.gradient.stops[i][1]);
			ctx.strokeStyle = g;
		}
	};
	var segmentRenderer = function(segment, ctx, style, dx, dy) {	
		({
			"Straight":function(segment, ctx, style, dx, dy) {
				var d = segment.params;
				ctx.save();
				maybeMakeGradient(ctx, style, function() { return ctx.createLinearGradient(d.x1, d.y1, d.x2, d.y2); });
				ctx.beginPath();
				ctx.translate(dx, dy);				
				if (style.dashstyle && style.dashstyle.split(" ").length === 2) {			
					// only a very simple dashed style is supported - having two values, which define the stroke length 
					// (as a multiple of the stroke width) and then the space length (also as a multiple of stroke width). 
					var ds = style.dashstyle.split(" ");
					if (ds.length !== 2) ds = [2, 2];
					var dss = [ ds[0] * style.lineWidth, ds[1] * style.lineWidth ],
						m = (d.x2- d.x1) / (d.y2 - d.y1),
						s = jsPlumbUtil.segment([d.x1, d.y1], [ d.x2, d.y2 ]),
						sm = segmentMultipliers[s],
						theta = Math.atan(m),
						l = Math.sqrt(Math.pow(d.x2 - d.x1, 2) + Math.pow(d.y2 - d.y1, 2)),
						repeats = Math.floor(l / (dss[0] + dss[1])),
						curPos = [d.x1, d.y1];

					
					// TODO: the question here is why could we not support this in all connector types? it's really
					// just a case of going along and asking jsPlumb for the next point on the path a few times, until it
					// reaches the end. every type of connector supports that method, after all.  but right now its only the
					// bezier connector that gives you back the new location on the path along with the x,y coordinates, which
					// we would need. we'd start out at loc=0 and ask for the point along the path that is dss[0] pixels away.
					// we then ask for the point that is (dss[0] + dss[1]) pixels away; and from that one we need not just the
					// x,y but the location, cos we're gonna plug that location back in in order to find where that dash ends.
					//
					// it also strikes me that it should be trivial to support arbitrary dash styles (having more or less than two
					// entries). you'd just iterate that array using a step size of 2, and generify the (rss[0] + rss[1])
					// computation to be sum(rss[0]..rss[n]).					

					for (var i = 0; i < repeats; i++) {
						ctx.moveTo(curPos[0], curPos[1]);

						var nextEndX = curPos[0] + (Math.abs(Math.sin(theta) * dss[0]) * sm[0]),
							nextEndY = curPos[1] + (Math.abs(Math.cos(theta) * dss[0]) * sm[1]),
							nextStartX = curPos[0] + (Math.abs(Math.sin(theta) * (dss[0] + dss[1]))  * sm[0]),
							nextStartY = curPos[1] + (Math.abs(Math.cos(theta) * (dss[0] + dss[1])) * sm[1]);

						ctx.lineTo(nextEndX, nextEndY);
						curPos = [nextStartX, nextStartY];					
					}

					// now draw the last bit
					ctx.moveTo(curPos[0], curPos[1]);
					ctx.lineTo(d.x2, d.y2);							

				}	        
		        else {
					ctx.moveTo(d.x1, d.y1);
					ctx.lineTo(d.x2, d.y2);
		        }				

				ctx.stroke();

				ctx.restore();
			},
			"Bezier":function(segment, ctx, style, dx, dy) {				
				var d = segment.params;
				ctx.save();
				maybeMakeGradient(ctx, style, function() { return ctx.createLinearGradient(d.x2 + dx, d.y2 + dy, d.x1 + dx, d.y1 + dy); });
				ctx.beginPath();
				ctx.translate(dx, dy);
				ctx.moveTo(d.x1, d.y1);
				ctx.bezierCurveTo(d.cp1x, d.cp1y, d.cp2x, d.cp2y, d.x2, d.y2);
				ctx.stroke();
				ctx.restore();
			},
			"Arc":function(segment, ctx, style, dx, dy) {
				var d = segment.params;
				ctx.save();
				ctx.beginPath();
				ctx.translate(dx, dy);				
				ctx.arc(d.cx, d.cy, d.r, segment.startAngle, segment.endAngle, d.ac);
				ctx.stroke();
				ctx.restore();
			}
		})[segment.type](segment, ctx, style, dx, dy);	
	};
	
	/**
	 * Class:CanvasConnector
	 * Superclass for Canvas Connector renderers.
	 */
	var CanvasConnector = jsPlumb.ConnectorRenderers.canvas = function(params) {
		CanvasComponent.apply(this, arguments);
		
		var _paintOneStyle = function(aStyle, dx, dy) {
			this.ctx.save();
			jsPlumb.extend(this.ctx, aStyle);

			var segments = this.getSegments();				
			for (var i = 0; i < segments.length; i++) {
				segmentRenderer(segments[i], this.ctx, aStyle, dx, dy);
			}
			this.ctx.restore();
		}.bind(this);

		var clazz = this._jsPlumb.instance.connectorClass + " " + (params.cssClass || "");
		this.canvas = _newCanvas({ 
			"class":clazz, 
			_jsPlumb:this._jsPlumb,
			parent:params.parent
		});	
		this.ctx = this.canvas.getContext("2d");
		
		this.appendDisplayElement(this.canvas);
		
		this.paint = function(style, anchor, extents) {						
			if (style != null) {							

				var xy = [ this.x, this.y ], wh = [ this.w, this.h ], p,
					dx = 0, dy = 0;

				if (extents != null) {
					if (extents.xmin < 0) {
						xy[0] += extents.xmin;
						dx = -extents.xmin;
					}
					if (extents.ymin < 0) {
						xy[1] += extents.ymin;
						dy = -extents.ymin;
					}
					wh[0] = extents.xmax + ((extents.xmin < 0) ? -extents.xmin : 0);
					wh[1] = extents.ymax + ((extents.ymin < 0) ? -extents.ymin : 0);
				}

				this.translateX = dx;
				this.translateY = dy;
				
				jsPlumbUtil.sizeElement(this.canvas, xy[0], xy[1], wh[0], wh[1]);				
				
				if (style.outlineColor != null) {
					var outlineWidth = style.outlineWidth || 1,
					outlineStrokeWidth = style.lineWidth + (2 * outlineWidth),
					outlineStyle = {
						strokeStyle:style.outlineColor,
						lineWidth:outlineStrokeWidth
					};
					_paintOneStyle(outlineStyle, dx, dy);
				}
				_paintOneStyle(style, dx, dy);
			}
		};				
	};		
	jsPlumbUtil.extend(CanvasConnector, CanvasComponent);
		
	
	/**
	 * Class:CanvasEndpoint
	 * Superclass for Canvas Endpoint renderers.
	 */
	var CanvasEndpoint = function(params) {
		CanvasComponent.apply(this, arguments);		
		var clazz = this._jsPlumb.instance.endpointClass + " " + (params.cssClass || ""),
			canvasParams = { 
			"class":clazz, 
			_jsPlumb:this._jsPlumb,
			parent:params.parent,
			tooltip:self.tooltip
		};
		this.canvas = _newCanvas(canvasParams);	
		this.ctx = this.canvas.getContext("2d");

		this.appendDisplayElement(this.canvas);
		
		this.paint = function(style, anchor, extents) {
			jsPlumbUtil.sizeElement(this.canvas, this.x, this.y, this.w, this.h);			
			if (style.outlineColor != null) {
				var outlineWidth = style.outlineWidth || 1,
				outlineStrokeWidth = style.lineWidth + (2 * outlineWidth);
				var outlineStyle = {
					strokeStyle:style.outlineColor,
					lineWidth:outlineStrokeWidth
				};
			}
			
			this._paint.apply(this, arguments);
		};
	};
	jsPlumbUtil.extend(CanvasEndpoint, CanvasComponent);
	
	jsPlumb.Endpoints.canvas.Dot = function(params) {		
		jsPlumb.Endpoints.Dot.apply(this, arguments);
		CanvasEndpoint.apply(this, arguments);
		var self = this,		
		parseValue = function(value) {
			try { return parseInt(value, 10); }
			catch(e) {
				if (value.substring(value.length - 1) == '%')
					return parseInt(value.substring(0, value - 1), 10);
			}
		},					    	
		calculateAdjustments = function(gradient) {
			var offsetAdjustment = self.defaultOffset, innerRadius = self.defaultInnerRadius;
			if (gradient.offset) offsetAdjustment = parseValue(gradient.offset);
        	if (gradient.innerRadius) innerRadius = parseValue(gradient.innerRadius);
        	return [offsetAdjustment, innerRadius];
		};
		this._paint = function(style) {
			if (style != null) {			
				var ctx = self.canvas.getContext('2d'), 
					orientation = params.endpoint.anchor.getOrientation(params.endpoint);

				jsPlumb.extend(ctx, style);							
	            if (style.gradient) {            	
	            	var adjustments = calculateAdjustments(style.gradient), 
	            	yAdjust = orientation[1] == 1 ? adjustments[0] * -1 : adjustments[0],
	            	xAdjust = orientation[0] == 1 ? adjustments[0] * -1:  adjustments[0],
	            	g = ctx.createRadialGradient(self.radius, self.radius, self.radius, self.radius + xAdjust, self.radius + yAdjust, adjustments[1]);
		            for (var i = 0; i < style.gradient.stops.length; i++)
		            	g.addColorStop(style.gradient.stops[i][0], style.gradient.stops[i][1]);
		            ctx.fillStyle = g;
	            }				
				ctx.beginPath();    
				//ctx.translate(dx, dy);						
				ctx.arc(self.radius, self.radius, self.radius, 0, Math.PI*2, true);
				ctx.closePath();				
				if (style.fillStyle || style.gradient) ctx.fill();
				if (style.strokeStyle) ctx.stroke();
			}
    	};
	};	
	jsPlumbUtil.extend(jsPlumb.Endpoints.canvas.Dot, [ jsPlumb.Endpoints.Dot, CanvasEndpoint ]);
		
	jsPlumb.Endpoints.canvas.Rectangle = function(params) {
		
		var self = this;
		jsPlumb.Endpoints.Rectangle.apply(this, arguments);
		CanvasEndpoint.apply(this, arguments);				
		
    	this._paint = function(style) {
				
			var ctx = self.canvas.getContext("2d"), 
				orientation = params.endpoint.anchor.getOrientation(params.endpoint);

			jsPlumb.extend(ctx, style);
			
			/* canvas gradient */
		    if (style.gradient) {
		    	// first figure out which direction to run the gradient in (it depends on the orientation of the anchors)
		    	var y1 = orientation[1] == 1 ? self.h : orientation[1] === 0 ? self.h / 2 : 0;
				var y2 = orientation[1] == -1 ? self.h : orientation[1] === 0 ? self.h / 2 : 0;
				var x1 = orientation[0] == 1 ? self.w : orientation[0] === 0 ? self.w / 2 : 0;
				var x2 = orientation[0] == -1 ? self.w : orientation[0] === 0 ? self.w / 2 : 0;
			    var g = ctx.createLinearGradient(x1,y1,x2,y2);
			    for (var i = 0; i < style.gradient.stops.length; i++)
	            	g.addColorStop(style.gradient.stops[i][0], style.gradient.stops[i][1]);
	            ctx.fillStyle = g;
		    }
			
			ctx.beginPath();
			ctx.rect(0, 0, self.w, self.h);
			ctx.closePath();				
			if (style.fillStyle || style.gradient) ctx.fill();
			if (style.strokeStyle) ctx.stroke();
    	};
	};		
	jsPlumbUtil.extend(jsPlumb.Endpoints.canvas.Rectangle, [ jsPlumb.Endpoints.Rectangle, CanvasEndpoint ]);
	
	jsPlumb.Endpoints.canvas.Triangle = function(params) {
	        			
		var self = this;
		jsPlumb.Endpoints.Triangle.apply(this, arguments);
		CanvasEndpoint.apply(this, arguments);			
		
    	this._paint = function(style) {    					
			var ctx = self.canvas.getContext('2d'),
				offsetX = 0, offsetY = 0, angle = 0,
				orientation = params.endpoint.anchor.getOrientation(params.endpoint);
			
			if( orientation[0] == 1 ) {
				offsetX = self.width;
				offsetY = self.height;
				angle = 180;
			}
			if( orientation[1] == -1 ) {
				offsetX = self.width;
				angle = 90;
			}
			if( orientation[1] == 1 ) {
				offsetY = self.height;
				angle = -90;
			}
			
			ctx.fillStyle = style.fillStyle;
			
			ctx.translate(offsetX, offsetY);
			ctx.rotate(angle * Math.PI/180);

			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(self.width/2, self.height/2);
			ctx.lineTo(0, self.height);
			ctx.closePath();
			if (style.fillStyle || style.gradient) ctx.fill();
			if (style.strokeStyle) ctx.stroke();				
    	};
	};	
	jsPlumbUtil.extend(jsPlumb.Endpoints.canvas.Triangle, [ jsPlumb.Endpoints.Triangle, CanvasEndpoint ]);
	
	/*
	 * Canvas Image Endpoint: uses the default version, which creates an <img> tag.
	 */
	jsPlumb.Endpoints.canvas.Image = jsPlumb.Endpoints.Image;
	
	/*
	 * Blank endpoint in all renderers is just the default Blank endpoint.
	 */
	jsPlumb.Endpoints.canvas.Blank = jsPlumb.Endpoints.Blank;
		
// ********************************* END OF CANVAS RENDERERS *******************************************************************    
    
    jsPlumb.Overlays.canvas.Label = jsPlumb.Overlays.Label;
	jsPlumb.Overlays.canvas.Custom = jsPlumb.Overlays.Custom;
    
    /**
     * a placeholder right now, really just exists to mirror the fact that there are SVG and VML versions of this. 
     */
    var CanvasOverlay = function() { 
    	jsPlumb.jsPlumbUIComponent.apply(this, arguments);
    };
    jsPlumbUtil.extend(CanvasOverlay, jsPlumb.jsPlumbUIComponent, {
    	setVisible : function(state) {
    	    this.visible = state;
    	    this.component.repaint();
    	}
    });
    
    var AbstractCanvasArrowOverlay = function(superclass, originalArgs) {
    	superclass.apply(this, originalArgs);
    	CanvasOverlay.apply(this, originalArgs);
    	this.paint = function(params, containerExtents) {
    		var ctx = params.component.ctx, d = params.d;
    		
    		if (d) {
    			ctx.save();
				ctx.lineWidth = params.lineWidth;
				ctx.beginPath();
				ctx.translate(params.component.translateX, params.component.translateY);
				ctx.moveTo(d.hxy.x, d.hxy.y);
				ctx.lineTo(d.tail[0].x, d.tail[0].y);
				ctx.lineTo(d.cxy.x, d.cxy.y);
				ctx.lineTo(d.tail[1].x, d.tail[1].y);
				ctx.lineTo(d.hxy.x, d.hxy.y);
				ctx.closePath();						
							
				if (params.strokeStyle) {
					ctx.strokeStyle = params.strokeStyle;
					ctx.stroke();
				}
				if (params.fillStyle) {
					ctx.fillStyle = params.fillStyle;			
					ctx.fill();
				}
				ctx.restore();
			}
    	};
    }; 
    
    jsPlumb.Overlays.canvas.Arrow = function() {
    	AbstractCanvasArrowOverlay.apply(this, [jsPlumb.Overlays.Arrow, arguments]);    	
    };
    jsPlumbUtil.extend(jsPlumb.Overlays.canvas.Arrow, [ jsPlumb.Overlays.Arrow, CanvasOverlay ] );
    
    jsPlumb.Overlays.canvas.PlainArrow = function() {
    	AbstractCanvasArrowOverlay.apply(this, [jsPlumb.Overlays.PlainArrow, arguments]);    	
    };
    jsPlumbUtil.extend(jsPlumb.Overlays.canvas.PlainArrow, [ jsPlumb.Overlays.PlainArrow, CanvasOverlay ] );
    
    jsPlumb.Overlays.canvas.Diamond = function() {
    	AbstractCanvasArrowOverlay.apply(this, [jsPlumb.Overlays.Diamond, arguments]);    	
    };		
    jsPlumbUtil.extend(jsPlumb.Overlays.canvas.Diamond, [ jsPlumb.Overlays.Diamond, CanvasOverlay ] );
})();
/*
 * jsPlumb
 * 
 * Title:jsPlumb 1.5.5
 * 
 * Provides a way to visually connect elements on an HTML page, using either SVG, Canvas
 * elements, or VML.  
 * 
 * This file contains the SVG renderers.
 *
 * Copyright (c) 2010 - 2013 Simon Porritt (http://jsplumb.org)
 * 
 * http://jsplumb.org
 * http://github.com/sporritt/jsplumb
 * http://code.google.com/p/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */

/**
 * SVG support for jsPlumb.
 * 
 * things to investigate:
 * 
 * gradients:  https://developer.mozilla.org/en/svg_in_html_introduction
 * css:http://tutorials.jenkov.com/svg/svg-and-css.html
 * text on a path: http://www.w3.org/TR/SVG/text.html#TextOnAPath
 * pointer events: https://developer.mozilla.org/en/css/pointer-events
 *
 * IE9 hover jquery: http://forum.jquery.com/topic/1-6-2-broke-svg-hover-events
 *
 */
;(function() {
	
// ************************** SVG utility methods ********************************************	
	
	var svgAttributeMap = {
		"joinstyle":"stroke-linejoin",
		"stroke-linejoin":"stroke-linejoin",		
		"stroke-dashoffset":"stroke-dashoffset",
		"stroke-linecap":"stroke-linecap"
	},
	STROKE_DASHARRAY = "stroke-dasharray",
	DASHSTYLE = "dashstyle",
	LINEAR_GRADIENT = "linearGradient",
	RADIAL_GRADIENT = "radialGradient",
	FILL = "fill",
	STOP = "stop",
	STROKE = "stroke",
	STROKE_WIDTH = "stroke-width",
	STYLE = "style",
	NONE = "none",
	JSPLUMB_GRADIENT = "jsplumb_gradient_",
	LINE_WIDTH = "lineWidth",
	ns = {
		svg:"http://www.w3.org/2000/svg",
		xhtml:"http://www.w3.org/1999/xhtml"
	},
	_attr = function(node, attributes) {
		for (var i in attributes)
			node.setAttribute(i, "" + attributes[i]);
	},	
	_node = function(name, attributes) {
		var n = document.createElementNS(ns.svg, name);
		attributes = attributes || {};
		attributes.version = "1.1";
		attributes.xmlns = ns.xhtml;
		_attr(n, attributes);
		return n;
	},
	_pos = function(d) { return "position:absolute;left:" + d[0] + "px;top:" + d[1] + "px"; },	
	_clearGradient = function(parent) {
		for (var i = 0; i < parent.childNodes.length; i++) {
			if (parent.childNodes[i].tagName == LINEAR_GRADIENT || parent.childNodes[i].tagName == RADIAL_GRADIENT)
				parent.removeChild(parent.childNodes[i]);
		}
	},		
	_updateGradient = function(parent, node, style, dimensions, uiComponent) {
		var id = JSPLUMB_GRADIENT + uiComponent._jsPlumb.instance.idstamp();
		// first clear out any existing gradient
		_clearGradient(parent);
		// this checks for an 'offset' property in the gradient, and in the absence of it, assumes
		// we want a linear gradient. if it's there, we create a radial gradient.
		// it is possible that a more explicit means of defining the gradient type would be
		// better. relying on 'offset' means that we can never have a radial gradient that uses
		// some default offset, for instance.
		// issue 244 suggested the 'gradientUnits' attribute; without this, straight/flowchart connectors with gradients would
		// not show gradients when the line was perfectly horizontal or vertical.
		var g;
		if (!style.gradient.offset) {
			g = _node(LINEAR_GRADIENT, {id:id, gradientUnits:"userSpaceOnUse"});
		}
		else {
			g = _node(RADIAL_GRADIENT, {
				id:id
			});			
		}
		
		parent.appendChild(g);
		
		// the svg radial gradient seems to treat stops in the reverse 
		// order to how canvas does it.  so we want to keep all the maths the same, but
		// iterate the actual style declarations in reverse order, if the x indexes are not in order.
		for (var i = 0; i < style.gradient.stops.length; i++) {
			var styleToUse = uiComponent.segment == 1 ||  uiComponent.segment == 2 ? i: style.gradient.stops.length - 1 - i,			
				stopColor = jsPlumbUtil.convertStyle(style.gradient.stops[styleToUse][1], true),
				s = _node(STOP, {"offset":Math.floor(style.gradient.stops[i][0] * 100) + "%", "stop-color":stopColor});

			g.appendChild(s);
		}
		var applyGradientTo = style.strokeStyle ? STROKE : FILL;
        //document.location.toString()
		//node.setAttribute(STYLE, applyGradientTo + ":url(#" + id + ")");
        node.setAttribute(STYLE, applyGradientTo + ":url(" + document.location.toString() + "#" + id + ")");
	},
	_applyStyles = function(parent, node, style, dimensions, uiComponent) {
		
		if (style.gradient) {
			_updateGradient(parent, node, style, dimensions, uiComponent);			
		}
		else {
			// make sure we clear any existing gradient
			_clearGradient(parent);
			node.setAttribute(STYLE, "");
		}
		
		node.setAttribute(FILL, style.fillStyle ? jsPlumbUtil.convertStyle(style.fillStyle, true) : NONE);
		node.setAttribute(STROKE, style.strokeStyle ? jsPlumbUtil.convertStyle(style.strokeStyle, true) : NONE);		
		if (style.lineWidth) {
			node.setAttribute(STROKE_WIDTH, style.lineWidth);
		}
	
		// in SVG there is a stroke-dasharray attribute we can set, and its syntax looks like
		// the syntax in VML but is actually kind of nasty: values are given in the pixel
		// coordinate space, whereas in VML they are multiples of the width of the stroked
		// line, which makes a lot more sense.  for that reason, jsPlumb is supporting both
		// the native svg 'stroke-dasharray' attribute, and also the 'dashstyle' concept from
		// VML, which will be the preferred method.  the code below this converts a dashstyle
		// attribute given in terms of stroke width into a pixel representation, by using the
		// stroke's lineWidth. 
		if (style[DASHSTYLE] && style[LINE_WIDTH] && !style[STROKE_DASHARRAY]) {
			var sep = style[DASHSTYLE].indexOf(",") == -1 ? " " : ",",
			parts = style[DASHSTYLE].split(sep),
			styleToUse = "";
			parts.forEach(function(p) {
				styleToUse += (Math.floor(p * style.lineWidth) + sep);
			});
			node.setAttribute(STROKE_DASHARRAY, styleToUse);
		}		
		else if(style[STROKE_DASHARRAY]) {
			node.setAttribute(STROKE_DASHARRAY, style[STROKE_DASHARRAY]);
		}
		
		// extra attributes such as join type, dash offset.
		for (var i in svgAttributeMap) {
			if (style[i]) {
				node.setAttribute(svgAttributeMap[i], style[i]);
			}
		}
	},
	_decodeFont = function(f) {
		var r = /([0-9].)(p[xt])\s(.*)/, 
			bits = f.match(r);

		return {size:bits[1] + bits[2], font:bits[3]};		
	},
	_classManip = function(el, add, clazz) {
		var classesToAddOrRemove = clazz.split(" "),
			className = el.className,
			curClasses = className.baseVal.split(" ");
			
		for (var i = 0; i < classesToAddOrRemove.length; i++) {
			if (add) {
				if (curClasses.indexOf(classesToAddOrRemove[i]) == -1)
					curClasses.push(classesToAddOrRemove[i]);
			}
			else {
				var idx = curClasses.indexOf(classesToAddOrRemove[i]);
				if (idx != -1)
					curClasses.splice(idx, 1);
			}
		}
		
		el.className.baseVal = curClasses.join(" ");
	},
	_addClass = function(el, clazz) { _classManip(el, true, clazz); },
	_removeClass = function(el, clazz) { _classManip(el, false, clazz); },
	_appendAtIndex = function(svg, path, idx) {
		if (svg.childNodes.length > idx) {
			svg.insertBefore(path, svg.childNodes[idx]);
		}
		else svg.appendChild(path);
	};
	
	/**
		utility methods for other objects to use.
	*/
	jsPlumbUtil.svg = {
		addClass:_addClass,
		removeClass:_removeClass,
		node:_node,
		attr:_attr,
		pos:_pos
	};
	
 // ************************** / SVG utility methods ********************************************	
	
	/*
	 * Base class for SVG components.
	 */	
	var SvgComponent = function(params) {
		var pointerEventsSpec = params.pointerEventsSpec || "all", renderer = {};
			
		jsPlumb.jsPlumbUIComponent.apply(this, params.originalArgs);
		this.canvas = null;this.path = null;this.svg = null; 
	
		var clazz = params.cssClass + " " + (params.originalArgs[0].cssClass || ""),		
			svgParams = {
				"style":"",
				"width":0,
				"height":0,
				"pointer-events":pointerEventsSpec,
				"position":"absolute"
			};				
		this.svg = _node("svg", svgParams);
		if (params.useDivWrapper) {
			this.canvas = document.createElement("div");
			this.canvas.style.position = "absolute";
			jsPlumbUtil.sizeElement(this.canvas,0,0,1,1);
			this.canvas.className = clazz;
		}
		else {
			_attr(this.svg, { "class":clazz });
			this.canvas = this.svg;
		}
			
		params._jsPlumb.appendElement(this.canvas, params.originalArgs[0].parent);
		if (params.useDivWrapper) this.canvas.appendChild(this.svg);
		
		// TODO this displayElement stuff is common between all components, across all
		// renderers.  would be best moved to jsPlumbUIComponent.
		var displayElements = [ this.canvas ];
		this.getDisplayElements = function() { 
			return displayElements; 
		};
		
		this.appendDisplayElement = function(el) {
			displayElements.push(el);
		};	
		
		this.paint = function(style, anchor, extents) {	   			
			if (style != null) {
				
				var xy = [ this.x, this.y ], wh = [ this.w, this.h ], p;
				if (extents != null) {
					if (extents.xmin < 0) xy[0] += extents.xmin;
					if (extents.ymin < 0) xy[1] += extents.ymin;
					wh[0] = extents.xmax + ((extents.xmin < 0) ? -extents.xmin : 0);
					wh[1] = extents.ymax + ((extents.ymin < 0) ? -extents.ymin : 0);
				}

				if (params.useDivWrapper) {					
					jsPlumbUtil.sizeElement(this.canvas, xy[0], xy[1], wh[0], wh[1]);
					xy[0] = 0; xy[1] = 0;
					p = _pos([ 0, 0 ]);
				}
				else
					p = _pos([ xy[0], xy[1] ]);
                
                renderer.paint.apply(this, arguments);		    			    	
                
		    	_attr(this.svg, {
	    			"style":p,
	    			"width": wh[0],
	    			"height": wh[1]
	    		});		    		    		    	
			}
	    };
		
		return {
			renderer:renderer
		};
	};
	jsPlumbUtil.extend(SvgComponent, jsPlumb.jsPlumbUIComponent, {
		cleanup:function() {
			jsPlumbUtil.removeElement(this.canvas);            
			this.svg = null;
			this.canvas = null;
			this.path = null;			
		},
		setVisible:function(v) {
			if (this.canvas) {
				this.canvas.style.display = v ? "block" : "none";
			}
			if (this.bgCanvas) {
				this.bgCanvas.style.display = v ? "block" : "none";
			}
		}
	});
	
	/*
	 * Base class for SVG connectors.
	 */ 
	var SvgConnector = jsPlumb.ConnectorRenderers.svg = function(params) {
		var self = this,
			_super = SvgComponent.apply(this, [ { 
				cssClass:params._jsPlumb.connectorClass, 
				originalArgs:arguments, 
				pointerEventsSpec:"none", 
				_jsPlumb:params._jsPlumb
			} ]);	

		/*this.pointOnPath = function(location, absolute) {
			if (!self.path) return [0,0];
			var p = absolute ? location : location * self.path.getTotalLength();
			return self.path.getPointAtLength(p);
		};*/			

		_super.renderer.paint = function(style, anchor, extents) {
			
			var segments = self.getSegments(), p = "", offset = [0,0];			
			if (extents.xmin < 0) offset[0] = -extents.xmin;
			if (extents.ymin < 0) offset[1] = -extents.ymin;			
			
			// create path from segments.	
			for (var i = 0; i < segments.length; i++) {
				p += jsPlumb.Segments.svg.SegmentRenderer.getPath(segments[i]);
				p += " ";
			}			
			
			var a = { 
					d:p,
					transform:"translate(" + offset[0] + "," + offset[1] + ")",
					"pointer-events":params["pointer-events"] || "visibleStroke"
				}, 
                outlineStyle = null,
                d = [self.x,self.y,self.w,self.h];						
			
			// outline style.  actually means drawing an svg object underneath the main one.
			if (style.outlineColor) {
				var outlineWidth = style.outlineWidth || 1,
					outlineStrokeWidth = style.lineWidth + (2 * outlineWidth);
				outlineStyle = jsPlumb.CurrentLibrary.extend({}, style);
				outlineStyle.strokeStyle = jsPlumbUtil.convertStyle(style.outlineColor);
				outlineStyle.lineWidth = outlineStrokeWidth;
				
				if (self.bgPath == null) {
					self.bgPath = _node("path", a);
			    	_appendAtIndex(self.svg, self.bgPath, 0);
		    		self.attachListeners(self.bgPath, self);
				}
				else {
					_attr(self.bgPath, a);
				}
				
				_applyStyles(self.svg, self.bgPath, outlineStyle, d, self);
			}			
			
	    	if (self.path == null) {
		    	self.path = _node("path", a);
		    	_appendAtIndex(self.svg, self.path, style.outlineColor ? 1 : 0);
	    		self.attachListeners(self.path, self);	    		    		
	    	}
	    	else {
	    		_attr(self.path, a);
	    	}
	    		    	
	    	_applyStyles(self.svg, self.path, style, d, self);
		};
		
		this.reattachListeners = function() {
			if (this.bgPath) this.reattachListenersForElement(this.bgPath, this);
			if (this.path) this.reattachListenersForElement(this.path, this);
		};
	};
	jsPlumbUtil.extend(jsPlumb.ConnectorRenderers.svg, SvgComponent);

// ******************************* svg segment renderer *****************************************************	
		
	jsPlumb.Segments.svg = {
		SegmentRenderer : {		
			getPath : function(segment) {
				return ({
					"Straight":function() {
						var d = segment.getCoordinates();
						return "M " + d.x1 + " " + d.y1 + " L " + d.x2 + " " + d.y2;	
					},
					"Bezier":function() {
						var d = segment.params;
						return "M " + d.x1 + " " + d.y1 + 
							" C " + d.cp1x + " " + d.cp1y + " " + d.cp2x + " " + d.cp2y + " " + d.x2 + " " + d.y2;			
					},
					"Arc":function() {
						var d = segment.params,
							laf = segment.sweep > Math.PI ? 1 : 0,
							sf = segment.anticlockwise ? 0 : 1;			

						return "M" + segment.x1 + " " + segment.y1 + " A " + segment.radius + " " + d.r + " 0 " + laf + "," + sf + " " + segment.x2 + " " + segment.y2;
					}
				})[segment.type]();	
			}
		}
	};
	
// ******************************* /svg segments *****************************************************
   
    /*
	 * Base class for SVG endpoints.
	 */
	var SvgEndpoint = window.SvgEndpoint = function(params) {
		var _super = SvgComponent.apply(this, [ {
				cssClass:params._jsPlumb.endpointClass, 
				originalArgs:arguments, 
				pointerEventsSpec:"all",
				useDivWrapper:true,
				_jsPlumb:params._jsPlumb
			} ]);
			
		_super.renderer.paint = function(style) {
			var s = jsPlumb.extend({}, style);
			if (s.outlineColor) {
				s.strokeWidth = s.outlineWidth;
				s.strokeStyle = jsPlumbUtil.convertStyle(s.outlineColor, true);
			}
			
			if (this.node == null) {
				this.node = this.makeNode(s);
				this.svg.appendChild(this.node);
				this.attachListeners(this.node, this);
			}
			else if (this.updateNode != null) {
				this.updateNode(this.node);
			}
			_applyStyles(this.svg, this.node, s, [ this.x, this.y, this.w, this.h ], this);
			_pos(this.node, [ this.x, this.y ]);
		}.bind(this);
				
	};
	jsPlumbUtil.extend(SvgEndpoint, SvgComponent, {
		reattachListeners : function() {
			if (this.node) this.reattachListenersForElement(this.node, this);
		}
	});
	
	/*
	 * SVG Dot Endpoint
	 */
	jsPlumb.Endpoints.svg.Dot = function() {
		jsPlumb.Endpoints.Dot.apply(this, arguments);
		SvgEndpoint.apply(this, arguments);		
		this.makeNode = function(style) { 
			return _node("circle", {
                "cx"	:	this.w / 2,
                "cy"	:	this.h / 2,
                "r"		:	this.radius
            });			
		};
		this.updateNode = function(node) {
			_attr(node, {
				"cx":this.w / 2,
				"cy":this.h  / 2,
				"r":this.radius
			});
		};
	};
	jsPlumbUtil.extend(jsPlumb.Endpoints.svg.Dot, [jsPlumb.Endpoints.Dot, SvgEndpoint]);
	
	/*
	 * SVG Rectangle Endpoint 
	 */
	jsPlumb.Endpoints.svg.Rectangle = function() {
		jsPlumb.Endpoints.Rectangle.apply(this, arguments);
		SvgEndpoint.apply(this, arguments);		
		this.makeNode = function(style) {
			return _node("rect", {
				"width"     :   this.w,
				"height"    :   this.h
			});
		};
		this.updateNode = function(node) {
			_attr(node, {
				"width":this.w,
				"height":this.h
			});
		};			
	};		
	jsPlumbUtil.extend(jsPlumb.Endpoints.svg.Rectangle, [jsPlumb.Endpoints.Rectangle, SvgEndpoint]);
	
	/*
	 * SVG Image Endpoint is the default image endpoint.
	 */
	jsPlumb.Endpoints.svg.Image = jsPlumb.Endpoints.Image;
	/*
	 * Blank endpoint in svg renderer is the default Blank endpoint.
	 */
	jsPlumb.Endpoints.svg.Blank = jsPlumb.Endpoints.Blank;	
	/*
	 * Label overlay in svg renderer is the default Label overlay.
	 */
	jsPlumb.Overlays.svg.Label = jsPlumb.Overlays.Label;
	/*
	 * Custom overlay in svg renderer is the default Custom overlay.
	 */
	jsPlumb.Overlays.svg.Custom = jsPlumb.Overlays.Custom;
		
	var AbstractSvgArrowOverlay = function(superclass, originalArgs) {
    	superclass.apply(this, originalArgs);
    	jsPlumb.jsPlumbUIComponent.apply(this, originalArgs);
        this.isAppendedAtTopLevel = false;
    	var self = this;
    	this.path = null;
    	this.paint = function(params, containerExtents) {
    		// only draws on connections, not endpoints.
    		if (params.component.svg && containerExtents) {
	    		if (this.path == null) {
	    			this.path = _node("path", {
	    				"pointer-events":"all"	
	    			});
	    			params.component.svg.appendChild(this.path);
	    			
	    			this.attachListeners(this.path, params.component);
	    			this.attachListeners(this.path, this);
	    		}
	    		var clazz = originalArgs && (originalArgs.length == 1) ? (originalArgs[0].cssClass || "") : "",
	    			offset = [0,0];

	    		if (containerExtents.xmin < 0) offset[0] = -containerExtents.xmin;
	    		if (containerExtents.ymin < 0) offset[1] = -containerExtents.ymin;
	    		
	    		_attr(this.path, { 
	    			"d"			:	makePath(params.d),
	    			"class" 	:	clazz,
	    			stroke 		: 	params.strokeStyle ? params.strokeStyle : null,
	    			fill 		: 	params.fillStyle ? params.fillStyle : null,
	    			transform	: 	"translate(" + offset[0] + "," + offset[1] + ")"
	    		});    		
	    	}
    	};
    	var makePath = function(d) {
    		return "M" + d.hxy.x + "," + d.hxy.y +
    				" L" + d.tail[0].x + "," + d.tail[0].y + 
    				" L" + d.cxy.x + "," + d.cxy.y + 
    				" L" + d.tail[1].x + "," + d.tail[1].y + 
    				" L" + d.hxy.x + "," + d.hxy.y;
    	};
    	this.reattachListeners = function() {
			if (this.path) this.reattachListenersForElement(this.path, this);
		};		
    };
    jsPlumbUtil.extend(AbstractSvgArrowOverlay, [jsPlumb.jsPlumbUIComponent, jsPlumb.Overlays.AbstractOverlay], {
    	cleanup : function() {
    		if (this.path != null) jsPlumb.CurrentLibrary.removeElement(this.path);
    	},
    	setVisible:function(v) {
    		if(this.path != null) (this.path.style.display = (v ? "block" : "none"));
    	}
    });
    
    jsPlumb.Overlays.svg.Arrow = function() {
    	AbstractSvgArrowOverlay.apply(this, [jsPlumb.Overlays.Arrow, arguments]);    	
    };
    jsPlumbUtil.extend(jsPlumb.Overlays.svg.Arrow, [ jsPlumb.Overlays.Arrow, AbstractSvgArrowOverlay ]);
    
    jsPlumb.Overlays.svg.PlainArrow = function() {
    	AbstractSvgArrowOverlay.apply(this, [jsPlumb.Overlays.PlainArrow, arguments]);    	
    };
    jsPlumbUtil.extend(jsPlumb.Overlays.svg.PlainArrow, [ jsPlumb.Overlays.PlainArrow, AbstractSvgArrowOverlay ]);
    
    jsPlumb.Overlays.svg.Diamond = function() {
    	AbstractSvgArrowOverlay.apply(this, [jsPlumb.Overlays.Diamond, arguments]);    	
    };
    jsPlumbUtil.extend(jsPlumb.Overlays.svg.Diamond, [ jsPlumb.Overlays.Diamond, AbstractSvgArrowOverlay ]);

    // a test
    jsPlumb.Overlays.svg.GuideLines = function() {
        var path = null, self = this, p1_1, p1_2;        
        jsPlumb.Overlays.GuideLines.apply(this, arguments);
        this.paint = function(params, containerExtents) {
    		if (path == null) {
    			path = _node("path");
    			params.connector.svg.appendChild(path);
    			self.attachListeners(path, params.connector);
    			self.attachListeners(path, self);

                p1_1 = _node("path");
    			params.connector.svg.appendChild(p1_1);
    			self.attachListeners(p1_1, params.connector);
    			self.attachListeners(p1_1, self);

                p1_2 = _node("path");
    			params.connector.svg.appendChild(p1_2);
    			self.attachListeners(p1_2, params.connector);
    			self.attachListeners(p1_2, self);
    		}

    		var offset =[0,0];
    		if (containerExtents.xmin < 0) offset[0] = -containerExtents.xmin;
    		if (containerExtents.ymin < 0) offset[1] = -containerExtents.ymin;

    		_attr(path, {
    			"d"		:	makePath(params.head, params.tail),
    			stroke 	: 	"red",
    			fill 	: 	null,
    			transform:"translate(" + offset[0] + "," + offset[1] + ")"
    		});

            _attr(p1_1, {
    			"d"		:	makePath(params.tailLine[0], params.tailLine[1]),
    			stroke 	: 	"blue",
    			fill 	: 	null,
    			transform:"translate(" + offset[0] + "," + offset[1] + ")"
    		});

            _attr(p1_2, {
    			"d"		:	makePath(params.headLine[0], params.headLine[1]),
    			stroke 	: 	"green",
    			fill 	: 	null,
    			transform:"translate(" + offset[0] + "," + offset[1] + ")"
    		});
    	};

        var makePath = function(d1, d2) {
            return "M " + d1.x + "," + d1.y +
                   " L" + d2.x + "," + d2.y;
        };        
    };
    jsPlumbUtil.extend(jsPlumb.Overlays.svg.GuideLines, jsPlumb.Overlays.GuideLines);
})();
/*
 * jsPlumb
 * 
 * Title:jsPlumb 1.5.5
 * 
 * Provides a way to visually connect elements on an HTML page, using either SVG, Canvas
 * elements, or VML.  
 * 
 * This file contains the VML renderers.
 *
 * Copyright (c) 2010 - 2013 Simon Porritt (http://jsplumb.org)
 * 
 * http://jsplumb.org
 * http://github.com/sporritt/jsplumb
 * http://code.google.com/p/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */

;(function() {
	
	// http://ajaxian.com/archives/the-vml-changes-in-ie-8
	// http://www.nczonline.net/blog/2010/01/19/internet-explorer-8-document-and-browser-modes/
	// http://www.louisremi.com/2009/03/30/changes-in-vml-for-ie8-or-what-feature-can-the-ie-dev-team-break-for-you-today/
	
	var vmlAttributeMap = {
		"stroke-linejoin":"joinstyle",
		"joinstyle":"joinstyle",		
		"endcap":"endcap",
		"miterlimit":"miterlimit"
	},
	jsPlumbStylesheet = null;
	
	if (document.createStyleSheet && document.namespaces) {			
		
		var ruleClasses = [
				".jsplumb_vml", "jsplumb\\:textbox", "jsplumb\\:oval", "jsplumb\\:rect", 
				"jsplumb\\:stroke", "jsplumb\\:shape", "jsplumb\\:group"
			],
			rule = "behavior:url(#default#VML);position:absolute;";

		jsPlumbStylesheet = document.createStyleSheet();

		for (var i = 0; i < ruleClasses.length; i++)
			jsPlumbStylesheet.addRule(ruleClasses[i], rule);

		// in this page it is also mentioned that IE requires the extra arg to the namespace
		// http://www.louisremi.com/2009/03/30/changes-in-vml-for-ie8-or-what-feature-can-the-ie-dev-team-break-for-you-today/
		// but someone commented saying they didn't need it, and it seems jsPlumb doesnt need it either.
		// var iev = document.documentMode;
		//if (!iev || iev < 8)
			document.namespaces.add("jsplumb", "urn:schemas-microsoft-com:vml");
		//else
		//	document.namespaces.add("jsplumb", "urn:schemas-microsoft-com:vml", "#default#VML");
	}
	
	jsPlumb.vml = {};
	
	var scale = 1000,

    _groupMap = {},
    _getGroup = function(container, connectorClass) {
        var id = jsPlumb.getId(container),
            g = _groupMap[id];
        if(!g) {
            g = _node("group", [0,0,scale, scale], {"class":connectorClass});
            //g.style.position=absolute;
            //g["coordsize"] = "1000,1000";
            g.style.backgroundColor="red";
            _groupMap[id] = g;
            //jsPlumb.appendElement(g, container);  // todo if this gets reinstated, remember to use the current jsplumb instance.
            //jsPlumb.CurrentLibrary.getDOMElement(container).appendChild(g);
            //document.body.appendChild(g);
        }
        return g;
    },
	_atts = function(o, atts) {
		for (var i in atts) { 
			// IE8 fix: setattribute does not work after an element has been added to the dom!
			// http://www.louisremi.com/2009/03/30/changes-in-vml-for-ie8-or-what-feature-can-the-ie-dev-team-break-for-you-today/
			//o.setAttribute(i, atts[i]);

			/*There is an additional problem when accessing VML elements by using get/setAttribute. The simple solution is following:

			if (document.documentMode==8) {
			ele.opacity=1;
			} else {
			ele.setAttribute(‘opacity’,1);
			}
			*/

			o[i] = atts[i];
		}
	},
	_node = function(name, d, atts, parent, _jsPlumb, deferToJsPlumbContainer) {
		atts = atts || {};
		var o = document.createElement("jsplumb:" + name);
		if (deferToJsPlumbContainer)
			_jsPlumb.appendElement(o, parent);
		else
			jsPlumb.CurrentLibrary.appendElement(o, parent);
		o.className = (atts["class"] ? atts["class"] + " " : "") + "jsplumb_vml";
		_pos(o, d);
		_atts(o, atts);
		return o;
	},
	_pos = function(o,d, zIndex) {
		o.style.left = d[0] + "px";		
		o.style.top =  d[1] + "px";
		o.style.width= d[2] + "px";
		o.style.height= d[3] + "px";
		o.style.position = "absolute";
		if (zIndex)
			o.style.zIndex = zIndex;
	},
	_conv = jsPlumb.vml.convertValue = function(v) {
		return Math.floor(v * scale);
	},	
	// tests if the given style is "transparent" and then sets the appropriate opacity node to 0 if so,
	// or 1 if not.  TODO in the future, support variable opacity.
	_maybeSetOpacity = function(styleToWrite, styleToCheck, type, component) {
		if ("transparent" === styleToCheck)
			component.setOpacity(type, "0.0");
		else
			component.setOpacity(type, "1.0");
	},
	_applyStyles = function(node, style, component, _jsPlumb) {
		var styleToWrite = {};
		if (style.strokeStyle) {
			styleToWrite.stroked = "true";
			var strokeColor = jsPlumbUtil.convertStyle(style.strokeStyle, true);
			styleToWrite.strokecolor = strokeColor;
			_maybeSetOpacity(styleToWrite, strokeColor, "stroke", component);
			styleToWrite.strokeweight = style.lineWidth + "px";
		}
		else styleToWrite.stroked = "false";
		
		if (style.fillStyle) {
			styleToWrite.filled = "true";
			var fillColor = jsPlumbUtil.convertStyle(style.fillStyle, true);
			styleToWrite.fillcolor = fillColor;
			_maybeSetOpacity(styleToWrite, fillColor, "fill", component);
		}
		else styleToWrite.filled = "false";
		
		if(style.dashstyle) {
			if (component.strokeNode == null) {
				component.strokeNode = _node("stroke", [0,0,0,0], { dashstyle:style.dashstyle }, node, _jsPlumb);				
			}
			else
				component.strokeNode.dashstyle = style.dashstyle;
		}					
		else if (style["stroke-dasharray"] && style.lineWidth) {
			var sep = style["stroke-dasharray"].indexOf(",") == -1 ? " " : ",",
			parts = style["stroke-dasharray"].split(sep),
			styleToUse = "";
			for(var i = 0; i < parts.length; i++) {
				styleToUse += (Math.floor(parts[i] / style.lineWidth) + sep);
			}
			if (component.strokeNode == null) {
				component.strokeNode = _node("stroke", [0,0,0,0], { dashstyle:styleToUse }, node, _jsPlumb);				
			}
			else
				component.strokeNode.dashstyle = styleToUse;
		}
		
		_atts(node, styleToWrite);
	},
	/*
	 * Base class for Vml endpoints and connectors. Extends jsPlumbUIComponent. 
	 */
	VmlComponent = function() {				
		var self = this, renderer = {};
		jsPlumb.jsPlumbUIComponent.apply(this, arguments);	

		this.opacityNodes = {
			"stroke":null,
			"fill":null
		};
		this.initOpacityNodes = function(vml) {
			self.opacityNodes.stroke = _node("stroke", [0,0,1,1], {opacity:"0.0"}, vml, self._jsPlumb.instance);
			self.opacityNodes.fill = _node("fill", [0,0,1,1], {opacity:"0.0"}, vml, self._jsPlumb.instance);							
		};
		this.setOpacity = function(type, value) {
			var node = self.opacityNodes[type];
			if (node) node.opacity = "" + value;
		};
		var displayElements = [ ];
		this.getDisplayElements = function() { 
			return displayElements; 
		};
		
		this.appendDisplayElement = function(el, doNotAppendToCanvas) {
			if (!doNotAppendToCanvas) self.canvas.parentNode.appendChild(el);
			displayElements.push(el);
		};
	};
	jsPlumbUtil.extend(VmlComponent, jsPlumb.jsPlumbUIComponent, {
		cleanup:function() {			
			if (this.bgCanvas) jsPlumbUtil.removeElement(this.bgCanvas);
			jsPlumbUtil.removeElement(this.canvas);            				
		}
	});

	/*
	 * Base class for Vml connectors. extends VmlComponent.
	 */
	var VmlConnector = jsPlumb.ConnectorRenderers.vml = function(params) {		
		this.strokeNode = null;
		this.canvas = null;
		VmlComponent.apply(this, arguments);
		var clazz = this._jsPlumb.instance.connectorClass + (params.cssClass ? (" " + params.cssClass) : "");
		this.paint = function(style) {		
			if (style !== null) {			

				// we need to be at least 1 pixel in each direction, because otherwise coordsize gets set to
				// 0 and overlays cannot paint.
				this.w = Math.max(this.w, 1);
				this.h = Math.max(this.h, 1);

				var segments = this.getSegments(), p = { "path":"" },
                    d = [this.x, this.y, this.w, this.h];
				
				// create path from segments.	
				for (var i = 0; i < segments.length; i++) {
					p.path += jsPlumb.Segments.vml.SegmentRenderer.getPath(segments[i]);
					p.path += " ";
				}

                //*
				if (style.outlineColor) {
					var outlineWidth = style.outlineWidth || 1,
					outlineStrokeWidth = style.lineWidth + (2 * outlineWidth),
					outlineStyle = {
						strokeStyle : jsPlumbUtil.convertStyle(style.outlineColor),
						lineWidth : outlineStrokeWidth
					};
					for (var aa in vmlAttributeMap) outlineStyle[aa] = style[aa];
					
					if (this.bgCanvas == null) {						
						p["class"] = clazz;
						p.coordsize = (d[2] * scale) + "," + (d[3] * scale);
						this.bgCanvas = _node("shape", d, p, params.parent, this._jsPlumb.instance, true);						
						_pos(this.bgCanvas, d);
						this.appendDisplayElement(this.bgCanvas, true);	
						this.attachListeners(this.bgCanvas, this);					
						this.initOpacityNodes(this.bgCanvas, ["stroke"]);		
					}
					else {
						p.coordsize = (d[2] * scale) + "," + (d[3] * scale);
						_pos(this.bgCanvas, d);
						_atts(this.bgCanvas, p);
					}
					
					_applyStyles(this.bgCanvas, outlineStyle, this);
				}
				//*/
				
				if (this.canvas == null) {										
					p["class"] = clazz;
					p.coordsize = (d[2] * scale) + "," + (d[3] * scale);					
					this.canvas = _node("shape", d, p, params.parent, this._jsPlumb.instance, true);					                
                    //var group = _getGroup(params.parent);                   // test of append everything to a group
                    //group.appendChild(self.canvas);                           // sort of works but not exactly;
					//params["_jsPlumb"].appendElement(self.canvas, params.parent);    //before introduction of groups

					this.appendDisplayElement(this.canvas, true);										
					this.attachListeners(this.canvas, this);					
					this.initOpacityNodes(this.canvas, ["stroke"]);		
				}
				else {
					p.coordsize = (d[2] * scale) + "," + (d[3] * scale);
					_pos(this.canvas, d);
					_atts(this.canvas, p);
				}
				
				_applyStyles(this.canvas, style, this, this._jsPlumb.instance);
			}
		};	
				
	};
	jsPlumbUtil.extend(VmlConnector, VmlComponent, {
		reattachListeners : function() {
			if (this.canvas) this.reattachListenersForElement(this.canvas, this);
		},
		setVisible:function(v) {
			if (this.canvas) {
				this.canvas.style.display = v ? "block" : "none";
			}
			if (this.bgCanvas) {
				this.bgCanvas.style.display = v ? "block" : "none";
			}
		}
	});	
	
	/*
	 * 
	 * Base class for Vml Endpoints. extends VmlComponent.
	 * 
	 */
	var VmlEndpoint = window.VmlEndpoint = function(params) {
		VmlComponent.apply(this, arguments);
		this._jsPlumb.vml = null;//, opacityStrokeNode = null, opacityFillNode = null;
		this.canvas = document.createElement("div");
		this.canvas.style.position = "absolute";
		this._jsPlumb.clazz = this._jsPlumb.instance.endpointClass + (params.cssClass ? (" " + params.cssClass) : "");

		// TODO vml endpoint adds class to VML at constructor time.  but the addClass method adds VML
		// to the enclosing DIV. what to do?  seems like it would be better to just target the div.
		// HOWEVER...vml connection has no containing div.  why not? it feels like it should.

		//var group = _getGroup(params.parent);
        //group.appendChild(self.canvas);
		params._jsPlumb.appendElement(this.canvas, params.parent);

		this.paint = function(style, anchor) {
			var p = { }, vml = this._jsPlumb.vml;				
			
			jsPlumbUtil.sizeElement(this.canvas, this.x, this.y, this.w, this.h);
			if (this._jsPlumb.vml == null) {
				p["class"] = this._jsPlumb.clazz;
				vml = this._jsPlumb.vml = this.getVml([0,0, this.w, this.h], p, anchor, this.canvas, this._jsPlumb.instance);				
				this.attachListeners(vml, this);

				this.appendDisplayElement(vml, true);
				this.appendDisplayElement(this.canvas, true);
				
				this.initOpacityNodes(vml, ["fill"]);			
			}
			else {				
				_pos(vml, [0,0, this.w, this.h]);
				_atts(vml, p);
			}
			
			_applyStyles(vml, style, this);
		};		
	};
	jsPlumbUtil.extend(VmlEndpoint, VmlComponent, {
		reattachListeners : function() {
			if (this._jsPlumb.vml) this.reattachListenersForElement(this._jsPlumb.vml, this);
		}
	});
	
// ******************************* vml segments *****************************************************	
		
	jsPlumb.Segments.vml = {
		SegmentRenderer : {		
			getPath : function(segment) {
				return ({
					"Straight":function(segment) {
						var d = segment.params;
						return "m" + _conv(d.x1) + "," + _conv(d.y1) + " l" + _conv(d.x2) + "," + _conv(d.y2) + " e";
					},
					"Bezier":function(segment) {
						var d = segment.params;
						return "m" + _conv(d.x1) + "," + _conv(d.y1) + 
				   			" c" + _conv(d.cp1x) + "," + _conv(d.cp1y) + "," + _conv(d.cp2x) + "," + _conv(d.cp2y) + "," + _conv(d.x2) + "," + _conv(d.y2) + " e";
					},
					"Arc":function(segment) {					
						var d = segment.params,
							xmin = Math.min(d.x1, d.x2),
							xmax = Math.max(d.x1, d.x2),
							ymin = Math.min(d.y1, d.y2),
							ymax = Math.max(d.y1, d.y2),														
							sf = segment.anticlockwise ? 1 : 0,
							pathType = (segment.anticlockwise ? "at " : "wa "),
							makePosString = function() {
								if (d.loopback)
									return "0,0," + _conv(2*d.r) + "," + _conv(2 * d.r);

								var xy = [
										null,
										[ function() { return [xmin, ymin ];}, function() { return [xmin - d.r, ymin - d.r ];}],
										[ function() { return [xmin - d.r, ymin ];}, function() { return [xmin, ymin - d.r ];}],
										[ function() { return [xmin - d.r, ymin - d.r ];}, function() { return [xmin, ymin ];}],
										[ function() { return [xmin, ymin - d.r ];}, function() { return [xmin - d.r, ymin ];}]
									][segment.segment][sf]();

								return _conv(xy[0]) + "," + _conv(xy[1]) + "," + _conv(xy[0] + (2*d.r)) + "," + _conv(xy[1] + (2*d.r));
							};

						return pathType + " " + makePosString() + "," + _conv(d.x1) + "," + _conv(d.y1) + "," + _conv(d.x2) + "," + _conv(d.y2) + " e";												
					}
						
				})[segment.type](segment);	
			}
		}
	};
	
// ******************************* /vml segments *****************************************************	

// ******************************* vml endpoints *****************************************************
	
	jsPlumb.Endpoints.vml.Dot = function() {
		jsPlumb.Endpoints.Dot.apply(this, arguments);
		VmlEndpoint.apply(this, arguments);
		this.getVml = function(d, atts, anchor, parent, _jsPlumb) { return _node("oval", d, atts, parent, _jsPlumb); };
	};
	jsPlumbUtil.extend(jsPlumb.Endpoints.vml.Dot, VmlEndpoint);
	
	jsPlumb.Endpoints.vml.Rectangle = function() {
		jsPlumb.Endpoints.Rectangle.apply(this, arguments);
		VmlEndpoint.apply(this, arguments);
		this.getVml = function(d, atts, anchor, parent, _jsPlumb) { return _node("rect", d, atts, parent, _jsPlumb); };
	};
	jsPlumbUtil.extend(jsPlumb.Endpoints.vml.Rectangle, VmlEndpoint);
	
	/*
	 * VML Image Endpoint is the same as the default image endpoint.
	 */
	jsPlumb.Endpoints.vml.Image = jsPlumb.Endpoints.Image;
	
	/**
	 * placeholder for Blank endpoint in vml renderer.
	 */
	jsPlumb.Endpoints.vml.Blank = jsPlumb.Endpoints.Blank;
	
// ******************************* /vml endpoints *****************************************************	

// ******************************* vml overlays *****************************************************
	
	/**
	 * VML Label renderer. uses the default label renderer (which adds an element to the DOM)
	 */
	jsPlumb.Overlays.vml.Label  = jsPlumb.Overlays.Label;
	
	/**
	 * VML Custom renderer. uses the default Custom renderer (which adds an element to the DOM)
	 */
	jsPlumb.Overlays.vml.Custom = jsPlumb.Overlays.Custom;
	
	/**
	 * Abstract VML arrow superclass
	 */
	var AbstractVmlArrowOverlay = function(superclass, originalArgs) {
    	superclass.apply(this, originalArgs);
    	VmlComponent.apply(this, originalArgs);
    	var self = this, path = null;
    	self.canvas = null; 
    	self.isAppendedAtTopLevel = true;
    	var getPath = function(d) {    		
    		return "m " + _conv(d.hxy.x) + "," + _conv(d.hxy.y) +
    		       " l " + _conv(d.tail[0].x) + "," + _conv(d.tail[0].y) + 
    		       " " + _conv(d.cxy.x) + "," + _conv(d.cxy.y) + 
    		       " " + _conv(d.tail[1].x) + "," + _conv(d.tail[1].y) + 
    		       " x e";
    	};
    	this.paint = function(params, containerExtents) {
    		// only draws for connectors, not endpoints.
    		if (params.component.canvas && containerExtents) {
	    		var p = {}, d = params.d, connector = params.component;
				if (params.strokeStyle) {
					p.stroked = "true";
					p.strokecolor = jsPlumbUtil.convertStyle(params.strokeStyle, true);    				
				}
				if (params.lineWidth) p.strokeweight = params.lineWidth + "px";
				if (params.fillStyle) {
					p.filled = "true";
					p.fillcolor = params.fillStyle;
				}			

				var xmin = Math.min(d.hxy.x, d.tail[0].x, d.tail[1].x, d.cxy.x),
					ymin = Math.min(d.hxy.y, d.tail[0].y, d.tail[1].y, d.cxy.y),
					xmax = Math.max(d.hxy.x, d.tail[0].x, d.tail[1].x, d.cxy.x),
					ymax = Math.max(d.hxy.y, d.tail[0].y, d.tail[1].y, d.cxy.y),
					w = Math.abs(xmax - xmin),
					h = Math.abs(ymax - ymin),
					dim = [xmin, ymin, w, h];

				// for VML, we create overlays using shapes that have the same dimensions and
				// coordsize as their connector - overlays calculate themselves relative to the
				// connector (it's how it's been done since the original canvas implementation, because
				// for canvas that makes sense).
				p.path = getPath(d);
				p.coordsize = (connector.w * scale) + "," + (connector.h * scale);			
				
				dim[0] = connector.x;
				dim[1] = connector.y;
				dim[2] = connector.w;
				dim[3] = connector.h;
				
	    		if (self.canvas == null) {
	    			var overlayClass = connector._jsPlumb.overlayClass || "";
	    			var clazz = originalArgs && (originalArgs.length == 1) ? (originalArgs[0].cssClass || "") : "";
	    			p["class"] = clazz + " " + overlayClass;
					self.canvas = _node("shape", dim, p, connector.canvas.parentNode, connector._jsPlumb.instance, true);								
					connector.appendDisplayElement(self.canvas, true);
					self.attachListeners(self.canvas, connector);
					self.attachListeners(self.canvas, self);
				}
				else {				
					_pos(self.canvas, dim);
					_atts(self.canvas, p);
				}    		
			}
    	};
    	
    	this.reattachListeners = function() {
			if (self.canvas) self.reattachListenersForElement(self.canvas, self);
		};

		this.cleanup = function() {
    		if (self.canvas != null) jsPlumb.CurrentLibrary.removeElement(self.canvas);
    	};
    };
    jsPlumbUtil.extend(AbstractVmlArrowOverlay, [VmlComponent, jsPlumb.Overlays.AbstractOverlay], {
    	setVisible : function(state) {
    	    this.canvas.style.display = state ? "block" : "none";
    	}
    });
	
	jsPlumb.Overlays.vml.Arrow = function() {
    	AbstractVmlArrowOverlay.apply(this, [jsPlumb.Overlays.Arrow, arguments]);    	
    };
    jsPlumbUtil.extend(jsPlumb.Overlays.vml.Arrow, [ jsPlumb.Overlays.Arrow, AbstractVmlArrowOverlay ]);
    
    jsPlumb.Overlays.vml.PlainArrow = function() {
    	AbstractVmlArrowOverlay.apply(this, [jsPlumb.Overlays.PlainArrow, arguments]);    	
    };
    jsPlumbUtil.extend(jsPlumb.Overlays.vml.PlainArrow, [ jsPlumb.Overlays.PlainArrow, AbstractVmlArrowOverlay ]);
    
    jsPlumb.Overlays.vml.Diamond = function() {
    	AbstractVmlArrowOverlay.apply(this, [jsPlumb.Overlays.Diamond, arguments]);    	
    };
    jsPlumbUtil.extend(jsPlumb.Overlays.vml.Diamond, [ jsPlumb.Overlays.Diamond, AbstractVmlArrowOverlay ]);
    
// ******************************* /vml overlays *****************************************************    
    
})();
/*
 * jsPlumb
 * 
 * Title:jsPlumb 1.5.5
 * 
 * Provides a way to visually connect elements on an HTML page, using either SVG, Canvas
 * elements, or VML.  
 * 
 * This file contains the jQuery adapter.
 *
 * Copyright (c) 2010 - 2013 Simon Porritt (http://jsplumb.org)
 * 
 * http://jsplumb.org
 * http://github.com/sporritt/jsplumb
 * http://code.google.com/p/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */ 
/* 
 * the library specific functions, such as find offset, get id, get attribute, extend etc.  
 * the full list is:
 * 
 * addClass				adds a class to the given element
 * animate				calls the underlying library's animate functionality
 * appendElement		appends a child element to a parent element.
 * bind					binds some event to an element
 * dragEvents			a dictionary of event names
 * extend				extend some js object with another.  probably not overly necessary; jsPlumb could just do this internally.
 * getDragObject		gets the object that is being dragged, by extracting it from the arguments passed to a drag callback
 * getDragScope			gets the drag scope for a given element.
 * getDropScope			gets the drop scope for a given element.
 * getElementObject		turns an id or dom element into an element object of the underlying library's type.
 * getOffset			gets an element's offset
 * getOriginalEvent     gets the original browser event from some wrapper event
 * getPageXY			gets the page event's xy location.
 * getParent			gets the parent of some element.
 * getScrollLeft		gets an element's scroll left.  TODO: is this actually used?  will it be?
 * getScrollTop			gets an element's scroll top.  TODO: is this actually used?  will it be?
 * getSize				gets an element's size.
 * getUIPosition		gets the position of some element that is currently being dragged, by extracting it from the arguments passed to a drag callback.
 * hasClass				returns whether or not the given element has the given class.
 * initDraggable		initializes an element to be draggable 
 * initDroppable		initializes an element to be droppable
 * isDragSupported		returns whether or not drag is supported for some element.
 * isDropSupported		returns whether or not drop is supported for some element.
 * removeClass			removes a class from a given element.
 * removeElement		removes some element completely from the DOM. 
 * setDragFilter		sets a filter for some element that indicates areas of the element that should not respond to dragging.
 * setDraggable			sets whether or not some element should be draggable.
 * setDragScope			sets the drag scope for a given element.
 * setOffset			sets the offset of some element.
 * trigger				triggers some event on an element.
 * unbind				unbinds some listener from some element.
 */
(function($) {	
	
	//var getBoundingClientRectSupported = "getBoundingClientRect" in document.documentElement;

	var _getElementObject = function(el) {			
		return typeof(el) == "string" ? $("#" + el) : $(el);
	};

	jsPlumb.CurrentLibrary = {					        
		
		/**
		 * adds the given class to the element object.
		 */
		addClass : function(el, clazz) {
			el = _getElementObject(el);
			try {
				if (el[0].className.constructor == SVGAnimatedString) {
					jsPlumbUtil.svg.addClass(el[0], clazz);                    
				}
			}
			catch (e) {
				// SVGAnimatedString not supported; no problem.
			}
            try {                
                el.addClass(clazz);
            }
            catch (e) {
                // you probably have jQuery 1.9 and Firefox.  
            }
		},
		
		/**
		 * animates the given element.
		 */
		animate : function(el, properties, options) {
			el.animate(properties, options);
		},				
		
		/**
		 * appends the given child to the given parent.

TODO: REMOVE!

		 */
		appendElement : function(child, parent) {
			_getElementObject(parent).append(child);			
		},   

		/**
		* executes an ajax call.
		*/
		ajax : function(params) {
			params = params || {};
			params.type = params.type || "get";
			$.ajax(params);
		},
		
		/**
		 * event binding wrapper.  it just so happens that jQuery uses 'bind' also.  yui3, for example,
		 * uses 'on'.
		 */
		bind : function(el, event, callback) {
			el = _getElementObject(el);
			el.bind(event, callback);
		},

		destroyDraggable : function(el) {
			if ($(el).data("draggable"))
				$(el).draggable("destroy");
		},

		destroyDroppable : function(el) {
			if ($(el).data("droppable"))
				$(el).droppable("destroy");
		},
		
		/**
         * mapping of drag events for jQuery
         */
		dragEvents : {
			'start':'start', 'stop':'stop', 'drag':'drag', 'step':'step',
			'over':'over', 'out':'out', 'drop':'drop', 'complete':'complete'
		},
				
		/**
		 * wrapper around the library's 'extend' functionality (which it hopefully has.
		 * otherwise you'll have to do it yourself). perhaps jsPlumb could do this for you
		 * instead.  it's not like its hard.
		 */
		extend : function(o1, o2) {
			return $.extend(o1, o2);
		},		
		
		getClientXY : function(eventObject) {
			return [eventObject.clientX, eventObject.clientY];
		},
		
		/**
		 * takes the args passed to an event function and returns you an object representing that which is being dragged.
		 */
		getDragObject : function(eventArgs) {
			return eventArgs[1].draggable || eventArgs[1].helper;
		},
		
		getDragScope : function(el) {
			return $(el).draggable("option", "scope");
		},

		getDropEvent : function(args) {
			return args[0];
		},
		
		getDropScope : function(el) {
			return $(el).droppable("option", "scope");		
		},

		/**
		* gets a DOM element from the given input, which might be a string (in which case we just do document.getElementById),
		* a selector (in which case we return el[0]), or a DOM element already (we assume this if it's not either of the other
		* two cases).  this is the opposite of getElementObject below.
		*/
		getDOMElement : function(el) {
			if (el == null) return null;
			if (typeof(el) == "string") return document.getElementById(el);
			else if (el.context || el.length != null) return el[0];
			else return el;
		},
	
		/**
		 * gets an "element object" from the given input.  this means an object that is used by the
		 * underlying library on which jsPlumb is running.  'el' may already be one of these objects,
		 * in which case it is returned as-is.  otherwise, 'el' is a String, the library's lookup 
		 * function is used to find the element, using the given String as the element's id.
		 * 
		 */		
		getElementObject : _getElementObject,
		
		/**
		  * gets the offset for the element object.  this should return a js object like this:
		  *
		  * { left:xxx, top: xxx }
		 */
		getOffset : function(el) {
			return el.offset();
		},

		getOriginalEvent : function(e) {
			return e.originalEvent;
		},
		
		getPageXY : function(eventObject) {
			return [eventObject.pageX, eventObject.pageY];
		},
		
		getParent : function(el) {
			return _getElementObject(el).parent();
		},
														
		getScrollLeft : function(el) {
			return el.scrollLeft();
		},
		
		getScrollTop : function(el) {
			return el.scrollTop();
		},
		
		getSelector : function(context, spec) {
            if (arguments.length == 2)
                return _getElementObject(context).find(spec);
            else
                return $(context);
		},
		
		/**
		 * gets the size for the element object, in an array : [ width, height ].
		 */
		getSize : function(el) {
			el = $(el);
			return [el.outerWidth(), el.outerHeight()];
		},

        getTagName : function(el) {
            var e = _getElementObject(el);
            return e.length > 0 ? e[0].tagName : null;
        },
		
		/**
		 * takes the args passed to an event function and returns you an object that gives the
		 * position of the object being moved, as a js object with the same params as the result of
		 * getOffset, ie: { left: xxx, top: xxx }.
		 * 
		 * different libraries have different signatures for their event callbacks.  
		 * see getDragObject as well
		 */
		getUIPosition : function(eventArgs, zoom) {
			
			zoom = zoom || 1;
			// this code is a workaround for the case that the element being dragged has a margin set on it. jquery UI passes
			// in the wrong offset if the element has a margin (it doesn't take the margin into account).  the getBoundingClientRect
			// method, which is in pretty much all browsers now, reports the right numbers.  but it introduces a noticeable lag, which
			// i don't like.
            
			/*if ( getBoundingClientRectSupported ) {
				var r = eventArgs[1].helper[0].getBoundingClientRect();
				return { left : r.left, top: r.top };
			} else {*/
			if (eventArgs.length == 1) {
				ret = { left: eventArgs[0].pageX, top:eventArgs[0].pageY };
			}
			else {
				var ui = eventArgs[1],
				  _offset = ui.offset;
				  
				ret = _offset || ui.absolutePosition;
				
				// adjust ui position to account for zoom, because jquery ui does not do this.
				ui.position.left /= zoom;
				ui.position.top /= zoom;
			}
            return { left:ret.left / zoom, top: ret.top / zoom };
		},		
		
		hasClass : function(el, clazz) {
			return el.hasClass(clazz);
		},
		
		/**
		 * initialises the given element to be draggable.
		 */
		initDraggable : function(el, options, isPlumbedComponent, _jsPlumb) {
			options = options || {};
			el = $(el);

			options.start = jsPlumbUtil.wrap(options.start, function() {
				$("body").addClass(_jsPlumb.dragSelectClass);
			}, false);

			options.stop = jsPlumbUtil.wrap(options.stop, function() {
				$("body").removeClass(_jsPlumb.dragSelectClass);
			});

			// remove helper directive if present and no override
			if (!options.doNotRemoveHelper)
				options.helper = null;
			if (isPlumbedComponent)
				options.scope = options.scope || jsPlumb.Defaults.Scope;
			el.draggable(options);
		},
		
		/**
		 * initialises the given element to be droppable.
		 */
		initDroppable : function(el, options) {
			options.scope = options.scope || jsPlumb.Defaults.Scope;
			$(el).droppable(options);
		},
		
		isAlreadyDraggable : function(el) {
			return $(el).hasClass("ui-draggable");
		},
		
		/**
		 * returns whether or not drag is supported (by the library, not whether or not it is disabled) for the given element.
		 */
		isDragSupported : function(el, options) {
			return $(el).draggable;
		},				
						
		/**
		 * returns whether or not drop is supported (by the library, not whether or not it is disabled) for the given element.
		 */
		isDropSupported : function(el, options) {
			return $(el).droppable;
		},							
		
		/**
		 * removes the given class from the element object.
		 */
		removeClass : function(el, clazz) {
			el = _getElementObject(el);
			try {
				if (el[0].className.constructor == SVGAnimatedString) {
					jsPlumbUtil.svg.removeClass(el[0], clazz);
                    return;
				}
			}
			catch (e) {
				// SVGAnimatedString not supported; no problem.
			}
			el.removeClass(clazz);
		},
		
		removeElement : function(element) {			
			_getElementObject(element).remove();
		},		

		setDragFilter : function(el, filter) {
			if (jsPlumb.CurrentLibrary.isAlreadyDraggable(el))
				el.draggable("option", "cancel", filter);
		},
		
		setDraggable : function(el, draggable) {
			el.draggable("option", "disabled", !draggable);
		},
		
		setDragScope : function(el, scope) {
			el.draggable("option", "scope", scope);
		},
		
		setOffset : function(el, o) {
			_getElementObject(el).offset(o);
		},
		
		/**
		 * note that jquery ignores the name of the event you wanted to trigger, and figures it out for itself.
		 * the other libraries do not.  yui, in fact, cannot even pass an original event.  we have to pull out stuff
		 * from the originalEvent to put in an options object for YUI. 
		 * @param el
		 * @param event
		 * @param originalEvent
		 */
		trigger : function(el, event, originalEvent) {
			var h = jQuery._data(_getElementObject(el)[0], "handle");
            h(originalEvent);
		},
		
		unbind : function(el, event, callback) {
			el = _getElementObject(el);
			el.unbind(event, callback);
		}
	};
	
	$(document).ready(jsPlumb.init);
	
})(jQuery);

