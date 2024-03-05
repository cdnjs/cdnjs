export default VectorLayer;
/**
 * @classdesc
 * Vector data is rendered client-side, as vectors. This layer type provides most accurate rendering
 * even during animations. Points and labels stay upright on rotated views. For very large
 * amounts of vector data, performance may suffer during pan and zoom animations. In this case,
 * try {@link module:ol/layer/VectorImage~VectorImageLayer}.
 *
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Vector.js").default} VectorSourceType
 * @extends {BaseVectorLayer<VectorSourceType, CanvasVectorLayerRenderer>}
 * @api
 */
declare class VectorLayer<VectorSourceType extends import("../source/Vector.js").default<import("../Feature.js").default<import("../geom/Geometry.js").default>>> extends BaseVectorLayer<VectorSourceType, CanvasVectorLayerRenderer> {
    /**
     * @param {import("./BaseVector.js").Options<VectorSourceType>} [options] Options.
     */
    constructor(options?: import("./BaseVector.js").Options<VectorSourceType> | undefined);
}
import CanvasVectorLayerRenderer from '../renderer/canvas/VectorLayer.js';
import BaseVectorLayer from './BaseVector.js';
//# sourceMappingURL=Vector.d.ts.map