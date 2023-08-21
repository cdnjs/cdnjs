/**
 * A collection of Math-related functions
 *
 * @todo Comment trigonometric functions?
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IPoint } from "../defs/IPoint";
import { IRectangle } from "../defs/IRectangle";
import { IRange } from "../defs/IRange";
import * as $type from "./Type";
/**
 * ============================================================================
 * CONSTANTS
 * ============================================================================
 * @hidden
 */
export declare const PI: number;
export declare const HALFPI: number;
export declare const RADIANS: number;
export declare const DEGREES: number;
/**
 * Converts any value and fits it into a specific value range.
 *
 * @param value  Source value
 * @param min    Minimum allowable value
 * @param max    Maximum allowable value
 * @return Number
 */
export declare function toNumberRange(value: any, min: number, max: number): number;
/**
 * Rounds the numeric value to whole number or specific precision of set.
 *
 * @param value      Value
 * @param precision  Precision (number of decimal points)
 * @param floor  In case value ends with 0.5 and precision is 0, we might need to floor the value instead of ceiling it.
 * @return Rounded value
 */
export declare function round(value: number, precision?: number, floor?: boolean): number;
/**
 * Ceils the numeric value to whole number or specific precision of set.
 *
 * @param value      Value
 * @param precision  Precision (number of decimal points)
 * @return Rounded value
 */
export declare function ceil(value: number, precision?: number): number;
/**
 * Stretches `t` so that it will always be between `from` and `to`.
 *
 * @param t     Number from 0 to 1
 * @param from  Lowest possible value
 * @param to    Highest possible value
 * @return Adjusted value
 */
export declare function stretch(t: number, from: number, to: number): number;
/**
 * Adjust numeric value so it fits to specific value range.
 *
 * @param value     Value
 * @param minValue  Lowest possible value
 * @param maxValue  Highest possible value
 * @return Adjusted value
 */
export declare function fitToRange(value: number, minValue: $type.Optional<number>, maxValue: $type.Optional<number>): number;
/**
 * Returns sine of a number.
 *
 * @param value  Value
 * @return Sine
 */
export declare function sin(value: number): number;
/**
 * Returns tan of a number.
 *
 * @param value  Value
 * @return Sine
 */
export declare function tan(value: number): number;
/**
 * Returns cosine of a number.
 *
 * @param value  Value
 * @return Cosine
 */
export declare function cos(value: number): number;
/**
 * Returns biggest value out of passed in numeric values.
 *
 * @param left   Numeric value
 * @param right  Numeric value
 * @return Biggest value
 */
export declare function max(left: number, right: number): number;
export declare function max(left: number, right: $type.Optional<number>): number;
export declare function max(left: $type.Optional<number>, right: number): number;
export declare function max(left: $type.Optional<number>, right: $type.Optional<number>): $type.Optional<number>;
/**
 * Returns smallest value out of passed in numeric values.
 *
 * @param left   Numeric value
 * @param right  Numeric value
 * @return Smallest value
 */
export declare function min(left: number, right: number): number;
export declare function min(left: number, right: $type.Optional<number>): number;
export declare function min(left: $type.Optional<number>, right: number): number;
export declare function min(left: $type.Optional<number>, right: $type.Optional<number>): $type.Optional<number>;
/**
 * Returns the closest value from the array of values to the reference value.
 *
 * @param values  Array of values
 * @param value   Reference value
 * @return Closes value from the array
 */
export declare function closest(values: number[], referenceValue: number): number;
/**
 * Checks whether two ranges of values intersect.
 *
 * @param range1  Range 1
 * @param range2  Range 2
 * @return Any intersecting numbers?
 */
export declare function intersect(range1: IRange, range2: IRange): boolean;
/**
 * Inverts the range of values.
 *
 * @param range  Range
 */
export declare function invertRange(range: IRange): {
    start: number;
    end: number;
};
/**
 * Returns an intersection range between two ranges of values.
 *
 * @param range1  Range 1
 * @param range2  Range 2
 * @return Intersecting value range
 */
export declare function intersection(range1: IRange, range2: IRange): $type.Optional<IRange>;
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
export declare function getDistance(point1: IPoint, point2?: IPoint): number;
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
export declare function getHorizontalDistance(point1: IPoint, point2?: IPoint): number;
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
export declare function getVerticalDistance(point1: IPoint, point2?: IPoint): number;
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
export declare function getCubicCurveDistance(point1: IPoint, point2: IPoint, controlPointA: IPoint, controlPointB: IPoint, stepCount: number): number;
/**
 * Returns scale based on original and end position of the two points.
 *
 * @param point1       Current position of point 1
 * @param startPoint1  Start position of point 1
 * @param point2       Current position of point 1
 * @param startPoint2  Start position of point 2
 * @return Scale        Calculated scale
 */
export declare function getScale(point1: IPoint, startPoint1: IPoint, point2: IPoint, startPoint2: IPoint): number;
/**
 * Returns an exact mid point between two points.
 *
 * @param point1     Position of point 1
 * @param point2     Position of point 2
 * @return Mid point  Position of mid-point
 */
export declare function getMidPoint(point1: IPoint, point2: IPoint, position?: number): IPoint;
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
export declare function getRotation(point1: IPoint, startPoint1: IPoint, point2: IPoint, startPoint2: IPoint): number;
/**
 * Calculates angle of the vector based on two or one point.
 *
 * @param point1  Point 1
 * @param point2  Point 2
 * @return Angle in degrees
 */
export declare function getAngle(point1: IPoint, point2?: IPoint): number;
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
export declare function getCenterShift(center: IPoint, point1: IPoint, startPoint1: IPoint, point2: IPoint, startPoint2: IPoint): IPoint;
/**
 * Converts an array of points into a bounding box rectangle.
 *
 * Array can contain any number of points.
 *
 * @param points  Points
 * @return Bounding box rectangle
 */
export declare function getBBox(points: IPoint[]): $type.Optional<IRectangle>;
/**
 * Returns a [[IRectangle]] object representing a common rectangle that fits
 * all passed in rectangles in it.
 *
 * @param rectangles  An array of rectangles
 * @return Common rectangle
 */
export declare function getCommonRectangle(rectangles: IRectangle[]): $type.Optional<IRectangle>;
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
export declare function getPointOnQuadraticCurve(pointA: IPoint, pointB: IPoint, controlPoint: IPoint, position: number): IPoint;
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
export declare function getPointOnCubicCurve(pointA: IPoint, pointB: IPoint, controlPointA: IPoint, controlPointB: IPoint, position: number): IPoint;
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
export declare function getCubicControlPointA(p0: IPoint, p1: IPoint, p2: IPoint, p3: IPoint, tensionX: number, tensionY: number): IPoint;
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
export declare function getCubicControlPointB(p0: IPoint, p1: IPoint, p2: IPoint, p3: IPoint, tensionX: number, tensionY: number): IPoint;
/**
 * [adjustTension description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param tension  [description]
 * @return [description]
 */
export declare function adjustTension(tension: number): number;
/**
 * [normalizeAngle description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param value  [description]
 * @return [description]
 */
export declare function normalizeAngle(value: number): number;
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
export declare function fitAngleToRange(value: number, startAngle: number, endAngle: number): number;
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
export declare function getArcRect(startAngle: number, endAngle: number, radius?: number): IRectangle;
/**
 * Returns point on arc
 *
 * @param center point
 * @param radius
 * @param arc
 * @return {boolean}
 */
export declare function getArcPoint(radius: number, arc: number): {
    x: number;
    y: number;
};
/**
 * Returns true if a point is within rectangle
 *
 * @param point
 * @param rectangle
 * @return {boolean}
 */
export declare function isInRectangle(point: IPoint, rectangle: IRectangle): boolean;
export declare function getLineIntersection(pointA1: IPoint, pointA2: IPoint, pointB1: IPoint, pointB2: IPoint): {
    x: number;
    y: number;
};
