/**
 * Get the default fill style (or null if not yet set).
 * @return {Fill|null} The default fill style.
 */
export function getDefaultFillStyle(): Fill | null;
/**
 * Get the default image style (or null if not yet set).
 * @return {import("../style/Image.js").default|null} The default image style.
 */
export function getDefaultImageStyle(): import("../style/Image.js").default | null;
/**
 * Get the default stroke style (or null if not yet set).
 * @return {Stroke|null} The default stroke style.
 */
export function getDefaultStrokeStyle(): Stroke | null;
/**
 * Get the default text style (or null if not yet set).
 * @return {Text|null} The default text style.
 */
export function getDefaultTextStyle(): Text | null;
/**
 * Get the default style (or null if not yet set).
 * @return {Style|null} The default style.
 */
export function getDefaultStyle(): Style | null;
/**
 * Get the default style array (or null if not yet set).
 * @return {Array<Style>|null} The default style.
 */
export function getDefaultStyleArray(): Array<Style> | null;
/**
 * @param {Node} node Node.
 * @return {Array<number>|undefined} Flat coordinates.
 */
export function readFlatCoordinates(node: Node): Array<number> | undefined;
export default KML;
/**
 * A function that takes a url `{string}` and returns a url `{string}`.
 * Might be used to change an icon path or to substitute a
 * data url obtained from a KMZ array buffer.
 */
export type IconUrlFunction = (arg0: string) => string;
export type Vec2 = {
    /**
     * X coordinate.
     */
    x: number;
    /**
     * Units of x.
     */
    xunits: import("../style/Icon.js").IconAnchorUnits;
    /**
     * Y coordinate.
     */
    y: number;
    /**
     * Units of Y.
     */
    yunits: import("../style/Icon.js").IconAnchorUnits;
    /**
     * Origin.
     */
    origin?: import("../style/Icon.js").IconOrigin | undefined;
};
export type GxTrackObject = {
    /**
     * Coordinates.
     */
    coordinates: Array<Array<number>>;
    /**
     * Whens.
     */
    whens: Array<number>;
};
export type Options = {
    /**
     * Extract styles from the KML.
     */
    extractStyles?: boolean | undefined;
    /**
     * Show names as labels for placemarks which contain points.
     */
    showPointNames?: boolean | undefined;
    /**
     * Default style. The
     * default default style is the same as Google Earth.
     */
    defaultStyle?: Style[] | undefined;
    /**
     * Write styles into KML.
     */
    writeStyles?: boolean | undefined;
    /**
     * The `crossOrigin` attribute for loaded images. Note that you must provide a
     * `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     */
    crossOrigin?: string | null | undefined;
    /**
     * Function that takes a url string and returns a url string.
     * Might be used to change an icon path or to substitute a data url obtained from a KMZ array buffer.
     */
    iconUrlFunction?: IconUrlFunction | undefined;
};
import Fill from '../style/Fill.js';
import Stroke from '../style/Stroke.js';
import Text from '../style/Text.js';
import Style from '../style/Style.js';
/**
 * @typedef {Object} Options
 * @property {boolean} [extractStyles=true] Extract styles from the KML.
 * @property {boolean} [showPointNames=true] Show names as labels for placemarks which contain points.
 * @property {Array<Style>} [defaultStyle] Default style. The
 * default default style is the same as Google Earth.
 * @property {boolean} [writeStyles=true] Write styles into KML.
 * @property {null|string} [crossOrigin='anonymous'] The `crossOrigin` attribute for loaded images. Note that you must provide a
 * `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * @property {IconUrlFunction} [iconUrlFunction] Function that takes a url string and returns a url string.
 * Might be used to change an icon path or to substitute a data url obtained from a KMZ array buffer.
 */
/**
 * @classdesc
 * Feature format for reading and writing data in the KML format.
 *
 * {@link module:ol/format/KML~KML#readFeature} will read the first feature from
 * a KML source.
 *
 * MultiGeometries are converted into GeometryCollections if they are a mix of
 * geometry types, and into MultiPoint/MultiLineString/MultiPolygon if they are
 * all of the same type.
 *
 * @api
 */
declare class KML extends XMLFeature {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options);
    /**
     * @private
     * @type {Array<Style>}
     */
    private defaultStyle_;
    /**
     * @private
     * @type {boolean}
     */
    private extractStyles_;
    /**
     * @type {boolean}
     */
    writeStyles_: boolean;
    /**
     * @private
     * @type {!Object<string, (Array<Style>|string)>}
     */
    private sharedStyles_;
    /**
     * @private
     * @type {boolean}
     */
    private showPointNames_;
    /**
     * @type {null|string}
     */
    crossOrigin_: null | string;
    /**
     * @type {IconUrlFunction}
     */
    iconUrlFunction_: IconUrlFunction;
    /**
     * @param {Node} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     * @return {Array<Feature>|undefined} Features.
     */
    private readDocumentOrFolder_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     * @return {Feature|undefined} Feature.
     */
    private readPlacemark_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     */
    private readSharedStyle_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     */
    private readSharedStyleMap_;
    /**
     * Read the name of the KML.
     *
     * @param {Document|Element|string} source Source.
     * @return {string|undefined} Name.
     * @api
     */
    readName(source: Document | Element | string): string | undefined;
    /**
     * @param {Document} doc Document.
     * @return {string|undefined} Name.
     */
    readNameFromDocument(doc: Document): string | undefined;
    /**
     * @param {Element} node Node.
     * @return {string|undefined} Name.
     */
    readNameFromNode(node: Element): string | undefined;
    /**
     * Read the network links of the KML.
     *
     * @param {Document|Element|string} source Source.
     * @return {Array<Object>} Network links.
     * @api
     */
    readNetworkLinks(source: Document | Element | string): Array<any>;
    /**
     * @param {Document} doc Document.
     * @return {Array<Object>} Network links.
     */
    readNetworkLinksFromDocument(doc: Document): Array<any>;
    /**
     * @param {Element} node Node.
     * @return {Array<Object>} Network links.
     */
    readNetworkLinksFromNode(node: Element): Array<any>;
    /**
     * Read the regions of the KML.
     *
     * @param {Document|Element|string} source Source.
     * @return {Array<Object>} Regions.
     * @api
     */
    readRegion(source: Document | Element | string): Array<any>;
    /**
     * @param {Document} doc Document.
     * @return {Array<Object>} Region.
     */
    readRegionFromDocument(doc: Document): Array<any>;
    /**
     * @param {Element} node Node.
     * @return {Array<Object>} Region.
     * @api
     */
    readRegionFromNode(node: Element): Array<any>;
    /**
     * @typedef {Object} KMLCamera Specifies the observer's viewpoint and associated view parameters.
     * @property {number} [Latitude] Latitude of the camera.
     * @property {number} [Longitude] Longitude of the camera.
     * @property {number} [Altitude] Altitude of the camera.
     * @property {string} [AltitudeMode] Floor-related altitude mode.
     * @property {number} [Heading] Horizontal camera rotation.
     * @property {number} [Tilt] Lateral camera rotation.
     * @property {number} [Roll] Vertical camera rotation.
     */
    /**
     * Read the cameras of the KML.
     *
     * @param {Document|Element|string} source Source.
     * @return {Array<KMLCamera>} Cameras.
     * @api
     */
    readCamera(source: Document | Element | string): Array<{
        /**
         * Latitude of the camera.
         */
        Latitude?: number | undefined;
        /**
         * Longitude of the camera.
         */
        Longitude?: number | undefined;
        /**
         * Altitude of the camera.
         */
        Altitude?: number | undefined;
        /**
         * Floor-related altitude mode.
         */
        AltitudeMode?: string | undefined;
        /**
         * Horizontal camera rotation.
         */
        Heading?: number | undefined;
        /**
         * Lateral camera rotation.
         */
        Tilt?: number | undefined;
        /**
         * Vertical camera rotation.
         */
        Roll?: number | undefined;
    }>;
    /**
     * @param {Document} doc Document.
     * @return {Array<KMLCamera>} Cameras.
     */
    readCameraFromDocument(doc: Document): Array<{
        /**
         * Latitude of the camera.
         */
        Latitude?: number | undefined;
        /**
         * Longitude of the camera.
         */
        Longitude?: number | undefined;
        /**
         * Altitude of the camera.
         */
        Altitude?: number | undefined;
        /**
         * Floor-related altitude mode.
         */
        AltitudeMode?: string | undefined;
        /**
         * Horizontal camera rotation.
         */
        Heading?: number | undefined;
        /**
         * Lateral camera rotation.
         */
        Tilt?: number | undefined;
        /**
         * Vertical camera rotation.
         */
        Roll?: number | undefined;
    }>;
    /**
     * @param {Element} node Node.
     * @return {Array<KMLCamera>} Cameras.
     * @api
     */
    readCameraFromNode(node: Element): Array<{
        /**
         * Latitude of the camera.
         */
        Latitude?: number | undefined;
        /**
         * Longitude of the camera.
         */
        Longitude?: number | undefined;
        /**
         * Altitude of the camera.
         */
        Altitude?: number | undefined;
        /**
         * Floor-related altitude mode.
         */
        AltitudeMode?: string | undefined;
        /**
         * Horizontal camera rotation.
         */
        Heading?: number | undefined;
        /**
         * Lateral camera rotation.
         */
        Tilt?: number | undefined;
        /**
         * Vertical camera rotation.
         */
        Roll?: number | undefined;
    }>;
}
import XMLFeature from './XMLFeature.js';
//# sourceMappingURL=KML.d.ts.map