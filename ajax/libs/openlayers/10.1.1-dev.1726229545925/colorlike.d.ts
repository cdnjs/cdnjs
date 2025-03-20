/**
 * @typedef {Object} PatternDescriptor
 * @property {string} src Pattern image URL
 * @property {import("./color.js").Color|string} [color] Color to tint the pattern with.
 * @property {import("./size.js").Size} [size] Size of the desired slice from the pattern image.
 * Use this together with `offset` when the pattern image is a sprite sheet.
 * @property {import("./size.js").Size} [offset] Offset of the desired slice from the pattern image.
 * Use this together with `size` when the pattern image is a sprite sheet.
 */
/**
 * A type accepted by CanvasRenderingContext2D.fillStyle
 * or CanvasRenderingContext2D.strokeStyle.
 * Represents a color, [CanvasPattern](https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern),
 * or [CanvasGradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient). The origin for
 * patterns and gradients as fill style is an increment of 512 css pixels from map coordinate
 * `[0, 0]`. For seamless repeat patterns, width and height of the pattern image
 * must be a factor of two (2, 4, 8, ..., 512).
 *
 * @typedef {string|CanvasPattern|CanvasGradient} ColorLike
 * @api
 */
/**
 * @param {import("./color.js").Color|ColorLike|PatternDescriptor|null} color Color.
 * @return {ColorLike|null} The color as an {@link ol/colorlike~ColorLike}.
 * @api
 */
export function asColorLike(color: import("./color.js").Color | ColorLike | PatternDescriptor | null): ColorLike | null;
export type PatternDescriptor = {
    /**
     * Pattern image URL
     */
    src: string;
    /**
     * Color to tint the pattern with.
     */
    color?: string | import("./color.js").Color | undefined;
    /**
     * Size of the desired slice from the pattern image.
     * Use this together with `offset` when the pattern image is a sprite sheet.
     */
    size?: import("./size.js").Size | undefined;
    /**
     * Offset of the desired slice from the pattern image.
     * Use this together with `size` when the pattern image is a sprite sheet.
     */
    offset?: import("./size.js").Size | undefined;
};
/**
 * A type accepted by CanvasRenderingContext2D.fillStyle
 * or CanvasRenderingContext2D.strokeStyle.
 * Represents a color, [CanvasPattern](https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern),
 * or [CanvasGradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient). The origin for
 * patterns and gradients as fill style is an increment of 512 css pixels from map coordinate
 * `[0, 0]`. For seamless repeat patterns, width and height of the pattern image
 * must be a factor of two (2, 4, 8, ..., 512).
 */
export type ColorLike = string | CanvasPattern | CanvasGradient;
//# sourceMappingURL=colorlike.d.ts.map