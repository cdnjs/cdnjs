export default Snap;
export type Result = {
    /**
     * Vertex.
     */
    vertex: import("../coordinate.js").Coordinate | null;
    /**
     * VertexPixel.
     */
    vertexPixel: import("../pixel.js").Pixel | null;
    /**
     * Feature.
     */
    feature: import("../Feature.js").default | null;
    /**
     * Segment, or `null` if snapped to a vertex.
     */
    segment: Array<import("../coordinate.js").Coordinate> | null;
};
export type SegmentData = {
    /**
     * Feature.
     */
    feature: import("../Feature.js").default;
    /**
     * Segment.
     */
    segment: Array<import("../coordinate.js").Coordinate>;
};
export type Options = {
    /**
     * Snap to these features. Either this option or source should be provided.
     */
    features?: import("../Collection.js").default<import("../Feature.js").default<import("../geom/Geometry.js").default>> | undefined;
    /**
     * Snap to edges.
     */
    edge?: boolean | undefined;
    /**
     * Snap to vertices.
     */
    vertex?: boolean | undefined;
    /**
     * Pixel tolerance for considering the pointer close enough to a segment or
     * vertex for snapping.
     */
    pixelTolerance?: number | undefined;
    /**
     * Snap to features from this source. Either this option or features should be provided
     */
    source?: import("../source/Vector.js").default<import("../Feature.js").default<import("../geom/Geometry.js").default>> | undefined;
};
/**
 * *
 */
export type SnapOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("../ObjectEventType").Types | "change:active", import("../Object").ObjectEvent, Return> & import("../Observable").OnSignature<"snap", SnapEvent, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("../ObjectEventType").Types | "change:active" | "snap", Return>;
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'snap', SnapEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'snap', Return>} SnapOnSignature
 */
/**
 * @classdesc
 * Handles snapping of vector features while modifying or drawing them.  The
 * features can come from a {@link module:ol/source/Vector~VectorSource} or {@link module:ol/Collection~Collection}
 * Any interaction object that allows the user to interact
 * with the features using the mouse can benefit from the snapping, as long
 * as it is added before.
 *
 * The snap interaction modifies map browser event `coordinate` and `pixel`
 * properties to force the snap to occur to any interaction that uses them.
 *
 * Example:
 *
 *     import Snap from 'ol/interaction/Snap.js';
 *
 *     const snap = new Snap({
 *       source: source
 *     });
 *
 *     map.addInteraction(snap);
 *
 * @fires SnapEvent
 * @api
 */
declare class Snap extends PointerInteraction {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
    /***
     * @type {SnapOnSignature<import("../events").EventsKey>}
     */
    on: SnapOnSignature<import("../events").EventsKey>;
    /***
     * @type {SnapOnSignature<import("../events").EventsKey>}
     */
    once: SnapOnSignature<import("../events").EventsKey>;
    /***
     * @type {SnapOnSignature<void>}
     */
    un: SnapOnSignature<void>;
    /**
     * @type {import("../source/Vector.js").default|null}
     * @private
     */
    private source_;
    /**
     * @private
     * @type {boolean}
     */
    private vertex_;
    /**
     * @private
     * @type {boolean}
     */
    private edge_;
    /**
     * @type {import("../Collection.js").default<import("../Feature.js").default>|null}
     * @private
     */
    private features_;
    /**
     * @type {Array<import("../events.js").EventsKey>}
     * @private
     */
    private featuresListenerKeys_;
    /**
     * @type {Object<string, import("../events.js").EventsKey>}
     * @private
     */
    private featureChangeListenerKeys_;
    /**
     * Extents are preserved so indexed segment can be quickly removed
     * when its feature geometry changes
     * @type {Object<string, import("../extent.js").Extent>}
     * @private
     */
    private indexedFeaturesExtents_;
    /**
     * If a feature geometry changes while a pointer drag|move event occurs, the
     * feature doesn't get updated right away.  It will be at the next 'pointerup'
     * event fired.
     * @type {!Object<string, import("../Feature.js").default>}
     * @private
     */
    private pendingFeatures_;
    /**
     * @type {number}
     * @private
     */
    private pixelTolerance_;
    /**
     * Segment RTree for each layer
     * @type {import("../structs/RBush.js").default<SegmentData>}
     * @private
     */
    private rBush_;
    /**
     * @const
     * @private
     * @type {Object<string, function(Array<Array<import('../coordinate.js').Coordinate>>, import("../geom/Geometry.js").default): void>}
     */
    private GEOMETRY_SEGMENTERS_;
    /**
     * Add a feature to the collection of features that we may snap to.
     * @param {import("../Feature.js").default} feature Feature.
     * @param {boolean} [register] Whether to listen to the feature change or not
     *     Defaults to `true`.
     * @api
     */
    addFeature(feature: import("../Feature.js").default, register?: boolean | undefined): void;
    /**
     * @return {import("../Collection.js").default<import("../Feature.js").default>|Array<import("../Feature.js").default>} Features.
     * @private
     */
    private getFeatures_;
    /**
     * @param {import("../source/Vector.js").VectorSourceEvent|import("../Collection.js").CollectionEvent<import("../Feature.js").default>} evt Event.
     * @private
     */
    private handleFeatureAdd_;
    /**
     * @param {import("../source/Vector.js").VectorSourceEvent|import("../Collection.js").CollectionEvent<import("../Feature.js").default>} evt Event.
     * @private
     */
    private handleFeatureRemove_;
    /**
     * @param {import("../events/Event.js").default} evt Event.
     * @private
     */
    private handleFeatureChange_;
    /**
     * Remove a feature from the collection of features that we may snap to.
     * @param {import("../Feature.js").default} feature Feature
     * @param {boolean} [unlisten] Whether to unlisten to the feature change
     *     or not. Defaults to `true`.
     * @api
     */
    removeFeature(feature: import("../Feature.js").default, unlisten?: boolean | undefined): void;
    /**
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../Map.js").default} map Map.
     * @override
     */
    override setMap(map: import("../Map.js").default): void;
    /**
     * @param {import("../pixel.js").Pixel} pixel Pixel
     * @param {import("../coordinate.js").Coordinate} pixelCoordinate Coordinate
     * @param {import("../Map.js").default} map Map.
     * @return {Result|null} Snap result
     */
    snapTo(pixel: import("../pixel.js").Pixel, pixelCoordinate: import("../coordinate.js").Coordinate, map: import("../Map.js").default): Result | null;
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @private
     */
    private updateFeature_;
    /**
     * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
     * @param {import("../geom/Circle.js").default} geometry Geometry.
     * @private
     */
    private segmentCircleGeometry_;
    /**
     * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
     * @param {import("../geom/GeometryCollection.js").default} geometry Geometry.
     * @private
     */
    private segmentGeometryCollectionGeometry_;
    /**
     * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
     * @param {import("../geom/LineString.js").default} geometry Geometry.
     * @private
     */
    private segmentLineStringGeometry_;
    /**
     * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
     * @param {import("../geom/MultiLineString.js").default} geometry Geometry.
     * @private
     */
    private segmentMultiLineStringGeometry_;
    /**
     * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
     * @param {import("../geom/MultiPoint.js").default} geometry Geometry.
     * @private
     */
    private segmentMultiPointGeometry_;
    /**
     * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
     * @param {import("../geom/MultiPolygon.js").default} geometry Geometry.
     * @private
     */
    private segmentMultiPolygonGeometry_;
    /**
     * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
     * @param {import("../geom/Point.js").default} geometry Geometry.
     * @private
     */
    private segmentPointGeometry_;
    /**
     * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
     * @param {import("../geom/Polygon.js").default} geometry Geometry.
     * @private
     */
    private segmentPolygonGeometry_;
}
import { SnapEvent } from '../events/SnapEvent.js';
import PointerInteraction from './Pointer.js';
//# sourceMappingURL=Snap.d.ts.map