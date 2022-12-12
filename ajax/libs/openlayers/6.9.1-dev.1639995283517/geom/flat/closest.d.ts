/**
 * Return the squared of the largest distance between any pair of consecutive
 * coordinates.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} max Max squared delta.
 * @return {number} Max squared delta.
 */
export function maxSquaredDelta(flatCoordinates: number[], offset: number, end: number, stride: number, max: number): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} max Max squared delta.
 * @return {number} Max squared delta.
 */
export function arrayMaxSquaredDelta(flatCoordinates: number[], offset: number, ends: number[], stride: number, max: number): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} max Max squared delta.
 * @return {number} Max squared delta.
 */
export function multiArrayMaxSquaredDelta(flatCoordinates: number[], offset: number, endss: number[][], stride: number, max: number): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} maxDelta Max delta.
 * @param {boolean} isRing Is ring.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @param {Array<number>} [opt_tmpPoint] Temporary point object.
 * @return {number} Minimum squared distance.
 */
export function assignClosestPoint(flatCoordinates: number[], offset: number, end: number, stride: number, maxDelta: number, isRing: boolean, x: number, y: number, closestPoint: number[], minSquaredDistance: number, opt_tmpPoint?: number[] | undefined): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} maxDelta Max delta.
 * @param {boolean} isRing Is ring.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @param {Array<number>} [opt_tmpPoint] Temporary point object.
 * @return {number} Minimum squared distance.
 */
export function assignClosestArrayPoint(flatCoordinates: number[], offset: number, ends: number[], stride: number, maxDelta: number, isRing: boolean, x: number, y: number, closestPoint: number[], minSquaredDistance: number, opt_tmpPoint?: number[] | undefined): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} maxDelta Max delta.
 * @param {boolean} isRing Is ring.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @param {Array<number>} [opt_tmpPoint] Temporary point object.
 * @return {number} Minimum squared distance.
 */
export function assignClosestMultiArrayPoint(flatCoordinates: number[], offset: number, endss: number[][], stride: number, maxDelta: number, isRing: boolean, x: number, y: number, closestPoint: number[], minSquaredDistance: number, opt_tmpPoint?: number[] | undefined): number;
//# sourceMappingURL=closest.d.ts.map