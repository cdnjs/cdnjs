/**
 * Return `true` if the layer is visible and if the provided view state
 * has resolution and zoom levels that are in range of the layer's min/max.
 * @param {State} layerState Layer state.
 * @param {import("../View.js").State} viewState View state.
 * @return {boolean} The layer is visible at the given view state.
 */
export function inView(layerState: State, viewState: import("../View.js").State): boolean;
export default Layer;
export type RenderFunction = (arg0: import("../PluggableMap.js").FrameState) => HTMLElement;
/**
 * *
 */
export type LayerOnSignature<Return> = ((type: "error" | "change", listener: (event: import("../events/Event.js").default) => any) => Return) & ((type: "propertychange" | "change:extent" | "change:maxResolution" | "change:maxZoom" | "change:minResolution" | "change:minZoom" | "change:opacity" | "change:visible" | "change:zIndex" | "change:source", listener: (event: import("../Object.js").ObjectEvent) => any) => Return) & ((type: "prerender" | "postrender", listener: (event: import("../render/Event.js").default) => any) => Return) & ((type: ("error" | "change" | "prerender" | "propertychange" | "change:extent" | "change:maxResolution" | "change:maxZoom" | "change:minResolution" | "change:minZoom" | "change:opacity" | "change:visible" | "change:zIndex" | "postrender" | "change:source")[], listener: (event: Event | import("../events/Event.js").default) => any) => Return extends void | null ? void : Return[]);
export type Options<SourceType extends import("../source/Source.js").default> = {
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
     * Source for this layer.  If not provided to the constructor,
     * the source can be set by calling {@link module:ol/layer/Layer~Layer#setSource layer.setSource(source)} after
     * construction.
     */
    source?: SourceType;
    /**
     * Map.
     */
    map?: import("../PluggableMap.js").default;
    /**
     * Render function. Takes the frame state as input and is expected to return an
     * HTML element. Will overwrite the default rendering for the layer.
     */
    render?: (arg0: import("../PluggableMap.js").FrameState) => HTMLElement;
    /**
     * Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
     */
    properties?: {
        [x: string]: any;
    };
};
export type State = {
    /**
     * Layer.
     */
    layer: Layer<any>;
    /**
     * Opacity, the value is rounded to two digits to appear after the decimal point.
     */
    opacity: number;
    /**
     * SourceState.
     */
    sourceState: any;
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
    extent?: number[];
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
 * @typedef {function(import("../PluggableMap.js").FrameState):HTMLElement} RenderFunction
 */
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes|
 *     'change:source', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("../render/EventType").LayerRenderEventTypes, import("../render/Event").default, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("./Base").BaseLayerObjectEventTypes|'change:source'|
 *     import("../render/EventType").LayerRenderEventTypes, Return>} LayerOnSignature
 */
/**
 * @template {import("../source/Source.js").default} SourceType
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
 * @property {import("../PluggableMap.js").default} [map] Map.
 * @property {RenderFunction} [render] Render function. Takes the frame state as input and is expected to return an
 * HTML element. Will overwrite the default rendering for the layer.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */
/**
 * @typedef {Object} State
 * @property {import("./Layer.js").default} layer Layer.
 * @property {number} opacity Opacity, the value is rounded to two digits to appear after the decimal point.
 * @property {import("../source/State.js").default} sourceState SourceState.
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
 * in the case where a custom layer is be added to the map with a custom `render` function.
 * Such a function can be specified in the `options` object, and is expected to return an HTML element.
 *
 * A visual representation of raster or vector map data.
 * Layers group together those properties that pertain to how the data is to be
 * displayed, irrespective of the source of that data.
 *
 * Layers are usually added to a map with {@link import("../PluggableMap.js").default#addLayer map.addLayer()}. Components
 * like {@link module:ol/interaction/Draw~Draw} use unmanaged layers
 * internally. These unmanaged layers are associated with the map using
 * {@link module:ol/layer/Layer~Layer#setMap} instead.
 *
 * A generic `change` event is fired when the state of the source changes.
 *
 * Please note that for performance reasons several layers might get rendered to
 * the same HTML element, which will cause {@link import("../PluggableMap.js").default#forEachLayerAtPixel map.forEachLayerAtPixel()} to
 * give false positives. To avoid this, apply different `className` properties to the
 * layers at creation time.
 *
 * @fires import("../render/Event.js").RenderEvent#prerender
 * @fires import("../render/Event.js").RenderEvent#postrender
 *
 * @template {import("../source/Source.js").default} SourceType
 * @api
 */
declare class Layer<SourceType extends import("../source/Source.js").default> extends BaseLayer {
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
     * @type {import("../renderer/Layer.js").default}
     */
    private renderer_;
    /**
     * In charge to manage the rendering of the layer. One layer type is
     * bounded with one layer renderer.
     * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
     * @param {HTMLElement} target Target which the renderer may (but need not) use
     * for rendering its content.
     * @return {HTMLElement} The rendered element.
     */
    render(frameState: import("../PluggableMap.js").FrameState | null, target: HTMLElement): HTMLElement;
    /**
     * Get the layer source.
     * @return {SourceType} The layer source (or `null` if not yet set).
     * @observable
     * @api
     */
    getSource(): SourceType;
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
     * @return {Promise<Array<import("../Feature").default>>} Promise that resolves with
     * an array of features.
     */
    getFeatures(pixel: number[]): Promise<import("../Feature.js").default<any>[]>;
    /**
     * Sets the layer to be rendered on top of other layers on a map. The map will
     * not manage this layer in its layers collection, and the callback in
     * {@link module:ol/Map~Map#forEachLayerAtPixel} will receive `null` as layer. This
     * is useful for temporary layers. To remove an unmanaged layer from the map,
     * use `#setMap(null)`.
     *
     * To add the layer to a map and have it managed by the map, use
     * {@link module:ol/Map~Map#addLayer} instead.
     * @param {import("../PluggableMap.js").default} map Map.
     * @api
     */
    setMap(map: import("../PluggableMap.js").default): void;
    /**
     * Set the layer source.
     * @param {SourceType} source The layer source.
     * @observable
     * @api
     */
    setSource(source: SourceType): void;
    /**
     * Get the renderer for this layer.
     * @return {import("../renderer/Layer.js").default} The layer renderer.
     */
    getRenderer(): import("../renderer/Layer.js").default<any>;
    /**
     * @return {boolean} The layer has a renderer.
     */
    hasRenderer(): boolean;
    /**
     * Create a renderer for this layer.
     * @return {import("../renderer/Layer.js").default} A layer renderer.
     * @protected
     */
    protected createRenderer(): import("../renderer/Layer.js").default<any>;
}
import BaseLayer from "./Base.js";
//# sourceMappingURL=Layer.d.ts.map