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
 * @module ol/layer/Vector
 */
import BaseVectorLayer from './BaseVector.js';
import CanvasVectorLayerRenderer from '../renderer/canvas/VectorLayer.js';
/**
 * @typedef {import("./BaseVector.js").Options} Options
 */
/**
 * @classdesc
 * Vector data that is rendered client-side.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @extends {BaseVectorLayer<import("../source/Vector.js").default>}
 * @api
 */
var VectorLayer = /** @class */ (function (_super) {
    __extends(VectorLayer, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function VectorLayer(opt_options) {
        return _super.call(this, opt_options) || this;
    }
    /**
     * Create a renderer for this layer.
     * @return {import("../renderer/Layer.js").default} A layer renderer.
     * @protected
     */
    VectorLayer.prototype.createRenderer = function () {
        return new CanvasVectorLayerRenderer(this);
    };
    return VectorLayer;
}(BaseVectorLayer));
export default VectorLayer;
//# sourceMappingURL=Vector.js.map