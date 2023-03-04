/**
 * Generate a great-circle arcs between two lat/lon points.
 * @param {number} lon1 Longitude 1 in degrees.
 * @param {number} lat1 Latitude 1 in degrees.
 * @param {number} lon2 Longitude 2 in degrees.
 * @param {number} lat2 Latitude 2 in degrees.
 * @param {import("../../proj/Projection.js").default} projection Projection.
 * @param {number} squaredTolerance Squared tolerance.
 * @return {Array<number>} Flat coordinates.
 */
export function greatCircleArc(lon1: number, lat1: number, lon2: number, lat2: number, projection: import("../../proj/Projection.js").default, squaredTolerance: number): Array<number>;
/**
 * Generate a meridian (line at constant longitude).
 * @param {number} lon Longitude.
 * @param {number} lat1 Latitude 1.
 * @param {number} lat2 Latitude 2.
 * @param {import("../../proj/Projection.js").default} projection Projection.
 * @param {number} squaredTolerance Squared tolerance.
 * @return {Array<number>} Flat coordinates.
 */
export function meridian(lon: number, lat1: number, lat2: number, projection: import("../../proj/Projection.js").default, squaredTolerance: number): Array<number>;
/**
 * Generate a parallel (line at constant latitude).
 * @param {number} lat Latitude.
 * @param {number} lon1 Longitude 1.
 * @param {number} lon2 Longitude 2.
 * @param {import("../../proj/Projection.js").default} projection Projection.
 * @param {number} squaredTolerance Squared tolerance.
 * @return {Array<number>} Flat coordinates.
 */
export function parallel(lat: number, lon1: number, lon2: number, projection: import("../../proj/Projection.js").default, squaredTolerance: number): Array<number>;
//# sourceMappingURL=geodesic.d.ts.map