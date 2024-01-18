/**
 * Is the linear ring oriented clockwise in a coordinate system with a bottom-left
 * coordinate origin? For a coordinate system with a top-left coordinate origin,
 * the ring's orientation is clockwise when this function returns false.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {boolean|undefined} Is clockwise.
 */
export function linearRingIsClockwise(flatCoordinates: Array<number>, offset: number, end: number, stride: number): boolean | undefined;
/**
 * Determines if linear rings are oriented.  By default, left-hand orientation
 * is tested (first ring must be clockwise, remaining rings counter-clockwise).
 * To test for right-hand orientation, use the `right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Array of end indexes.
 * @param {number} stride Stride.
 * @param {boolean} [right] Test for right-hand orientation
 *     (counter-clockwise exterior ring and clockwise interior rings).
 * @return {boolean} Rings are correctly oriented.
 */
export function linearRingsAreOriented(flatCoordinates: Array<number>, offset: number, ends: Array<number>, stride: number, right?: boolean | undefined): boolean;
/**
 * Determines if linear rings are oriented.  By default, left-hand orientation
 * is tested (first ring must be clockwise, remaining rings counter-clockwise).
 * To test for right-hand orientation, use the `right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Array of array of end indexes.
 * @param {number} stride Stride.
 * @param {boolean} [right] Test for right-hand orientation
 *     (counter-clockwise exterior ring and clockwise interior rings).
 * @return {boolean} Rings are correctly oriented.
 */
export function linearRingssAreOriented(flatCoordinates: Array<number>, offset: number, endss: Array<Array<number>>, stride: number, right?: boolean | undefined): boolean;
/**
 * Orient coordinates in a flat array of linear rings.  By default, rings
 * are oriented following the left-hand rule (clockwise for exterior and
 * counter-clockwise for interior rings).  To orient according to the
 * right-hand rule, use the `right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {boolean} [right] Follow the right-hand rule for orientation.
 * @return {number} End.
 */
export function orientLinearRings(flatCoordinates: Array<number>, offset: number, ends: Array<number>, stride: number, right?: boolean | undefined): number;
/**
 * Orient coordinates in a flat array of linear rings.  By default, rings
 * are oriented following the left-hand rule (clockwise for exterior and
 * counter-clockwise for interior rings).  To orient according to the
 * right-hand rule, use the `right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Array of array of end indexes.
 * @param {number} stride Stride.
 * @param {boolean} [right] Follow the right-hand rule for orientation.
 * @return {number} End.
 */
export function orientLinearRingsArray(flatCoordinates: Array<number>, offset: number, endss: Array<Array<number>>, stride: number, right?: boolean | undefined): number;
/**
 * Return a two-dimensional endss
 * @param {Array<number>} flatCoordinates Flat coordinates
 * @param {Array<number>} ends Linear ring end indexes
 * @return {Array<Array<number>>} Two dimensional endss array that can
 * be used to construct a MultiPolygon
 */
export function inflateEnds(flatCoordinates: Array<number>, ends: Array<number>): Array<Array<number>>;
//# sourceMappingURL=orient.d.ts.map