/**
 * Return the color as an rgba string.
 * @param {Color|string} color Color.
 * @return {string} Rgba string.
 * @api
 */
export function asString(color: string | number[]): string;
/**
 * Return the color as an array. This function maintains a cache of calculated
 * arrays which means the result should not be modified.
 * @param {Color|string} color Color.
 * @return {Color} Color.
 * @api
 */
export function asArray(color: string | number[]): number[];
/**
 * TODO this function is only used in the test, we probably shouldn't export it
 * @param {Color} color Color.
 * @return {Color} Clamped color.
 */
export function normalize(color: number[]): number[];
/**
 * @param {Color} color Color.
 * @return {string} String.
 */
export function toString(color: number[]): string;
/**
 * @param {string} s String.
 * @return {boolean} Whether the string is actually a valid color
 */
export function isStringColor(s: string): boolean;
/**
 * @param {string} s String.
 * @return {Color} Color.
 */
export function fromString(s: string): number[];
/**
 * A color represented as a short array [red, green, blue, alpha].
 * red, green, and blue should be integers in the range 0..255 inclusive.
 * alpha should be a float in the range 0..1 inclusive. If no alpha value is
 * given then `1` will be used.
 */
export type Color = number[];
//# sourceMappingURL=color.d.ts.map