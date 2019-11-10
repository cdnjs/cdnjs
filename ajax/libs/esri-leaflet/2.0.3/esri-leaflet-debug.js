/* esri-leaflet - v2.0.3 - Thu Sep 15 2016 16:31:29 GMT-0700 (PDT)
 * Copyright (c) 2016 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}),global.L));
}(this, function (exports,L) { 'use strict';

	L = 'default' in L ? L['default'] : L;

	var version = "2.0.3";

	var cors = ((window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest()));
	var pointerEvents = document.documentElement.style.pointerEvents === '';

	var Support = {
	  cors: cors,
	  pointerEvents: pointerEvents
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
	    httpRequest.send(null);

	  // request is less more then 2000 characters and the browser supports CORS, make POST request with XMLHttpRequest
	  } else if (requestLength > 2000 && Support.cors) {
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
	  var sw = L.latLng(extent.ymin, extent.xmin);
	  var ne = L.latLng(extent.ymax, extent.xmax);
	  return L.latLngBounds(sw, ne);
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
	  /* hosted feature services can emit geojson natively. */
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

	function calcAttributionWidth (map) {
	  // slightly less than the width of the map
	  return (map.getSize().x - 20) + 'px';
	}

	function setEsriAttribution (map) {
	  if (map.attributionControl && !map.attributionControl._esriAttributionAdded) {
	    map.attributionControl.setPrefix('<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | Powered by <a href="https://www.esri.com">Esri</a>');

	    var hoverAttributionStyle = document.createElement('style');
	    hoverAttributionStyle.type = 'text/css';
	    hoverAttributionStyle.innerHTML = '.esri-truncated-attribution:hover {' +
	      'white-space: normal;'
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
	      'max-width:' + L.esri.Util.calcAttributionWidth(map) +';'
	    '}';

	    document.getElementsByTagName('head')[0].appendChild(attributionStyle);
	    L.DomUtil.addClass(map.attributionControl._container, 'esri-truncated-attribution');

	    // update the width used to truncate when the map itself is resized
	    map.on('resize', function (e) {
	      map.attributionControl._container.style.maxWidth = L.esri.Util.calcAttributionWidth(e.target);
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

	    // warn the user if we havn't found an appropriate object
	    Util.warn('invalid geometry passed to spatial query. Should be an L.LatLng, L.LatLngBounds or L.Marker or a GeoJSON Point Line or Polygon object');

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

	    if (map.options.crs === L.CRS.EPSG3857 && !this._lodMap) {
	      this._lodMap = {};
	      this.metadata(function (error, metadata) {
	        if (!error && metadata.spatialReference) {
	          var sr = metadata.spatialReference.latestWkid || metadata.spatialReference.wkid;
	          if (!this.options.attribution && map.attributionControl && metadata.copyrightText) {
	            this.options.attribution = metadata.copyrightText;
	            map.attributionControl.addAttribution(this.getAttribution());
	          }
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

	            this.fire('lodmap');
	          } else {
	            warn('L.esri.TiledMapLayer is using a non-mercator spatial reference. Support may be available through Proj4Leaflet http://esri.github.io/esri-leaflet/examples/non-mercator-projection.html');
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
	      this.service.request('export', params, function (error, response) {
	        if (error) { return; } // we really can't do anything here but authenticate or requesterror will fire
	        if (this.options.token) {
	          response.href += ('?token=' + this.options.token);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvU3VwcG9ydC5qcyIsIi4uL3NyYy9SZXF1ZXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2FyY2dpcy10by1nZW9qc29uLXV0aWxzL2luZGV4LmpzIiwiLi4vc3JjL1V0aWwuanMiLCIuLi9zcmMvVGFza3MvVGFzay5qcyIsIi4uL3NyYy9UYXNrcy9RdWVyeS5qcyIsIi4uL3NyYy9UYXNrcy9GaW5kLmpzIiwiLi4vc3JjL1Rhc2tzL0lkZW50aWZ5LmpzIiwiLi4vc3JjL1Rhc2tzL0lkZW50aWZ5RmVhdHVyZXMuanMiLCIuLi9zcmMvVGFza3MvSWRlbnRpZnlJbWFnZS5qcyIsIi4uL3NyYy9TZXJ2aWNlcy9TZXJ2aWNlLmpzIiwiLi4vc3JjL1NlcnZpY2VzL01hcFNlcnZpY2UuanMiLCIuLi9zcmMvU2VydmljZXMvSW1hZ2VTZXJ2aWNlLmpzIiwiLi4vc3JjL1NlcnZpY2VzL0ZlYXR1cmVMYXllclNlcnZpY2UuanMiLCIuLi9zcmMvTGF5ZXJzL0Jhc2VtYXBMYXllci5qcyIsIi4uL3NyYy9MYXllcnMvVGlsZWRNYXBMYXllci5qcyIsIi4uL3NyYy9MYXllcnMvUmFzdGVyTGF5ZXIuanMiLCIuLi9zcmMvTGF5ZXJzL0ltYWdlTWFwTGF5ZXIuanMiLCIuLi9zcmMvTGF5ZXJzL0R5bmFtaWNNYXBMYXllci5qcyIsIi4uL25vZGVfbW9kdWxlcy9sZWFmbGV0LXZpcnR1YWwtZ3JpZC9zcmMvdmlydHVhbC1ncmlkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3RpbnktYmluYXJ5LXNlYXJjaC9pbmRleC5qcyIsIi4uL3NyYy9MYXllcnMvRmVhdHVyZUxheWVyL0ZlYXR1cmVNYW5hZ2VyLmpzIiwiLi4vc3JjL0xheWVycy9GZWF0dXJlTGF5ZXIvRmVhdHVyZUxheWVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIntcbiAgXCJuYW1lXCI6IFwiZXNyaS1sZWFmbGV0XCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJMZWFmbGV0IHBsdWdpbnMgZm9yIGNvbnN1bWluZyBBcmNHSVMgT25saW5lIGFuZCBBcmNHSVMgU2VydmVyIHNlcnZpY2VzLlwiLFxuICBcInZlcnNpb25cIjogXCIyLjAuM1wiLFxuICBcImF1dGhvclwiOiBcIlBhdHJpY2sgQXJsdCA8cGFybHRAZXNyaS5jb20+IChodHRwOi8vcGF0cmlja2FybHQuY29tKVwiLFxuICBcImJyb3dzZXJcIjogXCJkaXN0L2VzcmktbGVhZmxldC1kZWJ1Zy5qc1wiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2VzcmkvZXNyaS1sZWFmbGV0L2lzc3Vlc1wiXG4gIH0sXG4gIFwiY29udHJpYnV0b3JzXCI6IFtcbiAgICBcIlBhdHJpY2sgQXJsdCA8cGFybHRAZXNyaS5jb20+IChodHRwOi8vcGF0cmlja2FybHQuY29tKVwiLFxuICAgIFwiSm9obiBHcmF2b2lzIDxqZ3Jhdm9pc0Blc3JpLmNvbT4gKGh0dHA6Ly9qb2huZ3Jhdm9pcy5jb20pXCJcbiAgXSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYXJjZ2lzLXRvLWdlb2pzb24tdXRpbHNcIjogXCJeMS4wLjFcIixcbiAgICBcImxlYWZsZXRcIjogXCJeMS4wLjAtcmMuMlwiLFxuICAgIFwibGVhZmxldC12aXJ0dWFsLWdyaWRcIjogXCJeMS4wLjNcIixcbiAgICBcInRpbnktYmluYXJ5LXNlYXJjaFwiOiBcIl4xLjAuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCIyLjMuMFwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjEuMTAuMlwiLFxuICAgIFwiZ2gtcmVsZWFzZVwiOiBcIl4yLjAuMFwiLFxuICAgIFwiaGlnaGxpZ2h0LmpzXCI6IFwiXjguMC4wXCIsXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4wLjguNVwiLFxuICAgIFwiaXNwYXJ0YVwiOiBcIl4zLjAuM1wiLFxuICAgIFwiaXN0YW5idWxcIjogXCJeMC40LjJcIixcbiAgICBcImthcm1hXCI6IFwiXjAuMTIuMTZcIixcbiAgICBcImthcm1hLWNoYWktc2lub25cIjogXCJeMC4xLjNcIixcbiAgICBcImthcm1hLWNvdmVyYWdlXCI6IFwiXjAuNS4zXCIsXG4gICAgXCJrYXJtYS1tb2NoYVwiOiBcIl4wLjEuMFwiLFxuICAgIFwia2FybWEtbW9jaGEtcmVwb3J0ZXJcIjogXCJeMC4yLjVcIixcbiAgICBcImthcm1hLXBoYW50b21qcy1sYXVuY2hlclwiOiBcIl4wLjIuMFwiLFxuICAgIFwia2FybWEtc291cmNlbWFwLWxvYWRlclwiOiBcIl4wLjMuNVwiLFxuICAgIFwibG9hZC1ncnVudC10YXNrc1wiOiBcIl4wLjQuMFwiLFxuICAgIFwibWtkaXJwXCI6IFwiXjAuNS4xXCIsXG4gICAgXCJtb2NoYVwiOiBcIl4yLjMuNFwiLFxuICAgIFwicGhhbnRvbWpzXCI6IFwiXjEuOS4xN1wiLFxuICAgIFwicm9sbHVwXCI6IFwiXjAuMjUuNFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1qc29uXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLW5vZGUtcmVzb2x2ZVwiOiBcIl4xLjQuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi11Z2xpZnlcIjogXCJeMC4zLjFcIixcbiAgICBcInNlbWlzdGFuZGFyZFwiOiBcIl44LjAuMFwiLFxuICAgIFwic2lub25cIjogXCJeMS4xMS4xXCIsXG4gICAgXCJzaW5vbi1jaGFpXCI6IFwiMi43LjBcIixcbiAgICBcInNuYXp6eVwiOiBcIl4yLjAuMVwiLFxuICAgIFwidWdsaWZ5LWpzXCI6IFwiXjIuNi4xXCIsXG4gICAgXCJ3YXRjaFwiOiBcIl4wLjE3LjFcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cDovL2VzcmkuZ2l0aHViLmlvL2VzcmktbGVhZmxldFwiLFxuICBcImpzbmV4dDptYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0LmpzXCIsXG4gIFwianNwbVwiOiB7XG4gICAgXCJyZWdpc3RyeVwiOiBcIm5wbVwiLFxuICAgIFwiZm9ybWF0XCI6IFwiZXM2XCIsXG4gICAgXCJtYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0LmpzXCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJhcmNnaXNcIixcbiAgICBcImVzcmlcIixcbiAgICBcImVzcmkgbGVhZmxldFwiLFxuICAgIFwiZ2lzXCIsXG4gICAgXCJsZWFmbGV0IHBsdWdpblwiLFxuICAgIFwibWFwcGluZ1wiXG4gIF0sXG4gIFwibGljZW5zZVwiOiBcIkFwYWNoZS0yLjBcIixcbiAgXCJtYWluXCI6IFwiZGlzdC9lc3JpLWxlYWZsZXQtZGVidWcuanNcIixcbiAgXCJyZWFkbWVGaWxlbmFtZVwiOiBcIlJFQURNRS5tZFwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0QGdpdGh1Yi5jb206RXNyaS9lc3JpLWxlYWZsZXQuZ2l0XCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwicm9sbHVwIC1jIHByb2ZpbGVzL2RlYnVnLmpzICYgcm9sbHVwIC1jIHByb2ZpbGVzL3Byb2R1Y3Rpb24uanNcIixcbiAgICBcImxpbnRcIjogXCJzZW1pc3RhbmRhcmQgc3JjLyoqLyouanMgfCBzbmF6enlcIixcbiAgICBcInByZWJ1aWxkXCI6IFwibWtkaXJwIGRpc3RcIixcbiAgICBcInByZXB1Ymxpc2hcIjogXCJucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV0ZXN0XCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIi4vc2NyaXB0cy9yZWxlYXNlLnNoXCIsXG4gICAgXCJzdGFydFwiOiBcIndhdGNoICducG0gcnVuIGJ1aWxkJyBzcmMgJiBodHRwLXNlcnZlciAtcCA1MDAwIC1jLTEgLW9cIixcbiAgICBcInRlc3RcIjogXCJucG0gcnVuIGxpbnQgJiYga2FybWEgc3RhcnRcIlxuICB9XG59XG4iLCJleHBvcnQgdmFyIGNvcnMgPSAoKHdpbmRvdy5YTUxIdHRwUmVxdWVzdCAmJiAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCkpKTtcbmV4cG9ydCB2YXIgcG9pbnRlckV2ZW50cyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID09PSAnJztcblxuZXhwb3J0IHZhciBTdXBwb3J0ID0ge1xuICBjb3JzOiBjb3JzLFxuICBwb2ludGVyRXZlbnRzOiBwb2ludGVyRXZlbnRzXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0O1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgU3VwcG9ydCBmcm9tICcuL1N1cHBvcnQnO1xuaW1wb3J0IHsgd2FybiB9IGZyb20gJy4vVXRpbCc7XG5cbnZhciBjYWxsYmFja3MgPSAwO1xuXG5mdW5jdGlvbiBzZXJpYWxpemUgKHBhcmFtcykge1xuICB2YXIgZGF0YSA9ICcnO1xuXG4gIHBhcmFtcy5mID0gcGFyYW1zLmYgfHwgJ2pzb24nO1xuXG4gIGZvciAodmFyIGtleSBpbiBwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHZhciBwYXJhbSA9IHBhcmFtc1trZXldO1xuICAgICAgdmFyIHR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGFyYW0pO1xuICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICBpZiAoZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgZGF0YSArPSAnJic7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgIHZhbHVlID0gKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwYXJhbVswXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSA/IEpTT04uc3RyaW5naWZ5KHBhcmFtKSA6IHBhcmFtLmpvaW4oJywnKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeShwYXJhbSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgICAgICB2YWx1ZSA9IHBhcmFtLnZhbHVlT2YoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gcGFyYW07XG4gICAgICB9XG5cbiAgICAgIGRhdGEgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVSZXF1ZXN0IChjYWxsYmFjaywgY29udGV4dCkge1xuICB2YXIgaHR0cFJlcXVlc3QgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgaHR0cFJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaHR0cFJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gTC5VdGlsLmZhbHNlRm47XG5cbiAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGNvZGU6IDUwMCxcbiAgICAgICAgbWVzc2FnZTogJ1hNTEh0dHBSZXF1ZXN0IGVycm9yJ1xuICAgICAgfVxuICAgIH0sIG51bGwpO1xuICB9O1xuXG4gIGh0dHBSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzcG9uc2U7XG4gICAgdmFyIGVycm9yO1xuXG4gICAgaWYgKGh0dHBSZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShodHRwUmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXNwb25zZSA9IG51bGw7XG4gICAgICAgIGVycm9yID0ge1xuICAgICAgICAgIGNvZGU6IDUwMCxcbiAgICAgICAgICBtZXNzYWdlOiAnQ291bGQgbm90IHBhcnNlIHJlc3BvbnNlIGFzIEpTT04uIFRoaXMgY291bGQgYWxzbyBiZSBjYXVzZWQgYnkgYSBDT1JTIG9yIFhNTEh0dHBSZXF1ZXN0IGVycm9yLidcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5lcnJvcikge1xuICAgICAgICBlcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICByZXNwb25zZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGh0dHBSZXF1ZXN0Lm9uZXJyb3IgPSBMLlV0aWwuZmFsc2VGbjtcblxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgIH1cbiAgfTtcblxuICBodHRwUmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vbmVycm9yKCk7XG4gIH07XG5cbiAgcmV0dXJuIGh0dHBSZXF1ZXN0O1xufVxuXG5mdW5jdGlvbiB4bWxIdHRwUG9zdCAodXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIHZhciBodHRwUmVxdWVzdCA9IGNyZWF0ZVJlcXVlc3QoY2FsbGJhY2ssIGNvbnRleHQpO1xuICBodHRwUmVxdWVzdC5vcGVuKCdQT1NUJywgdXJsKTtcblxuICBpZiAodHlwZW9mIGNvbnRleHQgIT09ICd1bmRlZmluZWQnICYmIGNvbnRleHQgIT09IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIGNvbnRleHQub3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGh0dHBSZXF1ZXN0LnRpbWVvdXQgPSBjb250ZXh0Lm9wdGlvbnMudGltZW91dDtcbiAgICB9XG4gIH1cbiAgaHR0cFJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuICBodHRwUmVxdWVzdC5zZW5kKHNlcmlhbGl6ZShwYXJhbXMpKTtcblxuICByZXR1cm4gaHR0cFJlcXVlc3Q7XG59XG5cbmZ1bmN0aW9uIHhtbEh0dHBHZXQgKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICB2YXIgaHR0cFJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0KGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgaHR0cFJlcXVlc3Qub3BlbignR0VUJywgdXJsICsgJz8nICsgc2VyaWFsaXplKHBhcmFtcyksIHRydWUpO1xuXG4gIGlmICh0eXBlb2YgY29udGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgY29udGV4dCAhPT0gbnVsbCkge1xuICAgIGlmICh0eXBlb2YgY29udGV4dC5vcHRpb25zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaHR0cFJlcXVlc3QudGltZW91dCA9IGNvbnRleHQub3B0aW9ucy50aW1lb3V0O1xuICAgIH1cbiAgfVxuICBodHRwUmVxdWVzdC5zZW5kKG51bGwpO1xuXG4gIHJldHVybiBodHRwUmVxdWVzdDtcbn1cblxuLy8gQUpBWCBoYW5kbGVycyBmb3IgQ09SUyAobW9kZXJuIGJyb3dzZXJzKSBvciBKU09OUCAob2xkZXIgYnJvd3NlcnMpXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdCAodXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIHZhciBwYXJhbVN0cmluZyA9IHNlcmlhbGl6ZShwYXJhbXMpO1xuICB2YXIgaHR0cFJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0KGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgdmFyIHJlcXVlc3RMZW5ndGggPSAodXJsICsgJz8nICsgcGFyYW1TdHJpbmcpLmxlbmd0aDtcblxuICAvLyBnZXQgYXJvdW5kIGllMTAvMTEgYnVnIHdoaWNoIHJlcXVpcmVzIHRoYXQgdGhlIHJlcXVlc3QgYmUgb3BlbmVkIGJlZm9yZSBhIHRpbWVvdXQgaXMgYXBwbGllZFxuICBpZiAocmVxdWVzdExlbmd0aCA8PSAyMDAwICYmIFN1cHBvcnQuY29ycykge1xuICAgIGh0dHBSZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCArICc/JyArIHBhcmFtU3RyaW5nKTtcbiAgfSBlbHNlIGlmIChyZXF1ZXN0TGVuZ3RoID4gMjAwMCAmJiBTdXBwb3J0LmNvcnMpIHtcbiAgICBodHRwUmVxdWVzdC5vcGVuKCdQT1NUJywgdXJsKTtcbiAgICBodHRwUmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIGNvbnRleHQgIT09ICd1bmRlZmluZWQnICYmIGNvbnRleHQgIT09IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIGNvbnRleHQub3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGh0dHBSZXF1ZXN0LnRpbWVvdXQgPSBjb250ZXh0Lm9wdGlvbnMudGltZW91dDtcbiAgICB9XG4gIH1cblxuICAvLyByZXF1ZXN0IGlzIGxlc3MgdGhlbiAyMDAwIGNoYXJhY3RlcnMgYW5kIHRoZSBicm93c2VyIHN1cHBvcnRzIENPUlMsIG1ha2UgR0VUIHJlcXVlc3Qgd2l0aCBYTUxIdHRwUmVxdWVzdFxuICBpZiAocmVxdWVzdExlbmd0aCA8PSAyMDAwICYmIFN1cHBvcnQuY29ycykge1xuICAgIGh0dHBSZXF1ZXN0LnNlbmQobnVsbCk7XG5cbiAgLy8gcmVxdWVzdCBpcyBsZXNzIG1vcmUgdGhlbiAyMDAwIGNoYXJhY3RlcnMgYW5kIHRoZSBicm93c2VyIHN1cHBvcnRzIENPUlMsIG1ha2UgUE9TVCByZXF1ZXN0IHdpdGggWE1MSHR0cFJlcXVlc3RcbiAgfSBlbHNlIGlmIChyZXF1ZXN0TGVuZ3RoID4gMjAwMCAmJiBTdXBwb3J0LmNvcnMpIHtcbiAgICBodHRwUmVxdWVzdC5zZW5kKHBhcmFtU3RyaW5nKTtcblxuICAvLyByZXF1ZXN0IGlzIGxlc3MgbW9yZSB0aGVuIDIwMDAgY2hhcmFjdGVycyBhbmQgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBDT1JTLCBtYWtlIGEgSlNPTlAgcmVxdWVzdFxuICB9IGVsc2UgaWYgKHJlcXVlc3RMZW5ndGggPD0gMjAwMCAmJiAhU3VwcG9ydC5jb3JzKSB7XG4gICAgcmV0dXJuIGpzb25wKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG5cbiAgLy8gcmVxdWVzdCBpcyBsb25nZXIgdGhlbiAyMDAwIGNoYXJhY3RlcnMgYW5kIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgQ09SUywgbG9nIGEgd2FybmluZ1xuICB9IGVsc2Uge1xuICAgIHdhcm4oJ2EgcmVxdWVzdCB0byAnICsgdXJsICsgJyB3YXMgbG9uZ2VyIHRoZW4gMjAwMCBjaGFyYWN0ZXJzIGFuZCB0aGlzIGJyb3dzZXIgY2Fubm90IG1ha2UgYSBjcm9zcy1kb21haW4gcG9zdCByZXF1ZXN0LiBQbGVhc2UgdXNlIGEgcHJveHkgaHR0cDovL2VzcmkuZ2l0aHViLmlvL2VzcmktbGVhZmxldC9hcGktcmVmZXJlbmNlL3JlcXVlc3QuaHRtbCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJldHVybiBodHRwUmVxdWVzdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGpzb25wICh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgd2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrcyA9IHdpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3MgfHwge307XG4gIHZhciBjYWxsYmFja0lkID0gJ2MnICsgY2FsbGJhY2tzO1xuICBwYXJhbXMuY2FsbGJhY2sgPSAnd2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrcy4nICsgY2FsbGJhY2tJZDtcblxuICB3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzW2NhbGxiYWNrSWRdID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgaWYgKHdpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3NbY2FsbGJhY2tJZF0gIT09IHRydWUpIHtcbiAgICAgIHZhciBlcnJvcjtcbiAgICAgIHZhciByZXNwb25zZVR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocmVzcG9uc2UpO1xuXG4gICAgICBpZiAoIShyZXNwb25zZVR5cGUgPT09ICdbb2JqZWN0IE9iamVjdF0nIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJykpIHtcbiAgICAgICAgZXJyb3IgPSB7XG4gICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgIGNvZGU6IDUwMCxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdFeHBlY3RlZCBhcnJheSBvciBvYmplY3QgYXMgSlNPTlAgcmVzcG9uc2UnXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXNwb25zZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghZXJyb3IgJiYgcmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgZXJyb3IgPSByZXNwb25zZTtcbiAgICAgICAgcmVzcG9uc2UgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG4gICAgICB3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzW2NhbGxiYWNrSWRdID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHNjcmlwdCA9IEwuRG9tVXRpbC5jcmVhdGUoJ3NjcmlwdCcsIG51bGwsIGRvY3VtZW50LmJvZHkpO1xuICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICBzY3JpcHQuc3JjID0gdXJsICsgJz8nICsgc2VyaWFsaXplKHBhcmFtcyk7XG4gIHNjcmlwdC5pZCA9IGNhbGxiYWNrSWQ7XG5cbiAgY2FsbGJhY2tzKys7XG5cbiAgcmV0dXJuIHtcbiAgICBpZDogY2FsbGJhY2tJZCxcbiAgICB1cmw6IHNjcmlwdC5zcmMsXG4gICAgYWJvcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3MuX2NhbGxiYWNrW2NhbGxiYWNrSWRdKHtcbiAgICAgICAgY29kZTogMCxcbiAgICAgICAgbWVzc2FnZTogJ1JlcXVlc3QgYWJvcnRlZC4nXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBnZXQgPSAoKFN1cHBvcnQuY29ycykgPyB4bWxIdHRwR2V0IDoganNvbnApO1xuZ2V0LkNPUlMgPSB4bWxIdHRwR2V0O1xuZ2V0LkpTT05QID0ganNvbnA7XG5cbi8vIGNob29zZSB0aGUgY29ycmVjdCBBSkFYIGhhbmRsZXIgZGVwZW5kaW5nIG9uIENPUlMgc3VwcG9ydFxuZXhwb3J0IHsgZ2V0IH07XG5cbi8vIGFsd2F5cyB1c2UgWE1MSHR0cFJlcXVlc3QgZm9yIHBvc3RzXG5leHBvcnQgeyB4bWxIdHRwUG9zdCBhcyBwb3N0IH07XG5cbi8vIGV4cG9ydCB0aGUgUmVxdWVzdCBvYmplY3QgdG8gY2FsbCB0aGUgZGlmZmVyZW50IGhhbmRsZXJzIGZvciBkZWJ1Z2dpbmdcbmV4cG9ydCB2YXIgUmVxdWVzdCA9IHtcbiAgcmVxdWVzdDogcmVxdWVzdCxcbiAgZ2V0OiBnZXQsXG4gIHBvc3Q6IHhtbEh0dHBQb3N0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0O1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDE1IEVzcmlcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpc2NlbnNlLlxuICovXG5cbi8vIGNoZWNrcyBpZiAyIHgseSBwb2ludHMgYXJlIGVxdWFsXG5mdW5jdGlvbiBwb2ludHNFcXVhbCAoYSwgYikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gY2hlY2tzIGlmIHRoZSBmaXJzdCBhbmQgbGFzdCBwb2ludHMgb2YgYSByaW5nIGFyZSBlcXVhbCBhbmQgY2xvc2VzIHRoZSByaW5nXG5mdW5jdGlvbiBjbG9zZVJpbmcgKGNvb3JkaW5hdGVzKSB7XG4gIGlmICghcG9pbnRzRXF1YWwoY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzW2Nvb3JkaW5hdGVzLmxlbmd0aCAtIDFdKSkge1xuICAgIGNvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZXNbMF0pO1xuICB9XG4gIHJldHVybiBjb29yZGluYXRlcztcbn1cblxuLy8gZGV0ZXJtaW5lIGlmIHBvbHlnb24gcmluZyBjb29yZGluYXRlcyBhcmUgY2xvY2t3aXNlLiBjbG9ja3dpc2Ugc2lnbmlmaWVzIG91dGVyIHJpbmcsIGNvdW50ZXItY2xvY2t3aXNlIGFuIGlubmVyIHJpbmdcbi8vIG9yIGhvbGUuIHRoaXMgbG9naWMgd2FzIGZvdW5kIGF0IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTE2NTY0Ny9ob3ctdG8tZGV0ZXJtaW5lLWlmLWEtbGlzdC1vZi1wb2x5Z29uLVxuLy8gcG9pbnRzLWFyZS1pbi1jbG9ja3dpc2Utb3JkZXJcbmZ1bmN0aW9uIHJpbmdJc0Nsb2Nrd2lzZSAocmluZ1RvVGVzdCkge1xuICB2YXIgdG90YWwgPSAwO1xuICB2YXIgaSA9IDA7XG4gIHZhciByTGVuZ3RoID0gcmluZ1RvVGVzdC5sZW5ndGg7XG4gIHZhciBwdDEgPSByaW5nVG9UZXN0W2ldO1xuICB2YXIgcHQyO1xuICBmb3IgKGk7IGkgPCByTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgcHQyID0gcmluZ1RvVGVzdFtpICsgMV07XG4gICAgdG90YWwgKz0gKHB0MlswXSAtIHB0MVswXSkgKiAocHQyWzFdICsgcHQxWzFdKTtcbiAgICBwdDEgPSBwdDI7XG4gIH1cbiAgcmV0dXJuICh0b3RhbCA+PSAwKTtcbn1cblxuLy8gcG9ydGVkIGZyb20gdGVycmFmb3JtZXIuanMgaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvVGVycmFmb3JtZXIvYmxvYi9tYXN0ZXIvdGVycmFmb3JtZXIuanMjTDUwNC1MNTE5XG5mdW5jdGlvbiB2ZXJ0ZXhJbnRlcnNlY3RzVmVydGV4IChhMSwgYTIsIGIxLCBiMikge1xuICB2YXIgdWFUID0gKGIyWzBdIC0gYjFbMF0pICogKGExWzFdIC0gYjFbMV0pIC0gKGIyWzFdIC0gYjFbMV0pICogKGExWzBdIC0gYjFbMF0pO1xuICB2YXIgdWJUID0gKGEyWzBdIC0gYTFbMF0pICogKGExWzFdIC0gYjFbMV0pIC0gKGEyWzFdIC0gYTFbMV0pICogKGExWzBdIC0gYjFbMF0pO1xuICB2YXIgdUIgPSAoYjJbMV0gLSBiMVsxXSkgKiAoYTJbMF0gLSBhMVswXSkgLSAoYjJbMF0gLSBiMVswXSkgKiAoYTJbMV0gLSBhMVsxXSk7XG5cbiAgaWYgKHVCICE9PSAwKSB7XG4gICAgdmFyIHVhID0gdWFUIC8gdUI7XG4gICAgdmFyIHViID0gdWJUIC8gdUI7XG5cbiAgICBpZiAodWEgPj0gMCAmJiB1YSA8PSAxICYmIHViID49IDAgJiYgdWIgPD0gMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBwb3J0ZWQgZnJvbSB0ZXJyYWZvcm1lci5qcyBodHRwczovL2dpdGh1Yi5jb20vRXNyaS9UZXJyYWZvcm1lci9ibG9iL21hc3Rlci90ZXJyYWZvcm1lci5qcyNMNTIxLUw1MzFcbmZ1bmN0aW9uIGFycmF5SW50ZXJzZWN0c0FycmF5IChhLCBiKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGggLSAxOyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGIubGVuZ3RoIC0gMTsgaisrKSB7XG4gICAgICBpZiAodmVydGV4SW50ZXJzZWN0c1ZlcnRleChhW2ldLCBhW2kgKyAxXSwgYltqXSwgYltqICsgMV0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gcG9ydGVkIGZyb20gdGVycmFmb3JtZXIuanMgaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvVGVycmFmb3JtZXIvYmxvYi9tYXN0ZXIvdGVycmFmb3JtZXIuanMjTDQ3MC1MNDgwXG5mdW5jdGlvbiBjb29yZGluYXRlc0NvbnRhaW5Qb2ludCAoY29vcmRpbmF0ZXMsIHBvaW50KSB7XG4gIHZhciBjb250YWlucyA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gLTEsIGwgPSBjb29yZGluYXRlcy5sZW5ndGgsIGogPSBsIC0gMTsgKytpIDwgbDsgaiA9IGkpIHtcbiAgICBpZiAoKChjb29yZGluYXRlc1tpXVsxXSA8PSBwb2ludFsxXSAmJiBwb2ludFsxXSA8IGNvb3JkaW5hdGVzW2pdWzFdKSB8fFxuICAgICAgICAgKGNvb3JkaW5hdGVzW2pdWzFdIDw9IHBvaW50WzFdICYmIHBvaW50WzFdIDwgY29vcmRpbmF0ZXNbaV1bMV0pKSAmJlxuICAgICAgICAocG9pbnRbMF0gPCAoY29vcmRpbmF0ZXNbal1bMF0gLSBjb29yZGluYXRlc1tpXVswXSkgKiAocG9pbnRbMV0gLSBjb29yZGluYXRlc1tpXVsxXSkgLyAoY29vcmRpbmF0ZXNbal1bMV0gLSBjb29yZGluYXRlc1tpXVsxXSkgKyBjb29yZGluYXRlc1tpXVswXSkpIHtcbiAgICAgIGNvbnRhaW5zID0gIWNvbnRhaW5zO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29udGFpbnM7XG59XG5cbi8vIHBvcnRlZCBmcm9tIHRlcnJhZm9ybWVyLWFyY2dpcy1wYXJzZXIuanMgaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvdGVycmFmb3JtZXItYXJjZ2lzLXBhcnNlci9ibG9iL21hc3Rlci90ZXJyYWZvcm1lci1hcmNnaXMtcGFyc2VyLmpzI0wxMDYtTDExM1xuZnVuY3Rpb24gY29vcmRpbmF0ZXNDb250YWluQ29vcmRpbmF0ZXMgKG91dGVyLCBpbm5lcikge1xuICB2YXIgaW50ZXJzZWN0cyA9IGFycmF5SW50ZXJzZWN0c0FycmF5KG91dGVyLCBpbm5lcik7XG4gIHZhciBjb250YWlucyA9IGNvb3JkaW5hdGVzQ29udGFpblBvaW50KG91dGVyLCBpbm5lclswXSk7XG4gIGlmICghaW50ZXJzZWN0cyAmJiBjb250YWlucykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gZG8gYW55IHBvbHlnb25zIGluIHRoaXMgYXJyYXkgY29udGFpbiBhbnkgb3RoZXIgcG9seWdvbnMgaW4gdGhpcyBhcnJheT9cbi8vIHVzZWQgZm9yIGNoZWNraW5nIGZvciBob2xlcyBpbiBhcmNnaXMgcmluZ3Ncbi8vIHBvcnRlZCBmcm9tIHRlcnJhZm9ybWVyLWFyY2dpcy1wYXJzZXIuanMgaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvdGVycmFmb3JtZXItYXJjZ2lzLXBhcnNlci9ibG9iL21hc3Rlci90ZXJyYWZvcm1lci1hcmNnaXMtcGFyc2VyLmpzI0wxMTctTDE3MlxuZnVuY3Rpb24gY29udmVydFJpbmdzVG9HZW9KU09OIChyaW5ncykge1xuICB2YXIgb3V0ZXJSaW5ncyA9IFtdO1xuICB2YXIgaG9sZXMgPSBbXTtcbiAgdmFyIHg7IC8vIGl0ZXJhdG9yXG4gIHZhciBvdXRlclJpbmc7IC8vIGN1cnJlbnQgb3V0ZXIgcmluZyBiZWluZyBldmFsdWF0ZWRcbiAgdmFyIGhvbGU7IC8vIGN1cnJlbnQgaG9sZSBiZWluZyBldmFsdWF0ZWRcblxuICAvLyBmb3IgZWFjaCByaW5nXG4gIGZvciAodmFyIHIgPSAwOyByIDwgcmluZ3MubGVuZ3RoOyByKyspIHtcbiAgICB2YXIgcmluZyA9IGNsb3NlUmluZyhyaW5nc1tyXS5zbGljZSgwKSk7XG4gICAgaWYgKHJpbmcubGVuZ3RoIDwgNCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIC8vIGlzIHRoaXMgcmluZyBhbiBvdXRlciByaW5nPyBpcyBpdCBjbG9ja3dpc2U/XG4gICAgaWYgKHJpbmdJc0Nsb2Nrd2lzZShyaW5nKSkge1xuICAgICAgdmFyIHBvbHlnb24gPSBbIHJpbmcgXTtcbiAgICAgIG91dGVyUmluZ3MucHVzaChwb2x5Z29uKTsgLy8gcHVzaCB0byBvdXRlciByaW5nc1xuICAgIH0gZWxzZSB7XG4gICAgICBob2xlcy5wdXNoKHJpbmcpOyAvLyBjb3VudGVyY2xvY2t3aXNlIHB1c2ggdG8gaG9sZXNcbiAgICB9XG4gIH1cblxuICB2YXIgdW5jb250YWluZWRIb2xlcyA9IFtdO1xuXG4gIC8vIHdoaWxlIHRoZXJlIGFyZSBob2xlcyBsZWZ0Li4uXG4gIHdoaWxlIChob2xlcy5sZW5ndGgpIHtcbiAgICAvLyBwb3AgYSBob2xlIG9mZiBvdXQgc3RhY2tcbiAgICBob2xlID0gaG9sZXMucG9wKCk7XG5cbiAgICAvLyBsb29wIG92ZXIgYWxsIG91dGVyIHJpbmdzIGFuZCBzZWUgaWYgdGhleSBjb250YWluIG91ciBob2xlLlxuICAgIHZhciBjb250YWluZWQgPSBmYWxzZTtcbiAgICBmb3IgKHggPSBvdXRlclJpbmdzLmxlbmd0aCAtIDE7IHggPj0gMDsgeC0tKSB7XG4gICAgICBvdXRlclJpbmcgPSBvdXRlclJpbmdzW3hdWzBdO1xuICAgICAgaWYgKGNvb3JkaW5hdGVzQ29udGFpbkNvb3JkaW5hdGVzKG91dGVyUmluZywgaG9sZSkpIHtcbiAgICAgICAgLy8gdGhlIGhvbGUgaXMgY29udGFpbmVkIHB1c2ggaXQgaW50byBvdXIgcG9seWdvblxuICAgICAgICBvdXRlclJpbmdzW3hdLnB1c2goaG9sZSk7XG4gICAgICAgIGNvbnRhaW5lZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJpbmcgaXMgbm90IGNvbnRhaW5lZCBpbiBhbnkgb3V0ZXIgcmluZ1xuICAgIC8vIHNvbWV0aW1lcyB0aGlzIGhhcHBlbnMgaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvZXNyaS1sZWFmbGV0L2lzc3Vlcy8zMjBcbiAgICBpZiAoIWNvbnRhaW5lZCkge1xuICAgICAgdW5jb250YWluZWRIb2xlcy5wdXNoKGhvbGUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHdlIGNvdWxkbid0IG1hdGNoIGFueSBob2xlcyB1c2luZyBjb250YWlucyB3ZSBjYW4gdHJ5IGludGVyc2VjdHMuLi5cbiAgd2hpbGUgKHVuY29udGFpbmVkSG9sZXMubGVuZ3RoKSB7XG4gICAgLy8gcG9wIGEgaG9sZSBvZmYgb3V0IHN0YWNrXG4gICAgaG9sZSA9IHVuY29udGFpbmVkSG9sZXMucG9wKCk7XG5cbiAgICAvLyBsb29wIG92ZXIgYWxsIG91dGVyIHJpbmdzIGFuZCBzZWUgaWYgYW55IGludGVyc2VjdCBvdXIgaG9sZS5cbiAgICB2YXIgaW50ZXJzZWN0cyA9IGZhbHNlO1xuXG4gICAgZm9yICh4ID0gb3V0ZXJSaW5ncy5sZW5ndGggLSAxOyB4ID49IDA7IHgtLSkge1xuICAgICAgb3V0ZXJSaW5nID0gb3V0ZXJSaW5nc1t4XVswXTtcbiAgICAgIGlmIChhcnJheUludGVyc2VjdHNBcnJheShvdXRlclJpbmcsIGhvbGUpKSB7XG4gICAgICAgIC8vIHRoZSBob2xlIGlzIGNvbnRhaW5lZCBwdXNoIGl0IGludG8gb3VyIHBvbHlnb25cbiAgICAgICAgb3V0ZXJSaW5nc1t4XS5wdXNoKGhvbGUpO1xuICAgICAgICBpbnRlcnNlY3RzID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpbnRlcnNlY3RzKSB7XG4gICAgICBvdXRlclJpbmdzLnB1c2goW2hvbGUucmV2ZXJzZSgpXSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG91dGVyUmluZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdQb2x5Z29uJyxcbiAgICAgIGNvb3JkaW5hdGVzOiBvdXRlclJpbmdzWzBdXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ011bHRpUG9seWdvbicsXG4gICAgICBjb29yZGluYXRlczogb3V0ZXJSaW5nc1xuICAgIH07XG4gIH1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBlbnN1cmVzIHRoYXQgcmluZ3MgYXJlIG9yaWVudGVkIGluIHRoZSByaWdodCBkaXJlY3Rpb25zXG4vLyBvdXRlciByaW5ncyBhcmUgY2xvY2t3aXNlLCBob2xlcyBhcmUgY291bnRlcmNsb2Nrd2lzZVxuLy8gdXNlZCBmb3IgY29udmVydGluZyBHZW9KU09OIFBvbHlnb25zIHRvIEFyY0dJUyBQb2x5Z29uc1xuZnVuY3Rpb24gb3JpZW50UmluZ3MgKHBvbHkpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICB2YXIgcG9seWdvbiA9IHBvbHkuc2xpY2UoMCk7XG4gIHZhciBvdXRlclJpbmcgPSBjbG9zZVJpbmcocG9seWdvbi5zaGlmdCgpLnNsaWNlKDApKTtcbiAgaWYgKG91dGVyUmluZy5sZW5ndGggPj0gNCkge1xuICAgIGlmICghcmluZ0lzQ2xvY2t3aXNlKG91dGVyUmluZykpIHtcbiAgICAgIG91dGVyUmluZy5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgb3V0cHV0LnB1c2gob3V0ZXJSaW5nKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9seWdvbi5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhvbGUgPSBjbG9zZVJpbmcocG9seWdvbltpXS5zbGljZSgwKSk7XG4gICAgICBpZiAoaG9sZS5sZW5ndGggPj0gNCkge1xuICAgICAgICBpZiAocmluZ0lzQ2xvY2t3aXNlKGhvbGUpKSB7XG4gICAgICAgICAgaG9sZS5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0LnB1c2goaG9sZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBmbGF0dGVucyBob2xlcyBpbiBtdWx0aXBvbHlnb25zIHRvIG9uZSBhcnJheSBvZiBwb2x5Z29uc1xuLy8gdXNlZCBmb3IgY29udmVydGluZyBHZW9KU09OIFBvbHlnb25zIHRvIEFyY0dJUyBQb2x5Z29uc1xuZnVuY3Rpb24gZmxhdHRlbk11bHRpUG9seWdvblJpbmdzIChyaW5ncykge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcG9seWdvbiA9IG9yaWVudFJpbmdzKHJpbmdzW2ldKTtcbiAgICBmb3IgKHZhciB4ID0gcG9seWdvbi5sZW5ndGggLSAxOyB4ID49IDA7IHgtLSkge1xuICAgICAgdmFyIHJpbmcgPSBwb2x5Z29uW3hdLnNsaWNlKDApO1xuICAgICAgb3V0cHV0LnB1c2gocmluZyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbi8vIHNoYWxsb3cgb2JqZWN0IGNsb25lIGZvciBmZWF0dXJlIHByb3BlcnRpZXMgYW5kIGF0dHJpYnV0ZXNcbi8vIGZyb20gaHR0cDovL2pzcGVyZi5jb20vY2xvbmluZy1hbi1vYmplY3QvMlxuZnVuY3Rpb24gc2hhbGxvd0Nsb25lIChvYmopIHtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIHRhcmdldFtpXSA9IG9ialtpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyY2dpc1RvR2VvSlNPTiAoYXJjZ2lzLCBpZEF0dHJpYnV0ZSkge1xuICB2YXIgZ2VvanNvbiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgYXJjZ2lzLnggPT09ICdudW1iZXInICYmIHR5cGVvZiBhcmNnaXMueSA9PT0gJ251bWJlcicpIHtcbiAgICBnZW9qc29uLnR5cGUgPSAnUG9pbnQnO1xuICAgIGdlb2pzb24uY29vcmRpbmF0ZXMgPSBbYXJjZ2lzLngsIGFyY2dpcy55XTtcbiAgfVxuXG4gIGlmIChhcmNnaXMucG9pbnRzKSB7XG4gICAgZ2VvanNvbi50eXBlID0gJ011bHRpUG9pbnQnO1xuICAgIGdlb2pzb24uY29vcmRpbmF0ZXMgPSBhcmNnaXMucG9pbnRzLnNsaWNlKDApO1xuICB9XG5cbiAgaWYgKGFyY2dpcy5wYXRocykge1xuICAgIGlmIChhcmNnaXMucGF0aHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBnZW9qc29uLnR5cGUgPSAnTGluZVN0cmluZyc7XG4gICAgICBnZW9qc29uLmNvb3JkaW5hdGVzID0gYXJjZ2lzLnBhdGhzWzBdLnNsaWNlKDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW9qc29uLnR5cGUgPSAnTXVsdGlMaW5lU3RyaW5nJztcbiAgICAgIGdlb2pzb24uY29vcmRpbmF0ZXMgPSBhcmNnaXMucGF0aHMuc2xpY2UoMCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFyY2dpcy5yaW5ncykge1xuICAgIGdlb2pzb24gPSBjb252ZXJ0UmluZ3NUb0dlb0pTT04oYXJjZ2lzLnJpbmdzLnNsaWNlKDApKTtcbiAgfVxuXG4gIGlmIChhcmNnaXMuZ2VvbWV0cnkgfHwgYXJjZ2lzLmF0dHJpYnV0ZXMpIHtcbiAgICBnZW9qc29uLnR5cGUgPSAnRmVhdHVyZSc7XG4gICAgZ2VvanNvbi5nZW9tZXRyeSA9IChhcmNnaXMuZ2VvbWV0cnkpID8gYXJjZ2lzVG9HZW9KU09OKGFyY2dpcy5nZW9tZXRyeSkgOiBudWxsO1xuICAgIGdlb2pzb24ucHJvcGVydGllcyA9IChhcmNnaXMuYXR0cmlidXRlcykgPyBzaGFsbG93Q2xvbmUoYXJjZ2lzLmF0dHJpYnV0ZXMpIDogbnVsbDtcbiAgICBpZiAoYXJjZ2lzLmF0dHJpYnV0ZXMpIHtcbiAgICAgIGdlb2pzb24uaWQgPSBhcmNnaXMuYXR0cmlidXRlc1tpZEF0dHJpYnV0ZV0gfHwgYXJjZ2lzLmF0dHJpYnV0ZXMuT0JKRUNUSUQgfHwgYXJjZ2lzLmF0dHJpYnV0ZXMuRklEO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZW9qc29uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VvanNvblRvQXJjR0lTIChnZW9qc29uLCBpZEF0dHJpYnV0ZSkge1xuICBpZEF0dHJpYnV0ZSA9IGlkQXR0cmlidXRlIHx8ICdPQkpFQ1RJRCc7XG4gIHZhciBzcGF0aWFsUmVmZXJlbmNlID0geyB3a2lkOiA0MzI2IH07XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgdmFyIGk7XG5cbiAgc3dpdGNoIChnZW9qc29uLnR5cGUpIHtcbiAgICBjYXNlICdQb2ludCc6XG4gICAgICByZXN1bHQueCA9IGdlb2pzb24uY29vcmRpbmF0ZXNbMF07XG4gICAgICByZXN1bHQueSA9IGdlb2pzb24uY29vcmRpbmF0ZXNbMV07XG4gICAgICByZXN1bHQuc3BhdGlhbFJlZmVyZW5jZSA9IHNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aVBvaW50JzpcbiAgICAgIHJlc3VsdC5wb2ludHMgPSBnZW9qc29uLmNvb3JkaW5hdGVzLnNsaWNlKDApO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTGluZVN0cmluZyc6XG4gICAgICByZXN1bHQucGF0aHMgPSBbZ2VvanNvbi5jb29yZGluYXRlcy5zbGljZSgwKV07XG4gICAgICByZXN1bHQuc3BhdGlhbFJlZmVyZW5jZSA9IHNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aUxpbmVTdHJpbmcnOlxuICAgICAgcmVzdWx0LnBhdGhzID0gZ2VvanNvbi5jb29yZGluYXRlcy5zbGljZSgwKTtcbiAgICAgIHJlc3VsdC5zcGF0aWFsUmVmZXJlbmNlID0gc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1BvbHlnb24nOlxuICAgICAgcmVzdWx0LnJpbmdzID0gb3JpZW50UmluZ3MoZ2VvanNvbi5jb29yZGluYXRlcy5zbGljZSgwKSk7XG4gICAgICByZXN1bHQuc3BhdGlhbFJlZmVyZW5jZSA9IHNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxuICAgICAgcmVzdWx0LnJpbmdzID0gZmxhdHRlbk11bHRpUG9seWdvblJpbmdzKGdlb2pzb24uY29vcmRpbmF0ZXMuc2xpY2UoMCkpO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRmVhdHVyZSc6XG4gICAgICBpZiAoZ2VvanNvbi5nZW9tZXRyeSkge1xuICAgICAgICByZXN1bHQuZ2VvbWV0cnkgPSBnZW9qc29uVG9BcmNHSVMoZ2VvanNvbi5nZW9tZXRyeSwgaWRBdHRyaWJ1dGUpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmF0dHJpYnV0ZXMgPSAoZ2VvanNvbi5wcm9wZXJ0aWVzKSA/IHNoYWxsb3dDbG9uZShnZW9qc29uLnByb3BlcnRpZXMpIDoge307XG4gICAgICBpZiAoZ2VvanNvbi5pZCkge1xuICAgICAgICByZXN1bHQuYXR0cmlidXRlc1tpZEF0dHJpYnV0ZV0gPSBnZW9qc29uLmlkO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRmVhdHVyZUNvbGxlY3Rpb24nOlxuICAgICAgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZ2VvanNvbi5mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQucHVzaChnZW9qc29uVG9BcmNHSVMoZ2VvanNvbi5mZWF0dXJlc1tpXSwgaWRBdHRyaWJ1dGUpKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0dlb21ldHJ5Q29sbGVjdGlvbic6XG4gICAgICByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBnZW9qc29uLmdlb21ldHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZ2VvanNvblRvQXJjR0lTKGdlb2pzb24uZ2VvbWV0cmllc1tpXSwgaWRBdHRyaWJ1dGUpKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsganNvbnAgfSBmcm9tICcuL1JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgZ2VvanNvblRvQXJjR0lTIGFzIGcyYSxcbiAgYXJjZ2lzVG9HZW9KU09OIGFzIGEyZ1xufSBmcm9tICdhcmNnaXMtdG8tZ2VvanNvbi11dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9qc29uVG9BcmNHSVMgKGdlb2pzb24sIGlkQXR0cikge1xuICByZXR1cm4gZzJhKGdlb2pzb24sIGlkQXR0cik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmNnaXNUb0dlb0pTT04gKGFyY2dpcywgaWRBdHRyKSB7XG4gIHJldHVybiBhMmcoYXJjZ2lzLCBpZEF0dHIpO1xufVxuXG4vLyBzaGFsbG93IG9iamVjdCBjbG9uZSBmb3IgZmVhdHVyZSBwcm9wZXJ0aWVzIGFuZCBhdHRyaWJ1dGVzXG4vLyBmcm9tIGh0dHA6Ly9qc3BlcmYuY29tL2Nsb25pbmctYW4tb2JqZWN0LzJcbmV4cG9ydCBmdW5jdGlvbiBzaGFsbG93Q2xvbmUgKG9iaikge1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgdGFyZ2V0W2ldID0gb2JqW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG4vLyBjb252ZXJ0IGFuIGV4dGVudCAoQXJjR0lTKSB0byBMYXRMbmdCb3VuZHMgKExlYWZsZXQpXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW50VG9Cb3VuZHMgKGV4dGVudCkge1xuICB2YXIgc3cgPSBMLmxhdExuZyhleHRlbnQueW1pbiwgZXh0ZW50LnhtaW4pO1xuICB2YXIgbmUgPSBMLmxhdExuZyhleHRlbnQueW1heCwgZXh0ZW50LnhtYXgpO1xuICByZXR1cm4gTC5sYXRMbmdCb3VuZHMoc3csIG5lKTtcbn1cblxuLy8gY29udmVydCBhbiBMYXRMbmdCb3VuZHMgKExlYWZsZXQpIHRvIGV4dGVudCAoQXJjR0lTKVxuZXhwb3J0IGZ1bmN0aW9uIGJvdW5kc1RvRXh0ZW50IChib3VuZHMpIHtcbiAgYm91bmRzID0gTC5sYXRMbmdCb3VuZHMoYm91bmRzKTtcbiAgcmV0dXJuIHtcbiAgICAneG1pbic6IGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sbmcsXG4gICAgJ3ltaW4nOiBib3VuZHMuZ2V0U291dGhXZXN0KCkubGF0LFxuICAgICd4bWF4JzogYm91bmRzLmdldE5vcnRoRWFzdCgpLmxuZyxcbiAgICAneW1heCc6IGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sYXQsXG4gICAgJ3NwYXRpYWxSZWZlcmVuY2UnOiB7XG4gICAgICAnd2tpZCc6IDQzMjZcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24gKHJlc3BvbnNlLCBpZEF0dHJpYnV0ZSkge1xuICB2YXIgb2JqZWN0SWRGaWVsZDtcblxuICBpZiAoaWRBdHRyaWJ1dGUpIHtcbiAgICBvYmplY3RJZEZpZWxkID0gaWRBdHRyaWJ1dGU7XG4gIH0gZWxzZSBpZiAocmVzcG9uc2Uub2JqZWN0SWRGaWVsZE5hbWUpIHtcbiAgICBvYmplY3RJZEZpZWxkID0gcmVzcG9uc2Uub2JqZWN0SWRGaWVsZE5hbWU7XG4gIH0gZWxzZSBpZiAocmVzcG9uc2UuZmllbGRzKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPD0gcmVzcG9uc2UuZmllbGRzLmxlbmd0aCAtIDE7IGorKykge1xuICAgICAgaWYgKHJlc3BvbnNlLmZpZWxkc1tqXS50eXBlID09PSAnZXNyaUZpZWxkVHlwZU9JRCcpIHtcbiAgICAgICAgb2JqZWN0SWRGaWVsZCA9IHJlc3BvbnNlLmZpZWxkc1tqXS5uYW1lO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0SWRGaWVsZCA9ICdPQkpFQ1RJRCc7XG4gIH1cblxuICB2YXIgZmVhdHVyZUNvbGxlY3Rpb24gPSB7XG4gICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICBmZWF0dXJlczogW11cbiAgfTtcbiAgdmFyIGZlYXR1cmVzID0gcmVzcG9uc2UuZmVhdHVyZXMgfHwgcmVzcG9uc2UucmVzdWx0cztcbiAgaWYgKGZlYXR1cmVzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSBmZWF0dXJlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZlYXR1cmUgPSBhcmNnaXNUb0dlb0pTT04oZmVhdHVyZXNbaV0sIG9iamVjdElkRmllbGQpO1xuICAgICAgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb247XG59XG5cbiAgLy8gdHJpbSB1cmwgd2hpdGVzcGFjZSBhbmQgYWRkIGEgdHJhaWxpbmcgc2xhc2ggaWYgbmVlZGVkXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5VcmwgKHVybCkge1xuICAvLyB0cmltIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNwYWNlcywgYnV0IG5vdCBzcGFjZXMgaW5zaWRlIHRoZSB1cmxcbiAgdXJsID0gTC5VdGlsLnRyaW0odXJsKTtcblxuICAvLyBhZGQgYSB0cmFpbGluZyBzbGFzaCB0byB0aGUgdXJsIGlmIHRoZSB1c2VyIG9taXR0ZWQgaXRcbiAgaWYgKHVybFt1cmwubGVuZ3RoIC0gMV0gIT09ICcvJykge1xuICAgIHVybCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBcmNnaXNPbmxpbmUgKHVybCkge1xuICAvKiBob3N0ZWQgZmVhdHVyZSBzZXJ2aWNlcyBjYW4gZW1pdCBnZW9qc29uIG5hdGl2ZWx5LiAqL1xuICByZXR1cm4gKC9cXC5hcmNnaXNcXC5jb20uKj9GZWF0dXJlU2VydmVyL2cpLnRlc3QodXJsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2pzb25UeXBlVG9BcmNHSVMgKGdlb0pzb25UeXBlKSB7XG4gIHZhciBhcmNnaXNHZW9tZXRyeVR5cGU7XG4gIHN3aXRjaCAoZ2VvSnNvblR5cGUpIHtcbiAgICBjYXNlICdQb2ludCc6XG4gICAgICBhcmNnaXNHZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9pbnQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlQb2ludCc6XG4gICAgICBhcmNnaXNHZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5TXVsdGlwb2ludCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdMaW5lU3RyaW5nJzpcbiAgICAgIGFyY2dpc0dlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2x5bGluZSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aUxpbmVTdHJpbmcnOlxuICAgICAgYXJjZ2lzR2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvbHlsaW5lJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1BvbHlnb24nOlxuICAgICAgYXJjZ2lzR2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvbHlnb24nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTXVsdGlQb2x5Z29uJzpcbiAgICAgIGFyY2dpc0dlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2x5Z29uJztcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIGFyY2dpc0dlb21ldHJ5VHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdhcm4gKCkge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY0F0dHJpYnV0aW9uV2lkdGggKG1hcCkge1xuICAvLyBzbGlnaHRseSBsZXNzIHRoYW4gdGhlIHdpZHRoIG9mIHRoZSBtYXBcbiAgcmV0dXJuIChtYXAuZ2V0U2l6ZSgpLnggLSAyMCkgKyAncHgnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RXNyaUF0dHJpYnV0aW9uIChtYXApIHtcbiAgaWYgKG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wgJiYgIW1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuX2VzcmlBdHRyaWJ1dGlvbkFkZGVkKSB7XG4gICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5zZXRQcmVmaXgoJzxhIGhyZWY9XCJodHRwOi8vbGVhZmxldGpzLmNvbVwiIHRpdGxlPVwiQSBKUyBsaWJyYXJ5IGZvciBpbnRlcmFjdGl2ZSBtYXBzXCI+TGVhZmxldDwvYT4gfCBQb3dlcmVkIGJ5IDxhIGhyZWY9XCJodHRwczovL3d3dy5lc3JpLmNvbVwiPkVzcmk8L2E+Jyk7XG5cbiAgICB2YXIgaG92ZXJBdHRyaWJ1dGlvblN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBob3ZlckF0dHJpYnV0aW9uU3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgaG92ZXJBdHRyaWJ1dGlvblN0eWxlLmlubmVySFRNTCA9ICcuZXNyaS10cnVuY2F0ZWQtYXR0cmlidXRpb246aG92ZXIgeycgK1xuICAgICAgJ3doaXRlLXNwYWNlOiBub3JtYWw7J1xuICAgICd9JztcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoaG92ZXJBdHRyaWJ1dGlvblN0eWxlKTtcbiAgICBMLkRvbVV0aWwuYWRkQ2xhc3MobWFwLmF0dHJpYnV0aW9uQ29udHJvbC5fY29udGFpbmVyLCAnZXNyaS10cnVuY2F0ZWQtYXR0cmlidXRpb246aG92ZXInKTtcblxuICAgIC8vIGRlZmluZSBhIG5ldyBjc3MgY2xhc3MgaW4gSlMgdG8gdHJpbSBhdHRyaWJ1dGlvbiBpbnRvIGEgc2luZ2xlIGxpbmVcbiAgICB2YXIgYXR0cmlidXRpb25TdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgYXR0cmlidXRpb25TdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICBhdHRyaWJ1dGlvblN0eWxlLmlubmVySFRNTCA9ICcuZXNyaS10cnVuY2F0ZWQtYXR0cmlidXRpb24geycgK1xuICAgICAgJ3ZlcnRpY2FsLWFsaWduOiAtM3B4OycgK1xuICAgICAgJ3doaXRlLXNwYWNlOiBub3dyYXA7JyArXG4gICAgICAnb3ZlcmZsb3c6IGhpZGRlbjsnICtcbiAgICAgICd0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsnICtcbiAgICAgICdkaXNwbGF5OiBpbmxpbmUtYmxvY2s7JyArXG4gICAgICAndHJhbnNpdGlvbjogMHMgd2hpdGUtc3BhY2U7JyArXG4gICAgICAndHJhbnNpdGlvbi1kZWxheTogMXM7JyArXG4gICAgICAnbWF4LXdpZHRoOicgKyBMLmVzcmkuVXRpbC5jYWxjQXR0cmlidXRpb25XaWR0aChtYXApICsnOydcbiAgICAnfSc7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGF0dHJpYnV0aW9uU3R5bGUpO1xuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIsICdlc3JpLXRydW5jYXRlZC1hdHRyaWJ1dGlvbicpO1xuXG4gICAgLy8gdXBkYXRlIHRoZSB3aWR0aCB1c2VkIHRvIHRydW5jYXRlIHdoZW4gdGhlIG1hcCBpdHNlbGYgaXMgcmVzaXplZFxuICAgIG1hcC5vbigncmVzaXplJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuX2NvbnRhaW5lci5zdHlsZS5tYXhXaWR0aCA9IEwuZXNyaS5VdGlsLmNhbGNBdHRyaWJ1dGlvbldpZHRoKGUudGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuX2VzcmlBdHRyaWJ1dGlvbkFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2dldEF0dHJpYnV0aW9uRGF0YSAodXJsLCBtYXApIHtcbiAganNvbnAodXJsLCB7fSwgTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBhdHRyaWJ1dGlvbnMpIHtcbiAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9XG4gICAgbWFwLl9lc3JpQXR0cmlidXRpb25zID0gW107XG4gICAgZm9yICh2YXIgYyA9IDA7IGMgPCBhdHRyaWJ1dGlvbnMuY29udHJpYnV0b3JzLmxlbmd0aDsgYysrKSB7XG4gICAgICB2YXIgY29udHJpYnV0b3IgPSBhdHRyaWJ1dGlvbnMuY29udHJpYnV0b3JzW2NdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRyaWJ1dG9yLmNvdmVyYWdlQXJlYXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNvdmVyYWdlQXJlYSA9IGNvbnRyaWJ1dG9yLmNvdmVyYWdlQXJlYXNbaV07XG4gICAgICAgIHZhciBzb3V0aFdlc3QgPSBMLmxhdExuZyhjb3ZlcmFnZUFyZWEuYmJveFswXSwgY292ZXJhZ2VBcmVhLmJib3hbMV0pO1xuICAgICAgICB2YXIgbm9ydGhFYXN0ID0gTC5sYXRMbmcoY292ZXJhZ2VBcmVhLmJib3hbMl0sIGNvdmVyYWdlQXJlYS5iYm94WzNdKTtcbiAgICAgICAgbWFwLl9lc3JpQXR0cmlidXRpb25zLnB1c2goe1xuICAgICAgICAgIGF0dHJpYnV0aW9uOiBjb250cmlidXRvci5hdHRyaWJ1dGlvbixcbiAgICAgICAgICBzY29yZTogY292ZXJhZ2VBcmVhLnNjb3JlLFxuICAgICAgICAgIGJvdW5kczogTC5sYXRMbmdCb3VuZHMoc291dGhXZXN0LCBub3J0aEVhc3QpLFxuICAgICAgICAgIG1pblpvb206IGNvdmVyYWdlQXJlYS56b29tTWluLFxuICAgICAgICAgIG1heFpvb206IGNvdmVyYWdlQXJlYS56b29tTWF4XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1hcC5fZXNyaUF0dHJpYnV0aW9ucy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmU7XG4gICAgfSk7XG5cbiAgICAvLyBwYXNzIHRoZSBzYW1lIGFyZ3VtZW50IGFzIHRoZSBtYXAncyAnbW92ZWVuZCcgZXZlbnRcbiAgICB2YXIgb2JqID0geyB0YXJnZXQ6IG1hcCB9O1xuICAgIF91cGRhdGVNYXBBdHRyaWJ1dGlvbihvYmopO1xuICB9LCB0aGlzKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfdXBkYXRlTWFwQXR0cmlidXRpb24gKGV2dCkge1xuICB2YXIgbWFwID0gZXZ0LnRhcmdldDtcbiAgdmFyIG9sZEF0dHJpYnV0aW9ucyA9IG1hcC5fZXNyaUF0dHJpYnV0aW9ucztcblxuICBpZiAobWFwICYmIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wgJiYgb2xkQXR0cmlidXRpb25zKSB7XG4gICAgdmFyIG5ld0F0dHJpYnV0aW9ucyA9ICcnO1xuICAgIHZhciBib3VuZHMgPSBtYXAuZ2V0Qm91bmRzKCk7XG4gICAgdmFyIHdyYXBwZWRCb3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhcbiAgICAgIGJvdW5kcy5nZXRTb3V0aFdlc3QoKS53cmFwKCksXG4gICAgICBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkud3JhcCgpXG4gICAgKTtcbiAgICB2YXIgem9vbSA9IG1hcC5nZXRab29tKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZEF0dHJpYnV0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGF0dHJpYnV0aW9uID0gb2xkQXR0cmlidXRpb25zW2ldO1xuICAgICAgdmFyIHRleHQgPSBhdHRyaWJ1dGlvbi5hdHRyaWJ1dGlvbjtcblxuICAgICAgaWYgKCFuZXdBdHRyaWJ1dGlvbnMubWF0Y2godGV4dCkgJiYgYXR0cmlidXRpb24uYm91bmRzLmludGVyc2VjdHMod3JhcHBlZEJvdW5kcykgJiYgem9vbSA+PSBhdHRyaWJ1dGlvbi5taW5ab29tICYmIHpvb20gPD0gYXR0cmlidXRpb24ubWF4Wm9vbSkge1xuICAgICAgICBuZXdBdHRyaWJ1dGlvbnMgKz0gKCcsICcgKyB0ZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdBdHRyaWJ1dGlvbnMgPSBuZXdBdHRyaWJ1dGlvbnMuc3Vic3RyKDIpO1xuICAgIHZhciBhdHRyaWJ1dGlvbkVsZW1lbnQgPSBtYXAuYXR0cmlidXRpb25Db250cm9sLl9jb250YWluZXIucXVlcnlTZWxlY3RvcignLmVzcmktZHluYW1pYy1hdHRyaWJ1dGlvbicpO1xuXG4gICAgYXR0cmlidXRpb25FbGVtZW50LmlubmVySFRNTCA9IG5ld0F0dHJpYnV0aW9ucztcbiAgICBhdHRyaWJ1dGlvbkVsZW1lbnQuc3R5bGUubWF4V2lkdGggPSBjYWxjQXR0cmlidXRpb25XaWR0aChtYXApO1xuXG4gICAgbWFwLmZpcmUoJ2F0dHJpYnV0aW9udXBkYXRlZCcsIHtcbiAgICAgIGF0dHJpYnV0aW9uOiBuZXdBdHRyaWJ1dGlvbnNcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIFV0aWwgPSB7XG4gIHNoYWxsb3dDbG9uZTogc2hhbGxvd0Nsb25lLFxuICB3YXJuOiB3YXJuLFxuICBjbGVhblVybDogY2xlYW5VcmwsXG4gIGlzQXJjZ2lzT25saW5lOiBpc0FyY2dpc09ubGluZSxcbiAgZ2VvanNvblR5cGVUb0FyY0dJUzogZ2VvanNvblR5cGVUb0FyY0dJUyxcbiAgcmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uOiByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24sXG4gIGdlb2pzb25Ub0FyY0dJUzogZ2VvanNvblRvQXJjR0lTLFxuICBhcmNnaXNUb0dlb0pTT046IGFyY2dpc1RvR2VvSlNPTixcbiAgYm91bmRzVG9FeHRlbnQ6IGJvdW5kc1RvRXh0ZW50LFxuICBleHRlbnRUb0JvdW5kczogZXh0ZW50VG9Cb3VuZHMsXG4gIGNhbGNBdHRyaWJ1dGlvbldpZHRoOiBjYWxjQXR0cmlidXRpb25XaWR0aCxcbiAgc2V0RXNyaUF0dHJpYnV0aW9uOiBzZXRFc3JpQXR0cmlidXRpb24sXG4gIF9nZXRBdHRyaWJ1dGlvbkRhdGE6IF9nZXRBdHRyaWJ1dGlvbkRhdGEsXG4gIF91cGRhdGVNYXBBdHRyaWJ1dGlvbjogX3VwZGF0ZU1hcEF0dHJpYnV0aW9uXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVdGlsO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQge2NvcnN9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHtjbGVhblVybH0gZnJvbSAnLi4vVXRpbCc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9SZXF1ZXN0JztcblxuZXhwb3J0IHZhciBUYXNrID0gTC5DbGFzcy5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBwcm94eTogZmFsc2UsXG4gICAgdXNlQ29yczogY29yc1xuICB9LFxuXG4gIC8vIEdlbmVyYXRlIGEgbWV0aG9kIGZvciBlYWNoIG1ldGhvZE5hbWU6cGFyYW1OYW1lIGluIHRoZSBzZXR0ZXJzIGZvciB0aGlzIHRhc2suXG4gIGdlbmVyYXRlU2V0dGVyOiBmdW5jdGlvbiAocGFyYW0sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB0aGlzLnBhcmFtc1twYXJhbV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIGNvbnRleHQpO1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChlbmRwb2ludCkge1xuICAgIC8vIGVuZHBvaW50IGNhbiBiZSBlaXRoZXIgYSB1cmwgKGFuZCBvcHRpb25zKSBmb3IgYW4gQXJjR0lTIFJlc3QgU2VydmljZSBvciBhbiBpbnN0YW5jZSBvZiBFc3JpTGVhZmxldC5TZXJ2aWNlXG4gICAgaWYgKGVuZHBvaW50LnJlcXVlc3QgJiYgZW5kcG9pbnQub3B0aW9ucykge1xuICAgICAgdGhpcy5fc2VydmljZSA9IGVuZHBvaW50O1xuICAgICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgZW5kcG9pbnQub3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIGVuZHBvaW50KTtcbiAgICAgIHRoaXMub3B0aW9ucy51cmwgPSBjbGVhblVybChlbmRwb2ludC51cmwpO1xuICAgIH1cblxuICAgIC8vIGNsb25lIGRlZmF1bHQgcGFyYW1zIGludG8gdGhpcyBvYmplY3RcbiAgICB0aGlzLnBhcmFtcyA9IEwuVXRpbC5leHRlbmQoe30sIHRoaXMucGFyYW1zIHx8IHt9KTtcblxuICAgIC8vIGdlbmVyYXRlIHNldHRlciBtZXRob2RzIGJhc2VkIG9uIHRoZSBzZXR0ZXJzIG9iamVjdCBpbXBsaW1lbnRlZCBhIGNoaWxkIGNsYXNzXG4gICAgaWYgKHRoaXMuc2V0dGVycykge1xuICAgICAgZm9yICh2YXIgc2V0dGVyIGluIHRoaXMuc2V0dGVycykge1xuICAgICAgICB2YXIgcGFyYW0gPSB0aGlzLnNldHRlcnNbc2V0dGVyXTtcbiAgICAgICAgdGhpc1tzZXR0ZXJdID0gdGhpcy5nZW5lcmF0ZVNldHRlcihwYXJhbSwgdGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHRva2VuOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICBpZiAodGhpcy5fc2VydmljZSkge1xuICAgICAgdGhpcy5fc2VydmljZS5hdXRoZW50aWNhdGUodG9rZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcmFtcy50b2tlbiA9IHRva2VuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZXF1ZXN0OiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAodGhpcy5fc2VydmljZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2UucmVxdWVzdCh0aGlzLnBhdGgsIHRoaXMucGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ3JlcXVlc3QnLCB0aGlzLnBhdGgsIHRoaXMucGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH0sXG5cbiAgX3JlcXVlc3Q6IGZ1bmN0aW9uIChtZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgdXJsID0gKHRoaXMub3B0aW9ucy5wcm94eSkgPyB0aGlzLm9wdGlvbnMucHJveHkgKyAnPycgKyB0aGlzLm9wdGlvbnMudXJsICsgcGF0aCA6IHRoaXMub3B0aW9ucy51cmwgKyBwYXRoO1xuXG4gICAgaWYgKChtZXRob2QgPT09ICdnZXQnIHx8IG1ldGhvZCA9PT0gJ3JlcXVlc3QnKSAmJiAhdGhpcy5vcHRpb25zLnVzZUNvcnMpIHtcbiAgICAgIHJldHVybiBSZXF1ZXN0LmdldC5KU09OUCh1cmwsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiBSZXF1ZXN0W21ldGhvZF0odXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0YXNrIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgVGFzayhvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGFzaztcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vVGFzayc7XG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBRdWVyeSA9IFRhc2suZXh0ZW5kKHtcbiAgc2V0dGVyczoge1xuICAgICdvZmZzZXQnOiAncmVzdWx0T2Zmc2V0JyxcbiAgICAnbGltaXQnOiAncmVzdWx0UmVjb3JkQ291bnQnLFxuICAgICdmaWVsZHMnOiAnb3V0RmllbGRzJyxcbiAgICAncHJlY2lzaW9uJzogJ2dlb21ldHJ5UHJlY2lzaW9uJyxcbiAgICAnZmVhdHVyZUlkcyc6ICdvYmplY3RJZHMnLFxuICAgICdyZXR1cm5HZW9tZXRyeSc6ICdyZXR1cm5HZW9tZXRyeScsXG4gICAgJ3Rva2VuJzogJ3Rva2VuJ1xuICB9LFxuXG4gIHBhdGg6ICdxdWVyeScsXG5cbiAgcGFyYW1zOiB7XG4gICAgcmV0dXJuR2VvbWV0cnk6IHRydWUsXG4gICAgd2hlcmU6ICcxPTEnLFxuICAgIG91dFNyOiA0MzI2LFxuICAgIG91dEZpZWxkczogJyonXG4gIH0sXG5cbiAgd2l0aGluOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeShnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbENvbnRhaW5zJzsgLy8gd2lsbCBtYWtlIGNvZGUgcmVhZCBsYXllciB3aXRoaW4gZ2VvbWV0cnksIHRvIHRoZSBhcGkgdGhpcyB3aWxsIHJlYWRzIGdlb21ldHJ5IGNvbnRhaW5zIGxheWVyXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgaW50ZXJzZWN0czogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnkoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxJbnRlcnNlY3RzJztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBjb250YWluczogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnkoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxXaXRoaW4nOyAvLyB3aWxsIG1ha2UgY29kZSByZWFkIGxheWVyIGNvbnRhaW5zIGdlb21ldHJ5LCB0byB0aGUgYXBpIHRoaXMgd2lsbCByZWFkcyBnZW9tZXRyeSB3aXRoaW4gbGF5ZXJcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBjcm9zc2VzOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeShnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbENyb3NzZXMnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHRvdWNoZXM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5KGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsVG91Y2hlcyc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb3ZlcmxhcHM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5KGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsT3ZlcmxhcHMnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8vIG9ubHkgdmFsaWQgZm9yIEZlYXR1cmUgU2VydmljZXMgcnVubmluZyBvbiBBcmNHSVMgU2VydmVyIDEwLjMgb3IgQXJjR0lTIE9ubGluZVxuICBuZWFyYnk6IGZ1bmN0aW9uIChsYXRsbmcsIHJhZGl1cykge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnkgPSBbbGF0bG5nLmxuZywgbGF0bG5nLmxhdF07XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvaW50JztcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsSW50ZXJzZWN0cyc7XG4gICAgdGhpcy5wYXJhbXMudW5pdHMgPSAnZXNyaVNSVW5pdF9NZXRlcic7XG4gICAgdGhpcy5wYXJhbXMuZGlzdGFuY2UgPSByYWRpdXM7XG4gICAgdGhpcy5wYXJhbXMuaW5TciA9IDQzMjY7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgd2hlcmU6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAvLyBpbnN0ZWFkIG9mIGNvbnZlcnRpbmcgZG91YmxlLXF1b3RlcyB0byBzaW5nbGUgcXVvdGVzLCBwYXNzIGFzIGlzLCBhbmQgcHJvdmlkZSBhIG1vcmUgaW5mb3JtYXRpdmUgbWVzc2FnZSBpZiBhIDQwMCBpcyBlbmNvdW50ZXJlZFxuICAgIHRoaXMucGFyYW1zLndoZXJlID0gc3RyaW5nO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGJldHdlZW46IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgdGhpcy5wYXJhbXMudGltZSA9IFtzdGFydC52YWx1ZU9mKCksIGVuZC52YWx1ZU9mKCldO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHNpbXBsaWZ5OiBmdW5jdGlvbiAobWFwLCBmYWN0b3IpIHtcbiAgICB2YXIgbWFwV2lkdGggPSBNYXRoLmFicyhtYXAuZ2V0Qm91bmRzKCkuZ2V0V2VzdCgpIC0gbWFwLmdldEJvdW5kcygpLmdldEVhc3QoKSk7XG4gICAgdGhpcy5wYXJhbXMubWF4QWxsb3dhYmxlT2Zmc2V0ID0gKG1hcFdpZHRoIC8gbWFwLmdldFNpemUoKS55KSAqIGZhY3RvcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvcmRlckJ5OiBmdW5jdGlvbiAoZmllbGROYW1lLCBvcmRlcikge1xuICAgIG9yZGVyID0gb3JkZXIgfHwgJ0FTQyc7XG4gICAgdGhpcy5wYXJhbXMub3JkZXJCeUZpZWxkcyA9ICh0aGlzLnBhcmFtcy5vcmRlckJ5RmllbGRzKSA/IHRoaXMucGFyYW1zLm9yZGVyQnlGaWVsZHMgKyAnLCcgOiAnJztcbiAgICB0aGlzLnBhcmFtcy5vcmRlckJ5RmllbGRzICs9IChbZmllbGROYW1lLCBvcmRlcl0pLmpvaW4oJyAnKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuX2NsZWFuUGFyYW1zKCk7XG5cbiAgICAvLyBzZXJ2aWNlcyBob3N0ZWQgb24gQXJjR0lTIE9ubGluZSBhbHNvIHN1cHBvcnQgcmVxdWVzdGluZyBnZW9qc29uIGRpcmVjdGx5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc01vZGVybiB8fCBVdGlsLmlzQXJjZ2lzT25saW5lKHRoaXMub3B0aW9ucy51cmwpKSB7XG4gICAgICB0aGlzLnBhcmFtcy5mID0gJ2dlb2pzb24nO1xuXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5fdHJhcFNRTGVycm9ycyhlcnJvcik7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlLCByZXNwb25zZSk7XG4gICAgICB9LCB0aGlzKTtcblxuICAgIC8vIG90aGVyd2lzZSBjb252ZXJ0IGl0IGluIHRoZSBjYWxsYmFjayB0aGVuIHBhc3MgaXQgb25cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuX3RyYXBTUUxlcnJvcnMoZXJyb3IpO1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCAocmVzcG9uc2UgJiYgVXRpbC5yZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24ocmVzcG9uc2UpKSwgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICB9LFxuXG4gIGNvdW50OiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jbGVhblBhcmFtcygpO1xuICAgIHRoaXMucGFyYW1zLnJldHVybkNvdW50T25seSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGVycm9yLCAocmVzcG9uc2UgJiYgcmVzcG9uc2UuY291bnQpLCByZXNwb25zZSk7XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgaWRzOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jbGVhblBhcmFtcygpO1xuICAgIHRoaXMucGFyYW1zLnJldHVybklkc09ubHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBlcnJvciwgKHJlc3BvbnNlICYmIHJlc3BvbnNlLm9iamVjdElkcyksIHJlc3BvbnNlKTtcbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICAvLyBvbmx5IHZhbGlkIGZvciBGZWF0dXJlIFNlcnZpY2VzIHJ1bm5pbmcgb24gQXJjR0lTIFNlcnZlciAxMC4zIG9yIEFyY0dJUyBPbmxpbmVcbiAgYm91bmRzOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jbGVhblBhcmFtcygpO1xuICAgIHRoaXMucGFyYW1zLnJldHVybkV4dGVudE9ubHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmV4dGVudCAmJiBVdGlsLmV4dGVudFRvQm91bmRzKHJlc3BvbnNlLmV4dGVudCkpLCByZXNwb25zZSk7XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgLy8gb25seSB2YWxpZCBmb3IgaW1hZ2Ugc2VydmljZXNcbiAgcGl4ZWxTaXplOiBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICBwb2ludCA9IEwucG9pbnQocG9pbnQpO1xuICAgIHRoaXMucGFyYW1zLnBpeGVsU2l6ZSA9IFtwb2ludC54LCBwb2ludC55XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBvbmx5IHZhbGlkIGZvciBtYXAgc2VydmljZXNcbiAgbGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xuICAgIHRoaXMucGF0aCA9IGxheWVyICsgJy9xdWVyeSc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3RyYXBTUUxlcnJvcnM6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICc0MDAnKSB7XG4gICAgICAgIFV0aWwud2Fybignb25lIGNvbW1vbiBzeW50YXggZXJyb3IgaW4gcXVlcnkgcmVxdWVzdHMgaXMgZW5jYXNpbmcgc3RyaW5nIHZhbHVlcyBpbiBkb3VibGUgcXVvdGVzIGluc3RlYWQgb2Ygc2luZ2xlIHF1b3RlcycpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfY2xlYW5QYXJhbXM6IGZ1bmN0aW9uICgpIHtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuSWRzT25seTtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuRXh0ZW50T25seTtcbiAgICBkZWxldGUgdGhpcy5wYXJhbXMucmV0dXJuQ291bnRPbmx5O1xuICB9LFxuXG4gIF9zZXRHZW9tZXRyeTogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5wYXJhbXMuaW5TciA9IDQzMjY7XG5cbiAgICAvLyBjb252ZXJ0IGJvdW5kcyB0byBleHRlbnQgYW5kIGZpbmlzaFxuICAgIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIEwuTGF0TG5nQm91bmRzKSB7XG4gICAgICAvLyBzZXQgZ2VvbWV0cnkgKyBnZW9tZXRyeVR5cGVcbiAgICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gVXRpbC5ib3VuZHNUb0V4dGVudChnZW9tZXRyeSk7XG4gICAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5RW52ZWxvcGUnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnZlcnQgTC5NYXJrZXIgPiBMLkxhdExuZ1xuICAgIGlmIChnZW9tZXRyeS5nZXRMYXRMbmcpIHtcbiAgICAgIGdlb21ldHJ5ID0gZ2VvbWV0cnkuZ2V0TGF0TG5nKCk7XG4gICAgfVxuXG4gICAgLy8gY29udmVydCBMLkxhdExuZyB0byBhIGdlb2pzb24gcG9pbnQgYW5kIGNvbnRpbnVlO1xuICAgIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIEwuTGF0TG5nKSB7XG4gICAgICBnZW9tZXRyeSA9IHtcbiAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtnZW9tZXRyeS5sbmcsIGdlb21ldHJ5LmxhdF1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIEwuR2VvSlNPTiwgcHVsbCBvdXQgdGhlIGZpcnN0IGdlb21ldHJ5XG4gICAgaWYgKGdlb21ldHJ5IGluc3RhbmNlb2YgTC5HZW9KU09OKSB7XG4gICAgICAvLyByZWFzc2lnbiBnZW9tZXRyeSB0byB0aGUgR2VvSlNPTiB2YWx1ZSAgKHdlIGFyZSBhc3N1bWluZyB0aGF0IG9ubHkgb25lIGZlYXR1cmUgaXMgcHJlc2VudClcbiAgICAgIGdlb21ldHJ5ID0gZ2VvbWV0cnkuZ2V0TGF5ZXJzKClbMF0uZmVhdHVyZS5nZW9tZXRyeTtcbiAgICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gVXRpbC5nZW9qc29uVG9BcmNHSVMoZ2VvbWV0cnkpO1xuICAgICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnlUeXBlID0gVXRpbC5nZW9qc29uVHlwZVRvQXJjR0lTKGdlb21ldHJ5LnR5cGUpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBMLlBvbHlsaW5lIGFuZCBMLlBvbHlnb25cbiAgICBpZiAoZ2VvbWV0cnkudG9HZW9KU09OKSB7XG4gICAgICBnZW9tZXRyeSA9IGdlb21ldHJ5LnRvR2VvSlNPTigpO1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBHZW9KU09OIGZlYXR1cmUgYnkgcHVsbGluZyBvdXQgdGhlIGdlb21ldHJ5XG4gICAgaWYgKGdlb21ldHJ5LnR5cGUgPT09ICdGZWF0dXJlJykge1xuICAgICAgLy8gZ2V0IHRoZSBnZW9tZXRyeSBvZiB0aGUgZ2VvanNvbiBmZWF0dXJlXG4gICAgICBnZW9tZXRyeSA9IGdlb21ldHJ5Lmdlb21ldHJ5O1xuICAgIH1cblxuICAgIC8vIGNvbmZpcm0gdGhhdCBvdXIgR2VvSlNPTiBpcyBhIHBvaW50LCBsaW5lIG9yIHBvbHlnb25cbiAgICBpZiAoZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50JyB8fCBnZW9tZXRyeS50eXBlID09PSAnTGluZVN0cmluZycgfHwgZ2VvbWV0cnkudHlwZSA9PT0gJ1BvbHlnb24nKSB7XG4gICAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeSA9IFV0aWwuZ2VvanNvblRvQXJjR0lTKGdlb21ldHJ5KTtcbiAgICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5VHlwZSA9IFV0aWwuZ2VvanNvblR5cGVUb0FyY0dJUyhnZW9tZXRyeS50eXBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB3YXJuIHRoZSB1c2VyIGlmIHdlIGhhdm4ndCBmb3VuZCBhbiBhcHByb3ByaWF0ZSBvYmplY3RcbiAgICBVdGlsLndhcm4oJ2ludmFsaWQgZ2VvbWV0cnkgcGFzc2VkIHRvIHNwYXRpYWwgcXVlcnkuIFNob3VsZCBiZSBhbiBMLkxhdExuZywgTC5MYXRMbmdCb3VuZHMgb3IgTC5NYXJrZXIgb3IgYSBHZW9KU09OIFBvaW50IExpbmUgb3IgUG9seWdvbiBvYmplY3QnKTtcblxuICAgIHJldHVybjtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeSAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IFF1ZXJ5KG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBxdWVyeTtcbiIsImltcG9ydCB7IFRhc2sgfSBmcm9tICcuL1Rhc2snO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbCc7XG5cbmV4cG9ydCB2YXIgRmluZCA9IFRhc2suZXh0ZW5kKHtcbiAgc2V0dGVyczoge1xuICAgIC8vIG1ldGhvZCBuYW1lID4gcGFyYW0gbmFtZVxuICAgICdjb250YWlucyc6ICdjb250YWlucycsXG4gICAgJ3RleHQnOiAnc2VhcmNoVGV4dCcsXG4gICAgJ2ZpZWxkcyc6ICdzZWFyY2hGaWVsZHMnLCAvLyBkZW5vdGUgYW4gYXJyYXkgb3Igc2luZ2xlIHN0cmluZ1xuICAgICdzcGF0aWFsUmVmZXJlbmNlJzogJ3NyJyxcbiAgICAnc3InOiAnc3InLFxuICAgICdsYXllcnMnOiAnbGF5ZXJzJyxcbiAgICAncmV0dXJuR2VvbWV0cnknOiAncmV0dXJuR2VvbWV0cnknLFxuICAgICdtYXhBbGxvd2FibGVPZmZzZXQnOiAnbWF4QWxsb3dhYmxlT2Zmc2V0JyxcbiAgICAncHJlY2lzaW9uJzogJ2dlb21ldHJ5UHJlY2lzaW9uJyxcbiAgICAnZHluYW1pY0xheWVycyc6ICdkeW5hbWljTGF5ZXJzJyxcbiAgICAncmV0dXJuWic6ICdyZXR1cm5aJyxcbiAgICAncmV0dXJuTSc6ICdyZXR1cm5NJyxcbiAgICAnZ2RiVmVyc2lvbic6ICdnZGJWZXJzaW9uJyxcbiAgICAndG9rZW4nOiAndG9rZW4nXG4gIH0sXG5cbiAgcGF0aDogJ2ZpbmQnLFxuXG4gIHBhcmFtczoge1xuICAgIHNyOiA0MzI2LFxuICAgIGNvbnRhaW5zOiB0cnVlLFxuICAgIHJldHVybkdlb21ldHJ5OiB0cnVlLFxuICAgIHJldHVyblo6IHRydWUsXG4gICAgcmV0dXJuTTogZmFsc2VcbiAgfSxcblxuICBsYXllckRlZnM6IGZ1bmN0aW9uIChpZCwgd2hlcmUpIHtcbiAgICB0aGlzLnBhcmFtcy5sYXllckRlZnMgPSAodGhpcy5wYXJhbXMubGF5ZXJEZWZzKSA/IHRoaXMucGFyYW1zLmxheWVyRGVmcyArICc7JyA6ICcnO1xuICAgIHRoaXMucGFyYW1zLmxheWVyRGVmcyArPSAoW2lkLCB3aGVyZV0pLmpvaW4oJzonKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBzaW1wbGlmeTogZnVuY3Rpb24gKG1hcCwgZmFjdG9yKSB7XG4gICAgdmFyIG1hcFdpZHRoID0gTWF0aC5hYnMobWFwLmdldEJvdW5kcygpLmdldFdlc3QoKSAtIG1hcC5nZXRCb3VuZHMoKS5nZXRFYXN0KCkpO1xuICAgIHRoaXMucGFyYW1zLm1heEFsbG93YWJsZU9mZnNldCA9IChtYXBXaWR0aCAvIG1hcC5nZXRTaXplKCkueSkgKiBmYWN0b3I7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcnVuOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIChyZXNwb25zZSAmJiBVdGlsLnJlc3BvbnNlVG9GZWF0dXJlQ29sbGVjdGlvbihyZXNwb25zZSkpLCByZXNwb25zZSk7XG4gICAgfSwgY29udGV4dCk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZCAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEZpbmQob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZpbmQ7XG4iLCJpbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi9UYXNrJztcblxuZXhwb3J0IHZhciBJZGVudGlmeSA9IFRhc2suZXh0ZW5kKHtcbiAgcGF0aDogJ2lkZW50aWZ5JyxcblxuICBiZXR3ZWVuOiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgIHRoaXMucGFyYW1zLnRpbWUgPSBbc3RhcnQudmFsdWVPZigpLCBlbmQudmFsdWVPZigpXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGlmeSAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IElkZW50aWZ5KG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpZGVudGlmeTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgSWRlbnRpZnkgfSBmcm9tICcuL0lkZW50aWZ5JztcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWwnO1xuXG5leHBvcnQgdmFyIElkZW50aWZ5RmVhdHVyZXMgPSBJZGVudGlmeS5leHRlbmQoe1xuICBzZXR0ZXJzOiB7XG4gICAgJ2xheWVycyc6ICdsYXllcnMnLFxuICAgICdwcmVjaXNpb24nOiAnZ2VvbWV0cnlQcmVjaXNpb24nLFxuICAgICd0b2xlcmFuY2UnOiAndG9sZXJhbmNlJyxcbiAgICAncmV0dXJuR2VvbWV0cnknOiAncmV0dXJuR2VvbWV0cnknXG4gIH0sXG5cbiAgcGFyYW1zOiB7XG4gICAgc3I6IDQzMjYsXG4gICAgbGF5ZXJzOiAnYWxsJyxcbiAgICB0b2xlcmFuY2U6IDMsXG4gICAgcmV0dXJuR2VvbWV0cnk6IHRydWVcbiAgfSxcblxuICBvbjogZnVuY3Rpb24gKG1hcCkge1xuICAgIHZhciBleHRlbnQgPSBVdGlsLmJvdW5kc1RvRXh0ZW50KG1hcC5nZXRCb3VuZHMoKSk7XG4gICAgdmFyIHNpemUgPSBtYXAuZ2V0U2l6ZSgpO1xuICAgIHRoaXMucGFyYW1zLmltYWdlRGlzcGxheSA9IFtzaXplLngsIHNpemUueSwgOTZdO1xuICAgIHRoaXMucGFyYW1zLm1hcEV4dGVudCA9IFtleHRlbnQueG1pbiwgZXh0ZW50LnltaW4sIGV4dGVudC54bWF4LCBleHRlbnQueW1heF07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYXQ6IGZ1bmN0aW9uIChsYXRsbmcpIHtcbiAgICBsYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gW2xhdGxuZy5sbmcsIGxhdGxuZy5sYXRdO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2ludCc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgbGF5ZXJEZWY6IGZ1bmN0aW9uIChpZCwgd2hlcmUpIHtcbiAgICB0aGlzLnBhcmFtcy5sYXllckRlZnMgPSAodGhpcy5wYXJhbXMubGF5ZXJEZWZzKSA/IHRoaXMucGFyYW1zLmxheWVyRGVmcyArICc7JyA6ICcnO1xuICAgIHRoaXMucGFyYW1zLmxheWVyRGVmcyArPSAoW2lkLCB3aGVyZV0pLmpvaW4oJzonKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBzaW1wbGlmeTogZnVuY3Rpb24gKG1hcCwgZmFjdG9yKSB7XG4gICAgdmFyIG1hcFdpZHRoID0gTWF0aC5hYnMobWFwLmdldEJvdW5kcygpLmdldFdlc3QoKSAtIG1hcC5nZXRCb3VuZHMoKS5nZXRFYXN0KCkpO1xuICAgIHRoaXMucGFyYW1zLm1heEFsbG93YWJsZU9mZnNldCA9IChtYXBXaWR0aCAvIG1hcC5nZXRTaXplKCkueSkgKiAoMSAtIGZhY3Rvcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcnVuOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIC8vIGltbWVkaWF0ZWx5IGludm9rZSB3aXRoIGFuIGVycm9yXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgdW5kZWZpbmVkLCByZXNwb25zZSk7XG4gICAgICAgIHJldHVybjtcblxuICAgICAgLy8gb2sgbm8gZXJyb3IgbGV0cyBqdXN0IGFzc3VtZSB3ZSBoYXZlIGZlYXR1cmVzLi4uXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZmVhdHVyZUNvbGxlY3Rpb24gPSBVdGlsLnJlc3BvbnNlVG9GZWF0dXJlQ29sbGVjdGlvbihyZXNwb25zZSk7XG4gICAgICAgIHJlc3BvbnNlLnJlc3VsdHMgPSByZXNwb25zZS5yZXN1bHRzLnJldmVyc2UoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBmZWF0dXJlID0gZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXNbaV07XG4gICAgICAgICAgZmVhdHVyZS5sYXllcklkID0gcmVzcG9uc2UucmVzdWx0c1tpXS5sYXllcklkO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgdW5kZWZpbmVkLCBmZWF0dXJlQ29sbGVjdGlvbiwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aWZ5RmVhdHVyZXMgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBJZGVudGlmeUZlYXR1cmVzKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpZGVudGlmeUZlYXR1cmVzO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBJZGVudGlmeSB9IGZyb20gJy4vSWRlbnRpZnknO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbCc7XG5cbmV4cG9ydCB2YXIgSWRlbnRpZnlJbWFnZSA9IElkZW50aWZ5LmV4dGVuZCh7XG4gIHNldHRlcnM6IHtcbiAgICAnc2V0TW9zYWljUnVsZSc6ICdtb3NhaWNSdWxlJyxcbiAgICAnc2V0UmVuZGVyaW5nUnVsZSc6ICdyZW5kZXJpbmdSdWxlJyxcbiAgICAnc2V0UGl4ZWxTaXplJzogJ3BpeGVsU2l6ZScsXG4gICAgJ3JldHVybkNhdGFsb2dJdGVtcyc6ICdyZXR1cm5DYXRhbG9nSXRlbXMnLFxuICAgICdyZXR1cm5HZW9tZXRyeSc6ICdyZXR1cm5HZW9tZXRyeSdcbiAgfSxcblxuICBwYXJhbXM6IHtcbiAgICByZXR1cm5HZW9tZXRyeTogZmFsc2VcbiAgfSxcblxuICBhdDogZnVuY3Rpb24gKGxhdGxuZykge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICB4OiBsYXRsbmcubG5nLFxuICAgICAgeTogbGF0bG5nLmxhdCxcbiAgICAgIHNwYXRpYWxSZWZlcmVuY2U6IHtcbiAgICAgICAgd2tpZDogNDMyNlxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2ludCc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0TW9zYWljUnVsZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnBhcmFtcy5tb3NhaWNSdWxlO1xuICB9LFxuXG4gIGdldFJlbmRlcmluZ1J1bGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXMucmVuZGVyaW5nUnVsZTtcbiAgfSxcblxuICBnZXRQaXhlbFNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXMucGl4ZWxTaXplO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCAocmVzcG9uc2UgJiYgdGhpcy5fcmVzcG9uc2VUb0dlb0pTT04ocmVzcG9uc2UpKSwgcmVzcG9uc2UpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIC8vIGdldCBwaXhlbCBkYXRhIGFuZCByZXR1cm4gYXMgZ2VvSlNPTiBwb2ludFxuICAvLyBwb3B1bGF0ZSBjYXRhbG9nIGl0ZW1zIChpZiBhbnkpXG4gIC8vIG1lcmdpbmcgaW4gYW55IGNhdGFsb2dJdGVtVmlzaWJpbGl0aWVzIGFzIGEgcHJvcGVyeSBvZiBlYWNoIGZlYXR1cmVcbiAgX3Jlc3BvbnNlVG9HZW9KU09OOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB2YXIgbG9jYXRpb24gPSByZXNwb25zZS5sb2NhdGlvbjtcbiAgICB2YXIgY2F0YWxvZ0l0ZW1zID0gcmVzcG9uc2UuY2F0YWxvZ0l0ZW1zO1xuICAgIHZhciBjYXRhbG9nSXRlbVZpc2liaWxpdGllcyA9IHJlc3BvbnNlLmNhdGFsb2dJdGVtVmlzaWJpbGl0aWVzO1xuICAgIHZhciBnZW9KU09OID0ge1xuICAgICAgJ3BpeGVsJzoge1xuICAgICAgICAndHlwZSc6ICdGZWF0dXJlJyxcbiAgICAgICAgJ2dlb21ldHJ5Jzoge1xuICAgICAgICAgICd0eXBlJzogJ1BvaW50JyxcbiAgICAgICAgICAnY29vcmRpbmF0ZXMnOiBbbG9jYXRpb24ueCwgbG9jYXRpb24ueV1cbiAgICAgICAgfSxcbiAgICAgICAgJ2Nycyc6IHtcbiAgICAgICAgICAndHlwZSc6ICdFUFNHJyxcbiAgICAgICAgICAncHJvcGVydGllcyc6IHtcbiAgICAgICAgICAgICdjb2RlJzogbG9jYXRpb24uc3BhdGlhbFJlZmVyZW5jZS53a2lkXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAncHJvcGVydGllcyc6IHtcbiAgICAgICAgICAnT0JKRUNUSUQnOiByZXNwb25zZS5vYmplY3RJZCxcbiAgICAgICAgICAnbmFtZSc6IHJlc3BvbnNlLm5hbWUsXG4gICAgICAgICAgJ3ZhbHVlJzogcmVzcG9uc2UudmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgJ2lkJzogcmVzcG9uc2Uub2JqZWN0SWRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHJlc3BvbnNlLnByb3BlcnRpZXMgJiYgcmVzcG9uc2UucHJvcGVydGllcy5WYWx1ZXMpIHtcbiAgICAgIGdlb0pTT04ucGl4ZWwucHJvcGVydGllcy52YWx1ZXMgPSByZXNwb25zZS5wcm9wZXJ0aWVzLlZhbHVlcztcbiAgICB9XG5cbiAgICBpZiAoY2F0YWxvZ0l0ZW1zICYmIGNhdGFsb2dJdGVtcy5mZWF0dXJlcykge1xuICAgICAgZ2VvSlNPTi5jYXRhbG9nSXRlbXMgPSBVdGlsLnJlc3BvbnNlVG9GZWF0dXJlQ29sbGVjdGlvbihjYXRhbG9nSXRlbXMpO1xuICAgICAgaWYgKGNhdGFsb2dJdGVtVmlzaWJpbGl0aWVzICYmIGNhdGFsb2dJdGVtVmlzaWJpbGl0aWVzLmxlbmd0aCA9PT0gZ2VvSlNPTi5jYXRhbG9nSXRlbXMuZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBjYXRhbG9nSXRlbVZpc2liaWxpdGllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGdlb0pTT04uY2F0YWxvZ0l0ZW1zLmZlYXR1cmVzW2ldLnByb3BlcnRpZXMuY2F0YWxvZ0l0ZW1WaXNpYmlsaXR5ID0gY2F0YWxvZ0l0ZW1WaXNpYmlsaXRpZXNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdlb0pTT047XG4gIH1cblxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGlmeUltYWdlIChwYXJhbXMpIHtcbiAgcmV0dXJuIG5ldyBJZGVudGlmeUltYWdlKHBhcmFtcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlkZW50aWZ5SW1hZ2U7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7Y29yc30gZnJvbSAnLi4vU3VwcG9ydCc7XG5pbXBvcnQge2NsZWFuVXJsfSBmcm9tICcuLi9VdGlsJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL1JlcXVlc3QnO1xuXG5leHBvcnQgdmFyIFNlcnZpY2UgPSBMLkV2ZW50ZWQuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgcHJveHk6IGZhbHNlLFxuICAgIHVzZUNvcnM6IGNvcnMsXG4gICAgdGltZW91dDogMFxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5fcmVxdWVzdFF1ZXVlID0gW107XG4gICAgdGhpcy5fYXV0aGVudGljYXRpbmcgPSBmYWxzZTtcbiAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLm9wdGlvbnMudXJsID0gY2xlYW5VcmwodGhpcy5vcHRpb25zLnVybCk7XG4gIH0sXG5cbiAgZ2V0OiBmdW5jdGlvbiAocGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdnZXQnLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfSxcblxuICBwb3N0OiBmdW5jdGlvbiAocGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdwb3N0JywgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH0sXG5cbiAgcmVxdWVzdDogZnVuY3Rpb24gKHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgncmVxdWVzdCcsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9LFxuXG4gIG1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnZ2V0JywgJycsIHt9LCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH0sXG5cbiAgYXV0aGVudGljYXRlOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0aGlzLl9hdXRoZW50aWNhdGluZyA9IGZhbHNlO1xuICAgIHRoaXMub3B0aW9ucy50b2tlbiA9IHRva2VuO1xuICAgIHRoaXMuX3J1blF1ZXVlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0VGltZW91dDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudGltZW91dDtcbiAgfSxcblxuICBzZXRUaW1lb3V0OiBmdW5jdGlvbiAodGltZW91dCkge1xuICAgIHRoaXMub3B0aW9ucy50aW1lb3V0ID0gdGltZW91dDtcbiAgfSxcblxuICBfcmVxdWVzdDogZnVuY3Rpb24gKG1ldGhvZCwgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuZmlyZSgncmVxdWVzdHN0YXJ0Jywge1xuICAgICAgdXJsOiB0aGlzLm9wdGlvbnMudXJsICsgcGF0aCxcbiAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgbWV0aG9kOiBtZXRob2RcbiAgICB9LCB0cnVlKTtcblxuICAgIHZhciB3cmFwcGVkQ2FsbGJhY2sgPSB0aGlzLl9jcmVhdGVTZXJ2aWNlQ2FsbGJhY2sobWV0aG9kLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIHBhcmFtcy50b2tlbiA9IHRoaXMub3B0aW9ucy50b2tlbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYXV0aGVudGljYXRpbmcpIHtcbiAgICAgIHRoaXMuX3JlcXVlc3RRdWV1ZS5wdXNoKFttZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHRdKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVybCA9ICh0aGlzLm9wdGlvbnMucHJveHkpID8gdGhpcy5vcHRpb25zLnByb3h5ICsgJz8nICsgdGhpcy5vcHRpb25zLnVybCArIHBhdGggOiB0aGlzLm9wdGlvbnMudXJsICsgcGF0aDtcblxuICAgICAgaWYgKChtZXRob2QgPT09ICdnZXQnIHx8IG1ldGhvZCA9PT0gJ3JlcXVlc3QnKSAmJiAhdGhpcy5vcHRpb25zLnVzZUNvcnMpIHtcbiAgICAgICAgcmV0dXJuIFJlcXVlc3QuZ2V0LkpTT05QKHVybCwgcGFyYW1zLCB3cmFwcGVkQ2FsbGJhY2ssIGNvbnRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFJlcXVlc3RbbWV0aG9kXSh1cmwsIHBhcmFtcywgd3JhcHBlZENhbGxiYWNrLCBjb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX2NyZWF0ZVNlcnZpY2VDYWxsYmFjazogZnVuY3Rpb24gKG1ldGhvZCwgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiBMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoZXJyb3IgJiYgKGVycm9yLmNvZGUgPT09IDQ5OSB8fCBlcnJvci5jb2RlID09PSA0OTgpKSB7XG4gICAgICAgIHRoaXMuX2F1dGhlbnRpY2F0aW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9yZXF1ZXN0UXVldWUucHVzaChbbWV0aG9kLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0XSk7XG5cbiAgICAgICAgLy8gZmlyZSBhbiBldmVudCBmb3IgdXNlcnMgdG8gaGFuZGxlIGFuZCByZS1hdXRoZW50aWNhdGVcbiAgICAgICAgdGhpcy5maXJlKCdhdXRoZW50aWNhdGlvbnJlcXVpcmVkJywge1xuICAgICAgICAgIGF1dGhlbnRpY2F0ZTogTC5VdGlsLmJpbmQodGhpcy5hdXRoZW50aWNhdGUsIHRoaXMpXG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIC8vIGlmIHRoZSB1c2VyIGhhcyBhY2Nlc3MgdG8gYSBjYWxsYmFjayB0aGV5IGNhbiBoYW5kbGUgdGhlIGF1dGggZXJyb3JcbiAgICAgICAgZXJyb3IuYXV0aGVudGljYXRlID0gTC5VdGlsLmJpbmQodGhpcy5hdXRoZW50aWNhdGUsIHRoaXMpO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSk7XG5cbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICB0aGlzLmZpcmUoJ3JlcXVlc3RlcnJvcicsIHtcbiAgICAgICAgICB1cmw6IHRoaXMub3B0aW9ucy51cmwgKyBwYXRoLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgY29kZTogZXJyb3IuY29kZSxcbiAgICAgICAgICBtZXRob2Q6IG1ldGhvZFxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmlyZSgncmVxdWVzdHN1Y2Nlc3MnLCB7XG4gICAgICAgICAgdXJsOiB0aGlzLm9wdGlvbnMudXJsICsgcGF0aCxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2UsXG4gICAgICAgICAgbWV0aG9kOiBtZXRob2RcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlyZSgncmVxdWVzdGVuZCcsIHtcbiAgICAgICAgdXJsOiB0aGlzLm9wdGlvbnMudXJsICsgcGF0aCxcbiAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgICB9LCB0cnVlKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBfcnVuUXVldWU6IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5fcmVxdWVzdFF1ZXVlLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IHRoaXMuX3JlcXVlc3RRdWV1ZVtpXTtcbiAgICAgIHZhciBtZXRob2QgPSByZXF1ZXN0LnNoaWZ0KCk7XG4gICAgICB0aGlzW21ldGhvZF0uYXBwbHkodGhpcywgcmVxdWVzdCk7XG4gICAgfVxuICAgIHRoaXMuX3JlcXVlc3RRdWV1ZSA9IFtdO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNlcnZpY2UgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzZXJ2aWNlO1xuIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4vU2VydmljZSc7XG5pbXBvcnQgaWRlbnRpZnlGZWF0dXJlcyBmcm9tICcuLi9UYXNrcy9JZGVudGlmeUZlYXR1cmVzJztcbmltcG9ydCBxdWVyeSBmcm9tICcuLi9UYXNrcy9RdWVyeSc7XG5pbXBvcnQgZmluZCBmcm9tICcuLi9UYXNrcy9GaW5kJztcblxuZXhwb3J0IHZhciBNYXBTZXJ2aWNlID0gU2VydmljZS5leHRlbmQoe1xuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGlkZW50aWZ5RmVhdHVyZXModGhpcyk7XG4gIH0sXG5cbiAgZmluZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmaW5kKHRoaXMpO1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHF1ZXJ5KHRoaXMpO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwU2VydmljZSAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IE1hcFNlcnZpY2Uob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcFNlcnZpY2U7XG4iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi9TZXJ2aWNlJztcbmltcG9ydCBpZGVudGlmeUltYWdlIGZyb20gJy4uL1Rhc2tzL0lkZW50aWZ5SW1hZ2UnO1xuaW1wb3J0IHF1ZXJ5IGZyb20gJy4uL1Rhc2tzL1F1ZXJ5JztcblxuZXhwb3J0IHZhciBJbWFnZVNlcnZpY2UgPSBTZXJ2aWNlLmV4dGVuZCh7XG5cbiAgcXVlcnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcXVlcnkodGhpcyk7XG4gIH0sXG5cbiAgaWRlbnRpZnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gaWRlbnRpZnlJbWFnZSh0aGlzKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbWFnZVNlcnZpY2UgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBJbWFnZVNlcnZpY2Uob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGltYWdlU2VydmljZTtcbiIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuL1NlcnZpY2UnO1xuaW1wb3J0IHF1ZXJ5IGZyb20gJy4uL1Rhc2tzL1F1ZXJ5JztcbmltcG9ydCB7IGdlb2pzb25Ub0FyY0dJUyB9IGZyb20gJy4uL1V0aWwnO1xuXG5leHBvcnQgdmFyIEZlYXR1cmVMYXllclNlcnZpY2UgPSBTZXJ2aWNlLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIGlkQXR0cmlidXRlOiAnT0JKRUNUSUQnXG4gIH0sXG5cbiAgcXVlcnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcXVlcnkodGhpcyk7XG4gIH0sXG5cbiAgYWRkRmVhdHVyZTogZnVuY3Rpb24gKGZlYXR1cmUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgZGVsZXRlIGZlYXR1cmUuaWQ7XG5cbiAgICBmZWF0dXJlID0gZ2VvanNvblRvQXJjR0lTKGZlYXR1cmUpO1xuXG4gICAgcmV0dXJuIHRoaXMucG9zdCgnYWRkRmVhdHVyZXMnLCB7XG4gICAgICBmZWF0dXJlczogW2ZlYXR1cmVdXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgdmFyIHJlc3VsdCA9IChyZXNwb25zZSAmJiByZXNwb25zZS5hZGRSZXN1bHRzKSA/IHJlc3BvbnNlLmFkZFJlc3VsdHNbMF0gOiB1bmRlZmluZWQ7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciB8fCByZXNwb25zZS5hZGRSZXN1bHRzWzBdLmVycm9yLCByZXN1bHQpO1xuICAgICAgfVxuICAgIH0sIGNvbnRleHQpO1xuICB9LFxuXG4gIHVwZGF0ZUZlYXR1cmU6IGZ1bmN0aW9uIChmZWF0dXJlLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGZlYXR1cmUgPSBnZW9qc29uVG9BcmNHSVMoZmVhdHVyZSwgdGhpcy5vcHRpb25zLmlkQXR0cmlidXRlKTtcblxuICAgIHJldHVybiB0aGlzLnBvc3QoJ3VwZGF0ZUZlYXR1cmVzJywge1xuICAgICAgZmVhdHVyZXM6IFtmZWF0dXJlXVxuICAgIH0sIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UudXBkYXRlUmVzdWx0cykgPyByZXNwb25zZS51cGRhdGVSZXN1bHRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UudXBkYXRlUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICBkZWxldGVGZWF0dXJlOiBmdW5jdGlvbiAoaWQsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucG9zdCgnZGVsZXRlRmVhdHVyZXMnLCB7XG4gICAgICBvYmplY3RJZHM6IGlkXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgdmFyIHJlc3VsdCA9IChyZXNwb25zZSAmJiByZXNwb25zZS5kZWxldGVSZXN1bHRzKSA/IHJlc3BvbnNlLmRlbGV0ZVJlc3VsdHNbMF0gOiB1bmRlZmluZWQ7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciB8fCByZXNwb25zZS5kZWxldGVSZXN1bHRzWzBdLmVycm9yLCByZXN1bHQpO1xuICAgICAgfVxuICAgIH0sIGNvbnRleHQpO1xuICB9LFxuXG4gIGRlbGV0ZUZlYXR1cmVzOiBmdW5jdGlvbiAoaWRzLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnBvc3QoJ2RlbGV0ZUZlYXR1cmVzJywge1xuICAgICAgb2JqZWN0SWRzOiBpZHNcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAvLyBwYXNzIGJhY2sgdGhlIGVudGlyZSBhcnJheVxuICAgICAgdmFyIHJlc3VsdCA9IChyZXNwb25zZSAmJiByZXNwb25zZS5kZWxldGVSZXN1bHRzKSA/IHJlc3BvbnNlLmRlbGV0ZVJlc3VsdHMgOiB1bmRlZmluZWQ7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciB8fCByZXNwb25zZS5kZWxldGVSZXN1bHRzWzBdLmVycm9yLCByZXN1bHQpO1xuICAgICAgfVxuICAgIH0sIGNvbnRleHQpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVMYXllclNlcnZpY2UgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBGZWF0dXJlTGF5ZXJTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmZWF0dXJlTGF5ZXJTZXJ2aWNlO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBwb2ludGVyRXZlbnRzIH0gZnJvbSAnLi4vU3VwcG9ydCc7XG5pbXBvcnQge1xuICBzZXRFc3JpQXR0cmlidXRpb24sXG4gIF9nZXRBdHRyaWJ1dGlvbkRhdGEsXG4gIF91cGRhdGVNYXBBdHRyaWJ1dGlvblxufSBmcm9tICcuLi9VdGlsJztcblxudmFyIHRpbGVQcm90b2NvbCA9ICh3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgIT09ICdodHRwczonKSA/ICdodHRwOicgOiAnaHR0cHM6JztcblxuZXhwb3J0IHZhciBCYXNlbWFwTGF5ZXIgPSBMLlRpbGVMYXllci5leHRlbmQoe1xuICBzdGF0aWNzOiB7XG4gICAgVElMRVM6IHtcbiAgICAgIFN0cmVldHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX1N0cmVldF9NYXAvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnVVNHUywgTk9BQScsXG4gICAgICAgICAgYXR0cmlidXRpb25Vcmw6ICdodHRwczovL3N0YXRpYy5hcmNnaXMuY29tL2F0dHJpYnV0aW9uL1dvcmxkX1N0cmVldF9NYXAnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBUb3BvZ3JhcGhpYzoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfVG9wb19NYXAvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnVVNHUywgTk9BQScsXG4gICAgICAgICAgYXR0cmlidXRpb25Vcmw6ICdodHRwczovL3N0YXRpYy5hcmNnaXMuY29tL2F0dHJpYnV0aW9uL1dvcmxkX1RvcG9fTWFwJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgT2NlYW5zOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9hcmNnaXMvcmVzdC9zZXJ2aWNlcy9PY2Vhbi9Xb3JsZF9PY2Vhbl9CYXNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MsIE5PQUEnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uVXJsOiAnaHR0cHM6Ly9zdGF0aWMuYXJjZ2lzLmNvbS9hdHRyaWJ1dGlvbi9PY2Vhbl9CYXNlbWFwJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgT2NlYW5zTGFiZWxzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9hcmNnaXMvcmVzdC9zZXJ2aWNlcy9PY2Vhbi9Xb3JsZF9PY2Vhbl9SZWZlcmVuY2UvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBOYXRpb25hbEdlb2dyYXBoaWM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL05hdEdlb19Xb3JsZF9NYXAvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnTmF0aW9uYWwgR2VvZ3JhcGhpYywgRGVMb3JtZSwgSEVSRSwgVU5FUC1XQ01DLCBVU0dTLCBOQVNBLCBFU0EsIE1FVEksIE5SQ0FOLCBHRUJDTywgTk9BQSwgaW5jcmVtZW50IFAgQ29ycC4nXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBEYXJrR3JheToge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvQ2FudmFzL1dvcmxkX0RhcmtfR3JheV9CYXNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0hFUkUsIERlTG9ybWUsIE1hcG15SW5kaWEsICZjb3B5OyBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9ycydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIERhcmtHcmF5TGFiZWxzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9DYW52YXMvV29ybGRfRGFya19HcmF5X1JlZmVyZW5jZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgcGFuZTogKHBvaW50ZXJFdmVudHMpID8gJ2VzcmktbGFiZWxzJyA6ICd0aWxlUGFuZScsXG4gICAgICAgICAgYXR0cmlidXRpb246ICcnXG5cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIEdyYXk6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0NhbnZhcy9Xb3JsZF9MaWdodF9HcmF5X0Jhc2UvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnSEVSRSwgRGVMb3JtZSwgTWFwbXlJbmRpYSwgJmNvcHk7IE9wZW5TdHJlZXRNYXAgY29udHJpYnV0b3JzJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgR3JheUxhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvQ2FudmFzL1dvcmxkX0xpZ2h0X0dyYXlfUmVmZXJlbmNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIEltYWdlcnk6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX0ltYWdlcnkvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnRGlnaXRhbEdsb2JlLCBHZW9FeWUsIGktY3ViZWQsIFVTREEsIFVTR1MsIEFFWCwgR2V0bWFwcGluZywgQWVyb2dyaWQsIElHTiwgSUdQLCBzd2lzc3RvcG8sIGFuZCB0aGUgR0lTIFVzZXIgQ29tbXVuaXR5J1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgSW1hZ2VyeUxhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvUmVmZXJlbmNlL1dvcmxkX0JvdW5kYXJpZXNfYW5kX1BsYWNlcy9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE5LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgcGFuZTogKHBvaW50ZXJFdmVudHMpID8gJ2VzcmktbGFiZWxzJyA6ICd0aWxlUGFuZScsXG4gICAgICAgICAgYXR0cmlidXRpb246ICcnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBJbWFnZXJ5VHJhbnNwb3J0YXRpb246IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1JlZmVyZW5jZS9Xb3JsZF9UcmFuc3BvcnRhdGlvbi9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE5LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgcGFuZTogKHBvaW50ZXJFdmVudHMpID8gJ2VzcmktbGFiZWxzJyA6ICd0aWxlUGFuZSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFNoYWRlZFJlbGllZjoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfU2hhZGVkX1JlbGllZi9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDEzLFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdVU0dTJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgU2hhZGVkUmVsaWVmTGFiZWxzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9SZWZlcmVuY2UvV29ybGRfQm91bmRhcmllc19hbmRfUGxhY2VzX0FsdGVybmF0ZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDEyLFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgcGFuZTogKHBvaW50ZXJFdmVudHMpID8gJ2VzcmktbGFiZWxzJyA6ICd0aWxlUGFuZScsXG4gICAgICAgICAgYXR0cmlidXRpb246ICcnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBUZXJyYWluOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Xb3JsZF9UZXJyYWluX0Jhc2UvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxMyxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnVVNHUywgTk9BQSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFRlcnJhaW5MYWJlbHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1JlZmVyZW5jZS9Xb3JsZF9SZWZlcmVuY2VfT3ZlcmxheS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDEzLFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgcGFuZTogKHBvaW50ZXJFdmVudHMpID8gJ2VzcmktbGFiZWxzJyA6ICd0aWxlUGFuZScsXG4gICAgICAgICAgYXR0cmlidXRpb246ICcnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBVU0FUb3BvOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9VU0FfVG9wb19NYXBzL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTUsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MsIE5hdGlvbmFsIEdlb2dyYXBoaWMgU29jaWV0eSwgaS1jdWJlZCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbmZpZztcblxuICAgIC8vIHNldCB0aGUgY29uZmlnIHZhcmlhYmxlIHdpdGggdGhlIGFwcHJvcHJpYXRlIGNvbmZpZyBvYmplY3RcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgJiYga2V5LnVybFRlbXBsYXRlICYmIGtleS5vcHRpb25zKSB7XG4gICAgICBjb25maWcgPSBrZXk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBCYXNlbWFwTGF5ZXIuVElMRVNba2V5XSkge1xuICAgICAgY29uZmlnID0gQmFzZW1hcExheWVyLlRJTEVTW2tleV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTC5lc3JpLkJhc2VtYXBMYXllcjogSW52YWxpZCBwYXJhbWV0ZXIuIFVzZSBvbmUgb2YgXCJTdHJlZXRzXCIsIFwiVG9wb2dyYXBoaWNcIiwgXCJPY2VhbnNcIiwgXCJPY2VhbnNMYWJlbHNcIiwgXCJOYXRpb25hbEdlb2dyYXBoaWNcIiwgXCJHcmF5XCIsIFwiR3JheUxhYmVsc1wiLCBcIkRhcmtHcmF5XCIsIFwiRGFya0dyYXlMYWJlbHNcIiwgXCJJbWFnZXJ5XCIsIFwiSW1hZ2VyeUxhYmVsc1wiLCBcIkltYWdlcnlUcmFuc3BvcnRhdGlvblwiLCBcIlNoYWRlZFJlbGllZlwiLCBcIlNoYWRlZFJlbGllZkxhYmVsc1wiLCBcIlRlcnJhaW5cIiwgXCJUZXJyYWluTGFiZWxzXCIgb3IgXCJVU0FUb3BvXCInKTtcbiAgICB9XG5cbiAgICAvLyBtZXJnZSBwYXNzZWQgb3B0aW9ucyBpbnRvIHRoZSBjb25maWcgb3B0aW9uc1xuICAgIHZhciB0aWxlT3B0aW9ucyA9IEwuVXRpbC5leHRlbmQoY29uZmlnLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgdGlsZU9wdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50b2tlbikge1xuICAgICAgY29uZmlnLnVybFRlbXBsYXRlICs9ICgnP3Rva2VuPScgKyB0aGlzLm9wdGlvbnMudG9rZW4pO1xuICAgIH1cblxuICAgIC8vIGNhbGwgdGhlIGluaXRpYWxpemUgbWV0aG9kIG9uIEwuVGlsZUxheWVyIHRvIHNldCBldmVyeXRoaW5nIHVwXG4gICAgTC5UaWxlTGF5ZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBjb25maWcudXJsVGVtcGxhdGUsIHRpbGVPcHRpb25zKTtcbiAgfSxcblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIC8vIGluY2x1ZGUgJ1Bvd2VyZWQgYnkgRXNyaScgaW4gbWFwIGF0dHJpYnV0aW9uXG4gICAgc2V0RXNyaUF0dHJpYnV0aW9uKG1hcCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnBhbmUgPT09ICdlc3JpLWxhYmVscycpIHtcbiAgICAgIHRoaXMuX2luaXRQYW5lKCk7XG4gICAgfVxuICAgIC8vIHNvbWUgYmFzZW1hcHMgY2FuIHN1cHBseSBkeW5hbWljIGF0dHJpYnV0aW9uXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvblVybCkge1xuICAgICAgX2dldEF0dHJpYnV0aW9uRGF0YSh0aGlzLm9wdGlvbnMuYXR0cmlidXRpb25VcmwsIG1hcCk7XG4gICAgfVxuXG4gICAgbWFwLm9uKCdtb3ZlZW5kJywgX3VwZGF0ZU1hcEF0dHJpYnV0aW9uKTtcblxuICAgIEwuVGlsZUxheWVyLnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBtYXAub2ZmKCdtb3ZlZW5kJywgX3VwZGF0ZU1hcEF0dHJpYnV0aW9uKTtcbiAgICBMLlRpbGVMYXllci5wcm90b3R5cGUub25SZW1vdmUuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIF9pbml0UGFuZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fbWFwLmdldFBhbmUodGhpcy5vcHRpb25zLnBhbmUpKSB7XG4gICAgICB2YXIgcGFuZSA9IHRoaXMuX21hcC5jcmVhdGVQYW5lKHRoaXMub3B0aW9ucy5wYW5lKTtcbiAgICAgIHBhbmUuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgIHBhbmUuc3R5bGUuekluZGV4ID0gNTAwO1xuICAgIH1cbiAgfSxcblxuICBnZXRBdHRyaWJ1dGlvbjogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24pIHtcbiAgICAgIHZhciBhdHRyaWJ1dGlvbiA9ICc8c3BhbiBjbGFzcz1cImVzcmktZHluYW1pYy1hdHRyaWJ1dGlvblwiPicgKyB0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gKyAnPC9zcGFuPic7XG4gICAgfVxuICAgIHJldHVybiBhdHRyaWJ1dGlvbjtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBiYXNlbWFwTGF5ZXIgKGtleSwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IEJhc2VtYXBMYXllcihrZXksIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlbWFwTGF5ZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IHdhcm4sIGNsZWFuVXJsLCBzZXRFc3JpQXR0cmlidXRpb24gfSBmcm9tICcuLi9VdGlsJztcbmltcG9ydCBtYXBTZXJ2aWNlIGZyb20gJy4uL1NlcnZpY2VzL01hcFNlcnZpY2UnO1xuXG5leHBvcnQgdmFyIFRpbGVkTWFwTGF5ZXIgPSBMLlRpbGVMYXllci5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgem9vbU9mZnNldEFsbG93YW5jZTogMC4xLFxuICAgIGVycm9yVGlsZVVybDogJ2h0dHA6Ly9kb3dubG9hZHMyLmVzcmkuY29tL3N1cHBvcnQvVGVjaEFydGljbGVzL2JsYW5rMjU2LnBuZydcbiAgfSxcblxuICBzdGF0aWNzOiB7XG4gICAgTWVyY2F0b3Jab29tTGV2ZWxzOiB7XG4gICAgICAnMCc6IDE1NjU0My4wMzM5Mjc5OTk5OSxcbiAgICAgICcxJzogNzgyNzEuNTE2OTYzOTk5ODkzLFxuICAgICAgJzInOiAzOTEzNS43NTg0ODIwMDAwOTksXG4gICAgICAnMyc6IDE5NTY3Ljg3OTI0MDk5OTkwMSxcbiAgICAgICc0JzogOTc4My45Mzk2MjA0OTk5NTkzLFxuICAgICAgJzUnOiA0ODkxLjk2OTgxMDI0OTk3OTcsXG4gICAgICAnNic6IDI0NDUuOTg0OTA1MTI0OTg5OCxcbiAgICAgICc3JzogMTIyMi45OTI0NTI1NjI0ODk5LFxuICAgICAgJzgnOiA2MTEuNDk2MjI2MjgxMzgwMDIsXG4gICAgICAnOSc6IDMwNS43NDgxMTMxNDA1NTgwMixcbiAgICAgICcxMCc6IDE1Mi44NzQwNTY1NzA0MTEsXG4gICAgICAnMTEnOiA3Ni40MzcwMjgyODUwNzMxOTcsXG4gICAgICAnMTInOiAzOC4yMTg1MTQxNDI1MzY1OTgsXG4gICAgICAnMTMnOiAxOS4xMDkyNTcwNzEyNjgyOTksXG4gICAgICAnMTQnOiA5LjU1NDYyODUzNTYzNDE0OTYsXG4gICAgICAnMTUnOiA0Ljc3NzMxNDI2Nzk0OTM2OTksXG4gICAgICAnMTYnOiAyLjM4ODY1NzEzMzk3NDY4LFxuICAgICAgJzE3JzogMS4xOTQzMjg1NjY4NTUwNTAxLFxuICAgICAgJzE4JzogMC41OTcxNjQyODM1NTk4MTY5OSxcbiAgICAgICcxOSc6IDAuMjk4NTgyMTQxNjQ3NjE2OTgsXG4gICAgICAnMjAnOiAwLjE0OTI5MTA3MDgyMzgxLFxuICAgICAgJzIxJzogMC4wNzQ2NDU1MzU0MTE5MSxcbiAgICAgICcyMic6IDAuMDM3MzIyNzY3NzA1OTUyNSxcbiAgICAgICcyMyc6IDAuMDE4NjYxMzgzODUyOTc2M1xuICAgIH1cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMudXJsID0gY2xlYW5Vcmwob3B0aW9ucy51cmwpO1xuICAgIG9wdGlvbnMgPSBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblxuICAgIC8vIHNldCB0aGUgdXJsc1xuICAgIHRoaXMudGlsZVVybCA9IG9wdGlvbnMudXJsICsgJ3RpbGUve3p9L3t5fS97eH0nO1xuICAgIHRoaXMuc2VydmljZSA9IG1hcFNlcnZpY2Uob3B0aW9ucyk7XG4gICAgdGhpcy5zZXJ2aWNlLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuXG4gICAgdmFyIGFyY2dpc29ubGluZSA9IG5ldyBSZWdFeHAoL3RpbGVzLmFyY2dpcyhvbmxpbmUpP1xcLmNvbS9nKTtcbiAgICBpZiAoYXJjZ2lzb25saW5lLnRlc3Qob3B0aW9ucy51cmwpKSB7XG4gICAgICB0aGlzLnRpbGVVcmwgPSB0aGlzLnRpbGVVcmwucmVwbGFjZSgnOi8vdGlsZXMnLCAnOi8vdGlsZXN7c30nKTtcbiAgICAgIG9wdGlvbnMuc3ViZG9tYWlucyA9IFsnMScsICcyJywgJzMnLCAnNCddO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIHRoaXMudGlsZVVybCArPSAoJz90b2tlbj0nICsgdGhpcy5vcHRpb25zLnRva2VuKTtcbiAgICB9XG5cbiAgICAvLyBpbml0IGxheWVyIGJ5IGNhbGxpbmcgVGlsZUxheWVycyBpbml0aWFsaXplIG1ldGhvZFxuICAgIEwuVGlsZUxheWVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgdGhpcy50aWxlVXJsLCBvcHRpb25zKTtcbiAgfSxcblxuICBnZXRUaWxlVXJsOiBmdW5jdGlvbiAodGlsZVBvaW50KSB7XG4gICAgcmV0dXJuIEwuVXRpbC50ZW1wbGF0ZSh0aGlzLnRpbGVVcmwsIEwuZXh0ZW5kKHtcbiAgICAgIHM6IHRoaXMuX2dldFN1YmRvbWFpbih0aWxlUG9pbnQpLFxuICAgICAgejogKHRoaXMuX2xvZE1hcCAmJiB0aGlzLl9sb2RNYXBbdGlsZVBvaW50LnpdKSA/IHRoaXMuX2xvZE1hcFt0aWxlUG9pbnQuel0gOiB0aWxlUG9pbnQueiwgLy8gdHJ5IGxvZCBtYXAgZmlyc3QsIHRoZW4ganVzdCBkZWZ1YWx0IHRvIHpvb20gbGV2ZWxcbiAgICAgIHg6IHRpbGVQb2ludC54LFxuICAgICAgeTogdGlsZVBvaW50LnlcbiAgICB9LCB0aGlzLm9wdGlvbnMpKTtcbiAgfSxcblxuICBjcmVhdGVUaWxlOiBmdW5jdGlvbiAoY29vcmRzLCBkb25lKSB7XG4gICAgdmFyIHRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgIEwuRG9tRXZlbnQub24odGlsZSwgJ2xvYWQnLCBMLmJpbmQodGhpcy5fdGlsZU9uTG9hZCwgdGhpcywgZG9uZSwgdGlsZSkpO1xuICAgIEwuRG9tRXZlbnQub24odGlsZSwgJ2Vycm9yJywgTC5iaW5kKHRoaXMuX3RpbGVPbkVycm9yLCB0aGlzLCBkb25lLCB0aWxlKSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNyb3NzT3JpZ2luKSB7XG4gICAgICB0aWxlLmNyb3NzT3JpZ2luID0gJyc7XG4gICAgfVxuXG4gICAgLypcbiAgICAgQWx0IHRhZyBpcyBzZXQgdG8gZW1wdHkgc3RyaW5nIHRvIGtlZXAgc2NyZWVuIHJlYWRlcnMgZnJvbSByZWFkaW5nIFVSTCBhbmQgZm9yIGNvbXBsaWFuY2UgcmVhc29uc1xuICAgICBodHRwOi8vd3d3LnczLm9yZy9UUi9XQ0FHMjAtVEVDSFMvSDY3XG4gICAgKi9cbiAgICB0aWxlLmFsdCA9ICcnO1xuXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gbG9kIG1hcCBvciBhbiBsb2QgbWFwIHdpdGggYSBwcm9wZXIgem9vbSBsb2FkIHRoZSB0aWxlXG4gICAgLy8gb3RoZXJ3aXNlIHdhaXQgZm9yIHRoZSBsb2QgbWFwIHRvIGJlY29tZSBhdmFpbGFibGVcbiAgICBpZiAoIXRoaXMuX2xvZE1hcCB8fCAodGhpcy5fbG9kTWFwICYmIHRoaXMuX2xvZE1hcFtjb29yZHMuel0pKSB7XG4gICAgICB0aWxlLnNyYyA9IHRoaXMuZ2V0VGlsZVVybChjb29yZHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uY2UoJ2xvZG1hcCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGlsZS5zcmMgPSB0aGlzLmdldFRpbGVVcmwoY29vcmRzKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aWxlO1xuICB9LFxuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgLy8gaW5jbHVkZSAnUG93ZXJlZCBieSBFc3JpJyBpbiBtYXAgYXR0cmlidXRpb25cbiAgICBzZXRFc3JpQXR0cmlidXRpb24obWFwKTtcblxuICAgIGlmIChtYXAub3B0aW9ucy5jcnMgPT09IEwuQ1JTLkVQU0czODU3ICYmICF0aGlzLl9sb2RNYXApIHtcbiAgICAgIHRoaXMuX2xvZE1hcCA9IHt9O1xuICAgICAgdGhpcy5tZXRhZGF0YShmdW5jdGlvbiAoZXJyb3IsIG1ldGFkYXRhKSB7XG4gICAgICAgIGlmICghZXJyb3IgJiYgbWV0YWRhdGEuc3BhdGlhbFJlZmVyZW5jZSkge1xuICAgICAgICAgIHZhciBzciA9IG1ldGFkYXRhLnNwYXRpYWxSZWZlcmVuY2UubGF0ZXN0V2tpZCB8fCBtZXRhZGF0YS5zcGF0aWFsUmVmZXJlbmNlLndraWQ7XG4gICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gJiYgbWFwLmF0dHJpYnV0aW9uQ29udHJvbCAmJiBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gPSBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0O1xuICAgICAgICAgICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5hZGRBdHRyaWJ1dGlvbih0aGlzLmdldEF0dHJpYnV0aW9uKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3IgPT09IDEwMjEwMCB8fCBzciA9PT0gMzg1Nykge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSB6b29tIGxldmVsIGRhdGFcbiAgICAgICAgICAgIHZhciBhcmNnaXNMT0RzID0gbWV0YWRhdGEudGlsZUluZm8ubG9kcztcbiAgICAgICAgICAgIHZhciBjb3JyZWN0UmVzb2x1dGlvbnMgPSBUaWxlZE1hcExheWVyLk1lcmNhdG9yWm9vbUxldmVscztcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmNnaXNMT0RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBhcmNnaXNMT0QgPSBhcmNnaXNMT0RzW2ldO1xuICAgICAgICAgICAgICBmb3IgKHZhciBjaSBpbiBjb3JyZWN0UmVzb2x1dGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29ycmVjdFJlcyA9IGNvcnJlY3RSZXNvbHV0aW9uc1tjaV07XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fd2l0aGluUGVyY2VudGFnZShhcmNnaXNMT0QucmVzb2x1dGlvbiwgY29ycmVjdFJlcywgdGhpcy5vcHRpb25zLnpvb21PZmZzZXRBbGxvd2FuY2UpKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLl9sb2RNYXBbY2ldID0gYXJjZ2lzTE9ELmxldmVsO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZmlyZSgnbG9kbWFwJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdhcm4oJ0wuZXNyaS5UaWxlZE1hcExheWVyIGlzIHVzaW5nIGEgbm9uLW1lcmNhdG9yIHNwYXRpYWwgcmVmZXJlbmNlLiBTdXBwb3J0IG1heSBiZSBhdmFpbGFibGUgdGhyb3VnaCBQcm9qNExlYWZsZXQgaHR0cDovL2VzcmkuZ2l0aHViLmlvL2VzcmktbGVhZmxldC9leGFtcGxlcy9ub24tbWVyY2F0b3ItcHJvamVjdGlvbi5odG1sJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBMLlRpbGVMYXllci5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIG1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UubWV0YWRhdGEoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5pZGVudGlmeSgpO1xuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmZpbmQoKTtcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UucXVlcnkoKTtcbiAgfSxcblxuICBhdXRoZW50aWNhdGU6IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHZhciB0b2tlblFzID0gJz90b2tlbj0nICsgdG9rZW47XG4gICAgdGhpcy50aWxlVXJsID0gKHRoaXMub3B0aW9ucy50b2tlbikgPyB0aGlzLnRpbGVVcmwucmVwbGFjZSgvXFw/dG9rZW49KC4rKS9nLCB0b2tlblFzKSA6IHRoaXMudGlsZVVybCArIHRva2VuUXM7XG4gICAgdGhpcy5vcHRpb25zLnRva2VuID0gdG9rZW47XG4gICAgdGhpcy5zZXJ2aWNlLmF1dGhlbnRpY2F0ZSh0b2tlbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3dpdGhpblBlcmNlbnRhZ2U6IGZ1bmN0aW9uIChhLCBiLCBwZXJjZW50YWdlKSB7XG4gICAgdmFyIGRpZmYgPSBNYXRoLmFicygoYSAvIGIpIC0gMSk7XG4gICAgcmV0dXJuIGRpZmYgPCBwZXJjZW50YWdlO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRpbGVkTWFwTGF5ZXIgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFRpbGVkTWFwTGF5ZXIodXJsLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGlsZWRNYXBMYXllcjtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgY29ycyB9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHsgc2V0RXNyaUF0dHJpYnV0aW9uIH0gZnJvbSAnLi4vVXRpbCc7XG5cbnZhciBPdmVybGF5ID0gTC5JbWFnZU92ZXJsYXkuZXh0ZW5kKHtcbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICB0aGlzLl90b3BMZWZ0ID0gbWFwLmdldFBpeGVsQm91bmRzKCkubWluO1xuICAgIEwuSW1hZ2VPdmVybGF5LnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG4gIF9yZXNldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9tYXAub3B0aW9ucy5jcnMgPT09IEwuQ1JTLkVQU0czODU3KSB7XG4gICAgICBMLkltYWdlT3ZlcmxheS5wcm90b3R5cGUuX3Jlc2V0LmNhbGwodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aGlzLl9pbWFnZSwgdGhpcy5fdG9wTGVmdC5zdWJ0cmFjdCh0aGlzLl9tYXAuZ2V0UGl4ZWxPcmlnaW4oKSkpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCB2YXIgUmFzdGVyTGF5ZXIgPSBMLkxheWVyLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIG9wYWNpdHk6IDEsXG4gICAgcG9zaXRpb246ICdmcm9udCcsXG4gICAgZjogJ2ltYWdlJyxcbiAgICB1c2VDb3JzOiBjb3JzLFxuICAgIGF0dHJpYnV0aW9uOiBudWxsLFxuICAgIGludGVyYWN0aXZlOiBmYWxzZSxcbiAgICBhbHQ6ICcnXG4gIH0sXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICAvLyBpbmNsdWRlICdQb3dlcmVkIGJ5IEVzcmknIGluIG1hcCBhdHRyaWJ1dGlvblxuICAgIHNldEVzcmlBdHRyaWJ1dGlvbihtYXApO1xuXG4gICAgdGhpcy5fdXBkYXRlID0gTC5VdGlsLnRocm90dGxlKHRoaXMuX3VwZGF0ZSwgdGhpcy5vcHRpb25zLnVwZGF0ZUludGVydmFsLCB0aGlzKTtcblxuICAgIG1hcC5vbignbW92ZWVuZCcsIHRoaXMuX3VwZGF0ZSwgdGhpcyk7XG5cbiAgICAvLyBpZiB3ZSBoYWQgYW4gaW1hZ2UgbG9hZGVkIGFuZCBpdCBtYXRjaGVzIHRoZVxuICAgIC8vIGN1cnJlbnQgYm91bmRzIHNob3cgdGhlIGltYWdlIG90aGVyd2lzZSByZW1vdmUgaXRcbiAgICBpZiAodGhpcy5fY3VycmVudEltYWdlICYmIHRoaXMuX2N1cnJlbnRJbWFnZS5fYm91bmRzLmVxdWFscyh0aGlzLl9tYXAuZ2V0Qm91bmRzKCkpKSB7XG4gICAgICBtYXAuYWRkTGF5ZXIodGhpcy5fY3VycmVudEltYWdlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSkge1xuICAgICAgdGhpcy5fbWFwLnJlbW92ZUxheWVyKHRoaXMuX2N1cnJlbnRJbWFnZSk7XG4gICAgICB0aGlzLl9jdXJyZW50SW1hZ2UgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZSgpO1xuXG4gICAgaWYgKHRoaXMuX3BvcHVwKSB7XG4gICAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5fZ2V0UG9wdXBEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX21hcC5vbignZGJsY2xpY2snLCB0aGlzLl9yZXNldFBvcHVwU3RhdGUsIHRoaXMpO1xuICAgIH1cblxuICAgIC8vIGFkZCBjb3B5cmlnaHQgdGV4dCBsaXN0ZWQgaW4gc2VydmljZSBtZXRhZGF0YVxuICAgIHRoaXMubWV0YWRhdGEoZnVuY3Rpb24gKGVyciwgbWV0YWRhdGEpIHtcbiAgICAgIGlmICghZXJyICYmICF0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gJiYgbWFwLmF0dHJpYnV0aW9uQ29udHJvbCAmJiBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0KSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbiA9IG1ldGFkYXRhLmNvcHlyaWdodFRleHQ7XG4gICAgICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuYWRkQXR0cmlidXRpb24odGhpcy5nZXRBdHRyaWJ1dGlvbigpKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UpIHtcbiAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcih0aGlzLl9jdXJyZW50SW1hZ2UpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wb3B1cCkge1xuICAgICAgdGhpcy5fbWFwLm9mZignY2xpY2snLCB0aGlzLl9nZXRQb3B1cERhdGEsIHRoaXMpO1xuICAgICAgdGhpcy5fbWFwLm9mZignZGJsY2xpY2snLCB0aGlzLl9yZXNldFBvcHVwU3RhdGUsIHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMuX21hcC5vZmYoJ21vdmVlbmQnLCB0aGlzLl91cGRhdGUsIHRoaXMpO1xuICB9LFxuXG4gIGJpbmRQb3B1cDogZnVuY3Rpb24gKGZuLCBwb3B1cE9wdGlvbnMpIHtcbiAgICB0aGlzLl9zaG91bGRSZW5kZXJQb3B1cCA9IGZhbHNlO1xuICAgIHRoaXMuX2xhc3RDbGljayA9IGZhbHNlO1xuICAgIHRoaXMuX3BvcHVwID0gTC5wb3B1cChwb3B1cE9wdGlvbnMpO1xuICAgIHRoaXMuX3BvcHVwRnVuY3Rpb24gPSBmbjtcbiAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5fZ2V0UG9wdXBEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX21hcC5vbignZGJsY2xpY2snLCB0aGlzLl9yZXNldFBvcHVwU3RhdGUsIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICB1bmJpbmRQb3B1cDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgIHRoaXMuX21hcC5jbG9zZVBvcHVwKHRoaXMuX3BvcHVwKTtcbiAgICAgIHRoaXMuX21hcC5vZmYoJ2NsaWNrJywgdGhpcy5fZ2V0UG9wdXBEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX21hcC5vZmYoJ2RibGNsaWNrJywgdGhpcy5fcmVzZXRQb3B1cFN0YXRlLCB0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5fcG9wdXAgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBicmluZ1RvRnJvbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9wdGlvbnMucG9zaXRpb24gPSAnZnJvbnQnO1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5icmluZ1RvRnJvbnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYnJpbmdUb0JhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9wdGlvbnMucG9zaXRpb24gPSAnYmFjayc7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSkge1xuICAgICAgdGhpcy5fY3VycmVudEltYWdlLmJyaW5nVG9CYWNrKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbjtcbiAgfSxcblxuICBnZXRPcGFjaXR5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5vcGFjaXR5O1xuICB9LFxuXG4gIHNldE9wYWNpdHk6IGZ1bmN0aW9uIChvcGFjaXR5KSB7XG4gICAgdGhpcy5vcHRpb25zLm9wYWNpdHkgPSBvcGFjaXR5O1xuICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5zZXRPcGFjaXR5KG9wYWNpdHkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFRpbWVSYW5nZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBbdGhpcy5vcHRpb25zLmZyb20sIHRoaXMub3B0aW9ucy50b107XG4gIH0sXG5cbiAgc2V0VGltZVJhbmdlOiBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgICB0aGlzLm9wdGlvbnMuZnJvbSA9IGZyb207XG4gICAgdGhpcy5vcHRpb25zLnRvID0gdG87XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgbWV0YWRhdGE6IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuc2VydmljZS5tZXRhZGF0YShjYWxsYmFjaywgY29udGV4dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYXV0aGVudGljYXRlOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0aGlzLnNlcnZpY2UuYXV0aGVudGljYXRlKHRva2VuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBfcmVuZGVySW1hZ2U6IGZ1bmN0aW9uICh1cmwsIGJvdW5kcywgY29udGVudFR5cGUpIHtcbiAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICAvLyBpZiBubyBvdXRwdXQgZGlyZWN0b3J5IGhhcyBiZWVuIHNwZWNpZmllZCBmb3IgYSBzZXJ2aWNlLCBNSU1FIGRhdGEgd2lsbCBiZSByZXR1cm5lZFxuICAgICAgaWYgKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgIHVybCA9ICdkYXRhOicgKyBjb250ZW50VHlwZSArICc7YmFzZTY0LCcgKyB1cmw7XG4gICAgICB9XG4gICAgICAvLyBjcmVhdGUgYSBuZXcgaW1hZ2Ugb3ZlcmxheSBhbmQgYWRkIGl0IHRvIHRoZSBtYXBcbiAgICAgIC8vIHRvIHN0YXJ0IGxvYWRpbmcgdGhlIGltYWdlXG4gICAgICAvLyBvcGFjaXR5IGlzIDAgd2hpbGUgdGhlIGltYWdlIGlzIGxvYWRpbmdcbiAgICAgIHZhciBpbWFnZSA9IG5ldyBPdmVybGF5KHVybCwgYm91bmRzLCB7XG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLm9wdGlvbnMudXNlQ29ycyxcbiAgICAgICAgYWx0OiB0aGlzLm9wdGlvbnMuYWx0LFxuICAgICAgICBwYW5lOiB0aGlzLm9wdGlvbnMucGFuZSB8fCB0aGlzLmdldFBhbmUoKSxcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRoaXMub3B0aW9ucy5pbnRlcmFjdGl2ZVxuICAgICAgfSkuYWRkVG8odGhpcy5fbWFwKTtcblxuICAgICAgLy8gb25jZSB0aGUgaW1hZ2UgbG9hZHNcbiAgICAgIGltYWdlLm9uY2UoJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICAgICAgdmFyIG5ld0ltYWdlID0gZS50YXJnZXQ7XG4gICAgICAgICAgdmFyIG9sZEltYWdlID0gdGhpcy5fY3VycmVudEltYWdlO1xuXG4gICAgICAgICAgLy8gaWYgdGhlIGJvdW5kcyBvZiB0aGlzIGltYWdlIG1hdGNoZXMgdGhlIGJvdW5kcyB0aGF0XG4gICAgICAgICAgLy8gX3JlbmRlckltYWdlIHdhcyBjYWxsZWQgd2l0aCBhbmQgd2UgaGF2ZSBhIG1hcCB3aXRoIHRoZSBzYW1lIGJvdW5kc1xuICAgICAgICAgIC8vIGhpZGUgdGhlIG9sZCBpbWFnZSBpZiB0aGVyZSBpcyBvbmUgYW5kIHNldCB0aGUgb3BhY2l0eVxuICAgICAgICAgIC8vIG9mIHRoZSBuZXcgaW1hZ2Ugb3RoZXJ3aXNlIHJlbW92ZSB0aGUgbmV3IGltYWdlXG4gICAgICAgICAgaWYgKG5ld0ltYWdlLl9ib3VuZHMuZXF1YWxzKGJvdW5kcykgJiYgbmV3SW1hZ2UuX2JvdW5kcy5lcXVhbHModGhpcy5fbWFwLmdldEJvdW5kcygpKSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEltYWdlID0gbmV3SW1hZ2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucG9zaXRpb24gPT09ICdmcm9udCcpIHtcbiAgICAgICAgICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuYnJpbmdUb0JhY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcCAmJiB0aGlzLl9jdXJyZW50SW1hZ2UuX21hcCkge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SW1hZ2Uuc2V0T3BhY2l0eSh0aGlzLm9wdGlvbnMub3BhY2l0eSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50SW1hZ2UuX21hcC5yZW1vdmVMYXllcih0aGlzLl9jdXJyZW50SW1hZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob2xkSW1hZ2UgJiYgdGhpcy5fbWFwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcihvbGRJbWFnZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvbGRJbWFnZSAmJiBvbGRJbWFnZS5fbWFwKSB7XG4gICAgICAgICAgICAgIG9sZEltYWdlLl9tYXAucmVtb3ZlTGF5ZXIob2xkSW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIobmV3SW1hZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlyZSgnbG9hZCcsIHtcbiAgICAgICAgICBib3VuZHM6IGJvdW5kc1xuICAgICAgICB9KTtcbiAgICAgIH0sIHRoaXMpO1xuXG4gICAgICB0aGlzLmZpcmUoJ2xvYWRpbmcnLCB7XG4gICAgICAgIGJvdW5kczogYm91bmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX3VwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuICAgIHZhciBib3VuZHMgPSB0aGlzLl9tYXAuZ2V0Qm91bmRzKCk7XG5cbiAgICBpZiAodGhpcy5fYW5pbWF0aW5nWm9vbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9tYXAuX3BhblRyYW5zaXRpb24gJiYgdGhpcy5fbWFwLl9wYW5UcmFuc2l0aW9uLl9pblByb2dyZXNzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHpvb20gPiB0aGlzLm9wdGlvbnMubWF4Wm9vbSB8fCB6b29tIDwgdGhpcy5vcHRpb25zLm1pblpvb20pIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5fbWFwLnJlbW92ZUxheWVyKHRoaXMuX2N1cnJlbnRJbWFnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHBhcmFtcyA9IHRoaXMuX2J1aWxkRXhwb3J0UGFyYW1zKCk7XG5cbiAgICB0aGlzLl9yZXF1ZXN0RXhwb3J0KHBhcmFtcywgYm91bmRzKTtcbiAgfSxcblxuICBfcmVuZGVyUG9wdXA6IGZ1bmN0aW9uIChsYXRsbmcsIGVycm9yLCByZXN1bHRzLCByZXNwb25zZSkge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgaWYgKHRoaXMuX3Nob3VsZFJlbmRlclBvcHVwICYmIHRoaXMuX2xhc3RDbGljay5lcXVhbHMobGF0bG5nKSkge1xuICAgICAgLy8gYWRkIHRoZSBwb3B1cCB0byB0aGUgbWFwIHdoZXJlIHRoZSBtb3VzZSB3YXMgY2xpY2tlZCBhdFxuICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl9wb3B1cEZ1bmN0aW9uKGVycm9yLCByZXN1bHRzLCByZXNwb25zZSk7XG4gICAgICBpZiAoY29udGVudCkge1xuICAgICAgICB0aGlzLl9wb3B1cC5zZXRMYXRMbmcobGF0bG5nKS5zZXRDb250ZW50KGNvbnRlbnQpLm9wZW5Pbih0aGlzLl9tYXApO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfcmVzZXRQb3B1cFN0YXRlOiBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuX3Nob3VsZFJlbmRlclBvcHVwID0gZmFsc2U7XG4gICAgdGhpcy5fbGFzdENsaWNrID0gZS5sYXRsbmc7XG4gIH1cbn0pO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBSYXN0ZXJMYXllciB9IGZyb20gJy4vUmFzdGVyTGF5ZXInO1xuaW1wb3J0IHsgY2xlYW5VcmwgfSBmcm9tICcuLi9VdGlsJztcbmltcG9ydCBpbWFnZVNlcnZpY2UgZnJvbSAnLi4vU2VydmljZXMvSW1hZ2VTZXJ2aWNlJztcblxuZXhwb3J0IHZhciBJbWFnZU1hcExheWVyID0gUmFzdGVyTGF5ZXIuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgdXBkYXRlSW50ZXJ2YWw6IDE1MCxcbiAgICBmb3JtYXQ6ICdqcGdwbmcnLFxuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIGY6ICdqc29uJ1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5xdWVyeSgpO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5pZGVudGlmeSgpO1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucy51cmwgPSBjbGVhblVybChvcHRpb25zLnVybCk7XG4gICAgdGhpcy5zZXJ2aWNlID0gaW1hZ2VTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2VydmljZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIHNldFBpeGVsVHlwZTogZnVuY3Rpb24gKHBpeGVsVHlwZSkge1xuICAgIHRoaXMub3B0aW9ucy5waXhlbFR5cGUgPSBwaXhlbFR5cGU7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0UGl4ZWxUeXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5waXhlbFR5cGU7XG4gIH0sXG5cbiAgc2V0QmFuZElkczogZnVuY3Rpb24gKGJhbmRJZHMpIHtcbiAgICBpZiAoTC5VdGlsLmlzQXJyYXkoYmFuZElkcykpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5iYW5kSWRzID0gYmFuZElkcy5qb2luKCcsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9ucy5iYW5kSWRzID0gYmFuZElkcy50b1N0cmluZygpO1xuICAgIH1cbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRCYW5kSWRzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5iYW5kSWRzO1xuICB9LFxuXG4gIHNldE5vRGF0YTogZnVuY3Rpb24gKG5vRGF0YSwgbm9EYXRhSW50ZXJwcmV0YXRpb24pIHtcbiAgICBpZiAoTC5VdGlsLmlzQXJyYXkobm9EYXRhKSkge1xuICAgICAgdGhpcy5vcHRpb25zLm5vRGF0YSA9IG5vRGF0YS5qb2luKCcsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9ucy5ub0RhdGEgPSBub0RhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKG5vRGF0YUludGVycHJldGF0aW9uKSB7XG4gICAgICB0aGlzLm9wdGlvbnMubm9EYXRhSW50ZXJwcmV0YXRpb24gPSBub0RhdGFJbnRlcnByZXRhdGlvbjtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0Tm9EYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5ub0RhdGE7XG4gIH0sXG5cbiAgZ2V0Tm9EYXRhSW50ZXJwcmV0YXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5vRGF0YUludGVycHJldGF0aW9uO1xuICB9LFxuXG4gIHNldFJlbmRlcmluZ1J1bGU6IGZ1bmN0aW9uIChyZW5kZXJpbmdSdWxlKSB7XG4gICAgdGhpcy5vcHRpb25zLnJlbmRlcmluZ1J1bGUgPSByZW5kZXJpbmdSdWxlO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICB9LFxuXG4gIGdldFJlbmRlcmluZ1J1bGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJlbmRlcmluZ1J1bGU7XG4gIH0sXG5cbiAgc2V0TW9zYWljUnVsZTogZnVuY3Rpb24gKG1vc2FpY1J1bGUpIHtcbiAgICB0aGlzLm9wdGlvbnMubW9zYWljUnVsZSA9IG1vc2FpY1J1bGU7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gIH0sXG5cbiAgZ2V0TW9zYWljUnVsZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubW9zYWljUnVsZTtcbiAgfSxcblxuICBfZ2V0UG9wdXBEYXRhOiBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBjYWxsYmFjayA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG4gICAgICBzZXRUaW1lb3V0KEwuVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyUG9wdXAoZS5sYXRsbmcsIGVycm9yLCByZXN1bHRzLCByZXNwb25zZSk7XG4gICAgICB9LCB0aGlzKSwgMzAwKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHZhciBpZGVudGlmeVJlcXVlc3QgPSB0aGlzLmlkZW50aWZ5KCkuYXQoZS5sYXRsbmcpO1xuXG4gICAgLy8gc2V0IG1vc2FpYyBydWxlIGZvciBpZGVudGlmeSB0YXNrIGlmIGl0IGlzIHNldCBmb3IgbGF5ZXJcbiAgICBpZiAodGhpcy5vcHRpb25zLm1vc2FpY1J1bGUpIHtcbiAgICAgIGlkZW50aWZ5UmVxdWVzdC5zZXRNb3NhaWNSdWxlKHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlKTtcbiAgICAgIC8vIEBUT0RPOiBmb3JjZSByZXR1cm4gY2F0YWxvZyBpdGVtcyB0b28/XG4gICAgfVxuXG4gICAgLy8gQFRPRE86IHNldCByZW5kZXJpbmcgcnVsZT8gTm90IHN1cmUsXG4gICAgLy8gc29tZXRpbWVzIHlvdSB3YW50IHJhdyBwaXhlbCB2YWx1ZXNcbiAgICAvLyBpZiAodGhpcy5vcHRpb25zLnJlbmRlcmluZ1J1bGUpIHtcbiAgICAvLyAgIGlkZW50aWZ5UmVxdWVzdC5zZXRSZW5kZXJpbmdSdWxlKHRoaXMub3B0aW9ucy5yZW5kZXJpbmdSdWxlKTtcbiAgICAvLyB9XG5cbiAgICBpZGVudGlmeVJlcXVlc3QucnVuKGNhbGxiYWNrKTtcblxuICAgIC8vIHNldCB0aGUgZmxhZ3MgdG8gc2hvdyB0aGUgcG9wdXBcbiAgICB0aGlzLl9zaG91bGRSZW5kZXJQb3B1cCA9IHRydWU7XG4gICAgdGhpcy5fbGFzdENsaWNrID0gZS5sYXRsbmc7XG4gIH0sXG5cbiAgX2J1aWxkRXhwb3J0UGFyYW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRCb3VuZHMoKTtcbiAgICB2YXIgc2l6ZSA9IHRoaXMuX21hcC5nZXRTaXplKCk7XG4gICAgdmFyIG5lID0gdGhpcy5fbWFwLm9wdGlvbnMuY3JzLnByb2plY3QoYm91bmRzLl9ub3J0aEVhc3QpO1xuICAgIHZhciBzdyA9IHRoaXMuX21hcC5vcHRpb25zLmNycy5wcm9qZWN0KGJvdW5kcy5fc291dGhXZXN0KTtcblxuICAgIC8vIGVuc3VyZSB0aGF0IHdlIGRvbid0IGFzayBBcmNHSVMgU2VydmVyIGZvciBhIHRhbGxlciBpbWFnZSB0aGFuIHdlIGhhdmUgYWN0dWFsIG1hcCBkaXNwbGF5aW5nXG4gICAgdmFyIHRvcCA9IHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQoYm91bmRzLl9ub3J0aEVhc3QpO1xuICAgIHZhciBib3R0b20gPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KGJvdW5kcy5fc291dGhXZXN0KTtcblxuICAgIGlmICh0b3AueSA+IDAgfHwgYm90dG9tLnkgPCBzaXplLnkpIHtcbiAgICAgIHNpemUueSA9IGJvdHRvbS55IC0gdG9wLnk7XG4gICAgfVxuXG4gICAgdmFyIHNyID0gcGFyc2VJbnQodGhpcy5fbWFwLm9wdGlvbnMuY3JzLmNvZGUuc3BsaXQoJzonKVsxXSwgMTApO1xuXG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIGJib3g6IFtzdy54LCBzdy55LCBuZS54LCBuZS55XS5qb2luKCcsJyksXG4gICAgICBzaXplOiBzaXplLnggKyAnLCcgKyBzaXplLnksXG4gICAgICBmb3JtYXQ6IHRoaXMub3B0aW9ucy5mb3JtYXQsXG4gICAgICB0cmFuc3BhcmVudDogdGhpcy5vcHRpb25zLnRyYW5zcGFyZW50LFxuICAgICAgYmJveFNSOiBzcixcbiAgICAgIGltYWdlU1I6IHNyXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZnJvbSAmJiB0aGlzLm9wdGlvbnMudG8pIHtcbiAgICAgIHBhcmFtcy50aW1lID0gdGhpcy5vcHRpb25zLmZyb20udmFsdWVPZigpICsgJywnICsgdGhpcy5vcHRpb25zLnRvLnZhbHVlT2YoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnBpeGVsVHlwZSkge1xuICAgICAgcGFyYW1zLnBpeGVsVHlwZSA9IHRoaXMub3B0aW9ucy5waXhlbFR5cGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbnRlcnBvbGF0aW9uKSB7XG4gICAgICBwYXJhbXMuaW50ZXJwb2xhdGlvbiA9IHRoaXMub3B0aW9ucy5pbnRlcnBvbGF0aW9uO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29tcHJlc3Npb25RdWFsaXR5KSB7XG4gICAgICBwYXJhbXMuY29tcHJlc3Npb25RdWFsaXR5ID0gdGhpcy5vcHRpb25zLmNvbXByZXNzaW9uUXVhbGl0eTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmJhbmRJZHMpIHtcbiAgICAgIHBhcmFtcy5iYW5kSWRzID0gdGhpcy5vcHRpb25zLmJhbmRJZHM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5ub0RhdGEpIHtcbiAgICAgIHBhcmFtcy5ub0RhdGEgPSB0aGlzLm9wdGlvbnMubm9EYXRhO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMubm9EYXRhSW50ZXJwcmV0YXRpb24pIHtcbiAgICAgIHBhcmFtcy5ub0RhdGFJbnRlcnByZXRhdGlvbiA9IHRoaXMub3B0aW9ucy5ub0RhdGFJbnRlcnByZXRhdGlvbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZXJ2aWNlLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIHBhcmFtcy50b2tlbiA9IHRoaXMuc2VydmljZS5vcHRpb25zLnRva2VuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZSkge1xuICAgICAgcGFyYW1zLnJlbmRlcmluZ1J1bGUgPSBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlKSB7XG4gICAgICBwYXJhbXMubW9zYWljUnVsZSA9IEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9LFxuXG4gIF9yZXF1ZXN0RXhwb3J0OiBmdW5jdGlvbiAocGFyYW1zLCBib3VuZHMpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmYgPT09ICdqc29uJykge1xuICAgICAgdGhpcy5zZXJ2aWNlLnJlcXVlc3QoJ2V4cG9ydEltYWdlJywgcGFyYW1zLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgICAgICByZXNwb25zZS5ocmVmICs9ICgnP3Rva2VuPScgKyB0aGlzLm9wdGlvbnMudG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlbmRlckltYWdlKHJlc3BvbnNlLmhyZWYsIGJvdW5kcyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1zLmYgPSAnaW1hZ2UnO1xuICAgICAgdGhpcy5fcmVuZGVySW1hZ2UodGhpcy5vcHRpb25zLnVybCArICdleHBvcnRJbWFnZScgKyBMLlV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zKSwgYm91bmRzKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VNYXBMYXllciAodXJsLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSW1hZ2VNYXBMYXllcih1cmwsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbWFnZU1hcExheWVyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBSYXN0ZXJMYXllciB9IGZyb20gJy4vUmFzdGVyTGF5ZXInO1xuaW1wb3J0IHsgY2xlYW5VcmwgfSBmcm9tICcuLi9VdGlsJztcbmltcG9ydCBtYXBTZXJ2aWNlIGZyb20gJy4uL1NlcnZpY2VzL01hcFNlcnZpY2UnO1xuXG5leHBvcnQgdmFyIER5bmFtaWNNYXBMYXllciA9IFJhc3RlckxheWVyLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIHVwZGF0ZUludGVydmFsOiAxNTAsXG4gICAgbGF5ZXJzOiBmYWxzZSxcbiAgICBsYXllckRlZnM6IGZhbHNlLFxuICAgIHRpbWVPcHRpb25zOiBmYWxzZSxcbiAgICBmb3JtYXQ6ICdwbmcyNCcsXG4gICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgZjogJ2pzb24nXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zLnVybCA9IGNsZWFuVXJsKG9wdGlvbnMudXJsKTtcbiAgICB0aGlzLnNlcnZpY2UgPSBtYXBTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHRoaXMuc2VydmljZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgIGlmICgob3B0aW9ucy5wcm94eSB8fCBvcHRpb25zLnRva2VuKSAmJiBvcHRpb25zLmYgIT09ICdqc29uJykge1xuICAgICAgb3B0aW9ucy5mID0gJ2pzb24nO1xuICAgIH1cbiAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICBnZXREeW5hbWljTGF5ZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5keW5hbWljTGF5ZXJzO1xuICB9LFxuXG4gIHNldER5bmFtaWNMYXllcnM6IGZ1bmN0aW9uIChkeW5hbWljTGF5ZXJzKSB7XG4gICAgdGhpcy5vcHRpb25zLmR5bmFtaWNMYXllcnMgPSBkeW5hbWljTGF5ZXJzO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldExheWVyczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubGF5ZXJzO1xuICB9LFxuXG4gIHNldExheWVyczogZnVuY3Rpb24gKGxheWVycykge1xuICAgIHRoaXMub3B0aW9ucy5sYXllcnMgPSBsYXllcnM7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0TGF5ZXJEZWZzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5sYXllckRlZnM7XG4gIH0sXG5cbiAgc2V0TGF5ZXJEZWZzOiBmdW5jdGlvbiAobGF5ZXJEZWZzKSB7XG4gICAgdGhpcy5vcHRpb25zLmxheWVyRGVmcyA9IGxheWVyRGVmcztcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRUaW1lT3B0aW9uczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudGltZU9wdGlvbnM7XG4gIH0sXG5cbiAgc2V0VGltZU9wdGlvbnM6IGZ1bmN0aW9uICh0aW1lT3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucy50aW1lT3B0aW9ucyA9IHRpbWVPcHRpb25zO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5xdWVyeSgpO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5pZGVudGlmeSgpO1xuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmZpbmQoKTtcbiAgfSxcblxuICBfZ2V0UG9wdXBEYXRhOiBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBjYWxsYmFjayA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgZmVhdHVyZUNvbGxlY3Rpb24sIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9IC8vIHdlIHJlYWxseSBjYW4ndCBkbyBhbnl0aGluZyBoZXJlIGJ1dCBhdXRoZW50aWNhdGUgb3IgcmVxdWVzdGVycm9yIHdpbGwgZmlyZVxuICAgICAgc2V0VGltZW91dChMLlV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlclBvcHVwKGUubGF0bG5nLCBlcnJvciwgZmVhdHVyZUNvbGxlY3Rpb24sIHJlc3BvbnNlKTtcbiAgICAgIH0sIHRoaXMpLCAzMDApO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgdmFyIGlkZW50aWZ5UmVxdWVzdCA9IHRoaXMuaWRlbnRpZnkoKS5vbih0aGlzLl9tYXApLmF0KGUubGF0bG5nKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXJzKSB7XG4gICAgICBpZGVudGlmeVJlcXVlc3QubGF5ZXJzKCd2aXNpYmxlOicgKyB0aGlzLm9wdGlvbnMubGF5ZXJzLmpvaW4oJywnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkZW50aWZ5UmVxdWVzdC5sYXllcnMoJ3Zpc2libGUnKTtcbiAgICB9XG5cbiAgICBpZGVudGlmeVJlcXVlc3QucnVuKGNhbGxiYWNrKTtcblxuICAgIC8vIHNldCB0aGUgZmxhZ3MgdG8gc2hvdyB0aGUgcG9wdXBcbiAgICB0aGlzLl9zaG91bGRSZW5kZXJQb3B1cCA9IHRydWU7XG4gICAgdGhpcy5fbGFzdENsaWNrID0gZS5sYXRsbmc7XG4gIH0sXG5cbiAgX2J1aWxkRXhwb3J0UGFyYW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRCb3VuZHMoKTtcbiAgICB2YXIgc2l6ZSA9IHRoaXMuX21hcC5nZXRTaXplKCk7XG4gICAgdmFyIG5lID0gdGhpcy5fbWFwLm9wdGlvbnMuY3JzLnByb2plY3QoYm91bmRzLmdldE5vcnRoRWFzdCgpKTtcbiAgICB2YXIgc3cgPSB0aGlzLl9tYXAub3B0aW9ucy5jcnMucHJvamVjdChib3VuZHMuZ2V0U291dGhXZXN0KCkpO1xuICAgIHZhciBzciA9IHBhcnNlSW50KHRoaXMuX21hcC5vcHRpb25zLmNycy5jb2RlLnNwbGl0KCc6JylbMV0sIDEwKTtcblxuICAgIC8vIGVuc3VyZSB0aGF0IHdlIGRvbid0IGFzayBBcmNHSVMgU2VydmVyIGZvciBhIHRhbGxlciBpbWFnZSB0aGFuIHdlIGhhdmUgYWN0dWFsIG1hcCBkaXNwbGF5aW5nXG4gICAgdmFyIHRvcCA9IHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQoYm91bmRzLl9ub3J0aEVhc3QpO1xuICAgIHZhciBib3R0b20gPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KGJvdW5kcy5fc291dGhXZXN0KTtcblxuICAgIGlmICh0b3AueSA+IDAgfHwgYm90dG9tLnkgPCBzaXplLnkpIHtcbiAgICAgIHNpemUueSA9IGJvdHRvbS55IC0gdG9wLnk7XG4gICAgfVxuXG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIGJib3g6IFtzdy54LCBzdy55LCBuZS54LCBuZS55XS5qb2luKCcsJyksXG4gICAgICBzaXplOiBzaXplLnggKyAnLCcgKyBzaXplLnksXG4gICAgICBkcGk6IDk2LFxuICAgICAgZm9ybWF0OiB0aGlzLm9wdGlvbnMuZm9ybWF0LFxuICAgICAgdHJhbnNwYXJlbnQ6IHRoaXMub3B0aW9ucy50cmFuc3BhcmVudCxcbiAgICAgIGJib3hTUjogc3IsXG4gICAgICBpbWFnZVNSOiBzclxuICAgIH07XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmR5bmFtaWNMYXllcnMpIHtcbiAgICAgIHBhcmFtcy5keW5hbWljTGF5ZXJzID0gdGhpcy5vcHRpb25zLmR5bmFtaWNMYXllcnM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllcnMpIHtcbiAgICAgIHBhcmFtcy5sYXllcnMgPSAnc2hvdzonICsgdGhpcy5vcHRpb25zLmxheWVycy5qb2luKCcsJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYXllckRlZnMpIHtcbiAgICAgIHBhcmFtcy5sYXllckRlZnMgPSBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMubGF5ZXJEZWZzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVPcHRpb25zKSB7XG4gICAgICBwYXJhbXMudGltZU9wdGlvbnMgPSBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMudGltZU9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZnJvbSAmJiB0aGlzLm9wdGlvbnMudG8pIHtcbiAgICAgIHBhcmFtcy50aW1lID0gdGhpcy5vcHRpb25zLmZyb20udmFsdWVPZigpICsgJywnICsgdGhpcy5vcHRpb25zLnRvLnZhbHVlT2YoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZXJ2aWNlLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIHBhcmFtcy50b2tlbiA9IHRoaXMuc2VydmljZS5vcHRpb25zLnRva2VuO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH0sXG5cbiAgX3JlcXVlc3RFeHBvcnQ6IGZ1bmN0aW9uIChwYXJhbXMsIGJvdW5kcykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZiA9PT0gJ2pzb24nKSB7XG4gICAgICB0aGlzLnNlcnZpY2UucmVxdWVzdCgnZXhwb3J0JywgcGFyYW1zLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH0gLy8gd2UgcmVhbGx5IGNhbid0IGRvIGFueXRoaW5nIGhlcmUgYnV0IGF1dGhlbnRpY2F0ZSBvciByZXF1ZXN0ZXJyb3Igd2lsbCBmaXJlXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgICAgICByZXNwb25zZS5ocmVmICs9ICgnP3Rva2VuPScgKyB0aGlzLm9wdGlvbnMudG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNwb25zZS5ocmVmKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVySW1hZ2UocmVzcG9uc2UuaHJlZiwgYm91bmRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJJbWFnZShyZXNwb25zZS5pbWFnZURhdGEsIGJvdW5kcywgcmVzcG9uc2UuY29udGVudFR5cGUpO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1zLmYgPSAnaW1hZ2UnO1xuICAgICAgdGhpcy5fcmVuZGVySW1hZ2UodGhpcy5vcHRpb25zLnVybCArICdleHBvcnQnICsgTC5VdGlsLmdldFBhcmFtU3RyaW5nKHBhcmFtcyksIGJvdW5kcyk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGR5bmFtaWNNYXBMYXllciAodXJsLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRHluYW1pY01hcExheWVyKHVybCwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGR5bmFtaWNNYXBMYXllcjtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuXG52YXIgVmlydHVhbEdyaWQgPSBMLkxheWVyLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIGNlbGxTaXplOiA1MTIsXG4gICAgdXBkYXRlSW50ZXJ2YWw6IDE1MFxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl96b29taW5nID0gZmFsc2U7XG4gIH0sXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICB0aGlzLl9tYXAgPSBtYXA7XG4gICAgdGhpcy5fdXBkYXRlID0gTC5VdGlsLnRocm90dGxlKHRoaXMuX3VwZGF0ZSwgdGhpcy5vcHRpb25zLnVwZGF0ZUludGVydmFsLCB0aGlzKTtcbiAgICB0aGlzLl9yZXNldCgpO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICB9LFxuXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fbWFwLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5nZXRFdmVudHMoKSwgdGhpcyk7XG4gICAgdGhpcy5fcmVtb3ZlQ2VsbHMoKTtcbiAgfSxcblxuICBnZXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXZlbnRzID0ge1xuICAgICAgbW92ZWVuZDogdGhpcy5fdXBkYXRlLFxuICAgICAgem9vbXN0YXJ0OiB0aGlzLl96b29tc3RhcnQsXG4gICAgICB6b29tZW5kOiB0aGlzLl9yZXNldFxuICAgIH07XG5cbiAgICByZXR1cm4gZXZlbnRzO1xuICB9LFxuXG4gIGFkZFRvOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgbWFwLmFkZExheWVyKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJlbW92ZUZyb206IGZ1bmN0aW9uIChtYXApIHtcbiAgICBtYXAucmVtb3ZlTGF5ZXIodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3pvb21zdGFydDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3pvb21pbmcgPSB0cnVlO1xuICB9LFxuXG4gIF9yZXNldDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3JlbW92ZUNlbGxzKCk7XG5cbiAgICB0aGlzLl9jZWxscyA9IHt9O1xuICAgIHRoaXMuX2FjdGl2ZUNlbGxzID0ge307XG4gICAgdGhpcy5fY2VsbHNUb0xvYWQgPSAwO1xuICAgIHRoaXMuX2NlbGxzVG90YWwgPSAwO1xuICAgIHRoaXMuX2NlbGxOdW1Cb3VuZHMgPSB0aGlzLl9nZXRDZWxsTnVtQm91bmRzKCk7XG5cbiAgICB0aGlzLl9yZXNldFdyYXAoKTtcbiAgICB0aGlzLl96b29taW5nID0gZmFsc2U7XG4gIH0sXG5cbiAgX3Jlc2V0V3JhcDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBtYXAgPSB0aGlzLl9tYXA7XG4gICAgdmFyIGNycyA9IG1hcC5vcHRpb25zLmNycztcblxuICAgIGlmIChjcnMuaW5maW5pdGUpIHsgcmV0dXJuOyB9XG5cbiAgICB2YXIgY2VsbFNpemUgPSB0aGlzLl9nZXRDZWxsU2l6ZSgpO1xuXG4gICAgaWYgKGNycy53cmFwTG5nKSB7XG4gICAgICB0aGlzLl93cmFwTG5nID0gW1xuICAgICAgICBNYXRoLmZsb29yKG1hcC5wcm9qZWN0KFswLCBjcnMud3JhcExuZ1swXV0pLnggLyBjZWxsU2l6ZSksXG4gICAgICAgIE1hdGguY2VpbChtYXAucHJvamVjdChbMCwgY3JzLndyYXBMbmdbMV1dKS54IC8gY2VsbFNpemUpXG4gICAgICBdO1xuICAgIH1cblxuICAgIGlmIChjcnMud3JhcExhdCkge1xuICAgICAgdGhpcy5fd3JhcExhdCA9IFtcbiAgICAgICAgTWF0aC5mbG9vcihtYXAucHJvamVjdChbY3JzLndyYXBMYXRbMF0sIDBdKS55IC8gY2VsbFNpemUpLFxuICAgICAgICBNYXRoLmNlaWwobWFwLnByb2plY3QoW2Nycy53cmFwTGF0WzFdLCAwXSkueSAvIGNlbGxTaXplKVxuICAgICAgXTtcbiAgICB9XG4gIH0sXG5cbiAgX2dldENlbGxTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jZWxsU2l6ZTtcbiAgfSxcblxuICBfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLl9tYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgYm91bmRzID0gdGhpcy5fbWFwLmdldFBpeGVsQm91bmRzKCk7XG4gICAgdmFyIGNlbGxTaXplID0gdGhpcy5fZ2V0Q2VsbFNpemUoKTtcblxuICAgIC8vIGNlbGwgY29vcmRpbmF0ZXMgcmFuZ2UgZm9yIHRoZSBjdXJyZW50IHZpZXdcbiAgICB2YXIgY2VsbEJvdW5kcyA9IEwuYm91bmRzKFxuICAgICAgYm91bmRzLm1pbi5kaXZpZGVCeShjZWxsU2l6ZSkuZmxvb3IoKSxcbiAgICAgIGJvdW5kcy5tYXguZGl2aWRlQnkoY2VsbFNpemUpLmZsb29yKCkpO1xuXG4gICAgdGhpcy5fcmVtb3ZlT3RoZXJDZWxscyhjZWxsQm91bmRzKTtcbiAgICB0aGlzLl9hZGRDZWxscyhjZWxsQm91bmRzKTtcblxuICAgIHRoaXMuZmlyZSgnY2VsbHN1cGRhdGVkJyk7XG4gIH0sXG5cbiAgX2FkZENlbGxzOiBmdW5jdGlvbiAoYm91bmRzKSB7XG4gICAgdmFyIHF1ZXVlID0gW107XG4gICAgdmFyIGNlbnRlciA9IGJvdW5kcy5nZXRDZW50ZXIoKTtcbiAgICB2YXIgem9vbSA9IHRoaXMuX21hcC5nZXRab29tKCk7XG5cbiAgICB2YXIgaiwgaSwgY29vcmRzO1xuICAgIC8vIGNyZWF0ZSBhIHF1ZXVlIG9mIGNvb3JkaW5hdGVzIHRvIGxvYWQgY2VsbHMgZnJvbVxuICAgIGZvciAoaiA9IGJvdW5kcy5taW4ueTsgaiA8PSBib3VuZHMubWF4Lnk7IGorKykge1xuICAgICAgZm9yIChpID0gYm91bmRzLm1pbi54OyBpIDw9IGJvdW5kcy5tYXgueDsgaSsrKSB7XG4gICAgICAgIGNvb3JkcyA9IEwucG9pbnQoaSwgaik7XG4gICAgICAgIGNvb3Jkcy56ID0gem9vbTtcblxuICAgICAgICBpZiAodGhpcy5faXNWYWxpZENlbGwoY29vcmRzKSkge1xuICAgICAgICAgIHF1ZXVlLnB1c2goY29vcmRzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjZWxsc1RvTG9hZCA9IHF1ZXVlLmxlbmd0aDtcblxuICAgIGlmIChjZWxsc1RvTG9hZCA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgIHRoaXMuX2NlbGxzVG9Mb2FkICs9IGNlbGxzVG9Mb2FkO1xuICAgIHRoaXMuX2NlbGxzVG90YWwgKz0gY2VsbHNUb0xvYWQ7XG5cbiAgICAvLyBzb3J0IGNlbGwgcXVldWUgdG8gbG9hZCBjZWxscyBpbiBvcmRlciBvZiB0aGVpciBkaXN0YW5jZSB0byBjZW50ZXJcbiAgICBxdWV1ZS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYS5kaXN0YW5jZVRvKGNlbnRlcikgLSBiLmRpc3RhbmNlVG8oY2VudGVyKTtcbiAgICB9KTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBjZWxsc1RvTG9hZDsgaSsrKSB7XG4gICAgICB0aGlzLl9hZGRDZWxsKHF1ZXVlW2ldKTtcbiAgICB9XG4gIH0sXG5cbiAgX2lzVmFsaWRDZWxsOiBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgdmFyIGNycyA9IHRoaXMuX21hcC5vcHRpb25zLmNycztcblxuICAgIGlmICghY3JzLmluZmluaXRlKSB7XG4gICAgICAvLyBkb24ndCBsb2FkIGNlbGwgaWYgaXQncyBvdXQgb2YgYm91bmRzIGFuZCBub3Qgd3JhcHBlZFxuICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuX2NlbGxOdW1Cb3VuZHM7XG4gICAgICBpZiAoXG4gICAgICAgICghY3JzLndyYXBMbmcgJiYgKGNvb3Jkcy54IDwgYm91bmRzLm1pbi54IHx8IGNvb3Jkcy54ID4gYm91bmRzLm1heC54KSkgfHxcbiAgICAgICAgKCFjcnMud3JhcExhdCAmJiAoY29vcmRzLnkgPCBib3VuZHMubWluLnkgfHwgY29vcmRzLnkgPiBib3VuZHMubWF4LnkpKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5ib3VuZHMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGRvbid0IGxvYWQgY2VsbCBpZiBpdCBkb2Vzbid0IGludGVyc2VjdCB0aGUgYm91bmRzIGluIG9wdGlvbnNcbiAgICB2YXIgY2VsbEJvdW5kcyA9IHRoaXMuX2NlbGxDb29yZHNUb0JvdW5kcyhjb29yZHMpO1xuICAgIHJldHVybiBMLmxhdExuZ0JvdW5kcyh0aGlzLm9wdGlvbnMuYm91bmRzKS5pbnRlcnNlY3RzKGNlbGxCb3VuZHMpO1xuICB9LFxuXG4gIC8vIGNvbnZlcnRzIGNlbGwgY29vcmRpbmF0ZXMgdG8gaXRzIGdlb2dyYXBoaWNhbCBib3VuZHNcbiAgX2NlbGxDb29yZHNUb0JvdW5kczogZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIHZhciBtYXAgPSB0aGlzLl9tYXA7XG4gICAgdmFyIGNlbGxTaXplID0gdGhpcy5vcHRpb25zLmNlbGxTaXplO1xuICAgIHZhciBud1BvaW50ID0gY29vcmRzLm11bHRpcGx5QnkoY2VsbFNpemUpO1xuICAgIHZhciBzZVBvaW50ID0gbndQb2ludC5hZGQoW2NlbGxTaXplLCBjZWxsU2l6ZV0pO1xuICAgIHZhciBudyA9IG1hcC53cmFwTGF0TG5nKG1hcC51bnByb2plY3QobndQb2ludCwgY29vcmRzLnopKTtcbiAgICB2YXIgc2UgPSBtYXAud3JhcExhdExuZyhtYXAudW5wcm9qZWN0KHNlUG9pbnQsIGNvb3Jkcy56KSk7XG5cbiAgICByZXR1cm4gTC5sYXRMbmdCb3VuZHMobncsIHNlKTtcbiAgfSxcblxuICAvLyBjb252ZXJ0cyBjZWxsIGNvb3JkaW5hdGVzIHRvIGtleSBmb3IgdGhlIGNlbGwgY2FjaGVcbiAgX2NlbGxDb29yZHNUb0tleTogZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIHJldHVybiBjb29yZHMueCArICc6JyArIGNvb3Jkcy55O1xuICB9LFxuXG4gIC8vIGNvbnZlcnRzIGNlbGwgY2FjaGUga2V5IHRvIGNvb3JkaWFudGVzXG4gIF9rZXlUb0NlbGxDb29yZHM6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIga0FyciA9IGtleS5zcGxpdCgnOicpO1xuICAgIHZhciB4ID0gcGFyc2VJbnQoa0FyclswXSwgMTApO1xuICAgIHZhciB5ID0gcGFyc2VJbnQoa0FyclsxXSwgMTApO1xuXG4gICAgcmV0dXJuIEwucG9pbnQoeCwgeSk7XG4gIH0sXG5cbiAgLy8gcmVtb3ZlIGFueSBwcmVzZW50IGNlbGxzIHRoYXQgYXJlIG9mZiB0aGUgc3BlY2lmaWVkIGJvdW5kc1xuICBfcmVtb3ZlT3RoZXJDZWxsczogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9jZWxscykge1xuICAgICAgaWYgKCFib3VuZHMuY29udGFpbnModGhpcy5fa2V5VG9DZWxsQ29vcmRzKGtleSkpKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUNlbGwoa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX3JlbW92ZUNlbGw6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgY2VsbCA9IHRoaXMuX2FjdGl2ZUNlbGxzW2tleV07XG5cbiAgICBpZiAoY2VsbCkge1xuICAgICAgZGVsZXRlIHRoaXMuX2FjdGl2ZUNlbGxzW2tleV07XG5cbiAgICAgIGlmICh0aGlzLmNlbGxMZWF2ZSkge1xuICAgICAgICB0aGlzLmNlbGxMZWF2ZShjZWxsLmJvdW5kcywgY2VsbC5jb29yZHMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmUoJ2NlbGxsZWF2ZScsIHtcbiAgICAgICAgYm91bmRzOiBjZWxsLmJvdW5kcyxcbiAgICAgICAgY29vcmRzOiBjZWxsLmNvb3Jkc1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIF9yZW1vdmVDZWxsczogZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9jZWxscykge1xuICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuX2NlbGxzW2tleV0uYm91bmRzO1xuICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuX2NlbGxzW2tleV0uY29vcmRzO1xuXG4gICAgICBpZiAodGhpcy5jZWxsTGVhdmUpIHtcbiAgICAgICAgdGhpcy5jZWxsTGVhdmUoYm91bmRzLCBjb29yZHMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmUoJ2NlbGxsZWF2ZScsIHtcbiAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgIGNvb3JkczogY29vcmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX2FkZENlbGw6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAvLyB3cmFwIGNlbGwgY29vcmRzIGlmIG5lY2Vzc2FyeSAoZGVwZW5kaW5nIG9uIENSUylcbiAgICB0aGlzLl93cmFwQ29vcmRzKGNvb3Jkcyk7XG5cbiAgICAvLyBnZW5lcmF0ZSB0aGUgY2VsbCBrZXlcbiAgICB2YXIga2V5ID0gdGhpcy5fY2VsbENvb3Jkc1RvS2V5KGNvb3Jkcyk7XG5cbiAgICAvLyBnZXQgdGhlIGNlbGwgZnJvbSB0aGUgY2FjaGVcbiAgICB2YXIgY2VsbCA9IHRoaXMuX2NlbGxzW2tleV07XG4gICAgLy8gaWYgdGhpcyBjZWxsIHNob3VsZCBiZSBzaG93biBhcyBpc250IGFjdGl2ZSB5ZXQgKGVudGVyKVxuXG4gICAgaWYgKGNlbGwgJiYgIXRoaXMuX2FjdGl2ZUNlbGxzW2tleV0pIHtcbiAgICAgIGlmICh0aGlzLmNlbGxFbnRlcikge1xuICAgICAgICB0aGlzLmNlbGxFbnRlcihjZWxsLmJvdW5kcywgY29vcmRzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maXJlKCdjZWxsZW50ZXInLCB7XG4gICAgICAgIGJvdW5kczogY2VsbC5ib3VuZHMsXG4gICAgICAgIGNvb3JkczogY29vcmRzXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fYWN0aXZlQ2VsbHNba2V5XSA9IGNlbGw7XG4gICAgfVxuXG4gICAgLy8gaWYgd2UgZG9udCBoYXZlIHRoaXMgY2VsbCBpbiB0aGUgY2FjaGUgeWV0IChjcmVhdGUpXG4gICAgaWYgKCFjZWxsKSB7XG4gICAgICBjZWxsID0ge1xuICAgICAgICBjb29yZHM6IGNvb3JkcyxcbiAgICAgICAgYm91bmRzOiB0aGlzLl9jZWxsQ29vcmRzVG9Cb3VuZHMoY29vcmRzKVxuICAgICAgfTtcblxuICAgICAgdGhpcy5fY2VsbHNba2V5XSA9IGNlbGw7XG4gICAgICB0aGlzLl9hY3RpdmVDZWxsc1trZXldID0gY2VsbDtcblxuICAgICAgaWYgKHRoaXMuY3JlYXRlQ2VsbCkge1xuICAgICAgICB0aGlzLmNyZWF0ZUNlbGwoY2VsbC5ib3VuZHMsIGNvb3Jkcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlyZSgnY2VsbGNyZWF0ZScsIHtcbiAgICAgICAgYm91bmRzOiBjZWxsLmJvdW5kcyxcbiAgICAgICAgY29vcmRzOiBjb29yZHNcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBfd3JhcENvb3JkczogZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIGNvb3Jkcy54ID0gdGhpcy5fd3JhcExuZyA/IEwuVXRpbC53cmFwTnVtKGNvb3Jkcy54LCB0aGlzLl93cmFwTG5nKSA6IGNvb3Jkcy54O1xuICAgIGNvb3Jkcy55ID0gdGhpcy5fd3JhcExhdCA/IEwuVXRpbC53cmFwTnVtKGNvb3Jkcy55LCB0aGlzLl93cmFwTGF0KSA6IGNvb3Jkcy55O1xuICB9LFxuXG4gIC8vIGdldCB0aGUgZ2xvYmFsIGNlbGwgY29vcmRpbmF0ZXMgcmFuZ2UgZm9yIHRoZSBjdXJyZW50IHpvb21cbiAgX2dldENlbGxOdW1Cb3VuZHM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fbWFwLmdldFBpeGVsV29ybGRCb3VuZHMoKTtcbiAgICB2YXIgc2l6ZSA9IHRoaXMuX2dldENlbGxTaXplKCk7XG5cbiAgICByZXR1cm4gYm91bmRzID8gTC5ib3VuZHMoXG4gICAgICAgIGJvdW5kcy5taW4uZGl2aWRlQnkoc2l6ZSkuZmxvb3IoKSxcbiAgICAgICAgYm91bmRzLm1heC5kaXZpZGVCeShzaXplKS5jZWlsKCkuc3VidHJhY3QoWzEsIDFdKSkgOiBudWxsO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgVmlydHVhbEdyaWQ7XG4iLCJmdW5jdGlvbiBCaW5hcnlTZWFyY2hJbmRleCAodmFsdWVzKSB7XG4gIHRoaXMudmFsdWVzID0gW10uY29uY2F0KHZhbHVlcyB8fCBbXSk7XG59XG5cbkJpbmFyeVNlYXJjaEluZGV4LnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4KHZhbHVlKTtcbiAgcmV0dXJuIHRoaXMudmFsdWVzW2luZGV4XTtcbn07XG5cbkJpbmFyeVNlYXJjaEluZGV4LnByb3RvdHlwZS5nZXRJbmRleCA9IGZ1bmN0aW9uIGdldEluZGV4ICh2YWx1ZSkge1xuICBpZiAodGhpcy5kaXJ0eSkge1xuICAgIHRoaXMuc29ydCgpO1xuICB9XG5cbiAgdmFyIG1pbkluZGV4ID0gMDtcbiAgdmFyIG1heEluZGV4ID0gdGhpcy52YWx1ZXMubGVuZ3RoIC0gMTtcbiAgdmFyIGN1cnJlbnRJbmRleDtcbiAgdmFyIGN1cnJlbnRFbGVtZW50O1xuXG4gIHdoaWxlIChtaW5JbmRleCA8PSBtYXhJbmRleCkge1xuICAgIGN1cnJlbnRJbmRleCA9IChtaW5JbmRleCArIG1heEluZGV4KSAvIDIgfCAwO1xuICAgIGN1cnJlbnRFbGVtZW50ID0gdGhpcy52YWx1ZXNbTWF0aC5yb3VuZChjdXJyZW50SW5kZXgpXTtcbiAgICBpZiAoK2N1cnJlbnRFbGVtZW50LnZhbHVlIDwgK3ZhbHVlKSB7XG4gICAgICBtaW5JbmRleCA9IGN1cnJlbnRJbmRleCArIDE7XG4gICAgfSBlbHNlIGlmICgrY3VycmVudEVsZW1lbnQudmFsdWUgPiArdmFsdWUpIHtcbiAgICAgIG1heEluZGV4ID0gY3VycmVudEluZGV4IC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGN1cnJlbnRJbmRleDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gTWF0aC5hYnMofm1heEluZGV4KTtcbn07XG5cbkJpbmFyeVNlYXJjaEluZGV4LnByb3RvdHlwZS5iZXR3ZWVuID0gZnVuY3Rpb24gYmV0d2VlbiAoc3RhcnQsIGVuZCkge1xuICB2YXIgc3RhcnRJbmRleCA9IHRoaXMuZ2V0SW5kZXgoc3RhcnQpO1xuICB2YXIgZW5kSW5kZXggPSB0aGlzLmdldEluZGV4KGVuZCk7XG5cbiAgaWYgKHN0YXJ0SW5kZXggPT09IDAgJiYgZW5kSW5kZXggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB3aGlsZSAodGhpcy52YWx1ZXNbc3RhcnRJbmRleCAtIDFdICYmIHRoaXMudmFsdWVzW3N0YXJ0SW5kZXggLSAxXS52YWx1ZSA9PT0gc3RhcnQpIHtcbiAgICBzdGFydEluZGV4LS07XG4gIH1cblxuICB3aGlsZSAodGhpcy52YWx1ZXNbZW5kSW5kZXggKyAxXSAmJiB0aGlzLnZhbHVlc1tlbmRJbmRleCArIDFdLnZhbHVlID09PSBlbmQpIHtcbiAgICBlbmRJbmRleCsrO1xuICB9XG5cbiAgaWYgKHRoaXMudmFsdWVzW2VuZEluZGV4XSAmJiB0aGlzLnZhbHVlc1tlbmRJbmRleF0udmFsdWUgPT09IGVuZCAmJiB0aGlzLnZhbHVlc1tlbmRJbmRleCArIDFdKSB7XG4gICAgZW5kSW5kZXgrKztcbiAgfVxuXG4gIHJldHVybiB0aGlzLnZhbHVlcy5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleCk7XG59O1xuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gaW5zZXJ0IChpdGVtKSB7XG4gIHRoaXMudmFsdWVzLnNwbGljZSh0aGlzLmdldEluZGV4KGl0ZW0udmFsdWUpLCAwLCBpdGVtKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUuYnVsa0FkZCA9IGZ1bmN0aW9uIGJ1bGtBZGQgKGl0ZW1zLCBzb3J0KSB7XG4gIHRoaXMudmFsdWVzID0gdGhpcy52YWx1ZXMuY29uY2F0KFtdLmNvbmNhdChpdGVtcyB8fCBbXSkpO1xuXG4gIGlmIChzb3J0KSB7XG4gICAgdGhpcy5zb3J0KCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkJpbmFyeVNlYXJjaEluZGV4LnByb3RvdHlwZS5zb3J0ID0gZnVuY3Rpb24gc29ydCAoKSB7XG4gIHRoaXMudmFsdWVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gK2IudmFsdWUgLSArYS52YWx1ZTtcbiAgfSkucmV2ZXJzZSgpO1xuICB0aGlzLmRpcnR5ID0gZmFsc2U7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQmluYXJ5U2VhcmNoSW5kZXg7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCBmZWF0dXJlTGF5ZXJTZXJ2aWNlIGZyb20gJy4uLy4uL1NlcnZpY2VzL0ZlYXR1cmVMYXllclNlcnZpY2UnO1xuaW1wb3J0IHsgY2xlYW5VcmwsIHdhcm4sIHNldEVzcmlBdHRyaWJ1dGlvbiB9IGZyb20gJy4uLy4uL1V0aWwnO1xuaW1wb3J0IFZpcnR1YWxHcmlkIGZyb20gJ2xlYWZsZXQtdmlydHVhbC1ncmlkJztcbmltcG9ydCBCaW5hcnlTZWFyY2hJbmRleCBmcm9tICd0aW55LWJpbmFyeS1zZWFyY2gnO1xuXG5leHBvcnQgdmFyIEZlYXR1cmVNYW5hZ2VyID0gVmlydHVhbEdyaWQuZXh0ZW5kKHtcbiAgLyoqXG4gICAqIE9wdGlvbnNcbiAgICovXG5cbiAgb3B0aW9uczoge1xuICAgIGF0dHJpYnV0aW9uOiBudWxsLFxuICAgIHdoZXJlOiAnMT0xJyxcbiAgICBmaWVsZHM6IFsnKiddLFxuICAgIGZyb206IGZhbHNlLFxuICAgIHRvOiBmYWxzZSxcbiAgICB0aW1lRmllbGQ6IGZhbHNlLFxuICAgIHRpbWVGaWx0ZXJNb2RlOiAnc2VydmVyJyxcbiAgICBzaW1wbGlmeUZhY3RvcjogMCxcbiAgICBwcmVjaXNpb246IDZcbiAgfSxcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICovXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBWaXJ0dWFsR3JpZC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgb3B0aW9ucy51cmwgPSBjbGVhblVybChvcHRpb25zLnVybCk7XG4gICAgb3B0aW9ucyA9IEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblxuICAgIHRoaXMuc2VydmljZSA9IGZlYXR1cmVMYXllclNlcnZpY2Uob3B0aW9ucyk7XG4gICAgdGhpcy5zZXJ2aWNlLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuXG4gICAgLy8gdXNlIGNhc2UgaW5zZW5zaXRpdmUgcmVnZXggdG8gbG9vayBmb3IgY29tbW9uIGZpZWxkbmFtZXMgdXNlZCBmb3IgaW5kZXhpbmdcbiAgICBpZiAodGhpcy5vcHRpb25zLmZpZWxkc1swXSAhPT0gJyonKSB7XG4gICAgICB2YXIgb2lkQ2hlY2sgPSBmYWxzZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmZpZWxkc1tpXS5tYXRjaCgvXihPQkpFQ1RJRHxGSUR8T0lEfElEKSQvaSkpIHtcbiAgICAgICAgICBvaWRDaGVjayA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChvaWRDaGVjayA9PT0gZmFsc2UpIHtcbiAgICAgICAgd2Fybignbm8ga25vd24gZXNyaUZpZWxkVHlwZU9JRCBmaWVsZCBkZXRlY3RlZCBpbiBmaWVsZHMgQXJyYXkuICBQbGVhc2UgYWRkIGFuIGF0dHJpYnV0ZSBmaWVsZCBjb250YWluaW5nIHVuaXF1ZSBJRHMgdG8gZW5zdXJlIHRoZSBsYXllciBjYW4gYmUgZHJhd24gY29ycmVjdGx5LicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0ICYmIHRoaXMub3B0aW9ucy50aW1lRmllbGQuZW5kKSB7XG4gICAgICB0aGlzLl9zdGFydFRpbWVJbmRleCA9IG5ldyBCaW5hcnlTZWFyY2hJbmRleCgpO1xuICAgICAgdGhpcy5fZW5kVGltZUluZGV4ID0gbmV3IEJpbmFyeVNlYXJjaEluZGV4KCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMudGltZUZpZWxkKSB7XG4gICAgICB0aGlzLl90aW1lSW5kZXggPSBuZXcgQmluYXJ5U2VhcmNoSW5kZXgoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jYWNoZSA9IHt9O1xuICAgIHRoaXMuX2N1cnJlbnRTbmFwc2hvdCA9IFtdOyAvLyBjYWNoZSBvZiB3aGF0IGxheWVycyBzaG91bGQgYmUgYWN0aXZlXG4gICAgdGhpcy5fYWN0aXZlUmVxdWVzdHMgPSAwO1xuICB9LFxuXG4gIC8qKlxuICAgKiBMYXllciBJbnRlcmZhY2VcbiAgICovXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICAvLyBpbmNsdWRlICdQb3dlcmVkIGJ5IEVzcmknIGluIG1hcCBhdHRyaWJ1dGlvblxuICAgIHNldEVzcmlBdHRyaWJ1dGlvbihtYXApO1xuXG4gICAgdGhpcy5zZXJ2aWNlLm1ldGFkYXRhKGZ1bmN0aW9uIChlcnIsIG1ldGFkYXRhKSB7XG4gICAgICBpZiAoIWVycikge1xuICAgICAgICB2YXIgc3VwcG9ydGVkRm9ybWF0cyA9IG1ldGFkYXRhLnN1cHBvcnRlZFF1ZXJ5Rm9ybWF0cztcbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIHdoZXRoZXIgc2VydmljZSBjYW4gZW1pdCBHZW9KU09OIG5hdGl2ZWx5XG4gICAgICAgIGlmIChzdXBwb3J0ZWRGb3JtYXRzICYmIHN1cHBvcnRlZEZvcm1hdHMuaW5kZXhPZignZ2VvSlNPTicpICE9PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2VydmljZS5vcHRpb25zLmlzTW9kZXJuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhZGQgY29weXJpZ2h0IHRleHQgbGlzdGVkIGluIHNlcnZpY2UgbWV0YWRhdGFcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYXR0cmlidXRpb24gJiYgbWFwLmF0dHJpYnV0aW9uQ29udHJvbCAmJiBtZXRhZGF0YS5jb3B5cmlnaHRUZXh0KSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uID0gbWV0YWRhdGEuY29weXJpZ2h0VGV4dDtcbiAgICAgICAgICBtYXAuYXR0cmlidXRpb25Db250cm9sLmFkZEF0dHJpYnV0aW9uKHRoaXMuZ2V0QXR0cmlidXRpb24oKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcblxuICAgIG1hcC5vbignem9vbWVuZCcsIHRoaXMuX2hhbmRsZVpvb21DaGFuZ2UsIHRoaXMpO1xuXG4gICAgcmV0dXJuIFZpcnR1YWxHcmlkLnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBtYXAub2ZmKCd6b29tZW5kJywgdGhpcy5faGFuZGxlWm9vbUNoYW5nZSwgdGhpcyk7XG5cbiAgICByZXR1cm4gVmlydHVhbEdyaWQucHJvdG90eXBlLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcbiAgfSxcblxuICBnZXRBdHRyaWJ1dGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYXR0cmlidXRpb247XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZlYXR1cmUgTWFuYWdlbWVudFxuICAgKi9cblxuICBjcmVhdGVDZWxsOiBmdW5jdGlvbiAoYm91bmRzLCBjb29yZHMpIHtcbiAgICB0aGlzLl9yZXF1ZXN0RmVhdHVyZXMoYm91bmRzLCBjb29yZHMpO1xuICB9LFxuXG4gIF9yZXF1ZXN0RmVhdHVyZXM6IGZ1bmN0aW9uIChib3VuZHMsIGNvb3JkcywgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9hY3RpdmVSZXF1ZXN0cysrO1xuXG4gICAgLy8gb3VyIGZpcnN0IGFjdGl2ZSByZXF1ZXN0IGZpcmVzIGxvYWRpbmdcbiAgICBpZiAodGhpcy5fYWN0aXZlUmVxdWVzdHMgPT09IDEpIHtcbiAgICAgIHRoaXMuZmlyZSgnbG9hZGluZycsIHtcbiAgICAgICAgYm91bmRzOiBib3VuZHNcbiAgICAgIH0sIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9idWlsZFF1ZXJ5KGJvdW5kcykucnVuKGZ1bmN0aW9uIChlcnJvciwgZmVhdHVyZUNvbGxlY3Rpb24sIHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZXhjZWVkZWRUcmFuc2ZlckxpbWl0KSB7XG4gICAgICAgIHRoaXMuZmlyZSgnZHJhd2xpbWl0ZXhjZWVkZWQnKTtcbiAgICAgIH1cblxuICAgICAgLy8gbm8gZXJyb3IsIGZlYXR1cmVzXG4gICAgICBpZiAoIWVycm9yICYmIGZlYXR1cmVDb2xsZWN0aW9uICYmIGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICAvLyBzY2hlZHVsZSBhZGRpbmcgZmVhdHVyZXMgdW50aWwgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXG4gICAgICAgIEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKEwuVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLl9hZGRGZWF0dXJlcyhmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcywgY29vcmRzKTtcbiAgICAgICAgICB0aGlzLl9wb3N0UHJvY2Vzc0ZlYXR1cmVzKGJvdW5kcyk7XG4gICAgICAgIH0sIHRoaXMpKTtcbiAgICAgIH1cblxuICAgICAgLy8gbm8gZXJyb3IsIG5vIGZlYXR1cmVzXG4gICAgICBpZiAoIWVycm9yICYmIGZlYXR1cmVDb2xsZWN0aW9uICYmICFmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5fcG9zdFByb2Nlc3NGZWF0dXJlcyhib3VuZHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5fcG9zdFByb2Nlc3NGZWF0dXJlcyhib3VuZHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBlcnJvciwgZmVhdHVyZUNvbGxlY3Rpb24pO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIF9wb3N0UHJvY2Vzc0ZlYXR1cmVzOiBmdW5jdGlvbiAoYm91bmRzKSB7XG4gICAgLy8gZGVpbmNyaW1lbnQgdGhlIHJlcXVlc3QgY291bnRlciBub3cgdGhhdCB3ZSBoYXZlIHByb2Nlc3NlZCBmZWF0dXJlc1xuICAgIHRoaXMuX2FjdGl2ZVJlcXVlc3RzLS07XG5cbiAgICAvLyBpZiB0aGVyZSBhcmUgbm8gbW9yZSBhY3RpdmUgcmVxdWVzdHMgZmlyZSBhIGxvYWQgZXZlbnQgZm9yIHRoaXMgdmlld1xuICAgIGlmICh0aGlzLl9hY3RpdmVSZXF1ZXN0cyA8PSAwKSB7XG4gICAgICB0aGlzLmZpcmUoJ2xvYWQnLCB7XG4gICAgICAgIGJvdW5kczogYm91bmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX2NhY2hlS2V5OiBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgcmV0dXJuIGNvb3Jkcy56ICsgJzonICsgY29vcmRzLnggKyAnOicgKyBjb29yZHMueTtcbiAgfSxcblxuICBfYWRkRmVhdHVyZXM6IGZ1bmN0aW9uIChmZWF0dXJlcywgY29vcmRzKSB7XG4gICAgdmFyIGtleSA9IHRoaXMuX2NhY2hlS2V5KGNvb3Jkcyk7XG4gICAgdGhpcy5fY2FjaGVba2V5XSA9IHRoaXMuX2NhY2hlW2tleV0gfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gZmVhdHVyZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBpZCA9IGZlYXR1cmVzW2ldLmlkO1xuICAgICAgdGhpcy5fY3VycmVudFNuYXBzaG90LnB1c2goaWQpO1xuICAgICAgdGhpcy5fY2FjaGVba2V5XS5wdXNoKGlkKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWVsZCkge1xuICAgICAgdGhpcy5fYnVpbGRUaW1lSW5kZXhlcyhmZWF0dXJlcyk7XG4gICAgfVxuXG4gICAgLy8gbmVlZCB0byBQUiByZW1vdmFsIG9mIHRoZSBsb2dpYyBiZWxvdyB0b28uLi5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcGF0cmlja2FybHQvbGVhZmxldC12aXJ0dWFsLWdyaWQvYmxvYi9tYXN0ZXIvc3JjL3ZpcnR1YWwtZ3JpZC5qcyNMMTAwLUwxMDJcblxuICAgIHRoaXMuY3JlYXRlTGF5ZXJzKGZlYXR1cmVzKTtcbiAgfSxcblxuICBfYnVpbGRRdWVyeTogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIHZhciBxdWVyeSA9IHRoaXMuc2VydmljZS5xdWVyeSgpXG4gICAgICAuaW50ZXJzZWN0cyhib3VuZHMpXG4gICAgICAud2hlcmUodGhpcy5vcHRpb25zLndoZXJlKVxuICAgICAgLmZpZWxkcyh0aGlzLm9wdGlvbnMuZmllbGRzKVxuICAgICAgLnByZWNpc2lvbih0aGlzLm9wdGlvbnMucHJlY2lzaW9uKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2ltcGxpZnlGYWN0b3IpIHtcbiAgICAgIHF1ZXJ5LnNpbXBsaWZ5KHRoaXMuX21hcCwgdGhpcy5vcHRpb25zLnNpbXBsaWZ5RmFjdG9yKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWx0ZXJNb2RlID09PSAnc2VydmVyJyAmJiB0aGlzLm9wdGlvbnMuZnJvbSAmJiB0aGlzLm9wdGlvbnMudG8pIHtcbiAgICAgIHF1ZXJ5LmJldHdlZW4odGhpcy5vcHRpb25zLmZyb20sIHRoaXMub3B0aW9ucy50byk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9LFxuXG4gIC8qKlxuICAgKiBXaGVyZSBNZXRob2RzXG4gICAqL1xuXG4gIHNldFdoZXJlOiBmdW5jdGlvbiAod2hlcmUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5vcHRpb25zLndoZXJlID0gKHdoZXJlICYmIHdoZXJlLmxlbmd0aCkgPyB3aGVyZSA6ICcxPTEnO1xuXG4gICAgdmFyIG9sZFNuYXBzaG90ID0gW107XG4gICAgdmFyIG5ld1NuYXBzaG90ID0gW107XG4gICAgdmFyIHBlbmRpbmdSZXF1ZXN0cyA9IDA7XG4gICAgdmFyIHJlcXVlc3RFcnJvciA9IG51bGw7XG4gICAgdmFyIHJlcXVlc3RDYWxsYmFjayA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgZmVhdHVyZUNvbGxlY3Rpb24pIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXF1ZXN0RXJyb3IgPSBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZlYXR1cmVDb2xsZWN0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIG5ld1NuYXBzaG90LnB1c2goZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXNbaV0uaWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHBlbmRpbmdSZXF1ZXN0cy0tO1xuXG4gICAgICBpZiAocGVuZGluZ1JlcXVlc3RzIDw9IDApIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFNuYXBzaG90ID0gbmV3U25hcHNob3Q7XG4gICAgICAgIC8vIHNjaGVkdWxlIGFkZGluZyBmZWF0dXJlcyBmb3IgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXG4gICAgICAgIEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKEwuVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxheWVycyhvbGRTbmFwc2hvdCk7XG4gICAgICAgICAgdGhpcy5hZGRMYXllcnMobmV3U25hcHNob3QpO1xuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCByZXF1ZXN0RXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcykpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgZm9yICh2YXIgaSA9IHRoaXMuX2N1cnJlbnRTbmFwc2hvdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgb2xkU25hcHNob3QucHVzaCh0aGlzLl9jdXJyZW50U25hcHNob3RbaV0pO1xuICAgIH1cblxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9hY3RpdmVDZWxscykge1xuICAgICAgcGVuZGluZ1JlcXVlc3RzKys7XG4gICAgICB2YXIgY29vcmRzID0gdGhpcy5fa2V5VG9DZWxsQ29vcmRzKGtleSk7XG4gICAgICB2YXIgYm91bmRzID0gdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3Jkcyk7XG4gICAgICB0aGlzLl9yZXF1ZXN0RmVhdHVyZXMoYm91bmRzLCBrZXksIHJlcXVlc3RDYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0V2hlcmU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLndoZXJlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBUaW1lIFJhbmdlIE1ldGhvZHNcbiAgICovXG5cbiAgZ2V0VGltZVJhbmdlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFt0aGlzLm9wdGlvbnMuZnJvbSwgdGhpcy5vcHRpb25zLnRvXTtcbiAgfSxcblxuICBzZXRUaW1lUmFuZ2U6IGZ1bmN0aW9uIChmcm9tLCB0bywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgb2xkRnJvbSA9IHRoaXMub3B0aW9ucy5mcm9tO1xuICAgIHZhciBvbGRUbyA9IHRoaXMub3B0aW9ucy50bztcbiAgICB2YXIgcGVuZGluZ1JlcXVlc3RzID0gMDtcbiAgICB2YXIgcmVxdWVzdEVycm9yID0gbnVsbDtcbiAgICB2YXIgcmVxdWVzdENhbGxiYWNrID0gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVxdWVzdEVycm9yID0gZXJyb3I7XG4gICAgICB9XG4gICAgICB0aGlzLl9maWx0ZXJFeGlzdGluZ0ZlYXR1cmVzKG9sZEZyb20sIG9sZFRvLCBmcm9tLCB0byk7XG5cbiAgICAgIHBlbmRpbmdSZXF1ZXN0cy0tO1xuXG4gICAgICBpZiAoY2FsbGJhY2sgJiYgcGVuZGluZ1JlcXVlc3RzIDw9IDApIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCByZXF1ZXN0RXJyb3IpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgdGhpcy5vcHRpb25zLmZyb20gPSBmcm9tO1xuICAgIHRoaXMub3B0aW9ucy50byA9IHRvO1xuXG4gICAgdGhpcy5fZmlsdGVyRXhpc3RpbmdGZWF0dXJlcyhvbGRGcm9tLCBvbGRUbywgZnJvbSwgdG8pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmlsdGVyTW9kZSA9PT0gJ3NlcnZlcicpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9hY3RpdmVDZWxscykge1xuICAgICAgICBwZW5kaW5nUmVxdWVzdHMrKztcbiAgICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuX2tleVRvQ2VsbENvb3JkcyhrZXkpO1xuICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3Jkcyk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RGZWF0dXJlcyhib3VuZHMsIGtleSwgcmVxdWVzdENhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2FjdGl2ZUNlbGxzKSB7XG4gICAgICB2YXIgY29vcmRzID0gdGhpcy5fa2V5VG9DZWxsQ29vcmRzKGtleSk7XG4gICAgICB2YXIgYm91bmRzID0gdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3Jkcyk7XG4gICAgICB0aGlzLl9yZXF1ZXN0RmVhdHVyZXMoYm91bmRzLCBrZXkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlZHJhdykge1xuICAgICAgdGhpcy5vbmNlKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgIHRoaXMuX3JlZHJhdyhsYXllci5mZWF0dXJlLmlkKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gIH0sXG5cbiAgX2ZpbHRlckV4aXN0aW5nRmVhdHVyZXM6IGZ1bmN0aW9uIChvbGRGcm9tLCBvbGRUbywgbmV3RnJvbSwgbmV3VG8pIHtcbiAgICB2YXIgbGF5ZXJzVG9SZW1vdmUgPSAob2xkRnJvbSAmJiBvbGRUbykgPyB0aGlzLl9nZXRGZWF0dXJlc0luVGltZVJhbmdlKG9sZEZyb20sIG9sZFRvKSA6IHRoaXMuX2N1cnJlbnRTbmFwc2hvdDtcbiAgICB2YXIgbGF5ZXJzVG9BZGQgPSB0aGlzLl9nZXRGZWF0dXJlc0luVGltZVJhbmdlKG5ld0Zyb20sIG5ld1RvKTtcblxuICAgIGlmIChsYXllcnNUb0FkZC5pbmRleE9mKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxheWVyc1RvQWRkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzaG91bGRSZW1vdmVMYXllciA9IGxheWVyc1RvUmVtb3ZlLmluZGV4T2YobGF5ZXJzVG9BZGRbaV0pO1xuICAgICAgICBpZiAoc2hvdWxkUmVtb3ZlTGF5ZXIgPj0gMCkge1xuICAgICAgICAgIGxheWVyc1RvUmVtb3ZlLnNwbGljZShzaG91bGRSZW1vdmVMYXllciwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzY2hlZHVsZSBhZGRpbmcgZmVhdHVyZXMgdW50aWwgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXG4gICAgTC5VdGlsLnJlcXVlc3RBbmltRnJhbWUoTC5VdGlsLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZW1vdmVMYXllcnMobGF5ZXJzVG9SZW1vdmUpO1xuICAgICAgdGhpcy5hZGRMYXllcnMobGF5ZXJzVG9BZGQpO1xuICAgIH0sIHRoaXMpKTtcbiAgfSxcblxuICBfZ2V0RmVhdHVyZXNJblRpbWVSYW5nZTogZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgaWRzID0gW107XG4gICAgdmFyIHNlYXJjaDtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0ICYmIHRoaXMub3B0aW9ucy50aW1lRmllbGQuZW5kKSB7XG4gICAgICB2YXIgc3RhcnRUaW1lcyA9IHRoaXMuX3N0YXJ0VGltZUluZGV4LmJldHdlZW4oc3RhcnQsIGVuZCk7XG4gICAgICB2YXIgZW5kVGltZXMgPSB0aGlzLl9lbmRUaW1lSW5kZXguYmV0d2VlbihzdGFydCwgZW5kKTtcbiAgICAgIHNlYXJjaCA9IHN0YXJ0VGltZXMuY29uY2F0KGVuZFRpbWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VhcmNoID0gdGhpcy5fdGltZUluZGV4LmJldHdlZW4oc3RhcnQsIGVuZCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IHNlYXJjaC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgaWRzLnB1c2goc2VhcmNoW2ldLmlkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaWRzO1xuICB9LFxuXG4gIF9idWlsZFRpbWVJbmRleGVzOiBmdW5jdGlvbiAoZ2VvanNvbikge1xuICAgIHZhciBpO1xuICAgIHZhciBmZWF0dXJlO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0ICYmIHRoaXMub3B0aW9ucy50aW1lRmllbGQuZW5kKSB7XG4gICAgICB2YXIgc3RhcnRUaW1lRW50cmllcyA9IFtdO1xuICAgICAgdmFyIGVuZFRpbWVFbnRyaWVzID0gW107XG4gICAgICBmb3IgKGkgPSBnZW9qc29uLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGZlYXR1cmUgPSBnZW9qc29uW2ldO1xuICAgICAgICBzdGFydFRpbWVFbnRyaWVzLnB1c2goe1xuICAgICAgICAgIGlkOiBmZWF0dXJlLmlkLFxuICAgICAgICAgIHZhbHVlOiBuZXcgRGF0ZShmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5zdGFydF0pXG4gICAgICAgIH0pO1xuICAgICAgICBlbmRUaW1lRW50cmllcy5wdXNoKHtcbiAgICAgICAgICBpZDogZmVhdHVyZS5pZCxcbiAgICAgICAgICB2YWx1ZTogbmV3IERhdGUoZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy50aW1lRmllbGQuZW5kXSlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9zdGFydFRpbWVJbmRleC5idWxrQWRkKHN0YXJ0VGltZUVudHJpZXMpO1xuICAgICAgdGhpcy5fZW5kVGltZUluZGV4LmJ1bGtBZGQoZW5kVGltZUVudHJpZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdGltZUVudHJpZXMgPSBbXTtcbiAgICAgIGZvciAoaSA9IGdlb2pzb24ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgZmVhdHVyZSA9IGdlb2pzb25baV07XG4gICAgICAgIHRpbWVFbnRyaWVzLnB1c2goe1xuICAgICAgICAgIGlkOiBmZWF0dXJlLmlkLFxuICAgICAgICAgIHZhbHVlOiBuZXcgRGF0ZShmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnRpbWVGaWVsZF0pXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl90aW1lSW5kZXguYnVsa0FkZCh0aW1lRW50cmllcyk7XG4gICAgfVxuICB9LFxuXG4gIF9mZWF0dXJlV2l0aGluVGltZVJhbmdlOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIGlmICghdGhpcy5vcHRpb25zLmZyb20gfHwgIXRoaXMub3B0aW9ucy50bykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGZyb20gPSArdGhpcy5vcHRpb25zLmZyb20udmFsdWVPZigpO1xuICAgIHZhciB0byA9ICt0aGlzLm9wdGlvbnMudG8udmFsdWVPZigpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMudGltZUZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIGRhdGUgPSArZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy50aW1lRmllbGRdO1xuICAgICAgcmV0dXJuIChkYXRlID49IGZyb20pICYmIChkYXRlIDw9IHRvKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWVsZC5zdGFydCAmJiB0aGlzLm9wdGlvbnMudGltZUZpZWxkLmVuZCkge1xuICAgICAgdmFyIHN0YXJ0RGF0ZSA9ICtmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5zdGFydF07XG4gICAgICB2YXIgZW5kRGF0ZSA9ICtmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmRdO1xuICAgICAgcmV0dXJuICgoc3RhcnREYXRlID49IGZyb20pICYmIChzdGFydERhdGUgPD0gdG8pKSB8fCAoKGVuZERhdGUgPj0gZnJvbSkgJiYgKGVuZERhdGUgPD0gdG8pKTtcbiAgICB9XG4gIH0sXG5cbiAgX3Zpc2libGVab29tOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gY2hlY2sgdG8gc2VlIHdoZXRoZXIgdGhlIGN1cnJlbnQgem9vbSBsZXZlbCBvZiB0aGUgbWFwIGlzIHdpdGhpbiB0aGUgb3B0aW9uYWwgbGltaXQgZGVmaW5lZCBmb3IgdGhlIEZlYXR1cmVMYXllclxuICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB6b29tID0gdGhpcy5fbWFwLmdldFpvb20oKTtcbiAgICBpZiAoem9vbSA+IHRoaXMub3B0aW9ucy5tYXhab29tIHx8IHpvb20gPCB0aGlzLm9wdGlvbnMubWluWm9vbSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7IHJldHVybiB0cnVlOyB9XG4gIH0sXG5cbiAgX2hhbmRsZVpvb21DaGFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX3Zpc2libGVab29tKCkpIHtcbiAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKHRoaXMuX2N1cnJlbnRTbmFwc2hvdCk7XG4gICAgICB0aGlzLl9jdXJyZW50U25hcHNob3QgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLypcbiAgICAgIGZvciBldmVyeSBjZWxsIGluIHRoaXMuX2FjdGl2ZUNlbGxzXG4gICAgICAgIDEuIEdldCB0aGUgY2FjaGUga2V5IGZvciB0aGUgY29vcmRzIG9mIHRoZSBjZWxsXG4gICAgICAgIDIuIElmIHRoaXMuX2NhY2hlW2tleV0gZXhpc3RzIGl0IHdpbGwgYmUgYW4gYXJyYXkgb2YgZmVhdHVyZSBJRHMuXG4gICAgICAgIDMuIENhbGwgdGhpcy5hZGRMYXllcnModGhpcy5fY2FjaGVba2V5XSkgdG8gaW5zdHJ1Y3QgdGhlIGZlYXR1cmUgbGF5ZXIgdG8gYWRkIHRoZSBsYXllcnMgYmFjay5cbiAgICAgICovXG4gICAgICBmb3IgKHZhciBpIGluIHRoaXMuX2FjdGl2ZUNlbGxzKSB7XG4gICAgICAgIHZhciBjb29yZHMgPSB0aGlzLl9hY3RpdmVDZWxsc1tpXS5jb29yZHM7XG4gICAgICAgIHZhciBrZXkgPSB0aGlzLl9jYWNoZUtleShjb29yZHMpO1xuICAgICAgICBpZiAodGhpcy5fY2FjaGVba2V5XSkge1xuICAgICAgICAgIHRoaXMuYWRkTGF5ZXJzKHRoaXMuX2NhY2hlW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBTZXJ2aWNlIE1ldGhvZHNcbiAgICovXG5cbiAgYXV0aGVudGljYXRlOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0aGlzLnNlcnZpY2UuYXV0aGVudGljYXRlKHRva2VuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBtZXRhZGF0YTogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5zZXJ2aWNlLm1ldGFkYXRhKGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UucXVlcnkoKTtcbiAgfSxcblxuICBfZ2V0TWV0YWRhdGE6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIGlmICh0aGlzLl9tZXRhZGF0YSkge1xuICAgICAgdmFyIGVycm9yO1xuICAgICAgY2FsbGJhY2soZXJyb3IsIHRoaXMuX21ldGFkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZXRhZGF0YShMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhID0gcmVzcG9uc2U7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCB0aGlzLl9tZXRhZGF0YSk7XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfVxuICB9LFxuXG4gIGFkZEZlYXR1cmU6IGZ1bmN0aW9uIChmZWF0dXJlLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuX2dldE1ldGFkYXRhKEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgbWV0YWRhdGEpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBpZiAoY2FsbGJhY2spIHsgY2FsbGJhY2suY2FsbCh0aGlzLCBlcnJvciwgbnVsbCk7IH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNlcnZpY2UuYWRkRmVhdHVyZShmZWF0dXJlLCBMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAvLyBhc3NpZ24gSUQgZnJvbSByZXN1bHQgdG8gYXBwcm9wcmlhdGUgb2JqZWN0aWQgZmllbGQgZnJvbSBzZXJ2aWNlIG1ldGFkYXRhXG4gICAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzW21ldGFkYXRhLm9iamVjdElkRmllbGRdID0gcmVzcG9uc2Uub2JqZWN0SWQ7XG5cbiAgICAgICAgICAvLyB3ZSBhbHNvIG5lZWQgdG8gdXBkYXRlIHRoZSBnZW9qc29uIGlkIGZvciBjcmVhdGVMYXllcnMoKSB0byBmdW5jdGlvblxuICAgICAgICAgIGZlYXR1cmUuaWQgPSByZXNwb25zZS5vYmplY3RJZDtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUxheWVycyhbZmVhdHVyZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfSwgdGhpcykpO1xuICB9LFxuXG4gIHVwZGF0ZUZlYXR1cmU6IGZ1bmN0aW9uIChmZWF0dXJlLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuc2VydmljZS51cGRhdGVGZWF0dXJlKGZlYXR1cmUsIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMYXllcnMoW2ZlYXR1cmUuaWRdLCB0cnVlKTtcbiAgICAgICAgdGhpcy5jcmVhdGVMYXllcnMoW2ZlYXR1cmVdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBkZWxldGVGZWF0dXJlOiBmdW5jdGlvbiAoaWQsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5zZXJ2aWNlLmRlbGV0ZUZlYXR1cmUoaWQsIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGlmICghZXJyb3IgJiYgcmVzcG9uc2Uub2JqZWN0SWQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMYXllcnMoW3Jlc3BvbnNlLm9iamVjdElkXSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIGRlbGV0ZUZlYXR1cmVzOiBmdW5jdGlvbiAoaWRzLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZGVsZXRlRmVhdHVyZXMoaWRzLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKFtyZXNwb25zZVtpXS5vYmplY3RJZF0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9XG59KTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgRmVhdHVyZU1hbmFnZXIgfSBmcm9tICcuL0ZlYXR1cmVNYW5hZ2VyJztcblxuZXhwb3J0IHZhciBGZWF0dXJlTGF5ZXIgPSBGZWF0dXJlTWFuYWdlci5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBjYWNoZUxheWVyczogdHJ1ZVxuICB9LFxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKi9cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBGZWF0dXJlTWFuYWdlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX29yaWdpbmFsU3R5bGUgPSB0aGlzLm9wdGlvbnMuc3R5bGU7XG4gICAgdGhpcy5fbGF5ZXJzID0ge307XG4gIH0sXG5cbiAgLyoqXG4gICAqIExheWVyIEludGVyZmFjZVxuICAgKi9cblxuICBvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5fbGF5ZXJzKSB7XG4gICAgICBtYXAucmVtb3ZlTGF5ZXIodGhpcy5fbGF5ZXJzW2ldKTtcbiAgICAgIC8vIHRyaWdnZXIgdGhlIGV2ZW50IHdoZW4gdGhlIGVudGlyZSBmZWF0dXJlTGF5ZXIgaXMgcmVtb3ZlZCBmcm9tIHRoZSBtYXBcbiAgICAgIHRoaXMuZmlyZSgncmVtb3ZlZmVhdHVyZScsIHtcbiAgICAgICAgZmVhdHVyZTogdGhpcy5fbGF5ZXJzW2ldLmZlYXR1cmUsXG4gICAgICAgIHBlcm1hbmVudDogZmFsc2VcbiAgICAgIH0sIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiBGZWF0dXJlTWFuYWdlci5wcm90b3R5cGUub25SZW1vdmUuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIGNyZWF0ZU5ld0xheWVyOiBmdW5jdGlvbiAoZ2VvanNvbikge1xuICAgIHZhciBsYXllciA9IEwuR2VvSlNPTi5nZW9tZXRyeVRvTGF5ZXIoZ2VvanNvbiwgdGhpcy5vcHRpb25zKTtcbiAgICBsYXllci5kZWZhdWx0T3B0aW9ucyA9IGxheWVyLm9wdGlvbnM7XG4gICAgcmV0dXJuIGxheWVyO1xuICB9LFxuXG4gIF91cGRhdGVMYXllcjogZnVuY3Rpb24gKGxheWVyLCBnZW9qc29uKSB7XG4gICAgLy8gY29udmVydCB0aGUgZ2VvanNvbiBjb29yZGluYXRlcyBpbnRvIGEgTGVhZmxldCBMYXRMbmcgYXJyYXkvbmVzdGVkIGFycmF5c1xuICAgIC8vIHBhc3MgaXQgdG8gc2V0TGF0TG5ncyB0byB1cGRhdGUgbGF5ZXIgZ2VvbWV0cmllc1xuICAgIHZhciBsYXRsbmdzID0gW107XG4gICAgdmFyIGNvb3Jkc1RvTGF0TG5nID0gdGhpcy5vcHRpb25zLmNvb3Jkc1RvTGF0TG5nIHx8IEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZztcblxuICAgIC8vIGNvcHkgbmV3IGF0dHJpYnV0ZXMsIGlmIHByZXNlbnRcbiAgICBpZiAoZ2VvanNvbi5wcm9wZXJ0aWVzKSB7XG4gICAgICBsYXllci5mZWF0dXJlLnByb3BlcnRpZXMgPSBnZW9qc29uLnByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgc3dpdGNoIChnZW9qc29uLmdlb21ldHJ5LnR5cGUpIHtcbiAgICAgIGNhc2UgJ1BvaW50JzpcbiAgICAgICAgbGF0bG5ncyA9IEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzKTtcbiAgICAgICAgbGF5ZXIuc2V0TGF0TG5nKGxhdGxuZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxuICAgICAgICBsYXRsbmdzID0gTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCAwLCBjb29yZHNUb0xhdExuZyk7XG4gICAgICAgIGxheWVyLnNldExhdExuZ3MobGF0bG5ncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcbiAgICAgICAgbGF0bG5ncyA9IEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcywgMSwgY29vcmRzVG9MYXRMbmcpO1xuICAgICAgICBsYXllci5zZXRMYXRMbmdzKGxhdGxuZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1BvbHlnb24nOlxuICAgICAgICBsYXRsbmdzID0gTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCAxLCBjb29yZHNUb0xhdExuZyk7XG4gICAgICAgIGxheWVyLnNldExhdExuZ3MobGF0bG5ncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTXVsdGlQb2x5Z29uJzpcbiAgICAgICAgbGF0bG5ncyA9IEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcywgMiwgY29vcmRzVG9MYXRMbmcpO1xuICAgICAgICBsYXllci5zZXRMYXRMbmdzKGxhdGxuZ3MpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZlYXR1cmUgTWFuYWdlbWVudCBNZXRob2RzXG4gICAqL1xuXG4gIGNyZWF0ZUxheWVyczogZnVuY3Rpb24gKGZlYXR1cmVzKSB7XG4gICAgZm9yICh2YXIgaSA9IGZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZ2VvanNvbiA9IGZlYXR1cmVzW2ldO1xuXG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbZ2VvanNvbi5pZF07XG4gICAgICB2YXIgbmV3TGF5ZXI7XG5cbiAgICAgIGlmICh0aGlzLl92aXNpYmxlWm9vbSgpICYmIGxheWVyICYmICF0aGlzLl9tYXAuaGFzTGF5ZXIobGF5ZXIpKSB7XG4gICAgICAgIHRoaXMuX21hcC5hZGRMYXllcihsYXllcik7XG4gICAgICAgIHRoaXMuZmlyZSgnYWRkZmVhdHVyZScsIHtcbiAgICAgICAgICBmZWF0dXJlOiBsYXllci5mZWF0dXJlXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgZ2VvbWV0cnkgaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAobGF5ZXIgJiYgdGhpcy5vcHRpb25zLnNpbXBsaWZ5RmFjdG9yID4gMCAmJiAobGF5ZXIuc2V0TGF0TG5ncyB8fCBsYXllci5zZXRMYXRMbmcpKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxheWVyKGxheWVyLCBnZW9qc29uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFsYXllcikge1xuICAgICAgICBuZXdMYXllciA9IHRoaXMuY3JlYXRlTmV3TGF5ZXIoZ2VvanNvbik7XG4gICAgICAgIG5ld0xheWVyLmZlYXR1cmUgPSBnZW9qc29uO1xuXG4gICAgICAgIC8vIGJ1YmJsZSBldmVudHMgZnJvbSBpbmRpdmlkdWFsIGxheWVycyB0byB0aGUgZmVhdHVyZSBsYXllclxuICAgICAgICBuZXdMYXllci5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm9uRWFjaEZlYXR1cmUpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMub25FYWNoRmVhdHVyZShuZXdMYXllci5mZWF0dXJlLCBuZXdMYXllcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWNoZSB0aGUgbGF5ZXJcbiAgICAgICAgdGhpcy5fbGF5ZXJzW25ld0xheWVyLmZlYXR1cmUuaWRdID0gbmV3TGF5ZXI7XG5cbiAgICAgICAgLy8gc3R5bGUgdGhlIGxheWVyXG4gICAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKG5ld0xheWVyLmZlYXR1cmUuaWQsIHRoaXMub3B0aW9ucy5zdHlsZSk7XG5cbiAgICAgICAgdGhpcy5maXJlKCdjcmVhdGVmZWF0dXJlJywge1xuICAgICAgICAgIGZlYXR1cmU6IG5ld0xheWVyLmZlYXR1cmVcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBsYXllciBpZiB0aGUgY3VycmVudCB6b29tIGxldmVsIGlzIGluc2lkZSB0aGUgcmFuZ2UgZGVmaW5lZCBmb3IgdGhlIGxheWVyLCBpdCBpcyB3aXRoaW4gdGhlIGN1cnJlbnQgdGltZSBib3VuZHMgb3Igb3VyIGxheWVyIGlzIG5vdCB0aW1lIGVuYWJsZWRcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGVab29tKCkgJiYgKCF0aGlzLm9wdGlvbnMudGltZUZpZWxkIHx8ICh0aGlzLm9wdGlvbnMudGltZUZpZWxkICYmIHRoaXMuX2ZlYXR1cmVXaXRoaW5UaW1lUmFuZ2UoZ2VvanNvbikpKSkge1xuICAgICAgICAgIHRoaXMuZmlyZSgnYWRkZmVhdHVyZScsIHtcbiAgICAgICAgICAgIGZlYXR1cmU6IG5ld0xheWVyLmZlYXR1cmVcbiAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICB0aGlzLl9tYXAuYWRkTGF5ZXIobmV3TGF5ZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGFkZExheWVyczogZnVuY3Rpb24gKGlkcykge1xuICAgIGZvciAodmFyIGkgPSBpZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZHNbaV1dO1xuICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgIHRoaXMuZmlyZSgnYWRkZmVhdHVyZScsIHtcbiAgICAgICAgICBmZWF0dXJlOiBsYXllci5mZWF0dXJlXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgICB0aGlzLl9tYXAuYWRkTGF5ZXIobGF5ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZW1vdmVMYXllcnM6IGZ1bmN0aW9uIChpZHMsIHBlcm1hbmVudCkge1xuICAgIGZvciAodmFyIGkgPSBpZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBpZCA9IGlkc1tpXTtcbiAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgdGhpcy5maXJlKCdyZW1vdmVmZWF0dXJlJywge1xuICAgICAgICAgIGZlYXR1cmU6IGxheWVyLmZlYXR1cmUsXG4gICAgICAgICAgcGVybWFuZW50OiBwZXJtYW5lbnRcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcihsYXllcik7XG4gICAgICB9XG4gICAgICBpZiAobGF5ZXIgJiYgcGVybWFuZW50KSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBjZWxsRW50ZXI6IGZ1bmN0aW9uIChib3VuZHMsIGNvb3Jkcykge1xuICAgIGlmICghdGhpcy5fem9vbWluZyAmJiB0aGlzLl9tYXApIHtcbiAgICAgIEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKEwuVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhY2hlS2V5ID0gdGhpcy5fY2FjaGVLZXkoY29vcmRzKTtcbiAgICAgICAgdmFyIGNlbGxLZXkgPSB0aGlzLl9jZWxsQ29vcmRzVG9LZXkoY29vcmRzKTtcbiAgICAgICAgdmFyIGxheWVycyA9IHRoaXMuX2NhY2hlW2NhY2hlS2V5XTtcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZUNlbGxzW2NlbGxLZXldICYmIGxheWVycykge1xuICAgICAgICAgIHRoaXMuYWRkTGF5ZXJzKGxheWVycyk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKTtcbiAgICB9XG4gIH0sXG5cbiAgY2VsbExlYXZlOiBmdW5jdGlvbiAoYm91bmRzLCBjb29yZHMpIHtcbiAgICBpZiAoIXRoaXMuX3pvb21pbmcpIHtcbiAgICAgIEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKEwuVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX21hcCkge1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IHRoaXMuX2NhY2hlS2V5KGNvb3Jkcyk7XG4gICAgICAgICAgdmFyIGNlbGxLZXkgPSB0aGlzLl9jZWxsQ29vcmRzVG9LZXkoY29vcmRzKTtcbiAgICAgICAgICB2YXIgbGF5ZXJzID0gdGhpcy5fY2FjaGVbY2FjaGVLZXldO1xuICAgICAgICAgIHZhciBtYXBCb3VuZHMgPSB0aGlzLl9tYXAuZ2V0Qm91bmRzKCk7XG4gICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmVDZWxsc1tjZWxsS2V5XSAmJiBsYXllcnMpIHtcbiAgICAgICAgICAgIHZhciByZW1vdmFibGUgPSB0cnVlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbbGF5ZXJzW2ldXTtcbiAgICAgICAgICAgICAgaWYgKGxheWVyICYmIGxheWVyLmdldEJvdW5kcyAmJiBtYXBCb3VuZHMuaW50ZXJzZWN0cyhsYXllci5nZXRCb3VuZHMoKSkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVtb3ZhYmxlKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKGxheWVycywgIXRoaXMub3B0aW9ucy5jYWNoZUxheWVycyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLmNhY2hlTGF5ZXJzICYmIHJlbW92YWJsZSkge1xuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fY2FjaGVbY2FjaGVLZXldO1xuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fY2VsbHNbY2VsbEtleV07XG4gICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9hY3RpdmVDZWxsc1tjZWxsS2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFN0eWxpbmcgTWV0aG9kc1xuICAgKi9cblxuICByZXNldFN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vcHRpb25zLnN0eWxlID0gdGhpcy5fb3JpZ2luYWxTdHlsZTtcbiAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgdGhpcy5yZXNldEZlYXR1cmVTdHlsZShsYXllci5mZWF0dXJlLmlkKTtcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBzZXRTdHlsZTogZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgdGhpcy5vcHRpb25zLnN0eWxlID0gc3R5bGU7XG4gICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKGxheWVyLmZlYXR1cmUuaWQsIHN0eWxlKTtcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZXNldEZlYXR1cmVTdHlsZTogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICB2YXIgc3R5bGUgPSB0aGlzLl9vcmlnaW5hbFN0eWxlIHx8IEwuUGF0aC5wcm90b3R5cGUub3B0aW9ucztcbiAgICBpZiAobGF5ZXIpIHtcbiAgICAgIEwuVXRpbC5leHRlbmQobGF5ZXIub3B0aW9ucywgbGF5ZXIuZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgdGhpcy5zZXRGZWF0dXJlU3R5bGUoaWQsIHN0eWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2V0RmVhdHVyZVN0eWxlOiBmdW5jdGlvbiAoaWQsIHN0eWxlKSB7XG4gICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICBpZiAodHlwZW9mIHN0eWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzdHlsZSA9IHN0eWxlKGxheWVyLmZlYXR1cmUpO1xuICAgIH1cbiAgICBpZiAobGF5ZXIuc2V0U3R5bGUpIHtcbiAgICAgIGxheWVyLnNldFN0eWxlKHN0eWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgTWV0aG9kc1xuICAgKi9cblxuICBlYWNoRmVhdHVyZTogZnVuY3Rpb24gKGZuLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgIGZuLmNhbGwoY29udGV4dCwgdGhpcy5fbGF5ZXJzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0RmVhdHVyZTogZnVuY3Rpb24gKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xheWVyc1tpZF07XG4gIH0sXG5cbiAgYnJpbmdUb0JhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgaWYgKGxheWVyLmJyaW5nVG9CYWNrKSB7XG4gICAgICAgIGxheWVyLmJyaW5nVG9CYWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgYnJpbmdUb0Zyb250OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgIGlmIChsYXllci5icmluZ1RvRnJvbnQpIHtcbiAgICAgICAgbGF5ZXIuYnJpbmdUb0Zyb250KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVkcmF3OiBmdW5jdGlvbiAoaWQpIHtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuX3JlZHJhdyhpZCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIF9yZWRyYXc6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgdmFyIGdlb2pzb24gPSBsYXllci5mZWF0dXJlO1xuXG4gICAgLy8gaWYgdGhpcyBsb29rcyBsaWtlIGEgbWFya2VyXG4gICAgaWYgKGxheWVyICYmIGxheWVyLnNldEljb24gJiYgdGhpcy5vcHRpb25zLnBvaW50VG9MYXllcikge1xuICAgICAgLy8gdXBkYXRlIGN1c3RvbSBzeW1ib2xvZ3ksIGlmIG5lY2Vzc2FyeVxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wb2ludFRvTGF5ZXIpIHtcbiAgICAgICAgdmFyIGdldEljb24gPSB0aGlzLm9wdGlvbnMucG9pbnRUb0xheWVyKGdlb2pzb24sIEwubGF0TG5nKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV0sIGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF0pKTtcbiAgICAgICAgdmFyIHVwZGF0ZWRJY29uID0gZ2V0SWNvbi5vcHRpb25zLmljb247XG4gICAgICAgIGxheWVyLnNldEljb24odXBkYXRlZEljb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGxvb2tzIGxpa2UgYSB2ZWN0b3IgbWFya2VyIChjaXJjbGVNYXJrZXIpXG4gICAgaWYgKGxheWVyICYmIGxheWVyLnNldFN0eWxlICYmIHRoaXMub3B0aW9ucy5wb2ludFRvTGF5ZXIpIHtcbiAgICAgIHZhciBnZXRTdHlsZSA9IHRoaXMub3B0aW9ucy5wb2ludFRvTGF5ZXIoZ2VvanNvbiwgTC5sYXRMbmcoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSwgZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1swXSkpO1xuICAgICAgdmFyIHVwZGF0ZWRTdHlsZSA9IGdldFN0eWxlLm9wdGlvbnM7XG4gICAgICB0aGlzLnNldEZlYXR1cmVTdHlsZShnZW9qc29uLmlkLCB1cGRhdGVkU3R5bGUpO1xuICAgIH1cblxuICAgIC8vIGxvb2tzIGxpa2UgYSBwYXRoIChwb2x5Z29uL3BvbHlsaW5lKVxuICAgIGlmIChsYXllciAmJiBsYXllci5zZXRTdHlsZSAmJiB0aGlzLm9wdGlvbnMuc3R5bGUpIHtcbiAgICAgIHRoaXMucmVzZXRTdHlsZShnZW9qc29uLmlkKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZUxheWVyIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRmVhdHVyZUxheWVyKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmZWF0dXJlTGF5ZXI7XG4iXSwibmFtZXMiOlsic2hhbGxvd0Nsb25lIiwiYXJjZ2lzVG9HZW9KU09OIiwiZ2VvanNvblRvQXJjR0lTIiwiZzJhIiwiYTJnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0NDQU8sSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksaUJBQWlCLElBQUksSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hHLENBQU8sSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsYUFBYSxLQUFLLEVBQUUsQ0FBQzs7QUFFL0UsQ0FBTyxJQUFJLE9BQU8sR0FBRztBQUNyQixDQUFBLEVBQUUsSUFBSSxFQUFFLElBQUk7QUFDWixDQUFBLEVBQUUsYUFBYSxFQUFFLGFBQWE7QUFDOUIsQ0FBQSxDQUFDLENBQUM7O0NDRkYsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDOztBQUVsQixDQUFBLFNBQVMsU0FBUyxFQUFFLE1BQU0sRUFBRTtBQUM1QixDQUFBLEVBQUUsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOztBQUVoQixDQUFBLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQzs7QUFFaEMsQ0FBQSxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO0FBQzFCLENBQUEsSUFBSSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDcEMsQ0FBQSxNQUFNLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM5QixDQUFBLE1BQU0s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LEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkQsQ0FBQSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZCxDQUFBLEdBQUc7QUFDSCxDQUFBLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN0QixDQUFBLENBQUM7O0FBRUQsQ0FBQTtBQUNBLENBQUEsU0FBUyxzQkFBc0IsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDakQsQ0FBQSxFQUFFLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xGLENBQUEsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsRixDQUFBLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxD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R0FBRzs7QUFFSCxDQUFBLEVBQUUsT0FBTyxFQUFFLFVBQVUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUN4QyxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ3ZCLENBQUEsTUFBTSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDOUUsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDL0UsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxRQUFRLEVBQUUsVUFBVSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO0FBQy9ELENBQUEsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7O0FBRWxILENBQUEsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxNQUFNLEtBQUssU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtBQUM3RSxDQUFBLE1BQU0sT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMvRCxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdB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LE1BQU0sQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3BCLENBQUEsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsVUFBVSxFQUFFLFVBQVUsTUFBTSxFQUFFLElBQUksRUFBRTtBQUN0QyxDQUFBLElBQUksSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFN0MsQ0FBQSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM1RSxDQUFBLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOztBQUU5RSxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtBQUNsQyxDQUFBLE1BQU0sSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDNUIsQ0FBQSxLQUFLOztBQUVMLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7O0FBRWxCLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ25FLENBQUEsTUFBTSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFV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LElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7O0FBRXBFLENBQUE7QUFDQSxDQUFBLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDOUQsQ0FBQSxJQUFJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUVqRSxDQUFBLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDeEMsQ0FBQSxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxNQUFNLEdBQUc7QUFDakIsQ0FBQSxNQUFNLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQzlDLENBQUEsTUFBTSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDakMsQ0FBQSxNQUFNLEdBQUcsRUFBRSxFQUFFO0FBQ2IsQ0FBQSxNQUFNLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07QUFDakMsQ0FBQSxNQUFNLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7QUFDM0MsQ0FBQSxNQUFNLE1BQU0sRUFBRSxFQUFFO0FBQ2hCLENBQUEsTUFBTSxPQUFPLEVBQUUsRUFBRTtB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QUksVUFBVSxHQUFHLENBQUMsQ0FBQyxNQUFNO0FBQzdCLENBQUEsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUU7QUFDM0MsQ0FBQSxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7O0FBRTdDLENBQUEsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdkMsQ0FBQSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRS9CLENBQUEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzlCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsU0FBUyxFQUFFLFVBQVUsTUFBTSxFQUFFO0FBQy9CLENBQUEsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDbkIsQ0FBQSxJQUFJLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNwQyxDQUFBLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFbkMsQ0FBQSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUM7QUFDckIsQ0FBQTtBQUNBLENBQUEsSUFBSSxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkQsQ0FBQSxNQUFNLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNyRCxDQUFBLFFBQVEsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FB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QUFVLE9BQU8sRUFBRTtBQUM5QyxDQUFBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7QUFDaEQsQ0FBQSxNQUFNLE9BQU8sSUFBSSxDQUFDO0FBQ2xCLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM1QyxDQUFBLElBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFeEMsQ0FBQSxJQUFJLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7QUFDcEQsQ0FBQSxNQUFNLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdELENBQUEsTUFBTSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzVDLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO0FBQ3BFLENBQUEsTUFBTSxJQUFJLFNBQVMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEUsQ0FBQSxNQUFNLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwRSxDQUFBLE1BQU0sT0FBTyxDQUFDLENB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