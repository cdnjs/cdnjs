export default Stroke;
export type Options = {
    /**
     * A color, gradient or pattern.
     * See {@link module :ol/color~Color} and {@link module :ol/colorlike~ColorLike} for possible formats.
     * Default null; if null, the Canvas/renderer default black will be used.
     */
    color?: import("../color.js").Color | import("../colorlike.js").ColorLike | undefined;
    /**
     * Line cap style: `butt`, `round`, or `square`.
     */
    lineCap?: CanvasLineCap | undefined;
    /**
     * Line join style: `bevel`, `round`, or `miter`.
     */
    lineJoin?: CanvasLineJoin | undefined;
    /**
     * Line dash pattern. Default is `null` (no dash).
     * Please note that Internet Explorer 10 and lower do not support the `setLineDash` method on
     * the `CanvasRenderingContext2D` and therefore this option will have no visual effect in these browsers.
     */
    lineDash?: number[] | undefined;
    /**
     * Line dash offset.
     */
    lineDashOffset?: number | undefined;
    /**
     * Miter limit.
     */
    miterLimit?: number | undefined;
    /**
     * Width.
     */
    width?: number | undefined;
};
/**
 * @module ol/style/Stroke
 */
/**
 * @typedef {Object} Options
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [color] A color, gradient or pattern.
 * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
 * Default null; if null, the Canvas/renderer default black will be used.
 * @property {CanvasLineCap} [lineCap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {CanvasLineJoin} [lineJoin='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {Array<number>} [lineDash] Line dash pattern. Default is `null` (no dash).
 * Please note that Internet Explorer 10 and lower do not support the `setLineDash` method on
 * the `CanvasRenderingContext2D` and therefore this option will have no visual effect in these browsers.
 * @property {number} [lineDashOffset=0] Line dash offset.
 * @property {number} [miterLimit=10] Miter limit.
 * @property {number} [width] Width.
 */
/**
 * @classdesc
 * Set stroke style for vector features.
 * Note that the defaults given are the Canvas defaults, which will be used if
 * option is not defined. The `get` functions return whatever was entered in
 * the options; they will not return the default.
 * @api
 */
declare class Stroke {
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
     * @private
     * @type {CanvasLineCap|undefined}
     */
    private lineCap_;
    /**
     * @private
     * @type {Array<number>}
     */
    private lineDash_;
    /**
     * @private
     * @type {number|undefined}
     */
    private lineDashOffset_;
    /**
     * @private
     * @type {CanvasLineJoin|undefined}
     */
    private lineJoin_;
    /**
     * @private
     * @type {number|undefined}
     */
    private miterLimit_;
    /**
     * @private
     * @type {number|undefined}
     */
    private width_;
    /**
     * Clones the style.
     * @return {Stroke} The cloned style.
     * @api
     */
    clone(): Stroke;
    /**
     * Get the stroke color.
     * @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
     * @api
     */
    getColor(): import("../color.js").Color | import("../colorlike.js").ColorLike;
    /**
     * Get the line cap type for the stroke.
     * @return {CanvasLineCap|undefined} Line cap.
     * @api
     */
    getLineCap(): CanvasLineCap | undefined;
    /**
     * Get the line dash style for the stroke.
     * @return {Array<number>} Line dash.
     * @api
     */
    getLineDash(): Array<number>;
    /**
     * Get the line dash offset for the stroke.
     * @return {number|undefined} Line dash offset.
     * @api
     */
    getLineDashOffset(): number | undefined;
    /**
     * Get the line join type for the stroke.
     * @return {CanvasLineJoin|undefined} Line join.
     * @api
     */
    getLineJoin(): CanvasLineJoin | undefined;
    /**
     * Get the miter limit for the stroke.
     * @return {number|undefined} Miter limit.
     * @api
     */
    getMiterLimit(): number | undefined;
    /**
     * Get the stroke width.
     * @return {number|undefined} Width.
     * @api
     */
    getWidth(): number | undefined;
    /**
     * Set the color.
     *
     * @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
     * @api
     */
    setColor(color: import("../color.js").Color | import("../colorlike.js").ColorLike): void;
    /**
     * Set the line cap.
     *
     * @param {CanvasLineCap|undefined} lineCap Line cap.
     * @api
     */
    setLineCap(lineCap: CanvasLineCap | undefined): void;
    /**
     * Set the line dash.
     *
     * Please note that Internet Explorer 10 and lower [do not support][mdn] the
     * `setLineDash` method on the `CanvasRenderingContext2D` and therefore this
     * property will have no visual effect in these browsers.
     *
     * [mdn]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility
     *
     * @param {Array<number>} lineDash Line dash.
     * @api
     */
    setLineDash(lineDash: Array<number>): void;
    /**
     * Set the line dash offset.
     *
     * @param {number|undefined} lineDashOffset Line dash offset.
     * @api
     */
    setLineDashOffset(lineDashOffset: number | undefined): void;
    /**
     * Set the line join.
     *
     * @param {CanvasLineJoin|undefined} lineJoin Line join.
     * @api
     */
    setLineJoin(lineJoin: CanvasLineJoin | undefined): void;
    /**
     * Set the miter limit.
     *
     * @param {number|undefined} miterLimit Miter limit.
     * @api
     */
    setMiterLimit(miterLimit: number | undefined): void;
    /**
     * Set the width.
     *
     * @param {number|undefined} width Width.
     * @api
     */
    setWidth(width: number | undefined): void;
}
//# sourceMappingURL=Stroke.d.ts.map