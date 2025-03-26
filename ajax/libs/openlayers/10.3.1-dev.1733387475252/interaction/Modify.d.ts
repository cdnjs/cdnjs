/**
 * @typedef {Object} SegmentData
 * @property {Array<number>} [depth] Depth.
 * @property {Feature} feature Feature.
 * @property {import("../geom/SimpleGeometry.js").default} geometry Geometry.
 * @property {number} [index] Index.
 * @property {Array<Array<number>>} segment Segment.
 * @property {Array<SegmentData>} [featureSegments] FeatureSegments.
 */
/**
 * @typedef {[SegmentData, number]} DragSegment
 */
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event will be considered to add or move a
 * vertex to the sketch. Default is
 * {@link module:ol/events/condition.primaryAction}.
 * @property {import("../events/condition.js").Condition} [deleteCondition] A function
 * that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. By default,
 * {@link module:ol/events/condition.singleClick} with
 * {@link module:ol/events/condition.altKeyOnly} results in a vertex deletion.
 * @property {import("../events/condition.js").Condition} [insertVertexCondition] A
 * function that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and
 * returns a boolean to indicate whether a new vertex should be added to the sketch
 * features. Default is {@link module:ol/events/condition.always}.
 * @property {number} [pixelTolerance=10] Pixel tolerance for considering the
 * pointer close enough to a segment or vertex for editing.
 * @property {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike} [style]
 * Style used for the modification point or vertex. For linestrings and polygons, this will
 * be the affected vertex, for circles a point along the circle, and for points the actual
 * point. If not configured, the default edit style is used (see {@link module:ol/style/Style~Style}).
 * When using a style function, the point feature passed to the function will have an `existing` property -
 * indicating whether there is an existing vertex underneath or not, a `features`
 * property - an array whose entries are the features that are being modified, and a `geometries`
 * property - an array whose entries are the geometries that are being modified. Both arrays are
 * in the same order. The `geometries` are only useful when modifying geometry collections, where
 * the geometry will be the particular geometry from the collection that is being modified.
 * @property {VectorSource} [source] The vector source with
 * features to modify.  If a vector source is not provided, a feature collection
 * must be provided with the `features` option.
 * @property {boolean|import("../layer/BaseVector").default} [hitDetection] When configured, point
 * features will be considered for modification based on their visual appearance, instead of being within
 * the `pixelTolerance` from the pointer location. When a {@link module:ol/layer/BaseVector~BaseVectorLayer} is
 * provided, only the rendered representation of the features on that layer will be considered.
 * @property {Collection<Feature>} [features]
 * The features the interaction works on.  If a feature collection is not
 * provided, a vector source must be provided with the `source` option.
 * @property {boolean} [wrapX=false] Wrap the world horizontally on the sketch
 * overlay.
 * @property {boolean} [snapToPointer=!hitDetection] The vertex, point or segment being modified snaps to the
 * pointer coordinate when clicked within the `pixelTolerance`.
 */
/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Modify~Modify} instances are
 * instances of this type.
 */
export class ModifyEvent extends Event {
    /**
     * @param {ModifyEventType} type Type.
     * @param {Collection<Feature>} features
     * The features modified.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent
     * Associated {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
     */
    constructor(type: ModifyEventType, features: Collection<Feature>, mapBrowserEvent: import("../MapBrowserEvent.js").default<any>);
    /**
     * The features being modified.
     * @type {Collection<Feature>}
     * @api
     */
    features: Collection<Feature>;
    /**
     * Associated {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
     * @type {import("../MapBrowserEvent.js").default}
     * @api
     */
    mapBrowserEvent: import("../MapBrowserEvent.js").default<any>;
}
export default Modify;
export type SegmentData = {
    /**
     * Depth.
     */
    depth?: number[] | undefined;
    /**
     * Feature.
     */
    feature: Feature;
    /**
     * Geometry.
     */
    geometry: import("../geom/SimpleGeometry.js").default;
    /**
     * Index.
     */
    index?: number | undefined;
    /**
     * Segment.
     */
    segment: Array<Array<number>>;
    /**
     * FeatureSegments.
     */
    featureSegments?: SegmentData[] | undefined;
};
export type DragSegment = [SegmentData, number];
export type Options = {
    /**
     * A function that
     * takes a {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event will be considered to add or move a
     * vertex to the sketch. Default is
     * {@link module :ol/events/condition.primaryAction}.
     */
    condition?: import("../events/condition.js").Condition | undefined;
    /**
     * A function
     * that takes a {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled. By default,
     * {@link module :ol/events/condition.singleClick} with
     * {@link module :ol/events/condition.altKeyOnly} results in a vertex deletion.
     */
    deleteCondition?: import("../events/condition.js").Condition | undefined;
    /**
     * A
     * function that takes a {@link module :ol/MapBrowserEvent~MapBrowserEvent} and
     * returns a boolean to indicate whether a new vertex should be added to the sketch
     * features. Default is {@link module :ol/events/condition.always}.
     */
    insertVertexCondition?: import("../events/condition.js").Condition | undefined;
    /**
     * Pixel tolerance for considering the
     * pointer close enough to a segment or vertex for editing.
     */
    pixelTolerance?: number | undefined;
    /**
     * Style used for the modification point or vertex. For linestrings and polygons, this will
     * be the affected vertex, for circles a point along the circle, and for points the actual
     * point. If not configured, the default edit style is used (see {@link module :ol/style/Style~Style}).
     * When using a style function, the point feature passed to the function will have an `existing` property -
     * indicating whether there is an existing vertex underneath or not, a `features`
     * property - an array whose entries are the features that are being modified, and a `geometries`
     * property - an array whose entries are the geometries that are being modified. Both arrays are
     * in the same order. The `geometries` are only useful when modifying geometry collections, where
     * the geometry will be the particular geometry from the collection that is being modified.
     */
    style?: import("../style/Style.js").StyleLike | import("../style/flat.js").FlatStyleLike | undefined;
    /**
     * The vector source with
     * features to modify.  If a vector source is not provided, a feature collection
     * must be provided with the `features` option.
     */
    source?: VectorSource<Feature<import("../geom/Geometry.js").default>> | undefined;
    /**
     * When configured, point
     * features will be considered for modification based on their visual appearance, instead of being within
     * the `pixelTolerance` from the pointer location. When a {@link module :ol/layer/BaseVector~BaseVectorLayer} is
     * provided, only the rendered representation of the features on that layer will be considered.
     */
    hitDetection?: boolean | import("../layer/BaseVector").default<any, any, any> | undefined;
    /**
     * The features the interaction works on.  If a feature collection is not
     * provided, a vector source must be provided with the `source` option.
     */
    features?: Collection<Feature<import("../geom/Geometry.js").default>> | undefined;
    /**
     * Wrap the world horizontally on the sketch
     * overlay.
     */
    wrapX?: boolean | undefined;
    /**
     * The vertex, point or segment being modified snaps to the
     * pointer coordinate when clicked within the `pixelTolerance`.
     */
    snapToPointer?: boolean | undefined;
};
/**
 * *
 */
export type ModifyOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("../ObjectEventType").Types | "change:active", import("../Object").ObjectEvent, Return> & import("../Observable").OnSignature<"modifyend" | "modifystart", ModifyEvent, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("../ObjectEventType").Types | "change:active" | "modifyend" | "modifystart", Return>;
import Event from '../events/Event.js';
import Collection from '../Collection.js';
import Feature from '../Feature.js';
type ModifyEventType = string;
declare namespace ModifyEventType {
    let MODIFYSTART: string;
    let MODIFYEND: string;
}
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'modifyend'|'modifystart', ModifyEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'modifyend'|'modifystart', Return>} ModifyOnSignature
 */
/**
 * @classdesc
 * Interaction for modifying feature geometries.  To modify features that have
 * been added to an existing source, construct the modify interaction with the
 * `source` option.  If you want to modify features in a collection (for example,
 * the collection used by a select interaction), construct the interaction with
 * the `features` option.  The interaction must be constructed with either a
 * `source` or `features` option.
 *
 * Cartesian distance from the pointer is used to determine the features that
 * will be modified. This means that geometries will only be considered for
 * modification when they are within the configured `pixelTolerance`. For point
 * geometries, the `hitDetection` option can be used to match their visual
 * appearance.
 *
 * By default, the interaction will allow deletion of vertices when the `alt`
 * key is pressed.  To configure the interaction with a different condition
 * for deletion, use the `deleteCondition` option.
 * @fires ModifyEvent
 * @api
 */
declare class Modify extends PointerInteraction {
    /**
     * @param {Options} options Options.
     */
    constructor(options: Options);
    /***
     * @type {ModifyOnSignature<import("../events").EventsKey>}
     */
    on: ModifyOnSignature<import("../events").EventsKey>;
    /***
     * @type {ModifyOnSignature<import("../events").EventsKey>}
     */
    once: ModifyOnSignature<import("../events").EventsKey>;
    /***
     * @type {ModifyOnSignature<void>}
     */
    un: ModifyOnSignature<void>;
    /** @private */
    private boundHandleFeatureChange_;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private condition_;
    /**
     * @private
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Browser event.
     * @return {boolean} Combined condition result.
     */
    private defaultDeleteCondition_;
    /**
     * @type {import("../events/condition.js").Condition}
     * @private
     */
    private deleteCondition_;
    /**
     * @type {import("../events/condition.js").Condition}
     * @private
     */
    private insertVertexCondition_;
    /**
     * Editing vertex.
     * @type {Feature<Point>}
     * @private
     */
    private vertexFeature_;
    /**
     * Segments intersecting {@link this.vertexFeature_} by segment uid.
     * @type {Object<string, boolean>}
     * @private
     */
    private vertexSegments_;
    /**
     * @type {import("../pixel.js").Pixel}
     * @private
     */
    private lastPixel_;
    /**
     * Tracks if the next `singleclick` event should be ignored to prevent
     * accidental deletion right after vertex creation.
     * @type {boolean}
     * @private
     */
    private ignoreNextSingleClick_;
    /**
     * @type {Collection<Feature>}
     * @private
     */
    private featuresBeingModified_;
    /**
     * Segment RTree for each layer
     * @type {RBush<SegmentData>}
     * @private
     */
    private rBush_;
    /**
     * @type {number}
     * @private
     */
    private pixelTolerance_;
    /**
     * @type {boolean}
     * @private
     */
    private snappedToVertex_;
    /**
     * Indicate whether the interaction is currently changing a feature's
     * coordinates.
     * @type {boolean}
     * @private
     */
    private changingFeature_;
    /**
     * @type {Array<DragSegment>}
     * @private
     */
    private dragSegments_;
    /**
     * Draw overlay where sketch features are drawn.
     * @type {VectorLayer}
     * @private
     */
    private overlay_;
    /**
     * @const
     * @private
     * @type {!Object<string, function(Feature, import("../geom/Geometry.js").default): void>}
     */
    private SEGMENT_WRITERS_;
    /**
     * @type {VectorSource}
     * @private
     */
    private source_;
    /**
     * @type {boolean|import("../layer/BaseVector").default}
     * @private
     */
    private hitDetection_;
    /**
     * @type {Collection<Feature>}
     * @private
     */
    private features_;
    /**
     * @type {import("../MapBrowserEvent.js").default}
     * @private
     */
    private lastPointerEvent_;
    /**
     * Delta (x, y in map units) between matched rtree vertex and pointer vertex.
     * @type {Array<number>}
     * @private
     */
    private delta_;
    /**
     * @private
     */
    private snapToPointer_;
    /**
     * @param {Feature} feature Feature.
     * @private
     */
    private addFeature_;
    /**
     * @param {import("../MapBrowserEvent.js").default} evt Map browser event.
     * @param {Array<SegmentData>} segments The segments subject to modification.
     * @private
     */
    private willModifyFeatures_;
    /**
     * @param {Feature} feature Feature.
     * @private
     */
    private removeFeature_;
    /**
     * @param {Feature} feature Feature.
     * @private
     */
    private removeFeatureSegmentData_;
    /**
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../Map.js").default} map Map.
     * @override
     */
    override setMap(map: import("../Map.js").default): void;
    /**
     * Get the overlay layer that this interaction renders the modification point or vertex to.
     * @return {VectorLayer} Overlay layer.
     * @api
     */
    getOverlay(): VectorLayer;
    /**
     * @param {import("../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    private handleSourceAdd_;
    /**
     * @param {import("../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    private handleSourceRemove_;
    /**
     * @param {import("../Collection.js").CollectionEvent<Feature>} evt Event.
     * @private
     */
    private handleFeatureAdd_;
    /**
     * @param {import("../events/Event.js").default} evt Event.
     * @private
     */
    private handleFeatureChange_;
    /**
     * @param {import("../Collection.js").CollectionEvent<Feature>} evt Event.
     * @private
     */
    private handleFeatureRemove_;
    /**
     * @param {Feature} feature Feature
     * @param {Point} geometry Geometry.
     * @private
     */
    private writePointGeometry_;
    /**
     * @param {Feature} feature Feature
     * @param {import("../geom/MultiPoint.js").default} geometry Geometry.
     * @private
     */
    private writeMultiPointGeometry_;
    /**
     * @param {Feature} feature Feature
     * @param {import("../geom/LineString.js").default} geometry Geometry.
     * @private
     */
    private writeLineStringGeometry_;
    /**
     * @param {Feature} feature Feature
     * @param {import("../geom/MultiLineString.js").default} geometry Geometry.
     * @private
     */
    private writeMultiLineStringGeometry_;
    /**
     * @param {Feature} feature Feature
     * @param {import("../geom/Polygon.js").default} geometry Geometry.
     * @private
     */
    private writePolygonGeometry_;
    /**
     * @param {Feature} feature Feature
     * @param {import("../geom/MultiPolygon.js").default} geometry Geometry.
     * @private
     */
    private writeMultiPolygonGeometry_;
    /**
     * We convert a circle into two segments.  The segment at index
     * {@link CIRCLE_CENTER_INDEX} is the
     * circle's center (a point).  The segment at index
     * {@link CIRCLE_CIRCUMFERENCE_INDEX} is
     * the circumference, and is not a line segment.
     *
     * @param {Feature} feature Feature.
     * @param {import("../geom/Circle.js").default} geometry Geometry.
     * @private
     */
    private writeCircleGeometry_;
    /**
     * @param {Feature} feature Feature
     * @param {import("../geom/GeometryCollection.js").default} geometry Geometry.
     * @private
     */
    private writeGeometryCollectionGeometry_;
    /**
     * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
     * @param {Array<Feature>} features The features being modified.
     * @param {Array<import("../geom/SimpleGeometry.js").default>} geometries The geometries being modified.
     * @param {boolean} existing The vertex represents an existing vertex.
     * @return {Feature} Vertex feature.
     * @private
     */
    private createOrUpdateVertexFeature_;
    findInsertVerticesAndUpdateDragSegments_(pixelCoordinate: any): SegmentData[] | undefined;
    /**
     * @param {import("../MapBrowserEvent.js").default} evt Event.
     * @private
     */
    private handlePointerMove_;
    /**
     * @param {import("../coordinate.js").Coordinate} pixelCoordinate The pixel Coordinate.
     * @private
     */
    private handlePointerAtPixel_;
    /**
     * @param {SegmentData} segmentData Segment data.
     * @param {import("../coordinate.js").Coordinate} vertex Vertex.
     * @return {boolean} A vertex was inserted.
     * @private
     */
    private insertVertex_;
    updatePointer_(coordinate: any): import("../coordinate.js").Coordinate;
    /**
     * Get the current pointer position.
     * @return {import("../coordinate.js").Coordinate | null} The current pointer coordinate.
     */
    getPoint(): import("../coordinate.js").Coordinate | null;
    /**
     * Check if a point can be removed from the current linestring or polygon at the current
     * pointer position.
     * @return {boolean} A point can be deleted at the current pointer position.
     * @api
     */
    canRemovePoint(): boolean;
    /**
     * Removes the vertex currently being pointed from the current linestring or polygon.
     * @param {import('../coordinate.js').Coordinate} [coordinate] If provided, the pointer
     * will be set to the provided coordinate. If not, the current pointer coordinate will be used.
     * @return {boolean} True when a vertex was removed.
     * @api
     */
    removePoint(coordinate?: import("../coordinate.js").Coordinate): boolean;
    /**
     * Removes a vertex from all matching features.
     * @return {boolean} True when a vertex was removed.
     * @private
     */
    private removeVertex_;
    /**
     * Check if a point can be inserted to the current linestring or polygon at the current
     * pointer position.
     * @return {boolean} A point can be inserted at the current pointer position.
     * @api
     */
    canInsertPoint(): boolean;
    /**
     * Inserts the vertex currently being pointed to the current linestring or polygon.
     * @param {import('../coordinate.js').Coordinate} [coordinate] If provided, the pointer
     * will be set to the provided coordinate. If not, the current pointer coordinate will be used.
     * @return {boolean} A vertex was inserted.
     * @api
     */
    insertPoint(coordinate?: import("../coordinate.js").Coordinate): boolean;
    /**
     * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
     * @param {Array} coordinates Coordinates.
     * @private
     */
    private setGeometryCoordinates_;
    /**
     * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
     * @param {number} index Index.
     * @param {Array<number>|undefined} depth Depth.
     * @param {number} delta Delta (1 or -1).
     * @private
     */
    private updateSegmentIndices_;
}
import VectorSource from '../source/Vector.js';
import PointerInteraction from './Pointer.js';
import VectorLayer from '../layer/Vector.js';
//# sourceMappingURL=Modify.d.ts.map