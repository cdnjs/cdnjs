/**
 * Calculates a point that is likely to lie in the interior of the linear rings.
 * Inspired by JTS's com.vividsolutions.jts.geom.Geometry#getInteriorPoint.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {Array<number>} flatCenters Flat centers.
 * @param {number} flatCentersOffset Flat center offset.
 * @param {Array<number>} [dest] Destination.
 * @return {Array<number>} Destination point as XYM coordinate, where M is the
 * length of the horizontal intersection that the point belongs to.
 */
export function getInteriorPointOfArray(flatCoordinates: Array<number>, offset: number, ends: Array<number>, stride: number, flatCenters: Array<number>, flatCentersOffset: number, dest?: Array<number>): Array<number>;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {Array<number>} flatCenters Flat centers.
 * @return {Array<number>} Interior points as XYM coordinates, where M is the
 * length of the horizontal intersection that the point belongs to.
 */
export function getInteriorPointsOfMultiArray(flatCoordinates: Array<number>, offset: number, endss: Array<Array<number>>, stride: number, flatCenters: Array<number>): Array<number>;
//# sourceMappingURL=interiorpoint.d.ts.map