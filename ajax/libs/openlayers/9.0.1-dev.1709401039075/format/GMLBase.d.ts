/**
 * @const
 * @type {string}
 */
export const GMLNS: string;
export default GMLBase;
export type Options = {
    /**
     * Feature
     * namespace. If not defined will be derived from GML. If multiple
     * feature types have been configured which come from different feature
     * namespaces, this will be an object with the keys being the prefixes used
     * in the entries of featureType array. The values of the object will be the
     * feature namespaces themselves. So for instance there might be a featureType
     * item `topp:states` in the `featureType` array and then there will be a key
     * `topp` in the featureNS object with value `http://www.openplans.org/topp`.
     */
    featureNS?: string | {
        [x: string]: string;
    } | undefined;
    /**
     * Feature type(s) to parse.
     * If multiple feature types need to be configured
     * which come from different feature namespaces, `featureNS` will be an object
     * with the keys being the prefixes used in the entries of featureType array.
     * The values of the object will be the feature namespaces themselves.
     * So for instance there might be a featureType item `topp:states` and then
     * there will be a key named `topp` in the featureNS object with value
     * `http://www.openplans.org/topp`.
     */
    featureType?: string | string[] | undefined;
    /**
     * srsName to use when writing geometries.
     */
    srsName?: string | undefined;
    /**
     * Write gml:Surface instead of gml:Polygon
     * elements. This also affects the elements in multi-part geometries.
     */
    surface?: boolean | undefined;
    /**
     * Write gml:Curve instead of gml:LineString
     * elements. This also affects the elements in multi-part geometries.
     */
    curve?: boolean | undefined;
    /**
     * Write gml:MultiCurve instead of gml:MultiLineString.
     * Since the latter is deprecated in GML 3.
     */
    multiCurve?: boolean | undefined;
    /**
     * Write gml:multiSurface instead of
     * gml:MultiPolygon. Since the latter is deprecated in GML 3.
     */
    multiSurface?: boolean | undefined;
    /**
     * Optional schemaLocation to use when
     * writing out the GML, this will override the default provided.
     */
    schemaLocation?: string | undefined;
    /**
     * If coordinates have a Z value.
     */
    hasZ?: boolean | undefined;
};
/**
 * @typedef {Object} Options
 * @property {Object<string, string>|string} [featureNS] Feature
 * namespace. If not defined will be derived from GML. If multiple
 * feature types have been configured which come from different feature
 * namespaces, this will be an object with the keys being the prefixes used
 * in the entries of featureType array. The values of the object will be the
 * feature namespaces themselves. So for instance there might be a featureType
 * item `topp:states` in the `featureType` array and then there will be a key
 * `topp` in the featureNS object with value `http://www.openplans.org/topp`.
 * @property {Array<string>|string} [featureType] Feature type(s) to parse.
 * If multiple feature types need to be configured
 * which come from different feature namespaces, `featureNS` will be an object
 * with the keys being the prefixes used in the entries of featureType array.
 * The values of the object will be the feature namespaces themselves.
 * So for instance there might be a featureType item `topp:states` and then
 * there will be a key named `topp` in the featureNS object with value
 * `http://www.openplans.org/topp`.
 * @property {string} [srsName] srsName to use when writing geometries.
 * @property {boolean} [surface=false] Write gml:Surface instead of gml:Polygon
 * elements. This also affects the elements in multi-part geometries.
 * @property {boolean} [curve=false] Write gml:Curve instead of gml:LineString
 * elements. This also affects the elements in multi-part geometries.
 * @property {boolean} [multiCurve=true] Write gml:MultiCurve instead of gml:MultiLineString.
 * Since the latter is deprecated in GML 3.
 * @property {boolean} [multiSurface=true] Write gml:multiSurface instead of
 * gml:MultiPolygon. Since the latter is deprecated in GML 3.
 * @property {string} [schemaLocation] Optional schemaLocation to use when
 * writing out the GML, this will override the default provided.
 * @property {boolean} [hasZ=false] If coordinates have a Z value.
 */
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Feature base format for reading and writing data in the GML format.
 * This class cannot be instantiated, it contains only base content that
 * is shared with versioned format classes GML2 and GML3.
 *
 * @abstract
 * @api
 */
declare class GMLBase extends XMLFeature {
    /**
     * @param {Options} [options] Optional configuration object.
     */
    constructor(options?: Options | undefined);
    /**
     * @protected
     * @type {Array<string>|string|undefined}
     */
    protected featureType: Array<string> | string | undefined;
    /**
     * @protected
     * @type {Object<string, string>|string|undefined}
     */
    protected featureNS: {
        [x: string]: string;
    } | string | undefined;
    /**
     * @protected
     * @type {string|undefined}
     */
    protected srsName: string | undefined;
    /**
     * @protected
     * @type {string}
     */
    protected schemaLocation: string;
    /**
     * @type {Object<string, Object<string, Object>>}
     */
    FEATURE_COLLECTION_PARSERS: {
        [x: string]: {
            [x: string]: any;
        };
    };
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Array<Feature> | undefined} Features.
     */
    readFeaturesInternal(node: Element, objectStack: Array<any>): Array<Feature> | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {import("../geom/Geometry.js").default|import("../extent.js").Extent|undefined} Geometry.
     */
    readGeometryOrExtent(node: Element, objectStack: Array<any>): import("../geom/Geometry.js").default | import("../extent.js").Extent | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {import("../extent.js").Extent|undefined} Geometry.
     */
    readExtentElement(node: Element, objectStack: Array<any>): import("../extent.js").Extent | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {import("../geom/Geometry.js").default|undefined} Geometry.
     */
    readGeometryElement(node: Element, objectStack: Array<any>): import("../geom/Geometry.js").default | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @param {boolean} asFeature whether result should be wrapped as a feature.
     * @return {Feature|Object} Feature
     */
    readFeatureElementInternal(node: Element, objectStack: Array<any>, asFeature: boolean): Feature | any;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Feature} Feature.
     */
    readFeatureElement(node: Element, objectStack: Array<any>): Feature;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Point|undefined} Point.
     */
    readPoint(node: Element, objectStack: Array<any>): Point | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {MultiPoint|undefined} MultiPoint.
     */
    readMultiPoint(node: Element, objectStack: Array<any>): MultiPoint | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {MultiLineString|undefined} MultiLineString.
     */
    readMultiLineString(node: Element, objectStack: Array<any>): MultiLineString | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {MultiPolygon|undefined} MultiPolygon.
     */
    readMultiPolygon(node: Element, objectStack: Array<any>): MultiPolygon | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     */
    pointMemberParser(node: Element, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     */
    lineStringMemberParser(node: Element, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     */
    polygonMemberParser(node: Element, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {LineString|undefined} LineString.
     */
    readLineString(node: Element, objectStack: Array<any>): LineString | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Array<number>|undefined} LinearRing flat coordinates.
     */
    readFlatLinearRing(node: Element, objectStack: Array<any>): Array<number> | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {LinearRing|undefined} LinearRing.
     */
    readLinearRing(node: Element, objectStack: Array<any>): LinearRing | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Polygon|undefined} Polygon.
     */
    readPolygon(node: Element, objectStack: Array<any>): Polygon | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Array<number>} Flat coordinates.
     */
    readFlatCoordinatesFromNode(node: Element, objectStack: Array<any>): Array<number>;
    namespace: string;
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    FLAT_LINEAR_RINGS_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    GEOMETRY_FLAT_COORDINATES_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    GEOMETRY_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    MULTIPOINT_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    MULTILINESTRING_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    MULTIPOLYGON_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    POINTMEMBER_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    LINESTRINGMEMBER_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    POLYGONMEMBER_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    RING_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
}
import XMLFeature from './XMLFeature.js';
import Feature from '../Feature.js';
import Point from '../geom/Point.js';
import MultiPoint from '../geom/MultiPoint.js';
import MultiLineString from '../geom/MultiLineString.js';
import MultiPolygon from '../geom/MultiPolygon.js';
import LineString from '../geom/LineString.js';
import LinearRing from '../geom/LinearRing.js';
import Polygon from '../geom/Polygon.js';
//# sourceMappingURL=GMLBase.d.ts.map