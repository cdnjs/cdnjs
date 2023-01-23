export default ImageCanvasSource;
/**
 * A function returning the canvas element (`{HTMLCanvasElement}`)
 * used by the source as an image. The arguments passed to the function are:
 * {@link module :ol/extent~Extent} the image extent, `{number}` the image resolution,
 * `{number}` the pixel ratio of the map, {@link module :ol/size~Size} the image size,
 * and {@link module :ol/proj/Projection~Projection} the image projection. The canvas returned by
 * this function is cached by the source. The this keyword inside the function
 * references the {@link module :ol/source/ImageCanvas~ImageCanvasSource}.
 */
export type FunctionType = (this: import("../ImageCanvas.js").default, arg1: import("../extent.js").Extent, arg2: number, arg3: number, arg4: import("../size.js").Size, arg5: import("../proj/Projection.js").default) => HTMLCanvasElement;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: import("./Source.js").AttributionLike | undefined;
    /**
     * Canvas function.
     * The function returning the canvas element used by the source
     * as an image. The arguments passed to the function are: {@link import ("../extent.js").Extent} the
     * image extent, `{number}` the image resolution, `{number}` the pixel ratio of the map,
     * {@link import ("../size.js").Size} the image size, and {@link import ("../proj/Projection.js").default} the image
     * projection. The canvas returned by this function is cached by the source. If
     * the value returned by the function is later changed then
     * `changed` should be called on the source for the source to
     * invalidate the current cached image. See: {@link module :ol/Observable~Observable#changed}
     */
    canvasFunction?: FunctionType | undefined;
    /**
     * Deprecated.  Use the `interpolate` option instead.
     */
    imageSmoothing?: boolean | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
     */
    interpolate?: boolean | undefined;
    /**
     * Projection. Default is the view projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Ratio. 1 means canvases are the size of the map viewport, 2 means twice the
     * width and height of the map viewport, and so on. Must be `1` or higher.
     */
    ratio?: number | undefined;
    /**
     * Resolutions.
     * If specified, new canvases will be created for these resolutions
     */
    resolutions?: number[] | undefined;
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
 * and {@link module:ol/proj/Projection~Projection} the image projection. The canvas returned by
 * this function is cached by the source. The this keyword inside the function
 * references the {@link module:ol/source/ImageCanvas~ImageCanvasSource}.
 *
 * @typedef {function(this:import("../ImageCanvas.js").default, import("../extent.js").Extent, number,
 *     number, import("../size.js").Size, import("../proj/Projection.js").default): HTMLCanvasElement} FunctionType
 */
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {FunctionType} [canvasFunction] Canvas function.
 * The function returning the canvas element used by the source
 * as an image. The arguments passed to the function are: {@link import("../extent.js").Extent} the
 * image extent, `{number}` the image resolution, `{number}` the pixel ratio of the map,
 * {@link import("../size.js").Size} the image size, and {@link import("../proj/Projection.js").default} the image
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
    getImageInternal(extent: import("../extent.js").Extent, resolution: number, pixelRatio: number, projection: import("../proj/Projection.js").default): import("../ImageCanvas.js").default;
}
import ImageSource from "./Image.js";
//# sourceMappingURL=ImageCanvas.d.ts.map