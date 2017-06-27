/* esri-leaflet-geocoder - v2.2.0 - Sun Nov 06 2016 15:40:14 GMT-0800 (PST)
 * Copyright (c) 2016 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet'), require('esri-leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet', 'esri-leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Geocoding = global.L.esri.Geocoding || {}),global.L,global.L.esri));
}(this, function (exports,L,esriLeaflet) { 'use strict';

	L = 'default' in L ? L['default'] : L;

	var version = "2.2.0";

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
	    this._wrapper = L.DomUtil.create('div', 'geocoder-control');
	    this._input = L.DomUtil.create('input', 'geocoder-control-input leaflet-bar', this._wrapper);
	    this._input.title = this.options.title;

	    if (this.options.expanded) {
	      L.DomUtil.addClass(this._wrapper, 'geocoder-control-expanded');
	      this._input.placeholder = this.options.placeholder;
	    }

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
	    this._suggestionsQuery = this.query();
	    this._resultsQuery = this.query();
	  },

	  suggestions: function (text, bounds, callback) {
	    var query = this._suggestionsQuery.where(this._buildQuery(text))
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
	        for (var i = results.features.length - 1; i >= 0; i--) {
	          var feature = results.features[i];
	          suggestions.push({
	            text: this.options.formatSuggestion.call(this, feature),
	            magicKey: feature.id
	          });
	        }
	        callback(error, suggestions.slice(0, this.options.maxResults));
	      }
	    }, this);

	    return request;
	  },

	  results: function (text, key, bounds, callback) {
	    var query = this._resultsQuery;

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

	  orderBy: function (fieldName, order) {
	    this._suggestionsQuery.orderBy(fieldName, order);
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
	      request = this.find().text(text).fields(this.options.searchFields).layers(this.options.layers);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvVGFza3MvR2VvY29kZS5qcyIsIi4uL3NyYy9UYXNrcy9SZXZlcnNlR2VvY29kZS5qcyIsIi4uL3NyYy9UYXNrcy9TdWdnZXN0LmpzIiwiLi4vc3JjL1NlcnZpY2VzL0dlb2NvZGUuanMiLCIuLi9zcmMvQ2xhc3Nlcy9HZW9zZWFyY2hDb3JlLmpzIiwiLi4vc3JjL1Byb3ZpZGVycy9BcmNnaXNPbmxpbmVHZW9jb2Rlci5qcyIsIi4uL3NyYy9Db250cm9scy9HZW9zZWFyY2guanMiLCIuLi9zcmMvUHJvdmlkZXJzL0ZlYXR1cmVMYXllci5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvTWFwU2VydmljZS5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvR2VvY29kZVNlcnZpY2UuanMiLCIuLi9zcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXQtZ2VvY29kZXJcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkVzcmkgR2VvY29kaW5nIHV0aWxpdHkgYW5kIHNlYXJjaCBwbHVnaW4gZm9yIExlYWZsZXQuXCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMi4wXCIsXG4gIFwiYXV0aG9yXCI6IFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gIFwiY29udHJpYnV0b3JzXCI6IFtcbiAgICBcIlBhdHJpY2sgQXJsdCA8cGFybHRAZXNyaS5jb20+IChodHRwOi8vcGF0cmlja2FybHQuY29tKVwiLFxuICAgIFwiSm9obiBHcmF2b2lzIDxqZ3Jhdm9pc0Blc3JpLmNvbT4gKGh0dHA6Ly9qb2huZ3Jhdm9pcy5jb20pXCJcbiAgXSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZXNyaS1sZWFmbGV0XCI6IFwiXjIuMC4zXCIsXG4gICAgXCJsZWFmbGV0XCI6IFwiXjEuMC4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2hhaVwiOiBcIjIuMy4wXCIsXG4gICAgXCJnaC1yZWxlYXNlXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4wLjguNVwiLFxuICAgIFwiaW1hZ2VtaW5cIjogXCJeMy4yLjBcIixcbiAgICBcImlzcGFydGFcIjogXCJeMy4wLjNcIixcbiAgICBcImlzdGFuYnVsXCI6IFwiXjAuNC4yXCIsXG4gICAgXCJrYXJtYVwiOiBcIl4wLjEyLjI0XCIsXG4gICAgXCJrYXJtYS1jaGFpLXNpbm9uXCI6IFwiXjAuMS4zXCIsXG4gICAgXCJrYXJtYS1jb3ZlcmFnZVwiOiBcIl4wLjUuM1wiLFxuICAgIFwia2FybWEtbW9jaGFcIjogXCJeMC4xLjBcIixcbiAgICBcImthcm1hLW1vY2hhLXJlcG9ydGVyXCI6IFwiXjAuMi41XCIsXG4gICAgXCJrYXJtYS1waGFudG9tanMtbGF1bmNoZXJcIjogXCJeMC4yLjBcIixcbiAgICBcImthcm1hLXNvdXJjZW1hcC1sb2FkZXJcIjogXCJeMC4zLjVcIixcbiAgICBcIm1rZGlycFwiOiBcIl4wLjUuMVwiLFxuICAgIFwibW9jaGFcIjogXCJeMi4zLjRcIixcbiAgICBcIm5vZGUtc2Fzc1wiOiBcIl4zLjIuMFwiLFxuICAgIFwicGFyYWxsZWxzaGVsbFwiOiBcIl4yLjAuMFwiLFxuICAgIFwicGhhbnRvbWpzXCI6IFwiXjEuOS4xN1wiLFxuICAgIFwicm9sbHVwXCI6IFwiXjAuMjUuNFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1qc29uXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLW5vZGUtcmVzb2x2ZVwiOiBcIl4xLjQuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi11Z2xpZnlcIjogXCJeMC4zLjFcIixcbiAgICBcInNlbWlzdGFuZGFyZFwiOiBcIl43LjAuNVwiLFxuICAgIFwic2lub25cIjogXCJeMS4xMS4xXCIsXG4gICAgXCJzaW5vbi1jaGFpXCI6IFwiMi43LjBcIixcbiAgICBcInVnbGlmeS1qc1wiOiBcIl4yLjYuMVwiLFxuICAgIFwid2F0Y2hcIjogXCJeMC4xNy4xXCJcbiAgfSxcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL2VzcmktbGVhZmxldC1nZW9jb2RlclwiLFxuICBcImpzbmV4dDptYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0R2VvY29kaW5nLmpzXCIsXG4gIFwianNwbVwiOiB7XG4gICAgXCJyZWdpc3RyeVwiOiBcIm5wbVwiLFxuICAgIFwiZm9ybWF0XCI6IFwiZXM2XCIsXG4gICAgXCJtYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0R2VvY29kaW5nLmpzXCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiQXBhY2hlLTIuMFwiLFxuICBcIm1haW5cIjogXCJkaXN0L2VzcmktbGVhZmxldC1nZW9jb2Rlci1kZWJ1Zy5qc1wiLFxuICBcImJyb3dzZXJcIjogXCJkaXN0L2VzcmktbGVhZmxldC1nZW9jb2Rlci1kZWJ1Zy5qc1wiLFxuICBcInJlYWRtZUZpbGVuYW1lXCI6IFwiUkVBRE1FLm1kXCIsXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXRAZ2l0aHViLmNvbTpFc3JpL2VzcmktbGVhZmxldC1nZW9jb2Rlci5naXRcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwicHJlYnVpbGRcIjogXCJta2RpcnAgZGlzdFwiLFxuICAgIFwiYnVpbGRcIjogXCJyb2xsdXAgLWMgcHJvZmlsZXMvZGVidWcuanMgJiByb2xsdXAgLWMgcHJvZmlsZXMvcHJvZHVjdGlvbi5qcyAmIG5wbSBydW4gY3NzICYgbnBtIHJ1biBpbWdcIixcbiAgICBcImNzc1wiOiBcIm5vZGUtc2FzcyAuL3NyYy9lc3JpLWxlYWZsZXQtZ2VvY29kZXIuY3NzIC4vZGlzdC9lc3JpLWxlYWZsZXQtZ2VvY29kZXIuY3NzIC0tb3V0cHV0LXN0eWxlIGNvbXByZXNzZWRcIixcbiAgICBcImltZ1wiOiBcImltYWdlbWluIC4vc3JjL2ltZyAuL2Rpc3QvaW1nXCIsXG4gICAgXCJsaW50XCI6IFwic2VtaXN0YW5kYXJkIHNyYy8qKi8qLmpzXCIsXG4gICAgXCJwcmVwdWJsaXNoXCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicHJldGVzdFwiOiBcIm5wbSBydW4gYnVpbGRcIixcbiAgICBcInJlbGVhc2VcIjogXCIuL3NjcmlwdHMvcmVsZWFzZS5zaFwiLFxuICAgIFwic3RhcnQtd2F0Y2hcIjogXCJ3YXRjaCBcXFwibnBtIHJ1biBidWlsZFxcXCIgc3JjXCIsXG4gICAgXCJzdGFydFwiOiBcInBhcmFsbGVsc2hlbGwgXFxcIm5wbSBydW4gc3RhcnQtd2F0Y2hcXFwiIFxcXCJodHRwLXNlcnZlciAtcCA1Njc4IC1jLTEgLW9cXFwiXCIsXG4gICAgXCJ0ZXN0XCI6IFwibnBtIHJ1biBsaW50ICYmIGthcm1hIHN0YXJ0XCJcbiAgfSxcbiAgXCJzdHlsZVwiOiBcIi4vZGlzdC9lc3JpLWxlYWZsZXQtZ2VvY29kZXIuY3NzXCJcbn1cbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGFzaywgVXRpbCB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5pbXBvcnQgeyBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmwgfSBmcm9tICcuLi9Fc3JpTGVhZmxldEdlb2NvZGluZyc7XG5cbmV4cG9ydCB2YXIgR2VvY29kZSA9IFRhc2suZXh0ZW5kKHtcbiAgcGF0aDogJ2ZpbmQnLFxuXG4gIHBhcmFtczoge1xuICAgIG91dFNyOiA0MzI2LFxuICAgIGZvclN0b3JhZ2U6IGZhbHNlLFxuICAgIG91dEZpZWxkczogJyonLFxuICAgIG1heExvY2F0aW9uczogMjBcbiAgfSxcblxuICBzZXR0ZXJzOiB7XG4gICAgJ2FkZHJlc3MnOiAnYWRkcmVzcycsXG4gICAgJ25laWdoYm9yaG9vZCc6ICduZWlnaGJvcmhvb2QnLFxuICAgICdjaXR5JzogJ2NpdHknLFxuICAgICdzdWJyZWdpb24nOiAnc3VicmVnaW9uJyxcbiAgICAncmVnaW9uJzogJ3JlZ2lvbicsXG4gICAgJ3Bvc3RhbCc6ICdwb3N0YWwnLFxuICAgICdjb3VudHJ5JzogJ2NvdW50cnknLFxuICAgICd0ZXh0JzogJ3RleHQnLFxuICAgICdjYXRlZ29yeSc6ICdjYXRlZ29yeScsXG4gICAgJ3Rva2VuJzogJ3Rva2VuJyxcbiAgICAna2V5JzogJ21hZ2ljS2V5JyxcbiAgICAnZmllbGRzJzogJ291dEZpZWxkcycsXG4gICAgJ2ZvclN0b3JhZ2UnOiAnZm9yU3RvcmFnZScsXG4gICAgJ21heExvY2F0aW9ucyc6ICdtYXhMb2NhdGlvbnMnXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLnVybCA9IG9wdGlvbnMudXJsIHx8IFdvcmxkR2VvY29kaW5nU2VydmljZVVybDtcbiAgICBUYXNrLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gIH0sXG5cbiAgd2l0aGluOiBmdW5jdGlvbiAoYm91bmRzKSB7XG4gICAgYm91bmRzID0gTC5sYXRMbmdCb3VuZHMoYm91bmRzKTtcbiAgICB0aGlzLnBhcmFtcy5iYm94ID0gVXRpbC5ib3VuZHNUb0V4dGVudChib3VuZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG5lYXJieTogZnVuY3Rpb24gKGxhdGxuZywgcmFkaXVzKSB7XG4gICAgbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGxhdGxuZy5sbmcgKyAnLCcgKyBsYXRsbmcubGF0O1xuICAgIHRoaXMucGFyYW1zLmRpc3RhbmNlID0gTWF0aC5taW4oTWF0aC5tYXgocmFkaXVzLCAyMDAwKSwgNTAwMDApO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5jdXN0b21QYXJhbSkge1xuICAgICAgdGhpcy5wYXRoID0gJ2ZpbmRBZGRyZXNzQ2FuZGlkYXRlcyc7XG4gICAgICB0aGlzLnBhcmFtc1t0aGlzLm9wdGlvbnMuY3VzdG9tUGFyYW1dID0gdGhpcy5wYXJhbXMudGV4dDtcbiAgICAgIGRlbGV0ZSB0aGlzLnBhcmFtcy50ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhdGggPSAodGhpcy5wYXJhbXMudGV4dCkgPyAnZmluZCcgOiAnZmluZEFkZHJlc3NDYW5kaWRhdGVzJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXRoID09PSAnZmluZEFkZHJlc3NDYW5kaWRhdGVzJyAmJiB0aGlzLnBhcmFtcy5iYm94KSB7XG4gICAgICB0aGlzLnBhcmFtcy5zZWFyY2hFeHRlbnQgPSB0aGlzLnBhcmFtcy5iYm94O1xuICAgICAgZGVsZXRlIHRoaXMucGFyYW1zLmJib3g7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcHJvY2Vzc29yID0gKHRoaXMucGF0aCA9PT0gJ2ZpbmQnKSA/IHRoaXMuX3Byb2Nlc3NGaW5kUmVzcG9uc2UgOiB0aGlzLl9wcm9jZXNzRmluZEFkZHJlc3NDYW5kaWRhdGVzUmVzcG9uc2U7XG4gICAgICB2YXIgcmVzdWx0cyA9ICghZXJyb3IpID8gcHJvY2Vzc29yKHJlc3BvbnNlKSA6IHVuZGVmaW5lZDtcbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHsgcmVzdWx0czogcmVzdWx0cyB9LCByZXNwb25zZSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX3Byb2Nlc3NGaW5kUmVzcG9uc2U6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3BvbnNlLmxvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGxvY2F0aW9uID0gcmVzcG9uc2UubG9jYXRpb25zW2ldO1xuICAgICAgdmFyIGJvdW5kcztcblxuICAgICAgaWYgKGxvY2F0aW9uLmV4dGVudCkge1xuICAgICAgICBib3VuZHMgPSBVdGlsLmV4dGVudFRvQm91bmRzKGxvY2F0aW9uLmV4dGVudCk7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgIHRleHQ6IGxvY2F0aW9uLm5hbWUsXG4gICAgICAgIGJvdW5kczogYm91bmRzLFxuICAgICAgICBzY29yZTogbG9jYXRpb24uZmVhdHVyZS5hdHRyaWJ1dGVzLlNjb3JlLFxuICAgICAgICBsYXRsbmc6IEwubGF0TG5nKGxvY2F0aW9uLmZlYXR1cmUuZ2VvbWV0cnkueSwgbG9jYXRpb24uZmVhdHVyZS5nZW9tZXRyeS54KSxcbiAgICAgICAgcHJvcGVydGllczogbG9jYXRpb24uZmVhdHVyZS5hdHRyaWJ1dGVzXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSxcblxuICBfcHJvY2Vzc0ZpbmRBZGRyZXNzQ2FuZGlkYXRlc1Jlc3BvbnNlOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2FuZGlkYXRlID0gcmVzcG9uc2UuY2FuZGlkYXRlc1tpXTtcbiAgICAgIGlmIChjYW5kaWRhdGUuZXh0ZW50KSB7XG4gICAgICAgIHZhciBib3VuZHMgPSBVdGlsLmV4dGVudFRvQm91bmRzKGNhbmRpZGF0ZS5leHRlbnQpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICB0ZXh0OiBjYW5kaWRhdGUuYWRkcmVzcyxcbiAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgIHNjb3JlOiBjYW5kaWRhdGUuc2NvcmUsXG4gICAgICAgIGxhdGxuZzogTC5sYXRMbmcoY2FuZGlkYXRlLmxvY2F0aW9uLnksIGNhbmRpZGF0ZS5sb2NhdGlvbi54KSxcbiAgICAgICAgcHJvcGVydGllczogY2FuZGlkYXRlLmF0dHJpYnV0ZXNcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VvY29kZSAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEdlb2NvZGUob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlb2NvZGU7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFRhc2sgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuaW1wb3J0IHsgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsIH0gZnJvbSAnLi4vRXNyaUxlYWZsZXRHZW9jb2RpbmcnO1xuXG5leHBvcnQgdmFyIFJldmVyc2VHZW9jb2RlID0gVGFzay5leHRlbmQoe1xuICBwYXRoOiAncmV2ZXJzZUdlb2NvZGUnLFxuXG4gIHBhcmFtczoge1xuICAgIG91dFNSOiA0MzI2LFxuICAgIHJldHVybkludGVyc2VjdGlvbjogZmFsc2VcbiAgfSxcblxuICBzZXR0ZXJzOiB7XG4gICAgJ2Rpc3RhbmNlJzogJ2Rpc3RhbmNlJyxcbiAgICAnbGFuZ3VhZ2UnOiAnbGFuZ0NvZGUnLFxuICAgICdpbnRlcnNlY3Rpb24nOiAncmV0dXJuSW50ZXJzZWN0aW9uJ1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy51cmwgPSBvcHRpb25zLnVybCB8fCBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmw7XG4gICAgVGFzay5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIGxhdGxuZzogZnVuY3Rpb24gKGxhdGxuZykge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMubG9jYXRpb24gPSBsYXRsbmcubG5nICsgJywnICsgbGF0bG5nLmxhdDtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgdmFyIHJlc3VsdDtcblxuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgbGF0bG5nOiBMLmxhdExuZyhyZXNwb25zZS5sb2NhdGlvbi55LCByZXNwb25zZS5sb2NhdGlvbi54KSxcbiAgICAgICAgICBhZGRyZXNzOiByZXNwb25zZS5hZGRyZXNzXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3VsdCwgcmVzcG9uc2UpO1xuICAgIH0sIHRoaXMpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VHZW9jb2RlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgUmV2ZXJzZUdlb2NvZGUob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJldmVyc2VHZW9jb2RlO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBUYXNrLCBVdGlsIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcbmltcG9ydCB7IFdvcmxkR2VvY29kaW5nU2VydmljZVVybCB9IGZyb20gJy4uL0VzcmlMZWFmbGV0R2VvY29kaW5nJztcblxuZXhwb3J0IHZhciBTdWdnZXN0ID0gVGFzay5leHRlbmQoe1xuICBwYXRoOiAnc3VnZ2VzdCcsXG5cbiAgcGFyYW1zOiB7fSxcblxuICBzZXR0ZXJzOiB7XG4gICAgdGV4dDogJ3RleHQnLFxuICAgIGNhdGVnb3J5OiAnY2F0ZWdvcnknLFxuICAgIGNvdW50cmllczogJ2NvdW50cnlDb2RlJyxcbiAgICBtYXhTdWdnZXN0aW9uczogJ21heFN1Z2dlc3Rpb25zJ1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKCFvcHRpb25zLnVybCkge1xuICAgICAgb3B0aW9ucy51cmwgPSBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmw7XG4gICAgICBvcHRpb25zLnN1cHBvcnRzU3VnZ2VzdCA9IHRydWU7XG4gICAgfVxuICAgIFRhc2sucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICB3aXRoaW46IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhib3VuZHMpO1xuICAgIGJvdW5kcyA9IGJvdW5kcy5wYWQoMC41KTtcbiAgICB2YXIgY2VudGVyID0gYm91bmRzLmdldENlbnRlcigpO1xuICAgIHZhciBuZSA9IGJvdW5kcy5nZXROb3J0aFdlc3QoKTtcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGNlbnRlci5sbmcgKyAnLCcgKyBjZW50ZXIubGF0O1xuICAgIHRoaXMucGFyYW1zLmRpc3RhbmNlID0gTWF0aC5taW4oTWF0aC5tYXgoY2VudGVyLmRpc3RhbmNlVG8obmUpLCAyMDAwKSwgNTAwMDApO1xuICAgIHRoaXMucGFyYW1zLnNlYXJjaEV4dGVudCA9IFV0aWwuYm91bmRzVG9FeHRlbnQoYm91bmRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBuZWFyYnk6IGZ1bmN0aW9uIChsYXRsbmcsIHJhZGl1cykge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMubG9jYXRpb24gPSBsYXRsbmcubG5nICsgJywnICsgbGF0bG5nLmxhdDtcbiAgICB0aGlzLnBhcmFtcy5kaXN0YW5jZSA9IE1hdGgubWluKE1hdGgubWF4KHJhZGl1cywgMjAwMCksIDUwMDAwKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UsIHJlc3BvbnNlKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3RoaXMgZ2VvY29kaW5nIHNlcnZpY2UgZG9lcyBub3Qgc3VwcG9ydCBhc2tpbmcgZm9yIHN1Z2dlc3Rpb25zJyk7XG4gICAgfVxuICB9XG5cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gc3VnZ2VzdCAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IFN1Z2dlc3Qob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN1Z2dlc3Q7XG4iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcbmltcG9ydCB7IFdvcmxkR2VvY29kaW5nU2VydmljZVVybCB9IGZyb20gJy4uL0VzcmlMZWFmbGV0R2VvY29kaW5nJztcbmltcG9ydCBnZW9jb2RlIGZyb20gJy4uL1Rhc2tzL0dlb2NvZGUnO1xuaW1wb3J0IHJldmVyc2VHZW9jb2RlIGZyb20gJy4uL1Rhc2tzL1JldmVyc2VHZW9jb2RlJztcbmltcG9ydCBzdWdnZXN0IGZyb20gJy4uL1Rhc2tzL1N1Z2dlc3QnO1xuXG5leHBvcnQgdmFyIEdlb2NvZGVTZXJ2aWNlID0gU2VydmljZS5leHRlbmQoe1xuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmIChvcHRpb25zLnVybCkge1xuICAgICAgU2VydmljZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgdGhpcy5fY29uZmlybVN1Z2dlc3RTdXBwb3J0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMudXJsID0gV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsO1xuICAgICAgb3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QgPSB0cnVlO1xuICAgICAgU2VydmljZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSxcblxuICBnZW9jb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdlb2NvZGUodGhpcyk7XG4gIH0sXG5cbiAgcmV2ZXJzZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByZXZlcnNlR2VvY29kZSh0aGlzKTtcbiAgfSxcblxuICBzdWdnZXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gcmVxdWlyZXMgZWl0aGVyIHRoZSBFc3JpIFdvcmxkIEdlb2NvZGluZyBTZXJ2aWNlIG9yIGEgPDEwLjMgQXJjR0lTIFNlcnZlciBHZW9jb2RpbmcgU2VydmljZSB0aGF0IHN1cHBvcnRzIHN1Z2dlc3QuXG4gICAgcmV0dXJuIHN1Z2dlc3QodGhpcyk7XG4gIH0sXG5cbiAgX2NvbmZpcm1TdWdnZXN0U3VwcG9ydDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubWV0YWRhdGEoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKGVycm9yKSB7IHJldHVybjsgfVxuICAgICAgLy8gcHJlIDEwLjMgZ2VvY29kaW5nIHNlcnZpY2VzIGRvbnQgbGlzdCBjYXBhYmlsaXRpZXMgKGFuZCBkb250IHN1cHBvcnQgbWF4TG9jYXRpb25zKVxuICAgICAgLy8gc2luY2UsIG9ubHkgU09NRSBpbmRpdmlkdWFsIHNlcnZpY2VzIGhhdmUgYmVlbiBjb25maWd1cmVkIHRvIHN1cHBvcnQgYXNraW5nIGZvciBzdWdnZXN0aW9uc1xuICAgICAgaWYgKCFyZXNwb25zZS5jYXBhYmlsaXRpZXMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnN1cHBvcnRzU3VnZ2VzdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9wdGlvbnMuY3VzdG9tUGFyYW0gPSByZXNwb25zZS5zaW5nbGVMaW5lQWRkcmVzc0ZpZWxkLm5hbWU7XG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLmNhcGFiaWxpdGllcy5pbmRleE9mKCdTdWdnZXN0JykgPiAtMSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9jb2RlU2VydmljZSAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEdlb2NvZGVTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW9jb2RlU2VydmljZTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuXG5leHBvcnQgdmFyIEdlb3NlYXJjaENvcmUgPSBMLkV2ZW50ZWQuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgem9vbVRvUmVzdWx0OiB0cnVlLFxuICAgIHVzZU1hcEJvdW5kczogMTIsXG4gICAgc2VhcmNoQm91bmRzOiBudWxsXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKGNvbnRyb2wsIG9wdGlvbnMpIHtcbiAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9jb250cm9sID0gY29udHJvbDtcblxuICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5wcm92aWRlcnMgfHwgIW9wdGlvbnMucHJvdmlkZXJzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IGF0IGxlYXN0IG9uZSBwcm92aWRlcicpO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb3ZpZGVycyA9IG9wdGlvbnMucHJvdmlkZXJzO1xuICB9LFxuXG4gIF9nZW9jb2RlOiBmdW5jdGlvbiAodGV4dCwga2V5LCBwcm92aWRlcikge1xuICAgIHZhciBhY3RpdmVSZXF1ZXN0cyA9IDA7XG4gICAgdmFyIGFsbFJlc3VsdHMgPSBbXTtcbiAgICB2YXIgYm91bmRzO1xuXG4gICAgdmFyIGNhbGxiYWNrID0gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCByZXN1bHRzKSB7XG4gICAgICBhY3RpdmVSZXF1ZXN0cy0tO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgYWxsUmVzdWx0cyA9IGFsbFJlc3VsdHMuY29uY2F0KHJlc3VsdHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdHMgPD0gMCkge1xuICAgICAgICBib3VuZHMgPSB0aGlzLl9ib3VuZHNGcm9tUmVzdWx0cyhhbGxSZXN1bHRzKTtcblxuICAgICAgICB0aGlzLmZpcmUoJ3Jlc3VsdHMnLCB7XG4gICAgICAgICAgcmVzdWx0czogYWxsUmVzdWx0cyxcbiAgICAgICAgICBib3VuZHM6IGJvdW5kcyxcbiAgICAgICAgICBsYXRsbmc6IChib3VuZHMpID8gYm91bmRzLmdldENlbnRlcigpIDogdW5kZWZpbmVkLFxuICAgICAgICAgIHRleHQ6IHRleHRcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy56b29tVG9SZXN1bHQgJiYgYm91bmRzKSB7XG4gICAgICAgICAgdGhpcy5fY29udHJvbC5fbWFwLmZpdEJvdW5kcyhib3VuZHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJlKCdsb2FkJyk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBhY3RpdmVSZXF1ZXN0cysrO1xuICAgICAgcHJvdmlkZXIucmVzdWx0cyh0ZXh0LCBrZXksIHRoaXMuX3NlYXJjaEJvdW5kcygpLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFjdGl2ZVJlcXVlc3RzKys7XG4gICAgICAgIHRoaXMuX3Byb3ZpZGVyc1tpXS5yZXN1bHRzKHRleHQsIGtleSwgdGhpcy5fc2VhcmNoQm91bmRzKCksIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX3N1Z2dlc3Q6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgdmFyIGFjdGl2ZVJlcXVlc3RzID0gdGhpcy5fcHJvdmlkZXJzLmxlbmd0aDtcblxuICAgIHZhciBjcmVhdGVDYWxsYmFjayA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uICh0ZXh0LCBwcm92aWRlcikge1xuICAgICAgcmV0dXJuIEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RzID0gYWN0aXZlUmVxdWVzdHMgLSAxO1xuXG4gICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdWdnZXN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3VnZ2VzdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zW2ldLnByb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHdlIHN0aWxsIG5lZWQgdG8gdXBkYXRlIHRoZSBVSVxuICAgICAgICAgIHRoaXMuX2NvbnRyb2wuX3JlbmRlclN1Z2dlc3Rpb25zKHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm92aWRlci5fbGFzdFJlbmRlciAhPT0gdGV4dCAmJiBwcm92aWRlci5ub2Rlcykge1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwcm92aWRlci5ub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb3ZpZGVyLm5vZGVzW2ldLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5fY29udHJvbC5fc3VnZ2VzdGlvbnMucmVtb3ZlQ2hpbGQocHJvdmlkZXIubm9kZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHByb3ZpZGVyLm5vZGVzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoICYmIHRoaXMuX2NvbnRyb2wuX2lucHV0LnZhbHVlID09PSB0ZXh0KSB7XG4gICAgICAgICAgdGhpcy5fY29udHJvbC5jbGVhclN1Z2dlc3Rpb25zKHByb3ZpZGVyLm5vZGVzKTtcblxuICAgICAgICAgIHByb3ZpZGVyLl9sYXN0UmVuZGVyID0gdGV4dDtcbiAgICAgICAgICBwcm92aWRlci5ub2RlcyA9IHRoaXMuX2NvbnRyb2wuX3JlbmRlclN1Z2dlc3Rpb25zKHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICB0aGlzLl9jb250cm9sLl9ub2RlcyA9IFtdO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHRoaXMuX3BlbmRpbmdTdWdnZXN0aW9ucyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9wcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwcm92aWRlciA9IHRoaXMuX3Byb3ZpZGVyc1tpXTtcbiAgICAgIHZhciByZXF1ZXN0ID0gcHJvdmlkZXIuc3VnZ2VzdGlvbnModGV4dCwgdGhpcy5fc2VhcmNoQm91bmRzKCksIGNyZWF0ZUNhbGxiYWNrKHRleHQsIHByb3ZpZGVyKSk7XG4gICAgICB0aGlzLl9wZW5kaW5nU3VnZ2VzdGlvbnMucHVzaChyZXF1ZXN0KTtcbiAgICB9XG4gIH0sXG5cbiAgX3NlYXJjaEJvdW5kczogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc2VhcmNoQm91bmRzICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNlYXJjaEJvdW5kcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZU1hcEJvdW5kcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlTWFwQm91bmRzID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udHJvbC5fbWFwLmdldEJvdW5kcygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlTWFwQm91bmRzIDw9IHRoaXMuX2NvbnRyb2wuX21hcC5nZXRab29tKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb250cm9sLl9tYXAuZ2V0Qm91bmRzKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgX2JvdW5kc0Zyb21SZXN1bHRzOiBmdW5jdGlvbiAocmVzdWx0cykge1xuICAgIGlmICghcmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbnVsbElzbGFuZCA9IEwubGF0TG5nQm91bmRzKFswLCAwXSwgWzAsIDBdKTtcbiAgICB2YXIgcmVzdWx0Qm91bmRzID0gW107XG4gICAgdmFyIHJlc3VsdExhdGxuZ3MgPSBbXTtcblxuICAgIC8vIGNvbGxlY3QgdGhlIGJvdW5kcyBhbmQgY2VudGVyIG9mIGVhY2ggcmVzdWx0XG4gICAgZm9yICh2YXIgaSA9IHJlc3VsdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciByZXN1bHQgPSByZXN1bHRzW2ldO1xuXG4gICAgICByZXN1bHRMYXRsbmdzLnB1c2gocmVzdWx0LmxhdGxuZyk7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSBib3VuZHMgYXJlIHZhbGlkIGFuZCBub3QgMCwwLiBzb21ldGltZXMgYm91bmRzIGFyZSBpbmNvcnJlY3Qgb3Igbm90IHByZXNlbnRcbiAgICAgIGlmIChyZXN1bHQuYm91bmRzICYmIHJlc3VsdC5ib3VuZHMuaXNWYWxpZCgpICYmICFyZXN1bHQuYm91bmRzLmVxdWFscyhudWxsSXNsYW5kKSkge1xuICAgICAgICByZXN1bHRCb3VuZHMucHVzaChyZXN1bHQuYm91bmRzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmb3JtIGEgYm91bmRzIG9iamVjdCBjb250YWluaW5nIGFsbCBjZW50ZXIgcG9pbnRzXG4gICAgdmFyIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKHJlc3VsdExhdGxuZ3MpO1xuXG4gICAgLy8gYW5kIGV4dGVuZCBpdCB0byBjb250YWluIGFsbCBib3VuZHMgb2JqZWN0c1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzdWx0Qm91bmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICBib3VuZHMuZXh0ZW5kKHJlc3VsdEJvdW5kc1tqXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfSxcblxuICBfZ2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXR0cmlicyA9IFtdO1xuICAgIHZhciBwcm92aWRlcnMgPSB0aGlzLl9wcm92aWRlcnM7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3ZpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHByb3ZpZGVyc1tpXS5vcHRpb25zLmF0dHJpYnV0aW9uKSB7XG4gICAgICAgIGF0dHJpYnMucHVzaChwcm92aWRlcnNbaV0ub3B0aW9ucy5hdHRyaWJ1dGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJpYnMuam9pbignLCAnKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlb3NlYXJjaENvcmUgKGNvbnRyb2wsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBHZW9zZWFyY2hDb3JlKGNvbnRyb2wsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW9zZWFyY2hDb3JlO1xuIiwiaW1wb3J0IHsgR2VvY29kZVNlcnZpY2UgfSBmcm9tICcuLi9TZXJ2aWNlcy9HZW9jb2RlJztcblxuZXhwb3J0IHZhciBBcmNnaXNPbmxpbmVQcm92aWRlciA9IEdlb2NvZGVTZXJ2aWNlLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBsYWJlbDogJ1BsYWNlcyBhbmQgQWRkcmVzc2VzJyxcbiAgICBtYXhSZXN1bHRzOiA1XG4gIH0sXG5cbiAgc3VnZ2VzdGlvbnM6IGZ1bmN0aW9uICh0ZXh0LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB0aGlzLnN1Z2dlc3QoKS50ZXh0KHRleHQpO1xuXG4gICAgaWYgKGJvdW5kcykge1xuICAgICAgcmVxdWVzdC53aXRoaW4oYm91bmRzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvdW50cmllcykge1xuICAgICAgcmVxdWVzdC5jb3VudHJpZXModGhpcy5vcHRpb25zLmNvdW50cmllcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jYXRlZ29yaWVzKSB7XG4gICAgICByZXF1ZXN0LmNhdGVnb3J5KHRoaXMub3B0aW9ucy5jYXRlZ29yaWVzKTtcbiAgICB9XG5cbiAgICAvLyAxNSBpcyB0aGUgbWF4aW11bSBudW1iZXIgb2Ygc3VnZ2VzdGlvbnMgdGhhdCBjYW4gYmUgcmV0dXJuZWRcbiAgICByZXF1ZXN0Lm1heFN1Z2dlc3Rpb25zKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzKTtcblxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgc3VnZ2VzdGlvbnMgPSBbXTtcbiAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgd2hpbGUgKHJlc3BvbnNlLnN1Z2dlc3Rpb25zLmxlbmd0aCAmJiBzdWdnZXN0aW9ucy5sZW5ndGggPD0gKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzIC0gMSkpIHtcbiAgICAgICAgICB2YXIgc3VnZ2VzdGlvbiA9IHJlc3BvbnNlLnN1Z2dlc3Rpb25zLnNoaWZ0KCk7XG4gICAgICAgICAgaWYgKCFzdWdnZXN0aW9uLmlzQ29sbGVjdGlvbikge1xuICAgICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgIHRleHQ6IHN1Z2dlc3Rpb24udGV4dCxcbiAgICAgICAgICAgICAgbWFnaWNLZXk6IHN1Z2dlc3Rpb24ubWFnaWNLZXlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FsbGJhY2soZXJyb3IsIHN1Z2dlc3Rpb25zKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB0aGlzLmdlb2NvZGUoKS50ZXh0KHRleHQpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgcmVxdWVzdC5rZXkoa2V5KTtcbiAgICB9XG4gICAgLy8gaW4gdGhlIGZ1dHVyZSBBZGRyZXNzL1N0cmVldE5hbWUgZ2VvY29kaW5nIHJlcXVlc3RzIHRoYXQgaW5jbHVkZSBhIG1hZ2ljS2V5IHdpbGwgb25seSByZXR1cm4gb25lIG1hdGNoXG4gICAgcmVxdWVzdC5tYXhMb2NhdGlvbnModGhpcy5vcHRpb25zLm1heFJlc3VsdHMpO1xuXG4gICAgaWYgKGJvdW5kcykge1xuICAgICAgcmVxdWVzdC53aXRoaW4oYm91bmRzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmZvclN0b3JhZ2UpIHtcbiAgICAgIHJlcXVlc3QuZm9yU3RvcmFnZSh0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3BvbnNlLnJlc3VsdHMpO1xuICAgIH0sIHRoaXMpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFyY2dpc09ubGluZVByb3ZpZGVyIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgQXJjZ2lzT25saW5lUHJvdmlkZXIob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFyY2dpc09ubGluZVByb3ZpZGVyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBnZW9zZWFyY2hDb3JlIH0gZnJvbSAnLi4vQ2xhc3Nlcy9HZW9zZWFyY2hDb3JlJztcbmltcG9ydCB7IGFyY2dpc09ubGluZVByb3ZpZGVyIH0gZnJvbSAnLi4vUHJvdmlkZXJzL0FyY2dpc09ubGluZUdlb2NvZGVyJztcbmltcG9ydCB7IFV0aWwgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuXG5leHBvcnQgdmFyIEdlb3NlYXJjaCA9IEwuQ29udHJvbC5leHRlbmQoe1xuICBpbmNsdWRlczogTC5NaXhpbi5FdmVudHMsXG5cbiAgb3B0aW9uczoge1xuICAgIHBvc2l0aW9uOiAndG9wbGVmdCcsXG4gICAgY29sbGFwc2VBZnRlclJlc3VsdDogdHJ1ZSxcbiAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgYWxsb3dNdWx0aXBsZVJlc3VsdHM6IHRydWUsXG4gICAgcGxhY2Vob2xkZXI6ICdTZWFyY2ggZm9yIHBsYWNlcyBvciBhZGRyZXNzZXMnLFxuICAgIHRpdGxlOiAnTG9jYXRpb24gU2VhcmNoJ1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG5cbiAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMucHJvdmlkZXJzIHx8ICFvcHRpb25zLnByb3ZpZGVycy5sZW5ndGgpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgIG9wdGlvbnMucHJvdmlkZXJzID0gWyBhcmNnaXNPbmxpbmVQcm92aWRlcigpIF07XG4gICAgfVxuXG4gICAgLy8gaW5zdGFudGlhdGUgdGhlIHVuZGVybHlpbmcgY2xhc3MgYW5kIHBhc3MgYWxvbmcgb3B0aW9uc1xuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUgPSBnZW9zZWFyY2hDb3JlKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX3Byb3ZpZGVycyA9IG9wdGlvbnMucHJvdmlkZXJzO1xuXG4gICAgLy8gYnViYmxlIGVhY2ggcHJvdmlkZXJzIGV2ZW50cyB0byB0aGUgY29udHJvbFxuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuYWRkRXZlbnRQYXJlbnQodGhpcyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX3Byb3ZpZGVyc1tpXS5hZGRFdmVudFBhcmVudCh0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wZW5kaW5nU3VnZ2VzdGlvbnMgPSBbXTtcblxuICAgIEwuQ29udHJvbC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKG9wdGlvbnMpO1xuICB9LFxuXG4gIF9yZW5kZXJTdWdnZXN0aW9uczogZnVuY3Rpb24gKHN1Z2dlc3Rpb25zKSB7XG4gICAgdmFyIGN1cnJlbnRHcm91cDtcbiAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgIC8vIHNldCB0aGUgbWF4SGVpZ2h0IG9mIHRoZSBzdWdnZXN0aW9ucyBib3ggdG9cbiAgICAvLyBtYXAgaGVpZ2h0XG4gICAgLy8gLSBzdWdnZXN0aW9ucyBvZmZzZXQgKGRpc3RhbmNlIGZyb20gdG9wIG9mIHN1Z2dlc3Rpb25zIHRvIHRvcCBvZiBjb250cm9sKVxuICAgIC8vIC0gY29udHJvbCBvZmZzZXQgKGRpc3RhbmNlIGZyb20gdG9wIG9mIGNvbnRyb2wgdG8gdG9wIG9mIG1hcClcbiAgICAvLyAtIDEwIChleHRyYSBwYWRkaW5nKVxuICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLm1heEhlaWdodCA9ICh0aGlzLl9tYXAuZ2V0U2l6ZSgpLnkgLSB0aGlzLl9zdWdnZXN0aW9ucy5vZmZzZXRUb3AgLSB0aGlzLl93cmFwcGVyLm9mZnNldFRvcCAtIDEwKSArICdweCc7XG5cbiAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICB2YXIgbGlzdDtcbiAgICB2YXIgaGVhZGVyO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWdnZXN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHN1Z2dlc3Rpb24gPSBzdWdnZXN0aW9uc1tpXTtcbiAgICAgIGlmICghaGVhZGVyICYmIHRoaXMuX2dlb3NlYXJjaENvcmUuX3Byb3ZpZGVycy5sZW5ndGggPiAxICYmIGN1cnJlbnRHcm91cCAhPT0gc3VnZ2VzdGlvbi5wcm92aWRlci5vcHRpb25zLmxhYmVsKSB7XG4gICAgICAgIGhlYWRlciA9IEwuRG9tVXRpbC5jcmVhdGUoJ3NwYW4nLCAnZ2VvY29kZXItY29udHJvbC1oZWFkZXInLCB0aGlzLl9zdWdnZXN0aW9ucyk7XG4gICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IHN1Z2dlc3Rpb24ucHJvdmlkZXIub3B0aW9ucy5sYWJlbDtcbiAgICAgICAgaGVhZGVyLmlubmVyVGV4dCA9IHN1Z2dlc3Rpb24ucHJvdmlkZXIub3B0aW9ucy5sYWJlbDtcbiAgICAgICAgY3VycmVudEdyb3VwID0gc3VnZ2VzdGlvbi5wcm92aWRlci5vcHRpb25zLmxhYmVsO1xuICAgICAgICBub2Rlcy5wdXNoKGhlYWRlcik7XG4gICAgICB9XG5cbiAgICAgIGlmICghbGlzdCkge1xuICAgICAgICBsaXN0ID0gTC5Eb21VdGlsLmNyZWF0ZSgndWwnLCAnZ2VvY29kZXItY29udHJvbC1saXN0JywgdGhpcy5fc3VnZ2VzdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3VnZ2VzdGlvbkl0ZW0gPSBMLkRvbVV0aWwuY3JlYXRlKCdsaScsICdnZW9jb2Rlci1jb250cm9sLXN1Z2dlc3Rpb24nLCBsaXN0KTtcblxuICAgICAgc3VnZ2VzdGlvbkl0ZW0uaW5uZXJIVE1MID0gc3VnZ2VzdGlvbi50ZXh0O1xuICAgICAgc3VnZ2VzdGlvbkl0ZW0ucHJvdmlkZXIgPSBzdWdnZXN0aW9uLnByb3ZpZGVyO1xuICAgICAgc3VnZ2VzdGlvbkl0ZW1bJ2RhdGEtbWFnaWMta2V5J10gPSBzdWdnZXN0aW9uLm1hZ2ljS2V5O1xuICAgIH1cblxuICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9pbnB1dCwgJ2dlb2NvZGVyLWNvbnRyb2wtbG9hZGluZycpO1xuXG4gICAgbm9kZXMucHVzaChsaXN0KTtcblxuICAgIHJldHVybiBub2RlcztcbiAgfSxcblxuICBfYm91bmRzRnJvbVJlc3VsdHM6IGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgaWYgKCFyZXN1bHRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBudWxsSXNsYW5kID0gTC5sYXRMbmdCb3VuZHMoWzAsIDBdLCBbMCwgMF0pO1xuICAgIHZhciByZXN1bHRCb3VuZHMgPSBbXTtcbiAgICB2YXIgcmVzdWx0TGF0bG5ncyA9IFtdO1xuXG4gICAgLy8gY29sbGVjdCB0aGUgYm91bmRzIGFuZCBjZW50ZXIgb2YgZWFjaCByZXN1bHRcbiAgICBmb3IgKHZhciBpID0gcmVzdWx0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIHJlc3VsdCA9IHJlc3VsdHNbaV07XG5cbiAgICAgIHJlc3VsdExhdGxuZ3MucHVzaChyZXN1bHQubGF0bG5nKTtcblxuICAgICAgLy8gbWFrZSBzdXJlIGJvdW5kcyBhcmUgdmFsaWQgYW5kIG5vdCAwLDAuIHNvbWV0aW1lcyBib3VuZHMgYXJlIGluY29ycmVjdCBvciBub3QgcHJlc2VudFxuICAgICAgaWYgKHJlc3VsdC5ib3VuZHMgJiYgcmVzdWx0LmJvdW5kcy5pc1ZhbGlkKCkgJiYgIXJlc3VsdC5ib3VuZHMuZXF1YWxzKG51bGxJc2xhbmQpKSB7XG4gICAgICAgIHJlc3VsdEJvdW5kcy5wdXNoKHJlc3VsdC5ib3VuZHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZvcm0gYSBib3VuZHMgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIGNlbnRlciBwb2ludHNcbiAgICB2YXIgYm91bmRzID0gTC5sYXRMbmdCb3VuZHMocmVzdWx0TGF0bG5ncyk7XG5cbiAgICAvLyBhbmQgZXh0ZW5kIGl0IHRvIGNvbnRhaW4gYWxsIGJvdW5kcyBvYmplY3RzXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXN1bHRCb3VuZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGJvdW5kcy5leHRlbmQocmVzdWx0Qm91bmRzW2pdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9LFxuXG4gIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fc3VnZ2VzdGlvbnMuaW5uZXJIVE1MID0gJyc7XG4gICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLl9pbnB1dC52YWx1ZSA9ICcnO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb2xsYXBzZUFmdGVyUmVzdWx0KSB7XG4gICAgICB0aGlzLl9pbnB1dC5wbGFjZWhvbGRlciA9ICcnO1xuICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9tYXAuc2Nyb2xsV2hlZWxab29tLmVuYWJsZWQoKSAmJiB0aGlzLl9tYXAub3B0aW9ucy5zY3JvbGxXaGVlbFpvb20pIHtcbiAgICAgIHRoaXMuX21hcC5zY3JvbGxXaGVlbFpvb20uZW5hYmxlKCk7XG4gICAgfVxuICB9LFxuXG4gIGNsZWFyU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fbm9kZXMpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5fbm9kZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgaWYgKHRoaXMuX25vZGVzW2tdLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5yZW1vdmVDaGlsZCh0aGlzLl9ub2Rlc1trXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX3NldHVwQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fd3JhcHBlciwgJ2dlb2NvZGVyLWNvbnRyb2wtZXhwYW5kZWQnKTtcbiAgICB0aGlzLl9pbnB1dC5mb2N1cygpO1xuICB9LFxuXG4gIGRpc2FibGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9pbnB1dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1pbnB1dC1kaXNhYmxlZCcpO1xuICAgIEwuRG9tRXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5fd3JhcHBlciwgJ2NsaWNrJywgdGhpcy5fc2V0dXBDbGljaywgdGhpcyk7XG4gIH0sXG5cbiAgZW5hYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5faW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWlucHV0LWRpc2FibGVkJyk7XG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl93cmFwcGVyLCAnY2xpY2snLCB0aGlzLl9zZXR1cENsaWNrLCB0aGlzKTtcbiAgfSxcblxuICBnZXRBdHRyaWJ1dGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBhdHRyaWJzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3Byb3ZpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuX3Byb3ZpZGVyc1tpXS5vcHRpb25zLmF0dHJpYnV0aW9uKSB7XG4gICAgICAgIGF0dHJpYnMucHVzaCh0aGlzLl9wcm92aWRlcnNbaV0ub3B0aW9ucy5hdHRyaWJ1dGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJpYnMuam9pbignLCAnKTtcbiAgfSxcblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIC8vIGluY2x1ZGUgJ1Bvd2VyZWQgYnkgRXNyaScgaW4gbWFwIGF0dHJpYnV0aW9uXG4gICAgVXRpbC5zZXRFc3JpQXR0cmlidXRpb24obWFwKTtcblxuICAgIHRoaXMuX21hcCA9IG1hcDtcbiAgICB0aGlzLl93cmFwcGVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2dlb2NvZGVyLWNvbnRyb2wnKTtcbiAgICB0aGlzLl9pbnB1dCA9IEwuRG9tVXRpbC5jcmVhdGUoJ2lucHV0JywgJ2dlb2NvZGVyLWNvbnRyb2wtaW5wdXQgbGVhZmxldC1iYXInLCB0aGlzLl93cmFwcGVyKTtcbiAgICB0aGlzLl9pbnB1dC50aXRsZSA9IHRoaXMub3B0aW9ucy50aXRsZTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZXhwYW5kZWQpIHtcbiAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl93cmFwcGVyLCAnZ2VvY29kZXItY29udHJvbC1leHBhbmRlZCcpO1xuICAgICAgdGhpcy5faW5wdXQucGxhY2Vob2xkZXIgPSB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgdGhpcy5fc3VnZ2VzdGlvbnMgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9ucyBsZWFmbGV0LWJhcicsIHRoaXMuX3dyYXBwZXIpO1xuXG4gICAgdmFyIGNyZWRpdHMgPSB0aGlzLl9nZW9zZWFyY2hDb3JlLl9nZXRBdHRyaWJ1dGlvbigpO1xuICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuYWRkQXR0cmlidXRpb24oY3JlZGl0cyk7XG5cbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX2lucHV0LCAnZm9jdXMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdGhpcy5faW5wdXQucGxhY2Vob2xkZXIgPSB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXI7XG4gICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fd3JhcHBlciwgJ2dlb2NvZGVyLWNvbnRyb2wtZXhwYW5kZWQnKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fd3JhcHBlciwgJ2NsaWNrJywgdGhpcy5fc2V0dXBDbGljaywgdGhpcyk7XG5cbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX3N1Z2dlc3Rpb25zLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBzdWdnZXN0aW9uSXRlbSA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX2dlb2NvZGUoc3VnZ2VzdGlvbkl0ZW0uaW5uZXJIVE1MLCBzdWdnZXN0aW9uSXRlbVsnZGF0YS1tYWdpYy1rZXknXSwgc3VnZ2VzdGlvbkl0ZW0ucHJvdmlkZXIpO1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9pbnB1dCwgJ2JsdXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XG5cbiAgICAgIHZhciBsaXN0ID0gdGhpcy5fc3VnZ2VzdGlvbnMucXVlcnlTZWxlY3RvckFsbCgnLicgKyAnZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9uJyk7XG4gICAgICB2YXIgc2VsZWN0ZWQgPSB0aGlzLl9zdWdnZXN0aW9ucy5xdWVyeVNlbGVjdG9yQWxsKCcuJyArICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJylbMF07XG4gICAgICB2YXIgc2VsZWN0ZWRQb3NpdGlvbjtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsaXN0W2ldID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgIHNlbGVjdGVkUG9zaXRpb24gPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9nZW9jb2RlKHNlbGVjdGVkLmlubmVySFRNTCwgc2VsZWN0ZWRbJ2RhdGEtbWFnaWMta2V5J10sIHNlbGVjdGVkLnByb3ZpZGVyKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5hbGxvd011bHRpcGxlUmVzdWx0cykge1xuICAgICAgICAgICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fZ2VvY29kZSh0aGlzLl9pbnB1dC52YWx1ZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKGxpc3RbMF0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3Moc2VsZWN0ZWQsICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHByZXZpb3VzSXRlbSA9IGxpc3Rbc2VsZWN0ZWRQb3NpdGlvbiAtIDFdO1xuXG4gICAgICAgICAgaWYgKHNlbGVjdGVkICYmIHByZXZpb3VzSXRlbSkge1xuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHByZXZpb3VzSXRlbSwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKGxpc3RbbGlzdC5sZW5ndGggLSAxXSwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyhzZWxlY3RlZCwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbmV4dEl0ZW0gPSBsaXN0W3NlbGVjdGVkUG9zaXRpb24gKyAxXTtcblxuICAgICAgICAgIGlmIChzZWxlY3RlZCAmJiBuZXh0SXRlbSkge1xuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKG5leHRJdGVtLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3MobGlzdFswXSwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyB3aGVuIHRoZSBpbnB1dCBjaGFuZ2VzIHdlIHNob3VsZCBjYW5jZWwgYWxsIHBlbmRpbmcgc3VnZ2VzdGlvbiByZXF1ZXN0cyBpZiBwb3NzaWJsZSB0byBhdm9pZCByZXN1bHQgY29sbGlzaW9uc1xuICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcGVuZGluZ1N1Z2dlc3Rpb25zLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IHRoaXMuX2dlb3NlYXJjaENvcmUuX3BlbmRpbmdTdWdnZXN0aW9uc1t4XTtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0ICYmIHJlcXVlc3QuYWJvcnQgJiYgIXJlcXVlc3QuaWQpIHtcbiAgICAgICAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcblxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5faW5wdXQsICdrZXl1cCcsIEwuVXRpbC50aHJvdHRsZShmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgICAgdmFyIHRleHQgPSAoZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50KS52YWx1ZTtcblxuICAgICAgLy8gcmVxdWlyZSBhdCBsZWFzdCAyIGNoYXJhY3RlcnMgZm9yIHN1Z2dlc3Rpb25zXG4gICAgICBpZiAodGV4dC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWxvYWRpbmcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGlzIGlzIHRoZSBlc2NhcGUga2V5IGl0IHdpbGwgY2xlYXIgdGhlIGlucHV0IHNvIGNsZWFyIHN1Z2dlc3Rpb25zXG4gICAgICBpZiAoa2V5ID09PSAyNykge1xuICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGlzIGlzIE5PVCB0aGUgdXAvZG93biBhcnJvd3Mgb3IgZW50ZXIgbWFrZSBhIHN1Z2dlc3Rpb25cbiAgICAgIGlmIChrZXkgIT09IDEzICYmIGtleSAhPT0gMzggJiYga2V5ICE9PSA0MCkge1xuICAgICAgICBpZiAodGhpcy5faW5wdXQudmFsdWUgIT09IHRoaXMuX2xhc3RWYWx1ZSkge1xuICAgICAgICAgIHRoaXMuX2xhc3RWYWx1ZSA9IHRoaXMuX2lucHV0LnZhbHVlO1xuICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9pbnB1dCwgJ2dlb2NvZGVyLWNvbnRyb2wtbG9hZGluZycpO1xuICAgICAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX3N1Z2dlc3QodGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCA1MCwgdGhpcyksIHRoaXMpO1xuXG4gICAgTC5Eb21FdmVudC5kaXNhYmxlQ2xpY2tQcm9wYWdhdGlvbih0aGlzLl93cmFwcGVyKTtcblxuICAgIC8vIHdoZW4gbW91c2UgbW92ZXMgb3ZlciBzdWdnZXN0aW9ucyBkaXNhYmxlIHNjcm9sbCB3aGVlbCB6b29tIGlmIGl0cyBlbmFibGVkXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9zdWdnZXN0aW9ucywgJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAobWFwLnNjcm9sbFdoZWVsWm9vbS5lbmFibGVkKCkgJiYgbWFwLm9wdGlvbnMuc2Nyb2xsV2hlZWxab29tKSB7XG4gICAgICAgIG1hcC5zY3JvbGxXaGVlbFpvb20uZGlzYWJsZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gd2hlbiBtb3VzZSBtb3ZlcyBsZWF2ZXMgc3VnZ2VzdGlvbnMgZW5hYmxlIHNjcm9sbCB3aGVlbCB6b29tIGlmIGl0cyBkaXNhYmxlZFxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fc3VnZ2VzdGlvbnMsICdtb3VzZW91dCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoIW1hcC5zY3JvbGxXaGVlbFpvb20uZW5hYmxlZCgpICYmIG1hcC5vcHRpb25zLnNjcm9sbFdoZWVsWm9vbSkge1xuICAgICAgICBtYXAuc2Nyb2xsV2hlZWxab29tLmVuYWJsZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5vbignbG9hZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWxvYWRpbmcnKTtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMuX2lucHV0LmJsdXIoKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHJldHVybiB0aGlzLl93cmFwcGVyO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlb3NlYXJjaCAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEdlb3NlYXJjaChvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2Vvc2VhcmNoO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBGZWF0dXJlTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcblxuZXhwb3J0IHZhciBGZWF0dXJlTGF5ZXJQcm92aWRlciA9IEZlYXR1cmVMYXllclNlcnZpY2UuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIGxhYmVsOiAnRmVhdHVyZSBMYXllcicsXG4gICAgbWF4UmVzdWx0czogNSxcbiAgICBidWZmZXJSYWRpdXM6IDEwMDAsXG4gICAgZm9ybWF0U3VnZ2VzdGlvbjogZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgIHJldHVybiBmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkc1swXV07XG4gICAgfVxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgRmVhdHVyZUxheWVyU2VydmljZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMgPSBbdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkc107XG4gICAgfVxuICAgIHRoaXMuX3N1Z2dlc3Rpb25zUXVlcnkgPSB0aGlzLnF1ZXJ5KCk7XG4gICAgdGhpcy5fcmVzdWx0c1F1ZXJ5ID0gdGhpcy5xdWVyeSgpO1xuICB9LFxuXG4gIHN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAodGV4dCwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciBxdWVyeSA9IHRoaXMuX3N1Z2dlc3Rpb25zUXVlcnkud2hlcmUodGhpcy5fYnVpbGRRdWVyeSh0ZXh0KSlcbiAgICAgIC5yZXR1cm5HZW9tZXRyeShmYWxzZSk7XG5cbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICBxdWVyeS5pbnRlcnNlY3RzKGJvdW5kcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pZEZpZWxkKSB7XG4gICAgICBxdWVyeS5maWVsZHMoW3RoaXMub3B0aW9ucy5pZEZpZWxkXS5jb25jYXQodGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcykpO1xuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gcXVlcnkucnVuKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmF3KSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIFtdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5pZEZpZWxkID0gcmF3Lm9iamVjdElkRmllbGROYW1lO1xuICAgICAgICB2YXIgc3VnZ2VzdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHJlc3VsdHMuZmVhdHVyZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB2YXIgZmVhdHVyZSA9IHJlc3VsdHMuZmVhdHVyZXNbaV07XG4gICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICB0ZXh0OiB0aGlzLm9wdGlvbnMuZm9ybWF0U3VnZ2VzdGlvbi5jYWxsKHRoaXMsIGZlYXR1cmUpLFxuICAgICAgICAgICAgbWFnaWNLZXk6IGZlYXR1cmUuaWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayhlcnJvciwgc3VnZ2VzdGlvbnMuc2xpY2UoMCwgdGhpcy5vcHRpb25zLm1heFJlc3VsdHMpKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcblxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9LFxuXG4gIHJlc3VsdHM6IGZ1bmN0aW9uICh0ZXh0LCBrZXksIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLl9yZXN1bHRzUXVlcnk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBxdWVyeS5mZWF0dXJlSWRzKFtrZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcXVlcnkud2hlcmUodGhpcy5fYnVpbGRRdWVyeSh0ZXh0KSk7XG4gICAgfVxuXG4gICAgaWYgKGJvdW5kcykge1xuICAgICAgcXVlcnkud2l0aGluKGJvdW5kcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXJ5LnJ1bihMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIGZlYXR1cmVzKSB7XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmZWF0dXJlcy5mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZmVhdHVyZSA9IGZlYXR1cmVzLmZlYXR1cmVzW2ldO1xuICAgICAgICBpZiAoZmVhdHVyZSkge1xuICAgICAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9mZWF0dXJlQm91bmRzKGZlYXR1cmUpO1xuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIGxhdGxuZzogYm91bmRzLmdldENlbnRlcigpLFxuICAgICAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgICAgICB0ZXh0OiB0aGlzLm9wdGlvbnMuZm9ybWF0U3VnZ2VzdGlvbi5jYWxsKHRoaXMsIGZlYXR1cmUpLFxuICAgICAgICAgICAgcHJvcGVydGllczogZmVhdHVyZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgZ2VvanNvbjogZmVhdHVyZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3VsdHMpO1xuICAgIH0sIHRoaXMpKTtcbiAgfSxcblxuICBvcmRlckJ5OiBmdW5jdGlvbiAoZmllbGROYW1lLCBvcmRlcikge1xuICAgIHRoaXMuX3N1Z2dlc3Rpb25zUXVlcnkub3JkZXJCeShmaWVsZE5hbWUsIG9yZGVyKTtcbiAgfSxcblxuICBfYnVpbGRRdWVyeTogZnVuY3Rpb24gKHRleHQpIHtcbiAgICB2YXIgcXVlcnlTdHJpbmcgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSB0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZmllbGQgPSAndXBwZXIoXCInICsgdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkc1tpXSArICdcIiknO1xuXG4gICAgICBxdWVyeVN0cmluZy5wdXNoKGZpZWxkICsgXCIgTElLRSB1cHBlcignJVwiICsgdGV4dCArIFwiJScpXCIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMud2hlcmUpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMud2hlcmUgKyAnIEFORCAoJyArIHF1ZXJ5U3RyaW5nLmpvaW4oJyBPUiAnKSArICcpJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHF1ZXJ5U3RyaW5nLmpvaW4oJyBPUiAnKTtcbiAgICB9XG4gIH0sXG5cbiAgX2ZlYXR1cmVCb3VuZHM6IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgdmFyIGdlb2pzb24gPSBMLmdlb0pzb24oZmVhdHVyZSk7XG4gICAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgdmFyIGNlbnRlciA9IGdlb2pzb24uZ2V0Qm91bmRzKCkuZ2V0Q2VudGVyKCk7XG4gICAgICB2YXIgbG5nUmFkaXVzID0gKCh0aGlzLm9wdGlvbnMuYnVmZmVyUmFkaXVzIC8gNDAwNzUwMTcpICogMzYwKSAvIE1hdGguY29zKCgxODAgLyBNYXRoLlBJKSAqIGNlbnRlci5sYXQpO1xuICAgICAgdmFyIGxhdFJhZGl1cyA9ICh0aGlzLm9wdGlvbnMuYnVmZmVyUmFkaXVzIC8gNDAwNzUwMTcpICogMzYwO1xuICAgICAgcmV0dXJuIEwubGF0TG5nQm91bmRzKFtjZW50ZXIubGF0IC0gbGF0UmFkaXVzLCBjZW50ZXIubG5nIC0gbG5nUmFkaXVzXSwgW2NlbnRlci5sYXQgKyBsYXRSYWRpdXMsIGNlbnRlci5sbmcgKyBsbmdSYWRpdXNdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdlb2pzb24uZ2V0Qm91bmRzKCk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVMYXllclByb3ZpZGVyIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRmVhdHVyZUxheWVyUHJvdmlkZXIob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZlYXR1cmVMYXllclByb3ZpZGVyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcblxuZXhwb3J0IHZhciBNYXBTZXJ2aWNlUHJvdmlkZXIgPSBNYXBTZXJ2aWNlLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBsYXllcnM6IFswXSxcbiAgICBsYWJlbDogJ01hcCBTZXJ2aWNlJyxcbiAgICBidWZmZXJSYWRpdXM6IDEwMDAsXG4gICAgbWF4UmVzdWx0czogNSxcbiAgICBmb3JtYXRTdWdnZXN0aW9uOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgcmV0dXJuIGZlYXR1cmUucHJvcGVydGllc1tmZWF0dXJlLmRpc3BsYXlGaWVsZE5hbWVdICsgJyA8c21hbGw+JyArIGZlYXR1cmUubGF5ZXJOYW1lICsgJzwvc21hbGw+JztcbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBNYXBTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fZ2V0SWRGaWVsZHMoKTtcbiAgfSxcblxuICBzdWdnZXN0aW9uczogZnVuY3Rpb24gKHRleHQsIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxdWVzdCA9IHRoaXMuZmluZCgpLnRleHQodGV4dCkuZmllbGRzKHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMpLnJldHVybkdlb21ldHJ5KGZhbHNlKS5sYXllcnModGhpcy5vcHRpb25zLmxheWVycyk7XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXN1bHRzLCByYXcpIHtcbiAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICB2YXIgY291bnQgPSBNYXRoLm1pbih0aGlzLm9wdGlvbnMubWF4UmVzdWx0cywgcmVzdWx0cy5mZWF0dXJlcy5sZW5ndGgpO1xuICAgICAgICByYXcucmVzdWx0cyA9IHJhdy5yZXN1bHRzLnJldmVyc2UoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGZlYXR1cmUgPSByZXN1bHRzLmZlYXR1cmVzW2ldO1xuICAgICAgICAgIHZhciByZXN1bHQgPSByYXcucmVzdWx0c1tpXTtcbiAgICAgICAgICB2YXIgbGF5ZXIgPSByZXN1bHQubGF5ZXJJZDtcbiAgICAgICAgICB2YXIgaWRGaWVsZCA9IHRoaXMuX2lkRmllbGRzW2xheWVyXTtcbiAgICAgICAgICBmZWF0dXJlLmxheWVySWQgPSBsYXllcjtcbiAgICAgICAgICBmZWF0dXJlLmxheWVyTmFtZSA9IHRoaXMuX2xheWVyTmFtZXNbbGF5ZXJdO1xuICAgICAgICAgIGZlYXR1cmUuZGlzcGxheUZpZWxkTmFtZSA9IHRoaXMuX2Rpc3BsYXlGaWVsZHNbbGF5ZXJdO1xuICAgICAgICAgIGlmIChpZEZpZWxkKSB7XG4gICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgdGV4dDogdGhpcy5vcHRpb25zLmZvcm1hdFN1Z2dlc3Rpb24uY2FsbCh0aGlzLCBmZWF0dXJlKSxcbiAgICAgICAgICAgICAgbWFnaWNLZXk6IHJlc3VsdC5hdHRyaWJ1dGVzW2lkRmllbGRdICsgJzonICsgbGF5ZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FsbGJhY2soZXJyb3IsIHN1Z2dlc3Rpb25zLnJldmVyc2UoKSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgcmVzdWx0czogZnVuY3Rpb24gKHRleHQsIGtleSwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgdmFyIHJlcXVlc3Q7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICB2YXIgZmVhdHVyZUlkID0ga2V5LnNwbGl0KCc6JylbMF07XG4gICAgICB2YXIgbGF5ZXIgPSBrZXkuc3BsaXQoJzonKVsxXTtcbiAgICAgIHJlcXVlc3QgPSB0aGlzLnF1ZXJ5KCkubGF5ZXIobGF5ZXIpLmZlYXR1cmVJZHMoZmVhdHVyZUlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdCA9IHRoaXMuZmluZCgpLnRleHQodGV4dCkuZmllbGRzKHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMpLmxheWVycyh0aGlzLm9wdGlvbnMubGF5ZXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlcywgcmVzcG9uc2UpIHtcbiAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnJlc3VsdHMpIHtcbiAgICAgICAgICByZXNwb25zZS5yZXN1bHRzID0gcmVzcG9uc2UucmVzdWx0cy5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmZWF0dXJlcy5mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBmZWF0dXJlID0gZmVhdHVyZXMuZmVhdHVyZXNbaV07XG4gICAgICAgICAgbGF5ZXIgPSBsYXllciB8fCByZXNwb25zZS5yZXN1bHRzW2ldLmxheWVySWQ7XG5cbiAgICAgICAgICBpZiAoZmVhdHVyZSAmJiBsYXllciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5fZmVhdHVyZUJvdW5kcyhmZWF0dXJlKTtcbiAgICAgICAgICAgIGZlYXR1cmUubGF5ZXJJZCA9IGxheWVyO1xuICAgICAgICAgICAgZmVhdHVyZS5sYXllck5hbWUgPSB0aGlzLl9sYXllck5hbWVzW2xheWVyXTtcbiAgICAgICAgICAgIGZlYXR1cmUuZGlzcGxheUZpZWxkTmFtZSA9IHRoaXMuX2Rpc3BsYXlGaWVsZHNbbGF5ZXJdO1xuXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICBsYXRsbmc6IGJvdW5kcy5nZXRDZW50ZXIoKSxcbiAgICAgICAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5mb3JtYXRTdWdnZXN0aW9uLmNhbGwodGhpcywgZmVhdHVyZSksXG4gICAgICAgICAgICAgIHByb3BlcnRpZXM6IGZlYXR1cmUucHJvcGVydGllcyxcbiAgICAgICAgICAgICAgZ2VvanNvbjogZmVhdHVyZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzdWx0cy5yZXZlcnNlKCkpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIF9mZWF0dXJlQm91bmRzOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIHZhciBnZW9qc29uID0gTC5nZW9Kc29uKGZlYXR1cmUpO1xuICAgIGlmIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcbiAgICAgIHZhciBjZW50ZXIgPSBnZW9qc29uLmdldEJvdW5kcygpLmdldENlbnRlcigpO1xuICAgICAgdmFyIGxuZ1JhZGl1cyA9ICgodGhpcy5vcHRpb25zLmJ1ZmZlclJhZGl1cyAvIDQwMDc1MDE3KSAqIDM2MCkgLyBNYXRoLmNvcygoMTgwIC8gTWF0aC5QSSkgKiBjZW50ZXIubGF0KTtcbiAgICAgIHZhciBsYXRSYWRpdXMgPSAodGhpcy5vcHRpb25zLmJ1ZmZlclJhZGl1cyAvIDQwMDc1MDE3KSAqIDM2MDtcbiAgICAgIHJldHVybiBMLmxhdExuZ0JvdW5kcyhbY2VudGVyLmxhdCAtIGxhdFJhZGl1cywgY2VudGVyLmxuZyAtIGxuZ1JhZGl1c10sIFtjZW50ZXIubGF0ICsgbGF0UmFkaXVzLCBjZW50ZXIubG5nICsgbG5nUmFkaXVzXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZW9qc29uLmdldEJvdW5kcygpO1xuICAgIH1cbiAgfSxcblxuICBfbGF5ZXJNZXRhZGF0YUNhbGxiYWNrOiBmdW5jdGlvbiAobGF5ZXJpZCkge1xuICAgIHJldHVybiBMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIG1ldGFkYXRhKSB7XG4gICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9XG4gICAgICB0aGlzLl9kaXNwbGF5RmllbGRzW2xheWVyaWRdID0gbWV0YWRhdGEuZGlzcGxheUZpZWxkO1xuICAgICAgdGhpcy5fbGF5ZXJOYW1lc1tsYXllcmlkXSA9IG1ldGFkYXRhLm5hbWU7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldGFkYXRhLmZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZmllbGQgPSBtZXRhZGF0YS5maWVsZHNbaV07XG4gICAgICAgIGlmIChmaWVsZC50eXBlID09PSAnZXNyaUZpZWxkVHlwZU9JRCcpIHtcbiAgICAgICAgICB0aGlzLl9pZEZpZWxkc1tsYXllcmlkXSA9IGZpZWxkLm5hbWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBfZ2V0SWRGaWVsZHM6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9pZEZpZWxkcyA9IHt9O1xuICAgIHRoaXMuX2Rpc3BsYXlGaWVsZHMgPSB7fTtcbiAgICB0aGlzLl9sYXllck5hbWVzID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMubGF5ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLm9wdGlvbnMubGF5ZXJzW2ldO1xuICAgICAgdGhpcy5nZXQobGF5ZXIsIHt9LCB0aGlzLl9sYXllck1ldGFkYXRhQ2FsbGJhY2sobGF5ZXIpKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwU2VydmljZVByb3ZpZGVyIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgTWFwU2VydmljZVByb3ZpZGVyKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBTZXJ2aWNlUHJvdmlkZXI7XG4iLCJpbXBvcnQgeyBHZW9jb2RlU2VydmljZSB9IGZyb20gJy4uL1NlcnZpY2VzL0dlb2NvZGUnO1xuXG5leHBvcnQgdmFyIEdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIgPSBHZW9jb2RlU2VydmljZS5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgbGFiZWw6ICdHZW9jb2RlIFNlcnZlcicsXG4gICAgbWF4UmVzdWx0czogNVxuICB9LFxuXG4gIHN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAodGV4dCwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IHRoaXMuc3VnZ2VzdCgpLnRleHQodGV4dCk7XG4gICAgICBpZiAoYm91bmRzKSB7XG4gICAgICAgIHJlcXVlc3Qud2l0aGluKGJvdW5kcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgd2hpbGUgKHJlc3BvbnNlLnN1Z2dlc3Rpb25zLmxlbmd0aCAmJiBzdWdnZXN0aW9ucy5sZW5ndGggPD0gKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzIC0gMSkpIHtcbiAgICAgICAgICAgIHZhciBzdWdnZXN0aW9uID0gcmVzcG9uc2Uuc3VnZ2VzdGlvbnMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghc3VnZ2VzdGlvbi5pc0NvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgdGV4dDogc3VnZ2VzdGlvbi50ZXh0LFxuICAgICAgICAgICAgICAgIG1hZ2ljS2V5OiBzdWdnZXN0aW9uLm1hZ2ljS2V5XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayhlcnJvciwgc3VnZ2VzdGlvbnMpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKHVuZGVmaW5lZCwgW10pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB0aGlzLmdlb2NvZGUoKS50ZXh0KHRleHQpO1xuXG4gICAgcmVxdWVzdC5tYXhMb2NhdGlvbnModGhpcy5vcHRpb25zLm1heFJlc3VsdHMpO1xuXG4gICAgaWYgKGJvdW5kcykge1xuICAgICAgcmVxdWVzdC53aXRoaW4oYm91bmRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3BvbnNlLnJlc3VsdHMpO1xuICAgIH0sIHRoaXMpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBHZW9jb2RlU2VydmljZVByb3ZpZGVyKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW9jb2RlU2VydmljZVByb3ZpZGVyO1xuIiwiZXhwb3J0IHsgdmVyc2lvbiBhcyBWRVJTSU9OIH0gZnJvbSAnLi4vcGFja2FnZS5qc29uJztcbmV4cG9ydCB2YXIgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsID0gJ2h0dHBzOi8vZ2VvY29kZS5hcmNnaXMuY29tL2FyY2dpcy9yZXN0L3NlcnZpY2VzL1dvcmxkL0dlb2NvZGVTZXJ2ZXIvJztcblxuLy8gaW1wb3J0IHRhc2tzXG5leHBvcnQgeyBHZW9jb2RlLCBnZW9jb2RlIH0gZnJvbSAnLi9UYXNrcy9HZW9jb2RlJztcbmV4cG9ydCB7IFJldmVyc2VHZW9jb2RlLCByZXZlcnNlR2VvY29kZSB9IGZyb20gJy4vVGFza3MvUmV2ZXJzZUdlb2NvZGUnO1xuZXhwb3J0IHsgU3VnZ2VzdCwgc3VnZ2VzdCB9IGZyb20gJy4vVGFza3MvU3VnZ2VzdCc7XG5cbi8vIGltcG9ydCBzZXJ2aWNlXG5leHBvcnQgeyBHZW9jb2RlU2VydmljZSwgZ2VvY29kZVNlcnZpY2UgfSBmcm9tICcuL1NlcnZpY2VzL0dlb2NvZGUnO1xuXG4vLyBpbXBvcnQgY29udHJvbFxuZXhwb3J0IHsgR2Vvc2VhcmNoLCBnZW9zZWFyY2ggfSBmcm9tICcuL0NvbnRyb2xzL0dlb3NlYXJjaCc7XG5cbi8vIGltcG9ydCBzdXBwb3J0aW5nIGNsYXNzXG5leHBvcnQgeyBHZW9zZWFyY2hDb3JlLCBnZW9zZWFyY2hDb3JlIH0gZnJvbSAnLi9DbGFzc2VzL0dlb3NlYXJjaENvcmUnO1xuXG4vLyBpbXBvcnQgcHJvdmlkZXJzXG5leHBvcnQgeyBBcmNnaXNPbmxpbmVQcm92aWRlciwgYXJjZ2lzT25saW5lUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVycy9BcmNnaXNPbmxpbmVHZW9jb2Rlcic7XG5leHBvcnQgeyBGZWF0dXJlTGF5ZXJQcm92aWRlciwgZmVhdHVyZUxheWVyUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVycy9GZWF0dXJlTGF5ZXInO1xuZXhwb3J0IHsgTWFwU2VydmljZVByb3ZpZGVyLCBtYXBTZXJ2aWNlUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVycy9NYXBTZXJ2aWNlJztcbmV4cG9ydCB7IEdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIsIGdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVycy9HZW9jb2RlU2VydmljZSc7XG4iXSwibmFtZXMiOlsiVGFzayIsIlV0aWwiLCJTZXJ2aWNlIiwiRmVhdHVyZUxheWVyU2VydmljZSIsIk1hcFNlcnZpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Q0NJTyxJQUFJLE9BQU8sR0FBR0EsZ0JBQUksQ0FBQyxNQUFNLENBQUM7QUFDakMsQ0FBQSxFQUFFLElBQUksRUFBRSxNQUFNOztBQUVkLENBQUEsRUFBRSxNQUFNLEVBQUU7QUFDVixDQUFBLElBQUksS0FBSyxFQUFFLElBQUk7QUFDZixDQUFBLElBQUksVUFBVSxFQUFFLEtBQUs7QUFDckIsQ0FBQSxJQUFJLFNBQVMsRUFBRSxHQUFHO0FBQ2xCLENBQUEsSUFBSSxZQUFZLEVBQUUsRUFBRTtBQUNwQixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLE9BQU8sRUFBRTtBQUNYLENBQUEsSUFBSSxTQUFTLEVBQUUsU0FBUztBQUN4QixDQUFBLElBQUksY0FBYyxFQUFFLGNBQWM7QUFDbEMsQ0FBQSxJQUFJLE1BQU0sRUFBRSxNQUFNO0FBQ2xCLENBQUEsSUFBSSxXQUFXLEVBQUUsV0FBVztBQUM1QixDQUFBLElBQUksUUFBUSxFQUFFLFFBQVE7QUFDdEIsQ0FBQSxJQUFJLFFBQVEsRUFBRSxRQUFRO0FBQ3RCLENBQUEsSUFBSSxTQUFTLEVBQUUsU0FBUztBQUN4QixDQUFBLElBQUksTUFBTSxFQUFFLE1BQU07QUFDbEIsQ0FBQSxJQUFJLFVBQVUsRUFBRSxVQUFVO0FBQzFCLENBQUEsSUFBSSxPQUFPLEVBQUUsT0FBTztBQUNwQixDQUFBLElBQUksS0FBSyxFQUFFLFVBQVU7QUFDckIsQ0FBQSxJQUFJLFFBQVEsRUFBRSxXQUFXO0FBQ3pCLENBQUEsSUFBSSxZQUFZLEVBQUUsWUFBWTtBQUM5QixDQUFBLElBQUksY0FBYyxFQUFFLGNBQWM7QUFDbEMsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxVQUFVLEVBQUUsVUFBVSxPQUFPLEVBQUU7QUFDakMsQ0FBQSxJ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QSxNQUFNLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEMsQ0FBQSxNQUFNLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEMsQ0FBQSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNoRSxDQUFBLEtBQUssTUFBTTtBQUNYLENBQUEsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyRyxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0FBQzVELENBQUEsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2xCLENBQUEsUUFBUSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7QUFDOUIsQ0FBQSxVQUFVLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN4RCxDQUFBLFNBQVM7QUFDVCxDQUFBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNELENBQUEsVUFBVSxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdDLENBQUEsVUFBVSxLQUFLLEdBQUcsS0FBSyxJQUFJLFFB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