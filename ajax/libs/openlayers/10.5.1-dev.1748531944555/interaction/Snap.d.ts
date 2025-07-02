export default Snap;
/**
 * An array of two coordinates representing a line segment, or an array of one
 * coordinate representing a point.
 */
export type Segment = Array<import("../coordinate.js").Coordinate>;
export type SegmentData = {
    /**
     * Feature.
     */
    feature: import("../Feature.js").default;
    /**
     * Segment.
     */
    segment: Segment;
    /**
     * Is intersection.
     */
    isIntersection?: boolean | undefined;
};
/**
 * A function taking a {@link module :ol/geom/Geometry~Geometry} as argument and returning an array of {@link Segment}s.
 */
export type Segmenter<GeometryType extends import("../geom/Geometry.js").default = import("../geom/Geometry.js").default> = (geometry: GeometryType, projection?: import("../proj/Projection.js").default) => Array<Segment>;
/**
 * Each segmenter specified here will override the default segmenter for the
 * corresponding geometry type. To exclude all geometries of a specific geometry type from being snapped to,
 * set the segmenter to `null`.
 */
export type Segmenters = {
    /**
     * Point segmenter.
     */
    Point?: Segmenter<import("../geom/Point.js").default> | null | undefined;
    /**
     * LineString segmenter.
     */
    LineString?: Segmenter<import("../geom/LineString.js").default> | null | undefined;
    /**
     * Polygon segmenter.
     */
    Polygon?: Segmenter<import("../geom/Polygon.js").default> | null | undefined;
    /**
     * Circle segmenter.
     */
    Circle?: Segmenter<import("../geom/Circle.js").default> | null | undefined;
    /**
     * GeometryCollection segmenter.
     */
    GeometryCollection?: Segmenter<import("../geom/GeometryCollection.js").default> | null | undefined;
    /**
     * MultiPoint segmenter.
     */
    MultiPoint?: Segmenter<import("../geom/MultiPoint.js").default> | null | undefined;
    /**
     * MultiLineString segmenter.
     */
    MultiLineString?: Segmenter<import("../geom/MultiLineString.js").default> | null | undefined;
    /**
     * MultiPolygon segmenter.
     */
    MultiPolygon?: Segmenter<import("../geom/MultiPolygon.js").default> | null | undefined;
};
export type Options = {
    /**
     * Snap to these features. Either this option or source should be provided.
     */
    features?: import("../Collection.js").default<import("../Feature.js").default<import("../geom/Geometry.js").default>> | undefined;
    /**
     * Snap to features from this source. Either this option or features should be provided
     */
    source?: import("../source/Vector.js").default<import("../Feature.js").default<import("../geom/Geometry.js").default>> | undefined;
    /**
     * Snap to edges.
     */
    edge?: boolean | undefined;
    /**
     * Snap to vertices.
     */
    vertex?: boolean | undefined;
    /**
     * Snap to intersections between segments.
     */
    intersection?: boolean | undefined;
    /**
     * Pixel tolerance for considering the pointer close enough to a segment or
     * vertex for snapping.
     */
    pixelTolerance?: number | undefined;
    /**
     * Custom segmenters by {@link module :ol/geom/Geometry~Type}. By default, the
     * following segmenters are used:
     * - `Point`: A one-dimensional segment (e.g. `[[10, 20]]`) representing the point.
     * - `LineString`: One two-dimensional segment (e.g. `[[10, 20], [30, 40]]`) for each segment of the linestring.
     * - `Polygon`: One two-dimensional segment for each segment of the exterior ring and the interior rings.
     * - `Circle`: One two-dimensional segment for each segment of a regular polygon with 32 points representing the circle circumference.
     * - `GeometryCollection`: All segments of the contained geometries.
     * - `MultiPoint`: One one-dimensional segment for each point.
     * - `MultiLineString`: One two-dimensional segment for each segment of the linestrings.
     * - `MultiPolygon`: One two-dimensional segment for each segment of the polygons.
     */
    segmenters?: Segmenters | undefined;
};
/**
 * Information about the last snapped state.
 */
export type SnappedInfo = {
    /**
     * - The snapped vertex.
     */
    vertex: import("../coordinate.js").Coordinate | null;
    /**
     * - The pixel of the snapped vertex.
     */
    vertexPixel: import("../pixel.js").Pixel | null;
    /**
     * - The feature being snapped.
     */
    feature: import("../Feature.js").default | null;
    /**
     * - Segment, or `null` if snapped to a vertex.
     */
    segment: Segment | null;
};
/**
 * *
 */
export type SnapOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("../ObjectEventType").Types | "change:active", import("../Object").ObjectEvent, Return> & import("../Observable").OnSignature<"snap" | "unsnap", SnapEvent, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("../ObjectEventType").Types | "change:active" | "snap" | "unsnap", Return>;
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'snap'|'unsnap', SnapEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'snap'|'unsnap', Return>} SnapOnSignature
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
    constructor(options?: Options);
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
     * @private
     * @type {boolean}
     */
    private intersection_;
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
     * Holds information about the last snapped state.
     * @type {SnappedInfo|null}
     * @private
     */
    private snapped_;
    /**
     * @type {Object<string, Segmenter>}
     * @private
     */
    private segmenters_;
    /**
     * Add a feature to the collection of features that we may snap to.
     * @param {import("../Feature.js").default} feature Feature.
     * @param {boolean} [register] Whether to listen to the feature change or not
     *     Defaults to `true`.
     * @api
     */
    addFeature(feature: import("../Feature.js").default, register?: boolean): void;
    /**
     * @return {import("../Collection.js").default<import("../Feature.js").default>|Array<import("../Feature.js").default>} Features.
     * @private
     */
    private getFeatures_;
    /**
     * Checks if two snap data sets are equal.
     * Compares the segment and the feature.
     *
     * @param {SnappedInfo} data1 The first snap data set.
     * @param {SnappedInfo} data2 The second snap data set.
     * @return {boolean} `true` if the data sets are equal, otherwise `false`.
     * @private
     */
    private areSnapDataEqual_;
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
    removeFeature(feature: import("../Feature.js").default, unlisten?: boolean): void;
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
     * @return {SnappedInfo|null} Snap result
     */
    snapTo(pixel: import("../pixel.js").Pixel, pixelCoordinate: import("../coordinate.js").Coordinate, map: import("../Map.js").default): SnappedInfo | null;
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @private
     */
    private updateFeature_;
}
import { SnapEvent } from '../events/SnapEvent.js';
import PointerInteraction from './Pointer.js';
//# sourceMappingURL=Snap.d.ts.map