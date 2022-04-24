var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/interaction/Snap
 */
import { getUid } from '../util.js';
import CollectionEventType from '../CollectionEventType.js';
import { distance as coordinateDistance, squaredDistance as squaredCoordinateDistance, closestOnCircle, closestOnSegment, squaredDistanceToSegment } from '../coordinate.js';
import { listen, unlistenByKey } from '../events.js';
import EventType from '../events/EventType.js';
import { boundingExtent, createEmpty } from '../extent.js';
import { TRUE, FALSE } from '../functions.js';
import GeometryType from '../geom/GeometryType.js';
import { fromCircle } from '../geom/Polygon.js';
import PointerInteraction from './Pointer.js';
import { getValues } from '../obj.js';
import VectorEventType from '../source/VectorEventType.js';
import RBush from '../structs/RBush.js';
/**
 * @typedef {Object} Result
 * @property {boolean} snapped
 * @property {import("../coordinate.js").Coordinate|null} vertex
 * @property {import("../pixel.js").Pixel|null} vertexPixel
 */
/**
 * @typedef {Object} SegmentData
 * @property {import("../Feature.js").default} feature
 * @property {Array<import("../coordinate.js").Coordinate>} segment
 */
/**
 * @typedef {Object} Options
 * @property {import("../Collection.js").default<import("../Feature.js").default>} [features] Snap to these features. Either this option or source should be provided.
 * @property {boolean} [edge=true] Snap to edges.
 * @property {boolean} [vertex=true] Snap to vertices.
 * @property {number} [pixelTolerance=10] Pixel tolerance for considering the pointer close enough to a segment or
 * vertex for snapping.
 * @property {import("../source/Vector.js").default} [source] Snap to features from this source. Either this option or features should be provided
 */
/**
 * @param  {import("../source/Vector.js").VectorSourceEvent|import("../Collection.js").CollectionEvent} evt Event.
 * @return {import("../Feature.js").default} Feature.
 */
function getFeatureFromEvent(evt) {
    if ( /** @type {import("../source/Vector.js").VectorSourceEvent} */(evt).feature) {
        return /** @type {import("../source/Vector.js").VectorSourceEvent} */ (evt).feature;
    }
    else if ( /** @type {import("../Collection.js").CollectionEvent} */(evt).element) {
        return /** @type {import("../Feature.js").default} */ ( /** @type {import("../Collection.js").CollectionEvent} */(evt).element);
    }
}
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
 *     var snap = new Snap({
 *       source: source
 *     });
 *
 * @api
 */
var Snap = /** @class */ (function (_super) {
    __extends(Snap, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function Snap(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        var pointerOptions = /** @type {import("./Pointer.js").Options} */ (options);
        if (!pointerOptions.handleDownEvent) {
            pointerOptions.handleDownEvent = TRUE;
        }
        if (!pointerOptions.stopDown) {
            pointerOptions.stopDown = FALSE;
        }
        _this = _super.call(this, pointerOptions) || this;
        /**
         * @type {import("../source/Vector.js").default}
         * @private
         */
        _this.source_ = options.source ? options.source : null;
        /**
         * @private
         * @type {boolean}
         */
        _this.vertex_ = options.vertex !== undefined ? options.vertex : true;
        /**
         * @private
         * @type {boolean}
         */
        _this.edge_ = options.edge !== undefined ? options.edge : true;
        /**
         * @type {import("../Collection.js").default<import("../Feature.js").default>}
         * @private
         */
        _this.features_ = options.features ? options.features : null;
        /**
         * @type {Array<import("../events.js").EventsKey>}
         * @private
         */
        _this.featuresListenerKeys_ = [];
        /**
         * @type {Object<string, import("../events.js").EventsKey>}
         * @private
         */
        _this.featureChangeListenerKeys_ = {};
        /**
         * Extents are preserved so indexed segment can be quickly removed
         * when its feature geometry changes
         * @type {Object<string, import("../extent.js").Extent>}
         * @private
         */
        _this.indexedFeaturesExtents_ = {};
        /**
         * If a feature geometry changes while a pointer drag|move event occurs, the
         * feature doesn't get updated right away.  It will be at the next 'pointerup'
         * event fired.
         * @type {!Object<string, import("../Feature.js").default>}
         * @private
         */
        _this.pendingFeatures_ = {};
        /**
         * Used for distance sorting in sortByDistance_
         * @type {import("../coordinate.js").Coordinate}
         * @private
         */
        _this.pixelCoordinate_ = null;
        /**
         * @type {number}
         * @private
         */
        _this.pixelTolerance_ = options.pixelTolerance !== undefined ?
            options.pixelTolerance : 10;
        /**
         * @type {function(SegmentData, SegmentData): number}
         * @private
         */
        _this.sortByDistance_ = sortByDistance.bind(_this);
        /**
        * Segment RTree for each layer
        * @type {import("../structs/RBush.js").default<SegmentData>}
        * @private
        */
        _this.rBush_ = new RBush();
        /**
        * @const
        * @private
        * @type {Object<string, function(import("../Feature.js").default, import("../geom/Geometry.js").default): void>}
        */
        _this.SEGMENT_WRITERS_ = {
            'Point': _this.writePointGeometry_,
            'LineString': _this.writeLineStringGeometry_,
            'LinearRing': _this.writeLineStringGeometry_,
            'Polygon': _this.writePolygonGeometry_,
            'MultiPoint': _this.writeMultiPointGeometry_,
            'MultiLineString': _this.writeMultiLineStringGeometry_,
            'MultiPolygon': _this.writeMultiPolygonGeometry_,
            'GeometryCollection': _this.writeGeometryCollectionGeometry_,
            'Circle': _this.writeCircleGeometry_
        };
        return _this;
    }
    /**
     * Add a feature to the collection of features that we may snap to.
     * @param {import("../Feature.js").default} feature Feature.
     * @param {boolean=} opt_listen Whether to listen to the feature change or not
     *     Defaults to `true`.
     * @api
     */
    Snap.prototype.addFeature = function (feature, opt_listen) {
        var register = opt_listen !== undefined ? opt_listen : true;
        var feature_uid = getUid(feature);
        var geometry = feature.getGeometry();
        if (geometry) {
            var segmentWriter = this.SEGMENT_WRITERS_[geometry.getType()];
            if (segmentWriter) {
                this.indexedFeaturesExtents_[feature_uid] = geometry.getExtent(createEmpty());
                segmentWriter.call(this, feature, geometry);
            }
        }
        if (register) {
            this.featureChangeListenerKeys_[feature_uid] = listen(feature, EventType.CHANGE, this.handleFeatureChange_, this);
        }
    };
    /**
     * @param {import("../Feature.js").default} feature Feature.
     * @private
     */
    Snap.prototype.forEachFeatureAdd_ = function (feature) {
        this.addFeature(feature);
    };
    /**
     * @param {import("../Feature.js").default} feature Feature.
     * @private
     */
    Snap.prototype.forEachFeatureRemove_ = function (feature) {
        this.removeFeature(feature);
    };
    /**
     * @return {import("../Collection.js").default<import("../Feature.js").default>|Array<import("../Feature.js").default>} Features.
     * @private
     */
    Snap.prototype.getFeatures_ = function () {
        var features;
        if (this.features_) {
            features = this.features_;
        }
        else if (this.source_) {
            features = this.source_.getFeatures();
        }
        return features;
    };
    /**
     * @inheritDoc
     */
    Snap.prototype.handleEvent = function (evt) {
        var result = this.snapTo(evt.pixel, evt.coordinate, evt.map);
        if (result.snapped) {
            evt.coordinate = result.vertex.slice(0, 2);
            evt.pixel = result.vertexPixel;
        }
        return _super.prototype.handleEvent.call(this, evt);
    };
    /**
     * @param {import("../source/Vector.js").VectorSourceEvent|import("../Collection.js").CollectionEvent} evt Event.
     * @private
     */
    Snap.prototype.handleFeatureAdd_ = function (evt) {
        var feature = getFeatureFromEvent(evt);
        this.addFeature(feature);
    };
    /**
     * @param {import("../source/Vector.js").VectorSourceEvent|import("../Collection.js").CollectionEvent} evt Event.
     * @private
     */
    Snap.prototype.handleFeatureRemove_ = function (evt) {
        var feature = getFeatureFromEvent(evt);
        this.removeFeature(feature);
    };
    /**
     * @param {import("../events/Event.js").default} evt Event.
     * @private
     */
    Snap.prototype.handleFeatureChange_ = function (evt) {
        var feature = /** @type {import("../Feature.js").default} */ (evt.target);
        if (this.handlingDownUpSequence) {
            var uid = getUid(feature);
            if (!(uid in this.pendingFeatures_)) {
                this.pendingFeatures_[uid] = feature;
            }
        }
        else {
            this.updateFeature_(feature);
        }
    };
    /**
     * @inheritDoc
     */
    Snap.prototype.handleUpEvent = function (evt) {
        var featuresToUpdate = getValues(this.pendingFeatures_);
        if (featuresToUpdate.length) {
            featuresToUpdate.forEach(this.updateFeature_.bind(this));
            this.pendingFeatures_ = {};
        }
        return false;
    };
    /**
     * Remove a feature from the collection of features that we may snap to.
     * @param {import("../Feature.js").default} feature Feature
     * @param {boolean=} opt_unlisten Whether to unlisten to the feature change
     *     or not. Defaults to `true`.
     * @api
     */
    Snap.prototype.removeFeature = function (feature, opt_unlisten) {
        var unregister = opt_unlisten !== undefined ? opt_unlisten : true;
        var feature_uid = getUid(feature);
        var extent = this.indexedFeaturesExtents_[feature_uid];
        if (extent) {
            var rBush = this.rBush_;
            var nodesToRemove_1 = [];
            rBush.forEachInExtent(extent, function (node) {
                if (feature === node.feature) {
                    nodesToRemove_1.push(node);
                }
            });
            for (var i = nodesToRemove_1.length - 1; i >= 0; --i) {
                rBush.remove(nodesToRemove_1[i]);
            }
        }
        if (unregister) {
            unlistenByKey(this.featureChangeListenerKeys_[feature_uid]);
            delete this.featureChangeListenerKeys_[feature_uid];
        }
    };
    /**
     * @inheritDoc
     */
    Snap.prototype.setMap = function (map) {
        var currentMap = this.getMap();
        var keys = this.featuresListenerKeys_;
        var features = /** @type {Array<import("../Feature.js").default>} */ (this.getFeatures_());
        if (currentMap) {
            keys.forEach(unlistenByKey);
            keys.length = 0;
            features.forEach(this.forEachFeatureRemove_.bind(this));
        }
        _super.prototype.setMap.call(this, map);
        if (map) {
            if (this.features_) {
                keys.push(listen(this.features_, CollectionEventType.ADD, this.handleFeatureAdd_, this), listen(this.features_, CollectionEventType.REMOVE, this.handleFeatureRemove_, this));
            }
            else if (this.source_) {
                keys.push(listen(this.source_, VectorEventType.ADDFEATURE, this.handleFeatureAdd_, this), listen(this.source_, VectorEventType.REMOVEFEATURE, this.handleFeatureRemove_, this));
            }
            features.forEach(this.forEachFeatureAdd_.bind(this));
        }
    };
    /**
     * @param {import("../pixel.js").Pixel} pixel Pixel
     * @param {import("../coordinate.js").Coordinate} pixelCoordinate Coordinate
     * @param {import("../PluggableMap.js").default} map Map.
     * @return {Result} Snap result
     */
    Snap.prototype.snapTo = function (pixel, pixelCoordinate, map) {
        var lowerLeft = map.getCoordinateFromPixel([pixel[0] - this.pixelTolerance_, pixel[1] + this.pixelTolerance_]);
        var upperRight = map.getCoordinateFromPixel([pixel[0] + this.pixelTolerance_, pixel[1] - this.pixelTolerance_]);
        var box = boundingExtent([lowerLeft, upperRight]);
        var segments = this.rBush_.getInExtent(box);
        // If snapping on vertices only, don't consider circles
        if (this.vertex_ && !this.edge_) {
            segments = segments.filter(function (segment) {
                return segment.feature.getGeometry().getType() !==
                    GeometryType.CIRCLE;
            });
        }
        var snappedToVertex = false;
        var snapped = false;
        var vertex = null;
        var vertexPixel = null;
        var dist, pixel1, pixel2, squaredDist1, squaredDist2;
        if (segments.length > 0) {
            this.pixelCoordinate_ = pixelCoordinate;
            segments.sort(this.sortByDistance_);
            var closestSegment = segments[0].segment;
            var isCircle = segments[0].feature.getGeometry().getType() ===
                GeometryType.CIRCLE;
            if (this.vertex_ && !this.edge_) {
                pixel1 = map.getPixelFromCoordinate(closestSegment[0]);
                pixel2 = map.getPixelFromCoordinate(closestSegment[1]);
                squaredDist1 = squaredCoordinateDistance(pixel, pixel1);
                squaredDist2 = squaredCoordinateDistance(pixel, pixel2);
                dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
                snappedToVertex = dist <= this.pixelTolerance_;
                if (snappedToVertex) {
                    snapped = true;
                    vertex = squaredDist1 > squaredDist2 ? closestSegment[1] : closestSegment[0];
                    vertexPixel = map.getPixelFromCoordinate(vertex);
                }
            }
            else if (this.edge_) {
                if (isCircle) {
                    vertex = closestOnCircle(pixelCoordinate, 
                    /** @type {import("../geom/Circle.js").default} */ (segments[0].feature.getGeometry()));
                }
                else {
                    vertex = closestOnSegment(pixelCoordinate, closestSegment);
                }
                vertexPixel = map.getPixelFromCoordinate(vertex);
                if (coordinateDistance(pixel, vertexPixel) <= this.pixelTolerance_) {
                    snapped = true;
                    if (this.vertex_ && !isCircle) {
                        pixel1 = map.getPixelFromCoordinate(closestSegment[0]);
                        pixel2 = map.getPixelFromCoordinate(closestSegment[1]);
                        squaredDist1 = squaredCoordinateDistance(vertexPixel, pixel1);
                        squaredDist2 = squaredCoordinateDistance(vertexPixel, pixel2);
                        dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
                        snappedToVertex = dist <= this.pixelTolerance_;
                        if (snappedToVertex) {
                            vertex = squaredDist1 > squaredDist2 ? closestSegment[1] : closestSegment[0];
                            vertexPixel = map.getPixelFromCoordinate(vertex);
                        }
                    }
                }
            }
            if (snapped) {
                vertexPixel = [Math.round(vertexPixel[0]), Math.round(vertexPixel[1])];
            }
        }
        return {
            snapped: snapped,
            vertex: vertex,
            vertexPixel: vertexPixel
        };
    };
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @private
     */
    Snap.prototype.updateFeature_ = function (feature) {
        this.removeFeature(feature, false);
        this.addFeature(feature, false);
    };
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/Circle.js").default} geometry Geometry.
     * @private
     */
    Snap.prototype.writeCircleGeometry_ = function (feature, geometry) {
        var polygon = fromCircle(geometry);
        var coordinates = polygon.getCoordinates()[0];
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var segment = coordinates.slice(i, i + 2);
            var segmentData = {
                feature: feature,
                segment: segment
            };
            this.rBush_.insert(boundingExtent(segment), segmentData);
        }
    };
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/GeometryCollection.js").default} geometry Geometry.
     * @private
     */
    Snap.prototype.writeGeometryCollectionGeometry_ = function (feature, geometry) {
        var geometries = geometry.getGeometriesArray();
        for (var i = 0; i < geometries.length; ++i) {
            var segmentWriter = this.SEGMENT_WRITERS_[geometries[i].getType()];
            if (segmentWriter) {
                segmentWriter.call(this, feature, geometries[i]);
            }
        }
    };
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/LineString.js").default} geometry Geometry.
     * @private
     */
    Snap.prototype.writeLineStringGeometry_ = function (feature, geometry) {
        var coordinates = geometry.getCoordinates();
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var segment = coordinates.slice(i, i + 2);
            var segmentData = {
                feature: feature,
                segment: segment
            };
            this.rBush_.insert(boundingExtent(segment), segmentData);
        }
    };
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/MultiLineString.js").default} geometry Geometry.
     * @private
     */
    Snap.prototype.writeMultiLineStringGeometry_ = function (feature, geometry) {
        var lines = geometry.getCoordinates();
        for (var j = 0, jj = lines.length; j < jj; ++j) {
            var coordinates = lines[j];
            for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                var segment = coordinates.slice(i, i + 2);
                var segmentData = {
                    feature: feature,
                    segment: segment
                };
                this.rBush_.insert(boundingExtent(segment), segmentData);
            }
        }
    };
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/MultiPoint.js").default} geometry Geometry.
     * @private
     */
    Snap.prototype.writeMultiPointGeometry_ = function (feature, geometry) {
        var points = geometry.getCoordinates();
        for (var i = 0, ii = points.length; i < ii; ++i) {
            var coordinates = points[i];
            var segmentData = {
                feature: feature,
                segment: [coordinates, coordinates]
            };
            this.rBush_.insert(geometry.getExtent(), segmentData);
        }
    };
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/MultiPolygon.js").default} geometry Geometry.
     * @private
     */
    Snap.prototype.writeMultiPolygonGeometry_ = function (feature, geometry) {
        var polygons = geometry.getCoordinates();
        for (var k = 0, kk = polygons.length; k < kk; ++k) {
            var rings = polygons[k];
            for (var j = 0, jj = rings.length; j < jj; ++j) {
                var coordinates = rings[j];
                for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                    var segment = coordinates.slice(i, i + 2);
                    var segmentData = {
                        feature: feature,
                        segment: segment
                    };
                    this.rBush_.insert(boundingExtent(segment), segmentData);
                }
            }
        }
    };
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/Point.js").default} geometry Geometry.
     * @private
     */
    Snap.prototype.writePointGeometry_ = function (feature, geometry) {
        var coordinates = geometry.getCoordinates();
        var segmentData = {
            feature: feature,
            segment: [coordinates, coordinates]
        };
        this.rBush_.insert(geometry.getExtent(), segmentData);
    };
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @param {import("../geom/Polygon.js").default} geometry Geometry.
     * @private
     */
    Snap.prototype.writePolygonGeometry_ = function (feature, geometry) {
        var rings = geometry.getCoordinates();
        for (var j = 0, jj = rings.length; j < jj; ++j) {
            var coordinates = rings[j];
            for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                var segment = coordinates.slice(i, i + 2);
                var segmentData = {
                    feature: feature,
                    segment: segment
                };
                this.rBush_.insert(boundingExtent(segment), segmentData);
            }
        }
    };
    return Snap;
}(PointerInteraction));
/**
 * Sort segments by distance, helper function
 * @param {SegmentData} a The first segment data.
 * @param {SegmentData} b The second segment data.
 * @return {number} The difference in distance.
 * @this {Snap}
 */
function sortByDistance(a, b) {
    var deltaA = squaredDistanceToSegment(this.pixelCoordinate_, a.segment);
    var deltaB = squaredDistanceToSegment(this.pixelCoordinate_, b.segment);
    return deltaA - deltaB;
}
export default Snap;
//# sourceMappingURL=Snap.js.map