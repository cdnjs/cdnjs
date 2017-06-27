/* esri-leaflet - v2.0.6 - Wed Nov 16 2016 17:02:45 GMT-0800 (PST)
 * Copyright (c) 2016 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}),global.L));
}(this, function (exports,L) { 'use strict';

	L = 'default' in L ? L['default'] : L;

	var version = "2.0.6";

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

	  // ie10/11 require the request be opened before a timeout is applied
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvU3VwcG9ydC5qcyIsIi4uL3NyYy9PcHRpb25zLmpzIiwiLi4vc3JjL1JlcXVlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvYXJjZ2lzLXRvLWdlb2pzb24tdXRpbHMvaW5kZXguanMiLCIuLi9zcmMvVXRpbC5qcyIsIi4uL3NyYy9UYXNrcy9UYXNrLmpzIiwiLi4vc3JjL1Rhc2tzL1F1ZXJ5LmpzIiwiLi4vc3JjL1Rhc2tzL0ZpbmQuanMiLCIuLi9zcmMvVGFza3MvSWRlbnRpZnkuanMiLCIuLi9zcmMvVGFza3MvSWRlbnRpZnlGZWF0dXJlcy5qcyIsIi4uL3NyYy9UYXNrcy9JZGVudGlmeUltYWdlLmpzIiwiLi4vc3JjL1NlcnZpY2VzL1NlcnZpY2UuanMiLCIuLi9zcmMvU2VydmljZXMvTWFwU2VydmljZS5qcyIsIi4uL3NyYy9TZXJ2aWNlcy9JbWFnZVNlcnZpY2UuanMiLCIuLi9zcmMvU2VydmljZXMvRmVhdHVyZUxheWVyU2VydmljZS5qcyIsIi4uL3NyYy9MYXllcnMvQmFzZW1hcExheWVyLmpzIiwiLi4vc3JjL0xheWVycy9UaWxlZE1hcExheWVyLmpzIiwiLi4vc3JjL0xheWVycy9SYXN0ZXJMYXllci5qcyIsIi4uL3NyYy9MYXllcnMvSW1hZ2VNYXBMYXllci5qcyIsIi4uL3NyYy9MYXllcnMvRHluYW1pY01hcExheWVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtdmlydHVhbC1ncmlkL3NyYy92aXJ0dWFsLWdyaWQuanMiLCIuLi9ub2RlX21vZHVsZXMvdGlueS1iaW5hcnktc2VhcmNoL2luZGV4LmpzIiwiLi4vc3JjL0xheWVycy9GZWF0dXJlTGF5ZXIvRmVhdHVyZU1hbmFnZXIuanMiLCIuLi9zcmMvTGF5ZXJzL0ZlYXR1cmVMYXllci9GZWF0dXJlTGF5ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXRcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkxlYWZsZXQgcGx1Z2lucyBmb3IgY29uc3VtaW5nIEFyY0dJUyBPbmxpbmUgYW5kIEFyY0dJUyBTZXJ2ZXIgc2VydmljZXMuXCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMC42XCIsXG4gIFwiYXV0aG9yXCI6IFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gIFwiYnJvd3NlclwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWRlYnVnLmpzXCIsXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vZXNyaS9lc3JpLWxlYWZsZXQvaXNzdWVzXCJcbiAgfSxcbiAgXCJjb250cmlidXRvcnNcIjogW1xuICAgIFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gICAgXCJKb2huIEdyYXZvaXMgPGpncmF2b2lzQGVzcmkuY29tPiAoaHR0cDovL2pvaG5ncmF2b2lzLmNvbSlcIlxuICBdLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJhcmNnaXMtdG8tZ2VvanNvbi11dGlsc1wiOiBcIl4xLjAuMVwiLFxuICAgIFwibGVhZmxldFwiOiBcIl4xLjAuMFwiLFxuICAgIFwibGVhZmxldC12aXJ0dWFsLWdyaWRcIjogXCJeMS4wLjNcIixcbiAgICBcInRpbnktYmluYXJ5LXNlYXJjaFwiOiBcIl4xLjAuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCIyLjMuMFwiLFxuICAgIFwiZ2gtcmVsZWFzZVwiOiBcIl4yLjAuMFwiLFxuICAgIFwiaGlnaGxpZ2h0LmpzXCI6IFwiXjguMC4wXCIsXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4wLjguNVwiLFxuICAgIFwiaXNwYXJ0YVwiOiBcIl4zLjAuM1wiLFxuICAgIFwiaXN0YW5idWxcIjogXCJeMC40LjJcIixcbiAgICBcImthcm1hXCI6IFwiXjAuMTIuMTZcIixcbiAgICBcImthcm1hLWNoYWktc2lub25cIjogXCJeMC4xLjNcIixcbiAgICBcImthcm1hLWNvdmVyYWdlXCI6IFwiXjAuNS4zXCIsXG4gICAgXCJrYXJtYS1tb2NoYVwiOiBcIl4wLjEuMFwiLFxuICAgIFwia2FybWEtbW9jaGEtcmVwb3J0ZXJcIjogXCJeMC4yLjVcIixcbiAgICBcImthcm1hLXBoYW50b21qcy1sYXVuY2hlclwiOiBcIl4wLjIuMFwiLFxuICAgIFwia2FybWEtc291cmNlbWFwLWxvYWRlclwiOiBcIl4wLjMuNVwiLFxuICAgIFwibG9hZC1ncnVudC10YXNrc1wiOiBcIl4wLjQuMFwiLFxuICAgIFwibWtkaXJwXCI6IFwiXjAuNS4xXCIsXG4gICAgXCJtb2NoYVwiOiBcIl4yLjMuNFwiLFxuICAgIFwicGFyYWxsZWxzaGVsbFwiOiBcIl4yLjAuMFwiLFxuICAgIFwicGhhbnRvbWpzXCI6IFwiXjEuOS4xN1wiLFxuICAgIFwicm9sbHVwXCI6IFwiXjAuMjUuNFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1qc29uXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLW5vZGUtcmVzb2x2ZVwiOiBcIl4xLjQuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi11Z2xpZnlcIjogXCJeMC4zLjFcIixcbiAgICBcInNlbWlzdGFuZGFyZFwiOiBcIl44LjAuMFwiLFxuICAgIFwic2lub25cIjogXCJeMS4xMS4xXCIsXG4gICAgXCJzaW5vbi1jaGFpXCI6IFwiMi43LjBcIixcbiAgICBcInNuYXp6eVwiOiBcIl4yLjAuMVwiLFxuICAgIFwidWdsaWZ5LWpzXCI6IFwiXjIuNi4xXCIsXG4gICAgXCJ3YXRjaFwiOiBcIl4wLjE3LjFcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cDovL2VzcmkuZ2l0aHViLmlvL2VzcmktbGVhZmxldFwiLFxuICBcImpzbmV4dDptYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0LmpzXCIsXG4gIFwianNwbVwiOiB7XG4gICAgXCJyZWdpc3RyeVwiOiBcIm5wbVwiLFxuICAgIFwiZm9ybWF0XCI6IFwiZXM2XCIsXG4gICAgXCJtYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0LmpzXCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJhcmNnaXNcIixcbiAgICBcImVzcmlcIixcbiAgICBcImVzcmkgbGVhZmxldFwiLFxuICAgIFwiZ2lzXCIsXG4gICAgXCJsZWFmbGV0IHBsdWdpblwiLFxuICAgIFwibWFwcGluZ1wiXG4gIF0sXG4gIFwibGljZW5zZVwiOiBcIkFwYWNoZS0yLjBcIixcbiAgXCJtYWluXCI6IFwiZGlzdC9lc3JpLWxlYWZsZXQtZGVidWcuanNcIixcbiAgXCJyZWFkbWVGaWxlbmFtZVwiOiBcIlJFQURNRS5tZFwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0QGdpdGh1Yi5jb206RXNyaS9lc3JpLWxlYWZsZXQuZ2l0XCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwicm9sbHVwIC1jIHByb2ZpbGVzL2RlYnVnLmpzICYgcm9sbHVwIC1jIHByb2ZpbGVzL3Byb2R1Y3Rpb24uanNcIixcbiAgICBcImxpbnRcIjogXCJzZW1pc3RhbmRhcmQgfCBzbmF6enlcIixcbiAgICBcInByZWJ1aWxkXCI6IFwibWtkaXJwIGRpc3RcIixcbiAgICBcInByZXB1Ymxpc2hcIjogXCJucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV0ZXN0XCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIi4vc2NyaXB0cy9yZWxlYXNlLnNoXCIsXG4gICAgXCJzdGFydC13YXRjaFwiOiBcIndhdGNoIFxcXCJucG0gcnVuIGJ1aWxkXFxcIiBzcmNcIixcbiAgICBcInN0YXJ0XCI6IFwicGFyYWxsZWxzaGVsbCBcXFwibnBtIHJ1biBzdGFydC13YXRjaFxcXCIgXFxcImh0dHAtc2VydmVyIC1wIDUwMDAgLWMtMSAtb1xcXCJcIixcbiAgICBcInRlc3RcIjogXCJucG0gcnVuIGxpbnQgJiYga2FybWEgc3RhcnRcIlxuICB9LFxuICBcInNlbWlzdGFuZGFyZFwiOiB7XG4gICAgXCJnbG9iYWxzXCI6IFsgXCJleHBlY3RcIiwgXCJMXCIsIFwiWE1MSHR0cFJlcXVlc3RcIiwgXCJzaW5vblwiLCBcInhoclwiLCBcInByb2o0XCIgXVxuICB9XG59XG4iLCJleHBvcnQgdmFyIGNvcnMgPSAoKHdpbmRvdy5YTUxIdHRwUmVxdWVzdCAmJiAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCkpKTtcbmV4cG9ydCB2YXIgcG9pbnRlckV2ZW50cyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID09PSAnJztcblxuZXhwb3J0IHZhciBTdXBwb3J0ID0ge1xuICBjb3JzOiBjb3JzLFxuICBwb2ludGVyRXZlbnRzOiBwb2ludGVyRXZlbnRzXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0O1xuIiwiZXhwb3J0IHZhciBvcHRpb25zID0ge1xuICBhdHRyaWJ1dGlvbldpZHRoT2Zmc2V0OiA1NVxufTtcblxuZXhwb3J0IGRlZmF1bHQgb3B0aW9ucztcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi9TdXBwb3J0JztcbmltcG9ydCB7IHdhcm4gfSBmcm9tICcuL1V0aWwnO1xuXG52YXIgY2FsbGJhY2tzID0gMDtcblxuZnVuY3Rpb24gc2VyaWFsaXplIChwYXJhbXMpIHtcbiAgdmFyIGRhdGEgPSAnJztcblxuICBwYXJhbXMuZiA9IHBhcmFtcy5mIHx8ICdqc29uJztcblxuICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICB2YXIgcGFyYW0gPSBwYXJhbXNba2V5XTtcbiAgICAgIHZhciB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHBhcmFtKTtcbiAgICAgIHZhciB2YWx1ZTtcblxuICAgICAgaWYgKGRhdGEubGVuZ3RoKSB7XG4gICAgICAgIGRhdGEgKz0gJyYnO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICB2YWx1ZSA9IChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGFyYW1bMF0pID09PSAnW29iamVjdCBPYmplY3RdJykgPyBKU09OLnN0cmluZ2lmeShwYXJhbSkgOiBwYXJhbS5qb2luKCcsJyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkocGFyYW0pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICAgICAgdmFsdWUgPSBwYXJhbS52YWx1ZU9mKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHBhcmFtO1xuICAgICAgfVxuXG4gICAgICBkYXRhICs9IGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUmVxdWVzdCAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgdmFyIGh0dHBSZXF1ZXN0ID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpO1xuXG4gIGh0dHBSZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgIGh0dHBSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IEwuVXRpbC5mYWxzZUZuO1xuXG4gICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCB7XG4gICAgICBlcnJvcjoge1xuICAgICAgICBjb2RlOiA1MDAsXG4gICAgICAgIG1lc3NhZ2U6ICdYTUxIdHRwUmVxdWVzdCBlcnJvcidcbiAgICAgIH1cbiAgICB9LCBudWxsKTtcbiAgfTtcblxuICBodHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3BvbnNlO1xuICAgIHZhciBlcnJvcjtcblxuICAgIGlmIChodHRwUmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UoaHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVzcG9uc2UgPSBudWxsO1xuICAgICAgICBlcnJvciA9IHtcbiAgICAgICAgICBjb2RlOiA1MDAsXG4gICAgICAgICAgbWVzc2FnZTogJ0NvdWxkIG5vdCBwYXJzZSByZXNwb25zZSBhcyBKU09OLiBUaGlzIGNvdWxkIGFsc28gYmUgY2F1c2VkIGJ5IGEgQ09SUyBvciBYTUxIdHRwUmVxdWVzdCBlcnJvci4nXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmICghZXJyb3IgJiYgcmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgcmVzcG9uc2UgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBodHRwUmVxdWVzdC5vbmVycm9yID0gTC5VdGlsLmZhbHNlRm47XG5cbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlKTtcbiAgICB9XG4gIH07XG5cbiAgaHR0cFJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub25lcnJvcigpO1xuICB9O1xuXG4gIHJldHVybiBodHRwUmVxdWVzdDtcbn1cblxuZnVuY3Rpb24geG1sSHR0cFBvc3QgKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICB2YXIgaHR0cFJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0KGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgaHR0cFJlcXVlc3Qub3BlbignUE9TVCcsIHVybCk7XG5cbiAgaWYgKHR5cGVvZiBjb250ZXh0ICE9PSAndW5kZWZpbmVkJyAmJiBjb250ZXh0ICE9PSBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0Lm9wdGlvbnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBodHRwUmVxdWVzdC50aW1lb3V0ID0gY29udGV4dC5vcHRpb25zLnRpbWVvdXQ7XG4gICAgfVxuICB9XG4gIGh0dHBSZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcbiAgaHR0cFJlcXVlc3Quc2VuZChzZXJpYWxpemUocGFyYW1zKSk7XG5cbiAgcmV0dXJuIGh0dHBSZXF1ZXN0O1xufVxuXG5mdW5jdGlvbiB4bWxIdHRwR2V0ICh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgdmFyIGh0dHBSZXF1ZXN0ID0gY3JlYXRlUmVxdWVzdChjYWxsYmFjaywgY29udGV4dCk7XG4gIGh0dHBSZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCArICc/JyArIHNlcmlhbGl6ZShwYXJhbXMpLCB0cnVlKTtcblxuICBpZiAodHlwZW9mIGNvbnRleHQgIT09ICd1bmRlZmluZWQnICYmIGNvbnRleHQgIT09IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIGNvbnRleHQub3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGh0dHBSZXF1ZXN0LnRpbWVvdXQgPSBjb250ZXh0Lm9wdGlvbnMudGltZW91dDtcbiAgICB9XG4gIH1cbiAgaHR0cFJlcXVlc3Quc2VuZChudWxsKTtcblxuICByZXR1cm4gaHR0cFJlcXVlc3Q7XG59XG5cbi8vIEFKQVggaGFuZGxlcnMgZm9yIENPUlMgKG1vZGVybiBicm93c2Vycykgb3IgSlNPTlAgKG9sZGVyIGJyb3dzZXJzKVxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3QgKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICB2YXIgcGFyYW1TdHJpbmcgPSBzZXJpYWxpemUocGFyYW1zKTtcbiAgdmFyIGh0dHBSZXF1ZXN0ID0gY3JlYXRlUmVxdWVzdChjYWxsYmFjaywgY29udGV4dCk7XG4gIHZhciByZXF1ZXN0TGVuZ3RoID0gKHVybCArICc/JyArIHBhcmFtU3RyaW5nKS5sZW5ndGg7XG5cbiAgLy8gaWUxMC8xMSByZXF1aXJlIHRoZSByZXF1ZXN0IGJlIG9wZW5lZCBiZWZvcmUgYSB0aW1lb3V0IGlzIGFwcGxpZWRcbiAgaWYgKHJlcXVlc3RMZW5ndGggPD0gMjAwMCAmJiBTdXBwb3J0LmNvcnMpIHtcbiAgICBodHRwUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwgKyAnPycgKyBwYXJhbVN0cmluZyk7XG4gIH0gZWxzZSBpZiAocmVxdWVzdExlbmd0aCA+IDIwMDAgJiYgU3VwcG9ydC5jb3JzKSB7XG4gICAgaHR0cFJlcXVlc3Qub3BlbignUE9TVCcsIHVybCk7XG4gICAgaHR0cFJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBjb250ZXh0ICE9PSAndW5kZWZpbmVkJyAmJiBjb250ZXh0ICE9PSBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0Lm9wdGlvbnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBodHRwUmVxdWVzdC50aW1lb3V0ID0gY29udGV4dC5vcHRpb25zLnRpbWVvdXQ7XG4gICAgfVxuICB9XG5cbiAgLy8gcmVxdWVzdCBpcyBsZXNzIHRoYW4gMjAwMCBjaGFyYWN0ZXJzIGFuZCB0aGUgYnJvd3NlciBzdXBwb3J0cyBDT1JTLCBtYWtlIEdFVCByZXF1ZXN0IHdpdGggWE1MSHR0cFJlcXVlc3RcbiAgaWYgKHJlcXVlc3RMZW5ndGggPD0gMjAwMCAmJiBTdXBwb3J0LmNvcnMpIHtcbiAgICBodHRwUmVxdWVzdC5zZW5kKG51bGwpO1xuXG4gIC8vIHJlcXVlc3QgaXMgbW9yZSB0aGFuIDIwMDAgY2hhcmFjdGVycyBhbmQgdGhlIGJyb3dzZXIgc3VwcG9ydHMgQ09SUywgbWFrZSBQT1NUIHJlcXVlc3Qgd2l0aCBYTUxIdHRwUmVxdWVzdFxuICB9IGVsc2UgaWYgKHJlcXVlc3RMZW5ndGggPiAyMDAwICYmIFN1cHBvcnQuY29ycykge1xuICAgIGh0dHBSZXF1ZXN0LnNlbmQocGFyYW1TdHJpbmcpO1xuXG4gIC8vIHJlcXVlc3QgaXMgbGVzcyAgdGhhbiAyMDAwIGNoYXJhY3RlcnMgYW5kIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgQ09SUywgbWFrZSBhIEpTT05QIHJlcXVlc3RcbiAgfSBlbHNlIGlmIChyZXF1ZXN0TGVuZ3RoIDw9IDIwMDAgJiYgIVN1cHBvcnQuY29ycykge1xuICAgIHJldHVybiBqc29ucCh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuXG4gIC8vIHJlcXVlc3QgaXMgbG9uZ2VyIHRoZW4gMjAwMCBjaGFyYWN0ZXJzIGFuZCB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IENPUlMsIGxvZyBhIHdhcm5pbmdcbiAgfSBlbHNlIHtcbiAgICB3YXJuKCdhIHJlcXVlc3QgdG8gJyArIHVybCArICcgd2FzIGxvbmdlciB0aGVuIDIwMDAgY2hhcmFjdGVycyBhbmQgdGhpcyBicm93c2VyIGNhbm5vdCBtYWtlIGEgY3Jvc3MtZG9tYWluIHBvc3QgcmVxdWVzdC4gUGxlYXNlIHVzZSBhIHByb3h5IGh0dHA6Ly9lc3JpLmdpdGh1Yi5pby9lc3JpLWxlYWZsZXQvYXBpLXJlZmVyZW5jZS9yZXF1ZXN0Lmh0bWwnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXR1cm4gaHR0cFJlcXVlc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqc29ucCAodXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIHdpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3MgPSB3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzIHx8IHt9O1xuICB2YXIgY2FsbGJhY2tJZCA9ICdjJyArIGNhbGxiYWNrcztcbiAgcGFyYW1zLmNhbGxiYWNrID0gJ3dpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3MuJyArIGNhbGxiYWNrSWQ7XG5cbiAgd2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrc1tjYWxsYmFja0lkXSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIGlmICh3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzW2NhbGxiYWNrSWRdICE9PSB0cnVlKSB7XG4gICAgICB2YXIgZXJyb3I7XG4gICAgICB2YXIgcmVzcG9uc2VUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJlc3BvbnNlKTtcblxuICAgICAgaWYgKCEocmVzcG9uc2VUeXBlID09PSAnW29iamVjdCBPYmplY3RdJyB8fCByZXNwb25zZVR5cGUgPT09ICdbb2JqZWN0IEFycmF5XScpKSB7XG4gICAgICAgIGVycm9yID0ge1xuICAgICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgICBjb2RlOiA1MDAsXG4gICAgICAgICAgICBtZXNzYWdlOiAnRXhwZWN0ZWQgYXJyYXkgb3Igb2JqZWN0IGFzIEpTT05QIHJlc3BvbnNlJ1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVzcG9uc2UgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgIGVycm9yID0gcmVzcG9uc2U7XG4gICAgICAgIHJlc3BvbnNlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgICAgd2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrc1tjYWxsYmFja0lkXSA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIHZhciBzY3JpcHQgPSBMLkRvbVV0aWwuY3JlYXRlKCdzY3JpcHQnLCBudWxsLCBkb2N1bWVudC5ib2R5KTtcbiAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgc2NyaXB0LnNyYyA9IHVybCArICc/JyArIHNlcmlhbGl6ZShwYXJhbXMpO1xuICBzY3JpcHQuaWQgPSBjYWxsYmFja0lkO1xuXG4gIGNhbGxiYWNrcysrO1xuXG4gIHJldHVybiB7XG4gICAgaWQ6IGNhbGxiYWNrSWQsXG4gICAgdXJsOiBzY3JpcHQuc3JjLFxuICAgIGFib3J0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzLl9jYWxsYmFja1tjYWxsYmFja0lkXSh7XG4gICAgICAgIGNvZGU6IDAsXG4gICAgICAgIG1lc3NhZ2U6ICdSZXF1ZXN0IGFib3J0ZWQuJ1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgZ2V0ID0gKChTdXBwb3J0LmNvcnMpID8geG1sSHR0cEdldCA6IGpzb25wKTtcbmdldC5DT1JTID0geG1sSHR0cEdldDtcbmdldC5KU09OUCA9IGpzb25wO1xuXG4vLyBjaG9vc2UgdGhlIGNvcnJlY3QgQUpBWCBoYW5kbGVyIGRlcGVuZGluZyBvbiBDT1JTIHN1cHBvcnRcbmV4cG9ydCB7IGdldCB9O1xuXG4vLyBhbHdheXMgdXNlIFhNTEh0dHBSZXF1ZXN0IGZvciBwb3N0c1xuZXhwb3J0IHsgeG1sSHR0cFBvc3QgYXMgcG9zdCB9O1xuXG4vLyBleHBvcnQgdGhlIFJlcXVlc3Qgb2JqZWN0IHRvIGNhbGwgdGhlIGRpZmZlcmVudCBoYW5kbGVycyBmb3IgZGVidWdnaW5nXG5leHBvcnQgdmFyIFJlcXVlc3QgPSB7XG4gIHJlcXVlc3Q6IHJlcXVlc3QsXG4gIGdldDogZ2V0LFxuICBwb3N0OiB4bWxIdHRwUG9zdFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVxdWVzdDtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBFc3JpXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaXNjZW5zZS5cbiAqL1xuXG4vLyBjaGVja3MgaWYgMiB4LHkgcG9pbnRzIGFyZSBlcXVhbFxuZnVuY3Rpb24gcG9pbnRzRXF1YWwgKGEsIGIpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIGNoZWNrcyBpZiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnRzIG9mIGEgcmluZyBhcmUgZXF1YWwgYW5kIGNsb3NlcyB0aGUgcmluZ1xuZnVuY3Rpb24gY2xvc2VSaW5nIChjb29yZGluYXRlcykge1xuICBpZiAoIXBvaW50c0VxdWFsKGNvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1tjb29yZGluYXRlcy5sZW5ndGggLSAxXSkpIHtcbiAgICBjb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGVzWzBdKTtcbiAgfVxuICByZXR1cm4gY29vcmRpbmF0ZXM7XG59XG5cbi8vIGRldGVybWluZSBpZiBwb2x5Z29uIHJpbmcgY29vcmRpbmF0ZXMgYXJlIGNsb2Nrd2lzZS4gY2xvY2t3aXNlIHNpZ25pZmllcyBvdXRlciByaW5nLCBjb3VudGVyLWNsb2Nrd2lzZSBhbiBpbm5lciByaW5nXG4vLyBvciBob2xlLiB0aGlzIGxvZ2ljIHdhcyBmb3VuZCBhdCBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExNjU2NDcvaG93LXRvLWRldGVybWluZS1pZi1hLWxpc3Qtb2YtcG9seWdvbi1cbi8vIHBvaW50cy1hcmUtaW4tY2xvY2t3aXNlLW9yZGVyXG5mdW5jdGlvbiByaW5nSXNDbG9ja3dpc2UgKHJpbmdUb1Rlc3QpIHtcbiAgdmFyIHRvdGFsID0gMDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgckxlbmd0aCA9IHJpbmdUb1Rlc3QubGVuZ3RoO1xuICB2YXIgcHQxID0gcmluZ1RvVGVzdFtpXTtcbiAgdmFyIHB0MjtcbiAgZm9yIChpOyBpIDwgckxlbmd0aCAtIDE7IGkrKykge1xuICAgIHB0MiA9IHJpbmdUb1Rlc3RbaSArIDFdO1xuICAgIHRvdGFsICs9IChwdDJbMF0gLSBwdDFbMF0pICogKHB0MlsxXSArIHB0MVsxXSk7XG4gICAgcHQxID0gcHQyO1xuICB9XG4gIHJldHVybiAodG90YWwgPj0gMCk7XG59XG5cbi8vIHBvcnRlZCBmcm9tIHRlcnJhZm9ybWVyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL1RlcnJhZm9ybWVyL2Jsb2IvbWFzdGVyL3RlcnJhZm9ybWVyLmpzI0w1MDQtTDUxOVxuZnVuY3Rpb24gdmVydGV4SW50ZXJzZWN0c1ZlcnRleCAoYTEsIGEyLCBiMSwgYjIpIHtcbiAgdmFyIHVhVCA9IChiMlswXSAtIGIxWzBdKSAqIChhMVsxXSAtIGIxWzFdKSAtIChiMlsxXSAtIGIxWzFdKSAqIChhMVswXSAtIGIxWzBdKTtcbiAgdmFyIHViVCA9IChhMlswXSAtIGExWzBdKSAqIChhMVsxXSAtIGIxWzFdKSAtIChhMlsxXSAtIGExWzFdKSAqIChhMVswXSAtIGIxWzBdKTtcbiAgdmFyIHVCID0gKGIyWzFdIC0gYjFbMV0pICogKGEyWzBdIC0gYTFbMF0pIC0gKGIyWzBdIC0gYjFbMF0pICogKGEyWzFdIC0gYTFbMV0pO1xuXG4gIGlmICh1QiAhPT0gMCkge1xuICAgIHZhciB1YSA9IHVhVCAvIHVCO1xuICAgIHZhciB1YiA9IHViVCAvIHVCO1xuXG4gICAgaWYgKHVhID49IDAgJiYgdWEgPD0gMSAmJiB1YiA+PSAwICYmIHViIDw9IDEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gcG9ydGVkIGZyb20gdGVycmFmb3JtZXIuanMgaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvVGVycmFmb3JtZXIvYmxvYi9tYXN0ZXIvdGVycmFmb3JtZXIuanMjTDUyMS1MNTMxXG5mdW5jdGlvbiBhcnJheUludGVyc2VjdHNBcnJheSAoYSwgYikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBiLmxlbmd0aCAtIDE7IGorKykge1xuICAgICAgaWYgKHZlcnRleEludGVyc2VjdHNWZXJ0ZXgoYVtpXSwgYVtpICsgMV0sIGJbal0sIGJbaiArIDFdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIHBvcnRlZCBmcm9tIHRlcnJhZm9ybWVyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL1RlcnJhZm9ybWVyL2Jsb2IvbWFzdGVyL3RlcnJhZm9ybWVyLmpzI0w0NzAtTDQ4MFxuZnVuY3Rpb24gY29vcmRpbmF0ZXNDb250YWluUG9pbnQgKGNvb3JkaW5hdGVzLCBwb2ludCkge1xuICB2YXIgY29udGFpbnMgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IC0xLCBsID0gY29vcmRpbmF0ZXMubGVuZ3RoLCBqID0gbCAtIDE7ICsraSA8IGw7IGogPSBpKSB7XG4gICAgaWYgKCgoY29vcmRpbmF0ZXNbaV1bMV0gPD0gcG9pbnRbMV0gJiYgcG9pbnRbMV0gPCBjb29yZGluYXRlc1tqXVsxXSkgfHxcbiAgICAgICAgIChjb29yZGluYXRlc1tqXVsxXSA8PSBwb2ludFsxXSAmJiBwb2ludFsxXSA8IGNvb3JkaW5hdGVzW2ldWzFdKSkgJiZcbiAgICAgICAgKHBvaW50WzBdIDwgKGNvb3JkaW5hdGVzW2pdWzBdIC0gY29vcmRpbmF0ZXNbaV1bMF0pICogKHBvaW50WzFdIC0gY29vcmRpbmF0ZXNbaV1bMV0pIC8gKGNvb3JkaW5hdGVzW2pdWzFdIC0gY29vcmRpbmF0ZXNbaV1bMV0pICsgY29vcmRpbmF0ZXNbaV1bMF0pKSB7XG4gICAgICBjb250YWlucyA9ICFjb250YWlucztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbnRhaW5zO1xufVxuXG4vLyBwb3J0ZWQgZnJvbSB0ZXJyYWZvcm1lci1hcmNnaXMtcGFyc2VyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL3RlcnJhZm9ybWVyLWFyY2dpcy1wYXJzZXIvYmxvYi9tYXN0ZXIvdGVycmFmb3JtZXItYXJjZ2lzLXBhcnNlci5qcyNMMTA2LUwxMTNcbmZ1bmN0aW9uIGNvb3JkaW5hdGVzQ29udGFpbkNvb3JkaW5hdGVzIChvdXRlciwgaW5uZXIpIHtcbiAgdmFyIGludGVyc2VjdHMgPSBhcnJheUludGVyc2VjdHNBcnJheShvdXRlciwgaW5uZXIpO1xuICB2YXIgY29udGFpbnMgPSBjb29yZGluYXRlc0NvbnRhaW5Qb2ludChvdXRlciwgaW5uZXJbMF0pO1xuICBpZiAoIWludGVyc2VjdHMgJiYgY29udGFpbnMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIGRvIGFueSBwb2x5Z29ucyBpbiB0aGlzIGFycmF5IGNvbnRhaW4gYW55IG90aGVyIHBvbHlnb25zIGluIHRoaXMgYXJyYXk/XG4vLyB1c2VkIGZvciBjaGVja2luZyBmb3IgaG9sZXMgaW4gYXJjZ2lzIHJpbmdzXG4vLyBwb3J0ZWQgZnJvbSB0ZXJyYWZvcm1lci1hcmNnaXMtcGFyc2VyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL3RlcnJhZm9ybWVyLWFyY2dpcy1wYXJzZXIvYmxvYi9tYXN0ZXIvdGVycmFmb3JtZXItYXJjZ2lzLXBhcnNlci5qcyNMMTE3LUwxNzJcbmZ1bmN0aW9uIGNvbnZlcnRSaW5nc1RvR2VvSlNPTiAocmluZ3MpIHtcbiAgdmFyIG91dGVyUmluZ3MgPSBbXTtcbiAgdmFyIGhvbGVzID0gW107XG4gIHZhciB4OyAvLyBpdGVyYXRvclxuICB2YXIgb3V0ZXJSaW5nOyAvLyBjdXJyZW50IG91dGVyIHJpbmcgYmVpbmcgZXZhbHVhdGVkXG4gIHZhciBob2xlOyAvLyBjdXJyZW50IGhvbGUgYmVpbmcgZXZhbHVhdGVkXG5cbiAgLy8gZm9yIGVhY2ggcmluZ1xuICBmb3IgKHZhciByID0gMDsgciA8IHJpbmdzLmxlbmd0aDsgcisrKSB7XG4gICAgdmFyIHJpbmcgPSBjbG9zZVJpbmcocmluZ3Nbcl0uc2xpY2UoMCkpO1xuICAgIGlmIChyaW5nLmxlbmd0aCA8IDQpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICAvLyBpcyB0aGlzIHJpbmcgYW4gb3V0ZXIgcmluZz8gaXMgaXQgY2xvY2t3aXNlP1xuICAgIGlmIChyaW5nSXNDbG9ja3dpc2UocmluZykpIHtcbiAgICAgIHZhciBwb2x5Z29uID0gWyByaW5nIF07XG4gICAgICBvdXRlclJpbmdzLnB1c2gocG9seWdvbik7IC8vIHB1c2ggdG8gb3V0ZXIgcmluZ3NcbiAgICB9IGVsc2Uge1xuICAgICAgaG9sZXMucHVzaChyaW5nKTsgLy8gY291bnRlcmNsb2Nrd2lzZSBwdXNoIHRvIGhvbGVzXG4gICAgfVxuICB9XG5cbiAgdmFyIHVuY29udGFpbmVkSG9sZXMgPSBbXTtcblxuICAvLyB3aGlsZSB0aGVyZSBhcmUgaG9sZXMgbGVmdC4uLlxuICB3aGlsZSAoaG9sZXMubGVuZ3RoKSB7XG4gICAgLy8gcG9wIGEgaG9sZSBvZmYgb3V0IHN0YWNrXG4gICAgaG9sZSA9IGhvbGVzLnBvcCgpO1xuXG4gICAgLy8gbG9vcCBvdmVyIGFsbCBvdXRlciByaW5ncyBhbmQgc2VlIGlmIHRoZXkgY29udGFpbiBvdXIgaG9sZS5cbiAgICB2YXIgY29udGFpbmVkID0gZmFsc2U7XG4gICAgZm9yICh4ID0gb3V0ZXJSaW5ncy5sZW5ndGggLSAxOyB4ID49IDA7IHgtLSkge1xuICAgICAgb3V0ZXJSaW5nID0gb3V0ZXJSaW5nc1t4XVswXTtcbiAgICAgIGlmIChjb29yZGluYXRlc0NvbnRhaW5Db29yZGluYXRlcyhvdXRlclJpbmcsIGhvbGUpKSB7XG4gICAgICAgIC8vIHRoZSBob2xlIGlzIGNvbnRhaW5lZCBwdXNoIGl0IGludG8gb3VyIHBvbHlnb25cbiAgICAgICAgb3V0ZXJSaW5nc1t4XS5wdXNoKGhvbGUpO1xuICAgICAgICBjb250YWluZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByaW5nIGlzIG5vdCBjb250YWluZWQgaW4gYW55IG91dGVyIHJpbmdcbiAgICAvLyBzb21ldGltZXMgdGhpcyBoYXBwZW5zIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL2VzcmktbGVhZmxldC9pc3N1ZXMvMzIwXG4gICAgaWYgKCFjb250YWluZWQpIHtcbiAgICAgIHVuY29udGFpbmVkSG9sZXMucHVzaChob2xlKTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB3ZSBjb3VsZG4ndCBtYXRjaCBhbnkgaG9sZXMgdXNpbmcgY29udGFpbnMgd2UgY2FuIHRyeSBpbnRlcnNlY3RzLi4uXG4gIHdoaWxlICh1bmNvbnRhaW5lZEhvbGVzLmxlbmd0aCkge1xuICAgIC8vIHBvcCBhIGhvbGUgb2ZmIG91dCBzdGFja1xuICAgIGhvbGUgPSB1bmNvbnRhaW5lZEhvbGVzLnBvcCgpO1xuXG4gICAgLy8gbG9vcCBvdmVyIGFsbCBvdXRlciByaW5ncyBhbmQgc2VlIGlmIGFueSBpbnRlcnNlY3Qgb3VyIGhvbGUuXG4gICAgdmFyIGludGVyc2VjdHMgPSBmYWxzZTtcblxuICAgIGZvciAoeCA9IG91dGVyUmluZ3MubGVuZ3RoIC0gMTsgeCA+PSAwOyB4LS0pIHtcbiAgICAgIG91dGVyUmluZyA9IG91dGVyUmluZ3NbeF1bMF07XG4gICAgICBpZiAoYXJyYXlJbnRlcnNlY3RzQXJyYXkob3V0ZXJSaW5nLCBob2xlKSkge1xuICAgICAgICAvLyB0aGUgaG9sZSBpcyBjb250YWluZWQgcHVzaCBpdCBpbnRvIG91ciBwb2x5Z29uXG4gICAgICAgIG91dGVyUmluZ3NbeF0ucHVzaChob2xlKTtcbiAgICAgICAgaW50ZXJzZWN0cyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghaW50ZXJzZWN0cykge1xuICAgICAgb3V0ZXJSaW5ncy5wdXNoKFtob2xlLnJldmVyc2UoKV0pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvdXRlclJpbmdzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICBjb29yZGluYXRlczogb3V0ZXJSaW5nc1swXVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdNdWx0aVBvbHlnb24nLFxuICAgICAgY29vcmRpbmF0ZXM6IG91dGVyUmluZ3NcbiAgICB9O1xuICB9XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gZW5zdXJlcyB0aGF0IHJpbmdzIGFyZSBvcmllbnRlZCBpbiB0aGUgcmlnaHQgZGlyZWN0aW9uc1xuLy8gb3V0ZXIgcmluZ3MgYXJlIGNsb2Nrd2lzZSwgaG9sZXMgYXJlIGNvdW50ZXJjbG9ja3dpc2Vcbi8vIHVzZWQgZm9yIGNvbnZlcnRpbmcgR2VvSlNPTiBQb2x5Z29ucyB0byBBcmNHSVMgUG9seWdvbnNcbmZ1bmN0aW9uIG9yaWVudFJpbmdzIChwb2x5KSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgdmFyIHBvbHlnb24gPSBwb2x5LnNsaWNlKDApO1xuICB2YXIgb3V0ZXJSaW5nID0gY2xvc2VSaW5nKHBvbHlnb24uc2hpZnQoKS5zbGljZSgwKSk7XG4gIGlmIChvdXRlclJpbmcubGVuZ3RoID49IDQpIHtcbiAgICBpZiAoIXJpbmdJc0Nsb2Nrd2lzZShvdXRlclJpbmcpKSB7XG4gICAgICBvdXRlclJpbmcucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIG91dHB1dC5wdXNoKG91dGVyUmluZyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvbHlnb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBob2xlID0gY2xvc2VSaW5nKHBvbHlnb25baV0uc2xpY2UoMCkpO1xuICAgICAgaWYgKGhvbGUubGVuZ3RoID49IDQpIHtcbiAgICAgICAgaWYgKHJpbmdJc0Nsb2Nrd2lzZShob2xlKSkge1xuICAgICAgICAgIGhvbGUucmV2ZXJzZSgpO1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dC5wdXNoKGhvbGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gZmxhdHRlbnMgaG9sZXMgaW4gbXVsdGlwb2x5Z29ucyB0byBvbmUgYXJyYXkgb2YgcG9seWdvbnNcbi8vIHVzZWQgZm9yIGNvbnZlcnRpbmcgR2VvSlNPTiBQb2x5Z29ucyB0byBBcmNHSVMgUG9seWdvbnNcbmZ1bmN0aW9uIGZsYXR0ZW5NdWx0aVBvbHlnb25SaW5ncyAocmluZ3MpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHBvbHlnb24gPSBvcmllbnRSaW5ncyhyaW5nc1tpXSk7XG4gICAgZm9yICh2YXIgeCA9IHBvbHlnb24ubGVuZ3RoIC0gMTsgeCA+PSAwOyB4LS0pIHtcbiAgICAgIHZhciByaW5nID0gcG9seWdvblt4XS5zbGljZSgwKTtcbiAgICAgIG91dHB1dC5wdXNoKHJpbmcpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG4vLyBzaGFsbG93IG9iamVjdCBjbG9uZSBmb3IgZmVhdHVyZSBwcm9wZXJ0aWVzIGFuZCBhdHRyaWJ1dGVzXG4vLyBmcm9tIGh0dHA6Ly9qc3BlcmYuY29tL2Nsb25pbmctYW4tb2JqZWN0LzJcbmZ1bmN0aW9uIHNoYWxsb3dDbG9uZSAob2JqKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmNnaXNUb0dlb0pTT04gKGFyY2dpcywgaWRBdHRyaWJ1dGUpIHtcbiAgdmFyIGdlb2pzb24gPSB7fTtcblxuICBpZiAodHlwZW9mIGFyY2dpcy54ID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgYXJjZ2lzLnkgPT09ICdudW1iZXInKSB7XG4gICAgZ2VvanNvbi50eXBlID0gJ1BvaW50JztcbiAgICBnZW9qc29uLmNvb3JkaW5hdGVzID0gW2FyY2dpcy54LCBhcmNnaXMueV07XG4gIH1cblxuICBpZiAoYXJjZ2lzLnBvaW50cykge1xuICAgIGdlb2pzb24udHlwZSA9ICdNdWx0aVBvaW50JztcbiAgICBnZW9qc29uLmNvb3JkaW5hdGVzID0gYXJjZ2lzLnBvaW50cy5zbGljZSgwKTtcbiAgfVxuXG4gIGlmIChhcmNnaXMucGF0aHMpIHtcbiAgICBpZiAoYXJjZ2lzLnBhdGhzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZ2VvanNvbi50eXBlID0gJ0xpbmVTdHJpbmcnO1xuICAgICAgZ2VvanNvbi5jb29yZGluYXRlcyA9IGFyY2dpcy5wYXRoc1swXS5zbGljZSgwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VvanNvbi50eXBlID0gJ011bHRpTGluZVN0cmluZyc7XG4gICAgICBnZW9qc29uLmNvb3JkaW5hdGVzID0gYXJjZ2lzLnBhdGhzLnNsaWNlKDApO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhcmNnaXMucmluZ3MpIHtcbiAgICBnZW9qc29uID0gY29udmVydFJpbmdzVG9HZW9KU09OKGFyY2dpcy5yaW5ncy5zbGljZSgwKSk7XG4gIH1cblxuICBpZiAoYXJjZ2lzLmdlb21ldHJ5IHx8IGFyY2dpcy5hdHRyaWJ1dGVzKSB7XG4gICAgZ2VvanNvbi50eXBlID0gJ0ZlYXR1cmUnO1xuICAgIGdlb2pzb24uZ2VvbWV0cnkgPSAoYXJjZ2lzLmdlb21ldHJ5KSA/IGFyY2dpc1RvR2VvSlNPTihhcmNnaXMuZ2VvbWV0cnkpIDogbnVsbDtcbiAgICBnZW9qc29uLnByb3BlcnRpZXMgPSAoYXJjZ2lzLmF0dHJpYnV0ZXMpID8gc2hhbGxvd0Nsb25lKGFyY2dpcy5hdHRyaWJ1dGVzKSA6IG51bGw7XG4gICAgaWYgKGFyY2dpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICBnZW9qc29uLmlkID0gYXJjZ2lzLmF0dHJpYnV0ZXNbaWRBdHRyaWJ1dGVdIHx8IGFyY2dpcy5hdHRyaWJ1dGVzLk9CSkVDVElEIHx8IGFyY2dpcy5hdHRyaWJ1dGVzLkZJRDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2VvanNvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2pzb25Ub0FyY0dJUyAoZ2VvanNvbiwgaWRBdHRyaWJ1dGUpIHtcbiAgaWRBdHRyaWJ1dGUgPSBpZEF0dHJpYnV0ZSB8fCAnT0JKRUNUSUQnO1xuICB2YXIgc3BhdGlhbFJlZmVyZW5jZSA9IHsgd2tpZDogNDMyNiB9O1xuICB2YXIgcmVzdWx0ID0ge307XG4gIHZhciBpO1xuXG4gIHN3aXRjaCAoZ2VvanNvbi50eXBlKSB7XG4gICAgY2FzZSAnUG9pbnQnOlxuICAgICAgcmVzdWx0LnggPSBnZW9qc29uLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgcmVzdWx0LnkgPSBnZW9qc29uLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlQb2ludCc6XG4gICAgICByZXN1bHQucG9pbnRzID0gZ2VvanNvbi5jb29yZGluYXRlcy5zbGljZSgwKTtcbiAgICAgIHJlc3VsdC5zcGF0aWFsUmVmZXJlbmNlID0gc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxuICAgICAgcmVzdWx0LnBhdGhzID0gW2dlb2pzb24uY29vcmRpbmF0ZXMuc2xpY2UoMCldO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcbiAgICAgIHJlc3VsdC5wYXRocyA9IGdlb2pzb24uY29vcmRpbmF0ZXMuc2xpY2UoMCk7XG4gICAgICByZXN1bHQuc3BhdGlhbFJlZmVyZW5jZSA9IHNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdQb2x5Z29uJzpcbiAgICAgIHJlc3VsdC5yaW5ncyA9IG9yaWVudFJpbmdzKGdlb2pzb24uY29vcmRpbmF0ZXMuc2xpY2UoMCkpO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlQb2x5Z29uJzpcbiAgICAgIHJlc3VsdC5yaW5ncyA9IGZsYXR0ZW5NdWx0aVBvbHlnb25SaW5ncyhnZW9qc29uLmNvb3JkaW5hdGVzLnNsaWNlKDApKTtcbiAgICAgIHJlc3VsdC5zcGF0aWFsUmVmZXJlbmNlID0gc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0ZlYXR1cmUnOlxuICAgICAgaWYgKGdlb2pzb24uZ2VvbWV0cnkpIHtcbiAgICAgICAgcmVzdWx0Lmdlb21ldHJ5ID0gZ2VvanNvblRvQXJjR0lTKGdlb2pzb24uZ2VvbWV0cnksIGlkQXR0cmlidXRlKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5hdHRyaWJ1dGVzID0gKGdlb2pzb24ucHJvcGVydGllcykgPyBzaGFsbG93Q2xvbmUoZ2VvanNvbi5wcm9wZXJ0aWVzKSA6IHt9O1xuICAgICAgaWYgKGdlb2pzb24uaWQpIHtcbiAgICAgICAgcmVzdWx0LmF0dHJpYnV0ZXNbaWRBdHRyaWJ1dGVdID0gZ2VvanNvbi5pZDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0ZlYXR1cmVDb2xsZWN0aW9uJzpcbiAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZ2VvanNvblRvQXJjR0lTKGdlb2pzb24uZmVhdHVyZXNbaV0sIGlkQXR0cmlidXRlKSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdHZW9tZXRyeUNvbGxlY3Rpb24nOlxuICAgICAgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZ2VvanNvbi5nZW9tZXRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGdlb2pzb25Ub0FyY0dJUyhnZW9qc29uLmdlb21ldHJpZXNbaV0sIGlkQXR0cmlidXRlKSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGpzb25wIH0gZnJvbSAnLi9SZXF1ZXN0JztcbmltcG9ydCB7IG9wdGlvbnMgfSBmcm9tICcuL09wdGlvbnMnO1xuXG5pbXBvcnQge1xuICBnZW9qc29uVG9BcmNHSVMgYXMgZzJhLFxuICBhcmNnaXNUb0dlb0pTT04gYXMgYTJnXG59IGZyb20gJ2FyY2dpcy10by1nZW9qc29uLXV0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2pzb25Ub0FyY0dJUyAoZ2VvanNvbiwgaWRBdHRyKSB7XG4gIHJldHVybiBnMmEoZ2VvanNvbiwgaWRBdHRyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyY2dpc1RvR2VvSlNPTiAoYXJjZ2lzLCBpZEF0dHIpIHtcbiAgcmV0dXJuIGEyZyhhcmNnaXMsIGlkQXR0cik7XG59XG5cbi8vIHNoYWxsb3cgb2JqZWN0IGNsb25lIGZvciBmZWF0dXJlIHByb3BlcnRpZXMgYW5kIGF0dHJpYnV0ZXNcbi8vIGZyb20gaHR0cDovL2pzcGVyZi5jb20vY2xvbmluZy1hbi1vYmplY3QvMlxuZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dDbG9uZSAob2JqKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbi8vIGNvbnZlcnQgYW4gZXh0ZW50IChBcmNHSVMpIHRvIExhdExuZ0JvdW5kcyAoTGVhZmxldClcbmV4cG9ydCBmdW5jdGlvbiBleHRlbnRUb0JvdW5kcyAoZXh0ZW50KSB7XG4gIC8vIFwiTmFOXCIgY29vcmRpbmF0ZXMgZnJvbSBBcmNHSVMgU2VydmVyIGluZGljYXRlIGEgbnVsbCBnZW9tZXRyeVxuICBpZiAoZXh0ZW50LnhtaW4gIT09ICdOYU4nICYmIGV4dGVudC55bWluICE9PSAnTmFOJyAmJiBleHRlbnQueG1heCAhPT0gJ05hTicgJiYgZXh0ZW50LnltYXggIT09ICdOYU4nKSB7XG4gICAgdmFyIHN3ID0gTC5sYXRMbmcoZXh0ZW50LnltaW4sIGV4dGVudC54bWluKTtcbiAgICB2YXIgbmUgPSBMLmxhdExuZyhleHRlbnQueW1heCwgZXh0ZW50LnhtYXgpO1xuICAgIHJldHVybiBMLmxhdExuZ0JvdW5kcyhzdywgbmUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8vIGNvbnZlcnQgYW4gTGF0TG5nQm91bmRzIChMZWFmbGV0KSB0byBleHRlbnQgKEFyY0dJUylcbmV4cG9ydCBmdW5jdGlvbiBib3VuZHNUb0V4dGVudCAoYm91bmRzKSB7XG4gIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKGJvdW5kcyk7XG4gIHJldHVybiB7XG4gICAgJ3htaW4nOiBib3VuZHMuZ2V0U291dGhXZXN0KCkubG5nLFxuICAgICd5bWluJzogYm91bmRzLmdldFNvdXRoV2VzdCgpLmxhdCxcbiAgICAneG1heCc6IGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sbmcsXG4gICAgJ3ltYXgnOiBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubGF0LFxuICAgICdzcGF0aWFsUmVmZXJlbmNlJzoge1xuICAgICAgJ3draWQnOiA0MzI2XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uIChyZXNwb25zZSwgaWRBdHRyaWJ1dGUpIHtcbiAgdmFyIG9iamVjdElkRmllbGQ7XG4gIHZhciBmZWF0dXJlcyA9IHJlc3BvbnNlLmZlYXR1cmVzIHx8IHJlc3BvbnNlLnJlc3VsdHM7XG4gIHZhciBjb3VudCA9IGZlYXR1cmVzLmxlbmd0aDtcblxuICBpZiAoaWRBdHRyaWJ1dGUpIHtcbiAgICBvYmplY3RJZEZpZWxkID0gaWRBdHRyaWJ1dGU7XG4gIH0gZWxzZSBpZiAocmVzcG9uc2Uub2JqZWN0SWRGaWVsZE5hbWUpIHtcbiAgICBvYmplY3RJZEZpZWxkID0gcmVzcG9uc2Uub2JqZWN0SWRGaWVsZE5hbWU7XG4gIH0gZWxzZSBpZiAocmVzcG9uc2UuZmllbGRzKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPD0gcmVzcG9uc2UuZmllbGRzLmxlbmd0aCAtIDE7IGorKykge1xuICAgICAgaWYgKHJlc3BvbnNlLmZpZWxkc1tqXS50eXBlID09PSAnZXNyaUZpZWxkVHlwZU9JRCcpIHtcbiAgICAgICAgb2JqZWN0SWRGaWVsZCA9IHJlc3BvbnNlLmZpZWxkc1tqXS5uYW1lO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoY291bnQpIHtcbiAgICAvKiBhcyBhIGxhc3QgcmVzb3J0LCBjaGVjayBmb3IgY29tbW9uIElEIGZpZWxkbmFtZXMgaW4gdGhlIGZpcnN0IGZlYXR1cmUgcmV0dXJuZWRcbiAgICBub3QgZm9vbHByb29mLiBpZGVudGlmeUZlYXR1cmVzIGNhbiByZXR1cm5lZCBhIG1peGVkIGFycmF5IG9mIGZlYXR1cmVzLiAqL1xuICAgIGZvciAodmFyIGtleSBpbiBmZWF0dXJlc1swXS5hdHRyaWJ1dGVzKSB7XG4gICAgICBpZiAoa2V5Lm1hdGNoKC9eKE9CSkVDVElEfEZJRHxPSUR8SUQpJC9pKSkge1xuICAgICAgICBvYmplY3RJZEZpZWxkID0ga2V5O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgZmVhdHVyZUNvbGxlY3Rpb24gPSB7XG4gICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICBmZWF0dXJlczogW11cbiAgfTtcblxuICBpZiAoY291bnQpIHtcbiAgICBmb3IgKHZhciBpID0gZmVhdHVyZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmZWF0dXJlID0gYXJjZ2lzVG9HZW9KU09OKGZlYXR1cmVzW2ldLCBvYmplY3RJZEZpZWxkKTtcbiAgICAgIGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uO1xufVxuXG4gIC8vIHRyaW0gdXJsIHdoaXRlc3BhY2UgYW5kIGFkZCBhIHRyYWlsaW5nIHNsYXNoIGlmIG5lZWRlZFxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuVXJsICh1cmwpIHtcbiAgLy8gdHJpbSBsZWFkaW5nIGFuZCB0cmFpbGluZyBzcGFjZXMsIGJ1dCBub3Qgc3BhY2VzIGluc2lkZSB0aGUgdXJsXG4gIHVybCA9IEwuVXRpbC50cmltKHVybCk7XG5cbiAgLy8gYWRkIGEgdHJhaWxpbmcgc2xhc2ggdG8gdGhlIHVybCBpZiB0aGUgdXNlciBvbWl0dGVkIGl0XG4gIGlmICh1cmxbdXJsLmxlbmd0aCAtIDFdICE9PSAnLycpIHtcbiAgICB1cmwgKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJjZ2lzT25saW5lICh1cmwpIHtcbiAgLyogaG9zdGVkIGZlYXR1cmUgc2VydmljZXMgc3VwcG9ydCBnZW9qc29uIGFzIGFuIG91dHB1dCBmb3JtYXRcbiAgdXRpbGl0eS5hcmNnaXMuY29tIHNlcnZpY2VzIGFyZSBwcm94aWVkIGZyb20gYSB2YXJpZXR5IG9mIEFyY0dJUyBTZXJ2ZXIgdmludGFnZXMsIGFuZCBtYXkgbm90ICovXG4gIHJldHVybiAoL14oPyEuKnV0aWxpdHlcXC5hcmNnaXNcXC5jb20pLipcXC5hcmNnaXNcXC5jb20uKkZlYXR1cmVTZXJ2ZXIvaSkudGVzdCh1cmwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VvanNvblR5cGVUb0FyY0dJUyAoZ2VvSnNvblR5cGUpIHtcbiAgdmFyIGFyY2dpc0dlb21ldHJ5VHlwZTtcbiAgc3dpdGNoIChnZW9Kc29uVHlwZSkge1xuICAgIGNhc2UgJ1BvaW50JzpcbiAgICAgIGFyY2dpc0dlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2ludCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aVBvaW50JzpcbiAgICAgIGFyY2dpc0dlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlNdWx0aXBvaW50JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxuICAgICAgYXJjZ2lzR2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvbHlsaW5lJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ011bHRpTGluZVN0cmluZyc6XG4gICAgICBhcmNnaXNHZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9seWxpbmUnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUG9seWdvbic6XG4gICAgICBhcmNnaXNHZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9seWdvbic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxuICAgICAgYXJjZ2lzR2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvbHlnb24nO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gYXJjZ2lzR2VvbWV0cnlUeXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FybiAoKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2Fybikge1xuICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjQXR0cmlidXRpb25XaWR0aCAobWFwKSB7XG4gIC8vIGVpdGhlciBjcm9wIGF0IDU1cHggb3IgdXNlciBkZWZpbmVkIGJ1ZmZlclxuICByZXR1cm4gKG1hcC5nZXRTaXplKCkueCAtIG9wdGlvbnMuYXR0cmlidXRpb25XaWR0aE9mZnNldCkgKyAncHgnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RXNyaUF0dHJpYnV0aW9uIChtYXApIHtcbiAgaWYgKG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wgJiYgIW1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuX2VzcmlBdHRyaWJ1dGlvbkFkZGVkKSB7XG4gICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5zZXRQcmVmaXgoJzxhIGhyZWY9XCJodHRwOi8vbGVhZmxldGpzLmNvbVwiIHRpdGxlPVwiQSBKUyBsaWJyYXJ5IGZvciBpbnRlcmFjdGl2ZSBtYXBzXCI+TGVhZmxldDwvYT4gfCBQb3dlcmVkIGJ5IDxhIGhyZWY9XCJodHRwczovL3d3dy5lc3JpLmNvbVwiPkVzcmk8L2E+Jyk7XG5cbiAgICB2YXIgaG92ZXJBdHRyaWJ1dGlvblN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBob3ZlckF0dHJpYnV0aW9uU3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgaG92ZXJBdHRyaWJ1dGlvblN0eWxlLmlubmVySFRNTCA9ICcuZXNyaS10cnVuY2F0ZWQtYXR0cmlidXRpb246aG92ZXIgeycgK1xuICAgICAgJ3doaXRlLXNwYWNlOiBub3JtYWw7JyArXG4gICAgJ30nO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChob3ZlckF0dHJpYnV0aW9uU3R5bGUpO1xuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIsICdlc3JpLXRydW5jYXRlZC1hdHRyaWJ1dGlvbjpob3ZlcicpO1xuXG4gICAgLy8gZGVmaW5lIGEgbmV3IGNzcyBjbGFzcyBpbiBKUyB0byB0cmltIGF0dHJpYnV0aW9uIGludG8gYSBzaW5nbGUgbGluZVxuICAgIHZhciBhdHRyaWJ1dGlvblN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBhdHRyaWJ1dGlvblN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGF0dHJpYnV0aW9uU3R5bGUuaW5uZXJIVE1MID0gJy5lc3JpLXRydW5jYXRlZC1hdHRyaWJ1dGlvbiB7JyArXG4gICAgICAndmVydGljYWwtYWxpZ246IC0zcHg7JyArXG4gICAgICAnd2hpdGUtc3BhY2U6IG5vd3JhcDsnICtcbiAgICAgICdvdmVyZmxvdzogaGlkZGVuOycgK1xuICAgICAgJ3RleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOycgK1xuICAgICAgJ2Rpc3BsYXk6IGlubGluZS1ibG9jazsnICtcbiAgICAgICd0cmFuc2l0aW9uOiAwcyB3aGl0ZS1zcGFjZTsnICtcbiAgICAgICd0cmFuc2l0aW9uLWRlbGF5OiAxczsnICtcbiAgICAgICdtYXgtd2lkdGg6ICcgKyBjYWxjQXR0cmlidXRpb25XaWR0aChtYXApICsgJzsnICtcbiAgICAnfSc7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGF0dHJpYnV0aW9uU3R5bGUpO1xuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIsICdlc3JpLXRydW5jYXRlZC1hdHRyaWJ1dGlvbicpO1xuXG4gICAgLy8gdXBkYXRlIHRoZSB3aWR0aCB1c2VkIHRvIHRydW5jYXRlIHdoZW4gdGhlIG1hcCBpdHNlbGYgaXMgcmVzaXplZFxuICAgIG1hcC5vbigncmVzaXplJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuX2NvbnRhaW5lci5zdHlsZS5tYXhXaWR0aCA9IGNhbGNBdHRyaWJ1dGlvbldpZHRoKGUudGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuX2VzcmlBdHRyaWJ1dGlvbkFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2dldEF0dHJpYnV0aW9uRGF0YSAodXJsLCBtYXApIHtcbiAganNvbnAodXJsLCB7fSwgTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBhdHRyaWJ1dGlvbnMpIHtcbiAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9XG4gICAgbWFwLl9lc3JpQXR0cmlidXRpb25zID0gW107XG4gICAgZm9yICh2YXIgYyA9IDA7IGMgPCBhdHRyaWJ1dGlvbnMuY29udHJpYnV0b3JzLmxlbmd0aDsgYysrKSB7XG4gICAgICB2YXIgY29udHJpYnV0b3IgPSBhdHRyaWJ1dGlvbnMuY29udHJpYnV0b3JzW2NdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRyaWJ1dG9yLmNvdmVyYWdlQXJlYXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNvdmVyYWdlQXJlYSA9IGNvbnRyaWJ1dG9yLmNvdmVyYWdlQXJlYXNbaV07XG4gICAgICAgIHZhciBzb3V0aFdlc3QgPSBMLmxhdExuZyhjb3ZlcmFnZUFyZWEuYmJveFswXSwgY292ZXJhZ2VBcmVhLmJib3hbMV0pO1xuICAgICAgICB2YXIgbm9ydGhFYXN0ID0gTC5sYXRMbmcoY292ZXJhZ2VBcmVhLmJib3hbMl0sIGNvdmVyYWdlQXJlYS5iYm94WzNdKTtcbiAgICAgICAgbWFwLl9lc3JpQXR0cmlidXRpb25zLnB1c2goe1xuICAgICAgICAgIGF0dHJpYnV0aW9uOiBjb250cmlidXRvci5hdHRyaWJ1dGlvbixcbiAgICAgICAgICBzY29yZTogY292ZXJhZ2VBcmVhLnNjb3JlLFxuICAgICAgICAgIGJvdW5kczogTC5sYXRMbmdCb3VuZHMoc291dGhXZXN0LCBub3J0aEVhc3QpLFxuICAgICAgICAgIG1pblpvb206IGNvdmVyYWdlQXJlYS56b29tTWluLFxuICAgICAgICAgIG1heFpvb206IGNvdmVyYWdlQXJlYS56b29tTWF4XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1hcC5fZXNyaUF0dHJpYnV0aW9ucy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmU7XG4gICAgfSk7XG5cbiAgICAvLyBwYXNzIHRoZSBzYW1lIGFyZ3VtZW50IGFzIHRoZSBtYXAncyAnbW92ZWVuZCcgZXZlbnRcbiAgICB2YXIgb2JqID0geyB0YXJnZXQ6IG1hcCB9O1xuICAgIF91cGRhdGVNYXBBdHRyaWJ1dGlvbihvYmopO1xuICB9LCB0aGlzKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfdXBkYXRlTWFwQXR0cmlidXRpb24gKGV2dCkge1xuICB2YXIgbWFwID0gZXZ0LnRhcmdldDtcbiAgdmFyIG9sZEF0dHJpYnV0aW9ucyA9IG1hcC5fZXNyaUF0dHJpYnV0aW9ucztcblxuICBpZiAobWFwICYmIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wgJiYgb2xkQXR0cmlidXRpb25zKSB7XG4gICAgdmFyIG5ld0F0dHJpYnV0aW9ucyA9ICcnO1xuICAgIHZhciBib3VuZHMgPSBtYXAuZ2V0Qm91bmRzKCk7XG4gICAgdmFyIHdyYXBwZWRCb3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhcbiAgICAgIGJvdW5kcy5nZXRTb3V0aFdlc3QoKS53cmFwKCksXG4gICAgICBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkud3JhcCgpXG4gICAgKTtcbiAgICB2YXIgem9vbSA9IG1hcC5nZXRab29tKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZEF0dHJpYnV0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGF0dHJpYnV0aW9uID0gb2xkQXR0cmlidXRpb25zW2ldO1xuICAgICAgdmFyIHRleHQgPSBhdHRyaWJ1dGlvbi5hdHRyaWJ1dGlvbjtcblxuICAgICAgaWYgKCFuZXdBdHRyaWJ1dGlvbnMubWF0Y2godGV4dCkgJiYgYXR0cmlidXRpb24uYm91bmRzLmludGVyc2VjdHMod3JhcHBlZEJvdW5kcykgJiYgem9vbSA+PSBhdHRyaWJ1dGlvbi5taW5ab29tICYmIHpvb20gPD0gYXR0cmlidXRpb24ubWF4Wm9vbSkge1xuICAgICAgICBuZXdBdHRyaWJ1dGlvbnMgKz0gKCcsICcgKyB0ZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdBdHRyaWJ1dGlvbnMgPSBuZXdBdHRyaWJ1dGlvbnMuc3Vic3RyKDIpO1xuICAgIHZhciBhdHRyaWJ1dGlvbkVsZW1lbnQgPSBtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIucXVlcnlTZWxlY3RvcignLmVzcmktZHluYW1pYy1hdHRyaWJ1dGlvbicpO1xuXG4gICAgYXR0cmlidXRpb25FbGVtZW50LmlubmVySFRNTCA9IG5ld0F0dHJpYnV0aW9ucztcbiAgICBhdHRyaWJ1dGlvbkVsZW1lbnQuc3R5bGUubWF4V2lkdGggPSBjYWxjQXR0cmlidXRpb25XaWR0aChtYXApO1xuXG4gICAgbWFwLmZpcmUoJ2F0dHJpYnV0aW9udXBkYXRlZCcsIHtcbiAgICAgIGF0dHJpYnV0aW9uOiBuZXdBdHRyaWJ1dGlvbnNcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIFV0aWwgPSB7XG4gIHNoYWxsb3dDbG9uZTogc2hhbGxvd0Nsb25lLFxuICB3YXJuOiB3YXJuLFxuICBjbGVhblVybDogY2xlYW5VcmwsXG4gIGlzQXJjZ2lzT25saW5lOiBpc0FyY2dpc09ubGluZSxcbiAgZ2VvanNvblR5cGVUb0FyY0dJUzogZ2VvanNvblR5cGVUb0FyY0dJUyxcbiAgcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uOiByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24sXG4gIGdlb2pzb25Ub0FyY0dJUzogZ2VvanNvblRvQXJjR0lTLFxuICBhcmNnaXNUb0dlb0pTT046IGFyY2dpc1RvR2VvSlNPTixcbiAgYm91bmRzVG9FeHRlbnQ6IGJvdW5kc1RvRXh0ZW50LFxuICBleHRlbnRUb0JvdW5kczogZXh0ZW50VG9Cb3VuZHMsXG4gIGNhbGNBdHRyaWJ1dGlvbldpZHRoOiBjYWxjQXR0cmlidXRpb25XaWR0aCxcbiAgc2V0RXNyaUF0dHJpYnV0aW9uOiBzZXRFc3JpQXR0cmlidXRpb24sXG4gIF9nZXRBdHRyaWJ1dGlvbkRhdGE6IF9nZXRBdHRyaWJ1dGlvbkRhdGEsXG4gIF91cGRhdGVNYXBBdHRyaWJ1dGlvbjogX3VwZGF0ZU1hcEF0dHJpYnV0aW9uXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVdGlsO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQge2NvcnN9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHtjbGVhblVybH0gZnJvbSAnLi4vVXRpbCc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9SZXF1ZXN0JztcblxuZXhwb3J0IHZhciBUYXNrID0gTC5DbGFzcy5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBwcm94eTogZmFsc2UsXG4gICAgdXNlQ29yczogY29yc1xuICB9LFxuXG4gIC8vIEdlbmVyYXRlIGEgbWV0aG9kIGZvciBlYWNoIG1ldGhvZE5hbWU6cGFyYW1OYW1lIGluIHRoZSBzZXR0ZXJzIGZvciB0aGlzIHRhc2suXG4gIGdlbmVyYXRlU2V0dGVyOiBmdW5jdGlvbiAocGFyYW0sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB0aGlzLnBhcmFtc1twYXJhbV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIGNvbnRleHQpO1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChlbmRwb2ludCkge1xuICAgIC8vIGVuZHBvaW50IGNhbiBiZSBlaXRoZXIgYSB1cmwgKGFuZCBvcHRpb25zKSBmb3IgYW4gQXJjR0lTIFJlc3QgU2VydmljZSBvciBhbiBpbnN0YW5jZSBvZiBFc3JpTGVhZmxldC5TZXJ2aWNlXG4gICAgaWYgKGVuZHBvaW50LnJlcXVlc3QgJiYgZW5kcG9pbnQub3B0aW9ucykge1xuICAgICAgdGhpcy5fc2VydmljZSA9IGVuZHBvaW50O1xuICAgICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgZW5kcG9pbnQub3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIGVuZHBvaW50KTtcbiAgICAgIHRoaXMub3B0aW9ucy51cmwgPSBjbGVhblVybChlbmRwb2ludC51cmwpO1xuICAgIH1cblxuICAgIC8vIGNsb25lIGRlZmF1bHQgcGFyYW1zIGludG8gdGhpcyBvYmplY3RcbiAgICB0aGlzLnBhcmFtcyA9IEwuVXRpbC5leHRlbmQoe30sIHRoaXMucGFyYW1zIHx8IHt9KTtcblxuICAgIC8vIGdlbmVyYXRlIHNldHRlciBtZXRob2RzIGJhc2VkIG9uIHRoZSBzZXR0ZXJzIG9iamVjdCBpbXBsaW1lbnRlZCBhIGNoaWxkIGNsYXNzXG4gICAgaWYgKHRoaXMuc2V0dGVycykge1xuICAgICAgZm9yICh2YXIgc2V0dGVyIGluIHRoaXMuc2V0dGVycykge1xuICAgICAgICB2YXIgcGFyYW0gPSB0aGlzLnNldHRlcnNbc2V0dGVyXTtcbiAgICAgICAgdGhpc1tzZXR0ZXJdID0gdGhpcy5nZW5lcmF0ZVNldHRlcihwYXJhbSwgdGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHRva2VuOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICBpZiAodGhpcy5fc2VydmljZSkge1xuICAgICAgdGhpcy5fc2VydmljZS5hdXRoZW50aWNhdGUodG9rZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcmFtcy50b2tlbiA9IHRva2VuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZXF1ZXN0OiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAodGhpcy5fc2VydmljZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2UucmVxdWVzdCh0aGlzLnBhdGgsIHRoaXMucGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ3JlcXVlc3QnLCB0aGlzLnBhdGgsIHRoaXMucGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH0sXG5cbiAgX3JlcXVlc3Q6IGZ1bmN0aW9uIChtZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgdXJsID0gKHRoaXMub3B0aW9ucy5wcm94eSkgPyB0aGlzLm9wdGlvbnMucHJveHkgKyAnPycgKyB0aGlzLm9wdGlvbnMudXJsICsgcGF0aCA6IHRoaXMub3B0aW9ucy51cmwgKyBwYXRoO1xuXG4gICAgaWYgKChtZXRob2QgPT09ICdnZXQnIHx8IG1ldGhvZCA9PT0gJ3JlcXVlc3QnKSAmJiAhdGhpcy5vcHRpb25zLnVzZUNvcnMpIHtcbiAgICAgIHJldHVybiBSZXF1ZXN0LmdldC5KU09OUCh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiBSZXF1ZXN0W21ldGhvZF0odXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0YXNrIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgVGFzayhvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGFzaztcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vVGFzayc7XG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBRdWVyeSA9IFRhc2suZXh0ZW5kKHtcbiAgc2V0dGVyczoge1xuICAgICdvZmZzZXQnOiAncmVzdWx0T2Zmc2V0JyxcbiAgICAnbGltaXQnOiAncmVzdWx0UmVjb3JkQ291bnQnLFxuICAgICdmaWVsZHMnOiAnb3V0RmllbGRzJyxcbiAgICAncHJlY2lzaW9uJzogJ2dlb21ldHJ5UHJlY2lzaW9uJyxcbiAgICAnZmVhdHVyZUlkcyc6ICdvYmplY3RJZHMnLFxuICAgICdyZXR1cm5HZW9tZXRyeSc6ICdyZXR1cm5HZW9tZXRyeScsXG4gICAgJ3Rva2VuJzogJ3Rva2VuJ1xuICB9LFxuXG4gIHBhdGg6ICdxdWVyeScsXG5cbiAgcGFyYW1zOiB7XG4gICAgcmV0dXJuR2VvbWV0cnk6IHRydWUsXG4gICAgd2hlcmU6ICcxPTEnLFxuICAgIG91dFNyOiA0MzI2LFxuICAgIG91dEZpZWxkczogJyonXG4gIH0sXG5cbiAgd2l0aGluOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeShnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbENvbnRhaW5zJzsgLy8gd2lsbCBtYWtlIGNvZGUgcmVhZCBsYXllciB3aXRoaW4gZ2VvbWV0cnksIHRvIHRoZSBhcGkgdGhpcyB3aWxsIHJlYWRzIGdlb21ldHJ5IGNvbnRhaW5zIGxheWVyXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgaW50ZXJzZWN0czogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnkoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxJbnRlcnNlY3RzJztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBjb250YWluczogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnkoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxXaXRoaW4nOyAvLyB3aWxsIG1ha2UgY29kZSByZWFkIGxheWVyIGNvbnRhaW5zIGdlb21ldHJ5LCB0byB0aGUgYXBpIHRoaXMgd2lsbCByZWFkcyBnZW9tZXRyeSB3aXRoaW4gbGF5ZXJcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBjcm9zc2VzOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeShnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbENyb3NzZXMnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHRvdWNoZXM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5KGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsVG91Y2hlcyc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb3ZlcmxhcHM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5KGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsT3ZlcmxhcHMnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIG9ubHkgdmFsaWQgZm9yIEZlYXR1cmUgU2VydmljZXMgcnVubmluZyBvbiBBcmNHSVMgU2VydmVyIDEwLjMgb3IgQXJjR0lTIE9ubGluZVxuICBuZWFyYnk6IGZ1bmN0aW9uIChsYXRsbmcsIHJhZGl1cykge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnkgPSBbbGF0bG5nLmxuZywgbGF0bG5nLmxhdF07XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvaW50JztcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsSW50ZXJzZWN0cyc7XG4gICAgdGhpcy5wYXJhbXMudW5pdHMgPSAnZXNyaVNSVW5pdF9NZXRlcic7XG4gICAgdGhpcy5wYXJhbXMuZGlzdGFuY2UgPSByYWRpdXM7XG4gICAgdGhpcy5wYXJhbXMuaW5TciA9IDQzMjY7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgd2hlcmU6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAvLyBpbnN0ZWFkIG9mIGNvbnZlcnRpbmcgZG91YmxlLXF1b3RlcyB0byBzaW5nbGUgcXVvdGVzLCBwYXNzIGFzIGlzLCBhbmQgcHJvdmlkZSBhIG1vcmUgaW5mb3JtYXRpdmUgbWVzc2FnZSBpZiBhIDQwMCBpcyBlbmNvdW50ZXJlZFxuICAgIHRoaXMucGFyYW1zLndoZXJlID0gc3RyaW5nO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGJldHdlZW46IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgdGhpcy5wYXJhbXMudGltZSA9IFtzdGFydC52YWx1ZU9mKCksIGVuZC52YWx1ZU9mKCldO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHNpbXBsaWZ5OiBmdW5jdGlvbiAobWFwLCBmYWN0b3IpIHtcbiAgICB2YXIgbWFwV2lkdGggPSBNYXRoLmFicyhtYXAuZ2V0Qm91bmRzKCkuZ2V0V2VzdCgpIC0gbWFwLmdldEJvdW5kcygpLmdldEVhc3QoKSk7XG4gICAgdGhpcy5wYXJhbXMubWF4QWxsb3dhYmxlT2Zmc2V0ID0gKG1hcFdpZHRoIC8gbWFwLmdldFNpemUoKS55KSAqIGZhY3RvcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvcmRlckJ5OiBmdW5jdGlvbiAoZmllbGROYW1lLCBvcmRlcikge1xuICAgIG9yZGVyID0gb3JkZXIgfHwgJ0FTQyc7XG4gICAgdGhpcy5wYXJhbXMub3JkZXJCeUZpZWxkcyA9ICh0aGlzLnBhcmFtcy5vcmRlckJ5RmllbGRzKSA/IHRoaXMucGFyYW1zLm9yZGVyQnlGaWVsZHMgKyAnLCcgOiAnJztcbiAgICB0aGlzLnBhcmFtcy5vcmRlckJ5RmllbGRzICs9IChbZmllbGROYW1lLCBvcmRlcl0pLmpvaW4oJyAnKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuX2NsZWFuUGFyYW1zKCk7XG5cbiAgICAvLyBzZXJ2aWNlcyBob3N0ZWQgb24gQXJjR0lTIE9ubGluZSBhbHNvIHN1cHBvcnQgcmVxdWVzdGluZyBnZW9qc29uIGRpcmVjdGx5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc01vZGVybiB8fCBVdGlsLmlzQXJjZ2lzT25saW5lKHRoaXMub3B0aW9ucy51cmwpKSB7XG4gICAgICB0aGlzLnBhcmFtcy5mID0gJ2dlb2pzb24nO1xuXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5fdHJhcFNRTGVycm9ycyhlcnJvcik7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlLCByZXNwb25zZSk7XG4gICAgICB9LCB0aGlzKTtcblxuICAgIC8vIG90aGVyd2lzZSBjb252ZXJ0IGl0IGluIHRoZSBjYWxsYmFjayB0aGVuIHBhc3MgaXQgb25cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuX3RyYXBTUUxlcnJvcnMoZXJyb3IpO1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCAocmVzcG9uc2UgJiYgVXRpbC5yZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24ocmVzcG9uc2UpKSwgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICB9LFxuXG4gIGNvdW50OiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jbGVhblBhcmFtcygpO1xuICAgIHRoaXMucGFyYW1zLnJldHVybkNvdW50T25seSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGVycm9yLCAocmVzcG9uc2UgJiYgcmVzcG9uc2UuY291bnQpLCByZXNwb25zZSk7XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgaWRzOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jbGVhblBhcmFtcygpO1xuICAgIHRoaXMucGFyYW1zLnJldHVybklkc09ubHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBlcnJvciwgKHJlc3BvbnNlICYmIHJlc3BvbnNlLm9iamVjdElkcyksIHJlc3BvbnNlKTtcbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICAvLyBvbmx5IHZhbGlkIGZvciBGZWF0dXJlIFNlcnZpY2VzIHJ1bm5pbmcgb24gQXJjR0lTIFNlcnZlciAxMC4zKyBvciBBcmNHSVMgT25saW5lXG4gIGJvdW5kczogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fY2xlYW5QYXJhbXMoKTtcbiAgICB0aGlzLnBhcmFtcy5yZXR1cm5FeHRlbnRPbmx5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5leHRlbnQgJiYgVXRpbC5leHRlbnRUb0JvdW5kcyhyZXNwb25zZS5leHRlbnQpKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIFV0aWwuZXh0ZW50VG9Cb3VuZHMocmVzcG9uc2UuZXh0ZW50KSwgcmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3IgPSB7XG4gICAgICAgICAgbWVzc2FnZTogJ0ludmFsaWQgQm91bmRzJ1xuICAgICAgICB9O1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCBudWxsLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgLy8gb25seSB2YWxpZCBmb3IgaW1hZ2Ugc2VydmljZXNcbiAgcGl4ZWxTaXplOiBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICBwb2ludCA9IEwucG9pbnQocG9pbnQpO1xuICAgIHRoaXMucGFyYW1zLnBpeGVsU2l6ZSA9IFtwb2ludC54LCBwb2ludC55XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBvbmx5IHZhbGlkIGZvciBtYXAgc2VydmljZXNcbiAgbGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xuICAgIHRoaXMucGF0aCA9IGxheWVyICsgJy9xdWVyeSc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3RyYXBTUUxlcnJvcnM6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICc0MDAnKSB7XG4gICAgICAgIFV0aWwud2Fybignb25lIGNvbW1vbiBzeW50YXggZXJyb3IgaW4gcXVlcnkgcmVxdWVzdHMgaXMgZW5jYXNpbmcgc3RyaW5nIHZhbHVlcyBpbiBkb3VibGUgcXVvdGVzIGluc3RlYWQgb2Ygc2luZ2xlIHF1b3RlcycpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfY2xlYW5QYXJhbXM6IGZ1bmN0aW9uICgpIHtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuSWRzT25seTtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuRXh0ZW50T25seTtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuQ291bnRPbmx5O1xuICB9LFxuXG4gIF9zZXRHZW9tZXRyeTogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5wYXJhbXMuaW5TciA9IDQzMjY7XG5cbiAgICAvLyBjb252ZXJ0IGJvdW5kcyB0byBleHRlbnQgYW5kIGZpbmlzaFxuICAgIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIEwuTGF0TG5nQm91bmRzKSB7XG4gICAgICAvLyBzZXQgZ2VvbWV0cnkgKyBnZW9tZXRyeVR5cGVcbiAgICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gVXRpbC5ib3VuZHNUb0V4dGVudChnZW9tZXRyeSk7XG4gICAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5RW52ZWxvcGUnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnZlcnQgTC5NYXJrZXIgPiBMLkxhdExuZ1xuICAgIGlmIChnZW9tZXRyeS5nZXRMYXRMbmcpIHtcbiAgICAgIGdlb21ldHJ5ID0gZ2VvbWV0cnkuZ2V0TGF0TG5nKCk7XG4gICAgfVxuXG4gICAgLy8gY29udmVydCBMLkxhdExuZyB0byBhIGdlb2pzb24gcG9pbnQgYW5kIGNvbnRpbnVlO1xuICAgIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIEwuTGF0TG5nKSB7XG4gICAgICBnZW9tZXRyeSA9IHtcbiAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtnZW9tZXRyeS5sbmcsIGdlb21ldHJ5LmxhdF1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIEwuR2VvSlNPTiwgcHVsbCBvdXQgdGhlIGZpcnN0IGdlb21ldHJ5XG4gICAgaWYgKGdlb21ldHJ5IGluc3RhbmNlb2YgTC5HZW9KU09OKSB7XG4gICAgICAvLyByZWFzc2lnbiBnZW9tZXRyeSB0byB0aGUgR2VvSlNPTiB2YWx1ZSAgKHdlIGFyZSBhc3N1bWluZyB0aGF0IG9ubHkgb25lIGZlYXR1cmUgaXMgcHJlc2VudClcbiAgICAgIGdlb21ldHJ5ID0gZ2VvbWV0cnkuZ2V0TGF5ZXJzKClbMF0uZmVhdHVyZS5nZW9tZXRyeTtcbiAgICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gVXRpbC5nZW9qc29uVG9BcmNHSVMoZ2VvbWV0cnkpO1xuICAgICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnlUeXBlID0gVXRpbC5nZW9qc29uVHlwZVRvQXJjR0lTKGdlb21ldHJ5LnR5cGUpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBMLlBvbHlsaW5lIGFuZCBMLlBvbHlnb25cbiAgICBpZiAoZ2VvbWV0cnkudG9HZW9KU09OKSB7XG4gICAgICBnZW9tZXRyeSA9IGdlb21ldHJ5LnRvR2VvSlNPTigpO1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBHZW9KU09OIGZlYXR1cmUgYnkgcHVsbGluZyBvdXQgdGhlIGdlb21ldHJ5XG4gICAgaWYgKGdlb21ldHJ5LnR5cGUgPT09ICdGZWF0dXJlJykge1xuICAgICAgLy8gZ2V0IHRoZSBnZW9tZXRyeSBvZiB0aGUgZ2VvanNvbiBmZWF0dXJlXG4gICAgICBnZW9tZXRyeSA9IGdlb21ldHJ5Lmdlb21ldHJ5O1xuICAgIH1cblxuICAgIC8vIGNvbmZpcm0gdGhhdCBvdXIgR2VvSlNPTiBpcyBhIHBvaW50LCBsaW5lIG9yIHBvbHlnb25cbiAgICBpZiAoZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50JyB8fCBnZW9tZXRyeS50eXBlID09PSAnTGluZVN0cmluZycgfHwgZ2VvbWV0cnkudHlwZSA9PT0gJ1BvbHlnb24nIHx8IGdlb21ldHJ5LnR5cGUgPT09ICdNdWx0aVBvbHlnb24nKSB7XG4gICAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeSA9IFV0aWwuZ2VvanNvblRvQXJjR0lTKGdlb21ldHJ5KTtcbiAgICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5VHlwZSA9IFV0aWwuZ2VvanNvblR5cGVUb0FyY0dJUyhnZW9tZXRyeS50eXBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB3YXJuIHRoZSB1c2VyIGlmIHdlIGhhdm4ndCBmb3VuZCBhbiBhcHByb3ByaWF0ZSBvYmplY3RcbiAgICBVdGlsLndhcm4oJ2ludmFsaWQgZ2VvbWV0cnkgcGFzc2VkIHRvIHNwYXRpYWwgcXVlcnkuIFNob3VsZCBiZSBMLkxhdExuZywgTC5MYXRMbmdCb3VuZHMsIEwuTWFya2VyIG9yIGEgR2VvSlNPTiBQb2ludCwgTGluZSwgUG9seWdvbiBvciBNdWx0aVBvbHlnb24gb2JqZWN0Jyk7XG5cbiAgICByZXR1cm47XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcXVlcnkgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBRdWVyeShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcXVlcnk7XG4iLCJpbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi9UYXNrJztcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWwnO1xuXG5leHBvcnQgdmFyIEZpbmQgPSBUYXNrLmV4dGVuZCh7XG4gIHNldHRlcnM6IHtcbiAgICAvLyBtZXRob2QgbmFtZSA+IHBhcmFtIG5hbWVcbiAgICAnY29udGFpbnMnOiAnY29udGFpbnMnLFxuICAgICd0ZXh0JzogJ3NlYXJjaFRleHQnLFxuICAgICdmaWVsZHMnOiAnc2VhcmNoRmllbGRzJywgLy8gZGVub3RlIGFuIGFycmF5IG9yIHNpbmdsZSBzdHJpbmdcbiAgICAnc3BhdGlhbFJlZmVyZW5jZSc6ICdzcicsXG4gICAgJ3NyJzogJ3NyJyxcbiAgICAnbGF5ZXJzJzogJ2xheWVycycsXG4gICAgJ3JldHVybkdlb21ldHJ5JzogJ3JldHVybkdlb21ldHJ5JyxcbiAgICAnbWF4QWxsb3dhYmxlT2Zmc2V0JzogJ21heEFsbG93YWJsZU9mZnNldCcsXG4gICAgJ3ByZWNpc2lvbic6ICdnZW9tZXRyeVByZWNpc2lvbicsXG4gICAgJ2R5bmFtaWNMYXllcnMnOiAnZHluYW1pY0xheWVycycsXG4gICAgJ3JldHVyblonOiAncmV0dXJuWicsXG4gICAgJ3JldHVybk0nOiAncmV0dXJuTScsXG4gICAgJ2dkYlZlcnNpb24nOiAnZ2RiVmVyc2lvbicsXG4gICAgJ3Rva2VuJzogJ3Rva2VuJ1xuICB9LFxuXG4gIHBhdGg6ICdmaW5kJyxcblxuICBwYXJhbXM6IHtcbiAgICBzcjogNDMyNixcbiAgICBjb250YWluczogdHJ1ZSxcbiAgICByZXR1cm5HZW9tZXRyeTogdHJ1ZSxcbiAgICByZXR1cm5aOiB0cnVlLFxuICAgIHJldHVybk06IGZhbHNlXG4gIH0sXG5cbiAgbGF5ZXJEZWZzOiBmdW5jdGlvbiAoaWQsIHdoZXJlKSB7XG4gICAgdGhpcy5wYXJhbXMubGF5ZXJEZWZzID0gKHRoaXMucGFyYW1zLmxheWVyRGVmcykgPyB0aGlzLnBhcmFtcy5sYXllckRlZnMgKyAnOycgOiAnJztcbiAgICB0aGlzLnBhcmFtcy5sYXllckRlZnMgKz0gKFtpZCwgd2hlcmVdKS5qb2luKCc6Jyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2ltcGxpZnk6IGZ1bmN0aW9uIChtYXAsIGZhY3Rvcikge1xuICAgIHZhciBtYXBXaWR0aCA9IE1hdGguYWJzKG1hcC5nZXRCb3VuZHMoKS5nZXRXZXN0KCkgLSBtYXAuZ2V0Qm91bmRzKCkuZ2V0RWFzdCgpKTtcbiAgICB0aGlzLnBhcmFtcy5tYXhBbGxvd2FibGVPZmZzZXQgPSAobWFwV2lkdGggLyBtYXAuZ2V0U2l6ZSgpLnkpICogZmFjdG9yO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCAocmVzcG9uc2UgJiYgVXRpbC5yZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24ocmVzcG9uc2UpKSwgcmVzcG9uc2UpO1xuICAgIH0sIGNvbnRleHQpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBGaW5kKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmaW5kO1xuIiwiaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vVGFzayc7XG5cbmV4cG9ydCB2YXIgSWRlbnRpZnkgPSBUYXNrLmV4dGVuZCh7XG4gIHBhdGg6ICdpZGVudGlmeScsXG5cbiAgYmV0d2VlbjogZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICB0aGlzLnBhcmFtcy50aW1lID0gW3N0YXJ0LnZhbHVlT2YoKSwgZW5kLnZhbHVlT2YoKV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpZnkgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBJZGVudGlmeShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaWRlbnRpZnk7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IElkZW50aWZ5IH0gZnJvbSAnLi9JZGVudGlmeSc7XG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBJZGVudGlmeUZlYXR1cmVzID0gSWRlbnRpZnkuZXh0ZW5kKHtcbiAgc2V0dGVyczoge1xuICAgICdsYXllcnMnOiAnbGF5ZXJzJyxcbiAgICAncHJlY2lzaW9uJzogJ2dlb21ldHJ5UHJlY2lzaW9uJyxcbiAgICAndG9sZXJhbmNlJzogJ3RvbGVyYW5jZScsXG4gICAgJ3JldHVybkdlb21ldHJ5JzogJ3JldHVybkdlb21ldHJ5J1xuICB9LFxuXG4gIHBhcmFtczoge1xuICAgIHNyOiA0MzI2LFxuICAgIGxheWVyczogJ2FsbCcsXG4gICAgdG9sZXJhbmNlOiAzLFxuICAgIHJldHVybkdlb21ldHJ5OiB0cnVlXG4gIH0sXG5cbiAgb246IGZ1bmN0aW9uIChtYXApIHtcbiAgICB2YXIgZXh0ZW50ID0gVXRpbC5ib3VuZHNUb0V4dGVudChtYXAuZ2V0Qm91bmRzKCkpO1xuICAgIHZhciBzaXplID0gbWFwLmdldFNpemUoKTtcbiAgICB0aGlzLnBhcmFtcy5pbWFnZURpc3BsYXkgPSBbc2l6ZS54LCBzaXplLnksIDk2XTtcbiAgICB0aGlzLnBhcmFtcy5tYXBFeHRlbnQgPSBbZXh0ZW50LnhtaW4sIGV4dGVudC55bWluLCBleHRlbnQueG1heCwgZXh0ZW50LnltYXhdO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGF0OiBmdW5jdGlvbiAobGF0bG5nKSB7XG4gICAgbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcbiAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeSA9IFtsYXRsbmcubG5nLCBsYXRsbmcubGF0XTtcbiAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9pbnQnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGxheWVyRGVmOiBmdW5jdGlvbiAoaWQsIHdoZXJlKSB7XG4gICAgdGhpcy5wYXJhbXMubGF5ZXJEZWZzID0gKHRoaXMucGFyYW1zLmxheWVyRGVmcykgPyB0aGlzLnBhcmFtcy5sYXllckRlZnMgKyAnOycgOiAnJztcbiAgICB0aGlzLnBhcmFtcy5sYXllckRlZnMgKz0gKFtpZCwgd2hlcmVdKS5qb2luKCc6Jyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2ltcGxpZnk6IGZ1bmN0aW9uIChtYXAsIGZhY3Rvcikge1xuICAgIHZhciBtYXBXaWR0aCA9IE1hdGguYWJzKG1hcC5nZXRCb3VuZHMoKS5nZXRXZXN0KCkgLSBtYXAuZ2V0Qm91bmRzKCkuZ2V0RWFzdCgpKTtcbiAgICB0aGlzLnBhcmFtcy5tYXhBbGxvd2FibGVPZmZzZXQgPSAobWFwV2lkdGggLyBtYXAuZ2V0U2l6ZSgpLnkpICogKDEgLSBmYWN0b3IpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAvLyBpbW1lZGlhdGVseSBpbnZva2Ugd2l0aCBhbiBlcnJvclxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHVuZGVmaW5lZCwgcmVzcG9uc2UpO1xuICAgICAgICByZXR1cm47XG5cbiAgICAgIC8vIG9rIG5vIGVycm9yIGxldHMganVzdCBhc3N1bWUgd2UgaGF2ZSBmZWF0dXJlcy4uLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGZlYXR1cmVDb2xsZWN0aW9uID0gVXRpbC5yZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24ocmVzcG9uc2UpO1xuICAgICAgICByZXNwb25zZS5yZXN1bHRzID0gcmVzcG9uc2UucmVzdWx0cy5yZXZlcnNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZmVhdHVyZSA9IGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzW2ldO1xuICAgICAgICAgIGZlYXR1cmUubGF5ZXJJZCA9IHJlc3BvbnNlLnJlc3VsdHNbaV0ubGF5ZXJJZDtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHVuZGVmaW5lZCwgZmVhdHVyZUNvbGxlY3Rpb24sIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGlmeUZlYXR1cmVzIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSWRlbnRpZnlGZWF0dXJlcyhvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaWRlbnRpZnlGZWF0dXJlcztcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgSWRlbnRpZnkgfSBmcm9tICcuL0lkZW50aWZ5JztcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWwnO1xuXG5leHBvcnQgdmFyIElkZW50aWZ5SW1hZ2UgPSBJZGVudGlmeS5leHRlbmQoe1xuICBzZXR0ZXJzOiB7XG4gICAgJ3NldE1vc2FpY1J1bGUnOiAnbW9zYWljUnVsZScsXG4gICAgJ3NldFJlbmRlcmluZ1J1bGUnOiAncmVuZGVyaW5nUnVsZScsXG4gICAgJ3NldFBpeGVsU2l6ZSc6ICdwaXhlbFNpemUnLFxuICAgICdyZXR1cm5DYXRhbG9nSXRlbXMnOiAncmV0dXJuQ2F0YWxvZ0l0ZW1zJyxcbiAgICAncmV0dXJuR2VvbWV0cnknOiAncmV0dXJuR2VvbWV0cnknXG4gIH0sXG5cbiAgcGFyYW1zOiB7XG4gICAgcmV0dXJuR2VvbWV0cnk6IGZhbHNlXG4gIH0sXG5cbiAgYXQ6IGZ1bmN0aW9uIChsYXRsbmcpIHtcbiAgICBsYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgeDogbGF0bG5nLmxuZyxcbiAgICAgIHk6IGxhdGxuZy5sYXQsXG4gICAgICBzcGF0aWFsUmVmZXJlbmNlOiB7XG4gICAgICAgIHdraWQ6IDQzMjZcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9pbnQnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldE1vc2FpY1J1bGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXMubW9zYWljUnVsZTtcbiAgfSxcblxuICBnZXRSZW5kZXJpbmdSdWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zLnJlbmRlcmluZ1J1bGU7XG4gIH0sXG5cbiAgZ2V0UGl4ZWxTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zLnBpeGVsU2l6ZTtcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgKHJlc3BvbnNlICYmIHRoaXMuX3Jlc3BvbnNlVG9HZW9KU09OKHJlc3BvbnNlKSksIHJlc3BvbnNlKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICAvLyBnZXQgcGl4ZWwgZGF0YSBhbmQgcmV0dXJuIGFzIGdlb0pTT04gcG9pbnRcbiAgLy8gcG9wdWxhdGUgY2F0YWxvZyBpdGVtcyAoaWYgYW55KVxuICAvLyBtZXJnaW5nIGluIGFueSBjYXRhbG9nSXRlbVZpc2liaWxpdGllcyBhcyBhIHByb3Blcnkgb2YgZWFjaCBmZWF0dXJlXG4gIF9yZXNwb25zZVRvR2VvSlNPTjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgdmFyIGxvY2F0aW9uID0gcmVzcG9uc2UubG9jYXRpb247XG4gICAgdmFyIGNhdGFsb2dJdGVtcyA9IHJlc3BvbnNlLmNhdGFsb2dJdGVtcztcbiAgICB2YXIgY2F0YWxvZ0l0ZW1WaXNpYmlsaXRpZXMgPSByZXNwb25zZS5jYXRhbG9nSXRlbVZpc2liaWxpdGllcztcbiAgICB2YXIgZ2VvSlNPTiA9IHtcbiAgICAgICdwaXhlbCc6IHtcbiAgICAgICAgJ3R5cGUnOiAnRmVhdHVyZScsXG4gICAgICAgICdnZW9tZXRyeSc6IHtcbiAgICAgICAgICAndHlwZSc6ICdQb2ludCcsXG4gICAgICAgICAgJ2Nvb3JkaW5hdGVzJzogW2xvY2F0aW9uLngsIGxvY2F0aW9uLnldXG4gICAgICAgIH0sXG4gICAgICAgICdjcnMnOiB7XG4gICAgICAgICAgJ3R5cGUnOiAnRVBTRycsXG4gICAgICAgICAgJ3Byb3BlcnRpZXMnOiB7XG4gICAgICAgICAgICAnY29kZSc6IGxvY2F0aW9uLnNwYXRpYWxSZWZlcmVuY2Uud2tpZFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb3BlcnRpZXMnOiB7XG4gICAgICAgICAgJ09CSkVDVElEJzogcmVzcG9uc2Uub2JqZWN0SWQsXG4gICAgICAgICAgJ25hbWUnOiByZXNwb25zZS5uYW1lLFxuICAgICAgICAgICd2YWx1ZSc6IHJlc3BvbnNlLnZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgICdpZCc6IHJlc3BvbnNlLm9iamVjdElkXG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChyZXNwb25zZS5wcm9wZXJ0aWVzICYmIHJlc3BvbnNlLnByb3BlcnRpZXMuVmFsdWVzKSB7XG4gICAgICBnZW9KU09OLnBpeGVsLnByb3BlcnRpZXMudmFsdWVzID0gcmVzcG9uc2UucHJvcGVydGllcy5WYWx1ZXM7XG4gICAgfVxuXG4gICAgaWYgKGNhdGFsb2dJdGVtcyAmJiBjYXRhbG9nSXRlbXMuZmVhdHVyZXMpIHtcbiAgICAgIGdlb0pTT04uY2F0YWxvZ0l0ZW1zID0gVXRpbC5yZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24oY2F0YWxvZ0l0ZW1zKTtcbiAgICAgIGlmIChjYXRhbG9nSXRlbVZpc2liaWxpdGllcyAmJiBjYXRhbG9nSXRlbVZpc2liaWxpdGllcy5sZW5ndGggPT09IGdlb0pTT04uY2F0YWxvZ0l0ZW1zLmZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKHZhciBpID0gY2F0YWxvZ0l0ZW1WaXNpYmlsaXRpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBnZW9KU09OLmNhdGFsb2dJdGVtcy5mZWF0dXJlc1tpXS5wcm9wZXJ0aWVzLmNhdGFsb2dJdGVtVmlzaWJpbGl0eSA9IGNhdGFsb2dJdGVtVmlzaWJpbGl0aWVzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBnZW9KU09OO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpZnlJbWFnZSAocGFyYW1zKSB7XG4gIHJldHVybiBuZXcgSWRlbnRpZnlJbWFnZShwYXJhbXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpZGVudGlmeUltYWdlO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQge2NvcnN9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHtjbGVhblVybH0gZnJvbSAnLi4vVXRpbCc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9SZXF1ZXN0JztcblxuZXhwb3J0IHZhciBTZXJ2aWNlID0gTC5FdmVudGVkLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIHByb3h5OiBmYWxzZSxcbiAgICB1c2VDb3JzOiBjb3JzLFxuICAgIHRpbWVvdXQ6IDBcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuX3JlcXVlc3RRdWV1ZSA9IFtdO1xuICAgIHRoaXMuX2F1dGhlbnRpY2F0aW5nID0gZmFsc2U7XG4gICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zLnVybCA9IGNsZWFuVXJsKHRoaXMub3B0aW9ucy51cmwpO1xuICB9LFxuXG4gIGdldDogZnVuY3Rpb24gKHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnZ2V0JywgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH0sXG5cbiAgcG9zdDogZnVuY3Rpb24gKHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgncG9zdCcsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9LFxuXG4gIHJlcXVlc3Q6IGZ1bmN0aW9uIChwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ3JlcXVlc3QnLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfSxcblxuICBtZXRhZGF0YTogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ2dldCcsICcnLCB7fSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9LFxuXG4gIGF1dGhlbnRpY2F0ZTogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdGhpcy5fYXV0aGVudGljYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLm9wdGlvbnMudG9rZW4gPSB0b2tlbjtcbiAgICB0aGlzLl9ydW5RdWV1ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFRpbWVvdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpbWVvdXQ7XG4gIH0sXG5cbiAgc2V0VGltZW91dDogZnVuY3Rpb24gKHRpbWVvdXQpIHtcbiAgICB0aGlzLm9wdGlvbnMudGltZW91dCA9IHRpbWVvdXQ7XG4gIH0sXG5cbiAgX3JlcXVlc3Q6IGZ1bmN0aW9uIChtZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLmZpcmUoJ3JlcXVlc3RzdGFydCcsIHtcbiAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgfSwgdHJ1ZSk7XG5cbiAgICB2YXIgd3JhcHBlZENhbGxiYWNrID0gdGhpcy5fY3JlYXRlU2VydmljZUNhbGxiYWNrKG1ldGhvZCwgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRva2VuKSB7XG4gICAgICBwYXJhbXMudG9rZW4gPSB0aGlzLm9wdGlvbnMudG9rZW47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2F1dGhlbnRpY2F0aW5nKSB7XG4gICAgICB0aGlzLl9yZXF1ZXN0UXVldWUucHVzaChbbWV0aG9kLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0XSk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cmwgPSAodGhpcy5vcHRpb25zLnByb3h5KSA/IHRoaXMub3B0aW9ucy5wcm94eSArICc/JyArIHRoaXMub3B0aW9ucy51cmwgKyBwYXRoIDogdGhpcy5vcHRpb25zLnVybCArIHBhdGg7XG5cbiAgICAgIGlmICgobWV0aG9kID09PSAnZ2V0JyB8fCBtZXRob2QgPT09ICdyZXF1ZXN0JykgJiYgIXRoaXMub3B0aW9ucy51c2VDb3JzKSB7XG4gICAgICAgIHJldHVybiBSZXF1ZXN0LmdldC5KU09OUCh1cmwsIHBhcmFtcywgd3JhcHBlZENhbGxiYWNrLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBSZXF1ZXN0W21ldGhvZF0odXJsLCBwYXJhbXMsIHdyYXBwZWRDYWxsYmFjaywgY29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9jcmVhdGVTZXJ2aWNlQ2FsbGJhY2s6IGZ1bmN0aW9uIChtZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKGVycm9yICYmIChlcnJvci5jb2RlID09PSA0OTkgfHwgZXJyb3IuY29kZSA9PT0gNDk4KSkge1xuICAgICAgICB0aGlzLl9hdXRoZW50aWNhdGluZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fcmVxdWVzdFF1ZXVlLnB1c2goW21ldGhvZCwgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dF0pO1xuXG4gICAgICAgIC8vIGZpcmUgYW4gZXZlbnQgZm9yIHVzZXJzIHRvIGhhbmRsZSBhbmQgcmUtYXV0aGVudGljYXRlXG4gICAgICAgIHRoaXMuZmlyZSgnYXV0aGVudGljYXRpb25yZXF1aXJlZCcsIHtcbiAgICAgICAgICBhdXRoZW50aWNhdGU6IEwuVXRpbC5iaW5kKHRoaXMuYXV0aGVudGljYXRlLCB0aGlzKVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICAvLyBpZiB0aGUgdXNlciBoYXMgYWNjZXNzIHRvIGEgY2FsbGJhY2sgdGhleSBjYW4gaGFuZGxlIHRoZSBhdXRoIGVycm9yXG4gICAgICAgIGVycm9yLmF1dGhlbnRpY2F0ZSA9IEwuVXRpbC5iaW5kKHRoaXMuYXV0aGVudGljYXRlLCB0aGlzKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5maXJlKCdyZXF1ZXN0ZXJyb3InLCB7XG4gICAgICAgICAgdXJsOiB0aGlzLm9wdGlvbnMudXJsICsgcGF0aCxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuICAgICAgICAgIGNvZGU6IGVycm9yLmNvZGUsXG4gICAgICAgICAgbWV0aG9kOiBtZXRob2RcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpcmUoJ3JlcXVlc3RzdWNjZXNzJywge1xuICAgICAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLFxuICAgICAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmUoJ3JlcXVlc3RlbmQnLCB7XG4gICAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZFxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX3J1blF1ZXVlOiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgaSA9IHRoaXMuX3JlcXVlc3RRdWV1ZS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIHJlcXVlc3QgPSB0aGlzLl9yZXF1ZXN0UXVldWVbaV07XG4gICAgICB2YXIgbWV0aG9kID0gcmVxdWVzdC5zaGlmdCgpO1xuICAgICAgdGhpc1ttZXRob2RdLmFwcGx5KHRoaXMsIHJlcXVlc3QpO1xuICAgIH1cbiAgICB0aGlzLl9yZXF1ZXN0UXVldWUgPSBbXTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VydmljZTtcbiIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuL1NlcnZpY2UnO1xuaW1wb3J0IGlkZW50aWZ5RmVhdHVyZXMgZnJvbSAnLi4vVGFza3MvSWRlbnRpZnlGZWF0dXJlcyc7XG5pbXBvcnQgcXVlcnkgZnJvbSAnLi4vVGFza3MvUXVlcnknO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi4vVGFza3MvRmluZCc7XG5cbmV4cG9ydCB2YXIgTWFwU2VydmljZSA9IFNlcnZpY2UuZXh0ZW5kKHtcblxuICBpZGVudGlmeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBpZGVudGlmeUZlYXR1cmVzKHRoaXMpO1xuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmluZCh0aGlzKTtcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBxdWVyeSh0aGlzKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFNlcnZpY2UgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBNYXBTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBTZXJ2aWNlO1xuIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4vU2VydmljZSc7XG5pbXBvcnQgaWRlbnRpZnlJbWFnZSBmcm9tICcuLi9UYXNrcy9JZGVudGlmeUltYWdlJztcbmltcG9ydCBxdWVyeSBmcm9tICcuLi9UYXNrcy9RdWVyeSc7XG5cbmV4cG9ydCB2YXIgSW1hZ2VTZXJ2aWNlID0gU2VydmljZS5leHRlbmQoe1xuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHF1ZXJ5KHRoaXMpO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGlkZW50aWZ5SW1hZ2UodGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VTZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSW1hZ2VTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbWFnZVNlcnZpY2U7XG4iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi9TZXJ2aWNlJztcbmltcG9ydCBxdWVyeSBmcm9tICcuLi9UYXNrcy9RdWVyeSc7XG5pbXBvcnQgeyBnZW9qc29uVG9BcmNHSVMgfSBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBGZWF0dXJlTGF5ZXJTZXJ2aWNlID0gU2VydmljZS5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBpZEF0dHJpYnV0ZTogJ09CSkVDVElEJ1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHF1ZXJ5KHRoaXMpO1xuICB9LFxuXG4gIGFkZEZlYXR1cmU6IGZ1bmN0aW9uIChmZWF0dXJlLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGRlbGV0ZSBmZWF0dXJlLmlkO1xuXG4gICAgZmVhdHVyZSA9IGdlb2pzb25Ub0FyY0dJUyhmZWF0dXJlKTtcblxuICAgIHJldHVybiB0aGlzLnBvc3QoJ2FkZEZlYXR1cmVzJywge1xuICAgICAgZmVhdHVyZXM6IFtmZWF0dXJlXVxuICAgIH0sIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuYWRkUmVzdWx0cykgPyByZXNwb25zZS5hZGRSZXN1bHRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuYWRkUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICB1cGRhdGVGZWF0dXJlOiBmdW5jdGlvbiAoZmVhdHVyZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBmZWF0dXJlID0gZ2VvanNvblRvQXJjR0lTKGZlYXR1cmUsIHRoaXMub3B0aW9ucy5pZEF0dHJpYnV0ZSk7XG5cbiAgICByZXR1cm4gdGhpcy5wb3N0KCd1cGRhdGVGZWF0dXJlcycsIHtcbiAgICAgIGZlYXR1cmVzOiBbZmVhdHVyZV1cbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gKHJlc3BvbnNlICYmIHJlc3BvbnNlLnVwZGF0ZVJlc3VsdHMpID8gcmVzcG9uc2UudXBkYXRlUmVzdWx0c1swXSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yIHx8IHJlc3BvbnNlLnVwZGF0ZVJlc3VsdHNbMF0uZXJyb3IsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgZGVsZXRlRmVhdHVyZTogZnVuY3Rpb24gKGlkLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnBvc3QoJ2RlbGV0ZUZlYXR1cmVzJywge1xuICAgICAgb2JqZWN0SWRzOiBpZFxuICAgIH0sIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGVsZXRlUmVzdWx0cykgPyByZXNwb25zZS5kZWxldGVSZXN1bHRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuZGVsZXRlUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICBkZWxldGVGZWF0dXJlczogZnVuY3Rpb24gKGlkcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5wb3N0KCdkZWxldGVGZWF0dXJlcycsIHtcbiAgICAgIG9iamVjdElkczogaWRzXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgLy8gcGFzcyBiYWNrIHRoZSBlbnRpcmUgYXJyYXlcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGVsZXRlUmVzdWx0cykgPyByZXNwb25zZS5kZWxldGVSZXN1bHRzIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuZGVsZXRlUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlTGF5ZXJTZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRmVhdHVyZUxheWVyU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmVhdHVyZUxheWVyU2VydmljZTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgcG9pbnRlckV2ZW50cyB9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHtcbiAgc2V0RXNyaUF0dHJpYnV0aW9uLFxuICBfZ2V0QXR0cmlidXRpb25EYXRhLFxuICBfdXBkYXRlTWFwQXR0cmlidXRpb25cbn0gZnJvbSAnLi4vVXRpbCc7XG5cbnZhciB0aWxlUHJvdG9jb2wgPSAod2luZG93LmxvY2F0aW9uLnByb3RvY29sICE9PSAnaHR0cHM6JykgPyAnaHR0cDonIDogJ2h0dHBzOic7XG5cbmV4cG9ydCB2YXIgQmFzZW1hcExheWVyID0gTC5UaWxlTGF5ZXIuZXh0ZW5kKHtcbiAgc3RhdGljczoge1xuICAgIFRJTEVTOiB7XG4gICAgICBTdHJlZXRzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Xb3JsZF9TdHJlZXRfTWFwL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTksXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MsIE5PQUEnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uVXJsOiAnaHR0cHM6Ly9zdGF0aWMuYXJjZ2lzLmNvbS9hdHRyaWJ1dGlvbi9Xb3JsZF9TdHJlZXRfTWFwJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgVG9wb2dyYXBoaWM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX1RvcG9fTWFwL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTksXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MsIE5PQUEnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uVXJsOiAnaHR0cHM6Ly9zdGF0aWMuYXJjZ2lzLmNvbS9hdHRyaWJ1dGlvbi9Xb3JsZF9Ub3BvX01hcCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIE9jZWFuczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vYXJjZ2lzL3Jlc3Qvc2VydmljZXMvT2NlYW4vV29ybGRfT2NlYW5fQmFzZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdVU0dTLCBOT0FBJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvblVybDogJ2h0dHBzOi8vc3RhdGljLmFyY2dpcy5jb20vYXR0cmlidXRpb24vT2NlYW5fQmFzZW1hcCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIE9jZWFuc0xhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vYXJjZ2lzL3Jlc3Qvc2VydmljZXMvT2NlYW4vV29ybGRfT2NlYW5fUmVmZXJlbmNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgTmF0aW9uYWxHZW9ncmFwaGljOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9OYXRHZW9fV29ybGRfTWFwL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ05hdGlvbmFsIEdlb2dyYXBoaWMsIERlTG9ybWUsIEhFUkUsIFVORVAtV0NNQywgVVNHUywgTkFTQSwgRVNBLCBNRVRJLCBOUkNBTiwgR0VCQ08sIE5PQUEsIGluY3JlbWVudCBQIENvcnAuJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgRGFya0dyYXk6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0NhbnZhcy9Xb3JsZF9EYXJrX0dyYXlfQmFzZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdIRVJFLCBEZUxvcm1lLCBNYXBteUluZGlhLCAmY29weTsgT3BlblN0cmVldE1hcCBjb250cmlidXRvcnMnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBEYXJrR3JheUxhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvQ2FudmFzL1dvcmxkX0RhcmtfR3JheV9SZWZlcmVuY2UvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBHcmF5OiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9DYW52YXMvV29ybGRfTGlnaHRfR3JheV9CYXNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0hFUkUsIERlTG9ybWUsIE1hcG15SW5kaWEsICZjb3B5OyBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9ycydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIEdyYXlMYWJlbHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0NhbnZhcy9Xb3JsZF9MaWdodF9HcmF5X1JlZmVyZW5jZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgcGFuZTogKHBvaW50ZXJFdmVudHMpID8gJ2VzcmktbGFiZWxzJyA6ICd0aWxlUGFuZScsXG4gICAgICAgICAgYXR0cmlidXRpb246ICcnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBJbWFnZXJ5OiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Xb3JsZF9JbWFnZXJ5L01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTksXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0RpZ2l0YWxHbG9iZSwgR2VvRXllLCBpLWN1YmVkLCBVU0RBLCBVU0dTLCBBRVgsIEdldG1hcHBpbmcsIEFlcm9ncmlkLCBJR04sIElHUCwgc3dpc3N0b3BvLCBhbmQgdGhlIEdJUyBVc2VyIENvbW11bml0eSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIEltYWdlcnlMYWJlbHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1JlZmVyZW5jZS9Xb3JsZF9Cb3VuZGFyaWVzX2FuZF9QbGFjZXMvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgSW1hZ2VyeVRyYW5zcG9ydGF0aW9uOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9SZWZlcmVuY2UvV29ybGRfVHJhbnNwb3J0YXRpb24vTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBTaGFkZWRSZWxpZWY6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX1NoYWRlZF9SZWxpZWYvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxMyxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnVVNHUydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFNoYWRlZFJlbGllZkxhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvUmVmZXJlbmNlL1dvcmxkX0JvdW5kYXJpZXNfYW5kX1BsYWNlc19BbHRlcm5hdGUvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxMixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgVGVycmFpbjoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfVGVycmFpbl9CYXNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTMsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MsIE5PQUEnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBUZXJyYWluTGFiZWxzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9SZWZlcmVuY2UvV29ybGRfUmVmZXJlbmNlX092ZXJsYXkvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxMyxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgVVNBVG9wbzoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvVVNBX1RvcG9fTWFwcy9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE1LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdVU0dTLCBOYXRpb25hbCBHZW9ncmFwaGljIFNvY2lldHksIGktY3ViZWQnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKGtleSwgb3B0aW9ucykge1xuICAgIHZhciBjb25maWc7XG5cbiAgICAvLyBzZXQgdGhlIGNvbmZpZyB2YXJpYWJsZSB3aXRoIHRoZSBhcHByb3ByaWF0ZSBjb25maWcgb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnICYmIGtleS51cmxUZW1wbGF0ZSAmJiBrZXkub3B0aW9ucykge1xuICAgICAgY29uZmlnID0ga2V5O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYgQmFzZW1hcExheWVyLlRJTEVTW2tleV0pIHtcbiAgICAgIGNvbmZpZyA9IEJhc2VtYXBMYXllci5USUxFU1trZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0wuZXNyaS5CYXNlbWFwTGF5ZXI6IEludmFsaWQgcGFyYW1ldGVyLiBVc2Ugb25lIG9mIFwiU3RyZWV0c1wiLCBcIlRvcG9ncmFwaGljXCIsIFwiT2NlYW5zXCIsIFwiT2NlYW5zTGFiZWxzXCIsIFwiTmF0aW9uYWxHZW9ncmFwaGljXCIsIFwiR3JheVwiLCBcIkdyYXlMYWJlbHNcIiwgXCJEYXJrR3JheVwiLCBcIkRhcmtHcmF5TGFiZWxzXCIsIFwiSW1hZ2VyeVwiLCBcIkltYWdlcnlMYWJlbHNcIiwgXCJJbWFnZXJ5VHJhbnNwb3J0YXRpb25cIiwgXCJTaGFkZWRSZWxpZWZcIiwgXCJTaGFkZWRSZWxpZWZMYWJlbHNcIiwgXCJUZXJyYWluXCIsIFwiVGVycmFpbkxhYmVsc1wiIG9yIFwiVVNBVG9wb1wiJyk7XG4gICAgfVxuXG4gICAgLy8gbWVyZ2UgcGFzc2VkIG9wdGlvbnMgaW50byB0aGUgY29uZmlnIG9wdGlvbnNcbiAgICB2YXIgdGlsZU9wdGlvbnMgPSBMLlV0aWwuZXh0ZW5kKGNvbmZpZy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIHRpbGVPcHRpb25zKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIGNvbmZpZy51cmxUZW1wbGF0ZSArPSAoJz90b2tlbj0nICsgdGhpcy5vcHRpb25zLnRva2VuKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsIHRoZSBpbml0aWFsaXplIG1ldGhvZCBvbiBMLlRpbGVMYXllciB0byBzZXQgZXZlcnl0aGluZyB1cFxuICAgIEwuVGlsZUxheWVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgY29uZmlnLnVybFRlbXBsYXRlLCB0aWxlT3B0aW9ucyk7XG4gIH0sXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICAvLyBpbmNsdWRlICdQb3dlcmVkIGJ5IEVzcmknIGluIG1hcCBhdHRyaWJ1dGlvblxuICAgIHNldEVzcmlBdHRyaWJ1dGlvbihtYXApO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5wYW5lID09PSAnZXNyaS1sYWJlbHMnKSB7XG4gICAgICB0aGlzLl9pbml0UGFuZSgpO1xuICAgIH1cbiAgICAvLyBzb21lIGJhc2VtYXBzIGNhbiBzdXBwbHkgZHluYW1pYyBhdHRyaWJ1dGlvblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXR0cmlidXRpb25VcmwpIHtcbiAgICAgIF9nZXRBdHRyaWJ1dGlvbkRhdGEodGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uVXJsLCBtYXApO1xuICAgIH1cblxuICAgIG1hcC5vbignbW92ZWVuZCcsIF91cGRhdGVNYXBBdHRyaWJ1dGlvbik7XG5cbiAgICBMLlRpbGVMYXllci5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgbWFwLm9mZignbW92ZWVuZCcsIF91cGRhdGVNYXBBdHRyaWJ1dGlvbik7XG4gICAgTC5UaWxlTGF5ZXIucHJvdG90eXBlLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcbiAgfSxcblxuICBfaW5pdFBhbmU6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX21hcC5nZXRQYW5lKHRoaXMub3B0aW9ucy5wYW5lKSkge1xuICAgICAgdmFyIHBhbmUgPSB0aGlzLl9tYXAuY3JlYXRlUGFuZSh0aGlzLm9wdGlvbnMucGFuZSk7XG4gICAgICBwYW5lLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICBwYW5lLnN0eWxlLnpJbmRleCA9IDUwMDtcbiAgICB9XG4gIH0sXG5cbiAgZ2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uKSB7XG4gICAgICB2YXIgYXR0cmlidXRpb24gPSAnPHNwYW4gY2xhc3M9XCJlc3JpLWR5bmFtaWMtYXR0cmlidXRpb25cIj4nICsgdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uICsgJzwvc3Bhbj4nO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cmlidXRpb247XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gYmFzZW1hcExheWVyIChrZXksIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBCYXNlbWFwTGF5ZXIoa2V5LCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZW1hcExheWVyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyB3YXJuLCBjbGVhblVybCwgc2V0RXNyaUF0dHJpYnV0aW9uIH0gZnJvbSAnLi4vVXRpbCc7XG5pbXBvcnQgbWFwU2VydmljZSBmcm9tICcuLi9TZXJ2aWNlcy9NYXBTZXJ2aWNlJztcblxuZXhwb3J0IHZhciBUaWxlZE1hcExheWVyID0gTC5UaWxlTGF5ZXIuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIHpvb21PZmZzZXRBbGxvd2FuY2U6IDAuMSxcbiAgICBlcnJvclRpbGVVcmw6ICdodHRwOi8vZG93bmxvYWRzMi5lc3JpLmNvbS9zdXBwb3J0L1RlY2hBcnRpY2xlcy9ibGFuazI1Ni5wbmcnXG4gIH0sXG5cbiAgc3RhdGljczoge1xuICAgIE1lcmNhdG9yWm9vbUxldmVsczoge1xuICAgICAgJzAnOiAxNTY1NDMuMDMzOTI3OTk5OTksXG4gICAgICAnMSc6IDc4MjcxLjUxNjk2Mzk5OTg5MyxcbiAgICAgICcyJzogMzkxMzUuNzU4NDgyMDAwMDk5LFxuICAgICAgJzMnOiAxOTU2Ny44NzkyNDA5OTk5MDEsXG4gICAgICAnNCc6IDk3ODMuOTM5NjIwNDk5OTU5MyxcbiAgICAgICc1JzogNDg5MS45Njk4MTAyNDk5Nzk3LFxuICAgICAgJzYnOiAyNDQ1Ljk4NDkwNTEyNDk4OTgsXG4gICAgICAnNyc6IDEyMjIuOTkyNDUyNTYyNDg5OSxcbiAgICAgICc4JzogNjExLjQ5NjIyNjI4MTM4MDAyLFxuICAgICAgJzknOiAzMDUuNzQ4MTEzMTQwNTU4MDIsXG4gICAgICAnMTAnOiAxNTIuODc0MDU2NTcwNDExLFxuICAgICAgJzExJzogNzYuNDM3MDI4Mjg1MDczMTk3LFxuICAgICAgJzEyJzogMzguMjE4NTE0MTQyNTM2NTk4LFxuICAgICAgJzEzJzogMTkuMTA5MjU3MDcxMjY4Mjk5LFxuICAgICAgJzE0JzogOS41NTQ2Mjg1MzU2MzQxNDk2LFxuICAgICAgJzE1JzogNC43NzczMTQyNjc5NDkzNjk5LFxuICAgICAgJzE2JzogMi4zODg2NTcxMzM5NzQ2OCxcbiAgICAgICcxNyc6IDEuMTk0MzI4NTY2ODU1MDUwMSxcbiAgICAgICcxOCc6IDAuNTk3MTY0MjgzNTU5ODE2OTksXG4gICAgICAnMTknOiAwLjI5ODU4MjE0MTY0NzYxNjk4LFxuICAgICAgJzIwJzogMC4xNDkyOTEwNzA4MjM4MSxcbiAgICAgICcyMSc6IDAuMDc0NjQ1NTM1NDExOTEsXG4gICAgICAnMjInOiAwLjAzNzMyMjc2NzcwNTk1MjUsXG4gICAgICAnMjMnOiAwLjAxODY2MTM4Mzg1Mjk3NjNcbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zLnVybCA9IGNsZWFuVXJsKG9wdGlvbnMudXJsKTtcbiAgICBvcHRpb25zID0gTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG5cbiAgICAvLyBzZXQgdGhlIHVybHNcbiAgICB0aGlzLnRpbGVVcmwgPSBvcHRpb25zLnVybCArICd0aWxlL3t6fS97eX0ve3h9JztcbiAgICB0aGlzLnNlcnZpY2UgPSBtYXBTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2VydmljZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgIHZhciBhcmNnaXNvbmxpbmUgPSBuZXcgUmVnRXhwKC90aWxlcy5hcmNnaXMob25saW5lKT9cXC5jb20vZyk7XG4gICAgaWYgKGFyY2dpc29ubGluZS50ZXN0KG9wdGlvbnMudXJsKSkge1xuICAgICAgdGhpcy50aWxlVXJsID0gdGhpcy50aWxlVXJsLnJlcGxhY2UoJzovL3RpbGVzJywgJzovL3RpbGVze3N9Jyk7XG4gICAgICBvcHRpb25zLnN1YmRvbWFpbnMgPSBbJzEnLCAnMicsICczJywgJzQnXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRva2VuKSB7XG4gICAgICB0aGlzLnRpbGVVcmwgKz0gKCc/dG9rZW49JyArIHRoaXMub3B0aW9ucy50b2tlbik7XG4gICAgfVxuXG4gICAgLy8gaW5pdCBsYXllciBieSBjYWxsaW5nIFRpbGVMYXllcnMgaW5pdGlhbGl6ZSBtZXRob2RcbiAgICBMLlRpbGVMYXllci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHRoaXMudGlsZVVybCwgb3B0aW9ucyk7XG4gIH0sXG5cbiAgZ2V0VGlsZVVybDogZnVuY3Rpb24gKHRpbGVQb2ludCkge1xuICAgIHJldHVybiBMLlV0aWwudGVtcGxhdGUodGhpcy50aWxlVXJsLCBMLmV4dGVuZCh7XG4gICAgICBzOiB0aGlzLl9nZXRTdWJkb21haW4odGlsZVBvaW50KSxcbiAgICAgIHo6ICh0aGlzLl9sb2RNYXAgJiYgdGhpcy5fbG9kTWFwW3RpbGVQb2ludC56XSkgPyB0aGlzLl9sb2RNYXBbdGlsZVBvaW50LnpdIDogdGlsZVBvaW50LnosIC8vIHRyeSBsb2QgbWFwIGZpcnN0LCB0aGVuIGp1c3QgZGVmdWFsdCB0byB6b29tIGxldmVsXG4gICAgICB4OiB0aWxlUG9pbnQueCxcbiAgICAgIHk6IHRpbGVQb2ludC55XG4gICAgfSwgdGhpcy5vcHRpb25zKSk7XG4gIH0sXG5cbiAgY3JlYXRlVGlsZTogZnVuY3Rpb24gKGNvb3JkcywgZG9uZSkge1xuICAgIHZhciB0aWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICBMLkRvbUV2ZW50Lm9uKHRpbGUsICdsb2FkJywgTC5iaW5kKHRoaXMuX3RpbGVPbkxvYWQsIHRoaXMsIGRvbmUsIHRpbGUpKTtcbiAgICBMLkRvbUV2ZW50Lm9uKHRpbGUsICdlcnJvcicsIEwuYmluZCh0aGlzLl90aWxlT25FcnJvciwgdGhpcywgZG9uZSwgdGlsZSkpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jcm9zc09yaWdpbikge1xuICAgICAgdGlsZS5jcm9zc09yaWdpbiA9ICcnO1xuICAgIH1cblxuICAgIC8qXG4gICAgIEFsdCB0YWcgaXMgc2V0IHRvIGVtcHR5IHN0cmluZyB0byBrZWVwIHNjcmVlbiByZWFkZXJzIGZyb20gcmVhZGluZyBVUkwgYW5kIGZvciBjb21wbGlhbmNlIHJlYXNvbnNcbiAgICAgaHR0cDovL3d3dy53My5vcmcvVFIvV0NBRzIwLVRFQ0hTL0g2N1xuICAgICovXG4gICAgdGlsZS5hbHQgPSAnJztcblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGxvZCBtYXAgb3IgYW4gbG9kIG1hcCB3aXRoIGEgcHJvcGVyIHpvb20gbG9hZCB0aGUgdGlsZVxuICAgIC8vIG90aGVyd2lzZSB3YWl0IGZvciB0aGUgbG9kIG1hcCB0byBiZWNvbWUgYXZhaWxhYmxlXG4gICAgaWYgKCF0aGlzLl9sb2RNYXAgfHwgKHRoaXMuX2xvZE1hcCAmJiB0aGlzLl9sb2RNYXBbY29vcmRzLnpdKSkge1xuICAgICAgdGlsZS5zcmMgPSB0aGlzLmdldFRpbGVVcmwoY29vcmRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbmNlKCdsb2RtYXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRpbGUuc3JjID0gdGhpcy5nZXRUaWxlVXJsKGNvb3Jkcyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGlsZTtcbiAgfSxcblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIC8vIGluY2x1ZGUgJ1Bvd2VyZWQgYnkgRXNyaScgaW4gbWFwIGF0dHJpYnV0aW9uXG4gICAgc2V0RXNyaUF0dHJpYnV0aW9uKG1hcCk7XG5cbiAgICBpZiAoIXRoaXMuX2xvZE1hcCkge1xuICAgICAgdGhpcy5tZXRhZGF0YShmdW5jdGlvbiAoZXJyb3IsIG1ldGFkYXRhKSB7XG4gICAgICAgIGlmICghZXJyb3IgJiYgbWV0YWRhdGEuc3BhdGlhbFJlZmVyZW5jZSkge1xuICAgICAgICAgIHZhciBzciA9IG1ldGFkYXRhLnNwYXRpYWxSZWZlcmVuY2UubGF0ZXN0V2tpZCB8fCBtZXRhZGF0YS5zcGF0aWFsUmVmZXJlbmNlLndraWQ7XG4gICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gJiYgbWFwLmF0dHJpYnV0aW9uQ29udHJvbCAmJiBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gPSBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0O1xuICAgICAgICAgICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5hZGRBdHRyaWJ1dGlvbih0aGlzLmdldEF0dHJpYnV0aW9uKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWFwLm9wdGlvbnMuY3JzID09PSBMLkNSUy5FUFNHMzg1NyAmJiBzciA9PT0gMTAyMTAwIHx8IHNyID09PSAzODU3KSB7XG4gICAgICAgICAgICB0aGlzLl9sb2RNYXAgPSB7fTtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgem9vbSBsZXZlbCBkYXRhXG4gICAgICAgICAgICB2YXIgYXJjZ2lzTE9EcyA9IG1ldGFkYXRhLnRpbGVJbmZvLmxvZHM7XG4gICAgICAgICAgICB2YXIgY29ycmVjdFJlc29sdXRpb25zID0gVGlsZWRNYXBMYXllci5NZXJjYXRvclpvb21MZXZlbHM7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJjZ2lzTE9Ecy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgYXJjZ2lzTE9EID0gYXJjZ2lzTE9Ec1tpXTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgY2kgaW4gY29ycmVjdFJlc29sdXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvcnJlY3RSZXMgPSBjb3JyZWN0UmVzb2x1dGlvbnNbY2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3dpdGhpblBlcmNlbnRhZ2UoYXJjZ2lzTE9ELnJlc29sdXRpb24sIGNvcnJlY3RSZXMsIHRoaXMub3B0aW9ucy56b29tT2Zmc2V0QWxsb3dhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5fbG9kTWFwW2NpXSA9IGFyY2dpc0xPRC5sZXZlbDtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmZpcmUoJ2xvZG1hcCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXByb2o0KSB7XG4gICAgICAgICAgICAgIHdhcm4oJ0wuZXNyaS5UaWxlZE1hcExheWVyIGlzIHVzaW5nIGEgbm9uLW1lcmNhdG9yIHNwYXRpYWwgcmVmZXJlbmNlLiBTdXBwb3J0IG1heSBiZSBhdmFpbGFibGUgdGhyb3VnaCBQcm9qNExlYWZsZXQgaHR0cDovL2VzcmkuZ2l0aHViLmlvL2VzcmktbGVhZmxldC9leGFtcGxlcy9ub24tbWVyY2F0b3ItcHJvamVjdGlvbi5odG1sJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBMLlRpbGVMYXllci5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIG1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UubWV0YWRhdGEoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5pZGVudGlmeSgpO1xuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmZpbmQoKTtcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UucXVlcnkoKTtcbiAgfSxcblxuICBhdXRoZW50aWNhdGU6IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHZhciB0b2tlblFzID0gJz90b2tlbj0nICsgdG9rZW47XG4gICAgdGhpcy50aWxlVXJsID0gKHRoaXMub3B0aW9ucy50b2tlbikgPyB0aGlzLnRpbGVVcmwucmVwbGFjZSgvXFw/dG9rZW49KC4rKS9nLCB0b2tlblFzKSA6IHRoaXMudGlsZVVybCArIHRva2VuUXM7XG4gICAgdGhpcy5vcHRpb25zLnRva2VuID0gdG9rZW47XG4gICAgdGhpcy5zZXJ2aWNlLmF1dGhlbnRpY2F0ZSh0b2tlbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3dpdGhpblBlcmNlbnRhZ2U6IGZ1bmN0aW9uIChhLCBiLCBwZXJjZW50YWdlKSB7XG4gICAgdmFyIGRpZmYgPSBNYXRoLmFicygoYSAvIGIpIC0gMSk7XG4gICAgcmV0dXJuIGRpZmYgPCBwZXJjZW50YWdlO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRpbGVkTWFwTGF5ZXIgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFRpbGVkTWFwTGF5ZXIodXJsLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGlsZWRNYXBMYXllcjtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgY29ycyB9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHsgc2V0RXNyaUF0dHJpYnV0aW9uIH0gZnJvbSAnLi4vVXRpbCc7XG5cbnZhciBPdmVybGF5ID0gTC5JbWFnZU92ZXJsYXkuZXh0ZW5kKHtcbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICB0aGlzLl90b3BMZWZ0ID0gbWFwLmdldFBpeGVsQm91bmRzKCkubWluO1xuICAgIEwuSW1hZ2VPdmVybGF5LnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG4gIF9yZXNldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9tYXAub3B0aW9ucy5jcnMgPT09IEwuQ1JTLkVQU0czODU3KSB7XG4gICAgICBMLkltYWdlT3ZlcmxheS5wcm90b3R5cGUuX3Jlc2V0LmNhbGwodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aGlzLl9pbWFnZSwgdGhpcy5fdG9wTGVmdC5zdWJ0cmFjdCh0aGlzLl9tYXAuZ2V0UGl4ZWxPcmlnaW4oKSkpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCB2YXIgUmFzdGVyTGF5ZXIgPSBMLkxheWVyLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIG9wYWNpdHk6IDEsXG4gICAgcG9zaXRpb246ICdmcm9udCcsXG4gICAgZjogJ2ltYWdlJyxcbiAgICB1c2VDb3JzOiBjb3JzLFxuICAgIGF0dHJpYnV0aW9uOiBudWxsLFxuICAgIGludGVyYWN0aXZlOiBmYWxzZSxcbiAgICBhbHQ6ICcnXG4gIH0sXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICAvLyBpbmNsdWRlICdQb3dlcmVkIGJ5IEVzcmknIGluIG1hcCBhdHRyaWJ1dGlvblxuICAgIHNldEVzcmlBdHRyaWJ1dGlvbihtYXApO1xuXG4gICAgdGhpcy5fdXBkYXRlID0gTC5VdGlsLnRocm90dGxlKHRoaXMuX3VwZGF0ZSwgdGhpcy5vcHRpb25zLnVwZGF0ZUludGVydmFsLCB0aGlzKTtcblxuICAgIG1hcC5vbignbW92ZWVuZCcsIHRoaXMuX3VwZGF0ZSwgdGhpcyk7XG5cbiAgICAvLyBpZiB3ZSBoYWQgYW4gaW1hZ2UgbG9hZGVkIGFuZCBpdCBtYXRjaGVzIHRoZVxuICAgIC8vIGN1cnJlbnQgYm91bmRzIHNob3cgdGhlIGltYWdlIG90aGVyd2lzZSByZW1vdmUgaXRcbiAgICBpZiAodGhpcy5fY3VycmVudEltYWdlICYmIHRoaXMuX2N1cnJlbnRJbWFnZS5fYm91bmRzLmVxdWFscyh0aGlzLl9tYXAuZ2V0Qm91bmRzKCkpKSB7XG4gICAgICBtYXAuYWRkTGF5ZXIodGhpcy5fY3VycmVudEltYWdlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSkge1xuICAgICAgdGhpcy5fbWFwLnJlbW92ZUxheWVyKHRoaXMuX2N1cnJlbnRJbWFnZSk7XG4gICAgICB0aGlzLl9jdXJyZW50SW1hZ2UgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZSgpO1xuXG4gICAgaWYgKHRoaXMuX3BvcHVwKSB7XG4gICAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5fZ2V0UG9wdXBEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX21hcC5vbignZGJsY2xpY2snLCB0aGlzLl9yZXNldFBvcHVwU3RhdGUsIHRoaXMpO1xuICAgIH1cblxuICAgIC8vIGFkZCBjb3B5cmlnaHQgdGV4dCBsaXN0ZWQgaW4gc2VydmljZSBtZXRhZGF0YVxuICAgIHRoaXMubWV0YWRhdGEoZnVuY3Rpb24gKGVyciwgbWV0YWRhdGEpIHtcbiAgICAgIGlmICghZXJyICYmICF0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gJiYgbWFwLmF0dHJpYnV0aW9uQ29udHJvbCAmJiBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0KSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbiA9IG1ldGFkYXRhLmNvcHlyaWdodFRleHQ7XG4gICAgICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuYWRkQXR0cmlidXRpb24odGhpcy5nZXRBdHRyaWJ1dGlvbigpKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UpIHtcbiAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcih0aGlzLl9jdXJyZW50SW1hZ2UpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wb3B1cCkge1xuICAgICAgdGhpcy5fbWFwLm9mZignY2xpY2snLCB0aGlzLl9nZXRQb3B1cERhdGEsIHRoaXMpO1xuICAgICAgdGhpcy5fbWFwLm9mZignZGJsY2xpY2snLCB0aGlzLl9yZXNldFBvcHVwU3RhdGUsIHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMuX21hcC5vZmYoJ21vdmVlbmQnLCB0aGlzLl91cGRhdGUsIHRoaXMpO1xuICB9LFxuXG4gIGJpbmRQb3B1cDogZnVuY3Rpb24gKGZuLCBwb3B1cE9wdGlvbnMpIHtcbiAgICB0aGlzLl9zaG91bGRSZW5kZXJQb3B1cCA9IGZhbHNlO1xuICAgIHRoaXMuX2xhc3RDbGljayA9IGZhbHNlO1xuICAgIHRoaXMuX3BvcHVwID0gTC5wb3B1cChwb3B1cE9wdGlvbnMpO1xuICAgIHRoaXMuX3BvcHVwRnVuY3Rpb24gPSBmbjtcbiAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5fZ2V0UG9wdXBEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX21hcC5vbignZGJsY2xpY2snLCB0aGlzLl9yZXNldFBvcHVwU3RhdGUsIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICB1bmJpbmRQb3B1cDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgIHRoaXMuX21hcC5jbG9zZVBvcHVwKHRoaXMuX3BvcHVwKTtcbiAgICAgIHRoaXMuX21hcC5vZmYoJ2NsaWNrJywgdGhpcy5fZ2V0UG9wdXBEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX21hcC5vZmYoJ2RibGNsaWNrJywgdGhpcy5fcmVzZXRQb3B1cFN0YXRlLCB0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5fcG9wdXAgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBicmluZ1RvRnJvbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9wdGlvbnMucG9zaXRpb24gPSAnZnJvbnQnO1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5icmluZ1RvRnJvbnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYnJpbmdUb0JhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9wdGlvbnMucG9zaXRpb24gPSAnYmFjayc7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSkge1xuICAgICAgdGhpcy5fY3VycmVudEltYWdlLmJyaW5nVG9CYWNrKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbjtcbiAgfSxcblxuICBnZXRPcGFjaXR5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5vcGFjaXR5O1xuICB9LFxuXG4gIHNldE9wYWNpdHk6IGZ1bmN0aW9uIChvcGFjaXR5KSB7XG4gICAgdGhpcy5vcHRpb25zLm9wYWNpdHkgPSBvcGFjaXR5O1xuICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5zZXRPcGFjaXR5KG9wYWNpdHkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFRpbWVSYW5nZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBbdGhpcy5vcHRpb25zLmZyb20sIHRoaXMub3B0aW9ucy50b107XG4gIH0sXG5cbiAgc2V0VGltZVJhbmdlOiBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgICB0aGlzLm9wdGlvbnMuZnJvbSA9IGZyb207XG4gICAgdGhpcy5vcHRpb25zLnRvID0gdG87XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgbWV0YWRhdGE6IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuc2VydmljZS5tZXRhZGF0YShjYWxsYmFjaywgY29udGV4dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYXV0aGVudGljYXRlOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0aGlzLnNlcnZpY2UuYXV0aGVudGljYXRlKHRva2VuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBfcmVuZGVySW1hZ2U6IGZ1bmN0aW9uICh1cmwsIGJvdW5kcywgY29udGVudFR5cGUpIHtcbiAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICAvLyBpZiBubyBvdXRwdXQgZGlyZWN0b3J5IGhhcyBiZWVuIHNwZWNpZmllZCBmb3IgYSBzZXJ2aWNlLCBNSU1FIGRhdGEgd2lsbCBiZSByZXR1cm5lZFxuICAgICAgaWYgKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgIHVybCA9ICdkYXRhOicgKyBjb250ZW50VHlwZSArICc7YmFzZTY0LCcgKyB1cmw7XG4gICAgICB9XG4gICAgICAvLyBjcmVhdGUgYSBuZXcgaW1hZ2Ugb3ZlcmxheSBhbmQgYWRkIGl0IHRvIHRoZSBtYXBcbiAgICAgIC8vIHRvIHN0YXJ0IGxvYWRpbmcgdGhlIGltYWdlXG4gICAgICAvLyBvcGFjaXR5IGlzIDAgd2hpbGUgdGhlIGltYWdlIGlzIGxvYWRpbmdcbiAgICAgIHZhciBpbWFnZSA9IG5ldyBPdmVybGF5KHVybCwgYm91bmRzLCB7XG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLm9wdGlvbnMudXNlQ29ycyxcbiAgICAgICAgYWx0OiB0aGlzLm9wdGlvbnMuYWx0LFxuICAgICAgICBwYW5lOiB0aGlzLm9wdGlvbnMucGFuZSB8fCB0aGlzLmdldFBhbmUoKSxcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRoaXMub3B0aW9ucy5pbnRlcmFjdGl2ZVxuICAgICAgfSkuYWRkVG8odGhpcy5fbWFwKTtcblxuICAgICAgLy8gb25jZSB0aGUgaW1hZ2UgbG9hZHNcbiAgICAgIGltYWdlLm9uY2UoJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICAgICAgdmFyIG5ld0ltYWdlID0gZS50YXJnZXQ7XG4gICAgICAgICAgdmFyIG9sZEltYWdlID0gdGhpcy5fY3VycmVudEltYWdlO1xuXG4gICAgICAgICAgLy8gaWYgdGhlIGJvdW5kcyBvZiB0aGlzIGltYWdlIG1hdGNoZXMgdGhlIGJvdW5kcyB0aGF0XG4gICAgICAgICAgLy8gX3JlbmRlckltYWdlIHdhcyBjYWxsZWQgd2l0aCBhbmQgd2UgaGF2ZSBhIG1hcCB3aXRoIHRoZSBzYW1lIGJvdW5kc1xuICAgICAgICAgIC8vIGhpZGUgdGhlIG9sZCBpbWFnZSBpZiB0aGVyZSBpcyBvbmUgYW5kIHNldCB0aGUgb3BhY2l0eVxuICAgICAgICAgIC8vIG9mIHRoZSBuZXcgaW1hZ2Ugb3RoZXJ3aXNlIHJlbW92ZSB0aGUgbmV3IGltYWdlXG4gICAgICAgICAgaWYgKG5ld0ltYWdlLl9ib3VuZHMuZXF1YWxzKGJvdW5kcykgJiYgbmV3SW1hZ2UuX2JvdW5kcy5lcXVhbHModGhpcy5fbWFwLmdldEJvdW5kcygpKSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEltYWdlID0gbmV3SW1hZ2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucG9zaXRpb24gPT09ICdmcm9udCcpIHtcbiAgICAgICAgICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuYnJpbmdUb0JhY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9jdXJyZW50SW1hZ2UuX21hcCkge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SW1hZ2Uuc2V0T3BhY2l0eSh0aGlzLm9wdGlvbnMub3BhY2l0eSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SW1hZ2UuX21hcC5yZW1vdmVMYXllcih0aGlzLl9jdXJyZW50SW1hZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob2xkSW1hZ2UgJiYgdGhpcy5fbWFwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcihvbGRJbWFnZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvbGRJbWFnZSAmJiBvbGRJbWFnZS5fbWFwKSB7XG4gICAgICAgICAgICAgIG9sZEltYWdlLl9tYXAucmVtb3ZlTGF5ZXIob2xkSW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIobmV3SW1hZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlyZSgnbG9hZCcsIHtcbiAgICAgICAgICBib3VuZHM6IGJvdW5kc1xuICAgICAgICB9KTtcbiAgICAgIH0sIHRoaXMpO1xuXG4gICAgICB0aGlzLmZpcmUoJ2xvYWRpbmcnLCB7XG4gICAgICAgIGJvdW5kczogYm91bmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX3VwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuICAgIHZhciBib3VuZHMgPSB0aGlzLl9tYXAuZ2V0Qm91bmRzKCk7XG5cbiAgICBpZiAodGhpcy5fYW5pbWF0aW5nWm9vbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9tYXAuX3BhblRyYW5zaXRpb24gJiYgdGhpcy5fbWFwLl9wYW5UcmFuc2l0aW9uLl9pblByb2dyZXNzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHpvb20gPiB0aGlzLm9wdGlvbnMubWF4Wm9vbSB8fCB6b29tIDwgdGhpcy5vcHRpb25zLm1pblpvb20pIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5fbWFwLnJlbW92ZUxheWVyKHRoaXMuX2N1cnJlbnRJbWFnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHBhcmFtcyA9IHRoaXMuX2J1aWxkRXhwb3J0UGFyYW1zKCk7XG5cbiAgICB0aGlzLl9yZXF1ZXN0RXhwb3J0KHBhcmFtcywgYm91bmRzKTtcbiAgfSxcblxuICBfcmVuZGVyUG9wdXA6IGZ1bmN0aW9uIChsYXRsbmcsIGVycm9yLCByZXN1bHRzLCByZXNwb25zZSkge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgaWYgKHRoaXMuX3Nob3VsZFJlbmRlclBvcHVwICYmIHRoaXMuX2xhc3RDbGljay5lcXVhbHMobGF0bG5nKSkge1xuICAgICAgLy8gYWRkIHRoZSBwb3B1cCB0byB0aGUgbWFwIHdoZXJlIHRoZSBtb3VzZSB3YXMgY2xpY2tlZCBhdFxuICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl9wb3B1cEZ1bmN0aW9uKGVycm9yLCByZXN1bHRzLCByZXNwb25zZSk7XG4gICAgICBpZiAoY29udGVudCkge1xuICAgICAgICB0aGlzLl9wb3B1cC5zZXRMYXRMbmcobGF0bG5nKS5zZXRDb250ZW50KGNvbnRlbnQpLm9wZW5Pbih0aGlzLl9tYXApO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfcmVzZXRQb3B1cFN0YXRlOiBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuX3Nob3VsZFJlbmRlclBvcHVwID0gZmFsc2U7XG4gICAgdGhpcy5fbGFzdENsaWNrID0gZS5sYXRsbmc7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBSYXN0ZXJMYXllciB9IGZyb20gJy4vUmFzdGVyTGF5ZXInO1xuaW1wb3J0IHsgY2xlYW5VcmwgfSBmcm9tICcuLi9VdGlsJztcbmltcG9ydCBpbWFnZVNlcnZpY2UgZnJvbSAnLi4vU2VydmljZXMvSW1hZ2VTZXJ2aWNlJztcblxuZXhwb3J0IHZhciBJbWFnZU1hcExheWVyID0gUmFzdGVyTGF5ZXIuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgdXBkYXRlSW50ZXJ2YWw6IDE1MCxcbiAgICBmb3JtYXQ6ICdqcGdwbmcnLFxuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIGY6ICdqc29uJ1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5xdWVyeSgpO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5pZGVudGlmeSgpO1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucy51cmwgPSBjbGVhblVybChvcHRpb25zLnVybCk7XG4gICAgdGhpcy5zZXJ2aWNlID0gaW1hZ2VTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2VydmljZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIHNldFBpeGVsVHlwZTogZnVuY3Rpb24gKHBpeGVsVHlwZSkge1xuICAgIHRoaXMub3B0aW9ucy5waXhlbFR5cGUgPSBwaXhlbFR5cGU7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0UGl4ZWxUeXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5waXhlbFR5cGU7XG4gIH0sXG5cbiAgc2V0QmFuZElkczogZnVuY3Rpb24gKGJhbmRJZHMpIHtcbiAgICBpZiAoTC5VdGlsLmlzQXJyYXkoYmFuZElkcykpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5iYW5kSWRzID0gYmFuZElkcy5qb2luKCcsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9ucy5iYW5kSWRzID0gYmFuZElkcy50b1N0cmluZygpO1xuICAgIH1cbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRCYW5kSWRzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5iYW5kSWRzO1xuICB9LFxuXG4gIHNldE5vRGF0YTogZnVuY3Rpb24gKG5vRGF0YSwgbm9EYXRhSW50ZXJwcmV0YXRpb24pIHtcbiAgICBpZiAoTC5VdGlsLmlzQXJyYXkobm9EYXRhKSkge1xuICAgICAgdGhpcy5vcHRpb25zLm5vRGF0YSA9IG5vRGF0YS5qb2luKCcsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9ucy5ub0RhdGEgPSBub0RhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKG5vRGF0YUludGVycHJldGF0aW9uKSB7XG4gICAgICB0aGlzLm9wdGlvbnMubm9EYXRhSW50ZXJwcmV0YXRpb24gPSBub0RhdGFJbnRlcnByZXRhdGlvbjtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0Tm9EYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5ub0RhdGE7XG4gIH0sXG5cbiAgZ2V0Tm9EYXRhSW50ZXJwcmV0YXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5vRGF0YUludGVycHJldGF0aW9uO1xuICB9LFxuXG4gIHNldFJlbmRlcmluZ1J1bGU6IGZ1bmN0aW9uIChyZW5kZXJpbmdSdWxlKSB7XG4gICAgdGhpcy5vcHRpb25zLnJlbmRlcmluZ1J1bGUgPSByZW5kZXJpbmdSdWxlO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICB9LFxuXG4gIGdldFJlbmRlcmluZ1J1bGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJlbmRlcmluZ1J1bGU7XG4gIH0sXG5cbiAgc2V0TW9zYWljUnVsZTogZnVuY3Rpb24gKG1vc2FpY1J1bGUpIHtcbiAgICB0aGlzLm9wdGlvbnMubW9zYWljUnVsZSA9IG1vc2FpY1J1bGU7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gIH0sXG5cbiAgZ2V0TW9zYWljUnVsZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubW9zYWljUnVsZTtcbiAgfSxcblxuICBfZ2V0UG9wdXBEYXRhOiBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBjYWxsYmFjayA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG4gICAgICBzZXRUaW1lb3V0KEwuVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyUG9wdXAoZS5sYXRsbmcsIGVycm9yLCByZXN1bHRzLCByZXNwb25zZSk7XG4gICAgICB9LCB0aGlzKSwgMzAwKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHZhciBpZGVudGlmeVJlcXVlc3QgPSB0aGlzLmlkZW50aWZ5KCkuYXQoZS5sYXRsbmcpO1xuXG4gICAgLy8gc2V0IG1vc2FpYyBydWxlIGZvciBpZGVudGlmeSB0YXNrIGlmIGl0IGlzIHNldCBmb3IgbGF5ZXJcbiAgICBpZiAodGhpcy5vcHRpb25zLm1vc2FpY1J1bGUpIHtcbiAgICAgIGlkZW50aWZ5UmVxdWVzdC5zZXRNb3NhaWNSdWxlKHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlKTtcbiAgICAgIC8vIEBUT0RPOiBmb3JjZSByZXR1cm4gY2F0YWxvZyBpdGVtcyB0b28/XG4gICAgfVxuXG4gICAgLy8gQFRPRE86IHNldCByZW5kZXJpbmcgcnVsZT8gTm90IHN1cmUsXG4gICAgLy8gc29tZXRpbWVzIHlvdSB3YW50IHJhdyBwaXhlbCB2YWx1ZXNcbiAgICAvLyBpZiAodGhpcy5vcHRpb25zLnJlbmRlcmluZ1J1bGUpIHtcbiAgICAvLyAgIGlkZW50aWZ5UmVxdWVzdC5zZXRSZW5kZXJpbmdSdWxlKHRoaXMub3B0aW9ucy5yZW5kZXJpbmdSdWxlKTtcbiAgICAvLyB9XG5cbiAgICBpZGVudGlmeVJlcXVlc3QucnVuKGNhbGxiYWNrKTtcblxuICAgIC8vIHNldCB0aGUgZmxhZ3MgdG8gc2hvdyB0aGUgcG9wdXBcbiAgICB0aGlzLl9zaG91bGRSZW5kZXJQb3B1cCA9IHRydWU7XG4gICAgdGhpcy5fbGFzdENsaWNrID0gZS5sYXRsbmc7XG4gIH0sXG5cbiAgX2J1aWxkRXhwb3J0UGFyYW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRCb3VuZHMoKTtcbiAgICB2YXIgc2l6ZSA9IHRoaXMuX21hcC5nZXRTaXplKCk7XG4gICAgdmFyIG5lID0gdGhpcy5fbWFwLm9wdGlvbnMuY3JzLnByb2plY3QoYm91bmRzLl9ub3J0aEVhc3QpO1xuICAgIHZhciBzdyA9IHRoaXMuX21hcC5vcHRpb25zLmNycy5wcm9qZWN0KGJvdW5kcy5fc291dGhXZXN0KTtcblxuICAgIC8vIGVuc3VyZSB0aGF0IHdlIGRvbid0IGFzayBBcmNHSVMgU2VydmVyIGZvciBhIHRhbGxlciBpbWFnZSB0aGFuIHdlIGhhdmUgYWN0dWFsIG1hcCBkaXNwbGF5aW5nXG4gICAgdmFyIHRvcCA9IHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQoYm91bmRzLl9ub3J0aEVhc3QpO1xuICAgIHZhciBib3R0b20gPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KGJvdW5kcy5fc291dGhXZXN0KTtcblxuICAgIGlmICh0b3AueSA+IDAgfHwgYm90dG9tLnkgPCBzaXplLnkpIHtcbiAgICAgIHNpemUueSA9IGJvdHRvbS55IC0gdG9wLnk7XG4gICAgfVxuXG4gICAgdmFyIHNyID0gcGFyc2VJbnQodGhpcy5fbWFwLm9wdGlvbnMuY3JzLmNvZGUuc3BsaXQoJzonKVsxXSwgMTApO1xuXG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIGJib3g6IFtzdy54LCBzdy55LCBuZS54LCBuZS55XS5qb2luKCcsJyksXG4gICAgICBzaXplOiBzaXplLnggKyAnLCcgKyBzaXplLnksXG4gICAgICBmb3JtYXQ6IHRoaXMub3B0aW9ucy5mb3JtYXQsXG4gICAgICB0cmFuc3BhcmVudDogdGhpcy5vcHRpb25zLnRyYW5zcGFyZW50LFxuICAgICAgYmJveFNSOiBzcixcbiAgICAgIGltYWdlU1I6IHNyXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZnJvbSAmJiB0aGlzLm9wdGlvbnMudG8pIHtcbiAgICAgIHBhcmFtcy50aW1lID0gdGhpcy5vcHRpb25zLmZyb20udmFsdWVPZigpICsgJywnICsgdGhpcy5vcHRpb25zLnRvLnZhbHVlT2YoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnBpeGVsVHlwZSkge1xuICAgICAgcGFyYW1zLnBpeGVsVHlwZSA9IHRoaXMub3B0aW9ucy5waXhlbFR5cGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbnRlcnBvbGF0aW9uKSB7XG4gICAgICBwYXJhbXMuaW50ZXJwb2xhdGlvbiA9IHRoaXMub3B0aW9ucy5pbnRlcnBvbGF0aW9uO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29tcHJlc3Npb25RdWFsaXR5KSB7XG4gICAgICBwYXJhbXMuY29tcHJlc3Npb25RdWFsaXR5ID0gdGhpcy5vcHRpb25zLmNvbXByZXNzaW9uUXVhbGl0eTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmJhbmRJZHMpIHtcbiAgICAgIHBhcmFtcy5iYW5kSWRzID0gdGhpcy5vcHRpb25zLmJhbmRJZHM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5ub0RhdGEpIHtcbiAgICAgIHBhcmFtcy5ub0RhdGEgPSB0aGlzLm9wdGlvbnMubm9EYXRhO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMubm9EYXRhSW50ZXJwcmV0YXRpb24pIHtcbiAgICAgIHBhcmFtcy5ub0RhdGFJbnRlcnByZXRhdGlvbiA9IHRoaXMub3B0aW9ucy5ub0RhdGFJbnRlcnByZXRhdGlvbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZXJ2aWNlLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIHBhcmFtcy50b2tlbiA9IHRoaXMuc2VydmljZS5vcHRpb25zLnRva2VuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZSkge1xuICAgICAgcGFyYW1zLnJlbmRlcmluZ1J1bGUgPSBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlKSB7XG4gICAgICBwYXJhbXMubW9zYWljUnVsZSA9IEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9LFxuXG4gIF9yZXF1ZXN0RXhwb3J0OiBmdW5jdGlvbiAocGFyYW1zLCBib3VuZHMpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmYgPT09ICdqc29uJykge1xuICAgICAgdGhpcy5zZXJ2aWNlLnJlcXVlc3QoJ2V4cG9ydEltYWdlJywgcGFyYW1zLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgICAgICByZXNwb25zZS5ocmVmICs9ICgnP3Rva2VuPScgKyB0aGlzLm9wdGlvbnMudG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlbmRlckltYWdlKHJlc3BvbnNlLmhyZWYsIGJvdW5kcyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1zLmYgPSAnaW1hZ2UnO1xuICAgICAgdGhpcy5fcmVuZGVySW1hZ2UodGhpcy5vcHRpb25zLnVybCArICdleHBvcnRJbWFnZScgKyBMLlV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zKSwgYm91bmRzKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VNYXBMYXllciAodXJsLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSW1hZ2VNYXBMYXllcih1cmwsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbWFnZU1hcExheWVyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBSYXN0ZXJMYXllciB9IGZyb20gJy4vUmFzdGVyTGF5ZXInO1xuaW1wb3J0IHsgY2xlYW5VcmwgfSBmcm9tICcuLi9VdGlsJztcbmltcG9ydCBtYXBTZXJ2aWNlIGZyb20gJy4uL1NlcnZpY2VzL01hcFNlcnZpY2UnO1xuXG5leHBvcnQgdmFyIER5bmFtaWNNYXBMYXllciA9IFJhc3RlckxheWVyLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIHVwZGF0ZUludGVydmFsOiAxNTAsXG4gICAgbGF5ZXJzOiBmYWxzZSxcbiAgICBsYXllckRlZnM6IGZhbHNlLFxuICAgIHRpbWVPcHRpb25zOiBmYWxzZSxcbiAgICBmb3JtYXQ6ICdwbmcyNCcsXG4gICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgZjogJ2pzb24nXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zLnVybCA9IGNsZWFuVXJsKG9wdGlvbnMudXJsKTtcbiAgICB0aGlzLnNlcnZpY2UgPSBtYXBTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2VydmljZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgIGlmICgob3B0aW9ucy5wcm94eSB8fCBvcHRpb25zLnRva2VuKSAmJiBvcHRpb25zLmYgIT09ICdqc29uJykge1xuICAgICAgb3B0aW9ucy5mID0gJ2pzb24nO1xuICAgIH1cblxuICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIGdldER5bmFtaWNMYXllcnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmR5bmFtaWNMYXllcnM7XG4gIH0sXG5cbiAgc2V0RHluYW1pY0xheWVyczogZnVuY3Rpb24gKGR5bmFtaWNMYXllcnMpIHtcbiAgICB0aGlzLm9wdGlvbnMuZHluYW1pY0xheWVycyA9IGR5bmFtaWNMYXllcnM7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0TGF5ZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5sYXllcnM7XG4gIH0sXG5cbiAgc2V0TGF5ZXJzOiBmdW5jdGlvbiAobGF5ZXJzKSB7XG4gICAgdGhpcy5vcHRpb25zLmxheWVycyA9IGxheWVycztcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRMYXllckRlZnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxheWVyRGVmcztcbiAgfSxcblxuICBzZXRMYXllckRlZnM6IGZ1bmN0aW9uIChsYXllckRlZnMpIHtcbiAgICB0aGlzLm9wdGlvbnMubGF5ZXJEZWZzID0gbGF5ZXJEZWZzO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFRpbWVPcHRpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50aW1lT3B0aW9ucztcbiAgfSxcblxuICBzZXRUaW1lT3B0aW9uczogZnVuY3Rpb24gKHRpbWVPcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zLnRpbWVPcHRpb25zID0gdGltZU9wdGlvbnM7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcXVlcnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLnF1ZXJ5KCk7XG4gIH0sXG5cbiAgaWRlbnRpZnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmlkZW50aWZ5KCk7XG4gIH0sXG5cbiAgZmluZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZmluZCgpO1xuICB9LFxuXG4gIF9nZXRQb3B1cERhdGE6IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlQ29sbGVjdGlvbiwgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG4gICAgICBzZXRUaW1lb3V0KEwuVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyUG9wdXAoZS5sYXRsbmcsIGVycm9yLCBmZWF0dXJlQ29sbGVjdGlvbiwgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyksIDMwMCk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB2YXIgaWRlbnRpZnlSZXF1ZXN0ID0gdGhpcy5pZGVudGlmeSgpLm9uKHRoaXMuX21hcCkuYXQoZS5sYXRsbmcpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllcnMpIHtcbiAgICAgIGlkZW50aWZ5UmVxdWVzdC5sYXllcnMoJ3Zpc2libGU6JyArIHRoaXMub3B0aW9ucy5sYXllcnMuam9pbignLCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWRlbnRpZnlSZXF1ZXN0LmxheWVycygndmlzaWJsZScpO1xuICAgIH1cblxuICAgIGlkZW50aWZ5UmVxdWVzdC5ydW4oY2FsbGJhY2spO1xuXG4gICAgLy8gc2V0IHRoZSBmbGFncyB0byBzaG93IHRoZSBwb3B1cFxuICAgIHRoaXMuX3Nob3VsZFJlbmRlclBvcHVwID0gdHJ1ZTtcbiAgICB0aGlzLl9sYXN0Q2xpY2sgPSBlLmxhdGxuZztcbiAgfSxcblxuICBfYnVpbGRFeHBvcnRQYXJhbXM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fbWFwLmdldEJvdW5kcygpO1xuICAgIHZhciBzaXplID0gdGhpcy5fbWFwLmdldFNpemUoKTtcbiAgICB2YXIgbmUgPSB0aGlzLl9tYXAub3B0aW9ucy5jcnMucHJvamVjdChib3VuZHMuZ2V0Tm9ydGhFYXN0KCkpO1xuICAgIHZhciBzdyA9IHRoaXMuX21hcC5vcHRpb25zLmNycy5wcm9qZWN0KGJvdW5kcy5nZXRTb3V0aFdlc3QoKSk7XG4gICAgdmFyIHNyID0gcGFyc2VJbnQodGhpcy5fbWFwLm9wdGlvbnMuY3JzLmNvZGUuc3BsaXQoJzonKVsxXSwgMTApO1xuXG4gICAgLy8gZW5zdXJlIHRoYXQgd2UgZG9uJ3QgYXNrIEFyY0dJUyBTZXJ2ZXIgZm9yIGEgdGFsbGVyIGltYWdlIHRoYW4gd2UgaGF2ZSBhY3R1YWwgbWFwIGRpc3BsYXlpbmdcbiAgICB2YXIgdG9wID0gdGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludChib3VuZHMuX25vcnRoRWFzdCk7XG4gICAgdmFyIGJvdHRvbSA9IHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQoYm91bmRzLl9zb3V0aFdlc3QpO1xuXG4gICAgaWYgKHRvcC55ID4gMCB8fCBib3R0b20ueSA8IHNpemUueSkge1xuICAgICAgc2l6ZS55ID0gYm90dG9tLnkgLSB0b3AueTtcbiAgICB9XG5cbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgYmJveDogW3N3LngsIHN3LnksIG5lLngsIG5lLnldLmpvaW4oJywnKSxcbiAgICAgIHNpemU6IHNpemUueCArICcsJyArIHNpemUueSxcbiAgICAgIGRwaTogOTYsXG4gICAgICBmb3JtYXQ6IHRoaXMub3B0aW9ucy5mb3JtYXQsXG4gICAgICB0cmFuc3BhcmVudDogdGhpcy5vcHRpb25zLnRyYW5zcGFyZW50LFxuICAgICAgYmJveFNSOiBzcixcbiAgICAgIGltYWdlU1I6IHNyXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZHluYW1pY0xheWVycykge1xuICAgICAgcGFyYW1zLmR5bmFtaWNMYXllcnMgPSB0aGlzLm9wdGlvbnMuZHluYW1pY0xheWVycztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVycykge1xuICAgICAgcGFyYW1zLmxheWVycyA9ICdzaG93OicgKyB0aGlzLm9wdGlvbnMubGF5ZXJzLmpvaW4oJywnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyRGVmcykge1xuICAgICAgcGFyYW1zLmxheWVyRGVmcyA9IHR5cGVvZiB0aGlzLm9wdGlvbnMubGF5ZXJEZWZzID09PSAnc3RyaW5nJyA/IHRoaXMub3B0aW9ucy5sYXllckRlZnMgOiBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMubGF5ZXJEZWZzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVPcHRpb25zKSB7XG4gICAgICBwYXJhbXMudGltZU9wdGlvbnMgPSBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMudGltZU9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZnJvbSAmJiB0aGlzLm9wdGlvbnMudG8pIHtcbiAgICAgIHBhcmFtcy50aW1lID0gdGhpcy5vcHRpb25zLmZyb20udmFsdWVPZigpICsgJywnICsgdGhpcy5vcHRpb25zLnRvLnZhbHVlT2YoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZXJ2aWNlLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIHBhcmFtcy50b2tlbiA9IHRoaXMuc2VydmljZS5vcHRpb25zLnRva2VuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMucHJveHkpIHtcbiAgICAgIHBhcmFtcy5wcm94eSA9IHRoaXMub3B0aW9ucy5wcm94eTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9LFxuXG4gIF9yZXF1ZXN0RXhwb3J0OiBmdW5jdGlvbiAocGFyYW1zLCBib3VuZHMpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmYgPT09ICdqc29uJykge1xuICAgICAgdGhpcy5zZXJ2aWNlLnJlcXVlc3QoJ2V4cG9ydCcsIHBhcmFtcywgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9IC8vIHdlIHJlYWxseSBjYW4ndCBkbyBhbnl0aGluZyBoZXJlIGJ1dCBhdXRoZW50aWNhdGUgb3IgcmVxdWVzdGVycm9yIHdpbGwgZmlyZVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgICAgICByZXNwb25zZS5ocmVmICs9ICgnP3Rva2VuPScgKyB0aGlzLm9wdGlvbnMudG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucHJveHkpIHtcbiAgICAgICAgICByZXNwb25zZS5ocmVmID0gdGhpcy5vcHRpb25zLnByb3h5ICsgJz8nICsgcmVzcG9uc2UuaHJlZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzcG9uc2UuaHJlZikge1xuICAgICAgICAgIHRoaXMuX3JlbmRlckltYWdlKHJlc3BvbnNlLmhyZWYsIGJvdW5kcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVySW1hZ2UocmVzcG9uc2UuaW1hZ2VEYXRhLCBib3VuZHMsIHJlc3BvbnNlLmNvbnRlbnRUeXBlKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmFtcy5mID0gJ2ltYWdlJztcbiAgICAgIHRoaXMuX3JlbmRlckltYWdlKHRoaXMub3B0aW9ucy51cmwgKyAnZXhwb3J0JyArIEwuVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMpLCBib3VuZHMpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkeW5hbWljTWFwTGF5ZXIgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IER5bmFtaWNNYXBMYXllcih1cmwsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkeW5hbWljTWFwTGF5ZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcblxudmFyIFZpcnR1YWxHcmlkID0gTC5MYXllci5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBjZWxsU2l6ZTogNTEyLFxuICAgIHVwZGF0ZUludGVydmFsOiAxNTBcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fem9vbWluZyA9IGZhbHNlO1xuICB9LFxuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgdGhpcy5fbWFwID0gbWFwO1xuICAgIHRoaXMuX3VwZGF0ZSA9IEwuVXRpbC50aHJvdHRsZSh0aGlzLl91cGRhdGUsIHRoaXMub3B0aW9ucy51cGRhdGVJbnRlcnZhbCwgdGhpcyk7XG4gICAgdGhpcy5fcmVzZXQoKTtcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgfSxcblxuICBvblJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX21hcC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZ2V0RXZlbnRzKCksIHRoaXMpO1xuICAgIHRoaXMuX3JlbW92ZUNlbGxzKCk7XG4gIH0sXG5cbiAgZ2V0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV2ZW50cyA9IHtcbiAgICAgIG1vdmVlbmQ6IHRoaXMuX3VwZGF0ZSxcbiAgICAgIHpvb21zdGFydDogdGhpcy5fem9vbXN0YXJ0LFxuICAgICAgem9vbWVuZDogdGhpcy5fcmVzZXRcbiAgICB9O1xuXG4gICAgcmV0dXJuIGV2ZW50cztcbiAgfSxcblxuICBhZGRUbzogZnVuY3Rpb24gKG1hcCkge1xuICAgIG1hcC5hZGRMYXllcih0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZW1vdmVGcm9tOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgbWFwLnJlbW92ZUxheWVyKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIF96b29tc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl96b29taW5nID0gdHJ1ZTtcbiAgfSxcblxuICBfcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9yZW1vdmVDZWxscygpO1xuXG4gICAgdGhpcy5fY2VsbHMgPSB7fTtcbiAgICB0aGlzLl9hY3RpdmVDZWxscyA9IHt9O1xuICAgIHRoaXMuX2NlbGxzVG9Mb2FkID0gMDtcbiAgICB0aGlzLl9jZWxsc1RvdGFsID0gMDtcbiAgICB0aGlzLl9jZWxsTnVtQm91bmRzID0gdGhpcy5fZ2V0Q2VsbE51bUJvdW5kcygpO1xuXG4gICAgdGhpcy5fcmVzZXRXcmFwKCk7XG4gICAgdGhpcy5fem9vbWluZyA9IGZhbHNlO1xuICB9LFxuXG4gIF9yZXNldFdyYXA6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuICAgIHZhciBjcnMgPSBtYXAub3B0aW9ucy5jcnM7XG5cbiAgICBpZiAoY3JzLmluZmluaXRlKSB7IHJldHVybjsgfVxuXG4gICAgdmFyIGNlbGxTaXplID0gdGhpcy5fZ2V0Q2VsbFNpemUoKTtcblxuICAgIGlmIChjcnMud3JhcExuZykge1xuICAgICAgdGhpcy5fd3JhcExuZyA9IFtcbiAgICAgICAgTWF0aC5mbG9vcihtYXAucHJvamVjdChbMCwgY3JzLndyYXBMbmdbMF1dKS54IC8gY2VsbFNpemUpLFxuICAgICAgICBNYXRoLmNlaWwobWFwLnByb2plY3QoWzAsIGNycy53cmFwTG5nWzFdXSkueCAvIGNlbGxTaXplKVxuICAgICAgXTtcbiAgICB9XG5cbiAgICBpZiAoY3JzLndyYXBMYXQpIHtcbiAgICAgIHRoaXMuX3dyYXBMYXQgPSBbXG4gICAgICAgIE1hdGguZmxvb3IobWFwLnByb2plY3QoW2Nycy53cmFwTGF0WzBdLCAwXSkueSAvIGNlbGxTaXplKSxcbiAgICAgICAgTWF0aC5jZWlsKG1hcC5wcm9qZWN0KFtjcnMud3JhcExhdFsxXSwgMF0pLnkgLyBjZWxsU2l6ZSlcbiAgICAgIF07XG4gICAgfVxuICB9LFxuXG4gIF9nZXRDZWxsU2l6ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2VsbFNpemU7XG4gIH0sXG5cbiAgX3VwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRQaXhlbEJvdW5kcygpO1xuICAgIHZhciBjZWxsU2l6ZSA9IHRoaXMuX2dldENlbGxTaXplKCk7XG5cbiAgICAvLyBjZWxsIGNvb3JkaW5hdGVzIHJhbmdlIGZvciB0aGUgY3VycmVudCB2aWV3XG4gICAgdmFyIGNlbGxCb3VuZHMgPSBMLmJvdW5kcyhcbiAgICAgIGJvdW5kcy5taW4uZGl2aWRlQnkoY2VsbFNpemUpLmZsb29yKCksXG4gICAgICBib3VuZHMubWF4LmRpdmlkZUJ5KGNlbGxTaXplKS5mbG9vcigpKTtcblxuICAgIHRoaXMuX3JlbW92ZU90aGVyQ2VsbHMoY2VsbEJvdW5kcyk7XG4gICAgdGhpcy5fYWRkQ2VsbHMoY2VsbEJvdW5kcyk7XG5cbiAgICB0aGlzLmZpcmUoJ2NlbGxzdXBkYXRlZCcpO1xuICB9LFxuXG4gIF9hZGRDZWxsczogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgIHZhciBjZW50ZXIgPSBib3VuZHMuZ2V0Q2VudGVyKCk7XG4gICAgdmFyIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuXG4gICAgdmFyIGosIGksIGNvb3JkcztcbiAgICAvLyBjcmVhdGUgYSBxdWV1ZSBvZiBjb29yZGluYXRlcyB0byBsb2FkIGNlbGxzIGZyb21cbiAgICBmb3IgKGogPSBib3VuZHMubWluLnk7IGogPD0gYm91bmRzLm1heC55OyBqKyspIHtcbiAgICAgIGZvciAoaSA9IGJvdW5kcy5taW4ueDsgaSA8PSBib3VuZHMubWF4Lng7IGkrKykge1xuICAgICAgICBjb29yZHMgPSBMLnBvaW50KGksIGopO1xuICAgICAgICBjb29yZHMueiA9IHpvb207XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzVmFsaWRDZWxsKGNvb3JkcykpIHtcbiAgICAgICAgICBxdWV1ZS5wdXNoKGNvb3Jkcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2VsbHNUb0xvYWQgPSBxdWV1ZS5sZW5ndGg7XG5cbiAgICBpZiAoY2VsbHNUb0xvYWQgPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICB0aGlzLl9jZWxsc1RvTG9hZCArPSBjZWxsc1RvTG9hZDtcbiAgICB0aGlzLl9jZWxsc1RvdGFsICs9IGNlbGxzVG9Mb2FkO1xuXG4gICAgLy8gc29ydCBjZWxsIHF1ZXVlIHRvIGxvYWQgY2VsbHMgaW4gb3JkZXIgb2YgdGhlaXIgZGlzdGFuY2UgdG8gY2VudGVyXG4gICAgcXVldWUuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEuZGlzdGFuY2VUbyhjZW50ZXIpIC0gYi5kaXN0YW5jZVRvKGNlbnRlcik7XG4gICAgfSk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgY2VsbHNUb0xvYWQ7IGkrKykge1xuICAgICAgdGhpcy5fYWRkQ2VsbChxdWV1ZVtpXSk7XG4gICAgfVxuICB9LFxuXG4gIF9pc1ZhbGlkQ2VsbDogZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIHZhciBjcnMgPSB0aGlzLl9tYXAub3B0aW9ucy5jcnM7XG5cbiAgICBpZiAoIWNycy5pbmZpbml0ZSkge1xuICAgICAgLy8gZG9uJ3QgbG9hZCBjZWxsIGlmIGl0J3Mgb3V0IG9mIGJvdW5kcyBhbmQgbm90IHdyYXBwZWRcbiAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsTnVtQm91bmRzO1xuICAgICAgaWYgKFxuICAgICAgICAoIWNycy53cmFwTG5nICYmIChjb29yZHMueCA8IGJvdW5kcy5taW4ueCB8fCBjb29yZHMueCA+IGJvdW5kcy5tYXgueCkpIHx8XG4gICAgICAgICghY3JzLndyYXBMYXQgJiYgKGNvb3Jkcy55IDwgYm91bmRzLm1pbi55IHx8IGNvb3Jkcy55ID4gYm91bmRzLm1heC55KSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYm91bmRzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBkb24ndCBsb2FkIGNlbGwgaWYgaXQgZG9lc24ndCBpbnRlcnNlY3QgdGhlIGJvdW5kcyBpbiBvcHRpb25zXG4gICAgdmFyIGNlbGxCb3VuZHMgPSB0aGlzLl9jZWxsQ29vcmRzVG9Cb3VuZHMoY29vcmRzKTtcbiAgICByZXR1cm4gTC5sYXRMbmdCb3VuZHModGhpcy5vcHRpb25zLmJvdW5kcykuaW50ZXJzZWN0cyhjZWxsQm91bmRzKTtcbiAgfSxcblxuICAvLyBjb252ZXJ0cyBjZWxsIGNvb3JkaW5hdGVzIHRvIGl0cyBnZW9ncmFwaGljYWwgYm91bmRzXG4gIF9jZWxsQ29vcmRzVG9Cb3VuZHM6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuICAgIHZhciBjZWxsU2l6ZSA9IHRoaXMub3B0aW9ucy5jZWxsU2l6ZTtcbiAgICB2YXIgbndQb2ludCA9IGNvb3Jkcy5tdWx0aXBseUJ5KGNlbGxTaXplKTtcbiAgICB2YXIgc2VQb2ludCA9IG53UG9pbnQuYWRkKFtjZWxsU2l6ZSwgY2VsbFNpemVdKTtcbiAgICB2YXIgbncgPSBtYXAud3JhcExhdExuZyhtYXAudW5wcm9qZWN0KG53UG9pbnQsIGNvb3Jkcy56KSk7XG4gICAgdmFyIHNlID0gbWFwLndyYXBMYXRMbmcobWFwLnVucHJvamVjdChzZVBvaW50LCBjb29yZHMueikpO1xuXG4gICAgcmV0dXJuIEwubGF0TG5nQm91bmRzKG53LCBzZSk7XG4gIH0sXG5cbiAgLy8gY29udmVydHMgY2VsbCBjb29yZGluYXRlcyB0byBrZXkgZm9yIHRoZSBjZWxsIGNhY2hlXG4gIF9jZWxsQ29vcmRzVG9LZXk6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICByZXR1cm4gY29vcmRzLnggKyAnOicgKyBjb29yZHMueTtcbiAgfSxcblxuICAvLyBjb252ZXJ0cyBjZWxsIGNhY2hlIGtleSB0byBjb29yZGlhbnRlc1xuICBfa2V5VG9DZWxsQ29vcmRzOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGtBcnIgPSBrZXkuc3BsaXQoJzonKTtcbiAgICB2YXIgeCA9IHBhcnNlSW50KGtBcnJbMF0sIDEwKTtcbiAgICB2YXIgeSA9IHBhcnNlSW50KGtBcnJbMV0sIDEwKTtcblxuICAgIHJldHVybiBMLnBvaW50KHgsIHkpO1xuICB9LFxuXG4gIC8vIHJlbW92ZSBhbnkgcHJlc2VudCBjZWxscyB0aGF0IGFyZSBvZmYgdGhlIHNwZWNpZmllZCBib3VuZHNcbiAgX3JlbW92ZU90aGVyQ2VsbHM6IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICAgIGlmICghYm91bmRzLmNvbnRhaW5zKHRoaXMuX2tleVRvQ2VsbENvb3JkcyhrZXkpKSkge1xuICAgICAgICB0aGlzLl9yZW1vdmVDZWxsKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9yZW1vdmVDZWxsOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLl9hY3RpdmVDZWxsc1trZXldO1xuXG4gICAgaWYgKGNlbGwpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9hY3RpdmVDZWxsc1trZXldO1xuXG4gICAgICBpZiAodGhpcy5jZWxsTGVhdmUpIHtcbiAgICAgICAgdGhpcy5jZWxsTGVhdmUoY2VsbC5ib3VuZHMsIGNlbGwuY29vcmRzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maXJlKCdjZWxsbGVhdmUnLCB7XG4gICAgICAgIGJvdW5kczogY2VsbC5ib3VuZHMsXG4gICAgICAgIGNvb3JkczogY2VsbC5jb29yZHNcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBfcmVtb3ZlQ2VsbHM6IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsc1trZXldLmJvdW5kcztcbiAgICAgIHZhciBjb29yZHMgPSB0aGlzLl9jZWxsc1trZXldLmNvb3JkcztcblxuICAgICAgaWYgKHRoaXMuY2VsbExlYXZlKSB7XG4gICAgICAgIHRoaXMuY2VsbExlYXZlKGJvdW5kcywgY29vcmRzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maXJlKCdjZWxsbGVhdmUnLCB7XG4gICAgICAgIGJvdW5kczogYm91bmRzLFxuICAgICAgICBjb29yZHM6IGNvb3Jkc1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIF9hZGRDZWxsOiBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgLy8gd3JhcCBjZWxsIGNvb3JkcyBpZiBuZWNlc3NhcnkgKGRlcGVuZGluZyBvbiBDUlMpXG4gICAgdGhpcy5fd3JhcENvb3Jkcyhjb29yZHMpO1xuXG4gICAgLy8gZ2VuZXJhdGUgdGhlIGNlbGwga2V5XG4gICAgdmFyIGtleSA9IHRoaXMuX2NlbGxDb29yZHNUb0tleShjb29yZHMpO1xuXG4gICAgLy8gZ2V0IHRoZSBjZWxsIGZyb20gdGhlIGNhY2hlXG4gICAgdmFyIGNlbGwgPSB0aGlzLl9jZWxsc1trZXldO1xuICAgIC8vIGlmIHRoaXMgY2VsbCBzaG91bGQgYmUgc2hvd24gYXMgaXNudCBhY3RpdmUgeWV0IChlbnRlcilcblxuICAgIGlmIChjZWxsICYmICF0aGlzLl9hY3RpdmVDZWxsc1trZXldKSB7XG4gICAgICBpZiAodGhpcy5jZWxsRW50ZXIpIHtcbiAgICAgICAgdGhpcy5jZWxsRW50ZXIoY2VsbC5ib3VuZHMsIGNvb3Jkcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlyZSgnY2VsbGVudGVyJywge1xuICAgICAgICBib3VuZHM6IGNlbGwuYm91bmRzLFxuICAgICAgICBjb29yZHM6IGNvb3Jkc1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2FjdGl2ZUNlbGxzW2tleV0gPSBjZWxsO1xuICAgIH1cblxuICAgIC8vIGlmIHdlIGRvbnQgaGF2ZSB0aGlzIGNlbGwgaW4gdGhlIGNhY2hlIHlldCAoY3JlYXRlKVxuICAgIGlmICghY2VsbCkge1xuICAgICAgY2VsbCA9IHtcbiAgICAgICAgY29vcmRzOiBjb29yZHMsXG4gICAgICAgIGJvdW5kczogdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3JkcylcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX2NlbGxzW2tleV0gPSBjZWxsO1xuICAgICAgdGhpcy5fYWN0aXZlQ2VsbHNba2V5XSA9IGNlbGw7XG5cbiAgICAgIGlmICh0aGlzLmNyZWF0ZUNlbGwpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVDZWxsKGNlbGwuYm91bmRzLCBjb29yZHMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmUoJ2NlbGxjcmVhdGUnLCB7XG4gICAgICAgIGJvdW5kczogY2VsbC5ib3VuZHMsXG4gICAgICAgIGNvb3JkczogY29vcmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX3dyYXBDb29yZHM6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICBjb29yZHMueCA9IHRoaXMuX3dyYXBMbmcgPyBMLlV0aWwud3JhcE51bShjb29yZHMueCwgdGhpcy5fd3JhcExuZykgOiBjb29yZHMueDtcbiAgICBjb29yZHMueSA9IHRoaXMuX3dyYXBMYXQgPyBMLlV0aWwud3JhcE51bShjb29yZHMueSwgdGhpcy5fd3JhcExhdCkgOiBjb29yZHMueTtcbiAgfSxcblxuICAvLyBnZXQgdGhlIGdsb2JhbCBjZWxsIGNvb3JkaW5hdGVzIHJhbmdlIGZvciB0aGUgY3VycmVudCB6b29tXG4gIF9nZXRDZWxsTnVtQm91bmRzOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRQaXhlbFdvcmxkQm91bmRzKCk7XG4gICAgdmFyIHNpemUgPSB0aGlzLl9nZXRDZWxsU2l6ZSgpO1xuXG4gICAgcmV0dXJuIGJvdW5kcyA/IEwuYm91bmRzKFxuICAgICAgICBib3VuZHMubWluLmRpdmlkZUJ5KHNpemUpLmZsb29yKCksXG4gICAgICAgIGJvdW5kcy5tYXguZGl2aWRlQnkoc2l6ZSkuY2VpbCgpLnN1YnRyYWN0KFsxLCAxXSkpIDogbnVsbDtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFZpcnR1YWxHcmlkO1xuIiwiZnVuY3Rpb24gQmluYXJ5U2VhcmNoSW5kZXggKHZhbHVlcykge1xuICB0aGlzLnZhbHVlcyA9IFtdLmNvbmNhdCh2YWx1ZXMgfHwgW10pO1xufVxuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleCh2YWx1ZSk7XG4gIHJldHVybiB0aGlzLnZhbHVlc1tpbmRleF07XG59O1xuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUuZ2V0SW5kZXggPSBmdW5jdGlvbiBnZXRJbmRleCAodmFsdWUpIHtcbiAgaWYgKHRoaXMuZGlydHkpIHtcbiAgICB0aGlzLnNvcnQoKTtcbiAgfVxuXG4gIHZhciBtaW5JbmRleCA9IDA7XG4gIHZhciBtYXhJbmRleCA9IHRoaXMudmFsdWVzLmxlbmd0aCAtIDE7XG4gIHZhciBjdXJyZW50SW5kZXg7XG4gIHZhciBjdXJyZW50RWxlbWVudDtcblxuICB3aGlsZSAobWluSW5kZXggPD0gbWF4SW5kZXgpIHtcbiAgICBjdXJyZW50SW5kZXggPSAobWluSW5kZXggKyBtYXhJbmRleCkgLyAyIHwgMDtcbiAgICBjdXJyZW50RWxlbWVudCA9IHRoaXMudmFsdWVzW01hdGgucm91bmQoY3VycmVudEluZGV4KV07XG4gICAgaWYgKCtjdXJyZW50RWxlbWVudC52YWx1ZSA8ICt2YWx1ZSkge1xuICAgICAgbWluSW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xuICAgIH0gZWxzZSBpZiAoK2N1cnJlbnRFbGVtZW50LnZhbHVlID4gK3ZhbHVlKSB7XG4gICAgICBtYXhJbmRleCA9IGN1cnJlbnRJbmRleCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdXJyZW50SW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE1hdGguYWJzKH5tYXhJbmRleCk7XG59O1xuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUuYmV0d2VlbiA9IGZ1bmN0aW9uIGJldHdlZW4gKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHN0YXJ0SW5kZXggPSB0aGlzLmdldEluZGV4KHN0YXJ0KTtcbiAgdmFyIGVuZEluZGV4ID0gdGhpcy5nZXRJbmRleChlbmQpO1xuXG4gIGlmIChzdGFydEluZGV4ID09PSAwICYmIGVuZEluZGV4ID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgd2hpbGUgKHRoaXMudmFsdWVzW3N0YXJ0SW5kZXggLSAxXSAmJiB0aGlzLnZhbHVlc1tzdGFydEluZGV4IC0gMV0udmFsdWUgPT09IHN0YXJ0KSB7XG4gICAgc3RhcnRJbmRleC0tO1xuICB9XG5cbiAgd2hpbGUgKHRoaXMudmFsdWVzW2VuZEluZGV4ICsgMV0gJiYgdGhpcy52YWx1ZXNbZW5kSW5kZXggKyAxXS52YWx1ZSA9PT0gZW5kKSB7XG4gICAgZW5kSW5kZXgrKztcbiAgfVxuXG4gIGlmICh0aGlzLnZhbHVlc1tlbmRJbmRleF0gJiYgdGhpcy52YWx1ZXNbZW5kSW5kZXhdLnZhbHVlID09PSBlbmQgJiYgdGhpcy52YWx1ZXNbZW5kSW5kZXggKyAxXSkge1xuICAgIGVuZEluZGV4Kys7XG4gIH1cblxuICByZXR1cm4gdGhpcy52YWx1ZXMuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xufTtcblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIGluc2VydCAoaXRlbSkge1xuICB0aGlzLnZhbHVlcy5zcGxpY2UodGhpcy5nZXRJbmRleChpdGVtLnZhbHVlKSwgMCwgaXRlbSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLmJ1bGtBZGQgPSBmdW5jdGlvbiBidWxrQWRkIChpdGVtcywgc29ydCkge1xuICB0aGlzLnZhbHVlcyA9IHRoaXMudmFsdWVzLmNvbmNhdChbXS5jb25jYXQoaXRlbXMgfHwgW10pKTtcblxuICBpZiAoc29ydCkge1xuICAgIHRoaXMuc29ydCgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUuc29ydCA9IGZ1bmN0aW9uIHNvcnQgKCkge1xuICB0aGlzLnZhbHVlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuICtiLnZhbHVlIC0gK2EudmFsdWU7XG4gIH0pLnJldmVyc2UoKTtcbiAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJpbmFyeVNlYXJjaEluZGV4O1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgZmVhdHVyZUxheWVyU2VydmljZSBmcm9tICcuLi8uLi9TZXJ2aWNlcy9GZWF0dXJlTGF5ZXJTZXJ2aWNlJztcbmltcG9ydCB7IGNsZWFuVXJsLCB3YXJuLCBzZXRFc3JpQXR0cmlidXRpb24gfSBmcm9tICcuLi8uLi9VdGlsJztcbmltcG9ydCBWaXJ0dWFsR3JpZCBmcm9tICdsZWFmbGV0LXZpcnR1YWwtZ3JpZCc7XG5pbXBvcnQgQmluYXJ5U2VhcmNoSW5kZXggZnJvbSAndGlueS1iaW5hcnktc2VhcmNoJztcblxuZXhwb3J0IHZhciBGZWF0dXJlTWFuYWdlciA9IFZpcnR1YWxHcmlkLmV4dGVuZCh7XG4gIC8qKlxuICAgKiBPcHRpb25zXG4gICAqL1xuXG4gIG9wdGlvbnM6IHtcbiAgICBhdHRyaWJ1dGlvbjogbnVsbCxcbiAgICB3aGVyZTogJzE9MScsXG4gICAgZmllbGRzOiBbJyonXSxcbiAgICBmcm9tOiBmYWxzZSxcbiAgICB0bzogZmFsc2UsXG4gICAgdGltZUZpZWxkOiBmYWxzZSxcbiAgICB0aW1lRmlsdGVyTW9kZTogJ3NlcnZlcicsXG4gICAgc2ltcGxpZnlGYWN0b3I6IDAsXG4gICAgcHJlY2lzaW9uOiA2XG4gIH0sXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqL1xuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgVmlydHVhbEdyaWQucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICAgIG9wdGlvbnMudXJsID0gY2xlYW5Vcmwob3B0aW9ucy51cmwpO1xuICAgIG9wdGlvbnMgPSBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnNlcnZpY2UgPSBmZWF0dXJlTGF5ZXJTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2VydmljZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgIC8vIHVzZSBjYXNlIGluc2Vuc2l0aXZlIHJlZ2V4IHRvIGxvb2sgZm9yIGNvbW1vbiBmaWVsZG5hbWVzIHVzZWQgZm9yIGluZGV4aW5nXG4gICAgaWYgKHRoaXMub3B0aW9ucy5maWVsZHNbMF0gIT09ICcqJykge1xuICAgICAgdmFyIG9pZENoZWNrID0gZmFsc2U7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5maWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5maWVsZHNbaV0ubWF0Y2goL14oT0JKRUNUSUR8RklEfE9JRHxJRCkkL2kpKSB7XG4gICAgICAgICAgb2lkQ2hlY2sgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAob2lkQ2hlY2sgPT09IGZhbHNlKSB7XG4gICAgICAgIHdhcm4oJ25vIGtub3duIGVzcmlGaWVsZFR5cGVPSUQgZmllbGQgZGV0ZWN0ZWQgaW4gZmllbGRzIEFycmF5LiAgUGxlYXNlIGFkZCBhbiBhdHRyaWJ1dGUgZmllbGQgY29udGFpbmluZyB1bmlxdWUgSURzIHRvIGVuc3VyZSB0aGUgbGF5ZXIgY2FuIGJlIGRyYXduIGNvcnJlY3RseS4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWVsZC5zdGFydCAmJiB0aGlzLm9wdGlvbnMudGltZUZpZWxkLmVuZCkge1xuICAgICAgdGhpcy5fc3RhcnRUaW1lSW5kZXggPSBuZXcgQmluYXJ5U2VhcmNoSW5kZXgoKTtcbiAgICAgIHRoaXMuX2VuZFRpbWVJbmRleCA9IG5ldyBCaW5hcnlTZWFyY2hJbmRleCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWVsZCkge1xuICAgICAgdGhpcy5fdGltZUluZGV4ID0gbmV3IEJpbmFyeVNlYXJjaEluZGV4KCk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2FjaGUgPSB7fTtcbiAgICB0aGlzLl9jdXJyZW50U25hcHNob3QgPSBbXTsgLy8gY2FjaGUgb2Ygd2hhdCBsYXllcnMgc2hvdWxkIGJlIGFjdGl2ZVxuICAgIHRoaXMuX2FjdGl2ZVJlcXVlc3RzID0gMDtcbiAgfSxcblxuICAvKipcbiAgICogTGF5ZXIgSW50ZXJmYWNlXG4gICAqL1xuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgLy8gaW5jbHVkZSAnUG93ZXJlZCBieSBFc3JpJyBpbiBtYXAgYXR0cmlidXRpb25cbiAgICBzZXRFc3JpQXR0cmlidXRpb24obWFwKTtcblxuICAgIHRoaXMuc2VydmljZS5tZXRhZGF0YShmdW5jdGlvbiAoZXJyLCBtZXRhZGF0YSkge1xuICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgdmFyIHN1cHBvcnRlZEZvcm1hdHMgPSBtZXRhZGF0YS5zdXBwb3J0ZWRRdWVyeUZvcm1hdHM7XG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSB3aGV0aGVyIHNlcnZpY2UgY2FuIGVtaXQgR2VvSlNPTiBuYXRpdmVseVxuICAgICAgICBpZiAoc3VwcG9ydGVkRm9ybWF0cyAmJiBzdXBwb3J0ZWRGb3JtYXRzLmluZGV4T2YoJ2dlb0pTT04nKSAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLnNlcnZpY2Uub3B0aW9ucy5pc01vZGVybiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWRkIGNvcHlyaWdodCB0ZXh0IGxpc3RlZCBpbiBzZXJ2aWNlIG1ldGFkYXRhXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uICYmIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wgJiYgbWV0YWRhdGEuY29weXJpZ2h0VGV4dCkge1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbiA9IG1ldGFkYXRhLmNvcHlyaWdodFRleHQ7XG4gICAgICAgICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5hZGRBdHRyaWJ1dGlvbih0aGlzLmdldEF0dHJpYnV0aW9uKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBtYXAub24oJ3pvb21lbmQnLCB0aGlzLl9oYW5kbGVab29tQ2hhbmdlLCB0aGlzKTtcblxuICAgIHJldHVybiBWaXJ0dWFsR3JpZC5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgbWFwLm9mZignem9vbWVuZCcsIHRoaXMuX2hhbmRsZVpvb21DaGFuZ2UsIHRoaXMpO1xuXG4gICAgcmV0dXJuIFZpcnR1YWxHcmlkLnByb3RvdHlwZS5vblJlbW92ZS5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG5cbiAgZ2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGZWF0dXJlIE1hbmFnZW1lbnRcbiAgICovXG5cbiAgY3JlYXRlQ2VsbDogZnVuY3Rpb24gKGJvdW5kcywgY29vcmRzKSB7XG4gICAgdGhpcy5fcmVxdWVzdEZlYXR1cmVzKGJvdW5kcywgY29vcmRzKTtcbiAgfSxcblxuICBfcmVxdWVzdEZlYXR1cmVzOiBmdW5jdGlvbiAoYm91bmRzLCBjb29yZHMsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fYWN0aXZlUmVxdWVzdHMrKztcblxuICAgIC8vIG91ciBmaXJzdCBhY3RpdmUgcmVxdWVzdCBmaXJlcyBsb2FkaW5nXG4gICAgaWYgKHRoaXMuX2FjdGl2ZVJlcXVlc3RzID09PSAxKSB7XG4gICAgICB0aGlzLmZpcmUoJ2xvYWRpbmcnLCB7XG4gICAgICAgIGJvdW5kczogYm91bmRzXG4gICAgICB9LCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fYnVpbGRRdWVyeShib3VuZHMpLnJ1bihmdW5jdGlvbiAoZXJyb3IsIGZlYXR1cmVDb2xsZWN0aW9uLCByZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmV4Y2VlZGVkVHJhbnNmZXJMaW1pdCkge1xuICAgICAgICB0aGlzLmZpcmUoJ2RyYXdsaW1pdGV4Y2VlZGVkJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIG5vIGVycm9yLCBmZWF0dXJlc1xuICAgICAgaWYgKCFlcnJvciAmJiBmZWF0dXJlQ29sbGVjdGlvbiAmJiBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gc2NoZWR1bGUgYWRkaW5nIGZlYXR1cmVzIHVudGlsIHRoZSBuZXh0IGFuaW1hdGlvbiBmcmFtZVxuICAgICAgICBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZShMLlV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5fYWRkRmVhdHVyZXMoZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMsIGNvb3Jkcyk7XG4gICAgICAgICAgdGhpcy5fcG9zdFByb2Nlc3NGZWF0dXJlcyhib3VuZHMpO1xuICAgICAgICB9LCB0aGlzKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIG5vIGVycm9yLCBubyBmZWF0dXJlc1xuICAgICAgaWYgKCFlcnJvciAmJiBmZWF0dXJlQ29sbGVjdGlvbiAmJiAhZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX3Bvc3RQcm9jZXNzRmVhdHVyZXMoYm91bmRzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHRoaXMuX3Bvc3RQcm9jZXNzRmVhdHVyZXMoYm91bmRzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZXJyb3IsIGZlYXR1cmVDb2xsZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBfcG9zdFByb2Nlc3NGZWF0dXJlczogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIC8vIGRlaW5jcmltZW50IHRoZSByZXF1ZXN0IGNvdW50ZXIgbm93IHRoYXQgd2UgaGF2ZSBwcm9jZXNzZWQgZmVhdHVyZXNcbiAgICB0aGlzLl9hY3RpdmVSZXF1ZXN0cy0tO1xuXG4gICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgYWN0aXZlIHJlcXVlc3RzIGZpcmUgYSBsb2FkIGV2ZW50IGZvciB0aGlzIHZpZXdcbiAgICBpZiAodGhpcy5fYWN0aXZlUmVxdWVzdHMgPD0gMCkge1xuICAgICAgdGhpcy5maXJlKCdsb2FkJywge1xuICAgICAgICBib3VuZHM6IGJvdW5kc1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIF9jYWNoZUtleTogZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIHJldHVybiBjb29yZHMueiArICc6JyArIGNvb3Jkcy54ICsgJzonICsgY29vcmRzLnk7XG4gIH0sXG5cbiAgX2FkZEZlYXR1cmVzOiBmdW5jdGlvbiAoZmVhdHVyZXMsIGNvb3Jkcykge1xuICAgIHZhciBrZXkgPSB0aGlzLl9jYWNoZUtleShjb29yZHMpO1xuICAgIHRoaXMuX2NhY2hlW2tleV0gPSB0aGlzLl9jYWNoZVtrZXldIHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IGZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgaWQgPSBmZWF0dXJlc1tpXS5pZDtcbiAgICAgIHRoaXMuX2N1cnJlbnRTbmFwc2hvdC5wdXNoKGlkKTtcbiAgICAgIHRoaXMuX2NhY2hlW2tleV0ucHVzaChpZCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQpIHtcbiAgICAgIHRoaXMuX2J1aWxkVGltZUluZGV4ZXMoZmVhdHVyZXMpO1xuICAgIH1cblxuICAgIC8vIG5lZWQgdG8gUFIgcmVtb3ZhbCBvZiB0aGUgbG9naWMgYmVsb3cgdG9vLi4uXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BhdHJpY2thcmx0L2xlYWZsZXQtdmlydHVhbC1ncmlkL2Jsb2IvbWFzdGVyL3NyYy92aXJ0dWFsLWdyaWQuanMjTDEwMC1MMTAyXG5cbiAgICB0aGlzLmNyZWF0ZUxheWVycyhmZWF0dXJlcyk7XG4gIH0sXG5cbiAgX2J1aWxkUXVlcnk6IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLnNlcnZpY2UucXVlcnkoKVxuICAgICAgLmludGVyc2VjdHMoYm91bmRzKVxuICAgICAgLndoZXJlKHRoaXMub3B0aW9ucy53aGVyZSlcbiAgICAgIC5maWVsZHModGhpcy5vcHRpb25zLmZpZWxkcylcbiAgICAgIC5wcmVjaXNpb24odGhpcy5vcHRpb25zLnByZWNpc2lvbik7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnNpbXBsaWZ5RmFjdG9yKSB7XG4gICAgICBxdWVyeS5zaW1wbGlmeSh0aGlzLl9tYXAsIHRoaXMub3B0aW9ucy5zaW1wbGlmeUZhY3Rvcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmlsdGVyTW9kZSA9PT0gJ3NlcnZlcicgJiYgdGhpcy5vcHRpb25zLmZyb20gJiYgdGhpcy5vcHRpb25zLnRvKSB7XG4gICAgICBxdWVyeS5iZXR3ZWVuKHRoaXMub3B0aW9ucy5mcm9tLCB0aGlzLm9wdGlvbnMudG8pO1xuICAgIH1cblxuICAgIHJldHVybiBxdWVyeTtcbiAgfSxcblxuICAvKipcbiAgICogV2hlcmUgTWV0aG9kc1xuICAgKi9cblxuICBzZXRXaGVyZTogZnVuY3Rpb24gKHdoZXJlLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMub3B0aW9ucy53aGVyZSA9ICh3aGVyZSAmJiB3aGVyZS5sZW5ndGgpID8gd2hlcmUgOiAnMT0xJztcblxuICAgIHZhciBvbGRTbmFwc2hvdCA9IFtdO1xuICAgIHZhciBuZXdTbmFwc2hvdCA9IFtdO1xuICAgIHZhciBwZW5kaW5nUmVxdWVzdHMgPSAwO1xuICAgIHZhciByZXF1ZXN0RXJyb3IgPSBudWxsO1xuICAgIHZhciByZXF1ZXN0Q2FsbGJhY2sgPSBMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIGZlYXR1cmVDb2xsZWN0aW9uKSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVxdWVzdEVycm9yID0gZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGlmIChmZWF0dXJlQ29sbGVjdGlvbikge1xuICAgICAgICBmb3IgKHZhciBpID0gZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBuZXdTbmFwc2hvdC5wdXNoKGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzW2ldLmlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwZW5kaW5nUmVxdWVzdHMtLTtcblxuICAgICAgaWYgKHBlbmRpbmdSZXF1ZXN0cyA8PSAwKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRTbmFwc2hvdCA9IG5ld1NuYXBzaG90O1xuICAgICAgICAvLyBzY2hlZHVsZSBhZGRpbmcgZmVhdHVyZXMgZm9yIHRoZSBuZXh0IGFuaW1hdGlvbiBmcmFtZVxuICAgICAgICBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZShMLlV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMYXllcnMob2xkU25hcHNob3QpO1xuICAgICAgICAgIHRoaXMuYWRkTGF5ZXJzKG5ld1NuYXBzaG90KTtcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgcmVxdWVzdEVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcblxuICAgIGZvciAodmFyIGkgPSB0aGlzLl9jdXJyZW50U25hcHNob3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIG9sZFNuYXBzaG90LnB1c2godGhpcy5fY3VycmVudFNuYXBzaG90W2ldKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fYWN0aXZlQ2VsbHMpIHtcbiAgICAgIHBlbmRpbmdSZXF1ZXN0cysrO1xuICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuX2tleVRvQ2VsbENvb3JkcyhrZXkpO1xuICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuX2NlbGxDb29yZHNUb0JvdW5kcyhjb29yZHMpO1xuICAgICAgdGhpcy5fcmVxdWVzdEZlYXR1cmVzKGJvdW5kcywga2V5LCByZXF1ZXN0Q2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFdoZXJlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy53aGVyZTtcbiAgfSxcblxuICAvKipcbiAgICogVGltZSBSYW5nZSBNZXRob2RzXG4gICAqL1xuXG4gIGdldFRpbWVSYW5nZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBbdGhpcy5vcHRpb25zLmZyb20sIHRoaXMub3B0aW9ucy50b107XG4gIH0sXG5cbiAgc2V0VGltZVJhbmdlOiBmdW5jdGlvbiAoZnJvbSwgdG8sIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdmFyIG9sZEZyb20gPSB0aGlzLm9wdGlvbnMuZnJvbTtcbiAgICB2YXIgb2xkVG8gPSB0aGlzLm9wdGlvbnMudG87XG4gICAgdmFyIHBlbmRpbmdSZXF1ZXN0cyA9IDA7XG4gICAgdmFyIHJlcXVlc3RFcnJvciA9IG51bGw7XG4gICAgdmFyIHJlcXVlc3RDYWxsYmFjayA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJlcXVlc3RFcnJvciA9IGVycm9yO1xuICAgICAgfVxuICAgICAgdGhpcy5fZmlsdGVyRXhpc3RpbmdGZWF0dXJlcyhvbGRGcm9tLCBvbGRUbywgZnJvbSwgdG8pO1xuXG4gICAgICBwZW5kaW5nUmVxdWVzdHMtLTtcblxuICAgICAgaWYgKGNhbGxiYWNrICYmIHBlbmRpbmdSZXF1ZXN0cyA8PSAwKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgcmVxdWVzdEVycm9yKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcblxuICAgIHRoaXMub3B0aW9ucy5mcm9tID0gZnJvbTtcbiAgICB0aGlzLm9wdGlvbnMudG8gPSB0bztcblxuICAgIHRoaXMuX2ZpbHRlckV4aXN0aW5nRmVhdHVyZXMob2xkRnJvbSwgb2xkVG8sIGZyb20sIHRvKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZUZpbHRlck1vZGUgPT09ICdzZXJ2ZXInKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fYWN0aXZlQ2VsbHMpIHtcbiAgICAgICAgcGVuZGluZ1JlcXVlc3RzKys7XG4gICAgICAgIHZhciBjb29yZHMgPSB0aGlzLl9rZXlUb0NlbGxDb29yZHMoa2V5KTtcbiAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuX2NlbGxDb29yZHNUb0JvdW5kcyhjb29yZHMpO1xuICAgICAgICB0aGlzLl9yZXF1ZXN0RmVhdHVyZXMoYm91bmRzLCBrZXksIHJlcXVlc3RDYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcmVmcmVzaDogZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9hY3RpdmVDZWxscykge1xuICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuX2tleVRvQ2VsbENvb3JkcyhrZXkpO1xuICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuX2NlbGxDb29yZHNUb0JvdW5kcyhjb29yZHMpO1xuICAgICAgdGhpcy5fcmVxdWVzdEZlYXR1cmVzKGJvdW5kcywga2V5KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZWRyYXcpIHtcbiAgICAgIHRoaXMub25jZSgnbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICB0aGlzLl9yZWRyYXcobGF5ZXIuZmVhdHVyZS5pZCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICB9LFxuXG4gIF9maWx0ZXJFeGlzdGluZ0ZlYXR1cmVzOiBmdW5jdGlvbiAob2xkRnJvbSwgb2xkVG8sIG5ld0Zyb20sIG5ld1RvKSB7XG4gICAgdmFyIGxheWVyc1RvUmVtb3ZlID0gKG9sZEZyb20gJiYgb2xkVG8pID8gdGhpcy5fZ2V0RmVhdHVyZXNJblRpbWVSYW5nZShvbGRGcm9tLCBvbGRUbykgOiB0aGlzLl9jdXJyZW50U25hcHNob3Q7XG4gICAgdmFyIGxheWVyc1RvQWRkID0gdGhpcy5fZ2V0RmVhdHVyZXNJblRpbWVSYW5nZShuZXdGcm9tLCBuZXdUbyk7XG5cbiAgICBpZiAobGF5ZXJzVG9BZGQuaW5kZXhPZikge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXllcnNUb0FkZC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc2hvdWxkUmVtb3ZlTGF5ZXIgPSBsYXllcnNUb1JlbW92ZS5pbmRleE9mKGxheWVyc1RvQWRkW2ldKTtcbiAgICAgICAgaWYgKHNob3VsZFJlbW92ZUxheWVyID49IDApIHtcbiAgICAgICAgICBsYXllcnNUb1JlbW92ZS5zcGxpY2Uoc2hvdWxkUmVtb3ZlTGF5ZXIsIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2NoZWR1bGUgYWRkaW5nIGZlYXR1cmVzIHVudGlsIHRoZSBuZXh0IGFuaW1hdGlvbiBmcmFtZVxuICAgIEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKEwuVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKGxheWVyc1RvUmVtb3ZlKTtcbiAgICAgIHRoaXMuYWRkTGF5ZXJzKGxheWVyc1RvQWRkKTtcbiAgICB9LCB0aGlzKSk7XG4gIH0sXG5cbiAgX2dldEZlYXR1cmVzSW5UaW1lUmFuZ2U6IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgdmFyIGlkcyA9IFtdO1xuICAgIHZhciBzZWFyY2g7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWVsZC5zdGFydCAmJiB0aGlzLm9wdGlvbnMudGltZUZpZWxkLmVuZCkge1xuICAgICAgdmFyIHN0YXJ0VGltZXMgPSB0aGlzLl9zdGFydFRpbWVJbmRleC5iZXR3ZWVuKHN0YXJ0LCBlbmQpO1xuICAgICAgdmFyIGVuZFRpbWVzID0gdGhpcy5fZW5kVGltZUluZGV4LmJldHdlZW4oc3RhcnQsIGVuZCk7XG4gICAgICBzZWFyY2ggPSBzdGFydFRpbWVzLmNvbmNhdChlbmRUaW1lcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlYXJjaCA9IHRoaXMuX3RpbWVJbmRleC5iZXR3ZWVuKHN0YXJ0LCBlbmQpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSBzZWFyY2gubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGlkcy5wdXNoKHNlYXJjaFtpXS5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfSxcblxuICBfYnVpbGRUaW1lSW5kZXhlczogZnVuY3Rpb24gKGdlb2pzb24pIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgZmVhdHVyZTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWVsZC5zdGFydCAmJiB0aGlzLm9wdGlvbnMudGltZUZpZWxkLmVuZCkge1xuICAgICAgdmFyIHN0YXJ0VGltZUVudHJpZXMgPSBbXTtcbiAgICAgIHZhciBlbmRUaW1lRW50cmllcyA9IFtdO1xuICAgICAgZm9yIChpID0gZ2VvanNvbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBmZWF0dXJlID0gZ2VvanNvbltpXTtcbiAgICAgICAgc3RhcnRUaW1lRW50cmllcy5wdXNoKHtcbiAgICAgICAgICBpZDogZmVhdHVyZS5pZCxcbiAgICAgICAgICB2YWx1ZTogbmV3IERhdGUoZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnRdKVxuICAgICAgICB9KTtcbiAgICAgICAgZW5kVGltZUVudHJpZXMucHVzaCh7XG4gICAgICAgICAgaWQ6IGZlYXR1cmUuaWQsXG4gICAgICAgICAgdmFsdWU6IG5ldyBEYXRlKGZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkLmVuZF0pXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5fc3RhcnRUaW1lSW5kZXguYnVsa0FkZChzdGFydFRpbWVFbnRyaWVzKTtcbiAgICAgIHRoaXMuX2VuZFRpbWVJbmRleC5idWxrQWRkKGVuZFRpbWVFbnRyaWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRpbWVFbnRyaWVzID0gW107XG4gICAgICBmb3IgKGkgPSBnZW9qc29uLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGZlYXR1cmUgPSBnZW9qc29uW2ldO1xuICAgICAgICB0aW1lRW50cmllcy5wdXNoKHtcbiAgICAgICAgICBpZDogZmVhdHVyZS5pZCxcbiAgICAgICAgICB2YWx1ZTogbmV3IERhdGUoZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy50aW1lRmllbGRdKVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fdGltZUluZGV4LmJ1bGtBZGQodGltZUVudHJpZXMpO1xuICAgIH1cbiAgfSxcblxuICBfZmVhdHVyZVdpdGhpblRpbWVSYW5nZTogZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5mcm9tIHx8ICF0aGlzLm9wdGlvbnMudG8pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBmcm9tID0gK3RoaXMub3B0aW9ucy5mcm9tLnZhbHVlT2YoKTtcbiAgICB2YXIgdG8gPSArdGhpcy5vcHRpb25zLnRvLnZhbHVlT2YoKTtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnRpbWVGaWVsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBkYXRlID0gK2ZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkXTtcbiAgICAgIHJldHVybiAoZGF0ZSA+PSBmcm9tKSAmJiAoZGF0ZSA8PSB0byk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnQgJiYgdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmQpIHtcbiAgICAgIHZhciBzdGFydERhdGUgPSArZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnRdO1xuICAgICAgdmFyIGVuZERhdGUgPSArZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy50aW1lRmllbGQuZW5kXTtcbiAgICAgIHJldHVybiAoKHN0YXJ0RGF0ZSA+PSBmcm9tKSAmJiAoc3RhcnREYXRlIDw9IHRvKSkgfHwgKChlbmREYXRlID49IGZyb20pICYmIChlbmREYXRlIDw9IHRvKSk7XG4gICAgfVxuICB9LFxuXG4gIF92aXNpYmxlWm9vbTogZnVuY3Rpb24gKCkge1xuICAgIC8vIGNoZWNrIHRvIHNlZSB3aGV0aGVyIHRoZSBjdXJyZW50IHpvb20gbGV2ZWwgb2YgdGhlIG1hcCBpcyB3aXRoaW4gdGhlIG9wdGlvbmFsIGxpbWl0IGRlZmluZWQgZm9yIHRoZSBGZWF0dXJlTGF5ZXJcbiAgICBpZiAoIXRoaXMuX21hcCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgem9vbSA9IHRoaXMuX21hcC5nZXRab29tKCk7XG4gICAgaWYgKHpvb20gPiB0aGlzLm9wdGlvbnMubWF4Wm9vbSB8fCB6b29tIDwgdGhpcy5vcHRpb25zLm1pblpvb20pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgeyByZXR1cm4gdHJ1ZTsgfVxuICB9LFxuXG4gIF9oYW5kbGVab29tQ2hhbmdlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLl92aXNpYmxlWm9vbSgpKSB7XG4gICAgICB0aGlzLnJlbW92ZUxheWVycyh0aGlzLl9jdXJyZW50U25hcHNob3QpO1xuICAgICAgdGhpcy5fY3VycmVudFNuYXBzaG90ID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qXG4gICAgICBmb3IgZXZlcnkgY2VsbCBpbiB0aGlzLl9hY3RpdmVDZWxsc1xuICAgICAgICAxLiBHZXQgdGhlIGNhY2hlIGtleSBmb3IgdGhlIGNvb3JkcyBvZiB0aGUgY2VsbFxuICAgICAgICAyLiBJZiB0aGlzLl9jYWNoZVtrZXldIGV4aXN0cyBpdCB3aWxsIGJlIGFuIGFycmF5IG9mIGZlYXR1cmUgSURzLlxuICAgICAgICAzLiBDYWxsIHRoaXMuYWRkTGF5ZXJzKHRoaXMuX2NhY2hlW2tleV0pIHRvIGluc3RydWN0IHRoZSBmZWF0dXJlIGxheWVyIHRvIGFkZCB0aGUgbGF5ZXJzIGJhY2suXG4gICAgICAqL1xuICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLl9hY3RpdmVDZWxscykge1xuICAgICAgICB2YXIgY29vcmRzID0gdGhpcy5fYWN0aXZlQ2VsbHNbaV0uY29vcmRzO1xuICAgICAgICB2YXIga2V5ID0gdGhpcy5fY2FjaGVLZXkoY29vcmRzKTtcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlW2tleV0pIHtcbiAgICAgICAgICB0aGlzLmFkZExheWVycyh0aGlzLl9jYWNoZVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogU2VydmljZSBNZXRob2RzXG4gICAqL1xuXG4gIGF1dGhlbnRpY2F0ZTogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdGhpcy5zZXJ2aWNlLmF1dGhlbnRpY2F0ZSh0b2tlbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgbWV0YWRhdGE6IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuc2VydmljZS5tZXRhZGF0YShjYWxsYmFjaywgY29udGV4dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcXVlcnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLnF1ZXJ5KCk7XG4gIH0sXG5cbiAgX2dldE1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICBpZiAodGhpcy5fbWV0YWRhdGEpIHtcbiAgICAgIHZhciBlcnJvcjtcbiAgICAgIGNhbGxiYWNrKGVycm9yLCB0aGlzLl9tZXRhZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWV0YWRhdGEoTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgICB0aGlzLl9tZXRhZGF0YSA9IHJlc3BvbnNlO1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgdGhpcy5fbWV0YWRhdGEpO1xuICAgICAgfSwgdGhpcykpO1xuICAgIH1cbiAgfSxcblxuICBhZGRGZWF0dXJlOiBmdW5jdGlvbiAoZmVhdHVyZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9nZXRNZXRhZGF0YShMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIG1ldGFkYXRhKSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7IGNhbGxiYWNrLmNhbGwodGhpcywgZXJyb3IsIG51bGwpOyB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXJ2aWNlLmFkZEZlYXR1cmUoZmVhdHVyZSwgTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgLy8gYXNzaWduIElEIGZyb20gcmVzdWx0IHRvIGFwcHJvcHJpYXRlIG9iamVjdGlkIGZpZWxkIGZyb20gc2VydmljZSBtZXRhZGF0YVxuICAgICAgICAgIGZlYXR1cmUucHJvcGVydGllc1ttZXRhZGF0YS5vYmplY3RJZEZpZWxkXSA9IHJlc3BvbnNlLm9iamVjdElkO1xuXG4gICAgICAgICAgLy8gd2UgYWxzbyBuZWVkIHRvIHVwZGF0ZSB0aGUgZ2VvanNvbiBpZCBmb3IgY3JlYXRlTGF5ZXJzKCkgdG8gZnVuY3Rpb25cbiAgICAgICAgICBmZWF0dXJlLmlkID0gcmVzcG9uc2Uub2JqZWN0SWQ7XG4gICAgICAgICAgdGhpcy5jcmVhdGVMYXllcnMoW2ZlYXR1cmVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcykpO1xuICAgIH0sIHRoaXMpKTtcbiAgfSxcblxuICB1cGRhdGVGZWF0dXJlOiBmdW5jdGlvbiAoZmVhdHVyZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UudXBkYXRlRmVhdHVyZShmZWF0dXJlLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKFtmZWF0dXJlLmlkXSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuY3JlYXRlTGF5ZXJzKFtmZWF0dXJlXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgZGVsZXRlRmVhdHVyZTogZnVuY3Rpb24gKGlkLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuc2VydmljZS5kZWxldGVGZWF0dXJlKGlkLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLm9iamVjdElkKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKFtyZXNwb25zZS5vYmplY3RJZF0sIHRydWUpO1xuICAgICAgfVxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBkZWxldGVGZWF0dXJlczogZnVuY3Rpb24gKGlkcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmRlbGV0ZUZlYXR1cmVzKGlkcywgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzcG9uc2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxheWVycyhbcmVzcG9uc2VbaV0ub2JqZWN0SWRdLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IEZlYXR1cmVNYW5hZ2VyIH0gZnJvbSAnLi9GZWF0dXJlTWFuYWdlcic7XG5cbmV4cG9ydCB2YXIgRmVhdHVyZUxheWVyID0gRmVhdHVyZU1hbmFnZXIuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgY2FjaGVMYXllcnM6IHRydWVcbiAgfSxcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICovXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgRmVhdHVyZU1hbmFnZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9vcmlnaW5hbFN0eWxlID0gdGhpcy5vcHRpb25zLnN0eWxlO1xuICAgIHRoaXMuX2xheWVycyA9IHt9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBMYXllciBJbnRlcmZhY2VcbiAgICovXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX2xheWVycykge1xuICAgICAgbWFwLnJlbW92ZUxheWVyKHRoaXMuX2xheWVyc1tpXSk7XG4gICAgICAvLyB0cmlnZ2VyIHRoZSBldmVudCB3aGVuIHRoZSBlbnRpcmUgZmVhdHVyZUxheWVyIGlzIHJlbW92ZWQgZnJvbSB0aGUgbWFwXG4gICAgICB0aGlzLmZpcmUoJ3JlbW92ZWZlYXR1cmUnLCB7XG4gICAgICAgIGZlYXR1cmU6IHRoaXMuX2xheWVyc1tpXS5mZWF0dXJlLFxuICAgICAgICBwZXJtYW5lbnQ6IGZhbHNlXG4gICAgICB9LCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gRmVhdHVyZU1hbmFnZXIucHJvdG90eXBlLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcbiAgfSxcblxuICBjcmVhdGVOZXdMYXllcjogZnVuY3Rpb24gKGdlb2pzb24pIHtcbiAgICB2YXIgbGF5ZXIgPSBMLkdlb0pTT04uZ2VvbWV0cnlUb0xheWVyKGdlb2pzb24sIHRoaXMub3B0aW9ucyk7XG4gICAgbGF5ZXIuZGVmYXVsdE9wdGlvbnMgPSBsYXllci5vcHRpb25zO1xuICAgIHJldHVybiBsYXllcjtcbiAgfSxcblxuICBfdXBkYXRlTGF5ZXI6IGZ1bmN0aW9uIChsYXllciwgZ2VvanNvbikge1xuICAgIC8vIGNvbnZlcnQgdGhlIGdlb2pzb24gY29vcmRpbmF0ZXMgaW50byBhIExlYWZsZXQgTGF0TG5nIGFycmF5L25lc3RlZCBhcnJheXNcbiAgICAvLyBwYXNzIGl0IHRvIHNldExhdExuZ3MgdG8gdXBkYXRlIGxheWVyIGdlb21ldHJpZXNcbiAgICB2YXIgbGF0bG5ncyA9IFtdO1xuICAgIHZhciBjb29yZHNUb0xhdExuZyA9IHRoaXMub3B0aW9ucy5jb29yZHNUb0xhdExuZyB8fCBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmc7XG5cbiAgICAvLyBjb3B5IG5ldyBhdHRyaWJ1dGVzLCBpZiBwcmVzZW50XG4gICAgaWYgKGdlb2pzb24ucHJvcGVydGllcykge1xuICAgICAgbGF5ZXIuZmVhdHVyZS5wcm9wZXJ0aWVzID0gZ2VvanNvbi5wcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZ2VvanNvbi5nZW9tZXRyeS50eXBlKSB7XG4gICAgICBjYXNlICdQb2ludCc6XG4gICAgICAgIGxhdGxuZ3MgPSBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmcoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcyk7XG4gICAgICAgIGxheWVyLnNldExhdExuZyhsYXRsbmdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdMaW5lU3RyaW5nJzpcbiAgICAgICAgbGF0bG5ncyA9IEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcywgMCwgY29vcmRzVG9MYXRMbmcpO1xuICAgICAgICBsYXllci5zZXRMYXRMbmdzKGxhdGxuZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ011bHRpTGluZVN0cmluZyc6XG4gICAgICAgIGxhdGxuZ3MgPSBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIDEsIGNvb3Jkc1RvTGF0TG5nKTtcbiAgICAgICAgbGF5ZXIuc2V0TGF0TG5ncyhsYXRsbmdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQb2x5Z29uJzpcbiAgICAgICAgbGF0bG5ncyA9IEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcywgMSwgY29vcmRzVG9MYXRMbmcpO1xuICAgICAgICBsYXllci5zZXRMYXRMbmdzKGxhdGxuZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ011bHRpUG9seWdvbic6XG4gICAgICAgIGxhdGxuZ3MgPSBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIDIsIGNvb3Jkc1RvTGF0TG5nKTtcbiAgICAgICAgbGF5ZXIuc2V0TGF0TG5ncyhsYXRsbmdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBGZWF0dXJlIE1hbmFnZW1lbnQgTWV0aG9kc1xuICAgKi9cblxuICBjcmVhdGVMYXllcnM6IGZ1bmN0aW9uIChmZWF0dXJlcykge1xuICAgIGZvciAodmFyIGkgPSBmZWF0dXJlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGdlb2pzb24gPSBmZWF0dXJlc1tpXTtcblxuICAgICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2dlb2pzb24uaWRdO1xuICAgICAgdmFyIG5ld0xheWVyO1xuXG4gICAgICBpZiAodGhpcy5fdmlzaWJsZVpvb20oKSAmJiBsYXllciAmJiAhdGhpcy5fbWFwLmhhc0xheWVyKGxheWVyKSkge1xuICAgICAgICB0aGlzLl9tYXAuYWRkTGF5ZXIobGF5ZXIpO1xuICAgICAgICB0aGlzLmZpcmUoJ2FkZGZlYXR1cmUnLCB7XG4gICAgICAgICAgZmVhdHVyZTogbGF5ZXIuZmVhdHVyZVxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIGdlb21ldHJ5IGlmIG5lY2Vzc2FyeVxuICAgICAgaWYgKGxheWVyICYmIHRoaXMub3B0aW9ucy5zaW1wbGlmeUZhY3RvciA+IDAgJiYgKGxheWVyLnNldExhdExuZ3MgfHwgbGF5ZXIuc2V0TGF0TG5nKSkge1xuICAgICAgICB0aGlzLl91cGRhdGVMYXllcihsYXllciwgZ2VvanNvbik7XG4gICAgICB9XG5cbiAgICAgIGlmICghbGF5ZXIpIHtcbiAgICAgICAgbmV3TGF5ZXIgPSB0aGlzLmNyZWF0ZU5ld0xheWVyKGdlb2pzb24pO1xuICAgICAgICBuZXdMYXllci5mZWF0dXJlID0gZ2VvanNvbjtcblxuICAgICAgICAvLyBidWJibGUgZXZlbnRzIGZyb20gaW5kaXZpZHVhbCBsYXllcnMgdG8gdGhlIGZlYXR1cmUgbGF5ZXJcbiAgICAgICAgbmV3TGF5ZXIuYWRkRXZlbnRQYXJlbnQodGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5vbkVhY2hGZWF0dXJlKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLm9uRWFjaEZlYXR1cmUobmV3TGF5ZXIuZmVhdHVyZSwgbmV3TGF5ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FjaGUgdGhlIGxheWVyXG4gICAgICAgIHRoaXMuX2xheWVyc1tuZXdMYXllci5mZWF0dXJlLmlkXSA9IG5ld0xheWVyO1xuXG4gICAgICAgIC8vIHN0eWxlIHRoZSBsYXllclxuICAgICAgICB0aGlzLnNldEZlYXR1cmVTdHlsZShuZXdMYXllci5mZWF0dXJlLmlkLCB0aGlzLm9wdGlvbnMuc3R5bGUpO1xuXG4gICAgICAgIHRoaXMuZmlyZSgnY3JlYXRlZmVhdHVyZScsIHtcbiAgICAgICAgICBmZWF0dXJlOiBuZXdMYXllci5mZWF0dXJlXG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgbGF5ZXIgaWYgdGhlIGN1cnJlbnQgem9vbSBsZXZlbCBpcyBpbnNpZGUgdGhlIHJhbmdlIGRlZmluZWQgZm9yIHRoZSBsYXllciwgaXQgaXMgd2l0aGluIHRoZSBjdXJyZW50IHRpbWUgYm91bmRzIG9yIG91ciBsYXllciBpcyBub3QgdGltZSBlbmFibGVkXG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlWm9vbSgpICYmICghdGhpcy5vcHRpb25zLnRpbWVGaWVsZCB8fCAodGhpcy5vcHRpb25zLnRpbWVGaWVsZCAmJiB0aGlzLl9mZWF0dXJlV2l0aGluVGltZVJhbmdlKGdlb2pzb24pKSkpIHtcbiAgICAgICAgICB0aGlzLmZpcmUoJ2FkZGZlYXR1cmUnLCB7XG4gICAgICAgICAgICBmZWF0dXJlOiBuZXdMYXllci5mZWF0dXJlXG4gICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgdGhpcy5fbWFwLmFkZExheWVyKG5ld0xheWVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBhZGRMYXllcnM6IGZ1bmN0aW9uIChpZHMpIHtcbiAgICBmb3IgKHZhciBpID0gaWRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRzW2ldXTtcbiAgICAgIGlmIChsYXllcikge1xuICAgICAgICB0aGlzLmZpcmUoJ2FkZGZlYXR1cmUnLCB7XG4gICAgICAgICAgZmVhdHVyZTogbGF5ZXIuZmVhdHVyZVxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgdGhpcy5fbWFwLmFkZExheWVyKGxheWVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgcmVtb3ZlTGF5ZXJzOiBmdW5jdGlvbiAoaWRzLCBwZXJtYW5lbnQpIHtcbiAgICBmb3IgKHZhciBpID0gaWRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgaWQgPSBpZHNbaV07XG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgIHRoaXMuZmlyZSgncmVtb3ZlZmVhdHVyZScsIHtcbiAgICAgICAgICBmZWF0dXJlOiBsYXllci5mZWF0dXJlLFxuICAgICAgICAgIHBlcm1hbmVudDogcGVybWFuZW50XG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIobGF5ZXIpO1xuICAgICAgfVxuICAgICAgaWYgKGxheWVyICYmIHBlcm1hbmVudCkge1xuICAgICAgICBkZWxldGUgdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgY2VsbEVudGVyOiBmdW5jdGlvbiAoYm91bmRzLCBjb29yZHMpIHtcbiAgICBpZiAoIXRoaXMuX3pvb21pbmcgJiYgdGhpcy5fbWFwKSB7XG4gICAgICBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZShMLlV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjYWNoZUtleSA9IHRoaXMuX2NhY2hlS2V5KGNvb3Jkcyk7XG4gICAgICAgIHZhciBjZWxsS2V5ID0gdGhpcy5fY2VsbENvb3Jkc1RvS2V5KGNvb3Jkcyk7XG4gICAgICAgIHZhciBsYXllcnMgPSB0aGlzLl9jYWNoZVtjYWNoZUtleV07XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVDZWxsc1tjZWxsS2V5XSAmJiBsYXllcnMpIHtcbiAgICAgICAgICB0aGlzLmFkZExheWVycyhsYXllcnMpO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfVxuICB9LFxuXG4gIGNlbGxMZWF2ZTogZnVuY3Rpb24gKGJvdW5kcywgY29vcmRzKSB7XG4gICAgaWYgKCF0aGlzLl96b29taW5nKSB7XG4gICAgICBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZShMLlV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSB0aGlzLl9jYWNoZUtleShjb29yZHMpO1xuICAgICAgICAgIHZhciBjZWxsS2V5ID0gdGhpcy5fY2VsbENvb3Jkc1RvS2V5KGNvb3Jkcyk7XG4gICAgICAgICAgdmFyIGxheWVycyA9IHRoaXMuX2NhY2hlW2NhY2hlS2V5XTtcbiAgICAgICAgICB2YXIgbWFwQm91bmRzID0gdGhpcy5fbWFwLmdldEJvdW5kcygpO1xuICAgICAgICAgIGlmICghdGhpcy5fYWN0aXZlQ2VsbHNbY2VsbEtleV0gJiYgbGF5ZXJzKSB7XG4gICAgICAgICAgICB2YXIgcmVtb3ZhYmxlID0gdHJ1ZTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2xheWVyc1tpXV07XG4gICAgICAgICAgICAgIGlmIChsYXllciAmJiBsYXllci5nZXRCb3VuZHMgJiYgbWFwQm91bmRzLmludGVyc2VjdHMobGF5ZXIuZ2V0Qm91bmRzKCkpKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlbW92YWJsZSkge1xuICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxheWVycyhsYXllcnMsICF0aGlzLm9wdGlvbnMuY2FjaGVMYXllcnMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5jYWNoZUxheWVycyAmJiByZW1vdmFibGUpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhY2hlW2NhY2hlS2V5XTtcbiAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NlbGxzW2NlbGxLZXldO1xuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fYWN0aXZlQ2VsbHNbY2VsbEtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBTdHlsaW5nIE1ldGhvZHNcbiAgICovXG5cbiAgcmVzZXRTdHlsZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3B0aW9ucy5zdHlsZSA9IHRoaXMuX29yaWdpbmFsU3R5bGU7XG4gICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgIHRoaXMucmVzZXRGZWF0dXJlU3R5bGUobGF5ZXIuZmVhdHVyZS5pZCk7XG4gICAgfSwgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2V0U3R5bGU6IGZ1bmN0aW9uIChzdHlsZSkge1xuICAgIHRoaXMub3B0aW9ucy5zdHlsZSA9IHN0eWxlO1xuICAgIHRoaXMuZWFjaEZlYXR1cmUoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICB0aGlzLnNldEZlYXR1cmVTdHlsZShsYXllci5mZWF0dXJlLmlkLCBzdHlsZSk7XG4gICAgfSwgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcmVzZXRGZWF0dXJlU3R5bGU6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgdmFyIHN0eWxlID0gdGhpcy5fb3JpZ2luYWxTdHlsZSB8fCBMLlBhdGgucHJvdG90eXBlLm9wdGlvbnM7XG4gICAgaWYgKGxheWVyKSB7XG4gICAgICBMLlV0aWwuZXh0ZW5kKGxheWVyLm9wdGlvbnMsIGxheWVyLmRlZmF1bHRPcHRpb25zKTtcbiAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKGlkLCBzdHlsZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHNldEZlYXR1cmVTdHlsZTogZnVuY3Rpb24gKGlkLCBzdHlsZSkge1xuICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgaWYgKHR5cGVvZiBzdHlsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgc3R5bGUgPSBzdHlsZShsYXllci5mZWF0dXJlKTtcbiAgICB9XG4gICAgaWYgKGxheWVyLnNldFN0eWxlKSB7XG4gICAgICBsYXllci5zZXRTdHlsZShzdHlsZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBVdGlsaXR5IE1ldGhvZHNcbiAgICovXG5cbiAgZWFjaEZlYXR1cmU6IGZ1bmN0aW9uIChmbiwgY29udGV4dCkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5fbGF5ZXJzKSB7XG4gICAgICBmbi5jYWxsKGNvbnRleHQsIHRoaXMuX2xheWVyc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldEZlYXR1cmU6IGZ1bmN0aW9uIChpZCkge1xuICAgIHJldHVybiB0aGlzLl9sYXllcnNbaWRdO1xuICB9LFxuXG4gIGJyaW5nVG9CYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgIGlmIChsYXllci5icmluZ1RvQmFjaykge1xuICAgICAgICBsYXllci5icmluZ1RvQmFjaygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGJyaW5nVG9Gcm9udDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZWFjaEZlYXR1cmUoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICBpZiAobGF5ZXIuYnJpbmdUb0Zyb250KSB7XG4gICAgICAgIGxheWVyLmJyaW5nVG9Gcm9udCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIHJlZHJhdzogZnVuY3Rpb24gKGlkKSB7XG4gICAgaWYgKGlkKSB7XG4gICAgICB0aGlzLl9yZWRyYXcoaWQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBfcmVkcmF3OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgIHZhciBnZW9qc29uID0gbGF5ZXIuZmVhdHVyZTtcblxuICAgIC8vIGlmIHRoaXMgbG9va3MgbGlrZSBhIG1hcmtlclxuICAgIGlmIChsYXllciAmJiBsYXllci5zZXRJY29uICYmIHRoaXMub3B0aW9ucy5wb2ludFRvTGF5ZXIpIHtcbiAgICAgIC8vIHVwZGF0ZSBjdXN0b20gc3ltYm9sb2d5LCBpZiBuZWNlc3NhcnlcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucG9pbnRUb0xheWVyKSB7XG4gICAgICAgIHZhciBnZXRJY29uID0gdGhpcy5vcHRpb25zLnBvaW50VG9MYXllcihnZW9qc29uLCBMLmxhdExuZyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdLCBnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdKSk7XG4gICAgICAgIHZhciB1cGRhdGVkSWNvbiA9IGdldEljb24ub3B0aW9ucy5pY29uO1xuICAgICAgICBsYXllci5zZXRJY29uKHVwZGF0ZWRJY29uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBsb29rcyBsaWtlIGEgdmVjdG9yIG1hcmtlciAoY2lyY2xlTWFya2VyKVxuICAgIGlmIChsYXllciAmJiBsYXllci5zZXRTdHlsZSAmJiB0aGlzLm9wdGlvbnMucG9pbnRUb0xheWVyKSB7XG4gICAgICB2YXIgZ2V0U3R5bGUgPSB0aGlzLm9wdGlvbnMucG9pbnRUb0xheWVyKGdlb2pzb24sIEwubGF0TG5nKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV0sIGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF0pKTtcbiAgICAgIHZhciB1cGRhdGVkU3R5bGUgPSBnZXRTdHlsZS5vcHRpb25zO1xuICAgICAgdGhpcy5zZXRGZWF0dXJlU3R5bGUoZ2VvanNvbi5pZCwgdXBkYXRlZFN0eWxlKTtcbiAgICB9XG5cbiAgICAvLyBsb29rcyBsaWtlIGEgcGF0aCAocG9seWdvbi9wb2x5bGluZSlcbiAgICBpZiAobGF5ZXIgJiYgbGF5ZXIuc2V0U3R5bGUgJiYgdGhpcy5vcHRpb25zLnN0eWxlKSB7XG4gICAgICB0aGlzLnJlc2V0U3R5bGUoZ2VvanNvbi5pZCk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVMYXllciAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEZlYXR1cmVMYXllcihvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmVhdHVyZUxheWVyO1xuIl0sIm5hbWVzIjpbInNoYWxsb3dDbG9uZSIsImFyY2dpc1RvR2VvSlNPTiIsImdlb2pzb25Ub0FyY0dJUyIsImcyYSIsImEy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QUFFLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdEIsQ0FBQSxDQUFDOztBQUVELENBQUE7QUFDQSxDQUFBLFNBQVMsc0JBQXNCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0FBQ2pELENBQUEsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsRixDQUFBLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEYsQ0FBQSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVqRixDQUFBLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO0FBQ2hCLENBQUEsSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLENBQUEsSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDOztBQUV0QixDQUFBLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO0FBQ2xELENBQUEsTUFBTSxPQUFPLElBQUksQ0FBQztBQUNsQixDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQSxDQUFDOztBQUVELENBQUE7QUFDQSxDQUFBLFNBQVMsb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNyQyxDQUFBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pDLENBQUEsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDM0MsQ0FBQSxNQUFNLElBQUksc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNsRSxDQUFBLFFBQVEsT0FBTyxJQUFJLENBQUM7QUFDcEIsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUEsQ0FBQzs7QUFFRCxDQUFBO0FBQ0EsQ0FBQSxTQUFTLHVCQUF1QixFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7QUFDdEQsQ0FBQSxFQUFFLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztBQUN2QixDQUFBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN0RSxDQUFBLElBQUksSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLENBQUEsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxD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LENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELENBQUEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqRixDQUFBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxFQUFFLEVBQUUsVUFBVSxNQUFNLEVBQUU7QUFDeEIsQ0FBQSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlCLENBQUEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BELENBQUEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxtQkFBbUIsQ0FBQztBQUNuRCxDQUFBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFO0FBQ2pDLENBQUEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUN2RixDQUFBLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyRCxDQUFBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxRQUFRLEVBQUUsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ25DLENBQUEsSUFBSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUNuRixDQUFBLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDakYsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsR0FBRyxFQUFFLFVBQVUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUNwQyxDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxFQUFFLFFBQVEsRUFBRTtBQUNuRCxDQUFBO0FBQ0EsQ0FBQSxNQUFNLElBQUksS0FBSyxFQUFFO0FBQ2pCLENBQUEsUUFBUSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzNELENBQUEsUUFBUSxPQUFPOztBQUVmLENBQUE7QUFDQSxDQUFBLE9BQU8sTUFBTTtBQUNiLENBQUEsUUFBUSxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMzRSxDQUFBLFFBQVEsUUFBUSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3RELENBQUEsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNwRSxDQUFBLFVBQVUsSUFBSSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RELENBQUEsVUFBVSxPQUFPLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ3hELENBQUEsU0FBUztBQUNULENBQUEsUUFBUSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdkUsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUEsR0FBRztBQUNILENBQUEsQ0FBQyxDQUFDLENBQUM7O0FBRUgsQ0FBTyxTQUFTLGdCQUFnQixFQUFFLE9BQU8sRUFBRTtBQUMzQyxDQUFBLEVBQUUsT0FBTyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZDLENBQUEsQ0FBQzs7Q0NqRU0sSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUMzQyxDQUFBLEVBQUUsT0FBTyxFQUFFO0FBQ1gsQ0FBQSxJQUFJLGVBQWUsRUFBRSxZQUFZO0FBQ2pDLENBQUEsSUFBSSxrQkFBa0IsRUFBRSxlQUFlO0FBQ3ZDLENBQUEsSUFBSSxjQUFjLEVBQUUsV0FBVztBQUMvQixDQUFBLElBQUksb0JBQW9CLEVBQUUsb0JBQW9CO0FBQzlDLENBQUEsSUFBSSxnQkFBZ0IsRUFBRSxnQkFBZ0I7QUFDdEMsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxNQUFNLEVBQUU7QUFDVixDQUFBLElBQUksY0FBYyxFQUFFLEtBQUs7QUFDekIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxFQUFFLEVBQUUsVUFBVSxNQUFNLEVBQUU7QUFDeEIsQ0FBQSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlCLENBQUEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQzFDLENBQUEsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUc7QUFDbkIsQ0FBQSxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRztBQUNuQixDQUFBLE1BQU0sZ0JBQWdCLEVBQUU7QUFDeEIsQ0FBQSxRQUFRLElBQUksRUFBRSxJQUFJO0FBQ2xCLENBQUEsT0FBTztBQUNQLENBQUEsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFBLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsbUJBQW1CLENBQUM7QUFDbkQsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsYUFBYSxFQUFFLFlBQVk7QUFDN0IsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDbEMsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZO0FBQ2hDLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO0FBQ3JDLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsWUFBWSxFQUFFLFlBQVk7QUFDNUIsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDakMsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxHQUFHLEVBQUUsVUFBVSxRQUFRLEVBQUUsT0FBTyxFQUFFO0FBQ3BDLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQ25ELENBQUEsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0YsQ0FBQSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDYixDQUFBLEdBQUc7O0FBRUgsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQSxFQUFFLGtCQUFrQixFQUFFLFVBQVUsUUFBUSxFQUFFO0FBQzFDLENBQUEsSUFBSSxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO0FBQ3JDLENBQUEsSUFBSSxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO0FBQzdDLENBQUEsSUFBSSxJQUFJLHVCQUF1QixHQUFHLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztBQUNuRSxDQUFBLElBQUksSUFBSSxPQUFPLEdBQUc7QUFDbEIsQ0FBQSxNQUFNLE9BQU8sRUFBRTtBQUNmLENBQUEsUUFBUSxNQUFNLEVBQUUsU0FBUztBQUN6QixDQUFBLFFBQVEsVUFBVSxFQUFFO0FBQ3BCLENBQUEsVUFBVSxNQUFNLEVBQUUsT0FBTztBQUN6QixDQUFBLFVBQVUsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ2pELENBQUEsU0FBUztBQUNULENBQUEsUUFBUSxLQUFLLEVBQUU7QUFDZixDQUFBLFVBQVUsTUFBTSxFQUFFLE1BQU07QUFDeEIsQ0FBQSxVQUFVLFlBQVksRUFBRTtBQUN4QixDQUFBLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJO0FBQ2xELENBQUEsV0FBVztBQUNYLENBQUEsU0FBUztBQUNULENBQUEsUUFBUSxZQUFZLEVBQUU7QUFDdEIsQ0FBQSxVQUFVLFVBQVUsRUFBRSxRQUFRLENBQUMsUUFBUTtBQUN2QyxDQUFBLFVBQVUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxJQUFJO0FBQy9CLENBQUEsVUFBVSxPQUFPLEVBQUUsUUFBUSxDQUFDLEtBQUs7QUFDakMsQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxRQUFRLElBQUksRUFBRSxRQUFRLENBQUMsUUFBUTtBQUMvQixDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUssQ0FBQzs7QUFFTixDQUFBLElBQUksSUFBSSxRQUFRLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO0FBQzNELENBQUEsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7QUFDbkUsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFO0FBQy9DLENBQUEsTUFBTSxPQUFPLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUM1RSxDQUFBLE1BQU0sSUFBSSx1QkFBdUIsSUFBSSx1QkFBdUIsQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO0FBQzlHLENBQUEsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLHVCQUF1QixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN0RSxDQUFBLFVBQVUsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLHFCQUFxQixHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pHLENBQUEsU0FBUztBQUNULENBQUEsT0FBTztBQUNQLENBQUEsS0FBSztBQUNMLENBQUEsSUFBSSxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxDQUFDLENBQUMsQ0FBQzs7QUFFSCxDQUFPLFNBQVMsYUFBYSxFQUFFLE1BQU0sRUFBRTtBQUN2QyxDQUFBLEVBQUUsT0FBTyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuQyxDQUFBLENBQUM7O0NDM0ZNLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDOztBQUV0QyxDQUFBLEVBQUUsT0FBTyxFQUFFO0FBQ1gsQ0FBQSxJQUFJLEtBQUssRUFBRSxLQUFLO0FBQ2hCLENBQUEsSUFBSSxPQUFPLEVBQUUsSUFBSTtBQUNqQixDQUFBLElBQUksT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFVBQVUsRUFBRSxVQUFVLE9BQU8sRUFBRTtBQUNqQyxDQUFBLElBQUksT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7QUFDNUIsQ0FBQSxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQzVCLENBQUEsSUFBSSxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztBQUNqQyxDQUFBLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsRCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLEdBQUcsRUFBRSxVQUFVLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUNsRCxDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRSxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLElBQUksRUFBRSxVQUFVLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUNuRCxDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNsRSxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUN0RCxDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNyRSxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFFBQVEsRUFBRSxVQUFVLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDekMsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDM0QsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxZQUFZLEVBQUUsVUFBVSxLQUFLLEVBQUU7QUFDakMsQ0FBQSxJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0FBQ2pDLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDL0IsQ0FBQSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNyQixDQUFBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxVQUFVLEVBQUUsWUFBWTtBQUMxQixDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUNoQyxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFVBQVUsRUFBRSxVQUFVLE9BQU8sRUFBRTtBQUNqQyxDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ25DLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsUUFBUSxFQUFFLFVBQVUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUMvRCxDQUFBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7QUFDOUIsQ0FBQSxNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJO0FBQ2xDLENBQUEsTUFBTSxNQUFNLEVBQUUsTUFBTTtBQUNwQixDQUFBLE1BQU0sTUFBTSxFQUFFLE1BQU07QUFDcEIsQ0FBQSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRWIsQ0FBQSxJQUFJLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRS9GLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO0FBQzVCLENBQUEsTUFBTSxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQ3hDLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQzlCLENBQUEsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUEsTUFBTSxPQUFPO0FBQ2IsQ0FBQSxLQUFLLE1BQU07QUFDWCxDQUFBLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDOztBQUVwSCxDQUFBLE1BQU0sSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLElBQUksTUFBTSxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7QUFDL0UsQ0FBQSxRQUFRLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDeEUsQ0FBQSxPQUFPLE1BQU07QUFDYixDQUFBLFFBQVEsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdEUsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxzQkFBc0IsRUFBRSxVQUFVLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDN0UsQ0FBQSxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQ2xELENBQUEsTUFBTSxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7QUFDL0QsQ0FBQSxRQUFRLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDOztBQUVwQyxDQUFBLFFBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQzs7QUFFM0UsQ0FBQTtBQUNBLENBQUEsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFO0FBQzVDLENBQUEsVUFBVSxZQUFZLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUM7QUFDNUQsQ0FBQSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRWpCLENBQUE7QUFDQSxDQUFBLFFBQVEsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2xFLENBQUEsT0FBTzs7QUFFUCxDQUFBLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztBQUU5QyxDQUFBLE1BQU0sSUFBSSxLQUFLLEVBQUU7QUFDakIsQ0FBQSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO0FBQ2xDLENBQUEsVUFBVSxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSTtBQUN0QyxDQUFBLFVBQVUsTUFBTSxFQUFFLE1BQU07QUFDeEIsQ0FBQSxVQUFVLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztBQUNoQyxDQUFBLFVBQVUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO0FBQzFCLENBQUEsVUFBVSxNQUFNLEVBQUUsTUFBTTtBQUN4QixDQUFBLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNqQixDQUFBLE9BQU8sTUFBTTtBQUNiLENBQUEsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO0FBQ3BDLENBQUEsVUFBVSxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSTtBQUN0QyxDQUFBLFVBQVUsTUFBTSxFQUFFLE1BQU07QUFDeEIsQ0FBQSxVQUFVLFFBQVEsRUFBRSxRQUFRO0FBQzVCLENBQUEsVUFBVSxNQUFNLEVBQUUsTUFBTTtBQUN4QixDQUFBLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNqQixDQUFBLE9BQU87O0FBRVAsQ0FBQSxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQzlCLENBQUEsUUFBUSxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSTtBQUNwQyxDQUFBLFFBQVEsTUFBTSxFQUFFLE1BQU07QUFDdEIsQ0FBQSxRQUFRLE1BQU0sRUFBRSxNQUFNO0FBQ3RCLENBQUEsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2YsQ0FBQSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDYixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFNBQVMsRUFBRSxZQUFZO0FBQ3pCLENBQUEsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzdELENBQUEsTUFBTSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFDLENBQUEsTUFBTSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDbkMsQ0FBQSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hDLENBQUEsS0FBSztBQUNMLENBQUEsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUM1QixDQUFBLEdBQUc7QUFDSCxDQUFBLENBQUMsQ0FBQyxDQUFDOztBQUVILENBQU8sU0FBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ2xDLENBQUEsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzlCLENBQUEsQ0FBQzs7Q0NqSU0sSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7QUFFdkMsQ0FBQSxFQUFFLFFBQVEsRUFBRSxZQUFZO0FBQ3hCLENBQUEsSUFBSSxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsSUFBSSxFQUFFLFlBQVk7QUFDcEIsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsS0FBSyxFQUFFLFlBQVk7QUFDckIsQ0FBQSxJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLENBQUEsR0FBRzs7QUFFSCxDQUFBLENBQUMsQ0FBQyxDQUFDOztBQUVILENBQU8sU0FBUyxVQUFVLEVBQUUsT0FBTyxFQUFFO0FBQ3JDLENBQUEsRUFBRSxPQUFPLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pDLENBQUEsQ0FBQzs7Q0NuQk0sSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7QUFFekMsQ0FBQSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBQ3JCLENBQUEsSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFFBQVEsRUFBRSxZQUFZO0FBQ3hCLENBQUEsSUFBSSxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixDQUFBLEdBQUc7QUFDSCxDQUFBLENBQUMsQ0FBQyxDQUFDOztBQUVILENBQU8sU0FBUyxZQUFZLEVBQUUsT0FBTyxFQUFFO0FBQ3ZDLENBQUEsRUFBRSxPQUFPLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLENBQUEsQ0FBQzs7Q0NiTSxJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7O0FBRWhELENBQUEsRUFBRSxPQUFPLEVBQUU7QUFDWCxDQUFBLElBQUksV0FBVyxFQUFFLFVBQVU7QUFDM0IsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxLQUFLLEVBQUUsWUFBWTtBQUNyQixDQUFBLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxVQUFVLEVBQUUsVUFBVSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUNwRCxDQUFBLElBQUksT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUV0QixDQUFBLElBQUksT0FBTyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFdkMsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDcEMsQ0FBQSxNQUFNLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQztBQUN6QixDQUFBLEtBQUssRUFBRSxVQUFVLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDbEMsQ0FBQSxNQUFNLElBQUksTUFBTSxHQUFHLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztBQUMxRixDQUFBLE1BQU0sSUFBSSxRQUFRLEVBQUU7QUFDcEIsQ0FBQSxRQUFRLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM5RSxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLGFBQWEsRUFBRSxVQUFVLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO0FBQ3ZELENBQUEsSUFBSSxPQUFPLEdBQUcsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVqRSxDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO0FBQ3ZDLENBQUEsTUFBTSxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUM7QUFDekIsQ0FBQSxLQUFLLEVBQUUsVUFBVSxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQ2xDLENBQUEsTUFBTSxJQUFJLE1BQU0sR0FBRyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7QUFDaEcsQ0FBQSxNQUFNLElBQUksUUFBUSxFQUFFO0FBQ3BCLENBQUEsUUFBUSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDakYsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDaEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUNsRCxDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO0FBQ3ZDLENBQUEsTUFBTSxTQUFTLEVBQUUsRUFBRTtBQUNuQixDQUFBLEtBQUssRUFBRSxVQUFVLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDbEMsQ0FBQSxNQUFNLElBQUksTUFBTSxHQUFHLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztBQUNoRyxDQUFBLE1BQU0sSUFBSSxRQUFRLEVBQUU7QUFDcEIsQ0FBQSxRQUFRLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNqRixDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLGNBQWMsRUFBRSxVQUFVLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO0FBQ3BELENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7QUFDdkMsQ0FBQSxNQUFNLFNBQVMsRUFBRSxHQUFHO0FBQ3BCLENBQUEsS0FBSyxFQUFFLFVBQVUsS0FBSyxFQUFFLFFBQVEsRUFBRTtBQUNsQyxDQUFBO0FBQ0EsQ0FBQSxNQUFNLElBQUksTUFBTSxHQUFHLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztBQUM3RixDQUFBLE1BQU0sSUFBSSxRQUFRLEVBQUU7QUFDcEIsQ0FBQSxRQUFRLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNqRixDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoQixDQUFBLEdBQUc7QUFDSCxDQUFBLENBQUMsQ0FBQyxDQUFDOztBQUVILENBQU8sU0FBUyxtQkFBbUIsRUFBRSxPQUFPLEVBQUU7QUFDOUMsQ0FBQSxFQUFFLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMxQyxDQUFBLENBQUM7O0NDNURELElBQUksWUFBWSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLEdBQUcsT0FBTyxHQUFHLFFBQVEsQ0FBQzs7QUFFaEYsQ0FBTyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUM3QyxDQUFBLEVBQUUsT0FBTyxFQUFFO0FBQ1gsQ0FBQSxJQUFJLEtBQUssRUFBRTtBQUNYLENBQUEsTUFBTSxPQUFPLEVBQUU7QUFDZixDQUFBLFFBQVEsV0FBVyxFQUFFLFlBQVksR0FBRyx5RkFBeUY7QUFDN0gsQ0FBQSxRQUFRLE9BQU8sRUFBRTtBQUNqQixDQUFBLFVBQVUsT0FBTyxFQUFFLENBQUM7QUFDcEIsQ0FBQSxVQUFVLE9BQU8sRUFBRSxFQUFFO0FBQ3JCLENBQUEsVUFBVSxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO0FBQzVDLENBQUEsVUFBVSxXQUFXLEVBQUUsWUFBWTtBQUNuQyxDQUFBLFVBQVUsY0FBYyxFQUFFLHdEQUF3RDtBQUNsRixDQUFBLFNBQVM7QUFDVCxDQUFBLE9BQU87QUFDUCxDQUFBLE1BQU0sV0FBVyxFQUFFO0FBQ25CLENBQUEsUUFBUSxXQUFXLEVBQUUsWUFBWSxHQUFHLHVGQUF1RjtBQUMzSCxDQUFBLFFBQVEsT0FBTyxFQUFFO0FBQ2pCLENBQUEsVUFBVSxPQUFPLEVBQUUsQ0FBQztBQUNwQixDQUFBLFVBQVUsT0FBTyxFQUFFLEVBQUU7QUFDckIsQ0FBQSxVQUFVLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7QUFDNUMsQ0FBQSxVQUFVLFdBQVcsRUFBRSxZQUFZO0FBQ25DLENBQUEsVUFBVSxjQUFjLEVBQUUsc0RBQXNEO0FBQ2hGLENBQUEsU0FBUztBQUNULENBQUEsT0FBTztBQUNQLENBQUEsTUFBTSxNQUFNLEVBQUU7QUFDZCxDQUFBLFFBQVEsV0FBVyxFQUFFLFlBQVksR0FBRywrRkFBK0Y7QUFDbkksQ0FBQSxRQUFRLE9BQU8sRUFBRTtBQUNqQixDQUFBLFVBQVUsT0FBTyxFQUFFLENBQUM7QUFDcEIsQ0FBQSxVQUFVLE9BQU8sRUFBRSxFQUFFO0FBQ3JCLENBQUEsVUFBVSxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO0FBQzVDLENBQUEsVUFBVSxXQUFXLEVBQUUsWUFBWTtBQUNuQyxDQUFBLFVBQVUsY0FBYyxFQUFFLHFEQUFxRDtBQUMvRSxDQUFBLFNBQVM7QUFDVCxDQUFBLE9BQU87QUFDUCxDQUFBLE1BQU0sWUFBWSxFQUFFO0FBQ3BCLENBQUEsUUFBUSxXQUFXLEVBQUUsWUFBWSxHQUFHLG9HQUFvRztBQUN4SSxDQUFBLFFBQVEsT0FBTyxFQUFFO0FBQ2pCLENBQUEsVUFBVSxPQUFPLEVBQUUsQ0FBQztBQUNwQixDQUFBLFVBQVUsT0FBTyxFQUFFLEVBQUU7QUFDckIsQ0FBQSxVQUFVLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7QUFDNUMsQ0FBQSxVQUFVLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLGFBQWEsR0FBRyxVQUFVO0FBQzVELENBQUEsU0FBUztBQUNULENBQUEsT0FBTztBQUNQLENBQUEsTUFBTSxrQkFBa0IsRUFBRTtBQUMxQixDQUFBLFFBQVEsV0FBVyxFQUFFLFlBQVksR0FBRyx5RkFBeUY7QUFDN0gsQ0FBQSxRQUFRLE9BQU8sRUFBRTtBQUNqQixDQUFBLFVBQVUsT0FBTyxFQUFFLENBQUM7QUFDcEIsQ0FBQSxVQUFVLE9BQU8sRUFBRSxFQUFFO0FBQ3JCLENBQUEsVUFBVSxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO0FBQzVDLENBQUEsVUFBVSxXQUFXLEVBQUUsNkdBQTZHO0FBQ3BJLENBQUEsU0FBUztBQUNULENBQUEsT0FBTztBQUNQLENBQUEsTUFBTSxRQUFRLEVBQUU7QUFDaEIsQ0FBQSxRQUFRLFdBQVcsRUFBRSxZQUFZLEdBQUcsb0dBQW9HO0FBQ3hJLENBQUEsUUFBUSxPQUFPLEVBQUU7QUFDakIsQ0FBQSxVQUFVLE9BQU8sRUFBRSxDQUFDO0FBQ3BCLENBQUEsVUFBVSxPQUFPLEVBQUUsRUFBRTtBQUNyQixDQUFBLFVBQVUsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQztBQUM1QyxDQUFBLFVBQVUsV0FBVyxFQUFFLDhEQUE4RDtBQUNyRixDQUFBLFNBQVM7QUFDVCxDQUFBLE9BQU87QUFDUCxDQUFBLE1BQU0sY0FBYyxFQUFFO0FBQ3RCLENBQUEsUUFBUSxXQUFXLEVBQUUsWUFBWSxHQUFHLHlHQUF5RztBQUM3SSxDQUFBLFFBQVEsT0FBTyxFQUFFO0FBQ2pCLENBQUEsVUFBVSxPQUFPLEVBQUUsQ0FBQztBQUNwQixDQUFBLFVBQVUsT0FBTyxFQUFFLEVBQUU7QUFDckIsQ0FBQSxVQUFVLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7QUFDNUMsQ0FBQSxVQUFVLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLGFBQWEsR0FBRyxVQUFVO0FBQzVELENBQUEsVUFBVSxXQUFXLEVBQUUsRUFBRTs7QUFFekIsQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxNQUFNLElBQUksRUFBRTtBQUNaLENBQUEsUUFBUSxXQUFXLEVBQUUsWUFBWSxHQUFHLHFHQUFxRztBQUN6SSxDQUFBLFFBQVEsT0FBTyxFQUFFO0FBQ2pCLENBQUEsVUFBVSxPQUFPLEVBQUUsQ0FBQztBQUNwQixDQUFBLFVBQVUsT0FBTyxFQUFFLEVBQUU7QUFDckIsQ0FBQSxVQUFVLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7QUFDNUMsQ0FBQSxVQUFVLFdBQVcsRUFBRSw4REFBOEQ7QUFDckYsQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxNQUFNLFVBQVUsRUFBRTtBQUNsQixDQUFBLFFBQVEsV0FBVyxFQUFFLFlBQVksR0FBRywwR0FBMEc7QUFDOUksQ0FBQSxRQUFRLE9BQU8sRUFBRTtBQUNqQixDQUFBLFVBQVUsT0FBTyxFQUFFLENBQUM7QUFDcEIsQ0FBQSxVQUFVLE9BQU8sRUFBRSxFQUFFO0FBQ3JCLENBQUEsVUFBVSxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO0FBQzVDLENBQUEsVUFBVSxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxhQUFhLEdBQUcsVUFBVTtBQUM1RCxDQUFBLFVBQVUsV0FBVyxFQUFFLEVBQUU7QUFDekIsQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxNQUFNLE9BQU8sRUFBRTtBQUNmLENBQUEsUUFBUSxXQUFXLEVBQUUsWUFBWSxHQUFHLHNGQUFzRjtBQUMxSCxDQUFBLFFBQVEsT0FBTyxFQUFFO0FBQ2pCLENBQUEsVUFBVSxPQUFPLEVBQUUsQ0FBQztBQUNwQixDQUFBLFVBQVUsT0FBTyxFQUFFLEVBQUU7QUFDckIsQ0FBQSxVQUFVLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7QUFDNUMsQ0FBQSxVQUFVLFdBQVcsRUFBRSx1SEFBdUg7QUFDOUksQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxNQUFNLGFBQWEsRUFBRTtBQUNyQixDQUFBLFFBQVEsV0FBVyxFQUFFLFlBQVksR0FBRyw4R0FBOEc7QUFDbEosQ0FBQSxRQUFRLE9BQU8sRUFBRTtBQUNqQixDQUFBLFVBQVUsT0FBTyxFQUFFLENBQUM7QUFDcEIsQ0FBQSxVQUFVLE9BQU8sRUFBRSxFQUFFO0FBQ3JCLENBQUEsVUFBVSxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO0FBQzVDLENBQUEsVUFBVSxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxhQUFhLEdBQUcsVUFBVTtBQUM1RCxDQUFBLFVBQVUsV0FBVyxFQUFFLEVBQUU7QUFDekIsQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxNQUFNLHFCQUFxQixFQUFFO0FBQzdCLENBQUEsUUFBUSxXQUFXLEVBQUUsWUFBWSxHQUFHLHVHQUF1RztBQUMzSSxDQUFBLFFBQVEsT0FBTyxFQUFFO0FBQ2pCLENBQUEsVUFBVSxPQUFPLEVBQUUsQ0FBQztBQUNwQixDQUFBLFVBQVUsT0FBTyxFQUFFLEVBQUU7QUFDckIsQ0FBQSxVQUFVLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7QUFDNUMsQ0FBQSxVQUFVLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLGFBQWEsR0FBRyxVQUFVO0FBQzVELENBQUEsU0FBUztBQUNULENBQUEsT0FBTztBQUNQLENBQUEsTUFBTSxZQUFZLEVBQUU7QUFDcEIsQ0FBQSxRQUFRLFdBQVcsRUFBRSxZQUFZLEdBQUcsNEZBQTRGO0FBQ2hJLENBQUEsUUFBUSxPQUFPLEVBQUU7QUFDakIsQ0FBQSxVQUFVLE9BQU8sRUFBRSxDQUFDO0FBQ3BCLENBQUEsVUFBVSxPQUFPLEVBQUUsRUFBRTtBQUNyQixDQUFBLFVBQVUsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQztBQUM1QyxDQUFBLFVBQVUsV0FBVyxFQUFFLE1BQU07QUFDN0IsQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxNQUFNLGtCQUFrQixFQUFFO0FBQzFCLENBQUEsUUFBUSxXQUFXLEVBQUUsWUFBWSxHQUFHLHdIQUF3SDtBQUM1SixDQUFBLFFBQVEsT0FBTyxFQUFFO0FBQ2pCLENBQUEsVUFBVSxPQUFPLEVBQUUsQ0FBQztBQUNwQixDQUFBLFVBQVUsT0FBTyxFQUFFLEVBQUU7QUFDckIsQ0FBQSxVQUFVLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7QUFDNUMsQ0FBQSxVQUFVLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLGFBQWEsR0FBRyxVQUFVO0FBQzVELENBQUEsVUFBVSxXQUFXLEVBQUUsRUFBRTtBQUN6QixDQUFBLFNBQVM7QUFDVCxDQUFBLE9BQU87QUFDUCxDQUFBLE1BQU0sT0FBTyxFQUFFO0FBQ2YsQ0FBQSxRQUFRLFdBQVcsRUFBRSxZQUFZLEdBQUcsMkZBQTJGO0FBQy9ILENBQUEsUUFBUSxPQUFPLEVBQUU7QUFDakIsQ0FBQSxVQUFVLE9BQU8sRUFBRSxDQUFDO0FBQ3BCLENBQUEsVUFBVSxPQUFPLEVBQUUsRUFBRTtBQUNyQixDQUFBLFVBQVUsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQztBQUM1QyxDQUFBLFVBQVUsV0FBVyxFQUFFLFlBQVk7QUFDbkMsQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxNQUFNLGFBQWEsRUFBRTtBQUNyQixDQUFBLFFBQVEsV0FBVyxFQUFFLFlBQVksR0FBRywwR0FBMEc7QUFDOUksQ0FBQSxRQUFRLE9BQU8sRUFBRTtBQUNqQixDQUFBLFVBQVUsT0FBTyxFQUFFLENBQUM7QUFDcEIsQ0FBQSxVQUFVLE9BQU8sRUFBRSxFQUFFO0FBQ3JCLENBQUEsVUFBVSxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO0FBQzVDLENBQUEsVUFBVSxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxhQUFhLEdBQUcsVUFBVTtBQUM1RCxDQUFBLFVBQVUsV0FBVyxFQUFFLEVBQUU7QUFDekIsQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxNQUFNLE9BQU8sRUFBRTtBQUNmLENBQUEsUUFBUSxXQUFXLEVBQUUsWUFBWSxHQUFHLHNGQUFzRjtBQUMxSCxDQUFBLFFBQVEsT0FBTyxFQUFFO0FBQ2pCLENBQUEsVUFBVSxPQUFPLEVBQUUsQ0FBQztBQUNwQixDQUFBLFVBQVUsT0FBTyxFQUFFLEVBQUU7QUFDckIsQ0FBQSxVQUFVLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7QUFDNUMsQ0FBQSxVQUFVLFdBQVcsRUFBRSw0Q0FBNEM7QUFDbkUsQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxVQUFVLEVBQUUsVUFBVSxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQ3RDLENBQUEsSUFBSSxJQUFJLE1BQU0sQ0FBQzs7QUFFZixDQUFBO0FBQ0EsQ0FBQSxJQUFJLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtBQUNuRSxDQUFBLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNuQixDQUFBLEtBQUssTUFBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ25FLENBQUEsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QyxDQUFBLEtBQUssTUFBTTtBQUNYLENBQUEsTUFBTSxNQUFNLElBQUksS0FBSyxDQUFDLHFUQUFxVCxDQUFDLENBQUM7QUFDN1UsQ0FBQSxLQUFLOztBQUVMLENBQUE7QUFDQSxDQUFBLElBQUksSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFN0QsQ0FBQSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzs7QUFFekMsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDNUIsQ0FBQSxNQUFNLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3RCxDQUFBLEtBQUs7O0FBRUwsQ0FBQTtBQUNBLENBQUEsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ2pGLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRyxFQUFFO0FBQ3hCLENBQUE7QUFDQSxDQUFBLElBQUksa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTVCLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLGFBQWEsRUFBRTtBQUM3QyxDQUFBLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ3ZCLENBQUEsS0FBSztBQUNMLENBQUE7QUFDQSxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtBQUNyQyxDQUFBLE1BQU0sbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDNUQsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDOztBQUU3QyxDQUFBLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDaEQsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxRQUFRLEVBQUUsVUFBVSxHQUFHLEVBQUU7QUFDM0IsQ0FBQSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFDOUMsQ0FBQSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsU0FBUyxFQUFFLFlBQVk7QUFDekIsQ0FBQSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQy9DLENBQUEsTUFBTSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pELENBQUEsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7QUFDeEMsQ0FBQSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUM5QixDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLGNBQWMsRUFBRSxZQUFZO0FBQzlCLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO0FBQ2xDLENBQUEsTUFBTSxJQUFJLFdBQVcsR0FBRyx5Q0FBeUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7QUFDekcsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxJQUFJLE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUEsR0FBRztBQUNILENBQUEsQ0FBQyxDQUFDLENBQUM7O0FBRUgsQ0FBTyxTQUFTLFlBQVksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQzVDLENBQUEsRUFBRSxPQUFPLElBQUksWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN4QyxDQUFBLENBQUM7O0NDL09NLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQzlDLENBQUEsRUFBRSxPQUFPLEVBQUU7QUFDWCxDQUFBLElBQUksbUJBQW1CLEVBQUUsR0FBRztBQUM1QixDQUFBLElBQUksWUFBWSxFQUFFLDhEQUE4RDtBQUNoRixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLE9BQU8sRUFBRTtBQUNYLENBQUEsSUFBSSxrQkFBa0IsRUFBRTtBQUN4QixDQUFBLE1BQU0sR0FBRyxFQUFFLGtCQUFrQjtBQUM3QixDQUFBLE1BQU0sR0FBRyxFQUFFLGtCQUFrQjtBQUM3QixDQUFBLE1BQU0sR0FBRyxFQUFFLGtCQUFrQjtBQUM3QixDQUFBLE1BQU0sR0FBRyxFQUFFLGtCQUFrQjtBQUM3QixDQUFBLE1BQU0sR0FBRyxFQUFFLGtCQUFrQjtBQUM3QixDQUFBLE1BQU0sR0FBRyxFQUFFLGtCQUFrQjtBQUM3QixDQUFBLE1BQU0sR0FBRyxFQUFFLGtCQUFrQjtBQUM3QixDQUFBLE1BQU0sR0FBRyxFQUFFLGtCQUFrQjtBQUM3QixDQUFBLE1BQU0sR0FBRyxFQUFFLGtCQUFrQjtBQUM3QixDQUFBLE1BQU0sR0FBRyxFQUFFLGtCQUFrQjtBQUM3QixDQUFBLE1BQU0sSUFBSSxFQUFFLGdCQUFnQjtBQUM1QixDQUFBLE1BQU0sSUFBSSxFQUFFLGtCQUFrQjtBQUM5QixDQUFBLE1BQU0sSUFBSSxFQUFFLGtCQUFrQjtBQUM5QixDQUFBLE1BQU0sSUFBSSxFQUFFLGtCQUFrQjtBQUM5QixDQUFBLE1BQU0sSUFBSSxFQUFFLGtCQUFrQjtBQUM5QixDQUFBLE1BQU0sSUFBSSxFQUFFLGtCQUFrQjtBQUM5QixDQUFBLE1BQU0sSUFBSSxFQUFFLGdCQUFnQjtBQUM1QixDQUFBLE1BQU0sSUFBSSxFQUFFLGtCQUFrQjtBQUM5QixDQUFBLE1BQU0sSUFBSSxFQUFFLG1CQUFtQjtBQUMvQixDQUFBLE1BQU0sSUFBSSxFQUFFLG1CQUFtQjtBQUMvQixDQUFBLE1BQU0sSUFBSSxFQUFFLGdCQUFnQjtBQUM1QixDQUFBLE1BQU0sSUFBSSxFQUFFLGdCQUFnQjtBQUM1QixDQUFBLE1BQU0sSUFBSSxFQUFFLGtCQUFrQjtBQUM5QixDQUFBLE1BQU0sSUFBSSxFQUFFLGtCQUFrQjtBQUM5QixDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFVBQVUsRUFBRSxVQUFVLE9BQU8sRUFBRTtBQUNqQyxDQUFBLElBQUksT0FBTyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLENBQUEsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUUvQyxDQUFBO0FBQ0EsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQztBQUNwRCxDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkMsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV0QyxDQUFBLElBQUksSUFBSSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUNqRSxDQUFBLElBQUksSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN4QyxDQUFBLE1BQU0sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDckUsQ0FBQSxNQUFNLE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNoRCxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDNUIsQ0FBQSxNQUFNLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2RCxDQUFBLEtBQUs7O0FBRUwsQ0FBQTtBQUNBLENBQUEsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZFLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsVUFBVSxFQUFFLFVBQVUsU0FBUyxFQUFFO0FBQ25DLENBQUEsSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUNsRCxDQUFBLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO0FBQ3RDLENBQUEsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7QUFDOUYsQ0FBQSxNQUFNLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNwQixDQUFBLE1BQU0sQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3BCLENBQUEsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsVUFBVSxFQUFFLFVBQVUsTUFBTSxFQUFFLElBQUksRUFBRTtBQUN0QyxDQUFBLElBQUksSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFN0MsQ0FBQSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM1RSxDQUFBLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOztBQUU5RSxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtBQUNsQyxDQUFBLE1BQU0sSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDNUIsQ0FBQSxLQUFLOztBQUVMLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7O0FBRWxCLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ25FLENBQUEsTUFBTSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekMsQ0FBQSxLQUFLLE1BQU07QUFDWCxDQUFBLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsWUFBWTtBQUN0QyxDQUFBLFFBQVEsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNDLENBQUEsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2YsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUcsRUFBRTtBQUN4QixDQUFBO0FBQ0EsQ0FBQSxJQUFJLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUU1QixDQUFBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDdkIsQ0FBQSxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQy9DLENBQUEsUUFBUSxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtBQUNqRCxDQUFBLFVBQVUsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO0FBQzFGLENBQUEsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLGtCQUFrQixJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUU7QUFDN0YsQ0FBQSxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7QUFDOUQsQ0FBQSxZQUFZLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFDekUsQ0FBQSxXQUFXO0FBQ1gsQ0FBQSxVQUFVLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxLQUFLLE1BQU0sSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO0FBQ2xGLENBQUEsWUFBWSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUM5QixDQUFBO0FBQ0EsQ0FBQSxZQUFZLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQ3BELENBQUEsWUFBWSxJQUFJLGtCQUFrQixHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQzs7QUFFdEUsQ0FBQSxZQUFZLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hELENBQUEsY0FBYyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUMsQ0FBQSxjQUFjLEtBQUssSUFBSSxFQUFFLElBQUksa0JBQWtCLEVBQUU7QUFDakQsQ0FBQSxnQkFBZ0IsSUFBSSxVQUFVLEdBQUcsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7O0FBRXhELENBQUEsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsRUFBRTtBQUNoSCxDQUFBLGtCQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDckQsQ0FBQSxrQkFBa0IsTUFBTTtBQUN4QixDQUFBLGlCQUFpQjtBQUNqQixDQUFBLGVBQWU7QUFDZixDQUFBLGFBQWE7O0FBRWIsQ0FBQSxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEMsQ0FBQSxXQUFXLE1BQU07QUFDakIsQ0FBQSxZQUFZLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDeEIsQ0FBQSxjQUFjLElBQUksQ0FBQyx3TEFBd0wsQ0FBQyxDQUFDO0FBQzdNLENBQUEsYUFBYTtBQUNiLENBQUEsV0FBVztBQUNYLENBQUEsU0FBUztBQUNULENBQUEsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2YsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNoRCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFFBQVEsRUFBRSxVQUFVLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDekMsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM3QyxDQUFBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxRQUFRLEVBQUUsWUFBWTtBQUN4QixDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ25DLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsSUFBSSxFQUFFLFlBQVk7QUFDcEIsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUMvQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBQ3JCLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDaEMsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxZQUFZLEVBQUUsVUFBVSxLQUFLLEVBQUU7QUFDakMsQ0FBQSxJQUFJLElBQUksT0FBTyxHQUFHLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDcEMsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUNsSCxDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQy9CLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxDQUFBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFO0FBQ2pELENBQUEsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLENBQUEsSUFBSSxPQUFPLElBQUksR0FBRyxVQUFVLENBQUM7QUFDN0IsQ0FBQSxHQUFHO0FBQ0gsQ0FBQSxDQUFDLENBQUMsQ0FBQzs7QUFFSCxDQUFPLFNBQVMsYUFBYSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDN0MsQ0FBQSxFQUFFLE9BQU8sSUFBSSxhQUFhLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pDLENBQUEsQ0FBQzs7Q0M1S0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7QUFDcEMsQ0FBQSxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUcsRUFBRTtBQUN4QixDQUFBLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxDQUFDO0FBQzdDLENBQUEsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNuRCxDQUFBLEdBQUc7QUFDSCxDQUFBLEVBQUUsTUFBTSxFQUFFLFlBQVk7QUFDdEIsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO0FBQ2xELENBQUEsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pELENBQUEsS0FBSyxNQUFNO0FBQ1gsQ0FBQSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0YsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHO0FBQ0gsQ0FBQSxDQUFDLENBQUMsQ0FBQzs7QUFFSCxDQUFPLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOztBQUV4QyxDQUFBLEVBQUUsT0FBTyxFQUFFO0FBQ1gsQ0FBQSxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQSxJQUFJLFFBQVEsRUFBRSxPQUFPO0FBQ3JCLENBQUEsSUFBSSxDQUFDLEVBQUUsT0FBTztBQUNkLENBQUEsSUFBSSxPQUFPLEVBQUUsSUFBSTtBQUNqQixDQUFBLElBQUksV0FBVyxFQUFFLElBQUk7QUFDckIsQ0FBQSxJQUFJLFdBQVcsRUFBRSxLQUFLO0FBQ3RCLENBQUEsSUFBSSxHQUFHLEVBQUUsRUFBRTtBQUNYLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRyxFQUFFO0FBQ3hCLENBQUE7QUFDQSxDQUFBLElBQUksa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTVCLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRXBGLENBQUEsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUUxQyxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRTtBQUN4RixDQUFBLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdkMsQ0FBQSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQ25DLENBQUEsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDaEQsQ0FBQSxNQUFNLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ2hDLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUVuQixDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ3JCLENBQUEsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0RCxDQUFBLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1RCxDQUFBLEtBQUs7O0FBRUwsQ0FBQTtBQUNBLENBQUEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxFQUFFLFFBQVEsRUFBRTtBQUMzQyxDQUFBLE1BQU0sSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFO0FBQ2pHLENBQUEsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDO0FBQzFELENBQUEsUUFBUSxHQUFHLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0FBQ3JFLENBQUEsT0FBTztBQUNQLENBQUEsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2IsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxRQUFRLEVBQUUsVUFBVSxHQUFHLEVBQUU7QUFDM0IsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUM1QixDQUFBLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2hELENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ3JCLENBQUEsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN2RCxDQUFBLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM3RCxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2pELENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxFQUFFLFlBQVksRUFBRTtBQUN6QyxDQUFBLElBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztBQUNwQyxDQUFBLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDNUIsQ0FBQSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4QyxDQUFBLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDN0IsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtBQUNuQixDQUFBLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEQsQ0FBQSxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDNUQsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsV0FBVyxFQUFFLFlBQVk7QUFDM0IsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtBQUNuQixDQUFBLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLENBQUEsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN2RCxDQUFBLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM3RCxDQUFBLEtBQUs7QUFDTCxDQUFBLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDeEIsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsWUFBWSxFQUFFLFlBQVk7QUFDNUIsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztBQUNwQyxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQzVCLENBQUEsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3hDLENBQUEsS0FBSztBQUNMLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFdBQVcsRUFBRSxZQUFZO0FBQzNCLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7QUFDbkMsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUM1QixDQUFBLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN2QyxDQUFBLEtBQUs7QUFDTCxDQUFBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxjQUFjLEVBQUUsWUFBWTtBQUM5QixDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztBQUNwQyxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFVBQVUsRUFBRSxZQUFZO0FBQzFCLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ2hDLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsVUFBVSxFQUFFLFVBQVUsT0FBTyxFQUFFO0FBQ2pDLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDbkMsQ0FBQSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNDLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFlBQVksRUFBRSxZQUFZO0FBQzVCLENBQUEsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoRCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFlBQVksRUFBRSxVQUFVLElBQUksRUFBRSxFQUFFLEVBQUU7QUFDcEMsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUM3QixDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDbkIsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsUUFBUSxFQUFFLFVBQVUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUN6QyxDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzdDLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFlBQVksRUFBRSxVQUFVLEtBQUssRUFBRTtBQUNqQyxDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckMsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsWUFBWSxFQUFFLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7QUFDcEQsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtBQUNuQixDQUFBO0FBQ0EsQ0FBQSxNQUFNLElBQUksV0FBVyxFQUFFO0FBQ3ZCLENBQUEsUUFBUSxHQUFHLEdBQUcsT0FBTyxHQUFHLFdBQVcsR0FBRyxVQUFVLEdBQUcsR0FBRyxDQUFDO0FBQ3ZELENBQUEsT0FBTztBQUNQLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUEsTUFBTSxJQUFJLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQzNDLENBQUEsUUFBUSxPQUFPLEVBQUUsQ0FBQztBQUNsQixDQUFBLFFBQVEsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztBQUN6QyxDQUFBLFFBQVEsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztBQUM3QixDQUFBLFFBQVEsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDakQsQ0FBQSxRQUFRLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7QUFDN0MsQ0FBQSxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUUxQixDQUFBO0FBQ0EsQ0FBQSxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ3RDLENBQUEsUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDdkIsQ0FBQSxVQUFVLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDbEMsQ0FBQSxVQUFVLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7O0FBRTVDLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBLFVBQVUsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUU7QUFDakcsQ0FBQSxZQUFZLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDOztBQUUxQyxDQUFBLFlBQVksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7QUFDbkQsQ0FBQSxjQUFjLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNsQyxDQUFBLGFBQWEsTUFBTTtBQUNuQixDQUFBLGNBQWMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2pDLENBQUEsYUFBYTs7QUFFYixDQUFBLFlBQVksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFO0FBQ3RELENBQUEsY0FBYyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xFLENBQUEsYUFBYSxNQUFNO0FBQ25CLENBQUEsY0FBYyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3RFLENBQUEsYUFBYTs7QUFFYixDQUFBLFlBQVksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtBQUN2QyxDQUFBLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUMsQ0FBQSxhQUFhOztBQUViLENBQUEsWUFBWSxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO0FBQzNDLENBQUEsY0FBYyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNsRCxDQUFBLGFBQWE7QUFDYixDQUFBLFdBQVcsTUFBTTtBQUNqQixDQUFBLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDNUMsQ0FBQSxXQUFXO0FBQ1gsQ0FBQSxTQUFTOztBQUVULENBQUEsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUMxQixDQUFBLFVBQVUsTUFBTSxFQUFFLE1BQU07QUFDeEIsQ0FBQSxTQUFTLENBQUMsQ0FBQztBQUNYLENBQUEsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVmLENBQUEsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUMzQixDQUFBLFFBQVEsTUFBTSxFQUFFLE1BQU07QUFDdEIsQ0FBQSxPQUFPLENBQUMsQ0FBQztBQUNULENBQUEsS0FBSztBQUNMLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsT0FBTyxFQUFFLFlBQVk7QUFDdkIsQ0FBQSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ3BCLENBQUEsTUFBTSxPQUFPO0FBQ2IsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ25DLENBQUEsSUFBSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztBQUV2QyxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO0FBQzdCLENBQUEsTUFBTSxPQUFPO0FBQ2IsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRTtBQUMxRSxDQUFBLE1BQU0sT0FBTztBQUNiLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO0FBQ3BFLENBQUEsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzlELENBQUEsTUFBTSxPQUFPO0FBQ2IsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs7QUFFM0MsQ0FBQSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsWUFBWSxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFO0FBQzVELENBQUEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QixDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDbkUsQ0FBQTtBQUNBLENBQUEsTUFBTSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbEUsQ0FBQSxNQUFNLElBQUksT0FBTyxFQUFFO0FBQ25CLENBQUEsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1RSxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ2pDLENBQUEsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0FBQ3BDLENBQUEsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDL0IsQ0FBQSxHQUFHO0FBQ0gsQ0FBQSxDQUFDLENBQUMsQ0FBQzs7Q0MxUEksSUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQzs7QUFFOUMsQ0FBQSxFQUFFLE9BQU8sRUFBRTtBQUNYLENBQUEsSUFBSSxjQUFjLEVBQUUsR0FBRztBQUN2QixDQUFBLElBQUksTUFBTSxFQUFFLFFBQVE7QUFDcEIsQ0FBQSxJQUFJLFdBQVcsRUFBRSxJQUFJO0FBQ3JCLENBQUEsSUFBSSxDQUFDLEVBQUUsTUFBTTtBQUNiLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsS0FBSyxFQUFFLFlBQVk7QUFDckIsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNoQyxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFFBQVEsRUFBRSxZQUFZO0FBQ3hCLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbkMsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxVQUFVLEVBQUUsVUFBVSxPQUFPLEVBQUU7QUFDakMsQ0FBQSxJQUFJLE9BQU8sQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekMsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV0QyxDQUFBLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsWUFBWSxFQUFFLFVBQVUsU0FBUyxFQUFFO0FBQ3JDLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDdkMsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNuQixDQUFBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxZQUFZLEVBQUUsWUFBWTtBQUM1QixDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztBQUNsQyxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFVBQVUsRUFBRSxVQUFVLE9BQU8sRUFBRTtBQUNqQyxDQUFBLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNqQyxDQUFBLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQyxDQUFBLEtBQUssTUFBTTtBQUNYLENBQUEsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDaEQsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNuQixDQUFBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxVQUFVLEVBQUUsWUFBWTtBQUMxQixDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUNoQyxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFNBQVMsRUFBRSxVQUFVLE1BQU0sRUFBRSxvQkFBb0IsRUFBRTtBQUNyRCxDQUFBLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUNoQyxDQUFBLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QyxDQUFBLEtBQUssTUFBTTtBQUNYLENBQUEsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDOUMsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxJQUFJLElBQUksb0JBQW9CLEVBQUU7QUFDOUIsQ0FBQSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7QUFDL0QsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNuQixDQUFBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxTQUFTLEVBQUUsWUFBWTtBQUN6QixDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUMvQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLHVCQUF1QixFQUFFLFlBQVk7QUFDdkMsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztBQUM3QyxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsYUFBYSxFQUFFO0FBQzdDLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFDL0MsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNuQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLGdCQUFnQixFQUFFLFlBQVk7QUFDaEMsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7QUFDdEMsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxhQUFhLEVBQUUsVUFBVSxVQUFVLEVBQUU7QUFDdkMsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUN6QyxDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ25CLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsYUFBYSxFQUFFLFlBQVk7QUFDN0IsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDbkMsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDOUIsQ0FBQSxJQUFJLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUU7QUFDbkUsQ0FBQSxNQUFNLElBQUksS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFO0FBQzVCLENBQUEsTUFBTSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWTtBQUN6QyxDQUFBLFFBQVEsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDOUQsQ0FBQSxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDckIsQ0FBQSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRWIsQ0FBQSxJQUFJLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV2RCxDQUFBO0FBQ0EsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7QUFDakMsQ0FBQSxNQUFNLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3RCxDQUFBO0FBQ0EsQ0FBQSxLQUFLOztBQUVMLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBOztBQUVBLENBQUEsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVsQyxDQUFBO0FBQ0EsQ0FBQSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7QUFDbkMsQ0FBQSxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUMvQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLGtCQUFrQixFQUFFLFlBQVk7QUFDbEMsQ0FBQSxJQUFJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDdkMsQ0FBQSxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDbkMsQ0FBQSxJQUFJLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlELENBQUEsSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFOUQsQ0FBQTtBQUNBLENBQUEsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5RCxDQUFBLElBQUksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRWpFLENBQUEsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUN4QyxDQUFBLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDaEMsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7O0FBRXBFLENBQUEsSUFBSSxJQUFJLE1BQU0sR0FBRztBQUNqQixDQUFBLE1BQU0sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDOUMsQ0FBQSxNQUFNLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNqQyxDQUFBLE1BQU0sTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtBQUNqQyxDQUFBLE1BQU0sV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVztBQUMzQyxDQUFBLE1BQU0sTUFBTSxFQUFFLEVBQUU7QUFDaEIsQ0FBQSxNQUFNLE9BQU8sRUFBRSxFQUFFO0FBQ2pCLENBQUEsS0FBSyxDQUFDOztBQUVOLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO0FBQzlDLENBQUEsTUFBTSxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNsRixDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7QUFDaEMsQ0FBQSxNQUFNLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7QUFDaEQsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFO0FBQ3BDLENBQUEsTUFBTSxNQUFNLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO0FBQ3hELENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFO0FBQ3pDLENBQUEsTUFBTSxNQUFNLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztBQUNsRSxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7QUFDOUIsQ0FBQSxNQUFNLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFDNUMsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO0FBQzdCLENBQUEsTUFBTSxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQzFDLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFO0FBQzNDLENBQUEsTUFBTSxNQUFNLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztBQUN0RSxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO0FBQ3BDLENBQUEsTUFBTSxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUNoRCxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7QUFDcEMsQ0FBQSxNQUFNLE1BQU0sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3hFLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtBQUNqQyxDQUFBLE1BQU0sTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbEUsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLGNBQWMsRUFBRSxVQUFVLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDNUMsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO0FBQ25DLENBQUEsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLFVBQVUsS0FBSyxFQUFFLFFBQVEsRUFBRTtBQUM3RSxDQUFBLFFBQVEsSUFBSSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUU7QUFDOUIsQ0FBQSxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDaEMsQ0FBQSxVQUFVLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1RCxDQUFBLFNBQVM7QUFDVCxDQUFBLFFBQVEsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2pELENBQUEsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2YsQ0FBQSxLQUFLLE1BQU07QUFDWCxDQUFBLE1BQU0sTUFBTSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7QUFDekIsQ0FBQSxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2xHLENBQUEsS0FBSztBQUNMLENBQUEsR0FBRztBQUNILENBQUEsQ0FBQyxDQUFDLENBQUM7O0FBRUgsQ0FBTyxTQUFTLGFBQWEsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQzdDLENBQUEsRUFBRSxPQUFPLElBQUksYUFBYSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6QyxDQUFBLENBQUM7O0NDM01NLElBQUksZUFBZSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7O0FBRWhELENBQUEsRUFBRSxPQUFPLEVBQUU7QUFDWCxDQUFBLElBQUksY0FBYyxFQUFFLEdBQUc7QUFDdkIsQ0FBQSxJQUFJLE1BQU0sRUFBRSxLQUFLO0FBQ2pCLENBQUEsSUFBSSxTQUFTLEVBQUUsS0FBSztBQUNwQixDQUFBLElBQUksV0FBVyxFQUFFLEtBQUs7QUFDdEIsQ0FBQSxJQUFJLE1BQU0sRUFBRSxPQUFPO0FBQ25CLENBQUEsSUFBSSxXQUFXLEVBQUUsSUFBSTtBQUNyQixDQUFBLElBQUksQ0FBQyxFQUFFLE1BQU07QUFDYixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFVBQVUsRUFBRSxVQUFVLE9BQU8sRUFBRTtBQUNqQyxDQUFBLElBQUksT0FBTyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2QyxDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRXRDLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUU7QUFDbEUsQ0FBQSxNQUFNLE9BQU8sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ3pCLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWTtBQUNoQyxDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztBQUN0QyxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsYUFBYSxFQUFFO0FBQzdDLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFDL0MsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNuQixDQUFBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxTQUFTLEVBQUUsWUFBWTtBQUN6QixDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUMvQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFNBQVMsRUFBRSxVQUFVLE1BQU0sRUFBRTtBQUMvQixDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ2pDLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDbkIsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsWUFBWSxFQUFFLFlBQVk7QUFDNUIsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7QUFDbEMsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxZQUFZLEVBQUUsVUFBVSxTQUFTLEVBQUU7QUFDckMsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUN2QyxDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ25CLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLGNBQWMsRUFBRSxZQUFZO0FBQzlCLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0FBQ3BDLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsY0FBYyxFQUFFLFVBQVUsV0FBVyxFQUFFO0FBQ3pDLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDM0MsQ0FBQSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNuQixDQUFBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxLQUFLLEVBQUUsWUFBWTtBQUNyQixDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2hDLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsUUFBUSxFQUFFLFlBQVk7QUFDeEIsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNuQyxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLElBQUksRUFBRSxZQUFZO0FBQ3BCLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDL0IsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDOUIsQ0FBQSxJQUFJLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRTtBQUM3RSxDQUFBLE1BQU0sSUFBSSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUU7QUFDNUIsQ0FBQSxNQUFNLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZO0FBQ3pDLENBQUEsUUFBUSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3hFLENBQUEsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLENBQUEsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUViLENBQUEsSUFBSSxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUVyRSxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUM3QixDQUFBLE1BQU0sZUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDekUsQ0FBQSxLQUFLLE1BQU07QUFDWCxDQUFBLE1BQU0sZUFBZSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4QyxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRWxDLENBQUE7QUFDQSxDQUFBLElBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztBQUNuQyxDQUFBLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQy9CLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsa0JBQWtCLEVBQUUsWUFBWTtBQUNsQyxDQUFBLElBQUksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUN2QyxDQUFBLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNuQyxDQUFBLElBQUksSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztBQUNsRSxDQUFBLElBQUksSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztBQUNsRSxDQUFBLElBQUksSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVwRSxDQUFBO0FBQ0EsQ0FBQSxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlELENBQUEsSUFBSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFakUsQ0FBQSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3hDLENBQUEsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNoQyxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLElBQUksTUFBTSxHQUFHO0FBQ2pCLENBQUEsTUFBTSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUM5QyxDQUFBLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2pDLENBQUEsTUFBTSxHQUFHLEVBQUUsRUFBRTtBQUNiLENBQUEsTUFBTSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO0FBQ2pDLENBQUEsTUFBTSxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXO0FBQzNDLENBQUEsTUFBTSxNQUFNLEVBQUUsRUFBRTtBQUNoQixDQUFBLE1BQU0sT0FBTyxFQUFFLEVBQUU7QUFDakIsQ0FBQSxLQUFLLENBQUM7O0FBRU4sQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7QUFDcEMsQ0FBQSxNQUFNLE1BQU0sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7QUFDeEQsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO0FBQzdCLENBQUEsTUFBTSxNQUFNLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUQsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO0FBQ2hDLENBQUEsTUFBTSxNQUFNLENBQUMsU0FBUyxHQUFHLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN0SSxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7QUFDbEMsQ0FBQSxNQUFNLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3BFLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtBQUM5QyxDQUFBLE1BQU0sTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDbEYsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtBQUNwQyxDQUFBLE1BQU0sTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDaEQsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO0FBQzVCLENBQUEsTUFBTSxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQ3hDLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxjQUFjLEVBQUUsVUFBVSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQzVDLENBQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTtBQUNuQyxDQUFBLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDeEUsQ0FBQSxRQUFRLElBQUksS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFOztBQUU5QixDQUFBLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtBQUNoQyxDQUFBLFVBQVUsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVELENBQUEsU0FBUztBQUNULENBQUEsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO0FBQ2hDLENBQUEsVUFBVSxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQ25FLENBQUEsU0FBUztBQUNULENBQUEsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDM0IsQ0FBQSxVQUFVLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNuRCxDQUFBLFNBQVMsTUFBTTtBQUNmLENBQUEsVUFBVSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM5RSxDQUFBLFNBQVM7QUFDVCxDQUFBLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNmLENBQUEsS0FBSyxNQUFNO0FBQ1gsQ0FBQSxNQUFNLE1BQU0sQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO0FBQ3pCLENBQUEsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM3RixDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUc7QUFDSCxDQUFBLENBQUMsQ0FBQyxDQUFDOztBQUVILENBQU8sU0FBUyxlQUFlLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRTtBQUMvQyxDQUFBLEVBQUUsT0FBTyxJQUFJLGVBQWUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDM0MsQ0FBQSxDQUFDOztDQ3hMRCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzs7QUFFakMsQ0FBQSxFQUFFLE9BQU8sRUFBRTtBQUNYLENBQUEsSUFBSSxRQUFRLEVBQUUsR0FBRztBQUNqQixDQUFBLElBQUksY0FBYyxFQUFFLEdBQUc7QUFDdkIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxVQUFVLEVBQUUsVUFBVSxPQUFPLEVBQUU7QUFDakMsQ0FBQSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMxQyxDQUFBLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDMUIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFHLEVBQUU7QUFDeEIsQ0FBQSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ3BCLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEYsQ0FBQSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNsQixDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ25CLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsUUFBUSxFQUFFLFlBQVk7QUFDeEIsQ0FBQSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzFELENBQUEsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDeEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxTQUFTLEVBQUUsWUFBWTtBQUN6QixDQUFBLElBQUksSUFBSSxNQUFNLEdBQUc7QUFDakIsQ0FBQSxNQUFNLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztBQUMzQixDQUFBLE1BQU0sU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVO0FBQ2hDLENBQUEsTUFBTSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU07QUFDMUIsQ0FBQSxLQUFLLENBQUM7O0FBRU4sQ0FBQSxJQUFJLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsS0FBSyxFQUFFLFVBQVUsR0FBRyxFQUFFO0FBQ3hCLENBQUEsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFVBQVUsRUFBRSxVQUFVLEdBQUcsRUFBRTtBQUM3QixDQUFBLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQixDQUFBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxVQUFVLEVBQUUsWUFBWTtBQUMxQixDQUFBLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDekIsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxNQUFNLEVBQUUsWUFBWTtBQUN0QixDQUFBLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOztBQUV4QixDQUFBLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDckIsQ0FBQSxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQzNCLENBQUEsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFBLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDekIsQ0FBQSxJQUFJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7O0FBRW5ELENBQUEsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDdEIsQ0FBQSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBQzFCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsVUFBVSxFQUFFLFlBQVk7QUFDMUIsQ0FBQSxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDeEIsQ0FBQSxJQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOztBQUU5QixDQUFBLElBQUksSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFOztBQUVqQyxDQUFBLElBQUksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOztBQUV2QyxDQUFBLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO0FBQ3JCLENBQUEsTUFBTSxJQUFJLENBQUMsUUFBUSxHQUFHO0FBQ3RCLENBQUEsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztBQUNqRSxDQUFBLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7QUFDaEUsQ0FBQSxPQUFPLENBQUM7QUFDUixDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtBQUNyQixDQUFBLE1BQU0sSUFBSSxDQUFDLFFBQVEsR0FBRztBQUN0QixDQUFBLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7QUFDakUsQ0FBQSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO0FBQ2hFLENBQUEsT0FBTyxDQUFDO0FBQ1IsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxZQUFZLEVBQUUsWUFBWTtBQUM1QixDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUNqQyxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLE9BQU8sRUFBRSxZQUFZO0FBQ3ZCLENBQUEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtBQUNwQixDQUFBLE1BQU0sT0FBTztBQUNiLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUM1QyxDQUFBLElBQUksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOztBQUV2QyxDQUFBO0FBQ0EsQ0FBQSxJQUFJLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxNQUFNO0FBQzdCLENBQUEsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUU7QUFDM0MsQ0FBQSxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7O0FBRTdDLENBQUEsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdkMsQ0FBQSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRS9CLENBQUEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzlCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsU0FBUyxFQUFFLFVBQVUsTUFBTSxFQUFFO0FBQy9CLENBQUEsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDbkIsQ0FBQSxJQUFJLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNwQyxDQUFBLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFbkMsQ0FBQSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUM7QUFDckIsQ0FBQTtBQUNBLENBQUEsSUFBSSxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkQsQ0FBQSxNQUFNLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsR0FB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QVEsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO0FBQzNCLENBQUEsUUFBUSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07QUFDM0IsQ0FBQSxPQUFPLENBQUMsQ0FBQztBQUNULENBQUEsS0FBSztBQUNMLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsWUFBWSxFQUFFLFlBQVk7QUFDNUIsQ0FBQSxJQUFJLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNqQyxDQUFBLE1BQU0sSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDM0MsQ0FBQSxNQUFNLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDOztBQUUzQyxDQUFBLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQzFCLENBQUEsUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN2QyxDQUFBLE9BQU87O0FBRVAsQ0FBQSxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQzdCLENBQUEsUUFBUSxNQUFNLEVBQUUsTUFBTTtBQUN0QixDQUFBLFFBQVEsTUFBTSxFQUFFLE1BQU07QUFDdEIsQ0FBQSxPQUFPLENBQUMsQ0FBQztBQUNULENBQUEsS0FBSztBQUNMLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsUUFBUSxFQUFFLFVBQVUsTUFBTSxFQUFFO0FBQzlCLENBQUE7QUFDQSxDQUFBLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFN0IsQ0FBQTtBQUNBLENBQUEsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTVDLENBQUE7QUFDQSxDQUFBLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMs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LENBQUMsV0FBVyxDQUFDLENBQUM7QUFDM0MsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSx1QkFBdUIsRUFBRSxVQUFVLE9BQU8sRUFBRTtBQUM5QyxDQUFBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7QUFDaEQsQ0FBQSxNQUFNLE9BQU8sSUFBSSxDQUFDO0FBQ2xCLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM1QyxDQUFBLElBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFeEMsQ0FBQSxJQUFJLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7QUFDcEQsQ0FBQSxNQUFNLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdELENBQUEsTUFBTSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzVDLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO0FBQ3BFLENBQUEsTUFBTSxJQUFJLFNBQVMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEUsQ0FBQSxNQUFNLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFVB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