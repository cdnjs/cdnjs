/*! JointJS v2.0.0 (2017-10-23) - JavaScript diagramming library


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


//      Geometry library.

var g = (function() {

    var g = {};

    // Declare shorthands to the most used math functions.
    var math = Math;
    var abs = math.abs;
    var cos = math.cos;
    var sin = math.sin;
    var sqrt = math.sqrt;
    var mmin = math.min;
    var mmax = math.max;
    var atan2 = math.atan2;
    var round = math.round;
    var floor = math.floor;
    var PI = math.PI;
    var random = math.random;
    var pow = math.pow;

    g.bezier = {

        // Cubic Bezier curve path through points.
        // Ported from C# implementation by Oleg V. Polikarpotchkin and Peter Lee (http://www.codeproject.com/KB/graphics/BezierSpline.aspx).
        // @param {array} points Array of points through which the smooth line will go.
        // @return {array} SVG Path commands as an array
        curveThroughPoints: function(points) {

            var controlPoints = this.getCurveControlPoints(points);
            var path = ['M', points[0].x, points[0].y];

            for (var i = 0; i < controlPoints[0].length; i++) {
                path.push('C', controlPoints[0][i].x, controlPoints[0][i].y, controlPoints[1][i].x, controlPoints[1][i].y, points[i + 1].x, points[i + 1].y);
            }

            return path;
        },

        // Get open-ended Bezier Spline Control Points.
        // @param knots Input Knot Bezier spline points (At least two points!).
        // @param firstControlPoints Output First Control points. Array of knots.length - 1 length.
        // @param secondControlPoints Output Second Control points. Array of knots.length - 1 length.
        getCurveControlPoints: function(knots) {

            var firstControlPoints = [];
            var secondControlPoints = [];
            var n = knots.length - 1;
            var i;

            // Special case: Bezier curve should be a straight line.
            if (n == 1) {
                // 3P1 = 2P0 + P3
                firstControlPoints[0] = Point((2 * knots[0].x + knots[1].x) / 3,
                                              (2 * knots[0].y + knots[1].y) / 3);
                // P2 = 2P1 – P0
                secondControlPoints[0] = Point(2 * firstControlPoints[0].x - knots[0].x,
                                               2 * firstControlPoints[0].y - knots[0].y);
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
                firstControlPoints.push(Point(x[i], y[i]));
                // Second control point.
                if (i < n - 1) {
                    secondControlPoints.push(Point(2 * knots [i + 1].x - x[i + 1],
                                                   2 * knots[i + 1].y - y[i + 1]));
                } else {
                    secondControlPoints.push(Point((knots[n].x + x[n - 1]) / 2,
                                                   (knots[n].y + y[n - 1]) / 2));
                }
            }
            return [firstControlPoints, secondControlPoints];
        },

        // Divide a Bezier curve into two at point defined by value 't' <0,1>.
        // Using deCasteljau algorithm. http://math.stackexchange.com/a/317867
        // @param control points (start, control start, control end, end)
        // @return a function accepts t and returns 2 curves each defined by 4 control points.
        getCurveDivider: function(p0, p1, p2, p3) {

            return function divideCurve(t) {

                var l = Line(p0, p1).pointAt(t);
                var m = Line(p1, p2).pointAt(t);
                var n = Line(p2, p3).pointAt(t);
                var p = Line(l, m).pointAt(t);
                var q = Line(m, n).pointAt(t);
                var r = Line(p, q).pointAt(t);
                return [{ p0: p0, p1: l, p2: p, p3: r }, { p0: r, p1: q, p2: n, p3: p3 }];
            };
        },

        // Solves a tridiagonal system for one of coordinates (x or y) of first Bezier control points.
        // @param rhs Right hand side vector.
        // @return Solution vector.
        getFirstControlPoints: function(rhs) {

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

        // Solves an inversion problem -- Given the (x, y) coordinates of a point which lies on
        // a parametric curve x = x(t)/w(t), y = y(t)/w(t), ﬁnd the parameter value t
        // which corresponds to that point.
        // @param control points (start, control start, control end, end)
        // @return a function accepts a point and returns t.
        getInversionSolver: function(p0, p1, p2, p3) {

            var pts = arguments;
            function l(i, j) {
                // calculates a determinant 3x3
                // [p.x  p.y  1]
                // [pi.x pi.y 1]
                // [pj.x pj.y 1]
                var pi = pts[i];
                var pj = pts[j];
                return function(p) {
                    var w = (i % 3 ? 3 : 1) * (j % 3 ? 3 : 1);
                    var lij = p.x * (pi.y - pj.y) + p.y * (pj.x - pi.x) + pi.x * pj.y - pi.y * pj.x;
                    return w * lij;
                };
            }
            return function solveInversion(p) {
                var ct = 3 * l(2, 3)(p1);
                var c1 = l(1, 3)(p0) / ct;
                var c2 = -l(2, 3)(p0) / ct;
                var la = c1 * l(3, 1)(p) + c2 * (l(3, 0)(p) + l(2, 1)(p)) + l(2, 0)(p);
                var lb = c1 * l(3, 0)(p) + c2 * l(2, 0)(p) + l(1, 0)(p);
                return lb / (lb - la);
            };
        }
    };

    var Ellipse = g.Ellipse = function(c, a, b) {

        if (!(this instanceof Ellipse)) {
            return new Ellipse(c, a, b);
        }

        if (c instanceof Ellipse) {
            return new Ellipse(Point(c), c.a, c.b);
        }

        c = Point(c);
        this.x = c.x;
        this.y = c.y;
        this.a = a;
        this.b = b;
    };

    g.Ellipse.fromRect = function(rect) {

        rect = Rect(rect);
        return Ellipse(rect.center(), rect.width / 2, rect.height / 2);
    };

    g.Ellipse.prototype = {

        bbox: function() {

            return Rect(this.x - this.a, this.y - this.b, 2 * this.a, 2 * this.b);
        },

        clone: function() {

            return Ellipse(this);
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

            return Point(this.x, this.y);
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

            return g.point(x, y).theta(p);

        },

        equals: function(ellipse) {

            return !!ellipse &&
                    ellipse.x === this.x &&
                    ellipse.y === this.y &&
                    ellipse.a === this.a &&
                    ellipse.b === this.b;
        },

        // Find point on me where line from my center to
        // point p intersects my boundary.
        // @param {number} angle If angle is specified, intersection with rotated ellipse is computed.
        intersectionWithLineFromCenterToPoint: function(p, angle) {

            p = Point(p);
            if (angle) p.rotate(Point(this.x, this.y), angle);
            var dx = p.x - this.x;
            var dy = p.y - this.y;
            var result;
            if (dx === 0) {
                result = this.bbox().pointNearestToPoint(p);
                if (angle) return result.rotate(Point(this.x, this.y), -angle);
                return result;
            }
            var m = dy / dx;
            var mSquared = m * m;
            var aSquared = this.a * this.a;
            var bSquared = this.b * this.b;
            var x = sqrt(1 / ((1 / aSquared) + (mSquared / bSquared)));

            x = dx < 0 ? -x : x;
            var y = m * x;
            result = Point(this.x + x, this.y + y);
            if (angle) return result.rotate(Point(this.x, this.y), -angle);
            return result;
        },

        toString: function() {

            return Point(this.x, this.y).toString() + ' ' + this.a + ' ' + this.b;
        }
    };

    var Line = g.Line = function(p1, p2) {

        if (!(this instanceof Line)) {
            return new Line(p1, p2);
        }

        if (p1 instanceof Line) {
            return Line(p1.start, p1.end);
        }

        this.start = Point(p1);
        this.end = Point(p2);
    };

    g.Line.prototype = {

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

            return Line(this.start, this.end);
        },

        equals: function(l) {

            return !!l &&
                    this.start.x === l.start.x &&
                    this.start.y === l.start.y &&
                    this.end.x === l.end.x &&
                    this.end.y === l.end.y;
        },

        // @return {point} Point where I'm intersecting a line.
        // @return [point] Points where I'm intersecting a rectangle.
        // @see Squeak Smalltalk, LineSegment>>intersectionWith:
        intersect: function(l) {

            if (l instanceof Line) {
                // Passed in parameter is a line.

                var pt1Dir = Point(this.end.x - this.start.x, this.end.y - this.start.y);
                var pt2Dir = Point(l.end.x - l.start.x, l.end.y - l.start.y);
                var det = (pt1Dir.x * pt2Dir.y) - (pt1Dir.y * pt2Dir.x);
                var deltaPt = Point(l.start.x - this.start.x, l.start.y - this.start.y);
                var alpha = (deltaPt.x * pt2Dir.y) - (deltaPt.y * pt2Dir.x);
                var beta = (deltaPt.x * pt1Dir.y) - (deltaPt.y * pt1Dir.x);

                if (det === 0 ||
                    alpha * det < 0 ||
                    beta * det < 0) {
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
                return Point(
                    this.start.x + (alpha * pt1Dir.x / det),
                    this.start.y + (alpha * pt1Dir.y / det)
                );

            } else if (l instanceof Rect) {
                // Passed in parameter is a rectangle.

                var r = l;
                var rectLines = [ r.topLine(), r.rightLine(), r.bottomLine(), r.leftLine() ];
                var points = [];
                var dedupeArr = [];
                var pt, i;

                for (i = 0; i < rectLines.length; i ++) {
                    pt = this.intersect(rectLines[i]);
                    if (pt !== null && dedupeArr.indexOf(pt.toString()) < 0) {
                        points.push(pt);
                        dedupeArr.push(pt.toString());
                    }
                }

                return points.length > 0 ? points : null;
            }

            // Passed in parameter is neither a Line nor a Rectangle.
            return null;
        },

        // @return {double} length of the line
        length: function() {
            return sqrt(this.squaredLength());
        },

        // @return {point} my midpoint
        midpoint: function() {
            return Point(
                (this.start.x + this.end.x) / 2,
                (this.start.y + this.end.y) / 2
            );
        },

        // @return {point} my point at 't' <0,1>
        pointAt: function(t) {

            var x = (1 - t) * this.start.x + t * this.end.x;
            var y = (1 - t) * this.start.y + t * this.end.y;
            return Point(x, y);
        },

        // @return {number} the offset of the point `p` from the line. + if the point `p` is on the right side of the line, - if on the left and 0 if on the line.
        pointOffset: function(p) {

            // Find the sign of the determinant of vectors (start,end), where p is the query point.
            return ((this.end.x - this.start.x) * (p.y - this.start.y) - (this.end.y - this.start.y) * (p.x - this.start.x)) / 2;
        },

        // @return vector {point} of the line
        vector: function() {

            return Point(this.end.x - this.start.x, this.end.y - this.start.y);
        },

        // @return {point} the closest point on the line to point `p`
        closestPoint: function(p) {

            return this.pointAt(this.closestPointNormalizedLength(p));
        },

        // @return {number} the normalized length of the closest point on the line to point `p`
        closestPointNormalizedLength: function(p) {

            var product = this.vector().dot(Line(this.start, p).vector());

            return Math.min(1, Math.max(0, product / this.squaredLength()));
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

        toString: function() {
            return this.start.toString() + ' ' + this.end.toString();
        }
    };

    // For backwards compatibility:
    g.Line.prototype.intersection = g.Line.prototype.intersect;

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
            x = parseInt(xy[0], 10);
            y = parseInt(xy[1], 10);
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
    g.Point.fromPolar = function(distance, angle, origin) {

        origin = (origin && Point(origin)) || Point(0, 0);
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

        return Point(origin.x + x, origin.y + y);
    };

    // Create a point with random coordinates that fall into the range `[x1, x2]` and `[y1, y2]`.
    g.Point.random = function(x1, x2, y1, y2) {

        return Point(floor(random() * (x2 - x1 + 1) + x1), floor(random() * (y2 - y1 + 1) + y1));
    };

    g.Point.prototype = {

        // If point lies outside rectangle `r`, return the nearest point on the boundary of rect `r`,
        // otherwise return point itself.
        // (see Squeak Smalltalk, Point>>adhereTo:)
        adhereToRect: function(r) {

            if (r.containsPoint(this)) {
                return this;
            }

            this.x = mmin(mmax(this.x, r.x), r.x + r.width);
            this.y = mmin(mmax(this.y, r.y), r.y + r.height);
            return this;
        },

        // Return the bearing between me and the given point.
        bearing: function(point) {

            return Line(this, point).bearing();
        },

        // Returns change in angle from my previous position (-dx, -dy) to my new position
        // relative to ref point.
        changeInAngle: function(dx, dy, ref) {

            // Revert the translation and measure the change in angle around x-axis.
            return Point(this).offset(-dx, -dy).theta(ref) - this.theta(ref);
        },

        clone: function() {

            return Point(this);
        },

        difference: function(dx, dy) {

            if ((Object(dx) === dx)) {
                dy = dx.y;
                dx = dx.x;
            }

            return Point(this.x - (dx || 0), this.y - (dy || 0));
        },

        // Returns distance between me and point `p`.
        distance: function(p) {

            return Line(this, p).length();
        },

        squaredDistance: function(p) {

            return Line(this, p).squaredLength();
        },

        equals: function(p) {

            return !!p && this.x === p.x && this.y === p.y;
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

            var theta = toRad(Point(ref).theta(this));
            return this.offset(cos(theta) * distance, -sin(theta) * distance);
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

            return Point(ref).move(this, this.distance(ref));
        },

        // Rotate point by angle around origin.
        rotate: function(origin, angle) {

            angle = (angle + 360) % 360;
            this.toPolar(origin);
            this.y += toRad(angle);
            var point = Point.fromPolar(this.x, this.y, origin);
            this.x = point.x;
            this.y = point.y;
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

            origin = (origin && Point(origin)) || Point(0, 0);
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

            p = Point(p);
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
            
            var zero = Point(0,0);
            return zero.angleBetween(this, p);
        },

        toJSON: function() {

            return { x: this.x, y: this.y };
        },

        // Converts rectangular to polar coordinates.
        // An origin can be specified, otherwise it's 0@0.
        toPolar: function(o) {

            o = (o && Point(o)) || Point(0, 0);
            var x = this.x;
            var y = this.y;
            this.x = sqrt((x - o.x) * (x - o.x) + (y - o.y) * (y - o.y)); // r
            this.y = toRad(o.theta(Point(x, y)));
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
        }
    };

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

    g.Rect.fromEllipse = function(e) {

        e = Ellipse(e);
        return Rect(e.x - e.a, e.y - e.b, 2 * e.a, 2 * e.b);
    };

    g.Rect.prototype = {

        // Find my bounding box when I'm rotated with the center of rotation in the center of me.
        // @return r {rectangle} representing a bounding box
        bbox: function(angle) {

            var theta = toRad(angle || 0);
            var st = abs(sin(theta));
            var ct = abs(cos(theta));
            var w = this.width * ct + this.height * st;
            var h = this.width * st + this.height * ct;
            return Rect(this.x + (this.width - w) / 2, this.y + (this.height - h) / 2, w, h);
        },

        bottomLeft: function() {

            return Point(this.x, this.y + this.height);
        },

        bottomLine: function() {

            return Line(this.bottomLeft(), this.corner());
        },

        bottomMiddle: function() {

            return Point(this.x + this.width / 2, this.y + this.height);
        },

        center: function() {

            return Point(this.x + this.width / 2, this.y + this.height / 2);
        },

        clone: function() {

            return Rect(this);
        },

        // @return {bool} true if point p is insight me
        containsPoint: function(p) {

            p = Point(p);
            return p.x >= this.x && p.x <= this.x + this.width && p.y >= this.y && p.y <= this.y + this.height;
        },

        // @return {bool} true if rectangle `r` is inside me.
        containsRect: function(r) {

            var r0 = Rect(this).normalize();
            var r1 = Rect(r).normalize();
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

            return Point(this.x + this.width, this.y + this.height);
        },

        // @return {boolean} true if rectangles are equal.
        equals: function(r) {

            var mr = Rect(this).normalize();
            var nr = Rect(r).normalize();
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

            var x = Math.max(myOrigin.x, rOrigin.x);
            var y = Math.max(myOrigin.y, rOrigin.y);

            return Rect(x, y, Math.min(myCorner.x, rCorner.x) - x, Math.min(myCorner.y, rCorner.y) - y);
        },

        // Find point on my boundary where line starting
        // from my center ending in point p intersects me.
        // @param {number} angle If angle is specified, intersection with rotated rectangle is computed.
        intersectionWithLineFromCenterToPoint: function(p, angle) {

            p = Point(p);
            var center = Point(this.x + this.width / 2, this.y + this.height / 2);
            var result;
            if (angle) p.rotate(center, angle);

            // (clockwise, starting from the top side)
            var sides = [
                Line(this.origin(), this.topRight()),
                Line(this.topRight(), this.corner()),
                Line(this.corner(), this.bottomLeft()),
                Line(this.bottomLeft(), this.origin())
            ];
            var connector = Line(center, p);

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

            return Line(this.origin(), this.bottomLeft());
        },

        leftMiddle: function() {

            return Point(this.x , this.y + this.height / 2);
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

            return Point(this.x, this.y);
        },

        // @return {point} a point on my boundary nearest to the given point.
        // @see Squeak Smalltalk, Rectangle>>pointNearestTo:
        pointNearestToPoint: function(point) {

            point = Point(point);
            if (this.containsPoint(point)) {
                var side = this.sideNearestToPoint(point);
                switch (side){
                    case 'right': return Point(this.x + this.width, point.y);
                    case 'left': return Point(this.x, point.y);
                    case 'bottom': return Point(point.x, this.y + this.height);
                    case 'top': return Point(point.x, this.y);
                }
            }
            return point.adhereToRect(this);
        },

        rightLine: function() {

            return Line(this.topRight(), this.corner());
        },

        rightMiddle: function() {

            return Point(this.x + this.width, this.y + this.height / 2);
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

            rect = g.Rect(rect);
            origin || (origin = rect.center());

            var sx1, sx2, sx3, sx4, sy1, sy2, sy3, sy4;
            var ox = origin.x;
            var oy = origin.y;

            // Here we find the maximal possible scale for all corner points (for x and y axis) of the rectangle,
            // so when the scale is applied the point is still inside the rectangle.

            sx1 = sx2 = sx3 = sx4 = sy1 = sy2 = sy3 = sy4 = Infinity;

            // Top Left
            var p1 = rect.origin();
            if (p1.x < ox) {
                sx1 = (this.x - ox) / (p1.x - ox);
            }
            if (p1.y < oy) {
                sy1 = (this.y - oy) / (p1.y - oy);
            }
            // Bottom Right
            var p2 = rect.corner();
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
                sx: Math.min(sx1, sx2, sx3, sx4),
                sy: Math.min(sy1, sy2, sy3, sy4)
            };
        },

        maxRectUniformScaleToFit: function(rect, origin) {

            var scale = this.maxRectScaleToFit(rect, origin);
            return Math.min(scale.sx, scale.sy);
        },

        // @return {string} (left|right|top|bottom) side which is nearest to point
        // @see Squeak Smalltalk, Rectangle>>sideNearestTo:
        sideNearestToPoint: function(point) {

            point = Point(point);
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

            return Line(this.origin(), this.topRight());
        },

        topMiddle: function() {

            return Point(this.x + this.width / 2, this.y);
        },

        topRight: function() {

            return Point(this.x + this.width, this.y);
        },

        toJSON: function() {

            return { x: this.x, y: this.y, width: this.width, height: this.height };
        },

        toString: function() {

            return this.origin().toString() + ' ' + this.corner().toString();
        },

        // @return {rect} representing the union of both rectangles.
        union: function(rect) {

            rect = Rect(rect);
            var myOrigin = this.origin();
            var myCorner = this.corner();
            var rOrigin = rect.origin();
            var rCorner = rect.corner();

            var originX = Math.min(myOrigin.x, rOrigin.x);
            var originY = Math.min(myOrigin.y, rOrigin.y);
            var cornerX = Math.max(myCorner.x, rCorner.x);
            var cornerY = Math.max(myCorner.y, rCorner.y);

            return Rect(originX, originY, cornerX - originX, cornerY - originY);
        }
    };

    var Polyline = g.Polyline = function(points) {

        if (!(this instanceof Polyline)) {
            return new Polyline(points);
        }

        this.points = (Array.isArray(points)) ? points.map(Point) : [];
    };

    Polyline.prototype = {

        pointAtLength: function(length) {
            var points = this.points;
            var l = 0;
            for (var i = 0, n = points.length - 1; i < n; i++) {
                var a = points[i];
                var b = points[i+1];
                var d = a.distance(b);
                l += d;
                if (length <= l) {
                    return Line(b, a).pointAt(d ? (l - length) / d : 0);
                }
            }
            return null;
        },

        length: function() {
            var points = this.points;
            var length = 0;
            for (var i = 0, n = points.length - 1; i < n; i++) {
                length += points[i].distance(points[i+1]);
            }
            return length;
        },

        closestPoint: function(p) {
            return this.pointAtLength(this.closestPointLength(p));
        },

        closestPointLength: function(p) {
            var points = this.points;
            var pointLength;
            var minSqrDistance = Infinity;
            var length = 0;
            for (var i = 0, n = points.length - 1; i < n; i++) {
                var line = Line(points[i], points[i+1]);
                var lineLength = line.length();
                var cpNormalizedLength = line.closestPointNormalizedLength(p);
                var cp = line.pointAt(cpNormalizedLength);
                var sqrDistance = cp.squaredDistance(p);
                if (sqrDistance < minSqrDistance) {
                    minSqrDistance = sqrDistance;
                    pointLength = length + cpNormalizedLength * lineLength;
                }
                length += lineLength;
            }
            return pointLength;
        },

        toString: function() {

            return this.points + '';
        },

        // Returns a convex-hull polyline from this polyline.
        // this function implements the Graham scan (https://en.wikipedia.org/wiki/Graham_scan)
        // output polyline starts at the first element of the original polyline that is on the hull
        // output polyline then continues clockwise from that point
        convexHull: function() {

            var i;
            var n;

            var points = this.points;

            // step 1: find the starting point - point with the lowest y (if equality, highest x)
            var startPoint;
            n = points.length;
            for (i = 0; i < n; i++) {
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
            n = points.length;
            for (i = 0; i < n; i++) {
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
                            if (Math.abs(angleBetween - 180) < THRESHOLD) { // rouding around 180 to 180
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
                                                        
                            } else if (Math.abs(((angleBetween + 1) % 360) - 1) < THRESHOLD) { // rounding around 0 and 360 to 0
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

            return Polyline(hullPoints);
        }
    };


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

        return gridSize * Math.round(value / gridSize);
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

    return g;

})();


    return g;

}));
