/**
 * @module ol/format/GeoJSON
 */
// TODO: serialize dataProjection as crs member when writing
// see https://github.com/openlayers/openlayers/issues/2078

import {assert} from '../asserts.js';
import Feature from '../Feature.js';
import {transformWithOptions} from '../format/Feature.js';
import JSONFeature from '../format/JSONFeature.js';
import GeometryCollection from '../geom/GeometryCollection.js';
import LineString from '../geom/LineString.js';
import MultiLineString from '../geom/MultiLineString.js';
import MultiPoint from '../geom/MultiPoint.js';
import MultiPolygon from '../geom/MultiPolygon.js';
import Point from '../geom/Point.js';
import Polygon from '../geom/Polygon.js';
import {assign, isEmpty} from '../obj.js';
import {get as getProjection} from '../proj.js';


/**
 * @typedef {Object} Options
 * @property {module:ol/proj~ProjectionLike} [dataProjection='EPSG:4326'] Default data projection.
 * @property {module:ol/proj~ProjectionLike} [featureProjection] Projection for features read or
 * written by the format.  Options passed to read or write methods will take precedence.
 * @property {string} [geometryName] Geometry name to use when creating features.
 * @property {boolean} [extractGeometryName=false] Certain GeoJSON providers include
 * the geometry_name field in the feature GeoJSON. If set to `true` the GeoJSON reader
 * will look for that field to set the geometry name. If both this field is set to `true`
 * and a `geometryName` is provided, the `geometryName` will take precedence.
 */


/**
 * @classdesc
 * Feature format for reading and writing data in the GeoJSON format.
 *
  * @api
 */
var GeoJSON = (function (JSONFeature) {
  function GeoJSON(opt_options) {

    var options = opt_options ? opt_options : {};

    JSONFeature.call(this);

    /**
     * @inheritDoc
     */
    this.dataProjection = getProjection(
      options.dataProjection ?
        options.dataProjection : 'EPSG:4326');

    if (options.featureProjection) {
      this.defaultFeatureProjection = getProjection(options.featureProjection);
    }

    /**
     * Name of the geometry attribute for features.
     * @type {string|undefined}
     * @private
     */
    this.geometryName_ = options.geometryName;

    /**
     * Look for the geometry name in the feature GeoJSON
     * @type {boolean|undefined}
     * @private
     */
    this.extractGeometryName_ = options.extractGeometryName;

  }

  if ( JSONFeature ) GeoJSON.__proto__ = JSONFeature;
  GeoJSON.prototype = Object.create( JSONFeature && JSONFeature.prototype );
  GeoJSON.prototype.constructor = GeoJSON;

  /**
   * @inheritDoc
   */
  GeoJSON.prototype.readFeatureFromObject = function readFeatureFromObject (object, opt_options) {
    /**
     * @type {GeoJSONFeature}
     */
    var geoJSONFeature = null;
    if (object.type === 'Feature') {
      geoJSONFeature = /** @type {GeoJSONFeature} */ (object);
    } else {
      geoJSONFeature = /** @type {GeoJSONFeature} */ ({
        type: 'Feature',
        geometry: /** @type {GeoJSONGeometry|GeoJSONGeometryCollection} */ (object)
      });
    }

    var geometry = readGeometry(geoJSONFeature.geometry, opt_options);
    var feature = new Feature();
    if (this.geometryName_) {
      feature.setGeometryName(this.geometryName_);
    } else if (this.extractGeometryName_ && geoJSONFeature.geometry_name !== undefined) {
      feature.setGeometryName(geoJSONFeature.geometry_name);
    }
    feature.setGeometry(geometry);
    if (geoJSONFeature.id !== undefined) {
      feature.setId(geoJSONFeature.id);
    }
    if (geoJSONFeature.properties) {
      feature.setProperties(geoJSONFeature.properties);
    }
    return feature;
  };

  /**
   * @inheritDoc
   */
  GeoJSON.prototype.readFeaturesFromObject = function readFeaturesFromObject (object, opt_options) {
    var this$1 = this;

    var geoJSONObject = /** @type {GeoJSONObject} */ (object);
    /** @type {Array<module:ol/Feature>} */
    var features = null;
    if (geoJSONObject.type === 'FeatureCollection') {
      var geoJSONFeatureCollection = /** @type {GeoJSONFeatureCollection} */ (object);
      features = [];
      var geoJSONFeatures = geoJSONFeatureCollection.features;
      for (var i = 0, ii = geoJSONFeatures.length; i < ii; ++i) {
        features.push(this$1.readFeatureFromObject(geoJSONFeatures[i], opt_options));
      }
    } else {
      features = [this.readFeatureFromObject(object, opt_options)];
    }
    return features;
  };

  /**
   * @inheritDoc
   */
  GeoJSON.prototype.readGeometryFromObject = function readGeometryFromObject (object, opt_options) {
    return readGeometry(/** @type {GeoJSONGeometry} */ (object), opt_options);
  };

  /**
   * @inheritDoc
   */
  GeoJSON.prototype.readProjectionFromObject = function readProjectionFromObject (object) {
    var geoJSONObject = /** @type {GeoJSONObject} */ (object);
    var crs = geoJSONObject.crs;
    var projection;
    if (crs) {
      if (crs.type == 'name') {
        projection = getProjection(crs.properties.name);
      } else {
        assert(false, 36); // Unknown SRS type
      }
    } else {
      projection = this.dataProjection;
    }
    return (
      /** @type {module:ol/proj/Projection} */ (projection)
    );
  };

  /**
   * Encode a feature as a GeoJSON Feature object.
   *
   * @param {module:ol/Feature} feature Feature.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @return {GeoJSONFeature} Object.
   * @override
   * @api
   */
  GeoJSON.prototype.writeFeatureObject = function writeFeatureObject (feature, opt_options) {
    opt_options = this.adaptOptions(opt_options);

    var object = /** @type {GeoJSONFeature} */ ({
      'type': 'Feature'
    });
    var id = feature.getId();
    if (id !== undefined) {
      object.id = id;
    }
    var geometry = feature.getGeometry();
    if (geometry) {
      object.geometry = writeGeometry(geometry, opt_options);
    } else {
      object.geometry = null;
    }
    var properties = feature.getProperties();
    delete properties[feature.getGeometryName()];
    if (!isEmpty(properties)) {
      object.properties = properties;
    } else {
      object.properties = null;
    }
    return object;
  };

  /**
   * Encode an array of features as a GeoJSON object.
   *
   * @param {Array<module:ol/Feature>} features Features.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @return {GeoJSONFeatureCollection} GeoJSON Object.
   * @override
   * @api
   */
  GeoJSON.prototype.writeFeaturesObject = function writeFeaturesObject (features, opt_options) {
    var this$1 = this;

    opt_options = this.adaptOptions(opt_options);
    var objects = [];
    for (var i = 0, ii = features.length; i < ii; ++i) {
      objects.push(this$1.writeFeatureObject(features[i], opt_options));
    }
    return /** @type {GeoJSONFeatureCollection} */ ({
      type: 'FeatureCollection',
      features: objects
    });
  };

  /**
   * Encode a geometry as a GeoJSON object.
   *
   * @param {module:ol/geom/Geometry} geometry Geometry.
   * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
   * @return {GeoJSONGeometry|GeoJSONGeometryCollection} Object.
   * @override
   * @api
   */
  GeoJSON.prototype.writeGeometryObject = function writeGeometryObject (geometry, opt_options) {
    return writeGeometry(geometry, this.adaptOptions(opt_options));
  };

  return GeoJSON;
}(JSONFeature));


/**
 * @const
 * @type {Object<string, function(GeoJSONObject): module:ol/geom/Geometry>}
 */
var GEOMETRY_READERS = {
  'Point': readPointGeometry,
  'LineString': readLineStringGeometry,
  'Polygon': readPolygonGeometry,
  'MultiPoint': readMultiPointGeometry,
  'MultiLineString': readMultiLineStringGeometry,
  'MultiPolygon': readMultiPolygonGeometry,
  'GeometryCollection': readGeometryCollectionGeometry
};


/**
 * @const
 * @type {Object<string, function(module:ol/geom/Geometry, module:ol/format/Feature~WriteOptions=): (GeoJSONGeometry|GeoJSONGeometryCollection)>}
 */
var GEOMETRY_WRITERS = {
  'Point': writePointGeometry,
  'LineString': writeLineStringGeometry,
  'Polygon': writePolygonGeometry,
  'MultiPoint': writeMultiPointGeometry,
  'MultiLineString': writeMultiLineStringGeometry,
  'MultiPolygon': writeMultiPolygonGeometry,
  'GeometryCollection': writeGeometryCollectionGeometry,
  'Circle': writeEmptyGeometryCollectionGeometry
};


/**
 * @param {GeoJSONGeometry|GeoJSONGeometryCollection} object Object.
 * @param {module:ol/format/Feature~ReadOptions=} opt_options Read options.
 * @return {module:ol/geom/Geometry} Geometry.
 */
function readGeometry(object, opt_options) {
  if (!object) {
    return null;
  }
  var geometryReader = GEOMETRY_READERS[object.type];
  return (
    /** @type {module:ol/geom/Geometry} */ (transformWithOptions(geometryReader(object), false, opt_options))
  );
}


/**
 * @param {GeoJSONGeometryCollection} object Object.
 * @param {module:ol/format/Feature~ReadOptions=} opt_options Read options.
 * @return {module:ol/geom/GeometryCollection} Geometry collection.
 */
function readGeometryCollectionGeometry(object, opt_options) {
  var geometries = object.geometries.map(
    /**
     * @param {GeoJSONGeometry} geometry Geometry.
     * @return {module:ol/geom/Geometry} geometry Geometry.
     */
    function(geometry) {
      return readGeometry(geometry, opt_options);
    });
  return new GeometryCollection(geometries);
}


/**
 * @param {GeoJSONGeometry} object Object.
 * @return {module:ol/geom/Point} Point.
 */
function readPointGeometry(object) {
  return new Point(object.coordinates);
}


/**
 * @param {GeoJSONGeometry} object Object.
 * @return {module:ol/geom/LineString} LineString.
 */
function readLineStringGeometry(object) {
  return new LineString(object.coordinates);
}


/**
 * @param {GeoJSONGeometry} object Object.
 * @return {module:ol/geom/MultiLineString} MultiLineString.
 */
function readMultiLineStringGeometry(object) {
  return new MultiLineString(object.coordinates);
}


/**
 * @param {GeoJSONGeometry} object Object.
 * @return {module:ol/geom/MultiPoint} MultiPoint.
 */
function readMultiPointGeometry(object) {
  return new MultiPoint(object.coordinates);
}


/**
 * @param {GeoJSONGeometry} object Object.
 * @return {module:ol/geom/MultiPolygon} MultiPolygon.
 */
function readMultiPolygonGeometry(object) {
  return new MultiPolygon(object.coordinates);
}


/**
 * @param {GeoJSONGeometry} object Object.
 * @return {module:ol/geom/Polygon} Polygon.
 */
function readPolygonGeometry(object) {
  return new Polygon(object.coordinates);
}


/**
 * @param {module:ol/geom/Geometry} geometry Geometry.
 * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
 * @return {GeoJSONGeometry|GeoJSONGeometryCollection} GeoJSON geometry.
 */
function writeGeometry(geometry, opt_options) {
  var geometryWriter = GEOMETRY_WRITERS[geometry.getType()];
  return geometryWriter(/** @type {module:ol/geom/Geometry} */ (
    transformWithOptions(geometry, true, opt_options)), opt_options);
}


/**
 * @param {module:ol/geom/Geometry} geometry Geometry.
 * @return {GeoJSONGeometryCollection} Empty GeoJSON geometry collection.
 */
function writeEmptyGeometryCollectionGeometry(geometry) {
  return /** @type {GeoJSONGeometryCollection} */ ({
    type: 'GeometryCollection',
    geometries: []
  });
}


/**
 * @param {module:ol/geom/GeometryCollection} geometry Geometry.
 * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
 * @return {GeoJSONGeometryCollection} GeoJSON geometry collection.
 */
function writeGeometryCollectionGeometry(geometry, opt_options) {
  var geometries = geometry.getGeometriesArray().map(function(geometry) {
    var options = assign({}, opt_options);
    delete options.featureProjection;
    return writeGeometry(geometry, options);
  });
  return /** @type {GeoJSONGeometryCollection} */ ({
    type: 'GeometryCollection',
    geometries: geometries
  });
}


/**
 * @param {module:ol/geom/LineString} geometry Geometry.
 * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */
function writeLineStringGeometry(geometry, opt_options) {
  return /** @type {GeoJSONGeometry} */ ({
    type: 'LineString',
    coordinates: geometry.getCoordinates()
  });
}


/**
 * @param {module:ol/geom/MultiLineString} geometry Geometry.
 * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */
function writeMultiLineStringGeometry(geometry, opt_options) {
  return /** @type {GeoJSONGeometry} */ ({
    type: 'MultiLineString',
    coordinates: geometry.getCoordinates()
  });
}


/**
 * @param {module:ol/geom/MultiPoint} geometry Geometry.
 * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */
function writeMultiPointGeometry(geometry, opt_options) {
  return /** @type {GeoJSONGeometry} */ ({
    type: 'MultiPoint',
    coordinates: geometry.getCoordinates()
  });
}


/**
 * @param {module:ol/geom/MultiPolygon} geometry Geometry.
 * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */
function writeMultiPolygonGeometry(geometry, opt_options) {
  var right;
  if (opt_options) {
    right = opt_options.rightHanded;
  }
  return /** @type {GeoJSONGeometry} */ ({
    type: 'MultiPolygon',
    coordinates: geometry.getCoordinates(right)
  });
}


/**
 * @param {module:ol/geom/Point} geometry Geometry.
 * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */
function writePointGeometry(geometry, opt_options) {
  return /** @type {GeoJSONGeometry} */ ({
    type: 'Point',
    coordinates: geometry.getCoordinates()
  });
}


/**
 * @param {module:ol/geom/Polygon} geometry Geometry.
 * @param {module:ol/format/Feature~WriteOptions=} opt_options Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */
function writePolygonGeometry(geometry, opt_options) {
  var right;
  if (opt_options) {
    right = opt_options.rightHanded;
  }
  return /** @type {GeoJSONGeometry} */ ({
    type: 'Polygon',
    coordinates: geometry.getCoordinates(right)
  });
}


export default GeoJSON;

//# sourceMappingURL=GeoJSON.js.map