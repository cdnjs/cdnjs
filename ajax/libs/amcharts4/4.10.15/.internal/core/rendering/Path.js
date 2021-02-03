/**
 * A collection of functions that deals with path calculations.
 */
import * as $math from "../utils/Math";
import * as $type from "../utils/Type";
import { getGhostPaper } from "../rendering/Paper";
import { options } from "../Options";
/**
 * ============================================================================
 * PATH FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Returns an SVG path from a number of points.
 *
 * @ignore Exclude from docs
 * @param points  An array of line elbow points
 * @return SVG path
 */
export function polyline(points) {
    var path = lineTo(points[0]);
    var prevPoint = { x: 0, y: 0 };
    var minStep = options.minPolylineStep;
    if (!$type.isNumber(minStep)) {
        minStep = 0.5;
    }
    for (var i = 0, len = points.length; i < len; i++) {
        var point = points[i];
        if ($math.getDistance(point, prevPoint) > minStep) {
            path += lineTo(point);
            prevPoint = point;
        }
    }
    return path;
}
/**
 * Returns a starting point of an SVG path.
 *
 * @ignore Exclude from docs
 * @param point  Starting point
 * @return SVG path
 */
export function moveTo(point) {
    return " M" + $math.round(point.x, 4) + "," + $math.round(point.y, 4) + " ";
}
/**
 * Returns a line part of SVG path.
 *
 * @ignore Exclude from docs
 * @param point  SVG path
 * @return SVG path
 */
export function lineTo(point) {
    return " L" + $math.round(point.x, 4) + "," + $math.round(point.y, 4) + " ";
}
/**
 * Returns a quadratic curve part of an SVG path.
 *
 * @ignore Exclude from docs
 * @param point         End point of the curve
 * @param controlPoint  Control point
 * @return SVG path
 */
export function quadraticCurveTo(point, controlPoint) {
    return " Q" + $math.round(controlPoint.x, 4)
        + "," + $math.round(controlPoint.y, 4) + " " + $math.round(point.x, 4)
        + "," + $math.round(point.y, 4);
}
/**
 * Returns a cubic curve part of an SVG path.
 *
 * @ignore Exclude from docs
 * @param point          End point of the curve
 * @param controlPointA  Control point A
 * @param controlPointB  Control point B
 * @return SVG path
 */
export function cubicCurveTo(point, controlPointA, controlPointB) {
    return " C" + $math.round(controlPointA.x, 4)
        + "," + $math.round(controlPointA.y, 4) + " " + $math.round(controlPointB.x, 4)
        + "," + $math.round(controlPointB.y, 4) + " " + $math.round(point.x, 4)
        + "," + $math.round(point.y, 4);
}
/**
 * Returns a terminator for an SVG path.
 *
 * @ignore Exclude from docs
 * @return SVG path
 */
export function closePath() {
    return " Z";
}
/**
 * Returns an arc part of an SVG path.
 *
 * @ignore Exclude from docs
 * @todo Better parameter descriptions
 * @param startAngle  Starting angle
 * @param arc         Arc
 * @param radius      Radius
 * @param radiusY     Vertical radius
 * @return SVG path
 */
export function arcTo(startAngle, arc, radius, radiusY) {
    if (arc == 0) {
        return "";
    }
    if (!$type.isNumber(radiusY)) {
        radiusY = radius;
    }
    var path = "";
    var c = ",";
    var segments = Math.ceil(Math.abs(arc) / 180);
    var l = 1;
    if (arc < 0) {
        l = 0;
    }
    // previous, as we use a not A
    var pax = 0;
    var pay = 0;
    // center
    var cx = -$math.cos(startAngle) * radius;
    var cy = -$math.sin(startAngle) * radiusY;
    // foir very short angles and big radius, solves artefacts
    if (arc < 0.5 && radius > 3000) {
        var endAngle = startAngle + arc;
        var ax = $math.round($math.cos(endAngle) * radius, 4);
        var ay = $math.round($math.sin(endAngle) * radiusY, 4);
        return lineTo({ x: ax, y: ay });
    }
    for (var i = 0; i < segments; i++) {
        var endAngle = startAngle + arc / segments * (i + 1);
        var ax = $math.round($math.cos(endAngle) * radius + cx - pax, 4);
        var ay = $math.round($math.sin(endAngle) * radiusY + cy - pay, 4);
        path += " a" + radius + c + radiusY + c + 0 + c + 0 + c + l + c + ax + c + ay;
        pax = ax;
        pay = ay;
    }
    return path;
}
/**
 * Creates an arc path.
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param startAngle         [description]
 * @param arc                [description]
 * @param radius             [description]
 * @param innerRadius        [description]
 * @param radiusY            [description]
 * @param cornerRadius       [description]
 * @param innerCornerRadius  [description]
 * @return SVG path
 */
export function arc(startAngle, arc, radius, innerRadius, radiusY, cornerRadius, innerCornerRadius) {
    if (arc == 0) {
        return "";
    }
    if (!$type.isNumber(innerRadius)) {
        innerRadius = 0;
    }
    if (radius == 0 && innerRadius <= 0) {
        return "";
    }
    if (radius < innerRadius) {
        var temp = radius;
        radius = innerRadius;
        innerRadius = temp;
        if ($type.isNumber(radiusY)) {
            radiusY = radiusY / innerRadius * radius;
        }
    }
    arc = $math.min(arc, 360);
    if (arc == 360) {
        cornerRadius = 0;
        innerCornerRadius = 0;
    }
    var endAngle = startAngle + arc;
    var crSin = $math.sin($math.min(arc, 45) / 2);
    radiusY = $type.isNumber(radiusY) ? radiusY : radius;
    cornerRadius = cornerRadius || 0;
    innerCornerRadius = $type.isNumber(innerCornerRadius) ? innerCornerRadius : cornerRadius;
    var innerRadiusY = (radiusY / radius) * innerRadius;
    var cornerRadiusY = (radiusY / radius) * cornerRadius;
    var innerCornerRadiusY = (radiusY / radius) * innerCornerRadius;
    cornerRadius = $math.fitToRange(cornerRadius, 0, (radius - innerRadius) / 2);
    cornerRadiusY = $math.fitToRange(cornerRadiusY, 0, (radiusY - innerRadiusY) / 2);
    innerCornerRadius = $math.fitToRange(innerCornerRadius, 0, (radius - innerRadius) / 2);
    innerCornerRadiusY = $math.fitToRange(innerCornerRadiusY, 0, (radiusY - innerRadiusY) / 2);
    cornerRadius = $math.round($math.fitToRange(cornerRadius, 0, radius * crSin), 4);
    cornerRadiusY = $math.round($math.fitToRange(cornerRadiusY, 0, radiusY * crSin), 4);
    innerCornerRadius = $math.round($math.fitToRange(innerCornerRadius, 0, innerRadius * crSin), 4);
    innerCornerRadiusY = $math.round($math.fitToRange(innerCornerRadiusY, 0, innerRadiusY * crSin), 4);
    var crAngle = Math.asin(cornerRadius / radius / 2) * $math.DEGREES * 2;
    var crAngleY = Math.asin(cornerRadiusY / radiusY / 2) * $math.DEGREES * 2;
    if (innerRadius < innerCornerRadius) {
        innerRadius = innerCornerRadius;
    }
    if (innerRadiusY < innerCornerRadiusY) {
        innerRadiusY = innerCornerRadiusY;
    }
    var crInnerAngle = Math.asin(innerCornerRadius / innerRadius / 2) * $math.DEGREES * 2;
    var crInnerAngleY = Math.asin(innerCornerRadiusY / innerRadiusY / 2) * $math.DEGREES * 2;
    if (!$type.isNumber(crInnerAngle)) {
        crInnerAngle = 0;
    }
    if (!$type.isNumber(crInnerAngleY)) {
        crInnerAngleY = 0;
    }
    var middleAngle = startAngle + arc / 2;
    var mPoint = { x: $math.round($math.cos(middleAngle) * innerRadius, 4), y: $math.sin(middleAngle) * innerRadiusY };
    var a0 = { x: $math.cos(startAngle) * (innerRadius + innerCornerRadius), y: $math.sin(startAngle) * (innerRadiusY + innerCornerRadiusY) };
    var b0 = { x: $math.cos(startAngle) * (radius - cornerRadius), y: $math.sin(startAngle) * (radiusY - cornerRadiusY) };
    var c0 = { x: $math.cos(endAngle) * (radius - cornerRadius), y: $math.sin(endAngle) * (radiusY - cornerRadiusY) };
    var d0 = { x: $math.cos(endAngle) * (innerRadius + innerCornerRadius), y: $math.sin(endAngle) * (innerRadiusY + innerCornerRadiusY) };
    var b1 = { x: $math.cos(startAngle + crAngle) * radius, y: $math.sin(startAngle + crAngleY) * radiusY };
    var d1 = { x: $math.cos(endAngle - crInnerAngle) * innerRadius, y: $math.sin(endAngle - crInnerAngleY) * innerRadiusY };
    // some magic math
    innerCornerRadius += innerCornerRadius * $math.sin(crInnerAngle / 2);
    innerCornerRadiusY += innerCornerRadiusY * $math.sin(crInnerAngleY / 2);
    if (crInnerAngle > (endAngle - startAngle) / 2) {
        d1 = mPoint;
    }
    var path = "";
    // start from b if this is full circle
    if (arc == 360) {
        path = moveTo(b0);
    }
    // otherwise start from a
    else {
        path = moveTo(a0);
        path += lineTo(b0);
        path += arcToPoint(b1, cornerRadius, cornerRadiusY, true);
    }
    // draw arc
    path += arcTo(startAngle + crAngle, arc - 2 * crAngle, radius, radiusY);
    // draw inner arc
    if ($type.isNumber(innerRadius) && innerRadius != 0) {
        // move to B if this is full circle
        if (arc == 360 && cornerRadius == 0) {
            path += moveTo(d0);
        }
        // draw line otherwise
        else {
            path += arcToPoint(c0, cornerRadius, cornerRadiusY, true);
            path += lineTo(d0);
            path += arcToPoint(d1, innerCornerRadius, innerCornerRadiusY, true);
        }
        path += arcTo(endAngle - crInnerAngle, -(arc - 2 * crInnerAngle), innerRadius, innerRadiusY);
        if (arc < 360 || cornerRadius > 0) {
            path += arcToPoint(a0, innerCornerRadius, innerCornerRadiusY, true);
        }
        path += lineTo(a0);
    }
    else {
        path += arcToPoint(c0, cornerRadius, cornerRadiusY, true);
        if (arc < 360) {
            path += lineTo(a0);
        }
    }
    return path;
}
/**
 * Creates a path for an arc to specific coordinate.
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param point         Reference point
 * @param radius        Radius
 * @param radiusY       Vertical radius (for skewed arcs)
 * @param sweepFlag     [description]
 * @param largeArcFlag  [description]
 * @param xAxisRotation [description]
 * @return Arc path
 */
export function arcToPoint(point, radius, radiusY, sweepFlag, largeArcFlag, xAxisRotation) {
    if (radius == 0) {
        return "";
    }
    xAxisRotation = xAxisRotation || 0;
    largeArcFlag = Boolean(largeArcFlag);
    sweepFlag = Boolean(sweepFlag);
    var c = ",";
    var sweepFlagValue = +sweepFlag; // converts to 1 or 0
    var largeArcFlagValue = +largeArcFlag; // converts to 1 or 0
    return " A" + radius + c + radiusY + c + xAxisRotation + c + largeArcFlagValue + c + sweepFlagValue + c + $math.round(point.x, 4) + c + $math.round(point.y, 4);
}
/**
 * Creates a new rectangle.
 *
 * @ignore Exclude from docs
 * @param width   Width (px)
 * @param height  Height (px)
 * @param x       X position
 * @param y       Y position
 * @return Rectangle
 */
export function rectangle(width, height, x, y) {
    if (!$type.isNumber(x)) {
        x = 0;
    }
    if (!$type.isNumber(y)) {
        y = 0;
    }
    return moveTo({ x: x, y: y }) + lineTo({ x: x + width, y: y }) + lineTo({ x: x + width, y: y + height }) + lineTo({ x: x, y: y + height }) + closePath();
}
/**
 * Converts a rectangle to an SVG path.
 *
 * @ignore Exclude from docs
 * @param rect  Rectangle
 * @param ccw   Counter-clockwise?
 * @return SVG path
 */
export function rectToPath(rect, ccw) {
    var c = ",";
    var L = " L";
    if (ccw) {
        return "M" + rect.x
            + c + rect.y + L + rect.x
            + c + (rect.y + rect.height) + L + (rect.x + rect.width)
            + c + (rect.y + rect.height) + L + (rect.x + rect.width)
            + c + rect.y + L + rect.x
            + c + rect.y;
    }
    else {
        return "M" + rect.x
            + c + rect.y + L + (rect.x + rect.width)
            + c + rect.y + L + (rect.x + rect.width)
            + c + (rect.y + rect.height) + L + rect.x
            + c + (rect.y + rect.height) + L + rect.x
            + c + rect.y;
    }
}
/**
 * Converts SVG path to array of points.
 *
 * Note, this is experimental feature based on method which is deprecated
 * on some browsers and some browsers do not support it at all.
 *
 * You can save the output of this function, but not rely on it completely.
 */
export function pathToPoints(path, pointCount) {
    var paper = getGhostPaper();
    var svgPath = paper.add("path").node;
    svgPath.setAttribute("d", path);
    if (svgPath.getPointAtLength && svgPath.getTotalLength) {
        var length_1 = svgPath.getTotalLength();
        var toPoints = [];
        for (var i = 0; i < pointCount; i++) {
            var point = svgPath.getPointAtLength(i / pointCount * length_1);
            toPoints.push({ x: point.x, y: point.y });
        }
        return toPoints;
    }
    svgPath.remove();
}
export function spiralPoints(cx, cy, radius, radiusY, innerRadius, step, radiusStep, startAngle, endAngle) {
    if (!$type.isNumber(startAngle)) {
        startAngle = 0;
    }
    if (!$type.isNumber(startAngle)) {
        endAngle = startAngle;
    }
    var r = innerRadius + 0.01;
    var angle = startAngle * $math.RADIANS;
    var points = [];
    while (r < radius + radiusStep) {
        var stepSize = step;
        if (stepSize / 2 > r) {
            stepSize = 2 * r;
        }
        angle += 2 * Math.asin(stepSize / 2 / r);
        if (angle * $math.DEGREES > endAngle + ((radius - innerRadius) / radiusStep) * 360) {
            break;
        }
        var degrees = angle * $math.DEGREES;
        var point = { x: cx + r * Math.cos(angle), y: cy + r * radiusY / radius * Math.sin(angle) };
        points.push(point);
        r = innerRadius + degrees / 360 * radiusStep;
    }
    points.shift();
    return points;
}
export function pointsToPath(points) {
    if (!points || points.length == 0) {
        return "";
    }
    var path = moveTo(points[0]);
    if (points && points.length > 0) {
        for (var i = 1; i < points.length; i++) {
            path += lineTo(points[i]);
        }
    }
    return path;
}
//# sourceMappingURL=Path.js.map