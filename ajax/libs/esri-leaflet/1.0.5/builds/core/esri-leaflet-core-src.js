/*! esri-leaflet - v1.0.5 - 2017-04-26
*   Copyright (c) 2017 Environmental Systems Research Institute, Inc.
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
  VERSION: '1.0.5',
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


  return EsriLeaflet;
}));
//# sourceMappingURL=esri-leaflet-core-src.js.map