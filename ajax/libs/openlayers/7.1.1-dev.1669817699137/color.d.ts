/**
 * Return the color as an rgba string.
 * @param {Color|string} color Color.
 * @return {string} Rgba string.
 * @api
 */
export function asString(color: Color | string): string;
/**
 * Return the color as an array. This function maintains a cache of calculated
 * arrays which means the result should not be modified.
 * @param {Color|string} color Color.
 * @return {Color} Color.
 * @api
 */
export function asArray(color: Color | string): Color;
/**
 * TODO this function is only used in the test, we probably shouldn't export it
 * @param {Color} color Color.
 * @return {Color} Clamped color.
 */
export function normalize(color: Color): Color;
/**
 * @param {Color} color Color.
 * @return {string} String.
 */
export function toString(color: Color): string;
/**
 * @param {string} s String.
 * @return {boolean} Whether the string is actually a valid color
 */
export function isStringColor(s: string): boolean;
/**
 * @param {string} s String.
 * @return {Color} Color.
 */
export function fromString(s: string): Color;
/**
 * A color represented as a short array [red, green, blue, alpha].
 * red, green, and blue should be integers in the range 0..255 inclusive.
 * alpha should be a float in the range 0..1 inclusive. If no alpha value is
 * given then `1` will be used.
 */
export type Color = Array<number>;
//# sourceMappingURL=color.d.ts.map