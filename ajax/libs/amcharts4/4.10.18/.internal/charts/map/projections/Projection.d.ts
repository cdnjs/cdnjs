/**
 * This module contains funcitonality related to geographical projections
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IGeoPoint } from "../../../core/defs/IGeoPoint";
import { IPoint, IOrientationPoint } from "../../../core/defs/IPoint";
import * as d3geo from "d3-geo";
import { MapChart } from "../../types/MapChart";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This is a base class for a geographical projection.
 */
export declare class Projection {
    /**
     * @ignore
     */
    protected _d3Projection: d3geo.GeoProjection;
    /**
     * @ignore
     */
    protected _d3Path: d3geo.GeoPath;
    /**
     * @ignore
     */
    chart: MapChart;
    constructor();
    /**
     * d3 projection
     */
    /**
    * d3 projection
    */
    d3Projection: d3geo.GeoProjection;
    /**
     * d3 path generator method
     * @ignore
     */
    readonly d3Path: d3geo.GeoPath;
    /**
     * @ignore
     */
    readonly scale: number;
    /**
     * Converts a geographical point (lat/long) to a screen point (x/y)
     * @param geoPoint Geo point (lat/long)
     * @return Screen point (x/y)
     */
    convert(geoPoint: IGeoPoint): IPoint;
    /**
     * Converts a screen point (x/y) to a geographical point (lat/long)
     * @param point Screen point (x/y)
     * @return Geo point (lat/long)
     */
    invert(point: IPoint): IGeoPoint;
    /**
     * Returns X/Y coordinates.
     * Individual projections will override this method to apply their own
     * projection logic.
     * @deprecated
     * @param lambda [description]
     * @param phi    [description]
     * @return X/Y coordinates
     * @todo Needs description
     */
    project(lambda: number, phi: number): IPoint;
    /**
     * Returns geographical coordinates (lat/long).
     * Individual projections will override this method to apply their own
     * projection logic.
     * @deprecated
     * @param x X coordinate
     * @param y Y coordinate
     * @return Geographical point
     * @todo Needs description
     */
    unproject(x: number, y: number): IGeoPoint;
    /**
     * @ignore
     * @deprecated
     */
    rotate(geoPoint: IGeoPoint, deltaLongitude: number, deltaLatitude: number, deltaGamma?: number): IGeoPoint;
    /**
     * @ignore
     * @deprecated
     */
    unrotate(geoPoint: IGeoPoint, deltaLongitude: number, deltaLatitude: number, deltaGamma?: number): IGeoPoint;
    intermediatePoint(pointA: IGeoPoint, pointB: IGeoPoint, position: number): IGeoPoint;
    multiDistance(multiGeoLine: Array<Array<IGeoPoint>>): number;
    distance(pointA: IGeoPoint, pointB: IGeoPoint): number;
    /**
     * Converts relative position along the line (0-1) into pixel coordinates.
     *
     * @param position  Position (0-1)
     * @return Coordinates
     */
    positionToPoint(multiGeoLine: Array<Array<IGeoPoint>>, position: number): IOrientationPoint;
    /**
     * Converts relative position along the line (0-1) into pixel coordinates.
     *
     * @param position  Position (0-1)
     * @return Coordinates
     */
    positionToGeoPoint(multiGeoLine: Array<Array<IGeoPoint>>, position: number): IGeoPoint;
}
