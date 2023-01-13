var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/layer/Image
 */
import BaseImageLayer from './BaseImage.js';
import CanvasImageLayerRenderer from '../renderer/canvas/ImageLayer.js';
/**
 * @classdesc
 * Server-rendered images that are available for arbitrary extents and
 * resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Image.js").default} ImageSourceType
 * @extends {BaseImageLayer<ImageSourceType, CanvasImageLayerRenderer>}
 * @api
 */
var ImageLayer = /** @class */ (function (_super) {
    __extends(ImageLayer, _super);
    /**
     * @param {import("./BaseImage.js").Options<ImageSourceType>} [opt_options] Layer options.
     */
    function ImageLayer(opt_options) {
        return _super.call(this, opt_options) || this;
    }
    ImageLayer.prototype.createRenderer = function () {
        return new CanvasImageLayerRenderer(this);
    };
    /**
     * Get data for a pixel location.  A four element RGBA array will be returned.  For requests outside the
     * layer extent, `null` will be returned.  Data for an image can only be retrieved if the
     * source's `crossOrigin` property is set.
     *
     * ```js
     * // display layer data on every pointer move
     * map.on('pointermove', (event) => {
     *   console.log(layer.getData(event.pixel));
     * });
     * ```
     * @param {import("../pixel").Pixel} pixel Pixel.
     * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
     * @api
     */
    ImageLayer.prototype.getData = function (pixel) {
        return _super.prototype.getData.call(this, pixel);
    };
    return ImageLayer;
}(BaseImageLayer));
export default ImageLayer;
//# sourceMappingURL=Image.js.map