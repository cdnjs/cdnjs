export default BaseLayer;
export type BaseLayerObjectEventTypes = "propertychange" | "change:extent" | "change:maxResolution" | "change:maxZoom" | "change:minResolution" | "change:minZoom" | "change:opacity" | "change:visible" | "change:zIndex";
/**
 * *
 */
export type BaseLayerOnSignature<Return> = ((type: "error" | "change", listener: (event: import("../events/Event.js").default) => any) => Return) & ((type: "propertychange" | "change:extent" | "change:maxResolution" | "change:maxZoom" | "change:minResolution" | "change:minZoom" | "change:opacity" | "change:visible" | "change:zIndex", listener: (event: import("../Object.js").ObjectEvent) => any) => Return) & ((type: ("error" | "change" | "propertychange" | "change:extent" | "change:maxResolution" | "change:maxZoom" | "change:minResolution" | "change:minZoom" | "change:opacity" | "change:visible" | "change:zIndex")[], listener: (event: Event | import("../events/Event.js").default) => any) => Return extends void | null ? void : Return[]);
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
     * Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
     */
    properties?: {
        [x: string]: any;
    };
};
/**
 * @typedef {import("../ObjectEventType").Types|'change:extent'|'change:maxResolution'|'change:maxZoom'|
 *    'change:minResolution'|'change:minZoom'|'change:opacity'|'change:visible'|'change:zIndex'} BaseLayerObjectEventTypes
 */
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<BaseLayerObjectEventTypes, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|BaseLayerObjectEventTypes, Return>} BaseLayerOnSignature
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
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Note that with {@link module:ol/layer/Base} and all its subclasses, any property set in
 * the options is set as a {@link module:ol/Object} property on the layer object, so
 * is observable, and has get/set accessors.
 *
 * @api
 */
declare class BaseLayer extends BaseObject {
    /**
     * @param {Options} options Layer options.
     */
    constructor(options: Options);
    /***
     * @type {BaseLayerOnSignature<import("../events").EventsKey>}
     */
    on: BaseLayerOnSignature<import("../events").EventsKey>;
    /***
     * @type {BaseLayerOnSignature<import("../events").EventsKey>}
     */
    once: BaseLayerOnSignature<import("../events").EventsKey>;
    /***
     * @type {BaseLayerOnSignature<void>}
     */
    un: BaseLayerOnSignature<void>;
    /**
     * @type {string}
     * @private
     */
    private className_;
    /**
     * @type {import("./Layer.js").State}
     * @private
     */
    private state_;
    /**
     * @return {string} CSS class name.
     */
    getClassName(): string;
    /**
     * This method is not meant to be called by layers or layer renderers because the state
     * is incorrect if the layer is included in a layer group.
     *
     * @param {boolean} [opt_managed] Layer is managed.
     * @return {import("./Layer.js").State} Layer state.
     */
    getLayerState(opt_managed?: boolean | undefined): import("./Layer.js").State;
    /**
     * @abstract
     * @param {Array<import("./Layer.js").default>} [opt_array] Array of layers (to be
     *     modified in place).
     * @return {Array<import("./Layer.js").default>} Array of layers.
     */
    getLayersArray(opt_array?: import("./Layer.js").default<any>[] | undefined): import("./Layer.js").default<any>[];
    /**
     * @abstract
     * @param {Array<import("./Layer.js").State>} [opt_states] Optional list of layer
     *     states (to be modified in place).
     * @return {Array<import("./Layer.js").State>} List of layer states.
     */
    getLayerStatesArray(opt_states?: import("./Layer.js").State[] | undefined): import("./Layer.js").State[];
    /**
     * Return the {@link module:ol/extent~Extent extent} of the layer or `undefined` if it
     * will be visible regardless of extent.
     * @return {import("../extent.js").Extent|undefined} The layer extent.
     * @observable
     * @api
     */
    getExtent(): number[] | undefined;
    /**
     * Return the maximum resolution of the layer.
     * @return {number} The maximum resolution of the layer.
     * @observable
     * @api
     */
    getMaxResolution(): number;
    /**
     * Return the minimum resolution of the layer.
     * @return {number} The minimum resolution of the layer.
     * @observable
     * @api
     */
    getMinResolution(): number;
    /**
     * Return the minimum zoom level of the layer.
     * @return {number} The minimum zoom level of the layer.
     * @observable
     * @api
     */
    getMinZoom(): number;
    /**
     * Return the maximum zoom level of the layer.
     * @return {number} The maximum zoom level of the layer.
     * @observable
     * @api
     */
    getMaxZoom(): number;
    /**
     * Return the opacity of the layer (between 0 and 1).
     * @return {number} The opacity of the layer.
     * @observable
     * @api
     */
    getOpacity(): number;
    /**
     * @abstract
     * @return {import("../source/State.js").default} Source state.
     */
    getSourceState(): any;
    /**
     * Return the visibility of the layer (`true` or `false`).
     * @return {boolean} The visibility of the layer.
     * @observable
     * @api
     */
    getVisible(): boolean;
    /**
     * Return the Z-index of the layer, which is used to order layers before
     * rendering. The default Z-index is 0.
     * @return {number} The Z-index of the layer.
     * @observable
     * @api
     */
    getZIndex(): number;
    /**
     * Set the extent at which the layer is visible.  If `undefined`, the layer
     * will be visible at all extents.
     * @param {import("../extent.js").Extent|undefined} extent The extent of the layer.
     * @observable
     * @api
     */
    setExtent(extent: number[] | undefined): void;
    /**
     * Set the maximum resolution at which the layer is visible.
     * @param {number} maxResolution The maximum resolution of the layer.
     * @observable
     * @api
     */
    setMaxResolution(maxResolution: number): void;
    /**
     * Set the minimum resolution at which the layer is visible.
     * @param {number} minResolution The minimum resolution of the layer.
     * @observable
     * @api
     */
    setMinResolution(minResolution: number): void;
    /**
     * Set the maximum zoom (exclusive) at which the layer is visible.
     * Note that the zoom levels for layer visibility are based on the
     * view zoom level, which may be different from a tile source zoom level.
     * @param {number} maxZoom The maximum zoom of the layer.
     * @observable
     * @api
     */
    setMaxZoom(maxZoom: number): void;
    /**
     * Set the minimum zoom (inclusive) at which the layer is visible.
     * Note that the zoom levels for layer visibility are based on the
     * view zoom level, which may be different from a tile source zoom level.
     * @param {number} minZoom The minimum zoom of the layer.
     * @observable
     * @api
     */
    setMinZoom(minZoom: number): void;
    /**
     * Set the opacity of the layer, allowed values range from 0 to 1.
     * @param {number} opacity The opacity of the layer.
     * @observable
     * @api
     */
    setOpacity(opacity: number): void;
    /**
     * Set the visibility of the layer (`true` or `false`).
     * @param {boolean} visible The visibility of the layer.
     * @observable
     * @api
     */
    setVisible(visible: boolean): void;
    /**
     * Set Z-index of the layer, which is used to order layers before rendering.
     * The default Z-index is 0.
     * @param {number} zindex The z-index of the layer.
     * @observable
     * @api
     */
    setZIndex(zindex: number): void;
}
import BaseObject from "../Object.js";
//# sourceMappingURL=Base.d.ts.map