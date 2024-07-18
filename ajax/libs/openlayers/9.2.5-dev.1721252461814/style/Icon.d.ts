export default Icon;
/**
 * Anchor unit can be either a fraction of the icon size or in pixels.
 */
export type IconAnchorUnits = "fraction" | "pixels";
/**
 * Icon origin. One of 'bottom-left', 'bottom-right', 'top-left', 'top-right'.
 */
export type IconOrigin = "bottom-left" | "bottom-right" | "top-left" | "top-right";
export type Options = {
    /**
     * Anchor. Default value is the icon center.
     */
    anchor?: number[] | undefined;
    /**
     * Origin of the anchor: `bottom-left`, `bottom-right`,
     * `top-left` or `top-right`.
     */
    anchorOrigin?: IconOrigin | undefined;
    /**
     * Units in which the anchor x value is
     * specified. A value of `'fraction'` indicates the x value is a fraction of the icon. A value of `'pixels'` indicates
     * the x value in pixels.
     */
    anchorXUnits?: IconAnchorUnits | undefined;
    /**
     * Units in which the anchor y value is
     * specified. A value of `'fraction'` indicates the y value is a fraction of the icon. A value of `'pixels'` indicates
     * the y value in pixels.
     */
    anchorYUnits?: IconAnchorUnits | undefined;
    /**
     * Color to tint the icon. If not specified,
     * the icon will be left as is.
     */
    color?: string | import("../color.js").Color | undefined;
    /**
     * The `crossOrigin` attribute for loaded images. Note that you must provide a
     * `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    crossOrigin?: string | null | undefined;
    /**
     * Image object for the icon.
     */
    img?: HTMLCanvasElement | HTMLImageElement | ImageBitmap | undefined;
    /**
     * Displacement of the icon in pixels.
     * Positive values will shift the icon right and up.
     */
    displacement?: number[] | undefined;
    /**
     * Opacity of the icon.
     */
    opacity?: number | undefined;
    /**
     * The width of the icon in pixels. This can't be used together with `scale`.
     */
    width?: number | undefined;
    /**
     * The height of the icon in pixels. This can't be used together with `scale`.
     */
    height?: number | undefined;
    /**
     * Scale.
     */
    scale?: number | import("../size.js").Size | undefined;
    /**
     * Whether to rotate the icon with the view.
     */
    rotateWithView?: boolean | undefined;
    /**
     * Rotation in radians (positive rotation clockwise).
     */
    rotation?: number | undefined;
    /**
     * Offset which, together with `size` and `offsetOrigin`, defines the
     * sub-rectangle to use from the original (sprite) image.
     */
    offset?: number[] | undefined;
    /**
     * Origin of the offset: `bottom-left`, `bottom-right`,
     * `top-left` or `top-right`.
     */
    offsetOrigin?: IconOrigin | undefined;
    /**
     * Icon size in pixels. Used together with `offset` to define the
     * sub-rectangle to use from the original (sprite) image.
     */
    size?: import("../size.js").Size | undefined;
    /**
     * Image source URI.
     */
    src?: string | undefined;
    /**
     * Declutter mode.
     */
    declutterMode?: import("./Style.js").DeclutterMode | undefined;
};
/**
 * @classdesc
 * Set icon style for vector features.
 * @api
 */
declare class Icon extends ImageStyle {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
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
     * @type {IconOrigin}
     */
    private anchorOrigin_;
    /**
     * @private
     * @type {IconAnchorUnits}
     */
    private anchorXUnits_;
    /**
     * @private
     * @type {IconAnchorUnits}
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
     * @type {IconOrigin}
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
    initialOptions_: Options | undefined;
    /**
     * Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
     * @return {Icon} The cloned style.
     * @api
     * @override
     */
    override clone(): Icon;
    /**
     * Set the anchor point. The anchor determines the center point for the
     * symbolizer.
     *
     * @param {Array<number>} anchor Anchor.
     * @api
     */
    setAnchor(anchor: Array<number>): void;
    /**
     * Get the icon color.
     * @return {import("../color.js").Color} Color.
     * @api
     */
    getColor(): import("../color.js").Color;
    /**
     * Get the image icon.
     * @param {number} pixelRatio Pixel ratio.
     * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image or Canvas element. If the Icon
     * style was configured with `src` or with a not let loaded `img`, an `ImageBitmap` will be returned.
     * @api
     * @override
     */
    override getImage(pixelRatio: number): HTMLImageElement | HTMLCanvasElement | ImageBitmap;
    /**
     * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image element.
     * @override
     */
    override getHitDetectionImage(): HTMLImageElement | HTMLCanvasElement | ImageBitmap;
    /**
     * Get the image URL.
     * @return {string|undefined} Image src.
     * @api
     */
    getSrc(): string | undefined;
    /**
     * Get the width of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
     * @return {number} Icon width (in pixels).
     * @api
     */
    getWidth(): number;
    /**
     * Get the height of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
     * @return {number} Icon height (in pixels).
     * @api
     */
    getHeight(): number;
}
import ImageStyle from './Image.js';
//# sourceMappingURL=Icon.d.ts.map