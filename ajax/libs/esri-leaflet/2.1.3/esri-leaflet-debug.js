/* esri-leaflet - v2.1.3 - Wed Feb 14 2018 10:52:23 GMT-0800 (PST)
 * Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}),global.L));
}(this, function (exports,leaflet) { 'use strict';

	var version = "2.1.3";

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

	// export the Request object to call the different handlers for debugging
	var Request = {
	  request: request,
	  get: get,
	  post: xmlHttpPost
	};

	/*
	 * Copyright 2017 Esri
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	// checks if 2 x,y points are equal
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
	  var uaT = ((b2[0] - b1[0]) * (a1[1] - b1[1])) - ((b2[1] - b1[1]) * (a1[0] - b1[0]));
	  var ubT = ((a2[0] - a1[0]) * (a1[1] - b1[1])) - ((a2[1] - a1[1]) * (a1[0] - b1[0]));
	  var uB = ((b2[1] - b1[1]) * (a2[0] - a1[0])) - ((b2[0] - b1[0]) * (a2[1] - a1[1]));

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
	        (point[0] < (((coordinates[j][0] - coordinates[i][0]) * (point[1] - coordinates[i][1])) / (coordinates[j][1] - coordinates[i][1])) + coordinates[i][0])) {
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

	function arcgisToGeoJSON$1 (arcgis, idAttribute) {
	  var geojson = {};

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

	  if (arcgis.geometry || arcgis.attributes) {
	    geojson.type = 'Feature';
	    geojson.geometry = (arcgis.geometry) ? arcgisToGeoJSON$1(arcgis.geometry) : null;
	    geojson.properties = (arcgis.attributes) ? shallowClone(arcgis.attributes) : null;
	    if (arcgis.attributes) {
	      geojson.id = arcgis.attributes[idAttribute] || arcgis.attributes.OBJECTID || arcgis.attributes.FID;
	    }
	  }

	  // if no valid geometry was encountered
	  if (JSON.stringify(geojson.geometry) === JSON.stringify({})) {
	    geojson.geometry = null;
	  }

	  return geojson;
	}

	function geojsonToArcGIS$1 (geojson, idAttribute) {
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
	        result.geometry = geojsonToArcGIS$1(geojson.geometry, idAttribute);
	      }
	      result.attributes = (geojson.properties) ? shallowClone(geojson.properties) : {};
	      if (geojson.id) {
	        result.attributes[idAttribute] = geojson.id;
	      }
	      break;
	    case 'FeatureCollection':
	      result = [];
	      for (i = 0; i < geojson.features.length; i++) {
	        result.push(geojsonToArcGIS$1(geojson.features[i], idAttribute));
	      }
	      break;
	    case 'GeometryCollection':
	      result = [];
	      for (i = 0; i < geojson.geometries.length; i++) {
	        result.push(geojsonToArcGIS$1(geojson.geometries[i], idAttribute));
	      }
	      break;
	  }

	  return result;
	}

	function geojsonToArcGIS (geojson, idAttr) {
	  return geojsonToArcGIS$1(geojson, idAttr);
	}

	function arcgisToGeoJSON (arcgis, idAttr) {
	  return arcgisToGeoJSON$1(arcgis, idAttr);
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
	  var count = features.length;

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
	      var feature = arcgisToGeoJSON(features[i], objectIdField || _findIdAttributeFromFeature(features[i]));
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

	function warn () {
	  if (console && console.warn) {
	    console.warn.apply(console, arguments);
	  }
	}

	function calcAttributionWidth (map) {
	  // either crop at 55px or user defined buffer
	  return (map.getSize().x - options.attributionWidthOffset) + 'px';
	}

	function setEsriAttribution (map) {
	  if (map.attributionControl && !map.attributionControl._esriAttributionAdded) {
	    map.attributionControl.setPrefix('<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | Powered by <a href="https://www.esri.com">Esri</a>');

	    var hoverAttributionStyle = document.createElement('style');
	    hoverAttributionStyle.type = 'text/css';
	    hoverAttributionStyle.innerHTML = '.esri-truncated-attribution:hover {' +
	      'white-space: normal;' +
	    '}';

	    document.getElementsByTagName('head')[0].appendChild(hoverAttributionStyle);
	    leaflet.DomUtil.addClass(map.attributionControl._container, 'esri-truncated-attribution:hover');

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
	    leaflet.DomUtil.addClass(map.attributionControl._container, 'esri-truncated-attribution');

	    // update the width used to truncate when the map itself is resized
	    map.on('resize', function (e) {
	      map.attributionControl._container.style.maxWidth = calcAttributionWidth(e.target);
	    });

	    // remove injected scripts and style tags
	    map.on('unload', function () {
	      hoverAttributionStyle.parentNode.removeChild(hoverAttributionStyle);
	      attributionStyle.parentNode.removeChild(attributionStyle);
	      var nodeList = document.querySelectorAll('.esri-leaflet-jsonp');
	      for (var i = 0; i < nodeList.length; i++) {
	        nodeList.item(i).parentNode.removeChild(nodeList.item(i));
	      }
	    });

	    map.attributionControl._esriAttributionAdded = true;
	  }
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
	    params.geometry = geojsonToArcGIS(geometry);
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
	    params.geometry = geojsonToArcGIS(geometry);
	    params.geometryType = geojsonTypeToArcGIS(geometry.type);
	    return params;
	  }

	  // warn the user if we havn't found an appropriate object
	  warn('invalid geometry passed to spatial query. Should be L.LatLng, L.LatLngBounds, L.Marker or a GeoJSON Point, Line, Polygon or MultiPolygon object');

	  return;
	}

	function _getAttributionData (url, map) {
	  jsonp(url, {}, leaflet.Util.bind(function (error, attributions) {
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

	function _updateMapAttribution (evt) {
	  var map = evt.target;
	  var oldAttributions = map._esriAttributions;

	  if (map && map.attributionControl && oldAttributions) {
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
	    var attributionElement = map.attributionControl._container.querySelector('.esri-dynamic-attribution');

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
	  geojsonToArcGIS: geojsonToArcGIS,
	  arcgisToGeoJSON: arcgisToGeoJSON,
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
	    outSr: 4326,
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

	    // services hosted on ArcGIS Online and ArcGIS Server 10.3.1+ support requesting geojson directly
	    if (this.options.isModern || isArcgisOnline(this.options.url)) {
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
	    this.params.inSr = 4326;
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
	          pane: (pointerEvents) ? 'esri-labels' : 'tilePane'
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
	          pane: (pointerEvents) ? 'esri-labels' : 'tilePane'
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
	      throw new Error('L.esri.BasemapLayer: Invalid parameter. Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ImageryClarity", "ShadedRelief", "ShadedReliefLabels", "Terrain", "TerrainLabels" or "USATopo"');
	    }

	    // merge passed options into the config options
	    var tileOptions = leaflet.Util.extend(config.options, options);

	    leaflet.Util.setOptions(this, tileOptions);

	    if (this.options.token) {
	      config.urlTemplate += ('?token=' + this.options.token);
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
	      _getAttributionData(this.options.attributionUrl, map);
	    }

	    map.on('moveend', _updateMapAttribution);

	    leaflet.TileLayer.prototype.onAdd.call(this, map);
	  },

	  onRemove: function (map) {
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
	    this.tileUrl = options.url + 'tile/{z}/{y}/{x}' + (options.requestParams && Object.keys(options.requestParams).length > 0 ? leaflet.Util.getParamString(options.requestParams) : '');
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
	          if (!this.options.attribution && map.attributionControl && metadata.copyrightText) {
	            this.options.attribution = metadata.copyrightText;
	            map.attributionControl.addAttribution(this.getAttribution());
	          }

	          var needProj4 = this._checkSRSupport(map, sr);

	          if (needProj4) {
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
	          } else {
	            warn('L.esri.TiledMapLayer is using a non-mercator spatial reference. Support may be available through Proj4Leaflet http://esri.github.io/esri-leaflet/examples/non-mercator-projection.html');
	          }
	        }
	      }, this);
	    }

	    leaflet.TileLayer.prototype.onAdd.call(this, map);
	  },

	  _checkSRSupport: function (map, spatialReference) {
	    if (map.options.crs === leaflet.CRS.EPSG3857 && (spatialReference === 102100 || spatialReference === 3857)) {
	      // web mercator tile services are supported by leaflet
	      return true;
	    } else if (map.options.crs === leaflet.CRS.EPSG4326 && (spatialReference === 4326)) {
	      // wgs84 tile services are supported by leaflet
	      return true;
	    } else if (map.options.crs && map.options.crs.code && (map.options.crs.code.indexOf(spatialReference) > -1)) {
	      // using proj4 and defining a custom crs enables support for tile services published in other projections
	      return true;
	    } else {
	      // otherwise assume the tile service isn't going to load properly
	      return false;
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
	      // create a new image overlay and add it to the map
	      // to start loading the image
	      // opacity is 0 while the image is loading
	      var image = new Overlay(url, bounds, {
	        opacity: 0,
	        crossOrigin: this.options.useCors,
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
	      };

	      // If loading the image fails
	      image.once('error', onOverlayError, this);

	      // once the image loads
	      image.once('load', onOverlayLoad, this);

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
	        this._renderImage(response.href, bounds);
	      }, this);
	    } else {
	      params.f = 'image';
	      this._renderImage(this.options.url + 'exportImage' + leaflet.Util.getParamString(params), bounds);
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
	    format: 'png24',
	    transparent: true,
	    f: 'json'
	  },

	  initialize: function (options) {
	    options = getUrlParams(options);
	    this.service = mapService(options);
	    this.service.addEventParent(this);

	    if ((options.proxy || options.token) && options.f !== 'json') {
	      options.f = 'json';
	    }

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

	        if (this.options.token) {
	          response.href += ('?token=' + this.options.token);
	        }
	        if (this.options.proxy) {
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
	      this._renderImage(this.options.url + 'export' + leaflet.Util.getParamString(params), bounds);
	    }
	  }
	});

	function dynamicMapLayer (url, options) {
	  return new DynamicMapLayer(url, options);
	}

	var VirtualGrid = leaflet.Layer.extend({

	  options: {
	    cellSize: 512,
	    updateInterval: 150
	  },

	  initialize: function (options) {
	    options = leaflet.setOptions(this, options);
	    this._zooming = false;
	  },

	  onAdd: function (map) {
	    this._map = map;
	    this._update = leaflet.Util.throttle(this._update, this.options.updateInterval, this);
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
	      zoomstart: this._zoomstart,
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

	  _zoomstart: function () {
	    this._zooming = true;
	  },

	  _reset: function () {
	    this._removeCells();

	    this._cells = {};
	    this._activeCells = {};
	    this._cellsToLoad = 0;
	    this._cellsTotal = 0;
	    this._cellNumBounds = this._getCellNumBounds();

	    this._resetWrap();
	    this._zooming = false;
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
	    if (!this._map) {
	      return;
	    }

	    var mapBounds = this._map.getPixelBounds();
	    var cellSize = this._getCellSize();

	    // cell coordinates range for the current view
	    var cellBounds = leaflet.bounds(
	      mapBounds.min.divideBy(cellSize).floor(),
	      mapBounds.max.divideBy(cellSize).floor());

	    this._removeOtherCells(cellBounds);
	    this._addCells(cellBounds);

	    this.fire('cellsupdated');
	  },

	  _addCells: function (cellBounds) {
	    var queue = [];
	    var center = cellBounds.getCenter();
	    var zoom = this._map.getZoom();

	    var j, i, coords;
	    // create a queue of coordinates to load cells from
	    for (j = cellBounds.min.y; j <= cellBounds.max.y; j++) {
	      for (i = cellBounds.min.x; i <= cellBounds.max.x; i++) {
	        coords = leaflet.point(i, j);
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
	      var cellNumBounds = this._cellNumBounds;
	      if (
	        (!crs.wrapLng && (coords.x < cellNumBounds.min.x || coords.x > cellNumBounds.max.x)) ||
	        (!crs.wrapLat && (coords.y < cellNumBounds.min.y || coords.y > cellNumBounds.max.y))
	      ) {
	        return false;
	      }
	    }

	    if (!this.options.bounds) {
	      return true;
	    }

	    // don't load cell if it doesn't intersect the bounds in options
	    var cellBounds = this._cellCoordsToBounds(coords);
	    return leaflet.latLngBounds(this.options.bounds).intersects(cellBounds);
	  },

	  // converts cell coordinates to its geographical bounds
	  _cellCoordsToBounds: function (coords) {
	    var map = this._map;
	    var cellSize = this.options.cellSize;
	    var nwPoint = coords.multiplyBy(cellSize);
	    var sePoint = nwPoint.add([cellSize, cellSize]);
	    var nw = map.wrapLatLng(map.unproject(nwPoint, coords.z));
	    var se = map.wrapLatLng(map.unproject(sePoint, coords.z));

	    return leaflet.latLngBounds(nw, se);
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

	    return leaflet.point(x, y);
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
	      var cellBounds = this._cells[key].bounds;
	      var coords = this._cells[key].coords;

	      if (this.cellLeave) {
	        this.cellLeave(cellBounds, coords);
	      }

	      this.fire('cellleave', {
	        bounds: cellBounds,
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
	    coords.x = this._wrapLng ? leaflet.Util.wrapNum(coords.x, this._wrapLng) : coords.x;
	    coords.y = this._wrapLat ? leaflet.Util.wrapNum(coords.y, this._wrapLat) : coords.y;
	  },

	  // get the global cell coordinates range for the current zoom
	  _getCellNumBounds: function () {
	    var worldBounds = this._map.getPixelWorldBounds();
	    var size = this._getCellSize();

	    return worldBounds ? leaflet.bounds(
	      worldBounds.min.divideBy(size).floor(),
	      worldBounds.max.divideBy(size).ceil().subtract([1, 1])) : null;
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

	var FeatureManager = VirtualGrid.extend({
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
	    VirtualGrid.prototype.initialize.call(this, options);

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
	    // include 'Powered by Esri' in map attribution
	    setEsriAttribution(map);

	    this.service.metadata(function (err, metadata) {
	      if (!err) {
	        var supportedFormats = metadata.supportedQueryFormats;

	        // Check if someone has requested that we don't use geoJSON, even if it's available
	        var forceJsonFormat = false;
	        if (this.service.options.isModern === false) {
	          forceJsonFormat = true;
	        }

	        // Unless we've been told otherwise, check to see whether service can emit GeoJSON natively
	        if (!forceJsonFormat && supportedFormats && supportedFormats.indexOf('geoJSON') !== -1) {
	          this.service.options.isModern = true;
	        }

	        // add copyright text listed in service metadata
	        if (!this.options.attribution && map.attributionControl && metadata.copyrightText) {
	          this.options.attribution = metadata.copyrightText;
	          map.attributionControl.addAttribution(this.getAttribution());
	        }
	      }
	    }, this);

	    map.on('zoomend', this._handleZoomChange, this);

	    return VirtualGrid.prototype.onAdd.call(this, map);
	  },

	  onRemove: function (map) {
	    map.off('zoomend', this._handleZoomChange, this);

	    return VirtualGrid.prototype.onRemove.call(this, map);
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
	        leaflet.Util.requestAnimFrame(leaflet.Util.bind(function () {
	          this._addFeatures(featureCollection.features, coords);
	          this._postProcessFeatures(bounds);
	        }, this));
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
	    }, this);
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
	    var key = this._cacheKey(coords);
	    this._cache[key] = this._cache[key] || [];

	    for (var i = features.length - 1; i >= 0; i--) {
	      var id = features[i].id;

	      if (this._currentSnapshot.indexOf(id) === -1) {
	        this._currentSnapshot.push(id);
	      }
	      if (this._cache[key].indexOf(id) === -1) {
	        this._cache[key].push(id);
	      }
	    }

	    if (this.options.timeField) {
	      this._buildTimeIndexes(features);
	    }

	    this.createLayers(features);
	  },

	  _buildQuery: function (bounds) {
	    var query = this.service.query()
	      .intersects(bounds)
	      .where(this.options.where)
	      .fields(this.options.fields)
	      .precision(this.options.precision);

	    if (this.options.requestParams) {
	      leaflet.Util.extend(query.params, this.options.requestParams);
	    }

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

	      if (pendingRequests <= 0 && this._visibleZoom()) {
	        this._currentSnapshot = newSnapshot;
	        // schedule adding features for the next animation frame
	        leaflet.Util.requestAnimFrame(leaflet.Util.bind(function () {
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
	    leaflet.Util.requestAnimFrame(leaflet.Util.bind(function () {
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

	  _visibleZoom: function () {
	    // check to see whether the current zoom level of the map is within the optional limit defined for the FeatureLayer
	    if (!this._map) {
	      return false;
	    }
	    var zoom = this._map.getZoom();
	    if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
	      return false;
	    } else { return true; }
	  },

	  _handleZoomChange: function () {
	    if (!this._visibleZoom()) {
	      this.removeLayers(this._currentSnapshot);
	      this._currentSnapshot = [];
	    } else {
	      /*
	      for every cell in this._activeCells
	        1. Get the cache key for the coords of the cell
	        2. If this._cache[key] exists it will be an array of feature IDs.
	        3. Call this.addLayers(this._cache[key]) to instruct the feature layer to add the layers back.
	      */
	      for (var i in this._activeCells) {
	        var coords = this._activeCells[i].coords;
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
	      this.metadata(leaflet.Util.bind(function (error, response) {
	        this._metadata = response;
	        callback(error, this._metadata);
	      }, this));
	    }
	  },

	  addFeature: function (feature, callback, context) {
	    this._getMetadata(leaflet.Util.bind(function (error, metadata) {
	      if (error) {
	        if (callback) { callback.call(this, error, null); }
	        return;
	      }

	      this.service.addFeature(feature, leaflet.Util.bind(function (error, response) {
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
	    layer.defaultOptions = layer.options;
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

	      if (this._visibleZoom() && layer && !this._map.hasLayer(layer)) {
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
	  },

	  addLayers: function (ids) {
	    for (var i = ids.length - 1; i >= 0; i--) {
	      var layer = this._layers[ids[i]];
	      if (layer) {
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

	exports.VERSION = version;
	exports.Support = Support;
	exports.options = options;
	exports.Util = EsriUtil;
	exports.get = get;
	exports.post = xmlHttpPost;
	exports.request = request;
	exports.Task = Task;
	exports.task = task;
	exports.Query = Query;
	exports.query = query;
	exports.Find = Find;
	exports.find = find;
	exports.Identify = Identify;
	exports.identify = identify;
	exports.IdentifyFeatures = IdentifyFeatures;
	exports.identifyFeatures = identifyFeatures;
	exports.IdentifyImage = IdentifyImage;
	exports.identifyImage = identifyImage;
	exports.Service = Service;
	exports.service = service;
	exports.MapService = MapService;
	exports.mapService = mapService;
	exports.ImageService = ImageService;
	exports.imageService = imageService;
	exports.FeatureLayerService = FeatureLayerService;
	exports.featureLayerService = featureLayerService;
	exports.BasemapLayer = BasemapLayer;
	exports.basemapLayer = basemapLayer;
	exports.TiledMapLayer = TiledMapLayer;
	exports.tiledMapLayer = tiledMapLayer;
	exports.RasterLayer = RasterLayer;
	exports.ImageMapLayer = ImageMapLayer;
	exports.imageMapLayer = imageMapLayer;
	exports.DynamicMapLayer = DynamicMapLayer;
	exports.dynamicMapLayer = dynamicMapLayer;
	exports.FeatureManager = FeatureManager;
	exports.FeatureLayer = FeatureLayer;
	exports.featureLayer = featureLayer;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvU3VwcG9ydC5qcyIsIi4uL3NyYy9PcHRpb25zLmpzIiwiLi4vc3JjL1JlcXVlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVzcmkvYXJjZ2lzLXRvLWdlb2pzb24tdXRpbHMvaW5kZXguanMiLCIuLi9zcmMvVXRpbC5qcyIsIi4uL3NyYy9UYXNrcy9UYXNrLmpzIiwiLi4vc3JjL1Rhc2tzL1F1ZXJ5LmpzIiwiLi4vc3JjL1Rhc2tzL0ZpbmQuanMiLCIuLi9zcmMvVGFza3MvSWRlbnRpZnkuanMiLCIuLi9zcmMvVGFza3MvSWRlbnRpZnlGZWF0dXJlcy5qcyIsIi4uL3NyYy9UYXNrcy9JZGVudGlmeUltYWdlLmpzIiwiLi4vc3JjL1NlcnZpY2VzL1NlcnZpY2UuanMiLCIuLi9zcmMvU2VydmljZXMvTWFwU2VydmljZS5qcyIsIi4uL3NyYy9TZXJ2aWNlcy9JbWFnZVNlcnZpY2UuanMiLCIuLi9zcmMvU2VydmljZXMvRmVhdHVyZUxheWVyU2VydmljZS5qcyIsIi4uL3NyYy9MYXllcnMvQmFzZW1hcExheWVyLmpzIiwiLi4vc3JjL0xheWVycy9UaWxlZE1hcExheWVyLmpzIiwiLi4vc3JjL0xheWVycy9SYXN0ZXJMYXllci5qcyIsIi4uL3NyYy9MYXllcnMvSW1hZ2VNYXBMYXllci5qcyIsIi4uL3NyYy9MYXllcnMvRHluYW1pY01hcExheWVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtdmlydHVhbC1ncmlkL3NyYy92aXJ0dWFsLWdyaWQuanMiLCIuLi9ub2RlX21vZHVsZXMvdGlueS1iaW5hcnktc2VhcmNoL2luZGV4LmpzIiwiLi4vc3JjL0xheWVycy9GZWF0dXJlTGF5ZXIvRmVhdHVyZU1hbmFnZXIuanMiLCIuLi9zcmMvTGF5ZXJzL0ZlYXR1cmVMYXllci9GZWF0dXJlTGF5ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXRcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkxlYWZsZXQgcGx1Z2lucyBmb3IgY29uc3VtaW5nIEFyY0dJUyBPbmxpbmUgYW5kIEFyY0dJUyBTZXJ2ZXIgc2VydmljZXMuXCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMS4zXCIsXG4gIFwiYXV0aG9yXCI6IFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gIFwiYnJvd3NlclwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWRlYnVnLmpzXCIsXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vZXNyaS9lc3JpLWxlYWZsZXQvaXNzdWVzXCJcbiAgfSxcbiAgXCJjb250cmlidXRvcnNcIjogW1xuICAgIFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gICAgXCJKb2huIEdyYXZvaXMgPGpncmF2b2lzQGVzcmkuY29tPiAoaHR0cDovL2pvaG5ncmF2b2lzLmNvbSlcIlxuICBdLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAZXNyaS9hcmNnaXMtdG8tZ2VvanNvbi11dGlsc1wiOiBcIl4xLjAuNVwiLFxuICAgIFwibGVhZmxldC12aXJ0dWFsLWdyaWRcIjogXCJeMS4wLjVcIixcbiAgICBcInRpbnktYmluYXJ5LXNlYXJjaFwiOiBcIl4xLjAuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCIzLjUuMFwiLFxuICAgIFwiZ2gtcmVsZWFzZVwiOiBcIl4yLjAuMFwiLFxuICAgIFwiaGlnaGxpZ2h0LmpzXCI6IFwiXjguMC4wXCIsXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4wLjEwLjBcIixcbiAgICBcImh1c2t5XCI6IFwiXjAuMTIuMFwiLFxuICAgIFwiaXNwYXJ0YVwiOiBcIl40LjAuMFwiLFxuICAgIFwiaXN0YW5idWxcIjogXCJeMC40LjJcIixcbiAgICBcImthcm1hXCI6IFwiXjEuNy4wXCIsXG4gICAgXCJrYXJtYS1jaGFpLXNpbm9uXCI6IFwiXjAuMS4zXCIsXG4gICAgXCJrYXJtYS1jaHJvbWUtbGF1bmNoZXJcIjogXCJeMi4yLjBcIixcbiAgICBcImthcm1hLWNvdmVyYWdlXCI6IFwiXjEuMS4xXCIsXG4gICAgXCJrYXJtYS1tb2NoYVwiOiBcIl4xLjMuMFwiLFxuICAgIFwia2FybWEtbW9jaGEtcmVwb3J0ZXJcIjogXCJeMi4yLjFcIixcbiAgICBcImthcm1hLXNvdXJjZW1hcC1sb2FkZXJcIjogXCJeMC4zLjVcIixcbiAgICBcIm1rZGlycFwiOiBcIl4wLjUuMVwiLFxuICAgIFwibW9jaGFcIjogXCJeMy40LjJcIixcbiAgICBcIm5wbS1ydW4tYWxsXCI6IFwiXjQuMC4yXCIsXG4gICAgXCJwaGFudG9tanNcIjogXCJeMS45LjhcIixcbiAgICBcInJvbGx1cFwiOiBcIl4wLjI1LjRcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tanNvblwiOiBcIl4yLjMuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1ub2RlLXJlc29sdmVcIjogXCJeMS40LjBcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tdWdsaWZ5XCI6IFwiXjAuMy4xXCIsXG4gICAgXCJzZW1pc3RhbmRhcmRcIjogXCJeOS4wLjBcIixcbiAgICBcInNpbm9uXCI6IFwiXjEuMTEuMVwiLFxuICAgIFwic2lub24tY2hhaVwiOiBcIjIuOC4wXCIsXG4gICAgXCJzbmF6enlcIjogXCJeNS4wLjBcIixcbiAgICBcInVnbGlmeS1qc1wiOiBcIl4yLjguMjlcIixcbiAgICBcIndhdGNoXCI6IFwiXjAuMTcuMVwiXG4gIH0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwOi8vZXNyaS5naXRodWIuaW8vZXNyaS1sZWFmbGV0XCIsXG4gIFwibW9kdWxlXCI6IFwic3JjL0VzcmlMZWFmbGV0LmpzXCIsXG4gIFwianNuZXh0Om1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXQuanNcIixcbiAgXCJqc3BtXCI6IHtcbiAgICBcInJlZ2lzdHJ5XCI6IFwibnBtXCIsXG4gICAgXCJmb3JtYXRcIjogXCJlczZcIixcbiAgICBcIm1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXQuanNcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcImFyY2dpc1wiLFxuICAgIFwiZXNyaVwiLFxuICAgIFwiZXNyaSBsZWFmbGV0XCIsXG4gICAgXCJnaXNcIixcbiAgICBcImxlYWZsZXQgcGx1Z2luXCIsXG4gICAgXCJtYXBwaW5nXCJcbiAgXSxcbiAgXCJsaWNlbnNlXCI6IFwiQXBhY2hlLTIuMFwiLFxuICBcIm1haW5cIjogXCJkaXN0L2VzcmktbGVhZmxldC1kZWJ1Zy5qc1wiLFxuICBcInBlZXJEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwibGVhZmxldFwiOiBcIl4xLjAuMFwiXG4gIH0sXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdEBnaXRodWIuY29tOkVzcmkvZXNyaS1sZWFmbGV0LmdpdFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJidWlsZFwiOiBcInJvbGx1cCAtYyBwcm9maWxlcy9kZWJ1Zy5qcyAmIHJvbGx1cCAtYyBwcm9maWxlcy9wcm9kdWN0aW9uLmpzXCIsXG4gICAgXCJsaW50XCI6IFwic2VtaXN0YW5kYXJkIHwgc25henp5XCIsXG4gICAgXCJwcmVidWlsZFwiOiBcIm1rZGlycCBkaXN0XCIsXG4gICAgXCJwcmVwdWJsaXNoXCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicHJldGVzdFwiOiBcIm5wbSBydW4gYnVpbGRcIixcbiAgICBcInByZWNvbW1pdFwiOiBcIm5wbSBydW4gbGludFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIi4vc2NyaXB0cy9yZWxlYXNlLnNoXCIsXG4gICAgXCJzdGFydC13YXRjaFwiOiBcIndhdGNoIFxcXCJucG0gcnVuIGJ1aWxkXFxcIiBzcmNcIixcbiAgICBcInN0YXJ0XCI6IFwicnVuLXAgc3RhcnQtd2F0Y2ggc2VydmVcIixcbiAgICBcInNlcnZlXCI6IFwiaHR0cC1zZXJ2ZXIgLXAgNTAwMCAtYy0xIC1vXCIsXG4gICAgXCJ0ZXN0XCI6IFwibnBtIHJ1biBsaW50ICYmIGthcm1hIHN0YXJ0XCIsXG4gICAgXCJ0ZXN0OmNpXCI6IFwibnBtIHJ1biBsaW50ICYmIGthcm1hIHN0YXJ0IC0tYnJvd3NlcnMgQ2hyb21lX3RyYXZpc19jaVwiXG4gIH0sXG4gIFwic2VtaXN0YW5kYXJkXCI6IHtcbiAgICBcImdsb2JhbHNcIjogW1xuICAgICAgXCJleHBlY3RcIixcbiAgICAgIFwiTFwiLFxuICAgICAgXCJYTUxIdHRwUmVxdWVzdFwiLFxuICAgICAgXCJzaW5vblwiLFxuICAgICAgXCJ4aHJcIixcbiAgICAgIFwicHJvajRcIlxuICAgIF1cbiAgfVxufVxuIiwiZXhwb3J0IHZhciBjb3JzID0gKCh3aW5kb3cuWE1MSHR0cFJlcXVlc3QgJiYgJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpKSk7XG5leHBvcnQgdmFyIHBvaW50ZXJFdmVudHMgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9PT0gJyc7XG5cbmV4cG9ydCB2YXIgU3VwcG9ydCA9IHtcbiAgY29yczogY29ycyxcbiAgcG9pbnRlckV2ZW50czogcG9pbnRlckV2ZW50c1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU3VwcG9ydDtcbiIsImV4cG9ydCB2YXIgb3B0aW9ucyA9IHtcbiAgYXR0cmlidXRpb25XaWR0aE9mZnNldDogNTVcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG9wdGlvbnM7XG4iLCJpbXBvcnQgeyBVdGlsLCBEb21VdGlsIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgU3VwcG9ydCBmcm9tICcuL1N1cHBvcnQnO1xuaW1wb3J0IHsgd2FybiB9IGZyb20gJy4vVXRpbCc7XG5cbnZhciBjYWxsYmFja3MgPSAwO1xuXG5mdW5jdGlvbiBzZXJpYWxpemUgKHBhcmFtcykge1xuICB2YXIgZGF0YSA9ICcnO1xuXG4gIHBhcmFtcy5mID0gcGFyYW1zLmYgfHwgJ2pzb24nO1xuXG4gIGZvciAodmFyIGtleSBpbiBwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHZhciBwYXJhbSA9IHBhcmFtc1trZXldO1xuICAgICAgdmFyIHR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGFyYW0pO1xuICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICBpZiAoZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgZGF0YSArPSAnJic7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgIHZhbHVlID0gKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwYXJhbVswXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSA/IEpTT04uc3RyaW5naWZ5KHBhcmFtKSA6IHBhcmFtLmpvaW4oJywnKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeShwYXJhbSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgICAgICB2YWx1ZSA9IHBhcmFtLnZhbHVlT2YoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gcGFyYW07XG4gICAgICB9XG5cbiAgICAgIGRhdGEgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVSZXF1ZXN0IChjYWxsYmFjaywgY29udGV4dCkge1xuICB2YXIgaHR0cFJlcXVlc3QgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgaHR0cFJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaHR0cFJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gVXRpbC5mYWxzZUZuO1xuXG4gICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCB7XG4gICAgICBlcnJvcjoge1xuICAgICAgICBjb2RlOiA1MDAsXG4gICAgICAgIG1lc3NhZ2U6ICdYTUxIdHRwUmVxdWVzdCBlcnJvcidcbiAgICAgIH1cbiAgICB9LCBudWxsKTtcbiAgfTtcblxuICBodHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3BvbnNlO1xuICAgIHZhciBlcnJvcjtcblxuICAgIGlmIChodHRwUmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UoaHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVzcG9uc2UgPSBudWxsO1xuICAgICAgICBlcnJvciA9IHtcbiAgICAgICAgICBjb2RlOiA1MDAsXG4gICAgICAgICAgbWVzc2FnZTogJ0NvdWxkIG5vdCBwYXJzZSByZXNwb25zZSBhcyBKU09OLiBUaGlzIGNvdWxkIGFsc28gYmUgY2F1c2VkIGJ5IGEgQ09SUyBvciBYTUxIdHRwUmVxdWVzdCBlcnJvci4nXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmICghZXJyb3IgJiYgcmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgcmVzcG9uc2UgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBodHRwUmVxdWVzdC5vbmVycm9yID0gVXRpbC5mYWxzZUZuO1xuXG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG4gICAgfVxuICB9O1xuXG4gIGh0dHBSZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9uZXJyb3IoKTtcbiAgfTtcblxuICByZXR1cm4gaHR0cFJlcXVlc3Q7XG59XG5cbmZ1bmN0aW9uIHhtbEh0dHBQb3N0ICh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgdmFyIGh0dHBSZXF1ZXN0ID0gY3JlYXRlUmVxdWVzdChjYWxsYmFjaywgY29udGV4dCk7XG4gIGh0dHBSZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB1cmwpO1xuXG4gIGlmICh0eXBlb2YgY29udGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgY29udGV4dCAhPT0gbnVsbCkge1xuICAgIGlmICh0eXBlb2YgY29udGV4dC5vcHRpb25zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaHR0cFJlcXVlc3QudGltZW91dCA9IGNvbnRleHQub3B0aW9ucy50aW1lb3V0O1xuICAgIH1cbiAgfVxuICBodHRwUmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04Jyk7XG4gIGh0dHBSZXF1ZXN0LnNlbmQoc2VyaWFsaXplKHBhcmFtcykpO1xuXG4gIHJldHVybiBodHRwUmVxdWVzdDtcbn1cblxuZnVuY3Rpb24geG1sSHR0cEdldCAodXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIHZhciBodHRwUmVxdWVzdCA9IGNyZWF0ZVJlcXVlc3QoY2FsbGJhY2ssIGNvbnRleHQpO1xuICBodHRwUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwgKyAnPycgKyBzZXJpYWxpemUocGFyYW1zKSwgdHJ1ZSk7XG5cbiAgaWYgKHR5cGVvZiBjb250ZXh0ICE9PSAndW5kZWZpbmVkJyAmJiBjb250ZXh0ICE9PSBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0Lm9wdGlvbnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBodHRwUmVxdWVzdC50aW1lb3V0ID0gY29udGV4dC5vcHRpb25zLnRpbWVvdXQ7XG4gICAgfVxuICB9XG4gIGh0dHBSZXF1ZXN0LnNlbmQobnVsbCk7XG5cbiAgcmV0dXJuIGh0dHBSZXF1ZXN0O1xufVxuXG4vLyBBSkFYIGhhbmRsZXJzIGZvciBDT1JTIChtb2Rlcm4gYnJvd3NlcnMpIG9yIEpTT05QIChvbGRlciBicm93c2VycylcbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0ICh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgdmFyIHBhcmFtU3RyaW5nID0gc2VyaWFsaXplKHBhcmFtcyk7XG4gIHZhciBodHRwUmVxdWVzdCA9IGNyZWF0ZVJlcXVlc3QoY2FsbGJhY2ssIGNvbnRleHQpO1xuICB2YXIgcmVxdWVzdExlbmd0aCA9ICh1cmwgKyAnPycgKyBwYXJhbVN0cmluZykubGVuZ3RoO1xuXG4gIC8vIGllMTAvMTEgcmVxdWlyZSB0aGUgcmVxdWVzdCBiZSBvcGVuZWQgYmVmb3JlIGEgdGltZW91dCBpcyBhcHBsaWVkXG4gIGlmIChyZXF1ZXN0TGVuZ3RoIDw9IDIwMDAgJiYgU3VwcG9ydC5jb3JzKSB7XG4gICAgaHR0cFJlcXVlc3Qub3BlbignR0VUJywgdXJsICsgJz8nICsgcGFyYW1TdHJpbmcpO1xuICB9IGVsc2UgaWYgKHJlcXVlc3RMZW5ndGggPiAyMDAwICYmIFN1cHBvcnQuY29ycykge1xuICAgIGh0dHBSZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB1cmwpO1xuICAgIGh0dHBSZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLTgnKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgY29udGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgY29udGV4dCAhPT0gbnVsbCkge1xuICAgIGlmICh0eXBlb2YgY29udGV4dC5vcHRpb25zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaHR0cFJlcXVlc3QudGltZW91dCA9IGNvbnRleHQub3B0aW9ucy50aW1lb3V0O1xuICAgIH1cbiAgfVxuXG4gIC8vIHJlcXVlc3QgaXMgbGVzcyB0aGFuIDIwMDAgY2hhcmFjdGVycyBhbmQgdGhlIGJyb3dzZXIgc3VwcG9ydHMgQ09SUywgbWFrZSBHRVQgcmVxdWVzdCB3aXRoIFhNTEh0dHBSZXF1ZXN0XG4gIGlmIChyZXF1ZXN0TGVuZ3RoIDw9IDIwMDAgJiYgU3VwcG9ydC5jb3JzKSB7XG4gICAgaHR0cFJlcXVlc3Quc2VuZChudWxsKTtcblxuICAvLyByZXF1ZXN0IGlzIG1vcmUgdGhhbiAyMDAwIGNoYXJhY3RlcnMgYW5kIHRoZSBicm93c2VyIHN1cHBvcnRzIENPUlMsIG1ha2UgUE9TVCByZXF1ZXN0IHdpdGggWE1MSHR0cFJlcXVlc3RcbiAgfSBlbHNlIGlmIChyZXF1ZXN0TGVuZ3RoID4gMjAwMCAmJiBTdXBwb3J0LmNvcnMpIHtcbiAgICBodHRwUmVxdWVzdC5zZW5kKHBhcmFtU3RyaW5nKTtcblxuICAvLyByZXF1ZXN0IGlzIGxlc3MgIHRoYW4gMjAwMCBjaGFyYWN0ZXJzIGFuZCB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IENPUlMsIG1ha2UgYSBKU09OUCByZXF1ZXN0XG4gIH0gZWxzZSBpZiAocmVxdWVzdExlbmd0aCA8PSAyMDAwICYmICFTdXBwb3J0LmNvcnMpIHtcbiAgICByZXR1cm4ganNvbnAodXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcblxuICAvLyByZXF1ZXN0IGlzIGxvbmdlciB0aGVuIDIwMDAgY2hhcmFjdGVycyBhbmQgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBDT1JTLCBsb2cgYSB3YXJuaW5nXG4gIH0gZWxzZSB7XG4gICAgd2FybignYSByZXF1ZXN0IHRvICcgKyB1cmwgKyAnIHdhcyBsb25nZXIgdGhlbiAyMDAwIGNoYXJhY3RlcnMgYW5kIHRoaXMgYnJvd3NlciBjYW5ub3QgbWFrZSBhIGNyb3NzLWRvbWFpbiBwb3N0IHJlcXVlc3QuIFBsZWFzZSB1c2UgYSBwcm94eSBodHRwOi8vZXNyaS5naXRodWIuaW8vZXNyaS1sZWFmbGV0L2FwaS1yZWZlcmVuY2UvcmVxdWVzdC5odG1sJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmV0dXJuIGh0dHBSZXF1ZXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24ganNvbnAgKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICB3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzID0gd2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrcyB8fCB7fTtcbiAgdmFyIGNhbGxiYWNrSWQgPSAnYycgKyBjYWxsYmFja3M7XG4gIHBhcmFtcy5jYWxsYmFjayA9ICd3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzLicgKyBjYWxsYmFja0lkO1xuXG4gIHdpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3NbY2FsbGJhY2tJZF0gPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICBpZiAod2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrc1tjYWxsYmFja0lkXSAhPT0gdHJ1ZSkge1xuICAgICAgdmFyIGVycm9yO1xuICAgICAgdmFyIHJlc3BvbnNlVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChyZXNwb25zZSk7XG5cbiAgICAgIGlmICghKHJlc3BvbnNlVHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgfHwgcmVzcG9uc2VUeXBlID09PSAnW29iamVjdCBBcnJheV0nKSkge1xuICAgICAgICBlcnJvciA9IHtcbiAgICAgICAgICBlcnJvcjoge1xuICAgICAgICAgICAgY29kZTogNTAwLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0V4cGVjdGVkIGFycmF5IG9yIG9iamVjdCBhcyBKU09OUCByZXNwb25zZSdcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlc3BvbnNlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5lcnJvcikge1xuICAgICAgICBlcnJvciA9IHJlc3BvbnNlO1xuICAgICAgICByZXNwb25zZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlKTtcbiAgICAgIHdpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3NbY2FsbGJhY2tJZF0gPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICB2YXIgc2NyaXB0ID0gRG9tVXRpbC5jcmVhdGUoJ3NjcmlwdCcsIG51bGwsIGRvY3VtZW50LmJvZHkpO1xuICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICBzY3JpcHQuc3JjID0gdXJsICsgJz8nICsgc2VyaWFsaXplKHBhcmFtcyk7XG4gIHNjcmlwdC5pZCA9IGNhbGxiYWNrSWQ7XG4gIERvbVV0aWwuYWRkQ2xhc3Moc2NyaXB0LCAnZXNyaS1sZWFmbGV0LWpzb25wJyk7XG5cbiAgY2FsbGJhY2tzKys7XG5cbiAgcmV0dXJuIHtcbiAgICBpZDogY2FsbGJhY2tJZCxcbiAgICB1cmw6IHNjcmlwdC5zcmMsXG4gICAgYWJvcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3MuX2NhbGxiYWNrW2NhbGxiYWNrSWRdKHtcbiAgICAgICAgY29kZTogMCxcbiAgICAgICAgbWVzc2FnZTogJ1JlcXVlc3QgYWJvcnRlZC4nXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBnZXQgPSAoKFN1cHBvcnQuY29ycykgPyB4bWxIdHRwR2V0IDoganNvbnApO1xuZ2V0LkNPUlMgPSB4bWxIdHRwR2V0O1xuZ2V0LkpTT05QID0ganNvbnA7XG5cbi8vIGNob29zZSB0aGUgY29ycmVjdCBBSkFYIGhhbmRsZXIgZGVwZW5kaW5nIG9uIENPUlMgc3VwcG9ydFxuZXhwb3J0IHsgZ2V0IH07XG5cbi8vIGFsd2F5cyB1c2UgWE1MSHR0cFJlcXVlc3QgZm9yIHBvc3RzXG5leHBvcnQgeyB4bWxIdHRwUG9zdCBhcyBwb3N0IH07XG5cbi8vIGV4cG9ydCB0aGUgUmVxdWVzdCBvYmplY3QgdG8gY2FsbCB0aGUgZGlmZmVyZW50IGhhbmRsZXJzIGZvciBkZWJ1Z2dpbmdcbmV4cG9ydCB2YXIgUmVxdWVzdCA9IHtcbiAgcmVxdWVzdDogcmVxdWVzdCxcbiAgZ2V0OiBnZXQsXG4gIHBvc3Q6IHhtbEh0dHBQb3N0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0O1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDE3IEVzcmlcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLy8gY2hlY2tzIGlmIDIgeCx5IHBvaW50cyBhcmUgZXF1YWxcbmZ1bmN0aW9uIHBvaW50c0VxdWFsIChhLCBiKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBjaGVja3MgaWYgdGhlIGZpcnN0IGFuZCBsYXN0IHBvaW50cyBvZiBhIHJpbmcgYXJlIGVxdWFsIGFuZCBjbG9zZXMgdGhlIHJpbmdcbmZ1bmN0aW9uIGNsb3NlUmluZyAoY29vcmRpbmF0ZXMpIHtcbiAgaWYgKCFwb2ludHNFcXVhbChjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbY29vcmRpbmF0ZXMubGVuZ3RoIC0gMV0pKSB7XG4gICAgY29vcmRpbmF0ZXMucHVzaChjb29yZGluYXRlc1swXSk7XG4gIH1cbiAgcmV0dXJuIGNvb3JkaW5hdGVzO1xufVxuXG4vLyBkZXRlcm1pbmUgaWYgcG9seWdvbiByaW5nIGNvb3JkaW5hdGVzIGFyZSBjbG9ja3dpc2UuIGNsb2Nrd2lzZSBzaWduaWZpZXMgb3V0ZXIgcmluZywgY291bnRlci1jbG9ja3dpc2UgYW4gaW5uZXIgcmluZ1xuLy8gb3IgaG9sZS4gdGhpcyBsb2dpYyB3YXMgZm91bmQgYXQgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTY1NjQ3L2hvdy10by1kZXRlcm1pbmUtaWYtYS1saXN0LW9mLXBvbHlnb24tXG4vLyBwb2ludHMtYXJlLWluLWNsb2Nrd2lzZS1vcmRlclxuZnVuY3Rpb24gcmluZ0lzQ2xvY2t3aXNlIChyaW5nVG9UZXN0KSB7XG4gIHZhciB0b3RhbCA9IDA7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJMZW5ndGggPSByaW5nVG9UZXN0Lmxlbmd0aDtcbiAgdmFyIHB0MSA9IHJpbmdUb1Rlc3RbaV07XG4gIHZhciBwdDI7XG4gIGZvciAoaTsgaSA8IHJMZW5ndGggLSAxOyBpKyspIHtcbiAgICBwdDIgPSByaW5nVG9UZXN0W2kgKyAxXTtcbiAgICB0b3RhbCArPSAocHQyWzBdIC0gcHQxWzBdKSAqIChwdDJbMV0gKyBwdDFbMV0pO1xuICAgIHB0MSA9IHB0MjtcbiAgfVxuICByZXR1cm4gKHRvdGFsID49IDApO1xufVxuXG4vLyBwb3J0ZWQgZnJvbSB0ZXJyYWZvcm1lci5qcyBodHRwczovL2dpdGh1Yi5jb20vRXNyaS9UZXJyYWZvcm1lci9ibG9iL21hc3Rlci90ZXJyYWZvcm1lci5qcyNMNTA0LUw1MTlcbmZ1bmN0aW9uIHZlcnRleEludGVyc2VjdHNWZXJ0ZXggKGExLCBhMiwgYjEsIGIyKSB7XG4gIHZhciB1YVQgPSAoKGIyWzBdIC0gYjFbMF0pICogKGExWzFdIC0gYjFbMV0pKSAtICgoYjJbMV0gLSBiMVsxXSkgKiAoYTFbMF0gLSBiMVswXSkpO1xuICB2YXIgdWJUID0gKChhMlswXSAtIGExWzBdKSAqIChhMVsxXSAtIGIxWzFdKSkgLSAoKGEyWzFdIC0gYTFbMV0pICogKGExWzBdIC0gYjFbMF0pKTtcbiAgdmFyIHVCID0gKChiMlsxXSAtIGIxWzFdKSAqIChhMlswXSAtIGExWzBdKSkgLSAoKGIyWzBdIC0gYjFbMF0pICogKGEyWzFdIC0gYTFbMV0pKTtcblxuICBpZiAodUIgIT09IDApIHtcbiAgICB2YXIgdWEgPSB1YVQgLyB1QjtcbiAgICB2YXIgdWIgPSB1YlQgLyB1QjtcblxuICAgIGlmICh1YSA+PSAwICYmIHVhIDw9IDEgJiYgdWIgPj0gMCAmJiB1YiA8PSAxKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIHBvcnRlZCBmcm9tIHRlcnJhZm9ybWVyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL1RlcnJhZm9ybWVyL2Jsb2IvbWFzdGVyL3RlcnJhZm9ybWVyLmpzI0w1MjEtTDUzMVxuZnVuY3Rpb24gYXJyYXlJbnRlcnNlY3RzQXJyYXkgKGEsIGIpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aCAtIDE7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgYi5sZW5ndGggLSAxOyBqKyspIHtcbiAgICAgIGlmICh2ZXJ0ZXhJbnRlcnNlY3RzVmVydGV4KGFbaV0sIGFbaSArIDFdLCBiW2pdLCBiW2ogKyAxXSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBwb3J0ZWQgZnJvbSB0ZXJyYWZvcm1lci5qcyBodHRwczovL2dpdGh1Yi5jb20vRXNyaS9UZXJyYWZvcm1lci9ibG9iL21hc3Rlci90ZXJyYWZvcm1lci5qcyNMNDcwLUw0ODBcbmZ1bmN0aW9uIGNvb3JkaW5hdGVzQ29udGFpblBvaW50IChjb29yZGluYXRlcywgcG9pbnQpIHtcbiAgdmFyIGNvbnRhaW5zID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSAtMSwgbCA9IGNvb3JkaW5hdGVzLmxlbmd0aCwgaiA9IGwgLSAxOyArK2kgPCBsOyBqID0gaSkge1xuICAgIGlmICgoKGNvb3JkaW5hdGVzW2ldWzFdIDw9IHBvaW50WzFdICYmIHBvaW50WzFdIDwgY29vcmRpbmF0ZXNbal1bMV0pIHx8XG4gICAgICAgICAoY29vcmRpbmF0ZXNbal1bMV0gPD0gcG9pbnRbMV0gJiYgcG9pbnRbMV0gPCBjb29yZGluYXRlc1tpXVsxXSkpICYmXG4gICAgICAgIChwb2ludFswXSA8ICgoKGNvb3JkaW5hdGVzW2pdWzBdIC0gY29vcmRpbmF0ZXNbaV1bMF0pICogKHBvaW50WzFdIC0gY29vcmRpbmF0ZXNbaV1bMV0pKSAvIChjb29yZGluYXRlc1tqXVsxXSAtIGNvb3JkaW5hdGVzW2ldWzFdKSkgKyBjb29yZGluYXRlc1tpXVswXSkpIHtcbiAgICAgIGNvbnRhaW5zID0gIWNvbnRhaW5zO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29udGFpbnM7XG59XG5cbi8vIHBvcnRlZCBmcm9tIHRlcnJhZm9ybWVyLWFyY2dpcy1wYXJzZXIuanMgaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvdGVycmFmb3JtZXItYXJjZ2lzLXBhcnNlci9ibG9iL21hc3Rlci90ZXJyYWZvcm1lci1hcmNnaXMtcGFyc2VyLmpzI0wxMDYtTDExM1xuZnVuY3Rpb24gY29vcmRpbmF0ZXNDb250YWluQ29vcmRpbmF0ZXMgKG91dGVyLCBpbm5lcikge1xuICB2YXIgaW50ZXJzZWN0cyA9IGFycmF5SW50ZXJzZWN0c0FycmF5KG91dGVyLCBpbm5lcik7XG4gIHZhciBjb250YWlucyA9IGNvb3JkaW5hdGVzQ29udGFpblBvaW50KG91dGVyLCBpbm5lclswXSk7XG4gIGlmICghaW50ZXJzZWN0cyAmJiBjb250YWlucykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gZG8gYW55IHBvbHlnb25zIGluIHRoaXMgYXJyYXkgY29udGFpbiBhbnkgb3RoZXIgcG9seWdvbnMgaW4gdGhpcyBhcnJheT9cbi8vIHVzZWQgZm9yIGNoZWNraW5nIGZvciBob2xlcyBpbiBhcmNnaXMgcmluZ3Ncbi8vIHBvcnRlZCBmcm9tIHRlcnJhZm9ybWVyLWFyY2dpcy1wYXJzZXIuanMgaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvdGVycmFmb3JtZXItYXJjZ2lzLXBhcnNlci9ibG9iL21hc3Rlci90ZXJyYWZvcm1lci1hcmNnaXMtcGFyc2VyLmpzI0wxMTctTDE3MlxuZnVuY3Rpb24gY29udmVydFJpbmdzVG9HZW9KU09OIChyaW5ncykge1xuICB2YXIgb3V0ZXJSaW5ncyA9IFtdO1xuICB2YXIgaG9sZXMgPSBbXTtcbiAgdmFyIHg7IC8vIGl0ZXJhdG9yXG4gIHZhciBvdXRlclJpbmc7IC8vIGN1cnJlbnQgb3V0ZXIgcmluZyBiZWluZyBldmFsdWF0ZWRcbiAgdmFyIGhvbGU7IC8vIGN1cnJlbnQgaG9sZSBiZWluZyBldmFsdWF0ZWRcblxuICAvLyBmb3IgZWFjaCByaW5nXG4gIGZvciAodmFyIHIgPSAwOyByIDwgcmluZ3MubGVuZ3RoOyByKyspIHtcbiAgICB2YXIgcmluZyA9IGNsb3NlUmluZyhyaW5nc1tyXS5zbGljZSgwKSk7XG4gICAgaWYgKHJpbmcubGVuZ3RoIDwgNCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIC8vIGlzIHRoaXMgcmluZyBhbiBvdXRlciByaW5nPyBpcyBpdCBjbG9ja3dpc2U/XG4gICAgaWYgKHJpbmdJc0Nsb2Nrd2lzZShyaW5nKSkge1xuICAgICAgdmFyIHBvbHlnb24gPSBbIHJpbmcgXTtcbiAgICAgIG91dGVyUmluZ3MucHVzaChwb2x5Z29uKTsgLy8gcHVzaCB0byBvdXRlciByaW5nc1xuICAgIH0gZWxzZSB7XG4gICAgICBob2xlcy5wdXNoKHJpbmcpOyAvLyBjb3VudGVyY2xvY2t3aXNlIHB1c2ggdG8gaG9sZXNcbiAgICB9XG4gIH1cblxuICB2YXIgdW5jb250YWluZWRIb2xlcyA9IFtdO1xuXG4gIC8vIHdoaWxlIHRoZXJlIGFyZSBob2xlcyBsZWZ0Li4uXG4gIHdoaWxlIChob2xlcy5sZW5ndGgpIHtcbiAgICAvLyBwb3AgYSBob2xlIG9mZiBvdXQgc3RhY2tcbiAgICBob2xlID0gaG9sZXMucG9wKCk7XG5cbiAgICAvLyBsb29wIG92ZXIgYWxsIG91dGVyIHJpbmdzIGFuZCBzZWUgaWYgdGhleSBjb250YWluIG91ciBob2xlLlxuICAgIHZhciBjb250YWluZWQgPSBmYWxzZTtcbiAgICBmb3IgKHggPSBvdXRlclJpbmdzLmxlbmd0aCAtIDE7IHggPj0gMDsgeC0tKSB7XG4gICAgICBvdXRlclJpbmcgPSBvdXRlclJpbmdzW3hdWzBdO1xuICAgICAgaWYgKGNvb3JkaW5hdGVzQ29udGFpbkNvb3JkaW5hdGVzKG91dGVyUmluZywgaG9sZSkpIHtcbiAgICAgICAgLy8gdGhlIGhvbGUgaXMgY29udGFpbmVkIHB1c2ggaXQgaW50byBvdXIgcG9seWdvblxuICAgICAgICBvdXRlclJpbmdzW3hdLnB1c2goaG9sZSk7XG4gICAgICAgIGNvbnRhaW5lZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJpbmcgaXMgbm90IGNvbnRhaW5lZCBpbiBhbnkgb3V0ZXIgcmluZ1xuICAgIC8vIHNvbWV0aW1lcyB0aGlzIGhhcHBlbnMgaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvZXNyaS1sZWFmbGV0L2lzc3Vlcy8zMjBcbiAgICBpZiAoIWNvbnRhaW5lZCkge1xuICAgICAgdW5jb250YWluZWRIb2xlcy5wdXNoKGhvbGUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHdlIGNvdWxkbid0IG1hdGNoIGFueSBob2xlcyB1c2luZyBjb250YWlucyB3ZSBjYW4gdHJ5IGludGVyc2VjdHMuLi5cbiAgd2hpbGUgKHVuY29udGFpbmVkSG9sZXMubGVuZ3RoKSB7XG4gICAgLy8gcG9wIGEgaG9sZSBvZmYgb3V0IHN0YWNrXG4gICAgaG9sZSA9IHVuY29udGFpbmVkSG9sZXMucG9wKCk7XG5cbiAgICAvLyBsb29wIG92ZXIgYWxsIG91dGVyIHJpbmdzIGFuZCBzZWUgaWYgYW55IGludGVyc2VjdCBvdXIgaG9sZS5cbiAgICB2YXIgaW50ZXJzZWN0cyA9IGZhbHNlO1xuXG4gICAgZm9yICh4ID0gb3V0ZXJSaW5ncy5sZW5ndGggLSAxOyB4ID49IDA7IHgtLSkge1xuICAgICAgb3V0ZXJSaW5nID0gb3V0ZXJSaW5nc1t4XVswXTtcbiAgICAgIGlmIChhcnJheUludGVyc2VjdHNBcnJheShvdXRlclJpbmcsIGhvbGUpKSB7XG4gICAgICAgIC8vIHRoZSBob2xlIGlzIGNvbnRhaW5lZCBwdXNoIGl0IGludG8gb3VyIHBvbHlnb25cbiAgICAgICAgb3V0ZXJSaW5nc1t4XS5wdXNoKGhvbGUpO1xuICAgICAgICBpbnRlcnNlY3RzID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpbnRlcnNlY3RzKSB7XG4gICAgICBvdXRlclJpbmdzLnB1c2goW2hvbGUucmV2ZXJzZSgpXSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG91dGVyUmluZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdQb2x5Z29uJyxcbiAgICAgIGNvb3JkaW5hdGVzOiBvdXRlclJpbmdzWzBdXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ011bHRpUG9seWdvbicsXG4gICAgICBjb29yZGluYXRlczogb3V0ZXJSaW5nc1xuICAgIH07XG4gIH1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBlbnN1cmVzIHRoYXQgcmluZ3MgYXJlIG9yaWVudGVkIGluIHRoZSByaWdodCBkaXJlY3Rpb25zXG4vLyBvdXRlciByaW5ncyBhcmUgY2xvY2t3aXNlLCBob2xlcyBhcmUgY291bnRlcmNsb2Nrd2lzZVxuLy8gdXNlZCBmb3IgY29udmVydGluZyBHZW9KU09OIFBvbHlnb25zIHRvIEFyY0dJUyBQb2x5Z29uc1xuZnVuY3Rpb24gb3JpZW50UmluZ3MgKHBvbHkpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICB2YXIgcG9seWdvbiA9IHBvbHkuc2xpY2UoMCk7XG4gIHZhciBvdXRlclJpbmcgPSBjbG9zZVJpbmcocG9seWdvbi5zaGlmdCgpLnNsaWNlKDApKTtcbiAgaWYgKG91dGVyUmluZy5sZW5ndGggPj0gNCkge1xuICAgIGlmICghcmluZ0lzQ2xvY2t3aXNlKG91dGVyUmluZykpIHtcbiAgICAgIG91dGVyUmluZy5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgb3V0cHV0LnB1c2gob3V0ZXJSaW5nKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9seWdvbi5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhvbGUgPSBjbG9zZVJpbmcocG9seWdvbltpXS5zbGljZSgwKSk7XG4gICAgICBpZiAoaG9sZS5sZW5ndGggPj0gNCkge1xuICAgICAgICBpZiAocmluZ0lzQ2xvY2t3aXNlKGhvbGUpKSB7XG4gICAgICAgICAgaG9sZS5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0LnB1c2goaG9sZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBmbGF0dGVucyBob2xlcyBpbiBtdWx0aXBvbHlnb25zIHRvIG9uZSBhcnJheSBvZiBwb2x5Z29uc1xuLy8gdXNlZCBmb3IgY29udmVydGluZyBHZW9KU09OIFBvbHlnb25zIHRvIEFyY0dJUyBQb2x5Z29uc1xuZnVuY3Rpb24gZmxhdHRlbk11bHRpUG9seWdvblJpbmdzIChyaW5ncykge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcG9seWdvbiA9IG9yaWVudFJpbmdzKHJpbmdzW2ldKTtcbiAgICBmb3IgKHZhciB4ID0gcG9seWdvbi5sZW5ndGggLSAxOyB4ID49IDA7IHgtLSkge1xuICAgICAgdmFyIHJpbmcgPSBwb2x5Z29uW3hdLnNsaWNlKDApO1xuICAgICAgb3V0cHV0LnB1c2gocmluZyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbi8vIHNoYWxsb3cgb2JqZWN0IGNsb25lIGZvciBmZWF0dXJlIHByb3BlcnRpZXMgYW5kIGF0dHJpYnV0ZXNcbi8vIGZyb20gaHR0cDovL2pzcGVyZi5jb20vY2xvbmluZy1hbi1vYmplY3QvMlxuZnVuY3Rpb24gc2hhbGxvd0Nsb25lIChvYmopIHtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIHRhcmdldFtpXSA9IG9ialtpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyY2dpc1RvR2VvSlNPTiAoYXJjZ2lzLCBpZEF0dHJpYnV0ZSkge1xuICB2YXIgZ2VvanNvbiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgYXJjZ2lzLnggPT09ICdudW1iZXInICYmIHR5cGVvZiBhcmNnaXMueSA9PT0gJ251bWJlcicpIHtcbiAgICBnZW9qc29uLnR5cGUgPSAnUG9pbnQnO1xuICAgIGdlb2pzb24uY29vcmRpbmF0ZXMgPSBbYXJjZ2lzLngsIGFyY2dpcy55XTtcbiAgICBpZiAodHlwZW9mIGFyY2dpcy56ID09PSAnbnVtYmVyJykge1xuICAgICAgZ2VvanNvbi5jb29yZGluYXRlcy5wdXNoKGFyY2dpcy56KTtcbiAgICB9XG4gIH1cblxuICBpZiAoYXJjZ2lzLnBvaW50cykge1xuICAgIGdlb2pzb24udHlwZSA9ICdNdWx0aVBvaW50JztcbiAgICBnZW9qc29uLmNvb3JkaW5hdGVzID0gYXJjZ2lzLnBvaW50cy5zbGljZSgwKTtcbiAgfVxuXG4gIGlmIChhcmNnaXMucGF0aHMpIHtcbiAgICBpZiAoYXJjZ2lzLnBhdGhzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZ2VvanNvbi50eXBlID0gJ0xpbmVTdHJpbmcnO1xuICAgICAgZ2VvanNvbi5jb29yZGluYXRlcyA9IGFyY2dpcy5wYXRoc1swXS5zbGljZSgwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VvanNvbi50eXBlID0gJ011bHRpTGluZVN0cmluZyc7XG4gICAgICBnZW9qc29uLmNvb3JkaW5hdGVzID0gYXJjZ2lzLnBhdGhzLnNsaWNlKDApO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhcmNnaXMucmluZ3MpIHtcbiAgICBnZW9qc29uID0gY29udmVydFJpbmdzVG9HZW9KU09OKGFyY2dpcy5yaW5ncy5zbGljZSgwKSk7XG4gIH1cblxuICBpZiAoYXJjZ2lzLmdlb21ldHJ5IHx8IGFyY2dpcy5hdHRyaWJ1dGVzKSB7XG4gICAgZ2VvanNvbi50eXBlID0gJ0ZlYXR1cmUnO1xuICAgIGdlb2pzb24uZ2VvbWV0cnkgPSAoYXJjZ2lzLmdlb21ldHJ5KSA/IGFyY2dpc1RvR2VvSlNPTihhcmNnaXMuZ2VvbWV0cnkpIDogbnVsbDtcbiAgICBnZW9qc29uLnByb3BlcnRpZXMgPSAoYXJjZ2lzLmF0dHJpYnV0ZXMpID8gc2hhbGxvd0Nsb25lKGFyY2dpcy5hdHRyaWJ1dGVzKSA6IG51bGw7XG4gICAgaWYgKGFyY2dpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICBnZW9qc29uLmlkID0gYXJjZ2lzLmF0dHJpYnV0ZXNbaWRBdHRyaWJ1dGVdIHx8IGFyY2dpcy5hdHRyaWJ1dGVzLk9CSkVDVElEIHx8IGFyY2dpcy5hdHRyaWJ1dGVzLkZJRDtcbiAgICB9XG4gIH1cblxuICAvLyBpZiBubyB2YWxpZCBnZW9tZXRyeSB3YXMgZW5jb3VudGVyZWRcbiAgaWYgKEpTT04uc3RyaW5naWZ5KGdlb2pzb24uZ2VvbWV0cnkpID09PSBKU09OLnN0cmluZ2lmeSh7fSkpIHtcbiAgICBnZW9qc29uLmdlb21ldHJ5ID0gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBnZW9qc29uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VvanNvblRvQXJjR0lTIChnZW9qc29uLCBpZEF0dHJpYnV0ZSkge1xuICBpZEF0dHJpYnV0ZSA9IGlkQXR0cmlidXRlIHx8ICdPQkpFQ1RJRCc7XG4gIHZhciBzcGF0aWFsUmVmZXJlbmNlID0geyB3a2lkOiA0MzI2IH07XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgdmFyIGk7XG5cbiAgc3dpdGNoIChnZW9qc29uLnR5cGUpIHtcbiAgICBjYXNlICdQb2ludCc6XG4gICAgICByZXN1bHQueCA9IGdlb2pzb24uY29vcmRpbmF0ZXNbMF07XG4gICAgICByZXN1bHQueSA9IGdlb2pzb24uY29vcmRpbmF0ZXNbMV07XG4gICAgICByZXN1bHQuc3BhdGlhbFJlZmVyZW5jZSA9IHNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aVBvaW50JzpcbiAgICAgIHJlc3VsdC5wb2ludHMgPSBnZW9qc29uLmNvb3JkaW5hdGVzLnNsaWNlKDApO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTGluZVN0cmluZyc6XG4gICAgICByZXN1bHQucGF0aHMgPSBbZ2VvanNvbi5jb29yZGluYXRlcy5zbGljZSgwKV07XG4gICAgICByZXN1bHQuc3BhdGlhbFJlZmVyZW5jZSA9IHNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aUxpbmVTdHJpbmcnOlxuICAgICAgcmVzdWx0LnBhdGhzID0gZ2VvanNvbi5jb29yZGluYXRlcy5zbGljZSgwKTtcbiAgICAgIHJlc3VsdC5zcGF0aWFsUmVmZXJlbmNlID0gc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1BvbHlnb24nOlxuICAgICAgcmVzdWx0LnJpbmdzID0gb3JpZW50UmluZ3MoZ2VvanNvbi5jb29yZGluYXRlcy5zbGljZSgwKSk7XG4gICAgICByZXN1bHQuc3BhdGlhbFJlZmVyZW5jZSA9IHNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxuICAgICAgcmVzdWx0LnJpbmdzID0gZmxhdHRlbk11bHRpUG9seWdvblJpbmdzKGdlb2pzb24uY29vcmRpbmF0ZXMuc2xpY2UoMCkpO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRmVhdHVyZSc6XG4gICAgICBpZiAoZ2VvanNvbi5nZW9tZXRyeSkge1xuICAgICAgICByZXN1bHQuZ2VvbWV0cnkgPSBnZW9qc29uVG9BcmNHSVMoZ2VvanNvbi5nZW9tZXRyeSwgaWRBdHRyaWJ1dGUpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmF0dHJpYnV0ZXMgPSAoZ2VvanNvbi5wcm9wZXJ0aWVzKSA/IHNoYWxsb3dDbG9uZShnZW9qc29uLnByb3BlcnRpZXMpIDoge307XG4gICAgICBpZiAoZ2VvanNvbi5pZCkge1xuICAgICAgICByZXN1bHQuYXR0cmlidXRlc1tpZEF0dHJpYnV0ZV0gPSBnZW9qc29uLmlkO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRmVhdHVyZUNvbGxlY3Rpb24nOlxuICAgICAgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZ2VvanNvbi5mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQucHVzaChnZW9qc29uVG9BcmNHSVMoZ2VvanNvbi5mZWF0dXJlc1tpXSwgaWRBdHRyaWJ1dGUpKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0dlb21ldHJ5Q29sbGVjdGlvbic6XG4gICAgICByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBnZW9qc29uLmdlb21ldHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZ2VvanNvblRvQXJjR0lTKGdlb2pzb24uZ2VvbWV0cmllc1tpXSwgaWRBdHRyaWJ1dGUpKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBhcmNnaXNUb0dlb0pTT046IGFyY2dpc1RvR2VvSlNPTiwgZ2VvanNvblRvQXJjR0lTOiBnZW9qc29uVG9BcmNHSVMgfTtcbiIsImltcG9ydCB7IGxhdExuZywgbGF0TG5nQm91bmRzLCBMYXRMbmcsIExhdExuZ0JvdW5kcywgVXRpbCwgRG9tVXRpbCwgR2VvSlNPTiB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsganNvbnAgfSBmcm9tICcuL1JlcXVlc3QnO1xuaW1wb3J0IHsgb3B0aW9ucyB9IGZyb20gJy4vT3B0aW9ucyc7XG5cbmltcG9ydCB7XG4gIGdlb2pzb25Ub0FyY0dJUyBhcyBnMmEsXG4gIGFyY2dpc1RvR2VvSlNPTiBhcyBhMmdcbn0gZnJvbSAnQGVzcmkvYXJjZ2lzLXRvLWdlb2pzb24tdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VvanNvblRvQXJjR0lTIChnZW9qc29uLCBpZEF0dHIpIHtcbiAgcmV0dXJuIGcyYShnZW9qc29uLCBpZEF0dHIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJjZ2lzVG9HZW9KU09OIChhcmNnaXMsIGlkQXR0cikge1xuICByZXR1cm4gYTJnKGFyY2dpcywgaWRBdHRyKTtcbn1cblxuLy8gY29udmVydCBhbiBleHRlbnQgKEFyY0dJUykgdG8gTGF0TG5nQm91bmRzIChMZWFmbGV0KVxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVudFRvQm91bmRzIChleHRlbnQpIHtcbiAgLy8gXCJOYU5cIiBjb29yZGluYXRlcyBmcm9tIEFyY0dJUyBTZXJ2ZXIgaW5kaWNhdGUgYSBudWxsIGdlb21ldHJ5XG4gIGlmIChleHRlbnQueG1pbiAhPT0gJ05hTicgJiYgZXh0ZW50LnltaW4gIT09ICdOYU4nICYmIGV4dGVudC54bWF4ICE9PSAnTmFOJyAmJiBleHRlbnQueW1heCAhPT0gJ05hTicpIHtcbiAgICB2YXIgc3cgPSBsYXRMbmcoZXh0ZW50LnltaW4sIGV4dGVudC54bWluKTtcbiAgICB2YXIgbmUgPSBsYXRMbmcoZXh0ZW50LnltYXgsIGV4dGVudC54bWF4KTtcbiAgICByZXR1cm4gbGF0TG5nQm91bmRzKHN3LCBuZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLy8gY29udmVydCBhbiBMYXRMbmdCb3VuZHMgKExlYWZsZXQpIHRvIGV4dGVudCAoQXJjR0lTKVxuZXhwb3J0IGZ1bmN0aW9uIGJvdW5kc1RvRXh0ZW50IChib3VuZHMpIHtcbiAgYm91bmRzID0gbGF0TG5nQm91bmRzKGJvdW5kcyk7XG4gIHJldHVybiB7XG4gICAgJ3htaW4nOiBib3VuZHMuZ2V0U291dGhXZXN0KCkubG5nLFxuICAgICd5bWluJzogYm91bmRzLmdldFNvdXRoV2VzdCgpLmxhdCxcbiAgICAneG1heCc6IGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sbmcsXG4gICAgJ3ltYXgnOiBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubGF0LFxuICAgICdzcGF0aWFsUmVmZXJlbmNlJzoge1xuICAgICAgJ3draWQnOiA0MzI2XG4gICAgfVxuICB9O1xufVxuXG52YXIga25vd25GaWVsZE5hbWVzID0gL14oT0JKRUNUSUR8RklEfE9JRHxJRCkkL2k7XG5cbi8vIEF0dGVtcHRzIHRvIGZpbmQgdGhlIElEIEZpZWxkIGZyb20gcmVzcG9uc2VcbmV4cG9ydCBmdW5jdGlvbiBfZmluZElkQXR0cmlidXRlRnJvbVJlc3BvbnNlIChyZXNwb25zZSkge1xuICB2YXIgcmVzdWx0O1xuXG4gIGlmIChyZXNwb25zZS5vYmplY3RJZEZpZWxkTmFtZSkge1xuICAgIC8vIEZpbmQgSWQgRmllbGQgZGlyZWN0bHlcbiAgICByZXN1bHQgPSByZXNwb25zZS5vYmplY3RJZEZpZWxkTmFtZTtcbiAgfSBlbHNlIGlmIChyZXNwb25zZS5maWVsZHMpIHtcbiAgICAvLyBGaW5kIElEIEZpZWxkIGJhc2VkIG9uIGZpZWxkIHR5cGVcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8PSByZXNwb25zZS5maWVsZHMubGVuZ3RoIC0gMTsgaisrKSB7XG4gICAgICBpZiAocmVzcG9uc2UuZmllbGRzW2pdLnR5cGUgPT09ICdlc3JpRmllbGRUeXBlT0lEJykge1xuICAgICAgICByZXN1bHQgPSByZXNwb25zZS5maWVsZHNbal0ubmFtZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAvLyBJZiBubyBmaWVsZCB3YXMgbWFya2VkIGFzIGJlaW5nIHRoZSBlc3JpRmllbGRUeXBlT0lEIHRyeSB3ZWxsIGtub3duIGZpZWxkIG5hbWVzXG4gICAgICBmb3IgKGogPSAwOyBqIDw9IHJlc3BvbnNlLmZpZWxkcy5sZW5ndGggLSAxOyBqKyspIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmZpZWxkc1tqXS5uYW1lLm1hdGNoKGtub3duRmllbGROYW1lcykpIHtcbiAgICAgICAgICByZXN1bHQgPSByZXNwb25zZS5maWVsZHNbal0ubmFtZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBUaGlzIGlzIHRoZSAnbGFzdCcgcmVzb3J0LCBmaW5kIHRoZSBJZCBmaWVsZCBmcm9tIHRoZSBzcGVjaWZpZWQgZmVhdHVyZVxuZXhwb3J0IGZ1bmN0aW9uIF9maW5kSWRBdHRyaWJ1dGVGcm9tRmVhdHVyZSAoZmVhdHVyZSkge1xuICBmb3IgKHZhciBrZXkgaW4gZmVhdHVyZS5hdHRyaWJ1dGVzKSB7XG4gICAgaWYgKGtleS5tYXRjaChrbm93bkZpZWxkTmFtZXMpKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uIChyZXNwb25zZSwgaWRBdHRyaWJ1dGUpIHtcbiAgdmFyIG9iamVjdElkRmllbGQ7XG4gIHZhciBmZWF0dXJlcyA9IHJlc3BvbnNlLmZlYXR1cmVzIHx8IHJlc3BvbnNlLnJlc3VsdHM7XG4gIHZhciBjb3VudCA9IGZlYXR1cmVzLmxlbmd0aDtcblxuICBpZiAoaWRBdHRyaWJ1dGUpIHtcbiAgICBvYmplY3RJZEZpZWxkID0gaWRBdHRyaWJ1dGU7XG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0SWRGaWVsZCA9IF9maW5kSWRBdHRyaWJ1dGVGcm9tUmVzcG9uc2UocmVzcG9uc2UpO1xuICB9XG5cbiAgdmFyIGZlYXR1cmVDb2xsZWN0aW9uID0ge1xuICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgZmVhdHVyZXM6IFtdXG4gIH07XG5cbiAgaWYgKGNvdW50KSB7XG4gICAgZm9yICh2YXIgaSA9IGZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZmVhdHVyZSA9IGFyY2dpc1RvR2VvSlNPTihmZWF0dXJlc1tpXSwgb2JqZWN0SWRGaWVsZCB8fCBfZmluZElkQXR0cmlidXRlRnJvbUZlYXR1cmUoZmVhdHVyZXNbaV0pKTtcbiAgICAgIGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uO1xufVxuXG4gIC8vIHRyaW0gdXJsIHdoaXRlc3BhY2UgYW5kIGFkZCBhIHRyYWlsaW5nIHNsYXNoIGlmIG5lZWRlZFxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuVXJsICh1cmwpIHtcbiAgLy8gdHJpbSBsZWFkaW5nIGFuZCB0cmFpbGluZyBzcGFjZXMsIGJ1dCBub3Qgc3BhY2VzIGluc2lkZSB0aGUgdXJsXG4gIHVybCA9IFV0aWwudHJpbSh1cmwpO1xuXG4gIC8vIGFkZCBhIHRyYWlsaW5nIHNsYXNoIHRvIHRoZSB1cmwgaWYgdGhlIHVzZXIgb21pdHRlZCBpdFxuICBpZiAodXJsW3VybC5sZW5ndGggLSAxXSAhPT0gJy8nKSB7XG4gICAgdXJsICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cbi8qIEV4dHJhY3QgdXJsIHBhcmFtcyBpZiBhbnkgYW5kIHN0b3JlIHRoZW0gaW4gcmVxdWVzdFBhcmFtcyBhdHRyaWJ1dGUuXG4gICBSZXR1cm4gdGhlIG9wdGlvbnMgcGFyYW1zIHVwZGF0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRVcmxQYXJhbXMgKG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMudXJsLmluZGV4T2YoJz8nKSAhPT0gLTEpIHtcbiAgICBvcHRpb25zLnJlcXVlc3RQYXJhbXMgPSBvcHRpb25zLnJlcXVlc3RQYXJhbXMgfHwge307XG4gICAgdmFyIHF1ZXJ5U3RyaW5nID0gb3B0aW9ucy51cmwuc3Vic3RyaW5nKG9wdGlvbnMudXJsLmluZGV4T2YoJz8nKSArIDEpO1xuICAgIG9wdGlvbnMudXJsID0gb3B0aW9ucy51cmwuc3BsaXQoJz8nKVswXTtcbiAgICBvcHRpb25zLnJlcXVlc3RQYXJhbXMgPSBKU09OLnBhcnNlKCd7XCInICsgZGVjb2RlVVJJKHF1ZXJ5U3RyaW5nKS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvJi9nLCAnXCIsXCInKS5yZXBsYWNlKC89L2csICdcIjpcIicpICsgJ1wifScpO1xuICB9XG4gIG9wdGlvbnMudXJsID0gY2xlYW5Vcmwob3B0aW9ucy51cmwuc3BsaXQoJz8nKVswXSk7XG4gIHJldHVybiBvcHRpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBcmNnaXNPbmxpbmUgKHVybCkge1xuICAvKiBob3N0ZWQgZmVhdHVyZSBzZXJ2aWNlcyBzdXBwb3J0IGdlb2pzb24gYXMgYW4gb3V0cHV0IGZvcm1hdFxuICB1dGlsaXR5LmFyY2dpcy5jb20gc2VydmljZXMgYXJlIHByb3hpZWQgZnJvbSBhIHZhcmlldHkgb2YgQXJjR0lTIFNlcnZlciB2aW50YWdlcywgYW5kIG1heSBub3QgKi9cbiAgcmV0dXJuICgvXig/IS4qdXRpbGl0eVxcLmFyY2dpc1xcLmNvbSkuKlxcLmFyY2dpc1xcLmNvbS4qRmVhdHVyZVNlcnZlci9pKS50ZXN0KHVybCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9qc29uVHlwZVRvQXJjR0lTIChnZW9Kc29uVHlwZSkge1xuICB2YXIgYXJjZ2lzR2VvbWV0cnlUeXBlO1xuICBzd2l0Y2ggKGdlb0pzb25UeXBlKSB7XG4gICAgY2FzZSAnUG9pbnQnOlxuICAgICAgYXJjZ2lzR2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvaW50JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ011bHRpUG9pbnQnOlxuICAgICAgYXJjZ2lzR2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeU11bHRpcG9pbnQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTGluZVN0cmluZyc6XG4gICAgICBhcmNnaXNHZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9seWxpbmUnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcbiAgICAgIGFyY2dpc0dlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2x5bGluZSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdQb2x5Z29uJzpcbiAgICAgIGFyY2dpc0dlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2x5Z29uJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ011bHRpUG9seWdvbic6XG4gICAgICBhcmNnaXNHZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9seWdvbic7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBhcmNnaXNHZW9tZXRyeVR5cGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YXJuICgpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNBdHRyaWJ1dGlvbldpZHRoIChtYXApIHtcbiAgLy8gZWl0aGVyIGNyb3AgYXQgNTVweCBvciB1c2VyIGRlZmluZWQgYnVmZmVyXG4gIHJldHVybiAobWFwLmdldFNpemUoKS54IC0gb3B0aW9ucy5hdHRyaWJ1dGlvbldpZHRoT2Zmc2V0KSArICdweCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRFc3JpQXR0cmlidXRpb24gKG1hcCkge1xuICBpZiAobWFwLmF0dHJpYnV0aW9uQ29udHJvbCAmJiAhbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5fZXNyaUF0dHJpYnV0aW9uQWRkZWQpIHtcbiAgICBtYXAuYXR0cmlidXRpb25Db250cm9sLnNldFByZWZpeCgnPGEgaHJlZj1cImh0dHA6Ly9sZWFmbGV0anMuY29tXCIgdGl0bGU9XCJBIEpTIGxpYnJhcnkgZm9yIGludGVyYWN0aXZlIG1hcHNcIj5MZWFmbGV0PC9hPiB8IFBvd2VyZWQgYnkgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmVzcmkuY29tXCI+RXNyaTwvYT4nKTtcblxuICAgIHZhciBob3ZlckF0dHJpYnV0aW9uU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGhvdmVyQXR0cmlidXRpb25TdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICBob3ZlckF0dHJpYnV0aW9uU3R5bGUuaW5uZXJIVE1MID0gJy5lc3JpLXRydW5jYXRlZC1hdHRyaWJ1dGlvbjpob3ZlciB7JyArXG4gICAgICAnd2hpdGUtc3BhY2U6IG5vcm1hbDsnICtcbiAgICAnfSc7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGhvdmVyQXR0cmlidXRpb25TdHlsZSk7XG4gICAgRG9tVXRpbC5hZGRDbGFzcyhtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIsICdlc3JpLXRydW5jYXRlZC1hdHRyaWJ1dGlvbjpob3ZlcicpO1xuXG4gICAgLy8gZGVmaW5lIGEgbmV3IGNzcyBjbGFzcyBpbiBKUyB0byB0cmltIGF0dHJpYnV0aW9uIGludG8gYSBzaW5nbGUgbGluZVxuICAgIHZhciBhdHRyaWJ1dGlvblN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBhdHRyaWJ1dGlvblN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGF0dHJpYnV0aW9uU3R5bGUuaW5uZXJIVE1MID0gJy5lc3JpLXRydW5jYXRlZC1hdHRyaWJ1dGlvbiB7JyArXG4gICAgICAndmVydGljYWwtYWxpZ246IC0zcHg7JyArXG4gICAgICAnd2hpdGUtc3BhY2U6IG5vd3JhcDsnICtcbiAgICAgICdvdmVyZmxvdzogaGlkZGVuOycgK1xuICAgICAgJ3RleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOycgK1xuICAgICAgJ2Rpc3BsYXk6IGlubGluZS1ibG9jazsnICtcbiAgICAgICd0cmFuc2l0aW9uOiAwcyB3aGl0ZS1zcGFjZTsnICtcbiAgICAgICd0cmFuc2l0aW9uLWRlbGF5OiAxczsnICtcbiAgICAgICdtYXgtd2lkdGg6ICcgKyBjYWxjQXR0cmlidXRpb25XaWR0aChtYXApICsgJzsnICtcbiAgICAnfSc7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGF0dHJpYnV0aW9uU3R5bGUpO1xuICAgIERvbVV0aWwuYWRkQ2xhc3MobWFwLmF0dHJpYnV0aW9uQ29udHJvbC5fY29udGFpbmVyLCAnZXNyaS10cnVuY2F0ZWQtYXR0cmlidXRpb24nKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgd2lkdGggdXNlZCB0byB0cnVuY2F0ZSB3aGVuIHRoZSBtYXAgaXRzZWxmIGlzIHJlc2l6ZWRcbiAgICBtYXAub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIuc3R5bGUubWF4V2lkdGggPSBjYWxjQXR0cmlidXRpb25XaWR0aChlLnRhcmdldCk7XG4gICAgfSk7XG5cbiAgICAvLyByZW1vdmUgaW5qZWN0ZWQgc2NyaXB0cyBhbmQgc3R5bGUgdGFnc1xuICAgIG1hcC5vbigndW5sb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgaG92ZXJBdHRyaWJ1dGlvblN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaG92ZXJBdHRyaWJ1dGlvblN0eWxlKTtcbiAgICAgIGF0dHJpYnV0aW9uU3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChhdHRyaWJ1dGlvblN0eWxlKTtcbiAgICAgIHZhciBub2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lc3JpLWxlYWZsZXQtanNvbnAnKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbm9kZUxpc3QuaXRlbShpKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGVMaXN0Lml0ZW0oaSkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5fZXNyaUF0dHJpYnV0aW9uQWRkZWQgPSB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfc2V0R2VvbWV0cnkgKGdlb21ldHJ5KSB7XG4gIHZhciBwYXJhbXMgPSB7XG4gICAgZ2VvbWV0cnk6IG51bGwsXG4gICAgZ2VvbWV0cnlUeXBlOiBudWxsXG4gIH07XG5cbiAgLy8gY29udmVydCBib3VuZHMgdG8gZXh0ZW50IGFuZCBmaW5pc2hcbiAgaWYgKGdlb21ldHJ5IGluc3RhbmNlb2YgTGF0TG5nQm91bmRzKSB7XG4gICAgLy8gc2V0IGdlb21ldHJ5ICsgZ2VvbWV0cnlUeXBlXG4gICAgcGFyYW1zLmdlb21ldHJ5ID0gYm91bmRzVG9FeHRlbnQoZ2VvbWV0cnkpO1xuICAgIHBhcmFtcy5nZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5RW52ZWxvcGUnO1xuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvLyBjb252ZXJ0IEwuTWFya2VyID4gTC5MYXRMbmdcbiAgaWYgKGdlb21ldHJ5LmdldExhdExuZykge1xuICAgIGdlb21ldHJ5ID0gZ2VvbWV0cnkuZ2V0TGF0TG5nKCk7XG4gIH1cblxuICAvLyBjb252ZXJ0IEwuTGF0TG5nIHRvIGEgZ2VvanNvbiBwb2ludCBhbmQgY29udGludWU7XG4gIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIExhdExuZykge1xuICAgIGdlb21ldHJ5ID0ge1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIGNvb3JkaW5hdGVzOiBbZ2VvbWV0cnkubG5nLCBnZW9tZXRyeS5sYXRdXG4gICAgfTtcbiAgfVxuXG4gIC8vIGhhbmRsZSBMLkdlb0pTT04sIHB1bGwgb3V0IHRoZSBmaXJzdCBnZW9tZXRyeVxuICBpZiAoZ2VvbWV0cnkgaW5zdGFuY2VvZiBHZW9KU09OKSB7XG4gICAgLy8gcmVhc3NpZ24gZ2VvbWV0cnkgdG8gdGhlIEdlb0pTT04gdmFsdWUgICh3ZSBhcmUgYXNzdW1pbmcgdGhhdCBvbmx5IG9uZSBmZWF0dXJlIGlzIHByZXNlbnQpXG4gICAgZ2VvbWV0cnkgPSBnZW9tZXRyeS5nZXRMYXllcnMoKVswXS5mZWF0dXJlLmdlb21ldHJ5O1xuICAgIHBhcmFtcy5nZW9tZXRyeSA9IGdlb2pzb25Ub0FyY0dJUyhnZW9tZXRyeSk7XG4gICAgcGFyYW1zLmdlb21ldHJ5VHlwZSA9IGdlb2pzb25UeXBlVG9BcmNHSVMoZ2VvbWV0cnkudHlwZSk7XG4gIH1cblxuICAvLyBIYW5kbGUgTC5Qb2x5bGluZSBhbmQgTC5Qb2x5Z29uXG4gIGlmIChnZW9tZXRyeS50b0dlb0pTT04pIHtcbiAgICBnZW9tZXRyeSA9IGdlb21ldHJ5LnRvR2VvSlNPTigpO1xuICB9XG5cbiAgLy8gaGFuZGxlIEdlb0pTT04gZmVhdHVyZSBieSBwdWxsaW5nIG91dCB0aGUgZ2VvbWV0cnlcbiAgaWYgKGdlb21ldHJ5LnR5cGUgPT09ICdGZWF0dXJlJykge1xuICAgIC8vIGdldCB0aGUgZ2VvbWV0cnkgb2YgdGhlIGdlb2pzb24gZmVhdHVyZVxuICAgIGdlb21ldHJ5ID0gZ2VvbWV0cnkuZ2VvbWV0cnk7XG4gIH1cblxuICAvLyBjb25maXJtIHRoYXQgb3VyIEdlb0pTT04gaXMgYSBwb2ludCwgbGluZSBvciBwb2x5Z29uXG4gIGlmIChnZW9tZXRyeS50eXBlID09PSAnUG9pbnQnIHx8IGdlb21ldHJ5LnR5cGUgPT09ICdMaW5lU3RyaW5nJyB8fCBnZW9tZXRyeS50eXBlID09PSAnUG9seWdvbicgfHwgZ2VvbWV0cnkudHlwZSA9PT0gJ011bHRpUG9seWdvbicpIHtcbiAgICBwYXJhbXMuZ2VvbWV0cnkgPSBnZW9qc29uVG9BcmNHSVMoZ2VvbWV0cnkpO1xuICAgIHBhcmFtcy5nZW9tZXRyeVR5cGUgPSBnZW9qc29uVHlwZVRvQXJjR0lTKGdlb21ldHJ5LnR5cGUpO1xuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvLyB3YXJuIHRoZSB1c2VyIGlmIHdlIGhhdm4ndCBmb3VuZCBhbiBhcHByb3ByaWF0ZSBvYmplY3RcbiAgd2FybignaW52YWxpZCBnZW9tZXRyeSBwYXNzZWQgdG8gc3BhdGlhbCBxdWVyeS4gU2hvdWxkIGJlIEwuTGF0TG5nLCBMLkxhdExuZ0JvdW5kcywgTC5NYXJrZXIgb3IgYSBHZW9KU09OIFBvaW50LCBMaW5lLCBQb2x5Z29uIG9yIE11bHRpUG9seWdvbiBvYmplY3QnKTtcblxuICByZXR1cm47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfZ2V0QXR0cmlidXRpb25EYXRhICh1cmwsIG1hcCkge1xuICBqc29ucCh1cmwsIHt9LCBVdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBhdHRyaWJ1dGlvbnMpIHtcbiAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9XG4gICAgbWFwLl9lc3JpQXR0cmlidXRpb25zID0gW107XG4gICAgZm9yICh2YXIgYyA9IDA7IGMgPCBhdHRyaWJ1dGlvbnMuY29udHJpYnV0b3JzLmxlbmd0aDsgYysrKSB7XG4gICAgICB2YXIgY29udHJpYnV0b3IgPSBhdHRyaWJ1dGlvbnMuY29udHJpYnV0b3JzW2NdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRyaWJ1dG9yLmNvdmVyYWdlQXJlYXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNvdmVyYWdlQXJlYSA9IGNvbnRyaWJ1dG9yLmNvdmVyYWdlQXJlYXNbaV07XG4gICAgICAgIHZhciBzb3V0aFdlc3QgPSBsYXRMbmcoY292ZXJhZ2VBcmVhLmJib3hbMF0sIGNvdmVyYWdlQXJlYS5iYm94WzFdKTtcbiAgICAgICAgdmFyIG5vcnRoRWFzdCA9IGxhdExuZyhjb3ZlcmFnZUFyZWEuYmJveFsyXSwgY292ZXJhZ2VBcmVhLmJib3hbM10pO1xuICAgICAgICBtYXAuX2VzcmlBdHRyaWJ1dGlvbnMucHVzaCh7XG4gICAgICAgICAgYXR0cmlidXRpb246IGNvbnRyaWJ1dG9yLmF0dHJpYnV0aW9uLFxuICAgICAgICAgIHNjb3JlOiBjb3ZlcmFnZUFyZWEuc2NvcmUsXG4gICAgICAgICAgYm91bmRzOiBsYXRMbmdCb3VuZHMoc291dGhXZXN0LCBub3J0aEVhc3QpLFxuICAgICAgICAgIG1pblpvb206IGNvdmVyYWdlQXJlYS56b29tTWluLFxuICAgICAgICAgIG1heFpvb206IGNvdmVyYWdlQXJlYS56b29tTWF4XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1hcC5fZXNyaUF0dHJpYnV0aW9ucy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmU7XG4gICAgfSk7XG5cbiAgICAvLyBwYXNzIHRoZSBzYW1lIGFyZ3VtZW50IGFzIHRoZSBtYXAncyAnbW92ZWVuZCcgZXZlbnRcbiAgICB2YXIgb2JqID0geyB0YXJnZXQ6IG1hcCB9O1xuICAgIF91cGRhdGVNYXBBdHRyaWJ1dGlvbihvYmopO1xuICB9LCB0aGlzKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfdXBkYXRlTWFwQXR0cmlidXRpb24gKGV2dCkge1xuICB2YXIgbWFwID0gZXZ0LnRhcmdldDtcbiAgdmFyIG9sZEF0dHJpYnV0aW9ucyA9IG1hcC5fZXNyaUF0dHJpYnV0aW9ucztcblxuICBpZiAobWFwICYmIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wgJiYgb2xkQXR0cmlidXRpb25zKSB7XG4gICAgdmFyIG5ld0F0dHJpYnV0aW9ucyA9ICcnO1xuICAgIHZhciBib3VuZHMgPSBtYXAuZ2V0Qm91bmRzKCk7XG4gICAgdmFyIHdyYXBwZWRCb3VuZHMgPSBsYXRMbmdCb3VuZHMoXG4gICAgICBib3VuZHMuZ2V0U291dGhXZXN0KCkud3JhcCgpLFxuICAgICAgYm91bmRzLmdldE5vcnRoRWFzdCgpLndyYXAoKVxuICAgICk7XG4gICAgdmFyIHpvb20gPSBtYXAuZ2V0Wm9vbSgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbGRBdHRyaWJ1dGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBhdHRyaWJ1dGlvbiA9IG9sZEF0dHJpYnV0aW9uc1tpXTtcbiAgICAgIHZhciB0ZXh0ID0gYXR0cmlidXRpb24uYXR0cmlidXRpb247XG5cbiAgICAgIGlmICghbmV3QXR0cmlidXRpb25zLm1hdGNoKHRleHQpICYmIGF0dHJpYnV0aW9uLmJvdW5kcy5pbnRlcnNlY3RzKHdyYXBwZWRCb3VuZHMpICYmIHpvb20gPj0gYXR0cmlidXRpb24ubWluWm9vbSAmJiB6b29tIDw9IGF0dHJpYnV0aW9uLm1heFpvb20pIHtcbiAgICAgICAgbmV3QXR0cmlidXRpb25zICs9ICgnLCAnICsgdGV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbmV3QXR0cmlidXRpb25zID0gbmV3QXR0cmlidXRpb25zLnN1YnN0cigyKTtcbiAgICB2YXIgYXR0cmlidXRpb25FbGVtZW50ID0gbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5fY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5lc3JpLWR5bmFtaWMtYXR0cmlidXRpb24nKTtcblxuICAgIGF0dHJpYnV0aW9uRWxlbWVudC5pbm5lckhUTUwgPSBuZXdBdHRyaWJ1dGlvbnM7XG4gICAgYXR0cmlidXRpb25FbGVtZW50LnN0eWxlLm1heFdpZHRoID0gY2FsY0F0dHJpYnV0aW9uV2lkdGgobWFwKTtcblxuICAgIG1hcC5maXJlKCdhdHRyaWJ1dGlvbnVwZGF0ZWQnLCB7XG4gICAgICBhdHRyaWJ1dGlvbjogbmV3QXR0cmlidXRpb25zXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHZhciBFc3JpVXRpbCA9IHtcbiAgd2Fybjogd2FybixcbiAgY2xlYW5Vcmw6IGNsZWFuVXJsLFxuICBnZXRVcmxQYXJhbXM6IGdldFVybFBhcmFtcyxcbiAgaXNBcmNnaXNPbmxpbmU6IGlzQXJjZ2lzT25saW5lLFxuICBnZW9qc29uVHlwZVRvQXJjR0lTOiBnZW9qc29uVHlwZVRvQXJjR0lTLFxuICByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb246IHJlc3BvbnNlVG9GZWF0dXJlQ29sbGVjdGlvbixcbiAgZ2VvanNvblRvQXJjR0lTOiBnZW9qc29uVG9BcmNHSVMsXG4gIGFyY2dpc1RvR2VvSlNPTjogYXJjZ2lzVG9HZW9KU09OLFxuICBib3VuZHNUb0V4dGVudDogYm91bmRzVG9FeHRlbnQsXG4gIGV4dGVudFRvQm91bmRzOiBleHRlbnRUb0JvdW5kcyxcbiAgY2FsY0F0dHJpYnV0aW9uV2lkdGg6IGNhbGNBdHRyaWJ1dGlvbldpZHRoLFxuICBzZXRFc3JpQXR0cmlidXRpb246IHNldEVzcmlBdHRyaWJ1dGlvbixcbiAgX3NldEdlb21ldHJ5OiBfc2V0R2VvbWV0cnksXG4gIF9nZXRBdHRyaWJ1dGlvbkRhdGE6IF9nZXRBdHRyaWJ1dGlvbkRhdGEsXG4gIF91cGRhdGVNYXBBdHRyaWJ1dGlvbjogX3VwZGF0ZU1hcEF0dHJpYnV0aW9uLFxuICBfZmluZElkQXR0cmlidXRlRnJvbUZlYXR1cmU6IF9maW5kSWRBdHRyaWJ1dGVGcm9tRmVhdHVyZSxcbiAgX2ZpbmRJZEF0dHJpYnV0ZUZyb21SZXNwb25zZTogX2ZpbmRJZEF0dHJpYnV0ZUZyb21SZXNwb25zZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRXNyaVV0aWw7XG4iLCJpbXBvcnQgeyBDbGFzcywgVXRpbCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHtjb3JzfSBmcm9tICcuLi9TdXBwb3J0JztcbmltcG9ydCB7IGNsZWFuVXJsLCBnZXRVcmxQYXJhbXMgfSBmcm9tICcuLi9VdGlsJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL1JlcXVlc3QnO1xuXG5leHBvcnQgdmFyIFRhc2sgPSBDbGFzcy5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBwcm94eTogZmFsc2UsXG4gICAgdXNlQ29yczogY29yc1xuICB9LFxuXG4gIC8vIEdlbmVyYXRlIGEgbWV0aG9kIGZvciBlYWNoIG1ldGhvZE5hbWU6cGFyYW1OYW1lIGluIHRoZSBzZXR0ZXJzIGZvciB0aGlzIHRhc2suXG4gIGdlbmVyYXRlU2V0dGVyOiBmdW5jdGlvbiAocGFyYW0sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gVXRpbC5iaW5kKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy5wYXJhbXNbcGFyYW1dID0gdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoZW5kcG9pbnQpIHtcbiAgICAvLyBlbmRwb2ludCBjYW4gYmUgZWl0aGVyIGEgdXJsIChhbmQgb3B0aW9ucykgZm9yIGFuIEFyY0dJUyBSZXN0IFNlcnZpY2Ugb3IgYW4gaW5zdGFuY2Ugb2YgRXNyaUxlYWZsZXQuU2VydmljZVxuICAgIGlmIChlbmRwb2ludC5yZXF1ZXN0ICYmIGVuZHBvaW50Lm9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UgPSBlbmRwb2ludDtcbiAgICAgIFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBlbmRwb2ludC5vcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgVXRpbC5zZXRPcHRpb25zKHRoaXMsIGVuZHBvaW50KTtcbiAgICAgIHRoaXMub3B0aW9ucy51cmwgPSBjbGVhblVybChlbmRwb2ludC51cmwpO1xuICAgIH1cblxuICAgIC8vIGNsb25lIGRlZmF1bHQgcGFyYW1zIGludG8gdGhpcyBvYmplY3RcbiAgICB0aGlzLnBhcmFtcyA9IFV0aWwuZXh0ZW5kKHt9LCB0aGlzLnBhcmFtcyB8fCB7fSk7XG5cbiAgICAvLyBnZW5lcmF0ZSBzZXR0ZXIgbWV0aG9kcyBiYXNlZCBvbiB0aGUgc2V0dGVycyBvYmplY3QgaW1wbGltZW50ZWQgYSBjaGlsZCBjbGFzc1xuICAgIGlmICh0aGlzLnNldHRlcnMpIHtcbiAgICAgIGZvciAodmFyIHNldHRlciBpbiB0aGlzLnNldHRlcnMpIHtcbiAgICAgICAgdmFyIHBhcmFtID0gdGhpcy5zZXR0ZXJzW3NldHRlcl07XG4gICAgICAgIHRoaXNbc2V0dGVyXSA9IHRoaXMuZ2VuZXJhdGVTZXR0ZXIocGFyYW0sIHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB0b2tlbjogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgaWYgKHRoaXMuX3NlcnZpY2UpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuYXV0aGVudGljYXRlKHRva2VuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJhbXMudG9rZW4gPSB0b2tlbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8gQXJjR0lTIFNlcnZlciBGaW5kL0lkZW50aWZ5IDEwLjUrXG4gIGZvcm1hdDogZnVuY3Rpb24gKGJvb2xlYW4pIHtcbiAgICAvLyB1c2UgZG91YmxlIG5lZ2F0aXZlIHRvIGV4cG9zZSBhIG1vcmUgaW50dWl0aXZlIHBvc2l0aXZlIG1ldGhvZCBuYW1lXG4gICAgdGhpcy5wYXJhbXMucmV0dXJuVW5mb3JtYXR0ZWRWYWx1ZXMgPSAhYm9vbGVhbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZXF1ZXN0OiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnJlcXVlc3RQYXJhbXMpIHtcbiAgICAgIFV0aWwuZXh0ZW5kKHRoaXMucGFyYW1zLCB0aGlzLm9wdGlvbnMucmVxdWVzdFBhcmFtcyk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zZXJ2aWNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VydmljZS5yZXF1ZXN0KHRoaXMucGF0aCwgdGhpcy5wYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgncmVxdWVzdCcsIHRoaXMucGF0aCwgdGhpcy5wYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfSxcblxuICBfcmVxdWVzdDogZnVuY3Rpb24gKG1ldGhvZCwgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciB1cmwgPSAodGhpcy5vcHRpb25zLnByb3h5KSA/IHRoaXMub3B0aW9ucy5wcm94eSArICc/JyArIHRoaXMub3B0aW9ucy51cmwgKyBwYXRoIDogdGhpcy5vcHRpb25zLnVybCArIHBhdGg7XG5cbiAgICBpZiAoKG1ldGhvZCA9PT0gJ2dldCcgfHwgbWV0aG9kID09PSAncmVxdWVzdCcpICYmICF0aGlzLm9wdGlvbnMudXNlQ29ycykge1xuICAgICAgcmV0dXJuIFJlcXVlc3QuZ2V0LkpTT05QKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlcXVlc3RbbWV0aG9kXSh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRhc2sgKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IGdldFVybFBhcmFtcyhvcHRpb25zKTtcbiAgcmV0dXJuIG5ldyBUYXNrKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0YXNrO1xuIiwiaW1wb3J0IHsgcG9pbnQsIGxhdExuZyB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vVGFzayc7XG5pbXBvcnQge1xuICB3YXJuLFxuICByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24sXG4gIGlzQXJjZ2lzT25saW5lLFxuICBleHRlbnRUb0JvdW5kcyxcbiAgX3NldEdlb21ldHJ5XG59IGZyb20gJy4uL1V0aWwnO1xuXG5leHBvcnQgdmFyIFF1ZXJ5ID0gVGFzay5leHRlbmQoe1xuICBzZXR0ZXJzOiB7XG4gICAgJ29mZnNldCc6ICdyZXN1bHRPZmZzZXQnLFxuICAgICdsaW1pdCc6ICdyZXN1bHRSZWNvcmRDb3VudCcsXG4gICAgJ2ZpZWxkcyc6ICdvdXRGaWVsZHMnLFxuICAgICdwcmVjaXNpb24nOiAnZ2VvbWV0cnlQcmVjaXNpb24nLFxuICAgICdmZWF0dXJlSWRzJzogJ29iamVjdElkcycsXG4gICAgJ3JldHVybkdlb21ldHJ5JzogJ3JldHVybkdlb21ldHJ5JyxcbiAgICAncmV0dXJuTSc6ICdyZXR1cm5NJyxcbiAgICAndHJhbnNmb3JtJzogJ2RhdHVtVHJhbnNmb3JtYXRpb24nLFxuICAgICd0b2tlbic6ICd0b2tlbidcbiAgfSxcblxuICBwYXRoOiAncXVlcnknLFxuXG4gIHBhcmFtczoge1xuICAgIHJldHVybkdlb21ldHJ5OiB0cnVlLFxuICAgIHdoZXJlOiAnMT0xJyxcbiAgICBvdXRTcjogNDMyNixcbiAgICBvdXRGaWVsZHM6ICcqJ1xuICB9LFxuXG4gIC8vIFJldHVybnMgYSBmZWF0dXJlIGlmIGl0cyBzaGFwZSBpcyB3aG9sbHkgY29udGFpbmVkIHdpdGhpbiB0aGUgc2VhcmNoIGdlb21ldHJ5LiBWYWxpZCBmb3IgYWxsIHNoYXBlIHR5cGUgY29tYmluYXRpb25zLlxuICB3aXRoaW46IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5UGFyYW1zKGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsQ29udGFpbnMnOyAvLyB0byB0aGUgUkVTVCBhcGkgdGhpcyByZWFkcyBnZW9tZXRyeSAqKmNvbnRhaW5zKiogbGF5ZXJcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBSZXR1cm5zIGEgZmVhdHVyZSBpZiBhbnkgc3BhdGlhbCByZWxhdGlvbnNoaXAgaXMgZm91bmQuIEFwcGxpZXMgdG8gYWxsIHNoYXBlIHR5cGUgY29tYmluYXRpb25zLlxuICBpbnRlcnNlY3RzOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeVBhcmFtcyhnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbEludGVyc2VjdHMnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIFJldHVybnMgYSBmZWF0dXJlIGlmIGl0cyBzaGFwZSB3aG9sbHkgY29udGFpbnMgdGhlIHNlYXJjaCBnZW9tZXRyeS4gVmFsaWQgZm9yIGFsbCBzaGFwZSB0eXBlIGNvbWJpbmF0aW9ucy5cbiAgY29udGFpbnM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5UGFyYW1zKGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsV2l0aGluJzsgLy8gdG8gdGhlIFJFU1QgYXBpIHRoaXMgcmVhZHMgZ2VvbWV0cnkgKip3aXRoaW4qKiBsYXllclxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIFJldHVybnMgYSBmZWF0dXJlIGlmIHRoZSBpbnRlcnNlY3Rpb24gb2YgdGhlIGludGVyaW9ycyBvZiB0aGUgdHdvIHNoYXBlcyBpcyBub3QgZW1wdHkgYW5kIGhhcyBhIGxvd2VyIGRpbWVuc2lvbiB0aGFuIHRoZSBtYXhpbXVtIGRpbWVuc2lvbiBvZiB0aGUgdHdvIHNoYXBlcy4gVHdvIGxpbmVzIHRoYXQgc2hhcmUgYW4gZW5kcG9pbnQgaW4gY29tbW9uIGRvIG5vdCBjcm9zcy4gVmFsaWQgZm9yIExpbmUvTGluZSwgTGluZS9BcmVhLCBNdWx0aS1wb2ludC9BcmVhLCBhbmQgTXVsdGktcG9pbnQvTGluZSBzaGFwZSB0eXBlIGNvbWJpbmF0aW9ucy5cbiAgY3Jvc3NlczogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnlQYXJhbXMoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxDcm9zc2VzJztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBSZXR1cm5zIGEgZmVhdHVyZSBpZiB0aGUgdHdvIHNoYXBlcyBzaGFyZSBhIGNvbW1vbiBib3VuZGFyeS4gSG93ZXZlciwgdGhlIGludGVyc2VjdGlvbiBvZiB0aGUgaW50ZXJpb3JzIG9mIHRoZSB0d28gc2hhcGVzIG11c3QgYmUgZW1wdHkuIEluIHRoZSBQb2ludC9MaW5lIGNhc2UsIHRoZSBwb2ludCBtYXkgdG91Y2ggYW4gZW5kcG9pbnQgb25seSBvZiB0aGUgbGluZS4gQXBwbGllcyB0byBhbGwgY29tYmluYXRpb25zIGV4Y2VwdCBQb2ludC9Qb2ludC5cbiAgdG91Y2hlczogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnlQYXJhbXMoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxUb3VjaGVzJztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBSZXR1cm5zIGEgZmVhdHVyZSBpZiB0aGUgaW50ZXJzZWN0aW9uIG9mIHRoZSB0d28gc2hhcGVzIHJlc3VsdHMgaW4gYW4gb2JqZWN0IG9mIHRoZSBzYW1lIGRpbWVuc2lvbiwgYnV0IGRpZmZlcmVudCBmcm9tIGJvdGggb2YgdGhlIHNoYXBlcy4gQXBwbGllcyB0byBBcmVhL0FyZWEsIExpbmUvTGluZSwgYW5kIE11bHRpLXBvaW50L011bHRpLXBvaW50IHNoYXBlIHR5cGUgY29tYmluYXRpb25zLlxuICBvdmVybGFwczogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnlQYXJhbXMoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxPdmVybGFwcyc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8gUmV0dXJucyBhIGZlYXR1cmUgaWYgdGhlIGVudmVsb3BlIG9mIHRoZSB0d28gc2hhcGVzIGludGVyc2VjdHMuXG4gIGJib3hJbnRlcnNlY3RzOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeVBhcmFtcyhnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbEVudmVsb3BlSW50ZXJzZWN0cyc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8gaWYgc29tZW9uZSBjYW4gaGVscCBkZWNpcGhlciB0aGUgQXJjT2JqZWN0cyBleHBsYW5hdGlvbiBhbmQgdHJhbnNsYXRlIHRvIHBsYWluIHNwZWFrLCB3ZSBzaG91bGQgbWVudGlvbiB0aGlzIG1ldGhvZCBpbiB0aGUgZG9jXG4gIGluZGV4SW50ZXJzZWN0czogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnlQYXJhbXMoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxJbmRleEludGVyc2VjdHMnOyAvLyBSZXR1cm5zIGEgZmVhdHVyZSBpZiB0aGUgZW52ZWxvcGUgb2YgdGhlIHF1ZXJ5IGdlb21ldHJ5IGludGVyc2VjdHMgdGhlIGluZGV4IGVudHJ5IGZvciB0aGUgdGFyZ2V0IGdlb21ldHJ5XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8gb25seSB2YWxpZCBmb3IgRmVhdHVyZSBTZXJ2aWNlcyBydW5uaW5nIG9uIEFyY0dJUyBTZXJ2ZXIgMTAuMysgb3IgQXJjR0lTIE9ubGluZVxuICBuZWFyYnk6IGZ1bmN0aW9uIChsYXRsbmcsIHJhZGl1cykge1xuICAgIGxhdGxuZyA9IGxhdExuZyhsYXRsbmcpO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gW2xhdGxuZy5sbmcsIGxhdGxuZy5sYXRdO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2ludCc7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbEludGVyc2VjdHMnO1xuICAgIHRoaXMucGFyYW1zLnVuaXRzID0gJ2VzcmlTUlVuaXRfTWV0ZXInO1xuICAgIHRoaXMucGFyYW1zLmRpc3RhbmNlID0gcmFkaXVzO1xuICAgIHRoaXMucGFyYW1zLmluU3IgPSA0MzI2O1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHdoZXJlOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgLy8gaW5zdGVhZCBvZiBjb252ZXJ0aW5nIGRvdWJsZS1xdW90ZXMgdG8gc2luZ2xlIHF1b3RlcywgcGFzcyBhcyBpcywgYW5kIHByb3ZpZGUgYSBtb3JlIGluZm9ybWF0aXZlIG1lc3NhZ2UgaWYgYSA0MDAgaXMgZW5jb3VudGVyZWRcbiAgICB0aGlzLnBhcmFtcy53aGVyZSA9IHN0cmluZztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBiZXR3ZWVuOiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgIHRoaXMucGFyYW1zLnRpbWUgPSBbc3RhcnQudmFsdWVPZigpLCBlbmQudmFsdWVPZigpXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBzaW1wbGlmeTogZnVuY3Rpb24gKG1hcCwgZmFjdG9yKSB7XG4gICAgdmFyIG1hcFdpZHRoID0gTWF0aC5hYnMobWFwLmdldEJvdW5kcygpLmdldFdlc3QoKSAtIG1hcC5nZXRCb3VuZHMoKS5nZXRFYXN0KCkpO1xuICAgIHRoaXMucGFyYW1zLm1heEFsbG93YWJsZU9mZnNldCA9IChtYXBXaWR0aCAvIG1hcC5nZXRTaXplKCkueSkgKiBmYWN0b3I7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb3JkZXJCeTogZnVuY3Rpb24gKGZpZWxkTmFtZSwgb3JkZXIpIHtcbiAgICBvcmRlciA9IG9yZGVyIHx8ICdBU0MnO1xuICAgIHRoaXMucGFyYW1zLm9yZGVyQnlGaWVsZHMgPSAodGhpcy5wYXJhbXMub3JkZXJCeUZpZWxkcykgPyB0aGlzLnBhcmFtcy5vcmRlckJ5RmllbGRzICsgJywnIDogJyc7XG4gICAgdGhpcy5wYXJhbXMub3JkZXJCeUZpZWxkcyArPSAoW2ZpZWxkTmFtZSwgb3JkZXJdKS5qb2luKCcgJyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcnVuOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jbGVhblBhcmFtcygpO1xuXG4gICAgLy8gc2VydmljZXMgaG9zdGVkIG9uIEFyY0dJUyBPbmxpbmUgYW5kIEFyY0dJUyBTZXJ2ZXIgMTAuMy4xKyBzdXBwb3J0IHJlcXVlc3RpbmcgZ2VvanNvbiBkaXJlY3RseVxuICAgIGlmICh0aGlzLm9wdGlvbnMuaXNNb2Rlcm4gfHwgaXNBcmNnaXNPbmxpbmUodGhpcy5vcHRpb25zLnVybCkpIHtcbiAgICAgIHRoaXMucGFyYW1zLmYgPSAnZ2VvanNvbic7XG5cbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgICB0aGlzLl90cmFwU1FMZXJyb3JzKGVycm9yKTtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UsIHJlc3BvbnNlKTtcbiAgICAgIH0sIHRoaXMpO1xuXG4gICAgLy8gb3RoZXJ3aXNlIGNvbnZlcnQgaXQgaW4gdGhlIGNhbGxiYWNrIHRoZW4gcGFzcyBpdCBvblxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5fdHJhcFNRTGVycm9ycyhlcnJvcik7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIChyZXNwb25zZSAmJiByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24ocmVzcG9uc2UpKSwgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICB9LFxuXG4gIGNvdW50OiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jbGVhblBhcmFtcygpO1xuICAgIHRoaXMucGFyYW1zLnJldHVybkNvdW50T25seSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGVycm9yLCAocmVzcG9uc2UgJiYgcmVzcG9uc2UuY291bnQpLCByZXNwb25zZSk7XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgaWRzOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jbGVhblBhcmFtcygpO1xuICAgIHRoaXMucGFyYW1zLnJldHVybklkc09ubHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBlcnJvciwgKHJlc3BvbnNlICYmIHJlc3BvbnNlLm9iamVjdElkcyksIHJlc3BvbnNlKTtcbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICAvLyBvbmx5IHZhbGlkIGZvciBGZWF0dXJlIFNlcnZpY2VzIHJ1bm5pbmcgb24gQXJjR0lTIFNlcnZlciAxMC4zKyBvciBBcmNHSVMgT25saW5lXG4gIGJvdW5kczogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fY2xlYW5QYXJhbXMoKTtcbiAgICB0aGlzLnBhcmFtcy5yZXR1cm5FeHRlbnRPbmx5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5leHRlbnQgJiYgZXh0ZW50VG9Cb3VuZHMocmVzcG9uc2UuZXh0ZW50KSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCBleHRlbnRUb0JvdW5kcyhyZXNwb25zZS5leHRlbnQpLCByZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvciA9IHtcbiAgICAgICAgICBtZXNzYWdlOiAnSW52YWxpZCBCb3VuZHMnXG4gICAgICAgIH07XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIG51bGwsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICBkaXN0aW5jdDogZnVuY3Rpb24gKCkge1xuICAgIC8vIGdlb21ldHJ5IG11c3QgYmUgb21pdHRlZCBmb3IgcXVlcmllcyByZXF1ZXN0aW5nIGRpc3RpbmN0IHZhbHVlc1xuICAgIHRoaXMucGFyYW1zLnJldHVybkdlb21ldHJ5ID0gZmFsc2U7XG4gICAgdGhpcy5wYXJhbXMucmV0dXJuRGlzdGluY3RWYWx1ZXMgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIG9ubHkgdmFsaWQgZm9yIGltYWdlIHNlcnZpY2VzXG4gIHBpeGVsU2l6ZTogZnVuY3Rpb24gKHJhd1BvaW50KSB7XG4gICAgdmFyIGNhc3RQb2ludCA9IHBvaW50KHJhd1BvaW50KTtcbiAgICB0aGlzLnBhcmFtcy5waXhlbFNpemUgPSBbY2FzdFBvaW50LngsIGNhc3RQb2ludC55XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBvbmx5IHZhbGlkIGZvciBtYXAgc2VydmljZXNcbiAgbGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xuICAgIHRoaXMucGF0aCA9IGxheWVyICsgJy9xdWVyeSc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3RyYXBTUUxlcnJvcnM6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICc0MDAnKSB7XG4gICAgICAgIHdhcm4oJ29uZSBjb21tb24gc3ludGF4IGVycm9yIGluIHF1ZXJ5IHJlcXVlc3RzIGlzIGVuY2FzaW5nIHN0cmluZyB2YWx1ZXMgaW4gZG91YmxlIHF1b3RlcyBpbnN0ZWFkIG9mIHNpbmdsZSBxdW90ZXMnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX2NsZWFuUGFyYW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgZGVsZXRlIHRoaXMucGFyYW1zLnJldHVybklkc09ubHk7XG4gICAgZGVsZXRlIHRoaXMucGFyYW1zLnJldHVybkV4dGVudE9ubHk7XG4gICAgZGVsZXRlIHRoaXMucGFyYW1zLnJldHVybkNvdW50T25seTtcbiAgfSxcblxuICBfc2V0R2VvbWV0cnlQYXJhbXM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMucGFyYW1zLmluU3IgPSA0MzI2O1xuICAgIHZhciBjb252ZXJ0ZWQgPSBfc2V0R2VvbWV0cnkoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gY29udmVydGVkLmdlb21ldHJ5O1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5VHlwZSA9IGNvbnZlcnRlZC5nZW9tZXRyeVR5cGU7XG4gIH1cblxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeSAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IFF1ZXJ5KG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBxdWVyeTtcbiIsImltcG9ydCB7IFRhc2sgfSBmcm9tICcuL1Rhc2snO1xuaW1wb3J0IHsgcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uIH0gZnJvbSAnLi4vVXRpbCc7XG5cbmV4cG9ydCB2YXIgRmluZCA9IFRhc2suZXh0ZW5kKHtcbiAgc2V0dGVyczoge1xuICAgIC8vIG1ldGhvZCBuYW1lID4gcGFyYW0gbmFtZVxuICAgICdjb250YWlucyc6ICdjb250YWlucycsXG4gICAgJ3RleHQnOiAnc2VhcmNoVGV4dCcsXG4gICAgJ2ZpZWxkcyc6ICdzZWFyY2hGaWVsZHMnLCAvLyBkZW5vdGUgYW4gYXJyYXkgb3Igc2luZ2xlIHN0cmluZ1xuICAgICdzcGF0aWFsUmVmZXJlbmNlJzogJ3NyJyxcbiAgICAnc3InOiAnc3InLFxuICAgICdsYXllcnMnOiAnbGF5ZXJzJyxcbiAgICAncmV0dXJuR2VvbWV0cnknOiAncmV0dXJuR2VvbWV0cnknLFxuICAgICdtYXhBbGxvd2FibGVPZmZzZXQnOiAnbWF4QWxsb3dhYmxlT2Zmc2V0JyxcbiAgICAncHJlY2lzaW9uJzogJ2dlb21ldHJ5UHJlY2lzaW9uJyxcbiAgICAnZHluYW1pY0xheWVycyc6ICdkeW5hbWljTGF5ZXJzJyxcbiAgICAncmV0dXJuWic6ICdyZXR1cm5aJyxcbiAgICAncmV0dXJuTSc6ICdyZXR1cm5NJyxcbiAgICAnZ2RiVmVyc2lvbic6ICdnZGJWZXJzaW9uJyxcbiAgICAvLyBza2lwcGVkIGltcGxlbWVudGluZyB0aGlzIChmb3Igbm93KSBiZWNhdXNlIHRoZSBSRVNUIHNlcnZpY2UgaW1wbGVtZW50YXRpb24gaXNudCBjb25zaXN0ZW50IGJldHdlZW4gb3BlcmF0aW9uc1xuICAgIC8vICd0cmFuc2Zvcm0nOiAnZGF0dW1UcmFuc2Zvcm1hdGlvbnMnLFxuICAgICd0b2tlbic6ICd0b2tlbidcbiAgfSxcblxuICBwYXRoOiAnZmluZCcsXG5cbiAgcGFyYW1zOiB7XG4gICAgc3I6IDQzMjYsXG4gICAgY29udGFpbnM6IHRydWUsXG4gICAgcmV0dXJuR2VvbWV0cnk6IHRydWUsXG4gICAgcmV0dXJuWjogdHJ1ZSxcbiAgICByZXR1cm5NOiBmYWxzZVxuICB9LFxuXG4gIGxheWVyRGVmczogZnVuY3Rpb24gKGlkLCB3aGVyZSkge1xuICAgIHRoaXMucGFyYW1zLmxheWVyRGVmcyA9ICh0aGlzLnBhcmFtcy5sYXllckRlZnMpID8gdGhpcy5wYXJhbXMubGF5ZXJEZWZzICsgJzsnIDogJyc7XG4gICAgdGhpcy5wYXJhbXMubGF5ZXJEZWZzICs9IChbaWQsIHdoZXJlXSkuam9pbignOicpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHNpbXBsaWZ5OiBmdW5jdGlvbiAobWFwLCBmYWN0b3IpIHtcbiAgICB2YXIgbWFwV2lkdGggPSBNYXRoLmFicyhtYXAuZ2V0Qm91bmRzKCkuZ2V0V2VzdCgpIC0gbWFwLmdldEJvdW5kcygpLmdldEVhc3QoKSk7XG4gICAgdGhpcy5wYXJhbXMubWF4QWxsb3dhYmxlT2Zmc2V0ID0gKG1hcFdpZHRoIC8gbWFwLmdldFNpemUoKS55KSAqIGZhY3RvcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgKHJlc3BvbnNlICYmIHJlc3BvbnNlVG9GZWF0dXJlQ29sbGVjdGlvbihyZXNwb25zZSkpLCByZXNwb25zZSk7XG4gICAgfSwgY29udGV4dCk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZCAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEZpbmQob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZpbmQ7XG4iLCJpbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi9UYXNrJztcblxuZXhwb3J0IHZhciBJZGVudGlmeSA9IFRhc2suZXh0ZW5kKHtcbiAgcGF0aDogJ2lkZW50aWZ5JyxcblxuICBiZXR3ZWVuOiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgIHRoaXMucGFyYW1zLnRpbWUgPSBbc3RhcnQudmFsdWVPZigpLCBlbmQudmFsdWVPZigpXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGlmeSAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IElkZW50aWZ5KG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpZGVudGlmeTtcbiIsImltcG9ydCB7IGxhdExuZyB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgSWRlbnRpZnkgfSBmcm9tICcuL0lkZW50aWZ5JztcbmltcG9ydCB7IHJlc3BvbnNlVG9GZWF0dXJlQ29sbGVjdGlvbixcbiAgYm91bmRzVG9FeHRlbnQsXG4gIF9zZXRHZW9tZXRyeVxufSBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBJZGVudGlmeUZlYXR1cmVzID0gSWRlbnRpZnkuZXh0ZW5kKHtcbiAgc2V0dGVyczoge1xuICAgICdsYXllcnMnOiAnbGF5ZXJzJyxcbiAgICAncHJlY2lzaW9uJzogJ2dlb21ldHJ5UHJlY2lzaW9uJyxcbiAgICAndG9sZXJhbmNlJzogJ3RvbGVyYW5jZScsXG4gICAgLy8gc2tpcHBlZCBpbXBsZW1lbnRpbmcgdGhpcyAoZm9yIG5vdykgYmVjYXVzZSB0aGUgUkVTVCBzZXJ2aWNlIGltcGxlbWVudGF0aW9uIGlzbnQgY29uc2lzdGVudCBiZXR3ZWVuIG9wZXJhdGlvbnMuXG4gICAgLy8gJ3RyYW5zZm9ybSc6ICdkYXR1bVRyYW5zZm9ybWF0aW9ucydcbiAgICAncmV0dXJuR2VvbWV0cnknOiAncmV0dXJuR2VvbWV0cnknXG4gIH0sXG5cbiAgcGFyYW1zOiB7XG4gICAgc3I6IDQzMjYsXG4gICAgbGF5ZXJzOiAnYWxsJyxcbiAgICB0b2xlcmFuY2U6IDMsXG4gICAgcmV0dXJuR2VvbWV0cnk6IHRydWVcbiAgfSxcblxuICBvbjogZnVuY3Rpb24gKG1hcCkge1xuICAgIHZhciBleHRlbnQgPSBib3VuZHNUb0V4dGVudChtYXAuZ2V0Qm91bmRzKCkpO1xuICAgIHZhciBzaXplID0gbWFwLmdldFNpemUoKTtcbiAgICB0aGlzLnBhcmFtcy5pbWFnZURpc3BsYXkgPSBbc2l6ZS54LCBzaXplLnksIDk2XTtcbiAgICB0aGlzLnBhcmFtcy5tYXBFeHRlbnQgPSBbZXh0ZW50LnhtaW4sIGV4dGVudC55bWluLCBleHRlbnQueG1heCwgZXh0ZW50LnltYXhdO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGF0OiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICAvLyBjYXN0IGxhdCwgbG9uZyBwYWlycyBpbiByYXcgYXJyYXkgZm9ybSBtYW51YWxseVxuICAgIGlmIChnZW9tZXRyeS5sZW5ndGggPT09IDIpIHtcbiAgICAgIGdlb21ldHJ5ID0gbGF0TG5nKGdlb21ldHJ5KTtcbiAgICB9XG4gICAgdGhpcy5fc2V0R2VvbWV0cnlQYXJhbXMoZ2VvbWV0cnkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGxheWVyRGVmOiBmdW5jdGlvbiAoaWQsIHdoZXJlKSB7XG4gICAgdGhpcy5wYXJhbXMubGF5ZXJEZWZzID0gKHRoaXMucGFyYW1zLmxheWVyRGVmcykgPyB0aGlzLnBhcmFtcy5sYXllckRlZnMgKyAnOycgOiAnJztcbiAgICB0aGlzLnBhcmFtcy5sYXllckRlZnMgKz0gKFtpZCwgd2hlcmVdKS5qb2luKCc6Jyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2ltcGxpZnk6IGZ1bmN0aW9uIChtYXAsIGZhY3Rvcikge1xuICAgIHZhciBtYXBXaWR0aCA9IE1hdGguYWJzKG1hcC5nZXRCb3VuZHMoKS5nZXRXZXN0KCkgLSBtYXAuZ2V0Qm91bmRzKCkuZ2V0RWFzdCgpKTtcbiAgICB0aGlzLnBhcmFtcy5tYXhBbGxvd2FibGVPZmZzZXQgPSAobWFwV2lkdGggLyBtYXAuZ2V0U2l6ZSgpLnkpICogZmFjdG9yO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAvLyBpbW1lZGlhdGVseSBpbnZva2Ugd2l0aCBhbiBlcnJvclxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHVuZGVmaW5lZCwgcmVzcG9uc2UpO1xuICAgICAgICByZXR1cm47XG5cbiAgICAgIC8vIG9rIG5vIGVycm9yIGxldHMganVzdCBhc3N1bWUgd2UgaGF2ZSBmZWF0dXJlcy4uLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGZlYXR1cmVDb2xsZWN0aW9uID0gcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uKHJlc3BvbnNlKTtcbiAgICAgICAgcmVzcG9uc2UucmVzdWx0cyA9IHJlc3BvbnNlLnJlc3VsdHMucmV2ZXJzZSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGZlYXR1cmUgPSBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlc1tpXTtcbiAgICAgICAgICBmZWF0dXJlLmxheWVySWQgPSByZXNwb25zZS5yZXN1bHRzW2ldLmxheWVySWQ7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCB1bmRlZmluZWQsIGZlYXR1cmVDb2xsZWN0aW9uLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgX3NldEdlb21ldHJ5UGFyYW1zOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB2YXIgY29udmVydGVkID0gX3NldEdlb21ldHJ5KGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeSA9IGNvbnZlcnRlZC5nZW9tZXRyeTtcbiAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeVR5cGUgPSBjb252ZXJ0ZWQuZ2VvbWV0cnlUeXBlO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aWZ5RmVhdHVyZXMgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBJZGVudGlmeUZlYXR1cmVzKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpZGVudGlmeUZlYXR1cmVzO1xuIiwiaW1wb3J0IHsgbGF0TG5nIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBJZGVudGlmeSB9IGZyb20gJy4vSWRlbnRpZnknO1xuaW1wb3J0IHsgcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uIH0gZnJvbSAnLi4vVXRpbCc7XG5cbmV4cG9ydCB2YXIgSWRlbnRpZnlJbWFnZSA9IElkZW50aWZ5LmV4dGVuZCh7XG4gIHNldHRlcnM6IHtcbiAgICAnc2V0TW9zYWljUnVsZSc6ICdtb3NhaWNSdWxlJyxcbiAgICAnc2V0UmVuZGVyaW5nUnVsZSc6ICdyZW5kZXJpbmdSdWxlJyxcbiAgICAnc2V0UGl4ZWxTaXplJzogJ3BpeGVsU2l6ZScsXG4gICAgJ3JldHVybkNhdGFsb2dJdGVtcyc6ICdyZXR1cm5DYXRhbG9nSXRlbXMnLFxuICAgICdyZXR1cm5HZW9tZXRyeSc6ICdyZXR1cm5HZW9tZXRyeSdcbiAgfSxcblxuICBwYXJhbXM6IHtcbiAgICByZXR1cm5HZW9tZXRyeTogZmFsc2VcbiAgfSxcblxuICBhdDogZnVuY3Rpb24gKGxhdGxuZykge1xuICAgIGxhdGxuZyA9IGxhdExuZyhsYXRsbmcpO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgeDogbGF0bG5nLmxuZyxcbiAgICAgIHk6IGxhdGxuZy5sYXQsXG4gICAgICBzcGF0aWFsUmVmZXJlbmNlOiB7XG4gICAgICAgIHdraWQ6IDQzMjZcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9pbnQnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldE1vc2FpY1J1bGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXMubW9zYWljUnVsZTtcbiAgfSxcblxuICBnZXRSZW5kZXJpbmdSdWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zLnJlbmRlcmluZ1J1bGU7XG4gIH0sXG5cbiAgZ2V0UGl4ZWxTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zLnBpeGVsU2l6ZTtcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgKHJlc3BvbnNlICYmIHRoaXMuX3Jlc3BvbnNlVG9HZW9KU09OKHJlc3BvbnNlKSksIHJlc3BvbnNlKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICAvLyBnZXQgcGl4ZWwgZGF0YSBhbmQgcmV0dXJuIGFzIGdlb0pTT04gcG9pbnRcbiAgLy8gcG9wdWxhdGUgY2F0YWxvZyBpdGVtcyAoaWYgYW55KVxuICAvLyBtZXJnaW5nIGluIGFueSBjYXRhbG9nSXRlbVZpc2liaWxpdGllcyBhcyBhIHByb3Blcnkgb2YgZWFjaCBmZWF0dXJlXG4gIF9yZXNwb25zZVRvR2VvSlNPTjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgdmFyIGxvY2F0aW9uID0gcmVzcG9uc2UubG9jYXRpb247XG4gICAgdmFyIGNhdGFsb2dJdGVtcyA9IHJlc3BvbnNlLmNhdGFsb2dJdGVtcztcbiAgICB2YXIgY2F0YWxvZ0l0ZW1WaXNpYmlsaXRpZXMgPSByZXNwb25zZS5jYXRhbG9nSXRlbVZpc2liaWxpdGllcztcbiAgICB2YXIgZ2VvSlNPTiA9IHtcbiAgICAgICdwaXhlbCc6IHtcbiAgICAgICAgJ3R5cGUnOiAnRmVhdHVyZScsXG4gICAgICAgICdnZW9tZXRyeSc6IHtcbiAgICAgICAgICAndHlwZSc6ICdQb2ludCcsXG4gICAgICAgICAgJ2Nvb3JkaW5hdGVzJzogW2xvY2F0aW9uLngsIGxvY2F0aW9uLnldXG4gICAgICAgIH0sXG4gICAgICAgICdjcnMnOiB7XG4gICAgICAgICAgJ3R5cGUnOiAnRVBTRycsXG4gICAgICAgICAgJ3Byb3BlcnRpZXMnOiB7XG4gICAgICAgICAgICAnY29kZSc6IGxvY2F0aW9uLnNwYXRpYWxSZWZlcmVuY2Uud2tpZFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb3BlcnRpZXMnOiB7XG4gICAgICAgICAgJ09CSkVDVElEJzogcmVzcG9uc2Uub2JqZWN0SWQsXG4gICAgICAgICAgJ25hbWUnOiByZXNwb25zZS5uYW1lLFxuICAgICAgICAgICd2YWx1ZSc6IHJlc3BvbnNlLnZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgICdpZCc6IHJlc3BvbnNlLm9iamVjdElkXG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChyZXNwb25zZS5wcm9wZXJ0aWVzICYmIHJlc3BvbnNlLnByb3BlcnRpZXMuVmFsdWVzKSB7XG4gICAgICBnZW9KU09OLnBpeGVsLnByb3BlcnRpZXMudmFsdWVzID0gcmVzcG9uc2UucHJvcGVydGllcy5WYWx1ZXM7XG4gICAgfVxuXG4gICAgaWYgKGNhdGFsb2dJdGVtcyAmJiBjYXRhbG9nSXRlbXMuZmVhdHVyZXMpIHtcbiAgICAgIGdlb0pTT04uY2F0YWxvZ0l0ZW1zID0gcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uKGNhdGFsb2dJdGVtcyk7XG4gICAgICBpZiAoY2F0YWxvZ0l0ZW1WaXNpYmlsaXRpZXMgJiYgY2F0YWxvZ0l0ZW1WaXNpYmlsaXRpZXMubGVuZ3RoID09PSBnZW9KU09OLmNhdGFsb2dJdGVtcy5mZWF0dXJlcy5sZW5ndGgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IGNhdGFsb2dJdGVtVmlzaWJpbGl0aWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgZ2VvSlNPTi5jYXRhbG9nSXRlbXMuZmVhdHVyZXNbaV0ucHJvcGVydGllcy5jYXRhbG9nSXRlbVZpc2liaWxpdHkgPSBjYXRhbG9nSXRlbVZpc2liaWxpdGllc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZ2VvSlNPTjtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aWZ5SW1hZ2UgKHBhcmFtcykge1xuICByZXR1cm4gbmV3IElkZW50aWZ5SW1hZ2UocGFyYW1zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaWRlbnRpZnlJbWFnZTtcbiIsImltcG9ydCB7IFV0aWwsIEV2ZW50ZWQgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7Y29yc30gZnJvbSAnLi4vU3VwcG9ydCc7XG5pbXBvcnQge2NsZWFuVXJsLCBnZXRVcmxQYXJhbXN9IGZyb20gJy4uL1V0aWwnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vUmVxdWVzdCc7XG5cbmV4cG9ydCB2YXIgU2VydmljZSA9IEV2ZW50ZWQuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgcHJveHk6IGZhbHNlLFxuICAgIHVzZUNvcnM6IGNvcnMsXG4gICAgdGltZW91dDogMFxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5fcmVxdWVzdFF1ZXVlID0gW107XG4gICAgdGhpcy5fYXV0aGVudGljYXRpbmcgPSBmYWxzZTtcbiAgICBVdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zLnVybCA9IGNsZWFuVXJsKHRoaXMub3B0aW9ucy51cmwpO1xuICB9LFxuXG4gIGdldDogZnVuY3Rpb24gKHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnZ2V0JywgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH0sXG5cbiAgcG9zdDogZnVuY3Rpb24gKHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgncG9zdCcsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9LFxuXG4gIHJlcXVlc3Q6IGZ1bmN0aW9uIChwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ3JlcXVlc3QnLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfSxcblxuICBtZXRhZGF0YTogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ2dldCcsICcnLCB7fSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9LFxuXG4gIGF1dGhlbnRpY2F0ZTogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdGhpcy5fYXV0aGVudGljYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLm9wdGlvbnMudG9rZW4gPSB0b2tlbjtcbiAgICB0aGlzLl9ydW5RdWV1ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFRpbWVvdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpbWVvdXQ7XG4gIH0sXG5cbiAgc2V0VGltZW91dDogZnVuY3Rpb24gKHRpbWVvdXQpIHtcbiAgICB0aGlzLm9wdGlvbnMudGltZW91dCA9IHRpbWVvdXQ7XG4gIH0sXG5cbiAgX3JlcXVlc3Q6IGZ1bmN0aW9uIChtZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLmZpcmUoJ3JlcXVlc3RzdGFydCcsIHtcbiAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgfSwgdHJ1ZSk7XG5cbiAgICB2YXIgd3JhcHBlZENhbGxiYWNrID0gdGhpcy5fY3JlYXRlU2VydmljZUNhbGxiYWNrKG1ldGhvZCwgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRva2VuKSB7XG4gICAgICBwYXJhbXMudG9rZW4gPSB0aGlzLm9wdGlvbnMudG9rZW47XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMucmVxdWVzdFBhcmFtcykge1xuICAgICAgVXRpbC5leHRlbmQocGFyYW1zLCB0aGlzLm9wdGlvbnMucmVxdWVzdFBhcmFtcyk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9hdXRoZW50aWNhdGluZykge1xuICAgICAgdGhpcy5fcmVxdWVzdFF1ZXVlLnB1c2goW21ldGhvZCwgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dF0pO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXJsID0gKHRoaXMub3B0aW9ucy5wcm94eSkgPyB0aGlzLm9wdGlvbnMucHJveHkgKyAnPycgKyB0aGlzLm9wdGlvbnMudXJsICsgcGF0aCA6IHRoaXMub3B0aW9ucy51cmwgKyBwYXRoO1xuXG4gICAgICBpZiAoKG1ldGhvZCA9PT0gJ2dldCcgfHwgbWV0aG9kID09PSAncmVxdWVzdCcpICYmICF0aGlzLm9wdGlvbnMudXNlQ29ycykge1xuICAgICAgICByZXR1cm4gUmVxdWVzdC5nZXQuSlNPTlAodXJsLCBwYXJhbXMsIHdyYXBwZWRDYWxsYmFjaywgY29udGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUmVxdWVzdFttZXRob2RdKHVybCwgcGFyYW1zLCB3cmFwcGVkQ2FsbGJhY2ssIGNvbnRleHQpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfY3JlYXRlU2VydmljZUNhbGxiYWNrOiBmdW5jdGlvbiAobWV0aG9kLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIFV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoZXJyb3IgJiYgKGVycm9yLmNvZGUgPT09IDQ5OSB8fCBlcnJvci5jb2RlID09PSA0OTgpKSB7XG4gICAgICAgIHRoaXMuX2F1dGhlbnRpY2F0aW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9yZXF1ZXN0UXVldWUucHVzaChbbWV0aG9kLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0XSk7XG5cbiAgICAgICAgLy8gZmlyZSBhbiBldmVudCBmb3IgdXNlcnMgdG8gaGFuZGxlIGFuZCByZS1hdXRoZW50aWNhdGVcbiAgICAgICAgdGhpcy5maXJlKCdhdXRoZW50aWNhdGlvbnJlcXVpcmVkJywge1xuICAgICAgICAgIGF1dGhlbnRpY2F0ZTogVXRpbC5iaW5kKHRoaXMuYXV0aGVudGljYXRlLCB0aGlzKVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICAvLyBpZiB0aGUgdXNlciBoYXMgYWNjZXNzIHRvIGEgY2FsbGJhY2sgdGhleSBjYW4gaGFuZGxlIHRoZSBhdXRoIGVycm9yXG4gICAgICAgIGVycm9yLmF1dGhlbnRpY2F0ZSA9IFV0aWwuYmluZCh0aGlzLmF1dGhlbnRpY2F0ZSwgdGhpcyk7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlKTtcblxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHRoaXMuZmlyZSgncmVxdWVzdGVycm9yJywge1xuICAgICAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICBjb2RlOiBlcnJvci5jb2RlLFxuICAgICAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5maXJlKCdyZXF1ZXN0c3VjY2VzcycsIHtcbiAgICAgICAgICB1cmw6IHRoaXMub3B0aW9ucy51cmwgKyBwYXRoLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZSxcbiAgICAgICAgICBtZXRob2Q6IG1ldGhvZFxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maXJlKCdyZXF1ZXN0ZW5kJywge1xuICAgICAgICB1cmw6IHRoaXMub3B0aW9ucy51cmwgKyBwYXRoLFxuICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgbWV0aG9kOiBtZXRob2RcbiAgICAgIH0sIHRydWUpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIF9ydW5RdWV1ZTogZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGkgPSB0aGlzLl9yZXF1ZXN0UXVldWUubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gdGhpcy5fcmVxdWVzdFF1ZXVlW2ldO1xuICAgICAgdmFyIG1ldGhvZCA9IHJlcXVlc3Quc2hpZnQoKTtcbiAgICAgIHRoaXNbbWV0aG9kXS5hcHBseSh0aGlzLCByZXF1ZXN0KTtcbiAgICB9XG4gICAgdGhpcy5fcmVxdWVzdFF1ZXVlID0gW107XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VydmljZSAob3B0aW9ucykge1xuICBvcHRpb25zID0gZ2V0VXJsUGFyYW1zKG9wdGlvbnMpO1xuICByZXR1cm4gbmV3IFNlcnZpY2Uob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNlcnZpY2U7XG4iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi9TZXJ2aWNlJztcbmltcG9ydCBpZGVudGlmeUZlYXR1cmVzIGZyb20gJy4uL1Rhc2tzL0lkZW50aWZ5RmVhdHVyZXMnO1xuaW1wb3J0IHF1ZXJ5IGZyb20gJy4uL1Rhc2tzL1F1ZXJ5JztcbmltcG9ydCBmaW5kIGZyb20gJy4uL1Rhc2tzL0ZpbmQnO1xuXG5leHBvcnQgdmFyIE1hcFNlcnZpY2UgPSBTZXJ2aWNlLmV4dGVuZCh7XG5cbiAgaWRlbnRpZnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gaWRlbnRpZnlGZWF0dXJlcyh0aGlzKTtcbiAgfSxcblxuICBmaW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZpbmQodGhpcyk7XG4gIH0sXG5cbiAgcXVlcnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcXVlcnkodGhpcyk7XG4gIH1cblxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBTZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgTWFwU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwU2VydmljZTtcbiIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuL1NlcnZpY2UnO1xuaW1wb3J0IGlkZW50aWZ5SW1hZ2UgZnJvbSAnLi4vVGFza3MvSWRlbnRpZnlJbWFnZSc7XG5pbXBvcnQgcXVlcnkgZnJvbSAnLi4vVGFza3MvUXVlcnknO1xuXG5leHBvcnQgdmFyIEltYWdlU2VydmljZSA9IFNlcnZpY2UuZXh0ZW5kKHtcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBxdWVyeSh0aGlzKTtcbiAgfSxcblxuICBpZGVudGlmeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBpZGVudGlmeUltYWdlKHRoaXMpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGltYWdlU2VydmljZSAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEltYWdlU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW1hZ2VTZXJ2aWNlO1xuIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4vU2VydmljZSc7XG5pbXBvcnQgcXVlcnkgZnJvbSAnLi4vVGFza3MvUXVlcnknO1xuaW1wb3J0IHsgZ2VvanNvblRvQXJjR0lTIH0gZnJvbSAnLi4vVXRpbCc7XG5cbmV4cG9ydCB2YXIgRmVhdHVyZUxheWVyU2VydmljZSA9IFNlcnZpY2UuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgaWRBdHRyaWJ1dGU6ICdPQkpFQ1RJRCdcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBxdWVyeSh0aGlzKTtcbiAgfSxcblxuICBhZGRGZWF0dXJlOiBmdW5jdGlvbiAoZmVhdHVyZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBkZWxldGUgZmVhdHVyZS5pZDtcblxuICAgIGZlYXR1cmUgPSBnZW9qc29uVG9BcmNHSVMoZmVhdHVyZSk7XG5cbiAgICByZXR1cm4gdGhpcy5wb3N0KCdhZGRGZWF0dXJlcycsIHtcbiAgICAgIGZlYXR1cmVzOiBbZmVhdHVyZV1cbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gKHJlc3BvbnNlICYmIHJlc3BvbnNlLmFkZFJlc3VsdHMpID8gcmVzcG9uc2UuYWRkUmVzdWx0c1swXSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yIHx8IHJlc3BvbnNlLmFkZFJlc3VsdHNbMF0uZXJyb3IsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgdXBkYXRlRmVhdHVyZTogZnVuY3Rpb24gKGZlYXR1cmUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgZmVhdHVyZSA9IGdlb2pzb25Ub0FyY0dJUyhmZWF0dXJlLCB0aGlzLm9wdGlvbnMuaWRBdHRyaWJ1dGUpO1xuXG4gICAgcmV0dXJuIHRoaXMucG9zdCgndXBkYXRlRmVhdHVyZXMnLCB7XG4gICAgICBmZWF0dXJlczogW2ZlYXR1cmVdXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgdmFyIHJlc3VsdCA9IChyZXNwb25zZSAmJiByZXNwb25zZS51cGRhdGVSZXN1bHRzKSA/IHJlc3BvbnNlLnVwZGF0ZVJlc3VsdHNbMF0gOiB1bmRlZmluZWQ7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciB8fCByZXNwb25zZS51cGRhdGVSZXN1bHRzWzBdLmVycm9yLCByZXN1bHQpO1xuICAgICAgfVxuICAgIH0sIGNvbnRleHQpO1xuICB9LFxuXG4gIGRlbGV0ZUZlYXR1cmU6IGZ1bmN0aW9uIChpZCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5wb3N0KCdkZWxldGVGZWF0dXJlcycsIHtcbiAgICAgIG9iamVjdElkczogaWRcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRlbGV0ZVJlc3VsdHMpID8gcmVzcG9uc2UuZGVsZXRlUmVzdWx0c1swXSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yIHx8IHJlc3BvbnNlLmRlbGV0ZVJlc3VsdHNbMF0uZXJyb3IsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgZGVsZXRlRmVhdHVyZXM6IGZ1bmN0aW9uIChpZHMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucG9zdCgnZGVsZXRlRmVhdHVyZXMnLCB7XG4gICAgICBvYmplY3RJZHM6IGlkc1xuICAgIH0sIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIC8vIHBhc3MgYmFjayB0aGUgZW50aXJlIGFycmF5XG4gICAgICB2YXIgcmVzdWx0ID0gKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRlbGV0ZVJlc3VsdHMpID8gcmVzcG9uc2UuZGVsZXRlUmVzdWx0cyA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yIHx8IHJlc3BvbnNlLmRlbGV0ZVJlc3VsdHNbMF0uZXJyb3IsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSwgY29udGV4dCk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZUxheWVyU2VydmljZSAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEZlYXR1cmVMYXllclNlcnZpY2Uob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZlYXR1cmVMYXllclNlcnZpY2U7XG4iLCJpbXBvcnQgeyBUaWxlTGF5ZXIsIFV0aWwgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IHBvaW50ZXJFdmVudHMgfSBmcm9tICcuLi9TdXBwb3J0JztcbmltcG9ydCB7XG4gIHNldEVzcmlBdHRyaWJ1dGlvbixcbiAgX2dldEF0dHJpYnV0aW9uRGF0YSxcbiAgX3VwZGF0ZU1hcEF0dHJpYnV0aW9uXG59IGZyb20gJy4uL1V0aWwnO1xuXG52YXIgdGlsZVByb3RvY29sID0gKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCAhPT0gJ2h0dHBzOicpID8gJ2h0dHA6JyA6ICdodHRwczonO1xuXG5leHBvcnQgdmFyIEJhc2VtYXBMYXllciA9IFRpbGVMYXllci5leHRlbmQoe1xuICBzdGF0aWNzOiB7XG4gICAgVElMRVM6IHtcbiAgICAgIFN0cmVldHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX1N0cmVldF9NYXAvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnVVNHUywgTk9BQScsXG4gICAgICAgICAgYXR0cmlidXRpb25Vcmw6ICdodHRwczovL3N0YXRpYy5hcmNnaXMuY29tL2F0dHJpYnV0aW9uL1dvcmxkX1N0cmVldF9NYXAnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBUb3BvZ3JhcGhpYzoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfVG9wb19NYXAvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnVVNHUywgTk9BQScsXG4gICAgICAgICAgYXR0cmlidXRpb25Vcmw6ICdodHRwczovL3N0YXRpYy5hcmNnaXMuY29tL2F0dHJpYnV0aW9uL1dvcmxkX1RvcG9fTWFwJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgT2NlYW5zOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9hcmNnaXMvcmVzdC9zZXJ2aWNlcy9PY2Vhbi9Xb3JsZF9PY2Vhbl9CYXNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MsIE5PQUEnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uVXJsOiAnaHR0cHM6Ly9zdGF0aWMuYXJjZ2lzLmNvbS9hdHRyaWJ1dGlvbi9PY2Vhbl9CYXNlbWFwJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgT2NlYW5zTGFiZWxzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9hcmNnaXMvcmVzdC9zZXJ2aWNlcy9PY2Vhbi9Xb3JsZF9PY2Vhbl9SZWZlcmVuY2UvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBOYXRpb25hbEdlb2dyYXBoaWM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL05hdEdlb19Xb3JsZF9NYXAvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnTmF0aW9uYWwgR2VvZ3JhcGhpYywgRGVMb3JtZSwgSEVSRSwgVU5FUC1XQ01DLCBVU0dTLCBOQVNBLCBFU0EsIE1FVEksIE5SQ0FOLCBHRUJDTywgTk9BQSwgaW5jcmVtZW50IFAgQ29ycC4nXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBEYXJrR3JheToge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvQ2FudmFzL1dvcmxkX0RhcmtfR3JheV9CYXNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0hFUkUsIERlTG9ybWUsIE1hcG15SW5kaWEsICZjb3B5OyBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9ycydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIERhcmtHcmF5TGFiZWxzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9DYW52YXMvV29ybGRfRGFya19HcmF5X1JlZmVyZW5jZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgcGFuZTogKHBvaW50ZXJFdmVudHMpID8gJ2VzcmktbGFiZWxzJyA6ICd0aWxlUGFuZScsXG4gICAgICAgICAgYXR0cmlidXRpb246ICcnXG5cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIEdyYXk6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0NhbnZhcy9Xb3JsZF9MaWdodF9HcmF5X0Jhc2UvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSEVSRSwgRGVMb3JtZSwgTWFwbXlJbmRpYSwgJmNvcHk7IE9wZW5TdHJlZXRNYXAgY29udHJpYnV0b3JzJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgR3JheUxhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvQ2FudmFzL1dvcmxkX0xpZ2h0X0dyYXlfUmVmZXJlbmNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIEltYWdlcnk6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX0ltYWdlcnkvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnRGlnaXRhbEdsb2JlLCBHZW9FeWUsIGktY3ViZWQsIFVTREEsIFVTR1MsIEFFWCwgR2V0bWFwcGluZywgQWVyb2dyaWQsIElHTiwgSUdQLCBzd2lzc3RvcG8sIGFuZCB0aGUgR0lTIFVzZXIgQ29tbXVuaXR5JyxcbiAgICAgICAgICBhdHRyaWJ1dGlvblVybDogJ2h0dHBzOi8vc3RhdGljLmFyY2dpcy5jb20vYXR0cmlidXRpb24vV29ybGRfSW1hZ2VyeSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIEltYWdlcnlMYWJlbHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1JlZmVyZW5jZS9Xb3JsZF9Cb3VuZGFyaWVzX2FuZF9QbGFjZXMvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgSW1hZ2VyeVRyYW5zcG9ydGF0aW9uOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9SZWZlcmVuY2UvV29ybGRfVHJhbnNwb3J0YXRpb24vTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBTaGFkZWRSZWxpZWY6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX1NoYWRlZF9SZWxpZWYvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxMyxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnVVNHUydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFNoYWRlZFJlbGllZkxhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvUmVmZXJlbmNlL1dvcmxkX0JvdW5kYXJpZXNfYW5kX1BsYWNlc19BbHRlcm5hdGUvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxMixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgVGVycmFpbjoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfVGVycmFpbl9CYXNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTMsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MsIE5PQUEnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBUZXJyYWluTGFiZWxzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9SZWZlcmVuY2UvV29ybGRfUmVmZXJlbmNlX092ZXJsYXkvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxMyxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgVVNBVG9wbzoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvVVNBX1RvcG9fTWFwcy9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE1LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdVU0dTLCBOYXRpb25hbCBHZW9ncmFwaGljIFNvY2lldHksIGktY3ViZWQnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBJbWFnZXJ5Q2xhcml0eToge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8vY2xhcml0eS5tYXB0aWxlcy5hcmNnaXMuY29tL2FyY2dpcy9yZXN0L3NlcnZpY2VzL1dvcmxkX0ltYWdlcnkvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0VzcmksIERpZ2l0YWxHbG9iZSwgR2VvRXllLCBFYXJ0aHN0YXIgR2VvZ3JhcGhpY3MsIENORVMvQWlyYnVzIERTLCBVU0RBLCBVU0dTLCBBZXJvR1JJRCwgSUdOLCBhbmQgdGhlIEdJUyBVc2VyIENvbW11bml0eSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbmZpZztcblxuICAgIC8vIHNldCB0aGUgY29uZmlnIHZhcmlhYmxlIHdpdGggdGhlIGFwcHJvcHJpYXRlIGNvbmZpZyBvYmplY3RcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgJiYga2V5LnVybFRlbXBsYXRlICYmIGtleS5vcHRpb25zKSB7XG4gICAgICBjb25maWcgPSBrZXk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBCYXNlbWFwTGF5ZXIuVElMRVNba2V5XSkge1xuICAgICAgY29uZmlnID0gQmFzZW1hcExheWVyLlRJTEVTW2tleV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTC5lc3JpLkJhc2VtYXBMYXllcjogSW52YWxpZCBwYXJhbWV0ZXIuIFVzZSBvbmUgb2YgXCJTdHJlZXRzXCIsIFwiVG9wb2dyYXBoaWNcIiwgXCJPY2VhbnNcIiwgXCJPY2VhbnNMYWJlbHNcIiwgXCJOYXRpb25hbEdlb2dyYXBoaWNcIiwgXCJHcmF5XCIsIFwiR3JheUxhYmVsc1wiLCBcIkRhcmtHcmF5XCIsIFwiRGFya0dyYXlMYWJlbHNcIiwgXCJJbWFnZXJ5XCIsIFwiSW1hZ2VyeUxhYmVsc1wiLCBcIkltYWdlcnlUcmFuc3BvcnRhdGlvblwiLCBcIkltYWdlcnlDbGFyaXR5XCIsIFwiU2hhZGVkUmVsaWVmXCIsIFwiU2hhZGVkUmVsaWVmTGFiZWxzXCIsIFwiVGVycmFpblwiLCBcIlRlcnJhaW5MYWJlbHNcIiBvciBcIlVTQVRvcG9cIicpO1xuICAgIH1cblxuICAgIC8vIG1lcmdlIHBhc3NlZCBvcHRpb25zIGludG8gdGhlIGNvbmZpZyBvcHRpb25zXG4gICAgdmFyIHRpbGVPcHRpb25zID0gVXRpbC5leHRlbmQoY29uZmlnLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgVXRpbC5zZXRPcHRpb25zKHRoaXMsIHRpbGVPcHRpb25zKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIGNvbmZpZy51cmxUZW1wbGF0ZSArPSAoJz90b2tlbj0nICsgdGhpcy5vcHRpb25zLnRva2VuKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsIHRoZSBpbml0aWFsaXplIG1ldGhvZCBvbiBMLlRpbGVMYXllciB0byBzZXQgZXZlcnl0aGluZyB1cFxuICAgIFRpbGVMYXllci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIGNvbmZpZy51cmxUZW1wbGF0ZSwgdGlsZU9wdGlvbnMpO1xuICB9LFxuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgLy8gaW5jbHVkZSAnUG93ZXJlZCBieSBFc3JpJyBpbiBtYXAgYXR0cmlidXRpb25cbiAgICBzZXRFc3JpQXR0cmlidXRpb24obWFwKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucGFuZSA9PT0gJ2VzcmktbGFiZWxzJykge1xuICAgICAgdGhpcy5faW5pdFBhbmUoKTtcbiAgICB9XG4gICAgLy8gc29tZSBiYXNlbWFwcyBjYW4gc3VwcGx5IGR5bmFtaWMgYXR0cmlidXRpb25cbiAgICBpZiAodGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uVXJsKSB7XG4gICAgICBfZ2V0QXR0cmlidXRpb25EYXRhKHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvblVybCwgbWFwKTtcbiAgICB9XG5cbiAgICBtYXAub24oJ21vdmVlbmQnLCBfdXBkYXRlTWFwQXR0cmlidXRpb24pO1xuXG4gICAgVGlsZUxheWVyLnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBtYXAub2ZmKCdtb3ZlZW5kJywgX3VwZGF0ZU1hcEF0dHJpYnV0aW9uKTtcbiAgICBUaWxlTGF5ZXIucHJvdG90eXBlLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcbiAgfSxcblxuICBfaW5pdFBhbmU6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX21hcC5nZXRQYW5lKHRoaXMub3B0aW9ucy5wYW5lKSkge1xuICAgICAgdmFyIHBhbmUgPSB0aGlzLl9tYXAuY3JlYXRlUGFuZSh0aGlzLm9wdGlvbnMucGFuZSk7XG4gICAgICBwYW5lLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICBwYW5lLnN0eWxlLnpJbmRleCA9IDUwMDtcbiAgICB9XG4gIH0sXG5cbiAgZ2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uKSB7XG4gICAgICB2YXIgYXR0cmlidXRpb24gPSAnPHNwYW4gY2xhc3M9XCJlc3JpLWR5bmFtaWMtYXR0cmlidXRpb25cIj4nICsgdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uICsgJzwvc3Bhbj4nO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cmlidXRpb247XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gYmFzZW1hcExheWVyIChrZXksIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBCYXNlbWFwTGF5ZXIoa2V5LCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZW1hcExheWVyO1xuIiwiaW1wb3J0IHsgQ1JTLCBEb21FdmVudCwgVGlsZUxheWVyLCBVdGlsIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyB3YXJuLCBnZXRVcmxQYXJhbXMsIHNldEVzcmlBdHRyaWJ1dGlvbiB9IGZyb20gJy4uL1V0aWwnO1xuaW1wb3J0IG1hcFNlcnZpY2UgZnJvbSAnLi4vU2VydmljZXMvTWFwU2VydmljZSc7XG5cbmV4cG9ydCB2YXIgVGlsZWRNYXBMYXllciA9IFRpbGVMYXllci5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgem9vbU9mZnNldEFsbG93YW5jZTogMC4xLFxuICAgIGVycm9yVGlsZVVybDogJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBUUFBQUFFQUJBTUFBQUN1WExWVkFBQUFBMUJNVkVVek5EVnN6bEhIQUFBQUFYUlNUbE1BUU9iWVpnQUFBQWx3U0ZsekFBQUFBQUFBQUFBQjZtVVdwQUFBQURaSlJFRlVlSnp0d1FFQkFBQUFnaUQvcjI1SVFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBN3dhQkFBQUJ3MDhSd0FBQUFBQkpSVTVFcmtKZ2dnPT0nXG4gIH0sXG5cbiAgc3RhdGljczoge1xuICAgIE1lcmNhdG9yWm9vbUxldmVsczoge1xuICAgICAgJzAnOiAxNTY1NDMuMDMzOTI3OTk5OTksXG4gICAgICAnMSc6IDc4MjcxLjUxNjk2Mzk5OTg5MyxcbiAgICAgICcyJzogMzkxMzUuNzU4NDgyMDAwMDk5LFxuICAgICAgJzMnOiAxOTU2Ny44NzkyNDA5OTk5MDEsXG4gICAgICAnNCc6IDk3ODMuOTM5NjIwNDk5OTU5MyxcbiAgICAgICc1JzogNDg5MS45Njk4MTAyNDk5Nzk3LFxuICAgICAgJzYnOiAyNDQ1Ljk4NDkwNTEyNDk4OTgsXG4gICAgICAnNyc6IDEyMjIuOTkyNDUyNTYyNDg5OSxcbiAgICAgICc4JzogNjExLjQ5NjIyNjI4MTM4MDAyLFxuICAgICAgJzknOiAzMDUuNzQ4MTEzMTQwNTU4MDIsXG4gICAgICAnMTAnOiAxNTIuODc0MDU2NTcwNDExLFxuICAgICAgJzExJzogNzYuNDM3MDI4Mjg1MDczMTk3LFxuICAgICAgJzEyJzogMzguMjE4NTE0MTQyNTM2NTk4LFxuICAgICAgJzEzJzogMTkuMTA5MjU3MDcxMjY4Mjk5LFxuICAgICAgJzE0JzogOS41NTQ2Mjg1MzU2MzQxNDk2LFxuICAgICAgJzE1JzogNC43NzczMTQyNjc5NDkzNjk5LFxuICAgICAgJzE2JzogMi4zODg2NTcxMzM5NzQ2OCxcbiAgICAgICcxNyc6IDEuMTk0MzI4NTY2ODU1MDUwMSxcbiAgICAgICcxOCc6IDAuNTk3MTY0MjgzNTU5ODE2OTksXG4gICAgICAnMTknOiAwLjI5ODU4MjE0MTY0NzYxNjk4LFxuICAgICAgJzIwJzogMC4xNDkyOTEwNzA4MjM4MSxcbiAgICAgICcyMSc6IDAuMDc0NjQ1NTM1NDExOTEsXG4gICAgICAnMjInOiAwLjAzNzMyMjc2NzcwNTk1MjUsXG4gICAgICAnMjMnOiAwLjAxODY2MTM4Mzg1Mjk3NjNcbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgLy8gc2V0IHRoZSB1cmxzXG4gICAgb3B0aW9ucyA9IGdldFVybFBhcmFtcyhvcHRpb25zKTtcbiAgICB0aGlzLnRpbGVVcmwgPSBvcHRpb25zLnVybCArICd0aWxlL3t6fS97eX0ve3h9JyArIChvcHRpb25zLnJlcXVlc3RQYXJhbXMgJiYgT2JqZWN0LmtleXMob3B0aW9ucy5yZXF1ZXN0UGFyYW1zKS5sZW5ndGggPiAwID8gVXRpbC5nZXRQYXJhbVN0cmluZyhvcHRpb25zLnJlcXVlc3RQYXJhbXMpIDogJycpO1xuICAgIC8vIFJlbW92ZSBzdWJkb21haW4gaW4gdXJsXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvZXNyaS1sZWFmbGV0L2lzc3Vlcy85OTFcbiAgICBpZiAob3B0aW9ucy51cmwuaW5kZXhPZigne3N9JykgIT09IC0xICYmIG9wdGlvbnMuc3ViZG9tYWlucykge1xuICAgICAgb3B0aW9ucy51cmwgPSBvcHRpb25zLnVybC5yZXBsYWNlKCd7c30nLCBvcHRpb25zLnN1YmRvbWFpbnNbMF0pO1xuICAgIH1cbiAgICB0aGlzLnNlcnZpY2UgPSBtYXBTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2VydmljZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgIHZhciBhcmNnaXNvbmxpbmUgPSBuZXcgUmVnRXhwKC90aWxlcy5hcmNnaXMob25saW5lKT9cXC5jb20vZyk7XG4gICAgaWYgKGFyY2dpc29ubGluZS50ZXN0KG9wdGlvbnMudXJsKSkge1xuICAgICAgdGhpcy50aWxlVXJsID0gdGhpcy50aWxlVXJsLnJlcGxhY2UoJzovL3RpbGVzJywgJzovL3RpbGVze3N9Jyk7XG4gICAgICBvcHRpb25zLnN1YmRvbWFpbnMgPSBbJzEnLCAnMicsICczJywgJzQnXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRva2VuKSB7XG4gICAgICB0aGlzLnRpbGVVcmwgKz0gKCc/dG9rZW49JyArIHRoaXMub3B0aW9ucy50b2tlbik7XG4gICAgfVxuXG4gICAgLy8gaW5pdCBsYXllciBieSBjYWxsaW5nIFRpbGVMYXllcnMgaW5pdGlhbGl6ZSBtZXRob2RcbiAgICBUaWxlTGF5ZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCB0aGlzLnRpbGVVcmwsIG9wdGlvbnMpO1xuICB9LFxuXG4gIGdldFRpbGVVcmw6IGZ1bmN0aW9uICh0aWxlUG9pbnQpIHtcbiAgICB2YXIgem9vbSA9IHRoaXMuX2dldFpvb21Gb3JVcmwoKTtcblxuICAgIHJldHVybiBVdGlsLnRlbXBsYXRlKHRoaXMudGlsZVVybCwgVXRpbC5leHRlbmQoe1xuICAgICAgczogdGhpcy5fZ2V0U3ViZG9tYWluKHRpbGVQb2ludCksXG4gICAgICB4OiB0aWxlUG9pbnQueCxcbiAgICAgIHk6IHRpbGVQb2ludC55LFxuICAgICAgLy8gdHJ5IGxvZCBtYXAgZmlyc3QsIHRoZW4ganVzdCBkZWZhdWx0IHRvIHpvb20gbGV2ZWxcbiAgICAgIHo6ICh0aGlzLl9sb2RNYXAgJiYgdGhpcy5fbG9kTWFwW3pvb21dKSA/IHRoaXMuX2xvZE1hcFt6b29tXSA6IHpvb21cbiAgICB9LCB0aGlzLm9wdGlvbnMpKTtcbiAgfSxcblxuICBjcmVhdGVUaWxlOiBmdW5jdGlvbiAoY29vcmRzLCBkb25lKSB7XG4gICAgdmFyIHRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgIERvbUV2ZW50Lm9uKHRpbGUsICdsb2FkJywgVXRpbC5iaW5kKHRoaXMuX3RpbGVPbkxvYWQsIHRoaXMsIGRvbmUsIHRpbGUpKTtcbiAgICBEb21FdmVudC5vbih0aWxlLCAnZXJyb3InLCBVdGlsLmJpbmQodGhpcy5fdGlsZU9uRXJyb3IsIHRoaXMsIGRvbmUsIHRpbGUpKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY3Jvc3NPcmlnaW4pIHtcbiAgICAgIHRpbGUuY3Jvc3NPcmlnaW4gPSAnJztcbiAgICB9XG5cbiAgICAvKlxuICAgICBBbHQgdGFnIGlzIHNldCB0byBlbXB0eSBzdHJpbmcgdG8ga2VlcCBzY3JlZW4gcmVhZGVycyBmcm9tIHJlYWRpbmcgVVJMIGFuZCBmb3IgY29tcGxpYW5jZSByZWFzb25zXG4gICAgIGh0dHA6Ly93d3cudzMub3JnL1RSL1dDQUcyMC1URUNIUy9INjdcbiAgICAqL1xuICAgIHRpbGUuYWx0ID0gJyc7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBubyBsb2QgbWFwIG9yIGFuIGxvZCBtYXAgd2l0aCBhIHByb3BlciB6b29tIGxvYWQgdGhlIHRpbGVcbiAgICAvLyBvdGhlcndpc2Ugd2FpdCBmb3IgdGhlIGxvZCBtYXAgdG8gYmVjb21lIGF2YWlsYWJsZVxuICAgIGlmICghdGhpcy5fbG9kTWFwIHx8ICh0aGlzLl9sb2RNYXAgJiYgdGhpcy5fbG9kTWFwW3RoaXMuX2dldFpvb21Gb3JVcmwoKV0pKSB7XG4gICAgICB0aWxlLnNyYyA9IHRoaXMuZ2V0VGlsZVVybChjb29yZHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uY2UoJ2xvZG1hcCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGlsZS5zcmMgPSB0aGlzLmdldFRpbGVVcmwoY29vcmRzKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aWxlO1xuICB9LFxuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgLy8gaW5jbHVkZSAnUG93ZXJlZCBieSBFc3JpJyBpbiBtYXAgYXR0cmlidXRpb25cbiAgICBzZXRFc3JpQXR0cmlidXRpb24obWFwKTtcblxuICAgIGlmICghdGhpcy5fbG9kTWFwKSB7XG4gICAgICB0aGlzLm1ldGFkYXRhKGZ1bmN0aW9uIChlcnJvciwgbWV0YWRhdGEpIHtcbiAgICAgICAgaWYgKCFlcnJvciAmJiBtZXRhZGF0YS5zcGF0aWFsUmVmZXJlbmNlKSB7XG4gICAgICAgICAgdmFyIHNyID0gbWV0YWRhdGEuc3BhdGlhbFJlZmVyZW5jZS5sYXRlc3RXa2lkIHx8IG1ldGFkYXRhLnNwYXRpYWxSZWZlcmVuY2Uud2tpZDtcbiAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbiAmJiBtYXAuYXR0cmlidXRpb25Db250cm9sICYmIG1ldGFkYXRhLmNvcHlyaWdodFRleHQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbiA9IG1ldGFkYXRhLmNvcHlyaWdodFRleHQ7XG4gICAgICAgICAgICBtYXAuYXR0cmlidXRpb25Db250cm9sLmFkZEF0dHJpYnV0aW9uKHRoaXMuZ2V0QXR0cmlidXRpb24oKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG5lZWRQcm9qNCA9IHRoaXMuX2NoZWNrU1JTdXBwb3J0KG1hcCwgc3IpO1xuXG4gICAgICAgICAgaWYgKG5lZWRQcm9qNCkge1xuICAgICAgICAgICAgdGhpcy5fbG9kTWFwID0ge307XG4gICAgICAgICAgICAvLyBjcmVhdGUgdGhlIHpvb20gbGV2ZWwgZGF0YVxuICAgICAgICAgICAgdmFyIGFyY2dpc0xPRHMgPSBtZXRhZGF0YS50aWxlSW5mby5sb2RzO1xuICAgICAgICAgICAgdmFyIGNvcnJlY3RSZXNvbHV0aW9ucyA9IFRpbGVkTWFwTGF5ZXIuTWVyY2F0b3Jab29tTGV2ZWxzO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyY2dpc0xPRHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGFyY2dpc0xPRCA9IGFyY2dpc0xPRHNbaV07XG4gICAgICAgICAgICAgIGZvciAodmFyIGNpIGluIGNvcnJlY3RSZXNvbHV0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciBjb3JyZWN0UmVzID0gY29ycmVjdFJlc29sdXRpb25zW2NpXTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl93aXRoaW5QZXJjZW50YWdlKGFyY2dpc0xPRC5yZXNvbHV0aW9uLCBjb3JyZWN0UmVzLCB0aGlzLm9wdGlvbnMuem9vbU9mZnNldEFsbG93YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZE1hcFtjaV0gPSBhcmNnaXNMT0QubGV2ZWw7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5maXJlKCdsb2RtYXAnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2FybignTC5lc3JpLlRpbGVkTWFwTGF5ZXIgaXMgdXNpbmcgYSBub24tbWVyY2F0b3Igc3BhdGlhbCByZWZlcmVuY2UuIFN1cHBvcnQgbWF5IGJlIGF2YWlsYWJsZSB0aHJvdWdoIFByb2o0TGVhZmxldCBodHRwOi8vZXNyaS5naXRodWIuaW8vZXNyaS1sZWFmbGV0L2V4YW1wbGVzL25vbi1tZXJjYXRvci1wcm9qZWN0aW9uLmh0bWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIFRpbGVMYXllci5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIF9jaGVja1NSU3VwcG9ydDogZnVuY3Rpb24gKG1hcCwgc3BhdGlhbFJlZmVyZW5jZSkge1xuICAgIGlmIChtYXAub3B0aW9ucy5jcnMgPT09IENSUy5FUFNHMzg1NyAmJiAoc3BhdGlhbFJlZmVyZW5jZSA9PT0gMTAyMTAwIHx8IHNwYXRpYWxSZWZlcmVuY2UgPT09IDM4NTcpKSB7XG4gICAgICAvLyB3ZWIgbWVyY2F0b3IgdGlsZSBzZXJ2aWNlcyBhcmUgc3VwcG9ydGVkIGJ5IGxlYWZsZXRcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAobWFwLm9wdGlvbnMuY3JzID09PSBDUlMuRVBTRzQzMjYgJiYgKHNwYXRpYWxSZWZlcmVuY2UgPT09IDQzMjYpKSB7XG4gICAgICAvLyB3Z3M4NCB0aWxlIHNlcnZpY2VzIGFyZSBzdXBwb3J0ZWQgYnkgbGVhZmxldFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChtYXAub3B0aW9ucy5jcnMgJiYgbWFwLm9wdGlvbnMuY3JzLmNvZGUgJiYgKG1hcC5vcHRpb25zLmNycy5jb2RlLmluZGV4T2Yoc3BhdGlhbFJlZmVyZW5jZSkgPiAtMSkpIHtcbiAgICAgIC8vIHVzaW5nIHByb2o0IGFuZCBkZWZpbmluZyBhIGN1c3RvbSBjcnMgZW5hYmxlcyBzdXBwb3J0IGZvciB0aWxlIHNlcnZpY2VzIHB1Ymxpc2hlZCBpbiBvdGhlciBwcm9qZWN0aW9uc1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG90aGVyd2lzZSBhc3N1bWUgdGhlIHRpbGUgc2VydmljZSBpc24ndCBnb2luZyB0byBsb2FkIHByb3Blcmx5XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LFxuXG4gIG1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UubWV0YWRhdGEoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5pZGVudGlmeSgpO1xuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmZpbmQoKTtcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UucXVlcnkoKTtcbiAgfSxcblxuICBhdXRoZW50aWNhdGU6IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHZhciB0b2tlblFzID0gJz90b2tlbj0nICsgdG9rZW47XG4gICAgdGhpcy50aWxlVXJsID0gKHRoaXMub3B0aW9ucy50b2tlbikgPyB0aGlzLnRpbGVVcmwucmVwbGFjZSgvXFw/dG9rZW49KC4rKS9nLCB0b2tlblFzKSA6IHRoaXMudGlsZVVybCArIHRva2VuUXM7XG4gICAgdGhpcy5vcHRpb25zLnRva2VuID0gdG9rZW47XG4gICAgdGhpcy5zZXJ2aWNlLmF1dGhlbnRpY2F0ZSh0b2tlbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3dpdGhpblBlcmNlbnRhZ2U6IGZ1bmN0aW9uIChhLCBiLCBwZXJjZW50YWdlKSB7XG4gICAgdmFyIGRpZmYgPSBNYXRoLmFicygoYSAvIGIpIC0gMSk7XG4gICAgcmV0dXJuIGRpZmYgPCBwZXJjZW50YWdlO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRpbGVkTWFwTGF5ZXIgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFRpbGVkTWFwTGF5ZXIodXJsLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGlsZWRNYXBMYXllcjtcbiIsImltcG9ydCB7IEltYWdlT3ZlcmxheSwgQ1JTLCBEb21VdGlsLCBVdGlsLCBMYXllciwgcG9wdXAsIGxhdExuZywgYm91bmRzIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBjb3JzIH0gZnJvbSAnLi4vU3VwcG9ydCc7XG5pbXBvcnQgeyBzZXRFc3JpQXR0cmlidXRpb24gfSBmcm9tICcuLi9VdGlsJztcblxudmFyIE92ZXJsYXkgPSBJbWFnZU92ZXJsYXkuZXh0ZW5kKHtcbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICB0aGlzLl90b3BMZWZ0ID0gbWFwLmdldFBpeGVsQm91bmRzKCkubWluO1xuICAgIEltYWdlT3ZlcmxheS5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuICBfcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fbWFwLm9wdGlvbnMuY3JzID09PSBDUlMuRVBTRzM4NTcpIHtcbiAgICAgIEltYWdlT3ZlcmxheS5wcm90b3R5cGUuX3Jlc2V0LmNhbGwodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIERvbVV0aWwuc2V0UG9zaXRpb24odGhpcy5faW1hZ2UsIHRoaXMuX3RvcExlZnQuc3VidHJhY3QodGhpcy5fbWFwLmdldFBpeGVsT3JpZ2luKCkpKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgdmFyIFJhc3RlckxheWVyID0gTGF5ZXIuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIG9wYWNpdHk6IDEsXG4gICAgcG9zaXRpb246ICdmcm9udCcsXG4gICAgZjogJ2ltYWdlJyxcbiAgICB1c2VDb3JzOiBjb3JzLFxuICAgIGF0dHJpYnV0aW9uOiBudWxsLFxuICAgIGludGVyYWN0aXZlOiBmYWxzZSxcbiAgICBhbHQ6ICcnXG4gIH0sXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICAvLyBpbmNsdWRlICdQb3dlcmVkIGJ5IEVzcmknIGluIG1hcCBhdHRyaWJ1dGlvblxuICAgIHNldEVzcmlBdHRyaWJ1dGlvbihtYXApO1xuXG4gICAgdGhpcy5fdXBkYXRlID0gVXRpbC50aHJvdHRsZSh0aGlzLl91cGRhdGUsIHRoaXMub3B0aW9ucy51cGRhdGVJbnRlcnZhbCwgdGhpcyk7XG5cbiAgICBtYXAub24oJ21vdmVlbmQnLCB0aGlzLl91cGRhdGUsIHRoaXMpO1xuXG4gICAgLy8gaWYgd2UgaGFkIGFuIGltYWdlIGxvYWRlZCBhbmQgaXQgbWF0Y2hlcyB0aGVcbiAgICAvLyBjdXJyZW50IGJvdW5kcyBzaG93IHRoZSBpbWFnZSBvdGhlcndpc2UgcmVtb3ZlIGl0XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSAmJiB0aGlzLl9jdXJyZW50SW1hZ2UuX2JvdW5kcy5lcXVhbHModGhpcy5fbWFwLmdldEJvdW5kcygpKSkge1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMuX2N1cnJlbnRJbWFnZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UpIHtcbiAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcih0aGlzLl9jdXJyZW50SW1hZ2UpO1xuICAgICAgdGhpcy5fY3VycmVudEltYWdlID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGUoKTtcblxuICAgIGlmICh0aGlzLl9wb3B1cCkge1xuICAgICAgdGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuX2dldFBvcHVwRGF0YSwgdGhpcyk7XG4gICAgICB0aGlzLl9tYXAub24oJ2RibGNsaWNrJywgdGhpcy5fcmVzZXRQb3B1cFN0YXRlLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgY29weXJpZ2h0IHRleHQgbGlzdGVkIGluIHNlcnZpY2UgbWV0YWRhdGFcbiAgICB0aGlzLm1ldGFkYXRhKGZ1bmN0aW9uIChlcnIsIG1ldGFkYXRhKSB7XG4gICAgICBpZiAoIWVyciAmJiAhdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uICYmIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wgJiYgbWV0YWRhdGEuY29weXJpZ2h0VGV4dCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gPSBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0O1xuICAgICAgICBtYXAuYXR0cmlidXRpb25Db250cm9sLmFkZEF0dHJpYnV0aW9uKHRoaXMuZ2V0QXR0cmlidXRpb24oKSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBpZiAodGhpcy5fY3VycmVudEltYWdlKSB7XG4gICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5fY3VycmVudEltYWdlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcG9wdXApIHtcbiAgICAgIHRoaXMuX21hcC5vZmYoJ2NsaWNrJywgdGhpcy5fZ2V0UG9wdXBEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX21hcC5vZmYoJ2RibGNsaWNrJywgdGhpcy5fcmVzZXRQb3B1cFN0YXRlLCB0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXAub2ZmKCdtb3ZlZW5kJywgdGhpcy5fdXBkYXRlLCB0aGlzKTtcbiAgfSxcblxuICBiaW5kUG9wdXA6IGZ1bmN0aW9uIChmbiwgcG9wdXBPcHRpb25zKSB7XG4gICAgdGhpcy5fc2hvdWxkUmVuZGVyUG9wdXAgPSBmYWxzZTtcbiAgICB0aGlzLl9sYXN0Q2xpY2sgPSBmYWxzZTtcbiAgICB0aGlzLl9wb3B1cCA9IHBvcHVwKHBvcHVwT3B0aW9ucyk7XG4gICAgdGhpcy5fcG9wdXBGdW5jdGlvbiA9IGZuO1xuICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgIHRoaXMuX21hcC5vbignY2xpY2snLCB0aGlzLl9nZXRQb3B1cERhdGEsIHRoaXMpO1xuICAgICAgdGhpcy5fbWFwLm9uKCdkYmxjbGljaycsIHRoaXMuX3Jlc2V0UG9wdXBTdGF0ZSwgdGhpcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHVuYmluZFBvcHVwOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX21hcCkge1xuICAgICAgdGhpcy5fbWFwLmNsb3NlUG9wdXAodGhpcy5fcG9wdXApO1xuICAgICAgdGhpcy5fbWFwLm9mZignY2xpY2snLCB0aGlzLl9nZXRQb3B1cERhdGEsIHRoaXMpO1xuICAgICAgdGhpcy5fbWFwLm9mZignZGJsY2xpY2snLCB0aGlzLl9yZXNldFBvcHVwU3RhdGUsIHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLl9wb3B1cCA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGJyaW5nVG9Gcm9udDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3B0aW9ucy5wb3NpdGlvbiA9ICdmcm9udCc7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSkge1xuICAgICAgdGhpcy5fY3VycmVudEltYWdlLmJyaW5nVG9Gcm9udCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBicmluZ1RvQmFjazogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3B0aW9ucy5wb3NpdGlvbiA9ICdiYWNrJztcbiAgICBpZiAodGhpcy5fY3VycmVudEltYWdlKSB7XG4gICAgICB0aGlzLl9jdXJyZW50SW1hZ2UuYnJpbmdUb0JhY2soKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uO1xuICB9LFxuXG4gIGdldE9wYWNpdHk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm9wYWNpdHk7XG4gIH0sXG5cbiAgc2V0T3BhY2l0eTogZnVuY3Rpb24gKG9wYWNpdHkpIHtcbiAgICB0aGlzLm9wdGlvbnMub3BhY2l0eSA9IG9wYWNpdHk7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSkge1xuICAgICAgdGhpcy5fY3VycmVudEltYWdlLnNldE9wYWNpdHkob3BhY2l0eSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFRpbWVSYW5nZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBbdGhpcy5vcHRpb25zLmZyb20sIHRoaXMub3B0aW9ucy50b107XG4gIH0sXG5cbiAgc2V0VGltZVJhbmdlOiBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgICB0aGlzLm9wdGlvbnMuZnJvbSA9IGZyb207XG4gICAgdGhpcy5vcHRpb25zLnRvID0gdG87XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgbWV0YWRhdGE6IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuc2VydmljZS5tZXRhZGF0YShjYWxsYmFjaywgY29udGV4dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYXV0aGVudGljYXRlOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0aGlzLnNlcnZpY2UuYXV0aGVudGljYXRlKHRva2VuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZWRyYXc6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgfSxcblxuICBfcmVuZGVySW1hZ2U6IGZ1bmN0aW9uICh1cmwsIGJvdW5kcywgY29udGVudFR5cGUpIHtcbiAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICAvLyBpZiBubyBvdXRwdXQgZGlyZWN0b3J5IGhhcyBiZWVuIHNwZWNpZmllZCBmb3IgYSBzZXJ2aWNlLCBNSU1FIGRhdGEgd2lsbCBiZSByZXR1cm5lZFxuICAgICAgaWYgKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgIHVybCA9ICdkYXRhOicgKyBjb250ZW50VHlwZSArICc7YmFzZTY0LCcgKyB1cmw7XG4gICAgICB9XG4gICAgICAvLyBjcmVhdGUgYSBuZXcgaW1hZ2Ugb3ZlcmxheSBhbmQgYWRkIGl0IHRvIHRoZSBtYXBcbiAgICAgIC8vIHRvIHN0YXJ0IGxvYWRpbmcgdGhlIGltYWdlXG4gICAgICAvLyBvcGFjaXR5IGlzIDAgd2hpbGUgdGhlIGltYWdlIGlzIGxvYWRpbmdcbiAgICAgIHZhciBpbWFnZSA9IG5ldyBPdmVybGF5KHVybCwgYm91bmRzLCB7XG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLm9wdGlvbnMudXNlQ29ycyxcbiAgICAgICAgYWx0OiB0aGlzLm9wdGlvbnMuYWx0LFxuICAgICAgICBwYW5lOiB0aGlzLm9wdGlvbnMucGFuZSB8fCB0aGlzLmdldFBhbmUoKSxcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRoaXMub3B0aW9ucy5pbnRlcmFjdGl2ZVxuICAgICAgfSkuYWRkVG8odGhpcy5fbWFwKTtcblxuICAgICAgdmFyIG9uT3ZlcmxheUVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIoaW1hZ2UpO1xuICAgICAgICB0aGlzLmZpcmUoJ2Vycm9yJyk7XG4gICAgICAgIGltYWdlLm9mZignbG9hZCcsIG9uT3ZlcmxheUxvYWQsIHRoaXMpO1xuICAgICAgfTtcblxuICAgICAgdmFyIG9uT3ZlcmxheUxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpbWFnZS5vZmYoJ2Vycm9yJywgb25PdmVybGF5TG9hZCwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgICAgICB2YXIgbmV3SW1hZ2UgPSBlLnRhcmdldDtcbiAgICAgICAgICB2YXIgb2xkSW1hZ2UgPSB0aGlzLl9jdXJyZW50SW1hZ2U7XG5cbiAgICAgICAgICAvLyBpZiB0aGUgYm91bmRzIG9mIHRoaXMgaW1hZ2UgbWF0Y2hlcyB0aGUgYm91bmRzIHRoYXRcbiAgICAgICAgICAvLyBfcmVuZGVySW1hZ2Ugd2FzIGNhbGxlZCB3aXRoIGFuZCB3ZSBoYXZlIGEgbWFwIHdpdGggdGhlIHNhbWUgYm91bmRzXG4gICAgICAgICAgLy8gaGlkZSB0aGUgb2xkIGltYWdlIGlmIHRoZXJlIGlzIG9uZSBhbmQgc2V0IHRoZSBvcGFjaXR5XG4gICAgICAgICAgLy8gb2YgdGhlIG5ldyBpbWFnZSBvdGhlcndpc2UgcmVtb3ZlIHRoZSBuZXcgaW1hZ2VcbiAgICAgICAgICBpZiAobmV3SW1hZ2UuX2JvdW5kcy5lcXVhbHMoYm91bmRzKSAmJiBuZXdJbWFnZS5fYm91bmRzLmVxdWFscyh0aGlzLl9tYXAuZ2V0Qm91bmRzKCkpKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW1hZ2UgPSBuZXdJbWFnZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wb3NpdGlvbiA9PT0gJ2Zyb250Jykge1xuICAgICAgICAgICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5icmluZ1RvQmFjaygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX2N1cnJlbnRJbWFnZS5fbWFwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5zZXRPcGFjaXR5KHRoaXMub3B0aW9ucy5vcGFjaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5fbWFwLnJlbW92ZUxheWVyKHRoaXMuX2N1cnJlbnRJbWFnZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvbGRJbWFnZSAmJiB0aGlzLl9tYXApIHtcbiAgICAgICAgICAgICAgdGhpcy5fbWFwLnJlbW92ZUxheWVyKG9sZEltYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9sZEltYWdlICYmIG9sZEltYWdlLl9tYXApIHtcbiAgICAgICAgICAgICAgb2xkSW1hZ2UuX21hcC5yZW1vdmVMYXllcihvbGRJbWFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcihuZXdJbWFnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJlKCdsb2FkJywge1xuICAgICAgICAgIGJvdW5kczogYm91bmRzXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLy8gSWYgbG9hZGluZyB0aGUgaW1hZ2UgZmFpbHNcbiAgICAgIGltYWdlLm9uY2UoJ2Vycm9yJywgb25PdmVybGF5RXJyb3IsIHRoaXMpO1xuXG4gICAgICAvLyBvbmNlIHRoZSBpbWFnZSBsb2Fkc1xuICAgICAgaW1hZ2Uub25jZSgnbG9hZCcsIG9uT3ZlcmxheUxvYWQsIHRoaXMpO1xuXG4gICAgICB0aGlzLmZpcmUoJ2xvYWRpbmcnLCB7XG4gICAgICAgIGJvdW5kczogYm91bmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX3VwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuICAgIHZhciBib3VuZHMgPSB0aGlzLl9tYXAuZ2V0Qm91bmRzKCk7XG5cbiAgICBpZiAodGhpcy5fYW5pbWF0aW5nWm9vbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9tYXAuX3BhblRyYW5zaXRpb24gJiYgdGhpcy5fbWFwLl9wYW5UcmFuc2l0aW9uLl9pblByb2dyZXNzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHpvb20gPiB0aGlzLm9wdGlvbnMubWF4Wm9vbSB8fCB6b29tIDwgdGhpcy5vcHRpb25zLm1pblpvb20pIHtcbiAgICAgIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudEltYWdlLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5fY3VycmVudEltYWdlKTtcbiAgICAgICAgdGhpcy5fY3VycmVudEltYWdlID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcGFyYW1zID0gdGhpcy5fYnVpbGRFeHBvcnRQYXJhbXMoKTtcbiAgICBVdGlsLmV4dGVuZChwYXJhbXMsIHRoaXMub3B0aW9ucy5yZXF1ZXN0UGFyYW1zKTtcblxuICAgIGlmIChwYXJhbXMpIHtcbiAgICAgIHRoaXMuX3JlcXVlc3RFeHBvcnQocGFyYW1zLCBib3VuZHMpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudEltYWdlKSB7XG4gICAgICB0aGlzLl9jdXJyZW50SW1hZ2UuX21hcC5yZW1vdmVMYXllcih0aGlzLl9jdXJyZW50SW1hZ2UpO1xuICAgICAgdGhpcy5fY3VycmVudEltYWdlID0gbnVsbDtcbiAgICB9XG4gIH0sXG5cbiAgX3JlbmRlclBvcHVwOiBmdW5jdGlvbiAobGF0bG5nLCBlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpIHtcbiAgICBsYXRsbmcgPSBsYXRMbmcobGF0bG5nKTtcbiAgICBpZiAodGhpcy5fc2hvdWxkUmVuZGVyUG9wdXAgJiYgdGhpcy5fbGFzdENsaWNrLmVxdWFscyhsYXRsbmcpKSB7XG4gICAgICAvLyBhZGQgdGhlIHBvcHVwIHRvIHRoZSBtYXAgd2hlcmUgdGhlIG1vdXNlIHdhcyBjbGlja2VkIGF0XG4gICAgICB2YXIgY29udGVudCA9IHRoaXMuX3BvcHVwRnVuY3Rpb24oZXJyb3IsIHJlc3VsdHMsIHJlc3BvbnNlKTtcbiAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgIHRoaXMuX3BvcHVwLnNldExhdExuZyhsYXRsbmcpLnNldENvbnRlbnQoY29udGVudCkub3Blbk9uKHRoaXMuX21hcCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9yZXNldFBvcHVwU3RhdGU6IGZ1bmN0aW9uIChlKSB7XG4gICAgdGhpcy5fc2hvdWxkUmVuZGVyUG9wdXAgPSBmYWxzZTtcbiAgICB0aGlzLl9sYXN0Q2xpY2sgPSBlLmxhdGxuZztcbiAgfSxcblxuICBfY2FsY3VsYXRlQmJveDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBwaXhlbEJvdW5kcyA9IHRoaXMuX21hcC5nZXRQaXhlbEJvdW5kcygpO1xuXG4gICAgdmFyIHN3ID0gdGhpcy5fbWFwLnVucHJvamVjdChwaXhlbEJvdW5kcy5nZXRCb3R0b21MZWZ0KCkpO1xuICAgIHZhciBuZSA9IHRoaXMuX21hcC51bnByb2plY3QocGl4ZWxCb3VuZHMuZ2V0VG9wUmlnaHQoKSk7XG5cbiAgICB2YXIgbmVQcm9qZWN0ZWQgPSB0aGlzLl9tYXAub3B0aW9ucy5jcnMucHJvamVjdChuZSk7XG4gICAgdmFyIHN3UHJvamVjdGVkID0gdGhpcy5fbWFwLm9wdGlvbnMuY3JzLnByb2plY3Qoc3cpO1xuXG4gICAgLy8gdGhpcyBlbnN1cmVzIG5lL3N3IGFyZSBzd2l0Y2hlZCBpbiBwb2xhciBtYXBzIHdoZXJlIG5vcnRoL3RvcCBib3R0b20vc291dGggaXMgaW52ZXJ0ZWRcbiAgICB2YXIgYm91bmRzUHJvamVjdGVkID0gYm91bmRzKG5lUHJvamVjdGVkLCBzd1Byb2plY3RlZCk7XG5cbiAgICByZXR1cm4gW2JvdW5kc1Byb2plY3RlZC5nZXRCb3R0b21MZWZ0KCkueCwgYm91bmRzUHJvamVjdGVkLmdldEJvdHRvbUxlZnQoKS55LCBib3VuZHNQcm9qZWN0ZWQuZ2V0VG9wUmlnaHQoKS54LCBib3VuZHNQcm9qZWN0ZWQuZ2V0VG9wUmlnaHQoKS55XS5qb2luKCcsJyk7XG4gIH0sXG5cbiAgX2NhbGN1bGF0ZUltYWdlU2l6ZTogZnVuY3Rpb24gKCkge1xuICAgIC8vIGVuc3VyZSB0aGF0IHdlIGRvbid0IGFzayBBcmNHSVMgU2VydmVyIGZvciBhIHRhbGxlciBpbWFnZSB0aGFuIHdlIGhhdmUgYWN0dWFsIG1hcCBkaXNwbGF5aW5nIHdpdGhpbiB0aGUgZGl2XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRQaXhlbEJvdW5kcygpO1xuICAgIHZhciBzaXplID0gdGhpcy5fbWFwLmdldFNpemUoKTtcblxuICAgIHZhciBzdyA9IHRoaXMuX21hcC51bnByb2plY3QoYm91bmRzLmdldEJvdHRvbUxlZnQoKSk7XG4gICAgdmFyIG5lID0gdGhpcy5fbWFwLnVucHJvamVjdChib3VuZHMuZ2V0VG9wUmlnaHQoKSk7XG5cbiAgICB2YXIgdG9wID0gdGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludChuZSkueTtcbiAgICB2YXIgYm90dG9tID0gdGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludChzdykueTtcblxuICAgIGlmICh0b3AgPiAwIHx8IGJvdHRvbSA8IHNpemUueSkge1xuICAgICAgc2l6ZS55ID0gYm90dG9tIC0gdG9wO1xuICAgIH1cblxuICAgIHJldHVybiBzaXplLnggKyAnLCcgKyBzaXplLnk7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgUmFzdGVyTGF5ZXIgfSBmcm9tICcuL1Jhc3RlckxheWVyJztcbmltcG9ydCB7IGdldFVybFBhcmFtcyB9IGZyb20gJy4uL1V0aWwnO1xuaW1wb3J0IGltYWdlU2VydmljZSBmcm9tICcuLi9TZXJ2aWNlcy9JbWFnZVNlcnZpY2UnO1xuXG5leHBvcnQgdmFyIEltYWdlTWFwTGF5ZXIgPSBSYXN0ZXJMYXllci5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICB1cGRhdGVJbnRlcnZhbDogMTUwLFxuICAgIGZvcm1hdDogJ2pwZ3BuZycsXG4gICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgZjogJ2ltYWdlJ1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5xdWVyeSgpO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5pZGVudGlmeSgpO1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IGdldFVybFBhcmFtcyhvcHRpb25zKTtcbiAgICB0aGlzLnNlcnZpY2UgPSBpbWFnZVNlcnZpY2Uob3B0aW9ucyk7XG4gICAgdGhpcy5zZXJ2aWNlLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuXG4gICAgVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIHNldFBpeGVsVHlwZTogZnVuY3Rpb24gKHBpeGVsVHlwZSkge1xuICAgIHRoaXMub3B0aW9ucy5waXhlbFR5cGUgPSBwaXhlbFR5cGU7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0UGl4ZWxUeXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5waXhlbFR5cGU7XG4gIH0sXG5cbiAgc2V0QmFuZElkczogZnVuY3Rpb24gKGJhbmRJZHMpIHtcbiAgICBpZiAoVXRpbC5pc0FycmF5KGJhbmRJZHMpKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuYmFuZElkcyA9IGJhbmRJZHMuam9pbignLCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wdGlvbnMuYmFuZElkcyA9IGJhbmRJZHMudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0QmFuZElkczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYmFuZElkcztcbiAgfSxcblxuICBzZXROb0RhdGE6IGZ1bmN0aW9uIChub0RhdGEsIG5vRGF0YUludGVycHJldGF0aW9uKSB7XG4gICAgaWYgKFV0aWwuaXNBcnJheShub0RhdGEpKSB7XG4gICAgICB0aGlzLm9wdGlvbnMubm9EYXRhID0gbm9EYXRhLmpvaW4oJywnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcHRpb25zLm5vRGF0YSA9IG5vRGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAobm9EYXRhSW50ZXJwcmV0YXRpb24pIHtcbiAgICAgIHRoaXMub3B0aW9ucy5ub0RhdGFJbnRlcnByZXRhdGlvbiA9IG5vRGF0YUludGVycHJldGF0aW9uO1xuICAgIH1cbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXROb0RhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5vRGF0YTtcbiAgfSxcblxuICBnZXROb0RhdGFJbnRlcnByZXRhdGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubm9EYXRhSW50ZXJwcmV0YXRpb247XG4gIH0sXG5cbiAgc2V0UmVuZGVyaW5nUnVsZTogZnVuY3Rpb24gKHJlbmRlcmluZ1J1bGUpIHtcbiAgICB0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZSA9IHJlbmRlcmluZ1J1bGU7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gIH0sXG5cbiAgZ2V0UmVuZGVyaW5nUnVsZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZTtcbiAgfSxcblxuICBzZXRNb3NhaWNSdWxlOiBmdW5jdGlvbiAobW9zYWljUnVsZSkge1xuICAgIHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlID0gbW9zYWljUnVsZTtcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgfSxcblxuICBnZXRNb3NhaWNSdWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlO1xuICB9LFxuXG4gIF9nZXRQb3B1cERhdGE6IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG4gICAgICBzZXRUaW1lb3V0KFV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlclBvcHVwKGUubGF0bG5nLCBlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyksIDMwMCk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB2YXIgaWRlbnRpZnlSZXF1ZXN0ID0gdGhpcy5pZGVudGlmeSgpLmF0KGUubGF0bG5nKTtcblxuICAgIC8vIHNldCBtb3NhaWMgcnVsZSBmb3IgaWRlbnRpZnkgdGFzayBpZiBpdCBpcyBzZXQgZm9yIGxheWVyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlKSB7XG4gICAgICBpZGVudGlmeVJlcXVlc3Quc2V0TW9zYWljUnVsZSh0aGlzLm9wdGlvbnMubW9zYWljUnVsZSk7XG4gICAgICAvLyBAVE9ETzogZm9yY2UgcmV0dXJuIGNhdGFsb2cgaXRlbXMgdG9vP1xuICAgIH1cblxuICAgIC8vIEBUT0RPOiBzZXQgcmVuZGVyaW5nIHJ1bGU/IE5vdCBzdXJlLFxuICAgIC8vIHNvbWV0aW1lcyB5b3Ugd2FudCByYXcgcGl4ZWwgdmFsdWVzXG4gICAgLy8gaWYgKHRoaXMub3B0aW9ucy5yZW5kZXJpbmdSdWxlKSB7XG4gICAgLy8gICBpZGVudGlmeVJlcXVlc3Quc2V0UmVuZGVyaW5nUnVsZSh0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZSk7XG4gICAgLy8gfVxuXG4gICAgaWRlbnRpZnlSZXF1ZXN0LnJ1bihjYWxsYmFjayk7XG5cbiAgICAvLyBzZXQgdGhlIGZsYWdzIHRvIHNob3cgdGhlIHBvcHVwXG4gICAgdGhpcy5fc2hvdWxkUmVuZGVyUG9wdXAgPSB0cnVlO1xuICAgIHRoaXMuX2xhc3RDbGljayA9IGUubGF0bG5nO1xuICB9LFxuXG4gIF9idWlsZEV4cG9ydFBhcmFtczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzciA9IHBhcnNlSW50KHRoaXMuX21hcC5vcHRpb25zLmNycy5jb2RlLnNwbGl0KCc6JylbMV0sIDEwKTtcblxuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBiYm94OiB0aGlzLl9jYWxjdWxhdGVCYm94KCksXG4gICAgICBzaXplOiB0aGlzLl9jYWxjdWxhdGVJbWFnZVNpemUoKSxcbiAgICAgIGZvcm1hdDogdGhpcy5vcHRpb25zLmZvcm1hdCxcbiAgICAgIHRyYW5zcGFyZW50OiB0aGlzLm9wdGlvbnMudHJhbnNwYXJlbnQsXG4gICAgICBiYm94U1I6IHNyLFxuICAgICAgaW1hZ2VTUjogc3JcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5mcm9tICYmIHRoaXMub3B0aW9ucy50bykge1xuICAgICAgcGFyYW1zLnRpbWUgPSB0aGlzLm9wdGlvbnMuZnJvbS52YWx1ZU9mKCkgKyAnLCcgKyB0aGlzLm9wdGlvbnMudG8udmFsdWVPZigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMucGl4ZWxUeXBlKSB7XG4gICAgICBwYXJhbXMucGl4ZWxUeXBlID0gdGhpcy5vcHRpb25zLnBpeGVsVHlwZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmludGVycG9sYXRpb24pIHtcbiAgICAgIHBhcmFtcy5pbnRlcnBvbGF0aW9uID0gdGhpcy5vcHRpb25zLmludGVycG9sYXRpb247XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb21wcmVzc2lvblF1YWxpdHkpIHtcbiAgICAgIHBhcmFtcy5jb21wcmVzc2lvblF1YWxpdHkgPSB0aGlzLm9wdGlvbnMuY29tcHJlc3Npb25RdWFsaXR5O1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYmFuZElkcykge1xuICAgICAgcGFyYW1zLmJhbmRJZHMgPSB0aGlzLm9wdGlvbnMuYmFuZElkcztcbiAgICB9XG5cbiAgICAvLyAwIGlzIGZhbHN5ICphbmQqIGEgdmFsaWQgaW5wdXQgcGFyYW1ldGVyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5ub0RhdGEgPT09IDAgfHwgdGhpcy5vcHRpb25zLm5vRGF0YSkge1xuICAgICAgcGFyYW1zLm5vRGF0YSA9IHRoaXMub3B0aW9ucy5ub0RhdGE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5ub0RhdGFJbnRlcnByZXRhdGlvbikge1xuICAgICAgcGFyYW1zLm5vRGF0YUludGVycHJldGF0aW9uID0gdGhpcy5vcHRpb25zLm5vRGF0YUludGVycHJldGF0aW9uO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNlcnZpY2Uub3B0aW9ucy50b2tlbikge1xuICAgICAgcGFyYW1zLnRva2VuID0gdGhpcy5zZXJ2aWNlLm9wdGlvbnMudG9rZW47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZW5kZXJpbmdSdWxlKSB7XG4gICAgICBwYXJhbXMucmVuZGVyaW5nUnVsZSA9IEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucy5yZW5kZXJpbmdSdWxlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLm1vc2FpY1J1bGUpIHtcbiAgICAgIHBhcmFtcy5tb3NhaWNSdWxlID0gSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLm1vc2FpY1J1bGUpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH0sXG5cbiAgX3JlcXVlc3RFeHBvcnQ6IGZ1bmN0aW9uIChwYXJhbXMsIGJvdW5kcykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZiA9PT0gJ2pzb24nKSB7XG4gICAgICB0aGlzLnNlcnZpY2UucmVxdWVzdCgnZXhwb3J0SW1hZ2UnLCBwYXJhbXMsIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7IHJldHVybjsgfSAvLyB3ZSByZWFsbHkgY2FuJ3QgZG8gYW55dGhpbmcgaGVyZSBidXQgYXV0aGVudGljYXRlIG9yIHJlcXVlc3RlcnJvciB3aWxsIGZpcmVcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50b2tlbikge1xuICAgICAgICAgIHJlc3BvbnNlLmhyZWYgKz0gKCc/dG9rZW49JyArIHRoaXMub3B0aW9ucy50b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVuZGVySW1hZ2UocmVzcG9uc2UuaHJlZiwgYm91bmRzKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJhbXMuZiA9ICdpbWFnZSc7XG4gICAgICB0aGlzLl9yZW5kZXJJbWFnZSh0aGlzLm9wdGlvbnMudXJsICsgJ2V4cG9ydEltYWdlJyArIFV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zKSwgYm91bmRzKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VNYXBMYXllciAodXJsLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSW1hZ2VNYXBMYXllcih1cmwsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbWFnZU1hcExheWVyO1xuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgUmFzdGVyTGF5ZXIgfSBmcm9tICcuL1Jhc3RlckxheWVyJztcbmltcG9ydCB7IGdldFVybFBhcmFtcyB9IGZyb20gJy4uL1V0aWwnO1xuaW1wb3J0IG1hcFNlcnZpY2UgZnJvbSAnLi4vU2VydmljZXMvTWFwU2VydmljZSc7XG5cbmV4cG9ydCB2YXIgRHluYW1pY01hcExheWVyID0gUmFzdGVyTGF5ZXIuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgdXBkYXRlSW50ZXJ2YWw6IDE1MCxcbiAgICBsYXllcnM6IGZhbHNlLFxuICAgIGxheWVyRGVmczogZmFsc2UsXG4gICAgdGltZU9wdGlvbnM6IGZhbHNlLFxuICAgIGZvcm1hdDogJ3BuZzI0JyxcbiAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICBmOiAnanNvbidcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBnZXRVcmxQYXJhbXMob3B0aW9ucyk7XG4gICAgdGhpcy5zZXJ2aWNlID0gbWFwU2VydmljZShvcHRpb25zKTtcbiAgICB0aGlzLnNlcnZpY2UuYWRkRXZlbnRQYXJlbnQodGhpcyk7XG5cbiAgICBpZiAoKG9wdGlvbnMucHJveHkgfHwgb3B0aW9ucy50b2tlbikgJiYgb3B0aW9ucy5mICE9PSAnanNvbicpIHtcbiAgICAgIG9wdGlvbnMuZiA9ICdqc29uJztcbiAgICB9XG5cbiAgICBVdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gIH0sXG5cbiAgZ2V0RHluYW1pY0xheWVyczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZHluYW1pY0xheWVycztcbiAgfSxcblxuICBzZXREeW5hbWljTGF5ZXJzOiBmdW5jdGlvbiAoZHluYW1pY0xheWVycykge1xuICAgIHRoaXMub3B0aW9ucy5keW5hbWljTGF5ZXJzID0gZHluYW1pY0xheWVycztcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRMYXllcnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxheWVycztcbiAgfSxcblxuICBzZXRMYXllcnM6IGZ1bmN0aW9uIChsYXllcnMpIHtcbiAgICB0aGlzLm9wdGlvbnMubGF5ZXJzID0gbGF5ZXJzO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldExheWVyRGVmczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubGF5ZXJEZWZzO1xuICB9LFxuXG4gIHNldExheWVyRGVmczogZnVuY3Rpb24gKGxheWVyRGVmcykge1xuICAgIHRoaXMub3B0aW9ucy5sYXllckRlZnMgPSBsYXllckRlZnM7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0VGltZU9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpbWVPcHRpb25zO1xuICB9LFxuXG4gIHNldFRpbWVPcHRpb25zOiBmdW5jdGlvbiAodGltZU9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMudGltZU9wdGlvbnMgPSB0aW1lT3B0aW9ucztcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UucXVlcnkoKTtcbiAgfSxcblxuICBpZGVudGlmeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaWRlbnRpZnkoKTtcbiAgfSxcblxuICBmaW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5maW5kKCk7XG4gIH0sXG5cbiAgX2dldFBvcHVwRGF0YTogZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgY2FsbGJhY2sgPSBVdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlQ29sbGVjdGlvbiwgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG4gICAgICBzZXRUaW1lb3V0KFV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlclBvcHVwKGUubGF0bG5nLCBlcnJvciwgZmVhdHVyZUNvbGxlY3Rpb24sIHJlc3BvbnNlKTtcbiAgICAgIH0sIHRoaXMpLCAzMDApO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgdmFyIGlkZW50aWZ5UmVxdWVzdDtcbiAgICBpZiAodGhpcy5vcHRpb25zLnBvcHVwKSB7XG4gICAgICBpZGVudGlmeVJlcXVlc3QgPSB0aGlzLm9wdGlvbnMucG9wdXAub24odGhpcy5fbWFwKS5hdChlLmxhdGxuZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkZW50aWZ5UmVxdWVzdCA9IHRoaXMuaWRlbnRpZnkoKS5vbih0aGlzLl9tYXApLmF0KGUubGF0bG5nKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgZXh0cmFuZW91cyB2ZXJ0aWNlcyBmcm9tIHJlc3BvbnNlIGZlYXR1cmVzIGlmIGl0IGhhcyBub3QgYWxyZWFkeSBiZWVuIGRvbmVcbiAgICBpZGVudGlmeVJlcXVlc3QucGFyYW1zLm1heEFsbG93YWJsZU9mZnNldCA/IHRydWUgOiBpZGVudGlmeVJlcXVlc3Quc2ltcGxpZnkodGhpcy5fbWFwLCAwLjUpO1xuXG4gICAgaWYgKCEodGhpcy5vcHRpb25zLnBvcHVwICYmIHRoaXMub3B0aW9ucy5wb3B1cC5wYXJhbXMgJiYgdGhpcy5vcHRpb25zLnBvcHVwLnBhcmFtcy5sYXllcnMpKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmxheWVycykge1xuICAgICAgICBpZGVudGlmeVJlcXVlc3QubGF5ZXJzKCd2aXNpYmxlOicgKyB0aGlzLm9wdGlvbnMubGF5ZXJzLmpvaW4oJywnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZGVudGlmeVJlcXVlc3QubGF5ZXJzKCd2aXNpYmxlJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgcHJlc2VudCwgcGFzcyBsYXllciBpZHMgYW5kIHNxbCBmaWx0ZXJzIHRocm91Z2ggdG8gdGhlIGlkZW50aWZ5IHRhc2tcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyRGVmcyAmJiB0eXBlb2YgdGhpcy5vcHRpb25zLmxheWVyRGVmcyAhPT0gJ3N0cmluZycgJiYgIWlkZW50aWZ5UmVxdWVzdC5wYXJhbXMubGF5ZXJEZWZzKSB7XG4gICAgICBmb3IgKHZhciBpZCBpbiB0aGlzLm9wdGlvbnMubGF5ZXJEZWZzKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXJEZWZzLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgICAgICAgIGlkZW50aWZ5UmVxdWVzdC5sYXllckRlZihpZCwgdGhpcy5vcHRpb25zLmxheWVyRGVmc1tpZF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWRlbnRpZnlSZXF1ZXN0LnJ1bihjYWxsYmFjayk7XG5cbiAgICAvLyBzZXQgdGhlIGZsYWdzIHRvIHNob3cgdGhlIHBvcHVwXG4gICAgdGhpcy5fc2hvdWxkUmVuZGVyUG9wdXAgPSB0cnVlO1xuICAgIHRoaXMuX2xhc3RDbGljayA9IGUubGF0bG5nO1xuICB9LFxuXG4gIF9idWlsZEV4cG9ydFBhcmFtczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzciA9IHBhcnNlSW50KHRoaXMuX21hcC5vcHRpb25zLmNycy5jb2RlLnNwbGl0KCc6JylbMV0sIDEwKTtcblxuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBiYm94OiB0aGlzLl9jYWxjdWxhdGVCYm94KCksXG4gICAgICBzaXplOiB0aGlzLl9jYWxjdWxhdGVJbWFnZVNpemUoKSxcbiAgICAgIGRwaTogOTYsXG4gICAgICBmb3JtYXQ6IHRoaXMub3B0aW9ucy5mb3JtYXQsXG4gICAgICB0cmFuc3BhcmVudDogdGhpcy5vcHRpb25zLnRyYW5zcGFyZW50LFxuICAgICAgYmJveFNSOiBzcixcbiAgICAgIGltYWdlU1I6IHNyXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZHluYW1pY0xheWVycykge1xuICAgICAgcGFyYW1zLmR5bmFtaWNMYXllcnMgPSB0aGlzLm9wdGlvbnMuZHluYW1pY0xheWVycztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVycykge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5sYXllcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcy5sYXllcnMgPSAnc2hvdzonICsgdGhpcy5vcHRpb25zLmxheWVycy5qb2luKCcsJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllckRlZnMpIHtcbiAgICAgIHBhcmFtcy5sYXllckRlZnMgPSB0eXBlb2YgdGhpcy5vcHRpb25zLmxheWVyRGVmcyA9PT0gJ3N0cmluZycgPyB0aGlzLm9wdGlvbnMubGF5ZXJEZWZzIDogSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLmxheWVyRGVmcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lT3B0aW9ucykge1xuICAgICAgcGFyYW1zLnRpbWVPcHRpb25zID0gSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLnRpbWVPcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmZyb20gJiYgdGhpcy5vcHRpb25zLnRvKSB7XG4gICAgICBwYXJhbXMudGltZSA9IHRoaXMub3B0aW9ucy5mcm9tLnZhbHVlT2YoKSArICcsJyArIHRoaXMub3B0aW9ucy50by52YWx1ZU9mKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VydmljZS5vcHRpb25zLnRva2VuKSB7XG4gICAgICBwYXJhbXMudG9rZW4gPSB0aGlzLnNlcnZpY2Uub3B0aW9ucy50b2tlbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnByb3h5KSB7XG4gICAgICBwYXJhbXMucHJveHkgPSB0aGlzLm9wdGlvbnMucHJveHk7XG4gICAgfVxuXG4gICAgLy8gdXNlIGEgdGltZXN0YW1wIHRvIGJ1c3Qgc2VydmVyIGNhY2hlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlQ2FjaGUpIHtcbiAgICAgIHBhcmFtcy5fdHMgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH0sXG5cbiAgX3JlcXVlc3RFeHBvcnQ6IGZ1bmN0aW9uIChwYXJhbXMsIGJvdW5kcykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZiA9PT0gJ2pzb24nKSB7XG4gICAgICB0aGlzLnNlcnZpY2UucmVxdWVzdCgnZXhwb3J0JywgcGFyYW1zLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50b2tlbikge1xuICAgICAgICAgIHJlc3BvbnNlLmhyZWYgKz0gKCc/dG9rZW49JyArIHRoaXMub3B0aW9ucy50b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcm94eSkge1xuICAgICAgICAgIHJlc3BvbnNlLmhyZWYgPSB0aGlzLm9wdGlvbnMucHJveHkgKyAnPycgKyByZXNwb25zZS5ocmVmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNwb25zZS5ocmVmKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVySW1hZ2UocmVzcG9uc2UuaHJlZiwgYm91bmRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJJbWFnZShyZXNwb25zZS5pbWFnZURhdGEsIGJvdW5kcywgcmVzcG9uc2UuY29udGVudFR5cGUpO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1zLmYgPSAnaW1hZ2UnO1xuICAgICAgdGhpcy5fcmVuZGVySW1hZ2UodGhpcy5vcHRpb25zLnVybCArICdleHBvcnQnICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMpLCBib3VuZHMpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkeW5hbWljTWFwTGF5ZXIgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IER5bmFtaWNNYXBMYXllcih1cmwsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkeW5hbWljTWFwTGF5ZXI7XG4iLCJpbXBvcnQge1xuICBib3VuZHMsXG4gIGxhdExuZ0JvdW5kcyxcbiAgcG9pbnQsXG4gIExheWVyLFxuICBzZXRPcHRpb25zLFxuICBVdGlsXG59IGZyb20gJ2xlYWZsZXQnO1xuXG52YXIgVmlydHVhbEdyaWQgPSBMYXllci5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBjZWxsU2l6ZTogNTEyLFxuICAgIHVwZGF0ZUludGVydmFsOiAxNTBcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBzZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX3pvb21pbmcgPSBmYWxzZTtcbiAgfSxcblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIHRoaXMuX21hcCA9IG1hcDtcbiAgICB0aGlzLl91cGRhdGUgPSBVdGlsLnRocm90dGxlKHRoaXMuX3VwZGF0ZSwgdGhpcy5vcHRpb25zLnVwZGF0ZUludGVydmFsLCB0aGlzKTtcbiAgICB0aGlzLl9yZXNldCgpO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICB9LFxuXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fbWFwLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5nZXRFdmVudHMoKSwgdGhpcyk7XG4gICAgdGhpcy5fcmVtb3ZlQ2VsbHMoKTtcbiAgfSxcblxuICBnZXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXZlbnRzID0ge1xuICAgICAgbW92ZWVuZDogdGhpcy5fdXBkYXRlLFxuICAgICAgem9vbXN0YXJ0OiB0aGlzLl96b29tc3RhcnQsXG4gICAgICB6b29tZW5kOiB0aGlzLl9yZXNldFxuICAgIH07XG5cbiAgICByZXR1cm4gZXZlbnRzO1xuICB9LFxuXG4gIGFkZFRvOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgbWFwLmFkZExheWVyKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJlbW92ZUZyb206IGZ1bmN0aW9uIChtYXApIHtcbiAgICBtYXAucmVtb3ZlTGF5ZXIodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3pvb21zdGFydDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3pvb21pbmcgPSB0cnVlO1xuICB9LFxuXG4gIF9yZXNldDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3JlbW92ZUNlbGxzKCk7XG5cbiAgICB0aGlzLl9jZWxscyA9IHt9O1xuICAgIHRoaXMuX2FjdGl2ZUNlbGxzID0ge307XG4gICAgdGhpcy5fY2VsbHNUb0xvYWQgPSAwO1xuICAgIHRoaXMuX2NlbGxzVG90YWwgPSAwO1xuICAgIHRoaXMuX2NlbGxOdW1Cb3VuZHMgPSB0aGlzLl9nZXRDZWxsTnVtQm91bmRzKCk7XG5cbiAgICB0aGlzLl9yZXNldFdyYXAoKTtcbiAgICB0aGlzLl96b29taW5nID0gZmFsc2U7XG4gIH0sXG5cbiAgX3Jlc2V0V3JhcDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBtYXAgPSB0aGlzLl9tYXA7XG4gICAgdmFyIGNycyA9IG1hcC5vcHRpb25zLmNycztcblxuICAgIGlmIChjcnMuaW5maW5pdGUpIHsgcmV0dXJuOyB9XG5cbiAgICB2YXIgY2VsbFNpemUgPSB0aGlzLl9nZXRDZWxsU2l6ZSgpO1xuXG4gICAgaWYgKGNycy53cmFwTG5nKSB7XG4gICAgICB0aGlzLl93cmFwTG5nID0gW1xuICAgICAgICBNYXRoLmZsb29yKG1hcC5wcm9qZWN0KFswLCBjcnMud3JhcExuZ1swXV0pLnggLyBjZWxsU2l6ZSksXG4gICAgICAgIE1hdGguY2VpbChtYXAucHJvamVjdChbMCwgY3JzLndyYXBMbmdbMV1dKS54IC8gY2VsbFNpemUpXG4gICAgICBdO1xuICAgIH1cblxuICAgIGlmIChjcnMud3JhcExhdCkge1xuICAgICAgdGhpcy5fd3JhcExhdCA9IFtcbiAgICAgICAgTWF0aC5mbG9vcihtYXAucHJvamVjdChbY3JzLndyYXBMYXRbMF0sIDBdKS55IC8gY2VsbFNpemUpLFxuICAgICAgICBNYXRoLmNlaWwobWFwLnByb2plY3QoW2Nycy53cmFwTGF0WzFdLCAwXSkueSAvIGNlbGxTaXplKVxuICAgICAgXTtcbiAgICB9XG4gIH0sXG5cbiAgX2dldENlbGxTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jZWxsU2l6ZTtcbiAgfSxcblxuICBfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLl9tYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbWFwQm91bmRzID0gdGhpcy5fbWFwLmdldFBpeGVsQm91bmRzKCk7XG4gICAgdmFyIGNlbGxTaXplID0gdGhpcy5fZ2V0Q2VsbFNpemUoKTtcblxuICAgIC8vIGNlbGwgY29vcmRpbmF0ZXMgcmFuZ2UgZm9yIHRoZSBjdXJyZW50IHZpZXdcbiAgICB2YXIgY2VsbEJvdW5kcyA9IGJvdW5kcyhcbiAgICAgIG1hcEJvdW5kcy5taW4uZGl2aWRlQnkoY2VsbFNpemUpLmZsb29yKCksXG4gICAgICBtYXBCb3VuZHMubWF4LmRpdmlkZUJ5KGNlbGxTaXplKS5mbG9vcigpKTtcblxuICAgIHRoaXMuX3JlbW92ZU90aGVyQ2VsbHMoY2VsbEJvdW5kcyk7XG4gICAgdGhpcy5fYWRkQ2VsbHMoY2VsbEJvdW5kcyk7XG5cbiAgICB0aGlzLmZpcmUoJ2NlbGxzdXBkYXRlZCcpO1xuICB9LFxuXG4gIF9hZGRDZWxsczogZnVuY3Rpb24gKGNlbGxCb3VuZHMpIHtcbiAgICB2YXIgcXVldWUgPSBbXTtcbiAgICB2YXIgY2VudGVyID0gY2VsbEJvdW5kcy5nZXRDZW50ZXIoKTtcbiAgICB2YXIgem9vbSA9IHRoaXMuX21hcC5nZXRab29tKCk7XG5cbiAgICB2YXIgaiwgaSwgY29vcmRzO1xuICAgIC8vIGNyZWF0ZSBhIHF1ZXVlIG9mIGNvb3JkaW5hdGVzIHRvIGxvYWQgY2VsbHMgZnJvbVxuICAgIGZvciAoaiA9IGNlbGxCb3VuZHMubWluLnk7IGogPD0gY2VsbEJvdW5kcy5tYXgueTsgaisrKSB7XG4gICAgICBmb3IgKGkgPSBjZWxsQm91bmRzLm1pbi54OyBpIDw9IGNlbGxCb3VuZHMubWF4Lng7IGkrKykge1xuICAgICAgICBjb29yZHMgPSBwb2ludChpLCBqKTtcbiAgICAgICAgY29vcmRzLnogPSB6b29tO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1ZhbGlkQ2VsbChjb29yZHMpKSB7XG4gICAgICAgICAgcXVldWUucHVzaChjb29yZHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNlbGxzVG9Mb2FkID0gcXVldWUubGVuZ3RoO1xuXG4gICAgaWYgKGNlbGxzVG9Mb2FkID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgdGhpcy5fY2VsbHNUb0xvYWQgKz0gY2VsbHNUb0xvYWQ7XG4gICAgdGhpcy5fY2VsbHNUb3RhbCArPSBjZWxsc1RvTG9hZDtcblxuICAgIC8vIHNvcnQgY2VsbCBxdWV1ZSB0byBsb2FkIGNlbGxzIGluIG9yZGVyIG9mIHRoZWlyIGRpc3RhbmNlIHRvIGNlbnRlclxuICAgIHF1ZXVlLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBhLmRpc3RhbmNlVG8oY2VudGVyKSAtIGIuZGlzdGFuY2VUbyhjZW50ZXIpO1xuICAgIH0pO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGNlbGxzVG9Mb2FkOyBpKyspIHtcbiAgICAgIHRoaXMuX2FkZENlbGwocXVldWVbaV0pO1xuICAgIH1cbiAgfSxcblxuICBfaXNWYWxpZENlbGw6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICB2YXIgY3JzID0gdGhpcy5fbWFwLm9wdGlvbnMuY3JzO1xuXG4gICAgaWYgKCFjcnMuaW5maW5pdGUpIHtcbiAgICAgIC8vIGRvbid0IGxvYWQgY2VsbCBpZiBpdCdzIG91dCBvZiBib3VuZHMgYW5kIG5vdCB3cmFwcGVkXG4gICAgICB2YXIgY2VsbE51bUJvdW5kcyA9IHRoaXMuX2NlbGxOdW1Cb3VuZHM7XG4gICAgICBpZiAoXG4gICAgICAgICghY3JzLndyYXBMbmcgJiYgKGNvb3Jkcy54IDwgY2VsbE51bUJvdW5kcy5taW4ueCB8fCBjb29yZHMueCA+IGNlbGxOdW1Cb3VuZHMubWF4LngpKSB8fFxuICAgICAgICAoIWNycy53cmFwTGF0ICYmIChjb29yZHMueSA8IGNlbGxOdW1Cb3VuZHMubWluLnkgfHwgY29vcmRzLnkgPiBjZWxsTnVtQm91bmRzLm1heC55KSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYm91bmRzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBkb24ndCBsb2FkIGNlbGwgaWYgaXQgZG9lc24ndCBpbnRlcnNlY3QgdGhlIGJvdW5kcyBpbiBvcHRpb25zXG4gICAgdmFyIGNlbGxCb3VuZHMgPSB0aGlzLl9jZWxsQ29vcmRzVG9Cb3VuZHMoY29vcmRzKTtcbiAgICByZXR1cm4gbGF0TG5nQm91bmRzKHRoaXMub3B0aW9ucy5ib3VuZHMpLmludGVyc2VjdHMoY2VsbEJvdW5kcyk7XG4gIH0sXG5cbiAgLy8gY29udmVydHMgY2VsbCBjb29yZGluYXRlcyB0byBpdHMgZ2VvZ3JhcGhpY2FsIGJvdW5kc1xuICBfY2VsbENvb3Jkc1RvQm91bmRzOiBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcbiAgICB2YXIgY2VsbFNpemUgPSB0aGlzLm9wdGlvbnMuY2VsbFNpemU7XG4gICAgdmFyIG53UG9pbnQgPSBjb29yZHMubXVsdGlwbHlCeShjZWxsU2l6ZSk7XG4gICAgdmFyIHNlUG9pbnQgPSBud1BvaW50LmFkZChbY2VsbFNpemUsIGNlbGxTaXplXSk7XG4gICAgdmFyIG53ID0gbWFwLndyYXBMYXRMbmcobWFwLnVucHJvamVjdChud1BvaW50LCBjb29yZHMueikpO1xuICAgIHZhciBzZSA9IG1hcC53cmFwTGF0TG5nKG1hcC51bnByb2plY3Qoc2VQb2ludCwgY29vcmRzLnopKTtcblxuICAgIHJldHVybiBsYXRMbmdCb3VuZHMobncsIHNlKTtcbiAgfSxcblxuICAvLyBjb252ZXJ0cyBjZWxsIGNvb3JkaW5hdGVzIHRvIGtleSBmb3IgdGhlIGNlbGwgY2FjaGVcbiAgX2NlbGxDb29yZHNUb0tleTogZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIHJldHVybiBjb29yZHMueCArICc6JyArIGNvb3Jkcy55O1xuICB9LFxuXG4gIC8vIGNvbnZlcnRzIGNlbGwgY2FjaGUga2V5IHRvIGNvb3JkaWFudGVzXG4gIF9rZXlUb0NlbGxDb29yZHM6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIga0FyciA9IGtleS5zcGxpdCgnOicpO1xuICAgIHZhciB4ID0gcGFyc2VJbnQoa0FyclswXSwgMTApO1xuICAgIHZhciB5ID0gcGFyc2VJbnQoa0FyclsxXSwgMTApO1xuXG4gICAgcmV0dXJuIHBvaW50KHgsIHkpO1xuICB9LFxuXG4gIC8vIHJlbW92ZSBhbnkgcHJlc2VudCBjZWxscyB0aGF0IGFyZSBvZmYgdGhlIHNwZWNpZmllZCBib3VuZHNcbiAgX3JlbW92ZU90aGVyQ2VsbHM6IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICAgIGlmICghYm91bmRzLmNvbnRhaW5zKHRoaXMuX2tleVRvQ2VsbENvb3JkcyhrZXkpKSkge1xuICAgICAgICB0aGlzLl9yZW1vdmVDZWxsKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9yZW1vdmVDZWxsOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLl9hY3RpdmVDZWxsc1trZXldO1xuXG4gICAgaWYgKGNlbGwpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9hY3RpdmVDZWxsc1trZXldO1xuXG4gICAgICBpZiAodGhpcy5jZWxsTGVhdmUpIHtcbiAgICAgICAgdGhpcy5jZWxsTGVhdmUoY2VsbC5ib3VuZHMsIGNlbGwuY29vcmRzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maXJlKCdjZWxsbGVhdmUnLCB7XG4gICAgICAgIGJvdW5kczogY2VsbC5ib3VuZHMsXG4gICAgICAgIGNvb3JkczogY2VsbC5jb29yZHNcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBfcmVtb3ZlQ2VsbHM6IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICAgIHZhciBjZWxsQm91bmRzID0gdGhpcy5fY2VsbHNba2V5XS5ib3VuZHM7XG4gICAgICB2YXIgY29vcmRzID0gdGhpcy5fY2VsbHNba2V5XS5jb29yZHM7XG5cbiAgICAgIGlmICh0aGlzLmNlbGxMZWF2ZSkge1xuICAgICAgICB0aGlzLmNlbGxMZWF2ZShjZWxsQm91bmRzLCBjb29yZHMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmUoJ2NlbGxsZWF2ZScsIHtcbiAgICAgICAgYm91bmRzOiBjZWxsQm91bmRzLFxuICAgICAgICBjb29yZHM6IGNvb3Jkc1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIF9hZGRDZWxsOiBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgLy8gd3JhcCBjZWxsIGNvb3JkcyBpZiBuZWNlc3NhcnkgKGRlcGVuZGluZyBvbiBDUlMpXG4gICAgdGhpcy5fd3JhcENvb3Jkcyhjb29yZHMpO1xuXG4gICAgLy8gZ2VuZXJhdGUgdGhlIGNlbGwga2V5XG4gICAgdmFyIGtleSA9IHRoaXMuX2NlbGxDb29yZHNUb0tleShjb29yZHMpO1xuXG4gICAgLy8gZ2V0IHRoZSBjZWxsIGZyb20gdGhlIGNhY2hlXG4gICAgdmFyIGNlbGwgPSB0aGlzLl9jZWxsc1trZXldO1xuICAgIC8vIGlmIHRoaXMgY2VsbCBzaG91bGQgYmUgc2hvd24gYXMgaXNudCBhY3RpdmUgeWV0IChlbnRlcilcblxuICAgIGlmIChjZWxsICYmICF0aGlzLl9hY3RpdmVDZWxsc1trZXldKSB7XG4gICAgICBpZiAodGhpcy5jZWxsRW50ZXIpIHtcbiAgICAgICAgdGhpcy5jZWxsRW50ZXIoY2VsbC5ib3VuZHMsIGNvb3Jkcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlyZSgnY2VsbGVudGVyJywge1xuICAgICAgICBib3VuZHM6IGNlbGwuYm91bmRzLFxuICAgICAgICBjb29yZHM6IGNvb3Jkc1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2FjdGl2ZUNlbGxzW2tleV0gPSBjZWxsO1xuICAgIH1cblxuICAgIC8vIGlmIHdlIGRvbnQgaGF2ZSB0aGlzIGNlbGwgaW4gdGhlIGNhY2hlIHlldCAoY3JlYXRlKVxuICAgIGlmICghY2VsbCkge1xuICAgICAgY2VsbCA9IHtcbiAgICAgICAgY29vcmRzOiBjb29yZHMsXG4gICAgICAgIGJvdW5kczogdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3JkcylcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX2NlbGxzW2tleV0gPSBjZWxsO1xuICAgICAgdGhpcy5fYWN0aXZlQ2VsbHNba2V5XSA9IGNlbGw7XG5cbiAgICAgIGlmICh0aGlzLmNyZWF0ZUNlbGwpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVDZWxsKGNlbGwuYm91bmRzLCBjb29yZHMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmUoJ2NlbGxjcmVhdGUnLCB7XG4gICAgICAgIGJvdW5kczogY2VsbC5ib3VuZHMsXG4gICAgICAgIGNvb3JkczogY29vcmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX3dyYXBDb29yZHM6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICBjb29yZHMueCA9IHRoaXMuX3dyYXBMbmcgPyBVdGlsLndyYXBOdW0oY29vcmRzLngsIHRoaXMuX3dyYXBMbmcpIDogY29vcmRzLng7XG4gICAgY29vcmRzLnkgPSB0aGlzLl93cmFwTGF0ID8gVXRpbC53cmFwTnVtKGNvb3Jkcy55LCB0aGlzLl93cmFwTGF0KSA6IGNvb3Jkcy55O1xuICB9LFxuXG4gIC8vIGdldCB0aGUgZ2xvYmFsIGNlbGwgY29vcmRpbmF0ZXMgcmFuZ2UgZm9yIHRoZSBjdXJyZW50IHpvb21cbiAgX2dldENlbGxOdW1Cb3VuZHM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgd29ybGRCb3VuZHMgPSB0aGlzLl9tYXAuZ2V0UGl4ZWxXb3JsZEJvdW5kcygpO1xuICAgIHZhciBzaXplID0gdGhpcy5fZ2V0Q2VsbFNpemUoKTtcblxuICAgIHJldHVybiB3b3JsZEJvdW5kcyA/IGJvdW5kcyhcbiAgICAgIHdvcmxkQm91bmRzLm1pbi5kaXZpZGVCeShzaXplKS5mbG9vcigpLFxuICAgICAgd29ybGRCb3VuZHMubWF4LmRpdmlkZUJ5KHNpemUpLmNlaWwoKS5zdWJ0cmFjdChbMSwgMV0pKSA6IG51bGw7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBWaXJ0dWFsR3JpZDtcbiIsImZ1bmN0aW9uIEJpbmFyeVNlYXJjaEluZGV4ICh2YWx1ZXMpIHtcbiAgdGhpcy52YWx1ZXMgPSBbXS5jb25jYXQodmFsdWVzIHx8IFtdKTtcbn1cblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgodmFsdWUpO1xuICByZXR1cm4gdGhpcy52YWx1ZXNbaW5kZXhdO1xufTtcblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLmdldEluZGV4ID0gZnVuY3Rpb24gZ2V0SW5kZXggKHZhbHVlKSB7XG4gIGlmICh0aGlzLmRpcnR5KSB7XG4gICAgdGhpcy5zb3J0KCk7XG4gIH1cblxuICB2YXIgbWluSW5kZXggPSAwO1xuICB2YXIgbWF4SW5kZXggPSB0aGlzLnZhbHVlcy5sZW5ndGggLSAxO1xuICB2YXIgY3VycmVudEluZGV4O1xuICB2YXIgY3VycmVudEVsZW1lbnQ7XG5cbiAgd2hpbGUgKG1pbkluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgY3VycmVudEluZGV4ID0gKG1pbkluZGV4ICsgbWF4SW5kZXgpIC8gMiB8IDA7XG4gICAgY3VycmVudEVsZW1lbnQgPSB0aGlzLnZhbHVlc1tNYXRoLnJvdW5kKGN1cnJlbnRJbmRleCldO1xuICAgIGlmICgrY3VycmVudEVsZW1lbnQudmFsdWUgPCArdmFsdWUpIHtcbiAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICB9IGVsc2UgaWYgKCtjdXJyZW50RWxlbWVudC52YWx1ZSA+ICt2YWx1ZSkge1xuICAgICAgbWF4SW5kZXggPSBjdXJyZW50SW5kZXggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3VycmVudEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBNYXRoLmFicyh+bWF4SW5kZXgpO1xufTtcblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLmJldHdlZW4gPSBmdW5jdGlvbiBiZXR3ZWVuIChzdGFydCwgZW5kKSB7XG4gIHZhciBzdGFydEluZGV4ID0gdGhpcy5nZXRJbmRleChzdGFydCk7XG4gIHZhciBlbmRJbmRleCA9IHRoaXMuZ2V0SW5kZXgoZW5kKTtcblxuICBpZiAoc3RhcnRJbmRleCA9PT0gMCAmJiBlbmRJbmRleCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHdoaWxlICh0aGlzLnZhbHVlc1tzdGFydEluZGV4IC0gMV0gJiYgdGhpcy52YWx1ZXNbc3RhcnRJbmRleCAtIDFdLnZhbHVlID09PSBzdGFydCkge1xuICAgIHN0YXJ0SW5kZXgtLTtcbiAgfVxuXG4gIHdoaWxlICh0aGlzLnZhbHVlc1tlbmRJbmRleCArIDFdICYmIHRoaXMudmFsdWVzW2VuZEluZGV4ICsgMV0udmFsdWUgPT09IGVuZCkge1xuICAgIGVuZEluZGV4Kys7XG4gIH1cblxuICBpZiAodGhpcy52YWx1ZXNbZW5kSW5kZXhdICYmIHRoaXMudmFsdWVzW2VuZEluZGV4XS52YWx1ZSA9PT0gZW5kICYmIHRoaXMudmFsdWVzW2VuZEluZGV4ICsgMV0pIHtcbiAgICBlbmRJbmRleCsrO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMudmFsdWVzLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcbn07XG5cbkJpbmFyeVNlYXJjaEluZGV4LnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiBpbnNlcnQgKGl0ZW0pIHtcbiAgdGhpcy52YWx1ZXMuc3BsaWNlKHRoaXMuZ2V0SW5kZXgoaXRlbS52YWx1ZSksIDAsIGl0ZW0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkJpbmFyeVNlYXJjaEluZGV4LnByb3RvdHlwZS5idWxrQWRkID0gZnVuY3Rpb24gYnVsa0FkZCAoaXRlbXMsIHNvcnQpIHtcbiAgdGhpcy52YWx1ZXMgPSB0aGlzLnZhbHVlcy5jb25jYXQoW10uY29uY2F0KGl0ZW1zIHx8IFtdKSk7XG5cbiAgaWYgKHNvcnQpIHtcbiAgICB0aGlzLnNvcnQoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLnNvcnQgPSBmdW5jdGlvbiBzb3J0ICgpIHtcbiAgdGhpcy52YWx1ZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiArYi52YWx1ZSAtICthLnZhbHVlO1xuICB9KS5yZXZlcnNlKCk7XG4gIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCaW5hcnlTZWFyY2hJbmRleDtcbiIsImltcG9ydCB7IFV0aWwgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCBmZWF0dXJlTGF5ZXJTZXJ2aWNlIGZyb20gJy4uLy4uL1NlcnZpY2VzL0ZlYXR1cmVMYXllclNlcnZpY2UnO1xuaW1wb3J0IHsgZ2V0VXJsUGFyYW1zLCB3YXJuLCBzZXRFc3JpQXR0cmlidXRpb24gfSBmcm9tICcuLi8uLi9VdGlsJztcbmltcG9ydCBWaXJ0dWFsR3JpZCBmcm9tICdsZWFmbGV0LXZpcnR1YWwtZ3JpZCc7XG5pbXBvcnQgQmluYXJ5U2VhcmNoSW5kZXggZnJvbSAndGlueS1iaW5hcnktc2VhcmNoJztcblxuZXhwb3J0IHZhciBGZWF0dXJlTWFuYWdlciA9IFZpcnR1YWxHcmlkLmV4dGVuZCh7XG4gIC8qKlxuICAgKiBPcHRpb25zXG4gICAqL1xuXG4gIG9wdGlvbnM6IHtcbiAgICBhdHRyaWJ1dGlvbjogbnVsbCxcbiAgICB3aGVyZTogJzE9MScsXG4gICAgZmllbGRzOiBbJyonXSxcbiAgICBmcm9tOiBmYWxzZSxcbiAgICB0bzogZmFsc2UsXG4gICAgdGltZUZpZWxkOiBmYWxzZSxcbiAgICB0aW1lRmlsdGVyTW9kZTogJ3NlcnZlcicsXG4gICAgc2ltcGxpZnlGYWN0b3I6IDAsXG4gICAgcHJlY2lzaW9uOiA2XG4gIH0sXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqL1xuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgVmlydHVhbEdyaWQucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICAgIG9wdGlvbnMgPSBnZXRVcmxQYXJhbXMob3B0aW9ucyk7XG4gICAgb3B0aW9ucyA9IFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblxuICAgIHRoaXMuc2VydmljZSA9IGZlYXR1cmVMYXllclNlcnZpY2Uob3B0aW9ucyk7XG4gICAgdGhpcy5zZXJ2aWNlLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuXG4gICAgLy8gdXNlIGNhc2UgaW5zZW5zaXRpdmUgcmVnZXggdG8gbG9vayBmb3IgY29tbW9uIGZpZWxkbmFtZXMgdXNlZCBmb3IgaW5kZXhpbmdcbiAgICBpZiAodGhpcy5vcHRpb25zLmZpZWxkc1swXSAhPT0gJyonKSB7XG4gICAgICB2YXIgb2lkQ2hlY2sgPSBmYWxzZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmZpZWxkc1tpXS5tYXRjaCgvXihPQkpFQ1RJRHxGSUR8T0lEfElEKSQvaSkpIHtcbiAgICAgICAgICBvaWRDaGVjayA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChvaWRDaGVjayA9PT0gZmFsc2UpIHtcbiAgICAgICAgd2Fybignbm8ga25vd24gZXNyaUZpZWxkVHlwZU9JRCBmaWVsZCBkZXRlY3RlZCBpbiBmaWVsZHMgQXJyYXkuICBQbGVhc2UgYWRkIGFuIGF0dHJpYnV0ZSBmaWVsZCBjb250YWluaW5nIHVuaXF1ZSBJRHMgdG8gZW5zdXJlIHRoZSBsYXllciBjYW4gYmUgZHJhd24gY29ycmVjdGx5LicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0ICYmIHRoaXMub3B0aW9ucy50aW1lRmllbGQuZW5kKSB7XG4gICAgICB0aGlzLl9zdGFydFRpbWVJbmRleCA9IG5ldyBCaW5hcnlTZWFyY2hJbmRleCgpO1xuICAgICAgdGhpcy5fZW5kVGltZUluZGV4ID0gbmV3IEJpbmFyeVNlYXJjaEluZGV4KCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMudGltZUZpZWxkKSB7XG4gICAgICB0aGlzLl90aW1lSW5kZXggPSBuZXcgQmluYXJ5U2VhcmNoSW5kZXgoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jYWNoZSA9IHt9O1xuICAgIHRoaXMuX2N1cnJlbnRTbmFwc2hvdCA9IFtdOyAvLyBjYWNoZSBvZiB3aGF0IGxheWVycyBzaG91bGQgYmUgYWN0aXZlXG4gICAgdGhpcy5fYWN0aXZlUmVxdWVzdHMgPSAwO1xuICB9LFxuXG4gIC8qKlxuICAgKiBMYXllciBJbnRlcmZhY2VcbiAgICovXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICAvLyBpbmNsdWRlICdQb3dlcmVkIGJ5IEVzcmknIGluIG1hcCBhdHRyaWJ1dGlvblxuICAgIHNldEVzcmlBdHRyaWJ1dGlvbihtYXApO1xuXG4gICAgdGhpcy5zZXJ2aWNlLm1ldGFkYXRhKGZ1bmN0aW9uIChlcnIsIG1ldGFkYXRhKSB7XG4gICAgICBpZiAoIWVycikge1xuICAgICAgICB2YXIgc3VwcG9ydGVkRm9ybWF0cyA9IG1ldGFkYXRhLnN1cHBvcnRlZFF1ZXJ5Rm9ybWF0cztcblxuICAgICAgICAvLyBDaGVjayBpZiBzb21lb25lIGhhcyByZXF1ZXN0ZWQgdGhhdCB3ZSBkb24ndCB1c2UgZ2VvSlNPTiwgZXZlbiBpZiBpdCdzIGF2YWlsYWJsZVxuICAgICAgICB2YXIgZm9yY2VKc29uRm9ybWF0ID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLnNlcnZpY2Uub3B0aW9ucy5pc01vZGVybiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBmb3JjZUpzb25Gb3JtYXQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVW5sZXNzIHdlJ3ZlIGJlZW4gdG9sZCBvdGhlcndpc2UsIGNoZWNrIHRvIHNlZSB3aGV0aGVyIHNlcnZpY2UgY2FuIGVtaXQgR2VvSlNPTiBuYXRpdmVseVxuICAgICAgICBpZiAoIWZvcmNlSnNvbkZvcm1hdCAmJiBzdXBwb3J0ZWRGb3JtYXRzICYmIHN1cHBvcnRlZEZvcm1hdHMuaW5kZXhPZignZ2VvSlNPTicpICE9PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2VydmljZS5vcHRpb25zLmlzTW9kZXJuID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBjb3B5cmlnaHQgdGV4dCBsaXN0ZWQgaW4gc2VydmljZSBtZXRhZGF0YVxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbiAmJiBtYXAuYXR0cmlidXRpb25Db250cm9sICYmIG1ldGFkYXRhLmNvcHlyaWdodFRleHQpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gPSBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0O1xuICAgICAgICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuYWRkQXR0cmlidXRpb24odGhpcy5nZXRBdHRyaWJ1dGlvbigpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgbWFwLm9uKCd6b29tZW5kJywgdGhpcy5faGFuZGxlWm9vbUNoYW5nZSwgdGhpcyk7XG5cbiAgICByZXR1cm4gVmlydHVhbEdyaWQucHJvdG90eXBlLm9uQWRkLmNhbGwodGhpcywgbWFwKTtcbiAgfSxcblxuICBvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuICAgIG1hcC5vZmYoJ3pvb21lbmQnLCB0aGlzLl9oYW5kbGVab29tQ2hhbmdlLCB0aGlzKTtcblxuICAgIHJldHVybiBWaXJ0dWFsR3JpZC5wcm90b3R5cGUub25SZW1vdmUuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIGdldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbjtcbiAgfSxcblxuICAvKipcbiAgICogRmVhdHVyZSBNYW5hZ2VtZW50XG4gICAqL1xuXG4gIGNyZWF0ZUNlbGw6IGZ1bmN0aW9uIChib3VuZHMsIGNvb3Jkcykge1xuICAgIC8vIGRvbnQgZmV0Y2ggZmVhdHVyZXMgb3V0c2lkZSB0aGUgc2NhbGUgcmFuZ2UgZGVmaW5lZCBmb3IgdGhlIGxheWVyXG4gICAgaWYgKHRoaXMuX3Zpc2libGVab29tKCkpIHtcbiAgICAgIHRoaXMuX3JlcXVlc3RGZWF0dXJlcyhib3VuZHMsIGNvb3Jkcyk7XG4gICAgfVxuICB9LFxuXG4gIF9yZXF1ZXN0RmVhdHVyZXM6IGZ1bmN0aW9uIChib3VuZHMsIGNvb3JkcywgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9hY3RpdmVSZXF1ZXN0cysrO1xuXG4gICAgLy8gb3VyIGZpcnN0IGFjdGl2ZSByZXF1ZXN0IGZpcmVzIGxvYWRpbmdcbiAgICBpZiAodGhpcy5fYWN0aXZlUmVxdWVzdHMgPT09IDEpIHtcbiAgICAgIHRoaXMuZmlyZSgnbG9hZGluZycsIHtcbiAgICAgICAgYm91bmRzOiBib3VuZHNcbiAgICAgIH0sIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9idWlsZFF1ZXJ5KGJvdW5kcykucnVuKGZ1bmN0aW9uIChlcnJvciwgZmVhdHVyZUNvbGxlY3Rpb24sIHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZXhjZWVkZWRUcmFuc2ZlckxpbWl0KSB7XG4gICAgICAgIHRoaXMuZmlyZSgnZHJhd2xpbWl0ZXhjZWVkZWQnKTtcbiAgICAgIH1cblxuICAgICAgLy8gbm8gZXJyb3IsIGZlYXR1cmVzXG4gICAgICBpZiAoIWVycm9yICYmIGZlYXR1cmVDb2xsZWN0aW9uICYmIGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICAvLyBzY2hlZHVsZSBhZGRpbmcgZmVhdHVyZXMgdW50aWwgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXG4gICAgICAgIFV0aWwucmVxdWVzdEFuaW1GcmFtZShVdGlsLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuX2FkZEZlYXR1cmVzKGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLCBjb29yZHMpO1xuICAgICAgICAgIHRoaXMuX3Bvc3RQcm9jZXNzRmVhdHVyZXMoYm91bmRzKTtcbiAgICAgICAgfSwgdGhpcykpO1xuICAgICAgfVxuXG4gICAgICAvLyBubyBlcnJvciwgbm8gZmVhdHVyZXNcbiAgICAgIGlmICghZXJyb3IgJiYgZmVhdHVyZUNvbGxlY3Rpb24gJiYgIWZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9wb3N0UHJvY2Vzc0ZlYXR1cmVzKGJvdW5kcyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICB0aGlzLl9wb3N0UHJvY2Vzc0ZlYXR1cmVzKGJvdW5kcyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGVycm9yLCBmZWF0dXJlQ29sbGVjdGlvbik7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX3Bvc3RQcm9jZXNzRmVhdHVyZXM6IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICAvLyBkZWluY3JlbWVudCB0aGUgcmVxdWVzdCBjb3VudGVyIG5vdyB0aGF0IHdlIGhhdmUgcHJvY2Vzc2VkIGZlYXR1cmVzXG4gICAgdGhpcy5fYWN0aXZlUmVxdWVzdHMtLTtcblxuICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIGFjdGl2ZSByZXF1ZXN0cyBmaXJlIGEgbG9hZCBldmVudCBmb3IgdGhpcyB2aWV3XG4gICAgaWYgKHRoaXMuX2FjdGl2ZVJlcXVlc3RzIDw9IDApIHtcbiAgICAgIHRoaXMuZmlyZSgnbG9hZCcsIHtcbiAgICAgICAgYm91bmRzOiBib3VuZHNcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBfY2FjaGVLZXk6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICByZXR1cm4gY29vcmRzLnogKyAnOicgKyBjb29yZHMueCArICc6JyArIGNvb3Jkcy55O1xuICB9LFxuXG4gIF9hZGRGZWF0dXJlczogZnVuY3Rpb24gKGZlYXR1cmVzLCBjb29yZHMpIHtcbiAgICB2YXIga2V5ID0gdGhpcy5fY2FjaGVLZXkoY29vcmRzKTtcbiAgICB0aGlzLl9jYWNoZVtrZXldID0gdGhpcy5fY2FjaGVba2V5XSB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSBmZWF0dXJlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGlkID0gZmVhdHVyZXNbaV0uaWQ7XG5cbiAgICAgIGlmICh0aGlzLl9jdXJyZW50U25hcHNob3QuaW5kZXhPZihpZCkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRTbmFwc2hvdC5wdXNoKGlkKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9jYWNoZVtrZXldLmluZGV4T2YoaWQpID09PSAtMSkge1xuICAgICAgICB0aGlzLl9jYWNoZVtrZXldLnB1c2goaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZUZpZWxkKSB7XG4gICAgICB0aGlzLl9idWlsZFRpbWVJbmRleGVzKGZlYXR1cmVzKTtcbiAgICB9XG5cbiAgICB0aGlzLmNyZWF0ZUxheWVycyhmZWF0dXJlcyk7XG4gIH0sXG5cbiAgX2J1aWxkUXVlcnk6IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLnNlcnZpY2UucXVlcnkoKVxuICAgICAgLmludGVyc2VjdHMoYm91bmRzKVxuICAgICAgLndoZXJlKHRoaXMub3B0aW9ucy53aGVyZSlcbiAgICAgIC5maWVsZHModGhpcy5vcHRpb25zLmZpZWxkcylcbiAgICAgIC5wcmVjaXNpb24odGhpcy5vcHRpb25zLnByZWNpc2lvbik7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlcXVlc3RQYXJhbXMpIHtcbiAgICAgIFV0aWwuZXh0ZW5kKHF1ZXJ5LnBhcmFtcywgdGhpcy5vcHRpb25zLnJlcXVlc3RQYXJhbXMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2ltcGxpZnlGYWN0b3IpIHtcbiAgICAgIHF1ZXJ5LnNpbXBsaWZ5KHRoaXMuX21hcCwgdGhpcy5vcHRpb25zLnNpbXBsaWZ5RmFjdG9yKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWx0ZXJNb2RlID09PSAnc2VydmVyJyAmJiB0aGlzLm9wdGlvbnMuZnJvbSAmJiB0aGlzLm9wdGlvbnMudG8pIHtcbiAgICAgIHF1ZXJ5LmJldHdlZW4odGhpcy5vcHRpb25zLmZyb20sIHRoaXMub3B0aW9ucy50byk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9LFxuXG4gIC8qKlxuICAgKiBXaGVyZSBNZXRob2RzXG4gICAqL1xuXG4gIHNldFdoZXJlOiBmdW5jdGlvbiAod2hlcmUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5vcHRpb25zLndoZXJlID0gKHdoZXJlICYmIHdoZXJlLmxlbmd0aCkgPyB3aGVyZSA6ICcxPTEnO1xuXG4gICAgdmFyIG9sZFNuYXBzaG90ID0gW107XG4gICAgdmFyIG5ld1NuYXBzaG90ID0gW107XG4gICAgdmFyIHBlbmRpbmdSZXF1ZXN0cyA9IDA7XG4gICAgdmFyIHJlcXVlc3RFcnJvciA9IG51bGw7XG4gICAgdmFyIHJlcXVlc3RDYWxsYmFjayA9IFV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIGZlYXR1cmVDb2xsZWN0aW9uKSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVxdWVzdEVycm9yID0gZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGlmIChmZWF0dXJlQ29sbGVjdGlvbikge1xuICAgICAgICBmb3IgKHZhciBpID0gZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBuZXdTbmFwc2hvdC5wdXNoKGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzW2ldLmlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwZW5kaW5nUmVxdWVzdHMtLTtcblxuICAgICAgaWYgKHBlbmRpbmdSZXF1ZXN0cyA8PSAwICYmIHRoaXMuX3Zpc2libGVab29tKCkpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFNuYXBzaG90ID0gbmV3U25hcHNob3Q7XG4gICAgICAgIC8vIHNjaGVkdWxlIGFkZGluZyBmZWF0dXJlcyBmb3IgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXG4gICAgICAgIFV0aWwucmVxdWVzdEFuaW1GcmFtZShVdGlsLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKG9sZFNuYXBzaG90KTtcbiAgICAgICAgICB0aGlzLmFkZExheWVycyhuZXdTbmFwc2hvdCk7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHJlcXVlc3RFcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBmb3IgKHZhciBpID0gdGhpcy5fY3VycmVudFNuYXBzaG90Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBvbGRTbmFwc2hvdC5wdXNoKHRoaXMuX2N1cnJlbnRTbmFwc2hvdFtpXSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2FjdGl2ZUNlbGxzKSB7XG4gICAgICBwZW5kaW5nUmVxdWVzdHMrKztcbiAgICAgIHZhciBjb29yZHMgPSB0aGlzLl9rZXlUb0NlbGxDb29yZHMoa2V5KTtcbiAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsQ29vcmRzVG9Cb3VuZHMoY29vcmRzKTtcbiAgICAgIHRoaXMuX3JlcXVlc3RGZWF0dXJlcyhib3VuZHMsIGtleSwgcmVxdWVzdENhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRXaGVyZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMud2hlcmU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRpbWUgUmFuZ2UgTWV0aG9kc1xuICAgKi9cblxuICBnZXRUaW1lUmFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gW3RoaXMub3B0aW9ucy5mcm9tLCB0aGlzLm9wdGlvbnMudG9dO1xuICB9LFxuXG4gIHNldFRpbWVSYW5nZTogZnVuY3Rpb24gKGZyb20sIHRvLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciBvbGRGcm9tID0gdGhpcy5vcHRpb25zLmZyb207XG4gICAgdmFyIG9sZFRvID0gdGhpcy5vcHRpb25zLnRvO1xuICAgIHZhciBwZW5kaW5nUmVxdWVzdHMgPSAwO1xuICAgIHZhciByZXF1ZXN0RXJyb3IgPSBudWxsO1xuICAgIHZhciByZXF1ZXN0Q2FsbGJhY2sgPSBVdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVxdWVzdEVycm9yID0gZXJyb3I7XG4gICAgICB9XG4gICAgICB0aGlzLl9maWx0ZXJFeGlzdGluZ0ZlYXR1cmVzKG9sZEZyb20sIG9sZFRvLCBmcm9tLCB0byk7XG5cbiAgICAgIHBlbmRpbmdSZXF1ZXN0cy0tO1xuXG4gICAgICBpZiAoY2FsbGJhY2sgJiYgcGVuZGluZ1JlcXVlc3RzIDw9IDApIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCByZXF1ZXN0RXJyb3IpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgdGhpcy5vcHRpb25zLmZyb20gPSBmcm9tO1xuICAgIHRoaXMub3B0aW9ucy50byA9IHRvO1xuXG4gICAgdGhpcy5fZmlsdGVyRXhpc3RpbmdGZWF0dXJlcyhvbGRGcm9tLCBvbGRUbywgZnJvbSwgdG8pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmlsdGVyTW9kZSA9PT0gJ3NlcnZlcicpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9hY3RpdmVDZWxscykge1xuICAgICAgICBwZW5kaW5nUmVxdWVzdHMrKztcbiAgICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuX2tleVRvQ2VsbENvb3JkcyhrZXkpO1xuICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3Jkcyk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RGZWF0dXJlcyhib3VuZHMsIGtleSwgcmVxdWVzdENhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2FjdGl2ZUNlbGxzKSB7XG4gICAgICB2YXIgY29vcmRzID0gdGhpcy5fa2V5VG9DZWxsQ29vcmRzKGtleSk7XG4gICAgICB2YXIgYm91bmRzID0gdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3Jkcyk7XG4gICAgICB0aGlzLl9yZXF1ZXN0RmVhdHVyZXMoYm91bmRzLCBrZXkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlZHJhdykge1xuICAgICAgdGhpcy5vbmNlKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgIHRoaXMuX3JlZHJhdyhsYXllci5mZWF0dXJlLmlkKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gIH0sXG5cbiAgX2ZpbHRlckV4aXN0aW5nRmVhdHVyZXM6IGZ1bmN0aW9uIChvbGRGcm9tLCBvbGRUbywgbmV3RnJvbSwgbmV3VG8pIHtcbiAgICB2YXIgbGF5ZXJzVG9SZW1vdmUgPSAob2xkRnJvbSAmJiBvbGRUbykgPyB0aGlzLl9nZXRGZWF0dXJlc0luVGltZVJhbmdlKG9sZEZyb20sIG9sZFRvKSA6IHRoaXMuX2N1cnJlbnRTbmFwc2hvdDtcbiAgICB2YXIgbGF5ZXJzVG9BZGQgPSB0aGlzLl9nZXRGZWF0dXJlc0luVGltZVJhbmdlKG5ld0Zyb20sIG5ld1RvKTtcblxuICAgIGlmIChsYXllcnNUb0FkZC5pbmRleE9mKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxheWVyc1RvQWRkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzaG91bGRSZW1vdmVMYXllciA9IGxheWVyc1RvUmVtb3ZlLmluZGV4T2YobGF5ZXJzVG9BZGRbaV0pO1xuICAgICAgICBpZiAoc2hvdWxkUmVtb3ZlTGF5ZXIgPj0gMCkge1xuICAgICAgICAgIGxheWVyc1RvUmVtb3ZlLnNwbGljZShzaG91bGRSZW1vdmVMYXllciwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzY2hlZHVsZSBhZGRpbmcgZmVhdHVyZXMgdW50aWwgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXG4gICAgVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKFV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlbW92ZUxheWVycyhsYXllcnNUb1JlbW92ZSk7XG4gICAgICB0aGlzLmFkZExheWVycyhsYXllcnNUb0FkZCk7XG4gICAgfSwgdGhpcykpO1xuICB9LFxuXG4gIF9nZXRGZWF0dXJlc0luVGltZVJhbmdlOiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgIHZhciBpZHMgPSBbXTtcbiAgICB2YXIgc2VhcmNoO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnQgJiYgdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmQpIHtcbiAgICAgIHZhciBzdGFydFRpbWVzID0gdGhpcy5fc3RhcnRUaW1lSW5kZXguYmV0d2VlbihzdGFydCwgZW5kKTtcbiAgICAgIHZhciBlbmRUaW1lcyA9IHRoaXMuX2VuZFRpbWVJbmRleC5iZXR3ZWVuKHN0YXJ0LCBlbmQpO1xuICAgICAgc2VhcmNoID0gc3RhcnRUaW1lcy5jb25jYXQoZW5kVGltZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWFyY2ggPSB0aGlzLl90aW1lSW5kZXguYmV0d2VlbihzdGFydCwgZW5kKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gc2VhcmNoLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBpZHMucHVzaChzZWFyY2hbaV0uaWQpO1xuICAgIH1cblxuICAgIHJldHVybiBpZHM7XG4gIH0sXG5cbiAgX2J1aWxkVGltZUluZGV4ZXM6IGZ1bmN0aW9uIChnZW9qc29uKSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIGZlYXR1cmU7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnQgJiYgdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmQpIHtcbiAgICAgIHZhciBzdGFydFRpbWVFbnRyaWVzID0gW107XG4gICAgICB2YXIgZW5kVGltZUVudHJpZXMgPSBbXTtcbiAgICAgIGZvciAoaSA9IGdlb2pzb24ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgZmVhdHVyZSA9IGdlb2pzb25baV07XG4gICAgICAgIHN0YXJ0VGltZUVudHJpZXMucHVzaCh7XG4gICAgICAgICAgaWQ6IGZlYXR1cmUuaWQsXG4gICAgICAgICAgdmFsdWU6IG5ldyBEYXRlKGZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0XSlcbiAgICAgICAgfSk7XG4gICAgICAgIGVuZFRpbWVFbnRyaWVzLnB1c2goe1xuICAgICAgICAgIGlkOiBmZWF0dXJlLmlkLFxuICAgICAgICAgIHZhbHVlOiBuZXcgRGF0ZShmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmRdKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3N0YXJ0VGltZUluZGV4LmJ1bGtBZGQoc3RhcnRUaW1lRW50cmllcyk7XG4gICAgICB0aGlzLl9lbmRUaW1lSW5kZXguYnVsa0FkZChlbmRUaW1lRW50cmllcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0aW1lRW50cmllcyA9IFtdO1xuICAgICAgZm9yIChpID0gZ2VvanNvbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBmZWF0dXJlID0gZ2VvanNvbltpXTtcbiAgICAgICAgdGltZUVudHJpZXMucHVzaCh7XG4gICAgICAgICAgaWQ6IGZlYXR1cmUuaWQsXG4gICAgICAgICAgdmFsdWU6IG5ldyBEYXRlKGZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkXSlcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3RpbWVJbmRleC5idWxrQWRkKHRpbWVFbnRyaWVzKTtcbiAgICB9XG4gIH0sXG5cbiAgX2ZlYXR1cmVXaXRoaW5UaW1lUmFuZ2U6IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZnJvbSB8fCAhdGhpcy5vcHRpb25zLnRvKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgZnJvbSA9ICt0aGlzLm9wdGlvbnMuZnJvbS52YWx1ZU9mKCk7XG4gICAgdmFyIHRvID0gK3RoaXMub3B0aW9ucy50by52YWx1ZU9mKCk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy50aW1lRmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgZGF0ZSA9ICtmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnRpbWVGaWVsZF07XG4gICAgICByZXR1cm4gKGRhdGUgPj0gZnJvbSkgJiYgKGRhdGUgPD0gdG8pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0ICYmIHRoaXMub3B0aW9ucy50aW1lRmllbGQuZW5kKSB7XG4gICAgICB2YXIgc3RhcnREYXRlID0gK2ZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0XTtcbiAgICAgIHZhciBlbmREYXRlID0gK2ZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkLmVuZF07XG4gICAgICByZXR1cm4gKChzdGFydERhdGUgPj0gZnJvbSkgJiYgKHN0YXJ0RGF0ZSA8PSB0bykpIHx8ICgoZW5kRGF0ZSA+PSBmcm9tKSAmJiAoZW5kRGF0ZSA8PSB0bykpO1xuICAgIH1cbiAgfSxcblxuICBfdmlzaWJsZVpvb206IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBjaGVjayB0byBzZWUgd2hldGhlciB0aGUgY3VycmVudCB6b29tIGxldmVsIG9mIHRoZSBtYXAgaXMgd2l0aGluIHRoZSBvcHRpb25hbCBsaW1pdCBkZWZpbmVkIGZvciB0aGUgRmVhdHVyZUxheWVyXG4gICAgaWYgKCF0aGlzLl9tYXApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuICAgIGlmICh6b29tID4gdGhpcy5vcHRpb25zLm1heFpvb20gfHwgem9vbSA8IHRoaXMub3B0aW9ucy5taW5ab29tKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHsgcmV0dXJuIHRydWU7IH1cbiAgfSxcblxuICBfaGFuZGxlWm9vbUNoYW5nZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fdmlzaWJsZVpvb20oKSkge1xuICAgICAgdGhpcy5yZW1vdmVMYXllcnModGhpcy5fY3VycmVudFNuYXBzaG90KTtcbiAgICAgIHRoaXMuX2N1cnJlbnRTbmFwc2hvdCA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKlxuICAgICAgZm9yIGV2ZXJ5IGNlbGwgaW4gdGhpcy5fYWN0aXZlQ2VsbHNcbiAgICAgICAgMS4gR2V0IHRoZSBjYWNoZSBrZXkgZm9yIHRoZSBjb29yZHMgb2YgdGhlIGNlbGxcbiAgICAgICAgMi4gSWYgdGhpcy5fY2FjaGVba2V5XSBleGlzdHMgaXQgd2lsbCBiZSBhbiBhcnJheSBvZiBmZWF0dXJlIElEcy5cbiAgICAgICAgMy4gQ2FsbCB0aGlzLmFkZExheWVycyh0aGlzLl9jYWNoZVtrZXldKSB0byBpbnN0cnVjdCB0aGUgZmVhdHVyZSBsYXllciB0byBhZGQgdGhlIGxheWVycyBiYWNrLlxuICAgICAgKi9cbiAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5fYWN0aXZlQ2VsbHMpIHtcbiAgICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuX2FjdGl2ZUNlbGxzW2ldLmNvb3JkcztcbiAgICAgICAgdmFyIGtleSA9IHRoaXMuX2NhY2hlS2V5KGNvb3Jkcyk7XG4gICAgICAgIGlmICh0aGlzLl9jYWNoZVtrZXldKSB7XG4gICAgICAgICAgdGhpcy5hZGRMYXllcnModGhpcy5fY2FjaGVba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNlcnZpY2UgTWV0aG9kc1xuICAgKi9cblxuICBhdXRoZW50aWNhdGU6IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRoaXMuc2VydmljZS5hdXRoZW50aWNhdGUodG9rZW4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UubWV0YWRhdGEoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5xdWVyeSgpO1xuICB9LFxuXG4gIF9nZXRNZXRhZGF0YTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMuX21ldGFkYXRhKSB7XG4gICAgICB2YXIgZXJyb3I7XG4gICAgICBjYWxsYmFjayhlcnJvciwgdGhpcy5fbWV0YWRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1ldGFkYXRhKFV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhID0gcmVzcG9uc2U7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCB0aGlzLl9tZXRhZGF0YSk7XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfVxuICB9LFxuXG4gIGFkZEZlYXR1cmU6IGZ1bmN0aW9uIChmZWF0dXJlLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuX2dldE1ldGFkYXRhKFV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIG1ldGFkYXRhKSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7IGNhbGxiYWNrLmNhbGwodGhpcywgZXJyb3IsIG51bGwpOyB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXJ2aWNlLmFkZEZlYXR1cmUoZmVhdHVyZSwgVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgIC8vIGFzc2lnbiBJRCBmcm9tIHJlc3VsdCB0byBhcHByb3ByaWF0ZSBvYmplY3RpZCBmaWVsZCBmcm9tIHNlcnZpY2UgbWV0YWRhdGFcbiAgICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXNbbWV0YWRhdGEub2JqZWN0SWRGaWVsZF0gPSByZXNwb25zZS5vYmplY3RJZDtcblxuICAgICAgICAgIC8vIHdlIGFsc28gbmVlZCB0byB1cGRhdGUgdGhlIGdlb2pzb24gaWQgZm9yIGNyZWF0ZUxheWVycygpIHRvIGZ1bmN0aW9uXG4gICAgICAgICAgZmVhdHVyZS5pZCA9IHJlc3BvbnNlLm9iamVjdElkO1xuICAgICAgICAgIHRoaXMuY3JlYXRlTGF5ZXJzKFtmZWF0dXJlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKTtcbiAgICB9LCB0aGlzKSk7XG4gIH0sXG5cbiAgdXBkYXRlRmVhdHVyZTogZnVuY3Rpb24gKGZlYXR1cmUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5zZXJ2aWNlLnVwZGF0ZUZlYXR1cmUoZmVhdHVyZSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICB0aGlzLnJlbW92ZUxheWVycyhbZmVhdHVyZS5pZF0sIHRydWUpO1xuICAgICAgICB0aGlzLmNyZWF0ZUxheWVycyhbZmVhdHVyZV0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIGRlbGV0ZUZlYXR1cmU6IGZ1bmN0aW9uIChpZCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UuZGVsZXRlRmVhdHVyZShpZCwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5vYmplY3RJZCkge1xuICAgICAgICB0aGlzLnJlbW92ZUxheWVycyhbcmVzcG9uc2Uub2JqZWN0SWRdLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgZGVsZXRlRmVhdHVyZXM6IGZ1bmN0aW9uIChpZHMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5kZWxldGVGZWF0dXJlcyhpZHMsIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGlmICghZXJyb3IgJiYgcmVzcG9uc2UubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3BvbnNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMYXllcnMoW3Jlc3BvbnNlW2ldLm9iamVjdElkXSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgUGF0aCwgVXRpbCwgR2VvSlNPTiwgbGF0TG5nIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBGZWF0dXJlTWFuYWdlciB9IGZyb20gJy4vRmVhdHVyZU1hbmFnZXInO1xuXG5leHBvcnQgdmFyIEZlYXR1cmVMYXllciA9IEZlYXR1cmVNYW5hZ2VyLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIGNhY2hlTGF5ZXJzOiB0cnVlXG4gIH0sXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqL1xuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIEZlYXR1cmVNYW5hZ2VyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fb3JpZ2luYWxTdHlsZSA9IHRoaXMub3B0aW9ucy5zdHlsZTtcbiAgICB0aGlzLl9sYXllcnMgPSB7fTtcbiAgfSxcblxuICAvKipcbiAgICogTGF5ZXIgSW50ZXJmYWNlXG4gICAqL1xuXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgIG1hcC5yZW1vdmVMYXllcih0aGlzLl9sYXllcnNbaV0pO1xuICAgICAgLy8gdHJpZ2dlciB0aGUgZXZlbnQgd2hlbiB0aGUgZW50aXJlIGZlYXR1cmVMYXllciBpcyByZW1vdmVkIGZyb20gdGhlIG1hcFxuICAgICAgdGhpcy5maXJlKCdyZW1vdmVmZWF0dXJlJywge1xuICAgICAgICBmZWF0dXJlOiB0aGlzLl9sYXllcnNbaV0uZmVhdHVyZSxcbiAgICAgICAgcGVybWFuZW50OiBmYWxzZVxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEZlYXR1cmVNYW5hZ2VyLnByb3RvdHlwZS5vblJlbW92ZS5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG5cbiAgY3JlYXRlTmV3TGF5ZXI6IGZ1bmN0aW9uIChnZW9qc29uKSB7XG4gICAgdmFyIGxheWVyID0gR2VvSlNPTi5nZW9tZXRyeVRvTGF5ZXIoZ2VvanNvbiwgdGhpcy5vcHRpb25zKTtcbiAgICBsYXllci5kZWZhdWx0T3B0aW9ucyA9IGxheWVyLm9wdGlvbnM7XG4gICAgcmV0dXJuIGxheWVyO1xuICB9LFxuXG4gIF91cGRhdGVMYXllcjogZnVuY3Rpb24gKGxheWVyLCBnZW9qc29uKSB7XG4gICAgLy8gY29udmVydCB0aGUgZ2VvanNvbiBjb29yZGluYXRlcyBpbnRvIGEgTGVhZmxldCBMYXRMbmcgYXJyYXkvbmVzdGVkIGFycmF5c1xuICAgIC8vIHBhc3MgaXQgdG8gc2V0TGF0TG5ncyB0byB1cGRhdGUgbGF5ZXIgZ2VvbWV0cmllc1xuICAgIHZhciBsYXRsbmdzID0gW107XG4gICAgdmFyIGNvb3Jkc1RvTGF0TG5nID0gdGhpcy5vcHRpb25zLmNvb3Jkc1RvTGF0TG5nIHx8IEdlb0pTT04uY29vcmRzVG9MYXRMbmc7XG5cbiAgICAvLyBjb3B5IG5ldyBhdHRyaWJ1dGVzLCBpZiBwcmVzZW50XG4gICAgaWYgKGdlb2pzb24ucHJvcGVydGllcykge1xuICAgICAgbGF5ZXIuZmVhdHVyZS5wcm9wZXJ0aWVzID0gZ2VvanNvbi5wcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZ2VvanNvbi5nZW9tZXRyeS50eXBlKSB7XG4gICAgICBjYXNlICdQb2ludCc6XG4gICAgICAgIGxhdGxuZ3MgPSBHZW9KU09OLmNvb3Jkc1RvTGF0TG5nKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMpO1xuICAgICAgICBsYXllci5zZXRMYXRMbmcobGF0bG5ncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTGluZVN0cmluZyc6XG4gICAgICAgIGxhdGxuZ3MgPSBHZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCAwLCBjb29yZHNUb0xhdExuZyk7XG4gICAgICAgIGxheWVyLnNldExhdExuZ3MobGF0bG5ncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcbiAgICAgICAgbGF0bG5ncyA9IEdlb0pTT04uY29vcmRzVG9MYXRMbmdzKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIDEsIGNvb3Jkc1RvTGF0TG5nKTtcbiAgICAgICAgbGF5ZXIuc2V0TGF0TG5ncyhsYXRsbmdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQb2x5Z29uJzpcbiAgICAgICAgbGF0bG5ncyA9IEdlb0pTT04uY29vcmRzVG9MYXRMbmdzKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIDEsIGNvb3Jkc1RvTGF0TG5nKTtcbiAgICAgICAgbGF5ZXIuc2V0TGF0TG5ncyhsYXRsbmdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxuICAgICAgICBsYXRsbmdzID0gR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcywgMiwgY29vcmRzVG9MYXRMbmcpO1xuICAgICAgICBsYXllci5zZXRMYXRMbmdzKGxhdGxuZ3MpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZlYXR1cmUgTWFuYWdlbWVudCBNZXRob2RzXG4gICAqL1xuXG4gIGNyZWF0ZUxheWVyczogZnVuY3Rpb24gKGZlYXR1cmVzKSB7XG4gICAgZm9yICh2YXIgaSA9IGZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZ2VvanNvbiA9IGZlYXR1cmVzW2ldO1xuXG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbZ2VvanNvbi5pZF07XG4gICAgICB2YXIgbmV3TGF5ZXI7XG5cbiAgICAgIGlmICh0aGlzLl92aXNpYmxlWm9vbSgpICYmIGxheWVyICYmICF0aGlzLl9tYXAuaGFzTGF5ZXIobGF5ZXIpKSB7XG4gICAgICAgIHRoaXMuX21hcC5hZGRMYXllcihsYXllcik7XG4gICAgICAgIHRoaXMuZmlyZSgnYWRkZmVhdHVyZScsIHtcbiAgICAgICAgICBmZWF0dXJlOiBsYXllci5mZWF0dXJlXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgZ2VvbWV0cnkgaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAobGF5ZXIgJiYgdGhpcy5vcHRpb25zLnNpbXBsaWZ5RmFjdG9yID4gMCAmJiAobGF5ZXIuc2V0TGF0TG5ncyB8fCBsYXllci5zZXRMYXRMbmcpKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxheWVyKGxheWVyLCBnZW9qc29uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFsYXllcikge1xuICAgICAgICBuZXdMYXllciA9IHRoaXMuY3JlYXRlTmV3TGF5ZXIoZ2VvanNvbik7XG4gICAgICAgIG5ld0xheWVyLmZlYXR1cmUgPSBnZW9qc29uO1xuXG4gICAgICAgIC8vIGJ1YmJsZSBldmVudHMgZnJvbSBpbmRpdmlkdWFsIGxheWVycyB0byB0aGUgZmVhdHVyZSBsYXllclxuICAgICAgICBuZXdMYXllci5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm9uRWFjaEZlYXR1cmUpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMub25FYWNoRmVhdHVyZShuZXdMYXllci5mZWF0dXJlLCBuZXdMYXllcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWNoZSB0aGUgbGF5ZXJcbiAgICAgICAgdGhpcy5fbGF5ZXJzW25ld0xheWVyLmZlYXR1cmUuaWRdID0gbmV3TGF5ZXI7XG5cbiAgICAgICAgLy8gc3R5bGUgdGhlIGxheWVyXG4gICAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKG5ld0xheWVyLmZlYXR1cmUuaWQsIHRoaXMub3B0aW9ucy5zdHlsZSk7XG5cbiAgICAgICAgdGhpcy5maXJlKCdjcmVhdGVmZWF0dXJlJywge1xuICAgICAgICAgIGZlYXR1cmU6IG5ld0xheWVyLmZlYXR1cmVcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBsYXllciBpZiB0aGUgY3VycmVudCB6b29tIGxldmVsIGlzIGluc2lkZSB0aGUgcmFuZ2UgZGVmaW5lZCBmb3IgdGhlIGxheWVyLCBpdCBpcyB3aXRoaW4gdGhlIGN1cnJlbnQgdGltZSBib3VuZHMgb3Igb3VyIGxheWVyIGlzIG5vdCB0aW1lIGVuYWJsZWRcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGVab29tKCkgJiYgKCF0aGlzLm9wdGlvbnMudGltZUZpZWxkIHx8ICh0aGlzLm9wdGlvbnMudGltZUZpZWxkICYmIHRoaXMuX2ZlYXR1cmVXaXRoaW5UaW1lUmFuZ2UoZ2VvanNvbikpKSkge1xuICAgICAgICAgIHRoaXMuX21hcC5hZGRMYXllcihuZXdMYXllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgYWRkTGF5ZXJzOiBmdW5jdGlvbiAoaWRzKSB7XG4gICAgZm9yICh2YXIgaSA9IGlkcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkc1tpXV07XG4gICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgdGhpcy5fbWFwLmFkZExheWVyKGxheWVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgcmVtb3ZlTGF5ZXJzOiBmdW5jdGlvbiAoaWRzLCBwZXJtYW5lbnQpIHtcbiAgICBmb3IgKHZhciBpID0gaWRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgaWQgPSBpZHNbaV07XG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgIHRoaXMuZmlyZSgncmVtb3ZlZmVhdHVyZScsIHtcbiAgICAgICAgICBmZWF0dXJlOiBsYXllci5mZWF0dXJlLFxuICAgICAgICAgIHBlcm1hbmVudDogcGVybWFuZW50XG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIobGF5ZXIpO1xuICAgICAgfVxuICAgICAgaWYgKGxheWVyICYmIHBlcm1hbmVudCkge1xuICAgICAgICBkZWxldGUgdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgY2VsbEVudGVyOiBmdW5jdGlvbiAoYm91bmRzLCBjb29yZHMpIHtcbiAgICBpZiAodGhpcy5fdmlzaWJsZVpvb20oKSAmJiAhdGhpcy5fem9vbWluZyAmJiB0aGlzLl9tYXApIHtcbiAgICAgIFV0aWwucmVxdWVzdEFuaW1GcmFtZShVdGlsLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2FjaGVLZXkgPSB0aGlzLl9jYWNoZUtleShjb29yZHMpO1xuICAgICAgICB2YXIgY2VsbEtleSA9IHRoaXMuX2NlbGxDb29yZHNUb0tleShjb29yZHMpO1xuICAgICAgICB2YXIgbGF5ZXJzID0gdGhpcy5fY2FjaGVbY2FjaGVLZXldO1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlQ2VsbHNbY2VsbEtleV0gJiYgbGF5ZXJzKSB7XG4gICAgICAgICAgdGhpcy5hZGRMYXllcnMobGF5ZXJzKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcykpO1xuICAgIH1cbiAgfSxcblxuICBjZWxsTGVhdmU6IGZ1bmN0aW9uIChib3VuZHMsIGNvb3Jkcykge1xuICAgIGlmICghdGhpcy5fem9vbWluZykge1xuICAgICAgVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKFV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSB0aGlzLl9jYWNoZUtleShjb29yZHMpO1xuICAgICAgICAgIHZhciBjZWxsS2V5ID0gdGhpcy5fY2VsbENvb3Jkc1RvS2V5KGNvb3Jkcyk7XG4gICAgICAgICAgdmFyIGxheWVycyA9IHRoaXMuX2NhY2hlW2NhY2hlS2V5XTtcbiAgICAgICAgICB2YXIgbWFwQm91bmRzID0gdGhpcy5fbWFwLmdldEJvdW5kcygpO1xuICAgICAgICAgIGlmICghdGhpcy5fYWN0aXZlQ2VsbHNbY2VsbEtleV0gJiYgbGF5ZXJzKSB7XG4gICAgICAgICAgICB2YXIgcmVtb3ZhYmxlID0gdHJ1ZTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2xheWVyc1tpXV07XG4gICAgICAgICAgICAgIGlmIChsYXllciAmJiBsYXllci5nZXRCb3VuZHMgJiYgbWFwQm91bmRzLmludGVyc2VjdHMobGF5ZXIuZ2V0Qm91bmRzKCkpKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlbW92YWJsZSkge1xuICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxheWVycyhsYXllcnMsICF0aGlzLm9wdGlvbnMuY2FjaGVMYXllcnMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5jYWNoZUxheWVycyAmJiByZW1vdmFibGUpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhY2hlW2NhY2hlS2V5XTtcbiAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NlbGxzW2NlbGxLZXldO1xuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fYWN0aXZlQ2VsbHNbY2VsbEtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBTdHlsaW5nIE1ldGhvZHNcbiAgICovXG5cbiAgcmVzZXRTdHlsZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3B0aW9ucy5zdHlsZSA9IHRoaXMuX29yaWdpbmFsU3R5bGU7XG4gICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgIHRoaXMucmVzZXRGZWF0dXJlU3R5bGUobGF5ZXIuZmVhdHVyZS5pZCk7XG4gICAgfSwgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2V0U3R5bGU6IGZ1bmN0aW9uIChzdHlsZSkge1xuICAgIHRoaXMub3B0aW9ucy5zdHlsZSA9IHN0eWxlO1xuICAgIHRoaXMuZWFjaEZlYXR1cmUoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICB0aGlzLnNldEZlYXR1cmVTdHlsZShsYXllci5mZWF0dXJlLmlkLCBzdHlsZSk7XG4gICAgfSwgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcmVzZXRGZWF0dXJlU3R5bGU6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgdmFyIHN0eWxlID0gdGhpcy5fb3JpZ2luYWxTdHlsZSB8fCBQYXRoLnByb3RvdHlwZS5vcHRpb25zO1xuICAgIGlmIChsYXllcikge1xuICAgICAgVXRpbC5leHRlbmQobGF5ZXIub3B0aW9ucywgbGF5ZXIuZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgdGhpcy5zZXRGZWF0dXJlU3R5bGUoaWQsIHN0eWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2V0RmVhdHVyZVN0eWxlOiBmdW5jdGlvbiAoaWQsIHN0eWxlKSB7XG4gICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICBpZiAodHlwZW9mIHN0eWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzdHlsZSA9IHN0eWxlKGxheWVyLmZlYXR1cmUpO1xuICAgIH1cbiAgICBpZiAobGF5ZXIuc2V0U3R5bGUpIHtcbiAgICAgIGxheWVyLnNldFN0eWxlKHN0eWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgTWV0aG9kc1xuICAgKi9cblxuICBlYWNoQWN0aXZlRmVhdHVyZTogZnVuY3Rpb24gKGZuLCBjb250ZXh0KSB7XG4gICAgLy8gZmlndXJlIG91dCAocm91Z2hseSkgd2hpY2ggbGF5ZXJzIGFyZSBpbiB2aWV3XG4gICAgaWYgKHRoaXMuX21hcCkge1xuICAgICAgdmFyIGFjdGl2ZUJvdW5kcyA9IHRoaXMuX21hcC5nZXRCb3VuZHMoKTtcbiAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U25hcHNob3QuaW5kZXhPZih0aGlzLl9sYXllcnNbaV0uZmVhdHVyZS5pZCkgIT09IC0xKSB7XG4gICAgICAgICAgLy8gYSBzaW1wbGUgcG9pbnQgaW4gcG9seSB0ZXN0IGZvciBwb2ludCBnZW9tZXRyaWVzXG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9sYXllcnNbaV0uZ2V0TGF0TG5nID09PSAnZnVuY3Rpb24nICYmIGFjdGl2ZUJvdW5kcy5jb250YWlucyh0aGlzLl9sYXllcnNbaV0uZ2V0TGF0TG5nKCkpKSB7XG4gICAgICAgICAgICBmbi5jYWxsKGNvbnRleHQsIHRoaXMuX2xheWVyc1tpXSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5fbGF5ZXJzW2ldLmdldEJvdW5kcyA9PT0gJ2Z1bmN0aW9uJyAmJiBhY3RpdmVCb3VuZHMuaW50ZXJzZWN0cyh0aGlzLl9sYXllcnNbaV0uZ2V0Qm91bmRzKCkpKSB7XG4gICAgICAgICAgICAvLyBpbnRlcnNlY3RpbmcgYm91bmRzIGNoZWNrIGZvciBwb2x5bGluZSBhbmQgcG9seWdvbiBnZW9tZXRyaWVzXG4gICAgICAgICAgICBmbi5jYWxsKGNvbnRleHQsIHRoaXMuX2xheWVyc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGVhY2hGZWF0dXJlOiBmdW5jdGlvbiAoZm4sIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX2xheWVycykge1xuICAgICAgZm4uY2FsbChjb250ZXh0LCB0aGlzLl9sYXllcnNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRGZWF0dXJlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgfSxcblxuICBicmluZ1RvQmFjazogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZWFjaEZlYXR1cmUoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICBpZiAobGF5ZXIuYnJpbmdUb0JhY2spIHtcbiAgICAgICAgbGF5ZXIuYnJpbmdUb0JhY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBicmluZ1RvRnJvbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgaWYgKGxheWVyLmJyaW5nVG9Gcm9udCkge1xuICAgICAgICBsYXllci5icmluZ1RvRnJvbnQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICByZWRyYXc6IGZ1bmN0aW9uIChpZCkge1xuICAgIGlmIChpZCkge1xuICAgICAgdGhpcy5fcmVkcmF3KGlkKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3JlZHJhdzogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICB2YXIgZ2VvanNvbiA9IGxheWVyLmZlYXR1cmU7XG5cbiAgICAvLyBpZiB0aGlzIGxvb2tzIGxpa2UgYSBtYXJrZXJcbiAgICBpZiAobGF5ZXIgJiYgbGF5ZXIuc2V0SWNvbiAmJiB0aGlzLm9wdGlvbnMucG9pbnRUb0xheWVyKSB7XG4gICAgICAvLyB1cGRhdGUgY3VzdG9tIHN5bWJvbG9neSwgaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnBvaW50VG9MYXllcikge1xuICAgICAgICB2YXIgZ2V0SWNvbiA9IHRoaXMub3B0aW9ucy5wb2ludFRvTGF5ZXIoZ2VvanNvbiwgbGF0TG5nKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV0sIGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF0pKTtcbiAgICAgICAgdmFyIHVwZGF0ZWRJY29uID0gZ2V0SWNvbi5vcHRpb25zLmljb247XG4gICAgICAgIGxheWVyLnNldEljb24odXBkYXRlZEljb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGxvb2tzIGxpa2UgYSB2ZWN0b3IgbWFya2VyIChjaXJjbGVNYXJrZXIpXG4gICAgaWYgKGxheWVyICYmIGxheWVyLnNldFN0eWxlICYmIHRoaXMub3B0aW9ucy5wb2ludFRvTGF5ZXIpIHtcbiAgICAgIHZhciBnZXRTdHlsZSA9IHRoaXMub3B0aW9ucy5wb2ludFRvTGF5ZXIoZ2VvanNvbiwgbGF0TG5nKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV0sIGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF0pKTtcbiAgICAgIHZhciB1cGRhdGVkU3R5bGUgPSBnZXRTdHlsZS5vcHRpb25zO1xuICAgICAgdGhpcy5zZXRGZWF0dXJlU3R5bGUoZ2VvanNvbi5pZCwgdXBkYXRlZFN0eWxlKTtcbiAgICB9XG5cbiAgICAvLyBsb29rcyBsaWtlIGEgcGF0aCAocG9seWdvbi9wb2x5bGluZSlcbiAgICBpZiAobGF5ZXIgJiYgbGF5ZXIuc2V0U3R5bGUgJiYgdGhpcy5vcHRpb25zLnN0eWxlKSB7XG4gICAgICB0aGlzLnJlc2V0U3R5bGUoZ2VvanNvbi5pZCk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVMYXllciAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEZlYXR1cmVMYXllcihvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmVhdHVyZUxheWVyO1xuIl0sIm5hbWVzIjpbIlV0aWwiLCJEb21VdGlsIiwiYXJjZ2lzVG9HZW9KU09OIiwiZ2VvanNvblRvQXJjR0lTIiwiZzJhIiwiYTJnIiwibGF0TG5nIiwibGF0TG5nQm91bmRzIiwiTGF0TG5nQm91bmRzIiwiTGF0TG5nIiwiR2VvSlNPTiIsIkNsYXNzIiwicG9pbnQiLCJFdmVudGVkIiwiVGlsZUxheWVyIiwiRG9tRXZlbnQiLCJDUlMiLCJJbWFnZU92ZXJsYXkiLCJMYXllciIsInBvcHVwIiwiYm91bmRzIiwic2V0T3B0aW9ucyIsIlBhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0NDQU8sSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksaUJBQWlCLElBQUksSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hHLENBQU8sSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsYUFBYSxLQUFLLEVBQUUsQ0FBQzs7QUFFL0UsQ0FBTyxJQUFJLE9BQU8sR0FBRztBQUNyQixDQUFBLEVBQUUsSUFBSSxFQUFFLElBQUk7QUFDWixDQUFBLEVBQUUsYUFBYSxFQUFFLGFBQWE7QUFDOUIsQ0FBQSxDQUFDLENBQUM7O0NDTkssSUFBSSxPQUFPLEdBQUc7QUFDckIsQ0FBQSxFQUFFLHNCQUFzQixFQUFFLEVBQUU7QUFDNUIsQ0FBQSxDQUFDLENBQUM7O0NDRUYsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDOztBQUVsQixDQUFBLFNBQVMsU0FBUyxFQUFFLE1BQU0sRUFBRTtBQUM1QixDQUFBLEVBQUUsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOztB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RUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RGLENBQUEsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVyRixDQUFBLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO0FBQ2hCLENBQUEsSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLENBQUEsSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDOztBQUV0QixDQUFBLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO0FBQ2xELENBQUEsTUFBTSxPQUFPLElBQUksQ0FBQztBQUNsQixDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQSxDQUFDOztBQUVE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QUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdELENBQUEsTUFBTSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzVDLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO0FBQ3BFLENBQUEsTUFBTSxJQUFJLFNBQVMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEUsQ0FBQSxNQUFNLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwRSxDQUFBLE1BQU0sT0FBTyxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xHLENBQUEsS0FBSztBQUNMLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsWUFBWSxFQUFFLFlBQVk7QUFDNUIsQ0FBQTtBQUNBLENBQUEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtBQUNwQixDQUFBLE1BQU0sT0FBTyxLQUFLLENBQUM7QUFDbkIsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDbkMsQ0FBQSxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFP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QyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxVQUFVLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDbkUsQ0FBQSxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDbEIsQ0FBQSxRQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUMsQ0FBQSxRQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLENBQUEsT0FBTzs7QUFFUCxDQUFBLE1BQU0sSUFBSSxRQUFRLEVBQUU7QUFDcEIsQ0FBQSxRQUFRLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNoRCxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNiLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDbEQsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxVQUFVLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDOUQsQ0FBQSxNQUFNLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTtBQUN2QyxDQUFBLFFBQVEsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNyRCxDQUFBLE9BQU87QUFDUCxDQUFBLE1BQU0sSUFBSSxRQUFRLEVBQUU7QUFDcEIsQ0FBQSxRQUFRLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNoRCxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNiLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsY0FB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