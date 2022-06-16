export default ImageLayer;
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
declare class ImageLayer extends BaseImageLayer {
    /**
     * @param {import("./BaseImage.js").Options=} opt_options Layer options.
     */
    constructor(opt_options?: import("./BaseImage.js").Options);
}
import BaseImageLayer from "./BaseImage.js";
//# sourceMappingURL=Image.d.ts.map