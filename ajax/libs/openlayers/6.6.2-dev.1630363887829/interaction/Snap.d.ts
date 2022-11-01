export default Snap;
export type Result = {
    /**
     * Snapped.
     */
    snapped: boolean;
    /**
     * Vertex.
     */
    vertex: number[] | null;
    /**
     * VertexPixel.
     */
    vertexPixel: number[] | null;
};
export type SegmentData = {
    /**
     * Feature.
     */
    feature: import("../Feature.js").default<any>;
    /**
     * Segment.
     */
    segment: number[][];
};
export type Options = {
    /**
     * Snap to these features. Either this option or source should be provided.
     */
    features?: import("../Collection.js").default<import("../Feature.js").default<any>>;
    /**
     * Snap to edges.
     */
    edge?: boolean;
    /**
     * Snap to vertices.
     */
    vertex?: boolean;
    /**
     * Pixel tolerance for considering the pointer close enough to a segment or
     * vertex for snapping.
     */
    pixelTolerance?: number;
    /**
     * Snap to features from this source. Either this option or features should be provided
     */
    source?: import("../source/Vector.js").default<any>;
};
/**
 * @classdesc
 * Handles snapping of vector features while modifying or drawing them.  The
 * features can come from a {@link module:ol/source/Vector} or {@link module:ol/Collection~Collection}
 * Any interaction object that allows the user to interact
 * with the features using the mouse can benefit from the snapping, as long
 * as it is added before.
 *
 * The snap interaction modifies map browser event `coordinate` and `pixel`
 * properties to force the snap to occur to any interaction that them.
 *
 * Example:
 *
 *     import Snap from 'ol/interaction/Snap';
 *
 *     const snap = new Snap({
 *       source: source
 *     });
 *
 *     map.addInteraction(snap);
 *
 * @api
 */
declare class Snap extends PointerInteraction {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @type {import("../source/Vector.js").default}
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
     * @type {import("../Collection.js").default<import("../Feature.js").default>}
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
     * @type {Object<string, function(import("../Feature.js").default, import("../geom/Geometry.js").default): void>}
     */
    private SEGMENT_WRITERS_;
    /**
     * Add a feature to the collection of features that we may snap to.
     * @param {import("../Feature.js").default} feature Feature.
     * @param {boolean} [opt_listen] Whether to listen to the feature change or not
     *     Defaults to `true`.
     * @api
     */
    addFeature(feature: import("../Feature.js").default<any>, opt_listen?: boolean | undefined): void;
    /**
     * @param {import("../Feature.js").default} feature Feature.
     * @private
     */
    private forEachFeatureAdd_;
    /**
     * @param {import("../Feature.js").default} feature Feature.
     * @private
     */
    private forEachFeatureRemove_;
    /**
     * @return {import("../Collection.js").default<import("../Feature.js").default>|Array<import("../Feature.js").default>} Features.
     * @private
     */
    private getFeatures_;
    /**
     * @param {import("../source/Vector.js").VectorSourceEvent|import("../Collection.js").CollectionEvent} evt Event.
     * @private
     */
    private handleFeatureAdd_;
    /**
     * @param {import("../source/Vector.js").VectorSourceEvent|import("../Collection.js").CollectionEvent} evt Event.
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
     * @param {boolean} [opt_unlisten] Whether to unlisten to the feature change
     *     or not. Defaults to `true`.
     * @api
     */
    removeFeature(feature: import("../Feature.js").default<any>, opt_unlisten?: boolean | undefined): void;
    /**
     * @param {import("../pixel.js").Pixel} pixel Pixel
     * @param {import("../coordinate.js").Coordinate} pixelCoordinate Coordinate
     * @param {import("../PluggableMap.js").default} map Map.
     * @return {Result} Snap result
     */
    snapTo(pixel: number[], pixelCoordinate: number[], map: import("../PluggableMap.js").default): Result;
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @private
     */
    private updateFeature_;
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/Circle.js").default} geometry Geometry.
     * @private
     */
    private writeCircleGeometry_;
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/GeometryCollection.js").default} geometry Geometry.
     * @private
     */
    private writeGeometryCollectionGeometry_;
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/LineString.js").default} geometry Geometry.
     * @private
     */
    private writeLineStringGeometry_;
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/MultiLineString.js").default} geometry Geometry.
     * @private
     */
    private writeMultiLineStringGeometry_;
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/MultiPoint.js").default} geometry Geometry.
     * @private
     */
    private writeMultiPointGeometry_;
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/MultiPolygon.js").default} geometry Geometry.
     * @private
     */
    private writeMultiPolygonGeometry_;
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/Point.js").default} geometry Geometry.
     * @private
     */
    private writePointGeometry_;
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/Polygon.js").default} geometry Geometry.
     * @private
     */
    private writePolygonGeometry_;
}
import PointerInteraction from "./Pointer.js";
//# sourceMappingURL=Snap.d.ts.map