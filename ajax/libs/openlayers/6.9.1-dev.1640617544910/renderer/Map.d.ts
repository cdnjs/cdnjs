export default MapRenderer;
export type HitMatch<T> = {
    /**
     * Feature.
     */
    feature: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default;
    /**
     * Layer.
     */
    layer: import("../layer/Layer.js").default<any, any>;
    /**
     * Geometry.
     */
    geometry: import("../geom/SimpleGeometry.js").default;
    /**
     * Squared distance.
     */
    distanceSq: number;
    /**
     * Callback.
     */
    callback: (arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: import("../layer/Layer.js").default<import("../source/Source.js").default, any>, arg2: import("../geom/SimpleGeometry.js").default) => T;
};
/**
 * @typedef HitMatch
 * @property {import("../Feature.js").FeatureLike} feature Feature.
 * @property {import("../layer/Layer.js").default} layer Layer.
 * @property {import("../geom/SimpleGeometry.js").default} geometry Geometry.
 * @property {number} distanceSq Squared distance.
 * @property {import("./vector.js").FeatureCallback<T>} callback Callback.
 * @template T
 */
/**
 * @abstract
 */
declare class MapRenderer extends Disposable {
    /**
     * @param {import("../PluggableMap.js").default} map Map.
     */
    constructor(map: import("../PluggableMap.js").default);
    /**
     * @private
     * @type {import("../PluggableMap.js").default}
     */
    private map_;
    /**
     * @abstract
     * @param {import("../render/EventType.js").default} type Event type.
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     */
    dispatchRenderEvent(type: any, frameState: import("../PluggableMap.js").FrameState): void;
    /**
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @protected
     */
    protected calculateMatrices2D(frameState: import("../PluggableMap.js").FrameState): void;
    /**
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {boolean} checkWrapped Check for wrapped geometries.
     * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
     * @param {S} thisArg Value to use as `this` when executing `callback`.
     * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
     *     function, only layers which are visible and for which this function
     *     returns `true` will be tested for features.  By default, all visible
     *     layers will be tested.
     * @param {U} thisArg2 Value to use as `this` when executing `layerFilter`.
     * @return {T|undefined} Callback result.
     * @template S,T,U
     */
    forEachFeatureAtCoordinate<S, T, U>(coordinate: number[], frameState: import("../PluggableMap.js").FrameState, hitTolerance: number, checkWrapped: boolean, callback: (arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: import("../layer/Layer.js").default<import("../source/Source.js").default, any>, arg2: import("../geom/SimpleGeometry.js").default) => T, thisArg: S, layerFilter: (this: U, arg1: import("../layer/Layer.js").default<any, any>) => boolean, thisArg2: U): T | undefined;
    /**
     * @abstract
     * @param {import("../pixel.js").Pixel} pixel Pixel.
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {function(import("../layer/Layer.js").default<import("../source/Source").default>, (Uint8ClampedArray|Uint8Array)): T} callback Layer
     *     callback.
     * @param {function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean} layerFilter Layer filter
     *     function, only layers which are visible and for which this function
     *     returns `true` will be tested for features.  By default, all visible
     *     layers will be tested.
     * @return {T|undefined} Callback result.
     * @template T
     */
    forEachLayerAtPixel<T_1>(pixel: number[], frameState: import("../PluggableMap.js").FrameState, hitTolerance: number, callback: (arg0: import("../layer/Layer.js").default<import("../source/Source.js").default, any>, arg1: Uint8ClampedArray | Uint8Array) => T_1, layerFilter: (arg0: import("../layer/Layer.js").default<import("../source/Source.js").default, any>) => boolean): T_1 | undefined;
    /**
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {boolean} checkWrapped Check for wrapped geometries.
     * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
     *     function, only layers which are visible and for which this function
     *     returns `true` will be tested for features.  By default, all visible
     *     layers will be tested.
     * @param {U} thisArg Value to use as `this` when executing `layerFilter`.
     * @return {boolean} Is there a feature at the given coordinate?
     * @template U
     */
    hasFeatureAtCoordinate<U_1>(coordinate: number[], frameState: import("../PluggableMap.js").FrameState, hitTolerance: number, checkWrapped: boolean, layerFilter: (this: U_1, arg1: import("../layer/Layer.js").default<any, any>) => boolean, thisArg: U_1): boolean;
    /**
     * @return {import("../PluggableMap.js").default} Map.
     */
    getMap(): import("../PluggableMap.js").default;
    /**
     * Render.
     * @abstract
     * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
     */
    renderFrame(frameState: import("../PluggableMap.js").FrameState | null): void;
    /**
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    protected scheduleExpireIconCache(frameState: import("../PluggableMap.js").FrameState): void;
}
import Disposable from "../Disposable.js";
//# sourceMappingURL=Map.d.ts.map