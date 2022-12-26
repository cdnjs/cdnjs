export default BaseVectorLayer;
export type Options<VectorSourceType extends import("../source/Vector.js").default<any> | import("../source/VectorTile.js").default> = {
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
     * Render order. Function to be used when sorting
     * features before rendering. By default features are drawn in the order that they are created. Use
     * `null` to avoid the sort, but get an undefined draw order.
     */
    renderOrder?: (arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default) => number;
    /**
     * The buffer in pixels around the viewport extent used by the
     * renderer when getting features from the vector source for the rendering or hit-detection.
     * Recommended value: the size of the largest symbol, line width or label.
     */
    renderBuffer?: number;
    /**
     * Source.
     */
    source?: VectorSourceType;
    /**
     * Sets the layer as overlay on a map. The map will not manage
     * this layer in its layers collection, and the layer will be rendered on top. This is useful for
     * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
     * use {@link import("../PluggableMap.js").default#addLayer map.addLayer()}.
     */
    map?: import("../PluggableMap.js").default;
    /**
     * Declutter images and text. Decluttering is applied to all
     * image and text styles of all Vector and VectorTile layers that have set this to `true`. The priority
     * is defined by the z-index of the layer, the `zIndex` of the style and the render order of features.
     * Higher z-index means higher priority. Within the same z-index, a feature rendered before another has
     * higher priority.
     *
     * As an optimization decluttered features from layers with the same `className` are rendered above
     * the fill and stroke styles of all of those layers regardless of z-index.  To opt out of this
     * behavior and place declutterd features with their own layer configure the layer with a `className`
     * other than `ol-layer`.
     */
    declutter?: boolean;
    /**
     * Layer style. When set to `null`, only
     * features that have their own style will be rendered. See {@link module:ol/style/Style~Style} for the default style
     * which will be used if this is not set.
     */
    style?: import("../style/Style.js").default | import("../style/Style.js").default[] | ((arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: number) => void | import("../style/Style.js").default | import("../style/Style.js").default[]) | null;
    /**
     * Background color for the layer. If not specified, no background
     * will be rendered.
     */
    background?: string | ((arg0: number) => string);
    /**
     * When set to `true`, feature batches will
     * be recreated during animations. This means that no vectors will be shown clipped, but the
     * setting will have a performance impact for large amounts of vector data. When set to `false`,
     * batches will be recreated when no animation is active.
     */
    updateWhileAnimating?: boolean;
    /**
     * When set to `true`, feature batches will
     * be recreated during interactions. See also `updateWhileAnimating`.
     */
    updateWhileInteracting?: boolean;
    /**
     * Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
     */
    properties?: {
        [x: string]: any;
    };
};
export type Property = string;
/**
 * @classdesc
 * Vector data that is rendered client-side.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Vector.js").default|import("../source/VectorTile.js").default} VectorSourceType
 * @template {import("../renderer/canvas/VectorLayer.js").default|import("../renderer/canvas/VectorTileLayer.js").default|import("../renderer/canvas/VectorImageLayer.js").default|import("../renderer/webgl/PointsLayer.js").default} RendererType
 * @extends {Layer<VectorSourceType, RendererType>}
 * @api
 */
declare class BaseVectorLayer<VectorSourceType extends import("../source/Vector.js").default<any> | import("../source/VectorTile.js").default, RendererType extends import("../renderer/canvas/VectorLayer.js").default | import("../renderer/canvas/VectorTileLayer.js").default | import("../renderer/canvas/VectorImageLayer.js").default | import("../renderer/webgl/PointsLayer.js").default> extends Layer<VectorSourceType, RendererType> {
    /**
     * @param {Options<VectorSourceType>} [opt_options] Options.
     */
    constructor(opt_options?: Options<VectorSourceType> | undefined);
    /**
     * @private
     * @type {boolean}
     */
    private declutter_;
    /**
     * @type {number}
     * @private
     */
    private renderBuffer_;
    /**
     * User provided style.
     * @type {import("../style/Style.js").StyleLike}
     * @private
     */
    private style_;
    /**
     * Style function for use within the library.
     * @type {import("../style/Style.js").StyleFunction|undefined}
     * @private
     */
    private styleFunction_;
    /**
     * @type {boolean}
     * @private
     */
    private updateWhileAnimating_;
    /**
     * @type {boolean}
     * @private
     */
    private updateWhileInteracting_;
    /**
     * @return {boolean} Declutter.
     */
    getDeclutter(): boolean;
    /**
     * @return {number|undefined} Render buffer.
     */
    getRenderBuffer(): number | undefined;
    /**
     * @return {function(import("../Feature.js").default, import("../Feature.js").default): number|null|undefined} Render
     *     order.
     */
    getRenderOrder(): (arg0: import("../Feature.js").default<any>, arg1: import("../Feature.js").default<any>) => number | null | undefined;
    /**
     * Get the style for features.  This returns whatever was passed to the `style`
     * option at construction or to the `setStyle` method.
     * @return {import("../style/Style.js").StyleLike|null|undefined} Layer style.
     * @api
     */
    getStyle(): import("../style/Style.js").default | import("../style/Style.js").default[] | ((arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: number) => void | import("../style/Style.js").default | import("../style/Style.js").default[]) | null | undefined;
    /**
     * Get the style function.
     * @return {import("../style/Style.js").StyleFunction|undefined} Layer style function.
     * @api
     */
    getStyleFunction(): ((arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: number) => void | import("../style/Style.js").default | import("../style/Style.js").default[]) | undefined;
    /**
     * @return {boolean} Whether the rendered layer should be updated while
     *     animating.
     */
    getUpdateWhileAnimating(): boolean;
    /**
     * @return {boolean} Whether the rendered layer should be updated while
     *     interacting.
     */
    getUpdateWhileInteracting(): boolean;
    /**
     * Render declutter items for this layer
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     */
    renderDeclutter(frameState: import("../PluggableMap.js").FrameState): void;
    /**
     * @param {import("../render.js").OrderFunction|null|undefined} renderOrder
     *     Render order.
     */
    setRenderOrder(renderOrder: ((arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default) => number) | null | undefined): void;
    /**
     * Set the style for features.  This can be a single style object, an array
     * of styles, or a function that takes a feature and resolution and returns
     * an array of styles. If set to `null`, the layer has no style (a `null` style),
     * so only features that have their own styles will be rendered in the layer. Call
     * `setStyle()` without arguments to reset to the default style. See
     * {@link module:ol/style/Style~Style} for information on the default style.
     * @param {import("../style/Style.js").StyleLike|null} [opt_style] Layer style.
     * @api
     */
    setStyle(opt_style?: import("../style/Style.js").default | import("../style/Style.js").default[] | ((arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: number) => void | import("../style/Style.js").default | import("../style/Style.js").default[]) | null | undefined): void;
}
import Layer from "./Layer.js";
//# sourceMappingURL=BaseVector.d.ts.map