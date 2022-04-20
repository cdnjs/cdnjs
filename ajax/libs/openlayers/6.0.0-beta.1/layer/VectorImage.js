var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/layer/VectorImage
 */
import BaseVectorLayer from './BaseVector.js';
import { assign } from '../obj.js';
import CanvasVectorImageLayerRenderer from '../renderer/canvas/VectorImageLayer.js';
/**
 * @typedef {import("./BaseVector.js").Options} Options
 * @property {number} [imageRatio=1] Ratio by which the rendered extent should be larger than the
 * viewport extent. A larger ratio avoids cut images during panning, but will cause a decrease in performance.
 */
/**
 * @classdesc
 * Vector data that is rendered client-side.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @api
 */
var VectorImageLayer = /** @class */ (function (_super) {
    __extends(VectorImageLayer, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function VectorImageLayer(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : /** @type {Options} */ ({});
        var baseOptions = assign({}, options);
        delete baseOptions.imageRatio;
        _this = _super.call(this, baseOptions) || this;
        /**
         * @type {number}
         * @private
         */
        _this.imageRatio_ = options.imageRatio !== undefined ? options.imageRatio : 1;
        return _this;
    }
    /**
     * @return {number} Ratio between rendered extent size and viewport extent size.
     */
    VectorImageLayer.prototype.getImageRatio = function () {
        return this.imageRatio_;
    };
    /**
     * Create a renderer for this layer.
     * @return {import("../renderer/Layer.js").default} A layer renderer.
     * @protected
     */
    VectorImageLayer.prototype.createRenderer = function () {
        return new CanvasVectorImageLayerRenderer(this);
    };
    return VectorImageLayer;
}(BaseVectorLayer));
export default VectorImageLayer;
//# sourceMappingURL=VectorImage.js.map