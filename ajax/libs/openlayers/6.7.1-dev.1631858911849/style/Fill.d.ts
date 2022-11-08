export default Fill;
export type Options = {
    /**
     * A color, gradient or pattern.
     * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
     * Default null; if null, the Canvas/renderer default black will be used.
     */
    color?: string | number[] | CanvasGradient | CanvasPattern;
};
/**
 * @module ol/style/Fill
 */
/**
 * @typedef {Object} Options
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [color=null] A color, gradient or pattern.
 * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
 * Default null; if null, the Canvas/renderer default black will be used.
 */
/**
 * @classdesc
 * Set fill style for vector features.
 * @api
 */
declare class Fill {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @private
     * @type {import("../color.js").Color|import("../colorlike.js").ColorLike}
     */
    private color_;
    /**
     * Clones the style. The color is not cloned if it is an {@link module:ol/colorlike~ColorLike}.
     * @return {Fill} The cloned style.
     * @api
     */
    clone(): Fill;
    /**
     * Get the fill color.
     * @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
     * @api
     */
    getColor(): string | number[] | CanvasGradient | CanvasPattern;
    /**
     * Set the color.
     *
     * @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
     * @api
     */
    setColor(color: string | number[] | CanvasGradient | CanvasPattern): void;
}
//# sourceMappingURL=Fill.d.ts.map