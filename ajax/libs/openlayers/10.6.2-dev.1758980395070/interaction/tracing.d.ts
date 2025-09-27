/**
 * @param {LineCoordType} coordinates The ring coordinates.
 * @param {number} index The index.  May be wrapped.
 * @return {import("../coordinate.js").Coordinate} The coordinate.
 */
export function getCoordinate(coordinates: LineCoordType, index: number): import("../coordinate.js").Coordinate;
/**
 * @param {LineCoordType} coordinates The coordinates.
 * @param {number} index The index.  May be fractional and may wrap.
 * @return {import("../coordinate.js").Coordinate} The interpolated coordinate.
 */
export function interpolateCoordinate(coordinates: LineCoordType, index: number): import("../coordinate.js").Coordinate;
/**
 * @param {import("../coordinate.js").Coordinate} coordinate The coordinate.
 * @param {TraceState} traceState The trace state.
 * @param {import("../Map.js").default} map The map.
 * @param {number} snapTolerance The snap tolerance.
 * @return {TraceTargetUpdateInfo} Information about the new trace target.  The returned
 * object is reused between calls and must not be modified by the caller.
 */
export function getTraceTargetUpdate(coordinate: import("../coordinate.js").Coordinate, traceState: TraceState, map: import("../Map.js").default, snapTolerance: number): TraceTargetUpdateInfo;
/**
 * @param {import("../coordinate.js").Coordinate} coordinate The coordinate.
 * @param {Array<import("../Feature.js").default>} features The candidate features.
 * @return {Array<TraceTarget>} The trace targets.
 */
export function getTraceTargets(coordinate: import("../coordinate.js").Coordinate, features: Array<import("../Feature.js").default>): Array<TraceTarget>;
/**
 * @param {number} x The point x.
 * @param {number} y The point y.
 * @param {import("../coordinate.js").Coordinate} start The segment start.
 * @param {import("../coordinate.js").Coordinate} end The segment end.
 * @return {PointSegmentRelationship} The point segment relationship.  The returned object is
 * shared between calls and must not be modified by the caller.
 */
export function getPointSegmentRelationship(x: number, y: number, start: import("../coordinate.js").Coordinate, end: import("../coordinate.js").Coordinate): PointSegmentRelationship;
/**
 * Coordinate type when drawing lines.
 */
export type LineCoordType = Array<import("../coordinate.js").Coordinate>;
export type TraceTarget = {
    /**
     * Target coordinates.
     */
    coordinates: Array<import("../coordinate.js").Coordinate>;
    /**
     * The target coordinates are a linear ring.
     */
    ring: boolean;
    /**
     * The index of first traced coordinate.  A fractional index represents an
     * edge intersection.  Index values for rings will wrap (may be negative or larger than coordinates length).
     */
    startIndex: number;
    /**
     * The index of last traced coordinate.  Details from startIndex also apply here.
     */
    endIndex: number;
};
export type TraceState = {
    /**
     * Tracing active.
     */
    active: boolean;
    /**
     * The initially clicked coordinate.
     */
    startCoord?: import("../coordinate.js").Coordinate | undefined;
    /**
     * Targets available for tracing.
     */
    targets?: TraceTarget[] | undefined;
    /**
     * The index of the currently traced target.  A value of -1 indicates
     * that no trace target is active.
     */
    targetIndex?: number | undefined;
};
export type TraceTargetUpdateInfo = {
    /**
     * The new target index.
     */
    index: number;
    /**
     * The new segment end index.
     */
    endIndex: number;
    /**
     * The squared distance to the closest target.
     */
    closestTargetDistance: number;
};
export type PointSegmentRelationship = {
    /**
     * The closest point expressed as a fraction along the segment length.
     */
    along: number;
    /**
     * The squared distance of the point to the segment.
     */
    squaredDistance: number;
};
//# sourceMappingURL=tracing.d.ts.map