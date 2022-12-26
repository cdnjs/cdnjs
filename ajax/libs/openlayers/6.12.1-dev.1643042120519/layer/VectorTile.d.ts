export default VectorTileLayer;
/**
 * *
 */
export type VectorTileLayerOnSignature<Return> = ((type: "change" | "error", listener: (event: import("../events/Event.js").default) => any) => Return) & ((type: "propertychange" | "change:extent" | "change:maxResolution" | "change:maxZoom" | "change:minResolution" | "change:minZoom" | "change:opacity" | "change:visible" | "change:zIndex" | "change:source" | "change:preload" | "change:useInterimTilesOnError", listener: (event: import("../Object.js").ObjectEvent) => any) => Return) & ((type: "prerender" | "postrender", listener: (event: import("../render/Event.js").default) => any) => Return) & ((type: ("propertychange" | "change" | "error" | "change:extent" | "change:maxResolution" | "change:maxZoom" | "change:minResolution" | "change:minZoom" | "change:opacity" | "change:visible" | "change:zIndex" | "prerender" | "postrender" | "change:source" | "change:preload" | "change:useInterimTilesOnError")[], listener: (event: import("../events/Event.js").default | Event) => any) => Return extends void | null ? void : Return[]);
export type Options = {
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
     * The buffer in pixels around the tile extent used by the
     * renderer when getting features from the vector tile for the rendering or hit-detection.
     * Recommended value: Vector tiles are usually generated with a buffer, so this value should match
     * the largest possible buffer of the used tiles. It should be at least the size of the largest
     * point symbol or line width.
     */
    renderBuffer?: number;
    /**
     * Render mode for vector tiles:
     * * `'hybrid'`: Polygon and line elements are rendered as images, so pixels are scaled during zoom
     * animations. Point symbols and texts are accurately rendered as vectors and can stay upright on
     * rotated views.
     * * `'vector'`: Everything is rendered as vectors. Use this mode for improved performance on vector
     * tile layers with only a few rendered features (e.g. for highlighting a subset of features of
     * another layer with the same source).
     */
    renderMode?: any;
    /**
     * Source.
     */
    source?: import("../source/VectorTile.js").default;
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
     * Background color for the layer. If not specified, no
     * background will be rendered.
     */
    background?: string | false | ((arg0: number) => string);
    /**
     * When set to `true`, feature batches will be
     * recreated during animations. This means that no vectors will be shown clipped, but the setting
     * will have a performance impact for large amounts of vector data. When set to `false`, batches
     * will be recreated when no animation is active.
     */
    updateWhileAnimating?: boolean;
    /**
     * When set to `true`, feature batches will be
     * recreated during interactions. See also `updateWhileAnimating`.
     */
    updateWhileInteracting?: boolean;
    /**
     * Preload. Load low-resolution tiles up to `preload` levels. `0`
     * means no preloading.
     */
    preload?: number;
    /**
     * Use interim tiles on error.
     */
    useInterimTilesOnError?: boolean;
    /**
     * Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
     */
    properties?: {
        [x: string]: any;
    };
};
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes|
 *     'change:source'|'change:preload'|'change:useInterimTilesOnError', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("../render/EventType").LayerRenderEventTypes, import("../render/Event").default, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("./Base").BaseLayerObjectEventTypes|
 *     'change:source'|'change:preload'|'change:useInterimTilesOnError'|import("../render/EventType").LayerRenderEventTypes, Return>} VectorTileLayerOnSignature
 */
/**
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
 * @property {import("../render.js").OrderFunction} [renderOrder] Render order. Function to be used when sorting
 * features before rendering. By default features are drawn in the order that they are created. Use
 * `null` to avoid the sort, but get an undefined draw order.
 * @property {number} [renderBuffer=100] The buffer in pixels around the tile extent used by the
 * renderer when getting features from the vector tile for the rendering or hit-detection.
 * Recommended value: Vector tiles are usually generated with a buffer, so this value should match
 * the largest possible buffer of the used tiles. It should be at least the size of the largest
 * point symbol or line width.
 * @property {import("./VectorTileRenderType.js").default|string} [renderMode='hybrid'] Render mode for vector tiles:
 *  * `'hybrid'`: Polygon and line elements are rendered as images, so pixels are scaled during zoom
 *    animations. Point symbols and texts are accurately rendered as vectors and can stay upright on
 *    rotated views.
 *  * `'vector'`: Everything is rendered as vectors. Use this mode for improved performance on vector
 *    tile layers with only a few rendered features (e.g. for highlighting a subset of features of
 *    another layer with the same source).
 * @property {import("../source/VectorTile.js").default} [source] Source.
 * @property {import("../PluggableMap.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use {@link import("../PluggableMap.js").default#addLayer map.addLayer()}.
 * @property {boolean} [declutter=false] Declutter images and text. Decluttering is applied to all
 * image and text styles of all Vector and VectorTile layers that have set this to `true`. The priority
 * is defined by the z-index of the layer, the `zIndex` of the style and the render order of features.
 * Higher z-index means higher priority. Within the same z-index, a feature rendered before another has
 * higher priority.
 *
 * As an optimization decluttered features from layers with the same `className` are rendered above
 * the fill and stroke styles of all of those layers regardless of z-index.  To opt out of this
 * behavior and place declutterd features with their own layer configure the layer with a `className`
 * other than `ol-layer`.
 * @property {import("../style/Style.js").StyleLike|null} [style] Layer style. When set to `null`, only
 * features that have their own style will be rendered. See {@link module:ol/style/Style~Style} for the default style
 * which will be used if this is not set.
 * @property {import("./Base.js").BackgroundColor|false} [background] Background color for the layer. If not specified, no
 * background will be rendered.
 * @property {boolean} [updateWhileAnimating=false] When set to `true`, feature batches will be
 * recreated during animations. This means that no vectors will be shown clipped, but the setting
 * will have a performance impact for large amounts of vector data. When set to `false`, batches
 * will be recreated when no animation is active.
 * @property {boolean} [updateWhileInteracting=false] When set to `true`, feature batches will be
 * recreated during interactions. See also `updateWhileAnimating`.
 * @property {number} [preload=0] Preload. Load low-resolution tiles up to `preload` levels. `0`
 * means no preloading.
 * @property {boolean} [useInterimTilesOnError=true] Use interim tiles on error.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */
/**
 * @classdesc
 * Layer for vector tile data that is rendered client-side.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @param {Options} [opt_options] Options.
 * @extends {BaseVectorLayer<import("../source/VectorTile.js").default, CanvasVectorTileLayerRenderer>}
 * @api
 */
declare class VectorTileLayer extends BaseVectorLayer<import("../source/VectorTile.js").default, CanvasVectorTileLayerRenderer> {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /***
     * @type {VectorTileLayerOnSignature<import("../events").EventsKey>}
     */
    on: VectorTileLayerOnSignature<import("../events").EventsKey>;
    /***
     * @type {VectorTileLayerOnSignature<import("../events").EventsKey>}
     */
    once: VectorTileLayerOnSignature<import("../events").EventsKey>;
    /***
     * @type {VectorTileLayerOnSignature<void>}
     */
    un: VectorTileLayerOnSignature<void>;
    /**
     * @private
     * @type {import("./VectorTileRenderType.js").default}
     */
    private renderMode_;
    /**
     * @return {import("./VectorTileRenderType.js").default} The render mode.
     */
    getRenderMode(): any;
    /**
     * Return the level as number to which we will preload tiles up to.
     * @return {number} The level to preload tiles up to.
     * @observable
     * @api
     */
    getPreload(): number;
    /**
     * Whether we use interim tiles on error.
     * @return {boolean} Use interim tiles on error.
     * @observable
     * @api
     */
    getUseInterimTilesOnError(): boolean;
    /**
     * Set the level as number to which we will preload tiles up to.
     * @param {number} preload The level to preload tiles up to.
     * @observable
     * @api
     */
    setPreload(preload: number): void;
    /**
     * Set whether we use interim tiles on error.
     * @param {boolean} useInterimTilesOnError Use interim tiles on error.
     * @observable
     * @api
     */
    setUseInterimTilesOnError(useInterimTilesOnError: boolean): void;
}
import CanvasVectorTileLayerRenderer from "../renderer/canvas/VectorTileLayer.js";
import BaseVectorLayer from "./BaseVector.js";
//# sourceMappingURL=VectorTile.d.ts.map