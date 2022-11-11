export default Icon;
export type Options = {
    /**
     * Anchor. Default value is the icon center.
     */
    anchor?: number[];
    /**
     * Origin of the anchor: `bottom-left`, `bottom-right`,
     * `top-left` or `top-right`.
     */
    anchorOrigin?: any;
    /**
     * Units in which the anchor x value is
     * specified. A value of `'fraction'` indicates the x value is a fraction of the icon. A value of `'pixels'` indicates
     * the x value in pixels.
     */
    anchorXUnits?: any;
    /**
     * Units in which the anchor y value is
     * specified. A value of `'fraction'` indicates the y value is a fraction of the icon. A value of `'pixels'` indicates
     * the y value in pixels.
     */
    anchorYUnits?: any;
    /**
     * Color to tint the icon. If not specified,
     * the icon will be left as is.
     */
    color?: string | number[];
    /**
     * The `crossOrigin` attribute for loaded images. Note that you must provide a
     * `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    crossOrigin?: string | null;
    /**
     * Image object for the icon. If the `src` option is not provided then the
     * provided image must already be loaded. And in that case, it is required
     * to provide the size of the image, with the `imgSize` option.
     */
    img?: HTMLCanvasElement | HTMLImageElement;
    /**
     * Offset, which, together with the size and the offset origin, define the
     * sub-rectangle to use from the original icon image.
     */
    offset?: number[];
    /**
     * Displacement the icon
     */
    displacement?: number[];
    /**
     * Origin of the offset: `bottom-left`, `bottom-right`,
     * `top-left` or `top-right`.
     */
    offsetOrigin?: any;
    /**
     * Opacity of the icon.
     */
    opacity?: number;
    /**
     * Scale.
     */
    scale?: number | number[];
    /**
     * Whether to rotate the icon with the view.
     */
    rotateWithView?: boolean;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    rotation?: number;
    /**
     * Icon size in pixel. Can be used together with `offset` to define the
     * sub-rectangle to use from the origin (sprite) icon image.
     */
    size?: number[];
    /**
     * Image size in pixels. Only required if `img` is set and `src` is not, and
     * for SVG images in Internet Explorer 11. The provided `imgSize` needs to match the actual size of the image.
     */
    imgSize?: number[];
    /**
     * Image source URI.
     */
    src?: string;
};
/**
 * @typedef {Object} Options
 * @property {Array<number>} [anchor=[0.5, 0.5]] Anchor. Default value is the icon center.
 * @property {import("./IconOrigin.js").default} [anchorOrigin='top-left'] Origin of the anchor: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {import("./IconAnchorUnits.js").default} [anchorXUnits='fraction'] Units in which the anchor x value is
 * specified. A value of `'fraction'` indicates the x value is a fraction of the icon. A value of `'pixels'` indicates
 * the x value in pixels.
 * @property {import("./IconAnchorUnits.js").default} [anchorYUnits='fraction'] Units in which the anchor y value is
 * specified. A value of `'fraction'` indicates the y value is a fraction of the icon. A value of `'pixels'` indicates
 * the y value in pixels.
 * @property {import("../color.js").Color|string} [color] Color to tint the icon. If not specified,
 * the icon will be left as is.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images. Note that you must provide a
 * `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {HTMLImageElement|HTMLCanvasElement} [img] Image object for the icon. If the `src` option is not provided then the
 * provided image must already be loaded. And in that case, it is required
 * to provide the size of the image, with the `imgSize` option.
 * @property {Array<number>} [offset=[0, 0]] Offset, which, together with the size and the offset origin, define the
 * sub-rectangle to use from the original icon image.
 * @property {Array<number>} [displacement=[0,0]] Displacement the icon
 * @property {import("./IconOrigin.js").default} [offsetOrigin='top-left'] Origin of the offset: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {number} [opacity=1] Opacity of the icon.
 * @property {number|import("../size.js").Size} [scale=1] Scale.
 * @property {boolean} [rotateWithView=false] Whether to rotate the icon with the view.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {import("../size.js").Size} [size] Icon size in pixel. Can be used together with `offset` to define the
 * sub-rectangle to use from the origin (sprite) icon image.
 * @property {import("../size.js").Size} [imgSize] Image size in pixels. Only required if `img` is set and `src` is not, and
 * for SVG images in Internet Explorer 11. The provided `imgSize` needs to match the actual size of the image.
 * @property {string} [src] Image source URI.
 */
/**
 * @classdesc
 * Set icon style for vector features.
 * @api
 */
declare class Icon extends ImageStyle {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @private
     * @type {Array<number>}
     */
    private anchor_;
    /**
     * @private
     * @type {Array<number>}
     */
    private normalizedAnchor_;
    /**
     * @private
     * @type {import("./IconOrigin.js").default}
     */
    private anchorOrigin_;
    /**
     * @private
     * @type {import("./IconAnchorUnits.js").default}
     */
    private anchorXUnits_;
    /**
     * @private
     * @type {import("./IconAnchorUnits.js").default}
     */
    private anchorYUnits_;
    /**
     * @private
     * @type {?string}
     */
    private crossOrigin_;
    /**
     * @private
     * @type {import("../color.js").Color}
     */
    private color_;
    /**
     * @private
     * @type {import("./IconImage.js").default}
     */
    private iconImage_;
    /**
     * @private
     * @type {Array<number>}
     */
    private offset_;
    /**
     * @private
     * @type {import("./IconOrigin.js").default}
     */
    private offsetOrigin_;
    /**
     * @private
     * @type {Array<number>}
     */
    private origin_;
    /**
     * @private
     * @type {import("../size.js").Size}
     */
    private size_;
    /**
     * Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
     * @return {Icon} The cloned style.
     * @api
     */
    clone(): Icon;
    /**
     * Set the anchor point. The anchor determines the center point for the
     * symbolizer.
     *
     * @param {Array<number>} anchor Anchor.
     * @api
     */
    setAnchor(anchor: number[]): void;
    /**
     * Get the icon color.
     * @return {import("../color.js").Color} Color.
     * @api
     */
    getColor(): number[];
    /**
     * Get the image icon.
     * @param {number} pixelRatio Pixel ratio.
     * @return {HTMLImageElement|HTMLCanvasElement} Image or Canvas element.
     * @api
     */
    getImage(pixelRatio: number): HTMLCanvasElement | HTMLImageElement;
    /**
     * @return {HTMLImageElement|HTMLCanvasElement} Image element.
     */
    getHitDetectionImage(): HTMLCanvasElement | HTMLImageElement;
    /**
     * Get the image URL.
     * @return {string|undefined} Image src.
     * @api
     */
    getSrc(): string | undefined;
}
import ImageStyle from "./Image.js";
//# sourceMappingURL=Icon.d.ts.map