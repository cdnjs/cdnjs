/*! esri-leaflet-geocoder - v1.0.0-rc.2 - 2014-10-26
*   Copyright (c) 2014 Environmental Systems Research Institute, Inc.
*   Apache 2.0 License */

(function (factory) {
  // define an AMD module that relies on 'leaflet'
  if (typeof define === 'function' && define.amd) {
    define(['leaflet', 'esri-leaflet'], function (L, Esri) {
      return factory(L, Esri);
    });

  // define a common js module that relies on 'leaflet'
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('leaflet'), require('esri-leaflet'));
  }

  // define globals if we can find the proper place to attach them to.
  if(typeof window !== 'undefined' && window.L && window.L.esri) {
    factory(L, L.esri);
  }

}(function (L, Esri) {
var EsriLeafletGeocoding = {
  WorldGeocodingService: '//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/',
  Tasks: {},
  Services: {},
  Controls: {}
};

// attach to the L.esri global if we can
if(typeof window !== 'undefined' && window.L && window.L.esri) {
  window.L.esri.Geocoding = EsriLeafletGeocoding;
}

// We do not have an 'Esri' variable e.g loading this file directly from source define 'Esri'
if(!Esri){
  var Esri = window.L.esri;
}

EsriLeafletGeocoding.Tasks.Geocode = Esri.Tasks.Task.extend({
  path: 'find',

  params : {
    outSr: 4326,
    forStorage: false,
    outFields: '*',
    maxLocations: 20
  },

  setters: {
    'address': 'address',
    'neighborhood': 'neighborhood',
    'city': 'city',
    'subregion': 'subregion',
    'region': 'region',
    'postal': 'postal',
    'country': 'country',
    'text': 'text',
    'category': 'category[]',
    'token' : 'token',
    'key': 'magicKey',
    'fields': 'outFields[]',
    'forStorage': 'forStorage',
    'maxLocations': 'maxLocations'
  },

  within: function(bounds){
    bounds = L.latLngBounds(bounds);
    console.log(bounds);
    this.params.bbox = Esri.Util.boundsToExtent(bounds);
  },

  nearby: function(latlng, radius){
    latlng = L.latLng(latlng);
    this.params.location = latlng.lng + ',' + latlng.lat;
    this.params.distance = Math.min(Math.max(radius, 2000), 50000);
  },

  run: function(callback, context){
    this.path = (this.params.text) ? 'find' : 'findAddressCandidates';

    if(this.path === 'findAddressCandidates' && this.params.bbox) {
      this.params.searchExtent = this.params.bbox;
      delete this.params.bbox;
    }

    return this.request(function(error, response){
      var processor = (this.path === 'find') ? this._processFindResponse : this._processFindAddressCandidatesResponse;
      var results = (!error) ? processor(response) : undefined;
      callback.call(context, error, { results: results }, response);
    }, this);
  },

  _processFindResponse: function(response){
    var results = [];

    for (var i = 0; i < response.locations.length; i++) {
      var location = response.locations[i];
      var bounds = Esri.Util.extentToBounds(location.extent);

      results.push({
        text: location.name,
        bounds: bounds,
        score: location.feature.attributes.Score,
        latlng: new L.LatLng(location.feature.geometry.y, location.feature.geometry.x),
        properties: location.feature.attributes
      });
    }

    return results;
  },

  _processFindAddressCandidatesResponse: function(response){
    var results = [];

    for (var i = 0; i < response.candidates.length; i++) {
      var candidate = response.candidates[i];
      var bounds = Esri.Util.extentToBounds(candidate.extent);

      results.push({
        text: candidate.address,
        bounds: bounds,
        score: candidate.score,
        latlng: new L.LatLng(candidate.location.y, candidate.location.x),
        properties: candidate.attributes
      });
    }

    return results;
  }

});

EsriLeafletGeocoding.Tasks.geocode = function(url, options){
  return new EsriLeafletGeocoding.Tasks.Geocode(url, options);
};

EsriLeafletGeocoding.Tasks.ReverseGeocode = Esri.Tasks.Task.extend({
  path: 'reverseGeocode',

  params : {
    outSR: 4326
  },
  setters: {
    'distance': 'distance',
    'language': 'language'
  },

  latlng: function (latlng) {
    latlng = L.latLng(latlng);
    this.params.location = latlng.lng + ',' + latlng.lat;
    return this;
  },

  run: function(callback, context){
    return this.request(function(error, response){
      var result;

      if(!error){
        result = {
          latlng: new L.LatLng(response.location.y, response.location.x),
          address: response.address
        };
      } else {
        result = undefined;
      }

      callback.call(context, error, result, response);
    }, this);
  }
});

EsriLeafletGeocoding.Tasks.reverseGeocode = function(url, options){
  return new EsriLeafletGeocoding.Tasks.ReverseGeocode(url, options);
};

EsriLeafletGeocoding.Tasks.Suggest = Esri.Tasks.Task.extend({
  path: 'suggest',

  params : {},

  setters: {
    text: 'text',
    category: 'category'
  },

  within: function(bounds){
    bounds = L.latLngBounds(bounds);
    bounds = bounds.pad(0.5);
    var center = bounds.getCenter();
    var ne = bounds.getNorthWest();
    this.params.location = center.lng + ',' + center.lat;
    this.params.distance = Math.min(Math.max(center.distanceTo(ne), 2000), 50000);
    return this;
  },

  nearby: function(latlng, radius){
    latlng = L.latLng(latlng);
    this.params.location = latlng.lng + ',' + latlng.lat;
    this.params.distance = Math.min(Math.max(radius, 2000), 50000);
    return this;
  },

  run: function(callback, context){
    return this.request(function(error, response){
      callback.call(context, error, response, response);
    }, this);
  }

});

EsriLeafletGeocoding.Tasks.suggest = function(url, options){
  return new EsriLeafletGeocoding.Tasks.Suggest(url, options);
};

EsriLeafletGeocoding.Services.Geocoding = Esri.Services.Service.extend({
  includes: L.Mixin.Events,

  initialize: function (url, options) {
    url = (typeof url === 'string') ? url : EsriLeafletGeocoding.WorldGeocodingService;
    options = (typeof url === 'object') ? url : (options || {});
    this.url = Esri.Util.cleanUrl(url);
    L.Util.setOptions(this, options);
    Esri.Services.Service.prototype.initialize.call(this, url, options);
  },

  geocode: function(){
    return new EsriLeafletGeocoding.Tasks.Geocode(this);
  },

  reverse: function(){
    return new EsriLeafletGeocoding.Tasks.ReverseGeocode(this);
  },

  suggest: function(){
    if(this.url !== EsriLeafletGeocoding.WorldGeocodingService && console && console.warn){
      console.warn('Only the ArcGIS Online World Geocoder supports suggestions');
    }
    return new EsriLeafletGeocoding.Tasks.Suggest(this);
  }
});

EsriLeafletGeocoding.Services.geocoding = function(url, options){
  return new EsriLeafletGeocoding.Services.Geocoding(url, options);
};

EsriLeafletGeocoding.Controls.Geosearch = L.Control.extend({
  includes: L.Mixin.Events,
  options: {
    position: 'topleft',
    zoomToResult: true,
    useMapBounds: 12,
    collapseAfterResult: true,
    expanded: false,
    forStorage: false,
    allowMultipleResults: true,
    useArcgisWorldGeocoder: true,
    providers: [],
    placeholder: 'Search for places or addresses'
  },

  initialize: function (options) {
    L.Util.setOptions(this, options);

    if(this.options.useArcgisWorldGeocoder){
      var geocoder = new EsriLeafletGeocoding.Controls.Geosearch.Providers.ArcGISOnline();
      this.options.providers.push(geocoder);
    }

    if(this.options.maxResults){
      for (var i = 0; i < this.options.providers.length; i++) {
        this.options.providers[i].options.maxResults = this.options.maxResults;
      }
    }

    this._pendingSuggestions = [];
  },

  _geocode: function(text, key, provider){
    var activeRequests = 0;
    var allResults = [];
    var bounds;

    var callback = L.Util.bind(function(error, results){
      activeRequests--;

      if(results){
        allResults = allResults.concat(results);
      }

      if(activeRequests <= 0){
        bounds = this._boundsFromResults(allResults);

        this.fire('results', {
          results: allResults,
          bounds: bounds,
          latlng: (bounds) ? bounds.getCenter() : undefined,
          text: text
        });

        if(this.options.zoomToResult && bounds){
          this._map.fitBounds(bounds);
        }

        L.DomUtil.removeClass(this._input, 'geocoder-control-loading');

        this.fire('load');

        this.clear();

        this._input.blur();
      }
    }, this);

    if(key){
      activeRequests++;
      provider.results( text, key, this._searchBounds(), callback);
    } else {
      for (var i = 0; i < this.options.providers.length; i++) {
        activeRequests++;
        this.options.providers[i].results(text, key, this._searchBounds(), callback);
      }
    }
  },

  _suggest: function(text){
    L.DomUtil.addClass(this._input, 'geocoder-control-loading');
    var activeRequests = this.options.providers.length;

    var createCallback = L.Util.bind(function(text, provider){
      return L.Util.bind(function(error, suggestions){
        var i;

        activeRequests = activeRequests - 1;

        if(this._input.value < 2) {
          this._suggestions.innerHTML = '';
          this._suggestions.style.display = 'none';
          return;
        }

        if(suggestions){
          for (i = 0; i < suggestions.length; i++) {
            suggestions[i].provider = provider;
          }
        }

        if(provider._lastRender !== text && provider.nodes) {
          for (i = 0; i < provider.nodes.length; i++) {
            if(provider.nodes[i].parentElement){
              this._suggestions.removeChild(provider.nodes[i]);
            }
          }

          provider.nodes = [];
        }

        if(suggestions.length && this._input.value === text) {
          if(provider.nodes){
            for (i = 0; i < provider.nodes.length; i++) {
              if(provider.nodes[i].parentElement){
                this._suggestions.removeChild(provider.nodes[i]);
              }
            }
          }

          provider._lastRender = text;
          provider.nodes = this._renderSuggestions(suggestions);
        }

        if(activeRequests === 0) {
          L.DomUtil.removeClass(this._input, 'geocoder-control-loading');
        }
      }, this);
    }, this);

    this._pendingSuggestions = [];

    for (var i = 0; i < this.options.providers.length; i++) {
      var provider = this.options.providers[i];
      console.log(!!provider);
      console.log(provider.options.label);
      var request = provider.suggestions(text, this._searchBounds(), createCallback(text, provider));
      this._pendingSuggestions.push(request);
    }
  },

  _searchBounds: function(){
    if(this.options.useMapBounds === false) {
      return null;
    }

    if(this.options.useMapBounds === true) {
      return this._map.getBounds();
    }

    if(this.options.useMapBounds <= this._map.getZoom()) {
      return this._map.getBounds();
    }

    return null;
  },

  _renderSuggestions: function(suggestions){
    var currentGroup;
    this._suggestions.style.display = 'block';
    var nodes = [];
    var list;
    var header;
    for (var i = 0; i < suggestions.length; i++) {
      var suggestion = suggestions[i];
      if(!header && this.options.providers.length > 1 && currentGroup !== suggestion.provider.options.label){
        header = L.DomUtil.create('span', 'geocoder-control-header', this._suggestions);
        header.textContent = suggestion.provider.options.label;
        header.innerText = suggestion.provider.options.label;
        currentGroup = suggestion.provider.options.label;
        nodes.push(header);
      }

      if(!list){
        list = L.DomUtil.create('ul', 'geocoder-control-list', this._suggestions);
      }

      var suggestionItem = L.DomUtil.create('li', 'geocoder-control-suggestion', list);

      suggestionItem.innerHTML = suggestion.text;
      suggestionItem.provider = suggestion.provider;
      suggestionItem['data-magic-key'] = suggestion.magicKey;
    }

    nodes.push(list);
    console.log(nodes.length);
    return nodes;
  },

  _boundsFromResults: function(results){
    if(!results.length){
      return;
    }

    var nullIsland = new L.LatLngBounds([0,0], [0,0]);
    var bounds = new L.LatLngBounds();

    for (var i = results.length - 1; i >= 0; i--) {
      var result = results[i];

      // make sure bounds are valid and not 0,0. sometimes bounds are incorrect or not present
      if(result.bounds.isValid() && !result.bounds.equals(nullIsland)){
        bounds.extend(result.bounds);
      }

      // ensure that the bounds include the results center point
      bounds.extend(result.latlng);
    }

    return bounds;
  },

  clear: function(){
    this._suggestions.innerHTML = '';
    this._suggestions.style.display = 'none';
    this._input.value = '';

    if(this.options.collapseAfterResult){
      this._input.placeholder = '';
      L.DomUtil.removeClass(this._wrapper, 'geocoder-control-expanded');
    }
  },

  onAdd: function (map) {
    this._map = map;

    if (map.attributionControl) {
      map.attributionControl.addAttribution('Geocoding by Esri');
    }

    this._wrapper = L.DomUtil.create('div', 'geocoder-control ' + ((this.options.expanded) ? ' ' + 'geocoder-control-expanded'  : ''));
    this._input = L.DomUtil.create('input', 'geocoder-control-input leaflet-bar', this._wrapper);

    this._suggestions = L.DomUtil.create('div', 'geocoder-control-suggestions leaflet-bar', this._wrapper);

    L.DomEvent.addListener(this._input, 'focus', function(e){
      this._input.placeholder = this.options.placeholder;
      L.DomUtil.addClass(this._wrapper, 'geocoder-control-expanded');
    }, this);

    L.DomEvent.addListener(this._wrapper, 'click', function(e){
      L.DomUtil.addClass(this._wrapper, 'geocoder-control-expanded');
      this._input.focus();
    }, this);

    L.DomEvent.addListener(this._suggestions, 'mousedown', function(e){
      var suggestionItem = e.target || e.srcElement;
      this._geocode(suggestionItem.innerHTML, suggestionItem['data-magic-key'], suggestionItem.provider);
      this.clear();
    }, this);

    L.DomEvent.addListener(this._input, 'blur', function(e){
      this.clear();
    }, this);

    L.DomEvent.addListener(this._input, 'keydown', function(e){
      L.DomUtil.addClass(this._wrapper, 'geocoder-control-expanded');

      var list = this._suggestions.querySelectorAll('.' + 'geocoder-control-suggestion');
      var selected = this._suggestions.querySelectorAll('.' + 'geocoder-control-selected')[0];
      var selectedPosition;

      for (var i = 0; i < list.length; i++) {
        if(list[i] === selected){
          selectedPosition = i;
          break;
        }
      }

      switch(e.keyCode){
      case 13:
        if(selected){
          this._geocode(selected.innerHTML, selected['data-magic-key'], selected.provider);
          this.clear();
        } else if(this.options.allowMultipleResults){
          this._geocode(this._input.value, undefined);
          this.clear();
        } else {
          L.DomUtil.addClass(list[0], 'geocoder-control-selected');
        }
        L.DomEvent.preventDefault(e);
        break;
      case 38:
        if(selected){
          L.DomUtil.removeClass(selected, 'geocoder-control-selected');
        }

        var previousItem = list[selectedPosition-1];

        if(selected && previousItem) {
          L.DomUtil.addClass(previousItem, 'geocoder-control-selected');
        } else {
          L.DomUtil.addClass(list[list.length-1], 'geocoder-control-selected');
        }
        L.DomEvent.preventDefault(e);
        break;
      case 40:
        if(selected){
          L.DomUtil.removeClass(selected, 'geocoder-control-selected');
        }

        var nextItem = list[selectedPosition+1];

        if(selected && nextItem) {
          L.DomUtil.addClass(nextItem, 'geocoder-control-selected');
        } else {
          L.DomUtil.addClass(list[0], 'geocoder-control-selected');
        }
        L.DomEvent.preventDefault(e);
        break;
      default:
        // when the input changes we should cancel all pending suggestion requests if possible to avoid result collisions
        for (var x = 0; x < this._pendingSuggestions.length; x++) {
          var request = this._pendingSuggestions[x];
          if(request && request.abort && !request.id){
            request.abort();
          //work around an Esri Leaflet bug. Remove for 1.0.0/RC.2
          } else if(request.id && window._EsriLeafletCallbacks[request.id].abort) {
            window._EsriLeafletCallbacks[request.id].abort();
          }
        }
        break;
      }
    }, this);

    L.DomEvent.addListener(this._input, 'keyup', L.Util.limitExecByInterval(function(e){
      var key = e.which || e.keyCode;
      var text = (e.target || e.srcElement).value;

      // require at least 2 characters for suggestions
      if(text.length < 2) {
        this._suggestions.innerHTML = '';
        this._suggestions.style.display = 'none';
        L.DomUtil.removeClass(this._input, 'geocoder-control-loading');
        return;
      }

      // if this is the escape key it will clear the input so clear suggestions
      if(key === 27){
        this._suggestions.innerHTML = '';
        this._suggestions.style.display = 'none';
        return;
      }

      // if this is NOT the up/down arrows or enter make a suggestion
      if(key !== 13 && key !== 38 && key !== 40){
        if(this._input.value !== this._lastValue){
          this._lastValue = this._input.value;
          this._suggest(text);
        }
      }
    }, 50, this), this);

    L.DomEvent.disableClickPropagation(this._wrapper);

    return this._wrapper;
  },

  onRemove: function (map) {
    map.attributionControl.removeAttribution('Geocoding by Esri');
  }
});

EsriLeafletGeocoding.Controls.geosearch = function(options){
  return new EsriLeafletGeocoding.Controls.Geosearch(options);
};

EsriLeafletGeocoding.Controls.Geosearch.Providers = {};

EsriLeafletGeocoding.Controls.Geosearch.Providers.ArcGISOnline = EsriLeafletGeocoding.Services.Geocoding.extend({
  options: {
    label: "Places and Addresses",
    maxResults: 5
  },
  suggestions: function(text, bounds, callback){
    var request = this.suggest().text(text);

    if(bounds){
      request.within(bounds);
    }

    return request.run(function(error, results, response){
      var suggestions = [];
      if(!error){
        while(response.suggestions.length && suggestions.length <= (this.options.maxResults - 1)){
          var suggestion = response.suggestions.shift();
          if(!suggestion.isCollection){
            suggestions.push({
              text: suggestion.text,
              magicKey: suggestion.magicKey
            });
          }
        }
      }
      callback(error, suggestions);
    }, this);
  },

  results: function(text, key, bounds, callback){
    var request = this.geocode().text(text);

    if(key){
      request.key(key);
    } else {
      request.maxLocations(this.options.maxResults);
    }

    if(bounds){
      request.within(bounds);
    }

    if(this.options.forStorage){
      request.forStorage(true);
    }

    return request.run(function(error, response){
      callback(error, response.results);
    }, this);
  }
});

EsriLeafletGeocoding.Controls.Geosearch.Providers.FeatureLayer = L.esri.Services.FeatureLayer.extend({
  options: {
    label: 'Feature Layer',
    maxResults: 5,
    bufferRadius: 1000,
    formatSuggestion: function(feature){
      return feature.properties[this.options.searchFields[0]];
    }
  },
  intialize: function(url, options){
    L.esri.Services.FeatureLayer.prototype.call(this, url, options);
    L.Util.setOptions(this, options);
    if(typeof this.options.searchFields === 'string'){
      this.options.searchFields = [this.options.searchFields];
    }
  },
  suggestions: function(text, bounds, callback){
    var query = this.query().where(this._buildQuery(text))
                            .returnGeometry(false);

    if(bounds){
      query.intersects(bounds);
    }

    if(this.options.idField){
      query.fields([this.options.idField].concat(this.options.searchFields));
    }

    var request = query.run(function(error, results, raw){
      if(error){
        callback(error, []);
      } else {
        this.options.idField = raw.objectIdFieldName;
        var suggestions = [];
        var count = Math.min(results.features.length, this.options.maxResults);
        for (var i = 0; i < count; i++) {
          var feature = results.features[i];
          suggestions.push({
            text: this.options.formatSuggestion.call(this, feature),
            magicKey: feature.id
          });
        }
        callback(error, suggestions.slice(0, this.options.maxResults).reverse());
      }
    }, this);

    return request;
  },
  results: function(text, key, bounds, callback){
    var query = this.query();

    if(key){
      query.featureIds([key]);
    } else {
      query.where(this._buildQuery(text));
    }

    if(bounds){
      query.within(bounds);
    }

    return query.run(L.Util.bind(function(error, features){
      var results = [];
      for (var i = 0; i < features.features.length; i++) {
        var feature = features.features[i];
        if(feature){
          var bounds = this._featureBounds(feature);

          var result = {
            latlng: bounds.getCenter(),
            bounds: bounds,
            text: this.options.formatSuggestion.call(this, feature),
            properties: feature.properties
          };

          results.push(result);
        }
      }
      callback(error, results);
    }, this));
  },
  _buildQuery: function(text){
    var queryString = [];

    for (var i = this.options.searchFields.length - 1; i >= 0; i--) {
      var field = this.options.searchFields[i];
      queryString.push(field + " LIKE '%" + text + "%'"); // jshint ignore:line
    }

    return queryString.join(' OR ');
  },
  _featureBounds: function(feature){
    var geojson = L.geoJson(feature);
    if(feature.geometry.type === 'Point'){
      var center = geojson.getBounds().getCenter();
      return new L. Circle(center, this.options.bufferRadius).getBounds();
    } else {
      return geojson.getBounds();
    }
  }
});

EsriLeafletGeocoding.Controls.Geosearch.Providers.GeocodeService = EsriLeafletGeocoding.Services.Geocoding.extend({
  options: {
    label: 'Geocode Server',
    maxResults: 5
  },

  suggestions: function(text, bounds, callback){
    callback(undefined, []);
    return false;
  },

  results: function(text, key, bounds, callback){
    var request = this.geocode().text(text);

    request.maxLocations(this.options.maxResults);

    if(bounds){
      request.within(bounds);
    }

    return request.run(function(error, response){
      callback(error, response.results);
    }, this);
  }
});

EsriLeafletGeocoding.Controls.Geosearch.Providers.MapService = L.esri.Services.MapService.extend({
  options: {
    layer: 0,
    label: 'Map Service',
    bufferRadius: 1000,
    maxResults: 5,
    formatSuggestion: function(feature){
      return feature.properties[this.options.searchFields[0]];
    }
  },
  initialize: function(url, options){
    L.esri.Services.MapService.prototype.initialize.call(this, url, options);
    this._getIdField();
  },
  suggestions: function(text, bounds, callback){
    var request = this.find().text(text).returnGeometry(false).layers(this.options.layer);

    if (this._idField) {
      request.fields(this.options.searchFields);
    }

    return request.run(function(error, results){
      var suggestions = [];

      if(this._idField && !error){
        var count = Math.min(this.options.maxResults, results.features.length);
        for (var i = 0; i < count; i++) {
          var feature = results.features[i];
          suggestions.push({
            text: this.options.formatSuggestion.call(this, feature),
            magicKey: feature.properties[this._idField]
          });
        }
      }

      callback(error, suggestions.reverse());
    }, this);
  },
  results: function(text, key, bounds, callback){
    var results = [];
    var request;

    if(key){
      request = this.query().layer(this.options.layer).featureIds(key);
    } else {
      request = this.find().text(text).contains(false).layers(this.options.layer);
    }

    if(this._idField){
      request.fields([this.options.searchFields, this.options._idField]);
    }

    return request.run(function(error, features){
      if(this._idField && !error){
        for (var i = 0; i < features.features.length; i++) {
          var feature = features.features[i];
          if(feature){
            var bounds = this._featureBounds(feature);
            var result = {
              latlng: bounds.getCenter(),
              bounds: bounds,
              text: this.options.formatSuggestion.call(this, feature),
              properties: feature.properties
            };
            results.push(result);
          }
        }
      }
      callback(error, results.reverse());
    }, this);
  },
  _featureBounds: function(feature){
    var geojson = L.geoJson(feature);
    if(feature.geometry.type === 'Point'){
      var center = geojson.getBounds().getCenter();
      return new L. Circle(center, this.options.bufferRadius).getBounds();
    } else {
      return geojson.getBounds();
    }
  },
  _getIdField: function(){
    this.get(this.options.layer, {}, function(error, metadata){
      for (var i = 0; i < metadata.fields.length; i++) {
        var field = metadata.fields[i];
        if(field.type === 'esriFieldTypeOID'){
          this._idField = field.name;
          this.options.searchFields.push(field.name);
          break;
        }
      }
    }, this);
  }
});

  return EsriLeafletGeocoding;
}));
