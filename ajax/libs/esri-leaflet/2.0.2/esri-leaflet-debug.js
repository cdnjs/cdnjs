/* esri-leaflet - v2.0.2 - Wed Aug 03 2016 15:02:55 GMT-0700 (PDT)
 * Copyright (c) 2016 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}),global.L));
}(this, function (exports,L) { 'use strict';

	L = 'default' in L ? L['default'] : L;

	var version = "2.0.2";

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
	    this._updateMapAttribution(obj);
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
	    var attributionElement = map.attributionControl._container.querySelector('.esri-attributions');

	    attributionElement.innerHTML = newAttributions;
	    attributionElement.style.maxWidth = calcAttributionWidth(map);

	    map.fire('attributionupdated', {
	      attribution: newAttributions
	    });
	  }
	}

	function calcAttributionWidth (map) {
	  // the extra 160 pixels are for the prefix attribution and ellipsis
	  return (map.getSize().x - 160) + 'px';
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
	  _getAttributionData: _getAttributionData,
	  _updateMapAttribution: _updateMapAttribution,
	  calcAttributionWidth: calcAttributionWidth
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
	    ATTRIBUTIONPREFIX: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>',
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
	    map._esriBasemapCount ? map._esriBasemapCount += 1 : map._esriBasemapCount = 1;
	    // Update attribution when Esri hosted basemaps are loaded
	    if (map.attributionControl) {
	      map.attributionControl.setPrefix(BasemapLayer.ATTRIBUTIONPREFIX + ' | Powered by <a href="https://www.esri.com">Esri</a>');
	    }

	    if (this.options.pane === 'esri-labels') {
	      this._initPane();
	    }
	    // some basemaps can supply dynamic attribution
	    if (this.options.attributionUrl) {
	      Util._getAttributionData(this.options.attributionUrl, map);
	    }

	    map.on('moveend', Util._updateMapAttribution);

	    L.TileLayer.prototype.onAdd.call(this, map);
	  },

	  onRemove: function (map) {
	    map._esriBasemapCount -= 1;
	    // if no Esri basemaps are displayed, revert attribution changes
	    if (map.attributionControl && map._esriBasemapCount < 1) {
	      map.attributionControl.setPrefix(BasemapLayer.ATTRIBUTIONPREFIX);
	    }

	    map.off('moveend', Util._updateMapAttribution);
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
	      var attribution = '<span class="esri-attributions" style="line-height:14px; vertical-align: -3px; text-overflow:ellipsis; white-space:nowrap; overflow:hidden; display:inline-block; max-width:' + Util.calcAttributionWidth(this._map) + ';">' + this.options.attribution + '</span>';
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
	    if (map.options.crs === L.CRS.EPSG3857 && !this._lodMap) {
	      this._lodMap = {};
	      this.metadata(function (error, metadata) {
	        if (!error && metadata.spatialReference) {
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
	    // check to see whether service is 10.4 or above (and can emit GeoJSON natively)
	    this.service.metadata(function (error, metadata) {
	      var supportedFormats = metadata.supportedQueryFormats;
	      if (supportedFormats && supportedFormats.indexOf('geoJSON') !== -1) {
	        this.service.options.isModern = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvU3VwcG9ydC5qcyIsIi4uL3NyYy9SZXF1ZXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2FyY2dpcy10by1nZW9qc29uLXV0aWxzL2luZGV4LmpzIiwiLi4vc3JjL1V0aWwuanMiLCIuLi9zcmMvVGFza3MvVGFzay5qcyIsIi4uL3NyYy9UYXNrcy9RdWVyeS5qcyIsIi4uL3NyYy9UYXNrcy9GaW5kLmpzIiwiLi4vc3JjL1Rhc2tzL0lkZW50aWZ5LmpzIiwiLi4vc3JjL1Rhc2tzL0lkZW50aWZ5RmVhdHVyZXMuanMiLCIuLi9zcmMvVGFza3MvSWRlbnRpZnlJbWFnZS5qcyIsIi4uL3NyYy9TZXJ2aWNlcy9TZXJ2aWNlLmpzIiwiLi4vc3JjL1NlcnZpY2VzL01hcFNlcnZpY2UuanMiLCIuLi9zcmMvU2VydmljZXMvSW1hZ2VTZXJ2aWNlLmpzIiwiLi4vc3JjL1NlcnZpY2VzL0ZlYXR1cmVMYXllclNlcnZpY2UuanMiLCIuLi9zcmMvTGF5ZXJzL0Jhc2VtYXBMYXllci5qcyIsIi4uL3NyYy9MYXllcnMvVGlsZWRNYXBMYXllci5qcyIsIi4uL3NyYy9MYXllcnMvUmFzdGVyTGF5ZXIuanMiLCIuLi9zcmMvTGF5ZXJzL0ltYWdlTWFwTGF5ZXIuanMiLCIuLi9zcmMvTGF5ZXJzL0R5bmFtaWNNYXBMYXllci5qcyIsIi4uL25vZGVfbW9kdWxlcy9sZWFmbGV0LXZpcnR1YWwtZ3JpZC9zcmMvdmlydHVhbC1ncmlkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3RpbnktYmluYXJ5LXNlYXJjaC9pbmRleC5qcyIsIi4uL3NyYy9MYXllcnMvRmVhdHVyZUxheWVyL0ZlYXR1cmVNYW5hZ2VyLmpzIiwiLi4vc3JjL0xheWVycy9GZWF0dXJlTGF5ZXIvRmVhdHVyZUxheWVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIntcbiAgXCJuYW1lXCI6IFwiZXNyaS1sZWFmbGV0XCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJMZWFmbGV0IHBsdWdpbnMgZm9yIGNvbnN1bWluZyBBcmNHSVMgT25saW5lIGFuZCBBcmNHSVMgU2VydmVyIHNlcnZpY2VzLlwiLFxuICBcInZlcnNpb25cIjogXCIyLjAuMlwiLFxuICBcImF1dGhvclwiOiBcIlBhdHJpY2sgQXJsdCA8cGFybHRAZXNyaS5jb20+IChodHRwOi8vcGF0cmlja2FybHQuY29tKVwiLFxuICBcImJyb3dzZXJcIjogXCJkaXN0L2VzcmktbGVhZmxldC1kZWJ1Zy5qc1wiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2VzcmkvZXNyaS1sZWFmbGV0L2lzc3Vlc1wiXG4gIH0sXG4gIFwiY29udHJpYnV0b3JzXCI6IFtcbiAgICBcIlBhdHJpY2sgQXJsdCA8cGFybHRAZXNyaS5jb20+IChodHRwOi8vcGF0cmlja2FybHQuY29tKVwiLFxuICAgIFwiSm9obiBHcmF2b2lzIDxqZ3Jhdm9pc0Blc3JpLmNvbT4gKGh0dHA6Ly9qb2huZ3Jhdm9pcy5jb20pXCJcbiAgXSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYXJjZ2lzLXRvLWdlb2pzb24tdXRpbHNcIjogXCJeMS4wLjFcIixcbiAgICBcImxlYWZsZXRcIjogXCJeMS4wLjAtcmMuMlwiLFxuICAgIFwibGVhZmxldC12aXJ0dWFsLWdyaWRcIjogXCJeMS4wLjNcIixcbiAgICBcInRpbnktYmluYXJ5LXNlYXJjaFwiOiBcIl4xLjAuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCIyLjMuMFwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjEuMTAuMlwiLFxuICAgIFwiZ2gtcmVsZWFzZVwiOiBcIl4yLjAuMFwiLFxuICAgIFwiaGlnaGxpZ2h0LmpzXCI6IFwiXjguMC4wXCIsXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4wLjguNVwiLFxuICAgIFwiaXNwYXJ0YVwiOiBcIl4zLjAuM1wiLFxuICAgIFwiaXN0YW5idWxcIjogXCJeMC40LjJcIixcbiAgICBcImthcm1hXCI6IFwiXjAuMTIuMTZcIixcbiAgICBcImthcm1hLWNoYWktc2lub25cIjogXCJeMC4xLjNcIixcbiAgICBcImthcm1hLWNvdmVyYWdlXCI6IFwiXjAuNS4zXCIsXG4gICAgXCJrYXJtYS1tb2NoYVwiOiBcIl4wLjEuMFwiLFxuICAgIFwia2FybWEtbW9jaGEtcmVwb3J0ZXJcIjogXCJeMC4yLjVcIixcbiAgICBcImthcm1hLXBoYW50b21qcy1sYXVuY2hlclwiOiBcIl4wLjIuMFwiLFxuICAgIFwia2FybWEtc291cmNlbWFwLWxvYWRlclwiOiBcIl4wLjMuNVwiLFxuICAgIFwibG9hZC1ncnVudC10YXNrc1wiOiBcIl4wLjQuMFwiLFxuICAgIFwibWtkaXJwXCI6IFwiXjAuNS4xXCIsXG4gICAgXCJtb2NoYVwiOiBcIl4yLjMuNFwiLFxuICAgIFwicGhhbnRvbWpzXCI6IFwiXjEuOS4xN1wiLFxuICAgIFwicm9sbHVwXCI6IFwiXjAuMjUuNFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1qc29uXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLW5vZGUtcmVzb2x2ZVwiOiBcIl4xLjQuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi11Z2xpZnlcIjogXCJeMC4zLjFcIixcbiAgICBcInNlbWlzdGFuZGFyZFwiOiBcIl43LjAuNVwiLFxuICAgIFwic2lub25cIjogXCJeMS4xMS4xXCIsXG4gICAgXCJzaW5vbi1jaGFpXCI6IFwiMi43LjBcIixcbiAgICBcInNuYXp6eVwiOiBcIl4yLjAuMVwiLFxuICAgIFwidWdsaWZ5LWpzXCI6IFwiXjIuNi4xXCIsXG4gICAgXCJ3YXRjaFwiOiBcIl4wLjE3LjFcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cDovL2VzcmkuZ2l0aHViLmlvL2VzcmktbGVhZmxldFwiLFxuICBcImpzbmV4dDptYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0LmpzXCIsXG4gIFwianNwbVwiOiB7XG4gICAgXCJyZWdpc3RyeVwiOiBcIm5wbVwiLFxuICAgIFwiZm9ybWF0XCI6IFwiZXM2XCIsXG4gICAgXCJtYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0LmpzXCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJhcmNnaXNcIixcbiAgICBcImVzcmlcIixcbiAgICBcImVzcmkgbGVhZmxldFwiLFxuICAgIFwiZ2lzXCIsXG4gICAgXCJsZWFmbGV0IHBsdWdpblwiLFxuICAgIFwibWFwcGluZ1wiXG4gIF0sXG4gIFwibGljZW5zZVwiOiBcIkFwYWNoZS0yLjBcIixcbiAgXCJtYWluXCI6IFwiZGlzdC9lc3JpLWxlYWZsZXQtZGVidWcuanNcIixcbiAgXCJyZWFkbWVGaWxlbmFtZVwiOiBcIlJFQURNRS5tZFwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0QGdpdGh1Yi5jb206RXNyaS9lc3JpLWxlYWZsZXQuZ2l0XCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwicm9sbHVwIC1jIHByb2ZpbGVzL2RlYnVnLmpzICYgcm9sbHVwIC1jIHByb2ZpbGVzL3Byb2R1Y3Rpb24uanNcIixcbiAgICBcImxpbnRcIjogXCJzZW1pc3RhbmRhcmQgc3JjLyoqLyouanMgfCBzbmF6enlcIixcbiAgICBcInByZWJ1aWxkXCI6IFwibWtkaXJwIGRpc3RcIixcbiAgICBcInByZXB1Ymxpc2hcIjogXCJucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV0ZXN0XCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIi4vc2NyaXB0cy9yZWxlYXNlLnNoXCIsXG4gICAgXCJzdGFydFwiOiBcIndhdGNoICducG0gcnVuIGJ1aWxkJyBzcmMgJiBodHRwLXNlcnZlciAtcCA1MDAwIC1jLTEgLW9cIixcbiAgICBcInRlc3RcIjogXCJucG0gcnVuIGxpbnQgJiYga2FybWEgc3RhcnRcIlxuICB9XG59XG4iLCJleHBvcnQgdmFyIGNvcnMgPSAoKHdpbmRvdy5YTUxIdHRwUmVxdWVzdCAmJiAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCkpKTtcbmV4cG9ydCB2YXIgcG9pbnRlckV2ZW50cyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID09PSAnJztcblxuZXhwb3J0IHZhciBTdXBwb3J0ID0ge1xuICBjb3JzOiBjb3JzLFxuICBwb2ludGVyRXZlbnRzOiBwb2ludGVyRXZlbnRzXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0O1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgU3VwcG9ydCBmcm9tICcuL1N1cHBvcnQnO1xuaW1wb3J0IHsgd2FybiB9IGZyb20gJy4vVXRpbCc7XG5cbnZhciBjYWxsYmFja3MgPSAwO1xuXG5mdW5jdGlvbiBzZXJpYWxpemUgKHBhcmFtcykge1xuICB2YXIgZGF0YSA9ICcnO1xuXG4gIHBhcmFtcy5mID0gcGFyYW1zLmYgfHwgJ2pzb24nO1xuXG4gIGZvciAodmFyIGtleSBpbiBwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHZhciBwYXJhbSA9IHBhcmFtc1trZXldO1xuICAgICAgdmFyIHR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGFyYW0pO1xuICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICBpZiAoZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgZGF0YSArPSAnJic7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgIHZhbHVlID0gKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwYXJhbVswXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSA/IEpTT04uc3RyaW5naWZ5KHBhcmFtKSA6IHBhcmFtLmpvaW4oJywnKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeShwYXJhbSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgICAgICB2YWx1ZSA9IHBhcmFtLnZhbHVlT2YoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gcGFyYW07XG4gICAgICB9XG5cbiAgICAgIGRhdGEgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVSZXF1ZXN0IChjYWxsYmFjaywgY29udGV4dCkge1xuICB2YXIgaHR0cFJlcXVlc3QgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgaHR0cFJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaHR0cFJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gTC5VdGlsLmZhbHNlRm47XG5cbiAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGNvZGU6IDUwMCxcbiAgICAgICAgbWVzc2FnZTogJ1hNTEh0dHBSZXF1ZXN0IGVycm9yJ1xuICAgICAgfVxuICAgIH0sIG51bGwpO1xuICB9O1xuXG4gIGh0dHBSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzcG9uc2U7XG4gICAgdmFyIGVycm9yO1xuXG4gICAgaWYgKGh0dHBSZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShodHRwUmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXNwb25zZSA9IG51bGw7XG4gICAgICAgIGVycm9yID0ge1xuICAgICAgICAgIGNvZGU6IDUwMCxcbiAgICAgICAgICBtZXNzYWdlOiAnQ291bGQgbm90IHBhcnNlIHJlc3BvbnNlIGFzIEpTT04uIFRoaXMgY291bGQgYWxzbyBiZSBjYXVzZWQgYnkgYSBDT1JTIG9yIFhNTEh0dHBSZXF1ZXN0IGVycm9yLidcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5lcnJvcikge1xuICAgICAgICBlcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICByZXNwb25zZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGh0dHBSZXF1ZXN0Lm9uZXJyb3IgPSBMLlV0aWwuZmFsc2VGbjtcblxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgIH1cbiAgfTtcblxuICBodHRwUmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vbmVycm9yKCk7XG4gIH07XG5cbiAgcmV0dXJuIGh0dHBSZXF1ZXN0O1xufVxuXG5mdW5jdGlvbiB4bWxIdHRwUG9zdCAodXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIHZhciBodHRwUmVxdWVzdCA9IGNyZWF0ZVJlcXVlc3QoY2FsbGJhY2ssIGNvbnRleHQpO1xuICBodHRwUmVxdWVzdC5vcGVuKCdQT1NUJywgdXJsKTtcblxuICBpZiAodHlwZW9mIGNvbnRleHQgIT09ICd1bmRlZmluZWQnICYmIGNvbnRleHQgIT09IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIGNvbnRleHQub3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGh0dHBSZXF1ZXN0LnRpbWVvdXQgPSBjb250ZXh0Lm9wdGlvbnMudGltZW91dDtcbiAgICB9XG4gIH1cbiAgaHR0cFJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuICBodHRwUmVxdWVzdC5zZW5kKHNlcmlhbGl6ZShwYXJhbXMpKTtcblxuICByZXR1cm4gaHR0cFJlcXVlc3Q7XG59XG5cbmZ1bmN0aW9uIHhtbEh0dHBHZXQgKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICB2YXIgaHR0cFJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0KGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgaHR0cFJlcXVlc3Qub3BlbignR0VUJywgdXJsICsgJz8nICsgc2VyaWFsaXplKHBhcmFtcyksIHRydWUpO1xuXG4gIGlmICh0eXBlb2YgY29udGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgY29udGV4dCAhPT0gbnVsbCkge1xuICAgIGlmICh0eXBlb2YgY29udGV4dC5vcHRpb25zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaHR0cFJlcXVlc3QudGltZW91dCA9IGNvbnRleHQub3B0aW9ucy50aW1lb3V0O1xuICAgIH1cbiAgfVxuICBodHRwUmVxdWVzdC5zZW5kKG51bGwpO1xuXG4gIHJldHVybiBodHRwUmVxdWVzdDtcbn1cblxuLy8gQUpBWCBoYW5kbGVycyBmb3IgQ09SUyAobW9kZXJuIGJyb3dzZXJzKSBvciBKU09OUCAob2xkZXIgYnJvd3NlcnMpXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdCAodXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIHZhciBwYXJhbVN0cmluZyA9IHNlcmlhbGl6ZShwYXJhbXMpO1xuICB2YXIgaHR0cFJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0KGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgdmFyIHJlcXVlc3RMZW5ndGggPSAodXJsICsgJz8nICsgcGFyYW1TdHJpbmcpLmxlbmd0aDtcblxuICAvLyBnZXQgYXJvdW5kIGllMTAvMTEgYnVnIHdoaWNoIHJlcXVpcmVzIHRoYXQgdGhlIHJlcXVlc3QgYmUgb3BlbmVkIGJlZm9yZSBhIHRpbWVvdXQgaXMgYXBwbGllZFxuICBpZiAocmVxdWVzdExlbmd0aCA8PSAyMDAwICYmIFN1cHBvcnQuY29ycykge1xuICAgIGh0dHBSZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCArICc/JyArIHBhcmFtU3RyaW5nKTtcblxuICB9IGVsc2UgaWYgKHJlcXVlc3RMZW5ndGggPiAyMDAwICYmIFN1cHBvcnQuY29ycykge1xuICAgIGh0dHBSZXF1ZXN0Lm9wZW4oJ1BPU1QnLCB1cmwpO1xuICAgIGh0dHBSZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgY29udGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgY29udGV4dCAhPT0gbnVsbCkge1xuICAgIGlmICh0eXBlb2YgY29udGV4dC5vcHRpb25zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaHR0cFJlcXVlc3QudGltZW91dCA9IGNvbnRleHQub3B0aW9ucy50aW1lb3V0O1xuICAgIH1cbiAgfVxuXG4gIC8vIHJlcXVlc3QgaXMgbGVzcyB0aGVuIDIwMDAgY2hhcmFjdGVycyBhbmQgdGhlIGJyb3dzZXIgc3VwcG9ydHMgQ09SUywgbWFrZSBHRVQgcmVxdWVzdCB3aXRoIFhNTEh0dHBSZXF1ZXN0XG4gIGlmIChyZXF1ZXN0TGVuZ3RoIDw9IDIwMDAgJiYgU3VwcG9ydC5jb3JzKSB7XG4gICAgaHR0cFJlcXVlc3Quc2VuZChudWxsKTtcblxuICAvLyByZXF1ZXN0IGlzIGxlc3MgbW9yZSB0aGVuIDIwMDAgY2hhcmFjdGVycyBhbmQgdGhlIGJyb3dzZXIgc3VwcG9ydHMgQ09SUywgbWFrZSBQT1NUIHJlcXVlc3Qgd2l0aCBYTUxIdHRwUmVxdWVzdFxuICB9IGVsc2UgaWYgKHJlcXVlc3RMZW5ndGggPiAyMDAwICYmIFN1cHBvcnQuY29ycykge1xuICAgIGh0dHBSZXF1ZXN0LnNlbmQocGFyYW1TdHJpbmcpO1xuXG4gIC8vIHJlcXVlc3QgaXMgbGVzcyBtb3JlIHRoZW4gMjAwMCBjaGFyYWN0ZXJzIGFuZCB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IENPUlMsIG1ha2UgYSBKU09OUCByZXF1ZXN0XG4gIH0gZWxzZSBpZiAocmVxdWVzdExlbmd0aCA8PSAyMDAwICYmICFTdXBwb3J0LmNvcnMpIHtcbiAgICByZXR1cm4ganNvbnAodXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcblxuICAvLyByZXF1ZXN0IGlzIGxvbmdlciB0aGVuIDIwMDAgY2hhcmFjdGVycyBhbmQgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBDT1JTLCBsb2cgYSB3YXJuaW5nXG4gIH0gZWxzZSB7XG4gICAgd2FybignYSByZXF1ZXN0IHRvICcgKyB1cmwgKyAnIHdhcyBsb25nZXIgdGhlbiAyMDAwIGNoYXJhY3RlcnMgYW5kIHRoaXMgYnJvd3NlciBjYW5ub3QgbWFrZSBhIGNyb3NzLWRvbWFpbiBwb3N0IHJlcXVlc3QuIFBsZWFzZSB1c2UgYSBwcm94eSBodHRwOi8vZXNyaS5naXRodWIuaW8vZXNyaS1sZWFmbGV0L2FwaS1yZWZlcmVuY2UvcmVxdWVzdC5odG1sJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmV0dXJuIGh0dHBSZXF1ZXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24ganNvbnAgKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICB3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzID0gd2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrcyB8fCB7fTtcbiAgdmFyIGNhbGxiYWNrSWQgPSAnYycgKyBjYWxsYmFja3M7XG4gIHBhcmFtcy5jYWxsYmFjayA9ICd3aW5kb3cuX0VzcmlMZWFmbGV0Q2FsbGJhY2tzLicgKyBjYWxsYmFja0lkO1xuXG4gIHdpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3NbY2FsbGJhY2tJZF0gPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICBpZiAod2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrc1tjYWxsYmFja0lkXSAhPT0gdHJ1ZSkge1xuICAgICAgdmFyIGVycm9yO1xuICAgICAgdmFyIHJlc3BvbnNlVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChyZXNwb25zZSk7XG5cbiAgICAgIGlmICghKHJlc3BvbnNlVHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgfHwgcmVzcG9uc2VUeXBlID09PSAnW29iamVjdCBBcnJheV0nKSkge1xuICAgICAgICBlcnJvciA9IHtcbiAgICAgICAgICBlcnJvcjoge1xuICAgICAgICAgICAgY29kZTogNTAwLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0V4cGVjdGVkIGFycmF5IG9yIG9iamVjdCBhcyBKU09OUCByZXNwb25zZSdcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlc3BvbnNlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5lcnJvcikge1xuICAgICAgICBlcnJvciA9IHJlc3BvbnNlO1xuICAgICAgICByZXNwb25zZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlKTtcbiAgICAgIHdpbmRvdy5fRXNyaUxlYWZsZXRDYWxsYmFja3NbY2FsbGJhY2tJZF0gPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICB2YXIgc2NyaXB0ID0gTC5Eb21VdGlsLmNyZWF0ZSgnc2NyaXB0JywgbnVsbCwgZG9jdW1lbnQuYm9keSk7XG4gIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gIHNjcmlwdC5zcmMgPSB1cmwgKyAnPycgKyBzZXJpYWxpemUocGFyYW1zKTtcbiAgc2NyaXB0LmlkID0gY2FsbGJhY2tJZDtcblxuICBjYWxsYmFja3MrKztcblxuICByZXR1cm4ge1xuICAgIGlkOiBjYWxsYmFja0lkLFxuICAgIHVybDogc2NyaXB0LnNyYyxcbiAgICBhYm9ydDogZnVuY3Rpb24gKCkge1xuICAgICAgd2luZG93Ll9Fc3JpTGVhZmxldENhbGxiYWNrcy5fY2FsbGJhY2tbY2FsbGJhY2tJZF0oe1xuICAgICAgICBjb2RlOiAwLFxuICAgICAgICBtZXNzYWdlOiAnUmVxdWVzdCBhYm9ydGVkLidcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cblxudmFyIGdldCA9ICgoU3VwcG9ydC5jb3JzKSA/IHhtbEh0dHBHZXQgOiBqc29ucCk7XG5nZXQuQ09SUyA9IHhtbEh0dHBHZXQ7XG5nZXQuSlNPTlAgPSBqc29ucDtcblxuLy8gY2hvb3NlIHRoZSBjb3JyZWN0IEFKQVggaGFuZGxlciBkZXBlbmRpbmcgb24gQ09SUyBzdXBwb3J0XG5leHBvcnQgeyBnZXQgfTtcblxuLy8gYWx3YXlzIHVzZSBYTUxIdHRwUmVxdWVzdCBmb3IgcG9zdHNcbmV4cG9ydCB7IHhtbEh0dHBQb3N0IGFzIHBvc3QgfTtcblxuLy8gZXhwb3J0IHRoZSBSZXF1ZXN0IG9iamVjdCB0byBjYWxsIHRoZSBkaWZmZXJlbnQgaGFuZGxlcnMgZm9yIGRlYnVnZ2luZ1xuZXhwb3J0IHZhciBSZXF1ZXN0ID0ge1xuICByZXF1ZXN0OiByZXF1ZXN0LFxuICBnZXQ6IGdldCxcbiAgcG9zdDogeG1sSHR0cFBvc3Rcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVlc3Q7XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMTUgRXNyaVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGlzY2Vuc2UuXG4gKi9cblxuLy8gY2hlY2tzIGlmIDIgeCx5IHBvaW50cyBhcmUgZXF1YWxcbmZ1bmN0aW9uIHBvaW50c0VxdWFsIChhLCBiKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBjaGVja3MgaWYgdGhlIGZpcnN0IGFuZCBsYXN0IHBvaW50cyBvZiBhIHJpbmcgYXJlIGVxdWFsIGFuZCBjbG9zZXMgdGhlIHJpbmdcbmZ1bmN0aW9uIGNsb3NlUmluZyAoY29vcmRpbmF0ZXMpIHtcbiAgaWYgKCFwb2ludHNFcXVhbChjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbY29vcmRpbmF0ZXMubGVuZ3RoIC0gMV0pKSB7XG4gICAgY29vcmRpbmF0ZXMucHVzaChjb29yZGluYXRlc1swXSk7XG4gIH1cbiAgcmV0dXJuIGNvb3JkaW5hdGVzO1xufVxuXG4vLyBkZXRlcm1pbmUgaWYgcG9seWdvbiByaW5nIGNvb3JkaW5hdGVzIGFyZSBjbG9ja3dpc2UuIGNsb2Nrd2lzZSBzaWduaWZpZXMgb3V0ZXIgcmluZywgY291bnRlci1jbG9ja3dpc2UgYW4gaW5uZXIgcmluZ1xuLy8gb3IgaG9sZS4gdGhpcyBsb2dpYyB3YXMgZm91bmQgYXQgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTY1NjQ3L2hvdy10by1kZXRlcm1pbmUtaWYtYS1saXN0LW9mLXBvbHlnb24tXG4vLyBwb2ludHMtYXJlLWluLWNsb2Nrd2lzZS1vcmRlclxuZnVuY3Rpb24gcmluZ0lzQ2xvY2t3aXNlIChyaW5nVG9UZXN0KSB7XG4gIHZhciB0b3RhbCA9IDA7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJMZW5ndGggPSByaW5nVG9UZXN0Lmxlbmd0aDtcbiAgdmFyIHB0MSA9IHJpbmdUb1Rlc3RbaV07XG4gIHZhciBwdDI7XG4gIGZvciAoaTsgaSA8IHJMZW5ndGggLSAxOyBpKyspIHtcbiAgICBwdDIgPSByaW5nVG9UZXN0W2kgKyAxXTtcbiAgICB0b3RhbCArPSAocHQyWzBdIC0gcHQxWzBdKSAqIChwdDJbMV0gKyBwdDFbMV0pO1xuICAgIHB0MSA9IHB0MjtcbiAgfVxuICByZXR1cm4gKHRvdGFsID49IDApO1xufVxuXG4vLyBwb3J0ZWQgZnJvbSB0ZXJyYWZvcm1lci5qcyBodHRwczovL2dpdGh1Yi5jb20vRXNyaS9UZXJyYWZvcm1lci9ibG9iL21hc3Rlci90ZXJyYWZvcm1lci5qcyNMNTA0LUw1MTlcbmZ1bmN0aW9uIHZlcnRleEludGVyc2VjdHNWZXJ0ZXggKGExLCBhMiwgYjEsIGIyKSB7XG4gIHZhciB1YVQgPSAoYjJbMF0gLSBiMVswXSkgKiAoYTFbMV0gLSBiMVsxXSkgLSAoYjJbMV0gLSBiMVsxXSkgKiAoYTFbMF0gLSBiMVswXSk7XG4gIHZhciB1YlQgPSAoYTJbMF0gLSBhMVswXSkgKiAoYTFbMV0gLSBiMVsxXSkgLSAoYTJbMV0gLSBhMVsxXSkgKiAoYTFbMF0gLSBiMVswXSk7XG4gIHZhciB1QiA9IChiMlsxXSAtIGIxWzFdKSAqIChhMlswXSAtIGExWzBdKSAtIChiMlswXSAtIGIxWzBdKSAqIChhMlsxXSAtIGExWzFdKTtcblxuICBpZiAodUIgIT09IDApIHtcbiAgICB2YXIgdWEgPSB1YVQgLyB1QjtcbiAgICB2YXIgdWIgPSB1YlQgLyB1QjtcblxuICAgIGlmICh1YSA+PSAwICYmIHVhIDw9IDEgJiYgdWIgPj0gMCAmJiB1YiA8PSAxKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIHBvcnRlZCBmcm9tIHRlcnJhZm9ybWVyLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL1RlcnJhZm9ybWVyL2Jsb2IvbWFzdGVyL3RlcnJhZm9ybWVyLmpzI0w1MjEtTDUzMVxuZnVuY3Rpb24gYXJyYXlJbnRlcnNlY3RzQXJyYXkgKGEsIGIpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aCAtIDE7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgYi5sZW5ndGggLSAxOyBqKyspIHtcbiAgICAgIGlmICh2ZXJ0ZXhJbnRlcnNlY3RzVmVydGV4KGFbaV0sIGFbaSArIDFdLCBiW2pdLCBiW2ogKyAxXSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBwb3J0ZWQgZnJvbSB0ZXJyYWZvcm1lci5qcyBodHRwczovL2dpdGh1Yi5jb20vRXNyaS9UZXJyYWZvcm1lci9ibG9iL21hc3Rlci90ZXJyYWZvcm1lci5qcyNMNDcwLUw0ODBcbmZ1bmN0aW9uIGNvb3JkaW5hdGVzQ29udGFpblBvaW50IChjb29yZGluYXRlcywgcG9pbnQpIHtcbiAgdmFyIGNvbnRhaW5zID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSAtMSwgbCA9IGNvb3JkaW5hdGVzLmxlbmd0aCwgaiA9IGwgLSAxOyArK2kgPCBsOyBqID0gaSkge1xuICAgIGlmICgoKGNvb3JkaW5hdGVzW2ldWzFdIDw9IHBvaW50WzFdICYmIHBvaW50WzFdIDwgY29vcmRpbmF0ZXNbal1bMV0pIHx8XG4gICAgICAgICAoY29vcmRpbmF0ZXNbal1bMV0gPD0gcG9pbnRbMV0gJiYgcG9pbnRbMV0gPCBjb29yZGluYXRlc1tpXVsxXSkpICYmXG4gICAgICAgIChwb2ludFswXSA8IChjb29yZGluYXRlc1tqXVswXSAtIGNvb3JkaW5hdGVzW2ldWzBdKSAqIChwb2ludFsxXSAtIGNvb3JkaW5hdGVzW2ldWzFdKSAvIChjb29yZGluYXRlc1tqXVsxXSAtIGNvb3JkaW5hdGVzW2ldWzFdKSArIGNvb3JkaW5hdGVzW2ldWzBdKSkge1xuICAgICAgY29udGFpbnMgPSAhY29udGFpbnM7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb250YWlucztcbn1cblxuLy8gcG9ydGVkIGZyb20gdGVycmFmb3JtZXItYXJjZ2lzLXBhcnNlci5qcyBodHRwczovL2dpdGh1Yi5jb20vRXNyaS90ZXJyYWZvcm1lci1hcmNnaXMtcGFyc2VyL2Jsb2IvbWFzdGVyL3RlcnJhZm9ybWVyLWFyY2dpcy1wYXJzZXIuanMjTDEwNi1MMTEzXG5mdW5jdGlvbiBjb29yZGluYXRlc0NvbnRhaW5Db29yZGluYXRlcyAob3V0ZXIsIGlubmVyKSB7XG4gIHZhciBpbnRlcnNlY3RzID0gYXJyYXlJbnRlcnNlY3RzQXJyYXkob3V0ZXIsIGlubmVyKTtcbiAgdmFyIGNvbnRhaW5zID0gY29vcmRpbmF0ZXNDb250YWluUG9pbnQob3V0ZXIsIGlubmVyWzBdKTtcbiAgaWYgKCFpbnRlcnNlY3RzICYmIGNvbnRhaW5zKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBkbyBhbnkgcG9seWdvbnMgaW4gdGhpcyBhcnJheSBjb250YWluIGFueSBvdGhlciBwb2x5Z29ucyBpbiB0aGlzIGFycmF5P1xuLy8gdXNlZCBmb3IgY2hlY2tpbmcgZm9yIGhvbGVzIGluIGFyY2dpcyByaW5nc1xuLy8gcG9ydGVkIGZyb20gdGVycmFmb3JtZXItYXJjZ2lzLXBhcnNlci5qcyBodHRwczovL2dpdGh1Yi5jb20vRXNyaS90ZXJyYWZvcm1lci1hcmNnaXMtcGFyc2VyL2Jsb2IvbWFzdGVyL3RlcnJhZm9ybWVyLWFyY2dpcy1wYXJzZXIuanMjTDExNy1MMTcyXG5mdW5jdGlvbiBjb252ZXJ0UmluZ3NUb0dlb0pTT04gKHJpbmdzKSB7XG4gIHZhciBvdXRlclJpbmdzID0gW107XG4gIHZhciBob2xlcyA9IFtdO1xuICB2YXIgeDsgLy8gaXRlcmF0b3JcbiAgdmFyIG91dGVyUmluZzsgLy8gY3VycmVudCBvdXRlciByaW5nIGJlaW5nIGV2YWx1YXRlZFxuICB2YXIgaG9sZTsgLy8gY3VycmVudCBob2xlIGJlaW5nIGV2YWx1YXRlZFxuXG4gIC8vIGZvciBlYWNoIHJpbmdcbiAgZm9yICh2YXIgciA9IDA7IHIgPCByaW5ncy5sZW5ndGg7IHIrKykge1xuICAgIHZhciByaW5nID0gY2xvc2VSaW5nKHJpbmdzW3JdLnNsaWNlKDApKTtcbiAgICBpZiAocmluZy5sZW5ndGggPCA0KSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgLy8gaXMgdGhpcyByaW5nIGFuIG91dGVyIHJpbmc/IGlzIGl0IGNsb2Nrd2lzZT9cbiAgICBpZiAocmluZ0lzQ2xvY2t3aXNlKHJpbmcpKSB7XG4gICAgICB2YXIgcG9seWdvbiA9IFsgcmluZyBdO1xuICAgICAgb3V0ZXJSaW5ncy5wdXNoKHBvbHlnb24pOyAvLyBwdXNoIHRvIG91dGVyIHJpbmdzXG4gICAgfSBlbHNlIHtcbiAgICAgIGhvbGVzLnB1c2gocmluZyk7IC8vIGNvdW50ZXJjbG9ja3dpc2UgcHVzaCB0byBob2xlc1xuICAgIH1cbiAgfVxuXG4gIHZhciB1bmNvbnRhaW5lZEhvbGVzID0gW107XG5cbiAgLy8gd2hpbGUgdGhlcmUgYXJlIGhvbGVzIGxlZnQuLi5cbiAgd2hpbGUgKGhvbGVzLmxlbmd0aCkge1xuICAgIC8vIHBvcCBhIGhvbGUgb2ZmIG91dCBzdGFja1xuICAgIGhvbGUgPSBob2xlcy5wb3AoKTtcblxuICAgIC8vIGxvb3Agb3ZlciBhbGwgb3V0ZXIgcmluZ3MgYW5kIHNlZSBpZiB0aGV5IGNvbnRhaW4gb3VyIGhvbGUuXG4gICAgdmFyIGNvbnRhaW5lZCA9IGZhbHNlO1xuICAgIGZvciAoeCA9IG91dGVyUmluZ3MubGVuZ3RoIC0gMTsgeCA+PSAwOyB4LS0pIHtcbiAgICAgIG91dGVyUmluZyA9IG91dGVyUmluZ3NbeF1bMF07XG4gICAgICBpZiAoY29vcmRpbmF0ZXNDb250YWluQ29vcmRpbmF0ZXMob3V0ZXJSaW5nLCBob2xlKSkge1xuICAgICAgICAvLyB0aGUgaG9sZSBpcyBjb250YWluZWQgcHVzaCBpdCBpbnRvIG91ciBwb2x5Z29uXG4gICAgICAgIG91dGVyUmluZ3NbeF0ucHVzaChob2xlKTtcbiAgICAgICAgY29udGFpbmVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmluZyBpcyBub3QgY29udGFpbmVkIGluIGFueSBvdXRlciByaW5nXG4gICAgLy8gc29tZXRpbWVzIHRoaXMgaGFwcGVucyBodHRwczovL2dpdGh1Yi5jb20vRXNyaS9lc3JpLWxlYWZsZXQvaXNzdWVzLzMyMFxuICAgIGlmICghY29udGFpbmVkKSB7XG4gICAgICB1bmNvbnRhaW5lZEhvbGVzLnB1c2goaG9sZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgd2UgY291bGRuJ3QgbWF0Y2ggYW55IGhvbGVzIHVzaW5nIGNvbnRhaW5zIHdlIGNhbiB0cnkgaW50ZXJzZWN0cy4uLlxuICB3aGlsZSAodW5jb250YWluZWRIb2xlcy5sZW5ndGgpIHtcbiAgICAvLyBwb3AgYSBob2xlIG9mZiBvdXQgc3RhY2tcbiAgICBob2xlID0gdW5jb250YWluZWRIb2xlcy5wb3AoKTtcblxuICAgIC8vIGxvb3Agb3ZlciBhbGwgb3V0ZXIgcmluZ3MgYW5kIHNlZSBpZiBhbnkgaW50ZXJzZWN0IG91ciBob2xlLlxuICAgIHZhciBpbnRlcnNlY3RzID0gZmFsc2U7XG5cbiAgICBmb3IgKHggPSBvdXRlclJpbmdzLmxlbmd0aCAtIDE7IHggPj0gMDsgeC0tKSB7XG4gICAgICBvdXRlclJpbmcgPSBvdXRlclJpbmdzW3hdWzBdO1xuICAgICAgaWYgKGFycmF5SW50ZXJzZWN0c0FycmF5KG91dGVyUmluZywgaG9sZSkpIHtcbiAgICAgICAgLy8gdGhlIGhvbGUgaXMgY29udGFpbmVkIHB1c2ggaXQgaW50byBvdXIgcG9seWdvblxuICAgICAgICBvdXRlclJpbmdzW3hdLnB1c2goaG9sZSk7XG4gICAgICAgIGludGVyc2VjdHMgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWludGVyc2VjdHMpIHtcbiAgICAgIG91dGVyUmluZ3MucHVzaChbaG9sZS5yZXZlcnNlKCldKTtcbiAgICB9XG4gIH1cblxuICBpZiAob3V0ZXJSaW5ncy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ1BvbHlnb24nLFxuICAgICAgY29vcmRpbmF0ZXM6IG91dGVyUmluZ3NbMF1cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnTXVsdGlQb2x5Z29uJyxcbiAgICAgIGNvb3JkaW5hdGVzOiBvdXRlclJpbmdzXG4gICAgfTtcbiAgfVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGVuc3VyZXMgdGhhdCByaW5ncyBhcmUgb3JpZW50ZWQgaW4gdGhlIHJpZ2h0IGRpcmVjdGlvbnNcbi8vIG91dGVyIHJpbmdzIGFyZSBjbG9ja3dpc2UsIGhvbGVzIGFyZSBjb3VudGVyY2xvY2t3aXNlXG4vLyB1c2VkIGZvciBjb252ZXJ0aW5nIEdlb0pTT04gUG9seWdvbnMgdG8gQXJjR0lTIFBvbHlnb25zXG5mdW5jdGlvbiBvcmllbnRSaW5ncyAocG9seSkge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIHZhciBwb2x5Z29uID0gcG9seS5zbGljZSgwKTtcbiAgdmFyIG91dGVyUmluZyA9IGNsb3NlUmluZyhwb2x5Z29uLnNoaWZ0KCkuc2xpY2UoMCkpO1xuICBpZiAob3V0ZXJSaW5nLmxlbmd0aCA+PSA0KSB7XG4gICAgaWYgKCFyaW5nSXNDbG9ja3dpc2Uob3V0ZXJSaW5nKSkge1xuICAgICAgb3V0ZXJSaW5nLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICBvdXRwdXQucHVzaChvdXRlclJpbmcpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2x5Z29uLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaG9sZSA9IGNsb3NlUmluZyhwb2x5Z29uW2ldLnNsaWNlKDApKTtcbiAgICAgIGlmIChob2xlLmxlbmd0aCA+PSA0KSB7XG4gICAgICAgIGlmIChyaW5nSXNDbG9ja3dpc2UoaG9sZSkpIHtcbiAgICAgICAgICBob2xlLnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXQucHVzaChob2xlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGZsYXR0ZW5zIGhvbGVzIGluIG11bHRpcG9seWdvbnMgdG8gb25lIGFycmF5IG9mIHBvbHlnb25zXG4vLyB1c2VkIGZvciBjb252ZXJ0aW5nIEdlb0pTT04gUG9seWdvbnMgdG8gQXJjR0lTIFBvbHlnb25zXG5mdW5jdGlvbiBmbGF0dGVuTXVsdGlQb2x5Z29uUmluZ3MgKHJpbmdzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByaW5ncy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwb2x5Z29uID0gb3JpZW50UmluZ3MocmluZ3NbaV0pO1xuICAgIGZvciAodmFyIHggPSBwb2x5Z29uLmxlbmd0aCAtIDE7IHggPj0gMDsgeC0tKSB7XG4gICAgICB2YXIgcmluZyA9IHBvbHlnb25beF0uc2xpY2UoMCk7XG4gICAgICBvdXRwdXQucHVzaChyaW5nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuLy8gc2hhbGxvdyBvYmplY3QgY2xvbmUgZm9yIGZlYXR1cmUgcHJvcGVydGllcyBhbmQgYXR0cmlidXRlc1xuLy8gZnJvbSBodHRwOi8vanNwZXJmLmNvbS9jbG9uaW5nLWFuLW9iamVjdC8yXG5mdW5jdGlvbiBzaGFsbG93Q2xvbmUgKG9iaikge1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgdGFyZ2V0W2ldID0gb2JqW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJjZ2lzVG9HZW9KU09OIChhcmNnaXMsIGlkQXR0cmlidXRlKSB7XG4gIHZhciBnZW9qc29uID0ge307XG5cbiAgaWYgKHR5cGVvZiBhcmNnaXMueCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGFyY2dpcy55ID09PSAnbnVtYmVyJykge1xuICAgIGdlb2pzb24udHlwZSA9ICdQb2ludCc7XG4gICAgZ2VvanNvbi5jb29yZGluYXRlcyA9IFthcmNnaXMueCwgYXJjZ2lzLnldO1xuICB9XG5cbiAgaWYgKGFyY2dpcy5wb2ludHMpIHtcbiAgICBnZW9qc29uLnR5cGUgPSAnTXVsdGlQb2ludCc7XG4gICAgZ2VvanNvbi5jb29yZGluYXRlcyA9IGFyY2dpcy5wb2ludHMuc2xpY2UoMCk7XG4gIH1cblxuICBpZiAoYXJjZ2lzLnBhdGhzKSB7XG4gICAgaWYgKGFyY2dpcy5wYXRocy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGdlb2pzb24udHlwZSA9ICdMaW5lU3RyaW5nJztcbiAgICAgIGdlb2pzb24uY29vcmRpbmF0ZXMgPSBhcmNnaXMucGF0aHNbMF0uc2xpY2UoMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlb2pzb24udHlwZSA9ICdNdWx0aUxpbmVTdHJpbmcnO1xuICAgICAgZ2VvanNvbi5jb29yZGluYXRlcyA9IGFyY2dpcy5wYXRocy5zbGljZSgwKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYXJjZ2lzLnJpbmdzKSB7XG4gICAgZ2VvanNvbiA9IGNvbnZlcnRSaW5nc1RvR2VvSlNPTihhcmNnaXMucmluZ3Muc2xpY2UoMCkpO1xuICB9XG5cbiAgaWYgKGFyY2dpcy5nZW9tZXRyeSB8fCBhcmNnaXMuYXR0cmlidXRlcykge1xuICAgIGdlb2pzb24udHlwZSA9ICdGZWF0dXJlJztcbiAgICBnZW9qc29uLmdlb21ldHJ5ID0gKGFyY2dpcy5nZW9tZXRyeSkgPyBhcmNnaXNUb0dlb0pTT04oYXJjZ2lzLmdlb21ldHJ5KSA6IG51bGw7XG4gICAgZ2VvanNvbi5wcm9wZXJ0aWVzID0gKGFyY2dpcy5hdHRyaWJ1dGVzKSA/IHNoYWxsb3dDbG9uZShhcmNnaXMuYXR0cmlidXRlcykgOiBudWxsO1xuICAgIGlmIChhcmNnaXMuYXR0cmlidXRlcykge1xuICAgICAgZ2VvanNvbi5pZCA9IGFyY2dpcy5hdHRyaWJ1dGVzW2lkQXR0cmlidXRlXSB8fCBhcmNnaXMuYXR0cmlidXRlcy5PQkpFQ1RJRCB8fCBhcmNnaXMuYXR0cmlidXRlcy5GSUQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdlb2pzb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9qc29uVG9BcmNHSVMgKGdlb2pzb24sIGlkQXR0cmlidXRlKSB7XG4gIGlkQXR0cmlidXRlID0gaWRBdHRyaWJ1dGUgfHwgJ09CSkVDVElEJztcbiAgdmFyIHNwYXRpYWxSZWZlcmVuY2UgPSB7IHdraWQ6IDQzMjYgfTtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICB2YXIgaTtcblxuICBzd2l0Y2ggKGdlb2pzb24udHlwZSkge1xuICAgIGNhc2UgJ1BvaW50JzpcbiAgICAgIHJlc3VsdC54ID0gZ2VvanNvbi5jb29yZGluYXRlc1swXTtcbiAgICAgIHJlc3VsdC55ID0gZ2VvanNvbi5jb29yZGluYXRlc1sxXTtcbiAgICAgIHJlc3VsdC5zcGF0aWFsUmVmZXJlbmNlID0gc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ011bHRpUG9pbnQnOlxuICAgICAgcmVzdWx0LnBvaW50cyA9IGdlb2pzb24uY29vcmRpbmF0ZXMuc2xpY2UoMCk7XG4gICAgICByZXN1bHQuc3BhdGlhbFJlZmVyZW5jZSA9IHNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdMaW5lU3RyaW5nJzpcbiAgICAgIHJlc3VsdC5wYXRocyA9IFtnZW9qc29uLmNvb3JkaW5hdGVzLnNsaWNlKDApXTtcbiAgICAgIHJlc3VsdC5zcGF0aWFsUmVmZXJlbmNlID0gc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ011bHRpTGluZVN0cmluZyc6XG4gICAgICByZXN1bHQucGF0aHMgPSBnZW9qc29uLmNvb3JkaW5hdGVzLnNsaWNlKDApO1xuICAgICAgcmVzdWx0LnNwYXRpYWxSZWZlcmVuY2UgPSBzcGF0aWFsUmVmZXJlbmNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUG9seWdvbic6XG4gICAgICByZXN1bHQucmluZ3MgPSBvcmllbnRSaW5ncyhnZW9qc29uLmNvb3JkaW5hdGVzLnNsaWNlKDApKTtcbiAgICAgIHJlc3VsdC5zcGF0aWFsUmVmZXJlbmNlID0gc3BhdGlhbFJlZmVyZW5jZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ011bHRpUG9seWdvbic6XG4gICAgICByZXN1bHQucmluZ3MgPSBmbGF0dGVuTXVsdGlQb2x5Z29uUmluZ3MoZ2VvanNvbi5jb29yZGluYXRlcy5zbGljZSgwKSk7XG4gICAgICByZXN1bHQuc3BhdGlhbFJlZmVyZW5jZSA9IHNwYXRpYWxSZWZlcmVuY2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdGZWF0dXJlJzpcbiAgICAgIGlmIChnZW9qc29uLmdlb21ldHJ5KSB7XG4gICAgICAgIHJlc3VsdC5nZW9tZXRyeSA9IGdlb2pzb25Ub0FyY0dJUyhnZW9qc29uLmdlb21ldHJ5LCBpZEF0dHJpYnV0ZSk7XG4gICAgICB9XG4gICAgICByZXN1bHQuYXR0cmlidXRlcyA9IChnZW9qc29uLnByb3BlcnRpZXMpID8gc2hhbGxvd0Nsb25lKGdlb2pzb24ucHJvcGVydGllcykgOiB7fTtcbiAgICAgIGlmIChnZW9qc29uLmlkKSB7XG4gICAgICAgIHJlc3VsdC5hdHRyaWJ1dGVzW2lkQXR0cmlidXRlXSA9IGdlb2pzb24uaWQ7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdGZWF0dXJlQ29sbGVjdGlvbic6XG4gICAgICByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBnZW9qc29uLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGdlb2pzb25Ub0FyY0dJUyhnZW9qc29uLmZlYXR1cmVzW2ldLCBpZEF0dHJpYnV0ZSkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnR2VvbWV0cnlDb2xsZWN0aW9uJzpcbiAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGdlb2pzb24uZ2VvbWV0cmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQucHVzaChnZW9qc29uVG9BcmNHSVMoZ2VvanNvbi5nZW9tZXRyaWVzW2ldLCBpZEF0dHJpYnV0ZSkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBqc29ucCB9IGZyb20gJy4vUmVxdWVzdCc7XG5pbXBvcnQge1xuICBnZW9qc29uVG9BcmNHSVMgYXMgZzJhLFxuICBhcmNnaXNUb0dlb0pTT04gYXMgYTJnXG59IGZyb20gJ2FyY2dpcy10by1nZW9qc29uLXV0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2pzb25Ub0FyY0dJUyAoZ2VvanNvbiwgaWRBdHRyKSB7XG4gIHJldHVybiBnMmEoZ2VvanNvbiwgaWRBdHRyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyY2dpc1RvR2VvSlNPTiAoYXJjZ2lzLCBpZEF0dHIpIHtcbiAgcmV0dXJuIGEyZyhhcmNnaXMsIGlkQXR0cik7XG59XG5cbi8vIHNoYWxsb3cgb2JqZWN0IGNsb25lIGZvciBmZWF0dXJlIHByb3BlcnRpZXMgYW5kIGF0dHJpYnV0ZXNcbi8vIGZyb20gaHR0cDovL2pzcGVyZi5jb20vY2xvbmluZy1hbi1vYmplY3QvMlxuZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dDbG9uZSAob2JqKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbi8vIGNvbnZlcnQgYW4gZXh0ZW50IChBcmNHSVMpIHRvIExhdExuZ0JvdW5kcyAoTGVhZmxldClcbmV4cG9ydCBmdW5jdGlvbiBleHRlbnRUb0JvdW5kcyAoZXh0ZW50KSB7XG4gIHZhciBzdyA9IEwubGF0TG5nKGV4dGVudC55bWluLCBleHRlbnQueG1pbik7XG4gIHZhciBuZSA9IEwubGF0TG5nKGV4dGVudC55bWF4LCBleHRlbnQueG1heCk7XG4gIHJldHVybiBMLmxhdExuZ0JvdW5kcyhzdywgbmUpO1xufVxuXG4vLyBjb252ZXJ0IGFuIExhdExuZ0JvdW5kcyAoTGVhZmxldCkgdG8gZXh0ZW50IChBcmNHSVMpXG5leHBvcnQgZnVuY3Rpb24gYm91bmRzVG9FeHRlbnQgKGJvdW5kcykge1xuICBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhib3VuZHMpO1xuICByZXR1cm4ge1xuICAgICd4bWluJzogYm91bmRzLmdldFNvdXRoV2VzdCgpLmxuZyxcbiAgICAneW1pbic6IGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sYXQsXG4gICAgJ3htYXgnOiBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubG5nLFxuICAgICd5bWF4JzogYm91bmRzLmdldE5vcnRoRWFzdCgpLmxhdCxcbiAgICAnc3BhdGlhbFJlZmVyZW5jZSc6IHtcbiAgICAgICd3a2lkJzogNDMyNlxuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3BvbnNlVG9GZWF0dXJlQ29sbGVjdGlvbiAocmVzcG9uc2UsIGlkQXR0cmlidXRlKSB7XG4gIHZhciBvYmplY3RJZEZpZWxkO1xuXG4gIGlmIChpZEF0dHJpYnV0ZSkge1xuICAgIG9iamVjdElkRmllbGQgPSBpZEF0dHJpYnV0ZTtcbiAgfSBlbHNlIGlmIChyZXNwb25zZS5vYmplY3RJZEZpZWxkTmFtZSkge1xuICAgIG9iamVjdElkRmllbGQgPSByZXNwb25zZS5vYmplY3RJZEZpZWxkTmFtZTtcbiAgfSBlbHNlIGlmIChyZXNwb25zZS5maWVsZHMpIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8PSByZXNwb25zZS5maWVsZHMubGVuZ3RoIC0gMTsgaisrKSB7XG4gICAgICBpZiAocmVzcG9uc2UuZmllbGRzW2pdLnR5cGUgPT09ICdlc3JpRmllbGRUeXBlT0lEJykge1xuICAgICAgICBvYmplY3RJZEZpZWxkID0gcmVzcG9uc2UuZmllbGRzW2pdLm5hbWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBvYmplY3RJZEZpZWxkID0gJ09CSkVDVElEJztcbiAgfVxuXG4gIHZhciBmZWF0dXJlQ29sbGVjdGlvbiA9IHtcbiAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgIGZlYXR1cmVzOiBbXVxuICB9O1xuICB2YXIgZmVhdHVyZXMgPSByZXNwb25zZS5mZWF0dXJlcyB8fCByZXNwb25zZS5yZXN1bHRzO1xuICBpZiAoZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IGZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZmVhdHVyZSA9IGFyY2dpc1RvR2VvSlNPTihmZWF0dXJlc1tpXSwgb2JqZWN0SWRGaWVsZCk7XG4gICAgICBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbjtcbn1cblxuICAvLyB0cmltIHVybCB3aGl0ZXNwYWNlIGFuZCBhZGQgYSB0cmFpbGluZyBzbGFzaCBpZiBuZWVkZWRcbmV4cG9ydCBmdW5jdGlvbiBjbGVhblVybCAodXJsKSB7XG4gIC8vIHRyaW0gbGVhZGluZyBhbmQgdHJhaWxpbmcgc3BhY2VzLCBidXQgbm90IHNwYWNlcyBpbnNpZGUgdGhlIHVybFxuICB1cmwgPSBMLlV0aWwudHJpbSh1cmwpO1xuXG4gIC8vIGFkZCBhIHRyYWlsaW5nIHNsYXNoIHRvIHRoZSB1cmwgaWYgdGhlIHVzZXIgb21pdHRlZCBpdFxuICBpZiAodXJsW3VybC5sZW5ndGggLSAxXSAhPT0gJy8nKSB7XG4gICAgdXJsICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FyY2dpc09ubGluZSAodXJsKSB7XG4gIC8qIGhvc3RlZCBmZWF0dXJlIHNlcnZpY2VzIGNhbiBlbWl0IGdlb2pzb24gbmF0aXZlbHkuICovXG4gIHJldHVybiAoL1xcLmFyY2dpc1xcLmNvbS4qP0ZlYXR1cmVTZXJ2ZXIvZykudGVzdCh1cmwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VvanNvblR5cGVUb0FyY0dJUyAoZ2VvSnNvblR5cGUpIHtcbiAgdmFyIGFyY2dpc0dlb21ldHJ5VHlwZTtcbiAgc3dpdGNoIChnZW9Kc29uVHlwZSkge1xuICAgIGNhc2UgJ1BvaW50JzpcbiAgICAgIGFyY2dpc0dlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2ludCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aVBvaW50JzpcbiAgICAgIGFyY2dpc0dlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlNdWx0aXBvaW50JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxuICAgICAgYXJjZ2lzR2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvbHlsaW5lJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ011bHRpTGluZVN0cmluZyc6XG4gICAgICBhcmNnaXNHZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9seWxpbmUnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUG9seWdvbic6XG4gICAgICBhcmNnaXNHZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9seWdvbic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxuICAgICAgYXJjZ2lzR2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeVBvbHlnb24nO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gYXJjZ2lzR2VvbWV0cnlUeXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FybiAoKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2Fybikge1xuICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfZ2V0QXR0cmlidXRpb25EYXRhICh1cmwsIG1hcCkge1xuICBqc29ucCh1cmwsIHt9LCBMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIGF0dHJpYnV0aW9ucykge1xuICAgIGlmIChlcnJvcikgeyByZXR1cm47IH1cbiAgICBtYXAuX2VzcmlBdHRyaWJ1dGlvbnMgPSBbXTtcbiAgICBmb3IgKHZhciBjID0gMDsgYyA8IGF0dHJpYnV0aW9ucy5jb250cmlidXRvcnMubGVuZ3RoOyBjKyspIHtcbiAgICAgIHZhciBjb250cmlidXRvciA9IGF0dHJpYnV0aW9ucy5jb250cmlidXRvcnNbY107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udHJpYnV0b3IuY292ZXJhZ2VBcmVhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY292ZXJhZ2VBcmVhID0gY29udHJpYnV0b3IuY292ZXJhZ2VBcmVhc1tpXTtcbiAgICAgICAgdmFyIHNvdXRoV2VzdCA9IEwubGF0TG5nKGNvdmVyYWdlQXJlYS5iYm94WzBdLCBjb3ZlcmFnZUFyZWEuYmJveFsxXSk7XG4gICAgICAgIHZhciBub3J0aEVhc3QgPSBMLmxhdExuZyhjb3ZlcmFnZUFyZWEuYmJveFsyXSwgY292ZXJhZ2VBcmVhLmJib3hbM10pO1xuICAgICAgICBtYXAuX2VzcmlBdHRyaWJ1dGlvbnMucHVzaCh7XG4gICAgICAgICAgYXR0cmlidXRpb246IGNvbnRyaWJ1dG9yLmF0dHJpYnV0aW9uLFxuICAgICAgICAgIHNjb3JlOiBjb3ZlcmFnZUFyZWEuc2NvcmUsXG4gICAgICAgICAgYm91bmRzOiBMLmxhdExuZ0JvdW5kcyhzb3V0aFdlc3QsIG5vcnRoRWFzdCksXG4gICAgICAgICAgbWluWm9vbTogY292ZXJhZ2VBcmVhLnpvb21NaW4sXG4gICAgICAgICAgbWF4Wm9vbTogY292ZXJhZ2VBcmVhLnpvb21NYXhcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWFwLl9lc3JpQXR0cmlidXRpb25zLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZTtcbiAgICB9KTtcblxuICAgIC8vIHBhc3MgdGhlIHNhbWUgYXJndW1lbnQgYXMgdGhlIG1hcCdzICdtb3ZlZW5kJyBldmVudFxuICAgIHZhciBvYmogPSB7IHRhcmdldDogbWFwIH07XG4gICAgdGhpcy5fdXBkYXRlTWFwQXR0cmlidXRpb24ob2JqKTtcbiAgfSwgdGhpcykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX3VwZGF0ZU1hcEF0dHJpYnV0aW9uIChldnQpIHtcbiAgdmFyIG1hcCA9IGV2dC50YXJnZXQ7XG4gIHZhciBvbGRBdHRyaWJ1dGlvbnMgPSBtYXAuX2VzcmlBdHRyaWJ1dGlvbnM7XG5cbiAgaWYgKG1hcCAmJiBtYXAuYXR0cmlidXRpb25Db250cm9sICYmIG9sZEF0dHJpYnV0aW9ucykge1xuICAgIHZhciBuZXdBdHRyaWJ1dGlvbnMgPSAnJztcbiAgICB2YXIgYm91bmRzID0gbWFwLmdldEJvdW5kcygpO1xuICAgIHZhciB3cmFwcGVkQm91bmRzID0gTC5sYXRMbmdCb3VuZHMoXG4gICAgICBib3VuZHMuZ2V0U291dGhXZXN0KCkud3JhcCgpLFxuICAgICAgYm91bmRzLmdldE5vcnRoRWFzdCgpLndyYXAoKVxuICAgICk7XG4gICAgdmFyIHpvb20gPSBtYXAuZ2V0Wm9vbSgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbGRBdHRyaWJ1dGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBhdHRyaWJ1dGlvbiA9IG9sZEF0dHJpYnV0aW9uc1tpXTtcbiAgICAgIHZhciB0ZXh0ID0gYXR0cmlidXRpb24uYXR0cmlidXRpb247XG5cbiAgICAgIGlmICghbmV3QXR0cmlidXRpb25zLm1hdGNoKHRleHQpICYmIGF0dHJpYnV0aW9uLmJvdW5kcy5pbnRlcnNlY3RzKHdyYXBwZWRCb3VuZHMpICYmIHpvb20gPj0gYXR0cmlidXRpb24ubWluWm9vbSAmJiB6b29tIDw9IGF0dHJpYnV0aW9uLm1heFpvb20pIHtcbiAgICAgICAgbmV3QXR0cmlidXRpb25zICs9ICgnLCAnICsgdGV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbmV3QXR0cmlidXRpb25zID0gbmV3QXR0cmlidXRpb25zLnN1YnN0cigyKTtcbiAgICB2YXIgYXR0cmlidXRpb25FbGVtZW50ID0gbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5fY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5lc3JpLWF0dHJpYnV0aW9ucycpO1xuXG4gICAgYXR0cmlidXRpb25FbGVtZW50LmlubmVySFRNTCA9IG5ld0F0dHJpYnV0aW9ucztcbiAgICBhdHRyaWJ1dGlvbkVsZW1lbnQuc3R5bGUubWF4V2lkdGggPSBjYWxjQXR0cmlidXRpb25XaWR0aChtYXApO1xuXG4gICAgbWFwLmZpcmUoJ2F0dHJpYnV0aW9udXBkYXRlZCcsIHtcbiAgICAgIGF0dHJpYnV0aW9uOiBuZXdBdHRyaWJ1dGlvbnNcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY0F0dHJpYnV0aW9uV2lkdGggKG1hcCkge1xuICAvLyB0aGUgZXh0cmEgMTYwIHBpeGVscyBhcmUgZm9yIHRoZSBwcmVmaXggYXR0cmlidXRpb24gYW5kIGVsbGlwc2lzXG4gIHJldHVybiAobWFwLmdldFNpemUoKS54IC0gMTYwKSArICdweCc7XG59XG5cbmV4cG9ydCB2YXIgVXRpbCA9IHtcbiAgc2hhbGxvd0Nsb25lOiBzaGFsbG93Q2xvbmUsXG4gIHdhcm46IHdhcm4sXG4gIGNsZWFuVXJsOiBjbGVhblVybCxcbiAgaXNBcmNnaXNPbmxpbmU6IGlzQXJjZ2lzT25saW5lLFxuICBnZW9qc29uVHlwZVRvQXJjR0lTOiBnZW9qc29uVHlwZVRvQXJjR0lTLFxuICByZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb246IHJlc3BvbnNlVG9GZWF0dXJlQ29sbGVjdGlvbixcbiAgZ2VvanNvblRvQXJjR0lTOiBnZW9qc29uVG9BcmNHSVMsXG4gIGFyY2dpc1RvR2VvSlNPTjogYXJjZ2lzVG9HZW9KU09OLFxuICBib3VuZHNUb0V4dGVudDogYm91bmRzVG9FeHRlbnQsXG4gIGV4dGVudFRvQm91bmRzOiBleHRlbnRUb0JvdW5kcyxcbiAgX2dldEF0dHJpYnV0aW9uRGF0YTogX2dldEF0dHJpYnV0aW9uRGF0YSxcbiAgX3VwZGF0ZU1hcEF0dHJpYnV0aW9uOiBfdXBkYXRlTWFwQXR0cmlidXRpb24sXG4gIGNhbGNBdHRyaWJ1dGlvbldpZHRoOiBjYWxjQXR0cmlidXRpb25XaWR0aFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbDtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHtjb3JzfSBmcm9tICcuLi9TdXBwb3J0JztcbmltcG9ydCB7Y2xlYW5Vcmx9IGZyb20gJy4uL1V0aWwnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vUmVxdWVzdCc7XG5cbmV4cG9ydCB2YXIgVGFzayA9IEwuQ2xhc3MuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgcHJveHk6IGZhbHNlLFxuICAgIHVzZUNvcnM6IGNvcnNcbiAgfSxcblxuICAvLyBHZW5lcmF0ZSBhIG1ldGhvZCBmb3IgZWFjaCBtZXRob2ROYW1lOnBhcmFtTmFtZSBpbiB0aGUgc2V0dGVycyBmb3IgdGhpcyB0YXNrLlxuICBnZW5lcmF0ZVNldHRlcjogZnVuY3Rpb24gKHBhcmFtLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIEwuVXRpbC5iaW5kKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy5wYXJhbXNbcGFyYW1dID0gdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoZW5kcG9pbnQpIHtcbiAgICAvLyBlbmRwb2ludCBjYW4gYmUgZWl0aGVyIGEgdXJsIChhbmQgb3B0aW9ucykgZm9yIGFuIEFyY0dJUyBSZXN0IFNlcnZpY2Ugb3IgYW4gaW5zdGFuY2Ugb2YgRXNyaUxlYWZsZXQuU2VydmljZVxuICAgIGlmIChlbmRwb2ludC5yZXF1ZXN0ICYmIGVuZHBvaW50Lm9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UgPSBlbmRwb2ludDtcbiAgICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIGVuZHBvaW50Lm9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBlbmRwb2ludCk7XG4gICAgICB0aGlzLm9wdGlvbnMudXJsID0gY2xlYW5VcmwoZW5kcG9pbnQudXJsKTtcbiAgICB9XG5cbiAgICAvLyBjbG9uZSBkZWZhdWx0IHBhcmFtcyBpbnRvIHRoaXMgb2JqZWN0XG4gICAgdGhpcy5wYXJhbXMgPSBMLlV0aWwuZXh0ZW5kKHt9LCB0aGlzLnBhcmFtcyB8fCB7fSk7XG5cbiAgICAvLyBnZW5lcmF0ZSBzZXR0ZXIgbWV0aG9kcyBiYXNlZCBvbiB0aGUgc2V0dGVycyBvYmplY3QgaW1wbGltZW50ZWQgYSBjaGlsZCBjbGFzc1xuICAgIGlmICh0aGlzLnNldHRlcnMpIHtcbiAgICAgIGZvciAodmFyIHNldHRlciBpbiB0aGlzLnNldHRlcnMpIHtcbiAgICAgICAgdmFyIHBhcmFtID0gdGhpcy5zZXR0ZXJzW3NldHRlcl07XG4gICAgICAgIHRoaXNbc2V0dGVyXSA9IHRoaXMuZ2VuZXJhdGVTZXR0ZXIocGFyYW0sIHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB0b2tlbjogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgaWYgKHRoaXMuX3NlcnZpY2UpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuYXV0aGVudGljYXRlKHRva2VuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJhbXMudG9rZW4gPSB0b2tlbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcmVxdWVzdDogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKHRoaXMuX3NlcnZpY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlLnJlcXVlc3QodGhpcy5wYXRoLCB0aGlzLnBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdyZXF1ZXN0JywgdGhpcy5wYXRoLCB0aGlzLnBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9LFxuXG4gIF9yZXF1ZXN0OiBmdW5jdGlvbiAobWV0aG9kLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdmFyIHVybCA9ICh0aGlzLm9wdGlvbnMucHJveHkpID8gdGhpcy5vcHRpb25zLnByb3h5ICsgJz8nICsgdGhpcy5vcHRpb25zLnVybCArIHBhdGggOiB0aGlzLm9wdGlvbnMudXJsICsgcGF0aDtcblxuICAgIGlmICgobWV0aG9kID09PSAnZ2V0JyB8fCBtZXRob2QgPT09ICdyZXF1ZXN0JykgJiYgIXRoaXMub3B0aW9ucy51c2VDb3JzKSB7XG4gICAgICByZXR1cm4gUmVxdWVzdC5nZXQuSlNPTlAodXJsLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVxdWVzdFttZXRob2RdKHVybCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gdGFzayAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IFRhc2sob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRhc2s7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFRhc2sgfSBmcm9tICcuL1Rhc2snO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbCc7XG5cbmV4cG9ydCB2YXIgUXVlcnkgPSBUYXNrLmV4dGVuZCh7XG4gIHNldHRlcnM6IHtcbiAgICAnb2Zmc2V0JzogJ3Jlc3VsdE9mZnNldCcsXG4gICAgJ2xpbWl0JzogJ3Jlc3VsdFJlY29yZENvdW50JyxcbiAgICAnZmllbGRzJzogJ291dEZpZWxkcycsXG4gICAgJ3ByZWNpc2lvbic6ICdnZW9tZXRyeVByZWNpc2lvbicsXG4gICAgJ2ZlYXR1cmVJZHMnOiAnb2JqZWN0SWRzJyxcbiAgICAncmV0dXJuR2VvbWV0cnknOiAncmV0dXJuR2VvbWV0cnknLFxuICAgICd0b2tlbic6ICd0b2tlbidcbiAgfSxcblxuICBwYXRoOiAncXVlcnknLFxuXG4gIHBhcmFtczoge1xuICAgIHJldHVybkdlb21ldHJ5OiB0cnVlLFxuICAgIHdoZXJlOiAnMT0xJyxcbiAgICBvdXRTcjogNDMyNixcbiAgICBvdXRGaWVsZHM6ICcqJ1xuICB9LFxuXG4gIHdpdGhpbjogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnkoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxDb250YWlucyc7IC8vIHdpbGwgbWFrZSBjb2RlIHJlYWQgbGF5ZXIgd2l0aGluIGdlb21ldHJ5LCB0byB0aGUgYXBpIHRoaXMgd2lsbCByZWFkcyBnZW9tZXRyeSBjb250YWlucyBsYXllclxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGludGVyc2VjdHM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5KGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsSW50ZXJzZWN0cyc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgY29udGFpbnM6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMuX3NldEdlb21ldHJ5KGdlb21ldHJ5KTtcbiAgICB0aGlzLnBhcmFtcy5zcGF0aWFsUmVsID0gJ2VzcmlTcGF0aWFsUmVsV2l0aGluJzsgLy8gd2lsbCBtYWtlIGNvZGUgcmVhZCBsYXllciBjb250YWlucyBnZW9tZXRyeSwgdG8gdGhlIGFwaSB0aGlzIHdpbGwgcmVhZHMgZ2VvbWV0cnkgd2l0aGluIGxheWVyXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgY3Jvc3NlczogZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgdGhpcy5fc2V0R2VvbWV0cnkoZ2VvbWV0cnkpO1xuICAgIHRoaXMucGFyYW1zLnNwYXRpYWxSZWwgPSAnZXNyaVNwYXRpYWxSZWxDcm9zc2VzJztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICB0b3VjaGVzOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeShnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbFRvdWNoZXMnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG92ZXJsYXBzOiBmdW5jdGlvbiAoZ2VvbWV0cnkpIHtcbiAgICB0aGlzLl9zZXRHZW9tZXRyeShnZW9tZXRyeSk7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbE92ZXJsYXBzJztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBvbmx5IHZhbGlkIGZvciBGZWF0dXJlIFNlcnZpY2VzIHJ1bm5pbmcgb24gQXJjR0lTIFNlcnZlciAxMC4zIG9yIEFyY0dJUyBPbmxpbmVcbiAgbmVhcmJ5OiBmdW5jdGlvbiAobGF0bG5nLCByYWRpdXMpIHtcbiAgICBsYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gW2xhdGxuZy5sbmcsIGxhdGxuZy5sYXRdO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5VHlwZSA9ICdlc3JpR2VvbWV0cnlQb2ludCc7XG4gICAgdGhpcy5wYXJhbXMuc3BhdGlhbFJlbCA9ICdlc3JpU3BhdGlhbFJlbEludGVyc2VjdHMnO1xuICAgIHRoaXMucGFyYW1zLnVuaXRzID0gJ2VzcmlTUlVuaXRfTWV0ZXInO1xuICAgIHRoaXMucGFyYW1zLmRpc3RhbmNlID0gcmFkaXVzO1xuICAgIHRoaXMucGFyYW1zLmluU3IgPSA0MzI2O1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHdoZXJlOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgLy8gaW5zdGVhZCBvZiBjb252ZXJ0aW5nIGRvdWJsZS1xdW90ZXMgdG8gc2luZ2xlIHF1b3RlcywgcGFzcyBhcyBpcywgYW5kIHByb3ZpZGUgYSBtb3JlIGluZm9ybWF0aXZlIG1lc3NhZ2UgaWYgYSA0MDAgaXMgZW5jb3VudGVyZWRcbiAgICB0aGlzLnBhcmFtcy53aGVyZSA9IHN0cmluZztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBiZXR3ZWVuOiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgIHRoaXMucGFyYW1zLnRpbWUgPSBbc3RhcnQudmFsdWVPZigpLCBlbmQudmFsdWVPZigpXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBzaW1wbGlmeTogZnVuY3Rpb24gKG1hcCwgZmFjdG9yKSB7XG4gICAgdmFyIG1hcFdpZHRoID0gTWF0aC5hYnMobWFwLmdldEJvdW5kcygpLmdldFdlc3QoKSAtIG1hcC5nZXRCb3VuZHMoKS5nZXRFYXN0KCkpO1xuICAgIHRoaXMucGFyYW1zLm1heEFsbG93YWJsZU9mZnNldCA9IChtYXBXaWR0aCAvIG1hcC5nZXRTaXplKCkueSkgKiBmYWN0b3I7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb3JkZXJCeTogZnVuY3Rpb24gKGZpZWxkTmFtZSwgb3JkZXIpIHtcbiAgICBvcmRlciA9IG9yZGVyIHx8ICdBU0MnO1xuICAgIHRoaXMucGFyYW1zLm9yZGVyQnlGaWVsZHMgPSAodGhpcy5wYXJhbXMub3JkZXJCeUZpZWxkcykgPyB0aGlzLnBhcmFtcy5vcmRlckJ5RmllbGRzICsgJywnIDogJyc7XG4gICAgdGhpcy5wYXJhbXMub3JkZXJCeUZpZWxkcyArPSAoW2ZpZWxkTmFtZSwgb3JkZXJdKS5qb2luKCcgJyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcnVuOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jbGVhblBhcmFtcygpO1xuXG4gICAgLy8gc2VydmljZXMgaG9zdGVkIG9uIEFyY0dJUyBPbmxpbmUgYWxzbyBzdXBwb3J0IHJlcXVlc3RpbmcgZ2VvanNvbiBkaXJlY3RseVxuICAgIGlmICh0aGlzLm9wdGlvbnMuaXNNb2Rlcm4gfHwgVXRpbC5pc0FyY2dpc09ubGluZSh0aGlzLm9wdGlvbnMudXJsKSkge1xuICAgICAgdGhpcy5wYXJhbXMuZiA9ICdnZW9qc29uJztcblxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuX3RyYXBTUUxlcnJvcnMoZXJyb3IpO1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSwgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyk7XG5cbiAgICAvLyBvdGhlcndpc2UgY29udmVydCBpdCBpbiB0aGUgY2FsbGJhY2sgdGhlbiBwYXNzIGl0IG9uXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgICB0aGlzLl90cmFwU1FMZXJyb3JzKGVycm9yKTtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgKHJlc3BvbnNlICYmIFV0aWwucmVzcG9uc2VUb0ZlYXR1cmVDb2xsZWN0aW9uKHJlc3BvbnNlKSksIHJlc3BvbnNlKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgfSxcblxuICBjb3VudDogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fY2xlYW5QYXJhbXMoKTtcbiAgICB0aGlzLnBhcmFtcy5yZXR1cm5Db3VudE9ubHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBlcnJvciwgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmNvdW50KSwgcmVzcG9uc2UpO1xuICAgIH0sIGNvbnRleHQpO1xuICB9LFxuXG4gIGlkczogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fY2xlYW5QYXJhbXMoKTtcbiAgICB0aGlzLnBhcmFtcy5yZXR1cm5JZHNPbmx5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZXJyb3IsIChyZXNwb25zZSAmJiByZXNwb25zZS5vYmplY3RJZHMpLCByZXNwb25zZSk7XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgLy8gb25seSB2YWxpZCBmb3IgRmVhdHVyZSBTZXJ2aWNlcyBydW5uaW5nIG9uIEFyY0dJUyBTZXJ2ZXIgMTAuMyBvciBBcmNHSVMgT25saW5lXG4gIGJvdW5kczogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fY2xlYW5QYXJhbXMoKTtcbiAgICB0aGlzLnBhcmFtcy5yZXR1cm5FeHRlbnRPbmx5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIChyZXNwb25zZSAmJiByZXNwb25zZS5leHRlbnQgJiYgVXRpbC5leHRlbnRUb0JvdW5kcyhyZXNwb25zZS5leHRlbnQpKSwgcmVzcG9uc2UpO1xuICAgIH0sIGNvbnRleHQpO1xuICB9LFxuXG4gIC8vIG9ubHkgdmFsaWQgZm9yIGltYWdlIHNlcnZpY2VzXG4gIHBpeGVsU2l6ZTogZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgcG9pbnQgPSBMLnBvaW50KHBvaW50KTtcbiAgICB0aGlzLnBhcmFtcy5waXhlbFNpemUgPSBbcG9pbnQueCwgcG9pbnQueV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8gb25seSB2YWxpZCBmb3IgbWFwIHNlcnZpY2VzXG4gIGxheWVyOiBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICB0aGlzLnBhdGggPSBsYXllciArICcvcXVlcnknO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIF90cmFwU1FMZXJyb3JzOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvci5jb2RlID09PSAnNDAwJykge1xuICAgICAgICBVdGlsLndhcm4oJ29uZSBjb21tb24gc3ludGF4IGVycm9yIGluIHF1ZXJ5IHJlcXVlc3RzIGlzIGVuY2FzaW5nIHN0cmluZyB2YWx1ZXMgaW4gZG91YmxlIHF1b3RlcyBpbnN0ZWFkIG9mIHNpbmdsZSBxdW90ZXMnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX2NsZWFuUGFyYW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgZGVsZXRlIHRoaXMucGFyYW1zLnJldHVybklkc09ubHk7XG4gICAgZGVsZXRlIHRoaXMucGFyYW1zLnJldHVybkV4dGVudE9ubHk7XG4gICAgZGVsZXRlIHRoaXMucGFyYW1zLnJldHVybkNvdW50T25seTtcbiAgfSxcblxuICBfc2V0R2VvbWV0cnk6IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xuICAgIHRoaXMucGFyYW1zLmluU3IgPSA0MzI2O1xuXG4gICAgLy8gY29udmVydCBib3VuZHMgdG8gZXh0ZW50IGFuZCBmaW5pc2hcbiAgICBpZiAoZ2VvbWV0cnkgaW5zdGFuY2VvZiBMLkxhdExuZ0JvdW5kcykge1xuICAgICAgLy8gc2V0IGdlb21ldHJ5ICsgZ2VvbWV0cnlUeXBlXG4gICAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeSA9IFV0aWwuYm91bmRzVG9FeHRlbnQoZ2VvbWV0cnkpO1xuICAgICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnlUeXBlID0gJ2VzcmlHZW9tZXRyeUVudmVsb3BlJztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb252ZXJ0IEwuTWFya2VyID4gTC5MYXRMbmdcbiAgICBpZiAoZ2VvbWV0cnkuZ2V0TGF0TG5nKSB7XG4gICAgICBnZW9tZXRyeSA9IGdlb21ldHJ5LmdldExhdExuZygpO1xuICAgIH1cblxuICAgIC8vIGNvbnZlcnQgTC5MYXRMbmcgdG8gYSBnZW9qc29uIHBvaW50IGFuZCBjb250aW51ZTtcbiAgICBpZiAoZ2VvbWV0cnkgaW5zdGFuY2VvZiBMLkxhdExuZykge1xuICAgICAgZ2VvbWV0cnkgPSB7XG4gICAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbZ2VvbWV0cnkubG5nLCBnZW9tZXRyeS5sYXRdXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBMLkdlb0pTT04sIHB1bGwgb3V0IHRoZSBmaXJzdCBnZW9tZXRyeVxuICAgIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIEwuR2VvSlNPTikge1xuICAgICAgLy8gcmVhc3NpZ24gZ2VvbWV0cnkgdG8gdGhlIEdlb0pTT04gdmFsdWUgICh3ZSBhcmUgYXNzdW1pbmcgdGhhdCBvbmx5IG9uZSBmZWF0dXJlIGlzIHByZXNlbnQpXG4gICAgICBnZW9tZXRyeSA9IGdlb21ldHJ5LmdldExheWVycygpWzBdLmZlYXR1cmUuZ2VvbWV0cnk7XG4gICAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeSA9IFV0aWwuZ2VvanNvblRvQXJjR0lTKGdlb21ldHJ5KTtcbiAgICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5VHlwZSA9IFV0aWwuZ2VvanNvblR5cGVUb0FyY0dJUyhnZW9tZXRyeS50eXBlKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgTC5Qb2x5bGluZSBhbmQgTC5Qb2x5Z29uXG4gICAgaWYgKGdlb21ldHJ5LnRvR2VvSlNPTikge1xuICAgICAgZ2VvbWV0cnkgPSBnZW9tZXRyeS50b0dlb0pTT04oKTtcbiAgICB9XG5cbiAgICAvLyBoYW5kbGUgR2VvSlNPTiBmZWF0dXJlIGJ5IHB1bGxpbmcgb3V0IHRoZSBnZW9tZXRyeVxuICAgIGlmIChnZW9tZXRyeS50eXBlID09PSAnRmVhdHVyZScpIHtcbiAgICAgIC8vIGdldCB0aGUgZ2VvbWV0cnkgb2YgdGhlIGdlb2pzb24gZmVhdHVyZVxuICAgICAgZ2VvbWV0cnkgPSBnZW9tZXRyeS5nZW9tZXRyeTtcbiAgICB9XG5cbiAgICAvLyBjb25maXJtIHRoYXQgb3VyIEdlb0pTT04gaXMgYSBwb2ludCwgbGluZSBvciBwb2x5Z29uXG4gICAgaWYgKGdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcgfHwgZ2VvbWV0cnkudHlwZSA9PT0gJ0xpbmVTdHJpbmcnIHx8IGdlb21ldHJ5LnR5cGUgPT09ICdQb2x5Z29uJykge1xuICAgICAgdGhpcy5wYXJhbXMuZ2VvbWV0cnkgPSBVdGlsLmdlb2pzb25Ub0FyY0dJUyhnZW9tZXRyeSk7XG4gICAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeVR5cGUgPSBVdGlsLmdlb2pzb25UeXBlVG9BcmNHSVMoZ2VvbWV0cnkudHlwZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gd2FybiB0aGUgdXNlciBpZiB3ZSBoYXZuJ3QgZm91bmQgYW4gYXBwcm9wcmlhdGUgb2JqZWN0XG4gICAgVXRpbC53YXJuKCdpbnZhbGlkIGdlb21ldHJ5IHBhc3NlZCB0byBzcGF0aWFsIHF1ZXJ5LiBTaG91bGQgYmUgYW4gTC5MYXRMbmcsIEwuTGF0TG5nQm91bmRzIG9yIEwuTWFya2VyIG9yIGEgR2VvSlNPTiBQb2ludCBMaW5lIG9yIFBvbHlnb24gb2JqZWN0Jyk7XG5cbiAgICByZXR1cm47XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcXVlcnkgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBRdWVyeShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcXVlcnk7XG4iLCJpbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi9UYXNrJztcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWwnO1xuXG5leHBvcnQgdmFyIEZpbmQgPSBUYXNrLmV4dGVuZCh7XG4gIHNldHRlcnM6IHtcbiAgICAvLyBtZXRob2QgbmFtZSA+IHBhcmFtIG5hbWVcbiAgICAnY29udGFpbnMnOiAnY29udGFpbnMnLFxuICAgICd0ZXh0JzogJ3NlYXJjaFRleHQnLFxuICAgICdmaWVsZHMnOiAnc2VhcmNoRmllbGRzJywgLy8gZGVub3RlIGFuIGFycmF5IG9yIHNpbmdsZSBzdHJpbmdcbiAgICAnc3BhdGlhbFJlZmVyZW5jZSc6ICdzcicsXG4gICAgJ3NyJzogJ3NyJyxcbiAgICAnbGF5ZXJzJzogJ2xheWVycycsXG4gICAgJ3JldHVybkdlb21ldHJ5JzogJ3JldHVybkdlb21ldHJ5JyxcbiAgICAnbWF4QWxsb3dhYmxlT2Zmc2V0JzogJ21heEFsbG93YWJsZU9mZnNldCcsXG4gICAgJ3ByZWNpc2lvbic6ICdnZW9tZXRyeVByZWNpc2lvbicsXG4gICAgJ2R5bmFtaWNMYXllcnMnOiAnZHluYW1pY0xheWVycycsXG4gICAgJ3JldHVyblonOiAncmV0dXJuWicsXG4gICAgJ3JldHVybk0nOiAncmV0dXJuTScsXG4gICAgJ2dkYlZlcnNpb24nOiAnZ2RiVmVyc2lvbicsXG4gICAgJ3Rva2VuJzogJ3Rva2VuJ1xuICB9LFxuXG4gIHBhdGg6ICdmaW5kJyxcblxuICBwYXJhbXM6IHtcbiAgICBzcjogNDMyNixcbiAgICBjb250YWluczogdHJ1ZSxcbiAgICByZXR1cm5HZW9tZXRyeTogdHJ1ZSxcbiAgICByZXR1cm5aOiB0cnVlLFxuICAgIHJldHVybk06IGZhbHNlXG4gIH0sXG5cbiAgbGF5ZXJEZWZzOiBmdW5jdGlvbiAoaWQsIHdoZXJlKSB7XG4gICAgdGhpcy5wYXJhbXMubGF5ZXJEZWZzID0gKHRoaXMucGFyYW1zLmxheWVyRGVmcykgPyB0aGlzLnBhcmFtcy5sYXllckRlZnMgKyAnOycgOiAnJztcbiAgICB0aGlzLnBhcmFtcy5sYXllckRlZnMgKz0gKFtpZCwgd2hlcmVdKS5qb2luKCc6Jyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2ltcGxpZnk6IGZ1bmN0aW9uIChtYXAsIGZhY3Rvcikge1xuICAgIHZhciBtYXBXaWR0aCA9IE1hdGguYWJzKG1hcC5nZXRCb3VuZHMoKS5nZXRXZXN0KCkgLSBtYXAuZ2V0Qm91bmRzKCkuZ2V0RWFzdCgpKTtcbiAgICB0aGlzLnBhcmFtcy5tYXhBbGxvd2FibGVPZmZzZXQgPSAobWFwV2lkdGggLyBtYXAuZ2V0U2l6ZSgpLnkpICogZmFjdG9yO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCAocmVzcG9uc2UgJiYgVXRpbC5yZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24ocmVzcG9uc2UpKSwgcmVzcG9uc2UpO1xuICAgIH0sIGNvbnRleHQpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBGaW5kKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmaW5kO1xuIiwiaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vVGFzayc7XG5cbmV4cG9ydCB2YXIgSWRlbnRpZnkgPSBUYXNrLmV4dGVuZCh7XG4gIHBhdGg6ICdpZGVudGlmeScsXG5cbiAgYmV0d2VlbjogZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICB0aGlzLnBhcmFtcy50aW1lID0gW3N0YXJ0LnZhbHVlT2YoKSwgZW5kLnZhbHVlT2YoKV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpZnkgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBJZGVudGlmeShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaWRlbnRpZnk7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IElkZW50aWZ5IH0gZnJvbSAnLi9JZGVudGlmeSc7XG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBJZGVudGlmeUZlYXR1cmVzID0gSWRlbnRpZnkuZXh0ZW5kKHtcbiAgc2V0dGVyczoge1xuICAgICdsYXllcnMnOiAnbGF5ZXJzJyxcbiAgICAncHJlY2lzaW9uJzogJ2dlb21ldHJ5UHJlY2lzaW9uJyxcbiAgICAndG9sZXJhbmNlJzogJ3RvbGVyYW5jZScsXG4gICAgJ3JldHVybkdlb21ldHJ5JzogJ3JldHVybkdlb21ldHJ5J1xuICB9LFxuXG4gIHBhcmFtczoge1xuICAgIHNyOiA0MzI2LFxuICAgIGxheWVyczogJ2FsbCcsXG4gICAgdG9sZXJhbmNlOiAzLFxuICAgIHJldHVybkdlb21ldHJ5OiB0cnVlXG4gIH0sXG5cbiAgb246IGZ1bmN0aW9uIChtYXApIHtcbiAgICB2YXIgZXh0ZW50ID0gVXRpbC5ib3VuZHNUb0V4dGVudChtYXAuZ2V0Qm91bmRzKCkpO1xuICAgIHZhciBzaXplID0gbWFwLmdldFNpemUoKTtcbiAgICB0aGlzLnBhcmFtcy5pbWFnZURpc3BsYXkgPSBbc2l6ZS54LCBzaXplLnksIDk2XTtcbiAgICB0aGlzLnBhcmFtcy5tYXBFeHRlbnQgPSBbZXh0ZW50LnhtaW4sIGV4dGVudC55bWluLCBleHRlbnQueG1heCwgZXh0ZW50LnltYXhdO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGF0OiBmdW5jdGlvbiAobGF0bG5nKSB7XG4gICAgbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcbiAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeSA9IFtsYXRsbmcubG5nLCBsYXRsbmcubGF0XTtcbiAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9pbnQnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGxheWVyRGVmOiBmdW5jdGlvbiAoaWQsIHdoZXJlKSB7XG4gICAgdGhpcy5wYXJhbXMubGF5ZXJEZWZzID0gKHRoaXMucGFyYW1zLmxheWVyRGVmcykgPyB0aGlzLnBhcmFtcy5sYXllckRlZnMgKyAnOycgOiAnJztcbiAgICB0aGlzLnBhcmFtcy5sYXllckRlZnMgKz0gKFtpZCwgd2hlcmVdKS5qb2luKCc6Jyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2ltcGxpZnk6IGZ1bmN0aW9uIChtYXAsIGZhY3Rvcikge1xuICAgIHZhciBtYXBXaWR0aCA9IE1hdGguYWJzKG1hcC5nZXRCb3VuZHMoKS5nZXRXZXN0KCkgLSBtYXAuZ2V0Qm91bmRzKCkuZ2V0RWFzdCgpKTtcbiAgICB0aGlzLnBhcmFtcy5tYXhBbGxvd2FibGVPZmZzZXQgPSAobWFwV2lkdGggLyBtYXAuZ2V0U2l6ZSgpLnkpICogKDEgLSBmYWN0b3IpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAvLyBpbW1lZGlhdGVseSBpbnZva2Ugd2l0aCBhbiBlcnJvclxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHVuZGVmaW5lZCwgcmVzcG9uc2UpO1xuICAgICAgICByZXR1cm47XG5cbiAgICAgIC8vIG9rIG5vIGVycm9yIGxldHMganVzdCBhc3N1bWUgd2UgaGF2ZSBmZWF0dXJlcy4uLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGZlYXR1cmVDb2xsZWN0aW9uID0gVXRpbC5yZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24ocmVzcG9uc2UpO1xuICAgICAgICByZXNwb25zZS5yZXN1bHRzID0gcmVzcG9uc2UucmVzdWx0cy5yZXZlcnNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZmVhdHVyZSA9IGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzW2ldO1xuICAgICAgICAgIGZlYXR1cmUubGF5ZXJJZCA9IHJlc3BvbnNlLnJlc3VsdHNbaV0ubGF5ZXJJZDtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHVuZGVmaW5lZCwgZmVhdHVyZUNvbGxlY3Rpb24sIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGlmeUZlYXR1cmVzIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSWRlbnRpZnlGZWF0dXJlcyhvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaWRlbnRpZnlGZWF0dXJlcztcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgSWRlbnRpZnkgfSBmcm9tICcuL0lkZW50aWZ5JztcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWwnO1xuXG5leHBvcnQgdmFyIElkZW50aWZ5SW1hZ2UgPSBJZGVudGlmeS5leHRlbmQoe1xuICBzZXR0ZXJzOiB7XG4gICAgJ3NldE1vc2FpY1J1bGUnOiAnbW9zYWljUnVsZScsXG4gICAgJ3NldFJlbmRlcmluZ1J1bGUnOiAncmVuZGVyaW5nUnVsZScsXG4gICAgJ3NldFBpeGVsU2l6ZSc6ICdwaXhlbFNpemUnLFxuICAgICdyZXR1cm5DYXRhbG9nSXRlbXMnOiAncmV0dXJuQ2F0YWxvZ0l0ZW1zJyxcbiAgICAncmV0dXJuR2VvbWV0cnknOiAncmV0dXJuR2VvbWV0cnknXG4gIH0sXG5cbiAgcGFyYW1zOiB7XG4gICAgcmV0dXJuR2VvbWV0cnk6IGZhbHNlXG4gIH0sXG5cbiAgYXQ6IGZ1bmN0aW9uIChsYXRsbmcpIHtcbiAgICBsYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xuICAgIHRoaXMucGFyYW1zLmdlb21ldHJ5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgeDogbGF0bG5nLmxuZyxcbiAgICAgIHk6IGxhdGxuZy5sYXQsXG4gICAgICBzcGF0aWFsUmVmZXJlbmNlOiB7XG4gICAgICAgIHdraWQ6IDQzMjZcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnBhcmFtcy5nZW9tZXRyeVR5cGUgPSAnZXNyaUdlb21ldHJ5UG9pbnQnO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldE1vc2FpY1J1bGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXMubW9zYWljUnVsZTtcbiAgfSxcblxuICBnZXRSZW5kZXJpbmdSdWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zLnJlbmRlcmluZ1J1bGU7XG4gIH0sXG5cbiAgZ2V0UGl4ZWxTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zLnBpeGVsU2l6ZTtcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgKHJlc3BvbnNlICYmIHRoaXMuX3Jlc3BvbnNlVG9HZW9KU09OKHJlc3BvbnNlKSksIHJlc3BvbnNlKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICAvLyBnZXQgcGl4ZWwgZGF0YSBhbmQgcmV0dXJuIGFzIGdlb0pTT04gcG9pbnRcbiAgLy8gcG9wdWxhdGUgY2F0YWxvZyBpdGVtcyAoaWYgYW55KVxuICAvLyBtZXJnaW5nIGluIGFueSBjYXRhbG9nSXRlbVZpc2liaWxpdGllcyBhcyBhIHByb3Blcnkgb2YgZWFjaCBmZWF0dXJlXG4gIF9yZXNwb25zZVRvR2VvSlNPTjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgdmFyIGxvY2F0aW9uID0gcmVzcG9uc2UubG9jYXRpb247XG4gICAgdmFyIGNhdGFsb2dJdGVtcyA9IHJlc3BvbnNlLmNhdGFsb2dJdGVtcztcbiAgICB2YXIgY2F0YWxvZ0l0ZW1WaXNpYmlsaXRpZXMgPSByZXNwb25zZS5jYXRhbG9nSXRlbVZpc2liaWxpdGllcztcbiAgICB2YXIgZ2VvSlNPTiA9IHtcbiAgICAgICdwaXhlbCc6IHtcbiAgICAgICAgJ3R5cGUnOiAnRmVhdHVyZScsXG4gICAgICAgICdnZW9tZXRyeSc6IHtcbiAgICAgICAgICAndHlwZSc6ICdQb2ludCcsXG4gICAgICAgICAgJ2Nvb3JkaW5hdGVzJzogW2xvY2F0aW9uLngsIGxvY2F0aW9uLnldXG4gICAgICAgIH0sXG4gICAgICAgICdjcnMnOiB7XG4gICAgICAgICAgJ3R5cGUnOiAnRVBTRycsXG4gICAgICAgICAgJ3Byb3BlcnRpZXMnOiB7XG4gICAgICAgICAgICAnY29kZSc6IGxvY2F0aW9uLnNwYXRpYWxSZWZlcmVuY2Uud2tpZFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb3BlcnRpZXMnOiB7XG4gICAgICAgICAgJ09CSkVDVElEJzogcmVzcG9uc2Uub2JqZWN0SWQsXG4gICAgICAgICAgJ25hbWUnOiByZXNwb25zZS5uYW1lLFxuICAgICAgICAgICd2YWx1ZSc6IHJlc3BvbnNlLnZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgICdpZCc6IHJlc3BvbnNlLm9iamVjdElkXG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChyZXNwb25zZS5wcm9wZXJ0aWVzICYmIHJlc3BvbnNlLnByb3BlcnRpZXMuVmFsdWVzKSB7XG4gICAgICBnZW9KU09OLnBpeGVsLnByb3BlcnRpZXMudmFsdWVzID0gcmVzcG9uc2UucHJvcGVydGllcy5WYWx1ZXM7XG4gICAgfVxuXG4gICAgaWYgKGNhdGFsb2dJdGVtcyAmJiBjYXRhbG9nSXRlbXMuZmVhdHVyZXMpIHtcbiAgICAgIGdlb0pTT04uY2F0YWxvZ0l0ZW1zID0gVXRpbC5yZXNwb25zZVRvRmVhdHVyZUNvbGxlY3Rpb24oY2F0YWxvZ0l0ZW1zKTtcbiAgICAgIGlmIChjYXRhbG9nSXRlbVZpc2liaWxpdGllcyAmJiBjYXRhbG9nSXRlbVZpc2liaWxpdGllcy5sZW5ndGggPT09IGdlb0pTT04uY2F0YWxvZ0l0ZW1zLmZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKHZhciBpID0gY2F0YWxvZ0l0ZW1WaXNpYmlsaXRpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBnZW9KU09OLmNhdGFsb2dJdGVtcy5mZWF0dXJlc1tpXS5wcm9wZXJ0aWVzLmNhdGFsb2dJdGVtVmlzaWJpbGl0eSA9IGNhdGFsb2dJdGVtVmlzaWJpbGl0aWVzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBnZW9KU09OO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpZnlJbWFnZSAocGFyYW1zKSB7XG4gIHJldHVybiBuZXcgSWRlbnRpZnlJbWFnZShwYXJhbXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpZGVudGlmeUltYWdlO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQge2NvcnN9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHtjbGVhblVybH0gZnJvbSAnLi4vVXRpbCc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9SZXF1ZXN0JztcblxuZXhwb3J0IHZhciBTZXJ2aWNlID0gTC5FdmVudGVkLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIHByb3h5OiBmYWxzZSxcbiAgICB1c2VDb3JzOiBjb3JzLFxuICAgIHRpbWVvdXQ6IDBcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuX3JlcXVlc3RRdWV1ZSA9IFtdO1xuICAgIHRoaXMuX2F1dGhlbnRpY2F0aW5nID0gZmFsc2U7XG4gICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zLnVybCA9IGNsZWFuVXJsKHRoaXMub3B0aW9ucy51cmwpO1xuICB9LFxuXG4gIGdldDogZnVuY3Rpb24gKHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnZ2V0JywgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG4gIH0sXG5cbiAgcG9zdDogZnVuY3Rpb24gKHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgncG9zdCcsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9LFxuXG4gIHJlcXVlc3Q6IGZ1bmN0aW9uIChwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ3JlcXVlc3QnLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfSxcblxuICBtZXRhZGF0YTogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ2dldCcsICcnLCB7fSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB9LFxuXG4gIGF1dGhlbnRpY2F0ZTogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdGhpcy5fYXV0aGVudGljYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLm9wdGlvbnMudG9rZW4gPSB0b2tlbjtcbiAgICB0aGlzLl9ydW5RdWV1ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFRpbWVvdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpbWVvdXQ7XG4gIH0sXG5cbiAgc2V0VGltZW91dDogZnVuY3Rpb24gKHRpbWVvdXQpIHtcbiAgICB0aGlzLm9wdGlvbnMudGltZW91dCA9IHRpbWVvdXQ7XG4gIH0sXG5cbiAgX3JlcXVlc3Q6IGZ1bmN0aW9uIChtZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLmZpcmUoJ3JlcXVlc3RzdGFydCcsIHtcbiAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgfSwgdHJ1ZSk7XG5cbiAgICB2YXIgd3JhcHBlZENhbGxiYWNrID0gdGhpcy5fY3JlYXRlU2VydmljZUNhbGxiYWNrKG1ldGhvZCwgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRva2VuKSB7XG4gICAgICBwYXJhbXMudG9rZW4gPSB0aGlzLm9wdGlvbnMudG9rZW47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2F1dGhlbnRpY2F0aW5nKSB7XG4gICAgICB0aGlzLl9yZXF1ZXN0UXVldWUucHVzaChbbWV0aG9kLCBwYXRoLCBwYXJhbXMsIGNhbGxiYWNrLCBjb250ZXh0XSk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cmwgPSAodGhpcy5vcHRpb25zLnByb3h5KSA/IHRoaXMub3B0aW9ucy5wcm94eSArICc/JyArIHRoaXMub3B0aW9ucy51cmwgKyBwYXRoIDogdGhpcy5vcHRpb25zLnVybCArIHBhdGg7XG5cbiAgICAgIGlmICgobWV0aG9kID09PSAnZ2V0JyB8fCBtZXRob2QgPT09ICdyZXF1ZXN0JykgJiYgIXRoaXMub3B0aW9ucy51c2VDb3JzKSB7XG4gICAgICAgIHJldHVybiBSZXF1ZXN0LmdldC5KU09OUCh1cmwsIHBhcmFtcywgd3JhcHBlZENhbGxiYWNrLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBSZXF1ZXN0W21ldGhvZF0odXJsLCBwYXJhbXMsIHdyYXBwZWRDYWxsYmFjaywgY29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9jcmVhdGVTZXJ2aWNlQ2FsbGJhY2s6IGZ1bmN0aW9uIChtZXRob2QsIHBhdGgsIHBhcmFtcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKGVycm9yICYmIChlcnJvci5jb2RlID09PSA0OTkgfHwgZXJyb3IuY29kZSA9PT0gNDk4KSkge1xuICAgICAgICB0aGlzLl9hdXRoZW50aWNhdGluZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fcmVxdWVzdFF1ZXVlLnB1c2goW21ldGhvZCwgcGF0aCwgcGFyYW1zLCBjYWxsYmFjaywgY29udGV4dF0pO1xuXG4gICAgICAgIC8vIGZpcmUgYW4gZXZlbnQgZm9yIHVzZXJzIHRvIGhhbmRsZSBhbmQgcmUtYXV0aGVudGljYXRlXG4gICAgICAgIHRoaXMuZmlyZSgnYXV0aGVudGljYXRpb25yZXF1aXJlZCcsIHtcbiAgICAgICAgICBhdXRoZW50aWNhdGU6IEwuVXRpbC5iaW5kKHRoaXMuYXV0aGVudGljYXRlLCB0aGlzKVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICAvLyBpZiB0aGUgdXNlciBoYXMgYWNjZXNzIHRvIGEgY2FsbGJhY2sgdGhleSBjYW4gaGFuZGxlIHRoZSBhdXRoIGVycm9yXG4gICAgICAgIGVycm9yLmF1dGhlbnRpY2F0ZSA9IEwuVXRpbC5iaW5kKHRoaXMuYXV0aGVudGljYXRlLCB0aGlzKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5maXJlKCdyZXF1ZXN0ZXJyb3InLCB7XG4gICAgICAgICAgdXJsOiB0aGlzLm9wdGlvbnMudXJsICsgcGF0aCxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuICAgICAgICAgIGNvZGU6IGVycm9yLmNvZGUsXG4gICAgICAgICAgbWV0aG9kOiBtZXRob2RcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpcmUoJ3JlcXVlc3RzdWNjZXNzJywge1xuICAgICAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLFxuICAgICAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmUoJ3JlcXVlc3RlbmQnLCB7XG4gICAgICAgIHVybDogdGhpcy5vcHRpb25zLnVybCArIHBhdGgsXG4gICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZFxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX3J1blF1ZXVlOiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgaSA9IHRoaXMuX3JlcXVlc3RRdWV1ZS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIHJlcXVlc3QgPSB0aGlzLl9yZXF1ZXN0UXVldWVbaV07XG4gICAgICB2YXIgbWV0aG9kID0gcmVxdWVzdC5zaGlmdCgpO1xuICAgICAgdGhpc1ttZXRob2RdLmFwcGx5KHRoaXMsIHJlcXVlc3QpO1xuICAgIH1cbiAgICB0aGlzLl9yZXF1ZXN0UXVldWUgPSBbXTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VydmljZTtcbiIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuL1NlcnZpY2UnO1xuaW1wb3J0IGlkZW50aWZ5RmVhdHVyZXMgZnJvbSAnLi4vVGFza3MvSWRlbnRpZnlGZWF0dXJlcyc7XG5pbXBvcnQgcXVlcnkgZnJvbSAnLi4vVGFza3MvUXVlcnknO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi4vVGFza3MvRmluZCc7XG5cbmV4cG9ydCB2YXIgTWFwU2VydmljZSA9IFNlcnZpY2UuZXh0ZW5kKHtcblxuICBpZGVudGlmeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBpZGVudGlmeUZlYXR1cmVzKHRoaXMpO1xuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmluZCh0aGlzKTtcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBxdWVyeSh0aGlzKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFNlcnZpY2UgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBNYXBTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBTZXJ2aWNlO1xuIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJy4vU2VydmljZSc7XG5pbXBvcnQgaWRlbnRpZnlJbWFnZSBmcm9tICcuLi9UYXNrcy9JZGVudGlmeUltYWdlJztcbmltcG9ydCBxdWVyeSBmcm9tICcuLi9UYXNrcy9RdWVyeSc7XG5cbmV4cG9ydCB2YXIgSW1hZ2VTZXJ2aWNlID0gU2VydmljZS5leHRlbmQoe1xuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHF1ZXJ5KHRoaXMpO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGlkZW50aWZ5SW1hZ2UodGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VTZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSW1hZ2VTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbWFnZVNlcnZpY2U7XG4iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi9TZXJ2aWNlJztcbmltcG9ydCBxdWVyeSBmcm9tICcuLi9UYXNrcy9RdWVyeSc7XG5pbXBvcnQgeyBnZW9qc29uVG9BcmNHSVMgfSBmcm9tICcuLi9VdGlsJztcblxuZXhwb3J0IHZhciBGZWF0dXJlTGF5ZXJTZXJ2aWNlID0gU2VydmljZS5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBpZEF0dHJpYnV0ZTogJ09CSkVDVElEJ1xuICB9LFxuXG4gIHF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHF1ZXJ5KHRoaXMpO1xuICB9LFxuXG4gIGFkZEZlYXR1cmU6IGZ1bmN0aW9uIChmZWF0dXJlLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGRlbGV0ZSBmZWF0dXJlLmlkO1xuXG4gICAgZmVhdHVyZSA9IGdlb2pzb25Ub0FyY0dJUyhmZWF0dXJlKTtcblxuICAgIHJldHVybiB0aGlzLnBvc3QoJ2FkZEZlYXR1cmVzJywge1xuICAgICAgZmVhdHVyZXM6IFtmZWF0dXJlXVxuICAgIH0sIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuYWRkUmVzdWx0cykgPyByZXNwb25zZS5hZGRSZXN1bHRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuYWRkUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICB1cGRhdGVGZWF0dXJlOiBmdW5jdGlvbiAoZmVhdHVyZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBmZWF0dXJlID0gZ2VvanNvblRvQXJjR0lTKGZlYXR1cmUsIHRoaXMub3B0aW9ucy5pZEF0dHJpYnV0ZSk7XG5cbiAgICByZXR1cm4gdGhpcy5wb3N0KCd1cGRhdGVGZWF0dXJlcycsIHtcbiAgICAgIGZlYXR1cmVzOiBbZmVhdHVyZV1cbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gKHJlc3BvbnNlICYmIHJlc3BvbnNlLnVwZGF0ZVJlc3VsdHMpID8gcmVzcG9uc2UudXBkYXRlUmVzdWx0c1swXSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yIHx8IHJlc3BvbnNlLnVwZGF0ZVJlc3VsdHNbMF0uZXJyb3IsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSwgY29udGV4dCk7XG4gIH0sXG5cbiAgZGVsZXRlRmVhdHVyZTogZnVuY3Rpb24gKGlkLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnBvc3QoJ2RlbGV0ZUZlYXR1cmVzJywge1xuICAgICAgb2JqZWN0SWRzOiBpZFxuICAgIH0sIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGVsZXRlUmVzdWx0cykgPyByZXNwb25zZS5kZWxldGVSZXN1bHRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuZGVsZXRlUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfSxcblxuICBkZWxldGVGZWF0dXJlczogZnVuY3Rpb24gKGlkcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5wb3N0KCdkZWxldGVGZWF0dXJlcycsIHtcbiAgICAgIG9iamVjdElkczogaWRzXG4gICAgfSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgLy8gcGFzcyBiYWNrIHRoZSBlbnRpcmUgYXJyYXlcbiAgICAgIHZhciByZXN1bHQgPSAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGVsZXRlUmVzdWx0cykgPyByZXNwb25zZS5kZWxldGVSZXN1bHRzIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IgfHwgcmVzcG9uc2UuZGVsZXRlUmVzdWx0c1swXS5lcnJvciwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LCBjb250ZXh0KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlTGF5ZXJTZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRmVhdHVyZUxheWVyU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmVhdHVyZUxheWVyU2VydmljZTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgcG9pbnRlckV2ZW50cyB9IGZyb20gJy4uL1N1cHBvcnQnO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4uL1V0aWwnO1xuXG52YXIgdGlsZVByb3RvY29sID0gKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCAhPT0gJ2h0dHBzOicpID8gJ2h0dHA6JyA6ICdodHRwczonO1xuXG5leHBvcnQgdmFyIEJhc2VtYXBMYXllciA9IEwuVGlsZUxheWVyLmV4dGVuZCh7XG4gIHN0YXRpY3M6IHtcbiAgICBBVFRSSUJVVElPTlBSRUZJWDogJzxhIGhyZWY9XCJodHRwOi8vbGVhZmxldGpzLmNvbVwiIHRpdGxlPVwiQSBKUyBsaWJyYXJ5IGZvciBpbnRlcmFjdGl2ZSBtYXBzXCI+TGVhZmxldDwvYT4nLFxuICAgIFRJTEVTOiB7XG4gICAgICBTdHJlZXRzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Xb3JsZF9TdHJlZXRfTWFwL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTksXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MsIE5PQUEnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uVXJsOiAnaHR0cHM6Ly9zdGF0aWMuYXJjZ2lzLmNvbS9hdHRyaWJ1dGlvbi9Xb3JsZF9TdHJlZXRfTWFwJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgVG9wb2dyYXBoaWM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX1RvcG9fTWFwL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTksXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MsIE5PQUEnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uVXJsOiAnaHR0cHM6Ly9zdGF0aWMuYXJjZ2lzLmNvbS9hdHRyaWJ1dGlvbi9Xb3JsZF9Ub3BvX01hcCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIE9jZWFuczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vYXJjZ2lzL3Jlc3Qvc2VydmljZXMvT2NlYW4vV29ybGRfT2NlYW5fQmFzZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdVU0dTLCBOT0FBJyxcbiAgICAgICAgICBhdHRyaWJ1dGlvblVybDogJ2h0dHBzOi8vc3RhdGljLmFyY2dpcy5jb20vYXR0cmlidXRpb24vT2NlYW5fQmFzZW1hcCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIE9jZWFuc0xhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vYXJjZ2lzL3Jlc3Qvc2VydmljZXMvT2NlYW4vV29ybGRfT2NlYW5fUmVmZXJlbmNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBwYW5lOiAocG9pbnRlckV2ZW50cykgPyAnZXNyaS1sYWJlbHMnIDogJ3RpbGVQYW5lJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgTmF0aW9uYWxHZW9ncmFwaGljOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9OYXRHZW9fV29ybGRfTWFwL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ05hdGlvbmFsIEdlb2dyYXBoaWMsIERlTG9ybWUsIEhFUkUsIFVORVAtV0NNQywgVVNHUywgTkFTQSwgRVNBLCBNRVRJLCBOUkNBTiwgR0VCQ08sIE5PQUEsIGluY3JlbWVudCBQIENvcnAuJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgRGFya0dyYXk6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0NhbnZhcy9Xb3JsZF9EYXJrX0dyYXlfQmFzZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdIRVJFLCBEZUxvcm1lLCBNYXBteUluZGlhLCAmY29weTsgT3BlblN0cmVldE1hcCBjb250cmlidXRvcnMnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBEYXJrR3JheUxhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvQ2FudmFzL1dvcmxkX0RhcmtfR3JheV9SZWZlcmVuY2UvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBHcmF5OiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9DYW52YXMvV29ybGRfTGlnaHRfR3JheV9CYXNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0hFUkUsIERlTG9ybWUsIE1hcG15SW5kaWEsICZjb3B5OyBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9ycydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIEdyYXlMYWJlbHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL0NhbnZhcy9Xb3JsZF9MaWdodF9HcmF5X1JlZmVyZW5jZS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE2LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgcGFuZTogKHBvaW50ZXJFdmVudHMpID8gJ2VzcmktbGFiZWxzJyA6ICd0aWxlUGFuZScsXG4gICAgICAgICAgYXR0cmlidXRpb246ICcnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBJbWFnZXJ5OiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Xb3JsZF9JbWFnZXJ5L01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTksXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0RpZ2l0YWxHbG9iZSwgR2VvRXllLCBpLWN1YmVkLCBVU0RBLCBVU0dTLCBBRVgsIEdldG1hcHBpbmcsIEFlcm9ncmlkLCBJR04sIElHUCwgc3dpc3N0b3BvLCBhbmQgdGhlIEdJUyBVc2VyIENvbW11bml0eSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIEltYWdlcnlMYWJlbHM6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1JlZmVyZW5jZS9Xb3JsZF9Cb3VuZGFyaWVzX2FuZF9QbGFjZXMvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgSW1hZ2VyeVRyYW5zcG9ydGF0aW9uOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9SZWZlcmVuY2UvV29ybGRfVHJhbnNwb3J0YXRpb24vTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxOSxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBTaGFkZWRSZWxpZWY6IHtcbiAgICAgICAgdXJsVGVtcGxhdGU6IHRpbGVQcm90b2NvbCArICcvL3tzfS5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX1NoYWRlZF9SZWxpZWYvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxMyxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnVVNHUydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFNoYWRlZFJlbGllZkxhYmVsczoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvUmVmZXJlbmNlL1dvcmxkX0JvdW5kYXJpZXNfYW5kX1BsYWNlc19BbHRlcm5hdGUvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxMixcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgVGVycmFpbjoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfVGVycmFpbl9CYXNlL01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9JyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1pblpvb206IDEsXG4gICAgICAgICAgbWF4Wm9vbTogMTMsXG4gICAgICAgICAgc3ViZG9tYWluczogWydzZXJ2ZXInLCAnc2VydmljZXMnXSxcbiAgICAgICAgICBhdHRyaWJ1dGlvbjogJ1VTR1MsIE5PQUEnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBUZXJyYWluTGFiZWxzOiB7XG4gICAgICAgIHVybFRlbXBsYXRlOiB0aWxlUHJvdG9jb2wgKyAnLy97c30uYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9SZWZlcmVuY2UvV29ybGRfUmVmZXJlbmNlX092ZXJsYXkvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbWluWm9vbTogMSxcbiAgICAgICAgICBtYXhab29tOiAxMyxcbiAgICAgICAgICBzdWJkb21haW5zOiBbJ3NlcnZlcicsICdzZXJ2aWNlcyddLFxuICAgICAgICAgIHBhbmU6IChwb2ludGVyRXZlbnRzKSA/ICdlc3JpLWxhYmVscycgOiAndGlsZVBhbmUnLFxuICAgICAgICAgIGF0dHJpYnV0aW9uOiAnJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgVVNBVG9wbzoge1xuICAgICAgICB1cmxUZW1wbGF0ZTogdGlsZVByb3RvY29sICsgJy8ve3N9LmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvVVNBX1RvcG9fTWFwcy9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5ab29tOiAxLFxuICAgICAgICAgIG1heFpvb206IDE1LFxuICAgICAgICAgIHN1YmRvbWFpbnM6IFsnc2VydmVyJywgJ3NlcnZpY2VzJ10sXG4gICAgICAgICAgYXR0cmlidXRpb246ICdVU0dTLCBOYXRpb25hbCBHZW9ncmFwaGljIFNvY2lldHksIGktY3ViZWQnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKGtleSwgb3B0aW9ucykge1xuICAgIHZhciBjb25maWc7XG5cbiAgICAvLyBzZXQgdGhlIGNvbmZpZyB2YXJpYWJsZSB3aXRoIHRoZSBhcHByb3ByaWF0ZSBjb25maWcgb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnICYmIGtleS51cmxUZW1wbGF0ZSAmJiBrZXkub3B0aW9ucykge1xuICAgICAgY29uZmlnID0ga2V5O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYgQmFzZW1hcExheWVyLlRJTEVTW2tleV0pIHtcbiAgICAgIGNvbmZpZyA9IEJhc2VtYXBMYXllci5USUxFU1trZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0wuZXNyaS5CYXNlbWFwTGF5ZXI6IEludmFsaWQgcGFyYW1ldGVyLiBVc2Ugb25lIG9mIFwiU3RyZWV0c1wiLCBcIlRvcG9ncmFwaGljXCIsIFwiT2NlYW5zXCIsIFwiT2NlYW5zTGFiZWxzXCIsIFwiTmF0aW9uYWxHZW9ncmFwaGljXCIsIFwiR3JheVwiLCBcIkdyYXlMYWJlbHNcIiwgXCJEYXJrR3JheVwiLCBcIkRhcmtHcmF5TGFiZWxzXCIsIFwiSW1hZ2VyeVwiLCBcIkltYWdlcnlMYWJlbHNcIiwgXCJJbWFnZXJ5VHJhbnNwb3J0YXRpb25cIiwgXCJTaGFkZWRSZWxpZWZcIiwgXCJTaGFkZWRSZWxpZWZMYWJlbHNcIiwgXCJUZXJyYWluXCIsIFwiVGVycmFpbkxhYmVsc1wiIG9yIFwiVVNBVG9wb1wiJyk7XG4gICAgfVxuXG4gICAgLy8gbWVyZ2UgcGFzc2VkIG9wdGlvbnMgaW50byB0aGUgY29uZmlnIG9wdGlvbnNcbiAgICB2YXIgdGlsZU9wdGlvbnMgPSBMLlV0aWwuZXh0ZW5kKGNvbmZpZy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIHRpbGVPcHRpb25zKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIGNvbmZpZy51cmxUZW1wbGF0ZSArPSAoJz90b2tlbj0nICsgdGhpcy5vcHRpb25zLnRva2VuKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsIHRoZSBpbml0aWFsaXplIG1ldGhvZCBvbiBMLlRpbGVMYXllciB0byBzZXQgZXZlcnl0aGluZyB1cFxuICAgIEwuVGlsZUxheWVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgY29uZmlnLnVybFRlbXBsYXRlLCB0aWxlT3B0aW9ucyk7XG4gIH0sXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBtYXAuX2VzcmlCYXNlbWFwQ291bnQgPyBtYXAuX2VzcmlCYXNlbWFwQ291bnQgKz0gMSA6IG1hcC5fZXNyaUJhc2VtYXBDb3VudCA9IDE7XG4gICAgLy8gVXBkYXRlIGF0dHJpYnV0aW9uIHdoZW4gRXNyaSBob3N0ZWQgYmFzZW1hcHMgYXJlIGxvYWRlZFxuICAgIGlmIChtYXAuYXR0cmlidXRpb25Db250cm9sKSB7XG4gICAgICBtYXAuYXR0cmlidXRpb25Db250cm9sLnNldFByZWZpeChCYXNlbWFwTGF5ZXIuQVRUUklCVVRJT05QUkVGSVggKyAnIHwgUG93ZXJlZCBieSA8YSBocmVmPVwiaHR0cHM6Ly93d3cuZXNyaS5jb21cIj5Fc3JpPC9hPicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMucGFuZSA9PT0gJ2VzcmktbGFiZWxzJykge1xuICAgICAgdGhpcy5faW5pdFBhbmUoKTtcbiAgICB9XG4gICAgLy8gc29tZSBiYXNlbWFwcyBjYW4gc3VwcGx5IGR5bmFtaWMgYXR0cmlidXRpb25cbiAgICBpZiAodGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uVXJsKSB7XG4gICAgICBVdGlsLl9nZXRBdHRyaWJ1dGlvbkRhdGEodGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uVXJsLCBtYXApO1xuICAgIH1cblxuICAgIG1hcC5vbignbW92ZWVuZCcsIFV0aWwuX3VwZGF0ZU1hcEF0dHJpYnV0aW9uKTtcblxuICAgIEwuVGlsZUxheWVyLnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBtYXAuX2VzcmlCYXNlbWFwQ291bnQgLT0gMTtcbiAgICAvLyBpZiBubyBFc3JpIGJhc2VtYXBzIGFyZSBkaXNwbGF5ZWQsIHJldmVydCBhdHRyaWJ1dGlvbiBjaGFuZ2VzXG4gICAgaWYgKG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wgJiYgbWFwLl9lc3JpQmFzZW1hcENvdW50IDwgMSkge1xuICAgICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5zZXRQcmVmaXgoQmFzZW1hcExheWVyLkFUVFJJQlVUSU9OUFJFRklYKTtcbiAgICB9XG5cbiAgICBtYXAub2ZmKCdtb3ZlZW5kJywgVXRpbC5fdXBkYXRlTWFwQXR0cmlidXRpb24pO1xuICAgIEwuVGlsZUxheWVyLnByb3RvdHlwZS5vblJlbW92ZS5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG5cbiAgX2luaXRQYW5lOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLl9tYXAuZ2V0UGFuZSh0aGlzLm9wdGlvbnMucGFuZSkpIHtcbiAgICAgIHZhciBwYW5lID0gdGhpcy5fbWFwLmNyZWF0ZVBhbmUodGhpcy5vcHRpb25zLnBhbmUpO1xuICAgICAgcGFuZS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgcGFuZS5zdHlsZS56SW5kZXggPSA1MDA7XG4gICAgfVxuICB9LFxuXG4gIGdldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdHRyaWJ1dGlvbikge1xuICAgICAgdmFyIGF0dHJpYnV0aW9uID0gJzxzcGFuIGNsYXNzPVwiZXNyaS1hdHRyaWJ1dGlvbnNcIiBzdHlsZT1cImxpbmUtaGVpZ2h0OjE0cHg7IHZlcnRpY2FsLWFsaWduOiAtM3B4OyB0ZXh0LW92ZXJmbG93OmVsbGlwc2lzOyB3aGl0ZS1zcGFjZTpub3dyYXA7IG92ZXJmbG93OmhpZGRlbjsgZGlzcGxheTppbmxpbmUtYmxvY2s7IG1heC13aWR0aDonICsgVXRpbC5jYWxjQXR0cmlidXRpb25XaWR0aCh0aGlzLl9tYXApICsgJztcIj4nICsgdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uICsgJzwvc3Bhbj4nO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cmlidXRpb247XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gYmFzZW1hcExheWVyIChrZXksIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBCYXNlbWFwTGF5ZXIoa2V5LCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZW1hcExheWVyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQge3dhcm4sIGNsZWFuVXJsfSBmcm9tICcuLi9VdGlsJztcbmltcG9ydCBtYXBTZXJ2aWNlIGZyb20gJy4uL1NlcnZpY2VzL01hcFNlcnZpY2UnO1xuXG5leHBvcnQgdmFyIFRpbGVkTWFwTGF5ZXIgPSBMLlRpbGVMYXllci5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgem9vbU9mZnNldEFsbG93YW5jZTogMC4xLFxuICAgIGVycm9yVGlsZVVybDogJ2h0dHA6Ly9kb3dubG9hZHMyLmVzcmkuY29tL3N1cHBvcnQvVGVjaEFydGljbGVzL2JsYW5rMjU2LnBuZydcbiAgfSxcblxuICBzdGF0aWNzOiB7XG4gICAgTWVyY2F0b3Jab29tTGV2ZWxzOiB7XG4gICAgICAnMCc6IDE1NjU0My4wMzM5Mjc5OTk5OSxcbiAgICAgICcxJzogNzgyNzEuNTE2OTYzOTk5ODkzLFxuICAgICAgJzInOiAzOTEzNS43NTg0ODIwMDAwOTksXG4gICAgICAnMyc6IDE5NTY3Ljg3OTI0MDk5OTkwMSxcbiAgICAgICc0JzogOTc4My45Mzk2MjA0OTk5NTkzLFxuICAgICAgJzUnOiA0ODkxLjk2OTgxMDI0OTk3OTcsXG4gICAgICAnNic6IDI0NDUuOTg0OTA1MTI0OTg5OCxcbiAgICAgICc3JzogMTIyMi45OTI0NTI1NjI0ODk5LFxuICAgICAgJzgnOiA2MTEuNDk2MjI2MjgxMzgwMDIsXG4gICAgICAnOSc6IDMwNS43NDgxMTMxNDA1NTgwMixcbiAgICAgICcxMCc6IDE1Mi44NzQwNTY1NzA0MTEsXG4gICAgICAnMTEnOiA3Ni40MzcwMjgyODUwNzMxOTcsXG4gICAgICAnMTInOiAzOC4yMTg1MTQxNDI1MzY1OTgsXG4gICAgICAnMTMnOiAxOS4xMDkyNTcwNzEyNjgyOTksXG4gICAgICAnMTQnOiA5LjU1NDYyODUzNTYzNDE0OTYsXG4gICAgICAnMTUnOiA0Ljc3NzMxNDI2Nzk0OTM2OTksXG4gICAgICAnMTYnOiAyLjM4ODY1NzEzMzk3NDY4LFxuICAgICAgJzE3JzogMS4xOTQzMjg1NjY4NTUwNTAxLFxuICAgICAgJzE4JzogMC41OTcxNjQyODM1NTk4MTY5OSxcbiAgICAgICcxOSc6IDAuMjk4NTgyMTQxNjQ3NjE2OTgsXG4gICAgICAnMjAnOiAwLjE0OTI5MTA3MDgyMzgxLFxuICAgICAgJzIxJzogMC4wNzQ2NDU1MzU0MTE5MSxcbiAgICAgICcyMic6IDAuMDM3MzIyNzY3NzA1OTUyNSxcbiAgICAgICcyMyc6IDAuMDE4NjYxMzgzODUyOTc2M1xuICAgIH1cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMudXJsID0gY2xlYW5Vcmwob3B0aW9ucy51cmwpO1xuICAgIG9wdGlvbnMgPSBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblxuICAgIC8vIHNldCB0aGUgdXJsc1xuICAgIHRoaXMudGlsZVVybCA9IG9wdGlvbnMudXJsICsgJ3RpbGUve3p9L3t5fS97eH0nO1xuICAgIHRoaXMuc2VydmljZSA9IG1hcFNlcnZpY2Uob3B0aW9ucyk7XG4gICAgdGhpcy5zZXJ2aWNlLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuXG4gICAgdmFyIGFyY2dpc29ubGluZSA9IG5ldyBSZWdFeHAoL3RpbGVzLmFyY2dpcyhvbmxpbmUpP1xcLmNvbS9nKTtcbiAgICBpZiAoYXJjZ2lzb25saW5lLnRlc3Qob3B0aW9ucy51cmwpKSB7XG4gICAgICB0aGlzLnRpbGVVcmwgPSB0aGlzLnRpbGVVcmwucmVwbGFjZSgnOi8vdGlsZXMnLCAnOi8vdGlsZXN7c30nKTtcbiAgICAgIG9wdGlvbnMuc3ViZG9tYWlucyA9IFsnMScsICcyJywgJzMnLCAnNCddO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9rZW4pIHtcbiAgICAgIHRoaXMudGlsZVVybCArPSAoJz90b2tlbj0nICsgdGhpcy5vcHRpb25zLnRva2VuKTtcbiAgICB9XG5cbiAgICAvLyBpbml0IGxheWVyIGJ5IGNhbGxpbmcgVGlsZUxheWVycyBpbml0aWFsaXplIG1ldGhvZFxuICAgIEwuVGlsZUxheWVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgdGhpcy50aWxlVXJsLCBvcHRpb25zKTtcbiAgfSxcblxuICBnZXRUaWxlVXJsOiBmdW5jdGlvbiAodGlsZVBvaW50KSB7XG4gICAgcmV0dXJuIEwuVXRpbC50ZW1wbGF0ZSh0aGlzLnRpbGVVcmwsIEwuZXh0ZW5kKHtcbiAgICAgIHM6IHRoaXMuX2dldFN1YmRvbWFpbih0aWxlUG9pbnQpLFxuICAgICAgejogKHRoaXMuX2xvZE1hcCAmJiB0aGlzLl9sb2RNYXBbdGlsZVBvaW50LnpdKSA/IHRoaXMuX2xvZE1hcFt0aWxlUG9pbnQuel0gOiB0aWxlUG9pbnQueiwgLy8gdHJ5IGxvZCBtYXAgZmlyc3QsIHRoZW4ganVzdCBkZWZ1YWx0IHRvIHpvb20gbGV2ZWxcbiAgICAgIHg6IHRpbGVQb2ludC54LFxuICAgICAgeTogdGlsZVBvaW50LnlcbiAgICB9LCB0aGlzLm9wdGlvbnMpKTtcbiAgfSxcblxuICBjcmVhdGVUaWxlOiBmdW5jdGlvbiAoY29vcmRzLCBkb25lKSB7XG4gICAgdmFyIHRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgIEwuRG9tRXZlbnQub24odGlsZSwgJ2xvYWQnLCBMLmJpbmQodGhpcy5fdGlsZU9uTG9hZCwgdGhpcywgZG9uZSwgdGlsZSkpO1xuICAgIEwuRG9tRXZlbnQub24odGlsZSwgJ2Vycm9yJywgTC5iaW5kKHRoaXMuX3RpbGVPbkVycm9yLCB0aGlzLCBkb25lLCB0aWxlKSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNyb3NzT3JpZ2luKSB7XG4gICAgICB0aWxlLmNyb3NzT3JpZ2luID0gJyc7XG4gICAgfVxuXG4gICAgLypcbiAgICAgQWx0IHRhZyBpcyBzZXQgdG8gZW1wdHkgc3RyaW5nIHRvIGtlZXAgc2NyZWVuIHJlYWRlcnMgZnJvbSByZWFkaW5nIFVSTCBhbmQgZm9yIGNvbXBsaWFuY2UgcmVhc29uc1xuICAgICBodHRwOi8vd3d3LnczLm9yZy9UUi9XQ0FHMjAtVEVDSFMvSDY3XG4gICAgKi9cbiAgICB0aWxlLmFsdCA9ICcnO1xuXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gbG9kIG1hcCBvciBhbiBsb2QgbWFwIHdpdGggYSBwcm9wZXIgem9vbSBsb2FkIHRoZSB0aWxlXG4gICAgLy8gb3RoZXJ3aXNlIHdhaXQgZm9yIHRoZSBsb2QgbWFwIHRvIGJlY29tZSBhdmFpbGFibGVcbiAgICBpZiAoIXRoaXMuX2xvZE1hcCB8fCAodGhpcy5fbG9kTWFwICYmIHRoaXMuX2xvZE1hcFtjb29yZHMuel0pKSB7XG4gICAgICB0aWxlLnNyYyA9IHRoaXMuZ2V0VGlsZVVybChjb29yZHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uY2UoJ2xvZG1hcCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGlsZS5zcmMgPSB0aGlzLmdldFRpbGVVcmwoY29vcmRzKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aWxlO1xuICB9LFxuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgaWYgKG1hcC5vcHRpb25zLmNycyA9PT0gTC5DUlMuRVBTRzM4NTcgJiYgIXRoaXMuX2xvZE1hcCkge1xuICAgICAgdGhpcy5fbG9kTWFwID0ge307XG4gICAgICB0aGlzLm1ldGFkYXRhKGZ1bmN0aW9uIChlcnJvciwgbWV0YWRhdGEpIHtcbiAgICAgICAgaWYgKCFlcnJvciAmJiBtZXRhZGF0YS5zcGF0aWFsUmVmZXJlbmNlKSB7XG4gICAgICAgICAgdmFyIHNyID0gbWV0YWRhdGEuc3BhdGlhbFJlZmVyZW5jZS5sYXRlc3RXa2lkIHx8IG1ldGFkYXRhLnNwYXRpYWxSZWZlcmVuY2Uud2tpZDtcbiAgICAgICAgICBpZiAoc3IgPT09IDEwMjEwMCB8fCBzciA9PT0gMzg1Nykge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSB6b29tIGxldmVsIGRhdGFcbiAgICAgICAgICAgIHZhciBhcmNnaXNMT0RzID0gbWV0YWRhdGEudGlsZUluZm8ubG9kcztcbiAgICAgICAgICAgIHZhciBjb3JyZWN0UmVzb2x1dGlvbnMgPSBUaWxlZE1hcExheWVyLk1lcmNhdG9yWm9vbUxldmVscztcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmNnaXNMT0RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBhcmNnaXNMT0QgPSBhcmNnaXNMT0RzW2ldO1xuICAgICAgICAgICAgICBmb3IgKHZhciBjaSBpbiBjb3JyZWN0UmVzb2x1dGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29ycmVjdFJlcyA9IGNvcnJlY3RSZXNvbHV0aW9uc1tjaV07XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fd2l0aGluUGVyY2VudGFnZShhcmNnaXNMT0QucmVzb2x1dGlvbiwgY29ycmVjdFJlcywgdGhpcy5vcHRpb25zLnpvb21PZmZzZXRBbGxvd2FuY2UpKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLl9sb2RNYXBbY2ldID0gYXJjZ2lzTE9ELmxldmVsO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZmlyZSgnbG9kbWFwJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdhcm4oJ0wuZXNyaS5UaWxlZE1hcExheWVyIGlzIHVzaW5nIGEgbm9uLW1lcmNhdG9yIHNwYXRpYWwgcmVmZXJlbmNlLiBTdXBwb3J0IG1heSBiZSBhdmFpbGFibGUgdGhyb3VnaCBQcm9qNExlYWZsZXQgaHR0cDovL2VzcmkuZ2l0aHViLmlvL2VzcmktbGVhZmxldC9leGFtcGxlcy9ub24tbWVyY2F0b3ItcHJvamVjdGlvbi5odG1sJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBMLlRpbGVMYXllci5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIG1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UubWV0YWRhdGEoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGlkZW50aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5pZGVudGlmeSgpO1xuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmZpbmQoKTtcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UucXVlcnkoKTtcbiAgfSxcblxuICBhdXRoZW50aWNhdGU6IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHZhciB0b2tlblFzID0gJz90b2tlbj0nICsgdG9rZW47XG4gICAgdGhpcy50aWxlVXJsID0gKHRoaXMub3B0aW9ucy50b2tlbikgPyB0aGlzLnRpbGVVcmwucmVwbGFjZSgvXFw/dG9rZW49KC4rKS9nLCB0b2tlblFzKSA6IHRoaXMudGlsZVVybCArIHRva2VuUXM7XG4gICAgdGhpcy5vcHRpb25zLnRva2VuID0gdG9rZW47XG4gICAgdGhpcy5zZXJ2aWNlLmF1dGhlbnRpY2F0ZSh0b2tlbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3dpdGhpblBlcmNlbnRhZ2U6IGZ1bmN0aW9uIChhLCBiLCBwZXJjZW50YWdlKSB7XG4gICAgdmFyIGRpZmYgPSBNYXRoLmFicygoYSAvIGIpIC0gMSk7XG4gICAgcmV0dXJuIGRpZmYgPCBwZXJjZW50YWdlO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRpbGVkTWFwTGF5ZXIgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFRpbGVkTWFwTGF5ZXIodXJsLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGlsZWRNYXBMYXllcjtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHtjb3JzfSBmcm9tICcuLi9TdXBwb3J0JztcblxudmFyIE92ZXJsYXkgPSBMLkltYWdlT3ZlcmxheS5leHRlbmQoe1xuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIHRoaXMuX3RvcExlZnQgPSBtYXAuZ2V0UGl4ZWxCb3VuZHMoKS5taW47XG4gICAgTC5JbWFnZU92ZXJsYXkucHJvdG90eXBlLm9uQWRkLmNhbGwodGhpcywgbWFwKTtcbiAgfSxcbiAgX3Jlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX21hcC5vcHRpb25zLmNycyA9PT0gTC5DUlMuRVBTRzM4NTcpIHtcbiAgICAgIEwuSW1hZ2VPdmVybGF5LnByb3RvdHlwZS5fcmVzZXQuY2FsbCh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgTC5Eb21VdGlsLnNldFBvc2l0aW9uKHRoaXMuX2ltYWdlLCB0aGlzLl90b3BMZWZ0LnN1YnRyYWN0KHRoaXMuX21hcC5nZXRQaXhlbE9yaWdpbigpKSk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IHZhciBSYXN0ZXJMYXllciA9IEwuTGF5ZXIuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgb3BhY2l0eTogMSxcbiAgICBwb3NpdGlvbjogJ2Zyb250JyxcbiAgICBmOiAnaW1hZ2UnLFxuICAgIHVzZUNvcnM6IGNvcnMsXG4gICAgYXR0cmlidXRpb246IG51bGwsXG4gICAgaW50ZXJhY3RpdmU6IGZhbHNlLFxuICAgIGFsdDogJydcbiAgfSxcblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIHRoaXMuX3VwZGF0ZSA9IEwuVXRpbC50aHJvdHRsZSh0aGlzLl91cGRhdGUsIHRoaXMub3B0aW9ucy51cGRhdGVJbnRlcnZhbCwgdGhpcyk7XG5cbiAgICBtYXAub24oJ21vdmVlbmQnLCB0aGlzLl91cGRhdGUsIHRoaXMpO1xuXG4gICAgLy8gaWYgd2UgaGFkIGFuIGltYWdlIGxvYWRlZCBhbmQgaXQgbWF0Y2hlcyB0aGVcbiAgICAvLyBjdXJyZW50IGJvdW5kcyBzaG93IHRoZSBpbWFnZSBvdGhlcndpc2UgcmVtb3ZlIGl0XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbWFnZSAmJiB0aGlzLl9jdXJyZW50SW1hZ2UuX2JvdW5kcy5lcXVhbHModGhpcy5fbWFwLmdldEJvdW5kcygpKSkge1xuICAgICAgbWFwLmFkZExheWVyKHRoaXMuX2N1cnJlbnRJbWFnZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UpIHtcbiAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcih0aGlzLl9jdXJyZW50SW1hZ2UpO1xuICAgICAgdGhpcy5fY3VycmVudEltYWdlID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGUoKTtcblxuICAgIGlmICh0aGlzLl9wb3B1cCkge1xuICAgICAgdGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuX2dldFBvcHVwRGF0YSwgdGhpcyk7XG4gICAgICB0aGlzLl9tYXAub24oJ2RibGNsaWNrJywgdGhpcy5fcmVzZXRQb3B1cFN0YXRlLCB0aGlzKTtcbiAgICB9XG4gIH0sXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBpZiAodGhpcy5fY3VycmVudEltYWdlKSB7XG4gICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5fY3VycmVudEltYWdlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcG9wdXApIHtcbiAgICAgIHRoaXMuX21hcC5vZmYoJ2NsaWNrJywgdGhpcy5fZ2V0UG9wdXBEYXRhLCB0aGlzKTtcbiAgICAgIHRoaXMuX21hcC5vZmYoJ2RibGNsaWNrJywgdGhpcy5fcmVzZXRQb3B1cFN0YXRlLCB0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXAub2ZmKCdtb3ZlZW5kJywgdGhpcy5fdXBkYXRlLCB0aGlzKTtcbiAgfSxcblxuICBiaW5kUG9wdXA6IGZ1bmN0aW9uIChmbiwgcG9wdXBPcHRpb25zKSB7XG4gICAgdGhpcy5fc2hvdWxkUmVuZGVyUG9wdXAgPSBmYWxzZTtcbiAgICB0aGlzLl9sYXN0Q2xpY2sgPSBmYWxzZTtcbiAgICB0aGlzLl9wb3B1cCA9IEwucG9wdXAocG9wdXBPcHRpb25zKTtcbiAgICB0aGlzLl9wb3B1cEZ1bmN0aW9uID0gZm47XG4gICAgaWYgKHRoaXMuX21hcCkge1xuICAgICAgdGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuX2dldFBvcHVwRGF0YSwgdGhpcyk7XG4gICAgICB0aGlzLl9tYXAub24oJ2RibGNsaWNrJywgdGhpcy5fcmVzZXRQb3B1cFN0YXRlLCB0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgdW5iaW5kUG9wdXA6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICB0aGlzLl9tYXAuY2xvc2VQb3B1cCh0aGlzLl9wb3B1cCk7XG4gICAgICB0aGlzLl9tYXAub2ZmKCdjbGljaycsIHRoaXMuX2dldFBvcHVwRGF0YSwgdGhpcyk7XG4gICAgICB0aGlzLl9tYXAub2ZmKCdkYmxjbGljaycsIHRoaXMuX3Jlc2V0UG9wdXBTdGF0ZSwgdGhpcyk7XG4gICAgfVxuICAgIHRoaXMuX3BvcHVwID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgYnJpbmdUb0Zyb250OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vcHRpb25zLnBvc2l0aW9uID0gJ2Zyb250JztcbiAgICBpZiAodGhpcy5fY3VycmVudEltYWdlKSB7XG4gICAgICB0aGlzLl9jdXJyZW50SW1hZ2UuYnJpbmdUb0Zyb250KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGJyaW5nVG9CYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vcHRpb25zLnBvc2l0aW9uID0gJ2JhY2snO1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW1hZ2UpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZS5icmluZ1RvQmFjaygpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRBdHRyaWJ1dGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYXR0cmlidXRpb247XG4gIH0sXG5cbiAgZ2V0T3BhY2l0eTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMub3BhY2l0eTtcbiAgfSxcblxuICBzZXRPcGFjaXR5OiBmdW5jdGlvbiAob3BhY2l0eSkge1xuICAgIHRoaXMub3B0aW9ucy5vcGFjaXR5ID0gb3BhY2l0eTtcbiAgICB0aGlzLl9jdXJyZW50SW1hZ2Uuc2V0T3BhY2l0eShvcGFjaXR5KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRUaW1lUmFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gW3RoaXMub3B0aW9ucy5mcm9tLCB0aGlzLm9wdGlvbnMudG9dO1xuICB9LFxuXG4gIHNldFRpbWVSYW5nZTogZnVuY3Rpb24gKGZyb20sIHRvKSB7XG4gICAgdGhpcy5vcHRpb25zLmZyb20gPSBmcm9tO1xuICAgIHRoaXMub3B0aW9ucy50byA9IHRvO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG1ldGFkYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLnNlcnZpY2UubWV0YWRhdGEoY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGF1dGhlbnRpY2F0ZTogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdGhpcy5zZXJ2aWNlLmF1dGhlbnRpY2F0ZSh0b2tlbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX3JlbmRlckltYWdlOiBmdW5jdGlvbiAodXJsLCBib3VuZHMsIGNvbnRlbnRUeXBlKSB7XG4gICAgaWYgKHRoaXMuX21hcCkge1xuICAgICAgLy8gaWYgbm8gb3V0cHV0IGRpcmVjdG9yeSBoYXMgYmVlbiBzcGVjaWZpZWQgZm9yIGEgc2VydmljZSwgTUlNRSBkYXRhIHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgIGlmIChjb250ZW50VHlwZSkge1xuICAgICAgICB1cmwgPSAnZGF0YTonICsgY29udGVudFR5cGUgKyAnO2Jhc2U2NCwnICsgdXJsO1xuICAgICAgfVxuICAgICAgLy8gY3JlYXRlIGEgbmV3IGltYWdlIG92ZXJsYXkgYW5kIGFkZCBpdCB0byB0aGUgbWFwXG4gICAgICAvLyB0byBzdGFydCBsb2FkaW5nIHRoZSBpbWFnZVxuICAgICAgLy8gb3BhY2l0eSBpcyAwIHdoaWxlIHRoZSBpbWFnZSBpcyBsb2FkaW5nXG4gICAgICB2YXIgaW1hZ2UgPSBuZXcgT3ZlcmxheSh1cmwsIGJvdW5kcywge1xuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBjcm9zc09yaWdpbjogdGhpcy5vcHRpb25zLnVzZUNvcnMsXG4gICAgICAgIGFsdDogdGhpcy5vcHRpb25zLmFsdCxcbiAgICAgICAgcGFuZTogdGhpcy5vcHRpb25zLnBhbmUgfHwgdGhpcy5nZXRQYW5lKCksXG4gICAgICAgIGludGVyYWN0aXZlOiB0aGlzLm9wdGlvbnMuaW50ZXJhY3RpdmVcbiAgICAgIH0pLmFkZFRvKHRoaXMuX21hcCk7XG5cbiAgICAgIC8vIG9uY2UgdGhlIGltYWdlIGxvYWRzXG4gICAgICBpbWFnZS5vbmNlKCdsb2FkJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX21hcCkge1xuICAgICAgICAgIHZhciBuZXdJbWFnZSA9IGUudGFyZ2V0O1xuICAgICAgICAgIHZhciBvbGRJbWFnZSA9IHRoaXMuX2N1cnJlbnRJbWFnZTtcblxuICAgICAgICAgIC8vIGlmIHRoZSBib3VuZHMgb2YgdGhpcyBpbWFnZSBtYXRjaGVzIHRoZSBib3VuZHMgdGhhdFxuICAgICAgICAgIC8vIF9yZW5kZXJJbWFnZSB3YXMgY2FsbGVkIHdpdGggYW5kIHdlIGhhdmUgYSBtYXAgd2l0aCB0aGUgc2FtZSBib3VuZHNcbiAgICAgICAgICAvLyBoaWRlIHRoZSBvbGQgaW1hZ2UgaWYgdGhlcmUgaXMgb25lIGFuZCBzZXQgdGhlIG9wYWNpdHlcbiAgICAgICAgICAvLyBvZiB0aGUgbmV3IGltYWdlIG90aGVyd2lzZSByZW1vdmUgdGhlIG5ldyBpbWFnZVxuICAgICAgICAgIGlmIChuZXdJbWFnZS5fYm91bmRzLmVxdWFscyhib3VuZHMpICYmIG5ld0ltYWdlLl9ib3VuZHMuZXF1YWxzKHRoaXMuX21hcC5nZXRCb3VuZHMoKSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbWFnZSA9IG5ld0ltYWdlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBvc2l0aW9uID09PSAnZnJvbnQnKSB7XG4gICAgICAgICAgICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmJyaW5nVG9CYWNrKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fY3VycmVudEltYWdlLl9tYXApIHtcbiAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEltYWdlLnNldE9wYWNpdHkodGhpcy5vcHRpb25zLm9wYWNpdHkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEltYWdlLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5fY3VycmVudEltYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9sZEltYWdlICYmIHRoaXMuX21hcCkge1xuICAgICAgICAgICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIob2xkSW1hZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob2xkSW1hZ2UgJiYgb2xkSW1hZ2UuX21hcCkge1xuICAgICAgICAgICAgICBvbGRJbWFnZS5fbWFwLnJlbW92ZUxheWVyKG9sZEltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWFwLnJlbW92ZUxheWVyKG5ld0ltYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZpcmUoJ2xvYWQnLCB7XG4gICAgICAgICAgYm91bmRzOiBib3VuZHNcbiAgICAgICAgfSk7XG4gICAgICB9LCB0aGlzKTtcblxuICAgICAgdGhpcy5maXJlKCdsb2FkaW5nJywge1xuICAgICAgICBib3VuZHM6IGJvdW5kc1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIF91cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX21hcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB6b29tID0gdGhpcy5fbWFwLmdldFpvb20oKTtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fbWFwLmdldEJvdW5kcygpO1xuXG4gICAgaWYgKHRoaXMuX2FuaW1hdGluZ1pvb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbWFwLl9wYW5UcmFuc2l0aW9uICYmIHRoaXMuX21hcC5fcGFuVHJhbnNpdGlvbi5faW5Qcm9ncmVzcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh6b29tID4gdGhpcy5vcHRpb25zLm1heFpvb20gfHwgem9vbSA8IHRoaXMub3B0aW9ucy5taW5ab29tKSB7XG4gICAgICB0aGlzLl9jdXJyZW50SW1hZ2UuX21hcC5yZW1vdmVMYXllcih0aGlzLl9jdXJyZW50SW1hZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBwYXJhbXMgPSB0aGlzLl9idWlsZEV4cG9ydFBhcmFtcygpO1xuXG4gICAgdGhpcy5fcmVxdWVzdEV4cG9ydChwYXJhbXMsIGJvdW5kcyk7XG4gIH0sXG5cbiAgX3JlbmRlclBvcHVwOiBmdW5jdGlvbiAobGF0bG5nLCBlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpIHtcbiAgICBsYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xuICAgIGlmICh0aGlzLl9zaG91bGRSZW5kZXJQb3B1cCAmJiB0aGlzLl9sYXN0Q2xpY2suZXF1YWxzKGxhdGxuZykpIHtcbiAgICAgIC8vIGFkZCB0aGUgcG9wdXAgdG8gdGhlIG1hcCB3aGVyZSB0aGUgbW91c2Ugd2FzIGNsaWNrZWQgYXRcbiAgICAgIHZhciBjb250ZW50ID0gdGhpcy5fcG9wdXBGdW5jdGlvbihlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpO1xuICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5fcG9wdXAuc2V0TGF0TG5nKGxhdGxuZykuc2V0Q29udGVudChjb250ZW50KS5vcGVuT24odGhpcy5fbWFwKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX3Jlc2V0UG9wdXBTdGF0ZTogZnVuY3Rpb24gKGUpIHtcbiAgICB0aGlzLl9zaG91bGRSZW5kZXJQb3B1cCA9IGZhbHNlO1xuICAgIHRoaXMuX2xhc3RDbGljayA9IGUubGF0bG5nO1xuICB9XG59KTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgUmFzdGVyTGF5ZXIgfSBmcm9tICcuL1Jhc3RlckxheWVyJztcbmltcG9ydCB7IGNsZWFuVXJsIH0gZnJvbSAnLi4vVXRpbCc7XG5pbXBvcnQgaW1hZ2VTZXJ2aWNlIGZyb20gJy4uL1NlcnZpY2VzL0ltYWdlU2VydmljZSc7XG5cbmV4cG9ydCB2YXIgSW1hZ2VNYXBMYXllciA9IFJhc3RlckxheWVyLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIHVwZGF0ZUludGVydmFsOiAxNTAsXG4gICAgZm9ybWF0OiAnanBncG5nJyxcbiAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICBmOiAnanNvbidcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UucXVlcnkoKTtcbiAgfSxcblxuICBpZGVudGlmeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaWRlbnRpZnkoKTtcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMudXJsID0gY2xlYW5Vcmwob3B0aW9ucy51cmwpO1xuICAgIHRoaXMuc2VydmljZSA9IGltYWdlU2VydmljZShvcHRpb25zKTtcbiAgICB0aGlzLnNlcnZpY2UuYWRkRXZlbnRQYXJlbnQodGhpcyk7XG5cbiAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICBzZXRQaXhlbFR5cGU6IGZ1bmN0aW9uIChwaXhlbFR5cGUpIHtcbiAgICB0aGlzLm9wdGlvbnMucGl4ZWxUeXBlID0gcGl4ZWxUeXBlO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldFBpeGVsVHlwZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucGl4ZWxUeXBlO1xuICB9LFxuXG4gIHNldEJhbmRJZHM6IGZ1bmN0aW9uIChiYW5kSWRzKSB7XG4gICAgaWYgKEwuVXRpbC5pc0FycmF5KGJhbmRJZHMpKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuYmFuZElkcyA9IGJhbmRJZHMuam9pbignLCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wdGlvbnMuYmFuZElkcyA9IGJhbmRJZHMudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0QmFuZElkczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYmFuZElkcztcbiAgfSxcblxuICBzZXROb0RhdGE6IGZ1bmN0aW9uIChub0RhdGEsIG5vRGF0YUludGVycHJldGF0aW9uKSB7XG4gICAgaWYgKEwuVXRpbC5pc0FycmF5KG5vRGF0YSkpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5ub0RhdGEgPSBub0RhdGEuam9pbignLCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wdGlvbnMubm9EYXRhID0gbm9EYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChub0RhdGFJbnRlcnByZXRhdGlvbikge1xuICAgICAgdGhpcy5vcHRpb25zLm5vRGF0YUludGVycHJldGF0aW9uID0gbm9EYXRhSW50ZXJwcmV0YXRpb247XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldE5vRGF0YTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubm9EYXRhO1xuICB9LFxuXG4gIGdldE5vRGF0YUludGVycHJldGF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5ub0RhdGFJbnRlcnByZXRhdGlvbjtcbiAgfSxcblxuICBzZXRSZW5kZXJpbmdSdWxlOiBmdW5jdGlvbiAocmVuZGVyaW5nUnVsZSkge1xuICAgIHRoaXMub3B0aW9ucy5yZW5kZXJpbmdSdWxlID0gcmVuZGVyaW5nUnVsZTtcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgfSxcblxuICBnZXRSZW5kZXJpbmdSdWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZW5kZXJpbmdSdWxlO1xuICB9LFxuXG4gIHNldE1vc2FpY1J1bGU6IGZ1bmN0aW9uIChtb3NhaWNSdWxlKSB7XG4gICAgdGhpcy5vcHRpb25zLm1vc2FpY1J1bGUgPSBtb3NhaWNSdWxlO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICB9LFxuXG4gIGdldE1vc2FpY1J1bGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm1vc2FpY1J1bGU7XG4gIH0sXG5cbiAgX2dldFBvcHVwRGF0YTogZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgY2FsbGJhY2sgPSBMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9IC8vIHdlIHJlYWxseSBjYW4ndCBkbyBhbnl0aGluZyBoZXJlIGJ1dCBhdXRoZW50aWNhdGUgb3IgcmVxdWVzdGVycm9yIHdpbGwgZmlyZVxuICAgICAgc2V0VGltZW91dChMLlV0aWwuYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlclBvcHVwKGUubGF0bG5nLCBlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyksIDMwMCk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB2YXIgaWRlbnRpZnlSZXF1ZXN0ID0gdGhpcy5pZGVudGlmeSgpLmF0KGUubGF0bG5nKTtcblxuICAgIC8vIHNldCBtb3NhaWMgcnVsZSBmb3IgaWRlbnRpZnkgdGFzayBpZiBpdCBpcyBzZXQgZm9yIGxheWVyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tb3NhaWNSdWxlKSB7XG4gICAgICBpZGVudGlmeVJlcXVlc3Quc2V0TW9zYWljUnVsZSh0aGlzLm9wdGlvbnMubW9zYWljUnVsZSk7XG4gICAgICAvLyBAVE9ETzogZm9yY2UgcmV0dXJuIGNhdGFsb2cgaXRlbXMgdG9vP1xuICAgIH1cblxuICAgIC8vIEBUT0RPOiBzZXQgcmVuZGVyaW5nIHJ1bGU/IE5vdCBzdXJlLFxuICAgIC8vIHNvbWV0aW1lcyB5b3Ugd2FudCByYXcgcGl4ZWwgdmFsdWVzXG4gICAgLy8gaWYgKHRoaXMub3B0aW9ucy5yZW5kZXJpbmdSdWxlKSB7XG4gICAgLy8gICBpZGVudGlmeVJlcXVlc3Quc2V0UmVuZGVyaW5nUnVsZSh0aGlzLm9wdGlvbnMucmVuZGVyaW5nUnVsZSk7XG4gICAgLy8gfVxuXG4gICAgaWRlbnRpZnlSZXF1ZXN0LnJ1bihjYWxsYmFjayk7XG5cbiAgICAvLyBzZXQgdGhlIGZsYWdzIHRvIHNob3cgdGhlIHBvcHVwXG4gICAgdGhpcy5fc2hvdWxkUmVuZGVyUG9wdXAgPSB0cnVlO1xuICAgIHRoaXMuX2xhc3RDbGljayA9IGUubGF0bG5nO1xuICB9LFxuXG4gIF9idWlsZEV4cG9ydFBhcmFtczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLl9tYXAuZ2V0Qm91bmRzKCk7XG4gICAgdmFyIHNpemUgPSB0aGlzLl9tYXAuZ2V0U2l6ZSgpO1xuICAgIHZhciBuZSA9IHRoaXMuX21hcC5vcHRpb25zLmNycy5wcm9qZWN0KGJvdW5kcy5fbm9ydGhFYXN0KTtcbiAgICB2YXIgc3cgPSB0aGlzLl9tYXAub3B0aW9ucy5jcnMucHJvamVjdChib3VuZHMuX3NvdXRoV2VzdCk7XG5cbiAgICAvLyBlbnN1cmUgdGhhdCB3ZSBkb24ndCBhc2sgQXJjR0lTIFNlcnZlciBmb3IgYSB0YWxsZXIgaW1hZ2UgdGhhbiB3ZSBoYXZlIGFjdHVhbCBtYXAgZGlzcGxheWluZ1xuICAgIHZhciB0b3AgPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KGJvdW5kcy5fbm9ydGhFYXN0KTtcbiAgICB2YXIgYm90dG9tID0gdGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludChib3VuZHMuX3NvdXRoV2VzdCk7XG5cbiAgICBpZiAodG9wLnkgPiAwIHx8IGJvdHRvbS55IDwgc2l6ZS55KSB7XG4gICAgICBzaXplLnkgPSBib3R0b20ueSAtIHRvcC55O1xuICAgIH1cblxuICAgIHZhciBzciA9IHBhcnNlSW50KHRoaXMuX21hcC5vcHRpb25zLmNycy5jb2RlLnNwbGl0KCc6JylbMV0sIDEwKTtcblxuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBiYm94OiBbc3cueCwgc3cueSwgbmUueCwgbmUueV0uam9pbignLCcpLFxuICAgICAgc2l6ZTogc2l6ZS54ICsgJywnICsgc2l6ZS55LFxuICAgICAgZm9ybWF0OiB0aGlzLm9wdGlvbnMuZm9ybWF0LFxuICAgICAgdHJhbnNwYXJlbnQ6IHRoaXMub3B0aW9ucy50cmFuc3BhcmVudCxcbiAgICAgIGJib3hTUjogc3IsXG4gICAgICBpbWFnZVNSOiBzclxuICAgIH07XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmZyb20gJiYgdGhpcy5vcHRpb25zLnRvKSB7XG4gICAgICBwYXJhbXMudGltZSA9IHRoaXMub3B0aW9ucy5mcm9tLnZhbHVlT2YoKSArICcsJyArIHRoaXMub3B0aW9ucy50by52YWx1ZU9mKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5waXhlbFR5cGUpIHtcbiAgICAgIHBhcmFtcy5waXhlbFR5cGUgPSB0aGlzLm9wdGlvbnMucGl4ZWxUeXBlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuaW50ZXJwb2xhdGlvbikge1xuICAgICAgcGFyYW1zLmludGVycG9sYXRpb24gPSB0aGlzLm9wdGlvbnMuaW50ZXJwb2xhdGlvbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbXByZXNzaW9uUXVhbGl0eSkge1xuICAgICAgcGFyYW1zLmNvbXByZXNzaW9uUXVhbGl0eSA9IHRoaXMub3B0aW9ucy5jb21wcmVzc2lvblF1YWxpdHk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5iYW5kSWRzKSB7XG4gICAgICBwYXJhbXMuYmFuZElkcyA9IHRoaXMub3B0aW9ucy5iYW5kSWRzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMubm9EYXRhKSB7XG4gICAgICBwYXJhbXMubm9EYXRhID0gdGhpcy5vcHRpb25zLm5vRGF0YTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLm5vRGF0YUludGVycHJldGF0aW9uKSB7XG4gICAgICBwYXJhbXMubm9EYXRhSW50ZXJwcmV0YXRpb24gPSB0aGlzLm9wdGlvbnMubm9EYXRhSW50ZXJwcmV0YXRpb247XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VydmljZS5vcHRpb25zLnRva2VuKSB7XG4gICAgICBwYXJhbXMudG9rZW4gPSB0aGlzLnNlcnZpY2Uub3B0aW9ucy50b2tlbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlbmRlcmluZ1J1bGUpIHtcbiAgICAgIHBhcmFtcy5yZW5kZXJpbmdSdWxlID0gSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLnJlbmRlcmluZ1J1bGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMubW9zYWljUnVsZSkge1xuICAgICAgcGFyYW1zLm1vc2FpY1J1bGUgPSBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMubW9zYWljUnVsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfSxcblxuICBfcmVxdWVzdEV4cG9ydDogZnVuY3Rpb24gKHBhcmFtcywgYm91bmRzKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5mID09PSAnanNvbicpIHtcbiAgICAgIHRoaXMuc2VydmljZS5yZXF1ZXN0KCdleHBvcnRJbWFnZScsIHBhcmFtcywgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9IC8vIHdlIHJlYWxseSBjYW4ndCBkbyBhbnl0aGluZyBoZXJlIGJ1dCBhdXRoZW50aWNhdGUgb3IgcmVxdWVzdGVycm9yIHdpbGwgZmlyZVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRva2VuKSB7XG4gICAgICAgICAgcmVzcG9uc2UuaHJlZiArPSAoJz90b2tlbj0nICsgdGhpcy5vcHRpb25zLnRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW5kZXJJbWFnZShyZXNwb25zZS5ocmVmLCBib3VuZHMpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmFtcy5mID0gJ2ltYWdlJztcbiAgICAgIHRoaXMuX3JlbmRlckltYWdlKHRoaXMub3B0aW9ucy51cmwgKyAnZXhwb3J0SW1hZ2UnICsgTC5VdGlsLmdldFBhcmFtU3RyaW5nKHBhcmFtcyksIGJvdW5kcyk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGltYWdlTWFwTGF5ZXIgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IEltYWdlTWFwTGF5ZXIodXJsLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW1hZ2VNYXBMYXllcjtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgUmFzdGVyTGF5ZXIgfSBmcm9tICcuL1Jhc3RlckxheWVyJztcbmltcG9ydCB7IGNsZWFuVXJsIH0gZnJvbSAnLi4vVXRpbCc7XG5pbXBvcnQgbWFwU2VydmljZSBmcm9tICcuLi9TZXJ2aWNlcy9NYXBTZXJ2aWNlJztcblxuZXhwb3J0IHZhciBEeW5hbWljTWFwTGF5ZXIgPSBSYXN0ZXJMYXllci5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICB1cGRhdGVJbnRlcnZhbDogMTUwLFxuICAgIGxheWVyczogZmFsc2UsXG4gICAgbGF5ZXJEZWZzOiBmYWxzZSxcbiAgICB0aW1lT3B0aW9uczogZmFsc2UsXG4gICAgZm9ybWF0OiAncG5nMjQnLFxuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIGY6ICdqc29uJ1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucy51cmwgPSBjbGVhblVybChvcHRpb25zLnVybCk7XG4gICAgdGhpcy5zZXJ2aWNlID0gbWFwU2VydmljZShvcHRpb25zKTtcbiAgICB0aGlzLnNlcnZpY2UuYWRkRXZlbnRQYXJlbnQodGhpcyk7XG5cbiAgICBpZiAoKG9wdGlvbnMucHJveHkgfHwgb3B0aW9ucy50b2tlbikgJiYgb3B0aW9ucy5mICE9PSAnanNvbicpIHtcbiAgICAgIG9wdGlvbnMuZiA9ICdqc29uJztcbiAgICB9XG4gICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gIH0sXG5cbiAgZ2V0RHluYW1pY0xheWVyczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZHluYW1pY0xheWVycztcbiAgfSxcblxuICBzZXREeW5hbWljTGF5ZXJzOiBmdW5jdGlvbiAoZHluYW1pY0xheWVycykge1xuICAgIHRoaXMub3B0aW9ucy5keW5hbWljTGF5ZXJzID0gZHluYW1pY0xheWVycztcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRMYXllcnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxheWVycztcbiAgfSxcblxuICBzZXRMYXllcnM6IGZ1bmN0aW9uIChsYXllcnMpIHtcbiAgICB0aGlzLm9wdGlvbnMubGF5ZXJzID0gbGF5ZXJzO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldExheWVyRGVmczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubGF5ZXJEZWZzO1xuICB9LFxuXG4gIHNldExheWVyRGVmczogZnVuY3Rpb24gKGxheWVyRGVmcykge1xuICAgIHRoaXMub3B0aW9ucy5sYXllckRlZnMgPSBsYXllckRlZnM7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0VGltZU9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRpbWVPcHRpb25zO1xuICB9LFxuXG4gIHNldFRpbWVPcHRpb25zOiBmdW5jdGlvbiAodGltZU9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMudGltZU9wdGlvbnMgPSB0aW1lT3B0aW9ucztcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UucXVlcnkoKTtcbiAgfSxcblxuICBpZGVudGlmeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaWRlbnRpZnkoKTtcbiAgfSxcblxuICBmaW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5maW5kKCk7XG4gIH0sXG5cbiAgX2dldFBvcHVwRGF0YTogZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgY2FsbGJhY2sgPSBMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIGZlYXR1cmVDb2xsZWN0aW9uLCByZXNwb25zZSkge1xuICAgICAgaWYgKGVycm9yKSB7IHJldHVybjsgfSAvLyB3ZSByZWFsbHkgY2FuJ3QgZG8gYW55dGhpbmcgaGVyZSBidXQgYXV0aGVudGljYXRlIG9yIHJlcXVlc3RlcnJvciB3aWxsIGZpcmVcbiAgICAgIHNldFRpbWVvdXQoTC5VdGlsLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9yZW5kZXJQb3B1cChlLmxhdGxuZywgZXJyb3IsIGZlYXR1cmVDb2xsZWN0aW9uLCByZXNwb25zZSk7XG4gICAgICB9LCB0aGlzKSwgMzAwKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHZhciBpZGVudGlmeVJlcXVlc3QgPSB0aGlzLmlkZW50aWZ5KCkub24odGhpcy5fbWFwKS5hdChlLmxhdGxuZyk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmxheWVycykge1xuICAgICAgaWRlbnRpZnlSZXF1ZXN0LmxheWVycygndmlzaWJsZTonICsgdGhpcy5vcHRpb25zLmxheWVycy5qb2luKCcsJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZGVudGlmeVJlcXVlc3QubGF5ZXJzKCd2aXNpYmxlJyk7XG4gICAgfVxuXG4gICAgaWRlbnRpZnlSZXF1ZXN0LnJ1bihjYWxsYmFjayk7XG5cbiAgICAvLyBzZXQgdGhlIGZsYWdzIHRvIHNob3cgdGhlIHBvcHVwXG4gICAgdGhpcy5fc2hvdWxkUmVuZGVyUG9wdXAgPSB0cnVlO1xuICAgIHRoaXMuX2xhc3RDbGljayA9IGUubGF0bG5nO1xuICB9LFxuXG4gIF9idWlsZEV4cG9ydFBhcmFtczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLl9tYXAuZ2V0Qm91bmRzKCk7XG4gICAgdmFyIHNpemUgPSB0aGlzLl9tYXAuZ2V0U2l6ZSgpO1xuICAgIHZhciBuZSA9IHRoaXMuX21hcC5vcHRpb25zLmNycy5wcm9qZWN0KGJvdW5kcy5nZXROb3J0aEVhc3QoKSk7XG4gICAgdmFyIHN3ID0gdGhpcy5fbWFwLm9wdGlvbnMuY3JzLnByb2plY3QoYm91bmRzLmdldFNvdXRoV2VzdCgpKTtcbiAgICB2YXIgc3IgPSBwYXJzZUludCh0aGlzLl9tYXAub3B0aW9ucy5jcnMuY29kZS5zcGxpdCgnOicpWzFdLCAxMCk7XG5cbiAgICAvLyBlbnN1cmUgdGhhdCB3ZSBkb24ndCBhc2sgQXJjR0lTIFNlcnZlciBmb3IgYSB0YWxsZXIgaW1hZ2UgdGhhbiB3ZSBoYXZlIGFjdHVhbCBtYXAgZGlzcGxheWluZ1xuICAgIHZhciB0b3AgPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KGJvdW5kcy5fbm9ydGhFYXN0KTtcbiAgICB2YXIgYm90dG9tID0gdGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludChib3VuZHMuX3NvdXRoV2VzdCk7XG5cbiAgICBpZiAodG9wLnkgPiAwIHx8IGJvdHRvbS55IDwgc2l6ZS55KSB7XG4gICAgICBzaXplLnkgPSBib3R0b20ueSAtIHRvcC55O1xuICAgIH1cblxuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBiYm94OiBbc3cueCwgc3cueSwgbmUueCwgbmUueV0uam9pbignLCcpLFxuICAgICAgc2l6ZTogc2l6ZS54ICsgJywnICsgc2l6ZS55LFxuICAgICAgZHBpOiA5NixcbiAgICAgIGZvcm1hdDogdGhpcy5vcHRpb25zLmZvcm1hdCxcbiAgICAgIHRyYW5zcGFyZW50OiB0aGlzLm9wdGlvbnMudHJhbnNwYXJlbnQsXG4gICAgICBiYm94U1I6IHNyLFxuICAgICAgaW1hZ2VTUjogc3JcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5keW5hbWljTGF5ZXJzKSB7XG4gICAgICBwYXJhbXMuZHluYW1pY0xheWVycyA9IHRoaXMub3B0aW9ucy5keW5hbWljTGF5ZXJzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXJzKSB7XG4gICAgICBwYXJhbXMubGF5ZXJzID0gJ3Nob3c6JyArIHRoaXMub3B0aW9ucy5sYXllcnMuam9pbignLCcpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMubGF5ZXJEZWZzKSB7XG4gICAgICBwYXJhbXMubGF5ZXJEZWZzID0gSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLmxheWVyRGVmcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lT3B0aW9ucykge1xuICAgICAgcGFyYW1zLnRpbWVPcHRpb25zID0gSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLnRpbWVPcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmZyb20gJiYgdGhpcy5vcHRpb25zLnRvKSB7XG4gICAgICBwYXJhbXMudGltZSA9IHRoaXMub3B0aW9ucy5mcm9tLnZhbHVlT2YoKSArICcsJyArIHRoaXMub3B0aW9ucy50by52YWx1ZU9mKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VydmljZS5vcHRpb25zLnRva2VuKSB7XG4gICAgICBwYXJhbXMudG9rZW4gPSB0aGlzLnNlcnZpY2Uub3B0aW9ucy50b2tlbjtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9LFxuXG4gIF9yZXF1ZXN0RXhwb3J0OiBmdW5jdGlvbiAocGFyYW1zLCBib3VuZHMpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmYgPT09ICdqc29uJykge1xuICAgICAgdGhpcy5zZXJ2aWNlLnJlcXVlc3QoJ2V4cG9ydCcsIHBhcmFtcywgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9IC8vIHdlIHJlYWxseSBjYW4ndCBkbyBhbnl0aGluZyBoZXJlIGJ1dCBhdXRoZW50aWNhdGUgb3IgcmVxdWVzdGVycm9yIHdpbGwgZmlyZVxuICAgICAgICBpZiAocmVzcG9uc2UuaHJlZikge1xuICAgICAgICAgIHRoaXMuX3JlbmRlckltYWdlKHJlc3BvbnNlLmhyZWYsIGJvdW5kcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVySW1hZ2UocmVzcG9uc2UuaW1hZ2VEYXRhLCBib3VuZHMsIHJlc3BvbnNlLmNvbnRlbnRUeXBlKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmFtcy5mID0gJ2ltYWdlJztcbiAgICAgIHRoaXMuX3JlbmRlckltYWdlKHRoaXMub3B0aW9ucy51cmwgKyAnZXhwb3J0JyArIEwuVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMpLCBib3VuZHMpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkeW5hbWljTWFwTGF5ZXIgKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IER5bmFtaWNNYXBMYXllcih1cmwsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkeW5hbWljTWFwTGF5ZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcblxudmFyIFZpcnR1YWxHcmlkID0gTC5MYXllci5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBjZWxsU2l6ZTogNTEyLFxuICAgIHVwZGF0ZUludGVydmFsOiAxNTBcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fem9vbWluZyA9IGZhbHNlO1xuICB9LFxuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgdGhpcy5fbWFwID0gbWFwO1xuICAgIHRoaXMuX3VwZGF0ZSA9IEwuVXRpbC50aHJvdHRsZSh0aGlzLl91cGRhdGUsIHRoaXMub3B0aW9ucy51cGRhdGVJbnRlcnZhbCwgdGhpcyk7XG4gICAgdGhpcy5fcmVzZXQoKTtcbiAgICB0aGlzLl91cGRhdGUoKTtcbiAgfSxcblxuICBvblJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX21hcC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZ2V0RXZlbnRzKCksIHRoaXMpO1xuICAgIHRoaXMuX3JlbW92ZUNlbGxzKCk7XG4gIH0sXG5cbiAgZ2V0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV2ZW50cyA9IHtcbiAgICAgIG1vdmVlbmQ6IHRoaXMuX3VwZGF0ZSxcbiAgICAgIHpvb21zdGFydDogdGhpcy5fem9vbXN0YXJ0LFxuICAgICAgem9vbWVuZDogdGhpcy5fcmVzZXRcbiAgICB9O1xuXG4gICAgcmV0dXJuIGV2ZW50cztcbiAgfSxcblxuICBhZGRUbzogZnVuY3Rpb24gKG1hcCkge1xuICAgIG1hcC5hZGRMYXllcih0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZW1vdmVGcm9tOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgbWFwLnJlbW92ZUxheWVyKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIF96b29tc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl96b29taW5nID0gdHJ1ZTtcbiAgfSxcblxuICBfcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9yZW1vdmVDZWxscygpO1xuXG4gICAgdGhpcy5fY2VsbHMgPSB7fTtcbiAgICB0aGlzLl9hY3RpdmVDZWxscyA9IHt9O1xuICAgIHRoaXMuX2NlbGxzVG9Mb2FkID0gMDtcbiAgICB0aGlzLl9jZWxsc1RvdGFsID0gMDtcbiAgICB0aGlzLl9jZWxsTnVtQm91bmRzID0gdGhpcy5fZ2V0Q2VsbE51bUJvdW5kcygpO1xuXG4gICAgdGhpcy5fcmVzZXRXcmFwKCk7XG4gICAgdGhpcy5fem9vbWluZyA9IGZhbHNlO1xuICB9LFxuXG4gIF9yZXNldFdyYXA6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuICAgIHZhciBjcnMgPSBtYXAub3B0aW9ucy5jcnM7XG5cbiAgICBpZiAoY3JzLmluZmluaXRlKSB7IHJldHVybjsgfVxuXG4gICAgdmFyIGNlbGxTaXplID0gdGhpcy5fZ2V0Q2VsbFNpemUoKTtcblxuICAgIGlmIChjcnMud3JhcExuZykge1xuICAgICAgdGhpcy5fd3JhcExuZyA9IFtcbiAgICAgICAgTWF0aC5mbG9vcihtYXAucHJvamVjdChbMCwgY3JzLndyYXBMbmdbMF1dKS54IC8gY2VsbFNpemUpLFxuICAgICAgICBNYXRoLmNlaWwobWFwLnByb2plY3QoWzAsIGNycy53cmFwTG5nWzFdXSkueCAvIGNlbGxTaXplKVxuICAgICAgXTtcbiAgICB9XG5cbiAgICBpZiAoY3JzLndyYXBMYXQpIHtcbiAgICAgIHRoaXMuX3dyYXBMYXQgPSBbXG4gICAgICAgIE1hdGguZmxvb3IobWFwLnByb2plY3QoW2Nycy53cmFwTGF0WzBdLCAwXSkueSAvIGNlbGxTaXplKSxcbiAgICAgICAgTWF0aC5jZWlsKG1hcC5wcm9qZWN0KFtjcnMud3JhcExhdFsxXSwgMF0pLnkgLyBjZWxsU2l6ZSlcbiAgICAgIF07XG4gICAgfVxuICB9LFxuXG4gIF9nZXRDZWxsU2l6ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2VsbFNpemU7XG4gIH0sXG5cbiAgX3VwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRQaXhlbEJvdW5kcygpO1xuICAgIHZhciBjZWxsU2l6ZSA9IHRoaXMuX2dldENlbGxTaXplKCk7XG5cbiAgICAvLyBjZWxsIGNvb3JkaW5hdGVzIHJhbmdlIGZvciB0aGUgY3VycmVudCB2aWV3XG4gICAgdmFyIGNlbGxCb3VuZHMgPSBMLmJvdW5kcyhcbiAgICAgIGJvdW5kcy5taW4uZGl2aWRlQnkoY2VsbFNpemUpLmZsb29yKCksXG4gICAgICBib3VuZHMubWF4LmRpdmlkZUJ5KGNlbGxTaXplKS5mbG9vcigpKTtcblxuICAgIHRoaXMuX3JlbW92ZU90aGVyQ2VsbHMoY2VsbEJvdW5kcyk7XG4gICAgdGhpcy5fYWRkQ2VsbHMoY2VsbEJvdW5kcyk7XG5cbiAgICB0aGlzLmZpcmUoJ2NlbGxzdXBkYXRlZCcpO1xuICB9LFxuXG4gIF9hZGRDZWxsczogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgIHZhciBjZW50ZXIgPSBib3VuZHMuZ2V0Q2VudGVyKCk7XG4gICAgdmFyIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuXG4gICAgdmFyIGosIGksIGNvb3JkcztcbiAgICAvLyBjcmVhdGUgYSBxdWV1ZSBvZiBjb29yZGluYXRlcyB0byBsb2FkIGNlbGxzIGZyb21cbiAgICBmb3IgKGogPSBib3VuZHMubWluLnk7IGogPD0gYm91bmRzLm1heC55OyBqKyspIHtcbiAgICAgIGZvciAoaSA9IGJvdW5kcy5taW4ueDsgaSA8PSBib3VuZHMubWF4Lng7IGkrKykge1xuICAgICAgICBjb29yZHMgPSBMLnBvaW50KGksIGopO1xuICAgICAgICBjb29yZHMueiA9IHpvb207XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzVmFsaWRDZWxsKGNvb3JkcykpIHtcbiAgICAgICAgICBxdWV1ZS5wdXNoKGNvb3Jkcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2VsbHNUb0xvYWQgPSBxdWV1ZS5sZW5ndGg7XG5cbiAgICBpZiAoY2VsbHNUb0xvYWQgPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICB0aGlzLl9jZWxsc1RvTG9hZCArPSBjZWxsc1RvTG9hZDtcbiAgICB0aGlzLl9jZWxsc1RvdGFsICs9IGNlbGxzVG9Mb2FkO1xuXG4gICAgLy8gc29ydCBjZWxsIHF1ZXVlIHRvIGxvYWQgY2VsbHMgaW4gb3JkZXIgb2YgdGhlaXIgZGlzdGFuY2UgdG8gY2VudGVyXG4gICAgcXVldWUuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEuZGlzdGFuY2VUbyhjZW50ZXIpIC0gYi5kaXN0YW5jZVRvKGNlbnRlcik7XG4gICAgfSk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgY2VsbHNUb0xvYWQ7IGkrKykge1xuICAgICAgdGhpcy5fYWRkQ2VsbChxdWV1ZVtpXSk7XG4gICAgfVxuICB9LFxuXG4gIF9pc1ZhbGlkQ2VsbDogZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgIHZhciBjcnMgPSB0aGlzLl9tYXAub3B0aW9ucy5jcnM7XG5cbiAgICBpZiAoIWNycy5pbmZpbml0ZSkge1xuICAgICAgLy8gZG9uJ3QgbG9hZCBjZWxsIGlmIGl0J3Mgb3V0IG9mIGJvdW5kcyBhbmQgbm90IHdyYXBwZWRcbiAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsTnVtQm91bmRzO1xuICAgICAgaWYgKFxuICAgICAgICAoIWNycy53cmFwTG5nICYmIChjb29yZHMueCA8IGJvdW5kcy5taW4ueCB8fCBjb29yZHMueCA+IGJvdW5kcy5tYXgueCkpIHx8XG4gICAgICAgICghY3JzLndyYXBMYXQgJiYgKGNvb3Jkcy55IDwgYm91bmRzLm1pbi55IHx8IGNvb3Jkcy55ID4gYm91bmRzLm1heC55KSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYm91bmRzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBkb24ndCBsb2FkIGNlbGwgaWYgaXQgZG9lc24ndCBpbnRlcnNlY3QgdGhlIGJvdW5kcyBpbiBvcHRpb25zXG4gICAgdmFyIGNlbGxCb3VuZHMgPSB0aGlzLl9jZWxsQ29vcmRzVG9Cb3VuZHMoY29vcmRzKTtcbiAgICByZXR1cm4gTC5sYXRMbmdCb3VuZHModGhpcy5vcHRpb25zLmJvdW5kcykuaW50ZXJzZWN0cyhjZWxsQm91bmRzKTtcbiAgfSxcblxuICAvLyBjb252ZXJ0cyBjZWxsIGNvb3JkaW5hdGVzIHRvIGl0cyBnZW9ncmFwaGljYWwgYm91bmRzXG4gIF9jZWxsQ29vcmRzVG9Cb3VuZHM6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuICAgIHZhciBjZWxsU2l6ZSA9IHRoaXMub3B0aW9ucy5jZWxsU2l6ZTtcbiAgICB2YXIgbndQb2ludCA9IGNvb3Jkcy5tdWx0aXBseUJ5KGNlbGxTaXplKTtcbiAgICB2YXIgc2VQb2ludCA9IG53UG9pbnQuYWRkKFtjZWxsU2l6ZSwgY2VsbFNpemVdKTtcbiAgICB2YXIgbncgPSBtYXAud3JhcExhdExuZyhtYXAudW5wcm9qZWN0KG53UG9pbnQsIGNvb3Jkcy56KSk7XG4gICAgdmFyIHNlID0gbWFwLndyYXBMYXRMbmcobWFwLnVucHJvamVjdChzZVBvaW50LCBjb29yZHMueikpO1xuXG4gICAgcmV0dXJuIEwubGF0TG5nQm91bmRzKG53LCBzZSk7XG4gIH0sXG5cbiAgLy8gY29udmVydHMgY2VsbCBjb29yZGluYXRlcyB0byBrZXkgZm9yIHRoZSBjZWxsIGNhY2hlXG4gIF9jZWxsQ29vcmRzVG9LZXk6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICByZXR1cm4gY29vcmRzLnggKyAnOicgKyBjb29yZHMueTtcbiAgfSxcblxuICAvLyBjb252ZXJ0cyBjZWxsIGNhY2hlIGtleSB0byBjb29yZGlhbnRlc1xuICBfa2V5VG9DZWxsQ29vcmRzOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGtBcnIgPSBrZXkuc3BsaXQoJzonKTtcbiAgICB2YXIgeCA9IHBhcnNlSW50KGtBcnJbMF0sIDEwKTtcbiAgICB2YXIgeSA9IHBhcnNlSW50KGtBcnJbMV0sIDEwKTtcblxuICAgIHJldHVybiBMLnBvaW50KHgsIHkpO1xuICB9LFxuXG4gIC8vIHJlbW92ZSBhbnkgcHJlc2VudCBjZWxscyB0aGF0IGFyZSBvZmYgdGhlIHNwZWNpZmllZCBib3VuZHNcbiAgX3JlbW92ZU90aGVyQ2VsbHM6IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICAgIGlmICghYm91bmRzLmNvbnRhaW5zKHRoaXMuX2tleVRvQ2VsbENvb3JkcyhrZXkpKSkge1xuICAgICAgICB0aGlzLl9yZW1vdmVDZWxsKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9yZW1vdmVDZWxsOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLl9hY3RpdmVDZWxsc1trZXldO1xuXG4gICAgaWYgKGNlbGwpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9hY3RpdmVDZWxsc1trZXldO1xuXG4gICAgICBpZiAodGhpcy5jZWxsTGVhdmUpIHtcbiAgICAgICAgdGhpcy5jZWxsTGVhdmUoY2VsbC5ib3VuZHMsIGNlbGwuY29vcmRzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maXJlKCdjZWxsbGVhdmUnLCB7XG4gICAgICAgIGJvdW5kczogY2VsbC5ib3VuZHMsXG4gICAgICAgIGNvb3JkczogY2VsbC5jb29yZHNcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBfcmVtb3ZlQ2VsbHM6IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fY2VsbHMpIHtcbiAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9jZWxsc1trZXldLmJvdW5kcztcbiAgICAgIHZhciBjb29yZHMgPSB0aGlzLl9jZWxsc1trZXldLmNvb3JkcztcblxuICAgICAgaWYgKHRoaXMuY2VsbExlYXZlKSB7XG4gICAgICAgIHRoaXMuY2VsbExlYXZlKGJvdW5kcywgY29vcmRzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maXJlKCdjZWxsbGVhdmUnLCB7XG4gICAgICAgIGJvdW5kczogYm91bmRzLFxuICAgICAgICBjb29yZHM6IGNvb3Jkc1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIF9hZGRDZWxsOiBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgLy8gd3JhcCBjZWxsIGNvb3JkcyBpZiBuZWNlc3NhcnkgKGRlcGVuZGluZyBvbiBDUlMpXG4gICAgdGhpcy5fd3JhcENvb3Jkcyhjb29yZHMpO1xuXG4gICAgLy8gZ2VuZXJhdGUgdGhlIGNlbGwga2V5XG4gICAgdmFyIGtleSA9IHRoaXMuX2NlbGxDb29yZHNUb0tleShjb29yZHMpO1xuXG4gICAgLy8gZ2V0IHRoZSBjZWxsIGZyb20gdGhlIGNhY2hlXG4gICAgdmFyIGNlbGwgPSB0aGlzLl9jZWxsc1trZXldO1xuICAgIC8vIGlmIHRoaXMgY2VsbCBzaG91bGQgYmUgc2hvd24gYXMgaXNudCBhY3RpdmUgeWV0IChlbnRlcilcblxuICAgIGlmIChjZWxsICYmICF0aGlzLl9hY3RpdmVDZWxsc1trZXldKSB7XG4gICAgICBpZiAodGhpcy5jZWxsRW50ZXIpIHtcbiAgICAgICAgdGhpcy5jZWxsRW50ZXIoY2VsbC5ib3VuZHMsIGNvb3Jkcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlyZSgnY2VsbGVudGVyJywge1xuICAgICAgICBib3VuZHM6IGNlbGwuYm91bmRzLFxuICAgICAgICBjb29yZHM6IGNvb3Jkc1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2FjdGl2ZUNlbGxzW2tleV0gPSBjZWxsO1xuICAgIH1cblxuICAgIC8vIGlmIHdlIGRvbnQgaGF2ZSB0aGlzIGNlbGwgaW4gdGhlIGNhY2hlIHlldCAoY3JlYXRlKVxuICAgIGlmICghY2VsbCkge1xuICAgICAgY2VsbCA9IHtcbiAgICAgICAgY29vcmRzOiBjb29yZHMsXG4gICAgICAgIGJvdW5kczogdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3JkcylcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX2NlbGxzW2tleV0gPSBjZWxsO1xuICAgICAgdGhpcy5fYWN0aXZlQ2VsbHNba2V5XSA9IGNlbGw7XG5cbiAgICAgIGlmICh0aGlzLmNyZWF0ZUNlbGwpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVDZWxsKGNlbGwuYm91bmRzLCBjb29yZHMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcmUoJ2NlbGxjcmVhdGUnLCB7XG4gICAgICAgIGJvdW5kczogY2VsbC5ib3VuZHMsXG4gICAgICAgIGNvb3JkczogY29vcmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX3dyYXBDb29yZHM6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICBjb29yZHMueCA9IHRoaXMuX3dyYXBMbmcgPyBMLlV0aWwud3JhcE51bShjb29yZHMueCwgdGhpcy5fd3JhcExuZykgOiBjb29yZHMueDtcbiAgICBjb29yZHMueSA9IHRoaXMuX3dyYXBMYXQgPyBMLlV0aWwud3JhcE51bShjb29yZHMueSwgdGhpcy5fd3JhcExhdCkgOiBjb29yZHMueTtcbiAgfSxcblxuICAvLyBnZXQgdGhlIGdsb2JhbCBjZWxsIGNvb3JkaW5hdGVzIHJhbmdlIGZvciB0aGUgY3VycmVudCB6b29tXG4gIF9nZXRDZWxsTnVtQm91bmRzOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRQaXhlbFdvcmxkQm91bmRzKCk7XG4gICAgdmFyIHNpemUgPSB0aGlzLl9nZXRDZWxsU2l6ZSgpO1xuXG4gICAgcmV0dXJuIGJvdW5kcyA/IEwuYm91bmRzKFxuICAgICAgICBib3VuZHMubWluLmRpdmlkZUJ5KHNpemUpLmZsb29yKCksXG4gICAgICAgIGJvdW5kcy5tYXguZGl2aWRlQnkoc2l6ZSkuY2VpbCgpLnN1YnRyYWN0KFsxLCAxXSkpIDogbnVsbDtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFZpcnR1YWxHcmlkO1xuIiwiZnVuY3Rpb24gQmluYXJ5U2VhcmNoSW5kZXggKHZhbHVlcykge1xuICB0aGlzLnZhbHVlcyA9IFtdLmNvbmNhdCh2YWx1ZXMgfHwgW10pO1xufVxuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleCh2YWx1ZSk7XG4gIHJldHVybiB0aGlzLnZhbHVlc1tpbmRleF07XG59O1xuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUuZ2V0SW5kZXggPSBmdW5jdGlvbiBnZXRJbmRleCAodmFsdWUpIHtcbiAgaWYgKHRoaXMuZGlydHkpIHtcbiAgICB0aGlzLnNvcnQoKTtcbiAgfVxuXG4gIHZhciBtaW5JbmRleCA9IDA7XG4gIHZhciBtYXhJbmRleCA9IHRoaXMudmFsdWVzLmxlbmd0aCAtIDE7XG4gIHZhciBjdXJyZW50SW5kZXg7XG4gIHZhciBjdXJyZW50RWxlbWVudDtcblxuICB3aGlsZSAobWluSW5kZXggPD0gbWF4SW5kZXgpIHtcbiAgICBjdXJyZW50SW5kZXggPSAobWluSW5kZXggKyBtYXhJbmRleCkgLyAyIHwgMDtcbiAgICBjdXJyZW50RWxlbWVudCA9IHRoaXMudmFsdWVzW01hdGgucm91bmQoY3VycmVudEluZGV4KV07XG4gICAgaWYgKCtjdXJyZW50RWxlbWVudC52YWx1ZSA8ICt2YWx1ZSkge1xuICAgICAgbWluSW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xuICAgIH0gZWxzZSBpZiAoK2N1cnJlbnRFbGVtZW50LnZhbHVlID4gK3ZhbHVlKSB7XG4gICAgICBtYXhJbmRleCA9IGN1cnJlbnRJbmRleCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdXJyZW50SW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE1hdGguYWJzKH5tYXhJbmRleCk7XG59O1xuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUuYmV0d2VlbiA9IGZ1bmN0aW9uIGJldHdlZW4gKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHN0YXJ0SW5kZXggPSB0aGlzLmdldEluZGV4KHN0YXJ0KTtcbiAgdmFyIGVuZEluZGV4ID0gdGhpcy5nZXRJbmRleChlbmQpO1xuXG4gIGlmIChzdGFydEluZGV4ID09PSAwICYmIGVuZEluZGV4ID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgd2hpbGUgKHRoaXMudmFsdWVzW3N0YXJ0SW5kZXggLSAxXSAmJiB0aGlzLnZhbHVlc1tzdGFydEluZGV4IC0gMV0udmFsdWUgPT09IHN0YXJ0KSB7XG4gICAgc3RhcnRJbmRleC0tO1xuICB9XG5cbiAgd2hpbGUgKHRoaXMudmFsdWVzW2VuZEluZGV4ICsgMV0gJiYgdGhpcy52YWx1ZXNbZW5kSW5kZXggKyAxXS52YWx1ZSA9PT0gZW5kKSB7XG4gICAgZW5kSW5kZXgrKztcbiAgfVxuXG4gIGlmICh0aGlzLnZhbHVlc1tlbmRJbmRleF0gJiYgdGhpcy52YWx1ZXNbZW5kSW5kZXhdLnZhbHVlID09PSBlbmQgJiYgdGhpcy52YWx1ZXNbZW5kSW5kZXggKyAxXSkge1xuICAgIGVuZEluZGV4Kys7XG4gIH1cblxuICByZXR1cm4gdGhpcy52YWx1ZXMuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xufTtcblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIGluc2VydCAoaXRlbSkge1xuICB0aGlzLnZhbHVlcy5zcGxpY2UodGhpcy5nZXRJbmRleChpdGVtLnZhbHVlKSwgMCwgaXRlbSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuQmluYXJ5U2VhcmNoSW5kZXgucHJvdG90eXBlLmJ1bGtBZGQgPSBmdW5jdGlvbiBidWxrQWRkIChpdGVtcywgc29ydCkge1xuICB0aGlzLnZhbHVlcyA9IHRoaXMudmFsdWVzLmNvbmNhdChbXS5jb25jYXQoaXRlbXMgfHwgW10pKTtcblxuICBpZiAoc29ydCkge1xuICAgIHRoaXMuc29ydCgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5CaW5hcnlTZWFyY2hJbmRleC5wcm90b3R5cGUuc29ydCA9IGZ1bmN0aW9uIHNvcnQgKCkge1xuICB0aGlzLnZhbHVlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuICtiLnZhbHVlIC0gK2EudmFsdWU7XG4gIH0pLnJldmVyc2UoKTtcbiAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJpbmFyeVNlYXJjaEluZGV4O1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgZmVhdHVyZUxheWVyU2VydmljZSBmcm9tICcuLi8uLi9TZXJ2aWNlcy9GZWF0dXJlTGF5ZXJTZXJ2aWNlJztcbmltcG9ydCB7IGNsZWFuVXJsLCB3YXJuIH0gZnJvbSAnLi4vLi4vVXRpbCc7XG5pbXBvcnQgVmlydHVhbEdyaWQgZnJvbSAnbGVhZmxldC12aXJ0dWFsLWdyaWQnO1xuaW1wb3J0IEJpbmFyeVNlYXJjaEluZGV4IGZyb20gJ3RpbnktYmluYXJ5LXNlYXJjaCc7XG5cbmV4cG9ydCB2YXIgRmVhdHVyZU1hbmFnZXIgPSBWaXJ0dWFsR3JpZC5leHRlbmQoe1xuICAvKipcbiAgICogT3B0aW9uc1xuICAgKi9cblxuICBvcHRpb25zOiB7XG4gICAgYXR0cmlidXRpb246IG51bGwsXG4gICAgd2hlcmU6ICcxPTEnLFxuICAgIGZpZWxkczogWycqJ10sXG4gICAgZnJvbTogZmFsc2UsXG4gICAgdG86IGZhbHNlLFxuICAgIHRpbWVGaWVsZDogZmFsc2UsXG4gICAgdGltZUZpbHRlck1vZGU6ICdzZXJ2ZXInLFxuICAgIHNpbXBsaWZ5RmFjdG9yOiAwLFxuICAgIHByZWNpc2lvbjogNlxuICB9LFxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKi9cblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIFZpcnR1YWxHcmlkLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICBvcHRpb25zLnVybCA9IGNsZWFuVXJsKG9wdGlvbnMudXJsKTtcbiAgICBvcHRpb25zID0gTC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5zZXJ2aWNlID0gZmVhdHVyZUxheWVyU2VydmljZShvcHRpb25zKTtcbiAgICB0aGlzLnNlcnZpY2UuYWRkRXZlbnRQYXJlbnQodGhpcyk7XG5cbiAgICAvLyB1c2UgY2FzZSBpbnNlbnNpdGl2ZSByZWdleCB0byBsb29rIGZvciBjb21tb24gZmllbGRuYW1lcyB1c2VkIGZvciBpbmRleGluZ1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZmllbGRzWzBdICE9PSAnKicpIHtcbiAgICAgIHZhciBvaWRDaGVjayA9IGZhbHNlO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMuZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZmllbGRzW2ldLm1hdGNoKC9eKE9CSkVDVElEfEZJRHxPSUR8SUQpJC9pKSkge1xuICAgICAgICAgIG9pZENoZWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9pZENoZWNrID09PSBmYWxzZSkge1xuICAgICAgICB3YXJuKCdubyBrbm93biBlc3JpRmllbGRUeXBlT0lEIGZpZWxkIGRldGVjdGVkIGluIGZpZWxkcyBBcnJheS4gIFBsZWFzZSBhZGQgYW4gYXR0cmlidXRlIGZpZWxkIGNvbnRhaW5pbmcgdW5pcXVlIElEcyB0byBlbnN1cmUgdGhlIGxheWVyIGNhbiBiZSBkcmF3biBjb3JyZWN0bHkuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQuc3RhcnQgJiYgdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmQpIHtcbiAgICAgIHRoaXMuX3N0YXJ0VGltZUluZGV4ID0gbmV3IEJpbmFyeVNlYXJjaEluZGV4KCk7XG4gICAgICB0aGlzLl9lbmRUaW1lSW5kZXggPSBuZXcgQmluYXJ5U2VhcmNoSW5kZXgoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy50aW1lRmllbGQpIHtcbiAgICAgIHRoaXMuX3RpbWVJbmRleCA9IG5ldyBCaW5hcnlTZWFyY2hJbmRleCgpO1xuICAgIH1cblxuICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgdGhpcy5fY3VycmVudFNuYXBzaG90ID0gW107IC8vIGNhY2hlIG9mIHdoYXQgbGF5ZXJzIHNob3VsZCBiZSBhY3RpdmVcbiAgICB0aGlzLl9hY3RpdmVSZXF1ZXN0cyA9IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIExheWVyIEludGVyZmFjZVxuICAgKi9cblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIC8vIGNoZWNrIHRvIHNlZSB3aGV0aGVyIHNlcnZpY2UgaXMgMTAuNCBvciBhYm92ZSAoYW5kIGNhbiBlbWl0IEdlb0pTT04gbmF0aXZlbHkpXG4gICAgdGhpcy5zZXJ2aWNlLm1ldGFkYXRhKGZ1bmN0aW9uIChlcnJvciwgbWV0YWRhdGEpIHtcbiAgICAgIHZhciBzdXBwb3J0ZWRGb3JtYXRzID0gbWV0YWRhdGEuc3VwcG9ydGVkUXVlcnlGb3JtYXRzO1xuICAgICAgaWYgKHN1cHBvcnRlZEZvcm1hdHMgJiYgc3VwcG9ydGVkRm9ybWF0cy5pbmRleE9mKCdnZW9KU09OJykgIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5vcHRpb25zLmlzTW9kZXJuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcblxuICAgIG1hcC5vbignem9vbWVuZCcsIHRoaXMuX2hhbmRsZVpvb21DaGFuZ2UsIHRoaXMpO1xuXG4gICAgcmV0dXJuIFZpcnR1YWxHcmlkLnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG4gIH0sXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBtYXAub2ZmKCd6b29tZW5kJywgdGhpcy5faGFuZGxlWm9vbUNoYW5nZSwgdGhpcyk7XG5cbiAgICByZXR1cm4gVmlydHVhbEdyaWQucHJvdG90eXBlLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcbiAgfSxcblxuICBnZXRBdHRyaWJ1dGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYXR0cmlidXRpb247XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZlYXR1cmUgTWFuYWdlbWVudFxuICAgKi9cblxuICBjcmVhdGVDZWxsOiBmdW5jdGlvbiAoYm91bmRzLCBjb29yZHMpIHtcbiAgICB0aGlzLl9yZXF1ZXN0RmVhdHVyZXMoYm91bmRzLCBjb29yZHMpO1xuICB9LFxuXG4gIF9yZXF1ZXN0RmVhdHVyZXM6IGZ1bmN0aW9uIChib3VuZHMsIGNvb3JkcywgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9hY3RpdmVSZXF1ZXN0cysrO1xuXG4gICAgLy8gb3VyIGZpcnN0IGFjdGl2ZSByZXF1ZXN0IGZpcmVzIGxvYWRpbmdcbiAgICBpZiAodGhpcy5fYWN0aXZlUmVxdWVzdHMgPT09IDEpIHtcbiAgICAgIHRoaXMuZmlyZSgnbG9hZGluZycsIHtcbiAgICAgICAgYm91bmRzOiBib3VuZHNcbiAgICAgIH0sIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9idWlsZFF1ZXJ5KGJvdW5kcykucnVuKGZ1bmN0aW9uIChlcnJvciwgZmVhdHVyZUNvbGxlY3Rpb24sIHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZXhjZWVkZWRUcmFuc2ZlckxpbWl0KSB7XG4gICAgICAgIHRoaXMuZmlyZSgnZHJhd2xpbWl0ZXhjZWVkZWQnKTtcbiAgICAgIH1cblxuICAgICAgLy8gbm8gZXJyb3IsIGZlYXR1cmVzXG4gICAgICBpZiAoIWVycm9yICYmIGZlYXR1cmVDb2xsZWN0aW9uICYmIGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICAvLyBzY2hlZHVsZSBhZGRpbmcgZmVhdHVyZXMgdW50aWwgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXG4gICAgICAgIEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKEwuVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLl9hZGRGZWF0dXJlcyhmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcywgY29vcmRzKTtcbiAgICAgICAgICB0aGlzLl9wb3N0UHJvY2Vzc0ZlYXR1cmVzKGJvdW5kcyk7XG4gICAgICAgIH0sIHRoaXMpKTtcbiAgICAgIH1cblxuICAgICAgLy8gbm8gZXJyb3IsIG5vIGZlYXR1cmVzXG4gICAgICBpZiAoIWVycm9yICYmIGZlYXR1cmVDb2xsZWN0aW9uICYmICFmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5fcG9zdFByb2Nlc3NGZWF0dXJlcyhib3VuZHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5fcG9zdFByb2Nlc3NGZWF0dXJlcyhib3VuZHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBlcnJvciwgZmVhdHVyZUNvbGxlY3Rpb24pO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIF9wb3N0UHJvY2Vzc0ZlYXR1cmVzOiBmdW5jdGlvbiAoYm91bmRzKSB7XG4gICAgLy8gZGVpbmNyaW1lbnQgdGhlIHJlcXVlc3QgY291bnRlciBub3cgdGhhdCB3ZSBoYXZlIHByb2Nlc3NlZCBmZWF0dXJlc1xuICAgIHRoaXMuX2FjdGl2ZVJlcXVlc3RzLS07XG5cbiAgICAvLyBpZiB0aGVyZSBhcmUgbm8gbW9yZSBhY3RpdmUgcmVxdWVzdHMgZmlyZSBhIGxvYWQgZXZlbnQgZm9yIHRoaXMgdmlld1xuICAgIGlmICh0aGlzLl9hY3RpdmVSZXF1ZXN0cyA8PSAwKSB7XG4gICAgICB0aGlzLmZpcmUoJ2xvYWQnLCB7XG4gICAgICAgIGJvdW5kczogYm91bmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX2NhY2hlS2V5OiBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgcmV0dXJuIGNvb3Jkcy56ICsgJzonICsgY29vcmRzLnggKyAnOicgKyBjb29yZHMueTtcbiAgfSxcblxuICBfYWRkRmVhdHVyZXM6IGZ1bmN0aW9uIChmZWF0dXJlcywgY29vcmRzKSB7XG4gICAgdmFyIGtleSA9IHRoaXMuX2NhY2hlS2V5KGNvb3Jkcyk7XG4gICAgdGhpcy5fY2FjaGVba2V5XSA9IHRoaXMuX2NhY2hlW2tleV0gfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gZmVhdHVyZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBpZCA9IGZlYXR1cmVzW2ldLmlkO1xuICAgICAgdGhpcy5fY3VycmVudFNuYXBzaG90LnB1c2goaWQpO1xuICAgICAgdGhpcy5fY2FjaGVba2V5XS5wdXNoKGlkKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWVsZCkge1xuICAgICAgdGhpcy5fYnVpbGRUaW1lSW5kZXhlcyhmZWF0dXJlcyk7XG4gICAgfVxuXG4gICAgLy8gbmVlZCB0byBQUiByZW1vdmFsIG9mIHRoZSBsb2dpYyBiZWxvdyB0b28uLi5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcGF0cmlja2FybHQvbGVhZmxldC12aXJ0dWFsLWdyaWQvYmxvYi9tYXN0ZXIvc3JjL3ZpcnR1YWwtZ3JpZC5qcyNMMTAwLUwxMDJcblxuICAgIHRoaXMuY3JlYXRlTGF5ZXJzKGZlYXR1cmVzKTtcbiAgfSxcblxuICBfYnVpbGRRdWVyeTogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIHZhciBxdWVyeSA9IHRoaXMuc2VydmljZS5xdWVyeSgpXG4gICAgICAuaW50ZXJzZWN0cyhib3VuZHMpXG4gICAgICAud2hlcmUodGhpcy5vcHRpb25zLndoZXJlKVxuICAgICAgLmZpZWxkcyh0aGlzLm9wdGlvbnMuZmllbGRzKVxuICAgICAgLnByZWNpc2lvbih0aGlzLm9wdGlvbnMucHJlY2lzaW9uKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2ltcGxpZnlGYWN0b3IpIHtcbiAgICAgIHF1ZXJ5LnNpbXBsaWZ5KHRoaXMuX21hcCwgdGhpcy5vcHRpb25zLnNpbXBsaWZ5RmFjdG9yKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWx0ZXJNb2RlID09PSAnc2VydmVyJyAmJiB0aGlzLm9wdGlvbnMuZnJvbSAmJiB0aGlzLm9wdGlvbnMudG8pIHtcbiAgICAgIHF1ZXJ5LmJldHdlZW4odGhpcy5vcHRpb25zLmZyb20sIHRoaXMub3B0aW9ucy50byk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9LFxuXG4gIC8qKlxuICAgKiBXaGVyZSBNZXRob2RzXG4gICAqL1xuXG4gIHNldFdoZXJlOiBmdW5jdGlvbiAod2hlcmUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5vcHRpb25zLndoZXJlID0gKHdoZXJlICYmIHdoZXJlLmxlbmd0aCkgPyB3aGVyZSA6ICcxPTEnO1xuXG4gICAgdmFyIG9sZFNuYXBzaG90ID0gW107XG4gICAgdmFyIG5ld1NuYXBzaG90ID0gW107XG4gICAgdmFyIHBlbmRpbmdSZXF1ZXN0cyA9IDA7XG4gICAgdmFyIHJlcXVlc3RFcnJvciA9IG51bGw7XG4gICAgdmFyIHJlcXVlc3RDYWxsYmFjayA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgZmVhdHVyZUNvbGxlY3Rpb24pIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXF1ZXN0RXJyb3IgPSBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZlYXR1cmVDb2xsZWN0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIG5ld1NuYXBzaG90LnB1c2goZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXNbaV0uaWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHBlbmRpbmdSZXF1ZXN0cy0tO1xuXG4gICAgICBpZiAocGVuZGluZ1JlcXVlc3RzIDw9IDApIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFNuYXBzaG90ID0gbmV3U25hcHNob3Q7XG4gICAgICAgIC8vIHNjaGVkdWxlIGFkZGluZyBmZWF0dXJlcyBmb3IgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXG4gICAgICAgIEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKEwuVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxheWVycyhvbGRTbmFwc2hvdCk7XG4gICAgICAgICAgdGhpcy5hZGRMYXllcnMobmV3U25hcHNob3QpO1xuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCByZXF1ZXN0RXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcykpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgZm9yICh2YXIgaSA9IHRoaXMuX2N1cnJlbnRTbmFwc2hvdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgb2xkU25hcHNob3QucHVzaCh0aGlzLl9jdXJyZW50U25hcHNob3RbaV0pO1xuICAgIH1cblxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9hY3RpdmVDZWxscykge1xuICAgICAgcGVuZGluZ1JlcXVlc3RzKys7XG4gICAgICB2YXIgY29vcmRzID0gdGhpcy5fa2V5VG9DZWxsQ29vcmRzKGtleSk7XG4gICAgICB2YXIgYm91bmRzID0gdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3Jkcyk7XG4gICAgICB0aGlzLl9yZXF1ZXN0RmVhdHVyZXMoYm91bmRzLCBrZXksIHJlcXVlc3RDYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0V2hlcmU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLndoZXJlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBUaW1lIFJhbmdlIE1ldGhvZHNcbiAgICovXG5cbiAgZ2V0VGltZVJhbmdlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFt0aGlzLm9wdGlvbnMuZnJvbSwgdGhpcy5vcHRpb25zLnRvXTtcbiAgfSxcblxuICBzZXRUaW1lUmFuZ2U6IGZ1bmN0aW9uIChmcm9tLCB0bywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgb2xkRnJvbSA9IHRoaXMub3B0aW9ucy5mcm9tO1xuICAgIHZhciBvbGRUbyA9IHRoaXMub3B0aW9ucy50bztcbiAgICB2YXIgcGVuZGluZ1JlcXVlc3RzID0gMDtcbiAgICB2YXIgcmVxdWVzdEVycm9yID0gbnVsbDtcbiAgICB2YXIgcmVxdWVzdENhbGxiYWNrID0gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVxdWVzdEVycm9yID0gZXJyb3I7XG4gICAgICB9XG4gICAgICB0aGlzLl9maWx0ZXJFeGlzdGluZ0ZlYXR1cmVzKG9sZEZyb20sIG9sZFRvLCBmcm9tLCB0byk7XG5cbiAgICAgIHBlbmRpbmdSZXF1ZXN0cy0tO1xuXG4gICAgICBpZiAoY2FsbGJhY2sgJiYgcGVuZGluZ1JlcXVlc3RzIDw9IDApIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCByZXF1ZXN0RXJyb3IpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgdGhpcy5vcHRpb25zLmZyb20gPSBmcm9tO1xuICAgIHRoaXMub3B0aW9ucy50byA9IHRvO1xuXG4gICAgdGhpcy5fZmlsdGVyRXhpc3RpbmdGZWF0dXJlcyhvbGRGcm9tLCBvbGRUbywgZnJvbSwgdG8pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50aW1lRmlsdGVyTW9kZSA9PT0gJ3NlcnZlcicpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9hY3RpdmVDZWxscykge1xuICAgICAgICBwZW5kaW5nUmVxdWVzdHMrKztcbiAgICAgICAgdmFyIGNvb3JkcyA9IHRoaXMuX2tleVRvQ2VsbENvb3JkcyhrZXkpO1xuICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3Jkcyk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RGZWF0dXJlcyhib3VuZHMsIGtleSwgcmVxdWVzdENhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2FjdGl2ZUNlbGxzKSB7XG4gICAgICB2YXIgY29vcmRzID0gdGhpcy5fa2V5VG9DZWxsQ29vcmRzKGtleSk7XG4gICAgICB2YXIgYm91bmRzID0gdGhpcy5fY2VsbENvb3Jkc1RvQm91bmRzKGNvb3Jkcyk7XG4gICAgICB0aGlzLl9yZXF1ZXN0RmVhdHVyZXMoYm91bmRzLCBrZXkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlZHJhdykge1xuICAgICAgdGhpcy5vbmNlKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgIHRoaXMuX3JlZHJhdyhsYXllci5mZWF0dXJlLmlkKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gIH0sXG5cbiAgX2ZpbHRlckV4aXN0aW5nRmVhdHVyZXM6IGZ1bmN0aW9uIChvbGRGcm9tLCBvbGRUbywgbmV3RnJvbSwgbmV3VG8pIHtcbiAgICB2YXIgbGF5ZXJzVG9SZW1vdmUgPSAob2xkRnJvbSAmJiBvbGRUbykgPyB0aGlzLl9nZXRGZWF0dXJlc0luVGltZVJhbmdlKG9sZEZyb20sIG9sZFRvKSA6IHRoaXMuX2N1cnJlbnRTbmFwc2hvdDtcbiAgICB2YXIgbGF5ZXJzVG9BZGQgPSB0aGlzLl9nZXRGZWF0dXJlc0luVGltZVJhbmdlKG5ld0Zyb20sIG5ld1RvKTtcblxuICAgIGlmIChsYXllcnNUb0FkZC5pbmRleE9mKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxheWVyc1RvQWRkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzaG91bGRSZW1vdmVMYXllciA9IGxheWVyc1RvUmVtb3ZlLmluZGV4T2YobGF5ZXJzVG9BZGRbaV0pO1xuICAgICAgICBpZiAoc2hvdWxkUmVtb3ZlTGF5ZXIgPj0gMCkge1xuICAgICAgICAgIGxheWVyc1RvUmVtb3ZlLnNwbGljZShzaG91bGRSZW1vdmVMYXllciwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzY2hlZHVsZSBhZGRpbmcgZmVhdHVyZXMgdW50aWwgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXG4gICAgTC5VdGlsLnJlcXVlc3RBbmltRnJhbWUoTC5VdGlsLmJpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZW1vdmVMYXllcnMobGF5ZXJzVG9SZW1vdmUpO1xuICAgICAgdGhpcy5hZGRMYXllcnMobGF5ZXJzVG9BZGQpO1xuICAgIH0sIHRoaXMpKTtcbiAgfSxcblxuICBfZ2V0RmVhdHVyZXNJblRpbWVSYW5nZTogZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgaWRzID0gW107XG4gICAgdmFyIHNlYXJjaDtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0ICYmIHRoaXMub3B0aW9ucy50aW1lRmllbGQuZW5kKSB7XG4gICAgICB2YXIgc3RhcnRUaW1lcyA9IHRoaXMuX3N0YXJ0VGltZUluZGV4LmJldHdlZW4oc3RhcnQsIGVuZCk7XG4gICAgICB2YXIgZW5kVGltZXMgPSB0aGlzLl9lbmRUaW1lSW5kZXguYmV0d2VlbihzdGFydCwgZW5kKTtcbiAgICAgIHNlYXJjaCA9IHN0YXJ0VGltZXMuY29uY2F0KGVuZFRpbWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VhcmNoID0gdGhpcy5fdGltZUluZGV4LmJldHdlZW4oc3RhcnQsIGVuZCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IHNlYXJjaC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgaWRzLnB1c2goc2VhcmNoW2ldLmlkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaWRzO1xuICB9LFxuXG4gIF9idWlsZFRpbWVJbmRleGVzOiBmdW5jdGlvbiAoZ2VvanNvbikge1xuICAgIHZhciBpO1xuICAgIHZhciBmZWF0dXJlO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudGltZUZpZWxkLnN0YXJ0ICYmIHRoaXMub3B0aW9ucy50aW1lRmllbGQuZW5kKSB7XG4gICAgICB2YXIgc3RhcnRUaW1lRW50cmllcyA9IFtdO1xuICAgICAgdmFyIGVuZFRpbWVFbnRyaWVzID0gW107XG4gICAgICBmb3IgKGkgPSBnZW9qc29uLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGZlYXR1cmUgPSBnZW9qc29uW2ldO1xuICAgICAgICBzdGFydFRpbWVFbnRyaWVzLnB1c2goe1xuICAgICAgICAgIGlkOiBmZWF0dXJlLmlkLFxuICAgICAgICAgIHZhbHVlOiBuZXcgRGF0ZShmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5zdGFydF0pXG4gICAgICAgIH0pO1xuICAgICAgICBlbmRUaW1lRW50cmllcy5wdXNoKHtcbiAgICAgICAgICBpZDogZmVhdHVyZS5pZCxcbiAgICAgICAgICB2YWx1ZTogbmV3IERhdGUoZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy50aW1lRmllbGQuZW5kXSlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9zdGFydFRpbWVJbmRleC5idWxrQWRkKHN0YXJ0VGltZUVudHJpZXMpO1xuICAgICAgdGhpcy5fZW5kVGltZUluZGV4LmJ1bGtBZGQoZW5kVGltZUVudHJpZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdGltZUVudHJpZXMgPSBbXTtcbiAgICAgIGZvciAoaSA9IGdlb2pzb24ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgZmVhdHVyZSA9IGdlb2pzb25baV07XG4gICAgICAgIHRpbWVFbnRyaWVzLnB1c2goe1xuICAgICAgICAgIGlkOiBmZWF0dXJlLmlkLFxuICAgICAgICAgIHZhbHVlOiBuZXcgRGF0ZShmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnRpbWVGaWVsZF0pXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl90aW1lSW5kZXguYnVsa0FkZCh0aW1lRW50cmllcyk7XG4gICAgfVxuICB9LFxuXG4gIF9mZWF0dXJlV2l0aGluVGltZVJhbmdlOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIGlmICghdGhpcy5vcHRpb25zLmZyb20gfHwgIXRoaXMub3B0aW9ucy50bykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGZyb20gPSArdGhpcy5vcHRpb25zLmZyb20udmFsdWVPZigpO1xuICAgIHZhciB0byA9ICt0aGlzLm9wdGlvbnMudG8udmFsdWVPZigpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMudGltZUZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIGRhdGUgPSArZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy50aW1lRmllbGRdO1xuICAgICAgcmV0dXJuIChkYXRlID49IGZyb20pICYmIChkYXRlIDw9IHRvKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVGaWVsZC5zdGFydCAmJiB0aGlzLm9wdGlvbnMudGltZUZpZWxkLmVuZCkge1xuICAgICAgdmFyIHN0YXJ0RGF0ZSA9ICtmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5zdGFydF07XG4gICAgICB2YXIgZW5kRGF0ZSA9ICtmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnRpbWVGaWVsZC5lbmRdO1xuICAgICAgcmV0dXJuICgoc3RhcnREYXRlID49IGZyb20pICYmIChzdGFydERhdGUgPD0gdG8pKSB8fCAoKGVuZERhdGUgPj0gZnJvbSkgJiYgKGVuZERhdGUgPD0gdG8pKTtcbiAgICB9XG4gIH0sXG5cbiAgX3Zpc2libGVab29tOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gY2hlY2sgdG8gc2VlIHdoZXRoZXIgdGhlIGN1cnJlbnQgem9vbSBsZXZlbCBvZiB0aGUgbWFwIGlzIHdpdGhpbiB0aGUgb3B0aW9uYWwgbGltaXQgZGVmaW5lZCBmb3IgdGhlIEZlYXR1cmVMYXllclxuICAgIGlmICghdGhpcy5fbWFwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB6b29tID0gdGhpcy5fbWFwLmdldFpvb20oKTtcbiAgICBpZiAoem9vbSA+IHRoaXMub3B0aW9ucy5tYXhab29tIHx8IHpvb20gPCB0aGlzLm9wdGlvbnMubWluWm9vbSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7IHJldHVybiB0cnVlOyB9XG4gIH0sXG5cbiAgX2hhbmRsZVpvb21DaGFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX3Zpc2libGVab29tKCkpIHtcbiAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKHRoaXMuX2N1cnJlbnRTbmFwc2hvdCk7XG4gICAgICB0aGlzLl9jdXJyZW50U25hcHNob3QgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLypcbiAgICAgIGZvciBldmVyeSBjZWxsIGluIHRoaXMuX2FjdGl2ZUNlbGxzXG4gICAgICAgIDEuIEdldCB0aGUgY2FjaGUga2V5IGZvciB0aGUgY29vcmRzIG9mIHRoZSBjZWxsXG4gICAgICAgIDIuIElmIHRoaXMuX2NhY2hlW2tleV0gZXhpc3RzIGl0IHdpbGwgYmUgYW4gYXJyYXkgb2YgZmVhdHVyZSBJRHMuXG4gICAgICAgIDMuIENhbGwgdGhpcy5hZGRMYXllcnModGhpcy5fY2FjaGVba2V5XSkgdG8gaW5zdHJ1Y3QgdGhlIGZlYXR1cmUgbGF5ZXIgdG8gYWRkIHRoZSBsYXllcnMgYmFjay5cbiAgICAgICovXG4gICAgICBmb3IgKHZhciBpIGluIHRoaXMuX2FjdGl2ZUNlbGxzKSB7XG4gICAgICAgIHZhciBjb29yZHMgPSB0aGlzLl9hY3RpdmVDZWxsc1tpXS5jb29yZHM7XG4gICAgICAgIHZhciBrZXkgPSB0aGlzLl9jYWNoZUtleShjb29yZHMpO1xuICAgICAgICBpZiAodGhpcy5fY2FjaGVba2V5XSkge1xuICAgICAgICAgIHRoaXMuYWRkTGF5ZXJzKHRoaXMuX2NhY2hlW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBTZXJ2aWNlIE1ldGhvZHNcbiAgICovXG5cbiAgYXV0aGVudGljYXRlOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0aGlzLnNlcnZpY2UuYXV0aGVudGljYXRlKHRva2VuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBtZXRhZGF0YTogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5zZXJ2aWNlLm1ldGFkYXRhKGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBxdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UucXVlcnkoKTtcbiAgfSxcblxuICBfZ2V0TWV0YWRhdGE6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIGlmICh0aGlzLl9tZXRhZGF0YSkge1xuICAgICAgdmFyIGVycm9yO1xuICAgICAgY2FsbGJhY2soZXJyb3IsIHRoaXMuX21ldGFkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZXRhZGF0YShMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhID0gcmVzcG9uc2U7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCB0aGlzLl9tZXRhZGF0YSk7XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfVxuICB9LFxuXG4gIGFkZEZlYXR1cmU6IGZ1bmN0aW9uIChmZWF0dXJlLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuX2dldE1ldGFkYXRhKEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgbWV0YWRhdGEpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBpZiAoY2FsbGJhY2spIHsgY2FsbGJhY2suY2FsbCh0aGlzLCBlcnJvciwgbnVsbCk7IH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNlcnZpY2UuYWRkRmVhdHVyZShmZWF0dXJlLCBMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAvLyBhc3NpZ24gSUQgZnJvbSByZXN1bHQgdG8gYXBwcm9wcmlhdGUgb2JqZWN0aWQgZmllbGQgZnJvbSBzZXJ2aWNlIG1ldGFkYXRhXG4gICAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzW21ldGFkYXRhLm9iamVjdElkRmllbGRdID0gcmVzcG9uc2Uub2JqZWN0SWQ7XG5cbiAgICAgICAgICAvLyB3ZSBhbHNvIG5lZWQgdG8gdXBkYXRlIHRoZSBnZW9qc29uIGlkIGZvciBjcmVhdGVMYXllcnMoKSB0byBmdW5jdGlvblxuICAgICAgICAgIGZlYXR1cmUuaWQgPSByZXNwb25zZS5vYmplY3RJZDtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUxheWVycyhbZmVhdHVyZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzKSk7XG4gICAgfSwgdGhpcykpO1xuICB9LFxuXG4gIHVwZGF0ZUZlYXR1cmU6IGZ1bmN0aW9uIChmZWF0dXJlLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuc2VydmljZS51cGRhdGVGZWF0dXJlKGZlYXR1cmUsIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMYXllcnMoW2ZlYXR1cmUuaWRdLCB0cnVlKTtcbiAgICAgICAgdGhpcy5jcmVhdGVMYXllcnMoW2ZlYXR1cmVdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBkZWxldGVGZWF0dXJlOiBmdW5jdGlvbiAoaWQsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5zZXJ2aWNlLmRlbGV0ZUZlYXR1cmUoaWQsIGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGlmICghZXJyb3IgJiYgcmVzcG9uc2Uub2JqZWN0SWQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMYXllcnMoW3Jlc3BvbnNlLm9iamVjdElkXSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIGRlbGV0ZUZlYXR1cmVzOiBmdW5jdGlvbiAoaWRzLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZGVsZXRlRmVhdHVyZXMoaWRzLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKFtyZXNwb25zZVtpXS5vYmplY3RJZF0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9XG59KTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgRmVhdHVyZU1hbmFnZXIgfSBmcm9tICcuL0ZlYXR1cmVNYW5hZ2VyJztcblxuZXhwb3J0IHZhciBGZWF0dXJlTGF5ZXIgPSBGZWF0dXJlTWFuYWdlci5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICBjYWNoZUxheWVyczogdHJ1ZVxuICB9LFxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKi9cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBGZWF0dXJlTWFuYWdlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX29yaWdpbmFsU3R5bGUgPSB0aGlzLm9wdGlvbnMuc3R5bGU7XG4gICAgdGhpcy5fbGF5ZXJzID0ge307XG4gIH0sXG5cbiAgLyoqXG4gICAqIExheWVyIEludGVyZmFjZVxuICAgKi9cblxuICBvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5fbGF5ZXJzKSB7XG4gICAgICBtYXAucmVtb3ZlTGF5ZXIodGhpcy5fbGF5ZXJzW2ldKTtcbiAgICAgIC8vIHRyaWdnZXIgdGhlIGV2ZW50IHdoZW4gdGhlIGVudGlyZSBmZWF0dXJlTGF5ZXIgaXMgcmVtb3ZlZCBmcm9tIHRoZSBtYXBcbiAgICAgIHRoaXMuZmlyZSgncmVtb3ZlZmVhdHVyZScsIHtcbiAgICAgICAgZmVhdHVyZTogdGhpcy5fbGF5ZXJzW2ldLmZlYXR1cmUsXG4gICAgICAgIHBlcm1hbmVudDogZmFsc2VcbiAgICAgIH0sIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiBGZWF0dXJlTWFuYWdlci5wcm90b3R5cGUub25SZW1vdmUuY2FsbCh0aGlzLCBtYXApO1xuICB9LFxuXG4gIGNyZWF0ZU5ld0xheWVyOiBmdW5jdGlvbiAoZ2VvanNvbikge1xuICAgIHZhciBsYXllciA9IEwuR2VvSlNPTi5nZW9tZXRyeVRvTGF5ZXIoZ2VvanNvbiwgdGhpcy5vcHRpb25zKTtcbiAgICBsYXllci5kZWZhdWx0T3B0aW9ucyA9IGxheWVyLm9wdGlvbnM7XG4gICAgcmV0dXJuIGxheWVyO1xuICB9LFxuXG4gIF91cGRhdGVMYXllcjogZnVuY3Rpb24gKGxheWVyLCBnZW9qc29uKSB7XG4gICAgLy8gY29udmVydCB0aGUgZ2VvanNvbiBjb29yZGluYXRlcyBpbnRvIGEgTGVhZmxldCBMYXRMbmcgYXJyYXkvbmVzdGVkIGFycmF5c1xuICAgIC8vIHBhc3MgaXQgdG8gc2V0TGF0TG5ncyB0byB1cGRhdGUgbGF5ZXIgZ2VvbWV0cmllc1xuICAgIHZhciBsYXRsbmdzID0gW107XG4gICAgdmFyIGNvb3Jkc1RvTGF0TG5nID0gdGhpcy5vcHRpb25zLmNvb3Jkc1RvTGF0TG5nIHx8IEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZztcblxuICAgIC8vIGNvcHkgbmV3IGF0dHJpYnV0ZXMsIGlmIHByZXNlbnRcbiAgICBpZiAoZ2VvanNvbi5wcm9wZXJ0aWVzKSB7XG4gICAgICBsYXllci5mZWF0dXJlLnByb3BlcnRpZXMgPSBnZW9qc29uLnByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgc3dpdGNoIChnZW9qc29uLmdlb21ldHJ5LnR5cGUpIHtcbiAgICAgIGNhc2UgJ1BvaW50JzpcbiAgICAgICAgbGF0bG5ncyA9IEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzKTtcbiAgICAgICAgbGF5ZXIuc2V0TGF0TG5nKGxhdGxuZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0xpbmVTdHJpbmcnOlxuICAgICAgICBsYXRsbmdzID0gTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCAwLCBjb29yZHNUb0xhdExuZyk7XG4gICAgICAgIGxheWVyLnNldExhdExuZ3MobGF0bG5ncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcbiAgICAgICAgbGF0bG5ncyA9IEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcywgMSwgY29vcmRzVG9MYXRMbmcpO1xuICAgICAgICBsYXllci5zZXRMYXRMbmdzKGxhdGxuZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1BvbHlnb24nOlxuICAgICAgICBsYXRsbmdzID0gTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhnZW9qc29uLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCAxLCBjb29yZHNUb0xhdExuZyk7XG4gICAgICAgIGxheWVyLnNldExhdExuZ3MobGF0bG5ncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTXVsdGlQb2x5Z29uJzpcbiAgICAgICAgbGF0bG5ncyA9IEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlcywgMiwgY29vcmRzVG9MYXRMbmcpO1xuICAgICAgICBsYXllci5zZXRMYXRMbmdzKGxhdGxuZ3MpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZlYXR1cmUgTWFuYWdlbWVudCBNZXRob2RzXG4gICAqL1xuXG4gIGNyZWF0ZUxheWVyczogZnVuY3Rpb24gKGZlYXR1cmVzKSB7XG4gICAgZm9yICh2YXIgaSA9IGZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZ2VvanNvbiA9IGZlYXR1cmVzW2ldO1xuXG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbZ2VvanNvbi5pZF07XG4gICAgICB2YXIgbmV3TGF5ZXI7XG5cbiAgICAgIGlmICh0aGlzLl92aXNpYmxlWm9vbSgpICYmIGxheWVyICYmICF0aGlzLl9tYXAuaGFzTGF5ZXIobGF5ZXIpKSB7XG4gICAgICAgIHRoaXMuX21hcC5hZGRMYXllcihsYXllcik7XG4gICAgICAgIHRoaXMuZmlyZSgnYWRkZmVhdHVyZScsIHtcbiAgICAgICAgICBmZWF0dXJlOiBsYXllci5mZWF0dXJlXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgZ2VvbWV0cnkgaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAobGF5ZXIgJiYgdGhpcy5vcHRpb25zLnNpbXBsaWZ5RmFjdG9yID4gMCAmJiAobGF5ZXIuc2V0TGF0TG5ncyB8fCBsYXllci5zZXRMYXRMbmcpKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxheWVyKGxheWVyLCBnZW9qc29uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFsYXllcikge1xuICAgICAgICBuZXdMYXllciA9IHRoaXMuY3JlYXRlTmV3TGF5ZXIoZ2VvanNvbik7XG4gICAgICAgIG5ld0xheWVyLmZlYXR1cmUgPSBnZW9qc29uO1xuXG4gICAgICAgIC8vIGJ1YmJsZSBldmVudHMgZnJvbSBpbmRpdmlkdWFsIGxheWVycyB0byB0aGUgZmVhdHVyZSBsYXllclxuICAgICAgICBuZXdMYXllci5hZGRFdmVudFBhcmVudCh0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm9uRWFjaEZlYXR1cmUpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMub25FYWNoRmVhdHVyZShuZXdMYXllci5mZWF0dXJlLCBuZXdMYXllcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWNoZSB0aGUgbGF5ZXJcbiAgICAgICAgdGhpcy5fbGF5ZXJzW25ld0xheWVyLmZlYXR1cmUuaWRdID0gbmV3TGF5ZXI7XG5cbiAgICAgICAgLy8gc3R5bGUgdGhlIGxheWVyXG4gICAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKG5ld0xheWVyLmZlYXR1cmUuaWQsIHRoaXMub3B0aW9ucy5zdHlsZSk7XG5cbiAgICAgICAgdGhpcy5maXJlKCdjcmVhdGVmZWF0dXJlJywge1xuICAgICAgICAgIGZlYXR1cmU6IG5ld0xheWVyLmZlYXR1cmVcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBsYXllciBpZiB0aGUgY3VycmVudCB6b29tIGxldmVsIGlzIGluc2lkZSB0aGUgcmFuZ2UgZGVmaW5lZCBmb3IgdGhlIGxheWVyLCBpdCBpcyB3aXRoaW4gdGhlIGN1cnJlbnQgdGltZSBib3VuZHMgb3Igb3VyIGxheWVyIGlzIG5vdCB0aW1lIGVuYWJsZWRcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGVab29tKCkgJiYgKCF0aGlzLm9wdGlvbnMudGltZUZpZWxkIHx8ICh0aGlzLm9wdGlvbnMudGltZUZpZWxkICYmIHRoaXMuX2ZlYXR1cmVXaXRoaW5UaW1lUmFuZ2UoZ2VvanNvbikpKSkge1xuICAgICAgICAgIHRoaXMuZmlyZSgnYWRkZmVhdHVyZScsIHtcbiAgICAgICAgICAgIGZlYXR1cmU6IG5ld0xheWVyLmZlYXR1cmVcbiAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICB0aGlzLl9tYXAuYWRkTGF5ZXIobmV3TGF5ZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGFkZExheWVyczogZnVuY3Rpb24gKGlkcykge1xuICAgIGZvciAodmFyIGkgPSBpZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZHNbaV1dO1xuICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgIHRoaXMuZmlyZSgnYWRkZmVhdHVyZScsIHtcbiAgICAgICAgICBmZWF0dXJlOiBsYXllci5mZWF0dXJlXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgICB0aGlzLl9tYXAuYWRkTGF5ZXIobGF5ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZW1vdmVMYXllcnM6IGZ1bmN0aW9uIChpZHMsIHBlcm1hbmVudCkge1xuICAgIGZvciAodmFyIGkgPSBpZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBpZCA9IGlkc1tpXTtcbiAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgdGhpcy5maXJlKCdyZW1vdmVmZWF0dXJlJywge1xuICAgICAgICAgIGZlYXR1cmU6IGxheWVyLmZlYXR1cmUsXG4gICAgICAgICAgcGVybWFuZW50OiBwZXJtYW5lbnRcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcihsYXllcik7XG4gICAgICB9XG4gICAgICBpZiAobGF5ZXIgJiYgcGVybWFuZW50KSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBjZWxsRW50ZXI6IGZ1bmN0aW9uIChib3VuZHMsIGNvb3Jkcykge1xuICAgIGlmICghdGhpcy5fem9vbWluZyAmJiB0aGlzLl9tYXApIHtcbiAgICAgIEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKEwuVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhY2hlS2V5ID0gdGhpcy5fY2FjaGVLZXkoY29vcmRzKTtcbiAgICAgICAgdmFyIGNlbGxLZXkgPSB0aGlzLl9jZWxsQ29vcmRzVG9LZXkoY29vcmRzKTtcbiAgICAgICAgdmFyIGxheWVycyA9IHRoaXMuX2NhY2hlW2NhY2hlS2V5XTtcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZUNlbGxzW2NlbGxLZXldICYmIGxheWVycykge1xuICAgICAgICAgIHRoaXMuYWRkTGF5ZXJzKGxheWVycyk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKTtcbiAgICB9XG4gIH0sXG5cbiAgY2VsbExlYXZlOiBmdW5jdGlvbiAoYm91bmRzLCBjb29yZHMpIHtcbiAgICBpZiAoIXRoaXMuX3pvb21pbmcpIHtcbiAgICAgIEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKEwuVXRpbC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX21hcCkge1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IHRoaXMuX2NhY2hlS2V5KGNvb3Jkcyk7XG4gICAgICAgICAgdmFyIGNlbGxLZXkgPSB0aGlzLl9jZWxsQ29vcmRzVG9LZXkoY29vcmRzKTtcbiAgICAgICAgICB2YXIgbGF5ZXJzID0gdGhpcy5fY2FjaGVbY2FjaGVLZXldO1xuICAgICAgICAgIHZhciBtYXBCb3VuZHMgPSB0aGlzLl9tYXAuZ2V0Qm91bmRzKCk7XG4gICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmVDZWxsc1tjZWxsS2V5XSAmJiBsYXllcnMpIHtcbiAgICAgICAgICAgIHZhciByZW1vdmFibGUgPSB0cnVlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbbGF5ZXJzW2ldXTtcbiAgICAgICAgICAgICAgaWYgKGxheWVyICYmIGxheWVyLmdldEJvdW5kcyAmJiBtYXBCb3VuZHMuaW50ZXJzZWN0cyhsYXllci5nZXRCb3VuZHMoKSkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVtb3ZhYmxlKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKGxheWVycywgIXRoaXMub3B0aW9ucy5jYWNoZUxheWVycyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLmNhY2hlTGF5ZXJzICYmIHJlbW92YWJsZSkge1xuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fY2FjaGVbY2FjaGVLZXldO1xuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fY2VsbHNbY2VsbEtleV07XG4gICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9hY3RpdmVDZWxsc1tjZWxsS2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFN0eWxpbmcgTWV0aG9kc1xuICAgKi9cblxuICByZXNldFN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vcHRpb25zLnN0eWxlID0gdGhpcy5fb3JpZ2luYWxTdHlsZTtcbiAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgdGhpcy5yZXNldEZlYXR1cmVTdHlsZShsYXllci5mZWF0dXJlLmlkKTtcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBzZXRTdHlsZTogZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgdGhpcy5vcHRpb25zLnN0eWxlID0gc3R5bGU7XG4gICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKGxheWVyLmZlYXR1cmUuaWQsIHN0eWxlKTtcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZXNldEZlYXR1cmVTdHlsZTogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICB2YXIgc3R5bGUgPSB0aGlzLl9vcmlnaW5hbFN0eWxlIHx8IEwuUGF0aC5wcm90b3R5cGUub3B0aW9ucztcbiAgICBpZiAobGF5ZXIpIHtcbiAgICAgIEwuVXRpbC5leHRlbmQobGF5ZXIub3B0aW9ucywgbGF5ZXIuZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgdGhpcy5zZXRGZWF0dXJlU3R5bGUoaWQsIHN0eWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2V0RmVhdHVyZVN0eWxlOiBmdW5jdGlvbiAoaWQsIHN0eWxlKSB7XG4gICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICBpZiAodHlwZW9mIHN0eWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzdHlsZSA9IHN0eWxlKGxheWVyLmZlYXR1cmUpO1xuICAgIH1cbiAgICBpZiAobGF5ZXIuc2V0U3R5bGUpIHtcbiAgICAgIGxheWVyLnNldFN0eWxlKHN0eWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgTWV0aG9kc1xuICAgKi9cblxuICBlYWNoRmVhdHVyZTogZnVuY3Rpb24gKGZuLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgIGZuLmNhbGwoY29udGV4dCwgdGhpcy5fbGF5ZXJzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgZ2V0RmVhdHVyZTogZnVuY3Rpb24gKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xheWVyc1tpZF07XG4gIH0sXG5cbiAgYnJpbmdUb0JhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgaWYgKGxheWVyLmJyaW5nVG9CYWNrKSB7XG4gICAgICAgIGxheWVyLmJyaW5nVG9CYWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgYnJpbmdUb0Zyb250OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgIGlmIChsYXllci5icmluZ1RvRnJvbnQpIHtcbiAgICAgICAgbGF5ZXIuYnJpbmdUb0Zyb250KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVkcmF3OiBmdW5jdGlvbiAoaWQpIHtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuX3JlZHJhdyhpZCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIF9yZWRyYXc6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgdmFyIGdlb2pzb24gPSBsYXllci5mZWF0dXJlO1xuXG4gICAgLy8gaWYgdGhpcyBsb29rcyBsaWtlIGEgbWFya2VyXG4gICAgaWYgKGxheWVyICYmIGxheWVyLnNldEljb24gJiYgdGhpcy5vcHRpb25zLnBvaW50VG9MYXllcikge1xuICAgICAgLy8gdXBkYXRlIGN1c3RvbSBzeW1ib2xvZ3ksIGlmIG5lY2Vzc2FyeVxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wb2ludFRvTGF5ZXIpIHtcbiAgICAgICAgdmFyIGdldEljb24gPSB0aGlzLm9wdGlvbnMucG9pbnRUb0xheWVyKGdlb2pzb24sIEwubGF0TG5nKGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMV0sIGdlb2pzb24uZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF0pKTtcbiAgICAgICAgdmFyIHVwZGF0ZWRJY29uID0gZ2V0SWNvbi5vcHRpb25zLmljb247XG4gICAgICAgIGxheWVyLnNldEljb24odXBkYXRlZEljb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGxvb2tzIGxpa2UgYSB2ZWN0b3IgbWFya2VyIChjaXJjbGVNYXJrZXIpXG4gICAgaWYgKGxheWVyICYmIGxheWVyLnNldFN0eWxlICYmIHRoaXMub3B0aW9ucy5wb2ludFRvTGF5ZXIpIHtcbiAgICAgIHZhciBnZXRTdHlsZSA9IHRoaXMub3B0aW9ucy5wb2ludFRvTGF5ZXIoZ2VvanNvbiwgTC5sYXRMbmcoZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSwgZ2VvanNvbi5nZW9tZXRyeS5jb29yZGluYXRlc1swXSkpO1xuICAgICAgdmFyIHVwZGF0ZWRTdHlsZSA9IGdldFN0eWxlLm9wdGlvbnM7XG4gICAgICB0aGlzLnNldEZlYXR1cmVTdHlsZShnZW9qc29uLmlkLCB1cGRhdGVkU3R5bGUpO1xuICAgIH1cblxuICAgIC8vIGxvb2tzIGxpa2UgYSBwYXRoIChwb2x5Z29uL3BvbHlsaW5lKVxuICAgIGlmIChsYXllciAmJiBsYXllci5zZXRTdHlsZSAmJiB0aGlzLm9wdGlvbnMuc3R5bGUpIHtcbiAgICAgIHRoaXMucmVzZXRTdHlsZShnZW9qc29uLmlkKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZUxheWVyIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRmVhdHVyZUxheWVyKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmZWF0dXJlTGF5ZXI7XG4iXSwibmFtZXMiOlsic2hhbGxvd0Nsb25lIiwiYXJjZ2lzVG9HZW9KU09OIiwiZ2VvanNvblRvQXJjR0lTIiwiZzJhIiwiYTJnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0NDQU8sSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksaUJBQWlCLElBQUksSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hHLENBQU8sSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsYUFBYSxLQUFLLEVBQUUsQ0FBQzs7QUFFL0UsQ0FBTyxJQUFJLE9BQU8sR0FBRztBQUNyQixDQUFBLEVBQUUsSUFBSSxFQUFFLElBQUk7QUFDWixDQUFBLEVBQUUsYUFBYSxFQUFFLGFBQWE7QUFDOUIsQ0FBQSxDQUFDLENBQUM7O0NDRkYsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDOztBQUVsQixDQUFBLFNBQVMsU0FB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QyxFQUFFLENBQUMsRUFBRTtBQUNyQyxDQUFBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pDLENBQUEsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDM0MsQ0FBQSxNQUFNLElBQUksc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNsRSxDQUFBLFFBQVEsT0FBTyxJQUFJLENBQUM7QUFDcEIsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxLQUFLO0FBQ0wsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUEsQ0FBQzs7QUFFRCxDQUFBO0FBQ0EsQ0FBQSxTQUFTLHVCQUF1QixFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7QUFDdEQsQ0FBQSxFQUFFLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztBQUN2QixDQUFBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN0RSxDQUFBLElBQUksSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFD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QUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM1QyxDQUFBLElBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFeEMsQ0FBQSxJQUFJLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7QUFDcEQsQ0FBQSxNQUFNLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdELENBQUEsTUFBTSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzVDLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO0FBQ3BFLENBQUEsTUFBTSxJQUFJLFNBQVMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEUsQ0FBQSxNQUFNLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwRSxDQUFBLE1BQU0sT0FBTyxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xHLENBQUEsS0FBSztBQUNMLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsWUFBWSxFQUFF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