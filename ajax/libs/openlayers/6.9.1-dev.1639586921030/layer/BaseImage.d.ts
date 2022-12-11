export default BaseImageLayer;
export type Options<ImageSourceType extends import("../source/Image.js").default> = {
    /**
     * A CSS class name to set to the layer element.
     */
    className?: string;
    /**
     * Opacity (0, 1).
     */
    opacity?: number;
    /**
     * Visibility.
     */
    visible?: boolean;
    /**
     * The bounding extent for layer rendering.  The layer will not be
     * rendered outside of this extent.
     */
    extent?: number[];
    /**
     * The z-index for layer rendering.  At rendering time, the layers
     * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
     * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
     * method was used.
     */
    zIndex?: number;
    /**
     * The minimum resolution (inclusive) at which this layer will be
     * visible.
     */
    minResolution?: number;
    /**
     * The maximum resolution (exclusive) below which this layer will
     * be visible.
     */
    maxResolution?: number;
    /**
     * The minimum view zoom level (exclusive) above which this layer will be
     * visible.
     */
    minZoom?: number;
    /**
     * The maximum view zoom level (inclusive) at which this layer will
     * be visible.
     */
    maxZoom?: number;
    /**
     * Sets the layer as overlay on a map. The map will not manage
     * this layer in its layers collection, and the layer will be rendered on top. This is useful for
     * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
     * use {@link import("../PluggableMap.js").default#addLayer map.addLayer()}.
     */
    map?: import("../PluggableMap.js").default;
    /**
     * Source for this layer.
     */
    source?: ImageSourceType;
    /**
     * Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
     */
    properties?: {
        [x: string]: any;
    };
};
/**
 * @template {import("../source/Image.js").default} ImageSourceType
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {import("../PluggableMap.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use {@link import("../PluggableMap.js").default#addLayer map.addLayer()}.
 * @property {ImageSourceType} [source] Source for this layer.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */
/**
 * @classdesc
 * Server-rendered images that are available for arbitrary extents and
 * resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Image.js").default} ImageSourceType
 * @template {import("../renderer/Layer.js").default} RendererType
 * @extends {Layer<ImageSourceType, RendererType>}
 * @api
 */
declare class BaseImageLayer<ImageSourceType extends import("../source/Image.js").default, RendererType extends import("../renderer/Layer.js").default<any>> extends Layer<ImageSourceType, RendererType> {
    /**
     * @param {Options<ImageSourceType>} [opt_options] Layer options.
     */
    constructor(opt_options?: Options<ImageSourceType> | undefined);
}
import Layer from "./Layer.js";
//# sourceMappingURL=BaseImage.d.ts.map