export default Fill;
export type Options = {
    /**
     * A color,
     * gradient or pattern.
     * See {@link module :ol/color~Color} and {@link module :ol/colorlike~ColorLike} for possible formats. For polygon fills (not for {@link import ("./RegularShape.js").default} fills),
     * a pattern can also be provided as {@link module :ol/colorlike~PatternDescriptor}.
     * Default null; if null, the Canvas/renderer default black will be used.
     */
    color?: import("../color.js").Color | import("../colorlike.js").ColorLike | import("../colorlike.js").PatternDescriptor | null | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} [color=null] A color,
 * gradient or pattern.
 * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats. For polygon fills (not for {@link import("./RegularShape.js").default} fills),
 * a pattern can also be provided as {@link module:ol/colorlike~PatternDescriptor}.
 * Default null; if null, the Canvas/renderer default black will be used.
 */
/**
 * @classdesc
 * Set fill style for vector features.
 * @api
 */
declare class Fill {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
    /**
     * @private
     * @type {import("./IconImage.js").default|null}
     */
    private patternImage_;
    /**
     * @private
     * @type {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null}
     */
    private color_;
    /**
     * Clones the style. The color is not cloned if it is a {@link module:ol/colorlike~ColorLike}.
     * @return {Fill} The cloned style.
     * @api
     */
    clone(): Fill;
    /**
     * Get the fill color.
     * @return {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} Color.
     * @api
     */
    getColor(): import("../color.js").Color | import("../colorlike.js").ColorLike | import("../colorlike.js").PatternDescriptor | null;
    /**
     * Set the color.
     *
     * @param {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} color Color.
     * @api
     */
    setColor(color: import("../color.js").Color | import("../colorlike.js").ColorLike | import("../colorlike.js").PatternDescriptor | null): void;
    /**
     * @return {boolean} The fill style is loading an image pattern.
     */
    loading(): boolean;
    /**
     * @return {Promise<void>} `false` or a promise that resolves when the style is ready to use.
     */
    ready(): Promise<void>;
}
//# sourceMappingURL=Fill.d.ts.map