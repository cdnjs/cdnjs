/*! JointJS v3.7.4 (2023-06-23) - JavaScript diagramming library


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.g = {}));
}(this, function (exports) { 'use strict';

    // Declare shorthands to the most used math functions.
    var round = Math.round;
    var floor = Math.floor;
    var PI = Math.PI;

    var scale = {

        // Return the `value` from the `domain` interval scaled to the `range` interval.
        linear: function(domain, range, value) {

            var domainSpan = domain[1] - domain[0];
            var rangeSpan = range[1] - range[0];
            return (((value - domain[0]) / domainSpan) * rangeSpan + range[0]) || 0;
        }
    };

    var normalizeAngle = function(angle) {

        return (angle % 360) + (angle < 0 ? 360 : 0);
    };

    var snapToGrid = function(value, gridSize) {

        return gridSize * round(value / gridSize);
    };

    var toDeg = function(rad) {

        return (180 * rad / PI) % 360;
    };

    var toRad = function(deg, over360) {

        over360 = over360 || false;
        deg = over360 ? deg : (deg % 360);
        return deg * PI / 180;
    };

    // Return a random integer from the interval [min,max], inclusive.
    var random = function(min, max) {

        if (max === undefined) {
            // use first argument as max, min is 0
            max = (min === undefined) ? 1 : min;
            min = 0;

        } else if (max < min) {
            // switch max and min
            var temp = min;
            min = max;
            max = temp;
        }

        return floor((Math.random() * (max - min + 1)) + min);
    };

    // @return the bearing (cardinal direction) of the line. For example N, W, or SE.

    var cos = Math.cos;
    var sin = Math.sin;
    var atan2 = Math.atan2;

    var bearing = function(p, q) {

        var lat1 = toRad(p.y);
        var lat2 = toRad(q.y);
        var lon1 = p.x;
        var lon2 = q.x;
        var dLon = toRad(lon2 - lon1);
        var y = sin(dLon) * cos(lat2);
        var x = cos(lat1) * sin(lat2) - sin(lat1) * cos(lat2) * cos(dLon);
        var brng = toDeg(atan2(y, x));

        var bearings = ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];

        var index = brng - 22.5;
        if (index < 0)
            { index += 360; }
        index = parseInt(index / 45);

        return bearings[index];
    };

    // @return {integer} length without sqrt
    // @note for applications where the exact length is not necessary (e.g. compare only)
    var squaredLength = function(start, end) {

        var x0 = start.x;
        var y0 = start.y;
        var x1 = end.x;
        var y1 = end.y;
        return (x0 -= x1) * x0 + (y0 -= y1) * y0;
    };

    var length = function(start, end) {
        return Math.sqrt(squaredLength(start, end));
    };

    var types = {
        Point: 1,
        Line: 2,
        Ellipse: 3,
        Rect: 4,
        Polyline: 5,
        Polygon: 6,
        Curve: 7,
        Path: 8
    };

    /*
        Point is the most basic object consisting of x/y coordinate.

        Possible instantiations are:
        * `Point(10, 20)`
        * `new Point(10, 20)`
        * `Point('10 20')`
        * `Point(Point(10, 20))`
    */

    var abs = Math.abs;
    var cos$1 = Math.cos;
    var sin$1 = Math.sin;
    var sqrt = Math.sqrt;
    var min = Math.min;
    var max = Math.max;
    var atan2$1 = Math.atan2;
    var round$1 = Math.round;
    var pow = Math.pow;
    var PI$1 = Math.PI;

    var Point = function(x, y) {

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

        origin = new Point(origin);
        var x = abs(distance * cos$1(angle));
        var y = abs(distance * sin$1(angle));
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

        return new Point(random(x1, x2), random(y1, y2));
    };

    Point.prototype = {

        type: types.Point,

        chooseClosest: function(points) {

            var n = points.length;
            if (n === 1) { return new Point(points[0]); }
            var closest = null;
            var minSqrDistance = Infinity;
            for (var i = 0; i < n; i++) {
                var p = new Point(points[i]);
                var sqrDistance = this.squaredDistance(p);
                if (sqrDistance < minSqrDistance) {
                    closest = p;
                    minSqrDistance = sqrDistance;
                }
            }
            return closest;
        },

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

        // Return the bearing between me and the given point.
        bearing: function(point) {
            return bearing(this, point);
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

        // Returns the cross product of this point relative to two other points
        // this point is the common point
        // point p1 lies on the first vector, point p2 lies on the second vector
        // watch out for the ordering of points p1 and p2!
        // positive result indicates a clockwise ("right") turn from first to second vector
        // negative result indicates a counterclockwise ("left") turn from first to second vector
        // zero indicates that the first and second vector are collinear
        // note that the above directions are reversed from the usual answer on the Internet
        // that is because we are in a left-handed coord system (because the y-axis points downward)
        cross: function(p1, p2) {

            return (p1 && p2) ? (((p2.x - this.x) * (p1.y - this.y)) - ((p2.y - this.y) * (p1.x - this.x))) : NaN;
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
            return length(this, p);
        },

        // Returns the dot product of this point with given other point
        dot: function(p) {

            return p ? (this.x * p.x + this.y * p.y) : NaN;
        },

        equals: function(p) {

            return !!p &&
                this.x === p.x &&
                this.y === p.y;
        },

        // Linear interpolation
        lerp: function(p, t) {

            var x = this.x;
            var y = this.y;
            return new Point((1 - t) * x + t * p.x, (1 - t) * y + t * p.y);
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
            var offset = this.offset(cos$1(theta) * distance, -sin$1(theta) * distance);
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

            if (angle === 0) { return this; }

            origin = origin || new Point(0, 0);

            angle = toRad(normalizeAngle(-angle));
            var cosAngle = cos$1(angle);
            var sinAngle = sin$1(angle);

            var x = (cosAngle * (this.x - origin.x)) - (sinAngle * (this.y - origin.y)) + origin.x;
            var y = (sinAngle * (this.x - origin.x)) + (cosAngle * (this.y - origin.y)) + origin.y;

            this.x = x;
            this.y = y;
            return this;
        },

        round: function(precision) {

            var f = 1; // case 0
            if (precision) {
                switch (precision) {
                    case 1: f = 10; break;
                    case 2: f = 100; break;
                    case 3: f = 1000; break;
                    default: f = pow(10, precision); break;
                }
            }

            this.x = round$1(this.x * f) / f;
            this.y = round$1(this.y * f) / f;
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

        squaredDistance: function(p) {
            return squaredLength(this, p);
        },

        // Compute the angle between me and `p` and the x axis.
        // (cartesian-to-polar coordinates conversion)
        // Return theta angle in degrees.
        theta: function(p) {

            p = new Point(p);

            // Invert the y-axis.
            var y = -(p.y - this.y);
            var x = p.x - this.x;
            var rad = atan2$1(y, x); // defined for all 0 corner cases

            // Correction for III. and IV. quadrant.
            if (rad < 0) {
                rad = 2 * PI$1 + rad;
            }

            return 180 * rad / PI$1;
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

        serialize: function() {

            return this.x + ',' + this.y;
        },

        update: function(x, y) {

            if ((Object(x) === x)) {
                y = x.y;
                x = x.x;
            }

            this.x = x || 0;
            this.y = y || 0;
            return this;
        },

        // Compute the angle between the vector from 0,0 to me and the vector from 0,0 to p.
        // Returns NaN if p is at 0,0.
        vectorAngle: function(p) {

            var zero = new Point(0, 0);
            return zero.angleBetween(this, p);
        }
    };

    Point.prototype.translate = Point.prototype.offset;

    // For backwards compatibility:
    var point = Point;

    var max$1 = Math.max;
    var min$1 = Math.min;

    var Line = function(p1, p2) {

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

        type: types.Line,

        // @returns the angle of incline of the line.
        angle: function() {

            var horizontalPoint = new Point(this.start.x + 1, this.start.y);
            return this.start.angleBetween(this.end, horizontalPoint);
        },

        bbox: function() {

            var left = min$1(this.start.x, this.end.x);
            var top = min$1(this.start.y, this.end.y);
            var right = max$1(this.start.x, this.end.x);
            var bottom = max$1(this.start.y, this.end.y);

            return new Rect(left, top, (right - left), (bottom - top));
        },

        // @return the bearing (cardinal direction) of the line. For example N, W, or SE.
        // @returns {String} One of the following bearings : NE, E, SE, S, SW, W, NW, N.
        bearing: function() {
            return bearing(this.start, this.end);
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
            var cpNormalizedLength = min$1(1, max$1(0, product / this.squaredLength()));

            // cpNormalizedLength returns `NaN` if this line has zero length
            // we can work with that - if `NaN`, return 0
            if (cpNormalizedLength !== cpNormalizedLength) { return 0; } // condition evaluates to `true` if and only if cpNormalizedLength is `NaN`
            // (`NaN` is the only value that is not equal to itself)

            return cpNormalizedLength;
        },

        closestPointTangent: function(p) {

            return this.tangentAt(this.closestPointNormalizedLength(p));
        },

        // Returns `true` if the point lies on the line.
        containsPoint: function(p) {

            var start = this.start;
            var end = this.end;

            if (start.cross(p, end) !== 0) { return false; }
            // else: cross product of 0 indicates that this line and the vector to `p` are collinear

            var length = this.length();
            if ((new Line(start, p)).length() > length) { return false; }
            if ((new Line(p, end)).length() > length) { return false; }
            // else: `p` lies between start and end of the line

            return true;
        },

        // Divides the line into two at requested `ratio` between 0 and 1.
        divideAt: function(ratio) {

            var dividerPoint = this.pointAt(ratio);

            // return array with two lines
            return [
                new Line(this.start, dividerPoint),
                new Line(dividerPoint, this.end)
            ];
        },

        // Divides the line into two at requested `length`.
        divideAtLength: function(length) {

            var dividerPoint = this.pointAtLength(length);

            // return array with two new lines
            return [
                new Line(this.start, dividerPoint),
                new Line(dividerPoint, this.end)
            ];
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
        intersect: function(shape, opt) {

            if (shape && shape.intersectionWithLine) {
                var intersection = shape.intersectionWithLine(this, opt);

                // Backwards compatibility
                if (intersection && (shape instanceof Line)) {
                    intersection = intersection[0];
                }

                return intersection;
            }

            return null;
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

        isDifferentiable: function() {

            return !this.start.equals(this.end);
        },

        // @return {double} length of the line
        length: function() {
            return length(this.start, this.end);
        },

        // @return {point} my midpoint
        midpoint: function() {

            return new Point(
                (this.start.x + this.end.x) / 2,
                (this.start.y + this.end.y) / 2
            );
        },

        parallel: function(distance) {
            var l = this.clone();
            if (!this.isDifferentiable()) { return l; }
            var start = l.start;
            var end = l.end;
            var eRef = start.clone().rotate(end, 270);
            var sRef = end.clone().rotate(start, 90);
            start.move(sRef, distance);
            end.move(eRef, distance);
            return l;
        },

        // @return {point} my point at 't' <0,1>
        pointAt: function(t) {

            var start = this.start;
            var end = this.end;

            if (t <= 0) { return start.clone(); }
            if (t >= 1) { return end.clone(); }

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
            if (length >= lineLength) { return (fromStart ? end.clone() : start.clone()); }

            return this.pointAt((fromStart ? (length) : (lineLength - length)) / lineLength);
        },

        // @return {number} the offset of the point `p` from the line. + if the point `p` is on the right side of the line, - if on the left and 0 if on the line.
        pointOffset: function(p) {

            // Find the sign of the determinant of vectors (start,end), where p is the query point.
            p = new Point(p);
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

            this.start.round(precision);
            this.end.round(precision);
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
            if (!currentLength) { return this; }

            var scaleFactor = length / currentLength;
            return this.scale(scaleFactor, scaleFactor, this.start);
        },

        // @return {integer} length without sqrt
        // @note for applications where the exact length is not necessary (e.g. compare only)
        squaredLength: function() {
            return squaredLength(this.start, this.end);
        },

        tangentAt: function(t) {

            if (!this.isDifferentiable()) { return null; }

            var start = this.start;
            var end = this.end;

            var tangentStart = this.pointAt(t); // constrains `t` between 0 and 1

            var tangentLine = new Line(start, end);
            tangentLine.translate(tangentStart.x - start.x, tangentStart.y - start.y); // move so that tangent line starts at the point requested

            return tangentLine;
        },

        tangentAtLength: function(length) {

            if (!this.isDifferentiable()) { return null; }

            var start = this.start;
            var end = this.end;

            var tangentStart = this.pointAtLength(length);

            var tangentLine = new Line(start, end);
            tangentLine.translate(tangentStart.x - start.x, tangentStart.y - start.y); // move so that tangent line starts at the point requested

            return tangentLine;
        },

        toString: function() {

            return this.start.toString() + ' ' + this.end.toString();
        },

        serialize: function() {

            return this.start.serialize() + ' ' + this.end.serialize();
        },

        translate: function(tx, ty) {

            this.start.translate(tx, ty);
            this.end.translate(tx, ty);
            return this;
        },

        // @return vector {point} of the line
        vector: function() {

            return new Point(this.end.x - this.start.x, this.end.y - this.start.y);
        }
    };

    // For backwards compatibility:
    Line.prototype.intersection = Line.prototype.intersect;


    // For backwards compatibility:
    var line = Line;

    var sqrt$1 = Math.sqrt;
    var round$2 = Math.round;
    var pow$1 = Math.pow;

    var Ellipse = function(c, a, b) {

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

        type: types.Ellipse,

        bbox: function() {

            return new Rect(this.x - this.a, this.y - this.b, 2 * this.a, 2 * this.b);
        },

        /**
         * @returns {g.Point}
         */
        center: function() {

            return new Point(this.x, this.y);
        },

        clone: function() {

            return new Ellipse(this);
        },

        /**
         * @param {g.Point} p
         * @returns {boolean}
         */
        containsPoint: function(p) {

            return this.normalizedDistance(p) <= 1;
        },

        equals: function(ellipse) {

            return !!ellipse &&
                ellipse.x === this.x &&
                ellipse.y === this.y &&
                ellipse.a === this.a &&
                ellipse.b === this.b;
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
                var root = sqrt$1(d);
                var ta = (-b - root) / a;
                var tb = (-b + root) / a;

                if ((ta < 0 || 1 < ta) && (tb < 0 || 1 < tb)) {
                    // if ((ta < 0 && tb < 0) || (ta > 1 && tb > 1)) outside else inside
                    return null;
                } else {
                    if (0 <= ta && ta <= 1) { intersections.push(a1.lerp(a2, ta)); }
                    if (0 <= tb && tb <= 1) { intersections.push(a1.lerp(a2, tb)); }
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

            if (angle) { p.rotate(new Point(this.x, this.y), angle); }

            var dx = p.x - this.x;
            var dy = p.y - this.y;
            var result;

            if (dx === 0) {
                result = this.bbox().pointNearestToPoint(p);
                if (angle) { return result.rotate(new Point(this.x, this.y), -angle); }
                return result;
            }

            var m = dy / dx;
            var mSquared = m * m;
            var aSquared = this.a * this.a;
            var bSquared = this.b * this.b;

            var x = sqrt$1(1 / ((1 / aSquared) + (mSquared / bSquared)));
            x = dx < 0 ? -x : x;

            var y = m * x;
            result = new Point(this.x + x, this.y + y);

            if (angle) { return result.rotate(new Point(this.x, this.y), -angle); }
            return result;
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

            return ((x0 - x) * (x0 - x)) / (a * a) + ((y0 - y) * (y0 - y)) / (b * b);
        },

        round: function(precision) {

            var f = 1; // case 0
            if (precision) {
                switch (precision) {
                    case 1: f = 10; break;
                    case 2: f = 100; break;
                    case 3: f = 1000; break;
                    default: f = pow$1(10, precision); break;
                }
            }

            this.x = round$2(this.x * f) / f;
            this.y = round$2(this.y * f) / f;
            this.a = round$2(this.a * f) / f;
            this.b = round$2(this.b * f) / f;
            return this;
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
                y = (b * b / (y0 - n)) - (b * b * (x0 - m) * (x - m)) / (a * a * (y0 - n)) + n;
            }

            return (new Point(x, y)).theta(p);

        },

        toString: function() {

            return (new Point(this.x, this.y)).toString() + ' ' + this.a + ' ' + this.b;
        }
    };

    // For backwards compatibility:
    var ellipse = Ellipse;

    var abs$1 = Math.abs;
    var cos$2 = Math.cos;
    var sin$2 = Math.sin;
    var min$2 = Math.min;
    var max$2 = Math.max;
    var round$3 = Math.round;
    var pow$2 = Math.pow;

    var Rect = function(x, y, w, h) {

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

    Rect.fromPointUnion = function() {
        var points = [], len = arguments.length;
        while ( len-- ) points[ len ] = arguments[ len ];


        if (points.length === 0) { return null; }

        var p = new Point();
        var minX, minY, maxX, maxY;
        minX = minY = Infinity;
        maxX = maxY = -Infinity;

        for (var i = 0; i < points.length; i++) {
            p.update(points[i]);
            var x = p.x;
            var y = p.y;

            if (x < minX) { minX = x; }
            if (x > maxX) { maxX = x; }
            if (y < minY) { minY = y; }
            if (y > maxY) { maxY = y; }
        }

        return new Rect(minX, minY, maxX - minX, maxY - minY);
    };

    Rect.fromRectUnion = function() {
        var rects = [], len = arguments.length;
        while ( len-- ) rects[ len ] = arguments[ len ];


        if (rects.length === 0) { return null; }

        var r = new Rect();
        var minX, minY, maxX, maxY;
        minX = minY = Infinity;
        maxX = maxY = -Infinity;

        for (var i = 0; i < rects.length; i++) {
            r.update(rects[i]);
            var x = r.x;
            var y = r.y;
            var mX = x + r.width;
            var mY = y + r.height;

            if (x < minX) { minX = x; }
            if (mX > maxX) { maxX = mX; }
            if (y < minY) { minY = y; }
            if (mY > maxY) { maxY = mY; }
        }

        return new Rect(minX, minY, maxX - minX, maxY - minY);
    };

    Rect.prototype = {

        type: types.Rect,

        // Find my bounding box when I'm rotated with the center of rotation in the center of me.
        // @return r {rectangle} representing a bounding box
        bbox: function(angle) {
            return this.clone().rotateAroundCenter(angle);
        },

        rotateAroundCenter: function(angle) {
            if (!angle) { return this; }
            var ref = this;
            var width = ref.width;
            var height = ref.height;
            var theta = toRad(angle);
            var st = abs$1(sin$2(theta));
            var ct = abs$1(cos$2(theta));
            var w = width * ct + height * st;
            var h = width * st + height * ct;
            this.x += (width - w) / 2;
            this.y += (height - h) / 2;
            this.width = w;
            this.height = h;
            return this;
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

        // @return {bool} true if point p is inside me.
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
                rOrigin.y >= myCorner.y) { return null; }

            var x = max$2(myOrigin.x, rOrigin.x);
            var y = max$2(myOrigin.y, rOrigin.y);

            return new Rect(x, y, min$2(myCorner.x, rCorner.x) - x, min$2(myCorner.y, rCorner.y) - y);
        },

        intersectionWithLine: function(line) {

            var r = this;
            var rectLines = [r.topLine(), r.rightLine(), r.bottomLine(), r.leftLine()];
            var points = [];
            var dedupeArr = [];
            var pt, i;

            var n = rectLines.length;
            for (i = 0; i < n; i++) {

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

            if (angle) { p.rotate(center, angle); }

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
            if (result && angle) { result.rotate(center, -angle); }
            return result;
        },

        leftLine: function() {

            return new Line(this.topLeft(), this.bottomLeft());
        },

        leftMiddle: function() {

            return new Point(this.x, this.y + this.height / 2);
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
                sx: min$2(sx1, sx2, sx3, sx4),
                sy: min$2(sy1, sy2, sy3, sy4)
            };
        },

        maxRectUniformScaleToFit: function(rect, origin) {

            var scale = this.maxRectScaleToFit(rect, origin);
            return min$2(scale.sx, scale.sy);
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

        // Offset me by the specified amount.
        offset: function(dx, dy) {

            // pretend that this is a point and call offset()
            // rewrites x and y according to dx and dy
            return Point.prototype.offset.call(this, dx, dy);
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
                switch (side) {
                    case 'right':
                        return new Point(this.x + this.width, point.y);
                    case 'left':
                        return new Point(this.x, point.y);
                    case 'bottom':
                        return new Point(point.x, this.y + this.height);
                    case 'top':
                        return new Point(point.x, this.y);
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

            var f = 1; // case 0
            if (precision) {
                switch (precision) {
                    case 1: f = 10; break;
                    case 2: f = 100; break;
                    case 3: f = 1000; break;
                    default: f = pow$2(10, precision); break;
                }
            }

            this.x = round$3(this.x * f) / f;
            this.y = round$3(this.y * f) / f;
            this.width = round$3(this.width * f) / f;
            this.height = round$3(this.height * f) / f;
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
                // closest = distToBottom;
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

        toJSON: function() {

            return { x: this.x, y: this.y, width: this.width, height: this.height };
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

        toString: function() {

            return this.origin().toString() + ' ' + this.corner().toString();
        },

        // @return {rect} representing the union of both rectangles.
        union: function(rect) {

            return Rect.fromRectUnion(this, rect);
        },

        update: function(x, y, w, h) {

            if ((Object(x) === x)) {
                y = x.y;
                w = x.width;
                h = x.height;
                x = x.x;
            }

            this.x = x || 0;
            this.y = y || 0;
            this.width = w || 0;
            this.height = h || 0;
            return this;
        }
    };

    Rect.prototype.bottomRight = Rect.prototype.corner;

    Rect.prototype.topLeft = Rect.prototype.origin;

    Rect.prototype.translate = Rect.prototype.offset;

    // For backwards compatibility:
    var rect = Rect;

    function parsePoints(svgString) {

        // Step 1: Discard surrounding spaces
        var trimmedString = svgString.trim();
        if (trimmedString === '') { return []; }

        var points = [];

        // Step 2: Split at commas (+ their surrounding spaces) or at multiple spaces
        // ReDoS mitigation: Have an anchor at the beginning of each alternation
        // Note: This doesn't simplify double (or more) commas - causes empty coords
        // This regex is used by `split()`, so it doesn't need to use /g
        var coords = trimmedString.split(/\b\s*,\s*|,\s*|\s+/);

        var numCoords = coords.length;
        for (var i = 0; i < numCoords; i += 2) {
            // Step 3: Convert each coord to number
            // Note: If the coord cannot be converted to a number, it will be `NaN`
            // Note: If the coord is empty ("", e.g. from ",," input), it will be `0`
            // Note: If we end up with an odd number of coords, the last point's second coord will be `NaN`
            points.push({ x: +coords[i], y: +coords[i + 1] });
        }
        return points;
    }

    function clonePoints(points) {
        var numPoints = points.length;
        if (numPoints === 0) { return []; }
        var newPoints = [];
        for (var i = 0; i < numPoints; i++) {
            var point = points[i].clone();
            newPoints.push(point);
        }
        return newPoints;
    }

    // Returns a convex-hull polyline from this polyline.
    // Implements the Graham scan (https://en.wikipedia.org/wiki/Graham_scan).
    // Output polyline starts at the first element of the original polyline that is on the hull, then continues clockwise.
    // Minimal polyline is found (only vertices of the hull are reported, no collinear points).
    function convexHull(points) {

        var abs = Math.abs;

        var i;
        var n;

        var numPoints = points.length;
        if (numPoints === 0) { return []; } // if points array is empty

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
            var startPointRecord = sortedPointRecords[sortedPointRecords.length - 1];
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
                        if (abs(angleBetween - 180) < THRESHOLD) { // rounding around 180 to 180
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

        return hullPoints;
    }

    var Polyline = function(points) {

        if (!(this instanceof Polyline)) {
            return new Polyline(points);
        }

        if (typeof points === 'string') {
            return new Polyline.parse(points);
        }

        this.points = (Array.isArray(points) ? points.map(Point) : []);
    };

    Polyline.parse = function(svgString) {
        return new Polyline(parsePoints(svgString));
    };

    Polyline.fromRect = function(rect) {
        return new Polyline([
            rect.topLeft(),
            rect.topRight(),
            rect.bottomRight(),
            rect.bottomLeft(),
            rect.topLeft() ]);
    };

    Polyline.prototype = {

        type: types.Polyline,

        bbox: function() {

            var x1 = Infinity;
            var x2 = -Infinity;
            var y1 = Infinity;
            var y2 = -Infinity;

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) { return null; } // if points array is empty

            for (var i = 0; i < numPoints; i++) {

                var point = points[i];
                var x = point.x;
                var y = point.y;

                if (x < x1) { x1 = x; }
                if (x > x2) { x2 = x; }
                if (y < y1) { y1 = y; }
                if (y > y2) { y2 = y; }
            }

            return new Rect(x1, y1, x2 - x1, y2 - y1);
        },

        clone: function() {
            return new Polyline(clonePoints(this.points));
        },

        closestPoint: function(p) {

            var cpLength = this.closestPointLength(p);

            return this.pointAtLength(cpLength);
        },

        closestPointLength: function(p) {

            var points = this.lengthPoints();
            var numPoints = points.length;
            if (numPoints === 0) { return 0; } // if points array is empty
            if (numPoints === 1) { return 0; } // if there is only one point

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
            if (cpLength === 0) { return 0; } // shortcut

            var length = this.length();
            if (length === 0) { return 0; } // prevents division by zero

            return cpLength / length;
        },

        closestPointTangent: function(p) {

            var cpLength = this.closestPointLength(p);

            return this.tangentAtLength(cpLength);
        },

        // Returns `true` if the area surrounded by the polyline contains the point `p`.
        // Implements the even-odd SVG algorithm (self-intersections are "outside").
        // (Uses horizontal rays to the right of `p` to look for intersections.)
        // Closes open polylines (always imagines a final closing segment).
        containsPoint: function(p) {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) { return false; } // shortcut (this polyline has no points)

            var x = p.x;
            var y = p.y;

            // initialize a final closing segment by creating one from last-first points on polyline
            var startIndex = numPoints - 1; // start of current polyline segment
            var endIndex = 0; // end of current polyline segment
            var numIntersections = 0;
            var segment = new Line();
            var ray = new Line();
            var rayEnd = new Point();
            for (; endIndex < numPoints; endIndex++) {
                var start = points[startIndex];
                var end = points[endIndex];
                if (p.equals(start)) { return true; } // shortcut (`p` is a point on polyline)
                // current polyline segment
                segment.start = start;
                segment.end = end;
                if (segment.containsPoint(p)) { return true; } // shortcut (`p` lies on a polyline segment)

                // do we have an intersection?
                if (((y <= start.y) && (y > end.y)) || ((y > start.y) && (y <= end.y))) {
                    // this conditional branch IS NOT entered when `segment` is collinear/coincident with `ray`
                    // (when `y === start.y === end.y`)
                    // this conditional branch IS entered when `segment` touches `ray` at only one point
                    // (e.g. when `y === start.y !== end.y`)
                    // since this branch is entered again for the following segment, the two touches cancel out

                    var xDifference = (((start.x - x) > (end.x - x)) ? (start.x - x) : (end.x - x));
                    if (xDifference >= 0) {
                        // segment lies at least partially to the right of `p`
                        rayEnd.x = x + xDifference;
                        rayEnd.y = y; // right
                        ray.start = p;
                        ray.end = rayEnd;
                        if (segment.intersect(ray)) {
                            // an intersection was detected to the right of `p`
                            numIntersections++;
                        }
                    } // else: `segment` lies completely to the left of `p` (i.e. no intersection to the right)
                }

                // move to check the next polyline segment
                startIndex = endIndex;
            }

            // returns `true` for odd numbers of intersections (even-odd algorithm)
            return ((numIntersections % 2) === 1);
        },

        close: function() {
            var ref = this;
            var start = ref.start;
            var end = ref.end;
            var points = ref.points;
            if (start && end && !start.equals(end)) {
                points.push(start.clone());
            }
            return this;
        },

        lengthPoints: function() {
            return this.points;
        },

        convexHull: function() {
            return new Polyline(convexHull(this.points));
        },

        // Checks whether two polylines are exactly the same.
        // If `p` is undefined or null, returns false.
        equals: function(p) {

            if (!p) { return false; }

            var points = this.points;
            var otherPoints = p.points;

            var numPoints = points.length;
            if (otherPoints.length !== numPoints) { return false; } // if the two polylines have different number of points, they cannot be equal

            for (var i = 0; i < numPoints; i++) {

                var point = points[i];
                var otherPoint = p.points[i];

                // as soon as an inequality is found in points, return false
                if (!point.equals(otherPoint)) { return false; }
            }

            // if no inequality found in points, return true
            return true;
        },

        intersectionWithLine: function(l) {
            var line = new Line(l);
            var intersections = [];
            var points = this.lengthPoints();
            var l2 = new Line();
            for (var i = 0, n = points.length - 1; i < n; i++) {
                l2.start = points[i];
                l2.end = points[i + 1];
                var int = line.intersectionWithLine(l2);
                if (int) { intersections.push(int[0]); }
            }
            return (intersections.length > 0) ? intersections : null;
        },

        isDifferentiable: function() {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) { return false; }

            var line = new Line();
            var n = numPoints - 1;
            for (var i = 0; i < n; i++) {
                line.start = points[i];
                line.end = points[i + 1];
                // as soon as a differentiable line is found between two points, return true
                if (line.isDifferentiable()) { return true; }
            }

            // if no differentiable line is found between pairs of points, return false
            return false;
        },

        length: function() {

            var points = this.lengthPoints();
            var numPoints = points.length;
            if (numPoints === 0) { return 0; } // if points array is empty

            var length = 0;
            var n = numPoints - 1;
            for (var i = 0; i < n; i++) {
                length += points[i].distance(points[i + 1]);
            }

            return length;
        },

        pointAt: function(ratio) {

            var points = this.lengthPoints();
            var numPoints = points.length;
            if (numPoints === 0) { return null; } // if points array is empty
            if (numPoints === 1) { return points[0].clone(); } // if there is only one point

            if (ratio <= 0) { return points[0].clone(); }
            if (ratio >= 1) { return points[numPoints - 1].clone(); }

            var polylineLength = this.length();
            var length = polylineLength * ratio;

            return this.pointAtLength(length);
        },

        pointAtLength: function(length) {

            var points = this.lengthPoints();
            var numPoints = points.length;
            if (numPoints === 0) { return null; } // if points array is empty
            if (numPoints === 1) { return points[0].clone(); } // if there is only one point

            var fromStart = true;
            if (length < 0) {
                fromStart = false; // negative lengths mean start calculation from end point
                length = -length; // absolute value
            }

            var l = 0;
            var n = numPoints - 1;
            for (var i = 0; i < n; i++) {
                var index = (fromStart ? i : (n - 1 - i));

                var a = points[index];
                var b = points[index + 1];
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

        round: function(precision) {

            var points = this.points;
            var numPoints = points.length;

            for (var i = 0; i < numPoints; i++) {
                points[i].round(precision);
            }

            return this;
        },

        scale: function(sx, sy, origin) {

            var points = this.points;
            var numPoints = points.length;

            for (var i = 0; i < numPoints; i++) {
                points[i].scale(sx, sy, origin);
            }

            return this;
        },

        simplify: function(opt) {
            if ( opt === void 0 ) opt = {};


            var points = this.points;
            if (points.length < 3) { return this; } // we need at least 3 points

            // TODO: we may also accept startIndex and endIndex to specify where to start and end simplification
            var threshold = opt.threshold || 0; // = max distance of middle point from chord to be simplified

            // start at the beginning of the polyline and go forward
            var currentIndex = 0;
            // we need at least one intermediate point (3 points) in every iteration
            // as soon as that stops being true, we know we reached the end of the polyline
            while (points[currentIndex + 2]) {
                var firstIndex = currentIndex;
                var middleIndex = (currentIndex + 1);
                var lastIndex = (currentIndex + 2);

                var firstPoint = points[firstIndex];
                var middlePoint = points[middleIndex];
                var lastPoint = points[lastIndex];

                var chord = new Line(firstPoint, lastPoint); // = connection between first and last point
                var closestPoint = chord.closestPoint(middlePoint); // = closest point on chord from middle point
                var closestPointDistance = closestPoint.distance(middlePoint);
                if (closestPointDistance <= threshold) {
                    // middle point is close enough to the chord = simplify
                    // 1) remove middle point:
                    points.splice(middleIndex, 1);
                    // 2) in next iteration, investigate the newly-created triplet of points
                    //    - do not change `currentIndex`
                    //    = (first point stays, point after removed point becomes middle point)
                } else {
                    // middle point is far from the chord
                    // 1) preserve middle point
                    // 2) in next iteration, move `currentIndex` by one step:
                    currentIndex += 1;
                    //    = (point after first point becomes first point)
                }
            }

            // `points` array was modified in-place
            return this;
        },

        tangentAt: function(ratio) {

            var points = this.lengthPoints();
            var numPoints = points.length;
            if (numPoints === 0) { return null; } // if points array is empty
            if (numPoints === 1) { return null; } // if there is only one point

            if (ratio < 0) { ratio = 0; }
            if (ratio > 1) { ratio = 1; }

            var polylineLength = this.length();
            var length = polylineLength * ratio;

            return this.tangentAtLength(length);
        },

        tangentAtLength: function(length) {

            var points = this.lengthPoints();
            var numPoints = points.length;
            if (numPoints === 0) { return null; } // if points array is empty
            if (numPoints === 1) { return null; } // if there is only one point

            var fromStart = true;
            if (length < 0) {
                fromStart = false; // negative lengths mean start calculation from end point
                length = -length; // absolute value
            }

            var lastValidLine; // differentiable (with a tangent)
            var l = 0; // length so far
            var n = numPoints - 1;
            for (var i = 0; i < n; i++) {
                var index = (fromStart ? i : (n - 1 - i));

                var a = points[index];
                var b = points[index + 1];
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

        toString: function() {

            return this.points + '';
        },

        translate: function(tx, ty) {

            var points = this.points;
            var numPoints = points.length;

            for (var i = 0; i < numPoints; i++) {
                points[i].translate(tx, ty);
            }

            return this;
        },

        // Return svgString that can be used to recreate this line.
        serialize: function() {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) { return ''; } // if points array is empty

            var output = '';
            for (var i = 0; i < numPoints; i++) {

                var point = points[i];
                output += point.x + ',' + point.y + ' ';
            }

            return output.trim();
        }
    };

    Object.defineProperty(Polyline.prototype, 'start', {
        // Getter for the first point of the polyline.

        configurable: true,

        enumerable: true,

        get: function() {

            var points = this.points;
            var numPoints = points.length;
            if (numPoints === 0) { return null; } // if points array is empty

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
            if (numPoints === 0) { return null; } // if points array is empty

            return this.points[numPoints - 1];
        },
    });

    var abs$2 = Math.abs;
    var sqrt$2 = Math.sqrt;
    var min$3 = Math.min;
    var max$3 = Math.max;
    var pow$3 = Math.pow;

    var Curve = function(p1, p2, p3, p4) {

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

        type: types.Curve,

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

                if (abs$2(a) < 1e-12) { // Numerical robustness
                    if (abs$2(b) < 1e-12) { // Numerical robustness
                        continue;
                    }

                    t = -c / b;
                    if ((0 < t) && (t < 1)) { tvalues.push(t); }

                    continue;
                }

                b2ac = b * b - 4 * c * a;
                sqrtb2ac = sqrt$2(b2ac);

                if (b2ac < 0) { continue; }

                t1 = (-b + sqrtb2ac) / (2 * a);
                if ((0 < t1) && (t1 < 1)) { tvalues.push(t1); }

                t2 = (-b - sqrtb2ac) / (2 * a);
                if ((0 < t2) && (t2 < 1)) { tvalues.push(t2); }
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

            var left = min$3.apply(null, bounds[0]);
            var top = min$3.apply(null, bounds[1]);
            var right = max$3.apply(null, bounds[0]);
            var bottom = max$3.apply(null, bounds[1]);

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
            if (!cpLength) { return 0; }

            var length = this.length(localOpt);
            if (length === 0) { return 0; }

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
            var chordLength; // distance between start and end of the subdivision
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

                    chordLength = currentSubdivision.start.distance(currentSubdivision.end);

                    minSumDist = sumDist;
                }
            }

            var precisionRatio = pow$3(10, -precision);

            // recursively divide investigated subdivision:
            // until distance between baselinePoint and closest path endpoint is within 10^(-precision)
            // then return the closest endpoint of that final subdivision
            while (true) {

                // check if we have reached at least one required observed precision
                // - calculated as: the difference in distances from point to start and end divided by the distance
                // - note that this function is not monotonic = it doesn't converge stably but has "teeth"
                // - the function decreases while one of the endpoints is fixed but "jumps" whenever we switch
                // - this criterion works well for points lying far away from the curve
                var startPrecisionRatio = (distFromStart ? (abs$2(distFromStart - distFromEnd) / distFromStart) : 0);
                var endPrecisionRatio = (distFromEnd ? (abs$2(distFromStart - distFromEnd) / distFromEnd) : 0);
                var hasRequiredPrecision = ((startPrecisionRatio < precisionRatio) || (endPrecisionRatio < precisionRatio));

                // check if we have reached at least one required minimal distance
                // - calculated as: the subdivision chord length multiplied by precisionRatio
                // - calculation is relative so it will work for arbitrarily large/small curves and their subdivisions
                // - this is a backup criterion that works well for points lying "almost at" the curve
                var hasMinimalStartDistance = (distFromStart ? (distFromStart < (chordLength * precisionRatio)) : true);
                var hasMinimalEndDistance = (distFromEnd ? (distFromEnd < (chordLength * precisionRatio)) : true);
                var hasMinimalDistance = (hasMinimalStartDistance || hasMinimalEndDistance);

                // do we stop now?
                if (hasRequiredPrecision || hasMinimalDistance) {
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

        // Returns `true` if the area surrounded by the curve contains the point `p`.
        // Implements the even-odd algorithm (self-intersections are "outside").
        // Closes open curves (always imagines a closing segment).
        // Precision may be adjusted by passing an `opt` object.
        containsPoint: function(p, opt) {

            var polyline = this.toPolyline(opt);
            return polyline.containsPoint(p);
        },

        // Divides the curve into two at requested `ratio` between 0 and 1 with precision better than `opt.precision`; optionally using `opt.subdivisions` provided.
        // For a function that uses `t`, use Curve.divideAtT().
        divideAt: function(ratio, opt) {

            if (ratio <= 0) { return this.divideAtT(0); }
            if (ratio >= 1) { return this.divideAtT(1); }

            var t = this.tAt(ratio, opt);

            return this.divideAtT(t);
        },

        // Divides the curve into two at requested `length` with precision better than requested `opt.precision`; optionally using `opt.subdivisions` provided.
        divideAtLength: function(length, opt) {

            var t = this.tAtLength(length, opt);

            return this.divideAtT(t);
        },

        // Divides the curve into two at point defined by `t` between 0 and 1.
        // Using de Casteljau's algorithm (http://math.stackexchange.com/a/317867).
        // Additional resource: https://pomax.github.io/bezierinfo/#decasteljau
        divideAtT: function(t) {

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
        // As a rule of thumb, increasing `precision` by 1 requires 2 more iterations (= levels of division operations)
        // - Precision 0 (endpointDistance) - 0 iterations => total of 2^0 - 1 = 0 operations (1 subdivision)
        // - Precision 1 (<10% error) - 2 iterations => total of 2^2 - 1 = 3 operations (4 subdivisions)
        // - Precision 2 (<1% error) - 4 iterations => total of 2^4 - 1 = 15 operations requires 4 division operations on all elements (15 operations total) (16 subdivisions)
        // - Precision 3 (<0.1% error) - 6 iterations => total of 2^6 - 1 = 63 operations - acceptable when drawing (64 subdivisions)
        // - Precision 4 (<0.01% error) - 8 iterations => total of 2^8 - 1 = 255 operations - high resolution, can be used to interpolate `t` (256 subdivisions)
        // (Variation of 1 recursion worse or better is possible depending on the curve, doubling/halving the number of operations accordingly)
        getSubdivisions: function(opt) {

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            // not using opt.subdivisions
            // not using localOpt

            var start = this.start;
            var control1 = this.controlPoint1;
            var control2 = this.controlPoint2;
            var end = this.end;

            var subdivisions = [new Curve(start, control1, control2, end)];
            if (precision === 0) { return subdivisions; }

            // special case #1: point-like curves
            // - no need to calculate subdivisions, they would all be identical
            var isPoint = !this.isDifferentiable();
            if (isPoint) { return subdivisions; }

            var previousLength = this.endpointDistance();

            var precisionRatio = pow$3(10, -precision);

            // special case #2: sine-like curves may have the same observed length in iteration 0 and 1 - skip iteration 1
            // - not a problem for further iterations because cubic curves cannot have more than two local extrema
            // - (i.e. cubic curves cannot intersect the baseline more than once)
            // - therefore starting from iteration = 2 ensures that subsequent iterations do not produce sampling with equal length
            // - (unless it's a straight-line curve, see below)
            var minIterations = 2; // = 2*1

            // special case #3: straight-line curves have the same observed length in all iterations
            // - this causes observed precision ratio to always be 0 (= lower than `precisionRatio`, which is our exit condition)
            // - we enforce the expected number of iterations = 2 * precision
            var isLine = ((control1.cross(start, end) === 0) && (control2.cross(start, end) === 0));
            if (isLine) {
                minIterations = (2 * precision);
            }

            // recursively divide curve at `t = 0.5`
            // until we reach `minIterations`
            // and until the difference between observed length at subsequent iterations is lower than `precision`
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

                // check if we have reached minimum number of iterations
                if (iteration >= minIterations) {

                    // check if we have reached required observed precision
                    var observedPrecisionRatio = ((length !== 0) ? ((length - previousLength) / length) : 0);
                    if (observedPrecisionRatio < precisionRatio) {
                        return newSubdivisions;
                    }
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

            if (t <= 0) { return 0; }

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

            if (ratio <= 0) { return this.start.clone(); }
            if (ratio >= 1) { return this.end.clone(); }

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

            if (t <= 0) { return this.start.clone(); }
            if (t >= 1) { return this.end.clone(); }

            return this.getSkeletonPoints(t).divider;
        },

        // Default precision
        PRECISION: 3,

        round: function(precision) {

            this.start.round(precision);
            this.controlPoint1.round(precision);
            this.controlPoint2.round(precision);
            this.end.round(precision);
            return this;
        },

        scale: function(sx, sy, origin) {

            this.start.scale(sx, sy, origin);
            this.controlPoint1.scale(sx, sy, origin);
            this.controlPoint2.scale(sx, sy, origin);
            this.end.scale(sx, sy, origin);
            return this;
        },

        // Returns a tangent line at requested `ratio` with precision better than requested `opt.precision`; or using `opt.subdivisions` provided.
        tangentAt: function(ratio, opt) {

            if (!this.isDifferentiable()) { return null; }

            if (ratio < 0) { ratio = 0; }
            else if (ratio > 1) { ratio = 1; }

            var t = this.tAt(ratio, opt);

            return this.tangentAtT(t);
        },

        // Returns a tangent line at requested `length` with precision better than requested `opt.precision`; or using `opt.subdivisions` provided.
        tangentAtLength: function(length, opt) {

            if (!this.isDifferentiable()) { return null; }

            var t = this.tAtLength(length, opt);

            return this.tangentAtT(t);
        },

        // Returns a tangent line at requested `t`.
        tangentAtT: function(t) {

            if (!this.isDifferentiable()) { return null; }

            if (t < 0) { t = 0; }
            else if (t > 1) { t = 1; }

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

            if (ratio <= 0) { return 0; }
            if (ratio >= 1) { return 1; }

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
            for (var i = 0; i < n; i++) {
                var index = (fromStart ? i : (n - 1 - i));

                var currentSubdivision = subdivisions[i];
                var d = currentSubdivision.endpointDistance(); // length of current subdivision

                if (length <= (l + d)) {
                    investigatedSubdivision = currentSubdivision;

                    investigatedSubdivisionStartT = index * subdivisionSize;
                    investigatedSubdivisionEndT = (index + 1) * subdivisionSize;

                    baselinePointDistFromStart = (fromStart ? (length - l) : ((d + l) - length));
                    baselinePointDistFromEnd = (fromStart ? ((d + l) - length) : (length - l));

                    break;
                }

                l += d;
            }

            if (!investigatedSubdivision) { return (fromStart ? 1 : 0); } // length requested is out of range - return maximum t
            // note that precision affects what length is recorded
            // (imprecise measurements underestimate length by up to 10^(-precision) of the precise length)
            // e.g. at precision 1, the length may be underestimated by up to 10% and cause this function to return 1

            var curveLength = this.length(localOpt);

            var precisionRatio = pow$3(10, -precision);

            // recursively divide investigated subdivision:
            // until distance between baselinePoint and closest path endpoint is within 10^(-precision)
            // then return the closest endpoint of that final subdivision
            while (true) {

                // check if we have reached required observed precision
                var observedPrecisionRatio;

                observedPrecisionRatio = ((curveLength !== 0) ? (baselinePointDistFromStart / curveLength) : 0);
                if (observedPrecisionRatio < precisionRatio) { return investigatedSubdivisionStartT; }
                observedPrecisionRatio = ((curveLength !== 0) ? (baselinePointDistFromEnd / curveLength) : 0);
                if (observedPrecisionRatio < precisionRatio) { return investigatedSubdivisionEndT; }

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
        },

        translate: function(tx, ty) {

            this.start.translate(tx, ty);
            this.controlPoint1.translate(tx, ty);
            this.controlPoint2.translate(tx, ty);
            this.end.translate(tx, ty);
            return this;
        }
    };

    Curve.prototype.divide = Curve.prototype.divideAtT;

    // Local helper function.
    // Add properties from arguments on top of properties from `obj`.
    // This allows for rudimentary inheritance.
    // - The `obj` argument acts as parent.
    // - This function creates a new object that inherits all `obj` properties and adds/replaces those that are present in arguments.
    // - A high-level example: calling `extend(Vehicle, Car)` would be akin to declaring `class Car extends Vehicle`.
    function extend(obj) {
        var arguments$1 = arguments;

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
        //   - Then, `g.Line` would allow the programmer to access to all methods currently in `g.Line.Prototype`, plus any non-overridden methods from `g.GeometryObject.prototype`.
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
            args.push(arguments$1[i]);
        }

        if (!obj) { throw new Error('Missing a parent object.'); }
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

    // Accepts path data string, array of segments, array of Curves and/or Lines, or a Polyline.
    var Path = function(arg) {

        if (!(this instanceof Path)) {
            return new Path(arg);
        }

        if (typeof arg === 'string') { // create from a path data string
            return new Path.parse(arg);
        }

        this.segments = [];

        var i;
        var n;

        if (!arg) ; else if (Array.isArray(arg) && arg.length !== 0) { // if arg is a non-empty array
            // flatten one level deep
            // so we can chain arbitrary Path.createSegment results
            arg = arg.reduce(function(acc, val) {
                return acc.concat(val);
            }, []);

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

                    if (i === 0) { this.appendSegment(Path.createSegment('M', obj.start)); }

                    // if objects do not link up, moveto segments are inserted to cover the gaps
                    if (previousObj && !previousObj.end.equals(obj.start)) { this.appendSegment(Path.createSegment('M', obj.start)); }

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

        } else if (arg instanceof Polyline) { // create from a Polyline
            if (!(arg.points && (arg.points.length !== 0))) { return; } // if Polyline has no points, leave Path empty

            n = arg.points.length;
            for (i = 0; i < n; i++) {

                var point = arg.points[i];

                if (i === 0) { this.appendSegment(Path.createSegment('M', point)); }
                else { this.appendSegment(Path.createSegment('L', point)); }
            }

        } else { // unknown object
            throw new Error('Cannot construct a path from the provided object.');
        }
    };

    // More permissive than V.normalizePathData and Path.prototype.serialize.
    // Allows path data strings that do not start with a Moveto command (unlike SVG specification).
    // Does not require spaces between elements; commas are allowed, separators may be omitted when unambiguous (e.g. 'ZM10,10', 'L1.6.8', 'M100-200').
    // Allows for command argument chaining.
    // Throws an error if wrong number of arguments is provided with a command.
    // Throws an error if an unrecognized path command is provided (according to Path.segmentTypes). Only a subset of SVG commands is currently supported (L, C, M, Z).
    Path.parse = function(pathData) {

        if (!pathData) { return new Path(); }

        var path = new Path();

        var commandRe = /(?:[a-zA-Z] *)(?:(?:-?\d+(?:\.\d+)?(?:e[-+]?\d+)? *,? *)|(?:-?\.\d+ *,? *))+|(?:[a-zA-Z] *)(?! |\d|-|\.)/g;
        var commands = pathData.match(commandRe);

        var numCommands = commands.length;
        for (var i = 0; i < numCommands; i++) {

            var command = commands[i];
            var argRe = /(?:[a-zA-Z])|(?:(?:-?\d+(?:\.\d+)?(?:e[-+]?\d+)?))|(?:(?:-?\.\d+))/g;
            var args = command.match(argRe);

            var segment = Path.createSegment.apply(this, args); // args = [type, coordinate1, coordinate2...]
            path.appendSegment(segment);
        }

        return path;
    };

    // Create a segment or an array of segments.
    // Accepts unlimited points/coords arguments after `type`.
    Path.createSegment = function(type) {
        var arguments$1 = arguments;


        if (!type) { throw new Error('Type must be provided.'); }

        var segmentConstructor = Path.segmentTypes[type];
        if (!segmentConstructor) { throw new Error(type + ' is not a recognized path segment type.'); }

        var args = [];
        var n = arguments.length;
        for (var i = 1; i < n; i++) { // do not add first element (`type`) to args array
            args.push(arguments$1[i]);
        }

        return applyToNew(segmentConstructor, args);
    };

    Path.prototype = {

        type: types.Path,

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
                if (!arg || !arg.isSegment) { throw new Error('Segment required.'); }

                currentSegment = this.prepareSegment(arg, previousSegment, nextSegment);
                segments.push(currentSegment);

            } else { // arg is an array of segments
                // flatten one level deep
                // so we can chain arbitrary Path.createSegment results
                arg = arg.reduce(function(acc, val) {
                    return acc.concat(val);
                }, []);

                if (!arg[0].isSegment) { throw new Error('Segments required.'); }

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
            if (numSegments === 0) { return null; } // if segments is an empty array

            var bbox;
            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                if (segment.isVisible) {
                    var segmentBBox = segment.bbox();
                    bbox = bbox ? bbox.union(segmentBBox) : segmentBBox;
                }
            }

            if (bbox) { return bbox; }

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
            if (!t) { return null; }

            return this.pointAtT(t);
        },

        closestPointLength: function(p, opt) {

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            var localOpt = { precision: precision, segmentSubdivisions: segmentSubdivisions };

            var t = this.closestPointT(p, localOpt);
            if (!t) { return 0; }

            return this.lengthAtT(t, localOpt);
        },

        closestPointNormalizedLength: function(p, opt) {

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            var localOpt = { precision: precision, segmentSubdivisions: segmentSubdivisions };

            var cpLength = this.closestPointLength(p, localOpt);
            if (cpLength === 0) { return 0; } // shortcut

            var length = this.length(localOpt);
            if (length === 0) { return 0; } // prevents division by zero

            return cpLength / length;
        },

        // Private function.
        closestPointT: function(p, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) { return null; } // if segments is an empty array

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
                    var segmentClosestPointT = segment.closestPointT(p, {
                        precision: precision,
                        subdivisions: subdivisions
                    });
                    var segmentClosestPoint = segment.pointAtT(segmentClosestPointT);
                    var squaredDistance = (new Line(segmentClosestPoint, p)).squaredLength();

                    if (squaredDistance < minSquaredDistance) {
                        closestPointT = { segmentIndex: i, value: segmentClosestPointT };
                        minSquaredDistance = squaredDistance;
                    }
                }
            }

            if (closestPointT) { return closestPointT; }

            // if no visible segment, return end of last segment
            return { segmentIndex: numSegments - 1, value: 1 };
        },

        closestPointTangent: function(p, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) { return null; } // if segments is an empty array

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
                    var segmentClosestPointT = segment.closestPointT(p, {
                        precision: precision,
                        subdivisions: subdivisions
                    });
                    var segmentClosestPoint = segment.pointAtT(segmentClosestPointT);
                    var squaredDistance = (new Line(segmentClosestPoint, p)).squaredLength();

                    if (squaredDistance < minSquaredDistance) {
                        closestPointTangent = segment.tangentAtT(segmentClosestPointT);
                        minSquaredDistance = squaredDistance;
                    }
                }
            }

            if (closestPointTangent) { return closestPointTangent; }

            // if no valid segment, return null
            return null;
        },

        // Returns `true` if the area surrounded by the path contains the point `p`.
        // Implements the even-odd algorithm (self-intersections are "outside").
        // Closes open paths (always imagines a final closing segment).
        // Precision may be adjusted by passing an `opt` object.
        containsPoint: function(p, opt) {

            var polylines = this.toPolylines(opt);
            if (!polylines) { return false; } // shortcut (this path has no polylines)

            var numPolylines = polylines.length;

            // how many component polylines does `p` lie within?
            var numIntersections = 0;
            for (var i = 0; i < numPolylines; i++) {
                var polyline = polylines[i];
                if (polyline.containsPoint(p)) {
                    // `p` lies within this polyline
                    numIntersections++;
                }
            }

            // returns `true` for odd numbers of intersections (even-odd algorithm)
            return ((numIntersections % 2) === 1);
        },

        // Divides the path into two at requested `ratio` between 0 and 1 with precision better than `opt.precision`; optionally using `opt.subdivisions` provided.
        divideAt: function(ratio, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) { return null; } // if segments is an empty array

            if (ratio < 0) { ratio = 0; }
            if (ratio > 1) { ratio = 1; }

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            var localOpt = { precision: precision, segmentSubdivisions: segmentSubdivisions };

            var pathLength = this.length(localOpt);
            var length = pathLength * ratio;

            return this.divideAtLength(length, localOpt);
        },

        // Divides the path into two at requested `length` with precision better than requested `opt.precision`; optionally using `opt.subdivisions` provided.
        divideAtLength: function(length, opt) {

            var numSegments = this.segments.length;
            if (numSegments === 0) { return null; } // if segments is an empty array

            var fromStart = true;
            if (length < 0) {
                fromStart = false; // negative lengths mean start calculation from end point
                length = -length; // absolute value
            }

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            // not using localOpt

            var i;
            var segment;

            // identify the segment to divide:

            var l = 0; // length so far
            var divided;
            var dividedSegmentIndex;
            var lastValidSegment; // visible AND differentiable
            var lastValidSegmentIndex;
            var t;
            for (i = 0; i < numSegments; i++) {
                var index = (fromStart ? i : (numSegments - 1 - i));

                segment = this.getSegment(index);
                var subdivisions = segmentSubdivisions[index];
                var d = segment.length({ precision: precision, subdivisions: subdivisions });

                if (segment.isDifferentiable()) { // segment is not just a point
                    lastValidSegment = segment;
                    lastValidSegmentIndex = index;

                    if (length <= (l + d)) {
                        dividedSegmentIndex = index;
                        divided = segment.divideAtLength(((fromStart ? 1 : -1) * (length - l)), {
                            precision: precision,
                            subdivisions: subdivisions
                        });
                        break;
                    }
                }

                l += d;
            }

            if (!lastValidSegment) { // no valid segment found
                return null;
            }

            // else: the path contains at least one valid segment

            if (!divided) { // the desired length is greater than the length of the path
                dividedSegmentIndex = lastValidSegmentIndex;
                t = (fromStart ? 1 : 0);
                divided = lastValidSegment.divideAtT(t);
            }

            // create a copy of this path and replace the identified segment with its two divided parts:

            var pathCopy = this.clone();
            pathCopy.replaceSegment(dividedSegmentIndex, divided);

            var divisionStartIndex = dividedSegmentIndex;
            var divisionMidIndex = dividedSegmentIndex + 1;
            var divisionEndIndex = dividedSegmentIndex + 2;

            // do not insert the part if it looks like a point
            if (!divided[0].isDifferentiable()) {
                pathCopy.removeSegment(divisionStartIndex);
                divisionMidIndex -= 1;
                divisionEndIndex -= 1;
            }

            // insert a Moveto segment to ensure secondPath will be valid:
            var movetoEnd = pathCopy.getSegment(divisionMidIndex).start;
            pathCopy.insertSegment(divisionMidIndex, Path.createSegment('M', movetoEnd));
            divisionEndIndex += 1;

            // do not insert the part if it looks like a point
            if (!divided[1].isDifferentiable()) {
                pathCopy.removeSegment(divisionEndIndex - 1);
                divisionEndIndex -= 1;
            }

            // ensure that Closepath segments in secondPath will be assigned correct subpathStartSegment:

            var secondPathSegmentIndexConversion = divisionEndIndex - divisionStartIndex - 1;
            for (i = divisionEndIndex; i < pathCopy.segments.length; i++) {

                var originalSegment = this.getSegment(i - secondPathSegmentIndexConversion);
                segment = pathCopy.getSegment(i);

                if ((segment.type === 'Z') && !originalSegment.subpathStartSegment.end.equals(segment.subpathStartSegment.end)) {
                    // pathCopy segment's subpathStartSegment is different from original segment's one
                    // convert this Closepath segment to a Lineto and replace it in pathCopy
                    var convertedSegment = Path.createSegment('L', originalSegment.end);
                    pathCopy.replaceSegment(i, convertedSegment);
                }
            }

            // distribute pathCopy segments into two paths and return those:

            var firstPath = new Path(pathCopy.segments.slice(0, divisionMidIndex));
            var secondPath = new Path(pathCopy.segments.slice(divisionMidIndex));

            return [firstPath, secondPath];
        },

        // Checks whether two paths are exactly the same.
        // If `p` is undefined or null, returns false.
        equals: function(p) {

            if (!p) { return false; }

            var segments = this.segments;
            var otherSegments = p.segments;

            var numSegments = segments.length;
            if (otherSegments.length !== numSegments) { return false; } // if the two paths have different number of segments, they cannot be equal

            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                var otherSegment = otherSegments[i];

                // as soon as an inequality is found in segments, return false
                if ((segment.type !== otherSegment.type) || (!segment.equals(otherSegment))) { return false; }
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
            if (numSegments === 0) { throw new Error('Path has no segments.'); }

            if (index < 0) { index = numSegments + index; } // convert negative indices to positive
            if (index >= numSegments || index < 0) { throw new Error('Index out of range.'); }

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

        // Returns an array of subpaths of this path.
        // Invalid paths are validated first.
        // Returns `[]` if path has no segments.
        getSubpaths: function() {

            var validatedPath = this.clone().validate();

            var segments = validatedPath.segments;
            var numSegments = segments.length;

            var subpaths = [];
            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                if (segment.isSubpathStart) {
                    // we encountered a subpath start segment
                    // create a new path for segment, and push it to list of subpaths
                    subpaths.push(new Path(segment));

                } else {
                    // append current segment to the last subpath
                    subpaths[subpaths.length - 1].appendSegment(segment);
                }
            }

            return subpaths;
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

            // note that these are incremented compared to getSegments()
            // we can insert after last element (note that this changes the meaning of index -1)
            if (index < 0) { index = numSegments + index + 1; } // convert negative indices to positive
            if (index > numSegments || index < 0) { throw new Error('Index out of range.'); }

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
                if (!arg || !arg.isSegment) { throw new Error('Segment required.'); }

                currentSegment = this.prepareSegment(arg, previousSegment, nextSegment);
                segments.splice(index, 0, currentSegment);

            } else {
                // flatten one level deep
                // so we can chain arbitrary Path.createSegment results
                arg = arg.reduce(function(acc, val) {
                    return acc.concat(val);
                }, []);

                if (!arg[0].isSegment) { throw new Error('Segments required.'); }

                var n = arg.length;
                for (var i = 0; i < n; i++) {

                    var currentArg = arg[i];
                    currentSegment = this.prepareSegment(currentArg, previousSegment, nextSegment);
                    segments.splice((index + i), 0, currentSegment); // incrementing index to insert subsequent segments after inserted segments
                    previousSegment = currentSegment;
                }
            }
        },

        intersectionWithLine: function(line, opt) {

            var intersection = null;
            var polylines = this.toPolylines(opt);
            if (!polylines) { return null; }
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

        isDifferentiable: function() {

            var segments = this.segments;
            var numSegments = segments.length;

            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                // as soon as a differentiable segment is found in segments, return true
                if (segment.isDifferentiable()) { return true; }
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
            if (numSegments === 0) { return 0; } // if segments is an empty array

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
            if (numSegments === 0) { return 0; } // if segments is an empty array

            var segmentIndex = t.segmentIndex;
            if (segmentIndex < 0) { return 0; } // regardless of t.value

            var tValue = t.value;
            if (segmentIndex >= numSegments) {
                segmentIndex = numSegments - 1;
                tValue = 1;
            } else if (tValue < 0) { tValue = 0; }
            else if (tValue > 1) { tValue = 1; }

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
            if (numSegments === 0) { return null; } // if segments is an empty array

            if (ratio <= 0) { return this.start.clone(); }
            if (ratio >= 1) { return this.end.clone(); }

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
            if (numSegments === 0) { return null; } // if segments is an empty array

            if (length === 0) { return this.start.clone(); }

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
            for (var i = 0; i < numSegments; i++) {
                var index = (fromStart ? i : (numSegments - 1 - i));

                var segment = segments[index];
                var subdivisions = segmentSubdivisions[index];
                var d = segment.length({ precision: precision, subdivisions: subdivisions });

                if (segment.isVisible) {
                    if (length <= (l + d)) {
                        return segment.pointAtLength(((fromStart ? 1 : -1) * (length - l)), {
                            precision: precision,
                            subdivisions: subdivisions
                        });
                    }

                    lastVisibleSegment = segment;
                }

                l += d;
            }

            // if length requested is higher than the length of the path, return last visible segment endpoint
            if (lastVisibleSegment) { return (fromStart ? lastVisibleSegment.end : lastVisibleSegment.start); }

            // if no visible segment, return last segment end point (no matter if fromStart or no)
            var lastSegment = segments[numSegments - 1];
            return lastSegment.end.clone();
        },

        // Private function.
        pointAtT: function(t) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) { return null; } // if segments is an empty array

            var segmentIndex = t.segmentIndex;
            if (segmentIndex < 0) { return segments[0].pointAtT(0); }
            if (segmentIndex >= numSegments) { return segments[numSegments - 1].pointAtT(1); }

            var tValue = t.value;
            if (tValue < 0) { tValue = 0; }
            else if (tValue > 1) { tValue = 1; }

            return segments[segmentIndex].pointAtT(tValue);
        },

        // Default precision
        PRECISION: 3,

        // Helper method for adding segments.
        prepareSegment: function(segment, previousSegment, nextSegment) {

            // insert after previous segment and before previous segment's next segment
            segment.previousSegment = previousSegment;
            segment.nextSegment = nextSegment;
            if (previousSegment) { previousSegment.nextSegment = segment; }
            if (nextSegment) { nextSegment.previousSegment = segment; }

            var updateSubpathStart = segment;
            if (segment.isSubpathStart) {
                segment.subpathStartSegment = segment; // assign self as subpath start segment
                updateSubpathStart = nextSegment; // start updating from next segment
            }

            // assign previous segment's subpath start (or self if it is a subpath start) to subsequent segments
            if (updateSubpathStart) { this.updateSubpathStartSegment(updateSubpathStart); }

            return segment;
        },

        // Remove the segment at `index`.
        // Accepts negative indices, from `-1` to `-segments.length`.
        // Throws an error if path has no segments.
        // Throws an error if index is out of range.
        removeSegment: function(index) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) { throw new Error('Path has no segments.'); }

            if (index < 0) { index = numSegments + index; } // convert negative indices to positive
            if (index >= numSegments || index < 0) { throw new Error('Index out of range.'); }

            var removedSegment = segments.splice(index, 1)[0];
            var previousSegment = removedSegment.previousSegment;
            var nextSegment = removedSegment.nextSegment;

            // link the previous and next segments together (if present)
            if (previousSegment) { previousSegment.nextSegment = nextSegment; } // may be null
            if (nextSegment) { nextSegment.previousSegment = previousSegment; } // may be null

            // if removed segment used to start a subpath, update all subsequent segments until another subpath start segment is reached
            if (removedSegment.isSubpathStart && nextSegment) { this.updateSubpathStartSegment(nextSegment); }
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
            if (numSegments === 0) { throw new Error('Path has no segments.'); }

            if (index < 0) { index = numSegments + index; } // convert negative indices to positive
            if (index >= numSegments || index < 0) { throw new Error('Index out of range.'); }

            var currentSegment;

            var replacedSegment = segments[index];
            var previousSegment = replacedSegment.previousSegment;
            var nextSegment = replacedSegment.nextSegment;

            var updateSubpathStart = replacedSegment.isSubpathStart; // boolean: is an update of subpath starts necessary?

            if (!Array.isArray(arg)) {
                if (!arg || !arg.isSegment) { throw new Error('Segment required.'); }

                currentSegment = this.prepareSegment(arg, previousSegment, nextSegment);
                segments.splice(index, 1, currentSegment); // directly replace

                if (updateSubpathStart && currentSegment.isSubpathStart) { updateSubpathStart = false; } // already updated by `prepareSegment`

            } else {
                // flatten one level deep
                // so we can chain arbitrary Path.createSegment results
                arg = arg.reduce(function(acc, val) {
                    return acc.concat(val);
                }, []);

                if (!arg[0].isSegment) { throw new Error('Segments required.'); }

                segments.splice(index, 1);

                var n = arg.length;
                for (var i = 0; i < n; i++) {

                    var currentArg = arg[i];
                    currentSegment = this.prepareSegment(currentArg, previousSegment, nextSegment);
                    segments.splice((index + i), 0, currentSegment); // incrementing index to insert subsequent segments after inserted segments
                    previousSegment = currentSegment;

                    if (updateSubpathStart && currentSegment.isSubpathStart) { updateSubpathStart = false; } // already updated by `prepareSegment`
                }
            }

            // if replaced segment used to start a subpath and no new subpath start was added, update all subsequent segments until another subpath start segment is reached
            if (updateSubpathStart && nextSegment) { this.updateSubpathStartSegment(nextSegment); }
        },

        round: function(precision) {

            var segments = this.segments;
            var numSegments = segments.length;

            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                segment.round(precision);
            }

            return this;
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
            if (!index) { return null; }

            return this.getSegment(index);
        },

        // Accepts negative length.
        segmentAtLength: function(length, opt) {

            var index = this.segmentIndexAtLength(length, opt);
            if (!index) { return null; }

            return this.getSegment(index);
        },

        segmentIndexAt: function(ratio, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) { return null; } // if segments is an empty array

            if (ratio < 0) { ratio = 0; }
            if (ratio > 1) { ratio = 1; }

            opt = opt || {};
            var precision = (opt.precision === undefined) ? this.PRECISION : opt.precision;
            var segmentSubdivisions = (opt.segmentSubdivisions === undefined) ? this.getSegmentSubdivisions({ precision: precision }) : opt.segmentSubdivisions;
            var localOpt = { precision: precision, segmentSubdivisions: segmentSubdivisions };

            var pathLength = this.length(localOpt);
            var length = pathLength * ratio;

            return this.segmentIndexAtLength(length, localOpt);
        },

        // Accepts negative length.
        segmentIndexAtLength: function(length, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) { return null; } // if segments is an empty array

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
            for (var i = 0; i < numSegments; i++) {
                var index = (fromStart ? i : (numSegments - 1 - i));

                var segment = segments[index];
                var subdivisions = segmentSubdivisions[index];
                var d = segment.length({ precision: precision, subdivisions: subdivisions });

                if (segment.isVisible) {
                    if (length <= (l + d)) { return index; }
                    lastVisibleSegmentIndex = index;
                }

                l += d;
            }

            // if length requested is higher than the length of the path, return last visible segment index
            // if no visible segment, return null
            return lastVisibleSegmentIndex;
        },

        // Returns a string that can be used to reconstruct the path.
        // Additional error checking compared to toString (must start with M segment).
        serialize: function() {

            if (!this.isValid()) { throw new Error('Invalid path segments.'); }

            return this.toString();
        },

        // Returns tangent line at requested `ratio` between 0 and 1, with precision better than requested `opt.precision`; optionally using `opt.segmentSubdivisions` provided.
        tangentAt: function(ratio, opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) { return null; } // if segments is an empty array

            if (ratio < 0) { ratio = 0; }
            if (ratio > 1) { ratio = 1; }

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
            if (numSegments === 0) { return null; } // if segments is an empty array

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
            for (var i = 0; i < numSegments; i++) {
                var index = (fromStart ? i : (numSegments - 1 - i));

                var segment = segments[index];
                var subdivisions = segmentSubdivisions[index];
                var d = segment.length({ precision: precision, subdivisions: subdivisions });

                if (segment.isDifferentiable()) {
                    if (length <= (l + d)) {
                        return segment.tangentAtLength(((fromStart ? 1 : -1) * (length - l)), {
                            precision: precision,
                            subdivisions: subdivisions
                        });
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
            if (numSegments === 0) { return null; } // if segments is an empty array

            var segmentIndex = t.segmentIndex;
            if (segmentIndex < 0) { return segments[0].tangentAtT(0); }
            if (segmentIndex >= numSegments) { return segments[numSegments - 1].tangentAtT(1); }

            var tValue = t.value;
            if (tValue < 0) { tValue = 0; }
            else if (tValue > 1) { tValue = 1; }

            return segments[segmentIndex].tangentAtT(tValue);
        },

        toPoints: function(opt) {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) { return null; } // if segments is an empty array

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
            if (!points) { return null; }
            for (var i = 0, n = points.length; i < n; i++) {
                polylines.push(new Polyline(points[i]));
            }

            return polylines;
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
                if (previousSegment) { segment.subpathStartSegment = previousSegment.subpathStartSegment; } // may be null
                else { segment.subpathStartSegment = null; } // if segment had no previous segment, assign null - creates an invalid path!

                previousSegment = segment;
                segment = segment.nextSegment; // move on to the segment after etc.
            }
        },

        // If the path is not valid, insert M 0 0 at the beginning.
        // Path with no segments is considered valid, so nothing is inserted.
        validate: function() {

            if (!this.isValid()) { this.insertSegment(0, Path.createSegment('M', 0, 0)); }
            return this;
        }
    };

    Object.defineProperty(Path.prototype, 'start', {
        // Getter for the first visible endpoint of the path.

        configurable: true,

        enumerable: true,

        get: function() {

            var segments = this.segments;
            var numSegments = segments.length;
            if (numSegments === 0) { return null; }

            for (var i = 0; i < numSegments; i++) {

                var segment = segments[i];
                if (segment.isVisible) { return segment.start; }
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
            if (numSegments === 0) { return null; }

            for (var i = numSegments - 1; i >= 0; i--) {

                var segment = segments[i];
                if (segment.isVisible) { return segment.end; }
            }

            // if no visible segment, return last segment end point
            return segments[numSegments - 1].end;
        }
    });


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

    // Path segment interface:
    var segmentPrototype = {

        // virtual
        bbox: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // virtual
        clone: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // virtual
        closestPoint: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // virtual
        closestPointLength: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // virtual
        closestPointNormalizedLength: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // Redirect calls to closestPointNormalizedLength() function if closestPointT() is not defined for segment.
        closestPointT: function(p) {

            if (this.closestPointNormalizedLength) { return this.closestPointNormalizedLength(p); }

            throw new Error('Neither closestPointT() nor closestPointNormalizedLength() function is implemented.');
        },

        // virtual
        closestPointTangent: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // virtual
        divideAt: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // virtual
        divideAtLength: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // Redirect calls to divideAt() function if divideAtT() is not defined for segment.
        divideAtT: function(t) {

            if (this.divideAt) { return this.divideAt(t); }

            throw new Error('Neither divideAtT() nor divideAt() function is implemented.');
        },

        // virtual
        equals: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // virtual
        getSubdivisions: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // virtual
        isDifferentiable: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        isSegment: true,

        isSubpathStart: false, // true for Moveto segments

        isVisible: true, // false for Moveto segments

        // virtual
        length: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // Return a fraction of result of length() function if lengthAtT() is not defined for segment.
        lengthAtT: function(t) {

            if (t <= 0) { return 0; }

            var length = this.length();

            if (t >= 1) { return length; }

            return length * t;
        },

        nextSegment: null, // needed for subpath start segment updating

        // virtual
        pointAt: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // virtual
        pointAtLength: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // Redirect calls to pointAt() function if pointAtT() is not defined for segment.
        pointAtT: function(t) {

            if (this.pointAt) { return this.pointAt(t); }

            throw new Error('Neither pointAtT() nor pointAt() function is implemented.');
        },

        previousSegment: null, // needed to get segment start property

        // virtual
        round: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        subpathStartSegment: null, // needed to get Closepath segment end property

        // virtual
        scale: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // virtual
        serialize: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // virtual
        tangentAt: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // virtual
        tangentAtLength: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // Redirect calls to tangentAt() function if tangentAtT() is not defined for segment.
        tangentAtT: function(t) {

            if (this.tangentAt) { return this.tangentAt(t); }

            throw new Error('Neither tangentAtT() nor tangentAt() function is implemented.');
        },

        // virtual
        toString: function() {

            throw new Error('Declaration missing for virtual function.');
        },

        // virtual
        translate: function() {

            throw new Error('Declaration missing for virtual function.');
        }
    };

    // usually directly assigned
    // getter for Closepath
    Object.defineProperty(segmentPrototype, 'end', {

        configurable: true,

        enumerable: true,

        writable: true
    });

    // always a getter
    // always throws error for Moveto
    Object.defineProperty(segmentPrototype, 'start', {
        // get a reference to the end point of previous segment

        configurable: true,

        enumerable: true,

        get: function() {

            if (!this.previousSegment) { throw new Error('Missing previous segment. (This segment cannot be the first segment of a path; OR segment has not yet been added to a path.)'); }

            return this.previousSegment.end;
        }
    });

    // virtual
    Object.defineProperty(segmentPrototype, 'type', {

        configurable: true,

        enumerable: true,

        get: function() {

            throw new Error('Bad segment declaration. No type specified.');
        }
    });

    // Path segment implementations:
    var Lineto = function() {
        var arguments$1 = arguments;


        var args = [];
        var n = arguments.length;
        for (var i = 0; i < n; i++) {
            args.push(arguments$1[i]);
        }

        if (!(this instanceof Lineto)) { // switching context of `this` to Lineto when called without `new`
            return applyToNew(Lineto, args);
        }

        if (n === 0) {
            throw new Error('Lineto constructor expects a line, 1 point, or 2 coordinates (none provided).');
        }

        var outputArray;

        if (args[0] instanceof Line) { // lines provided
            if (n === 1) {
                this.end = args[0].end.clone();
                return this;

            } else {
                throw new Error('Lineto constructor expects a line, 1 point, or 2 coordinates (' + n + ' lines provided).');
            }

        } else if (typeof args[0] === 'string' || typeof args[0] === 'number') { // coordinates provided
            if (n === 2) {
                this.end = new Point(+args[0], +args[1]);
                return this;

            } else if (n < 2) {
                throw new Error('Lineto constructor expects a line, 1 point, or 2 coordinates (' + n + ' coordinates provided).');

            } else { // this is a poly-line segment
                var segmentCoords;
                outputArray = [];
                for (i = 0; i < n; i += 2) { // coords come in groups of two

                    segmentCoords = args.slice(i, i + 2); // will send one coord if args.length not divisible by 2
                    outputArray.push(applyToNew(Lineto, segmentCoords));
                }
                return outputArray;
            }

        } else { // points provided (needs to be last to also cover plain objects with x and y)
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

        divideAt: function(ratio) {

            var line = new Line(this.start, this.end);
            var divided = line.divideAt(ratio);
            return [
                new Lineto(divided[0]),
                new Lineto(divided[1])
            ];
        },

        divideAtLength: function(length) {

            var line = new Line(this.start, this.end);
            var divided = line.divideAtLength(length);
            return [
                new Lineto(divided[0]),
                new Lineto(divided[1])
            ];
        },

        getSubdivisions: function() {

            return [];
        },

        isDifferentiable: function() {

            if (!this.previousSegment) { return false; }

            return !this.start.equals(this.end);
        },

        round: function(precision) {

            this.end.round(precision);
            return this;
        },

        scale: function(sx, sy, origin) {

            this.end.scale(sx, sy, origin);
            return this;
        },

        serialize: function() {

            var end = this.end;
            return this.type + ' ' + end.x + ' ' + end.y;
        },

        toString: function() {

            return this.type + ' ' + this.start + ' ' + this.end;
        },

        translate: function(tx, ty) {

            this.end.translate(tx, ty);
            return this;
        }
    };

    Object.defineProperty(linetoPrototype, 'type', {

        configurable: true,

        enumerable: true,

        value: 'L'
    });

    Lineto.prototype = extend(segmentPrototype, Line.prototype, linetoPrototype);

    var Curveto = function() {
        var arguments$1 = arguments;


        var args = [];
        var n = arguments.length;
        for (var i = 0; i < n; i++) {
            args.push(arguments$1[i]);
        }

        if (!(this instanceof Curveto)) { // switching context of `this` to Curveto when called without `new`
            return applyToNew(Curveto, args);
        }

        if (n === 0) {
            throw new Error('Curveto constructor expects a curve, 3 points, or 6 coordinates (none provided).');
        }

        var outputArray;

        if (args[0] instanceof Curve) { // curves provided
            if (n === 1) {
                this.controlPoint1 = args[0].controlPoint1.clone();
                this.controlPoint2 = args[0].controlPoint2.clone();
                this.end = args[0].end.clone();
                return this;

            } else {
                throw new Error('Curveto constructor expects a curve, 3 points, or 6 coordinates (' + n + ' curves provided).');
            }

        } else if (typeof args[0] === 'string' || typeof args[0] === 'number') { // coordinates provided
            if (n === 6) {
                this.controlPoint1 = new Point(+args[0], +args[1]);
                this.controlPoint2 = new Point(+args[2], +args[3]);
                this.end = new Point(+args[4], +args[5]);
                return this;

            } else if (n < 6) {
                throw new Error('Curveto constructor expects a curve, 3 points, or 6 coordinates (' + n + ' coordinates provided).');

            } else { // this is a poly-bezier segment
                var segmentCoords;
                outputArray = [];
                for (i = 0; i < n; i += 6) { // coords come in groups of six

                    segmentCoords = args.slice(i, i + 6); // will send fewer than six coords if args.length not divisible by 6
                    outputArray.push(applyToNew(Curveto, segmentCoords));
                }
                return outputArray;
            }

        } else { // points provided (needs to be last to also cover plain objects with x and y)
            if (n === 3) {
                this.controlPoint1 = new Point(args[0]);
                this.controlPoint2 = new Point(args[1]);
                this.end = new Point(args[2]);
                return this;

            } else if (n < 3) {
                throw new Error('Curveto constructor expects a curve, 3 points, or 6 coordinates (' + n + ' points provided).');

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

        divideAt: function(ratio, opt) {

            var curve = new Curve(this.start, this.controlPoint1, this.controlPoint2, this.end);
            var divided = curve.divideAt(ratio, opt);
            return [
                new Curveto(divided[0]),
                new Curveto(divided[1])
            ];
        },

        divideAtLength: function(length, opt) {

            var curve = new Curve(this.start, this.controlPoint1, this.controlPoint2, this.end);
            var divided = curve.divideAtLength(length, opt);
            return [
                new Curveto(divided[0]),
                new Curveto(divided[1])
            ];
        },

        divideAtT: function(t) {

            var curve = new Curve(this.start, this.controlPoint1, this.controlPoint2, this.end);
            var divided = curve.divideAtT(t);
            return [
                new Curveto(divided[0]),
                new Curveto(divided[1])
            ];
        },

        isDifferentiable: function() {

            if (!this.previousSegment) { return false; }

            var start = this.start;
            var control1 = this.controlPoint1;
            var control2 = this.controlPoint2;
            var end = this.end;

            return !(start.equals(control1) && control1.equals(control2) && control2.equals(end));
        },

        round: function(precision) {

            this.controlPoint1.round(precision);
            this.controlPoint2.round(precision);
            this.end.round(precision);
            return this;
        },

        scale: function(sx, sy, origin) {

            this.controlPoint1.scale(sx, sy, origin);
            this.controlPoint2.scale(sx, sy, origin);
            this.end.scale(sx, sy, origin);
            return this;
        },

        serialize: function() {

            var c1 = this.controlPoint1;
            var c2 = this.controlPoint2;
            var end = this.end;
            return this.type + ' ' + c1.x + ' ' + c1.y + ' ' + c2.x + ' ' + c2.y + ' ' + end.x + ' ' + end.y;
        },

        toString: function() {

            return this.type + ' ' + this.start + ' ' + this.controlPoint1 + ' ' + this.controlPoint2 + ' ' + this.end;
        },

        translate: function(tx, ty) {

            this.controlPoint1.translate(tx, ty);
            this.controlPoint2.translate(tx, ty);
            this.end.translate(tx, ty);
            return this;
        }
    };

    Object.defineProperty(curvetoPrototype, 'type', {

        configurable: true,

        enumerable: true,

        value: 'C'
    });

    Curveto.prototype = extend(segmentPrototype, Curve.prototype, curvetoPrototype);

    var Moveto = function() {
        var arguments$1 = arguments;


        var args = [];
        var n = arguments.length;
        for (var i = 0; i < n; i++) {
            args.push(arguments$1[i]);
        }

        if (!(this instanceof Moveto)) { // switching context of `this` to Moveto when called without `new`
            return applyToNew(Moveto, args);
        }

        if (n === 0) {
            throw new Error('Moveto constructor expects a line, a curve, 1 point, or 2 coordinates (none provided).');
        }

        var outputArray;

        if (args[0] instanceof Line) { // lines provided
            if (n === 1) {
                this.end = args[0].end.clone();
                return this;

            } else {
                throw new Error('Moveto constructor expects a line, a curve, 1 point, or 2 coordinates (' + n + ' lines provided).');
            }

        } else if (args[0] instanceof Curve) { // curves provided
            if (n === 1) {
                this.end = args[0].end.clone();
                return this;

            } else {
                throw new Error('Moveto constructor expects a line, a curve, 1 point, or 2 coordinates (' + n + ' curves provided).');
            }

        } else if (typeof args[0] === 'string' || typeof args[0] === 'number') { // coordinates provided
            if (n === 2) {
                this.end = new Point(+args[0], +args[1]);
                return this;

            } else if (n < 2) {
                throw new Error('Moveto constructor expects a line, a curve, 1 point, or 2 coordinates (' + n + ' coordinates provided).');

            } else { // this is a moveto-with-subsequent-poly-line segment
                var segmentCoords;
                outputArray = [];
                for (i = 0; i < n; i += 2) { // coords come in groups of two

                    segmentCoords = args.slice(i, i + 2); // will send one coord if args.length not divisible by 2
                    if (i === 0) { outputArray.push(applyToNew(Moveto, segmentCoords)); }
                    else { outputArray.push(applyToNew(Lineto, segmentCoords)); }
                }
                return outputArray;
            }

        } else { // points provided (needs to be last to also cover plain objects with x and y)
            if (n === 1) {
                this.end = new Point(args[0]);
                return this;

            } else { // this is a moveto-with-subsequent-poly-line segment
                var segmentPoint;
                outputArray = [];
                for (i = 0; i < n; i += 1) { // points come one by one

                    segmentPoint = args[i];
                    if (i === 0) { outputArray.push(new Moveto(segmentPoint)); }
                    else { outputArray.push(new Lineto(segmentPoint)); }
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

        divideAt: function() {

            return [
                this.clone(),
                this.clone()
            ];
        },

        divideAtLength: function() {

            return [
                this.clone(),
                this.clone()
            ];
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

        round: function(precision) {

            this.end.round(precision);
            return this;
        },

        scale: function(sx, sy, origin) {

            this.end.scale(sx, sy, origin);
            return this;
        },

        serialize: function() {

            var end = this.end;
            return this.type + ' ' + end.x + ' ' + end.y;
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

        toString: function() {

            return this.type + ' ' + this.end;
        },

        translate: function(tx, ty) {

            this.end.translate(tx, ty);
            return this;
        }
    };

    Object.defineProperty(movetoPrototype, 'start', {

        configurable: true,

        enumerable: true,

        get: function() {

            throw new Error('Illegal access. Moveto segments should not need a start property.');
        }
    });

    Object.defineProperty(movetoPrototype, 'type', {

        configurable: true,

        enumerable: true,

        value: 'M'
    });

    Moveto.prototype = extend(segmentPrototype, movetoPrototype); // does not inherit from any other geometry object

    var Closepath = function() {
        var arguments$1 = arguments;


        var args = [];
        var n = arguments.length;
        for (var i = 0; i < n; i++) {
            args.push(arguments$1[i]);
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

        divideAt: function(ratio) {

            var line = new Line(this.start, this.end);
            var divided = line.divideAt(ratio);
            return [
                // if we didn't actually cut into the segment, first divided part can stay as Z
                (divided[1].isDifferentiable() ? new Lineto(divided[0]) : this.clone()),
                new Lineto(divided[1])
            ];
        },

        divideAtLength: function(length) {

            var line = new Line(this.start, this.end);
            var divided = line.divideAtLength(length);
            return [
                // if we didn't actually cut into the segment, first divided part can stay as Z
                (divided[1].isDifferentiable() ? new Lineto(divided[0]) : this.clone()),
                new Lineto(divided[1])
            ];
        },

        getSubdivisions: function() {

            return [];
        },

        isDifferentiable: function() {

            if (!this.previousSegment || !this.subpathStartSegment) { return false; }

            return !this.start.equals(this.end);
        },

        round: function() {

            return this;
        },

        scale: function() {

            return this;
        },

        serialize: function() {

            return this.type;
        },

        toString: function() {

            return this.type + ' ' + this.start + ' ' + this.end;
        },

        translate: function() {

            return this;
        }
    };

    Object.defineProperty(closepathPrototype, 'end', {
        // get a reference to the end point of subpath start segment

        configurable: true,

        enumerable: true,

        get: function() {

            if (!this.subpathStartSegment) { throw new Error('Missing subpath start segment. (This segment needs a subpath start segment (e.g. Moveto); OR segment has not yet been added to a path.)'); }

            return this.subpathStartSegment.end;
        }
    });

    Object.defineProperty(closepathPrototype, 'type', {

        configurable: true,

        enumerable: true,

        value: 'Z'
    });

    Closepath.prototype = extend(segmentPrototype, Line.prototype, closepathPrototype);

    var segmentTypes = Path.segmentTypes = {
        L: Lineto,
        C: Curveto,
        M: Moveto,
        Z: Closepath,
        z: Closepath
    };

    Path.regexSupportedData = new RegExp('^[\\s\\d' + Object.keys(segmentTypes).join('') + ',.]*$');

    Path.isDataSupported = function(data) {

        if (typeof data !== 'string') { return false; }
        return this.regexSupportedData.test(data);
    };

    var bezier = {

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

    var Polygon = function(points) {

        if (!(this instanceof Polygon)) {
            return new Polygon(points);
        }

        if (typeof points === 'string') {
            return new Polygon.parse(points);
        }

        this.points = (Array.isArray(points) ? points.map(Point) : []);
    };

    Polygon.parse = function(svgString) {
        return new Polygon(parsePoints(svgString));
    };

    Polygon.fromRect = function(rect) {
        return new Polygon([
            rect.topLeft(),
            rect.topRight(),
            rect.bottomRight(),
            rect.bottomLeft()
        ]);
    };

    Polygon.prototype = extend(Polyline.prototype, {

        type: types.Polygon,

        clone: function() {
            return new Polygon(clonePoints(this.points));
        },

        convexHull: function() {
            return new Polygon(convexHull(this.points));
        },

        lengthPoints: function() {
            var ref = this;
            var start = ref.start;
            var end = ref.end;
            var points = ref.points;
            if (points.length <= 1 || start.equals(end)) { return points; }
            return points.concat( [start.clone()]);
        }

    });

    function exists(shape1, shape2, shape1opt, shape2opt) {
        switch (shape1.type) {
            case types.Line: {
                switch (shape2.type) {
                    case types.Line: {
                        return lineWithLine(shape1, shape2);
                    }
                }
                break;
            }
            case types.Ellipse: {
                switch (shape2.type) {
                    case types.Line: {
                        return ellipseWithLine(shape1, shape2);
                    }
                    case types.Ellipse: {
                        return ellipseWithEllipse(shape1, shape2);
                    }
                }
                break;
            }
            case types.Rect: {
                switch (shape2.type) {
                    case types.Line: {
                        return rectWithLine(shape1, shape2);
                    }
                    case types.Ellipse: {
                        return rectWithEllipse(shape1, shape2);
                    }
                    case types.Rect: {
                        return rectWithRect(shape1, shape2);
                    }
                }
                break;
            }
            case types.Polyline: {
                switch (shape2.type) {
                    case types.Line: {
                        return polylineWithLine(shape1, shape2);
                    }
                    case types.Ellipse: {
                        return polylineWithEllipse(shape1, shape2);
                    }
                    case types.Rect: {
                        return polylineWithRect(shape1, shape2);
                    }
                    case types.Polyline: {
                        return polylineWithPolyline(shape1, shape2);
                    }
                }
                break;
            }
            case types.Polygon: {
                switch (shape2.type) {
                    case types.Line: {
                        return polygonWithLine(shape1, shape2);
                    }
                    case types.Ellipse: {
                        return polygonWithEllipse(shape1, shape2);
                    }
                    case types.Rect: {
                        return polygonWithRect(shape1, shape2);
                    }
                    case types.Polyline: {
                        return polygonWithPolyline(shape1, shape2);
                    }
                    case types.Polygon: {
                        return polygonWithPolygon(shape1, shape2);
                    }
                }
                break;
            }
            case types.Path: {
                switch (shape2.type) {
                    case types.Line: {
                        return pathWithLine(shape1, shape2, shape1opt);
                    }
                    case types.Ellipse: {
                        return pathWithEllipse(shape1, shape2, shape1opt);
                    }
                    case types.Rect: {
                        return pathWithRect(shape1, shape2, shape1opt);
                    }
                    case types.Polyline: {
                        return pathWithPolyline(shape1, shape2, shape1opt);
                    }
                    case types.Polygon: {
                        return pathWithPolygon(shape1, shape2, shape1opt);
                    }
                    case types.Path: {
                        return pathWithPath(shape1, shape2, shape1opt, shape2opt);
                    }
                }
                break;
            }
        }
        // None of the cases above
        switch (shape2.type) {
            case types.Ellipse:
            case types.Rect:
            case types.Polyline:
            case types.Polygon:
            case types.Path: {
                return exists(shape2, shape1, shape2opt, shape1opt);
            }
            default: {
                throw Error(("The intersection for " + shape1 + " and " + shape2 + " could not be found."));
            }
        }
    }

    /* Line */

    function lineWithLine(line1, line2) {
        var x1 = line1.start.x;
        var y1 = line1.start.y;
        var x2 = line1.end.x;
        var y2 = line1.end.y;
        var x3 = line2.start.x;
        var y3 = line2.start.y;
        var x4 = line2.end.x;
        var y4 = line2.end.y;
        var s1x = x2 - x1;
        var s1y = y2 - y1;
        var s2x = x4 - x3;
        var s2y = y4 - y3;
        var s3x = x1 - x3;
        var s3y = y1 - y3;
        var p = s1x * s2y - s2x * s1y;
        var s = (s1x * s3y - s1y * s3x) / p;
        var t = (s2x * s3y - s2y * s3x) / p;
        return s >= 0 && s <= 1 && t >= 0 && t <= 1;
    }

    /* Ellipse */

    function ellipseWithLine(ellipse, line) {
        var rex = ellipse.a;
        var rey = ellipse.b;
        var xe = ellipse.x;
        var ye = ellipse.y;
        var x1 = line.start.x - xe;
        var x2 = line.end.x - xe;
        var y1 = line.start.y - ye;
        var y2 = line.end.y - ye;
        var rex_2 = rex * rex;
        var rey_2 = rey * rey;
        var dx = x2 - x1;
        var dy = y2 - y1;
        var A = dx * dx / rex_2 + dy * dy / rey_2;
        var B = 2 * x1 * dx / rex_2 + 2 * y1 * dy / rey_2;
        var C = x1 * x1 / rex_2 + y1 * y1 / rey_2 - 1;
        var D = B * B - 4 * A * C;
        if (D === 0) {
            var t = -B / 2 / A;
            return t >= 0 && t <= 1;
        } else if (D > 0) {
            var sqrt = Math.sqrt(D);
            var t1 = (-B + sqrt) / 2 / A;
            var t2 = (-B - sqrt) / 2 / A;
            return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1);
        }
        return false;
    }

    function ellipseWithEllipse(ellipse1, ellipse2) {
        return _ellipsesIntersection(ellipse1, 0, ellipse2, 0);
    }

    /* Rect */

    function rectWithLine(rect, line) {
        var start = line.start;
        var end = line.end;
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var height = rect.height;
        if (
            (start.x > x + width && end.x > x + width)
            || (start.x < x && end.x < x)
            || (start.y > y + height && end.y > y + height)
            || (start.y < y && end.y < y)
        ) {
            return false;
        }
        if (rect.containsPoint(line.start) || rect.containsPoint(line.end)) {
            return true;
        }
        return lineWithLine(rect.topLine(), line)
            || lineWithLine(rect.rightLine(), line)
            || lineWithLine(rect.bottomLine(), line)
            || lineWithLine(rect.leftLine(), line);
    }

    function rectWithEllipse(rect, ellipse) {
        if (!rectWithRect(rect, Rect.fromEllipse(ellipse))) { return false; }
        return polygonWithEllipse(Polygon.fromRect(rect), ellipse);
    }

    function rectWithRect(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width
            && rect1.x + rect1.width > rect2.x
            && rect1.y < rect2.y + rect2.height
            && rect1.y + rect1.height > rect2.y;
    }

    /* Polyline */

    function polylineWithLine(polyline, line) {
        return _polylineWithLine(polyline, line, { interior: false });
    }

    function polylineWithEllipse(polyline, ellipse) {
        return _polylineWithEllipse(polyline, ellipse, { interior: false });
    }

    function polylineWithRect(polyline, rect) {
        return _polylineWithRect(polyline, rect, { interior: false });
    }

    function polylineWithPolyline(polyline1, polyline2) {
        return _polylineWithPolyline(polyline1, polyline2, { interior: false });
    }

    /* Polygon */

    function polygonWithLine(polygon, line) {
        return _polylineWithLine(polygon, line, { interior: true });
    }

    function polygonWithEllipse(polygon, ellipse) {
        return _polylineWithEllipse(polygon, ellipse, { interior: true });
    }

    function polygonWithRect(polygon, rect) {
        return _polylineWithRect(polygon, rect, { interior: true });
    }

    function polygonWithPolyline(polygon, polyline) {
        return _polylineWithPolyline(polygon, polyline, { interior: true });
    }

    function polygonWithPolygon(polygon1, polygon2) {
        return _polylineWithPolygon(polygon1, polygon2, { interior: true });
    }

    /* Path */

    function pathWithLine(path, line, pathOpt) {
        return path.getSubpaths().some(function (subpath) {
            var ref = subpath.toPolylines(pathOpt);
            var polyline = ref[0];
            var ref$1 = subpath.getSegment(-1);
            var type = ref$1.type;
            if (type === 'Z') {
                return polygonWithLine(polyline, line);
            } else {
                return polylineWithLine(polyline, line);
            }
        });
    }

    function pathWithEllipse(path, ellipse, pathOpt) {
        return path.getSubpaths().some(function (subpath) {
            var ref = subpath.toPolylines(pathOpt);
            var polyline = ref[0];
            var ref$1 = subpath.getSegment(-1);
            var type = ref$1.type;
            if (type === 'Z') {
                return polygonWithEllipse(polyline, ellipse);
            } else {
                return polylineWithEllipse(polyline, ellipse);
            }
        });
    }

    function pathWithRect(path, rect, pathOpt) {
        return pathWithPolygon(path, Polygon.fromRect(rect), pathOpt);
    }

    function pathWithPolyline(path, polyline, pathOpt) {
        return _pathWithPolyline(path, polyline, pathOpt, { interior: false });
    }

    function pathWithPolygon(path, polygon, pathOpt) {
        return _pathWithPolyline(path, polygon, pathOpt, { interior: true });
    }

    function pathWithPath(path1, path2, pathOpt1, pathOpt2) {
        return path1.getSubpaths().some(function (subpath) {
            var ref = subpath.toPolylines(pathOpt1);
            var polyline1 = ref[0];
            var ref$1 = subpath.getSegment(-1);
            var type = ref$1.type;
            if (type === 'Z') {
                return pathWithPolygon(path2, polyline1, pathOpt2);
            } else {
                return pathWithPolyline(path2, polyline1, pathOpt2);
            }
        });
    }

    function _polylineWithLine(polyline, line, opt) {
        if ( opt === void 0 ) opt = {};

        var interior = opt.interior; if ( interior === void 0 ) interior = false;
        var thisPoints;
        if (interior) {
            if (polyline.containsPoint(line.start)) {
                // If any point of the polyline lies inside this polygon (interior = true)
                // there is an intersection (we've chosen the start point)
                return true;
            }
            var start = polyline.start;
            var end = polyline.end;
            var points = polyline.points;
            thisPoints = end.equals(start) ? points : points.concat( [start]);
        } else {
            thisPoints = polyline.points;
        }
        var length = thisPoints.length;
        var segment = new Line();
        for (var i = 0; i < length - 1; i++) {
            segment.start = thisPoints[i];
            segment.end = thisPoints[i + 1];
            if (lineWithLine(line, segment)) {
                return true;
            }
        }
        return false;
    }

    function _polylineWithEllipse(polyline, ellipse, opt) {
        if ( opt === void 0 ) opt = {};

        var start = polyline.start;
        var end = polyline.end;
        var points = polyline.points;
        if (ellipse.containsPoint(start)) {
            return true;
        }
        var thisPoints;
        var interior = opt.interior; if ( interior === void 0 ) interior = false;
        if (interior) {
            if (polyline.containsPoint(ellipse.center())) {
                // If any point of the ellipse lies inside this polygon (interior = true)
                // there is an intersection (we've chosen the center point)
                return true;
            }
            thisPoints = end.equals(start) ? points : points.concat( [start]);
        } else {
            thisPoints = points;
        }

        var length = thisPoints.length;
        var segment = new Line();
        for (var i = 0; i < length - 1; i++) {
            segment.start = thisPoints[i];
            segment.end = thisPoints[i + 1];
            if (ellipseWithLine(ellipse, segment)) {
                return true;
            }
        }
        return false;
    }

    function _polylineWithRect(polyline, rect, opt) {
        var polygon = Polygon.fromRect(rect);
        return _polylineWithPolygon(polyline, polygon, opt);
    }

    function _pathWithPolyline(path, polyline1, pathOpt, opt) {
        return path.getSubpaths().some(function (subpath) {
            var ref = subpath.toPolylines(pathOpt);
            var polyline2 = ref[0];
            var ref$1 = subpath.getSegment(-1);
            var type = ref$1.type;
            if (type === 'Z') {
                return _polylineWithPolygon(polyline1, polyline2, opt);
            } else {
                return _polylineWithPolyline(polyline1, polyline2, opt);
            }
        });
    }

    function _polylineWithPolyline(polyline1, polyline2, opt) {
        if ( opt === void 0 ) opt = {};

        var interior = opt.interior; if ( interior === void 0 ) interior = false;
        var thisPolyline;
        if (interior) {
            var start = polyline2.start;
            if (polyline1.containsPoint(start)) {
                // If any point of the polyline lies inside this polygon (interior = true)
                // there is an intersection (we've chosen the start point)
                return true;
            }
            thisPolyline = polyline1.clone().close();
        } else {
            thisPolyline = polyline1;
        }
        var otherPoints = polyline2.points;
        var length = otherPoints.length;
        var segment = new Line();
        for (var i = 0; i < length - 1; i++) {
            segment.start = otherPoints[i];
            segment.end = otherPoints[i + 1];
            if (polylineWithLine(thisPolyline, segment)) {
                return true;
            }
        }
        return false;
    }

    function _polylineWithPolygon(polyline, polygon, opt) {
        return polygon.containsPoint(polyline.start) || _polylineWithPolyline(polyline, polygon.clone().close(), opt);
    }

    function _ellipsesIntersection(e1, w1, e2, w2) {
        var cos = Math.cos;
        var sin = Math.sin;
        var sinW1 = sin(w1);
        var cosW1 = cos(w1);
        var sinW2 = sin(w2);
        var cosW2 = cos(w2);
        var sinW1s = sinW1 * sinW1;
        var cosW1s = cosW1 * cosW1;
        var sinCos1 = sinW1 * cosW1;
        var sinW2s = sinW2 * sinW2;
        var cosW2s = cosW2 * cosW2;
        var sinCos2 = sinW2 * cosW2;
        var a1s = e1.a * e1.a;
        var b1s = e1.b * e1.b;
        var a2s = e2.a * e2.a;
        var b2s = e2.b * e2.b;
        var A1 = a1s * sinW1s + b1s * cosW1s;
        var A2 = a2s * sinW2s + b2s * cosW2s;
        var B1 = a1s * cosW1s + b1s * sinW1s;
        var B2 = a2s * cosW2s + b2s * sinW2s;
        var C1 = 2 * (b1s - a1s) * sinCos1;
        var C2 = 2 * (b2s - a2s) * sinCos2;
        var D1 = (-2 * A1 * e1.x - C1 * e1.y);
        var D2 = (-2 * A2 * e2.x - C2 * e2.y);
        var E1 = (-C1 * e1.x - 2 * B1 * e1.y);
        var E2 = (-C2 * e2.x - 2 * B2 * e2.y);
        var F1 = A1 * e1.x * e1.x + B1 * e1.y * e1.y + C1 * e1.x * e1.y - a1s * b1s;
        var F2 = A2 * e2.x * e2.x + B2 * e2.y * e2.y + C2 * e2.x * e2.y - a2s * b2s;

        C1 = C1 / 2;
        C2 = C2 / 2;
        D1 = D1 / 2;
        D2 = D2 / 2;
        E1 = E1 / 2;
        E2 = E2 / 2;

        var l3 = det3([
            [A1, C1, D1],
            [C1, B1, E1],
            [D1, E1, F1]
        ]);
        var l0 = det3([
            [A2, C2, D2],
            [C2, B2, E2],
            [D2, E2, F2]
        ]);
        var l2 = 0.33333333 * (det3([
            [A2, C1, D1],
            [C2, B1, E1],
            [D2, E1, F1]
        ]) + det3([
            [A1, C2, D1],
            [C1, B2, E1],
            [D1, E2, F1]
        ]) + det3([
            [A1, C1, D2],
            [C1, B1, E2],
            [D1, E1, F2]
        ]));
        var l1 = 0.33333333 * (det3([
            [A1, C2, D2],
            [C1, B2, E2],
            [D1, E2, F2]
        ]) + det3([
            [A2, C1, D2],
            [C2, B1, E2],
            [D2, E1, F2]
        ]) + det3([
            [A2, C2, D1],
            [C2, B2, E1],
            [D2, E2, F1]
        ]));

        var delta1 = det2([
            [l3, l2],
            [l2, l1]
        ]);
        var delta2 = det2([
            [l3, l1],
            [l2, l0]
        ]);
        var delta3 = det2([
            [l2, l1],
            [l1, l0]
        ]);

        var dP = det2([
            [2 * delta1, delta2],
            [delta2, 2 * delta3]
        ]);

        if (dP > 0 && (l1 > 0 || l2 > 0)) {
            return false;
        }
        return true;
    }

    function det2(m) {
        return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    }

    function det3(m) {
        return m[0][0] * m[1][1] * m[2][2] -
            m[0][0] * m[1][2] * m[2][1] -
            m[0][1] * m[1][0] * m[2][2] +
            m[0][1] * m[1][2] * m[2][0] +
            m[0][2] * m[1][0] * m[2][1] -
            m[0][2] * m[1][1] * m[2][0];
    }

    var _intersection = ({
        exists: exists,
        lineWithLine: lineWithLine,
        ellipseWithLine: ellipseWithLine,
        ellipseWithEllipse: ellipseWithEllipse,
        rectWithLine: rectWithLine,
        rectWithEllipse: rectWithEllipse,
        rectWithRect: rectWithRect,
        polylineWithLine: polylineWithLine,
        polylineWithEllipse: polylineWithEllipse,
        polylineWithRect: polylineWithRect,
        polylineWithPolyline: polylineWithPolyline,
        polygonWithLine: polygonWithLine,
        polygonWithEllipse: polygonWithEllipse,
        polygonWithRect: polygonWithRect,
        polygonWithPolyline: polygonWithPolyline,
        polygonWithPolygon: polygonWithPolygon,
        pathWithLine: pathWithLine,
        pathWithEllipse: pathWithEllipse,
        pathWithRect: pathWithRect,
        pathWithPolyline: pathWithPolyline,
        pathWithPolygon: pathWithPolygon,
        pathWithPath: pathWithPath
    });

    // Geometry library.
    var intersection = _intersection;

    exports.Curve = Curve;
    exports.Ellipse = Ellipse;
    exports.Line = Line;
    exports.Path = Path;
    exports.Point = Point;
    exports.Polygon = Polygon;
    exports.Polyline = Polyline;
    exports.Rect = Rect;
    exports.bezier = bezier;
    exports.ellipse = ellipse;
    exports.intersection = intersection;
    exports.line = line;
    exports.normalizeAngle = normalizeAngle;
    exports.point = point;
    exports.random = random;
    exports.rect = rect;
    exports.scale = scale;
    exports.snapToGrid = snapToGrid;
    exports.toDeg = toDeg;
    exports.toRad = toRad;
    exports.types = types;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
