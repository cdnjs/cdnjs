/**
 * @typedef {Object} State
 * @property {CanvasRenderingContext2D} context Canvas context that the layer is being rendered to.
 * @property {import("./Feature.js").FeatureLike} feature Feature.
 * @property {import("./geom/SimpleGeometry.js").default} geometry Geometry.
 * @property {number} pixelRatio Pixel ratio used by the layer renderer.
 * @property {number} resolution Resolution that the render batch was created and optimized for.
 * This is not the view's resolution that is being rendered.
 * @property {number} rotation Rotation of the rendered layer in radians.
 */
/**
 * A function to be used when sorting features before rendering.
 * It takes two instances of {@link module:ol/Feature~Feature} or
 * {@link module:ol/render/Feature~RenderFeature} and returns a `{number}`.
 *
 * @typedef {function(import("./Feature.js").FeatureLike, import("./Feature.js").FeatureLike):number} OrderFunction
 */
/**
 * @typedef {Object} ToContextOptions
 * @property {import("./size.js").Size} [size] Desired size of the canvas in css
 * pixels. When provided, both canvas and css size will be set according to the
 * `pixelRatio`. If not provided, the current canvas and css sizes will not be
 * altered.
 * @property {number} [pixelRatio=window.devicePixelRatio] Pixel ratio (canvas
 * pixel to css pixel ratio) for the canvas.
 */
/**
 * Binds a Canvas Immediate API to a canvas context, to allow drawing geometries
 * to the context's canvas.
 *
 * The units for geometry coordinates are css pixels relative to the top left
 * corner of the canvas element.
 * ```js
 * import {toContext} from 'ol/render';
 * import Fill from 'ol/style/Fill';
 * import Polygon from 'ol/geom/Polygon';
 *
 * const canvas = document.createElement('canvas');
 * const render = toContext(
 *     canvas.getContext('2d'),
 *     {size: [100, 100]}
 * );
 * render.setFillStrokeStyle(new Fill({ color: blue }));
 * render.drawPolygon(
 *     new Polygon([[[0, 0], [100, 100], [100, 0], [0, 0]]])
 * );
 * ```
 *
 * @param {CanvasRenderingContext2D} context Canvas context.
 * @param {ToContextOptions} [options] Options.
 * @return {CanvasImmediateRenderer} Canvas Immediate.
 * @api
 */
export function toContext(context: CanvasRenderingContext2D, options?: ToContextOptions | undefined): CanvasImmediateRenderer;
/**
 * Gets a vector context for drawing to the event's canvas.
 * @param {import("./render/Event.js").default} event Render event.
 * @return {CanvasImmediateRenderer} Vector context.
 * @api
 */
export function getVectorContext(event: import("./render/Event.js").default): CanvasImmediateRenderer;
/**
 * Gets the pixel of the event's canvas context from the map viewport's CSS pixel.
 * @param {import("./render/Event.js").default} event Render event.
 * @param {import("./pixel.js").Pixel} pixel CSS pixel relative to the top-left
 * corner of the map viewport.
 * @return {import("./pixel.js").Pixel} Pixel on the event's canvas context.
 * @api
 */
export function getRenderPixel(event: import("./render/Event.js").default, pixel: import("./pixel.js").Pixel): import("./pixel.js").Pixel;
export type State = {
    /**
     * Canvas context that the layer is being rendered to.
     */
    context: CanvasRenderingContext2D;
    /**
     * Feature.
     */
    feature: import("./Feature.js").FeatureLike;
    /**
     * Geometry.
     */
    geometry: import("./geom/SimpleGeometry.js").default;
    /**
     * Pixel ratio used by the layer renderer.
     */
    pixelRatio: number;
    /**
     * Resolution that the render batch was created and optimized for.
     * This is not the view's resolution that is being rendered.
     */
    resolution: number;
    /**
     * Rotation of the rendered layer in radians.
     */
    rotation: number;
};
/**
 * A function to be used when sorting features before rendering.
 * It takes two instances of {@link module :ol/Feature~Feature} or
 * {@link module :ol/render/Feature~RenderFeature} and returns a `{number}`.
 */
export type OrderFunction = (arg0: import("./Feature.js").FeatureLike, arg1: import("./Feature.js").FeatureLike) => number;
export type ToContextOptions = {
    /**
     * Desired size of the canvas in css
     * pixels. When provided, both canvas and css size will be set according to the
     * `pixelRatio`. If not provided, the current canvas and css sizes will not be
     * altered.
     */
    size?: import("./size.js").Size | undefined;
    /**
     * Pixel ratio (canvas
     * pixel to css pixel ratio) for the canvas.
     */
    pixelRatio?: number | undefined;
};
import CanvasImmediateRenderer from "./render/canvas/Immediate.js";
//# sourceMappingURL=render.d.ts.map