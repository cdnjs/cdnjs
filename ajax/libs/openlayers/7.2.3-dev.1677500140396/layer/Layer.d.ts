/**
 * Return `true` if the layer is visible and if the provided view state
 * has resolution and zoom levels that are in range of the layer's min/max.
 * @param {State} layerState Layer state.
 * @param {import("../View.js").State} viewState View state.
 * @return {boolean} The layer is visible at the given view state.
 */
export function inView(layerState: State, viewState: import("../View.js").State): boolean;
export default Layer;
export type RenderFunction = (arg0: import("../Map.js").FrameState) => HTMLElement;
export type LayerEventType = 'sourceready' | 'change:source';
/**
 * *
 */
export type LayerOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes | LayerEventType, import("../Object").ObjectEvent, Return> & import("../Observable").OnSignature<import("../render/EventType").LayerRenderEventTypes, import("../render/Event").default, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("./Base").BaseLayerObjectEventTypes | LayerEventType | import("../render/EventType").LayerRenderEventTypes, Return>;
export type Options<SourceType extends import("../source/Source.js").default = import("../source/Source.js").default> = {
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
     * Source for this layer.  If not provided to the constructor,
     * the source can be set by calling {@link module :ol/layer/Layer~Layer#setSource layer.setSource(source)} after
     * construction.
     */
    source?: SourceType | undefined;
    /**
     * Map.
     */
    map?: import("../Map.js").default | null | undefined;
    /**
     * Render function. Takes the frame state as input and is expected to return an
     * HTML element. Will overwrite the default rendering for the layer.
     */
    render?: RenderFunction | undefined;
    /**
     * Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
     */
    properties?: {
        [x: string]: any;
    } | undefined;
};
export type State = {
    /**
     * Layer.
     */
    layer: import("./Layer.js").default;
    /**
     * Opacity, the value is rounded to two digits to appear after the decimal point.
     */
    opacity: number;
    /**
     * Visible.
     */
    visible: boolean;
    /**
     * Managed.
     */
    managed: boolean;
    /**
     * Extent.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * ZIndex.
     */
    zIndex: number;
    /**
     * Maximum resolution.
     */
    maxResolution: number;
    /**
     * Minimum resolution.
     */
    minResolution: number;
    /**
     * Minimum zoom.
     */
    minZoom: number;
    /**
     * Maximum zoom.
     */
    maxZoom: number;
};
/**
 * @typedef {function(import("../Map.js").FrameState):HTMLElement} RenderFunction
 */
/**
 * @typedef {'sourceready'|'change:source'} LayerEventType
 */
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes|
 *     LayerEventType, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("../render/EventType").LayerRenderEventTypes, import("../render/Event").default, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("./Base").BaseLayerObjectEventTypes|LayerEventType|
 *     import("../render/EventType").LayerRenderEventTypes, Return>} LayerOnSignature
 */
/**
 * @template {import("../source/Source.js").default} [SourceType=import("../source/Source.js").default]
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
 * @property {SourceType} [source] Source for this layer.  If not provided to the constructor,
 * the source can be set by calling {@link module:ol/layer/Layer~Layer#setSource layer.setSource(source)} after
 * construction.
 * @property {import("../Map.js").default|null} [map] Map.
 * @property {RenderFunction} [render] Render function. Takes the frame state as input and is expected to return an
 * HTML element. Will overwrite the default rendering for the layer.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */
/**
 * @typedef {Object} State
 * @property {import("./Layer.js").default} layer Layer.
 * @property {number} opacity Opacity, the value is rounded to two digits to appear after the decimal point.
 * @property {boolean} visible Visible.
 * @property {boolean} managed Managed.
 * @property {import("../extent.js").Extent} [extent] Extent.
 * @property {number} zIndex ZIndex.
 * @property {number} maxResolution Maximum resolution.
 * @property {number} minResolution Minimum resolution.
 * @property {number} minZoom Minimum zoom.
 * @property {number} maxZoom Maximum zoom.
 */
/**
 * @classdesc
 * Base class from which all layer types are derived. This should only be instantiated
 * in the case where a custom layer is added to the map with a custom `render` function.
 * Such a function can be specified in the `options` object, and is expected to return an HTML element.
 *
 * A visual representation of raster or vector map data.
 * Layers group together those properties that pertain to how the data is to be
 * displayed, irrespective of the source of that data.
 *
 * Layers are usually added to a map with [map.addLayer()]{@link import("../Map.js").default#addLayer}.
 * Components like {@link module:ol/interaction/Draw~Draw} use unmanaged layers
 * internally. These unmanaged layers are associated with the map using
 * [layer.setMap()]{@link module:ol/layer/Layer~Layer#setMap} instead.
 *
 * A generic `change` event is fired when the state of the source changes.
 * A `sourceready` event is fired when the layer's source is ready.
 *
 * @fires import("../render/Event.js").RenderEvent#prerender
 * @fires import("../render/Event.js").RenderEvent#postrender
 * @fires import("../events/Event.js").BaseEvent#sourceready
 *
 * @template {import("../source/Source.js").default} [SourceType=import("../source/Source.js").default]
 * @template {import("../renderer/Layer.js").default} [RendererType=import("../renderer/Layer.js").default]
 * @api
 */
declare class Layer<SourceType extends import("../source/Source.js").default = import("../source/Source.js").default, RendererType extends import("../renderer/Layer.js").default<any> = import("../renderer/Layer.js").default<any>> extends BaseLayer {
    /**
     * @param {Options<SourceType>} options Layer options.
     */
    constructor(options: Options<SourceType>);
    /***
     * @type {LayerOnSignature<import("../events").EventsKey>}
     */
    on: LayerOnSignature<import("../events").EventsKey>;
    /***
     * @type {LayerOnSignature<import("../events").EventsKey>}
     */
    once: LayerOnSignature<import("../events").EventsKey>;
    /***
     * @type {LayerOnSignature<void>}
     */
    un: LayerOnSignature<void>;
    /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */
    private mapPrecomposeKey_;
    /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */
    private mapRenderKey_;
    /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */
    private sourceChangeKey_;
    /**
     * @private
     * @type {RendererType}
     */
    private renderer_;
    /**
     * @private
     * @type {boolean}
     */
    private sourceReady_;
    /**
     * @protected
     * @type {boolean}
     */
    protected rendered: boolean;
    /**
     * In charge to manage the rendering of the layer. One layer type is
     * bounded with one layer renderer.
     * @param {?import("../Map.js").FrameState} frameState Frame state.
     * @param {HTMLElement} target Target which the renderer may (but need not) use
     * for rendering its content.
     * @return {HTMLElement} The rendered element.
     */
    render(frameState: import("../Map.js").FrameState | null, target: HTMLElement): HTMLElement;
    /**
     * Get the layer source.
     * @return {SourceType|null} The layer source (or `null` if not yet set).
     * @observable
     * @api
     */
    getSource(): SourceType | null;
    /**
     * @return {SourceType|null} The source being rendered.
     */
    getRenderSource(): SourceType | null;
    /**
     * @private
     */
    private handleSourceChange_;
    /**
     * @private
     */
    private handleSourcePropertyChange_;
    /**
     * @param {import("../pixel").Pixel} pixel Pixel.
     * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with
     * an array of features.
     */
    getFeatures(pixel: import("../pixel").Pixel): Promise<Array<import("../Feature").FeatureLike>>;
    /**
     * @param {import("../pixel").Pixel} pixel Pixel.
     * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
     */
    getData(pixel: import("../pixel").Pixel): Uint8ClampedArray | Uint8Array | Float32Array | DataView | null;
    /**
     * The layer is visible in the given view, i.e. within its min/max resolution or zoom and
     * extent, and `getVisible()` is `true`.
     * @param {View|import("../View.js").ViewStateAndExtent} view View or {@link import("../Map.js").FrameState}.
     * @return {boolean} The layer is visible in the current view.
     * @api
     */
    isVisible(view: View | import("../View.js").ViewStateAndExtent): boolean;
    /**
     * Get the attributions of the source of this layer for the given view.
     * @param {View|import("../View.js").ViewStateAndExtent} view View or  {@link import("../Map.js").FrameState}.
     * @return {Array<string>} Attributions for this layer at the given view.
     * @api
     */
    getAttributions(view: View | import("../View.js").ViewStateAndExtent): Array<string>;
    /**
     * Called when a layer is not visible during a map render.
     */
    unrender(): void;
    /**
     * For use inside the library only.
     * @param {import("../Map.js").default|null} map Map.
     */
    setMapInternal(map: import("../Map.js").default | null): void;
    /**
     * For use inside the library only.
     * @return {import("../Map.js").default|null} Map.
     */
    getMapInternal(): import("../Map.js").default | null;
    /**
     * Sets the layer to be rendered on top of other layers on a map. The map will
     * not manage this layer in its layers collection. This
     * is useful for temporary layers. To remove an unmanaged layer from the map,
     * use `#setMap(null)`.
     *
     * To add the layer to a map and have it managed by the map, use
     * {@link module:ol/Map~Map#addLayer} instead.
     * @param {import("../Map.js").default|null} map Map.
     * @api
     */
    setMap(map: import("../Map.js").default | null): void;
    /**
     * Set the layer source.
     * @param {SourceType|null} source The layer source.
     * @observable
     * @api
     */
    setSource(source: SourceType | null): void;
    /**
     * Get the renderer for this layer.
     * @return {RendererType|null} The layer renderer.
     */
    getRenderer(): RendererType | null;
    /**
     * @return {boolean} The layer has a renderer.
     */
    hasRenderer(): boolean;
    /**
     * Create a renderer for this layer.
     * @return {RendererType} A layer renderer.
     * @protected
     */
    protected createRenderer(): RendererType;
}
import BaseLayer from "./Base.js";
import View from "../View.js";
//# sourceMappingURL=Layer.d.ts.map