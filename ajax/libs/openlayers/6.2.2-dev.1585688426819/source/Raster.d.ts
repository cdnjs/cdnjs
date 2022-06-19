/**
 * @classdesc
 * Events emitted by {@link module:ol/source/Raster} instances are instances of this
 * type.
 */
export class RasterSourceEvent extends Event {
    /**
     * @param {string} type Type.
     * @param {import("../PluggableMap.js").FrameState} frameState The frame state.
     * @param {Object} data An object made available to operations.
     */
    constructor(type: string, frameState: import("../PluggableMap.js").FrameState, data: any);
    /**
     * The raster extent.
     * @type {import("../extent.js").Extent}
     * @api
     */
    extent: import("../extent.js").Extent;
    /**
     * The pixel resolution (map units per pixel).
     * @type {number}
     * @api
     */
    resolution: number;
    /**
     * An object made available to all operations.  This can be used by operations
     * as a storage object (e.g. for calculating statistics).
     * @type {Object}
     * @api
     */
    data: Object;
}
export default RasterSource;
/**
 * A function that takes an array of input data, performs some operation, and
 * returns an array of output data.
 * For `pixel` type operations, the function will be called with an array of
 * pixels, where each pixel is an array of four numbers (`[r, g, b, a]`) in the
 * range of 0 - 255. It should return a single pixel array.
 * For `'image'` type operations, functions will be called with an array of
 * {@link ImageData https://developer.mozilla.org/en-US/docs/Web/API/ImageData}
 * and should return a single {@link ImageData
 * https://developer.mozilla.org/en-US/docs/Web/API/ImageData}.  The operations
 * are called with a second "data" argument, which can be used for storage.  The
 * data object is accessible from raster events, where it can be initialized in
 * "beforeoperations" and accessed again in "afteroperations".
 */
export type Operation = (arg0: number[][] | ImageData[], arg1: any) => number[] | ImageData;
export type RasterEventType = string;
/**
 * Raster operation type. Supported values are `'pixel'` and `'image'`.
 */
export type RasterOperationType = string;
export type Options = {
    /**
     * Input
     * sources or layers.  For vector data, use an VectorImage layer.
     */
    sources: (Source | import("../layer/Layer.js").default<any>)[];
    /**
     * Raster operation.
     * The operation will be called with data from input sources
     * and the output will be assigned to the raster source.
     */
    operation?: (arg0: number[][] | ImageData[], arg1: any) => number[] | ImageData;
    /**
     * Functions that will be made available to operations run in a worker.
     */
    lib?: any;
    /**
     * By default, operations will be run in a single worker thread.
     * To avoid using workers altogether, set `threads: 0`.  For pixel operations, operations can
     * be run in multiple worker threads.  Note that there is additional overhead in
     * transferring data to multiple workers, and that depending on the user's
     * system, it may not be possible to parallelize the work.
     */
    threads?: number;
    /**
     * Operation type.
     * Supported values are `'pixel'` and `'image'`.  By default,
     * `'pixel'` operations are assumed, and operations will be called with an
     * array of pixels from input sources.  If set to `'image'`, operations will
     * be called with an array of ImageData objects from input sources.
     */
    operationType?: string;
};
import Event from "../events/Event.js";
/**
 * @typedef {Object} Options
 * @property {Array<import("./Source.js").default|import("../layer/Layer.js").default>} sources Input
 * sources or layers.  For vector data, use an VectorImage layer.
 * @property {Operation} [operation] Raster operation.
 * The operation will be called with data from input sources
 * and the output will be assigned to the raster source.
 * @property {Object} [lib] Functions that will be made available to operations run in a worker.
 * @property {number} [threads] By default, operations will be run in a single worker thread.
 * To avoid using workers altogether, set `threads: 0`.  For pixel operations, operations can
 * be run in multiple worker threads.  Note that there is additional overhead in
 * transferring data to multiple workers, and that depending on the user's
 * system, it may not be possible to parallelize the work.
 * @property {RasterOperationType} [operationType='pixel'] Operation type.
 * Supported values are `'pixel'` and `'image'`.  By default,
 * `'pixel'` operations are assumed, and operations will be called with an
 * array of pixels from input sources.  If set to `'image'`, operations will
 * be called with an array of ImageData objects from input sources.
 */
/**
 * @classdesc
 * A source that transforms data from any number of input sources using an
 * {@link module:ol/source/Raster~Operation} function to transform input pixel values into
 * output pixel values.
 *
 * @fires module:ol/source/Raster.RasterSourceEvent
 * @api
 */
declare class RasterSource extends ImageSource {
    /**
     * @param {Options} options Options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {*}
     */
    private worker_;
    /**
     * @private
     * @type {RasterOperationType}
     */
    private operationType_;
    /**
     * @private
     * @type {number}
     */
    private threads_;
    /**
     * @private
     * @type {Array<import("../layer/Layer.js").default>}
     */
    private layers_;
    /**
     * @private
     * @type {import("../TileQueue.js").default}
     */
    private tileQueue_;
    /**
     * The most recently requested frame state.
     * @type {import("../PluggableMap.js").FrameState}
     * @private
     */
    private requestedFrameState_;
    /**
     * The most recently rendered image canvas.
     * @type {import("../ImageCanvas.js").default}
     * @private
     */
    private renderedImageCanvas_;
    /**
     * The most recently rendered revision.
     * @type {number}
     */
    renderedRevision_: number;
    /**
     * @private
     * @type {import("../PluggableMap.js").FrameState}
     */
    private frameState_;
    /**
     * Set the operation.
     * @param {Operation} operation New operation.
     * @param {Object=} opt_lib Functions that will be available to operations run
     *     in a worker.
     * @api
     */
    setOperation(operation: (arg0: number[][] | ImageData[], arg1: any) => number[] | ImageData, opt_lib?: any): void;
    /**
     * Update the stored frame state.
     * @param {import("../extent.js").Extent} extent The view extent (in map units).
     * @param {number} resolution The view resolution.
     * @param {import("../proj/Projection.js").default} projection The view projection.
     * @return {import("../PluggableMap.js").FrameState} The updated frame state.
     * @private
     */
    private updateFrameState_;
    /**
     * Determine if all sources are ready.
     * @return {boolean} All sources are ready.
     * @private
     */
    private allSourcesReady_;
    /**
     * @inheritDoc
     */
    getImage(extent: any, resolution: any, pixelRatio: any, projection: any): ImageCanvas;
    /**
     * Start processing source data.
     * @private
     */
    private processSources_;
    /**
     * Called when pixel processing is complete.
     * @param {import("../PluggableMap.js").FrameState} frameState The frame state.
     * @param {Error} err Any error during processing.
     * @param {ImageData} output The output image data.
     * @param {Object} data The user data.
     * @private
     */
    private onWorkerComplete_;
    /**
     * @override
     */
    getImageInternal(): any;
}
import Source from "./Source.js";
import ImageSource from "./Image.js";
import ImageCanvas from "../ImageCanvas.js";
//# sourceMappingURL=Raster.d.ts.map