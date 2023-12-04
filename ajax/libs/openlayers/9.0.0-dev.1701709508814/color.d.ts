/**
 * A color represented as a short array [red, green, blue, alpha].
 * red, green, and blue should be integers in the range 0..255 inclusive.
 * alpha should be a float in the range 0..1 inclusive. If no alpha value is
 * given then `1` will be used.
 * @typedef {Array<number>} Color
 * @api
 */
/**
 * Return the color as an rgba string.
 * @param {Color|string} color Color.
 * @return {string} Rgba string.
 * @api
 */
export function asString(color: Color | string): string;
/**
 * @param {Color} color A color that may or may not have an alpha channel.
 * @return {Color} The input color with an alpha channel.  If the input color has
 * an alpha channel, the input color will be returned unchanged.  Otherwise, a new
 * array will be returned with the input color and an alpha channel of 1.
 */
export function withAlpha(color: Color): Color;
/**
 * @param {Color} color RGBA color.
 * @return {Color} LCHuv color with alpha.
 */
export function rgbaToLcha(color: Color): Color;
/**
 * @param {Color} color LCHuv color with alpha.
 * @return {Color} RGBA color.
 */
export function lchaToRgba(color: Color): Color;
/**
 * @param {string} s String.
 * @return {Color} Color.
 */
export function fromString(s: string): Color;
/**
 * Return the color as an array. This function maintains a cache of calculated
 * arrays which means the result should not be modified.
 * @param {Color|string} color Color.
 * @return {Color} Color.
 * @api
 */
export function asArray(color: Color | string): Color;
/**
 * Exported for the tests.
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
 * A color represented as a short array [red, green, blue, alpha].
 * red, green, and blue should be integers in the range 0..255 inclusive.
 * alpha should be a float in the range 0..1 inclusive. If no alpha value is
 * given then `1` will be used.
 */
export type Color = Array<number>;
//# sourceMappingURL=color.d.ts.map