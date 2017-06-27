(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.L.esri = {}))
}(this, function (exports) { 'use strict';

  var cors = ((window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest()));
  var pointerEvents = document.documentElement.style.pointerEvents === '';

  var Support = {
    cors: cors,
    pointerEvents: pointerEvents
  };

  exports.Support = Support;

  function pointsEqual (a, b) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  // checks if the first and last points of a ring are equal and closes the ring
  function closeRing (coordinates) {
    if (!pointsEqual(coordinates[0], coordinates[coordinates.length - 1])) {
      coordinates.push(coordinates[0]);
    }
    return coordinates;
  }

  // determine if polygon ring coordinates are clockwise. clockwise signifies outer ring, counter-clockwise an inner ring
  // or hole. this logic was found at http://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-
  // points-are-in-clockwise-order
  function ringIsClockwise (ringToTest) {
    var total = 0;
    var i = 0;
    var rLength = ringToTest.length;
    var pt1 = ringToTest[i];
    var pt2;
    for (i; i < rLength - 1; i++) {
      pt2 = ringToTest[i + 1];
      total += (pt2[0] - pt1[0]) * (pt2[1] + pt1[1]);
      pt1 = pt2;
    }
    return (total >= 0);
  }

  // ported from terraformer.js https://github.com/Esri/Terraformer/blob/master/terraformer.js#L504-L519
  function vertexIntersectsVertex (a1, a2, b1, b2) {
    var uaT = (b2[0] - b1[0]) * (a1[1] - b1[1]) - (b2[1] - b1[1]) * (a1[0] - b1[0]);
    var ubT = (a2[0] - a1[0]) * (a1[1] - b1[1]) - (a2[1] - a1[1]) * (a1[0] - b1[0]);
    var uB = (b2[1] - b1[1]) * (a2[0] - a1[0]) - (b2[0] - b1[0]) * (a2[1] - a1[1]);

    if (uB !== 0) {
      var ua = uaT / uB;
      var ub = ubT / uB;

      if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
        return true;
      }
    }

    return false;
  }

  // ported from terraformer.js https://github.com/Esri/Terraformer/blob/master/terraformer.js#L521-L531
  function arrayIntersectsArray (a, b) {
    for (var i = 0; i < a.length - 1; i++) {
      for (var j = 0; j < b.length - 1; j++) {
        if (vertexIntersectsVertex(a[i], a[i + 1], b[j], b[j + 1])) {
          return true;
        }
      }
    }

    return false;
  }

  // ported from terraformer.js https://github.com/Esri/Terraformer/blob/master/terraformer.js#L470-L480
  function coordinatesContainPoint (coordinates, point) {
    var contains = false;
    for (var i = -1, l = coordinates.length, j = l - 1; ++i < l; j = i) {
      if (((coordinates[i][1] <= point[1] && point[1] < coordinates[j][1]) ||
           (coordinates[j][1] <= point[1] && point[1] < coordinates[i][1])) &&
          (point[0] < (coordinates[j][0] - coordinates[i][0]) * (point[1] - coordinates[i][1]) / (coordinates[j][1] - coordinates[i][1]) + coordinates[i][0])) {
        contains = !contains;
      }
    }
    return contains;
  }

  // ported from terraformer-arcgis-parser.js https://github.com/Esri/terraformer-arcgis-parser/blob/master/terraformer-arcgis-parser.js#L106-L113
  function coordinatesContainCoordinates (outer, inner) {
    var intersects = arrayIntersectsArray(outer, inner);
    var contains = coordinatesContainPoint(outer, inner[0]);
    if (!intersects && contains) {
      return true;
    }
    return false;
  }

  // do any polygons in this array contain any other polygons in this array?
  // used for checking for holes in arcgis rings
  // ported from terraformer-arcgis-parser.js https://github.com/Esri/terraformer-arcgis-parser/blob/master/terraformer-arcgis-parser.js#L117-L172
  function convertRingsToGeoJSON (rings) {
    var outerRings = [];
    var holes = [];
    var x; // iterator
    var outerRing; // current outer ring being evaluated
    var hole; // current hole being evaluated

    // for each ring
    for (var r = 0; r < rings.length; r++) {
      var ring = closeRing(rings[r].slice(0));
      if (ring.length < 4) {
        continue;
      }
      // is this ring an outer ring? is it clockwise?
      if (ringIsClockwise(ring)) {
        var polygon = [ ring ];
        outerRings.push(polygon); // push to outer rings
      } else {
        holes.push(ring); // counterclockwise push to holes
      }
    }

    var uncontainedHoles = [];

    // while there are holes left...
    while (holes.length) {
      // pop a hole off out stack
      hole = holes.pop();

      // loop over all outer rings and see if they contain our hole.
      var contained = false;
      for (x = outerRings.length - 1; x >= 0; x--) {
        outerRing = outerRings[x][0];
        if (coordinatesContainCoordinates(outerRing, hole)) {
          // the hole is contained push it into our polygon
          outerRings[x].push(hole);
          contained = true;
          break;
        }
      }

      // ring is not contained in any outer ring
      // sometimes this happens https://github.com/Esri/esri-leaflet/issues/320
      if (!contained) {
        uncontainedHoles.push(hole);
      }
    }

    // if we couldn't match any holes using contains we can try intersects...
    while (uncontainedHoles.length) {
      // pop a hole off out stack
      hole = uncontainedHoles.pop();

      // loop over all outer rings and see if any intersect our hole.
      var intersects = false;

      for (x = outerRings.length - 1; x >= 0; x--) {
        outerRing = outerRings[x][0];
        if (arrayIntersectsArray(outerRing, hole)) {
          // the hole is contained push it into our polygon
          outerRings[x].push(hole);
          intersects = true;
          break;
        }
      }

      if (!intersects) {
        outerRings.push([hole.reverse()]);
      }
    }

    if (outerRings.length === 1) {
      return {
        type: 'Polygon',
        coordinates: outerRings[0]
      };
    } else {
      return {
        type: 'MultiPolygon',
        coordinates: outerRings
      };
    }
  }

  // This function ensures that rings are oriented in the right directions
  // outer rings are clockwise, holes are counterclockwise
  // used for converting GeoJSON Polygons to ArcGIS Polygons
  function orientRings (poly) {
    var output = [];
    var polygon = poly.slice(0);
    var outerRing = closeRing(polygon.shift().slice(0));
    if (outerRing.length >= 4) {
      if (!ringIsClockwise(outerRing)) {
        outerRing.reverse();
      }

      output.push(outerRing);

      for (var i = 0; i < polygon.length; i++) {
        var hole = closeRing(polygon[i].slice(0));
        if (hole.length >= 4) {
          if (ringIsClockwise(hole)) {
            hole.reverse();
          }
          output.push(hole);
        }
      }
    }

    return output;
  }

  // This function flattens holes in multipolygons to one array of polygons
  // used for converting GeoJSON Polygons to ArcGIS Polygons
  function flattenMultiPolygonRings (rings) {
    var output = [];
    for (var i = 0; i < rings.length; i++) {
      var polygon = orientRings(rings[i]);
      for (var x = polygon.length - 1; x >= 0; x--) {
        var ring = polygon[x].slice(0);
        output.push(ring);
      }
    }
    return output;
  }

  // shallow object clone for feature properties and attributes
  // from http://jsperf.com/cloning-an-object/2
  function shallowClone (obj) {
    var target = {};
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        target[i] = obj[i];
      }
    }
    return target;
  }

  // convert an extent (ArcGIS) to LatLngBounds (Leaflet)
  function extentToBounds (extent) {
    var sw = L.latLng(extent.ymin, extent.xmin);
    var ne = L.latLng(extent.ymax, extent.xmax);
    return new L.LatLngBounds(sw, ne);
  }

  // convert an LatLngBounds (Leaflet) to extent (ArcGIS)
  function boundsToExtent (bounds) {
    bounds = L.latLngBounds(bounds);
    return {
      'xmin': bounds.getSouthWest().lng,
      'ymin': bounds.getSouthWest().lat,
      'xmax': bounds.getNorthEast().lng,
      'ymax': bounds.getNorthEast().lat,
      'spatialReference': {
        'wkid': 4326
      }
    };
  }

  function arcgisToGeojson (arcgis, idAttribute) {
    var geojson = {};

    if (typeof arcgis.x === 'number' && typeof arcgis.y === 'number') {
      geojson.type = 'Point';
      geojson.coordinates = [arcgis.x, arcgis.y];
    }

    if (arcgis.points) {
      geojson.type = 'MultiPoint';
      geojson.coordinates = arcgis.points.slice(0);
    }

    if (arcgis.paths) {
      if (arcgis.paths.length === 1) {
        geojson.type = 'LineString';
        geojson.coordinates = arcgis.paths[0].slice(0);
      } else {
        geojson.type = 'MultiLineString';
        geojson.coordinates = arcgis.paths.slice(0);
      }
    }

    if (arcgis.rings) {
      geojson = convertRingsToGeoJSON(arcgis.rings.slice(0));
    }

    if (arcgis.geometry || arcgis.attributes) {
      geojson.type = 'Feature';
      geojson.geometry = (arcgis.geometry) ? arcgisToGeojson(arcgis.geometry) : null;
      geojson.properties = (arcgis.attributes) ? shallowClone(arcgis.attributes) : null;
      if (arcgis.attributes) {
        geojson.id = arcgis.attributes[idAttribute] || arcgis.attributes.OBJECTID || arcgis.attributes.FID;
      }
    }

    return geojson;
  }

  // GeoJSON -> ArcGIS
  function geojsonToArcGIS (geojson, idAttribute) {
    idAttribute = idAttribute || 'OBJECTID';
    var spatialReference = { wkid: 4326 };
    var result = {};
    var i;

    switch (geojson.type) {
    case 'Point':
      result.x = geojson.coordinates[0];
      result.y = geojson.coordinates[1];
      result.spatialReference = spatialReference;
      break;
    case 'MultiPoint':
      result.points = geojson.coordinates.slice(0);
      result.spatialReference = spatialReference;
      break;
    case 'LineString':
      result.paths = [geojson.coordinates.slice(0)];
      result.spatialReference = spatialReference;
      break;
    case 'MultiLineString':
      result.paths = geojson.coordinates.slice(0);
      result.spatialReference = spatialReference;
      break;
    case 'Polygon':
      result.rings = orientRings(geojson.coordinates.slice(0));
      result.spatialReference = spatialReference;
      break;
    case 'MultiPolygon':
      result.rings = flattenMultiPolygonRings(geojson.coordinates.slice(0));
      result.spatialReference = spatialReference;
      break;
    case 'Feature':
      if (geojson.geometry) {
        result.geometry = geojsonToArcGIS(geojson.geometry, idAttribute);
      }
      result.attributes = (geojson.properties) ? shallowClone(geojson.properties) : {};
      if (geojson.id) {
        result.attributes[idAttribute] = geojson.id;
      }
      break;
    case 'FeatureCollection':
      result = [];
      for (i = 0; i < geojson.features.length; i++) {
        result.push(geojsonToArcGIS(geojson.features[i], idAttribute));
      }
      break;
    case 'GeometryCollection':
      result = [];
      for (i = 0; i < geojson.geometries.length; i++) {
        result.push(geojsonToArcGIS(geojson.geometries[i], idAttribute));
      }
      break;
    }

    return result;
  }

  function responseToFeatureCollection (response, idAttribute) {
    var objectIdField;

    if (idAttribute) {
      objectIdField = idAttribute;
    } else if (response.objectIdFieldName) {
      objectIdField = response.objectIdFieldName;
    } else if (response.fields) {
      for (var j = 0; j <= response.fields.length - 1; j++) {
        if (response.fields[j].type === 'esriFieldTypeOID') {
          objectIdField = response.fields[j].name;
          break;
        }
      }
    } else {
      objectIdField = 'OBJECTID';
    }

    var featureCollection = {
      type: 'FeatureCollection',
      features: []
    };
    var features = response.features || response.results;
    if (features.length) {
      for (var i = features.length - 1; i >= 0; i--) {
        featureCollection.features.push(arcgisToGeojson(features[i], objectIdField));
      }
    }

    return featureCollection;
  }

    // trim url whitespace and add a trailing slash if needed
  function cleanUrl (url) {
    // trim leading and trailing spaces, but not spaces inside the url
    url = L.Util.trim(url);

    // add a trailing slash to the url if the user omitted it
    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    return url;
  }

  function isArcgisOnline (url) {
    /* hosted feature services can emit geojson natively.
    our check for 'geojson' support will need to be revisted
    once the functionality makes its way to ArcGIS Server*/
    return (/\.arcgis\.com.*?FeatureServer/g).test(url);
  }

  function geojsonTypeToArcGIS (geoJsonType) {
    var arcgisGeometryType;
    switch (geoJsonType) {
    case 'Point':
      arcgisGeometryType = 'esriGeometryPoint';
      break;
    case 'MultiPoint':
      arcgisGeometryType = 'esriGeometryMultipoint';
      break;
    case 'LineString':
      arcgisGeometryType = 'esriGeometryPolyline';
      break;
    case 'MultiLineString':
      arcgisGeometryType = 'esriGeometryPolyline';
      break;
    case 'Polygon':
      arcgisGeometryType = 'esriGeometryPolygon';
      break;
    case 'MultiPolygon':
      arcgisGeometryType = 'esriGeometryPolygon';
      break;
    }

    return arcgisGeometryType;
  }

  function warn () {
    if (console && console.warn) {
      console.warn.apply(console, arguments);
    }
  }

  var Util = {
    shallowClone: shallowClone,
    warn: warn,
    cleanUrl: cleanUrl,
    isArcgisOnline: isArcgisOnline,
    geojsonTypeToArcGIS: geojsonTypeToArcGIS,
    responseToFeatureCollection: responseToFeatureCollection,
    geojsonToArcGIS: geojsonToArcGIS,
    arcgisToGeojson: arcgisToGeojson,
    boundsToExtent: boundsToExtent,
    extentToBounds: extentToBounds
  };

  exports.Util = Util;

  var callbacks = 0;

  window._EsriLeafletCallbacks = {};

  function serialize (params) {
    var data = '';

    params.f = params.f || 'json';

    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        var param = params[key];
        var type = Object.prototype.toString.call(param);
        var value;

        if (data.length) {
          data += '&';
        }

        if (type === '[object Array]') {
          value = (Object.prototype.toString.call(param[0]) === '[object Object]') ? JSON.stringify(param) : param.join(',');
        } else if (type === '[object Object]') {
          value = JSON.stringify(param);
        } else if (type === '[object Date]') {
          value = param.valueOf();
        } else {
          value = param;
        }

        data += encodeURIComponent(key) + '=' + encodeURIComponent(value);
      }
    }

    return data;
  }

  function createRequest (callback, context) {
    var httpRequest = new window.XMLHttpRequest();

    httpRequest.onerror = function (e) {
      httpRequest.onreadystatechange = L.Util.falseFn;

      callback.call(context, {
        error: {
          code: 500,
          message: 'XMLHttpRequest error'
        }
      }, null);
    };

    httpRequest.onreadystatechange = function () {
      var response;
      var error;

      if (httpRequest.readyState === 4) {
        try {
          response = JSON.parse(httpRequest.responseText);
        } catch(e) {
          response = null;
          error = {
            code: 500,
            message: 'Could not parse response as JSON. This could also be caused by a CORS or XMLHttpRequest error.'
          };
        }

        if (!error && response.error) {
          error = response.error;
          response = null;
        }

        httpRequest.onerror = L.Util.falseFn;

        callback.call(context, error, response);
      }
    };

    return httpRequest;
  }

  function xmlHttpPost (url, params, callback, context) {
    var httpRequest = createRequest(callback, context);
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send(serialize(params));

    return httpRequest;
  }

  function xmlHttpGet (url, params, callback, context) {
    var httpRequest = createRequest(callback, context);

    httpRequest.open('GET', url + '?' + serialize(params), true);
    httpRequest.send(null);

    return httpRequest;
  }

  // AJAX handlers for CORS (modern browsers) or JSONP (older browsers)
  function request (url, params, callback, context) {
    var paramString = serialize(params);
    var httpRequest = createRequest(callback, context);
    var requestLength = (url + '?' + paramString).length;

    // request is less then 2000 characters and the browser supports CORS, make GET request with XMLHttpRequest
    if (requestLength <= 2000 && Support.cors) {
      httpRequest.open('GET', url + '?' + paramString);
      httpRequest.send(null);

    // request is less more then 2000 characters and the browser supports CORS, make POST request with XMLHttpRequest
    } else if (requestLength > 2000 && Support.cors) {
      httpRequest.open('POST', url);
      httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      httpRequest.send(paramString);

    // request is less more then 2000 characters and the browser does not support CORS, make a JSONP request
    } else if (requestLength <= 2000 && !Support.cors) {
      return jsonp(url, params, callback, context);

    // request is longer then 2000 characters and the browser does not support CORS, log a warning
    } else {
      warn('a request to ' + url + ' was longer then 2000 characters and this browser cannot make a cross-domain post request. Please use a proxy http://esri.github.io/esri-leaflet/api-reference/request.html');
      return;
    }

    return httpRequest;
  }

  function jsonp (url, params, callback, context) {
    var callbackId = 'c' + callbacks;

    params.callback = 'window._EsriLeafletCallbacks.' + callbackId;

    var script = L.DomUtil.create('script', null, document.body);
    script.type = 'text/javascript';
    script.src = url + '?' + serialize(params);
    script.id = callbackId;

    window._EsriLeafletCallbacks[callbackId] = function (response) {
      if (window._EsriLeafletCallbacks[callbackId] !== true) {
        var error;
        var responseType = Object.prototype.toString.call(response);

        if (!(responseType === '[object Object]' || responseType === '[object Array]')) {
          error = {
            error: {
              code: 500,
              message: 'Expected array or object as JSONP response'
            }
          };
          response = null;
        }

        if (!error && response.error) {
          error = response;
          response = null;
        }

        callback.call(context, error, response);
        window._EsriLeafletCallbacks[callbackId] = true;
      }
    };

    callbacks++;

    return {
      id: callbackId,
      url: script.src,
      abort: function () {
        window._EsriLeafletCallbacks._callback[callbackId]({
          code: 0,
          message: 'Request aborted.'
        });
      }
    };
  }

  var get = ((Support.cors) ? xmlHttpGet : jsonp);
  get.CORS = xmlHttpGet;
  get.JSONP = jsonp;

  // choose the correct AJAX handler depending on CORS support
  var Request = {
    request: request,
    get: get,
    post: xmlHttpPost
  };

  exports.get = get;
  exports.post = xmlHttpPost;
  exports.request = request;

  var Task = L.Class.extend({

    options: {
      proxy: false,
      useCors: cors
    },

    // Generate a method for each methodName:paramName in the setters for this task.
    generateSetter: function (param, context) {
      return L.Util.bind(function (value) {
        this.params[param] = value;
        return this;
      }, context);
    },

    initialize: function (endpoint) {
      // endpoint can be either a url (and options) for an ArcGIS Rest Service or an instance of EsriLeaflet.Service
      if (endpoint.request && endpoint.options) {
        this._service = endpoint;
        L.Util.setOptions(this, endpoint.options);
      } else {
        L.Util.setOptions(this, endpoint);
        this.options.url = cleanUrl(endpoint.url);
      }

      // clone default params into this object
      this.params = L.Util.extend({}, this.params || {});

      // generate setter methods based on the setters object implimented a child class
      if (this.setters) {
        for (var setter in this.setters) {
          var param = this.setters[setter];
          this[setter] = this.generateSetter(param, this);
        }
      }
    },

    token: function (token) {
      if (this._service) {
        this._service.authenticate(token);
      } else {
        this.params.token = token;
      }
      return this;
    },

    request: function (callback, context) {
      if (this._service) {
        return this._service.request(this.path, this.params, callback, context);
      }

      return this._request('request', this.path, this.params, callback, context);
    },

    _request: function (method, path, params, callback, context) {
      var url = (this.options.proxy) ? this.options.proxy + '?' + this.options.url + path : this.options.url + path;

      if ((method === 'get' || method === 'request') && !this.options.useCors) {
        return Request.get.JSONP(url, params, callback, context);
      }

      return Request[method](url, params, callback, context);
    }
  });

  function task (options) {
    return new Task(options);
  }

  var Task_js = task;

  var Query = Task.extend({
    setters: {
      'offset': 'offset',
      'limit': 'limit',
      'fields': 'outFields',
      'precision': 'geometryPrecision',
      'featureIds': 'objectIds',
      'returnGeometry': 'returnGeometry',
      'token': 'token'
    },

    path: 'query',

    params: {
      returnGeometry: true,
      where: '1=1',
      outSr: 4326,
      outFields: '*'
    },

    within: function (geometry) {
      this._setGeometry(geometry);
      this.params.spatialRel = 'esriSpatialRelContains'; // will make code read layer within geometry, to the api this will reads geometry contains layer
      return this;
    },

    intersects: function (geometry) {
      this._setGeometry(geometry);
      this.params.spatialRel = 'esriSpatialRelIntersects';
      return this;
    },

    contains: function (geometry) {
      this._setGeometry(geometry);
      this.params.spatialRel = 'esriSpatialRelWithin'; // will make code read layer contains geometry, to the api this will reads geometry within layer
      return this;
    },

    crosses: function (geometry) {
      this._setGeometry(geometry);
      this.params.spatialRel = 'esriSpatialRelCrosses';
      return this;
    },

    touches: function (geometry) {
      this._setGeometry(geometry);
      this.params.spatialRel = 'esriSpatialRelTouches';
      return this;
    },

    overlaps: function (geometry) {
      this._setGeometry(geometry);
      this.params.spatialRel = 'esriSpatialRelOverlaps';
      return this;
    },

    // only valid for Feature Services running on ArcGIS Server 10.3 or ArcGIS Online
    nearby: function (latlng, radius) {
      latlng = L.latLng(latlng);
      this.params.geometry = [latlng.lng, latlng.lat];
      this.params.geometryType = 'esriGeometryPoint';
      this.params.spatialRel = 'esriSpatialRelIntersects';
      this.params.units = 'esriSRUnit_Meter';
      this.params.distance = radius;
      this.params.inSr = 4326;
      return this;
    },

    where: function (string) {
      // instead of converting double-quotes to single quotes, pass as is, and provide a more informative message if a 400 is encountered
      this.params.where = string;
      return this;
    },

    between: function (start, end) {
      this.params.time = [start.valueOf(), end.valueOf()];
      return this;
    },

    simplify: function (map, factor) {
      var mapWidth = Math.abs(map.getBounds().getWest() - map.getBounds().getEast());
      this.params.maxAllowableOffset = (mapWidth / map.getSize().y) * factor;
      return this;
    },

    orderBy: function (fieldName, order) {
      order = order || 'ASC';
      this.params.orderByFields = (this.params.orderByFields) ? this.params.orderByFields + ',' : '';
      this.params.orderByFields += ([fieldName, order]).join(' ');
      return this;
    },

    run: function (callback, context) {
      this._cleanParams();

      // if the service is hosted on arcgis online request geojson directly
      if (Util.isArcgisOnline(this.options.url)) {
        this.params.f = 'geojson';

        return this.request(function (error, response) {
          this._trapSQLerrors(error);
          callback.call(context, error, response, response);
        }, this);

      // otherwise convert it in the callback then pass it on
      } else {
        return this.request(function (error, response) {
          this._trapSQLerrors(error);
          callback.call(context, error, (response && Util.responseToFeatureCollection(response)), response);
        }, this);
      }
    },

    count: function (callback, context) {
      this._cleanParams();
      this.params.returnCountOnly = true;
      return this.request(function (error, response) {
        callback.call(this, error, (response && response.count), response);
      }, context);
    },

    ids: function (callback, context) {
      this._cleanParams();
      this.params.returnIdsOnly = true;
      return this.request(function (error, response) {
        callback.call(this, error, (response && response.objectIds), response);
      }, context);
    },

    // only valid for Feature Services running on ArcGIS Server 10.3 or ArcGIS Online
    bounds: function (callback, context) {
      this._cleanParams();
      this.params.returnExtentOnly = true;
      return this.request(function (error, response) {
        callback.call(context, error, (response && response.extent && Util.extentToBounds(response.extent)), response);
      }, context);
    },

    // only valid for image services
    pixelSize: function (point) {
      point = L.point(point);
      this.params.pixelSize = [point.x, point.y];
      return this;
    },

    // only valid for map services
    layer: function (layer) {
      this.path = layer + '/query';
      return this;
    },

    _trapSQLerrors: function (error) {
      if (error) {
        if (error.code === '400') {
          Util.warn('one common syntax error in query requests is encasing string values in double quotes instead of single quotes');
        }
      }
    },

    _cleanParams: function () {
      delete this.params.returnIdsOnly;
      delete this.params.returnExtentOnly;
      delete this.params.returnCountOnly;
    },

    _setGeometry: function (geometry) {
      this.params.inSr = 4326;

      // convert bounds to extent and finish
      if (geometry instanceof L.LatLngBounds) {
        // set geometry + geometryType
        this.params.geometry = Util.boundsToExtent(geometry);
        this.params.geometryType = 'esriGeometryEnvelope';
        return;
      }

      // convert L.Marker > L.LatLng
      if (geometry.getLatLng) {
        geometry = geometry.getLatLng();
      }

      // convert L.LatLng to a geojson point and continue;
      if (geometry instanceof L.LatLng) {
        geometry = {
          type: 'Point',
          coordinates: [geometry.lng, geometry.lat]
        };
      }

      // handle L.GeoJSON, pull out the first geometry
      if (geometry instanceof L.GeoJSON) {
        // reassign geometry to the GeoJSON value  (we are assuming that only one feature is present)
        geometry = geometry.getLayers()[0].feature.geometry;
        this.params.geometry = Util.geojsonToArcGIS(geometry);
        this.params.geometryType = Util.geojsonTypeToArcGIS(geometry.type);
      }

      // Handle L.Polyline and L.Polygon
      if (geometry.toGeoJSON) {
        geometry = geometry.toGeoJSON();
      }

      // handle GeoJSON feature by pulling out the geometry
      if (geometry.type === 'Feature') {
        // get the geometry of the geojson feature
        geometry = geometry.geometry;
      }

      // confirm that our GeoJSON is a point, line or polygon
      if (geometry.type === 'Point' || geometry.type === 'LineString' || geometry.type === 'Polygon') {
        this.params.geometry = Util.geojsonToArcGIS(geometry);
        this.params.geometryType = Util.geojsonTypeToArcGIS(geometry.type);
        return;
      }

      // warn the user if we havn't found a
      /* global console */
      Util.warn('invalid geometry passed to spatial query. Should be an L.LatLng, L.LatLngBounds or L.Marker or a GeoJSON Point Line or Polygon object');

      return;
    }
  });

  function query (options) {
    return new Query(options);
  }

  var Query_js = query;

  var Find = Task.extend({
    setters: {
      // method name > param name
      'contains': 'contains',
      'text': 'searchText',
      'fields': 'searchFields', // denote an array or single string
      'spatialReference': 'sr',
      'sr': 'sr',
      'layers': 'layers',
      'returnGeometry': 'returnGeometry',
      'maxAllowableOffset': 'maxAllowableOffset',
      'precision': 'geometryPrecision',
      'dynamicLayers': 'dynamicLayers',
      'returnZ': 'returnZ',
      'returnM': 'returnM',
      'gdbVersion': 'gdbVersion',
      'token': 'token'
    },

    path: 'find',

    params: {
      sr: 4326,
      contains: true,
      returnGeometry: true,
      returnZ: true,
      returnM: false
    },

    layerDefs: function (id, where) {
      this.params.layerDefs = (this.params.layerDefs) ? this.params.layerDefs + ';' : '';
      this.params.layerDefs += ([id, where]).join(':');
      return this;
    },

    simplify: function (map, factor) {
      var mapWidth = Math.abs(map.getBounds().getWest() - map.getBounds().getEast());
      this.params.maxAllowableOffset = (mapWidth / map.getSize().y) * factor;
      return this;
    },

    run: function (callback, context) {
      return this.request(function (error, response) {
        callback.call(context, error, (response && Util.responseToFeatureCollection(response)), response);
      }, context);
    }
  });

  function find (options) {
    return new Find(options);
  }

  var Identify = Task.extend({
    path: 'identify',

    between: function (start, end) {
      this.params.time = [start.valueOf(), end.valueOf()];
      return this;
    }
  });

  function identify (options) {
    return new Identify(options);
  }

  var Identify_js = identify;

  var IdentifyFeatures = Identify.extend({
    setters: {
      'layers': 'layers',
      'precision': 'geometryPrecision',
      'tolerance': 'tolerance',
      'returnGeometry': 'returnGeometry'
    },

    params: {
      sr: 4326,
      layers: 'all',
      tolerance: 3,
      returnGeometry: true
    },

    on: function (map) {
      var extent = Util.boundsToExtent(map.getBounds());
      var size = map.getSize();
      this.params.imageDisplay = [size.x, size.y, 96];
      this.params.mapExtent = [extent.xmin, extent.ymin, extent.xmax, extent.ymax];
      return this;
    },

    at: function (latlng) {
      latlng = L.latLng(latlng);
      this.params.geometry = [latlng.lng, latlng.lat];
      this.params.geometryType = 'esriGeometryPoint';
      return this;
    },

    layerDef: function (id, where) {
      this.params.layerDefs = (this.params.layerDefs) ? this.params.layerDefs + ';' : '';
      this.params.layerDefs += ([id, where]).join(':');
      return this;
    },

    simplify: function (map, factor) {
      var mapWidth = Math.abs(map.getBounds().getWest() - map.getBounds().getEast());
      this.params.maxAllowableOffset = (mapWidth / map.getSize().y) * (1 - factor);
      return this;
    },

    run: function (callback, context) {
      return this.request(function (error, response) {
        // immediately invoke with an error
        if (error) {
          callback.call(context, error, undefined, response);
          return;

        // ok no error lets just assume we have features...
        } else {
          var featureCollection = Util.responseToFeatureCollection(response);
          response.results = response.results.reverse();
          for (var i = 0; i < featureCollection.features.length; i++) {
            var feature = featureCollection.features[i];
            feature.layerId = response.results[i].layerId;
          }
          callback.call(context, undefined, featureCollection, response);
        }
      });
    }
  });

  function identifyFeatures (options) {
    return new IdentifyFeatures(options);
  }

  var IdentifyImage = Identify.extend({
    setters: {
      'setMosaicRule': 'mosaicRule',
      'setRenderingRule': 'renderingRule',
      'setPixelSize': 'pixelSize',
      'returnCatalogItems': 'returnCatalogItems',
      'returnGeometry': 'returnGeometry'
    },

    params: {
      returnGeometry: false
    },

    at: function (latlng) {
      latlng = L.latLng(latlng);
      this.params.geometry = JSON.stringify({
        x: latlng.lng,
        y: latlng.lat,
        spatialReference: {
          wkid: 4326
        }
      });
      this.params.geometryType = 'esriGeometryPoint';
      return this;
    },

    getMosaicRule: function () {
      return this.params.mosaicRule;
    },

    getRenderingRule: function () {
      return this.params.renderingRule;
    },

    getPixelSize: function () {
      return this.params.pixelSize;
    },

    run: function (callback, context) {
      return this.request(function (error, response) {
        callback.call(context, error, (response && this._responseToGeoJSON(response)), response);
      }, this);
    },

    // get pixel data and return as geoJSON point
    // populate catalog items (if any)
    // merging in any catalogItemVisibilities as a propery of each feature
    _responseToGeoJSON: function (response) {
      var location = response.location;
      var catalogItems = response.catalogItems;
      var catalogItemVisibilities = response.catalogItemVisibilities;
      var geoJSON = {
        'pixel': {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [location.x, location.y]
          },
          'crs': {
            'type': 'EPSG',
            'properties': {
              'code': location.spatialReference.wkid
            }
          },
          'properties': {
            'OBJECTID': response.objectId,
            'name': response.name,
            'value': response.value
          },
          'id': response.objectId
        }
      };

      if (response.properties && response.properties.Values) {
        geoJSON.pixel.properties.values = response.properties.Values;
      }

      if (catalogItems && catalogItems.features) {
        geoJSON.catalogItems = Util.responseToFeatureCollection(catalogItems);
        if (catalogItemVisibilities && catalogItemVisibilities.length === geoJSON.catalogItems.features.length) {
          for (var i = catalogItemVisibilities.length - 1; i >= 0; i--) {
            geoJSON.catalogItems.features[i].properties.catalogItemVisibility = catalogItemVisibilities[i];
          }
        }
      }
      return geoJSON;
    }

  });

  function identifyImage (params) {
    return new IdentifyImage(params);
  }

  var Service = L.Evented.extend({

    options: {
      proxy: false,
      useCors: cors
    },

    initialize: function (options) {
      options = options || {};
      this._requestQueue = [];
      this._authenticating = false;
      L.Util.setOptions(this, options);
      this.options.url = cleanUrl(this.options.url);
    },

    get: function (path, params, callback, context) {
      return this._request('get', path, params, callback, context);
    },

    post: function (path, params, callback, context) {
      return this._request('post', path, params, callback, context);
    },

    request: function (path, params, callback, context) {
      return this._request('request', path, params, callback, context);
    },

    metadata: function (callback, context) {
      return this._request('get', '', {}, callback, context);
    },

    authenticate: function (token) {
      this._authenticating = false;
      this.options.token = token;
      this._runQueue();
      return this;
    },

    _request: function (method, path, params, callback, context) {
      this.fire('requeststart', {
        url: this.options.url + path,
        params: params,
        method: method
      }, true);

      var wrappedCallback = this._createServiceCallback(method, path, params, callback, context);

      if (this.options.token) {
        params.token = this.options.token;
      }

      if (this._authenticating) {
        this._requestQueue.push([method, path, params, callback, context]);
        return;
      } else {
        var url = (this.options.proxy) ? this.options.proxy + '?' + this.options.url + path : this.options.url + path;

        if ((method === 'get' || method === 'request') && !this.options.useCors) {
          return Request.get.JSONP(url, params, wrappedCallback);
        } else {
          return Request[method](url, params, wrappedCallback);
        }
      }
    },

    _createServiceCallback: function (method, path, params, callback, context) {
      return L.Util.bind(function (error, response) {
        if (error && (error.code === 499 || error.code === 498)) {
          this._authenticating = true;

          this._requestQueue.push([method, path, params, callback, context]);

          // fire an event for users to handle and re-authenticate
          this.fire('authenticationrequired', {
            authenticate: L.Util.bind(this.authenticate, this)
          }, true);

          // if the user has access to a callback they can handle the auth error
          error.authenticate = L.Util.bind(this.authenticate, this);
        }

        callback.call(context, error, response);

        if (error) {
          this.fire('requesterror', {
            url: this.options.url + path,
            params: params,
            message: error.message,
            code: error.code,
            method: method
          }, true);
        } else {
          this.fire('requestsuccess', {
            url: this.options.url + path,
            params: params,
            response: response,
            method: method
          }, true);
        }

        this.fire('requestend', {
          url: this.options.url + path,
          params: params,
          method: method
        }, true);
      }, this);
    },

    _runQueue: function () {
      for (var i = this._requestQueue.length - 1; i >= 0; i--) {
        var request = this._requestQueue[i];
        var method = request.shift();
        this[method].apply(this, request);
      }
      this._requestQueue = [];
    }
  });

  function service (options) {
    return new Service(options);
  }

  var Service_js = service;

  var MapService = Service.extend({

    identify: function () {
      return identifyFeatures(this);
    },

    find: function () {
      return find(this);
    },

    query: function () {
      return Query_js(this);
    }

  });

  function mapService (options) {
    return new MapService(options);
  }

  var ImageService = Service.extend({

    query: function () {
      return Query_js(this);
    },

    identify: function () {
      return identifyImage(this);
    }
  });

  function imageService (options) {
    return new ImageService(options);
  }

  var FeatureLayerService = Service.extend({

    options: {
      idAttribute: 'OBJECTID'
    },

    query: function () {
      return Query_js(this);
    },

    addFeature: function (feature, callback, context) {
      delete feature.id;

      feature = geojsonToArcGIS(feature);

      return this.post('addFeatures', {
        features: [feature]
      }, function (error, response) {
        var result = (response && response.addResults) ? response.addResults[0] : undefined;
        if (callback) {
          callback.call(context, error || response.addResults[0].error, result);
        }
      }, context);
    },

    updateFeature: function (feature, callback, context) {
      feature = geojsonToArcGIS(feature, this.options.idAttribute);

      return this.post('updateFeatures', {
        features: [feature]
      }, function (error, response) {
        var result = (response && response.updateResults) ? response.updateResults[0] : undefined;
        if (callback) {
          callback.call(context, error || response.updateResults[0].error, result);
        }
      }, context);
    },

    deleteFeature: function (id, callback, context) {
      return this.post('deleteFeatures', {
        objectIds: id
      }, function (error, response) {
        var result = (response && response.deleteResults) ? response.deleteResults[0] : undefined;
        if (callback) {
          callback.call(context, error || response.deleteResults[0].error, result);
        }
      }, context);
    },

    deleteFeatures: function (ids, callback, context) {
      return this.post('deleteFeatures', {
        objectIds: ids
      }, function (error, response) {
        // pass back the entire array
        var result = (response && response.deleteResults) ? response.deleteResults : undefined;
        if (callback) {
          callback.call(context, error || response.deleteResults[0].error, result);
        }
      }, context);
    }
  });

  function featureLayerService (options) {
    return new FeatureLayerService(options);
  }

  var Logo = L.Control.extend({
    options: {
      position: 'bottomright',
      marginTop: 0,
      marginLeft: 0,
      marginBottom: 0,
      marginRight: 0
    },

    onAdd: function () {
      var div = L.DomUtil.create('div', 'esri-leaflet-logo');
      div.style.marginTop = this.options.marginTop;
      div.style.marginLeft = this.options.marginLeft;
      div.style.marginBottom = this.options.marginBottom;
      div.style.marginRight = this.options.marginRight;
      div.innerHTML = this._adjustLogo(this._map._size);

      this._map.on('resize', function (e) {
        div.innerHTML = this._adjustLogo(e.newSize);
      }, this);

      return div;
    },

    _adjustLogo: function (mapSize) {
      if (mapSize.x <= 600 || mapSize.y <= 600) {
        return '<a href="https://developers.arcgis.com" style="border: none;"><img src="https://js.arcgis.com/3.13/esri/images/map/logo-sm.png" alt="Powered by Esri" style="border: none;"></a>';
      } else {
        return '<a href="https://developers.arcgis.com" style="border: none;"><img src="https://js.arcgis.com/3.13/esri/images/map/logo-med.png" alt="Powered by Esri" style="border: none;"></a>';
      }
    }
  });

  function logo (options) {
    return new Logo(options);
  }

  var tileProtocol = (window.location.protocol !== 'https:') ? 'http:' : 'https:';

  var BasemapLayer = L.TileLayer.extend({
    statics: {
      TILES: {
        Streets: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          attributionUrl: 'https://static.arcgis.com/attribution/World_Street_Map',
          options: {
            hideLogo: false,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services'],
            attribution: 'Esri'
          }
        },
        Topographic: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          attributionUrl: 'https://static.arcgis.com/attribution/World_Topo_Map',
          options: {
            hideLogo: false,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services'],
            attribution: 'Esri'
          }
        },
        Oceans: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
          attributionUrl: 'https://static.arcgis.com/attribution/Ocean_Basemap',
          options: {
            hideLogo: false,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            attribution: 'Esri'
          }
        },
        OceansLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
          options: {
            hideLogo: true,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            pane: (pointerEvents) ? 'esri-labels' : 'tilePane'
          }
        },
        NationalGeographic: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
          options: {
            hideLogo: false,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            attribution: 'Esri'
          }
        },
        DarkGray: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          options: {
            hideLogo: false,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            attribution: 'Esri, DeLorme, HERE'
          }
        },
        DarkGrayLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
          options: {
            hideLogo: true,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            pane: (pointerEvents) ? 'esri-labels' : 'tilePane'
          }
        },
        Gray: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          options: {
            hideLogo: false,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            attribution: 'Esri, NAVTEQ, DeLorme'
          }
        },
        GrayLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
          options: {
            hideLogo: true,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            pane: (pointerEvents) ? 'esri-labels' : 'tilePane'
          }
        },
        Imagery: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          options: {
            hideLogo: false,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services'],
            attribution: 'Esri, DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community'
          }
        },
        ImageryLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
          options: {
            hideLogo: true,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services'],
            pane: (pointerEvents) ? 'esri-labels' : 'tilePane'
          }
        },
        ImageryTransportation: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
          options: {
            hideLogo: true,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services'],
            pane: (pointerEvents) ? 'esri-labels' : 'tilePane'
          }
        },
        ShadedRelief: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
          options: {
            hideLogo: false,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 13,
            subdomains: ['server', 'services'],
            attribution: 'Esri, NAVTEQ, DeLorme'
          }
        },
        ShadedReliefLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}',
          options: {
            hideLogo: true,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 12,
            subdomains: ['server', 'services'],
            pane: (pointerEvents) ? 'esri-labels' : 'tilePane'
          }
        },
        Terrain: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
          options: {
            hideLogo: false,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 13,
            subdomains: ['server', 'services'],
            attribution: 'Esri, USGS, NOAA'
          }
        },
        TerrainLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}',
          options: {
            hideLogo: true,
            logoPosition: 'bottomright',
            minZoom: 1,
            maxZoom: 13,
            subdomains: ['server', 'services'],
            pane: (pointerEvents) ? 'esri-labels' : 'tilePane'
          }
        }
      }
    },
    initialize: function (key, options) {
      var config;

      // set the config variable with the appropriate config object
      if (typeof key === 'object' && key.urlTemplate && key.options) {
        config = key;
      } else if (typeof key === 'string' && BasemapLayer.TILES[key]) {
        config = BasemapLayer.TILES[key];
      } else {
        throw new Error('L.esri.BasemapLayer: Invalid parameter. Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ShadedRelief", "ShadedReliefLabels", "Terrain" or "TerrainLabels"');
      }

      // merge passed options into the config options
      var tileOptions = L.Util.extend(config.options, options);

      // call the initialize method on L.TileLayer to set everything up
      L.TileLayer.prototype.initialize.call(this, config.urlTemplate, L.Util.setOptions(this, tileOptions));

      // if this basemap requires dynamic attribution set it up
      if (config.attributionUrl) {
        this._getAttributionData(config.attributionUrl);
      }

      this._logo = logo({
        position: this.options.logoPosition
      });
    },
    onAdd: function (map) {
      if (!this.options.hideLogo && !map._hasEsriLogo) {
        this._logo.addTo(map);
        map._hasEsriLogo = true;
      }

      if (this.options.pane === 'esri-labels') {
        this._initPane();
      }

      L.TileLayer.prototype.onAdd.call(this, map);

      map.on('moveend', this._updateMapAttribution, this);
    },
    onRemove: function (map) {
      // check to make sure the logo hasn't already been removed
      if (this._logo && this._logo._container) {
        map.removeControl(this._logo);
        map._hasEsriLogo = false;
      }

      L.TileLayer.prototype.onRemove.call(this, map);

      map.off('moveend', this._updateMapAttribution, this);
    },
    getAttribution: function () {
      var attribution = '<span class="esri-attributions" style="line-height:14px; vertical-align: -3px; text-overflow:ellipsis; white-space:nowrap; overflow:hidden; display:inline-block;">' + this.options.attribution + '</span>';
      return attribution;
    },
    _initPane: function () {
      if (!this._map.getPane(this.options.pane)) {
        var pane = this._map.createPane(this.options.pane);
        pane.style.pointerEvents = 'none';
        pane.style.zIndex = 500;
      }
    },
    _getAttributionData: function (url) {
      jsonp(url, {}, L.Util.bind(function (error, attributions) {
        if (error) { return; }
        this._attributions = [];

        for (var c = 0; c < attributions.contributors.length; c++) {
          var contributor = attributions.contributors[c];
          for (var i = 0; i < contributor.coverageAreas.length; i++) {
            var coverageArea = contributor.coverageAreas[i];
            var southWest = new L.LatLng(coverageArea.bbox[0], coverageArea.bbox[1]);
            var northEast = new L.LatLng(coverageArea.bbox[2], coverageArea.bbox[3]);
            this._attributions.push({
              attribution: contributor.attribution,
              score: coverageArea.score,
              bounds: new L.LatLngBounds(southWest, northEast),
              minZoom: coverageArea.zoomMin,
              maxZoom: coverageArea.zoomMax
            });
          }
        }

        this._attributions.sort(function (a, b) {
          return b.score - a.score;
        });

        this._updateMapAttribution();
      }, this));
    },
    _updateMapAttribution: function () {
      if (this._map && this._map.attributionControl && this._attributions) {
        var newAttributions = '';
        var bounds = this._map.getBounds();
        var zoom = this._map.getZoom();

        for (var i = 0; i < this._attributions.length; i++) {
          var attribution = this._attributions[i];
          var text = attribution.attribution;
          if (!newAttributions.match(text) && bounds.intersects(attribution.bounds) && zoom >= attribution.minZoom && zoom <= attribution.maxZoom) {
            newAttributions += (', ' + text);
          }
        }
        newAttributions = newAttributions.substr(2);
        var attributionElement = this._map.attributionControl._container.querySelector('.esri-attributions');

        attributionElement.innerHTML = newAttributions;
        attributionElement.style.maxWidth = (this._map.getSize().x * 0.65) + 'px';

        this.fire('attributionupdated', {
          attribution: newAttributions
        });
      }
    }
  });

  function basemapLayer (key, options) {
    return new BasemapLayer(key, options);
  }

  var BasemapLayer_js = basemapLayer;

  exports.BasemapLayer = BasemapLayer;
  exports.basemapLayer = basemapLayer;

  var TiledMapLayer = L.TileLayer.extend({
    options: {
      zoomOffsetAllowance: 0.1,
      correctZoomLevels: true
    },

    statics: {
      MercatorZoomLevels: {
        '0': 156543.03392799999,
        '1': 78271.516963999893,
        '2': 39135.758482000099,
        '3': 19567.879240999901,
        '4': 9783.9396204999593,
        '5': 4891.9698102499797,
        '6': 2445.9849051249898,
        '7': 1222.9924525624899,
        '8': 611.49622628138002,
        '9': 305.74811314055802,
        '10': 152.874056570411,
        '11': 76.437028285073197,
        '12': 38.218514142536598,
        '13': 19.109257071268299,
        '14': 9.5546285356341496,
        '15': 4.7773142679493699,
        '16': 2.38865713397468,
        '17': 1.1943285668550501,
        '18': 0.59716428355981699,
        '19': 0.29858214164761698,
        '20': 0.14929107082381,
        '21': 0.07464553541191,
        '22': 0.0373227677059525,
        '23': 0.0186613838529763
      }
    },

    initialize: function (options) {
      options.url = cleanUrl(options.url);
      options = L.Util.setOptions(this, options);

      // set the urls
      this.tileUrl = options.url + 'tile/{z}/{y}/{x}';
      this.service = mapService(options);
      this.service.addEventParent(this);

      // if this is looking at the AGO tiles subdomain insert the subdomain placeholder
      if (this.tileUrl.match('://tiles.arcgisonline.com')) {
        this.tileUrl = this.tileUrl.replace('://tiles.arcgisonline.com', '://tiles{s}.arcgisonline.com');
        options.subdomains = ['1', '2', '3', '4'];
      }

      if (this.options.token) {
        this.tileUrl += ('?token=' + this.options.token);
      }

      // init layer by calling TileLayers initialize method
      L.TileLayer.prototype.initialize.call(this, this.tileUrl, options);
    },

    getTileUrl: function (tilePoint) {
      return L.Util.template(this.tileUrl, L.extend({
        s: this._getSubdomain(tilePoint),
        z: this._lodMap[tilePoint.z] || tilePoint.z, // try lod map first, then just defualt to zoom level
        x: tilePoint.x,
        y: tilePoint.y
      }, this.options));
    },

    onAdd: function (map) {
      if (!this._lodMap && this.options.correctZoomLevels) {
        this._lodMap = {}; // make sure we always have an lod map even if its empty
        this.metadata(function (error, metadata) {
          if (!error) {
            var sr = metadata.spatialReference.latestWkid || metadata.spatialReference.wkid;

            if (sr === 102100 || sr === 3857) {
              // create the zoom level data
              var arcgisLODs = metadata.tileInfo.lods;
              var correctResolutions = TiledMapLayer.MercatorZoomLevels;

              for (var i = 0; i < arcgisLODs.length; i++) {
                var arcgisLOD = arcgisLODs[i];
                for (var ci in correctResolutions) {
                  var correctRes = correctResolutions[ci];

                  if (this._withinPercentage(arcgisLOD.resolution, correctRes, this.options.zoomOffsetAllowance)) {
                    this._lodMap[ci] = arcgisLOD.level;
                    break;
                  }
                }
              }
            } else {
              warn('L.esri.TiledMapLayer is using a non-mercator spatial reference. Support may be available through Proj4Leaflet http://esri.github.io/esri-leaflet/examples/non-mercator-projection.html');
            }
          }

          L.TileLayer.prototype.onAdd.call(this, map);
        }, this);
      } else {
        L.TileLayer.prototype.onAdd.call(this, map);
      }
    },

    metadata: function (callback, context) {
      this.service.metadata(callback, context);
      return this;
    },

    identify: function () {
      return this.service.identify();
    },

    find: function () {
      return this.service.find();
    },

    query: function () {
      return this.service.query();
    },

    authenticate: function (token) {
      var tokenQs = '?token=' + token;
      this.tileUrl = (this.options.token) ? this.tileUrl.replace(/\?token=(.+)/g, tokenQs) : this.tileUrl + tokenQs;
      this.options.token = token;
      this.service.authenticate(token);
      return this;
    },

    _withinPercentage: function (a, b, percentage) {
      var diff = Math.abs((a / b) - 1);
      return diff < percentage;
    }
  });

  function tiledMapLayer (url, options) {
    return new TiledMapLayer(url, options);
  }

  var TiledMapLayer_js = tiledMapLayer;

  exports.TiledMapLayer = TiledMapLayer;
  exports.tiledMapLayer = tiledMapLayer;

  var RasterLayer = L.Layer.extend({

    options: {
      opacity: 1,
      position: 'front',
      f: 'image',
      useCors: cors,
      attribution: null,
      interactive: false,
      alt: ''
    },

    onAdd: function (map) {
      this._update = L.Util.throttle(this._update, this.options.updateInterval, this);

      if (map.options.crs && map.options.crs.code) {
        var sr = map.options.crs.code.split(':')[1];
        this.options.bboxSR = sr;
        this.options.imageSR = sr;
      }

      map.on('moveend', this._update, this);

      // if we had an image loaded and it matches the
      // current bounds show the image otherwise remove it
      if (this._currentImage && this._currentImage._bounds.equals(this._map.getBounds())) {
        map.addLayer(this._currentImage);
      } else if (this._currentImage) {
        this._map.removeLayer(this._currentImage);
        this._currentImage = null;
      }

      this._update();

      if (this._popup) {
        this._map.on('click', this._getPopupData, this);
        this._map.on('dblclick', this._resetPopupState, this);
      }
    },

    onRemove: function (map) {
      if (this._currentImage) {
        this._map.removeLayer(this._currentImage);
      }

      if (this._popup) {
        this._map.off('click', this._getPopupData, this);
        this._map.off('dblclick', this._resetPopupState, this);
      }

      this._map.off('moveend', this._update, this);
    },

    getEvents: function () {
      return {
        moveend: this._update
      };
    },

    bindPopup: function (fn, popupOptions) {
      this._shouldRenderPopup = false;
      this._lastClick = false;
      this._popup = L.popup(popupOptions);
      this._popupFunction = fn;
      if (this._map) {
        this._map.on('click', this._getPopupData, this);
        this._map.on('dblclick', this._resetPopupState, this);
      }
      return this;
    },

    unbindPopup: function () {
      if (this._map) {
        this._map.closePopup(this._popup);
        this._map.off('click', this._getPopupData, this);
        this._map.off('dblclick', this._resetPopupState, this);
      }
      this._popup = false;
      return this;
    },

    bringToFront: function () {
      this.options.position = 'front';
      if (this._currentImage) {
        this._currentImage.bringToFront();
      }
      return this;
    },

    bringToBack: function () {
      this.options.position = 'back';
      if (this._currentImage) {
        this._currentImage.bringToBack();
      }
      return this;
    },

    getAttribution: function () {
      return this.options.attribution;
    },

    getOpacity: function () {
      return this.options.opacity;
    },

    setOpacity: function (opacity) {
      this.options.opacity = opacity;
      this._currentImage.setOpacity(opacity);
      return this;
    },

    getTimeRange: function () {
      return [this.options.from, this.options.to];
    },

    setTimeRange: function (from, to) {
      this.options.from = from;
      this.options.to = to;
      this._update();
      return this;
    },

    metadata: function (callback, context) {
      this.service.metadata(callback, context);
      return this;
    },

    authenticate: function (token) {
      this.service.authenticate(token);
      return this;
    },

    _renderImage: function (url, bounds) {
      if (this._map) {
        // create a new image overlay and add it to the map
        // to start loading the image
        // opacity is 0 while the image is loading
        var image = new L.ImageOverlay(url, bounds, {
          opacity: 0,
          crossOrigin: this.options.useCors,
          alt: this.options.alt,
          pane: this.options.pane || this.getPane(),
          interactive: this.options.interactive
        }).addTo(this._map);

        // once the image loads
        image.once('load', function (e) {
          if (this._map) {
            var newImage = e.target;
            var oldImage = this._currentImage;

            // if the bounds of this image matches the bounds that
            // _renderImage was called with and we have a map with the same bounds
            // hide the old image if there is one and set the opacity
            // of the new image otherwise remove the new image
            if (newImage._bounds.equals(bounds) && newImage._bounds.equals(this._map.getBounds())) {
              this._currentImage = newImage;

              if (this.options.position === 'front') {
                this.bringToFront();
              } else {
                this.bringToBack();
              }

              if (this._map && this._currentImage._map) {
                this._currentImage.setOpacity(this.options.opacity);
              } else {
                this._currentImage._map.removeLayer(this._currentImage);
              }

              if (oldImage && this._map) {
                this._map.removeLayer(oldImage);
              }

              if (oldImage && oldImage._map) {
                oldImage._map.removeLayer(oldImage);
              }
            } else {
              this._map.removeLayer(newImage);
            }
          }

          this.fire('load', {
            bounds: bounds
          });
        }, this);

        this.fire('loading', {
          bounds: bounds
        });
      }
    },

    _update: function () {
      if (!this._map) {
        return;
      }

      var zoom = this._map.getZoom();
      var bounds = this._map.getBounds();

      if (this._animatingZoom) {
        return;
      }

      if (this._map._panTransition && this._map._panTransition._inProgress) {
        return;
      }

      if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
        return;
      }
      var params = this._buildExportParams();

      this._requestExport(params, bounds);
    },

    _renderPopup: function (latlng, error, results, response) {
      latlng = L.latLng(latlng);
      if (this._shouldRenderPopup && this._lastClick.equals(latlng)) {
        // add the popup to the map where the mouse was clicked at
        var content = this._popupFunction(error, results, response);
        if (content) {
          this._popup.setLatLng(latlng).setContent(content).openOn(this._map);
        }
      }
    },

    _resetPopupState: function (e) {
      this._shouldRenderPopup = false;
      this._lastClick = e.latlng;
    }
  });

  exports.RasterLayer = RasterLayer;

  var ImageMapLayer = RasterLayer.extend({

    options: {
      updateInterval: 150,
      format: 'jpgpng',
      transparent: true,
      f: 'json'
    },

    query: function () {
      return this.service.query();
    },

    identify: function () {
      return this.service.identify();
    },

    initialize: function (options) {
      options.url = cleanUrl(options.url);
      this.service = imageService(options);
      this.service.addEventParent(this);

      L.Util.setOptions(this, options);
    },

    setPixelType: function (pixelType) {
      this.options.pixelType = pixelType;
      this._update();
      return this;
    },

    getPixelType: function () {
      return this.options.pixelType;
    },

    setBandIds: function (bandIds) {
      if (L.Util.isArray(bandIds)) {
        this.options.bandIds = bandIds.join(',');
      } else {
        this.options.bandIds = bandIds.toString();
      }
      this._update();
      return this;
    },

    getBandIds: function () {
      return this.options.bandIds;
    },

    setNoData: function (noData, noDataInterpretation) {
      if (L.Util.isArray(noData)) {
        this.options.noData = noData.join(',');
      } else {
        this.options.noData = noData.toString();
      }
      if (noDataInterpretation) {
        this.options.noDataInterpretation = noDataInterpretation;
      }
      this._update();
      return this;
    },

    getNoData: function () {
      return this.options.noData;
    },

    getNoDataInterpretation: function () {
      return this.options.noDataInterpretation;
    },

    setRenderingRule: function (renderingRule) {
      this.options.renderingRule = renderingRule;
      this._update();
    },

    getRenderingRule: function () {
      return this.options.renderingRule;
    },

    setMosaicRule: function (mosaicRule) {
      this.options.mosaicRule = mosaicRule;
      this._update();
    },

    getMosaicRule: function () {
      return this.options.mosaicRule;
    },

    _getPopupData: function (e) {
      var callback = L.Util.bind(function (error, results, response) {
        if (error) { return; } // we really can't do anything here but authenticate or requesterror will fire
        setTimeout(L.Util.bind(function () {
          this._renderPopup(e.latlng, error, results, response);
        }, this), 300);
      }, this);

      var identifyRequest = this.identify().at(e.latlng);

      // set mosaic rule for identify task if it is set for layer
      if (this.options.mosaicRule) {
        identifyRequest.setMosaicRule(this.options.mosaicRule);
        // @TODO: force return catalog items too?
      }

      // @TODO: set rendering rule? Not sure,
      // sometimes you want raw pixel values
      // if (this.options.renderingRule) {
      //   identifyRequest.setRenderingRule(this.options.renderingRule);
      // }

      identifyRequest.run(callback);

      // set the flags to show the popup
      this._shouldRenderPopup = true;
      this._lastClick = e.latlng;
    },

    _buildExportParams: function () {
      var bounds = this._map.getBounds();
      var size = this._map.getSize();
      var ne = this._map.options.crs.project(bounds._northEast);
      var sw = this._map.options.crs.project(bounds._southWest);

      var params = {
        bbox: [sw.x, sw.y, ne.x, ne.y].join(','),
        size: size.x + ',' + size.y,
        format: this.options.format,
        transparent: this.options.transparent,
        bboxSR: this.options.bboxSR,
        imageSR: this.options.imageSR
      };

      if (this.options.from && this.options.to) {
        params.time = this.options.from.valueOf() + ',' + this.options.to.valueOf();
      }

      if (this.options.pixelType) {
        params.pixelType = this.options.pixelType;
      }

      if (this.options.interpolation) {
        params.interpolation = this.options.interpolation;
      }

      if (this.options.compressionQuality) {
        params.compressionQuality = this.options.compressionQuality;
      }

      if (this.options.bandIds) {
        params.bandIds = this.options.bandIds;
      }

      if (this.options.noData) {
        params.noData = this.options.noData;
      }

      if (this.options.noDataInterpretation) {
        params.noDataInterpretation = this.options.noDataInterpretation;
      }

      if (this.service.options.token) {
        params.token = this.service.options.token;
      }

      if (this.options.renderingRule) {
        params.renderingRule = JSON.stringify(this.options.renderingRule);
      }

      if (this.options.mosaicRule) {
        params.mosaicRule = JSON.stringify(this.options.mosaicRule);
      }

      return params;
    },

    _requestExport: function (params, bounds) {
      if (this.options.f === 'json') {
        this.service.get('exportImage', params, function (error, response) {
          if (error) { return; } // we really can't do anything here but authenticate or requesterror will fire
          this._renderImage(response.href, bounds);
        }, this);
      } else {
        params.f = 'image';
        this._renderImage(this.options.url + 'exportImage' + L.Util.getParamString(params), bounds);
      }
    }
  });

  function imageMapLayer (url, options) {
    return new ImageMapLayer(url, options);
  }

  var ImageMapLayer_js = imageMapLayer;

  exports.ImageMapLayer = ImageMapLayer;
  exports.imageMapLayer = imageMapLayer;

  var DynamicMapLayer = RasterLayer.extend({

    options: {
      updateInterval: 150,
      layers: false,
      layerDefs: false,
      timeOptions: false,
      format: 'png24',
      transparent: true,
      f: 'json'
    },

    initialize: function (options) {
      options.url = cleanUrl(options.url);
      this.service = mapService(options);
      this.service.addEventParent(this);

      if ((options.proxy || options.token) && options.f !== 'json') {
        options.f = 'json';
      }
      L.Util.setOptions(this, options);
    },

    getDynamicLayers: function () {
      return this.options.dynamicLayers;
    },

    setDynamicLayers: function (dynamicLayers) {
      this.options.dynamicLayers = dynamicLayers;
      this._update();
      return this;
    },

    getLayers: function () {
      return this.options.layers;
    },

    setLayers: function (layers) {
      this.options.layers = layers;
      this._update();
      return this;
    },

    getLayerDefs: function () {
      return this.options.layerDefs;
    },

    setLayerDefs: function (layerDefs) {
      this.options.layerDefs = layerDefs;
      this._update();
      return this;
    },

    getTimeOptions: function () {
      return this.options.timeOptions;
    },

    setTimeOptions: function (timeOptions) {
      this.options.timeOptions = timeOptions;
      this._update();
      return this;
    },

    query: function () {
      return this.service.query();
    },

    identify: function () {
      return this.service.identify();
    },

    find: function () {
      return this.service.find();
    },

    _getPopupData: function (e) {
      var callback = L.Util.bind(function (error, featureCollection, response) {
        if (error) { return; } // we really can't do anything here but authenticate or requesterror will fire
        setTimeout(L.Util.bind(function () {
          this._renderPopup(e.latlng, error, featureCollection, response);
        }, this), 300);
      }, this);

      var identifyRequest = this.identify().on(this._map).at(e.latlng);

      if (this.options.layers) {
        identifyRequest.layers('visible:' + this.options.layers.join(','));
      } else {
        identifyRequest.layers('visible');
      }

      identifyRequest.run(callback);

      // set the flags to show the popup
      this._shouldRenderPopup = true;
      this._lastClick = e.latlng;
    },

    _buildExportParams: function () {
      var bounds = this._map.getBounds();
      var size = this._map.getSize();
      var ne = this._map.options.crs.project(bounds._northEast);
      var sw = this._map.options.crs.project(bounds._southWest);

      // ensure that we don't ask ArcGIS Server for a taller image than we have actual map displaying
      var top = this._map.latLngToLayerPoint(bounds._northEast);
      var bottom = this._map.latLngToLayerPoint(bounds._southWest);

      if (top.y > 0 || bottom.y < size.y) {
        size.y = bottom.y - top.y;
      }

      var params = {
        bbox: [sw.x, sw.y, ne.x, ne.y].join(','),
        size: size.x + ',' + size.y,
        dpi: 96,
        format: this.options.format,
        transparent: this.options.transparent,
        bboxSR: this.options.bboxSR,
        imageSR: this.options.imageSR
      };

      if (this.options.dynamicLayers) {
        params.dynamicLayers = this.options.dynamicLayers;
      }

      if (this.options.layers) {
        params.layers = 'show:' + this.options.layers.join(',');
      }

      if (this.options.layerDefs) {
        params.layerDefs = JSON.stringify(this.options.layerDefs);
      }

      if (this.options.timeOptions) {
        params.timeOptions = JSON.stringify(this.options.timeOptions);
      }

      if (this.options.from && this.options.to) {
        params.time = this.options.from.valueOf() + ',' + this.options.to.valueOf();
      }

      if (this.service.options.token) {
        params.token = this.service.options.token;
      }

      return params;
    },

    _requestExport: function (params, bounds) {
      if (this.options.f === 'json') {
        this.service.get('export', params, function (error, response) {
          if (error) { return; } // we really can't do anything here but authenticate or requesterror will fire
          this._renderImage(response.href, bounds);
        }, this);
      } else {
        params.f = 'image';
        this._renderImage(this.options.url + 'export' + L.Util.getParamString(params), bounds);
      }
    }
  });

  function dynamicMapLayer (url, options) {
    return new DynamicMapLayer(url, options);
  }

  var DynamicMapLayer_js = dynamicMapLayer;

  exports.DynamicMapLayer = DynamicMapLayer;
  exports.dynamicMapLayer = dynamicMapLayer;

  var FeatureGrid = L.Layer.extend({

    options: {
      cellSize: 512,
      updateInterval: 150
    },

    initialize: function (options) {
      options = L.setOptions(this, options);
    },

    onAdd: function (map) {
      this._map = map;
      this._update = L.Util.throttle(this._update, this.options.updateInterval, this);
      this._reset();
      this._update();
    },

    onRemove: function () {
      this._map.removeEventListener(this.getEvents(), this);
      this._removeCells();
    },

    getEvents: function () {
      var events = {
        moveend: this._update,
        zoomend: this._reset
      };

      return events;
    },

    addTo: function (map) {
      map.addLayer(this);
      return this;
    },

    removeFrom: function (map) {
      map.removeLayer(this);
      return this;
    },

    _reset: function () {
      this._removeCells();

      this._cells = {};
      this._activeCells = {};
      this._cellsToLoad = 0;
      this._cellsTotal = 0;
      this._cellNumBounds = this._getCellNumBounds();

      this._resetWrap();
    },

    _resetWrap: function () {
      var map = this._map;
      var crs = map.options.crs;

      if (crs.infinite) { return; }

      var cellSize = this._getCellSize();

      if (crs.wrapLng) {
        this._wrapLng = [
          Math.floor(map.project([0, crs.wrapLng[0]]).x / cellSize),
          Math.ceil(map.project([0, crs.wrapLng[1]]).x / cellSize)
        ];
      }

      if (crs.wrapLat) {
        this._wrapLat = [
          Math.floor(map.project([crs.wrapLat[0], 0]).y / cellSize),
          Math.ceil(map.project([crs.wrapLat[1], 0]).y / cellSize)
        ];
      }
    },

    _getCellSize: function () {
      return this.options.cellSize;
    },

    _update: function () {
      if (!this._map) { return; }

      var bounds = this._map.getPixelBounds();
      var zoom = this._map.getZoom();
      var cellSize = this._getCellSize();

      if (zoom > this.options.maxZoom ||
          zoom < this.options.minZoom) { return; }

      // cell coordinates range for the current view
      var cellBounds = L.bounds(
        bounds.min.divideBy(cellSize).floor(),
        bounds.max.divideBy(cellSize).floor());

      this._removeOtherCells(cellBounds);
      this._addCells(cellBounds);
    },

    _addCells: function (bounds) {
      var queue = [];
      var center = bounds.getCenter();
      var zoom = this._map.getZoom();

      var j, i, coords;
      // create a queue of coordinates to load cells from
      for (j = bounds.min.y; j <= bounds.max.y; j++) {
        for (i = bounds.min.x; i <= bounds.max.x; i++) {
          coords = new L.Point(i, j);
          coords.z = zoom;

          if (this._isValidCell(coords)) {
            queue.push(coords);
          }
        }
      }

      var cellsToLoad = queue.length;

      if (cellsToLoad === 0) { return; }

      this._cellsToLoad += cellsToLoad;
      this._cellsTotal += cellsToLoad;

      // sort cell queue to load cells in order of their distance to center
      queue.sort(function (a, b) {
        return a.distanceTo(center) - b.distanceTo(center);
      });

      for (i = 0; i < cellsToLoad; i++) {
        this._addCell(queue[i]);
      }
    },

    _isValidCell: function (coords) {
      var crs = this._map.options.crs;

      if (!crs.infinite) {
        // don't load cell if it's out of bounds and not wrapped
        var bounds = this._cellNumBounds;
        if (
          (!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x)) ||
          (!crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y))
        ) {
          return false;
        }
      }

      if (!this.options.bounds) {
        return true;
      }

      // don't load cell if it doesn't intersect the bounds in options
      var cellBounds = this._cellCoordsToBounds(coords);
      return L.latLngBounds(this.options.bounds).intersects(cellBounds);
    },

    // converts cell coordinates to its geographical bounds
    _cellCoordsToBounds: function (coords) {
      var map = this._map;
      var cellSize = this.options.cellSize;
      var nwPoint = coords.multiplyBy(cellSize);
      var sePoint = nwPoint.add([cellSize, cellSize]);
      var nw = map.wrapLatLng(map.unproject(nwPoint, coords.z));
      var se = map.wrapLatLng(map.unproject(sePoint, coords.z));

      return new L.LatLngBounds(nw, se);
    },

    // converts cell coordinates to key for the cell cache
    _cellCoordsToKey: function (coords) {
      return coords.x + ':' + coords.y;
    },

    // converts cell cache key to coordiantes
    _keyToCellCoords: function (key) {
      var kArr = key.split(':');
      var x = parseInt(kArr[0], 10);
      var y = parseInt(kArr[1], 10);

      return new L.Point(x, y);
    },

    // remove any present cells that are off the specified bounds
    _removeOtherCells: function (bounds) {
      for (var key in this._cells) {
        if (!bounds.contains(this._keyToCellCoords(key))) {
          this._removeCell(key);
        }
      }
    },

    _removeCell: function (key) {
      var cell = this._activeCells[key];

      if (cell) {
        delete this._activeCells[key];

        if (this.cellLeave) {
          this.cellLeave(cell.bounds, cell.coords);
        }

        this.fire('cellleave', {
          bounds: cell.bounds,
          coords: cell.coords
        });
      }
    },

    _removeCells: function () {
      for (var key in this._cells) {
        var bounds = this._cells[key].bounds;
        var coords = this._cells[key].coords;

        if (this.cellLeave) {
          this.cellLeave(bounds, coords);
        }

        this.fire('cellleave', {
          bounds: bounds,
          coords: coords
        });
      }
    },

    _addCell: function (coords) {
      // wrap cell coords if necessary (depending on CRS)
      this._wrapCoords(coords);

      // generate the cell key
      var key = this._cellCoordsToKey(coords);

      // get the cell from the cache
      var cell = this._cells[key];
      // if this cell should be shown as isnt active yet (enter)

      if (cell && !this._activeCells[key]) {
        if (this.cellEnter) {
          this.cellEnter(cell.bounds, coords);
        }

        this.fire('cellenter', {
          bounds: cell.bounds,
          coords: coords
        });

        this._activeCells[key] = cell;
      }

      // if we dont have this cell in the cache yet (create)
      if (!cell) {
        cell = {
          coords: coords,
          bounds: this._cellCoordsToBounds(coords)
        };

        this._cells[key] = cell;
        this._activeCells[key] = cell;

        if (this.createCell) {
          this.createCell(cell.bounds, coords);
        }

        this.fire('cellcreate', {
          bounds: cell.bounds,
          coords: coords
        });
      }
    },

    _wrapCoords: function (coords) {
      coords.x = this._wrapLng ? L.Util.wrapNum(coords.x, this._wrapLng) : coords.x;
      coords.y = this._wrapLat ? L.Util.wrapNum(coords.y, this._wrapLat) : coords.y;
    },

    // get the global cell coordinates range for the current zoom
    _getCellNumBounds: function () {
      var bounds = this._map.getPixelWorldBounds();
      var size = this._getCellSize();

      return bounds ? L.bounds(
          bounds.min.divideBy(size).floor(),
          bounds.max.divideBy(size).ceil().subtract([1, 1])) : null;
    }
  });

  exports.FeatureGrid = FeatureGrid;

  var FeatureManager = FeatureGrid.extend({
    /**
     * Options
     */

    options: {
      attribution: null,
      where: '1=1',
      fields: ['*'],
      from: false,
      to: false,
      timeField: false,
      timeFilterMode: 'server',
      simplifyFactor: 0,
      precision: 6
    },

    /**
     * Constructor
     */

    initialize: function (options) {
      FeatureGrid.prototype.initialize.call(this, options);

      options.url = cleanUrl(options.url);
      options = L.setOptions(this, options);

      this.service = featureLayerService(options);
      this.service.addEventParent(this);

      // use case insensitive regex to look for common fieldnames used for indexing
      if (this.options.fields[0] !== '*') {
        var oidCheck = false;
        for (var i = 0; i < this.options.fields.length; i++) {
          if (this.options.fields[i].match(/^(OBJECTID|FID|OID|ID)$/i)) {
            oidCheck = true;
          }
        }
        if (oidCheck === false) {
          warn('no known esriFieldTypeOID field detected in fields Array.  Please add an attribute field containing unique IDs to ensure the layer can be drawn correctly.');
        }
      }

      if (this.options.timeField.start && this.options.timeField.end) {
        this._startTimeIndex = new BinarySearchIndex();
        this._endTimeIndex = new BinarySearchIndex();
      } else if (this.options.timeField) {
        this._timeIndex = new BinarySearchIndex();
      }

      this._cache = {};
      this._currentSnapshot = []; // cache of what layers should be active
      this._activeRequests = 0;
    },

    /**
     * Layer Interface
     */

    onAdd: function (map) {
      return FeatureGrid.prototype.onAdd.call(this, map);
    },

    onRemove: function (map) {
      return FeatureGrid.prototype.onRemove.call(this, map);
    },

    getAttribution: function () {
      return this.options.attribution;
    },

    /**
     * Feature Managment
     */

    createCell: function (bounds, coords) {
      this._requestFeatures(bounds, coords);
    },

    _requestFeatures: function (bounds, coords, callback) {
      this._activeRequests++;

      // our first active request fires loading
      if (this._activeRequests === 1) {
        this.fire('loading', {
          bounds: bounds
        }, true);
      }

      return this._buildQuery(bounds).run(function (error, featureCollection, response) {
        if (response && response.exceededTransferLimit) {
          this.fire('drawlimitexceeded');
        }

        // no error, features
        if (!error && featureCollection && featureCollection.features.length) {
          // schedule adding features until the next animation frame
          L.Util.requestAnimFrame(L.Util.bind(function () {
            this._addFeatures(featureCollection.features, coords);
            this._postProcessFeatures(bounds);
          }, this));
        }

        // no error, no features
        if (!error && featureCollection && !featureCollection.features.length) {
          this._postProcessFeatures(bounds);
        }

        if (callback) {
          callback.call(this, error, featureCollection);
        }
      }, this);
    },

    _postProcessFeatures: function (bounds) {
      // deincriment the request counter now that we have processed features
      this._activeRequests--;

      // if there are no more active requests fire a load event for this view
      if (this._activeRequests <= 0) {
        this.fire('load', {
          bounds: bounds
        });
      }
    },

    _cacheKey: function (coords) {
      return coords.z + ':' + coords.x + ':' + coords.y;
    },

    _addFeatures: function (features, coords) {
      var key = this._cacheKey(coords);
      this._cache[key] = this._cache[key] || [];

      for (var i = features.length - 1; i >= 0; i--) {
        var id = features[i].id;
        this._currentSnapshot.push(id);
        this._cache[key].push(id);
      }

      if (this.options.timeField) {
        this._buildTimeIndexes(features);
      }

      var zoom = this._map.getZoom();

      if (zoom > this.options.maxZoom ||
          zoom < this.options.minZoom) { return; }

      this.createLayers(features);
    },

    _buildQuery: function (bounds) {
      var query = this.service.query()
        .intersects(bounds)
        .where(this.options.where)
        .fields(this.options.fields)
        .precision(this.options.precision);

      if (this.options.simplifyFactor) {
        query.simplify(this._map, this.options.simplifyFactor);
      }

      if (this.options.timeFilterMode === 'server' && this.options.from && this.options.to) {
        query.between(this.options.from, this.options.to);
      }

      return query;
    },

    /**
     * Where Methods
     */

    setWhere: function (where, callback, context) {
      this.options.where = (where && where.length) ? where : '1=1';

      var oldSnapshot = [];
      var newSnapshot = [];
      var pendingRequests = 0;
      var requestError = null;
      var requestCallback = L.Util.bind(function (error, featureCollection) {
        if (error) {
          requestError = error;
        }

        if (featureCollection) {
          for (var i = featureCollection.features.length - 1; i >= 0; i--) {
            newSnapshot.push(featureCollection.features[i].id);
          }
        }

        pendingRequests--;

        if (pendingRequests <= 0) {
          this._currentSnapshot = newSnapshot;
          // schedule adding features until the next animation frame
          L.Util.requestAnimFrame(L.Util.bind(function () {
            this.removeLayers(oldSnapshot);
            this.addLayers(newSnapshot);
            if (callback) {
              callback.call(context, requestError);
            }
          }, this));
        }
      }, this);

      for (var i = this._currentSnapshot.length - 1; i >= 0; i--) {
        oldSnapshot.push(this._currentSnapshot[i]);
      }

      for (var key in this._activeCells) {
        pendingRequests++;
        var coords = this._keyToCellCoords(key);
        var bounds = this._cellCoordsToBounds(coords);
        this._requestFeatures(bounds, key, requestCallback);
      }

      return this;
    },

    getWhere: function () {
      return this.options.where;
    },

    /**
     * Time Range Methods
     */

    getTimeRange: function () {
      return [this.options.from, this.options.to];
    },

    setTimeRange: function (from, to, callback, context) {
      var oldFrom = this.options.from;
      var oldTo = this.options.to;
      var pendingRequests = 0;
      var requestError = null;
      var requestCallback = L.Util.bind(function (error) {
        if (error) {
          requestError = error;
        }
        this._filterExistingFeatures(oldFrom, oldTo, from, to);

        pendingRequests--;

        if (callback && pendingRequests <= 0) {
          callback.call(context, requestError);
        }
      }, this);

      this.options.from = from;
      this.options.to = to;

      this._filterExistingFeatures(oldFrom, oldTo, from, to);

      if (this.options.timeFilterMode === 'server') {
        for (var key in this._activeCells) {
          pendingRequests++;
          var coords = this._keyToCellCoords(key);
          var bounds = this._cellCoordsToBounds(coords);
          this._requestFeatures(bounds, key, requestCallback);
        }
      }

      return this;
    },

    refresh: function () {
      for (var key in this._activeCells) {
        var coords = this._keyToCellCoords(key);
        var bounds = this._cellCoordsToBounds(coords);
        this._requestFeatures(bounds, key);
      }

      if (this.redraw) {
        this.once('load', function () {
          this.eachFeature(function (layer) {
            this._redraw(layer.feature.id);
          }, this);
        }, this);
      }
    },

    _filterExistingFeatures: function (oldFrom, oldTo, newFrom, newTo) {
      var layersToRemove = (oldFrom && oldTo) ? this._getFeaturesInTimeRange(oldFrom, oldTo) : this._currentSnapshot;
      var layersToAdd = this._getFeaturesInTimeRange(newFrom, newTo);

      if (layersToAdd.indexOf) {
        for (var i = 0; i < layersToAdd.length; i++) {
          var shouldRemoveLayer = layersToRemove.indexOf(layersToAdd[i]);
          if (shouldRemoveLayer >= 0) {
            layersToRemove.splice(shouldRemoveLayer, 1);
          }
        }
      }

      // schedule adding features until the next animation frame
      L.Util.requestAnimFrame(L.Util.bind(function () {
        this.removeLayers(layersToRemove);
        this.addLayers(layersToAdd);
      }, this));
    },

    _getFeaturesInTimeRange: function (start, end) {
      var ids = [];
      var search;

      if (this.options.timeField.start && this.options.timeField.end) {
        var startTimes = this._startTimeIndex.between(start, end);
        var endTimes = this._endTimeIndex.between(start, end);
        search = startTimes.concat(endTimes);
      } else {
        search = this._timeIndex.between(start, end);
      }

      for (var i = search.length - 1; i >= 0; i--) {
        ids.push(search[i].id);
      }

      return ids;
    },

    _buildTimeIndexes: function (geojson) {
      var i;
      var feature;
      if (this.options.timeField.start && this.options.timeField.end) {
        var startTimeEntries = [];
        var endTimeEntries = [];
        for (i = geojson.length - 1; i >= 0; i--) {
          feature = geojson[i];
          startTimeEntries.push({
            id: feature.id,
            value: new Date(feature.properties[this.options.timeField.start])
          });
          endTimeEntries.push({
            id: feature.id,
            value: new Date(feature.properties[this.options.timeField.end])
          });
        }
        this._startTimeIndex.bulkAdd(startTimeEntries);
        this._endTimeIndex.bulkAdd(endTimeEntries);
      } else {
        var timeEntries = [];
        for (i = geojson.length - 1; i >= 0; i--) {
          feature = geojson[i];
          timeEntries.push({
            id: feature.id,
            value: new Date(feature.properties[this.options.timeField])
          });
        }

        this._timeIndex.bulkAdd(timeEntries);
      }
    },

    _featureWithinTimeRange: function (feature) {
      if (!this.options.from || !this.options.to) {
        return true;
      }

      var from = +this.options.from.valueOf();
      var to = +this.options.to.valueOf();

      if (typeof this.options.timeField === 'string') {
        var date = +feature.properties[this.options.timeField];
        return (date >= from) && (date <= to);
      }

      if (this.options.timeField.start && this.options.timeField.end) {
        var startDate = +feature.properties[this.options.timeField.start];
        var endDate = +feature.properties[this.options.timeField.end];
        return ((startDate >= from) && (startDate <= to)) || ((endDate >= from) && (endDate <= to));
      }
    },

    /**
     * Service Methods
     */

    authenticate: function (token) {
      this.service.authenticate(token);
      return this;
    },

    metadata: function (callback, context) {
      this.service.metadata(callback, context);
      return this;
    },

    query: function () {
      return this.service.query();
    },

    _getMetadata: function (callback) {
      if (this._metadata) {
        var error;
        callback(error, this._metadata);
      } else {
        this.metadata(L.Util.bind(function (error, response) {
          this._metadata = response;
          callback(error, this._metadata);
        }, this));
      }
    },

    addFeature: function (feature, callback, context) {
      this._getMetadata(L.Util.bind(function (error, metadata) {
        if (error) {
          if (callback) { callback.call(this, error, null); }
          return;
        }

        this.service.addFeature(feature, L.Util.bind(function (error, response) {
          if (!error) {
            // assign ID from result to appropriate objectid field from service metadata
            feature.properties[metadata.objectIdField] = response.objectId;

            // we also need to update the geojson id for createLayers() to function
            feature.id = response.objectId;
            this.createLayers([feature]);
          }

          if (callback) {
            callback.call(context, error, response);
          }
        }, this));
      }, this));
    },

    updateFeature: function (feature, callback, context) {
      this.service.updateFeature(feature, function (error, response) {
        if (!error) {
          this.removeLayers([feature.id], true);
          this.createLayers([feature]);
        }

        if (callback) {
          callback.call(context, error, response);
        }
      }, this);
    },

    deleteFeature: function (id, callback, context) {
      this.service.deleteFeature(id, function (error, response) {
        if (!error && response.objectId) {
          this.removeLayers([response.objectId], true);
        }
        if (callback) {
          callback.call(context, error, response);
        }
      }, this);
    },

    deleteFeatures: function (ids, callback, context) {
      return this.service.deleteFeatures(ids, function (error, response) {
        if (!error && response.length > 0) {
          for (var i = 0; i < response.length; i++) {
            this.removeLayers([response[i].objectId], true);
          }
        }
        if (callback) {
          callback.call(context, error, response);
        }
      }, this);
    }
  });

  /**
   * Temporal Binary Search Index
   */

  function BinarySearchIndex (values) {
    this.values = values || [];
  }

  BinarySearchIndex.prototype._query = function (query) {
    var minIndex = 0;
    var maxIndex = this.values.length - 1;
    var currentIndex;
    var currentElement;

    while (minIndex <= maxIndex) {
      currentIndex = (minIndex + maxIndex) / 2 | 0;
      currentElement = this.values[Math.round(currentIndex)];
      if (+currentElement.value < +query) {
        minIndex = currentIndex + 1;
      } else if (+currentElement.value > +query) {
        maxIndex = currentIndex - 1;
      } else {
        return currentIndex;
      }
    }

    return ~maxIndex;
  };

  BinarySearchIndex.prototype.sort = function () {
    this.values.sort(function (a, b) {
      return +b.value - +a.value;
    }).reverse();
    this.dirty = false;
  };

  BinarySearchIndex.prototype.between = function (start, end) {
    if (this.dirty) {
      this.sort();
    }

    var startIndex = this._query(start);
    var endIndex = this._query(end);

    if (startIndex === 0 && endIndex === 0) {
      return [];
    }

    startIndex = Math.abs(startIndex);
    endIndex = (endIndex < 0) ? Math.abs(endIndex) : endIndex + 1;

    return this.values.slice(startIndex, endIndex);
  };

  BinarySearchIndex.prototype.bulkAdd = function (items) {
    this.dirty = true;
    this.values = this.values.concat(items);
  };

  exports.FeatureManager = FeatureManager;

  var FeatureLayer = FeatureManager.extend({

    options: {
      cacheLayers: true
    },

    /**
     * Constructor
     */
    initialize: function (options) {
      FeatureManager.prototype.initialize.call(this, options);
      this._originalStyle = this.options.style;
      this._layers = {};
    },

    /**
     * Layer Interface
     */

    onAdd: function (map) {
      map.on('zoomstart zoomend', function (e) {
        this._zooming = (e.type === 'zoomstart');
      }, this);
      return FeatureManager.prototype.onAdd.call(this, map);
    },

    onRemove: function (map) {
      for (var i in this._layers) {
        map.removeLayer(this._layers[i]);
      }

      return FeatureManager.prototype.onRemove.call(this, map);
    },

    createNewLayer: function (geojson) {
      var layer = L.GeoJSON.geometryToLayer(geojson, this.options);
      layer.defaultOptions = layer.options;
      return layer;
    },

    _updateLayer: function (layer, geojson) {
      // convert the geojson coordinates into a Leaflet LatLng array/nested arrays
      // pass it to setLatLngs to update layer geometries
      var latlngs = [];
      var coordsToLatLng = this.options.coordsToLatLng || L.GeoJSON.coordsToLatLng;

      // copy new attributes, if present
      if (geojson.properties) {
        layer.feature.properties = geojson.properties;
      }

      switch (geojson.geometry.type) {
        case 'Point':
          latlngs = L.GeoJSON.coordsToLatLng(geojson.geometry.coordinates);
          layer.setLatLng(latlngs);
          break;
        case 'LineString':
          latlngs = L.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 0, coordsToLatLng);
          layer.setLatLngs(latlngs);
          break;
        case 'MultiLineString':
          latlngs = L.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 1, coordsToLatLng);
          layer.setLatLngs(latlngs);
          break;
        case 'Polygon':
          latlngs = L.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 1, coordsToLatLng);
          layer.setLatLngs(latlngs);
          break;
        case 'MultiPolygon':
          latlngs = L.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 2, coordsToLatLng);
          layer.setLatLngs(latlngs);
          break;
      }
    },

    /**
     * Feature Management Methods
     */

    createLayers: function (features) {
      for (var i = features.length - 1; i >= 0; i--) {
        var geojson = features[i];

        var layer = this._layers[geojson.id];
        var newLayer;

        if (layer && !this._map.hasLayer(layer)) {
          this._map.addLayer(layer);
        }

        // update geomerty if neccessary
        if (layer && (layer.setLatLngs || layer.setLatLng)) {
          this._updateLayer(layer, geojson);
        }

        if (!layer) {
          newLayer = this.createNewLayer(geojson);
          newLayer.feature = geojson;

          // bubble events from individual layers to the feature layer
          newLayer.addEventParent(this);

          if (this.options.onEachFeature) {
            this.options.onEachFeature(newLayer.feature, newLayer);
          }

          // cache the layer
          this._layers[newLayer.feature.id] = newLayer;

          // style the layer
          this.setFeatureStyle(newLayer.feature.id, this.options.style);

          this.fire('createfeature', {
            feature: newLayer.feature
          }, true);

          // add the layer if it is within the time bounds or our layer is not time enabled
          if (!this.options.timeField || (this.options.timeField && this._featureWithinTimeRange(geojson))) {
            this._map.addLayer(newLayer);
          }
        }
      }
    },

    addLayers: function (ids) {
      for (var i = ids.length - 1; i >= 0; i--) {
        var layer = this._layers[ids[i]];
        if (layer) {
          this.fire('addfeature', {
            feature: layer.feature
          }, true);
          this._map.addLayer(layer);
        }
      }
    },

    removeLayers: function (ids, permanent) {
      for (var i = ids.length - 1; i >= 0; i--) {
        var id = ids[i];
        var layer = this._layers[id];
        if (layer) {
          this.fire('removefeature', {
            feature: layer.feature,
            permanent: permanent
          }, true);
          this._map.removeLayer(layer);
        }
        if (layer && permanent) {
          delete this._layers[id];
        }
      }
    },

    cellEnter: function (bounds, coords) {
      if (!this._zooming) {
        L.Util.requestAnimFrame(L.Util.bind(function () {
          var cacheKey = this._cacheKey(coords);
          var cellKey = this._cellCoordsToKey(coords);
          var layers = this._cache[cacheKey];
          if (this._activeCells[cellKey] && layers) {
            this.addLayers(layers);
          }
        }, this));
      }
    },

    cellLeave: function (bounds, coords) {
      if (!this._zooming) {
        L.Util.requestAnimFrame(L.Util.bind(function () {
          var cacheKey = this._cacheKey(coords);
          var cellKey = this._cellCoordsToKey(coords);
          var layers = this._cache[cacheKey];
          var mapBounds = this._map.getBounds();
          if (!this._activeCells[cellKey] && layers) {
            var removable = true;

            for (var i = 0; i < layers.length; i++) {
              var layer = this._layers[layers[i]];
              if (layer && layer.getBounds && mapBounds.intersects(layer.getBounds())) {
                removable = false;
              }
            }

            if (removable) {
              this.removeLayers(layers, !this.options.cacheLayers);
            }

            if (!this.options.cacheLayers && removable) {
              delete this._cache[cacheKey];
              delete this._cells[cellKey];
              delete this._activeCells[cellKey];
            }
          }
        }, this));
      }
    },

    /**
     * Styling Methods
     */

    resetStyle: function () {
      this.options.style = this._originalStyle;
      this.eachFeature(function (layer) {
        this.resetFeatureStyle(layer.feature.id);
      }, this);
      return this;
    },

    setStyle: function (style) {
      this.options.style = style;
      this.eachFeature(function (layer) {
        this.setFeatureStyle(layer.feature.id, style);
      }, this);
      return this;
    },

    resetFeatureStyle: function (id) {
      var layer = this._layers[id];
      var style = this._originalStyle || L.Path.prototype.options;
      if (layer) {
        L.Util.extend(layer.options, layer.defaultOptions);
        this.setFeatureStyle(id, style);
      }
      return this;
    },

    setFeatureStyle: function (id, style) {
      var layer = this._layers[id];
      if (typeof style === 'function') {
        style = style(layer.feature);
      }
      if (layer.setStyle) {
        layer.setStyle(style);
      }
      return this;
    },

    /**
     * Utility Methods
     */

    eachFeature: function (fn, context) {
      for (var i in this._layers) {
        fn.call(context, this._layers[i]);
      }
      return this;
    },

    getFeature: function (id) {
      return this._layers[id];
    },

    bringToBack: function () {
      this.eachFeature(function (layer) {
        if (layer.bringToBack) {
          layer.bringToBack();
        }
      });
    },

    bringToFront: function () {
      this.eachFeature(function (layer) {
        if (layer.bringToFront) {
          layer.bringToFront();
        }
      });
    },

    redraw: function (id) {
      if (id) {
        this._redraw(id);
      }
      return this;
    },

    _redraw: function (id) {
      var layer = this._layers[id];
      var geojson = layer.feature;

      // if this looks like a marker
      if (layer && layer.setIcon && this.options.pointToLayer) {
        // update custom symbology, if necessary
        if (this.options.pointToLayer) {
          var getIcon = this.options.pointToLayer(geojson, L.latLng(geojson.geometry.coordinates[1], geojson.geometry.coordinates[0]));
          var updatedIcon = getIcon.options.icon;
          layer.setIcon(updatedIcon);
        }
      }

      // looks like a vector marker (circleMarker)
      if (layer && layer.setStyle && this.options.pointToLayer) {
        var getStyle = this.options.pointToLayer(geojson, L.latLng(geojson.geometry.coordinates[1], geojson.geometry.coordinates[0]));
        var updatedStyle = getStyle.options;
        this.setFeatureStyle(geojson.id, updatedStyle);
      }

      // looks like a path (polygon/polyline)
      if (layer && layer.setStyle && this.options.style) {
        this.resetStyle(geojson.id);
      }
    }
  });

  function featureLayer (options) {
    return new FeatureLayer(options);
  }

  var FeatureLayer_js = featureLayer;

  exports.FeatureLayer = FeatureLayer;
  exports.featureLayer = featureLayer;

  // import leaflet to ensure a gloabl
  var VERSION = '2.0.0-beta.1';
  var Tasks = {
    Task: Task,
    task: task,
    Query: Query,
    query: query,
    Find: Find,
    find: find,
    Identify: Identify,
    identify: identify,
    IdentifyFeatures: IdentifyFeatures,
    identifyFeatures: identifyFeatures,
    IdentifyImage: IdentifyImage,
    identifyImage: identifyImage
  };

  var Services = {
    Service: Service,
    service: service,
    MapService: MapService,
    mapService: mapService,
    ImageService: ImageService,
    imageService: imageService,
    FeatureLayerService: FeatureLayerService,
    featureLayerService: featureLayerService
  };

  var Layers = {
    BasemapLayer: BasemapLayer,
    basemapLayer: basemapLayer,
    TiledMapLayer: TiledMapLayer,
    tiledMapLayer: tiledMapLayer,
    RasterLayer: RasterLayer,
    ImageMapLayer: ImageMapLayer,
    imageMapLayer: imageMapLayer,
    DynamicMapLayer: DynamicMapLayer,
    dynamicMapLayer: dynamicMapLayer,
    FeatureGrid: FeatureGrid,
    FeatureManager: FeatureManager,
    FeatureLayer: FeatureLayer,
    featureLayer: featureLayer
  };

  var _isAmd = (typeof define === 'undefined') ? false : define.amd && typeof define === 'function';
  var _isCjs = (typeof exports === 'object') && (typeof module !== 'undefined');
  var _isSystem = window && window.System;

  if ((_isAmd || _isCjs || _isSystem) && window && window.L) {
    window.L.esri = {
      VERSION: VERSION,
      Support: Support,
      Util: Util,
      get: get,
      post: xmlHttpPost,
      request: request,
      Tasks: Tasks,
      Services: Services,
      Layers: Layers,
      BasemapLayer: BasemapLayer,
      basemapLayer: basemapLayer,
      TiledMapLayer: TiledMapLayer,
      tiledMapLayer: tiledMapLayer,
      RasterLayer: RasterLayer,
      ImageMapLayer: ImageMapLayer,
      imageMapLayer: imageMapLayer,
      DynamicMapLayer: DynamicMapLayer,
      dynamicMapLayer: dynamicMapLayer,
      FeatureGrid: FeatureGrid,
      FeatureManager: FeatureManager,
      FeatureLayer: FeatureLayer,
      featureLayer: featureLayer
    };
  }

  exports.VERSION = VERSION;
  exports.Tasks = Tasks;
  exports.Services = Services;
  exports.Layers = Layers;

}));