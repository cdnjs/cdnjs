export default ReprojImage;
export type FunctionType = (arg0: import("../extent.js").Extent, arg1: number, arg2: number) => import("../Image.js").default;
/**
 * @typedef {function(import("../extent.js").Extent, number, number) : import("../Image.js").default} FunctionType
 */
/**
 * @classdesc
 * Class encapsulating single reprojected image.
 * See {@link module:ol/source/Image~ImageSource}.
 */
declare class ReprojImage extends ImageWrapper {
    /**
     * @param {import("../proj/Projection.js").default} sourceProj Source projection (of the data).
     * @param {import("../proj/Projection.js").default} targetProj Target projection.
     * @param {import("../extent.js").Extent} targetExtent Target extent.
     * @param {number} targetResolution Target resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {FunctionType} getImageFunction
     *     Function returning source images (extent, resolution, pixelRatio).
     * @param {boolean} interpolate Use linear interpolation when resampling.
     */
    constructor(sourceProj: import("../proj/Projection.js").default, targetProj: import("../proj/Projection.js").default, targetExtent: import("../extent.js").Extent, targetResolution: number, pixelRatio: number, getImageFunction: FunctionType, interpolate: boolean);
    /**
     * @private
     * @type {import("../proj/Projection.js").default}
     */
    private targetProj_;
    /**
     * @private
     * @type {import("../extent.js").Extent}
     */
    private maxSourceExtent_;
    /**
     * @private
     * @type {!import("./Triangulation.js").default}
     */
    private triangulation_;
    /**
     * @private
     * @type {number}
     */
    private targetResolution_;
    /**
     * @private
     * @type {import("../extent.js").Extent}
     */
    private targetExtent_;
    /**
     * @private
     * @type {import("../Image.js").default}
     */
    private sourceImage_;
    /**
     * @private
     * @type {number}
     */
    private sourcePixelRatio_;
    /**
     * @private
     * @type {boolean}
     */
    private interpolate_;
    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    private canvas_;
    /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */
    private sourceListenerKey_;
    /**
     * @return {HTMLCanvasElement} Image.
     * @override
     */
    override getImage(): HTMLCanvasElement;
    /**
     * @return {import("../proj/Projection.js").default} Projection.
     */
    getProjection(): import("../proj/Projection.js").default;
    /**
     * @private
     */
    private reproject_;
    /**
     * @private
     */
    private unlistenSource_;
}
import ImageWrapper from '../Image.js';
//# sourceMappingURL=Image.d.ts.map