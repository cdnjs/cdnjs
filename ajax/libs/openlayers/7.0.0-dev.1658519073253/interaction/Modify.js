var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/interaction/Modify
 */
import Collection from '../Collection.js';
import CollectionEventType from '../CollectionEventType.js';
import Event from '../events/Event.js';
import EventType from '../events/EventType.js';
import Feature from '../Feature.js';
import MapBrowserEventType from '../MapBrowserEventType.js';
import Point from '../geom/Point.js';
import PointerInteraction from './Pointer.js';
import RBush from '../structs/RBush.js';
import VectorEventType from '../source/VectorEventType.js';
import VectorLayer from '../layer/Vector.js';
import VectorSource from '../source/Vector.js';
import { altKeyOnly, always, primaryAction, singleClick, } from '../events/condition.js';
import { boundingExtent, buffer as bufferExtent, createOrUpdateFromCoordinate as createExtent, } from '../extent.js';
import { closestOnSegment, distance as coordinateDistance, equals as coordinatesEqual, squaredDistance as squaredCoordinateDistance, squaredDistanceToSegment, } from '../coordinate.js';
import { createEditingStyle } from '../style/Style.js';
import { equals, includes } from '../array.js';
import { fromCircle } from '../geom/Polygon.js';
import { fromUserCoordinate, fromUserExtent, getUserProjection, toUserCoordinate, toUserExtent, } from '../proj.js';
import { getUid } from '../util.js';
/**
 * The segment index assigned to a circle's center when
 * breaking up a circle into ModifySegmentDataType segments.
 * @type {number}
 */
var CIRCLE_CENTER_INDEX = 0;
/**
 * The segment index assigned to a circle's circumference when
 * breaking up a circle into ModifySegmentDataType segments.
 * @type {number}
 */
var CIRCLE_CIRCUMFERENCE_INDEX = 1;
var tempExtent = [0, 0, 0, 0];
var tempSegment = [];
/**
 * @enum {string}
 */
var ModifyEventType = {
    /**
     * Triggered upon feature modification start
     * @event ModifyEvent#modifystart
     * @api
     */
    MODIFYSTART: 'modifystart',
    /**
     * Triggered upon feature modification end
     * @event ModifyEvent#modifyend
     * @api
     */
    MODIFYEND: 'modifyend',
};
/**
 * @typedef {Object} SegmentData
 * @property {Array<number>} [depth] Depth.
 * @property {import("../Feature").FeatureLike} feature Feature.
 * @property {import("../geom/SimpleGeometry.js").default} geometry Geometry.
 * @property {number} [index] Index.
 * @property {Array<Array<number>>} segment Segment.
 * @property {Array<SegmentData>} [featureSegments] FeatureSegments.
 */
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event will be considered to add or move a
 * vertex to the sketch. Default is
 * {@link module:ol/events/condition.primaryAction}.
 * @property {import("../events/condition.js").Condition} [deleteCondition] A function
 * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. By default,
 * {@link module:ol/events/condition.singleClick} with
 * {@link module:ol/events/condition.altKeyOnly} results in a vertex deletion.
 * @property {import("../events/condition.js").Condition} [insertVertexCondition] A
 * function that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and
 * returns a boolean to indicate whether a new vertex should be added to the sketch
 * features. Default is {@link module:ol/events/condition.always}.
 * @property {number} [pixelTolerance=10] Pixel tolerance for considering the
 * pointer close enough to a segment or vertex for editing.
 * @property {import("../style/Style.js").StyleLike} [style]
 * Style used for the modification point or vertex. For linestrings and polygons, this will
 * be the affected vertex, for circles a point along the circle, and for points the actual
 * point. If not configured, the default edit style is used (see {@link module:ol/style/Style~Style}).
 * When using a style function, the point feature passed to the function will have a `features`
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
var ModifyEvent = /** @class */ (function (_super) {
    __extends(ModifyEvent, _super);
    /**
     * @param {ModifyEventType} type Type.
     * @param {Collection<import("../Feature").FeatureLike>} features
     * The features modified.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent
     * Associated {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
     */
    function ModifyEvent(type, features, mapBrowserEvent) {
        var _this = _super.call(this, type) || this;
        /**
         * The features being modified.
         * @type {Collection<import("../Feature").FeatureLike>}
         * @api
         */
        _this.features = features;
        /**
         * Associated {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
         * @type {import("../MapBrowserEvent.js").default}
         * @api
         */
        _this.mapBrowserEvent = mapBrowserEvent;
        return _this;
    }
    return ModifyEvent;
}(Event));
export { ModifyEvent };
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
var Modify = /** @class */ (function (_super) {
    __extends(Modify, _super);
    /**
     * @param {Options} options Options.
     */
    function Modify(options) {
        var _this = _super.call(this, /** @type {import("./Pointer.js").Options} */ (options)) || this;
        /***
         * @type {ModifyOnSignature<import("../events").EventsKey>}
         */
        _this.on;
        /***
         * @type {ModifyOnSignature<import("../events").EventsKey>}
         */
        _this.once;
        /***
         * @type {ModifyOnSignature<void>}
         */
        _this.un;
        /** @private */
        _this.boundHandleFeatureChange_ = _this.handleFeatureChange_.bind(_this);
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.condition_ = options.condition ? options.condition : primaryAction;
        /**
         * @private
         * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Browser event.
         * @return {boolean} Combined condition result.
         */
        _this.defaultDeleteCondition_ = function (mapBrowserEvent) {
            return altKeyOnly(mapBrowserEvent) && singleClick(mapBrowserEvent);
        };
        /**
         * @type {import("../events/condition.js").Condition}
         * @private
         */
        _this.deleteCondition_ = options.deleteCondition
            ? options.deleteCondition
            : _this.defaultDeleteCondition_;
        /**
         * @type {import("../events/condition.js").Condition}
         * @private
         */
        _this.insertVertexCondition_ = options.insertVertexCondition
            ? options.insertVertexCondition
            : always;
        /**
         * Editing vertex.
         * @type {Feature<Point>}
         * @private
         */
        _this.vertexFeature_ = null;
        /**
         * Segments intersecting {@link this.vertexFeature_} by segment uid.
         * @type {Object<string, boolean>}
         * @private
         */
        _this.vertexSegments_ = null;
        /**
         * @type {import("../pixel.js").Pixel}
         * @private
         */
        _this.lastPixel_ = [0, 0];
        /**
         * Tracks if the next `singleclick` event should be ignored to prevent
         * accidental deletion right after vertex creation.
         * @type {boolean}
         * @private
         */
        _this.ignoreNextSingleClick_ = false;
        /**
         * @type {Collection<import("../Feature").FeatureLike>}
         * @private
         */
        _this.featuresBeingModified_ = null;
        /**
         * Segment RTree for each layer
         * @type {RBush<SegmentData>}
         * @private
         */
        _this.rBush_ = new RBush();
        /**
         * @type {number}
         * @private
         */
        _this.pixelTolerance_ =
            options.pixelTolerance !== undefined ? options.pixelTolerance : 10;
        /**
         * @type {boolean}
         * @private
         */
        _this.snappedToVertex_ = false;
        /**
         * Indicate whether the interaction is currently changing a feature's
         * coordinates.
         * @type {boolean}
         * @private
         */
        _this.changingFeature_ = false;
        /**
         * @type {Array}
         * @private
         */
        _this.dragSegments_ = [];
        /**
         * Draw overlay where sketch features are drawn.
         * @type {VectorLayer}
         * @private
         */
        _this.overlay_ = new VectorLayer({
            source: new VectorSource({
                useSpatialIndex: false,
                wrapX: !!options.wrapX,
            }),
            style: options.style ? options.style : getDefaultStyleFunction(),
            updateWhileAnimating: true,
            updateWhileInteracting: true,
        });
        /**
         * @const
         * @private
         * @type {!Object<string, function(Feature, import("../geom/Geometry.js").default): void>}
         */
        _this.SEGMENT_WRITERS_ = {
            'Point': _this.writePointGeometry_.bind(_this),
            'LineString': _this.writeLineStringGeometry_.bind(_this),
            'LinearRing': _this.writeLineStringGeometry_.bind(_this),
            'Polygon': _this.writePolygonGeometry_.bind(_this),
            'MultiPoint': _this.writeMultiPointGeometry_.bind(_this),
            'MultiLineString': _this.writeMultiLineStringGeometry_.bind(_this),
            'MultiPolygon': _this.writeMultiPolygonGeometry_.bind(_this),
            'Circle': _this.writeCircleGeometry_.bind(_this),
            'GeometryCollection': _this.writeGeometryCollectionGeometry_.bind(_this),
        };
        /**
         * @type {VectorSource}
         * @private
         */
        _this.source_ = null;
        /**
         * @type {boolean|import("../layer/BaseVector").default}
         */
        _this.hitDetection_ = null;
        var features;
        if (options.features) {
            features = options.features;
        }
        else if (options.source) {
            _this.source_ = options.source;
            features = new Collection(_this.source_.getFeatures());
            _this.source_.addEventListener(VectorEventType.ADDFEATURE, _this.handleSourceAdd_.bind(_this));
            _this.source_.addEventListener(VectorEventType.REMOVEFEATURE, _this.handleSourceRemove_.bind(_this));
        }
        if (!features) {
            throw new Error('The modify interaction requires features, a source or a layer');
        }
        if (options.hitDetection) {
            _this.hitDetection_ = options.hitDetection;
        }
        /**
         * @type {Collection<import("../Feature.js").FeatureLike>}
         * @private
         */
        _this.features_ = features;
        _this.features_.forEach(_this.addFeature_.bind(_this));
        _this.features_.addEventListener(CollectionEventType.ADD, _this.handleFeatureAdd_.bind(_this));
        _this.features_.addEventListener(CollectionEventType.REMOVE, _this.handleFeatureRemove_.bind(_this));
        /**
         * @type {import("../MapBrowserEvent.js").default}
         * @private
         */
        _this.lastPointerEvent_ = null;
        /**
         * Delta (x, y in map units) between matched rtree vertex and pointer vertex.
         * @type {Array<number>}
         */
        _this.delta_ = [0, 0];
        /**
         * @private
         */
        _this.snapToPointer_ =
            options.snapToPointer === undefined
                ? !_this.hitDetection_
                : options.snapToPointer;
        return _this;
    }
    /**
     * @param {Feature} feature Feature.
     * @private
     */
    Modify.prototype.addFeature_ = function (feature) {
        var geometry = feature.getGeometry();
        if (geometry) {
            var writer = this.SEGMENT_WRITERS_[geometry.getType()];
            if (writer) {
                writer(feature, geometry);
            }
        }
        var map = this.getMap();
        if (map && map.isRendered() && this.getActive()) {
            this.handlePointerAtPixel_(this.lastPixel_, map);
        }
        feature.addEventListener(EventType.CHANGE, this.boundHandleFeatureChange_);
    };
    /**
     * @param {import("../MapBrowserEvent.js").default} evt Map browser event.
     * @param {Array<Array<SegmentData>>} segments The segments subject to modification.
     * @private
     */
    Modify.prototype.willModifyFeatures_ = function (evt, segments) {
        if (!this.featuresBeingModified_) {
            this.featuresBeingModified_ = new Collection();
            var features = this.featuresBeingModified_.getArray();
            for (var i = 0, ii = segments.length; i < ii; ++i) {
                var segment = segments[i];
                for (var s = 0, ss = segment.length; s < ss; ++s) {
                    var feature = segment[s].feature;
                    if (feature && features.indexOf(feature) === -1) {
                        this.featuresBeingModified_.push(feature);
                    }
                }
            }
            if (this.featuresBeingModified_.getLength() === 0) {
                this.featuresBeingModified_ = null;
            }
            else {
                this.dispatchEvent(new ModifyEvent(ModifyEventType.MODIFYSTART, this.featuresBeingModified_, evt));
            }
        }
    };
    /**
     * @param {Feature} feature Feature.
     * @private
     */
    Modify.prototype.removeFeature_ = function (feature) {
        this.removeFeatureSegmentData_(feature);
        // Remove the vertex feature if the collection of candidate features is empty.
        if (this.vertexFeature_ && this.features_.getLength() === 0) {
            this.overlay_.getSource().removeFeature(this.vertexFeature_);
            this.vertexFeature_ = null;
        }
        feature.removeEventListener(EventType.CHANGE, this.boundHandleFeatureChange_);
    };
    /**
     * @param {Feature} feature Feature.
     * @private
     */
    Modify.prototype.removeFeatureSegmentData_ = function (feature) {
        var rBush = this.rBush_;
        /** @type {Array<SegmentData>} */
        var nodesToRemove = [];
        rBush.forEach(
        /**
         * @param {SegmentData} node RTree node.
         */
        function (node) {
            if (feature === node.feature) {
                nodesToRemove.push(node);
            }
        });
        for (var i = nodesToRemove.length - 1; i >= 0; --i) {
            var nodeToRemove = nodesToRemove[i];
            for (var j = this.dragSegments_.length - 1; j >= 0; --j) {
                if (this.dragSegments_[j][0] === nodeToRemove) {
                    this.dragSegments_.splice(j, 1);
                }
            }
            rBush.remove(nodeToRemove);
        }
    };
    /**
     * Activate or deactivate the interaction.
     * @param {boolean} active Active.
     * @observable
     * @api
     */
    Modify.prototype.setActive = function (active) {
        if (this.vertexFeature_ && !active) {
            this.overlay_.getSource().removeFeature(this.vertexFeature_);
            this.vertexFeature_ = null;
        }
        _super.prototype.setActive.call(this, active);
    };
    /**
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../PluggableMap.js").default} map Map.
     */
    Modify.prototype.setMap = function (map) {
        this.overlay_.setMap(map);
        _super.prototype.setMap.call(this, map);
    };
    /**
     * Get the overlay layer that this interaction renders the modification point or vertex to.
     * @return {VectorLayer} Overlay layer.
     * @api
     */
    Modify.prototype.getOverlay = function () {
        return this.overlay_;
    };
    /**
     * @param {import("../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    Modify.prototype.handleSourceAdd_ = function (event) {
        if (event.feature) {
            this.features_.push(event.feature);
        }
    };
    /**
     * @param {import("../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    Modify.prototype.handleSourceRemove_ = function (event) {
        if (event.feature) {
            this.features_.remove(event.feature);
        }
    };
    /**
     * @param {import("../Collection.js").CollectionEvent} evt Event.
     * @private
     */
    Modify.prototype.handleFeatureAdd_ = function (evt) {
        this.addFeature_(/** @type {Feature} */ (evt.element));
    };
    /**
     * @param {import("../events/Event.js").default} evt Event.
     * @private
     */
    Modify.prototype.handleFeatureChange_ = function (evt) {
        if (!this.changingFeature_) {
            var feature = /** @type {Feature} */ (evt.target);
            this.removeFeature_(feature);
            this.addFeature_(feature);
        }
    };
    /**
     * @param {import("../Collection.js").CollectionEvent} evt Event.
     * @private
     */
    Modify.prototype.handleFeatureRemove_ = function (evt) {
        var feature = /** @type {Feature} */ (evt.element);
        this.removeFeature_(feature);
    };
    /**
     * @param {Feature} feature Feature
     * @param {Point} geometry Geometry.
     * @private
     */
    Modify.prototype.writePointGeometry_ = function (feature, geometry) {
        var coordinates = geometry.getCoordinates();
        /** @type {SegmentData} */
        var segmentData = {
            feature: feature,
            geometry: geometry,
            segment: [coordinates, coordinates],
        };
        this.rBush_.insert(geometry.getExtent(), segmentData);
    };
    /**
     * @param {Feature} feature Feature
     * @param {import("../geom/MultiPoint.js").default} geometry Geometry.
     * @private
     */
    Modify.prototype.writeMultiPointGeometry_ = function (feature, geometry) {
        var points = geometry.getCoordinates();
        for (var i = 0, ii = points.length; i < ii; ++i) {
            var coordinates = points[i];
            /** @type {SegmentData} */
            var segmentData = {
                feature: feature,
                geometry: geometry,
                depth: [i],
                index: i,
                segment: [coordinates, coordinates],
            };
            this.rBush_.insert(geometry.getExtent(), segmentData);
        }
    };
    /**
     * @param {Feature} feature Feature
     * @param {import("../geom/LineString.js").default} geometry Geometry.
     * @private
     */
    Modify.prototype.writeLineStringGeometry_ = function (feature, geometry) {
        var coordinates = geometry.getCoordinates();
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var segment = coordinates.slice(i, i + 2);
            /** @type {SegmentData} */
            var segmentData = {
                feature: feature,
                geometry: geometry,
                index: i,
                segment: segment,
            };
            this.rBush_.insert(boundingExtent(segment), segmentData);
        }
    };
    /**
     * @param {Feature} feature Feature
     * @param {import("../geom/MultiLineString.js").default} geometry Geometry.
     * @private
     */
    Modify.prototype.writeMultiLineStringGeometry_ = function (feature, geometry) {
        var lines = geometry.getCoordinates();
        for (var j = 0, jj = lines.length; j < jj; ++j) {
            var coordinates = lines[j];
            for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                var segment = coordinates.slice(i, i + 2);
                /** @type {SegmentData} */
                var segmentData = {
                    feature: feature,
                    geometry: geometry,
                    depth: [j],
                    index: i,
                    segment: segment,
                };
                this.rBush_.insert(boundingExtent(segment), segmentData);
            }
        }
    };
    /**
     * @param {Feature} feature Feature
     * @param {import("../geom/Polygon.js").default} geometry Geometry.
     * @private
     */
    Modify.prototype.writePolygonGeometry_ = function (feature, geometry) {
        var rings = geometry.getCoordinates();
        for (var j = 0, jj = rings.length; j < jj; ++j) {
            var coordinates = rings[j];
            for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                var segment = coordinates.slice(i, i + 2);
                /** @type {SegmentData} */
                var segmentData = {
                    feature: feature,
                    geometry: geometry,
                    depth: [j],
                    index: i,
                    segment: segment,
                };
                this.rBush_.insert(boundingExtent(segment), segmentData);
            }
        }
    };
    /**
     * @param {Feature} feature Feature
     * @param {import("../geom/MultiPolygon.js").default} geometry Geometry.
     * @private
     */
    Modify.prototype.writeMultiPolygonGeometry_ = function (feature, geometry) {
        var polygons = geometry.getCoordinates();
        for (var k = 0, kk = polygons.length; k < kk; ++k) {
            var rings = polygons[k];
            for (var j = 0, jj = rings.length; j < jj; ++j) {
                var coordinates = rings[j];
                for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                    var segment = coordinates.slice(i, i + 2);
                    /** @type {SegmentData} */
                    var segmentData = {
                        feature: feature,
                        geometry: geometry,
                        depth: [j, k],
                        index: i,
                        segment: segment,
                    };
                    this.rBush_.insert(boundingExtent(segment), segmentData);
                }
            }
        }
    };
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
    Modify.prototype.writeCircleGeometry_ = function (feature, geometry) {
        var coordinates = geometry.getCenter();
        /** @type {SegmentData} */
        var centerSegmentData = {
            feature: feature,
            geometry: geometry,
            index: CIRCLE_CENTER_INDEX,
            segment: [coordinates, coordinates],
        };
        /** @type {SegmentData} */
        var circumferenceSegmentData = {
            feature: feature,
            geometry: geometry,
            index: CIRCLE_CIRCUMFERENCE_INDEX,
            segment: [coordinates, coordinates],
        };
        var featureSegments = [centerSegmentData, circumferenceSegmentData];
        centerSegmentData.featureSegments = featureSegments;
        circumferenceSegmentData.featureSegments = featureSegments;
        this.rBush_.insert(createExtent(coordinates), centerSegmentData);
        var circleGeometry = /** @type {import("../geom/Geometry.js").default} */ (geometry);
        var userProjection = getUserProjection();
        if (userProjection && this.getMap()) {
            var projection = this.getMap().getView().getProjection();
            circleGeometry = circleGeometry
                .clone()
                .transform(userProjection, projection);
            circleGeometry = fromCircle(
            /** @type {import("../geom/Circle.js").default} */ (circleGeometry)).transform(projection, userProjection);
        }
        this.rBush_.insert(circleGeometry.getExtent(), circumferenceSegmentData);
    };
    /**
     * @param {Feature} feature Feature
     * @param {import("../geom/GeometryCollection.js").default} geometry Geometry.
     * @private
     */
    Modify.prototype.writeGeometryCollectionGeometry_ = function (feature, geometry) {
        var geometries = geometry.getGeometriesArray();
        for (var i = 0; i < geometries.length; ++i) {
            var geometry_1 = geometries[i];
            var writer = this.SEGMENT_WRITERS_[geometry_1.getType()];
            writer(feature, geometry_1);
        }
    };
    /**
     * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
     * @param {Array<import("../Feature").FeatureLike>} features The features being modified.
     * @param {Array<import("../geom/SimpleGeometry.js").default>} geometries The geometries being modified.
     * @return {Feature} Vertex feature.
     * @private
     */
    Modify.prototype.createOrUpdateVertexFeature_ = function (coordinates, features, geometries) {
        var vertexFeature = this.vertexFeature_;
        if (!vertexFeature) {
            vertexFeature = new Feature(new Point(coordinates));
            this.vertexFeature_ = vertexFeature;
            this.overlay_.getSource().addFeature(vertexFeature);
        }
        else {
            var geometry = vertexFeature.getGeometry();
            geometry.setCoordinates(coordinates);
        }
        vertexFeature.set('features', features);
        vertexFeature.set('geometries', geometries);
        return vertexFeature;
    };
    /**
     * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} and may modify the geometry.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
     * @return {boolean} `false` to stop event propagation.
     */
    Modify.prototype.handleEvent = function (mapBrowserEvent) {
        if (!mapBrowserEvent.originalEvent) {
            return true;
        }
        this.lastPointerEvent_ = mapBrowserEvent;
        var handled;
        if (!mapBrowserEvent.map.getView().getInteracting() &&
            mapBrowserEvent.type == MapBrowserEventType.POINTERMOVE &&
            !this.handlingDownUpSequence) {
            this.handlePointerMove_(mapBrowserEvent);
        }
        if (this.vertexFeature_ && this.deleteCondition_(mapBrowserEvent)) {
            if (mapBrowserEvent.type != MapBrowserEventType.SINGLECLICK ||
                !this.ignoreNextSingleClick_) {
                handled = this.removePoint();
            }
            else {
                handled = true;
            }
        }
        if (mapBrowserEvent.type == MapBrowserEventType.SINGLECLICK) {
            this.ignoreNextSingleClick_ = false;
        }
        return _super.prototype.handleEvent.call(this, mapBrowserEvent) && !handled;
    };
    /**
     * Handle pointer drag events.
     * @param {import("../MapBrowserEvent.js").default} evt Event.
     */
    Modify.prototype.handleDragEvent = function (evt) {
        this.ignoreNextSingleClick_ = false;
        this.willModifyFeatures_(evt, this.dragSegments_);
        var vertex = [
            evt.coordinate[0] + this.delta_[0],
            evt.coordinate[1] + this.delta_[1],
        ];
        var features = [];
        var geometries = [];
        for (var i = 0, ii = this.dragSegments_.length; i < ii; ++i) {
            var dragSegment = this.dragSegments_[i];
            var segmentData = dragSegment[0];
            var feature = segmentData.feature;
            if (features.indexOf(feature) === -1) {
                features.push(feature);
            }
            var geometry = segmentData.geometry;
            if (geometries.indexOf(geometry) === -1) {
                geometries.push(geometry);
            }
            var depth = segmentData.depth;
            var coordinates = void 0;
            var segment = segmentData.segment;
            var index = dragSegment[1];
            while (vertex.length < geometry.getStride()) {
                vertex.push(segment[index][vertex.length]);
            }
            switch (geometry.getType()) {
                case 'Point':
                    coordinates = vertex;
                    segment[0] = vertex;
                    segment[1] = vertex;
                    break;
                case 'MultiPoint':
                    coordinates = geometry.getCoordinates();
                    coordinates[segmentData.index] = vertex;
                    segment[0] = vertex;
                    segment[1] = vertex;
                    break;
                case 'LineString':
                    coordinates = geometry.getCoordinates();
                    coordinates[segmentData.index + index] = vertex;
                    segment[index] = vertex;
                    break;
                case 'MultiLineString':
                    coordinates = geometry.getCoordinates();
                    coordinates[depth[0]][segmentData.index + index] = vertex;
                    segment[index] = vertex;
                    break;
                case 'Polygon':
                    coordinates = geometry.getCoordinates();
                    coordinates[depth[0]][segmentData.index + index] = vertex;
                    segment[index] = vertex;
                    break;
                case 'MultiPolygon':
                    coordinates = geometry.getCoordinates();
                    coordinates[depth[1]][depth[0]][segmentData.index + index] = vertex;
                    segment[index] = vertex;
                    break;
                case 'Circle':
                    segment[0] = vertex;
                    segment[1] = vertex;
                    if (segmentData.index === CIRCLE_CENTER_INDEX) {
                        this.changingFeature_ = true;
                        geometry.setCenter(vertex);
                        this.changingFeature_ = false;
                    }
                    else {
                        // We're dragging the circle's circumference:
                        this.changingFeature_ = true;
                        var projection = evt.map.getView().getProjection();
                        var radius = coordinateDistance(fromUserCoordinate(geometry.getCenter(), projection), fromUserCoordinate(vertex, projection));
                        var userProjection = getUserProjection();
                        if (userProjection) {
                            var circleGeometry = geometry
                                .clone()
                                .transform(userProjection, projection);
                            circleGeometry.setRadius(radius);
                            radius = circleGeometry
                                .transform(projection, userProjection)
                                .getRadius();
                        }
                        geometry.setRadius(radius);
                        this.changingFeature_ = false;
                    }
                    break;
                default:
                // pass
            }
            if (coordinates) {
                this.setGeometryCoordinates_(geometry, coordinates);
            }
        }
        this.createOrUpdateVertexFeature_(vertex, features, geometries);
    };
    /**
     * Handle pointer down events.
     * @param {import("../MapBrowserEvent.js").default} evt Event.
     * @return {boolean} If the event was consumed.
     */
    Modify.prototype.handleDownEvent = function (evt) {
        if (!this.condition_(evt)) {
            return false;
        }
        var pixelCoordinate = evt.coordinate;
        this.handlePointerAtPixel_(evt.pixel, evt.map, pixelCoordinate);
        this.dragSegments_.length = 0;
        this.featuresBeingModified_ = null;
        var vertexFeature = this.vertexFeature_;
        if (vertexFeature) {
            var projection = evt.map.getView().getProjection();
            var insertVertices = [];
            var vertex = vertexFeature.getGeometry().getCoordinates();
            var vertexExtent = boundingExtent([vertex]);
            var segmentDataMatches = this.rBush_.getInExtent(vertexExtent);
            var componentSegments = {};
            segmentDataMatches.sort(compareIndexes);
            for (var i = 0, ii = segmentDataMatches.length; i < ii; ++i) {
                var segmentDataMatch = segmentDataMatches[i];
                var segment = segmentDataMatch.segment;
                var uid = getUid(segmentDataMatch.geometry);
                var depth = segmentDataMatch.depth;
                if (depth) {
                    uid += '-' + depth.join('-'); // separate feature components
                }
                if (!componentSegments[uid]) {
                    componentSegments[uid] = new Array(2);
                }
                if (segmentDataMatch.geometry.getType() === 'Circle' &&
                    segmentDataMatch.index === CIRCLE_CIRCUMFERENCE_INDEX) {
                    var closestVertex = closestOnSegmentData(pixelCoordinate, segmentDataMatch, projection);
                    if (coordinatesEqual(closestVertex, vertex) &&
                        !componentSegments[uid][0]) {
                        this.dragSegments_.push([segmentDataMatch, 0]);
                        componentSegments[uid][0] = segmentDataMatch;
                    }
                    continue;
                }
                if (coordinatesEqual(segment[0], vertex) &&
                    !componentSegments[uid][0]) {
                    this.dragSegments_.push([segmentDataMatch, 0]);
                    componentSegments[uid][0] = segmentDataMatch;
                    continue;
                }
                if (coordinatesEqual(segment[1], vertex) &&
                    !componentSegments[uid][1]) {
                    if (componentSegments[uid][0] &&
                        componentSegments[uid][0].index === 0) {
                        var coordinates = segmentDataMatch.geometry.getCoordinates();
                        switch (segmentDataMatch.geometry.getType()) {
                            // prevent dragging closed linestrings by the connecting node
                            case 'LineString':
                            case 'MultiLineString':
                                continue;
                            // if dragging the first vertex of a polygon, ensure the other segment
                            // belongs to the closing vertex of the linear ring
                            case 'MultiPolygon':
                                coordinates = coordinates[depth[1]];
                            /* falls through */
                            case 'Polygon':
                                if (segmentDataMatch.index !==
                                    coordinates[depth[0]].length - 2) {
                                    continue;
                                }
                                break;
                            default:
                            // pass
                        }
                    }
                    this.dragSegments_.push([segmentDataMatch, 1]);
                    componentSegments[uid][1] = segmentDataMatch;
                    continue;
                }
                if (getUid(segment) in this.vertexSegments_ &&
                    !componentSegments[uid][0] &&
                    !componentSegments[uid][1] &&
                    this.insertVertexCondition_(evt)) {
                    insertVertices.push(segmentDataMatch);
                }
            }
            if (insertVertices.length) {
                this.willModifyFeatures_(evt, [insertVertices]);
            }
            for (var j = insertVertices.length - 1; j >= 0; --j) {
                this.insertVertex_(insertVertices[j], vertex);
            }
        }
        return !!this.vertexFeature_;
    };
    /**
     * Handle pointer up events.
     * @param {import("../MapBrowserEvent.js").default} evt Event.
     * @return {boolean} If the event was consumed.
     */
    Modify.prototype.handleUpEvent = function (evt) {
        for (var i = this.dragSegments_.length - 1; i >= 0; --i) {
            var segmentData = this.dragSegments_[i][0];
            var geometry = segmentData.geometry;
            if (geometry.getType() === 'Circle') {
                // Update a circle object in the R* bush:
                var coordinates = geometry.getCenter();
                var centerSegmentData = segmentData.featureSegments[0];
                var circumferenceSegmentData = segmentData.featureSegments[1];
                centerSegmentData.segment[0] = coordinates;
                centerSegmentData.segment[1] = coordinates;
                circumferenceSegmentData.segment[0] = coordinates;
                circumferenceSegmentData.segment[1] = coordinates;
                this.rBush_.update(createExtent(coordinates), centerSegmentData);
                var circleGeometry = geometry;
                var userProjection = getUserProjection();
                if (userProjection) {
                    var projection = evt.map.getView().getProjection();
                    circleGeometry = circleGeometry
                        .clone()
                        .transform(userProjection, projection);
                    circleGeometry = fromCircle(circleGeometry).transform(projection, userProjection);
                }
                this.rBush_.update(circleGeometry.getExtent(), circumferenceSegmentData);
            }
            else {
                this.rBush_.update(boundingExtent(segmentData.segment), segmentData);
            }
        }
        if (this.featuresBeingModified_) {
            this.dispatchEvent(new ModifyEvent(ModifyEventType.MODIFYEND, this.featuresBeingModified_, evt));
            this.featuresBeingModified_ = null;
        }
        return false;
    };
    /**
     * @param {import("../MapBrowserEvent.js").default} evt Event.
     * @private
     */
    Modify.prototype.handlePointerMove_ = function (evt) {
        this.lastPixel_ = evt.pixel;
        this.handlePointerAtPixel_(evt.pixel, evt.map, evt.coordinate);
    };
    /**
     * @param {import("../pixel.js").Pixel} pixel Pixel
     * @param {import("../PluggableMap.js").default} map Map.
     * @param {import("../coordinate.js").Coordinate} [opt_coordinate] The pixel Coordinate.
     * @private
     */
    Modify.prototype.handlePointerAtPixel_ = function (pixel, map, opt_coordinate) {
        var _this = this;
        var pixelCoordinate = opt_coordinate || map.getCoordinateFromPixel(pixel);
        var projection = map.getView().getProjection();
        var sortByDistance = function (a, b) {
            return (projectedDistanceToSegmentDataSquared(pixelCoordinate, a, projection) -
                projectedDistanceToSegmentDataSquared(pixelCoordinate, b, projection));
        };
        /** @type {Array<SegmentData>|undefined} */
        var nodes;
        var hitPointGeometry;
        if (this.hitDetection_) {
            var layerFilter = typeof this.hitDetection_ === 'object'
                ? function (layer) { return layer === _this.hitDetection_; }
                : undefined;
            map.forEachFeatureAtPixel(pixel, function (feature, layer, geometry) {
                geometry =
                    geometry ||
                        /** @type {import("../geom/SimpleGeometry").default} */ (feature.getGeometry());
                if (geometry.getType() === 'Point' &&
                    includes(_this.features_.getArray(), feature)) {
                    hitPointGeometry = geometry;
                    var coordinate = geometry.getFlatCoordinates().slice(0, 2);
                    nodes = [
                        {
                            feature: feature,
                            geometry: geometry,
                            segment: [coordinate, coordinate],
                        },
                    ];
                }
                return true;
            }, { layerFilter: layerFilter });
        }
        if (!nodes) {
            var viewExtent = fromUserExtent(createExtent(pixelCoordinate, tempExtent), projection);
            var buffer = map.getView().getResolution() * this.pixelTolerance_;
            var box = toUserExtent(bufferExtent(viewExtent, buffer, tempExtent), projection);
            nodes = this.rBush_.getInExtent(box);
        }
        if (nodes && nodes.length > 0) {
            var node = nodes.sort(sortByDistance)[0];
            var closestSegment = node.segment;
            var vertex = closestOnSegmentData(pixelCoordinate, node, projection);
            var vertexPixel = map.getPixelFromCoordinate(vertex);
            var dist = coordinateDistance(pixel, vertexPixel);
            if (hitPointGeometry || dist <= this.pixelTolerance_) {
                /** @type {Object<string, boolean>} */
                var vertexSegments = {};
                vertexSegments[getUid(closestSegment)] = true;
                if (!this.snapToPointer_) {
                    this.delta_[0] = vertex[0] - pixelCoordinate[0];
                    this.delta_[1] = vertex[1] - pixelCoordinate[1];
                }
                if (node.geometry.getType() === 'Circle' &&
                    node.index === CIRCLE_CIRCUMFERENCE_INDEX) {
                    this.snappedToVertex_ = true;
                    this.createOrUpdateVertexFeature_(vertex, [node.feature], [node.geometry]);
                }
                else {
                    var pixel1 = map.getPixelFromCoordinate(closestSegment[0]);
                    var pixel2 = map.getPixelFromCoordinate(closestSegment[1]);
                    var squaredDist1 = squaredCoordinateDistance(vertexPixel, pixel1);
                    var squaredDist2 = squaredCoordinateDistance(vertexPixel, pixel2);
                    dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
                    this.snappedToVertex_ = dist <= this.pixelTolerance_;
                    if (this.snappedToVertex_) {
                        vertex =
                            squaredDist1 > squaredDist2
                                ? closestSegment[1]
                                : closestSegment[0];
                    }
                    this.createOrUpdateVertexFeature_(vertex, [node.feature], [node.geometry]);
                    var geometries = {};
                    geometries[getUid(node.geometry)] = true;
                    for (var i = 1, ii = nodes.length; i < ii; ++i) {
                        var segment = nodes[i].segment;
                        if ((coordinatesEqual(closestSegment[0], segment[0]) &&
                            coordinatesEqual(closestSegment[1], segment[1])) ||
                            (coordinatesEqual(closestSegment[0], segment[1]) &&
                                coordinatesEqual(closestSegment[1], segment[0]))) {
                            var geometryUid = getUid(nodes[i].geometry);
                            if (!(geometryUid in geometries)) {
                                geometries[geometryUid] = true;
                                vertexSegments[getUid(segment)] = true;
                            }
                        }
                        else {
                            break;
                        }
                    }
                }
                this.vertexSegments_ = vertexSegments;
                return;
            }
        }
        if (this.vertexFeature_) {
            this.overlay_.getSource().removeFeature(this.vertexFeature_);
            this.vertexFeature_ = null;
        }
    };
    /**
     * @param {SegmentData} segmentData Segment data.
     * @param {import("../coordinate.js").Coordinate} vertex Vertex.
     * @private
     */
    Modify.prototype.insertVertex_ = function (segmentData, vertex) {
        var segment = segmentData.segment;
        var feature = segmentData.feature;
        var geometry = segmentData.geometry;
        var depth = segmentData.depth;
        var index = segmentData.index;
        var coordinates;
        while (vertex.length < geometry.getStride()) {
            vertex.push(0);
        }
        switch (geometry.getType()) {
            case 'MultiLineString':
                coordinates = geometry.getCoordinates();
                coordinates[depth[0]].splice(index + 1, 0, vertex);
                break;
            case 'Polygon':
                coordinates = geometry.getCoordinates();
                coordinates[depth[0]].splice(index + 1, 0, vertex);
                break;
            case 'MultiPolygon':
                coordinates = geometry.getCoordinates();
                coordinates[depth[1]][depth[0]].splice(index + 1, 0, vertex);
                break;
            case 'LineString':
                coordinates = geometry.getCoordinates();
                coordinates.splice(index + 1, 0, vertex);
                break;
            default:
                return;
        }
        this.setGeometryCoordinates_(geometry, coordinates);
        var rTree = this.rBush_;
        rTree.remove(segmentData);
        this.updateSegmentIndices_(geometry, index, depth, 1);
        /** @type {SegmentData} */
        var newSegmentData = {
            segment: [segment[0], vertex],
            feature: feature,
            geometry: geometry,
            depth: depth,
            index: index,
        };
        rTree.insert(boundingExtent(newSegmentData.segment), newSegmentData);
        this.dragSegments_.push([newSegmentData, 1]);
        /** @type {SegmentData} */
        var newSegmentData2 = {
            segment: [vertex, segment[1]],
            feature: feature,
            geometry: geometry,
            depth: depth,
            index: index + 1,
        };
        rTree.insert(boundingExtent(newSegmentData2.segment), newSegmentData2);
        this.dragSegments_.push([newSegmentData2, 0]);
        this.ignoreNextSingleClick_ = true;
    };
    /**
     * Removes the vertex currently being pointed.
     * @return {boolean} True when a vertex was removed.
     * @api
     */
    Modify.prototype.removePoint = function () {
        if (this.lastPointerEvent_ &&
            this.lastPointerEvent_.type != MapBrowserEventType.POINTERDRAG) {
            var evt = this.lastPointerEvent_;
            this.willModifyFeatures_(evt, this.dragSegments_);
            var removed = this.removeVertex_();
            if (this.featuresBeingModified_) {
                this.dispatchEvent(new ModifyEvent(ModifyEventType.MODIFYEND, this.featuresBeingModified_, evt));
            }
            this.featuresBeingModified_ = null;
            return removed;
        }
        return false;
    };
    /**
     * Removes a vertex from all matching features.
     * @return {boolean} True when a vertex was removed.
     * @private
     */
    Modify.prototype.removeVertex_ = function () {
        var dragSegments = this.dragSegments_;
        var segmentsByFeature = {};
        var deleted = false;
        var component, coordinates, dragSegment, geometry, i, index, left;
        var newIndex, right, segmentData, uid;
        for (i = dragSegments.length - 1; i >= 0; --i) {
            dragSegment = dragSegments[i];
            segmentData = dragSegment[0];
            uid = getUid(segmentData.feature);
            if (segmentData.depth) {
                // separate feature components
                uid += '-' + segmentData.depth.join('-');
            }
            if (!(uid in segmentsByFeature)) {
                segmentsByFeature[uid] = {};
            }
            if (dragSegment[1] === 0) {
                segmentsByFeature[uid].right = segmentData;
                segmentsByFeature[uid].index = segmentData.index;
            }
            else if (dragSegment[1] == 1) {
                segmentsByFeature[uid].left = segmentData;
                segmentsByFeature[uid].index = segmentData.index + 1;
            }
        }
        for (uid in segmentsByFeature) {
            right = segmentsByFeature[uid].right;
            left = segmentsByFeature[uid].left;
            index = segmentsByFeature[uid].index;
            newIndex = index - 1;
            if (left !== undefined) {
                segmentData = left;
            }
            else {
                segmentData = right;
            }
            if (newIndex < 0) {
                newIndex = 0;
            }
            geometry = segmentData.geometry;
            coordinates = geometry.getCoordinates();
            component = coordinates;
            deleted = false;
            switch (geometry.getType()) {
                case 'MultiLineString':
                    if (coordinates[segmentData.depth[0]].length > 2) {
                        coordinates[segmentData.depth[0]].splice(index, 1);
                        deleted = true;
                    }
                    break;
                case 'LineString':
                    if (coordinates.length > 2) {
                        coordinates.splice(index, 1);
                        deleted = true;
                    }
                    break;
                case 'MultiPolygon':
                    component = component[segmentData.depth[1]];
                /* falls through */
                case 'Polygon':
                    component = component[segmentData.depth[0]];
                    if (component.length > 4) {
                        if (index == component.length - 1) {
                            index = 0;
                        }
                        component.splice(index, 1);
                        deleted = true;
                        if (index === 0) {
                            // close the ring again
                            component.pop();
                            component.push(component[0]);
                            newIndex = component.length - 1;
                        }
                    }
                    break;
                default:
                // pass
            }
            if (deleted) {
                this.setGeometryCoordinates_(geometry, coordinates);
                var segments = [];
                if (left !== undefined) {
                    this.rBush_.remove(left);
                    segments.push(left.segment[0]);
                }
                if (right !== undefined) {
                    this.rBush_.remove(right);
                    segments.push(right.segment[1]);
                }
                if (left !== undefined && right !== undefined) {
                    /** @type {SegmentData} */
                    var newSegmentData = {
                        depth: segmentData.depth,
                        feature: segmentData.feature,
                        geometry: segmentData.geometry,
                        index: newIndex,
                        segment: segments,
                    };
                    this.rBush_.insert(boundingExtent(newSegmentData.segment), newSegmentData);
                }
                this.updateSegmentIndices_(geometry, index, segmentData.depth, -1);
                if (this.vertexFeature_) {
                    this.overlay_.getSource().removeFeature(this.vertexFeature_);
                    this.vertexFeature_ = null;
                }
                dragSegments.length = 0;
            }
        }
        return deleted;
    };
    /**
     * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
     * @param {Array} coordinates Coordinates.
     * @private
     */
    Modify.prototype.setGeometryCoordinates_ = function (geometry, coordinates) {
        this.changingFeature_ = true;
        geometry.setCoordinates(coordinates);
        this.changingFeature_ = false;
    };
    /**
     * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
     * @param {number} index Index.
     * @param {Array<number>|undefined} depth Depth.
     * @param {number} delta Delta (1 or -1).
     * @private
     */
    Modify.prototype.updateSegmentIndices_ = function (geometry, index, depth, delta) {
        this.rBush_.forEachInExtent(geometry.getExtent(), function (segmentDataMatch) {
            if (segmentDataMatch.geometry === geometry &&
                (depth === undefined ||
                    segmentDataMatch.depth === undefined ||
                    equals(segmentDataMatch.depth, depth)) &&
                segmentDataMatch.index > index) {
                segmentDataMatch.index += delta;
            }
        });
    };
    return Modify;
}(PointerInteraction));
/**
 * @param {SegmentData} a The first segment data.
 * @param {SegmentData} b The second segment data.
 * @return {number} The difference in indexes.
 */
function compareIndexes(a, b) {
    return a.index - b.index;
}
/**
 * Returns the distance from a point to a line segment.
 *
 * @param {import("../coordinate.js").Coordinate} pointCoordinates The coordinates of the point from
 *        which to calculate the distance.
 * @param {SegmentData} segmentData The object describing the line
 *        segment we are calculating the distance to.
 * @param {import("../proj/Projection.js").default} projection The view projection.
 * @return {number} The square of the distance between a point and a line segment.
 */
function projectedDistanceToSegmentDataSquared(pointCoordinates, segmentData, projection) {
    var geometry = segmentData.geometry;
    if (geometry.getType() === 'Circle') {
        var circleGeometry = /** @type {import("../geom/Circle.js").default} */ (geometry);
        if (segmentData.index === CIRCLE_CIRCUMFERENCE_INDEX) {
            var userProjection = getUserProjection();
            if (userProjection) {
                circleGeometry = /** @type {import("../geom/Circle.js").default} */ (circleGeometry.clone().transform(userProjection, projection));
            }
            var distanceToCenterSquared = squaredCoordinateDistance(circleGeometry.getCenter(), fromUserCoordinate(pointCoordinates, projection));
            var distanceToCircumference = Math.sqrt(distanceToCenterSquared) - circleGeometry.getRadius();
            return distanceToCircumference * distanceToCircumference;
        }
    }
    var coordinate = fromUserCoordinate(pointCoordinates, projection);
    tempSegment[0] = fromUserCoordinate(segmentData.segment[0], projection);
    tempSegment[1] = fromUserCoordinate(segmentData.segment[1], projection);
    return squaredDistanceToSegment(coordinate, tempSegment);
}
/**
 * Returns the point closest to a given line segment.
 *
 * @param {import("../coordinate.js").Coordinate} pointCoordinates The point to which a closest point
 *        should be found.
 * @param {SegmentData} segmentData The object describing the line
 *        segment which should contain the closest point.
 * @param {import("../proj/Projection.js").default} projection The view projection.
 * @return {import("../coordinate.js").Coordinate} The point closest to the specified line segment.
 */
function closestOnSegmentData(pointCoordinates, segmentData, projection) {
    var geometry = segmentData.geometry;
    if (geometry.getType() === 'Circle' &&
        segmentData.index === CIRCLE_CIRCUMFERENCE_INDEX) {
        var circleGeometry = /** @type {import("../geom/Circle.js").default} */ (geometry);
        var userProjection = getUserProjection();
        if (userProjection) {
            circleGeometry = /** @type {import("../geom/Circle.js").default} */ (circleGeometry.clone().transform(userProjection, projection));
        }
        return toUserCoordinate(circleGeometry.getClosestPoint(fromUserCoordinate(pointCoordinates, projection)), projection);
    }
    var coordinate = fromUserCoordinate(pointCoordinates, projection);
    tempSegment[0] = fromUserCoordinate(segmentData.segment[0], projection);
    tempSegment[1] = fromUserCoordinate(segmentData.segment[1], projection);
    return toUserCoordinate(closestOnSegment(coordinate, tempSegment), projection);
}
/**
 * @return {import("../style/Style.js").StyleFunction} Styles.
 */
function getDefaultStyleFunction() {
    var style = createEditingStyle();
    return function (feature, resolution) {
        return style['Point'];
    };
}
export default Modify;
//# sourceMappingURL=Modify.js.map