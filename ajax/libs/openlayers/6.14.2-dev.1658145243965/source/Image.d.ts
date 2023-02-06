/**
 * Default image load function for image sources that use import("../Image.js").Image image
 * instances.
 * @param {import("../Image.js").default} image Image.
 * @param {string} src Source.
 */
export function defaultImageLoadFunction(image: import("../Image.js").default, src: string): void;
export type ImageSourceEventType = string;
export namespace ImageSourceEventType {
    const IMAGELOADSTART: string;
    const IMAGELOADEND: string;
    const IMAGELOADERROR: string;
}
/**
 * @typedef {'imageloadend'|'imageloaderror'|'imageloadstart'} ImageSourceEventTypes
 */
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
export type ImageSourceEventTypes = 'imageloadend' | 'imageloaderror' | 'imageloadstart';
/**
 * *
 */
export type ImageSourceOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> & import("../Observable").OnSignature<ImageSourceEventTypes, ImageSourceEvent, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("../ObjectEventType").Types | ImageSourceEventTypes, Return>;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: import("./Source.js").AttributionLike | undefined;
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
     * Projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Resolutions.
     */
    resolutions?: number[] | undefined;
    /**
     * State.
     */
    state?: import("./Source.js").State | undefined;
};
import Event from "../events/Event.js";
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<ImageSourceEventTypes, ImageSourceEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types
 *     |ImageSourceEventTypes, Return>} ImageSourceOnSignature
 */
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [imageSmoothing=true] Deprecated.  Use the `interpolate` option instead.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {Array<number>} [resolutions] Resolutions.
 * @property {import("./Source.js").State} [state] State.
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
    /***
     * @type {ImageSourceOnSignature<import("../events").EventsKey>}
     */
    on: ImageSourceOnSignature<import("../events").EventsKey>;
    /***
     * @type {ImageSourceOnSignature<import("../events").EventsKey>}
     */
    once: ImageSourceOnSignature<import("../events").EventsKey>;
    /***
     * @type {ImageSourceOnSignature<void>}
     */
    un: ImageSourceOnSignature<void>;
    /**
     * @private
     * @type {Array<number>|null}
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
    getImage(extent: import("../extent.js").Extent, resolution: number, pixelRatio: number, projection: import("../proj/Projection.js").default): import("../ImageBase.js").default;
    /**
     * @abstract
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../ImageBase.js").default} Single image.
     * @protected
     */
    protected getImageInternal(extent: import("../extent.js").Extent, resolution: number, pixelRatio: number, projection: import("../proj/Projection.js").default): import("../ImageBase.js").default;
    /**
     * Handle image change events.
     * @param {import("../events/Event.js").default} event Event.
     * @protected
     */
    protected handleImageChange(event: import("../events/Event.js").default): void;
}
import Source from "./Source.js";
//# sourceMappingURL=Image.d.ts.map