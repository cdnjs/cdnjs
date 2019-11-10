/*! JointJS v2.1.4 (2018-08-01) - JavaScript diagramming library


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
(function(root, factory) {

    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define([], factory);

    } else if (typeof exports === 'object') {

        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();

    } else {

        // Browser globals.
        root.g = factory();
    }

}(this, function() {

// Geometry library.
// -----------------

var g = {};

(function(g) {

    // Declare shorthands to the most used math functions.
    var math = Math;
    var abs = math.abs;
    var cos = math.cos;
    var sin = math.sin;
    var sqrt = math.sqrt;
    var min = math.min;
    var max = math.max;
    var atan2 = math.atan2;
    var round = math.round;
    var floor = math.floor;
    var PI = math.PI;
    var random = math.random;
    var pow = math.pow;

    g.bezier = {

        // Cubic Bezier curve path through points.
        // @deprecated
        // @param {array} points Array of points through which the smooth line will go.
        // @return {array} SVG Path commands as an array
        curveThroughPoints: function(points) {

            console.warn('deprecated');

            return new Path(Curve.throughPoints(points)).serialize();
        },

        // Get open-ended Bezier Spline Control Points.
        // @deprecated
        // @param knots Input Knot Bezier spline points (At least two points!).
        // @param firstControlPoints Output First Control points. Array of knots.length - 1 length.
        // @param secondControlPoints Output Second Control points. Array of knots.length - 1 length.
        getCurveControlPoints: function(knots) {

            console.warn('deprecated');

            var firstControlPoints = [];
            var secondControlPoints = [];
            var n = knots.length - 1;
            var i;

            // Special case: Bezier curve should be a straight line.
            if (n == 1) {
                // 3P1 = 2P0 + P3
                firstControlPoints[0] = new Point(
                    (2 * knots[0].x + knots[1].x) / 3,
                    (2 * knots[0].y + knots[1].y) / 3
                );

                // P2 = 2P1 – P0
                secondControlPoints[0] = new Point(
                    2 * firstControlPoints[0].x - knots[0].x,
                    2 * firstControlPoints[0].y - knots[0].y
                );

                return [firstControlPoints, secondControlPoints];
            }

            // Calculate first Bezier control points.
            // Right hand side vector.
            var rhs = [];

            // Set right hand side X values.
            for (i = 1; i < n - 1; i++) {
                rhs[i] = 4 * knots[i].x + 2 * knots[i + 1].x;
            }

            rhs[0] = knots[0].x + 2 * knots[1].x;
            rhs[n - 1] = (8 * knots[n - 1].x + knots[n].x) / 2.0;

            // Get first control points X-values.
            var x = this.getFirstControlPoints(rhs);

            // Set right hand side Y values.
            for (i = 1; i < n - 1; ++i) {
                rhs[i] = 4 * knots[i].y + 2 * knots[i + 1].y;
            }

            rhs[0] = knots[0].y + 2 * knots[1].y;
            rhs[n - 1] = (8 * knots[n - 1].y + knots[n].y) / 2.0;

            // Get first control points Y-values.
            var y = this.getFirstControlPoints(rhs);

            // Fill output arrays.
            for (i = 0; i < n; i++) {
                // First control point.
                firstControlPoints.push(new Point(x[i], y[i]));

                // Second control point.
                if (i < n - 1) {
                    secondControlPoints.push(new Point(
                        2 * knots [i + 1].x - x[i + 1],
                        2 * knots[i + 1].y - y[i + 1]
                    ));

                } else {
                    secondControlPoints.push(new Point(
                        (knots[n].x + x[n - 1]) / 2,
                        (knots[n].y + y[n - 1]) / 2)
                    );
                }
            }

            return [firstControlPoints, secondControlPoints];
        },

        // Solves a tridiagonal system for one of coordinates (x or y) of first Bezier control points.
        // @deprecated
        // @param rhs Right hand side vector.
        // @return Solution vector.
        getFirstControlPoints: function(rhs) {

            console.warn('deprecated');

            var n = rhs.length;
            // `x` is a solution vector.
            var x = [];
            var tmp = [];
            var b = 2.0;

            x[0] = rhs[0] / b;

            // Decomposition and forward substitution.
            for (var i = 1; i < n; i++) {
                tmp[i] = 1 / b;
                b = (i < n - 1 ? 4.0 : 3.5) - tmp[i];
                x[i] = (rhs[i] - x[i - 1]) / b;
            }

            for (i = 1; i < n; i++) {
                // Backsubstitution.
                x[n - i - 1] -= tmp[n - i] * x[n - i];
            }

            return x;
        },

        // Divide a Bezier curve into two at point defined by value 't' <0,1>.
        // Using deCasteljau algorithm. http://math.stackexchange.com/a/317867
        // @deprecated
        // @param control points (start, control start, control end, end)
        // @return a function that accepts t and returns 2 curves.
        getCurveDivider: function(p0, p1, p2, p3) {

            console.warn('deprecated');

            var curve = new Curve(p0, p1, p2, p3);

            return function divideCurve(t) {

                var divided = curve.divide(t);

                return [{
                    p0: divided[0].start,
                    p1: divided[0].controlPoint1,
                    p2: divided[0].controlPoint2,
                    p3: divided[0].end
                }, {
                    p0: divided[1].start,
                    p1: divided[1].controlPoint1,
                    p2: divided[1].controlPoint2,
                    p3: divided[1].end
                }];
            };
        },

        // Solves an inversion problem -- Given the (x, y) coordinates of a point which lies on
        // a parametric curve x = x(t)/w(t), y = y(t)/w(t), ﬁnd the parameter value t
        // which corresponds to that point.
        // @deprecated
        // @param control points (start, control start, control end, end)
        // @return a function that accepts a point and returns t.
        getInversionSolver: function(p0, p1, p2, p3) {

            console.warn('deprecated');

            var curve = new Curve(p0, p1, p2, p3);

            return function solveInversion(p) {

                return curve.closestPointT(p);
            };
        }
    };

    var Curve = g.Curve = function(p1, p2, p3, p4) {

        if (!(this instanceof Curve)) {
            return new Curve(p1, p2, p3, p4);
        }

        if (p1 instanceof Curve) {
            return new Curve(p1.start, p1.controlPoint1, p1.controlPoint2, p1.end);
        }

        this.start = new Point(p1);
        this.controlPoint1 = new Point(p2);
        this.controlPoint2 = new Point(p3);
        this.end = new Point(p4);
    };

    // Curve passing through points.
    // Ported from C# implementation by Oleg V. Polikarpotchkin and Peter Lee (http://www.codeproject.com/KB/graphics/BezierSpline.aspx).
    // @param {array} points Array of points through which the smooth line will go.
    // @return {array} curves.
    Curve.throughPoints = (function() {

        // Solves a tridiagonal system for one of coordinates (x or y) of first Bezier control points.
        // @param rhs Right hand side vector.
        // @return Solution vector.
        function getFirstControlPoints(rhs) {

            var n = rhs.length;
            // `x` is a solution vector.
            var x = [];
            var tmp = [];
            var b = 2.0;

            x[0] = rhs[0] / b;

            // Decomposition and forward substitution.
            for (var i = 1; i < n; i++) {
                tmp[i] = 1 / b;
                b = (i < n - 1 ? 4.0 : 3.5) - tmp[i];
                x[i] = (rhs[i] - x[i - 1]) / b;
            }

            for (i = 1; i < n; i++) {
                // Backsubstitution.
                x[n - i - 1] -= tmp[n - i] * x[n - i];
            }

            return x;
        }

        // Get open-ended Bezier Spline Control Points.
        // @param knots Input Knot Bezier spline points (At least two points!).
        // @param firstControlPoints Output First Control points. Array of knots.length - 1 length.
        // @param secondControlPoints Output Second Control points. Array of knots.length - 1 length.
        function getCurveControlPoints(knots) {

            var firstControlPoints = [];
            var secondControlPoints = [];
            var n = knots.length - 1;
            var i;

            // Special case: Bezier curve should be a straight line.
            if (n == 1) {
                // 3P1 = 2P0 + P3
                firstControlPoints[0] = new Point(
                    (2 * knots[0].x + knots[1].x) / 3,
                    (2 * knots[0].y + knots[1].y) / 3
                );

                // P2 = 2P1 – P0
                secondControlPoints[0] = new Point(
                    2 * firstControlPoints[0].x - knots[0].x,
                    2 * firstControlPoints[0].y - knots[0].y
                );

                return [firstControlPoints, secondControlPoints];
            }

            // Calculate first Bezier control points.
            // Right hand side vector.
            var rhs = [];

            // Set right hand side X values.
            for (i = 1; i < n - 1; i++) {
                rhs[i] = 4 * knots[i].x + 2 * knots[i + 1].x;
            }

            rhs[0] = knots[0].x + 2 * knots[1].x;
            rhs[n - 1] = (8 * knots[n - 1].x + knots[n].x) / 2.0;

            // Get first control points X-values.
            var x = getFirstControlPoints(rhs);

            // Set right hand side Y values.
            for (i = 1; i < n - 1; ++i) {
                rhs[i] = 4 * knots[i].y + 2 * knots[i + 1].y;
            }

            rhs[0] = knots[0].y + 2 * knots[1].y;
            rhs[n - 1] = (8 * knots[n - 1].y + knots[n].y) / 2.0;

            // Get first control points Y-values.
            var y = getFirstControlPoints(rhs);

            // Fill output arrays.
            for (i = 0; i < n; i++) {
                // First control point.
                firstControlPoints.push(new Point(x[i], y[i]));

                // Second control point.
                if (i < n - 1) {
                    secondControlPoints.push(new Point(
                        2 * knots [i + 1].x - x[i + 1],
                        2 * knots[i + 1].y - y[i + 1]
                    ));

                } else {
                    secondControlPoints.push(new Point(
                        (knots[n].x + x[n - 1]) / 2,
                        (knots[n].y + y[n - 1]) / 2
                    ));
                }
            }

            return [firstControlPoints, secondControlPoints];
        }

        return function(points) {

            if (!points || (Array.isArray(points) && points.length < 2)) {
                throw new Error('At least 2 points are required');
            }

            var controlPoints = getCurveControlPoints(points);

            var curves = [];
            var n = controlPoints[0].length;
            for (var i = 0; i < n; i++) {

                var controlPoint1 = new Point(controlPoints[0][i].x, controlPoints[0][i].y);
                var controlPoint2 = new Point(controlPoints[1][i].x, controlPoints[1][i].y);

                curves.push(new Curve(points[i], controlPoint1, controlPoint2, points[i + 1]));
            }

            return curves;
        };
    })();

    Curve.prototype = {

        // Returns a bbox that tightly envelops the curve.
        bbox: function() {

            var start = this.start;
            var controlPoint1 = this.controlPoint1;
            var controlPoint2 = this.controlPoint2;
            var end = this.end;

            var x0 = start.x;
            var y0 = start.y;
            var x1 = controlPoint1.x;
            var y1 = controlPoint1.y;
            var x2 = controlPoint2.x;
            var y2 = controlPoint2.y;
            var x3 = end.x;
            var y3 = end.y;

            var points = new Array(); // local extremes
            var tvalues = new Array(); // t values of local extremes
            var bounds = [new Array(), new Array()];

            var a, b, c, t;
            var t1, t2;
            var b2ac, sqrtb2ac;

            for (var i = 0; i < 2; ++i) {

                if (i === 0) {
                    b = 6 * x0 - 12 * x1 + 6 * x2;
                    a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
                    c = 3 * x1 - 3 * x0;

                } else {
                    b = 6 * y0 - 12 * y1 + 6 * y2;
                    a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
                    c = 3 * y1 - 3 * y0;
                }

                if (abs(a) < 1e-12) { // Numerical robustness
                    if (abs(b) < 1e-12) { // Numerical robustness
                        continue;
                    }

                    t = -c / b;
                    if ((0 < t) && (t < 1)) tvalues.push(t);

                    continue;
                }

                b2ac = b * b - 4 * c * a;
                sqrtb2ac = sqrt(b2ac);

                if (b2ac < 0) continue;

                t1 = (-b + sqrtb2ac) / (2 * a);
                if ((0 < t1) && (t1 < 1)) tvalues.push(t1);

                t2 = (-b - sqrtb2ac) / (2 * a);
                if ((0 < t2) && (t2 < 1)) tvalues.push(t2);
            }

            var j = tvalues.length;
            var jlen = j;
            var mt;
            var x, y;

            while (j--) {
                t = tvalues[j];
                mt = 1 - t;

                x = (mt * mt * mt * x0) + (3 * mt * mt * t * x1) + (3 * mt * t * t * x2) + (t * t * t * x3);
                bounds[0][j] = x;

                y = (mt * mt * mt * y0) + (3 * mt * mt * t * y1) + (3 * mt * t * t * y2) + (t * t * t * y3);
                bounds[1][j] = y;

                points[j] = { X: x, Y: y };
            }

            tvalues[jlen] = 0;
            tvalues[jlen + 1] = 1;

            points[jlen] = { X: x0, Y: y0 };
            points[jlen + 1] = { X: x3, Y: y3 };

            bounds[0][jlen] = x0;
            bounds[1][jlen] = y0;

            bounds[0][jlen + 1] = x3;
            bounds[1][jlen + 1] = y3;

            tvalues.length = jlen + 2;
            bounds[0].length = jlen + 2;
            bounds[1].length = jlen + 2;
            points.length = jlen + 2;

            var left = min.apply(null, bounds[0]);
            var top = min.apply(null, bounds[1]);
            var right = max.apply(null, bounds[0]);
            var bottom = max.apply(null, bounds[1]);

            return new Rect(left, top, (right - left), (bottom - top));
        },

        clone: function() {

            return new Curve(this.start, this.controlPoint1, this.controlPoint2, this.end);
        },

        // Returns the point on the curve closest to point `p`
        closestPoint: function(p, opt) {

            return this.pointAtT(this.closestPointT(p, opt));
        },

        closestPointLength: function(p, opt) {

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var subdivisions = (opt.subdivisions === undefined) ? this.getSubdivisions({ precision: precision }) : opt.subdivisions;
            var localOpt = { precision: precision, subdivisions: subdivisions };

            return this.lengthAtT(this.closestPointT(p, localOpt), localOpt);
        },

        closestPointNormalizedLength: function(p, opt) {

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var subdivisions = (opt.subdivisions === undefined) ? this.getSubdivisions({ precision: precision }) : opt.subdivisions;
            var localOpt = { precision: precision, subdivisions: subdivisions };

            var cpLength = this.closestPointLength(p, localOpt);
            if (!cpLength) return 0;

            var length = this.length(localOpt);
            if (length === 0) return 0;

            return cpLength / length;
        },

        // Returns `t` of the point on the curve closest to point `p`
        closestPointT: function(p, opt) {

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var subdivisions = (opt.subdivisions === undefined) ? this.getSubdivisions({ precision: precision }) : opt.subdivisions;
            // does not use localOpt

            // identify the subdivision that contains the point:
            var investigatedSubdivision;
            var investigatedSubdivisionStartT; // assume that subdivisions are evenly spaced
            var investigatedSubdivisionEndT;
            var distFromStart; // distance of point from start of baseline
            var distFromEnd; // distance of point from end of baseline
            var minSumDist; // lowest observed sum of the two distances
            var n = subdivisions.length;
            var subdivisionSize = (n ? (1 / n) : 0);
            for (var i = 0; i < n; i++) {

                var currentSubdivision = subdivisions[i];

                var startDist = currentSubdivision.start.distance(p);
                var endDist = currentSubdivision.end.distance(p);
                var sumDist = startDist + endDist;

                // check that the point is closest to current subdivision and not any other
                if (!minSumDist || (sumDist < minSumDist)) {
                    investigatedSubdivision = currentSubdivision;

                    investigatedSubdivisionStartT = i * subdivisionSize;
                    investigatedSubdivisionEndT = (i + 1) * subdivisionSize;

                    distFromStart = startDist;
                    distFromEnd = endDist;

                    minSumDist = sumDist;
                }
            }

            var precisionRatio = pow(10, -precision);

            // recursively divide investigated subdivision:
            // until distance between baselinePoint and closest path endpoint is within 10^(-precision)
            // then return the closest endpoint of that final subdivision
            while (true) {

                // check if we have reached required observed precision
                var startPrecisionRatio;
                var endPrecisionRatio;

                startPrecisionRatio = (distFromStart ? (abs(distFromStart - distFromEnd) / distFromStart) : 0);
                endPrecisionRatio = (distFromEnd ? (abs(distFromStart - distFromEnd) / distFromEnd) : 0);
                if ((startPrecisionRatio < precisionRatio) || (endPrecisionRatio) < precisionRatio) {
                    return ((distFromStart <= distFromEnd) ? investigatedSubdivisionStartT : investigatedSubdivisionEndT);
                }

                // otherwise, set up for next iteration
                var divided = investigatedSubdivision.divide(0.5);
                subdivisionSize /= 2;

                var startDist1 = divided[0].start.distance(p);
                var endDist1 = divided[0].end.distance(p);
                var sumDist1 = startDist1 + endDist1;

                var startDist2 = divided[1].start.distance(p);
                var endDist2 = divided[1].end.distance(p);
                var sumDist2 = startDist2 + endDist2;

                if (sumDist1 <= sumDist2) {
                    investigatedSubdivision = divided[0];

                    investigatedSubdivisionEndT -= subdivisionSize; // subdivisionSize was already halved

                    distFromStart = startDist1;
                    distFromEnd = endDist1;

                } else {
                    investigatedSubdivision = divided[1];

                    investigatedSubdivisionStartT += subdivisionSize; // subdivisionSize was already halved

                    distFromStart = startDist2;
                    distFromEnd = endDist2;
                }
            }
        },

        closestPointTangent: function(p, opt) {

            return this.tangentAtT(this.closestPointT(p, opt));
        },

        // Divides the curve into two at point defined by `t` between 0 and 1.
        // Using de Casteljau's algorithm (http://math.stackexchange.com/a/317867).
        // Additional resource: https://pomax.github.io/bezierinfo/#decasteljau
        divide: function(t) {

            var start = this.start;
            var controlPoint1 = this.controlPoint1;
            var controlPoint2 = this.controlPoint2;
            var end = this.end;

            // shortcuts for `t` values that are out of range
            if (t <= 0) {
                return [
                    new Curve(start, start, start, start),
                    new Curve(start, controlPoint1, controlPoint2, end)
                ];
            }

            if (t >= 1) {
                return [
                    new Curve(start, controlPoint1, controlPoint2, end),
                    new Curve(end, end, end, end)
                ];
            }

            var dividerPoints = this.getSkeletonPoints(t);

            var startControl1 = dividerPoints.startControlPoint1;
            var startControl2 = dividerPoints.startControlPoint2;
            var divider = dividerPoints.divider;
            var dividerControl1 = dividerPoints.dividerControlPoint1;
            var dividerControl2 = dividerPoints.dividerControlPoint2;

            // return array with two new curves
            return [
                new Curve(start, startControl1, startControl2, divider),
                new Curve(divider, dividerControl1, dividerControl2, end)
            ];
        },

        // Returns the distance between the curve's start and end points.
        endpointDistance: function() {

            return this.start.distance(this.end);
        },

        // Checks whether two curves are exactly the same.
        equals: function(c) {

            return !!c &&
                    this.start.x === c.start.x &&
                    this.start.y === c.start.y &&
                    this.controlPoint1.x === c.controlPoint1.x &&
                    this.controlPoint1.y === c.controlPoint1.y &&
                    this.controlPoint2.x === c.controlPoint2.x &&
                    this.controlPoint2.y === c.controlPoint2.y &&
                    this.end.x === c.end.x &&
                    this.end.y === c.end.y;
        },

        // Returns five helper points necessary for curve division.
        getSkeletonPoints: function(t) {

            var start = this.start;
            var control1 = this.controlPoint1;
            var control2 = this.controlPoint2;
            var end = this.end;

            // shortcuts for `t` values that are out of range
            if (t <= 0) {
                return {
                    startControlPoint1: start.clone(),
                    startControlPoint2: start.clone(),
                    divider: start.clone(),
                    dividerControlPoint1: control1.clone(),
                    dividerControlPoint2: control2.clone()
                };
            }

            if (t >= 1) {
                return {
                    startControlPoint1: control1.clone(),
                    startControlPoint2: control2.clone(),
                    divider: end.clone(),
                    dividerControlPoint1: end.clone(),
                    dividerControlPoint2: end.clone()
                };
            }

            var midpoint1 = (new Line(start, control1)).pointAt(t);
            var midpoint2 = (new Line(control1, control2)).pointAt(t);
            var midpoint3 = (new Line(control2, end)).pointAt(t);

            var subControl1 = (new Line(midpoint1, midpoint2)).pointAt(t);
            var subControl2 = (new Line(midpoint2, midpoint3)).pointAt(t);

            var divider = (new Line(subControl1, subControl2)).pointAt(t);

            var output = {
                startControlPoint1: midpoint1,
                startControlPoint2: subControl1,
                divider: divider,
                dividerControlPoint1: subControl2,
                dividerControlPoint2: midpoint3
            };

            return output;
        },

        // Returns a list of curves whose flattened length is better than `opt.precision`.
        // That is, observed difference in length between recursions is less than 10^(-3) = 0.001 = 0.1%
        // (Observed difference is not real precision, but close enough as long as special cases are covered)
        // (That is why skipping iteration 1 is important)
        // As a rule of thumb, increasing `precision` by 1 requires two more division operations
        // - Precision 0 (endpointDistance) - total of 2^0 - 1 = 0 operations (1 subdivision)
        // - Precision 1 (<10% error) - total of 2^2 - 1 = 3 operations (4 subdivisions)
        // - Precision 2 (<1% error) - total of 2^4 - 1 = 15 operations requires 4 division operations on all elements (15 operations total) (16 subdivisions)
        // - Precision 3 (<0.1% error) - total of 2^6 - 1 = 63 operations - acceptable when drawing (64 subdivisions)
        // - Precision 4 (<0.01% error) - total of 2^8 - 1 = 255 operations - high resolution, can be used to interpolate `t` (256 subdivisions)
        // (Variation of 1 recursion worse or better is possible depending on the curve, doubling/halving the number of operations accordingly)
        getSubdivisions: function(opt) {

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            // not using opt.subdivisions
            // not using localOpt

            var subdivisions = [new Curve(this.start, this.controlPoint1, this.controlPoint2, this.end)];
            if (precision === 0) return subdivisions;

            var previousLength = this.endpointDistance();

            var precisionRatio = pow(10, -precision);

            // recursively divide curve at `t = 0.5`
            // until the difference between observed length at subsequent iterations is lower than precision
            var iteration = 0;
            while (true) {
                iteration += 1;

                // divide all subdivisions
                var newSubdivisions = [];
                var numSubdivisions = subdivisions.length;
                for (var i = 0; i < numSubdivisions; i++) {

                    var currentSubdivision = subdivisions[i];
                    var divided = currentSubdivision.divide(0.5); // dividing at t = 0.5 (not at middle length!)
                    newSubdivisions.push(divided[0], divided[1]);
                }

                // measure new length
                var length = 0;
                var numNewSubdivisions = newSubdivisions.length;
                for (var j = 0; j < numNewSubdivisions; j++) {

                    var currentNewSubdivision = newSubdivisions[j];
                    length += currentNewSubdivision.endpointDistance();
                }

                // check if we have reached required observed precision
                // sine-like curves may have the same observed length in iteration 0 and 1 - skip iteration 1
                // not a problem for further iterations because cubic curves cannot have more than two local extrema
                // (i.e. cubic curves cannot intersect the baseline more than once)
                // therefore two subsequent iterations cannot produce sampling with equal length
                var observedPrecisionRatio = ((length !== 0) ? ((length - previousLength) / length) : 0);
                if (iteration > 1 && observedPrecisionRatio < precisionRatio) {
                    return newSubdivisions;
                }

                // otherwise, set up for next iteration
                subdivisions = newSubdivisions;
                previousLength = length;
            }
        },

        isDifferentiable: function() {

            var start = this.start;
            var control1 = this.controlPoint1;
            var control2 = this.controlPoint2;
            var end = this.end;

            return !(start.equals(control1) && control1.equals(control2) && control2.equals(end));
        },

        // Returns flattened length of the curve with precision better than `opt.precision`; or using `opt.subdivisions` provided.
        length: function(opt) {

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision; // opt.precision only used in getSubdivisions() call
            var subdivisions = (opt.subdivisions === undefined) ? this.getSubdivisions({ precision: precision }) : opt.subdivisions;
            // not using localOpt

            var length = 0;
            var n = subdivisions.length;
            for (var i = 0; i < n; i++) {

                var currentSubdivision = subdivisions[i];
                length += currentSubdivision.endpointDistance();
            }

            return length;
        },

        // Returns distance along the curve up to `t` with precision better than requested `opt.precision`. (Not using `opt.subdivisions`.)
        lengthAtT: function(t, opt) {

            if (t <= 0) return 0;

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            // not using opt.subdivisions
            // not using localOpt

            var subCurve = this.divide(t)[0];
            var subCurveLength = subCurve.length({ precision: precision });

            return subCurveLength;
        },

        // Returns point at requested `ratio` between 0 and 1 with precision better than `opt.precision`; optionally using `opt.subdivisions` provided.
        // Mirrors Line.pointAt() function.
        // For a function that tracks `t`, use Curve.pointAtT().
        pointAt: function(ratio, opt) {

            if (ratio <= 0) return this.start.clone();
            if (ratio >= 1) return this.end.clone();

            var t = this.tAt(ratio, opt);

            return this.pointAtT(t);
        },

        // Returns point at requested `length` with precision better than requested `opt.precision`; optionally using `opt.subdivisions` provided.
        pointAtLength: function(length, opt) {

            var t = this.tAtLength(length, opt);

            return this.pointAtT(t);
        },

        // Returns the point at provided `t` between 0 and 1.
        // `t` does not track distance along curve as it does in Line objects.
        // Non-linear relationship, speeds up and slows down as curve warps!
        // For linear length-based solution, use Curve.pointAt().
        pointAtT: function(t) {

            if (t <= 0) return this.start.clone();
            if (t >= 1) return this.end.clone();

            return this.getSkeletonPoints(t).divider;
        },

        // Default precision
        PRECISION: 3,

        scale: function(sx, sy, origin) {

            this.start.scale(sx, sy, origin);
            this.controlPoint1.scale(sx, sy, origin);
            this.controlPoint2.scale(sx, sy, origin);
            this.end.scale(sx, sy, origin);
            return this;
        },

        // Returns a tangent line at requested `ratio` with precision better than requested `opt.precision`; or using `opt.subdivisions` provided.
        tangentAt: function(ratio, opt) {

            if (!this.isDifferentiable()) return null;

            if (ratio < 0) ratio = 0;
            else if (ratio > 1) ratio = 1;

            var t = this.tAt(ratio, opt);

            return this.tangentAtT(t);
        },

        // Returns a tangent line at requested `length` with precision better than requested `opt.precision`; or using `opt.subdivisions` provided.
        tangentAtLength: function(length, opt) {

            if (!this.isDifferentiable()) return null;

            var t = this.tAtLength(length, opt);

            return this.tangentAtT(t);
        },

        // Returns a tangent line at requested `t`.
        tangentAtT: function(t) {

            if (!this.isDifferentiable()) return null;

            if (t < 0) t = 0;
            else if (t > 1) t = 1;

            var skeletonPoints = this.getSkeletonPoints(t);

            var p1 = skeletonPoints.startControlPoint2;
            var p2 = skeletonPoints.dividerControlPoint1;

            var tangentStart = skeletonPoints.divider;

            var tangentLine = new Line(p1, p2);
            tangentLine.translate(tangentStart.x - p1.x, tangentStart.y - p1.y); // move so that tangent line starts at the point requested

            return tangentLine;
        },

        // Returns `t` at requested `ratio` with precision better than requested `opt.precision`; optionally using `opt.subdivisions` provided.
        tAt: function(ratio, opt) {

            if (ratio <= 0) return 0;
            if (ratio >= 1) return 1;

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var subdivisions = (opt.subdivisions === undefined) ? this.getSubdivisions({ precision: precision }) : opt.subdivisions;
            var localOpt = { precision: precision, subdivisions: subdivisions };

            var curveLength = this.length(localOpt);
            var length = curveLength * ratio;

            return this.tAtLength(length, localOpt);
        },

        // Returns `t` at requested `length` with precision better than requested `opt.precision`; optionally using `opt.subdivisions` provided.
        // Uses `precision` to approximate length within `precision` (always underestimates)
        // Then uses a binary search to find the `t` of a subdivision endpoint that is close (within `precision`) to the `length`, if the curve was as long as approximated
        // As a rule of thumb, increasing `precision` by 1 causes the algorithm to go 2^(precision - 1) deeper
        // - Precision 0 (chooses one of the two endpoints) - 0 levels
        // - Precision 1 (chooses one of 5 points, <10% error) - 1 level
        // - Precision 2 (<1% error) - 3 levels
        // - Precision 3 (<0.1% error) - 7 levels
        // - Precision 4 (<0.01% error) - 15 levels
        tAtLength: function(length, opt) {

            var fromStart = true;
            if (length < 0) {
                fromStart = false; // negative lengths mean start calculation from end point
                length = -length; // absolute value
            }

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var subdivisions = (opt.subdivisions === undefined) ? this.getSubdivisions({ precision: precision }) : opt.subdivisions;
            var localOpt = { precision: precision, subdivisions: subdivisions };

            // identify the subdivision that contains the point at requested `length`:
            var investigatedSubdivision;
            var investigatedSubdivisionStartT; // assume that subdivisions are evenly spaced
            var investigatedSubdivisionEndT;
            //var baseline; // straightened version of subdivision to investigate
            //var baselinePoint; // point on the baseline that is the requested distance away from start
            var baselinePointDistFromStart; // distance of baselinePoint from start of baseline
            var baselinePointDistFromEnd; // distance of baselinePoint from end of baseline
            var l = 0; // length so far
            var n = subdivisions.length;
            var subdivisionSize = 1 / n;
            for (var i = (fromStart ? (0) : (n - 1)); (fromStart ? (i < n) : (i >= 0)); (fromStart ? (i++) : (i--))) {

                var currentSubdivision = subdivisions[i];
                var d = currentSubdivision.endpointDistance(); // length of current subdivision

                if (length <= (l + d)) {
                    investigatedSubdivision = currentSubdivision;

                    investigatedSubdivisionStartT = i * subdivisionSize;
                    investigatedSubdivisionEndT = (i + 1) * subdivisionSize;

                    baselinePointDistFromStart = (fromStart ? (length - l) : ((d + l) - length));
                    baselinePointDistFromEnd = (fromStart ? ((d + l) - length) : (length - l));

                    break;
                }

                l += d;
            }

            if (!investigatedSubdivision) return (fromStart ? 1 : 0); // length requested is out of range - return maximum t
            // note that precision affects what length is recorded
            // (imprecise measurements underestimate length by up to 10^(-precision) of the precise length)
            // e.g. at precision 1, the length may be underestimated by up to 10% and cause this function to return 1

            var curveLength = this.length(localOpt);

            var precisionRatio = pow(10, -precision);

            // recursively divide investigated subdivision:
            // until distance between baselinePoint and closest path endpoint is within 10^(-precision)
            // then return the closest endpoint of that final subdivision
            while (true) {

                // check if we have reached required observed precision
                var observedPrecisionRatio;

                observedPrecisionRatio = ((curveLength !== 0) ? (baselinePointDistFromStart / curveLength) : 0);
                if (observedPrecisionRatio < precisionRatio) return investigatedSubdivisionStartT;
                observedPrecisionRatio = ((curveLength !== 0) ? (baselinePointDistFromEnd / curveLength) : 0);
                if (observedPrecisionRatio < precisionRatio) return investigatedSubdivisionEndT;

                // otherwise, set up for next iteration
                var newBaselinePointDistFromStart;
                var newBaselinePointDistFromEnd;

                var divided = investigatedSubdivision.divide(0.5);
                subdivisionSize /= 2;

                var baseline1Length = divided[0].endpointDistance();
                var baseline2Length = divided[1].endpointDistance();

                if (baselinePointDistFromStart <= baseline1Length) { // point at requested length is inside divided[0]
                    investigatedSubdivision = divided[0];

                    investigatedSubdivisionEndT -= subdivisionSize; // sudivisionSize was already halved

                    newBaselinePointDistFromStart = baselinePointDistFromStart;
                    newBaselinePointDistFromEnd = baseline1Length - newBaselinePointDistFromStart;

                } else { // point at requested length is inside divided[1]
                    investigatedSubdivision = divided[1];

                    investigatedSubdivisionStartT += subdivisionSize; // subdivisionSize was already halved

                    newBaselinePointDistFromStart = baselinePointDistFromStart - baseline1Length;
                    newBaselinePointDistFromEnd = baseline2Length - newBaselinePointDistFromStart;
                }

                baselinePointDistFromStart = newBaselinePointDistFromStart;
                baselinePointDistFromEnd = newBaselinePointDistFromEnd;
            }
        },

        translate: function(tx, ty) {

            this.start.translate(tx, ty);
            this.controlPoint1.translate(tx, ty);
            this.controlPoint2.translate(tx, ty);
            this.end.translate(tx, ty);
            return this;
        },

        // Returns an array of points that represents the curve when flattened, up to `opt.precision`; or using `opt.subdivisions` provided.
        // Flattened length is no more than 10^(-precision) away from real curve length.
        toPoints: function(opt) {

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision; // opt.precision only used in getSubdivisions() call
            var subdivisions = (opt.subdivisions === undefined) ? this.getSubdivisions({ precision: precision }) : opt.subdivisions;
            // not using localOpt

            var points = [subdivisions[0].start.clone()];
            var n = subdivisions.length;
            for (var i = 0; i < n; i++) {

                var currentSubdivision = subdivisions[i];
                points.push(currentSubdivision.end.clone());
            }

            return points;
        },

        // Returns a polyline that represents the curve when flattened, up to `opt.precision`; or using `opt.subdivisions` provided.
        // Flattened length is no more than 10^(-precision) away from real curve length.
        toPolyline: function(opt) {

            return new Polyline(this.toPoints(opt));
        },

        toString: function() {

            return this.start + ' ' + this.controlPoint1 + ' ' + this.controlPoint2 + ' ' + this.end;
        }
    };

    var Ellipse = g.Ellipse = function(c, a, b) {

        if (!(this instanceof Ellipse)) {
            return new Ellipse(c, a, b);
        }

        if (c instanceof Ellipse) {
            return new Ellipse(new Point(c.x, c.y), c.a, c.b);
        }

        c = new Point(c);
        this.x = c.x;
        this.y = c.y;
        this.a = a;
        this.b = b;
    };

    Ellipse.fromRect = function(rect) {

        rect = new Rect(rect);
        return new Ellipse(rect.center(), rect.width / 2, rect.height / 2);
    };

    Ellipse.prototype = {

        bbox: function() {

            return new Rect(this.x - this.a, this.y - this.b, 2 * this.a, 2 * this.b);
        },

        clone: function() {

            return new Ellipse(this);
        },

        /**
         * @param {g.Point} point
         * @returns {number} result < 1 - inside ellipse, result == 1 - on ellipse boundary, result > 1 - outside
         */
        normalizedDistance: function(point) {

            var x0 = point.x;
            var y0 = point.y;
            var a = this.a;
            var b = this.b;
            var x = this.x;
            var y = this.y;

            return ((x0 - x) * (x0 - x)) / (a * a ) + ((y0 - y) * (y0 - y)) / (b * b);
        },

        // inflate by dx and dy
        // @param dx {delta_x} representing additional size to x
        // @param dy {delta_y} representing additional size to y -
        // dy param is not required -> in that case y is sized by dx
        inflate: function(dx, dy) {
            if (dx === undefined) {
                dx = 0;
            }

            if (dy === undefined) {
                dy = dx;
            }

            this.a += 2 * dx;
            this.b += 2 * dy;

            return this;
        },


        /**
         * @param {g.Point} p
         * @returns {boolean}
         */
        containsPoint: function(p) {

            return this.normalizedDistance(p) <= 1;
        },

        /**
         * @returns {g.Point}
         */
        center: function() {

            return new Point(this.x, this.y);
        },

        /** Compute angle between tangent and x axis
         * @param {g.Point} p Point of tangency, it has to be on ellipse boundaries.
         * @returns {number} angle between tangent and x axis
         */
        tangentTheta: function(p) {

            var refPointDelta = 30;
            var x0 = p.x;
            var y0 = p.y;
            var a = this.a;
            var b = this.b;
            var center = this.bbox().center();
            var m = center.x;
            var n = center.y;

            var q1 = x0 > center.x + a / 2;
            var q3 = x0 < center.x - a / 2;

            var y, x;
            if (q1 || q3) {
                y = x0 > center.x ? y0 - refPointDelta : y0 + refPointDelta;
                x = (a * a / (x0 - m)) - (a * a * (y0 - n) * (y - n)) / (b * b * (x0 - m)) + m;

            } else {
                x = y0 > center.y ? x0 + refPointDelta : x0 - refPointDelta;
                y = ( b * b / (y0 - n)) - (b * b * (x0 - m) * (x - m)) / (a * a * (y0 - n)) + n;
            }

            return (new Point(x, y)).theta(p);

        },

        equals: function(ellipse) {

            return !!ellipse &&
                    ellipse.x === this.x &&
                    ellipse.y === this.y &&
                    ellipse.a === this.a &&
                    ellipse.b === this.b;
        },

        intersectionWithLine: function(line) {

            var intersections = [];
            var a1 = line.start;
            var a2 = line.end;
            var rx = this.a;
            var ry = this.b;
            var dir = line.vector();
            var diff = a1.difference(new Point(this));
            var mDir = new Point(dir.x / (rx * rx), dir.y / (ry * ry));
            var mDiff = new Point(diff.x / (rx * rx), diff.y / (ry * ry));

            var a = dir.dot(mDir);
            var b = dir.dot(mDiff);
            var c = diff.dot(mDiff) - 1.0;
            var d = b * b - a * c;

            if (d < 0) {
                return null;
            } else if (d > 0) {
                var root = sqrt(d);
                var ta = (-b - root) / a;
                var tb = (-b + root) / a;

                if ((ta < 0 || 1 < ta) && (tb < 0 || 1 < tb)) {
                    // if ((ta < 0 && tb < 0) || (ta > 1 && tb > 1)) outside else inside
                    return null;
                } else {
                    if (0 <= ta && ta <= 1) intersections.push(a1.lerp(a2, ta));
                    if (0 <= tb && tb <= 1) intersections.push(a1.lerp(a2, tb));
                }
            } else {
                var t = -b / a;
                if (0 <= t && t <= 1) {
                    intersections.push(a1.lerp(a2, t));
                } else {
                    // outside
                    return null;
                }
            }

            return intersections;
        },

        // Find point on me where line from my center to
        // point p intersects my boundary.
        // @param {number} angle If angle is specified, intersection with rotated ellipse is computed.
        intersectionWithLineFromCenterToPoint: function(p, angle) {

            p = new Point(p);

            if (angle) p.rotate(new Point(this.x, this.y), angle);

            var dx = p.x - this.x;
            var dy = p.y - this.y;
            var result;

            if (dx === 0) {
                result = this.bbox().pointNearestToPoint(p);
                if (angle) return result.rotate(new Point(this.x, this.y), -angle);
                return result;
            }

            var m = dy / dx;
            var mSquared = m * m;
            var aSquared = this.a * this.a;
            var bSquared = this.b * this.b;

            var x = sqrt(1 / ((1 / aSquared) + (mSquared / bSquared)));
            x = dx < 0 ? -x : x;

            var y = m * x;
            result = new Point(this.x + x, this.y + y);

            if (angle) return result.rotate(new Point(this.x, this.y), -angle);
            return result;
        },

        toString: function() {

            return (new Point(this.x, this.y)).toString() + ' ' + this.a + ' ' + this.b;
        }
    };

    var Line = g.Line = function(p1, p2) {

        if (!(this instanceof Line)) {
            return new Line(p1, p2);
        }

        if (p1 instanceof Line) {
            return new Line(p1.start, p1.end);
        }

        this.start = new Point(p1);
        this.end = new Point(p2);
    };

    Line.prototype = {

        bbox: function() {

            var left = min(this.start.x, this.end.x);
            var top = min(this.start.y, this.end.y);
            var right = max(this.start.x, this.end.x);
            var bottom = max(this.start.y, this.end.y);

            return new Rect(left, top, (right - left), (bottom - top));
        },

        // @return the bearing (cardinal direction) of the line. For example N, W, or SE.
        // @returns {String} One of the following bearings : NE, E, SE, S, SW, W, NW, N.
        bearing: function() {

            var lat1 = toRad(this.start.y);
            var lat2 = toRad(this.end.y);
            var lon1 = this.start.x;
            var lon2 = this.end.x;
            var dLon = toRad(lon2 - lon1);
            var y = sin(dLon) * cos(lat2);
            var x = cos(lat1) * sin(lat2) - sin(lat1) * cos(lat2) * cos(dLon);
            var brng = toDeg(atan2(y, x));

            var bearings = ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];

            var index = brng - 22.5;
            if (index < 0)
                index += 360;
            index = parseInt(index / 45);

            return bearings[index];
        },

        clone: function() {

            return new Line(this.start, this.end);
        },

        // @return {point} the closest point on the line to point `p`
        closestPoint: function(p) {

            return this.pointAt(this.closestPointNormalizedLength(p));
        },

        closestPointLength: function(p) {

            return this.closestPointNormalizedLength(p) * this.length();
        },

        // @return {number} the normalized length of the closest point on the line to point `p`
        closestPointNormalizedLength: function(p) {

            var product = this.vector().dot((new Line(this.start, p)).vector());
            var cpNormalizedLength = min(1, max(0, product / this.squaredLength()));

            // cpNormalizedLength returns `NaN` if this line has zero length
            // we can work with that - if `NaN`, return 0
            if (cpNormalizedLength !== cpNormalizedLength) return 0; // condition evaluates to `true` if and only if cpNormalizedLength is `NaN`
            // (`NaN` is the only value that is not equal to itself)

            return cpNormalizedLength;
        },

        closestPointTangent: function(p) {

            return this.tangentAt(this.closestPointNormalizedLength(p));
        },

        equals: function(l) {

            return !!l &&
                    this.start.x === l.start.x &&
                    this.start.y === l.start.y &&
                    this.end.x === l.end.x &&
                    this.end.y === l.end.y;
        },

        intersectionWithLine: function(line) {

            var pt1Dir = new Point(this.end.x - this.start.x, this.end.y - this.start.y);
            var pt2Dir = new Point(line.end.x - line.start.x, line.end.y - line.start.y);
            var det = (pt1Dir.x * pt2Dir.y) - (pt1Dir.y * pt2Dir.x);
            var deltaPt = new Point(line.start.x - this.start.x, line.start.y - this.start.y);
            var alpha = (deltaPt.x * pt2Dir.y) - (deltaPt.y * pt2Dir.x);
            var beta = (deltaPt.x * pt1Dir.y) - (deltaPt.y * pt1Dir.x);

            if (det === 0 || alpha * det < 0 || beta * det < 0) {
                // No intersection found.
                return null;
            }

            if (det > 0) {
                if (alpha > det || beta > det) {
                    return null;
                }

            } else {
                if (alpha < det || beta < det) {
                    return null;
                }
            }

            return [new Point(
                this.start.x + (alpha * pt1Dir.x / det),
                this.start.y + (alpha * pt1Dir.y / det)
            )];
        },

        // @return {point} Point where I'm intersecting a line.
        // @return [point] Points where I'm intersecting a rectangle.
        // @see Squeak Smalltalk, LineSegment>>intersectionWith:
        intersect: function(shape, opt) {

            if (shape instanceof Line ||
                shape instanceof Rect ||
                shape instanceof Polyline ||
                shape instanceof Ellipse ||
                shape instanceof Path
            ) {
                var intersection = shape.intersectionWithLine(this, opt);

                // Backwards compatibility
                if (intersection && (shape instanceof Line)) {
                    intersection = intersection[0];
                }

                return intersection;
            }

            return null;
        },

        isDifferentiable: function() {

            return !this.start.equals(this.end);
        },

        // @return {double} length of the line
        length: function() {

            return sqrt(this.squaredLength());
        },

        // @return {point} my midpoint
        midpoint: function() {

            return new Point(
                (this.start.x + this.end.x) / 2,
                (this.start.y + this.end.y) / 2
            );
        },

        // @return {point} my point at 't' <0,1>
        pointAt: function(t) {

            var start = this.start;
            var end = this.end;

            if (t <= 0) return start.clone();
            if (t >= 1) return end.clone();

            return start.lerp(end, t);
        },

        pointAtLength: function(length) {

            var start = this.start;
            var end = this.end;

            var fromStart = true;
            if (length < 0) {
                fromStart = false; // negative lengths mean start calculation from end point
                length = -length; // absolute value
            }

            var lineLength = this.length();
            if (length >= lineLength) return (fromStart ? end.clone() : start.clone());

            return this.pointAt((fromStart ? (length) : (lineLength - length)) / lineLength);
        },

        // @return {number} the offset of the point `p` from the line. + if the point `p` is on the right side of the line, - if on the left and 0 if on the line.
        pointOffset: function(p) {

            // Find the sign of the determinant of vectors (start,end), where p is the query point.
            p = new g.Point(p);
            var start = this.start;
            var end = this.end;
            var determinant = ((end.x - start.x) * (p.y - start.y) - (end.y - start.y) * (p.x - start.x));

            return determinant / this.length();
        },

        rotate: function(origin, angle) {

            this.start.rotate(origin, angle);
            this.end.rotate(origin, angle);
            return this;
        },

        round: function(precision) {

            var f = pow(10, precision || 0);
            this.start.x = round(this.start.x * f) / f;
            this.start.y = round(this.start.y * f) / f;
            this.end.x = round(this.end.x * f) / f;
            this.end.y = round(this.end.y * f) / f;
            return this;
        },

        scale: function(sx, sy, origin) {

            this.start.scale(sx, sy, origin);
            this.end.scale(sx, sy, origin);
            return this;
        },

        // @return {number} scale the line so that it has the requested length
        setLength: function(length) {

            var currentLength = this.length();
            if (!currentLength) return this;

            var scaleFactor = length / currentLength;
            return this.scale(scaleFactor, scaleFactor, this.start);
        },

        // @return {integer} length without sqrt
        // @note for applications where the exact length is not necessary (e.g. compare only)
        squaredLength: function() {

            var x0 = this.start.x;
            var y0 = this.start.y;
            var x1 = this.end.x;
            var y1 = this.end.y;
            return (x0 -= x1) * x0 + (y0 -= y1) * y0;
        },

        tangentAt: function(t) {

            if (!this.isDifferentiable()) return null;

            var start = this.start;
            var end = this.end;

            var tangentStart = this.pointAt(t); // constrains `t` between 0 and 1

            var tangentLine = new Line(start, end);
            tangentLine.translate(tangentStart.x - start.x, tangentStart.y - start.y); // move so that tangent line starts at the point requested

            return tangentLine;
        },

        tangentAtLength: function(length) {

            if (!this.isDifferentiable()) return null;

            var start = this.start;
            var end = this.end;

            var tangentStart = this.pointAtLength(length);

            var tangentLine = new Line(start, end);
            tangentLine.translate(tangentStart.x - start.x, tangentStart.y - start.y); // move so that tangent line starts at the point requested

            return tangentLine;
        },

        translate: function(tx, ty) {

            this.start.translate(tx, ty);
            this.end.translate(tx, ty);
            return this;
        },

        // @return vector {point} of the line
        vector: function() {

            return new Point(this.end.x - this.start.x, this.end.y - this.start.y);
        },

        toString: function() {

            return this.start.toString() + ' ' + this.end.toString();
        }
    };

    // For backwards compatibility:
    Line.prototype.intersection = Line.prototype.intersect;

    // Accepts path data string, array of segments, array of Curves and/or Lines, or a Polyline.
    // Path created is not guaranteed to be a valid (serializable) path (might not start with an M).
    var Path = g.Path = function(arg) {

        if (!(this instanceof Path)) {
            return new Path(arg);
        }

        if (typeof arg === 'string') { // create from a path data string
            return new Path.parse(arg);
        }

        this.segments = [];

        var i;
        var n;

        if (!arg) {
            // don't do anything

        } else if (Array.isArray(arg) && arg.length !== 0) { // if arg is a non-empty array
            n = arg.length;
            if (arg[0].isSegment) { // create from an array of segments
                for (i = 0; i < n; i++) {

                    var segment = arg[i];

                    this.appendSegment(segment);
                }

            } else { // create from an array of Curves and/or Lines
                var previousObj = null;
                for (i = 0; i < n; i++) {

                    var obj = arg[i];

                    if (!((obj instanceof Line) || (obj instanceof Curve))) {
                        throw new Error('Cannot construct a path segment from the provided object.');
                    }

                    if (i === 0) this.appendSegment(Path.createSegment('M', obj.start));

                    // if objects do not link up, moveto segments are inserted to cover the gaps
                    if (previousObj && !previousObj.end.equals(obj.start)) this.appendSegment(Path.createSegment('M', obj.start));

                    if (obj instanceof Line) {
                        this.appendSegment(Path.createSegment('L', obj.end));

                    } else if (obj instanceof Curve) {
                        this.appendSegment(Path.createSegment('C', obj.controlPoint1, obj.controlPoint2, obj.end));
                    }

                    previousObj = obj;
                }
            }

        } else if (arg.isSegment) { // create from a single segment
            this.appendSegment(arg);

        } else if (arg instanceof Line) { // create from a single Line
            this.appendSegment(Path.createSegment('M', arg.start));
            this.appendSegment(Path.createSegment('L', arg.end));

        } else if (arg instanceof Curve) { // create from a single Curve
            this.appendSegment(Path.createSegment('M', arg.start));
            this.appendSegment(Path.createSegment('C', arg.controlPoint1, arg.controlPoint2, arg.end));

        } else if (arg instanceof Polyline && arg.points && arg.points.length !== 0) { // create from a Polyline
            n = arg.points.length;
            for (i = 0; i < n; i++) {

                var point = arg.points[i];

                if (i === 0) this.appendSegment(Path.createSegment('M', point));
                else this.appendSegment(Path.createSegment('L', point));
            }
        }
    };

    // More permissive than V.normalizePathData and Path.prototype.serialize.
    // Allows path data strings that do not start with a Moveto command (unlike SVG specification).
    // Does not require spaces between elements; commas are allowed, separators may be omitted when unambiguous (e.g. 'ZM10,10', 'L1.6.8', 'M100-200').
    // Allows for command argument chaining.
    // Throws an error if wrong number of arguments is provided with a command.
    // Throws an error if an unrecognized path command is provided (according to Path.segmentTypes). Only a subset of SVG commands is currently supported (L, C, M, Z).
    Path.parse = function(pathData) {

        if (!pathData) return new Path();

        var path = new Path();

        var commandRe = /(?:[a-zA-Z] *)(?:(?:-?\d+(?:\.\d+)? *,? *)|(?:-?\.\d+ *,? *))+|(?:[a-zA-Z] *)(?! |\d|-|\.)/g;
        var commands = pathData.match(commandRe);

        var numCommands = commands.length;
        for (var i = 0; i < numCommands; i++) {

            var command = commands[i];
            var argRe = /(?:[a-zA-Z])|(?:(?:-?\d+(?:\.\d+)?))|(?:(?:-?\.\d+))/g;
            var args = command.match(argRe);

            var segment = Path.createSegment.apply(this, args); // args = [type, coordinate1, coordinate2...]
            path.appendSegment(segment);
        }

        return path;
    };

    // Create a segment or an array of segments.
    // Accepts unlimited points/coords arguments after `type`.
    Path.createSegment = function(type) {

        if (!type) throw new Error('Type must be provided.');

        var segmentConstructor = Path.segmentTypes[type];
        if (!segmentConstructor) throw new Error(type + ' is not a recognized path segment type.');

        var args = [];
        var n = arguments.length;
        for (var i = 1; i < n; i++) { // do not add first element (`type`) to args array
            args.push(arguments[i]);
        }

        return applyToNew(segmentConstructor, args);
    },

    Path.prototype = {

        // Accepts one segment or an array of segments as argument.
        // Throws an error if argument is not a segment or an array of segments.
        appendSegment: function(arg) {

            var segments = this.segments;
            var numSegments = segments.length;
            // works even if path has no segments

            var currentSegment;

            var previousSegment = ((numSegments !== 0) ? segments[numSegments - 1] : null); // if we are appending to an empty path, previousSegment is null
            var nextSegment = null;

            if (!Array.isArray(arg)) { // arg is a segment
                if (!arg || !arg.isSegment) throw new Error('Segment required.');

                currentSegment = this.prepareSegment(arg, previousSegment, nextSegment);
                segments.push(currentSegment);

            } else { // arg is an array of segments
                if (!arg[0].isSegment) throw new Error('Segments required.');

                var n = arg.length;
                for (var i = 0; i < n; i++) {

                    var currentArg = arg[i];
                    currentSegment = this.prepareSegment(currentArg, previousSegment, nextSegment);
                    segments.push(currentSegment);
                    previousSegment = currentSegment;
                }
            }
        },

        // Returns the bbox of the path.
        // If path has no segments, returns null.
        // If path has only invisible segments, returns bbox of the end point of last segment.
        bbox: function() {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return null; // if segments is an empty array

            var bbox;
            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                if (segment.isVisible) {
                    var segmentBBox = segment.bbox();
                    bbox = bbox ? bbox.union(segmentBBox) : segmentBBox;
                }
            }

            if (bbox) return bbox;

            // if the path has only invisible elements, return end point of last segment
            var lastSegment = segments[numSegments - 1];
            return new Rect(lastSegment.end.x, lastSegment.end.y, 0, 0);
        },

        // Returns a new path that is a clone of this path.
        clone: function() {

            var segments = this.segments;
            var numSegments = segments.length;
            // works even if path has no segments

            var path = new Path();
            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i].clone();
                path.appendSegment(segment);
            }

            return path;
        },

        closestPoint: function(p, opt) {

            var t = this.closestPointT(p, opt);
            if (!t) return null;

            return this.pointAtT(t);
        },

        closestPointLength: function(p, opt) {

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            var localOpt = { precision: precision, segmentSubdivisions: segmentSubdivisions };

            var t = this.closestPointT(p, localOpt);
            if (!t) return 0;

            return this.lengthAtT(t, localOpt);
        },

        closestPointNormalizedLength: function(p, opt) {

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            var localOpt = { precision: precision, segmentSubdivisions: segmentSubdivisions };

            var cpLength = this.closestPointLength(p, localOpt);
            if (cpLength === 0) return 0; // shortcut

            var length = this.length(localOpt);
            if (length === 0) return 0; // prevents division by zero

            return cpLength / length;
        },

        // Private function.
        closestPointT: function(p, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return null; // if segments is an empty array

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            // not using localOpt

            var closestPointT;
            var minSquaredDistance = Infinity;
            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                var subdivisions = segmentSubdivisions[i];

                if (segment.isVisible) {
                    var segmentClosestPointT = segment.closestPointT(p, { precision: precision, subdivisions: subdivisions });
                    var segmentClosestPoint = segment.pointAtT(segmentClosestPointT);
                    var squaredDistance = (new Line(segmentClosestPoint, p)).squaredLength();

                    if (squaredDistance < minSquaredDistance) {
                        closestPointT = { segmentIndex: i, value: segmentClosestPointT };
                        minSquaredDistance = squaredDistance;
                    }
                }
            }

            if (closestPointT) return closestPointT;

            // if no visible segment, return end of last segment
            return { segmentIndex: numSegments - 1, value: 1 };
        },

        closestPointTangent: function(p, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return null; // if segments is an empty array

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            // not using localOpt

            var closestPointTangent;
            var minSquaredDistance = Infinity;
            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                var subdivisions = segmentSubdivisions[i];

                if (segment.isDifferentiable()) {
                    var segmentClosestPointT = segment.closestPointT(p, { precision: precision, subdivisions: subdivisions });
                    var segmentClosestPoint = segment.pointAtT(segmentClosestPointT);
                    var squaredDistance = (new Line(segmentClosestPoint, p)).squaredLength();

                    if (squaredDistance < minSquaredDistance) {
                        closestPointTangent = segment.tangentAtT(segmentClosestPointT);
                        minSquaredDistance = squaredDistance;
                    }
                }
            }

            if (closestPointTangent) return closestPointTangent;

            // if no valid segment, return null
            return null;
        },

        // Checks whether two paths are exactly the same.
        // If `p` is undefined or null, returns false.
        equals: function(p) {

            if (!p) return false;

            var segments = this.segments;
            var otherSegments = p.segments;

            var numSegments = segments.length;
            if (otherSegments.length !== numSegments) return false; // if the two paths have different number of segments, they cannot be equal

            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                var otherSegment = otherSegments[i];

                // as soon as an inequality is found in segments, return false
                if ((segment.type !== otherSegment.type) || (!segment.equals(otherSegment))) return false;
            }

            // if no inequality found in segments, return true
            return true;
        },

        // Accepts negative indices.
        // Throws an error if path has no segments.
        // Throws an error if index is out of range.
        getSegment: function(index) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (!numSegments === 0) throw new Error('Path has no segments.');

            if (index < 0) index = numSegments + index; // convert negative indices to positive
            if (index >= numSegments || index < 0) throw new Error('Index out of range.');

            return segments[index];
        },

        // Returns an array of segment subdivisions, with precision better than requested `opt.precision`.
        getSegmentSubdivisions: function(opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            // works even if path has no segments

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            // not using opt.segmentSubdivisions
            // not using localOpt

            var segmentSubdivisions = [];
            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                var subdivisions = segment.getSubdivisions({ precision: precision });
                segmentSubdivisions.push(subdivisions);
            }

            return segmentSubdivisions;
        },

        // Insert `arg` at given `index`.
        // `index = 0` means insert at the beginning.
        // `index = segments.length` means insert at the end.
        // Accepts negative indices, from `-1` to `-(segments.length + 1)`.
        // Accepts one segment or an array of segments as argument.
        // Throws an error if index is out of range.
        // Throws an error if argument is not a segment or an array of segments.
        insertSegment: function(index, arg) {

            var segments = this.segments;
            var numSegments = segments.length;
            // works even if path has no segments

            // note that these are incremented comapared to getSegments()
            // we can insert after last element (note that this changes the meaning of index -1)
            if (index < 0) index = numSegments + index + 1; // convert negative indices to positive
            if (index > numSegments || index < 0) throw new Error('Index out of range.');

            var currentSegment;

            var previousSegment = null;
            var nextSegment = null;

            if (numSegments !== 0) {
                if (index >= 1) {
                    previousSegment = segments[index - 1];
                    nextSegment = previousSegment.nextSegment; // if we are inserting at end, nextSegment is null

                } else { // if index === 0
                    // previousSegment is null
                    nextSegment = segments[0];
                }
            }

            if (!Array.isArray(arg)) {
                if (!arg || !arg.isSegment) throw new Error('Segment required.');

                currentSegment = this.prepareSegment(arg, previousSegment, nextSegment);
                segments.splice(index, 0, currentSegment);

            } else {
                if (!arg[0].isSegment) throw new Error('Segments required.');

                var n = arg.length;
                for (var i = 0; i < n; i++) {

                    var currentArg = arg[i];
                    currentSegment = this.prepareSegment(currentArg, previousSegment, nextSegment);
                    segments.splice((index + i), 0, currentSegment); // incrementing index to insert subsequent segments after inserted segments
                    previousSegment = currentSegment;
                }
            }
        },

        isDifferentiable: function() {

            var segments = this.segments;
            var numSegments = segments.length;

            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                // as soon as a differentiable segment is found in segments, return true
                if (segment.isDifferentiable()) return true;
            }

            // if no differentiable segment is found in segments, return false
            return false;
        },

        // Checks whether current path segments are valid.
        // Note that d is allowed to be empty - should disable rendering of the path.
        isValid: function() {

            var segments = this.segments;
            var isValid = (segments.length === 0) || (segments[0].type === 'M'); // either empty or first segment is a Moveto
            return isValid;
        },

        // Returns length of the path, with precision better than requested `opt.precision`; or using `opt.segmentSubdivisions` provided.
        // If path has no segments, returns 0.
        length: function(opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return 0; // if segments is an empty array

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision; // opt.precision only used in getSegmentSubdivisions() call
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            // not using localOpt

            var length = 0;
            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                var subdivisions = segmentSubdivisions[i];
                length += segment.length({ subdivisions: subdivisions });
            }

            return length;
        },

        // Private function.
        lengthAtT: function(t, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return 0; // if segments is an empty array

            var segmentIndex = t.segmentIndex;
            if (segmentIndex < 0) return 0; // regardless of t.value

            var tValue = t.value;
            if (segmentIndex >= numSegments) {
                segmentIndex = numSegments - 1;
                tValue = 1;
            }
            else if (tValue < 0) tValue = 0;
            else if (tValue > 1) tValue = 1;

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            // not using localOpt

            var subdivisions;
            var length = 0;
            for (var i = 0; i < segmentIndex; i++) {

                var segment = segments[i];
                subdivisions = segmentSubdivisions[i];
                length += segment.length({ precisison: precision, subdivisions: subdivisions });
            }

            segment = segments[segmentIndex];
            subdivisions = segmentSubdivisions[segmentIndex];
            length += segment.lengthAtT(tValue, { precisison: precision, subdivisions: subdivisions });

            return length;
        },

        // Returns point at requested `ratio` between 0 and 1, with precision better than requested `opt.precision`; optionally using `opt.segmentSubdivisions` provided.
        pointAt: function(ratio, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return null; // if segments is an empty array

            if (ratio <= 0) return this.start.clone();
            if (ratio >= 1) return this.end.clone();

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            var localOpt = { precision: precision, segmentSubdivisions: segmentSubdivisions };

            var pathLength = this.length(localOpt);
            var length = pathLength * ratio;

            return this.pointAtLength(length, localOpt);
        },

        // Returns point at requested `length`, with precision better than requested `opt.precision`; optionally using `opt.segmentSubdivisions` provided.
        // Accepts negative length.
        pointAtLength: function(length, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return null; // if segments is an empty array

            if (length === 0) return this.start.clone();

            var fromStart = true;
            if (length < 0) {
                fromStart = false; // negative lengths mean start calculation from end point
                length = -length; // absolute value
            }

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            // not using localOpt

            var lastVisibleSegment;
            var l = 0; // length so far
            for (var i = (fromStart ? 0 : (numSegments - 1)); (fromStart ? (i < numSegments) : (i >= 0)); (fromStart ? (i++) : (i--))) {

                var segment = segments[i];
                var subdivisions = segmentSubdivisions[i];
                var d = segment.length({ precision: precision, subdivisions: subdivisions });

                if (segment.isVisible) {
                    if (length <= (l + d)) {
                        return segment.pointAtLength(((fromStart ? 1 : -1) * (length - l)), { precision: precision, subdivisions: subdivisions });
                    }

                    lastVisibleSegment = segment;
                }

                l += d;
            }

            // if length requested is higher than the length of the path, return last visible segment endpoint
            if (lastVisibleSegment) return (fromStart ? lastVisibleSegment.end : lastVisibleSegment.start);

            // if no visible segment, return last segment end point (no matter if fromStart or no)
            var lastSegment = segments[numSegments - 1];
            return lastSegment.end.clone();
        },

        // Private function.
        pointAtT: function(t) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return null; // if segments is an empty array

            var segmentIndex = t.segmentIndex;
            if (segmentIndex < 0) return segments[0].pointAtT(0);
            if (segmentIndex >= numSegments) return segments[numSegments - 1].pointAtT(1);

            var tValue = t.value;
            if (tValue < 0) tValue = 0;
            else if (tValue > 1) tValue = 1;

            return segments[segmentIndex].pointAtT(tValue);
        },

        // Helper method for adding segments.
        prepareSegment: function(segment, previousSegment, nextSegment) {

            // insert after previous segment and before previous segment's next segment
            segment.previousSegment = previousSegment;
            segment.nextSegment = nextSegment;
            if (previousSegment) previousSegment.nextSegment = segment;
            if (nextSegment) nextSegment.previousSegment = segment;

            var updateSubpathStart = segment;
            if (segment.isSubpathStart) {
                segment.subpathStartSegment = segment; // assign self as subpath start segment
                updateSubpathStart = nextSegment; // start updating from next segment
            }

            // assign previous segment's subpath start (or self if it is a subpath start) to subsequent segments
            if (updateSubpathStart) this.updateSubpathStartSegment(updateSubpathStart);

            return segment;
        },

        // Default precision
        PRECISION: 3,

        // Remove the segment at `index`.
        // Accepts negative indices, from `-1` to `-segments.length`.
        // Throws an error if path has no segments.
        // Throws an error if index is out of range.
        removeSegment: function(index) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) throw new Error('Path has no segments.');

            if (index < 0) index = numSegments + index; // convert negative indices to positive
            if (index >= numSegments || index < 0) throw new Error('Index out of range.');

            var removedSegment = segments.splice(index, 1)[0];
            var previousSegment = removedSegment.previousSegment;
            var nextSegment = removedSegment.nextSegment;

            // link the previous and next segments together (if present)
            if (previousSegment) previousSegment.nextSegment = nextSegment; // may be null
            if (nextSegment) nextSegment.previousSegment = previousSegment; // may be null

            // if removed segment used to start a subpath, update all subsequent segments until another subpath start segment is reached
            if (removedSegment.isSubpathStart && nextSegment) this.updateSubpathStartSegment(nextSegment);
        },

        // Replace the segment at `index` with `arg`.
        // Accepts negative indices, from `-1` to `-segments.length`.
        // Accepts one segment or an array of segments as argument.
        // Throws an error if path has no segments.
        // Throws an error if index is out of range.
        // Throws an error if argument is not a segment or an array of segments.
        replaceSegment: function(index, arg) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) throw new Error('Path has no segments.');

            if (index < 0) index = numSegments + index; // convert negative indices to positive
            if (index >= numSegments || index < 0) throw new Error('Index out of range.');

            var currentSegment;

            var replacedSegment = segments[index];
            var previousSegment = replacedSegment.previousSegment;
            var nextSegment = replacedSegment.nextSegment;

            var updateSubpathStart = replacedSegment.isSubpathStart; // boolean: is an update of subpath starts necessary?

            if (!Array.isArray(arg)) {
                if (!arg || !arg.isSegment) throw new Error('Segment required.');

                currentSegment = this.prepareSegment(arg, previousSegment, nextSegment);
                segments.splice(index, 1, currentSegment); // directly replace

                if (updateSubpathStart && currentSegment.isSubpathStart) updateSubpathStart = false; // already updated by `prepareSegment`

            } else {
                if (!arg[0].isSegment) throw new Error('Segments required.');

                segments.splice(index, 1);

                var n = arg.length;
                for (var i = 0; i < n; i++) {

                    var currentArg = arg[i];
                    currentSegment = this.prepareSegment(currentArg, previousSegment, nextSegment);
                    segments.splice((index + i), 0, currentSegment); // incrementing index to insert subsequent segments after inserted segments
                    previousSegment = currentSegment;

                    if (updateSubpathStart && currentSegment.isSubpathStart) updateSubpathStart = false; // already updated by `prepareSegment`
                }
            }

            // if replaced segment used to start a subpath and no new subpath start was added, update all subsequent segments until another subpath start segment is reached
            if (updateSubpathStart && nextSegment) this.updateSubpathStartSegment(nextSegment);
        },

        scale: function(sx, sy, origin) {

            var segments = this.segments;
            var numSegments = segments.length;

            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                segment.scale(sx, sy, origin);
            }

            return this;
        },

        segmentAt: function(ratio, opt) {

            var index = this.segmentIndexAt(ratio, opt);
            if (!index) return null;

            return this.getSegment(index);
        },

        // Accepts negative length.
        segmentAtLength: function(length, opt) {

            var index = this.segmentIndexAtLength(length, opt);
            if (!index) return null;

            return this.getSegment(index);
        },

        segmentIndexAt: function(ratio, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return null; // if segments is an empty array

            if (ratio < 0) ratio = 0;
            if (ratio > 1) ratio = 1;

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            var localOpt = { precision: precision, segmentSubdivisions: segmentSubdivisions };

            var pathLength = this.length(localOpt);
            var length = pathLength * ratio;

            return this.segmentIndexAtLength(length, localOpt);
        },

        toPoints: function(opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return null; // if segments is an empty array

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;

            var points = [];
            var partialPoints = [];
            for (var i = 0; i < numSegments; i++) {
                var segment = segments[i];
                if (segment.isVisible) {
                    var currentSegmentSubdivisions = segmentSubdivisions[i];
                    if (currentSegmentSubdivisions.length > 0) {
                        var subdivisionPoints = currentSegmentSubdivisions.map(function(curve) {
                            return curve.start;
                        });
                        Array.prototype.push.apply(partialPoints, subdivisionPoints);
                    } else {
                        partialPoints.push(segment.start);
                    }
                } else if (partialPoints.length > 0) {
                    partialPoints.push(segments[i - 1].end);
                    points.push(partialPoints);
                    partialPoints = [];
                }
            }

            if (partialPoints.length > 0) {
                partialPoints.push(this.end);
                points.push(partialPoints);
            }
            return points;
        },

        toPolylines: function(opt) {

            var polylines = [];
            var points = this.toPoints(opt);
            if (!points) return null;
            for (var i = 0, n = points.length; i < n; i++) {
                polylines.push(new Polyline(points[i]));
            }

            return polylines;
        },

        intersectionWithLine: function(line, opt) {

            var intersection = null;
            var polylines = this.toPolylines(opt);
            if (!polylines) return null;
            for (var i = 0, n = polylines.length; i < n; i++) {
                var polyline = polylines[i];
                var polylineIntersection = line.intersect(polyline);
                if (polylineIntersection) {
                    intersection || (intersection = []);
                    if (Array.isArray(polylineIntersection)) {
                        Array.prototype.push.apply(intersection, polylineIntersection);
                    } else {
                        intersection.push(polylineIntersection);
                    }
                }
            }

            return intersection;
        },

        // Accepts negative length.
        segmentIndexAtLength: function(length, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return null; // if segments is an empty array

            var fromStart = true;
            if (length < 0) {
                fromStart = false; // negative lengths mean start calculation from end point
                length = -length; // absolute value
            }

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            // not using localOpt

            var lastVisibleSegmentIndex = null;
            var l = 0; // length so far
            for (var i = (fromStart ? 0 : (numSegments - 1)); (fromStart ? (i < numSegments) : (i >= 0)); (fromStart ? (i++) : (i--))) {

                var segment = segments[i];
                var subdivisions = segmentSubdivisions[i];
                var d = segment.length({ precision: precision, subdivisions: subdivisions });

                if (segment.isVisible) {
                    if (length <= (l + d)) return i;
                    lastVisibleSegmentIndex = i;
                }

                l += d;
            }

            // if length requested is higher than the length of the path, return last visible segment index
            // if no visible segment, return null
            return lastVisibleSegmentIndex;
        },

        // Returns tangent line at requested `ratio` between 0 and 1, with precision better than requested `opt.precision`; optionally using `opt.segmentSubdivisions` provided.
        tangentAt: function(ratio, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return null; // if segments is an empty array

            if (ratio < 0) ratio = 0;
            if (ratio > 1) ratio = 1;

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            var localOpt = { precision: precision, segmentSubdivisions: segmentSubdivisions };

            var pathLength = this.length(localOpt);
            var length = pathLength * ratio;

            return this.tangentAtLength(length, localOpt);
        },

        // Returns tangent line at requested `length`, with precision better than requested `opt.precision`; optionally using `opt.segmentSubdivisions` provided.
        // Accepts negative length.
        tangentAtLength: function(length, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return null; // if segments is an empty array

            var fromStart = true;
            if (length < 0) {
                fromStart = false; // negative lengths mean start calculation from end point
                length = -length; // absolute value
            }

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            // not using localOpt

            var lastValidSegment; // visible AND differentiable (with a tangent)
            var l = 0; // length so far
            for (var i = (fromStart ? 0 : (numSegments - 1)); (fromStart ? (i < numSegments) : (i >= 0)); (fromStart ? (i++) : (i--))) {

                var segment = segments[i];
                var subdivisions = segmentSubdivisions[i];
                var d = segment.length({ precision: precision, subdivisions: subdivisions });

                if (segment.isDifferentiable()) {
                    if (length <= (l + d)) {
                        return segment.tangentAtLength(((fromStart ? 1 : -1) * (length - l)), { precision: precision, subdivisions: subdivisions });
                    }

                    lastValidSegment = segment;
                }

                l += d;
            }

            // if length requested is higher than the length of the path, return tangent of endpoint of last valid segment
            if (lastValidSegment) {
                var t = (fromStart ? 1 : 0);
                return lastValidSegment.tangentAtT(t);
            }

            // if no valid segment, return null
            return null;
        },

        // Private function.
        tangentAtT: function(t) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return null; // if segments is an empty array

            var segmentIndex = t.segmentIndex;
            if (segmentIndex < 0) return segments[0].tangentAtT(0);
            if (segmentIndex >= numSegments) return segments[numSegments - 1].tangentAtT(1);

            var tValue = t.value;
            if (tValue < 0) tValue = 0;
            else if (tValue > 1) tValue = 1;

            return segments[segmentIndex].tangentAtT(tValue);
        },

        translate: function(tx, ty) {

            var segments = this.segments;
            var numSegments = segments.length;

            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                segment.translate(tx, ty);
            }

            return this;
        },

        // Helper method for updating subpath start of segments, starting with the one provided.
        updateSubpathStartSegment: function(segment) {

            var previousSegment = segment.previousSegment; // may be null
            while (segment && !segment.isSubpathStart) {

                // assign previous segment's subpath start segment to this segment
                if (previousSegment) segment.subpathStartSegment = previousSegment.subpathStartSegment; // may be null
                else segment.subpathStartSegment = null; // if segment had no previous segment, assign null - creates an invalid path!

                previousSegment = segment;
                segment = segment.nextSegment; // move on to the segment after etc.
            }
        },

        // Returns a string that can be used to reconstruct the path.
        // Additional error checking compared to toString (must start with M segment).
        serialize: function() {

            if (!this.isValid()) throw new Error('Invalid path segments.');

            return this.toString();
        },

        toString: function() {

            var segments = this.segments;
            var numSegments = segments.length;

            var pathData = '';
            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                pathData += segment.serialize() + ' ';
            }

            return pathData.trim();
        }
    };

    Object.defineProperty(Path.prototype, 'start', {
        // Getter for the first visible endpoint of the path.

        configurable: true,

        enumerable: true,

        get: function() {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return null;

            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                if (segment.isVisible) return segment.start;
            }

            // if no visible segment, return last segment end point
            return segments[numSegments - 1].end;
        }
    });

    Object.defineProperty(Path.prototype, 'end', {
        // Getter for the last visible endpoint of the path.

        configurable: true,

        enumerable: true,

        get: function() {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) return null;

            for (var i = numSegments - 1; i >= 0; i--) {

                var segment = segments[i];
                if (segment.isVisible) return segment.end;
            }

            // if no visible segment, return last segment end point
            return segments[numSegments - 1].end;
        }
    });

    /*
        Point is the most basic object consisting of x/y coordinate.

        Possible instantiations are:
        * `Point(10, 20)`
        * `new Point(10, 20)`
        * `Point('10 20')`
        * `Point(Point(10, 20))`
    */
    var Point = g.Point = function(x, y) {

        if (!(this instanceof Point)) {
            return new Point(x, y);
        }

        if (typeof x === 'string') {
            var xy = x.split(x.indexOf('@') === -1 ? ' ' : '@');
            x = parseFloat(xy[0]);
            y = parseFloat(xy[1]);

        } else if (Object(x) === x) {
            y = x.y;
            x = x.x;
        }

        this.x = x === undefined ? 0 : x;
        this.y = y === undefined ? 0 : y;
    };

    // Alternative constructor, from polar coordinates.
    // @param {number} Distance.
    // @param {number} Angle in radians.
    // @param {point} [optional] Origin.
    Point.fromPolar = function(distance, angle, origin) {

        origin = (origin && new Point(origin)) || new Point(0, 0);
        var x = abs(distance * cos(angle));
        var y = abs(distance * sin(angle));
        var deg = normalizeAngle(toDeg(angle));

        if (deg < 90) {
            y = -y;

        } else if (deg < 180) {
            x = -x;
            y = -y;

        } else if (deg < 270) {
            x = -x;
        }

        return new Point(origin.x + x, origin.y + y);
    };

    // Create a point with random coordinates that fall into the range `[x1, x2]` and `[y1, y2]`.
    Point.random = function(x1, x2, y1, y2) {

        return new Point(floor(random() * (x2 - x1 + 1) + x1), floor(random() * (y2 - y1 + 1) + y1));
    };

    Point.prototype = {

        // If point lies outside rectangle `r`, return the nearest point on the boundary of rect `r`,
        // otherwise return point itself.
        // (see Squeak Smalltalk, Point>>adhereTo:)
        adhereToRect: function(r) {

            if (r.containsPoint(this)) {
                return this;
            }

            this.x = min(max(this.x, r.x), r.x + r.width);
            this.y = min(max(this.y, r.y), r.y + r.height);
            return this;
        },

        // Return the bearing between me and the given point.
        bearing: function(point) {

            return (new Line(this, point)).bearing();
        },

        // Returns change in angle from my previous position (-dx, -dy) to my new position
        // relative to ref point.
        changeInAngle: function(dx, dy, ref) {

            // Revert the translation and measure the change in angle around x-axis.
            return this.clone().offset(-dx, -dy).theta(ref) - this.theta(ref);
        },

        clone: function() {

            return new Point(this);
        },

        difference: function(dx, dy) {

            if ((Object(dx) === dx)) {
                dy = dx.y;
                dx = dx.x;
            }

            return new Point(this.x - (dx || 0), this.y - (dy || 0));
        },

        // Returns distance between me and point `p`.
        distance: function(p) {

            return (new Line(this, p)).length();
        },

        squaredDistance: function(p) {

            return (new Line(this, p)).squaredLength();
        },

        equals: function(p) {

            return !!p &&
                this.x === p.x &&
                this.y === p.y;
        },

        magnitude: function() {

            return sqrt((this.x * this.x) + (this.y * this.y)) || 0.01;
        },

        // Returns a manhattan (taxi-cab) distance between me and point `p`.
        manhattanDistance: function(p) {

            return abs(p.x - this.x) + abs(p.y - this.y);
        },

        // Move point on line starting from ref ending at me by
        // distance distance.
        move: function(ref, distance) {

            var theta = toRad((new Point(ref)).theta(this));
            var offset = this.offset(cos(theta) * distance, -sin(theta) * distance);
            return offset;
        },

        // Scales x and y such that the distance between the point and the origin (0,0) is equal to the given length.
        normalize: function(length) {

            var scale = (length || 1) / this.magnitude();
            return this.scale(scale, scale);
        },

        // Offset me by the specified amount.
        offset: function(dx, dy) {

            if ((Object(dx) === dx)) {
                dy = dx.y;
                dx = dx.x;
            }

            this.x += dx || 0;
            this.y += dy || 0;
            return this;
        },

        // Returns a point that is the reflection of me with
        // the center of inversion in ref point.
        reflection: function(ref) {

            return (new Point(ref)).move(this, this.distance(ref));
        },

        // Rotate point by angle around origin.
        // Angle is flipped because this is a left-handed coord system (y-axis points downward).
        rotate: function(origin, angle) {

            origin = origin || new g.Point(0, 0);

            angle = toRad(normalizeAngle(-angle));
            var cosAngle = cos(angle);
            var sinAngle = sin(angle);

            var x = (cosAngle * (this.x - origin.x)) - (sinAngle * (this.y - origin.y)) + origin.x;
            var y = (sinAngle * (this.x - origin.x)) + (cosAngle * (this.y - origin.y)) + origin.y;

            this.x = x;
            this.y = y;
            return this;
        },

        round: function(precision) {

            var f = pow(10, precision || 0);
            this.x = round(this.x * f) / f;
            this.y = round(this.y * f) / f;
            return this;
        },

        // Scale point with origin.
        scale: function(sx, sy, origin) {

            origin = (origin && new Point(origin)) || new Point(0, 0);
            this.x = origin.x + sx * (this.x - origin.x);
            this.y = origin.y + sy * (this.y - origin.y);
            return this;
        },

        snapToGrid: function(gx, gy) {

            this.x = snapToGrid(this.x, gx);
            this.y = snapToGrid(this.y, gy || gx);
            return this;
        },

        // Compute the angle between me and `p` and the x axis.
        // (cartesian-to-polar coordinates conversion)
        // Return theta angle in degrees.
        theta: function(p) {

            p = new Point(p);

            // Invert the y-axis.
            var y = -(p.y - this.y);
            var x = p.x - this.x;
            var rad = atan2(y, x); // defined for all 0 corner cases

            // Correction for III. and IV. quadrant.
            if (rad < 0) {
                rad = 2 * PI + rad;
            }

            return 180 * rad / PI;
        },

        // Compute the angle between vector from me to p1 and the vector from me to p2.
        // ordering of points p1 and p2 is important!
        // theta function's angle convention:
        // returns angles between 0 and 180 when the angle is counterclockwise
        // returns angles between 180 and 360 to convert clockwise angles into counterclockwise ones
        // returns NaN if any of the points p1, p2 is coincident with this point
        angleBetween: function(p1, p2) {

            var angleBetween = (this.equals(p1) || this.equals(p2)) ? NaN : (this.theta(p2) - this.theta(p1));

            if (angleBetween < 0) {
                angleBetween += 360; // correction to keep angleBetween between 0 and 360
            }

            return angleBetween;
        },

        // Compute the angle between the vector from 0,0 to me and the vector from 0,0 to p.
        // Returns NaN if p is at 0,0.
        vectorAngle: function(p) {

            var zero = new Point(0,0);
            return zero.angleBetween(this, p);
        },

        toJSON: function() {

            return { x: this.x, y: this.y };
        },

        // Converts rectangular to polar coordinates.
        // An origin can be specified, otherwise it's 0@0.
        toPolar: function(o) {

            o = (o && new Point(o)) || new Point(0, 0);
            var x = this.x;
            var y = this.y;
            this.x = sqrt((x - o.x) * (x - o.x) + (y - o.y) * (y - o.y)); // r
            this.y = toRad(o.theta(new Point(x, y)));
            return this;
        },

        toString: function() {

            return this.x + '@' + this.y;
        },

        update: function(x, y) {

            this.x = x || 0;
            this.y = y || 0;
            return this;
        },

        // Returns the dot product of this point with given other point
        dot: function(p) {

            return p ? (this.x * p.x + this.y * p.y) : NaN;
        },

        // Returns the cross product of this point relative to two other points
        // this point is the common point
        // point p1 lies on the first vector, point p2 lies on the second vector
        // watch out for the ordering of points p1 and p2!
        // positive result indicates a clockwise ("right") turn from first to second vector
        // negative result indicates a counterclockwise ("left") turn from first to second vector
        // note that the above directions are reversed from the usual answer on the Internet
        // that is because we are in a left-handed coord system (because the y-axis points downward)
        cross: function(p1, p2) {

            return (p1 && p2) ? (((p2.x - this.x) * (p1.y - this.y)) - ((p2.y - this.y) * (p1.x - this.x))) : NaN;
        },


        // Linear interpolation
        lerp: function(p, t) {

            var x = this.x;
            var y = this.y;
            return new Point((1 - t) * x + t * p.x, (1 - t) * y + t * p.y);
        }
    };

    Point.prototype.translate = Point.prototype.offset;

    var Rect = g.Rect = function(x, y, w, h) {

        if (!(this instanceof Rect)) {
            return new Rect(x, y, w, h);
        }

        if ((Object(x) === x)) {
            y = x.y;
            w = x.width;
            h = x.height;
            x = x.x;
        }

        this.x = x === undefined ? 0 : x;
        this.y = y === undefined ? 0 : y;
        this.width = w === undefined ? 0 : w;
        this.height = h === undefined ? 0 : h;
    };

    Rect.fromEllipse = function(e) {

        e = new Ellipse(e);
        return new Rect(e.x - e.a, e.y - e.b, 2 * e.a, 2 * e.b);
    };

    Rect.prototype = {

        // Find my bounding box when I'm rotated with the center of rotation in the center of me.
        // @return r {rectangle} representing a bounding box
        bbox: function(angle) {

            if (!angle) return this.clone();

            var theta = toRad(angle || 0);
            var st = abs(sin(theta));
            var ct = abs(cos(theta));
            var w = this.width * ct + this.height * st;
            var h = this.width * st + this.height * ct;
            return new Rect(this.x + (this.width - w) / 2, this.y + (this.height - h) / 2, w, h);
        },

        bottomLeft: function() {

            return new Point(this.x, this.y + this.height);
        },

        bottomLine: function() {

            return new Line(this.bottomLeft(), this.bottomRight());
        },

        bottomMiddle: function() {

            return new Point(this.x + this.width / 2, this.y + this.height);
        },

        center: function() {

            return new Point(this.x + this.width / 2, this.y + this.height / 2);
        },

        clone: function() {

            return new Rect(this);
        },

        // @return {bool} true if point p is insight me
        containsPoint: function(p) {

            p = new Point(p);
            return p.x >= this.x && p.x <= this.x + this.width && p.y >= this.y && p.y <= this.y + this.height;
        },

        // @return {bool} true if rectangle `r` is inside me.
        containsRect: function(r) {

            var r0 = new Rect(this).normalize();
            var r1 = new Rect(r).normalize();
            var w0 = r0.width;
            var h0 = r0.height;
            var w1 = r1.width;
            var h1 = r1.height;

            if (!w0 || !h0 || !w1 || !h1) {
                // At least one of the dimensions is 0
                return false;
            }

            var x0 = r0.x;
            var y0 = r0.y;
            var x1 = r1.x;
            var y1 = r1.y;

            w1 += x1;
            w0 += x0;
            h1 += y1;
            h0 += y0;

            return x0 <= x1 && w1 <= w0 && y0 <= y1 && h1 <= h0;
        },

        corner: function() {

            return new Point(this.x + this.width, this.y + this.height);
        },

        // @return {boolean} true if rectangles are equal.
        equals: function(r) {

            var mr = (new Rect(this)).normalize();
            var nr = (new Rect(r)).normalize();
            return mr.x === nr.x && mr.y === nr.y && mr.width === nr.width && mr.height === nr.height;
        },

        // @return {rect} if rectangles intersect, {null} if not.
        intersect: function(r) {

            var myOrigin = this.origin();
            var myCorner = this.corner();
            var rOrigin = r.origin();
            var rCorner = r.corner();

            // No intersection found
            if (rCorner.x <= myOrigin.x ||
                rCorner.y <= myOrigin.y ||
                rOrigin.x >= myCorner.x ||
                rOrigin.y >= myCorner.y) return null;

            var x = max(myOrigin.x, rOrigin.x);
            var y = max(myOrigin.y, rOrigin.y);

            return new Rect(x, y, min(myCorner.x, rCorner.x) - x, min(myCorner.y, rCorner.y) - y);
        },

        intersectionWithLine: function(line) {

            var r = this;
            var rectLines = [ r.topLine(), r.rightLine(), r.bottomLine(), r.leftLine() ];
            var points = [];
            var dedupeArr = [];
            var pt, i;

            var n = rectLines.length;
            for (i = 0; i < n; i ++) {

                pt = line.intersect(rectLines[i]);
                if (pt !== null && dedupeArr.indexOf(pt.toString()) < 0) {
                    points.push(pt);
                    dedupeArr.push(pt.toString());
                }
            }

            return points.length > 0 ? points : null;
        },

        // Find point on my boundary where line starting
        // from my center ending in point p intersects me.
        // @param {number} angle If angle is specified, intersection with rotated rectangle is computed.
        intersectionWithLineFromCenterToPoint: function(p, angle) {

            p = new Point(p);
            var center = new Point(this.x + this.width / 2, this.y + this.height / 2);
            var result;

            if (angle) p.rotate(center, angle);

            // (clockwise, starting from the top side)
            var sides = [
                this.topLine(),
                this.rightLine(),
                this.bottomLine(),
                this.leftLine()
            ];
            var connector = new Line(center, p);

            for (var i = sides.length - 1; i >= 0; --i) {
                var intersection = sides[i].intersection(connector);
                if (intersection !== null) {
                    result = intersection;
                    break;
                }
            }
            if (result && angle) result.rotate(center, -angle);
            return result;
        },

        leftLine: function() {

            return new Line(this.topLeft(), this.bottomLeft());
        },

        leftMiddle: function() {

            return new Point(this.x , this.y + this.height / 2);
        },

        // Move and expand me.
        // @param r {rectangle} representing deltas
        moveAndExpand: function(r) {

            this.x += r.x || 0;
            this.y += r.y || 0;
            this.width += r.width || 0;
            this.height += r.height || 0;
            return this;
        },

        // Offset me by the specified amount.
        offset: function(dx, dy) {

            // pretend that this is a point and call offset()
            // rewrites x and y according to dx and dy
            return Point.prototype.offset.call(this, dx, dy);
        },

        // inflate by dx and dy, recompute origin [x, y]
        // @param dx {delta_x} representing additional size to x
        // @param dy {delta_y} representing additional size to y -
        // dy param is not required -> in that case y is sized by dx
        inflate: function(dx, dy) {

            if (dx === undefined) {
                dx = 0;
            }

            if (dy === undefined) {
                dy = dx;
            }

            this.x -= dx;
            this.y -= dy;
            this.width += 2 * dx;
            this.height += 2 * dy;

            return this;
        },

        // Normalize the rectangle; i.e., make it so that it has a non-negative width and height.
        // If width < 0 the function swaps the left and right corners,
        // and it swaps the top and bottom corners if height < 0
        // like in http://qt-project.org/doc/qt-4.8/qrectf.html#normalized
        normalize: function() {

            var newx = this.x;
            var newy = this.y;
            var newwidth = this.width;
            var newheight = this.height;
            if (this.width < 0) {
                newx = this.x + this.width;
                newwidth = -this.width;
            }
            if (this.height < 0) {
                newy = this.y + this.height;
                newheight = -this.height;
            }
            this.x = newx;
            this.y = newy;
            this.width = newwidth;
            this.height = newheight;
            return this;
        },

        origin: function() {

            return new Point(this.x, this.y);
        },

        // @return {point} a point on my boundary nearest to the given point.
        // @see Squeak Smalltalk, Rectangle>>pointNearestTo:
        pointNearestToPoint: function(point) {

            point = new Point(point);
            if (this.containsPoint(point)) {
                var side = this.sideNearestToPoint(point);
                switch (side){
                    case 'right': return new Point(this.x + this.width, point.y);
                    case 'left': return new Point(this.x, point.y);
                    case 'bottom': return new Point(point.x, this.y + this.height);
                    case 'top': return new Point(point.x, this.y);
                }
            }
            return point.adhereToRect(this);
        },

        rightLine: function() {

            return new Line(this.topRight(), this.bottomRight());
        },

        rightMiddle: function() {

            return new Point(this.x + this.width, this.y + this.height / 2);
        },

        round: function(precision) {

            var f = pow(10, precision || 0);
            this.x = round(this.x * f) / f;
            this.y = round(this.y * f) / f;
            this.width = round(this.width * f) / f;
            this.height = round(this.height * f) / f;
            return this;
        },

        // Scale rectangle with origin.
        scale: function(sx, sy, origin) {

            origin = this.origin().scale(sx, sy, origin);
            this.x = origin.x;
            this.y = origin.y;
            this.width *= sx;
            this.height *= sy;
            return this;
        },

        maxRectScaleToFit: function(rect, origin) {

            rect = new Rect(rect);
            origin || (origin = rect.center());

            var sx1, sx2, sx3, sx4, sy1, sy2, sy3, sy4;
            var ox = origin.x;
            var oy = origin.y;

            // Here we find the maximal possible scale for all corner points (for x and y axis) of the rectangle,
            // so when the scale is applied the point is still inside the rectangle.

            sx1 = sx2 = sx3 = sx4 = sy1 = sy2 = sy3 = sy4 = Infinity;

            // Top Left
            var p1 = rect.topLeft();
            if (p1.x < ox) {
                sx1 = (this.x - ox) / (p1.x - ox);
            }
            if (p1.y < oy) {
                sy1 = (this.y - oy) / (p1.y - oy);
            }
            // Bottom Right
            var p2 = rect.bottomRight();
            if (p2.x > ox) {
                sx2 = (this.x + this.width - ox) / (p2.x - ox);
            }
            if (p2.y > oy) {
                sy2 = (this.y + this.height - oy) / (p2.y - oy);
            }
            // Top Right
            var p3 = rect.topRight();
            if (p3.x > ox) {
                sx3 = (this.x + this.width - ox) / (p3.x - ox);
            }
            if (p3.y < oy) {
                sy3 = (this.y - oy) / (p3.y - oy);
            }
            // Bottom Left
            var p4 = rect.bottomLeft();
            if (p4.x < ox) {
                sx4 = (this.x - ox) / (p4.x - ox);
            }
            if (p4.y > oy) {
                sy4 = (this.y + this.height - oy) / (p4.y - oy);
            }

            return {
                sx: min(sx1, sx2, sx3, sx4),
                sy: min(sy1, sy2, sy3, sy4)
            };
        },

        maxRectUniformScaleToFit: function(rect, origin) {

            var scale = this.maxRectScaleToFit(rect, origin);
            return min(scale.sx, scale.sy);
        },

        // @return {string} (left|right|top|bottom) side which is nearest to point
        // @see Squeak Smalltalk, Rectangle>>sideNearestTo:
        sideNearestToPoint: function(point) {

            point = new Point(point);
            var distToLeft = point.x - this.x;
            var distToRight = (this.x + this.width) - point.x;
            var distToTop = point.y - this.y;
            var distToBottom = (this.y + this.height) - point.y;
            var closest = distToLeft;
            var side = 'left';

            if (distToRight < closest) {
                closest = distToRight;
                side = 'right';
            }
            if (distToTop < closest) {
                closest = distToTop;
                side = 'top';
            }
            if (distToBottom < closest) {
                closest = distToBottom;
                side = 'bottom';
            }
            return side;
        },

        snapToGrid: function(gx, gy) {

            var origin = this.origin().snapToGrid(gx, gy);
            var corner = this.corner().snapToGrid(gx, gy);
            this.x = origin.x;
            this.y = origin.y;
            this.width = corner.x - origin.x;
            this.height = corner.y - origin.y;
            return this;
        },

        topLine: function() {

            return new Line(this.topLeft(), this.topRight());
        },

        topMiddle: function() {

            return new Point(this.x + this.width / 2, this.y);
        },

        topRight: function() {

            return new Point(this.x + this.width, this.y);
        },

        toJSON: function() {

            return { x: this.x, y: this.y, width: this.width, height: this.height };
        },

        toString: function() {

            return this.origin().toString() + ' ' + this.corner().toString();
        },

        // @return {rect} representing the union of both rectangles.
        union: function(rect) {

            rect = new Rect(rect);
            var myOrigin = this.origin();
            var myCorner = this.corner();
            var rOrigin = rect.origin();
            var rCorner = rect.corner();

            var originX = min(myOrigin.x, rOrigin.x);
            var originY = min(myOrigin.y, rOrigin.y);
            var cornerX = max(myCorner.x, rCorner.x);
            var cornerY = max(myCorner.y, rCorner.y);

            return new Rect(originX, originY, cornerX - originX, cornerY - originY);
        }
    };

    Rect.prototype.bottomRight = Rect.prototype.corner;

    Rect.prototype.topLeft = Rect.prototype.origin;

    Rect.prototype.translate = Rect.prototype.offset;

    var Polyline = g.Polyline = function(points) {

        if (!(this instanceof Polyline)) {
            return new Polyline(points);
        }

        if (typeof points === 'string') {
            return new Polyline.parse(points);
        }

        this.points = (Array.isArray(points) ? points.map(Point) : []);
    };

    Polyline.parse = function(svgString) {
        svgString = svgString.trim();
        if (svgString === '') return new Polyline();

        var points = [];

        var coords = svgString.split(/\s*,\s*|\s+/);
        var n = coords.length;
        for (var i = 0; i < n; i += 2) {
            points.push({ x: +coords[i], y: +coords[i + 1] });
        }

        return new Polyline(points);
    };

    Polyline.prototype = {

        bbox: function() {

            var x1 = Infinity;
            var x2 = -Infinity;
            var y1 = Infinity;
            var y2 = -Infinity;

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return null; // if points array is empty

            for (var i = 0; i < numPoints; i++) {

                var point = points[i];
                var x = point.x;
                var y = point.y;

                if (x < x1) x1 = x;
                if (x > x2) x2 = x;
                if (y < y1) y1 = y;
                if (y > y2) y2 = y;
            }

            return new Rect(x1, y1, x2 - x1, y2 - y1);
        },

        clone: function() {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return new Polyline(); // if points array is empty

            var newPoints = [];
            for (var i = 0; i < numPoints; i++) {

                var point = points[i].clone();
                newPoints.push(point);
            }

            return new Polyline(newPoints);
        },

        closestPoint: function(p) {

            var cpLength = this.closestPointLength(p);

            return this.pointAtLength(cpLength);
        },

        closestPointLength: function(p) {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return 0; // if points array is empty
            if (numPoints === 1) return 0; // if there is only one point

            var cpLength;
            var minSqrDistance = Infinity;
            var length = 0;
            var n = numPoints - 1;
            for (var i = 0; i < n; i++) {

                var line = new Line(points[i], points[i + 1]);
                var lineLength = line.length();

                var cpNormalizedLength = line.closestPointNormalizedLength(p);
                var cp = line.pointAt(cpNormalizedLength);

                var sqrDistance = cp.squaredDistance(p);
                if (sqrDistance < minSqrDistance) {
                    minSqrDistance = sqrDistance;
                    cpLength = length + (cpNormalizedLength * lineLength);
                }

                length += lineLength;
            }

            return cpLength;
        },

        closestPointNormalizedLength: function(p) {

            var cpLength = this.closestPointLength(p);
            if (cpLength === 0) return 0; // shortcut

            var length = this.length();
            if (length === 0) return 0; // prevents division by zero

            return cpLength / length;
        },

        closestPointTangent: function(p) {

            var cpLength = this.closestPointLength(p);

            return this.tangentAtLength(cpLength);
        },

        // Returns a convex-hull polyline from this polyline.
        // Implements the Graham scan (https://en.wikipedia.org/wiki/Graham_scan).
        // Output polyline starts at the first element of the original polyline that is on the hull, then continues clockwise.
        // Minimal polyline is found (only vertices of the hull are reported, no collinear points).
        convexHull: function() {

            var i;
            var n;

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return new Polyline(); // if points array is empty

            // step 1: find the starting point - point with the lowest y (if equality, highest x)
            var startPoint;
            for (i = 0; i < numPoints; i++) {
                if (startPoint === undefined) {
                    // if this is the first point we see, set it as start point
                    startPoint = points[i];

                } else if (points[i].y < startPoint.y) {
                    // start point should have lowest y from all points
                    startPoint = points[i];

                } else if ((points[i].y === startPoint.y) && (points[i].x > startPoint.x)) {
                    // if two points have the lowest y, choose the one that has highest x
                    // there are no points to the right of startPoint - no ambiguity about theta 0
                    // if there are several coincident start point candidates, first one is reported
                    startPoint = points[i];
                }
            }

            // step 2: sort the list of points
            // sorting by angle between line from startPoint to point and the x-axis (theta)

            // step 2a: create the point records = [point, originalIndex, angle]
            var sortedPointRecords = [];
            for (i = 0; i < numPoints; i++) {

                var angle = startPoint.theta(points[i]);
                if (angle === 0) {
                    angle = 360; // give highest angle to start point
                    // the start point will end up at end of sorted list
                    // the start point will end up at beginning of hull points list
                }

                var entry = [points[i], i, angle];
                sortedPointRecords.push(entry);
            }

            // step 2b: sort the list in place
            sortedPointRecords.sort(function(record1, record2) {
                // returning a negative number here sorts record1 before record2
                // if first angle is smaller than second, first angle should come before second

                var sortOutput = record1[2] - record2[2];  // negative if first angle smaller
                if (sortOutput === 0) {
                    // if the two angles are equal, sort by originalIndex
                    sortOutput = record2[1] - record1[1]; // negative if first index larger
                    // coincident points will be sorted in reverse-numerical order
                    // so the coincident points with lower original index will be considered first
                }

                return sortOutput;
            });

            // step 2c: duplicate start record from the top of the stack to the bottom of the stack
            if (sortedPointRecords.length > 2) {
                var startPointRecord = sortedPointRecords[sortedPointRecords.length-1];
                sortedPointRecords.unshift(startPointRecord);
            }

            // step 3a: go through sorted points in order and find those with right turns
            // we want to get our results in clockwise order
            var insidePoints = {}; // dictionary of points with left turns - cannot be on the hull
            var hullPointRecords = []; // stack of records with right turns - hull point candidates

            var currentPointRecord;
            var currentPoint;
            var lastHullPointRecord;
            var lastHullPoint;
            var secondLastHullPointRecord;
            var secondLastHullPoint;
            while (sortedPointRecords.length !== 0) {

                currentPointRecord = sortedPointRecords.pop();
                currentPoint = currentPointRecord[0];

                // check if point has already been discarded
                // keys for insidePoints are stored in the form 'point.x@point.y@@originalIndex'
                if (insidePoints.hasOwnProperty(currentPointRecord[0] + '@@' + currentPointRecord[1])) {
                    // this point had an incorrect turn at some previous iteration of this loop
                    // this disqualifies it from possibly being on the hull
                    continue;
                }

                var correctTurnFound = false;
                while (!correctTurnFound) {

                    if (hullPointRecords.length < 2) {
                        // not enough points for comparison, just add current point
                        hullPointRecords.push(currentPointRecord);
                        correctTurnFound = true;

                    } else {
                        lastHullPointRecord = hullPointRecords.pop();
                        lastHullPoint = lastHullPointRecord[0];
                        secondLastHullPointRecord = hullPointRecords.pop();
                        secondLastHullPoint = secondLastHullPointRecord[0];

                        var crossProduct = secondLastHullPoint.cross(lastHullPoint, currentPoint);

                        if (crossProduct < 0) {
                            // found a right turn
                            hullPointRecords.push(secondLastHullPointRecord);
                            hullPointRecords.push(lastHullPointRecord);
                            hullPointRecords.push(currentPointRecord);
                            correctTurnFound = true;

                        } else if (crossProduct === 0) {
                            // the three points are collinear
                            // three options:
                            // there may be a 180 or 0 degree angle at lastHullPoint
                            // or two of the three points are coincident
                            var THRESHOLD = 1e-10; // we have to take rounding errors into account
                            var angleBetween = lastHullPoint.angleBetween(secondLastHullPoint, currentPoint);
                            if (abs(angleBetween - 180) < THRESHOLD) { // rouding around 180 to 180
                                // if the cross product is 0 because the angle is 180 degrees
                                // discard last hull point (add to insidePoints)
                                //insidePoints.unshift(lastHullPoint);
                                insidePoints[lastHullPointRecord[0] + '@@' + lastHullPointRecord[1]] = lastHullPoint;
                                // reenter second-to-last hull point (will be last at next iter)
                                hullPointRecords.push(secondLastHullPointRecord);
                                // do not do anything with current point
                                // correct turn not found

                            } else if (lastHullPoint.equals(currentPoint) || secondLastHullPoint.equals(lastHullPoint)) {
                                // if the cross product is 0 because two points are the same
                                // discard last hull point (add to insidePoints)
                                //insidePoints.unshift(lastHullPoint);
                                insidePoints[lastHullPointRecord[0] + '@@' + lastHullPointRecord[1]] = lastHullPoint;
                                // reenter second-to-last hull point (will be last at next iter)
                                hullPointRecords.push(secondLastHullPointRecord);
                                // do not do anything with current point
                                // correct turn not found

                            } else if (abs(((angleBetween + 1) % 360) - 1) < THRESHOLD) { // rounding around 0 and 360 to 0
                                // if the cross product is 0 because the angle is 0 degrees
                                // remove last hull point from hull BUT do not discard it
                                // reenter second-to-last hull point (will be last at next iter)
                                hullPointRecords.push(secondLastHullPointRecord);
                                // put last hull point back into the sorted point records list
                                sortedPointRecords.push(lastHullPointRecord);
                                // we are switching the order of the 0deg and 180deg points
                                // correct turn not found
                            }

                        } else {
                            // found a left turn
                            // discard last hull point (add to insidePoints)
                            //insidePoints.unshift(lastHullPoint);
                            insidePoints[lastHullPointRecord[0] + '@@' + lastHullPointRecord[1]] = lastHullPoint;
                            // reenter second-to-last hull point (will be last at next iter of loop)
                            hullPointRecords.push(secondLastHullPointRecord);
                            // do not do anything with current point
                            // correct turn not found
                        }
                    }
                }
            }
            // at this point, hullPointRecords contains the output points in clockwise order
            // the points start with lowest-y,highest-x startPoint, and end at the same point

            // step 3b: remove duplicated startPointRecord from the end of the array
            if (hullPointRecords.length > 2) {
                hullPointRecords.pop();
            }

            // step 4: find the lowest originalIndex record and put it at the beginning of hull
            var lowestHullIndex; // the lowest originalIndex on the hull
            var indexOfLowestHullIndexRecord = -1; // the index of the record with lowestHullIndex
            n = hullPointRecords.length;
            for (i = 0; i < n; i++) {

                var currentHullIndex = hullPointRecords[i][1];

                if (lowestHullIndex === undefined || currentHullIndex < lowestHullIndex) {
                    lowestHullIndex = currentHullIndex;
                    indexOfLowestHullIndexRecord = i;
                }
            }

            var hullPointRecordsReordered = [];
            if (indexOfLowestHullIndexRecord > 0) {
                var newFirstChunk = hullPointRecords.slice(indexOfLowestHullIndexRecord);
                var newSecondChunk = hullPointRecords.slice(0, indexOfLowestHullIndexRecord);
                hullPointRecordsReordered = newFirstChunk.concat(newSecondChunk);

            } else {
                hullPointRecordsReordered = hullPointRecords;
            }

            var hullPoints = [];
            n = hullPointRecordsReordered.length;
            for (i = 0; i < n; i++) {
                hullPoints.push(hullPointRecordsReordered[i][0]);
            }

            return new Polyline(hullPoints);
        },

        // Checks whether two polylines are exactly the same.
        // If `p` is undefined or null, returns false.
        equals: function(p) {

            if (!p) return false;

            var points = this.points;
            var otherPoints = p.points;

            var numPoints = points.length;
            if (otherPoints.length !== numPoints) return false; // if the two polylines have different number of points, they cannot be equal

            for (var i = 0; i < numPoints; i++) {

                var point = points[i];
                var otherPoint = p.points[i];

                // as soon as an inequality is found in points, return false
                if (!point.equals(otherPoint)) return false;
            }

            // if no inequality found in points, return true
            return true;
        },

        isDifferentiable: function() {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return false;

            var n = numPoints - 1;
            for (var i = 0; i < n; i++) {

                var a = points[i];
                var b = points[i + 1];
                var line = new Line(a, b);

                // as soon as a differentiable line is found between two points, return true
                if (line.isDifferentiable()) return true;
            }

            // if no differentiable line is found between pairs of points, return false
            return false;
        },

        length: function() {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return 0; // if points array is empty

            var length = 0;
            var n = numPoints - 1;
            for (var i = 0; i < n; i++) {
                length += points[i].distance(points[i + 1]);
            }

            return length;
        },

        pointAt: function(ratio) {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return null; // if points array is empty
            if (numPoints === 1) return points[0].clone(); // if there is only one point

            if (ratio <= 0) return points[0].clone();
            if (ratio >= 1) return points[numPoints - 1].clone();

            var polylineLength = this.length();
            var length = polylineLength * ratio;

            return this.pointAtLength(length);
        },

        pointAtLength: function(length) {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return null; // if points array is empty
            if (numPoints === 1) return points[0].clone(); // if there is only one point

            var fromStart = true;
            if (length < 0) {
                fromStart = false; // negative lengths mean start calculation from end point
                length = -length; // absolute value
            }

            var l = 0;
            var n = numPoints - 1;
            for (var i = (fromStart ? 0 : (n - 1)); (fromStart ? (i < n) : (i >= 0)); (fromStart ? (i++) : (i--))) {

                var a = points[i];
                var b = points[i + 1];
                var line = new Line(a, b);
                var d = a.distance(b);

                if (length <= (l + d)) {
                    return line.pointAtLength((fromStart ? 1 : -1) * (length - l));
                }

                l += d;
            }

            // if length requested is higher than the length of the polyline, return last endpoint
            var lastPoint = (fromStart ? points[numPoints - 1] : points[0]);
            return lastPoint.clone();
        },

        scale: function(sx, sy, origin) {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return this; // if points array is empty

            for (var i = 0; i < numPoints; i++) {
                points[i].scale(sx, sy, origin);
            }

            return this;
        },

        tangentAt: function(ratio) {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return null; // if points array is empty
            if (numPoints === 1) return null; // if there is only one point

            if (ratio < 0) ratio = 0;
            if (ratio > 1) ratio = 1;

            var polylineLength = this.length();
            var length = polylineLength * ratio;

            return this.tangentAtLength(length);
        },

        tangentAtLength: function(length) {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return null; // if points array is empty
            if (numPoints === 1) return null; // if there is only one point

            var fromStart = true;
            if (length < 0) {
                fromStart = false; // negative lengths mean start calculation from end point
                length = -length; // absolute value
            }

            var lastValidLine; // differentiable (with a tangent)
            var l = 0; // length so far
            var n = numPoints - 1;
            for (var i = (fromStart ? (0) : (n - 1)); (fromStart ? (i < n) : (i >= 0)); (fromStart ? (i++) : (i--))) {

                var a = points[i];
                var b = points[i + 1];
                var line = new Line(a, b);
                var d = a.distance(b);

                if (line.isDifferentiable()) { // has a tangent line (line length is not 0)
                    if (length <= (l + d)) {
                        return line.tangentAtLength((fromStart ? 1 : -1) * (length - l));
                    }

                    lastValidLine = line;
                }

                l += d;
            }

            // if length requested is higher than the length of the polyline, return last valid endpoint
            if (lastValidLine) {
                var ratio = (fromStart ? 1 : 0);
                return lastValidLine.tangentAt(ratio);
            }

            // if no valid line, return null
            return null;
        },

        intersectionWithLine: function(l) {
            var line = new Line(l);
            var intersections = [];
            var points = this.points;
            for (var i = 0, n = points.length - 1; i < n; i++) {
                var a = points[i];
                var b = points[i+1];
                var l2 = new Line(a, b);
                var int = line.intersectionWithLine(l2);
                if (int) intersections.push(int[0]);
            }
            return (intersections.length > 0) ? intersections : null;
        },

        translate: function(tx, ty) {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return this; // if points array is empty

            for (var i = 0; i < numPoints; i++) {
                points[i].translate(tx, ty);
            }

            return this;
        },

        // Return svgString that can be used to recreate this line.
        serialize: function() {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return ''; // if points array is empty

            var output = '';
            for (var i = 0; i < numPoints; i++) {

                var point = points[i];
                output += point.x + ',' + point.y + ' ';
            }

            return output.trim();
        },

        toString: function() {

            return this.points + '';
        }
    };

    Object.defineProperty(Polyline.prototype, 'start', {
        // Getter for the first point of the polyline.

        configurable: true,

        enumerable: true,

        get: function() {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return null; // if points array is empty

            return this.points[0];
        },
    });

    Object.defineProperty(Polyline.prototype, 'end', {
        // Getter for the last point of the polyline.

        configurable: true,

        enumerable: true,

        get: function() {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) return null; // if points array is empty

            return this.points[numPoints - 1];
        },
    });

    g.scale = {

        // Return the `value` from the `domain` interval scaled to the `range` interval.
        linear: function(domain, range, value) {

            var domainSpan = domain[1] - domain[0];
            var rangeSpan = range[1] - range[0];
            return (((value - domain[0]) / domainSpan) * rangeSpan + range[0]) || 0;
        }
    };

    var normalizeAngle = g.normalizeAngle = function(angle) {

        return (angle % 360) + (angle < 0 ? 360 : 0);
    };

    var snapToGrid = g.snapToGrid = function(value, gridSize) {

        return gridSize * round(value / gridSize);
    };

    var toDeg = g.toDeg = function(rad) {

        return (180 * rad / PI) % 360;
    };

    var toRad = g.toRad = function(deg, over360) {

        over360 = over360 || false;
        deg = over360 ? deg : (deg % 360);
        return deg * PI / 180;
    };

    // For backwards compatibility:
    g.ellipse = g.Ellipse;
    g.line = g.Line;
    g.point = g.Point;
    g.rect = g.Rect;

    // Local helper function.
    // Use an array of arguments to call a constructor (function called with `new`).
    // Adapted from https://stackoverflow.com/a/8843181/2263595
    // It is not necessary to use this function if the arguments can be passed separately (i.e. if the number of arguments is limited).
    // - If that is the case, use `new constructor(arg1, arg2)`, for example.
    // It is not necessary to use this function if the function that needs an array of arguments is not supposed to be used as a constructor.
    // - If that is the case, use `f.apply(thisArg, [arg1, arg2...])`, for example.
    function applyToNew(constructor, argsArray) {
        // The `new` keyword can only be applied to functions that take a limited number of arguments.
        // - We can fake that with .bind().
        // - It calls a function (`constructor`, here) with the arguments that were provided to it - effectively transforming an unlimited number of arguments into limited.
        // - So `new (constructor.bind(thisArg, arg1, arg2...))`
        // - `thisArg` can be anything (e.g. null) because `new` keyword resets context to the constructor object.
        // We need to pass in a variable number of arguments to the bind() call.
        // - We can use .apply().
        // - So `new (constructor.bind.apply(constructor, [thisArg, arg1, arg2...]))`
        // - `thisArg` can still be anything because `new` overwrites it.
        // Finally, to make sure that constructor.bind overwriting is not a problem, we switch to `Function.prototype.bind`.
        // - So, the final version is `new (Function.prototype.bind.apply(constructor, [thisArg, arg1, arg2...]))`

        // The function expects `argsArray[0]` to be `thisArg`.
        // - This means that whatever is sent as the first element will be ignored.
        // - The constructor will only see arguments starting from argsArray[1].
        // - So, a new dummy element is inserted at the start of the array.
        argsArray.unshift(null);

        return new (Function.prototype.bind.apply(constructor, argsArray));
    }

    // Local helper function.
    // Add properties from arguments on top of properties from `obj`.
    // This allows for rudimentary inheritance.
    // - The `obj` argument acts as parent.
    // - This function creates a new object that inherits all `obj` properties and adds/replaces those that are present in arguments.
    // - A high-level example: calling `extend(Vehicle, Car)` would be akin to declaring `class Car extends Vehicle`.
    function extend(obj) {
        // In JavaScript, the combination of a constructor function (e.g. `g.Line = function(...) {...}`) and prototype (e.g. `g.Line.prototype = {...}) is akin to a C++ class.
        // - When inheritance is not necessary, we can leave it at that. (This would be akin to calling extend with only `obj`.)
        // - But, what if we wanted the `g.Line` quasiclass to inherit from another quasiclass (let's call it `g.GeometryObject`) in JavaScript?
        // - First, realize that both of those quasiclasses would still have their own separate constructor function.
        // - So what we are actually saying is that we want the `g.Line` prototype to inherit from `g.GeometryObject` prototype.
        // - This method provides a way to do exactly that.
        // - It copies parent prototype's properties, then adds extra ones from child prototype/overrides parent prototype properties with child prototype properties.
        // - Therefore, to continue with the example above:
        //   - `g.Line.prototype = extend(g.GeometryObject.prototype, linePrototype)`
        //   - Where `linePrototype` is a properties object that looks just like `g.Line.prototype` does right now.
        //   - Then, `g.Line` would allow the programmer to access to all methods currently in `g.Line.Prototype`, plus any non-overriden methods from `g.GeometryObject.prototype`.
        //   - In that aspect, `g.GeometryObject` would then act like the parent of `g.Line`.
        // - Multiple inheritance is also possible, if multiple arguments are provided.
        // - What if we wanted to add another level of abstraction between `g.GeometryObject` and `g.Line` (let's call it `g.LinearObject`)?
        //   - `g.Line.prototype = extend(g.GeometryObject.prototype, g.LinearObject.prototype, linePrototype)`
        //   - The ancestors are applied in order of appearance.
        //   - That means that `g.Line` would have inherited from `g.LinearObject` that would have inherited from `g.GeometryObject`.
        //   - Any number of ancestors may be provided.
        // - Note that neither `obj` nor any of the arguments need to actually be prototypes of any JavaScript quasiclass, that was just a simplified explanation.
        // - We can create a new object composed from the properties of any number of other objects (since they do not have a constructor, we can think of those as interfaces).
        //   - `extend({ a: 1, b: 2 }, { b: 10, c: 20 }, { c: 100, d: 200 })` gives `{ a: 1, b: 10, c: 100, d: 200 }`.
        //   - Basically, with this function, we can emulate the `extends` keyword as well as the `implements` keyword.
        // - Therefore, both of the following are valid:
        //   - `Lineto.prototype = extend(Line.prototype, segmentPrototype, linetoPrototype)`
        //   - `Moveto.prototype = extend(segmentPrototype, movetoPrototype)`

        var i;
        var n;

        var args = [];
        n = arguments.length;
        for (i = 1; i < n; i++) { // skip over obj
            args.push(arguments[i]);
        }

        if (!obj) throw new Error('Missing a parent object.');
        var child = Object.create(obj);

        n = args.length;
        for (i = 0; i < n; i++) {

            var src = args[i];

            var inheritedProperty;
            var key;
            for (key in src) {

                if (src.hasOwnProperty(key)) {
                    delete child[key]; // delete property inherited from parent
                    inheritedProperty = Object.getOwnPropertyDescriptor(src, key); // get new definition of property from src
                    Object.defineProperty(child, key, inheritedProperty); // re-add property with new definition (includes getter/setter methods)
                }
            }
        }

        return child;
    }

    // Path segment interface:
    var segmentPrototype = {

        // Redirect calls to closestPointNormalizedLength() function if closestPointT() is not defined for segment.
        closestPointT: function(p) {

            if (this.closestPointNormalizedLength) return this.closestPointNormalizedLength(p);

            throw new Error('Neither closestPointT() nor closestPointNormalizedLength() function is implemented.');
        },

        isSegment: true,

        isSubpathStart: false, // true for Moveto segments

        isVisible: true, // false for Moveto segments

        nextSegment: null, // needed for subpath start segment updating

        // Return a fraction of result of length() function if lengthAtT() is not defined for segment.
        lengthAtT: function(t) {

            if (t <= 0) return 0;

            var length = this.length();

            if (t >= 1) return length;

            return length * t;
        },

        // Redirect calls to pointAt() function if pointAtT() is not defined for segment.
        pointAtT: function(t) {

            if (this.pointAt) return this.pointAt(t);

            throw new Error('Neither pointAtT() nor pointAt() function is implemented.');
        },

        previousSegment: null, // needed to get segment start property

        subpathStartSegment: null, // needed to get closepath segment end property

        // Redirect calls to tangentAt() function if tangentAtT() is not defined for segment.
        tangentAtT: function(t) {

            if (this.tangentAt) return this.tangentAt(t);

            throw new Error('Neither tangentAtT() nor tangentAt() function is implemented.');
        },

        // VIRTUAL PROPERTIES (must be overriden by actual Segment implementations):

        // type

        // start // getter, always throws error for Moveto

        // end // usually directly assigned, getter for Closepath

        bbox: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        clone: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        closestPoint: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        closestPointLength: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        closestPointNormalizedLength: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        closestPointTangent: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        equals: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        getSubdivisions: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        isDifferentiable: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        length: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        pointAt: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        pointAtLength: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        scale: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        tangentAt: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        tangentAtLength: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        translate: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        serialize: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        toString: function() {

            throw new Error('Declaration missing for virtual function.');
        }
    };

    // Path segment implementations:
    var Lineto = function() {

        var args = [];
        var n = arguments.length;
        for (var i = 0; i < n; i++) {
            args.push(arguments[i]);
        }

        if (!(this instanceof Lineto)) { // switching context of `this` to Lineto when called without `new`
            return applyToNew(Lineto, args);
        }

        if (n === 0) {
            throw new Error('Lineto constructor expects 1 point or 2 coordinates (none provided).');
        }

        var outputArray;

        if (typeof args[0] === 'string' || typeof args[0] === 'number') { // coordinates provided
            if (n === 2) {
                this.end = new Point(+args[0], +args[1]);
                return this;

            } else if (n < 2) {
                throw new Error('Lineto constructor expects 1 point or 2 coordinates (' + n + ' coordinates provided).');

            } else { // this is a poly-line segment
                var segmentCoords;
                outputArray = [];
                for (i = 0; i < n; i += 2) { // coords come in groups of two

                    segmentCoords = args.slice(i, i + 2); // will send one coord if args.length not divisible by 2
                    outputArray.push(applyToNew(Lineto, segmentCoords));
                }
                return outputArray;
            }

        } else { // points provided
            if (n === 1) {
                this.end = new Point(args[0]);
                return this;

            } else { // this is a poly-line segment
                var segmentPoint;
                outputArray = [];
                for (i = 0; i < n; i += 1) {

                    segmentPoint = args[i];
                    outputArray.push(new Lineto(segmentPoint));
                }
                return outputArray;
            }
        }
    };

    var linetoPrototype = {

        clone: function() {

            return new Lineto(this.end);
        },

        getSubdivisions: function() {

            return [];
        },

        isDifferentiable: function() {

            if (!this.previousSegment) return false;

            return !this.start.equals(this.end);
        },

        scale: function(sx, sy, origin) {

            this.end.scale(sx, sy, origin);
            return this;
        },

        translate: function(tx, ty) {

            this.end.translate(tx, ty);
            return this;
        },

        type: 'L',

        serialize: function() {

            var end = this.end;
            return this.type + ' ' + end.x + ' ' + end.y;
        },

        toString: function() {

            return this.type + ' ' + this.start + ' ' + this.end;
        }
    };

    Object.defineProperty(linetoPrototype, 'start', {
        // get a reference to the end point of previous segment

        configurable: true,

        enumerable: true,

        get: function() {

            if (!this.previousSegment) throw new Error('Missing previous segment. (This segment cannot be the first segment of a path; OR segment has not yet been added to a path.)');

            return this.previousSegment.end;
        }
    });

    Lineto.prototype = extend(segmentPrototype, Line.prototype, linetoPrototype);

    var Curveto = function() {

        var args = [];
        var n = arguments.length;
        for (var i = 0; i < n; i++) {
            args.push(arguments[i]);
        }

        if (!(this instanceof Curveto)) { // switching context of `this` to Curveto when called without `new`
            return applyToNew(Curveto, args);
        }

        if (n === 0) {
            throw new Error('Curveto constructor expects 3 points or 6 coordinates (none provided).');
        }

        var outputArray;

        if (typeof args[0] === 'string' || typeof args[0] === 'number') { // coordinates provided
            if (n === 6) {
                this.controlPoint1 = new Point(+args[0], +args[1]);
                this.controlPoint2 = new Point(+args[2], +args[3]);
                this.end = new Point(+args[4], +args[5]);
                return this;

            } else if (n < 6) {
                throw new Error('Curveto constructor expects 3 points or 6 coordinates (' + n + ' coordinates provided).');

            } else { // this is a poly-bezier segment
                var segmentCoords;
                outputArray = [];
                for (i = 0; i < n; i += 6) { // coords come in groups of six

                    segmentCoords = args.slice(i, i + 6); // will send fewer than six coords if args.length not divisible by 6
                    outputArray.push(applyToNew(Curveto, segmentCoords));
                }
                return outputArray;
            }

        } else { // points provided
            if (n === 3) {
                this.controlPoint1 = new Point(args[0]);
                this.controlPoint2 = new Point(args[1]);
                this.end = new Point(args[2]);
                return this;

            } else if (n < 3) {
                throw new Error('Curveto constructor expects 3 points or 6 coordinates (' + n + ' points provided).');

            } else { // this is a poly-bezier segment
                var segmentPoints;
                outputArray = [];
                for (i = 0; i < n; i += 3) { // points come in groups of three

                    segmentPoints = args.slice(i, i + 3); // will send fewer than three points if args.length is not divisible by 3
                    outputArray.push(applyToNew(Curveto, segmentPoints));
                }
                return outputArray;
            }
        }
    };

    var curvetoPrototype = {

        clone: function() {

            return new Curveto(this.controlPoint1, this.controlPoint2, this.end);
        },

        isDifferentiable: function() {

            if (!this.previousSegment) return false;

            var start = this.start;
            var control1 = this.controlPoint1;
            var control2 = this.controlPoint2;
            var end = this.end;

            return !(start.equals(control1) && control1.equals(control2) && control2.equals(end));
        },

        scale: function(sx, sy, origin) {

            this.controlPoint1.scale(sx, sy, origin);
            this.controlPoint2.scale(sx, sy, origin);
            this.end.scale(sx, sy, origin);
            return this;
        },

        translate: function(tx, ty) {

            this.controlPoint1.translate(tx, ty);
            this.controlPoint2.translate(tx, ty);
            this.end.translate(tx, ty);
            return this;
        },

        type: 'C',

        serialize: function() {

            var c1 = this.controlPoint1;
            var c2 = this.controlPoint2;
            var end = this.end;
            return this.type + ' ' + c1.x + ' ' + c1.y + ' ' + c2.x + ' ' + c2.y + ' ' + end.x + ' ' + end.y;
        },

        toString: function() {

            return this.type + ' ' + this.start + ' ' + this.controlPoint1 + ' ' + this.controlPoint2 + ' ' + this.end;
        }
    };

    Object.defineProperty(curvetoPrototype, 'start', {
        // get a reference to the end point of previous segment

        configurable: true,

        enumerable: true,

        get: function() {

            if (!this.previousSegment) throw new Error('Missing previous segment. (This segment cannot be the first segment of a path; OR segment has not yet been added to a path.)');

            return this.previousSegment.end;
        }
    });

    Curveto.prototype = extend(segmentPrototype, Curve.prototype, curvetoPrototype);

    var Moveto = function() {

        var args = [];
        var n = arguments.length;
        for (var i = 0; i < n; i++) {
            args.push(arguments[i]);
        }

        if (!(this instanceof Moveto)) { // switching context of `this` to Moveto when called without `new`
            return applyToNew(Moveto, args);
        }

        if (n === 0) {
            throw new Error('Moveto constructor expects 1 point or 2 coordinates (none provided).');
        }

        var outputArray;

        if (typeof args[0] === 'string' || typeof args[0] === 'number') { // coordinates provided
            if (n === 2) {
                this.end = new Point(+args[0], +args[1]);
                return this;

            } else if (n < 2) {
                throw new Error('Moveto constructor expects 1 point or 2 coordinates (' + n + ' coordinates provided).');

            } else { // this is a moveto-with-subsequent-poly-line segment
                var segmentCoords;
                outputArray = [];
                for (i = 0; i < n; i += 2) { // coords come in groups of two

                    segmentCoords = args.slice(i, i + 2); // will send one coord if args.length not divisible by 2
                    if (i === 0) outputArray.push(applyToNew(Moveto, segmentCoords));
                    else outputArray.push(applyToNew(Lineto, segmentCoords));
                }
                return outputArray;
            }

        } else { // points provided
            if (n === 1) {
                this.end = new Point(args[0]);
                return this;

            } else { // this is a moveto-with-subsequent-poly-line segment
                var segmentPoint;
                outputArray = [];
                for (i = 0; i < n; i += 1) { // points come one by one

                    segmentPoint = args[i];
                    if (i === 0) outputArray.push(new Moveto(segmentPoint));
                    else outputArray.push(new Lineto(segmentPoint));
                }
                return outputArray;
            }
        }
    };

    var movetoPrototype = {

        bbox: function() {

            return null;
        },

        clone: function() {

            return new Moveto(this.end);
        },

        closestPoint: function() {

            return this.end.clone();
        },

        closestPointNormalizedLength: function() {

            return 0;
        },

        closestPointLength: function() {

            return 0;
        },

        closestPointT: function() {

            return 1;
        },

        closestPointTangent: function() {

            return null;
        },

        equals: function(m) {

            return this.end.equals(m.end);
        },

        getSubdivisions: function() {

            return [];
        },

        isDifferentiable: function() {

            return false;
        },

        isSubpathStart: true,

        isVisible: false,

        length: function() {

            return 0;
        },

        lengthAtT: function() {

            return 0;
        },

        pointAt: function() {

            return this.end.clone();
        },

        pointAtLength: function() {

            return this.end.clone();
        },

        pointAtT: function() {

            return this.end.clone();
        },

        scale: function(sx, sy, origin) {

            this.end.scale(sx, sy, origin);
            return this;
        },

        tangentAt: function() {

            return null;
        },

        tangentAtLength: function() {

            return null;
        },

        tangentAtT: function() {

            return null;
        },

        translate: function(tx, ty) {

            this.end.translate(tx, ty);
            return this;
        },

        type: 'M',

        serialize: function() {

            var end = this.end;
            return this.type + ' ' + end.x + ' ' + end.y;
        },

        toString: function() {

            return this.type + ' ' + this.end;
        }
    };

    Object.defineProperty(movetoPrototype, 'start', {

        configurable: true,

        enumerable: true,

        get: function() {

            throw new Error('Illegal access. Moveto segments should not need a start property.');
        }
    })

    Moveto.prototype = extend(segmentPrototype, movetoPrototype); // does not inherit from any other geometry object

    var Closepath = function() {

        var args = [];
        var n = arguments.length;
        for (var i = 0; i < n; i++) {
            args.push(arguments[i]);
        }

        if (!(this instanceof Closepath)) { // switching context of `this` to Closepath when called without `new`
            return applyToNew(Closepath, args);
        }

        if (n > 0) {
            throw new Error('Closepath constructor expects no arguments.');
        }

        return this;
    };

    var closepathPrototype = {

        clone: function() {

            return new Closepath();
        },

        getSubdivisions: function() {

            return [];
        },

        isDifferentiable: function() {

            if (!this.previousSegment || !this.subpathStartSegment) return false;

            return !this.start.equals(this.end);
        },

        scale: function() {

            return this;
        },

        translate: function() {

            return this;
        },

        type: 'Z',

        serialize: function() {

            return this.type;
        },

        toString: function() {

            return this.type + ' ' + this.start + ' ' + this.end;
        }
    };

    Object.defineProperty(closepathPrototype, 'start', {
        // get a reference to the end point of previous segment

        configurable: true,

        enumerable: true,

        get: function() {

            if (!this.previousSegment) throw new Error('Missing previous segment. (This segment cannot be the first segment of a path; OR segment has not yet been added to a path.)');

            return this.previousSegment.end;
        }
    });

    Object.defineProperty(closepathPrototype, 'end', {
        // get a reference to the end point of subpath start segment

        configurable: true,

        enumerable: true,

        get: function() {

            if (!this.subpathStartSegment) throw new Error('Missing subpath start segment. (This segment needs a subpath start segment (e.g. Moveto); OR segment has not yet been added to a path.)');

            return this.subpathStartSegment.end;
        }
    })

    Closepath.prototype = extend(segmentPrototype, Line.prototype, closepathPrototype);

    var segmentTypes = Path.segmentTypes = {
        L: Lineto,
        C: Curveto,
        M: Moveto,
        Z: Closepath,
        z: Closepath
    };

    Path.regexSupportedData = new RegExp('^[\\s\\d' + Object.keys(segmentTypes).join('') + ',.]*$');

    Path.isDataSupported = function(d) {
        if (typeof d !== 'string') return false;
        return this.regexSupportedData.test(d);
    }

})(g);


    return g;

}));
