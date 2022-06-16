/**
 * Default image load function for image sources that use import("../Image.js").Image image
 * instances.
 * @param {import("../Image.js").default} image Image.
 * @param {string} src Source.
 */
export function defaultImageLoadFunction(image: import("../Image.js").default, src: string): void;
/**
 * @classdesc
 * Events emitted by {@link module:ol/source/Image~ImageSource} instances are instances of this
 * type.
 */
export class ImageSourceEvent extends Event {
    /**
     * @param {string} type Type.
     * @param {import("../Image.js").default} image The image.
     */
    constructor(type: string, image: import("../Image.js").default);
    /**
     * The image related to the event.
     * @type {import("../Image.js").default}
     * @api
     */
    image: import("../Image.js").default;
}
export default ImageSource;
export type ImageSourceEventType = string;
export type Options = {
    attributions?: string | string[] | ((arg0: import("../PluggableMap.js").FrameState) => string | string[]);
    projection?: string | import("../proj/Projection.js").default;
    resolutions?: number[];
    state?: any;
};
import Event from "../events/Event.js";
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions]
 * @property {import("../proj.js").ProjectionLike} [projection]
 * @property {Array<number>} [resolutions]
 * @property {import("./State.js").default} [state]
 */
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for sources providing a single image.
 * @abstract
 * @fires module:ol/source/Image.ImageSourceEvent
 * @api
 */
declare class ImageSource extends Source {
    /**
     * @param {Options} options Single image source options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {Array<number>}
     */
    private resolutions_;
    /**
     * @private
     * @type {import("../reproj/Image.js").default}
     */
    private reprojectedImage_;
    /**
     * @private
     * @type {number}
     */
    private reprojectedRevision_;
    /**
     * @protected
     * @param {number} resolution Resolution.
     * @return {number} Resolution.
     */
    protected findNearestResolution(resolution: number): number;
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../ImageBase.js").default} Single image.
     */
    getImage(extent: number[], resolution: number, pixelRatio: number, projection: import("../proj/Projection.js").default): import("../ImageBase.js").default;
    /**
     * @abstract
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../ImageBase.js").default} Single image.
     * @protected
     */
    protected getImageInternal(extent: number[], resolution: number, pixelRatio: number, projection: import("../proj/Projection.js").default): import("../ImageBase.js").default;
    /**
     * Handle image change events.
     * @param {import("../events/Event.js").default} event Event.
     * @protected
     */
    protected handleImageChange(event: Event): void;
}
import Source from "./Source.js";
//# sourceMappingURL=Image.d.ts.map