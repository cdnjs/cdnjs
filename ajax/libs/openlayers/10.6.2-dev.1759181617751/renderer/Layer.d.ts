export default LayerRenderer;
/**
 * @template {import("../layer/Layer.js").default} LayerType
 */
declare class LayerRenderer<LayerType extends import("../layer/Layer.js").default> extends Observable {
    /**
     * @param {LayerType} layer Layer.
     */
    constructor(layer: LayerType);
    /**
     * The renderer is initialized and ready to render.
     * @type {boolean}
     */
    ready: boolean;
    /** @private */
    private boundHandleImageChange_;
    /**
     * @private
     * @type {LayerType}
     */
    private layer_;
    /**
     * @type {Array<string>}
     * @private
     */
    private staleKeys_;
    /**
     * @type {number}
     * @protected
     */
    protected maxStaleKeys: number;
    /**
     * @return {Array<string>} Get the list of stale keys.
     */
    getStaleKeys(): Array<string>;
    /**
     * @param {string} key The new stale key.
     */
    prependStaleKey(key: string): void;
    /**
     * Asynchronous layer level hit detection.
     * @param {import("../pixel.js").Pixel} pixel Pixel.
     * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with
     * an array of features.
     */
    getFeatures(pixel: import("../pixel.js").Pixel): Promise<Array<import("../Feature").FeatureLike>>;
    /**
     * @param {import("../pixel.js").Pixel} pixel Pixel.
     * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
     */
    getData(pixel: import("../pixel.js").Pixel): Uint8ClampedArray | Uint8Array | Float32Array | DataView | null;
    /**
     * Determine whether render should be called.
     * @abstract
     * @param {import("../Map.js").FrameState} frameState Frame state.
     * @return {boolean} Layer is ready to be rendered.
     */
    prepareFrame(frameState: import("../Map.js").FrameState): boolean;
    /**
     * Render the layer.
     * @abstract
     * @param {import("../Map.js").FrameState} frameState Frame state.
     * @param {HTMLElement|null} target Target that may be used to render content to.
     * @return {HTMLElement} The rendered element.
     */
    renderFrame(frameState: import("../Map.js").FrameState, target: HTMLElement | null): HTMLElement;
    /**
     * @abstract
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../Map.js").FrameState} frameState Frame state.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
     * @param {Array<import("./Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
     * @return {T|undefined} Callback result.
     * @template T
     */
    forEachFeatureAtCoordinate<T>(coordinate: import("../coordinate.js").Coordinate, frameState: import("../Map.js").FrameState, hitTolerance: number, callback: import("./vector.js").FeatureCallback<T>, matches: Array<import("./Map.js").HitMatch<T>>): T | undefined;
    /**
     * @return {LayerType} Layer.
     */
    getLayer(): LayerType;
    /**
     * Perform action necessary to get the layer rendered after new fonts have loaded
     * @abstract
     */
    handleFontsChanged(): void;
    /**
     * Handle changes in image state.
     * @param {import("../events/Event.js").default} event Image change event.
     * @private
     */
    private handleImageChange_;
    /**
     * Load the image if not already loaded, and register the image change
     * listener if needed.
     * @param {import("../Image.js").default} image Image.
     * @return {boolean} `true` if the image is already loaded, `false` otherwise.
     * @protected
     */
    protected loadImage(image: import("../Image.js").default): boolean;
    /**
     * @protected
     */
    protected renderIfReadyAndVisible(): void;
    /**
     * @param {import("../Map.js").FrameState} frameState Frame state.
     */
    renderDeferred(frameState: import("../Map.js").FrameState): void;
}
import Observable from '../Observable.js';
//# sourceMappingURL=Layer.d.ts.map