/**
 * Default image load function for image sources that use import("../Image.js").Image image
 * instances.
 * @param {import("../Image.js").default} image Image.
 * @param {string} src Source.
 */
export function defaultImageLoadFunction(image: import("../Image.js").default, src: string): void;
export type ImageSourceEventType = string;
export namespace ImageSourceEventType {
    export const IMAGELOADSTART: string;
    export const IMAGELOADEND: string;
    export const IMAGELOADERROR: string;
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
export type ImageSourceEventTypes = "imageloadstart" | "imageloadend" | "imageloaderror";
/**
 * *
 */
export type ImageSourceOnSignature<Return> = ((type: "error" | "change", listener: (event: Event) => any) => Return) & ((type: "propertychange", listener: (event: import("../Object.js").ObjectEvent) => any) => Return) & ((type: "imageloadstart" | "imageloadend" | "imageloaderror", listener: (event: ImageSourceEvent) => any) => Return) & ((type: ("error" | "change" | "propertychange" | "imageloadstart" | "imageloadend" | "imageloaderror")[], listener: (event: globalThis.Event | Event) => any) => Return extends void | null ? void : Return[]);
export type Options = {
    /**
     * Attributions.
     */
    attributions?: string | string[] | ((arg0: import("../PluggableMap.js").FrameState) => string | string[]);
    /**
     * Enable image smoothing.
     */
    imageSmoothing?: boolean;
    /**
     * Projection.
     */
    projection?: string | import("../proj/Projection.js").default | undefined;
    /**
     * Resolutions.
     */
    resolutions?: number[];
    /**
     * State.
     */
    state?: any;
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
 * @property {boolean} [imageSmoothing=true] Enable image smoothing.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {Array<number>} [resolutions] Resolutions.
 * @property {import("./State.js").default} [state] State.
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
     * @private
     * @type {object|undefined}
     */
    private contextOptions_;
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