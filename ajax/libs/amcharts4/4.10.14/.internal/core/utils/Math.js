/**
 * A collection of Math-related functions
 *
 * @todo Comment trigonometric functions?
 */
import * as $type from "./Type";
/**
 * ============================================================================
 * CONSTANTS
 * ============================================================================
 * @hidden
 */
export var PI = Math.PI;
export var HALFPI = PI / 2;
export var RADIANS = PI / 180;
export var DEGREES = 180 / PI;
/**
 * Converts any value and fits it into a specific value range.
 *
 * @param value  Source value
 * @param min    Minimum allowable value
 * @param max    Maximum allowable value
 * @return Number
 */
export function toNumberRange(value, min, max) {
    if ($type.hasValue(value)) {
        value = $type.toNumber(value);
        return fitToRange(value, min, max);
    }
    return value;
}
/**
 * Rounds the numeric value to whole number or specific precision of set.
 *
 * @param value      Value
 * @param precision  Precision (number of decimal points)
 * @param floor  In case value ends with 0.5 and precision is 0, we might need to floor the value instead of ceiling it.
 * @return Rounded value
 */
export function round(value, precision, floor) {
    if (!$type.isNumber(precision) || precision <= 0) {
        var rounded = Math.round(value);
        if (floor) {
            if (rounded - value == 0.5) {
                rounded--;
            }
        }
        return rounded;
    }
    else {
        var d = Math.pow(10, precision);
        return Math.round(value * d) / d;
    }
}
/**
 * Ceils the numeric value to whole number or specific precision of set.
 *
 * @param value      Value
 * @param precision  Precision (number of decimal points)
 * @return Rounded value
 */
export function ceil(value, precision) {
    if (!$type.isNumber(precision) || precision <= 0) {
        return Math.ceil(value);
    }
    else {
        var d = Math.pow(10, precision);
        return Math.ceil(value * d) / d;
    }
}
/**
 * Stretches `t` so that it will always be between `from` and `to`.
 *
 * @param t     Number from 0 to 1
 * @param from  Lowest possible value
 * @param to    Highest possible value
 * @return Adjusted value
 */
export function stretch(t, from, to) {
    return (t * (to - from)) + from;
}
/**
 * Adjust numeric value so it fits to specific value range.
 *
 * @param value     Value
 * @param minValue  Lowest possible value
 * @param maxValue  Highest possible value
 * @return Adjusted value
 */
export function fitToRange(value, minValue, maxValue) {
    if ($type.isNumber(minValue)) {
        if ($type.isNumber(maxValue) && maxValue < minValue) {
            var temp = maxValue;
            maxValue = minValue;
            minValue = temp;
        }
        if (value < minValue) {
            value = minValue;
        }
    }
    if ($type.isNumber(maxValue)) {
        if (value > maxValue) {
            value = maxValue;
        }
    }
    return value;
}
/**
 * Returns sine of a number.
 *
 * @param value  Value
 * @return Sine
 */
export function sin(value) {
    return round(Math.sin(RADIANS * value), 10);
}
/**
 * Returns tan of a number.
 *
 * @param value  Value
 * @return Sine
 */
export function tan(value) {
    return round(Math.tan(RADIANS * value), 10);
}
/**
 * Returns cosine of a number.
 *
 * @param value  Value
 * @return Cosine
 */
export function cos(value) {
    return round(Math.cos(RADIANS * value), 10);
}
export function max(left, right) {
    if ($type.isNumber(left)) {
        if ($type.isNumber(right)) {
            if (right > left) {
                return right;
            }
            else {
                return left;
            }
        }
        else {
            return left;
        }
    }
    else if ($type.isNumber(right)) {
        return right;
    }
    else {
        return null;
    }
}
export function min(left, right) {
    if ($type.isNumber(left)) {
        if ($type.isNumber(right)) {
            if (right < left) {
                return right;
            }
            else {
                return left;
            }
        }
        else {
            return left;
        }
    }
    else if ($type.isNumber(right)) {
        return right;
    }
    else {
        return null;
    }
}
/**
 * Returns the closest value from the array of values to the reference value.
 *
 * @param values  Array of values
 * @param value   Reference value
 * @return Closes value from the array
 */
export function closest(values, referenceValue) {
    return values.reduce(function (prev, curr) {
        return (Math.abs(curr - referenceValue) < Math.abs(prev - referenceValue) ? curr : prev);
    });
}
/**
 * Checks whether two ranges of values intersect.
 *
 * @param range1  Range 1
 * @param range2  Range 2
 * @return Any intersecting numbers?
 */
export function intersect(range1, range2) {
    var start1 = $type.getValue(range1.start);
    var start2 = $type.getValue(range2.start);
    var end1 = $type.getValue(range1.end);
    var end2 = $type.getValue(range2.end);
    return Math.max(start1, start2) <= Math.min(end1, end2);
}
/**
 * Inverts the range of values.
 *
 * @param range  Range
 */
export function invertRange(range) {
    var start = $type.getValue(range.start);
    var end = $type.getValue(range.end);
    return { start: 1 - end, end: 1 - start };
}
/**
 * Returns an intersection range between two ranges of values.
 *
 * @param range1  Range 1
 * @param range2  Range 2
 * @return Intersecting value range
 */
export function intersection(range1, range2) {
    var start1 = $type.getValue(range1.start);
    var start2 = $type.getValue(range2.start);
    var end1 = $type.getValue(range1.end);
    var end2 = $type.getValue(range2.end);
    var startMax = Math.max(start1, start2);
    var endMin = Math.min(end1, end2);
    if (endMin < startMax) {
        return undefined;
    }
    else {
        return { start: startMax, end: endMin };
    }
}
/**
 * Returns pixel "distance" between two points.
 *
 * If second point is not specified, distance from {x:0, y:0} point is
 * calculated.
 *
 * @param point1  Point 1
 * @param point2  Point 2
 * @return Distance in relative pixels
 */
export function getDistance(point1, point2) {
    if (!point1) {
        return 0;
    }
    if (!point2) {
        point2 = { x: 0, y: 0 };
    }
    return Math.sqrt(Math.pow(Math.abs(point1.x - point2.x), 2) + Math.pow(Math.abs(point1.y - point2.y), 2));
}
/**
 * Returns pixel "horizontal distance" between two points.
 *
 * If second point is not specified, distance from {x:0, y:0} point is
 * calculated.
 *
 * @param point1  Point 1
 * @param point2  Point 2
 * @return Distance in relative pixels
 */
export function getHorizontalDistance(point1, point2) {
    if (!point1) {
        return 0;
    }
    if (!point2) {
        point2 = { x: 0, y: 0 };
    }
    return Math.abs(point1.x - point2.x);
}
/**
 * Returns pixel "vertical distance" between two points.
 *
 * If second point is not specified, distance from {x:0, y:0} point is
 * calculated.
 *
 * @param point1  Point 1
 * @param point2  Point 2
 * @return Distance in relative pixels
 */
export function getVerticalDistance(point1, point2) {
    if (!point1) {
        return 0;
    }
    if (!point2) {
        point2 = { x: 0, y: 0 };
    }
    return Math.abs(point1.y - point2.y);
}
/**
 * Returns approximate pixel "distance" between two points of cubic curve
 *
 * If second point is not specified, distance from {x:0, y:0} point is
 * calculated.
 *
 * @param point1  Point 1
 * @param point2  Point 2
 * @param controlPointA  Control Point 1
 * @param controlPointB  Control Point 2
 * @param stepCount  number of steps (the more, the more accurate result)
 * @return Distance in relative pixels
 */
export function getCubicCurveDistance(point1, point2, controlPointA, controlPointB, stepCount) {
    if (!point1) {
        return 0;
    }
    if (!point2) {
        point2 = { x: 0, y: 0 };
    }
    var distance = 0;
    var prevPoint = point1;
    if (stepCount > 0) {
        for (var s = 0; s <= stepCount; s++) {
            var point = getPointOnCubicCurve(point1, point2, controlPointA, controlPointB, s / stepCount);
            distance += getDistance(prevPoint, point);
            prevPoint = point;
        }
    }
    return distance;
}
/**
 * Returns scale based on original and end position of the two points.
 *
 * @param point1       Current position of point 1
 * @param startPoint1  Start position of point 1
 * @param point2       Current position of point 1
 * @param startPoint2  Start position of point 2
 * @return Scale        Calculated scale
 */
export function getScale(point1, startPoint1, point2, startPoint2) {
    var initialDistance = getDistance(startPoint1, startPoint2);
    var currentDistance = getDistance(point1, point2);
    return Math.abs(currentDistance / initialDistance);
}
/**
 * Returns an exact mid point between two points.
 *
 * @param point1     Position of point 1
 * @param point2     Position of point 2
 * @return Mid point  Position of mid-point
 */
export function getMidPoint(point1, point2, position) {
    if (!$type.isNumber(position)) {
        position = 0.5;
    }
    return {
        "x": (point1.x + (point2.x - point1.x) * position),
        "y": (point1.y + (point2.y - point1.y) * position)
    };
}
/**
 * Returns difference in angles between starting and ending position of two
 * vectors.
 *
 * @param point1       Current position of point 1
 * @param startPoint1  Start position of point 1
 * @param point2       Current position of point 1
 * @param startPoint2  Start position of point 2
 * @return Angle difference in degrees
 */
export function getRotation(point1, startPoint1, point2, startPoint2) {
    // Get start and end angles
    var startAngle = getAngle(startPoint1, startPoint2);
    var angle = getAngle(point1, point2);
    // Calculate angle
    var diff = startAngle - angle;
    if (diff < 0) {
        diff += 360;
    }
    return diff;
}
/**
 * Calculates angle of the vector based on two or one point.
 *
 * @param point1  Point 1
 * @param point2  Point 2
 * @return Angle in degrees
 */
export function getAngle(point1, point2) {
    if (!point2) {
        point2 = { x: point1.x * 2, y: point1.y * 2 };
    }
    var diffX = point2.x - point1.x;
    var diffY = point2.y - point1.y;
    var angle = Math.atan2(diffY, diffX) * DEGREES;
    if (angle < 0) {
        angle += 360;
    }
    return normalizeAngle(angle);
}
/**
 * Returns the shift in coordinates of the center when item is rotated, moved
 * and scaled at the same time.
 *
 * @param center       Current center
 * @param point1       Frst reference point
 * @param startPoint1  Original position of the first reference point
 * @param point2       Second reference point
 * @param startPoint2  Original position of the first reference point
 * @return Shift in center point coordinates
 */
export function getCenterShift(center, point1, startPoint1, point2, startPoint2) {
    // Get angle
    var angle = getRotation(point1, startPoint1, point2, startPoint2) - 90;
    if (angle < 0) {
        angle += 360;
    }
    // Get distance between new position
    var distance = getDistance(point1, point2);
    // Calculate new X
    var x = Math.cos(angle) / distance + point1.x;
    var y = Math.cos(angle) / distance + point1.y;
    var shift = {
        "x": x - center.x,
        "y": y - center.y
    };
    return shift;
}
/**
 * Converts an array of points into a bounding box rectangle.
 *
 * Array can contain any number of points.
 *
 * @param points  Points
 * @return Bounding box rectangle
 */
export function getBBox(points) {
    if (points) {
        var length_1 = points.length;
        if (length_1 !== 0) {
            var left = void 0;
            var right = void 0;
            var top_1;
            var bottom = void 0;
            for (var i = 0; i < length_1; i++) {
                var point = points[i];
                if (!$type.isNumber(right) || (point.x > right)) {
                    right = point.x;
                }
                if (!$type.isNumber(left) || (point.x < left)) {
                    left = point.x;
                }
                if (!$type.isNumber(top_1) || (point.y < top_1)) {
                    top_1 = point.y;
                }
                if (!$type.isNumber(bottom) || (point.y > bottom)) {
                    bottom = point.y;
                }
            }
            return { x: left, y: top_1, width: right - left, height: bottom - top_1 };
        }
    }
    return { x: 0, y: 0, width: 0, height: 0 };
}
/**
 * Returns a [[IRectangle]] object representing a common rectangle that fits
 * all passed in rectangles in it.
 *
 * @param rectangles  An array of rectangles
 * @return Common rectangle
 */
export function getCommonRectangle(rectangles) {
    var length = rectangles.length;
    if (length !== 0) {
        var minX = void 0;
        var minY = void 0;
        var maxX = void 0;
        var maxY = void 0;
        for (var i = 0; i < length; i++) {
            var rectangle = rectangles[i];
            minX = min(rectangle.x, minX);
            minY = min(rectangle.y, minY);
            maxX = max(rectangle.x + rectangle.width, maxX);
            maxY = max(rectangle.y + rectangle.height, maxY);
        }
        return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
    }
}
/**
 * [getPointOnQuadraticCurve description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param pointA        [description]
 * @param pointB        [description]
 * @param controlPoint  [description]
 * @param position      [description]
 * @return [description]
 */
export function getPointOnQuadraticCurve(pointA, pointB, controlPoint, position) {
    var x = (1 - position) * (1 - position) * pointA.x + 2 * (1 - position) * position * controlPoint.x + position * position * pointB.x;
    var y = (1 - position) * (1 - position) * pointA.y + 2 * (1 - position) * position * controlPoint.y + position * position * pointB.y;
    return { x: x, y: y };
}
/**
 * [getPointOnCubicCurve description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param pointA         [description]
 * @param pointB         [description]
 * @param controlPointA  [description]
 * @param controlPointB  [description]
 * @param position       [description]
 * @return [description]
 */
export function getPointOnCubicCurve(pointA, pointB, controlPointA, controlPointB, position) {
    var point = { x: 0, y: 0 };
    var mt1 = 1 - position;
    var mt2 = mt1 * mt1;
    var mt3 = mt2 * mt1;
    point.x = pointA.x * mt3 + controlPointA.x * 3 * mt2 * position + controlPointB.x * 3 * mt1 * position * position + pointB.x * position * position * position;
    point.y = pointA.y * mt3 + controlPointA.y * 3 * mt2 * position + controlPointB.y * 3 * mt1 * position * position + pointB.y * position * position * position;
    return point;
}
/**
 * [getCubicControlPointA description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param p0        [description]
 * @param p1        [description]
 * @param p2        [description]
 * @param p3        [description]
 * @param tensionX  [description]
 * @param tensionY  [description]
 * @return [description]
 */
export function getCubicControlPointA(p0, p1, p2, p3, tensionX, tensionY) {
    tensionX = adjustTension(tensionX);
    tensionY = adjustTension(tensionY);
    return { x: ((-p0.x + p1.x / tensionX + p2.x) * tensionX), y: ((-p0.y + p1.y / tensionY + p2.y) * tensionY) };
}
/**
 * [getCubicControlPointB description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param p0        [description]
 * @param p1        [description]
 * @param p2        [description]
 * @param p3        [description]
 * @param tensionX  [description]
 * @param tensionY  [description]
 * @return [description]
 */
export function getCubicControlPointB(p0, p1, p2, p3, tensionX, tensionY) {
    tensionX = adjustTension(tensionX);
    tensionY = adjustTension(tensionY);
    return { x: ((p1.x + p2.x / tensionX - p3.x) * tensionX), y: ((p1.y + p2.y / tensionY - p3.y) * tensionY) };
}
/**
 * [adjustTension description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param tension  [description]
 * @return [description]
 */
export function adjustTension(tension) {
    return 1 - tension + 0.00001;
}
/**
 * [normalizeAngle description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param value  [description]
 * @return [description]
 */
export function normalizeAngle(value) {
    if (value == 360) {
        return 360;
    }
    return value % 360;
}
/**
 * [normalizeAngleToRange description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @todo review this with various angles, can be tested on radar chart with custom start/end angles
 * @param value       [description]
 * @param startAngle  [description]
 * @param endAngle    [description]
 * @return [description]
 */
export function fitAngleToRange(value, startAngle, endAngle) {
    if (startAngle > endAngle) {
        var temp = startAngle;
        startAngle = endAngle;
        endAngle = temp;
    }
    value = normalizeAngle(value);
    var count = (startAngle - normalizeAngle(startAngle)) / 360;
    if (value < startAngle) {
        value += 360 * (count + 1);
    }
    var maxEnd = startAngle + (endAngle - startAngle) / 2 + 180;
    var maxStart = startAngle + (endAngle - startAngle) / 2 - 180;
    if (value > endAngle) {
        if (value - 360 > startAngle) {
            value -= 360;
        }
        else {
            if (value < maxEnd) {
                value = endAngle;
            }
            else {
                value = startAngle;
            }
        }
    }
    if (value < startAngle) {
        if (value > maxStart) {
            value = startAngle;
        }
        else {
            value = endAngle;
        }
    }
    return value;
}
/**
 * Returns [[IRectangle]] of an arc in relative values, assuming that the
 * center is at the circle center.
 *
 * Used to find out max radius of an arc.
 *
 * @ignore Exclude from docs
 * @param startAngle  Start angle
 * @param endAngle    End angle
 * @param radius    	 Relative radius
 * @return Rectangle
 */
export function getArcRect(startAngle, endAngle, radius) {
    var minX = Number.MAX_VALUE;
    var minY = Number.MAX_VALUE;
    var maxX = -Number.MAX_VALUE;
    var maxY = -Number.MAX_VALUE;
    var bpoints = [];
    if (!$type.isNumber(radius)) {
        radius = 1;
    }
    bpoints.push(getArcPoint(radius, startAngle));
    bpoints.push(getArcPoint(radius, endAngle));
    var fromAngle = Math.min(Math.floor(startAngle / 90) * 90, Math.floor(endAngle / 90) * 90);
    var toAngle = Math.max(Math.ceil(startAngle / 90) * 90, Math.ceil(endAngle / 90) * 90);
    for (var angle = fromAngle; angle <= toAngle; angle += 90) {
        if (angle >= startAngle && angle <= endAngle) {
            bpoints.push(getArcPoint(radius, angle));
        }
    }
    for (var i = 0; i < bpoints.length; i++) {
        var pt = bpoints[i];
        if (pt.x < minX) {
            minX = pt.x;
        }
        if (pt.y < minY) {
            minY = pt.y;
        }
        if (pt.x > maxX) {
            maxX = pt.x;
        }
        if (pt.y > maxY) {
            maxY = pt.y;
        }
    }
    return ({ x: minX, y: minY, width: maxX - minX, height: maxY - minY });
}
/**
 * Returns point on arc
 *
 * @param center point
 * @param radius
 * @param arc
 * @return {boolean}
 */
export function getArcPoint(radius, arc) {
    return ({ x: radius * cos(arc), y: radius * sin(arc) });
}
/**
 * Returns true if a point is within rectangle
 *
 * @param point
 * @param rectangle
 * @return {boolean}
 */
export function isInRectangle(point, rectangle) {
    if (point.x >= rectangle.x && point.x <= rectangle.x + rectangle.width && point.y > rectangle.y && point.y < rectangle.y + rectangle.height) {
        return true;
    }
    return false;
}
export function getLineIntersection(pointA1, pointA2, pointB1, pointB2) {
    var x = ((pointA1.x * pointA2.y - pointA2.x * pointA1.y) * (pointB1.x - pointB2.x) - (pointA1.x - pointA2.x) * (pointB1.x * pointB2.y - pointB1.y * pointB2.x)) / ((pointA1.x - pointA2.x) * (pointB1.y - pointB2.y) - (pointA1.y - pointA2.y) * (pointB1.x - pointB2.x));
    var y = ((pointA1.x * pointA2.y - pointA2.x * pointA1.y) * (pointB1.y - pointB2.y) - (pointA1.y - pointA2.y) * (pointB1.x * pointB2.y - pointB1.y * pointB2.x)) / ((pointA1.x - pointA2.x) * (pointB1.y - pointB2.y) - (pointA1.y - pointA2.y) * (pointB1.x - pointB2.x));
    return { x: x, y: y };
}
//# sourceMappingURL=Math.js.map