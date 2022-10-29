export default ImageLayer;
/**
 * @classdesc
 * Server-rendered images that are available for arbitrary extents and
 * resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Image.js").default} ImageSourceType
 * @extends {BaseImageLayer<ImageSourceType>}
 * @api
 */
declare class ImageLayer<ImageSourceType extends import("../source/Image.js").default> extends BaseImageLayer<ImageSourceType> {
    /**
     * @param {import("./BaseImage.js").Options<ImageSourceType>} [opt_options] Layer options.
     */
    constructor(opt_options?: import("./BaseImage.js").Options<ImageSourceType> | undefined);
}
import BaseImageLayer from "./BaseImage.js";
//# sourceMappingURL=Image.d.ts.map