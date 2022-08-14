/**
 * @module ol/source/ImageCanvas
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import ImageCanvas from '../ImageCanvas.js';
import ImageSource from './Image.js';
import { containsExtent, getHeight, getWidth, scaleFromCenter, } from '../extent.js';
/**
 * A function returning the canvas element (`{HTMLCanvasElement}`)
 * used by the source as an image. The arguments passed to the function are:
 * {@link module:ol/extent~Extent} the image extent, `{number}` the image resolution,
 * `{number}` the device pixel ratio, {@link module:ol/size~Size} the image size, and
 * {@link module:ol/proj/Projection} the image projection. The canvas returned by
 * this function is cached by the source. The this keyword inside the function
 * references the {@link module:ol/source/ImageCanvas}.
 *
 * @typedef {function(this:import("../ImageCanvas.js").default, import("../extent.js").Extent, number,
 *     number, import("../size.js").Size, import("../proj/Projection.js").default): HTMLCanvasElement} FunctionType
 */
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {FunctionType} [canvasFunction] Canvas function.
 * The function returning the canvas element used by the source
 * as an image. The arguments passed to the function are: `{import("../extent.js").Extent}` the
 * image extent, `{number}` the image resolution, `{number}` the device pixel
 * ratio, `{import("../size.js").Size}` the image size, and `{import("../proj/Projection.js").Projection}` the image
 * projection. The canvas returned by this function is cached by the source. If
 * the value returned by the function is later changed then
 * `changed` should be called on the source for the source to
 * invalidate the current cached image. See: {@link module:ol/Observable~Observable#changed}
 * @property {boolean} [imageSmoothing=true] Enable image smoothing.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [ratio=1.5] Ratio. 1 means canvases are the size of the map viewport, 2 means twice the
 * width and height of the map viewport, and so on. Must be `1` or higher.
 * @property {Array<number>} [resolutions] Resolutions.
 * If specified, new canvases will be created for these resolutions
 * @property {import("./State.js").default} [state] Source state.
 */
/**
 * @classdesc
 * Base class for image sources where a canvas element is the image.
 * @api
 */
var ImageCanvasSource = /** @class */ (function (_super) {
    __extends(ImageCanvasSource, _super);
    /**
     * @param {Options=} opt_options ImageCanvas options.
     */
    function ImageCanvasSource(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            attributions: options.attributions,
            imageSmoothing: options.imageSmoothing,
            projection: options.projection,
            resolutions: options.resolutions,
            state: options.state,
        }) || this;
        /**
         * @private
         * @type {FunctionType}
         */
        _this.canvasFunction_ = options.canvasFunction;
        /**
         * @private
         * @type {import("../ImageCanvas.js").default}
         */
        _this.canvas_ = null;
        /**
         * @private
         * @type {number}
         */
        _this.renderedRevision_ = 0;
        /**
         * @private
         * @type {number}
         */
        _this.ratio_ = options.ratio !== undefined ? options.ratio : 1.5;
        return _this;
    }
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../ImageCanvas.js").default} Single image.
     */
    ImageCanvasSource.prototype.getImageInternal = function (extent, resolution, pixelRatio, projection) {
        resolution = this.findNearestResolution(resolution);
        var canvas = this.canvas_;
        if (canvas &&
            this.renderedRevision_ == this.getRevision() &&
            canvas.getResolution() == resolution &&
            canvas.getPixelRatio() == pixelRatio &&
            containsExtent(canvas.getExtent(), extent)) {
            return canvas;
        }
        extent = extent.slice();
        scaleFromCenter(extent, this.ratio_);
        var width = getWidth(extent) / resolution;
        var height = getHeight(extent) / resolution;
        var size = [width * pixelRatio, height * pixelRatio];
        var canvasElement = this.canvasFunction_.call(this, extent, resolution, pixelRatio, size, projection);
        if (canvasElement) {
            canvas = new ImageCanvas(extent, resolution, pixelRatio, canvasElement);
        }
        this.canvas_ = canvas;
        this.renderedRevision_ = this.getRevision();
        return canvas;
    };
    return ImageCanvasSource;
}(ImageSource));
export default ImageCanvasSource;
//# sourceMappingURL=ImageCanvas.js.map