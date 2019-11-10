/* esri-leaflet - v2.0.5 - Wed Nov 16 2016 12:09:59 GMT-0800 (PST)
 * Copyright (c) 2016 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}),global.L));
}(this, function (exports,L) { 'use strict';

	L = 'default' in L ? L['default'] : L;

	var version = "2.0.5";

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

	      httpRequest.onerror = L.Util.falseFn;

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
	  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
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

	  // get around ie10/11 bug which requires that the request be opened before a timeout is applied
	  if (requestLength <= 2000 && Support.cors) {
	    httpRequest.open('GET', url + '?' + paramString);
	  } else if (requestLength > 2000 && Support.cors) {
	    httpRequest.open('POST', url);
	    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	  }

	  if (typeof context !== 'undefined' && context !== null) {
	    if (typeof context.options !== 'undefined') {
	      httpRequest.timeout = context.options.timeout;
	    }
	  }

	  // request is less then 2000 characters and the browser supports CORS, make GET request with XMLHttpRequest
	  if (requestLength <= 2000 && Support.cors) {
	    // ensure cookies are passed through in cross-site Access-Control requests
	    httpRequest.withCredentials = true;
	    httpRequest.send(null);

	  // request is less more then 2000 characters and the browser supports CORS, make POST request with XMLHttpRequest
	  } else if (requestLength > 2000 && Support.cors) {
	    httpRequest.withCredentials = true;
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

	  var script = L.DomUtil.create('script', null, document.body);
	  script.type = 'text/javascript';
	  script.src = url + '?' + serialize(params);
	  script.id = callbackId;

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
	 * Copyright 2015 Esri
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
	 * limitations under the Liscense.
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
	function shallowClone$1 (obj) {
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
	    geojson.properties = (arcgis.attributes) ? shallowClone$1(arcgis.attributes) : null;
	    if (arcgis.attributes) {
	      geojson.id = arcgis.attributes[idAttribute] || arcgis.attributes.OBJECTID || arcgis.attributes.FID;
	    }
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
	      result.attributes = (geojson.properties) ? shallowClone$1(geojson.properties) : {};
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
	  // "NaN" coordinates from ArcGIS Server indicate a null geometry
	  if (extent.xmin !== 'NaN' && extent.ymin !== 'NaN' && extent.xmax !== 'NaN' && extent.ymax !== 'NaN') {
	    var sw = L.latLng(extent.ymin, extent.xmin);
	    var ne = L.latLng(extent.ymax, extent.xmax);
	    return L.latLngBounds(sw, ne);
	  } else {
	    return null;
	  }
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

	function responseToFeatureCollection (response, idAttribute) {
	  var objectIdField;
	  var features = response.features || response.results;
	  var count = features.length;

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
	  } else if (count) {
	    /* as a last resort, check for common ID fieldnames in the first feature returned
	    not foolproof. identifyFeatures can returned a mixed array of features. */
	    for (var key in features[0].attributes) {
	      if (key.match(/^(OBJECTID|FID|OID|ID)$/i)) {
	        objectIdField = key;
	        break;
	      }
	    }
	  }

	  var featureCollection = {
	    type: 'FeatureCollection',
	    features: []
	  };

	  if (count) {
	    for (var i = features.length - 1; i >= 0; i--) {
	      var feature = arcgisToGeoJSON(features[i], objectIdField);
	      featureCollection.features.push(feature);
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
	    L.DomUtil.addClass(map.attributionControl._container, 'esri-truncated-attribution:hover');

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
	    L.DomUtil.addClass(map.attributionControl._container, 'esri-truncated-attribution');

	    // update the width used to truncate when the map itself is resized
	    map.on('resize', function (e) {
	      map.attributionControl._container.style.maxWidth = calcAttributionWidth(e.target);
	    });

	    map.attributionControl._esriAttributionAdded = true;
	  }
	}

	function _getAttributionData (url, map) {
	  jsonp(url, {}, L.Util.bind(function (error, attributions) {
	    if (error) { return; }
	    map._esriAttributions = [];
	    for (var c = 0; c < attributions.contributors.length; c++) {
	      var contributor = attributions.contributors[c];

	      for (var i = 0; i < contributor.coverageAreas.length; i++) {
	        var coverageArea = contributor.coverageAreas[i];
	        var southWest = L.latLng(coverageArea.bbox[0], coverageArea.bbox[1]);
	        var northEast = L.latLng(coverageArea.bbox[2], coverageArea.bbox[3]);
	        map._esriAttributions.push({
	          attribution: contributor.attribution,
	          score: coverageArea.score,
	          bounds: L.latLngBounds(southWest, northEast),
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
	    var wrappedBounds = L.latLngBounds(
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

	var Util = {
	  shallowClone: shallowClone,
	  warn: warn,
	  cleanUrl: cleanUrl,
	  isArcgisOnline: isArcgisOnline,
	  geojsonTypeToArcGIS: geojsonTypeToArcGIS,
	  responseToFeatureCollection: responseToFeatureCollection,
	  geojsonToArcGIS: geojsonToArcGIS,
	  arcgisToGeoJSON: arcgisToGeoJSON,
	  boundsToExtent: boundsToExtent,
	  extentToBounds: extentToBounds,
	  calcAttributionWidth: calcAttributionWidth,
	  setEsriAttribution: setEsriAttribution,
	  _getAttributionData: _getAttributionData,
	  _updateMapAttribution: _updateMapAttribution
	};

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

	var Query = Task.extend({
	  setters: {
	    'offset': 'resultOffset',
	    'limit': 'resultRecordCount',
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

	    // services hosted on ArcGIS Online also support requesting geojson directly
	    if (this.options.isModern || Util.isArcgisOnline(this.options.url)) {
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

	  // only valid for Feature Services running on ArcGIS Server 10.3+ or ArcGIS Online
	  bounds: function (callback, context) {
	    this._cleanParams();
	    this.params.returnExtentOnly = true;
	    return this.request(function (error, response) {
	      if (response && response.extent && Util.extentToBounds(response.extent)) {
	        callback.call(context, error, Util.extentToBounds(response.extent), response);
	      } else {
	        error = {
	          message: 'Invalid Bounds'
	        };
	        callback.call(context, error, null, response);
	      }
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
	    if (geometry.type === 'Point' || geometry.type === 'LineString' || geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
	      this.params.geometry = Util.geojsonToArcGIS(geometry);
	      this.params.geometryType = Util.geojsonTypeToArcGIS(geometry.type);
	      return;
	    }

	    // warn the user if we havn't found an appropriate object
	    Util.warn('invalid geometry passed to spatial query. Should be L.LatLng, L.LatLngBounds, L.Marker or a GeoJSON Point, Line, Polygon or MultiPolygon object');

	    return;
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
	    useCors: cors,
	    timeout: 0
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

	var BasemapLayer = L.TileLayer.extend({
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
	    var tileOptions = L.Util.extend(config.options, options);

	    L.Util.setOptions(this, tileOptions);

	    if (this.options.token) {
	      config.urlTemplate += ('?token=' + this.options.token);
	    }

	    // call the initialize method on L.TileLayer to set everything up
	    L.TileLayer.prototype.initialize.call(this, config.urlTemplate, tileOptions);
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

	    L.TileLayer.prototype.onAdd.call(this, map);
	  },

	  onRemove: function (map) {
	    map.off('moveend', _updateMapAttribution);
	    L.TileLayer.prototype.onRemove.call(this, map);
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

	var TiledMapLayer = L.TileLayer.extend({
	  options: {
	    zoomOffsetAllowance: 0.1,
	    errorTileUrl: 'http://downloads2.esri.com/support/TechArticles/blank256.png'
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

	    var arcgisonline = new RegExp(/tiles.arcgis(online)?\.com/g);
	    if (arcgisonline.test(options.url)) {
	      this.tileUrl = this.tileUrl.replace('://tiles', '://tiles{s}');
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
	      z: (this._lodMap && this._lodMap[tilePoint.z]) ? this._lodMap[tilePoint.z] : tilePoint.z, // try lod map first, then just defualt to zoom level
	      x: tilePoint.x,
	      y: tilePoint.y
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
	    if (!this._lodMap || (this._lodMap && this._lodMap[coords.z])) {
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
	          if (map.options.crs === L.CRS.EPSG3857 && sr === 102100 || sr === 3857) {
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

	    L.TileLayer.prototype.onAdd.call(this, map);
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

	var Overlay = L.ImageOverlay.extend({
	  onAdd: function (map) {
	    this._topLeft = map.getPixelBounds().min;
	    L.ImageOverlay.prototype.onAdd.call(this, map);
	  },
	  _reset: function () {
	    if (this._map.options.crs === L.CRS.EPSG3857) {
	      L.ImageOverlay.prototype._reset.call(this);
	    } else {
	      L.DomUtil.setPosition(this._image, this._topLeft.subtract(this._map.getPixelOrigin()));
	    }
	  }
	});

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
	    // include 'Powered by Esri' in map attribution
	    setEsriAttribution(map);

	    this._update = L.Util.throttle(this._update, this.options.updateInterval, this);

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
	      this._currentImage._map.removeLayer(this._currentImage);
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

	    // ensure that we don't ask ArcGIS Server for a taller image than we have actual map displaying
	    var top = this._map.latLngToLayerPoint(bounds._northEast);
	    var bottom = this._map.latLngToLayerPoint(bounds._southWest);

	    if (top.y > 0 || bottom.y < size.y) {
	      size.y = bottom.y - top.y;
	    }

	    var sr = parseInt(this._map.options.crs.code.split(':')[1], 10);

	    var params = {
	      bbox: [sw.x, sw.y, ne.x, ne.y].join(','),
	      size: size.x + ',' + size.y,
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
	      this.service.request('exportImage', params, function (error, response) {
	        if (error) { return; } // we really can't do anything here but authenticate or requesterror will fire
	        if (this.options.token) {
	          response.href += ('?token=' + this.options.token);
	        }
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
	    var ne = this._map.options.crs.project(bounds.getNorthEast());
	    var sw = this._map.options.crs.project(bounds.getSouthWest());
	    var sr = parseInt(this._map.options.crs.code.split(':')[1], 10);

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
	      bboxSR: sr,
	      imageSR: sr
	    };

	    if (this.options.dynamicLayers) {
	      params.dynamicLayers = this.options.dynamicLayers;
	    }

	    if (this.options.layers) {
	      params.layers = 'show:' + this.options.layers.join(',');
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
	      this._renderImage(this.options.url + 'export' + L.Util.getParamString(params), bounds);
	    }
	  }
	});

	function dynamicMapLayer (url, options) {
	  return new DynamicMapLayer(url, options);
	}

	var VirtualGrid = L.Layer.extend({

	  options: {
	    cellSize: 512,
	    updateInterval: 150
	  },

	  initialize: function (options) {
	    options = L.setOptions(this, options);
	    this._zooming = false;
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
	    var cellBounds = L.bounds(
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
	        coords = L.point(i, j);
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

	    return L.latLngBounds(nw, se);
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

	    return L.point(x, y);
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
	    // include 'Powered by Esri' in map attribution
	    setEsriAttribution(map);

	    this.service.metadata(function (err, metadata) {
	      if (!err) {
	        var supportedFormats = metadata.supportedQueryFormats;
	        // check to see whether service can emit GeoJSON natively
	        if (supportedFormats && supportedFormats.indexOf('geoJSON') !== -1) {
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

	      if (error) {
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

	    // need to PR removal of the logic below too...
	    // https://github.com/patrickarlt/leaflet-virtual-grid/blob/master/src/virtual-grid.js#L100-L102

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
	        // schedule adding features for the next animation frame
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
	          this.fire('addfeature', {
	            feature: newLayer.feature
	          }, true);
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
	    if (!this._zooming && this._map) {
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

	exports.VERSION = version;
	exports.Support = Support;
	exports.options = options;
	exports.Util = Util;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvU3VwcG9ydC5qcyIsIi4uL3NyYy9PcHRpb25zLmpzIiwiLi4vc3JjL1JlcXVlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvYXJjZ2lzLXRvLWdlb2pzb24tdXRpbHMvaW5kZXguanMiLCIuLi9zcmMvVXRpbC5qcyIsIi4uL3NyYy9UYXNrcy9UYXNrLmpzIiwiLi4vc3JjL1Rhc2tzL1F1ZXJ5LmpzIiwiLi4vc3JjL1Rhc2tzL0ZpbmQuanMiLCIuLi9zcmMvVGFza3MvSWRlbnRpZnkuanMiLCIuLi9zcmMvVGFza3MvSWRlbnRpZnlGZWF0dXJlcy5qcyIsIi4uL3NyYy9UYXNrcy9JZGVudGlmeUltYWdlLmpzIiwiLi4vc3JjL1NlcnZpY2VzL1NlcnZpY2UuanMiLCIuLi9zcmMvU2VydmljZXMvTWFwU2VydmljZS5qcyIsIi4uL3NyYy9TZXJ2aWNlcy9JbWFnZVNlcnZpY2UuanMiLCIuLi9zcmMvU2VydmljZXMvRmVhdHVyZUxheWVyU2VydmljZS5qcyIsIi4uL3NyYy9MYXllcnMvQmFzZW1hcExheWVyLmpzIiwiLi4vc3JjL0xheWVycy9UaWxlZE1hcExheWVyLmpzIiwiLi4vc3JjL0xheWVycy9SYXN0ZXJMYXllci5qcyIsIi4uL3NyYy9MYXllcnMvSW1hZ2VNYXBMYXllci5qcyIsIi4uL3NyYy9MYXllcnMvRHluYW1pY01hcExheWVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtdmlydHVhbC1ncmlkL3NyYy92aXJ0dWFsLWdyaWQuanMiLCIuLi9ub2RlX21vZHVsZXMvdGlueS1iaW5hcnktc2VhcmNoL2luZGV4LmpzIiwiLi4vc3JjL0xheWVycy9GZWF0dXJlTGF5ZXIvRmVhdHVyZU1hbmFnZXIuanMiLCIuLi9zcmMvTGF5ZXJzL0ZlYXR1cmVMYXllci9GZWF0dXJlTGF5ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXRcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkxlYWZsZXQgcGx1Z2lucyBmb3IgY29uc3VtaW5nIEFyY0dJUyBPbmxpbmUgYW5kIEFyY0dJUyBTZXJ2ZXIgc2VydmljZXMuXCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMC41XCIsXG4gIFwiYXV0aG9yXCI6IFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gIFwiYnJvd3NlclwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWRlYnVnLmpzXCIsXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vZXNyaS9lc3JpLWxlYWZsZXQvaXNzdWVzXCJcbiAgfSxcbiAgXCJjb250cmlidXRvcnNcIjogW1xuICAgIFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gICAgXCJKb2huIEdyYXZvaXMgPGpncmF2b2lzQGVzcmkuY29tPiAoaHR0cDovL2pvaG5ncmF2b2lzLmNvbSlcIlxuICBdLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJhcmNnaXMtdG8tZ2VvanNvbi11dGlsc1wiOiBcIl4xLjAuMVwiLFxuICAgIFwibGVhZmxldFwiOiBcIl4xLjAuMFwiLFxuICAgIFwibGVhZmxldC12aXJ0dWFsLWdyaWRcIjogXCJeMS4wLjNcIixcbiAgICBcInRpbnktYmluYXJ5LXNlYXJjaFwiOiBcIl4xLjAuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCIyLjMuMFwiLFxuICAgIFwiZ2gtcmVsZWFzZVwiOiBcIl4yLjAuMFwiLFxuICAgIFwiaGlnaGxpZ2h0LmpzXCI6IFwiXjguMC4wXCIsXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4wLjguNVwiLFxuICAgIFwiaXNwYXJ0YVwiOiBcIl4zLjAuM1wiLFxuICAgIFwiaXN0YW5idWxcIjogXCJeMC40LjJcIixcbiAgICBcImthcm1hXCI6IFwiXjAuMTIuMTZcIixcbiAgICBcImthcm1hLWNoYWktc2lub25cIjogXCJeMC4xLjNcIixcbiAgICBcImthcm1hLWNvdmVyYWdlXCI6IFwiXjAuNS4zXCIsXG4gICAgXCJrYXJtYS1tb2NoYVwiOiBcIl4wLjEuMFwiLFxuICAgIFwia2FybWEtbW9jaGEtcmVwb3J0ZXJcIjogXCJeMC4yLjVcIixcbiAgICBcImthcm1hLXBoYW50b21qcy1sYXVuY2hlclwiOiBcIl4wLjIuMFwiLFxuICAgIFwia2FybWEtc291cmNlbWFwLWxvYWRlclwiOiBcIl4wLjMuNVwiLFxuICAgIFwibG9hZC1ncnVudC10YXNrc1wiOiBcIl4wLjQuMFwiLFxuICAgIFwibWtkaXJwXCI6IFwiXjAuNS4xXCIsXG4gICAgXCJtb2NoYVwiOiBcIl4yLjMuNFwiLFxuICAgIFwicGFyYWxsZWxzaGVsbFwiOiBcIl4yLjAuMFwiLFxuICAgIFwicGhhbnRvbWpzXCI6IFwiXjEuOS4xN1wiLFxuICAgIFwicm9sbHVwXCI6IFwiXjAuMjUuNFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1qc29uXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLW5vZGUtcmVzb2x2ZVwiOiBcIl4xLjQuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi11Z2xpZnlcIjogXCJeMC4zLjFcIixcbiAgICBcInNlbWlzdGFuZGFyZFwiOiBcIl44LjAuMFwiLFxuICAgIFwic2lub25cIjogXCJeMS4xMS4xXCIsXG4gICAgXCJzaW5vbi1jaGFpXCI6IFwiMi43LjBcIixcbiAgICBcInNuYXp6eVwiOiBcIl4yLjAuMVwiLFxuICAgIFwidWdsaWZ5LWpzXCI6IFwiXjIuNi4xXCIsXG4gICAgXCJ3YXRjaFwiOiBcIl4wLjE3LjFcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cDovL2VzcmkuZ2l0aHViLmlvL2VzcmktbGVhZmxldFwiLFxuICBcImpzbmV4dDptYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0LmpzXCIsXG4gIFwianNwbVwiOiB7XG4gICAgXCJyZWdpc3RyeVwiOiBcIm5wbVwiLFxuICAgIFwiZm9ybWF0XCI6IFwiZXM2XCIsXG4gICAgXCJtYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0LmpzXCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJhcmNnaXNcIixcbiAgICBcImVzcmlcIixcbiAgICBcImVzcmkgbGVhZmxldFwiLFxuICAgIFwiZ2lzXCIsXG4gICAgXCJsZWFmbGV0IHBsdWdpblwiLFxuICAgIFwibWFwcGluZ1wiXG4gIF0sXG4gIFwibGljZW5zZVwiOiBcIkFwYWNoZS0yLjBcIixcbiAgXCJtYWluXCI6IFwiZGlzdC9lc3JpLWxlYWZsZXQtZGVidWcuanNcIixcbiAgXCJyZWFkbWVGaWxlbmFtZVwiOiBcIlJFQURNRS5tZFwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0QGdpdGh1Yi5jb206RXNyaS9lc3JpLWxlYWZsZXQuZ2l0XCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwicm9sbHVwIC1jIHByb2ZpbGVzL2RlYnVnLmpzICYgcm9sbHVwIC1jIHByb2ZpbGVzL3Byb2R1Y3Rpb24uanNcIixcbiAgICBcImxpbnRcIjogXCJzZW1pc3RhbmRhcmQgfCBzbmF6enlcIixcbiAgICBcInByZWJ1aWxkXCI6IFwibWtkaXJwIGRpc3RcIixcbiAgICBcInByZXB1Ymxpc2hcIjogXCJucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV0ZXN0XCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIi4vc2NyaXB0cy9yZWxlYXNlLnNoXCIsXG4gICAgXCJzdGFydC13YXRjaFwiOiBcIndhdGNoIFxcXCJucG0gcnVuIGJ1aWxkXFxcIiBzcmNcIixcbiAgICBcInN0YXJ0XCI6IFwicGFyYWxsZWxzaGVsbCBcXFwibnBtIHJ1biBzdGFydC13YXRjaFxcXCIgXFxcImh0dHAtc2VydmVyIC1wIDUwMDAgLWMtMSAtb1xcXCJcIixcbiAgICBcInRlc3RcIjogXCJucG0gcnVuIGxpbnQgJiYga2FybWEgc3RhcnRcIlxuICB9LFxuICBcInNlbWlzdGFuZGFyZFwiOiB7XG4gICAgXCJnbG9iYWxzXCI6IFsgXCJleHBlY3RcIiwgXCJMXCIsIFwiWE1MSHR0cFJlcXVlc3RcIiwgXCJzaW5vblwiLCBcInhoclwiLCBcInByb2o0XCIgXVxuICB9XG59XG4iLCJleHBvcnQgdmFyIGNvcnMgPSAoKHdpbmRvdy5YTUxIdHRwUmVxdWVzdCAmJiAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCkpKTtcbmV4cG9ydCB2YXIgcG9pbnRlckV2ZW50cyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID09PSAnJztcblxuZXhwb3J0IHZhciBTdXBwb3J0ID0ge1xuICBjb3JzOiBjb3JzLFxuICBwb2ludGVyRXZlbnRzOiBwb2ludGVyRXZlbnRzXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0O1xuIiwiZXhwb3J0IHZhciBvcHRpb25zID0ge1xuICBhdHRyaWJ1dGlvbldpZHRoT2Zmc2V0OiA1NVxufTtcblxuZXhwb3J0IGRlZmF1bHQgb3B0aW9ucztcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi9TdXBwb3J0JztcbmltcG9ydCB7IHdhcm4gfSBmcm9tICcuL1V0aWwnO1xuXG52YXIgY2FsbGJhY2tzID0gMDtcblxuZnVuY3Rpb24gc2VyaWFsaXplIChwYXJhbXMpIHtcbiAgdmFyIGRhdGEgPSAnJztcblxuICBwYXJhbXMuZiA9IHBhcmFtcy5mIHx8ICdqc29uJztcblxuICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICB2YXIgcGFyYW0gPSBwYXJhbXNba2V5XTtcbiAgICAgIHZhciB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHBhcmFtKTtcbiAgICAgIHZhciB2YWx1ZTtcblxuICAgICAgaWYgKGRhdGEubGVuZ3RoKSB7XG4gICAgICAgIGRhdGEgKz0gJyYnO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICB2YWx1ZSA9IChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGFyYW1bMF0pID09PSAnW29iamVjdCBPYmplY3RdJykgPyBKU09OLnN0cmluZ2lmeShwYXJhbSkgOiBwYXJhbS5qb2luKCcsJyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkocGFyYW0pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICAgICAgdmFsdWUgPSBwYXJhbS52YWx1ZU9mKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHBhcmFtO1xuICAgICAgfVxuXG4gICAgICBkYXRhICs9IGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUmVxdWVzdCAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgdmFyIGh0dHBSZXF1ZXN0ID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpO1xuXG4gIGh0dHBSZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgIGh0dHBSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IEwuVXRpbC5mYWxzZUZuO1xuXG4gICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCB7XG4gICAgICBlcnJvcjoge1xuICAgICAgICBjb2RlOiA1MDAsXG4gICAgICAgIG1lc3NhZ2U6ICdYTUxIdHRwUmVxdWVzdCBlcnJvcidcbiAgICAgIH1cbiAgICB9LCBudWxsKTtcbiAgfTtcblxuICBodHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3BvbnNlO1xuICAgIHZhciBlcnJvcjtcblxuICAgIGlmIChodHRwUmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UoaHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVzcG9uc2UgPSBudWxsO1xuICAgICAgICBlcnJvciA9IHtcbiAgICAgICAgICBjb2RlOiA1MDAsXG4gICAgICAgICAgbWVzc2FnZTogJ0NvdWxkIG5vdCBwYXJzZSByZXNwb25zZSBhcyBKU09OLiBUaGlzIGNvdWxkIGFsc28gYmUgY2F1c2VkIGJ5IGEgQ09SUyBvciBYTUxIdHRwUmVxdWVzdCBlcnJvci4nXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmICghZXJyb3IgJiYgcmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgcmVzcG9uc2UgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBodHRwUmVxdWVzdC5vbmVycm9yID0gTC5VdGlsLmZhbHNlRm47XG5cbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlKTtcbiAgICB9XG4gIH07XG5cbiAgaHR0cFJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub25lcnJvcigpO1xuICB9O1xuXG4gIHJldHVybiBodHRwUmVxdWVzdDtcbn1cblxuZnVuY3Rpb24geG1sSHR0cFBvc3QgKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICB2YXIgaHR0cFJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0KGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgaHR0cFJlcXVlc3Qub3BlbignUE9TVCcsIHVybCk7XG5cbiAgaWYgKHR5cGVvZiBjb250ZXh0ICE9PSAndW5kZWZpbmVkJyAmJiBjb250ZXh0ICE9PSBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0Lm9wdGlvbnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBodHRwUmVxdWVzdC50aW1lb3V0ID0gY29udGV4dC5vcHRpb25zLnRpbWVvdXQ7XG4gICAgfVxuICB9XG4gIGh0dHBSZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcbiAgaHR0cFJlcXVlc3Quc2VuZChzZXJpYWxpemUocGFyYW1zKSk7XG5cbiAgcmV0dXJuIGh0dHBSZXF1ZXN0O1xufVxuXG5mdW5jdGlvbiB4bWxIdHRwR2V0ICh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgdmFyIGh0dHBSZXF1ZXN0ID0gY3JlYXRlUmVxdWVzdChjYWxsYmFjaywgY29udGV4dCk7XG4gIGh0dHBSZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCArICc/JyArIHNlcmlhbGl6ZShwYXJhbXMpLCB0cnVlKTtcblxuICBpZiAodHlwZW9mIGNvbnRleHQgIT09ICd1bmRlZmluZWQnICYmIGNvbnRleHQgIT09IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIGNvbnRleHQub3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGh0dHBSZXF1ZXN0LnRpbWVvdXQgPSBjb250ZXh0Lm9wdGlvbnMudGltZW91dDtcbiAgICB9XG4gIH1cbiAgaHR0cFJlcXVlc3Quc2VuZChudWxsKTtcblxuICByZXR1cm4gaHR0cFJlcXVlc3Q7XG59XG5cbi8vIEFKQVggaGFuZGxlcnMgZm9yIENPUlMgKG1vZGVybiBicm93c2Vycykgb3IgSlNPTlAgKG9sZGVyIGJyb3dzZXJzKVxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3QgKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICB2YXIgcGFyYW1TdHJpbmcgPSBzZXJpYWxpemUocGFyYW1zKTtcbiAgdmFyIGh0dHBSZXF1ZXN0ID0gY3JlYXRlUmVxdWVzdChjYWxsYmFjaywgY29udGV4dCk7XG4gIHZhciByZXF1ZXN0TGVuZ3RoID0gKHVybCArICc/JyArIHBhcmFtU3RyaW5nKS5sZW5ndGg7XG5cbiAgLy8gZ2V0IGFyb3VuZCBpZTEwLzExIGJ1ZyB3aGljaCByZXF1aXJlcyB0aGF0IHRoZSByZXF1ZXN0IGJlIG9wZW5lZCBiZWZvcmUgYSB0aW1lb3V0IGlzIGFwcGxpZWRcbiAgaWYgKHJlcXVlc3RMZW5ndGggPD0gMjAwMCAmJiBTdXBwb3J0LmNvcnMpIHtcbiAgICBodHRwUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwgKyAnPycgKyBwYXJhbVN0cmluZyk7XG4gIH0gZWxzZSBpZiAocmVxdWVzdExlbmd0aCA+IDIwMDAgJiYgU3VwcG9ydC5jb3JzKSB7XG4gICAgaHR0cFJlcXVlc3Qub3BlbignUE9TVCcsIHVybCk7XG4gICAgaHR0cFJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBjb250ZXh0ICE9PSAndW5kZWZpbmVkJyAmJiBjb250ZXh0ICE9PSBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0Lm9wdGlvbnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBodHRwUmVxdWVzdC50aW1lb3V0ID0gY29udGV4dC5vcHRpb25zLnRpbWVvdXQ7XG4gICAgfVxuICB9XG5cbiAgLy8gcmVxdWVzdCBpcyBsZXNzIHRoZW4gMjAwMCBjaGFyYWN0ZXJzIGFuZCB0aGUgYnJvd3NlciBzdXBwb3J0cyBDT1JTLCBtYWtlIEdFVCByZXF1ZXN0IHdpdGggWE1MSHR0cFJlcXVlc3RcbiAgaWYgKHJlcXVlc3RMZW5ndGggPD0gMjAwMCAmJiBTdXBwb3J0LmNvcnMpIHtcbiAgICAvLyBlbnN1cmUgY29va2llcyBhcmUgcGFzc2VkIHRocm91Z2ggaW4gY3Jvc3Mtc2l0ZSBBY2Nlc3MtQ29udHJvbCByZXF1ZXN0c1xuICAgIGh0dHBSZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgaHR0cFJlcXVlc3Quc2VuZChudWxsKTtcblxuICAvLyByZXF1ZXN0IGlzIGxlc3MgbW9yZSB0aGVuIDIwMDAgY2hhcmFjdGVycyBhbmQgdGhlIGJyb3dzZXIgc3VwcG9ydHMgQ09SUywgbWFrZSBQT1NUIHJlcXVlc3Qgd2l0aCBYTUxIdHRwUmVxdWVzdFxuICB9IGVsc2UgaWYgKHJlcXVlc3RMZW5ndGggPiAyMDAwICYmIFN1cHBvcnQuY29ycykge1xuICAgIGh0dHBSZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgaHR0cFJlcXVlc3Quc2VuZChwYXJhbVN0cmluZyk7XG5cbiAgLy8gcmVxdWVzdCBpcyBsZXNzIG1vcmUgdGhlbiAyMDAwIGNoYXJhY3RlcnMgYW5kIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgQ09SUywgbWFrZSBhIEpTT05QIHJlcXVlc3RcbiAgfSBlbHNlIGlmIChyZXF1ZXN0TGVuZ3RoIDw9IDIwMDAgJiYgIVN1cHBvcnQuY29ycykge1xuICAgIHJldHVybiBqc29ucCh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuXG4gIC8vIHJlcXVlc3QgaXMgbG9uZ2VyIHRoZW4gMjAwMCBjaGFyYWN0ZXJzIGFuZCB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IENPUlMsIGxvZyBhIHdhcm5pbmdcbiAgfSBlbHNlIHtcbiAgICB3YXJuKCdhIHJlcXVlc3QgdG8gJyArIHVybCArICcgd2FzIGxvbmdlciB0aGVuIDIwMDAgY2hhcmFjdGVycyBhbmQgdGhpcyBicm93c2VyIGNhbm5vdCBtYWtlIGEgY3Jvc3MtZG9tYWluIHBvc3QgcmVxdWVzdC4gUGxlYXNlIHVzZSBhIHByb3h5IGh0dHA6Ly9lc3JpLmdpdGh1Yi5pby9lc3JpLWxlYWZsZXQvYXBpLXJlZmVyZW5jZS9yZXF1ZXN0Lmh0bWwnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXR1cm4gaHR0cFJlcXVlc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqc29ucCAodXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIHdpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3MgPSB3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzIHx8IHt9O1xuICB2YXIgY2FsbGJhY2tJZCA9ICdjJyArIGNhbGxiYWNrcztcbiAgcGFyYW1zLmNhbGxiYWNrID0gJ3dpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3MuJyArIGNhbGxiYWNrSWQ7XG5cbiAgd2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrc1tjYWxsYmFja0lkXSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIGlmICh3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzW2NhbGxiYWNrSWRdICE9PSB0cnVlKSB7XG4gICAgICB2YXIgZXJyb3I7XG4gICAgICB2YXIgcmVzcG9uc2VUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJlc3BvbnNlKTtcblxuICAgICAgaWYgKCEocmVzcG9uc2VUeXBlID09PSAnW29iamVjdCBPYmplY3RdJyB8fCByZXNwb25zZVR5cGUgPT09ICdbb2JqZWN0IEFycmF5XScpKSB7XG4gICAgICAgIGVycm9yID0ge1xuICAgICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgICBjb2RlOiA1MDAsXG4gICAgICAgICAgICBtZXNzYWdlOiAnRXhwZWN0ZWQgYXJyYXkgb3Igb2JqZWN0IGFzIEpTT05QIHJlc3BvbnNlJ1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVzcG9uc2UgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgIGVycm9yID0gcmVzcG9uc2U7XG4gICAgICAgIHJlc3BvbnNlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgICAgd2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrc1tjYWxsYmFja0lkXSA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIHZhciBzY3JpcHQgPSBMLkRvbVV0aWwuY3JlYXRlKCdzY3JpcHQnLCBudWxsLCBkb2N1bWVudC5ib2R5KTtcbiAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgc2NyaXB0LnNyYyA9IHVybCArICc/JyArIHNlcmlhbGl6ZShwYXJhbXMpO1xuICBzY3JpcHQuaWQgPSBjYWxsYmFja0lkO1xuXG4gIGNhbGxiYWNrcysrO1xuXG4gIHJldHVybiB7XG4gICAgaWQ6IGNhbGxiYWNrSWQsXG4gICAgdXJsOiBzY3JpcHQuc3JjLFxuICAgIGFib3J0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzLl9jYWxsYmFja1tjYWxsYmFja0lkXSh7XG4gICAgICAgIGNvZGU6IDAsXG4gICAgICAgIG1lc3NhZ2U6ICdSZXF1ZXN0IGFib3J0ZWQuJ1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgZ2V0ID0gKChTdXBwb3J0LmNvcnMpID8geG1sSHR0cEdldCA6IGpzb25wKTtcbmdldC5DT1JTID0geG1sSHR0cEdldDtcbmdldC5KU09OUCA9IGpzb25wO1xuXG4vLyBjaG9vc2UgdGhlIGNvcnJlY3QgQUpBWCBoYW5kbGVyIGRlcGVuZGluZyBvbiBDT1JTIHN1cHBvcnRcbmV4cG9ydCB7IGdldCB9O1xuXG4vLyBhbHdheXMgdXNlIFhNTEh0dHBSZXF1ZXN0IGZvciBwb3N0c1xuZXhwb3J0IHsgeG1sSHR0cFBvc3QgYXMgcG9zdCB9O1xuXG4vLyBleHBvcnQgdGhlIFJlcXVlc3Qgb2JqZWN0IHRvIGNhbGwgdGhlIGRpZmZlcmVudCBoYW5kbGVycyBmb3IgZGVidWdnaW5nXG5leHBvcnQgdmFyIFJlcXVlc3QgPSB7XG4gIHJlcXVlc3Q6IHJlcXVlc3QsXG4gIGdldDogZ2V0LFxuICBwb3N0OiB4bWxIdHRwUG9zdFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVxdWVzdDtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBFc3JpXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaXNjZW5zZS5cbiAqL1xuXG4vLyBjaGVja3MgaWYgMiB4LHkgcG9pbnRzIGFyZSBlcXVhbFxuZnVuY3Rpb24gcG9pbnRzRXF1YWwgKGEsIGIpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIGNoZWNrcyBpZiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnRzIG9mIGEgcmluZyBhcmUgZXF1YWwgYW5kIGNsb3NlcyB0aGUgcmluZ1xuZnVuY3Rpb24gY2xvc2VSaW5nIChjb29yZGluYXRlcykge1xuICBpZiAoIXBvaW50c0VxdWFsKGNvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1tjb29yZGluYXRlcy5sZW5ndGggLSAxXSkpIHtcbiAgICBjb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGVzWzBdKTtcbiAgfVxuICByZXR1cm4gY29vcmRpbmF0ZXM7XG59XG5cbi8vIGRldGVybWluZSBpZiBwb2x5Z29uIHJpbmcgY29vcmRpbmF0ZXMgYXJlIGNsb2Nrd2lzZS4gY2xvY2t3aXNlIHNpZ25pZmllcyBvdXRlciByaW5nLCBjb3VudGVyLWNsb2Nrd2lzZSBhbiBpbm5lciByaW5nXG4vLyBvciBob2xlLiB0aGlzIGxvZ2ljIHdhcyBmb3VuZCBhdCBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExNjU2NDcvaG93LXRvLWRldGVybWluZS1pZi1hLWxpc3Qtb2YtcG9seWdvbi1cbi8vIHBvaW50cy1hcmUtaW4tY2xvY2t3aXNlLW9yZGVyXG5mdW5jdGlvbiByaW5nSXNDbG9ja3dpc2UgKHJpbmdUb1Rlc3QpIHtcbiAgdmFyIHRvdGFsID0gMDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgckxlbmd0aCA9IHJpbmdUb1Rlc3QubGVuZ3RoO1xuICB2YXIgcHQxID0gcmluZ1RvVGVzdFtpXTtcbiAgdmFyIHB0MjtcbiAgZm9yIChpOyBpIDwgckxlbmd0aCAtIDE7IGkrKykge1xuICAgIHB0MiA9IHJpbmdUb1Rlc3RbaSArIDFdO1xuICAgIHRvdGFsICs9IChwdDJbMF0gLSBwdDFbMF0pICogKHB0MlsxXSArIHB0MVsxXSk7XG4gICAgcHQxID0gcHQyO1xuICB9XG4gIHJldHVybiAodG90YWwgPj0gMCk7XG59XG5cbi8vIHBvcnRlZCBmcm9tIHRlcnJhZm9ybWVyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL1RlcnJhZm9ybWVyL2Jsb2IvbWFzdGVyL3RlcnJhZm9ybWVyLmpzI0w1MDQtTDUxOVxuZnVuY3Rpb24gdmVydGV4SW50ZXJzZWN0c1ZlcnRleCAoYTEsIGEyLCBiMSwgYjIpIHtcbiAgdmFyIHVhVCA9IChiMlswXSAtIGIxWzBdKSAqIChhMVsxXSAtIGIxWzFdKSAtIChiMlsxXSAtIGIxWzFdKSAqIChhMVswXSAtIGIxWzBdKTtcbiAgdmFyIHViVCA9IChhMlswXSAtIGExWzBdKSAqIChhMVsxXSAtIGIxWzFdKSAtIChhMlsxXSAtIGExWzFdKSAqIChhMVswXSAtIGIxWzBdKTtcbiAgdmFyIHVCID0gKGIyWzFdIC0gYjFbMV0pICogKGEyWzBdIC0gYTFbMF0pIC0gKGIyWzBdIC0gYjFbMF0pICogKGEyWzFdIC0gYTFbMV0pO1xuXG4gIGlmICh1QiAhPT0gMCkge1xuICAgIHZhciB1YSA9IHVhVCAvIHVCO1xuICAgIHZhciB1YiA9IHViVCAvIHVCO1xuXG4gICAgaWYgKHVhID49IDAgJiYgdWEgPD0gMSAmJiB1YiA+PSAwICYmIHViIDw9IDEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gcG9ydGVkIGZyb20gdGVycmFmb3JtZXIuanMgaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvVGVycmFmb3JtZXIvYmxvYi9tYXN0ZXIvdGVycmFmb3JtZXIuanMjTDUyMS1MNTMxXG5mdW5jdGlvbiBhcnJheUludGVyc2VjdHNBcnJheSAoYSwgYikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBiLmxlbmd0aCAtIDE7IGorKykge1xuICAgICAgaWYgKHZlcnRleEludGVyc2VjdHNWZXJ0ZXgoYVtpXSwgYVtpICsgMV0sIGJbal0sIGJbaiArIDFdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIHBvcnRlZCBmcm9tIHRlcnJhZm9ybWVyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL1RlcnJhZm9ybWVyL2Jsb2IvbWFzdGVyL3RlcnJhZm9ybWVyLmpzI0w0NzAtTDQ4MFxuZnVuY3Rpb24gY29vcmRpbmF0ZXNDb250YWluUG9pbnQgKGNvb3JkaW5hdGVzLCBwb2ludCkge1xuICB2YXIgY29udGFpbnMgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IC0xLCBsID0gY29vcmRpbmF0ZXMubGVuZ3RoLCBqID0gbCAtIDE7ICsraSA8IGw7IGogPSBpKSB7XG4gICAgaWYgKCgoY29vcmRpbmF0ZXNbaV1bMV0gPD0gcG9pbnRbMV0gJiYgcG9pbnRbMV0gPCBjb29yZGluYXRlc1tqXVsxXSkgfHxcbiAgICAgICAgIChjb29yZGluYXRlc1tqXVsxXSA8PSBwb2ludFsxXSAmJiBwb2ludFsxXSA8IGNvb3JkaW5hdGVzW2ldWzFdKSkgJiZcbiAgICAgICAgKHBvaW50WzBdIDwgKGNvb3JkaW5hdGVzW2pdWzBdIC0gY29vcmRpbmF0ZXNbaV1bMF0pICogKHBvaW50WzFdIC0gY29vcmRpbmF0ZXNbaV1bMV0pIC8gKGNvb3JkaW5hdGVzW2pdWzFdIC0gY29vcmRpbmF0ZXNbaV1bMV0pICsgY29vcmRpbmF0ZXNbaV1bMF0pKSB7XG4gICAgICBjb250YWlucyA9ICFjb250YWlucztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbnRhaW5zO1xufVxuXG4vLyBwb3J0ZWQgZnJvbSB0ZXJyYWZvcm1lci1hcmNnaXMtcGFyc2VyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL3RlcnJhZm9ybWVyLWFyY2dpcy1wYXJzZXIvYmxvYi9tYXN0ZXIvdGVycmFmb3JtZXItYXJjZ2lzLXBhcnNlci5qcyNMMTA2LUwxMTNcbmZ1bmN0aW9uIGNvb3JkaW5hdGVzQ29udGFpbkNvb3JkaW5hdGVzIChvdXRlciwgaW5uZXIpIHtcbiAgdmFyIGludGVyc2VjdHMgPSBhcnJheUludGVyc2VjdHNBcnJheShvdXRlciwgaW5uZXIpO1xuICB2YXIgY29udGFpbnMgPSBjb29yZGluYXRlc0NvbnRhaW5Qb2ludChvdXRlciwgaW5uZXJbMF0pO1xuICBpZiAoIWludGVyc2VjdHMgJiYgY29udGFpbnMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIGRvIGFueSBwb2x5Z29ucyBpbiB0aGlzIGFycmF5IGNvbnRhaW4gYW55IG90aGVyIHBvbHlnb25zIGluIHRoaXMgYXJyYXk/XG4vLyB1c2VkIGZvciBjaGVja2luZyBmb3IgaG9sZXMgaW4gYXJjZ2lzIHJpbmdzXG4vLyBwb3J0ZWQgZnJvbSB0ZXJyYWZvcm1lci1hcmNnaXMtcGFyc2VyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL3RlcnJhZm9ybWVyLWFyY2dpcy1wYXJzZXIvYmxvYi9tYXN0ZXIvdGVycmFmb3JtZXItYXJjZ2lzLXBhcnNlci5qcyNMMTE3LUwxNzJcbmZ1bmN0aW9uIGNvbnZlcnRSaW5nc1RvR2VvSlNPTiAocmluZ3MpIHtcbiAgdmFyIG91dGVyUmluZ3MgPSBbXTtcbiAgdmFyIGhvbGVzID0gW107XG4gIHZhciB4OyAvLyBpdGVyYXRvclxuICB2YXIgb3V0ZXJSaW5nOyAvLyBjdXJyZW50IG91dGVyIHJpbmcgYmVpbmcgZXZhbHVhdGVkXG4gIHZhciBob2xlOyAvLyBjdXJyZW50IGhvbGUgYmVpbmcgZXZhbHVhdGVkXG5cbiAgLy8gZm9yIGVhY2ggcmluZ1xuICBmb3IgKHZhciByID0gMDsgciA8IHJpbmdzLmxlbmd0aDsgcisrKSB7XG4gICAgdmFyIHJpbmcgPSBjbG9zZVJpbmcocmluZ3Nbcl0uc2xpY2UoMCkpO1xuICAgIGlmIChyaW5nLmxlbmd0aCA8IDQpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICAvLyBpcyB0aGlzIHJpbmcgYW4gb3V0ZXIgcmluZz8gaXMgaXQgY2xvY2t3aXNlP1xuICAgIGlmIChyaW5nSXNDbG9ja3dpc2UocmluZykpIHtcbiAgICAgIHZhciBwb2x5Z29uID0gWyByaW5nIF07XG4gICAgICBvdXRlclJpbmdzLnB1c2gocG9seWdvbik7IC8vIHB1c2ggdG8gb3V0ZXIgcmluZ3NcbiAgICB9IGVsc2Uge1xuICAgICAgaG9sZXMucHVzaChyaW5nKTsgLy8gY291bnRlcmNsb2Nrd2lzZSBwdXNoIHRvIGhvbGVzXG4gICAgfVxuICB9XG5cbiAgdmFyIHVuY29udGFpbmVkSG9sZXMgPSBbXTtcblxuICAvLyB3aGlsZSB0aGVyZSBhcmUgaG9sZXMgbGVmdC4uLlxuICB3aGlsZSAoaG9sZXMubGVuZ3RoKSB7XG4gICAgLy8gcG9wIGEgaG9sZSBvZmYgb3V0IHN0YWNrXG4gICAgaG9sZSA9IGhvbGVzLnBvcCgpO1xuXG4gICAgLy8gbG9vcCBvdmVyIGFsbCBvdXRlciByaW5ncyBhbmQgc2VlIGlmIHRoZXkgY29udGFpbiBvdXIgaG9sZS5cbiAgICB2YXIgY29udGFpbmVkID0gZmFsc2U7XG4gICAgZm9yICh4ID0gb3V0ZXJSaW5ncy5sZW5ndGggLSAxOyB4ID49IDA7IHgtLSkge1xuICAgICAgb3V0ZXJSaW5nID0gb3V0ZXJSaW5nc1t4XVswXTtcbiAgICAgIGlmIChjb29yZGluYXRlc0NvbnRhaW5Db29yZGluYXRlcyhvdXRlclJpbmcsIGhvbGUpKSB7XG4gICAgICAgIC8vIHRoZSBob2xlIGlzIGNvbnRhaW5lZCBwdXNoIGl0IGludG8gb3VyIHBvbHlnb25cbiAgICAgICAgb3V0ZXJSaW5nc1t4XS5wdXNoKGhvbGUpO1xuICAgICAgICBjb250YWluZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByaW5nIGlzIG5vdCBjb250YWluZWQgaW4gYW55IG91dGVyIHJpbmdcbiAgICAvLyBzb21ldGltZXMgdGhpcyBoYXBwZW5zIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL2VzcmktbGVhZmxldC9pc3N1ZXMvMzIwXG4gICAgaWYgKCFjb250YWluZWQpIHtcbiAgICAgIHVuY29udGFpbmVkSG9sZXMucHVzaChob2xlKTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB3ZSBjb3VsZG4ndCBtYXRjaCBhbnkgaG9sZXMgdXNpbmcgY29udGFpbnMgd2UgY2FuIHRyeSBpbnRlcnNlY3RzLi4uXG4gIHdoaWxlICh1bmNvbnRhaW5lZEhvbGVzLmxlbmd0aCkge1xuICAgIC8vIHBvcCBhIGhvbGUgb2ZmIG91dCBzdGFja1xuICAgIGhvbGUgPSB1bmNvbnRhaW5lZEhvbGVzLnBvcCgpO1xuXG4gICAgLy8gbG9vcCBvdmVyIGFsbCBvdXRlciByaW5ncyBhbmQgc2VlIGlmIGFueSBpbnRlcnNlY3Qgb3VyIGhvbGUuXG4gICAgdmFyIGludGVyc2VjdHMgPSBmYWxzZTtcblxuICAgIGZvciAoeCA9IG91dGVyUmluZ3MubGVuZ3RoIC0gMTsgeCA+PSAwOyB4LS0pIHtcbiAgICAgIG91dGVyUmluZyA9IG91dGVyUmluZ3NbeF1bMF07XG4gICAgICBpZiAoYXJyYXlJbnRlcnNlY3RzQXJyYXkob3V0ZXJSaW5nLCBob2xlKSkge1xuICAgICAgICAvLyB0aGUgaG9sZSBpcyBjb250YWluZWQgcHVzaCBpdCBpbnRvIG91ciBwb2x5Z29uXG4gICAgICAgIG91dGVyUmluZ3NbeF0ucHVzaChob2xlKTtcbiAgICAgICAgaW50ZXJzZWN0cyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghaW50ZXJzZWN0cykge1xuICAgICAgb3V0ZXJSaW5ncy5wdXNoKFtob2xlLnJldmVyc2UoKV0pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvdXRlclJpbmdzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICBjb29yZGluYXRlczogb3V0ZXJSaW5nc1swXVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdNdWx0aVBvbHlnb24nLFxuICAgICAgY29vcmRpbmF0ZXM6IG91dGVyUmluZ3NcbiAgICB9O1xuICB9XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gZW5zdXJlcyB0aGF0IHJpbmdzIGFyZSBvcmllbnRlZCBpbiB0aGUgcmlnaHQgZGlyZWN0aW9uc1xuLy8gb3V0ZXIgcmluZ3MgYXJlIGNsb2Nrd2lzZSwgaG9sZXMgYXJlIGNvdW50ZXJjbG9ja3dpc2Vcbi8vIHVzZWQgZm9yIGNvbnZlcnRpbmcgR2VvSlNPTiBQb2x5Z29ucyB0byBBcmNHSVMgUG9seWdvbnNcbmZ1bmN0aW9uIG9yaWVudFJpbmdzIChwb2x5KSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgdmFyIHBvbHlnb24gPSBwb2x5LnNsaWNlKDApO1xuICB2YXIgb3V0ZXJSaW5nID0gY2xvc2VSaW5nKHBvbHlnb24uc2hpZnQoKS5zbGljZSgwKSk7XG4gIGlmIChvdXRlclJpbmcubGVuZ3RoID49IDQpIHtcbiAgICBpZiAoIXJpbmdJc0Nsb2Nrd2lzZShvdXRlclJpbmcpKSB7XG4gICAgICBvdXRlclJpbmcucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIG91dHB1dC5wdXNoKG91dGVyUmluZyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvbHlnb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBob2xlID0gY2xvc2VSaW5nKHBvbHlnb25baV0uc2xpY2UoMCkpO1xuICAgICAgaWYgKGhvbGUubGVuZ3RoID49IDQpIHtcbiAgICAgICAgaWYgKHJpbmdJc0Nsb2Nrd2lzZShob2xlKSkge1xuICAgICAgICAgIGhvbGUucmV2ZXJzZSgpO1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dC5wdXNoKGhvbGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gZmxhdHRlbnMgaG9sZXMgaW4gbXVsdGlwb2x5Z29ucyB0byBvbmUgYXJyYXkgb2YgcG9seWdvbnNcbi8vIHVzZWQgZm9yIGNvbnZlcnRpbmcgR2VvSlNPTiBQb2x5Z29ucyB0byBBcmNHSVMgUG9seWdvbnNcbmZ1bmN0aW9uIGZsYXR0ZW5NdWx0aVBvbHlnb25SaW5ncyAocmluZ3MpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHBvbHlnb24gPSBvcmllbnRSaW5ncyhyaW5nc1tpXSk7XG4gICAgZm9yICh2YXIgeCA9IHBvbHlnb24ubGVuZ3RoIC0gMTsgeCA+PSAwOyB4LS0pIHtcbiAgICAgIHZhciByaW5nID0gcG9seWdvblt4XS5zbGljZSgwKTtcbiAgICAgIG91dHB1dC5wdXNoKHJpbmcpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG4vLyBzaGFsbG93IG9iamVjdCBjbG9uZSBmb3IgZmVhdHVyZSBwcm9wZXJ0aWVzIGFuZCBhdHRyaWJ1dGVzXG4vLyBmcm9tIGh0dHA6Ly9qc3BlcmYuY29tL2Nsb25pbmctYW4tb2JqZWN0LzJcbmZ1bmN0aW9uIHNoYWxsb3dDbG9uZSAob2JqKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmNnaXNUb0dlb0pTT04gKGFyY2dpcywgaWRBdHRyaWJ1dGUpIHtcbiAgdmFyIGdlb2pzb24gPSB7fTtcblxuICBpZiAodHlwZW9mIGFyY2dpcy54ID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgYXJjZ2lzLnkgPT09ICdudW1iZXInKSB7XG4gICAgZ2VvanNvbi50eXBlID0gJ1BvaW50JztcbiAgICBnZW9qc29uLmNvb3JkaW5hdGVzID0gW2FyY2dpcy54LCBhcmNnaXMueV07XG4gIH1cblxuICBpZiAoYXJjZ2lzLnBvaW50cykge1xuICAgIGdlb2pzb24udHlwZSA9ICdNdWx0aVBvaW50JztcbiAgICBnZW9qc29uLmNvb3JkaW5hdGVzID0gYXJjZ2lzLnBvaW50cy5zbGljZSgwKTtcbiAgfVxuXG4gIGlmIChhcmNnaXMucGF0aHMpIHtcbiAgICBpZiAoYXJjZ2lzLnBhdGhzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZ2VvanNvbi50eXBlID0gJ0xpbmVTdHJpbmcnO1xuICAgICAgZ2VvanNvbi5jb29yZGluYXRlcyA9IGFyY2dpcy5wYXRoc1swXS5zbGljZSgwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VvanNvbi50eXBlID0gJ011bHRpTGluZVN0cmluZyc7XG4gICAgICBnZW9qc29uLmNvb3JkaW5hdGVzID0gYXJjZ2lzLnBhdGhzLnNsaWNlKDApO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhcmNnaXMucmluZ3MpIHtcbiAgICBnZW9qc29uID0gY29udmVydFJpbmdzVG9HZW9KU09OKGFyY2dpcy5yaW5ncy5zbGljZSgwKSk7XG4gIH1cblxuICBpZiAoYXJjZ2lzLmdlb21ldHJ5IHx8IGFyY2dpcy5hdHRyaWJ1dGVzKSB7XG4gICAgZ2VvanNvbi50eXBlID0gJ0ZlYXR1cmUnO1xuICAgIGdlb2pzb24uZ2VvbWV0cnkgPSAoYXJjZ2lzLmdlb21ldHJ5KSA/IGFyY2dpc1RvR2VvSlNPTihhcmNnaXMuZ2VvbWV0cnkpIDogbnVsbDtcbiAgICBnZW9qc29uLnByb3BlcnRpZXMgPSAoYXJjZ2lzLmF0dHJpYnV0ZXMpID8gc2hhbGxvd0Nsb25lKGFyY2dpcy5hdHRyaWJ1dGVzKSA6IG51bGw7XG4gICAgaWYgKGFyY2dpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICBnZW9qc29uLmlkID0gYXJjZ2lzLmF0dHJpYnV0ZXNbaWRBdHRyaWJ1dGVdIHx8IGFyY2dpcy5hdHRyaWJ1dGVzLk9CSkVDVElEIHx8IGFyY2dpcy5hdHRyaWJ1dGVzLkZJRDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2VvanNvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2pzb25Ub0FyY0dJUyAoZ2VvanNvbiwgaWRBdHRyaWJ1dGUpIHtcbiAgaWRBdHRyaWJ1dGUgPSBpZEF0dHJpYnV0ZSB8fCAnT0JKRUNUSUQnO1xuICB2YXIgc3BhdGlhbFJlZmVyZW5jZSA9IHsgd2tpZDogNDMyNiB9O1xuICB2YXIgcmVzdWx0ID0ge307XG4gIHZhciBpO1xuXG4gIHN3aXRjaCAoZ2VvanNvbi50eXBlKSB7XG4gICAgY2FzZSAnUG9pbnQnOlxuICAgICAgcmVzdWx0LnggPSBnZW9qc29uLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgcmVzdWx0LnkgPSBnZW9qc29uLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlQb2ludCc6XG4gICAgICByZXN1bHQucG9pbnRzID0gZ2VvanNvbi5jb29yZGluYXRlcy5zbGljZSgwKTtcbiAgICAgIHJlc3VsdC5zcGF0aWFsUmVmZXJlbmNlID0gc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxuICAgICAgcmVzdWx0LnBhdGhzID0gW2dlb2pzb24uY29vcmRpbmF0ZXMuc2xpY2UoMCldO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcbiAgICAgIHJlc3VsdC5wYXRocyA9IGdlb2pzb24uY29vcmRpbmF0ZXMuc2xpY2UoMCk7XG4gICAgICByZXN1bHQuc3BhdGlhbFJlZmVyZW5jZSA9IHNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdQb2x5Z29uJzpcbiAgICAgIHJlc3VsdC5yaW5ncyA9IG9yaWVudFJpbmdzKGdlb2pzb24uY29vcmRpbmF0ZXMuc2xpY2UoMCkpO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlQb2x5Z29uJzpcbiAgICAgIHJlc3VsdC5yaW5ncyA9IGZsYXR0ZW5NdWx0aVBvbHlnb25SaW5ncyhnZW9qc29uLmNvb3JkaW5hdGVzLnNsaWNlKDApKTtcbiAgICAgIHJlc3VsdC5zcGF0aWFsUmVmZXJlbmNlID0gc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0ZlYXR1cmUnOlxuICAgICAgaWYgKGdlb2pzb24uZ2VvbWV0cnkpIHtcbiAgICAgICAgcmVzdWx0Lmdlb21ldHJ5ID0gZ2VvanNvblRvQXJjR0lTKGdlb2pzb24uZ2VvbWV0cnksIGlkQXR0cmlidXRlKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5hdHRyaWJ1dGVzID0gKGdlb2pzb24ucHJvcGVydGllcykgPyBzaGFsbG93Q2xvbmUoZ2VvanNvbi5wcm9wZXJ0aWVzKSA6IHt9O1xuICAgICAgaWYgKGdlb2pzb24uaWQpIHtcbiAgICAgICAgcmVzdWx0LmF0dHJpYnV0ZXNbaWRBdHRyaWJ1dGVdID0gZ2VvanNvbi5pZDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0ZlYXR1cmVDb2xsZWN0aW9uJzpcbiAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZ2VvanNvblRvQXJjR0lTKGdlb2pzb24uZmVhdHVyZXNbaV0sIGlkQXR0cmlidXRlKSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdHZW9tZXRyeUNvbGxlY3Rpb24nOlxuICAgICAgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZ2VvanNvbi5nZW9tZXRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGdlb2pzb25Ub0FyY0dJUyhnZW9qc29uLmdlb21ldHJpZXNbaV0sIGlkQXR0cmlidXRlKSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGpzb25wIH0gZnJvbSAnLi9SZXF1ZXN0JztcbmltcG9ydCB7IG9wdGlvbnMgfSBmcm9tICcuL09wdGlvbnMnO1xuXG5pbXBvcnQge1xuICBnZW9qc29uVG9BcmNHSVMgYXMgZzJhLFxuICBhcmNnaXNUb0dlb0pTT04gYXMgYTJnXG59IGZyb20gJ2FyY2dpcy10by1nZW9qc29uLXV0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2pzb25Ub0FyY0dJUyAoZ2VvanNvbiwgaWRBdHRyKSB7XG4gIHJldHVybiBnMmEoZ2VvanNvbiwgaWRBdHRyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyY2dpc1RvR2VvSlNPTiAoYXJjZ2lzLCBpZEF0dHIpIHtcbiAgcmV0dXJuIGEyZyhhcmNnaXMsIGlkQXR0cik7XG59XG5cbi8vIHNoYWxsb3cgb2JqZWN0IGNsb25lIGZvciBmZWF0dXJlIHByb3BlcnRpZXMgYW5kIGF0dHJpYnV0ZXNcbi8vIGZyb20gaHR0cDovL2pzcGVyZi5jb20vY2xvbmluZy1hbi1vYmplY3QvMlxuZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dDbG9uZSAob2JqKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbi8vIGNvbnZlcnQgYW4gZXh0ZW50IChBcmNHSVMpIHRvIExhdExuZ0JvdW5kcyAoTGVhZmxldClcbmV4cG9ydCBmdW5jdGlvbiBleHRlbnRUb0JvdW5kcyAoZXh0ZW50KSB7XG4gIC8vIFwiTmFOXCIgY29vcmRpbmF0ZXMgZnJvbSBBcmNHSVMgU2VydmVyIGluZGljYXRlIGEgbnVsbCBnZW9tZXRyeVxuICBpZiAoZXh0ZW50LnhtaW4gIT09ICdOYU4nICYmIGV4dGVudC55bWluICE9PSAnTmFOJyAmJiBleHRlbnQueG1heCAhPT0gJ05hTicgJiYgZXh0ZW50LnltYXggIT09ICdOYU4nKSB7XG4gICAgdmFyIHN3ID0gTC5sYXRMbmcoZXh0ZW50LnltaW4sIGV4dGVudC54bWluKTtcbiAgICB2YXIgbmUgPSBMLmxhdExuZyhleHRlbnQueW1heCwgZXh0ZW50LnhtYXgpO1xuICAgIHJldHVybiBMLmxhdExuZ0JvdW5kcyhzdywgbmUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8vIGNvbnZlcnQgYW4gTGF0TG5nQm91bmRzIChMZWFmbGV0KSB0byBleHRlbnQgKEFyY0dJUylcbmV4cG9ydCBmdW5jdGlvbiBib3VuZHNUb0V4dGVudCAoYm91bmRzKSB7XG4gIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKGJvdW5kcyk7XG4gIHJldHVybiB7XG4gICAgJ3htaW4nOiBib3VuZHMuZ2V0U291dGhXZXN0KCkubG5nLFxuICAgICd5bWluJzogYm91bmRzLmdldFNvdXRoV2VzdCgpLmxhdCxcbiAgICAneG1heCc6IGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sbmcsXG4gICAgJ3ltYXgnOiBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubGF0LFxuICAgICdzcGF0aWFsUmVmZXJlbmNlJzoge1xuICAgICAgJ3draWQnOiA0MzI2XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uIChyZXNwb25zZSwgaWRBdHRyaWJ1dGUpIHtcbiAgdmFyIG9iamVjdElkRmllbGQ7XG4gIHZhciBmZWF0dXJlcyA9IHJlc3BvbnNlLmZlYXR1cmVzIHx8IHJlc3BvbnNlLnJlc3VsdHM7XG4gIHZhciBjb3VudCA9IGZlYXR1cmVzLmxlbmd0aDtcblxuICBpZiAoaWRBdHRyaWJ1dGUpIHtcbiAgICBvYmplY3RJZEZpZWxkID0gaWRBdHRyaWJ1dGU7XG4gIH0gZWxzZSBpZiAocmVzcG9uc2Uub2JqZWN0SWRGaWVsZE5hbWUpIHtcbiAgICBvYmplY3RJZEZpZWxkID0gcmVzcG9uc2Uub2JqZWN0SWRGaWVsZE5hbWU7XG4gIH0gZWxzZSBpZiAocmVzcG9uc2UuZmllbGRzKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPD0gcmVzcG9uc2UuZmllbGRzLmxlbmd0aCAtIDE7IGorKykge1xuICAgICAgaWYgKHJlc3BvbnNlLmZpZWxkc1tqXS50eXBlID09PSAnZXNyaUZpZWxkVHlwZU9JRCcpIHtcbiAgICAgICAgb2JqZWN0SWRGaWVsZCA9IHJlc3BvbnNlLmZpZWxkc1tqXS5uYW1lO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoY291bnQpIHtcbiAgICAvKiBhcyBhIGxhc3QgcmVzb3J0LCBjaGVjayBmb3IgY29tbW9uIElEIGZpZWxkbmFtZXMgaW4gdGhlIGZpcnN0IGZlYXR1cmUgcmV0dXJuZWRcbiAgICBub3QgZm9vbHByb29mLiBpZGVudGlmeUZlYXR1cmVzIGNhbiByZXR1cm5lZCBhIG1peGVkIGFycmF5IG9mIGZlYXR1cmVzLiAqL1xuICAgIGZvciAodmFyIGtleSBpbiBmZWF0dXJlc1swXS5hdHRyaWJ1dGVzKSB7XG4gICAgICBpZiAoa2V5Lm1hdGNoKC9eKE9CSkVDVElEfEZJRHxPSUR8SUQpJC9pKSkge1xuICAgICAgICBvYmplY3RJZEZpZWxkID0ga2V5O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgZmVhdHVyZUNvbGxlY3Rpb24gPSB7XG4gICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICBmZWF0dXJlczogW11cbiAgfTtcblxuICBpZiAoY291bnQpIHtcbiAgICBmb3IgKHZhciBpID0gZmVhdHVyZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmZWF0dXJlID0gYXJjZ2lzVG9HZW9KU09OKGZlYXR1cmVzW2ldLCBvYmplY3RJZEZpZWxkKTtcbiAgICAgIGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uO1xufVxuXG4gIC8vIHRyaW0gdXJsIHdoaXRlc3BhY2UgYW5kIGFkZCBhIHRyYWlsaW5nIHNsYXNoIGlmIG5lZWRlZFxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuVXJsICh1cmwpIHtcbiAgLy8gdHJpbSBsZWFkaW5nIGFuZCB0cmFpbGluZyBzcGFjZXMsIGJ1dCBub3Qgc3BhY2VzIGluc2lkZSB0aGUgdXJsXG4gIHVybCA9IEwuVXRpbC50cmltKHVybCk7XG5cbiAgLy8gYWRkIGEgdHJhaWxpbmcgc2xhc2ggdG8gdGhlIHVybCBpZiB0aGUgdXNlciBvbWl0dGVkIGl0XG4gIGlmICh1cmxbdXJsLmxlbmd0aCAtIDFdICE9PSAnLycpIHtcbiAgICB1cmwgKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJjZ2lzT25saW5lICh1cmwpIHtcbiAgLyogaG9zdGVkIGZlYXR1cmUgc2VydmljZXMgc3VwcG9ydCBnZW9qc29uIGFzIGFuIG91dHB1dCBmb3JtYXRcbiAgdXRpbGl0eS5hcmNnaXMuY29tIHNlcnZpY2VzIGFyZSBwcm94aWVkIGZyb20gYSB2YXJpZXR5IG9mIEFyY0dJUyBTZXJ2ZXIgdmludGFnZXMsIGFuZCBtYXkgbm90ICovXG4gIHJldHVybiAoL14oPyEuKnV0aWxpdHlcXC5hcmNnaXNcXC5jb20pLipcXC5hcmNnaXNcXC5jb20uKkZlYXR1cmVTZXJ2ZXIvaSkudGVzdCh1cmwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VvanNvblR5cGVUb0FyY0dJUyAoZ2VvSnNvblR5cGUpIHtcbiAgdmFyIGFyY2dpc0dlb21ldHJ5VHlwZTtcbiAgc3dpdGNoIChnZW9Kc29uVHlwZSkge1xuICAgIGNhc2UgJ1BvaW50JzpcbiAgICAgIGFyY2dpc0dlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2ludCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aVBvaW50JzpcbiAgICAgIGFyY2dpc0dlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlNdWx0aXBvaW50JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxuICAgICAgYXJjZ2lzR2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvbHlsaW5lJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ011bHRpTGluZVN0cmluZyc6XG4gICAgICBhcmNnaXNHZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9seWxpbmUnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUG9seWdvbic6XG4gICAgICBhcmNnaXNHZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9seWdvbic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxuICAgICAgYXJjZ2lzR2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvbHlnb24nO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gYXJjZ2lzR2VvbWV0cnlUeXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FybiAoKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2Fybikge1xuICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjQXR0cmlidXRpb25XaWR0aCAobWFwKSB7XG4gIC8vIGVpdGhlciBjcm9wIGF0IDU1cHggb3IgdXNlciBkZWZpbmVkIGJ1ZmZlclxuICByZXR1cm4gKG1hcC5nZXRTaXplKCkueCAtIG9wdGlvbnMuYXR0cmlidXRpb25XaWR0aE9mZnNldCkgKyAncHgnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RXNyaUF0dHJpYnV0aW9uIChtYXApIHtcbiAgaWYgKG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wgJiYgIW1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuX2VzcmlBdHRyaWJ1dGlvbkFkZGVkKSB7XG4gICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5zZXRQcmVmaXgoJzxhIGhyZWY9XCJodHRwOi8vbGVhZmxldGpzLmNvbVwiIHRpdGxlPVwiQSBKUyBsaWJyYXJ5IGZvciBpbnRlcmFjdGl2ZSBtYXBzXCI+TGVhZmxldDwvYT4gfCBQb3dlcmVkIGJ5IDxhIGhyZWY9XCJodHRwczovL3d3dy5lc3JpLmNvbVwiPkVzcmk8L2E+Jyk7XG5cbiAgICB2YXIgaG92ZXJBdHRyaWJ1dGlvblN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBob3ZlckF0dHJpYnV0aW9uU3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgaG92ZXJBdHRyaWJ1dGlvblN0eWxlLmlubmVySFRNTCA9ICcuZXNyaS10cnVuY2F0ZWQtYXR0cmlidXRpb246aG92ZXIgeycgK1xuICAgICAgJ3doaXRlLXNwYWNlOiBub3JtYWw7JyArXG4gICAgJ30nO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChob3ZlckF0dHJpYnV0aW9uU3R5bGUpO1xuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIsICdlc3JpLXRydW5jYXRlZC1hdHRyaWJ1dGlvbjpob3ZlcicpO1xuXG4gICAgLy8gZGVmaW5lIGEgbmV3IGNzcyBjbGFzcyBpbiBKUyB0byB0cmltIGF0dHJpYnV0aW9uIGludG8gYSBzaW5nbGUgbGluZVxuICAgIHZhciBhdHRyaWJ1dGlvblN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBhdHRyaWJ1dGlvblN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGF0dHJpYnV0aW9uU3R5bGUuaW5uZXJIVE1MID0gJy5lc3JpLXRydW5jYXRlZC1hdHRyaWJ1dGlvbiB7JyArXG4gICAgICAndmVydGljYWwtYWxpZ246IC0zcHg7JyArXG4gICAgICAnd2hpdGUtc3BhY2U6IG5vd3JhcDsnICtcbiAgICAgICdvdmVyZmxvdzogaGlkZGVuOycgK1xuICAgICAgJ3RleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOycgK1xuICAgICAgJ2Rpc3BsYXk6IGlubGluZS1ibG9jazsnICtcbiAgICAgICd0cmFuc2l0aW9uOiAwcyB3aGl0ZS1zcGFjZTsnICtcbiAgICAgICd0cmFuc2l0aW9uLWRlbGF5OiAxczsnICtcbiAgICAgICdtYXgtd2lkdGg6ICcgKyBjYWxjQXR0cmlidXRpb25XaWR0aChtYXApICsgJzsnICtcbiAgICAnfSc7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGF0dHJpYnV0aW9uU3R5bGUpO1xuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIsICdlc3JpLXRydW5jYXRlZC1hdHRyaWJ1dGlvbicpO1xuXG4gICAgLy8gdXBkYXRlIHRoZSB3aWR0aCB1c2VkIHRvIHRydW5jYXRlIHdoZW4gdGhlIG1hcCBpdHNlbGYgaXMgcmVzaXplZFxuICAgIG1hcC5vbigncmVzaXplJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuX2NvbnRhaW5lci5zdHlsZS5tYXhXaWR0aCA9IGNhbGNBdHRyaWJ1dGlvbldpZHRoKGUudGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuX2VzcmlBdHRyaWJ1dGlvbkFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2dldEF0dHJpYnV0aW9uRGF0YSAodXJsLCBtYXApIHtcbiAganNvbnAodXJsLCB7fSwgTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBhdHRyaWJ1dGlvbnMpIHtcbiAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9XG4gICAgbWFwLl9lc3JpQXR0cmlidXRpb25zID0gW107XG4gICAgZm9yICh2YXIgYyA9IDA7IGMgPCBhdHRyaWJ1dGlvbnMuY29udHJpYnV0b3JzLmxlbmd0aDsgYysrKSB7XG4gICAgICB2YXIgY29udHJpYnV0b3IgPSBhdHRyaWJ1dGlvbnMuY29udHJpYnV0b3JzW2NdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRyaWJ1dG9yLmNvdmVyYWdlQXJlYXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNvdmVyYWdlQXJlYSA9IGNvbnRyaWJ1dG9yLmNvdmVyYWdlQXJlYXNbaV07XG4gICAgICAgIHZhciBzb3V0aFdlc3QgPSBMLmxhdExuZyhjb3ZlcmFnZUFyZWEuYmJveFswXSwgY292ZXJhZ2VBcmVhLmJib3hbMV0pO1xuICAgICAgICB2YXIgbm9ydGhFYXN0ID0gTC5sYXRMbmcoY292ZXJhZ2VBcmVhLmJib3hbMl0sIGNvdmVyYWdlQXJlYS5iYm94WzNdKTtcbiAgICAgICAgbWFwLl9lc3JpQXR0cmlidXRpb25zLnB1c2goe1xuICAgICAgICAgIGF0dHJpYnV0aW9uOiBjb250cmlidXRvci5hdHRyaWJ1dGlvbixcbiAgICAgICAgICBzY29yZTogY292ZXJhZ2VBcmVhLnNjb3JlLFxuICAgICAgICAgIGJvdW5kczogTC5sYXRMbmdCb3VuZHMoc291dGhXZXN0LCBub3J0aEVhc3QpLFxuICAgICAgICAgIG1pblpvb206IGNvdmVyYWdlQXJlYS56b29tTWluLFxuICAgICAgICAgIG1heFpvb206IGNvdmVyYWdlQXJlYS56b29tTWF4XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1hcC5fZXNyaUF0dHJpYnV0aW9ucy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmU7XG4gICAgfSk7XG5cbiAgICAvLyBwYXNzIHRoZSBzYW1lIGFyZ3VtZW50IGFzIHRoZSBtYXAncyAnbW92ZWVuZCcgZXZlbnRcbiAgICB2YXIgb2JqID0geyB0YXJnZXQ6IG1hcCB9O1xuICAgIF91cGRhdGVNYXBBdHRyaWJ1dGlvbihvYmopO1xuICB9LCB0aGlzKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfdXBkYXRlTWFwQXR0cmlidXRpb24gKGV2dCkge1xuICB2YXIgbWFwID0gZXZ0LnRhcmdldDtcbiAgdmFyIG9sZEF0dHJpYnV0aW9ucyA9IG1hcC5fZXNyaUF0dHJpYnV0aW9ucztcblxuICBpZiAobWFwICYmIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wgJiYgb2xkQXR0cmlidXRpb25zKSB7XG4gICAgdmFyIG5ld0F0dHJpYnV0aW9ucyA9ICcnO1xuICAgIHZhciBib3VuZHMgPSBtYXAuZ2V0Qm91bmRzKCk7XG4gICAgdmFyIHdyYXBwZWRCb3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhcbiAgICAgIGJvdW5kcy5nZXRTb3V0aFdlc3QoKS53cmFwKCksXG4gICAgICBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkud3JhcCgpXG4gICAgKTtcbiAgICB2YXIgem9vbSA9IG1hcC5nZXRab29tKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZEF0dHJpYnV0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGF0dHJpYnV0aW9uID0gb2xkQXR0cmlidXRpb25zW2ldO1xuICAgICAgdmFyIHRleHQgPSBhdHRyaWJ1dGlvbi5hdHRyaWJ1dGlvbjtcblxuICAgICAgaWYgKCFuZXdBdHRyaWJ1dGlvbnMubWF0Y2godGV4dCkgJiYgYXR0cmlidXRpb24uYm91bmRzLmludGVyc2VjdHMod3JhcHBlZEJvdW5kcykgJiYgem9vbSA+PSBhdHRyaWJ1dGlvbi5taW5ab29tICYmIHpvb20gPD0gYXR0cmlidXRpb24ubWF4Wm9vbSkge1xuICAgICAgICBuZXdBdHRyaWJ1dGlvbnMgKz0gKCcsICcgKyB0ZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdBdHRyaWJ1dGlvbnMgPSBuZXdBdHRyaWJ1dGlvbnMuc3Vic3RyKDIpO1xuICAgIHZhciBhdHRyaWJ1dGlvbkVsZW1lbnQgPSBtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIucXVlcnlTZWxlY3RvcignLmVzcmktZHluYW1pYy1hdHRyaWJ1dGlvbicpO1xuXG4gICAgYXR0cmlidXRpb25FbGVtZW50LmlubmVySFRNTCA9IG5ld0F0dHJpYnV0aW9ucztcbiAgICBhdHRyaWJ1dGlvbkVsZW1lbnQuc3R5bGUubWF4V2lkdGggPSBjYWxjQXR0cmlidXRpb25XaWR0aChtYXApO1xuXG4gICAgbWFwLmZpcmUoJ2F0dHJpYnV0aW9udXBkYXRlZCcsIHtcbiAgICAgIGF0dHJpYnV0aW9uOiBuZXdBdHRyaWJ1dGlvbnNcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIFV0aWwgPSB7XG4gIHNoYWxsb3dDbG9uZTogc2hhbGxvd0Nsb25lLFxuICB3YXJuOiB3YXJuLFxuICBjbGVhblVybDogY2xlYW5VcmwsXG4gIGlzQXJjZ2lzT25saW5lOiBpc0FyY2dpc09ubGluZSxcbiAgZ2VvanNvblR5cGVUb0FyY0dJUzogZ2VvanNvblR5cGVUb0FyY0dJUyxcbiAgcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uOiByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24sXG4gIGdlb2pzb25Ub0FyY0dJUzogZ2VvanNvblRvQXJjR0lTLFxuICBhcmNnaXNUb0dlb0pTT046IGFyY2dpc1RvR2VvSlNPTixcbiAgYm91bmRzVG9FeHRlbnQ6IGJvdW5kc1RvRXh0ZW50LFxuICBleHRlbnRUb0JvdW5kczogZXh0ZW50VG9Cb3VuZHMsXG4gIGNhbGNBdHRyaWJ1dGlvbldpZHRoOiBjYWxjQXR0cmlidXRpb25XaWR0aCxcbiAgc2V0RXNyaUF0dHJpYnV0aW9uOiBzZXRFc3JpQXR0cmlidXRpb24sXG4gIF9nZXRBdHRyaWJ1dGlvbkRhdGE6IF9nZXRBdHRyaWJ1dGlvbkRhdGEsXG4gIF91cGRhdGVNYXBBdHRyaWJ1dGlvbjogX3VwZGF0ZU1hcEF0dHJpYnV0aW9uXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVdGlsO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQge2NvcnN9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHtjbGVhblVybH0gZnJvbSAnLi4vVXRpbCc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9SZXF1ZXN0JztcblxuZXhwb3J0IHZhciBUYXNrID0gTC5DbGFzcy5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBwcm94eTogZmFsc2UsXG4gICAgdXNlQ29yczogY29yc1xuICB9LFxuXG4gIC8vIEdlbmVyYXRlIGEgbWV0aG9kIGZvciBlYWNoIG1ldGhvZE5hbWU6cGFyYW1OYW1lIGluIHRoZSBzZXR0ZXJzIGZvciB0aGlzIHRhc2suXG4gIGdlbmVyYXRlU2V0dGVyOiBmdW5jdGlvbiAocGFyYW0sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB0aGlzLnBhcmFtc1twYXJhbV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIGNvbnRleHQpO1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChlbmRwb2ludCkge1xuICAgIC8vIGVuZHBvaW50IGNhbiBiZSBlaXRoZXIgYSB1cmwgKGFuZCBvcHRpb25zKSBmb3IgYW4gQXJjR0lTIFJlc3QgU2VydmljZSBvciBhbiBpbnN0YW5jZSBvZiBFc3JpTGVhZmxldC5TZXJ2aWNlXG4gICAgaWYgKGVuZHBvaW50LnJlcXVlc3QgJiYgZW5kcG9pbnQub3B0aW9ucykge1xuICAgICAgdGhpcy5fc2VydmljZSA9IGVuZHBvaW50O1xuICAgICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgZW5kcG9pbnQub3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIGVuZHBvaW50KTtcbiAgICAgIHRoaXMub3B0aW9ucy51cmwgPSBjbGVhblVybChlbmRwb2ludC51cmwpO1xuICAgIH1cblxuICAgIC8vIGNsb25lIGRlZmF1bHQgcGFyYW1zIGludG8gdGhpcyBvYmplY3RcbiAgICB0aGlzLnBhcmFtcyA9IEwuVXRpbC5leHRlbmQoe30sIHRoaXMucGFyYW1zIHx8IHt9KTtcblxuICAgIC8vIGdlbmVyYXRlIHNldHRlciBtZXRob2RzIGJhc2VkIG9uIHRoZSBzZXR0ZXJzIG9iamVjdCBpbXBsaW1lbnRlZCBhIGNoaWxkIGNsYXNzXG4gICAgaWYgKHRoaXMuc2V0dGVycykge1xuICAgICAgZm9yICh2YXIgc2V0dGVyIGluIHRoaXMuc2V0dGVycykge1xuICAgICAgICB2YXIgcGFyYW0gPSB0aGlzLnNldHRlcnNbc2V0dGVyXTtcbiAgICAgICAgdGhpc1tzZXR0ZXJdID0gdGhpcy5nZW5lcmF0ZVNldHRlcihwYXJhbSwgdGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHRva2VuOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICBpZiAodGhpcy5fc2VydmljZSkge1xuICAgICAgdGhpcy5fc2VydmljZS5hdXRoZW50aWNhdGUodG9rZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcmFtcy50b2tlbiA9IHRva2VuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZXF1ZXN0OiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAodGhpcy5fc2VydmljZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2UucmVxdWVzdCh0aGlzLnBhdGgsIHRoaXMucGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ3JlcXVlc3QnLCB0aGlzLnBhdGgsIHRoaXMucGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH0sXG5cbiAgX3JlcXVlc3Q6IGZ1bmN0aW9uIChtZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgdXJsID0gKHRoaXMub3B0aW9ucy5wcm94eSkgPyB0aGlzLm9wdGlvbnMucHJveHkgKyAnPycgKyB0aGlzLm9wdGlvbnMudXJsICsgcGF0aCA6IHRoaXMub3B0aW9ucy51cmwgKyBwYXRoO1xuXG4gICAgaWYgKChtZXRob2QgPT09ICdnZXQnIHx8IG1ldGhvZCA9PT0gJ3JlcXVlc3QnKSAmJiAhdGhpcy5vcHRpb25zLnVzZUNvcnMpIHtcbiAgICAgIHJldHVybiBSZXF1ZXN0LmdldC5KU09OUCh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiBSZXF1ZXN0W21ldGhvZF0odXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0YXNrIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgVGFzayhvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGFzaztcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vVGFzayc7XG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBRdWVyeSA9IFRhc2suZXh0ZW5kKHtcbiAgc2V0dGVyczoge1xuICAgICdvZmZzZXQnOiAncmVzdWx0T2Zmc2V0JyxcbiAgICAnbGltaXQnOiAncmVzdWx0UmVjb3JkQ291bnQnLFxuICAgICdmaWVsZHMnOiAnb3V0RmllbGRzJyxcbiAgICAncHJlY2lzaW9uJzogJ2dlb21ldHJ5UHJlY2lzaW9uJyxcbiAgICAnZmVhdHVyZUlkcyc6ICdvYmplY3RJZHMnLFxuICAgICdyZXR1cm5HZW9tZXRyeSc6ICdyZXR1cm5HZW9tZXRyeScsXG4gICAgJ3Rva2VuJzogJ3Rva2VuJ1xuICB9LFxuXG4gIHBhdGg6ICdxdWVyeScsXG5cbiAgcGFyYW1zOiB7XG4gICAgcmV0dXJuR2VvbWV0cnk6IHRydWUsXG4gICAgd2hlcmU6ICcxPTEnLFxuICAgIG91dFNyOiA0MzI2LFxuICAgIG91dEZpZWxkczogJyonXG4gIH0sXG5cbiAgd2l0aGluOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeShnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbENvbnRhaW5zJzsgLy8gd2lsbCBtYWtlIGNvZGUgcmVhZCBsYXllciB3aXRoaW4gZ2VvbWV0cnksIHRvIHRoZSBhcGkgdGhpcyB3aWxsIHJlYWRzIGdlb21ldHJ5IGNvbnRhaW5zIGxheWVyXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgaW50ZXJzZWN0czogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnkoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxJbnRlcnNlY3RzJztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBjb250YWluczogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnkoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxXaXRoaW4nOyAvLyB3aWxsIG1ha2UgY29kZSByZWFkIGxheWVyIGNvbnRhaW5zIGdlb21ldHJ5LCB0byB0aGUgYXBpIHRoaXMgd2lsbCByZWFkcyBnZW9tZXRyeSB3aXRoaW4gbGF5ZXJcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBjcm9zc2VzOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeShnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbENyb3NzZXMnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHRvdWNoZXM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5KGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsVG91Y2hlcyc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb3ZlcmxhcHM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5KGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsT3ZlcmxhcHMnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIG9ubHkgdmFsaWQgZm9yIEZlYXR1cmUgU2VydmljZXMgcnVubmluZyBvbiBBcmNHSVMgU2VydmVyIDEwLjMgb3IgQXJjR0lTIE9ubGluZVxuICBuZWFyYnk6IGZ1bmN0aW9uIChsYXRsbmcsIHJhZGl1cykge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnkgPSBbbGF0bG5nLmxuZywgbGF0bG5nLmxhdF07XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvaW50JztcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsSW50ZXJzZWN0cyc7XG4gICAgdGhpcy5wYXJhbXMudW5pdHMgPSAnZXNyaVNSVW5pdF9NZXRlcic7XG4gICAgdGhpcy5wYXJhbXMuZGlzdGFuY2UgPSByYWRpdXM7XG4gICAgdGhpcy5wYXJhbXMuaW5TciA9IDQzMjY7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgd2hlcmU6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAvLyBpbnN0ZWFkIG9mIGNvbnZlcnRpbmcgZG91YmxlLXF1b3RlcyB0byBzaW5nbGUgcXVvdGVzLCBwYXNzIGFzIGlzLCBhbmQgcHJvdmlkZSBhIG1vcmUgaW5mb3JtYXRpdmUgbWVzc2FnZSBpZiBhIDQwMCBpcyBlbmNvdW50ZXJlZFxuICAgIHRoaXMucGFyYW1zLndoZXJlID0gc3RyaW5nO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGJldHdlZW46IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgdGhpcy5wYXJhbXMudGltZSA9IFtzdGFydC52YWx1ZU9mKCksIGVuZC52YWx1ZU9mKCldO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHNpbXBsaWZ5OiBmdW5jdGlvbiAobWFwLCBmYWN0b3IpIHtcbiAgICB2YXIgbWFwV2lkdGggPSBNYXRoLmFicyhtYXAuZ2V0Qm91bmRzKCkuZ2V0V2VzdCgpIC0gbWFwLmdldEJvdW5kcygpLmdldEVhc3QoKSk7XG4gICAgdGhpcy5wYXJhbXMubWF4QWxsb3dhYmxlT2Zmc2V0ID0gKG1hcFdpZHRoIC8gbWFwLmdldFNpemUoKS55KSAqIGZhY3RvcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvcmRlckJ5OiBmdW5jdGlvbiAoZmllbGROYW1lLCBvcmRlcikge1xuICAgIG9yZGVyID0gb3JkZXIgfHwgJ0FTQyc7XG4gICAgdGhpcy5wYXJhbXMub3JkZXJCeUZpZWxkcyA9ICh0aGlzLnBhcmFtcy5vcmRlckJ5RmllbGRzKSA/IHRoaXMucGFyYW1zLm9yZGVyQnlGaWVsZHMgKyAnLCcgOiAnJztcbiAgICB0aGlzLnBhcmFtcy5vcmRlckJ5RmllbGRzICs9IChbZmllbGROYW1lLCBvcmRlcl0pLmpvaW4oJyAnKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuX2NsZWFuUGFyYW1zKCk7XG5cbiAgICAvLyBzZXJ2aWNlcyBob3N0ZWQgb24gQXJjR0lTIE9ubGluZSBhbHNvIHN1cHBvcnQgcmVxdWVzdGluZyBnZW9qc29uIGRpcmVjdGx5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc01vZGVybiB8fCBVdGlsLmlzQXJjZ2lzT25saW5lKHRoaXMub3B0aW9ucy51cmwpKSB7XG4gICAgICB0aGlzLnBhcmFtcy5mID0gJ2dlb2pzb24nO1xuXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5fdHJhcFNRTGVycm9ycyhlcnJvcik7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlLCByZXNwb25zZSk7XG4gICAgICB9LCB0aGlzKTtcblxuICAgIC8vIG90aGVyd2lzZSBjb252ZXJ0IGl0IGluIHRoZSBjYWxsYmFjayB0aGVuIHBhc3MgaXQgb25cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuX3RyYXBTUUxlcnJvcnMoZXJyb3IpO1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCAocmVzcG9uc2UgJiYgVXRpbC5yZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24ocmVzcG9uc2UpKSwgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICB9LFxuXG4gIGNvdW50OiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jbGVhblBhcmFtcygpO1xuICAgIHRoaXMucGFyYW1zLnJldHVybkNvdW50T25seSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGVycm9yLCAocmVzcG9uc2UgJiYgcmVzcG9uc2UuY291bnQpLCByZXNwb25zZSk7XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgaWRzOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jbGVhblBhcmFtcygpO1xuICAgIHRoaXMucGFyYW1zLnJldHVybklkc09ubHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBlcnJvciwgKHJlc3BvbnNlICYmIHJlc3BvbnNlLm9iamVjdElkcyksIHJlc3BvbnNlKTtcbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICAvLyBvbmx5IHZhbGlkIGZvciBGZWF0dXJlIFNlcnZpY2VzIHJ1bm5pbmcgb24gQXJjR0lTIFNlcnZlciAxMC4zKyBvciBBcmNHSVMgT25saW5lXG4gIGJvdW5kczogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fY2xlYW5QYXJhbXMoKTtcbiAgICB0aGlzLnBhcmFtcy5yZXR1cm5FeHRlbnRPbmx5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5leHRlbnQgJiYgVXRpbC5leHRlbnRUb0JvdW5kcyhyZXNwb25zZS5leHRlbnQpKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIFV0aWwuZXh0ZW50VG9Cb3VuZHMocmVzcG9uc2UuZXh0ZW50KSwgcmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3IgPSB7XG4gICAgICAgICAgbWVzc2FnZTogJ0ludmFsaWQgQm91bmRzJ1xuICAgICAgICB9O1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCBudWxsLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgLy8gb25seSB2YWxpZCBmb3IgaW1hZ2Ugc2VydmljZXNcbiAgcGl4ZWxTaXplOiBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICBwb2ludCA9IEwucG9pbnQocG9pbnQpO1xuICAgIHRoaXMucGFyYW1zLnBpeGVsU2l6ZSA9IFtwb2ludC54LCBwb2ludC55XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBvbmx5IHZhbGlkIGZvciBtYXAgc2VydmljZXNcbiAgbGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xuICAgIHRoaXMucGF0aCA9IGxheWVyICsgJy9xdWVyeSc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3RyYXBTUUxlcnJvcnM6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICc0MDAnKSB7XG4gICAgICAgIFV0aWwud2Fybignb25lIGNvbW1vbiBzeW50YXggZXJyb3IgaW4gcXVlcnkgcmVxdWVzdHMgaXMgZW5jYXNpbmcgc3RyaW5nIHZhbHVlcyBpbiBkb3VibGUgcXVvdGVzIGluc3RlYWQgb2Ygc2luZ2xlIHF1b3RlcycpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfY2xlYW5QYXJhbXM6IGZ1bmN0aW9uICgpIHtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuSWRzT25seTtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuRXh0ZW50T25seTtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuQ291bnRPbmx5O1xuICB9LFxuXG4gIF9zZXRHZW9tZXRyeTogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5wYXJhbXMuaW5TciA9IDQzMjY7XG5cbiAgICAvLyBjb252ZXJ0IGJvdW5kcyB0byBleHRlbnQgYW5kIGZpbmlzaFxuICAgIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIEwuTGF0TG5nQm91bmRzKSB7XG4gICAgICAvLyBzZXQgZ2VvbWV0cnkgKyBnZW9tZXRyeVR5cGVcbiAgICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gVXRpbC5ib3VuZHNUb0V4dGVudChnZW9tZXRyeSk7XG4gICAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5RW52ZWxvcGUnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnZlcnQgTC5NYXJrZXIgPiBMLkxhdExuZ1xuICAgIGlmIChnZW9tZXRyeS5nZXRMYXRMbmcpIHtcbiAgICAgIGdlb21ldHJ5ID0gZ2VvbWV0cnkuZ2V0TGF0TG5nKCk7XG4gICAgfVxuXG4gICAgLy8gY29udmVydCBMLkxhdExuZyB0byBhIGdlb2pzb24gcG9pbnQgYW5kIGNvbnRpbnVlO1xuICAgIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIEwuTGF0TG5nKSB7XG4gICAgICBnZW9tZXRyeSA9IHtcbiAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtnZW9tZXRyeS5sbmcsIGdlb21ldHJ5LmxhdF1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIEwuR2VvSlNPTiwgcHVsbCBvdXQgdGhlIGZpcnN0IGdlb21ldHJ5XG4gICAgaWYgKGdlb21ldHJ5IGluc3RhbmNlb2YgTC5HZW9KU09OKSB7XG4gICAgICAvLyByZWFzc2lnbiBnZW9tZXRyeSB0byB0aGUgR2VvSlNPTiB2YWx1ZSAgKHdlIGFyZSBhc3N1bWluZyB0aGF0IG9ubHkgb25lIGZlYXR1cmUgaXMgcHJlc2VudClcbiAgICAgIGdlb21ldHJ5ID0gZ2VvbWV0cnkuZ2V0TGF5ZXJzKClbMF0uZmVhdHVyZS5nZW9tZXRyeTtcbiAgICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gVXRpbC5nZW9qc29uVG9BcmNHSVMoZ2VvbWV0cnkpO1xuICAgICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnlUeXBlID0gVXRpbC5nZW9qc29uVHlwZVRvQXJjR0lTKGdlb21ldHJ5LnR5cGUpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBMLlBvbHlsaW5lIGFuZCBMLlBvbHlnb25cbiAgICBpZiAoZ2VvbWV0cnkudG9HZW9KU09OKSB7XG4gICAgICBnZW9tZXRyeSA9IGdlb21ldHJ5LnRvR2VvSlNPTigpO1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBHZW9KU09OIGZlYXR1cmUgYnkgcHVsbGluZyBvdXQgdGhlIGdlb21ldHJ5XG4gICAgaWYgKGdlb21ldHJ5LnR5cGUgPT09ICdGZWF0dXJlJykge1xuICAgICAgLy8gZ2V0IHRoZSBnZW9tZXRyeSBvZiB0aGUgZ2VvanNvbiBmZWF0dXJlXG4gICAgICBnZW9tZXRyeSA9IGdlb21ldHJ5Lmdlb21ldHJ5O1xuICAgIH1cblxuICAgIC8vIGNvbmZpcm0gdGhhdCBvdXIgR2VvSlNPTiBpcyBhIHBvaW50LCBsaW5lIG9yIHBvbHlnb25cbiAgICBpZiAoZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50JyB8fCBnZW9tZXRyeS50eXBlID09PSAnTGluZVN0cmluZycgfHwgZ2VvbWV0cnkudHlwZSA9PT0gJ1BvbHlnb24nIHx8IGdlb21ldHJ5LnR5cGUgPT09ICdNdWx0aVBvbHlnb24nKSB7XG4gICAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeSA9IFV0aWwuZ2VvanNvblRvQXJjR0lTKGdlb21ldHJ5KTtcbiAgICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5VHlwZSA9IFV0aWwuZ2VvanNvblR5cGVUb0FyY0dJUyhnZW9tZXRyeS50eXBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB3YXJuIHRoZSB1c2VyIGlmIHdlIGhhdm4ndCBmb3VuZCBhbiBhcHByb3ByaWF0ZSBvYmplY3RcbiAgICBVdGlsLndhcm4oJ2ludmFsaWQgZ2VvbWV0cnkgcGFzc2VkIHRvIHNwYXRpYWwgcXVlcnkuIFNob3VsZCBiZSBMLkxhdExuZywgTC5MYXRMbmdCb3VuZHMsIEwuTWFya2VyIG9yIGEgR2VvSlNPTiBQb2ludCwgTGluZSwgUG9seWdvbiBvciBNdWx0aVBvbHlnb24gb2JqZWN0Jyk7XG5cbiAgICByZXR1cm47XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcXVlcnkgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBRdWVyeShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcXVlcnk7XG4iLCJpbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi9UYXNrJztcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWwnO1xuXG5leHBvcnQgdmFyIEZpbmQgPSBUYXNrLmV4dGVuZCh7XG4gIHNldHRlcnM6IHtcbiAgICAvLyBtZXRob2QgbmFtZSA+IHBhcmFtIG5hbWVcbiAgICAnY29udGFpbnMnOiAnY29udGFpbnMnLFxuICAgICd0ZXh0JzogJ3NlYXJjaFRleHQnLFxuICAgICdmaWVsZHMnOiAnc2VhcmNoRmllbGRzJywgLy8gZGVub3RlIGFuIGFycmF5IG9yIHNpbmdsZSBzdHJpbmdcbiAgICAnc3BhdGlhbFJlZmVyZW5jZSc6ICdzcicsXG4gICAgJ3NyJzogJ3NyJyxcbiAgICAnbGF5ZXJzJzogJ2xheWVycycsXG4gICAgJ3JldHVybkdlb21ldHJ5JzogJ3JldHVybkdlb21ldHJ5JyxcbiAgICAnbWF4QWxsb3dhYmxlT2Zmc2V0JzogJ21heEFsbG93YWJsZU9mZnNldCcsXG4gICAgJ3ByZWNpc2lvbic6ICdnZW9tZXRyeVByZWNpc2lvbicsXG4gICAgJ2R5bmFtaWNMYXllcnMnOiAnZHluYW1pY0xheWVycycsXG4gICAgJ3JldHVyblonOiAncmV0dXJuWicsXG4gICAgJ3JldHVybk0nOiAncmV0dXJuTScsXG4gICAgJ2dkYlZlcnNpb24nOiAnZ2RiVmVyc2lvbicsXG4gICAgJ3Rva2VuJzogJ3Rva2VuJ1xuICB9LFxuXG4gIHBhdGg6ICdmaW5kJyxcblxuICBwYXJhbXM6IHtcbiAgICBzcjogNDMyNixcbiAgICBjb250YWluczogdHJ1ZSxcbiAgICByZXR1cm5HZW9tZXRyeTogdHJ1ZSxcbiAgICByZXR1cm5aOiB0cnVlLFxuICAgIHJldHVybk06IGZhbHNlXG4gIH0sXG5cbiAgbGF5ZXJEZWZzOiBmdW5jdGlvbiAoaWQsIHdoZXJlKSB7XG4gICAgdGhpcy5wYXJhbXMubGF5ZXJEZWZzID0gKHRoaXMucGFyYW1zLmxheWVyRGVmcykgPyB0aGlzLnBhcmFtcy5sYXllckRlZnMgKyAnOycgOiAnJztcbiAgICB0aGlzLnBhcmFtcy5sYXllckRlZnMgKz0gKFtpZCwgd2hlcmVdKS5qb2luKCc6Jyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2ltcGxpZnk6IGZ1bmN0aW9uIChtYXAsIGZhY3Rvcikge1xuICAgIHZhciBtYXBXaWR0aCA9IE1hdGguYWJzKG1hcC5nZXRCb3VuZHMoKS5nZXRXZXN0KCkgLSBtYXAuZ2V0Qm91bmRzKCkuZ2V0RWFzdCgpKTtcbiAgICB0aGlzLnBhcmFtcy5tYXhBbGxvd2FibGVPZmZzZXQgPSAobWFwV2lkdGggLyBtYXAuZ2V0U2l6ZSgpLnkpICogZmFjdG9yO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCAocmVzcG9uc2UgJiYgVXRpbC5yZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24ocmVzcG9uc2UpKSwgcmVzcG9uc2UpO1xuICAgIH0sIGNvbnRleHQpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBGaW5kKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmaW5kO1xuIiwiaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vVGFzayc7XG5cbmV4cG9ydCB2YXIgSWRlbnRpZnkgPSBUYXNrLmV4dGVuZCh7XG4gIHBhdGg6ICdpZGVudGlmeScsXG5cbiAgYmV0d2VlbjogZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICB0aGlzLnBhcmFtcy50aW1lID0gW3N0YXJ0LnZhbHVlT2YoKSwgZW5kLnZhbHVlT2YoKV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpZnkgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBJZGVudGlmeShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaWRlbnRpZnk7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IElkZW50aWZ5IH0gZnJvbSAnLi9JZGVudGlmeSc7XG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBJZGVudGlmeUZlYXR1cmVzID0gSWRlbnRpZnkuZXh0ZW5kKHtcbiAgc2V0dGVyczoge1xuICAgICdsYXllcnMnOiAnbGF5ZXJzJyxcbiAgICAncHJlY2lzaW9uJzogJ2dlb21ldHJ5UHJlY2lzaW9uJyxcbiAgICAndG9sZXJhbmNlJzogJ3RvbGVyYW5jZScsXG4gICAgJ3JldHVybkdlb21ldHJ5JzogJ3JldHVybkdlb21ldHJ5J1xuICB9LFxuXG4gIHBhcmFtczoge1xuICAgIHNyOiA0MzI2LFxuICAgIGxheWVyczogJ2FsbCcsXG4gICAgdG9sZXJhbmNlOiAzLFxuICAgIHJldHVybkdlb21ldHJ5OiB0cnVlXG4gIH0sXG5cbiAgb246IGZ1bmN0aW9uIChtYXApIHtcbiAgICB2YXIgZXh0ZW50ID0gVXRpbC5ib3VuZHNUb0V4dGVudChtYXAuZ2V0Qm91bmRzKCkpO1xuICAgIHZhciBzaXplID0gbWFwLmdldFNpemUoKTtcbiAgICB0aGlzLnBhcmFtcy5pbWFnZURpc3BsYXkgPSBbc2l6ZS54LCBzaXplLnksIDk2XTtcbiAgICB0aGlzLnBhcmFtcy5tYXBFeHRlbnQgPSBbZXh0ZW50LnhtaW4sIGV4dGVudC55bWluLCBleHRlbnQueG1heCwgZXh0ZW50LnltYXhdO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGF0OiBmdW5jdGlvbiAobGF0bG5nKSB7XG4gICAgbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcbiAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeSA9IFtsYXRsbmcubG5nLCBsYXRsbmcubGF0XTtcbiAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9pbnQnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGxheWVyRGVmOiBmdW5jdGlvbiAoaWQsIHdoZXJlKSB7XG4gICAgdGhpcy5wYXJhbXMubGF5ZXJEZWZzID0gKHRoaXMucGFyYW1zLmxheWVyRGVmcykgPyB0aGlzLnBhcmFtcy5sYXllckRlZnMgKyAnOycgOiAnJztcbiAgICB0aGlzLnBhcmFtcy5sYXllckRlZnMgKz0gKFtpZCwgd2hlcmVdKS5qb2luKCc6Jyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2ltcGxpZnk6IGZ1bmN0aW9uIChtYXAsIGZhY3Rvcikge1xuICAgIHZhciBtYXBXaWR0aCA9IE1hdGguYWJzKG1hcC5nZXRCb3VuZHMoKS5nZXRXZXN0KCkgLSBtYXAuZ2V0Qm91bmRzKCkuZ2V0RWFzdCgpKTtcbiAgICB0aGlzLnBhcmFtcy5tYXhBbGxvd2FibGVPZmZzZXQgPSAobWFwV2lkdGggLyBtYXAuZ2V0U2l6ZSgpLnkpICogKDEgLSBmYWN0b3IpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAvLyBpbW1lZGlhdGVseSBpbnZva2Ugd2l0aCBhbiBlcnJvclxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHVuZGVmaW5lZCwgcmVzcG9uc2UpO1xuICAgICAgICByZXR1cm47XG5cbiAgICAgIC8vIG9rIG5vIGVycm9yIGxldHMganVzdCBhc3N1bWUgd2UgaGF2ZSBmZWF0dXJlcy4uLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGZlYXR1cmVDb2xsZWN0aW9uID0gVXRpbC5yZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24ocmVzcG9uc2UpO1xuICAgICAgICByZXNwb25zZS5yZXN1bHRzID0gcmVzcG9uc2UucmVzdWx0cy5yZXZlcnNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZmVhdHVyZSA9IGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzW2ldO1xuICAgICAgICAgIGZlYXR1cmUubGF5ZXJJZCA9IHJlc3BvbnNlLnJlc3VsdHNbaV0ubGF5ZXJJZDtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHVuZGVmaW5lZCwgZmVhdHVyZUNvbGxlY3Rpb24sIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGlmeUZlYXR1cmVzIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSWRlbnRpZnlGZWF0dXJlcyhvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaWRlbnRpZnlGZWF0dXJlcztcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgSWRlbnRpZnkgfSBmcm9tICcuL0lkZW50aWZ5JztcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWwnO1xuXG5leHBvcnQgdmFyIElkZW50aWZ5SW1hZ2UgPSBJZGVudGlmeS5leHRlbmQoe1xuICBzZXR0ZXJzOiB7XG4gICAgJ3NldE1vc2FpY1J1bGUnOiAnbW9zYWljUnVsZScsXG4gICAgJ3NldFJlbmRlcmluZ1J1bGUnOiAncmVuZGVyaW5nUnVsZScsXG4gICAgJ3NldFBpeGVsU2l6ZSc6ICdwaXhlbFNpemUnLFxuICAgICdyZXR1cm5DYXRhbG9nSXRlbXMnOiAncmV0dXJuQ2F0YWxvZ0l0ZW1zJyxcbiAgICAncmV0dXJuR2VvbWV0cnknOiAncmV0dXJuR2VvbWV0cnknXG4gIH0sXG5cbiAgcGFyYW1zOiB7XG4gICAgcmV0dXJuR2VvbWV0cnk6IGZhbHNlXG4gIH0sXG5cbiAgYXQ6IGZ1bmN0aW9uIChsYXRsbmcpIHtcbiAgICBsYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgeDogbGF0bG5nLmxuZyxcbiAgICAgIHk6IGxhdGxuZy5sYXQsXG4gICAgICBzcGF0aWFsUmVmZXJlbmNlOiB7XG4gICAgICAgIHdraWQ6IDQzMjZcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9pbnQnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldE1vc2FpY1J1bGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXMubW9zYWljUnVsZTtcbiAgfSxcblxuICBnZXRSZW5kZXJpbmdSdWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zLnJlbmRlcmluZ1J1bGU7XG4gIH0sXG5cbiAgZ2V0UGl4ZWxTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zLnBpeGVsU2l6ZTtcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgKHJlc3BvbnNlICYmIHRoaXMuX3Jlc3BvbnNlVG9HZW9KU09OKHJlc3BvbnNlKSksIHJlc3BvbnNlKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICAvLyBnZXQgcGl4ZWwgZGF0YSBhbmQgcmV0dXJuIGFzIGdlb0pTT04gcG9pbnRcbiAgLy8gcG9wdWxhdGUgY2F0YWxvZyBpdGVtcyAoaWYgYW55KVxuICAvLyBtZXJnaW5nIGluIGFueSBjYXRhbG9nSXRlbVZpc2liaWxpdGllcyBhcyBhIHByb3Blcnkgb2YgZWFjaCBmZWF0dXJlXG4gIF9yZXNwb25zZVRvR2VvSlNPTjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgdmFyIGxvY2F0aW9uID0gcmVzcG9uc2UubG9jYXRpb247XG4gICAgdmFyIGNhdGFsb2dJdGVtcyA9IHJlc3BvbnNlLmNhdGFsb2dJdGVtcztcbiAgICB2YXIgY2F0YWxvZ0l0ZW1WaXNpYmlsaXRpZXMgPSByZXNwb25zZS5jYXRhbG9nSXRlbVZpc2liaWxpdGllcztcbiAgICB2YXIgZ2VvSlNPTiA9IHtcbiAgICAgICdwaXhlbCc6IHtcbiAgICAgICAgJ3R5cGUnOiAnRmVhdHVyZScsXG4gICAgICAgICdnZW9tZXRyeSc6IHtcbiAgICAgICAgICAndHlwZSc6ICdQb2ludCcsXG4gICAgICAgICAgJ2Nvb3JkaW5hdGVzJzogW2xvY2F0aW9uLngsIGxvY2F0aW9uLnldXG4gICAgICAgIH0sXG4gICAgICAgICdjcnMnOiB7XG4gICAgICAgICAgJ3R5cGUnOiAnRVBTRycsXG4gICAgICAgICAgJ3Byb3BlcnRpZXMnOiB7XG4gICAgICAgICAgICAnY29kZSc6IGxvY2F0aW9uLnNwYXRpYWxSZWZlcmVuY2Uud2tpZFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb3BlcnRpZXMnOiB7XG4gICAgICAgICAgJ09CSkVDVElEJzogcmVzcG9uc2Uub2JqZWN0SWQsXG4gICAgICAgICAgJ25hbWUnOiByZXNwb25zZS5uYW1lLFxuICAgICAgICAgICd2YWx1ZSc6IHJlc3BvbnNlLnZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgICdpZCc6IHJlc3BvbnNlLm9iamVjdElkXG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChyZXNwb25zZS5wcm9wZXJ0aWVzICYmIHJlc3BvbnNlLnByb3BlcnRpZXMuVmFsdWVzKSB7XG4gICAgICBnZW9KU09OLnBpeGVsLnByb3BlcnRpZXMudmFsdWVzID0gcmVzcG9uc2UucHJvcGVydGllcy5WYWx1ZXM7XG4gICAgfVxuXG4gICAgaWYgKGNhdGFsb2dJdGVtcyAmJiBjYXRhbG9nSXRlbXMuZmVhdHVyZXMpIHtcbiAgICAgIGdlb0pTT04uY2F0YWxvZ0l0ZW1zID0gVXRpbC5yZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24oY2F0YWxvZ0l0ZW1zKTtcbiAgICAgIGlmIChjYXRhbG9nSXRlbVZpc2liaWxpdGllcyAmJiBjYXRhbG9nSXRlbVZpc2liaWxpdGllcy5sZW5ndGggPT09IGdlb0pTT04uY2F0YWxvZ0l0ZW1zLmZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKHZhciBpID0gY2F0YWxvZ0l0ZW1WaXNpYmlsaXRpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBnZW9KU09OLmNhdGFsb2dJdGVtcy5mZWF0dXJlc1tpXS5wcm9wZXJ0aWVzLmNhdGFsb2dJdGVtVmlzaWJpbGl0eSA9IGNhdGFsb2dJdGVtVmlzaWJpbGl0aWVzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBnZW9KU09OO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpZnlJbWFnZSAocGFyYW1zKSB7XG4gIHJldHVybiBuZXcgSWRlbnRpZnlJbWFnZShwYXJhbXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpZGVudGlmeUltYWdlO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQge2NvcnN9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHtjbGVhblVybH0gZnJvbSAnLi4vVXRpbCc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9SZXF1ZXN0JztcblxuZXhwb3J0IHZhciBTZXJ2aWNlID0gTC5FdmVudGVkLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIHByb3h5OiBmYWxzZSxcbiAgICB1c2VDb3JzOiBjb3JzLFxuICAgIHRpbWVvdXQ6IDBcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuX3JlcXVlc3RRdWV1ZSA9IFtdO1xuICAgIHRoaXMuX2F1dGhlbnRpY2F0aW5nID0gZmFsc2U7XG4gICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zLnVybCA9IGNsZWFuVXJsKHRoaXMub3B0aW9ucy51cmwpO1xuICB9LFxuXG4gIGdldDogZnVuY3Rpb24gKHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnZ2V0JywgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH0sXG5cbiAgcG9zdDogZnVuY3Rpb24gKHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgncG9zdCcsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9LFxuXG4gIHJlcXVlc3Q6IGZ1bmN0aW9uIChwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ3JlcXVlc3QnLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfSxcblxuICBtZXRhZGF0YTogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ2dldCcsICcnLCB7fSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9LFxuXG4gIGF1dGhlbnRpY2F0ZTogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdGhpcy5fYXV0aGVudGljYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLm9wdGlvbnMudG9rZW4gPSB0b2tlbjtcbiAgICB0aGlzLl9ydW5RdWV1ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFRpbWVvdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpbWVvdXQ7XG4gIH0sXG5cbiAgc2V0VGltZW91dDogZnVuY3Rpb24gKHRpbWVvdXQpIHtcbiAgICB0aGlzLm9wdGlvbnMudGltZW91dCA9IHRpbWVvdXQ7XG4gIH0sXG5cbiAgX3JlcXVlc3Q6IGZ1bmN0aW9uIChtZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLmZpcmUoJ3JlcXVlc3RzdGFydCcsIHtcbiAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgfSwgdHJ1ZSk7XG5cbiAgICB2YXIgd3JhcHBlZENhbGxiYWNrID0gdGhpcy5fY3JlYXRlU2VydmljZUNhbGxiYWNrKG1ldGhvZCwgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRva2VuKSB7XG4gICAgICBwYXJhbXMudG9rZW4gPSB0aGlzLm9wdGlvbnMudG9rZW47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2F1dGhlbnRpY2F0aW5nKSB7XG4gICAgICB0aGlzLl9yZXF1ZXN0UXVldWUucHVzaChbbWV0aG9kLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0XSk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cmwgPSAodGhpcy5vcHRpb25zLnByb3h5KSA/IHRoaXMub3B0aW9ucy5wcm94eSArICc/JyArIHRoaXMub3B0aW9ucy51cmwgKyBwYXRoIDogdGhpcy5vcHRpb25zLnVybCArIHBhdGg7XG5cbiAgICAgIGlmICgobWV0aG9kID09PSAnZ2V0JyB8fCBtZXRob2QgPT09ICdyZXF1ZXN0JykgJiYgIXRoaXMub3B0aW9ucy51c2VDb3JzKSB7XG4gICAgICAgIHJldHVybiBSZXF1ZXN0LmdldC5KU09OUCh1cmwsIHBhcmFtcywgd3JhcHBlZENhbGxiYWNrLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBSZXF1ZXN0W21ldGhvZF0odXJsLCBwYXJhbXMsIHdyYXBwZWRDYWxsYmFjaywgY29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9jcmVhdGVTZXJ2aWNlQ2FsbGJhY2s6IGZ1bmN0aW9uIChtZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKGVycm9yICYmIChlcnJvci5jb2RlID09PSA0OTkgfHwgZXJyb3IuY29kZSA9PT0gNDk4KSkge1xuICAgICAgICB0aGlzLl9hdXRoZW50aWNhdGluZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fcmVxdWVzdFF1ZXVlLnB1c2goW21ldGhvZCwgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dF0pO1xuXG4gICAgICAgIC8vIGZpcmUgYW4gZXZlbnQgZm9yIHVzZXJzIHRvIGhhbmRsZSBhbmQgcmUtYXV0aGVudGljYXRlXG4gICAgICAgIHRoaXMuZmlyZSgnYXV0aGVudGljYXRpb25yZXF1aXJlZCcsIHtcbiAgICAgICAgICBhdXRoZW50aWNhdGU6IEwuVXRpbC5iaW5kKHRoaXMuYXV0aGVudGljYXRlLCB0aGlzKVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICAvLyBpZiB0aGUgdXNlciBoYXMgYWNjZXNzIHRvIGEgY2FsbGJhY2sgdGhleSBjYW4gaGFuZGxlIHRoZSBhdXRoIGVycm9yXG4gICAgICAgIGVycm9yLmF1dGhlbnRpY2F0ZSA9IEwuVXRpbC5iaW5kKHRoaXMuYXV0aGVudGljYXRlLCB0aGlzKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5maXJlKCdyZXF1ZXN0ZXJyb3InLCB7XG4gICAgICAgICAgdXJsOiB0aGlzLm9wdGlvbnMudXJsICsgcGF0aCxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuICAgICAgICAgIGNvZGU6IGVycm9yLmNvZGUsXG4gICAgICAgICAgbWV0aG9kOiBtZXRob2RcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpcmUoJ3JlcXVlc3RzdWNjZXNzJywge1xuICAgICAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLFxuICAgICAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmUoJ3JlcXVlc3RlbmQnLCB7XG4gICAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZFxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX3J1blF1ZXVlOiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgaSA9IHRoaXMuX3JlcXVlc3RRdWV1ZS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIHJlcXVlc3QgPSB0aGlzLl9yZXF1ZXN0UXVldWVbaV07XG4gICAgICB2YXIgbWV0aG9kID0gcmVxdWVzdC5zaGlmdCgpO1xuICAgICAgdGhpc1ttZXRob2RdLmFwcGx5KHRoaXMsIHJlcXVlc3QpO1xuICAgIH1cbiAgICB0aGlzLl9yZXF1ZXN0UXVldWUgPSBbXTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VydmljZTtcbiIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuL1NlcnZpY2UnO1xuaW1wb3J0IGlkZW50aWZ5RmVhdHVyZXMgZnJvbSAnLi4vVGFza3MvSWRlbnRpZnlGZWF0dXJlcyc7XG5pbXBvcnQgcXVlcnkgZnJvbSAnLi4vVGFza3MvUXVlcnknO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi4vVGFza3MvRmluZCc7XG5cbmV4cG9ydCB2YXIgTWFwU2VydmljZSA9IFNlcnZpY2UuZXh0ZW5kKHtcblxuICBpZGVudGlmeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBpZGVudGlmeUZlYXR1cmVzKHRoaXMpO1xuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmluZCh0aGlzKTtcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBxdWVyeSh0aGlzKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFNlcnZpY2UgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBNYXBTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBTZXJ2aWNlO1xuIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4vU2VydmljZSc7XG5pbXBvcnQgaWRlbnRpZnlJbWFnZSBmcm9tICcuLi9UYXNrcy9JZGVudGlmeUltYWdlJztcbmltcG9ydCBxdWVyeSBmcm9tICcuLi9UYXNrcy9RdWVyeSc7XG5cbmV4cG9ydCB2YXIgSW1hZ2VTZXJ2aWNlID0gU2VydmljZS5leHRlbmQoe1xuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHF1ZXJ5KHRoaXMpO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGlkZW50aWZ5SW1hZ2UodGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VTZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSW1hZ2VTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbWFnZVNlcnZpY2U7XG4iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi9TZXJ2aWNlJztcbmltcG9ydCBxdWVyeSBmcm9tICcuLi9UYXNrcy9RdWVyeSc7XG5pbXBvcnQgeyBnZW9qc29uVG9BcmNHSVMgfSBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBGZWF0dXJlTGF5ZXJTZXJ2aWNlID0gU2VydmljZS5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBpZEF0dHJpYnV0ZTogJ09CSkVDVElEJ1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHF1ZXJ5KHRoaXMpO1xuICB9LFxuXG4gIGFkZEZlYXR1cmU6IGZ1bmN0aW9uIChmZWF0dXJlLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGRlbGV0ZSBmZWF0dXJlLmlkO1xuXG4gICAgZmVhdHVyZSA9IGdlb2pzb25Ub0FyY0dJUyhmZWF0dXJlKTtcblxuICAgIHJldHVybiB0aGlzLnBvc3QoJ2FkZEZlYXR1cmVzJywge1xuICAgICAgZmVhdHVyZXM6IFtmZWF0dXJlXVxuICAgIH0sIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuYWRkUmVzdWx0cykgPyByZXNwb25zZS5hZGRSZXN1bHRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuYWRkUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICB1cGRhdGVGZWF0dXJlOiBmdW5jdGlvbiAoZmVhdHVyZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBmZWF0dXJlID0gZ2VvanNvblRvQXJjR0lTKGZlYXR1cmUsIHRoaXMub3B0aW9ucy5pZEF0dHJpYnV0ZSk7XG5cbiAgICByZXR1cm4gdGhpcy5wb3N0KCd1cGRhdGVGZWF0dXJlcycsIHtcbiAgICAgIGZlYXR1cmVzOiBbZmVhdHVyZV1cbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gKHJlc3BvbnNlICYmIHJlc3BvbnNlLnVwZGF0ZVJlc3VsdHMpID8gcmVzcG9uc2UudXBkYXRlUmVzdWx0c1swXSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yIHx8IHJlc3BvbnNlLnVwZGF0ZVJlc3VsdHNbMF0uZXJyb3IsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgZGVsZXRlRmVhdHVyZTogZnVuY3Rpb24gKGlkLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnBvc3QoJ2RlbGV0ZUZlYXR1cmVzJywge1xuICAgICAgb2JqZWN0SWRzOiBpZFxuICAgIH0sIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGVsZXRlUmVzdWx0cykgPyByZXNwb25zZS5kZWxldGVSZXN1bHRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuZGVsZXRlUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICBkZWxldGVGZWF0dXJlczogZnVuY3Rpb24gKGlkcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5wb3N0KCdkZWxldGVGZWF0dXJlcycsIHtcbiAgICAgIG9iamVjdElkczogaWRzXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgLy8gcGFzcyBiYWNrIHRoZSBlbnRpcmUgYXJyYXlcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGVsZXRlUmVzdWx0cykgPyByZXNwb25zZS5kZWxldGVSZXN1bHRzIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuZGVsZXRlUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlTGF5ZXJTZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRmVhdHVyZUxheWVyU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmVhdHVyZUxheWVyU2VydmljZTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgcG9pbnRlckV2ZW50cyB9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHtcbiAgc2V0RXNyaUF0dHJpYnV0aW9uLFxuICBfZ2V0QXR0cmlidXRpb25EYXRhLFxuICBfdXBkYXRlTWFwQXR0cmlidXRpb25cbn0gZnJvbSAnLi4vVXRpbCc7XG5cbnZhciB0aWxlUHJvdG9jb2wgPSAod2luZG93LmxvY2F0aW9uLnByb3RvY29sICE9PSAnaHR0cHM6JykgPyAnaHR0cDonIDogJ2h0dHBzOic7XG5cbmV4cG9ydCB2YXIgQmFzZW1hcExheWVyID0gTC5UaWxlTGF5ZXIuZXh0ZW5kKHtcbiAgc3RhdGljczoge1xuICAgIFRJTEVTOiB7XG4gICAgICBTdHJlZXRzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Xb3JsZF9TdHJlZXRfTWFwL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTksXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MsIE5PQUEnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uVXJsOiAnaHR0cHM6Ly9zdGF0aWMuYXJjZ2lzLmNvbS9hdHRyaWJ1dGlvbi9Xb3JsZF9TdHJlZXRfTWFwJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgVG9wb2dyYXBoaWM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX1RvcG9fTWFwL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTksXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MsIE5PQUEnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uVXJsOiAnaHR0cHM6Ly9zdGF0aWMuYXJjZ2lzLmNvbS9hdHRyaWJ1dGlvbi9Xb3JsZF9Ub3BvX01hcCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIE9jZWFuczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vYXJjZ2lzL3Jlc3Qvc2VydmljZXMvT2NlYW4vV29ybGRfT2NlYW5fQmFzZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdVU0dTLCBOT0FBJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvblVybDogJ2h0dHBzOi8vc3RhdGljLmFyY2dpcy5jb20vYXR0cmlidXRpb24vT2NlYW5fQmFzZW1hcCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIE9jZWFuc0xhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vYXJjZ2lzL3Jlc3Qvc2VydmljZXMvT2NlYW4vV29ybGRfT2NlYW5fUmVmZXJlbmNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgTmF0aW9uYWxHZW9ncmFwaGljOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9OYXRHZW9fV29ybGRfTWFwL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ05hdGlvbmFsIEdlb2dyYXBoaWMsIERlTG9ybWUsIEhFUkUsIFVORVAtV0NNQywgVVNHUywgTkFTQSwgRVNBLCBNRVRJLCBOUkNBTiwgR0VCQ08sIE5PQUEsIGluY3JlbWVudCBQIENvcnAuJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgRGFya0dyYXk6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0NhbnZhcy9Xb3JsZF9EYXJrX0dyYXlfQmFzZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdIRVJFLCBEZUxvcm1lLCBNYXBteUluZGlhLCAmY29weTsgT3BlblN0cmVldE1hcCBjb250cmlidXRvcnMnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBEYXJrR3JheUxhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvQ2FudmFzL1dvcmxkX0RhcmtfR3JheV9SZWZlcmVuY2UvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBHcmF5OiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9DYW52YXMvV29ybGRfTGlnaHRfR3JheV9CYXNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0hFUkUsIERlTG9ybWUsIE1hcG15SW5kaWEsICZjb3B5OyBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9ycydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIEdyYXlMYWJlbHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0NhbnZhcy9Xb3JsZF9MaWdodF9HcmF5X1JlZmVyZW5jZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgcGFuZTogKHBvaW50ZXJFdmVudHMpID8gJ2VzcmktbGFiZWxzJyA6ICd0aWxlUGFuZScsXG4gICAgICAgICAgYXR0cmlidXRpb246ICcnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBJbWFnZXJ5OiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Xb3JsZF9JbWFnZXJ5L01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTksXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0RpZ2l0YWxHbG9iZSwgR2VvRXllLCBpLWN1YmVkLCBVU0RBLCBVU0dTLCBBRVgsIEdldG1hcHBpbmcsIEFlcm9ncmlkLCBJR04sIElHUCwgc3dpc3N0b3BvLCBhbmQgdGhlIEdJUyBVc2VyIENvbW11bml0eSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIEltYWdlcnlMYWJlbHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1JlZmVyZW5jZS9Xb3JsZF9Cb3VuZGFyaWVzX2FuZF9QbGFjZXMvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgSW1hZ2VyeVRyYW5zcG9ydGF0aW9uOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9SZWZlcmVuY2UvV29ybGRfVHJhbnNwb3J0YXRpb24vTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBTaGFkZWRSZWxpZWY6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX1NoYWRlZF9SZWxpZWYvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxMyxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnVVNHUydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFNoYWRlZFJlbGllZkxhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvUmVmZXJlbmNlL1dvcmxkX0JvdW5kYXJpZXNfYW5kX1BsYWNlc19BbHRlcm5hdGUvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxMixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgVGVycmFpbjoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfVGVycmFpbl9CYXNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTMsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MsIE5PQUEnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBUZXJyYWluTGFiZWxzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9SZWZlcmVuY2UvV29ybGRfUmVmZXJlbmNlX092ZXJsYXkvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxMyxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgVVNBVG9wbzoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvVVNBX1RvcG9fTWFwcy9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE1LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdVU0dTLCBOYXRpb25hbCBHZW9ncmFwaGljIFNvY2lldHksIGktY3ViZWQnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKGtleSwgb3B0aW9ucykge1xuICAgIHZhciBjb25maWc7XG5cbiAgICAvLyBzZXQgdGhlIGNvbmZpZyB2YXJpYWJsZSB3aXRoIHRoZSBhcHByb3ByaWF0ZSBjb25maWcgb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnICYmIGtleS51cmxUZW1wbGF0ZSAmJiBrZXkub3B0aW9ucykge1xuICAgICAgY29uZmlnID0ga2V5O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYgQmFzZW1hcExheWVyLlRJTEVTW2tleV0pIHtcbiAgICAgIGNvbmZpZyA9IEJhc2VtYXBMYXllci5USUxFU1trZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0wuZXNyaS5CYXNlbWFwTGF5ZXI6IEludmFsaWQgcGFyYW1ldGVyLiBVc2Ugb25lIG9mIFwiU3RyZWV0c1wiLCBcIlRvcG9ncmFwaGljXCIsIFwiT2NlYW5zXCIsIFwiT2NlYW5zTGFiZWxzXCIsIFwiTmF0aW9uYWxHZW9ncmFwaGljXCIsIFwiR3JheVwiLCBcIkdyYXlMYWJlbHNcIiwgXCJEYXJrR3JheVwiLCBcIkRhcmtHcmF5TGFiZWxzXCIsIFwiSW1hZ2VyeVwiLCBcIkltYWdlcnlMYWJlbHNcIiwgXCJJbWFnZXJ5VHJhbnNwb3J0YXRpb25cIiwgXCJTaGFkZWRSZWxpZWZcIiwgXCJTaGFkZWRSZWxpZWZMYWJlbHNcIiwgXCJUZXJyYWluXCIsIFwiVGVycmFpbkxhYmVsc1wiIG9yIFwiVVNBVG9wb1wiJyk7XG4gICAgfVxuXG4gICAgLy8gbWVyZ2UgcGFzc2VkIG9wdGlvbnMgaW50byB0aGUgY29uZmlnIG9wdGlvbnNcbiAgICB2YXIgdGlsZU9wdGlvbnMgPSBMLlV0aWwuZXh0ZW5kKGNvbmZpZy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIHRpbGVPcHRpb25zKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIGNvbmZpZy51cmxUZW1wbGF0ZSArPSAoJz90b2tlbj0nICsgdGhpcy5vcHRpb25zLnRva2VuKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsIHRoZSBpbml0aWFsaXplIG1ldGhvZCBvbiBMLlRpbGVMYXllciB0byBzZXQgZXZlcnl0aGluZyB1cFxuICAgIEwuVGlsZUxheWVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgY29uZmlnLnVybFRlbXBsYXRlLCB0aWxlT3B0aW9ucyk7XG4gIH0sXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICAvLyBpbmNsdWRlICdQb3dlcmVkIGJ5IEVzcmknIGluIG1hcCBhdHRyaWJ1dGlvblxuICAgIHNldEVzcmlBdHRyaWJ1dGlvbihtYXApO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5wYW5lID09PSAnZXNyaS1sYWJlbHMnKSB7XG4gICAgICB0aGlzLl9pbml0UGFuZSgpO1xuICAgIH1cbiAgICAvLyBzb21lIGJhc2VtYXBzIGNhbiBzdXBwbHkgZHluYW1pYyBhdHRyaWJ1dGlvblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXR0cmlidXRpb25VcmwpIHtcbiAgICAgIF9nZXRBdHRyaWJ1dGlvbkRhdGEodGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uVXJsLCBtYXApO1xuICAgIH1cblxuICAgIG1hcC5vbignbW92ZWVuZCcsIF91cGRhdGVNYXBBdHRyaWJ1dGlvbik7XG5cbiAgICBMLlRpbGVMYXllci5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgbWFwLm9mZignbW92ZWVuZCcsIF91cGRhdGVNYXBBdHRyaWJ1dGlvbik7XG4gICAgTC5UaWxlTGF5ZXIucHJvdG90eXBlLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcbiAgfSxcblxuICBfaW5pdFBhbmU6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX21hcC5nZXRQYW5lKHRoaXMub3B0aW9ucy5wYW5lKSkge1xuICAgICAgdmFyIHBhbmUgPSB0aGlzLl9tYXAuY3JlYXRlUGFuZSh0aGlzLm9wdGlvbnMucGFuZSk7XG4gICAgICBwYW5lLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICBwYW5lLnN0eWxlLnpJbmRleCA9IDUwMDtcbiAgICB9XG4gIH0sXG5cbiAgZ2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uKSB7XG4gICAgICB2YXIgYXR0cmlidXRpb24gPSAnPHNwYW4gY2xhc3M9XCJlc3JpLWR5bmFtaWMtYXR0cmlidXRpb25cIj4nICsgdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uICsgJzwvc3Bhbj4nO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cmlidXRpb247XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gYmFzZW1hcExheWVyIChrZXksIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBCYXNlbWFwTGF5ZXIoa2V5LCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZW1hcExheWVyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyB3YXJuLCBjbGVhblVybCwgc2V0RXNyaUF0dHJpYnV0aW9uIH0gZnJvbSAnLi4vVXRpbCc7XG5pbXBvcnQgbWFwU2VydmljZSBmcm9tICcuLi9TZXJ2aWNlcy9NYXBTZXJ2aWNlJztcblxuZXhwb3J0IHZhciBUaWxlZE1hcExheWVyID0gTC5UaWxlTGF5ZXIuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIHpvb21PZmZzZXRBbGxvd2FuY2U6IDAuMSxcbiAgICBlcnJvclRpbGVVcmw6ICdodHRwOi8vZG93bmxvYWRzMi5lc3JpLmNvbS9zdXBwb3J0L1RlY2hBcnRpY2xlcy9ibGFuazI1Ni5wbmcnXG4gIH0sXG5cbiAgc3RhdGljczoge1xuICAgIE1lcmNhdG9yWm9vbUxldmVsczoge1xuICAgICAgJzAnOiAxNTY1NDMuMDMzOTI3OTk5OTksXG4gICAgICAnMSc6IDc4MjcxLjUxNjk2Mzk5OTg5MyxcbiAgICAgICcyJzogMzkxMzUuNzU4NDgyMDAwMDk5LFxuICAgICAgJzMnOiAxOTU2Ny44NzkyNDA5OTk5MDEsXG4gICAgICAnNCc6IDk3ODMuOTM5NjIwNDk5OTU5MyxcbiAgICAgICc1JzogNDg5MS45Njk4MTAyNDk5Nzk3LFxuICAgICAgJzYnOiAyNDQ1Ljk4NDkwNTEyNDk4OTgsXG4gICAgICAnNyc6IDEyMjIuOTkyNDUyNTYyNDg5OSxcbiAgICAgICc4JzogNjExLjQ5NjIyNjI4MTM4MDAyLFxuICAgICAgJzknOiAzMDUuNzQ4MTEzMTQwNTU4MDIsXG4gICAgICAnMTAnOiAxNTIuODc0MDU2NTcwNDExLFxuICAgICAgJzExJzogNzYuNDM3MDI4Mjg1MDczMTk3LFxuICAgICAgJzEyJzogMzguMjE4NTE0MTQyNTM2NTk4LFxuICAgICAgJzEzJzogMTkuMTA5MjU3MDcxMjY4Mjk5LFxuICAgICAgJzE0JzogOS41NTQ2Mjg1MzU2MzQxNDk2LFxuICAgICAgJzE1JzogNC43NzczMTQyNjc5NDkzNjk5LFxuICAgICAgJzE2JzogMi4zODg2NTcxMzM5NzQ2OCxcbiAgICAgICcxNyc6IDEuMTk0MzI4NTY2ODU1MDUwMSxcbiAgICAgICcxOCc6IDAuNTk3MTY0MjgzNTU5ODE2OTksXG4gICAgICAnMTknOiAwLjI5ODU4MjE0MTY0NzYxNjk4LFxuICAgICAgJzIwJzogMC4xNDkyOTEwNzA4MjM4MSxcbiAgICAgICcyMSc6IDAuMDc0NjQ1NTM1NDExOTEsXG4gICAgICAnMjInOiAwLjAzNzMyMjc2NzcwNTk1MjUsXG4gICAgICAnMjMnOiAwLjAxODY2MTM4Mzg1Mjk3NjNcbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zLnVybCA9IGNsZWFuVXJsKG9wdGlvbnMudXJsKTtcbiAgICBvcHRpb25zID0gTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG5cbiAgICAvLyBzZXQgdGhlIHVybHNcbiAgICB0aGlzLnRpbGVVcmwgPSBvcHRpb25zLnVybCArICd0aWxlL3t6fS97eX0ve3h9JztcbiAgICB0aGlzLnNlcnZpY2UgPSBtYXBTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2VydmljZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgIHZhciBhcmNnaXNvbmxpbmUgPSBuZXcgUmVnRXhwKC90aWxlcy5hcmNnaXMob25saW5lKT9cXC5jb20vZyk7XG4gICAgaWYgKGFyY2dpc29ubGluZS50ZXN0KG9wdGlvbnMudXJsKSkge1xuICAgICAgdGhpcy50aWxlVXJsID0gdGhpcy50aWxlVXJsLnJlcGxhY2UoJzovL3RpbGVzJywgJzovL3RpbGVze3N9Jyk7XG4gICAgICBvcHRpb25zLnN1YmRvbWFpbnMgPSBbJzEnLCAnMicsICczJywgJzQnXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRva2VuKSB7XG4gICAgICB0aGlzLnRpbGVVcmwgKz0gKCc/dG9rZW49JyArIHRoaXMub3B0aW9ucy50b2tlbik7XG4gICAgfVxuXG4gICAgLy8gaW5pdCBsYXllciBieSBjYWxsaW5nIFRpbGVMYXllcnMgaW5pdGlhbGl6ZSBtZXRob2RcbiAgICBMLlRpbGVMYXllci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHRoaXMudGlsZVVybCwgb3B0aW9ucyk7XG4gIH0sXG5cbiAgZ2V0VGlsZVVybDogZnVuY3Rpb24gKHRpbGVQb2ludCkge1xuICAgIHJldHVybiBMLlV0aWwudGVtcGxhdGUodGhpcy50aWxlVXJsLCBMLmV4dGVuZCh7XG4gICAgICBzOiB0aGlzLl9nZXRTdWJkb21haW4odGlsZVBvaW50KSxcbiAgICAgIHo6ICh0aGlzLl9sb2RNYXAgJiYgdGhpcy5fbG9kTWFwW3RpbGVQb2ludC56XSkgPyB0aGlzLl9sb2RNYXBbdGlsZVBvaW50LnpdIDogdGlsZVBvaW50LnosIC8vIHRyeSBsb2QgbWFwIGZpcnN0LCB0aGVuIGp1c3QgZGVmdWFsdCB0byB6b29tIGxldmVsXG4gICAgICB4OiB0aWxlUG9pbnQueCxcbiAgICAgIHk6IHRpbGVQb2ludC55XG4gICAgfSwgdGhpcy5vcHRpb25zKSk7XG4gIH0sXG5cbiAgY3JlYXRlVGlsZTogZnVuY3Rpb24gKGNvb3JkcywgZG9uZSkge1xuICAgIHZhciB0aWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICBMLkRvbUV2ZW50Lm9uKHRpbGUsICdsb2FkJywgTC5iaW5kKHRoaXMuX3RpbGVPbkxvYWQsIHRoaXMsIGRvbmUsIHRpbGUpKTtcbiAgICBMLkRvbUV2ZW50Lm9uKHRpbGUsICdlcnJvcicsIEwuYmluZCh0aGlzLl90aWxlT25FcnJvciwgdGhpcywgZG9uZSwgdGlsZSkpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jcm9zc09yaWdpbikge1xuICAgICAgdGlsZS5jcm9zc09yaWdpbiA9ICcnO1xuICAgIH1cblxuICAgIC8qXG4gICAgIEFsdCB0YWcgaXMgc2V0IHRvIGVtcHR5IHN0cmluZyB0byBrZWVwIHNjcmVlbiByZWFkZXJzIGZyb20gcmVhZGluZyBVUkwgYW5kIGZvciBjb21wbGlhbmNlIHJlYXNvbnNcbiAgICAgaHR0cDovL3d3dy53My5vcmcvVFIvV0NBRzIwLVRFQ0hTL0g2N1xuICAgICovXG4gICAgdGlsZS5hbHQgPSAnJztcblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGxvZCBtYXAgb3IgYW4gbG9kIG1hcCB3aXRoIGEgcHJvcGVyIHpvb20gbG9hZCB0aGUgdGlsZVxuICAgIC8vIG90aGVyd2lzZSB3YWl0IGZvciB0aGUgbG9kIG1hcCB0byBiZWNvbWUgYXZhaWxhYmxlXG4gICAgaWYgKCF0aGlzLl9sb2RNYXAgfHwgKHRoaXMuX2xvZE1hcCAmJiB0aGlzLl9sb2RNYXBbY29vcmRzLnpdKSkge1xuICAgICAgdGlsZS5zcmMgPSB0aGlzLmdldFRpbGVVcmwoY29vcmRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbmNlKCdsb2RtYXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRpbGUuc3JjID0gdGhpcy5nZXRUaWxlVXJsKGNvb3Jkcyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGlsZTtcbiAgfSxcblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIC8vIGluY2x1ZGUgJ1Bvd2VyZWQgYnkgRXNyaScgaW4gbWFwIGF0dHJpYnV0aW9uXG4gICAgc2V0RXNyaUF0dHJpYnV0aW9uKG1hcCk7XG5cbiAgICBpZiAoIXRoaXMuX2xvZE1hcCkge1xuICAgICAgdGhpcy5tZXRhZGF0YShmdW5jdGlvbiAoZXJyb3IsIG1ldGFkYXRhKSB7XG4gICAgICAgIGlmICghZXJyb3IgJiYgbWV0YWRhdGEuc3BhdGlhbFJlZmVyZW5jZSkge1xuICAgICAgICAgIHZhciBzciA9IG1ldGFkYXRhLnNwYXRpYWxSZWZlcmVuY2UubGF0ZXN0V2tpZCB8fCBtZXRhZGF0YS5zcGF0aWFsUmVmZXJlbmNlLndraWQ7XG4gICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gJiYgbWFwLmF0dHJpYnV0aW9uQ29udHJvbCAmJiBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gPSBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0O1xuICAgICAgICAgICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5hZGRBdHRyaWJ1dGlvbih0aGlzLmdldEF0dHJpYnV0aW9uKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWFwLm9wdGlvbnMuY3JzID09PSBMLkNSUy5FUFNHMzg1NyAmJiBzciA9PT0gMTAyMTAwIHx8IHNyID09PSAzODU3KSB7XG4gICAgICAgICAgICB0aGlzLl9sb2RNYXAgPSB7fTtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgem9vbSBsZXZlbCBkYXRhXG4gICAgICAgICAgICB2YXIgYXJjZ2lzTE9EcyA9IG1ldGFkYXRhLnRpbGVJbmZvLmxvZHM7XG4gICAgICAgICAgICB2YXIgY29ycmVjdFJlc29sdXRpb25zID0gVGlsZWRNYXBMYXllci5NZXJjYXRvclpvb21MZXZlbHM7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJjZ2lzTE9Ecy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgYXJjZ2lzTE9EID0gYXJjZ2lzTE9Ec1tpXTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgY2kgaW4gY29ycmVjdFJlc29sdXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvcnJlY3RSZXMgPSBjb3JyZWN0UmVzb2x1dGlvbnNbY2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3dpdGhpblBlcmNlbnRhZ2UoYXJjZ2lzTE9ELnJlc29sdXRpb24sIGNvcnJlY3RSZXMsIHRoaXMub3B0aW9ucy56b29tT2Zmc2V0QWxsb3dhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5fbG9kTWFwW2NpXSA9IGFyY2dpc0xPRC5sZXZlbDtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmZpcmUoJ2xvZG1hcCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXByb2o0KSB7XG4gICAgICAgICAgICAgIHdhcm4oJ0wuZXNyaS5UaWxlZE1hcExheWVyIGlzIHVzaW5nIGEgbm9uLW1lcmNhdG9yIHNwYXRpYWwgcmVmZXJlbmNlLiBTdXBwb3J0IG1heSBiZSBhdmFpbGFibGUgdGhyb3VnaCBQcm9qNExlYWZsZXQgaHR0cDovL2VzcmkuZ2l0aHViLmlvL2VzcmktbGVhZmxldC9leGFtcGxlcy9ub24tbWVyY2F0b3ItcHJvamVjdGlvbi5odG1sJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBMLlRpbGVMYXllci5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIG1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UubWV0YWRhdGEoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5pZGVudGlmeSgpO1xuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmZpbmQoKTtcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UucXVlcnkoKTtcbiAgfSxcblxuICBhdXRoZW50aWNhdGU6IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHZhciB0b2tlblFzID0gJz90b2tlbj0nICsgdG9rZW47XG4gICAgdGhpcy50aWxlVXJsID0gKHRoaXMub3B0aW9ucy50b2tlbikgPyB0aGlzLnRpbGVVcmwucmVwbGFjZSgvXFw/dG9rZW49KC4rKS9nLCB0b2tlblFzKSA6IHRoaXMudGlsZVVybCArIHRva2VuUXM7XG4gICAgdGhpcy5vcHRpb25zLnRva2VuID0gdG9rZW47XG4gICAgdGhpcy5zZXJ2aWNlLmF1dGhlbnRpY2F0ZSh0b2tlbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3dpdGhpblBlcmNlbnRhZ2U6IGZ1bmN0aW9uIChhLCBiLCBwZXJjZW50YWdlKSB7XG4gICAgdmFyIGRpZmYgPSBNYXRoLmFicygoYSAvIGIpIC0gMSk7XG4gICAgcmV0dXJuIGRpZmYgPCBwZXJjZW50YWdlO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRpbGVkTWFwTGF5ZXIgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFRpbGVkTWFwTGF5ZXIodXJsLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGlsZWRNYXBMYXllcjtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgY29ycyB9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHsgc2V0RXNyaUF0dHJpYnV0aW9uIH0gZnJvbSAnLi4vVXRpbCc7XG5cbnZhciBPdmVybGF5ID0gTC5JbWFnZU92ZXJsYXkuZXh0ZW5kKHtcbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICB0aGlzLl90b3BMZWZ0ID0gbWFwLmdldFBpeGVsQm91bmRzKCkubWluO1xuICAgIEwuSW1hZ2VPdmVybGF5LnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG4gIF9yZXNldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9tYXAub3B0aW9ucy5jcnMgPT09IEwuQ1JTLkVQU0czODU3KSB7XG4gICAgICBMLkltYWdlT3ZlcmxheS5wcm90b3R5cGUuX3Jlc2V0LmNhbGwodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aGlzLl9pbWFnZSwgdGhpcy5fdG9wTGVmdC5zdWJ0cmFjdCh0aGlzLl9tYXAuZ2V0UGl4ZWxPcmlnaW4oKSkpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCB2YXIgUmFzdGVyTGF5ZXIgPSBMLkxheWVyLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIG9wYWNpdHk6IDEsXG4gICAgcG9zaXRpb246ICdmcm9udCcsXG4gICAgZjogJ2ltYWdlJyxcbiAgICB1c2VDb3JzOiBjb3JzLFxuICAgIGF0dHJpYnV0aW9uOiBudWxsLFxuICAgIGludGVyYWN0aXZlOiBmYWxzZSxcbiAgICBhbHQ6ICcnXG4gIH0sXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICAvLyBpbmNsdWRlICdQb3dlcmVkIGJ5IEVzcmknIGluIG1hcCBhdHRyaWJ1dGlvblxuICAgIHNldEVzcmlBdHRyaWJ1dGlvbihtYXApO1xuXG4gICAgdGhpcy5fdXBkYXRlID0gTC5VdGlsLnRocm90dGxlKHRoaXMuX3VwZGF0ZSwgdGhpcy5vcHRpb25zLnVwZGF0ZUludGVydmFsLCB0aGlzKTtcblxuICAgIG1hcC5vbignbW92ZWVuZCcsIHRoaXMuX3VwZGF0ZSwgdGhpcyk7XG5cbiAgICAvLyBpZiB3ZSBoYWQgYW4gaW1hZ2UgbG9hZGVkIGFuZCBpdCBtYXRjaGVzIHRoZVxuICAgIC8vIGN1cnJlbnQgYm91bmRzIHNob3cgdGhlIGltYWdlIG90aGVyd2lzZSByZW1vdmUgaXRcbiAgICBpZiAodGhpcy5fY3VycmVudEltYWdlICYmIHRoaXMuX2N1cnJlbnRJbWFnZS5fYm91bmRzLmVxdWFscyh0aGlzLl9tYXAuZ2V0Qm91bmRzKCkpKSB7XG4gICAgICBtYXAuYWRkTGF5ZXIodGhpcy5fY3VycmVudEltYWdlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSkge1xuICAgICAgdGhpcy5fbWFwLnJlbW92ZUxheWVyKHRoaXMuX2N1cnJlbnRJbWFnZSk7XG4gICAgICB0aGlzLl9jdXJyZW50SW1hZ2UgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZSgpO1xuXG4gICAgaWYgKHRoaXMuX3BvcHVwKSB7XG4gICAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5fZ2V0UG9wdXBEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX21hcC5vbignZGJsY2xpY2snLCB0aGlzLl9yZXNldFBvcHVwU3RhdGUsIHRoaXMpO1xuICAgIH1cblxuICAgIC8vIGFkZCBjb3B5cmlnaHQgdGV4dCBsaXN0ZWQgaW4gc2VydmljZSBtZXRhZGF0YVxuICAgIHRoaXMubWV0YWRhdGEoZnVuY3Rpb24gKGVyciwgbWV0YWRhdGEpIHtcbiAgICAgIGlmICghZXJyICYmICF0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gJiYgbWFwLmF0dHJpYnV0aW9uQ29udHJvbCAmJiBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0KSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbiA9IG1ldGFkYXRhLmNvcHlyaWdodFRleHQ7XG4gICAgICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuYWRkQXR0cmlidXRpb24odGhpcy5nZXRBdHRyaWJ1dGlvbigpKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UpIHtcbiAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcih0aGlzLl9jdXJyZW50SW1hZ2UpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wb3B1cCkge1xuICAgICAgdGhpcy5fbWFwLm9mZignY2xpY2snLCB0aGlzLl9nZXRQb3B1cERhdGEsIHRoaXMpO1xuICAgICAgdGhpcy5fbWFwLm9mZignZGJsY2xpY2snLCB0aGlzLl9yZXNldFBvcHVwU3RhdGUsIHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMuX21hcC5vZmYoJ21vdmVlbmQnLCB0aGlzLl91cGRhdGUsIHRoaXMpO1xuICB9LFxuXG4gIGJpbmRQb3B1cDogZnVuY3Rpb24gKGZuLCBwb3B1cE9wdGlvbnMpIHtcbiAgICB0aGlzLl9zaG91bGRSZW5kZXJQb3B1cCA9IGZhbHNlO1xuICAgIHRoaXMuX2xhc3RDbGljayA9IGZhbHNlO1xuICAgIHRoaXMuX3BvcHVwID0gTC5wb3B1cChwb3B1cE9wdGlvbnMpO1xuICAgIHRoaXMuX3BvcHVwRnVuY3Rpb24gPSBmbjtcbiAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5fZ2V0UG9wdXBEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX21hcC5vbignZGJsY2xpY2snLCB0aGlzLl9yZXNldFBvcHVwU3RhdGUsIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICB1bmJpbmRQb3B1cDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgIHRoaXMuX21hcC5jbG9zZVBvcHVwKHRoaXMuX3BvcHVwKTtcbiAgICAgIHRoaXMuX21hcC5vZmYoJ2NsaWNrJywgdGhpcy5fZ2V0UG9wdXBEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX21hcC5vZmYoJ2RibGNsaWNrJywgdGhpcy5fcmVzZXRQb3B1cFN0YXRlLCB0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5fcG9wdXAgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBicmluZ1RvRnJvbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9wdGlvbnMucG9zaXRpb24gPSAnZnJvbnQnO1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5icmluZ1RvRnJvbnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYnJpbmdUb0JhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9wdGlvbnMucG9zaXRpb24gPSAnYmFjayc7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSkge1xuICAgICAgdGhpcy5fY3VycmVudEltYWdlLmJyaW5nVG9CYWNrKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbjtcbiAgfSxcblxuICBnZXRPcGFjaXR5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5vcGFjaXR5O1xuICB9LFxuXG4gIHNldE9wYWNpdHk6IGZ1bmN0aW9uIChvcGFjaXR5KSB7XG4gICAgdGhpcy5vcHRpb25zLm9wYWNpdHkgPSBvcGFjaXR5O1xuICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5zZXRPcGFjaXR5KG9wYWNpdHkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFRpbWVSYW5nZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBbdGhpcy5vcHRpb25zLmZyb20sIHRoaXMub3B0aW9ucy50b107XG4gIH0sXG5cbiAgc2V0VGltZVJhbmdlOiBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgICB0aGlzLm9wdGlvbnMuZnJvbSA9IGZyb207XG4gICAgdGhpcy5vcHRpb25zLnRvID0gdG87XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgbWV0YWRhdGE6IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuc2VydmljZS5tZXRhZGF0YShjYWxsYmFjaywgY29udGV4dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYXV0aGVudGljYXRlOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0aGlzLnNlcnZpY2UuYXV0aGVudGljYXRlKHRva2VuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBfcmVuZGVySW1hZ2U6IGZ1bmN0aW9uICh1cmwsIGJvdW5kcywgY29udGVudFR5cGUpIHtcbiAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICAvLyBpZiBubyBvdXRwdXQgZGlyZWN0b3J5IGhhcyBiZWVuIHNwZWNpZmllZCBmb3IgYSBzZXJ2aWNlLCBNSU1FIGRhdGEgd2lsbCBiZSByZXR1cm5lZFxuICAgICAgaWYgKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgIHVybCA9ICdkYXRhOicgKyBjb250ZW50VHlwZSArICc7YmFzZTY0LCcgKyB1cmw7XG4gICAgICB9XG4gICAgICAvLyBjcmVhdGUgYSBuZXcgaW1hZ2Ugb3ZlcmxheSBhbmQgYWRkIGl0IHRvIHRoZSBtYXBcbiAgICAgIC8vIHRvIHN0YXJ0IGxvYWRpbmcgdGhlIGltYWdlXG4gICAgICAvLyBvcGFjaXR5IGlzIDAgd2hpbGUgdGhlIGltYWdlIGlzIGxvYWRpbmdcbiAgICAgIHZhciBpbWFnZSA9IG5ldyBPdmVybGF5KHVybCwgYm91bmRzLCB7XG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLm9wdGlvbnMudXNlQ29ycyxcbiAgICAgICAgYWx0OiB0aGlzLm9wdGlvbnMuYWx0LFxuICAgICAgICBwYW5lOiB0aGlzLm9wdGlvbnMucGFuZSB8fCB0aGlzLmdldFBhbmUoKSxcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRoaXMub3B0aW9ucy5pbnRlcmFjdGl2ZVxuICAgICAgfSkuYWRkVG8odGhpcy5fbWFwKTtcblxuICAgICAgLy8gb25jZSB0aGUgaW1hZ2UgbG9hZHNcbiAgICAgIGltYWdlLm9uY2UoJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICAgICAgdmFyIG5ld0ltYWdlID0gZS50YXJnZXQ7XG4gICAgICAgICAgdmFyIG9sZEltYWdlID0gdGhpcy5fY3VycmVudEltYWdlO1xuXG4gICAgICAgICAgLy8gaWYgdGhlIGJvdW5kcyBvZiB0aGlzIGltYWdlIG1hdGNoZXMgdGhlIGJvdW5kcyB0aGF0XG4gICAgICAgICAgLy8gX3JlbmRlckltYWdlIHdhcyBjYWxsZWQgd2l0aCBhbmQgd2UgaGF2ZSBhIG1hcCB3aXRoIHRoZSBzYW1lIGJvdW5kc1xuICAgICAgICAgIC8vIGhpZGUgdGhlIG9sZCBpbWFnZSBpZiB0aGVyZSBpcyBvbmUgYW5kIHNldCB0aGUgb3BhY2l0eVxuICAgICAgICAgIC8vIG9mIHRoZSBuZXcgaW1hZ2Ugb3RoZXJ3aXNlIHJlbW92ZSB0aGUgbmV3IGltYWdlXG4gICAgICAgICAgaWYgKG5ld0ltYWdlLl9ib3VuZHMuZXF1YWxzKGJvdW5kcykgJiYgbmV3SW1hZ2UuX2JvdW5kcy5lcXVhbHModGhpcy5fbWFwLmdldEJvdW5kcygpKSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEltYWdlID0gbmV3SW1hZ2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucG9zaXRpb24gPT09ICdmcm9udCcpIHtcbiAgICAgICAgICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuYnJpbmdUb0JhY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9jdXJyZW50SW1hZ2UuX21hcCkge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SW1hZ2Uuc2V0T3BhY2l0eSh0aGlzLm9wdGlvbnMub3BhY2l0eSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SW1hZ2UuX21hcC5yZW1vdmVMYXllcih0aGlzLl9jdXJyZW50SW1hZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob2xkSW1hZ2UgJiYgdGhpcy5fbWFwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcihvbGRJbWFnZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvbGRJbWFnZSAmJiBvbGRJbWFnZS5fbWFwKSB7XG4gICAgICAgICAgICAgIG9sZEltYWdlLl9tYXAucmVtb3ZlTGF5ZXIob2xkSW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIobmV3SW1hZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlyZSgnbG9hZCcsIHtcbiAgICAgICAgICBib3VuZHM6IGJvdW5kc1xuICAgICAgICB9KTtcbiAgICAgIH0sIHRoaXMpO1xuXG4gICAgICB0aGlzLmZpcmUoJ2xvYWRpbmcnLCB7XG4gICAgICAgIGJvdW5kczogYm91bmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX3VwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuICAgIHZhciBib3VuZHMgPSB0aGlzLl9tYXAuZ2V0Qm91bmRzKCk7XG5cbiAgICBpZiAodGhpcy5fYW5pbWF0aW5nWm9vbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9tYXAuX3BhblRyYW5zaXRpb24gJiYgdGhpcy5fbWFwLl9wYW5UcmFuc2l0aW9uLl9pblByb2dyZXNzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHpvb20gPiB0aGlzLm9wdGlvbnMubWF4Wm9vbSB8fCB6b29tIDwgdGhpcy5vcHRpb25zLm1pblpvb20pIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5fbWFwLnJlbW92ZUxheWVyKHRoaXMuX2N1cnJlbnRJbWFnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHBhcmFtcyA9IHRoaXMuX2J1aWxkRXhwb3J0UGFyYW1zKCk7XG5cbiAgICB0aGlzLl9yZXF1ZXN0RXhwb3J0KHBhcmFtcywgYm91bmRzKTtcbiAgfSxcblxuICBfcmVuZGVyUG9wdXA6IGZ1bmN0aW9uIChsYXRsbmcsIGVycm9yLCByZXN1bHRzLCByZXNwb25zZSkge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgaWYgKHRoaXMuX3Nob3VsZFJlbmRlclBvcHVwICYmIHRoaXMuX2xhc3RDbGljay5lcXVhbHMobGF0bG5nKSkge1xuICAgICAgLy8gYWRkIHRoZSBwb3B1cCB0byB0aGUgbWFwIHdoZXJlIHRoZSBtb3VzZSB3YXMgY2xpY2tlZCBhdFxuICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl9wb3B1cEZ1bmN0aW9uKGVycm9yLCByZXN1bHRzLCByZXNwb25zZSk7XG4gICAgICBpZiAoY29udGVudCkge1xuICAgICAgICB0aGlzLl9wb3B1cC5zZXRMYXRMbmcobGF0bG5nKS5zZXRDb250ZW50KGNvbnRlbnQpLm9wZW5Pbih0aGlzLl9tYXApO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfcmVzZXRQb3B1cFN0YXRlOiBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuX3Nob3VsZFJlbmRlclBvcHVwID0gZmFsc2U7XG4gICAgdGhpcy5fbGFzdENsaWNrID0gZS5sYXRsbmc7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBSYXN0ZXJMYXllciB9IGZyb20gJy4vUmFzdGVyTGF5ZXInO1xuaW1wb3J0IHsgY2xlYW5VcmwgfSBmcm9tICcuLi9VdGlsJztcbmltcG9ydCBpbWFnZVNlcnZpY2UgZnJvbSAnLi4vU2VydmljZXMvSW1hZ2VTZXJ2aWNlJztcblxuZXhwb3J0IHZhciBJbWFnZU1hcExheWVyID0gUmFzdGVyTGF5ZXIuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgdXBkYXRlSW50ZXJ2YWw6IDE1MCxcbiAgICBmb3JtYXQ6ICdqcGdwbmcnLFxuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIGY6ICdqc29uJ1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5xdWVyeSgpO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5pZGVudGlmeSgpO1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucy51cmwgPSBjbGVhblVybChvcHRpb25zLnVybCk7XG4gICAgdGhpcy5zZXJ2aWNlID0gaW1hZ2VTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2VydmljZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIHNldFBpeGVsVHlwZTogZnVuY3Rpb24gKHBpeGVsVHlwZSkge1xuICAgIHRoaXMub3B0aW9ucy5waXhlbFR5cGUgPSBwaXhlbFR5cGU7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0UGl4ZWxUeXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5waXhlbFR5cGU7XG4gIH0sXG5cbiAgc2V0QmFuZElkczogZnVuY3Rpb24gKGJhbmRJZHMpIHtcbiAgICBpZiAoTC5VdGlsLmlzQXJyYXkoYmFuZElkcykpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5iYW5kSWRzID0gYmFuZElkcy5qb2luKCcsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9ucy5iYW5kSWRzID0gYmFuZElkcy50b1N0cmluZygpO1xuICAgIH1cbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRCYW5kSWRzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5iYW5kSWRzO1xuICB9LFxuXG4gIHNldE5vRGF0YTogZnVuY3Rpb24gKG5vRGF0YSwgbm9EYXRhSW50ZXJwcmV0YXRpb24pIHtcbiAgICBpZiAoTC5VdGlsLmlzQXJyYXkobm9EYXRhKSkge1xuICAgICAgdGhpcy5vcHRpb25zLm5vRGF0YSA9IG5vRGF0YS5qb2luKCcsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9ucy5ub0RhdGEgPSBub0RhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKG5vRGF0YUludGVycHJldGF0aW9uKSB7XG4gICAgICB0aGlzLm9wdGlvbnMubm9EYXRhSW50ZXJwcmV0YXRpb24gPSBub0RhdGFJbnRlcnByZXRhdGlvbjtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0Tm9EYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5ub0RhdGE7XG4gIH0sXG5cbiAgZ2V0Tm9EYXRhSW50ZXJwcmV0YXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5vRGF0YUludGVycHJldGF0aW9uO1xuICB9LFxuXG4gIHNldFJlbmRlcmluZ1J1bGU6IGZ1bmN0aW9uIChyZW5kZXJpbmdSdWxlKSB7XG4gICAgdGhpcy5vcHRpb25zLnJlbmRlcmluZ1J1bGUgPSByZW5kZXJpbmdSdWxlO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICB9LFxuXG4gIGdldFJlbmRlcmluZ1J1bGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJlbmRlcmluZ1J1bGU7XG4gIH0sXG5cbiAgc2V0TW9zYWljUnVsZTogZnVuY3Rpb24gKG1vc2FpY1J1bGUpIHtcbiAgICB0aGlzLm9wdGlvbnMubW9zYWljUnVsZSA9IG1vc2FpY1J1bGU7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gIH0sXG5cbiAgZ2V0TW9zYWljUnVsZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubW9zYWljUnVsZTtcbiAgfSxcblxuICBfZ2V0UG9wdXBEYXRhOiBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBjYWxsYmFjayA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG4gICAgICBzZXRUaW1lb3V0KEwuVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyUG9wdXAoZS5sYXRsbmcsIGVycm9yLCByZXN1bHRzLCByZXNwb25zZSk7XG4gICAgICB9LCB0aGlzKSwgMzAwKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHZhciBpZGVudGlmeVJlcXVlc3QgPSB0aGlzLmlkZW50aWZ5KCkuYXQoZS5sYXRsbmcpO1xuXG4gICAgLy8gc2V0IG1vc2FpYyBydWxlIGZvciBpZGVudGlmeSB0YXNrIGlmIGl0IGlzIHNldCBmb3IgbGF5ZXJcbiAgICBpZiAodGhpcy5vcHRpb25zLm1vc2FpY1J1bGUpIHtcbiAgICAgIGlkZW50aWZ5UmVxdWVzdC5zZXRNb3NhaWNSdWxlKHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlKTtcbiAgICAgIC8vIEBUT0RPOiBmb3JjZSByZXR1cm4gY2F0YWxvZyBpdGVtcyB0b28/XG4gICAgfVxuXG4gICAgLy8gQFRPRE86IHNldCByZW5kZXJpbmcgcnVsZT8gTm90IHN1cmUsXG4gICAgLy8gc29tZXRpbWVzIHlvdSB3YW50IHJhdyBwaXhlbCB2YWx1ZXNcbiAgICAvLyBpZiAodGhpcy5vcHRpb25zLnJlbmRlcmluZ1J1bGUpIHtcbiAgICAvLyAgIGlkZW50aWZ5UmVxdWVzdC5zZXRSZW5kZXJpbmdSdWxlKHRoaXMub3B0aW9ucy5yZW5kZXJpbmdSdWxlKTtcbiAgICAvLyB9XG5cbiAgICBpZGVudGlmeVJlcXVlc3QucnVuKGNhbGxiYWNrKTtcblxuICAgIC8vIHNldCB0aGUgZmxhZ3MgdG8gc2hvdyB0aGUgcG9wdXBcbiAgICB0aGlzLl9zaG91bGRSZW5kZXJQb3B1cCA9IHRydWU7XG4gICAgdGhpcy5fbGFzdENsaWNrID0gZS5sYXRsbmc7XG4gIH0sXG5cbiAgX2J1aWxkRXhwb3J0UGFyYW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRCb3VuZHMoKTtcbiAgICB2YXIgc2l6ZSA9IHRoaXMuX21hcC5nZXRTaXplKCk7XG4gICAgdmFyIG5lID0gdGhpcy5fbWFwLm9wdGlvbnMuY3JzLnByb2plY3QoYm91bmRzLl9ub3J0aEVhc3QpO1xuICAgIHZhciBzdyA9IHRoaXMuX21hcC5vcHRpb25zLmNycy5wcm9qZWN0KGJvdW5kcy5fc291dGhXZXN0KTtcblxuICAgIC8vIGVuc3VyZSB0aGF0IHdlIGRvbid0IGFzayBBcmNHSVMgU2VydmVyIGZvciBhIHRhbGxlciBpbWFnZSB0aGFuIHdlIGhhdmUgYWN0dWFsIG1hcCBkaXNwbGF5aW5nXG4gICAgdmFyIHRvcCA9IHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQoYm91bmRzLl9ub3J0aEVhc3QpO1xuICAgIHZhciBib3R0b20gPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KGJvdW5kcy5fc291dGhXZXN0KTtcblxuICAgIGlmICh0b3AueSA+IDAgfHwgYm90dG9tLnkgPCBzaXplLnkpIHtcbiAgICAgIHNpemUueSA9IGJvdHRvbS55IC0gdG9wLnk7XG4gICAgfVxuXG4gICAgdmFyIHNyID0gcGFyc2VJbnQodGhpcy5fbWFwLm9wdGlvbnMuY3JzLmNvZGUuc3BsaXQoJzonKVsxXSwgMTApO1xuXG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIGJib3g6IFtzdy54LCBzdy55LCBuZS54LCBuZS55XS5qb2luKCcsJyksXG4gICAgICBzaXplOiBzaXplLnggKyAnLCcgKyBzaXplLnksXG4gICAgICBmb3JtYXQ6IHRoaXMub3B0aW9ucy5mb3JtYXQsXG4gICAgICB0cmFuc3BhcmVudDogdGhpcy5vcHRpb25zLnRyYW5zcGFyZW50LFxuICAgICAgYmJveFNSOiBzcixcbiAgICAgIGltYWdlU1I6IHNyXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZnJvbSAmJiB0aGlzLm9wdGlvbnMudG8pIHtcbiAgICAgIHBhcmFtcy50aW1lID0gdGhpcy5vcHRpb25zLmZyb20udmFsdWVPZigpICsgJywnICsgdGhpcy5vcHRpb25zLnRvLnZhbHVlT2YoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnBpeGVsVHlwZSkge1xuICAgICAgcGFyYW1zLnBpeGVsVHlwZSA9IHRoaXMub3B0aW9ucy5waXhlbFR5cGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbnRlcnBvbGF0aW9uKSB7XG4gICAgICBwYXJhbXMuaW50ZXJwb2xhdGlvbiA9IHRoaXMub3B0aW9ucy5pbnRlcnBvbGF0aW9uO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29tcHJlc3Npb25RdWFsaXR5KSB7XG4gICAgICBwYXJhbXMuY29tcHJlc3Npb25RdWFsaXR5ID0gdGhpcy5vcHRpb25zLmNvbXByZXNzaW9uUXVhbGl0eTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmJhbmRJZHMpIHtcbiAgICAgIHBhcmFtcy5iYW5kSWRzID0gdGhpcy5vcHRpb25zLmJhbmRJZHM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5ub0RhdGEpIHtcbiAgICAgIHBhcmFtcy5ub0RhdGEgPSB0aGlzLm9wdGlvbnMubm9EYXRhO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMubm9EYXRhSW50ZXJwcmV0YXRpb24pIHtcbiAgICAgIHBhcmFtcy5ub0RhdGFJbnRlcnByZXRhdGlvbiA9IHRoaXMub3B0aW9ucy5ub0RhdGFJbnRlcnByZXRhdGlvbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZXJ2aWNlLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIHBhcmFtcy50b2tlbiA9IHRoaXMuc2VydmljZS5vcHRpb25zLnRva2VuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZSkge1xuICAgICAgcGFyYW1zLnJlbmRlcmluZ1J1bGUgPSBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlKSB7XG4gICAgICBwYXJhbXMubW9zYWljUnVsZSA9IEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9LFxuXG4gIF9yZXF1ZXN0RXhwb3J0OiBmdW5jdGlvbiAocGFyYW1zLCBib3VuZHMpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmYgPT09ICdqc29uJykge1xuICAgICAgdGhpcy5zZXJ2aWNlLnJlcXVlc3QoJ2V4cG9ydEltYWdlJywgcGFyYW1zLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgICAgICByZXNwb25zZS5ocmVmICs9ICgnP3Rva2VuPScgKyB0aGlzLm9wdGlvbnMudG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlbmRlckltYWdlKHJlc3BvbnNlLmhyZWYsIGJvdW5kcyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1zLmYgPSAnaW1hZ2UnO1xuICAgICAgdGhpcy5fcmVuZGVySW1hZ2UodGhpcy5vcHRpb25zLnVybCArICdleHBvcnRJbWFnZScgKyBMLlV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zKSwgYm91bmRzKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VNYXBMYXllciAodXJsLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSW1hZ2VNYXBMYXllcih1cmwsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbWFnZU1hcExheWVyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBSYXN0ZXJMYXllciB9IGZyb20gJy4vUmFzdGVyTGF5ZXInO1xuaW1wb3J0IHsgY2xlYW5VcmwgfSBmcm9tICcuLi9VdGlsJztcbmltcG9ydCBtYXBTZXJ2aWNlIGZyb20gJy4uL1NlcnZpY2VzL01hcFNlcnZpY2UnO1xuXG5leHBvcnQgdmFyIER5bmFtaWNNYXBMYXllciA9IFJhc3RlckxheWVyLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIHVwZGF0ZUludGVydmFsOiAxNTAsXG4gICAgbGF5ZXJzOiBmYWxzZSxcbiAgICBsYXllckRlZnM6IGZhbHNlLFxuICAgIHRpbWVPcHRpb25zOiBmYWxzZSxcbiAgICBmb3JtYXQ6ICdwbmcyNCcsXG4gICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgZjogJ2pzb24nXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zLnVybCA9IGNsZWFuVXJsKG9wdGlvbnMudXJsKTtcbiAgICB0aGlzLnNlcnZpY2UgPSBtYXBTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2VydmljZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgIGlmICgob3B0aW9ucy5wcm94eSB8fCBvcHRpb25zLnRva2VuKSAmJiBvcHRpb25zLmYgIT09ICdqc29uJykge1xuICAgICAgb3B0aW9ucy5mID0gJ2pzb24nO1xuICAgIH1cblxuICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIGdldER5bmFtaWNMYXllcnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmR5bmFtaWNMYXllcnM7XG4gIH0sXG5cbiAgc2V0RHluYW1pY0xheWVyczogZnVuY3Rpb24gKGR5bmFtaWNMYXllcnMpIHtcbiAgICB0aGlzLm9wdGlvbnMuZHluYW1pY0xheWVycyA9IGR5bmFtaWNMYXllcnM7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0TGF5ZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5sYXllcnM7XG4gIH0sXG5cbiAgc2V0TGF5ZXJzOiBmdW5jdGlvbiAobGF5ZXJzKSB7XG4gICAgdGhpcy5vcHRpb25zLmxheWVycyA9IGxheWVycztcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRMYXllckRlZnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxheWVyRGVmcztcbiAgfSxcblxuICBzZXRMYXllckRlZnM6IGZ1bmN0aW9uIChsYXllckRlZnMpIHtcbiAgICB0aGlzLm9wdGlvbnMubGF5ZXJEZWZzID0gbGF5ZXJEZWZzO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFRpbWVPcHRpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50aW1lT3B0aW9ucztcbiAgfSxcblxuICBzZXRUaW1lT3B0aW9uczogZnVuY3Rpb24gKHRpbWVPcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zLnRpbWVPcHRpb25zID0gdGltZU9wdGlvbnM7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcXVlcnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLnF1ZXJ5KCk7XG4gIH0sXG5cbiAgaWRlbnRpZnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmlkZW50aWZ5KCk7XG4gIH0sXG5cbiAgZmluZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZmluZCgpO1xuICB9LFxuXG4gIF9nZXRQb3B1cERhdGE6IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlQ29sbGVjdGlvbiwgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG4gICAgICBzZXRUaW1lb3V0KEwuVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyUG9wdXAoZS5sYXRsbmcsIGVycm9yLCBmZWF0dXJlQ29sbGVjdGlvbiwgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyksIDMwMCk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB2YXIgaWRlbnRpZnlSZXF1ZXN0ID0gdGhpcy5pZGVudGlmeSgpLm9uKHRoaXMuX21hcCkuYXQoZS5sYXRsbmcpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllcnMpIHtcbiAgICAgIGlkZW50aWZ5UmVxdWVzdC5sYXllcnMoJ3Zpc2libGU6JyArIHRoaXMub3B0aW9ucy5sYXllcnMuam9pbignLCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWRlbnRpZnlSZXF1ZXN0LmxheWVycygndmlzaWJsZScpO1xuICAgIH1cblxuICAgIGlkZW50aWZ5UmVxdWVzdC5ydW4oY2FsbGJhY2spO1xuXG4gICAgLy8gc2V0IHRoZSBmbGFncyB0byBzaG93IHRoZSBwb3B1cFxuICAgIHRoaXMuX3Nob3VsZFJlbmRlclBvcHVwID0gdHJ1ZTtcbiAgICB0aGlzLl9sYXN0Q2xpY2sgPSBlLmxhdGxuZztcbiAgfSxcblxuICBfYnVpbGRFeHBvcnRQYXJhbXM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fbWFwLmdldEJvdW5kcygpO1xuICAgIHZhciBzaXplID0gdGhpcy5fbWFwLmdldFNpemUoKTtcbiAgICB2YXIgbmUgPSB0aGlzLl9tYXAub3B0aW9ucy5jcnMucHJvamVjdChib3VuZHMuZ2V0Tm9ydGhFYXN0KCkpO1xuICAgIHZhciBzdyA9IHRoaXMuX21hcC5vcHRpb25zLmNycy5wcm9qZWN0KGJvdW5kcy5nZXRTb3V0aFdlc3QoKSk7XG4gICAgdmFyIHNyID0gcGFyc2VJbnQodGhpcy5fbWFwLm9wdGlvbnMuY3JzLmNvZGUuc3BsaXQoJzonKVsxXSwgMTApO1xuXG4gICAgLy8gZW5zdXJlIHRoYXQgd2UgZG9uJ3QgYXNrIEFyY0dJUyBTZXJ2ZXIgZm9yIGEgdGFsbGVyIGltYWdlIHRoYW4gd2UgaGF2ZSBhY3R1YWwgbWFwIGRpc3BsYXlpbmdcbiAgICB2YXIgdG9wID0gdGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludChib3VuZHMuX25vcnRoRWFzdCk7XG4gICAgdmFyIGJvdHRvbSA9IHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQoYm91bmRzLl9zb3V0aFdlc3QpO1xuXG4gICAgaWYgKHRvcC55ID4gMCB8fCBib3R0b20ueSA8IHNpemUueSkge1xuICAgICAgc2l6ZS55ID0gYm90dG9tLnkgLSB0b3AueTtcbiAgICB9XG5cbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgYmJveDogW3N3LngsIHN3LnksIG5lLngsIG5lLnldLmpvaW4oJywnKSxcbiAgICAgIHNpemU6IHNpemUueCArICcsJyArIHNpemUueSxcbiAgICAgIGRwaTogOTYsXG4gICAgICBmb3JtYXQ6IHRoaXMub3B0aW9ucy5mb3JtYXQsXG4gICAgICB0cmFuc3BhcmVudDogdGhpcy5vcHRpb25zLnRyYW5zcGFyZW50LFxuICAgICAgYmJveFNSOiBzcixcbiAgICAgIGltYWdlU1I6IHNyXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZHluYW1pY0xheWVycykge1xuICAgICAgcGFyYW1zLmR5bmFtaWNMYXllcnMgPSB0aGlzLm9wdGlvbnMuZHluYW1pY0xheWVycztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVycykge1xuICAgICAgcGFyYW1zLmxheWVycyA9ICdzaG93OicgKyB0aGlzLm9wdGlvbnMubGF5ZXJzLmpvaW4oJywnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyRGVmcykge1xuICAgICAgcGFyYW1zLmxheWVyRGVmcyA9IHR5cGVvZiB0aGlzLm9wdGlvbnMubGF5ZXJEZWZzID09PSAnc3RyaW5nJyA/IHRoaXMub3B0aW9ucy5sYXllckRlZnMgOiBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMubGF5ZXJEZWZzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVPcHRpb25zKSB7XG4gICAgICBwYXJhbXMudGltZU9wdGlvbnMgPSBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMudGltZU9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZnJvbSAmJiB0aGlzLm9wdGlvbnMudG8pIHtcbiAgICAgIHBhcmFtcy50aW1lID0gdGhpcy5vcHRpb25zLmZyb20udmFsdWVPZigpICsgJywnICsgdGhpcy5vcHRpb25zLnRvLnZhbHVlT2YoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZXJ2aWNlLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIHBhcmFtcy50b2tlbiA9IHRoaXMuc2VydmljZS5vcHRpb25zLnRva2VuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMucHJveHkpIHtcbiAgICAgIHBhcmFtcy5wcm94eSA9IHRoaXMub3B0aW9ucy5wcm94eTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9LFxuXG4gIF9yZXF1ZXN0RXhwb3J0OiBmdW5jdGlvbiAocGFyYW1zLCBib3VuZHMpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmYgPT09ICdqc29uJykge1xuICAgICAgdGhpcy5zZXJ2aWNlLnJlcXVlc3QoJ2V4cG9ydCcsIHBhcmFtcywgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9IC8vIHdlIHJlYWxseSBjYW4ndCBkbyBhbnl0aGluZyBoZXJlIGJ1dCBhdXRoZW50aWNhdGUgb3IgcmVxdWVzdGVycm9yIHdpbGwgZmlyZVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRva2VuKSB7XG4gICAgICAgICAgcmVzcG9uc2UuaHJlZiArPSAoJz90b2tlbj0nICsgdGhpcy5vcHRpb25zLnRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnByb3h5KSB7XG4gICAgICAgICAgcmVzcG9uc2UuaHJlZiA9IHRoaXMub3B0aW9ucy5wcm94eSArICc/JyArIHJlc3BvbnNlLmhyZWY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3BvbnNlLmhyZWYpIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJJbWFnZShyZXNwb25zZS5ocmVmLCBib3VuZHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3JlbmRlckltYWdlKHJlc3BvbnNlLmltYWdlRGF0YSwgYm91bmRzLCByZXNwb25zZS5jb250ZW50VHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJhbXMuZiA9ICdpbWFnZSc7XG4gICAgICB0aGlzLl9yZW5kZXJJbWFnZSh0aGlzLm9wdGlvbnMudXJsICsgJ2V4cG9ydCcgKyBMLlV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zKSwgYm91bmRzKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZHluYW1pY01hcExheWVyICh1cmwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBEeW5hbWljTWFwTGF5ZXIodXJsLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZHluYW1pY01hcExheWVyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5cbnZhciBWaXJ0dWFsR3JpZCA9IEwuTGF5ZXIuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgY2VsbFNpemU6IDUxMixcbiAgICB1cGRhdGVJbnRlcnZhbDogMTUwXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gTC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX3pvb21pbmcgPSBmYWxzZTtcbiAgfSxcblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIHRoaXMuX21hcCA9IG1hcDtcbiAgICB0aGlzLl91cGRhdGUgPSBMLlV0aWwudGhyb3R0bGUodGhpcy5fdXBkYXRlLCB0aGlzLm9wdGlvbnMudXBkYXRlSW50ZXJ2YWwsIHRoaXMpO1xuICAgIHRoaXMuX3Jlc2V0KCk7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gIH0sXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9tYXAucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmdldEV2ZW50cygpLCB0aGlzKTtcbiAgICB0aGlzLl9yZW1vdmVDZWxscygpO1xuICB9LFxuXG4gIGdldEV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgIHZhciBldmVudHMgPSB7XG4gICAgICBtb3ZlZW5kOiB0aGlzLl91cGRhdGUsXG4gICAgICB6b29tc3RhcnQ6IHRoaXMuX3pvb21zdGFydCxcbiAgICAgIHpvb21lbmQ6IHRoaXMuX3Jlc2V0XG4gICAgfTtcblxuICAgIHJldHVybiBldmVudHM7XG4gIH0sXG5cbiAgYWRkVG86IGZ1bmN0aW9uIChtYXApIHtcbiAgICBtYXAuYWRkTGF5ZXIodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcmVtb3ZlRnJvbTogZnVuY3Rpb24gKG1hcCkge1xuICAgIG1hcC5yZW1vdmVMYXllcih0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBfem9vbXN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fem9vbWluZyA9IHRydWU7XG4gIH0sXG5cbiAgX3Jlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fcmVtb3ZlQ2VsbHMoKTtcblxuICAgIHRoaXMuX2NlbGxzID0ge307XG4gICAgdGhpcy5fYWN0aXZlQ2VsbHMgPSB7fTtcbiAgICB0aGlzLl9jZWxsc1RvTG9hZCA9IDA7XG4gICAgdGhpcy5fY2VsbHNUb3RhbCA9IDA7XG4gICAgdGhpcy5fY2VsbE51bUJvdW5kcyA9IHRoaXMuX2dldENlbGxOdW1Cb3VuZHMoKTtcblxuICAgIHRoaXMuX3Jlc2V0V3JhcCgpO1xuICAgIHRoaXMuX3pvb21pbmcgPSBmYWxzZTtcbiAgfSxcblxuICBfcmVzZXRXcmFwOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcbiAgICB2YXIgY3JzID0gbWFwLm9wdGlvbnMuY3JzO1xuXG4gICAgaWYgKGNycy5pbmZpbml0ZSkgeyByZXR1cm47IH1cblxuICAgIHZhciBjZWxsU2l6ZSA9IHRoaXMuX2dldENlbGxTaXplKCk7XG5cbiAgICBpZiAoY3JzLndyYXBMbmcpIHtcbiAgICAgIHRoaXMuX3dyYXBMbmcgPSBbXG4gICAgICAgIE1hdGguZmxvb3IobWFwLnByb2plY3QoWzAsIGNycy53cmFwTG5nWzBdXSkueCAvIGNlbGxTaXplKSxcbiAgICAgICAgTWF0aC5jZWlsKG1hcC5wcm9qZWN0KFswLCBjcnMud3JhcExuZ1sxXV0pLnggLyBjZWxsU2l6ZSlcbiAgICAgIF07XG4gICAgfVxuXG4gICAgaWYgKGNycy53cmFwTGF0KSB7XG4gICAgICB0aGlzLl93cmFwTGF0ID0gW1xuICAgICAgICBNYXRoLmZsb29yKG1hcC5wcm9qZWN0KFtjcnMud3JhcExhdFswXSwgMF0pLnkgLyBjZWxsU2l6ZSksXG4gICAgICAgIE1hdGguY2VpbChtYXAucHJvamVjdChbY3JzLndyYXBMYXRbMV0sIDBdKS55IC8gY2VsbFNpemUpXG4gICAgICBdO1xuICAgIH1cbiAgfSxcblxuICBfZ2V0Q2VsbFNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNlbGxTaXplO1xuICB9LFxuXG4gIF91cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX21hcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBib3VuZHMgPSB0aGlzLl9tYXAuZ2V0UGl4ZWxCb3VuZHMoKTtcbiAgICB2YXIgY2VsbFNpemUgPSB0aGlzLl9nZXRDZWxsU2l6ZSgpO1xuXG4gICAgLy8gY2VsbCBjb29yZGluYXRlcyByYW5nZSBmb3IgdGhlIGN1cnJlbnQgdmlld1xuICAgIHZhciBjZWxsQm91bmRzID0gTC5ib3VuZHMoXG4gICAgICBib3VuZHMubWluLmRpdmlkZUJ5KGNlbGxTaXplKS5mbG9vcigpLFxuICAgICAgYm91bmRzLm1heC5kaXZpZGVCeShjZWxsU2l6ZSkuZmxvb3IoKSk7XG5cbiAgICB0aGlzLl9yZW1vdmVPdGhlckNlbGxzKGNlbGxCb3VuZHMpO1xuICAgIHRoaXMuX2FkZENlbGxzKGNlbGxCb3VuZHMpO1xuXG4gICAgdGhpcy5maXJlKCdjZWxsc3VwZGF0ZWQnKTtcbiAgfSxcblxuICBfYWRkQ2VsbHM6IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICB2YXIgcXVldWUgPSBbXTtcbiAgICB2YXIgY2VudGVyID0gYm91bmRzLmdldENlbnRlcigpO1xuICAgIHZhciB6b29tID0gdGhpcy5fbWFwLmdldFpvb20oKTtcblxuICAgIHZhciBqLCBpLCBjb29yZHM7XG4gICAgLy8gY3JlYXRlIGEgcXVldWUgb2YgY29vcmRpbmF0ZXMgdG8gbG9hZCBjZWxscyBmcm9tXG4gICAgZm9yIChqID0gYm91bmRzLm1pbi55OyBqIDw9IGJvdW5kcy5tYXgueTsgaisrKSB7XG4gICAgICBmb3IgKGkgPSBib3VuZHMubWluLng7IGkgPD0gYm91bmRzLm1heC54OyBpKyspIHtcbiAgICAgICAgY29vcmRzID0gTC5wb2ludChpLCBqKTtcbiAgICAgICAgY29vcmRzLnogPSB6b29tO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1ZhbGlkQ2VsbChjb29yZHMpKSB7XG4gICAgICAgICAgcXVldWUucHVzaChjb29yZHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNlbGxzVG9Mb2FkID0gcXVldWUubGVuZ3RoO1xuXG4gICAgaWYgKGNlbGxzVG9Mb2FkID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgdGhpcy5fY2VsbHNUb0xvYWQgKz0gY2VsbHNUb0xvYWQ7XG4gICAgdGhpcy5fY2VsbHNUb3RhbCArPSBjZWxsc1RvTG9hZDtcblxuICAgIC8vIHNvcnQgY2VsbCBxdWV1ZSB0byBsb2FkIGNlbGxzIGluIG9yZGVyIG9mIHRoZWlyIGRpc3RhbmNlIHRvIGNlbnRlclxuICAgIHF1ZXVlLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBhLmRpc3RhbmNlVG8oY2VudGVyKSAtIGIuZGlzdGFuY2VUbyhjZW50ZXIpO1xuICAgIH0pO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGNlbGxzVG9Mb2FkOyBpKyspIHtcbiAgICAgIHRoaXMuX2FkZENlbGwocXVldWVbaV0pO1xuICAgIH1cbiAgfSxcblxuICBfaXNWYWxpZENlbGw6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICB2YXIgY3JzID0gdGhpcy5fbWFwLm9wdGlvbnMuY3JzO1xuXG4gICAgaWYgKCFjcnMuaW5maW5pdGUpIHtcbiAgICAgIC8vIGRvbid0IGxvYWQgY2VsbCBpZiBpdCdzIG91dCBvZiBib3VuZHMgYW5kIG5vdCB3cmFwcGVkXG4gICAgICB2YXIgYm91bmRzID0gdGhpcy5fY2VsbE51bUJvdW5kcztcbiAgICAgIGlmIChcbiAgICAgICAgKCFjcnMud3JhcExuZyAmJiAoY29vcmRzLnggPCBib3VuZHMubWluLnggfHwgY29vcmRzLnggPiBib3VuZHMubWF4LngpKSB8fFxuICAgICAgICAoIWNycy53cmFwTGF0ICYmIChjb29yZHMueSA8IGJvdW5kcy5taW4ueSB8fCBjb29yZHMueSA+IGJvdW5kcy5tYXgueSkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5vcHRpb25zLmJvdW5kcykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gZG9uJ3QgbG9hZCBjZWxsIGlmIGl0IGRvZXNuJ3QgaW50ZXJzZWN0IHRoZSBib3VuZHMgaW4gb3B0aW9uc1xuICAgIHZhciBjZWxsQm91bmRzID0gdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3Jkcyk7XG4gICAgcmV0dXJuIEwubGF0TG5nQm91bmRzKHRoaXMub3B0aW9ucy5ib3VuZHMpLmludGVyc2VjdHMoY2VsbEJvdW5kcyk7XG4gIH0sXG5cbiAgLy8gY29udmVydHMgY2VsbCBjb29yZGluYXRlcyB0byBpdHMgZ2VvZ3JhcGhpY2FsIGJvdW5kc1xuICBfY2VsbENvb3Jkc1RvQm91bmRzOiBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcbiAgICB2YXIgY2VsbFNpemUgPSB0aGlzLm9wdGlvbnMuY2VsbFNpemU7XG4gICAgdmFyIG53UG9pbnQgPSBjb29yZHMubXVsdGlwbHlCeShjZWxsU2l6ZSk7XG4gICAgdmFyIHNlUG9pbnQgPSBud1BvaW50LmFkZChbY2VsbFNpemUsIGNlbGxTaXplXSk7XG4gICAgdmFyIG53ID0gbWFwLndyYXBMYXRMbmcobWFwLnVucHJvamVjdChud1BvaW50LCBjb29yZHMueikpO1xuICAgIHZhciBzZSA9IG1hcC53cmFwTGF0TG5nKG1hcC51bnByb2plY3Qoc2VQb2ludCwgY29vcmRzLnopKTtcblxuICAgIHJldHVybiBMLmxhdExuZ0JvdW5kcyhudywgc2UpO1xuICB9LFxuXG4gIC8vIGNvbnZlcnRzIGNlbGwgY29vcmRpbmF0ZXMgdG8ga2V5IGZvciB0aGUgY2VsbCBjYWNoZVxuICBfY2VsbENvb3Jkc1RvS2V5OiBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgcmV0dXJuIGNvb3Jkcy54ICsgJzonICsgY29vcmRzLnk7XG4gIH0sXG5cbiAgLy8gY29udmVydHMgY2VsbCBjYWNoZSBrZXkgdG8gY29vcmRpYW50ZXNcbiAgX2tleVRvQ2VsbENvb3JkczogZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBrQXJyID0ga2V5LnNwbGl0KCc6Jyk7XG4gICAgdmFyIHggPSBwYXJzZUludChrQXJyWzBdLCAxMCk7XG4gICAgdmFyIHkgPSBwYXJzZUludChrQXJyWzFdLCAxMCk7XG5cbiAgICByZXR1cm4gTC5wb2ludCh4LCB5KTtcbiAgfSxcblxuICAvLyByZW1vdmUgYW55IHByZXNlbnQgY2VsbHMgdGhhdCBhcmUgb2ZmIHRoZSBzcGVjaWZpZWQgYm91bmRzXG4gIF9yZW1vdmVPdGhlckNlbGxzOiBmdW5jdGlvbiAoYm91bmRzKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2NlbGxzKSB7XG4gICAgICBpZiAoIWJvdW5kcy5jb250YWlucyh0aGlzLl9rZXlUb0NlbGxDb29yZHMoa2V5KSkpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlQ2VsbChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfcmVtb3ZlQ2VsbDogZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBjZWxsID0gdGhpcy5fYWN0aXZlQ2VsbHNba2V5XTtcblxuICAgIGlmIChjZWxsKSB7XG4gICAgICBkZWxldGUgdGhpcy5fYWN0aXZlQ2VsbHNba2V5XTtcblxuICAgICAgaWYgKHRoaXMuY2VsbExlYXZlKSB7XG4gICAgICAgIHRoaXMuY2VsbExlYXZlKGNlbGwuYm91bmRzLCBjZWxsLmNvb3Jkcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlyZSgnY2VsbGxlYXZlJywge1xuICAgICAgICBib3VuZHM6IGNlbGwuYm91bmRzLFxuICAgICAgICBjb29yZHM6IGNlbGwuY29vcmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX3JlbW92ZUNlbGxzOiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2NlbGxzKSB7XG4gICAgICB2YXIgYm91bmRzID0gdGhpcy5fY2VsbHNba2V5XS5ib3VuZHM7XG4gICAgICB2YXIgY29vcmRzID0gdGhpcy5fY2VsbHNba2V5XS5jb29yZHM7XG5cbiAgICAgIGlmICh0aGlzLmNlbGxMZWF2ZSkge1xuICAgICAgICB0aGlzLmNlbGxMZWF2ZShib3VuZHMsIGNvb3Jkcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlyZSgnY2VsbGxlYXZlJywge1xuICAgICAgICBib3VuZHM6IGJvdW5kcyxcbiAgICAgICAgY29vcmRzOiBjb29yZHNcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBfYWRkQ2VsbDogZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIC8vIHdyYXAgY2VsbCBjb29yZHMgaWYgbmVjZXNzYXJ5IChkZXBlbmRpbmcgb24gQ1JTKVxuICAgIHRoaXMuX3dyYXBDb29yZHMoY29vcmRzKTtcblxuICAgIC8vIGdlbmVyYXRlIHRoZSBjZWxsIGtleVxuICAgIHZhciBrZXkgPSB0aGlzLl9jZWxsQ29vcmRzVG9LZXkoY29vcmRzKTtcblxuICAgIC8vIGdldCB0aGUgY2VsbCBmcm9tIHRoZSBjYWNoZVxuICAgIHZhciBjZWxsID0gdGhpcy5fY2VsbHNba2V5XTtcbiAgICAvLyBpZiB0aGlzIGNlbGwgc2hvdWxkIGJlIHNob3duIGFzIGlzbnQgYWN0aXZlIHlldCAoZW50ZXIpXG5cbiAgICBpZiAoY2VsbCAmJiAhdGhpcy5fYWN0aXZlQ2VsbHNba2V5XSkge1xuICAgICAgaWYgKHRoaXMuY2VsbEVudGVyKSB7XG4gICAgICAgIHRoaXMuY2VsbEVudGVyKGNlbGwuYm91bmRzLCBjb29yZHMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmUoJ2NlbGxlbnRlcicsIHtcbiAgICAgICAgYm91bmRzOiBjZWxsLmJvdW5kcyxcbiAgICAgICAgY29vcmRzOiBjb29yZHNcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9hY3RpdmVDZWxsc1trZXldID0gY2VsbDtcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSBkb250IGhhdmUgdGhpcyBjZWxsIGluIHRoZSBjYWNoZSB5ZXQgKGNyZWF0ZSlcbiAgICBpZiAoIWNlbGwpIHtcbiAgICAgIGNlbGwgPSB7XG4gICAgICAgIGNvb3JkczogY29vcmRzLFxuICAgICAgICBib3VuZHM6IHRoaXMuX2NlbGxDb29yZHNUb0JvdW5kcyhjb29yZHMpXG4gICAgICB9O1xuXG4gICAgICB0aGlzLl9jZWxsc1trZXldID0gY2VsbDtcbiAgICAgIHRoaXMuX2FjdGl2ZUNlbGxzW2tleV0gPSBjZWxsO1xuXG4gICAgICBpZiAodGhpcy5jcmVhdGVDZWxsKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlQ2VsbChjZWxsLmJvdW5kcywgY29vcmRzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maXJlKCdjZWxsY3JlYXRlJywge1xuICAgICAgICBib3VuZHM6IGNlbGwuYm91bmRzLFxuICAgICAgICBjb29yZHM6IGNvb3Jkc1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIF93cmFwQ29vcmRzOiBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgY29vcmRzLnggPSB0aGlzLl93cmFwTG5nID8gTC5VdGlsLndyYXBOdW0oY29vcmRzLngsIHRoaXMuX3dyYXBMbmcpIDogY29vcmRzLng7XG4gICAgY29vcmRzLnkgPSB0aGlzLl93cmFwTGF0ID8gTC5VdGlsLndyYXBOdW0oY29vcmRzLnksIHRoaXMuX3dyYXBMYXQpIDogY29vcmRzLnk7XG4gIH0sXG5cbiAgLy8gZ2V0IHRoZSBnbG9iYWwgY2VsbCBjb29yZGluYXRlcyByYW5nZSBmb3IgdGhlIGN1cnJlbnQgem9vbVxuICBfZ2V0Q2VsbE51bUJvdW5kczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLl9tYXAuZ2V0UGl4ZWxXb3JsZEJvdW5kcygpO1xuICAgIHZhciBzaXplID0gdGhpcy5fZ2V0Q2VsbFNpemUoKTtcblxuICAgIHJldHVybiBib3VuZHMgPyBMLmJvdW5kcyhcbiAgICAgICAgYm91bmRzLm1pbi5kaXZpZGVCeShzaXplKS5mbG9vcigpLFxuICAgICAgICBib3VuZHMubWF4LmRpdmlkZUJ5KHNpemUpLmNlaWwoKS5zdWJ0cmFjdChbMSwgMV0pKSA6IG51bGw7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBWaXJ0dWFsR3JpZDtcbiIsImZ1bmN0aW9uIEJpbmFyeVNlYXJjaEluZGV4ICh2YWx1ZXMpIHtcbiAgdGhpcy52YWx1ZXMgPSBbXS5jb25jYXQodmFsdWVzIHx8IFtdKTtcbn1cblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBpbmRleCA9IHRoaXMuZ2V0SW5kZXgodmFsdWUpO1xuICByZXR1cm4gdGhpcy52YWx1ZXNbaW5kZXhdO1xufTtcblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLmdldEluZGV4ID0gZnVuY3Rpb24gZ2V0SW5kZXggKHZhbHVlKSB7XG4gIGlmICh0aGlzLmRpcnR5KSB7XG4gICAgdGhpcy5zb3J0KCk7XG4gIH1cblxuICB2YXIgbWluSW5kZXggPSAwO1xuICB2YXIgbWF4SW5kZXggPSB0aGlzLnZhbHVlcy5sZW5ndGggLSAxO1xuICB2YXIgY3VycmVudEluZGV4O1xuICB2YXIgY3VycmVudEVsZW1lbnQ7XG5cbiAgd2hpbGUgKG1pbkluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgY3VycmVudEluZGV4ID0gKG1pbkluZGV4ICsgbWF4SW5kZXgpIC8gMiB8IDA7XG4gICAgY3VycmVudEVsZW1lbnQgPSB0aGlzLnZhbHVlc1tNYXRoLnJvdW5kKGN1cnJlbnRJbmRleCldO1xuICAgIGlmICgrY3VycmVudEVsZW1lbnQudmFsdWUgPCArdmFsdWUpIHtcbiAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICB9IGVsc2UgaWYgKCtjdXJyZW50RWxlbWVudC52YWx1ZSA+ICt2YWx1ZSkge1xuICAgICAgbWF4SW5kZXggPSBjdXJyZW50SW5kZXggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3VycmVudEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBNYXRoLmFicyh+bWF4SW5kZXgpO1xufTtcblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLmJldHdlZW4gPSBmdW5jdGlvbiBiZXR3ZWVuIChzdGFydCwgZW5kKSB7XG4gIHZhciBzdGFydEluZGV4ID0gdGhpcy5nZXRJbmRleChzdGFydCk7XG4gIHZhciBlbmRJbmRleCA9IHRoaXMuZ2V0SW5kZXgoZW5kKTtcblxuICBpZiAoc3RhcnRJbmRleCA9PT0gMCAmJiBlbmRJbmRleCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHdoaWxlICh0aGlzLnZhbHVlc1tzdGFydEluZGV4IC0gMV0gJiYgdGhpcy52YWx1ZXNbc3RhcnRJbmRleCAtIDFdLnZhbHVlID09PSBzdGFydCkge1xuICAgIHN0YXJ0SW5kZXgtLTtcbiAgfVxuXG4gIHdoaWxlICh0aGlzLnZhbHVlc1tlbmRJbmRleCArIDFdICYmIHRoaXMudmFsdWVzW2VuZEluZGV4ICsgMV0udmFsdWUgPT09IGVuZCkge1xuICAgIGVuZEluZGV4Kys7XG4gIH1cblxuICBpZiAodGhpcy52YWx1ZXNbZW5kSW5kZXhdICYmIHRoaXMudmFsdWVzW2VuZEluZGV4XS52YWx1ZSA9PT0gZW5kICYmIHRoaXMudmFsdWVzW2VuZEluZGV4ICsgMV0pIHtcbiAgICBlbmRJbmRleCsrO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMudmFsdWVzLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcbn07XG5cbkJpbmFyeVNlYXJjaEluZGV4LnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiBpbnNlcnQgKGl0ZW0pIHtcbiAgdGhpcy52YWx1ZXMuc3BsaWNlKHRoaXMuZ2V0SW5kZXgoaXRlbS52YWx1ZSksIDAsIGl0ZW0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkJpbmFyeVNlYXJjaEluZGV4LnByb3RvdHlwZS5idWxrQWRkID0gZnVuY3Rpb24gYnVsa0FkZCAoaXRlbXMsIHNvcnQpIHtcbiAgdGhpcy52YWx1ZXMgPSB0aGlzLnZhbHVlcy5jb25jYXQoW10uY29uY2F0KGl0ZW1zIHx8IFtdKSk7XG5cbiAgaWYgKHNvcnQpIHtcbiAgICB0aGlzLnNvcnQoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLnNvcnQgPSBmdW5jdGlvbiBzb3J0ICgpIHtcbiAgdGhpcy52YWx1ZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiArYi52YWx1ZSAtICthLnZhbHVlO1xuICB9KS5yZXZlcnNlKCk7XG4gIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCaW5hcnlTZWFyY2hJbmRleDtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IGZlYXR1cmVMYXllclNlcnZpY2UgZnJvbSAnLi4vLi4vU2VydmljZXMvRmVhdHVyZUxheWVyU2VydmljZSc7XG5pbXBvcnQgeyBjbGVhblVybCwgd2Fybiwgc2V0RXNyaUF0dHJpYnV0aW9uIH0gZnJvbSAnLi4vLi4vVXRpbCc7XG5pbXBvcnQgVmlydHVhbEdyaWQgZnJvbSAnbGVhZmxldC12aXJ0dWFsLWdyaWQnO1xuaW1wb3J0IEJpbmFyeVNlYXJjaEluZGV4IGZyb20gJ3RpbnktYmluYXJ5LXNlYXJjaCc7XG5cbmV4cG9ydCB2YXIgRmVhdHVyZU1hbmFnZXIgPSBWaXJ0dWFsR3JpZC5leHRlbmQoe1xuICAvKipcbiAgICogT3B0aW9uc1xuICAgKi9cblxuICBvcHRpb25zOiB7XG4gICAgYXR0cmlidXRpb246IG51bGwsXG4gICAgd2hlcmU6ICcxPTEnLFxuICAgIGZpZWxkczogWycqJ10sXG4gICAgZnJvbTogZmFsc2UsXG4gICAgdG86IGZhbHNlLFxuICAgIHRpbWVGaWVsZDogZmFsc2UsXG4gICAgdGltZUZpbHRlck1vZGU6ICdzZXJ2ZXInLFxuICAgIHNpbXBsaWZ5RmFjdG9yOiAwLFxuICAgIHByZWNpc2lvbjogNlxuICB9LFxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKi9cblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIFZpcnR1YWxHcmlkLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICBvcHRpb25zLnVybCA9IGNsZWFuVXJsKG9wdGlvbnMudXJsKTtcbiAgICBvcHRpb25zID0gTC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5zZXJ2aWNlID0gZmVhdHVyZUxheWVyU2VydmljZShvcHRpb25zKTtcbiAgICB0aGlzLnNlcnZpY2UuYWRkRXZlbnRQYXJlbnQodGhpcyk7XG5cbiAgICAvLyB1c2UgY2FzZSBpbnNlbnNpdGl2ZSByZWdleCB0byBsb29rIGZvciBjb21tb24gZmllbGRuYW1lcyB1c2VkIGZvciBpbmRleGluZ1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZmllbGRzWzBdICE9PSAnKicpIHtcbiAgICAgIHZhciBvaWRDaGVjayA9IGZhbHNlO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMuZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZmllbGRzW2ldLm1hdGNoKC9eKE9CSkVDVElEfEZJRHxPSUR8SUQpJC9pKSkge1xuICAgICAgICAgIG9pZENoZWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9pZENoZWNrID09PSBmYWxzZSkge1xuICAgICAgICB3YXJuKCdubyBrbm93biBlc3JpRmllbGRUeXBlT0lEIGZpZWxkIGRldGVjdGVkIGluIGZpZWxkcyBBcnJheS4gIFBsZWFzZSBhZGQgYW4gYXR0cmlidXRlIGZpZWxkIGNvbnRhaW5pbmcgdW5pcXVlIElEcyB0byBlbnN1cmUgdGhlIGxheWVyIGNhbiBiZSBkcmF3biBjb3JyZWN0bHkuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnQgJiYgdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmQpIHtcbiAgICAgIHRoaXMuX3N0YXJ0VGltZUluZGV4ID0gbmV3IEJpbmFyeVNlYXJjaEluZGV4KCk7XG4gICAgICB0aGlzLl9lbmRUaW1lSW5kZXggPSBuZXcgQmluYXJ5U2VhcmNoSW5kZXgoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQpIHtcbiAgICAgIHRoaXMuX3RpbWVJbmRleCA9IG5ldyBCaW5hcnlTZWFyY2hJbmRleCgpO1xuICAgIH1cblxuICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgdGhpcy5fY3VycmVudFNuYXBzaG90ID0gW107IC8vIGNhY2hlIG9mIHdoYXQgbGF5ZXJzIHNob3VsZCBiZSBhY3RpdmVcbiAgICB0aGlzLl9hY3RpdmVSZXF1ZXN0cyA9IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIExheWVyIEludGVyZmFjZVxuICAgKi9cblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIC8vIGluY2x1ZGUgJ1Bvd2VyZWQgYnkgRXNyaScgaW4gbWFwIGF0dHJpYnV0aW9uXG4gICAgc2V0RXNyaUF0dHJpYnV0aW9uKG1hcCk7XG5cbiAgICB0aGlzLnNlcnZpY2UubWV0YWRhdGEoZnVuY3Rpb24gKGVyciwgbWV0YWRhdGEpIHtcbiAgICAgIGlmICghZXJyKSB7XG4gICAgICAgIHZhciBzdXBwb3J0ZWRGb3JtYXRzID0gbWV0YWRhdGEuc3VwcG9ydGVkUXVlcnlGb3JtYXRzO1xuICAgICAgICAvLyBjaGVjayB0byBzZWUgd2hldGhlciBzZXJ2aWNlIGNhbiBlbWl0IEdlb0pTT04gbmF0aXZlbHlcbiAgICAgICAgaWYgKHN1cHBvcnRlZEZvcm1hdHMgJiYgc3VwcG9ydGVkRm9ybWF0cy5pbmRleE9mKCdnZW9KU09OJykgIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5zZXJ2aWNlLm9wdGlvbnMuaXNNb2Rlcm4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFkZCBjb3B5cmlnaHQgdGV4dCBsaXN0ZWQgaW4gc2VydmljZSBtZXRhZGF0YVxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbiAmJiBtYXAuYXR0cmlidXRpb25Db250cm9sICYmIG1ldGFkYXRhLmNvcHlyaWdodFRleHQpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gPSBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0O1xuICAgICAgICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuYWRkQXR0cmlidXRpb24odGhpcy5nZXRBdHRyaWJ1dGlvbigpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgbWFwLm9uKCd6b29tZW5kJywgdGhpcy5faGFuZGxlWm9vbUNoYW5nZSwgdGhpcyk7XG5cbiAgICByZXR1cm4gVmlydHVhbEdyaWQucHJvdG90eXBlLm9uQWRkLmNhbGwodGhpcywgbWFwKTtcbiAgfSxcblxuICBvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuICAgIG1hcC5vZmYoJ3pvb21lbmQnLCB0aGlzLl9oYW5kbGVab29tQ2hhbmdlLCB0aGlzKTtcblxuICAgIHJldHVybiBWaXJ0dWFsR3JpZC5wcm90b3R5cGUub25SZW1vdmUuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIGdldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbjtcbiAgfSxcblxuICAvKipcbiAgICogRmVhdHVyZSBNYW5hZ2VtZW50XG4gICAqL1xuXG4gIGNyZWF0ZUNlbGw6IGZ1bmN0aW9uIChib3VuZHMsIGNvb3Jkcykge1xuICAgIHRoaXMuX3JlcXVlc3RGZWF0dXJlcyhib3VuZHMsIGNvb3Jkcyk7XG4gIH0sXG5cbiAgX3JlcXVlc3RGZWF0dXJlczogZnVuY3Rpb24gKGJvdW5kcywgY29vcmRzLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2FjdGl2ZVJlcXVlc3RzKys7XG5cbiAgICAvLyBvdXIgZmlyc3QgYWN0aXZlIHJlcXVlc3QgZmlyZXMgbG9hZGluZ1xuICAgIGlmICh0aGlzLl9hY3RpdmVSZXF1ZXN0cyA9PT0gMSkge1xuICAgICAgdGhpcy5maXJlKCdsb2FkaW5nJywge1xuICAgICAgICBib3VuZHM6IGJvdW5kc1xuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2J1aWxkUXVlcnkoYm91bmRzKS5ydW4oZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlQ29sbGVjdGlvbiwgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5leGNlZWRlZFRyYW5zZmVyTGltaXQpIHtcbiAgICAgICAgdGhpcy5maXJlKCdkcmF3bGltaXRleGNlZWRlZCcpO1xuICAgICAgfVxuXG4gICAgICAvLyBubyBlcnJvciwgZmVhdHVyZXNcbiAgICAgIGlmICghZXJyb3IgJiYgZmVhdHVyZUNvbGxlY3Rpb24gJiYgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIHNjaGVkdWxlIGFkZGluZyBmZWF0dXJlcyB1bnRpbCB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWVcbiAgICAgICAgTC5VdGlsLnJlcXVlc3RBbmltRnJhbWUoTC5VdGlsLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuX2FkZEZlYXR1cmVzKGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLCBjb29yZHMpO1xuICAgICAgICAgIHRoaXMuX3Bvc3RQcm9jZXNzRmVhdHVyZXMoYm91bmRzKTtcbiAgICAgICAgfSwgdGhpcykpO1xuICAgICAgfVxuXG4gICAgICAvLyBubyBlcnJvciwgbm8gZmVhdHVyZXNcbiAgICAgIGlmICghZXJyb3IgJiYgZmVhdHVyZUNvbGxlY3Rpb24gJiYgIWZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9wb3N0UHJvY2Vzc0ZlYXR1cmVzKGJvdW5kcyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICB0aGlzLl9wb3N0UHJvY2Vzc0ZlYXR1cmVzKGJvdW5kcyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGVycm9yLCBmZWF0dXJlQ29sbGVjdGlvbik7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX3Bvc3RQcm9jZXNzRmVhdHVyZXM6IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICAvLyBkZWluY3JpbWVudCB0aGUgcmVxdWVzdCBjb3VudGVyIG5vdyB0aGF0IHdlIGhhdmUgcHJvY2Vzc2VkIGZlYXR1cmVzXG4gICAgdGhpcy5fYWN0aXZlUmVxdWVzdHMtLTtcblxuICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIGFjdGl2ZSByZXF1ZXN0cyBmaXJlIGEgbG9hZCBldmVudCBmb3IgdGhpcyB2aWV3XG4gICAgaWYgKHRoaXMuX2FjdGl2ZVJlcXVlc3RzIDw9IDApIHtcbiAgICAgIHRoaXMuZmlyZSgnbG9hZCcsIHtcbiAgICAgICAgYm91bmRzOiBib3VuZHNcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBfY2FjaGVLZXk6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICByZXR1cm4gY29vcmRzLnogKyAnOicgKyBjb29yZHMueCArICc6JyArIGNvb3Jkcy55O1xuICB9LFxuXG4gIF9hZGRGZWF0dXJlczogZnVuY3Rpb24gKGZlYXR1cmVzLCBjb29yZHMpIHtcbiAgICB2YXIga2V5ID0gdGhpcy5fY2FjaGVLZXkoY29vcmRzKTtcbiAgICB0aGlzLl9jYWNoZVtrZXldID0gdGhpcy5fY2FjaGVba2V5XSB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSBmZWF0dXJlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGlkID0gZmVhdHVyZXNbaV0uaWQ7XG4gICAgICB0aGlzLl9jdXJyZW50U25hcHNob3QucHVzaChpZCk7XG4gICAgICB0aGlzLl9jYWNoZVtrZXldLnB1c2goaWQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZUZpZWxkKSB7XG4gICAgICB0aGlzLl9idWlsZFRpbWVJbmRleGVzKGZlYXR1cmVzKTtcbiAgICB9XG5cbiAgICAvLyBuZWVkIHRvIFBSIHJlbW92YWwgb2YgdGhlIGxvZ2ljIGJlbG93IHRvby4uLlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wYXRyaWNrYXJsdC9sZWFmbGV0LXZpcnR1YWwtZ3JpZC9ibG9iL21hc3Rlci9zcmMvdmlydHVhbC1ncmlkLmpzI0wxMDAtTDEwMlxuXG4gICAgdGhpcy5jcmVhdGVMYXllcnMoZmVhdHVyZXMpO1xuICB9LFxuXG4gIF9idWlsZFF1ZXJ5OiBmdW5jdGlvbiAoYm91bmRzKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdGhpcy5zZXJ2aWNlLnF1ZXJ5KClcbiAgICAgIC5pbnRlcnNlY3RzKGJvdW5kcylcbiAgICAgIC53aGVyZSh0aGlzLm9wdGlvbnMud2hlcmUpXG4gICAgICAuZmllbGRzKHRoaXMub3B0aW9ucy5maWVsZHMpXG4gICAgICAucHJlY2lzaW9uKHRoaXMub3B0aW9ucy5wcmVjaXNpb24pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zaW1wbGlmeUZhY3Rvcikge1xuICAgICAgcXVlcnkuc2ltcGxpZnkodGhpcy5fbWFwLCB0aGlzLm9wdGlvbnMuc2ltcGxpZnlGYWN0b3IpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZUZpbHRlck1vZGUgPT09ICdzZXJ2ZXInICYmIHRoaXMub3B0aW9ucy5mcm9tICYmIHRoaXMub3B0aW9ucy50bykge1xuICAgICAgcXVlcnkuYmV0d2Vlbih0aGlzLm9wdGlvbnMuZnJvbSwgdGhpcy5vcHRpb25zLnRvKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcXVlcnk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFdoZXJlIE1ldGhvZHNcbiAgICovXG5cbiAgc2V0V2hlcmU6IGZ1bmN0aW9uICh3aGVyZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLm9wdGlvbnMud2hlcmUgPSAod2hlcmUgJiYgd2hlcmUubGVuZ3RoKSA/IHdoZXJlIDogJzE9MSc7XG5cbiAgICB2YXIgb2xkU25hcHNob3QgPSBbXTtcbiAgICB2YXIgbmV3U25hcHNob3QgPSBbXTtcbiAgICB2YXIgcGVuZGluZ1JlcXVlc3RzID0gMDtcbiAgICB2YXIgcmVxdWVzdEVycm9yID0gbnVsbDtcbiAgICB2YXIgcmVxdWVzdENhbGxiYWNrID0gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlQ29sbGVjdGlvbikge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJlcXVlc3RFcnJvciA9IGVycm9yO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmVhdHVyZUNvbGxlY3Rpb24pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgbmV3U25hcHNob3QucHVzaChmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlc1tpXS5pZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcGVuZGluZ1JlcXVlc3RzLS07XG5cbiAgICAgIGlmIChwZW5kaW5nUmVxdWVzdHMgPD0gMCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50U25hcHNob3QgPSBuZXdTbmFwc2hvdDtcbiAgICAgICAgLy8gc2NoZWR1bGUgYWRkaW5nIGZlYXR1cmVzIGZvciB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWVcbiAgICAgICAgTC5VdGlsLnJlcXVlc3RBbmltRnJhbWUoTC5VdGlsLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKG9sZFNuYXBzaG90KTtcbiAgICAgICAgICB0aGlzLmFkZExheWVycyhuZXdTbmFwc2hvdCk7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHJlcXVlc3RFcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBmb3IgKHZhciBpID0gdGhpcy5fY3VycmVudFNuYXBzaG90Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBvbGRTbmFwc2hvdC5wdXNoKHRoaXMuX2N1cnJlbnRTbmFwc2hvdFtpXSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2FjdGl2ZUNlbGxzKSB7XG4gICAgICBwZW5kaW5nUmVxdWVzdHMrKztcbiAgICAgIHZhciBjb29yZHMgPSB0aGlzLl9rZXlUb0NlbGxDb29yZHMoa2V5KTtcbiAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsQ29vcmRzVG9Cb3VuZHMoY29vcmRzKTtcbiAgICAgIHRoaXMuX3JlcXVlc3RGZWF0dXJlcyhib3VuZHMsIGtleSwgcmVxdWVzdENhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRXaGVyZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMud2hlcmU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRpbWUgUmFuZ2UgTWV0aG9kc1xuICAgKi9cblxuICBnZXRUaW1lUmFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gW3RoaXMub3B0aW9ucy5mcm9tLCB0aGlzLm9wdGlvbnMudG9dO1xuICB9LFxuXG4gIHNldFRpbWVSYW5nZTogZnVuY3Rpb24gKGZyb20sIHRvLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciBvbGRGcm9tID0gdGhpcy5vcHRpb25zLmZyb207XG4gICAgdmFyIG9sZFRvID0gdGhpcy5vcHRpb25zLnRvO1xuICAgIHZhciBwZW5kaW5nUmVxdWVzdHMgPSAwO1xuICAgIHZhciByZXF1ZXN0RXJyb3IgPSBudWxsO1xuICAgIHZhciByZXF1ZXN0Q2FsbGJhY2sgPSBMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXF1ZXN0RXJyb3IgPSBlcnJvcjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2ZpbHRlckV4aXN0aW5nRmVhdHVyZXMob2xkRnJvbSwgb2xkVG8sIGZyb20sIHRvKTtcblxuICAgICAgcGVuZGluZ1JlcXVlc3RzLS07XG5cbiAgICAgIGlmIChjYWxsYmFjayAmJiBwZW5kaW5nUmVxdWVzdHMgPD0gMCkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHJlcXVlc3RFcnJvcik7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0aGlzLm9wdGlvbnMuZnJvbSA9IGZyb207XG4gICAgdGhpcy5vcHRpb25zLnRvID0gdG87XG5cbiAgICB0aGlzLl9maWx0ZXJFeGlzdGluZ0ZlYXR1cmVzKG9sZEZyb20sIG9sZFRvLCBmcm9tLCB0byk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWx0ZXJNb2RlID09PSAnc2VydmVyJykge1xuICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2FjdGl2ZUNlbGxzKSB7XG4gICAgICAgIHBlbmRpbmdSZXF1ZXN0cysrO1xuICAgICAgICB2YXIgY29vcmRzID0gdGhpcy5fa2V5VG9DZWxsQ29vcmRzKGtleSk7XG4gICAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsQ29vcmRzVG9Cb3VuZHMoY29vcmRzKTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdEZlYXR1cmVzKGJvdW5kcywga2V5LCByZXF1ZXN0Q2FsbGJhY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fYWN0aXZlQ2VsbHMpIHtcbiAgICAgIHZhciBjb29yZHMgPSB0aGlzLl9rZXlUb0NlbGxDb29yZHMoa2V5KTtcbiAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsQ29vcmRzVG9Cb3VuZHMoY29vcmRzKTtcbiAgICAgIHRoaXMuX3JlcXVlc3RGZWF0dXJlcyhib3VuZHMsIGtleSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVkcmF3KSB7XG4gICAgICB0aGlzLm9uY2UoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZWFjaEZlYXR1cmUoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgICAgdGhpcy5fcmVkcmF3KGxheWVyLmZlYXR1cmUuaWQpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgfSxcblxuICBfZmlsdGVyRXhpc3RpbmdGZWF0dXJlczogZnVuY3Rpb24gKG9sZEZyb20sIG9sZFRvLCBuZXdGcm9tLCBuZXdUbykge1xuICAgIHZhciBsYXllcnNUb1JlbW92ZSA9IChvbGRGcm9tICYmIG9sZFRvKSA/IHRoaXMuX2dldEZlYXR1cmVzSW5UaW1lUmFuZ2Uob2xkRnJvbSwgb2xkVG8pIDogdGhpcy5fY3VycmVudFNuYXBzaG90O1xuICAgIHZhciBsYXllcnNUb0FkZCA9IHRoaXMuX2dldEZlYXR1cmVzSW5UaW1lUmFuZ2UobmV3RnJvbSwgbmV3VG8pO1xuXG4gICAgaWYgKGxheWVyc1RvQWRkLmluZGV4T2YpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGF5ZXJzVG9BZGQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNob3VsZFJlbW92ZUxheWVyID0gbGF5ZXJzVG9SZW1vdmUuaW5kZXhPZihsYXllcnNUb0FkZFtpXSk7XG4gICAgICAgIGlmIChzaG91bGRSZW1vdmVMYXllciA+PSAwKSB7XG4gICAgICAgICAgbGF5ZXJzVG9SZW1vdmUuc3BsaWNlKHNob3VsZFJlbW92ZUxheWVyLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNjaGVkdWxlIGFkZGluZyBmZWF0dXJlcyB1bnRpbCB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWVcbiAgICBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZShMLlV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlbW92ZUxheWVycyhsYXllcnNUb1JlbW92ZSk7XG4gICAgICB0aGlzLmFkZExheWVycyhsYXllcnNUb0FkZCk7XG4gICAgfSwgdGhpcykpO1xuICB9LFxuXG4gIF9nZXRGZWF0dXJlc0luVGltZVJhbmdlOiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgIHZhciBpZHMgPSBbXTtcbiAgICB2YXIgc2VhcmNoO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnQgJiYgdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmQpIHtcbiAgICAgIHZhciBzdGFydFRpbWVzID0gdGhpcy5fc3RhcnRUaW1lSW5kZXguYmV0d2VlbihzdGFydCwgZW5kKTtcbiAgICAgIHZhciBlbmRUaW1lcyA9IHRoaXMuX2VuZFRpbWVJbmRleC5iZXR3ZWVuKHN0YXJ0LCBlbmQpO1xuICAgICAgc2VhcmNoID0gc3RhcnRUaW1lcy5jb25jYXQoZW5kVGltZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWFyY2ggPSB0aGlzLl90aW1lSW5kZXguYmV0d2VlbihzdGFydCwgZW5kKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gc2VhcmNoLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBpZHMucHVzaChzZWFyY2hbaV0uaWQpO1xuICAgIH1cblxuICAgIHJldHVybiBpZHM7XG4gIH0sXG5cbiAgX2J1aWxkVGltZUluZGV4ZXM6IGZ1bmN0aW9uIChnZW9qc29uKSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIGZlYXR1cmU7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnQgJiYgdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmQpIHtcbiAgICAgIHZhciBzdGFydFRpbWVFbnRyaWVzID0gW107XG4gICAgICB2YXIgZW5kVGltZUVudHJpZXMgPSBbXTtcbiAgICAgIGZvciAoaSA9IGdlb2pzb24ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgZmVhdHVyZSA9IGdlb2pzb25baV07XG4gICAgICAgIHN0YXJ0VGltZUVudHJpZXMucHVzaCh7XG4gICAgICAgICAgaWQ6IGZlYXR1cmUuaWQsXG4gICAgICAgICAgdmFsdWU6IG5ldyBEYXRlKGZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0XSlcbiAgICAgICAgfSk7XG4gICAgICAgIGVuZFRpbWVFbnRyaWVzLnB1c2goe1xuICAgICAgICAgIGlkOiBmZWF0dXJlLmlkLFxuICAgICAgICAgIHZhbHVlOiBuZXcgRGF0ZShmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmRdKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3N0YXJ0VGltZUluZGV4LmJ1bGtBZGQoc3RhcnRUaW1lRW50cmllcyk7XG4gICAgICB0aGlzLl9lbmRUaW1lSW5kZXguYnVsa0FkZChlbmRUaW1lRW50cmllcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0aW1lRW50cmllcyA9IFtdO1xuICAgICAgZm9yIChpID0gZ2VvanNvbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBmZWF0dXJlID0gZ2VvanNvbltpXTtcbiAgICAgICAgdGltZUVudHJpZXMucHVzaCh7XG4gICAgICAgICAgaWQ6IGZlYXR1cmUuaWQsXG4gICAgICAgICAgdmFsdWU6IG5ldyBEYXRlKGZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkXSlcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3RpbWVJbmRleC5idWxrQWRkKHRpbWVFbnRyaWVzKTtcbiAgICB9XG4gIH0sXG5cbiAgX2ZlYXR1cmVXaXRoaW5UaW1lUmFuZ2U6IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZnJvbSB8fCAhdGhpcy5vcHRpb25zLnRvKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgZnJvbSA9ICt0aGlzLm9wdGlvbnMuZnJvbS52YWx1ZU9mKCk7XG4gICAgdmFyIHRvID0gK3RoaXMub3B0aW9ucy50by52YWx1ZU9mKCk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy50aW1lRmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgZGF0ZSA9ICtmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnRpbWVGaWVsZF07XG4gICAgICByZXR1cm4gKGRhdGUgPj0gZnJvbSkgJiYgKGRhdGUgPD0gdG8pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0ICYmIHRoaXMub3B0aW9ucy50aW1lRmllbGQuZW5kKSB7XG4gICAgICB2YXIgc3RhcnREYXRlID0gK2ZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0XTtcbiAgICAgIHZhciBlbmREYXRlID0gK2ZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkLmVuZF07XG4gICAgICByZXR1cm4gKChzdGFydERhdGUgPj0gZnJvbSkgJiYgKHN0YXJ0RGF0ZSA8PSB0bykpIHx8ICgoZW5kRGF0ZSA+PSBmcm9tKSAmJiAoZW5kRGF0ZSA8PSB0bykpO1xuICAgIH1cbiAgfSxcblxuICBfdmlzaWJsZVpvb206IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBjaGVjayB0byBzZWUgd2hldGhlciB0aGUgY3VycmVudCB6b29tIGxldmVsIG9mIHRoZSBtYXAgaXMgd2l0aGluIHRoZSBvcHRpb25hbCBsaW1pdCBkZWZpbmVkIGZvciB0aGUgRmVhdHVyZUxheWVyXG4gICAgaWYgKCF0aGlzLl9tYXApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuICAgIGlmICh6b29tID4gdGhpcy5vcHRpb25zLm1heFpvb20gfHwgem9vbSA8IHRoaXMub3B0aW9ucy5taW5ab29tKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHsgcmV0dXJuIHRydWU7IH1cbiAgfSxcblxuICBfaGFuZGxlWm9vbUNoYW5nZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fdmlzaWJsZVpvb20oKSkge1xuICAgICAgdGhpcy5yZW1vdmVMYXllcnModGhpcy5fY3VycmVudFNuYXBzaG90KTtcbiAgICAgIHRoaXMuX2N1cnJlbnRTbmFwc2hvdCA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKlxuICAgICAgZm9yIGV2ZXJ5IGNlbGwgaW4gdGhpcy5fYWN0aXZlQ2VsbHNcbiAgICAgICAgMS4gR2V0IHRoZSBjYWNoZSBrZXkgZm9yIHRoZSBjb29yZHMgb2YgdGhlIGNlbGxcbiAgICAgICAgMi4gSWYgdGhpcy5fY2FjaGVba2V5XSBleGlzdHMgaXQgd2lsbCBiZSBhbiBhcnJheSBvZiBmZWF0dXJlIElEcy5cbiAgICAgICAgMy4gQ2FsbCB0aGlzLmFkZExheWVycyh0aGlzLl9jYWNoZVtrZXldKSB0byBpbnN0cnVjdCB0aGUgZmVhdHVyZSBsYXllciB0byBhZGQgdGhlIGxheWVycyBiYWNrLlxuICAgICAgKi9cbiAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5fYWN0aXZlQ2VsbHMpIHtcbiAgICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuX2FjdGl2ZUNlbGxzW2ldLmNvb3JkcztcbiAgICAgICAgdmFyIGtleSA9IHRoaXMuX2NhY2hlS2V5KGNvb3Jkcyk7XG4gICAgICAgIGlmICh0aGlzLl9jYWNoZVtrZXldKSB7XG4gICAgICAgICAgdGhpcy5hZGRMYXllcnModGhpcy5fY2FjaGVba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNlcnZpY2UgTWV0aG9kc1xuICAgKi9cblxuICBhdXRoZW50aWNhdGU6IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRoaXMuc2VydmljZS5hdXRoZW50aWNhdGUodG9rZW4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UubWV0YWRhdGEoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5xdWVyeSgpO1xuICB9LFxuXG4gIF9nZXRNZXRhZGF0YTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMuX21ldGFkYXRhKSB7XG4gICAgICB2YXIgZXJyb3I7XG4gICAgICBjYWxsYmFjayhlcnJvciwgdGhpcy5fbWV0YWRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1ldGFkYXRhKEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGEgPSByZXNwb25zZTtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIHRoaXMuX21ldGFkYXRhKTtcbiAgICAgIH0sIHRoaXMpKTtcbiAgICB9XG4gIH0sXG5cbiAgYWRkRmVhdHVyZTogZnVuY3Rpb24gKGZlYXR1cmUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fZ2V0TWV0YWRhdGEoTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBtZXRhZGF0YSkge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgeyBjYWxsYmFjay5jYWxsKHRoaXMsIGVycm9yLCBudWxsKTsgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2VydmljZS5hZGRGZWF0dXJlKGZlYXR1cmUsIEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgIC8vIGFzc2lnbiBJRCBmcm9tIHJlc3VsdCB0byBhcHByb3ByaWF0ZSBvYmplY3RpZCBmaWVsZCBmcm9tIHNlcnZpY2UgbWV0YWRhdGFcbiAgICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXNbbWV0YWRhdGEub2JqZWN0SWRGaWVsZF0gPSByZXNwb25zZS5vYmplY3RJZDtcblxuICAgICAgICAgIC8vIHdlIGFsc28gbmVlZCB0byB1cGRhdGUgdGhlIGdlb2pzb24gaWQgZm9yIGNyZWF0ZUxheWVycygpIHRvIGZ1bmN0aW9uXG4gICAgICAgICAgZmVhdHVyZS5pZCA9IHJlc3BvbnNlLm9iamVjdElkO1xuICAgICAgICAgIHRoaXMuY3JlYXRlTGF5ZXJzKFtmZWF0dXJlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKTtcbiAgICB9LCB0aGlzKSk7XG4gIH0sXG5cbiAgdXBkYXRlRmVhdHVyZTogZnVuY3Rpb24gKGZlYXR1cmUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5zZXJ2aWNlLnVwZGF0ZUZlYXR1cmUoZmVhdHVyZSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICB0aGlzLnJlbW92ZUxheWVycyhbZmVhdHVyZS5pZF0sIHRydWUpO1xuICAgICAgICB0aGlzLmNyZWF0ZUxheWVycyhbZmVhdHVyZV0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIGRlbGV0ZUZlYXR1cmU6IGZ1bmN0aW9uIChpZCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UuZGVsZXRlRmVhdHVyZShpZCwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5vYmplY3RJZCkge1xuICAgICAgICB0aGlzLnJlbW92ZUxheWVycyhbcmVzcG9uc2Uub2JqZWN0SWRdLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgZGVsZXRlRmVhdHVyZXM6IGZ1bmN0aW9uIChpZHMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5kZWxldGVGZWF0dXJlcyhpZHMsIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGlmICghZXJyb3IgJiYgcmVzcG9uc2UubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3BvbnNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMYXllcnMoW3Jlc3BvbnNlW2ldLm9iamVjdElkXSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBGZWF0dXJlTWFuYWdlciB9IGZyb20gJy4vRmVhdHVyZU1hbmFnZXInO1xuXG5leHBvcnQgdmFyIEZlYXR1cmVMYXllciA9IEZlYXR1cmVNYW5hZ2VyLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIGNhY2hlTGF5ZXJzOiB0cnVlXG4gIH0sXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqL1xuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIEZlYXR1cmVNYW5hZ2VyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fb3JpZ2luYWxTdHlsZSA9IHRoaXMub3B0aW9ucy5zdHlsZTtcbiAgICB0aGlzLl9sYXllcnMgPSB7fTtcbiAgfSxcblxuICAvKipcbiAgICogTGF5ZXIgSW50ZXJmYWNlXG4gICAqL1xuXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgIG1hcC5yZW1vdmVMYXllcih0aGlzLl9sYXllcnNbaV0pO1xuICAgICAgLy8gdHJpZ2dlciB0aGUgZXZlbnQgd2hlbiB0aGUgZW50aXJlIGZlYXR1cmVMYXllciBpcyByZW1vdmVkIGZyb20gdGhlIG1hcFxuICAgICAgdGhpcy5maXJlKCdyZW1vdmVmZWF0dXJlJywge1xuICAgICAgICBmZWF0dXJlOiB0aGlzLl9sYXllcnNbaV0uZmVhdHVyZSxcbiAgICAgICAgcGVybWFuZW50OiBmYWxzZVxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEZlYXR1cmVNYW5hZ2VyLnByb3RvdHlwZS5vblJlbW92ZS5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG5cbiAgY3JlYXRlTmV3TGF5ZXI6IGZ1bmN0aW9uIChnZW9qc29uKSB7XG4gICAgdmFyIGxheWVyID0gTC5HZW9KU09OLmdlb21ldHJ5VG9MYXllcihnZW9qc29uLCB0aGlzLm9wdGlvbnMpO1xuICAgIGxheWVyLmRlZmF1bHRPcHRpb25zID0gbGF5ZXIub3B0aW9ucztcbiAgICByZXR1cm4gbGF5ZXI7XG4gIH0sXG5cbiAgX3VwZGF0ZUxheWVyOiBmdW5jdGlvbiAobGF5ZXIsIGdlb2pzb24pIHtcbiAgICAvLyBjb252ZXJ0IHRoZSBnZW9qc29uIGNvb3JkaW5hdGVzIGludG8gYSBMZWFmbGV0IExhdExuZyBhcnJheS9uZXN0ZWQgYXJyYXlzXG4gICAgLy8gcGFzcyBpdCB0byBzZXRMYXRMbmdzIHRvIHVwZGF0ZSBsYXllciBnZW9tZXRyaWVzXG4gICAgdmFyIGxhdGxuZ3MgPSBbXTtcbiAgICB2YXIgY29vcmRzVG9MYXRMbmcgPSB0aGlzLm9wdGlvbnMuY29vcmRzVG9MYXRMbmcgfHwgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5nO1xuXG4gICAgLy8gY29weSBuZXcgYXR0cmlidXRlcywgaWYgcHJlc2VudFxuICAgIGlmIChnZW9qc29uLnByb3BlcnRpZXMpIHtcbiAgICAgIGxheWVyLmZlYXR1cmUucHJvcGVydGllcyA9IGdlb2pzb24ucHJvcGVydGllcztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGdlb2pzb24uZ2VvbWV0cnkudHlwZSkge1xuICAgICAgY2FzZSAnUG9pbnQnOlxuICAgICAgICBsYXRsbmdzID0gTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5nKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMpO1xuICAgICAgICBsYXllci5zZXRMYXRMbmcobGF0bG5ncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTGluZVN0cmluZyc6XG4gICAgICAgIGxhdGxuZ3MgPSBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIDAsIGNvb3Jkc1RvTGF0TG5nKTtcbiAgICAgICAgbGF5ZXIuc2V0TGF0TG5ncyhsYXRsbmdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdNdWx0aUxpbmVTdHJpbmcnOlxuICAgICAgICBsYXRsbmdzID0gTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCAxLCBjb29yZHNUb0xhdExuZyk7XG4gICAgICAgIGxheWVyLnNldExhdExuZ3MobGF0bG5ncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUG9seWdvbic6XG4gICAgICAgIGxhdGxuZ3MgPSBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIDEsIGNvb3Jkc1RvTGF0TG5nKTtcbiAgICAgICAgbGF5ZXIuc2V0TGF0TG5ncyhsYXRsbmdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxuICAgICAgICBsYXRsbmdzID0gTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCAyLCBjb29yZHNUb0xhdExuZyk7XG4gICAgICAgIGxheWVyLnNldExhdExuZ3MobGF0bG5ncyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogRmVhdHVyZSBNYW5hZ2VtZW50IE1ldGhvZHNcbiAgICovXG5cbiAgY3JlYXRlTGF5ZXJzOiBmdW5jdGlvbiAoZmVhdHVyZXMpIHtcbiAgICBmb3IgKHZhciBpID0gZmVhdHVyZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBnZW9qc29uID0gZmVhdHVyZXNbaV07XG5cbiAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tnZW9qc29uLmlkXTtcbiAgICAgIHZhciBuZXdMYXllcjtcblxuICAgICAgaWYgKHRoaXMuX3Zpc2libGVab29tKCkgJiYgbGF5ZXIgJiYgIXRoaXMuX21hcC5oYXNMYXllcihsYXllcikpIHtcbiAgICAgICAgdGhpcy5fbWFwLmFkZExheWVyKGxheWVyKTtcbiAgICAgICAgdGhpcy5maXJlKCdhZGRmZWF0dXJlJywge1xuICAgICAgICAgIGZlYXR1cmU6IGxheWVyLmZlYXR1cmVcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSBnZW9tZXRyeSBpZiBuZWNlc3NhcnlcbiAgICAgIGlmIChsYXllciAmJiB0aGlzLm9wdGlvbnMuc2ltcGxpZnlGYWN0b3IgPiAwICYmIChsYXllci5zZXRMYXRMbmdzIHx8IGxheWVyLnNldExhdExuZykpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlTGF5ZXIobGF5ZXIsIGdlb2pzb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWxheWVyKSB7XG4gICAgICAgIG5ld0xheWVyID0gdGhpcy5jcmVhdGVOZXdMYXllcihnZW9qc29uKTtcbiAgICAgICAgbmV3TGF5ZXIuZmVhdHVyZSA9IGdlb2pzb247XG5cbiAgICAgICAgLy8gYnViYmxlIGV2ZW50cyBmcm9tIGluZGl2aWR1YWwgbGF5ZXJzIHRvIHRoZSBmZWF0dXJlIGxheWVyXG4gICAgICAgIG5ld0xheWVyLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMub25FYWNoRmVhdHVyZSkge1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5vbkVhY2hGZWF0dXJlKG5ld0xheWVyLmZlYXR1cmUsIG5ld0xheWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhY2hlIHRoZSBsYXllclxuICAgICAgICB0aGlzLl9sYXllcnNbbmV3TGF5ZXIuZmVhdHVyZS5pZF0gPSBuZXdMYXllcjtcblxuICAgICAgICAvLyBzdHlsZSB0aGUgbGF5ZXJcbiAgICAgICAgdGhpcy5zZXRGZWF0dXJlU3R5bGUobmV3TGF5ZXIuZmVhdHVyZS5pZCwgdGhpcy5vcHRpb25zLnN0eWxlKTtcblxuICAgICAgICB0aGlzLmZpcmUoJ2NyZWF0ZWZlYXR1cmUnLCB7XG4gICAgICAgICAgZmVhdHVyZTogbmV3TGF5ZXIuZmVhdHVyZVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICAvLyBhZGQgdGhlIGxheWVyIGlmIHRoZSBjdXJyZW50IHpvb20gbGV2ZWwgaXMgaW5zaWRlIHRoZSByYW5nZSBkZWZpbmVkIGZvciB0aGUgbGF5ZXIsIGl0IGlzIHdpdGhpbiB0aGUgY3VycmVudCB0aW1lIGJvdW5kcyBvciBvdXIgbGF5ZXIgaXMgbm90IHRpbWUgZW5hYmxlZFxuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZVpvb20oKSAmJiAoIXRoaXMub3B0aW9ucy50aW1lRmllbGQgfHwgKHRoaXMub3B0aW9ucy50aW1lRmllbGQgJiYgdGhpcy5fZmVhdHVyZVdpdGhpblRpbWVSYW5nZShnZW9qc29uKSkpKSB7XG4gICAgICAgICAgdGhpcy5maXJlKCdhZGRmZWF0dXJlJywge1xuICAgICAgICAgICAgZmVhdHVyZTogbmV3TGF5ZXIuZmVhdHVyZVxuICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgIHRoaXMuX21hcC5hZGRMYXllcihuZXdMYXllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgYWRkTGF5ZXJzOiBmdW5jdGlvbiAoaWRzKSB7XG4gICAgZm9yICh2YXIgaSA9IGlkcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkc1tpXV07XG4gICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgdGhpcy5maXJlKCdhZGRmZWF0dXJlJywge1xuICAgICAgICAgIGZlYXR1cmU6IGxheWVyLmZlYXR1cmVcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX21hcC5hZGRMYXllcihsYXllcik7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbW92ZUxheWVyczogZnVuY3Rpb24gKGlkcywgcGVybWFuZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IGlkcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGlkID0gaWRzW2ldO1xuICAgICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgIGlmIChsYXllcikge1xuICAgICAgICB0aGlzLmZpcmUoJ3JlbW92ZWZlYXR1cmUnLCB7XG4gICAgICAgICAgZmVhdHVyZTogbGF5ZXIuZmVhdHVyZSxcbiAgICAgICAgICBwZXJtYW5lbnQ6IHBlcm1hbmVudFxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgdGhpcy5fbWFwLnJlbW92ZUxheWVyKGxheWVyKTtcbiAgICAgIH1cbiAgICAgIGlmIChsYXllciAmJiBwZXJtYW5lbnQpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2xheWVyc1tpZF07XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGNlbGxFbnRlcjogZnVuY3Rpb24gKGJvdW5kcywgY29vcmRzKSB7XG4gICAgaWYgKCF0aGlzLl96b29taW5nICYmIHRoaXMuX21hcCkge1xuICAgICAgTC5VdGlsLnJlcXVlc3RBbmltRnJhbWUoTC5VdGlsLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2FjaGVLZXkgPSB0aGlzLl9jYWNoZUtleShjb29yZHMpO1xuICAgICAgICB2YXIgY2VsbEtleSA9IHRoaXMuX2NlbGxDb29yZHNUb0tleShjb29yZHMpO1xuICAgICAgICB2YXIgbGF5ZXJzID0gdGhpcy5fY2FjaGVbY2FjaGVLZXldO1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlQ2VsbHNbY2VsbEtleV0gJiYgbGF5ZXJzKSB7XG4gICAgICAgICAgdGhpcy5hZGRMYXllcnMobGF5ZXJzKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcykpO1xuICAgIH1cbiAgfSxcblxuICBjZWxsTGVhdmU6IGZ1bmN0aW9uIChib3VuZHMsIGNvb3Jkcykge1xuICAgIGlmICghdGhpcy5fem9vbWluZykge1xuICAgICAgTC5VdGlsLnJlcXVlc3RBbmltRnJhbWUoTC5VdGlsLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gdGhpcy5fY2FjaGVLZXkoY29vcmRzKTtcbiAgICAgICAgICB2YXIgY2VsbEtleSA9IHRoaXMuX2NlbGxDb29yZHNUb0tleShjb29yZHMpO1xuICAgICAgICAgIHZhciBsYXllcnMgPSB0aGlzLl9jYWNoZVtjYWNoZUtleV07XG4gICAgICAgICAgdmFyIG1hcEJvdW5kcyA9IHRoaXMuX21hcC5nZXRCb3VuZHMoKTtcbiAgICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZUNlbGxzW2NlbGxLZXldICYmIGxheWVycykge1xuICAgICAgICAgICAgdmFyIHJlbW92YWJsZSA9IHRydWU7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGF5ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tsYXllcnNbaV1dO1xuICAgICAgICAgICAgICBpZiAobGF5ZXIgJiYgbGF5ZXIuZ2V0Qm91bmRzICYmIG1hcEJvdW5kcy5pbnRlcnNlY3RzKGxheWVyLmdldEJvdW5kcygpKSkge1xuICAgICAgICAgICAgICAgIHJlbW92YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZW1vdmFibGUpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMYXllcnMobGF5ZXJzLCAhdGhpcy5vcHRpb25zLmNhY2hlTGF5ZXJzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuY2FjaGVMYXllcnMgJiYgcmVtb3ZhYmxlKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWNoZVtjYWNoZUtleV07XG4gICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jZWxsc1tjZWxsS2V5XTtcbiAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2FjdGl2ZUNlbGxzW2NlbGxLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgdGhpcykpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogU3R5bGluZyBNZXRob2RzXG4gICAqL1xuXG4gIHJlc2V0U3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9wdGlvbnMuc3R5bGUgPSB0aGlzLl9vcmlnaW5hbFN0eWxlO1xuICAgIHRoaXMuZWFjaEZlYXR1cmUoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICB0aGlzLnJlc2V0RmVhdHVyZVN0eWxlKGxheWVyLmZlYXR1cmUuaWQpO1xuICAgIH0sIHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHNldFN0eWxlOiBmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICB0aGlzLm9wdGlvbnMuc3R5bGUgPSBzdHlsZTtcbiAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgdGhpcy5zZXRGZWF0dXJlU3R5bGUobGF5ZXIuZmVhdHVyZS5pZCwgc3R5bGUpO1xuICAgIH0sIHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJlc2V0RmVhdHVyZVN0eWxlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgIHZhciBzdHlsZSA9IHRoaXMuX29yaWdpbmFsU3R5bGUgfHwgTC5QYXRoLnByb3RvdHlwZS5vcHRpb25zO1xuICAgIGlmIChsYXllcikge1xuICAgICAgTC5VdGlsLmV4dGVuZChsYXllci5vcHRpb25zLCBsYXllci5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICB0aGlzLnNldEZlYXR1cmVTdHlsZShpZCwgc3R5bGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBzZXRGZWF0dXJlU3R5bGU6IGZ1bmN0aW9uIChpZCwgc3R5bGUpIHtcbiAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgIGlmICh0eXBlb2Ygc3R5bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHN0eWxlID0gc3R5bGUobGF5ZXIuZmVhdHVyZSk7XG4gICAgfVxuICAgIGlmIChsYXllci5zZXRTdHlsZSkge1xuICAgICAgbGF5ZXIuc2V0U3R5bGUoc3R5bGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogVXRpbGl0eSBNZXRob2RzXG4gICAqL1xuXG4gIGVhY2hGZWF0dXJlOiBmdW5jdGlvbiAoZm4sIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX2xheWVycykge1xuICAgICAgZm4uY2FsbChjb250ZXh0LCB0aGlzLl9sYXllcnNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRGZWF0dXJlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgfSxcblxuICBicmluZ1RvQmFjazogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZWFjaEZlYXR1cmUoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICBpZiAobGF5ZXIuYnJpbmdUb0JhY2spIHtcbiAgICAgICAgbGF5ZXIuYnJpbmdUb0JhY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBicmluZ1RvRnJvbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgaWYgKGxheWVyLmJyaW5nVG9Gcm9udCkge1xuICAgICAgICBsYXllci5icmluZ1RvRnJvbnQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICByZWRyYXc6IGZ1bmN0aW9uIChpZCkge1xuICAgIGlmIChpZCkge1xuICAgICAgdGhpcy5fcmVkcmF3KGlkKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3JlZHJhdzogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICB2YXIgZ2VvanNvbiA9IGxheWVyLmZlYXR1cmU7XG5cbiAgICAvLyBpZiB0aGlzIGxvb2tzIGxpa2UgYSBtYXJrZXJcbiAgICBpZiAobGF5ZXIgJiYgbGF5ZXIuc2V0SWNvbiAmJiB0aGlzLm9wdGlvbnMucG9pbnRUb0xheWVyKSB7XG4gICAgICAvLyB1cGRhdGUgY3VzdG9tIHN5bWJvbG9neSwgaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnBvaW50VG9MYXllcikge1xuICAgICAgICB2YXIgZ2V0SWNvbiA9IHRoaXMub3B0aW9ucy5wb2ludFRvTGF5ZXIoZ2VvanNvbiwgTC5sYXRMbmcoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSwgZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1swXSkpO1xuICAgICAgICB2YXIgdXBkYXRlZEljb24gPSBnZXRJY29uLm9wdGlvbnMuaWNvbjtcbiAgICAgICAgbGF5ZXIuc2V0SWNvbih1cGRhdGVkSWNvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbG9va3MgbGlrZSBhIHZlY3RvciBtYXJrZXIgKGNpcmNsZU1hcmtlcilcbiAgICBpZiAobGF5ZXIgJiYgbGF5ZXIuc2V0U3R5bGUgJiYgdGhpcy5vcHRpb25zLnBvaW50VG9MYXllcikge1xuICAgICAgdmFyIGdldFN0eWxlID0gdGhpcy5vcHRpb25zLnBvaW50VG9MYXllcihnZW9qc29uLCBMLmxhdExuZyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdLCBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdKSk7XG4gICAgICB2YXIgdXBkYXRlZFN0eWxlID0gZ2V0U3R5bGUub3B0aW9ucztcbiAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKGdlb2pzb24uaWQsIHVwZGF0ZWRTdHlsZSk7XG4gICAgfVxuXG4gICAgLy8gbG9va3MgbGlrZSBhIHBhdGggKHBvbHlnb24vcG9seWxpbmUpXG4gICAgaWYgKGxheWVyICYmIGxheWVyLnNldFN0eWxlICYmIHRoaXMub3B0aW9ucy5zdHlsZSkge1xuICAgICAgdGhpcy5yZXNldFN0eWxlKGdlb2pzb24uaWQpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlTGF5ZXIgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBGZWF0dXJlTGF5ZXIob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZlYXR1cmVMYXllcjtcbiJdLCJuYW1lcyI6WyJzaGFsbG93Q2xvbmUiLCJhcmNnaXNUb0dlb0pTT04iLCJnZW9qc29uVG9BcmNHSVMiLCJnMmEiLCJhMmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Q0NBTyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBSSxpQkFBaUIsSUFBSSxJQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEcsQ0FBTyxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxhQUFhLEtBQUssRUFBRSxDQUFDOztBQUUvRSxDQUFPLElBQUksT0FBTyxHQUFHO0FBQ3JCLENBQUEsRUFBRSxJQUFJLEVBQUUsSUFBSTtBQUNaLENBQUEsRUFBRSxhQUFhLEVBQUUsYUFBYTtBQUM5QixDQUFBLENBQUMsQ0FBQzs7Q0NOSyxJQUFJLE9BQU8sR0FBRztBQUNyQixDQUFBLEVBQUUsc0JBQXNCLEVBQUUsRUFBRTtBQUM1QixDQUFBLENBQUMsQ0FBQzs7Q0NFRixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7O0FBRWxCLENBQUEsU0FBUyxTQUFTLEVBQUUsTUFBTSxFQUFFO0FBQzVCLENBQUEsRUFBRSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRWhCLENBQUEsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDOztBQUVoQyxDQUFBLEVBQUUsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7QUFDMUIsQ0FBQSxJQUFJLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNwQyxDQUFBLE1BQU0sSUFBSSxLQUFLLEdBQUcsTUFB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QUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoQyxDQUFBLElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDNUIsQ0FBQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuRCxDQUFBLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNkLENBQUEsR0FBRztBQUNILENBQUEsRUFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLENBQUEsQ0FBQzs7QUFFRCxDQUFBO0FBQ0EsQ0FBQSxTQUFTLHNCQUFzQixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUNqRCxDQUFBLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEYsQ0FBQSxFQUFFLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xGLENBQUEsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFakYsQ0FBQSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTtBQUNoQixDQUFBLElBQUksSUFBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUN0QixDQUFBLElBQUksSUFBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQzs7QUFFdEIsQ0FBQSxJQUFJLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtBQUNsRCxDQUFBLE1BQU0sT0FBTyxJQUFJLENBQUM7QUFDbEIsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUEsQ0FBQzs7QUFFRCxDQUFBO0FBQ0EsQ0FBQSxTQUFTLG9CQUFvQixFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDckMsQ0FBQSxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6QyxDQUFBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNDLENBQUEsTUFBTSxJQUFJLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDbEUsQ0FBQSxRQUFRLE9BQU8sSUFBSSxDQUFDO0FBQ3BCLENBQUEsT0FBTztBQUNQLENBQUEsS0FBSztBQUNMLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFBLENBQUM7O0FBRUQsQ0FBQTtBQUNBLENBQUEsU0FBUyx1QkFBdUIsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO0FBQ3RELENBQUEsRUFBRSxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDdkIsQ0FBQSxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDdEUsQ0FBQSxJQUFJLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RSxDQUFBLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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QyxHQUFHLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQzs7QUFFcEgsQ0FBQSxNQUFNLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sS0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO0FBQy9FLENBQUEsUUFBUSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hFLENBQUEsT0FBTyxNQUFNO0FBQ2IsQ0FBQSxRQUFRLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RFLENBQUEsT0FBTztBQUNQLENBQUEsS0FBSztBQUNMLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsc0JBQXNCLEVBQUUsVUFBVSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO0FBQzdFLENBQUEsSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLFFBQVEsRUFBRTtBQUNsRCxDQUFBLE1BQU0sSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO0FBQy9ELENBQUEsUUFBUSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzs7QUFFcEMsQ0FBQSxRQUFRLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7O0FBRTNFLENBQUE7QUFDQSxDQUFBLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtB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LENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzVDLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO0FBQ3BFLENBQUEsTUFBTSxJQUFJLFNBQVMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEUsQ0FBQSxNQUFNLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwRSxDQUFBLE1BQU0sT0FBTyxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xHLENBQUEsS0FBSztBQUNMLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsWUFBWSxFQUFFLFlBQVk7QUFDNUIsQ0FBQTtBQUNBLENBQUEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtBQUNwQixDQUFBLE1BQU0sT0FBTyxLQUFLLENBQUM7QUFDbkIsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDbkMsQ0FBQSxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtBQUNwRSxDQUFBLE1BQU0sT0FBTyxLQUFLLENBQUM7QUFDbkIsQ0FBQSxLQUFLLE1BQU0sRUFBRSxP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LEVBQUU7QUFDbEIsQ0FBQSxRQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUMsQ0FBQSxRQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLENBQUEsT0FBTzs7QUFFUCxDQUFBLE1BQU0sSUFBSSxRQUFRLEVBQUU7QUFDcEIsQ0FBQSxRQUFRLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNoRCxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNiLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDbEQsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxVQUFVLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDOUQsQ0FBQSxNQUFNLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTtBQUN2QyxDQUFBLFFBQVEsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNyRCxDQUFBLE9BQU87QUFDUCxDQUFBLE1BQU0sSUFBSSxRQUFRLEVBQUU7QUFDcEIsQ0FBQSxRQUFRLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNoRCxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNiLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsY0FBYyxFQUFFLFVBQVUsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDcEQsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFj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