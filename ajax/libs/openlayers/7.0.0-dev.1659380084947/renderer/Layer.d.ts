export default LayerRenderer;
/**
 * @template {import("../layer/Layer.js").default} LayerType
 */
declare class LayerRenderer<LayerType extends import("../layer/Layer.js").default<import("../source/Source.js").default, LayerRenderer<any>>> extends Observable {
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
     * @protected
     * @type {LayerType}
     */
    protected layer_: LayerType;
    /**
     * @type {import("../render/canvas/ExecutorGroup").default}
     */
    declutterExecutorGroup: import("../render/canvas/ExecutorGroup").default;
    /**
     * Asynchronous layer level hit detection.
     * @param {import("../pixel.js").Pixel} pixel Pixel.
     * @return {Promise<Array<import("../Feature").default>>} Promise that resolves with
     * an array of features.
     */
    getFeatures(pixel: import("../pixel.js").Pixel): Promise<Array<import("../Feature").default>>;
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
     * @param {HTMLElement} target Target that may be used to render content to.
     * @return {HTMLElement} The rendered element.
     */
    renderFrame(frameState: import("../Map.js").FrameState, target: HTMLElement): HTMLElement;
    /**
     * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
     * @param {number} zoom Zoom level.
     * @param {import("../Tile.js").default} tile Tile.
     * @return {boolean|void} If `false`, the tile will not be considered loaded.
     */
    loadedTileCallback(tiles: {
        [x: number]: {
            [x: string]: import("../Tile.js").default;
        };
    }, zoom: number, tile: import("../Tile.js").default): boolean | void;
    /**
     * Create a function that adds loaded tiles to the tile lookup.
     * @param {import("../source/Tile.js").default} source Tile source.
     * @param {import("../proj/Projection.js").default} projection Projection of the tiles.
     * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
     * @return {function(number, import("../TileRange.js").default):boolean} A function that can be
     *     called with a zoom level and a tile range to add loaded tiles to the lookup.
     * @protected
     */
    protected createLoadedTileFinder(source: import("../source/Tile.js").default, projection: import("../proj/Projection.js").default, tiles: {
        [x: number]: {
            [x: string]: import("../Tile.js").default;
        };
    }): (arg0: number, arg1: import("../TileRange.js").default) => boolean;
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
    forEachFeatureAtCoordinate<T>(coordinate: import("../coordinate.js").Coordinate, frameState: import("../Map.js").FrameState, hitTolerance: number, callback: import("./vector.js").FeatureCallback<T>, matches: import("./Map.js").HitMatch<T>[]): T | undefined;
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
     * @param {import("../ImageBase.js").default} image Image.
     * @return {boolean} `true` if the image is already loaded, `false` otherwise.
     * @protected
     */
    protected loadImage(image: import("../ImageBase.js").default): boolean;
    /**
     * @protected
     */
    protected renderIfReadyAndVisible(): void;
}
import Observable from "../Observable.js";
//# sourceMappingURL=Layer.d.ts.map