/**
 * @module ol/geom/GeometryCollection
 */
import {listen, unlisten} from '../events.js';
import EventType from '../events/EventType.js';
import {createOrUpdateEmpty, closestSquaredDistanceXY, extend, getCenter} from '../extent.js';
import Geometry from './Geometry.js';
import GeometryType from './GeometryType.js';
import {clear} from '../obj.js';

/**
 * @classdesc
 * An array of {@link module:ol/geom/Geometry} objects.
 *
 * @api
 */
var GeometryCollection = /*@__PURE__*/(function (Geometry) {
  function GeometryCollection(opt_geometries) {

    Geometry.call(this);

    /**
     * @private
     * @type {Array<Geometry>}
     */
    this.geometries_ = opt_geometries ? opt_geometries : null;

    this.listenGeometriesChange_();
  }

  if ( Geometry ) GeometryCollection.__proto__ = Geometry;
  GeometryCollection.prototype = Object.create( Geometry && Geometry.prototype );
  GeometryCollection.prototype.constructor = GeometryCollection;

  /**
   * @private
   */
  GeometryCollection.prototype.unlistenGeometriesChange_ = function unlistenGeometriesChange_ () {
    if (!this.geometries_) {
      return;
    }
    for (var i = 0, ii = this.geometries_.length; i < ii; ++i) {
      unlisten(
        this.geometries_[i], EventType.CHANGE,
        this.changed, this);
    }
  };

  /**
   * @private
   */
  GeometryCollection.prototype.listenGeometriesChange_ = function listenGeometriesChange_ () {
    if (!this.geometries_) {
      return;
    }
    for (var i = 0, ii = this.geometries_.length; i < ii; ++i) {
      listen(
        this.geometries_[i], EventType.CHANGE,
        this.changed, this);
    }
  };

  /**
   * Make a complete copy of the geometry.
   * @return {!GeometryCollection} Clone.
   * @override
   * @api
   */
  GeometryCollection.prototype.clone = function clone () {
    var geometryCollection = new GeometryCollection(null);
    geometryCollection.setGeometries(this.geometries_);
    return geometryCollection;
  };

  /**
   * @inheritDoc
   */
  GeometryCollection.prototype.closestPointXY = function closestPointXY (x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    var geometries = this.geometries_;
    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      minSquaredDistance = geometries[i].closestPointXY(
        x, y, closestPoint, minSquaredDistance);
    }
    return minSquaredDistance;
  };

  /**
   * @inheritDoc
   */
  GeometryCollection.prototype.containsXY = function containsXY (x, y) {
    var geometries = this.geometries_;
    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      if (geometries[i].containsXY(x, y)) {
        return true;
      }
    }
    return false;
  };

  /**
   * @inheritDoc
   */
  GeometryCollection.prototype.computeExtent = function computeExtent (extent) {
    createOrUpdateEmpty(extent);
    var geometries = this.geometries_;
    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      extend(extent, geometries[i].getExtent());
    }
    return extent;
  };

  /**
   * Return the geometries that make up this geometry collection.
   * @return {Array<Geometry>} Geometries.
   * @api
   */
  GeometryCollection.prototype.getGeometries = function getGeometries () {
    return cloneGeometries(this.geometries_);
  };

  /**
   * @return {Array<Geometry>} Geometries.
   */
  GeometryCollection.prototype.getGeometriesArray = function getGeometriesArray () {
    return this.geometries_;
  };

  /**
   * @inheritDoc
   */
  GeometryCollection.prototype.getSimplifiedGeometry = function getSimplifiedGeometry (squaredTolerance) {
    if (this.simplifiedGeometryRevision != this.getRevision()) {
      clear(this.simplifiedGeometryCache);
      this.simplifiedGeometryMaxMinSquaredTolerance = 0;
      this.simplifiedGeometryRevision = this.getRevision();
    }
    if (squaredTolerance < 0 ||
        (this.simplifiedGeometryMaxMinSquaredTolerance !== 0 &&
         squaredTolerance < this.simplifiedGeometryMaxMinSquaredTolerance)) {
      return this;
    }
    var key = squaredTolerance.toString();
    if (this.simplifiedGeometryCache.hasOwnProperty(key)) {
      return this.simplifiedGeometryCache[key];
    } else {
      var simplifiedGeometries = [];
      var geometries = this.geometries_;
      var simplified = false;
      for (var i = 0, ii = geometries.length; i < ii; ++i) {
        var geometry = geometries[i];
        var simplifiedGeometry = geometry.getSimplifiedGeometry(squaredTolerance);
        simplifiedGeometries.push(simplifiedGeometry);
        if (simplifiedGeometry !== geometry) {
          simplified = true;
        }
      }
      if (simplified) {
        var simplifiedGeometryCollection = new GeometryCollection(null);
        simplifiedGeometryCollection.setGeometriesArray(simplifiedGeometries);
        this.simplifiedGeometryCache[key] = simplifiedGeometryCollection;
        return simplifiedGeometryCollection;
      } else {
        this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
        return this;
      }
    }
  };

  /**
   * @inheritDoc
   * @api
   */
  GeometryCollection.prototype.getType = function getType () {
    return GeometryType.GEOMETRY_COLLECTION;
  };

  /**
   * @inheritDoc
   * @api
   */
  GeometryCollection.prototype.intersectsExtent = function intersectsExtent (extent) {
    var geometries = this.geometries_;
    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      if (geometries[i].intersectsExtent(extent)) {
        return true;
      }
    }
    return false;
  };

  /**
   * @return {boolean} Is empty.
   */
  GeometryCollection.prototype.isEmpty = function isEmpty () {
    return this.geometries_.length === 0;
  };

  /**
   * @inheritDoc
   * @api
   */
  GeometryCollection.prototype.rotate = function rotate (angle, anchor) {
    var geometries = this.geometries_;
    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].rotate(angle, anchor);
    }
    this.changed();
  };

  /**
   * @inheritDoc
   * @api
   */
  GeometryCollection.prototype.scale = function scale (sx, opt_sy, opt_anchor) {
    var anchor = opt_anchor;
    if (!anchor) {
      anchor = getCenter(this.getExtent());
    }
    var geometries = this.geometries_;
    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].scale(sx, opt_sy, anchor);
    }
    this.changed();
  };

  /**
   * Set the geometries that make up this geometry collection.
   * @param {Array<Geometry>} geometries Geometries.
   * @api
   */
  GeometryCollection.prototype.setGeometries = function setGeometries (geometries) {
    this.setGeometriesArray(cloneGeometries(geometries));
  };

  /**
   * @param {Array<Geometry>} geometries Geometries.
   */
  GeometryCollection.prototype.setGeometriesArray = function setGeometriesArray (geometries) {
    this.unlistenGeometriesChange_();
    this.geometries_ = geometries;
    this.listenGeometriesChange_();
    this.changed();
  };

  /**
   * @inheritDoc
   * @api
   */
  GeometryCollection.prototype.applyTransform = function applyTransform (transformFn) {
    var geometries = this.geometries_;
    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].applyTransform(transformFn);
    }
    this.changed();
  };

  /**
   * @inheritDoc
   * @api
   */
  GeometryCollection.prototype.translate = function translate (deltaX, deltaY) {
    var geometries = this.geometries_;
    for (var i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].translate(deltaX, deltaY);
    }
    this.changed();
  };

  /**
   * @inheritDoc
   */
  GeometryCollection.prototype.disposeInternal = function disposeInternal () {
    this.unlistenGeometriesChange_();
    Geometry.prototype.disposeInternal.call(this);
  };

  return GeometryCollection;
}(Geometry));


/**
 * @param {Array<Geometry>} geometries Geometries.
 * @return {Array<Geometry>} Cloned geometries.
 */
function cloneGeometries(geometries) {
  var clonedGeometries = [];
  for (var i = 0, ii = geometries.length; i < ii; ++i) {
    clonedGeometries.push(geometries[i].clone());
  }
  return clonedGeometries;
}


export default GeometryCollection;

//# sourceMappingURL=GeometryCollection.js.map