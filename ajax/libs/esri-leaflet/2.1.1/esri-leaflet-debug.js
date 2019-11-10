/* esri-leaflet - v2.1.1 - Fri Aug 11 2017 12:59:40 GMT-0700 (PDT)
 * Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}),global.L));
}(this, function (exports,L$1) { 'use strict';

	var L$1__default = 'default' in L$1 ? L$1['default'] : L$1;

	var version = "2.1.1";

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
	  url = L$1.Util.trim(url);

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
	  _setGeometry: _setGeometry,
	  _getAttributionData: _getAttributionData,
	  _updateMapAttribution: _updateMapAttribution
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
	    options.url = cleanUrl(options.url);
	    options = L$1.Util.setOptions(this, options);

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

	    this._requestExport(params, bounds);
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
	    options.url = cleanUrl(options.url);
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

	    var identifyRequest = this.identify().on(this._map).at(e.latlng);

	    // remove extraneous vertices from response features
	    identifyRequest.simplify(this._map, 0.5);

	    if (this.options.layers) {
	      identifyRequest.layers('visible:' + this.options.layers.join(','));
	    } else {
	      identifyRequest.layers('visible');
	    }

	    // if present, pass layer ids and sql filters through to the identify task
	    if (this.options.layerDefs && typeof this.options.layerDefs !== 'string') {
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

	    options.url = cleanUrl(options.url);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvU3VwcG9ydC5qcyIsIi4uL3NyYy9PcHRpb25zLmpzIiwiLi4vc3JjL1JlcXVlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvYXJjZ2lzLXRvLWdlb2pzb24tdXRpbHMvaW5kZXguanMiLCIuLi9zcmMvVXRpbC5qcyIsIi4uL3NyYy9UYXNrcy9UYXNrLmpzIiwiLi4vc3JjL1Rhc2tzL1F1ZXJ5LmpzIiwiLi4vc3JjL1Rhc2tzL0ZpbmQuanMiLCIuLi9zcmMvVGFza3MvSWRlbnRpZnkuanMiLCIuLi9zcmMvVGFza3MvSWRlbnRpZnlGZWF0dXJlcy5qcyIsIi4uL3NyYy9UYXNrcy9JZGVudGlmeUltYWdlLmpzIiwiLi4vc3JjL1NlcnZpY2VzL1NlcnZpY2UuanMiLCIuLi9zcmMvU2VydmljZXMvTWFwU2VydmljZS5qcyIsIi4uL3NyYy9TZXJ2aWNlcy9JbWFnZVNlcnZpY2UuanMiLCIuLi9zcmMvU2VydmljZXMvRmVhdHVyZUxheWVyU2VydmljZS5qcyIsIi4uL3NyYy9MYXllcnMvQmFzZW1hcExheWVyLmpzIiwiLi4vc3JjL0xheWVycy9UaWxlZE1hcExheWVyLmpzIiwiLi4vc3JjL0xheWVycy9SYXN0ZXJMYXllci5qcyIsIi4uL3NyYy9MYXllcnMvSW1hZ2VNYXBMYXllci5qcyIsIi4uL3NyYy9MYXllcnMvRHluYW1pY01hcExheWVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xlYWZsZXQtdmlydHVhbC1ncmlkL3NyYy92aXJ0dWFsLWdyaWQuanMiLCIuLi9ub2RlX21vZHVsZXMvdGlueS1iaW5hcnktc2VhcmNoL2luZGV4LmpzIiwiLi4vc3JjL0xheWVycy9GZWF0dXJlTGF5ZXIvRmVhdHVyZU1hbmFnZXIuanMiLCIuLi9zcmMvTGF5ZXJzL0ZlYXR1cmVMYXllci9GZWF0dXJlTGF5ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXRcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkxlYWZsZXQgcGx1Z2lucyBmb3IgY29uc3VtaW5nIEFyY0dJUyBPbmxpbmUgYW5kIEFyY0dJUyBTZXJ2ZXIgc2VydmljZXMuXCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMS4xXCIsXG4gIFwiYXV0aG9yXCI6IFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gIFwiYnJvd3NlclwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWRlYnVnLmpzXCIsXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vZXNyaS9lc3JpLWxlYWZsZXQvaXNzdWVzXCJcbiAgfSxcbiAgXCJjb250cmlidXRvcnNcIjogW1xuICAgIFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gICAgXCJKb2huIEdyYXZvaXMgPGpncmF2b2lzQGVzcmkuY29tPiAoaHR0cDovL2pvaG5ncmF2b2lzLmNvbSlcIlxuICBdLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJhcmNnaXMtdG8tZ2VvanNvbi11dGlsc1wiOiBcIl4xLjAuMVwiLFxuICAgIFwibGVhZmxldC12aXJ0dWFsLWdyaWRcIjogXCJeMS4wLjNcIixcbiAgICBcInRpbnktYmluYXJ5LXNlYXJjaFwiOiBcIl4xLjAuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCIzLjUuMFwiLFxuICAgIFwiZ2gtcmVsZWFzZVwiOiBcIl4yLjAuMFwiLFxuICAgIFwiaGlnaGxpZ2h0LmpzXCI6IFwiXjguMC4wXCIsXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4wLjguNVwiLFxuICAgIFwiaHVza3lcIjogXCJeMC4xMi4wXCIsXG4gICAgXCJpc3BhcnRhXCI6IFwiXjQuMC4wXCIsXG4gICAgXCJpc3RhbmJ1bFwiOiBcIl4wLjQuMlwiLFxuICAgIFwia2FybWFcIjogXCJeMS43LjBcIixcbiAgICBcImthcm1hLWNoYWktc2lub25cIjogXCJeMC4xLjNcIixcbiAgICBcImthcm1hLWNvdmVyYWdlXCI6IFwiXjEuMS4xXCIsXG4gICAgXCJrYXJtYS1tb2NoYVwiOiBcIl4xLjMuMFwiLFxuICAgIFwia2FybWEtbW9jaGEtcmVwb3J0ZXJcIjogXCJeMi4yLjFcIixcbiAgICBcImthcm1hLXBoYW50b21qcy1sYXVuY2hlclwiOiBcIl4wLjIuMFwiLFxuICAgIFwia2FybWEtc291cmNlbWFwLWxvYWRlclwiOiBcIl4wLjMuNVwiLFxuICAgIFwibWtkaXJwXCI6IFwiXjAuNS4xXCIsXG4gICAgXCJtb2NoYVwiOiBcIl4zLjQuMlwiLFxuICAgIFwibnBtLXJ1bi1hbGxcIjogXCJeNC4wLjJcIixcbiAgICBcInBoYW50b21qc1wiOiBcIl4xLjkuOFwiLFxuICAgIFwicm9sbHVwXCI6IFwiXjAuMjUuNFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1qc29uXCI6IFwiXjIuMy4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLW5vZGUtcmVzb2x2ZVwiOiBcIl4xLjQuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi11Z2xpZnlcIjogXCJeMC4zLjFcIixcbiAgICBcInNlbWlzdGFuZGFyZFwiOiBcIl45LjAuMFwiLFxuICAgIFwic2lub25cIjogXCJeMS4xMS4xXCIsXG4gICAgXCJzaW5vbi1jaGFpXCI6IFwiMi44LjBcIixcbiAgICBcInNuYXp6eVwiOiBcIl41LjAuMFwiLFxuICAgIFwidWdsaWZ5LWpzXCI6IFwiXjIuOC4yOVwiLFxuICAgIFwid2F0Y2hcIjogXCJeMC4xNy4xXCJcbiAgfSxcbiAgXCJob21lcGFnZVwiOiBcImh0dHA6Ly9lc3JpLmdpdGh1Yi5pby9lc3JpLWxlYWZsZXRcIixcbiAgXCJtb2R1bGVcIjogXCJzcmMvRXNyaUxlYWZsZXQuanNcIixcbiAgXCJqc25leHQ6bWFpblwiOiBcInNyYy9Fc3JpTGVhZmxldC5qc1wiLFxuICBcImpzcG1cIjoge1xuICAgIFwicmVnaXN0cnlcIjogXCJucG1cIixcbiAgICBcImZvcm1hdFwiOiBcImVzNlwiLFxuICAgIFwibWFpblwiOiBcInNyYy9Fc3JpTGVhZmxldC5qc1wiXG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwiYXJjZ2lzXCIsXG4gICAgXCJlc3JpXCIsXG4gICAgXCJlc3JpIGxlYWZsZXRcIixcbiAgICBcImdpc1wiLFxuICAgIFwibGVhZmxldCBwbHVnaW5cIixcbiAgICBcIm1hcHBpbmdcIlxuICBdLFxuICBcImxpY2Vuc2VcIjogXCJBcGFjaGUtMi4wXCIsXG4gIFwibWFpblwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWRlYnVnLmpzXCIsXG4gIFwicGVlckRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJsZWFmbGV0XCI6IFwifjEuMC4wXCJcbiAgfSxcbiAgXCJyZWFkbWVGaWxlbmFtZVwiOiBcIlJFQURNRS5tZFwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0QGdpdGh1Yi5jb206RXNyaS9lc3JpLWxlYWZsZXQuZ2l0XCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwicm9sbHVwIC1jIHByb2ZpbGVzL2RlYnVnLmpzICYgcm9sbHVwIC1jIHByb2ZpbGVzL3Byb2R1Y3Rpb24uanNcIixcbiAgICBcImxpbnRcIjogXCJzZW1pc3RhbmRhcmQgfCBzbmF6enlcIixcbiAgICBcInByZWJ1aWxkXCI6IFwibWtkaXJwIGRpc3RcIixcbiAgICBcInByZXB1Ymxpc2hcIjogXCJucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV0ZXN0XCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicHJlY29tbWl0XCI6IFwibnBtIHJ1biBsaW50XCIsXG4gICAgXCJyZWxlYXNlXCI6IFwiLi9zY3JpcHRzL3JlbGVhc2Uuc2hcIixcbiAgICBcInN0YXJ0LXdhdGNoXCI6IFwid2F0Y2ggXFxcIm5wbSBydW4gYnVpbGRcXFwiIHNyY1wiLFxuICAgIFwic3RhcnRcIjogXCJydW4tcCBzdGFydC13YXRjaCBzZXJ2ZVwiLFxuICAgIFwic2VydmVcIjogXCJodHRwLXNlcnZlciAtcCA1MDAwIC1jLTEgLW9cIixcbiAgICBcInRlc3RcIjogXCJucG0gcnVuIGxpbnQgJiYga2FybWEgc3RhcnRcIlxuICB9LFxuICBcInNlbWlzdGFuZGFyZFwiOiB7XG4gICAgXCJnbG9iYWxzXCI6IFtcbiAgICAgIFwiZXhwZWN0XCIsXG4gICAgICBcIkxcIixcbiAgICAgIFwiWE1MSHR0cFJlcXVlc3RcIixcbiAgICAgIFwic2lub25cIixcbiAgICAgIFwieGhyXCIsXG4gICAgICBcInByb2o0XCJcbiAgICBdXG4gIH1cbn1cbiIsImV4cG9ydCB2YXIgY29ycyA9ICgod2luZG93LlhNTEh0dHBSZXF1ZXN0ICYmICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKSkpO1xuZXhwb3J0IHZhciBwb2ludGVyRXZlbnRzID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPT09ICcnO1xuXG5leHBvcnQgdmFyIFN1cHBvcnQgPSB7XG4gIGNvcnM6IGNvcnMsXG4gIHBvaW50ZXJFdmVudHM6IHBvaW50ZXJFdmVudHNcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN1cHBvcnQ7XG4iLCJleHBvcnQgdmFyIG9wdGlvbnMgPSB7XG4gIGF0dHJpYnV0aW9uV2lkdGhPZmZzZXQ6IDU1XG59O1xuXG5leHBvcnQgZGVmYXVsdCBvcHRpb25zO1xuIiwiaW1wb3J0IHsgVXRpbCwgRG9tVXRpbCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi9TdXBwb3J0JztcbmltcG9ydCB7IHdhcm4gfSBmcm9tICcuL1V0aWwnO1xuXG52YXIgY2FsbGJhY2tzID0gMDtcblxuZnVuY3Rpb24gc2VyaWFsaXplIChwYXJhbXMpIHtcbiAgdmFyIGRhdGEgPSAnJztcblxuICBwYXJhbXMuZiA9IHBhcmFtcy5mIHx8ICdqc29uJztcblxuICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICB2YXIgcGFyYW0gPSBwYXJhbXNba2V5XTtcbiAgICAgIHZhciB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHBhcmFtKTtcbiAgICAgIHZhciB2YWx1ZTtcblxuICAgICAgaWYgKGRhdGEubGVuZ3RoKSB7XG4gICAgICAgIGRhdGEgKz0gJyYnO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICB2YWx1ZSA9IChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGFyYW1bMF0pID09PSAnW29iamVjdCBPYmplY3RdJykgPyBKU09OLnN0cmluZ2lmeShwYXJhbSkgOiBwYXJhbS5qb2luKCcsJyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkocGFyYW0pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICAgICAgdmFsdWUgPSBwYXJhbS52YWx1ZU9mKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHBhcmFtO1xuICAgICAgfVxuXG4gICAgICBkYXRhICs9IGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUmVxdWVzdCAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgdmFyIGh0dHBSZXF1ZXN0ID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpO1xuXG4gIGh0dHBSZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgIGh0dHBSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IFV0aWwuZmFsc2VGbjtcblxuICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwge1xuICAgICAgZXJyb3I6IHtcbiAgICAgICAgY29kZTogNTAwLFxuICAgICAgICBtZXNzYWdlOiAnWE1MSHR0cFJlcXVlc3QgZXJyb3InXG4gICAgICB9XG4gICAgfSwgbnVsbCk7XG4gIH07XG5cbiAgaHR0cFJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXNwb25zZTtcbiAgICB2YXIgZXJyb3I7XG5cbiAgICBpZiAoaHR0cFJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKGh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlc3BvbnNlID0gbnVsbDtcbiAgICAgICAgZXJyb3IgPSB7XG4gICAgICAgICAgY29kZTogNTAwLFxuICAgICAgICAgIG1lc3NhZ2U6ICdDb3VsZCBub3QgcGFyc2UgcmVzcG9uc2UgYXMgSlNPTi4gVGhpcyBjb3VsZCBhbHNvIGJlIGNhdXNlZCBieSBhIENPUlMgb3IgWE1MSHR0cFJlcXVlc3QgZXJyb3IuJ1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgIGVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgIHJlc3BvbnNlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaHR0cFJlcXVlc3Qub25lcnJvciA9IFV0aWwuZmFsc2VGbjtcblxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgIH1cbiAgfTtcblxuICBodHRwUmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vbmVycm9yKCk7XG4gIH07XG5cbiAgcmV0dXJuIGh0dHBSZXF1ZXN0O1xufVxuXG5mdW5jdGlvbiB4bWxIdHRwUG9zdCAodXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIHZhciBodHRwUmVxdWVzdCA9IGNyZWF0ZVJlcXVlc3QoY2FsbGJhY2ssIGNvbnRleHQpO1xuICBodHRwUmVxdWVzdC5vcGVuKCdQT1NUJywgdXJsKTtcblxuICBpZiAodHlwZW9mIGNvbnRleHQgIT09ICd1bmRlZmluZWQnICYmIGNvbnRleHQgIT09IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIGNvbnRleHQub3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGh0dHBSZXF1ZXN0LnRpbWVvdXQgPSBjb250ZXh0Lm9wdGlvbnMudGltZW91dDtcbiAgICB9XG4gIH1cbiAgaHR0cFJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCcpO1xuICBodHRwUmVxdWVzdC5zZW5kKHNlcmlhbGl6ZShwYXJhbXMpKTtcblxuICByZXR1cm4gaHR0cFJlcXVlc3Q7XG59XG5cbmZ1bmN0aW9uIHhtbEh0dHBHZXQgKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICB2YXIgaHR0cFJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0KGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgaHR0cFJlcXVlc3Qub3BlbignR0VUJywgdXJsICsgJz8nICsgc2VyaWFsaXplKHBhcmFtcyksIHRydWUpO1xuXG4gIGlmICh0eXBlb2YgY29udGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgY29udGV4dCAhPT0gbnVsbCkge1xuICAgIGlmICh0eXBlb2YgY29udGV4dC5vcHRpb25zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaHR0cFJlcXVlc3QudGltZW91dCA9IGNvbnRleHQub3B0aW9ucy50aW1lb3V0O1xuICAgIH1cbiAgfVxuICBodHRwUmVxdWVzdC5zZW5kKG51bGwpO1xuXG4gIHJldHVybiBodHRwUmVxdWVzdDtcbn1cblxuLy8gQUpBWCBoYW5kbGVycyBmb3IgQ09SUyAobW9kZXJuIGJyb3dzZXJzKSBvciBKU09OUCAob2xkZXIgYnJvd3NlcnMpXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdCAodXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIHZhciBwYXJhbVN0cmluZyA9IHNlcmlhbGl6ZShwYXJhbXMpO1xuICB2YXIgaHR0cFJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0KGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgdmFyIHJlcXVlc3RMZW5ndGggPSAodXJsICsgJz8nICsgcGFyYW1TdHJpbmcpLmxlbmd0aDtcblxuICAvLyBpZTEwLzExIHJlcXVpcmUgdGhlIHJlcXVlc3QgYmUgb3BlbmVkIGJlZm9yZSBhIHRpbWVvdXQgaXMgYXBwbGllZFxuICBpZiAocmVxdWVzdExlbmd0aCA8PSAyMDAwICYmIFN1cHBvcnQuY29ycykge1xuICAgIGh0dHBSZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCArICc/JyArIHBhcmFtU3RyaW5nKTtcbiAgfSBlbHNlIGlmIChyZXF1ZXN0TGVuZ3RoID4gMjAwMCAmJiBTdXBwb3J0LmNvcnMpIHtcbiAgICBodHRwUmVxdWVzdC5vcGVuKCdQT1NUJywgdXJsKTtcbiAgICBodHRwUmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04Jyk7XG4gIH1cblxuICBpZiAodHlwZW9mIGNvbnRleHQgIT09ICd1bmRlZmluZWQnICYmIGNvbnRleHQgIT09IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIGNvbnRleHQub3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGh0dHBSZXF1ZXN0LnRpbWVvdXQgPSBjb250ZXh0Lm9wdGlvbnMudGltZW91dDtcbiAgICB9XG4gIH1cblxuICAvLyByZXF1ZXN0IGlzIGxlc3MgdGhhbiAyMDAwIGNoYXJhY3RlcnMgYW5kIHRoZSBicm93c2VyIHN1cHBvcnRzIENPUlMsIG1ha2UgR0VUIHJlcXVlc3Qgd2l0aCBYTUxIdHRwUmVxdWVzdFxuICBpZiAocmVxdWVzdExlbmd0aCA8PSAyMDAwICYmIFN1cHBvcnQuY29ycykge1xuICAgIGh0dHBSZXF1ZXN0LnNlbmQobnVsbCk7XG5cbiAgLy8gcmVxdWVzdCBpcyBtb3JlIHRoYW4gMjAwMCBjaGFyYWN0ZXJzIGFuZCB0aGUgYnJvd3NlciBzdXBwb3J0cyBDT1JTLCBtYWtlIFBPU1QgcmVxdWVzdCB3aXRoIFhNTEh0dHBSZXF1ZXN0XG4gIH0gZWxzZSBpZiAocmVxdWVzdExlbmd0aCA+IDIwMDAgJiYgU3VwcG9ydC5jb3JzKSB7XG4gICAgaHR0cFJlcXVlc3Quc2VuZChwYXJhbVN0cmluZyk7XG5cbiAgLy8gcmVxdWVzdCBpcyBsZXNzICB0aGFuIDIwMDAgY2hhcmFjdGVycyBhbmQgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBDT1JTLCBtYWtlIGEgSlNPTlAgcmVxdWVzdFxuICB9IGVsc2UgaWYgKHJlcXVlc3RMZW5ndGggPD0gMjAwMCAmJiAhU3VwcG9ydC5jb3JzKSB7XG4gICAgcmV0dXJuIGpzb25wKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG5cbiAgLy8gcmVxdWVzdCBpcyBsb25nZXIgdGhlbiAyMDAwIGNoYXJhY3RlcnMgYW5kIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgQ09SUywgbG9nIGEgd2FybmluZ1xuICB9IGVsc2Uge1xuICAgIHdhcm4oJ2EgcmVxdWVzdCB0byAnICsgdXJsICsgJyB3YXMgbG9uZ2VyIHRoZW4gMjAwMCBjaGFyYWN0ZXJzIGFuZCB0aGlzIGJyb3dzZXIgY2Fubm90IG1ha2UgYSBjcm9zcy1kb21haW4gcG9zdCByZXF1ZXN0LiBQbGVhc2UgdXNlIGEgcHJveHkgaHR0cDovL2VzcmkuZ2l0aHViLmlvL2VzcmktbGVhZmxldC9hcGktcmVmZXJlbmNlL3JlcXVlc3QuaHRtbCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJldHVybiBodHRwUmVxdWVzdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGpzb25wICh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgd2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrcyA9IHdpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3MgfHwge307XG4gIHZhciBjYWxsYmFja0lkID0gJ2MnICsgY2FsbGJhY2tzO1xuICBwYXJhbXMuY2FsbGJhY2sgPSAnd2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrcy4nICsgY2FsbGJhY2tJZDtcblxuICB3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzW2NhbGxiYWNrSWRdID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgaWYgKHdpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3NbY2FsbGJhY2tJZF0gIT09IHRydWUpIHtcbiAgICAgIHZhciBlcnJvcjtcbiAgICAgIHZhciByZXNwb25zZVR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocmVzcG9uc2UpO1xuXG4gICAgICBpZiAoIShyZXNwb25zZVR5cGUgPT09ICdbb2JqZWN0IE9iamVjdF0nIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJykpIHtcbiAgICAgICAgZXJyb3IgPSB7XG4gICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgIGNvZGU6IDUwMCxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdFeHBlY3RlZCBhcnJheSBvciBvYmplY3QgYXMgSlNPTlAgcmVzcG9uc2UnXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXNwb25zZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghZXJyb3IgJiYgcmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgZXJyb3IgPSByZXNwb25zZTtcbiAgICAgICAgcmVzcG9uc2UgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG4gICAgICB3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzW2NhbGxiYWNrSWRdID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHNjcmlwdCA9IERvbVV0aWwuY3JlYXRlKCdzY3JpcHQnLCBudWxsLCBkb2N1bWVudC5ib2R5KTtcbiAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgc2NyaXB0LnNyYyA9IHVybCArICc/JyArIHNlcmlhbGl6ZShwYXJhbXMpO1xuICBzY3JpcHQuaWQgPSBjYWxsYmFja0lkO1xuXG4gIGNhbGxiYWNrcysrO1xuXG4gIHJldHVybiB7XG4gICAgaWQ6IGNhbGxiYWNrSWQsXG4gICAgdXJsOiBzY3JpcHQuc3JjLFxuICAgIGFib3J0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzLl9jYWxsYmFja1tjYWxsYmFja0lkXSh7XG4gICAgICAgIGNvZGU6IDAsXG4gICAgICAgIG1lc3NhZ2U6ICdSZXF1ZXN0IGFib3J0ZWQuJ1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgZ2V0ID0gKChTdXBwb3J0LmNvcnMpID8geG1sSHR0cEdldCA6IGpzb25wKTtcbmdldC5DT1JTID0geG1sSHR0cEdldDtcbmdldC5KU09OUCA9IGpzb25wO1xuXG4vLyBjaG9vc2UgdGhlIGNvcnJlY3QgQUpBWCBoYW5kbGVyIGRlcGVuZGluZyBvbiBDT1JTIHN1cHBvcnRcbmV4cG9ydCB7IGdldCB9O1xuXG4vLyBhbHdheXMgdXNlIFhNTEh0dHBSZXF1ZXN0IGZvciBwb3N0c1xuZXhwb3J0IHsgeG1sSHR0cFBvc3QgYXMgcG9zdCB9O1xuXG4vLyBleHBvcnQgdGhlIFJlcXVlc3Qgb2JqZWN0IHRvIGNhbGwgdGhlIGRpZmZlcmVudCBoYW5kbGVycyBmb3IgZGVidWdnaW5nXG5leHBvcnQgdmFyIFJlcXVlc3QgPSB7XG4gIHJlcXVlc3Q6IHJlcXVlc3QsXG4gIGdldDogZ2V0LFxuICBwb3N0OiB4bWxIdHRwUG9zdFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVxdWVzdDtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBFc3JpXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaXNjZW5zZS5cbiAqL1xuXG4vLyBjaGVja3MgaWYgMiB4LHkgcG9pbnRzIGFyZSBlcXVhbFxuZnVuY3Rpb24gcG9pbnRzRXF1YWwgKGEsIGIpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIGNoZWNrcyBpZiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9pbnRzIG9mIGEgcmluZyBhcmUgZXF1YWwgYW5kIGNsb3NlcyB0aGUgcmluZ1xuZnVuY3Rpb24gY2xvc2VSaW5nIChjb29yZGluYXRlcykge1xuICBpZiAoIXBvaW50c0VxdWFsKGNvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1tjb29yZGluYXRlcy5sZW5ndGggLSAxXSkpIHtcbiAgICBjb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGVzWzBdKTtcbiAgfVxuICByZXR1cm4gY29vcmRpbmF0ZXM7XG59XG5cbi8vIGRldGVybWluZSBpZiBwb2x5Z29uIHJpbmcgY29vcmRpbmF0ZXMgYXJlIGNsb2Nrd2lzZS4gY2xvY2t3aXNlIHNpZ25pZmllcyBvdXRlciByaW5nLCBjb3VudGVyLWNsb2Nrd2lzZSBhbiBpbm5lciByaW5nXG4vLyBvciBob2xlLiB0aGlzIGxvZ2ljIHdhcyBmb3VuZCBhdCBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExNjU2NDcvaG93LXRvLWRldGVybWluZS1pZi1hLWxpc3Qtb2YtcG9seWdvbi1cbi8vIHBvaW50cy1hcmUtaW4tY2xvY2t3aXNlLW9yZGVyXG5mdW5jdGlvbiByaW5nSXNDbG9ja3dpc2UgKHJpbmdUb1Rlc3QpIHtcbiAgdmFyIHRvdGFsID0gMDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgckxlbmd0aCA9IHJpbmdUb1Rlc3QubGVuZ3RoO1xuICB2YXIgcHQxID0gcmluZ1RvVGVzdFtpXTtcbiAgdmFyIHB0MjtcbiAgZm9yIChpOyBpIDwgckxlbmd0aCAtIDE7IGkrKykge1xuICAgIHB0MiA9IHJpbmdUb1Rlc3RbaSArIDFdO1xuICAgIHRvdGFsICs9IChwdDJbMF0gLSBwdDFbMF0pICogKHB0MlsxXSArIHB0MVsxXSk7XG4gICAgcHQxID0gcHQyO1xuICB9XG4gIHJldHVybiAodG90YWwgPj0gMCk7XG59XG5cbi8vIHBvcnRlZCBmcm9tIHRlcnJhZm9ybWVyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL1RlcnJhZm9ybWVyL2Jsb2IvbWFzdGVyL3RlcnJhZm9ybWVyLmpzI0w1MDQtTDUxOVxuZnVuY3Rpb24gdmVydGV4SW50ZXJzZWN0c1ZlcnRleCAoYTEsIGEyLCBiMSwgYjIpIHtcbiAgdmFyIHVhVCA9IChiMlswXSAtIGIxWzBdKSAqIChhMVsxXSAtIGIxWzFdKSAtIChiMlsxXSAtIGIxWzFdKSAqIChhMVswXSAtIGIxWzBdKTtcbiAgdmFyIHViVCA9IChhMlswXSAtIGExWzBdKSAqIChhMVsxXSAtIGIxWzFdKSAtIChhMlsxXSAtIGExWzFdKSAqIChhMVswXSAtIGIxWzBdKTtcbiAgdmFyIHVCID0gKGIyWzFdIC0gYjFbMV0pICogKGEyWzBdIC0gYTFbMF0pIC0gKGIyWzBdIC0gYjFbMF0pICogKGEyWzFdIC0gYTFbMV0pO1xuXG4gIGlmICh1QiAhPT0gMCkge1xuICAgIHZhciB1YSA9IHVhVCAvIHVCO1xuICAgIHZhciB1YiA9IHViVCAvIHVCO1xuXG4gICAgaWYgKHVhID49IDAgJiYgdWEgPD0gMSAmJiB1YiA+PSAwICYmIHViIDw9IDEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gcG9ydGVkIGZyb20gdGVycmFmb3JtZXIuanMgaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvVGVycmFmb3JtZXIvYmxvYi9tYXN0ZXIvdGVycmFmb3JtZXIuanMjTDUyMS1MNTMxXG5mdW5jdGlvbiBhcnJheUludGVyc2VjdHNBcnJheSAoYSwgYikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBiLmxlbmd0aCAtIDE7IGorKykge1xuICAgICAgaWYgKHZlcnRleEludGVyc2VjdHNWZXJ0ZXgoYVtpXSwgYVtpICsgMV0sIGJbal0sIGJbaiArIDFdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIHBvcnRlZCBmcm9tIHRlcnJhZm9ybWVyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL1RlcnJhZm9ybWVyL2Jsb2IvbWFzdGVyL3RlcnJhZm9ybWVyLmpzI0w0NzAtTDQ4MFxuZnVuY3Rpb24gY29vcmRpbmF0ZXNDb250YWluUG9pbnQgKGNvb3JkaW5hdGVzLCBwb2ludCkge1xuICB2YXIgY29udGFpbnMgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IC0xLCBsID0gY29vcmRpbmF0ZXMubGVuZ3RoLCBqID0gbCAtIDE7ICsraSA8IGw7IGogPSBpKSB7XG4gICAgaWYgKCgoY29vcmRpbmF0ZXNbaV1bMV0gPD0gcG9pbnRbMV0gJiYgcG9pbnRbMV0gPCBjb29yZGluYXRlc1tqXVsxXSkgfHxcbiAgICAgICAgIChjb29yZGluYXRlc1tqXVsxXSA8PSBwb2ludFsxXSAmJiBwb2ludFsxXSA8IGNvb3JkaW5hdGVzW2ldWzFdKSkgJiZcbiAgICAgICAgKHBvaW50WzBdIDwgKGNvb3JkaW5hdGVzW2pdWzBdIC0gY29vcmRpbmF0ZXNbaV1bMF0pICogKHBvaW50WzFdIC0gY29vcmRpbmF0ZXNbaV1bMV0pIC8gKGNvb3JkaW5hdGVzW2pdWzFdIC0gY29vcmRpbmF0ZXNbaV1bMV0pICsgY29vcmRpbmF0ZXNbaV1bMF0pKSB7XG4gICAgICBjb250YWlucyA9ICFjb250YWlucztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbnRhaW5zO1xufVxuXG4vLyBwb3J0ZWQgZnJvbSB0ZXJyYWZvcm1lci1hcmNnaXMtcGFyc2VyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL3RlcnJhZm9ybWVyLWFyY2dpcy1wYXJzZXIvYmxvYi9tYXN0ZXIvdGVycmFmb3JtZXItYXJjZ2lzLXBhcnNlci5qcyNMMTA2LUwxMTNcbmZ1bmN0aW9uIGNvb3JkaW5hdGVzQ29udGFpbkNvb3JkaW5hdGVzIChvdXRlciwgaW5uZXIpIHtcbiAgdmFyIGludGVyc2VjdHMgPSBhcnJheUludGVyc2VjdHNBcnJheShvdXRlciwgaW5uZXIpO1xuICB2YXIgY29udGFpbnMgPSBjb29yZGluYXRlc0NvbnRhaW5Qb2ludChvdXRlciwgaW5uZXJbMF0pO1xuICBpZiAoIWludGVyc2VjdHMgJiYgY29udGFpbnMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIGRvIGFueSBwb2x5Z29ucyBpbiB0aGlzIGFycmF5IGNvbnRhaW4gYW55IG90aGVyIHBvbHlnb25zIGluIHRoaXMgYXJyYXk/XG4vLyB1c2VkIGZvciBjaGVja2luZyBmb3IgaG9sZXMgaW4gYXJjZ2lzIHJpbmdzXG4vLyBwb3J0ZWQgZnJvbSB0ZXJyYWZvcm1lci1hcmNnaXMtcGFyc2VyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL3RlcnJhZm9ybWVyLWFyY2dpcy1wYXJzZXIvYmxvYi9tYXN0ZXIvdGVycmFmb3JtZXItYXJjZ2lzLXBhcnNlci5qcyNMMTE3LUwxNzJcbmZ1bmN0aW9uIGNvbnZlcnRSaW5nc1RvR2VvSlNPTiAocmluZ3MpIHtcbiAgdmFyIG91dGVyUmluZ3MgPSBbXTtcbiAgdmFyIGhvbGVzID0gW107XG4gIHZhciB4OyAvLyBpdGVyYXRvclxuICB2YXIgb3V0ZXJSaW5nOyAvLyBjdXJyZW50IG91dGVyIHJpbmcgYmVpbmcgZXZhbHVhdGVkXG4gIHZhciBob2xlOyAvLyBjdXJyZW50IGhvbGUgYmVpbmcgZXZhbHVhdGVkXG5cbiAgLy8gZm9yIGVhY2ggcmluZ1xuICBmb3IgKHZhciByID0gMDsgciA8IHJpbmdzLmxlbmd0aDsgcisrKSB7XG4gICAgdmFyIHJpbmcgPSBjbG9zZVJpbmcocmluZ3Nbcl0uc2xpY2UoMCkpO1xuICAgIGlmIChyaW5nLmxlbmd0aCA8IDQpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICAvLyBpcyB0aGlzIHJpbmcgYW4gb3V0ZXIgcmluZz8gaXMgaXQgY2xvY2t3aXNlP1xuICAgIGlmIChyaW5nSXNDbG9ja3dpc2UocmluZykpIHtcbiAgICAgIHZhciBwb2x5Z29uID0gWyByaW5nIF07XG4gICAgICBvdXRlclJpbmdzLnB1c2gocG9seWdvbik7IC8vIHB1c2ggdG8gb3V0ZXIgcmluZ3NcbiAgICB9IGVsc2Uge1xuICAgICAgaG9sZXMucHVzaChyaW5nKTsgLy8gY291bnRlcmNsb2Nrd2lzZSBwdXNoIHRvIGhvbGVzXG4gICAgfVxuICB9XG5cbiAgdmFyIHVuY29udGFpbmVkSG9sZXMgPSBbXTtcblxuICAvLyB3aGlsZSB0aGVyZSBhcmUgaG9sZXMgbGVmdC4uLlxuICB3aGlsZSAoaG9sZXMubGVuZ3RoKSB7XG4gICAgLy8gcG9wIGEgaG9sZSBvZmYgb3V0IHN0YWNrXG4gICAgaG9sZSA9IGhvbGVzLnBvcCgpO1xuXG4gICAgLy8gbG9vcCBvdmVyIGFsbCBvdXRlciByaW5ncyBhbmQgc2VlIGlmIHRoZXkgY29udGFpbiBvdXIgaG9sZS5cbiAgICB2YXIgY29udGFpbmVkID0gZmFsc2U7XG4gICAgZm9yICh4ID0gb3V0ZXJSaW5ncy5sZW5ndGggLSAxOyB4ID49IDA7IHgtLSkge1xuICAgICAgb3V0ZXJSaW5nID0gb3V0ZXJSaW5nc1t4XVswXTtcbiAgICAgIGlmIChjb29yZGluYXRlc0NvbnRhaW5Db29yZGluYXRlcyhvdXRlclJpbmcsIGhvbGUpKSB7XG4gICAgICAgIC8vIHRoZSBob2xlIGlzIGNvbnRhaW5lZCBwdXNoIGl0IGludG8gb3VyIHBvbHlnb25cbiAgICAgICAgb3V0ZXJSaW5nc1t4XS5wdXNoKGhvbGUpO1xuICAgICAgICBjb250YWluZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByaW5nIGlzIG5vdCBjb250YWluZWQgaW4gYW55IG91dGVyIHJpbmdcbiAgICAvLyBzb21ldGltZXMgdGhpcyBoYXBwZW5zIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL2VzcmktbGVhZmxldC9pc3N1ZXMvMzIwXG4gICAgaWYgKCFjb250YWluZWQpIHtcbiAgICAgIHVuY29udGFpbmVkSG9sZXMucHVzaChob2xlKTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB3ZSBjb3VsZG4ndCBtYXRjaCBhbnkgaG9sZXMgdXNpbmcgY29udGFpbnMgd2UgY2FuIHRyeSBpbnRlcnNlY3RzLi4uXG4gIHdoaWxlICh1bmNvbnRhaW5lZEhvbGVzLmxlbmd0aCkge1xuICAgIC8vIHBvcCBhIGhvbGUgb2ZmIG91dCBzdGFja1xuICAgIGhvbGUgPSB1bmNvbnRhaW5lZEhvbGVzLnBvcCgpO1xuXG4gICAgLy8gbG9vcCBvdmVyIGFsbCBvdXRlciByaW5ncyBhbmQgc2VlIGlmIGFueSBpbnRlcnNlY3Qgb3VyIGhvbGUuXG4gICAgdmFyIGludGVyc2VjdHMgPSBmYWxzZTtcblxuICAgIGZvciAoeCA9IG91dGVyUmluZ3MubGVuZ3RoIC0gMTsgeCA+PSAwOyB4LS0pIHtcbiAgICAgIG91dGVyUmluZyA9IG91dGVyUmluZ3NbeF1bMF07XG4gICAgICBpZiAoYXJyYXlJbnRlcnNlY3RzQXJyYXkob3V0ZXJSaW5nLCBob2xlKSkge1xuICAgICAgICAvLyB0aGUgaG9sZSBpcyBjb250YWluZWQgcHVzaCBpdCBpbnRvIG91ciBwb2x5Z29uXG4gICAgICAgIG91dGVyUmluZ3NbeF0ucHVzaChob2xlKTtcbiAgICAgICAgaW50ZXJzZWN0cyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghaW50ZXJzZWN0cykge1xuICAgICAgb3V0ZXJSaW5ncy5wdXNoKFtob2xlLnJldmVyc2UoKV0pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvdXRlclJpbmdzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICBjb29yZGluYXRlczogb3V0ZXJSaW5nc1swXVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdNdWx0aVBvbHlnb24nLFxuICAgICAgY29vcmRpbmF0ZXM6IG91dGVyUmluZ3NcbiAgICB9O1xuICB9XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gZW5zdXJlcyB0aGF0IHJpbmdzIGFyZSBvcmllbnRlZCBpbiB0aGUgcmlnaHQgZGlyZWN0aW9uc1xuLy8gb3V0ZXIgcmluZ3MgYXJlIGNsb2Nrd2lzZSwgaG9sZXMgYXJlIGNvdW50ZXJjbG9ja3dpc2Vcbi8vIHVzZWQgZm9yIGNvbnZlcnRpbmcgR2VvSlNPTiBQb2x5Z29ucyB0byBBcmNHSVMgUG9seWdvbnNcbmZ1bmN0aW9uIG9yaWVudFJpbmdzIChwb2x5KSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgdmFyIHBvbHlnb24gPSBwb2x5LnNsaWNlKDApO1xuICB2YXIgb3V0ZXJSaW5nID0gY2xvc2VSaW5nKHBvbHlnb24uc2hpZnQoKS5zbGljZSgwKSk7XG4gIGlmIChvdXRlclJpbmcubGVuZ3RoID49IDQpIHtcbiAgICBpZiAoIXJpbmdJc0Nsb2Nrd2lzZShvdXRlclJpbmcpKSB7XG4gICAgICBvdXRlclJpbmcucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIG91dHB1dC5wdXNoKG91dGVyUmluZyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvbHlnb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBob2xlID0gY2xvc2VSaW5nKHBvbHlnb25baV0uc2xpY2UoMCkpO1xuICAgICAgaWYgKGhvbGUubGVuZ3RoID49IDQpIHtcbiAgICAgICAgaWYgKHJpbmdJc0Nsb2Nrd2lzZShob2xlKSkge1xuICAgICAgICAgIGhvbGUucmV2ZXJzZSgpO1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dC5wdXNoKGhvbGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gZmxhdHRlbnMgaG9sZXMgaW4gbXVsdGlwb2x5Z29ucyB0byBvbmUgYXJyYXkgb2YgcG9seWdvbnNcbi8vIHVzZWQgZm9yIGNvbnZlcnRpbmcgR2VvSlNPTiBQb2x5Z29ucyB0byBBcmNHSVMgUG9seWdvbnNcbmZ1bmN0aW9uIGZsYXR0ZW5NdWx0aVBvbHlnb25SaW5ncyAocmluZ3MpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHBvbHlnb24gPSBvcmllbnRSaW5ncyhyaW5nc1tpXSk7XG4gICAgZm9yICh2YXIgeCA9IHBvbHlnb24ubGVuZ3RoIC0gMTsgeCA+PSAwOyB4LS0pIHtcbiAgICAgIHZhciByaW5nID0gcG9seWdvblt4XS5zbGljZSgwKTtcbiAgICAgIG91dHB1dC5wdXNoKHJpbmcpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG4vLyBzaGFsbG93IG9iamVjdCBjbG9uZSBmb3IgZmVhdHVyZSBwcm9wZXJ0aWVzIGFuZCBhdHRyaWJ1dGVzXG4vLyBmcm9tIGh0dHA6Ly9qc3BlcmYuY29tL2Nsb25pbmctYW4tb2JqZWN0LzJcbmZ1bmN0aW9uIHNoYWxsb3dDbG9uZSAob2JqKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmNnaXNUb0dlb0pTT04gKGFyY2dpcywgaWRBdHRyaWJ1dGUpIHtcbiAgdmFyIGdlb2pzb24gPSB7fTtcblxuICBpZiAodHlwZW9mIGFyY2dpcy54ID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgYXJjZ2lzLnkgPT09ICdudW1iZXInKSB7XG4gICAgZ2VvanNvbi50eXBlID0gJ1BvaW50JztcbiAgICBnZW9qc29uLmNvb3JkaW5hdGVzID0gW2FyY2dpcy54LCBhcmNnaXMueV07XG4gIH1cblxuICBpZiAoYXJjZ2lzLnBvaW50cykge1xuICAgIGdlb2pzb24udHlwZSA9ICdNdWx0aVBvaW50JztcbiAgICBnZW9qc29uLmNvb3JkaW5hdGVzID0gYXJjZ2lzLnBvaW50cy5zbGljZSgwKTtcbiAgfVxuXG4gIGlmIChhcmNnaXMucGF0aHMpIHtcbiAgICBpZiAoYXJjZ2lzLnBhdGhzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZ2VvanNvbi50eXBlID0gJ0xpbmVTdHJpbmcnO1xuICAgICAgZ2VvanNvbi5jb29yZGluYXRlcyA9IGFyY2dpcy5wYXRoc1swXS5zbGljZSgwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VvanNvbi50eXBlID0gJ011bHRpTGluZVN0cmluZyc7XG4gICAgICBnZW9qc29uLmNvb3JkaW5hdGVzID0gYXJjZ2lzLnBhdGhzLnNsaWNlKDApO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhcmNnaXMucmluZ3MpIHtcbiAgICBnZW9qc29uID0gY29udmVydFJpbmdzVG9HZW9KU09OKGFyY2dpcy5yaW5ncy5zbGljZSgwKSk7XG4gIH1cblxuICBpZiAoYXJjZ2lzLmdlb21ldHJ5IHx8IGFyY2dpcy5hdHRyaWJ1dGVzKSB7XG4gICAgZ2VvanNvbi50eXBlID0gJ0ZlYXR1cmUnO1xuICAgIGdlb2pzb24uZ2VvbWV0cnkgPSAoYXJjZ2lzLmdlb21ldHJ5KSA/IGFyY2dpc1RvR2VvSlNPTihhcmNnaXMuZ2VvbWV0cnkpIDogbnVsbDtcbiAgICBnZW9qc29uLnByb3BlcnRpZXMgPSAoYXJjZ2lzLmF0dHJpYnV0ZXMpID8gc2hhbGxvd0Nsb25lKGFyY2dpcy5hdHRyaWJ1dGVzKSA6IG51bGw7XG4gICAgaWYgKGFyY2dpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICBnZW9qc29uLmlkID0gYXJjZ2lzLmF0dHJpYnV0ZXNbaWRBdHRyaWJ1dGVdIHx8IGFyY2dpcy5hdHRyaWJ1dGVzLk9CSkVDVElEIHx8IGFyY2dpcy5hdHRyaWJ1dGVzLkZJRDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2VvanNvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2pzb25Ub0FyY0dJUyAoZ2VvanNvbiwgaWRBdHRyaWJ1dGUpIHtcbiAgaWRBdHRyaWJ1dGUgPSBpZEF0dHJpYnV0ZSB8fCAnT0JKRUNUSUQnO1xuICB2YXIgc3BhdGlhbFJlZmVyZW5jZSA9IHsgd2tpZDogNDMyNiB9O1xuICB2YXIgcmVzdWx0ID0ge307XG4gIHZhciBpO1xuXG4gIHN3aXRjaCAoZ2VvanNvbi50eXBlKSB7XG4gICAgY2FzZSAnUG9pbnQnOlxuICAgICAgcmVzdWx0LnggPSBnZW9qc29uLmNvb3JkaW5hdGVzWzBdO1xuICAgICAgcmVzdWx0LnkgPSBnZW9qc29uLmNvb3JkaW5hdGVzWzFdO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlQb2ludCc6XG4gICAgICByZXN1bHQucG9pbnRzID0gZ2VvanNvbi5jb29yZGluYXRlcy5zbGljZSgwKTtcbiAgICAgIHJlc3VsdC5zcGF0aWFsUmVmZXJlbmNlID0gc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxuICAgICAgcmVzdWx0LnBhdGhzID0gW2dlb2pzb24uY29vcmRpbmF0ZXMuc2xpY2UoMCldO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcbiAgICAgIHJlc3VsdC5wYXRocyA9IGdlb2pzb24uY29vcmRpbmF0ZXMuc2xpY2UoMCk7XG4gICAgICByZXN1bHQuc3BhdGlhbFJlZmVyZW5jZSA9IHNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdQb2x5Z29uJzpcbiAgICAgIHJlc3VsdC5yaW5ncyA9IG9yaWVudFJpbmdzKGdlb2pzb24uY29vcmRpbmF0ZXMuc2xpY2UoMCkpO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlQb2x5Z29uJzpcbiAgICAgIHJlc3VsdC5yaW5ncyA9IGZsYXR0ZW5NdWx0aVBvbHlnb25SaW5ncyhnZW9qc29uLmNvb3JkaW5hdGVzLnNsaWNlKDApKTtcbiAgICAgIHJlc3VsdC5zcGF0aWFsUmVmZXJlbmNlID0gc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0ZlYXR1cmUnOlxuICAgICAgaWYgKGdlb2pzb24uZ2VvbWV0cnkpIHtcbiAgICAgICAgcmVzdWx0Lmdlb21ldHJ5ID0gZ2VvanNvblRvQXJjR0lTKGdlb2pzb24uZ2VvbWV0cnksIGlkQXR0cmlidXRlKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5hdHRyaWJ1dGVzID0gKGdlb2pzb24ucHJvcGVydGllcykgPyBzaGFsbG93Q2xvbmUoZ2VvanNvbi5wcm9wZXJ0aWVzKSA6IHt9O1xuICAgICAgaWYgKGdlb2pzb24uaWQpIHtcbiAgICAgICAgcmVzdWx0LmF0dHJpYnV0ZXNbaWRBdHRyaWJ1dGVdID0gZ2VvanNvbi5pZDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0ZlYXR1cmVDb2xsZWN0aW9uJzpcbiAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGdlb2pzb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZ2VvanNvblRvQXJjR0lTKGdlb2pzb24uZmVhdHVyZXNbaV0sIGlkQXR0cmlidXRlKSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdHZW9tZXRyeUNvbGxlY3Rpb24nOlxuICAgICAgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZ2VvanNvbi5nZW9tZXRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGdlb2pzb25Ub0FyY0dJUyhnZW9qc29uLmdlb21ldHJpZXNbaV0sIGlkQXR0cmlidXRlKSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyBsYXRMbmcsIGxhdExuZ0JvdW5kcywgTGF0TG5nLCBMYXRMbmdCb3VuZHMsIFV0aWwsIERvbVV0aWwsIEdlb0pTT04gfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGpzb25wIH0gZnJvbSAnLi9SZXF1ZXN0JztcbmltcG9ydCB7IG9wdGlvbnMgfSBmcm9tICcuL09wdGlvbnMnO1xuXG5pbXBvcnQge1xuICBnZW9qc29uVG9BcmNHSVMgYXMgZzJhLFxuICBhcmNnaXNUb0dlb0pTT04gYXMgYTJnXG59IGZyb20gJ2FyY2dpcy10by1nZW9qc29uLXV0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2pzb25Ub0FyY0dJUyAoZ2VvanNvbiwgaWRBdHRyKSB7XG4gIHJldHVybiBnMmEoZ2VvanNvbiwgaWRBdHRyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyY2dpc1RvR2VvSlNPTiAoYXJjZ2lzLCBpZEF0dHIpIHtcbiAgcmV0dXJuIGEyZyhhcmNnaXMsIGlkQXR0cik7XG59XG5cbi8vIHNoYWxsb3cgb2JqZWN0IGNsb25lIGZvciBmZWF0dXJlIHByb3BlcnRpZXMgYW5kIGF0dHJpYnV0ZXNcbi8vIGZyb20gaHR0cDovL2pzcGVyZi5jb20vY2xvbmluZy1hbi1vYmplY3QvMlxuZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dDbG9uZSAob2JqKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbi8vIGNvbnZlcnQgYW4gZXh0ZW50IChBcmNHSVMpIHRvIExhdExuZ0JvdW5kcyAoTGVhZmxldClcbmV4cG9ydCBmdW5jdGlvbiBleHRlbnRUb0JvdW5kcyAoZXh0ZW50KSB7XG4gIC8vIFwiTmFOXCIgY29vcmRpbmF0ZXMgZnJvbSBBcmNHSVMgU2VydmVyIGluZGljYXRlIGEgbnVsbCBnZW9tZXRyeVxuICBpZiAoZXh0ZW50LnhtaW4gIT09ICdOYU4nICYmIGV4dGVudC55bWluICE9PSAnTmFOJyAmJiBleHRlbnQueG1heCAhPT0gJ05hTicgJiYgZXh0ZW50LnltYXggIT09ICdOYU4nKSB7XG4gICAgdmFyIHN3ID0gbGF0TG5nKGV4dGVudC55bWluLCBleHRlbnQueG1pbik7XG4gICAgdmFyIG5lID0gbGF0TG5nKGV4dGVudC55bWF4LCBleHRlbnQueG1heCk7XG4gICAgcmV0dXJuIGxhdExuZ0JvdW5kcyhzdywgbmUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8vIGNvbnZlcnQgYW4gTGF0TG5nQm91bmRzIChMZWFmbGV0KSB0byBleHRlbnQgKEFyY0dJUylcbmV4cG9ydCBmdW5jdGlvbiBib3VuZHNUb0V4dGVudCAoYm91bmRzKSB7XG4gIGJvdW5kcyA9IGxhdExuZ0JvdW5kcyhib3VuZHMpO1xuICByZXR1cm4ge1xuICAgICd4bWluJzogYm91bmRzLmdldFNvdXRoV2VzdCgpLmxuZyxcbiAgICAneW1pbic6IGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sYXQsXG4gICAgJ3htYXgnOiBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubG5nLFxuICAgICd5bWF4JzogYm91bmRzLmdldE5vcnRoRWFzdCgpLmxhdCxcbiAgICAnc3BhdGlhbFJlZmVyZW5jZSc6IHtcbiAgICAgICd3a2lkJzogNDMyNlxuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3BvbnNlVG9GZWF0dXJlQ29sbGVjdGlvbiAocmVzcG9uc2UsIGlkQXR0cmlidXRlKSB7XG4gIHZhciBvYmplY3RJZEZpZWxkO1xuICB2YXIgZmVhdHVyZXMgPSByZXNwb25zZS5mZWF0dXJlcyB8fCByZXNwb25zZS5yZXN1bHRzO1xuICB2YXIgY291bnQgPSBmZWF0dXJlcy5sZW5ndGg7XG5cbiAgaWYgKGlkQXR0cmlidXRlKSB7XG4gICAgb2JqZWN0SWRGaWVsZCA9IGlkQXR0cmlidXRlO1xuICB9IGVsc2UgaWYgKHJlc3BvbnNlLm9iamVjdElkRmllbGROYW1lKSB7XG4gICAgb2JqZWN0SWRGaWVsZCA9IHJlc3BvbnNlLm9iamVjdElkRmllbGROYW1lO1xuICB9IGVsc2UgaWYgKHJlc3BvbnNlLmZpZWxkcykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDw9IHJlc3BvbnNlLmZpZWxkcy5sZW5ndGggLSAxOyBqKyspIHtcbiAgICAgIGlmIChyZXNwb25zZS5maWVsZHNbal0udHlwZSA9PT0gJ2VzcmlGaWVsZFR5cGVPSUQnKSB7XG4gICAgICAgIG9iamVjdElkRmllbGQgPSByZXNwb25zZS5maWVsZHNbal0ubmFtZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGNvdW50KSB7XG4gICAgLyogYXMgYSBsYXN0IHJlc29ydCwgY2hlY2sgZm9yIGNvbW1vbiBJRCBmaWVsZG5hbWVzIGluIHRoZSBmaXJzdCBmZWF0dXJlIHJldHVybmVkXG4gICAgbm90IGZvb2xwcm9vZi4gaWRlbnRpZnlGZWF0dXJlcyBjYW4gcmV0dXJuZWQgYSBtaXhlZCBhcnJheSBvZiBmZWF0dXJlcy4gKi9cbiAgICBmb3IgKHZhciBrZXkgaW4gZmVhdHVyZXNbMF0uYXR0cmlidXRlcykge1xuICAgICAgaWYgKGtleS5tYXRjaCgvXihPQkpFQ1RJRHxGSUR8T0lEfElEKSQvaSkpIHtcbiAgICAgICAgb2JqZWN0SWRGaWVsZCA9IGtleTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIGZlYXR1cmVDb2xsZWN0aW9uID0ge1xuICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgZmVhdHVyZXM6IFtdXG4gIH07XG5cbiAgaWYgKGNvdW50KSB7XG4gICAgZm9yICh2YXIgaSA9IGZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZmVhdHVyZSA9IGFyY2dpc1RvR2VvSlNPTihmZWF0dXJlc1tpXSwgb2JqZWN0SWRGaWVsZCk7XG4gICAgICBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbjtcbn1cblxuICAvLyB0cmltIHVybCB3aGl0ZXNwYWNlIGFuZCBhZGQgYSB0cmFpbGluZyBzbGFzaCBpZiBuZWVkZWRcbmV4cG9ydCBmdW5jdGlvbiBjbGVhblVybCAodXJsKSB7XG4gIC8vIHRyaW0gbGVhZGluZyBhbmQgdHJhaWxpbmcgc3BhY2VzLCBidXQgbm90IHNwYWNlcyBpbnNpZGUgdGhlIHVybFxuICB1cmwgPSBVdGlsLnRyaW0odXJsKTtcblxuICAvLyBhZGQgYSB0cmFpbGluZyBzbGFzaCB0byB0aGUgdXJsIGlmIHRoZSB1c2VyIG9taXR0ZWQgaXRcbiAgaWYgKHVybFt1cmwubGVuZ3RoIC0gMV0gIT09ICcvJykge1xuICAgIHVybCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBcmNnaXNPbmxpbmUgKHVybCkge1xuICAvKiBob3N0ZWQgZmVhdHVyZSBzZXJ2aWNlcyBzdXBwb3J0IGdlb2pzb24gYXMgYW4gb3V0cHV0IGZvcm1hdFxuICB1dGlsaXR5LmFyY2dpcy5jb20gc2VydmljZXMgYXJlIHByb3hpZWQgZnJvbSBhIHZhcmlldHkgb2YgQXJjR0lTIFNlcnZlciB2aW50YWdlcywgYW5kIG1heSBub3QgKi9cbiAgcmV0dXJuICgvXig/IS4qdXRpbGl0eVxcLmFyY2dpc1xcLmNvbSkuKlxcLmFyY2dpc1xcLmNvbS4qRmVhdHVyZVNlcnZlci9pKS50ZXN0KHVybCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9qc29uVHlwZVRvQXJjR0lTIChnZW9Kc29uVHlwZSkge1xuICB2YXIgYXJjZ2lzR2VvbWV0cnlUeXBlO1xuICBzd2l0Y2ggKGdlb0pzb25UeXBlKSB7XG4gICAgY2FzZSAnUG9pbnQnOlxuICAgICAgYXJjZ2lzR2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvaW50JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ011bHRpUG9pbnQnOlxuICAgICAgYXJjZ2lzR2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeU11bHRpcG9pbnQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTGluZVN0cmluZyc6XG4gICAgICBhcmNnaXNHZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9seWxpbmUnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcbiAgICAgIGFyY2dpc0dlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2x5bGluZSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdQb2x5Z29uJzpcbiAgICAgIGFyY2dpc0dlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2x5Z29uJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ011bHRpUG9seWdvbic6XG4gICAgICBhcmNnaXNHZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9seWdvbic7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBhcmNnaXNHZW9tZXRyeVR5cGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YXJuICgpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNBdHRyaWJ1dGlvbldpZHRoIChtYXApIHtcbiAgLy8gZWl0aGVyIGNyb3AgYXQgNTVweCBvciB1c2VyIGRlZmluZWQgYnVmZmVyXG4gIHJldHVybiAobWFwLmdldFNpemUoKS54IC0gb3B0aW9ucy5hdHRyaWJ1dGlvbldpZHRoT2Zmc2V0KSArICdweCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRFc3JpQXR0cmlidXRpb24gKG1hcCkge1xuICBpZiAobWFwLmF0dHJpYnV0aW9uQ29udHJvbCAmJiAhbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5fZXNyaUF0dHJpYnV0aW9uQWRkZWQpIHtcbiAgICBtYXAuYXR0cmlidXRpb25Db250cm9sLnNldFByZWZpeCgnPGEgaHJlZj1cImh0dHA6Ly9sZWFmbGV0anMuY29tXCIgdGl0bGU9XCJBIEpTIGxpYnJhcnkgZm9yIGludGVyYWN0aXZlIG1hcHNcIj5MZWFmbGV0PC9hPiB8IFBvd2VyZWQgYnkgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmVzcmkuY29tXCI+RXNyaTwvYT4nKTtcblxuICAgIHZhciBob3ZlckF0dHJpYnV0aW9uU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGhvdmVyQXR0cmlidXRpb25TdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICBob3ZlckF0dHJpYnV0aW9uU3R5bGUuaW5uZXJIVE1MID0gJy5lc3JpLXRydW5jYXRlZC1hdHRyaWJ1dGlvbjpob3ZlciB7JyArXG4gICAgICAnd2hpdGUtc3BhY2U6IG5vcm1hbDsnICtcbiAgICAnfSc7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGhvdmVyQXR0cmlidXRpb25TdHlsZSk7XG4gICAgRG9tVXRpbC5hZGRDbGFzcyhtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIsICdlc3JpLXRydW5jYXRlZC1hdHRyaWJ1dGlvbjpob3ZlcicpO1xuXG4gICAgLy8gZGVmaW5lIGEgbmV3IGNzcyBjbGFzcyBpbiBKUyB0byB0cmltIGF0dHJpYnV0aW9uIGludG8gYSBzaW5nbGUgbGluZVxuICAgIHZhciBhdHRyaWJ1dGlvblN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBhdHRyaWJ1dGlvblN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGF0dHJpYnV0aW9uU3R5bGUuaW5uZXJIVE1MID0gJy5lc3JpLXRydW5jYXRlZC1hdHRyaWJ1dGlvbiB7JyArXG4gICAgICAndmVydGljYWwtYWxpZ246IC0zcHg7JyArXG4gICAgICAnd2hpdGUtc3BhY2U6IG5vd3JhcDsnICtcbiAgICAgICdvdmVyZmxvdzogaGlkZGVuOycgK1xuICAgICAgJ3RleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOycgK1xuICAgICAgJ2Rpc3BsYXk6IGlubGluZS1ibG9jazsnICtcbiAgICAgICd0cmFuc2l0aW9uOiAwcyB3aGl0ZS1zcGFjZTsnICtcbiAgICAgICd0cmFuc2l0aW9uLWRlbGF5OiAxczsnICtcbiAgICAgICdtYXgtd2lkdGg6ICcgKyBjYWxjQXR0cmlidXRpb25XaWR0aChtYXApICsgJzsnICtcbiAgICAnfSc7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGF0dHJpYnV0aW9uU3R5bGUpO1xuICAgIERvbVV0aWwuYWRkQ2xhc3MobWFwLmF0dHJpYnV0aW9uQ29udHJvbC5fY29udGFpbmVyLCAnZXNyaS10cnVuY2F0ZWQtYXR0cmlidXRpb24nKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgd2lkdGggdXNlZCB0byB0cnVuY2F0ZSB3aGVuIHRoZSBtYXAgaXRzZWxmIGlzIHJlc2l6ZWRcbiAgICBtYXAub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIuc3R5bGUubWF4V2lkdGggPSBjYWxjQXR0cmlidXRpb25XaWR0aChlLnRhcmdldCk7XG4gICAgfSk7XG5cbiAgICBtYXAuYXR0cmlidXRpb25Db250cm9sLl9lc3JpQXR0cmlidXRpb25BZGRlZCA9IHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9zZXRHZW9tZXRyeSAoZ2VvbWV0cnkpIHtcbiAgdmFyIHBhcmFtcyA9IHtcbiAgICBnZW9tZXRyeTogbnVsbCxcbiAgICBnZW9tZXRyeVR5cGU6IG51bGxcbiAgfTtcblxuICAvLyBjb252ZXJ0IGJvdW5kcyB0byBleHRlbnQgYW5kIGZpbmlzaFxuICBpZiAoZ2VvbWV0cnkgaW5zdGFuY2VvZiBMYXRMbmdCb3VuZHMpIHtcbiAgICAvLyBzZXQgZ2VvbWV0cnkgKyBnZW9tZXRyeVR5cGVcbiAgICBwYXJhbXMuZ2VvbWV0cnkgPSBib3VuZHNUb0V4dGVudChnZW9tZXRyeSk7XG4gICAgcGFyYW1zLmdlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlFbnZlbG9wZSc7XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8vIGNvbnZlcnQgTC5NYXJrZXIgPiBMLkxhdExuZ1xuICBpZiAoZ2VvbWV0cnkuZ2V0TGF0TG5nKSB7XG4gICAgZ2VvbWV0cnkgPSBnZW9tZXRyeS5nZXRMYXRMbmcoKTtcbiAgfVxuXG4gIC8vIGNvbnZlcnQgTC5MYXRMbmcgdG8gYSBnZW9qc29uIHBvaW50IGFuZCBjb250aW51ZTtcbiAgaWYgKGdlb21ldHJ5IGluc3RhbmNlb2YgTGF0TG5nKSB7XG4gICAgZ2VvbWV0cnkgPSB7XG4gICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgY29vcmRpbmF0ZXM6IFtnZW9tZXRyeS5sbmcsIGdlb21ldHJ5LmxhdF1cbiAgICB9O1xuICB9XG5cbiAgLy8gaGFuZGxlIEwuR2VvSlNPTiwgcHVsbCBvdXQgdGhlIGZpcnN0IGdlb21ldHJ5XG4gIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIEdlb0pTT04pIHtcbiAgICAvLyByZWFzc2lnbiBnZW9tZXRyeSB0byB0aGUgR2VvSlNPTiB2YWx1ZSAgKHdlIGFyZSBhc3N1bWluZyB0aGF0IG9ubHkgb25lIGZlYXR1cmUgaXMgcHJlc2VudClcbiAgICBnZW9tZXRyeSA9IGdlb21ldHJ5LmdldExheWVycygpWzBdLmZlYXR1cmUuZ2VvbWV0cnk7XG4gICAgcGFyYW1zLmdlb21ldHJ5ID0gZ2VvanNvblRvQXJjR0lTKGdlb21ldHJ5KTtcbiAgICBwYXJhbXMuZ2VvbWV0cnlUeXBlID0gZ2VvanNvblR5cGVUb0FyY0dJUyhnZW9tZXRyeS50eXBlKTtcbiAgfVxuXG4gIC8vIEhhbmRsZSBMLlBvbHlsaW5lIGFuZCBMLlBvbHlnb25cbiAgaWYgKGdlb21ldHJ5LnRvR2VvSlNPTikge1xuICAgIGdlb21ldHJ5ID0gZ2VvbWV0cnkudG9HZW9KU09OKCk7XG4gIH1cblxuICAvLyBoYW5kbGUgR2VvSlNPTiBmZWF0dXJlIGJ5IHB1bGxpbmcgb3V0IHRoZSBnZW9tZXRyeVxuICBpZiAoZ2VvbWV0cnkudHlwZSA9PT0gJ0ZlYXR1cmUnKSB7XG4gICAgLy8gZ2V0IHRoZSBnZW9tZXRyeSBvZiB0aGUgZ2VvanNvbiBmZWF0dXJlXG4gICAgZ2VvbWV0cnkgPSBnZW9tZXRyeS5nZW9tZXRyeTtcbiAgfVxuXG4gIC8vIGNvbmZpcm0gdGhhdCBvdXIgR2VvSlNPTiBpcyBhIHBvaW50LCBsaW5lIG9yIHBvbHlnb25cbiAgaWYgKGdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcgfHwgZ2VvbWV0cnkudHlwZSA9PT0gJ0xpbmVTdHJpbmcnIHx8IGdlb21ldHJ5LnR5cGUgPT09ICdQb2x5Z29uJyB8fCBnZW9tZXRyeS50eXBlID09PSAnTXVsdGlQb2x5Z29uJykge1xuICAgIHBhcmFtcy5nZW9tZXRyeSA9IGdlb2pzb25Ub0FyY0dJUyhnZW9tZXRyeSk7XG4gICAgcGFyYW1zLmdlb21ldHJ5VHlwZSA9IGdlb2pzb25UeXBlVG9BcmNHSVMoZ2VvbWV0cnkudHlwZSk7XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8vIHdhcm4gdGhlIHVzZXIgaWYgd2UgaGF2bid0IGZvdW5kIGFuIGFwcHJvcHJpYXRlIG9iamVjdFxuICB3YXJuKCdpbnZhbGlkIGdlb21ldHJ5IHBhc3NlZCB0byBzcGF0aWFsIHF1ZXJ5LiBTaG91bGQgYmUgTC5MYXRMbmcsIEwuTGF0TG5nQm91bmRzLCBMLk1hcmtlciBvciBhIEdlb0pTT04gUG9pbnQsIExpbmUsIFBvbHlnb24gb3IgTXVsdGlQb2x5Z29uIG9iamVjdCcpO1xuXG4gIHJldHVybjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRBdHRyaWJ1dGlvbkRhdGEgKHVybCwgbWFwKSB7XG4gIGpzb25wKHVybCwge30sIFV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIGF0dHJpYnV0aW9ucykge1xuICAgIGlmIChlcnJvcikgeyByZXR1cm47IH1cbiAgICBtYXAuX2VzcmlBdHRyaWJ1dGlvbnMgPSBbXTtcbiAgICBmb3IgKHZhciBjID0gMDsgYyA8IGF0dHJpYnV0aW9ucy5jb250cmlidXRvcnMubGVuZ3RoOyBjKyspIHtcbiAgICAgIHZhciBjb250cmlidXRvciA9IGF0dHJpYnV0aW9ucy5jb250cmlidXRvcnNbY107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udHJpYnV0b3IuY292ZXJhZ2VBcmVhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY292ZXJhZ2VBcmVhID0gY29udHJpYnV0b3IuY292ZXJhZ2VBcmVhc1tpXTtcbiAgICAgICAgdmFyIHNvdXRoV2VzdCA9IGxhdExuZyhjb3ZlcmFnZUFyZWEuYmJveFswXSwgY292ZXJhZ2VBcmVhLmJib3hbMV0pO1xuICAgICAgICB2YXIgbm9ydGhFYXN0ID0gbGF0TG5nKGNvdmVyYWdlQXJlYS5iYm94WzJdLCBjb3ZlcmFnZUFyZWEuYmJveFszXSk7XG4gICAgICAgIG1hcC5fZXNyaUF0dHJpYnV0aW9ucy5wdXNoKHtcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogY29udHJpYnV0b3IuYXR0cmlidXRpb24sXG4gICAgICAgICAgc2NvcmU6IGNvdmVyYWdlQXJlYS5zY29yZSxcbiAgICAgICAgICBib3VuZHM6IGxhdExuZ0JvdW5kcyhzb3V0aFdlc3QsIG5vcnRoRWFzdCksXG4gICAgICAgICAgbWluWm9vbTogY292ZXJhZ2VBcmVhLnpvb21NaW4sXG4gICAgICAgICAgbWF4Wm9vbTogY292ZXJhZ2VBcmVhLnpvb21NYXhcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWFwLl9lc3JpQXR0cmlidXRpb25zLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZTtcbiAgICB9KTtcblxuICAgIC8vIHBhc3MgdGhlIHNhbWUgYXJndW1lbnQgYXMgdGhlIG1hcCdzICdtb3ZlZW5kJyBldmVudFxuICAgIHZhciBvYmogPSB7IHRhcmdldDogbWFwIH07XG4gICAgX3VwZGF0ZU1hcEF0dHJpYnV0aW9uKG9iaik7XG4gIH0sIHRoaXMpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF91cGRhdGVNYXBBdHRyaWJ1dGlvbiAoZXZ0KSB7XG4gIHZhciBtYXAgPSBldnQudGFyZ2V0O1xuICB2YXIgb2xkQXR0cmlidXRpb25zID0gbWFwLl9lc3JpQXR0cmlidXRpb25zO1xuXG4gIGlmIChtYXAgJiYgbWFwLmF0dHJpYnV0aW9uQ29udHJvbCAmJiBvbGRBdHRyaWJ1dGlvbnMpIHtcbiAgICB2YXIgbmV3QXR0cmlidXRpb25zID0gJyc7XG4gICAgdmFyIGJvdW5kcyA9IG1hcC5nZXRCb3VuZHMoKTtcbiAgICB2YXIgd3JhcHBlZEJvdW5kcyA9IGxhdExuZ0JvdW5kcyhcbiAgICAgIGJvdW5kcy5nZXRTb3V0aFdlc3QoKS53cmFwKCksXG4gICAgICBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkud3JhcCgpXG4gICAgKTtcbiAgICB2YXIgem9vbSA9IG1hcC5nZXRab29tKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZEF0dHJpYnV0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGF0dHJpYnV0aW9uID0gb2xkQXR0cmlidXRpb25zW2ldO1xuICAgICAgdmFyIHRleHQgPSBhdHRyaWJ1dGlvbi5hdHRyaWJ1dGlvbjtcblxuICAgICAgaWYgKCFuZXdBdHRyaWJ1dGlvbnMubWF0Y2godGV4dCkgJiYgYXR0cmlidXRpb24uYm91bmRzLmludGVyc2VjdHMod3JhcHBlZEJvdW5kcykgJiYgem9vbSA+PSBhdHRyaWJ1dGlvbi5taW5ab29tICYmIHpvb20gPD0gYXR0cmlidXRpb24ubWF4Wm9vbSkge1xuICAgICAgICBuZXdBdHRyaWJ1dGlvbnMgKz0gKCcsICcgKyB0ZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdBdHRyaWJ1dGlvbnMgPSBuZXdBdHRyaWJ1dGlvbnMuc3Vic3RyKDIpO1xuICAgIHZhciBhdHRyaWJ1dGlvbkVsZW1lbnQgPSBtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIucXVlcnlTZWxlY3RvcignLmVzcmktZHluYW1pYy1hdHRyaWJ1dGlvbicpO1xuXG4gICAgYXR0cmlidXRpb25FbGVtZW50LmlubmVySFRNTCA9IG5ld0F0dHJpYnV0aW9ucztcbiAgICBhdHRyaWJ1dGlvbkVsZW1lbnQuc3R5bGUubWF4V2lkdGggPSBjYWxjQXR0cmlidXRpb25XaWR0aChtYXApO1xuXG4gICAgbWFwLmZpcmUoJ2F0dHJpYnV0aW9udXBkYXRlZCcsIHtcbiAgICAgIGF0dHJpYnV0aW9uOiBuZXdBdHRyaWJ1dGlvbnNcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIEVzcmlVdGlsID0ge1xuICBzaGFsbG93Q2xvbmU6IHNoYWxsb3dDbG9uZSxcbiAgd2Fybjogd2FybixcbiAgY2xlYW5Vcmw6IGNsZWFuVXJsLFxuICBpc0FyY2dpc09ubGluZTogaXNBcmNnaXNPbmxpbmUsXG4gIGdlb2pzb25UeXBlVG9BcmNHSVM6IGdlb2pzb25UeXBlVG9BcmNHSVMsXG4gIHJlc3BvbnNlVG9GZWF0dXJlQ29sbGVjdGlvbjogcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uLFxuICBnZW9qc29uVG9BcmNHSVM6IGdlb2pzb25Ub0FyY0dJUyxcbiAgYXJjZ2lzVG9HZW9KU09OOiBhcmNnaXNUb0dlb0pTT04sXG4gIGJvdW5kc1RvRXh0ZW50OiBib3VuZHNUb0V4dGVudCxcbiAgZXh0ZW50VG9Cb3VuZHM6IGV4dGVudFRvQm91bmRzLFxuICBjYWxjQXR0cmlidXRpb25XaWR0aDogY2FsY0F0dHJpYnV0aW9uV2lkdGgsXG4gIHNldEVzcmlBdHRyaWJ1dGlvbjogc2V0RXNyaUF0dHJpYnV0aW9uLFxuICBfc2V0R2VvbWV0cnk6IF9zZXRHZW9tZXRyeSxcbiAgX2dldEF0dHJpYnV0aW9uRGF0YTogX2dldEF0dHJpYnV0aW9uRGF0YSxcbiAgX3VwZGF0ZU1hcEF0dHJpYnV0aW9uOiBfdXBkYXRlTWFwQXR0cmlidXRpb25cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVzcmlVdGlsO1xuIiwiaW1wb3J0IHsgQ2xhc3MsIFV0aWwgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7Y29yc30gZnJvbSAnLi4vU3VwcG9ydCc7XG5pbXBvcnQge2NsZWFuVXJsfSBmcm9tICcuLi9VdGlsJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL1JlcXVlc3QnO1xuXG5leHBvcnQgdmFyIFRhc2sgPSBDbGFzcy5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBwcm94eTogZmFsc2UsXG4gICAgdXNlQ29yczogY29yc1xuICB9LFxuXG4gIC8vIEdlbmVyYXRlIGEgbWV0aG9kIGZvciBlYWNoIG1ldGhvZE5hbWU6cGFyYW1OYW1lIGluIHRoZSBzZXR0ZXJzIGZvciB0aGlzIHRhc2suXG4gIGdlbmVyYXRlU2V0dGVyOiBmdW5jdGlvbiAocGFyYW0sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gVXRpbC5iaW5kKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy5wYXJhbXNbcGFyYW1dID0gdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoZW5kcG9pbnQpIHtcbiAgICAvLyBlbmRwb2ludCBjYW4gYmUgZWl0aGVyIGEgdXJsIChhbmQgb3B0aW9ucykgZm9yIGFuIEFyY0dJUyBSZXN0IFNlcnZpY2Ugb3IgYW4gaW5zdGFuY2Ugb2YgRXNyaUxlYWZsZXQuU2VydmljZVxuICAgIGlmIChlbmRwb2ludC5yZXF1ZXN0ICYmIGVuZHBvaW50Lm9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UgPSBlbmRwb2ludDtcbiAgICAgIFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBlbmRwb2ludC5vcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgVXRpbC5zZXRPcHRpb25zKHRoaXMsIGVuZHBvaW50KTtcbiAgICAgIHRoaXMub3B0aW9ucy51cmwgPSBjbGVhblVybChlbmRwb2ludC51cmwpO1xuICAgIH1cblxuICAgIC8vIGNsb25lIGRlZmF1bHQgcGFyYW1zIGludG8gdGhpcyBvYmplY3RcbiAgICB0aGlzLnBhcmFtcyA9IFV0aWwuZXh0ZW5kKHt9LCB0aGlzLnBhcmFtcyB8fCB7fSk7XG5cbiAgICAvLyBnZW5lcmF0ZSBzZXR0ZXIgbWV0aG9kcyBiYXNlZCBvbiB0aGUgc2V0dGVycyBvYmplY3QgaW1wbGltZW50ZWQgYSBjaGlsZCBjbGFzc1xuICAgIGlmICh0aGlzLnNldHRlcnMpIHtcbiAgICAgIGZvciAodmFyIHNldHRlciBpbiB0aGlzLnNldHRlcnMpIHtcbiAgICAgICAgdmFyIHBhcmFtID0gdGhpcy5zZXR0ZXJzW3NldHRlcl07XG4gICAgICAgIHRoaXNbc2V0dGVyXSA9IHRoaXMuZ2VuZXJhdGVTZXR0ZXIocGFyYW0sIHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB0b2tlbjogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgaWYgKHRoaXMuX3NlcnZpY2UpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuYXV0aGVudGljYXRlKHRva2VuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJhbXMudG9rZW4gPSB0b2tlbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8gQXJjR0lTIFNlcnZlciBGaW5kL0lkZW50aWZ5IDEwLjUrXG4gIGZvcm1hdDogZnVuY3Rpb24gKGJvb2xlYW4pIHtcbiAgICAvLyB1c2UgZG91YmxlIG5lZ2F0aXZlIHRvIGV4cG9zZSBhIG1vcmUgaW50dWl0aXZlIHBvc2l0aXZlIG1ldGhvZCBuYW1lXG4gICAgdGhpcy5wYXJhbXMucmV0dXJuVW5mb3JtYXR0ZWRWYWx1ZXMgPSAhYm9vbGVhbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZXF1ZXN0OiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAodGhpcy5fc2VydmljZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2UucmVxdWVzdCh0aGlzLnBhdGgsIHRoaXMucGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ3JlcXVlc3QnLCB0aGlzLnBhdGgsIHRoaXMucGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH0sXG5cbiAgX3JlcXVlc3Q6IGZ1bmN0aW9uIChtZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgdXJsID0gKHRoaXMub3B0aW9ucy5wcm94eSkgPyB0aGlzLm9wdGlvbnMucHJveHkgKyAnPycgKyB0aGlzLm9wdGlvbnMudXJsICsgcGF0aCA6IHRoaXMub3B0aW9ucy51cmwgKyBwYXRoO1xuXG4gICAgaWYgKChtZXRob2QgPT09ICdnZXQnIHx8IG1ldGhvZCA9PT0gJ3JlcXVlc3QnKSAmJiAhdGhpcy5vcHRpb25zLnVzZUNvcnMpIHtcbiAgICAgIHJldHVybiBSZXF1ZXN0LmdldC5KU09OUCh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiBSZXF1ZXN0W21ldGhvZF0odXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0YXNrIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgVGFzayhvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGFzaztcbiIsImltcG9ydCB7IHBvaW50LCBsYXRMbmcgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFRhc2sgfSBmcm9tICcuL1Rhc2snO1xuaW1wb3J0IHtcbiAgd2FybixcbiAgcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uLFxuICBpc0FyY2dpc09ubGluZSxcbiAgZXh0ZW50VG9Cb3VuZHMsXG4gIF9zZXRHZW9tZXRyeVxufSBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBRdWVyeSA9IFRhc2suZXh0ZW5kKHtcbiAgc2V0dGVyczoge1xuICAgICdvZmZzZXQnOiAncmVzdWx0T2Zmc2V0JyxcbiAgICAnbGltaXQnOiAncmVzdWx0UmVjb3JkQ291bnQnLFxuICAgICdmaWVsZHMnOiAnb3V0RmllbGRzJyxcbiAgICAncHJlY2lzaW9uJzogJ2dlb21ldHJ5UHJlY2lzaW9uJyxcbiAgICAnZmVhdHVyZUlkcyc6ICdvYmplY3RJZHMnLFxuICAgICdyZXR1cm5HZW9tZXRyeSc6ICdyZXR1cm5HZW9tZXRyeScsXG4gICAgJ3RyYW5zZm9ybSc6ICdkYXR1bVRyYW5zZm9ybWF0aW9uJyxcbiAgICAndG9rZW4nOiAndG9rZW4nXG4gIH0sXG5cbiAgcGF0aDogJ3F1ZXJ5JyxcblxuICBwYXJhbXM6IHtcbiAgICByZXR1cm5HZW9tZXRyeTogdHJ1ZSxcbiAgICB3aGVyZTogJzE9MScsXG4gICAgb3V0U3I6IDQzMjYsXG4gICAgb3V0RmllbGRzOiAnKidcbiAgfSxcblxuICAvLyBSZXR1cm5zIGEgZmVhdHVyZSBpZiBpdHMgc2hhcGUgaXMgd2hvbGx5IGNvbnRhaW5lZCB3aXRoaW4gdGhlIHNlYXJjaCBnZW9tZXRyeS4gVmFsaWQgZm9yIGFsbCBzaGFwZSB0eXBlIGNvbWJpbmF0aW9ucy5cbiAgd2l0aGluOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeVBhcmFtcyhnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbENvbnRhaW5zJzsgLy8gdG8gdGhlIFJFU1QgYXBpIHRoaXMgcmVhZHMgZ2VvbWV0cnkgKipjb250YWlucyoqIGxheWVyXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8gUmV0dXJucyBhIGZlYXR1cmUgaWYgYW55IHNwYXRpYWwgcmVsYXRpb25zaGlwIGlzIGZvdW5kLiBBcHBsaWVzIHRvIGFsbCBzaGFwZSB0eXBlIGNvbWJpbmF0aW9ucy5cbiAgaW50ZXJzZWN0czogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnlQYXJhbXMoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxJbnRlcnNlY3RzJztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBSZXR1cm5zIGEgZmVhdHVyZSBpZiBpdHMgc2hhcGUgd2hvbGx5IGNvbnRhaW5zIHRoZSBzZWFyY2ggZ2VvbWV0cnkuIFZhbGlkIGZvciBhbGwgc2hhcGUgdHlwZSBjb21iaW5hdGlvbnMuXG4gIGNvbnRhaW5zOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeVBhcmFtcyhnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbFdpdGhpbic7IC8vIHRvIHRoZSBSRVNUIGFwaSB0aGlzIHJlYWRzIGdlb21ldHJ5ICoqd2l0aGluKiogbGF5ZXJcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBSZXR1cm5zIGEgZmVhdHVyZSBpZiB0aGUgaW50ZXJzZWN0aW9uIG9mIHRoZSBpbnRlcmlvcnMgb2YgdGhlIHR3byBzaGFwZXMgaXMgbm90IGVtcHR5IGFuZCBoYXMgYSBsb3dlciBkaW1lbnNpb24gdGhhbiB0aGUgbWF4aW11bSBkaW1lbnNpb24gb2YgdGhlIHR3byBzaGFwZXMuIFR3byBsaW5lcyB0aGF0IHNoYXJlIGFuIGVuZHBvaW50IGluIGNvbW1vbiBkbyBub3QgY3Jvc3MuIFZhbGlkIGZvciBMaW5lL0xpbmUsIExpbmUvQXJlYSwgTXVsdGktcG9pbnQvQXJlYSwgYW5kIE11bHRpLXBvaW50L0xpbmUgc2hhcGUgdHlwZSBjb21iaW5hdGlvbnMuXG4gIGNyb3NzZXM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5UGFyYW1zKGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsQ3Jvc3Nlcyc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8gUmV0dXJucyBhIGZlYXR1cmUgaWYgdGhlIHR3byBzaGFwZXMgc2hhcmUgYSBjb21tb24gYm91bmRhcnkuIEhvd2V2ZXIsIHRoZSBpbnRlcnNlY3Rpb24gb2YgdGhlIGludGVyaW9ycyBvZiB0aGUgdHdvIHNoYXBlcyBtdXN0IGJlIGVtcHR5LiBJbiB0aGUgUG9pbnQvTGluZSBjYXNlLCB0aGUgcG9pbnQgbWF5IHRvdWNoIGFuIGVuZHBvaW50IG9ubHkgb2YgdGhlIGxpbmUuIEFwcGxpZXMgdG8gYWxsIGNvbWJpbmF0aW9ucyBleGNlcHQgUG9pbnQvUG9pbnQuXG4gIHRvdWNoZXM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5UGFyYW1zKGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsVG91Y2hlcyc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8gUmV0dXJucyBhIGZlYXR1cmUgaWYgdGhlIGludGVyc2VjdGlvbiBvZiB0aGUgdHdvIHNoYXBlcyByZXN1bHRzIGluIGFuIG9iamVjdCBvZiB0aGUgc2FtZSBkaW1lbnNpb24sIGJ1dCBkaWZmZXJlbnQgZnJvbSBib3RoIG9mIHRoZSBzaGFwZXMuIEFwcGxpZXMgdG8gQXJlYS9BcmVhLCBMaW5lL0xpbmUsIGFuZCBNdWx0aS1wb2ludC9NdWx0aS1wb2ludCBzaGFwZSB0eXBlIGNvbWJpbmF0aW9ucy5cbiAgb3ZlcmxhcHM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5UGFyYW1zKGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsT3ZlcmxhcHMnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIFJldHVybnMgYSBmZWF0dXJlIGlmIHRoZSBlbnZlbG9wZSBvZiB0aGUgdHdvIHNoYXBlcyBpbnRlcnNlY3RzLlxuICBiYm94SW50ZXJzZWN0czogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnlQYXJhbXMoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxFbnZlbG9wZUludGVyc2VjdHMnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIGlmIHNvbWVvbmUgY2FuIGhlbHAgZGVjaXBoZXIgdGhlIEFyY09iamVjdHMgZXhwbGFuYXRpb24gYW5kIHRyYW5zbGF0ZSB0byBwbGFpbiBzcGVhaywgd2Ugc2hvdWxkIG1lbnRpb24gdGhpcyBtZXRob2QgaW4gdGhlIGRvY1xuICBpbmRleEludGVyc2VjdHM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5UGFyYW1zKGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsSW5kZXhJbnRlcnNlY3RzJzsgLy8gUmV0dXJucyBhIGZlYXR1cmUgaWYgdGhlIGVudmVsb3BlIG9mIHRoZSBxdWVyeSBnZW9tZXRyeSBpbnRlcnNlY3RzIHRoZSBpbmRleCBlbnRyeSBmb3IgdGhlIHRhcmdldCBnZW9tZXRyeVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIG9ubHkgdmFsaWQgZm9yIEZlYXR1cmUgU2VydmljZXMgcnVubmluZyBvbiBBcmNHSVMgU2VydmVyIDEwLjMrIG9yIEFyY0dJUyBPbmxpbmVcbiAgbmVhcmJ5OiBmdW5jdGlvbiAobGF0bG5nLCByYWRpdXMpIHtcbiAgICBsYXRsbmcgPSBsYXRMbmcobGF0bG5nKTtcbiAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeSA9IFtsYXRsbmcubG5nLCBsYXRsbmcubGF0XTtcbiAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9pbnQnO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxJbnRlcnNlY3RzJztcbiAgICB0aGlzLnBhcmFtcy51bml0cyA9ICdlc3JpU1JVbml0X01ldGVyJztcbiAgICB0aGlzLnBhcmFtcy5kaXN0YW5jZSA9IHJhZGl1cztcbiAgICB0aGlzLnBhcmFtcy5pblNyID0gNDMyNjtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICB3aGVyZTogZnVuY3Rpb24gKHN0cmluZykge1xuICAgIC8vIGluc3RlYWQgb2YgY29udmVydGluZyBkb3VibGUtcXVvdGVzIHRvIHNpbmdsZSBxdW90ZXMsIHBhc3MgYXMgaXMsIGFuZCBwcm92aWRlIGEgbW9yZSBpbmZvcm1hdGl2ZSBtZXNzYWdlIGlmIGEgNDAwIGlzIGVuY291bnRlcmVkXG4gICAgdGhpcy5wYXJhbXMud2hlcmUgPSBzdHJpbmc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYmV0d2VlbjogZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICB0aGlzLnBhcmFtcy50aW1lID0gW3N0YXJ0LnZhbHVlT2YoKSwgZW5kLnZhbHVlT2YoKV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2ltcGxpZnk6IGZ1bmN0aW9uIChtYXAsIGZhY3Rvcikge1xuICAgIHZhciBtYXBXaWR0aCA9IE1hdGguYWJzKG1hcC5nZXRCb3VuZHMoKS5nZXRXZXN0KCkgLSBtYXAuZ2V0Qm91bmRzKCkuZ2V0RWFzdCgpKTtcbiAgICB0aGlzLnBhcmFtcy5tYXhBbGxvd2FibGVPZmZzZXQgPSAobWFwV2lkdGggLyBtYXAuZ2V0U2l6ZSgpLnkpICogZmFjdG9yO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9yZGVyQnk6IGZ1bmN0aW9uIChmaWVsZE5hbWUsIG9yZGVyKSB7XG4gICAgb3JkZXIgPSBvcmRlciB8fCAnQVNDJztcbiAgICB0aGlzLnBhcmFtcy5vcmRlckJ5RmllbGRzID0gKHRoaXMucGFyYW1zLm9yZGVyQnlGaWVsZHMpID8gdGhpcy5wYXJhbXMub3JkZXJCeUZpZWxkcyArICcsJyA6ICcnO1xuICAgIHRoaXMucGFyYW1zLm9yZGVyQnlGaWVsZHMgKz0gKFtmaWVsZE5hbWUsIG9yZGVyXSkuam9pbignICcpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fY2xlYW5QYXJhbXMoKTtcblxuICAgIC8vIHNlcnZpY2VzIGhvc3RlZCBvbiBBcmNHSVMgT25saW5lIGFuZCBBcmNHSVMgU2VydmVyIDEwLjMuMSsgc3VwcG9ydCByZXF1ZXN0aW5nIGdlb2pzb24gZGlyZWN0bHlcbiAgICBpZiAodGhpcy5vcHRpb25zLmlzTW9kZXJuIHx8IGlzQXJjZ2lzT25saW5lKHRoaXMub3B0aW9ucy51cmwpKSB7XG4gICAgICB0aGlzLnBhcmFtcy5mID0gJ2dlb2pzb24nO1xuXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5fdHJhcFNRTGVycm9ycyhlcnJvcik7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlLCByZXNwb25zZSk7XG4gICAgICB9LCB0aGlzKTtcblxuICAgIC8vIG90aGVyd2lzZSBjb252ZXJ0IGl0IGluIHRoZSBjYWxsYmFjayB0aGVuIHBhc3MgaXQgb25cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuX3RyYXBTUUxlcnJvcnMoZXJyb3IpO1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCAocmVzcG9uc2UgJiYgcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uKHJlc3BvbnNlKSksIHJlc3BvbnNlKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgfSxcblxuICBjb3VudDogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fY2xlYW5QYXJhbXMoKTtcbiAgICB0aGlzLnBhcmFtcy5yZXR1cm5Db3VudE9ubHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBlcnJvciwgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmNvdW50KSwgcmVzcG9uc2UpO1xuICAgIH0sIGNvbnRleHQpO1xuICB9LFxuXG4gIGlkczogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fY2xlYW5QYXJhbXMoKTtcbiAgICB0aGlzLnBhcmFtcy5yZXR1cm5JZHNPbmx5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZXJyb3IsIChyZXNwb25zZSAmJiByZXNwb25zZS5vYmplY3RJZHMpLCByZXNwb25zZSk7XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgLy8gb25seSB2YWxpZCBmb3IgRmVhdHVyZSBTZXJ2aWNlcyBydW5uaW5nIG9uIEFyY0dJUyBTZXJ2ZXIgMTAuMysgb3IgQXJjR0lTIE9ubGluZVxuICBib3VuZHM6IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuX2NsZWFuUGFyYW1zKCk7XG4gICAgdGhpcy5wYXJhbXMucmV0dXJuRXh0ZW50T25seSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZXh0ZW50ICYmIGV4dGVudFRvQm91bmRzKHJlc3BvbnNlLmV4dGVudCkpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgZXh0ZW50VG9Cb3VuZHMocmVzcG9uc2UuZXh0ZW50KSwgcmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3IgPSB7XG4gICAgICAgICAgbWVzc2FnZTogJ0ludmFsaWQgQm91bmRzJ1xuICAgICAgICB9O1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCBudWxsLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgLy8gb25seSB2YWxpZCBmb3IgaW1hZ2Ugc2VydmljZXNcbiAgcGl4ZWxTaXplOiBmdW5jdGlvbiAocmF3UG9pbnQpIHtcbiAgICB2YXIgY2FzdFBvaW50ID0gcG9pbnQocmF3UG9pbnQpO1xuICAgIHRoaXMucGFyYW1zLnBpeGVsU2l6ZSA9IFtjYXN0UG9pbnQueCwgY2FzdFBvaW50LnldO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIG9ubHkgdmFsaWQgZm9yIG1hcCBzZXJ2aWNlc1xuICBsYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgdGhpcy5wYXRoID0gbGF5ZXIgKyAnL3F1ZXJ5JztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBfdHJhcFNRTGVycm9yczogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IuY29kZSA9PT0gJzQwMCcpIHtcbiAgICAgICAgd2Fybignb25lIGNvbW1vbiBzeW50YXggZXJyb3IgaW4gcXVlcnkgcmVxdWVzdHMgaXMgZW5jYXNpbmcgc3RyaW5nIHZhbHVlcyBpbiBkb3VibGUgcXVvdGVzIGluc3RlYWQgb2Ygc2luZ2xlIHF1b3RlcycpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfY2xlYW5QYXJhbXM6IGZ1bmN0aW9uICgpIHtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuSWRzT25seTtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuRXh0ZW50T25seTtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuQ291bnRPbmx5O1xuICB9LFxuXG4gIF9zZXRHZW9tZXRyeVBhcmFtczogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5wYXJhbXMuaW5TciA9IDQzMjY7XG4gICAgdmFyIGNvbnZlcnRlZCA9IF9zZXRHZW9tZXRyeShnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnkgPSBjb252ZXJ0ZWQuZ2VvbWV0cnk7XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnlUeXBlID0gY29udmVydGVkLmdlb21ldHJ5VHlwZTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5IChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgUXVlcnkob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHF1ZXJ5O1xuIiwiaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vVGFzayc7XG5pbXBvcnQgeyByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24gfSBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBGaW5kID0gVGFzay5leHRlbmQoe1xuICBzZXR0ZXJzOiB7XG4gICAgLy8gbWV0aG9kIG5hbWUgPiBwYXJhbSBuYW1lXG4gICAgJ2NvbnRhaW5zJzogJ2NvbnRhaW5zJyxcbiAgICAndGV4dCc6ICdzZWFyY2hUZXh0JyxcbiAgICAnZmllbGRzJzogJ3NlYXJjaEZpZWxkcycsIC8vIGRlbm90ZSBhbiBhcnJheSBvciBzaW5nbGUgc3RyaW5nXG4gICAgJ3NwYXRpYWxSZWZlcmVuY2UnOiAnc3InLFxuICAgICdzcic6ICdzcicsXG4gICAgJ2xheWVycyc6ICdsYXllcnMnLFxuICAgICdyZXR1cm5HZW9tZXRyeSc6ICdyZXR1cm5HZW9tZXRyeScsXG4gICAgJ21heEFsbG93YWJsZU9mZnNldCc6ICdtYXhBbGxvd2FibGVPZmZzZXQnLFxuICAgICdwcmVjaXNpb24nOiAnZ2VvbWV0cnlQcmVjaXNpb24nLFxuICAgICdkeW5hbWljTGF5ZXJzJzogJ2R5bmFtaWNMYXllcnMnLFxuICAgICdyZXR1cm5aJzogJ3JldHVyblonLFxuICAgICdyZXR1cm5NJzogJ3JldHVybk0nLFxuICAgICdnZGJWZXJzaW9uJzogJ2dkYlZlcnNpb24nLFxuICAgIC8vIHNraXBwZWQgaW1wbGVtZW50aW5nIHRoaXMgKGZvciBub3cpIGJlY2F1c2UgdGhlIFJFU1Qgc2VydmljZSBpbXBsZW1lbnRhdGlvbiBpc250IGNvbnNpc3RlbnQgYmV0d2VlbiBvcGVyYXRpb25zXG4gICAgLy8gJ3RyYW5zZm9ybSc6ICdkYXR1bVRyYW5zZm9ybWF0aW9ucycsXG4gICAgJ3Rva2VuJzogJ3Rva2VuJ1xuICB9LFxuXG4gIHBhdGg6ICdmaW5kJyxcblxuICBwYXJhbXM6IHtcbiAgICBzcjogNDMyNixcbiAgICBjb250YWluczogdHJ1ZSxcbiAgICByZXR1cm5HZW9tZXRyeTogdHJ1ZSxcbiAgICByZXR1cm5aOiB0cnVlLFxuICAgIHJldHVybk06IGZhbHNlXG4gIH0sXG5cbiAgbGF5ZXJEZWZzOiBmdW5jdGlvbiAoaWQsIHdoZXJlKSB7XG4gICAgdGhpcy5wYXJhbXMubGF5ZXJEZWZzID0gKHRoaXMucGFyYW1zLmxheWVyRGVmcykgPyB0aGlzLnBhcmFtcy5sYXllckRlZnMgKyAnOycgOiAnJztcbiAgICB0aGlzLnBhcmFtcy5sYXllckRlZnMgKz0gKFtpZCwgd2hlcmVdKS5qb2luKCc6Jyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2ltcGxpZnk6IGZ1bmN0aW9uIChtYXAsIGZhY3Rvcikge1xuICAgIHZhciBtYXBXaWR0aCA9IE1hdGguYWJzKG1hcC5nZXRCb3VuZHMoKS5nZXRXZXN0KCkgLSBtYXAuZ2V0Qm91bmRzKCkuZ2V0RWFzdCgpKTtcbiAgICB0aGlzLnBhcmFtcy5tYXhBbGxvd2FibGVPZmZzZXQgPSAobWFwV2lkdGggLyBtYXAuZ2V0U2l6ZSgpLnkpICogZmFjdG9yO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCAocmVzcG9uc2UgJiYgcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uKHJlc3BvbnNlKSksIHJlc3BvbnNlKTtcbiAgICB9LCBjb250ZXh0KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRmluZChvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmluZDtcbiIsImltcG9ydCB7IFRhc2sgfSBmcm9tICcuL1Rhc2snO1xuXG5leHBvcnQgdmFyIElkZW50aWZ5ID0gVGFzay5leHRlbmQoe1xuICBwYXRoOiAnaWRlbnRpZnknLFxuXG4gIGJldHdlZW46IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgdGhpcy5wYXJhbXMudGltZSA9IFtzdGFydC52YWx1ZU9mKCksIGVuZC52YWx1ZU9mKCldO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aWZ5IChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSWRlbnRpZnkob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlkZW50aWZ5O1xuIiwiaW1wb3J0IHsgbGF0TG5nIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBJZGVudGlmeSB9IGZyb20gJy4vSWRlbnRpZnknO1xuaW1wb3J0IHsgcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uLFxuICBib3VuZHNUb0V4dGVudCxcbiAgX3NldEdlb21ldHJ5XG59IGZyb20gJy4uL1V0aWwnO1xuXG5leHBvcnQgdmFyIElkZW50aWZ5RmVhdHVyZXMgPSBJZGVudGlmeS5leHRlbmQoe1xuICBzZXR0ZXJzOiB7XG4gICAgJ2xheWVycyc6ICdsYXllcnMnLFxuICAgICdwcmVjaXNpb24nOiAnZ2VvbWV0cnlQcmVjaXNpb24nLFxuICAgICd0b2xlcmFuY2UnOiAndG9sZXJhbmNlJyxcbiAgICAvLyBza2lwcGVkIGltcGxlbWVudGluZyB0aGlzIChmb3Igbm93KSBiZWNhdXNlIHRoZSBSRVNUIHNlcnZpY2UgaW1wbGVtZW50YXRpb24gaXNudCBjb25zaXN0ZW50IGJldHdlZW4gb3BlcmF0aW9ucy5cbiAgICAvLyAndHJhbnNmb3JtJzogJ2RhdHVtVHJhbnNmb3JtYXRpb25zJ1xuICAgICdyZXR1cm5HZW9tZXRyeSc6ICdyZXR1cm5HZW9tZXRyeSdcbiAgfSxcblxuICBwYXJhbXM6IHtcbiAgICBzcjogNDMyNixcbiAgICBsYXllcnM6ICdhbGwnLFxuICAgIHRvbGVyYW5jZTogMyxcbiAgICByZXR1cm5HZW9tZXRyeTogdHJ1ZVxuICB9LFxuXG4gIG9uOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgdmFyIGV4dGVudCA9IGJvdW5kc1RvRXh0ZW50KG1hcC5nZXRCb3VuZHMoKSk7XG4gICAgdmFyIHNpemUgPSBtYXAuZ2V0U2l6ZSgpO1xuICAgIHRoaXMucGFyYW1zLmltYWdlRGlzcGxheSA9IFtzaXplLngsIHNpemUueSwgOTZdO1xuICAgIHRoaXMucGFyYW1zLm1hcEV4dGVudCA9IFtleHRlbnQueG1pbiwgZXh0ZW50LnltaW4sIGV4dGVudC54bWF4LCBleHRlbnQueW1heF07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYXQ6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIC8vIGNhc3QgbGF0LCBsb25nIHBhaXJzIGluIHJhdyBhcnJheSBmb3JtIG1hbnVhbGx5XG4gICAgaWYgKGdlb21ldHJ5Lmxlbmd0aCA9PT0gMikge1xuICAgICAgZ2VvbWV0cnkgPSBsYXRMbmcoZ2VvbWV0cnkpO1xuICAgIH1cbiAgICB0aGlzLl9zZXRHZW9tZXRyeVBhcmFtcyhnZW9tZXRyeSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgbGF5ZXJEZWY6IGZ1bmN0aW9uIChpZCwgd2hlcmUpIHtcbiAgICB0aGlzLnBhcmFtcy5sYXllckRlZnMgPSAodGhpcy5wYXJhbXMubGF5ZXJEZWZzKSA/IHRoaXMucGFyYW1zLmxheWVyRGVmcyArICc7JyA6ICcnO1xuICAgIHRoaXMucGFyYW1zLmxheWVyRGVmcyArPSAoW2lkLCB3aGVyZV0pLmpvaW4oJzonKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBzaW1wbGlmeTogZnVuY3Rpb24gKG1hcCwgZmFjdG9yKSB7XG4gICAgdmFyIG1hcFdpZHRoID0gTWF0aC5hYnMobWFwLmdldEJvdW5kcygpLmdldFdlc3QoKSAtIG1hcC5nZXRCb3VuZHMoKS5nZXRFYXN0KCkpO1xuICAgIHRoaXMucGFyYW1zLm1heEFsbG93YWJsZU9mZnNldCA9IChtYXBXaWR0aCAvIG1hcC5nZXRTaXplKCkueSkgKiBmYWN0b3I7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcnVuOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIC8vIGltbWVkaWF0ZWx5IGludm9rZSB3aXRoIGFuIGVycm9yXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgdW5kZWZpbmVkLCByZXNwb25zZSk7XG4gICAgICAgIHJldHVybjtcblxuICAgICAgLy8gb2sgbm8gZXJyb3IgbGV0cyBqdXN0IGFzc3VtZSB3ZSBoYXZlIGZlYXR1cmVzLi4uXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZmVhdHVyZUNvbGxlY3Rpb24gPSByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24ocmVzcG9uc2UpO1xuICAgICAgICByZXNwb25zZS5yZXN1bHRzID0gcmVzcG9uc2UucmVzdWx0cy5yZXZlcnNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZmVhdHVyZSA9IGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzW2ldO1xuICAgICAgICAgIGZlYXR1cmUubGF5ZXJJZCA9IHJlc3BvbnNlLnJlc3VsdHNbaV0ubGF5ZXJJZDtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHVuZGVmaW5lZCwgZmVhdHVyZUNvbGxlY3Rpb24sIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBfc2V0R2VvbWV0cnlQYXJhbXM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHZhciBjb252ZXJ0ZWQgPSBfc2V0R2VvbWV0cnkoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gY29udmVydGVkLmdlb21ldHJ5O1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5VHlwZSA9IGNvbnZlcnRlZC5nZW9tZXRyeVR5cGU7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpZnlGZWF0dXJlcyAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IElkZW50aWZ5RmVhdHVyZXMob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlkZW50aWZ5RmVhdHVyZXM7XG4iLCJpbXBvcnQgeyBsYXRMbmcgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IElkZW50aWZ5IH0gZnJvbSAnLi9JZGVudGlmeSc7XG5pbXBvcnQgeyByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24gfSBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBJZGVudGlmeUltYWdlID0gSWRlbnRpZnkuZXh0ZW5kKHtcbiAgc2V0dGVyczoge1xuICAgICdzZXRNb3NhaWNSdWxlJzogJ21vc2FpY1J1bGUnLFxuICAgICdzZXRSZW5kZXJpbmdSdWxlJzogJ3JlbmRlcmluZ1J1bGUnLFxuICAgICdzZXRQaXhlbFNpemUnOiAncGl4ZWxTaXplJyxcbiAgICAncmV0dXJuQ2F0YWxvZ0l0ZW1zJzogJ3JldHVybkNhdGFsb2dJdGVtcycsXG4gICAgJ3JldHVybkdlb21ldHJ5JzogJ3JldHVybkdlb21ldHJ5J1xuICB9LFxuXG4gIHBhcmFtczoge1xuICAgIHJldHVybkdlb21ldHJ5OiBmYWxzZVxuICB9LFxuXG4gIGF0OiBmdW5jdGlvbiAobGF0bG5nKSB7XG4gICAgbGF0bG5nID0gbGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICB4OiBsYXRsbmcubG5nLFxuICAgICAgeTogbGF0bG5nLmxhdCxcbiAgICAgIHNwYXRpYWxSZWZlcmVuY2U6IHtcbiAgICAgICAgd2tpZDogNDMyNlxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2ludCc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0TW9zYWljUnVsZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnBhcmFtcy5tb3NhaWNSdWxlO1xuICB9LFxuXG4gIGdldFJlbmRlcmluZ1J1bGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXMucmVuZGVyaW5nUnVsZTtcbiAgfSxcblxuICBnZXRQaXhlbFNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXMucGl4ZWxTaXplO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCAocmVzcG9uc2UgJiYgdGhpcy5fcmVzcG9uc2VUb0dlb0pTT04ocmVzcG9uc2UpKSwgcmVzcG9uc2UpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIC8vIGdldCBwaXhlbCBkYXRhIGFuZCByZXR1cm4gYXMgZ2VvSlNPTiBwb2ludFxuICAvLyBwb3B1bGF0ZSBjYXRhbG9nIGl0ZW1zIChpZiBhbnkpXG4gIC8vIG1lcmdpbmcgaW4gYW55IGNhdGFsb2dJdGVtVmlzaWJpbGl0aWVzIGFzIGEgcHJvcGVyeSBvZiBlYWNoIGZlYXR1cmVcbiAgX3Jlc3BvbnNlVG9HZW9KU09OOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB2YXIgbG9jYXRpb24gPSByZXNwb25zZS5sb2NhdGlvbjtcbiAgICB2YXIgY2F0YWxvZ0l0ZW1zID0gcmVzcG9uc2UuY2F0YWxvZ0l0ZW1zO1xuICAgIHZhciBjYXRhbG9nSXRlbVZpc2liaWxpdGllcyA9IHJlc3BvbnNlLmNhdGFsb2dJdGVtVmlzaWJpbGl0aWVzO1xuICAgIHZhciBnZW9KU09OID0ge1xuICAgICAgJ3BpeGVsJzoge1xuICAgICAgICAndHlwZSc6ICdGZWF0dXJlJyxcbiAgICAgICAgJ2dlb21ldHJ5Jzoge1xuICAgICAgICAgICd0eXBlJzogJ1BvaW50JyxcbiAgICAgICAgICAnY29vcmRpbmF0ZXMnOiBbbG9jYXRpb24ueCwgbG9jYXRpb24ueV1cbiAgICAgICAgfSxcbiAgICAgICAgJ2Nycyc6IHtcbiAgICAgICAgICAndHlwZSc6ICdFUFNHJyxcbiAgICAgICAgICAncHJvcGVydGllcyc6IHtcbiAgICAgICAgICAgICdjb2RlJzogbG9jYXRpb24uc3BhdGlhbFJlZmVyZW5jZS53a2lkXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAncHJvcGVydGllcyc6IHtcbiAgICAgICAgICAnT0JKRUNUSUQnOiByZXNwb25zZS5vYmplY3RJZCxcbiAgICAgICAgICAnbmFtZSc6IHJlc3BvbnNlLm5hbWUsXG4gICAgICAgICAgJ3ZhbHVlJzogcmVzcG9uc2UudmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgJ2lkJzogcmVzcG9uc2Uub2JqZWN0SWRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHJlc3BvbnNlLnByb3BlcnRpZXMgJiYgcmVzcG9uc2UucHJvcGVydGllcy5WYWx1ZXMpIHtcbiAgICAgIGdlb0pTT04ucGl4ZWwucHJvcGVydGllcy52YWx1ZXMgPSByZXNwb25zZS5wcm9wZXJ0aWVzLlZhbHVlcztcbiAgICB9XG5cbiAgICBpZiAoY2F0YWxvZ0l0ZW1zICYmIGNhdGFsb2dJdGVtcy5mZWF0dXJlcykge1xuICAgICAgZ2VvSlNPTi5jYXRhbG9nSXRlbXMgPSByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24oY2F0YWxvZ0l0ZW1zKTtcbiAgICAgIGlmIChjYXRhbG9nSXRlbVZpc2liaWxpdGllcyAmJiBjYXRhbG9nSXRlbVZpc2liaWxpdGllcy5sZW5ndGggPT09IGdlb0pTT04uY2F0YWxvZ0l0ZW1zLmZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKHZhciBpID0gY2F0YWxvZ0l0ZW1WaXNpYmlsaXRpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBnZW9KU09OLmNhdGFsb2dJdGVtcy5mZWF0dXJlc1tpXS5wcm9wZXJ0aWVzLmNhdGFsb2dJdGVtVmlzaWJpbGl0eSA9IGNhdGFsb2dJdGVtVmlzaWJpbGl0aWVzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBnZW9KU09OO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpZnlJbWFnZSAocGFyYW1zKSB7XG4gIHJldHVybiBuZXcgSWRlbnRpZnlJbWFnZShwYXJhbXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpZGVudGlmeUltYWdlO1xuIiwiaW1wb3J0IHsgVXRpbCwgRXZlbnRlZCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHtjb3JzfSBmcm9tICcuLi9TdXBwb3J0JztcbmltcG9ydCB7Y2xlYW5Vcmx9IGZyb20gJy4uL1V0aWwnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vUmVxdWVzdCc7XG5cbmV4cG9ydCB2YXIgU2VydmljZSA9IEV2ZW50ZWQuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgcHJveHk6IGZhbHNlLFxuICAgIHVzZUNvcnM6IGNvcnMsXG4gICAgdGltZW91dDogMFxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5fcmVxdWVzdFF1ZXVlID0gW107XG4gICAgdGhpcy5fYXV0aGVudGljYXRpbmcgPSBmYWxzZTtcbiAgICBVdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zLnVybCA9IGNsZWFuVXJsKHRoaXMub3B0aW9ucy51cmwpO1xuICB9LFxuXG4gIGdldDogZnVuY3Rpb24gKHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnZ2V0JywgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH0sXG5cbiAgcG9zdDogZnVuY3Rpb24gKHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgncG9zdCcsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9LFxuXG4gIHJlcXVlc3Q6IGZ1bmN0aW9uIChwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ3JlcXVlc3QnLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfSxcblxuICBtZXRhZGF0YTogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ2dldCcsICcnLCB7fSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9LFxuXG4gIGF1dGhlbnRpY2F0ZTogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdGhpcy5fYXV0aGVudGljYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLm9wdGlvbnMudG9rZW4gPSB0b2tlbjtcbiAgICB0aGlzLl9ydW5RdWV1ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFRpbWVvdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpbWVvdXQ7XG4gIH0sXG5cbiAgc2V0VGltZW91dDogZnVuY3Rpb24gKHRpbWVvdXQpIHtcbiAgICB0aGlzLm9wdGlvbnMudGltZW91dCA9IHRpbWVvdXQ7XG4gIH0sXG5cbiAgX3JlcXVlc3Q6IGZ1bmN0aW9uIChtZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLmZpcmUoJ3JlcXVlc3RzdGFydCcsIHtcbiAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgfSwgdHJ1ZSk7XG5cbiAgICB2YXIgd3JhcHBlZENhbGxiYWNrID0gdGhpcy5fY3JlYXRlU2VydmljZUNhbGxiYWNrKG1ldGhvZCwgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRva2VuKSB7XG4gICAgICBwYXJhbXMudG9rZW4gPSB0aGlzLm9wdGlvbnMudG9rZW47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2F1dGhlbnRpY2F0aW5nKSB7XG4gICAgICB0aGlzLl9yZXF1ZXN0UXVldWUucHVzaChbbWV0aG9kLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0XSk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cmwgPSAodGhpcy5vcHRpb25zLnByb3h5KSA/IHRoaXMub3B0aW9ucy5wcm94eSArICc/JyArIHRoaXMub3B0aW9ucy51cmwgKyBwYXRoIDogdGhpcy5vcHRpb25zLnVybCArIHBhdGg7XG5cbiAgICAgIGlmICgobWV0aG9kID09PSAnZ2V0JyB8fCBtZXRob2QgPT09ICdyZXF1ZXN0JykgJiYgIXRoaXMub3B0aW9ucy51c2VDb3JzKSB7XG4gICAgICAgIHJldHVybiBSZXF1ZXN0LmdldC5KU09OUCh1cmwsIHBhcmFtcywgd3JhcHBlZENhbGxiYWNrLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBSZXF1ZXN0W21ldGhvZF0odXJsLCBwYXJhbXMsIHdyYXBwZWRDYWxsYmFjaywgY29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9jcmVhdGVTZXJ2aWNlQ2FsbGJhY2s6IGZ1bmN0aW9uIChtZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChlcnJvciAmJiAoZXJyb3IuY29kZSA9PT0gNDk5IHx8IGVycm9yLmNvZGUgPT09IDQ5OCkpIHtcbiAgICAgICAgdGhpcy5fYXV0aGVudGljYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX3JlcXVlc3RRdWV1ZS5wdXNoKFttZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHRdKTtcblxuICAgICAgICAvLyBmaXJlIGFuIGV2ZW50IGZvciB1c2VycyB0byBoYW5kbGUgYW5kIHJlLWF1dGhlbnRpY2F0ZVxuICAgICAgICB0aGlzLmZpcmUoJ2F1dGhlbnRpY2F0aW9ucmVxdWlyZWQnLCB7XG4gICAgICAgICAgYXV0aGVudGljYXRlOiBVdGlsLmJpbmQodGhpcy5hdXRoZW50aWNhdGUsIHRoaXMpXG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIC8vIGlmIHRoZSB1c2VyIGhhcyBhY2Nlc3MgdG8gYSBjYWxsYmFjayB0aGV5IGNhbiBoYW5kbGUgdGhlIGF1dGggZXJyb3JcbiAgICAgICAgZXJyb3IuYXV0aGVudGljYXRlID0gVXRpbC5iaW5kKHRoaXMuYXV0aGVudGljYXRlLCB0aGlzKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5maXJlKCdyZXF1ZXN0ZXJyb3InLCB7XG4gICAgICAgICAgdXJsOiB0aGlzLm9wdGlvbnMudXJsICsgcGF0aCxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuICAgICAgICAgIGNvZGU6IGVycm9yLmNvZGUsXG4gICAgICAgICAgbWV0aG9kOiBtZXRob2RcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpcmUoJ3JlcXVlc3RzdWNjZXNzJywge1xuICAgICAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLFxuICAgICAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmUoJ3JlcXVlc3RlbmQnLCB7XG4gICAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZFxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX3J1blF1ZXVlOiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgaSA9IHRoaXMuX3JlcXVlc3RRdWV1ZS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIHJlcXVlc3QgPSB0aGlzLl9yZXF1ZXN0UXVldWVbaV07XG4gICAgICB2YXIgbWV0aG9kID0gcmVxdWVzdC5zaGlmdCgpO1xuICAgICAgdGhpc1ttZXRob2RdLmFwcGx5KHRoaXMsIHJlcXVlc3QpO1xuICAgIH1cbiAgICB0aGlzLl9yZXF1ZXN0UXVldWUgPSBbXTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VydmljZTtcbiIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuL1NlcnZpY2UnO1xuaW1wb3J0IGlkZW50aWZ5RmVhdHVyZXMgZnJvbSAnLi4vVGFza3MvSWRlbnRpZnlGZWF0dXJlcyc7XG5pbXBvcnQgcXVlcnkgZnJvbSAnLi4vVGFza3MvUXVlcnknO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi4vVGFza3MvRmluZCc7XG5cbmV4cG9ydCB2YXIgTWFwU2VydmljZSA9IFNlcnZpY2UuZXh0ZW5kKHtcblxuICBpZGVudGlmeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBpZGVudGlmeUZlYXR1cmVzKHRoaXMpO1xuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmluZCh0aGlzKTtcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBxdWVyeSh0aGlzKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFNlcnZpY2UgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBNYXBTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBTZXJ2aWNlO1xuIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4vU2VydmljZSc7XG5pbXBvcnQgaWRlbnRpZnlJbWFnZSBmcm9tICcuLi9UYXNrcy9JZGVudGlmeUltYWdlJztcbmltcG9ydCBxdWVyeSBmcm9tICcuLi9UYXNrcy9RdWVyeSc7XG5cbmV4cG9ydCB2YXIgSW1hZ2VTZXJ2aWNlID0gU2VydmljZS5leHRlbmQoe1xuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHF1ZXJ5KHRoaXMpO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGlkZW50aWZ5SW1hZ2UodGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VTZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSW1hZ2VTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbWFnZVNlcnZpY2U7XG4iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi9TZXJ2aWNlJztcbmltcG9ydCBxdWVyeSBmcm9tICcuLi9UYXNrcy9RdWVyeSc7XG5pbXBvcnQgeyBnZW9qc29uVG9BcmNHSVMgfSBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBGZWF0dXJlTGF5ZXJTZXJ2aWNlID0gU2VydmljZS5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBpZEF0dHJpYnV0ZTogJ09CSkVDVElEJ1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHF1ZXJ5KHRoaXMpO1xuICB9LFxuXG4gIGFkZEZlYXR1cmU6IGZ1bmN0aW9uIChmZWF0dXJlLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGRlbGV0ZSBmZWF0dXJlLmlkO1xuXG4gICAgZmVhdHVyZSA9IGdlb2pzb25Ub0FyY0dJUyhmZWF0dXJlKTtcblxuICAgIHJldHVybiB0aGlzLnBvc3QoJ2FkZEZlYXR1cmVzJywge1xuICAgICAgZmVhdHVyZXM6IFtmZWF0dXJlXVxuICAgIH0sIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuYWRkUmVzdWx0cykgPyByZXNwb25zZS5hZGRSZXN1bHRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuYWRkUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICB1cGRhdGVGZWF0dXJlOiBmdW5jdGlvbiAoZmVhdHVyZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBmZWF0dXJlID0gZ2VvanNvblRvQXJjR0lTKGZlYXR1cmUsIHRoaXMub3B0aW9ucy5pZEF0dHJpYnV0ZSk7XG5cbiAgICByZXR1cm4gdGhpcy5wb3N0KCd1cGRhdGVGZWF0dXJlcycsIHtcbiAgICAgIGZlYXR1cmVzOiBbZmVhdHVyZV1cbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gKHJlc3BvbnNlICYmIHJlc3BvbnNlLnVwZGF0ZVJlc3VsdHMpID8gcmVzcG9uc2UudXBkYXRlUmVzdWx0c1swXSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yIHx8IHJlc3BvbnNlLnVwZGF0ZVJlc3VsdHNbMF0uZXJyb3IsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgZGVsZXRlRmVhdHVyZTogZnVuY3Rpb24gKGlkLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnBvc3QoJ2RlbGV0ZUZlYXR1cmVzJywge1xuICAgICAgb2JqZWN0SWRzOiBpZFxuICAgIH0sIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGVsZXRlUmVzdWx0cykgPyByZXNwb25zZS5kZWxldGVSZXN1bHRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuZGVsZXRlUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICBkZWxldGVGZWF0dXJlczogZnVuY3Rpb24gKGlkcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5wb3N0KCdkZWxldGVGZWF0dXJlcycsIHtcbiAgICAgIG9iamVjdElkczogaWRzXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgLy8gcGFzcyBiYWNrIHRoZSBlbnRpcmUgYXJyYXlcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGVsZXRlUmVzdWx0cykgPyByZXNwb25zZS5kZWxldGVSZXN1bHRzIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuZGVsZXRlUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlTGF5ZXJTZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRmVhdHVyZUxheWVyU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmVhdHVyZUxheWVyU2VydmljZTtcbiIsImltcG9ydCB7IFRpbGVMYXllciwgVXRpbCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgcG9pbnRlckV2ZW50cyB9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHtcbiAgc2V0RXNyaUF0dHJpYnV0aW9uLFxuICBfZ2V0QXR0cmlidXRpb25EYXRhLFxuICBfdXBkYXRlTWFwQXR0cmlidXRpb25cbn0gZnJvbSAnLi4vVXRpbCc7XG5cbnZhciB0aWxlUHJvdG9jb2wgPSAod2luZG93LmxvY2F0aW9uLnByb3RvY29sICE9PSAnaHR0cHM6JykgPyAnaHR0cDonIDogJ2h0dHBzOic7XG5cbmV4cG9ydCB2YXIgQmFzZW1hcExheWVyID0gVGlsZUxheWVyLmV4dGVuZCh7XG4gIHN0YXRpY3M6IHtcbiAgICBUSUxFUzoge1xuICAgICAgU3RyZWV0czoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfU3RyZWV0X01hcC9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE5LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdVU0dTLCBOT0FBJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvblVybDogJ2h0dHBzOi8vc3RhdGljLmFyY2dpcy5jb20vYXR0cmlidXRpb24vV29ybGRfU3RyZWV0X01hcCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFRvcG9ncmFwaGljOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Xb3JsZF9Ub3BvX01hcC9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE5LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdVU0dTLCBOT0FBJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvblVybDogJ2h0dHBzOi8vc3RhdGljLmFyY2dpcy5jb20vYXR0cmlidXRpb24vV29ybGRfVG9wb19NYXAnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBPY2VhbnM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL2FyY2dpcy9yZXN0L3NlcnZpY2VzL09jZWFuL1dvcmxkX09jZWFuX0Jhc2UvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnVVNHUywgTk9BQScsXG4gICAgICAgICAgYXR0cmlidXRpb25Vcmw6ICdodHRwczovL3N0YXRpYy5hcmNnaXMuY29tL2F0dHJpYnV0aW9uL09jZWFuX0Jhc2VtYXAnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBPY2VhbnNMYWJlbHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL2FyY2dpcy9yZXN0L3NlcnZpY2VzL09jZWFuL1dvcmxkX09jZWFuX1JlZmVyZW5jZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgcGFuZTogKHBvaW50ZXJFdmVudHMpID8gJ2VzcmktbGFiZWxzJyA6ICd0aWxlUGFuZSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIE5hdGlvbmFsR2VvZ3JhcGhpYzoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvTmF0R2VvX1dvcmxkX01hcC9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdOYXRpb25hbCBHZW9ncmFwaGljLCBEZUxvcm1lLCBIRVJFLCBVTkVQLVdDTUMsIFVTR1MsIE5BU0EsIEVTQSwgTUVUSSwgTlJDQU4sIEdFQkNPLCBOT0FBLCBpbmNyZW1lbnQgUCBDb3JwLidcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIERhcmtHcmF5OiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9DYW52YXMvV29ybGRfRGFya19HcmF5X0Jhc2UvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSEVSRSwgRGVMb3JtZSwgTWFwbXlJbmRpYSwgJmNvcHk7IE9wZW5TdHJlZXRNYXAgY29udHJpYnV0b3JzJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgRGFya0dyYXlMYWJlbHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0NhbnZhcy9Xb3JsZF9EYXJrX0dyYXlfUmVmZXJlbmNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJydcblxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgR3JheToge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvQ2FudmFzL1dvcmxkX0xpZ2h0X0dyYXlfQmFzZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdIRVJFLCBEZUxvcm1lLCBNYXBteUluZGlhLCAmY29weTsgT3BlblN0cmVldE1hcCBjb250cmlidXRvcnMnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBHcmF5TGFiZWxzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9DYW52YXMvV29ybGRfTGlnaHRfR3JheV9SZWZlcmVuY2UvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgSW1hZ2VyeToge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfSW1hZ2VyeS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE5LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdEaWdpdGFsR2xvYmUsIEdlb0V5ZSwgaS1jdWJlZCwgVVNEQSwgVVNHUywgQUVYLCBHZXRtYXBwaW5nLCBBZXJvZ3JpZCwgSUdOLCBJR1AsIHN3aXNzdG9wbywgYW5kIHRoZSBHSVMgVXNlciBDb21tdW5pdHknXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBJbWFnZXJ5TGFiZWxzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9SZWZlcmVuY2UvV29ybGRfQm91bmRhcmllc19hbmRfUGxhY2VzL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTksXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIEltYWdlcnlUcmFuc3BvcnRhdGlvbjoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvUmVmZXJlbmNlL1dvcmxkX1RyYW5zcG9ydGF0aW9uL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTksXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgU2hhZGVkUmVsaWVmOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Xb3JsZF9TaGFkZWRfUmVsaWVmL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTMsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBTaGFkZWRSZWxpZWZMYWJlbHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1JlZmVyZW5jZS9Xb3JsZF9Cb3VuZGFyaWVzX2FuZF9QbGFjZXNfQWx0ZXJuYXRlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTIsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFRlcnJhaW46IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX1RlcnJhaW5fQmFzZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDEzLFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdVU0dTLCBOT0FBJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgVGVycmFpbkxhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvUmVmZXJlbmNlL1dvcmxkX1JlZmVyZW5jZV9PdmVybGF5L01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTMsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFVTQVRvcG86IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1VTQV9Ub3BvX01hcHMvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnVVNHUywgTmF0aW9uYWwgR2VvZ3JhcGhpYyBTb2NpZXR5LCBpLWN1YmVkJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChrZXksIG9wdGlvbnMpIHtcbiAgICB2YXIgY29uZmlnO1xuXG4gICAgLy8gc2V0IHRoZSBjb25maWcgdmFyaWFibGUgd2l0aCB0aGUgYXBwcm9wcmlhdGUgY29uZmlnIG9iamVjdFxuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0JyAmJiBrZXkudXJsVGVtcGxhdGUgJiYga2V5Lm9wdGlvbnMpIHtcbiAgICAgIGNvbmZpZyA9IGtleTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnICYmIEJhc2VtYXBMYXllci5USUxFU1trZXldKSB7XG4gICAgICBjb25maWcgPSBCYXNlbWFwTGF5ZXIuVElMRVNba2V5XTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMLmVzcmkuQmFzZW1hcExheWVyOiBJbnZhbGlkIHBhcmFtZXRlci4gVXNlIG9uZSBvZiBcIlN0cmVldHNcIiwgXCJUb3BvZ3JhcGhpY1wiLCBcIk9jZWFuc1wiLCBcIk9jZWFuc0xhYmVsc1wiLCBcIk5hdGlvbmFsR2VvZ3JhcGhpY1wiLCBcIkdyYXlcIiwgXCJHcmF5TGFiZWxzXCIsIFwiRGFya0dyYXlcIiwgXCJEYXJrR3JheUxhYmVsc1wiLCBcIkltYWdlcnlcIiwgXCJJbWFnZXJ5TGFiZWxzXCIsIFwiSW1hZ2VyeVRyYW5zcG9ydGF0aW9uXCIsIFwiU2hhZGVkUmVsaWVmXCIsIFwiU2hhZGVkUmVsaWVmTGFiZWxzXCIsIFwiVGVycmFpblwiLCBcIlRlcnJhaW5MYWJlbHNcIiBvciBcIlVTQVRvcG9cIicpO1xuICAgIH1cblxuICAgIC8vIG1lcmdlIHBhc3NlZCBvcHRpb25zIGludG8gdGhlIGNvbmZpZyBvcHRpb25zXG4gICAgdmFyIHRpbGVPcHRpb25zID0gVXRpbC5leHRlbmQoY29uZmlnLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgVXRpbC5zZXRPcHRpb25zKHRoaXMsIHRpbGVPcHRpb25zKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIGNvbmZpZy51cmxUZW1wbGF0ZSArPSAoJz90b2tlbj0nICsgdGhpcy5vcHRpb25zLnRva2VuKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsIHRoZSBpbml0aWFsaXplIG1ldGhvZCBvbiBMLlRpbGVMYXllciB0byBzZXQgZXZlcnl0aGluZyB1cFxuICAgIFRpbGVMYXllci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIGNvbmZpZy51cmxUZW1wbGF0ZSwgdGlsZU9wdGlvbnMpO1xuICB9LFxuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgLy8gaW5jbHVkZSAnUG93ZXJlZCBieSBFc3JpJyBpbiBtYXAgYXR0cmlidXRpb25cbiAgICBzZXRFc3JpQXR0cmlidXRpb24obWFwKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucGFuZSA9PT0gJ2VzcmktbGFiZWxzJykge1xuICAgICAgdGhpcy5faW5pdFBhbmUoKTtcbiAgICB9XG4gICAgLy8gc29tZSBiYXNlbWFwcyBjYW4gc3VwcGx5IGR5bmFtaWMgYXR0cmlidXRpb25cbiAgICBpZiAodGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uVXJsKSB7XG4gICAgICBfZ2V0QXR0cmlidXRpb25EYXRhKHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvblVybCwgbWFwKTtcbiAgICB9XG5cbiAgICBtYXAub24oJ21vdmVlbmQnLCBfdXBkYXRlTWFwQXR0cmlidXRpb24pO1xuXG4gICAgVGlsZUxheWVyLnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBtYXAub2ZmKCdtb3ZlZW5kJywgX3VwZGF0ZU1hcEF0dHJpYnV0aW9uKTtcbiAgICBUaWxlTGF5ZXIucHJvdG90eXBlLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcbiAgfSxcblxuICBfaW5pdFBhbmU6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX21hcC5nZXRQYW5lKHRoaXMub3B0aW9ucy5wYW5lKSkge1xuICAgICAgdmFyIHBhbmUgPSB0aGlzLl9tYXAuY3JlYXRlUGFuZSh0aGlzLm9wdGlvbnMucGFuZSk7XG4gICAgICBwYW5lLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICBwYW5lLnN0eWxlLnpJbmRleCA9IDUwMDtcbiAgICB9XG4gIH0sXG5cbiAgZ2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uKSB7XG4gICAgICB2YXIgYXR0cmlidXRpb24gPSAnPHNwYW4gY2xhc3M9XCJlc3JpLWR5bmFtaWMtYXR0cmlidXRpb25cIj4nICsgdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uICsgJzwvc3Bhbj4nO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cmlidXRpb247XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gYmFzZW1hcExheWVyIChrZXksIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBCYXNlbWFwTGF5ZXIoa2V5LCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZW1hcExheWVyO1xuIiwiaW1wb3J0IHsgVGlsZUxheWVyLCBVdGlsIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyB3YXJuLCBjbGVhblVybCwgc2V0RXNyaUF0dHJpYnV0aW9uIH0gZnJvbSAnLi4vVXRpbCc7XG5pbXBvcnQgbWFwU2VydmljZSBmcm9tICcuLi9TZXJ2aWNlcy9NYXBTZXJ2aWNlJztcblxuZXhwb3J0IHZhciBUaWxlZE1hcExheWVyID0gVGlsZUxheWVyLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICB6b29tT2Zmc2V0QWxsb3dhbmNlOiAwLjEsXG4gICAgZXJyb3JUaWxlVXJsOiAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFRQUFBQUVBQkFNQUFBQ3VYTFZWQUFBQUExQk1WRVV6TkRWc3psSEhBQUFBQVhSU1RsTUFRT2JZWmdBQUFBbHdTRmx6QUFBQUFBQUFBQUFCNm1VV3BBQUFBRFpKUkVGVWVKenR3UUVCQUFBQWdpRC9yMjVJUUFFQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUE3d2FCQUFBQncwOFJ3QUFBQUFCSlJVNUVya0pnZ2c9PSdcbiAgfSxcblxuICBzdGF0aWNzOiB7XG4gICAgTWVyY2F0b3Jab29tTGV2ZWxzOiB7XG4gICAgICAnMCc6IDE1NjU0My4wMzM5Mjc5OTk5OSxcbiAgICAgICcxJzogNzgyNzEuNTE2OTYzOTk5ODkzLFxuICAgICAgJzInOiAzOTEzNS43NTg0ODIwMDAwOTksXG4gICAgICAnMyc6IDE5NTY3Ljg3OTI0MDk5OTkwMSxcbiAgICAgICc0JzogOTc4My45Mzk2MjA0OTk5NTkzLFxuICAgICAgJzUnOiA0ODkxLjk2OTgxMDI0OTk3OTcsXG4gICAgICAnNic6IDI0NDUuOTg0OTA1MTI0OTg5OCxcbiAgICAgICc3JzogMTIyMi45OTI0NTI1NjI0ODk5LFxuICAgICAgJzgnOiA2MTEuNDk2MjI2MjgxMzgwMDIsXG4gICAgICAnOSc6IDMwNS43NDgxMTMxNDA1NTgwMixcbiAgICAgICcxMCc6IDE1Mi44NzQwNTY1NzA0MTEsXG4gICAgICAnMTEnOiA3Ni40MzcwMjgyODUwNzMxOTcsXG4gICAgICAnMTInOiAzOC4yMTg1MTQxNDI1MzY1OTgsXG4gICAgICAnMTMnOiAxOS4xMDkyNTcwNzEyNjgyOTksXG4gICAgICAnMTQnOiA5LjU1NDYyODUzNTYzNDE0OTYsXG4gICAgICAnMTUnOiA0Ljc3NzMxNDI2Nzk0OTM2OTksXG4gICAgICAnMTYnOiAyLjM4ODY1NzEzMzk3NDY4LFxuICAgICAgJzE3JzogMS4xOTQzMjg1NjY4NTUwNTAxLFxuICAgICAgJzE4JzogMC41OTcxNjQyODM1NTk4MTY5OSxcbiAgICAgICcxOSc6IDAuMjk4NTgyMTQxNjQ3NjE2OTgsXG4gICAgICAnMjAnOiAwLjE0OTI5MTA3MDgyMzgxLFxuICAgICAgJzIxJzogMC4wNzQ2NDU1MzU0MTE5MSxcbiAgICAgICcyMic6IDAuMDM3MzIyNzY3NzA1OTUyNSxcbiAgICAgICcyMyc6IDAuMDE4NjYxMzgzODUyOTc2M1xuICAgIH1cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMudXJsID0gY2xlYW5Vcmwob3B0aW9ucy51cmwpO1xuICAgIG9wdGlvbnMgPSBVdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG5cbiAgICAvLyBzZXQgdGhlIHVybHNcbiAgICB0aGlzLnRpbGVVcmwgPSBvcHRpb25zLnVybCArICd0aWxlL3t6fS97eX0ve3h9JztcbiAgICB0aGlzLnNlcnZpY2UgPSBtYXBTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2VydmljZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgIHZhciBhcmNnaXNvbmxpbmUgPSBuZXcgUmVnRXhwKC90aWxlcy5hcmNnaXMob25saW5lKT9cXC5jb20vZyk7XG4gICAgaWYgKGFyY2dpc29ubGluZS50ZXN0KG9wdGlvbnMudXJsKSkge1xuICAgICAgdGhpcy50aWxlVXJsID0gdGhpcy50aWxlVXJsLnJlcGxhY2UoJzovL3RpbGVzJywgJzovL3RpbGVze3N9Jyk7XG4gICAgICBvcHRpb25zLnN1YmRvbWFpbnMgPSBbJzEnLCAnMicsICczJywgJzQnXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRva2VuKSB7XG4gICAgICB0aGlzLnRpbGVVcmwgKz0gKCc/dG9rZW49JyArIHRoaXMub3B0aW9ucy50b2tlbik7XG4gICAgfVxuXG4gICAgLy8gaW5pdCBsYXllciBieSBjYWxsaW5nIFRpbGVMYXllcnMgaW5pdGlhbGl6ZSBtZXRob2RcbiAgICBUaWxlTGF5ZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCB0aGlzLnRpbGVVcmwsIG9wdGlvbnMpO1xuICB9LFxuXG4gIGdldFRpbGVVcmw6IGZ1bmN0aW9uICh0aWxlUG9pbnQpIHtcbiAgICB2YXIgem9vbSA9IHRoaXMuX2dldFpvb21Gb3JVcmwoKTtcblxuICAgIHJldHVybiBVdGlsLnRlbXBsYXRlKHRoaXMudGlsZVVybCwgVXRpbC5leHRlbmQoe1xuICAgICAgczogdGhpcy5fZ2V0U3ViZG9tYWluKHRpbGVQb2ludCksXG4gICAgICB4OiB0aWxlUG9pbnQueCxcbiAgICAgIHk6IHRpbGVQb2ludC55LFxuICAgICAgLy8gdHJ5IGxvZCBtYXAgZmlyc3QsIHRoZW4ganVzdCBkZWZhdWx0IHRvIHpvb20gbGV2ZWxcbiAgICAgIHo6ICh0aGlzLl9sb2RNYXAgJiYgdGhpcy5fbG9kTWFwW3pvb21dKSA/IHRoaXMuX2xvZE1hcFt6b29tXSA6IHpvb21cbiAgICB9LCB0aGlzLm9wdGlvbnMpKTtcbiAgfSxcblxuICBjcmVhdGVUaWxlOiBmdW5jdGlvbiAoY29vcmRzLCBkb25lKSB7XG4gICAgdmFyIHRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgIEwuRG9tRXZlbnQub24odGlsZSwgJ2xvYWQnLCBMLmJpbmQodGhpcy5fdGlsZU9uTG9hZCwgdGhpcywgZG9uZSwgdGlsZSkpO1xuICAgIEwuRG9tRXZlbnQub24odGlsZSwgJ2Vycm9yJywgTC5iaW5kKHRoaXMuX3RpbGVPbkVycm9yLCB0aGlzLCBkb25lLCB0aWxlKSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNyb3NzT3JpZ2luKSB7XG4gICAgICB0aWxlLmNyb3NzT3JpZ2luID0gJyc7XG4gICAgfVxuXG4gICAgLypcbiAgICAgQWx0IHRhZyBpcyBzZXQgdG8gZW1wdHkgc3RyaW5nIHRvIGtlZXAgc2NyZWVuIHJlYWRlcnMgZnJvbSByZWFkaW5nIFVSTCBhbmQgZm9yIGNvbXBsaWFuY2UgcmVhc29uc1xuICAgICBodHRwOi8vd3d3LnczLm9yZy9UUi9XQ0FHMjAtVEVDSFMvSDY3XG4gICAgKi9cbiAgICB0aWxlLmFsdCA9ICcnO1xuXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gbG9kIG1hcCBvciBhbiBsb2QgbWFwIHdpdGggYSBwcm9wZXIgem9vbSBsb2FkIHRoZSB0aWxlXG4gICAgLy8gb3RoZXJ3aXNlIHdhaXQgZm9yIHRoZSBsb2QgbWFwIHRvIGJlY29tZSBhdmFpbGFibGVcbiAgICBpZiAoIXRoaXMuX2xvZE1hcCB8fCAodGhpcy5fbG9kTWFwICYmIHRoaXMuX2xvZE1hcFt0aGlzLl9nZXRab29tRm9yVXJsKCldKSkge1xuICAgICAgdGlsZS5zcmMgPSB0aGlzLmdldFRpbGVVcmwoY29vcmRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbmNlKCdsb2RtYXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRpbGUuc3JjID0gdGhpcy5nZXRUaWxlVXJsKGNvb3Jkcyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGlsZTtcbiAgfSxcblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIC8vIGluY2x1ZGUgJ1Bvd2VyZWQgYnkgRXNyaScgaW4gbWFwIGF0dHJpYnV0aW9uXG4gICAgc2V0RXNyaUF0dHJpYnV0aW9uKG1hcCk7XG5cbiAgICBpZiAoIXRoaXMuX2xvZE1hcCkge1xuICAgICAgdGhpcy5tZXRhZGF0YShmdW5jdGlvbiAoZXJyb3IsIG1ldGFkYXRhKSB7XG4gICAgICAgIGlmICghZXJyb3IgJiYgbWV0YWRhdGEuc3BhdGlhbFJlZmVyZW5jZSkge1xuICAgICAgICAgIHZhciBzciA9IG1ldGFkYXRhLnNwYXRpYWxSZWZlcmVuY2UubGF0ZXN0V2tpZCB8fCBtZXRhZGF0YS5zcGF0aWFsUmVmZXJlbmNlLndraWQ7XG4gICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gJiYgbWFwLmF0dHJpYnV0aW9uQ29udHJvbCAmJiBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gPSBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0O1xuICAgICAgICAgICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5hZGRBdHRyaWJ1dGlvbih0aGlzLmdldEF0dHJpYnV0aW9uKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWFwLm9wdGlvbnMuY3JzID09PSBMLkNSUy5FUFNHMzg1NyAmJiBzciA9PT0gMTAyMTAwIHx8IHNyID09PSAzODU3KSB7XG4gICAgICAgICAgICB0aGlzLl9sb2RNYXAgPSB7fTtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgem9vbSBsZXZlbCBkYXRhXG4gICAgICAgICAgICB2YXIgYXJjZ2lzTE9EcyA9IG1ldGFkYXRhLnRpbGVJbmZvLmxvZHM7XG4gICAgICAgICAgICB2YXIgY29ycmVjdFJlc29sdXRpb25zID0gVGlsZWRNYXBMYXllci5NZXJjYXRvclpvb21MZXZlbHM7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJjZ2lzTE9Ecy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgYXJjZ2lzTE9EID0gYXJjZ2lzTE9Ec1tpXTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgY2kgaW4gY29ycmVjdFJlc29sdXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvcnJlY3RSZXMgPSBjb3JyZWN0UmVzb2x1dGlvbnNbY2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3dpdGhpblBlcmNlbnRhZ2UoYXJjZ2lzTE9ELnJlc29sdXRpb24sIGNvcnJlY3RSZXMsIHRoaXMub3B0aW9ucy56b29tT2Zmc2V0QWxsb3dhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5fbG9kTWFwW2NpXSA9IGFyY2dpc0xPRC5sZXZlbDtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmZpcmUoJ2xvZG1hcCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXByb2o0KSB7XG4gICAgICAgICAgICAgIHdhcm4oJ0wuZXNyaS5UaWxlZE1hcExheWVyIGlzIHVzaW5nIGEgbm9uLW1lcmNhdG9yIHNwYXRpYWwgcmVmZXJlbmNlLiBTdXBwb3J0IG1heSBiZSBhdmFpbGFibGUgdGhyb3VnaCBQcm9qNExlYWZsZXQgaHR0cDovL2VzcmkuZ2l0aHViLmlvL2VzcmktbGVhZmxldC9leGFtcGxlcy9ub24tbWVyY2F0b3ItcHJvamVjdGlvbi5odG1sJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBUaWxlTGF5ZXIucHJvdG90eXBlLm9uQWRkLmNhbGwodGhpcywgbWFwKTtcbiAgfSxcblxuICBtZXRhZGF0YTogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5zZXJ2aWNlLm1ldGFkYXRhKGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBpZGVudGlmeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaWRlbnRpZnkoKTtcbiAgfSxcblxuICBmaW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5maW5kKCk7XG4gIH0sXG5cbiAgcXVlcnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLnF1ZXJ5KCk7XG4gIH0sXG5cbiAgYXV0aGVudGljYXRlOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB2YXIgdG9rZW5RcyA9ICc/dG9rZW49JyArIHRva2VuO1xuICAgIHRoaXMudGlsZVVybCA9ICh0aGlzLm9wdGlvbnMudG9rZW4pID8gdGhpcy50aWxlVXJsLnJlcGxhY2UoL1xcP3Rva2VuPSguKykvZywgdG9rZW5RcykgOiB0aGlzLnRpbGVVcmwgKyB0b2tlblFzO1xuICAgIHRoaXMub3B0aW9ucy50b2tlbiA9IHRva2VuO1xuICAgIHRoaXMuc2VydmljZS5hdXRoZW50aWNhdGUodG9rZW4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIF93aXRoaW5QZXJjZW50YWdlOiBmdW5jdGlvbiAoYSwgYiwgcGVyY2VudGFnZSkge1xuICAgIHZhciBkaWZmID0gTWF0aC5hYnMoKGEgLyBiKSAtIDEpO1xuICAgIHJldHVybiBkaWZmIDwgcGVyY2VudGFnZTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWxlZE1hcExheWVyICh1cmwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBUaWxlZE1hcExheWVyKHVybCwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRpbGVkTWFwTGF5ZXI7XG4iLCJpbXBvcnQgeyBJbWFnZU92ZXJsYXksIENSUywgRG9tVXRpbCwgVXRpbCwgTGF5ZXIsIHBvcHVwLCBsYXRMbmcsIGJvdW5kcyB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgY29ycyB9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHsgc2V0RXNyaUF0dHJpYnV0aW9uIH0gZnJvbSAnLi4vVXRpbCc7XG5cbnZhciBPdmVybGF5ID0gSW1hZ2VPdmVybGF5LmV4dGVuZCh7XG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgdGhpcy5fdG9wTGVmdCA9IG1hcC5nZXRQaXhlbEJvdW5kcygpLm1pbjtcbiAgICBJbWFnZU92ZXJsYXkucHJvdG90eXBlLm9uQWRkLmNhbGwodGhpcywgbWFwKTtcbiAgfSxcbiAgX3Jlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX21hcC5vcHRpb25zLmNycyA9PT0gQ1JTLkVQU0czODU3KSB7XG4gICAgICBJbWFnZU92ZXJsYXkucHJvdG90eXBlLl9yZXNldC5jYWxsKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBEb21VdGlsLnNldFBvc2l0aW9uKHRoaXMuX2ltYWdlLCB0aGlzLl90b3BMZWZ0LnN1YnRyYWN0KHRoaXMuX21hcC5nZXRQaXhlbE9yaWdpbigpKSk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IHZhciBSYXN0ZXJMYXllciA9IExheWVyLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBvcGFjaXR5OiAxLFxuICAgIHBvc2l0aW9uOiAnZnJvbnQnLFxuICAgIGY6ICdpbWFnZScsXG4gICAgdXNlQ29yczogY29ycyxcbiAgICBhdHRyaWJ1dGlvbjogbnVsbCxcbiAgICBpbnRlcmFjdGl2ZTogZmFsc2UsXG4gICAgYWx0OiAnJ1xuICB9LFxuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgLy8gaW5jbHVkZSAnUG93ZXJlZCBieSBFc3JpJyBpbiBtYXAgYXR0cmlidXRpb25cbiAgICBzZXRFc3JpQXR0cmlidXRpb24obWFwKTtcblxuICAgIHRoaXMuX3VwZGF0ZSA9IFV0aWwudGhyb3R0bGUodGhpcy5fdXBkYXRlLCB0aGlzLm9wdGlvbnMudXBkYXRlSW50ZXJ2YWwsIHRoaXMpO1xuXG4gICAgbWFwLm9uKCdtb3ZlZW5kJywgdGhpcy5fdXBkYXRlLCB0aGlzKTtcblxuICAgIC8vIGlmIHdlIGhhZCBhbiBpbWFnZSBsb2FkZWQgYW5kIGl0IG1hdGNoZXMgdGhlXG4gICAgLy8gY3VycmVudCBib3VuZHMgc2hvdyB0aGUgaW1hZ2Ugb3RoZXJ3aXNlIHJlbW92ZSBpdFxuICAgIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UgJiYgdGhpcy5fY3VycmVudEltYWdlLl9ib3VuZHMuZXF1YWxzKHRoaXMuX21hcC5nZXRCb3VuZHMoKSkpIHtcbiAgICAgIG1hcC5hZGRMYXllcih0aGlzLl9jdXJyZW50SW1hZ2UpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudEltYWdlKSB7XG4gICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5fY3VycmVudEltYWdlKTtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZSA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlKCk7XG5cbiAgICBpZiAodGhpcy5fcG9wdXApIHtcbiAgICAgIHRoaXMuX21hcC5vbignY2xpY2snLCB0aGlzLl9nZXRQb3B1cERhdGEsIHRoaXMpO1xuICAgICAgdGhpcy5fbWFwLm9uKCdkYmxjbGljaycsIHRoaXMuX3Jlc2V0UG9wdXBTdGF0ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGNvcHlyaWdodCB0ZXh0IGxpc3RlZCBpbiBzZXJ2aWNlIG1ldGFkYXRhXG4gICAgdGhpcy5tZXRhZGF0YShmdW5jdGlvbiAoZXJyLCBtZXRhZGF0YSkge1xuICAgICAgaWYgKCFlcnIgJiYgIXRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbiAmJiBtYXAuYXR0cmlidXRpb25Db250cm9sICYmIG1ldGFkYXRhLmNvcHlyaWdodFRleHQpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uID0gbWV0YWRhdGEuY29weXJpZ2h0VGV4dDtcbiAgICAgICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5hZGRBdHRyaWJ1dGlvbih0aGlzLmdldEF0dHJpYnV0aW9uKCkpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSkge1xuICAgICAgdGhpcy5fbWFwLnJlbW92ZUxheWVyKHRoaXMuX2N1cnJlbnRJbWFnZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BvcHVwKSB7XG4gICAgICB0aGlzLl9tYXAub2ZmKCdjbGljaycsIHRoaXMuX2dldFBvcHVwRGF0YSwgdGhpcyk7XG4gICAgICB0aGlzLl9tYXAub2ZmKCdkYmxjbGljaycsIHRoaXMuX3Jlc2V0UG9wdXBTdGF0ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5fbWFwLm9mZignbW92ZWVuZCcsIHRoaXMuX3VwZGF0ZSwgdGhpcyk7XG4gIH0sXG5cbiAgYmluZFBvcHVwOiBmdW5jdGlvbiAoZm4sIHBvcHVwT3B0aW9ucykge1xuICAgIHRoaXMuX3Nob3VsZFJlbmRlclBvcHVwID0gZmFsc2U7XG4gICAgdGhpcy5fbGFzdENsaWNrID0gZmFsc2U7XG4gICAgdGhpcy5fcG9wdXAgPSBwb3B1cChwb3B1cE9wdGlvbnMpO1xuICAgIHRoaXMuX3BvcHVwRnVuY3Rpb24gPSBmbjtcbiAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5fZ2V0UG9wdXBEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX21hcC5vbignZGJsY2xpY2snLCB0aGlzLl9yZXNldFBvcHVwU3RhdGUsIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICB1bmJpbmRQb3B1cDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgIHRoaXMuX21hcC5jbG9zZVBvcHVwKHRoaXMuX3BvcHVwKTtcbiAgICAgIHRoaXMuX21hcC5vZmYoJ2NsaWNrJywgdGhpcy5fZ2V0UG9wdXBEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX21hcC5vZmYoJ2RibGNsaWNrJywgdGhpcy5fcmVzZXRQb3B1cFN0YXRlLCB0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5fcG9wdXAgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBicmluZ1RvRnJvbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9wdGlvbnMucG9zaXRpb24gPSAnZnJvbnQnO1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5icmluZ1RvRnJvbnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYnJpbmdUb0JhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9wdGlvbnMucG9zaXRpb24gPSAnYmFjayc7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSkge1xuICAgICAgdGhpcy5fY3VycmVudEltYWdlLmJyaW5nVG9CYWNrKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbjtcbiAgfSxcblxuICBnZXRPcGFjaXR5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5vcGFjaXR5O1xuICB9LFxuXG4gIHNldE9wYWNpdHk6IGZ1bmN0aW9uIChvcGFjaXR5KSB7XG4gICAgdGhpcy5vcHRpb25zLm9wYWNpdHkgPSBvcGFjaXR5O1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5zZXRPcGFjaXR5KG9wYWNpdHkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRUaW1lUmFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gW3RoaXMub3B0aW9ucy5mcm9tLCB0aGlzLm9wdGlvbnMudG9dO1xuICB9LFxuXG4gIHNldFRpbWVSYW5nZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XG4gICAgdGhpcy5vcHRpb25zLmZyb20gPSBmcm9tO1xuICAgIHRoaXMub3B0aW9ucy50byA9IHRvO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UubWV0YWRhdGEoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGF1dGhlbnRpY2F0ZTogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdGhpcy5zZXJ2aWNlLmF1dGhlbnRpY2F0ZSh0b2tlbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcmVkcmF3OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gIH0sXG5cbiAgX3JlbmRlckltYWdlOiBmdW5jdGlvbiAodXJsLCBib3VuZHMsIGNvbnRlbnRUeXBlKSB7XG4gICAgaWYgKHRoaXMuX21hcCkge1xuICAgICAgLy8gaWYgbm8gb3V0cHV0IGRpcmVjdG9yeSBoYXMgYmVlbiBzcGVjaWZpZWQgZm9yIGEgc2VydmljZSwgTUlNRSBkYXRhIHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgIGlmIChjb250ZW50VHlwZSkge1xuICAgICAgICB1cmwgPSAnZGF0YTonICsgY29udGVudFR5cGUgKyAnO2Jhc2U2NCwnICsgdXJsO1xuICAgICAgfVxuICAgICAgLy8gY3JlYXRlIGEgbmV3IGltYWdlIG92ZXJsYXkgYW5kIGFkZCBpdCB0byB0aGUgbWFwXG4gICAgICAvLyB0byBzdGFydCBsb2FkaW5nIHRoZSBpbWFnZVxuICAgICAgLy8gb3BhY2l0eSBpcyAwIHdoaWxlIHRoZSBpbWFnZSBpcyBsb2FkaW5nXG4gICAgICB2YXIgaW1hZ2UgPSBuZXcgT3ZlcmxheSh1cmwsIGJvdW5kcywge1xuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBjcm9zc09yaWdpbjogdGhpcy5vcHRpb25zLnVzZUNvcnMsXG4gICAgICAgIGFsdDogdGhpcy5vcHRpb25zLmFsdCxcbiAgICAgICAgcGFuZTogdGhpcy5vcHRpb25zLnBhbmUgfHwgdGhpcy5nZXRQYW5lKCksXG4gICAgICAgIGludGVyYWN0aXZlOiB0aGlzLm9wdGlvbnMuaW50ZXJhY3RpdmVcbiAgICAgIH0pLmFkZFRvKHRoaXMuX21hcCk7XG5cbiAgICAgIHZhciBvbk92ZXJsYXlFcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fbWFwLnJlbW92ZUxheWVyKGltYWdlKTtcbiAgICAgICAgdGhpcy5maXJlKCdlcnJvcicpO1xuICAgICAgICBpbWFnZS5vZmYoJ2xvYWQnLCBvbk92ZXJsYXlMb2FkLCB0aGlzKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBvbk92ZXJsYXlMb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaW1hZ2Uub2ZmKCdlcnJvcicsIG9uT3ZlcmxheUxvYWQsIHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICAgICAgdmFyIG5ld0ltYWdlID0gZS50YXJnZXQ7XG4gICAgICAgICAgdmFyIG9sZEltYWdlID0gdGhpcy5fY3VycmVudEltYWdlO1xuXG4gICAgICAgICAgLy8gaWYgdGhlIGJvdW5kcyBvZiB0aGlzIGltYWdlIG1hdGNoZXMgdGhlIGJvdW5kcyB0aGF0XG4gICAgICAgICAgLy8gX3JlbmRlckltYWdlIHdhcyBjYWxsZWQgd2l0aCBhbmQgd2UgaGF2ZSBhIG1hcCB3aXRoIHRoZSBzYW1lIGJvdW5kc1xuICAgICAgICAgIC8vIGhpZGUgdGhlIG9sZCBpbWFnZSBpZiB0aGVyZSBpcyBvbmUgYW5kIHNldCB0aGUgb3BhY2l0eVxuICAgICAgICAgIC8vIG9mIHRoZSBuZXcgaW1hZ2Ugb3RoZXJ3aXNlIHJlbW92ZSB0aGUgbmV3IGltYWdlXG4gICAgICAgICAgaWYgKG5ld0ltYWdlLl9ib3VuZHMuZXF1YWxzKGJvdW5kcykgJiYgbmV3SW1hZ2UuX2JvdW5kcy5lcXVhbHModGhpcy5fbWFwLmdldEJvdW5kcygpKSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEltYWdlID0gbmV3SW1hZ2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucG9zaXRpb24gPT09ICdmcm9udCcpIHtcbiAgICAgICAgICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuYnJpbmdUb0JhY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9jdXJyZW50SW1hZ2UuX21hcCkge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SW1hZ2Uuc2V0T3BhY2l0eSh0aGlzLm9wdGlvbnMub3BhY2l0eSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SW1hZ2UuX21hcC5yZW1vdmVMYXllcih0aGlzLl9jdXJyZW50SW1hZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob2xkSW1hZ2UgJiYgdGhpcy5fbWFwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcihvbGRJbWFnZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvbGRJbWFnZSAmJiBvbGRJbWFnZS5fbWFwKSB7XG4gICAgICAgICAgICAgIG9sZEltYWdlLl9tYXAucmVtb3ZlTGF5ZXIob2xkSW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIobmV3SW1hZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlyZSgnbG9hZCcsIHtcbiAgICAgICAgICBib3VuZHM6IGJvdW5kc1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIC8vIElmIGxvYWRpbmcgdGhlIGltYWdlIGZhaWxzXG4gICAgICBpbWFnZS5vbmNlKCdlcnJvcicsIG9uT3ZlcmxheUVycm9yLCB0aGlzKTtcblxuICAgICAgLy8gb25jZSB0aGUgaW1hZ2UgbG9hZHNcbiAgICAgIGltYWdlLm9uY2UoJ2xvYWQnLCBvbk92ZXJsYXlMb2FkLCB0aGlzKTtcblxuICAgICAgdGhpcy5maXJlKCdsb2FkaW5nJywge1xuICAgICAgICBib3VuZHM6IGJvdW5kc1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIF91cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX21hcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB6b29tID0gdGhpcy5fbWFwLmdldFpvb20oKTtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fbWFwLmdldEJvdW5kcygpO1xuXG4gICAgaWYgKHRoaXMuX2FuaW1hdGluZ1pvb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbWFwLl9wYW5UcmFuc2l0aW9uICYmIHRoaXMuX21hcC5fcGFuVHJhbnNpdGlvbi5faW5Qcm9ncmVzcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh6b29tID4gdGhpcy5vcHRpb25zLm1heFpvb20gfHwgem9vbSA8IHRoaXMub3B0aW9ucy5taW5ab29tKSB7XG4gICAgICBpZiAodGhpcy5fY3VycmVudEltYWdlKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5fbWFwLnJlbW92ZUxheWVyKHRoaXMuX2N1cnJlbnRJbWFnZSk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZSA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHBhcmFtcyA9IHRoaXMuX2J1aWxkRXhwb3J0UGFyYW1zKCk7XG5cbiAgICB0aGlzLl9yZXF1ZXN0RXhwb3J0KHBhcmFtcywgYm91bmRzKTtcbiAgfSxcblxuICBfcmVuZGVyUG9wdXA6IGZ1bmN0aW9uIChsYXRsbmcsIGVycm9yLCByZXN1bHRzLCByZXNwb25zZSkge1xuICAgIGxhdGxuZyA9IGxhdExuZyhsYXRsbmcpO1xuICAgIGlmICh0aGlzLl9zaG91bGRSZW5kZXJQb3B1cCAmJiB0aGlzLl9sYXN0Q2xpY2suZXF1YWxzKGxhdGxuZykpIHtcbiAgICAgIC8vIGFkZCB0aGUgcG9wdXAgdG8gdGhlIG1hcCB3aGVyZSB0aGUgbW91c2Ugd2FzIGNsaWNrZWQgYXRcbiAgICAgIHZhciBjb250ZW50ID0gdGhpcy5fcG9wdXBGdW5jdGlvbihlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpO1xuICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5fcG9wdXAuc2V0TGF0TG5nKGxhdGxuZykuc2V0Q29udGVudChjb250ZW50KS5vcGVuT24odGhpcy5fbWFwKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX3Jlc2V0UG9wdXBTdGF0ZTogZnVuY3Rpb24gKGUpIHtcbiAgICB0aGlzLl9zaG91bGRSZW5kZXJQb3B1cCA9IGZhbHNlO1xuICAgIHRoaXMuX2xhc3RDbGljayA9IGUubGF0bG5nO1xuICB9LFxuXG4gIF9jYWxjdWxhdGVCYm94OiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBpeGVsQm91bmRzID0gdGhpcy5fbWFwLmdldFBpeGVsQm91bmRzKCk7XG5cbiAgICB2YXIgc3cgPSB0aGlzLl9tYXAudW5wcm9qZWN0KHBpeGVsQm91bmRzLmdldEJvdHRvbUxlZnQoKSk7XG4gICAgdmFyIG5lID0gdGhpcy5fbWFwLnVucHJvamVjdChwaXhlbEJvdW5kcy5nZXRUb3BSaWdodCgpKTtcblxuICAgIHZhciBuZVByb2plY3RlZCA9IHRoaXMuX21hcC5vcHRpb25zLmNycy5wcm9qZWN0KG5lKTtcbiAgICB2YXIgc3dQcm9qZWN0ZWQgPSB0aGlzLl9tYXAub3B0aW9ucy5jcnMucHJvamVjdChzdyk7XG5cbiAgICAvLyB0aGlzIGVuc3VyZXMgbmUvc3cgYXJlIHN3aXRjaGVkIGluIHBvbGFyIG1hcHMgd2hlcmUgbm9ydGgvdG9wIGJvdHRvbS9zb3V0aCBpcyBpbnZlcnRlZFxuICAgIHZhciBib3VuZHNQcm9qZWN0ZWQgPSBib3VuZHMobmVQcm9qZWN0ZWQsIHN3UHJvamVjdGVkKTtcblxuICAgIHJldHVybiBbYm91bmRzUHJvamVjdGVkLmdldEJvdHRvbUxlZnQoKS54LCBib3VuZHNQcm9qZWN0ZWQuZ2V0Qm90dG9tTGVmdCgpLnksIGJvdW5kc1Byb2plY3RlZC5nZXRUb3BSaWdodCgpLngsIGJvdW5kc1Byb2plY3RlZC5nZXRUb3BSaWdodCgpLnldLmpvaW4oJywnKTtcbiAgfSxcblxuICBfY2FsY3VsYXRlSW1hZ2VTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gZW5zdXJlIHRoYXQgd2UgZG9uJ3QgYXNrIEFyY0dJUyBTZXJ2ZXIgZm9yIGEgdGFsbGVyIGltYWdlIHRoYW4gd2UgaGF2ZSBhY3R1YWwgbWFwIGRpc3BsYXlpbmcgd2l0aGluIHRoZSBkaXZcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fbWFwLmdldFBpeGVsQm91bmRzKCk7XG4gICAgdmFyIHNpemUgPSB0aGlzLl9tYXAuZ2V0U2l6ZSgpO1xuXG4gICAgdmFyIHN3ID0gdGhpcy5fbWFwLnVucHJvamVjdChib3VuZHMuZ2V0Qm90dG9tTGVmdCgpKTtcbiAgICB2YXIgbmUgPSB0aGlzLl9tYXAudW5wcm9qZWN0KGJvdW5kcy5nZXRUb3BSaWdodCgpKTtcblxuICAgIHZhciB0b3AgPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KG5lKS55O1xuICAgIHZhciBib3R0b20gPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KHN3KS55O1xuXG4gICAgaWYgKHRvcCA+IDAgfHwgYm90dG9tIDwgc2l6ZS55KSB7XG4gICAgICBzaXplLnkgPSBib3R0b20gLSB0b3A7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNpemUueCArICcsJyArIHNpemUueTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgeyBVdGlsIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBSYXN0ZXJMYXllciB9IGZyb20gJy4vUmFzdGVyTGF5ZXInO1xuaW1wb3J0IHsgY2xlYW5VcmwgfSBmcm9tICcuLi9VdGlsJztcbmltcG9ydCBpbWFnZVNlcnZpY2UgZnJvbSAnLi4vU2VydmljZXMvSW1hZ2VTZXJ2aWNlJztcblxuZXhwb3J0IHZhciBJbWFnZU1hcExheWVyID0gUmFzdGVyTGF5ZXIuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgdXBkYXRlSW50ZXJ2YWw6IDE1MCxcbiAgICBmb3JtYXQ6ICdqcGdwbmcnLFxuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIGY6ICdqc29uJ1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5xdWVyeSgpO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5pZGVudGlmeSgpO1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucy51cmwgPSBjbGVhblVybChvcHRpb25zLnVybCk7XG4gICAgdGhpcy5zZXJ2aWNlID0gaW1hZ2VTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2VydmljZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgIFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICBzZXRQaXhlbFR5cGU6IGZ1bmN0aW9uIChwaXhlbFR5cGUpIHtcbiAgICB0aGlzLm9wdGlvbnMucGl4ZWxUeXBlID0gcGl4ZWxUeXBlO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFBpeGVsVHlwZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucGl4ZWxUeXBlO1xuICB9LFxuXG4gIHNldEJhbmRJZHM6IGZ1bmN0aW9uIChiYW5kSWRzKSB7XG4gICAgaWYgKFV0aWwuaXNBcnJheShiYW5kSWRzKSkge1xuICAgICAgdGhpcy5vcHRpb25zLmJhbmRJZHMgPSBiYW5kSWRzLmpvaW4oJywnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcHRpb25zLmJhbmRJZHMgPSBiYW5kSWRzLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldEJhbmRJZHM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmJhbmRJZHM7XG4gIH0sXG5cbiAgc2V0Tm9EYXRhOiBmdW5jdGlvbiAobm9EYXRhLCBub0RhdGFJbnRlcnByZXRhdGlvbikge1xuICAgIGlmIChVdGlsLmlzQXJyYXkobm9EYXRhKSkge1xuICAgICAgdGhpcy5vcHRpb25zLm5vRGF0YSA9IG5vRGF0YS5qb2luKCcsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9ucy5ub0RhdGEgPSBub0RhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKG5vRGF0YUludGVycHJldGF0aW9uKSB7XG4gICAgICB0aGlzLm9wdGlvbnMubm9EYXRhSW50ZXJwcmV0YXRpb24gPSBub0RhdGFJbnRlcnByZXRhdGlvbjtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0Tm9EYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5ub0RhdGE7XG4gIH0sXG5cbiAgZ2V0Tm9EYXRhSW50ZXJwcmV0YXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5vRGF0YUludGVycHJldGF0aW9uO1xuICB9LFxuXG4gIHNldFJlbmRlcmluZ1J1bGU6IGZ1bmN0aW9uIChyZW5kZXJpbmdSdWxlKSB7XG4gICAgdGhpcy5vcHRpb25zLnJlbmRlcmluZ1J1bGUgPSByZW5kZXJpbmdSdWxlO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICB9LFxuXG4gIGdldFJlbmRlcmluZ1J1bGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJlbmRlcmluZ1J1bGU7XG4gIH0sXG5cbiAgc2V0TW9zYWljUnVsZTogZnVuY3Rpb24gKG1vc2FpY1J1bGUpIHtcbiAgICB0aGlzLm9wdGlvbnMubW9zYWljUnVsZSA9IG1vc2FpY1J1bGU7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gIH0sXG5cbiAgZ2V0TW9zYWljUnVsZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubW9zYWljUnVsZTtcbiAgfSxcblxuICBfZ2V0UG9wdXBEYXRhOiBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBjYWxsYmFjayA9IFV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9IC8vIHdlIHJlYWxseSBjYW4ndCBkbyBhbnl0aGluZyBoZXJlIGJ1dCBhdXRoZW50aWNhdGUgb3IgcmVxdWVzdGVycm9yIHdpbGwgZmlyZVxuICAgICAgc2V0VGltZW91dChVdGlsLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9yZW5kZXJQb3B1cChlLmxhdGxuZywgZXJyb3IsIHJlc3VsdHMsIHJlc3BvbnNlKTtcbiAgICAgIH0sIHRoaXMpLCAzMDApO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgdmFyIGlkZW50aWZ5UmVxdWVzdCA9IHRoaXMuaWRlbnRpZnkoKS5hdChlLmxhdGxuZyk7XG5cbiAgICAvLyBzZXQgbW9zYWljIHJ1bGUgZm9yIGlkZW50aWZ5IHRhc2sgaWYgaXQgaXMgc2V0IGZvciBsYXllclxuICAgIGlmICh0aGlzLm9wdGlvbnMubW9zYWljUnVsZSkge1xuICAgICAgaWRlbnRpZnlSZXF1ZXN0LnNldE1vc2FpY1J1bGUodGhpcy5vcHRpb25zLm1vc2FpY1J1bGUpO1xuICAgICAgLy8gQFRPRE86IGZvcmNlIHJldHVybiBjYXRhbG9nIGl0ZW1zIHRvbz9cbiAgICB9XG5cbiAgICAvLyBAVE9ETzogc2V0IHJlbmRlcmluZyBydWxlPyBOb3Qgc3VyZSxcbiAgICAvLyBzb21ldGltZXMgeW91IHdhbnQgcmF3IHBpeGVsIHZhbHVlc1xuICAgIC8vIGlmICh0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZSkge1xuICAgIC8vICAgaWRlbnRpZnlSZXF1ZXN0LnNldFJlbmRlcmluZ1J1bGUodGhpcy5vcHRpb25zLnJlbmRlcmluZ1J1bGUpO1xuICAgIC8vIH1cblxuICAgIGlkZW50aWZ5UmVxdWVzdC5ydW4oY2FsbGJhY2spO1xuXG4gICAgLy8gc2V0IHRoZSBmbGFncyB0byBzaG93IHRoZSBwb3B1cFxuICAgIHRoaXMuX3Nob3VsZFJlbmRlclBvcHVwID0gdHJ1ZTtcbiAgICB0aGlzLl9sYXN0Q2xpY2sgPSBlLmxhdGxuZztcbiAgfSxcblxuICBfYnVpbGRFeHBvcnRQYXJhbXM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3IgPSBwYXJzZUludCh0aGlzLl9tYXAub3B0aW9ucy5jcnMuY29kZS5zcGxpdCgnOicpWzFdLCAxMCk7XG5cbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgYmJveDogdGhpcy5fY2FsY3VsYXRlQmJveCgpLFxuICAgICAgc2l6ZTogdGhpcy5fY2FsY3VsYXRlSW1hZ2VTaXplKCksXG4gICAgICBmb3JtYXQ6IHRoaXMub3B0aW9ucy5mb3JtYXQsXG4gICAgICB0cmFuc3BhcmVudDogdGhpcy5vcHRpb25zLnRyYW5zcGFyZW50LFxuICAgICAgYmJveFNSOiBzcixcbiAgICAgIGltYWdlU1I6IHNyXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZnJvbSAmJiB0aGlzLm9wdGlvbnMudG8pIHtcbiAgICAgIHBhcmFtcy50aW1lID0gdGhpcy5vcHRpb25zLmZyb20udmFsdWVPZigpICsgJywnICsgdGhpcy5vcHRpb25zLnRvLnZhbHVlT2YoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnBpeGVsVHlwZSkge1xuICAgICAgcGFyYW1zLnBpeGVsVHlwZSA9IHRoaXMub3B0aW9ucy5waXhlbFR5cGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbnRlcnBvbGF0aW9uKSB7XG4gICAgICBwYXJhbXMuaW50ZXJwb2xhdGlvbiA9IHRoaXMub3B0aW9ucy5pbnRlcnBvbGF0aW9uO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29tcHJlc3Npb25RdWFsaXR5KSB7XG4gICAgICBwYXJhbXMuY29tcHJlc3Npb25RdWFsaXR5ID0gdGhpcy5vcHRpb25zLmNvbXByZXNzaW9uUXVhbGl0eTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmJhbmRJZHMpIHtcbiAgICAgIHBhcmFtcy5iYW5kSWRzID0gdGhpcy5vcHRpb25zLmJhbmRJZHM7XG4gICAgfVxuXG4gICAgLy8gMCBpcyBmYWxzeSAqYW5kKiBhIHZhbGlkIGlucHV0IHBhcmFtZXRlclxuICAgIGlmICh0aGlzLm9wdGlvbnMubm9EYXRhID09PSAwIHx8IHRoaXMub3B0aW9ucy5ub0RhdGEpIHtcbiAgICAgIHBhcmFtcy5ub0RhdGEgPSB0aGlzLm9wdGlvbnMubm9EYXRhO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMubm9EYXRhSW50ZXJwcmV0YXRpb24pIHtcbiAgICAgIHBhcmFtcy5ub0RhdGFJbnRlcnByZXRhdGlvbiA9IHRoaXMub3B0aW9ucy5ub0RhdGFJbnRlcnByZXRhdGlvbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZXJ2aWNlLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIHBhcmFtcy50b2tlbiA9IHRoaXMuc2VydmljZS5vcHRpb25zLnRva2VuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZSkge1xuICAgICAgcGFyYW1zLnJlbmRlcmluZ1J1bGUgPSBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlKSB7XG4gICAgICBwYXJhbXMubW9zYWljUnVsZSA9IEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9LFxuXG4gIF9yZXF1ZXN0RXhwb3J0OiBmdW5jdGlvbiAocGFyYW1zLCBib3VuZHMpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmYgPT09ICdqc29uJykge1xuICAgICAgdGhpcy5zZXJ2aWNlLnJlcXVlc3QoJ2V4cG9ydEltYWdlJywgcGFyYW1zLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgICAgICByZXNwb25zZS5ocmVmICs9ICgnP3Rva2VuPScgKyB0aGlzLm9wdGlvbnMudG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlbmRlckltYWdlKHJlc3BvbnNlLmhyZWYsIGJvdW5kcyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1zLmYgPSAnaW1hZ2UnO1xuICAgICAgdGhpcy5fcmVuZGVySW1hZ2UodGhpcy5vcHRpb25zLnVybCArICdleHBvcnRJbWFnZScgKyBVdGlsLmdldFBhcmFtU3RyaW5nKHBhcmFtcyksIGJvdW5kcyk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGltYWdlTWFwTGF5ZXIgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IEltYWdlTWFwTGF5ZXIodXJsLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW1hZ2VNYXBMYXllcjtcbiIsImltcG9ydCB7IFV0aWwgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFJhc3RlckxheWVyIH0gZnJvbSAnLi9SYXN0ZXJMYXllcic7XG5pbXBvcnQgeyBjbGVhblVybCB9IGZyb20gJy4uL1V0aWwnO1xuaW1wb3J0IG1hcFNlcnZpY2UgZnJvbSAnLi4vU2VydmljZXMvTWFwU2VydmljZSc7XG5cbmV4cG9ydCB2YXIgRHluYW1pY01hcExheWVyID0gUmFzdGVyTGF5ZXIuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgdXBkYXRlSW50ZXJ2YWw6IDE1MCxcbiAgICBsYXllcnM6IGZhbHNlLFxuICAgIGxheWVyRGVmczogZmFsc2UsXG4gICAgdGltZU9wdGlvbnM6IGZhbHNlLFxuICAgIGZvcm1hdDogJ3BuZzI0JyxcbiAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICBmOiAnanNvbidcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMudXJsID0gY2xlYW5Vcmwob3B0aW9ucy51cmwpO1xuICAgIHRoaXMuc2VydmljZSA9IG1hcFNlcnZpY2Uob3B0aW9ucyk7XG4gICAgdGhpcy5zZXJ2aWNlLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuXG4gICAgaWYgKChvcHRpb25zLnByb3h5IHx8IG9wdGlvbnMudG9rZW4pICYmIG9wdGlvbnMuZiAhPT0gJ2pzb24nKSB7XG4gICAgICBvcHRpb25zLmYgPSAnanNvbic7XG4gICAgfVxuXG4gICAgVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIGdldER5bmFtaWNMYXllcnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmR5bmFtaWNMYXllcnM7XG4gIH0sXG5cbiAgc2V0RHluYW1pY0xheWVyczogZnVuY3Rpb24gKGR5bmFtaWNMYXllcnMpIHtcbiAgICB0aGlzLm9wdGlvbnMuZHluYW1pY0xheWVycyA9IGR5bmFtaWNMYXllcnM7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0TGF5ZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5sYXllcnM7XG4gIH0sXG5cbiAgc2V0TGF5ZXJzOiBmdW5jdGlvbiAobGF5ZXJzKSB7XG4gICAgdGhpcy5vcHRpb25zLmxheWVycyA9IGxheWVycztcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRMYXllckRlZnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxheWVyRGVmcztcbiAgfSxcblxuICBzZXRMYXllckRlZnM6IGZ1bmN0aW9uIChsYXllckRlZnMpIHtcbiAgICB0aGlzLm9wdGlvbnMubGF5ZXJEZWZzID0gbGF5ZXJEZWZzO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFRpbWVPcHRpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50aW1lT3B0aW9ucztcbiAgfSxcblxuICBzZXRUaW1lT3B0aW9uczogZnVuY3Rpb24gKHRpbWVPcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zLnRpbWVPcHRpb25zID0gdGltZU9wdGlvbnM7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcXVlcnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLnF1ZXJ5KCk7XG4gIH0sXG5cbiAgaWRlbnRpZnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmlkZW50aWZ5KCk7XG4gIH0sXG5cbiAgZmluZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZmluZCgpO1xuICB9LFxuXG4gIF9nZXRQb3B1cERhdGE6IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgZmVhdHVyZUNvbGxlY3Rpb24sIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9IC8vIHdlIHJlYWxseSBjYW4ndCBkbyBhbnl0aGluZyBoZXJlIGJ1dCBhdXRoZW50aWNhdGUgb3IgcmVxdWVzdGVycm9yIHdpbGwgZmlyZVxuICAgICAgc2V0VGltZW91dChVdGlsLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9yZW5kZXJQb3B1cChlLmxhdGxuZywgZXJyb3IsIGZlYXR1cmVDb2xsZWN0aW9uLCByZXNwb25zZSk7XG4gICAgICB9LCB0aGlzKSwgMzAwKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHZhciBpZGVudGlmeVJlcXVlc3QgPSB0aGlzLmlkZW50aWZ5KCkub24odGhpcy5fbWFwKS5hdChlLmxhdGxuZyk7XG5cbiAgICAvLyByZW1vdmUgZXh0cmFuZW91cyB2ZXJ0aWNlcyBmcm9tIHJlc3BvbnNlIGZlYXR1cmVzXG4gICAgaWRlbnRpZnlSZXF1ZXN0LnNpbXBsaWZ5KHRoaXMuX21hcCwgMC41KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXJzKSB7XG4gICAgICBpZGVudGlmeVJlcXVlc3QubGF5ZXJzKCd2aXNpYmxlOicgKyB0aGlzLm9wdGlvbnMubGF5ZXJzLmpvaW4oJywnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkZW50aWZ5UmVxdWVzdC5sYXllcnMoJ3Zpc2libGUnKTtcbiAgICB9XG5cbiAgICAvLyBpZiBwcmVzZW50LCBwYXNzIGxheWVyIGlkcyBhbmQgc3FsIGZpbHRlcnMgdGhyb3VnaCB0byB0aGUgaWRlbnRpZnkgdGFza1xuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXJEZWZzICYmIHR5cGVvZiB0aGlzLm9wdGlvbnMubGF5ZXJEZWZzICE9PSAnc3RyaW5nJykge1xuICAgICAgZm9yICh2YXIgaWQgaW4gdGhpcy5vcHRpb25zLmxheWVyRGVmcykge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxheWVyRGVmcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICAgICAgICBpZGVudGlmeVJlcXVlc3QubGF5ZXJEZWYoaWQsIHRoaXMub3B0aW9ucy5sYXllckRlZnNbaWRdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlkZW50aWZ5UmVxdWVzdC5ydW4oY2FsbGJhY2spO1xuXG4gICAgLy8gc2V0IHRoZSBmbGFncyB0byBzaG93IHRoZSBwb3B1cFxuICAgIHRoaXMuX3Nob3VsZFJlbmRlclBvcHVwID0gdHJ1ZTtcbiAgICB0aGlzLl9sYXN0Q2xpY2sgPSBlLmxhdGxuZztcbiAgfSxcblxuICBfYnVpbGRFeHBvcnRQYXJhbXM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3IgPSBwYXJzZUludCh0aGlzLl9tYXAub3B0aW9ucy5jcnMuY29kZS5zcGxpdCgnOicpWzFdLCAxMCk7XG5cbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgYmJveDogdGhpcy5fY2FsY3VsYXRlQmJveCgpLFxuICAgICAgc2l6ZTogdGhpcy5fY2FsY3VsYXRlSW1hZ2VTaXplKCksXG4gICAgICBkcGk6IDk2LFxuICAgICAgZm9ybWF0OiB0aGlzLm9wdGlvbnMuZm9ybWF0LFxuICAgICAgdHJhbnNwYXJlbnQ6IHRoaXMub3B0aW9ucy50cmFuc3BhcmVudCxcbiAgICAgIGJib3hTUjogc3IsXG4gICAgICBpbWFnZVNSOiBzclxuICAgIH07XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmR5bmFtaWNMYXllcnMpIHtcbiAgICAgIHBhcmFtcy5keW5hbWljTGF5ZXJzID0gdGhpcy5vcHRpb25zLmR5bmFtaWNMYXllcnM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllcnMpIHtcbiAgICAgIHBhcmFtcy5sYXllcnMgPSAnc2hvdzonICsgdGhpcy5vcHRpb25zLmxheWVycy5qb2luKCcsJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllckRlZnMpIHtcbiAgICAgIHBhcmFtcy5sYXllckRlZnMgPSB0eXBlb2YgdGhpcy5vcHRpb25zLmxheWVyRGVmcyA9PT0gJ3N0cmluZycgPyB0aGlzLm9wdGlvbnMubGF5ZXJEZWZzIDogSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLmxheWVyRGVmcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lT3B0aW9ucykge1xuICAgICAgcGFyYW1zLnRpbWVPcHRpb25zID0gSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLnRpbWVPcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmZyb20gJiYgdGhpcy5vcHRpb25zLnRvKSB7XG4gICAgICBwYXJhbXMudGltZSA9IHRoaXMub3B0aW9ucy5mcm9tLnZhbHVlT2YoKSArICcsJyArIHRoaXMub3B0aW9ucy50by52YWx1ZU9mKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VydmljZS5vcHRpb25zLnRva2VuKSB7XG4gICAgICBwYXJhbXMudG9rZW4gPSB0aGlzLnNlcnZpY2Uub3B0aW9ucy50b2tlbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnByb3h5KSB7XG4gICAgICBwYXJhbXMucHJveHkgPSB0aGlzLm9wdGlvbnMucHJveHk7XG4gICAgfVxuXG4gICAgLy8gdXNlIGEgdGltZXN0YW1wIHRvIGJ1c3Qgc2VydmVyIGNhY2hlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlQ2FjaGUpIHtcbiAgICAgIHBhcmFtcy5fdHMgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH0sXG5cbiAgX3JlcXVlc3RFeHBvcnQ6IGZ1bmN0aW9uIChwYXJhbXMsIGJvdW5kcykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZiA9PT0gJ2pzb24nKSB7XG4gICAgICB0aGlzLnNlcnZpY2UucmVxdWVzdCgnZXhwb3J0JywgcGFyYW1zLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50b2tlbikge1xuICAgICAgICAgIHJlc3BvbnNlLmhyZWYgKz0gKCc/dG9rZW49JyArIHRoaXMub3B0aW9ucy50b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcm94eSkge1xuICAgICAgICAgIHJlc3BvbnNlLmhyZWYgPSB0aGlzLm9wdGlvbnMucHJveHkgKyAnPycgKyByZXNwb25zZS5ocmVmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNwb25zZS5ocmVmKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVySW1hZ2UocmVzcG9uc2UuaHJlZiwgYm91bmRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJJbWFnZShyZXNwb25zZS5pbWFnZURhdGEsIGJvdW5kcywgcmVzcG9uc2UuY29udGVudFR5cGUpO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1zLmYgPSAnaW1hZ2UnO1xuICAgICAgdGhpcy5fcmVuZGVySW1hZ2UodGhpcy5vcHRpb25zLnVybCArICdleHBvcnQnICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMpLCBib3VuZHMpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkeW5hbWljTWFwTGF5ZXIgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IER5bmFtaWNNYXBMYXllcih1cmwsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkeW5hbWljTWFwTGF5ZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcblxudmFyIFZpcnR1YWxHcmlkID0gTC5MYXllci5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBjZWxsU2l6ZTogNTEyLFxuICAgIHVwZGF0ZUludGVydmFsOiAxNTBcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fem9vbWluZyA9IGZhbHNlO1xuICB9LFxuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgdGhpcy5fbWFwID0gbWFwO1xuICAgIHRoaXMuX3VwZGF0ZSA9IEwuVXRpbC50aHJvdHRsZSh0aGlzLl91cGRhdGUsIHRoaXMub3B0aW9ucy51cGRhdGVJbnRlcnZhbCwgdGhpcyk7XG4gICAgdGhpcy5fcmVzZXQoKTtcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgfSxcblxuICBvblJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX21hcC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZ2V0RXZlbnRzKCksIHRoaXMpO1xuICAgIHRoaXMuX3JlbW92ZUNlbGxzKCk7XG4gIH0sXG5cbiAgZ2V0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV2ZW50cyA9IHtcbiAgICAgIG1vdmVlbmQ6IHRoaXMuX3VwZGF0ZSxcbiAgICAgIHpvb21zdGFydDogdGhpcy5fem9vbXN0YXJ0LFxuICAgICAgem9vbWVuZDogdGhpcy5fcmVzZXRcbiAgICB9O1xuXG4gICAgcmV0dXJuIGV2ZW50cztcbiAgfSxcblxuICBhZGRUbzogZnVuY3Rpb24gKG1hcCkge1xuICAgIG1hcC5hZGRMYXllcih0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZW1vdmVGcm9tOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgbWFwLnJlbW92ZUxheWVyKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIF96b29tc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl96b29taW5nID0gdHJ1ZTtcbiAgfSxcblxuICBfcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9yZW1vdmVDZWxscygpO1xuXG4gICAgdGhpcy5fY2VsbHMgPSB7fTtcbiAgICB0aGlzLl9hY3RpdmVDZWxscyA9IHt9O1xuICAgIHRoaXMuX2NlbGxzVG9Mb2FkID0gMDtcbiAgICB0aGlzLl9jZWxsc1RvdGFsID0gMDtcbiAgICB0aGlzLl9jZWxsTnVtQm91bmRzID0gdGhpcy5fZ2V0Q2VsbE51bUJvdW5kcygpO1xuXG4gICAgdGhpcy5fcmVzZXRXcmFwKCk7XG4gICAgdGhpcy5fem9vbWluZyA9IGZhbHNlO1xuICB9LFxuXG4gIF9yZXNldFdyYXA6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuICAgIHZhciBjcnMgPSBtYXAub3B0aW9ucy5jcnM7XG5cbiAgICBpZiAoY3JzLmluZmluaXRlKSB7IHJldHVybjsgfVxuXG4gICAgdmFyIGNlbGxTaXplID0gdGhpcy5fZ2V0Q2VsbFNpemUoKTtcblxuICAgIGlmIChjcnMud3JhcExuZykge1xuICAgICAgdGhpcy5fd3JhcExuZyA9IFtcbiAgICAgICAgTWF0aC5mbG9vcihtYXAucHJvamVjdChbMCwgY3JzLndyYXBMbmdbMF1dKS54IC8gY2VsbFNpemUpLFxuICAgICAgICBNYXRoLmNlaWwobWFwLnByb2plY3QoWzAsIGNycy53cmFwTG5nWzFdXSkueCAvIGNlbGxTaXplKVxuICAgICAgXTtcbiAgICB9XG5cbiAgICBpZiAoY3JzLndyYXBMYXQpIHtcbiAgICAgIHRoaXMuX3dyYXBMYXQgPSBbXG4gICAgICAgIE1hdGguZmxvb3IobWFwLnByb2plY3QoW2Nycy53cmFwTGF0WzBdLCAwXSkueSAvIGNlbGxTaXplKSxcbiAgICAgICAgTWF0aC5jZWlsKG1hcC5wcm9qZWN0KFtjcnMud3JhcExhdFsxXSwgMF0pLnkgLyBjZWxsU2l6ZSlcbiAgICAgIF07XG4gICAgfVxuICB9LFxuXG4gIF9nZXRDZWxsU2l6ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2VsbFNpemU7XG4gIH0sXG5cbiAgX3VwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRQaXhlbEJvdW5kcygpO1xuICAgIHZhciBjZWxsU2l6ZSA9IHRoaXMuX2dldENlbGxTaXplKCk7XG5cbiAgICAvLyBjZWxsIGNvb3JkaW5hdGVzIHJhbmdlIGZvciB0aGUgY3VycmVudCB2aWV3XG4gICAgdmFyIGNlbGxCb3VuZHMgPSBMLmJvdW5kcyhcbiAgICAgIGJvdW5kcy5taW4uZGl2aWRlQnkoY2VsbFNpemUpLmZsb29yKCksXG4gICAgICBib3VuZHMubWF4LmRpdmlkZUJ5KGNlbGxTaXplKS5mbG9vcigpKTtcblxuICAgIHRoaXMuX3JlbW92ZU90aGVyQ2VsbHMoY2VsbEJvdW5kcyk7XG4gICAgdGhpcy5fYWRkQ2VsbHMoY2VsbEJvdW5kcyk7XG5cbiAgICB0aGlzLmZpcmUoJ2NlbGxzdXBkYXRlZCcpO1xuICB9LFxuXG4gIF9hZGRDZWxsczogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgIHZhciBjZW50ZXIgPSBib3VuZHMuZ2V0Q2VudGVyKCk7XG4gICAgdmFyIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuXG4gICAgdmFyIGosIGksIGNvb3JkcztcbiAgICAvLyBjcmVhdGUgYSBxdWV1ZSBvZiBjb29yZGluYXRlcyB0byBsb2FkIGNlbGxzIGZyb21cbiAgICBmb3IgKGogPSBib3VuZHMubWluLnk7IGogPD0gYm91bmRzLm1heC55OyBqKyspIHtcbiAgICAgIGZvciAoaSA9IGJvdW5kcy5taW4ueDsgaSA8PSBib3VuZHMubWF4Lng7IGkrKykge1xuICAgICAgICBjb29yZHMgPSBMLnBvaW50KGksIGopO1xuICAgICAgICBjb29yZHMueiA9IHpvb207XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzVmFsaWRDZWxsKGNvb3JkcykpIHtcbiAgICAgICAgICBxdWV1ZS5wdXNoKGNvb3Jkcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2VsbHNUb0xvYWQgPSBxdWV1ZS5sZW5ndGg7XG5cbiAgICBpZiAoY2VsbHNUb0xvYWQgPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICB0aGlzLl9jZWxsc1RvTG9hZCArPSBjZWxsc1RvTG9hZDtcbiAgICB0aGlzLl9jZWxsc1RvdGFsICs9IGNlbGxzVG9Mb2FkO1xuXG4gICAgLy8gc29ydCBjZWxsIHF1ZXVlIHRvIGxvYWQgY2VsbHMgaW4gb3JkZXIgb2YgdGhlaXIgZGlzdGFuY2UgdG8gY2VudGVyXG4gICAgcXVldWUuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEuZGlzdGFuY2VUbyhjZW50ZXIpIC0gYi5kaXN0YW5jZVRvKGNlbnRlcik7XG4gICAgfSk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgY2VsbHNUb0xvYWQ7IGkrKykge1xuICAgICAgdGhpcy5fYWRkQ2VsbChxdWV1ZVtpXSk7XG4gICAgfVxuICB9LFxuXG4gIF9pc1ZhbGlkQ2VsbDogZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIHZhciBjcnMgPSB0aGlzLl9tYXAub3B0aW9ucy5jcnM7XG5cbiAgICBpZiAoIWNycy5pbmZpbml0ZSkge1xuICAgICAgLy8gZG9uJ3QgbG9hZCBjZWxsIGlmIGl0J3Mgb3V0IG9mIGJvdW5kcyBhbmQgbm90IHdyYXBwZWRcbiAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsTnVtQm91bmRzO1xuICAgICAgaWYgKFxuICAgICAgICAoIWNycy53cmFwTG5nICYmIChjb29yZHMueCA8IGJvdW5kcy5taW4ueCB8fCBjb29yZHMueCA+IGJvdW5kcy5tYXgueCkpIHx8XG4gICAgICAgICghY3JzLndyYXBMYXQgJiYgKGNvb3Jkcy55IDwgYm91bmRzLm1pbi55IHx8IGNvb3Jkcy55ID4gYm91bmRzLm1heC55KSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYm91bmRzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBkb24ndCBsb2FkIGNlbGwgaWYgaXQgZG9lc24ndCBpbnRlcnNlY3QgdGhlIGJvdW5kcyBpbiBvcHRpb25zXG4gICAgdmFyIGNlbGxCb3VuZHMgPSB0aGlzLl9jZWxsQ29vcmRzVG9Cb3VuZHMoY29vcmRzKTtcbiAgICByZXR1cm4gTC5sYXRMbmdCb3VuZHModGhpcy5vcHRpb25zLmJvdW5kcykuaW50ZXJzZWN0cyhjZWxsQm91bmRzKTtcbiAgfSxcblxuICAvLyBjb252ZXJ0cyBjZWxsIGNvb3JkaW5hdGVzIHRvIGl0cyBnZW9ncmFwaGljYWwgYm91bmRzXG4gIF9jZWxsQ29vcmRzVG9Cb3VuZHM6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuICAgIHZhciBjZWxsU2l6ZSA9IHRoaXMub3B0aW9ucy5jZWxsU2l6ZTtcbiAgICB2YXIgbndQb2ludCA9IGNvb3Jkcy5tdWx0aXBseUJ5KGNlbGxTaXplKTtcbiAgICB2YXIgc2VQb2ludCA9IG53UG9pbnQuYWRkKFtjZWxsU2l6ZSwgY2VsbFNpemVdKTtcbiAgICB2YXIgbncgPSBtYXAud3JhcExhdExuZyhtYXAudW5wcm9qZWN0KG53UG9pbnQsIGNvb3Jkcy56KSk7XG4gICAgdmFyIHNlID0gbWFwLndyYXBMYXRMbmcobWFwLnVucHJvamVjdChzZVBvaW50LCBjb29yZHMueikpO1xuXG4gICAgcmV0dXJuIEwubGF0TG5nQm91bmRzKG53LCBzZSk7XG4gIH0sXG5cbiAgLy8gY29udmVydHMgY2VsbCBjb29yZGluYXRlcyB0byBrZXkgZm9yIHRoZSBjZWxsIGNhY2hlXG4gIF9jZWxsQ29vcmRzVG9LZXk6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICByZXR1cm4gY29vcmRzLnggKyAnOicgKyBjb29yZHMueTtcbiAgfSxcblxuICAvLyBjb252ZXJ0cyBjZWxsIGNhY2hlIGtleSB0byBjb29yZGlhbnRlc1xuICBfa2V5VG9DZWxsQ29vcmRzOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGtBcnIgPSBrZXkuc3BsaXQoJzonKTtcbiAgICB2YXIgeCA9IHBhcnNlSW50KGtBcnJbMF0sIDEwKTtcbiAgICB2YXIgeSA9IHBhcnNlSW50KGtBcnJbMV0sIDEwKTtcblxuICAgIHJldHVybiBMLnBvaW50KHgsIHkpO1xuICB9LFxuXG4gIC8vIHJlbW92ZSBhbnkgcHJlc2VudCBjZWxscyB0aGF0IGFyZSBvZmYgdGhlIHNwZWNpZmllZCBib3VuZHNcbiAgX3JlbW92ZU90aGVyQ2VsbHM6IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICAgIGlmICghYm91bmRzLmNvbnRhaW5zKHRoaXMuX2tleVRvQ2VsbENvb3JkcyhrZXkpKSkge1xuICAgICAgICB0aGlzLl9yZW1vdmVDZWxsKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9yZW1vdmVDZWxsOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLl9hY3RpdmVDZWxsc1trZXldO1xuXG4gICAgaWYgKGNlbGwpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9hY3RpdmVDZWxsc1trZXldO1xuXG4gICAgICBpZiAodGhpcy5jZWxsTGVhdmUpIHtcbiAgICAgICAgdGhpcy5jZWxsTGVhdmUoY2VsbC5ib3VuZHMsIGNlbGwuY29vcmRzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maXJlKCdjZWxsbGVhdmUnLCB7XG4gICAgICAgIGJvdW5kczogY2VsbC5ib3VuZHMsXG4gICAgICAgIGNvb3JkczogY2VsbC5jb29yZHNcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBfcmVtb3ZlQ2VsbHM6IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsc1trZXldLmJvdW5kcztcbiAgICAgIHZhciBjb29yZHMgPSB0aGlzLl9jZWxsc1trZXldLmNvb3JkcztcblxuICAgICAgaWYgKHRoaXMuY2VsbExlYXZlKSB7XG4gICAgICAgIHRoaXMuY2VsbExlYXZlKGJvdW5kcywgY29vcmRzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maXJlKCdjZWxsbGVhdmUnLCB7XG4gICAgICAgIGJvdW5kczogYm91bmRzLFxuICAgICAgICBjb29yZHM6IGNvb3Jkc1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIF9hZGRDZWxsOiBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgLy8gd3JhcCBjZWxsIGNvb3JkcyBpZiBuZWNlc3NhcnkgKGRlcGVuZGluZyBvbiBDUlMpXG4gICAgdGhpcy5fd3JhcENvb3Jkcyhjb29yZHMpO1xuXG4gICAgLy8gZ2VuZXJhdGUgdGhlIGNlbGwga2V5XG4gICAgdmFyIGtleSA9IHRoaXMuX2NlbGxDb29yZHNUb0tleShjb29yZHMpO1xuXG4gICAgLy8gZ2V0IHRoZSBjZWxsIGZyb20gdGhlIGNhY2hlXG4gICAgdmFyIGNlbGwgPSB0aGlzLl9jZWxsc1trZXldO1xuICAgIC8vIGlmIHRoaXMgY2VsbCBzaG91bGQgYmUgc2hvd24gYXMgaXNudCBhY3RpdmUgeWV0IChlbnRlcilcblxuICAgIGlmIChjZWxsICYmICF0aGlzLl9hY3RpdmVDZWxsc1trZXldKSB7XG4gICAgICBpZiAodGhpcy5jZWxsRW50ZXIpIHtcbiAgICAgICAgdGhpcy5jZWxsRW50ZXIoY2VsbC5ib3VuZHMsIGNvb3Jkcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlyZSgnY2VsbGVudGVyJywge1xuICAgICAgICBib3VuZHM6IGNlbGwuYm91bmRzLFxuICAgICAgICBjb29yZHM6IGNvb3Jkc1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2FjdGl2ZUNlbGxzW2tleV0gPSBjZWxsO1xuICAgIH1cblxuICAgIC8vIGlmIHdlIGRvbnQgaGF2ZSB0aGlzIGNlbGwgaW4gdGhlIGNhY2hlIHlldCAoY3JlYXRlKVxuICAgIGlmICghY2VsbCkge1xuICAgICAgY2VsbCA9IHtcbiAgICAgICAgY29vcmRzOiBjb29yZHMsXG4gICAgICAgIGJvdW5kczogdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3JkcylcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX2NlbGxzW2tleV0gPSBjZWxsO1xuICAgICAgdGhpcy5fYWN0aXZlQ2VsbHNba2V5XSA9IGNlbGw7XG5cbiAgICAgIGlmICh0aGlzLmNyZWF0ZUNlbGwpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVDZWxsKGNlbGwuYm91bmRzLCBjb29yZHMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmUoJ2NlbGxjcmVhdGUnLCB7XG4gICAgICAgIGJvdW5kczogY2VsbC5ib3VuZHMsXG4gICAgICAgIGNvb3JkczogY29vcmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX3dyYXBDb29yZHM6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICBjb29yZHMueCA9IHRoaXMuX3dyYXBMbmcgPyBMLlV0aWwud3JhcE51bShjb29yZHMueCwgdGhpcy5fd3JhcExuZykgOiBjb29yZHMueDtcbiAgICBjb29yZHMueSA9IHRoaXMuX3dyYXBMYXQgPyBMLlV0aWwud3JhcE51bShjb29yZHMueSwgdGhpcy5fd3JhcExhdCkgOiBjb29yZHMueTtcbiAgfSxcblxuICAvLyBnZXQgdGhlIGdsb2JhbCBjZWxsIGNvb3JkaW5hdGVzIHJhbmdlIGZvciB0aGUgY3VycmVudCB6b29tXG4gIF9nZXRDZWxsTnVtQm91bmRzOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRQaXhlbFdvcmxkQm91bmRzKCk7XG4gICAgdmFyIHNpemUgPSB0aGlzLl9nZXRDZWxsU2l6ZSgpO1xuXG4gICAgcmV0dXJuIGJvdW5kcyA/IEwuYm91bmRzKFxuICAgICAgICBib3VuZHMubWluLmRpdmlkZUJ5KHNpemUpLmZsb29yKCksXG4gICAgICAgIGJvdW5kcy5tYXguZGl2aWRlQnkoc2l6ZSkuY2VpbCgpLnN1YnRyYWN0KFsxLCAxXSkpIDogbnVsbDtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFZpcnR1YWxHcmlkO1xuIiwiZnVuY3Rpb24gQmluYXJ5U2VhcmNoSW5kZXggKHZhbHVlcykge1xuICB0aGlzLnZhbHVlcyA9IFtdLmNvbmNhdCh2YWx1ZXMgfHwgW10pO1xufVxuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleCh2YWx1ZSk7XG4gIHJldHVybiB0aGlzLnZhbHVlc1tpbmRleF07XG59O1xuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUuZ2V0SW5kZXggPSBmdW5jdGlvbiBnZXRJbmRleCAodmFsdWUpIHtcbiAgaWYgKHRoaXMuZGlydHkpIHtcbiAgICB0aGlzLnNvcnQoKTtcbiAgfVxuXG4gIHZhciBtaW5JbmRleCA9IDA7XG4gIHZhciBtYXhJbmRleCA9IHRoaXMudmFsdWVzLmxlbmd0aCAtIDE7XG4gIHZhciBjdXJyZW50SW5kZXg7XG4gIHZhciBjdXJyZW50RWxlbWVudDtcblxuICB3aGlsZSAobWluSW5kZXggPD0gbWF4SW5kZXgpIHtcbiAgICBjdXJyZW50SW5kZXggPSAobWluSW5kZXggKyBtYXhJbmRleCkgLyAyIHwgMDtcbiAgICBjdXJyZW50RWxlbWVudCA9IHRoaXMudmFsdWVzW01hdGgucm91bmQoY3VycmVudEluZGV4KV07XG4gICAgaWYgKCtjdXJyZW50RWxlbWVudC52YWx1ZSA8ICt2YWx1ZSkge1xuICAgICAgbWluSW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xuICAgIH0gZWxzZSBpZiAoK2N1cnJlbnRFbGVtZW50LnZhbHVlID4gK3ZhbHVlKSB7XG4gICAgICBtYXhJbmRleCA9IGN1cnJlbnRJbmRleCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdXJyZW50SW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE1hdGguYWJzKH5tYXhJbmRleCk7XG59O1xuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUuYmV0d2VlbiA9IGZ1bmN0aW9uIGJldHdlZW4gKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHN0YXJ0SW5kZXggPSB0aGlzLmdldEluZGV4KHN0YXJ0KTtcbiAgdmFyIGVuZEluZGV4ID0gdGhpcy5nZXRJbmRleChlbmQpO1xuXG4gIGlmIChzdGFydEluZGV4ID09PSAwICYmIGVuZEluZGV4ID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgd2hpbGUgKHRoaXMudmFsdWVzW3N0YXJ0SW5kZXggLSAxXSAmJiB0aGlzLnZhbHVlc1tzdGFydEluZGV4IC0gMV0udmFsdWUgPT09IHN0YXJ0KSB7XG4gICAgc3RhcnRJbmRleC0tO1xuICB9XG5cbiAgd2hpbGUgKHRoaXMudmFsdWVzW2VuZEluZGV4ICsgMV0gJiYgdGhpcy52YWx1ZXNbZW5kSW5kZXggKyAxXS52YWx1ZSA9PT0gZW5kKSB7XG4gICAgZW5kSW5kZXgrKztcbiAgfVxuXG4gIGlmICh0aGlzLnZhbHVlc1tlbmRJbmRleF0gJiYgdGhpcy52YWx1ZXNbZW5kSW5kZXhdLnZhbHVlID09PSBlbmQgJiYgdGhpcy52YWx1ZXNbZW5kSW5kZXggKyAxXSkge1xuICAgIGVuZEluZGV4Kys7XG4gIH1cblxuICByZXR1cm4gdGhpcy52YWx1ZXMuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xufTtcblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIGluc2VydCAoaXRlbSkge1xuICB0aGlzLnZhbHVlcy5zcGxpY2UodGhpcy5nZXRJbmRleChpdGVtLnZhbHVlKSwgMCwgaXRlbSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLmJ1bGtBZGQgPSBmdW5jdGlvbiBidWxrQWRkIChpdGVtcywgc29ydCkge1xuICB0aGlzLnZhbHVlcyA9IHRoaXMudmFsdWVzLmNvbmNhdChbXS5jb25jYXQoaXRlbXMgfHwgW10pKTtcblxuICBpZiAoc29ydCkge1xuICAgIHRoaXMuc29ydCgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUuc29ydCA9IGZ1bmN0aW9uIHNvcnQgKCkge1xuICB0aGlzLnZhbHVlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuICtiLnZhbHVlIC0gK2EudmFsdWU7XG4gIH0pLnJldmVyc2UoKTtcbiAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJpbmFyeVNlYXJjaEluZGV4O1xuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IGZlYXR1cmVMYXllclNlcnZpY2UgZnJvbSAnLi4vLi4vU2VydmljZXMvRmVhdHVyZUxheWVyU2VydmljZSc7XG5pbXBvcnQgeyBjbGVhblVybCwgd2Fybiwgc2V0RXNyaUF0dHJpYnV0aW9uIH0gZnJvbSAnLi4vLi4vVXRpbCc7XG5pbXBvcnQgVmlydHVhbEdyaWQgZnJvbSAnbGVhZmxldC12aXJ0dWFsLWdyaWQnO1xuaW1wb3J0IEJpbmFyeVNlYXJjaEluZGV4IGZyb20gJ3RpbnktYmluYXJ5LXNlYXJjaCc7XG5cbmV4cG9ydCB2YXIgRmVhdHVyZU1hbmFnZXIgPSBWaXJ0dWFsR3JpZC5leHRlbmQoe1xuICAvKipcbiAgICogT3B0aW9uc1xuICAgKi9cblxuICBvcHRpb25zOiB7XG4gICAgYXR0cmlidXRpb246IG51bGwsXG4gICAgd2hlcmU6ICcxPTEnLFxuICAgIGZpZWxkczogWycqJ10sXG4gICAgZnJvbTogZmFsc2UsXG4gICAgdG86IGZhbHNlLFxuICAgIHRpbWVGaWVsZDogZmFsc2UsXG4gICAgdGltZUZpbHRlck1vZGU6ICdzZXJ2ZXInLFxuICAgIHNpbXBsaWZ5RmFjdG9yOiAwLFxuICAgIHByZWNpc2lvbjogNlxuICB9LFxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKi9cblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIFZpcnR1YWxHcmlkLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICBvcHRpb25zLnVybCA9IGNsZWFuVXJsKG9wdGlvbnMudXJsKTtcbiAgICBvcHRpb25zID0gVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5zZXJ2aWNlID0gZmVhdHVyZUxheWVyU2VydmljZShvcHRpb25zKTtcbiAgICB0aGlzLnNlcnZpY2UuYWRkRXZlbnRQYXJlbnQodGhpcyk7XG5cbiAgICAvLyB1c2UgY2FzZSBpbnNlbnNpdGl2ZSByZWdleCB0byBsb29rIGZvciBjb21tb24gZmllbGRuYW1lcyB1c2VkIGZvciBpbmRleGluZ1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZmllbGRzWzBdICE9PSAnKicpIHtcbiAgICAgIHZhciBvaWRDaGVjayA9IGZhbHNlO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMuZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZmllbGRzW2ldLm1hdGNoKC9eKE9CSkVDVElEfEZJRHxPSUR8SUQpJC9pKSkge1xuICAgICAgICAgIG9pZENoZWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9pZENoZWNrID09PSBmYWxzZSkge1xuICAgICAgICB3YXJuKCdubyBrbm93biBlc3JpRmllbGRUeXBlT0lEIGZpZWxkIGRldGVjdGVkIGluIGZpZWxkcyBBcnJheS4gIFBsZWFzZSBhZGQgYW4gYXR0cmlidXRlIGZpZWxkIGNvbnRhaW5pbmcgdW5pcXVlIElEcyB0byBlbnN1cmUgdGhlIGxheWVyIGNhbiBiZSBkcmF3biBjb3JyZWN0bHkuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnQgJiYgdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmQpIHtcbiAgICAgIHRoaXMuX3N0YXJ0VGltZUluZGV4ID0gbmV3IEJpbmFyeVNlYXJjaEluZGV4KCk7XG4gICAgICB0aGlzLl9lbmRUaW1lSW5kZXggPSBuZXcgQmluYXJ5U2VhcmNoSW5kZXgoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQpIHtcbiAgICAgIHRoaXMuX3RpbWVJbmRleCA9IG5ldyBCaW5hcnlTZWFyY2hJbmRleCgpO1xuICAgIH1cblxuICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgdGhpcy5fY3VycmVudFNuYXBzaG90ID0gW107IC8vIGNhY2hlIG9mIHdoYXQgbGF5ZXJzIHNob3VsZCBiZSBhY3RpdmVcbiAgICB0aGlzLl9hY3RpdmVSZXF1ZXN0cyA9IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIExheWVyIEludGVyZmFjZVxuICAgKi9cblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIC8vIGluY2x1ZGUgJ1Bvd2VyZWQgYnkgRXNyaScgaW4gbWFwIGF0dHJpYnV0aW9uXG4gICAgc2V0RXNyaUF0dHJpYnV0aW9uKG1hcCk7XG5cbiAgICB0aGlzLnNlcnZpY2UubWV0YWRhdGEoZnVuY3Rpb24gKGVyciwgbWV0YWRhdGEpIHtcbiAgICAgIGlmICghZXJyKSB7XG4gICAgICAgIHZhciBzdXBwb3J0ZWRGb3JtYXRzID0gbWV0YWRhdGEuc3VwcG9ydGVkUXVlcnlGb3JtYXRzO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHNvbWVvbmUgaGFzIHJlcXVlc3RlZCB0aGF0IHdlIGRvbid0IHVzZSBnZW9KU09OLCBldmVuIGlmIGl0J3MgYXZhaWxhYmxlXG4gICAgICAgIHZhciBmb3JjZUpzb25Gb3JtYXQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuc2VydmljZS5vcHRpb25zLmlzTW9kZXJuID09PSBmYWxzZSkge1xuICAgICAgICAgIGZvcmNlSnNvbkZvcm1hdCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVbmxlc3Mgd2UndmUgYmVlbiB0b2xkIG90aGVyd2lzZSwgY2hlY2sgdG8gc2VlIHdoZXRoZXIgc2VydmljZSBjYW4gZW1pdCBHZW9KU09OIG5hdGl2ZWx5XG4gICAgICAgIGlmICghZm9yY2VKc29uRm9ybWF0ICYmIHN1cHBvcnRlZEZvcm1hdHMgJiYgc3VwcG9ydGVkRm9ybWF0cy5pbmRleE9mKCdnZW9KU09OJykgIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5zZXJ2aWNlLm9wdGlvbnMuaXNNb2Rlcm4gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIGNvcHlyaWdodCB0ZXh0IGxpc3RlZCBpbiBzZXJ2aWNlIG1ldGFkYXRhXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uICYmIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wgJiYgbWV0YWRhdGEuY29weXJpZ2h0VGV4dCkge1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbiA9IG1ldGFkYXRhLmNvcHlyaWdodFRleHQ7XG4gICAgICAgICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5hZGRBdHRyaWJ1dGlvbih0aGlzLmdldEF0dHJpYnV0aW9uKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBtYXAub24oJ3pvb21lbmQnLCB0aGlzLl9oYW5kbGVab29tQ2hhbmdlLCB0aGlzKTtcblxuICAgIHJldHVybiBWaXJ0dWFsR3JpZC5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgbWFwLm9mZignem9vbWVuZCcsIHRoaXMuX2hhbmRsZVpvb21DaGFuZ2UsIHRoaXMpO1xuXG4gICAgcmV0dXJuIFZpcnR1YWxHcmlkLnByb3RvdHlwZS5vblJlbW92ZS5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG5cbiAgZ2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGZWF0dXJlIE1hbmFnZW1lbnRcbiAgICovXG5cbiAgY3JlYXRlQ2VsbDogZnVuY3Rpb24gKGJvdW5kcywgY29vcmRzKSB7XG4gICAgLy8gZG9udCBmZXRjaCBmZWF0dXJlcyBvdXRzaWRlIHRoZSBzY2FsZSByYW5nZSBkZWZpbmVkIGZvciB0aGUgbGF5ZXJcbiAgICBpZiAodGhpcy5fdmlzaWJsZVpvb20oKSkge1xuICAgICAgdGhpcy5fcmVxdWVzdEZlYXR1cmVzKGJvdW5kcywgY29vcmRzKTtcbiAgICB9XG4gIH0sXG5cbiAgX3JlcXVlc3RGZWF0dXJlczogZnVuY3Rpb24gKGJvdW5kcywgY29vcmRzLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2FjdGl2ZVJlcXVlc3RzKys7XG5cbiAgICAvLyBvdXIgZmlyc3QgYWN0aXZlIHJlcXVlc3QgZmlyZXMgbG9hZGluZ1xuICAgIGlmICh0aGlzLl9hY3RpdmVSZXF1ZXN0cyA9PT0gMSkge1xuICAgICAgdGhpcy5maXJlKCdsb2FkaW5nJywge1xuICAgICAgICBib3VuZHM6IGJvdW5kc1xuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2J1aWxkUXVlcnkoYm91bmRzKS5ydW4oZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlQ29sbGVjdGlvbiwgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5leGNlZWRlZFRyYW5zZmVyTGltaXQpIHtcbiAgICAgICAgdGhpcy5maXJlKCdkcmF3bGltaXRleGNlZWRlZCcpO1xuICAgICAgfVxuXG4gICAgICAvLyBubyBlcnJvciwgZmVhdHVyZXNcbiAgICAgIGlmICghZXJyb3IgJiYgZmVhdHVyZUNvbGxlY3Rpb24gJiYgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIHNjaGVkdWxlIGFkZGluZyBmZWF0dXJlcyB1bnRpbCB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWVcbiAgICAgICAgVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKFV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5fYWRkRmVhdHVyZXMoZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMsIGNvb3Jkcyk7XG4gICAgICAgICAgdGhpcy5fcG9zdFByb2Nlc3NGZWF0dXJlcyhib3VuZHMpO1xuICAgICAgICB9LCB0aGlzKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIG5vIGVycm9yLCBubyBmZWF0dXJlc1xuICAgICAgaWYgKCFlcnJvciAmJiBmZWF0dXJlQ29sbGVjdGlvbiAmJiAhZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX3Bvc3RQcm9jZXNzRmVhdHVyZXMoYm91bmRzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHRoaXMuX3Bvc3RQcm9jZXNzRmVhdHVyZXMoYm91bmRzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZXJyb3IsIGZlYXR1cmVDb2xsZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBfcG9zdFByb2Nlc3NGZWF0dXJlczogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIC8vIGRlaW5jcmVtZW50IHRoZSByZXF1ZXN0IGNvdW50ZXIgbm93IHRoYXQgd2UgaGF2ZSBwcm9jZXNzZWQgZmVhdHVyZXNcbiAgICB0aGlzLl9hY3RpdmVSZXF1ZXN0cy0tO1xuXG4gICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgYWN0aXZlIHJlcXVlc3RzIGZpcmUgYSBsb2FkIGV2ZW50IGZvciB0aGlzIHZpZXdcbiAgICBpZiAodGhpcy5fYWN0aXZlUmVxdWVzdHMgPD0gMCkge1xuICAgICAgdGhpcy5maXJlKCdsb2FkJywge1xuICAgICAgICBib3VuZHM6IGJvdW5kc1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIF9jYWNoZUtleTogZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIHJldHVybiBjb29yZHMueiArICc6JyArIGNvb3Jkcy54ICsgJzonICsgY29vcmRzLnk7XG4gIH0sXG5cbiAgX2FkZEZlYXR1cmVzOiBmdW5jdGlvbiAoZmVhdHVyZXMsIGNvb3Jkcykge1xuICAgIHZhciBrZXkgPSB0aGlzLl9jYWNoZUtleShjb29yZHMpO1xuICAgIHRoaXMuX2NhY2hlW2tleV0gPSB0aGlzLl9jYWNoZVtrZXldIHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IGZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgaWQgPSBmZWF0dXJlc1tpXS5pZDtcblxuICAgICAgaWYgKHRoaXMuX2N1cnJlbnRTbmFwc2hvdC5pbmRleE9mKGlkKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFNuYXBzaG90LnB1c2goaWQpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX2NhY2hlW2tleV0uaW5kZXhPZihpZCkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlW2tleV0ucHVzaChpZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQpIHtcbiAgICAgIHRoaXMuX2J1aWxkVGltZUluZGV4ZXMoZmVhdHVyZXMpO1xuICAgIH1cblxuICAgIHRoaXMuY3JlYXRlTGF5ZXJzKGZlYXR1cmVzKTtcbiAgfSxcblxuICBfYnVpbGRRdWVyeTogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIHZhciBxdWVyeSA9IHRoaXMuc2VydmljZS5xdWVyeSgpXG4gICAgICAuaW50ZXJzZWN0cyhib3VuZHMpXG4gICAgICAud2hlcmUodGhpcy5vcHRpb25zLndoZXJlKVxuICAgICAgLmZpZWxkcyh0aGlzLm9wdGlvbnMuZmllbGRzKVxuICAgICAgLnByZWNpc2lvbih0aGlzLm9wdGlvbnMucHJlY2lzaW9uKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2ltcGxpZnlGYWN0b3IpIHtcbiAgICAgIHF1ZXJ5LnNpbXBsaWZ5KHRoaXMuX21hcCwgdGhpcy5vcHRpb25zLnNpbXBsaWZ5RmFjdG9yKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWx0ZXJNb2RlID09PSAnc2VydmVyJyAmJiB0aGlzLm9wdGlvbnMuZnJvbSAmJiB0aGlzLm9wdGlvbnMudG8pIHtcbiAgICAgIHF1ZXJ5LmJldHdlZW4odGhpcy5vcHRpb25zLmZyb20sIHRoaXMub3B0aW9ucy50byk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9LFxuXG4gIC8qKlxuICAgKiBXaGVyZSBNZXRob2RzXG4gICAqL1xuXG4gIHNldFdoZXJlOiBmdW5jdGlvbiAod2hlcmUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5vcHRpb25zLndoZXJlID0gKHdoZXJlICYmIHdoZXJlLmxlbmd0aCkgPyB3aGVyZSA6ICcxPTEnO1xuXG4gICAgdmFyIG9sZFNuYXBzaG90ID0gW107XG4gICAgdmFyIG5ld1NuYXBzaG90ID0gW107XG4gICAgdmFyIHBlbmRpbmdSZXF1ZXN0cyA9IDA7XG4gICAgdmFyIHJlcXVlc3RFcnJvciA9IG51bGw7XG4gICAgdmFyIHJlcXVlc3RDYWxsYmFjayA9IFV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIGZlYXR1cmVDb2xsZWN0aW9uKSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVxdWVzdEVycm9yID0gZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGlmIChmZWF0dXJlQ29sbGVjdGlvbikge1xuICAgICAgICBmb3IgKHZhciBpID0gZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBuZXdTbmFwc2hvdC5wdXNoKGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzW2ldLmlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwZW5kaW5nUmVxdWVzdHMtLTtcblxuICAgICAgaWYgKHBlbmRpbmdSZXF1ZXN0cyA8PSAwICYmIHRoaXMuX3Zpc2libGVab29tKCkpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFNuYXBzaG90ID0gbmV3U25hcHNob3Q7XG4gICAgICAgIC8vIHNjaGVkdWxlIGFkZGluZyBmZWF0dXJlcyBmb3IgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXG4gICAgICAgIFV0aWwucmVxdWVzdEFuaW1GcmFtZShVdGlsLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKG9sZFNuYXBzaG90KTtcbiAgICAgICAgICB0aGlzLmFkZExheWVycyhuZXdTbmFwc2hvdCk7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHJlcXVlc3RFcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBmb3IgKHZhciBpID0gdGhpcy5fY3VycmVudFNuYXBzaG90Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBvbGRTbmFwc2hvdC5wdXNoKHRoaXMuX2N1cnJlbnRTbmFwc2hvdFtpXSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2FjdGl2ZUNlbGxzKSB7XG4gICAgICBwZW5kaW5nUmVxdWVzdHMrKztcbiAgICAgIHZhciBjb29yZHMgPSB0aGlzLl9rZXlUb0NlbGxDb29yZHMoa2V5KTtcbiAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsQ29vcmRzVG9Cb3VuZHMoY29vcmRzKTtcbiAgICAgIHRoaXMuX3JlcXVlc3RGZWF0dXJlcyhib3VuZHMsIGtleSwgcmVxdWVzdENhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRXaGVyZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMud2hlcmU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRpbWUgUmFuZ2UgTWV0aG9kc1xuICAgKi9cblxuICBnZXRUaW1lUmFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gW3RoaXMub3B0aW9ucy5mcm9tLCB0aGlzLm9wdGlvbnMudG9dO1xuICB9LFxuXG4gIHNldFRpbWVSYW5nZTogZnVuY3Rpb24gKGZyb20sIHRvLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciBvbGRGcm9tID0gdGhpcy5vcHRpb25zLmZyb207XG4gICAgdmFyIG9sZFRvID0gdGhpcy5vcHRpb25zLnRvO1xuICAgIHZhciBwZW5kaW5nUmVxdWVzdHMgPSAwO1xuICAgIHZhciByZXF1ZXN0RXJyb3IgPSBudWxsO1xuICAgIHZhciByZXF1ZXN0Q2FsbGJhY2sgPSBVdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVxdWVzdEVycm9yID0gZXJyb3I7XG4gICAgICB9XG4gICAgICB0aGlzLl9maWx0ZXJFeGlzdGluZ0ZlYXR1cmVzKG9sZEZyb20sIG9sZFRvLCBmcm9tLCB0byk7XG5cbiAgICAgIHBlbmRpbmdSZXF1ZXN0cy0tO1xuXG4gICAgICBpZiAoY2FsbGJhY2sgJiYgcGVuZGluZ1JlcXVlc3RzIDw9IDApIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCByZXF1ZXN0RXJyb3IpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgdGhpcy5vcHRpb25zLmZyb20gPSBmcm9tO1xuICAgIHRoaXMub3B0aW9ucy50byA9IHRvO1xuXG4gICAgdGhpcy5fZmlsdGVyRXhpc3RpbmdGZWF0dXJlcyhvbGRGcm9tLCBvbGRUbywgZnJvbSwgdG8pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmlsdGVyTW9kZSA9PT0gJ3NlcnZlcicpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9hY3RpdmVDZWxscykge1xuICAgICAgICBwZW5kaW5nUmVxdWVzdHMrKztcbiAgICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuX2tleVRvQ2VsbENvb3JkcyhrZXkpO1xuICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3Jkcyk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RGZWF0dXJlcyhib3VuZHMsIGtleSwgcmVxdWVzdENhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2FjdGl2ZUNlbGxzKSB7XG4gICAgICB2YXIgY29vcmRzID0gdGhpcy5fa2V5VG9DZWxsQ29vcmRzKGtleSk7XG4gICAgICB2YXIgYm91bmRzID0gdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3Jkcyk7XG4gICAgICB0aGlzLl9yZXF1ZXN0RmVhdHVyZXMoYm91bmRzLCBrZXkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlZHJhdykge1xuICAgICAgdGhpcy5vbmNlKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgIHRoaXMuX3JlZHJhdyhsYXllci5mZWF0dXJlLmlkKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gIH0sXG5cbiAgX2ZpbHRlckV4aXN0aW5nRmVhdHVyZXM6IGZ1bmN0aW9uIChvbGRGcm9tLCBvbGRUbywgbmV3RnJvbSwgbmV3VG8pIHtcbiAgICB2YXIgbGF5ZXJzVG9SZW1vdmUgPSAob2xkRnJvbSAmJiBvbGRUbykgPyB0aGlzLl9nZXRGZWF0dXJlc0luVGltZVJhbmdlKG9sZEZyb20sIG9sZFRvKSA6IHRoaXMuX2N1cnJlbnRTbmFwc2hvdDtcbiAgICB2YXIgbGF5ZXJzVG9BZGQgPSB0aGlzLl9nZXRGZWF0dXJlc0luVGltZVJhbmdlKG5ld0Zyb20sIG5ld1RvKTtcblxuICAgIGlmIChsYXllcnNUb0FkZC5pbmRleE9mKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxheWVyc1RvQWRkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzaG91bGRSZW1vdmVMYXllciA9IGxheWVyc1RvUmVtb3ZlLmluZGV4T2YobGF5ZXJzVG9BZGRbaV0pO1xuICAgICAgICBpZiAoc2hvdWxkUmVtb3ZlTGF5ZXIgPj0gMCkge1xuICAgICAgICAgIGxheWVyc1RvUmVtb3ZlLnNwbGljZShzaG91bGRSZW1vdmVMYXllciwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzY2hlZHVsZSBhZGRpbmcgZmVhdHVyZXMgdW50aWwgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXG4gICAgVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKFV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlbW92ZUxheWVycyhsYXllcnNUb1JlbW92ZSk7XG4gICAgICB0aGlzLmFkZExheWVycyhsYXllcnNUb0FkZCk7XG4gICAgfSwgdGhpcykpO1xuICB9LFxuXG4gIF9nZXRGZWF0dXJlc0luVGltZVJhbmdlOiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgIHZhciBpZHMgPSBbXTtcbiAgICB2YXIgc2VhcmNoO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnQgJiYgdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmQpIHtcbiAgICAgIHZhciBzdGFydFRpbWVzID0gdGhpcy5fc3RhcnRUaW1lSW5kZXguYmV0d2VlbihzdGFydCwgZW5kKTtcbiAgICAgIHZhciBlbmRUaW1lcyA9IHRoaXMuX2VuZFRpbWVJbmRleC5iZXR3ZWVuKHN0YXJ0LCBlbmQpO1xuICAgICAgc2VhcmNoID0gc3RhcnRUaW1lcy5jb25jYXQoZW5kVGltZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWFyY2ggPSB0aGlzLl90aW1lSW5kZXguYmV0d2VlbihzdGFydCwgZW5kKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gc2VhcmNoLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBpZHMucHVzaChzZWFyY2hbaV0uaWQpO1xuICAgIH1cblxuICAgIHJldHVybiBpZHM7XG4gIH0sXG5cbiAgX2J1aWxkVGltZUluZGV4ZXM6IGZ1bmN0aW9uIChnZW9qc29uKSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIGZlYXR1cmU7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnQgJiYgdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmQpIHtcbiAgICAgIHZhciBzdGFydFRpbWVFbnRyaWVzID0gW107XG4gICAgICB2YXIgZW5kVGltZUVudHJpZXMgPSBbXTtcbiAgICAgIGZvciAoaSA9IGdlb2pzb24ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgZmVhdHVyZSA9IGdlb2pzb25baV07XG4gICAgICAgIHN0YXJ0VGltZUVudHJpZXMucHVzaCh7XG4gICAgICAgICAgaWQ6IGZlYXR1cmUuaWQsXG4gICAgICAgICAgdmFsdWU6IG5ldyBEYXRlKGZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0XSlcbiAgICAgICAgfSk7XG4gICAgICAgIGVuZFRpbWVFbnRyaWVzLnB1c2goe1xuICAgICAgICAgIGlkOiBmZWF0dXJlLmlkLFxuICAgICAgICAgIHZhbHVlOiBuZXcgRGF0ZShmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmRdKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3N0YXJ0VGltZUluZGV4LmJ1bGtBZGQoc3RhcnRUaW1lRW50cmllcyk7XG4gICAgICB0aGlzLl9lbmRUaW1lSW5kZXguYnVsa0FkZChlbmRUaW1lRW50cmllcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0aW1lRW50cmllcyA9IFtdO1xuICAgICAgZm9yIChpID0gZ2VvanNvbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBmZWF0dXJlID0gZ2VvanNvbltpXTtcbiAgICAgICAgdGltZUVudHJpZXMucHVzaCh7XG4gICAgICAgICAgaWQ6IGZlYXR1cmUuaWQsXG4gICAgICAgICAgdmFsdWU6IG5ldyBEYXRlKGZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkXSlcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3RpbWVJbmRleC5idWxrQWRkKHRpbWVFbnRyaWVzKTtcbiAgICB9XG4gIH0sXG5cbiAgX2ZlYXR1cmVXaXRoaW5UaW1lUmFuZ2U6IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZnJvbSB8fCAhdGhpcy5vcHRpb25zLnRvKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgZnJvbSA9ICt0aGlzLm9wdGlvbnMuZnJvbS52YWx1ZU9mKCk7XG4gICAgdmFyIHRvID0gK3RoaXMub3B0aW9ucy50by52YWx1ZU9mKCk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy50aW1lRmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgZGF0ZSA9ICtmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnRpbWVGaWVsZF07XG4gICAgICByZXR1cm4gKGRhdGUgPj0gZnJvbSkgJiYgKGRhdGUgPD0gdG8pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0ICYmIHRoaXMub3B0aW9ucy50aW1lRmllbGQuZW5kKSB7XG4gICAgICB2YXIgc3RhcnREYXRlID0gK2ZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0XTtcbiAgICAgIHZhciBlbmREYXRlID0gK2ZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMudGltZUZpZWxkLmVuZF07XG4gICAgICByZXR1cm4gKChzdGFydERhdGUgPj0gZnJvbSkgJiYgKHN0YXJ0RGF0ZSA8PSB0bykpIHx8ICgoZW5kRGF0ZSA+PSBmcm9tKSAmJiAoZW5kRGF0ZSA8PSB0bykpO1xuICAgIH1cbiAgfSxcblxuICBfdmlzaWJsZVpvb206IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBjaGVjayB0byBzZWUgd2hldGhlciB0aGUgY3VycmVudCB6b29tIGxldmVsIG9mIHRoZSBtYXAgaXMgd2l0aGluIHRoZSBvcHRpb25hbCBsaW1pdCBkZWZpbmVkIGZvciB0aGUgRmVhdHVyZUxheWVyXG4gICAgaWYgKCF0aGlzLl9tYXApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuICAgIGlmICh6b29tID4gdGhpcy5vcHRpb25zLm1heFpvb20gfHwgem9vbSA8IHRoaXMub3B0aW9ucy5taW5ab29tKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHsgcmV0dXJuIHRydWU7IH1cbiAgfSxcblxuICBfaGFuZGxlWm9vbUNoYW5nZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fdmlzaWJsZVpvb20oKSkge1xuICAgICAgdGhpcy5yZW1vdmVMYXllcnModGhpcy5fY3VycmVudFNuYXBzaG90KTtcbiAgICAgIHRoaXMuX2N1cnJlbnRTbmFwc2hvdCA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKlxuICAgICAgZm9yIGV2ZXJ5IGNlbGwgaW4gdGhpcy5fYWN0aXZlQ2VsbHNcbiAgICAgICAgMS4gR2V0IHRoZSBjYWNoZSBrZXkgZm9yIHRoZSBjb29yZHMgb2YgdGhlIGNlbGxcbiAgICAgICAgMi4gSWYgdGhpcy5fY2FjaGVba2V5XSBleGlzdHMgaXQgd2lsbCBiZSBhbiBhcnJheSBvZiBmZWF0dXJlIElEcy5cbiAgICAgICAgMy4gQ2FsbCB0aGlzLmFkZExheWVycyh0aGlzLl9jYWNoZVtrZXldKSB0byBpbnN0cnVjdCB0aGUgZmVhdHVyZSBsYXllciB0byBhZGQgdGhlIGxheWVycyBiYWNrLlxuICAgICAgKi9cbiAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5fYWN0aXZlQ2VsbHMpIHtcbiAgICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuX2FjdGl2ZUNlbGxzW2ldLmNvb3JkcztcbiAgICAgICAgdmFyIGtleSA9IHRoaXMuX2NhY2hlS2V5KGNvb3Jkcyk7XG4gICAgICAgIGlmICh0aGlzLl9jYWNoZVtrZXldKSB7XG4gICAgICAgICAgdGhpcy5hZGRMYXllcnModGhpcy5fY2FjaGVba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNlcnZpY2UgTWV0aG9kc1xuICAgKi9cblxuICBhdXRoZW50aWNhdGU6IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRoaXMuc2VydmljZS5hdXRoZW50aWNhdGUodG9rZW4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UubWV0YWRhdGEoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5xdWVyeSgpO1xuICB9LFxuXG4gIF9nZXRNZXRhZGF0YTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMuX21ldGFkYXRhKSB7XG4gICAgICB2YXIgZXJyb3I7XG4gICAgICBjYWxsYmFjayhlcnJvciwgdGhpcy5fbWV0YWRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1ldGFkYXRhKFV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhID0gcmVzcG9uc2U7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCB0aGlzLl9tZXRhZGF0YSk7XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfVxuICB9LFxuXG4gIGFkZEZlYXR1cmU6IGZ1bmN0aW9uIChmZWF0dXJlLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuX2dldE1ldGFkYXRhKFV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIG1ldGFkYXRhKSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7IGNhbGxiYWNrLmNhbGwodGhpcywgZXJyb3IsIG51bGwpOyB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXJ2aWNlLmFkZEZlYXR1cmUoZmVhdHVyZSwgVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgIC8vIGFzc2lnbiBJRCBmcm9tIHJlc3VsdCB0byBhcHByb3ByaWF0ZSBvYmplY3RpZCBmaWVsZCBmcm9tIHNlcnZpY2UgbWV0YWRhdGFcbiAgICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXNbbWV0YWRhdGEub2JqZWN0SWRGaWVsZF0gPSByZXNwb25zZS5vYmplY3RJZDtcblxuICAgICAgICAgIC8vIHdlIGFsc28gbmVlZCB0byB1cGRhdGUgdGhlIGdlb2pzb24gaWQgZm9yIGNyZWF0ZUxheWVycygpIHRvIGZ1bmN0aW9uXG4gICAgICAgICAgZmVhdHVyZS5pZCA9IHJlc3BvbnNlLm9iamVjdElkO1xuICAgICAgICAgIHRoaXMuY3JlYXRlTGF5ZXJzKFtmZWF0dXJlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKTtcbiAgICB9LCB0aGlzKSk7XG4gIH0sXG5cbiAgdXBkYXRlRmVhdHVyZTogZnVuY3Rpb24gKGZlYXR1cmUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5zZXJ2aWNlLnVwZGF0ZUZlYXR1cmUoZmVhdHVyZSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICB0aGlzLnJlbW92ZUxheWVycyhbZmVhdHVyZS5pZF0sIHRydWUpO1xuICAgICAgICB0aGlzLmNyZWF0ZUxheWVycyhbZmVhdHVyZV0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIGRlbGV0ZUZlYXR1cmU6IGZ1bmN0aW9uIChpZCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UuZGVsZXRlRmVhdHVyZShpZCwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5vYmplY3RJZCkge1xuICAgICAgICB0aGlzLnJlbW92ZUxheWVycyhbcmVzcG9uc2Uub2JqZWN0SWRdLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgZGVsZXRlRmVhdHVyZXM6IGZ1bmN0aW9uIChpZHMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5kZWxldGVGZWF0dXJlcyhpZHMsIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGlmICghZXJyb3IgJiYgcmVzcG9uc2UubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3BvbnNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMYXllcnMoW3Jlc3BvbnNlW2ldLm9iamVjdElkXSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IHsgVXRpbCwgR2VvSlNPTiwgbGF0TG5nIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBGZWF0dXJlTWFuYWdlciB9IGZyb20gJy4vRmVhdHVyZU1hbmFnZXInO1xuXG5leHBvcnQgdmFyIEZlYXR1cmVMYXllciA9IEZlYXR1cmVNYW5hZ2VyLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIGNhY2hlTGF5ZXJzOiB0cnVlXG4gIH0sXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqL1xuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIEZlYXR1cmVNYW5hZ2VyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fb3JpZ2luYWxTdHlsZSA9IHRoaXMub3B0aW9ucy5zdHlsZTtcbiAgICB0aGlzLl9sYXllcnMgPSB7fTtcbiAgfSxcblxuICAvKipcbiAgICogTGF5ZXIgSW50ZXJmYWNlXG4gICAqL1xuXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgIG1hcC5yZW1vdmVMYXllcih0aGlzLl9sYXllcnNbaV0pO1xuICAgICAgLy8gdHJpZ2dlciB0aGUgZXZlbnQgd2hlbiB0aGUgZW50aXJlIGZlYXR1cmVMYXllciBpcyByZW1vdmVkIGZyb20gdGhlIG1hcFxuICAgICAgdGhpcy5maXJlKCdyZW1vdmVmZWF0dXJlJywge1xuICAgICAgICBmZWF0dXJlOiB0aGlzLl9sYXllcnNbaV0uZmVhdHVyZSxcbiAgICAgICAgcGVybWFuZW50OiBmYWxzZVxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEZlYXR1cmVNYW5hZ2VyLnByb3RvdHlwZS5vblJlbW92ZS5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG5cbiAgY3JlYXRlTmV3TGF5ZXI6IGZ1bmN0aW9uIChnZW9qc29uKSB7XG4gICAgdmFyIGxheWVyID0gR2VvSlNPTi5nZW9tZXRyeVRvTGF5ZXIoZ2VvanNvbiwgdGhpcy5vcHRpb25zKTtcbiAgICBsYXllci5kZWZhdWx0T3B0aW9ucyA9IGxheWVyLm9wdGlvbnM7XG4gICAgcmV0dXJuIGxheWVyO1xuICB9LFxuXG4gIF91cGRhdGVMYXllcjogZnVuY3Rpb24gKGxheWVyLCBnZW9qc29uKSB7XG4gICAgLy8gY29udmVydCB0aGUgZ2VvanNvbiBjb29yZGluYXRlcyBpbnRvIGEgTGVhZmxldCBMYXRMbmcgYXJyYXkvbmVzdGVkIGFycmF5c1xuICAgIC8vIHBhc3MgaXQgdG8gc2V0TGF0TG5ncyB0byB1cGRhdGUgbGF5ZXIgZ2VvbWV0cmllc1xuICAgIHZhciBsYXRsbmdzID0gW107XG4gICAgdmFyIGNvb3Jkc1RvTGF0TG5nID0gdGhpcy5vcHRpb25zLmNvb3Jkc1RvTGF0TG5nIHx8IEdlb0pTT04uY29vcmRzVG9MYXRMbmc7XG5cbiAgICAvLyBjb3B5IG5ldyBhdHRyaWJ1dGVzLCBpZiBwcmVzZW50XG4gICAgaWYgKGdlb2pzb24ucHJvcGVydGllcykge1xuICAgICAgbGF5ZXIuZmVhdHVyZS5wcm9wZXJ0aWVzID0gZ2VvanNvbi5wcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZ2VvanNvbi5nZW9tZXRyeS50eXBlKSB7XG4gICAgICBjYXNlICdQb2ludCc6XG4gICAgICAgIGxhdGxuZ3MgPSBHZW9KU09OLmNvb3Jkc1RvTGF0TG5nKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMpO1xuICAgICAgICBsYXllci5zZXRMYXRMbmcobGF0bG5ncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTGluZVN0cmluZyc6XG4gICAgICAgIGxhdGxuZ3MgPSBHZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCAwLCBjb29yZHNUb0xhdExuZyk7XG4gICAgICAgIGxheWVyLnNldExhdExuZ3MobGF0bG5ncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcbiAgICAgICAgbGF0bG5ncyA9IEdlb0pTT04uY29vcmRzVG9MYXRMbmdzKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIDEsIGNvb3Jkc1RvTGF0TG5nKTtcbiAgICAgICAgbGF5ZXIuc2V0TGF0TG5ncyhsYXRsbmdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQb2x5Z29uJzpcbiAgICAgICAgbGF0bG5ncyA9IEdlb0pTT04uY29vcmRzVG9MYXRMbmdzKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIDEsIGNvb3Jkc1RvTGF0TG5nKTtcbiAgICAgICAgbGF5ZXIuc2V0TGF0TG5ncyhsYXRsbmdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxuICAgICAgICBsYXRsbmdzID0gR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcywgMiwgY29vcmRzVG9MYXRMbmcpO1xuICAgICAgICBsYXllci5zZXRMYXRMbmdzKGxhdGxuZ3MpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZlYXR1cmUgTWFuYWdlbWVudCBNZXRob2RzXG4gICAqL1xuXG4gIGNyZWF0ZUxheWVyczogZnVuY3Rpb24gKGZlYXR1cmVzKSB7XG4gICAgZm9yICh2YXIgaSA9IGZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZ2VvanNvbiA9IGZlYXR1cmVzW2ldO1xuXG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbZ2VvanNvbi5pZF07XG4gICAgICB2YXIgbmV3TGF5ZXI7XG5cbiAgICAgIGlmICh0aGlzLl92aXNpYmxlWm9vbSgpICYmIGxheWVyICYmICF0aGlzLl9tYXAuaGFzTGF5ZXIobGF5ZXIpKSB7XG4gICAgICAgIHRoaXMuX21hcC5hZGRMYXllcihsYXllcik7XG4gICAgICAgIHRoaXMuZmlyZSgnYWRkZmVhdHVyZScsIHtcbiAgICAgICAgICBmZWF0dXJlOiBsYXllci5mZWF0dXJlXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgZ2VvbWV0cnkgaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAobGF5ZXIgJiYgdGhpcy5vcHRpb25zLnNpbXBsaWZ5RmFjdG9yID4gMCAmJiAobGF5ZXIuc2V0TGF0TG5ncyB8fCBsYXllci5zZXRMYXRMbmcpKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxheWVyKGxheWVyLCBnZW9qc29uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFsYXllcikge1xuICAgICAgICBuZXdMYXllciA9IHRoaXMuY3JlYXRlTmV3TGF5ZXIoZ2VvanNvbik7XG4gICAgICAgIG5ld0xheWVyLmZlYXR1cmUgPSBnZW9qc29uO1xuXG4gICAgICAgIC8vIGJ1YmJsZSBldmVudHMgZnJvbSBpbmRpdmlkdWFsIGxheWVycyB0byB0aGUgZmVhdHVyZSBsYXllclxuICAgICAgICBuZXdMYXllci5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm9uRWFjaEZlYXR1cmUpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMub25FYWNoRmVhdHVyZShuZXdMYXllci5mZWF0dXJlLCBuZXdMYXllcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWNoZSB0aGUgbGF5ZXJcbiAgICAgICAgdGhpcy5fbGF5ZXJzW25ld0xheWVyLmZlYXR1cmUuaWRdID0gbmV3TGF5ZXI7XG5cbiAgICAgICAgLy8gc3R5bGUgdGhlIGxheWVyXG4gICAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKG5ld0xheWVyLmZlYXR1cmUuaWQsIHRoaXMub3B0aW9ucy5zdHlsZSk7XG5cbiAgICAgICAgdGhpcy5maXJlKCdjcmVhdGVmZWF0dXJlJywge1xuICAgICAgICAgIGZlYXR1cmU6IG5ld0xheWVyLmZlYXR1cmVcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBsYXllciBpZiB0aGUgY3VycmVudCB6b29tIGxldmVsIGlzIGluc2lkZSB0aGUgcmFuZ2UgZGVmaW5lZCBmb3IgdGhlIGxheWVyLCBpdCBpcyB3aXRoaW4gdGhlIGN1cnJlbnQgdGltZSBib3VuZHMgb3Igb3VyIGxheWVyIGlzIG5vdCB0aW1lIGVuYWJsZWRcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGVab29tKCkgJiYgKCF0aGlzLm9wdGlvbnMudGltZUZpZWxkIHx8ICh0aGlzLm9wdGlvbnMudGltZUZpZWxkICYmIHRoaXMuX2ZlYXR1cmVXaXRoaW5UaW1lUmFuZ2UoZ2VvanNvbikpKSkge1xuICAgICAgICAgIHRoaXMuX21hcC5hZGRMYXllcihuZXdMYXllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgYWRkTGF5ZXJzOiBmdW5jdGlvbiAoaWRzKSB7XG4gICAgZm9yICh2YXIgaSA9IGlkcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkc1tpXV07XG4gICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgdGhpcy5fbWFwLmFkZExheWVyKGxheWVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgcmVtb3ZlTGF5ZXJzOiBmdW5jdGlvbiAoaWRzLCBwZXJtYW5lbnQpIHtcbiAgICBmb3IgKHZhciBpID0gaWRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgaWQgPSBpZHNbaV07XG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgIHRoaXMuZmlyZSgncmVtb3ZlZmVhdHVyZScsIHtcbiAgICAgICAgICBmZWF0dXJlOiBsYXllci5mZWF0dXJlLFxuICAgICAgICAgIHBlcm1hbmVudDogcGVybWFuZW50XG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIobGF5ZXIpO1xuICAgICAgfVxuICAgICAgaWYgKGxheWVyICYmIHBlcm1hbmVudCkge1xuICAgICAgICBkZWxldGUgdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgY2VsbEVudGVyOiBmdW5jdGlvbiAoYm91bmRzLCBjb29yZHMpIHtcbiAgICBpZiAodGhpcy5fdmlzaWJsZVpvb20oKSAmJiAhdGhpcy5fem9vbWluZyAmJiB0aGlzLl9tYXApIHtcbiAgICAgIFV0aWwucmVxdWVzdEFuaW1GcmFtZShVdGlsLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2FjaGVLZXkgPSB0aGlzLl9jYWNoZUtleShjb29yZHMpO1xuICAgICAgICB2YXIgY2VsbEtleSA9IHRoaXMuX2NlbGxDb29yZHNUb0tleShjb29yZHMpO1xuICAgICAgICB2YXIgbGF5ZXJzID0gdGhpcy5fY2FjaGVbY2FjaGVLZXldO1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlQ2VsbHNbY2VsbEtleV0gJiYgbGF5ZXJzKSB7XG4gICAgICAgICAgdGhpcy5hZGRMYXllcnMobGF5ZXJzKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcykpO1xuICAgIH1cbiAgfSxcblxuICBjZWxsTGVhdmU6IGZ1bmN0aW9uIChib3VuZHMsIGNvb3Jkcykge1xuICAgIGlmICghdGhpcy5fem9vbWluZykge1xuICAgICAgVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKFV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSB0aGlzLl9jYWNoZUtleShjb29yZHMpO1xuICAgICAgICAgIHZhciBjZWxsS2V5ID0gdGhpcy5fY2VsbENvb3Jkc1RvS2V5KGNvb3Jkcyk7XG4gICAgICAgICAgdmFyIGxheWVycyA9IHRoaXMuX2NhY2hlW2NhY2hlS2V5XTtcbiAgICAgICAgICB2YXIgbWFwQm91bmRzID0gdGhpcy5fbWFwLmdldEJvdW5kcygpO1xuICAgICAgICAgIGlmICghdGhpcy5fYWN0aXZlQ2VsbHNbY2VsbEtleV0gJiYgbGF5ZXJzKSB7XG4gICAgICAgICAgICB2YXIgcmVtb3ZhYmxlID0gdHJ1ZTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2xheWVyc1tpXV07XG4gICAgICAgICAgICAgIGlmIChsYXllciAmJiBsYXllci5nZXRCb3VuZHMgJiYgbWFwQm91bmRzLmludGVyc2VjdHMobGF5ZXIuZ2V0Qm91bmRzKCkpKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlbW92YWJsZSkge1xuICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxheWVycyhsYXllcnMsICF0aGlzLm9wdGlvbnMuY2FjaGVMYXllcnMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5jYWNoZUxheWVycyAmJiByZW1vdmFibGUpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhY2hlW2NhY2hlS2V5XTtcbiAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NlbGxzW2NlbGxLZXldO1xuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fYWN0aXZlQ2VsbHNbY2VsbEtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBTdHlsaW5nIE1ldGhvZHNcbiAgICovXG5cbiAgcmVzZXRTdHlsZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3B0aW9ucy5zdHlsZSA9IHRoaXMuX29yaWdpbmFsU3R5bGU7XG4gICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgIHRoaXMucmVzZXRGZWF0dXJlU3R5bGUobGF5ZXIuZmVhdHVyZS5pZCk7XG4gICAgfSwgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2V0U3R5bGU6IGZ1bmN0aW9uIChzdHlsZSkge1xuICAgIHRoaXMub3B0aW9ucy5zdHlsZSA9IHN0eWxlO1xuICAgIHRoaXMuZWFjaEZlYXR1cmUoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICB0aGlzLnNldEZlYXR1cmVTdHlsZShsYXllci5mZWF0dXJlLmlkLCBzdHlsZSk7XG4gICAgfSwgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcmVzZXRGZWF0dXJlU3R5bGU6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgdmFyIHN0eWxlID0gdGhpcy5fb3JpZ2luYWxTdHlsZSB8fCBMLlBhdGgucHJvdG90eXBlLm9wdGlvbnM7XG4gICAgaWYgKGxheWVyKSB7XG4gICAgICBVdGlsLmV4dGVuZChsYXllci5vcHRpb25zLCBsYXllci5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICB0aGlzLnNldEZlYXR1cmVTdHlsZShpZCwgc3R5bGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBzZXRGZWF0dXJlU3R5bGU6IGZ1bmN0aW9uIChpZCwgc3R5bGUpIHtcbiAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgIGlmICh0eXBlb2Ygc3R5bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHN0eWxlID0gc3R5bGUobGF5ZXIuZmVhdHVyZSk7XG4gICAgfVxuICAgIGlmIChsYXllci5zZXRTdHlsZSkge1xuICAgICAgbGF5ZXIuc2V0U3R5bGUoc3R5bGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogVXRpbGl0eSBNZXRob2RzXG4gICAqL1xuXG4gIGVhY2hBY3RpdmVGZWF0dXJlOiBmdW5jdGlvbiAoZm4sIGNvbnRleHQpIHtcbiAgICAvLyBmaWd1cmUgb3V0IChyb3VnaGx5KSB3aGljaCBsYXllcnMgYXJlIGluIHZpZXdcbiAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICB2YXIgYWN0aXZlQm91bmRzID0gdGhpcy5fbWFwLmdldEJvdW5kcygpO1xuICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRTbmFwc2hvdC5pbmRleE9mKHRoaXMuX2xheWVyc1tpXS5mZWF0dXJlLmlkKSAhPT0gLTEpIHtcbiAgICAgICAgICAvLyBhIHNpbXBsZSBwb2ludCBpbiBwb2x5IHRlc3QgZm9yIHBvaW50IGdlb21ldHJpZXNcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2xheWVyc1tpXS5nZXRMYXRMbmcgPT09ICdmdW5jdGlvbicgJiYgYWN0aXZlQm91bmRzLmNvbnRhaW5zKHRoaXMuX2xheWVyc1tpXS5nZXRMYXRMbmcoKSkpIHtcbiAgICAgICAgICAgIGZuLmNhbGwoY29udGV4dCwgdGhpcy5fbGF5ZXJzW2ldKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLl9sYXllcnNbaV0uZ2V0Qm91bmRzID09PSAnZnVuY3Rpb24nICYmIGFjdGl2ZUJvdW5kcy5pbnRlcnNlY3RzKHRoaXMuX2xheWVyc1tpXS5nZXRCb3VuZHMoKSkpIHtcbiAgICAgICAgICAgIC8vIGludGVyc2VjdGluZyBib3VuZHMgY2hlY2sgZm9yIHBvbHlsaW5lIGFuZCBwb2x5Z29uIGdlb21ldHJpZXNcbiAgICAgICAgICAgIGZuLmNhbGwoY29udGV4dCwgdGhpcy5fbGF5ZXJzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZWFjaEZlYXR1cmU6IGZ1bmN0aW9uIChmbiwgY29udGV4dCkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5fbGF5ZXJzKSB7XG4gICAgICBmbi5jYWxsKGNvbnRleHQsIHRoaXMuX2xheWVyc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldEZlYXR1cmU6IGZ1bmN0aW9uIChpZCkge1xuICAgIHJldHVybiB0aGlzLl9sYXllcnNbaWRdO1xuICB9LFxuXG4gIGJyaW5nVG9CYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgIGlmIChsYXllci5icmluZ1RvQmFjaykge1xuICAgICAgICBsYXllci5icmluZ1RvQmFjaygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGJyaW5nVG9Gcm9udDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZWFjaEZlYXR1cmUoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICBpZiAobGF5ZXIuYnJpbmdUb0Zyb250KSB7XG4gICAgICAgIGxheWVyLmJyaW5nVG9Gcm9udCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIHJlZHJhdzogZnVuY3Rpb24gKGlkKSB7XG4gICAgaWYgKGlkKSB7XG4gICAgICB0aGlzLl9yZWRyYXcoaWQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBfcmVkcmF3OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgIHZhciBnZW9qc29uID0gbGF5ZXIuZmVhdHVyZTtcblxuICAgIC8vIGlmIHRoaXMgbG9va3MgbGlrZSBhIG1hcmtlclxuICAgIGlmIChsYXllciAmJiBsYXllci5zZXRJY29uICYmIHRoaXMub3B0aW9ucy5wb2ludFRvTGF5ZXIpIHtcbiAgICAgIC8vIHVwZGF0ZSBjdXN0b20gc3ltYm9sb2d5LCBpZiBuZWNlc3NhcnlcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucG9pbnRUb0xheWVyKSB7XG4gICAgICAgIHZhciBnZXRJY29uID0gdGhpcy5vcHRpb25zLnBvaW50VG9MYXllcihnZW9qc29uLCBsYXRMbmcoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSwgZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1swXSkpO1xuICAgICAgICB2YXIgdXBkYXRlZEljb24gPSBnZXRJY29uLm9wdGlvbnMuaWNvbjtcbiAgICAgICAgbGF5ZXIuc2V0SWNvbih1cGRhdGVkSWNvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbG9va3MgbGlrZSBhIHZlY3RvciBtYXJrZXIgKGNpcmNsZU1hcmtlcilcbiAgICBpZiAobGF5ZXIgJiYgbGF5ZXIuc2V0U3R5bGUgJiYgdGhpcy5vcHRpb25zLnBvaW50VG9MYXllcikge1xuICAgICAgdmFyIGdldFN0eWxlID0gdGhpcy5vcHRpb25zLnBvaW50VG9MYXllcihnZW9qc29uLCBsYXRMbmcoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSwgZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1swXSkpO1xuICAgICAgdmFyIHVwZGF0ZWRTdHlsZSA9IGdldFN0eWxlLm9wdGlvbnM7XG4gICAgICB0aGlzLnNldEZlYXR1cmVTdHlsZShnZW9qc29uLmlkLCB1cGRhdGVkU3R5bGUpO1xuICAgIH1cblxuICAgIC8vIGxvb2tzIGxpa2UgYSBwYXRoIChwb2x5Z29uL3BvbHlsaW5lKVxuICAgIGlmIChsYXllciAmJiBsYXllci5zZXRTdHlsZSAmJiB0aGlzLm9wdGlvbnMuc3R5bGUpIHtcbiAgICAgIHRoaXMucmVzZXRTdHlsZShnZW9qc29uLmlkKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZUxheWVyIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRmVhdHVyZUxheWVyKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmZWF0dXJlTGF5ZXI7XG4iXSwibmFtZXMiOlsiVXRpbCIsIkRvbVV0aWwiLCJzaGFsbG93Q2xvbmUiLCJhcmNnaXNUb0dlb0pTT04iLCJnZW9qc29uVG9BcmNHSVMiLCJnMmEiLCJhMmciLCJsYXRMbmciLCJsYXRMbmdCb3VuZHMiLCJMYXRMbmdCb3VuZHMiLCJMYXRMbmciLCJHZW9KU09OIiwiQ2xhc3MiLCJwb2ludCIsIkV2ZW50ZWQiLCJUaWxlTGF5ZXIiLCJJbWFnZU92ZXJsYXkiLCJDUlMiLCJMYXllciIsInBvcHVwIiwiYm91bmRzIiwiTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztDQ0FPLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLGlCQUFpQixJQUFJLElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNoRyxDQUFPLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLGFBQWEsS0FBSyxFQUFFLENBQUM7O0FBRS9FLENBQU8sSUFBSSxPQUFPLEdBQUc7QUFDckIsQ0FBQSxFQUFFLElBQUksRUFBRSxJQUFJO0FBQ1osQ0FBQSxFQUFFLGFBQWEsRUFBRSxhQUFhO0FBQzlCLENBQUEsQ0FBQyxDQUFDOztDQ05LLElBQUksT0FBTyxHQUFHO0FBQ3JCLENBQUEsRUFBRSxzQkFBc0IsRUFBRSxFQUFFO0FBQzVCLENBQUEsQ0FBQyxDQUFDOztDQ0VGLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQzs7QUFFbEIsQ0FBQSxTQUFTLFNBQVMsRUFBRSxNQUFNLEVBQUU7QUFDNUIsQ0FBQSxFQUFFLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQzs7QUFFaEIsQ0FBQSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUM7O0FBRWhDLENBQUEsRUFBRSxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtBQUMxQixDQUFBLElBQUksSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3BDLENBQUEsTUFBTSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUIsQ0FBQSxNQUFNLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2RCxDQUFBLE1BQU0sSUFBSSxLQUFLLENBQUM7O0FBRWhCLENBQUEsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDdkIsQ0FBQSxRQUFRLElBQUksSUFBSSxHQUFHLENBQUM7QUFDcEIsQ0FBQSxPQUFPOztBQUVQLENBQUEsTUFBTSxJQUFJLElBQUksS0FBSyxnQkFBZ0IsRUFBRTtBQUNyQyxDQUFBLFFBQVEsS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNILENBQUEsT0FBTyxNQUFNLElBQUksSUFBSSxLQUFLLGlCQUFpQixFQUFFO0FBQzdDLENBQUEsUUFBUSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0QyxDQUFBLE9BQU8sTUFBTSxJQUFJLElBQUksS0FBSyxlQUFlLEVBQUU7QUFDM0MsQ0FBQSxRQUFRLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEMsQ0FBQSxPQUFPLE1BQU07QUFDYixDQUFBLFFBQVEsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUN0QixDQUFBLE9BQU87O0FBRVAsQ0FBQSxNQUFNLElBQUksSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEUsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxPQUFPLElBQUksQ0FBQztBQUNkLENBQUEsQ0FBQzs7QUFFRCxDQUFBLFNBQVMsYUFBYSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDM0MsQ0FBQSxFQUFFLElBQUksV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDOztBQUVoRCxDQUFBLEVBQUUsV0FBVyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsRUFBRTtBQUNyQyxDQUFBLElBQUksV0FBVyxDQUFDLGtCQUFrQixHQUFHQSxRQUFJLENBQUMsT0FBTyxDQUFDOztBQUVsRCxDQUFBLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDM0IsQ0FBQSxNQUFNLEtBQUssRUFBRTtBQUNiLENBQUEsUUFBUSxJQUFJLEVBQUUsR0FBRztBQUNqQixDQUFBLFFBQVEsT0FBTyxFQUFFLHNCQUFzQjtBQUN2QyxDQUFBLE9BQU87QUFDUCxDQUFBLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNiLENBQUEsR0FBRyxDQUFDOztBQUVKLENBQUEsRUFBRSxXQUFXLENBQUMsa0JBQWtCLEdBQUcsWUFBWTtBQUMvQyxDQUFBLElBQUksSUFBSSxRQUFRLENBQUM7QUFDakIsQ0FBQSxJQUFJLElBQUksS0FBSyxDQUFDOztBQUVkLENBQUEsSUFBSSxJQUFJLFdBQVcsQ0FBQyxVQUFVLEtBQUssQ0FBQyxFQUFFO0FBQ3RDLENBQUEsTUFBTSxJQUFJO0FBQ1YsQ0FBQSxRQUFRLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4RCxDQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNsQixDQUFBLFFBQVEsUUFBUSxHQUFHLElBQUksQ0FBQztBQUN4QixDQUFBLFFBQVEsS0FBSyxHQUFHO0FBQ2hCLENBQUEsVUFBVSxJQUFJLEVBQUUsR0FBRztBQUNuQixDQUFBLFVBQVUsT0FBTyxFQUFFLGdHQUFnRztBQUNuSCxDQUFBLFNBQVMsQ0FBQztBQUNWLENBQUEsT0FBTzs7QUFFUCxDQUFBLE1BQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO0FBQ3BDLENBQUEsUUFBUSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUMvQixDQUFBLFFBQVEsUUFBUSxHQUFHLElBQUksQ0FBQztBQUN4QixDQUFBLE9BQU87O0FBRVAsQ0FBQSxNQUFNLFdBQVcsQ0FBQyxPQUFPLEdBQUdBLFFBQUksQ0FBQyxPQUFPLENBQUM7O0FBRXpDLENBQUEsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDOUMsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHLENBQUM7O0FBRUosQ0FBQSxFQUFFLFdBQVcsQ0FBQyxTQUFTLEdBQUcsWUFBWTtBQUN0QyxDQUFBLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ25CLENBQUEsR0FBRyxDQUFDOztBQUVKLENBQUEsRUFBRSxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFBLENBQUM7O0FBRUQsQ0FBQSxTQUFTLFdBQVcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDdEQsQ0FBQSxFQUFFLElBQUksV0FBVyxHQUFHLGFBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDckQsQ0FBQSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztBQUVoQyxDQUFBLEVBQUUsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtBQUMxRCxDQUFBLElBQUksSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssV0FBVyxFQUFFO0FBQ2hELENBQUEsTUFBTSxXQUFXLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ3BELENBQUEsS0FBSztBQUNMLENBQUEsR0FBRztBQUNILENBQUEsRUFBRSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLGtEQUFrRCxDQUFDLENBQUM7QUFDbkcsQ0FBQSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O0FBRXRDLENBQUEsRUFBRSxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFBLENBQUM7O0FBRUQsQ0FBQSxTQUFTLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDckQsQ0FBQSxFQUFFLElBQUksV0FBVyxHQUFHLGFBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDckQsQ0FBQSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUUvRCxDQUFBLEVBQUUsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtBQUMxRCxDQUFBLElBQUksSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssV0FBVyxFQUFFO0FBQ2hELENBQUEsTUFBTSxXQUFXLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ3BELENBQUEsS0FBSztBQUNMLENBQUEsR0FBRztBQUNILENBQUEsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV6QixDQUFBLEVBQUUsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQSxDQUFDOztBQUVELENBQUE7QUFDQSxDQUFPLFNBQVMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUN6RCxDQUFBLEVBQUUsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLENBQUEsRUFBRSxJQUFJLFdBQVcsR0FBRyxhQUFhLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3JELENBQUEsRUFBRSxJQUFJLGFBQWEsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDOztBQUV2RCxDQUFBO0FBQ0EsQ0FBQSxFQUFFLElBQUksYUFBYSxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO0FBQzdDLENBQUEsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFDO0FBQ3JELENBQUEsR0FBRyxNQUFNLElBQUksYUFBYSxHQUFHLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO0FBQ25ELENBQUEsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNsQyxDQUFBLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxrREFBa0QsQ0FBQyxDQUFDO0FBQ3JHLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtBQUMxRCxDQUFBLElBQUksSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssV0FBVyxFQUFFO0FBQ2hELENBQUEsTUFBTSxXQUFXLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ3BELENBQUEsS0FBSztBQUNMLENBQUEsR0FBRzs7QUFFSCxDQUFBO0FBQ0EsQ0FBQSxFQUFFLElBQUksYUFBYSxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO0FBQzdDLENBQUEsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUUzQixDQUFBO0FBQ0EsQ0FBQSxHQUFHLE1BQU0sSUFBSSxhQUFhLEdBQUcsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDbkQsQ0FBQSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRWxDLENBQUE7QUFDQSxDQUFBLEdBQUcsTUFBTSxJQUFJLGFBQWEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO0FBQ3JELENBQUEsSUFBSSxPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFakQsQ0FBQTtBQUNBLENBQUEsR0FBRyxNQUFNO0FBQ1QsQ0FBQSxJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxHQUFHLDZLQUE2SyxDQUFDLENBQUM7QUFDaE4sQ0FBQSxJQUFJLE9BQU87QUFDWCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUEsQ0FBQzs7QUFFRCxDQUFPLFNBQVMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUN2RCxDQUFBLEVBQUUsTUFBTSxDQUFDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsSUFBSSxFQUFFLENBQUM7QUFDcEUsQ0FBQSxFQUFFLElBQUksVUFBVSxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUM7QUFDbkMsQ0FBQSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEdBQUcsK0JBQStCLEdBQUcsVUFBVSxDQUFDOztBQUVqRSxDQUFBLEVBQUUsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsUUFBUSxFQUFFO0FBQ2pFLENBQUEsSUFBSSxJQUFJLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLEVBQUU7QUFDM0QsQ0FBQSxNQUFNLElBQUksS0FBSyxDQUFDO0FBQ2hCLENBQUEsTUFBTSxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRWxFLENBQUEsTUFBTSxJQUFJLENBQUMsQ0FBQyxZQUFZLEtBQUssaUJBQWlCLElBQUksWUFBWSxLQUFLLGdCQUFnQixDQUFDLEVBQUU7QUFDdEYsQ0FBQSxRQUFRLEtBQUssR0FBRztBQUNoQixDQUFBLFVBQVUsS0FBSyxFQUFFO0FBQ2pCLENBQUEsWUFBWSxJQUFJLEVBQUUsR0FBRztBQUNyQixDQUFBLFlBQVksT0FBTyxFQUFFLDRDQUE0QztBQUNqRSxDQUFBLFdBQVc7QUFDWCxDQUFBLFNBQVMsQ0FBQztBQUNWLENBQUEsUUFBUSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLENBQUEsT0FBTzs7QUFFUCxDQUFBLE1BQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO0FBQ3BDLENBQUEsUUFBUSxLQUFLLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLENBQUEsUUFBUSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLENBQUEsT0FBTzs7QUFFUCxDQUFBLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLENBQUEsTUFBTSxNQUFNLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3RELENBQUEsS0FBSztBQUNMLENBQUEsR0FBRyxDQUFDOztBQUVKLENBQUEsRUFBRSxJQUFJLE1BQU0sR0FBR0MsV0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3RCxDQUFBLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztBQUNsQyxDQUFBLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QyxDQUFBLEVBQUUsTUFBTSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUM7O0FBRXpCLENBQUEsRUFBRSxTQUFTLEVBQUUsQ0FBQzs7QUFFZCxDQUFBLEVBQUUsT0FBTztBQUNULENBQUEsSUFBSSxFQUFFLEVBQUUsVUFBVTtBQUNsQixDQUFBLElBQUksR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHO0FBQ25CLENBQUEsSUFBSSxLQUFLLEVBQUUsWUFBWTtBQUN2QixDQUFBLE1BQU0sTUFBTSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN6RCxDQUFBLFFBQVEsSUFBSSxFQUFFLENBQUM7QUFDZixDQUFBLFFBQVEsT0FBTyxFQUFFLGtCQUFrQjtBQUNuQyxDQUFBLE9BQU8sQ0FBQyxDQUFDO0FBQ1QsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHLENBQUM7QUFDSixDQUFBLENBQUM7O0FBRUQsQ0FBQSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNoRCxDQUFBLEdBQUcsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO0FBQ3RCLENBQUEsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0FBRWxCLENBTUE7QUFDQSxDQUFPLElBQUksT0FBTyxHQUFHO0FBQ3JCLENBQUEsRUFBRSxPQUFPLEVBQUUsT0FBTztBQUNsQixDQUFBLEVBQUUsR0FBRyxFQUFFLEdBQUc7QUFDVixDQUFBLEVBQUUsSUFBSSxFQUFFLFdBQVc7QUFDbkIsQ0FBQSxDQUFDLENBQUM7O0NDM05GO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7O0FBRUEsQ0FBQTtBQUNBLENBQUEsU0FBUyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUM1QixDQUFBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckMsQ0FBQSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN2QixDQUFBLE1BQU0sT0FBTyxLQUFLLENBQUM7QUFDbkIsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHO0FBQ0gsQ0FBQSxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQSxDQUFDOztBQUVELENBQUE7QUFDQSxDQUFBLFNBQVMsU0FBUyxFQUFFLFdBQVcsRUFBRTtBQUNqQyxDQUFBLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN6RSxDQUFBLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxDQUFBLEdBQUc7QUFDSCxDQUFBLEVBQUUsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQSxDQUFDOztBQUVELENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUEsU0FBUyxlQUFlLEVBQUUsVUFBVSxFQUFFO0FBQ3RDLENBQUEsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDaEIsQ0FBQSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNaLENBQUEsRUFBRSxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0FBQ2xDLENBQUEsRUFBRSxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUIsQ0FBQSxFQUFFLElBQUksR0FBRyxDQUFDO0FBQ1YsQ0FBQSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2hDLENBQUEsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM1QixDQUFBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25ELENBQUEsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2QsQ0FBQSxHQUFHO0FBQ0gsQ0FBQSxFQUFFLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdEIsQ0FBQSxDQUFDOztBQUVELENBQUE7QUFDQSxDQUFBLFNBQVMsc0JBQXNCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0FBQ2pELENBQUEsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsRixDQUFBLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEYsQ0FBQSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVqRixDQUFBLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO0FBQ2hCLENBQUEsSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLENBQUEsSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDOztBQUV0QixDQUFBLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO0FBQ2xELENBQUEsTUFBTSxPQUFPLElBQUksQ0FBQztBQUNsQixDQUFBLEtBQUs7QUFDTCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQSxDQUFDOztBQUVELENBQUE7QUFDQSxDQUFBLFNBQVMsb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNyQyxDQUFBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pDLENBQUEsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDM0MsQ0FBQSxNQUFNLElBQUksc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNsRSxDQUFBLFFBQVEsT0FBTyxJQUFJLENBQUM7QUFDcEIsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUEsQ0FBQzs7QUFFRCxDQUFBO0FBQ0EsQ0FBQSxTQUFTLHVCQUF1QixFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7QUFDdEQsQ0FBQSxFQUFFLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztBQUN2QixDQUFBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN0RSxDQUFBLElBQUksSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLENBQUEsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM3SixDQUFBLE1BQU0sUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDO0FBQzNCLENBQUEsS0FBSztBQUNMLENBQUEsR0FBRztBQUNILENBQUEsRUFBRSxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFBLENBQUM7O0FBRUQsQ0FBQTtBQUNBLENBQUEsU0FBUyw2QkFBNkIsRUFBRSxL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QSxFQUFFLE9BQU8sRUFBRSxVQUFVLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDeEMsQ0FBQSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUN2QixDQUFBLE1BQU0sT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzlFLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9FLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsUUFBUSxFQUFFLFVBQVUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUMvRCxDQUFBLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDOztBQUVsSCxDQUFBLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLElBQUksTUFBTSxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7QUFDN0UsQ0FBQSxNQUFNLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDL0QsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxF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QUMsZUFBZSxHQUFHLEtBQUssQ0FBQztBQUNqQyxDQUFBLElBQUlkLFFBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLENBQUEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsRCxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLEdBQUcsRUFBRSxVQUFVLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUNsRCxDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRSxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLElBQUksRUFBRSxVQUFVLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUNuRCxDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNsRSxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUN0RCxDQUFBLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNyRSxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFFBQVEsRUFBRSxVQUFVLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDekMsQ0FBQSxJQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDM0QsQ0FBQSxH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SUFBSSxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxFQUFFO0FBQ25DLENBQUEsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUN4QixDQUFBLFFBQVEsTUFBTSxFQUFFLE1BQU07QUFDdEIsQ0FBQSxPQUFPLENBQUMsQ0FBQztBQUNULENBQUEsS0FBSztBQUNMLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsU0FBUyxFQUFFLFVBQVUsTUFBTSxFQUFFO0FBQy9CLENBQUEsSUFBSSxPQUFPLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxZQUFZLEVBQUUsVUFBVSxRQUFRLEVBQUUsTUFBTSxFQUFFO0FBQzVDLENBQUEsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3JDLENBQUEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUU5QyxDQUFBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ25ELENBQUEsTUFBTSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOztBQUU5QixDQUFBLE1BQU0sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ3BELENBQUEsUUFBUSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZDLENBQUEsT0FBTztBQUNQLENBQUEsTUFBTSxJQUFJLElBQUks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