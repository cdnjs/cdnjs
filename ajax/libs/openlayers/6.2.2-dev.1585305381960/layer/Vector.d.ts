export default VectorLayer;
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
declare class VectorLayer extends BaseVectorLayer<import("../source/Vector.js").default<any>> {
    /**
     * @param {import("./BaseVector.js").Options=} opt_options Options.
     */
    constructor(opt_options?: import("./BaseVector.js").Options);
}
import BaseVectorLayer from "./BaseVector.js";
//# sourceMappingURL=Vector.d.ts.map