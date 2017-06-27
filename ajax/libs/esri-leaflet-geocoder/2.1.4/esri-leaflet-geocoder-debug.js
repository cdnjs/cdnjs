/* esri-leaflet-geocoder - v2.1.4 - Wed Sep 21 2016 10:29:05 GMT-0700 (PDT)
 * Copyright (c) 2016 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet'), require('esri-leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet', 'esri-leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Geocoding = global.L.esri.Geocoding || {}),global.L,global.L.esri));
}(this, function (exports,L,esriLeaflet) { 'use strict';

	L = 'default' in L ? L['default'] : L;

	var version = "2.1.4";

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
	    if (this.options.customParam) {
	      this.path = 'findAddressCandidates';
	      this.params[this.options.customParam] = this.params.text;
	      delete this.params.text;
	    } else {
	      this.path = (this.params.text) ? 'find' : 'findAddressCandidates';
	    }

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
	      if (candidate.extent) {
	        var bounds = esriLeaflet.Util.extentToBounds(candidate.extent);
	      }

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
	    countries: 'countryCode',
	    maxSuggestions: 'maxSuggestions'
	  },

	  initialize: function (options) {
	    options = options || {};
	    if (!options.url) {
	      options.url = WorldGeocodingServiceUrl;
	      options.supportsSuggest = true;
	    }
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
	    if (this.options.supportsSuggest) {
	      return this.request(function (error, response) {
	        callback.call(context, error, response, response);
	      }, this);
	    } else {
	      console.warn('this geocoding service does not support asking for suggestions');
	    }
	  }

	});

	function suggest (options) {
	  return new Suggest(options);
	}

	var GeocodeService = esriLeaflet.Service.extend({
	  initialize: function (options) {
	    options = options || {};
	    if (options.url) {
	      esriLeaflet.Service.prototype.initialize.call(this, options);
	      this._confirmSuggestSupport();
	    } else {
	      options.url = WorldGeocodingServiceUrl;
	      options.supportsSuggest = true;
	      esriLeaflet.Service.prototype.initialize.call(this, options);
	    }
	  },

	  geocode: function () {
	    return geocode(this);
	  },

	  reverse: function () {
	    return reverseGeocode(this);
	  },

	  suggest: function () {
	    // requires either the Esri World Geocoding Service or a <10.3 ArcGIS Server Geocoding Service that supports suggest.
	    return suggest(this);
	  },

	  _confirmSuggestSupport: function () {
	    this.metadata(function (error, response) {
	      if (error) { return; }
	      // pre 10.3 geocoding services dont list capabilities (and dont support maxLocations)
	      // since, only SOME individual services have been configured to support asking for suggestions
	      if (!response.capabilities) {
	        this.options.supportsSuggest = false;
	        this.options.customParam = response.singleLineAddressField.name;
	      } else if (response.capabilities.indexOf('Suggest') > -1) {
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

	        if (suggestions.length) {
	          for (i = 0; i < suggestions.length; i++) {
	            suggestions[i].provider = provider;
	          }
	        } else {
	          // we still need to update the UI
	          this._control._renderSuggestions(suggestions);
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

	var ArcgisOnlineProvider = GeocodeService.extend({
	  options: {
	    label: 'Places and Addresses',
	    maxResults: 5
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

	    // 15 is the maximum number of suggestions that can be returned
	    request.maxSuggestions(this.options.maxResults);

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
	    }
	    // in the future Address/StreetName geocoding requests that include a magicKey will only return one match
	    request.maxLocations(this.options.maxResults);

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
	      options = {};
	      options.providers = [ arcgisOnlineProvider() ];
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
	    // include 'Powered by Esri' in map attribution
	    esriLeaflet.Util.setEsriAttribution(map);

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
	  }
	});

	function geosearch (options) {
	  return new Geosearch(options);
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

	    if (this.options.where) {
	      return this.options.where + ' AND (' + queryString.join(' OR ') + ')';
	    } else {
	      return queryString.join(' OR ');
	    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvVGFza3MvR2VvY29kZS5qcyIsIi4uL3NyYy9UYXNrcy9SZXZlcnNlR2VvY29kZS5qcyIsIi4uL3NyYy9UYXNrcy9TdWdnZXN0LmpzIiwiLi4vc3JjL1NlcnZpY2VzL0dlb2NvZGUuanMiLCIuLi9zcmMvQ2xhc3Nlcy9HZW9zZWFyY2hDb3JlLmpzIiwiLi4vc3JjL1Byb3ZpZGVycy9BcmNnaXNPbmxpbmVHZW9jb2Rlci5qcyIsIi4uL3NyYy9Db250cm9scy9HZW9zZWFyY2guanMiLCIuLi9zcmMvUHJvdmlkZXJzL0ZlYXR1cmVMYXllci5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvTWFwU2VydmljZS5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvR2VvY29kZVNlcnZpY2UuanMiLCIuLi9zcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXQtZ2VvY29kZXJcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkVzcmkgR2VvY29kaW5nIHV0aWxpdHkgYW5kIHNlYXJjaCBwbHVnaW4gZm9yIExlYWZsZXQuXCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMS40XCIsXG4gIFwiYXV0aG9yXCI6IFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gIFwiY29udHJpYnV0b3JzXCI6IFtcbiAgICBcIlBhdHJpY2sgQXJsdCA8cGFybHRAZXNyaS5jb20+IChodHRwOi8vcGF0cmlja2FybHQuY29tKVwiLFxuICAgIFwiSm9obiBHcmF2b2lzIDxqZ3Jhdm9pc0Blc3JpLmNvbT4gKGh0dHA6Ly9qb2huZ3Jhdm9pcy5jb20pXCJcbiAgXSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZXNyaS1sZWFmbGV0XCI6IFwiXjIuMC4zXCIsXG4gICAgXCJsZWFmbGV0XCI6IFwiXjEuMC4wLXJjLjNcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjaGFpXCI6IFwiMi4zLjBcIixcbiAgICBcImdoLXJlbGVhc2VcIjogXCJeMi4wLjBcIixcbiAgICBcImh0dHAtc2VydmVyXCI6IFwiXjAuOC41XCIsXG4gICAgXCJpbWFnZW1pblwiOiBcIl4zLjIuMFwiLFxuICAgIFwiaXNwYXJ0YVwiOiBcIl4zLjAuM1wiLFxuICAgIFwiaXN0YW5idWxcIjogXCJeMC40LjJcIixcbiAgICBcImthcm1hXCI6IFwiXjAuMTIuMjRcIixcbiAgICBcImthcm1hLWNoYWktc2lub25cIjogXCJeMC4xLjNcIixcbiAgICBcImthcm1hLWNvdmVyYWdlXCI6IFwiXjAuNS4zXCIsXG4gICAgXCJrYXJtYS1tb2NoYVwiOiBcIl4wLjEuMFwiLFxuICAgIFwia2FybWEtbW9jaGEtcmVwb3J0ZXJcIjogXCJeMC4yLjVcIixcbiAgICBcImthcm1hLXBoYW50b21qcy1sYXVuY2hlclwiOiBcIl4wLjIuMFwiLFxuICAgIFwia2FybWEtc291cmNlbWFwLWxvYWRlclwiOiBcIl4wLjMuNVwiLFxuICAgIFwibWtkaXJwXCI6IFwiXjAuNS4xXCIsXG4gICAgXCJtb2NoYVwiOiBcIl4yLjMuNFwiLFxuICAgIFwibm9kZS1zYXNzXCI6IFwiXjMuMi4wXCIsXG4gICAgXCJwaGFudG9tanNcIjogXCJeMS45LjE3XCIsXG4gICAgXCJyb2xsdXBcIjogXCJeMC4yNS40XCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLWpzb25cIjogXCJeMi4wLjBcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tbm9kZS1yZXNvbHZlXCI6IFwiXjEuNC4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLXVnbGlmeVwiOiBcIl4wLjMuMVwiLFxuICAgIFwic2VtaXN0YW5kYXJkXCI6IFwiXjcuMC41XCIsXG4gICAgXCJzaW5vblwiOiBcIl4xLjExLjFcIixcbiAgICBcInNpbm9uLWNoYWlcIjogXCIyLjcuMFwiLFxuICAgIFwidWdsaWZ5LWpzXCI6IFwiXjIuNi4xXCIsXG4gICAgXCJ3YXRjaFwiOiBcIl4wLjE3LjFcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvZXNyaS1sZWFmbGV0LWdlb2NvZGVyXCIsXG4gIFwianNuZXh0Om1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanNcIixcbiAgXCJqc3BtXCI6IHtcbiAgICBcInJlZ2lzdHJ5XCI6IFwibnBtXCIsXG4gICAgXCJmb3JtYXRcIjogXCJlczZcIixcbiAgICBcIm1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanNcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJBcGFjaGUtMi4wXCIsXG4gIFwibWFpblwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzXCIsXG4gIFwiYnJvd3NlclwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzXCIsXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdEBnaXRodWIuY29tOkVzcmkvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLmdpdFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJwcmVidWlsZFwiOiBcIm1rZGlycCBkaXN0XCIsXG4gICAgXCJidWlsZFwiOiBcInJvbGx1cCAtYyBwcm9maWxlcy9kZWJ1Zy5qcyAmIHJvbGx1cCAtYyBwcm9maWxlcy9wcm9kdWN0aW9uLmpzICYgbnBtIHJ1biBjc3MgJiBucG0gcnVuIGltZ1wiLFxuICAgIFwiY3NzXCI6IFwibm9kZS1zYXNzIC4vc3JjL2VzcmktbGVhZmxldC1nZW9jb2Rlci5jc3MgLi9kaXN0L2VzcmktbGVhZmxldC1nZW9jb2Rlci5jc3MgLS1vdXRwdXQtc3R5bGUgY29tcHJlc3NlZFwiLFxuICAgIFwiaW1nXCI6IFwiaW1hZ2VtaW4gLi9zcmMvaW1nIC4vZGlzdC9pbWdcIixcbiAgICBcImxpbnRcIjogXCJzZW1pc3RhbmRhcmQgc3JjLyoqLyouanNcIixcbiAgICBcInByZXB1Ymxpc2hcIjogXCJucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV0ZXN0XCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIi4vc2NyaXB0cy9yZWxlYXNlLnNoXCIsXG4gICAgXCJzdGFydFwiOiBcIndhdGNoIFxcXCJucG0gcnVuIGJ1aWxkXFxcIiBzcmMgJiBodHRwLXNlcnZlciAtcCA1Njc4IC1jLTEgLW9cIixcbiAgICBcInRlc3RcIjogXCJucG0gcnVuIGxpbnQgJiYga2FybWEgc3RhcnRcIlxuICB9LFxuICBcInN0eWxlXCI6IFwiLi9kaXN0L2VzcmktbGVhZmxldC1nZW9jb2Rlci5jc3NcIlxufVxuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBUYXNrLCBVdGlsIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcbmltcG9ydCB7IFdvcmxkR2VvY29kaW5nU2VydmljZVVybCB9IGZyb20gJy4uL0VzcmlMZWFmbGV0R2VvY29kaW5nJztcblxuZXhwb3J0IHZhciBHZW9jb2RlID0gVGFzay5leHRlbmQoe1xuICBwYXRoOiAnZmluZCcsXG5cbiAgcGFyYW1zOiB7XG4gICAgb3V0U3I6IDQzMjYsXG4gICAgZm9yU3RvcmFnZTogZmFsc2UsXG4gICAgb3V0RmllbGRzOiAnKicsXG4gICAgbWF4TG9jYXRpb25zOiAyMFxuICB9LFxuXG4gIHNldHRlcnM6IHtcbiAgICAnYWRkcmVzcyc6ICdhZGRyZXNzJyxcbiAgICAnbmVpZ2hib3Job29kJzogJ25laWdoYm9yaG9vZCcsXG4gICAgJ2NpdHknOiAnY2l0eScsXG4gICAgJ3N1YnJlZ2lvbic6ICdzdWJyZWdpb24nLFxuICAgICdyZWdpb24nOiAncmVnaW9uJyxcbiAgICAncG9zdGFsJzogJ3Bvc3RhbCcsXG4gICAgJ2NvdW50cnknOiAnY291bnRyeScsXG4gICAgJ3RleHQnOiAndGV4dCcsXG4gICAgJ2NhdGVnb3J5JzogJ2NhdGVnb3J5JyxcbiAgICAndG9rZW4nOiAndG9rZW4nLFxuICAgICdrZXknOiAnbWFnaWNLZXknLFxuICAgICdmaWVsZHMnOiAnb3V0RmllbGRzJyxcbiAgICAnZm9yU3RvcmFnZSc6ICdmb3JTdG9yYWdlJyxcbiAgICAnbWF4TG9jYXRpb25zJzogJ21heExvY2F0aW9ucydcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMudXJsID0gb3B0aW9ucy51cmwgfHwgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsO1xuICAgIFRhc2sucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICB3aXRoaW46IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhib3VuZHMpO1xuICAgIHRoaXMucGFyYW1zLmJib3ggPSBVdGlsLmJvdW5kc1RvRXh0ZW50KGJvdW5kcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgbmVhcmJ5OiBmdW5jdGlvbiAobGF0bG5nLCByYWRpdXMpIHtcbiAgICBsYXRsbmcgPSBMLmxhdExuZyhsYXRsbmcpO1xuICAgIHRoaXMucGFyYW1zLmxvY2F0aW9uID0gbGF0bG5nLmxuZyArICcsJyArIGxhdGxuZy5sYXQ7XG4gICAgdGhpcy5wYXJhbXMuZGlzdGFuY2UgPSBNYXRoLm1pbihNYXRoLm1heChyYWRpdXMsIDIwMDApLCA1MDAwMCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcnVuOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmN1c3RvbVBhcmFtKSB7XG4gICAgICB0aGlzLnBhdGggPSAnZmluZEFkZHJlc3NDYW5kaWRhdGVzJztcbiAgICAgIHRoaXMucGFyYW1zW3RoaXMub3B0aW9ucy5jdXN0b21QYXJhbV0gPSB0aGlzLnBhcmFtcy50ZXh0O1xuICAgICAgZGVsZXRlIHRoaXMucGFyYW1zLnRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGF0aCA9ICh0aGlzLnBhcmFtcy50ZXh0KSA/ICdmaW5kJyA6ICdmaW5kQWRkcmVzc0NhbmRpZGF0ZXMnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhdGggPT09ICdmaW5kQWRkcmVzc0NhbmRpZGF0ZXMnICYmIHRoaXMucGFyYW1zLmJib3gpIHtcbiAgICAgIHRoaXMucGFyYW1zLnNlYXJjaEV4dGVudCA9IHRoaXMucGFyYW1zLmJib3g7XG4gICAgICBkZWxldGUgdGhpcy5wYXJhbXMuYmJveDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIHZhciBwcm9jZXNzb3IgPSAodGhpcy5wYXRoID09PSAnZmluZCcpID8gdGhpcy5fcHJvY2Vzc0ZpbmRSZXNwb25zZSA6IHRoaXMuX3Byb2Nlc3NGaW5kQWRkcmVzc0NhbmRpZGF0ZXNSZXNwb25zZTtcbiAgICAgIHZhciByZXN1bHRzID0gKCFlcnJvcikgPyBwcm9jZXNzb3IocmVzcG9uc2UpIDogdW5kZWZpbmVkO1xuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgeyByZXN1bHRzOiByZXN1bHRzIH0sIHJlc3BvbnNlKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBfcHJvY2Vzc0ZpbmRSZXNwb25zZTogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzcG9uc2UubG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbG9jYXRpb24gPSByZXNwb25zZS5sb2NhdGlvbnNbaV07XG4gICAgICB2YXIgYm91bmRzO1xuXG4gICAgICBpZiAobG9jYXRpb24uZXh0ZW50KSB7XG4gICAgICAgIGJvdW5kcyA9IFV0aWwuZXh0ZW50VG9Cb3VuZHMobG9jYXRpb24uZXh0ZW50KTtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgdGV4dDogbG9jYXRpb24ubmFtZSxcbiAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgIHNjb3JlOiBsb2NhdGlvbi5mZWF0dXJlLmF0dHJpYnV0ZXMuU2NvcmUsXG4gICAgICAgIGxhdGxuZzogTC5sYXRMbmcobG9jYXRpb24uZmVhdHVyZS5nZW9tZXRyeS55LCBsb2NhdGlvbi5mZWF0dXJlLmdlb21ldHJ5LngpLFxuICAgICAgICBwcm9wZXJ0aWVzOiBsb2NhdGlvbi5mZWF0dXJlLmF0dHJpYnV0ZXNcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9LFxuXG4gIF9wcm9jZXNzRmluZEFkZHJlc3NDYW5kaWRhdGVzUmVzcG9uc2U6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjYW5kaWRhdGUgPSByZXNwb25zZS5jYW5kaWRhdGVzW2ldO1xuICAgICAgaWYgKGNhbmRpZGF0ZS5leHRlbnQpIHtcbiAgICAgICAgdmFyIGJvdW5kcyA9IFV0aWwuZXh0ZW50VG9Cb3VuZHMoY2FuZGlkYXRlLmV4dGVudCk7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgIHRleHQ6IGNhbmRpZGF0ZS5hZGRyZXNzLFxuICAgICAgICBib3VuZHM6IGJvdW5kcyxcbiAgICAgICAgc2NvcmU6IGNhbmRpZGF0ZS5zY29yZSxcbiAgICAgICAgbGF0bG5nOiBMLmxhdExuZyhjYW5kaWRhdGUubG9jYXRpb24ueSwgY2FuZGlkYXRlLmxvY2F0aW9uLngpLFxuICAgICAgICBwcm9wZXJ0aWVzOiBjYW5kaWRhdGUuYXR0cmlidXRlc1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9jb2RlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgR2VvY29kZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2VvY29kZTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5pbXBvcnQgeyBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmwgfSBmcm9tICcuLi9Fc3JpTGVhZmxldEdlb2NvZGluZyc7XG5cbmV4cG9ydCB2YXIgUmV2ZXJzZUdlb2NvZGUgPSBUYXNrLmV4dGVuZCh7XG4gIHBhdGg6ICdyZXZlcnNlR2VvY29kZScsXG5cbiAgcGFyYW1zOiB7XG4gICAgb3V0U1I6IDQzMjYsXG4gICAgcmV0dXJuSW50ZXJzZWN0aW9uOiBmYWxzZVxuICB9LFxuXG4gIHNldHRlcnM6IHtcbiAgICAnZGlzdGFuY2UnOiAnZGlzdGFuY2UnLFxuICAgICdsYW5ndWFnZSc6ICdsYW5nQ29kZScsXG4gICAgJ2ludGVyc2VjdGlvbic6ICdyZXR1cm5JbnRlcnNlY3Rpb24nXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLnVybCA9IG9wdGlvbnMudXJsIHx8IFdvcmxkR2VvY29kaW5nU2VydmljZVVybDtcbiAgICBUYXNrLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gIH0sXG5cbiAgbGF0bG5nOiBmdW5jdGlvbiAobGF0bG5nKSB7XG4gICAgbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGxhdGxuZy5sbmcgKyAnLCcgKyBsYXRsbmcubGF0O1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICBsYXRsbmc6IEwubGF0TG5nKHJlc3BvbnNlLmxvY2F0aW9uLnksIHJlc3BvbnNlLmxvY2F0aW9uLngpLFxuICAgICAgICAgIGFkZHJlc3M6IHJlc3BvbnNlLmFkZHJlc3NcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzdWx0LCByZXNwb25zZSk7XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZUdlb2NvZGUgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBSZXZlcnNlR2VvY29kZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmV2ZXJzZUdlb2NvZGU7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFRhc2ssIFV0aWwgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuaW1wb3J0IHsgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsIH0gZnJvbSAnLi4vRXNyaUxlYWZsZXRHZW9jb2RpbmcnO1xuXG5leHBvcnQgdmFyIFN1Z2dlc3QgPSBUYXNrLmV4dGVuZCh7XG4gIHBhdGg6ICdzdWdnZXN0JyxcblxuICBwYXJhbXM6IHt9LFxuXG4gIHNldHRlcnM6IHtcbiAgICB0ZXh0OiAndGV4dCcsXG4gICAgY2F0ZWdvcnk6ICdjYXRlZ29yeScsXG4gICAgY291bnRyaWVzOiAnY291bnRyeUNvZGUnLFxuICAgIG1heFN1Z2dlc3Rpb25zOiAnbWF4U3VnZ2VzdGlvbnMnXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoIW9wdGlvbnMudXJsKSB7XG4gICAgICBvcHRpb25zLnVybCA9IFdvcmxkR2VvY29kaW5nU2VydmljZVVybDtcbiAgICAgIG9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0ID0gdHJ1ZTtcbiAgICB9XG4gICAgVGFzay5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIHdpdGhpbjogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKGJvdW5kcyk7XG4gICAgYm91bmRzID0gYm91bmRzLnBhZCgwLjUpO1xuICAgIHZhciBjZW50ZXIgPSBib3VuZHMuZ2V0Q2VudGVyKCk7XG4gICAgdmFyIG5lID0gYm91bmRzLmdldE5vcnRoV2VzdCgpO1xuICAgIHRoaXMucGFyYW1zLmxvY2F0aW9uID0gY2VudGVyLmxuZyArICcsJyArIGNlbnRlci5sYXQ7XG4gICAgdGhpcy5wYXJhbXMuZGlzdGFuY2UgPSBNYXRoLm1pbihNYXRoLm1heChjZW50ZXIuZGlzdGFuY2VUbyhuZSksIDIwMDApLCA1MDAwMCk7XG4gICAgdGhpcy5wYXJhbXMuc2VhcmNoRXh0ZW50ID0gVXRpbC5ib3VuZHNUb0V4dGVudChib3VuZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG5lYXJieTogZnVuY3Rpb24gKGxhdGxuZywgcmFkaXVzKSB7XG4gICAgbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGxhdGxuZy5sbmcgKyAnLCcgKyBsYXRsbmcubGF0O1xuICAgIHRoaXMucGFyYW1zLmRpc3RhbmNlID0gTWF0aC5taW4oTWF0aC5tYXgocmFkaXVzLCAyMDAwKSwgNTAwMDApO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSwgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybigndGhpcyBnZW9jb2Rpbmcgc2VydmljZSBkb2VzIG5vdCBzdXBwb3J0IGFza2luZyBmb3Igc3VnZ2VzdGlvbnMnKTtcbiAgICB9XG4gIH1cblxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWdnZXN0IChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgU3VnZ2VzdChvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3VnZ2VzdDtcbiIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuaW1wb3J0IHsgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsIH0gZnJvbSAnLi4vRXNyaUxlYWZsZXRHZW9jb2RpbmcnO1xuaW1wb3J0IGdlb2NvZGUgZnJvbSAnLi4vVGFza3MvR2VvY29kZSc7XG5pbXBvcnQgcmV2ZXJzZUdlb2NvZGUgZnJvbSAnLi4vVGFza3MvUmV2ZXJzZUdlb2NvZGUnO1xuaW1wb3J0IHN1Z2dlc3QgZnJvbSAnLi4vVGFza3MvU3VnZ2VzdCc7XG5cbmV4cG9ydCB2YXIgR2VvY29kZVNlcnZpY2UgPSBTZXJ2aWNlLmV4dGVuZCh7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKG9wdGlvbnMudXJsKSB7XG4gICAgICBTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICB0aGlzLl9jb25maXJtU3VnZ2VzdFN1cHBvcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy51cmwgPSBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmw7XG4gICAgICBvcHRpb25zLnN1cHBvcnRzU3VnZ2VzdCA9IHRydWU7XG4gICAgICBTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfVxuICB9LFxuXG4gIGdlb2NvZGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2VvY29kZSh0aGlzKTtcbiAgfSxcblxuICByZXZlcnNlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJldmVyc2VHZW9jb2RlKHRoaXMpO1xuICB9LFxuXG4gIHN1Z2dlc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyByZXF1aXJlcyBlaXRoZXIgdGhlIEVzcmkgV29ybGQgR2VvY29kaW5nIFNlcnZpY2Ugb3IgYSA8MTAuMyBBcmNHSVMgU2VydmVyIEdlb2NvZGluZyBTZXJ2aWNlIHRoYXQgc3VwcG9ydHMgc3VnZ2VzdC5cbiAgICByZXR1cm4gc3VnZ2VzdCh0aGlzKTtcbiAgfSxcblxuICBfY29uZmlybVN1Z2dlc3RTdXBwb3J0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5tZXRhZGF0YShmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9XG4gICAgICAvLyBwcmUgMTAuMyBnZW9jb2Rpbmcgc2VydmljZXMgZG9udCBsaXN0IGNhcGFiaWxpdGllcyAoYW5kIGRvbnQgc3VwcG9ydCBtYXhMb2NhdGlvbnMpXG4gICAgICAvLyBzaW5jZSwgb25seSBTT01FIGluZGl2aWR1YWwgc2VydmljZXMgaGF2ZSBiZWVuIGNvbmZpZ3VyZWQgdG8gc3VwcG9ydCBhc2tpbmcgZm9yIHN1Z2dlc3Rpb25zXG4gICAgICBpZiAoIXJlc3BvbnNlLmNhcGFiaWxpdGllcykge1xuICAgICAgICB0aGlzLm9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMub3B0aW9ucy5jdXN0b21QYXJhbSA9IHJlc3BvbnNlLnNpbmdsZUxpbmVBZGRyZXNzRmllbGQubmFtZTtcbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuY2FwYWJpbGl0aWVzLmluZGV4T2YoJ1N1Z2dlc3QnKSA+IC0xKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnN1cHBvcnRzU3VnZ2VzdCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2NvZGVTZXJ2aWNlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgR2VvY29kZVNlcnZpY2Uob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlb2NvZGVTZXJ2aWNlO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5cbmV4cG9ydCB2YXIgR2Vvc2VhcmNoQ29yZSA9IEwuRXZlbnRlZC5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICB6b29tVG9SZXN1bHQ6IHRydWUsXG4gICAgdXNlTWFwQm91bmRzOiAxMixcbiAgICBzZWFyY2hCb3VuZHM6IG51bGxcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoY29udHJvbCwgb3B0aW9ucykge1xuICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2NvbnRyb2wgPSBjb250cm9sO1xuXG4gICAgaWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLnByb3ZpZGVycyB8fCAhb3B0aW9ucy5wcm92aWRlcnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgYXQgbGVhc3Qgb25lIHByb3ZpZGVyJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fcHJvdmlkZXJzID0gb3B0aW9ucy5wcm92aWRlcnM7XG4gIH0sXG5cbiAgX2dlb2NvZGU6IGZ1bmN0aW9uICh0ZXh0LCBrZXksIHByb3ZpZGVyKSB7XG4gICAgdmFyIGFjdGl2ZVJlcXVlc3RzID0gMDtcbiAgICB2YXIgYWxsUmVzdWx0cyA9IFtdO1xuICAgIHZhciBib3VuZHM7XG5cbiAgICB2YXIgY2FsbGJhY2sgPSBMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMpIHtcbiAgICAgIGFjdGl2ZVJlcXVlc3RzLS07XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzdWx0cykge1xuICAgICAgICBhbGxSZXN1bHRzID0gYWxsUmVzdWx0cy5jb25jYXQocmVzdWx0cyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3RpdmVSZXF1ZXN0cyA8PSAwKSB7XG4gICAgICAgIGJvdW5kcyA9IHRoaXMuX2JvdW5kc0Zyb21SZXN1bHRzKGFsbFJlc3VsdHMpO1xuXG4gICAgICAgIHRoaXMuZmlyZSgncmVzdWx0cycsIHtcbiAgICAgICAgICByZXN1bHRzOiBhbGxSZXN1bHRzLFxuICAgICAgICAgIGJvdW5kczogYm91bmRzLFxuICAgICAgICAgIGxhdGxuZzogKGJvdW5kcykgPyBib3VuZHMuZ2V0Q2VudGVyKCkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgdGV4dDogdGV4dFxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnpvb21Ub1Jlc3VsdCAmJiBib3VuZHMpIHtcbiAgICAgICAgICB0aGlzLl9jb250cm9sLl9tYXAuZml0Qm91bmRzKGJvdW5kcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZpcmUoJ2xvYWQnKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGFjdGl2ZVJlcXVlc3RzKys7XG4gICAgICBwcm92aWRlci5yZXN1bHRzKHRleHQsIGtleSwgdGhpcy5fc2VhcmNoQm91bmRzKCksIGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9wcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYWN0aXZlUmVxdWVzdHMrKztcbiAgICAgICAgdGhpcy5fcHJvdmlkZXJzW2ldLnJlc3VsdHModGV4dCwga2V5LCB0aGlzLl9zZWFyY2hCb3VuZHMoKSwgY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfc3VnZ2VzdDogZnVuY3Rpb24gKHRleHQpIHtcbiAgICB2YXIgYWN0aXZlUmVxdWVzdHMgPSB0aGlzLl9wcm92aWRlcnMubGVuZ3RoO1xuXG4gICAgdmFyIGNyZWF0ZUNhbGxiYWNrID0gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKHRleHQsIHByb3ZpZGVyKSB7XG4gICAgICByZXR1cm4gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBzdWdnZXN0aW9ucykge1xuICAgICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgYWN0aXZlUmVxdWVzdHMgPSBhY3RpdmVSZXF1ZXN0cyAtIDE7XG5cbiAgICAgICAgaWYgKHRleHQubGVuZ3RoIDwgMikge1xuICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN1Z2dlc3Rpb25zLmxlbmd0aCkge1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzdWdnZXN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc3VnZ2VzdGlvbnNbaV0ucHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gd2Ugc3RpbGwgbmVlZCB0byB1cGRhdGUgdGhlIFVJXG4gICAgICAgICAgdGhpcy5fY29udHJvbC5fcmVuZGVyU3VnZ2VzdGlvbnMoc3VnZ2VzdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3ZpZGVyLl9sYXN0UmVuZGVyICE9PSB0ZXh0ICYmIHByb3ZpZGVyLm5vZGVzKSB7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IHByb3ZpZGVyLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvdmlkZXIubm9kZXNbaV0ucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICB0aGlzLl9jb250cm9sLl9zdWdnZXN0aW9ucy5yZW1vdmVDaGlsZChwcm92aWRlci5ub2Rlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcHJvdmlkZXIubm9kZXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdWdnZXN0aW9ucy5sZW5ndGggJiYgdGhpcy5fY29udHJvbC5faW5wdXQudmFsdWUgPT09IHRleHQpIHtcbiAgICAgICAgICB0aGlzLl9jb250cm9sLmNsZWFyU3VnZ2VzdGlvbnMocHJvdmlkZXIubm9kZXMpO1xuXG4gICAgICAgICAgcHJvdmlkZXIuX2xhc3RSZW5kZXIgPSB0ZXh0O1xuICAgICAgICAgIHByb3ZpZGVyLm5vZGVzID0gdGhpcy5fY29udHJvbC5fcmVuZGVyU3VnZ2VzdGlvbnMoc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgIHRoaXMuX2NvbnRyb2wuX25vZGVzID0gW107XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgdGhpcy5fcGVuZGluZ1N1Z2dlc3Rpb25zID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3Byb3ZpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHByb3ZpZGVyID0gdGhpcy5fcHJvdmlkZXJzW2ldO1xuICAgICAgdmFyIHJlcXVlc3QgPSBwcm92aWRlci5zdWdnZXN0aW9ucyh0ZXh0LCB0aGlzLl9zZWFyY2hCb3VuZHMoKSwgY3JlYXRlQ2FsbGJhY2sodGV4dCwgcHJvdmlkZXIpKTtcbiAgICAgIHRoaXMuX3BlbmRpbmdTdWdnZXN0aW9ucy5wdXNoKHJlcXVlc3QpO1xuICAgIH1cbiAgfSxcblxuICBfc2VhcmNoQm91bmRzOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zZWFyY2hCb3VuZHMgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2VhcmNoQm91bmRzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlTWFwQm91bmRzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy51c2VNYXBCb3VuZHMgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb250cm9sLl9tYXAuZ2V0Qm91bmRzKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy51c2VNYXBCb3VuZHMgPD0gdGhpcy5fY29udHJvbC5fbWFwLmdldFpvb20oKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2wuX21hcC5nZXRCb3VuZHMoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICBfYm91bmRzRnJvbVJlc3VsdHM6IGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgaWYgKCFyZXN1bHRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBudWxsSXNsYW5kID0gTC5sYXRMbmdCb3VuZHMoWzAsIDBdLCBbMCwgMF0pO1xuICAgIHZhciByZXN1bHRCb3VuZHMgPSBbXTtcbiAgICB2YXIgcmVzdWx0TGF0bG5ncyA9IFtdO1xuXG4gICAgLy8gY29sbGVjdCB0aGUgYm91bmRzIGFuZCBjZW50ZXIgb2YgZWFjaCByZXN1bHRcbiAgICBmb3IgKHZhciBpID0gcmVzdWx0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIHJlc3VsdCA9IHJlc3VsdHNbaV07XG5cbiAgICAgIHJlc3VsdExhdGxuZ3MucHVzaChyZXN1bHQubGF0bG5nKTtcblxuICAgICAgLy8gbWFrZSBzdXJlIGJvdW5kcyBhcmUgdmFsaWQgYW5kIG5vdCAwLDAuIHNvbWV0aW1lcyBib3VuZHMgYXJlIGluY29ycmVjdCBvciBub3QgcHJlc2VudFxuICAgICAgaWYgKHJlc3VsdC5ib3VuZHMgJiYgcmVzdWx0LmJvdW5kcy5pc1ZhbGlkKCkgJiYgIXJlc3VsdC5ib3VuZHMuZXF1YWxzKG51bGxJc2xhbmQpKSB7XG4gICAgICAgIHJlc3VsdEJvdW5kcy5wdXNoKHJlc3VsdC5ib3VuZHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZvcm0gYSBib3VuZHMgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIGNlbnRlciBwb2ludHNcbiAgICB2YXIgYm91bmRzID0gTC5sYXRMbmdCb3VuZHMocmVzdWx0TGF0bG5ncyk7XG5cbiAgICAvLyBhbmQgZXh0ZW5kIGl0IHRvIGNvbnRhaW4gYWxsIGJvdW5kcyBvYmplY3RzXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXN1bHRCb3VuZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGJvdW5kcy5leHRlbmQocmVzdWx0Qm91bmRzW2pdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9LFxuXG4gIF9nZXRBdHRyaWJ1dGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBhdHRyaWJzID0gW107XG4gICAgdmFyIHByb3ZpZGVycyA9IHRoaXMuX3Byb3ZpZGVycztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocHJvdmlkZXJzW2ldLm9wdGlvbnMuYXR0cmlidXRpb24pIHtcbiAgICAgICAgYXR0cmlicy5wdXNoKHByb3ZpZGVyc1tpXS5vcHRpb25zLmF0dHJpYnV0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXR0cmlicy5qb2luKCcsICcpO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2Vvc2VhcmNoQ29yZSAoY29udHJvbCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IEdlb3NlYXJjaENvcmUoY29udHJvbCwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlb3NlYXJjaENvcmU7XG4iLCJpbXBvcnQgeyBHZW9jb2RlU2VydmljZSB9IGZyb20gJy4uL1NlcnZpY2VzL0dlb2NvZGUnO1xuXG5leHBvcnQgdmFyIEFyY2dpc09ubGluZVByb3ZpZGVyID0gR2VvY29kZVNlcnZpY2UuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIGxhYmVsOiAnUGxhY2VzIGFuZCBBZGRyZXNzZXMnLFxuICAgIG1heFJlc3VsdHM6IDVcbiAgfSxcblxuICBzdWdnZXN0aW9uczogZnVuY3Rpb24gKHRleHQsIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxdWVzdCA9IHRoaXMuc3VnZ2VzdCgpLnRleHQodGV4dCk7XG5cbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICByZXF1ZXN0LndpdGhpbihib3VuZHMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY291bnRyaWVzKSB7XG4gICAgICByZXF1ZXN0LmNvdW50cmllcyh0aGlzLm9wdGlvbnMuY291bnRyaWVzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNhdGVnb3JpZXMpIHtcbiAgICAgIHJlcXVlc3QuY2F0ZWdvcnkodGhpcy5vcHRpb25zLmNhdGVnb3JpZXMpO1xuICAgIH1cblxuICAgIC8vIDE1IGlzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBzdWdnZXN0aW9ucyB0aGF0IGNhbiBiZSByZXR1cm5lZFxuICAgIHJlcXVlc3QubWF4U3VnZ2VzdGlvbnModGhpcy5vcHRpb25zLm1heFJlc3VsdHMpO1xuXG4gICAgcmV0dXJuIHJlcXVlc3QucnVuKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpIHtcbiAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICB3aGlsZSAocmVzcG9uc2Uuc3VnZ2VzdGlvbnMubGVuZ3RoICYmIHN1Z2dlc3Rpb25zLmxlbmd0aCA8PSAodGhpcy5vcHRpb25zLm1heFJlc3VsdHMgLSAxKSkge1xuICAgICAgICAgIHZhciBzdWdnZXN0aW9uID0gcmVzcG9uc2Uuc3VnZ2VzdGlvbnMuc2hpZnQoKTtcbiAgICAgICAgICBpZiAoIXN1Z2dlc3Rpb24uaXNDb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgdGV4dDogc3VnZ2VzdGlvbi50ZXh0LFxuICAgICAgICAgICAgICBtYWdpY0tleTogc3VnZ2VzdGlvbi5tYWdpY0tleVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhlcnJvciwgc3VnZ2VzdGlvbnMpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIHJlc3VsdHM6IGZ1bmN0aW9uICh0ZXh0LCBrZXksIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxdWVzdCA9IHRoaXMuZ2VvY29kZSgpLnRleHQodGV4dCk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICByZXF1ZXN0LmtleShrZXkpO1xuICAgIH1cbiAgICAvLyBpbiB0aGUgZnV0dXJlIEFkZHJlc3MvU3RyZWV0TmFtZSBnZW9jb2RpbmcgcmVxdWVzdHMgdGhhdCBpbmNsdWRlIGEgbWFnaWNLZXkgd2lsbCBvbmx5IHJldHVybiBvbmUgbWF0Y2hcbiAgICByZXF1ZXN0Lm1heExvY2F0aW9ucyh0aGlzLm9wdGlvbnMubWF4UmVzdWx0cyk7XG5cbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICByZXF1ZXN0LndpdGhpbihib3VuZHMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZm9yU3RvcmFnZSkge1xuICAgICAgcmVxdWVzdC5mb3JTdG9yYWdlKHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UucmVzdWx0cyk7XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gYXJjZ2lzT25saW5lUHJvdmlkZXIgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBBcmNnaXNPbmxpbmVQcm92aWRlcihvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJjZ2lzT25saW5lUHJvdmlkZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGdlb3NlYXJjaENvcmUgfSBmcm9tICcuLi9DbGFzc2VzL0dlb3NlYXJjaENvcmUnO1xuaW1wb3J0IHsgYXJjZ2lzT25saW5lUHJvdmlkZXIgfSBmcm9tICcuLi9Qcm92aWRlcnMvQXJjZ2lzT25saW5lR2VvY29kZXInO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5cbmV4cG9ydCB2YXIgR2Vvc2VhcmNoID0gTC5Db250cm9sLmV4dGVuZCh7XG4gIGluY2x1ZGVzOiBMLk1peGluLkV2ZW50cyxcblxuICBvcHRpb25zOiB7XG4gICAgcG9zaXRpb246ICd0b3BsZWZ0JyxcbiAgICBjb2xsYXBzZUFmdGVyUmVzdWx0OiB0cnVlLFxuICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICBhbGxvd011bHRpcGxlUmVzdWx0czogdHJ1ZSxcbiAgICBwbGFjZWhvbGRlcjogJ1NlYXJjaCBmb3IgcGxhY2VzIG9yIGFkZHJlc3NlcycsXG4gICAgdGl0bGU6ICdMb2NhdGlvbiBTZWFyY2gnXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblxuICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5wcm92aWRlcnMgfHwgIW9wdGlvbnMucHJvdmlkZXJzLmxlbmd0aCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgb3B0aW9ucy5wcm92aWRlcnMgPSBbIGFyY2dpc09ubGluZVByb3ZpZGVyKCkgXTtcbiAgICB9XG5cbiAgICAvLyBpbnN0YW50aWF0ZSB0aGUgdW5kZXJseWluZyBjbGFzcyBhbmQgcGFzcyBhbG9uZyBvcHRpb25zXG4gICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZSA9IGdlb3NlYXJjaENvcmUodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcHJvdmlkZXJzID0gb3B0aW9ucy5wcm92aWRlcnM7XG5cbiAgICAvLyBidWJibGUgZWFjaCBwcm92aWRlcnMgZXZlbnRzIHRvIHRoZSBjb250cm9sXG4gICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2dlb3NlYXJjaENvcmUuX3Byb3ZpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcHJvdmlkZXJzW2ldLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX3BlbmRpbmdTdWdnZXN0aW9ucyA9IFtdO1xuXG4gICAgTC5Db250cm9sLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwob3B0aW9ucyk7XG4gIH0sXG5cbiAgX3JlbmRlclN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAoc3VnZ2VzdGlvbnMpIHtcbiAgICB2YXIgY3VycmVudEdyb3VwO1xuICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgLy8gc2V0IHRoZSBtYXhIZWlnaHQgb2YgdGhlIHN1Z2dlc3Rpb25zIGJveCB0b1xuICAgIC8vIG1hcCBoZWlnaHRcbiAgICAvLyAtIHN1Z2dlc3Rpb25zIG9mZnNldCAoZGlzdGFuY2UgZnJvbSB0b3Agb2Ygc3VnZ2VzdGlvbnMgdG8gdG9wIG9mIGNvbnRyb2wpXG4gICAgLy8gLSBjb250cm9sIG9mZnNldCAoZGlzdGFuY2UgZnJvbSB0b3Agb2YgY29udHJvbCB0byB0b3Agb2YgbWFwKVxuICAgIC8vIC0gMTAgKGV4dHJhIHBhZGRpbmcpXG4gICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUubWF4SGVpZ2h0ID0gKHRoaXMuX21hcC5nZXRTaXplKCkueSAtIHRoaXMuX3N1Z2dlc3Rpb25zLm9mZnNldFRvcCAtIHRoaXMuX3dyYXBwZXIub2Zmc2V0VG9wIC0gMTApICsgJ3B4JztcblxuICAgIHZhciBub2RlcyA9IFtdO1xuICAgIHZhciBsaXN0O1xuICAgIHZhciBoZWFkZXI7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1Z2dlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc3VnZ2VzdGlvbiA9IHN1Z2dlc3Rpb25zW2ldO1xuICAgICAgaWYgKCFoZWFkZXIgJiYgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcHJvdmlkZXJzLmxlbmd0aCA+IDEgJiYgY3VycmVudEdyb3VwICE9PSBzdWdnZXN0aW9uLnByb3ZpZGVyLm9wdGlvbnMubGFiZWwpIHtcbiAgICAgICAgaGVhZGVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnc3BhbicsICdnZW9jb2Rlci1jb250cm9sLWhlYWRlcicsIHRoaXMuX3N1Z2dlc3Rpb25zKTtcbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gc3VnZ2VzdGlvbi5wcm92aWRlci5vcHRpb25zLmxhYmVsO1xuICAgICAgICBoZWFkZXIuaW5uZXJUZXh0ID0gc3VnZ2VzdGlvbi5wcm92aWRlci5vcHRpb25zLmxhYmVsO1xuICAgICAgICBjdXJyZW50R3JvdXAgPSBzdWdnZXN0aW9uLnByb3ZpZGVyLm9wdGlvbnMubGFiZWw7XG4gICAgICAgIG5vZGVzLnB1c2goaGVhZGVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFsaXN0KSB7XG4gICAgICAgIGxpc3QgPSBMLkRvbVV0aWwuY3JlYXRlKCd1bCcsICdnZW9jb2Rlci1jb250cm9sLWxpc3QnLCB0aGlzLl9zdWdnZXN0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdWdnZXN0aW9uSXRlbSA9IEwuRG9tVXRpbC5jcmVhdGUoJ2xpJywgJ2dlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbicsIGxpc3QpO1xuXG4gICAgICBzdWdnZXN0aW9uSXRlbS5pbm5lckhUTUwgPSBzdWdnZXN0aW9uLnRleHQ7XG4gICAgICBzdWdnZXN0aW9uSXRlbS5wcm92aWRlciA9IHN1Z2dlc3Rpb24ucHJvdmlkZXI7XG4gICAgICBzdWdnZXN0aW9uSXRlbVsnZGF0YS1tYWdpYy1rZXknXSA9IHN1Z2dlc3Rpb24ubWFnaWNLZXk7XG4gICAgfVxuXG4gICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1sb2FkaW5nJyk7XG5cbiAgICBub2Rlcy5wdXNoKGxpc3QpO1xuXG4gICAgcmV0dXJuIG5vZGVzO1xuICB9LFxuXG4gIF9ib3VuZHNGcm9tUmVzdWx0czogZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG51bGxJc2xhbmQgPSBMLmxhdExuZ0JvdW5kcyhbMCwgMF0sIFswLCAwXSk7XG4gICAgdmFyIHJlc3VsdEJvdW5kcyA9IFtdO1xuICAgIHZhciByZXN1bHRMYXRsbmdzID0gW107XG5cbiAgICAvLyBjb2xsZWN0IHRoZSBib3VuZHMgYW5kIGNlbnRlciBvZiBlYWNoIHJlc3VsdFxuICAgIGZvciAodmFyIGkgPSByZXN1bHRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gcmVzdWx0c1tpXTtcblxuICAgICAgcmVzdWx0TGF0bG5ncy5wdXNoKHJlc3VsdC5sYXRsbmcpO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgYm91bmRzIGFyZSB2YWxpZCBhbmQgbm90IDAsMC4gc29tZXRpbWVzIGJvdW5kcyBhcmUgaW5jb3JyZWN0IG9yIG5vdCBwcmVzZW50XG4gICAgICBpZiAocmVzdWx0LmJvdW5kcyAmJiByZXN1bHQuYm91bmRzLmlzVmFsaWQoKSAmJiAhcmVzdWx0LmJvdW5kcy5lcXVhbHMobnVsbElzbGFuZCkpIHtcbiAgICAgICAgcmVzdWx0Qm91bmRzLnB1c2gocmVzdWx0LmJvdW5kcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZm9ybSBhIGJvdW5kcyBvYmplY3QgY29udGFpbmluZyBhbGwgY2VudGVyIHBvaW50c1xuICAgIHZhciBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhyZXN1bHRMYXRsbmdzKTtcblxuICAgIC8vIGFuZCBleHRlbmQgaXQgdG8gY29udGFpbiBhbGwgYm91bmRzIG9iamVjdHNcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlc3VsdEJvdW5kcy5sZW5ndGg7IGorKykge1xuICAgICAgYm91bmRzLmV4dGVuZChyZXN1bHRCb3VuZHNbal0pO1xuICAgIH1cblxuICAgIHJldHVybiBib3VuZHM7XG4gIH0sXG5cbiAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9zdWdnZXN0aW9ucy5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRoaXMuX2lucHV0LnZhbHVlID0gJyc7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbGxhcHNlQWZ0ZXJSZXN1bHQpIHtcbiAgICAgIHRoaXMuX2lucHV0LnBsYWNlaG9sZGVyID0gJyc7XG4gICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fd3JhcHBlciwgJ2dlb2NvZGVyLWNvbnRyb2wtZXhwYW5kZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX21hcC5zY3JvbGxXaGVlbFpvb20uZW5hYmxlZCgpICYmIHRoaXMuX21hcC5vcHRpb25zLnNjcm9sbFdoZWVsWm9vbSkge1xuICAgICAgdGhpcy5fbWFwLnNjcm9sbFdoZWVsWm9vbS5lbmFibGUoKTtcbiAgICB9XG4gIH0sXG5cbiAgY2xlYXJTdWdnZXN0aW9uczogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9ub2Rlcykge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLl9ub2Rlcy5sZW5ndGg7IGsrKykge1xuICAgICAgICBpZiAodGhpcy5fbm9kZXNba10ucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnJlbW92ZUNoaWxkKHRoaXMuX25vZGVzW2tdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfc2V0dXBDbGljazogZnVuY3Rpb24gKCkge1xuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl93cmFwcGVyLCAnZ2VvY29kZXItY29udHJvbC1leHBhbmRlZCcpO1xuICAgIHRoaXMuX2lucHV0LmZvY3VzKCk7XG4gIH0sXG5cbiAgZGlzYWJsZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2lucHV0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWlucHV0LWRpc2FibGVkJyk7XG4gICAgTC5Eb21FdmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLl93cmFwcGVyLCAnY2xpY2snLCB0aGlzLl9zZXR1cENsaWNrLCB0aGlzKTtcbiAgfSxcblxuICBlbmFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9pbnB1dC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9pbnB1dCwgJ2dlb2NvZGVyLWNvbnRyb2wtaW5wdXQtZGlzYWJsZWQnKTtcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX3dyYXBwZXIsICdjbGljaycsIHRoaXMuX3NldHVwQ2xpY2ssIHRoaXMpO1xuICB9LFxuXG4gIGdldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGF0dHJpYnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5fcHJvdmlkZXJzW2ldLm9wdGlvbnMuYXR0cmlidXRpb24pIHtcbiAgICAgICAgYXR0cmlicy5wdXNoKHRoaXMuX3Byb3ZpZGVyc1tpXS5vcHRpb25zLmF0dHJpYnV0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXR0cmlicy5qb2luKCcsICcpO1xuICB9LFxuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgLy8gaW5jbHVkZSAnUG93ZXJlZCBieSBFc3JpJyBpbiBtYXAgYXR0cmlidXRpb25cbiAgICBVdGlsLnNldEVzcmlBdHRyaWJ1dGlvbihtYXApO1xuXG4gICAgdGhpcy5fbWFwID0gbWFwO1xuICAgIHRoaXMuX3dyYXBwZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnZ2VvY29kZXItY29udHJvbCAnICsgKCh0aGlzLm9wdGlvbnMuZXhwYW5kZWQpID8gJyAnICsgJ2dlb2NvZGVyLWNvbnRyb2wtZXhwYW5kZWQnIDogJycpKTtcbiAgICB0aGlzLl9pbnB1dCA9IEwuRG9tVXRpbC5jcmVhdGUoJ2lucHV0JywgJ2dlb2NvZGVyLWNvbnRyb2wtaW5wdXQgbGVhZmxldC1iYXInLCB0aGlzLl93cmFwcGVyKTtcbiAgICB0aGlzLl9pbnB1dC50aXRsZSA9IHRoaXMub3B0aW9ucy50aXRsZTtcblxuICAgIHRoaXMuX3N1Z2dlc3Rpb25zID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2dlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbnMgbGVhZmxldC1iYXInLCB0aGlzLl93cmFwcGVyKTtcblxuICAgIHZhciBjcmVkaXRzID0gdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fZ2V0QXR0cmlidXRpb24oKTtcbiAgICBtYXAuYXR0cmlidXRpb25Db250cm9sLmFkZEF0dHJpYnV0aW9uKGNyZWRpdHMpO1xuXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9pbnB1dCwgJ2ZvY3VzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHRoaXMuX2lucHV0LnBsYWNlaG9sZGVyID0gdGhpcy5vcHRpb25zLnBsYWNlaG9sZGVyO1xuICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX3dyYXBwZXIsICdjbGljaycsIHRoaXMuX3NldHVwQ2xpY2ssIHRoaXMpO1xuXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9zdWdnZXN0aW9ucywgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgc3VnZ2VzdGlvbkl0ZW0gPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9nZW9jb2RlKHN1Z2dlc3Rpb25JdGVtLmlubmVySFRNTCwgc3VnZ2VzdGlvbkl0ZW1bJ2RhdGEtbWFnaWMta2V5J10sIHN1Z2dlc3Rpb25JdGVtLnByb3ZpZGVyKTtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5faW5wdXQsICdibHVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl93cmFwcGVyLCAnZ2VvY29kZXItY29udHJvbC1leHBhbmRlZCcpO1xuXG4gICAgICB2YXIgbGlzdCA9IHRoaXMuX3N1Z2dlc3Rpb25zLnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgJ2dlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbicpO1xuICAgICAgdmFyIHNlbGVjdGVkID0gdGhpcy5fc3VnZ2VzdGlvbnMucXVlcnlTZWxlY3RvckFsbCgnLicgKyAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpWzBdO1xuICAgICAgdmFyIHNlbGVjdGVkUG9zaXRpb247XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobGlzdFtpXSA9PT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICBzZWxlY3RlZFBvc2l0aW9uID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fZ2VvY29kZShzZWxlY3RlZC5pbm5lckhUTUwsIHNlbGVjdGVkWydkYXRhLW1hZ2ljLWtleSddLCBzZWxlY3RlZC5wcm92aWRlcik7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dNdWx0aXBsZVJlc3VsdHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX2dlb2NvZGUodGhpcy5faW5wdXQudmFsdWUsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhsaXN0WzBdLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHNlbGVjdGVkLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBwcmV2aW91c0l0ZW0gPSBsaXN0W3NlbGVjdGVkUG9zaXRpb24gLSAxXTtcblxuICAgICAgICAgIGlmIChzZWxlY3RlZCAmJiBwcmV2aW91c0l0ZW0pIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhwcmV2aW91c0l0ZW0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhsaXN0W2xpc3QubGVuZ3RoIC0gMV0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3Moc2VsZWN0ZWQsICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG5leHRJdGVtID0gbGlzdFtzZWxlY3RlZFBvc2l0aW9uICsgMV07XG5cbiAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgbmV4dEl0ZW0pIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhuZXh0SXRlbSwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKGxpc3RbMF0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gd2hlbiB0aGUgaW5wdXQgY2hhbmdlcyB3ZSBzaG91bGQgY2FuY2VsIGFsbCBwZW5kaW5nIHN1Z2dlc3Rpb24gcmVxdWVzdHMgaWYgcG9zc2libGUgdG8gYXZvaWQgcmVzdWx0IGNvbGxpc2lvbnNcbiAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHRoaXMuX2dlb3NlYXJjaENvcmUuX3BlbmRpbmdTdWdnZXN0aW9ucy5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wZW5kaW5nU3VnZ2VzdGlvbnNbeF07XG4gICAgICAgICAgICBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LmFib3J0ICYmICFyZXF1ZXN0LmlkKSB7XG4gICAgICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX2lucHV0LCAna2V5dXAnLCBMLlV0aWwudGhyb3R0bGUoZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICAgIHZhciB0ZXh0ID0gKGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCkudmFsdWU7XG5cbiAgICAgIC8vIHJlcXVpcmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzIGZvciBzdWdnZXN0aW9uc1xuICAgICAgaWYgKHRleHQubGVuZ3RoIDwgMikge1xuICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1sb2FkaW5nJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhpcyBpcyB0aGUgZXNjYXBlIGtleSBpdCB3aWxsIGNsZWFyIHRoZSBpbnB1dCBzbyBjbGVhciBzdWdnZXN0aW9uc1xuICAgICAgaWYgKGtleSA9PT0gMjcpIHtcbiAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhpcyBpcyBOT1QgdGhlIHVwL2Rvd24gYXJyb3dzIG9yIGVudGVyIG1ha2UgYSBzdWdnZXN0aW9uXG4gICAgICBpZiAoa2V5ICE9PSAxMyAmJiBrZXkgIT09IDM4ICYmIGtleSAhPT0gNDApIHtcbiAgICAgICAgaWYgKHRoaXMuX2lucHV0LnZhbHVlICE9PSB0aGlzLl9sYXN0VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl9sYXN0VmFsdWUgPSB0aGlzLl9pbnB1dC52YWx1ZTtcbiAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWxvYWRpbmcnKTtcbiAgICAgICAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9zdWdnZXN0KHRleHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgNTAsIHRoaXMpLCB0aGlzKTtcblxuICAgIEwuRG9tRXZlbnQuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24odGhpcy5fd3JhcHBlcik7XG5cbiAgICAvLyB3aGVuIG1vdXNlIG1vdmVzIG92ZXIgc3VnZ2VzdGlvbnMgZGlzYWJsZSBzY3JvbGwgd2hlZWwgem9vbSBpZiBpdHMgZW5hYmxlZFxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fc3VnZ2VzdGlvbnMsICdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKG1hcC5zY3JvbGxXaGVlbFpvb20uZW5hYmxlZCgpICYmIG1hcC5vcHRpb25zLnNjcm9sbFdoZWVsWm9vbSkge1xuICAgICAgICBtYXAuc2Nyb2xsV2hlZWxab29tLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHdoZW4gbW91c2UgbW92ZXMgbGVhdmVzIHN1Z2dlc3Rpb25zIGVuYWJsZSBzY3JvbGwgd2hlZWwgem9vbSBpZiBpdHMgZGlzYWJsZWRcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX3N1Z2dlc3Rpb25zLCAnbW91c2VvdXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKCFtYXAuc2Nyb2xsV2hlZWxab29tLmVuYWJsZWQoKSAmJiBtYXAub3B0aW9ucy5zY3JvbGxXaGVlbFpvb20pIHtcbiAgICAgICAgbWFwLnNjcm9sbFdoZWVsWm9vbS5lbmFibGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUub24oJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1sb2FkaW5nJyk7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLl9pbnB1dC5ibHVyKCk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICByZXR1cm4gdGhpcy5fd3JhcHBlcjtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9zZWFyY2ggKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBHZW9zZWFyY2gob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlb3NlYXJjaDtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgRmVhdHVyZUxheWVyU2VydmljZSB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5cbmV4cG9ydCB2YXIgRmVhdHVyZUxheWVyUHJvdmlkZXIgPSBGZWF0dXJlTGF5ZXJTZXJ2aWNlLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBsYWJlbDogJ0ZlYXR1cmUgTGF5ZXInLFxuICAgIG1heFJlc3VsdHM6IDUsXG4gICAgYnVmZmVyUmFkaXVzOiAxMDAwLFxuICAgIGZvcm1hdFN1Z2dlc3Rpb246IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICByZXR1cm4gZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHNbMF1dO1xuICAgIH1cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIEZlYXR1cmVMYXllclNlcnZpY2UucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzID0gW3RoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHNdO1xuICAgIH1cbiAgfSxcblxuICBzdWdnZXN0aW9uczogZnVuY3Rpb24gKHRleHQsIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJ5KCkud2hlcmUodGhpcy5fYnVpbGRRdWVyeSh0ZXh0KSlcbiAgICAgIC5yZXR1cm5HZW9tZXRyeShmYWxzZSk7XG5cbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICBxdWVyeS5pbnRlcnNlY3RzKGJvdW5kcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pZEZpZWxkKSB7XG4gICAgICBxdWVyeS5maWVsZHMoW3RoaXMub3B0aW9ucy5pZEZpZWxkXS5jb25jYXQodGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcykpO1xuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gcXVlcnkucnVuKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmF3KSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIFtdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5pZEZpZWxkID0gcmF3Lm9iamVjdElkRmllbGROYW1lO1xuICAgICAgICB2YXIgc3VnZ2VzdGlvbnMgPSBbXTtcbiAgICAgICAgdmFyIGNvdW50ID0gTWF0aC5taW4ocmVzdWx0cy5mZWF0dXJlcy5sZW5ndGgsIHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGZlYXR1cmUgPSByZXN1bHRzLmZlYXR1cmVzW2ldO1xuICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgdGV4dDogdGhpcy5vcHRpb25zLmZvcm1hdFN1Z2dlc3Rpb24uY2FsbCh0aGlzLCBmZWF0dXJlKSxcbiAgICAgICAgICAgIG1hZ2ljS2V5OiBmZWF0dXJlLmlkXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIHN1Z2dlc3Rpb25zLnNsaWNlKDAsIHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzKS5yZXZlcnNlKCkpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH0sXG5cbiAgcmVzdWx0czogZnVuY3Rpb24gKHRleHQsIGtleSwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcnkoKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIHF1ZXJ5LmZlYXR1cmVJZHMoW2tleV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBxdWVyeS53aGVyZSh0aGlzLl9idWlsZFF1ZXJ5KHRleHQpKTtcbiAgICB9XG5cbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICBxdWVyeS53aXRoaW4oYm91bmRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcXVlcnkucnVuKEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgZmVhdHVyZXMpIHtcbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZlYXR1cmVzLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBmZWF0dXJlID0gZmVhdHVyZXMuZmVhdHVyZXNbaV07XG4gICAgICAgIGlmIChmZWF0dXJlKSB7XG4gICAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuX2ZlYXR1cmVCb3VuZHMoZmVhdHVyZSk7XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgbGF0bG5nOiBib3VuZHMuZ2V0Q2VudGVyKCksXG4gICAgICAgICAgICBib3VuZHM6IGJvdW5kcyxcbiAgICAgICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5mb3JtYXRTdWdnZXN0aW9uLmNhbGwodGhpcywgZmVhdHVyZSksXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBmZWF0dXJlLnByb3BlcnRpZXMsXG4gICAgICAgICAgICBnZW9qc29uOiBmZWF0dXJlXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzdWx0cyk7XG4gICAgfSwgdGhpcykpO1xuICB9LFxuXG4gIF9idWlsZFF1ZXJ5OiBmdW5jdGlvbiAodGV4dCkge1xuICAgIHZhciBxdWVyeVN0cmluZyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmaWVsZCA9ICd1cHBlcihcIicgKyB0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzW2ldICsgJ1wiKSc7XG5cbiAgICAgIHF1ZXJ5U3RyaW5nLnB1c2goZmllbGQgKyBcIiBMSUtFIHVwcGVyKCclXCIgKyB0ZXh0ICsgXCIlJylcIik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy53aGVyZSkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy53aGVyZSArICcgQU5EICgnICsgcXVlcnlTdHJpbmcuam9pbignIE9SICcpICsgJyknO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcXVlcnlTdHJpbmcuam9pbignIE9SICcpO1xuICAgIH1cbiAgfSxcblxuICBfZmVhdHVyZUJvdW5kczogZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICB2YXIgZ2VvanNvbiA9IEwuZ2VvSnNvbihmZWF0dXJlKTtcbiAgICBpZiAoZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICB2YXIgY2VudGVyID0gZ2VvanNvbi5nZXRCb3VuZHMoKS5nZXRDZW50ZXIoKTtcbiAgICAgIHZhciBsbmdSYWRpdXMgPSAoKHRoaXMub3B0aW9ucy5idWZmZXJSYWRpdXMgLyA0MDA3NTAxNykgKiAzNjApIC8gTWF0aC5jb3MoKDE4MCAvIE1hdGguUEkpICogY2VudGVyLmxhdCk7XG4gICAgICB2YXIgbGF0UmFkaXVzID0gKHRoaXMub3B0aW9ucy5idWZmZXJSYWRpdXMgLyA0MDA3NTAxNykgKiAzNjA7XG4gICAgICByZXR1cm4gTC5sYXRMbmdCb3VuZHMoW2NlbnRlci5sYXQgLSBsYXRSYWRpdXMsIGNlbnRlci5sbmcgLSBsbmdSYWRpdXNdLCBbY2VudGVyLmxhdCArIGxhdFJhZGl1cywgY2VudGVyLmxuZyArIGxuZ1JhZGl1c10pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZ2VvanNvbi5nZXRCb3VuZHMoKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZUxheWVyUHJvdmlkZXIgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBGZWF0dXJlTGF5ZXJQcm92aWRlcihvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmVhdHVyZUxheWVyUHJvdmlkZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuXG5leHBvcnQgdmFyIE1hcFNlcnZpY2VQcm92aWRlciA9IE1hcFNlcnZpY2UuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIGxheWVyczogWzBdLFxuICAgIGxhYmVsOiAnTWFwIFNlcnZpY2UnLFxuICAgIGJ1ZmZlclJhZGl1czogMTAwMCxcbiAgICBtYXhSZXN1bHRzOiA1LFxuICAgIGZvcm1hdFN1Z2dlc3Rpb246IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICByZXR1cm4gZmVhdHVyZS5wcm9wZXJ0aWVzW2ZlYXR1cmUuZGlzcGxheUZpZWxkTmFtZV0gKyAnIDxzbWFsbD4nICsgZmVhdHVyZS5sYXllck5hbWUgKyAnPC9zbWFsbD4nO1xuICAgIH1cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIE1hcFNlcnZpY2UucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9nZXRJZEZpZWxkcygpO1xuICB9LFxuXG4gIHN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAodGV4dCwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciByZXF1ZXN0ID0gdGhpcy5maW5kKCkudGV4dCh0ZXh0KS5maWVsZHModGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcykucmV0dXJuR2VvbWV0cnkoZmFsc2UpLmxheWVycyh0aGlzLm9wdGlvbnMubGF5ZXJzKTtcblxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJhdykge1xuICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gW107XG4gICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgIHZhciBjb3VudCA9IE1hdGgubWluKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzLCByZXN1bHRzLmZlYXR1cmVzLmxlbmd0aCk7XG4gICAgICAgIHJhdy5yZXN1bHRzID0gcmF3LnJlc3VsdHMucmV2ZXJzZSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICB2YXIgZmVhdHVyZSA9IHJlc3VsdHMuZmVhdHVyZXNbaV07XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHJhdy5yZXN1bHRzW2ldO1xuICAgICAgICAgIHZhciBsYXllciA9IHJlc3VsdC5sYXllcklkO1xuICAgICAgICAgIHZhciBpZEZpZWxkID0gdGhpcy5faWRGaWVsZHNbbGF5ZXJdO1xuICAgICAgICAgIGZlYXR1cmUubGF5ZXJJZCA9IGxheWVyO1xuICAgICAgICAgIGZlYXR1cmUubGF5ZXJOYW1lID0gdGhpcy5fbGF5ZXJOYW1lc1tsYXllcl07XG4gICAgICAgICAgZmVhdHVyZS5kaXNwbGF5RmllbGROYW1lID0gdGhpcy5fZGlzcGxheUZpZWxkc1tsYXllcl07XG4gICAgICAgICAgaWYgKGlkRmllbGQpIHtcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgICB0ZXh0OiB0aGlzLm9wdGlvbnMuZm9ybWF0U3VnZ2VzdGlvbi5jYWxsKHRoaXMsIGZlYXR1cmUpLFxuICAgICAgICAgICAgICBtYWdpY0tleTogcmVzdWx0LmF0dHJpYnV0ZXNbaWRGaWVsZF0gKyAnOicgKyBsYXllclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhlcnJvciwgc3VnZ2VzdGlvbnMucmV2ZXJzZSgpKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICB2YXIgcmVxdWVzdDtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIHZhciBmZWF0dXJlSWQgPSBrZXkuc3BsaXQoJzonKVswXTtcbiAgICAgIHZhciBsYXllciA9IGtleS5zcGxpdCgnOicpWzFdO1xuICAgICAgcmVxdWVzdCA9IHRoaXMucXVlcnkoKS5sYXllcihsYXllcikuZmVhdHVyZUlkcyhmZWF0dXJlSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0ID0gdGhpcy5maW5kKCkudGV4dCh0ZXh0KS5maWVsZHModGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcykuY29udGFpbnMoZmFsc2UpLmxheWVycyh0aGlzLm9wdGlvbnMubGF5ZXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlcywgcmVzcG9uc2UpIHtcbiAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnJlc3VsdHMpIHtcbiAgICAgICAgICByZXNwb25zZS5yZXN1bHRzID0gcmVzcG9uc2UucmVzdWx0cy5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmZWF0dXJlcy5mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBmZWF0dXJlID0gZmVhdHVyZXMuZmVhdHVyZXNbaV07XG4gICAgICAgICAgbGF5ZXIgPSBsYXllciB8fCByZXNwb25zZS5yZXN1bHRzW2ldLmxheWVySWQ7XG5cbiAgICAgICAgICBpZiAoZmVhdHVyZSAmJiBsYXllciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5fZmVhdHVyZUJvdW5kcyhmZWF0dXJlKTtcbiAgICAgICAgICAgIGZlYXR1cmUubGF5ZXJJZCA9IGxheWVyO1xuICAgICAgICAgICAgZmVhdHVyZS5sYXllck5hbWUgPSB0aGlzLl9sYXllck5hbWVzW2xheWVyXTtcbiAgICAgICAgICAgIGZlYXR1cmUuZGlzcGxheUZpZWxkTmFtZSA9IHRoaXMuX2Rpc3BsYXlGaWVsZHNbbGF5ZXJdO1xuXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICBsYXRsbmc6IGJvdW5kcy5nZXRDZW50ZXIoKSxcbiAgICAgICAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5mb3JtYXRTdWdnZXN0aW9uLmNhbGwodGhpcywgZmVhdHVyZSksXG4gICAgICAgICAgICAgIHByb3BlcnRpZXM6IGZlYXR1cmUucHJvcGVydGllcyxcbiAgICAgICAgICAgICAgZ2VvanNvbjogZmVhdHVyZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzdWx0cy5yZXZlcnNlKCkpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIF9mZWF0dXJlQm91bmRzOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIHZhciBnZW9qc29uID0gTC5nZW9Kc29uKGZlYXR1cmUpO1xuICAgIGlmIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcbiAgICAgIHZhciBjZW50ZXIgPSBnZW9qc29uLmdldEJvdW5kcygpLmdldENlbnRlcigpO1xuICAgICAgdmFyIGxuZ1JhZGl1cyA9ICgodGhpcy5vcHRpb25zLmJ1ZmZlclJhZGl1cyAvIDQwMDc1MDE3KSAqIDM2MCkgLyBNYXRoLmNvcygoMTgwIC8gTWF0aC5QSSkgKiBjZW50ZXIubGF0KTtcbiAgICAgIHZhciBsYXRSYWRpdXMgPSAodGhpcy5vcHRpb25zLmJ1ZmZlclJhZGl1cyAvIDQwMDc1MDE3KSAqIDM2MDtcbiAgICAgIHJldHVybiBMLmxhdExuZ0JvdW5kcyhbY2VudGVyLmxhdCAtIGxhdFJhZGl1cywgY2VudGVyLmxuZyAtIGxuZ1JhZGl1c10sIFtjZW50ZXIubGF0ICsgbGF0UmFkaXVzLCBjZW50ZXIubG5nICsgbG5nUmFkaXVzXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZW9qc29uLmdldEJvdW5kcygpO1xuICAgIH1cbiAgfSxcblxuICBfbGF5ZXJNZXRhZGF0YUNhbGxiYWNrOiBmdW5jdGlvbiAobGF5ZXJpZCkge1xuICAgIHJldHVybiBMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIG1ldGFkYXRhKSB7XG4gICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9XG4gICAgICB0aGlzLl9kaXNwbGF5RmllbGRzW2xheWVyaWRdID0gbWV0YWRhdGEuZGlzcGxheUZpZWxkO1xuICAgICAgdGhpcy5fbGF5ZXJOYW1lc1tsYXllcmlkXSA9IG1ldGFkYXRhLm5hbWU7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldGFkYXRhLmZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZmllbGQgPSBtZXRhZGF0YS5maWVsZHNbaV07XG4gICAgICAgIGlmIChmaWVsZC50eXBlID09PSAnZXNyaUZpZWxkVHlwZU9JRCcpIHtcbiAgICAgICAgICB0aGlzLl9pZEZpZWxkc1tsYXllcmlkXSA9IGZpZWxkLm5hbWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBfZ2V0SWRGaWVsZHM6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9pZEZpZWxkcyA9IHt9O1xuICAgIHRoaXMuX2Rpc3BsYXlGaWVsZHMgPSB7fTtcbiAgICB0aGlzLl9sYXllck5hbWVzID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMubGF5ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLm9wdGlvbnMubGF5ZXJzW2ldO1xuICAgICAgdGhpcy5nZXQobGF5ZXIsIHt9LCB0aGlzLl9sYXllck1ldGFkYXRhQ2FsbGJhY2sobGF5ZXIpKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwU2VydmljZVByb3ZpZGVyIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgTWFwU2VydmljZVByb3ZpZGVyKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBTZXJ2aWNlUHJvdmlkZXI7XG4iLCJpbXBvcnQgeyBHZW9jb2RlU2VydmljZSB9IGZyb20gJy4uL1NlcnZpY2VzL0dlb2NvZGUnO1xuXG5leHBvcnQgdmFyIEdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIgPSBHZW9jb2RlU2VydmljZS5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgbGFiZWw6ICdHZW9jb2RlIFNlcnZlcicsXG4gICAgbWF4UmVzdWx0czogNVxuICB9LFxuXG4gIHN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAodGV4dCwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IHRoaXMuc3VnZ2VzdCgpLnRleHQodGV4dCk7XG4gICAgICBpZiAoYm91bmRzKSB7XG4gICAgICAgIHJlcXVlc3Qud2l0aGluKGJvdW5kcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgd2hpbGUgKHJlc3BvbnNlLnN1Z2dlc3Rpb25zLmxlbmd0aCAmJiBzdWdnZXN0aW9ucy5sZW5ndGggPD0gKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzIC0gMSkpIHtcbiAgICAgICAgICAgIHZhciBzdWdnZXN0aW9uID0gcmVzcG9uc2Uuc3VnZ2VzdGlvbnMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghc3VnZ2VzdGlvbi5pc0NvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgdGV4dDogc3VnZ2VzdGlvbi50ZXh0LFxuICAgICAgICAgICAgICAgIG1hZ2ljS2V5OiBzdWdnZXN0aW9uLm1hZ2ljS2V5XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayhlcnJvciwgc3VnZ2VzdGlvbnMpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKHVuZGVmaW5lZCwgW10pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB0aGlzLmdlb2NvZGUoKS50ZXh0KHRleHQpO1xuXG4gICAgcmVxdWVzdC5tYXhMb2NhdGlvbnModGhpcy5vcHRpb25zLm1heFJlc3VsdHMpO1xuXG4gICAgaWYgKGJvdW5kcykge1xuICAgICAgcmVxdWVzdC53aXRoaW4oYm91bmRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3BvbnNlLnJlc3VsdHMpO1xuICAgIH0sIHRoaXMpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBHZW9jb2RlU2VydmljZVByb3ZpZGVyKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW9jb2RlU2VydmljZVByb3ZpZGVyO1xuIiwiZXhwb3J0IHsgdmVyc2lvbiBhcyBWRVJTSU9OIH0gZnJvbSAnLi4vcGFja2FnZS5qc29uJztcbmV4cG9ydCB2YXIgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsID0gJ2h0dHBzOi8vZ2VvY29kZS5hcmNnaXMuY29tL2FyY2dpcy9yZXN0L3NlcnZpY2VzL1dvcmxkL0dlb2NvZGVTZXJ2ZXIvJztcblxuLy8gaW1wb3J0IHRhc2tzXG5leHBvcnQgeyBHZW9jb2RlLCBnZW9jb2RlIH0gZnJvbSAnLi9UYXNrcy9HZW9jb2RlJztcbmV4cG9ydCB7IFJldmVyc2VHZW9jb2RlLCByZXZlcnNlR2VvY29kZSB9IGZyb20gJy4vVGFza3MvUmV2ZXJzZUdlb2NvZGUnO1xuZXhwb3J0IHsgU3VnZ2VzdCwgc3VnZ2VzdCB9IGZyb20gJy4vVGFza3MvU3VnZ2VzdCc7XG5cbi8vIGltcG9ydCBzZXJ2aWNlXG5leHBvcnQgeyBHZW9jb2RlU2VydmljZSwgZ2VvY29kZVNlcnZpY2UgfSBmcm9tICcuL1NlcnZpY2VzL0dlb2NvZGUnO1xuXG4vLyBpbXBvcnQgY29udHJvbFxuZXhwb3J0IHsgR2Vvc2VhcmNoLCBnZW9zZWFyY2ggfSBmcm9tICcuL0NvbnRyb2xzL0dlb3NlYXJjaCc7XG5cbi8vIGltcG9ydCBzdXBwb3J0aW5nIGNsYXNzXG5leHBvcnQgeyBHZW9zZWFyY2hDb3JlLCBnZW9zZWFyY2hDb3JlIH0gZnJvbSAnLi9DbGFzc2VzL0dlb3NlYXJjaENvcmUnO1xuXG4vLyBpbXBvcnQgcHJvdmlkZXJzXG5leHBvcnQgeyBBcmNnaXNPbmxpbmVQcm92aWRlciwgYXJjZ2lzT25saW5lUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVycy9BcmNnaXNPbmxpbmVHZW9jb2Rlcic7XG5leHBvcnQgeyBGZWF0dXJlTGF5ZXJQcm92aWRlciwgZmVhdHVyZUxheWVyUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVycy9GZWF0dXJlTGF5ZXInO1xuZXhwb3J0IHsgTWFwU2VydmljZVByb3ZpZGVyLCBtYXBTZXJ2aWNlUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVycy9NYXBTZXJ2aWNlJztcbmV4cG9ydCB7IEdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIsIGdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVycy9HZW9jb2RlU2VydmljZSc7XG4iXSwibmFtZXMiOlsiVGFzayIsIlV0aWwiLCJTZXJ2aWNlIiwiRmVhdHVyZUxheWVyU2VydmljZSIsIk1hcFNlcnZpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Q0NJTyxJQUFJLE9BQU8sR0FBR0EsZ0JBQUksQ0FBQyxNQUFNLENBQUM7QUFDakMsQ0FBQSxFQUFFLElBQUksRUFBRSxNQUFNOztBQUVkLENBQUEsRUFBRSxNQUFNLEVBQUU7QUFDVixDQUFBLElBQUksS0FBSyxFQUFFLElBQUk7QUFDZixDQUFBLElBQUksVUFBVSxFQUFFLEtBQUs7QUFDckIsQ0FBQSxJQUFJLFNBQVMsRUFBRSxHQUFHO0FBQ2xC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