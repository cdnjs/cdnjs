/**
 * Transformation from EPSG:4326 to EPSG:3857.
 *
 * @param {Array<number>} input Input array of coordinate values.
 * @param {Array<number>} [opt_output] Output array of coordinate values.
 * @param {number} [opt_dimension] Dimension (default is `2`).
 * @return {Array<number>} Output array of coordinate values.
 */
export function fromEPSG4326(input: number[], opt_output?: number[] | undefined, opt_dimension?: number | undefined): number[];
/**
 * Transformation from EPSG:3857 to EPSG:4326.
 *
 * @param {Array<number>} input Input array of coordinate values.
 * @param {Array<number>} [opt_output] Output array of coordinate values.
 * @param {number} [opt_dimension] Dimension (default is `2`).
 * @return {Array<number>} Output array of coordinate values.
 */
export function toEPSG4326(input: number[], opt_output?: number[] | undefined, opt_dimension?: number | undefined): number[];
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