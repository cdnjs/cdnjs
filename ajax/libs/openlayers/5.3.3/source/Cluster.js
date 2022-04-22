/**
 * @module ol/source/Cluster
 */

import {getUid} from '../util.js';
import {assert} from '../asserts.js';
import Feature from '../Feature.js';
import GeometryType from '../geom/GeometryType.js';
import {scale as scaleCoordinate, add as addCoordinate} from '../coordinate.js';
import {listen} from '../events.js';
import EventType from '../events/EventType.js';
import {buffer, createEmpty, createOrUpdateFromCoordinate} from '../extent.js';
import Point from '../geom/Point.js';
import VectorSource from './Vector.js';

/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [distance=20] Minimum distance in pixels between clusters.
 * @property {function(Feature):Point} [geometryFunction]
 * Function that takes an {@link module:ol/Feature} as argument and returns an
 * {@link module:ol/geom/Point} as cluster calculation point for the feature. When a
 * feature should not be considered for clustering, the function should return
 * `null`. The default, which works when the underyling source contains point
 * features only, is
 * ```js
 * function(feature) {
 *   return feature.getGeometry();
 * }
 * ```
 * See {@link module:ol/geom/Polygon~Polygon#getInteriorPoint} for a way to get a cluster
 * calculation point for polygons.
 * @property {VectorSource} source Source.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 */


/**
 * @classdesc
 * Layer source to cluster vector data. Works out of the box with point
 * geometries. For other geometry types, or if not all geometries should be
 * considered for clustering, a custom `geometryFunction` can be defined.
 * @api
 */
var Cluster = /*@__PURE__*/(function (VectorSource) {
  function Cluster(options) {
    VectorSource.call(this, {
      attributions: options.attributions,
      wrapX: options.wrapX
    });

    /**
     * @type {number|undefined}
     * @protected
     */
    this.resolution = undefined;

    /**
     * @type {number}
     * @protected
     */
    this.distance = options.distance !== undefined ? options.distance : 20;

    /**
     * @type {Array<Feature>}
     * @protected
     */
    this.features = [];

    /**
     * @param {Feature} feature Feature.
     * @return {Point} Cluster calculation point.
     * @protected
     */
    this.geometryFunction = options.geometryFunction || function(feature) {
      var geometry = /** @type {Point} */ (feature.getGeometry());
      assert(geometry.getType() == GeometryType.POINT,
        10); // The default `geometryFunction` can only handle `Point` geometries
      return geometry;
    };

    /**
     * @type {VectorSource}
     * @protected
     */
    this.source = options.source;

    listen(this.source, EventType.CHANGE, this.refresh, this);
  }

  if ( VectorSource ) Cluster.__proto__ = VectorSource;
  Cluster.prototype = Object.create( VectorSource && VectorSource.prototype );
  Cluster.prototype.constructor = Cluster;

  /**
   * Get the distance in pixels between clusters.
   * @return {number} Distance.
   * @api
   */
  Cluster.prototype.getDistance = function getDistance () {
    return this.distance;
  };

  /**
   * Get a reference to the wrapped source.
   * @return {VectorSource} Source.
   * @api
   */
  Cluster.prototype.getSource = function getSource () {
    return this.source;
  };

  /**
   * @inheritDoc
   */
  Cluster.prototype.loadFeatures = function loadFeatures (extent, resolution, projection) {
    this.source.loadFeatures(extent, resolution, projection);
    if (resolution !== this.resolution) {
      this.clear();
      this.resolution = resolution;
      this.cluster();
      this.addFeatures(this.features);
    }
  };

  /**
   * Set the distance in pixels between clusters.
   * @param {number} distance The distance in pixels.
   * @api
   */
  Cluster.prototype.setDistance = function setDistance (distance) {
    this.distance = distance;
    this.refresh();
  };

  /**
   * handle the source changing
   * @override
   */
  Cluster.prototype.refresh = function refresh () {
    this.clear();
    this.cluster();
    this.addFeatures(this.features);
    VectorSource.prototype.refresh.call(this);
  };

  /**
   * @protected
   */
  Cluster.prototype.cluster = function cluster () {
    if (this.resolution === undefined) {
      return;
    }
    this.features.length = 0;
    var extent = createEmpty();
    var mapDistance = this.distance * this.resolution;
    var features = this.source.getFeatures();

    /**
     * @type {!Object<string, boolean>}
     */
    var clustered = {};

    for (var i = 0, ii = features.length; i < ii; i++) {
      var feature = features[i];
      if (!(getUid(feature) in clustered)) {
        var geometry = this.geometryFunction(feature);
        if (geometry) {
          var coordinates = geometry.getCoordinates();
          createOrUpdateFromCoordinate(coordinates, extent);
          buffer(extent, mapDistance, extent);

          var neighbors = this.source.getFeaturesInExtent(extent);
          neighbors = neighbors.filter(function(neighbor) {
            var uid = getUid(neighbor);
            if (!(uid in clustered)) {
              clustered[uid] = true;
              return true;
            } else {
              return false;
            }
          });
          this.features.push(this.createCluster(neighbors));
        }
      }
    }
  };

  /**
   * @param {Array<Feature>} features Features
   * @return {Feature} The cluster feature.
   * @protected
   */
  Cluster.prototype.createCluster = function createCluster (features) {
    var centroid = [0, 0];
    for (var i = features.length - 1; i >= 0; --i) {
      var geometry = this.geometryFunction(features[i]);
      if (geometry) {
        addCoordinate(centroid, geometry.getCoordinates());
      } else {
        features.splice(i, 1);
      }
    }
    scaleCoordinate(centroid, 1 / features.length);

    var cluster = new Feature(new Point(centroid));
    cluster.set('features', features);
    return cluster;
  };

  return Cluster;
}(VectorSource));


export default Cluster;

//# sourceMappingURL=Cluster.js.map