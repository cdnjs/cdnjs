/* esri-leaflet-geocoder - v2.1.0 - Fri Apr 29 2016 19:10:38 GMT-0700 (PDT)
 * Copyright (c) 2016 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet'), require('esri-leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet', 'esri-leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Geocoding = global.L.esri.Geocoding || {}),global.L,global.L.esri));
}(this, function (exports,L,esriLeaflet) { 'use strict';

	L = 'default' in L ? L['default'] : L;

	var version = "2.1.0";

	var Geocode = esriLeaflet.Task.extend({
	  path: 'find',

	  params: {
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
	    'category': 'category',
	    'token': 'token',
	    'key': 'magicKey',
	    'fields': 'outFields',
	    'forStorage': 'forStorage',
	    'maxLocations': 'maxLocations'
	  },

	  initialize: function (options) {
	    options = options || {};
	    options.url = options.url || WorldGeocodingServiceUrl;
	    esriLeaflet.Task.prototype.initialize.call(this, options);
	  },

	  within: function (bounds) {
	    bounds = L.latLngBounds(bounds);
	    this.params.bbox = esriLeaflet.Util.boundsToExtent(bounds);
	    return this;
	  },

	  nearby: function (latlng, radius) {
	    latlng = L.latLng(latlng);
	    this.params.location = latlng.lng + ',' + latlng.lat;
	    this.params.distance = Math.min(Math.max(radius, 2000), 50000);
	    return this;
	  },

	  run: function (callback, context) {
	    this.path = (this.params.text) ? 'find' : 'findAddressCandidates';

	    if (this.path === 'findAddressCandidates' && this.params.bbox) {
	      this.params.searchExtent = this.params.bbox;
	      delete this.params.bbox;
	    }

	    return this.request(function (error, response) {
	      var processor = (this.path === 'find') ? this._processFindResponse : this._processFindAddressCandidatesResponse;
	      var results = (!error) ? processor(response) : undefined;
	      callback.call(context, error, { results: results }, response);
	    }, this);
	  },

	  _processFindResponse: function (response) {
	    var results = [];

	    for (var i = 0; i < response.locations.length; i++) {
	      var location = response.locations[i];
	      var bounds;

	      if (location.extent) {
	        bounds = esriLeaflet.Util.extentToBounds(location.extent);
	      }

	      results.push({
	        text: location.name,
	        bounds: bounds,
	        score: location.feature.attributes.Score,
	        latlng: L.latLng(location.feature.geometry.y, location.feature.geometry.x),
	        properties: location.feature.attributes
	      });
	    }

	    return results;
	  },

	  _processFindAddressCandidatesResponse: function (response) {
	    var results = [];

	    for (var i = 0; i < response.candidates.length; i++) {
	      var candidate = response.candidates[i];
	      var bounds = esriLeaflet.Util.extentToBounds(candidate.extent);

	      results.push({
	        text: candidate.address,
	        bounds: bounds,
	        score: candidate.score,
	        latlng: L.latLng(candidate.location.y, candidate.location.x),
	        properties: candidate.attributes
	      });
	    }

	    return results;
	  }

	});

	function geocode (options) {
	  return new Geocode(options);
	}

	var ReverseGeocode = esriLeaflet.Task.extend({
	  path: 'reverseGeocode',

	  params: {
	    outSR: 4326,
	    returnIntersection: false
	  },

	  setters: {
	    'distance': 'distance',
	    'language': 'langCode',
	    'intersection': 'returnIntersection'
	  },

	  initialize: function (options) {
	    options = options || {};
	    options.url = options.url || WorldGeocodingServiceUrl;
	    esriLeaflet.Task.prototype.initialize.call(this, options);
	  },

	  latlng: function (latlng) {
	    latlng = L.latLng(latlng);
	    this.params.location = latlng.lng + ',' + latlng.lat;
	    return this;
	  },

	  run: function (callback, context) {
	    return this.request(function (error, response) {
	      var result;

	      if (!error) {
	        result = {
	          latlng: L.latLng(response.location.y, response.location.x),
	          address: response.address
	        };
	      } else {
	        result = undefined;
	      }

	      callback.call(context, error, result, response);
	    }, this);
	  }
	});

	function reverseGeocode (options) {
	  return new ReverseGeocode(options);
	}

	var Suggest = esriLeaflet.Task.extend({
	  path: 'suggest',

	  params: {},

	  setters: {
	    text: 'text',
	    category: 'category',
	    countries: 'countryCode'
	  },

	  initialize: function (options) {
	    options = options || {};
	    options.url = options.url || WorldGeocodingServiceUrl;
	    esriLeaflet.Task.prototype.initialize.call(this, options);
	  },

	  within: function (bounds) {
	    bounds = L.latLngBounds(bounds);
	    bounds = bounds.pad(0.5);
	    var center = bounds.getCenter();
	    var ne = bounds.getNorthWest();
	    this.params.location = center.lng + ',' + center.lat;
	    this.params.distance = Math.min(Math.max(center.distanceTo(ne), 2000), 50000);
	    this.params.searchExtent = esriLeaflet.Util.boundsToExtent(bounds);
	    return this;
	  },

	  nearby: function (latlng, radius) {
	    latlng = L.latLng(latlng);
	    this.params.location = latlng.lng + ',' + latlng.lat;
	    this.params.distance = Math.min(Math.max(radius, 2000), 50000);
	    return this;
	  },

	  run: function (callback, context) {
	    return this.request(function (error, response) {
	      callback.call(context, error, response, response);
	    }, this);
	  }

	});

	function suggest (options) {
	  return new Suggest(options);
	}

	var GeocodeService = esriLeaflet.Service.extend({
	  initialize: function (options) {
	    options = options || {};
	    options.url = options.url || WorldGeocodingServiceUrl;
	    esriLeaflet.Service.prototype.initialize.call(this, options);
	    this._confirmSuggestSupport();
	  },

	  geocode: function () {
	    return geocode(this);
	  },

	  reverse: function () {
	    return reverseGeocode(this);
	  },

	  suggest: function () {
	    // requires either the Esri World Geocoding Service or a 10.3 ArcGIS Server Geocoding Service that supports suggest.
	    return suggest(this);
	  },

	  _confirmSuggestSupport: function () {
	    this.metadata(function (error, response) {
	      if (error) { return; }
	      if (response.capabilities.indexOf('Suggest') > -1) {
	        this.options.supportsSuggest = true;
	      } else {
	        this.options.supportsSuggest = false;
	      }
	    }, this);
	  }
	});

	function geocodeService (options) {
	  return new GeocodeService(options);
	}

	var GeosearchCore = L.Evented.extend({

	  options: {
	    zoomToResult: true,
	    useMapBounds: 12,
	    searchBounds: null
	  },

	  initialize: function (control, options) {
	    L.Util.setOptions(this, options);
	    this._control = control;

	    if (!options || !options.providers || !options.providers.length) {
	      throw new Error('You must specify at least one provider');
	    }

	    this._providers = options.providers;
	  },

	  _geocode: function (text, key, provider) {
	    var activeRequests = 0;
	    var allResults = [];
	    var bounds;

	    var callback = L.Util.bind(function (error, results) {
	      activeRequests--;
	      if (error) {
	        return;
	      }

	      if (results) {
	        allResults = allResults.concat(results);
	      }

	      if (activeRequests <= 0) {
	        bounds = this._boundsFromResults(allResults);

	        this.fire('results', {
	          results: allResults,
	          bounds: bounds,
	          latlng: (bounds) ? bounds.getCenter() : undefined,
	          text: text
	        }, true);

	        if (this.options.zoomToResult && bounds) {
	          this._control._map.fitBounds(bounds);
	        }

	        this.fire('load');
	      }
	    }, this);

	    if (key) {
	      activeRequests++;
	      provider.results(text, key, this._searchBounds(), callback);
	    } else {
	      for (var i = 0; i < this._providers.length; i++) {
	        activeRequests++;
	        this._providers[i].results(text, key, this._searchBounds(), callback);
	      }
	    }
	  },

	  _suggest: function (text) {
	    var activeRequests = this._providers.length;

	    var createCallback = L.Util.bind(function (text, provider) {
	      return L.Util.bind(function (error, suggestions) {
	        if (error) { return; }

	        var i;

	        activeRequests = activeRequests - 1;

	        if (text.length < 2) {
	          this._suggestions.innerHTML = '';
	          this._suggestions.style.display = 'none';
	          return;
	        }

	        if (suggestions) {
	          for (i = 0; i < suggestions.length; i++) {
	            suggestions[i].provider = provider;
	          }
	        }

	        if (provider._lastRender !== text && provider.nodes) {
	          for (i = 0; i < provider.nodes.length; i++) {
	            if (provider.nodes[i].parentElement) {
	              this._control._suggestions.removeChild(provider.nodes[i]);
	            }
	          }

	          provider.nodes = [];
	        }

	        if (suggestions.length && this._control._input.value === text) {
	          this._control.clearSuggestions(provider.nodes);

	          provider._lastRender = text;
	          provider.nodes = this._control._renderSuggestions(suggestions);
	          this._control._nodes = [];
	        }
	      }, this);
	    }, this);

	    this._pendingSuggestions = [];

	    for (var i = 0; i < this._providers.length; i++) {
	      var provider = this._providers[i];
	      var request = provider.suggestions(text, this._searchBounds(), createCallback(text, provider));
	      this._pendingSuggestions.push(request);
	    }
	  },

	  _searchBounds: function () {
	    if (this.options.searchBounds !== null) {
	      return this.options.searchBounds;
	    }

	    if (this.options.useMapBounds === false) {
	      return null;
	    }

	    if (this.options.useMapBounds === true) {
	      return this._control._map.getBounds();
	    }

	    if (this.options.useMapBounds <= this._control._map.getZoom()) {
	      return this._control._map.getBounds();
	    }

	    return null;
	  },

	  _boundsFromResults: function (results) {
	    if (!results.length) {
	      return;
	    }

	    var nullIsland = L.latLngBounds([0, 0], [0, 0]);
	    var resultBounds = [];
	    var resultLatlngs = [];

	    // collect the bounds and center of each result
	    for (var i = results.length - 1; i >= 0; i--) {
	      var result = results[i];

	      resultLatlngs.push(result.latlng);

	      // make sure bounds are valid and not 0,0. sometimes bounds are incorrect or not present
	      if (result.bounds && result.bounds.isValid() && !result.bounds.equals(nullIsland)) {
	        resultBounds.push(result.bounds);
	      }
	    }

	    // form a bounds object containing all center points
	    var bounds = L.latLngBounds(resultLatlngs);

	    // and extend it to contain all bounds objects
	    for (var j = 0; j < resultBounds.length; j++) {
	      bounds.extend(resultBounds[j]);
	    }

	    return bounds;
	  },

	  _getAttribution: function () {
	    var attribs = [];
	    var providers = this._providers;

	    for (var i = 0; i < providers.length; i++) {
	      if (providers[i].options.attribution) {
	        attribs.push(providers[i].options.attribution);
	      }
	    }

	    return attribs.join(', ');
	  }

	});

	function geosearchCore (control, options) {
	  return new GeosearchCore(control, options);
	}

	var Geosearch = L.Control.extend({
	  includes: L.Mixin.Events,

	  options: {
	    position: 'topleft',
	    collapseAfterResult: true,
	    expanded: false,
	    allowMultipleResults: true,
	    placeholder: 'Search for places or addresses',
	    title: 'Location Search'
	  },

	  initialize: function (options) {
	    L.Util.setOptions(this, options);

	    if (!options || !options.providers || !options.providers.length) {
	      throw new Error('You must specify at least one provider');
	    }

	    // instantiate the underlying class and pass along options
	    this._geosearchCore = geosearchCore(this, options);
	    this._geosearchCore._providers = options.providers;

	    // bubble each providers events to the control
	    this._geosearchCore.addEventParent(this);
	    for (var i = 0; i < this._geosearchCore._providers.length; i++) {
	      this._geosearchCore._providers[i].addEventParent(this);
	    }

	    this._geosearchCore._pendingSuggestions = [];

	    L.Control.prototype.initialize.call(options);
	  },

	  _renderSuggestions: function (suggestions) {
	    var currentGroup;
	    this._suggestions.style.display = 'block';

	    // set the maxHeight of the suggestions box to
	    // map height
	    // - suggestions offset (distance from top of suggestions to top of control)
	    // - control offset (distance from top of control to top of map)
	    // - 10 (extra padding)
	    this._suggestions.style.maxHeight = (this._map.getSize().y - this._suggestions.offsetTop - this._wrapper.offsetTop - 10) + 'px';

	    var nodes = [];
	    var list;
	    var header;

	    for (var i = 0; i < suggestions.length; i++) {
	      var suggestion = suggestions[i];
	      if (!header && this._geosearchCore._providers.length > 1 && currentGroup !== suggestion.provider.options.label) {
	        header = L.DomUtil.create('span', 'geocoder-control-header', this._suggestions);
	        header.textContent = suggestion.provider.options.label;
	        header.innerText = suggestion.provider.options.label;
	        currentGroup = suggestion.provider.options.label;
	        nodes.push(header);
	      }

	      if (!list) {
	        list = L.DomUtil.create('ul', 'geocoder-control-list', this._suggestions);
	      }

	      var suggestionItem = L.DomUtil.create('li', 'geocoder-control-suggestion', list);

	      suggestionItem.innerHTML = suggestion.text;
	      suggestionItem.provider = suggestion.provider;
	      suggestionItem['data-magic-key'] = suggestion.magicKey;
	    }

	    L.DomUtil.removeClass(this._input, 'geocoder-control-loading');

	    nodes.push(list);

	    return nodes;
	  },

	  _boundsFromResults: function (results) {
	    if (!results.length) {
	      return;
	    }

	    var nullIsland = L.latLngBounds([0, 0], [0, 0]);
	    var resultBounds = [];
	    var resultLatlngs = [];

	    // collect the bounds and center of each result
	    for (var i = results.length - 1; i >= 0; i--) {
	      var result = results[i];

	      resultLatlngs.push(result.latlng);

	      // make sure bounds are valid and not 0,0. sometimes bounds are incorrect or not present
	      if (result.bounds && result.bounds.isValid() && !result.bounds.equals(nullIsland)) {
	        resultBounds.push(result.bounds);
	      }
	    }

	    // form a bounds object containing all center points
	    var bounds = L.latLngBounds(resultLatlngs);

	    // and extend it to contain all bounds objects
	    for (var j = 0; j < resultBounds.length; j++) {
	      bounds.extend(resultBounds[j]);
	    }

	    return bounds;
	  },

	  clear: function () {
	    this._suggestions.innerHTML = '';
	    this._suggestions.style.display = 'none';
	    this._input.value = '';

	    if (this.options.collapseAfterResult) {
	      this._input.placeholder = '';
	      L.DomUtil.removeClass(this._wrapper, 'geocoder-control-expanded');
	    }

	    if (!this._map.scrollWheelZoom.enabled() && this._map.options.scrollWheelZoom) {
	      this._map.scrollWheelZoom.enable();
	    }
	  },

	  clearSuggestions: function () {
	    if (this._nodes) {
	      for (var k = 0; k < this._nodes.length; k++) {
	        if (this._nodes[k].parentElement) {
	          this._suggestions.removeChild(this._nodes[k]);
	        }
	      }
	    }
	  },

	  _setupClick: function () {
	    L.DomUtil.addClass(this._wrapper, 'geocoder-control-expanded');
	    this._input.focus();
	  },

	  disable: function () {
	    this._input.disabled = true;
	    L.DomUtil.addClass(this._input, 'geocoder-control-input-disabled');
	    L.DomEvent.removeListener(this._wrapper, 'click', this._setupClick, this);
	  },

	  enable: function () {
	    this._input.disabled = false;
	    L.DomUtil.removeClass(this._input, 'geocoder-control-input-disabled');
	    L.DomEvent.addListener(this._wrapper, 'click', this._setupClick, this);
	  },

	  getAttribution: function () {
	    var attribs = [];

	    for (var i = 0; i < this._providers.length; i++) {
	      if (this._providers[i].options.attribution) {
	        attribs.push(this._providers[i].options.attribution);
	      }
	    }

	    return attribs.join(', ');
	  },

	  onAdd: function (map) {
	    this._map = map;
	    this._wrapper = L.DomUtil.create('div', 'geocoder-control ' + ((this.options.expanded) ? ' ' + 'geocoder-control-expanded' : ''));
	    this._input = L.DomUtil.create('input', 'geocoder-control-input leaflet-bar', this._wrapper);
	    this._input.title = this.options.title;

	    this._suggestions = L.DomUtil.create('div', 'geocoder-control-suggestions leaflet-bar', this._wrapper);

	    var credits = this._geosearchCore._getAttribution();
	    map.attributionControl.addAttribution(credits);

	    L.DomEvent.addListener(this._input, 'focus', function (e) {
	      this._input.placeholder = this.options.placeholder;
	      L.DomUtil.addClass(this._wrapper, 'geocoder-control-expanded');
	    }, this);

	    L.DomEvent.addListener(this._wrapper, 'click', this._setupClick, this);

	    L.DomEvent.addListener(this._suggestions, 'mousedown', function (e) {
	      var suggestionItem = e.target || e.srcElement;
	      this._geosearchCore._geocode(suggestionItem.innerHTML, suggestionItem['data-magic-key'], suggestionItem.provider);
	      this.clear();
	    }, this);

	    L.DomEvent.addListener(this._input, 'blur', function (e) {
	      this.clear();
	    }, this);

	    L.DomEvent.addListener(this._input, 'keydown', function (e) {
	      L.DomUtil.addClass(this._wrapper, 'geocoder-control-expanded');

	      var list = this._suggestions.querySelectorAll('.' + 'geocoder-control-suggestion');
	      var selected = this._suggestions.querySelectorAll('.' + 'geocoder-control-selected')[0];
	      var selectedPosition;

	      for (var i = 0; i < list.length; i++) {
	        if (list[i] === selected) {
	          selectedPosition = i;
	          break;
	        }
	      }

	      switch (e.keyCode) {
	        case 13:
	          if (selected) {
	            this._geosearchCore._geocode(selected.innerHTML, selected['data-magic-key'], selected.provider);
	            this.clear();
	          } else if (this.options.allowMultipleResults) {
	            this._geosearchCore._geocode(this._input.value, undefined);
	            this.clear();
	          } else {
	            L.DomUtil.addClass(list[0], 'geocoder-control-selected');
	          }
	          L.DomEvent.preventDefault(e);
	          break;
	        case 38:
	          if (selected) {
	            L.DomUtil.removeClass(selected, 'geocoder-control-selected');
	          }

	          var previousItem = list[selectedPosition - 1];

	          if (selected && previousItem) {
	            L.DomUtil.addClass(previousItem, 'geocoder-control-selected');
	          } else {
	            L.DomUtil.addClass(list[list.length - 1], 'geocoder-control-selected');
	          }
	          L.DomEvent.preventDefault(e);
	          break;
	        case 40:
	          if (selected) {
	            L.DomUtil.removeClass(selected, 'geocoder-control-selected');
	          }

	          var nextItem = list[selectedPosition + 1];

	          if (selected && nextItem) {
	            L.DomUtil.addClass(nextItem, 'geocoder-control-selected');
	          } else {
	            L.DomUtil.addClass(list[0], 'geocoder-control-selected');
	          }
	          L.DomEvent.preventDefault(e);
	          break;
	        default:
	          // when the input changes we should cancel all pending suggestion requests if possible to avoid result collisions
	          for (var x = 0; x < this._geosearchCore._pendingSuggestions.length; x++) {
	            var request = this._geosearchCore._pendingSuggestions[x];
	            if (request && request.abort && !request.id) {
	              request.abort();
	            }
	          }
	          break;
	      }
	    }, this);

	    L.DomEvent.addListener(this._input, 'keyup', L.Util.throttle(function (e) {
	      var key = e.which || e.keyCode;
	      var text = (e.target || e.srcElement).value;

	      // require at least 2 characters for suggestions
	      if (text.length < 2) {
	        this._suggestions.innerHTML = '';
	        this._suggestions.style.display = 'none';
	        L.DomUtil.removeClass(this._input, 'geocoder-control-loading');
	        return;
	      }

	      // if this is the escape key it will clear the input so clear suggestions
	      if (key === 27) {
	        this._suggestions.innerHTML = '';
	        this._suggestions.style.display = 'none';
	        return;
	      }

	      // if this is NOT the up/down arrows or enter make a suggestion
	      if (key !== 13 && key !== 38 && key !== 40) {
	        if (this._input.value !== this._lastValue) {
	          this._lastValue = this._input.value;
	          L.DomUtil.addClass(this._input, 'geocoder-control-loading');
	          this._geosearchCore._suggest(text);
	        }
	      }
	    }, 50, this), this);

	    L.DomEvent.disableClickPropagation(this._wrapper);

	    // when mouse moves over suggestions disable scroll wheel zoom if its enabled
	    L.DomEvent.addListener(this._suggestions, 'mouseover', function (e) {
	      if (map.scrollWheelZoom.enabled() && map.options.scrollWheelZoom) {
	        map.scrollWheelZoom.disable();
	      }
	    });

	    // when mouse moves leaves suggestions enable scroll wheel zoom if its disabled
	    L.DomEvent.addListener(this._suggestions, 'mouseout', function (e) {
	      if (!map.scrollWheelZoom.enabled() && map.options.scrollWheelZoom) {
	        map.scrollWheelZoom.enable();
	      }
	    });

	    this._geosearchCore.on('load', function (e) {
	      L.DomUtil.removeClass(this._input, 'geocoder-control-loading');
	      this.clear();
	      this._input.blur();
	    }, this);

	    return this._wrapper;
	  },

	  onRemove: function (map) {
	    map.attributionControl.removeAttribution('Geocoding by Esri');
	  }
	});

	function geosearch (options) {
	  return new Geosearch(options);
	}

	var ArcgisOnlineProvider = GeocodeService.extend({
	  options: {
	    label: 'Places and Addresses',
	    maxResults: 5,
	    attribution: '<a href="https://developers.arcgis.com/en/features/geocoding/">Geocoding by Esri</a>'
	  },

	  suggestions: function (text, bounds, callback) {
	    var request = this.suggest().text(text);

	    if (bounds) {
	      request.within(bounds);
	    }

	    if (this.options.countries) {
	      request.countries(this.options.countries);
	    }

	    if (this.options.categories) {
	      request.category(this.options.categories);
	    }

	    return request.run(function (error, results, response) {
	      var suggestions = [];
	      if (!error) {
	        while (response.suggestions.length && suggestions.length <= (this.options.maxResults - 1)) {
	          var suggestion = response.suggestions.shift();
	          if (!suggestion.isCollection) {
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

	  results: function (text, key, bounds, callback) {
	    var request = this.geocode().text(text);

	    if (key) {
	      request.key(key);
	    } else {
	      request.maxLocations(this.options.maxResults);
	    }

	    if (bounds) {
	      request.within(bounds);
	    }

	    if (this.options.forStorage) {
	      request.forStorage(true);
	    }

	    return request.run(function (error, response) {
	      callback(error, response.results);
	    }, this);
	  }
	});

	function arcgisOnlineProvider (options) {
	  return new ArcgisOnlineProvider(options);
	}

	var FeatureLayerProvider = esriLeaflet.FeatureLayerService.extend({
	  options: {
	    label: 'Feature Layer',
	    maxResults: 5,
	    bufferRadius: 1000,
	    formatSuggestion: function (feature) {
	      return feature.properties[this.options.searchFields[0]];
	    }
	  },

	  initialize: function (options) {
	    esriLeaflet.FeatureLayerService.prototype.initialize.call(this, options);
	    if (typeof this.options.searchFields === 'string') {
	      this.options.searchFields = [this.options.searchFields];
	    }
	  },

	  suggestions: function (text, bounds, callback) {
	    var query = this.query().where(this._buildQuery(text))
	      .returnGeometry(false);

	    if (bounds) {
	      query.intersects(bounds);
	    }

	    if (this.options.idField) {
	      query.fields([this.options.idField].concat(this.options.searchFields));
	    }

	    var request = query.run(function (error, results, raw) {
	      if (error) {
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

	  results: function (text, key, bounds, callback) {
	    var query = this.query();

	    if (key) {
	      query.featureIds([key]);
	    } else {
	      query.where(this._buildQuery(text));
	    }

	    if (bounds) {
	      query.within(bounds);
	    }

	    return query.run(L.Util.bind(function (error, features) {
	      var results = [];
	      for (var i = 0; i < features.features.length; i++) {
	        var feature = features.features[i];
	        if (feature) {
	          var bounds = this._featureBounds(feature);

	          var result = {
	            latlng: bounds.getCenter(),
	            bounds: bounds,
	            text: this.options.formatSuggestion.call(this, feature),
	            properties: feature.properties,
	            geojson: feature
	          };

	          results.push(result);
	        }
	      }
	      callback(error, results);
	    }, this));
	  },

	  _buildQuery: function (text) {
	    var queryString = [];

	    for (var i = this.options.searchFields.length - 1; i >= 0; i--) {
	      var field = 'upper("' + this.options.searchFields[i] + '")';

	      queryString.push(field + " LIKE upper('%" + text + "%')");
	    }

	    return queryString.join(' OR ');
	  },

	  _featureBounds: function (feature) {
	    var geojson = L.geoJson(feature);
	    if (feature.geometry.type === 'Point') {
	      var center = geojson.getBounds().getCenter();
	      var lngRadius = ((this.options.bufferRadius / 40075017) * 360) / Math.cos((180 / Math.PI) * center.lat);
	      var latRadius = (this.options.bufferRadius / 40075017) * 360;
	      return L.latLngBounds([center.lat - latRadius, center.lng - lngRadius], [center.lat + latRadius, center.lng + lngRadius]);
	    } else {
	      return geojson.getBounds();
	    }
	  }
	});

	function featureLayerProvider (options) {
	  return new FeatureLayerProvider(options);
	}

	var MapServiceProvider = esriLeaflet.MapService.extend({
	  options: {
	    layers: [0],
	    label: 'Map Service',
	    bufferRadius: 1000,
	    maxResults: 5,
	    formatSuggestion: function (feature) {
	      return feature.properties[feature.displayFieldName] + ' <small>' + feature.layerName + '</small>';
	    }
	  },

	  initialize: function (options) {
	    esriLeaflet.MapService.prototype.initialize.call(this, options);
	    this._getIdFields();
	  },

	  suggestions: function (text, bounds, callback) {
	    var request = this.find().text(text).fields(this.options.searchFields).returnGeometry(false).layers(this.options.layers);

	    return request.run(function (error, results, raw) {
	      var suggestions = [];
	      if (!error) {
	        var count = Math.min(this.options.maxResults, results.features.length);
	        raw.results = raw.results.reverse();
	        for (var i = 0; i < count; i++) {
	          var feature = results.features[i];
	          var result = raw.results[i];
	          var layer = result.layerId;
	          var idField = this._idFields[layer];
	          feature.layerId = layer;
	          feature.layerName = this._layerNames[layer];
	          feature.displayFieldName = this._displayFields[layer];
	          if (idField) {
	            suggestions.push({
	              text: this.options.formatSuggestion.call(this, feature),
	              magicKey: result.attributes[idField] + ':' + layer
	            });
	          }
	        }
	      }
	      callback(error, suggestions.reverse());
	    }, this);
	  },

	  results: function (text, key, bounds, callback) {
	    var results = [];
	    var request;

	    if (key) {
	      var featureId = key.split(':')[0];
	      var layer = key.split(':')[1];
	      request = this.query().layer(layer).featureIds(featureId);
	    } else {
	      request = this.find().text(text).fields(this.options.searchFields).contains(false).layers(this.options.layers);
	    }

	    return request.run(function (error, features, response) {
	      if (!error) {
	        if (response.results) {
	          response.results = response.results.reverse();
	        }
	        for (var i = 0; i < features.features.length; i++) {
	          var feature = features.features[i];
	          layer = layer || response.results[i].layerId;

	          if (feature && layer !== undefined) {
	            var bounds = this._featureBounds(feature);
	            feature.layerId = layer;
	            feature.layerName = this._layerNames[layer];
	            feature.displayFieldName = this._displayFields[layer];

	            var result = {
	              latlng: bounds.getCenter(),
	              bounds: bounds,
	              text: this.options.formatSuggestion.call(this, feature),
	              properties: feature.properties,
	              geojson: feature
	            };

	            results.push(result);
	          }
	        }
	      }
	      callback(error, results.reverse());
	    }, this);
	  },

	  _featureBounds: function (feature) {
	    var geojson = L.geoJson(feature);
	    if (feature.geometry.type === 'Point') {
	      var center = geojson.getBounds().getCenter();
	      var lngRadius = ((this.options.bufferRadius / 40075017) * 360) / Math.cos((180 / Math.PI) * center.lat);
	      var latRadius = (this.options.bufferRadius / 40075017) * 360;
	      return L.latLngBounds([center.lat - latRadius, center.lng - lngRadius], [center.lat + latRadius, center.lng + lngRadius]);
	    } else {
	      return geojson.getBounds();
	    }
	  },

	  _layerMetadataCallback: function (layerid) {
	    return L.Util.bind(function (error, metadata) {
	      if (error) { return; }
	      this._displayFields[layerid] = metadata.displayField;
	      this._layerNames[layerid] = metadata.name;
	      for (var i = 0; i < metadata.fields.length; i++) {
	        var field = metadata.fields[i];
	        if (field.type === 'esriFieldTypeOID') {
	          this._idFields[layerid] = field.name;
	          break;
	        }
	      }
	    }, this);
	  },

	  _getIdFields: function () {
	    this._idFields = {};
	    this._displayFields = {};
	    this._layerNames = {};
	    for (var i = 0; i < this.options.layers.length; i++) {
	      var layer = this.options.layers[i];
	      this.get(layer, {}, this._layerMetadataCallback(layer));
	    }
	  }
	});

	function mapServiceProvider (options) {
	  return new MapServiceProvider(options);
	}

	var GeocodeServiceProvider = GeocodeService.extend({
	  options: {
	    label: 'Geocode Server',
	    maxResults: 5
	  },

	  suggestions: function (text, bounds, callback) {
	    if (this.options.supportsSuggest) {
	      var request = this.suggest().text(text);
	      if (bounds) {
	        request.within(bounds);
	      }

	      return request.run(function (error, results, response) {
	        var suggestions = [];
	        if (!error) {
	          while (response.suggestions.length && suggestions.length <= (this.options.maxResults - 1)) {
	            var suggestion = response.suggestions.shift();
	            if (!suggestion.isCollection) {
	              suggestions.push({
	                text: suggestion.text,
	                magicKey: suggestion.magicKey
	              });
	            }
	          }
	        }
	        callback(error, suggestions);
	      }, this);
	    } else {
	      callback(undefined, []);
	      return false;
	    }
	  },

	  results: function (text, key, bounds, callback) {
	    var request = this.geocode().text(text);

	    request.maxLocations(this.options.maxResults);

	    if (bounds) {
	      request.within(bounds);
	    }

	    return request.run(function (error, response) {
	      callback(error, response.results);
	    }, this);
	  }
	});

	function geocodeServiceProvider (options) {
	  return new GeocodeServiceProvider(options);
	}

	var WorldGeocodingServiceUrl = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/';

	exports.WorldGeocodingServiceUrl = WorldGeocodingServiceUrl;
	exports.VERSION = version;
	exports.Geocode = Geocode;
	exports.geocode = geocode;
	exports.ReverseGeocode = ReverseGeocode;
	exports.reverseGeocode = reverseGeocode;
	exports.Suggest = Suggest;
	exports.suggest = suggest;
	exports.GeocodeService = GeocodeService;
	exports.geocodeService = geocodeService;
	exports.Geosearch = Geosearch;
	exports.geosearch = geosearch;
	exports.GeosearchCore = GeosearchCore;
	exports.geosearchCore = geosearchCore;
	exports.ArcgisOnlineProvider = ArcgisOnlineProvider;
	exports.arcgisOnlineProvider = arcgisOnlineProvider;
	exports.FeatureLayerProvider = FeatureLayerProvider;
	exports.featureLayerProvider = featureLayerProvider;
	exports.MapServiceProvider = MapServiceProvider;
	exports.mapServiceProvider = mapServiceProvider;
	exports.GeocodeServiceProvider = GeocodeServiceProvider;
	exports.geocodeServiceProvider = geocodeServiceProvider;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvVGFza3MvR2VvY29kZS5qcyIsIi4uL3NyYy9UYXNrcy9SZXZlcnNlR2VvY29kZS5qcyIsIi4uL3NyYy9UYXNrcy9TdWdnZXN0LmpzIiwiLi4vc3JjL1NlcnZpY2VzL0dlb2NvZGUuanMiLCIuLi9zcmMvQ2xhc3Nlcy9HZW9zZWFyY2hDb3JlLmpzIiwiLi4vc3JjL0NvbnRyb2xzL0dlb3NlYXJjaC5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvQXJjZ2lzT25saW5lR2VvY29kZXIuanMiLCIuLi9zcmMvUHJvdmlkZXJzL0ZlYXR1cmVMYXllci5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvTWFwU2VydmljZS5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvR2VvY29kZVNlcnZpY2UuanMiLCIuLi9zcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXQtZ2VvY29kZXJcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkVzcmkgR2VvY29kaW5nIHV0aWxpdGllcyBhbmQgc2VhcmNoIHBsZ3VpbiBmb3IgTGVhZmxldC5cIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMi4xLjBcIixcbiAgXCJhdXRob3JcIjogXCJQYXRyaWNrIEFybHQgPHBhcmx0QGVzcmkuY29tPiAoaHR0cDovL3BhdHJpY2thcmx0LmNvbSlcIixcbiAgXCJjb250cmlidXRvcnNcIjogW1xuICAgIFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gICAgXCJKb2huIEdyYXZvaXMgPGpncmF2b2lzQGVzcmkuY29tPiAoaHR0cDovL2pvaG5ncmF2b2lzLmNvbSlcIlxuICBdLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJlc3JpLWxlYWZsZXRcIjogXCJeMi4wLjBcIixcbiAgICBcImxlYWZsZXRcIjogXCJeMS4wLjAtcmMuMVwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYWlcIjogXCIyLjMuMFwiLFxuICAgIFwiZ2gtcmVsZWFzZVwiOiBcIl4yLjAuMFwiLFxuICAgIFwiaHR0cC1zZXJ2ZXJcIjogXCJeMC44LjVcIixcbiAgICBcImltYWdlbWluXCI6IFwiXjMuMi4wXCIsXG4gICAgXCJpc3BhcnRhXCI6IFwiXjMuMC4zXCIsXG4gICAgXCJpc3RhbmJ1bFwiOiBcIl4wLjQuMlwiLFxuICAgIFwia2FybWFcIjogXCJeMC4xMi4yNFwiLFxuICAgIFwia2FybWEtY2hhaS1zaW5vblwiOiBcIl4wLjEuM1wiLFxuICAgIFwia2FybWEtY292ZXJhZ2VcIjogXCJeMC41LjNcIixcbiAgICBcImthcm1hLW1vY2hhXCI6IFwiXjAuMS4wXCIsXG4gICAgXCJrYXJtYS1tb2NoYS1yZXBvcnRlclwiOiBcIl4wLjIuNVwiLFxuICAgIFwia2FybWEtcGhhbnRvbWpzLWxhdW5jaGVyXCI6IFwiXjAuMi4wXCIsXG4gICAgXCJrYXJtYS1zb3VyY2VtYXAtbG9hZGVyXCI6IFwiXjAuMy41XCIsXG4gICAgXCJta2RpcnBcIjogXCJeMC41LjFcIixcbiAgICBcIm1vY2hhXCI6IFwiXjIuMy40XCIsXG4gICAgXCJub2RlLXNhc3NcIjogXCJeMy4yLjBcIixcbiAgICBcInBoYW50b21qc1wiOiBcIl4xLjkuMTdcIixcbiAgICBcInJvbGx1cFwiOiBcIl4wLjI1LjRcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tanNvblwiOiBcIl4yLjAuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1ub2RlLXJlc29sdmVcIjogXCJeMS40LjBcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tdWdsaWZ5XCI6IFwiXjAuMy4xXCIsXG4gICAgXCJzZW1pc3RhbmRhcmRcIjogXCJeNy4wLjVcIixcbiAgICBcInNpbm9uXCI6IFwiXjEuMTEuMVwiLFxuICAgIFwic2lub24tY2hhaVwiOiBcIjIuNy4wXCIsXG4gICAgXCJ1Z2xpZnktanNcIjogXCJeMi42LjFcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvZXNyaS1sZWFmbGV0LWdlb2NvZGVyXCIsXG4gIFwianNuZXh0Om1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanNcIixcbiAgXCJqc3BtXCI6IHtcbiAgICBcInJlZ2lzdHJ5XCI6IFwibnBtXCIsXG4gICAgXCJmb3JtYXRcIjogXCJlczZcIixcbiAgICBcIm1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanNcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJBcGFjaGUtMi4wXCIsXG4gIFwibWFpblwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzXCIsXG4gIFwiYnJvd3NlclwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzXCIsXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdEBnaXRodWIuY29tOkVzcmkvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLmdpdFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJwcmVidWlsZFwiOiBcIm1rZGlycCBkaXN0XCIsXG4gICAgXCJidWlsZFwiOiBcInJvbGx1cCAtYyBwcm9maWxlcy9kZWJ1Zy5qcyAmIHJvbGx1cCAtYyBwcm9maWxlcy9wcm9kdWN0aW9uLmpzICYgbnBtIHJ1biBjc3MgJiBucG0gcnVuIGltZ1wiLFxuICAgIFwiY3NzXCI6IFwibm9kZS1zYXNzIC4vc3JjL2VzcmktbGVhZmxldC1nZW9jb2Rlci5jc3MgLi9kaXN0L2VzcmktbGVhZmxldC1nZW9jb2Rlci5jc3MgLS1vdXRwdXQtc3R5bGUgY29tcHJlc3NlZFwiLFxuICAgIFwiaW1nXCI6IFwiaW1hZ2VtaW4gLi9zcmMvaW1nIC4vZGlzdC9pbWdcIixcbiAgICBcImxpbnRcIjogXCJzZW1pc3RhbmRhcmQgc3JjLyoqLyouanNcIixcbiAgICBcInByZXB1Ymxpc2hcIjogXCJucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV0ZXN0XCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIi4vc2NyaXB0cy9yZWxlYXNlLnNoXCIsXG4gICAgXCJzdGFydFwiOiBcIm5vZGVtb24gLS13YXRjaCBzcmMgLS1leGVjICducG0gcnVuIGJ1aWxkJyAmIGh0dHAtc2VydmVyIC1wIDU2NzggLWMtMSAtb1wiLFxuICAgIFwidGVzdFwiOiBcIm5wbSBydW4gbGludCAmJiBrYXJtYSBzdGFydFwiXG4gIH0sXG4gIFwic3R5bGVcIjogXCIuL2Rpc3QvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLmNzc1wiXG59XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFRhc2ssIFV0aWwgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuaW1wb3J0IHsgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsIH0gZnJvbSAnLi4vRXNyaUxlYWZsZXRHZW9jb2RpbmcnO1xuXG5leHBvcnQgdmFyIEdlb2NvZGUgPSBUYXNrLmV4dGVuZCh7XG4gIHBhdGg6ICdmaW5kJyxcblxuICBwYXJhbXM6IHtcbiAgICBvdXRTcjogNDMyNixcbiAgICBmb3JTdG9yYWdlOiBmYWxzZSxcbiAgICBvdXRGaWVsZHM6ICcqJyxcbiAgICBtYXhMb2NhdGlvbnM6IDIwXG4gIH0sXG5cbiAgc2V0dGVyczoge1xuICAgICdhZGRyZXNzJzogJ2FkZHJlc3MnLFxuICAgICduZWlnaGJvcmhvb2QnOiAnbmVpZ2hib3Job29kJyxcbiAgICAnY2l0eSc6ICdjaXR5JyxcbiAgICAnc3VicmVnaW9uJzogJ3N1YnJlZ2lvbicsXG4gICAgJ3JlZ2lvbic6ICdyZWdpb24nLFxuICAgICdwb3N0YWwnOiAncG9zdGFsJyxcbiAgICAnY291bnRyeSc6ICdjb3VudHJ5JyxcbiAgICAndGV4dCc6ICd0ZXh0JyxcbiAgICAnY2F0ZWdvcnknOiAnY2F0ZWdvcnknLFxuICAgICd0b2tlbic6ICd0b2tlbicsXG4gICAgJ2tleSc6ICdtYWdpY0tleScsXG4gICAgJ2ZpZWxkcyc6ICdvdXRGaWVsZHMnLFxuICAgICdmb3JTdG9yYWdlJzogJ2ZvclN0b3JhZ2UnLFxuICAgICdtYXhMb2NhdGlvbnMnOiAnbWF4TG9jYXRpb25zJ1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy51cmwgPSBvcHRpb25zLnVybCB8fCBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmw7XG4gICAgVGFzay5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIHdpdGhpbjogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKGJvdW5kcyk7XG4gICAgdGhpcy5wYXJhbXMuYmJveCA9IFV0aWwuYm91bmRzVG9FeHRlbnQoYm91bmRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBuZWFyYnk6IGZ1bmN0aW9uIChsYXRsbmcsIHJhZGl1cykge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMubG9jYXRpb24gPSBsYXRsbmcubG5nICsgJywnICsgbGF0bG5nLmxhdDtcbiAgICB0aGlzLnBhcmFtcy5kaXN0YW5jZSA9IE1hdGgubWluKE1hdGgubWF4KHJhZGl1cywgMjAwMCksIDUwMDAwKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMucGF0aCA9ICh0aGlzLnBhcmFtcy50ZXh0KSA/ICdmaW5kJyA6ICdmaW5kQWRkcmVzc0NhbmRpZGF0ZXMnO1xuXG4gICAgaWYgKHRoaXMucGF0aCA9PT0gJ2ZpbmRBZGRyZXNzQ2FuZGlkYXRlcycgJiYgdGhpcy5wYXJhbXMuYmJveCkge1xuICAgICAgdGhpcy5wYXJhbXMuc2VhcmNoRXh0ZW50ID0gdGhpcy5wYXJhbXMuYmJveDtcbiAgICAgIGRlbGV0ZSB0aGlzLnBhcmFtcy5iYm94O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgdmFyIHByb2Nlc3NvciA9ICh0aGlzLnBhdGggPT09ICdmaW5kJykgPyB0aGlzLl9wcm9jZXNzRmluZFJlc3BvbnNlIDogdGhpcy5fcHJvY2Vzc0ZpbmRBZGRyZXNzQ2FuZGlkYXRlc1Jlc3BvbnNlO1xuICAgICAgdmFyIHJlc3VsdHMgPSAoIWVycm9yKSA/IHByb2Nlc3NvcihyZXNwb25zZSkgOiB1bmRlZmluZWQ7XG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCB7IHJlc3VsdHM6IHJlc3VsdHMgfSwgcmVzcG9uc2UpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIF9wcm9jZXNzRmluZFJlc3BvbnNlOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5sb2NhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsb2NhdGlvbiA9IHJlc3BvbnNlLmxvY2F0aW9uc1tpXTtcbiAgICAgIHZhciBib3VuZHM7XG5cbiAgICAgIGlmIChsb2NhdGlvbi5leHRlbnQpIHtcbiAgICAgICAgYm91bmRzID0gVXRpbC5leHRlbnRUb0JvdW5kcyhsb2NhdGlvbi5leHRlbnQpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICB0ZXh0OiBsb2NhdGlvbi5uYW1lLFxuICAgICAgICBib3VuZHM6IGJvdW5kcyxcbiAgICAgICAgc2NvcmU6IGxvY2F0aW9uLmZlYXR1cmUuYXR0cmlidXRlcy5TY29yZSxcbiAgICAgICAgbGF0bG5nOiBMLmxhdExuZyhsb2NhdGlvbi5mZWF0dXJlLmdlb21ldHJ5LnksIGxvY2F0aW9uLmZlYXR1cmUuZ2VvbWV0cnkueCksXG4gICAgICAgIHByb3BlcnRpZXM6IGxvY2F0aW9uLmZlYXR1cmUuYXR0cmlidXRlc1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0sXG5cbiAgX3Byb2Nlc3NGaW5kQWRkcmVzc0NhbmRpZGF0ZXNSZXNwb25zZTogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzcG9uc2UuY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNhbmRpZGF0ZSA9IHJlc3BvbnNlLmNhbmRpZGF0ZXNbaV07XG4gICAgICB2YXIgYm91bmRzID0gVXRpbC5leHRlbnRUb0JvdW5kcyhjYW5kaWRhdGUuZXh0ZW50KTtcblxuICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgdGV4dDogY2FuZGlkYXRlLmFkZHJlc3MsXG4gICAgICAgIGJvdW5kczogYm91bmRzLFxuICAgICAgICBzY29yZTogY2FuZGlkYXRlLnNjb3JlLFxuICAgICAgICBsYXRsbmc6IEwubGF0TG5nKGNhbmRpZGF0ZS5sb2NhdGlvbi55LCBjYW5kaWRhdGUubG9jYXRpb24ueCksXG4gICAgICAgIHByb3BlcnRpZXM6IGNhbmRpZGF0ZS5hdHRyaWJ1dGVzXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2NvZGUgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBHZW9jb2RlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW9jb2RlO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcbmltcG9ydCB7IFdvcmxkR2VvY29kaW5nU2VydmljZVVybCB9IGZyb20gJy4uL0VzcmlMZWFmbGV0R2VvY29kaW5nJztcblxuZXhwb3J0IHZhciBSZXZlcnNlR2VvY29kZSA9IFRhc2suZXh0ZW5kKHtcbiAgcGF0aDogJ3JldmVyc2VHZW9jb2RlJyxcblxuICBwYXJhbXM6IHtcbiAgICBvdXRTUjogNDMyNixcbiAgICByZXR1cm5JbnRlcnNlY3Rpb246IGZhbHNlXG4gIH0sXG5cbiAgc2V0dGVyczoge1xuICAgICdkaXN0YW5jZSc6ICdkaXN0YW5jZScsXG4gICAgJ2xhbmd1YWdlJzogJ2xhbmdDb2RlJyxcbiAgICAnaW50ZXJzZWN0aW9uJzogJ3JldHVybkludGVyc2VjdGlvbidcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMudXJsID0gb3B0aW9ucy51cmwgfHwgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsO1xuICAgIFRhc2sucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICBsYXRsbmc6IGZ1bmN0aW9uIChsYXRsbmcpIHtcbiAgICBsYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xuICAgIHRoaXMucGFyYW1zLmxvY2F0aW9uID0gbGF0bG5nLmxuZyArICcsJyArIGxhdGxuZy5sYXQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcnVuOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIHZhciByZXN1bHQ7XG5cbiAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgIGxhdGxuZzogTC5sYXRMbmcocmVzcG9uc2UubG9jYXRpb24ueSwgcmVzcG9uc2UubG9jYXRpb24ueCksXG4gICAgICAgICAgYWRkcmVzczogcmVzcG9uc2UuYWRkcmVzc1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXN1bHQsIHJlc3BvbnNlKTtcbiAgICB9LCB0aGlzKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXZlcnNlR2VvY29kZSAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IFJldmVyc2VHZW9jb2RlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCByZXZlcnNlR2VvY29kZTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGFzaywgVXRpbCB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5pbXBvcnQgeyBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmwgfSBmcm9tICcuLi9Fc3JpTGVhZmxldEdlb2NvZGluZyc7XG5cbmV4cG9ydCB2YXIgU3VnZ2VzdCA9IFRhc2suZXh0ZW5kKHtcbiAgcGF0aDogJ3N1Z2dlc3QnLFxuXG4gIHBhcmFtczoge30sXG5cbiAgc2V0dGVyczoge1xuICAgIHRleHQ6ICd0ZXh0JyxcbiAgICBjYXRlZ29yeTogJ2NhdGVnb3J5JyxcbiAgICBjb3VudHJpZXM6ICdjb3VudHJ5Q29kZSdcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMudXJsID0gb3B0aW9ucy51cmwgfHwgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsO1xuICAgIFRhc2sucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICB3aXRoaW46IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhib3VuZHMpO1xuICAgIGJvdW5kcyA9IGJvdW5kcy5wYWQoMC41KTtcbiAgICB2YXIgY2VudGVyID0gYm91bmRzLmdldENlbnRlcigpO1xuICAgIHZhciBuZSA9IGJvdW5kcy5nZXROb3J0aFdlc3QoKTtcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGNlbnRlci5sbmcgKyAnLCcgKyBjZW50ZXIubGF0O1xuICAgIHRoaXMucGFyYW1zLmRpc3RhbmNlID0gTWF0aC5taW4oTWF0aC5tYXgoY2VudGVyLmRpc3RhbmNlVG8obmUpLCAyMDAwKSwgNTAwMDApO1xuICAgIHRoaXMucGFyYW1zLnNlYXJjaEV4dGVudCA9IFV0aWwuYm91bmRzVG9FeHRlbnQoYm91bmRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBuZWFyYnk6IGZ1bmN0aW9uIChsYXRsbmcsIHJhZGl1cykge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMubG9jYXRpb24gPSBsYXRsbmcubG5nICsgJywnICsgbGF0bG5nLmxhdDtcbiAgICB0aGlzLnBhcmFtcy5kaXN0YW5jZSA9IE1hdGgubWluKE1hdGgubWF4KHJhZGl1cywgMjAwMCksIDUwMDAwKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UsIHJlc3BvbnNlKTtcbiAgICB9LCB0aGlzKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN1Z2dlc3QgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBTdWdnZXN0KG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdWdnZXN0O1xuIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5pbXBvcnQgeyBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmwgfSBmcm9tICcuLi9Fc3JpTGVhZmxldEdlb2NvZGluZyc7XG5pbXBvcnQgZ2VvY29kZSBmcm9tICcuLi9UYXNrcy9HZW9jb2RlJztcbmltcG9ydCByZXZlcnNlR2VvY29kZSBmcm9tICcuLi9UYXNrcy9SZXZlcnNlR2VvY29kZSc7XG5pbXBvcnQgc3VnZ2VzdCBmcm9tICcuLi9UYXNrcy9TdWdnZXN0JztcblxuZXhwb3J0IHZhciBHZW9jb2RlU2VydmljZSA9IFNlcnZpY2UuZXh0ZW5kKHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLnVybCA9IG9wdGlvbnMudXJsIHx8IFdvcmxkR2VvY29kaW5nU2VydmljZVVybDtcbiAgICBTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fY29uZmlybVN1Z2dlc3RTdXBwb3J0KCk7XG4gIH0sXG5cbiAgZ2VvY29kZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBnZW9jb2RlKHRoaXMpO1xuICB9LFxuXG4gIHJldmVyc2U6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcmV2ZXJzZUdlb2NvZGUodGhpcyk7XG4gIH0sXG5cbiAgc3VnZ2VzdDogZnVuY3Rpb24gKCkge1xuICAgIC8vIHJlcXVpcmVzIGVpdGhlciB0aGUgRXNyaSBXb3JsZCBHZW9jb2RpbmcgU2VydmljZSBvciBhIDEwLjMgQXJjR0lTIFNlcnZlciBHZW9jb2RpbmcgU2VydmljZSB0aGF0IHN1cHBvcnRzIHN1Z2dlc3QuXG4gICAgcmV0dXJuIHN1Z2dlc3QodGhpcyk7XG4gIH0sXG5cbiAgX2NvbmZpcm1TdWdnZXN0U3VwcG9ydDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubWV0YWRhdGEoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKGVycm9yKSB7IHJldHVybjsgfVxuICAgICAgaWYgKHJlc3BvbnNlLmNhcGFiaWxpdGllcy5pbmRleE9mKCdTdWdnZXN0JykgPiAtMSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9jb2RlU2VydmljZSAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEdlb2NvZGVTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW9jb2RlU2VydmljZTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuXG5leHBvcnQgdmFyIEdlb3NlYXJjaENvcmUgPSBMLkV2ZW50ZWQuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgem9vbVRvUmVzdWx0OiB0cnVlLFxuICAgIHVzZU1hcEJvdW5kczogMTIsXG4gICAgc2VhcmNoQm91bmRzOiBudWxsXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKGNvbnRyb2wsIG9wdGlvbnMpIHtcbiAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9jb250cm9sID0gY29udHJvbDtcblxuICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5wcm92aWRlcnMgfHwgIW9wdGlvbnMucHJvdmlkZXJzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IGF0IGxlYXN0IG9uZSBwcm92aWRlcicpO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb3ZpZGVycyA9IG9wdGlvbnMucHJvdmlkZXJzO1xuICB9LFxuXG4gIF9nZW9jb2RlOiBmdW5jdGlvbiAodGV4dCwga2V5LCBwcm92aWRlcikge1xuICAgIHZhciBhY3RpdmVSZXF1ZXN0cyA9IDA7XG4gICAgdmFyIGFsbFJlc3VsdHMgPSBbXTtcbiAgICB2YXIgYm91bmRzO1xuXG4gICAgdmFyIGNhbGxiYWNrID0gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCByZXN1bHRzKSB7XG4gICAgICBhY3RpdmVSZXF1ZXN0cy0tO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgYWxsUmVzdWx0cyA9IGFsbFJlc3VsdHMuY29uY2F0KHJlc3VsdHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdHMgPD0gMCkge1xuICAgICAgICBib3VuZHMgPSB0aGlzLl9ib3VuZHNGcm9tUmVzdWx0cyhhbGxSZXN1bHRzKTtcblxuICAgICAgICB0aGlzLmZpcmUoJ3Jlc3VsdHMnLCB7XG4gICAgICAgICAgcmVzdWx0czogYWxsUmVzdWx0cyxcbiAgICAgICAgICBib3VuZHM6IGJvdW5kcyxcbiAgICAgICAgICBsYXRsbmc6IChib3VuZHMpID8gYm91bmRzLmdldENlbnRlcigpIDogdW5kZWZpbmVkLFxuICAgICAgICAgIHRleHQ6IHRleHRcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy56b29tVG9SZXN1bHQgJiYgYm91bmRzKSB7XG4gICAgICAgICAgdGhpcy5fY29udHJvbC5fbWFwLmZpdEJvdW5kcyhib3VuZHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJlKCdsb2FkJyk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBhY3RpdmVSZXF1ZXN0cysrO1xuICAgICAgcHJvdmlkZXIucmVzdWx0cyh0ZXh0LCBrZXksIHRoaXMuX3NlYXJjaEJvdW5kcygpLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFjdGl2ZVJlcXVlc3RzKys7XG4gICAgICAgIHRoaXMuX3Byb3ZpZGVyc1tpXS5yZXN1bHRzKHRleHQsIGtleSwgdGhpcy5fc2VhcmNoQm91bmRzKCksIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX3N1Z2dlc3Q6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgdmFyIGFjdGl2ZVJlcXVlc3RzID0gdGhpcy5fcHJvdmlkZXJzLmxlbmd0aDtcblxuICAgIHZhciBjcmVhdGVDYWxsYmFjayA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uICh0ZXh0LCBwcm92aWRlcikge1xuICAgICAgcmV0dXJuIEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RzID0gYWN0aXZlUmVxdWVzdHMgLSAxO1xuXG4gICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdWdnZXN0aW9ucykge1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzdWdnZXN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc3VnZ2VzdGlvbnNbaV0ucHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvdmlkZXIuX2xhc3RSZW5kZXIgIT09IHRleHQgJiYgcHJvdmlkZXIubm9kZXMpIHtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcHJvdmlkZXIubm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm92aWRlci5ub2Rlc1tpXS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbnRyb2wuX3N1Z2dlc3Rpb25zLnJlbW92ZUNoaWxkKHByb3ZpZGVyLm5vZGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwcm92aWRlci5ub2RlcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN1Z2dlc3Rpb25zLmxlbmd0aCAmJiB0aGlzLl9jb250cm9sLl9pbnB1dC52YWx1ZSA9PT0gdGV4dCkge1xuICAgICAgICAgIHRoaXMuX2NvbnRyb2wuY2xlYXJTdWdnZXN0aW9ucyhwcm92aWRlci5ub2Rlcyk7XG5cbiAgICAgICAgICBwcm92aWRlci5fbGFzdFJlbmRlciA9IHRleHQ7XG4gICAgICAgICAgcHJvdmlkZXIubm9kZXMgPSB0aGlzLl9jb250cm9sLl9yZW5kZXJTdWdnZXN0aW9ucyhzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgdGhpcy5fY29udHJvbC5fbm9kZXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0aGlzLl9wZW5kaW5nU3VnZ2VzdGlvbnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcHJvdmlkZXIgPSB0aGlzLl9wcm92aWRlcnNbaV07XG4gICAgICB2YXIgcmVxdWVzdCA9IHByb3ZpZGVyLnN1Z2dlc3Rpb25zKHRleHQsIHRoaXMuX3NlYXJjaEJvdW5kcygpLCBjcmVhdGVDYWxsYmFjayh0ZXh0LCBwcm92aWRlcikpO1xuICAgICAgdGhpcy5fcGVuZGluZ1N1Z2dlc3Rpb25zLnB1c2gocmVxdWVzdCk7XG4gICAgfVxuICB9LFxuXG4gIF9zZWFyY2hCb3VuZHM6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnNlYXJjaEJvdW5kcyAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zZWFyY2hCb3VuZHM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy51c2VNYXBCb3VuZHMgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZU1hcEJvdW5kcyA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2wuX21hcC5nZXRCb3VuZHMoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZU1hcEJvdW5kcyA8PSB0aGlzLl9jb250cm9sLl9tYXAuZ2V0Wm9vbSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udHJvbC5fbWFwLmdldEJvdW5kcygpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIF9ib3VuZHNGcm9tUmVzdWx0czogZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG51bGxJc2xhbmQgPSBMLmxhdExuZ0JvdW5kcyhbMCwgMF0sIFswLCAwXSk7XG4gICAgdmFyIHJlc3VsdEJvdW5kcyA9IFtdO1xuICAgIHZhciByZXN1bHRMYXRsbmdzID0gW107XG5cbiAgICAvLyBjb2xsZWN0IHRoZSBib3VuZHMgYW5kIGNlbnRlciBvZiBlYWNoIHJlc3VsdFxuICAgIGZvciAodmFyIGkgPSByZXN1bHRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gcmVzdWx0c1tpXTtcblxuICAgICAgcmVzdWx0TGF0bG5ncy5wdXNoKHJlc3VsdC5sYXRsbmcpO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgYm91bmRzIGFyZSB2YWxpZCBhbmQgbm90IDAsMC4gc29tZXRpbWVzIGJvdW5kcyBhcmUgaW5jb3JyZWN0IG9yIG5vdCBwcmVzZW50XG4gICAgICBpZiAocmVzdWx0LmJvdW5kcyAmJiByZXN1bHQuYm91bmRzLmlzVmFsaWQoKSAmJiAhcmVzdWx0LmJvdW5kcy5lcXVhbHMobnVsbElzbGFuZCkpIHtcbiAgICAgICAgcmVzdWx0Qm91bmRzLnB1c2gocmVzdWx0LmJvdW5kcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZm9ybSBhIGJvdW5kcyBvYmplY3QgY29udGFpbmluZyBhbGwgY2VudGVyIHBvaW50c1xuICAgIHZhciBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhyZXN1bHRMYXRsbmdzKTtcblxuICAgIC8vIGFuZCBleHRlbmQgaXQgdG8gY29udGFpbiBhbGwgYm91bmRzIG9iamVjdHNcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlc3VsdEJvdW5kcy5sZW5ndGg7IGorKykge1xuICAgICAgYm91bmRzLmV4dGVuZChyZXN1bHRCb3VuZHNbal0pO1xuICAgIH1cblxuICAgIHJldHVybiBib3VuZHM7XG4gIH0sXG5cbiAgX2dldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGF0dHJpYnMgPSBbXTtcbiAgICB2YXIgcHJvdmlkZXJzID0gdGhpcy5fcHJvdmlkZXJzO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwcm92aWRlcnNbaV0ub3B0aW9ucy5hdHRyaWJ1dGlvbikge1xuICAgICAgICBhdHRyaWJzLnB1c2gocHJvdmlkZXJzW2ldLm9wdGlvbnMuYXR0cmlidXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhdHRyaWJzLmpvaW4oJywgJyk7XG4gIH1cblxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9zZWFyY2hDb3JlIChjb250cm9sLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgR2Vvc2VhcmNoQ29yZShjb250cm9sLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2Vvc2VhcmNoQ29yZTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgZ2Vvc2VhcmNoQ29yZSB9IGZyb20gJy4uL0NsYXNzZXMvR2Vvc2VhcmNoQ29yZSc7XG5cbmV4cG9ydCB2YXIgR2Vvc2VhcmNoID0gTC5Db250cm9sLmV4dGVuZCh7XG4gIGluY2x1ZGVzOiBMLk1peGluLkV2ZW50cyxcblxuICBvcHRpb25zOiB7XG4gICAgcG9zaXRpb246ICd0b3BsZWZ0JyxcbiAgICBjb2xsYXBzZUFmdGVyUmVzdWx0OiB0cnVlLFxuICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICBhbGxvd011bHRpcGxlUmVzdWx0czogdHJ1ZSxcbiAgICBwbGFjZWhvbGRlcjogJ1NlYXJjaCBmb3IgcGxhY2VzIG9yIGFkZHJlc3NlcycsXG4gICAgdGl0bGU6ICdMb2NhdGlvbiBTZWFyY2gnXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblxuICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5wcm92aWRlcnMgfHwgIW9wdGlvbnMucHJvdmlkZXJzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IGF0IGxlYXN0IG9uZSBwcm92aWRlcicpO1xuICAgIH1cblxuICAgIC8vIGluc3RhbnRpYXRlIHRoZSB1bmRlcmx5aW5nIGNsYXNzIGFuZCBwYXNzIGFsb25nIG9wdGlvbnNcbiAgICB0aGlzLl9nZW9zZWFyY2hDb3JlID0gZ2Vvc2VhcmNoQ29yZSh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wcm92aWRlcnMgPSBvcHRpb25zLnByb3ZpZGVycztcblxuICAgIC8vIGJ1YmJsZSBlYWNoIHByb3ZpZGVycyBldmVudHMgdG8gdGhlIGNvbnRyb2xcbiAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wcm92aWRlcnNbaV0uYWRkRXZlbnRQYXJlbnQodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcGVuZGluZ1N1Z2dlc3Rpb25zID0gW107XG5cbiAgICBMLkNvbnRyb2wucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbChvcHRpb25zKTtcbiAgfSxcblxuICBfcmVuZGVyU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uIChzdWdnZXN0aW9ucykge1xuICAgIHZhciBjdXJyZW50R3JvdXA7XG4gICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAvLyBzZXQgdGhlIG1heEhlaWdodCBvZiB0aGUgc3VnZ2VzdGlvbnMgYm94IHRvXG4gICAgLy8gbWFwIGhlaWdodFxuICAgIC8vIC0gc3VnZ2VzdGlvbnMgb2Zmc2V0IChkaXN0YW5jZSBmcm9tIHRvcCBvZiBzdWdnZXN0aW9ucyB0byB0b3Agb2YgY29udHJvbClcbiAgICAvLyAtIGNvbnRyb2wgb2Zmc2V0IChkaXN0YW5jZSBmcm9tIHRvcCBvZiBjb250cm9sIHRvIHRvcCBvZiBtYXApXG4gICAgLy8gLSAxMCAoZXh0cmEgcGFkZGluZylcbiAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5tYXhIZWlnaHQgPSAodGhpcy5fbWFwLmdldFNpemUoKS55IC0gdGhpcy5fc3VnZ2VzdGlvbnMub2Zmc2V0VG9wIC0gdGhpcy5fd3JhcHBlci5vZmZzZXRUb3AgLSAxMCkgKyAncHgnO1xuXG4gICAgdmFyIG5vZGVzID0gW107XG4gICAgdmFyIGxpc3Q7XG4gICAgdmFyIGhlYWRlcjtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3VnZ2VzdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzdWdnZXN0aW9uID0gc3VnZ2VzdGlvbnNbaV07XG4gICAgICBpZiAoIWhlYWRlciAmJiB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wcm92aWRlcnMubGVuZ3RoID4gMSAmJiBjdXJyZW50R3JvdXAgIT09IHN1Z2dlc3Rpb24ucHJvdmlkZXIub3B0aW9ucy5sYWJlbCkge1xuICAgICAgICBoZWFkZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdzcGFuJywgJ2dlb2NvZGVyLWNvbnRyb2wtaGVhZGVyJywgdGhpcy5fc3VnZ2VzdGlvbnMpO1xuICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBzdWdnZXN0aW9uLnByb3ZpZGVyLm9wdGlvbnMubGFiZWw7XG4gICAgICAgIGhlYWRlci5pbm5lclRleHQgPSBzdWdnZXN0aW9uLnByb3ZpZGVyLm9wdGlvbnMubGFiZWw7XG4gICAgICAgIGN1cnJlbnRHcm91cCA9IHN1Z2dlc3Rpb24ucHJvdmlkZXIub3B0aW9ucy5sYWJlbDtcbiAgICAgICAgbm9kZXMucHVzaChoZWFkZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWxpc3QpIHtcbiAgICAgICAgbGlzdCA9IEwuRG9tVXRpbC5jcmVhdGUoJ3VsJywgJ2dlb2NvZGVyLWNvbnRyb2wtbGlzdCcsIHRoaXMuX3N1Z2dlc3Rpb25zKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN1Z2dlc3Rpb25JdGVtID0gTC5Eb21VdGlsLmNyZWF0ZSgnbGknLCAnZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9uJywgbGlzdCk7XG5cbiAgICAgIHN1Z2dlc3Rpb25JdGVtLmlubmVySFRNTCA9IHN1Z2dlc3Rpb24udGV4dDtcbiAgICAgIHN1Z2dlc3Rpb25JdGVtLnByb3ZpZGVyID0gc3VnZ2VzdGlvbi5wcm92aWRlcjtcbiAgICAgIHN1Z2dlc3Rpb25JdGVtWydkYXRhLW1hZ2ljLWtleSddID0gc3VnZ2VzdGlvbi5tYWdpY0tleTtcbiAgICB9XG5cbiAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWxvYWRpbmcnKTtcblxuICAgIG5vZGVzLnB1c2gobGlzdCk7XG5cbiAgICByZXR1cm4gbm9kZXM7XG4gIH0sXG5cbiAgX2JvdW5kc0Zyb21SZXN1bHRzOiBmdW5jdGlvbiAocmVzdWx0cykge1xuICAgIGlmICghcmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbnVsbElzbGFuZCA9IEwubGF0TG5nQm91bmRzKFswLCAwXSwgWzAsIDBdKTtcbiAgICB2YXIgcmVzdWx0Qm91bmRzID0gW107XG4gICAgdmFyIHJlc3VsdExhdGxuZ3MgPSBbXTtcblxuICAgIC8vIGNvbGxlY3QgdGhlIGJvdW5kcyBhbmQgY2VudGVyIG9mIGVhY2ggcmVzdWx0XG4gICAgZm9yICh2YXIgaSA9IHJlc3VsdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciByZXN1bHQgPSByZXN1bHRzW2ldO1xuXG4gICAgICByZXN1bHRMYXRsbmdzLnB1c2gocmVzdWx0LmxhdGxuZyk7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSBib3VuZHMgYXJlIHZhbGlkIGFuZCBub3QgMCwwLiBzb21ldGltZXMgYm91bmRzIGFyZSBpbmNvcnJlY3Qgb3Igbm90IHByZXNlbnRcbiAgICAgIGlmIChyZXN1bHQuYm91bmRzICYmIHJlc3VsdC5ib3VuZHMuaXNWYWxpZCgpICYmICFyZXN1bHQuYm91bmRzLmVxdWFscyhudWxsSXNsYW5kKSkge1xuICAgICAgICByZXN1bHRCb3VuZHMucHVzaChyZXN1bHQuYm91bmRzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmb3JtIGEgYm91bmRzIG9iamVjdCBjb250YWluaW5nIGFsbCBjZW50ZXIgcG9pbnRzXG4gICAgdmFyIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKHJlc3VsdExhdGxuZ3MpO1xuXG4gICAgLy8gYW5kIGV4dGVuZCBpdCB0byBjb250YWluIGFsbCBib3VuZHMgb2JqZWN0c1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzdWx0Qm91bmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICBib3VuZHMuZXh0ZW5kKHJlc3VsdEJvdW5kc1tqXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfSxcblxuICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3N1Z2dlc3Rpb25zLmlubmVySFRNTCA9ICcnO1xuICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGhpcy5faW5wdXQudmFsdWUgPSAnJztcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29sbGFwc2VBZnRlclJlc3VsdCkge1xuICAgICAgdGhpcy5faW5wdXQucGxhY2Vob2xkZXIgPSAnJztcbiAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl93cmFwcGVyLCAnZ2VvY29kZXItY29udHJvbC1leHBhbmRlZCcpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fbWFwLnNjcm9sbFdoZWVsWm9vbS5lbmFibGVkKCkgJiYgdGhpcy5fbWFwLm9wdGlvbnMuc2Nyb2xsV2hlZWxab29tKSB7XG4gICAgICB0aGlzLl9tYXAuc2Nyb2xsV2hlZWxab29tLmVuYWJsZSgpO1xuICAgIH1cbiAgfSxcblxuICBjbGVhclN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX25vZGVzKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuX25vZGVzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGlmICh0aGlzLl9ub2Rlc1trXS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMucmVtb3ZlQ2hpbGQodGhpcy5fbm9kZXNba10pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9zZXR1cENsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XG4gICAgdGhpcy5faW5wdXQuZm9jdXMoKTtcbiAgfSxcblxuICBkaXNhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5faW5wdXQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9pbnB1dCwgJ2dlb2NvZGVyLWNvbnRyb2wtaW5wdXQtZGlzYWJsZWQnKTtcbiAgICBMLkRvbUV2ZW50LnJlbW92ZUxpc3RlbmVyKHRoaXMuX3dyYXBwZXIsICdjbGljaycsIHRoaXMuX3NldHVwQ2xpY2ssIHRoaXMpO1xuICB9LFxuXG4gIGVuYWJsZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2lucHV0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1pbnB1dC1kaXNhYmxlZCcpO1xuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fd3JhcHBlciwgJ2NsaWNrJywgdGhpcy5fc2V0dXBDbGljaywgdGhpcyk7XG4gIH0sXG5cbiAgZ2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXR0cmlicyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9wcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLl9wcm92aWRlcnNbaV0ub3B0aW9ucy5hdHRyaWJ1dGlvbikge1xuICAgICAgICBhdHRyaWJzLnB1c2godGhpcy5fcHJvdmlkZXJzW2ldLm9wdGlvbnMuYXR0cmlidXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhdHRyaWJzLmpvaW4oJywgJyk7XG4gIH0sXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICB0aGlzLl9tYXAgPSBtYXA7XG4gICAgdGhpcy5fd3JhcHBlciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdnZW9jb2Rlci1jb250cm9sICcgKyAoKHRoaXMub3B0aW9ucy5leHBhbmRlZCkgPyAnICcgKyAnZ2VvY29kZXItY29udHJvbC1leHBhbmRlZCcgOiAnJykpO1xuICAgIHRoaXMuX2lucHV0ID0gTC5Eb21VdGlsLmNyZWF0ZSgnaW5wdXQnLCAnZ2VvY29kZXItY29udHJvbC1pbnB1dCBsZWFmbGV0LWJhcicsIHRoaXMuX3dyYXBwZXIpO1xuICAgIHRoaXMuX2lucHV0LnRpdGxlID0gdGhpcy5vcHRpb25zLnRpdGxlO1xuXG4gICAgdGhpcy5fc3VnZ2VzdGlvbnMgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9ucyBsZWFmbGV0LWJhcicsIHRoaXMuX3dyYXBwZXIpO1xuXG4gICAgdmFyIGNyZWRpdHMgPSB0aGlzLl9nZW9zZWFyY2hDb3JlLl9nZXRBdHRyaWJ1dGlvbigpO1xuICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuYWRkQXR0cmlidXRpb24oY3JlZGl0cyk7XG5cbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX2lucHV0LCAnZm9jdXMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdGhpcy5faW5wdXQucGxhY2Vob2xkZXIgPSB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXI7XG4gICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fd3JhcHBlciwgJ2dlb2NvZGVyLWNvbnRyb2wtZXhwYW5kZWQnKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fd3JhcHBlciwgJ2NsaWNrJywgdGhpcy5fc2V0dXBDbGljaywgdGhpcyk7XG5cbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX3N1Z2dlc3Rpb25zLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBzdWdnZXN0aW9uSXRlbSA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX2dlb2NvZGUoc3VnZ2VzdGlvbkl0ZW0uaW5uZXJIVE1MLCBzdWdnZXN0aW9uSXRlbVsnZGF0YS1tYWdpYy1rZXknXSwgc3VnZ2VzdGlvbkl0ZW0ucHJvdmlkZXIpO1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9pbnB1dCwgJ2JsdXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XG5cbiAgICAgIHZhciBsaXN0ID0gdGhpcy5fc3VnZ2VzdGlvbnMucXVlcnlTZWxlY3RvckFsbCgnLicgKyAnZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9uJyk7XG4gICAgICB2YXIgc2VsZWN0ZWQgPSB0aGlzLl9zdWdnZXN0aW9ucy5xdWVyeVNlbGVjdG9yQWxsKCcuJyArICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJylbMF07XG4gICAgICB2YXIgc2VsZWN0ZWRQb3NpdGlvbjtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsaXN0W2ldID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgIHNlbGVjdGVkUG9zaXRpb24gPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9nZW9jb2RlKHNlbGVjdGVkLmlubmVySFRNTCwgc2VsZWN0ZWRbJ2RhdGEtbWFnaWMta2V5J10sIHNlbGVjdGVkLnByb3ZpZGVyKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5hbGxvd011bHRpcGxlUmVzdWx0cykge1xuICAgICAgICAgICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fZ2VvY29kZSh0aGlzLl9pbnB1dC52YWx1ZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKGxpc3RbMF0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3Moc2VsZWN0ZWQsICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHByZXZpb3VzSXRlbSA9IGxpc3Rbc2VsZWN0ZWRQb3NpdGlvbiAtIDFdO1xuXG4gICAgICAgICAgaWYgKHNlbGVjdGVkICYmIHByZXZpb3VzSXRlbSkge1xuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHByZXZpb3VzSXRlbSwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKGxpc3RbbGlzdC5sZW5ndGggLSAxXSwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyhzZWxlY3RlZCwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbmV4dEl0ZW0gPSBsaXN0W3NlbGVjdGVkUG9zaXRpb24gKyAxXTtcblxuICAgICAgICAgIGlmIChzZWxlY3RlZCAmJiBuZXh0SXRlbSkge1xuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKG5leHRJdGVtLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3MobGlzdFswXSwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyB3aGVuIHRoZSBpbnB1dCBjaGFuZ2VzIHdlIHNob3VsZCBjYW5jZWwgYWxsIHBlbmRpbmcgc3VnZ2VzdGlvbiByZXF1ZXN0cyBpZiBwb3NzaWJsZSB0byBhdm9pZCByZXN1bHQgY29sbGlzaW9uc1xuICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcGVuZGluZ1N1Z2dlc3Rpb25zLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IHRoaXMuX2dlb3NlYXJjaENvcmUuX3BlbmRpbmdTdWdnZXN0aW9uc1t4XTtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0ICYmIHJlcXVlc3QuYWJvcnQgJiYgIXJlcXVlc3QuaWQpIHtcbiAgICAgICAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcblxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5faW5wdXQsICdrZXl1cCcsIEwuVXRpbC50aHJvdHRsZShmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgICAgdmFyIHRleHQgPSAoZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50KS52YWx1ZTtcblxuICAgICAgLy8gcmVxdWlyZSBhdCBsZWFzdCAyIGNoYXJhY3RlcnMgZm9yIHN1Z2dlc3Rpb25zXG4gICAgICBpZiAodGV4dC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWxvYWRpbmcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGlzIGlzIHRoZSBlc2NhcGUga2V5IGl0IHdpbGwgY2xlYXIgdGhlIGlucHV0IHNvIGNsZWFyIHN1Z2dlc3Rpb25zXG4gICAgICBpZiAoa2V5ID09PSAyNykge1xuICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGlzIGlzIE5PVCB0aGUgdXAvZG93biBhcnJvd3Mgb3IgZW50ZXIgbWFrZSBhIHN1Z2dlc3Rpb25cbiAgICAgIGlmIChrZXkgIT09IDEzICYmIGtleSAhPT0gMzggJiYga2V5ICE9PSA0MCkge1xuICAgICAgICBpZiAodGhpcy5faW5wdXQudmFsdWUgIT09IHRoaXMuX2xhc3RWYWx1ZSkge1xuICAgICAgICAgIHRoaXMuX2xhc3RWYWx1ZSA9IHRoaXMuX2lucHV0LnZhbHVlO1xuICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9pbnB1dCwgJ2dlb2NvZGVyLWNvbnRyb2wtbG9hZGluZycpO1xuICAgICAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX3N1Z2dlc3QodGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCA1MCwgdGhpcyksIHRoaXMpO1xuXG4gICAgTC5Eb21FdmVudC5kaXNhYmxlQ2xpY2tQcm9wYWdhdGlvbih0aGlzLl93cmFwcGVyKTtcblxuICAgIC8vIHdoZW4gbW91c2UgbW92ZXMgb3ZlciBzdWdnZXN0aW9ucyBkaXNhYmxlIHNjcm9sbCB3aGVlbCB6b29tIGlmIGl0cyBlbmFibGVkXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9zdWdnZXN0aW9ucywgJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAobWFwLnNjcm9sbFdoZWVsWm9vbS5lbmFibGVkKCkgJiYgbWFwLm9wdGlvbnMuc2Nyb2xsV2hlZWxab29tKSB7XG4gICAgICAgIG1hcC5zY3JvbGxXaGVlbFpvb20uZGlzYWJsZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gd2hlbiBtb3VzZSBtb3ZlcyBsZWF2ZXMgc3VnZ2VzdGlvbnMgZW5hYmxlIHNjcm9sbCB3aGVlbCB6b29tIGlmIGl0cyBkaXNhYmxlZFxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fc3VnZ2VzdGlvbnMsICdtb3VzZW91dCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoIW1hcC5zY3JvbGxXaGVlbFpvb20uZW5hYmxlZCgpICYmIG1hcC5vcHRpb25zLnNjcm9sbFdoZWVsWm9vbSkge1xuICAgICAgICBtYXAuc2Nyb2xsV2hlZWxab29tLmVuYWJsZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5vbignbG9hZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWxvYWRpbmcnKTtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMuX2lucHV0LmJsdXIoKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHJldHVybiB0aGlzLl93cmFwcGVyO1xuICB9LFxuXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5yZW1vdmVBdHRyaWJ1dGlvbignR2VvY29kaW5nIGJ5IEVzcmknKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9zZWFyY2ggKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBHZW9zZWFyY2gob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlb3NlYXJjaDtcbiIsImltcG9ydCB7IEdlb2NvZGVTZXJ2aWNlIH0gZnJvbSAnLi4vU2VydmljZXMvR2VvY29kZSc7XG5cbmV4cG9ydCB2YXIgQXJjZ2lzT25saW5lUHJvdmlkZXIgPSBHZW9jb2RlU2VydmljZS5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgbGFiZWw6ICdQbGFjZXMgYW5kIEFkZHJlc3NlcycsXG4gICAgbWF4UmVzdWx0czogNSxcbiAgICBhdHRyaWJ1dGlvbjogJzxhIGhyZWY9XCJodHRwczovL2RldmVsb3BlcnMuYXJjZ2lzLmNvbS9lbi9mZWF0dXJlcy9nZW9jb2RpbmcvXCI+R2VvY29kaW5nIGJ5IEVzcmk8L2E+J1xuICB9LFxuXG4gIHN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAodGV4dCwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciByZXF1ZXN0ID0gdGhpcy5zdWdnZXN0KCkudGV4dCh0ZXh0KTtcblxuICAgIGlmIChib3VuZHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aGluKGJvdW5kcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb3VudHJpZXMpIHtcbiAgICAgIHJlcXVlc3QuY291bnRyaWVzKHRoaXMub3B0aW9ucy5jb3VudHJpZXMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2F0ZWdvcmllcykge1xuICAgICAgcmVxdWVzdC5jYXRlZ29yeSh0aGlzLm9wdGlvbnMuY2F0ZWdvcmllcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcXVlc3QucnVuKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpIHtcbiAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICB3aGlsZSAocmVzcG9uc2Uuc3VnZ2VzdGlvbnMubGVuZ3RoICYmIHN1Z2dlc3Rpb25zLmxlbmd0aCA8PSAodGhpcy5vcHRpb25zLm1heFJlc3VsdHMgLSAxKSkge1xuICAgICAgICAgIHZhciBzdWdnZXN0aW9uID0gcmVzcG9uc2Uuc3VnZ2VzdGlvbnMuc2hpZnQoKTtcbiAgICAgICAgICBpZiAoIXN1Z2dlc3Rpb24uaXNDb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgdGV4dDogc3VnZ2VzdGlvbi50ZXh0LFxuICAgICAgICAgICAgICBtYWdpY0tleTogc3VnZ2VzdGlvbi5tYWdpY0tleVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhlcnJvciwgc3VnZ2VzdGlvbnMpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIHJlc3VsdHM6IGZ1bmN0aW9uICh0ZXh0LCBrZXksIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxdWVzdCA9IHRoaXMuZ2VvY29kZSgpLnRleHQodGV4dCk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICByZXF1ZXN0LmtleShrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0Lm1heExvY2F0aW9ucyh0aGlzLm9wdGlvbnMubWF4UmVzdWx0cyk7XG4gICAgfVxuXG4gICAgaWYgKGJvdW5kcykge1xuICAgICAgcmVxdWVzdC53aXRoaW4oYm91bmRzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmZvclN0b3JhZ2UpIHtcbiAgICAgIHJlcXVlc3QuZm9yU3RvcmFnZSh0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3BvbnNlLnJlc3VsdHMpO1xuICAgIH0sIHRoaXMpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFyY2dpc09ubGluZVByb3ZpZGVyIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgQXJjZ2lzT25saW5lUHJvdmlkZXIob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFyY2dpc09ubGluZVByb3ZpZGVyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBGZWF0dXJlTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcblxuZXhwb3J0IHZhciBGZWF0dXJlTGF5ZXJQcm92aWRlciA9IEZlYXR1cmVMYXllclNlcnZpY2UuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIGxhYmVsOiAnRmVhdHVyZSBMYXllcicsXG4gICAgbWF4UmVzdWx0czogNSxcbiAgICBidWZmZXJSYWRpdXM6IDEwMDAsXG4gICAgZm9ybWF0U3VnZ2VzdGlvbjogZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgIHJldHVybiBmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkc1swXV07XG4gICAgfVxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgRmVhdHVyZUxheWVyU2VydmljZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMgPSBbdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkc107XG4gICAgfVxuICB9LFxuXG4gIHN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAodGV4dCwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcnkoKS53aGVyZSh0aGlzLl9idWlsZFF1ZXJ5KHRleHQpKVxuICAgICAgLnJldHVybkdlb21ldHJ5KGZhbHNlKTtcblxuICAgIGlmIChib3VuZHMpIHtcbiAgICAgIHF1ZXJ5LmludGVyc2VjdHMoYm91bmRzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmlkRmllbGQpIHtcbiAgICAgIHF1ZXJ5LmZpZWxkcyhbdGhpcy5vcHRpb25zLmlkRmllbGRdLmNvbmNhdCh0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzKSk7XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBxdWVyeS5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXN1bHRzLCByYXcpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgW10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmlkRmllbGQgPSByYXcub2JqZWN0SWRGaWVsZE5hbWU7XG4gICAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgICB2YXIgY291bnQgPSBNYXRoLm1pbihyZXN1bHRzLmZlYXR1cmVzLmxlbmd0aCwgdGhpcy5vcHRpb25zLm1heFJlc3VsdHMpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICB2YXIgZmVhdHVyZSA9IHJlc3VsdHMuZmVhdHVyZXNbaV07XG4gICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICB0ZXh0OiB0aGlzLm9wdGlvbnMuZm9ybWF0U3VnZ2VzdGlvbi5jYWxsKHRoaXMsIGZlYXR1cmUpLFxuICAgICAgICAgICAgbWFnaWNLZXk6IGZlYXR1cmUuaWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayhlcnJvciwgc3VnZ2VzdGlvbnMuc2xpY2UoMCwgdGhpcy5vcHRpb25zLm1heFJlc3VsdHMpLnJldmVyc2UoKSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfSxcblxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyeSgpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgcXVlcnkuZmVhdHVyZUlkcyhba2V5XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHF1ZXJ5LndoZXJlKHRoaXMuX2J1aWxkUXVlcnkodGV4dCkpO1xuICAgIH1cblxuICAgIGlmIChib3VuZHMpIHtcbiAgICAgIHF1ZXJ5LndpdGhpbihib3VuZHMpO1xuICAgIH1cblxuICAgIHJldHVybiBxdWVyeS5ydW4oTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlcykge1xuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmVhdHVyZXMuZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZlYXR1cmUgPSBmZWF0dXJlcy5mZWF0dXJlc1tpXTtcbiAgICAgICAgaWYgKGZlYXR1cmUpIHtcbiAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5fZmVhdHVyZUJvdW5kcyhmZWF0dXJlKTtcblxuICAgICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBsYXRsbmc6IGJvdW5kcy5nZXRDZW50ZXIoKSxcbiAgICAgICAgICAgIGJvdW5kczogYm91bmRzLFxuICAgICAgICAgICAgdGV4dDogdGhpcy5vcHRpb25zLmZvcm1hdFN1Z2dlc3Rpb24uY2FsbCh0aGlzLCBmZWF0dXJlKSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IGZlYXR1cmUucHJvcGVydGllcyxcbiAgICAgICAgICAgIGdlb2pzb246IGZlYXR1cmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKGVycm9yLCByZXN1bHRzKTtcbiAgICB9LCB0aGlzKSk7XG4gIH0sXG5cbiAgX2J1aWxkUXVlcnk6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgdmFyIHF1ZXJ5U3RyaW5nID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZpZWxkID0gJ3VwcGVyKFwiJyArIHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHNbaV0gKyAnXCIpJztcblxuICAgICAgcXVlcnlTdHJpbmcucHVzaChmaWVsZCArIFwiIExJS0UgdXBwZXIoJyVcIiArIHRleHQgKyBcIiUnKVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcXVlcnlTdHJpbmcuam9pbignIE9SICcpO1xuICB9LFxuXG4gIF9mZWF0dXJlQm91bmRzOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIHZhciBnZW9qc29uID0gTC5nZW9Kc29uKGZlYXR1cmUpO1xuICAgIGlmIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcbiAgICAgIHZhciBjZW50ZXIgPSBnZW9qc29uLmdldEJvdW5kcygpLmdldENlbnRlcigpO1xuICAgICAgdmFyIGxuZ1JhZGl1cyA9ICgodGhpcy5vcHRpb25zLmJ1ZmZlclJhZGl1cyAvIDQwMDc1MDE3KSAqIDM2MCkgLyBNYXRoLmNvcygoMTgwIC8gTWF0aC5QSSkgKiBjZW50ZXIubGF0KTtcbiAgICAgIHZhciBsYXRSYWRpdXMgPSAodGhpcy5vcHRpb25zLmJ1ZmZlclJhZGl1cyAvIDQwMDc1MDE3KSAqIDM2MDtcbiAgICAgIHJldHVybiBMLmxhdExuZ0JvdW5kcyhbY2VudGVyLmxhdCAtIGxhdFJhZGl1cywgY2VudGVyLmxuZyAtIGxuZ1JhZGl1c10sIFtjZW50ZXIubGF0ICsgbGF0UmFkaXVzLCBjZW50ZXIubG5nICsgbG5nUmFkaXVzXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZW9qc29uLmdldEJvdW5kcygpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlTGF5ZXJQcm92aWRlciAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEZlYXR1cmVMYXllclByb3ZpZGVyKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmZWF0dXJlTGF5ZXJQcm92aWRlcjtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5cbmV4cG9ydCB2YXIgTWFwU2VydmljZVByb3ZpZGVyID0gTWFwU2VydmljZS5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgbGF5ZXJzOiBbMF0sXG4gICAgbGFiZWw6ICdNYXAgU2VydmljZScsXG4gICAgYnVmZmVyUmFkaXVzOiAxMDAwLFxuICAgIG1heFJlc3VsdHM6IDUsXG4gICAgZm9ybWF0U3VnZ2VzdGlvbjogZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgIHJldHVybiBmZWF0dXJlLnByb3BlcnRpZXNbZmVhdHVyZS5kaXNwbGF5RmllbGROYW1lXSArICcgPHNtYWxsPicgKyBmZWF0dXJlLmxheWVyTmFtZSArICc8L3NtYWxsPic7XG4gICAgfVxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgTWFwU2VydmljZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2dldElkRmllbGRzKCk7XG4gIH0sXG5cbiAgc3VnZ2VzdGlvbnM6IGZ1bmN0aW9uICh0ZXh0LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB0aGlzLmZpbmQoKS50ZXh0KHRleHQpLmZpZWxkcyh0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzKS5yZXR1cm5HZW9tZXRyeShmYWxzZSkubGF5ZXJzKHRoaXMub3B0aW9ucy5sYXllcnMpO1xuXG4gICAgcmV0dXJuIHJlcXVlc3QucnVuKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmF3KSB7XG4gICAgICB2YXIgc3VnZ2VzdGlvbnMgPSBbXTtcbiAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgdmFyIGNvdW50ID0gTWF0aC5taW4odGhpcy5vcHRpb25zLm1heFJlc3VsdHMsIHJlc3VsdHMuZmVhdHVyZXMubGVuZ3RoKTtcbiAgICAgICAgcmF3LnJlc3VsdHMgPSByYXcucmVzdWx0cy5yZXZlcnNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgIHZhciBmZWF0dXJlID0gcmVzdWx0cy5mZWF0dXJlc1tpXTtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcmF3LnJlc3VsdHNbaV07XG4gICAgICAgICAgdmFyIGxheWVyID0gcmVzdWx0LmxheWVySWQ7XG4gICAgICAgICAgdmFyIGlkRmllbGQgPSB0aGlzLl9pZEZpZWxkc1tsYXllcl07XG4gICAgICAgICAgZmVhdHVyZS5sYXllcklkID0gbGF5ZXI7XG4gICAgICAgICAgZmVhdHVyZS5sYXllck5hbWUgPSB0aGlzLl9sYXllck5hbWVzW2xheWVyXTtcbiAgICAgICAgICBmZWF0dXJlLmRpc3BsYXlGaWVsZE5hbWUgPSB0aGlzLl9kaXNwbGF5RmllbGRzW2xheWVyXTtcbiAgICAgICAgICBpZiAoaWRGaWVsZCkge1xuICAgICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5mb3JtYXRTdWdnZXN0aW9uLmNhbGwodGhpcywgZmVhdHVyZSksXG4gICAgICAgICAgICAgIG1hZ2ljS2V5OiByZXN1bHQuYXR0cmlidXRlc1tpZEZpZWxkXSArICc6JyArIGxheWVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKGVycm9yLCBzdWdnZXN0aW9ucy5yZXZlcnNlKCkpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIHJlc3VsdHM6IGZ1bmN0aW9uICh0ZXh0LCBrZXksIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHZhciByZXF1ZXN0O1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgdmFyIGZlYXR1cmVJZCA9IGtleS5zcGxpdCgnOicpWzBdO1xuICAgICAgdmFyIGxheWVyID0ga2V5LnNwbGl0KCc6JylbMV07XG4gICAgICByZXF1ZXN0ID0gdGhpcy5xdWVyeSgpLmxheWVyKGxheWVyKS5mZWF0dXJlSWRzKGZlYXR1cmVJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3QgPSB0aGlzLmZpbmQoKS50ZXh0KHRleHQpLmZpZWxkcyh0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzKS5jb250YWlucyhmYWxzZSkubGF5ZXJzKHRoaXMub3B0aW9ucy5sYXllcnMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIGZlYXR1cmVzLCByZXNwb25zZSkge1xuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICBpZiAocmVzcG9uc2UucmVzdWx0cykge1xuICAgICAgICAgIHJlc3BvbnNlLnJlc3VsdHMgPSByZXNwb25zZS5yZXN1bHRzLnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZlYXR1cmVzLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGZlYXR1cmUgPSBmZWF0dXJlcy5mZWF0dXJlc1tpXTtcbiAgICAgICAgICBsYXllciA9IGxheWVyIHx8IHJlc3BvbnNlLnJlc3VsdHNbaV0ubGF5ZXJJZDtcblxuICAgICAgICAgIGlmIChmZWF0dXJlICYmIGxheWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9mZWF0dXJlQm91bmRzKGZlYXR1cmUpO1xuICAgICAgICAgICAgZmVhdHVyZS5sYXllcklkID0gbGF5ZXI7XG4gICAgICAgICAgICBmZWF0dXJlLmxheWVyTmFtZSA9IHRoaXMuX2xheWVyTmFtZXNbbGF5ZXJdO1xuICAgICAgICAgICAgZmVhdHVyZS5kaXNwbGF5RmllbGROYW1lID0gdGhpcy5fZGlzcGxheUZpZWxkc1tsYXllcl07XG5cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICAgIGxhdGxuZzogYm91bmRzLmdldENlbnRlcigpLFxuICAgICAgICAgICAgICBib3VuZHM6IGJvdW5kcyxcbiAgICAgICAgICAgICAgdGV4dDogdGhpcy5vcHRpb25zLmZvcm1hdFN1Z2dlc3Rpb24uY2FsbCh0aGlzLCBmZWF0dXJlKSxcbiAgICAgICAgICAgICAgcHJvcGVydGllczogZmVhdHVyZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICBnZW9qc29uOiBmZWF0dXJlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKGVycm9yLCByZXN1bHRzLnJldmVyc2UoKSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX2ZlYXR1cmVCb3VuZHM6IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgdmFyIGdlb2pzb24gPSBMLmdlb0pzb24oZmVhdHVyZSk7XG4gICAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgdmFyIGNlbnRlciA9IGdlb2pzb24uZ2V0Qm91bmRzKCkuZ2V0Q2VudGVyKCk7XG4gICAgICB2YXIgbG5nUmFkaXVzID0gKCh0aGlzLm9wdGlvbnMuYnVmZmVyUmFkaXVzIC8gNDAwNzUwMTcpICogMzYwKSAvIE1hdGguY29zKCgxODAgLyBNYXRoLlBJKSAqIGNlbnRlci5sYXQpO1xuICAgICAgdmFyIGxhdFJhZGl1cyA9ICh0aGlzLm9wdGlvbnMuYnVmZmVyUmFkaXVzIC8gNDAwNzUwMTcpICogMzYwO1xuICAgICAgcmV0dXJuIEwubGF0TG5nQm91bmRzKFtjZW50ZXIubGF0IC0gbGF0UmFkaXVzLCBjZW50ZXIubG5nIC0gbG5nUmFkaXVzXSwgW2NlbnRlci5sYXQgKyBsYXRSYWRpdXMsIGNlbnRlci5sbmcgKyBsbmdSYWRpdXNdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdlb2pzb24uZ2V0Qm91bmRzKCk7XG4gICAgfVxuICB9LFxuXG4gIF9sYXllck1ldGFkYXRhQ2FsbGJhY2s6IGZ1bmN0aW9uIChsYXllcmlkKSB7XG4gICAgcmV0dXJuIEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgbWV0YWRhdGEpIHtcbiAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH1cbiAgICAgIHRoaXMuX2Rpc3BsYXlGaWVsZHNbbGF5ZXJpZF0gPSBtZXRhZGF0YS5kaXNwbGF5RmllbGQ7XG4gICAgICB0aGlzLl9sYXllck5hbWVzW2xheWVyaWRdID0gbWV0YWRhdGEubmFtZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0YWRhdGEuZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBmaWVsZCA9IG1ldGFkYXRhLmZpZWxkc1tpXTtcbiAgICAgICAgaWYgKGZpZWxkLnR5cGUgPT09ICdlc3JpRmllbGRUeXBlT0lEJykge1xuICAgICAgICAgIHRoaXMuX2lkRmllbGRzW2xheWVyaWRdID0gZmllbGQubmFtZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIF9nZXRJZEZpZWxkczogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2lkRmllbGRzID0ge307XG4gICAgdGhpcy5fZGlzcGxheUZpZWxkcyA9IHt9O1xuICAgIHRoaXMuX2xheWVyTmFtZXMgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsYXllciA9IHRoaXMub3B0aW9ucy5sYXllcnNbaV07XG4gICAgICB0aGlzLmdldChsYXllciwge30sIHRoaXMuX2xheWVyTWV0YWRhdGFDYWxsYmFjayhsYXllcikpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBTZXJ2aWNlUHJvdmlkZXIgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBNYXBTZXJ2aWNlUHJvdmlkZXIob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcFNlcnZpY2VQcm92aWRlcjtcbiIsImltcG9ydCB7IEdlb2NvZGVTZXJ2aWNlIH0gZnJvbSAnLi4vU2VydmljZXMvR2VvY29kZSc7XG5cbmV4cG9ydCB2YXIgR2VvY29kZVNlcnZpY2VQcm92aWRlciA9IEdlb2NvZGVTZXJ2aWNlLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBsYWJlbDogJ0dlb2NvZGUgU2VydmVyJyxcbiAgICBtYXhSZXN1bHRzOiA1XG4gIH0sXG5cbiAgc3VnZ2VzdGlvbnM6IGZ1bmN0aW9uICh0ZXh0LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gdGhpcy5zdWdnZXN0KCkudGV4dCh0ZXh0KTtcbiAgICAgIGlmIChib3VuZHMpIHtcbiAgICAgICAgcmVxdWVzdC53aXRoaW4oYm91bmRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlcXVlc3QucnVuKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gW107XG4gICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICB3aGlsZSAocmVzcG9uc2Uuc3VnZ2VzdGlvbnMubGVuZ3RoICYmIHN1Z2dlc3Rpb25zLmxlbmd0aCA8PSAodGhpcy5vcHRpb25zLm1heFJlc3VsdHMgLSAxKSkge1xuICAgICAgICAgICAgdmFyIHN1Z2dlc3Rpb24gPSByZXNwb25zZS5zdWdnZXN0aW9ucy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKCFzdWdnZXN0aW9uLmlzQ29sbGVjdGlvbikge1xuICAgICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBzdWdnZXN0aW9uLnRleHQsXG4gICAgICAgICAgICAgICAgbWFnaWNLZXk6IHN1Z2dlc3Rpb24ubWFnaWNLZXlcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBzdWdnZXN0aW9ucyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sodW5kZWZpbmVkLCBbXSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LFxuXG4gIHJlc3VsdHM6IGZ1bmN0aW9uICh0ZXh0LCBrZXksIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxdWVzdCA9IHRoaXMuZ2VvY29kZSgpLnRleHQodGV4dCk7XG5cbiAgICByZXF1ZXN0Lm1heExvY2F0aW9ucyh0aGlzLm9wdGlvbnMubWF4UmVzdWx0cyk7XG5cbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICByZXF1ZXN0LndpdGhpbihib3VuZHMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UucmVzdWx0cyk7XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VvY29kZVNlcnZpY2VQcm92aWRlciAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlb2NvZGVTZXJ2aWNlUHJvdmlkZXI7XG4iLCJleHBvcnQgeyB2ZXJzaW9uIGFzIFZFUlNJT04gfSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuZXhwb3J0IHZhciBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmwgPSAnaHR0cHM6Ly9nZW9jb2RlLmFyY2dpcy5jb20vYXJjZ2lzL3Jlc3Qvc2VydmljZXMvV29ybGQvR2VvY29kZVNlcnZlci8nO1xuXG4vLyBpbXBvcnQgdGFza3NcbmV4cG9ydCB7IEdlb2NvZGUsIGdlb2NvZGUgfSBmcm9tICcuL1Rhc2tzL0dlb2NvZGUnO1xuZXhwb3J0IHsgUmV2ZXJzZUdlb2NvZGUsIHJldmVyc2VHZW9jb2RlIH0gZnJvbSAnLi9UYXNrcy9SZXZlcnNlR2VvY29kZSc7XG5leHBvcnQgeyBTdWdnZXN0LCBzdWdnZXN0IH0gZnJvbSAnLi9UYXNrcy9TdWdnZXN0JztcblxuLy8gaW1wb3J0IHNlcnZpY2VcbmV4cG9ydCB7IEdlb2NvZGVTZXJ2aWNlLCBnZW9jb2RlU2VydmljZSB9IGZyb20gJy4vU2VydmljZXMvR2VvY29kZSc7XG5cbi8vIGltcG9ydCBjb250cm9sXG5leHBvcnQgeyBHZW9zZWFyY2gsIGdlb3NlYXJjaCB9IGZyb20gJy4vQ29udHJvbHMvR2Vvc2VhcmNoJztcblxuLy8gaW1wb3J0IHN1cHBvcnRpbmcgY2xhc3NcbmV4cG9ydCB7IEdlb3NlYXJjaENvcmUsIGdlb3NlYXJjaENvcmUgfSBmcm9tICcuL0NsYXNzZXMvR2Vvc2VhcmNoQ29yZSc7XG5cbi8vIGltcG9ydCBwcm92aWRlcnNcbmV4cG9ydCB7IEFyY2dpc09ubGluZVByb3ZpZGVyLCBhcmNnaXNPbmxpbmVQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL0FyY2dpc09ubGluZUdlb2NvZGVyJztcbmV4cG9ydCB7IEZlYXR1cmVMYXllclByb3ZpZGVyLCBmZWF0dXJlTGF5ZXJQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL0ZlYXR1cmVMYXllcic7XG5leHBvcnQgeyBNYXBTZXJ2aWNlUHJvdmlkZXIsIG1hcFNlcnZpY2VQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL01hcFNlcnZpY2UnO1xuZXhwb3J0IHsgR2VvY29kZVNlcnZpY2VQcm92aWRlciwgZ2VvY29kZVNlcnZpY2VQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL0dlb2NvZGVTZXJ2aWNlJztcbiJdLCJuYW1lcyI6WyJUYXNrIiwiVXRpbCIsIlNlcnZpY2UiLCJGZWF0dXJlTGF5ZXJTZXJ2aWNlIiwiTWFwU2VydmljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztDQ0lPLElBQUksT0FBTyxHQUFHQSxnQkFBSSxDQUFDLE1BQU0sQ0FBQztBQUNqQyxDQUFBLEVBQUUsSUFBSSxFQUFFLE1BQU07O0FBRWQsQ0FBQSxFQUFFLE1BQU0sRUFBRTtBQUNWLENBQUEsSUFBSSxLQUFLLEVBQUUsSUFBSTtBQUNmLENBQUEsSUFBSSxVQUFVLEVBQUUsS0FBSztBQUNyQixDQUFBLElBQUksU0FBUyxFQUFFLEdBQUc7QUFDbEIsQ0FBQSxJQUFJLFlBQVksRUFBRSxFQUFFO0FBQ3BCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsT0FBTyxFQUFFO0FBQ1gsQ0FBQSxJQUFJLFNBQVMsRUFBRSxTQUFTO0FBQ3hCLENBQUEsSUFBSSxjQUFjLEVBQUUsY0FBYztBQUNsQyxDQUFBLElBQUksTUFBTSxFQUFFLE1BQU07QUFDbEIsQ0FBQSxJQUFJLFdBQVcsRUFBRSxXQUFXO0FBQzVCLENBQUEsSUFBSSxRQUFRLEVBQUUsUUFBUTtBQUN0QixDQUFBLElBQUksUUFBUSxFQUFFLFFBQVE7QUFDdEIsQ0FBQSxJQUFJLFNBQVMsRUFBRSxTQUFTO0FBQ3hCLENBQUEsSUFBSSxNQUFNLEVBQUUsTUFBTTtBQUNsQixDQUFBLElBQUksVUFBVSxFQUFFLFVBQVU7QUFDMUIsQ0FBQSxJQUFJLE9BQU8sRUFBRSxPQUFPO0FBQ3BCLENBQUEsSUFBSSxLQUFLLEVBQUUsVUFBVTtBQUNyQixDQUFBLElBQUksUUFBUSxFQUFFLFdBQVc7QUFDekIsQ0FBQSxJQUFJLFlBQVksRUFBRSxZQUFZO0FBQzlCLENBQUEsSUFBSSxjQUFjLEVBQUUsY0FBYztBQUNsQyxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFVBQVUsRUFBRSxVQUFVLE9BQU8sRUFBRTtBQUNqQyxDQUFBLElBQUksT0FBTyxHQUFH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