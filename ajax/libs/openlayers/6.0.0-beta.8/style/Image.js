/**
 * @module ol/style/Image
 */
import { abstract } from '../util.js';
/**
 * @typedef {Object} Options
 * @property {number} opacity
 * @property {boolean} rotateWithView
 * @property {number} rotation
 * @property {number} scale
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
         * @type {number}
         */
        this.scale_ = options.scale;
    }
    /**
     * Clones the style.
     * @return {ImageStyle} The cloned style.
     * @api
     */
    ImageStyle.prototype.clone = function () {
        return new ImageStyle({
            opacity: this.getOpacity(),
            scale: this.getScale(),
            rotation: this.getRotation(),
            rotateWithView: this.getRotateWithView()
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
     * @return {number} Scale.
     * @api
     */
    ImageStyle.prototype.getScale = function () {
        return this.scale_;
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
     * @param {number} pixelRatio Pixel ratio.
     * @return {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} Image element.
     */
    ImageStyle.prototype.getHitDetectionImage = function (pixelRatio) {
        return abstract();
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
     * @param {number} scale Scale.
     * @api
     */
    ImageStyle.prototype.setScale = function (scale) {
        this.scale_ = scale;
    };
    /**
     * @abstract
     * @param {function(this: T, import("../events/Event.js").default): void} listener Listener function.
     * @param {T} thisArg Value to use as `this` when executing `listener`.
     * @return {import("../events.js").EventsKey|undefined} Listener key.
     * @template T
     */
    ImageStyle.prototype.listenImageChange = function (listener, thisArg) {
        return abstract();
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
     * @param {function(this: T, import("../events/Event.js").default): void} listener Listener function.
     * @param {T} thisArg Value to use as `this` when executing `listener`.
     * @template T
     */
    ImageStyle.prototype.unlistenImageChange = function (listener, thisArg) {
        abstract();
    };
    return ImageStyle;
}());
export default ImageStyle;
//# sourceMappingURL=Image.js.map