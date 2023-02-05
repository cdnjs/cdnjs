export default Graticule;
export type GraticuleLabelDataType = {
    /**
     * Geometry.
     */
    geom: Point;
    /**
     * Text.
     */
    text: string;
};
export type Options = {
    /**
     * A CSS class name to set to the layer element.
     */
    className?: string | undefined;
    /**
     * Opacity (0, 1).
     */
    opacity?: number | undefined;
    /**
     * Visibility.
     */
    visible?: boolean | undefined;
    /**
     * The bounding extent for layer rendering.  The layer will not be
     * rendered outside of this extent.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * The z-index for layer rendering.  At rendering time, the layers
     * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
     * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
     * method was used.
     */
    zIndex?: number | undefined;
    /**
     * The minimum resolution (inclusive) at which this layer will be
     * visible.
     */
    minResolution?: number | undefined;
    /**
     * The maximum resolution (exclusive) below which this layer will
     * be visible.
     */
    maxResolution?: number | undefined;
    /**
     * The minimum view zoom level (exclusive) above which this layer will be
     * visible.
     */
    minZoom?: number | undefined;
    /**
     * The maximum view zoom level (inclusive) at which this layer will
     * be visible.
     */
    maxZoom?: number | undefined;
    /**
     * The maximum number of meridians and
     * parallels from the center of the map. The default value of 100 means that at
     * most 200 meridians and 200 parallels will be displayed. The default value is
     * appropriate for conformal projections like Spherical Mercator. If you
     * increase the value, more lines will be drawn and the drawing performance will
     * decrease.
     */
    maxLines?: number | undefined;
    /**
     * The
     * stroke style to use for drawing the graticule. If not provided, the following stroke will be used:
     * ```js
     * new Stroke({
     * color: 'rgba(0, 0, 0, 0.2)' // a not fully opaque black
     * });
     * ```
     */
    strokeStyle?: Stroke | undefined;
    /**
     * The target size of the graticule cells,
     * in pixels.
     */
    targetSize?: number | undefined;
    /**
     * Render a label with the respective
     * latitude/longitude for each graticule line.
     */
    showLabels?: boolean | undefined;
    /**
     * Label formatter for
     * longitudes. This function is called with the longitude as argument, and
     * should return a formatted string representing the longitude. By default,
     * labels are formatted as degrees, minutes, seconds and hemisphere.
     */
    lonLabelFormatter?: ((arg0: number) => string) | undefined;
    /**
     * Label formatter for
     * latitudes. This function is called with the latitude as argument, and
     * should return a formatted string representing the latitude. By default,
     * labels are formatted as degrees, minutes, seconds and hemisphere.
     */
    latLabelFormatter?: ((arg0: number) => string) | undefined;
    /**
     * Longitude label position in fractions
     * (0..1) of view extent. 0 means at the bottom of the viewport, 1 means at the
     * top.
     */
    lonLabelPosition?: number | undefined;
    /**
     * Latitude label position in fractions
     * (0..1) of view extent. 0 means at the left of the viewport, 1 means at the
     * right.
     */
    latLabelPosition?: number | undefined;
    /**
     * Longitude label text
     * style. If not provided, the following style will be used:
     * ```js
     * new Text({
     * font: '12px Calibri,sans-serif',
     * textBaseline: 'bottom',
     * fill: new Fill({
     * color: 'rgba(0,0,0,1)'
     * }),
     * stroke: new Stroke({
     * color: 'rgba(255,255,255,1)',
     * width: 3
     * })
     * });
     * ```
     * Note that the default's `textBaseline` configuration will not work well for
     * `lonLabelPosition` configurations that position labels close to the top of
     * the viewport.
     */
    lonLabelStyle?: Text | undefined;
    /**
     * Latitude label text style.
     * If not provided, the following style will be used:
     * ```js
     * new Text({
     * font: '12px Calibri,sans-serif',
     * textAlign: 'end',
     * fill: new Fill({
     * color: 'rgba(0,0,0,1)'
     * }),
     * stroke: Stroke({
     * color: 'rgba(255,255,255,1)',
     * width: 3
     * })
     * });
     * ```
     * Note that the default's `textAlign` configuration will not work well for
     * `latLabelPosition` configurations that position labels close to the left of
     * the viewport.
     */
    latLabelStyle?: Text | undefined;
    /**
     * Intervals (in degrees) for the graticule. Example to limit graticules to 30 and 10 degrees intervals:
     * ```js
     * [30, 10]
     * ```
     */
    intervals?: number[] | undefined;
    /**
     * Whether to repeat the graticule horizontally.
     */
    wrapX?: boolean | undefined;
    /**
     * Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
     */
    properties?: {
        [x: string]: any;
    } | undefined;
};
/**
 * @typedef {Object} GraticuleLabelDataType
 * @property {Point} geom Geometry.
 * @property {string} text Text.
 */
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {number} [maxLines=100] The maximum number of meridians and
 * parallels from the center of the map. The default value of 100 means that at
 * most 200 meridians and 200 parallels will be displayed. The default value is
 * appropriate for conformal projections like Spherical Mercator. If you
 * increase the value, more lines will be drawn and the drawing performance will
 * decrease.
 * @property {Stroke} [strokeStyle] The
 * stroke style to use for drawing the graticule. If not provided, the following stroke will be used:
 * ```js
 * new Stroke({
 *   color: 'rgba(0, 0, 0, 0.2)' // a not fully opaque black
 * });
 * ```
 * @property {number} [targetSize=100] The target size of the graticule cells,
 * in pixels.
 * @property {boolean} [showLabels=false] Render a label with the respective
 * latitude/longitude for each graticule line.
 * @property {function(number):string} [lonLabelFormatter] Label formatter for
 * longitudes. This function is called with the longitude as argument, and
 * should return a formatted string representing the longitude. By default,
 * labels are formatted as degrees, minutes, seconds and hemisphere.
 * @property {function(number):string} [latLabelFormatter] Label formatter for
 * latitudes. This function is called with the latitude as argument, and
 * should return a formatted string representing the latitude. By default,
 * labels are formatted as degrees, minutes, seconds and hemisphere.
 * @property {number} [lonLabelPosition=0] Longitude label position in fractions
 * (0..1) of view extent. 0 means at the bottom of the viewport, 1 means at the
 * top.
 * @property {number} [latLabelPosition=1] Latitude label position in fractions
 * (0..1) of view extent. 0 means at the left of the viewport, 1 means at the
 * right.
 * @property {Text} [lonLabelStyle] Longitude label text
 * style. If not provided, the following style will be used:
 * ```js
 * new Text({
 *   font: '12px Calibri,sans-serif',
 *   textBaseline: 'bottom',
 *   fill: new Fill({
 *     color: 'rgba(0,0,0,1)'
 *   }),
 *   stroke: new Stroke({
 *     color: 'rgba(255,255,255,1)',
 *     width: 3
 *   })
 * });
 * ```
 * Note that the default's `textBaseline` configuration will not work well for
 * `lonLabelPosition` configurations that position labels close to the top of
 * the viewport.
 * @property {Text} [latLabelStyle] Latitude label text style.
 * If not provided, the following style will be used:
 * ```js
 * new Text({
 *   font: '12px Calibri,sans-serif',
 *   textAlign: 'end',
 *   fill: new Fill({
 *     color: 'rgba(0,0,0,1)'
 *   }),
 *   stroke: Stroke({
 *     color: 'rgba(255,255,255,1)',
 *     width: 3
 *   })
 * });
 * ```
 * Note that the default's `textAlign` configuration will not work well for
 * `latLabelPosition` configurations that position labels close to the left of
 * the viewport.
 * @property {Array<number>} [intervals=[90, 45, 30, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.01, 0.005, 0.002, 0.001]]
 * Intervals (in degrees) for the graticule. Example to limit graticules to 30 and 10 degrees intervals:
 * ```js
 * [30, 10]
 * ```
 * @property {boolean} [wrapX=true] Whether to repeat the graticule horizontally.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */
/**
 * @classdesc
 * Layer that renders a grid for a coordinate system (currently only EPSG:4326 is supported).
 * Note that the view projection must define both extent and worldExtent.
 *
 * @fires import("../render/Event.js").RenderEvent
 * @extends {VectorLayer<import("../source/Vector.js").default>}
 * @api
 */
declare class Graticule extends VectorLayer<VectorSource<import("../geom/Geometry.js").default>> {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @type {import("../proj/Projection.js").default}
     */
    projection_: import("../proj/Projection.js").default;
    /**
     * @type {number}
     * @private
     */
    private maxLat_;
    /**
     * @type {number}
     * @private
     */
    private maxLon_;
    /**
     * @type {number}
     * @private
     */
    private minLat_;
    /**
     * @type {number}
     * @private
     */
    private minLon_;
    /**
     * @type {number}
     * @private
     */
    private maxX_;
    /**
     * @type {number}
     * @private
     */
    private maxY_;
    /**
     * @type {number}
     * @private
     */
    private minX_;
    /**
     * @type {number}
     * @private
     */
    private minY_;
    /**
     * @type {number}
     * @private
     */
    private targetSize_;
    /**
     * @type {number}
     * @private
     */
    private maxLines_;
    /**
     * @type {Array<LineString>}
     * @private
     */
    private meridians_;
    /**
     * @type {Array<LineString>}
     * @private
     */
    private parallels_;
    /**
     * @type {Stroke}
     * @private
     */
    private strokeStyle_;
    /**
     * @type {import("../proj.js").TransformFunction|undefined}
     * @private
     */
    private fromLonLatTransform_;
    /**
     * @type {import("../proj.js").TransformFunction|undefined}
     * @private
     */
    private toLonLatTransform_;
    /**
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */
    private projectionCenterLonLat_;
    /**
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */
    private bottomLeft_;
    /**
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */
    private bottomRight_;
    /**
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */
    private topLeft_;
    /**
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */
    private topRight_;
    /**
     * @type {Array<GraticuleLabelDataType>}
     * @private
     */
    private meridiansLabels_;
    /**
     * @type {Array<GraticuleLabelDataType>}
     * @private
     */
    private parallelsLabels_;
    /**
     * @type {null|function(number):string}
     * @private
     */
    private lonLabelFormatter_;
    /**
     * @type {function(number):string}
     * @private
     */
    private latLabelFormatter_;
    /**
     * Longitude label position in fractions (0..1) of view extent. 0 means
     * bottom, 1 means top.
     * @type {number}
     * @private
     */
    private lonLabelPosition_;
    /**
     * Latitude Label position in fractions (0..1) of view extent. 0 means left, 1
     * means right.
     * @type {number}
     * @private
     */
    private latLabelPosition_;
    /**
     * @type {Style}
     * @private
     */
    private lonLabelStyleBase_;
    /**
     * @private
     * @param {import("../Feature").default} feature Feature
     * @return {Style} style
     */
    private lonLabelStyle_;
    /**
     * @type {Style}
     * @private
     */
    private latLabelStyleBase_;
    /**
     * @private
     * @param {import("../Feature").default} feature Feature
     * @return {Style} style
     */
    private latLabelStyle_;
    /**
     * @type {Array<number>}
     * @private
     */
    private intervals_;
    /**
     * feature pool to use when updating graticule
     * @type {Array<Feature>}
     * @private
     */
    private featurePool_;
    /**
     * @type {Style}
     * @private
     */
    private lineStyle_;
    /**
     * @type {?import("../extent.js").Extent}
     * @private
     */
    private loadedExtent_;
    /**
     * @type {?import("../extent.js").Extent}
     * @private
     */
    private renderedExtent_;
    /**
     * @type {?number}
     * @private
     */
    private renderedResolution_;
    /**
     * Strategy function for loading features based on the view's extent and
     * resolution.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @return {Array<import("../extent.js").Extent>} Extents.
     */
    strategyFunction(extent: import("../extent.js").Extent, resolution: number): Array<import("../extent.js").Extent>;
    /**
     * Update geometries in the source based on current view
     * @param {import("../extent").Extent} extent Extent
     * @param {number} resolution Resolution
     * @param {import("../proj/Projection.js").default} projection Projection
     */
    loaderFunction(extent: import("../extent").Extent, resolution: number, projection: import("../proj/Projection.js").default): void;
    /**
     * @param {number} lon Longitude.
     * @param {number} minLat Minimal latitude.
     * @param {number} maxLat Maximal latitude.
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} index Index.
     * @return {number} Index.
     * @private
     */
    private addMeridian_;
    /**
     * @param {number} lat Latitude.
     * @param {number} minLon Minimal longitude.
     * @param {number} maxLon Maximal longitude.
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} index Index.
     * @return {number} Index.
     * @private
     */
    private addParallel_;
    /**
     * @param {import("../render/Event.js").default} event Render event.
     * @private
     */
    private drawLabels_;
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {import("../coordinate.js").Coordinate} center Center.
     * @param {number} resolution Resolution.
     * @param {number} squaredTolerance Squared tolerance.
     * @private
     */
    private createGraticule_;
    /**
     * @param {number} resolution Resolution.
     * @return {number} The interval in degrees.
     * @private
     */
    private getInterval_;
    /**
     * @param {number} lon Longitude.
     * @param {number} minLat Minimal latitude.
     * @param {number} maxLat Maximal latitude.
     * @param {number} squaredTolerance Squared tolerance.
     * @return {LineString} The meridian line string.
     * @param {number} index Index.
     * @private
     */
    private getMeridian_;
    /**
     * @param {LineString} lineString Meridian
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} index Index.
     * @return {Point} Meridian point.
     * @private
     */
    private getMeridianPoint_;
    /**
     * Get the list of meridians.  Meridians are lines of equal longitude.
     * @return {Array<LineString>} The meridians.
     * @api
     */
    getMeridians(): Array<LineString>;
    /**
     * @param {number} lat Latitude.
     * @param {number} minLon Minimal longitude.
     * @param {number} maxLon Maximal longitude.
     * @param {number} squaredTolerance Squared tolerance.
     * @return {LineString} The parallel line string.
     * @param {number} index Index.
     * @private
     */
    private getParallel_;
    /**
     * @param {LineString} lineString Parallels.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} index Index.
     * @return {Point} Parallel point.
     * @private
     */
    private getParallelPoint_;
    /**
     * Get the list of parallels.  Parallels are lines of equal latitude.
     * @return {Array<LineString>} The parallels.
     * @api
     */
    getParallels(): Array<LineString>;
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @private
     */
    private updateProjectionInfo_;
}
import Point from "../geom/Point.js";
import Stroke from "../style/Stroke.js";
import Text from "../style/Text.js";
import VectorSource from "../source/Vector.js";
import VectorLayer from "./Vector.js";
import LineString from "../geom/LineString.js";
//# sourceMappingURL=Graticule.d.ts.map