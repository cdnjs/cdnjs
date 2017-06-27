/*! esri-leaflet - v1.0.2 - 2015-12-31
*   Copyright (c) 2015 Environmental Systems Research Institute, Inc.
*   Apache License*/
(function (factory) {
  //define an AMD module that relies on 'leaflet'
  if (typeof define === 'function' && define.amd) {
    define(['leaflet'], function (L) {
      return factory(L);
    });
  //define a common js module that relies on 'leaflet'
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('leaflet'));
  }

  if(typeof window !== 'undefined' && window.L){
    factory(window.L);
  }
}(function (L) {
var EsriLeaflet = { //jshint ignore:line
  VERSION: '1.0.2',
  Layers: {},
  Services: {},
  Controls: {},
  Tasks: {},
  Util: {},
  Support: {
    CORS: !!(window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()),
    pointerEvents: document.documentElement.style.pointerEvents === ''
  }
};

if(typeof window !== 'undefined' && window.L){
  window.L.esri = EsriLeaflet;
}


(function(EsriLeaflet){

  // normalize request animation frame
  var raf = window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     window.msRequestAnimationFrame ||
     function(cb) { return window.setTimeout(cb, 1000 / 60); };

  // shallow object clone for feature properties and attributes
  // from http://jsperf.com/cloning-an-object/2
  function clone(obj) {
    var target = {};
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        target[i] = obj[i];
      }
    }
    return target;
  }

  // checks if 2 x,y points are equal
  function pointsEqual(a, b) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  // checks if the first and last points of a ring are equal and closes the ring
  function closeRing(coordinates) {
    if (!pointsEqual(coordinates[0], coordinates[coordinates.length - 1])) {
      coordinates.push(coordinates[0]);
    }
    return coordinates;
  }

  // determine if polygon ring coordinates are clockwise. clockwise signifies outer ring, counter-clockwise an inner ring
  // or hole. this logic was found at http://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-
  // points-are-in-clockwise-order
  function ringIsClockwise(ringToTest) {
    var total = 0,i = 0;
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
  function vertexIntersectsVertex(a1, a2, b1, b2) {
    var uaT = (b2[0] - b1[0]) * (a1[1] - b1[1]) - (b2[1] - b1[1]) * (a1[0] - b1[0]);
    var ubT = (a2[0] - a1[0]) * (a1[1] - b1[1]) - (a2[1] - a1[1]) * (a1[0] - b1[0]);
    var uB  = (b2[1] - b1[1]) * (a2[0] - a1[0]) - (b2[0] - b1[0]) * (a2[1] - a1[1]);

    if ( uB !== 0 ) {
      var ua = uaT / uB;
      var ub = ubT / uB;

      if ( 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1 ) {
        return true;
      }
    }

    return false;
  }

  // ported from terraformer.js https://github.com/Esri/Terraformer/blob/master/terraformer.js#L521-L531
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

  // ported from terraformer.js https://github.com/Esri/Terraformer/blob/master/terraformer.js#L470-L480
  function coordinatesContainPoint(coordinates, point) {
    var contains = false;
    for(var i = -1, l = coordinates.length, j = l - 1; ++i < l; j = i) {
      if (((coordinates[i][1] <= point[1] && point[1] < coordinates[j][1]) ||
           (coordinates[j][1] <= point[1] && point[1] < coordinates[i][1])) &&
          (point[0] < (coordinates[j][0] - coordinates[i][0]) * (point[1] - coordinates[i][1]) / (coordinates[j][1] - coordinates[i][1]) + coordinates[i][0])) {
        contains = !contains;
      }
    }
    return contains;
  }

  // ported from terraformer-arcgis-parser.js https://github.com/Esri/terraformer-arcgis-parser/blob/master/terraformer-arcgis-parser.js#L106-L113
  function coordinatesContainCoordinates(outer, inner){
    var intersects = arrayIntersectsArray(outer, inner);
    var contains = coordinatesContainPoint(outer, inner[0]);
    if(!intersects && contains){
      return true;
    }
    return false;
  }

  // do any polygons in this array contain any other polygons in this array?
  // used for checking for holes in arcgis rings
  // ported from terraformer-arcgis-parser.js https://github.com/Esri/terraformer-arcgis-parser/blob/master/terraformer-arcgis-parser.js#L117-L172
  function convertRingsToGeoJSON(rings){
    var outerRings = [];
    var holes = [];
    var x; // iterator
    var outerRing; // current outer ring being evaluated
    var hole; // current hole being evaluated

    // for each ring
    for (var r = 0; r < rings.length; r++) {
      var ring = closeRing(rings[r].slice(0));
      if(ring.length < 4){
        continue;
      }
      // is this ring an outer ring? is it clockwise?
      if(ringIsClockwise(ring)){
        var polygon = [ ring ];
        outerRings.push(polygon); // push to outer rings
      } else {
        holes.push(ring); // counterclockwise push to holes
      }
    }

    var uncontainedHoles = [];

    // while there are holes left...
    while(holes.length){
      // pop a hole off out stack
      hole = holes.pop();

      // loop over all outer rings and see if they contain our hole.
      var contained = false;
      for (x = outerRings.length - 1; x >= 0; x--) {
        outerRing = outerRings[x][0];
        if(coordinatesContainCoordinates(outerRing, hole)){
          // the hole is contained push it into our polygon
          outerRings[x].push(hole);
          contained = true;
          break;
        }
      }

      // ring is not contained in any outer ring
      // sometimes this happens https://github.com/Esri/esri-leaflet/issues/320
      if(!contained){
        uncontainedHoles.push(hole);
      }
    }

    // if we couldn't match any holes using contains we can try intersects...
    while(uncontainedHoles.length){
      // pop a hole off out stack
      hole = uncontainedHoles.pop();

      // loop over all outer rings and see if any intersect our hole.
      var intersects = false;
      for (x = outerRings.length - 1; x >= 0; x--) {
        outerRing = outerRings[x][0];
        if(arrayIntersectsArray(outerRing, hole)){
          // the hole is contained push it into our polygon
          outerRings[x].push(hole);
          intersects = true;
          break;
        }
      }

      if(!intersects) {
        outerRings.push([hole.reverse()]);
      }
    }

    if(outerRings.length === 1){
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
  function orientRings(poly){
    var output = [];
    var polygon = poly.slice(0);
    var outerRing = closeRing(polygon.shift().slice(0));
    if(outerRing.length >= 4){
      if(!ringIsClockwise(outerRing)){
        outerRing.reverse();
      }

      output.push(outerRing);

      for (var i = 0; i < polygon.length; i++) {
        var hole = closeRing(polygon[i].slice(0));
        if(hole.length >= 4){
          if(ringIsClockwise(hole)){
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
  function flattenMultiPolygonRings(rings){
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

  // convert an extent (ArcGIS) to LatLngBounds (Leaflet)
  EsriLeaflet.Util.extentToBounds = function(extent){
    var sw = new L.LatLng(extent.ymin, extent.xmin);
    var ne = new L.LatLng(extent.ymax, extent.xmax);
    return new L.LatLngBounds(sw, ne);
  };

  // convert an LatLngBounds (Leaflet) to extent (ArcGIS)
  EsriLeaflet.Util.boundsToExtent = function(bounds) {
    bounds = L.latLngBounds(bounds);
    return {
      'xmin': bounds.getSouthWest().lng,
      'ymin': bounds.getSouthWest().lat,
      'xmax': bounds.getNorthEast().lng,
      'ymax': bounds.getNorthEast().lat,
      'spatialReference': {
        'wkid' : 4326
      }
    };
  };

  EsriLeaflet.Util.arcgisToGeojson = function (arcgis, idAttribute){
    var geojson = {};

    if(typeof arcgis.x === 'number' && typeof arcgis.y === 'number'){
      geojson.type = 'Point';
      geojson.coordinates = [arcgis.x, arcgis.y];
    }

    if(arcgis.points){
      geojson.type = 'MultiPoint';
      geojson.coordinates = arcgis.points.slice(0);
    }

    if(arcgis.paths) {
      if(arcgis.paths.length === 1){
        geojson.type = 'LineString';
        geojson.coordinates = arcgis.paths[0].slice(0);
      } else {
        geojson.type = 'MultiLineString';
        geojson.coordinates = arcgis.paths.slice(0);
      }
    }

    if(arcgis.rings) {
      geojson = convertRingsToGeoJSON(arcgis.rings.slice(0));
    }

    if(arcgis.geometry || arcgis.attributes) {
      geojson.type = 'Feature';
      geojson.geometry = (arcgis.geometry) ? EsriLeaflet.Util.arcgisToGeojson(arcgis.geometry) : null;
      geojson.properties = (arcgis.attributes) ? clone(arcgis.attributes) : null;
      if(arcgis.attributes) {
        geojson.id =  arcgis.attributes[idAttribute] || arcgis.attributes.OBJECTID || arcgis.attributes.FID;
      }
    }

    return geojson;
  };

  // GeoJSON -> ArcGIS
  EsriLeaflet.Util.geojsonToArcGIS = function(geojson, idAttribute){
    idAttribute = idAttribute || 'OBJECTID';
    var spatialReference = { wkid: 4326 };
    var result = {};
    var i;

    switch(geojson.type){
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
      if(geojson.geometry) {
        result.geometry = EsriLeaflet.Util.geojsonToArcGIS(geojson.geometry, idAttribute);
      }
      result.attributes = (geojson.properties) ? clone(geojson.properties) : {};
      if(geojson.id){
        result.attributes[idAttribute] = geojson.id;
      }
      break;
    case 'FeatureCollection':
      result = [];
      for (i = 0; i < geojson.features.length; i++){
        result.push(EsriLeaflet.Util.geojsonToArcGIS(geojson.features[i], idAttribute));
      }
      break;
    case 'GeometryCollection':
      result = [];
      for (i = 0; i < geojson.geometries.length; i++){
        result.push(EsriLeaflet.Util.geojsonToArcGIS(geojson.geometries[i], idAttribute));
      }
      break;
    }

    return result;
  };

  EsriLeaflet.Util.responseToFeatureCollection = function(response, idAttribute){
    var objectIdField;

    if(idAttribute){
      objectIdField = idAttribute;
    } else if(response.objectIdFieldName){
      objectIdField = response.objectIdFieldName;
    } else if(response.fields) {
      for (var j = 0; j <= response.fields.length - 1; j++) {
        if(response.fields[j].type === 'esriFieldTypeOID') {
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
    if(features.length){
      for (var i = features.length - 1; i >= 0; i--) {
        featureCollection.features.push(EsriLeaflet.Util.arcgisToGeojson(features[i], objectIdField));
      }
    }

    return featureCollection;
  };

    // trim url whitespace and add a trailing slash if needed
  EsriLeaflet.Util.cleanUrl = function(url){
    //trim leading and trailing spaces, but not spaces inside the url
    url = url.replace(/^\s+|\s+$|\A\s+|\s+\z/g, '');

    //add a trailing slash to the url if the user omitted it
    if(url[url.length-1] !== '/'){
      url += '/';
    }

    return url;
  };

  EsriLeaflet.Util.isArcgisOnline = function(url){
    /* hosted feature services can emit geojson natively.
    our check for 'geojson' support will need to be revisted
    once the functionality makes its way to ArcGIS Server*/
    return (/\.arcgis\.com.*?FeatureServer/g).test(url);
  };

  EsriLeaflet.Util.geojsonTypeToArcGIS = function (geoJsonType) {
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
  };

  EsriLeaflet.Util.requestAnimationFrame = L.Util.bind(raf, window);

  EsriLeaflet.Util.warn = function (message) {
    if(console && console.warn) {
      console.warn(message);
    }
  };

})(EsriLeaflet);

(function(EsriLeaflet){

  var callbacks = 0;

  window._EsriLeafletCallbacks = {};

  function serialize(params){
    var data = '';

    params.f = params.f || 'json';

    for (var key in params){
      if(params.hasOwnProperty(key)){
        var param = params[key];
        var type = Object.prototype.toString.call(param);
        var value;

        if(data.length){
          data += '&';
        }

        if (type === '[object Array]'){
          value = (Object.prototype.toString.call(param[0]) === '[object Object]') ? JSON.stringify(param) : param.join(',');
        } else if (type === '[object Object]') {
          value = JSON.stringify(param);
        } else if (type === '[object Date]'){
          value = param.valueOf();
        } else {
          value = param;
        }

        data += encodeURIComponent(key) + '=' + encodeURIComponent(value);
      }
    }

    return data;
  }

  function createRequest(callback, context){
    var httpRequest = new XMLHttpRequest();

    httpRequest.onerror = function(e) {
      httpRequest.onreadystatechange = L.Util.falseFn;

      callback.call(context, {
        error: {
          code: 500,
          message: 'XMLHttpRequest error'
        }
      }, null);
    };

    httpRequest.onreadystatechange = function(){
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

  // AJAX handlers for CORS (modern browsers) or JSONP (older browsers)
  EsriLeaflet.Request = {
    request: function(url, params, callback, context){
      var paramString = serialize(params);
      var httpRequest = createRequest(callback, context);
      var requestLength = (url + '?' + paramString).length;

      // request is less then 2000 characters and the browser supports CORS, make GET request with XMLHttpRequest
      if(requestLength <= 2000 && L.esri.Support.CORS){
        httpRequest.open('GET', url + '?' + paramString);
        httpRequest.send(null);

      // request is less more then 2000 characters and the browser supports CORS, make POST request with XMLHttpRequest
      } else if (requestLength > 2000 && L.esri.Support.CORS){
        httpRequest.open('POST', url);
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.send(paramString);

      // request is less more then 2000 characters and the browser does not support CORS, make a JSONP request
      } else if(requestLength <= 2000 && !L.esri.Support.CORS){
        return L.esri.Request.get.JSONP(url, params, callback, context);

      // request is longer then 2000 characters and the browser does not support CORS, log a warning
      } else {
        EsriLeaflet.Util.warn('a request to ' + url + ' was longer then 2000 characters and this browser cannot make a cross-domain post request. Please use a proxy http://esri.github.io/esri-leaflet/api-reference/request.html');
        return;
      }

      return httpRequest;
    },

    post: {
      XMLHTTP: function (url, params, callback, context) {
        var httpRequest = createRequest(callback, context);
        httpRequest.open('POST', url);
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.send(serialize(params));

        return httpRequest;
      }
    },

    get: {
      CORS: function (url, params, callback, context) {
        var httpRequest = createRequest(callback, context);

        httpRequest.open('GET', url + '?' + serialize(params), true);
        httpRequest.send(null);

        return httpRequest;
      },
      JSONP: function(url, params, callback, context){
        var callbackId = 'c' + callbacks;

        params.callback = 'window._EsriLeafletCallbacks.' + callbackId;

        var script = L.DomUtil.create('script', null, document.body);
        script.type = 'text/javascript';
        script.src = url + '?' +  serialize(params);
        script.id = callbackId;

        window._EsriLeafletCallbacks[callbackId] = function(response){
          if(window._EsriLeafletCallbacks[callbackId] !== true){
            var error;
            var responseType = Object.prototype.toString.call(response);

            if(!(responseType === '[object Object]' || responseType === '[object Array]')){
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
          abort: function(){
            window._EsriLeafletCallbacks._callback[callbackId]({
              code: 0,
              message: 'Request aborted.'
            });
          }
        };
      }
    }
  };

  // choose the correct AJAX handler depending on CORS support
  EsriLeaflet.get = (EsriLeaflet.Support.CORS) ? EsriLeaflet.Request.get.CORS : EsriLeaflet.Request.get.JSONP;

  // always use XMLHttpRequest for posts
  EsriLeaflet.post = EsriLeaflet.Request.post.XMLHTTP;

  // expose a common request method the uses GET\POST based on request length
  EsriLeaflet.request = EsriLeaflet.Request.request;

})(EsriLeaflet);

EsriLeaflet.Services.Service = L.Class.extend({

  includes: L.Mixin.Events,

  options: {
    proxy: false,
    useCors: EsriLeaflet.Support.CORS
  },

  initialize: function (options) {
    options = options || {};
    this._requestQueue = [];
    this._authenticating = false;
    L.Util.setOptions(this, options);
    this.options.url = EsriLeaflet.Util.cleanUrl(this.options.url);
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

  authenticate: function(token){
    this._authenticating = false;
    this.options.token = token;
    this._runQueue();
    return this;
  },

  _request: function(method, path, params, callback, context){
    this.fire('requeststart', {
      url: this.options.url + path,
      params: params,
      method: method
    });

    var wrappedCallback = this._createServiceCallback(method, path, params, callback, context);

    if (this.options.token) {
      params.token = this.options.token;
    }

    if (this._authenticating) {
      this._requestQueue.push([method, path, params, callback, context]);
      return;
    } else {
      var url = (this.options.proxy) ? this.options.proxy + '?' + this.options.url + path : this.options.url + path;

      if((method === 'get' || method === 'request') && !this.options.useCors){
        return EsriLeaflet.Request.get.JSONP(url, params, wrappedCallback);
      } else {
        return EsriLeaflet[method](url, params, wrappedCallback);
      }
    }
  },

  _createServiceCallback: function(method, path, params, callback, context){
    return L.Util.bind(function(error, response){

      if (error && (error.code === 499 || error.code === 498)) {
        this._authenticating = true;

        this._requestQueue.push([method, path, params, callback, context]);

        // fire an event for users to handle and re-authenticate
        this.fire('authenticationrequired', {
          authenticate: L.Util.bind(this.authenticate, this)
        });

        // if the user has access to a callback they can handle the auth error
        error.authenticate = L.Util.bind(this.authenticate, this);
      }

      callback.call(context, error, response);

      if(error) {
        this.fire('requesterror', {
          url: this.options.url + path,
          params: params,
          message: error.message,
          code: error.code,
          method: method
        });
      } else {
        this.fire('requestsuccess', {
          url: this.options.url + path,
          params: params,
          response: response,
          method: method
        });
      }

      this.fire('requestend', {
        url: this.options.url + path,
        params: params,
        method: method
      });
    }, this);
  },

  _runQueue: function(){
    for (var i = this._requestQueue.length - 1; i >= 0; i--) {
      var request = this._requestQueue[i];
      var method = request.shift();
      this[method].apply(this, request);
    }
    this._requestQueue = [];
  }

});

EsriLeaflet.Services.service = function(params){
  return new EsriLeaflet.Services.Service(params);
};


EsriLeaflet.Services.FeatureLayerService = EsriLeaflet.Services.Service.extend({

  options: {
    idAttribute: 'OBJECTID'
  },

  query: function(){
    return new EsriLeaflet.Tasks.Query(this);
  },

  addFeature: function(feature, callback, context) {
    delete feature.id;

    feature = EsriLeaflet.Util.geojsonToArcGIS(feature);

    return this.post('addFeatures', {
      features: [feature]
    }, function(error, response){
      var result = (response && response.addResults) ? response.addResults[0] : undefined;
      if(callback){
        callback.call(context, error || response.addResults[0].error, result);
      }
    }, context);
  },

  updateFeature: function(feature, callback, context) {
    feature = EsriLeaflet.Util.geojsonToArcGIS(feature, this.options.idAttribute);

    return this.post('updateFeatures', {
      features: [feature]
    }, function(error, response){
      var result = (response && response.updateResults) ? response.updateResults[0] : undefined;
      if(callback){
        callback.call(context, error || response.updateResults[0].error, result);
      }
    }, context);
  },

  deleteFeature: function(id, callback, context) {
    return this.post('deleteFeatures', {
      objectIds: id
    }, function(error, response){
      var result = (response && response.deleteResults) ? response.deleteResults[0] : undefined;
      if(callback){
        callback.call(context, error || response.deleteResults[0].error, result);
      }
    }, context);
  },

  deleteFeatures: function(ids, callback, context) {
    return this.post('deleteFeatures', {
      objectIds: ids
    }, function(error, response){
      // pass back the entire array
      var result = (response && response.deleteResults) ? response.deleteResults : undefined;
      if(callback){
        callback.call(context, error || response.deleteResults[0].error, result);
      }
    }, context);
  }
});

EsriLeaflet.Services.featureLayerService = function(options) {
  return new EsriLeaflet.Services.FeatureLayerService(options);
};


EsriLeaflet.Tasks.Task = L.Class.extend({

  options: {
    proxy: false,
    useCors: EsriLeaflet.Support.CORS
  },

  //Generate a method for each methodName:paramName in the setters for this task.
  generateSetter: function(param, context){
    return L.Util.bind(function(value){
      this.params[param] = value;
      return this;
    }, context);
  },

  initialize: function(endpoint){
    // endpoint can be either a url (and options) for an ArcGIS Rest Service or an instance of EsriLeaflet.Service
    if(endpoint.request && endpoint.options){
      this._service = endpoint;
      L.Util.setOptions(this, endpoint.options);
    } else {
      L.Util.setOptions(this, endpoint);
      this.options.url = L.esri.Util.cleanUrl(endpoint.url);
    }

    // clone default params into this object
    this.params = L.Util.extend({}, this.params || {});

    // generate setter methods based on the setters object implimented a child class
    if(this.setters){
      for (var setter in this.setters){
        var param = this.setters[setter];
        this[setter] = this.generateSetter(param, this);
      }
    }
  },

  token: function(token){
    if(this._service){
      this._service.authenticate(token);
    } else {
      this.params.token = token;
    }
    return this;
  },

  request: function(callback, context){
    if(this._service){
      return this._service.request(this.path, this.params, callback, context);
    } else {
      return this._request('request', this.path, this.params, callback, context);
    }
  },

  _request: function(method, path, params, callback, context){
    var url = (this.options.proxy) ? this.options.proxy + '?' + this.options.url + path : this.options.url + path;
    if((method === 'get' || method === 'request') && !this.options.useCors){
      return EsriLeaflet.Request.get.JSONP(url, params, callback, context);
    } else{
      return EsriLeaflet[method](url, params, callback, context);
    }
  }
});

EsriLeaflet.Tasks.Query = EsriLeaflet.Tasks.Task.extend({
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

  within: function(geometry){
    this._setGeometry(geometry);
    this.params.spatialRel = 'esriSpatialRelContains'; // will make code read layer within geometry, to the api this will reads geometry contains layer
    return this;
  },

  intersects: function(geometry){
    this._setGeometry(geometry);
    this.params.spatialRel = 'esriSpatialRelIntersects';
    return this;
  },

  contains: function(geometry){
    this._setGeometry(geometry);
    this.params.spatialRel = 'esriSpatialRelWithin'; // will make code read layer contains geometry, to the api this will reads geometry within layer
    return this;
  },

  // crosses: function(geometry){
  //   this._setGeometry(geometry);
  //   this.params.spatialRel = 'esriSpatialRelCrosses';
  //   return this;
  // },

  // touches: function(geometry){
  //   this._setGeometry(geometry);
  //   this.params.spatialRel = 'esriSpatialRelTouches';
  //   return this;
  // },

  overlaps: function(geometry){
    this._setGeometry(geometry);
    this.params.spatialRel = 'esriSpatialRelOverlaps';
    return this;
  },

  // only valid for Feature Services running on ArcGIS Server 10.3 or ArcGIS Online
  nearby: function(latlng, radius){
    latlng = L.latLng(latlng);
    this.params.geometry = [latlng.lng, latlng.lat];
    this.params.geometryType = 'esriGeometryPoint';
    this.params.spatialRel = 'esriSpatialRelIntersects';
    this.params.units = 'esriSRUnit_Meter';
    this.params.distance = radius;
    this.params.inSr = 4326;
    return this;
  },

  where: function(string){
    // instead of converting double-quotes to single quotes, pass as is, and provide a more informative message if a 400 is encountered
    this.params.where = string;
    return this;
  },

  between: function(start, end){
    this.params.time = [start.valueOf(), end.valueOf()];
    return this;
  },

  simplify: function(map, factor){
    var mapWidth = Math.abs(map.getBounds().getWest() - map.getBounds().getEast());
    this.params.maxAllowableOffset = (mapWidth / map.getSize().y) * factor;
    return this;
  },

  orderBy: function(fieldName, order){
    order = order || 'ASC';
    this.params.orderByFields = (this.params.orderByFields) ? this.params.orderByFields + ',' : '';
    this.params.orderByFields += ([fieldName, order]).join(' ');
    return this;
  },

  run: function(callback, context){
    this._cleanParams();

    // if the service is hosted on arcgis online request geojson directly
    if(EsriLeaflet.Util.isArcgisOnline(this.options.url)){
      this.params.f = 'geojson';

      return this.request(function(error, response){
        this._trapSQLerrors(error);
        callback.call(context, error, response, response);
      }, this);

    // otherwise convert it in the callback then pass it on
    } else {
      return this.request(function(error, response){
        this._trapSQLerrors(error);
        callback.call(context, error, (response && EsriLeaflet.Util.responseToFeatureCollection(response)), response);
      }, this);
    }
  },

  count: function(callback, context){
    this._cleanParams();
    this.params.returnCountOnly = true;
    return this.request(function(error, response){
      callback.call(this, error, (response && response.count), response);
    }, context);
  },

  ids: function(callback, context){
    this._cleanParams();
    this.params.returnIdsOnly = true;
    return this.request(function(error, response){
      callback.call(this, error, (response && response.objectIds), response);
    }, context);
  },

  // only valid for Feature Services running on ArcGIS Server 10.3 or ArcGIS Online
  bounds: function(callback, context){
    this._cleanParams();
    this.params.returnExtentOnly = true;
    return this.request(function(error, response){
      callback.call(context, error, (response && response.extent && EsriLeaflet.Util.extentToBounds(response.extent)), response);
    }, context);
  },

  // only valid for image services
  pixelSize: function(point){
    point = L.point(point);
    this.params.pixelSize = [point.x,point.y];
    return this;
  },

  // only valid for map services
  layer: function(layer){
    this.path = layer + '/query';
    return this;
  },

  _trapSQLerrors: function(error){
    if (error){
      if (error.code === '400'){
        EsriLeaflet.Util.warn('one common syntax error in query requests is encasing string values in double quotes instead of single quotes');
      }
    }
  },

  _cleanParams: function(){
    delete this.params.returnIdsOnly;
    delete this.params.returnExtentOnly;
    delete this.params.returnCountOnly;
  },

  _setGeometry: function(geometry) {
    this.params.inSr = 4326;

    // convert bounds to extent and finish
    if ( geometry instanceof L.LatLngBounds ) {
      // set geometry + geometryType
      this.params.geometry = EsriLeaflet.Util.boundsToExtent(geometry);
      this.params.geometryType = 'esriGeometryEnvelope';
      return;
    }

    // convert L.Marker > L.LatLng
    if(geometry.getLatLng){
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
    if ( geometry instanceof L.GeoJSON ) {
      //reassign geometry to the GeoJSON value  (we are assuming that only one feature is present)
      geometry = geometry.getLayers()[0].feature.geometry;
      this.params.geometry = EsriLeaflet.Util.geojsonToArcGIS(geometry);
      this.params.geometryType = EsriLeaflet.Util.geojsonTypeToArcGIS(geometry.type);
    }

    // Handle L.Polyline and L.Polygon
    if (geometry.toGeoJSON) {
      geometry = geometry.toGeoJSON();
    }

    // handle GeoJSON feature by pulling out the geometry
    if ( geometry.type === 'Feature' ) {
      // get the geometry of the geojson feature
      geometry = geometry.geometry;
    }

    // confirm that our GeoJSON is a point, line or polygon
    if ( geometry.type === 'Point' ||  geometry.type === 'LineString' || geometry.type === 'Polygon') {
      this.params.geometry = EsriLeaflet.Util.geojsonToArcGIS(geometry);
      this.params.geometryType = EsriLeaflet.Util.geojsonTypeToArcGIS(geometry.type);
      return;
    }

    // warn the user if we havn't found a
    /* global console */
    EsriLeaflet.Util.warn('invalid geometry passed to spatial query. Should be an L.LatLng, L.LatLngBounds or L.Marker or a GeoJSON Point Line or Polygon object');

    return;
  }
});

EsriLeaflet.Tasks.query = function(params){
  return new EsriLeaflet.Tasks.Query(params);
};

EsriLeaflet.Layers.FeatureGrid = L.Class.extend({

  includes: L.Mixin.Events,

  options: {
    cellSize: 512,
    updateInterval: 150
  },

  initialize: function (options) {
    options = L.setOptions(this, options);
  },

  onAdd: function (map) {
    this._map = map;
    this._update = L.Util.limitExecByInterval(this._update, this.options.updateInterval, this);

    // @TODO remove for leaflet 0.8
    this._map.addEventListener(this.getEvents(), this);

    this._reset();
    this._update();
  },

  onRemove: function(){
    this._map.removeEventListener(this.getEvents(), this);
    this._removeCells();
  },

  getEvents: function () {
    var events = {
      viewreset: this._reset,
      moveend: this._update,
      zoomend : this._onZoom
    };

    return events;
  },

  addTo: function(map){
    map.addLayer(this);
    return this;
  },

  removeFrom: function(map){
    map.removeLayer(this);
    return this;
  },

  _onZoom : function () {
    var zoom = this._map.getZoom();

    if (zoom > this.options.maxZoom ||
        zoom < this.options.minZoom) {
      this.removeFrom(this._map);
      this._map.addEventListener('zoomend', this.getEvents().zoomend, this);
    } else if (!this._map.hasLayer(this)) {
      this._map.removeEventListener('zoomend', this.getEvents().zoomend, this);
      this.addTo(this._map);
    }

  },

  _reset: function () {
    this._removeCells();

    this._cells = {};
    this._activeCells = {};
    this._cellsToLoad = 0;
    this._cellsTotal = 0;

    // @TODO enable at Leaflet 0.8
    // this._cellNumBounds = this._getCellNumBounds();

    this._resetWrap();
  },

  _resetWrap: function () {
    var map = this._map,
        crs = map.options.crs;

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

    var bounds = this._map.getPixelBounds(),
        zoom = this._map.getZoom(),
        cellSize = this._getCellSize(),
        cellPadding = [cellSize/2,cellSize/2];
        // cellPadding = [0,0]

    if (zoom > this.options.maxZoom ||
        zoom < this.options.minZoom) { return; }

    // cell coordinates range for the current view
    var topLeft = bounds.min.subtract(cellPadding).divideBy(cellSize).floor();
    topLeft.x = Math.max(topLeft.x, 0);
    topLeft.y = Math.max(topLeft.y, 0);

    var cellBounds = L.bounds(topLeft, bounds.max.add(cellPadding).divideBy(cellSize).floor());

    // remove any present cells that are off the specified bounds
    this._removeOtherCells(cellBounds);
    this._addCells(cellBounds);
  },

  _addCells: function (bounds) {
    var queue = [],
        center = bounds.getCenter(),
        zoom = this._map.getZoom();

    var j, i, coords;
    // create a queue of coordinates to load cells from
    for (j = bounds.min.y; j <= bounds.max.y; j++) {
      for (i = bounds.min.x; i <= bounds.max.x; i++) {
        coords = new L.Point(i, j);
        coords.z = zoom;

        // @TODO enable at Leaflet 0.8
        // if (this._isValidCell(coords)) {
        //   queue.push(coords);
        // }

        queue.push(coords);
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

  // @TODO enable at Leaflet 0.8
  // _isValidCell: function (coords) {
  //   var crs = this._map.options.crs;

  //   if (!crs.infinite) {
  //     // don't load cell if it's out of bounds and not wrapped
  //     var bounds = this._cellNumBounds;
  //     if (
  //       (!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x)) ||
  //       (!crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y))
  //     ) {
  //       return false;
  //     }
  //   }

  //   if (!this.options.bounds) {
  //     return true;
  //   }

  //   // don't load cell if it doesn't intersect the bounds in options
  //   var cellBounds = this._cellCoordsToBounds(coords);
  //   return L.latLngBounds(this.options.bounds).intersects(cellBounds);
  // },

  // converts cell coordinates to its geographical bounds
  _cellCoordsToBounds: function (coords) {
    var map = this._map,
        cellSize = this.options.cellSize,

        nwPoint = coords.multiplyBy(cellSize),
        sePoint = nwPoint.add([cellSize, cellSize]),

        // @TODO for Leaflet 0.8
        // nw = map.wrapLatLng(map.unproject(nwPoint, coords.z)),
        // se = map.wrapLatLng(map.unproject(sePoint, coords.z));

        nw = map.unproject(nwPoint, coords.z).wrap(),
        se = map.unproject(sePoint, coords.z).wrap();

    return new L.LatLngBounds(nw, se);
  },

  // converts cell coordinates to key for the cell cache
  _cellCoordsToKey: function (coords) {
    return coords.x + ':' + coords.y;
  },

  // converts cell cache key to coordiantes
  _keyToCellCoords: function (key) {
    var kArr = key.split(':'),
        x = parseInt(kArr[0], 10),
        y = parseInt(kArr[1], 10);

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
    if(cell){
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

  _removeCells: function(){
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

      if(this.createCell){
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
  }

  // get the global cell coordinates range for the current zoom
  // @TODO enable at Leaflet 0.8
  // _getCellNumBounds: function () {
  //   // @TODO for Leaflet 0.8
  //   // var bounds = this._map.getPixelWorldBounds(),
  //   //     size = this._getCellSize();
  //   //
  //   // return bounds ? L.bounds(
  //   //     bounds.min.divideBy(size).floor(),
  //   //     bounds.max.divideBy(size).ceil().subtract([1, 1])) : null;
  // }

});

(function(EsriLeaflet){

  EsriLeaflet.Layers.FeatureManager = EsriLeaflet.Layers.FeatureGrid.extend({

    /**
     * Options
     */

    options: {
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
      EsriLeaflet.Layers.FeatureGrid.prototype.initialize.call(this, options);

      options.url = EsriLeaflet.Util.cleanUrl(options.url);
      options = L.setOptions(this, options);

      this._service = new EsriLeaflet.Services.FeatureLayerService(options);

      //use case insensitive regex to look for common fieldnames used for indexing
      /*global console */
      if (this.options.fields[0] !== '*'){
        var oidCheck = false;
        for (var i = 0; i < this.options.fields.length; i++){
          if (this.options.fields[i].match(/^(OBJECTID|FID|OID|ID)$/i)){
            oidCheck = true;
          }
        }
        if (oidCheck === false) {
          EsriLeaflet.Util.warn('no known esriFieldTypeOID field detected in fields Array.  Please add an attribute field containing unique IDs to ensure the layer can be drawn correctly.');
        }
      }

      // Leaflet 0.8 change to new propagation
      this._service.on('authenticationrequired requeststart requestend requesterror requestsuccess', function (e) {
        e = L.extend({
          target: this
        }, e);
        this.fire(e.type, e);
      }, this);

      if(this.options.timeField.start && this.options.timeField.end){
        this._startTimeIndex = new BinarySearchIndex();
        this._endTimeIndex = new BinarySearchIndex();
      } else if(this.options.timeField){
        this._timeIndex = new BinarySearchIndex();
      }

      this._cache = {};
      this._currentSnapshot = []; // cache of what layers should be active
      this._activeRequests = 0;
      this._pendingRequests = [];
    },

    /**
     * Layer Interface
     */

    onAdd: function(map){
      return EsriLeaflet.Layers.FeatureGrid.prototype.onAdd.call(this, map);
    },

    onRemove: function(map){
      return EsriLeaflet.Layers.FeatureGrid.prototype.onRemove.call(this, map);
    },

    getAttribution: function () {
      return this.options.attribution;
    },

    /**
     * Feature Managment
     */

    createCell: function(bounds, coords){
      this._requestFeatures(bounds, coords);
    },

    _requestFeatures: function(bounds, coords, callback){
      this._activeRequests++;

      // our first active request fires loading
      if(this._activeRequests === 1){
        this.fire('loading', {
          bounds: bounds
        });
      }

      this._buildQuery(bounds).run(function(error, featureCollection, response){
        if(response && response.exceededTransferLimit){
          this.fire('drawlimitexceeded');
        }

        // no error, features
        if(!error && featureCollection && featureCollection.features.length && !this._removed){
          // schedule adding features until the next animation frame
          EsriLeaflet.Util.requestAnimationFrame(L.Util.bind(function(){
            this._addFeatures(featureCollection.features, coords);
            this._postProcessFeatures(bounds);
          }, this));
        }

        // no error, no features
        if (!error && featureCollection && !featureCollection.features.length) {
          this._postProcessFeatures(bounds);
        }

        if(callback){
          callback.call(this, error, featureCollection);
        }
      }, this);
    },

    _postProcessFeatures: function (bounds) {
      //deincriment the request counter now that we have processed features
      this._activeRequests--;

      // if there are no more active requests fire a load event for this view
      if(this._activeRequests <= 0){
        this.fire('load', {
          bounds: bounds
        });
      }
    },

    _cacheKey: function (coords){
      return coords.z + ':' + coords.x + ':' +coords.y;
    },

    _addFeatures: function(features, coords){
      var key = this._cacheKey(coords);
      this._cache[key] = this._cache[key] || [];

      for (var i = features.length - 1; i >= 0; i--) {
        var id = features[i].id;
        this._currentSnapshot.push(id);
        this._cache[key].push(id);
        /*
        should we refactor the code in FeatureManager.setWhere()
        so that we can reuse it to make sure that we remove features
        on the client that are removed from the service?
        */

      }

      if(this.options.timeField){
        this._buildTimeIndexes(features);
      }

      var zoom = this._map.getZoom();

      if (zoom > this.options.maxZoom ||
          zoom < this.options.minZoom) { return; }

      this.createLayers(features);
    },

    _buildQuery: function(bounds){
      var query = this._service.query()
                      .intersects(bounds)
                      .where(this.options.where)
                      .fields(this.options.fields)
                      .precision(this.options.precision);

      if(this.options.simplifyFactor){
        query.simplify(this._map, this.options.simplifyFactor);
      }

      if(this.options.timeFilterMode === 'server' && this.options.from && this.options.to){
        query.between(this.options.from, this.options.to);
      }

      return query;
    },

    /**
     * Where Methods
     */

    setWhere: function(where, callback, context){

      this.options.where = (where && where.length) ? where : '1=1';

      var oldSnapshot = [];
      var newSnapshot = [];
      var pendingRequests = 0;
      var mostRecentError = null;
      var requestCallback = L.Util.bind(function(error, featureCollection){
        pendingRequests--;

        if(error) {
          mostRecentError = error;
        }

        if(featureCollection){
          for (var i = featureCollection.features.length - 1; i >= 0; i--) {
            newSnapshot.push(featureCollection.features[i].id);
          }
        }

        if(pendingRequests <= 0) {
          this._currentSnapshot = newSnapshot;
          // delay adding features until the next animation frame
          EsriLeaflet.Util.requestAnimationFrame(L.Util.bind(function() {
            this.removeLayers(oldSnapshot);
            this.addLayers(newSnapshot);
            if(callback) {
              callback.call(context, mostRecentError);
            }
          }, this));
        }
      }, this);

      for (var i = this._currentSnapshot.length - 1; i >= 0; i--) {
        oldSnapshot.push(this._currentSnapshot[i]);
      }

      for(var key in this._activeCells){
        pendingRequests++;
        var coords = this._keyToCellCoords(key);
        var bounds = this._cellCoordsToBounds(coords);
        this._requestFeatures(bounds, key, requestCallback);
      }

      return this;
    },

    getWhere: function(){
      return this.options.where;
    },

    /**
     * Time Range Methods
     */

    getTimeRange: function(){
      return [this.options.from, this.options.to];
    },

    setTimeRange: function(from, to, callback, context){
      var oldFrom = this.options.from;
      var oldTo = this.options.to;
      var pendingRequests = 0;
      var mostRecentError = null;
      var requestCallback = L.Util.bind(function(error){
        if(error){
          mostRecentError = error;
        }

        this._filterExistingFeatures(oldFrom, oldTo, from, to);

        pendingRequests--;

        if(callback && pendingRequests <= 0){
          callback.call(context, mostRecentError);
        }
      }, this);

      this.options.from = from;
      this.options.to = to;

      this._filterExistingFeatures(oldFrom, oldTo, from, to);

      if(this.options.timeFilterMode === 'server') {
        for(var key in this._activeCells){
          pendingRequests++;
          var coords = this._keyToCellCoords(key);
          var bounds = this._cellCoordsToBounds(coords);
          this._requestFeatures(bounds, key, requestCallback);
        }
      }
    },

    refresh: function(){
      for(var key in this._activeCells){
        var coords = this._keyToCellCoords(key);
        var bounds = this._cellCoordsToBounds(coords);
        this._requestFeatures(bounds, key);
      }

      if(this.redraw){
        this.once('load', function(){
          this.eachFeature(function(layer){
            this._redraw(layer.feature.id);
          }, this);
        }, this);
      }
    },

    _filterExistingFeatures: function (oldFrom, oldTo, newFrom, newTo) {
      var layersToRemove = (oldFrom && oldTo) ? this._getFeaturesInTimeRange(oldFrom, oldTo) : this._currentSnapshot;
      var layersToAdd = this._getFeaturesInTimeRange(newFrom, newTo);

      if(layersToAdd.indexOf){
        for (var i = 0; i < layersToAdd.length; i++) {
          var shouldRemoveLayer = layersToRemove.indexOf(layersToAdd[i]);
          if(shouldRemoveLayer >= 0){
            layersToRemove.splice(shouldRemoveLayer, 1);
          }
        }
      }

      // schedule adding features until the next animation frame
      EsriLeaflet.Util.requestAnimationFrame(L.Util.bind(function(){
        this.removeLayers(layersToRemove);
        this.addLayers(layersToAdd);
      }, this));
    },

    _getFeaturesInTimeRange: function(start, end){
      var ids = [];
      var search;

      if(this.options.timeField.start && this.options.timeField.end){
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

    _buildTimeIndexes: function(geojson){
      var i;
      var feature;
      if(this.options.timeField.start && this.options.timeField.end){
        var startTimeEntries = [];
        var endTimeEntries = [];
        for (i = geojson.length - 1; i >= 0; i--) {
          feature = geojson[i];
          startTimeEntries.push( {
            id: feature.id,
            value: new Date(feature.properties[this.options.timeField.start])
          });
          endTimeEntries.push( {
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
          timeEntries.push( {
            id: feature.id,
            value: new Date(feature.properties[this.options.timeField])
          });
        }

        this._timeIndex.bulkAdd(timeEntries);
      }
    },

    _featureWithinTimeRange: function(feature){
      if(!this.options.from || !this.options.to){
        return true;
      }

      var from = +this.options.from.valueOf();
      var to = +this.options.to.valueOf();

      if(typeof this.options.timeField === 'string'){
        var date = +feature.properties[this.options.timeField];
        return (date >= from) && (date <= to);
      }

      if(this.options.timeField.start &&  this.options.timeField.end){
        var startDate = +feature.properties[this.options.timeField.start];
        var endDate = +feature.properties[this.options.timeField.end];
        return ((startDate >= from) && (startDate <= to)) || ((endDate >= from) && (endDate <= to));
      }
    },

    /**
     * Service Methods
     */

    authenticate: function(token){
      this._service.authenticate(token);
      return this;
    },

    metadata: function(callback, context){
      this._service.metadata(callback, context);
      return this;
    },

    query: function(){
      return this._service.query();
    },

    _getMetadata: function(callback){
      if(this._metadata){
        var error;
        callback(error, this._metadata);
      } else {
        this.metadata(L.Util.bind(function(error, response) {
          this._metadata = response;
          callback(error, this._metadata);
        }, this));
      }
    },

    addFeature: function(feature, callback, context){
      this._getMetadata(L.Util.bind(function(error, metadata){
        this._service.addFeature(feature, L.Util.bind(function(error, response){
          if(!error){
            // assign ID from result to appropriate objectid field from service metadata
            feature.properties[metadata.objectIdField] = response.objectId;

            // we also need to update the geojson id for createLayers() to function
            feature.id = response.objectId;
            this.createLayers([feature]);
          }

          if(callback){
            callback.call(context, error, response);
          }
        }, this));
      }, this));
    },

    updateFeature: function(feature, callback, context){
      this._service.updateFeature(feature, function(error, response){
        if(!error){
          this.removeLayers([feature.id], true);
          this.createLayers([feature]);
        }

        if(callback){
          callback.call(context, error, response);
        }
      }, this);
    },

    deleteFeature: function(id, callback, context){
      this._service.deleteFeature(id, function(error, response){
        if(!error && response.objectId){
          this.removeLayers([response.objectId], true);
        }

        if(callback){
          callback.call(context, error, response);
        }
      }, this);
    },

    deleteFeatures: function(ids, callback, context){
      return this._service.deleteFeatures(ids, function(error, response){
        if(!error && response.length > 0){
          for (var i=0; i<response.length; i++){
            this.removeLayers([response[i].objectId], true);
          }
        }

        if(callback){
          callback.call(context, error, response);
        }
      }, this);
    }
  });

  /**
   * Temporal Binary Search Index
   */

  function BinarySearchIndex(values) {
    this.values = values || [];
  }

  BinarySearchIndex.prototype._query = function(query){
    var minIndex = 0;
    var maxIndex = this.values.length - 1;
    var currentIndex;
    var currentElement;
    var resultIndex;

    while (minIndex <= maxIndex) {
      resultIndex = currentIndex = (minIndex + maxIndex) / 2 | 0;
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

  BinarySearchIndex.prototype.sort = function(){
    this.values.sort(function(a, b) {
      return +b.value - +a.value;
    }).reverse();
    this.dirty = false;
  };

  BinarySearchIndex.prototype.between = function(start, end){
    if(this.dirty){
      this.sort();
    }

    var startIndex = this._query(start);
    var endIndex = this._query(end);

    if(startIndex === 0 && endIndex === 0){
      return [];
    }

    startIndex = Math.abs(startIndex);
    endIndex = (endIndex < 0) ? Math.abs(endIndex): endIndex + 1;

    return this.values.slice(startIndex, endIndex);
  };

  BinarySearchIndex.prototype.bulkAdd = function(items){
    this.dirty = true;
    this.values = this.values.concat(items);
  };

})(EsriLeaflet);


EsriLeaflet.Layers.FeatureLayer = EsriLeaflet.Layers.FeatureManager.extend({

  statics: {
    EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose'
  },

  options: {
    cacheLayers: true
  },

  /**
   * Constructor
   */

  initialize: function (options) {
    EsriLeaflet.Layers.FeatureManager.prototype.initialize.call(this, options);

    options = L.setOptions(this, options);

    this._layers = {};
    this._leafletIds = {};
    this._key = 'c'+(Math.random() * 1e9).toString(36).replace('.', '_');
  },

  /**
   * Layer Interface
   */

  onAdd: function(map){
    map.on('zoomstart zoomend', function(e){
      this._zooming = (e.type === 'zoomstart');
    }, this);
    this._removed = false;

    return EsriLeaflet.Layers.FeatureManager.prototype.onAdd.call(this, map);
  },

  onRemove: function(map){
    this._removed = true;
    for (var i in this._layers) {
      map.removeLayer(this._layers[i]);
    }

    return EsriLeaflet.Layers.FeatureManager.prototype.onRemove.call(this, map);
  },

  createNewLayer: function(geojson){
    // @TODO Leaflet 0.8
    //newLayer = L.GeoJSON.geometryToLayer(geojson, this.options);
    return L.GeoJSON.geometryToLayer(geojson, this.options.pointToLayer, L.GeoJSON.coordsToLatLng, this.options);
  },

  _updateLayer: function(layer, geojson){
    // convert the geojson coordinates into a Leaflet LatLng array/nested arrays
    // pass it to setLatLngs to update layer geometries
    var latlngs = [];
    var coordsToLatLng = this.options.coordsToLatLng || L.GeoJSON.coordsToLatLng;

    // copy new attributes, if present
    if (geojson.properties) {
      layer.feature.properties = geojson.properties;
    }

    switch(geojson.geometry.type){
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

  createLayers: function(features){
    for (var i = features.length - 1; i >= 0; i--) {

      var geojson = features[i];

      var layer = this._layers[geojson.id];
      var newLayer;

      if(layer && !this._map.hasLayer(layer)){
        this._map.addLayer(layer);
      }

      // update geomerty if neccessary
      if (layer && (layer.setLatLngs || layer.setLatLng)) {
        this._updateLayer(layer, geojson);
      }


      if(!layer){
        newLayer =  this.createNewLayer(geojson);
        newLayer.feature = geojson;

        if (this.options.style) {
          newLayer._originalStyle = this.options.style;
        }

        // circleMarker check
        else if (newLayer.setStyle) {
          newLayer._originalStyle = newLayer.options;
        }

        newLayer._leaflet_id = this._key + '_' + geojson.id;

        this._leafletIds[newLayer._leaflet_id] = geojson.id;

        // bubble events from layers to this
        // @TODO Leaflet 0.8
        // newLayer.addEventParent(this);

        newLayer.on(EsriLeaflet.Layers.FeatureLayer.EVENTS, this._propagateEvent, this);

        // bind a popup if we have one
        if(this._popup && newLayer.bindPopup){
          newLayer.bindPopup(this._popup(newLayer.feature, newLayer), this._popupOptions);
        }

        if(this.options.onEachFeature){
          this.options.onEachFeature(newLayer.feature, newLayer);
        }

        // cache the layer
        this._layers[newLayer.feature.id] = newLayer;

        // style the layer
        this.resetStyle(newLayer.feature.id);

        this.fire('createfeature', {
          feature: newLayer.feature
        });

        // add the layer if it is within the time bounds or our layer is not time enabled
        if(!this.options.timeField || (this.options.timeField && this._featureWithinTimeRange(geojson)) ){
          this._map.addLayer(newLayer);
        }
      }
    }
  },

  addLayers: function(ids){
    for (var i = ids.length - 1; i >= 0; i--) {
      var layer = this._layers[ids[i]];
      if(layer){
        this.fire('addfeature', {
          feature: layer.feature
        });
        this._map.addLayer(layer);
      }
    }
  },

  removeLayers: function(ids, permanent){
    for (var i = ids.length - 1; i >= 0; i--) {
      var id = ids[i];
      var layer = this._layers[id];
      if(layer){
        this.fire('removefeature', {
          feature: layer.feature,
          permanent: permanent
        });
        this._map.removeLayer(layer);
      }
      if(layer && permanent){
        delete this._layers[id];
      }
    }
  },

  cellEnter: function(bounds, coords){
    if(!this._zooming){
      EsriLeaflet.Util.requestAnimationFrame(L.Util.bind(function(){
        var cacheKey = this._cacheKey(coords);
        var cellKey = this._cellCoordsToKey(coords);
        var layers = this._cache[cacheKey];
        if(this._activeCells[cellKey] && layers){
          this.addLayers(layers);
        }
      }, this));
    }
  },

  cellLeave: function(bounds, coords){
    if(!this._zooming){
      EsriLeaflet.Util.requestAnimationFrame(L.Util.bind(function(){
        var cacheKey = this._cacheKey(coords);
        var cellKey = this._cellCoordsToKey(coords);
        var layers = this._cache[cacheKey];
        var mapBounds = this._map.getBounds();
        if(!this._activeCells[cellKey] && layers){
          var removable = true;

          for (var i = 0; i < layers.length; i++) {
            var layer = this._layers[layers[i]];
            if(layer && layer.getBounds && mapBounds.intersects(layer.getBounds())){
              removable = false;
            }
          }

          if(removable){
            this.removeLayers(layers, !this.options.cacheLayers);
          }

          if(!this.options.cacheLayers && removable){
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

  resetStyle: function (id) {
    var layer = this._layers[id];

    if(layer){
      this.setFeatureStyle(layer.feature.id, layer._originalStyle);
    }

    return this;
  },

  setStyle: function (style) {
    this.options.style = style;
    this.eachFeature(function (layer) {
      this.setFeatureStyle(layer.feature.id, style);
    }, this);
    return this;
  },

  setFeatureStyle: function (id, style) {
    var layer = this._layers[id];

    if (typeof style === 'function') {
      style = style(layer.feature);
    }

    if (!style && !layer.defaultOptions) {
      style = L.Path.prototype.options;
      style.fill = true; //not set by default
    }

    if (layer && layer.setStyle) {
      layer.setStyle(style);
    }

    return this;
  },

  /**
   * Popup Methods
   */

  bindPopup: function (fn, options) {
    this._popup = fn;
    this._popupOptions = options;
    for (var i in this._layers) {
      var layer = this._layers[i];
      var popupContent = this._popup(layer.feature, layer);
      layer.bindPopup(popupContent, options);
    }
    return this;
  },

  unbindPopup: function () {
    this._popup =  false;
    for (var i in this._layers) {
      var layer = this._layers[i];
      if (layer.unbindPopup) {
        layer.unbindPopup();
      } else if (layer.getLayers) {
        var groupLayers = layer.getLayers();
        for (var j in groupLayers) {
          var gLayer = groupLayers[j];
          gLayer.unbindPopup();
        }
      }
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
      if(layer.bringToBack) {
        layer.bringToBack();
      }
    });
  },

  bringToFront: function () {
    this.eachFeature(function (layer) {
      if(layer.bringToFront) {
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

  _redraw: function(id) {
    var layer = this._layers[id];
    var geojson = layer.feature;

    // if this looks like a marker
    if (layer && layer.setIcon && this.options.pointToLayer) {
      // update custom symbology, if necessary
      if (this.options.pointToLayer){
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
    if(layer && layer.setStyle && this.options.style) {
      this.resetStyle(geojson.id);
    }
  },

  // from https://github.com/Leaflet/Leaflet/blob/v0.7.2/src/layer/FeatureGroup.js
  // @TODO remove at Leaflet 0.8
  _propagateEvent: function (e) {
    e.layer = this._layers[this._leafletIds[e.target._leaflet_id]];
    e.target = this;
    this.fire(e.type, e);
  }
});

EsriLeaflet.FeatureLayer = EsriLeaflet.Layers.FeatureLayer;

EsriLeaflet.Layers.featureLayer = function(options){
  return new EsriLeaflet.Layers.FeatureLayer(options);
};

EsriLeaflet.featureLayer = function(options){
  return new EsriLeaflet.Layers.FeatureLayer(options);
};


  return EsriLeaflet;
}));
//# sourceMappingURL=esri-leaflet-feature-layer-src.js.map