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
     * @param {Node} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {Array<number>|undefined} Flat coordinates.
     */
    readFlatCoordinates(node: Node, objectStack: Array<any>): Array<number> | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @return {import("../extent.js").Extent|undefined} Envelope.
     */
    readBox(node: Element, objectStack: Array<any>): import("../extent.js").Extent | undefined;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     */
    innerBoundaryIsParser(node: Element, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     */
    outerBoundaryIsParser(node: Element, objectStack: Array<any>): void;
    /**
     * @const
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string} [opt_nodeName] Node name.
     * @return {Element|undefined} Node.
     * @private
     */
    private GEOMETRY_NODE_FACTORY_;
    /**
     * @param {Element} node Node.
     * @param {import("../Feature.js").default} feature Feature.
     * @param {Array<*>} objectStack Node stack.
     */
    writeFeatureElement(node: Element, feature: import("../Feature.js").default, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/LineString.js").default} geometry LineString geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeCurveOrLineString(node: Element, geometry: import("../geom/LineString.js").default, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/LineString.js").default} line LineString geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeLineStringOrCurveMember(node: Element, line: import("../geom/LineString.js").default, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/MultiLineString.js").default} geometry MultiLineString geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeMultiCurveOrLineString(node: Element, geometry: import("../geom/MultiLineString.js").default, objectStack: Array<any>): void;
    /**
     * @param {Node} node Node.
     * @param {import("../geom/Geometry.js").default|import("../extent.js").Extent} geometry Geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeGeometryElement(node: Node, geometry: import("../geom/Geometry.js").default | import("../extent.js").Extent, objectStack: Array<any>): void;
    /**
     * @param {string} namespaceURI XML namespace.
     * @return {Element} coordinates node.
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
     * @param {Element} node Node.
     * @param {import("../geom/LineString.js").default} line LineString geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeCurveSegments_;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/Polygon.js").default} geometry Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeSurfaceOrPolygon(node: Element, geometry: import("../geom/Polygon.js").default, objectStack: Array<any>): void;
    /**
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string} [opt_nodeName] Node name.
     * @return {Node} Node.
     * @private
     */
    private RING_NODE_FACTORY_;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/Polygon.js").default} polygon Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     * @private
     */
    private writeSurfacePatches_;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/LinearRing.js").default} ring LinearRing geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeRing(node: Element, ring: import("../geom/LinearRing.js").default, objectStack: Array<any>): void;
    /**
     * @param {Array<number>} point Point geometry.
     * @param {string} [opt_srsName] Optional srsName
     * @param {boolean} [opt_hasZ] whether the geometry has a Z coordinate (is 3D) or not.
     * @return {string} The coords string.
     * @private
     */
    private getCoords_;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/Point.js").default} geometry Point geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writePoint(node: Element, geometry: import("../geom/Point.js").default, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/MultiPoint.js").default} geometry MultiPoint geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeMultiPoint(node: Element, geometry: import("../geom/MultiPoint.js").default, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/Point.js").default} point Point geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writePointMember(node: Element, point: import("../geom/Point.js").default, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/LinearRing.js").default} geometry LinearRing geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeLinearRing(node: Element, geometry: import("../geom/LinearRing.js").default, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {import("../geom/MultiPolygon.js").default} geometry MultiPolygon geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeMultiSurfaceOrPolygon(node: Element, geometry: import("../geom/MultiPolygon.js").default, objectStack: Array<any>): void;
    /**
     * @param {Node} node Node.
     * @param {import("../geom/Polygon.js").default} polygon Polygon geometry.
     * @param {Array<*>} objectStack Node stack.
     */
    writeSurfaceOrPolygonMember(node: Node, polygon: import("../geom/Polygon.js").default, objectStack: Array<any>): void;
    /**
     * @param {Element} node Node.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {Array<*>} objectStack Node stack.
     */
    writeEnvelope(node: Element, extent: import("../extent.js").Extent, objectStack: Array<any>): void;
    /**
     * @const
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string} [opt_nodeName] Node name.
     * @return {Node|undefined} Node.
     * @private
     */
    private MULTIGEOMETRY_MEMBER_NODE_FACTORY_;
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Parser>>}
     */
    BOX_PARSERS_: {
        [x: string]: {
            [x: string]: import("../xml.js").Parser;
        };
    };
    /**
     * @const
     * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
     */
    GEOMETRY_SERIALIZERS: {
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
    RING_SERIALIZERS: {
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
     * @const
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
    ENVELOPE_SERIALIZERS: {
        [x: string]: {
            [x: string]: import("../xml.js").Serializer;
        };
    };
}
import GMLBase from "./GMLBase.js";
//# sourceMappingURL=GML2.d.ts.map