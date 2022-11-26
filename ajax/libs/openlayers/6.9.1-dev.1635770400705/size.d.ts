/**
 * @module ol/size
 */
/**
 * An array of numbers representing a size: `[width, height]`.
 * @typedef {Array<number>} Size
 * @api
 */
/**
 * Returns a buffered size.
 * @param {Size} size Size.
 * @param {number} num The amount by which to buffer.
 * @param {Size} [opt_size] Optional reusable size array.
 * @return {Size} The buffered size.
 */
export function buffer(size: number[], num: number, opt_size?: number[] | undefined): number[];
/**
 * Determines if a size has a positive area.
 * @param {Size} size The size to test.
 * @return {boolean} The size has a positive area.
 */
export function hasArea(size: number[]): boolean;
/**
 * Returns a size scaled by a ratio. The result will be an array of integers.
 * @param {Size} size Size.
 * @param {number} ratio Ratio.
 * @param {Size} [opt_size] Optional reusable size array.
 * @return {Size} The scaled size.
 */
export function scale(size: number[], ratio: number, opt_size?: number[] | undefined): number[];
/**
 * Returns an `Size` array for the passed in number (meaning: square) or
 * `Size` array.
 * (meaning: non-square),
 * @param {number|Size} size Width and height.
 * @param {Size} [opt_size] Optional reusable size array.
 * @return {Size} Size.
 * @api
 */
export function toSize(size: number | number[], opt_size?: number[] | undefined): number[];
/**
 * An array of numbers representing a size: `[width, height]`.
 */
export type Size = number[];
//# sourceMappingURL=size.d.ts.map