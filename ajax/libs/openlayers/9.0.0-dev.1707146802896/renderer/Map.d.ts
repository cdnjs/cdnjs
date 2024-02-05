export default MapRenderer;
export type HitMatch<T> = {
    /**
     * Feature.
     */
    feature: import("../Feature.js").FeatureLike;
    /**
     * Layer.
     */
    layer: import("../layer/Layer.js").default;
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
    callback: import("./vector.js").FeatureCallback<T>;
};
/**
 * @template T
 * @typedef HitMatch
 * @property {import("../Feature.js").FeatureLike} feature Feature.
 * @property {import("../layer/Layer.js").default} layer Layer.
 * @property {import("../geom/SimpleGeometry.js").default} geometry Geometry.
 * @property {number} distanceSq Squared distance.
 * @property {import("./vector.js").FeatureCallback<T>} callback Callback.
 */
/**
 * @abstract
 */
declare class MapRenderer extends Disposable {
    /**
     * @param {import("../Map.js").default} map Map.
     */
    constructor(map: import("../Map.js").default);
    /**
     * @private
     * @type {import("../Map.js").default}
     */
    private map_;
    /**
     * @abstract
     * @param {import("../render/EventType.js").default} type Event type.
     * @param {import("../Map.js").FrameState} frameState Frame state.
     */
    dispatchRenderEvent(type: any, frameState: import("../Map.js").FrameState): void;
    /**
     * @param {import("../Map.js").FrameState} frameState FrameState.
     * @protected
     */
    protected calculateMatrices2D(frameState: import("../Map.js").FrameState): void;
    /**
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../Map.js").FrameState} frameState FrameState.
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
    forEachFeatureAtCoordinate<S, T, U>(coordinate: import("../coordinate.js").Coordinate, frameState: import("../Map.js").FrameState, hitTolerance: number, checkWrapped: boolean, callback: import("./vector.js").FeatureCallback<T>, thisArg: S, layerFilter: (this: U, arg1: import("../layer/Layer.js").default) => boolean, thisArg2: U): T | undefined;
    /**
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../Map.js").FrameState} frameState FrameState.
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
    hasFeatureAtCoordinate<U_1>(coordinate: import("../coordinate.js").Coordinate, frameState: import("../Map.js").FrameState, hitTolerance: number, checkWrapped: boolean, layerFilter: (this: U_1, arg1: import("../layer/Layer.js").default) => boolean, thisArg: U_1): boolean;
    /**
     * @return {import("../Map.js").default} Map.
     */
    getMap(): import("../Map.js").default;
    /**
     * Render.
     * @abstract
     * @param {?import("../Map.js").FrameState} frameState Frame state.
     */
    renderFrame(frameState: import("../Map.js").FrameState | null): void;
    /**
     * @param {import("../Map.js").FrameState} frameState Frame state.
     */
    flushDeclutterItems(frameState: import("../Map.js").FrameState): void;
    /**
     * @param {import("../Map.js").FrameState} frameState Frame state.
     * @protected
     */
    protected scheduleExpireIconCache(frameState: import("../Map.js").FrameState): void;
}
import Disposable from '../Disposable.js';
//# sourceMappingURL=Map.d.ts.map