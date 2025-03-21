/**
 * Transformation from EPSG:4326 to EPSG:3857.
 *
 * @param {Array<number>} input Input array of coordinate values.
 * @param {Array<number>} [output] Output array of coordinate values.
 * @param {number} [dimension] Dimension (default is `2`).
 * @param {number} [stride] Stride (default is `dimension`).
 * @return {Array<number>} Output array of coordinate values.
 */
export function fromEPSG4326(input: Array<number>, output?: number[] | undefined, dimension?: number | undefined, stride?: number | undefined): Array<number>;
/**
 * Transformation from EPSG:3857 to EPSG:4326.
 *
 * @param {Array<number>} input Input array of coordinate values.
 * @param {Array<number>} [output] Output array of coordinate values.
 * @param {number} [dimension] Dimension (default is `2`).
 * @param {number} [stride] Stride (default is `dimension`).
 * @return {Array<number>} Output array of coordinate values.
 */
export function toEPSG4326(input: Array<number>, output?: number[] | undefined, dimension?: number | undefined, stride?: number | undefined): Array<number>;
/**
 * Radius of WGS84 sphere
 *
 * @const
 * @type {number}
 */
export const RADIUS: number;
/**
 * @const
 * @type {number}
 */
export const HALF_SIZE: number;
/**
 * @const
 * @type {import("../extent.js").Extent}
 */
export const EXTENT: import("../extent.js").Extent;
/**
 * @const
 * @type {import("../extent.js").Extent}
 */
export const WORLD_EXTENT: import("../extent.js").Extent;
/**
 * Maximum safe value in y direction
 * @const
 * @type {number}
 */
export const MAX_SAFE_Y: number;
/**
 * Projections equal to EPSG:3857.
 *
 * @const
 * @type {Array<import("./Projection.js").default>}
 */
export const PROJECTIONS: Array<import("./Projection.js").default>;
//# sourceMappingURL=epsg3857.d.ts.map