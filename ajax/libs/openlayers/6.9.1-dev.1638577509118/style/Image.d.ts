export default ImageStyle;
export type Options = {
    /**
     * Opacity.
     */
    opacity: number;
    /**
     * If the image should get rotated with the view.
     */
    rotateWithView: boolean;
    /**
     * Rotation.
     */
    rotation: number;
    /**
     * Scale.
     */
    scale: number | number[];
    /**
     * Displacement.
     */
    displacement: number[];
};
/**
 * @typedef {Object} Options
 * @property {number} opacity Opacity.
 * @property {boolean} rotateWithView If the image should get rotated with the view.
 * @property {number} rotation Rotation.
 * @property {number|import("../size.js").Size} scale Scale.
 * @property {Array<number>} displacement Displacement.
 */
/**
 * @classdesc
 * A base class used for creating subclasses and not instantiated in
 * apps. Base class for {@link module:ol/style/Icon~Icon}, {@link module:ol/style/Circle~CircleStyle} and
 * {@link module:ol/style/RegularShape~RegularShape}.
 * @abstract
 * @api
 */
declare class ImageStyle {
    /**
     * @param {Options} options Options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {number}
     */
    private opacity_;
    /**
     * @private
     * @type {boolean}
     */
    private rotateWithView_;
    /**
     * @private
     * @type {number}
     */
    private rotation_;
    /**
     * @private
     * @type {number|import("../size.js").Size}
     */
    private scale_;
    /**
     * @private
     * @type {import("../size.js").Size}
     */
    private scaleArray_;
    /**
     * @private
     * @type {Array<number>}
     */
    private displacement_;
    /**
     * Clones the style.
     * @return {ImageStyle} The cloned style.
     * @api
     */
    clone(): ImageStyle;
    /**
     * Get the symbolizer opacity.
     * @return {number} Opacity.
     * @api
     */
    getOpacity(): number;
    /**
     * Determine whether the symbolizer rotates with the map.
     * @return {boolean} Rotate with map.
     * @api
     */
    getRotateWithView(): boolean;
    /**
     * Get the symoblizer rotation.
     * @return {number} Rotation.
     * @api
     */
    getRotation(): number;
    /**
     * Get the symbolizer scale.
     * @return {number|import("../size.js").Size} Scale.
     * @api
     */
    getScale(): number | number[];
    /**
     * Get the symbolizer scale array.
     * @return {import("../size.js").Size} Scale array.
     */
    getScaleArray(): number[];
    /**
     * Get the displacement of the shape
     * @return {Array<number>} Shape's center displacement
     * @api
     */
    getDisplacement(): number[];
    /**
     * Get the anchor point in pixels. The anchor determines the center point for the
     * symbolizer.
     * @abstract
     * @return {Array<number>} Anchor.
     */
    getAnchor(): number[];
    /**
     * Get the image element for the symbolizer.
     * @abstract
     * @param {number} pixelRatio Pixel ratio.
     * @return {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} Image element.
     */
    getImage(pixelRatio: number): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
    /**
     * @abstract
     * @return {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} Image element.
     */
    getHitDetectionImage(): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
    /**
     * Get the image pixel ratio.
     * @param {number} pixelRatio Pixel ratio.
     * @return {number} Pixel ratio.
     */
    getPixelRatio(pixelRatio: number): number;
    /**
     * @abstract
     * @return {import("../ImageState.js").default} Image state.
     */
    getImageState(): any;
    /**
     * @abstract
     * @return {import("../size.js").Size} Image size.
     */
    getImageSize(): number[];
    /**
     * Get the origin of the symbolizer.
     * @abstract
     * @return {Array<number>} Origin.
     */
    getOrigin(): number[];
    /**
     * Get the size of the symbolizer (in pixels).
     * @abstract
     * @return {import("../size.js").Size} Size.
     */
    getSize(): number[];
    /**
     * Set the displacement.
     *
     * @param {Array<number>} displacement Displacement.
     * @api
     */
    setDisplacement(displacement: number[]): void;
    /**
     * Set the opacity.
     *
     * @param {number} opacity Opacity.
     * @api
     */
    setOpacity(opacity: number): void;
    /**
     * Set whether to rotate the style with the view.
     *
     * @param {boolean} rotateWithView Rotate with map.
     * @api
     */
    setRotateWithView(rotateWithView: boolean): void;
    /**
     * Set the rotation.
     *
     * @param {number} rotation Rotation.
     * @api
     */
    setRotation(rotation: number): void;
    /**
     * Set the scale.
     *
     * @param {number|import("../size.js").Size} scale Scale.
     * @api
     */
    setScale(scale: number | number[]): void;
    /**
     * @abstract
     * @param {function(import("../events/Event.js").default): void} listener Listener function.
     */
    listenImageChange(listener: (arg0: import("../events/Event.js").default) => void): void;
    /**
     * Load not yet loaded URI.
     * @abstract
     */
    load(): void;
    /**
     * @abstract
     * @param {function(import("../events/Event.js").default): void} listener Listener function.
     */
    unlistenImageChange(listener: (arg0: import("../events/Event.js").default) => void): void;
}
//# sourceMappingURL=Image.d.ts.map