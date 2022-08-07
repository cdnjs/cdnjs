/**
 * @module ol/style/Image
 */
import { abstract } from '../util.js';
import { toSize } from '../size.js';
/**
 * @typedef {Object} Options
 * @property {number} opacity
 * @property {boolean} rotateWithView
 * @property {number} rotation
 * @property {number|import("../size.js").Size} scale
 * @property {Array<number>} displacement
 */
/**
 * @classdesc
 * A base class used for creating subclasses and not instantiated in
 * apps. Base class for {@link module:ol/style/Icon~Icon}, {@link module:ol/style/Circle~CircleStyle} and
 * {@link module:ol/style/RegularShape~RegularShape}.
 * @abstract
 * @api
 */
var ImageStyle = /** @class */ (function () {
    /**
     * @param {Options} options Options.
     */
    function ImageStyle(options) {
        /**
         * @private
         * @type {number}
         */
        this.opacity_ = options.opacity;
        /**
         * @private
         * @type {boolean}
         */
        this.rotateWithView_ = options.rotateWithView;
        /**
         * @private
         * @type {number}
         */
        this.rotation_ = options.rotation;
        /**
         * @private
         * @type {number|import("../size.js").Size}
         */
        this.scale_ = options.scale;
        /**
         * @private
         * @type {import("../size.js").Size}
         */
        this.scaleArray_ = toSize(options.scale);
        /**
         * @private
         * @type {Array<number>}
         */
        this.displacement_ = options.displacement;
    }
    /**
     * Clones the style.
     * @return {ImageStyle} The cloned style.
     * @api
     */
    ImageStyle.prototype.clone = function () {
        var scale = this.getScale();
        return new ImageStyle({
            opacity: this.getOpacity(),
            scale: Array.isArray(scale) ? scale.slice() : scale,
            rotation: this.getRotation(),
            rotateWithView: this.getRotateWithView(),
            displacement: this.getDisplacement().slice(),
        });
    };
    /**
     * Get the symbolizer opacity.
     * @return {number} Opacity.
     * @api
     */
    ImageStyle.prototype.getOpacity = function () {
        return this.opacity_;
    };
    /**
     * Determine whether the symbolizer rotates with the map.
     * @return {boolean} Rotate with map.
     * @api
     */
    ImageStyle.prototype.getRotateWithView = function () {
        return this.rotateWithView_;
    };
    /**
     * Get the symoblizer rotation.
     * @return {number} Rotation.
     * @api
     */
    ImageStyle.prototype.getRotation = function () {
        return this.rotation_;
    };
    /**
     * Get the symbolizer scale.
     * @return {number|import("../size.js").Size} Scale.
     * @api
     */
    ImageStyle.prototype.getScale = function () {
        return this.scale_;
    };
    /**
     * Get the symbolizer scale array.
     * @return {import("../size.js").Size} Scale array.
     */
    ImageStyle.prototype.getScaleArray = function () {
        return this.scaleArray_;
    };
    /**
     * Get the displacement of the shape
     * @return {Array<number>} Shape's center displacement
     * @api
     */
    ImageStyle.prototype.getDisplacement = function () {
        return this.displacement_;
    };
    /**
     * Get the anchor point in pixels. The anchor determines the center point for the
     * symbolizer.
     * @abstract
     * @return {Array<number>} Anchor.
     */
    ImageStyle.prototype.getAnchor = function () {
        return abstract();
    };
    /**
     * Get the image element for the symbolizer.
     * @abstract
     * @param {number} pixelRatio Pixel ratio.
     * @return {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} Image element.
     */
    ImageStyle.prototype.getImage = function (pixelRatio) {
        return abstract();
    };
    /**
     * @abstract
     * @return {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} Image element.
     */
    ImageStyle.prototype.getHitDetectionImage = function () {
        return abstract();
    };
    /*
     * Get the image pixel ratio.
     * @param {number} pixelRatio Pixel ratio.
     * */
    ImageStyle.prototype.getPixelRatio = function (pixelRatio) {
        return 1;
    };
    /**
     * @abstract
     * @return {import("../ImageState.js").default} Image state.
     */
    ImageStyle.prototype.getImageState = function () {
        return abstract();
    };
    /**
     * @abstract
     * @return {import("../size.js").Size} Image size.
     */
    ImageStyle.prototype.getImageSize = function () {
        return abstract();
    };
    /**
     * @abstract
     * @return {import("../size.js").Size} Size of the hit-detection image.
     */
    ImageStyle.prototype.getHitDetectionImageSize = function () {
        return abstract();
    };
    /**
     * Get the origin of the symbolizer.
     * @abstract
     * @return {Array<number>} Origin.
     */
    ImageStyle.prototype.getOrigin = function () {
        return abstract();
    };
    /**
     * Get the size of the symbolizer (in pixels).
     * @abstract
     * @return {import("../size.js").Size} Size.
     */
    ImageStyle.prototype.getSize = function () {
        return abstract();
    };
    /**
     * Set the opacity.
     *
     * @param {number} opacity Opacity.
     * @api
     */
    ImageStyle.prototype.setOpacity = function (opacity) {
        this.opacity_ = opacity;
    };
    /**
     * Set whether to rotate the style with the view.
     *
     * @param {boolean} rotateWithView Rotate with map.
     * @api
     */
    ImageStyle.prototype.setRotateWithView = function (rotateWithView) {
        this.rotateWithView_ = rotateWithView;
    };
    /**
     * Set the rotation.
     *
     * @param {number} rotation Rotation.
     * @api
     */
    ImageStyle.prototype.setRotation = function (rotation) {
        this.rotation_ = rotation;
    };
    /**
     * Set the scale.
     *
     * @param {number|import("../size.js").Size} scale Scale.
     * @api
     */
    ImageStyle.prototype.setScale = function (scale) {
        this.scale_ = scale;
        this.scaleArray_ = toSize(scale);
    };
    /**
     * @abstract
     * @param {function(import("../events/Event.js").default): void} listener Listener function.
     */
    ImageStyle.prototype.listenImageChange = function (listener) {
        abstract();
    };
    /**
     * Load not yet loaded URI.
     * @abstract
     */
    ImageStyle.prototype.load = function () {
        abstract();
    };
    /**
     * @abstract
     * @param {function(import("../events/Event.js").default): void} listener Listener function.
     */
    ImageStyle.prototype.unlistenImageChange = function (listener) {
        abstract();
    };
    return ImageStyle;
}());
export default ImageStyle;
//# sourceMappingURL=Image.js.map