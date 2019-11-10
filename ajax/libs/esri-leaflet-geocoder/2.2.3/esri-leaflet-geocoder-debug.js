/* esri-leaflet-geocoder - v2.2.3 - Fri Jan 06 2017 15:53:06 GMT-0800 (PST)
 * Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet'), require('esri-leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet', 'esri-leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Geocoding = global.L.esri.Geocoding || {}),global.L,global.L.esri));
}(this, function (exports,L,esriLeaflet) { 'use strict';

	L = 'default' in L ? L['default'] : L;

	var version = "2.2.3";

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
	      if (!options) {
	        options = {};
	      }
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

	    if (suggestions.length > 0) {
	      this._suggestions.style.display = 'block';
	    }
	    // set the maxHeight of the suggestions box to
	    // map height
	    // - suggestions offset (distance from top of suggestions to top of control)
	    // - control offset (distance from top of control to top of map)
	    // - 10 (extra padding)
	    this._suggestions.style.maxHeight = (this._map.getSize().y - this._suggestions.offsetTop - this._wrapper.offsetTop - 10) + 'px';

	    var nodes = [];
	    var list;
	    var header;
	    var suggestionTextArray = [];

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

	      if (suggestionTextArray.indexOf(suggestion.text) === -1) {
	        var suggestionItem = L.DomUtil.create('li', 'geocoder-control-suggestion', list);

	        suggestionItem.innerHTML = suggestion.text;
	        suggestionItem.provider = suggestion.provider;
	        suggestionItem['data-magic-key'] = suggestion.magicKey;
	      } else {
	        for (var j = 0; j < list.childNodes.length; j++) {
	          // if the same text already appears in the list of suggestions, append an additional ObjectID to its magicKey instead
	          if (list.childNodes[j].innerHTML === suggestion.text) {
	            list.childNodes[j]['data-magic-key'] += ',' + suggestion.magicKey;
	          }
	        }
	      }
	      suggestionTextArray.push(suggestion.text);
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
	      delete query.params.where;
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

	          // clear query parameters for the next search
	          delete this._resultsQuery.params['objectIds'];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvVGFza3MvR2VvY29kZS5qcyIsIi4uL3NyYy9UYXNrcy9SZXZlcnNlR2VvY29kZS5qcyIsIi4uL3NyYy9UYXNrcy9TdWdnZXN0LmpzIiwiLi4vc3JjL1NlcnZpY2VzL0dlb2NvZGUuanMiLCIuLi9zcmMvQ2xhc3Nlcy9HZW9zZWFyY2hDb3JlLmpzIiwiLi4vc3JjL1Byb3ZpZGVycy9BcmNnaXNPbmxpbmVHZW9jb2Rlci5qcyIsIi4uL3NyYy9Db250cm9scy9HZW9zZWFyY2guanMiLCIuLi9zcmMvUHJvdmlkZXJzL0ZlYXR1cmVMYXllci5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvTWFwU2VydmljZS5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvR2VvY29kZVNlcnZpY2UuanMiLCIuLi9zcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXQtZ2VvY29kZXJcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkVzcmkgR2VvY29kaW5nIHV0aWxpdHkgYW5kIHNlYXJjaCBwbHVnaW4gZm9yIExlYWZsZXQuXCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMi4zXCIsXG4gIFwiYXV0aG9yXCI6IFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gIFwiY29udHJpYnV0b3JzXCI6IFtcbiAgICBcIlBhdHJpY2sgQXJsdCA8cGFybHRAZXNyaS5jb20+IChodHRwOi8vcGF0cmlja2FybHQuY29tKVwiLFxuICAgIFwiSm9obiBHcmF2b2lzIDxqZ3Jhdm9pc0Blc3JpLmNvbT4gKGh0dHA6Ly9qb2huZ3Jhdm9pcy5jb20pXCJcbiAgXSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZXNyaS1sZWFmbGV0XCI6IFwiXjIuMC4zXCIsXG4gICAgXCJsZWFmbGV0XCI6IFwiXjEuMC4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2hhaVwiOiBcIjIuMy4wXCIsXG4gICAgXCJnaC1yZWxlYXNlXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4wLjguNVwiLFxuICAgIFwiaW1hZ2VtaW5cIjogXCJeMy4yLjBcIixcbiAgICBcImlzcGFydGFcIjogXCJeMy4wLjNcIixcbiAgICBcImlzdGFuYnVsXCI6IFwiXjAuNC4yXCIsXG4gICAgXCJrYXJtYVwiOiBcIl4wLjEyLjI0XCIsXG4gICAgXCJrYXJtYS1jaGFpLXNpbm9uXCI6IFwiXjAuMS4zXCIsXG4gICAgXCJrYXJtYS1jb3ZlcmFnZVwiOiBcIl4wLjUuM1wiLFxuICAgIFwia2FybWEtbW9jaGFcIjogXCJeMC4xLjBcIixcbiAgICBcImthcm1hLW1vY2hhLXJlcG9ydGVyXCI6IFwiXjAuMi41XCIsXG4gICAgXCJrYXJtYS1waGFudG9tanMtbGF1bmNoZXJcIjogXCJeMC4yLjBcIixcbiAgICBcImthcm1hLXNvdXJjZW1hcC1sb2FkZXJcIjogXCJeMC4zLjVcIixcbiAgICBcIm1rZGlycFwiOiBcIl4wLjUuMVwiLFxuICAgIFwibW9jaGFcIjogXCJeMi4zLjRcIixcbiAgICBcIm5vZGUtc2Fzc1wiOiBcIl4zLjIuMFwiLFxuICAgIFwicGFyYWxsZWxzaGVsbFwiOiBcIl4yLjAuMFwiLFxuICAgIFwicGhhbnRvbWpzXCI6IFwiXjEuOS4xN1wiLFxuICAgIFwicm9sbHVwXCI6IFwiXjAuMjUuNFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1qc29uXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLW5vZGUtcmVzb2x2ZVwiOiBcIl4xLjQuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi11Z2xpZnlcIjogXCJeMC4zLjFcIixcbiAgICBcInNlbWlzdGFuZGFyZFwiOiBcIl45LjAuMFwiLFxuICAgIFwic2lub25cIjogXCJeMS4xMS4xXCIsXG4gICAgXCJzaW5vbi1jaGFpXCI6IFwiMi43LjBcIixcbiAgICBcInNuYXp6eVwiOiBcIl41LjAuMFwiLFxuICAgIFwidWdsaWZ5LWpzXCI6IFwiXjIuNi4xXCIsXG4gICAgXCJ3YXRjaFwiOiBcIl4wLjE3LjFcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvZXNyaS1sZWFmbGV0LWdlb2NvZGVyXCIsXG4gIFwianNuZXh0Om1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanNcIixcbiAgXCJqc3BtXCI6IHtcbiAgICBcInJlZ2lzdHJ5XCI6IFwibnBtXCIsXG4gICAgXCJmb3JtYXRcIjogXCJlczZcIixcbiAgICBcIm1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanNcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJBcGFjaGUtMi4wXCIsXG4gIFwibWFpblwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzXCIsXG4gIFwiYnJvd3NlclwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzXCIsXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdEBnaXRodWIuY29tOkVzcmkvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLmdpdFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJwcmVidWlsZFwiOiBcIm1rZGlycCBkaXN0XCIsXG4gICAgXCJidWlsZFwiOiBcInJvbGx1cCAtYyBwcm9maWxlcy9kZWJ1Zy5qcyAmIHJvbGx1cCAtYyBwcm9maWxlcy9wcm9kdWN0aW9uLmpzICYgbnBtIHJ1biBjc3MgJiBucG0gcnVuIGltZ1wiLFxuICAgIFwiY3NzXCI6IFwibm9kZS1zYXNzIC4vc3JjL2VzcmktbGVhZmxldC1nZW9jb2Rlci5jc3MgLi9kaXN0L2VzcmktbGVhZmxldC1nZW9jb2Rlci5jc3MgLS1vdXRwdXQtc3R5bGUgY29tcHJlc3NlZFwiLFxuICAgIFwiaW1nXCI6IFwiaW1hZ2VtaW4gLi9zcmMvaW1nIC4vZGlzdC9pbWdcIixcbiAgICBcImxpbnRcIjogXCJzZW1pc3RhbmRhcmQgfCBzbmF6enlcIixcbiAgICBcInByZXB1Ymxpc2hcIjogXCJucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV0ZXN0XCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIi4vc2NyaXB0cy9yZWxlYXNlLnNoXCIsXG4gICAgXCJzdGFydC13YXRjaFwiOiBcIndhdGNoIFxcXCJucG0gcnVuIGJ1aWxkXFxcIiBzcmNcIixcbiAgICBcInN0YXJ0XCI6IFwicGFyYWxsZWxzaGVsbCBcXFwibnBtIHJ1biBzdGFydC13YXRjaFxcXCIgXFxcImh0dHAtc2VydmVyIC1wIDU2NzggLWMtMSAtb1xcXCJcIixcbiAgICBcInRlc3RcIjogXCJucG0gcnVuIGxpbnQgJiYga2FybWEgc3RhcnRcIlxuICB9LFxuICBcInNlbWlzdGFuZGFyZFwiOiB7XG4gICAgXCJnbG9iYWxzXCI6IFsgXCJleHBlY3RcIiwgXCJMXCIsIFwiWE1MSHR0cFJlcXVlc3RcIiwgXCJzaW5vblwiLCBcInhoclwiIF1cbiAgfSxcbiAgXCJzdHlsZVwiOiBcIi4vZGlzdC9lc3JpLWxlYWZsZXQtZ2VvY29kZXIuY3NzXCJcbn1cbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGFzaywgVXRpbCB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5pbXBvcnQgeyBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmwgfSBmcm9tICcuLi9Fc3JpTGVhZmxldEdlb2NvZGluZyc7XG5cbmV4cG9ydCB2YXIgR2VvY29kZSA9IFRhc2suZXh0ZW5kKHtcbiAgcGF0aDogJ2ZpbmQnLFxuXG4gIHBhcmFtczoge1xuICAgIG91dFNyOiA0MzI2LFxuICAgIGZvclN0b3JhZ2U6IGZhbHNlLFxuICAgIG91dEZpZWxkczogJyonLFxuICAgIG1heExvY2F0aW9uczogMjBcbiAgfSxcblxuICBzZXR0ZXJzOiB7XG4gICAgJ2FkZHJlc3MnOiAnYWRkcmVzcycsXG4gICAgJ25laWdoYm9yaG9vZCc6ICduZWlnaGJvcmhvb2QnLFxuICAgICdjaXR5JzogJ2NpdHknLFxuICAgICdzdWJyZWdpb24nOiAnc3VicmVnaW9uJyxcbiAgICAncmVnaW9uJzogJ3JlZ2lvbicsXG4gICAgJ3Bvc3RhbCc6ICdwb3N0YWwnLFxuICAgICdjb3VudHJ5JzogJ2NvdW50cnknLFxuICAgICd0ZXh0JzogJ3RleHQnLFxuICAgICdjYXRlZ29yeSc6ICdjYXRlZ29yeScsXG4gICAgJ3Rva2VuJzogJ3Rva2VuJyxcbiAgICAna2V5JzogJ21hZ2ljS2V5JyxcbiAgICAnZmllbGRzJzogJ291dEZpZWxkcycsXG4gICAgJ2ZvclN0b3JhZ2UnOiAnZm9yU3RvcmFnZScsXG4gICAgJ21heExvY2F0aW9ucyc6ICdtYXhMb2NhdGlvbnMnXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLnVybCA9IG9wdGlvbnMudXJsIHx8IFdvcmxkR2VvY29kaW5nU2VydmljZVVybDtcbiAgICBUYXNrLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gIH0sXG5cbiAgd2l0aGluOiBmdW5jdGlvbiAoYm91bmRzKSB7XG4gICAgYm91bmRzID0gTC5sYXRMbmdCb3VuZHMoYm91bmRzKTtcbiAgICB0aGlzLnBhcmFtcy5iYm94ID0gVXRpbC5ib3VuZHNUb0V4dGVudChib3VuZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG5lYXJieTogZnVuY3Rpb24gKGxhdGxuZywgcmFkaXVzKSB7XG4gICAgbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGxhdGxuZy5sbmcgKyAnLCcgKyBsYXRsbmcubGF0O1xuICAgIHRoaXMucGFyYW1zLmRpc3RhbmNlID0gTWF0aC5taW4oTWF0aC5tYXgocmFkaXVzLCAyMDAwKSwgNTAwMDApO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5jdXN0b21QYXJhbSkge1xuICAgICAgdGhpcy5wYXRoID0gJ2ZpbmRBZGRyZXNzQ2FuZGlkYXRlcyc7XG4gICAgICB0aGlzLnBhcmFtc1t0aGlzLm9wdGlvbnMuY3VzdG9tUGFyYW1dID0gdGhpcy5wYXJhbXMudGV4dDtcbiAgICAgIGRlbGV0ZSB0aGlzLnBhcmFtcy50ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhdGggPSAodGhpcy5wYXJhbXMudGV4dCkgPyAnZmluZCcgOiAnZmluZEFkZHJlc3NDYW5kaWRhdGVzJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXRoID09PSAnZmluZEFkZHJlc3NDYW5kaWRhdGVzJyAmJiB0aGlzLnBhcmFtcy5iYm94KSB7XG4gICAgICB0aGlzLnBhcmFtcy5zZWFyY2hFeHRlbnQgPSB0aGlzLnBhcmFtcy5iYm94O1xuICAgICAgZGVsZXRlIHRoaXMucGFyYW1zLmJib3g7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcHJvY2Vzc29yID0gKHRoaXMucGF0aCA9PT0gJ2ZpbmQnKSA/IHRoaXMuX3Byb2Nlc3NGaW5kUmVzcG9uc2UgOiB0aGlzLl9wcm9jZXNzRmluZEFkZHJlc3NDYW5kaWRhdGVzUmVzcG9uc2U7XG4gICAgICB2YXIgcmVzdWx0cyA9ICghZXJyb3IpID8gcHJvY2Vzc29yKHJlc3BvbnNlKSA6IHVuZGVmaW5lZDtcbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHsgcmVzdWx0czogcmVzdWx0cyB9LCByZXNwb25zZSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX3Byb2Nlc3NGaW5kUmVzcG9uc2U6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3BvbnNlLmxvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGxvY2F0aW9uID0gcmVzcG9uc2UubG9jYXRpb25zW2ldO1xuICAgICAgdmFyIGJvdW5kcztcblxuICAgICAgaWYgKGxvY2F0aW9uLmV4dGVudCkge1xuICAgICAgICBib3VuZHMgPSBVdGlsLmV4dGVudFRvQm91bmRzKGxvY2F0aW9uLmV4dGVudCk7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgIHRleHQ6IGxvY2F0aW9uLm5hbWUsXG4gICAgICAgIGJvdW5kczogYm91bmRzLFxuICAgICAgICBzY29yZTogbG9jYXRpb24uZmVhdHVyZS5hdHRyaWJ1dGVzLlNjb3JlLFxuICAgICAgICBsYXRsbmc6IEwubGF0TG5nKGxvY2F0aW9uLmZlYXR1cmUuZ2VvbWV0cnkueSwgbG9jYXRpb24uZmVhdHVyZS5nZW9tZXRyeS54KSxcbiAgICAgICAgcHJvcGVydGllczogbG9jYXRpb24uZmVhdHVyZS5hdHRyaWJ1dGVzXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSxcblxuICBfcHJvY2Vzc0ZpbmRBZGRyZXNzQ2FuZGlkYXRlc1Jlc3BvbnNlOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2FuZGlkYXRlID0gcmVzcG9uc2UuY2FuZGlkYXRlc1tpXTtcbiAgICAgIGlmIChjYW5kaWRhdGUuZXh0ZW50KSB7XG4gICAgICAgIHZhciBib3VuZHMgPSBVdGlsLmV4dGVudFRvQm91bmRzKGNhbmRpZGF0ZS5leHRlbnQpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICB0ZXh0OiBjYW5kaWRhdGUuYWRkcmVzcyxcbiAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgIHNjb3JlOiBjYW5kaWRhdGUuc2NvcmUsXG4gICAgICAgIGxhdGxuZzogTC5sYXRMbmcoY2FuZGlkYXRlLmxvY2F0aW9uLnksIGNhbmRpZGF0ZS5sb2NhdGlvbi54KSxcbiAgICAgICAgcHJvcGVydGllczogY2FuZGlkYXRlLmF0dHJpYnV0ZXNcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VvY29kZSAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEdlb2NvZGUob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlb2NvZGU7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFRhc2sgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuaW1wb3J0IHsgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsIH0gZnJvbSAnLi4vRXNyaUxlYWZsZXRHZW9jb2RpbmcnO1xuXG5leHBvcnQgdmFyIFJldmVyc2VHZW9jb2RlID0gVGFzay5leHRlbmQoe1xuICBwYXRoOiAncmV2ZXJzZUdlb2NvZGUnLFxuXG4gIHBhcmFtczoge1xuICAgIG91dFNSOiA0MzI2LFxuICAgIHJldHVybkludGVyc2VjdGlvbjogZmFsc2VcbiAgfSxcblxuICBzZXR0ZXJzOiB7XG4gICAgJ2Rpc3RhbmNlJzogJ2Rpc3RhbmNlJyxcbiAgICAnbGFuZ3VhZ2UnOiAnbGFuZ0NvZGUnLFxuICAgICdpbnRlcnNlY3Rpb24nOiAncmV0dXJuSW50ZXJzZWN0aW9uJ1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy51cmwgPSBvcHRpb25zLnVybCB8fCBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmw7XG4gICAgVGFzay5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIGxhdGxuZzogZnVuY3Rpb24gKGxhdGxuZykge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMubG9jYXRpb24gPSBsYXRsbmcubG5nICsgJywnICsgbGF0bG5nLmxhdDtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgdmFyIHJlc3VsdDtcblxuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgbGF0bG5nOiBMLmxhdExuZyhyZXNwb25zZS5sb2NhdGlvbi55LCByZXNwb25zZS5sb2NhdGlvbi54KSxcbiAgICAgICAgICBhZGRyZXNzOiByZXNwb25zZS5hZGRyZXNzXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHJlc3VsdCwgcmVzcG9uc2UpO1xuICAgIH0sIHRoaXMpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VHZW9jb2RlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgUmV2ZXJzZUdlb2NvZGUob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJldmVyc2VHZW9jb2RlO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBUYXNrLCBVdGlsIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcbmltcG9ydCB7IFdvcmxkR2VvY29kaW5nU2VydmljZVVybCB9IGZyb20gJy4uL0VzcmlMZWFmbGV0R2VvY29kaW5nJztcblxuZXhwb3J0IHZhciBTdWdnZXN0ID0gVGFzay5leHRlbmQoe1xuICBwYXRoOiAnc3VnZ2VzdCcsXG5cbiAgcGFyYW1zOiB7fSxcblxuICBzZXR0ZXJzOiB7XG4gICAgdGV4dDogJ3RleHQnLFxuICAgIGNhdGVnb3J5OiAnY2F0ZWdvcnknLFxuICAgIGNvdW50cmllczogJ2NvdW50cnlDb2RlJyxcbiAgICBtYXhTdWdnZXN0aW9uczogJ21heFN1Z2dlc3Rpb25zJ1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKCFvcHRpb25zLnVybCkge1xuICAgICAgb3B0aW9ucy51cmwgPSBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmw7XG4gICAgICBvcHRpb25zLnN1cHBvcnRzU3VnZ2VzdCA9IHRydWU7XG4gICAgfVxuICAgIFRhc2sucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICB3aXRoaW46IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhib3VuZHMpO1xuICAgIGJvdW5kcyA9IGJvdW5kcy5wYWQoMC41KTtcbiAgICB2YXIgY2VudGVyID0gYm91bmRzLmdldENlbnRlcigpO1xuICAgIHZhciBuZSA9IGJvdW5kcy5nZXROb3J0aFdlc3QoKTtcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGNlbnRlci5sbmcgKyAnLCcgKyBjZW50ZXIubGF0O1xuICAgIHRoaXMucGFyYW1zLmRpc3RhbmNlID0gTWF0aC5taW4oTWF0aC5tYXgoY2VudGVyLmRpc3RhbmNlVG8obmUpLCAyMDAwKSwgNTAwMDApO1xuICAgIHRoaXMucGFyYW1zLnNlYXJjaEV4dGVudCA9IFV0aWwuYm91bmRzVG9FeHRlbnQoYm91bmRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBuZWFyYnk6IGZ1bmN0aW9uIChsYXRsbmcsIHJhZGl1cykge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMubG9jYXRpb24gPSBsYXRsbmcubG5nICsgJywnICsgbGF0bG5nLmxhdDtcbiAgICB0aGlzLnBhcmFtcy5kaXN0YW5jZSA9IE1hdGgubWluKE1hdGgubWF4KHJhZGl1cywgMjAwMCksIDUwMDAwKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UsIHJlc3BvbnNlKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3RoaXMgZ2VvY29kaW5nIHNlcnZpY2UgZG9lcyBub3Qgc3VwcG9ydCBhc2tpbmcgZm9yIHN1Z2dlc3Rpb25zJyk7XG4gICAgfVxuICB9XG5cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gc3VnZ2VzdCAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IFN1Z2dlc3Qob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN1Z2dlc3Q7XG4iLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcbmltcG9ydCB7IFdvcmxkR2VvY29kaW5nU2VydmljZVVybCB9IGZyb20gJy4uL0VzcmlMZWFmbGV0R2VvY29kaW5nJztcbmltcG9ydCBnZW9jb2RlIGZyb20gJy4uL1Rhc2tzL0dlb2NvZGUnO1xuaW1wb3J0IHJldmVyc2VHZW9jb2RlIGZyb20gJy4uL1Rhc2tzL1JldmVyc2VHZW9jb2RlJztcbmltcG9ydCBzdWdnZXN0IGZyb20gJy4uL1Rhc2tzL1N1Z2dlc3QnO1xuXG5leHBvcnQgdmFyIEdlb2NvZGVTZXJ2aWNlID0gU2VydmljZS5leHRlbmQoe1xuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmIChvcHRpb25zLnVybCkge1xuICAgICAgU2VydmljZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgdGhpcy5fY29uZmlybVN1Z2dlc3RTdXBwb3J0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMudXJsID0gV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsO1xuICAgICAgb3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QgPSB0cnVlO1xuICAgICAgU2VydmljZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSxcblxuICBnZW9jb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdlb2NvZGUodGhpcyk7XG4gIH0sXG5cbiAgcmV2ZXJzZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByZXZlcnNlR2VvY29kZSh0aGlzKTtcbiAgfSxcblxuICBzdWdnZXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gcmVxdWlyZXMgZWl0aGVyIHRoZSBFc3JpIFdvcmxkIEdlb2NvZGluZyBTZXJ2aWNlIG9yIGEgPDEwLjMgQXJjR0lTIFNlcnZlciBHZW9jb2RpbmcgU2VydmljZSB0aGF0IHN1cHBvcnRzIHN1Z2dlc3QuXG4gICAgcmV0dXJuIHN1Z2dlc3QodGhpcyk7XG4gIH0sXG5cbiAgX2NvbmZpcm1TdWdnZXN0U3VwcG9ydDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubWV0YWRhdGEoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgaWYgKGVycm9yKSB7IHJldHVybjsgfVxuICAgICAgLy8gcHJlIDEwLjMgZ2VvY29kaW5nIHNlcnZpY2VzIGRvbnQgbGlzdCBjYXBhYmlsaXRpZXMgKGFuZCBkb250IHN1cHBvcnQgbWF4TG9jYXRpb25zKVxuICAgICAgLy8gc2luY2UsIG9ubHkgU09NRSBpbmRpdmlkdWFsIHNlcnZpY2VzIGhhdmUgYmVlbiBjb25maWd1cmVkIHRvIHN1cHBvcnQgYXNraW5nIGZvciBzdWdnZXN0aW9uc1xuICAgICAgaWYgKCFyZXNwb25zZS5jYXBhYmlsaXRpZXMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnN1cHBvcnRzU3VnZ2VzdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9wdGlvbnMuY3VzdG9tUGFyYW0gPSByZXNwb25zZS5zaW5nbGVMaW5lQWRkcmVzc0ZpZWxkLm5hbWU7XG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLmNhcGFiaWxpdGllcy5pbmRleE9mKCdTdWdnZXN0JykgPiAtMSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9jb2RlU2VydmljZSAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEdlb2NvZGVTZXJ2aWNlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW9jb2RlU2VydmljZTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuXG5leHBvcnQgdmFyIEdlb3NlYXJjaENvcmUgPSBMLkV2ZW50ZWQuZXh0ZW5kKHtcblxuICBvcHRpb25zOiB7XG4gICAgem9vbVRvUmVzdWx0OiB0cnVlLFxuICAgIHVzZU1hcEJvdW5kczogMTIsXG4gICAgc2VhcmNoQm91bmRzOiBudWxsXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKGNvbnRyb2wsIG9wdGlvbnMpIHtcbiAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9jb250cm9sID0gY29udHJvbDtcblxuICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5wcm92aWRlcnMgfHwgIW9wdGlvbnMucHJvdmlkZXJzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IGF0IGxlYXN0IG9uZSBwcm92aWRlcicpO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb3ZpZGVycyA9IG9wdGlvbnMucHJvdmlkZXJzO1xuICB9LFxuXG4gIF9nZW9jb2RlOiBmdW5jdGlvbiAodGV4dCwga2V5LCBwcm92aWRlcikge1xuICAgIHZhciBhY3RpdmVSZXF1ZXN0cyA9IDA7XG4gICAgdmFyIGFsbFJlc3VsdHMgPSBbXTtcbiAgICB2YXIgYm91bmRzO1xuXG4gICAgdmFyIGNhbGxiYWNrID0gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCByZXN1bHRzKSB7XG4gICAgICBhY3RpdmVSZXF1ZXN0cy0tO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgYWxsUmVzdWx0cyA9IGFsbFJlc3VsdHMuY29uY2F0KHJlc3VsdHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlUmVxdWVzdHMgPD0gMCkge1xuICAgICAgICBib3VuZHMgPSB0aGlzLl9ib3VuZHNGcm9tUmVzdWx0cyhhbGxSZXN1bHRzKTtcblxuICAgICAgICB0aGlzLmZpcmUoJ3Jlc3VsdHMnLCB7XG4gICAgICAgICAgcmVzdWx0czogYWxsUmVzdWx0cyxcbiAgICAgICAgICBib3VuZHM6IGJvdW5kcyxcbiAgICAgICAgICBsYXRsbmc6IChib3VuZHMpID8gYm91bmRzLmdldENlbnRlcigpIDogdW5kZWZpbmVkLFxuICAgICAgICAgIHRleHQ6IHRleHRcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy56b29tVG9SZXN1bHQgJiYgYm91bmRzKSB7XG4gICAgICAgICAgdGhpcy5fY29udHJvbC5fbWFwLmZpdEJvdW5kcyhib3VuZHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJlKCdsb2FkJyk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBhY3RpdmVSZXF1ZXN0cysrO1xuICAgICAgcHJvdmlkZXIucmVzdWx0cyh0ZXh0LCBrZXksIHRoaXMuX3NlYXJjaEJvdW5kcygpLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFjdGl2ZVJlcXVlc3RzKys7XG4gICAgICAgIHRoaXMuX3Byb3ZpZGVyc1tpXS5yZXN1bHRzKHRleHQsIGtleSwgdGhpcy5fc2VhcmNoQm91bmRzKCksIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX3N1Z2dlc3Q6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgdmFyIGFjdGl2ZVJlcXVlc3RzID0gdGhpcy5fcHJvdmlkZXJzLmxlbmd0aDtcblxuICAgIHZhciBjcmVhdGVDYWxsYmFjayA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uICh0ZXh0LCBwcm92aWRlcikge1xuICAgICAgcmV0dXJuIEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RzID0gYWN0aXZlUmVxdWVzdHMgLSAxO1xuXG4gICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdWdnZXN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3VnZ2VzdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zW2ldLnByb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHdlIHN0aWxsIG5lZWQgdG8gdXBkYXRlIHRoZSBVSVxuICAgICAgICAgIHRoaXMuX2NvbnRyb2wuX3JlbmRlclN1Z2dlc3Rpb25zKHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm92aWRlci5fbGFzdFJlbmRlciAhPT0gdGV4dCAmJiBwcm92aWRlci5ub2Rlcykge1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwcm92aWRlci5ub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb3ZpZGVyLm5vZGVzW2ldLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5fY29udHJvbC5fc3VnZ2VzdGlvbnMucmVtb3ZlQ2hpbGQocHJvdmlkZXIubm9kZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHByb3ZpZGVyLm5vZGVzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoICYmIHRoaXMuX2NvbnRyb2wuX2lucHV0LnZhbHVlID09PSB0ZXh0KSB7XG4gICAgICAgICAgdGhpcy5fY29udHJvbC5jbGVhclN1Z2dlc3Rpb25zKHByb3ZpZGVyLm5vZGVzKTtcblxuICAgICAgICAgIHByb3ZpZGVyLl9sYXN0UmVuZGVyID0gdGV4dDtcbiAgICAgICAgICBwcm92aWRlci5ub2RlcyA9IHRoaXMuX2NvbnRyb2wuX3JlbmRlclN1Z2dlc3Rpb25zKHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICB0aGlzLl9jb250cm9sLl9ub2RlcyA9IFtdO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHRoaXMuX3BlbmRpbmdTdWdnZXN0aW9ucyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9wcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwcm92aWRlciA9IHRoaXMuX3Byb3ZpZGVyc1tpXTtcbiAgICAgIHZhciByZXF1ZXN0ID0gcHJvdmlkZXIuc3VnZ2VzdGlvbnModGV4dCwgdGhpcy5fc2VhcmNoQm91bmRzKCksIGNyZWF0ZUNhbGxiYWNrKHRleHQsIHByb3ZpZGVyKSk7XG4gICAgICB0aGlzLl9wZW5kaW5nU3VnZ2VzdGlvbnMucHVzaChyZXF1ZXN0KTtcbiAgICB9XG4gIH0sXG5cbiAgX3NlYXJjaEJvdW5kczogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc2VhcmNoQm91bmRzICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNlYXJjaEJvdW5kcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZU1hcEJvdW5kcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlTWFwQm91bmRzID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udHJvbC5fbWFwLmdldEJvdW5kcygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlTWFwQm91bmRzIDw9IHRoaXMuX2NvbnRyb2wuX21hcC5nZXRab29tKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb250cm9sLl9tYXAuZ2V0Qm91bmRzKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgX2JvdW5kc0Zyb21SZXN1bHRzOiBmdW5jdGlvbiAocmVzdWx0cykge1xuICAgIGlmICghcmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbnVsbElzbGFuZCA9IEwubGF0TG5nQm91bmRzKFswLCAwXSwgWzAsIDBdKTtcbiAgICB2YXIgcmVzdWx0Qm91bmRzID0gW107XG4gICAgdmFyIHJlc3VsdExhdGxuZ3MgPSBbXTtcblxuICAgIC8vIGNvbGxlY3QgdGhlIGJvdW5kcyBhbmQgY2VudGVyIG9mIGVhY2ggcmVzdWx0XG4gICAgZm9yICh2YXIgaSA9IHJlc3VsdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciByZXN1bHQgPSByZXN1bHRzW2ldO1xuXG4gICAgICByZXN1bHRMYXRsbmdzLnB1c2gocmVzdWx0LmxhdGxuZyk7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSBib3VuZHMgYXJlIHZhbGlkIGFuZCBub3QgMCwwLiBzb21ldGltZXMgYm91bmRzIGFyZSBpbmNvcnJlY3Qgb3Igbm90IHByZXNlbnRcbiAgICAgIGlmIChyZXN1bHQuYm91bmRzICYmIHJlc3VsdC5ib3VuZHMuaXNWYWxpZCgpICYmICFyZXN1bHQuYm91bmRzLmVxdWFscyhudWxsSXNsYW5kKSkge1xuICAgICAgICByZXN1bHRCb3VuZHMucHVzaChyZXN1bHQuYm91bmRzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmb3JtIGEgYm91bmRzIG9iamVjdCBjb250YWluaW5nIGFsbCBjZW50ZXIgcG9pbnRzXG4gICAgdmFyIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKHJlc3VsdExhdGxuZ3MpO1xuXG4gICAgLy8gYW5kIGV4dGVuZCBpdCB0byBjb250YWluIGFsbCBib3VuZHMgb2JqZWN0c1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzdWx0Qm91bmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICBib3VuZHMuZXh0ZW5kKHJlc3VsdEJvdW5kc1tqXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfSxcblxuICBfZ2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXR0cmlicyA9IFtdO1xuICAgIHZhciBwcm92aWRlcnMgPSB0aGlzLl9wcm92aWRlcnM7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3ZpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHByb3ZpZGVyc1tpXS5vcHRpb25zLmF0dHJpYnV0aW9uKSB7XG4gICAgICAgIGF0dHJpYnMucHVzaChwcm92aWRlcnNbaV0ub3B0aW9ucy5hdHRyaWJ1dGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJpYnMuam9pbignLCAnKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlb3NlYXJjaENvcmUgKGNvbnRyb2wsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBHZW9zZWFyY2hDb3JlKGNvbnRyb2wsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW9zZWFyY2hDb3JlO1xuIiwiaW1wb3J0IHsgR2VvY29kZVNlcnZpY2UgfSBmcm9tICcuLi9TZXJ2aWNlcy9HZW9jb2RlJztcblxuZXhwb3J0IHZhciBBcmNnaXNPbmxpbmVQcm92aWRlciA9IEdlb2NvZGVTZXJ2aWNlLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBsYWJlbDogJ1BsYWNlcyBhbmQgQWRkcmVzc2VzJyxcbiAgICBtYXhSZXN1bHRzOiA1XG4gIH0sXG5cbiAgc3VnZ2VzdGlvbnM6IGZ1bmN0aW9uICh0ZXh0LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB0aGlzLnN1Z2dlc3QoKS50ZXh0KHRleHQpO1xuXG4gICAgaWYgKGJvdW5kcykge1xuICAgICAgcmVxdWVzdC53aXRoaW4oYm91bmRzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvdW50cmllcykge1xuICAgICAgcmVxdWVzdC5jb3VudHJpZXModGhpcy5vcHRpb25zLmNvdW50cmllcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jYXRlZ29yaWVzKSB7XG4gICAgICByZXF1ZXN0LmNhdGVnb3J5KHRoaXMub3B0aW9ucy5jYXRlZ29yaWVzKTtcbiAgICB9XG5cbiAgICAvLyAxNSBpcyB0aGUgbWF4aW11bSBudW1iZXIgb2Ygc3VnZ2VzdGlvbnMgdGhhdCBjYW4gYmUgcmV0dXJuZWRcbiAgICByZXF1ZXN0Lm1heFN1Z2dlc3Rpb25zKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzKTtcblxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgc3VnZ2VzdGlvbnMgPSBbXTtcbiAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgd2hpbGUgKHJlc3BvbnNlLnN1Z2dlc3Rpb25zLmxlbmd0aCAmJiBzdWdnZXN0aW9ucy5sZW5ndGggPD0gKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzIC0gMSkpIHtcbiAgICAgICAgICB2YXIgc3VnZ2VzdGlvbiA9IHJlc3BvbnNlLnN1Z2dlc3Rpb25zLnNoaWZ0KCk7XG4gICAgICAgICAgaWYgKCFzdWdnZXN0aW9uLmlzQ29sbGVjdGlvbikge1xuICAgICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgIHRleHQ6IHN1Z2dlc3Rpb24udGV4dCxcbiAgICAgICAgICAgICAgbWFnaWNLZXk6IHN1Z2dlc3Rpb24ubWFnaWNLZXlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FsbGJhY2soZXJyb3IsIHN1Z2dlc3Rpb25zKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB0aGlzLmdlb2NvZGUoKS50ZXh0KHRleHQpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgcmVxdWVzdC5rZXkoa2V5KTtcbiAgICB9XG4gICAgLy8gaW4gdGhlIGZ1dHVyZSBBZGRyZXNzL1N0cmVldE5hbWUgZ2VvY29kaW5nIHJlcXVlc3RzIHRoYXQgaW5jbHVkZSBhIG1hZ2ljS2V5IHdpbGwgb25seSByZXR1cm4gb25lIG1hdGNoXG4gICAgcmVxdWVzdC5tYXhMb2NhdGlvbnModGhpcy5vcHRpb25zLm1heFJlc3VsdHMpO1xuXG4gICAgaWYgKGJvdW5kcykge1xuICAgICAgcmVxdWVzdC53aXRoaW4oYm91bmRzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmZvclN0b3JhZ2UpIHtcbiAgICAgIHJlcXVlc3QuZm9yU3RvcmFnZSh0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3BvbnNlLnJlc3VsdHMpO1xuICAgIH0sIHRoaXMpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFyY2dpc09ubGluZVByb3ZpZGVyIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgQXJjZ2lzT25saW5lUHJvdmlkZXIob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFyY2dpc09ubGluZVByb3ZpZGVyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBnZW9zZWFyY2hDb3JlIH0gZnJvbSAnLi4vQ2xhc3Nlcy9HZW9zZWFyY2hDb3JlJztcbmltcG9ydCB7IGFyY2dpc09ubGluZVByb3ZpZGVyIH0gZnJvbSAnLi4vUHJvdmlkZXJzL0FyY2dpc09ubGluZUdlb2NvZGVyJztcbmltcG9ydCB7IFV0aWwgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuXG5leHBvcnQgdmFyIEdlb3NlYXJjaCA9IEwuQ29udHJvbC5leHRlbmQoe1xuICBpbmNsdWRlczogTC5NaXhpbi5FdmVudHMsXG5cbiAgb3B0aW9uczoge1xuICAgIHBvc2l0aW9uOiAndG9wbGVmdCcsXG4gICAgY29sbGFwc2VBZnRlclJlc3VsdDogdHJ1ZSxcbiAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgYWxsb3dNdWx0aXBsZVJlc3VsdHM6IHRydWUsXG4gICAgcGxhY2Vob2xkZXI6ICdTZWFyY2ggZm9yIHBsYWNlcyBvciBhZGRyZXNzZXMnLFxuICAgIHRpdGxlOiAnTG9jYXRpb24gU2VhcmNoJ1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG5cbiAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMucHJvdmlkZXJzIHx8ICFvcHRpb25zLnByb3ZpZGVycy5sZW5ndGgpIHtcbiAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICB9XG4gICAgICBvcHRpb25zLnByb3ZpZGVycyA9IFsgYXJjZ2lzT25saW5lUHJvdmlkZXIoKSBdO1xuICAgIH1cblxuICAgIC8vIGluc3RhbnRpYXRlIHRoZSB1bmRlcmx5aW5nIGNsYXNzIGFuZCBwYXNzIGFsb25nIG9wdGlvbnNcbiAgICB0aGlzLl9nZW9zZWFyY2hDb3JlID0gZ2Vvc2VhcmNoQ29yZSh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wcm92aWRlcnMgPSBvcHRpb25zLnByb3ZpZGVycztcblxuICAgIC8vIGJ1YmJsZSBlYWNoIHByb3ZpZGVycyBldmVudHMgdG8gdGhlIGNvbnRyb2xcbiAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wcm92aWRlcnNbaV0uYWRkRXZlbnRQYXJlbnQodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcGVuZGluZ1N1Z2dlc3Rpb25zID0gW107XG5cbiAgICBMLkNvbnRyb2wucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbChvcHRpb25zKTtcbiAgfSxcblxuICBfcmVuZGVyU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uIChzdWdnZXN0aW9ucykge1xuICAgIHZhciBjdXJyZW50R3JvdXA7XG5cbiAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuICAgIC8vIHNldCB0aGUgbWF4SGVpZ2h0IG9mIHRoZSBzdWdnZXN0aW9ucyBib3ggdG9cbiAgICAvLyBtYXAgaGVpZ2h0XG4gICAgLy8gLSBzdWdnZXN0aW9ucyBvZmZzZXQgKGRpc3RhbmNlIGZyb20gdG9wIG9mIHN1Z2dlc3Rpb25zIHRvIHRvcCBvZiBjb250cm9sKVxuICAgIC8vIC0gY29udHJvbCBvZmZzZXQgKGRpc3RhbmNlIGZyb20gdG9wIG9mIGNvbnRyb2wgdG8gdG9wIG9mIG1hcClcbiAgICAvLyAtIDEwIChleHRyYSBwYWRkaW5nKVxuICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLm1heEhlaWdodCA9ICh0aGlzLl9tYXAuZ2V0U2l6ZSgpLnkgLSB0aGlzLl9zdWdnZXN0aW9ucy5vZmZzZXRUb3AgLSB0aGlzLl93cmFwcGVyLm9mZnNldFRvcCAtIDEwKSArICdweCc7XG5cbiAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICB2YXIgbGlzdDtcbiAgICB2YXIgaGVhZGVyO1xuICAgIHZhciBzdWdnZXN0aW9uVGV4dEFycmF5ID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1Z2dlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc3VnZ2VzdGlvbiA9IHN1Z2dlc3Rpb25zW2ldO1xuICAgICAgaWYgKCFoZWFkZXIgJiYgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcHJvdmlkZXJzLmxlbmd0aCA+IDEgJiYgY3VycmVudEdyb3VwICE9PSBzdWdnZXN0aW9uLnByb3ZpZGVyLm9wdGlvbnMubGFiZWwpIHtcbiAgICAgICAgaGVhZGVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnc3BhbicsICdnZW9jb2Rlci1jb250cm9sLWhlYWRlcicsIHRoaXMuX3N1Z2dlc3Rpb25zKTtcbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gc3VnZ2VzdGlvbi5wcm92aWRlci5vcHRpb25zLmxhYmVsO1xuICAgICAgICBoZWFkZXIuaW5uZXJUZXh0ID0gc3VnZ2VzdGlvbi5wcm92aWRlci5vcHRpb25zLmxhYmVsO1xuICAgICAgICBjdXJyZW50R3JvdXAgPSBzdWdnZXN0aW9uLnByb3ZpZGVyLm9wdGlvbnMubGFiZWw7XG4gICAgICAgIG5vZGVzLnB1c2goaGVhZGVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFsaXN0KSB7XG4gICAgICAgIGxpc3QgPSBMLkRvbVV0aWwuY3JlYXRlKCd1bCcsICdnZW9jb2Rlci1jb250cm9sLWxpc3QnLCB0aGlzLl9zdWdnZXN0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdWdnZXN0aW9uVGV4dEFycmF5LmluZGV4T2Yoc3VnZ2VzdGlvbi50ZXh0KSA9PT0gLTEpIHtcbiAgICAgICAgdmFyIHN1Z2dlc3Rpb25JdGVtID0gTC5Eb21VdGlsLmNyZWF0ZSgnbGknLCAnZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9uJywgbGlzdCk7XG5cbiAgICAgICAgc3VnZ2VzdGlvbkl0ZW0uaW5uZXJIVE1MID0gc3VnZ2VzdGlvbi50ZXh0O1xuICAgICAgICBzdWdnZXN0aW9uSXRlbS5wcm92aWRlciA9IHN1Z2dlc3Rpb24ucHJvdmlkZXI7XG4gICAgICAgIHN1Z2dlc3Rpb25JdGVtWydkYXRhLW1hZ2ljLWtleSddID0gc3VnZ2VzdGlvbi5tYWdpY0tleTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGlzdC5jaGlsZE5vZGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgLy8gaWYgdGhlIHNhbWUgdGV4dCBhbHJlYWR5IGFwcGVhcnMgaW4gdGhlIGxpc3Qgb2Ygc3VnZ2VzdGlvbnMsIGFwcGVuZCBhbiBhZGRpdGlvbmFsIE9iamVjdElEIHRvIGl0cyBtYWdpY0tleSBpbnN0ZWFkXG4gICAgICAgICAgaWYgKGxpc3QuY2hpbGROb2Rlc1tqXS5pbm5lckhUTUwgPT09IHN1Z2dlc3Rpb24udGV4dCkge1xuICAgICAgICAgICAgbGlzdC5jaGlsZE5vZGVzW2pdWydkYXRhLW1hZ2ljLWtleSddICs9ICcsJyArIHN1Z2dlc3Rpb24ubWFnaWNLZXk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzdWdnZXN0aW9uVGV4dEFycmF5LnB1c2goc3VnZ2VzdGlvbi50ZXh0KTtcbiAgICB9XG5cbiAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWxvYWRpbmcnKTtcblxuICAgIG5vZGVzLnB1c2gobGlzdCk7XG5cbiAgICByZXR1cm4gbm9kZXM7XG4gIH0sXG5cbiAgX2JvdW5kc0Zyb21SZXN1bHRzOiBmdW5jdGlvbiAocmVzdWx0cykge1xuICAgIGlmICghcmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbnVsbElzbGFuZCA9IEwubGF0TG5nQm91bmRzKFswLCAwXSwgWzAsIDBdKTtcbiAgICB2YXIgcmVzdWx0Qm91bmRzID0gW107XG4gICAgdmFyIHJlc3VsdExhdGxuZ3MgPSBbXTtcblxuICAgIC8vIGNvbGxlY3QgdGhlIGJvdW5kcyBhbmQgY2VudGVyIG9mIGVhY2ggcmVzdWx0XG4gICAgZm9yICh2YXIgaSA9IHJlc3VsdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciByZXN1bHQgPSByZXN1bHRzW2ldO1xuXG4gICAgICByZXN1bHRMYXRsbmdzLnB1c2gocmVzdWx0LmxhdGxuZyk7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSBib3VuZHMgYXJlIHZhbGlkIGFuZCBub3QgMCwwLiBzb21ldGltZXMgYm91bmRzIGFyZSBpbmNvcnJlY3Qgb3Igbm90IHByZXNlbnRcbiAgICAgIGlmIChyZXN1bHQuYm91bmRzICYmIHJlc3VsdC5ib3VuZHMuaXNWYWxpZCgpICYmICFyZXN1bHQuYm91bmRzLmVxdWFscyhudWxsSXNsYW5kKSkge1xuICAgICAgICByZXN1bHRCb3VuZHMucHVzaChyZXN1bHQuYm91bmRzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmb3JtIGEgYm91bmRzIG9iamVjdCBjb250YWluaW5nIGFsbCBjZW50ZXIgcG9pbnRzXG4gICAgdmFyIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKHJlc3VsdExhdGxuZ3MpO1xuXG4gICAgLy8gYW5kIGV4dGVuZCBpdCB0byBjb250YWluIGFsbCBib3VuZHMgb2JqZWN0c1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzdWx0Qm91bmRzLmxlbmd0aDsgaisrKSB7XG4gICAgICBib3VuZHMuZXh0ZW5kKHJlc3VsdEJvdW5kc1tqXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfSxcblxuICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3N1Z2dlc3Rpb25zLmlubmVySFRNTCA9ICcnO1xuICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGhpcy5faW5wdXQudmFsdWUgPSAnJztcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29sbGFwc2VBZnRlclJlc3VsdCkge1xuICAgICAgdGhpcy5faW5wdXQucGxhY2Vob2xkZXIgPSAnJztcbiAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl93cmFwcGVyLCAnZ2VvY29kZXItY29udHJvbC1leHBhbmRlZCcpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fbWFwLnNjcm9sbFdoZWVsWm9vbS5lbmFibGVkKCkgJiYgdGhpcy5fbWFwLm9wdGlvbnMuc2Nyb2xsV2hlZWxab29tKSB7XG4gICAgICB0aGlzLl9tYXAuc2Nyb2xsV2hlZWxab29tLmVuYWJsZSgpO1xuICAgIH1cbiAgfSxcblxuICBjbGVhclN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX25vZGVzKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuX25vZGVzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGlmICh0aGlzLl9ub2Rlc1trXS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMucmVtb3ZlQ2hpbGQodGhpcy5fbm9kZXNba10pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9zZXR1cENsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XG4gICAgdGhpcy5faW5wdXQuZm9jdXMoKTtcbiAgfSxcblxuICBkaXNhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5faW5wdXQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9pbnB1dCwgJ2dlb2NvZGVyLWNvbnRyb2wtaW5wdXQtZGlzYWJsZWQnKTtcbiAgICBMLkRvbUV2ZW50LnJlbW92ZUxpc3RlbmVyKHRoaXMuX3dyYXBwZXIsICdjbGljaycsIHRoaXMuX3NldHVwQ2xpY2ssIHRoaXMpO1xuICB9LFxuXG4gIGVuYWJsZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2lucHV0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1pbnB1dC1kaXNhYmxlZCcpO1xuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fd3JhcHBlciwgJ2NsaWNrJywgdGhpcy5fc2V0dXBDbGljaywgdGhpcyk7XG4gIH0sXG5cbiAgZ2V0QXR0cmlidXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXR0cmlicyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9wcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLl9wcm92aWRlcnNbaV0ub3B0aW9ucy5hdHRyaWJ1dGlvbikge1xuICAgICAgICBhdHRyaWJzLnB1c2godGhpcy5fcHJvdmlkZXJzW2ldLm9wdGlvbnMuYXR0cmlidXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhdHRyaWJzLmpvaW4oJywgJyk7XG4gIH0sXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICAvLyBpbmNsdWRlICdQb3dlcmVkIGJ5IEVzcmknIGluIG1hcCBhdHRyaWJ1dGlvblxuICAgIFV0aWwuc2V0RXNyaUF0dHJpYnV0aW9uKG1hcCk7XG5cbiAgICB0aGlzLl9tYXAgPSBtYXA7XG4gICAgdGhpcy5fd3JhcHBlciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdnZW9jb2Rlci1jb250cm9sJyk7XG4gICAgdGhpcy5faW5wdXQgPSBMLkRvbVV0aWwuY3JlYXRlKCdpbnB1dCcsICdnZW9jb2Rlci1jb250cm9sLWlucHV0IGxlYWZsZXQtYmFyJywgdGhpcy5fd3JhcHBlcik7XG4gICAgdGhpcy5faW5wdXQudGl0bGUgPSB0aGlzLm9wdGlvbnMudGl0bGU7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmV4cGFuZGVkKSB7XG4gICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fd3JhcHBlciwgJ2dlb2NvZGVyLWNvbnRyb2wtZXhwYW5kZWQnKTtcbiAgICAgIHRoaXMuX2lucHV0LnBsYWNlaG9sZGVyID0gdGhpcy5vcHRpb25zLnBsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIHRoaXMuX3N1Z2dlc3Rpb25zID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2dlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbnMgbGVhZmxldC1iYXInLCB0aGlzLl93cmFwcGVyKTtcblxuICAgIHZhciBjcmVkaXRzID0gdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fZ2V0QXR0cmlidXRpb24oKTtcbiAgICBtYXAuYXR0cmlidXRpb25Db250cm9sLmFkZEF0dHJpYnV0aW9uKGNyZWRpdHMpO1xuXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9pbnB1dCwgJ2ZvY3VzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHRoaXMuX2lucHV0LnBsYWNlaG9sZGVyID0gdGhpcy5vcHRpb25zLnBsYWNlaG9sZGVyO1xuICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX3dyYXBwZXIsICdjbGljaycsIHRoaXMuX3NldHVwQ2xpY2ssIHRoaXMpO1xuXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9zdWdnZXN0aW9ucywgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgc3VnZ2VzdGlvbkl0ZW0gPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9nZW9jb2RlKHN1Z2dlc3Rpb25JdGVtLmlubmVySFRNTCwgc3VnZ2VzdGlvbkl0ZW1bJ2RhdGEtbWFnaWMta2V5J10sIHN1Z2dlc3Rpb25JdGVtLnByb3ZpZGVyKTtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5faW5wdXQsICdibHVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl93cmFwcGVyLCAnZ2VvY29kZXItY29udHJvbC1leHBhbmRlZCcpO1xuXG4gICAgICB2YXIgbGlzdCA9IHRoaXMuX3N1Z2dlc3Rpb25zLnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgJ2dlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbicpO1xuICAgICAgdmFyIHNlbGVjdGVkID0gdGhpcy5fc3VnZ2VzdGlvbnMucXVlcnlTZWxlY3RvckFsbCgnLicgKyAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpWzBdO1xuICAgICAgdmFyIHNlbGVjdGVkUG9zaXRpb247XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobGlzdFtpXSA9PT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICBzZWxlY3RlZFBvc2l0aW9uID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fZ2VvY29kZShzZWxlY3RlZC5pbm5lckhUTUwsIHNlbGVjdGVkWydkYXRhLW1hZ2ljLWtleSddLCBzZWxlY3RlZC5wcm92aWRlcik7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dNdWx0aXBsZVJlc3VsdHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX2dlb2NvZGUodGhpcy5faW5wdXQudmFsdWUsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhsaXN0WzBdLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHNlbGVjdGVkLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBwcmV2aW91c0l0ZW0gPSBsaXN0W3NlbGVjdGVkUG9zaXRpb24gLSAxXTtcblxuICAgICAgICAgIGlmIChzZWxlY3RlZCAmJiBwcmV2aW91c0l0ZW0pIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhwcmV2aW91c0l0ZW0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhsaXN0W2xpc3QubGVuZ3RoIC0gMV0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3Moc2VsZWN0ZWQsICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG5leHRJdGVtID0gbGlzdFtzZWxlY3RlZFBvc2l0aW9uICsgMV07XG5cbiAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgbmV4dEl0ZW0pIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhuZXh0SXRlbSwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKGxpc3RbMF0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gd2hlbiB0aGUgaW5wdXQgY2hhbmdlcyB3ZSBzaG91bGQgY2FuY2VsIGFsbCBwZW5kaW5nIHN1Z2dlc3Rpb24gcmVxdWVzdHMgaWYgcG9zc2libGUgdG8gYXZvaWQgcmVzdWx0IGNvbGxpc2lvbnNcbiAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHRoaXMuX2dlb3NlYXJjaENvcmUuX3BlbmRpbmdTdWdnZXN0aW9ucy5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wZW5kaW5nU3VnZ2VzdGlvbnNbeF07XG4gICAgICAgICAgICBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LmFib3J0ICYmICFyZXF1ZXN0LmlkKSB7XG4gICAgICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX2lucHV0LCAna2V5dXAnLCBMLlV0aWwudGhyb3R0bGUoZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICAgIHZhciB0ZXh0ID0gKGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCkudmFsdWU7XG5cbiAgICAgIC8vIHJlcXVpcmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzIGZvciBzdWdnZXN0aW9uc1xuICAgICAgaWYgKHRleHQubGVuZ3RoIDwgMikge1xuICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1sb2FkaW5nJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhpcyBpcyB0aGUgZXNjYXBlIGtleSBpdCB3aWxsIGNsZWFyIHRoZSBpbnB1dCBzbyBjbGVhciBzdWdnZXN0aW9uc1xuICAgICAgaWYgKGtleSA9PT0gMjcpIHtcbiAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhpcyBpcyBOT1QgdGhlIHVwL2Rvd24gYXJyb3dzIG9yIGVudGVyIG1ha2UgYSBzdWdnZXN0aW9uXG4gICAgICBpZiAoa2V5ICE9PSAxMyAmJiBrZXkgIT09IDM4ICYmIGtleSAhPT0gNDApIHtcbiAgICAgICAgaWYgKHRoaXMuX2lucHV0LnZhbHVlICE9PSB0aGlzLl9sYXN0VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl9sYXN0VmFsdWUgPSB0aGlzLl9pbnB1dC52YWx1ZTtcbiAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWxvYWRpbmcnKTtcbiAgICAgICAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9zdWdnZXN0KHRleHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgNTAsIHRoaXMpLCB0aGlzKTtcblxuICAgIEwuRG9tRXZlbnQuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24odGhpcy5fd3JhcHBlcik7XG5cbiAgICAvLyB3aGVuIG1vdXNlIG1vdmVzIG92ZXIgc3VnZ2VzdGlvbnMgZGlzYWJsZSBzY3JvbGwgd2hlZWwgem9vbSBpZiBpdHMgZW5hYmxlZFxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fc3VnZ2VzdGlvbnMsICdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKG1hcC5zY3JvbGxXaGVlbFpvb20uZW5hYmxlZCgpICYmIG1hcC5vcHRpb25zLnNjcm9sbFdoZWVsWm9vbSkge1xuICAgICAgICBtYXAuc2Nyb2xsV2hlZWxab29tLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHdoZW4gbW91c2UgbW92ZXMgbGVhdmVzIHN1Z2dlc3Rpb25zIGVuYWJsZSBzY3JvbGwgd2hlZWwgem9vbSBpZiBpdHMgZGlzYWJsZWRcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX3N1Z2dlc3Rpb25zLCAnbW91c2VvdXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKCFtYXAuc2Nyb2xsV2hlZWxab29tLmVuYWJsZWQoKSAmJiBtYXAub3B0aW9ucy5zY3JvbGxXaGVlbFpvb20pIHtcbiAgICAgICAgbWFwLnNjcm9sbFdoZWVsWm9vbS5lbmFibGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUub24oJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1sb2FkaW5nJyk7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLl9pbnB1dC5ibHVyKCk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICByZXR1cm4gdGhpcy5fd3JhcHBlcjtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9zZWFyY2ggKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBHZW9zZWFyY2gob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlb3NlYXJjaDtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgRmVhdHVyZUxheWVyU2VydmljZSB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5cbmV4cG9ydCB2YXIgRmVhdHVyZUxheWVyUHJvdmlkZXIgPSBGZWF0dXJlTGF5ZXJTZXJ2aWNlLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBsYWJlbDogJ0ZlYXR1cmUgTGF5ZXInLFxuICAgIG1heFJlc3VsdHM6IDUsXG4gICAgYnVmZmVyUmFkaXVzOiAxMDAwLFxuICAgIGZvcm1hdFN1Z2dlc3Rpb246IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICByZXR1cm4gZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHNbMF1dO1xuICAgIH1cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIEZlYXR1cmVMYXllclNlcnZpY2UucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzID0gW3RoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHNdO1xuICAgIH1cbiAgICB0aGlzLl9zdWdnZXN0aW9uc1F1ZXJ5ID0gdGhpcy5xdWVyeSgpO1xuICAgIHRoaXMuX3Jlc3VsdHNRdWVyeSA9IHRoaXMucXVlcnkoKTtcbiAgfSxcblxuICBzdWdnZXN0aW9uczogZnVuY3Rpb24gKHRleHQsIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLl9zdWdnZXN0aW9uc1F1ZXJ5LndoZXJlKHRoaXMuX2J1aWxkUXVlcnkodGV4dCkpXG4gICAgICAucmV0dXJuR2VvbWV0cnkoZmFsc2UpO1xuXG4gICAgaWYgKGJvdW5kcykge1xuICAgICAgcXVlcnkuaW50ZXJzZWN0cyhib3VuZHMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuaWRGaWVsZCkge1xuICAgICAgcXVlcnkuZmllbGRzKFt0aGlzLm9wdGlvbnMuaWRGaWVsZF0uY29uY2F0KHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMpKTtcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IHF1ZXJ5LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJhdykge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBbXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wdGlvbnMuaWRGaWVsZCA9IHJhdy5vYmplY3RJZEZpZWxkTmFtZTtcbiAgICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSByZXN1bHRzLmZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdmFyIGZlYXR1cmUgPSByZXN1bHRzLmZlYXR1cmVzW2ldO1xuICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgdGV4dDogdGhpcy5vcHRpb25zLmZvcm1hdFN1Z2dlc3Rpb24uY2FsbCh0aGlzLCBmZWF0dXJlKSxcbiAgICAgICAgICAgIG1hZ2ljS2V5OiBmZWF0dXJlLmlkXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIHN1Z2dlc3Rpb25zLnNsaWNlKDAsIHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzKSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfSxcblxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdGhpcy5fcmVzdWx0c1F1ZXJ5O1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgZGVsZXRlIHF1ZXJ5LnBhcmFtcy53aGVyZTtcbiAgICAgIHF1ZXJ5LmZlYXR1cmVJZHMoW2tleV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBxdWVyeS53aGVyZSh0aGlzLl9idWlsZFF1ZXJ5KHRleHQpKTtcbiAgICB9XG5cbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICBxdWVyeS53aXRoaW4oYm91bmRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcXVlcnkucnVuKEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgZmVhdHVyZXMpIHtcbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZlYXR1cmVzLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBmZWF0dXJlID0gZmVhdHVyZXMuZmVhdHVyZXNbaV07XG4gICAgICAgIGlmIChmZWF0dXJlKSB7XG4gICAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuX2ZlYXR1cmVCb3VuZHMoZmVhdHVyZSk7XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgbGF0bG5nOiBib3VuZHMuZ2V0Q2VudGVyKCksXG4gICAgICAgICAgICBib3VuZHM6IGJvdW5kcyxcbiAgICAgICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5mb3JtYXRTdWdnZXN0aW9uLmNhbGwodGhpcywgZmVhdHVyZSksXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBmZWF0dXJlLnByb3BlcnRpZXMsXG4gICAgICAgICAgICBnZW9qc29uOiBmZWF0dXJlXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuXG4gICAgICAgICAgLy8gY2xlYXIgcXVlcnkgcGFyYW1ldGVycyBmb3IgdGhlIG5leHQgc2VhcmNoXG4gICAgICAgICAgZGVsZXRlIHRoaXMuX3Jlc3VsdHNRdWVyeS5wYXJhbXNbJ29iamVjdElkcyddO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzdWx0cyk7XG4gICAgfSwgdGhpcykpO1xuICB9LFxuXG4gIG9yZGVyQnk6IGZ1bmN0aW9uIChmaWVsZE5hbWUsIG9yZGVyKSB7XG4gICAgdGhpcy5fc3VnZ2VzdGlvbnNRdWVyeS5vcmRlckJ5KGZpZWxkTmFtZSwgb3JkZXIpO1xuICB9LFxuXG4gIF9idWlsZFF1ZXJ5OiBmdW5jdGlvbiAodGV4dCkge1xuICAgIHZhciBxdWVyeVN0cmluZyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmaWVsZCA9ICd1cHBlcihcIicgKyB0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzW2ldICsgJ1wiKSc7XG5cbiAgICAgIHF1ZXJ5U3RyaW5nLnB1c2goZmllbGQgKyBcIiBMSUtFIHVwcGVyKCclXCIgKyB0ZXh0ICsgXCIlJylcIik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy53aGVyZSkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy53aGVyZSArICcgQU5EICgnICsgcXVlcnlTdHJpbmcuam9pbignIE9SICcpICsgJyknO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcXVlcnlTdHJpbmcuam9pbignIE9SICcpO1xuICAgIH1cbiAgfSxcblxuICBfZmVhdHVyZUJvdW5kczogZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICB2YXIgZ2VvanNvbiA9IEwuZ2VvSnNvbihmZWF0dXJlKTtcbiAgICBpZiAoZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICB2YXIgY2VudGVyID0gZ2VvanNvbi5nZXRCb3VuZHMoKS5nZXRDZW50ZXIoKTtcbiAgICAgIHZhciBsbmdSYWRpdXMgPSAoKHRoaXMub3B0aW9ucy5idWZmZXJSYWRpdXMgLyA0MDA3NTAxNykgKiAzNjApIC8gTWF0aC5jb3MoKDE4MCAvIE1hdGguUEkpICogY2VudGVyLmxhdCk7XG4gICAgICB2YXIgbGF0UmFkaXVzID0gKHRoaXMub3B0aW9ucy5idWZmZXJSYWRpdXMgLyA0MDA3NTAxNykgKiAzNjA7XG4gICAgICByZXR1cm4gTC5sYXRMbmdCb3VuZHMoW2NlbnRlci5sYXQgLSBsYXRSYWRpdXMsIGNlbnRlci5sbmcgLSBsbmdSYWRpdXNdLCBbY2VudGVyLmxhdCArIGxhdFJhZGl1cywgY2VudGVyLmxuZyArIGxuZ1JhZGl1c10pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZ2VvanNvbi5nZXRCb3VuZHMoKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZUxheWVyUHJvdmlkZXIgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBGZWF0dXJlTGF5ZXJQcm92aWRlcihvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmVhdHVyZUxheWVyUHJvdmlkZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuXG5leHBvcnQgdmFyIE1hcFNlcnZpY2VQcm92aWRlciA9IE1hcFNlcnZpY2UuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIGxheWVyczogWzBdLFxuICAgIGxhYmVsOiAnTWFwIFNlcnZpY2UnLFxuICAgIGJ1ZmZlclJhZGl1czogMTAwMCxcbiAgICBtYXhSZXN1bHRzOiA1LFxuICAgIGZvcm1hdFN1Z2dlc3Rpb246IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICByZXR1cm4gZmVhdHVyZS5wcm9wZXJ0aWVzW2ZlYXR1cmUuZGlzcGxheUZpZWxkTmFtZV0gKyAnIDxzbWFsbD4nICsgZmVhdHVyZS5sYXllck5hbWUgKyAnPC9zbWFsbD4nO1xuICAgIH1cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIE1hcFNlcnZpY2UucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9nZXRJZEZpZWxkcygpO1xuICB9LFxuXG4gIHN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAodGV4dCwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciByZXF1ZXN0ID0gdGhpcy5maW5kKCkudGV4dCh0ZXh0KS5maWVsZHModGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcykucmV0dXJuR2VvbWV0cnkoZmFsc2UpLmxheWVycyh0aGlzLm9wdGlvbnMubGF5ZXJzKTtcblxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJhdykge1xuICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gW107XG4gICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgIHZhciBjb3VudCA9IE1hdGgubWluKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzLCByZXN1bHRzLmZlYXR1cmVzLmxlbmd0aCk7XG4gICAgICAgIHJhdy5yZXN1bHRzID0gcmF3LnJlc3VsdHMucmV2ZXJzZSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICB2YXIgZmVhdHVyZSA9IHJlc3VsdHMuZmVhdHVyZXNbaV07XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHJhdy5yZXN1bHRzW2ldO1xuICAgICAgICAgIHZhciBsYXllciA9IHJlc3VsdC5sYXllcklkO1xuICAgICAgICAgIHZhciBpZEZpZWxkID0gdGhpcy5faWRGaWVsZHNbbGF5ZXJdO1xuICAgICAgICAgIGZlYXR1cmUubGF5ZXJJZCA9IGxheWVyO1xuICAgICAgICAgIGZlYXR1cmUubGF5ZXJOYW1lID0gdGhpcy5fbGF5ZXJOYW1lc1tsYXllcl07XG4gICAgICAgICAgZmVhdHVyZS5kaXNwbGF5RmllbGROYW1lID0gdGhpcy5fZGlzcGxheUZpZWxkc1tsYXllcl07XG4gICAgICAgICAgaWYgKGlkRmllbGQpIHtcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgICB0ZXh0OiB0aGlzLm9wdGlvbnMuZm9ybWF0U3VnZ2VzdGlvbi5jYWxsKHRoaXMsIGZlYXR1cmUpLFxuICAgICAgICAgICAgICBtYWdpY0tleTogcmVzdWx0LmF0dHJpYnV0ZXNbaWRGaWVsZF0gKyAnOicgKyBsYXllclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhlcnJvciwgc3VnZ2VzdGlvbnMucmV2ZXJzZSgpKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICB2YXIgcmVxdWVzdDtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIHZhciBmZWF0dXJlSWQgPSBrZXkuc3BsaXQoJzonKVswXTtcbiAgICAgIHZhciBsYXllciA9IGtleS5zcGxpdCgnOicpWzFdO1xuICAgICAgcmVxdWVzdCA9IHRoaXMucXVlcnkoKS5sYXllcihsYXllcikuZmVhdHVyZUlkcyhmZWF0dXJlSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0ID0gdGhpcy5maW5kKCkudGV4dCh0ZXh0KS5maWVsZHModGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcykubGF5ZXJzKHRoaXMub3B0aW9ucy5sYXllcnMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIGZlYXR1cmVzLCByZXNwb25zZSkge1xuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICBpZiAocmVzcG9uc2UucmVzdWx0cykge1xuICAgICAgICAgIHJlc3BvbnNlLnJlc3VsdHMgPSByZXNwb25zZS5yZXN1bHRzLnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZlYXR1cmVzLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGZlYXR1cmUgPSBmZWF0dXJlcy5mZWF0dXJlc1tpXTtcbiAgICAgICAgICBsYXllciA9IGxheWVyIHx8IHJlc3BvbnNlLnJlc3VsdHNbaV0ubGF5ZXJJZDtcblxuICAgICAgICAgIGlmIChmZWF0dXJlICYmIGxheWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9mZWF0dXJlQm91bmRzKGZlYXR1cmUpO1xuICAgICAgICAgICAgZmVhdHVyZS5sYXllcklkID0gbGF5ZXI7XG4gICAgICAgICAgICBmZWF0dXJlLmxheWVyTmFtZSA9IHRoaXMuX2xheWVyTmFtZXNbbGF5ZXJdO1xuICAgICAgICAgICAgZmVhdHVyZS5kaXNwbGF5RmllbGROYW1lID0gdGhpcy5fZGlzcGxheUZpZWxkc1tsYXllcl07XG5cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICAgIGxhdGxuZzogYm91bmRzLmdldENlbnRlcigpLFxuICAgICAgICAgICAgICBib3VuZHM6IGJvdW5kcyxcbiAgICAgICAgICAgICAgdGV4dDogdGhpcy5vcHRpb25zLmZvcm1hdFN1Z2dlc3Rpb24uY2FsbCh0aGlzLCBmZWF0dXJlKSxcbiAgICAgICAgICAgICAgcHJvcGVydGllczogZmVhdHVyZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICBnZW9qc29uOiBmZWF0dXJlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKGVycm9yLCByZXN1bHRzLnJldmVyc2UoKSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX2ZlYXR1cmVCb3VuZHM6IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgdmFyIGdlb2pzb24gPSBMLmdlb0pzb24oZmVhdHVyZSk7XG4gICAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgdmFyIGNlbnRlciA9IGdlb2pzb24uZ2V0Qm91bmRzKCkuZ2V0Q2VudGVyKCk7XG4gICAgICB2YXIgbG5nUmFkaXVzID0gKCh0aGlzLm9wdGlvbnMuYnVmZmVyUmFkaXVzIC8gNDAwNzUwMTcpICogMzYwKSAvIE1hdGguY29zKCgxODAgLyBNYXRoLlBJKSAqIGNlbnRlci5sYXQpO1xuICAgICAgdmFyIGxhdFJhZGl1cyA9ICh0aGlzLm9wdGlvbnMuYnVmZmVyUmFkaXVzIC8gNDAwNzUwMTcpICogMzYwO1xuICAgICAgcmV0dXJuIEwubGF0TG5nQm91bmRzKFtjZW50ZXIubGF0IC0gbGF0UmFkaXVzLCBjZW50ZXIubG5nIC0gbG5nUmFkaXVzXSwgW2NlbnRlci5sYXQgKyBsYXRSYWRpdXMsIGNlbnRlci5sbmcgKyBsbmdSYWRpdXNdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdlb2pzb24uZ2V0Qm91bmRzKCk7XG4gICAgfVxuICB9LFxuXG4gIF9sYXllck1ldGFkYXRhQ2FsbGJhY2s6IGZ1bmN0aW9uIChsYXllcmlkKSB7XG4gICAgcmV0dXJuIEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgbWV0YWRhdGEpIHtcbiAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH1cbiAgICAgIHRoaXMuX2Rpc3BsYXlGaWVsZHNbbGF5ZXJpZF0gPSBtZXRhZGF0YS5kaXNwbGF5RmllbGQ7XG4gICAgICB0aGlzLl9sYXllck5hbWVzW2xheWVyaWRdID0gbWV0YWRhdGEubmFtZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0YWRhdGEuZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBmaWVsZCA9IG1ldGFkYXRhLmZpZWxkc1tpXTtcbiAgICAgICAgaWYgKGZpZWxkLnR5cGUgPT09ICdlc3JpRmllbGRUeXBlT0lEJykge1xuICAgICAgICAgIHRoaXMuX2lkRmllbGRzW2xheWVyaWRdID0gZmllbGQubmFtZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIF9nZXRJZEZpZWxkczogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2lkRmllbGRzID0ge307XG4gICAgdGhpcy5fZGlzcGxheUZpZWxkcyA9IHt9O1xuICAgIHRoaXMuX2xheWVyTmFtZXMgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsYXllciA9IHRoaXMub3B0aW9ucy5sYXllcnNbaV07XG4gICAgICB0aGlzLmdldChsYXllciwge30sIHRoaXMuX2xheWVyTWV0YWRhdGFDYWxsYmFjayhsYXllcikpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBTZXJ2aWNlUHJvdmlkZXIgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBNYXBTZXJ2aWNlUHJvdmlkZXIob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcFNlcnZpY2VQcm92aWRlcjtcbiIsImltcG9ydCB7IEdlb2NvZGVTZXJ2aWNlIH0gZnJvbSAnLi4vU2VydmljZXMvR2VvY29kZSc7XG5cbmV4cG9ydCB2YXIgR2VvY29kZVNlcnZpY2VQcm92aWRlciA9IEdlb2NvZGVTZXJ2aWNlLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBsYWJlbDogJ0dlb2NvZGUgU2VydmVyJyxcbiAgICBtYXhSZXN1bHRzOiA1XG4gIH0sXG5cbiAgc3VnZ2VzdGlvbnM6IGZ1bmN0aW9uICh0ZXh0LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gdGhpcy5zdWdnZXN0KCkudGV4dCh0ZXh0KTtcbiAgICAgIGlmIChib3VuZHMpIHtcbiAgICAgICAgcmVxdWVzdC53aXRoaW4oYm91bmRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlcXVlc3QucnVuKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gW107XG4gICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICB3aGlsZSAocmVzcG9uc2Uuc3VnZ2VzdGlvbnMubGVuZ3RoICYmIHN1Z2dlc3Rpb25zLmxlbmd0aCA8PSAodGhpcy5vcHRpb25zLm1heFJlc3VsdHMgLSAxKSkge1xuICAgICAgICAgICAgdmFyIHN1Z2dlc3Rpb24gPSByZXNwb25zZS5zdWdnZXN0aW9ucy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKCFzdWdnZXN0aW9uLmlzQ29sbGVjdGlvbikge1xuICAgICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBzdWdnZXN0aW9uLnRleHQsXG4gICAgICAgICAgICAgICAgbWFnaWNLZXk6IHN1Z2dlc3Rpb24ubWFnaWNLZXlcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBzdWdnZXN0aW9ucyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sodW5kZWZpbmVkLCBbXSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LFxuXG4gIHJlc3VsdHM6IGZ1bmN0aW9uICh0ZXh0LCBrZXksIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxdWVzdCA9IHRoaXMuZ2VvY29kZSgpLnRleHQodGV4dCk7XG5cbiAgICByZXF1ZXN0Lm1heExvY2F0aW9ucyh0aGlzLm9wdGlvbnMubWF4UmVzdWx0cyk7XG5cbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICByZXF1ZXN0LndpdGhpbihib3VuZHMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UucmVzdWx0cyk7XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VvY29kZVNlcnZpY2VQcm92aWRlciAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlb2NvZGVTZXJ2aWNlUHJvdmlkZXI7XG4iLCJleHBvcnQgeyB2ZXJzaW9uIGFzIFZFUlNJT04gfSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuZXhwb3J0IHZhciBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmwgPSAnaHR0cHM6Ly9nZW9jb2RlLmFyY2dpcy5jb20vYXJjZ2lzL3Jlc3Qvc2VydmljZXMvV29ybGQvR2VvY29kZVNlcnZlci8nO1xuXG4vLyBpbXBvcnQgdGFza3NcbmV4cG9ydCB7IEdlb2NvZGUsIGdlb2NvZGUgfSBmcm9tICcuL1Rhc2tzL0dlb2NvZGUnO1xuZXhwb3J0IHsgUmV2ZXJzZUdlb2NvZGUsIHJldmVyc2VHZW9jb2RlIH0gZnJvbSAnLi9UYXNrcy9SZXZlcnNlR2VvY29kZSc7XG5leHBvcnQgeyBTdWdnZXN0LCBzdWdnZXN0IH0gZnJvbSAnLi9UYXNrcy9TdWdnZXN0JztcblxuLy8gaW1wb3J0IHNlcnZpY2VcbmV4cG9ydCB7IEdlb2NvZGVTZXJ2aWNlLCBnZW9jb2RlU2VydmljZSB9IGZyb20gJy4vU2VydmljZXMvR2VvY29kZSc7XG5cbi8vIGltcG9ydCBjb250cm9sXG5leHBvcnQgeyBHZW9zZWFyY2gsIGdlb3NlYXJjaCB9IGZyb20gJy4vQ29udHJvbHMvR2Vvc2VhcmNoJztcblxuLy8gaW1wb3J0IHN1cHBvcnRpbmcgY2xhc3NcbmV4cG9ydCB7IEdlb3NlYXJjaENvcmUsIGdlb3NlYXJjaENvcmUgfSBmcm9tICcuL0NsYXNzZXMvR2Vvc2VhcmNoQ29yZSc7XG5cbi8vIGltcG9ydCBwcm92aWRlcnNcbmV4cG9ydCB7IEFyY2dpc09ubGluZVByb3ZpZGVyLCBhcmNnaXNPbmxpbmVQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL0FyY2dpc09ubGluZUdlb2NvZGVyJztcbmV4cG9ydCB7IEZlYXR1cmVMYXllclByb3ZpZGVyLCBmZWF0dXJlTGF5ZXJQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL0ZlYXR1cmVMYXllcic7XG5leHBvcnQgeyBNYXBTZXJ2aWNlUHJvdmlkZXIsIG1hcFNlcnZpY2VQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL01hcFNlcnZpY2UnO1xuZXhwb3J0IHsgR2VvY29kZVNlcnZpY2VQcm92aWRlciwgZ2VvY29kZVNlcnZpY2VQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL0dlb2NvZGVTZXJ2aWNlJztcbiJdLCJuYW1lcyI6WyJUYXNrIiwiVXRpbCIsIlNlcnZpY2UiLCJGZWF0dXJlTGF5ZXJTZXJ2aWNlIiwiTWFwU2VydmljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztDQ0lPLElBQUksT0FBTyxHQUFHQSxnQkFBSSxDQUFDLE1BQU0sQ0FBQztBQUNqQyxDQUFBLEVBQUUsSUFBSSxFQUFFLE1BQU07O0FBRWQsQ0FBQSxFQUFFLE1BQU0sRUFBRTtBQUNWLENBQUEsSUFBSSxLQUFLLEVBQUUsSUFBSTtBQUNmLENBQUEsSUFBSSxVQUFVLEVBQUUsS0FBSztBQUNyQixDQUFBLElBQUksU0FBUyxFQUFFLEdBQUc7QUFDbEIsQ0FBQSxJQUFJLFlBQVksRUFBRSxFQUFFO0FBQ3BCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsT0FBTyxFQUFFO0FBQ1gsQ0FBQSxJQUFJLFNBQVMsRUFBRSxTQUFTO0FBQ3hCLENBQUEsSUFBSSxjQUFjLEVBQUUsY0FBYztBQUNsQyxDQUFBLElBQUksTUFBTSxFQUFFLE1BQU07QUFDbEIsQ0FBQSxJQUFJLFdBQVcsRUFBRSxXQUFXO0FBQzVCLENBQUEsSUFBSSxRQUFRLEVBQUUsUUFBUTtBQUN0QixDQUFBLElBQUksUUFBUSxFQUFFLFFBQVE7QUFDdEIsQ0FBQSxJQUFJLFNBQVMsRUFBRSxTQUFTO0FBQ3hCLENBQUEsSUFBSSxNQUFNLEVBQUUsTUFBTTtBQUNsQixDQUFBLElBQUksVUFBVSxFQUFFLFVBQVU7QUFDMUIsQ0FBQSxJQUFJLE9BQU8sRUFBRSxPQUFPO0FBQ3BCLENBQUEsSUFBSSxLQUFLLEVBQUUsVUFBVTtBQUNyQixDQUFBLElBQUksUUFBUSxFQUFFLFdBQVc7QUFDekIsQ0FBQSxJQUFJLFlBQVksRUFBRSxZQUFZO0FBQzlCLENBQUEsSUFBSSxjQUFjLEVBQUUsY0FBYztBQUNsQyxDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLFVBQVUsRUFBRSxVQUFVLE9BQU8sRUFBRTtBQUNq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QUFXLEVBQUUsVUFBVSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtBQUNqRCxDQUFBLElBQUksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTdILENBQUEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRTtBQUN0RCxDQUFBLE1BQU0sSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQzNCLENBQUEsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2xCLENBQUEsUUFBUSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0UsQ0FBQSxRQUFRLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM1QyxDQUFBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN4QyxDQUFBLFVBQVUsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QyxDQUFBLFVBQVUsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFBLFVBQVUsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNyQyxDQUFBLFVBQVUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM5QyxDQUFBLFVBQVUsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDbEMsQ0FBQSxVQUFVLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxDQUFBLFVBQVUsT0FBTyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEUsQ0FBQSxVQUFVLElBQUksT0FBTyxFQUFFO0FBQ3ZCLENBQUEsWUFBWSxXQUFXLENBQUMsSUFBSSxDQUFDO0FBQzdCLENBQUEsY0FBYyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztBQUNyRSxDQUFBLGNBQWMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUs7QUFDaEUsQ0FBQSxhQUFhLENBQUMsQ0FBQztBQUNmLENBQUEsV0FBVztBQUNYLENBQUEsU0FBUztBQUNULENBQUEsT0FBTztBQUNQLENBQUEsTUFBTSxRQUFRLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQzdDLENBQUEsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2IsQ0FBQSxHQUFHOztBQUVILENBQUEsRUFBRSxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7QUFDbEQsQ0FBQSxJQUFJLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNyQixDQUFBLElBQUksSUFBSSxPQUFPLENBQUM7O0FBRWhCLENBQUEsSUFBSSxJQUFJLEdBQUcsRUFBRTtBQUNiLENBQUEsTUFBTSxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLENBQUEsTUFBTSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLENBQUEsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEUsQ0FBQSxLQUFLLE1BQU07QUFDWCxDQUFBLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckcsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtBQUM1RCxDQUFBLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNsQixDQUFBLFFBQVEsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO0FBQzlCLENBQUEsVUFBVSxRQUFRLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDeEQsQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMzRCxDQUFBLFVBQVUsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QyxDQUFBLFVBQVUsS0FBSyxHQUFHLEtBQUssSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzs7QUFFdkQsQ0FBQSxVQUFVLElBQUksT0FBTyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7QUFD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