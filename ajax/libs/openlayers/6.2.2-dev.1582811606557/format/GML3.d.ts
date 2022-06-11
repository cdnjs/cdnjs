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
     * @param {import("./GMLBase.js").Options=} opt_options Optional configuration object.
     */
    constructor(opt_options?: import("./GMLBase.js").Options);
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
     * @private
     * @return {MultiLineString|undefined} MultiLineString.
     */
    private readMultiCurve_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     * @return {MultiPolygon|undefined} MultiPolygon.
     */
    private readMultiSurface_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     */
    private curveMemberParser_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     */
    private surfaceMemberParser_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     * @return {Array<(Array<number>)>|undefined} flat coordinates.
     */
    private readPatch_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     * @return {Array<number>|undefined} flat coordinates.
     */
    private readSegment_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     * @return {Array<(Array<number>)>|undefined} flat coordinates.
     */
    private readPolygonPatch_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     * @return {Array<number>|undefined} flat coordinates.
     */
    private readLineStringSegment_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     */
    private interiorParser_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     */
    private exteriorParser_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     * @return {Polygon|undefined} Polygon.
     */
    private readSurface_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     * @return {LineString|undefined} LineString.
     */
    private readCurve_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     * @return {import("../extent.js").Extent|undefined} Envelope.
     */
    private readEnvelope_;
    /**
     * @param {Node} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     * @return {Array<number>|undefined} Flat coordinates.
     */
    private readFlatPos_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     * @return {Array<number>|undefined} Flat coordinates.
     */
    private readFlatPosList_;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/Point.js").default} value Point geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writePos_;
    /**
     * @param {Array<number>} point Point geometry.
     * @param {string=} opt_srsName Optional srsName
     * @param {boolean=} opt_hasZ whether the geometry has a Z coordinate (is 3D) or not.
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
     * @private
     */
    private writePoint_;
    /**
     * @param {Element} node Node.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {Array<*>} objectStack Node stack.
     */
    writeEnvelope(node: Element, extent: number[], objectStack: any[]): void;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/LinearRing.js").default} geometry LinearRing geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeLinearRing_;
    /**
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string=} opt_nodeName Node name.
     * @return {Node} Node.
     * @private
     */
    private RING_NODE_FACTORY_;
    /**
     * @param {Element} node Node.
     * @param {Polygon} geometry Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeSurfaceOrPolygon_;
    /**
     * @param {Element} node Node.
     * @param {LineString} geometry LineString geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeCurveOrLineString_;
    /**
     * @param {Element} node Node.
     * @param {MultiPolygon} geometry MultiPolygon geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeMultiSurfaceOrPolygon_;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/MultiPoint.js").default} geometry MultiPoint geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeMultiPoint_;
    /**
     * @param {Element} node Node.
     * @param {MultiLineString} geometry MultiLineString geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeMultiCurveOrLineString_;
    /**
     * @param {Node} node Node.
     * @param {import("../geom/LinearRing.js").default} ring LinearRing geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeRing_;
    /**
     * @param {Node} node Node.
     * @param {Polygon} polygon Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeSurfaceOrPolygonMember_;
    /**
     * @param {Node} node Node.
     * @param {import("../geom/Point.js").default} point Point geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writePointMember_;
    /**
     * @param {Node} node Node.
     * @param {LineString} line LineString geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeLineStringOrCurveMember_;
    /**
     * @param {Node} node Node.
     * @param {Polygon} polygon Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeSurfacePatches_;
    /**
     * @param {Node} node Node.
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
    writeGeometryElement(node: Node, geometry: number[] | import("../geom/Geometry.js").default, objectStack: any[]): void;
    /**
     * @param {Element} node Node.
     * @param {import("../Feature.js").default} feature Feature.
     * @param {Array<*>} objectStack Node stack.
     */
    writeFeatureElement(node: Element, feature: import("../Feature.js").default<any>, objectStack: any[]): void;
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
     * @param {string=} opt_nodeName Node name.
     * @return {Node|undefined} Node.
     * @private
     */
    private MULTIGEOMETRY_MEMBER_NODE_FACTORY_;
    /**
     * @const
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string=} opt_nodeName Node name.
     * @return {Element|undefined} Node.
     * @private
     */
    private GEOMETRY_NODE_FACTORY_;
    /**
     * Encode an array of features in the GML 3.1.1 format as an XML node.
     *
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions=} opt_options Options.
     * @return {Element} Node.
     * @override
     * @api
     */
    writeFeaturesNode(features: import("../Feature.js").default<any>[], opt_options?: import("./Feature.js").WriteOptions): Element;
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     * @private
     */
    private MULTICURVE_PARSERS_;
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     * @private
     */
    private MULTISURFACE_PARSERS_;
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     * @private
     */
    private CURVEMEMBER_PARSERS_;
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     * @private
     */
    private SURFACEMEMBER_PARSERS_;
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     * @private
     */
    private SURFACE_PARSERS_;
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     * @private
     */
    private CURVE_PARSERS_;
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     * @private
     */
    private ENVELOPE_PARSERS_;
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     * @private
     */
    private PATCHES_PARSERS_;
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     * @private
     */
    private SEGMENTS_PARSERS_;
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     * @private
     */
    private RING_SERIALIZERS_;
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     * @private
     */
    private ENVELOPE_SERIALIZERS_;
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     * @private
     */
    private SURFACEORPOLYGONMEMBER_SERIALIZERS_;
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     * @private
     */
    private POINTMEMBER_SERIALIZERS_;
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     * @private
     */
    private LINESTRINGORCURVEMEMBER_SERIALIZERS_;
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     * @private
     */
    private GEOMETRY_SERIALIZERS_;
}
import GMLBase from "./GMLBase.js";
//# sourceMappingURL=GML3.d.ts.map