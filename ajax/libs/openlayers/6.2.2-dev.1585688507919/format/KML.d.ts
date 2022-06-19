/**
 * Get the default fill style (or null if not yet set).
 * @return {Fill} The default fill style.
 */
export function getDefaultFillStyle(): Fill;
/**
 * Get the default image style (or null if not yet set).
 * @return {import("../style/Image.js").default} The default image style.
 */
export function getDefaultImageStyle(): import("../style/Image.js").default;
/**
 * Get the default stroke style (or null if not yet set).
 * @return {Stroke} The default stroke style.
 */
export function getDefaultStrokeStyle(): Stroke;
/**
 * Get the default text style (or null if not yet set).
 * @return {Text} The default text style.
 */
export function getDefaultTextStyle(): Text;
/**
 * Get the default style (or null if not yet set).
 * @return {Style} The default style.
 */
export function getDefaultStyle(): Style;
/**
 * Get the default style array (or null if not yet set).
 * @return {Array<Style>} The default style.
 */
export function getDefaultStyleArray(): Style[];
/**
 * @param {Node} node Node.
 * @return {Array<number>|undefined} Flat coordinates.
 */
export function readFlatCoordinates(node: Node): number[];
export default KML;
export type Vec2 = {
    x: number;
    xunits: {
        FRACTION: string;
        PIXELS: string;
    };
    y: number;
    yunits: {
        FRACTION: string;
        PIXELS: string;
    };
    origin: {
        BOTTOM_LEFT: string;
        BOTTOM_RIGHT: string;
        TOP_LEFT: string;
        TOP_RIGHT: string;
    };
};
export type GxTrackObject = {
    flatCoordinates: number[];
    whens: number[];
};
export type Options = {
    /**
     * Extract styles from the KML.
     */
    extractStyles?: boolean;
    /**
     * Show names as labels for placemarks which contain points.
     */
    showPointNames?: boolean;
    /**
     * Default style. The
     * default default style is the same as Google Earth.
     */
    defaultStyle?: Style[];
    /**
     * Write styles into KML.
     */
    writeStyles?: boolean;
    /**
     * The `crossOrigin` attribute for loaded images. Note that you must provide a
     * `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     */
    crossOrigin?: string;
};
import Fill from "../style/Fill.js";
import Stroke from "../style/Stroke.js";
import Text from "../style/Text.js";
import Style from "../style/Style.js";
/**
 * @typedef {Object} Options
 * @property {boolean} [extractStyles=true] Extract styles from the KML.
 * @property {boolean} [showPointNames=true] Show names as labels for placemarks which contain points.
 * @property {Array<Style>} [defaultStyle] Default style. The
 * default default style is the same as Google Earth.
 * @property {boolean} [writeStyles=true] Write styles into KML.
 * @property {null|string} [crossOrigin='anonymous'] The `crossOrigin` attribute for loaded images. Note that you must provide a
 * `crossOrigin` value if you want to access pixel data with the Canvas renderer.
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
 * Note that the KML format uses the URL() constructor. Older browsers such as IE
 * which do not support this will need a URL polyfill to be loaded before use.
 *
 * @api
 */
declare class KML extends XMLFeature {
    /**
     * @param {Options=} opt_options Options.
     */
    constructor(opt_options?: Options);
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
     * @private
     * @type {boolean}
     */
    private writeStyles_;
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
     * @private
     * @type {null|string}
     */
    private crossOrigin_;
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
     * @inheritDoc
     */
    readFeatureFromNode(node: any, opt_options: any): Feature<any>;
    /**
     * @inheritDoc
     */
    readFeaturesFromNode(node: any, opt_options: any): any[];
    /**
     * Read the name of the KML.
     *
     * @param {Document|Element|string} source Source.
     * @return {string|undefined} Name.
     * @api
     */
    readName(source: string | Element | Document): string;
    /**
     * @param {Document} doc Document.
     * @return {string|undefined} Name.
     */
    readNameFromDocument(doc: Document): string;
    /**
     * @param {Element} node Node.
     * @return {string|undefined} Name.
     */
    readNameFromNode(node: Element): string;
    /**
     * Read the network links of the KML.
     *
     * @param {Document|Element|string} source Source.
     * @return {Array<Object>} Network links.
     * @api
     */
    readNetworkLinks(source: string | Element | Document): any[];
    /**
     * @param {Document} doc Document.
     * @return {Array<Object>} Network links.
     */
    readNetworkLinksFromDocument(doc: Document): any[];
    /**
     * @param {Element} node Node.
     * @return {Array<Object>} Network links.
     */
    readNetworkLinksFromNode(node: Element): any[];
    /**
     * Read the regions of the KML.
     *
     * @param {Document|Element|string} source Source.
     * @return {Array<Object>} Regions.
     * @api
     */
    readRegion(source: string | Element | Document): any[];
    /**
     * @param {Document} doc Document.
     * @return {Array<Object>} Region.
     */
    readRegionFromDocument(doc: Document): any[];
    /**
     * @param {Element} node Node.
     * @return {Array<Object>} Region.
     * @api
     */
    readRegionFromNode(node: Element): any[];
}
import XMLFeature from "./XMLFeature.js";
import Feature from "../Feature.js";
//# sourceMappingURL=KML.d.ts.map