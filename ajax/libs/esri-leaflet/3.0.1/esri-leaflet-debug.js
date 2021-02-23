/* esri-leaflet - v3.0.1 - Tue Feb 23 2021 09:23:20 GMT-0600 (Central Standard Time)
 * Copyright (c) 2021 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet')) :
  typeof define === 'function' && define.amd ? define(['exports', 'leaflet'], factory) :
  (global = global || self, factory((global.L = global.L || {}, global.L.esri = {}), global.L));
}(this, (function (exports, leaflet) { 'use strict';

  var version = "3.0.1";

  var cors = ((window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest()));
  var pointerEvents = document.documentElement.style.pointerEvents === '';

  var Support = {
    cors: cors,
    pointerEvents: pointerEvents
  };

  var options = {
    attributionWidthOffset: 55
  };

  var callbacks = 0;

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
      httpRequest.onreadystatechange = leaflet.Util.falseFn;

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
        } catch (e) {
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

        httpRequest.onerror = leaflet.Util.falseFn;

        callback.call(context, error, response);
      }
    };

    httpRequest.ontimeout = function () {
      this.onerror();
    };

    return httpRequest;
  }

  function xmlHttpPost (url, params, callback, context) {
    var httpRequest = createRequest(callback, context);
    httpRequest.open('POST', url);

    if (typeof context !== 'undefined' && context !== null) {
      if (typeof context.options !== 'undefined') {
        httpRequest.timeout = context.options.timeout;
      }
    }
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    httpRequest.send(serialize(params));

    return httpRequest;
  }

  function xmlHttpGet (url, params, callback, context) {
    var httpRequest = createRequest(callback, context);
    httpRequest.open('GET', url + '?' + serialize(params), true);

    if (typeof context !== 'undefined' && context !== null) {
      if (typeof context.options !== 'undefined') {
        httpRequest.timeout = context.options.timeout;
        if (context.options.withCredentials) {
          httpRequest.withCredentials = true;
        }
      }
    }
    httpRequest.send(null);

    return httpRequest;
  }

  // AJAX handlers for CORS (modern browsers) or JSONP (older browsers)
  function request (url, params, callback, context) {
    var paramString = serialize(params);
    var httpRequest = createRequest(callback, context);
    var requestLength = (url + '?' + paramString).length;

    // ie10/11 require the request be opened before a timeout is applied
    if (requestLength <= 2000 && Support.cors) {
      httpRequest.open('GET', url + '?' + paramString);
    } else if (requestLength > 2000 && Support.cors) {
      httpRequest.open('POST', url);
      httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }

    if (typeof context !== 'undefined' && context !== null) {
      if (typeof context.options !== 'undefined') {
        httpRequest.timeout = context.options.timeout;
        if (context.options.withCredentials) {
          httpRequest.withCredentials = true;
        }
      }
    }

    // request is less than 2000 characters and the browser supports CORS, make GET request with XMLHttpRequest
    if (requestLength <= 2000 && Support.cors) {
      httpRequest.send(null);

    // request is more than 2000 characters and the browser supports CORS, make POST request with XMLHttpRequest
    } else if (requestLength > 2000 && Support.cors) {
      httpRequest.send(paramString);

    // request is less  than 2000 characters and the browser does not support CORS, make a JSONP request
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
    window._EsriLeafletCallbacks = window._EsriLeafletCallbacks || {};
    var callbackId = 'c' + callbacks;
    params.callback = 'window._EsriLeafletCallbacks.' + callbackId;

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

    var script = leaflet.DomUtil.create('script', null, document.body);
    script.type = 'text/javascript';
    script.src = url + '?' + serialize(params);
    script.id = callbackId;
    script.onerror = function (error) {
      if (error && window._EsriLeafletCallbacks[callbackId] !== true) {
        // Can't get true error code: it can be 404, or 401, or 500
        var err = {
          error: {
            code: 500,
            message: 'An unknown error occurred'
          }
        };

        callback.call(context, err);
        window._EsriLeafletCallbacks[callbackId] = true;
      }
    };
    leaflet.DomUtil.addClass(script, 'esri-leaflet-jsonp');

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

  function warn () {
    if (console && console.warn) {
      console.warn.apply(console, arguments);
    }
  }

  // export the Request object to call the different handlers for debugging
  var Request = {
    request: request,
    get: get,
    post: xmlHttpPost
  };

  /* @preserve
  * @terraformer/arcgis - v2.0.6 - MIT
  * Copyright (c) 2012-2020 Environmental Systems Research Institute, Inc.
  * Mon May 18 2020 14:30:35 GMT-0700 (Pacific Daylight Time)
  */
  /* Copyright (c) 2012-2019 Environmental Systems Research Institute, Inc.
   * Apache-2.0 */

  var edgeIntersectsEdge = function edgeIntersectsEdge(a1, a2, b1, b2) {
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
  };
  var coordinatesContainPoint = function coordinatesContainPoint(coordinates, point) {
    var contains = false;

    for (var i = -1, l = coordinates.length, j = l - 1; ++i < l; j = i) {
      if ((coordinates[i][1] <= point[1] && point[1] < coordinates[j][1] || coordinates[j][1] <= point[1] && point[1] < coordinates[i][1]) && point[0] < (coordinates[j][0] - coordinates[i][0]) * (point[1] - coordinates[i][1]) / (coordinates[j][1] - coordinates[i][1]) + coordinates[i][0]) {
        contains = !contains;
      }
    }

    return contains;
  };
  var pointsEqual = function pointsEqual(a, b) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  };
  var arrayIntersectsArray = function arrayIntersectsArray(a, b) {
    for (var i = 0; i < a.length - 1; i++) {
      for (var j = 0; j < b.length - 1; j++) {
        if (edgeIntersectsEdge(a[i], a[i + 1], b[j], b[j + 1])) {
          return true;
        }
      }
    }

    return false;
  };

  /* Copyright (c) 2012-2019 Environmental Systems Research Institute, Inc.
   * Apache-2.0 */

  var closeRing = function closeRing(coordinates) {
    if (!pointsEqual(coordinates[0], coordinates[coordinates.length - 1])) {
      coordinates.push(coordinates[0]);
    }

    return coordinates;
  }; // determine if polygon ring coordinates are clockwise. clockwise signifies outer ring, counter-clockwise an inner ring
  // or hole. this logic was found at http://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-
  // points-are-in-clockwise-order

  var ringIsClockwise = function ringIsClockwise(ringToTest) {
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

    return total >= 0;
  }; // This function ensures that rings are oriented in the right directions
  // from http://jsperf.com/cloning-an-object/2

  var shallowClone = function shallowClone(obj) {
    var target = {};

    for (var i in obj) {
      // both arcgis attributes and geojson props are just hardcoded keys
      if (obj.hasOwnProperty(i)) {
        // eslint-disable-line no-prototype-builtins
        target[i] = obj[i];
      }
    }

    return target;
  };

  /* Copyright (c) 2012-2019 Environmental Systems Research Institute, Inc.
   * Apache-2.0 */

  var coordinatesContainCoordinates = function coordinatesContainCoordinates(outer, inner) {
    var intersects = arrayIntersectsArray(outer, inner);
    var contains = coordinatesContainPoint(outer, inner[0]);

    if (!intersects && contains) {
      return true;
    }

    return false;
  }; // do any polygons in this array contain any other polygons in this array?
  // used for checking for holes in arcgis rings


  var convertRingsToGeoJSON = function convertRingsToGeoJSON(rings) {
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
      } // is this ring an outer ring? is it clockwise?


      if (ringIsClockwise(ring)) {
        var polygon = [ring.slice().reverse()]; // wind outer rings counterclockwise for RFC 7946 compliance

        outerRings.push(polygon); // push to outer rings
      } else {
        holes.push(ring.slice().reverse()); // wind inner rings clockwise for RFC 7946 compliance
      }
    }

    var uncontainedHoles = []; // while there are holes left...

    while (holes.length) {
      // pop a hole off out stack
      hole = holes.pop(); // loop over all outer rings and see if they contain our hole.

      var contained = false;

      for (x = outerRings.length - 1; x >= 0; x--) {
        outerRing = outerRings[x][0];

        if (coordinatesContainCoordinates(outerRing, hole)) {
          // the hole is contained push it into our polygon
          outerRings[x].push(hole);
          contained = true;
          break;
        }
      } // ring is not contained in any outer ring
      // sometimes this happens https://github.com/Esri/esri-leaflet/issues/320


      if (!contained) {
        uncontainedHoles.push(hole);
      }
    } // if we couldn't match any holes using contains we can try intersects...


    while (uncontainedHoles.length) {
      // pop a hole off out stack
      hole = uncontainedHoles.pop(); // loop over all outer rings and see if any intersect our hole.

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
  };

  var getId = function getId(attributes, idAttribute) {
    var keys = idAttribute ? [idAttribute, 'OBJECTID', 'FID'] : ['OBJECTID', 'FID'];

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key in attributes && (typeof attributes[key] === 'string' || typeof attributes[key] === 'number')) {
        return attributes[key];
      }
    }

    throw Error('No valid id attribute found');
  };

  var arcgisToGeoJSON = function arcgisToGeoJSON(arcgis, idAttribute) {
    var geojson = {};

    if (arcgis.features) {
      geojson.type = 'FeatureCollection';
      geojson.features = [];

      for (var i = 0; i < arcgis.features.length; i++) {
        geojson.features.push(arcgisToGeoJSON(arcgis.features[i], idAttribute));
      }
    }

    if (typeof arcgis.x === 'number' && typeof arcgis.y === 'number') {
      geojson.type = 'Point';
      geojson.coordinates = [arcgis.x, arcgis.y];

      if (typeof arcgis.z === 'number') {
        geojson.coordinates.push(arcgis.z);
      }
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

    if (typeof arcgis.xmin === 'number' && typeof arcgis.ymin === 'number' && typeof arcgis.xmax === 'number' && typeof arcgis.ymax === 'number') {
      geojson.type = 'Polygon';
      geojson.coordinates = [[[arcgis.xmax, arcgis.ymax], [arcgis.xmin, arcgis.ymax], [arcgis.xmin, arcgis.ymin], [arcgis.xmax, arcgis.ymin], [arcgis.xmax, arcgis.ymax]]];
    }

    if (arcgis.geometry || arcgis.attributes) {
      geojson.type = 'Feature';
      geojson.geometry = arcgis.geometry ? arcgisToGeoJSON(arcgis.geometry) : null;
      geojson.properties = arcgis.attributes ? shallowClone(arcgis.attributes) : null;

      if (arcgis.attributes) {
        try {
          geojson.id = getId(arcgis.attributes, idAttribute);
        } catch (err) {// don't set an id
        }
      }
    } // if no valid geometry was encountered


    if (JSON.stringify(geojson.geometry) === JSON.stringify({})) {
      geojson.geometry = null;
    }

    if (arcgis.spatialReference && arcgis.spatialReference.wkid && arcgis.spatialReference.wkid !== 4326) {
      console.warn('Object converted in non-standard crs - ' + JSON.stringify(arcgis.spatialReference));
    }

    return geojson;
  };

  /* Copyright (c) 2012-2019 Environmental Systems Research Institute, Inc.
   * Apache-2.0 */
  // outer rings are clockwise, holes are counterclockwise
  // used for converting GeoJSON Polygons to ArcGIS Polygons

  var orientRings = function orientRings(poly) {
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
  }; // This function flattens holes in multipolygons to one array of polygons
  // used for converting GeoJSON Polygons to ArcGIS Polygons


  var flattenMultiPolygonRings = function flattenMultiPolygonRings(rings) {
    var output = [];

    for (var i = 0; i < rings.length; i++) {
      var polygon = orientRings(rings[i]);

      for (var x = polygon.length - 1; x >= 0; x--) {
        var ring = polygon[x].slice(0);
        output.push(ring);
      }
    }

    return output;
  };

  var geojsonToArcGIS = function geojsonToArcGIS(geojson, idAttribute) {
    idAttribute = idAttribute || 'OBJECTID';
    var spatialReference = {
      wkid: 4326
    };
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

        result.attributes = geojson.properties ? shallowClone(geojson.properties) : {};

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
  };

  var BASE_LEAFLET_ATTRIBUTION_STRING = '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>';
  var POWERED_BY_ESRI_ATTRIBUTION_STRING = 'Powered by <a href="https://www.esri.com">Esri</a>';

  function geojsonToArcGIS$1 (geojson, idAttr) {
    return geojsonToArcGIS(geojson, idAttr);
  }

  function arcgisToGeoJSON$1 (arcgis, idAttr) {
    return arcgisToGeoJSON(arcgis, idAttr);
  }

  // convert an extent (ArcGIS) to LatLngBounds (Leaflet)
  function extentToBounds (extent) {
    // "NaN" coordinates from ArcGIS Server indicate a null geometry
    if (extent.xmin !== 'NaN' && extent.ymin !== 'NaN' && extent.xmax !== 'NaN' && extent.ymax !== 'NaN') {
      var sw = leaflet.latLng(extent.ymin, extent.xmin);
      var ne = leaflet.latLng(extent.ymax, extent.xmax);
      return leaflet.latLngBounds(sw, ne);
    } else {
      return null;
    }
  }

  // convert an LatLngBounds (Leaflet) to extent (ArcGIS)
  function boundsToExtent (bounds) {
    bounds = leaflet.latLngBounds(bounds);
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

  var knownFieldNames = /^(OBJECTID|FID|OID|ID)$/i;

  // Attempts to find the ID Field from response
  function _findIdAttributeFromResponse (response) {
    var result;

    if (response.objectIdFieldName) {
      // Find Id Field directly
      result = response.objectIdFieldName;
    } else if (response.fields) {
      // Find ID Field based on field type
      for (var j = 0; j <= response.fields.length - 1; j++) {
        if (response.fields[j].type === 'esriFieldTypeOID') {
          result = response.fields[j].name;
          break;
        }
      }
      if (!result) {
        // If no field was marked as being the esriFieldTypeOID try well known field names
        for (j = 0; j <= response.fields.length - 1; j++) {
          if (response.fields[j].name.match(knownFieldNames)) {
            result = response.fields[j].name;
            break;
          }
        }
      }
    }
    return result;
  }

  // This is the 'last' resort, find the Id field from the specified feature
  function _findIdAttributeFromFeature (feature) {
    for (var key in feature.attributes) {
      if (key.match(knownFieldNames)) {
        return key;
      }
    }
  }

  function responseToFeatureCollection (response, idAttribute) {
    var objectIdField;
    var features = response.features || response.results;
    var count = features && features.length;

    if (idAttribute) {
      objectIdField = idAttribute;
    } else {
      objectIdField = _findIdAttributeFromResponse(response);
    }

    var featureCollection = {
      type: 'FeatureCollection',
      features: []
    };

    if (count) {
      for (var i = features.length - 1; i >= 0; i--) {
        var feature = arcgisToGeoJSON$1(features[i], objectIdField || _findIdAttributeFromFeature(features[i]));
        featureCollection.features.push(feature);
      }
    }

    return featureCollection;
  }

    // trim url whitespace and add a trailing slash if needed
  function cleanUrl (url) {
    // trim leading and trailing spaces, but not spaces inside the url
    url = leaflet.Util.trim(url);

    // add a trailing slash to the url if the user omitted it
    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    return url;
  }

  /* Extract url params if any and store them in requestParams attribute.
     Return the options params updated */
  function getUrlParams (options) {
    if (options.url.indexOf('?') !== -1) {
      options.requestParams = options.requestParams || {};
      var queryString = options.url.substring(options.url.indexOf('?') + 1);
      options.url = options.url.split('?')[0];
      options.requestParams = JSON.parse('{"' + decodeURI(queryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    }
    options.url = cleanUrl(options.url.split('?')[0]);
    return options;
  }

  function isArcgisOnline (url) {
    /* hosted feature services support geojson as an output format
    utility.arcgis.com services are proxied from a variety of ArcGIS Server vintages, and may not */
    return (/^(?!.*utility\.arcgis\.com).*\.arcgis\.com.*FeatureServer/i).test(url);
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

  function calcAttributionWidth (map) {
    // either crop at 55px or user defined buffer
    return (map.getSize().x - options.attributionWidthOffset) + 'px';
  }

  function setEsriAttribution (map) {
    if (!map.attributionControl) {
      return;
    }

    if (!map.attributionControl._esriAttributionLayerCount) {
      map.attributionControl._esriAttributionLayerCount = 0;
    }

    if (map.attributionControl._esriAttributionLayerCount === 0) {
      // Dynamically creating the CSS rules, only run this once per page load:
      if (!map.attributionControl._esriAttributionAddedOnce) {
        var hoverAttributionStyle = document.createElement('style');
        hoverAttributionStyle.type = 'text/css';
        hoverAttributionStyle.innerHTML = '.esri-truncated-attribution:hover {' +
          'white-space: normal;' +
        '}';
        document.getElementsByTagName('head')[0].appendChild(hoverAttributionStyle);

        // define a new css class in JS to trim attribution into a single line
        var attributionStyle = document.createElement('style');
        attributionStyle.type = 'text/css';
        attributionStyle.innerHTML = '.esri-truncated-attribution {' +
          'vertical-align: -3px;' +
          'white-space: nowrap;' +
          'overflow: hidden;' +
          'text-overflow: ellipsis;' +
          'display: inline-block;' +
          'transition: 0s white-space;' +
          'transition-delay: 1s;' +
          'max-width: ' + calcAttributionWidth(map) + ';' +
        '}';
        document.getElementsByTagName('head')[0].appendChild(attributionStyle);

        // update the width used to truncate when the map itself is resized
        map.on('resize', function (e) {
          if (map.attributionControl) {
            map.attributionControl._container.style.maxWidth = calcAttributionWidth(e.target);
          }
        });

        map.attributionControl._esriAttributionAddedOnce = true;
      }

      map.attributionControl.setPrefix(BASE_LEAFLET_ATTRIBUTION_STRING + ' | ' + POWERED_BY_ESRI_ATTRIBUTION_STRING);
      leaflet.DomUtil.addClass(map.attributionControl._container, 'esri-truncated-attribution:hover');
      leaflet.DomUtil.addClass(map.attributionControl._container, 'esri-truncated-attribution');
    }

    // Track the number of esri-leaflet layers that are on the map so we can know when we can remove the attribution (below in removeEsriAttribution)
    map.attributionControl._esriAttributionLayerCount = map.attributionControl._esriAttributionLayerCount + 1;
  }

  function removeEsriAttribution (map) {
    if (!map.attributionControl) {
      return;
    }

    // Only remove the attribution if we're about to remove the LAST esri-leaflet layer (_esriAttributionLayerCount)
    if (map.attributionControl._esriAttributionLayerCount && map.attributionControl._esriAttributionLayerCount === 1) {
      map.attributionControl.setPrefix(BASE_LEAFLET_ATTRIBUTION_STRING);
      leaflet.DomUtil.removeClass(map.attributionControl._container, 'esri-truncated-attribution:hover');
      leaflet.DomUtil.removeClass(map.attributionControl._container, 'esri-truncated-attribution');
    }
    map.attributionControl._esriAttributionLayerCount = map.attributionControl._esriAttributionLayerCount - 1;
  }

  function _setGeometry (geometry) {
    var params = {
      geometry: null,
      geometryType: null
    };

    // convert bounds to extent and finish
    if (geometry instanceof leaflet.LatLngBounds) {
      // set geometry + geometryType
      params.geometry = boundsToExtent(geometry);
      params.geometryType = 'esriGeometryEnvelope';
      return params;
    }

    // convert L.Marker > L.LatLng
    if (geometry.getLatLng) {
      geometry = geometry.getLatLng();
    }

    // convert L.LatLng to a geojson point and continue;
    if (geometry instanceof leaflet.LatLng) {
      geometry = {
        type: 'Point',
        coordinates: [geometry.lng, geometry.lat]
      };
    }

    // handle L.GeoJSON, pull out the first geometry
    if (geometry instanceof leaflet.GeoJSON) {
      // reassign geometry to the GeoJSON value  (we are assuming that only one feature is present)
      geometry = geometry.getLayers()[0].feature.geometry;
      params.geometry = geojsonToArcGIS$1(geometry);
      params.geometryType = geojsonTypeToArcGIS(geometry.type);
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
    if (geometry.type === 'Point' || geometry.type === 'LineString' || geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
      params.geometry = geojsonToArcGIS$1(geometry);
      params.geometryType = geojsonTypeToArcGIS(geometry.type);
      return params;
    }

    // warn the user if we havn't found an appropriate object
    warn('invalid geometry passed to spatial query. Should be L.LatLng, L.LatLngBounds, L.Marker or a GeoJSON Point, Line, Polygon or MultiPolygon object');

    return;
  }

  function _getAttributionData (url, map) {
    if (Support.cors) {
      request(url, {}, leaflet.Util.bind(function (error, attributions) {
        if (error) { return; }
        map._esriAttributions = [];
        for (var c = 0; c < attributions.contributors.length; c++) {
          var contributor = attributions.contributors[c];

          for (var i = 0; i < contributor.coverageAreas.length; i++) {
            var coverageArea = contributor.coverageAreas[i];
            var southWest = leaflet.latLng(coverageArea.bbox[0], coverageArea.bbox[1]);
            var northEast = leaflet.latLng(coverageArea.bbox[2], coverageArea.bbox[3]);
            map._esriAttributions.push({
              attribution: contributor.attribution,
              score: coverageArea.score,
              bounds: leaflet.latLngBounds(southWest, northEast),
              minZoom: coverageArea.zoomMin,
              maxZoom: coverageArea.zoomMax
            });
          }
        }

        map._esriAttributions.sort(function (a, b) {
          return b.score - a.score;
        });

        // pass the same argument as the map's 'moveend' event
        var obj = { target: map };
        _updateMapAttribution(obj);
      }, this));
    }
  }

  function _updateMapAttribution (evt) {
    var map = evt.target;
    var oldAttributions = map._esriAttributions;

    if (!map || !map.attributionControl) return;

    var attributionElement = map.attributionControl._container.querySelector('.esri-dynamic-attribution');

    if (attributionElement && oldAttributions) {
      var newAttributions = '';
      var bounds = map.getBounds();
      var wrappedBounds = leaflet.latLngBounds(
        bounds.getSouthWest().wrap(),
        bounds.getNorthEast().wrap()
      );
      var zoom = map.getZoom();

      for (var i = 0; i < oldAttributions.length; i++) {
        var attribution = oldAttributions[i];
        var text = attribution.attribution;

        if (!newAttributions.match(text) && attribution.bounds.intersects(wrappedBounds) && zoom >= attribution.minZoom && zoom <= attribution.maxZoom) {
          newAttributions += (', ' + text);
        }
      }

      newAttributions = newAttributions.substr(2);
      attributionElement.innerHTML = newAttributions;
      attributionElement.style.maxWidth = calcAttributionWidth(map);

      map.fire('attributionupdated', {
        attribution: newAttributions
      });
    }
  }

  var EsriUtil = {
    warn: warn,
    cleanUrl: cleanUrl,
    getUrlParams: getUrlParams,
    isArcgisOnline: isArcgisOnline,
    geojsonTypeToArcGIS: geojsonTypeToArcGIS,
    responseToFeatureCollection: responseToFeatureCollection,
    geojsonToArcGIS: geojsonToArcGIS$1,
    arcgisToGeoJSON: arcgisToGeoJSON$1,
    boundsToExtent: boundsToExtent,
    extentToBounds: extentToBounds,
    calcAttributionWidth: calcAttributionWidth,
    setEsriAttribution: setEsriAttribution,
    _setGeometry: _setGeometry,
    _getAttributionData: _getAttributionData,
    _updateMapAttribution: _updateMapAttribution,
    _findIdAttributeFromFeature: _findIdAttributeFromFeature,
    _findIdAttributeFromResponse: _findIdAttributeFromResponse
  };

  var Task = leaflet.Class.extend({

    options: {
      proxy: false,
      useCors: cors
    },

    // Generate a method for each methodName:paramName in the setters for this task.
    generateSetter: function (param, context) {
      return leaflet.Util.bind(function (value) {
        this.params[param] = value;
        return this;
      }, context);
    },

    initialize: function (endpoint) {
      // endpoint can be either a url (and options) for an ArcGIS Rest Service or an instance of EsriLeaflet.Service
      if (endpoint.request && endpoint.options) {
        this._service = endpoint;
        leaflet.Util.setOptions(this, endpoint.options);
      } else {
        leaflet.Util.setOptions(this, endpoint);
        this.options.url = cleanUrl(endpoint.url);
      }

      // clone default params into this object
      this.params = leaflet.Util.extend({}, this.params || {});

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

    apikey: function (apikey) {
      return this.token(apikey);
    },

    // ArcGIS Server Find/Identify 10.5+
    format: function (boolean) {
      // use double negative to expose a more intuitive positive method name
      this.params.returnUnformattedValues = !boolean;
      return this;
    },

    request: function (callback, context) {
      if (this.options.requestParams) {
        leaflet.Util.extend(this.params, this.options.requestParams);
      }
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
    options = getUrlParams(options);
    return new Task(options);
  }

  var Query = Task.extend({
    setters: {
      'offset': 'resultOffset',
      'limit': 'resultRecordCount',
      'fields': 'outFields',
      'precision': 'geometryPrecision',
      'featureIds': 'objectIds',
      'returnGeometry': 'returnGeometry',
      'returnM': 'returnM',
      'transform': 'datumTransformation',
      'token': 'token'
    },

    path: 'query',

    params: {
      returnGeometry: true,
      where: '1=1',
      outSR: 4326,
      outFields: '*'
    },

    // Returns a feature if its shape is wholly contained within the search geometry. Valid for all shape type combinations.
    within: function (geometry) {
      this._setGeometryParams(geometry);
      this.params.spatialRel = 'esriSpatialRelContains'; // to the REST api this reads geometry **contains** layer
      return this;
    },

    // Returns a feature if any spatial relationship is found. Applies to all shape type combinations.
    intersects: function (geometry) {
      this._setGeometryParams(geometry);
      this.params.spatialRel = 'esriSpatialRelIntersects';
      return this;
    },

    // Returns a feature if its shape wholly contains the search geometry. Valid for all shape type combinations.
    contains: function (geometry) {
      this._setGeometryParams(geometry);
      this.params.spatialRel = 'esriSpatialRelWithin'; // to the REST api this reads geometry **within** layer
      return this;
    },

    // Returns a feature if the intersection of the interiors of the two shapes is not empty and has a lower dimension than the maximum dimension of the two shapes. Two lines that share an endpoint in common do not cross. Valid for Line/Line, Line/Area, Multi-point/Area, and Multi-point/Line shape type combinations.
    crosses: function (geometry) {
      this._setGeometryParams(geometry);
      this.params.spatialRel = 'esriSpatialRelCrosses';
      return this;
    },

    // Returns a feature if the two shapes share a common boundary. However, the intersection of the interiors of the two shapes must be empty. In the Point/Line case, the point may touch an endpoint only of the line. Applies to all combinations except Point/Point.
    touches: function (geometry) {
      this._setGeometryParams(geometry);
      this.params.spatialRel = 'esriSpatialRelTouches';
      return this;
    },

    // Returns a feature if the intersection of the two shapes results in an object of the same dimension, but different from both of the shapes. Applies to Area/Area, Line/Line, and Multi-point/Multi-point shape type combinations.
    overlaps: function (geometry) {
      this._setGeometryParams(geometry);
      this.params.spatialRel = 'esriSpatialRelOverlaps';
      return this;
    },

    // Returns a feature if the envelope of the two shapes intersects.
    bboxIntersects: function (geometry) {
      this._setGeometryParams(geometry);
      this.params.spatialRel = 'esriSpatialRelEnvelopeIntersects';
      return this;
    },

    // if someone can help decipher the ArcObjects explanation and translate to plain speak, we should mention this method in the doc
    indexIntersects: function (geometry) {
      this._setGeometryParams(geometry);
      this.params.spatialRel = 'esriSpatialRelIndexIntersects'; // Returns a feature if the envelope of the query geometry intersects the index entry for the target geometry
      return this;
    },

    // only valid for Feature Services running on ArcGIS Server 10.3+ or ArcGIS Online
    nearby: function (latlng, radius) {
      latlng = leaflet.latLng(latlng);
      this.params.geometry = [latlng.lng, latlng.lat];
      this.params.geometryType = 'esriGeometryPoint';
      this.params.spatialRel = 'esriSpatialRelIntersects';
      this.params.units = 'esriSRUnit_Meter';
      this.params.distance = radius;
      this.params.inSR = 4326;
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

      // services hosted on ArcGIS Online and ArcGIS Server 10.3.1+ support requesting geojson directly
      if (this.options.isModern || (isArcgisOnline(this.options.url) && this.options.isModern === undefined)) {
        this.params.f = 'geojson';

        return this.request(function (error, response) {
          this._trapSQLerrors(error);
          callback.call(context, error, response, response);
        }, this);

        // otherwise convert it in the callback then pass it on
      } else {
        return this.request(function (error, response) {
          this._trapSQLerrors(error);
          callback.call(context, error, (response && responseToFeatureCollection(response)), response);
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

    // only valid for Feature Services running on ArcGIS Server 10.3+ or ArcGIS Online
    bounds: function (callback, context) {
      this._cleanParams();
      this.params.returnExtentOnly = true;
      return this.request(function (error, response) {
        if (response && response.extent && extentToBounds(response.extent)) {
          callback.call(context, error, extentToBounds(response.extent), response);
        } else {
          error = {
            message: 'Invalid Bounds'
          };
          callback.call(context, error, null, response);
        }
      }, context);
    },

    distinct: function () {
      // geometry must be omitted for queries requesting distinct values
      this.params.returnGeometry = false;
      this.params.returnDistinctValues = true;
      return this;
    },

    // only valid for image services
    pixelSize: function (rawPoint) {
      var castPoint = leaflet.point(rawPoint);
      this.params.pixelSize = [castPoint.x, castPoint.y];
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
          warn('one common syntax error in query requests is encasing string values in double quotes instead of single quotes');
        }
      }
    },

    _cleanParams: function () {
      delete this.params.returnIdsOnly;
      delete this.params.returnExtentOnly;
      delete this.params.returnCountOnly;
    },

    _setGeometryParams: function (geometry) {
      this.params.inSR = 4326;
      var converted = _setGeometry(geometry);
      this.params.geometry = converted.geometry;
      this.params.geometryType = converted.geometryType;
    }

  });

  function query (options) {
    return new Query(options);
  }

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
      // skipped implementing this (for now) because the REST service implementation isnt consistent between operations
      // 'transform': 'datumTransformations',
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
        callback.call(context, error, (response && responseToFeatureCollection(response)), response);
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

  var IdentifyFeatures = Identify.extend({
    setters: {
      'layers': 'layers',
      'precision': 'geometryPrecision',
      'tolerance': 'tolerance',
      // skipped implementing this (for now) because the REST service implementation isnt consistent between operations.
      // 'transform': 'datumTransformations'
      'returnGeometry': 'returnGeometry'
    },

    params: {
      sr: 4326,
      layers: 'all',
      tolerance: 3,
      returnGeometry: true
    },

    on: function (map) {
      var extent = boundsToExtent(map.getBounds());
      var size = map.getSize();
      this.params.imageDisplay = [size.x, size.y, 96];
      this.params.mapExtent = [extent.xmin, extent.ymin, extent.xmax, extent.ymax];
      return this;
    },

    at: function (geometry) {
      // cast lat, long pairs in raw array form manually
      if (geometry.length === 2) {
        geometry = leaflet.latLng(geometry);
      }
      this._setGeometryParams(geometry);
      return this;
    },

    layerDef: function (id, where) {
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
        // immediately invoke with an error
        if (error) {
          callback.call(context, error, undefined, response);
          return;

        // ok no error lets just assume we have features...
        } else {
          var featureCollection = responseToFeatureCollection(response);
          response.results = response.results.reverse();
          for (var i = 0; i < featureCollection.features.length; i++) {
            var feature = featureCollection.features[i];
            feature.layerId = response.results[i].layerId;
          }
          callback.call(context, undefined, featureCollection, response);
        }
      });
    },

    _setGeometryParams: function (geometry) {
      var converted = _setGeometry(geometry);
      this.params.geometry = converted.geometry;
      this.params.geometryType = converted.geometryType;
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
      latlng = leaflet.latLng(latlng);
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
        geoJSON.catalogItems = responseToFeatureCollection(catalogItems);
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

  var Service = leaflet.Evented.extend({

    options: {
      proxy: false,
      useCors: cors,
      timeout: 0
    },

    initialize: function (options) {
      options = options || {};
      this._requestQueue = [];
      this._authenticating = false;
      leaflet.Util.setOptions(this, options);
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

    getTimeout: function () {
      return this.options.timeout;
    },

    setTimeout: function (timeout) {
      this.options.timeout = timeout;
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
      if (this.options.requestParams) {
        leaflet.Util.extend(params, this.options.requestParams);
      }
      if (this._authenticating) {
        this._requestQueue.push([method, path, params, callback, context]);
        return;
      } else {
        var url = (this.options.proxy) ? this.options.proxy + '?' + this.options.url + path : this.options.url + path;

        if ((method === 'get' || method === 'request') && !this.options.useCors) {
          return Request.get.JSONP(url, params, wrappedCallback, context);
        } else {
          return Request[method](url, params, wrappedCallback, context);
        }
      }
    },

    _createServiceCallback: function (method, path, params, callback, context) {
      return leaflet.Util.bind(function (error, response) {
        if (error && (error.code === 499 || error.code === 498)) {
          this._authenticating = true;

          this._requestQueue.push([method, path, params, callback, context]);

          // fire an event for users to handle and re-authenticate
          this.fire('authenticationrequired', {
            authenticate: leaflet.Util.bind(this.authenticate, this)
          }, true);

          // if the user has access to a callback they can handle the auth error
          error.authenticate = leaflet.Util.bind(this.authenticate, this);
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
    options = getUrlParams(options);
    return new Service(options);
  }

  var MapService = Service.extend({

    identify: function () {
      return identifyFeatures(this);
    },

    find: function () {
      return find(this);
    },

    query: function () {
      return query(this);
    }

  });

  function mapService (options) {
    return new MapService(options);
  }

  var ImageService = Service.extend({

    query: function () {
      return query(this);
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
      return query(this);
    },

    addFeature: function (feature, callback, context) {
      this.addFeatures(feature, callback, context);
    },

    addFeatures: function (features, callback, context) {
      var featuresArray = features.features ? features.features : [features];
      for (var i = featuresArray.length - 1; i >= 0; i--) {
        delete featuresArray[i].id;
      }
      features = geojsonToArcGIS$1(features);
      features = featuresArray.length > 1 ? features : [features];
      return this.post('addFeatures', {
        features: features
      }, function (error, response) {
        // For compatibility reason with former addFeature function,
        // we return the object in the array and not the array itself
        var result = (response && response.addResults) ? response.addResults.length > 1 ? response.addResults : response.addResults[0] : undefined;
        if (callback) {
          callback.call(context, error || response.addResults[0].error, result);
        }
      }, context);
    },

    updateFeature: function (feature, callback, context) {
      this.updateFeatures(feature, callback, context);
    },

    updateFeatures: function (features, callback, context) {
      var featuresArray = features.features ? features.features : [features];
      features = geojsonToArcGIS$1(features, this.options.idAttribute);
      features = featuresArray.length > 1 ? features : [features];

      return this.post('updateFeatures', {
        features: features
      }, function (error, response) {
        // For compatibility reason with former updateFeature function,
        // we return the object in the array and not the array itself
        var result = (response && response.updateResults) ? response.updateResults.length > 1 ? response.updateResults : response.updateResults[0] : undefined;
        if (callback) {
          callback.call(context, error || response.updateResults[0].error, result);
        }
      }, context);
    },

    deleteFeature: function (id, callback, context) {
      this.deleteFeatures(id, callback, context);
    },

    deleteFeatures: function (ids, callback, context) {
      return this.post('deleteFeatures', {
        objectIds: ids
      }, function (error, response) {
        // For compatibility reason with former deleteFeature function,
        // we return the object in the array and not the array itself
        var result = (response && response.deleteResults) ? response.deleteResults.length > 1 ? response.deleteResults : response.deleteResults[0] : undefined;
        if (callback) {
          callback.call(context, error || response.deleteResults[0].error, result);
        }
      }, context);
    }
  });

  function featureLayerService (options) {
    return new FeatureLayerService(options);
  }

  var tileProtocol = (window.location.protocol !== 'https:') ? 'http:' : 'https:';

  var BasemapLayer = leaflet.TileLayer.extend({
    statics: {
      TILES: {
        Streets: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services'],
            attribution: 'USGS, NOAA',
            attributionUrl: 'https://static.arcgis.com/attribution/World_Street_Map'
          }
        },
        Topographic: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services'],
            attribution: 'USGS, NOAA',
            attributionUrl: 'https://static.arcgis.com/attribution/World_Topo_Map'
          }
        },
        Oceans: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            attribution: 'USGS, NOAA',
            attributionUrl: 'https://static.arcgis.com/attribution/Ocean_Basemap'
          }
        },
        OceansLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            pane: (pointerEvents) ? 'esri-labels' : 'tilePane',
            attribution: ''
          }
        },
        NationalGeographic: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            attribution: 'National Geographic, DeLorme, HERE, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, increment P Corp.'
          }
        },
        DarkGray: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            attribution: 'HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors'
          }
        },
        DarkGrayLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            pane: (pointerEvents) ? 'esri-labels' : 'tilePane',
            attribution: ''

          }
        },
        Gray: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            attribution: 'HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors'
          }
        },
        GrayLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 16,
            subdomains: ['server', 'services'],
            pane: (pointerEvents) ? 'esri-labels' : 'tilePane',
            attribution: ''
          }
        },
        Imagery: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services'],
            attribution: 'DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community',
            attributionUrl: 'https://static.arcgis.com/attribution/World_Imagery'
          }
        },
        ImageryLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services'],
            pane: (pointerEvents) ? 'esri-labels' : 'tilePane',
            attribution: ''
          }
        },
        ImageryTransportation: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 19,
            subdomains: ['server', 'services'],
            pane: (pointerEvents) ? 'esri-labels' : 'tilePane',
            attribution: ''
          }
        },
        ShadedRelief: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 13,
            subdomains: ['server', 'services'],
            attribution: 'USGS'
          }
        },
        ShadedReliefLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 12,
            subdomains: ['server', 'services'],
            pane: (pointerEvents) ? 'esri-labels' : 'tilePane',
            attribution: ''
          }
        },
        Terrain: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 13,
            subdomains: ['server', 'services'],
            attribution: 'USGS, NOAA'
          }
        },
        TerrainLabels: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 13,
            subdomains: ['server', 'services'],
            pane: (pointerEvents) ? 'esri-labels' : 'tilePane',
            attribution: ''
          }
        },
        USATopo: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 15,
            subdomains: ['server', 'services'],
            attribution: 'USGS, National Geographic Society, i-cubed'
          }
        },
        ImageryClarity: {
          urlTemplate: tileProtocol + '//clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 19,
            attribution: 'Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
          }
        },
        Physical: {
          urlTemplate: tileProtocol + '//{s}.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 8,
            subdomains: ['server', 'services'],
            attribution: 'U.S. National Park Service'
          }
        },
        ImageryFirefly: {
          urlTemplate: tileProtocol + '//fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}',
          options: {
            minZoom: 1,
            maxZoom: 19,
            attribution: 'Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
            attributionUrl: 'https://static.arcgis.com/attribution/World_Imagery'
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
        throw new Error('L.esri.BasemapLayer: Invalid parameter. Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Physical", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ImageryClarity", "ImageryFirefly", ShadedRelief", "ShadedReliefLabels", "Terrain", "TerrainLabels" or "USATopo"');
      }

      // merge passed options into the config options
      var tileOptions = leaflet.Util.extend(config.options, options);

      leaflet.Util.setOptions(this, tileOptions);

      if (this.options.token && config.urlTemplate.indexOf('token=') === -1) {
        config.urlTemplate += ('?token=' + this.options.token);
      }
      if (this.options.proxy) {
        config.urlTemplate = this.options.proxy + '?' + config.urlTemplate;
      }

      // call the initialize method on L.TileLayer to set everything up
      leaflet.TileLayer.prototype.initialize.call(this, config.urlTemplate, tileOptions);
    },

    onAdd: function (map) {
      // include 'Powered by Esri' in map attribution
      setEsriAttribution(map);

      if (this.options.pane === 'esri-labels') {
        this._initPane();
      }
      // some basemaps can supply dynamic attribution
      if (this.options.attributionUrl) {
        _getAttributionData((this.options.proxy ? this.options.proxy + '?' : '') + this.options.attributionUrl, map);
      }

      map.on('moveend', _updateMapAttribution);

      leaflet.TileLayer.prototype.onAdd.call(this, map);
    },

    onRemove: function (map) {
      removeEsriAttribution(map);

      map.off('moveend', _updateMapAttribution);

      leaflet.TileLayer.prototype.onRemove.call(this, map);
    },

    _initPane: function () {
      if (!this._map.getPane(this.options.pane)) {
        var pane = this._map.createPane(this.options.pane);
        pane.style.pointerEvents = 'none';
        pane.style.zIndex = 500;
      }
    },

    getAttribution: function () {
      if (this.options.attribution) {
        var attribution = '<span class="esri-dynamic-attribution">' + this.options.attribution + '</span>';
      }
      return attribution;
    }
  });

  function basemapLayer (key, options) {
    return new BasemapLayer(key, options);
  }

  var TiledMapLayer = leaflet.TileLayer.extend({
    options: {
      zoomOffsetAllowance: 0.1,
      errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAA1BMVEUzNDVszlHHAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAAAAAAAAAB6mUWpAAAADZJREFUeJztwQEBAAAAgiD/r25IQAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7waBAAABw08RwAAAAABJRU5ErkJggg=='
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
      options = leaflet.Util.setOptions(this, options);

      // set the urls
      options = getUrlParams(options);
      this.tileUrl = (options.proxy ? options.proxy + '?' : '') + options.url + 'tile/{z}/{y}/{x}' + (options.requestParams && Object.keys(options.requestParams).length > 0 ? leaflet.Util.getParamString(options.requestParams) : '');
      // Remove subdomain in url
      // https://github.com/Esri/esri-leaflet/issues/991
      if (options.url.indexOf('{s}') !== -1 && options.subdomains) {
        options.url = options.url.replace('{s}', options.subdomains[0]);
      }
      this.service = mapService(options);
      this.service.addEventParent(this);

      var arcgisonline = new RegExp(/tiles.arcgis(online)?\.com/g);
      if (arcgisonline.test(options.url)) {
        this.tileUrl = this.tileUrl.replace('://tiles', '://tiles{s}');
        options.subdomains = ['1', '2', '3', '4'];
      }

      if (this.options.token) {
        this.tileUrl += ('?token=' + this.options.token);
      }

      // init layer by calling TileLayers initialize method
      leaflet.TileLayer.prototype.initialize.call(this, this.tileUrl, options);
    },

    getTileUrl: function (tilePoint) {
      var zoom = this._getZoomForUrl();

      return leaflet.Util.template(this.tileUrl, leaflet.Util.extend({
        s: this._getSubdomain(tilePoint),
        x: tilePoint.x,
        y: tilePoint.y,
        // try lod map first, then just default to zoom level
        z: (this._lodMap && this._lodMap[zoom]) ? this._lodMap[zoom] : zoom
      }, this.options));
    },

    createTile: function (coords, done) {
      var tile = document.createElement('img');

      leaflet.DomEvent.on(tile, 'load', leaflet.Util.bind(this._tileOnLoad, this, done, tile));
      leaflet.DomEvent.on(tile, 'error', leaflet.Util.bind(this._tileOnError, this, done, tile));

      if (this.options.crossOrigin) {
        tile.crossOrigin = '';
      }

      /*
       Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
       http://www.w3.org/TR/WCAG20-TECHS/H67
      */
      tile.alt = '';

      // if there is no lod map or an lod map with a proper zoom load the tile
      // otherwise wait for the lod map to become available
      if (!this._lodMap || (this._lodMap && this._lodMap[this._getZoomForUrl()])) {
        tile.src = this.getTileUrl(coords);
      } else {
        this.once('lodmap', function () {
          tile.src = this.getTileUrl(coords);
        }, this);
      }

      return tile;
    },

    onAdd: function (map) {
      // include 'Powered by Esri' in map attribution
      setEsriAttribution(map);

      if (!this._lodMap) {
        this.metadata(function (error, metadata) {
          if (!error && metadata.spatialReference) {
            var sr = metadata.spatialReference.latestWkid || metadata.spatialReference.wkid;
            // display the copyright text from the service using leaflet's attribution control
            if (!this.options.attribution && map.attributionControl && metadata.copyrightText) {
              this.options.attribution = metadata.copyrightText;
              map.attributionControl.addAttribution(this.getAttribution());
            }

            // if the service tiles were published in web mercator using conventional LODs but missing levels, we can try and remap them
            if (map.options.crs === leaflet.CRS.EPSG3857 && (sr === 102100 || sr === 3857)) {
              this._lodMap = {};
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

              this.fire('lodmap');
            } else if (map.options.crs && map.options.crs.code && (map.options.crs.code.indexOf(sr) > -1)) ; else {
              // if the service was cached in a custom projection and an appropriate LOD hasn't been defined in the map, guide the developer to our Proj4 sample
              warn('L.esri.TiledMapLayer is using a non-mercator spatial reference. Support may be available through Proj4Leaflet http://esri.github.io/esri-leaflet/examples/non-mercator-projection.html');
            }
          }
        }, this);
      }

      leaflet.TileLayer.prototype.onAdd.call(this, map);
    },

    onRemove: function (map) {
      removeEsriAttribution(map);

      leaflet.TileLayer.prototype.onRemove.call(this, map);
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

  var Overlay = leaflet.ImageOverlay.extend({
    onAdd: function (map) {
      this._topLeft = map.getPixelBounds().min;
      leaflet.ImageOverlay.prototype.onAdd.call(this, map);
    },
    _reset: function () {
      if (this._map.options.crs === leaflet.CRS.EPSG3857) {
        leaflet.ImageOverlay.prototype._reset.call(this);
      } else {
        leaflet.DomUtil.setPosition(this._image, this._topLeft.subtract(this._map.getPixelOrigin()));
      }
    }
  });

  var RasterLayer = leaflet.Layer.extend({
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
      // include 'Powered by Esri' in map attribution
      setEsriAttribution(map);

      if (this.options.zIndex) {
        this.options.position = null;
      }

      this._update = leaflet.Util.throttle(this._update, this.options.updateInterval, this);

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

      // add copyright text listed in service metadata
      this.metadata(function (err, metadata) {
        if (!err && !this.options.attribution && map.attributionControl && metadata.copyrightText) {
          this.options.attribution = metadata.copyrightText;
          map.attributionControl.addAttribution(this.getAttribution());
        }
      }, this);
    },

    onRemove: function (map) {
      removeEsriAttribution(map);

      if (this._currentImage) {
        this._map.removeLayer(this._currentImage);
      }

      if (this._popup) {
        this._map.off('click', this._getPopupData, this);
        this._map.off('dblclick', this._resetPopupState, this);
      }

      this._map.off('moveend', this._update, this);
    },

    bindPopup: function (fn, popupOptions) {
      this._shouldRenderPopup = false;
      this._lastClick = false;
      this._popup = leaflet.popup(popupOptions);
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
        this._setAutoZIndex(Math.max);
      }
      return this;
    },

    bringToBack: function () {
      this.options.position = 'back';
      if (this._currentImage) {
        this._currentImage.bringToBack();
        this._setAutoZIndex(Math.min);
      }
      return this;
    },

    setZIndex: function (value) {
      this.options.zIndex = value;
      if (this._currentImage) {
        this._currentImage.setZIndex(value);
      }
      return this;
    },

    _setAutoZIndex: function (compare) {
      // go through all other layers of the same pane, set zIndex to max + 1 (front) or min - 1 (back)
      if (!this._currentImage) {
        return;
      }
      var layers = this._currentImage.getPane().children;
      var edgeZIndex = -compare(-Infinity, Infinity); // -Infinity for max, Infinity for min
      for (var i = 0, len = layers.length, zIndex; i < len; i++) {
        zIndex = layers[i].style.zIndex;
        if (layers[i] !== this._currentImage._image && zIndex) {
          edgeZIndex = compare(edgeZIndex, +zIndex);
        }
      }

      if (isFinite(edgeZIndex)) {
        this.options.zIndex = edgeZIndex + compare(-1, 1);
        this.setZIndex(this.options.zIndex);
      }
    },

    getAttribution: function () {
      return this.options.attribution;
    },

    getOpacity: function () {
      return this.options.opacity;
    },

    setOpacity: function (opacity) {
      this.options.opacity = opacity;
      if (this._currentImage) {
        this._currentImage.setOpacity(opacity);
      }
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

    redraw: function () {
      this._update();
    },

    _renderImage: function (url, bounds, contentType) {
      if (this._map) {
        // if no output directory has been specified for a service, MIME data will be returned
        if (contentType) {
          url = 'data:' + contentType + ';base64,' + url;
        }

        // if server returns an inappropriate response, abort.
        if (!url) return;

        // create a new image overlay and add it to the map
        // to start loading the image
        // opacity is 0 while the image is loading
        var image = new Overlay(url, bounds, {
          opacity: 0,
          crossOrigin: this.options.withCredentials ? 'use-credentials' : this.options.useCors,
          alt: this.options.alt,
          pane: this.options.pane || this.getPane(),
          interactive: this.options.interactive
        }).addTo(this._map);

        var onOverlayError = function () {
          this._map.removeLayer(image);
          this.fire('error');
          image.off('load', onOverlayLoad, this);
        };

        var onOverlayLoad = function (e) {
          image.off('error', onOverlayLoad, this);
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
              } else if (this.options.position === 'back') {
                this.bringToBack();
              }

              if (this.options.zIndex) {
                this.setZIndex(this.options.zIndex);
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
        };

        // If loading the image fails
        image.once('error', onOverlayError, this);

        // once the image loads
        image.once('load', onOverlayLoad, this);
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
        if (this._currentImage) {
          this._currentImage._map.removeLayer(this._currentImage);
          this._currentImage = null;
        }
        return;
      }

      var params = this._buildExportParams();
      leaflet.Util.extend(params, this.options.requestParams);

      if (params) {
        this._requestExport(params, bounds);

        this.fire('loading', {
          bounds: bounds
        });
      } else if (this._currentImage) {
        this._currentImage._map.removeLayer(this._currentImage);
        this._currentImage = null;
      }
    },

    _renderPopup: function (latlng, error, results, response) {
      latlng = leaflet.latLng(latlng);
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
    },

    _calculateBbox: function () {
      var pixelBounds = this._map.getPixelBounds();

      var sw = this._map.unproject(pixelBounds.getBottomLeft());
      var ne = this._map.unproject(pixelBounds.getTopRight());

      var neProjected = this._map.options.crs.project(ne);
      var swProjected = this._map.options.crs.project(sw);

      // this ensures ne/sw are switched in polar maps where north/top bottom/south is inverted
      var boundsProjected = leaflet.bounds(neProjected, swProjected);

      return [boundsProjected.getBottomLeft().x, boundsProjected.getBottomLeft().y, boundsProjected.getTopRight().x, boundsProjected.getTopRight().y].join(',');
    },

    _calculateImageSize: function () {
      // ensure that we don't ask ArcGIS Server for a taller image than we have actual map displaying within the div
      var bounds = this._map.getPixelBounds();
      var size = this._map.getSize();

      var sw = this._map.unproject(bounds.getBottomLeft());
      var ne = this._map.unproject(bounds.getTopRight());

      var top = this._map.latLngToLayerPoint(ne).y;
      var bottom = this._map.latLngToLayerPoint(sw).y;

      if (top > 0 || bottom < size.y) {
        size.y = bottom - top;
      }

      return size.x + ',' + size.y;
    }
  });

  var ImageMapLayer = RasterLayer.extend({

    options: {
      updateInterval: 150,
      format: 'jpgpng',
      transparent: true,
      f: 'image'
    },

    query: function () {
      return this.service.query();
    },

    identify: function () {
      return this.service.identify();
    },

    initialize: function (options) {
      options = getUrlParams(options);
      this.service = imageService(options);
      this.service.addEventParent(this);

      leaflet.Util.setOptions(this, options);
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
      if (leaflet.Util.isArray(bandIds)) {
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
      if (leaflet.Util.isArray(noData)) {
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
      var callback = leaflet.Util.bind(function (error, results, response) {
        if (error) { return; } // we really can't do anything here but authenticate or requesterror will fire
        setTimeout(leaflet.Util.bind(function () {
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
      var sr = parseInt(this._map.options.crs.code.split(':')[1], 10);

      var params = {
        bbox: this._calculateBbox(),
        size: this._calculateImageSize(),
        format: this.options.format,
        transparent: this.options.transparent,
        bboxSR: sr,
        imageSR: sr
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

      // 0 is falsy *and* a valid input parameter
      if (this.options.noData === 0 || this.options.noData) {
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
        this.service.request('exportImage', params, function (error, response) {
          if (error) { return; } // we really can't do anything here but authenticate or requesterror will fire
          if (this.options.token) {
            response.href += ('?token=' + this.options.token);
          }
          if (this.options.proxy) {
            response.href = this.options.proxy + '?' + response.href;
          }
          this._renderImage(response.href, bounds);
        }, this);
      } else {
        params.f = 'image';
        var fullUrl = this.options.url + 'exportImage' + leaflet.Util.getParamString(params);
        if (this.options.proxy) {
          fullUrl = this.options.proxy + '?' + fullUrl;
        }
        this._renderImage(fullUrl, bounds);
      }
    }
  });

  function imageMapLayer (url, options) {
    return new ImageMapLayer(url, options);
  }

  var DynamicMapLayer = RasterLayer.extend({

    options: {
      updateInterval: 150,
      layers: false,
      layerDefs: false,
      timeOptions: false,
      format: 'png32',
      transparent: true,
      f: 'json'
    },

    initialize: function (options) {
      options = getUrlParams(options);
      this.service = mapService(options);
      this.service.addEventParent(this);

      leaflet.Util.setOptions(this, options);
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
      var callback = leaflet.Util.bind(function (error, featureCollection, response) {
        if (error) { return; } // we really can't do anything here but authenticate or requesterror will fire
        setTimeout(leaflet.Util.bind(function () {
          this._renderPopup(e.latlng, error, featureCollection, response);
        }, this), 300);
      }, this);

      var identifyRequest;
      if (this.options.popup) {
        identifyRequest = this.options.popup.on(this._map).at(e.latlng);
      } else {
        identifyRequest = this.identify().on(this._map).at(e.latlng);
      }

      // remove extraneous vertices from response features if it has not already been done
      identifyRequest.params.maxAllowableOffset ? true : identifyRequest.simplify(this._map, 0.5);

      if (!(this.options.popup && this.options.popup.params && this.options.popup.params.layers)) {
        if (this.options.layers) {
          identifyRequest.layers('visible:' + this.options.layers.join(','));
        } else {
          identifyRequest.layers('visible');
        }
      }

      // if present, pass layer ids and sql filters through to the identify task
      if (this.options.layerDefs && typeof this.options.layerDefs !== 'string' && !identifyRequest.params.layerDefs) {
        for (var id in this.options.layerDefs) {
          if (this.options.layerDefs.hasOwnProperty(id)) {
            identifyRequest.layerDef(id, this.options.layerDefs[id]);
          }
        }
      }

      identifyRequest.run(callback);

      // set the flags to show the popup
      this._shouldRenderPopup = true;
      this._lastClick = e.latlng;
    },

    _buildExportParams: function () {
      var sr = parseInt(this._map.options.crs.code.split(':')[1], 10);

      var params = {
        bbox: this._calculateBbox(),
        size: this._calculateImageSize(),
        dpi: 96,
        format: this.options.format,
        transparent: this.options.transparent,
        bboxSR: sr,
        imageSR: sr
      };

      if (this.options.dynamicLayers) {
        params.dynamicLayers = this.options.dynamicLayers;
      }

      if (this.options.layers) {
        if (this.options.layers.length === 0) {
          return;
        } else {
          params.layers = 'show:' + this.options.layers.join(',');
        }
      }

      if (this.options.layerDefs) {
        params.layerDefs = typeof this.options.layerDefs === 'string' ? this.options.layerDefs : JSON.stringify(this.options.layerDefs);
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

      if (this.options.proxy) {
        params.proxy = this.options.proxy;
      }

      // use a timestamp to bust server cache
      if (this.options.disableCache) {
        params._ts = Date.now();
      }

      return params;
    },

    _requestExport: function (params, bounds) {
      if (this.options.f === 'json') {
        this.service.request('export', params, function (error, response) {
          if (error) { return; } // we really can't do anything here but authenticate or requesterror will fire

          if (this.options.token && response.href) {
            response.href += ('?token=' + this.options.token);
          }
          if (this.options.proxy && response.href) {
            response.href = this.options.proxy + '?' + response.href;
          }
          if (response.href) {
            this._renderImage(response.href, bounds);
          } else {
            this._renderImage(response.imageData, bounds, response.contentType);
          }
        }, this);
      } else {
        params.f = 'image';
        var fullUrl = this.options.url + 'export' + leaflet.Util.getParamString(params);
        if (this.options.proxy) {
          fullUrl = this.options.proxy + '?' + fullUrl;
        }
        this._renderImage(fullUrl, bounds);
      }
    }
  });

  function dynamicMapLayer (url, options) {
    return new DynamicMapLayer(url, options);
  }

  var FeatureGrid = leaflet.Layer.extend({
    // @section
    // @aka GridLayer options
    options: {
      // @option cellSize: Number|Point = 256
      // Width and height of cells in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
      cellSize: 512,

      // @option updateWhenIdle: Boolean = (depends)
      // Load new cells only when panning ends.
      // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
      // `false` otherwise in order to display new cells _during_ panning, since it is easy to pan outside the
      // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
      updateWhenIdle: leaflet.Browser.mobile,

      // @option updateInterval: Number = 150
      // Cells will not update more than once every `updateInterval` milliseconds when panning.
      updateInterval: 150,

      // @option noWrap: Boolean = false
      // Whether the layer is wrapped around the antimeridian. If `true`, the
      // GridLayer will only be displayed once at low zoom levels. Has no
      // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
      // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
      // cells outside the CRS limits.
      noWrap: false,

      // @option keepBuffer: Number = 1.5
      // When panning the map, keep this many rows and columns of cells before unloading them.
      keepBuffer: 1.5
    },

    initialize: function (options) {
      leaflet.Util.setOptions(this, options);
    },

    onAdd: function (map) {
      this._cells = {};
      this._activeCells = {};
      this._resetView();
      this._update();
    },

    onRemove: function (map) {
      this._removeAllCells();
      this._cellZoom = undefined;
    },

    // @method isLoading: Boolean
    // Returns `true` if any cell in the grid layer has not finished loading.
    isLoading: function () {
      return this._loading;
    },

    // @method redraw: this
    // Causes the layer to clear all the cells and request them again.
    redraw: function () {
      if (this._map) {
        this._removeAllCells();
        this._update();
      }
      return this;
    },

    getEvents: function () {
      var events = {
        viewprereset: this._invalidateAll,
        viewreset: this._resetView,
        zoom: this._resetView,
        moveend: this._onMoveEnd
      };

      if (!this.options.updateWhenIdle) {
        // update cells on move, but not more often than once per given interval
        if (!this._onMove) {
          this._onMove = leaflet.Util.throttle(
            this._onMoveEnd,
            this.options.updateInterval,
            this
          );
        }

        events.move = this._onMove;
      }

      return events;
    },

    // @section Extension methods
    // Layers extending `GridLayer` shall reimplement the following method.
    // @method createCell(coords: Object, done?: Function): HTMLElement
    // Called only internally, must be overridden by classes extending `GridLayer`.
    // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
    // is specified, it must be called when the cell has finished loading and drawing.
    createCell: function () {
      return document.createElement('div');
    },

    removeCell: function () {
      return;
    },

    reuseCell: function () {
      return;
    },

    cellLeave: function () {
      return;
    },

    cellEnter: function () {
      return;
    },
    // @section
    // @method getCellSize: Point
    // Normalizes the [cellSize option](#gridlayer-cellsize) into a point. Used by the `createCell()` method.
    getCellSize: function () {
      var s = this.options.cellSize;
      return s instanceof leaflet.Point ? s : new leaflet.Point(s, s);
    },

    _pruneCells: function () {
      if (!this._map) {
        return;
      }

      var key, cell;

      for (key in this._cells) {
        cell = this._cells[key];
        cell.retain = cell.current;
      }

      for (key in this._cells) {
        cell = this._cells[key];
        if (cell.current && !cell.active) {
          var coords = cell.coords;
          if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
            this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
          }
        }
      }

      for (key in this._cells) {
        if (!this._cells[key].retain) {
          this._removeCell(key);
        }
      }
    },

    _removeAllCells: function () {
      for (var key in this._cells) {
        this._removeCell(key);
      }
    },

    _invalidateAll: function () {
      this._removeAllCells();

      this._cellZoom = undefined;
    },

    _retainParent: function (x, y, z, minZoom) {
      var x2 = Math.floor(x / 2);
      var y2 = Math.floor(y / 2);
      var z2 = z - 1;
      var coords2 = new leaflet.Point(+x2, +y2);
      coords2.z = +z2;

      var key = this._cellCoordsToKey(coords2);
      var cell = this._cells[key];

      if (cell && cell.active) {
        cell.retain = true;
        return true;
      } else if (cell && cell.loaded) {
        cell.retain = true;
      }

      if (z2 > minZoom) {
        return this._retainParent(x2, y2, z2, minZoom);
      }

      return false;
    },

    _retainChildren: function (x, y, z, maxZoom) {
      for (var i = 2 * x; i < 2 * x + 2; i++) {
        for (var j = 2 * y; j < 2 * y + 2; j++) {
          var coords = new leaflet.Point(i, j);
          coords.z = z + 1;

          var key = this._cellCoordsToKey(coords);
          var cell = this._cells[key];

          if (cell && cell.active) {
            cell.retain = true;
            continue;
          } else if (cell && cell.loaded) {
            cell.retain = true;
          }

          if (z + 1 < maxZoom) {
            this._retainChildren(i, j, z + 1, maxZoom);
          }
        }
      }
    },

    _resetView: function (e) {
      var animating = e && (e.pinch || e.flyTo);

      if (animating) {
        return;
      }

      this._setView(
        this._map.getCenter(),
        this._map.getZoom(),
        animating,
        animating
      );
    },

    _setView: function (center, zoom, noPrune, noUpdate) {
      var cellZoom = Math.round(zoom);

      if (!noUpdate) {
        this._cellZoom = cellZoom;

        if (this._abortLoading) {
          this._abortLoading();
        }

        this._resetGrid();

        if (cellZoom !== undefined) {
          this._update(center);
        }

        if (!noPrune) {
          this._pruneCells();
        }

        // Flag to prevent _updateOpacity from pruning cells during
        // a zoom anim or a pinch gesture
        this._noPrune = !!noPrune;
      }
    },

    _resetGrid: function () {
      var map = this._map;
      var crs = map.options.crs;
      var cellSize = (this._cellSize = this.getCellSize());
      var cellZoom = this._cellZoom;

      var bounds = this._map.getPixelWorldBounds(this._cellZoom);
      if (bounds) {
        this._globalCellRange = this._pxBoundsToCellRange(bounds);
      }

      this._wrapX = crs.wrapLng &&
        !this.options.noWrap && [
          Math.floor(map.project([0, crs.wrapLng[0]], cellZoom).x / cellSize.x),
          Math.ceil(map.project([0, crs.wrapLng[1]], cellZoom).x / cellSize.y)
        ];
      this._wrapY = crs.wrapLat &&
        !this.options.noWrap && [
          Math.floor(map.project([crs.wrapLat[0], 0], cellZoom).y / cellSize.x),
          Math.ceil(map.project([crs.wrapLat[1], 0], cellZoom).y / cellSize.y)
        ];
    },

    _onMoveEnd: function (e) {
      var animating = e && (e.pinch || e.flyTo);

      if (animating || !this._map || this._map._animatingZoom) {
        return;
      }

      this._update();
    },

    _getCelldPixelBounds: function (center) {
      var map = this._map;
      var mapZoom = map._animatingZoom
        ? Math.max(map._animateToZoom, map.getZoom())
        : map.getZoom();
      var scale = map.getZoomScale(mapZoom, this._cellZoom);
      var pixelCenter = map.project(center, this._cellZoom).floor();
      var halfSize = map.getSize().divideBy(scale * 2);

      return new leaflet.Bounds(
        pixelCenter.subtract(halfSize),
        pixelCenter.add(halfSize)
      );
    },

    // Private method to load cells in the grid's active zoom level according to map bounds
    _update: function (center) {
      var map = this._map;
      if (!map) {
        return;
      }
      var zoom = Math.round(map.getZoom());

      if (center === undefined) {
        center = map.getCenter();
      }

      var pixelBounds = this._getCelldPixelBounds(center);
      var cellRange = this._pxBoundsToCellRange(pixelBounds);
      var cellCenter = cellRange.getCenter();
      var queue = [];
      var margin = this.options.keepBuffer;
      var noPruneRange = new leaflet.Bounds(
        cellRange.getBottomLeft().subtract([margin, -margin]),
        cellRange.getTopRight().add([margin, -margin])
      );

      // Sanity check: panic if the cell range contains Infinity somewhere.
      if (
        !(
          isFinite(cellRange.min.x) &&
          isFinite(cellRange.min.y) &&
          isFinite(cellRange.max.x) &&
          isFinite(cellRange.max.y)
        )
      ) {
        throw new Error('Attempted to load an infinite number of cells');
      }

      for (var key in this._cells) {
        var c = this._cells[key].coords;
        if (
          c.z !== this._cellZoom ||
          !noPruneRange.contains(new leaflet.Point(c.x, c.y))
        ) {
          this._cells[key].current = false;
        }
      }

      // _update just loads more cells. If the cell zoom level differs too much
      // from the map's, let _setView reset levels and prune old cells.
      if (Math.abs(zoom - this._cellZoom) > 1) {
        this._setView(center, zoom);
        return;
      }

      // create a queue of coordinates to load cells from
      for (var j = cellRange.min.y; j <= cellRange.max.y; j++) {
        for (var i = cellRange.min.x; i <= cellRange.max.x; i++) {
          var coords = new leaflet.Point(i, j);
          coords.z = this._cellZoom;

          if (!this._isValidCell(coords)) {
            continue;
          }

          var cell = this._cells[this._cellCoordsToKey(coords)];
          if (cell) {
            cell.current = true;
          } else {
            queue.push(coords);
          }
        }
      }

      // sort cell queue to load cells in order of their distance to center
      queue.sort(function (a, b) {
        return a.distanceTo(cellCenter) - b.distanceTo(cellCenter);
      });

      if (queue.length !== 0) {
        // if it's the first batch of cells to load
        if (!this._loading) {
          this._loading = true;
        }

        for (i = 0; i < queue.length; i++) {
          var _key = this._cellCoordsToKey(queue[i]);
          var _coords = this._keyToCellCoords(_key);
          if (this._activeCells[_coords]) {
            this._reuseCell(queue[i]);
          } else {
            this._createCell(queue[i]);
          }
        }
      }
    },

    _isValidCell: function (coords) {
      var crs = this._map.options.crs;

      if (!crs.infinite) {
        // don't load cell if it's out of bounds and not wrapped
        var bounds = this._globalCellRange;
        if (
          (!crs.wrapLng &&
            (coords.x < bounds.min.x || coords.x > bounds.max.x)) ||
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
      return leaflet.toLatLngBounds(this.options.bounds).overlaps(cellBounds);
    },

    _keyToBounds: function (key) {
      return this._cellCoordsToBounds(this._keyToCellCoords(key));
    },

    _cellCoordsToNwSe: function (coords) {
      var map = this._map;
      var cellSize = this.getCellSize();
      var nwPoint = coords.scaleBy(cellSize);
      var sePoint = nwPoint.add(cellSize);
      var nw = map.unproject(nwPoint, coords.z);
      var se = map.unproject(sePoint, coords.z);

      return [nw, se];
    },

    // converts cell coordinates to its geographical bounds
    _cellCoordsToBounds: function (coords) {
      var bp = this._cellCoordsToNwSe(coords);
      var bounds = new leaflet.LatLngBounds(bp[0], bp[1]);

      if (!this.options.noWrap) {
        bounds = this._map.wrapLatLngBounds(bounds);
      }
      return bounds;
    },
    // converts cell coordinates to key for the cell cache
    _cellCoordsToKey: function (coords) {
      return coords.x + ':' + coords.y + ':' + coords.z;
    },

    // converts cell cache key to coordinates
    _keyToCellCoords: function (key) {
      var k = key.split(':');
      var coords = new leaflet.Point(+k[0], +k[1]);

      coords.z = +k[2];
      return coords;
    },

    _removeCell: function (key) {
      var cell = this._cells[key];

      if (!cell) {
        return;
      }

      var coords = this._keyToCellCoords(key);
      var wrappedCoords = this._wrapCoords(coords);
      var cellBounds = this._cellCoordsToBounds(this._wrapCoords(coords));

      cell.current = false;

      delete this._cells[key];
      this._activeCells[key] = cell;

      this.cellLeave(cellBounds, wrappedCoords, key);

      this.fire('cellleave', {
        key: key,
        coords: wrappedCoords,
        bounds: cellBounds
      });
    },

    _reuseCell: function (coords) {
      var key = this._cellCoordsToKey(coords);

      // save cell in cache
      this._cells[key] = this._activeCells[key];
      this._cells[key].current = true;

      var wrappedCoords = this._wrapCoords(coords);
      var cellBounds = this._cellCoordsToBounds(this._wrapCoords(coords));

      this.cellEnter(cellBounds, wrappedCoords, key);

      this.fire('cellenter', {
        key: key,
        coords: wrappedCoords,
        bounds: cellBounds
      });
    },

    _createCell: function (coords) {
      var key = this._cellCoordsToKey(coords);

      var wrappedCoords = this._wrapCoords(coords);
      var cellBounds = this._cellCoordsToBounds(this._wrapCoords(coords));

      this.createCell(cellBounds, wrappedCoords, key);

      this.fire('cellcreate', {
        key: key,
        coords: wrappedCoords,
        bounds: cellBounds
      });

      // save cell in cache
      this._cells[key] = {
        coords: coords,
        current: true
      };

      leaflet.Util.requestAnimFrame(this._pruneCells, this);
    },

    _cellReady: function (coords, err, cell) {
      var key = this._cellCoordsToKey(coords);

      cell = this._cells[key];

      if (!cell) {
        return;
      }

      cell.loaded = +new Date();

      cell.active = true;
    },

    _getCellPos: function (coords) {
      return coords.scaleBy(this.getCellSize());
    },

    _wrapCoords: function (coords) {
      var newCoords = new leaflet.Point(
        this._wrapX ? leaflet.Util.wrapNum(coords.x, this._wrapX) : coords.x,
        this._wrapY ? leaflet.Util.wrapNum(coords.y, this._wrapY) : coords.y
      );
      newCoords.z = coords.z;
      return newCoords;
    },

    _pxBoundsToCellRange: function (bounds) {
      var cellSize = this.getCellSize();
      return new leaflet.Bounds(
        bounds.min.unscaleBy(cellSize).floor(),
        bounds.max.unscaleBy(cellSize).ceil().subtract([1, 1])
      );
    }
  });

  function BinarySearchIndex (values) {
    this.values = [].concat(values || []);
  }

  BinarySearchIndex.prototype.query = function (value) {
    var index = this.getIndex(value);
    return this.values[index];
  };

  BinarySearchIndex.prototype.getIndex = function getIndex (value) {
    if (this.dirty) {
      this.sort();
    }

    var minIndex = 0;
    var maxIndex = this.values.length - 1;
    var currentIndex;
    var currentElement;

    while (minIndex <= maxIndex) {
      currentIndex = (minIndex + maxIndex) / 2 | 0;
      currentElement = this.values[Math.round(currentIndex)];
      if (+currentElement.value < +value) {
        minIndex = currentIndex + 1;
      } else if (+currentElement.value > +value) {
        maxIndex = currentIndex - 1;
      } else {
        return currentIndex;
      }
    }

    return Math.abs(~maxIndex);
  };

  BinarySearchIndex.prototype.between = function between (start, end) {
    var startIndex = this.getIndex(start);
    var endIndex = this.getIndex(end);

    if (startIndex === 0 && endIndex === 0) {
      return [];
    }

    while (this.values[startIndex - 1] && this.values[startIndex - 1].value === start) {
      startIndex--;
    }

    while (this.values[endIndex + 1] && this.values[endIndex + 1].value === end) {
      endIndex++;
    }

    if (this.values[endIndex] && this.values[endIndex].value === end && this.values[endIndex + 1]) {
      endIndex++;
    }

    return this.values.slice(startIndex, endIndex);
  };

  BinarySearchIndex.prototype.insert = function insert (item) {
    this.values.splice(this.getIndex(item.value), 0, item);
    return this;
  };

  BinarySearchIndex.prototype.bulkAdd = function bulkAdd (items, sort) {
    this.values = this.values.concat([].concat(items || []));

    if (sort) {
      this.sort();
    } else {
      this.dirty = true;
    }

    return this;
  };

  BinarySearchIndex.prototype.sort = function sort () {
    this.values.sort(function (a, b) {
      return +b.value - +a.value;
    }).reverse();
    this.dirty = false;
    return this;
  };

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
      precision: 6,
      fetchAllFeatures: false
    },

    /**
     * Constructor
     */

    initialize: function (options) {
      FeatureGrid.prototype.initialize.call(this, options);

      options = getUrlParams(options);
      options = leaflet.Util.setOptions(this, options);

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
          warn(
            'no known esriFieldTypeOID field detected in fields Array.  Please add an attribute field containing unique IDs to ensure the layer can be drawn correctly.'
          );
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
      // include 'Powered by Esri' in map attribution
      setEsriAttribution(map);

      this.service.metadata(function (err, metadata) {
        if (!err) {
          var supportedFormats = metadata.supportedQueryFormats;

          // Check if someone has requested that we don't use geoJSON, even if it's available
          var forceJsonFormat = false;
          if (this.service.options.isModern === false || this.options.fetchAllFeatures) {
            forceJsonFormat = true;
          }

          // Unless we've been told otherwise, check to see whether service can emit GeoJSON natively
          if (
            !forceJsonFormat &&
            supportedFormats &&
            supportedFormats.indexOf('geoJSON') !== -1
          ) {
            this.service.options.isModern = true;
          }

          if (metadata.objectIdField) {
            this.service.options.idAttribute = metadata.objectIdField;
          }

          // add copyright text listed in service metadata
          if (
            !this.options.attribution &&
            map.attributionControl &&
            metadata.copyrightText
          ) {
            this.options.attribution = metadata.copyrightText;
            map.attributionControl.addAttribution(this.getAttribution());
          }
        }
      }, this);

      map.on('zoomend', this._handleZoomChange, this);

      return FeatureGrid.prototype.onAdd.call(this, map);
    },

    onRemove: function (map) {
      removeEsriAttribution(map);
      map.off('zoomend', this._handleZoomChange, this);

      return FeatureGrid.prototype.onRemove.call(this, map);
    },

    getAttribution: function () {
      return this.options.attribution;
    },

    /**
     * Feature Management
     */

    createCell: function (bounds, coords) {
      // dont fetch features outside the scale range defined for the layer
      if (this._visibleZoom()) {
        this._requestFeatures(bounds, coords);
      }
    },

    _requestFeatures: function (bounds, coords, callback, offset) {
      this._activeRequests++;

      // default param
      offset = offset || 0;

      var originalWhere = this.options.where;

      // our first active request fires loading
      if (this._activeRequests === 1) {
        this.fire(
          'loading',
          {
            bounds: bounds
          },
          true
        );
      }

      return this._buildQuery(bounds, offset).run(function (
        error,
        featureCollection,
        response
      ) {
        if (response && response.exceededTransferLimit) {
          this.fire('drawlimitexceeded');
        }

        // the where changed while this request was being run so don't it.
        if (this.options.where !== originalWhere) {
          return;
        }

        // no error, features
        if (!error && featureCollection && featureCollection.features.length) {
          // schedule adding features until the next animation frame
          leaflet.Util.requestAnimFrame(
            leaflet.Util.bind(function () {
              this._addFeatures(featureCollection.features, coords);
              this._postProcessFeatures(bounds);
            }, this)
          );
        }

        // no error, no features
        if (!error && featureCollection && !featureCollection.features.length) {
          this._postProcessFeatures(bounds);
        }

        if (error) {
          this._postProcessFeatures(bounds);
        }

        if (callback) {
          callback.call(this, error, featureCollection);
        }
        if (response && (response.exceededTransferLimit || (response.properties && response.properties.exceededTransferLimit)) && this.options.fetchAllFeatures) {
          this._requestFeatures(bounds, coords, callback, offset + featureCollection.features.length);
        }
      },
        this);
    },

    _postProcessFeatures: function (bounds) {
      // deincrement the request counter now that we have processed features
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
      // coords is optional - will be false if coming from addFeatures() function
      if (coords) {
        var key = this._cacheKey(coords);
        this._cache[key] = this._cache[key] || [];
      }

      for (var i = features.length - 1; i >= 0; i--) {
        var id = features[i].id;

        if (this._currentSnapshot.indexOf(id) === -1) {
          this._currentSnapshot.push(id);
        }
        if (typeof key !== 'undefined' && this._cache[key].indexOf(id) === -1) {
          this._cache[key].push(id);
        }
      }

      if (this.options.timeField) {
        this._buildTimeIndexes(features);
      }

      this.createLayers(features);
    },

    _buildQuery: function (bounds, offset) {
      var query = this.service
        .query()
        .intersects(bounds)
        .where(this.options.where)
        .fields(this.options.fields)
        .precision(this.options.precision);

      if (this.options.fetchAllFeatures && !isNaN(parseInt(offset))) {
        query = query.offset(offset);
      }

      query.params['resultType'] = 'tile';

      if (this.options.requestParams) {
        leaflet.Util.extend(query.params, this.options.requestParams);
      }

      if (this.options.simplifyFactor) {
        query.simplify(this._map, this.options.simplifyFactor);
      }

      if (
        this.options.timeFilterMode === 'server' &&
        this.options.from &&
        this.options.to
      ) {
        query.between(this.options.from, this.options.to);
      }

      return query;
    },

    /**
     * Where Methods
     */

    setWhere: function (where, callback, context) {
      this.options.where = where && where.length ? where : '1=1';

      var oldSnapshot = [];
      var newSnapshot = [];
      var pendingRequests = 0;
      var requestError = null;
      var requestCallback = leaflet.Util.bind(function (error, featureCollection) {
        if (error) {
          requestError = error;
        }

        if (featureCollection) {
          for (var i = featureCollection.features.length - 1; i >= 0; i--) {
            newSnapshot.push(featureCollection.features[i].id);
          }
        }

        pendingRequests--;

        if (
          pendingRequests <= 0 &&
          this._visibleZoom() &&
          where === this.options.where // the where is still the same so use this one
        ) {
          this._currentSnapshot = newSnapshot;
          // schedule adding features for the next animation frame
          leaflet.Util.requestAnimFrame(
            leaflet.Util.bind(function () {
              this.removeLayers(oldSnapshot);
              this.addLayers(newSnapshot);
              if (callback) {
                callback.call(context, requestError);
              }
            }, this)
          );
        }
      }, this);

      for (var i = this._currentSnapshot.length - 1; i >= 0; i--) {
        oldSnapshot.push(this._currentSnapshot[i]);
      }

      this._cache = {};

      for (var key in this._cells) {
        pendingRequests++;
        var coords = this._keyToCellCoords(key);
        var bounds = this._cellCoordsToBounds(coords);
        this._requestFeatures(bounds, coords, requestCallback);
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
      var requestCallback = leaflet.Util.bind(function (error) {
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
        for (var key in this._cells) {
          pendingRequests++;
          var coords = this._keyToCellCoords(key);
          var bounds = this._cellCoordsToBounds(coords);
          this._requestFeatures(bounds, coords, requestCallback);
        }
      }

      return this;
    },

    refresh: function () {
      this.setWhere(this.options.where);
    },

    _filterExistingFeatures: function (oldFrom, oldTo, newFrom, newTo) {
      var layersToRemove =
        oldFrom && oldTo
          ? this._getFeaturesInTimeRange(oldFrom, oldTo)
          : this._currentSnapshot;
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
      leaflet.Util.requestAnimFrame(
        leaflet.Util.bind(function () {
          this.removeLayers(layersToRemove);
          this.addLayers(layersToAdd);
        }, this)
      );
    },

    _getFeaturesInTimeRange: function (start, end) {
      var ids = [];
      var search;

      if (this.options.timeField.start && this.options.timeField.end) {
        var startTimes = this._startTimeIndex.between(start, end);
        var endTimes = this._endTimeIndex.between(start, end);
        search = startTimes.concat(endTimes);
      } else if (this._timeIndex) {
        search = this._timeIndex.between(start, end);
      } else {
        warn(
          'You must set timeField in the layer constructor in order to manipulate the start and end time filter.'
        );
        return [];
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
        return date >= from && date <= to;
      }

      if (this.options.timeField.start && this.options.timeField.end) {
        var startDate = +feature.properties[this.options.timeField.start];
        var endDate = +feature.properties[this.options.timeField.end];
        return (
          (startDate >= from && startDate <= to) ||
          (endDate >= from && endDate <= to) ||
          (startDate <= from && endDate >= to)
        );
      }
    },

    _visibleZoom: function () {
      // check to see whether the current zoom level of the map is within the optional limit defined for the FeatureLayer
      if (!this._map) {
        return false;
      }
      var zoom = this._map.getZoom();
      if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
        return false;
      } else {
        return true;
      }
    },

    _handleZoomChange: function () {
      if (!this._visibleZoom()) {
        this.removeLayers(this._currentSnapshot);
      } else {
        /*
        for every cell in this._cells
          1. Get the cache key for the coords of the cell
          2. If this._cache[key] exists it will be an array of feature IDs.
          3. Call this.addLayers(this._cache[key]) to instruct the feature layer to add the layers back.
        */
        for (var i in this._cells) {
          var coords = this._cells[i].coords;
          var key = this._cacheKey(coords);
          if (this._cache[key]) {
            this.addLayers(this._cache[key]);
          }
        }
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
        this.metadata(
          leaflet.Util.bind(function (error, response) {
            this._metadata = response;
            callback(error, this._metadata);
          }, this)
        );
      }
    },

    addFeature: function (feature, callback, context) {
      this.addFeatures(feature, callback, context);
    },

    addFeatures: function (features, callback, context) {
      this._getMetadata(
        leaflet.Util.bind(function (error, metadata) {
          if (error) {
            if (callback) {
              callback.call(this, error, null);
            }
            return;
          }
          // GeoJSON featureCollection or simple feature
          var featuresArray = features.features ? features.features : [features];

          this.service.addFeatures(
            features,
            leaflet.Util.bind(function (error, response) {
              if (!error) {
                for (var i = featuresArray.length - 1; i >= 0; i--) {
                  // assign ID from result to appropriate objectid field from service metadata
                  featuresArray[i].properties[metadata.objectIdField] =
                    featuresArray.length > 1
                      ? response[i].objectId
                      : response.objectId;
                  // we also need to update the geojson id for createLayers() to function
                  featuresArray[i].id =
                    featuresArray.length > 1
                      ? response[i].objectId
                      : response.objectId;
                }
                this._addFeatures(featuresArray);
              }

              if (callback) {
                callback.call(context, error, response);
              }
            }, this)
          );
        }, this)
      );
    },

    updateFeature: function (feature, callback, context) {
      this.updateFeatures(feature, callback, context);
    },

    updateFeatures: function (features, callback, context) {
      // GeoJSON featureCollection or simple feature
      var featuresArray = features.features ? features.features : [features];
      this.service.updateFeatures(
        features,
        function (error, response) {
          if (!error) {
            for (var i = featuresArray.length - 1; i >= 0; i--) {
              this.removeLayers([featuresArray[i].id], true);
            }
            this._addFeatures(featuresArray);
          }

          if (callback) {
            callback.call(context, error, response);
          }
        },
        this
      );
    },

    deleteFeature: function (id, callback, context) {
      this.deleteFeatures(id, callback, context);
    },

    deleteFeatures: function (ids, callback, context) {
      return this.service.deleteFeatures(
        ids,
        function (error, response) {
          var responseArray = response.length ? response : [response];
          if (!error && responseArray.length > 0) {
            for (var i = responseArray.length - 1; i >= 0; i--) {
              this.removeLayers([responseArray[i].objectId], true);
            }
          }
          if (callback) {
            callback.call(context, error, response);
          }
        },
        this
      );
    }
  });

  var FeatureLayer = FeatureManager.extend({

    options: {
      cacheLayers: true
    },

    /**
     * Constructor
     */
    initialize: function (options) {
      if (options.apikey) {
        options.token = options.apikey;
      }
      FeatureManager.prototype.initialize.call(this, options);
      this._originalStyle = this.options.style;
      this._layers = {};
    },

    /**
     * Layer Interface
     */

    onRemove: function (map) {
      for (var i in this._layers) {
        map.removeLayer(this._layers[i]);
        // trigger the event when the entire featureLayer is removed from the map
        this.fire('removefeature', {
          feature: this._layers[i].feature,
          permanent: false
        }, true);
      }

      return FeatureManager.prototype.onRemove.call(this, map);
    },

    createNewLayer: function (geojson) {
      var layer = leaflet.GeoJSON.geometryToLayer(geojson, this.options);
      // trap for GeoJSON without geometry
      if (layer) {
        layer.defaultOptions = layer.options;
      }
      return layer;
    },

    _updateLayer: function (layer, geojson) {
      // convert the geojson coordinates into a Leaflet LatLng array/nested arrays
      // pass it to setLatLngs to update layer geometries
      var latlngs = [];
      var coordsToLatLng = this.options.coordsToLatLng || leaflet.GeoJSON.coordsToLatLng;

      // copy new attributes, if present
      if (geojson.properties) {
        layer.feature.properties = geojson.properties;
      }

      switch (geojson.geometry.type) {
        case 'Point':
          latlngs = leaflet.GeoJSON.coordsToLatLng(geojson.geometry.coordinates);
          layer.setLatLng(latlngs);
          break;
        case 'LineString':
          latlngs = leaflet.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 0, coordsToLatLng);
          layer.setLatLngs(latlngs);
          break;
        case 'MultiLineString':
          latlngs = leaflet.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 1, coordsToLatLng);
          layer.setLatLngs(latlngs);
          break;
        case 'Polygon':
          latlngs = leaflet.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 1, coordsToLatLng);
          layer.setLatLngs(latlngs);
          break;
        case 'MultiPolygon':
          latlngs = leaflet.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 2, coordsToLatLng);
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

        if (this._visibleZoom() && layer && !this._map.hasLayer(layer) && (!this.options.timeField || this._featureWithinTimeRange(geojson))) {
          this._map.addLayer(layer);
          this.fire('addfeature', {
            feature: layer.feature
          }, true);
        }

        // update geometry if necessary
        if (layer && this.options.simplifyFactor > 0 && (layer.setLatLngs || layer.setLatLng)) {
          this._updateLayer(layer, geojson);
        }

        if (!layer) {
          newLayer = this.createNewLayer(geojson);

          if (!newLayer) {
            warn('invalid GeoJSON encountered');
          } else {
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

            // add the layer if the current zoom level is inside the range defined for the layer, it is within the current time bounds or our layer is not time enabled
            if (this._visibleZoom() && (!this.options.timeField || (this.options.timeField && this._featureWithinTimeRange(geojson)))) {
              this._map.addLayer(newLayer);
            }
          }
        }
      }
    },

    addLayers: function (ids) {
      for (var i = ids.length - 1; i >= 0; i--) {
        var layer = this._layers[ids[i]];
        if (layer && (!this.options.timeField || this._featureWithinTimeRange(layer.feature))) {
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
      if (this._visibleZoom() && !this._zooming && this._map) {
        leaflet.Util.requestAnimFrame(leaflet.Util.bind(function () {
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
        leaflet.Util.requestAnimFrame(leaflet.Util.bind(function () {
          if (this._map) {
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
      var style = this._originalStyle || leaflet.Path.prototype.options;
      if (layer) {
        leaflet.Util.extend(layer.options, layer.defaultOptions);
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

    eachActiveFeature: function (fn, context) {
      // figure out (roughly) which layers are in view
      if (this._map) {
        var activeBounds = this._map.getBounds();
        for (var i in this._layers) {
          if (this._currentSnapshot.indexOf(this._layers[i].feature.id) !== -1) {
            // a simple point in poly test for point geometries
            if (typeof this._layers[i].getLatLng === 'function' && activeBounds.contains(this._layers[i].getLatLng())) {
              fn.call(context, this._layers[i]);
            } else if (typeof this._layers[i].getBounds === 'function' && activeBounds.intersects(this._layers[i].getBounds())) {
              // intersecting bounds check for polyline and polygon geometries
              fn.call(context, this._layers[i]);
            }
          }
        }
      }
      return this;
    },

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
          var getIcon = this.options.pointToLayer(geojson, leaflet.latLng(geojson.geometry.coordinates[1], geojson.geometry.coordinates[0]));
          var updatedIcon = getIcon.options.icon;
          layer.setIcon(updatedIcon);
        }
      }

      // looks like a vector marker (circleMarker)
      if (layer && layer.setStyle && this.options.pointToLayer) {
        var getStyle = this.options.pointToLayer(geojson, leaflet.latLng(geojson.geometry.coordinates[1], geojson.geometry.coordinates[0]));
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

  exports.BasemapLayer = BasemapLayer;
  exports.DynamicMapLayer = DynamicMapLayer;
  exports.FeatureLayer = FeatureLayer;
  exports.FeatureLayerService = FeatureLayerService;
  exports.FeatureManager = FeatureManager;
  exports.Find = Find;
  exports.Identify = Identify;
  exports.IdentifyFeatures = IdentifyFeatures;
  exports.IdentifyImage = IdentifyImage;
  exports.ImageMapLayer = ImageMapLayer;
  exports.ImageService = ImageService;
  exports.MapService = MapService;
  exports.Query = Query;
  exports.RasterLayer = RasterLayer;
  exports.Service = Service;
  exports.Support = Support;
  exports.Task = Task;
  exports.TiledMapLayer = TiledMapLayer;
  exports.Util = EsriUtil;
  exports.VERSION = version;
  exports.basemapLayer = basemapLayer;
  exports.dynamicMapLayer = dynamicMapLayer;
  exports.featureLayer = featureLayer;
  exports.featureLayerService = featureLayerService;
  exports.find = find;
  exports.get = get;
  exports.identify = identify;
  exports.identifyFeatures = identifyFeatures;
  exports.identifyImage = identifyImage;
  exports.imageMapLayer = imageMapLayer;
  exports.imageService = imageService;
  exports.mapService = mapService;
  exports.options = options;
  exports.post = xmlHttpPost;
  exports.query = query;
  exports.request = request;
  exports.service = service;
  exports.task = task;
  exports.tiledMapLayer = tiledMapLayer;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=esri-leaflet-debug.js.map
