/**
 * A collection of GeoJSON format-related utility functions.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IGeoPoint } from "../../core/defs/IGeoPoint";
import { IPoint } from "../../core/defs/IPoint";
/**
 * Normalizes a geo-point.
 *
 * @ignore Exclude from docs
 * @param geoPoint  Source geo-point
 * @return Normalized geo-point
 */
export declare function normalizePoint(geoPoint: IGeoPoint): IGeoPoint;
/**
 * Normalizes all points of a geo-line.
 *
 * @ignore Exclude from docs
 * @param multiline  Source geo-line
 * @return Normalized geo-line
 */
export declare function normalizeMultiline(multiline: Array<Array<IGeoPoint>>): Array<Array<IGeoPoint>>;
/**
 * [wrapAngleTo180 description]
 *
 * @todo Description
 * @ignore Exclude from docs
 * @param angle  Angle
 * @return Angle
 */
export declare function wrapAngleTo180(angle: number): number;
/**
 * Converts a geo point to a regular point object.
 *
 * @ignore Exclude from docs
 * @param geoPoint  Source geo point
 * @return Point
 */
export declare function geoToPoint(geoPoint: IGeoPoint): IPoint;
