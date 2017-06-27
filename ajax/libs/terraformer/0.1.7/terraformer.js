/*! Terraformer JS - 0.0.1 - 2013-02-16
*   https://github.com/geoloqi/Terraformer
*   Copyright (c) 2013 Environmental Systems Research Institute, Inc.
*   Licensed MIT */

(function (root, factory) {

  // Node.
  if(typeof module === 'object' && typeof module.exports === 'object') {
    exports = module.exports = factory();
  }

  // AMD.
  if(typeof define === 'function' && define.amd) {
    define(factory);
  }

  // Browser Global.
  if(typeof window === "object") {
    root.Terraformer = factory();
  }

}(this, function(){
  var exports = {},
      EarthRadius = 6378137,
      DegreesPerRadian = 57.295779513082320,
      RadiansPerDegree =  0.017453292519943,
      MercatorCRS = {
        "type": "link",
        "properties": {
          "href": "http://spatialreference.org/ref/sr-org/6928/ogcwkt/",
          "type": "ogcwkt"
        }
      },
      GeographicCRS = {
        "type": "link",
        "properties": {
          "href": "http://spatialreference.org/ref/epsg/4326/ogcwkt/",
          "type": "ogcwkt"
        }
      };
  /*
  Internal: safe warning
  */
  function warn() {
    var args = Array.prototype.slice.apply(arguments);

    if (typeof console !== undefined && console.warn) {
      console.warn.apply(console, args);
    }
  }

  /*
  Internal: Extend one object with another.
  */
  function extend(destination, source) {
    for (var k in source) {
      if (source.hasOwnProperty(k)) {
        destination[k] = source[k];
      }
    }
    return destination;
  }

  /*
  Internal: Merge two objects together.
  */
  function mergeObjects (base, add) {
    add = add || {};

    var keys = Object.keys(add);
    for (var i in keys) {
      base[keys[i]] = add[keys[i]];
    }

    return base;
  }

  /*
  Public: Calculate an bounding box for a geojson object
  */
  function calculateBounds (geojson) {

    switch (geojson.type) {
      case 'Point':
        return [ geojson.coordinates[0], geojson.coordinates[1], geojson.coordinates[0], geojson.coordinates[1]];

      case 'MultiPoint':
        return calculateBoundsFromArray(geojson.coordinates);

      case 'LineString':
        return calculateBoundsFromArray(geojson.coordinates);

      case 'MultiLineString':
        return calculateBoundsFromNestedArrays(geojson.coordinates);

      case 'Polygon':
        return calculateBoundsFromNestedArrays(geojson.coordinates);

      case 'MultiPolygon':
        return calculateBoundsFromNestedArrayOfArrays(geojson.coordinates);

      case 'Feature':
        return calculateBounds(geojson.geometry);

      case 'FeatureCollection':
        return calculateBoundsForFeatureCollection(geojson);

      case 'GeometryCollection':
        return calculateBoundsForGeometryCollection(geojson);

      default:
        throw new Error("Unknown type: " + geojson.type);
    }
  }

  /*
  Internal: Calculate an bounding box from an nested array of positions
  */
  function calculateBoundsFromNestedArrays (array) {
    var x1 = null, x2 = null, y1 = null, y2 = null;

    for (var i = 0; i < array.length; i++) {
      var inner = array[i];

      for (var j = 0; j < inner.length; j++) {
        var lonlat = inner[j];

        var lon = lonlat[0];
        var lat = lonlat[1];

        if (x1 === null) {
          x1 = lon;
        } else if (lon < x1) {
          x1 = lon;
        }

        if (x2 === null) {
          x2 = lon;
        } else if (lon > x2) {
          x2 = lon;
        }

        if (y1 === null) {
          y1 = lat;
        } else if (lat < y1) {
          y1 = lat;
        }

        if (y2 === null) {
          y2 = lat;
        } else if (lat > y2) {
          y2 = lat;
        }
      }
    }

    return [x1, y1, x2, y2 ];
  }

  /*
  Internal: Calculate a bounding box from an array of arrays of arrays
  */
  function calculateBoundsFromNestedArrayOfArrays (array) {
    var x1 = null, x2 = null, y1 = null, y2 = null;

    for (var i = 0; i < array.length; i++) {
      var inner = array[i];

      for (var j = 0; j < inner.length; j++) {
        var innerinner = inner[j];
        for (var k = 0; k < innerinner.length; k++) {
          var lonlat = innerinner[k];

          var lon = lonlat[0];
          var lat = lonlat[1];

          if (x1 === null) {
            x1 = lon;
          } else if (lon < x1) {
            x1 = lon;
          }

          if (x2 === null) {
            x2 = lon;
          } else if (lon > x2) {
            x2 = lon;
          }

          if (y1 === null) {
            y1 = lat;
          } else if (lat < y1) {
            y1 = lat;
          }

          if (y2 === null) {
            y2 = lat;
          } else if (lat > y2) {
            y2 = lat;
          }
        }
      }
    }

    return [x1, y1, x2, y2];
  }

  /*
  Internal: Calculate a bounding box from an array of positions
  */
  function calculateBoundsFromArray (array) {
    var x1 = null, x2 = null, y1 = null, y2 = null;

    for (var i = 0; i < array.length; i++) {
      var lonlat = array[i];

      var lon = lonlat[0];
      var lat = lonlat[1];

      if (x1 === null) {
        x1 = lon;
      } else if (lon < x1) {
        x1 = lon;
      }

      if (x2 === null) {
        x2 = lon;
      } else if (lon > x2) {
        x2 = lon;
      }

      if (y1 === null) {
        y1 = lat;
      } else if (lat < y1) {
        y1 = lat;
      }

      if (y2 === null) {
        y2 = lat;
      } else if (lat > y2) {
        y2 = lat;
      }
    }

    return [x1, y1, x2, y2 ];
  }

  /*
  Internal: Calculate an bounding box for a feature collection
  */
  function calculateBoundsForFeatureCollection(featureCollection){
    var extents = [], extent;
    for (var i = featureCollection.features.length - 1; i >= 0; i--) {
      extent = calculateBounds(featureCollection.features[i].geometry);
      extents.push([extent[0],extent[1]]);
      extents.push([extent[2],extent[3]]);
    }

    return calculateBoundsFromArray(extents);
  }

  /*
  Internal: Calculate an bounding box for a geometry collection
  */
  function calculateBoundsForGeometryCollection(geometryCollection){
    var extents = [], extent;

    for (var i = geometryCollection.geometries.length - 1; i >= 0; i--) {
      extent = calculateBounds(geometryCollection.geometries[i]);
      extents.push([extent[0],extent[1]]);
      extents.push([extent[2],extent[3]]);
    }

    return calculateBoundsFromArray(extents);
  }

  /*
  Internal: Convert radians to degrees. Used by spatial reference converters.
  */
  function radToDeg(rad) {
    return rad * DegreesPerRadian;
  }

  /*
  Internal: Convert degrees to radians. Used by spatial reference converters.
  */
  function degToRad(deg) {
    return deg * RadiansPerDegree;
  }

  /*
  Internal: Loop over each geometry in a geojson object and apply a function to it. Used by spatial reference converters.
  */
  function eachGeometry(geojson, func){
    for (var i = 0; i < geojson.geometries.length; i++) {
      geojson.geometries[i].geometry = eachPosition(geojson.features[i].geometry, func);
    }
    return geojson;
  }

  /*
  Internal: Loop over each feature in a geojson object and apply a function to it. Used by spatial reference converters.
  */
  function eachFeature(geojson, func){
    for (var i = 0; i < geojson.features.length; i++) {
      geojson.features[i].geometry = eachPosition(geojson.features[i].geometry, func);
    }
    return geojson;
  }

  /*
  Internal: Loop over each array in a geojson object and apply a function to it. Used by spatial reference converters.
  */
  function eachPosition(coordinates, func) {
    for (var i = 0; i < coordinates.length; i++) {
      // we found a number so lets convert this pair
      if(typeof coordinates[i][0] === "number"){
        coordinates[i] = func(coordinates[i]);
      }
      // we found an coordinates array it again and run THIS function against it
      if(typeof coordinates[i] === "object"){
        coordinates[i] = eachPosition(coordinates[i], func);
      }
    }
    return coordinates;
  }

  /*
  Public: Convert a GeoJSON Position object to Geographic (4326)
  */
  function positionToGeographic(position) {
    var x = position[0];
    var y = position[1];
    return [radToDeg(x / EarthRadius) - (Math.floor((radToDeg(x / EarthRadius) + 180) / 360) * 360), radToDeg((Math.PI / 2) - (2 * Math.atan(Math.exp(-1.0 * y / EarthRadius))))];
  }

  /*
  Public: Convert a GeoJSON Position object to Web Mercator (102100)
  */
  function positionToMercator(position) {
    var lng = position[0];
    var lat = Math.max(Math.min(position[1], 89.99999), -89.99999);
    return [degToRad(lng) * EarthRadius, EarthRadius/2.0 * Math.log( (1.0 + Math.sin(degToRad(lat))) / (1.0 - Math.sin(degToRad(lat))) )];
  }

  /*
  Public: Apply a function agaist all positions in a geojson object. Used by spatial reference converters.
  */
  function applyConverter(geojson, converter){
    if(geojson.type === "Point") {
      geojson.coordinates = converter(geojson.coordinates);
    } else if(geojson.type === "Feature") {
      geojson.geometry = applyConverter(geojson, converter);
    } else if(geojson.type === "FeatureCollection") {
      geojson.features = eachFeature(geojson, converter);
    } else if(geojson.type === "GeometryCollection") {
      geojson.geometries = eachGeometry(geojson, converter);
    } else {
      geojson.coordinates = eachPosition(geojson.coordinates, converter);
    }

    if(converter === positionToMercator){
      geojson.crs = MercatorCRS;
    }

    if(converter === positionToGeographic){
      delete geojson.crs;
    }

    return geojson;
  }

  /*
  Public: Convert a GeoJSON object to ESRI Web Mercator (102100)
  */
  function toMercator(geojson) {
    return applyConverter(geojson, positionToMercator);
  }

  /*
  Convert a GeoJSON object to Geographic coordinates (WSG84, 4326)
  */
  function toGeographic(geojson) {
    return applyConverter(geojson, positionToGeographic);
  }


  /*
  Internal: -1,0,1 comparison function
  */
  function cmp(a, b) {
    if(a < b) {
      return -1;
    } else if(a > b) {
      return 1;
    } else {
      return 0;
    }
  }


  /*
  Internal: used to determine turn
  */
  function turn(p, q, r) {
    // Returns -1, 0, 1 if p,q,r forms a right, straight, or left turn.
    return cmp((q[0] - p[0]) * (r[1] - p[1]) - (r[0] - p[0]) * (q[1] - p[1]), 0);
  }

  /*
  Internal: used to determine euclidean distance between two points
  */
  function euclideanDistance(p, q) {
    // Returns the squared Euclidean distance between p and q.
    var dx = q[0] - p[0];
    var dy = q[1] - p[1];

    return dx * dx + dy * dy;
  }

  function nextHullPoint(points, p) {
    // Returns the next point on the convex hull in CCW from p.
    var q = p;
    for(var r in points) {
      var t = turn(p, q, points[r]);
      if(t === -1 || t === 0 && euclideanDistance(p, points[r]) > euclideanDistance(p, q)) {
        q = points[r];
      }
    }
    return q;
  }

  function convexHull(points) {
    // implementation of the Jarvis March algorithm
    // adapted from http://tixxit.wordpress.com/2009/12/09/jarvis-march/

    if(points.length === 0) {
      return [];
    } else if(points.length === 1) {
      return points;
    }

    function comp(p1, p2) {
      if(p1[0] - p2[0] > p1[1] - p2[1]) {
        return 1;
      } else if(p1[0] - p2[0] < p1[1] - p2[1]) {
        return -1;
      } else {
        return 0;
      }
    }

    // Returns the points on the convex hull of points in CCW order.
    var hull = [points.sort(comp)[0]];

    for(var p = 0; p < hull.length; p++) {
      var q = nextHullPoint(points, hull[p]);

      if(q !== hull[0]) {
        hull.push(q);
      }
    }

    return hull;
  }

  function coordinatesContainPoint(coordinates, point) {
    var contains = false;
    for(var i = -1, l = coordinates.length, j = l - 1; ++i < l; j = i) {
      if (((coordinates[i][1] <= point[1] && point[1] < coordinates[j][1]) ||
           (coordinates[j][1] <= point[1] && point[1] < coordinates[i][1])) &&
          (point[0] < (coordinates[j][0] - coordinates[i][0]) * (point[1] - coordinates[i][1]) / (coordinates[j][1] - coordinates[i][1]) + coordinates[i][0])) {
        contains = true;
      }
    }
    return contains;
  }

  function polygonContainsPoint(polygon, point) {
    if (polygon && polygon.length) {
      if (polygon.length === 1) { // polygon with no holes
        return coordinatesContainPoint(polygon[0], point);
      } else { // polygon with holes
        if (coordinatesContainPoint(polygon[0], point)) {
          for (var i = 1; i < polygon.length; i++) {
            if (coordinatesContainPoint(polygon[i], point)) {
              return false; // found in hole
            }
          }

          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  function vertexIntersectsVertex(a1, a2, b1, b2) {
    var ua_t = (b2[0] - b1[0]) * (a1[1] - b1[1]) - (b2[1] - b1[1]) * (a1[0] - b1[0]);
    var ub_t = (a2[0] - a1[0]) * (a1[1] - b1[1]) - (a2[1] - a1[1]) * (a1[0] - b1[0]);
    var u_b  = (b2[1] - b1[1]) * (a2[0] - a1[0]) - (b2[0] - b1[0]) * (a2[1] - a1[1]);

    if ( u_b !== 0 ) {
      var ua = ua_t / u_b;
      var ub = ub_t / u_b;

      if ( 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1 ) {
        return true;
      }
    }

    return false;
  }

  function arrayIntersectsArray(a, b) {
    for (var i = 0; i < a.length - 1; i++) {
      for (var j = 0; j < b.length - 1; j++) {
        if (vertexIntersectsVertex(a[i], a[i + 1], b[j], b[j + 1])) {
          return true;
        }
      }
    }

    return false;
  }

  function arrayIntersectsMultiArray(a, b) {
    for (var i = 0; i < b.length; i++) {
      var inner = b[i];

      for (var j = 0; j < inner.length - 1; j++) {
        for (var k = 0; k < a.length - 1; k++) {
          if (vertexIntersectsVertex(inner[j], inner[j + 1], a[k], a[k + 1])) {
            return true;
          }
        }
      }
    }

    return false;
  }

  function multiArrayIntersectsMultiArray(a, b) {
    for (var i = 0; i < a.length; i++) {
      if (arrayIntersectsMultiArray(a[i], b)) {
        return true;
      }
    }

    return false;
  }

  function arrayIntersectsMultiMultiArray(a, b) {
    for (var i = 0; i < b.length; i++) {
      if (arrayIntersectsMultiArray(a, b[i])) {
        return true;
      }

      return false;
    }
  }

  function multiArrayIntersectsMultiMultiArray(a, b) {
    for (var i = 0; i < a.length; i++) {
      if (arrayIntersectsMultiMultiArray(a[i], b)) {
        return true;
      }

      return false;
    }
  }

  function multiMultiArrayIntersectsMultiMultiArray(a, b) {
    for (var i = 0; i < a.length; i++) {
      if (multiArrayIntersectsMultiMultiArray(a[i], b)) {
        return true;
      }

      return false;
    }
  }

  /*
  Internal: Returns a copy of coordinates for s closed polygon
  */
  function closedPolygon(coordinates) {
    var outer = [ ];

    for (var i = 0; i < coordinates.length; i++) {
      var inner = coordinates[i].slice();

      if (pointsEqual(inner[0], inner[inner.length - 1]) === false) {
        inner.push(inner[0]);
      }

      outer.push(inner);
    }

    return outer;
  }

  function pointsEqual(a, b) {
    for (var i = 0; i < a.length; i++) {
      for (var j = 0; j < b.length; j++) {
        if (a[i] !== b[j]) {
          return false;
        }
      }
    }

    return true;
  }

  /*
  Internal: An array of variables that will be excluded form JSON objects.
  */
  var excludeFromJSON = ["length"];

  /*
  Internal: Base GeoJSON Primitive
  */
  function Primitive(geojson){
    if(geojson){
      switch (geojson.type) {
        case 'Point':
          return new Point(geojson);

        case 'MultiPoint':
          return new MultiPoint(geojson);

        case 'LineString':
          return new LineString(geojson);

        case 'MultiLineString':
          return new MultiLineString(geojson);

        case 'Polygon':
          return new Polygon(geojson);

        case 'MultiPolygon':
          return new MultiPolygon(geojson);

        case 'Feature':
          return new Feature(geojson);

        case 'FeatureCollection':
          return new FeatureCollection(geojson);

        case 'GeometryCollection':
          return new GeometryCollection(geojson);

        default:
          throw new Error("Unknown type: " + geojson.type);
      }
    }
  }

  Primitive.prototype = {
    toMercator: function(){
      return toMercator(this);
    },
    toGeographic: function(){
      return toGeographic(this);
    },
    envelope: function(){
      var bounds = calculateBounds(this);
      return {
        x: bounds[0],
        y: bounds[1],
        w: Math.abs(bounds[0] - bounds[2]),
        h: Math.abs(bounds[1] - bounds[3])
      };
    },
    convexHull: function(){
      var coordinates = [ ], i, j;
      if (this.type === 'Point') {
        if (this.coordinates && this.coordinates.length > 0) {
          return [ this.coordinates ];
        } else {
          return [ ];
        }
      } else if (this.type === 'LineString' || this.type === 'MultiPoint') {
        if (this.coordinates && this.coordinates.length > 0) {
          coordinates = this.coordinates;
        } else {
          return [ ];
        }
      } else if (this.type === 'Polygon' || this.type === 'MultiLineString') {
        if (this.coordinates && this.coordinates.length > 0) {
          for (i = 0; i < this.coordinates.length; i++) {
            coordinates = coordinates.concat(this.coordinates[i]);
          }
        } else {
          return [ ];
        }
      } else if (this.type === 'MultiPolygon') {
        if (this.coordinates && this.coordinates.length > 0) {
          for (i = 0; i < this.coordinates.length; i++) {
            for (j = 0; j < this.coordinates[i].length; j++) {
              coordinates = coordinates.concat(this.coordinates[i][j]);
            }
          }
        } else {
          return [ ];
        }
      } else {
        throw new Error("Unable to get convex hull of " + this.type);
      }

      return convexHull(coordinates);
    },
    toJSON: function(){
      var obj = {};
      for (var key in this) {
        if (this.hasOwnProperty(key) && this[key] && excludeFromJSON.indexOf(key)) {
          obj[key] = this[key];
        }
      }
      return obj;
    },
    toJson: function () {
      return JSON.stringify(this);
    }
  };
  Primitive.prototype.intersects = function(primitive) {
    // if we are passed a feature, use the polygon inside instead
    if (primitive.type === 'Feature') {
      primitive = primitive.geometry;
    }

    if (this.type === 'LineString') {
      if (primitive.type === 'LineString') {
        return arrayIntersectsArray(this.coordinates, primitive.coordinates);
      } else if (primitive.type === 'MultiLineString') {
        return arrayIntersectsMultiArray(this.coordinates, primitive.coordinates);
      } else if (primitive.type === 'Polygon') {
        return arrayIntersectsMultiArray(this.coordinates, closedPolygon(primitive.coordinates));
      } else if (primitive.type === 'MultiPolygon') {
        return arrayIntersectsMultiMultiArray(this.coordinates, primitive.coordinates);
      }
    } else if (this.type === 'MultiLineString') {
      if (primitive.type === 'LineString') {
        return arrayIntersectsMultiArray(primitive.coordinates, this.coordinates);
      } else if (primitive.type === 'Polygon' || primitive.type === 'MultiLineString') {
        return multiArrayIntersectsMultiArray(this.coordinates, primitive.coordinates);
      } else if (primitive.type === 'MultiPolygon') {
        return multiArrayIntersectsMultiMultiArray(this.coordinates, primitive.coordinates);
      }
    } else if (this.type === 'Polygon') {
      if (primitive.type === 'LineString') {
        return arrayIntersectsMultiArray(primitive.coordinates, closedPolygon(this.coordinates));
      } else if (primitive.type === 'MultiLineString') {
        return multiArrayIntersectsMultiArray(closedPolygon(this.coordinates), primitive.coordinates);
      } else if (primitive.type === 'Polygon') {
        return multiArrayIntersectsMultiArray(closedPolygon(this.coordinates), closedPolygon(primitive.coordinates));
      } else if (primitive.type === 'MultiPolygon') {
        return multiArrayIntersectsMultiMultiArray(closedPolygon(this.coordinates), primitive.coordinates);
      }
    } else if (this.type === 'MultiPolygon') {
      if (primitive.type === 'LineString') {
        return arrayIntersectsMultiMultiArray(primitive.coordinates, this.coordinates);
      } else if (primitive.type === 'Polygon' || primitive.type === 'MultiLineString') {
        return multiArrayIntersectsMultiMultiArray(closedPolygon(primitive.coordinates), this.coordinates);
      } else if (primitive.type === 'MultiPolygon') {
        return multiMultiArrayIntersectsMultiMultiArray(this.coordinates, primitive.coordinates);
      }
    } else if (this.type === 'Feature') {
      // in the case of a Feature, use the internal primitive for intersection
      var inner = new Primitive(this.geometry);
      return inner.intersects(primitive);
    }

    warn("Type " + this.type + " to " + primitive.type + " intersection is not supported by intersects");
    return false;
  };


  /*
  GeoJSON Point Class
    new Point();
    new Point(x,y,z,wtf);
    new Point([x,y,z,wtf]);
    new Point([x,y]);
    new Point({
      type: "Point",
      coordinates: [x,y]
    });
  */
  function Point(input){
    var args = Array.prototype.slice.call(arguments);

    if(input && input.type === "Point" && input.coordinates){
      extend(this, input);
    } else if(input && Array.isArray(input)) {
      this.coordinates = input;
    } else if(args.length >= 2) {
      this.coordinates = args;
    } else {
      throw "Terraformer: invalid input for Terraformer.Point";
    }

    this.type = "Point";

    this.__defineGetter__("bbox", function(){
      return calculateBounds(this);
    });
  }

  Point.prototype = new Primitive();
  Point.prototype.constructor = Point;

  /*
  GeoJSON MultiPoint Class
      new MultiPoint();
      new MultiPoint([[x,y], [x1,y1]]);
      new MultiPoint({
        type: "MultiPoint",
        coordinates: [x,y]
      });
  */
  function MultiPoint(input){
    if(input && input.type === "MultiPoint" && input.coordinates){
      extend(this, input);
    } else if(Array.isArray(input)) {
      this.coordinates = input;
    } else {
      throw "Terraformer: invalid input for Terraformer.MultiPoint";
    }

    this.type = "MultiPoint";

    this.__defineGetter__("bbox", function(){
      return calculateBounds(this);
    });

    this.__defineGetter__('length', function () {
      return this.coordinates ? this.coordinates.length : 0;
    });
  }

  MultiPoint.prototype = new Primitive();
  MultiPoint.prototype.constructor = MultiPoint;
  MultiPoint.prototype.forEach = function(func){
    for (var i = 0; i < this.length; i++) {
      func.apply(this, [this.coordinates[i], i, this.coordinates]);
    }
    return this;
  };
  MultiPoint.prototype.addPoint = function(point){
    this.coordinates.push(point);
    return this;
  };
  MultiPoint.prototype.insertPoint = function(point, index){
    this.coordinates.splice(index, 0, point);
    return this;
  };
  MultiPoint.prototype.removePoint = function(remove){
    if(typeof remove === "number"){
      this.coordinates.splice(remove, 1);
    } else {
      this.coordinates.splice(this.coordinates.indexOf(remove), 1);
    }
    return this;
  };
  MultiPoint.prototype.get = function(i){
    return new Point(this.coordinates[i]);
  };

  /*
  GeoJSON LineString Class
      new LineString();
      new LineString([[x,y], [x1,y1]]);
      new LineString({
        type: "LineString",
        coordinates: [x,y]
      });
  */
  function LineString(input){
    if(input && input.type === "LineString" && input.coordinates){
      extend(this, input);
    } else if(Array.isArray(input)) {
      this.coordinates = input;
    } else {
      throw "Terraformer: invalid input for Terraformer.LineString";
    }

    this.type = "LineString";

    this.__defineGetter__("bbox", function(){
      return calculateBounds(this);
    });
  }

  LineString.prototype = new Primitive();
  LineString.prototype.constructor = LineString;
  LineString.prototype.addVertex = function(point){
    this.coordinates.push(point);
    return this;
  };
  LineString.prototype.insertVertex = function(point, index){
    this.coordinates.splice(index, 0, point);
    return this;
  };
  LineString.prototype.removeVertex = function(remove){
    this.coordinates.splice(remove, 1);
    return this;
  };

  /*
  GeoJSON MultiLineString Class
      new MultiLineString();
      new MultiLineString([ [[x,y], [x1,y1]], [[x2,y2], [x3,y3]] ]);
      new MultiLineString({
        type: "MultiLineString",
        coordinates: [ [[x,y], [x1,y1]], [[x2,y2], [x3,y3]] ]
      });
  */
  function MultiLineString(input){
    if(input && input.type === "MultiLineString" && input.coordinates){
      extend(this, input);
    } else if(Array.isArray(input)) {
      this.coordinates = input;
    } else {
      throw "Terraformer: invalid input for Terraformer.MultiLineString";
    }

    this.type = "MultiLineString";

    this.__defineGetter__("bbox", function(){
      return calculateBounds(this);
    });

    this.__defineGetter__('length', function () {
      return this.coordinates ? this.coordinates.length : 0;
    });
  }

  MultiLineString.prototype = new Primitive();
  MultiLineString.prototype.constructor = MultiLineString;
  MultiLineString.prototype.forEach = function(func){
    for (var i = 0; i < this.coordinates.length; i++) {
      func.apply(this, [this.coordinates[i], i, this.coordinates ]);
    }
  };
  MultiLineString.prototype.get = function(i){
    return new LineString(this.coordinates[i]);
  };

  /*
  GeoJSON Polygon Class
      new Polygon();
      new Polygon([ [[x,y], [x1,y1], [x2,y2]] ]);
      new Polygon({
        type: "Polygon",
        coordinates: [ [[x,y], [x1,y1], [x2,y2]] ]
      });
  */
  function Polygon(input){
    if(input && input.type === "Polygon" && input.coordinates){
      extend(this, input);
    } else if(Array.isArray(input)) {
      this.coordinates = input;
    } else {
      throw "Terraformer: invalid input for Terraformer.Polygon";
    }

    this.type = "Polygon";

    this.__defineGetter__("bbox", function(){
      return calculateBounds(this);
    });
  }

  Polygon.prototype = new Primitive();
  Polygon.prototype.constructor = Polygon;
  Polygon.prototype.addVertex = function(point){
    this.coordinates[0].push(point);
    return this;
  };
  Polygon.prototype.insertVertex = function(point, index){
    this.coordinates[0].splice(index, 0, point);
    return this;
  };
  Polygon.prototype.removeVertex = function(remove){
    this.coordinates[0].splice(remove, 1);
    return this;
  };
  Polygon.prototype.contains = function(primitive) {
    if (primitive.type !== "Point") {
      throw new Error("Only points are supported");
    }

    return polygonContainsPoint(this.coordinates, primitive.coordinates);
  };

  /*
  GeoJSON MultiPolygon Class
      new MultiPolygon();
      new MultiPolygon([ [ [[x,y], [x1,y1]], [[x2,y2], [x3,y3]] ] ]);
      new MultiPolygon({
        type: "MultiPolygon",
        coordinates: [ [ [[x,y], [x1,y1]], [[x2,y2], [x3,y3]] ] ]
      });
  */
  function MultiPolygon(input){
    if(input && input.type === "MultiPolygon" && input.coordinates){
      extend(this, input);
    } else if(Array.isArray(input)) {
      this.coordinates = input;
    } else {
      throw "Terraformer: invalid input for Terraformer.MultiPolygon";
    }

    this.type = "MultiPolygon";

    this.__defineGetter__("bbox", function(){
      return calculateBounds(this);
    });

    this.__defineGetter__('length', function () {
      return this.coordinates ? this.coordinates.length : 0;
    });
  }

  MultiPolygon.prototype = new Primitive();
  MultiPolygon.prototype.constructor = MultiPolygon;
  MultiPolygon.prototype.forEach = function(func){
    for (var i = 0; i < this.coordinates.length; i++) {
      func.apply(this, [this.coordinates[i], i, this.coordinates ]);
    }
  };
  MultiPolygon.prototype.contains = function(primitive) {
    if (primitive.type !== "Point") {
      throw new Error("Only points are supported");
    }

    for (var i = 0; i < this.coordinates.length; i++) {
      if (polygonContainsPoint(this.coordinates[i], primitive.coordinates)) {
        return true;
      }
    }

    return false;
  };
  MultiPolygon.prototype.get = function(i){
    return new Polygon(this.coordinates[i]);
  };

  /*
  GeoJSON Feature Class
      new Feature();
      new Feature({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [ [ [[x,y], [x1,y1]], [[x2,y2], [x3,y3]] ] ]
        }
      });
      new Feature({
        type: "Polygon",
        coordinates: [ [ [[x,y], [x1,y1]], [[x2,y2], [x3,y3]] ] ]
      });
  */
  function Feature(input){
    if(input && input.type === "Feature" && input.geometry){
      extend(this, input);
    } else if(input && input.type && input.coordinates) {
      this.geometry = input;
    } else {
      throw "Terraformer: invalid input for Terraformer.Feature";
    }

    this.type = "Feature";

    this.__defineGetter__("bbox", function(){
      return calculateBounds(this);
    });
  }

  Feature.prototype = new Primitive();
  Feature.prototype.constructor = Feature;
  Feature.prototype.contains = function(primitive) {
    if (primitive.type !== "Point") {
      throw new Error("Only points are supported");
    }

    if (!this.geometry.type.match(/Polygon/)) {
      throw new Error("Only features containing Polygons and MultiPolygons are supported");
    }
    if(this.geometry.type === "MultiPolygon"){
      for (var i = 0; i < this.geometry.coordinates.length; i++) {
        if (polygonContainsPoint(this.geometry.coordinates[i], primitive.coordinates)) {
          return true;
        }
      }
    }
    if(this.geometry.type === "Polygon"){
      return polygonContainsPoint(this.geometry.coordinates, primitive.coordinates);
    }
    return false;
  };


  /*
  GeoJSON FeatureCollection Class
      new FeatureCollection();
      new FeatureCollection([feature, feature1]);
      new FeatureCollection({
        type: "FeatureCollection",
        coordinates: [feature, feature1]
      });
  */
  function FeatureCollection(input){
    if(input && input.type === "FeatureCollection" && input.features){
      extend(this, input);
    } else if(Array.isArray(input)) {
      this.features = input;
    } else {
      throw "Terraformer: invalid input for Terraformer.FeatureCollection";
    }

    this.type = "FeatureCollection";

    this.__defineGetter__('length', function () {
      return this.features ? this.features.length : 0;
    });

    this.__defineGetter__("bbox", function(){
      return calculateBounds(this);
    });
  }

  FeatureCollection.prototype = new Primitive();
  FeatureCollection.prototype.constructor = FeatureCollection;
  FeatureCollection.prototype.forEach = function(func){
    for (var i = 0; i < this.features.length; i++) {
      func.apply(this, [this.features[i], i, this.features]);
    }
  };
  FeatureCollection.prototype.get = function(id){
    var found;
    this.forEach(function(feature){
      if(feature.id === id){
        found = feature;
      }
    });
    return new Feature(found);
  };

  /*
  GeoJSON GeometryCollection Class
      new GeometryCollection();
      new GeometryCollection([geometry, geometry1]);
      new GeometryCollection({
        type: "GeometryCollection",
        coordinates: [geometry, geometry1]
      });
  */
  function GeometryCollection(input){
    if(input && input.type === "GeometryCollection" && input.geometries){
      extend(this, input);
    } else if(Array.isArray(input)) {
      this.geometries = input;
    } else if(input.coordinates && input.type){
      this.type = "GeometryCollection";
      this.geometries = [input];
    } else {
      throw "Terraformer: invalid input for Terraformer.GeometryCollection";
    }

    this.type = "GeometryCollection";

    this.__defineGetter__('length', function () {
      return this.geometries ? this.geometries.length : 0;
    });

    this.__defineGetter__("bbox", function(){
      return calculateBounds(this);
    });

  }

  GeometryCollection.prototype = new Primitive();
  GeometryCollection.prototype.constructor = GeometryCollection;
  GeometryCollection.prototype.forEach = function(func){
    for (var i = 0; i < this.geometries.length; i++) {
      func.apply(this, [this.geometries[i], i, this.geometries]);
    }
  };
  GeometryCollection.prototype.get = function(i){
    return new Primitive(this.geometries[i]);
  };

  function createCircle(center, rad, interpolate){
    var mercatorPosition = positionToMercator(center);
    var steps = interpolate || 64;
    var radius = rad || 250;
    var polygon = {
      type: "Polygon",
      coordinates: [[]]
    };
    for(var i=1; i<=steps; i++) {
      var radians = i * (360/steps) * Math.PI / 180;
      polygon.coordinates[0].push([mercatorPosition[0] + radius * Math.cos(radians), mercatorPosition[1] + radius * Math.sin(radians)]);
    }
    return toGeographic(polygon);
  }

  function Circle (center, rad, interpolate) {
    var steps = interpolate || 64;
    var radius = rad || 250;

    if(!center || center.length < 2 || !radius || !steps) {
      throw new Error("Terraformer: missing parameter for Terraformer.Circle");
    }

    extend(this, new Feature({
      type: "Feature",
      geometry: createCircle(center, radius, steps),
      properties: {
        radius: radius,
        center: center,
        steps: steps
      }
    }));

    this.__defineGetter__("bbox", function(){
      return calculateBounds(this);
    });

    this.__defineGetter__("radius", function(){
      return this.properties.radius;
    });

    this.__defineSetter__("radius", function(val){
      this.properties.radius = val;
      this.recalculate();
    });

    this.__defineGetter__("steps", function(){
      return this.properties.steps;
    });

    this.__defineSetter__("steps", function(val){
      this.properties.steps = val;
      this.recalculate();
    });

    this.__defineGetter__("center", function(){
      return this.properties.center;
    });

    this.__defineSetter__("center", function(val){
      this.properties.center = val;
      this.recalculate();
    });

  }

  Circle.prototype = new Primitive();
  Circle.prototype.constructor = Circle;
  Circle.prototype.recalculate = function(){
    this.geometry = createCircle(this.center, this.radius, this.steps);
    return this;
  };
  Circle.prototype.contains = function(primitive) {
    if (primitive.type !== "Point") {
      throw new Error("Only points are supported");
    }

    return polygonContainsPoint(this.geometry.coordinates, primitive.coordinates);
  };

  exports.Primitive = Primitive;
  exports.Point = Point;
  exports.MultiPoint = MultiPoint;
  exports.LineString = LineString;
  exports.MultiLineString = MultiLineString;
  exports.Polygon = Polygon;
  exports.MultiPolygon = MultiPolygon;
  exports.Feature = Feature;
  exports.FeatureCollection = FeatureCollection;
  exports.GeometryCollection = GeometryCollection;
  exports.Circle = Circle;

  exports.toMercator = toMercator;
  exports.toGeographic = toGeographic;

  exports.Tools = {};
  exports.Tools.positionToMercator = positionToMercator;
  exports.Tools.positionToGeographic = positionToGeographic;
  exports.Tools.applyConverter = applyConverter;
  exports.Tools.toMercator = toMercator;
  exports.Tools.toGeographic = toGeographic;
  exports.Tools.createCircle = createCircle;

  exports.Tools.calculateBounds = calculateBounds;
  exports.Tools.coordinatesContainPoint = coordinatesContainPoint;
  exports.Tools.polygonContainsPoint = polygonContainsPoint;
  exports.Tools.convexHull = convexHull;

  exports.MercatorCRS = MercatorCRS;
  exports.GeographicCRS = GeographicCRS;

  return exports;
}));