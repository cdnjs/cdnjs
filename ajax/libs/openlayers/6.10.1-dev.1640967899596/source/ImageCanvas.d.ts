export default ImageCanvasSource;
/**
 * A function returning the canvas element (`{HTMLCanvasElement}`)
 * used by the source as an image. The arguments passed to the function are:
 * {@link module:ol/extent~Extent} the image extent, `{number}` the image resolution,
 * `{number}` the pixel ratio of the map, {@link module:ol/size~Size} the image size,
 * and {@link module:ol/proj/Projection} the image projection. The canvas returned by
 * this function is cached by the source. The this keyword inside the function
 * references the {@link module:ol/source/ImageCanvas}.
 */
export type FunctionType = (this: ImageCanvas, arg1: number[], arg2: number, arg3: number, arg4: number[], arg5: import("../proj/Projection.js").default) => HTMLCanvasElement;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: string | string[] | ((arg0: import("../PluggableMap.js").FrameState) => string | string[]);
    /**
     * Canvas function.
     * The function returning the canvas element used by the source
     * as an image. The arguments passed to the function are: `{import("../extent.js").Extent}` the
     * image extent, `{number}` the image resolution, `{number}` the pixel ratio of the map,
     * `{import("../size.js").Size}` the image size, and `{import("../proj/Projection.js").Projection}` the image
     * projection. The canvas returned by this function is cached by the source. If
     * the value returned by the function is later changed then
     * `changed` should be called on the source for the source to
     * invalidate the current cached image. See: {@link module:ol/Observable~Observable#changed}
     */
    canvasFunction?: (this: ImageCanvas, arg1: number[], arg2: number, arg3: number, arg4: number[], arg5: import("../proj/Projection.js").default) => HTMLCanvasElement;
    /**
     * Deprecated.  Use the `interpolate` option instead.
     */
    imageSmoothing?: boolean;
    /**
     * Use interpolated values when resampling.  By default,
     * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
     */
    interpolate?: boolean;
    /**
     * Projection. Default is the view projection.
     */
    projection?: string | import("../proj/Projection.js").default | undefined;
    /**
     * Ratio. 1 means canvases are the size of the map viewport, 2 means twice the
     * width and height of the map viewport, and so on. Must be `1` or higher.
     */
    ratio?: number;
    /**
     * Resolutions.
     * If specified, new canvases will be created for these resolutions
     */
    resolutions?: number[];
    /**
     * Source state.
     */
    state?: any;
};
/**
 * A function returning the canvas element (`{HTMLCanvasElement}`)
 * used by the source as an image. The arguments passed to the function are:
 * {@link module:ol/extent~Extent} the image extent, `{number}` the image resolution,
 * `{number}` the pixel ratio of the map, {@link module:ol/size~Size} the image size,
 * and {@link module:ol/proj/Projection} the image projection. The canvas returned by
 * this function is cached by the source. The this keyword inside the function
 * references the {@link module:ol/source/ImageCanvas}.
 *
 * @typedef {function(this:import("../ImageCanvas.js").default, import("../extent.js").Extent, number,
 *     number, import("../size.js").Size, import("../proj/Projection.js").default): HTMLCanvasElement} FunctionType
 */
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {FunctionType} [canvasFunction] Canvas function.
 * The function returning the canvas element used by the source
 * as an image. The arguments passed to the function are: `{import("../extent.js").Extent}` the
 * image extent, `{number}` the image resolution, `{number}` the pixel ratio of the map,
 * `{import("../size.js").Size}` the image size, and `{import("../proj/Projection.js").Projection}` the image
 * projection. The canvas returned by this function is cached by the source. If
 * the value returned by the function is later changed then
 * `changed` should be called on the source for the source to
 * invalidate the current cached image. See: {@link module:ol/Observable~Observable#changed}
 * @property {boolean} [imageSmoothing=true] Deprecated.  Use the `interpolate` option instead.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [ratio=1.5] Ratio. 1 means canvases are the size of the map viewport, 2 means twice the
 * width and height of the map viewport, and so on. Must be `1` or higher.
 * @property {Array<number>} [resolutions] Resolutions.
 * If specified, new canvases will be created for these resolutions
 * @property {import("./State.js").default} [state] Source state.
 */
/**
 * @classdesc
 * Base class for image sources where a canvas element is the image.
 * @api
 */
declare class ImageCanvasSource extends ImageSource {
    /**
     * @param {Options} [opt_options] ImageCanvas options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @private
     * @type {FunctionType}
     */
    private canvasFunction_;
    /**
     * @private
     * @type {import("../ImageCanvas.js").default}
     */
    private canvas_;
    /**
     * @private
     * @type {number}
     */
    private renderedRevision_;
    /**
     * @private
     * @type {number}
     */
    private ratio_;
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../ImageCanvas.js").default} Single image.
     */
    getImageInternal(extent: number[], resolution: number, pixelRatio: number, projection: import("../proj/Projection.js").default): ImageCanvas;
}
import ImageCanvas from "../ImageCanvas.js";
import ImageSource from "./Image.js";
//# sourceMappingURL=ImageCanvas.d.ts.map