/**
 * @typedef {Object} SegmentData
 * @property {Array<number>} [depth]
 * @property {Feature} feature
 * @property {import("../geom/SimpleGeometry.js").default} geometry
 * @property {number} [index]
 * @property {Array<import("../extent.js").Extent>} segment
 * @property {Array<SegmentData>} [featureSegments]
 */
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event will be considered to add or move a
 * vertex to the sketch. Default is
 * {@link module:ol/events/condition~primaryAction}.
 * @property {import("../events/condition.js").Condition} [deleteCondition] A function
 * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. By default,
 * {@link module:ol/events/condition~singleClick} with
 * {@link module:ol/events/condition~altKeyOnly} results in a vertex deletion.
 * @property {import("../events/condition.js").Condition} [insertVertexCondition] A
 * function that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and
 * returns a boolean to indicate whether a new vertex should be added to the sketch
 * features. Default is {@link module:ol/events/condition~always}.
 * @property {number} [pixelTolerance=10] Pixel tolerance for considering the
 * pointer close enough to a segment or vertex for editing.
 * @property {import("../style/Style.js").StyleLike} [style]
 * Style used for the features being modified. By default the default edit
 * style is used (see {@link module:ol/style}).
 * @property {VectorSource} [source] The vector source with
 * features to modify.  If a vector source is not provided, a feature collection
 * must be provided with the features option.
 * @property {Collection<Feature>} [features]
 * The features the interaction works on.  If a feature collection is not
 * provided, a vector source must be provided with the source option.
 * @property {boolean} [wrapX=false] Wrap the world horizontally on the sketch
 * overlay.
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
     * @param {import("../MapBrowserPointerEvent.js").default} mapBrowserPointerEvent
     * Associated {@link module:ol/MapBrowserPointerEvent}.
     */
    constructor(type: string, features: Collection<Feature<any>>, mapBrowserPointerEvent: import("../MapBrowserPointerEvent.js").default);
    /**
     * The features being modified.
     * @type {Collection<Feature>}
     * @api
     */
    features: Collection<Feature>;
    /**
     * Associated {@link module:ol/MapBrowserEvent}.
     * @type {import("../MapBrowserEvent.js").default}
     * @api
     */
    mapBrowserEvent: import("../MapBrowserEvent.js").default;
}
export default Modify;
export type ModifyEventType = string;
export type SegmentData = {
    depth?: number[];
    feature: Feature<any>;
    geometry: import("../geom/SimpleGeometry.js").default;
    index?: number;
    segment: number[][];
    featureSegments?: SegmentData[];
};
export type Options = {
    /**
     * A function that
     * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event will be considered to add or move a
     * vertex to the sketch. Default is
     * {@link module:ol/events/condition~primaryAction}.
     */
    condition?: (this: any, arg1: import("../MapBrowserEvent.js").default) => boolean;
    /**
     * A function
     * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled. By default,
     * {@link module:ol/events/condition~singleClick} with
     * {@link module:ol/events/condition~altKeyOnly} results in a vertex deletion.
     */
    deleteCondition?: (this: any, arg1: import("../MapBrowserEvent.js").default) => boolean;
    /**
     * A
     * function that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and
     * returns a boolean to indicate whether a new vertex should be added to the sketch
     * features. Default is {@link module:ol/events/condition~always}.
     */
    insertVertexCondition?: (this: any, arg1: import("../MapBrowserEvent.js").default) => boolean;
    /**
     * Pixel tolerance for considering the
     * pointer close enough to a segment or vertex for editing.
     */
    pixelTolerance?: number;
    /**
     * Style used for the features being modified. By default the default edit
     * style is used (see {@link module:ol/style}).
     */
    style?: import("../style/Style.js").default | import("../style/Style.js").default[] | ((arg0: import("../render/Feature.js").default | Feature<any>, arg1: number) => void | import("../style/Style.js").default | import("../style/Style.js").default[]);
    /**
     * The vector source with
     * features to modify.  If a vector source is not provided, a feature collection
     * must be provided with the features option.
     */
    source?: VectorSource<any>;
    /**
     * The features the interaction works on.  If a feature collection is not
     * provided, a vector source must be provided with the source option.
     */
    features?: Collection<Feature<any>>;
    /**
     * Wrap the world horizontally on the sketch
     * overlay.
     */
    wrapX?: boolean;
};
import Event from "../events/Event.js";
import Collection from "../Collection.js";
import Feature from "../Feature.js";
/**
 * @classdesc
 * Interaction for modifying feature geometries.  To modify features that have
 * been added to an existing source, construct the modify interaction with the
 * `source` option.  If you want to modify features in a collection (for example,
 * the collection used by a select interaction), construct the interaction with
 * the `features` option.  The interaction must be constructed with either a
 * `source` or `features` option.
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
     * @type {Feature}
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
     * @type {boolean}
     * @private
     */
    private modified_;
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
     * @type {Array}
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
     * @type {Collection<Feature>}
     * @private
     */
    private features_;
    /**
     * @type {import("../MapBrowserPointerEvent.js").default}
     * @private
     */
    private lastPointerEvent_;
    /**
     * @param {Feature} feature Feature.
     * @private
     */
    private addFeature_;
    /**
     * @param {import("../MapBrowserPointerEvent.js").default} evt Map browser event
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
     * @inheritDoc
     */
    setActive(active: any): void;
    /**
     * @inheritDoc
     */
    setMap(map: any): void;
    /**
     * Get the overlay layer that this interaction renders sketch features to.
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
     * @param {import("../Collection.js").CollectionEvent} evt Event.
     * @private
     */
    private handleFeatureAdd_;
    /**
     * @param {import("../events/Event.js").default} evt Event.
     * @private
     */
    private handleFeatureChange_;
    /**
     * @param {import("../Collection.js").CollectionEvent} evt Event.
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
     * @return {Feature} Vertex feature.
     * @private
     */
    private createOrUpdateVertexFeature_;
    /**
     * @inheritDoc
     */
    handleDragEvent(evt: any): void;
    /**
     * @inheritDoc
     */
    handleDownEvent(evt: any): boolean;
    /**
     * @inheritDoc
     */
    handleUpEvent(evt: any): boolean;
    /**
     * @param {import("../MapBrowserEvent.js").default} evt Event.
     * @private
     */
    private handlePointerMove_;
    /**
     * @param {import("../pixel.js").Pixel} pixel Pixel
     * @param {import("../PluggableMap.js").default} map Map.
     * @param {import("../coordinate.js").Coordinate=} opt_coordinate The pixel Coordinate.
     * @private
     */
    private handlePointerAtPixel_;
    /**
     * @param {SegmentData} segmentData Segment data.
     * @param {import("../coordinate.js").Coordinate} vertex Vertex.
     * @private
     */
    private insertVertex_;
    /**
     * Removes the vertex currently being pointed.
     * @return {boolean} True when a vertex was removed.
     * @api
     */
    removePoint(): boolean;
    /**
     * Removes a vertex from all matching features.
     * @return {boolean} True when a vertex was removed.
     * @private
     */
    private removeVertex_;
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
import VectorSource from "../source/Vector.js";
import PointerInteraction from "./Pointer.js";
import VectorLayer from "../layer/Vector.js";
//# sourceMappingURL=Modify.d.ts.map