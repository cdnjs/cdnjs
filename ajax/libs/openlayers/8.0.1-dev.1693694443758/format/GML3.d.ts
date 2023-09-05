export default GML3;
/**
 * @classdesc
 * Feature format for reading and writing data in the GML format
 * version 3.1.1.
 * Currently only supports GML 3.1.1 Simple Features profile.
 *
 * @api
 */
declare class GML3 extends GMLBase {
    /**
     * @private
     * @type {boolean}
     */
    private surface_;
    /**
     * @private
     * @type {boolean}
     */
    private curve_;
    /**
     * @private
     * @type {boolean}
     */
    private multiCurve_;
    /**
     * @private
     * @type {boolean}
     */
    private multiSurface_;
    /**
     * @private
     * @type {boolean}
     */
    private hasZ;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {MultiLineString|undefined} MultiLineString.
     */
    readMultiCurve(node: Element, objectStack: Array<any>): MultiLineString | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Array<number>|undefined} Polygon.
     */
    readFlatCurveRing(node: Element, objectStack: Array<any>): Array<number> | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {MultiPolygon|undefined} MultiPolygon.
     */
    readMultiSurface(node: Element, objectStack: Array<any>): MultiPolygon | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     */
    curveMemberParser(node: Element, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     */
    surfaceMemberParser(node: Element, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Array<(Array<number>)>|undefined} flat coordinates.
     */
    readPatch(node: Element, objectStack: Array<any>): Array<(Array<number>)> | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Array<number>|undefined} flat coordinates.
     */
    readSegment(node: Element, objectStack: Array<any>): Array<number> | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Array<(Array<number>)>|undefined} flat coordinates.
     */
    readPolygonPatch(node: Element, objectStack: Array<any>): Array<(Array<number>)> | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Array<number>|undefined} flat coordinates.
     */
    readLineStringSegment(node: Element, objectStack: Array<any>): Array<number> | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     */
    interiorParser(node: Element, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     */
    exteriorParser(node: Element, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Polygon|undefined} Polygon.
     */
    readSurface(node: Element, objectStack: Array<any>): Polygon | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {LineString|undefined} LineString.
     */
    readCurve(node: Element, objectStack: Array<any>): LineString | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {import("../extent.js").Extent|undefined} Envelope.
     */
    readEnvelope(node: Element, objectStack: Array<any>): import("../extent.js").Extent | undefined;
    /**
     * @param {Node} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Array<number>|undefined} Flat coordinates.
     */
    readFlatPos(node: Node, objectStack: Array<any>): Array<number> | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Array<number>|undefined} Flat coordinates.
     */
    readFlatPosList(node: Element, objectStack: Array<any>): Array<number> | undefined;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/Point.js").default} value Point geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writePos_;
    /**
     * @param {Array<number>} point Point geometry.
     * @param {string} [srsName] Optional srsName
     * @param {boolean} [hasZ] whether the geometry has a Z coordinate (is 3D) or not.
     * @return {string} The coords string.
     * @private
     */
    private getCoords_;
    /**
     * @param {Element} node Node.
     * @param {LineString|import("../geom/LinearRing.js").default} value Geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writePosList_;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/Point.js").default} geometry Point geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writePoint(node: Element, geometry: import("../geom/Point.js").default, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {Array<*>} objectStack Node stack.
     */
    writeEnvelope(node: Element, extent: import("../extent.js").Extent, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/LinearRing.js").default} geometry LinearRing geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeLinearRing(node: Element, geometry: import("../geom/LinearRing.js").default, objectStack: Array<any>): void;
    /**
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string} [nodeName] Node name.
     * @return {Node} Node.
     * @private
     */
    private RING_NODE_FACTORY_;
    /**
     * @param {Element} node Node.
     * @param {Polygon} geometry Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeSurfaceOrPolygon(node: Element, geometry: Polygon, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {LineString} geometry LineString geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeCurveOrLineString(node: Element, geometry: LineString, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {MultiPolygon} geometry MultiPolygon geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeMultiSurfaceOrPolygon(node: Element, geometry: MultiPolygon, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/MultiPoint.js").default} geometry MultiPoint geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeMultiPoint(node: Element, geometry: import("../geom/MultiPoint.js").default, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {MultiLineString} geometry MultiLineString geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeMultiCurveOrLineString(node: Element, geometry: MultiLineString, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/LinearRing.js").default} ring LinearRing geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeRing(node: Element, ring: import("../geom/LinearRing.js").default, objectStack: Array<any>): void;
    /**
     * @param {Node} node Node.
     * @param {Polygon} polygon Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeSurfaceOrPolygonMember(node: Node, polygon: Polygon, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/Point.js").default} point Point geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writePointMember(node: Element, point: import("../geom/Point.js").default, objectStack: Array<any>): void;
    /**
     * @param {Node} node Node.
     * @param {LineString} line LineString geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeLineStringOrCurveMember(node: Node, line: LineString, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {Polygon} polygon Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeSurfacePatches_;
    /**
     * @param {Element} node Node.
     * @param {LineString} line LineString geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeCurveSegments_;
    /**
     * @param {Node} node Node.
     * @param {import("../geom/Geometry.js").default|import("../extent.js").Extent} geometry Geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeGeometryElement(node: Node, geometry: import("../geom/Geometry.js").default | import("../extent.js").Extent, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {import("../Feature.js").default} feature Feature.
     * @param {Array<*>} objectStack Node stack.
     */
    writeFeatureElement(node: Element, feature: import("../Feature.js").default, objectStack: Array<any>): void;
    /**
     * @param {Node} node Node.
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeFeatureMembers_;
    /**
     * @const
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string} [nodeName] Node name.
     * @return {Node|undefined} Node.
     * @private
     */
    private MULTIGEOMETRY_MEMBER_NODE_FACTORY_;
    /**
     * @const
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string} [nodeName] Node name.
     * @return {Element|undefined} Node.
     * @private
     */
    private GEOMETRY_NODE_FACTORY_;
    /**
     * Encode an array of features in the GML 3.1.1 format as an XML node.
     *
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [options] Options.
     * @return {Element} Node.
     * @api
     */
    writeFeaturesNode(features: Array<import("../Feature.js").default>, options?: import("./Feature.js").WriteOptions | undefined): Element;
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    MULTICURVE_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    MULTISURFACE_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    CURVEMEMBER_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    SURFACEMEMBER_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    SURFACE_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    CURVE_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    ENVELOPE_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    PATCHES_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    SEGMENTS_PARSERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     */
    RING_SERIALIZERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Serializer;
        };
    };
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     */
    ENVELOPE_SERIALIZERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Serializer;
        };
    };
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     */
    SURFACEORPOLYGONMEMBER_SERIALIZERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Serializer;
        };
    };
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     */
    POINTMEMBER_SERIALIZERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Serializer;
        };
    };
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     */
    LINESTRINGORCURVEMEMBER_SERIALIZERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Serializer;
        };
    };
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     */
    GEOMETRY_SERIALIZERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Serializer;
        };
    };
}
import GMLBase from './GMLBase.js';
import MultiLineString from '../geom/MultiLineString.js';
import MultiPolygon from '../geom/MultiPolygon.js';
import Polygon from '../geom/Polygon.js';
import LineString from '../geom/LineString.js';
//# sourceMappingURL=GML3.d.ts.map