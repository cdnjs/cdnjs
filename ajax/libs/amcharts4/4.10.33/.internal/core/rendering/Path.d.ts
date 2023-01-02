/**
 * A collection of functions that deals with path calculations.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IPoint } from "../defs/IPoint";
import { IRectangle } from "../defs/IRectangle";
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
export declare function polyline(points: IPoint[]): string;
/**
 * Returns a starting point of an SVG path.
 *
 * @ignore Exclude from docs
 * @param point  Starting point
 * @return SVG path
 */
export declare function moveTo(point: IPoint): string;
/**
 * Returns a line part of SVG path.
 *
 * @ignore Exclude from docs
 * @param point  SVG path
 * @return SVG path
 */
export declare function lineTo(point: IPoint): string;
/**
 * Returns a quadratic curve part of an SVG path.
 *
 * @ignore Exclude from docs
 * @param point         End point of the curve
 * @param controlPoint  Control point
 * @return SVG path
 */
export declare function quadraticCurveTo(point: IPoint, controlPoint: IPoint): string;
/**
 * Returns a cubic curve part of an SVG path.
 *
 * @ignore Exclude from docs
 * @param point          End point of the curve
 * @param controlPointA  Control point A
 * @param controlPointB  Control point B
 * @return SVG path
 */
export declare function cubicCurveTo(point: IPoint, controlPointA: IPoint, controlPointB: IPoint): string;
/**
 * Returns a terminator for an SVG path.
 *
 * @ignore Exclude from docs
 * @return SVG path
 */
export declare function closePath(): string;
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
export declare function arcTo(startAngle: number, arc: number, radius: number, radiusY?: number): string;
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
export declare function arc(startAngle: number, arc: number, radius: number, innerRadius?: number, radiusY?: number, cornerRadius?: number, innerCornerRadius?: number): string;
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
export declare function arcToPoint(point: IPoint, radius: number, radiusY?: number, sweepFlag?: boolean, largeArcFlag?: boolean, xAxisRotation?: number): string;
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
export declare function rectangle(width: number, height: number, x?: number, y?: number): string;
/**
 * Converts a rectangle to an SVG path.
 *
 * @ignore Exclude from docs
 * @param rect  Rectangle
 * @param ccw   Counter-clockwise?
 * @return SVG path
 */
export declare function rectToPath(rect: IRectangle, ccw?: boolean): string;
/**
 * Converts SVG path to array of points.
 *
 * Note, this is experimental feature based on method which is deprecated
 * on some browsers and some browsers do not support it at all.
 *
 * You can save the output of this function, but not rely on it completely.
 */
export declare function pathToPoints(path: string, pointCount: number): IPoint[];
export declare function spiralPoints(cx: number, cy: number, radius: number, radiusY: number, innerRadius: number, step: number, radiusStep: number, startAngle?: number, endAngle?: number): IPoint[];
export declare function pointsToPath(points: IPoint[]): string;
