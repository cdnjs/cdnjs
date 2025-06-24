export default BaseVectorLayer;
/**
 * *
 */
export type ExtractedFeatureType<T> = T extends import("../source/Vector.js").default<infer U extends import("../Feature.js").FeatureLike> ? U : never;
export type Options<FeatureType extends import("../Feature").FeatureLike, VectorSourceType extends import("../source/Vector.js").default<FeatureType> | import("../source/VectorTile.js").default<FeatureType>> = {
    /**
     * A CSS class name to set to the layer element.
     */
    className?: string | undefined;
    /**
     * Opacity (0, 1).
     */
    opacity?: number | undefined;
    /**
     * Visibility.
     */
    visible?: boolean | undefined;
    /**
     * The bounding extent for layer rendering.  The layer will not be
     * rendered outside of this extent.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * The z-index for layer rendering.  At rendering time, the layers
     * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
     * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
     * method was used.
     */
    zIndex?: number | undefined;
    /**
     * The minimum resolution (inclusive) at which this layer will be
     * visible.
     */
    minResolution?: number | undefined;
    /**
     * The maximum resolution (exclusive) below which this layer will
     * be visible.
     */
    maxResolution?: number | undefined;
    /**
     * The minimum view zoom level (exclusive) above which this layer will be
     * visible.
     */
    minZoom?: number | undefined;
    /**
     * The maximum view zoom level (inclusive) at which this layer will
     * be visible.
     */
    maxZoom?: number | undefined;
    /**
     * Render order. Function to be used when sorting
     * features before rendering. By default features are drawn in the order that they are created. Use
     * `null` to avoid the sort, but get an undefined draw order.
     */
    renderOrder?: import("../render.js").OrderFunction | undefined;
    /**
     * The buffer in pixels around the viewport extent used by the
     * renderer when getting features from the vector source for the rendering or hit-detection.
     * Recommended value: the size of the largest symbol, line width or label.
     */
    renderBuffer?: number | undefined;
    /**
     * Source.
     */
    source?: VectorSourceType | undefined;
    /**
     * Sets the layer as overlay on a map. The map will not manage
     * this layer in its layers collection, and the layer will be rendered on top. This is useful for
     * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
     * use [map.addLayer()]{@link import ("../Map.js").default#addLayer}.
     */
    map?: import("../Map.js").default | undefined;
    /**
     * Declutter images and text. Any truthy value will enable
     * decluttering. Within a layer, a feature rendered before another has higher priority. All layers with the
     * same `declutter` value will be decluttered together. The priority is determined by the drawing order of the
     * layers with the same `declutter` value. Higher in the layer stack means higher priority. To declutter distinct
     * layers or groups of layers separately, use different truthy values for `declutter`.
     */
    declutter?: string | number | boolean | undefined;
    /**
     * Layer style. When set to `null`, only
     * features that have their own style will be rendered. See {@link module :ol/style/Style~Style} for the default style
     * which will be used if this is not set.
     */
    style?: import("../style/Style.js").StyleLike | import("../style/flat.js").FlatStyleLike | null | undefined;
    /**
     * Background color for the layer. If not specified, no background
     * will be rendered.
     */
    background?: import("./Base.js").BackgroundColor | undefined;
    /**
     * When set to `true`, feature batches will
     * be recreated during animations. This means that no vectors will be shown clipped, but the
     * setting will have a performance impact for large amounts of vector data. When set to `false`,
     * batches will be recreated when no animation is active.
     */
    updateWhileAnimating?: boolean | undefined;
    /**
     * When set to `true`, feature batches will
     * be recreated during interactions. See also `updateWhileAnimating`.
     */
    updateWhileInteracting?: boolean | undefined;
    /**
     * Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
     */
    properties?: {
        [x: string]: any;
    } | undefined;
};
/**
 * @classdesc
 * Vector data that is rendered client-side.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import('../Feature').FeatureLike} FeatureType
 * @template {import("../source/Vector.js").default<FeatureType>|import("../source/VectorTile.js").default<FeatureType>} VectorSourceType<FeatureType>
 * @extends {Layer<VectorSourceType, RendererType>}
 * @template {import("../renderer/canvas/VectorLayer.js").default|import("../renderer/canvas/VectorTileLayer.js").default|import("../renderer/canvas/VectorImageLayer.js").default|import("../renderer/webgl/PointsLayer.js").default} RendererType
 * @api
 */
declare class BaseVectorLayer<FeatureType extends import("../Feature").FeatureLike, VectorSourceType extends import("../source/Vector.js").default<FeatureType> | import("../source/VectorTile.js").default<FeatureType>, RendererType extends import("../renderer/canvas/VectorLayer.js").default | import("../renderer/canvas/VectorTileLayer.js").default | import("../renderer/canvas/VectorImageLayer.js").default | import("../renderer/webgl/PointsLayer.js").default> extends Layer<VectorSourceType, RendererType> {
    /**
     * @param {Options<FeatureType, VectorSourceType>} [options] Options.
     */
    constructor(options?: Options<FeatureType, VectorSourceType>);
    /**
     * @private
     * @type {string}
     */
    private declutter_;
    /**
     * @type {number}
     * @private
     */
    private renderBuffer_;
    /**
     * User provided style.
     * @type {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike}
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
     * @return {number|undefined} Render buffer.
     */
    getRenderBuffer(): number | undefined;
    /**
     * @return {import("../render.js").OrderFunction|null|undefined} Render order.
     */
    getRenderOrder(): import("../render.js").OrderFunction | null | undefined;
    /**
     * Get the style for features.  This returns whatever was passed to the `style`
     * option at construction or to the `setStyle` method.
     * @return {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null|undefined} Layer style.
     * @api
     */
    getStyle(): import("../style/Style.js").StyleLike | import("../style/flat.js").FlatStyleLike | null | undefined;
    /**
     * Get the style function.
     * @return {import("../style/Style.js").StyleFunction|undefined} Layer style function.
     * @api
     */
    getStyleFunction(): import("../style/Style.js").StyleFunction | undefined;
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
     * @param {import("../render.js").OrderFunction|null|undefined} renderOrder
     *     Render order.
     */
    setRenderOrder(renderOrder: import("../render.js").OrderFunction | null | undefined): void;
    /**
     * Set the style for features.  This can be a single style object, an array
     * of styles, or a function that takes a feature and resolution and returns
     * an array of styles. If set to `null`, the layer has no style (a `null` style),
     * so only features that have their own styles will be rendered in the layer. Call
     * `setStyle()` without arguments to reset to the default style. See
     * [the ol/style/Style module]{@link module:ol/style/Style~Style} for information on the default style.
     *
     * If your layer has a static style, you can use [flat style]{@link module:ol/style/flat~FlatStyle} object
     * literals instead of using the `Style` and symbolizer constructors (`Fill`, `Stroke`, etc.):
     * ```js
     * vectorLayer.setStyle({
     *   "fill-color": "yellow",
     *   "stroke-color": "black",
     *   "stroke-width": 4
     * })
     * ```
     *
     * @param {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null} [style] Layer style.
     * @api
     */
    setStyle(style?: import("../style/Style.js").StyleLike | import("../style/flat.js").FlatStyleLike | null): void;
    /**
     * @param {boolean|string|number} declutter Declutter images and text.
     * @api
     */
    setDeclutter(declutter: boolean | string | number): void;
}
import Layer from './Layer.js';
//# sourceMappingURL=BaseVector.d.ts.map