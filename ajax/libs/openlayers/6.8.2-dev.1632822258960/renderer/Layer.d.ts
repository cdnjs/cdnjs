export default LayerRenderer;
/**
 * @template {import("../layer/Layer.js").default} LayerType
 */
declare class LayerRenderer<LayerType extends import("../layer/Layer.js").default<any>> extends Observable {
    /**
     * @param {LayerType} layer Layer.
     */
    constructor(layer: LayerType);
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
    getFeatures(pixel: number[]): Promise<import("../Feature.js").default<any>[]>;
    /**
     * Determine whether render should be called.
     * @abstract
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     * @return {boolean} Layer is ready to be rendered.
     */
    prepareFrame(frameState: import("../PluggableMap.js").FrameState): boolean;
    /**
     * Render the layer.
     * @abstract
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     * @param {HTMLElement} target Target that may be used to render content to.
     * @return {HTMLElement} The rendered element.
     */
    renderFrame(frameState: import("../PluggableMap.js").FrameState, target: HTMLElement): HTMLElement;
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
     * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
     * @param {Array<import("./Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
     * @return {T|undefined} Callback result.
     * @template T
     */
    forEachFeatureAtCoordinate<T>(coordinate: number[], frameState: import("../PluggableMap.js").FrameState, hitTolerance: number, callback: (arg0: import("../render/Feature.js").default | import("../Feature.js").default<import("../geom/Geometry.js").default>, arg1: import("../layer/Layer.js").default<import("../source/Source.js").default>, arg2: import("../geom/SimpleGeometry.js").default) => T, matches: import("./Map.js").HitMatch<T>[]): T | undefined;
    /**
     * @abstract
     * @param {import("../pixel.js").Pixel} pixel Pixel.
     * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @return {Uint8ClampedArray|Uint8Array} The result.  If there is no data at the pixel
     *    location, null will be returned.  If there is data, but pixel values cannot be
     *    returned, and empty array will be returned.
     */
    getDataAtPixel(pixel: number[], frameState: import("../PluggableMap.js").FrameState, hitTolerance: number): Uint8Array | Uint8ClampedArray;
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