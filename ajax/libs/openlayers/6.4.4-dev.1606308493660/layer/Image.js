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
 * @api
 */
var ImageLayer = /** @class */ (function (_super) {
    __extends(ImageLayer, _super);
    /**
     * @param {import("./BaseImage.js").Options=} opt_options Layer options.
     */
    function ImageLayer(opt_options) {
        return _super.call(this, opt_options) || this;
    }
    /**
     * Create a renderer for this layer.
     * @return {import("../renderer/Layer.js").default} A layer renderer.
     */
    ImageLayer.prototype.createRenderer = function () {
        return new CanvasImageLayerRenderer(this);
    };
    return ImageLayer;
}(BaseImageLayer));
export default ImageLayer;
//# sourceMappingURL=Image.js.map