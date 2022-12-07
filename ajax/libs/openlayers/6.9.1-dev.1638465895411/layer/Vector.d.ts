export default VectorLayer;
/**
 * @classdesc
 * Vector data that is rendered client-side.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Vector.js").default} VectorSourceType
 * @extends {BaseVectorLayer<VectorSourceType, CanvasVectorLayerRenderer>}
 * @api
 */
declare class VectorLayer<VectorSourceType extends import("../source/Vector.js").default<any>> extends BaseVectorLayer<VectorSourceType, CanvasVectorLayerRenderer> {
    /**
     * @param {import("./BaseVector.js").Options<VectorSourceType>} [opt_options] Options.
     */
    constructor(opt_options?: import("./BaseVector.js").Options<VectorSourceType> | undefined);
    createRenderer(): any;
}
import CanvasVectorLayerRenderer from "../renderer/canvas/VectorLayer.js";
import BaseVectorLayer from "./BaseVector.js";
//# sourceMappingURL=Vector.d.ts.map