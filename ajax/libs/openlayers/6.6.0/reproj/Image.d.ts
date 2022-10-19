export default ReprojImage;
export type FunctionType = (arg0: number[], arg1: number, arg2: number) => ImageBase;
/**
 * @typedef {function(import("../extent.js").Extent, number, number) : import("../ImageBase.js").default} FunctionType
 */
/**
 * @classdesc
 * Class encapsulating single reprojected image.
 * See {@link module:ol/source/Image~ImageSource}.
 */
declare class ReprojImage extends ImageBase {
    /**
     * @param {import("../proj/Projection.js").default} sourceProj Source projection (of the data).
     * @param {import("../proj/Projection.js").default} targetProj Target projection.
     * @param {import("../extent.js").Extent} targetExtent Target extent.
     * @param {number} targetResolution Target resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {FunctionType} getImageFunction
     *     Function returning source images (extent, resolution, pixelRatio).
     * @param {object} [opt_contextOptions] Properties to set on the canvas context.
     */
    constructor(sourceProj: import("../proj/Projection.js").default, targetProj: import("../proj/Projection.js").default, targetExtent: number[], targetResolution: number, pixelRatio: number, getImageFunction: (arg0: number[], arg1: number, arg2: number) => ImageBase, opt_contextOptions?: any);
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
     * @type {import("../ImageBase.js").default}
     */
    private sourceImage_;
    /**
     * @private
     * @type {number}
     */
    private sourcePixelRatio_;
    /**
     * @private
     * @type {object}
     */
    private contextOptions_;
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
     */
    getImage(): HTMLCanvasElement;
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
import ImageBase from "../ImageBase.js";
//# sourceMappingURL=Image.d.ts.map