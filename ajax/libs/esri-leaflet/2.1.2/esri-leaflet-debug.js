/* esri-leaflet - v2.1.2 - Thu Jan 04 2018 16:42:08 GMT-0800 (PST)
 * Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}),global.L));
}(this, function (exports,L$1) { 'use strict';

	var L$1__default = 'default' in L$1 ? L$1['default'] : L$1;

	var version = "2.1.2";

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
	    httpRequest.onreadystatechange = L$1.Util.falseFn;

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

	      httpRequest.onerror = L$1.Util.falseFn;

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

	  var script = L$1.DomUtil.create('script', null, document.body);
	  script.type = 'text/javascript';
	  script.src = url + '?' + serialize(params);
	  script.id = callbackId;
	  L$1.DomUtil.addClass(script, 'esri-leaflet-jsonp');

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
	    var sw = L$1.latLng(extent.ymin, extent.xmin);
	    var ne = L$1.latLng(extent.ymax, extent.xmax);
	    return L$1.latLngBounds(sw, ne);
	  } else {
	    return null;
	  }
	}

	// convert an LatLngBounds (Leaflet) to extent (ArcGIS)
	function boundsToExtent (bounds) {
	  bounds = L$1.latLngBounds(bounds);
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
	  url = L$1.Util.trim(url);

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
	    L$1.DomUtil.addClass(map.attributionControl._container, 'esri-truncated-attribution:hover');

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
	    L$1.DomUtil.addClass(map.attributionControl._container, 'esri-truncated-attribution');

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
	  if (geometry instanceof L$1.LatLngBounds) {
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
	  if (geometry instanceof L$1.LatLng) {
	    geometry = {
	      type: 'Point',
	      coordinates: [geometry.lng, geometry.lat]
	    };
	  }

	  // handle L.GeoJSON, pull out the first geometry
	  if (geometry instanceof L$1.GeoJSON) {
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
	  jsonp(url, {}, L$1.Util.bind(function (error, attributions) {
	    if (error) { return; }
	    map._esriAttributions = [];
	    for (var c = 0; c < attributions.contributors.length; c++) {
	      var contributor = attributions.contributors[c];

	      for (var i = 0; i < contributor.coverageAreas.length; i++) {
	        var coverageArea = contributor.coverageAreas[i];
	        var southWest = L$1.latLng(coverageArea.bbox[0], coverageArea.bbox[1]);
	        var northEast = L$1.latLng(coverageArea.bbox[2], coverageArea.bbox[3]);
	        map._esriAttributions.push({
	          attribution: contributor.attribution,
	          score: coverageArea.score,
	          bounds: L$1.latLngBounds(southWest, northEast),
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
	    var wrappedBounds = L$1.latLngBounds(
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

	var Task = L$1.Class.extend({

	  options: {
	    proxy: false,
	    useCors: cors
	  },

	  // Generate a method for each methodName:paramName in the setters for this task.
	  generateSetter: function (param, context) {
	    return L$1.Util.bind(function (value) {
	      this.params[param] = value;
	      return this;
	    }, context);
	  },

	  initialize: function (endpoint) {
	    // endpoint can be either a url (and options) for an ArcGIS Rest Service or an instance of EsriLeaflet.Service
	    if (endpoint.request && endpoint.options) {
	      this._service = endpoint;
	      L$1.Util.setOptions(this, endpoint.options);
	    } else {
	      L$1.Util.setOptions(this, endpoint);
	      this.options.url = cleanUrl(endpoint.url);
	    }

	    // clone default params into this object
	    this.params = L$1.Util.extend({}, this.params || {});

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
	      L.extend(this.params, this.options.requestParams);
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
	    latlng = L$1.latLng(latlng);
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
	    var castPoint = L$1.point(rawPoint);
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
	      geometry = L$1.latLng(geometry);
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
	    latlng = L$1.latLng(latlng);
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

	var Service = L$1.Evented.extend({

	  options: {
	    proxy: false,
	    useCors: cors,
	    timeout: 0
	  },

	  initialize: function (options) {
	    options = options || {};
	    this._requestQueue = [];
	    this._authenticating = false;
	    L$1.Util.setOptions(this, options);
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
	      L.extend(params, this.options.requestParams);
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
	    return L$1.Util.bind(function (error, response) {
	      if (error && (error.code === 499 || error.code === 498)) {
	        this._authenticating = true;

	        this._requestQueue.push([method, path, params, callback, context]);

	        // fire an event for users to handle and re-authenticate
	        this.fire('authenticationrequired', {
	          authenticate: L$1.Util.bind(this.authenticate, this)
	        }, true);

	        // if the user has access to a callback they can handle the auth error
	        error.authenticate = L$1.Util.bind(this.authenticate, this);
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

	var BasemapLayer = L$1.TileLayer.extend({
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
	          attribution: 'DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community'
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
	      throw new Error('L.esri.BasemapLayer: Invalid parameter. Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ShadedRelief", "ShadedReliefLabels", "Terrain", "TerrainLabels" or "USATopo"');
	    }

	    // merge passed options into the config options
	    var tileOptions = L$1.Util.extend(config.options, options);

	    L$1.Util.setOptions(this, tileOptions);

	    if (this.options.token) {
	      config.urlTemplate += ('?token=' + this.options.token);
	    }

	    // call the initialize method on L.TileLayer to set everything up
	    L$1.TileLayer.prototype.initialize.call(this, config.urlTemplate, tileOptions);
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

	    L$1.TileLayer.prototype.onAdd.call(this, map);
	  },

	  onRemove: function (map) {
	    map.off('moveend', _updateMapAttribution);
	    L$1.TileLayer.prototype.onRemove.call(this, map);
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

	var TiledMapLayer = L$1.TileLayer.extend({
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
	    options = L$1.Util.setOptions(this, options);

	    // set the urls
	    options = getUrlParams(options);
	    this.tileUrl = options.url + 'tile/{z}/{y}/{x}' + (options.requestParams && Object.keys(options.requestParams).length > 0 ? L$1.Util.getParamString(options.requestParams) : '');
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
	    L$1.TileLayer.prototype.initialize.call(this, this.tileUrl, options);
	  },

	  getTileUrl: function (tilePoint) {
	    var zoom = this._getZoomForUrl();

	    return L$1.Util.template(this.tileUrl, L$1.Util.extend({
	      s: this._getSubdomain(tilePoint),
	      x: tilePoint.x,
	      y: tilePoint.y,
	      // try lod map first, then just default to zoom level
	      z: (this._lodMap && this._lodMap[zoom]) ? this._lodMap[zoom] : zoom
	    }, this.options));
	  },

	  createTile: function (coords, done) {
	    var tile = document.createElement('img');

	    L.DomEvent.on(tile, 'load', L.bind(this._tileOnLoad, this, done, tile));
	    L.DomEvent.on(tile, 'error', L.bind(this._tileOnError, this, done, tile));

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
	          if (map.options.crs === L.CRS.EPSG3857 && (sr === 102100 || sr === 3857)) {
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
	            if (!proj4) {
	              warn('L.esri.TiledMapLayer is using a non-mercator spatial reference. Support may be available through Proj4Leaflet http://esri.github.io/esri-leaflet/examples/non-mercator-projection.html');
	            }
	          }
	        }
	      }, this);
	    }

	    L$1.TileLayer.prototype.onAdd.call(this, map);
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

	var Overlay = L$1.ImageOverlay.extend({
	  onAdd: function (map) {
	    this._topLeft = map.getPixelBounds().min;
	    L$1.ImageOverlay.prototype.onAdd.call(this, map);
	  },
	  _reset: function () {
	    if (this._map.options.crs === L$1.CRS.EPSG3857) {
	      L$1.ImageOverlay.prototype._reset.call(this);
	    } else {
	      L$1.DomUtil.setPosition(this._image, this._topLeft.subtract(this._map.getPixelOrigin()));
	    }
	  }
	});

	var RasterLayer = L$1.Layer.extend({
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

	    this._update = L$1.Util.throttle(this._update, this.options.updateInterval, this);

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
	    this._popup = L$1.popup(popupOptions);
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
	    L.extend(params, this.options.requestParams);

	    if (params) {
	      this._requestExport(params, bounds);
	    } else if (this._currentImage) {
	      this._currentImage._map.removeLayer(this._currentImage);
	      this._currentImage = null;
	    }
	  },

	  _renderPopup: function (latlng, error, results, response) {
	    latlng = L$1.latLng(latlng);
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
	    var boundsProjected = L$1.bounds(neProjected, swProjected);

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

	    L$1.Util.setOptions(this, options);
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
	    if (L$1.Util.isArray(bandIds)) {
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
	    if (L$1.Util.isArray(noData)) {
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
	    var callback = L$1.Util.bind(function (error, results, response) {
	      if (error) { return; } // we really can't do anything here but authenticate or requesterror will fire
	      setTimeout(L$1.Util.bind(function () {
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
	      this._renderImage(this.options.url + 'exportImage' + L$1.Util.getParamString(params), bounds);
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

	    L$1.Util.setOptions(this, options);
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
	    var callback = L$1.Util.bind(function (error, featureCollection, response) {
	      if (error) { return; } // we really can't do anything here but authenticate or requesterror will fire
	      setTimeout(L$1.Util.bind(function () {
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
	      this._renderImage(this.options.url + 'export' + L$1.Util.getParamString(params), bounds);
	    }
	  }
	});

	function dynamicMapLayer (url, options) {
	  return new DynamicMapLayer(url, options);
	}

	var VirtualGrid = L$1__default.Layer.extend({

	  options: {
	    cellSize: 512,
	    updateInterval: 150
	  },

	  initialize: function (options) {
	    options = L$1__default.setOptions(this, options);
	    this._zooming = false;
	  },

	  onAdd: function (map) {
	    this._map = map;
	    this._update = L$1__default.Util.throttle(this._update, this.options.updateInterval, this);
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

	    var bounds = this._map.getPixelBounds();
	    var cellSize = this._getCellSize();

	    // cell coordinates range for the current view
	    var cellBounds = L$1__default.bounds(
	      bounds.min.divideBy(cellSize).floor(),
	      bounds.max.divideBy(cellSize).floor());

	    this._removeOtherCells(cellBounds);
	    this._addCells(cellBounds);

	    this.fire('cellsupdated');
	  },

	  _addCells: function (bounds) {
	    var queue = [];
	    var center = bounds.getCenter();
	    var zoom = this._map.getZoom();

	    var j, i, coords;
	    // create a queue of coordinates to load cells from
	    for (j = bounds.min.y; j <= bounds.max.y; j++) {
	      for (i = bounds.min.x; i <= bounds.max.x; i++) {
	        coords = L$1__default.point(i, j);
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
	    return L$1__default.latLngBounds(this.options.bounds).intersects(cellBounds);
	  },

	  // converts cell coordinates to its geographical bounds
	  _cellCoordsToBounds: function (coords) {
	    var map = this._map;
	    var cellSize = this.options.cellSize;
	    var nwPoint = coords.multiplyBy(cellSize);
	    var sePoint = nwPoint.add([cellSize, cellSize]);
	    var nw = map.wrapLatLng(map.unproject(nwPoint, coords.z));
	    var se = map.wrapLatLng(map.unproject(sePoint, coords.z));

	    return L$1__default.latLngBounds(nw, se);
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

	    return L$1__default.point(x, y);
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
	    coords.x = this._wrapLng ? L$1__default.Util.wrapNum(coords.x, this._wrapLng) : coords.x;
	    coords.y = this._wrapLat ? L$1__default.Util.wrapNum(coords.y, this._wrapLat) : coords.y;
	  },

	  // get the global cell coordinates range for the current zoom
	  _getCellNumBounds: function () {
	    var bounds = this._map.getPixelWorldBounds();
	    var size = this._getCellSize();

	    return bounds ? L$1__default.bounds(
	        bounds.min.divideBy(size).floor(),
	        bounds.max.divideBy(size).ceil().subtract([1, 1])) : null;
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
	    options = L$1.Util.setOptions(this, options);

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
	        L$1.Util.requestAnimFrame(L$1.Util.bind(function () {
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
	      L.extend(query.params, this.options.requestParams);
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
	    var requestCallback = L$1.Util.bind(function (error, featureCollection) {
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
	        L$1.Util.requestAnimFrame(L$1.Util.bind(function () {
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
	    var requestCallback = L$1.Util.bind(function (error) {
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
	    L$1.Util.requestAnimFrame(L$1.Util.bind(function () {
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
	      this.metadata(L$1.Util.bind(function (error, response) {
	        this._metadata = response;
	        callback(error, this._metadata);
	      }, this));
	    }
	  },

	  addFeature: function (feature, callback, context) {
	    this._getMetadata(L$1.Util.bind(function (error, metadata) {
	      if (error) {
	        if (callback) { callback.call(this, error, null); }
	        return;
	      }

	      this.service.addFeature(feature, L$1.Util.bind(function (error, response) {
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
	    var layer = L$1.GeoJSON.geometryToLayer(geojson, this.options);
	    layer.defaultOptions = layer.options;
	    return layer;
	  },

	  _updateLayer: function (layer, geojson) {
	    // convert the geojson coordinates into a Leaflet LatLng array/nested arrays
	    // pass it to setLatLngs to update layer geometries
	    var latlngs = [];
	    var coordsToLatLng = this.options.coordsToLatLng || L$1.GeoJSON.coordsToLatLng;

	    // copy new attributes, if present
	    if (geojson.properties) {
	      layer.feature.properties = geojson.properties;
	    }

	    switch (geojson.geometry.type) {
	      case 'Point':
	        latlngs = L$1.GeoJSON.coordsToLatLng(geojson.geometry.coordinates);
	        layer.setLatLng(latlngs);
	        break;
	      case 'LineString':
	        latlngs = L$1.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 0, coordsToLatLng);
	        layer.setLatLngs(latlngs);
	        break;
	      case 'MultiLineString':
	        latlngs = L$1.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 1, coordsToLatLng);
	        layer.setLatLngs(latlngs);
	        break;
	      case 'Polygon':
	        latlngs = L$1.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 1, coordsToLatLng);
	        layer.setLatLngs(latlngs);
	        break;
	      case 'MultiPolygon':
	        latlngs = L$1.GeoJSON.coordsToLatLngs(geojson.geometry.coordinates, 2, coordsToLatLng);
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
	      L$1.Util.requestAnimFrame(L$1.Util.bind(function () {
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
	      L$1.Util.requestAnimFrame(L$1.Util.bind(function () {
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
	    var style = this._originalStyle || L.Path.prototype.options;
	    if (layer) {
	      L$1.Util.extend(layer.options, layer.defaultOptions);
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
	        var getIcon = this.options.pointToLayer(geojson, L$1.latLng(geojson.geometry.coordinates[1], geojson.geometry.coordinates[0]));
	        var updatedIcon = getIcon.options.icon;
	        layer.setIcon(updatedIcon);
	      }
	    }

	    // looks like a vector marker (circleMarker)
	    if (layer && layer.setStyle && this.options.pointToLayer) {
	      var getStyle = this.options.pointToLayer(geojson, L$1.latLng(geojson.geometry.coordinates[1], geojson.geometry.coordinates[0]));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvU3VwcG9ydC5qcyIsIi4uL3NyYy9PcHRpb25zLmpzIiwiLi4vc3JjL1JlcXVlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVzcmkvYXJjZ2lzLXRvLWdlb2pzb24tdXRpbHMvaW5kZXguanMiLCIuLi9zcmMvVXRpbC5qcyIsIi4uL3NyYy9UYXNrcy9UYXNrLmpzIiwiLi4vc3JjL1Rhc2tzL1F1ZXJ5LmpzIiwiLi4vc3JjL1Rhc2tzL0ZpbmQuanMiLCIuLi9zcmMvVGFza3MvSWRlbnRpZnkuanMiLCIuLi9zcmMvVGFza3MvSWRlbnRpZnlGZWF0dXJlcy5qcyIsIi4uL3NyYy9UYXNrcy9JZGVudGlmeUltYWdlLmpzIiwiLi4vc3JjL1NlcnZpY2VzL1NlcnZpY2UuanMiLCIuLi9zcmMvU2VydmljZXMvTWFwU2VydmljZS5qcyIsIi4uL3NyYy9TZXJ2aWNlcy9JbWFnZVNlcnZpY2UuanMiLCIuLi9zcmMvU2VydmljZXMvRmVhdHVyZUxheWVyU2VydmljZS5qcyIsIi4uL3NyYy9MYXllcnMvQmFzZW1hcExheWVyLmpzIiwiLi4vc3JjL0xheWVycy9UaWxlZE1hcExheWVyLmpzIiwiLi4vc3JjL0xheWVycy9SYXN0ZXJMYXllci5qcyIsIi4uL3NyYy9MYXllcnMvSW1hZ2VNYXBMYXllci5qcyIsIi4uL3NyYy9MYXllcnMvRHluYW1pY01hcExheWVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtdmlydHVhbC1ncmlkL3NyYy92aXJ0dWFsLWdyaWQuanMiLCIuLi9ub2RlX21vZHVsZXMvdGlueS1iaW5hcnktc2VhcmNoL2luZGV4LmpzIiwiLi4vc3JjL0xheWVycy9GZWF0dXJlTGF5ZXIvRmVhdHVyZU1hbmFnZXIuanMiLCIuLi9zcmMvTGF5ZXJzL0ZlYXR1cmVMYXllci9GZWF0dXJlTGF5ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXRcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkxlYWZsZXQgcGx1Z2lucyBmb3IgY29uc3VtaW5nIEFyY0dJUyBPbmxpbmUgYW5kIEFyY0dJUyBTZXJ2ZXIgc2VydmljZXMuXCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMS4yXCIsXG4gIFwiYXV0aG9yXCI6IFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gIFwiYnJvd3NlclwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWRlYnVnLmpzXCIsXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vZXNyaS9lc3JpLWxlYWZsZXQvaXNzdWVzXCJcbiAgfSxcbiAgXCJjb250cmlidXRvcnNcIjogW1xuICAgIFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gICAgXCJKb2huIEdyYXZvaXMgPGpncmF2b2lzQGVzcmkuY29tPiAoaHR0cDovL2pvaG5ncmF2b2lzLmNvbSlcIlxuICBdLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAZXNyaS9hcmNnaXMtdG8tZ2VvanNvbi11dGlsc1wiOiBcIl4xLjAuNVwiLFxuICAgIFwibGVhZmxldC12aXJ0dWFsLWdyaWRcIjogXCJeMS4wLjNcIixcbiAgICBcInRpbnktYmluYXJ5LXNlYXJjaFwiOiBcIl4xLjAuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCIzLjUuMFwiLFxuICAgIFwiZ2gtcmVsZWFzZVwiOiBcIl4yLjAuMFwiLFxuICAgIFwiaGlnaGxpZ2h0LmpzXCI6IFwiXjguMC4wXCIsXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4wLjEwLjBcIixcbiAgICBcImh1c2t5XCI6IFwiXjAuMTIuMFwiLFxuICAgIFwiaXNwYXJ0YVwiOiBcIl40LjAuMFwiLFxuICAgIFwiaXN0YW5idWxcIjogXCJeMC40LjJcIixcbiAgICBcImthcm1hXCI6IFwiXjEuNy4wXCIsXG4gICAgXCJrYXJtYS1jaGFpLXNpbm9uXCI6IFwiXjAuMS4zXCIsXG4gICAgXCJrYXJtYS1jaHJvbWUtbGF1bmNoZXJcIjogXCJeMi4yLjBcIixcbiAgICBcImthcm1hLWNvdmVyYWdlXCI6IFwiXjEuMS4xXCIsXG4gICAgXCJrYXJtYS1tb2NoYVwiOiBcIl4xLjMuMFwiLFxuICAgIFwia2FybWEtbW9jaGEtcmVwb3J0ZXJcIjogXCJeMi4yLjFcIixcbiAgICBcImthcm1hLXNvdXJjZW1hcC1sb2FkZXJcIjogXCJeMC4zLjVcIixcbiAgICBcIm1rZGlycFwiOiBcIl4wLjUuMVwiLFxuICAgIFwibW9jaGFcIjogXCJeMy40LjJcIixcbiAgICBcIm5wbS1ydW4tYWxsXCI6IFwiXjQuMC4yXCIsXG4gICAgXCJwaGFudG9tanNcIjogXCJeMS45LjhcIixcbiAgICBcInJvbGx1cFwiOiBcIl4wLjI1LjRcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tanNvblwiOiBcIl4yLjMuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1ub2RlLXJlc29sdmVcIjogXCJeMS40LjBcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tdWdsaWZ5XCI6IFwiXjAuMy4xXCIsXG4gICAgXCJzZW1pc3RhbmRhcmRcIjogXCJeOS4wLjBcIixcbiAgICBcInNpbm9uXCI6IFwiXjEuMTEuMVwiLFxuICAgIFwic2lub24tY2hhaVwiOiBcIjIuOC4wXCIsXG4gICAgXCJzbmF6enlcIjogXCJeNS4wLjBcIixcbiAgICBcInVnbGlmeS1qc1wiOiBcIl4yLjguMjlcIixcbiAgICBcIndhdGNoXCI6IFwiXjAuMTcuMVwiXG4gIH0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwOi8vZXNyaS5naXRodWIuaW8vZXNyaS1sZWFmbGV0XCIsXG4gIFwibW9kdWxlXCI6IFwic3JjL0VzcmlMZWFmbGV0LmpzXCIsXG4gIFwianNuZXh0Om1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXQuanNcIixcbiAgXCJqc3BtXCI6IHtcbiAgICBcInJlZ2lzdHJ5XCI6IFwibnBtXCIsXG4gICAgXCJmb3JtYXRcIjogXCJlczZcIixcbiAgICBcIm1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXQuanNcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcImFyY2dpc1wiLFxuICAgIFwiZXNyaVwiLFxuICAgIFwiZXNyaSBsZWFmbGV0XCIsXG4gICAgXCJnaXNcIixcbiAgICBcImxlYWZsZXQgcGx1Z2luXCIsXG4gICAgXCJtYXBwaW5nXCJcbiAgXSxcbiAgXCJsaWNlbnNlXCI6IFwiQXBhY2hlLTIuMFwiLFxuICBcIm1haW5cIjogXCJkaXN0L2VzcmktbGVhZmxldC1kZWJ1Zy5qc1wiLFxuICBcInBlZXJEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwibGVhZmxldFwiOiBcIl4xLjAuMFwiXG4gIH0sXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdEBnaXRodWIuY29tOkVzcmkvZXNyaS1sZWFmbGV0LmdpdFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJidWlsZFwiOiBcInJvbGx1cCAtYyBwcm9maWxlcy9kZWJ1Zy5qcyAmIHJvbGx1cCAtYyBwcm9maWxlcy9wcm9kdWN0aW9uLmpzXCIsXG4gICAgXCJsaW50XCI6IFwic2VtaXN0YW5kYXJkIHwgc25henp5XCIsXG4gICAgXCJwcmVidWlsZFwiOiBcIm1rZGlycCBkaXN0XCIsXG4gICAgXCJwcmVwdWJsaXNoXCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicHJldGVzdFwiOiBcIm5wbSBydW4gYnVpbGRcIixcbiAgICBcInByZWNvbW1pdFwiOiBcIm5wbSBydW4gbGludFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIi4vc2NyaXB0cy9yZWxlYXNlLnNoXCIsXG4gICAgXCJzdGFydC13YXRjaFwiOiBcIndhdGNoIFxcXCJucG0gcnVuIGJ1aWxkXFxcIiBzcmNcIixcbiAgICBcInN0YXJ0XCI6IFwicnVuLXAgc3RhcnQtd2F0Y2ggc2VydmVcIixcbiAgICBcInNlcnZlXCI6IFwiaHR0cC1zZXJ2ZXIgLXAgNTAwMCAtYy0xIC1vXCIsXG4gICAgXCJ0ZXN0XCI6IFwibnBtIHJ1biBsaW50ICYmIGthcm1hIHN0YXJ0XCJcbiAgfSxcbiAgXCJzZW1pc3RhbmRhcmRcIjoge1xuICAgIFwiZ2xvYmFsc1wiOiBbXG4gICAgICBcImV4cGVjdFwiLFxuICAgICAgXCJMXCIsXG4gICAgICBcIlhNTEh0dHBSZXF1ZXN0XCIsXG4gICAgICBcInNpbm9uXCIsXG4gICAgICBcInhoclwiLFxuICAgICAgXCJwcm9qNFwiXG4gICAgXVxuICB9XG59XG4iLCJleHBvcnQgdmFyIGNvcnMgPSAoKHdpbmRvdy5YTUxIdHRwUmVxdWVzdCAmJiAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCkpKTtcbmV4cG9ydCB2YXIgcG9pbnRlckV2ZW50cyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID09PSAnJztcblxuZXhwb3J0IHZhciBTdXBwb3J0ID0ge1xuICBjb3JzOiBjb3JzLFxuICBwb2ludGVyRXZlbnRzOiBwb2ludGVyRXZlbnRzXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0O1xuIiwiZXhwb3J0IHZhciBvcHRpb25zID0ge1xuICBhdHRyaWJ1dGlvbldpZHRoT2Zmc2V0OiA1NVxufTtcblxuZXhwb3J0IGRlZmF1bHQgb3B0aW9ucztcbiIsImltcG9ydCB7IFV0aWwsIERvbVV0aWwgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCBTdXBwb3J0IGZyb20gJy4vU3VwcG9ydCc7XG5pbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi9VdGlsJztcblxudmFyIGNhbGxiYWNrcyA9IDA7XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZSAocGFyYW1zKSB7XG4gIHZhciBkYXRhID0gJyc7XG5cbiAgcGFyYW1zLmYgPSBwYXJhbXMuZiB8fCAnanNvbic7XG5cbiAgZm9yICh2YXIga2V5IGluIHBhcmFtcykge1xuICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgdmFyIHBhcmFtID0gcGFyYW1zW2tleV07XG4gICAgICB2YXIgdHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwYXJhbSk7XG4gICAgICB2YXIgdmFsdWU7XG5cbiAgICAgIGlmIChkYXRhLmxlbmd0aCkge1xuICAgICAgICBkYXRhICs9ICcmJztcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgdmFsdWUgPSAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHBhcmFtWzBdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpID8gSlNPTi5zdHJpbmdpZnkocGFyYW0pIDogcGFyYW0uam9pbignLCcpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHBhcmFtKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgICAgIHZhbHVlID0gcGFyYW0udmFsdWVPZigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBwYXJhbTtcbiAgICAgIH1cblxuICAgICAgZGF0YSArPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3QgKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIHZhciBodHRwUmVxdWVzdCA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKTtcblxuICBodHRwUmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICBodHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBVdGlsLmZhbHNlRm47XG5cbiAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGNvZGU6IDUwMCxcbiAgICAgICAgbWVzc2FnZTogJ1hNTEh0dHBSZXF1ZXN0IGVycm9yJ1xuICAgICAgfVxuICAgIH0sIG51bGwpO1xuICB9O1xuXG4gIGh0dHBSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzcG9uc2U7XG4gICAgdmFyIGVycm9yO1xuXG4gICAgaWYgKGh0dHBSZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShodHRwUmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXNwb25zZSA9IG51bGw7XG4gICAgICAgIGVycm9yID0ge1xuICAgICAgICAgIGNvZGU6IDUwMCxcbiAgICAgICAgICBtZXNzYWdlOiAnQ291bGQgbm90IHBhcnNlIHJlc3BvbnNlIGFzIEpTT04uIFRoaXMgY291bGQgYWxzbyBiZSBjYXVzZWQgYnkgYSBDT1JTIG9yIFhNTEh0dHBSZXF1ZXN0IGVycm9yLidcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5lcnJvcikge1xuICAgICAgICBlcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICByZXNwb25zZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGh0dHBSZXF1ZXN0Lm9uZXJyb3IgPSBVdGlsLmZhbHNlRm47XG5cbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlKTtcbiAgICB9XG4gIH07XG5cbiAgaHR0cFJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub25lcnJvcigpO1xuICB9O1xuXG4gIHJldHVybiBodHRwUmVxdWVzdDtcbn1cblxuZnVuY3Rpb24geG1sSHR0cFBvc3QgKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICB2YXIgaHR0cFJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0KGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgaHR0cFJlcXVlc3Qub3BlbignUE9TVCcsIHVybCk7XG5cbiAgaWYgKHR5cGVvZiBjb250ZXh0ICE9PSAndW5kZWZpbmVkJyAmJiBjb250ZXh0ICE9PSBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0Lm9wdGlvbnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBodHRwUmVxdWVzdC50aW1lb3V0ID0gY29udGV4dC5vcHRpb25zLnRpbWVvdXQ7XG4gICAgfVxuICB9XG4gIGh0dHBSZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLTgnKTtcbiAgaHR0cFJlcXVlc3Quc2VuZChzZXJpYWxpemUocGFyYW1zKSk7XG5cbiAgcmV0dXJuIGh0dHBSZXF1ZXN0O1xufVxuXG5mdW5jdGlvbiB4bWxIdHRwR2V0ICh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgdmFyIGh0dHBSZXF1ZXN0ID0gY3JlYXRlUmVxdWVzdChjYWxsYmFjaywgY29udGV4dCk7XG4gIGh0dHBSZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCArICc/JyArIHNlcmlhbGl6ZShwYXJhbXMpLCB0cnVlKTtcblxuICBpZiAodHlwZW9mIGNvbnRleHQgIT09ICd1bmRlZmluZWQnICYmIGNvbnRleHQgIT09IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIGNvbnRleHQub3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGh0dHBSZXF1ZXN0LnRpbWVvdXQgPSBjb250ZXh0Lm9wdGlvbnMudGltZW91dDtcbiAgICB9XG4gIH1cbiAgaHR0cFJlcXVlc3Quc2VuZChudWxsKTtcblxuICByZXR1cm4gaHR0cFJlcXVlc3Q7XG59XG5cbi8vIEFKQVggaGFuZGxlcnMgZm9yIENPUlMgKG1vZGVybiBicm93c2Vycykgb3IgSlNPTlAgKG9sZGVyIGJyb3dzZXJzKVxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3QgKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICB2YXIgcGFyYW1TdHJpbmcgPSBzZXJpYWxpemUocGFyYW1zKTtcbiAgdmFyIGh0dHBSZXF1ZXN0ID0gY3JlYXRlUmVxdWVzdChjYWxsYmFjaywgY29udGV4dCk7XG4gIHZhciByZXF1ZXN0TGVuZ3RoID0gKHVybCArICc/JyArIHBhcmFtU3RyaW5nKS5sZW5ndGg7XG5cbiAgLy8gaWUxMC8xMSByZXF1aXJlIHRoZSByZXF1ZXN0IGJlIG9wZW5lZCBiZWZvcmUgYSB0aW1lb3V0IGlzIGFwcGxpZWRcbiAgaWYgKHJlcXVlc3RMZW5ndGggPD0gMjAwMCAmJiBTdXBwb3J0LmNvcnMpIHtcbiAgICBodHRwUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwgKyAnPycgKyBwYXJhbVN0cmluZyk7XG4gIH0gZWxzZSBpZiAocmVxdWVzdExlbmd0aCA+IDIwMDAgJiYgU3VwcG9ydC5jb3JzKSB7XG4gICAgaHR0cFJlcXVlc3Qub3BlbignUE9TVCcsIHVybCk7XG4gICAgaHR0cFJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCcpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBjb250ZXh0ICE9PSAndW5kZWZpbmVkJyAmJiBjb250ZXh0ICE9PSBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0Lm9wdGlvbnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBodHRwUmVxdWVzdC50aW1lb3V0ID0gY29udGV4dC5vcHRpb25zLnRpbWVvdXQ7XG4gICAgfVxuICB9XG5cbiAgLy8gcmVxdWVzdCBpcyBsZXNzIHRoYW4gMjAwMCBjaGFyYWN0ZXJzIGFuZCB0aGUgYnJvd3NlciBzdXBwb3J0cyBDT1JTLCBtYWtlIEdFVCByZXF1ZXN0IHdpdGggWE1MSHR0cFJlcXVlc3RcbiAgaWYgKHJlcXVlc3RMZW5ndGggPD0gMjAwMCAmJiBTdXBwb3J0LmNvcnMpIHtcbiAgICBodHRwUmVxdWVzdC5zZW5kKG51bGwpO1xuXG4gIC8vIHJlcXVlc3QgaXMgbW9yZSB0aGFuIDIwMDAgY2hhcmFjdGVycyBhbmQgdGhlIGJyb3dzZXIgc3VwcG9ydHMgQ09SUywgbWFrZSBQT1NUIHJlcXVlc3Qgd2l0aCBYTUxIdHRwUmVxdWVzdFxuICB9IGVsc2UgaWYgKHJlcXVlc3RMZW5ndGggPiAyMDAwICYmIFN1cHBvcnQuY29ycykge1xuICAgIGh0dHBSZXF1ZXN0LnNlbmQocGFyYW1TdHJpbmcpO1xuXG4gIC8vIHJlcXVlc3QgaXMgbGVzcyAgdGhhbiAyMDAwIGNoYXJhY3RlcnMgYW5kIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgQ09SUywgbWFrZSBhIEpTT05QIHJlcXVlc3RcbiAgfSBlbHNlIGlmIChyZXF1ZXN0TGVuZ3RoIDw9IDIwMDAgJiYgIVN1cHBvcnQuY29ycykge1xuICAgIHJldHVybiBqc29ucCh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuXG4gIC8vIHJlcXVlc3QgaXMgbG9uZ2VyIHRoZW4gMjAwMCBjaGFyYWN0ZXJzIGFuZCB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IENPUlMsIGxvZyBhIHdhcm5pbmdcbiAgfSBlbHNlIHtcbiAgICB3YXJuKCdhIHJlcXVlc3QgdG8gJyArIHVybCArICcgd2FzIGxvbmdlciB0aGVuIDIwMDAgY2hhcmFjdGVycyBhbmQgdGhpcyBicm93c2VyIGNhbm5vdCBtYWtlIGEgY3Jvc3MtZG9tYWluIHBvc3QgcmVxdWVzdC4gUGxlYXNlIHVzZSBhIHByb3h5IGh0dHA6Ly9lc3JpLmdpdGh1Yi5pby9lc3JpLWxlYWZsZXQvYXBpLXJlZmVyZW5jZS9yZXF1ZXN0Lmh0bWwnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXR1cm4gaHR0cFJlcXVlc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqc29ucCAodXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIHdpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3MgPSB3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzIHx8IHt9O1xuICB2YXIgY2FsbGJhY2tJZCA9ICdjJyArIGNhbGxiYWNrcztcbiAgcGFyYW1zLmNhbGxiYWNrID0gJ3dpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3MuJyArIGNhbGxiYWNrSWQ7XG5cbiAgd2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrc1tjYWxsYmFja0lkXSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIGlmICh3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzW2NhbGxiYWNrSWRdICE9PSB0cnVlKSB7XG4gICAgICB2YXIgZXJyb3I7XG4gICAgICB2YXIgcmVzcG9uc2VUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJlc3BvbnNlKTtcblxuICAgICAgaWYgKCEocmVzcG9uc2VUeXBlID09PSAnW29iamVjdCBPYmplY3RdJyB8fCByZXNwb25zZVR5cGUgPT09ICdbb2JqZWN0IEFycmF5XScpKSB7XG4gICAgICAgIGVycm9yID0ge1xuICAgICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgICBjb2RlOiA1MDAsXG4gICAgICAgICAgICBtZXNzYWdlOiAnRXhwZWN0ZWQgYXJyYXkgb3Igb2JqZWN0IGFzIEpTT05QIHJlc3BvbnNlJ1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVzcG9uc2UgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgIGVycm9yID0gcmVzcG9uc2U7XG4gICAgICAgIHJlc3BvbnNlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgICAgd2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrc1tjYWxsYmFja0lkXSA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIHZhciBzY3JpcHQgPSBEb21VdGlsLmNyZWF0ZSgnc2NyaXB0JywgbnVsbCwgZG9jdW1lbnQuYm9keSk7XG4gIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gIHNjcmlwdC5zcmMgPSB1cmwgKyAnPycgKyBzZXJpYWxpemUocGFyYW1zKTtcbiAgc2NyaXB0LmlkID0gY2FsbGJhY2tJZDtcbiAgRG9tVXRpbC5hZGRDbGFzcyhzY3JpcHQsICdlc3JpLWxlYWZsZXQtanNvbnAnKTtcblxuICBjYWxsYmFja3MrKztcblxuICByZXR1cm4ge1xuICAgIGlkOiBjYWxsYmFja0lkLFxuICAgIHVybDogc2NyaXB0LnNyYyxcbiAgICBhYm9ydDogZnVuY3Rpb24gKCkge1xuICAgICAgd2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrcy5fY2FsbGJhY2tbY2FsbGJhY2tJZF0oe1xuICAgICAgICBjb2RlOiAwLFxuICAgICAgICBtZXNzYWdlOiAnUmVxdWVzdCBhYm9ydGVkLidcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cblxudmFyIGdldCA9ICgoU3VwcG9ydC5jb3JzKSA/IHhtbEh0dHBHZXQgOiBqc29ucCk7XG5nZXQuQ09SUyA9IHhtbEh0dHBHZXQ7XG5nZXQuSlNPTlAgPSBqc29ucDtcblxuLy8gY2hvb3NlIHRoZSBjb3JyZWN0IEFKQVggaGFuZGxlciBkZXBlbmRpbmcgb24gQ09SUyBzdXBwb3J0XG5leHBvcnQgeyBnZXQgfTtcblxuLy8gYWx3YXlzIHVzZSBYTUxIdHRwUmVxdWVzdCBmb3IgcG9zdHNcbmV4cG9ydCB7IHhtbEh0dHBQb3N0IGFzIHBvc3QgfTtcblxuLy8gZXhwb3J0IHRoZSBSZXF1ZXN0IG9iamVjdCB0byBjYWxsIHRoZSBkaWZmZXJlbnQgaGFuZGxlcnMgZm9yIGRlYnVnZ2luZ1xuZXhwb3J0IHZhciBSZXF1ZXN0ID0ge1xuICByZXF1ZXN0OiByZXF1ZXN0LFxuICBnZXQ6IGdldCxcbiAgcG9zdDogeG1sSHR0cFBvc3Rcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVlc3Q7XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMTcgRXNyaVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vLyBjaGVja3MgaWYgMiB4LHkgcG9pbnRzIGFyZSBlcXVhbFxuZnVuY3Rpb24gcG9pbnRzRXF1YWwgKGEsIGIpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIGNoZWNrcyBpZiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnRzIG9mIGEgcmluZyBhcmUgZXF1YWwgYW5kIGNsb3NlcyB0aGUgcmluZ1xuZnVuY3Rpb24gY2xvc2VSaW5nIChjb29yZGluYXRlcykge1xuICBpZiAoIXBvaW50c0VxdWFsKGNvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1tjb29yZGluYXRlcy5sZW5ndGggLSAxXSkpIHtcbiAgICBjb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGVzWzBdKTtcbiAgfVxuICByZXR1cm4gY29vcmRpbmF0ZXM7XG59XG5cbi8vIGRldGVybWluZSBpZiBwb2x5Z29uIHJpbmcgY29vcmRpbmF0ZXMgYXJlIGNsb2Nrd2lzZS4gY2xvY2t3aXNlIHNpZ25pZmllcyBvdXRlciByaW5nLCBjb3VudGVyLWNsb2Nrd2lzZSBhbiBpbm5lciByaW5nXG4vLyBvciBob2xlLiB0aGlzIGxvZ2ljIHdhcyBmb3VuZCBhdCBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExNjU2NDcvaG93LXRvLWRldGVybWluZS1pZi1hLWxpc3Qtb2YtcG9seWdvbi1cbi8vIHBvaW50cy1hcmUtaW4tY2xvY2t3aXNlLW9yZGVyXG5mdW5jdGlvbiByaW5nSXNDbG9ja3dpc2UgKHJpbmdUb1Rlc3QpIHtcbiAgdmFyIHRvdGFsID0gMDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgckxlbmd0aCA9IHJpbmdUb1Rlc3QubGVuZ3RoO1xuICB2YXIgcHQxID0gcmluZ1RvVGVzdFtpXTtcbiAgdmFyIHB0MjtcbiAgZm9yIChpOyBpIDwgckxlbmd0aCAtIDE7IGkrKykge1xuICAgIHB0MiA9IHJpbmdUb1Rlc3RbaSArIDFdO1xuICAgIHRvdGFsICs9IChwdDJbMF0gLSBwdDFbMF0pICogKHB0MlsxXSArIHB0MVsxXSk7XG4gICAgcHQxID0gcHQyO1xuICB9XG4gIHJldHVybiAodG90YWwgPj0gMCk7XG59XG5cbi8vIHBvcnRlZCBmcm9tIHRlcnJhZm9ybWVyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL1RlcnJhZm9ybWVyL2Jsb2IvbWFzdGVyL3RlcnJhZm9ybWVyLmpzI0w1MDQtTDUxOVxuZnVuY3Rpb24gdmVydGV4SW50ZXJzZWN0c1ZlcnRleCAoYTEsIGEyLCBiMSwgYjIpIHtcbiAgdmFyIHVhVCA9ICgoYjJbMF0gLSBiMVswXSkgKiAoYTFbMV0gLSBiMVsxXSkpIC0gKChiMlsxXSAtIGIxWzFdKSAqIChhMVswXSAtIGIxWzBdKSk7XG4gIHZhciB1YlQgPSAoKGEyWzBdIC0gYTFbMF0pICogKGExWzFdIC0gYjFbMV0pKSAtICgoYTJbMV0gLSBhMVsxXSkgKiAoYTFbMF0gLSBiMVswXSkpO1xuICB2YXIgdUIgPSAoKGIyWzFdIC0gYjFbMV0pICogKGEyWzBdIC0gYTFbMF0pKSAtICgoYjJbMF0gLSBiMVswXSkgKiAoYTJbMV0gLSBhMVsxXSkpO1xuXG4gIGlmICh1QiAhPT0gMCkge1xuICAgIHZhciB1YSA9IHVhVCAvIHVCO1xuICAgIHZhciB1YiA9IHViVCAvIHVCO1xuXG4gICAgaWYgKHVhID49IDAgJiYgdWEgPD0gMSAmJiB1YiA+PSAwICYmIHViIDw9IDEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gcG9ydGVkIGZyb20gdGVycmFmb3JtZXIuanMgaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvVGVycmFmb3JtZXIvYmxvYi9tYXN0ZXIvdGVycmFmb3JtZXIuanMjTDUyMS1MNTMxXG5mdW5jdGlvbiBhcnJheUludGVyc2VjdHNBcnJheSAoYSwgYikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBiLmxlbmd0aCAtIDE7IGorKykge1xuICAgICAgaWYgKHZlcnRleEludGVyc2VjdHNWZXJ0ZXgoYVtpXSwgYVtpICsgMV0sIGJbal0sIGJbaiArIDFdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIHBvcnRlZCBmcm9tIHRlcnJhZm9ybWVyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL1RlcnJhZm9ybWVyL2Jsb2IvbWFzdGVyL3RlcnJhZm9ybWVyLmpzI0w0NzAtTDQ4MFxuZnVuY3Rpb24gY29vcmRpbmF0ZXNDb250YWluUG9pbnQgKGNvb3JkaW5hdGVzLCBwb2ludCkge1xuICB2YXIgY29udGFpbnMgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IC0xLCBsID0gY29vcmRpbmF0ZXMubGVuZ3RoLCBqID0gbCAtIDE7ICsraSA8IGw7IGogPSBpKSB7XG4gICAgaWYgKCgoY29vcmRpbmF0ZXNbaV1bMV0gPD0gcG9pbnRbMV0gJiYgcG9pbnRbMV0gPCBjb29yZGluYXRlc1tqXVsxXSkgfHxcbiAgICAgICAgIChjb29yZGluYXRlc1tqXVsxXSA8PSBwb2ludFsxXSAmJiBwb2ludFsxXSA8IGNvb3JkaW5hdGVzW2ldWzFdKSkgJiZcbiAgICAgICAgKHBvaW50WzBdIDwgKCgoY29vcmRpbmF0ZXNbal1bMF0gLSBjb29yZGluYXRlc1tpXVswXSkgKiAocG9pbnRbMV0gLSBjb29yZGluYXRlc1tpXVsxXSkpIC8gKGNvb3JkaW5hdGVzW2pdWzFdIC0gY29vcmRpbmF0ZXNbaV1bMV0pKSArIGNvb3JkaW5hdGVzW2ldWzBdKSkge1xuICAgICAgY29udGFpbnMgPSAhY29udGFpbnM7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb250YWlucztcbn1cblxuLy8gcG9ydGVkIGZyb20gdGVycmFmb3JtZXItYXJjZ2lzLXBhcnNlci5qcyBodHRwczovL2dpdGh1Yi5jb20vRXNyaS90ZXJyYWZvcm1lci1hcmNnaXMtcGFyc2VyL2Jsb2IvbWFzdGVyL3RlcnJhZm9ybWVyLWFyY2dpcy1wYXJzZXIuanMjTDEwNi1MMTEzXG5mdW5jdGlvbiBjb29yZGluYXRlc0NvbnRhaW5Db29yZGluYXRlcyAob3V0ZXIsIGlubmVyKSB7XG4gIHZhciBpbnRlcnNlY3RzID0gYXJyYXlJbnRlcnNlY3RzQXJyYXkob3V0ZXIsIGlubmVyKTtcbiAgdmFyIGNvbnRhaW5zID0gY29vcmRpbmF0ZXNDb250YWluUG9pbnQob3V0ZXIsIGlubmVyWzBdKTtcbiAgaWYgKCFpbnRlcnNlY3RzICYmIGNvbnRhaW5zKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBkbyBhbnkgcG9seWdvbnMgaW4gdGhpcyBhcnJheSBjb250YWluIGFueSBvdGhlciBwb2x5Z29ucyBpbiB0aGlzIGFycmF5P1xuLy8gdXNlZCBmb3IgY2hlY2tpbmcgZm9yIGhvbGVzIGluIGFyY2dpcyByaW5nc1xuLy8gcG9ydGVkIGZyb20gdGVycmFmb3JtZXItYXJjZ2lzLXBhcnNlci5qcyBodHRwczovL2dpdGh1Yi5jb20vRXNyaS90ZXJyYWZvcm1lci1hcmNnaXMtcGFyc2VyL2Jsb2IvbWFzdGVyL3RlcnJhZm9ybWVyLWFyY2dpcy1wYXJzZXIuanMjTDExNy1MMTcyXG5mdW5jdGlvbiBjb252ZXJ0UmluZ3NUb0dlb0pTT04gKHJpbmdzKSB7XG4gIHZhciBvdXRlclJpbmdzID0gW107XG4gIHZhciBob2xlcyA9IFtdO1xuICB2YXIgeDsgLy8gaXRlcmF0b3JcbiAgdmFyIG91dGVyUmluZzsgLy8gY3VycmVudCBvdXRlciByaW5nIGJlaW5nIGV2YWx1YXRlZFxuICB2YXIgaG9sZTsgLy8gY3VycmVudCBob2xlIGJlaW5nIGV2YWx1YXRlZFxuXG4gIC8vIGZvciBlYWNoIHJpbmdcbiAgZm9yICh2YXIgciA9IDA7IHIgPCByaW5ncy5sZW5ndGg7IHIrKykge1xuICAgIHZhciByaW5nID0gY2xvc2VSaW5nKHJpbmdzW3JdLnNsaWNlKDApKTtcbiAgICBpZiAocmluZy5sZW5ndGggPCA0KSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgLy8gaXMgdGhpcyByaW5nIGFuIG91dGVyIHJpbmc/IGlzIGl0IGNsb2Nrd2lzZT9cbiAgICBpZiAocmluZ0lzQ2xvY2t3aXNlKHJpbmcpKSB7XG4gICAgICB2YXIgcG9seWdvbiA9IFsgcmluZyBdO1xuICAgICAgb3V0ZXJSaW5ncy5wdXNoKHBvbHlnb24pOyAvLyBwdXNoIHRvIG91dGVyIHJpbmdzXG4gICAgfSBlbHNlIHtcbiAgICAgIGhvbGVzLnB1c2gocmluZyk7IC8vIGNvdW50ZXJjbG9ja3dpc2UgcHVzaCB0byBob2xlc1xuICAgIH1cbiAgfVxuXG4gIHZhciB1bmNvbnRhaW5lZEhvbGVzID0gW107XG5cbiAgLy8gd2hpbGUgdGhlcmUgYXJlIGhvbGVzIGxlZnQuLi5cbiAgd2hpbGUgKGhvbGVzLmxlbmd0aCkge1xuICAgIC8vIHBvcCBhIGhvbGUgb2ZmIG91dCBzdGFja1xuICAgIGhvbGUgPSBob2xlcy5wb3AoKTtcblxuICAgIC8vIGxvb3Agb3ZlciBhbGwgb3V0ZXIgcmluZ3MgYW5kIHNlZSBpZiB0aGV5IGNvbnRhaW4gb3VyIGhvbGUuXG4gICAgdmFyIGNvbnRhaW5lZCA9IGZhbHNlO1xuICAgIGZvciAoeCA9IG91dGVyUmluZ3MubGVuZ3RoIC0gMTsgeCA+PSAwOyB4LS0pIHtcbiAgICAgIG91dGVyUmluZyA9IG91dGVyUmluZ3NbeF1bMF07XG4gICAgICBpZiAoY29vcmRpbmF0ZXNDb250YWluQ29vcmRpbmF0ZXMob3V0ZXJSaW5nLCBob2xlKSkge1xuICAgICAgICAvLyB0aGUgaG9sZSBpcyBjb250YWluZWQgcHVzaCBpdCBpbnRvIG91ciBwb2x5Z29uXG4gICAgICAgIG91dGVyUmluZ3NbeF0ucHVzaChob2xlKTtcbiAgICAgICAgY29udGFpbmVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmluZyBpcyBub3QgY29udGFpbmVkIGluIGFueSBvdXRlciByaW5nXG4gICAgLy8gc29tZXRpbWVzIHRoaXMgaGFwcGVucyBodHRwczovL2dpdGh1Yi5jb20vRXNyaS9lc3JpLWxlYWZsZXQvaXNzdWVzLzMyMFxuICAgIGlmICghY29udGFpbmVkKSB7XG4gICAgICB1bmNvbnRhaW5lZEhvbGVzLnB1c2goaG9sZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgd2UgY291bGRuJ3QgbWF0Y2ggYW55IGhvbGVzIHVzaW5nIGNvbnRhaW5zIHdlIGNhbiB0cnkgaW50ZXJzZWN0cy4uLlxuICB3aGlsZSAodW5jb250YWluZWRIb2xlcy5sZW5ndGgpIHtcbiAgICAvLyBwb3AgYSBob2xlIG9mZiBvdXQgc3RhY2tcbiAgICBob2xlID0gdW5jb250YWluZWRIb2xlcy5wb3AoKTtcblxuICAgIC8vIGxvb3Agb3ZlciBhbGwgb3V0ZXIgcmluZ3MgYW5kIHNlZSBpZiBhbnkgaW50ZXJzZWN0IG91ciBob2xlLlxuICAgIHZhciBpbnRlcnNlY3RzID0gZmFsc2U7XG5cbiAgICBmb3IgKHggPSBvdXRlclJpbmdzLmxlbmd0aCAtIDE7IHggPj0gMDsgeC0tKSB7XG4gICAgICBvdXRlclJpbmcgPSBvdXRlclJpbmdzW3hdWzBdO1xuICAgICAgaWYgKGFycmF5SW50ZXJzZWN0c0FycmF5KG91dGVyUmluZywgaG9sZSkpIHtcbiAgICAgICAgLy8gdGhlIGhvbGUgaXMgY29udGFpbmVkIHB1c2ggaXQgaW50byBvdXIgcG9seWdvblxuICAgICAgICBvdXRlclJpbmdzW3hdLnB1c2goaG9sZSk7XG4gICAgICAgIGludGVyc2VjdHMgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWludGVyc2VjdHMpIHtcbiAgICAgIG91dGVyUmluZ3MucHVzaChbaG9sZS5yZXZlcnNlKCldKTtcbiAgICB9XG4gIH1cblxuICBpZiAob3V0ZXJSaW5ncy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ1BvbHlnb24nLFxuICAgICAgY29vcmRpbmF0ZXM6IG91dGVyUmluZ3NbMF1cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnTXVsdGlQb2x5Z29uJyxcbiAgICAgIGNvb3JkaW5hdGVzOiBvdXRlclJpbmdzXG4gICAgfTtcbiAgfVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGVuc3VyZXMgdGhhdCByaW5ncyBhcmUgb3JpZW50ZWQgaW4gdGhlIHJpZ2h0IGRpcmVjdGlvbnNcbi8vIG91dGVyIHJpbmdzIGFyZSBjbG9ja3dpc2UsIGhvbGVzIGFyZSBjb3VudGVyY2xvY2t3aXNlXG4vLyB1c2VkIGZvciBjb252ZXJ0aW5nIEdlb0pTT04gUG9seWdvbnMgdG8gQXJjR0lTIFBvbHlnb25zXG5mdW5jdGlvbiBvcmllbnRSaW5ncyAocG9seSkge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIHZhciBwb2x5Z29uID0gcG9seS5zbGljZSgwKTtcbiAgdmFyIG91dGVyUmluZyA9IGNsb3NlUmluZyhwb2x5Z29uLnNoaWZ0KCkuc2xpY2UoMCkpO1xuICBpZiAob3V0ZXJSaW5nLmxlbmd0aCA+PSA0KSB7XG4gICAgaWYgKCFyaW5nSXNDbG9ja3dpc2Uob3V0ZXJSaW5nKSkge1xuICAgICAgb3V0ZXJSaW5nLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICBvdXRwdXQucHVzaChvdXRlclJpbmcpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2x5Z29uLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaG9sZSA9IGNsb3NlUmluZyhwb2x5Z29uW2ldLnNsaWNlKDApKTtcbiAgICAgIGlmIChob2xlLmxlbmd0aCA+PSA0KSB7XG4gICAgICAgIGlmIChyaW5nSXNDbG9ja3dpc2UoaG9sZSkpIHtcbiAgICAgICAgICBob2xlLnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXQucHVzaChob2xlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGZsYXR0ZW5zIGhvbGVzIGluIG11bHRpcG9seWdvbnMgdG8gb25lIGFycmF5IG9mIHBvbHlnb25zXG4vLyB1c2VkIGZvciBjb252ZXJ0aW5nIEdlb0pTT04gUG9seWdvbnMgdG8gQXJjR0lTIFBvbHlnb25zXG5mdW5jdGlvbiBmbGF0dGVuTXVsdGlQb2x5Z29uUmluZ3MgKHJpbmdzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByaW5ncy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwb2x5Z29uID0gb3JpZW50UmluZ3MocmluZ3NbaV0pO1xuICAgIGZvciAodmFyIHggPSBwb2x5Z29uLmxlbmd0aCAtIDE7IHggPj0gMDsgeC0tKSB7XG4gICAgICB2YXIgcmluZyA9IHBvbHlnb25beF0uc2xpY2UoMCk7XG4gICAgICBvdXRwdXQucHVzaChyaW5nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuLy8gc2hhbGxvdyBvYmplY3QgY2xvbmUgZm9yIGZlYXR1cmUgcHJvcGVydGllcyBhbmQgYXR0cmlidXRlc1xuLy8gZnJvbSBodHRwOi8vanNwZXJmLmNvbS9jbG9uaW5nLWFuLW9iamVjdC8yXG5mdW5jdGlvbiBzaGFsbG93Q2xvbmUgKG9iaikge1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgdGFyZ2V0W2ldID0gb2JqW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJjZ2lzVG9HZW9KU09OIChhcmNnaXMsIGlkQXR0cmlidXRlKSB7XG4gIHZhciBnZW9qc29uID0ge307XG5cbiAgaWYgKHR5cGVvZiBhcmNnaXMueCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGFyY2dpcy55ID09PSAnbnVtYmVyJykge1xuICAgIGdlb2pzb24udHlwZSA9ICdQb2ludCc7XG4gICAgZ2VvanNvbi5jb29yZGluYXRlcyA9IFthcmNnaXMueCwgYXJjZ2lzLnldO1xuICAgIGlmICh0eXBlb2YgYXJjZ2lzLnogPT09ICdudW1iZXInKSB7XG4gICAgICBnZW9qc29uLmNvb3JkaW5hdGVzLnB1c2goYXJjZ2lzLnopO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhcmNnaXMucG9pbnRzKSB7XG4gICAgZ2VvanNvbi50eXBlID0gJ011bHRpUG9pbnQnO1xuICAgIGdlb2pzb24uY29vcmRpbmF0ZXMgPSBhcmNnaXMucG9pbnRzLnNsaWNlKDApO1xuICB9XG5cbiAgaWYgKGFyY2dpcy5wYXRocykge1xuICAgIGlmIChhcmNnaXMucGF0aHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBnZW9qc29uLnR5cGUgPSAnTGluZVN0cmluZyc7XG4gICAgICBnZW9qc29uLmNvb3JkaW5hdGVzID0gYXJjZ2lzLnBhdGhzWzBdLnNsaWNlKDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW9qc29uLnR5cGUgPSAnTXVsdGlMaW5lU3RyaW5nJztcbiAgICAgIGdlb2pzb24uY29vcmRpbmF0ZXMgPSBhcmNnaXMucGF0aHMuc2xpY2UoMCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFyY2dpcy5yaW5ncykge1xuICAgIGdlb2pzb24gPSBjb252ZXJ0UmluZ3NUb0dlb0pTT04oYXJjZ2lzLnJpbmdzLnNsaWNlKDApKTtcbiAgfVxuXG4gIGlmIChhcmNnaXMuZ2VvbWV0cnkgfHwgYXJjZ2lzLmF0dHJpYnV0ZXMpIHtcbiAgICBnZW9qc29uLnR5cGUgPSAnRmVhdHVyZSc7XG4gICAgZ2VvanNvbi5nZW9tZXRyeSA9IChhcmNnaXMuZ2VvbWV0cnkpID8gYXJjZ2lzVG9HZW9KU09OKGFyY2dpcy5nZW9tZXRyeSkgOiBudWxsO1xuICAgIGdlb2pzb24ucHJvcGVydGllcyA9IChhcmNnaXMuYXR0cmlidXRlcykgPyBzaGFsbG93Q2xvbmUoYXJjZ2lzLmF0dHJpYnV0ZXMpIDogbnVsbDtcbiAgICBpZiAoYXJjZ2lzLmF0dHJpYnV0ZXMpIHtcbiAgICAgIGdlb2pzb24uaWQgPSBhcmNnaXMuYXR0cmlidXRlc1tpZEF0dHJpYnV0ZV0gfHwgYXJjZ2lzLmF0dHJpYnV0ZXMuT0JKRUNUSUQgfHwgYXJjZ2lzLmF0dHJpYnV0ZXMuRklEO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIG5vIHZhbGlkIGdlb21ldHJ5IHdhcyBlbmNvdW50ZXJlZFxuICBpZiAoSlNPTi5zdHJpbmdpZnkoZ2VvanNvbi5nZW9tZXRyeSkgPT09IEpTT04uc3RyaW5naWZ5KHt9KSkge1xuICAgIGdlb2pzb24uZ2VvbWV0cnkgPSBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGdlb2pzb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9qc29uVG9BcmNHSVMgKGdlb2pzb24sIGlkQXR0cmlidXRlKSB7XG4gIGlkQXR0cmlidXRlID0gaWRBdHRyaWJ1dGUgfHwgJ09CSkVDVElEJztcbiAgdmFyIHNwYXRpYWxSZWZlcmVuY2UgPSB7IHdraWQ6IDQzMjYgfTtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICB2YXIgaTtcblxuICBzd2l0Y2ggKGdlb2pzb24udHlwZSkge1xuICAgIGNhc2UgJ1BvaW50JzpcbiAgICAgIHJlc3VsdC54ID0gZ2VvanNvbi5jb29yZGluYXRlc1swXTtcbiAgICAgIHJlc3VsdC55ID0gZ2VvanNvbi5jb29yZGluYXRlc1sxXTtcbiAgICAgIHJlc3VsdC5zcGF0aWFsUmVmZXJlbmNlID0gc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ011bHRpUG9pbnQnOlxuICAgICAgcmVzdWx0LnBvaW50cyA9IGdlb2pzb24uY29vcmRpbmF0ZXMuc2xpY2UoMCk7XG4gICAgICByZXN1bHQuc3BhdGlhbFJlZmVyZW5jZSA9IHNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdMaW5lU3RyaW5nJzpcbiAgICAgIHJlc3VsdC5wYXRocyA9IFtnZW9qc29uLmNvb3JkaW5hdGVzLnNsaWNlKDApXTtcbiAgICAgIHJlc3VsdC5zcGF0aWFsUmVmZXJlbmNlID0gc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ011bHRpTGluZVN0cmluZyc6XG4gICAgICByZXN1bHQucGF0aHMgPSBnZW9qc29uLmNvb3JkaW5hdGVzLnNsaWNlKDApO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUG9seWdvbic6XG4gICAgICByZXN1bHQucmluZ3MgPSBvcmllbnRSaW5ncyhnZW9qc29uLmNvb3JkaW5hdGVzLnNsaWNlKDApKTtcbiAgICAgIHJlc3VsdC5zcGF0aWFsUmVmZXJlbmNlID0gc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ011bHRpUG9seWdvbic6XG4gICAgICByZXN1bHQucmluZ3MgPSBmbGF0dGVuTXVsdGlQb2x5Z29uUmluZ3MoZ2VvanNvbi5jb29yZGluYXRlcy5zbGljZSgwKSk7XG4gICAgICByZXN1bHQuc3BhdGlhbFJlZmVyZW5jZSA9IHNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdGZWF0dXJlJzpcbiAgICAgIGlmIChnZW9qc29uLmdlb21ldHJ5KSB7XG4gICAgICAgIHJlc3VsdC5nZW9tZXRyeSA9IGdlb2pzb25Ub0FyY0dJUyhnZW9qc29uLmdlb21ldHJ5LCBpZEF0dHJpYnV0ZSk7XG4gICAgICB9XG4gICAgICByZXN1bHQuYXR0cmlidXRlcyA9IChnZW9qc29uLnByb3BlcnRpZXMpID8gc2hhbGxvd0Nsb25lKGdlb2pzb24ucHJvcGVydGllcykgOiB7fTtcbiAgICAgIGlmIChnZW9qc29uLmlkKSB7XG4gICAgICAgIHJlc3VsdC5hdHRyaWJ1dGVzW2lkQXR0cmlidXRlXSA9IGdlb2pzb24uaWQ7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdGZWF0dXJlQ29sbGVjdGlvbic6XG4gICAgICByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBnZW9qc29uLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGdlb2pzb25Ub0FyY0dJUyhnZW9qc29uLmZlYXR1cmVzW2ldLCBpZEF0dHJpYnV0ZSkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnR2VvbWV0cnlDb2xsZWN0aW9uJzpcbiAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGdlb2pzb24uZ2VvbWV0cmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQucHVzaChnZW9qc29uVG9BcmNHSVMoZ2VvanNvbi5nZW9tZXRyaWVzW2ldLCBpZEF0dHJpYnV0ZSkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IGFyY2dpc1RvR2VvSlNPTjogYXJjZ2lzVG9HZW9KU09OLCBnZW9qc29uVG9BcmNHSVM6IGdlb2pzb25Ub0FyY0dJUyB9O1xuIiwiaW1wb3J0IHsgbGF0TG5nLCBsYXRMbmdCb3VuZHMsIExhdExuZywgTGF0TG5nQm91bmRzLCBVdGlsLCBEb21VdGlsLCBHZW9KU09OIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBqc29ucCB9IGZyb20gJy4vUmVxdWVzdCc7XG5pbXBvcnQgeyBvcHRpb25zIH0gZnJvbSAnLi9PcHRpb25zJztcblxuaW1wb3J0IHtcbiAgZ2VvanNvblRvQXJjR0lTIGFzIGcyYSxcbiAgYXJjZ2lzVG9HZW9KU09OIGFzIGEyZ1xufSBmcm9tICdAZXNyaS9hcmNnaXMtdG8tZ2VvanNvbi11dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9qc29uVG9BcmNHSVMgKGdlb2pzb24sIGlkQXR0cikge1xuICByZXR1cm4gZzJhKGdlb2pzb24sIGlkQXR0cik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmNnaXNUb0dlb0pTT04gKGFyY2dpcywgaWRBdHRyKSB7XG4gIHJldHVybiBhMmcoYXJjZ2lzLCBpZEF0dHIpO1xufVxuXG4vLyBjb252ZXJ0IGFuIGV4dGVudCAoQXJjR0lTKSB0byBMYXRMbmdCb3VuZHMgKExlYWZsZXQpXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW50VG9Cb3VuZHMgKGV4dGVudCkge1xuICAvLyBcIk5hTlwiIGNvb3JkaW5hdGVzIGZyb20gQXJjR0lTIFNlcnZlciBpbmRpY2F0ZSBhIG51bGwgZ2VvbWV0cnlcbiAgaWYgKGV4dGVudC54bWluICE9PSAnTmFOJyAmJiBleHRlbnQueW1pbiAhPT0gJ05hTicgJiYgZXh0ZW50LnhtYXggIT09ICdOYU4nICYmIGV4dGVudC55bWF4ICE9PSAnTmFOJykge1xuICAgIHZhciBzdyA9IGxhdExuZyhleHRlbnQueW1pbiwgZXh0ZW50LnhtaW4pO1xuICAgIHZhciBuZSA9IGxhdExuZyhleHRlbnQueW1heCwgZXh0ZW50LnhtYXgpO1xuICAgIHJldHVybiBsYXRMbmdCb3VuZHMoc3csIG5lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vLyBjb252ZXJ0IGFuIExhdExuZ0JvdW5kcyAoTGVhZmxldCkgdG8gZXh0ZW50IChBcmNHSVMpXG5leHBvcnQgZnVuY3Rpb24gYm91bmRzVG9FeHRlbnQgKGJvdW5kcykge1xuICBib3VuZHMgPSBsYXRMbmdCb3VuZHMoYm91bmRzKTtcbiAgcmV0dXJuIHtcbiAgICAneG1pbic6IGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sbmcsXG4gICAgJ3ltaW4nOiBib3VuZHMuZ2V0U291dGhXZXN0KCkubGF0LFxuICAgICd4bWF4JzogYm91bmRzLmdldE5vcnRoRWFzdCgpLmxuZyxcbiAgICAneW1heCc6IGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sYXQsXG4gICAgJ3NwYXRpYWxSZWZlcmVuY2UnOiB7XG4gICAgICAnd2tpZCc6IDQzMjZcbiAgICB9XG4gIH07XG59XG5cbnZhciBrbm93bkZpZWxkTmFtZXMgPSAvXihPQkpFQ1RJRHxGSUR8T0lEfElEKSQvaTtcblxuLy8gQXR0ZW1wdHMgdG8gZmluZCB0aGUgSUQgRmllbGQgZnJvbSByZXNwb25zZVxuZXhwb3J0IGZ1bmN0aW9uIF9maW5kSWRBdHRyaWJ1dGVGcm9tUmVzcG9uc2UgKHJlc3BvbnNlKSB7XG4gIHZhciByZXN1bHQ7XG5cbiAgaWYgKHJlc3BvbnNlLm9iamVjdElkRmllbGROYW1lKSB7XG4gICAgLy8gRmluZCBJZCBGaWVsZCBkaXJlY3RseVxuICAgIHJlc3VsdCA9IHJlc3BvbnNlLm9iamVjdElkRmllbGROYW1lO1xuICB9IGVsc2UgaWYgKHJlc3BvbnNlLmZpZWxkcykge1xuICAgIC8vIEZpbmQgSUQgRmllbGQgYmFzZWQgb24gZmllbGQgdHlwZVxuICAgIGZvciAodmFyIGogPSAwOyBqIDw9IHJlc3BvbnNlLmZpZWxkcy5sZW5ndGggLSAxOyBqKyspIHtcbiAgICAgIGlmIChyZXNwb25zZS5maWVsZHNbal0udHlwZSA9PT0gJ2VzcmlGaWVsZFR5cGVPSUQnKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3BvbnNlLmZpZWxkc1tqXS5uYW1lO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIC8vIElmIG5vIGZpZWxkIHdhcyBtYXJrZWQgYXMgYmVpbmcgdGhlIGVzcmlGaWVsZFR5cGVPSUQgdHJ5IHdlbGwga25vd24gZmllbGQgbmFtZXNcbiAgICAgIGZvciAoaiA9IDA7IGogPD0gcmVzcG9uc2UuZmllbGRzLmxlbmd0aCAtIDE7IGorKykge1xuICAgICAgICBpZiAocmVzcG9uc2UuZmllbGRzW2pdLm5hbWUubWF0Y2goa25vd25GaWVsZE5hbWVzKSkge1xuICAgICAgICAgIHJlc3VsdCA9IHJlc3BvbnNlLmZpZWxkc1tqXS5uYW1lO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIFRoaXMgaXMgdGhlICdsYXN0JyByZXNvcnQsIGZpbmQgdGhlIElkIGZpZWxkIGZyb20gdGhlIHNwZWNpZmllZCBmZWF0dXJlXG5leHBvcnQgZnVuY3Rpb24gX2ZpbmRJZEF0dHJpYnV0ZUZyb21GZWF0dXJlIChmZWF0dXJlKSB7XG4gIGZvciAodmFyIGtleSBpbiBmZWF0dXJlLmF0dHJpYnV0ZXMpIHtcbiAgICBpZiAoa2V5Lm1hdGNoKGtub3duRmllbGROYW1lcykpIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24gKHJlc3BvbnNlLCBpZEF0dHJpYnV0ZSkge1xuICB2YXIgb2JqZWN0SWRGaWVsZDtcbiAgdmFyIGZlYXR1cmVzID0gcmVzcG9uc2UuZmVhdHVyZXMgfHwgcmVzcG9uc2UucmVzdWx0cztcbiAgdmFyIGNvdW50ID0gZmVhdHVyZXMubGVuZ3RoO1xuXG4gIGlmIChpZEF0dHJpYnV0ZSkge1xuICAgIG9iamVjdElkRmllbGQgPSBpZEF0dHJpYnV0ZTtcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RJZEZpZWxkID0gX2ZpbmRJZEF0dHJpYnV0ZUZyb21SZXNwb25zZShyZXNwb25zZSk7XG4gIH1cblxuICB2YXIgZmVhdHVyZUNvbGxlY3Rpb24gPSB7XG4gICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICBmZWF0dXJlczogW11cbiAgfTtcblxuICBpZiAoY291bnQpIHtcbiAgICBmb3IgKHZhciBpID0gZmVhdHVyZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmZWF0dXJlID0gYXJjZ2lzVG9HZW9KU09OKGZlYXR1cmVzW2ldLCBvYmplY3RJZEZpZWxkIHx8IF9maW5kSWRBdHRyaWJ1dGVGcm9tRmVhdHVyZShmZWF0dXJlc1tpXSkpO1xuICAgICAgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb247XG59XG5cbiAgLy8gdHJpbSB1cmwgd2hpdGVzcGFjZSBhbmQgYWRkIGEgdHJhaWxpbmcgc2xhc2ggaWYgbmVlZGVkXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5VcmwgKHVybCkge1xuICAvLyB0cmltIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNwYWNlcywgYnV0IG5vdCBzcGFjZXMgaW5zaWRlIHRoZSB1cmxcbiAgdXJsID0gVXRpbC50cmltKHVybCk7XG5cbiAgLy8gYWRkIGEgdHJhaWxpbmcgc2xhc2ggdG8gdGhlIHVybCBpZiB0aGUgdXNlciBvbWl0dGVkIGl0XG4gIGlmICh1cmxbdXJsLmxlbmd0aCAtIDFdICE9PSAnLycpIHtcbiAgICB1cmwgKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuLyogRXh0cmFjdCB1cmwgcGFyYW1zIGlmIGFueSBhbmQgc3RvcmUgdGhlbSBpbiByZXF1ZXN0UGFyYW1zIGF0dHJpYnV0ZS5cbiAgIFJldHVybiB0aGUgb3B0aW9ucyBwYXJhbXMgdXBkYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVybFBhcmFtcyAob3B0aW9ucykge1xuICBpZiAob3B0aW9ucy51cmwuaW5kZXhPZignPycpICE9PSAtMSkge1xuICAgIG9wdGlvbnMucmVxdWVzdFBhcmFtcyA9IG9wdGlvbnMucmVxdWVzdFBhcmFtcyB8fCB7fTtcbiAgICB2YXIgcXVlcnlTdHJpbmcgPSBvcHRpb25zLnVybC5zdWJzdHJpbmcob3B0aW9ucy51cmwuaW5kZXhPZignPycpICsgMSk7XG4gICAgb3B0aW9ucy51cmwgPSBvcHRpb25zLnVybC5zcGxpdCgnPycpWzBdO1xuICAgIG9wdGlvbnMucmVxdWVzdFBhcmFtcyA9IEpTT04ucGFyc2UoJ3tcIicgKyBkZWNvZGVVUkkocXVlcnlTdHJpbmcpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC8mL2csICdcIixcIicpLnJlcGxhY2UoLz0vZywgJ1wiOlwiJykgKyAnXCJ9Jyk7XG4gIH1cbiAgb3B0aW9ucy51cmwgPSBjbGVhblVybChvcHRpb25zLnVybC5zcGxpdCgnPycpWzBdKTtcbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FyY2dpc09ubGluZSAodXJsKSB7XG4gIC8qIGhvc3RlZCBmZWF0dXJlIHNlcnZpY2VzIHN1cHBvcnQgZ2VvanNvbiBhcyBhbiBvdXRwdXQgZm9ybWF0XG4gIHV0aWxpdHkuYXJjZ2lzLmNvbSBzZXJ2aWNlcyBhcmUgcHJveGllZCBmcm9tIGEgdmFyaWV0eSBvZiBBcmNHSVMgU2VydmVyIHZpbnRhZ2VzLCBhbmQgbWF5IG5vdCAqL1xuICByZXR1cm4gKC9eKD8hLip1dGlsaXR5XFwuYXJjZ2lzXFwuY29tKS4qXFwuYXJjZ2lzXFwuY29tLipGZWF0dXJlU2VydmVyL2kpLnRlc3QodXJsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2pzb25UeXBlVG9BcmNHSVMgKGdlb0pzb25UeXBlKSB7XG4gIHZhciBhcmNnaXNHZW9tZXRyeVR5cGU7XG4gIHN3aXRjaCAoZ2VvSnNvblR5cGUpIHtcbiAgICBjYXNlICdQb2ludCc6XG4gICAgICBhcmNnaXNHZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9pbnQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlQb2ludCc6XG4gICAgICBhcmNnaXNHZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5TXVsdGlwb2ludCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdMaW5lU3RyaW5nJzpcbiAgICAgIGFyY2dpc0dlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2x5bGluZSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aUxpbmVTdHJpbmcnOlxuICAgICAgYXJjZ2lzR2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvbHlsaW5lJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1BvbHlnb24nOlxuICAgICAgYXJjZ2lzR2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvbHlnb24nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlQb2x5Z29uJzpcbiAgICAgIGFyY2dpc0dlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2x5Z29uJztcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIGFyY2dpc0dlb21ldHJ5VHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdhcm4gKCkge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY0F0dHJpYnV0aW9uV2lkdGggKG1hcCkge1xuICAvLyBlaXRoZXIgY3JvcCBhdCA1NXB4IG9yIHVzZXIgZGVmaW5lZCBidWZmZXJcbiAgcmV0dXJuIChtYXAuZ2V0U2l6ZSgpLnggLSBvcHRpb25zLmF0dHJpYnV0aW9uV2lkdGhPZmZzZXQpICsgJ3B4Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEVzcmlBdHRyaWJ1dGlvbiAobWFwKSB7XG4gIGlmIChtYXAuYXR0cmlidXRpb25Db250cm9sICYmICFtYXAuYXR0cmlidXRpb25Db250cm9sLl9lc3JpQXR0cmlidXRpb25BZGRlZCkge1xuICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuc2V0UHJlZml4KCc8YSBocmVmPVwiaHR0cDovL2xlYWZsZXRqcy5jb21cIiB0aXRsZT1cIkEgSlMgbGlicmFyeSBmb3IgaW50ZXJhY3RpdmUgbWFwc1wiPkxlYWZsZXQ8L2E+IHwgUG93ZXJlZCBieSA8YSBocmVmPVwiaHR0cHM6Ly93d3cuZXNyaS5jb21cIj5Fc3JpPC9hPicpO1xuXG4gICAgdmFyIGhvdmVyQXR0cmlidXRpb25TdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgaG92ZXJBdHRyaWJ1dGlvblN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGhvdmVyQXR0cmlidXRpb25TdHlsZS5pbm5lckhUTUwgPSAnLmVzcmktdHJ1bmNhdGVkLWF0dHJpYnV0aW9uOmhvdmVyIHsnICtcbiAgICAgICd3aGl0ZS1zcGFjZTogbm9ybWFsOycgK1xuICAgICd9JztcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoaG92ZXJBdHRyaWJ1dGlvblN0eWxlKTtcbiAgICBEb21VdGlsLmFkZENsYXNzKG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuX2NvbnRhaW5lciwgJ2VzcmktdHJ1bmNhdGVkLWF0dHJpYnV0aW9uOmhvdmVyJyk7XG5cbiAgICAvLyBkZWZpbmUgYSBuZXcgY3NzIGNsYXNzIGluIEpTIHRvIHRyaW0gYXR0cmlidXRpb24gaW50byBhIHNpbmdsZSBsaW5lXG4gICAgdmFyIGF0dHJpYnV0aW9uU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGF0dHJpYnV0aW9uU3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgYXR0cmlidXRpb25TdHlsZS5pbm5lckhUTUwgPSAnLmVzcmktdHJ1bmNhdGVkLWF0dHJpYnV0aW9uIHsnICtcbiAgICAgICd2ZXJ0aWNhbC1hbGlnbjogLTNweDsnICtcbiAgICAgICd3aGl0ZS1zcGFjZTogbm93cmFwOycgK1xuICAgICAgJ292ZXJmbG93OiBoaWRkZW47JyArXG4gICAgICAndGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7JyArXG4gICAgICAnZGlzcGxheTogaW5saW5lLWJsb2NrOycgK1xuICAgICAgJ3RyYW5zaXRpb246IDBzIHdoaXRlLXNwYWNlOycgK1xuICAgICAgJ3RyYW5zaXRpb24tZGVsYXk6IDFzOycgK1xuICAgICAgJ21heC13aWR0aDogJyArIGNhbGNBdHRyaWJ1dGlvbldpZHRoKG1hcCkgKyAnOycgK1xuICAgICd9JztcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoYXR0cmlidXRpb25TdHlsZSk7XG4gICAgRG9tVXRpbC5hZGRDbGFzcyhtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIsICdlc3JpLXRydW5jYXRlZC1hdHRyaWJ1dGlvbicpO1xuXG4gICAgLy8gdXBkYXRlIHRoZSB3aWR0aCB1c2VkIHRvIHRydW5jYXRlIHdoZW4gdGhlIG1hcCBpdHNlbGYgaXMgcmVzaXplZFxuICAgIG1hcC5vbigncmVzaXplJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuX2NvbnRhaW5lci5zdHlsZS5tYXhXaWR0aCA9IGNhbGNBdHRyaWJ1dGlvbldpZHRoKGUudGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIC8vIHJlbW92ZSBpbmplY3RlZCBzY3JpcHRzIGFuZCBzdHlsZSB0YWdzXG4gICAgbWFwLm9uKCd1bmxvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBob3ZlckF0dHJpYnV0aW9uU3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChob3ZlckF0dHJpYnV0aW9uU3R5bGUpO1xuICAgICAgYXR0cmlidXRpb25TdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGF0dHJpYnV0aW9uU3R5bGUpO1xuICAgICAgdmFyIG5vZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVzcmktbGVhZmxldC1qc29ucCcpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBub2RlTGlzdC5pdGVtKGkpLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZUxpc3QuaXRlbShpKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBtYXAuYXR0cmlidXRpb25Db250cm9sLl9lc3JpQXR0cmlidXRpb25BZGRlZCA9IHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9zZXRHZW9tZXRyeSAoZ2VvbWV0cnkpIHtcbiAgdmFyIHBhcmFtcyA9IHtcbiAgICBnZW9tZXRyeTogbnVsbCxcbiAgICBnZW9tZXRyeVR5cGU6IG51bGxcbiAgfTtcblxuICAvLyBjb252ZXJ0IGJvdW5kcyB0byBleHRlbnQgYW5kIGZpbmlzaFxuICBpZiAoZ2VvbWV0cnkgaW5zdGFuY2VvZiBMYXRMbmdCb3VuZHMpIHtcbiAgICAvLyBzZXQgZ2VvbWV0cnkgKyBnZW9tZXRyeVR5cGVcbiAgICBwYXJhbXMuZ2VvbWV0cnkgPSBib3VuZHNUb0V4dGVudChnZW9tZXRyeSk7XG4gICAgcGFyYW1zLmdlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlFbnZlbG9wZSc7XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8vIGNvbnZlcnQgTC5NYXJrZXIgPiBMLkxhdExuZ1xuICBpZiAoZ2VvbWV0cnkuZ2V0TGF0TG5nKSB7XG4gICAgZ2VvbWV0cnkgPSBnZW9tZXRyeS5nZXRMYXRMbmcoKTtcbiAgfVxuXG4gIC8vIGNvbnZlcnQgTC5MYXRMbmcgdG8gYSBnZW9qc29uIHBvaW50IGFuZCBjb250aW51ZTtcbiAgaWYgKGdlb21ldHJ5IGluc3RhbmNlb2YgTGF0TG5nKSB7XG4gICAgZ2VvbWV0cnkgPSB7XG4gICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgY29vcmRpbmF0ZXM6IFtnZW9tZXRyeS5sbmcsIGdlb21ldHJ5LmxhdF1cbiAgICB9O1xuICB9XG5cbiAgLy8gaGFuZGxlIEwuR2VvSlNPTiwgcHVsbCBvdXQgdGhlIGZpcnN0IGdlb21ldHJ5XG4gIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIEdlb0pTT04pIHtcbiAgICAvLyByZWFzc2lnbiBnZW9tZXRyeSB0byB0aGUgR2VvSlNPTiB2YWx1ZSAgKHdlIGFyZSBhc3N1bWluZyB0aGF0IG9ubHkgb25lIGZlYXR1cmUgaXMgcHJlc2VudClcbiAgICBnZW9tZXRyeSA9IGdlb21ldHJ5LmdldExheWVycygpWzBdLmZlYXR1cmUuZ2VvbWV0cnk7XG4gICAgcGFyYW1zLmdlb21ldHJ5ID0gZ2VvanNvblRvQXJjR0lTKGdlb21ldHJ5KTtcbiAgICBwYXJhbXMuZ2VvbWV0cnlUeXBlID0gZ2VvanNvblR5cGVUb0FyY0dJUyhnZW9tZXRyeS50eXBlKTtcbiAgfVxuXG4gIC8vIEhhbmRsZSBMLlBvbHlsaW5lIGFuZCBMLlBvbHlnb25cbiAgaWYgKGdlb21ldHJ5LnRvR2VvSlNPTikge1xuICAgIGdlb21ldHJ5ID0gZ2VvbWV0cnkudG9HZW9KU09OKCk7XG4gIH1cblxuICAvLyBoYW5kbGUgR2VvSlNPTiBmZWF0dXJlIGJ5IHB1bGxpbmcgb3V0IHRoZSBnZW9tZXRyeVxuICBpZiAoZ2VvbWV0cnkudHlwZSA9PT0gJ0ZlYXR1cmUnKSB7XG4gICAgLy8gZ2V0IHRoZSBnZW9tZXRyeSBvZiB0aGUgZ2VvanNvbiBmZWF0dXJlXG4gICAgZ2VvbWV0cnkgPSBnZW9tZXRyeS5nZW9tZXRyeTtcbiAgfVxuXG4gIC8vIGNvbmZpcm0gdGhhdCBvdXIgR2VvSlNPTiBpcyBhIHBvaW50LCBsaW5lIG9yIHBvbHlnb25cbiAgaWYgKGdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcgfHwgZ2VvbWV0cnkudHlwZSA9PT0gJ0xpbmVTdHJpbmcnIHx8IGdlb21ldHJ5LnR5cGUgPT09ICdQb2x5Z29uJyB8fCBnZW9tZXRyeS50eXBlID09PSAnTXVsdGlQb2x5Z29uJykge1xuICAgIHBhcmFtcy5nZW9tZXRyeSA9IGdlb2pzb25Ub0FyY0dJUyhnZW9tZXRyeSk7XG4gICAgcGFyYW1zLmdlb21ldHJ5VHlwZSA9IGdlb2pzb25UeXBlVG9BcmNHSVMoZ2VvbWV0cnkudHlwZSk7XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8vIHdhcm4gdGhlIHVzZXIgaWYgd2UgaGF2bid0IGZvdW5kIGFuIGFwcHJvcHJpYXRlIG9iamVjdFxuICB3YXJuKCdpbnZhbGlkIGdlb21ldHJ5IHBhc3NlZCB0byBzcGF0aWFsIHF1ZXJ5LiBTaG91bGQgYmUgTC5MYXRMbmcsIEwuTGF0TG5nQm91bmRzLCBMLk1hcmtlciBvciBhIEdlb0pTT04gUG9pbnQsIExpbmUsIFBvbHlnb24gb3IgTXVsdGlQb2x5Z29uIG9iamVjdCcpO1xuXG4gIHJldHVybjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRBdHRyaWJ1dGlvbkRhdGEgKHVybCwgbWFwKSB7XG4gIGpzb25wKHVybCwge30sIFV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIGF0dHJpYnV0aW9ucykge1xuICAgIGlmIChlcnJvcikgeyByZXR1cm47IH1cbiAgICBtYXAuX2VzcmlBdHRyaWJ1dGlvbnMgPSBbXTtcbiAgICBmb3IgKHZhciBjID0gMDsgYyA8IGF0dHJpYnV0aW9ucy5jb250cmlidXRvcnMubGVuZ3RoOyBjKyspIHtcbiAgICAgIHZhciBjb250cmlidXRvciA9IGF0dHJpYnV0aW9ucy5jb250cmlidXRvcnNbY107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udHJpYnV0b3IuY292ZXJhZ2VBcmVhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY292ZXJhZ2VBcmVhID0gY29udHJpYnV0b3IuY292ZXJhZ2VBcmVhc1tpXTtcbiAgICAgICAgdmFyIHNvdXRoV2VzdCA9IGxhdExuZyhjb3ZlcmFnZUFyZWEuYmJveFswXSwgY292ZXJhZ2VBcmVhLmJib3hbMV0pO1xuICAgICAgICB2YXIgbm9ydGhFYXN0ID0gbGF0TG5nKGNvdmVyYWdlQXJlYS5iYm94WzJdLCBjb3ZlcmFnZUFyZWEuYmJveFszXSk7XG4gICAgICAgIG1hcC5fZXNyaUF0dHJpYnV0aW9ucy5wdXNoKHtcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogY29udHJpYnV0b3IuYXR0cmlidXRpb24sXG4gICAgICAgICAgc2NvcmU6IGNvdmVyYWdlQXJlYS5zY29yZSxcbiAgICAgICAgICBib3VuZHM6IGxhdExuZ0JvdW5kcyhzb3V0aFdlc3QsIG5vcnRoRWFzdCksXG4gICAgICAgICAgbWluWm9vbTogY292ZXJhZ2VBcmVhLnpvb21NaW4sXG4gICAgICAgICAgbWF4Wm9vbTogY292ZXJhZ2VBcmVhLnpvb21NYXhcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWFwLl9lc3JpQXR0cmlidXRpb25zLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZTtcbiAgICB9KTtcblxuICAgIC8vIHBhc3MgdGhlIHNhbWUgYXJndW1lbnQgYXMgdGhlIG1hcCdzICdtb3ZlZW5kJyBldmVudFxuICAgIHZhciBvYmogPSB7IHRhcmdldDogbWFwIH07XG4gICAgX3VwZGF0ZU1hcEF0dHJpYnV0aW9uKG9iaik7XG4gIH0sIHRoaXMpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF91cGRhdGVNYXBBdHRyaWJ1dGlvbiAoZXZ0KSB7XG4gIHZhciBtYXAgPSBldnQudGFyZ2V0O1xuICB2YXIgb2xkQXR0cmlidXRpb25zID0gbWFwLl9lc3JpQXR0cmlidXRpb25zO1xuXG4gIGlmIChtYXAgJiYgbWFwLmF0dHJpYnV0aW9uQ29udHJvbCAmJiBvbGRBdHRyaWJ1dGlvbnMpIHtcbiAgICB2YXIgbmV3QXR0cmlidXRpb25zID0gJyc7XG4gICAgdmFyIGJvdW5kcyA9IG1hcC5nZXRCb3VuZHMoKTtcbiAgICB2YXIgd3JhcHBlZEJvdW5kcyA9IGxhdExuZ0JvdW5kcyhcbiAgICAgIGJvdW5kcy5nZXRTb3V0aFdlc3QoKS53cmFwKCksXG4gICAgICBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkud3JhcCgpXG4gICAgKTtcbiAgICB2YXIgem9vbSA9IG1hcC5nZXRab29tKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZEF0dHJpYnV0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGF0dHJpYnV0aW9uID0gb2xkQXR0cmlidXRpb25zW2ldO1xuICAgICAgdmFyIHRleHQgPSBhdHRyaWJ1dGlvbi5hdHRyaWJ1dGlvbjtcblxuICAgICAgaWYgKCFuZXdBdHRyaWJ1dGlvbnMubWF0Y2godGV4dCkgJiYgYXR0cmlidXRpb24uYm91bmRzLmludGVyc2VjdHMod3JhcHBlZEJvdW5kcykgJiYgem9vbSA+PSBhdHRyaWJ1dGlvbi5taW5ab29tICYmIHpvb20gPD0gYXR0cmlidXRpb24ubWF4Wm9vbSkge1xuICAgICAgICBuZXdBdHRyaWJ1dGlvbnMgKz0gKCcsICcgKyB0ZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdBdHRyaWJ1dGlvbnMgPSBuZXdBdHRyaWJ1dGlvbnMuc3Vic3RyKDIpO1xuICAgIHZhciBhdHRyaWJ1dGlvbkVsZW1lbnQgPSBtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIucXVlcnlTZWxlY3RvcignLmVzcmktZHluYW1pYy1hdHRyaWJ1dGlvbicpO1xuXG4gICAgYXR0cmlidXRpb25FbGVtZW50LmlubmVySFRNTCA9IG5ld0F0dHJpYnV0aW9ucztcbiAgICBhdHRyaWJ1dGlvbkVsZW1lbnQuc3R5bGUubWF4V2lkdGggPSBjYWxjQXR0cmlidXRpb25XaWR0aChtYXApO1xuXG4gICAgbWFwLmZpcmUoJ2F0dHJpYnV0aW9udXBkYXRlZCcsIHtcbiAgICAgIGF0dHJpYnV0aW9uOiBuZXdBdHRyaWJ1dGlvbnNcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIEVzcmlVdGlsID0ge1xuICB3YXJuOiB3YXJuLFxuICBjbGVhblVybDogY2xlYW5VcmwsXG4gIGdldFVybFBhcmFtczogZ2V0VXJsUGFyYW1zLFxuICBpc0FyY2dpc09ubGluZTogaXNBcmNnaXNPbmxpbmUsXG4gIGdlb2pzb25UeXBlVG9BcmNHSVM6IGdlb2pzb25UeXBlVG9BcmNHSVMsXG4gIHJlc3BvbnNlVG9GZWF0dXJlQ29sbGVjdGlvbjogcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uLFxuICBnZW9qc29uVG9BcmNHSVM6IGdlb2pzb25Ub0FyY0dJUyxcbiAgYXJjZ2lzVG9HZW9KU09OOiBhcmNnaXNUb0dlb0pTT04sXG4gIGJvdW5kc1RvRXh0ZW50OiBib3VuZHNUb0V4dGVudCxcbiAgZXh0ZW50VG9Cb3VuZHM6IGV4dGVudFRvQm91bmRzLFxuICBjYWxjQXR0cmlidXRpb25XaWR0aDogY2FsY0F0dHJpYnV0aW9uV2lkdGgsXG4gIHNldEVzcmlBdHRyaWJ1dGlvbjogc2V0RXNyaUF0dHJpYnV0aW9uLFxuICBfc2V0R2VvbWV0cnk6IF9zZXRHZW9tZXRyeSxcbiAgX2dldEF0dHJpYnV0aW9uRGF0YTogX2dldEF0dHJpYnV0aW9uRGF0YSxcbiAgX3VwZGF0ZU1hcEF0dHJpYnV0aW9uOiBfdXBkYXRlTWFwQXR0cmlidXRpb24sXG4gIF9maW5kSWRBdHRyaWJ1dGVGcm9tRmVhdHVyZTogX2ZpbmRJZEF0dHJpYnV0ZUZyb21GZWF0dXJlLFxuICBfZmluZElkQXR0cmlidXRlRnJvbVJlc3BvbnNlOiBfZmluZElkQXR0cmlidXRlRnJvbVJlc3BvbnNlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFc3JpVXRpbDtcbiIsImltcG9ydCB7IENsYXNzLCBVdGlsIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQge2NvcnN9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHsgY2xlYW5VcmwsIGdldFVybFBhcmFtcyB9IGZyb20gJy4uL1V0aWwnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vUmVxdWVzdCc7XG5cbmV4cG9ydCB2YXIgVGFzayA9IENsYXNzLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIHByb3h5OiBmYWxzZSxcbiAgICB1c2VDb3JzOiBjb3JzXG4gIH0sXG5cbiAgLy8gR2VuZXJhdGUgYSBtZXRob2QgZm9yIGVhY2ggbWV0aG9kTmFtZTpwYXJhbU5hbWUgaW4gdGhlIHNldHRlcnMgZm9yIHRoaXMgdGFzay5cbiAgZ2VuZXJhdGVTZXR0ZXI6IGZ1bmN0aW9uIChwYXJhbSwgY29udGV4dCkge1xuICAgIHJldHVybiBVdGlsLmJpbmQoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB0aGlzLnBhcmFtc1twYXJhbV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIGNvbnRleHQpO1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChlbmRwb2ludCkge1xuICAgIC8vIGVuZHBvaW50IGNhbiBiZSBlaXRoZXIgYSB1cmwgKGFuZCBvcHRpb25zKSBmb3IgYW4gQXJjR0lTIFJlc3QgU2VydmljZSBvciBhbiBpbnN0YW5jZSBvZiBFc3JpTGVhZmxldC5TZXJ2aWNlXG4gICAgaWYgKGVuZHBvaW50LnJlcXVlc3QgJiYgZW5kcG9pbnQub3B0aW9ucykge1xuICAgICAgdGhpcy5fc2VydmljZSA9IGVuZHBvaW50O1xuICAgICAgVXRpbC5zZXRPcHRpb25zKHRoaXMsIGVuZHBvaW50Lm9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBVdGlsLnNldE9wdGlvbnModGhpcywgZW5kcG9pbnQpO1xuICAgICAgdGhpcy5vcHRpb25zLnVybCA9IGNsZWFuVXJsKGVuZHBvaW50LnVybCk7XG4gICAgfVxuXG4gICAgLy8gY2xvbmUgZGVmYXVsdCBwYXJhbXMgaW50byB0aGlzIG9iamVjdFxuICAgIHRoaXMucGFyYW1zID0gVXRpbC5leHRlbmQoe30sIHRoaXMucGFyYW1zIHx8IHt9KTtcblxuICAgIC8vIGdlbmVyYXRlIHNldHRlciBtZXRob2RzIGJhc2VkIG9uIHRoZSBzZXR0ZXJzIG9iamVjdCBpbXBsaW1lbnRlZCBhIGNoaWxkIGNsYXNzXG4gICAgaWYgKHRoaXMuc2V0dGVycykge1xuICAgICAgZm9yICh2YXIgc2V0dGVyIGluIHRoaXMuc2V0dGVycykge1xuICAgICAgICB2YXIgcGFyYW0gPSB0aGlzLnNldHRlcnNbc2V0dGVyXTtcbiAgICAgICAgdGhpc1tzZXR0ZXJdID0gdGhpcy5nZW5lcmF0ZVNldHRlcihwYXJhbSwgdGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHRva2VuOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICBpZiAodGhpcy5fc2VydmljZSkge1xuICAgICAgdGhpcy5fc2VydmljZS5hdXRoZW50aWNhdGUodG9rZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcmFtcy50b2tlbiA9IHRva2VuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBBcmNHSVMgU2VydmVyIEZpbmQvSWRlbnRpZnkgMTAuNStcbiAgZm9ybWF0OiBmdW5jdGlvbiAoYm9vbGVhbikge1xuICAgIC8vIHVzZSBkb3VibGUgbmVnYXRpdmUgdG8gZXhwb3NlIGEgbW9yZSBpbnR1aXRpdmUgcG9zaXRpdmUgbWV0aG9kIG5hbWVcbiAgICB0aGlzLnBhcmFtcy5yZXR1cm5VbmZvcm1hdHRlZFZhbHVlcyA9ICFib29sZWFuO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJlcXVlc3Q6IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucmVxdWVzdFBhcmFtcykge1xuICAgICAgTC5leHRlbmQodGhpcy5wYXJhbXMsIHRoaXMub3B0aW9ucy5yZXF1ZXN0UGFyYW1zKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NlcnZpY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlLnJlcXVlc3QodGhpcy5wYXRoLCB0aGlzLnBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdyZXF1ZXN0JywgdGhpcy5wYXRoLCB0aGlzLnBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9LFxuXG4gIF9yZXF1ZXN0OiBmdW5jdGlvbiAobWV0aG9kLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdmFyIHVybCA9ICh0aGlzLm9wdGlvbnMucHJveHkpID8gdGhpcy5vcHRpb25zLnByb3h5ICsgJz8nICsgdGhpcy5vcHRpb25zLnVybCArIHBhdGggOiB0aGlzLm9wdGlvbnMudXJsICsgcGF0aDtcblxuICAgIGlmICgobWV0aG9kID09PSAnZ2V0JyB8fCBtZXRob2QgPT09ICdyZXF1ZXN0JykgJiYgIXRoaXMub3B0aW9ucy51c2VDb3JzKSB7XG4gICAgICByZXR1cm4gUmVxdWVzdC5nZXQuSlNPTlAodXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVxdWVzdFttZXRob2RdKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gdGFzayAob3B0aW9ucykge1xuICBvcHRpb25zID0gZ2V0VXJsUGFyYW1zKG9wdGlvbnMpO1xuICByZXR1cm4gbmV3IFRhc2sob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRhc2s7XG4iLCJpbXBvcnQgeyBwb2ludCwgbGF0TG5nIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi9UYXNrJztcbmltcG9ydCB7XG4gIHdhcm4sXG4gIHJlc3BvbnNlVG9GZWF0dXJlQ29sbGVjdGlvbixcbiAgaXNBcmNnaXNPbmxpbmUsXG4gIGV4dGVudFRvQm91bmRzLFxuICBfc2V0R2VvbWV0cnlcbn0gZnJvbSAnLi4vVXRpbCc7XG5cbmV4cG9ydCB2YXIgUXVlcnkgPSBUYXNrLmV4dGVuZCh7XG4gIHNldHRlcnM6IHtcbiAgICAnb2Zmc2V0JzogJ3Jlc3VsdE9mZnNldCcsXG4gICAgJ2xpbWl0JzogJ3Jlc3VsdFJlY29yZENvdW50JyxcbiAgICAnZmllbGRzJzogJ291dEZpZWxkcycsXG4gICAgJ3ByZWNpc2lvbic6ICdnZW9tZXRyeVByZWNpc2lvbicsXG4gICAgJ2ZlYXR1cmVJZHMnOiAnb2JqZWN0SWRzJyxcbiAgICAncmV0dXJuR2VvbWV0cnknOiAncmV0dXJuR2VvbWV0cnknLFxuICAgICdyZXR1cm5NJzogJ3JldHVybk0nLFxuICAgICd0cmFuc2Zvcm0nOiAnZGF0dW1UcmFuc2Zvcm1hdGlvbicsXG4gICAgJ3Rva2VuJzogJ3Rva2VuJ1xuICB9LFxuXG4gIHBhdGg6ICdxdWVyeScsXG5cbiAgcGFyYW1zOiB7XG4gICAgcmV0dXJuR2VvbWV0cnk6IHRydWUsXG4gICAgd2hlcmU6ICcxPTEnLFxuICAgIG91dFNyOiA0MzI2LFxuICAgIG91dEZpZWxkczogJyonXG4gIH0sXG5cbiAgLy8gUmV0dXJucyBhIGZlYXR1cmUgaWYgaXRzIHNoYXBlIGlzIHdob2xseSBjb250YWluZWQgd2l0aGluIHRoZSBzZWFyY2ggZ2VvbWV0cnkuIFZhbGlkIGZvciBhbGwgc2hhcGUgdHlwZSBjb21iaW5hdGlvbnMuXG4gIHdpdGhpbjogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnlQYXJhbXMoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxDb250YWlucyc7IC8vIHRvIHRoZSBSRVNUIGFwaSB0aGlzIHJlYWRzIGdlb21ldHJ5ICoqY29udGFpbnMqKiBsYXllclxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIFJldHVybnMgYSBmZWF0dXJlIGlmIGFueSBzcGF0aWFsIHJlbGF0aW9uc2hpcCBpcyBmb3VuZC4gQXBwbGllcyB0byBhbGwgc2hhcGUgdHlwZSBjb21iaW5hdGlvbnMuXG4gIGludGVyc2VjdHM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5UGFyYW1zKGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsSW50ZXJzZWN0cyc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8gUmV0dXJucyBhIGZlYXR1cmUgaWYgaXRzIHNoYXBlIHdob2xseSBjb250YWlucyB0aGUgc2VhcmNoIGdlb21ldHJ5LiBWYWxpZCBmb3IgYWxsIHNoYXBlIHR5cGUgY29tYmluYXRpb25zLlxuICBjb250YWluczogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnlQYXJhbXMoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxXaXRoaW4nOyAvLyB0byB0aGUgUkVTVCBhcGkgdGhpcyByZWFkcyBnZW9tZXRyeSAqKndpdGhpbioqIGxheWVyXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8gUmV0dXJucyBhIGZlYXR1cmUgaWYgdGhlIGludGVyc2VjdGlvbiBvZiB0aGUgaW50ZXJpb3JzIG9mIHRoZSB0d28gc2hhcGVzIGlzIG5vdCBlbXB0eSBhbmQgaGFzIGEgbG93ZXIgZGltZW5zaW9uIHRoYW4gdGhlIG1heGltdW0gZGltZW5zaW9uIG9mIHRoZSB0d28gc2hhcGVzLiBUd28gbGluZXMgdGhhdCBzaGFyZSBhbiBlbmRwb2ludCBpbiBjb21tb24gZG8gbm90IGNyb3NzLiBWYWxpZCBmb3IgTGluZS9MaW5lLCBMaW5lL0FyZWEsIE11bHRpLXBvaW50L0FyZWEsIGFuZCBNdWx0aS1wb2ludC9MaW5lIHNoYXBlIHR5cGUgY29tYmluYXRpb25zLlxuICBjcm9zc2VzOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeVBhcmFtcyhnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbENyb3NzZXMnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIFJldHVybnMgYSBmZWF0dXJlIGlmIHRoZSB0d28gc2hhcGVzIHNoYXJlIGEgY29tbW9uIGJvdW5kYXJ5LiBIb3dldmVyLCB0aGUgaW50ZXJzZWN0aW9uIG9mIHRoZSBpbnRlcmlvcnMgb2YgdGhlIHR3byBzaGFwZXMgbXVzdCBiZSBlbXB0eS4gSW4gdGhlIFBvaW50L0xpbmUgY2FzZSwgdGhlIHBvaW50IG1heSB0b3VjaCBhbiBlbmRwb2ludCBvbmx5IG9mIHRoZSBsaW5lLiBBcHBsaWVzIHRvIGFsbCBjb21iaW5hdGlvbnMgZXhjZXB0IFBvaW50L1BvaW50LlxuICB0b3VjaGVzOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeVBhcmFtcyhnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbFRvdWNoZXMnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIFJldHVybnMgYSBmZWF0dXJlIGlmIHRoZSBpbnRlcnNlY3Rpb24gb2YgdGhlIHR3byBzaGFwZXMgcmVzdWx0cyBpbiBhbiBvYmplY3Qgb2YgdGhlIHNhbWUgZGltZW5zaW9uLCBidXQgZGlmZmVyZW50IGZyb20gYm90aCBvZiB0aGUgc2hhcGVzLiBBcHBsaWVzIHRvIEFyZWEvQXJlYSwgTGluZS9MaW5lLCBhbmQgTXVsdGktcG9pbnQvTXVsdGktcG9pbnQgc2hhcGUgdHlwZSBjb21iaW5hdGlvbnMuXG4gIG92ZXJsYXBzOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeVBhcmFtcyhnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbE92ZXJsYXBzJztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBSZXR1cm5zIGEgZmVhdHVyZSBpZiB0aGUgZW52ZWxvcGUgb2YgdGhlIHR3byBzaGFwZXMgaW50ZXJzZWN0cy5cbiAgYmJveEludGVyc2VjdHM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5UGFyYW1zKGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsRW52ZWxvcGVJbnRlcnNlY3RzJztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBpZiBzb21lb25lIGNhbiBoZWxwIGRlY2lwaGVyIHRoZSBBcmNPYmplY3RzIGV4cGxhbmF0aW9uIGFuZCB0cmFuc2xhdGUgdG8gcGxhaW4gc3BlYWssIHdlIHNob3VsZCBtZW50aW9uIHRoaXMgbWV0aG9kIGluIHRoZSBkb2NcbiAgaW5kZXhJbnRlcnNlY3RzOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeVBhcmFtcyhnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbEluZGV4SW50ZXJzZWN0cyc7IC8vIFJldHVybnMgYSBmZWF0dXJlIGlmIHRoZSBlbnZlbG9wZSBvZiB0aGUgcXVlcnkgZ2VvbWV0cnkgaW50ZXJzZWN0cyB0aGUgaW5kZXggZW50cnkgZm9yIHRoZSB0YXJnZXQgZ2VvbWV0cnlcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBvbmx5IHZhbGlkIGZvciBGZWF0dXJlIFNlcnZpY2VzIHJ1bm5pbmcgb24gQXJjR0lTIFNlcnZlciAxMC4zKyBvciBBcmNHSVMgT25saW5lXG4gIG5lYXJieTogZnVuY3Rpb24gKGxhdGxuZywgcmFkaXVzKSB7XG4gICAgbGF0bG5nID0gbGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnkgPSBbbGF0bG5nLmxuZywgbGF0bG5nLmxhdF07XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvaW50JztcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsSW50ZXJzZWN0cyc7XG4gICAgdGhpcy5wYXJhbXMudW5pdHMgPSAnZXNyaVNSVW5pdF9NZXRlcic7XG4gICAgdGhpcy5wYXJhbXMuZGlzdGFuY2UgPSByYWRpdXM7XG4gICAgdGhpcy5wYXJhbXMuaW5TciA9IDQzMjY7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgd2hlcmU6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAvLyBpbnN0ZWFkIG9mIGNvbnZlcnRpbmcgZG91YmxlLXF1b3RlcyB0byBzaW5nbGUgcXVvdGVzLCBwYXNzIGFzIGlzLCBhbmQgcHJvdmlkZSBhIG1vcmUgaW5mb3JtYXRpdmUgbWVzc2FnZSBpZiBhIDQwMCBpcyBlbmNvdW50ZXJlZFxuICAgIHRoaXMucGFyYW1zLndoZXJlID0gc3RyaW5nO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGJldHdlZW46IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgdGhpcy5wYXJhbXMudGltZSA9IFtzdGFydC52YWx1ZU9mKCksIGVuZC52YWx1ZU9mKCldO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHNpbXBsaWZ5OiBmdW5jdGlvbiAobWFwLCBmYWN0b3IpIHtcbiAgICB2YXIgbWFwV2lkdGggPSBNYXRoLmFicyhtYXAuZ2V0Qm91bmRzKCkuZ2V0V2VzdCgpIC0gbWFwLmdldEJvdW5kcygpLmdldEVhc3QoKSk7XG4gICAgdGhpcy5wYXJhbXMubWF4QWxsb3dhYmxlT2Zmc2V0ID0gKG1hcFdpZHRoIC8gbWFwLmdldFNpemUoKS55KSAqIGZhY3RvcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvcmRlckJ5OiBmdW5jdGlvbiAoZmllbGROYW1lLCBvcmRlcikge1xuICAgIG9yZGVyID0gb3JkZXIgfHwgJ0FTQyc7XG4gICAgdGhpcy5wYXJhbXMub3JkZXJCeUZpZWxkcyA9ICh0aGlzLnBhcmFtcy5vcmRlckJ5RmllbGRzKSA/IHRoaXMucGFyYW1zLm9yZGVyQnlGaWVsZHMgKyAnLCcgOiAnJztcbiAgICB0aGlzLnBhcmFtcy5vcmRlckJ5RmllbGRzICs9IChbZmllbGROYW1lLCBvcmRlcl0pLmpvaW4oJyAnKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuX2NsZWFuUGFyYW1zKCk7XG5cbiAgICAvLyBzZXJ2aWNlcyBob3N0ZWQgb24gQXJjR0lTIE9ubGluZSBhbmQgQXJjR0lTIFNlcnZlciAxMC4zLjErIHN1cHBvcnQgcmVxdWVzdGluZyBnZW9qc29uIGRpcmVjdGx5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc01vZGVybiB8fCBpc0FyY2dpc09ubGluZSh0aGlzLm9wdGlvbnMudXJsKSkge1xuICAgICAgdGhpcy5wYXJhbXMuZiA9ICdnZW9qc29uJztcblxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuX3RyYXBTUUxlcnJvcnMoZXJyb3IpO1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSwgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyk7XG5cbiAgICAvLyBvdGhlcndpc2UgY29udmVydCBpdCBpbiB0aGUgY2FsbGJhY2sgdGhlbiBwYXNzIGl0IG9uXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgICB0aGlzLl90cmFwU1FMZXJyb3JzKGVycm9yKTtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgKHJlc3BvbnNlICYmIHJlc3BvbnNlVG9GZWF0dXJlQ29sbGVjdGlvbihyZXNwb25zZSkpLCByZXNwb25zZSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gIH0sXG5cbiAgY291bnQ6IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuX2NsZWFuUGFyYW1zKCk7XG4gICAgdGhpcy5wYXJhbXMucmV0dXJuQ291bnRPbmx5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZXJyb3IsIChyZXNwb25zZSAmJiByZXNwb25zZS5jb3VudCksIHJlc3BvbnNlKTtcbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICBpZHM6IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuX2NsZWFuUGFyYW1zKCk7XG4gICAgdGhpcy5wYXJhbXMucmV0dXJuSWRzT25seSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGVycm9yLCAocmVzcG9uc2UgJiYgcmVzcG9uc2Uub2JqZWN0SWRzKSwgcmVzcG9uc2UpO1xuICAgIH0sIGNvbnRleHQpO1xuICB9LFxuXG4gIC8vIG9ubHkgdmFsaWQgZm9yIEZlYXR1cmUgU2VydmljZXMgcnVubmluZyBvbiBBcmNHSVMgU2VydmVyIDEwLjMrIG9yIEFyY0dJUyBPbmxpbmVcbiAgYm91bmRzOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jbGVhblBhcmFtcygpO1xuICAgIHRoaXMucGFyYW1zLnJldHVybkV4dGVudE9ubHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmV4dGVudCAmJiBleHRlbnRUb0JvdW5kcyhyZXNwb25zZS5leHRlbnQpKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIGV4dGVudFRvQm91bmRzKHJlc3BvbnNlLmV4dGVudCksIHJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yID0ge1xuICAgICAgICAgIG1lc3NhZ2U6ICdJbnZhbGlkIEJvdW5kcydcbiAgICAgICAgfTtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgbnVsbCwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0sIGNvbnRleHQpO1xuICB9LFxuXG4gIGRpc3RpbmN0OiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gZ2VvbWV0cnkgbXVzdCBiZSBvbWl0dGVkIGZvciBxdWVyaWVzIHJlcXVlc3RpbmcgZGlzdGluY3QgdmFsdWVzXG4gICAgdGhpcy5wYXJhbXMucmV0dXJuR2VvbWV0cnkgPSBmYWxzZTtcbiAgICB0aGlzLnBhcmFtcy5yZXR1cm5EaXN0aW5jdFZhbHVlcyA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8gb25seSB2YWxpZCBmb3IgaW1hZ2Ugc2VydmljZXNcbiAgcGl4ZWxTaXplOiBmdW5jdGlvbiAocmF3UG9pbnQpIHtcbiAgICB2YXIgY2FzdFBvaW50ID0gcG9pbnQocmF3UG9pbnQpO1xuICAgIHRoaXMucGFyYW1zLnBpeGVsU2l6ZSA9IFtjYXN0UG9pbnQueCwgY2FzdFBvaW50LnldO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIG9ubHkgdmFsaWQgZm9yIG1hcCBzZXJ2aWNlc1xuICBsYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgdGhpcy5wYXRoID0gbGF5ZXIgKyAnL3F1ZXJ5JztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBfdHJhcFNRTGVycm9yczogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IuY29kZSA9PT0gJzQwMCcpIHtcbiAgICAgICAgd2Fybignb25lIGNvbW1vbiBzeW50YXggZXJyb3IgaW4gcXVlcnkgcmVxdWVzdHMgaXMgZW5jYXNpbmcgc3RyaW5nIHZhbHVlcyBpbiBkb3VibGUgcXVvdGVzIGluc3RlYWQgb2Ygc2luZ2xlIHF1b3RlcycpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfY2xlYW5QYXJhbXM6IGZ1bmN0aW9uICgpIHtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuSWRzT25seTtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuRXh0ZW50T25seTtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuQ291bnRPbmx5O1xuICB9LFxuXG4gIF9zZXRHZW9tZXRyeVBhcmFtczogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5wYXJhbXMuaW5TciA9IDQzMjY7XG4gICAgdmFyIGNvbnZlcnRlZCA9IF9zZXRHZW9tZXRyeShnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnkgPSBjb252ZXJ0ZWQuZ2VvbWV0cnk7XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnlUeXBlID0gY29udmVydGVkLmdlb21ldHJ5VHlwZTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5IChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgUXVlcnkob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHF1ZXJ5O1xuIiwiaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vVGFzayc7XG5pbXBvcnQgeyByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24gfSBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBGaW5kID0gVGFzay5leHRlbmQoe1xuICBzZXR0ZXJzOiB7XG4gICAgLy8gbWV0aG9kIG5hbWUgPiBwYXJhbSBuYW1lXG4gICAgJ2NvbnRhaW5zJzogJ2NvbnRhaW5zJyxcbiAgICAndGV4dCc6ICdzZWFyY2hUZXh0JyxcbiAgICAnZmllbGRzJzogJ3NlYXJjaEZpZWxkcycsIC8vIGRlbm90ZSBhbiBhcnJheSBvciBzaW5nbGUgc3RyaW5nXG4gICAgJ3NwYXRpYWxSZWZlcmVuY2UnOiAnc3InLFxuICAgICdzcic6ICdzcicsXG4gICAgJ2xheWVycyc6ICdsYXllcnMnLFxuICAgICdyZXR1cm5HZW9tZXRyeSc6ICdyZXR1cm5HZW9tZXRyeScsXG4gICAgJ21heEFsbG93YWJsZU9mZnNldCc6ICdtYXhBbGxvd2FibGVPZmZzZXQnLFxuICAgICdwcmVjaXNpb24nOiAnZ2VvbWV0cnlQcmVjaXNpb24nLFxuICAgICdkeW5hbWljTGF5ZXJzJzogJ2R5bmFtaWNMYXllcnMnLFxuICAgICdyZXR1cm5aJzogJ3JldHVyblonLFxuICAgICdyZXR1cm5NJzogJ3JldHVybk0nLFxuICAgICdnZGJWZXJzaW9uJzogJ2dkYlZlcnNpb24nLFxuICAgIC8vIHNraXBwZWQgaW1wbGVtZW50aW5nIHRoaXMgKGZvciBub3cpIGJlY2F1c2UgdGhlIFJFU1Qgc2VydmljZSBpbXBsZW1lbnRhdGlvbiBpc250IGNvbnNpc3RlbnQgYmV0d2VlbiBvcGVyYXRpb25zXG4gICAgLy8gJ3RyYW5zZm9ybSc6ICdkYXR1bVRyYW5zZm9ybWF0aW9ucycsXG4gICAgJ3Rva2VuJzogJ3Rva2VuJ1xuICB9LFxuXG4gIHBhdGg6ICdmaW5kJyxcblxuICBwYXJhbXM6IHtcbiAgICBzcjogNDMyNixcbiAgICBjb250YWluczogdHJ1ZSxcbiAgICByZXR1cm5HZW9tZXRyeTogdHJ1ZSxcbiAgICByZXR1cm5aOiB0cnVlLFxuICAgIHJldHVybk06IGZhbHNlXG4gIH0sXG5cbiAgbGF5ZXJEZWZzOiBmdW5jdGlvbiAoaWQsIHdoZXJlKSB7XG4gICAgdGhpcy5wYXJhbXMubGF5ZXJEZWZzID0gKHRoaXMucGFyYW1zLmxheWVyRGVmcykgPyB0aGlzLnBhcmFtcy5sYXllckRlZnMgKyAnOycgOiAnJztcbiAgICB0aGlzLnBhcmFtcy5sYXllckRlZnMgKz0gKFtpZCwgd2hlcmVdKS5qb2luKCc6Jyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2ltcGxpZnk6IGZ1bmN0aW9uIChtYXAsIGZhY3Rvcikge1xuICAgIHZhciBtYXBXaWR0aCA9IE1hdGguYWJzKG1hcC5nZXRCb3VuZHMoKS5nZXRXZXN0KCkgLSBtYXAuZ2V0Qm91bmRzKCkuZ2V0RWFzdCgpKTtcbiAgICB0aGlzLnBhcmFtcy5tYXhBbGxvd2FibGVPZmZzZXQgPSAobWFwV2lkdGggLyBtYXAuZ2V0U2l6ZSgpLnkpICogZmFjdG9yO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCAocmVzcG9uc2UgJiYgcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uKHJlc3BvbnNlKSksIHJlc3BvbnNlKTtcbiAgICB9LCBjb250ZXh0KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRmluZChvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmluZDtcbiIsImltcG9ydCB7IFRhc2sgfSBmcm9tICcuL1Rhc2snO1xuXG5leHBvcnQgdmFyIElkZW50aWZ5ID0gVGFzay5leHRlbmQoe1xuICBwYXRoOiAnaWRlbnRpZnknLFxuXG4gIGJldHdlZW46IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgdGhpcy5wYXJhbXMudGltZSA9IFtzdGFydC52YWx1ZU9mKCksIGVuZC52YWx1ZU9mKCldO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aWZ5IChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSWRlbnRpZnkob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlkZW50aWZ5O1xuIiwiaW1wb3J0IHsgbGF0TG5nIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBJZGVudGlmeSB9IGZyb20gJy4vSWRlbnRpZnknO1xuaW1wb3J0IHsgcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uLFxuICBib3VuZHNUb0V4dGVudCxcbiAgX3NldEdlb21ldHJ5XG59IGZyb20gJy4uL1V0aWwnO1xuXG5leHBvcnQgdmFyIElkZW50aWZ5RmVhdHVyZXMgPSBJZGVudGlmeS5leHRlbmQoe1xuICBzZXR0ZXJzOiB7XG4gICAgJ2xheWVycyc6ICdsYXllcnMnLFxuICAgICdwcmVjaXNpb24nOiAnZ2VvbWV0cnlQcmVjaXNpb24nLFxuICAgICd0b2xlcmFuY2UnOiAndG9sZXJhbmNlJyxcbiAgICAvLyBza2lwcGVkIGltcGxlbWVudGluZyB0aGlzIChmb3Igbm93KSBiZWNhdXNlIHRoZSBSRVNUIHNlcnZpY2UgaW1wbGVtZW50YXRpb24gaXNudCBjb25zaXN0ZW50IGJldHdlZW4gb3BlcmF0aW9ucy5cbiAgICAvLyAndHJhbnNmb3JtJzogJ2RhdHVtVHJhbnNmb3JtYXRpb25zJ1xuICAgICdyZXR1cm5HZW9tZXRyeSc6ICdyZXR1cm5HZW9tZXRyeSdcbiAgfSxcblxuICBwYXJhbXM6IHtcbiAgICBzcjogNDMyNixcbiAgICBsYXllcnM6ICdhbGwnLFxuICAgIHRvbGVyYW5jZTogMyxcbiAgICByZXR1cm5HZW9tZXRyeTogdHJ1ZVxuICB9LFxuXG4gIG9uOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgdmFyIGV4dGVudCA9IGJvdW5kc1RvRXh0ZW50KG1hcC5nZXRCb3VuZHMoKSk7XG4gICAgdmFyIHNpemUgPSBtYXAuZ2V0U2l6ZSgpO1xuICAgIHRoaXMucGFyYW1zLmltYWdlRGlzcGxheSA9IFtzaXplLngsIHNpemUueSwgOTZdO1xuICAgIHRoaXMucGFyYW1zLm1hcEV4dGVudCA9IFtleHRlbnQueG1pbiwgZXh0ZW50LnltaW4sIGV4dGVudC54bWF4LCBleHRlbnQueW1heF07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYXQ6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIC8vIGNhc3QgbGF0LCBsb25nIHBhaXJzIGluIHJhdyBhcnJheSBmb3JtIG1hbnVhbGx5XG4gICAgaWYgKGdlb21ldHJ5Lmxlbmd0aCA9PT0gMikge1xuICAgICAgZ2VvbWV0cnkgPSBsYXRMbmcoZ2VvbWV0cnkpO1xuICAgIH1cbiAgICB0aGlzLl9zZXRHZW9tZXRyeVBhcmFtcyhnZW9tZXRyeSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgbGF5ZXJEZWY6IGZ1bmN0aW9uIChpZCwgd2hlcmUpIHtcbiAgICB0aGlzLnBhcmFtcy5sYXllckRlZnMgPSAodGhpcy5wYXJhbXMubGF5ZXJEZWZzKSA/IHRoaXMucGFyYW1zLmxheWVyRGVmcyArICc7JyA6ICcnO1xuICAgIHRoaXMucGFyYW1zLmxheWVyRGVmcyArPSAoW2lkLCB3aGVyZV0pLmpvaW4oJzonKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBzaW1wbGlmeTogZnVuY3Rpb24gKG1hcCwgZmFjdG9yKSB7XG4gICAgdmFyIG1hcFdpZHRoID0gTWF0aC5hYnMobWFwLmdldEJvdW5kcygpLmdldFdlc3QoKSAtIG1hcC5nZXRCb3VuZHMoKS5nZXRFYXN0KCkpO1xuICAgIHRoaXMucGFyYW1zLm1heEFsbG93YWJsZU9mZnNldCA9IChtYXBXaWR0aCAvIG1hcC5nZXRTaXplKCkueSkgKiBmYWN0b3I7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcnVuOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIC8vIGltbWVkaWF0ZWx5IGludm9rZSB3aXRoIGFuIGVycm9yXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgdW5kZWZpbmVkLCByZXNwb25zZSk7XG4gICAgICAgIHJldHVybjtcblxuICAgICAgLy8gb2sgbm8gZXJyb3IgbGV0cyBqdXN0IGFzc3VtZSB3ZSBoYXZlIGZlYXR1cmVzLi4uXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZmVhdHVyZUNvbGxlY3Rpb24gPSByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24ocmVzcG9uc2UpO1xuICAgICAgICByZXNwb25zZS5yZXN1bHRzID0gcmVzcG9uc2UucmVzdWx0cy5yZXZlcnNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZmVhdHVyZSA9IGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzW2ldO1xuICAgICAgICAgIGZlYXR1cmUubGF5ZXJJZCA9IHJlc3BvbnNlLnJlc3VsdHNbaV0ubGF5ZXJJZDtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHVuZGVmaW5lZCwgZmVhdHVyZUNvbGxlY3Rpb24sIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBfc2V0R2VvbWV0cnlQYXJhbXM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHZhciBjb252ZXJ0ZWQgPSBfc2V0R2VvbWV0cnkoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gY29udmVydGVkLmdlb21ldHJ5O1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5VHlwZSA9IGNvbnZlcnRlZC5nZW9tZXRyeVR5cGU7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpZnlGZWF0dXJlcyAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IElkZW50aWZ5RmVhdHVyZXMob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlkZW50aWZ5RmVhdHVyZXM7XG4iLCJpbXBvcnQgeyBsYXRMbmcgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IElkZW50aWZ5IH0gZnJvbSAnLi9JZGVudGlmeSc7XG5pbXBvcnQgeyByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24gfSBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBJZGVudGlmeUltYWdlID0gSWRlbnRpZnkuZXh0ZW5kKHtcbiAgc2V0dGVyczoge1xuICAgICdzZXRNb3NhaWNSdWxlJzogJ21vc2FpY1J1bGUnLFxuICAgICdzZXRSZW5kZXJpbmdSdWxlJzogJ3JlbmRlcmluZ1J1bGUnLFxuICAgICdzZXRQaXhlbFNpemUnOiAncGl4ZWxTaXplJyxcbiAgICAncmV0dXJuQ2F0YWxvZ0l0ZW1zJzogJ3JldHVybkNhdGFsb2dJdGVtcycsXG4gICAgJ3JldHVybkdlb21ldHJ5JzogJ3JldHVybkdlb21ldHJ5J1xuICB9LFxuXG4gIHBhcmFtczoge1xuICAgIHJldHVybkdlb21ldHJ5OiBmYWxzZVxuICB9LFxuXG4gIGF0OiBmdW5jdGlvbiAobGF0bG5nKSB7XG4gICAgbGF0bG5nID0gbGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICB4OiBsYXRsbmcubG5nLFxuICAgICAgeTogbGF0bG5nLmxhdCxcbiAgICAgIHNwYXRpYWxSZWZlcmVuY2U6IHtcbiAgICAgICAgd2tpZDogNDMyNlxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2ludCc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0TW9zYWljUnVsZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnBhcmFtcy5tb3NhaWNSdWxlO1xuICB9LFxuXG4gIGdldFJlbmRlcmluZ1J1bGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXMucmVuZGVyaW5nUnVsZTtcbiAgfSxcblxuICBnZXRQaXhlbFNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXMucGl4ZWxTaXplO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCAocmVzcG9uc2UgJiYgdGhpcy5fcmVzcG9uc2VUb0dlb0pTT04ocmVzcG9uc2UpKSwgcmVzcG9uc2UpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIC8vIGdldCBwaXhlbCBkYXRhIGFuZCByZXR1cm4gYXMgZ2VvSlNPTiBwb2ludFxuICAvLyBwb3B1bGF0ZSBjYXRhbG9nIGl0ZW1zIChpZiBhbnkpXG4gIC8vIG1lcmdpbmcgaW4gYW55IGNhdGFsb2dJdGVtVmlzaWJpbGl0aWVzIGFzIGEgcHJvcGVyeSBvZiBlYWNoIGZlYXR1cmVcbiAgX3Jlc3BvbnNlVG9HZW9KU09OOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB2YXIgbG9jYXRpb24gPSByZXNwb25zZS5sb2NhdGlvbjtcbiAgICB2YXIgY2F0YWxvZ0l0ZW1zID0gcmVzcG9uc2UuY2F0YWxvZ0l0ZW1zO1xuICAgIHZhciBjYXRhbG9nSXRlbVZpc2liaWxpdGllcyA9IHJlc3BvbnNlLmNhdGFsb2dJdGVtVmlzaWJpbGl0aWVzO1xuICAgIHZhciBnZW9KU09OID0ge1xuICAgICAgJ3BpeGVsJzoge1xuICAgICAgICAndHlwZSc6ICdGZWF0dXJlJyxcbiAgICAgICAgJ2dlb21ldHJ5Jzoge1xuICAgICAgICAgICd0eXBlJzogJ1BvaW50JyxcbiAgICAgICAgICAnY29vcmRpbmF0ZXMnOiBbbG9jYXRpb24ueCwgbG9jYXRpb24ueV1cbiAgICAgICAgfSxcbiAgICAgICAgJ2Nycyc6IHtcbiAgICAgICAgICAndHlwZSc6ICdFUFNHJyxcbiAgICAgICAgICAncHJvcGVydGllcyc6IHtcbiAgICAgICAgICAgICdjb2RlJzogbG9jYXRpb24uc3BhdGlhbFJlZmVyZW5jZS53a2lkXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAncHJvcGVydGllcyc6IHtcbiAgICAgICAgICAnT0JKRUNUSUQnOiByZXNwb25zZS5vYmplY3RJZCxcbiAgICAgICAgICAnbmFtZSc6IHJlc3BvbnNlLm5hbWUsXG4gICAgICAgICAgJ3ZhbHVlJzogcmVzcG9uc2UudmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgJ2lkJzogcmVzcG9uc2Uub2JqZWN0SWRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHJlc3BvbnNlLnByb3BlcnRpZXMgJiYgcmVzcG9uc2UucHJvcGVydGllcy5WYWx1ZXMpIHtcbiAgICAgIGdlb0pTT04ucGl4ZWwucHJvcGVydGllcy52YWx1ZXMgPSByZXNwb25zZS5wcm9wZXJ0aWVzLlZhbHVlcztcbiAgICB9XG5cbiAgICBpZiAoY2F0YWxvZ0l0ZW1zICYmIGNhdGFsb2dJdGVtcy5mZWF0dXJlcykge1xuICAgICAgZ2VvSlNPTi5jYXRhbG9nSXRlbXMgPSByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24oY2F0YWxvZ0l0ZW1zKTtcbiAgICAgIGlmIChjYXRhbG9nSXRlbVZpc2liaWxpdGllcyAmJiBjYXRhbG9nSXRlbVZpc2liaWxpdGllcy5sZW5ndGggPT09IGdlb0pTT04uY2F0YWxvZ0l0ZW1zLmZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKHZhciBpID0gY2F0YWxvZ0l0ZW1WaXNpYmlsaXRpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBnZW9KU09OLmNhdGFsb2dJdGVtcy5mZWF0dXJlc1tpXS5wcm9wZXJ0aWVzLmNhdGFsb2dJdGVtVmlzaWJpbGl0eSA9IGNhdGFsb2dJdGVtVmlzaWJpbGl0aWVzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBnZW9KU09OO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpZnlJbWFnZSAocGFyYW1zKSB7XG4gIHJldHVybiBuZXcgSWRlbnRpZnlJbWFnZShwYXJhbXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpZGVudGlmeUltYWdlO1xuIiwiaW1wb3J0IHsgVXRpbCwgRXZlbnRlZCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHtjb3JzfSBmcm9tICcuLi9TdXBwb3J0JztcbmltcG9ydCB7Y2xlYW5VcmwsIGdldFVybFBhcmFtc30gZnJvbSAnLi4vVXRpbCc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9SZXF1ZXN0JztcblxuZXhwb3J0IHZhciBTZXJ2aWNlID0gRXZlbnRlZC5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBwcm94eTogZmFsc2UsXG4gICAgdXNlQ29yczogY29ycyxcbiAgICB0aW1lb3V0OiAwXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLl9yZXF1ZXN0UXVldWUgPSBbXTtcbiAgICB0aGlzLl9hdXRoZW50aWNhdGluZyA9IGZhbHNlO1xuICAgIFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLm9wdGlvbnMudXJsID0gY2xlYW5VcmwodGhpcy5vcHRpb25zLnVybCk7XG4gIH0sXG5cbiAgZ2V0OiBmdW5jdGlvbiAocGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdnZXQnLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfSxcblxuICBwb3N0OiBmdW5jdGlvbiAocGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdwb3N0JywgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH0sXG5cbiAgcmVxdWVzdDogZnVuY3Rpb24gKHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgncmVxdWVzdCcsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9LFxuXG4gIG1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnZ2V0JywgJycsIHt9LCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH0sXG5cbiAgYXV0aGVudGljYXRlOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0aGlzLl9hdXRoZW50aWNhdGluZyA9IGZhbHNlO1xuICAgIHRoaXMub3B0aW9ucy50b2tlbiA9IHRva2VuO1xuICAgIHRoaXMuX3J1blF1ZXVlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0VGltZW91dDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudGltZW91dDtcbiAgfSxcblxuICBzZXRUaW1lb3V0OiBmdW5jdGlvbiAodGltZW91dCkge1xuICAgIHRoaXMub3B0aW9ucy50aW1lb3V0ID0gdGltZW91dDtcbiAgfSxcblxuICBfcmVxdWVzdDogZnVuY3Rpb24gKG1ldGhvZCwgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuZmlyZSgncmVxdWVzdHN0YXJ0Jywge1xuICAgICAgdXJsOiB0aGlzLm9wdGlvbnMudXJsICsgcGF0aCxcbiAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgbWV0aG9kOiBtZXRob2RcbiAgICB9LCB0cnVlKTtcblxuICAgIHZhciB3cmFwcGVkQ2FsbGJhY2sgPSB0aGlzLl9jcmVhdGVTZXJ2aWNlQ2FsbGJhY2sobWV0aG9kLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIHBhcmFtcy50b2tlbiA9IHRoaXMub3B0aW9ucy50b2tlbjtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZXF1ZXN0UGFyYW1zKSB7XG4gICAgICBMLmV4dGVuZChwYXJhbXMsIHRoaXMub3B0aW9ucy5yZXF1ZXN0UGFyYW1zKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2F1dGhlbnRpY2F0aW5nKSB7XG4gICAgICB0aGlzLl9yZXF1ZXN0UXVldWUucHVzaChbbWV0aG9kLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0XSk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cmwgPSAodGhpcy5vcHRpb25zLnByb3h5KSA/IHRoaXMub3B0aW9ucy5wcm94eSArICc/JyArIHRoaXMub3B0aW9ucy51cmwgKyBwYXRoIDogdGhpcy5vcHRpb25zLnVybCArIHBhdGg7XG5cbiAgICAgIGlmICgobWV0aG9kID09PSAnZ2V0JyB8fCBtZXRob2QgPT09ICdyZXF1ZXN0JykgJiYgIXRoaXMub3B0aW9ucy51c2VDb3JzKSB7XG4gICAgICAgIHJldHVybiBSZXF1ZXN0LmdldC5KU09OUCh1cmwsIHBhcmFtcywgd3JhcHBlZENhbGxiYWNrLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBSZXF1ZXN0W21ldGhvZF0odXJsLCBwYXJhbXMsIHdyYXBwZWRDYWxsYmFjaywgY29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9jcmVhdGVTZXJ2aWNlQ2FsbGJhY2s6IGZ1bmN0aW9uIChtZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChlcnJvciAmJiAoZXJyb3IuY29kZSA9PT0gNDk5IHx8IGVycm9yLmNvZGUgPT09IDQ5OCkpIHtcbiAgICAgICAgdGhpcy5fYXV0aGVudGljYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX3JlcXVlc3RRdWV1ZS5wdXNoKFttZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHRdKTtcblxuICAgICAgICAvLyBmaXJlIGFuIGV2ZW50IGZvciB1c2VycyB0byBoYW5kbGUgYW5kIHJlLWF1dGhlbnRpY2F0ZVxuICAgICAgICB0aGlzLmZpcmUoJ2F1dGhlbnRpY2F0aW9ucmVxdWlyZWQnLCB7XG4gICAgICAgICAgYXV0aGVudGljYXRlOiBVdGlsLmJpbmQodGhpcy5hdXRoZW50aWNhdGUsIHRoaXMpXG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIC8vIGlmIHRoZSB1c2VyIGhhcyBhY2Nlc3MgdG8gYSBjYWxsYmFjayB0aGV5IGNhbiBoYW5kbGUgdGhlIGF1dGggZXJyb3JcbiAgICAgICAgZXJyb3IuYXV0aGVudGljYXRlID0gVXRpbC5iaW5kKHRoaXMuYXV0aGVudGljYXRlLCB0aGlzKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5maXJlKCdyZXF1ZXN0ZXJyb3InLCB7XG4gICAgICAgICAgdXJsOiB0aGlzLm9wdGlvbnMudXJsICsgcGF0aCxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuICAgICAgICAgIGNvZGU6IGVycm9yLmNvZGUsXG4gICAgICAgICAgbWV0aG9kOiBtZXRob2RcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpcmUoJ3JlcXVlc3RzdWNjZXNzJywge1xuICAgICAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLFxuICAgICAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmUoJ3JlcXVlc3RlbmQnLCB7XG4gICAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZFxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX3J1blF1ZXVlOiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgaSA9IHRoaXMuX3JlcXVlc3RRdWV1ZS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIHJlcXVlc3QgPSB0aGlzLl9yZXF1ZXN0UXVldWVbaV07XG4gICAgICB2YXIgbWV0aG9kID0gcmVxdWVzdC5zaGlmdCgpO1xuICAgICAgdGhpc1ttZXRob2RdLmFwcGx5KHRoaXMsIHJlcXVlc3QpO1xuICAgIH1cbiAgICB0aGlzLl9yZXF1ZXN0UXVldWUgPSBbXTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJ2aWNlIChvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBnZXRVcmxQYXJhbXMob3B0aW9ucyk7XG4gIHJldHVybiBuZXcgU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VydmljZTtcbiIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuL1NlcnZpY2UnO1xuaW1wb3J0IGlkZW50aWZ5RmVhdHVyZXMgZnJvbSAnLi4vVGFza3MvSWRlbnRpZnlGZWF0dXJlcyc7XG5pbXBvcnQgcXVlcnkgZnJvbSAnLi4vVGFza3MvUXVlcnknO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi4vVGFza3MvRmluZCc7XG5cbmV4cG9ydCB2YXIgTWFwU2VydmljZSA9IFNlcnZpY2UuZXh0ZW5kKHtcblxuICBpZGVudGlmeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBpZGVudGlmeUZlYXR1cmVzKHRoaXMpO1xuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmluZCh0aGlzKTtcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBxdWVyeSh0aGlzKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFNlcnZpY2UgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBNYXBTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBTZXJ2aWNlO1xuIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4vU2VydmljZSc7XG5pbXBvcnQgaWRlbnRpZnlJbWFnZSBmcm9tICcuLi9UYXNrcy9JZGVudGlmeUltYWdlJztcbmltcG9ydCBxdWVyeSBmcm9tICcuLi9UYXNrcy9RdWVyeSc7XG5cbmV4cG9ydCB2YXIgSW1hZ2VTZXJ2aWNlID0gU2VydmljZS5leHRlbmQoe1xuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHF1ZXJ5KHRoaXMpO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGlkZW50aWZ5SW1hZ2UodGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VTZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSW1hZ2VTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbWFnZVNlcnZpY2U7XG4iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi9TZXJ2aWNlJztcbmltcG9ydCBxdWVyeSBmcm9tICcuLi9UYXNrcy9RdWVyeSc7XG5pbXBvcnQgeyBnZW9qc29uVG9BcmNHSVMgfSBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBGZWF0dXJlTGF5ZXJTZXJ2aWNlID0gU2VydmljZS5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBpZEF0dHJpYnV0ZTogJ09CSkVDVElEJ1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHF1ZXJ5KHRoaXMpO1xuICB9LFxuXG4gIGFkZEZlYXR1cmU6IGZ1bmN0aW9uIChmZWF0dXJlLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGRlbGV0ZSBmZWF0dXJlLmlkO1xuXG4gICAgZmVhdHVyZSA9IGdlb2pzb25Ub0FyY0dJUyhmZWF0dXJlKTtcblxuICAgIHJldHVybiB0aGlzLnBvc3QoJ2FkZEZlYXR1cmVzJywge1xuICAgICAgZmVhdHVyZXM6IFtmZWF0dXJlXVxuICAgIH0sIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuYWRkUmVzdWx0cykgPyByZXNwb25zZS5hZGRSZXN1bHRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuYWRkUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICB1cGRhdGVGZWF0dXJlOiBmdW5jdGlvbiAoZmVhdHVyZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBmZWF0dXJlID0gZ2VvanNvblRvQXJjR0lTKGZlYXR1cmUsIHRoaXMub3B0aW9ucy5pZEF0dHJpYnV0ZSk7XG5cbiAgICByZXR1cm4gdGhpcy5wb3N0KCd1cGRhdGVGZWF0dXJlcycsIHtcbiAgICAgIGZlYXR1cmVzOiBbZmVhdHVyZV1cbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gKHJlc3BvbnNlICYmIHJlc3BvbnNlLnVwZGF0ZVJlc3VsdHMpID8gcmVzcG9uc2UudXBkYXRlUmVzdWx0c1swXSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yIHx8IHJlc3BvbnNlLnVwZGF0ZVJlc3VsdHNbMF0uZXJyb3IsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgZGVsZXRlRmVhdHVyZTogZnVuY3Rpb24gKGlkLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnBvc3QoJ2RlbGV0ZUZlYXR1cmVzJywge1xuICAgICAgb2JqZWN0SWRzOiBpZFxuICAgIH0sIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGVsZXRlUmVzdWx0cykgPyByZXNwb25zZS5kZWxldGVSZXN1bHRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuZGVsZXRlUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICBkZWxldGVGZWF0dXJlczogZnVuY3Rpb24gKGlkcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5wb3N0KCdkZWxldGVGZWF0dXJlcycsIHtcbiAgICAgIG9iamVjdElkczogaWRzXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgLy8gcGFzcyBiYWNrIHRoZSBlbnRpcmUgYXJyYXlcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGVsZXRlUmVzdWx0cykgPyByZXNwb25zZS5kZWxldGVSZXN1bHRzIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuZGVsZXRlUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlTGF5ZXJTZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRmVhdHVyZUxheWVyU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmVhdHVyZUxheWVyU2VydmljZTtcbiIsImltcG9ydCB7IFRpbGVMYXllciwgVXRpbCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgcG9pbnRlckV2ZW50cyB9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHtcbiAgc2V0RXNyaUF0dHJpYnV0aW9uLFxuICBfZ2V0QXR0cmlidXRpb25EYXRhLFxuICBfdXBkYXRlTWFwQXR0cmlidXRpb25cbn0gZnJvbSAnLi4vVXRpbCc7XG5cbnZhciB0aWxlUHJvdG9jb2wgPSAod2luZG93LmxvY2F0aW9uLnByb3RvY29sICE9PSAnaHR0cHM6JykgPyAnaHR0cDonIDogJ2h0dHBzOic7XG5cbmV4cG9ydCB2YXIgQmFzZW1hcExheWVyID0gVGlsZUxheWVyLmV4dGVuZCh7XG4gIHN0YXRpY3M6IHtcbiAgICBUSUxFUzoge1xuICAgICAgU3RyZWV0czoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfU3RyZWV0X01hcC9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE5LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdVU0dTLCBOT0FBJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvblVybDogJ2h0dHBzOi8vc3RhdGljLmFyY2dpcy5jb20vYXR0cmlidXRpb24vV29ybGRfU3RyZWV0X01hcCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFRvcG9ncmFwaGljOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Xb3JsZF9Ub3BvX01hcC9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE5LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdVU0dTLCBOT0FBJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvblVybDogJ2h0dHBzOi8vc3RhdGljLmFyY2dpcy5jb20vYXR0cmlidXRpb24vV29ybGRfVG9wb19NYXAnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBPY2VhbnM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL2FyY2dpcy9yZXN0L3NlcnZpY2VzL09jZWFuL1dvcmxkX09jZWFuX0Jhc2UvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnVVNHUywgTk9BQScsXG4gICAgICAgICAgYXR0cmlidXRpb25Vcmw6ICdodHRwczovL3N0YXRpYy5hcmNnaXMuY29tL2F0dHJpYnV0aW9uL09jZWFuX0Jhc2VtYXAnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBPY2VhbnNMYWJlbHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL2FyY2dpcy9yZXN0L3NlcnZpY2VzL09jZWFuL1dvcmxkX09jZWFuX1JlZmVyZW5jZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgcGFuZTogKHBvaW50ZXJFdmVudHMpID8gJ2VzcmktbGFiZWxzJyA6ICd0aWxlUGFuZSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIE5hdGlvbmFsR2VvZ3JhcGhpYzoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvTmF0R2VvX1dvcmxkX01hcC9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdOYXRpb25hbCBHZW9ncmFwaGljLCBEZUxvcm1lLCBIRVJFLCBVTkVQLVdDTUMsIFVTR1MsIE5BU0EsIEVTQSwgTUVUSSwgTlJDQU4sIEdFQkNPLCBOT0FBLCBpbmNyZW1lbnQgUCBDb3JwLidcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIERhcmtHcmF5OiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9DYW52YXMvV29ybGRfRGFya19HcmF5X0Jhc2UvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSEVSRSwgRGVMb3JtZSwgTWFwbXlJbmRpYSwgJmNvcHk7IE9wZW5TdHJlZXRNYXAgY29udHJpYnV0b3JzJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgRGFya0dyYXlMYWJlbHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0NhbnZhcy9Xb3JsZF9EYXJrX0dyYXlfUmVmZXJlbmNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJydcblxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgR3JheToge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvQ2FudmFzL1dvcmxkX0xpZ2h0X0dyYXlfQmFzZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdIRVJFLCBEZUxvcm1lLCBNYXBteUluZGlhLCAmY29weTsgT3BlblN0cmVldE1hcCBjb250cmlidXRvcnMnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBHcmF5TGFiZWxzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9DYW52YXMvV29ybGRfTGlnaHRfR3JheV9SZWZlcmVuY2UvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgSW1hZ2VyeToge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfSW1hZ2VyeS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE5LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdEaWdpdGFsR2xvYmUsIEdlb0V5ZSwgaS1jdWJlZCwgVVNEQSwgVVNHUywgQUVYLCBHZXRtYXBwaW5nLCBBZXJvZ3JpZCwgSUdOLCBJR1AsIHN3aXNzdG9wbywgYW5kIHRoZSBHSVMgVXNlciBDb21tdW5pdHknXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBJbWFnZXJ5TGFiZWxzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9SZWZlcmVuY2UvV29ybGRfQm91bmRhcmllc19hbmRfUGxhY2VzL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTksXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIEltYWdlcnlUcmFuc3BvcnRhdGlvbjoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvUmVmZXJlbmNlL1dvcmxkX1RyYW5zcG9ydGF0aW9uL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTksXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgU2hhZGVkUmVsaWVmOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Xb3JsZF9TaGFkZWRfUmVsaWVmL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTMsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBTaGFkZWRSZWxpZWZMYWJlbHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1JlZmVyZW5jZS9Xb3JsZF9Cb3VuZGFyaWVzX2FuZF9QbGFjZXNfQWx0ZXJuYXRlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTIsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFRlcnJhaW46IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX1RlcnJhaW5fQmFzZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDEzLFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdVU0dTLCBOT0FBJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgVGVycmFpbkxhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvUmVmZXJlbmNlL1dvcmxkX1JlZmVyZW5jZV9PdmVybGF5L01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTMsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFVTQVRvcG86IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1VTQV9Ub3BvX01hcHMvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnVVNHUywgTmF0aW9uYWwgR2VvZ3JhcGhpYyBTb2NpZXR5LCBpLWN1YmVkJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChrZXksIG9wdGlvbnMpIHtcbiAgICB2YXIgY29uZmlnO1xuXG4gICAgLy8gc2V0IHRoZSBjb25maWcgdmFyaWFibGUgd2l0aCB0aGUgYXBwcm9wcmlhdGUgY29uZmlnIG9iamVjdFxuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0JyAmJiBrZXkudXJsVGVtcGxhdGUgJiYga2V5Lm9wdGlvbnMpIHtcbiAgICAgIGNvbmZpZyA9IGtleTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnICYmIEJhc2VtYXBMYXllci5USUxFU1trZXldKSB7XG4gICAgICBjb25maWcgPSBCYXNlbWFwTGF5ZXIuVElMRVNba2V5XTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMLmVzcmkuQmFzZW1hcExheWVyOiBJbnZhbGlkIHBhcmFtZXRlci4gVXNlIG9uZSBvZiBcIlN0cmVldHNcIiwgXCJUb3BvZ3JhcGhpY1wiLCBcIk9jZWFuc1wiLCBcIk9jZWFuc0xhYmVsc1wiLCBcIk5hdGlvbmFsR2VvZ3JhcGhpY1wiLCBcIkdyYXlcIiwgXCJHcmF5TGFiZWxzXCIsIFwiRGFya0dyYXlcIiwgXCJEYXJrR3JheUxhYmVsc1wiLCBcIkltYWdlcnlcIiwgXCJJbWFnZXJ5TGFiZWxzXCIsIFwiSW1hZ2VyeVRyYW5zcG9ydGF0aW9uXCIsIFwiU2hhZGVkUmVsaWVmXCIsIFwiU2hhZGVkUmVsaWVmTGFiZWxzXCIsIFwiVGVycmFpblwiLCBcIlRlcnJhaW5MYWJlbHNcIiBvciBcIlVTQVRvcG9cIicpO1xuICAgIH1cblxuICAgIC8vIG1lcmdlIHBhc3NlZCBvcHRpb25zIGludG8gdGhlIGNvbmZpZyBvcHRpb25zXG4gICAgdmFyIHRpbGVPcHRpb25zID0gVXRpbC5leHRlbmQoY29uZmlnLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgVXRpbC5zZXRPcHRpb25zKHRoaXMsIHRpbGVPcHRpb25zKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIGNvbmZpZy51cmxUZW1wbGF0ZSArPSAoJz90b2tlbj0nICsgdGhpcy5vcHRpb25zLnRva2VuKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsIHRoZSBpbml0aWFsaXplIG1ldGhvZCBvbiBMLlRpbGVMYXllciB0byBzZXQgZXZlcnl0aGluZyB1cFxuICAgIFRpbGVMYXllci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIGNvbmZpZy51cmxUZW1wbGF0ZSwgdGlsZU9wdGlvbnMpO1xuICB9LFxuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgLy8gaW5jbHVkZSAnUG93ZXJlZCBieSBFc3JpJyBpbiBtYXAgYXR0cmlidXRpb25cbiAgICBzZXRFc3JpQXR0cmlidXRpb24obWFwKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucGFuZSA9PT0gJ2VzcmktbGFiZWxzJykge1xuICAgICAgdGhpcy5faW5pdFBhbmUoKTtcbiAgICB9XG4gICAgLy8gc29tZSBiYXNlbWFwcyBjYW4gc3VwcGx5IGR5bmFtaWMgYXR0cmlidXRpb25cbiAgICBpZiAodGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uVXJsKSB7XG4gICAgICBfZ2V0QXR0cmlidXRpb25EYXRhKHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvblVybCwgbWFwKTtcbiAgICB9XG5cbiAgICBtYXAub24oJ21vdmVlbmQnLCBfdXBkYXRlTWFwQXR0cmlidXRpb24pO1xuXG4gICAgVGlsZUxheWVyLnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBtYXAub2ZmKCdtb3ZlZW5kJywgX3VwZGF0ZU1hcEF0dHJpYnV0aW9uKTtcbiAgICBUaWxlTGF5ZXIucHJvdG90eXBlLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcbiAgfSxcblxuICBfaW5pdFBhbmU6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX21hcC5nZXRQYW5lKHRoaXMub3B0aW9ucy5wYW5lKSkge1xuICAgICAgdmFyIHBhbmUgPSB0aGlzLl9tYXAuY3JlYXRlUGFuZSh0aGlzLm9wdGlvbnMucGFuZSk7XG4gICAgICBwYW5lLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICBwYW5lLnN0eWxlLnpJbmRleCA9IDUwMDtcbiAgICB9XG4gIH0sXG5cbiAgZ2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uKSB7XG4gICAgICB2YXIgYXR0cmlidXRpb24gPSAnPHNwYW4gY2xhc3M9XCJlc3JpLWR5bmFtaWMtYXR0cmlidXRpb25cIj4nICsgdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uICsgJzwvc3Bhbj4nO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cmlidXRpb247XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gYmFzZW1hcExheWVyIChrZXksIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBCYXNlbWFwTGF5ZXIoa2V5LCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZW1hcExheWVyO1xuIiwiaW1wb3J0IHsgVGlsZUxheWVyLCBVdGlsIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyB3YXJuLCBnZXRVcmxQYXJhbXMsIHNldEVzcmlBdHRyaWJ1dGlvbiB9IGZyb20gJy4uL1V0aWwnO1xuaW1wb3J0IG1hcFNlcnZpY2UgZnJvbSAnLi4vU2VydmljZXMvTWFwU2VydmljZSc7XG5cbmV4cG9ydCB2YXIgVGlsZWRNYXBMYXllciA9IFRpbGVMYXllci5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgem9vbU9mZnNldEFsbG93YW5jZTogMC4xLFxuICAgIGVycm9yVGlsZVVybDogJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBUUFBQUFFQUJBTUFBQUN1WExWVkFBQUFBMUJNVkVVek5EVnN6bEhIQUFBQUFYUlNUbE1BUU9iWVpnQUFBQWx3U0ZsekFBQUFBQUFBQUFBQjZtVVdwQUFBQURaSlJFRlVlSnp0d1FFQkFBQUFnaUQvcjI1SVFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBN3dhQkFBQUJ3MDhSd0FBQUFBQkpSVTVFcmtKZ2dnPT0nXG4gIH0sXG5cbiAgc3RhdGljczoge1xuICAgIE1lcmNhdG9yWm9vbUxldmVsczoge1xuICAgICAgJzAnOiAxNTY1NDMuMDMzOTI3OTk5OTksXG4gICAgICAnMSc6IDc4MjcxLjUxNjk2Mzk5OTg5MyxcbiAgICAgICcyJzogMzkxMzUuNzU4NDgyMDAwMDk5LFxuICAgICAgJzMnOiAxOTU2Ny44NzkyNDA5OTk5MDEsXG4gICAgICAnNCc6IDk3ODMuOTM5NjIwNDk5OTU5MyxcbiAgICAgICc1JzogNDg5MS45Njk4MTAyNDk5Nzk3LFxuICAgICAgJzYnOiAyNDQ1Ljk4NDkwNTEyNDk4OTgsXG4gICAgICAnNyc6IDEyMjIuOTkyNDUyNTYyNDg5OSxcbiAgICAgICc4JzogNjExLjQ5NjIyNjI4MTM4MDAyLFxuICAgICAgJzknOiAzMDUuNzQ4MTEzMTQwNTU4MDIsXG4gICAgICAnMTAnOiAxNTIuODc0MDU2NTcwNDExLFxuICAgICAgJzExJzogNzYuNDM3MDI4Mjg1MDczMTk3LFxuICAgICAgJzEyJzogMzguMjE4NTE0MTQyNTM2NTk4LFxuICAgICAgJzEzJzogMTkuMTA5MjU3MDcxMjY4Mjk5LFxuICAgICAgJzE0JzogOS41NTQ2Mjg1MzU2MzQxNDk2LFxuICAgICAgJzE1JzogNC43NzczMTQyNjc5NDkzNjk5LFxuICAgICAgJzE2JzogMi4zODg2NTcxMzM5NzQ2OCxcbiAgICAgICcxNyc6IDEuMTk0MzI4NTY2ODU1MDUwMSxcbiAgICAgICcxOCc6IDAuNTk3MTY0MjgzNTU5ODE2OTksXG4gICAgICAnMTknOiAwLjI5ODU4MjE0MTY0NzYxNjk4LFxuICAgICAgJzIwJzogMC4xNDkyOTEwNzA4MjM4MSxcbiAgICAgICcyMSc6IDAuMDc0NjQ1NTM1NDExOTEsXG4gICAgICAnMjInOiAwLjAzNzMyMjc2NzcwNTk1MjUsXG4gICAgICAnMjMnOiAwLjAxODY2MTM4Mzg1Mjk3NjNcbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgLy8gc2V0IHRoZSB1cmxzXG4gICAgb3B0aW9ucyA9IGdldFVybFBhcmFtcyhvcHRpb25zKTtcbiAgICB0aGlzLnRpbGVVcmwgPSBvcHRpb25zLnVybCArICd0aWxlL3t6fS97eX0ve3h9JyArIChvcHRpb25zLnJlcXVlc3RQYXJhbXMgJiYgT2JqZWN0LmtleXMob3B0aW9ucy5yZXF1ZXN0UGFyYW1zKS5sZW5ndGggPiAwID8gVXRpbC5nZXRQYXJhbVN0cmluZyhvcHRpb25zLnJlcXVlc3RQYXJhbXMpIDogJycpO1xuICAgIC8vIFJlbW92ZSBzdWJkb21haW4gaW4gdXJsXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvZXNyaS1sZWFmbGV0L2lzc3Vlcy85OTFcbiAgICBpZiAob3B0aW9ucy51cmwuaW5kZXhPZigne3N9JykgIT09IC0xICYmIG9wdGlvbnMuc3ViZG9tYWlucykge1xuICAgICAgb3B0aW9ucy51cmwgPSBvcHRpb25zLnVybC5yZXBsYWNlKCd7c30nLCBvcHRpb25zLnN1YmRvbWFpbnNbMF0pO1xuICAgIH1cbiAgICB0aGlzLnNlcnZpY2UgPSBtYXBTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2VydmljZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgIHZhciBhcmNnaXNvbmxpbmUgPSBuZXcgUmVnRXhwKC90aWxlcy5hcmNnaXMob25saW5lKT9cXC5jb20vZyk7XG4gICAgaWYgKGFyY2dpc29ubGluZS50ZXN0KG9wdGlvbnMudXJsKSkge1xuICAgICAgdGhpcy50aWxlVXJsID0gdGhpcy50aWxlVXJsLnJlcGxhY2UoJzovL3RpbGVzJywgJzovL3RpbGVze3N9Jyk7XG4gICAgICBvcHRpb25zLnN1YmRvbWFpbnMgPSBbJzEnLCAnMicsICczJywgJzQnXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRva2VuKSB7XG4gICAgICB0aGlzLnRpbGVVcmwgKz0gKCc/dG9rZW49JyArIHRoaXMub3B0aW9ucy50b2tlbik7XG4gICAgfVxuXG4gICAgLy8gaW5pdCBsYXllciBieSBjYWxsaW5nIFRpbGVMYXllcnMgaW5pdGlhbGl6ZSBtZXRob2RcbiAgICBUaWxlTGF5ZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCB0aGlzLnRpbGVVcmwsIG9wdGlvbnMpO1xuICB9LFxuXG4gIGdldFRpbGVVcmw6IGZ1bmN0aW9uICh0aWxlUG9pbnQpIHtcbiAgICB2YXIgem9vbSA9IHRoaXMuX2dldFpvb21Gb3JVcmwoKTtcblxuICAgIHJldHVybiBVdGlsLnRlbXBsYXRlKHRoaXMudGlsZVVybCwgVXRpbC5leHRlbmQoe1xuICAgICAgczogdGhpcy5fZ2V0U3ViZG9tYWluKHRpbGVQb2ludCksXG4gICAgICB4OiB0aWxlUG9pbnQueCxcbiAgICAgIHk6IHRpbGVQb2ludC55LFxuICAgICAgLy8gdHJ5IGxvZCBtYXAgZmlyc3QsIHRoZW4ganVzdCBkZWZhdWx0IHRvIHpvb20gbGV2ZWxcbiAgICAgIHo6ICh0aGlzLl9sb2RNYXAgJiYgdGhpcy5fbG9kTWFwW3pvb21dKSA/IHRoaXMuX2xvZE1hcFt6b29tXSA6IHpvb21cbiAgICB9LCB0aGlzLm9wdGlvbnMpKTtcbiAgfSxcblxuICBjcmVhdGVUaWxlOiBmdW5jdGlvbiAoY29vcmRzLCBkb25lKSB7XG4gICAgdmFyIHRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgIEwuRG9tRXZlbnQub24odGlsZSwgJ2xvYWQnLCBMLmJpbmQodGhpcy5fdGlsZU9uTG9hZCwgdGhpcywgZG9uZSwgdGlsZSkpO1xuICAgIEwuRG9tRXZlbnQub24odGlsZSwgJ2Vycm9yJywgTC5iaW5kKHRoaXMuX3RpbGVPbkVycm9yLCB0aGlzLCBkb25lLCB0aWxlKSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNyb3NzT3JpZ2luKSB7XG4gICAgICB0aWxlLmNyb3NzT3JpZ2luID0gJyc7XG4gICAgfVxuXG4gICAgLypcbiAgICAgQWx0IHRhZyBpcyBzZXQgdG8gZW1wdHkgc3RyaW5nIHRvIGtlZXAgc2NyZWVuIHJlYWRlcnMgZnJvbSByZWFkaW5nIFVSTCBhbmQgZm9yIGNvbXBsaWFuY2UgcmVhc29uc1xuICAgICBodHRwOi8vd3d3LnczLm9yZy9UUi9XQ0FHMjAtVEVDSFMvSDY3XG4gICAgKi9cbiAgICB0aWxlLmFsdCA9ICcnO1xuXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gbG9kIG1hcCBvciBhbiBsb2QgbWFwIHdpdGggYSBwcm9wZXIgem9vbSBsb2FkIHRoZSB0aWxlXG4gICAgLy8gb3RoZXJ3aXNlIHdhaXQgZm9yIHRoZSBsb2QgbWFwIHRvIGJlY29tZSBhdmFpbGFibGVcbiAgICBpZiAoIXRoaXMuX2xvZE1hcCB8fCAodGhpcy5fbG9kTWFwICYmIHRoaXMuX2xvZE1hcFt0aGlzLl9nZXRab29tRm9yVXJsKCldKSkge1xuICAgICAgdGlsZS5zcmMgPSB0aGlzLmdldFRpbGVVcmwoY29vcmRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbmNlKCdsb2RtYXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRpbGUuc3JjID0gdGhpcy5nZXRUaWxlVXJsKGNvb3Jkcyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGlsZTtcbiAgfSxcblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIC8vIGluY2x1ZGUgJ1Bvd2VyZWQgYnkgRXNyaScgaW4gbWFwIGF0dHJpYnV0aW9uXG4gICAgc2V0RXNyaUF0dHJpYnV0aW9uKG1hcCk7XG5cbiAgICBpZiAoIXRoaXMuX2xvZE1hcCkge1xuICAgICAgdGhpcy5tZXRhZGF0YShmdW5jdGlvbiAoZXJyb3IsIG1ldGFkYXRhKSB7XG4gICAgICAgIGlmICghZXJyb3IgJiYgbWV0YWRhdGEuc3BhdGlhbFJlZmVyZW5jZSkge1xuICAgICAgICAgIHZhciBzciA9IG1ldGFkYXRhLnNwYXRpYWxSZWZlcmVuY2UubGF0ZXN0V2tpZCB8fCBtZXRhZGF0YS5zcGF0aWFsUmVmZXJlbmNlLndraWQ7XG4gICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gJiYgbWFwLmF0dHJpYnV0aW9uQ29udHJvbCAmJiBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gPSBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0O1xuICAgICAgICAgICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5hZGRBdHRyaWJ1dGlvbih0aGlzLmdldEF0dHJpYnV0aW9uKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWFwLm9wdGlvbnMuY3JzID09PSBMLkNSUy5FUFNHMzg1NyAmJiAoc3IgPT09IDEwMjEwMCB8fCBzciA9PT0gMzg1NykpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZE1hcCA9IHt9O1xuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSB6b29tIGxldmVsIGRhdGFcbiAgICAgICAgICAgIHZhciBhcmNnaXNMT0RzID0gbWV0YWRhdGEudGlsZUluZm8ubG9kcztcbiAgICAgICAgICAgIHZhciBjb3JyZWN0UmVzb2x1dGlvbnMgPSBUaWxlZE1hcExheWVyLk1lcmNhdG9yWm9vbUxldmVscztcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmNnaXNMT0RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBhcmNnaXNMT0QgPSBhcmNnaXNMT0RzW2ldO1xuICAgICAgICAgICAgICBmb3IgKHZhciBjaSBpbiBjb3JyZWN0UmVzb2x1dGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29ycmVjdFJlcyA9IGNvcnJlY3RSZXNvbHV0aW9uc1tjaV07XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fd2l0aGluUGVyY2VudGFnZShhcmNnaXNMT0QucmVzb2x1dGlvbiwgY29ycmVjdFJlcywgdGhpcy5vcHRpb25zLnpvb21PZmZzZXRBbGxvd2FuY2UpKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLl9sb2RNYXBbY2ldID0gYXJjZ2lzTE9ELmxldmVsO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZmlyZSgnbG9kbWFwJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghcHJvajQpIHtcbiAgICAgICAgICAgICAgd2FybignTC5lc3JpLlRpbGVkTWFwTGF5ZXIgaXMgdXNpbmcgYSBub24tbWVyY2F0b3Igc3BhdGlhbCByZWZlcmVuY2UuIFN1cHBvcnQgbWF5IGJlIGF2YWlsYWJsZSB0aHJvdWdoIFByb2o0TGVhZmxldCBodHRwOi8vZXNyaS5naXRodWIuaW8vZXNyaS1sZWFmbGV0L2V4YW1wbGVzL25vbi1tZXJjYXRvci1wcm9qZWN0aW9uLmh0bWwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIFRpbGVMYXllci5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIG1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UubWV0YWRhdGEoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5pZGVudGlmeSgpO1xuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmZpbmQoKTtcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UucXVlcnkoKTtcbiAgfSxcblxuICBhdXRoZW50aWNhdGU6IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHZhciB0b2tlblFzID0gJz90b2tlbj0nICsgdG9rZW47XG4gICAgdGhpcy50aWxlVXJsID0gKHRoaXMub3B0aW9ucy50b2tlbikgPyB0aGlzLnRpbGVVcmwucmVwbGFjZSgvXFw/dG9rZW49KC4rKS9nLCB0b2tlblFzKSA6IHRoaXMudGlsZVVybCArIHRva2VuUXM7XG4gICAgdGhpcy5vcHRpb25zLnRva2VuID0gdG9rZW47XG4gICAgdGhpcy5zZXJ2aWNlLmF1dGhlbnRpY2F0ZSh0b2tlbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3dpdGhpblBlcmNlbnRhZ2U6IGZ1bmN0aW9uIChhLCBiLCBwZXJjZW50YWdlKSB7XG4gICAgdmFyIGRpZmYgPSBNYXRoLmFicygoYSAvIGIpIC0gMSk7XG4gICAgcmV0dXJuIGRpZmYgPCBwZXJjZW50YWdlO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRpbGVkTWFwTGF5ZXIgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFRpbGVkTWFwTGF5ZXIodXJsLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGlsZWRNYXBMYXllcjtcbiIsImltcG9ydCB7IEltYWdlT3ZlcmxheSwgQ1JTLCBEb21VdGlsLCBVdGlsLCBMYXllciwgcG9wdXAsIGxhdExuZywgYm91bmRzIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBjb3JzIH0gZnJvbSAnLi4vU3VwcG9ydCc7XG5pbXBvcnQgeyBzZXRFc3JpQXR0cmlidXRpb24gfSBmcm9tICcuLi9VdGlsJztcblxudmFyIE92ZXJsYXkgPSBJbWFnZU92ZXJsYXkuZXh0ZW5kKHtcbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICB0aGlzLl90b3BMZWZ0ID0gbWFwLmdldFBpeGVsQm91bmRzKCkubWluO1xuICAgIEltYWdlT3ZlcmxheS5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuICBfcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fbWFwLm9wdGlvbnMuY3JzID09PSBDUlMuRVBTRzM4NTcpIHtcbiAgICAgIEltYWdlT3ZlcmxheS5wcm90b3R5cGUuX3Jlc2V0LmNhbGwodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIERvbVV0aWwuc2V0UG9zaXRpb24odGhpcy5faW1hZ2UsIHRoaXMuX3RvcExlZnQuc3VidHJhY3QodGhpcy5fbWFwLmdldFBpeGVsT3JpZ2luKCkpKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgdmFyIFJhc3RlckxheWVyID0gTGF5ZXIuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIG9wYWNpdHk6IDEsXG4gICAgcG9zaXRpb246ICdmcm9udCcsXG4gICAgZjogJ2ltYWdlJyxcbiAgICB1c2VDb3JzOiBjb3JzLFxuICAgIGF0dHJpYnV0aW9uOiBudWxsLFxuICAgIGludGVyYWN0aXZlOiBmYWxzZSxcbiAgICBhbHQ6ICcnXG4gIH0sXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICAvLyBpbmNsdWRlICdQb3dlcmVkIGJ5IEVzcmknIGluIG1hcCBhdHRyaWJ1dGlvblxuICAgIHNldEVzcmlBdHRyaWJ1dGlvbihtYXApO1xuXG4gICAgdGhpcy5fdXBkYXRlID0gVXRpbC50aHJvdHRsZSh0aGlzLl91cGRhdGUsIHRoaXMub3B0aW9ucy51cGRhdGVJbnRlcnZhbCwgdGhpcyk7XG5cbiAgICBtYXAub24oJ21vdmVlbmQnLCB0aGlzLl91cGRhdGUsIHRoaXMpO1xuXG4gICAgLy8gaWYgd2UgaGFkIGFuIGltYWdlIGxvYWRlZCBhbmQgaXQgbWF0Y2hlcyB0aGVcbiAgICAvLyBjdXJyZW50IGJvdW5kcyBzaG93IHRoZSBpbWFnZSBvdGhlcndpc2UgcmVtb3ZlIGl0XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSAmJiB0aGlzLl9jdXJyZW50SW1hZ2UuX2JvdW5kcy5lcXVhbHModGhpcy5fbWFwLmdldEJvdW5kcygpKSkge1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMuX2N1cnJlbnRJbWFnZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UpIHtcbiAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcih0aGlzLl9jdXJyZW50SW1hZ2UpO1xuICAgICAgdGhpcy5fY3VycmVudEltYWdlID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGUoKTtcblxuICAgIGlmICh0aGlzLl9wb3B1cCkge1xuICAgICAgdGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuX2dldFBvcHVwRGF0YSwgdGhpcyk7XG4gICAgICB0aGlzLl9tYXAub24oJ2RibGNsaWNrJywgdGhpcy5fcmVzZXRQb3B1cFN0YXRlLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgY29weXJpZ2h0IHRleHQgbGlzdGVkIGluIHNlcnZpY2UgbWV0YWRhdGFcbiAgICB0aGlzLm1ldGFkYXRhKGZ1bmN0aW9uIChlcnIsIG1ldGFkYXRhKSB7XG4gICAgICBpZiAoIWVyciAmJiAhdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uICYmIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wgJiYgbWV0YWRhdGEuY29weXJpZ2h0VGV4dCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gPSBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0O1xuICAgICAgICBtYXAuYXR0cmlidXRpb25Db250cm9sLmFkZEF0dHJpYnV0aW9uKHRoaXMuZ2V0QXR0cmlidXRpb24oKSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBpZiAodGhpcy5fY3VycmVudEltYWdlKSB7XG4gICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5fY3VycmVudEltYWdlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcG9wdXApIHtcbiAgICAgIHRoaXMuX21hcC5vZmYoJ2NsaWNrJywgdGhpcy5fZ2V0UG9wdXBEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX21hcC5vZmYoJ2RibGNsaWNrJywgdGhpcy5fcmVzZXRQb3B1cFN0YXRlLCB0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXAub2ZmKCdtb3ZlZW5kJywgdGhpcy5fdXBkYXRlLCB0aGlzKTtcbiAgfSxcblxuICBiaW5kUG9wdXA6IGZ1bmN0aW9uIChmbiwgcG9wdXBPcHRpb25zKSB7XG4gICAgdGhpcy5fc2hvdWxkUmVuZGVyUG9wdXAgPSBmYWxzZTtcbiAgICB0aGlzLl9sYXN0Q2xpY2sgPSBmYWxzZTtcbiAgICB0aGlzLl9wb3B1cCA9IHBvcHVwKHBvcHVwT3B0aW9ucyk7XG4gICAgdGhpcy5fcG9wdXBGdW5jdGlvbiA9IGZuO1xuICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgIHRoaXMuX21hcC5vbignY2xpY2snLCB0aGlzLl9nZXRQb3B1cERhdGEsIHRoaXMpO1xuICAgICAgdGhpcy5fbWFwLm9uKCdkYmxjbGljaycsIHRoaXMuX3Jlc2V0UG9wdXBTdGF0ZSwgdGhpcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHVuYmluZFBvcHVwOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX21hcCkge1xuICAgICAgdGhpcy5fbWFwLmNsb3NlUG9wdXAodGhpcy5fcG9wdXApO1xuICAgICAgdGhpcy5fbWFwLm9mZignY2xpY2snLCB0aGlzLl9nZXRQb3B1cERhdGEsIHRoaXMpO1xuICAgICAgdGhpcy5fbWFwLm9mZignZGJsY2xpY2snLCB0aGlzLl9yZXNldFBvcHVwU3RhdGUsIHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLl9wb3B1cCA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGJyaW5nVG9Gcm9udDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3B0aW9ucy5wb3NpdGlvbiA9ICdmcm9udCc7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSkge1xuICAgICAgdGhpcy5fY3VycmVudEltYWdlLmJyaW5nVG9Gcm9udCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBicmluZ1RvQmFjazogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3B0aW9ucy5wb3NpdGlvbiA9ICdiYWNrJztcbiAgICBpZiAodGhpcy5fY3VycmVudEltYWdlKSB7XG4gICAgICB0aGlzLl9jdXJyZW50SW1hZ2UuYnJpbmdUb0JhY2soKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uO1xuICB9LFxuXG4gIGdldE9wYWNpdHk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm9wYWNpdHk7XG4gIH0sXG5cbiAgc2V0T3BhY2l0eTogZnVuY3Rpb24gKG9wYWNpdHkpIHtcbiAgICB0aGlzLm9wdGlvbnMub3BhY2l0eSA9IG9wYWNpdHk7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSkge1xuICAgICAgdGhpcy5fY3VycmVudEltYWdlLnNldE9wYWNpdHkob3BhY2l0eSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFRpbWVSYW5nZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBbdGhpcy5vcHRpb25zLmZyb20sIHRoaXMub3B0aW9ucy50b107XG4gIH0sXG5cbiAgc2V0VGltZVJhbmdlOiBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgICB0aGlzLm9wdGlvbnMuZnJvbSA9IGZyb207XG4gICAgdGhpcy5vcHRpb25zLnRvID0gdG87XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgbWV0YWRhdGE6IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuc2VydmljZS5tZXRhZGF0YShjYWxsYmFjaywgY29udGV4dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYXV0aGVudGljYXRlOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0aGlzLnNlcnZpY2UuYXV0aGVudGljYXRlKHRva2VuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZWRyYXc6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgfSxcblxuICBfcmVuZGVySW1hZ2U6IGZ1bmN0aW9uICh1cmwsIGJvdW5kcywgY29udGVudFR5cGUpIHtcbiAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICAvLyBpZiBubyBvdXRwdXQgZGlyZWN0b3J5IGhhcyBiZWVuIHNwZWNpZmllZCBmb3IgYSBzZXJ2aWNlLCBNSU1FIGRhdGEgd2lsbCBiZSByZXR1cm5lZFxuICAgICAgaWYgKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgIHVybCA9ICdkYXRhOicgKyBjb250ZW50VHlwZSArICc7YmFzZTY0LCcgKyB1cmw7XG4gICAgICB9XG4gICAgICAvLyBjcmVhdGUgYSBuZXcgaW1hZ2Ugb3ZlcmxheSBhbmQgYWRkIGl0IHRvIHRoZSBtYXBcbiAgICAgIC8vIHRvIHN0YXJ0IGxvYWRpbmcgdGhlIGltYWdlXG4gICAgICAvLyBvcGFjaXR5IGlzIDAgd2hpbGUgdGhlIGltYWdlIGlzIGxvYWRpbmdcbiAgICAgIHZhciBpbWFnZSA9IG5ldyBPdmVybGF5KHVybCwgYm91bmRzLCB7XG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLm9wdGlvbnMudXNlQ29ycyxcbiAgICAgICAgYWx0OiB0aGlzLm9wdGlvbnMuYWx0LFxuICAgICAgICBwYW5lOiB0aGlzLm9wdGlvbnMucGFuZSB8fCB0aGlzLmdldFBhbmUoKSxcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRoaXMub3B0aW9ucy5pbnRlcmFjdGl2ZVxuICAgICAgfSkuYWRkVG8odGhpcy5fbWFwKTtcblxuICAgICAgdmFyIG9uT3ZlcmxheUVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIoaW1hZ2UpO1xuICAgICAgICB0aGlzLmZpcmUoJ2Vycm9yJyk7XG4gICAgICAgIGltYWdlLm9mZignbG9hZCcsIG9uT3ZlcmxheUxvYWQsIHRoaXMpO1xuICAgICAgfTtcblxuICAgICAgdmFyIG9uT3ZlcmxheUxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpbWFnZS5vZmYoJ2Vycm9yJywgb25PdmVybGF5TG9hZCwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgICAgICB2YXIgbmV3SW1hZ2UgPSBlLnRhcmdldDtcbiAgICAgICAgICB2YXIgb2xkSW1hZ2UgPSB0aGlzLl9jdXJyZW50SW1hZ2U7XG5cbiAgICAgICAgICAvLyBpZiB0aGUgYm91bmRzIG9mIHRoaXMgaW1hZ2UgbWF0Y2hlcyB0aGUgYm91bmRzIHRoYXRcbiAgICAgICAgICAvLyBfcmVuZGVySW1hZ2Ugd2FzIGNhbGxlZCB3aXRoIGFuZCB3ZSBoYXZlIGEgbWFwIHdpdGggdGhlIHNhbWUgYm91bmRzXG4gICAgICAgICAgLy8gaGlkZSB0aGUgb2xkIGltYWdlIGlmIHRoZXJlIGlzIG9uZSBhbmQgc2V0IHRoZSBvcGFjaXR5XG4gICAgICAgICAgLy8gb2YgdGhlIG5ldyBpbWFnZSBvdGhlcndpc2UgcmVtb3ZlIHRoZSBuZXcgaW1hZ2VcbiAgICAgICAgICBpZiAobmV3SW1hZ2UuX2JvdW5kcy5lcXVhbHMoYm91bmRzKSAmJiBuZXdJbWFnZS5fYm91bmRzLmVxdWFscyh0aGlzLl9tYXAuZ2V0Qm91bmRzKCkpKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW1hZ2UgPSBuZXdJbWFnZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wb3NpdGlvbiA9PT0gJ2Zyb250Jykge1xuICAgICAgICAgICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5icmluZ1RvQmFjaygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX2N1cnJlbnRJbWFnZS5fbWFwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5zZXRPcGFjaXR5KHRoaXMub3B0aW9ucy5vcGFjaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5fbWFwLnJlbW92ZUxheWVyKHRoaXMuX2N1cnJlbnRJbWFnZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvbGRJbWFnZSAmJiB0aGlzLl9tYXApIHtcbiAgICAgICAgICAgICAgdGhpcy5fbWFwLnJlbW92ZUxheWVyKG9sZEltYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9sZEltYWdlICYmIG9sZEltYWdlLl9tYXApIHtcbiAgICAgICAgICAgICAgb2xkSW1hZ2UuX21hcC5yZW1vdmVMYXllcihvbGRJbWFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcihuZXdJbWFnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJlKCdsb2FkJywge1xuICAgICAgICAgIGJvdW5kczogYm91bmRzXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLy8gSWYgbG9hZGluZyB0aGUgaW1hZ2UgZmFpbHNcbiAgICAgIGltYWdlLm9uY2UoJ2Vycm9yJywgb25PdmVybGF5RXJyb3IsIHRoaXMpO1xuXG4gICAgICAvLyBvbmNlIHRoZSBpbWFnZSBsb2Fkc1xuICAgICAgaW1hZ2Uub25jZSgnbG9hZCcsIG9uT3ZlcmxheUxvYWQsIHRoaXMpO1xuXG4gICAgICB0aGlzLmZpcmUoJ2xvYWRpbmcnLCB7XG4gICAgICAgIGJvdW5kczogYm91bmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX3VwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuICAgIHZhciBib3VuZHMgPSB0aGlzLl9tYXAuZ2V0Qm91bmRzKCk7XG5cbiAgICBpZiAodGhpcy5fYW5pbWF0aW5nWm9vbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9tYXAuX3BhblRyYW5zaXRpb24gJiYgdGhpcy5fbWFwLl9wYW5UcmFuc2l0aW9uLl9pblByb2dyZXNzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHpvb20gPiB0aGlzLm9wdGlvbnMubWF4Wm9vbSB8fCB6b29tIDwgdGhpcy5vcHRpb25zLm1pblpvb20pIHtcbiAgICAgIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudEltYWdlLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5fY3VycmVudEltYWdlKTtcbiAgICAgICAgdGhpcy5fY3VycmVudEltYWdlID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcGFyYW1zID0gdGhpcy5fYnVpbGRFeHBvcnRQYXJhbXMoKTtcbiAgICBMLmV4dGVuZChwYXJhbXMsIHRoaXMub3B0aW9ucy5yZXF1ZXN0UGFyYW1zKTtcblxuICAgIGlmIChwYXJhbXMpIHtcbiAgICAgIHRoaXMuX3JlcXVlc3RFeHBvcnQocGFyYW1zLCBib3VuZHMpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudEltYWdlKSB7XG4gICAgICB0aGlzLl9jdXJyZW50SW1hZ2UuX21hcC5yZW1vdmVMYXllcih0aGlzLl9jdXJyZW50SW1hZ2UpO1xuICAgICAgdGhpcy5fY3VycmVudEltYWdlID0gbnVsbDtcbiAgICB9XG4gIH0sXG5cbiAgX3JlbmRlclBvcHVwOiBmdW5jdGlvbiAobGF0bG5nLCBlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpIHtcbiAgICBsYXRsbmcgPSBsYXRMbmcobGF0bG5nKTtcbiAgICBpZiAodGhpcy5fc2hvdWxkUmVuZGVyUG9wdXAgJiYgdGhpcy5fbGFzdENsaWNrLmVxdWFscyhsYXRsbmcpKSB7XG4gICAgICAvLyBhZGQgdGhlIHBvcHVwIHRvIHRoZSBtYXAgd2hlcmUgdGhlIG1vdXNlIHdhcyBjbGlja2VkIGF0XG4gICAgICB2YXIgY29udGVudCA9IHRoaXMuX3BvcHVwRnVuY3Rpb24oZXJyb3IsIHJlc3VsdHMsIHJlc3BvbnNlKTtcbiAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgIHRoaXMuX3BvcHVwLnNldExhdExuZyhsYXRsbmcpLnNldENvbnRlbnQoY29udGVudCkub3Blbk9uKHRoaXMuX21hcCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9yZXNldFBvcHVwU3RhdGU6IGZ1bmN0aW9uIChlKSB7XG4gICAgdGhpcy5fc2hvdWxkUmVuZGVyUG9wdXAgPSBmYWxzZTtcbiAgICB0aGlzLl9sYXN0Q2xpY2sgPSBlLmxhdGxuZztcbiAgfSxcblxuICBfY2FsY3VsYXRlQmJveDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBwaXhlbEJvdW5kcyA9IHRoaXMuX21hcC5nZXRQaXhlbEJvdW5kcygpO1xuXG4gICAgdmFyIHN3ID0gdGhpcy5fbWFwLnVucHJvamVjdChwaXhlbEJvdW5kcy5nZXRCb3R0b21MZWZ0KCkpO1xuICAgIHZhciBuZSA9IHRoaXMuX21hcC51bnByb2plY3QocGl4ZWxCb3VuZHMuZ2V0VG9wUmlnaHQoKSk7XG5cbiAgICB2YXIgbmVQcm9qZWN0ZWQgPSB0aGlzLl9tYXAub3B0aW9ucy5jcnMucHJvamVjdChuZSk7XG4gICAgdmFyIHN3UHJvamVjdGVkID0gdGhpcy5fbWFwLm9wdGlvbnMuY3JzLnByb2plY3Qoc3cpO1xuXG4gICAgLy8gdGhpcyBlbnN1cmVzIG5lL3N3IGFyZSBzd2l0Y2hlZCBpbiBwb2xhciBtYXBzIHdoZXJlIG5vcnRoL3RvcCBib3R0b20vc291dGggaXMgaW52ZXJ0ZWRcbiAgICB2YXIgYm91bmRzUHJvamVjdGVkID0gYm91bmRzKG5lUHJvamVjdGVkLCBzd1Byb2plY3RlZCk7XG5cbiAgICByZXR1cm4gW2JvdW5kc1Byb2plY3RlZC5nZXRCb3R0b21MZWZ0KCkueCwgYm91bmRzUHJvamVjdGVkLmdldEJvdHRvbUxlZnQoKS55LCBib3VuZHNQcm9qZWN0ZWQuZ2V0VG9wUmlnaHQoKS54LCBib3VuZHNQcm9qZWN0ZWQuZ2V0VG9wUmlnaHQoKS55XS5qb2luKCcsJyk7XG4gIH0sXG5cbiAgX2NhbGN1bGF0ZUltYWdlU2l6ZTogZnVuY3Rpb24gKCkge1xuICAgIC8vIGVuc3VyZSB0aGF0IHdlIGRvbid0IGFzayBBcmNHSVMgU2VydmVyIGZvciBhIHRhbGxlciBpbWFnZSB0aGFuIHdlIGhhdmUgYWN0dWFsIG1hcCBkaXNwbGF5aW5nIHdpdGhpbiB0aGUgZGl2XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRQaXhlbEJvdW5kcygpO1xuICAgIHZhciBzaXplID0gdGhpcy5fbWFwLmdldFNpemUoKTtcblxuICAgIHZhciBzdyA9IHRoaXMuX21hcC51bnByb2plY3QoYm91bmRzLmdldEJvdHRvbUxlZnQoKSk7XG4gICAgdmFyIG5lID0gdGhpcy5fbWFwLnVucHJvamVjdChib3VuZHMuZ2V0VG9wUmlnaHQoKSk7XG5cbiAgICB2YXIgdG9wID0gdGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludChuZSkueTtcbiAgICB2YXIgYm90dG9tID0gdGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludChzdykueTtcblxuICAgIGlmICh0b3AgPiAwIHx8IGJvdHRvbSA8IHNpemUueSkge1xuICAgICAgc2l6ZS55ID0gYm90dG9tIC0gdG9wO1xuICAgIH1cblxuICAgIHJldHVybiBzaXplLnggKyAnLCcgKyBzaXplLnk7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgUmFzdGVyTGF5ZXIgfSBmcm9tICcuL1Jhc3RlckxheWVyJztcbmltcG9ydCB7IGdldFVybFBhcmFtcyB9IGZyb20gJy4uL1V0aWwnO1xuaW1wb3J0IGltYWdlU2VydmljZSBmcm9tICcuLi9TZXJ2aWNlcy9JbWFnZVNlcnZpY2UnO1xuXG5leHBvcnQgdmFyIEltYWdlTWFwTGF5ZXIgPSBSYXN0ZXJMYXllci5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICB1cGRhdGVJbnRlcnZhbDogMTUwLFxuICAgIGZvcm1hdDogJ2pwZ3BuZycsXG4gICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgZjogJ2ltYWdlJ1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5xdWVyeSgpO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5pZGVudGlmeSgpO1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IGdldFVybFBhcmFtcyhvcHRpb25zKTtcbiAgICB0aGlzLnNlcnZpY2UgPSBpbWFnZVNlcnZpY2Uob3B0aW9ucyk7XG4gICAgdGhpcy5zZXJ2aWNlLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuXG4gICAgVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIHNldFBpeGVsVHlwZTogZnVuY3Rpb24gKHBpeGVsVHlwZSkge1xuICAgIHRoaXMub3B0aW9ucy5waXhlbFR5cGUgPSBwaXhlbFR5cGU7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0UGl4ZWxUeXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5waXhlbFR5cGU7XG4gIH0sXG5cbiAgc2V0QmFuZElkczogZnVuY3Rpb24gKGJhbmRJZHMpIHtcbiAgICBpZiAoVXRpbC5pc0FycmF5KGJhbmRJZHMpKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuYmFuZElkcyA9IGJhbmRJZHMuam9pbignLCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wdGlvbnMuYmFuZElkcyA9IGJhbmRJZHMudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0QmFuZElkczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYmFuZElkcztcbiAgfSxcblxuICBzZXROb0RhdGE6IGZ1bmN0aW9uIChub0RhdGEsIG5vRGF0YUludGVycHJldGF0aW9uKSB7XG4gICAgaWYgKFV0aWwuaXNBcnJheShub0RhdGEpKSB7XG4gICAgICB0aGlzLm9wdGlvbnMubm9EYXRhID0gbm9EYXRhLmpvaW4oJywnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcHRpb25zLm5vRGF0YSA9IG5vRGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAobm9EYXRhSW50ZXJwcmV0YXRpb24pIHtcbiAgICAgIHRoaXMub3B0aW9ucy5ub0RhdGFJbnRlcnByZXRhdGlvbiA9IG5vRGF0YUludGVycHJldGF0aW9uO1xuICAgIH1cbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXROb0RhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5vRGF0YTtcbiAgfSxcblxuICBnZXROb0RhdGFJbnRlcnByZXRhdGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubm9EYXRhSW50ZXJwcmV0YXRpb247XG4gIH0sXG5cbiAgc2V0UmVuZGVyaW5nUnVsZTogZnVuY3Rpb24gKHJlbmRlcmluZ1J1bGUpIHtcbiAgICB0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZSA9IHJlbmRlcmluZ1J1bGU7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gIH0sXG5cbiAgZ2V0UmVuZGVyaW5nUnVsZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZTtcbiAgfSxcblxuICBzZXRNb3NhaWNSdWxlOiBmdW5jdGlvbiAobW9zYWljUnVsZSkge1xuICAgIHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlID0gbW9zYWljUnVsZTtcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgfSxcblxuICBnZXRNb3NhaWNSdWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlO1xuICB9LFxuXG4gIF9nZXRQb3B1cERhdGE6IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG4gICAgICBzZXRUaW1lb3V0KFV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlclBvcHVwKGUubGF0bG5nLCBlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyksIDMwMCk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB2YXIgaWRlbnRpZnlSZXF1ZXN0ID0gdGhpcy5pZGVudGlmeSgpLmF0KGUubGF0bG5nKTtcblxuICAgIC8vIHNldCBtb3NhaWMgcnVsZSBmb3IgaWRlbnRpZnkgdGFzayBpZiBpdCBpcyBzZXQgZm9yIGxheWVyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlKSB7XG4gICAgICBpZGVudGlmeVJlcXVlc3Quc2V0TW9zYWljUnVsZSh0aGlzLm9wdGlvbnMubW9zYWljUnVsZSk7XG4gICAgICAvLyBAVE9ETzogZm9yY2UgcmV0dXJuIGNhdGFsb2cgaXRlbXMgdG9vP1xuICAgIH1cblxuICAgIC8vIEBUT0RPOiBzZXQgcmVuZGVyaW5nIHJ1bGU/IE5vdCBzdXJlLFxuICAgIC8vIHNvbWV0aW1lcyB5b3Ugd2FudCByYXcgcGl4ZWwgdmFsdWVzXG4gICAgLy8gaWYgKHRoaXMub3B0aW9ucy5yZW5kZXJpbmdSdWxlKSB7XG4gICAgLy8gICBpZGVudGlmeVJlcXVlc3Quc2V0UmVuZGVyaW5nUnVsZSh0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZSk7XG4gICAgLy8gfVxuXG4gICAgaWRlbnRpZnlSZXF1ZXN0LnJ1bihjYWxsYmFjayk7XG5cbiAgICAvLyBzZXQgdGhlIGZsYWdzIHRvIHNob3cgdGhlIHBvcHVwXG4gICAgdGhpcy5fc2hvdWxkUmVuZGVyUG9wdXAgPSB0cnVlO1xuICAgIHRoaXMuX2xhc3RDbGljayA9IGUubGF0bG5nO1xuICB9LFxuXG4gIF9idWlsZEV4cG9ydFBhcmFtczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzciA9IHBhcnNlSW50KHRoaXMuX21hcC5vcHRpb25zLmNycy5jb2RlLnNwbGl0KCc6JylbMV0sIDEwKTtcblxuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBiYm94OiB0aGlzLl9jYWxjdWxhdGVCYm94KCksXG4gICAgICBzaXplOiB0aGlzLl9jYWxjdWxhdGVJbWFnZVNpemUoKSxcbiAgICAgIGZvcm1hdDogdGhpcy5vcHRpb25zLmZvcm1hdCxcbiAgICAgIHRyYW5zcGFyZW50OiB0aGlzLm9wdGlvbnMudHJhbnNwYXJlbnQsXG4gICAgICBiYm94U1I6IHNyLFxuICAgICAgaW1hZ2VTUjogc3JcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5mcm9tICYmIHRoaXMub3B0aW9ucy50bykge1xuICAgICAgcGFyYW1zLnRpbWUgPSB0aGlzLm9wdGlvbnMuZnJvbS52YWx1ZU9mKCkgKyAnLCcgKyB0aGlzLm9wdGlvbnMudG8udmFsdWVPZigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMucGl4ZWxUeXBlKSB7XG4gICAgICBwYXJhbXMucGl4ZWxUeXBlID0gdGhpcy5vcHRpb25zLnBpeGVsVHlwZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmludGVycG9sYXRpb24pIHtcbiAgICAgIHBhcmFtcy5pbnRlcnBvbGF0aW9uID0gdGhpcy5vcHRpb25zLmludGVycG9sYXRpb247XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb21wcmVzc2lvblF1YWxpdHkpIHtcbiAgICAgIHBhcmFtcy5jb21wcmVzc2lvblF1YWxpdHkgPSB0aGlzLm9wdGlvbnMuY29tcHJlc3Npb25RdWFsaXR5O1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYmFuZElkcykge1xuICAgICAgcGFyYW1zLmJhbmRJZHMgPSB0aGlzLm9wdGlvbnMuYmFuZElkcztcbiAgICB9XG5cbiAgICAvLyAwIGlzIGZhbHN5ICphbmQqIGEgdmFsaWQgaW5wdXQgcGFyYW1ldGVyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5ub0RhdGEgPT09IDAgfHwgdGhpcy5vcHRpb25zLm5vRGF0YSkge1xuICAgICAgcGFyYW1zLm5vRGF0YSA9IHRoaXMub3B0aW9ucy5ub0RhdGE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5ub0RhdGFJbnRlcnByZXRhdGlvbikge1xuICAgICAgcGFyYW1zLm5vRGF0YUludGVycHJldGF0aW9uID0gdGhpcy5vcHRpb25zLm5vRGF0YUludGVycHJldGF0aW9uO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNlcnZpY2Uub3B0aW9ucy50b2tlbikge1xuICAgICAgcGFyYW1zLnRva2VuID0gdGhpcy5zZXJ2aWNlLm9wdGlvbnMudG9rZW47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZW5kZXJpbmdSdWxlKSB7XG4gICAgICBwYXJhbXMucmVuZGVyaW5nUnVsZSA9IEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucy5yZW5kZXJpbmdSdWxlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLm1vc2FpY1J1bGUpIHtcbiAgICAgIHBhcmFtcy5tb3NhaWNSdWxlID0gSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLm1vc2FpY1J1bGUpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH0sXG5cbiAgX3JlcXVlc3RFeHBvcnQ6IGZ1bmN0aW9uIChwYXJhbXMsIGJvdW5kcykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZiA9PT0gJ2pzb24nKSB7XG4gICAgICB0aGlzLnNlcnZpY2UucmVxdWVzdCgnZXhwb3J0SW1hZ2UnLCBwYXJhbXMsIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7IHJldHVybjsgfSAvLyB3ZSByZWFsbHkgY2FuJ3QgZG8gYW55dGhpbmcgaGVyZSBidXQgYXV0aGVudGljYXRlIG9yIHJlcXVlc3RlcnJvciB3aWxsIGZpcmVcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50b2tlbikge1xuICAgICAgICAgIHJlc3BvbnNlLmhyZWYgKz0gKCc/dG9rZW49JyArIHRoaXMub3B0aW9ucy50b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVuZGVySW1hZ2UocmVzcG9uc2UuaHJlZiwgYm91bmRzKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJhbXMuZiA9ICdpbWFnZSc7XG4gICAgICB0aGlzLl9yZW5kZXJJbWFnZSh0aGlzLm9wdGlvbnMudXJsICsgJ2V4cG9ydEltYWdlJyArIFV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zKSwgYm91bmRzKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VNYXBMYXllciAodXJsLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSW1hZ2VNYXBMYXllcih1cmwsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbWFnZU1hcExheWVyO1xuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgUmFzdGVyTGF5ZXIgfSBmcm9tICcuL1Jhc3RlckxheWVyJztcbmltcG9ydCB7IGdldFVybFBhcmFtcyB9IGZyb20gJy4uL1V0aWwnO1xuaW1wb3J0IG1hcFNlcnZpY2UgZnJvbSAnLi4vU2VydmljZXMvTWFwU2VydmljZSc7XG5cbmV4cG9ydCB2YXIgRHluYW1pY01hcExheWVyID0gUmFzdGVyTGF5ZXIuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgdXBkYXRlSW50ZXJ2YWw6IDE1MCxcbiAgICBsYXllcnM6IGZhbHNlLFxuICAgIGxheWVyRGVmczogZmFsc2UsXG4gICAgdGltZU9wdGlvbnM6IGZhbHNlLFxuICAgIGZvcm1hdDogJ3BuZzI0JyxcbiAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICBmOiAnanNvbidcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBnZXRVcmxQYXJhbXMob3B0aW9ucyk7XG4gICAgdGhpcy5zZXJ2aWNlID0gbWFwU2VydmljZShvcHRpb25zKTtcbiAgICB0aGlzLnNlcnZpY2UuYWRkRXZlbnRQYXJlbnQodGhpcyk7XG5cbiAgICBpZiAoKG9wdGlvbnMucHJveHkgfHwgb3B0aW9ucy50b2tlbikgJiYgb3B0aW9ucy5mICE9PSAnanNvbicpIHtcbiAgICAgIG9wdGlvbnMuZiA9ICdqc29uJztcbiAgICB9XG5cbiAgICBVdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gIH0sXG5cbiAgZ2V0RHluYW1pY0xheWVyczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZHluYW1pY0xheWVycztcbiAgfSxcblxuICBzZXREeW5hbWljTGF5ZXJzOiBmdW5jdGlvbiAoZHluYW1pY0xheWVycykge1xuICAgIHRoaXMub3B0aW9ucy5keW5hbWljTGF5ZXJzID0gZHluYW1pY0xheWVycztcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRMYXllcnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxheWVycztcbiAgfSxcblxuICBzZXRMYXllcnM6IGZ1bmN0aW9uIChsYXllcnMpIHtcbiAgICB0aGlzLm9wdGlvbnMubGF5ZXJzID0gbGF5ZXJzO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldExheWVyRGVmczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubGF5ZXJEZWZzO1xuICB9LFxuXG4gIHNldExheWVyRGVmczogZnVuY3Rpb24gKGxheWVyRGVmcykge1xuICAgIHRoaXMub3B0aW9ucy5sYXllckRlZnMgPSBsYXllckRlZnM7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0VGltZU9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpbWVPcHRpb25zO1xuICB9LFxuXG4gIHNldFRpbWVPcHRpb25zOiBmdW5jdGlvbiAodGltZU9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMudGltZU9wdGlvbnMgPSB0aW1lT3B0aW9ucztcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UucXVlcnkoKTtcbiAgfSxcblxuICBpZGVudGlmeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaWRlbnRpZnkoKTtcbiAgfSxcblxuICBmaW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5maW5kKCk7XG4gIH0sXG5cbiAgX2dldFBvcHVwRGF0YTogZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgY2FsbGJhY2sgPSBVdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlQ29sbGVjdGlvbiwgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG4gICAgICBzZXRUaW1lb3V0KFV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlclBvcHVwKGUubGF0bG5nLCBlcnJvciwgZmVhdHVyZUNvbGxlY3Rpb24sIHJlc3BvbnNlKTtcbiAgICAgIH0sIHRoaXMpLCAzMDApO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgdmFyIGlkZW50aWZ5UmVxdWVzdDtcbiAgICBpZiAodGhpcy5vcHRpb25zLnBvcHVwKSB7XG4gICAgICBpZGVudGlmeVJlcXVlc3QgPSB0aGlzLm9wdGlvbnMucG9wdXAub24odGhpcy5fbWFwKS5hdChlLmxhdGxuZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkZW50aWZ5UmVxdWVzdCA9IHRoaXMuaWRlbnRpZnkoKS5vbih0aGlzLl9tYXApLmF0KGUubGF0bG5nKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgZXh0cmFuZW91cyB2ZXJ0aWNlcyBmcm9tIHJlc3BvbnNlIGZlYXR1cmVzIGlmIGl0IGhhcyBub3QgYWxyZWFkeSBiZWVuIGRvbmVcbiAgICBpZGVudGlmeVJlcXVlc3QucGFyYW1zLm1heEFsbG93YWJsZU9mZnNldCA/IHRydWUgOiBpZGVudGlmeVJlcXVlc3Quc2ltcGxpZnkodGhpcy5fbWFwLCAwLjUpO1xuXG4gICAgaWYgKCEodGhpcy5vcHRpb25zLnBvcHVwICYmIHRoaXMub3B0aW9ucy5wb3B1cC5wYXJhbXMgJiYgdGhpcy5vcHRpb25zLnBvcHVwLnBhcmFtcy5sYXllcnMpKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmxheWVycykge1xuICAgICAgICBpZGVudGlmeVJlcXVlc3QubGF5ZXJzKCd2aXNpYmxlOicgKyB0aGlzLm9wdGlvbnMubGF5ZXJzLmpvaW4oJywnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZGVudGlmeVJlcXVlc3QubGF5ZXJzKCd2aXNpYmxlJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgcHJlc2VudCwgcGFzcyBsYXllciBpZHMgYW5kIHNxbCBmaWx0ZXJzIHRocm91Z2ggdG8gdGhlIGlkZW50aWZ5IHRhc2tcbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyRGVmcyAmJiB0eXBlb2YgdGhpcy5vcHRpb25zLmxheWVyRGVmcyAhPT0gJ3N0cmluZycgJiYgIWlkZW50aWZ5UmVxdWVzdC5wYXJhbXMubGF5ZXJEZWZzKSB7XG4gICAgICBmb3IgKHZhciBpZCBpbiB0aGlzLm9wdGlvbnMubGF5ZXJEZWZzKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXJEZWZzLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgICAgICAgIGlkZW50aWZ5UmVxdWVzdC5sYXllckRlZihpZCwgdGhpcy5vcHRpb25zLmxheWVyRGVmc1tpZF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWRlbnRpZnlSZXF1ZXN0LnJ1bihjYWxsYmFjayk7XG5cbiAgICAvLyBzZXQgdGhlIGZsYWdzIHRvIHNob3cgdGhlIHBvcHVwXG4gICAgdGhpcy5fc2hvdWxkUmVuZGVyUG9wdXAgPSB0cnVlO1xuICAgIHRoaXMuX2xhc3RDbGljayA9IGUubGF0bG5nO1xuICB9LFxuXG4gIF9idWlsZEV4cG9ydFBhcmFtczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzciA9IHBhcnNlSW50KHRoaXMuX21hcC5vcHRpb25zLmNycy5jb2RlLnNwbGl0KCc6JylbMV0sIDEwKTtcblxuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBiYm94OiB0aGlzLl9jYWxjdWxhdGVCYm94KCksXG4gICAgICBzaXplOiB0aGlzLl9jYWxjdWxhdGVJbWFnZVNpemUoKSxcbiAgICAgIGRwaTogOTYsXG4gICAgICBmb3JtYXQ6IHRoaXMub3B0aW9ucy5mb3JtYXQsXG4gICAgICB0cmFuc3BhcmVudDogdGhpcy5vcHRpb25zLnRyYW5zcGFyZW50LFxuICAgICAgYmJveFNSOiBzcixcbiAgICAgIGltYWdlU1I6IHNyXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZHluYW1pY0xheWVycykge1xuICAgICAgcGFyYW1zLmR5bmFtaWNMYXllcnMgPSB0aGlzLm9wdGlvbnMuZHluYW1pY0xheWVycztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVycykge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5sYXllcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcy5sYXllcnMgPSAnc2hvdzonICsgdGhpcy5vcHRpb25zLmxheWVycy5qb2luKCcsJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllckRlZnMpIHtcbiAgICAgIHBhcmFtcy5sYXllckRlZnMgPSB0eXBlb2YgdGhpcy5vcHRpb25zLmxheWVyRGVmcyA9PT0gJ3N0cmluZycgPyB0aGlzLm9wdGlvbnMubGF5ZXJEZWZzIDogSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLmxheWVyRGVmcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lT3B0aW9ucykge1xuICAgICAgcGFyYW1zLnRpbWVPcHRpb25zID0gSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLnRpbWVPcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmZyb20gJiYgdGhpcy5vcHRpb25zLnRvKSB7XG4gICAgICBwYXJhbXMudGltZSA9IHRoaXMub3B0aW9ucy5mcm9tLnZhbHVlT2YoKSArICcsJyArIHRoaXMub3B0aW9ucy50by52YWx1ZU9mKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VydmljZS5vcHRpb25zLnRva2VuKSB7XG4gICAgICBwYXJhbXMudG9rZW4gPSB0aGlzLnNlcnZpY2Uub3B0aW9ucy50b2tlbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnByb3h5KSB7XG4gICAgICBwYXJhbXMucHJveHkgPSB0aGlzLm9wdGlvbnMucHJveHk7XG4gICAgfVxuXG4gICAgLy8gdXNlIGEgdGltZXN0YW1wIHRvIGJ1c3Qgc2VydmVyIGNhY2hlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlQ2FjaGUpIHtcbiAgICAgIHBhcmFtcy5fdHMgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH0sXG5cbiAgX3JlcXVlc3RFeHBvcnQ6IGZ1bmN0aW9uIChwYXJhbXMsIGJvdW5kcykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZiA9PT0gJ2pzb24nKSB7XG4gICAgICB0aGlzLnNlcnZpY2UucmVxdWVzdCgnZXhwb3J0JywgcGFyYW1zLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50b2tlbikge1xuICAgICAgICAgIHJlc3BvbnNlLmhyZWYgKz0gKCc/dG9rZW49JyArIHRoaXMub3B0aW9ucy50b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcm94eSkge1xuICAgICAgICAgIHJlc3BvbnNlLmhyZWYgPSB0aGlzLm9wdGlvbnMucHJveHkgKyAnPycgKyByZXNwb25zZS5ocmVmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNwb25zZS5ocmVmKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVySW1hZ2UocmVzcG9uc2UuaHJlZiwgYm91bmRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJJbWFnZShyZXNwb25zZS5pbWFnZURhdGEsIGJvdW5kcywgcmVzcG9uc2UuY29udGVudFR5cGUpO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1zLmYgPSAnaW1hZ2UnO1xuICAgICAgdGhpcy5fcmVuZGVySW1hZ2UodGhpcy5vcHRpb25zLnVybCArICdleHBvcnQnICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMpLCBib3VuZHMpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkeW5hbWljTWFwTGF5ZXIgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IER5bmFtaWNNYXBMYXllcih1cmwsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkeW5hbWljTWFwTGF5ZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcblxudmFyIFZpcnR1YWxHcmlkID0gTC5MYXllci5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBjZWxsU2l6ZTogNTEyLFxuICAgIHVwZGF0ZUludGVydmFsOiAxNTBcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fem9vbWluZyA9IGZhbHNlO1xuICB9LFxuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgdGhpcy5fbWFwID0gbWFwO1xuICAgIHRoaXMuX3VwZGF0ZSA9IEwuVXRpbC50aHJvdHRsZSh0aGlzLl91cGRhdGUsIHRoaXMub3B0aW9ucy51cGRhdGVJbnRlcnZhbCwgdGhpcyk7XG4gICAgdGhpcy5fcmVzZXQoKTtcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgfSxcblxuICBvblJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX21hcC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZ2V0RXZlbnRzKCksIHRoaXMpO1xuICAgIHRoaXMuX3JlbW92ZUNlbGxzKCk7XG4gIH0sXG5cbiAgZ2V0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV2ZW50cyA9IHtcbiAgICAgIG1vdmVlbmQ6IHRoaXMuX3VwZGF0ZSxcbiAgICAgIHpvb21zdGFydDogdGhpcy5fem9vbXN0YXJ0LFxuICAgICAgem9vbWVuZDogdGhpcy5fcmVzZXRcbiAgICB9O1xuXG4gICAgcmV0dXJuIGV2ZW50cztcbiAgfSxcblxuICBhZGRUbzogZnVuY3Rpb24gKG1hcCkge1xuICAgIG1hcC5hZGRMYXllcih0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZW1vdmVGcm9tOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgbWFwLnJlbW92ZUxheWVyKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIF96b29tc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl96b29taW5nID0gdHJ1ZTtcbiAgfSxcblxuICBfcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9yZW1vdmVDZWxscygpO1xuXG4gICAgdGhpcy5fY2VsbHMgPSB7fTtcbiAgICB0aGlzLl9hY3RpdmVDZWxscyA9IHt9O1xuICAgIHRoaXMuX2NlbGxzVG9Mb2FkID0gMDtcbiAgICB0aGlzLl9jZWxsc1RvdGFsID0gMDtcbiAgICB0aGlzLl9jZWxsTnVtQm91bmRzID0gdGhpcy5fZ2V0Q2VsbE51bUJvdW5kcygpO1xuXG4gICAgdGhpcy5fcmVzZXRXcmFwKCk7XG4gICAgdGhpcy5fem9vbWluZyA9IGZhbHNlO1xuICB9LFxuXG4gIF9yZXNldFdyYXA6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuICAgIHZhciBjcnMgPSBtYXAub3B0aW9ucy5jcnM7XG5cbiAgICBpZiAoY3JzLmluZmluaXRlKSB7IHJldHVybjsgfVxuXG4gICAgdmFyIGNlbGxTaXplID0gdGhpcy5fZ2V0Q2VsbFNpemUoKTtcblxuICAgIGlmIChjcnMud3JhcExuZykge1xuICAgICAgdGhpcy5fd3JhcExuZyA9IFtcbiAgICAgICAgTWF0aC5mbG9vcihtYXAucHJvamVjdChbMCwgY3JzLndyYXBMbmdbMF1dKS54IC8gY2VsbFNpemUpLFxuICAgICAgICBNYXRoLmNlaWwobWFwLnByb2plY3QoWzAsIGNycy53cmFwTG5nWzFdXSkueCAvIGNlbGxTaXplKVxuICAgICAgXTtcbiAgICB9XG5cbiAgICBpZiAoY3JzLndyYXBMYXQpIHtcbiAgICAgIHRoaXMuX3dyYXBMYXQgPSBbXG4gICAgICAgIE1hdGguZmxvb3IobWFwLnByb2plY3QoW2Nycy53cmFwTGF0WzBdLCAwXSkueSAvIGNlbGxTaXplKSxcbiAgICAgICAgTWF0aC5jZWlsKG1hcC5wcm9qZWN0KFtjcnMud3JhcExhdFsxXSwgMF0pLnkgLyBjZWxsU2l6ZSlcbiAgICAgIF07XG4gICAgfVxuICB9LFxuXG4gIF9nZXRDZWxsU2l6ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2VsbFNpemU7XG4gIH0sXG5cbiAgX3VwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRQaXhlbEJvdW5kcygpO1xuICAgIHZhciBjZWxsU2l6ZSA9IHRoaXMuX2dldENlbGxTaXplKCk7XG5cbiAgICAvLyBjZWxsIGNvb3JkaW5hdGVzIHJhbmdlIGZvciB0aGUgY3VycmVudCB2aWV3XG4gICAgdmFyIGNlbGxCb3VuZHMgPSBMLmJvdW5kcyhcbiAgICAgIGJvdW5kcy5taW4uZGl2aWRlQnkoY2VsbFNpemUpLmZsb29yKCksXG4gICAgICBib3VuZHMubWF4LmRpdmlkZUJ5KGNlbGxTaXplKS5mbG9vcigpKTtcblxuICAgIHRoaXMuX3JlbW92ZU90aGVyQ2VsbHMoY2VsbEJvdW5kcyk7XG4gICAgdGhpcy5fYWRkQ2VsbHMoY2VsbEJvdW5kcyk7XG5cbiAgICB0aGlzLmZpcmUoJ2NlbGxzdXBkYXRlZCcpO1xuICB9LFxuXG4gIF9hZGRDZWxsczogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgIHZhciBjZW50ZXIgPSBib3VuZHMuZ2V0Q2VudGVyKCk7XG4gICAgdmFyIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuXG4gICAgdmFyIGosIGksIGNvb3JkcztcbiAgICAvLyBjcmVhdGUgYSBxdWV1ZSBvZiBjb29yZGluYXRlcyB0byBsb2FkIGNlbGxzIGZyb21cbiAgICBmb3IgKGogPSBib3VuZHMubWluLnk7IGogPD0gYm91bmRzLm1heC55OyBqKyspIHtcbiAgICAgIGZvciAoaSA9IGJvdW5kcy5taW4ueDsgaSA8PSBib3VuZHMubWF4Lng7IGkrKykge1xuICAgICAgICBjb29yZHMgPSBMLnBvaW50KGksIGopO1xuICAgICAgICBjb29yZHMueiA9IHpvb207XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzVmFsaWRDZWxsKGNvb3JkcykpIHtcbiAgICAgICAgICBxdWV1ZS5wdXNoKGNvb3Jkcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2VsbHNUb0xvYWQgPSBxdWV1ZS5sZW5ndGg7XG5cbiAgICBpZiAoY2VsbHNUb0xvYWQgPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICB0aGlzLl9jZWxsc1RvTG9hZCArPSBjZWxsc1RvTG9hZDtcbiAgICB0aGlzLl9jZWxsc1RvdGFsICs9IGNlbGxzVG9Mb2FkO1xuXG4gICAgLy8gc29ydCBjZWxsIHF1ZXVlIHRvIGxvYWQgY2VsbHMgaW4gb3JkZXIgb2YgdGhlaXIgZGlzdGFuY2UgdG8gY2VudGVyXG4gICAgcXVldWUuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEuZGlzdGFuY2VUbyhjZW50ZXIpIC0gYi5kaXN0YW5jZVRvKGNlbnRlcik7XG4gICAgfSk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgY2VsbHNUb0xvYWQ7IGkrKykge1xuICAgICAgdGhpcy5fYWRkQ2VsbChxdWV1ZVtpXSk7XG4gICAgfVxuICB9LFxuXG4gIF9pc1ZhbGlkQ2VsbDogZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIHZhciBjcnMgPSB0aGlzLl9tYXAub3B0aW9ucy5jcnM7XG5cbiAgICBpZiAoIWNycy5pbmZpbml0ZSkge1xuICAgICAgLy8gZG9uJ3QgbG9hZCBjZWxsIGlmIGl0J3Mgb3V0IG9mIGJvdW5kcyBhbmQgbm90IHdyYXBwZWRcbiAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsTnVtQm91bmRzO1xuICAgICAgaWYgKFxuICAgICAgICAoIWNycy53cmFwTG5nICYmIChjb29yZHMueCA8IGJvdW5kcy5taW4ueCB8fCBjb29yZHMueCA+IGJvdW5kcy5tYXgueCkpIHx8XG4gICAgICAgICghY3JzLndyYXBMYXQgJiYgKGNvb3Jkcy55IDwgYm91bmRzLm1pbi55IHx8IGNvb3Jkcy55ID4gYm91bmRzLm1heC55KSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYm91bmRzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBkb24ndCBsb2FkIGNlbGwgaWYgaXQgZG9lc24ndCBpbnRlcnNlY3QgdGhlIGJvdW5kcyBpbiBvcHRpb25zXG4gICAgdmFyIGNlbGxCb3VuZHMgPSB0aGlzLl9jZWxsQ29vcmRzVG9Cb3VuZHMoY29vcmRzKTtcbiAgICByZXR1cm4gTC5sYXRMbmdCb3VuZHModGhpcy5vcHRpb25zLmJvdW5kcykuaW50ZXJzZWN0cyhjZWxsQm91bmRzKTtcbiAgfSxcblxuICAvLyBjb252ZXJ0cyBjZWxsIGNvb3JkaW5hdGVzIHRvIGl0cyBnZW9ncmFwaGljYWwgYm91bmRzXG4gIF9jZWxsQ29vcmRzVG9Cb3VuZHM6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuICAgIHZhciBjZWxsU2l6ZSA9IHRoaXMub3B0aW9ucy5jZWxsU2l6ZTtcbiAgICB2YXIgbndQb2ludCA9IGNvb3Jkcy5tdWx0aXBseUJ5KGNlbGxTaXplKTtcbiAgICB2YXIgc2VQb2ludCA9IG53UG9pbnQuYWRkKFtjZWxsU2l6ZSwgY2VsbFNpemVdKTtcbiAgICB2YXIgbncgPSBtYXAud3JhcExhdExuZyhtYXAudW5wcm9qZWN0KG53UG9pbnQsIGNvb3Jkcy56KSk7XG4gICAgdmFyIHNlID0gbWFwLndyYXBMYXRMbmcobWFwLnVucHJvamVjdChzZVBvaW50LCBjb29yZHMueikpO1xuXG4gICAgcmV0dXJuIEwubGF0TG5nQm91bmRzKG53LCBzZSk7XG4gIH0sXG5cbiAgLy8gY29udmVydHMgY2VsbCBjb29yZGluYXRlcyB0byBrZXkgZm9yIHRoZSBjZWxsIGNhY2hlXG4gIF9jZWxsQ29vcmRzVG9LZXk6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICByZXR1cm4gY29vcmRzLnggKyAnOicgKyBjb29yZHMueTtcbiAgfSxcblxuICAvLyBjb252ZXJ0cyBjZWxsIGNhY2hlIGtleSB0byBjb29yZGlhbnRlc1xuICBfa2V5VG9DZWxsQ29vcmRzOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGtBcnIgPSBrZXkuc3BsaXQoJzonKTtcbiAgICB2YXIgeCA9IHBhcnNlSW50KGtBcnJbMF0sIDEwKTtcbiAgICB2YXIgeSA9IHBhcnNlSW50KGtBcnJbMV0sIDEwKTtcblxuICAgIHJldHVybiBMLnBvaW50KHgsIHkpO1xuICB9LFxuXG4gIC8vIHJlbW92ZSBhbnkgcHJlc2VudCBjZWxscyB0aGF0IGFyZSBvZmYgdGhlIHNwZWNpZmllZCBib3VuZHNcbiAgX3JlbW92ZU90aGVyQ2VsbHM6IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICAgIGlmICghYm91bmRzLmNvbnRhaW5zKHRoaXMuX2tleVRvQ2VsbENvb3JkcyhrZXkpKSkge1xuICAgICAgICB0aGlzLl9yZW1vdmVDZWxsKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9yZW1vdmVDZWxsOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLl9hY3RpdmVDZWxsc1trZXldO1xuXG4gICAgaWYgKGNlbGwpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9hY3RpdmVDZWxsc1trZXldO1xuXG4gICAgICBpZiAodGhpcy5jZWxsTGVhdmUpIHtcbiAgICAgICAgdGhpcy5jZWxsTGVhdmUoY2VsbC5ib3VuZHMsIGNlbGwuY29vcmRzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maXJlKCdjZWxsbGVhdmUnLCB7XG4gICAgICAgIGJvdW5kczogY2VsbC5ib3VuZHMsXG4gICAgICAgIGNvb3JkczogY2VsbC5jb29yZHNcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBfcmVtb3ZlQ2VsbHM6IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsc1trZXldLmJvdW5kcztcbiAgICAgIHZhciBjb29yZHMgPSB0aGlzLl9jZWxsc1trZXldLmNvb3JkcztcblxuICAgICAgaWYgKHRoaXMuY2VsbExlYXZlKSB7XG4gICAgICAgIHRoaXMuY2VsbExlYXZlKGJvdW5kcywgY29vcmRzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maXJlKCdjZWxsbGVhdmUnLCB7XG4gICAgICAgIGJvdW5kczogYm91bmRzLFxuICAgICAgICBjb29yZHM6IGNvb3Jkc1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIF9hZGRDZWxsOiBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgLy8gd3JhcCBjZWxsIGNvb3JkcyBpZiBuZWNlc3NhcnkgKGRlcGVuZGluZyBvbiBDUlMpXG4gICAgdGhpcy5fd3JhcENvb3Jkcyhjb29yZHMpO1xuXG4gICAgLy8gZ2VuZXJhdGUgdGhlIGNlbGwga2V5XG4gICAgdmFyIGtleSA9IHRoaXMuX2NlbGxDb29yZHNUb0tleShjb29yZHMpO1xuXG4gICAgLy8gZ2V0IHRoZSBjZWxsIGZyb20gdGhlIGNhY2hlXG4gICAgdmFyIGNlbGwgPSB0aGlzLl9jZWxsc1trZXldO1xuICAgIC8vIGlmIHRoaXMgY2VsbCBzaG91bGQgYmUgc2hvd24gYXMgaXNudCBhY3RpdmUgeWV0IChlbnRlcilcblxuICAgIGlmIChjZWxsICYmICF0aGlzLl9hY3RpdmVDZWxsc1trZXldKSB7XG4gICAgICBpZiAodGhpcy5jZWxsRW50ZXIpIHtcbiAgICAgICAgdGhpcy5jZWxsRW50ZXIoY2VsbC5ib3VuZHMsIGNvb3Jkcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlyZSgnY2VsbGVudGVyJywge1xuICAgICAgICBib3VuZHM6IGNlbGwuYm91bmRzLFxuICAgICAgICBjb29yZHM6IGNvb3Jkc1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2FjdGl2ZUNlbGxzW2tleV0gPSBjZWxsO1xuICAgIH1cblxuICAgIC8vIGlmIHdlIGRvbnQgaGF2ZSB0aGlzIGNlbGwgaW4gdGhlIGNhY2hlIHlldCAoY3JlYXRlKVxuICAgIGlmICghY2VsbCkge1xuICAgICAgY2VsbCA9IHtcbiAgICAgICAgY29vcmRzOiBjb29yZHMsXG4gICAgICAgIGJvdW5kczogdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3JkcylcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX2NlbGxzW2tleV0gPSBjZWxsO1xuICAgICAgdGhpcy5fYWN0aXZlQ2VsbHNba2V5XSA9IGNlbGw7XG5cbiAgICAgIGlmICh0aGlzLmNyZWF0ZUNlbGwpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVDZWxsKGNlbGwuYm91bmRzLCBjb29yZHMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmUoJ2NlbGxjcmVhdGUnLCB7XG4gICAgICAgIGJvdW5kczogY2VsbC5ib3VuZHMsXG4gICAgICAgIGNvb3JkczogY29vcmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX3dyYXBDb29yZHM6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICBjb29yZHMueCA9IHRoaXMuX3dyYXBMbmcgPyBMLlV0aWwud3JhcE51bShjb29yZHMueCwgdGhpcy5fd3JhcExuZykgOiBjb29yZHMueDtcbiAgICBjb29yZHMueSA9IHRoaXMuX3dyYXBMYXQgPyBMLlV0aWwud3JhcE51bShjb29yZHMueSwgdGhpcy5fd3JhcExhdCkgOiBjb29yZHMueTtcbiAgfSxcblxuICAvLyBnZXQgdGhlIGdsb2JhbCBjZWxsIGNvb3JkaW5hdGVzIHJhbmdlIGZvciB0aGUgY3VycmVudCB6b29tXG4gIF9nZXRDZWxsTnVtQm91bmRzOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRQaXhlbFdvcmxkQm91bmRzKCk7XG4gICAgdmFyIHNpemUgPSB0aGlzLl9nZXRDZWxsU2l6ZSgpO1xuXG4gICAgcmV0dXJuIGJvdW5kcyA/IEwuYm91bmRzKFxuICAgICAgICBib3VuZHMubWluLmRpdmlkZUJ5KHNpemUpLmZsb29yKCksXG4gICAgICAgIGJvdW5kcy5tYXguZGl2aWRlQnkoc2l6ZSkuY2VpbCgpLnN1YnRyYWN0KFsxLCAxXSkpIDogbnVsbDtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFZpcnR1YWxHcmlkO1xuIiwiZnVuY3Rpb24gQmluYXJ5U2VhcmNoSW5kZXggKHZhbHVlcykge1xuICB0aGlzLnZhbHVlcyA9IFtdLmNvbmNhdCh2YWx1ZXMgfHwgW10pO1xufVxuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleCh2YWx1ZSk7XG4gIHJldHVybiB0aGlzLnZhbHVlc1tpbmRleF07XG59O1xuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUuZ2V0SW5kZXggPSBmdW5jdGlvbiBnZXRJbmRleCAodmFsdWUpIHtcbiAgaWYgKHRoaXMuZGlydHkpIHtcbiAgICB0aGlzLnNvcnQoKTtcbiAgfVxuXG4gIHZhciBtaW5JbmRleCA9IDA7XG4gIHZhciBtYXhJbmRleCA9IHRoaXMudmFsdWVzLmxlbmd0aCAtIDE7XG4gIHZhciBjdXJyZW50SW5kZXg7XG4gIHZhciBjdXJyZW50RWxlbWVudDtcblxuICB3aGlsZSAobWluSW5kZXggPD0gbWF4SW5kZXgpIHtcbiAgICBjdXJyZW50SW5kZXggPSAobWluSW5kZXggKyBtYXhJbmRleCkgLyAyIHwgMDtcbiAgICBjdXJyZW50RWxlbWVudCA9IHRoaXMudmFsdWVzW01hdGgucm91bmQoY3VycmVudEluZGV4KV07XG4gICAgaWYgKCtjdXJyZW50RWxlbWVudC52YWx1ZSA8ICt2YWx1ZSkge1xuICAgICAgbWluSW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xuICAgIH0gZWxzZSBpZiAoK2N1cnJlbnRFbGVtZW50LnZhbHVlID4gK3ZhbHVlKSB7XG4gICAgICBtYXhJbmRleCA9IGN1cnJlbnRJbmRleCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdXJyZW50SW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE1hdGguYWJzKH5tYXhJbmRleCk7XG59O1xuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUuYmV0d2VlbiA9IGZ1bmN0aW9uIGJldHdlZW4gKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHN0YXJ0SW5kZXggPSB0aGlzLmdldEluZGV4KHN0YXJ0KTtcbiAgdmFyIGVuZEluZGV4ID0gdGhpcy5nZXRJbmRleChlbmQpO1xuXG4gIGlmIChzdGFydEluZGV4ID09PSAwICYmIGVuZEluZGV4ID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgd2hpbGUgKHRoaXMudmFsdWVzW3N0YXJ0SW5kZXggLSAxXSAmJiB0aGlzLnZhbHVlc1tzdGFydEluZGV4IC0gMV0udmFsdWUgPT09IHN0YXJ0KSB7XG4gICAgc3RhcnRJbmRleC0tO1xuICB9XG5cbiAgd2hpbGUgKHRoaXMudmFsdWVzW2VuZEluZGV4ICsgMV0gJiYgdGhpcy52YWx1ZXNbZW5kSW5kZXggKyAxXS52YWx1ZSA9PT0gZW5kKSB7XG4gICAgZW5kSW5kZXgrKztcbiAgfVxuXG4gIGlmICh0aGlzLnZhbHVlc1tlbmRJbmRleF0gJiYgdGhpcy52YWx1ZXNbZW5kSW5kZXhdLnZhbHVlID09PSBlbmQgJiYgdGhpcy52YWx1ZXNbZW5kSW5kZXggKyAxXSkge1xuICAgIGVuZEluZGV4Kys7XG4gIH1cblxuICByZXR1cm4gdGhpcy52YWx1ZXMuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xufTtcblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIGluc2VydCAoaXRlbSkge1xuICB0aGlzLnZhbHVlcy5zcGxpY2UodGhpcy5nZXRJbmRleChpdGVtLnZhbHVlKSwgMCwgaXRlbSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLmJ1bGtBZGQgPSBmdW5jdGlvbiBidWxrQWRkIChpdGVtcywgc29ydCkge1xuICB0aGlzLnZhbHVlcyA9IHRoaXMudmFsdWVzLmNvbmNhdChbXS5jb25jYXQoaXRlbXMgfHwgW10pKTtcblxuICBpZiAoc29ydCkge1xuICAgIHRoaXMuc29ydCgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUuc29ydCA9IGZ1bmN0aW9uIHNvcnQgKCkge1xuICB0aGlzLnZhbHVlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuICtiLnZhbHVlIC0gK2EudmFsdWU7XG4gIH0pLnJldmVyc2UoKTtcbiAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJpbmFyeVNlYXJjaEluZGV4O1xuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IGZlYXR1cmVMYXllclNlcnZpY2UgZnJvbSAnLi4vLi4vU2VydmljZXMvRmVhdHVyZUxheWVyU2VydmljZSc7XG5pbXBvcnQgeyBnZXRVcmxQYXJhbXMsIHdhcm4sIHNldEVzcmlBdHRyaWJ1dGlvbiB9IGZyb20gJy4uLy4uL1V0aWwnO1xuaW1wb3J0IFZpcnR1YWxHcmlkIGZyb20gJ2xlYWZsZXQtdmlydHVhbC1ncmlkJztcbmltcG9ydCBCaW5hcnlTZWFyY2hJbmRleCBmcm9tICd0aW55LWJpbmFyeS1zZWFyY2gnO1xuXG5leHBvcnQgdmFyIEZlYXR1cmVNYW5hZ2VyID0gVmlydHVhbEdyaWQuZXh0ZW5kKHtcbiAgLyoqXG4gICAqIE9wdGlvbnNcbiAgICovXG5cbiAgb3B0aW9uczoge1xuICAgIGF0dHJpYnV0aW9uOiBudWxsLFxuICAgIHdoZXJlOiAnMT0xJyxcbiAgICBmaWVsZHM6IFsnKiddLFxuICAgIGZyb206IGZhbHNlLFxuICAgIHRvOiBmYWxzZSxcbiAgICB0aW1lRmllbGQ6IGZhbHNlLFxuICAgIHRpbWVGaWx0ZXJNb2RlOiAnc2VydmVyJyxcbiAgICBzaW1wbGlmeUZhY3RvcjogMCxcbiAgICBwcmVjaXNpb246IDZcbiAgfSxcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICovXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBWaXJ0dWFsR3JpZC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgb3B0aW9ucyA9IGdldFVybFBhcmFtcyhvcHRpb25zKTtcbiAgICBvcHRpb25zID0gVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5zZXJ2aWNlID0gZmVhdHVyZUxheWVyU2VydmljZShvcHRpb25zKTtcbiAgICB0aGlzLnNlcnZpY2UuYWRkRXZlbnRQYXJlbnQodGhpcyk7XG5cbiAgICAvLyB1c2UgY2FzZSBpbnNlbnNpdGl2ZSByZWdleCB0byBsb29rIGZvciBjb21tb24gZmllbGRuYW1lcyB1c2VkIGZvciBpbmRleGluZ1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZmllbGRzWzBdICE9PSAnKicpIHtcbiAgICAgIHZhciBvaWRDaGVjayA9IGZhbHNlO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMuZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZmllbGRzW2ldLm1hdGNoKC9eKE9CSkVDVElEfEZJRHxPSUR8SUQpJC9pKSkge1xuICAgICAgICAgIG9pZENoZWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9pZENoZWNrID09PSBmYWxzZSkge1xuICAgICAgICB3YXJuKCdubyBrbm93biBlc3JpRmllbGRUeXBlT0lEIGZpZWxkIGRldGVjdGVkIGluIGZpZWxkcyBBcnJheS4gIFBsZWFzZSBhZGQgYW4gYXR0cmlidXRlIGZpZWxkIGNvbnRhaW5pbmcgdW5pcXVlIElEcyB0byBlbnN1cmUgdGhlIGxheWVyIGNhbiBiZSBkcmF3biBjb3JyZWN0bHkuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnQgJiYgdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmQpIHtcbiAgICAgIHRoaXMuX3N0YXJ0VGltZUluZGV4ID0gbmV3IEJpbmFyeVNlYXJjaEluZGV4KCk7XG4gICAgICB0aGlzLl9lbmRUaW1lSW5kZXggPSBuZXcgQmluYXJ5U2VhcmNoSW5kZXgoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQpIHtcbiAgICAgIHRoaXMuX3RpbWVJbmRleCA9IG5ldyBCaW5hcnlTZWFyY2hJbmRleCgpO1xuICAgIH1cblxuICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgdGhpcy5fY3VycmVudFNuYXBzaG90ID0gW107IC8vIGNhY2hlIG9mIHdoYXQgbGF5ZXJzIHNob3VsZCBiZSBhY3RpdmVcbiAgICB0aGlzLl9hY3RpdmVSZXF1ZXN0cyA9IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIExheWVyIEludGVyZmFjZVxuICAgKi9cblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIC8vIGluY2x1ZGUgJ1Bvd2VyZWQgYnkgRXNyaScgaW4gbWFwIGF0dHJpYnV0aW9uXG4gICAgc2V0RXNyaUF0dHJpYnV0aW9uKG1hcCk7XG5cbiAgICB0aGlzLnNlcnZpY2UubWV0YWRhdGEoZnVuY3Rpb24gKGVyciwgbWV0YWRhdGEpIHtcbiAgICAgIGlmICghZXJyKSB7XG4gICAgICAgIHZhciBzdXBwb3J0ZWRGb3JtYXRzID0gbWV0YWRhdGEuc3VwcG9ydGVkUXVlcnlGb3JtYXRzO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHNvbWVvbmUgaGFzIHJlcXVlc3RlZCB0aGF0IHdlIGRvbid0IHVzZSBnZW9KU09OLCBldmVuIGlmIGl0J3MgYXZhaWxhYmxlXG4gICAgICAgIHZhciBmb3JjZUpzb25Gb3JtYXQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuc2VydmljZS5vcHRpb25zLmlzTW9kZXJuID09PSBmYWxzZSkge1xuICAgICAgICAgIGZvcmNlSnNvbkZvcm1hdCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVbmxlc3Mgd2UndmUgYmVlbiB0b2xkIG90aGVyd2lzZSwgY2hlY2sgdG8gc2VlIHdoZXRoZXIgc2VydmljZSBjYW4gZW1pdCBHZW9KU09OIG5hdGl2ZWx5XG4gICAgICAgIGlmICghZm9yY2VKc29uRm9ybWF0ICYmIHN1cHBvcnRlZEZvcm1hdHMgJiYgc3VwcG9ydGVkRm9ybWF0cy5pbmRleE9mKCdnZW9KU09OJykgIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5zZXJ2aWNlLm9wdGlvbnMuaXNNb2Rlcm4gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIGNvcHlyaWdodCB0ZXh0IGxpc3RlZCBpbiBzZXJ2aWNlIG1ldGFkYXRhXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uICYmIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wgJiYgbWV0YWRhdGEuY29weXJpZ2h0VGV4dCkge1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbiA9IG1ldGFkYXRhLmNvcHlyaWdodFRleHQ7XG4gICAgICAgICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5hZGRBdHRyaWJ1dGlvbih0aGlzLmdldEF0dHJpYnV0aW9uKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBtYXAub24oJ3pvb21lbmQnLCB0aGlzLl9oYW5kbGVab29tQ2hhbmdlLCB0aGlzKTtcblxuICAgIHJldHVybiBWaXJ0dWFsR3JpZC5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgbWFwLm9mZignem9vbWVuZCcsIHRoaXMuX2hhbmRsZVpvb21DaGFuZ2UsIHRoaXMpO1xuXG4gICAgcmV0dXJuIFZpcnR1YWxHcmlkLnByb3RvdHlwZS5vblJlbW92ZS5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG5cbiAgZ2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGZWF0dXJlIE1hbmFnZW1lbnRcbiAgICovXG5cbiAgY3JlYXRlQ2VsbDogZnVuY3Rpb24gKGJvdW5kcywgY29vcmRzKSB7XG4gICAgLy8gZG9udCBmZXRjaCBmZWF0dXJlcyBvdXRzaWRlIHRoZSBzY2FsZSByYW5nZSBkZWZpbmVkIGZvciB0aGUgbGF5ZXJcbiAgICBpZiAodGhpcy5fdmlzaWJsZVpvb20oKSkge1xuICAgICAgdGhpcy5fcmVxdWVzdEZlYXR1cmVzKGJvdW5kcywgY29vcmRzKTtcbiAgICB9XG4gIH0sXG5cbiAgX3JlcXVlc3RGZWF0dXJlczogZnVuY3Rpb24gKGJvdW5kcywgY29vcmRzLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2FjdGl2ZVJlcXVlc3RzKys7XG5cbiAgICAvLyBvdXIgZmlyc3QgYWN0aXZlIHJlcXVlc3QgZmlyZXMgbG9hZGluZ1xuICAgIGlmICh0aGlzLl9hY3RpdmVSZXF1ZXN0cyA9PT0gMSkge1xuICAgICAgdGhpcy5maXJlKCdsb2FkaW5nJywge1xuICAgICAgICBib3VuZHM6IGJvdW5kc1xuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2J1aWxkUXVlcnkoYm91bmRzKS5ydW4oZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlQ29sbGVjdGlvbiwgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5leGNlZWRlZFRyYW5zZmVyTGltaXQpIHtcbiAgICAgICAgdGhpcy5maXJlKCdkcmF3bGltaXRleGNlZWRlZCcpO1xuICAgICAgfVxuXG4gICAgICAvLyBubyBlcnJvciwgZmVhdHVyZXNcbiAgICAgIGlmICghZXJyb3IgJiYgZmVhdHVyZUNvbGxlY3Rpb24gJiYgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIHNjaGVkdWxlIGFkZGluZyBmZWF0dXJlcyB1bnRpbCB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWVcbiAgICAgICAgVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKFV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5fYWRkRmVhdHVyZXMoZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMsIGNvb3Jkcyk7XG4gICAgICAgICAgdGhpcy5fcG9zdFByb2Nlc3NGZWF0dXJlcyhib3VuZHMpO1xuICAgICAgICB9LCB0aGlzKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIG5vIGVycm9yLCBubyBmZWF0dXJlc1xuICAgICAgaWYgKCFlcnJvciAmJiBmZWF0dXJlQ29sbGVjdGlvbiAmJiAhZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX3Bvc3RQcm9jZXNzRmVhdHVyZXMoYm91bmRzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHRoaXMuX3Bvc3RQcm9jZXNzRmVhdHVyZXMoYm91bmRzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZXJyb3IsIGZlYXR1cmVDb2xsZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBfcG9zdFByb2Nlc3NGZWF0dXJlczogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIC8vIGRlaW5jcmVtZW50IHRoZSByZXF1ZXN0IGNvdW50ZXIgbm93IHRoYXQgd2UgaGF2ZSBwcm9jZXNzZWQgZmVhdHVyZXNcbiAgICB0aGlzLl9hY3RpdmVSZXF1ZXN0cy0tO1xuXG4gICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgYWN0aXZlIHJlcXVlc3RzIGZpcmUgYSBsb2FkIGV2ZW50IGZvciB0aGlzIHZpZXdcbiAgICBpZiAodGhpcy5fYWN0aXZlUmVxdWVzdHMgPD0gMCkge1xuICAgICAgdGhpcy5maXJlKCdsb2FkJywge1xuICAgICAgICBib3VuZHM6IGJvdW5kc1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIF9jYWNoZUtleTogZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIHJldHVybiBjb29yZHMueiArICc6JyArIGNvb3Jkcy54ICsgJzonICsgY29vcmRzLnk7XG4gIH0sXG5cbiAgX2FkZEZlYXR1cmVzOiBmdW5jdGlvbiAoZmVhdHVyZXMsIGNvb3Jkcykge1xuICAgIHZhciBrZXkgPSB0aGlzLl9jYWNoZUtleShjb29yZHMpO1xuICAgIHRoaXMuX2NhY2hlW2tleV0gPSB0aGlzLl9jYWNoZVtrZXldIHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IGZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgaWQgPSBmZWF0dXJlc1tpXS5pZDtcblxuICAgICAgaWYgKHRoaXMuX2N1cnJlbnRTbmFwc2hvdC5pbmRleE9mKGlkKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFNuYXBzaG90LnB1c2goaWQpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX2NhY2hlW2tleV0uaW5kZXhPZihpZCkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlW2tleV0ucHVzaChpZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQpIHtcbiAgICAgIHRoaXMuX2J1aWxkVGltZUluZGV4ZXMoZmVhdHVyZXMpO1xuICAgIH1cblxuICAgIHRoaXMuY3JlYXRlTGF5ZXJzKGZlYXR1cmVzKTtcbiAgfSxcblxuICBfYnVpbGRRdWVyeTogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIHZhciBxdWVyeSA9IHRoaXMuc2VydmljZS5xdWVyeSgpXG4gICAgICAuaW50ZXJzZWN0cyhib3VuZHMpXG4gICAgICAud2hlcmUodGhpcy5vcHRpb25zLndoZXJlKVxuICAgICAgLmZpZWxkcyh0aGlzLm9wdGlvbnMuZmllbGRzKVxuICAgICAgLnByZWNpc2lvbih0aGlzLm9wdGlvbnMucHJlY2lzaW9uKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucmVxdWVzdFBhcmFtcykge1xuICAgICAgTC5leHRlbmQocXVlcnkucGFyYW1zLCB0aGlzLm9wdGlvbnMucmVxdWVzdFBhcmFtcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zaW1wbGlmeUZhY3Rvcikge1xuICAgICAgcXVlcnkuc2ltcGxpZnkodGhpcy5fbWFwLCB0aGlzLm9wdGlvbnMuc2ltcGxpZnlGYWN0b3IpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZUZpbHRlck1vZGUgPT09ICdzZXJ2ZXInICYmIHRoaXMub3B0aW9ucy5mcm9tICYmIHRoaXMub3B0aW9ucy50bykge1xuICAgICAgcXVlcnkuYmV0d2Vlbih0aGlzLm9wdGlvbnMuZnJvbSwgdGhpcy5vcHRpb25zLnRvKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcXVlcnk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFdoZXJlIE1ldGhvZHNcbiAgICovXG5cbiAgc2V0V2hlcmU6IGZ1bmN0aW9uICh3aGVyZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLm9wdGlvbnMud2hlcmUgPSAod2hlcmUgJiYgd2hlcmUubGVuZ3RoKSA/IHdoZXJlIDogJzE9MSc7XG5cbiAgICB2YXIgb2xkU25hcHNob3QgPSBbXTtcbiAgICB2YXIgbmV3U25hcHNob3QgPSBbXTtcbiAgICB2YXIgcGVuZGluZ1JlcXVlc3RzID0gMDtcbiAgICB2YXIgcmVxdWVzdEVycm9yID0gbnVsbDtcbiAgICB2YXIgcmVxdWVzdENhbGxiYWNrID0gVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgZmVhdHVyZUNvbGxlY3Rpb24pIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXF1ZXN0RXJyb3IgPSBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZlYXR1cmVDb2xsZWN0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIG5ld1NuYXBzaG90LnB1c2goZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXNbaV0uaWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHBlbmRpbmdSZXF1ZXN0cy0tO1xuXG4gICAgICBpZiAocGVuZGluZ1JlcXVlc3RzIDw9IDAgJiYgdGhpcy5fdmlzaWJsZVpvb20oKSkge1xuICAgICAgICB0aGlzLl9jdXJyZW50U25hcHNob3QgPSBuZXdTbmFwc2hvdDtcbiAgICAgICAgLy8gc2NoZWR1bGUgYWRkaW5nIGZlYXR1cmVzIGZvciB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWVcbiAgICAgICAgVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKFV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMYXllcnMob2xkU25hcHNob3QpO1xuICAgICAgICAgIHRoaXMuYWRkTGF5ZXJzKG5ld1NuYXBzaG90KTtcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgcmVxdWVzdEVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcblxuICAgIGZvciAodmFyIGkgPSB0aGlzLl9jdXJyZW50U25hcHNob3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIG9sZFNuYXBzaG90LnB1c2godGhpcy5fY3VycmVudFNuYXBzaG90W2ldKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fYWN0aXZlQ2VsbHMpIHtcbiAgICAgIHBlbmRpbmdSZXF1ZXN0cysrO1xuICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuX2tleVRvQ2VsbENvb3JkcyhrZXkpO1xuICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuX2NlbGxDb29yZHNUb0JvdW5kcyhjb29yZHMpO1xuICAgICAgdGhpcy5fcmVxdWVzdEZlYXR1cmVzKGJvdW5kcywga2V5LCByZXF1ZXN0Q2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFdoZXJlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy53aGVyZTtcbiAgfSxcblxuICAvKipcbiAgICogVGltZSBSYW5nZSBNZXRob2RzXG4gICAqL1xuXG4gIGdldFRpbWVSYW5nZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBbdGhpcy5vcHRpb25zLmZyb20sIHRoaXMub3B0aW9ucy50b107XG4gIH0sXG5cbiAgc2V0VGltZVJhbmdlOiBmdW5jdGlvbiAoZnJvbSwgdG8sIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdmFyIG9sZEZyb20gPSB0aGlzLm9wdGlvbnMuZnJvbTtcbiAgICB2YXIgb2xkVG8gPSB0aGlzLm9wdGlvbnMudG87XG4gICAgdmFyIHBlbmRpbmdSZXF1ZXN0cyA9IDA7XG4gICAgdmFyIHJlcXVlc3RFcnJvciA9IG51bGw7XG4gICAgdmFyIHJlcXVlc3RDYWxsYmFjayA9IFV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXF1ZXN0RXJyb3IgPSBlcnJvcjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2ZpbHRlckV4aXN0aW5nRmVhdHVyZXMob2xkRnJvbSwgb2xkVG8sIGZyb20sIHRvKTtcblxuICAgICAgcGVuZGluZ1JlcXVlc3RzLS07XG5cbiAgICAgIGlmIChjYWxsYmFjayAmJiBwZW5kaW5nUmVxdWVzdHMgPD0gMCkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHJlcXVlc3RFcnJvcik7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0aGlzLm9wdGlvbnMuZnJvbSA9IGZyb207XG4gICAgdGhpcy5vcHRpb25zLnRvID0gdG87XG5cbiAgICB0aGlzLl9maWx0ZXJFeGlzdGluZ0ZlYXR1cmVzKG9sZEZyb20sIG9sZFRvLCBmcm9tLCB0byk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWx0ZXJNb2RlID09PSAnc2VydmVyJykge1xuICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2FjdGl2ZUNlbGxzKSB7XG4gICAgICAgIHBlbmRpbmdSZXF1ZXN0cysrO1xuICAgICAgICB2YXIgY29vcmRzID0gdGhpcy5fa2V5VG9DZWxsQ29vcmRzKGtleSk7XG4gICAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsQ29vcmRzVG9Cb3VuZHMoY29vcmRzKTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdEZlYXR1cmVzKGJvdW5kcywga2V5LCByZXF1ZXN0Q2FsbGJhY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fYWN0aXZlQ2VsbHMpIHtcbiAgICAgIHZhciBjb29yZHMgPSB0aGlzLl9rZXlUb0NlbGxDb29yZHMoa2V5KTtcbiAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsQ29vcmRzVG9Cb3VuZHMoY29vcmRzKTtcbiAgICAgIHRoaXMuX3JlcXVlc3RGZWF0dXJlcyhib3VuZHMsIGtleSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVkcmF3KSB7XG4gICAgICB0aGlzLm9uY2UoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZWFjaEZlYXR1cmUoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgICAgdGhpcy5fcmVkcmF3KGxheWVyLmZlYXR1cmUuaWQpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgfSxcblxuICBfZmlsdGVyRXhpc3RpbmdGZWF0dXJlczogZnVuY3Rpb24gKG9sZEZyb20sIG9sZFRvLCBuZXdGcm9tLCBuZXdUbykge1xuICAgIHZhciBsYXllcnNUb1JlbW92ZSA9IChvbGRGcm9tICYmIG9sZFRvKSA/IHRoaXMuX2dldEZlYXR1cmVzSW5UaW1lUmFuZ2Uob2xkRnJvbSwgb2xkVG8pIDogdGhpcy5fY3VycmVudFNuYXBzaG90O1xuICAgIHZhciBsYXllcnNUb0FkZCA9IHRoaXMuX2dldEZlYXR1cmVzSW5UaW1lUmFuZ2UobmV3RnJvbSwgbmV3VG8pO1xuXG4gICAgaWYgKGxheWVyc1RvQWRkLmluZGV4T2YpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGF5ZXJzVG9BZGQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNob3VsZFJlbW92ZUxheWVyID0gbGF5ZXJzVG9SZW1vdmUuaW5kZXhPZihsYXllcnNUb0FkZFtpXSk7XG4gICAgICAgIGlmIChzaG91bGRSZW1vdmVMYXllciA+PSAwKSB7XG4gICAgICAgICAgbGF5ZXJzVG9SZW1vdmUuc3BsaWNlKHNob3VsZFJlbW92ZUxheWVyLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNjaGVkdWxlIGFkZGluZyBmZWF0dXJlcyB1bnRpbCB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWVcbiAgICBVdGlsLnJlcXVlc3RBbmltRnJhbWUoVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKGxheWVyc1RvUmVtb3ZlKTtcbiAgICAgIHRoaXMuYWRkTGF5ZXJzKGxheWVyc1RvQWRkKTtcbiAgICB9LCB0aGlzKSk7XG4gIH0sXG5cbiAgX2dldEZlYXR1cmVzSW5UaW1lUmFuZ2U6IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgdmFyIGlkcyA9IFtdO1xuICAgIHZhciBzZWFyY2g7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWVsZC5zdGFydCAmJiB0aGlzLm9wdGlvbnMudGltZUZpZWxkLmVuZCkge1xuICAgICAgdmFyIHN0YXJ0VGltZXMgPSB0aGlzLl9zdGFydFRpbWVJbmRleC5iZXR3ZWVuKHN0YXJ0LCBlbmQpO1xuICAgICAgdmFyIGVuZFRpbWVzID0gdGhpcy5fZW5kVGltZUluZGV4LmJldHdlZW4oc3RhcnQsIGVuZCk7XG4gICAgICBzZWFyY2ggPSBzdGFydFRpbWVzLmNvbmNhdChlbmRUaW1lcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlYXJjaCA9IHRoaXMuX3RpbWVJbmRleC5iZXR3ZWVuKHN0YXJ0LCBlbmQpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSBzZWFyY2gubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGlkcy5wdXNoKHNlYXJjaFtpXS5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfSxcblxuICBfYnVpbGRUaW1lSW5kZXhlczogZnVuY3Rpb24gKGdlb2pzb24pIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgZmVhdHVyZTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWVsZC5zdGFydCAmJiB0aGlzLm9wdGlvbnMudGltZUZpZWxkLmVuZCkge1xuICAgICAgdmFyIHN0YXJ0VGltZUVudHJpZXMgPSBbXTtcbiAgICAgIHZhciBlbmRUaW1lRW50cmllcyA9IFtdO1xuICAgICAgZm9yIChpID0gZ2VvanNvbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBmZWF0dXJlID0gZ2VvanNvbltpXTtcbiAgICAgICAgc3RhcnRUaW1lRW50cmllcy5wdXNoKHtcbiAgICAgICAgICBpZDogZmVhdHVyZS5pZCxcbiAgICAgICAgICB2YWx1ZTogbmV3IERhdGUoZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnRdKVxuICAgICAgICB9KTtcbiAgICAgICAgZW5kVGltZUVudHJpZXMucHVzaCh7XG4gICAgICAgICAgaWQ6IGZlYXR1cmUuaWQsXG4gICAgICAgICAgdmFsdWU6IG5ldyBEYXRlKGZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkLmVuZF0pXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5fc3RhcnRUaW1lSW5kZXguYnVsa0FkZChzdGFydFRpbWVFbnRyaWVzKTtcbiAgICAgIHRoaXMuX2VuZFRpbWVJbmRleC5idWxrQWRkKGVuZFRpbWVFbnRyaWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRpbWVFbnRyaWVzID0gW107XG4gICAgICBmb3IgKGkgPSBnZW9qc29uLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGZlYXR1cmUgPSBnZW9qc29uW2ldO1xuICAgICAgICB0aW1lRW50cmllcy5wdXNoKHtcbiAgICAgICAgICBpZDogZmVhdHVyZS5pZCxcbiAgICAgICAgICB2YWx1ZTogbmV3IERhdGUoZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy50aW1lRmllbGRdKVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fdGltZUluZGV4LmJ1bGtBZGQodGltZUVudHJpZXMpO1xuICAgIH1cbiAgfSxcblxuICBfZmVhdHVyZVdpdGhpblRpbWVSYW5nZTogZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5mcm9tIHx8ICF0aGlzLm9wdGlvbnMudG8pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBmcm9tID0gK3RoaXMub3B0aW9ucy5mcm9tLnZhbHVlT2YoKTtcbiAgICB2YXIgdG8gPSArdGhpcy5vcHRpb25zLnRvLnZhbHVlT2YoKTtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnRpbWVGaWVsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBkYXRlID0gK2ZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkXTtcbiAgICAgIHJldHVybiAoZGF0ZSA+PSBmcm9tKSAmJiAoZGF0ZSA8PSB0byk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnQgJiYgdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmQpIHtcbiAgICAgIHZhciBzdGFydERhdGUgPSArZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnRdO1xuICAgICAgdmFyIGVuZERhdGUgPSArZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy50aW1lRmllbGQuZW5kXTtcbiAgICAgIHJldHVybiAoKHN0YXJ0RGF0ZSA+PSBmcm9tKSAmJiAoc3RhcnREYXRlIDw9IHRvKSkgfHwgKChlbmREYXRlID49IGZyb20pICYmIChlbmREYXRlIDw9IHRvKSk7XG4gICAgfVxuICB9LFxuXG4gIF92aXNpYmxlWm9vbTogZnVuY3Rpb24gKCkge1xuICAgIC8vIGNoZWNrIHRvIHNlZSB3aGV0aGVyIHRoZSBjdXJyZW50IHpvb20gbGV2ZWwgb2YgdGhlIG1hcCBpcyB3aXRoaW4gdGhlIG9wdGlvbmFsIGxpbWl0IGRlZmluZWQgZm9yIHRoZSBGZWF0dXJlTGF5ZXJcbiAgICBpZiAoIXRoaXMuX21hcCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgem9vbSA9IHRoaXMuX21hcC5nZXRab29tKCk7XG4gICAgaWYgKHpvb20gPiB0aGlzLm9wdGlvbnMubWF4Wm9vbSB8fCB6b29tIDwgdGhpcy5vcHRpb25zLm1pblpvb20pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgeyByZXR1cm4gdHJ1ZTsgfVxuICB9LFxuXG4gIF9oYW5kbGVab29tQ2hhbmdlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLl92aXNpYmxlWm9vbSgpKSB7XG4gICAgICB0aGlzLnJlbW92ZUxheWVycyh0aGlzLl9jdXJyZW50U25hcHNob3QpO1xuICAgICAgdGhpcy5fY3VycmVudFNuYXBzaG90ID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qXG4gICAgICBmb3IgZXZlcnkgY2VsbCBpbiB0aGlzLl9hY3RpdmVDZWxsc1xuICAgICAgICAxLiBHZXQgdGhlIGNhY2hlIGtleSBmb3IgdGhlIGNvb3JkcyBvZiB0aGUgY2VsbFxuICAgICAgICAyLiBJZiB0aGlzLl9jYWNoZVtrZXldIGV4aXN0cyBpdCB3aWxsIGJlIGFuIGFycmF5IG9mIGZlYXR1cmUgSURzLlxuICAgICAgICAzLiBDYWxsIHRoaXMuYWRkTGF5ZXJzKHRoaXMuX2NhY2hlW2tleV0pIHRvIGluc3RydWN0IHRoZSBmZWF0dXJlIGxheWVyIHRvIGFkZCB0aGUgbGF5ZXJzIGJhY2suXG4gICAgICAqL1xuICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLl9hY3RpdmVDZWxscykge1xuICAgICAgICB2YXIgY29vcmRzID0gdGhpcy5fYWN0aXZlQ2VsbHNbaV0uY29vcmRzO1xuICAgICAgICB2YXIga2V5ID0gdGhpcy5fY2FjaGVLZXkoY29vcmRzKTtcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlW2tleV0pIHtcbiAgICAgICAgICB0aGlzLmFkZExheWVycyh0aGlzLl9jYWNoZVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogU2VydmljZSBNZXRob2RzXG4gICAqL1xuXG4gIGF1dGhlbnRpY2F0ZTogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdGhpcy5zZXJ2aWNlLmF1dGhlbnRpY2F0ZSh0b2tlbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgbWV0YWRhdGE6IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuc2VydmljZS5tZXRhZGF0YShjYWxsYmFjaywgY29udGV4dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcXVlcnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLnF1ZXJ5KCk7XG4gIH0sXG5cbiAgX2dldE1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICBpZiAodGhpcy5fbWV0YWRhdGEpIHtcbiAgICAgIHZhciBlcnJvcjtcbiAgICAgIGNhbGxiYWNrKGVycm9yLCB0aGlzLl9tZXRhZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWV0YWRhdGEoVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGEgPSByZXNwb25zZTtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIHRoaXMuX21ldGFkYXRhKTtcbiAgICAgIH0sIHRoaXMpKTtcbiAgICB9XG4gIH0sXG5cbiAgYWRkRmVhdHVyZTogZnVuY3Rpb24gKGZlYXR1cmUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fZ2V0TWV0YWRhdGEoVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgbWV0YWRhdGEpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBpZiAoY2FsbGJhY2spIHsgY2FsbGJhY2suY2FsbCh0aGlzLCBlcnJvciwgbnVsbCk7IH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNlcnZpY2UuYWRkRmVhdHVyZShmZWF0dXJlLCBVdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgLy8gYXNzaWduIElEIGZyb20gcmVzdWx0IHRvIGFwcHJvcHJpYXRlIG9iamVjdGlkIGZpZWxkIGZyb20gc2VydmljZSBtZXRhZGF0YVxuICAgICAgICAgIGZlYXR1cmUucHJvcGVydGllc1ttZXRhZGF0YS5vYmplY3RJZEZpZWxkXSA9IHJlc3BvbnNlLm9iamVjdElkO1xuXG4gICAgICAgICAgLy8gd2UgYWxzbyBuZWVkIHRvIHVwZGF0ZSB0aGUgZ2VvanNvbiBpZCBmb3IgY3JlYXRlTGF5ZXJzKCkgdG8gZnVuY3Rpb25cbiAgICAgICAgICBmZWF0dXJlLmlkID0gcmVzcG9uc2Uub2JqZWN0SWQ7XG4gICAgICAgICAgdGhpcy5jcmVhdGVMYXllcnMoW2ZlYXR1cmVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcykpO1xuICAgIH0sIHRoaXMpKTtcbiAgfSxcblxuICB1cGRhdGVGZWF0dXJlOiBmdW5jdGlvbiAoZmVhdHVyZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UudXBkYXRlRmVhdHVyZShmZWF0dXJlLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKFtmZWF0dXJlLmlkXSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuY3JlYXRlTGF5ZXJzKFtmZWF0dXJlXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgZGVsZXRlRmVhdHVyZTogZnVuY3Rpb24gKGlkLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuc2VydmljZS5kZWxldGVGZWF0dXJlKGlkLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLm9iamVjdElkKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKFtyZXNwb25zZS5vYmplY3RJZF0sIHRydWUpO1xuICAgICAgfVxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBkZWxldGVGZWF0dXJlczogZnVuY3Rpb24gKGlkcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmRlbGV0ZUZlYXR1cmVzKGlkcywgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzcG9uc2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxheWVycyhbcmVzcG9uc2VbaV0ub2JqZWN0SWRdLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBVdGlsLCBHZW9KU09OLCBsYXRMbmcgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IEZlYXR1cmVNYW5hZ2VyIH0gZnJvbSAnLi9GZWF0dXJlTWFuYWdlcic7XG5cbmV4cG9ydCB2YXIgRmVhdHVyZUxheWVyID0gRmVhdHVyZU1hbmFnZXIuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgY2FjaGVMYXllcnM6IHRydWVcbiAgfSxcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICovXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgRmVhdHVyZU1hbmFnZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9vcmlnaW5hbFN0eWxlID0gdGhpcy5vcHRpb25zLnN0eWxlO1xuICAgIHRoaXMuX2xheWVycyA9IHt9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBMYXllciBJbnRlcmZhY2VcbiAgICovXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX2xheWVycykge1xuICAgICAgbWFwLnJlbW92ZUxheWVyKHRoaXMuX2xheWVyc1tpXSk7XG4gICAgICAvLyB0cmlnZ2VyIHRoZSBldmVudCB3aGVuIHRoZSBlbnRpcmUgZmVhdHVyZUxheWVyIGlzIHJlbW92ZWQgZnJvbSB0aGUgbWFwXG4gICAgICB0aGlzLmZpcmUoJ3JlbW92ZWZlYXR1cmUnLCB7XG4gICAgICAgIGZlYXR1cmU6IHRoaXMuX2xheWVyc1tpXS5mZWF0dXJlLFxuICAgICAgICBwZXJtYW5lbnQ6IGZhbHNlXG4gICAgICB9LCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gRmVhdHVyZU1hbmFnZXIucHJvdG90eXBlLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcbiAgfSxcblxuICBjcmVhdGVOZXdMYXllcjogZnVuY3Rpb24gKGdlb2pzb24pIHtcbiAgICB2YXIgbGF5ZXIgPSBHZW9KU09OLmdlb21ldHJ5VG9MYXllcihnZW9qc29uLCB0aGlzLm9wdGlvbnMpO1xuICAgIGxheWVyLmRlZmF1bHRPcHRpb25zID0gbGF5ZXIub3B0aW9ucztcbiAgICByZXR1cm4gbGF5ZXI7XG4gIH0sXG5cbiAgX3VwZGF0ZUxheWVyOiBmdW5jdGlvbiAobGF5ZXIsIGdlb2pzb24pIHtcbiAgICAvLyBjb252ZXJ0IHRoZSBnZW9qc29uIGNvb3JkaW5hdGVzIGludG8gYSBMZWFmbGV0IExhdExuZyBhcnJheS9uZXN0ZWQgYXJyYXlzXG4gICAgLy8gcGFzcyBpdCB0byBzZXRMYXRMbmdzIHRvIHVwZGF0ZSBsYXllciBnZW9tZXRyaWVzXG4gICAgdmFyIGxhdGxuZ3MgPSBbXTtcbiAgICB2YXIgY29vcmRzVG9MYXRMbmcgPSB0aGlzLm9wdGlvbnMuY29vcmRzVG9MYXRMbmcgfHwgR2VvSlNPTi5jb29yZHNUb0xhdExuZztcblxuICAgIC8vIGNvcHkgbmV3IGF0dHJpYnV0ZXMsIGlmIHByZXNlbnRcbiAgICBpZiAoZ2VvanNvbi5wcm9wZXJ0aWVzKSB7XG4gICAgICBsYXllci5mZWF0dXJlLnByb3BlcnRpZXMgPSBnZW9qc29uLnByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgc3dpdGNoIChnZW9qc29uLmdlb21ldHJ5LnR5cGUpIHtcbiAgICAgIGNhc2UgJ1BvaW50JzpcbiAgICAgICAgbGF0bG5ncyA9IEdlb0pTT04uY29vcmRzVG9MYXRMbmcoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcyk7XG4gICAgICAgIGxheWVyLnNldExhdExuZyhsYXRsbmdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdMaW5lU3RyaW5nJzpcbiAgICAgICAgbGF0bG5ncyA9IEdlb0pTT04uY29vcmRzVG9MYXRMbmdzKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIDAsIGNvb3Jkc1RvTGF0TG5nKTtcbiAgICAgICAgbGF5ZXIuc2V0TGF0TG5ncyhsYXRsbmdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdNdWx0aUxpbmVTdHJpbmcnOlxuICAgICAgICBsYXRsbmdzID0gR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcywgMSwgY29vcmRzVG9MYXRMbmcpO1xuICAgICAgICBsYXllci5zZXRMYXRMbmdzKGxhdGxuZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1BvbHlnb24nOlxuICAgICAgICBsYXRsbmdzID0gR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcywgMSwgY29vcmRzVG9MYXRMbmcpO1xuICAgICAgICBsYXllci5zZXRMYXRMbmdzKGxhdGxuZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ011bHRpUG9seWdvbic6XG4gICAgICAgIGxhdGxuZ3MgPSBHZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCAyLCBjb29yZHNUb0xhdExuZyk7XG4gICAgICAgIGxheWVyLnNldExhdExuZ3MobGF0bG5ncyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogRmVhdHVyZSBNYW5hZ2VtZW50IE1ldGhvZHNcbiAgICovXG5cbiAgY3JlYXRlTGF5ZXJzOiBmdW5jdGlvbiAoZmVhdHVyZXMpIHtcbiAgICBmb3IgKHZhciBpID0gZmVhdHVyZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBnZW9qc29uID0gZmVhdHVyZXNbaV07XG5cbiAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tnZW9qc29uLmlkXTtcbiAgICAgIHZhciBuZXdMYXllcjtcblxuICAgICAgaWYgKHRoaXMuX3Zpc2libGVab29tKCkgJiYgbGF5ZXIgJiYgIXRoaXMuX21hcC5oYXNMYXllcihsYXllcikpIHtcbiAgICAgICAgdGhpcy5fbWFwLmFkZExheWVyKGxheWVyKTtcbiAgICAgICAgdGhpcy5maXJlKCdhZGRmZWF0dXJlJywge1xuICAgICAgICAgIGZlYXR1cmU6IGxheWVyLmZlYXR1cmVcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSBnZW9tZXRyeSBpZiBuZWNlc3NhcnlcbiAgICAgIGlmIChsYXllciAmJiB0aGlzLm9wdGlvbnMuc2ltcGxpZnlGYWN0b3IgPiAwICYmIChsYXllci5zZXRMYXRMbmdzIHx8IGxheWVyLnNldExhdExuZykpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlTGF5ZXIobGF5ZXIsIGdlb2pzb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWxheWVyKSB7XG4gICAgICAgIG5ld0xheWVyID0gdGhpcy5jcmVhdGVOZXdMYXllcihnZW9qc29uKTtcbiAgICAgICAgbmV3TGF5ZXIuZmVhdHVyZSA9IGdlb2pzb247XG5cbiAgICAgICAgLy8gYnViYmxlIGV2ZW50cyBmcm9tIGluZGl2aWR1YWwgbGF5ZXJzIHRvIHRoZSBmZWF0dXJlIGxheWVyXG4gICAgICAgIG5ld0xheWVyLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMub25FYWNoRmVhdHVyZSkge1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5vbkVhY2hGZWF0dXJlKG5ld0xheWVyLmZlYXR1cmUsIG5ld0xheWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhY2hlIHRoZSBsYXllclxuICAgICAgICB0aGlzLl9sYXllcnNbbmV3TGF5ZXIuZmVhdHVyZS5pZF0gPSBuZXdMYXllcjtcblxuICAgICAgICAvLyBzdHlsZSB0aGUgbGF5ZXJcbiAgICAgICAgdGhpcy5zZXRGZWF0dXJlU3R5bGUobmV3TGF5ZXIuZmVhdHVyZS5pZCwgdGhpcy5vcHRpb25zLnN0eWxlKTtcblxuICAgICAgICB0aGlzLmZpcmUoJ2NyZWF0ZWZlYXR1cmUnLCB7XG4gICAgICAgICAgZmVhdHVyZTogbmV3TGF5ZXIuZmVhdHVyZVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICAvLyBhZGQgdGhlIGxheWVyIGlmIHRoZSBjdXJyZW50IHpvb20gbGV2ZWwgaXMgaW5zaWRlIHRoZSByYW5nZSBkZWZpbmVkIGZvciB0aGUgbGF5ZXIsIGl0IGlzIHdpdGhpbiB0aGUgY3VycmVudCB0aW1lIGJvdW5kcyBvciBvdXIgbGF5ZXIgaXMgbm90IHRpbWUgZW5hYmxlZFxuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZVpvb20oKSAmJiAoIXRoaXMub3B0aW9ucy50aW1lRmllbGQgfHwgKHRoaXMub3B0aW9ucy50aW1lRmllbGQgJiYgdGhpcy5fZmVhdHVyZVdpdGhpblRpbWVSYW5nZShnZW9qc29uKSkpKSB7XG4gICAgICAgICAgdGhpcy5fbWFwLmFkZExheWVyKG5ld0xheWVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBhZGRMYXllcnM6IGZ1bmN0aW9uIChpZHMpIHtcbiAgICBmb3IgKHZhciBpID0gaWRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRzW2ldXTtcbiAgICAgIGlmIChsYXllcikge1xuICAgICAgICB0aGlzLl9tYXAuYWRkTGF5ZXIobGF5ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZW1vdmVMYXllcnM6IGZ1bmN0aW9uIChpZHMsIHBlcm1hbmVudCkge1xuICAgIGZvciAodmFyIGkgPSBpZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBpZCA9IGlkc1tpXTtcbiAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgdGhpcy5maXJlKCdyZW1vdmVmZWF0dXJlJywge1xuICAgICAgICAgIGZlYXR1cmU6IGxheWVyLmZlYXR1cmUsXG4gICAgICAgICAgcGVybWFuZW50OiBwZXJtYW5lbnRcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcihsYXllcik7XG4gICAgICB9XG4gICAgICBpZiAobGF5ZXIgJiYgcGVybWFuZW50KSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBjZWxsRW50ZXI6IGZ1bmN0aW9uIChib3VuZHMsIGNvb3Jkcykge1xuICAgIGlmICh0aGlzLl92aXNpYmxlWm9vbSgpICYmICF0aGlzLl96b29taW5nICYmIHRoaXMuX21hcCkge1xuICAgICAgVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKFV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjYWNoZUtleSA9IHRoaXMuX2NhY2hlS2V5KGNvb3Jkcyk7XG4gICAgICAgIHZhciBjZWxsS2V5ID0gdGhpcy5fY2VsbENvb3Jkc1RvS2V5KGNvb3Jkcyk7XG4gICAgICAgIHZhciBsYXllcnMgPSB0aGlzLl9jYWNoZVtjYWNoZUtleV07XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVDZWxsc1tjZWxsS2V5XSAmJiBsYXllcnMpIHtcbiAgICAgICAgICB0aGlzLmFkZExheWVycyhsYXllcnMpO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfVxuICB9LFxuXG4gIGNlbGxMZWF2ZTogZnVuY3Rpb24gKGJvdW5kcywgY29vcmRzKSB7XG4gICAgaWYgKCF0aGlzLl96b29taW5nKSB7XG4gICAgICBVdGlsLnJlcXVlc3RBbmltRnJhbWUoVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX21hcCkge1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IHRoaXMuX2NhY2hlS2V5KGNvb3Jkcyk7XG4gICAgICAgICAgdmFyIGNlbGxLZXkgPSB0aGlzLl9jZWxsQ29vcmRzVG9LZXkoY29vcmRzKTtcbiAgICAgICAgICB2YXIgbGF5ZXJzID0gdGhpcy5fY2FjaGVbY2FjaGVLZXldO1xuICAgICAgICAgIHZhciBtYXBCb3VuZHMgPSB0aGlzLl9tYXAuZ2V0Qm91bmRzKCk7XG4gICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmVDZWxsc1tjZWxsS2V5XSAmJiBsYXllcnMpIHtcbiAgICAgICAgICAgIHZhciByZW1vdmFibGUgPSB0cnVlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbbGF5ZXJzW2ldXTtcbiAgICAgICAgICAgICAgaWYgKGxheWVyICYmIGxheWVyLmdldEJvdW5kcyAmJiBtYXBCb3VuZHMuaW50ZXJzZWN0cyhsYXllci5nZXRCb3VuZHMoKSkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVtb3ZhYmxlKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKGxheWVycywgIXRoaXMub3B0aW9ucy5jYWNoZUxheWVycyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLmNhY2hlTGF5ZXJzICYmIHJlbW92YWJsZSkge1xuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fY2FjaGVbY2FjaGVLZXldO1xuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fY2VsbHNbY2VsbEtleV07XG4gICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9hY3RpdmVDZWxsc1tjZWxsS2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFN0eWxpbmcgTWV0aG9kc1xuICAgKi9cblxuICByZXNldFN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vcHRpb25zLnN0eWxlID0gdGhpcy5fb3JpZ2luYWxTdHlsZTtcbiAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgdGhpcy5yZXNldEZlYXR1cmVTdHlsZShsYXllci5mZWF0dXJlLmlkKTtcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBzZXRTdHlsZTogZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgdGhpcy5vcHRpb25zLnN0eWxlID0gc3R5bGU7XG4gICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKGxheWVyLmZlYXR1cmUuaWQsIHN0eWxlKTtcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZXNldEZlYXR1cmVTdHlsZTogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICB2YXIgc3R5bGUgPSB0aGlzLl9vcmlnaW5hbFN0eWxlIHx8IEwuUGF0aC5wcm90b3R5cGUub3B0aW9ucztcbiAgICBpZiAobGF5ZXIpIHtcbiAgICAgIFV0aWwuZXh0ZW5kKGxheWVyLm9wdGlvbnMsIGxheWVyLmRlZmF1bHRPcHRpb25zKTtcbiAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKGlkLCBzdHlsZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHNldEZlYXR1cmVTdHlsZTogZnVuY3Rpb24gKGlkLCBzdHlsZSkge1xuICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgaWYgKHR5cGVvZiBzdHlsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgc3R5bGUgPSBzdHlsZShsYXllci5mZWF0dXJlKTtcbiAgICB9XG4gICAgaWYgKGxheWVyLnNldFN0eWxlKSB7XG4gICAgICBsYXllci5zZXRTdHlsZShzdHlsZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBVdGlsaXR5IE1ldGhvZHNcbiAgICovXG5cbiAgZWFjaEFjdGl2ZUZlYXR1cmU6IGZ1bmN0aW9uIChmbiwgY29udGV4dCkge1xuICAgIC8vIGZpZ3VyZSBvdXQgKHJvdWdobHkpIHdoaWNoIGxheWVycyBhcmUgaW4gdmlld1xuICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgIHZhciBhY3RpdmVCb3VuZHMgPSB0aGlzLl9tYXAuZ2V0Qm91bmRzKCk7XG4gICAgICBmb3IgKHZhciBpIGluIHRoaXMuX2xheWVycykge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudFNuYXBzaG90LmluZGV4T2YodGhpcy5fbGF5ZXJzW2ldLmZlYXR1cmUuaWQpICE9PSAtMSkge1xuICAgICAgICAgIC8vIGEgc2ltcGxlIHBvaW50IGluIHBvbHkgdGVzdCBmb3IgcG9pbnQgZ2VvbWV0cmllc1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fbGF5ZXJzW2ldLmdldExhdExuZyA9PT0gJ2Z1bmN0aW9uJyAmJiBhY3RpdmVCb3VuZHMuY29udGFpbnModGhpcy5fbGF5ZXJzW2ldLmdldExhdExuZygpKSkge1xuICAgICAgICAgICAgZm4uY2FsbChjb250ZXh0LCB0aGlzLl9sYXllcnNbaV0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuX2xheWVyc1tpXS5nZXRCb3VuZHMgPT09ICdmdW5jdGlvbicgJiYgYWN0aXZlQm91bmRzLmludGVyc2VjdHModGhpcy5fbGF5ZXJzW2ldLmdldEJvdW5kcygpKSkge1xuICAgICAgICAgICAgLy8gaW50ZXJzZWN0aW5nIGJvdW5kcyBjaGVjayBmb3IgcG9seWxpbmUgYW5kIHBvbHlnb24gZ2VvbWV0cmllc1xuICAgICAgICAgICAgZm4uY2FsbChjb250ZXh0LCB0aGlzLl9sYXllcnNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBlYWNoRmVhdHVyZTogZnVuY3Rpb24gKGZuLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgIGZuLmNhbGwoY29udGV4dCwgdGhpcy5fbGF5ZXJzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0RmVhdHVyZTogZnVuY3Rpb24gKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xheWVyc1tpZF07XG4gIH0sXG5cbiAgYnJpbmdUb0JhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgaWYgKGxheWVyLmJyaW5nVG9CYWNrKSB7XG4gICAgICAgIGxheWVyLmJyaW5nVG9CYWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgYnJpbmdUb0Zyb250OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgIGlmIChsYXllci5icmluZ1RvRnJvbnQpIHtcbiAgICAgICAgbGF5ZXIuYnJpbmdUb0Zyb250KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVkcmF3OiBmdW5jdGlvbiAoaWQpIHtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuX3JlZHJhdyhpZCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIF9yZWRyYXc6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgdmFyIGdlb2pzb24gPSBsYXllci5mZWF0dXJlO1xuXG4gICAgLy8gaWYgdGhpcyBsb29rcyBsaWtlIGEgbWFya2VyXG4gICAgaWYgKGxheWVyICYmIGxheWVyLnNldEljb24gJiYgdGhpcy5vcHRpb25zLnBvaW50VG9MYXllcikge1xuICAgICAgLy8gdXBkYXRlIGN1c3RvbSBzeW1ib2xvZ3ksIGlmIG5lY2Vzc2FyeVxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wb2ludFRvTGF5ZXIpIHtcbiAgICAgICAgdmFyIGdldEljb24gPSB0aGlzLm9wdGlvbnMucG9pbnRUb0xheWVyKGdlb2pzb24sIGxhdExuZyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdLCBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdKSk7XG4gICAgICAgIHZhciB1cGRhdGVkSWNvbiA9IGdldEljb24ub3B0aW9ucy5pY29uO1xuICAgICAgICBsYXllci5zZXRJY29uKHVwZGF0ZWRJY29uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBsb29rcyBsaWtlIGEgdmVjdG9yIG1hcmtlciAoY2lyY2xlTWFya2VyKVxuICAgIGlmIChsYXllciAmJiBsYXllci5zZXRTdHlsZSAmJiB0aGlzLm9wdGlvbnMucG9pbnRUb0xheWVyKSB7XG4gICAgICB2YXIgZ2V0U3R5bGUgPSB0aGlzLm9wdGlvbnMucG9pbnRUb0xheWVyKGdlb2pzb24sIGxhdExuZyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdLCBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdKSk7XG4gICAgICB2YXIgdXBkYXRlZFN0eWxlID0gZ2V0U3R5bGUub3B0aW9ucztcbiAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKGdlb2pzb24uaWQsIHVwZGF0ZWRTdHlsZSk7XG4gICAgfVxuXG4gICAgLy8gbG9va3MgbGlrZSBhIHBhdGggKHBvbHlnb24vcG9seWxpbmUpXG4gICAgaWYgKGxheWVyICYmIGxheWVyLnNldFN0eWxlICYmIHRoaXMub3B0aW9ucy5zdHlsZSkge1xuICAgICAgdGhpcy5yZXNldFN0eWxlKGdlb2pzb24uaWQpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlTGF5ZXIgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBGZWF0dXJlTGF5ZXIob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZlYXR1cmVMYXllcjtcbiJdLCJuYW1lcyI6WyJVdGlsIiwiRG9tVXRpbCIsImFyY2dpc1RvR2VvSlNPTiIsImdlb2pzb25Ub0FyY0dJUyIsImcyYSIsImEyZyIsImxhdExuZyIsImxhdExuZ0JvdW5kcyIsIkxhdExuZ0JvdW5kcyIsIkxhdExuZyIsIkdlb0pTT04iLCJDbGFzcyIsInBvaW50IiwiRXZlbnRlZCIsIlRpbGVMYXllciIsIkltYWdlT3ZlcmxheSIsIkNSUyIsIkxheWVyIiwicG9wdXAiLCJib3VuZHMiLCJMIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0NDQU8sSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksaUJBQWlCLElBQUksSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hHLENBQU8sSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsYUFBYSxLQUFLLEVBQUUsQ0FBQzs7QUFFL0Us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RSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RGLENBQUEsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RGLENBQUEsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVyRixDQUFBLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO0FBQ2hCLENBQUEsSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLENBQUEsSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDOztBQUV0QixDQUFBLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO0FBQ2xELENBQUEsTUFBTSxPQUFPLElBQUksQ0FBQztBQUNsQixDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQSxDQUFDOztBQUVELENBQUE7QUFDQSxDQUFBLFNBQVMsb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNyQyxDQUFBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pDLENBQUEsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDM0MsQ0FBQSxNQUFNLElBQUksc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNsRSxDQUFBLFFBQVEsT0FBTyxJQUFJLENBQUM7QUFDcEIsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUEsQ0FBQzs7QUFFRCxDQUFBO0FBQ0EsQ0FBQSxTQUFTLHVCQUF1QixFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7QUFDdEQsQ0FBQSxFQUFFLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztBQUN2QixDQUFBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN0RSxDQUFBLElBQUksSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLENBQUEsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2pLLENBQUEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxRQUFRLENB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QSxNQUFNLEdBQUcsRUFBRSxrQkFBa0I7QUFDN0IsQ0FBQSxNQUFNLEdBQUcsRUFBRSxrQkFBa0I7QUFDN0IsQ0FBQSxNQUFNLEdBQUcsRUFBRSxrQkFBa0I7QUFDN0IsQ0FBQSxNQUFNLEdBQUcsRUFBRSxrQkFBa0I7QUFDN0IsQ0FBQSxNQUFNLEdBQUcsRUFBRSxrQkFBa0I7QUFDN0IsQ0FBQSxNQUFNLEdBQUcsRUFBRSxrQkFBa0I7QUFDN0IsQ0FBQSxNQUFNLEdBQUcsRUFBRSxrQkFBa0I7QUFDN0IsQ0FBQSxNQUFNLElBQUksRUFBRSxnQkFBZ0I7QUFDNUIsQ0FBQSxNQUFNLElBQUksRUFBRSxrQkFBa0I7QUFDOUIsQ0FBQSxNQUFNLElBQUksRUFBRSxrQkFBa0I7QUFDOUIsQ0FBQSxNQUFNLElBQUksRUFBRSxrQkFBa0I7QUFDOUIsQ0FBQSxNQUFNLElBQUksRUFBRSxrQkFBa0I7QUFDOUIsQ0FBQSxNQUFNLElBQUksRUFBRSxrQkFBa0I7QUFDOUIsQ0FBQSxNQUFNLElBQUksRUFBRSxnQkFBZ0I7QUFDNUIsQ0FBQSxNQUFNLElBQUksRUFBRSxrQkFBa0I7QUFDOUIsQ0FBQSxNQUFNLElBQUksRUFBRSxtQkFBbUI7QUFDL0IsQ0FBQSxNQUFNLElBQUksRUFBRSxtQkFBbUI7QUFDL0IsQ0FBQSxNQUFNLElBQUksRUFBRSxnQkFBZ0I7QUFDNUIsQ0FBQSxNQUFNLElBQUksRUFBRSxnQkFBZ0I7QUFDNUIsQ0FBQSxNQUFNLElBQUksRUFBRSxrQkFBa0I7QUFDOUIsQ0FBQSxNQUFNLElBQUksRUFBRSxrQkFBa0I7QUFDOUIsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxVQUFVLEVBQUUsVUFBVSxPQUFPLEVBQUU7QUFDakMsQ0FBQSxJQUFJLE9BQU8sR0FBR2QsUUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRTdDLENBQUE7QUFDQSxDQUFBLElBQUksT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQyxDQUFB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LHVCQUF1QixFQUFFLFVBQVUsT0FBTyxFQUFFO0FBQzlDLENBQUEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtBQUNoRCxDQUFBLE1BQU0sT0FBTyxJQUFJLENBQUM7QUFDbEIsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzVDLENBQUEsSUFBSSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUV4QyxDQUFBLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtBQUNwRCxDQUFBLE1BQU0sSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0QsQ0FBQSxNQUFNLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7QUFDNUMsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7QUFDcEUsQ0FBQSxNQUFNLElBQUksU0FBUyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4RSxDQUFBLE1BQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BFLENBQUEsTUFB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