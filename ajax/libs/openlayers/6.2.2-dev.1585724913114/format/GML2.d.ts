export default GML2;
/**
 * @classdesc
 * Feature format for reading and writing data in the GML format,
 * version 2.1.2.
 *
 * @api
 */
declare class GML2 extends GMLBase {
    /**
     * @param {import("./GMLBase.js").Options=} opt_options Optional configuration object.
     */
    constructor(opt_options?: import("./GMLBase.js").Options);
    /**
     * @param {Node} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     * @return {Array<number>|undefined} Flat coordinates.
     */
    private readFlatCoordinates_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     * @return {import("../extent.js").Extent|undefined} Envelope.
     */
    private readBox_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     */
    private innerBoundaryIsParser_;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @private
     */
    private outerBoundaryIsParser_;
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
     * @param {Element} node Node.
     * @param {import("../Feature.js").default} feature Feature.
     * @param {Array<*>} objectStack Node stack.
     */
    writeFeatureElement(node: Element, feature: import("../Feature.js").default<any>, objectStack: any[]): void;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/LineString.js").default} geometry LineString geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeCurveOrLineString_;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/LineString.js").default} line LineString geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeLineStringOrCurveMember_;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/MultiLineString.js").default} geometry MultiLineString geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeMultiCurveOrLineString_;
    /**
     * @param {Node} node Node.
     * @param {import("../geom/Geometry.js").default|import("../extent.js").Extent} geometry Geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeGeometryElement(node: Node, geometry: number[] | import("../geom/Geometry.js").default, objectStack: any[]): void;
    /**
     * @param {string} namespaceURI XML namespace.
     * @returns {Element} coordinates node.
     * @private
     */
    private createCoordinatesNode_;
    /**
     * @param {Node} node Node.
     * @param {import("../geom/LineString.js").default|import("../geom/LinearRing.js").default} value Geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeCoordinates_;
    /**
     * @param {Node} node Node.
     * @param {import("../geom/LineString.js").default} line LineString geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeCurveSegments_;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/Polygon.js").default} geometry Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeSurfaceOrPolygon_;
    /**
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string=} opt_nodeName Node name.
     * @return {Node} Node.
     * @private
     */
    private RING_NODE_FACTORY_;
    /**
     * @param {Node} node Node.
     * @param {import("../geom/Polygon.js").default} polygon Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeSurfacePatches_;
    /**
     * @param {Node} node Node.
     * @param {import("../geom/LinearRing.js").default} ring LinearRing geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeRing_;
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
     * @param {import("../geom/Point.js").default} geometry Point geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writePoint_;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/MultiPoint.js").default} geometry MultiPoint geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeMultiPoint_;
    /**
     * @param {Node} node Node.
     * @param {import("../geom/Point.js").default} point Point geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writePointMember_;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/LinearRing.js").default} geometry LinearRing geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeLinearRing_;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/MultiPolygon.js").default} geometry MultiPolygon geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeMultiSurfaceOrPolygon_;
    /**
     * @param {Node} node Node.
     * @param {import("../geom/Polygon.js").default} polygon Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeSurfaceOrPolygonMember_;
    /**
     * @param {Element} node Node.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeEnvelope;
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
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     * @private
     */
    private BOX_PARSERS_;
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     * @private
     */
    private GEOMETRY_SERIALIZERS_;
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     * @private
     */
    private LINESTRINGORCURVEMEMBER_SERIALIZERS_;
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     * @private
     */
    private RING_SERIALIZERS_;
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     * @private
     */
    private POINTMEMBER_SERIALIZERS_;
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     * @private
     */
    private SURFACEORPOLYGONMEMBER_SERIALIZERS_;
    /**
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     * @private
     */
    private ENVELOPE_SERIALIZERS_;
}
import GMLBase from "./GMLBase.js";
//# sourceMappingURL=GML2.d.ts.map