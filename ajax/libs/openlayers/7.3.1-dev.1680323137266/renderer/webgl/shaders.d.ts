/** @typedef {'color'|'opacity'|'width'} DefaultAttributes */
/**
 * Packs red/green/blue channels of a color into a single float value; alpha is ignored.
 * This is how the color is expected to be computed.
 * @param {import("../../color.js").Color|string} color Color as array of numbers or string
 * @return {number} Float value containing the color
 */
export function packColor(color: import("../../color.js").Color | string): number;
/**
 * Default polygon vertex shader.
 * Relies on the color and opacity attributes.
 * @type {string}
 */
export const FILL_VERTEX_SHADER: string;
/**
 * Default polygon fragment shader.
 * @type {string}
 */
export const FILL_FRAGMENT_SHADER: string;
/**
 * Default linestring vertex shader.
 * Relies on color, opacity and width attributes.
 * @type {string}
 */
export const STROKE_VERTEX_SHADER: string;
/**
 * Default linestring fragment shader.
 * @type {string}
 */
export const STROKE_FRAGMENT_SHADER: string;
/**
 * Default point vertex shader.
 * Relies on color and opacity attributes.
 * @type {string}
 */
export const POINT_VERTEX_SHADER: string;
/**
 * Default point fragment shader.
 * @type {string}
 */
export const POINT_FRAGMENT_SHADER: string;
export type DefaultAttributes = 'color' | 'opacity' | 'width';
//# sourceMappingURL=shaders.d.ts.map