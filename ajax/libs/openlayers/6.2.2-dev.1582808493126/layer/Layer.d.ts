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
     * Source for this layer.  If not provided to the constructor,
     * the source can be set by calling {@link module:ol/layer/Layer#setSource layer.setSource(source)} after
     * construction.
     */
    source?: import("../source/Source.js").default;
    /**
     * Map.
     */
    map?: import("../PluggableMap.js").default;
    /**
     * Render function. Takes the frame state as input and is expected to return an
     * HTML element. Will overwrite the default rendering for the layer.
     */
    render?: (arg0: import("../PluggableMap.js").FrameState) => HTMLElement;
};
export type State = {
    layer: BaseLayer;
    /**
     * Opacity, the value is rounded to two digits to appear after the decimal point.
     */
    opacity: number;
    sourceState: {
        UNDEFINED: string;
        LOADING: string;
        READY: string;
        ERROR: string;
    };
    visible: boolean;
    managed: boolean;
    extent?: number[];
    zIndex: number;
    maxResolution: number;
    minResolution: number;
    minZoom: number;
    maxZoom: number;
};
/**
 * @typedef {function(import("../PluggableMap.js").FrameState):HTMLElement} RenderFunction
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
 * @property {import("../source/Source.js").default} [source] Source for this layer.  If not provided to the constructor,
 * the source can be set by calling {@link module:ol/layer/Layer#setSource layer.setSource(source)} after
 * construction.
 * @property {import("../PluggableMap.js").default} [map] Map.
 * @property {RenderFunction} [render] Render function. Takes the frame state as input and is expected to return an
 * HTML element. Will overwrite the default rendering for the layer.
 */
/**
 * @typedef {Object} State
 * @property {import("./Base.js").default} layer
 * @property {number} opacity Opacity, the value is rounded to two digits to appear after the decimal point.
 * @property {SourceState} sourceState
 * @property {boolean} visible
 * @property {boolean} managed
 * @property {import("../extent.js").Extent} [extent]
 * @property {number} zIndex
 * @property {number} maxResolution
 * @property {number} minResolution
 * @property {number} minZoom
 * @property {number} maxZoom
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
 * Layers are usually added to a map with {@link module:ol/Map#addLayer}. Components
 * like {@link module:ol/interaction/Select~Select} use unmanaged layers
 * internally. These unmanaged layers are associated with the map using
 * {@link module:ol/layer/Layer~Layer#setMap} instead.
 *
 * A generic `change` event is fired when the state of the source changes.
 *
 * Please note that for performance reasons several layers might get rendered to
 * the same HTML element, which will cause {@link module:ol/Map~Map#forEachLayerAtPixel} to
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
     * @param {Options} options Layer options.
     */
    constructor(options: Options);
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
    render(frameState: import("../PluggableMap.js").FrameState, target: HTMLElement): HTMLElement;
    /**
     * @inheritDoc
     */
    getLayersArray(opt_array: any): any;
    /**
     * @inheritDoc
     */
    getLayerStatesArray(opt_states: any): any;
    /**
     * Get the layer source.
     * @return {SourceType} The layer source (or `null` if not yet set).
     * @observable
     * @api
     */
    getSource(): SourceType;
    /**
      * @inheritDoc
      */
    getSourceState(): string | {
        UNDEFINED: string;
        LOADING: string;
        READY: string;
        ERROR: string;
    };
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
     * {@link module:ol/Map#forEachLayerAtPixel} will receive `null` as layer. This
     * is useful for temporary layers. To remove an unmanaged layer from the map,
     * use `#setMap(null)`.
     *
     * To add the layer to a map and have it managed by the map, use
     * {@link module:ol/Map#addLayer} instead.
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