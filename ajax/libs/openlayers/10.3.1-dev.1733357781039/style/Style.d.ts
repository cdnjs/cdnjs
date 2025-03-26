/**
 * Convert the provided object into a style function.  Functions passed through
 * unchanged.  Arrays of Style or single style objects wrapped in a
 * new style function.
 * @param {StyleFunction|Array<Style>|Style} obj
 *     A style function, a single style, or an array of styles.
 * @return {StyleFunction} A style function.
 */
export function toFunction(obj: StyleFunction | Array<Style> | Style): StyleFunction;
/**
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {number} resolution Resolution.
 * @return {Array<Style>} Style.
 */
export function createDefaultStyle(feature: import("../Feature.js").FeatureLike, resolution: number): Array<Style>;
/**
 * Default styles for editing features.
 * @return {Object<import("../geom/Geometry.js").Type, Array<Style>>} Styles
 */
export function createEditingStyle(): any;
export default Style;
/**
 * Defines how symbols and text are decluttered on layers ith `declutter` set to `true`
 * * **declutter**: Overlapping symbols and text are decluttered.
 * * **obstacle**: Symbols and text are rendered, but serve as obstacle for subsequent attempts
 *   to place a symbol or text at the same location.
 * * **none**: No decluttering is done.
 */
export type DeclutterMode = "declutter" | "obstacle" | "none";
/**
 * A function that takes a {@link module :ol/Feature~Feature} and a `{number}`
 * representing the view's resolution. The function should return a
 * {@link module :ol/style/Style~Style} or an array of them. This way e.g. a
 * vector layer can be styled. If the function returns `undefined`, the
 * feature will not be rendered.
 */
export type StyleFunction = (arg0: import("../Feature.js").FeatureLike, arg1: number) => (Style | Array<Style> | void);
/**
 * A {@link Style}, an array of {@link Style}, or a {@link StyleFunction}.
 */
export type StyleLike = Style | Array<Style> | StyleFunction;
/**
 * A function that takes a {@link module :ol/Feature~Feature} as argument and returns an
 * {@link module :ol/geom/Geometry~Geometry} that will be rendered and styled for the feature.
 */
export type GeometryFunction = (arg0: import("../Feature.js").FeatureLike) => (import("../geom/Geometry.js").default | import("../render/Feature.js").default | undefined);
/**
 * Custom renderer function. Takes two arguments:
 *
 * 1. The pixel coordinates of the geometry in GeoJSON notation.
 * 2. The {@link module :ol/render~State} of the layer renderer.
 */
export type RenderFunction = (arg0: (import("../coordinate.js").Coordinate | Array<import("../coordinate.js").Coordinate> | Array<Array<import("../coordinate.js").Coordinate>> | Array<Array<Array<import("../coordinate.js").Coordinate>>>), arg1: import("../render.js").State) => void;
export type Options = {
    /**
     * Feature property or geometry
     * or function returning a geometry to render for this style.
     */
    geometry?: string | import("../geom/Geometry.js").default | GeometryFunction | undefined;
    /**
     * Fill style.
     */
    fill?: Fill | undefined;
    /**
     * Image style.
     */
    image?: import("./Image.js").default | undefined;
    /**
     * Custom renderer. When configured, `fill`, `stroke` and `image` will be
     * ignored, and the provided function will be called with each render frame for each geometry.
     */
    renderer?: RenderFunction | undefined;
    /**
     * Custom renderer for hit detection. If provided will be used
     * in hit detection rendering.
     */
    hitDetectionRenderer?: RenderFunction | undefined;
    /**
     * Stroke style.
     */
    stroke?: Stroke | undefined;
    /**
     * Text style.
     */
    text?: import("./Text.js").default | undefined;
    /**
     * Z index.
     */
    zIndex?: number | undefined;
};
/**
 * Defines how symbols and text are decluttered on layers ith `declutter` set to `true`
 * * **declutter**: Overlapping symbols and text are decluttered.
 * * **obstacle**: Symbols and text are rendered, but serve as obstacle for subsequent attempts
 *   to place a symbol or text at the same location.
 * * **none**: No decluttering is done.
 *
 * @typedef {"declutter"|"obstacle"|"none"} DeclutterMode
 */
/**
 * A function that takes a {@link module:ol/Feature~Feature} and a `{number}`
 * representing the view's resolution. The function should return a
 * {@link module:ol/style/Style~Style} or an array of them. This way e.g. a
 * vector layer can be styled. If the function returns `undefined`, the
 * feature will not be rendered.
 *
 * @typedef {function(import("../Feature.js").FeatureLike, number):(Style|Array<Style>|void)} StyleFunction
 */
/**
 * A {@link Style}, an array of {@link Style}, or a {@link StyleFunction}.
 * @typedef {Style|Array<Style>|StyleFunction} StyleLike
 */
/**
 * A function that takes a {@link module:ol/Feature~Feature} as argument and returns an
 * {@link module:ol/geom/Geometry~Geometry} that will be rendered and styled for the feature.
 *
 * @typedef {function(import("../Feature.js").FeatureLike):
 *     (import("../geom/Geometry.js").default|import("../render/Feature.js").default|undefined)} GeometryFunction
 */
/**
 * Custom renderer function. Takes two arguments:
 *
 * 1. The pixel coordinates of the geometry in GeoJSON notation.
 * 2. The {@link module:ol/render~State} of the layer renderer.
 *
 * @typedef {function((import("../coordinate.js").Coordinate|Array<import("../coordinate.js").Coordinate>|Array<Array<import("../coordinate.js").Coordinate>>|Array<Array<Array<import("../coordinate.js").Coordinate>>>),import("../render.js").State): void} RenderFunction
 */
/**
 * @typedef {Object} Options
 * @property {string|import("../geom/Geometry.js").default|GeometryFunction} [geometry] Feature property or geometry
 * or function returning a geometry to render for this style.
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {import("./Image.js").default} [image] Image style.
 * @property {RenderFunction} [renderer] Custom renderer. When configured, `fill`, `stroke` and `image` will be
 * ignored, and the provided function will be called with each render frame for each geometry.
 * @property {RenderFunction} [hitDetectionRenderer] Custom renderer for hit detection. If provided will be used
 * in hit detection rendering.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {import("./Text.js").default} [text] Text style.
 * @property {number} [zIndex] Z index.
 */
/**
 * @classdesc
 * Container for vector feature rendering styles. Any changes made to the style
 * or its children through `set*()` methods will not take effect until the
 * feature or layer that uses the style is re-rendered.
 *
 * ## Feature styles
 *
 * If no style is defined, the following default style is used:
 * ```js
 *  import {Circle, Fill, Stroke, Style} from 'ol/style.js';
 *
 *  const fill = new Fill({
 *    color: 'rgba(255,255,255,0.4)',
 *  });
 *  const stroke = new Stroke({
 *    color: '#3399CC',
 *    width: 1.25,
 *  });
 *  const styles = [
 *    new Style({
 *      image: new Circle({
 *        fill: fill,
 *        stroke: stroke,
 *        radius: 5,
 *      }),
 *      fill: fill,
 *      stroke: stroke,
 *    }),
 *  ];
 * ```
 *
 * A separate editing style has the following defaults:
 * ```js
 *  import {Circle, Fill, Stroke, Style} from 'ol/style.js';
 *
 *  const styles = {};
 *  const white = [255, 255, 255, 1];
 *  const blue = [0, 153, 255, 1];
 *  const width = 3;
 *  styles['Polygon'] = [
 *    new Style({
 *      fill: new Fill({
 *        color: [255, 255, 255, 0.5],
 *      }),
 *    }),
 *  ];
 *  styles['MultiPolygon'] =
 *      styles['Polygon'];
 *  styles['LineString'] = [
 *    new Style({
 *      stroke: new Stroke({
 *        color: white,
 *        width: width + 2,
 *      }),
 *    }),
 *    new Style({
 *      stroke: new Stroke({
 *        color: blue,
 *        width: width,
 *      }),
 *    }),
 *  ];
 *  styles['MultiLineString'] = styles['LineString'];
 *
 *  styles['Circle'] = styles['Polygon'].concat(
 *    styles['LineString']
 *  );
 *
 *  styles['Point'] = [
 *    new Style({
 *      image: new Circle({
 *        radius: width * 2,
 *        fill: new Fill({
 *          color: blue,
 *        }),
 *        stroke: new Stroke({
 *          color: white,
 *          width: width / 2,
 *        }),
 *      }),
 *      zIndex: Infinity,
 *    }),
 *  ];
 *  styles['MultiPoint'] =
 *      styles['Point'];
 *  styles['GeometryCollection'] =
 *      styles['Polygon'].concat(
 *          styles['LineString'],
 *          styles['Point']
 *      );
 * ```
 *
 * @api
 */
declare class Style {
    /**
     * @param {Options} [options] Style options.
     */
    constructor(options?: Options);
    /**
     * @private
     * @type {string|import("../geom/Geometry.js").default|GeometryFunction|null}
     */
    private geometry_;
    /**
     * @private
     * @type {!GeometryFunction}
     */
    private geometryFunction_;
    /**
     * @private
     * @type {import("./Fill.js").default|null}
     */
    private fill_;
    /**
     * @private
     * @type {import("./Image.js").default|null}
     */
    private image_;
    /**
     * @private
     * @type {RenderFunction|null}
     */
    private renderer_;
    /**
     * @private
     * @type {RenderFunction|null}
     */
    private hitDetectionRenderer_;
    /**
     * @private
     * @type {import("./Stroke.js").default|null}
     */
    private stroke_;
    /**
     * @private
     * @type {import("./Text.js").default|null}
     */
    private text_;
    /**
     * @private
     * @type {number|undefined}
     */
    private zIndex_;
    /**
     * Clones the style.
     * @return {Style} The cloned style.
     * @api
     */
    clone(): Style;
    /**
     * Get the custom renderer function that was configured with
     * {@link #setRenderer} or the `renderer` constructor option.
     * @return {RenderFunction|null} Custom renderer function.
     * @api
     */
    getRenderer(): RenderFunction | null;
    /**
     * Sets a custom renderer function for this style. When set, `fill`, `stroke`
     * and `image` options of the style will be ignored.
     * @param {RenderFunction|null} renderer Custom renderer function.
     * @api
     */
    setRenderer(renderer: RenderFunction | null): void;
    /**
     * Sets a custom renderer function for this style used
     * in hit detection.
     * @param {RenderFunction|null} renderer Custom renderer function.
     * @api
     */
    setHitDetectionRenderer(renderer: RenderFunction | null): void;
    /**
     * Get the custom renderer function that was configured with
     * {@link #setHitDetectionRenderer} or the `hitDetectionRenderer` constructor option.
     * @return {RenderFunction|null} Custom renderer function.
     * @api
     */
    getHitDetectionRenderer(): RenderFunction | null;
    /**
     * Get the geometry to be rendered.
     * @return {string|import("../geom/Geometry.js").default|GeometryFunction|null}
     * Feature property or geometry or function that returns the geometry that will
     * be rendered with this style.
     * @api
     */
    getGeometry(): string | import("../geom/Geometry.js").default | GeometryFunction | null;
    /**
     * Get the function used to generate a geometry for rendering.
     * @return {!GeometryFunction} Function that is called with a feature
     * and returns the geometry to render instead of the feature's geometry.
     * @api
     */
    getGeometryFunction(): GeometryFunction;
    /**
     * Get the fill style.
     * @return {import("./Fill.js").default|null} Fill style.
     * @api
     */
    getFill(): import("./Fill.js").default | null;
    /**
     * Set the fill style.
     * @param {import("./Fill.js").default|null} fill Fill style.
     * @api
     */
    setFill(fill: import("./Fill.js").default | null): void;
    /**
     * Get the image style.
     * @return {import("./Image.js").default|null} Image style.
     * @api
     */
    getImage(): import("./Image.js").default | null;
    /**
     * Set the image style.
     * @param {import("./Image.js").default} image Image style.
     * @api
     */
    setImage(image: import("./Image.js").default): void;
    /**
     * Get the stroke style.
     * @return {import("./Stroke.js").default|null} Stroke style.
     * @api
     */
    getStroke(): import("./Stroke.js").default | null;
    /**
     * Set the stroke style.
     * @param {import("./Stroke.js").default|null} stroke Stroke style.
     * @api
     */
    setStroke(stroke: import("./Stroke.js").default | null): void;
    /**
     * Get the text style.
     * @return {import("./Text.js").default|null} Text style.
     * @api
     */
    getText(): import("./Text.js").default | null;
    /**
     * Set the text style.
     * @param {import("./Text.js").default} text Text style.
     * @api
     */
    setText(text: import("./Text.js").default): void;
    /**
     * Get the z-index for the style.
     * @return {number|undefined} ZIndex.
     * @api
     */
    getZIndex(): number | undefined;
    /**
     * Set a geometry that is rendered instead of the feature's geometry.
     *
     * @param {string|import("../geom/Geometry.js").default|GeometryFunction} geometry
     *     Feature property or geometry or function returning a geometry to render
     *     for this style.
     * @api
     */
    setGeometry(geometry: string | import("../geom/Geometry.js").default | GeometryFunction): void;
    /**
     * Set the z-index.
     *
     * @param {number|undefined} zIndex ZIndex.
     * @api
     */
    setZIndex(zIndex: number | undefined): void;
}
import Fill from './Fill.js';
import Stroke from './Stroke.js';
//# sourceMappingURL=Style.d.ts.map