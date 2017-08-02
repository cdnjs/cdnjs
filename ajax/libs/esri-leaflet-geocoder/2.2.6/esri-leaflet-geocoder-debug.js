/* esri-leaflet-geocoder - v2.2.6 - Thu Jul 27 2017 16:56:50 GMT-0700 (PDT)
 * Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet'), require('esri-leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet', 'esri-leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Geocoding = global.L.esri.Geocoding || {}),global.L,global.L.esri));
}(this, function (exports,L,esriLeaflet) { 'use strict';

	L = 'default' in L ? L['default'] : L;

	var version = "2.2.6";

	var Geocode = esriLeaflet.Task.extend({
	  path: 'findAddressCandidates',

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
	    'text': 'singleLine',
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
	    if (this.options.customParam) {
	      this.params[this.options.customParam] = this.params.singleLine;
	      delete this.params.singleLine;
	    }

	    return this.request(function (error, response) {
	      var processor = this._processGeocoderResponse;
	      var results = (!error) ? processor(response) : undefined;
	      callback.call(context, error, { results: results }, response);
	    }, this);
	  },

	  _processGeocoderResponse: function (response) {
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
	      // only SOME individual services have been configured to support asking for suggestions
	      if (!response.capabilities) {
	        this.options.supportsSuggest = false;
	      } else if (response.capabilities.indexOf('Suggest') > -1) {
	        this.options.supportsSuggest = true;
	      } else {
	        this.options.supportsSuggest = false;
	      }
	      // whether the service supports suggest or not, utilize the metadata response to determine the appropriate parameter name for single line geocoding requests
	      this.options.customParam = response.singleLineAddressField.name;
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
	    // in the future Address/StreetName geocoding requests that include a magicKey will always only return one match
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
	  includes: L.Evented.prototype,

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
	      var text = (e.target || e.srcElement).value;

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
	          /*
	            if an item has been selected, geocode it
	            if focus is on the input textbox, geocode only if multiple results are allowed and more than two characters are present, or if a single suggestion is displayed.
	            if less than two characters have been typed, abort the geocode
	          */
	          if (selected) {
	            this._geosearchCore._geocode(selected.innerHTML, selected['data-magic-key'], selected.provider);
	            this.clear();
	          } else if (this.options.allowMultipleResults && text.length >= 2) {
	            this._geosearchCore._geocode(this._input.value, undefined);
	            this.clear();
	          } else {
	            if (list.length === 1) {
	              L.DomUtil.addClass(list[0], 'geocoder-control-selected');
	              this._geosearchCore._geocode(list[0].innerHTML, list[0]['data-magic-key'], list[0].provider);
	            } else {
	              this.clear();
	              this._input.blur();
	            }
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

	    if (key) {
	      request.key(key);
	    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvVGFza3MvR2VvY29kZS5qcyIsIi4uL3NyYy9UYXNrcy9SZXZlcnNlR2VvY29kZS5qcyIsIi4uL3NyYy9UYXNrcy9TdWdnZXN0LmpzIiwiLi4vc3JjL1NlcnZpY2VzL0dlb2NvZGUuanMiLCIuLi9zcmMvQ2xhc3Nlcy9HZW9zZWFyY2hDb3JlLmpzIiwiLi4vc3JjL1Byb3ZpZGVycy9BcmNnaXNPbmxpbmVHZW9jb2Rlci5qcyIsIi4uL3NyYy9Db250cm9scy9HZW9zZWFyY2guanMiLCIuLi9zcmMvUHJvdmlkZXJzL0ZlYXR1cmVMYXllci5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvTWFwU2VydmljZS5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvR2VvY29kZVNlcnZpY2UuanMiLCIuLi9zcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXQtZ2VvY29kZXJcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkVzcmkgR2VvY29kaW5nIHV0aWxpdHkgYW5kIHNlYXJjaCBwbHVnaW4gZm9yIExlYWZsZXQuXCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMi42XCIsXG4gIFwiYXV0aG9yXCI6IFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gIFwiY29udHJpYnV0b3JzXCI6IFtcbiAgICBcIlBhdHJpY2sgQXJsdCA8cGFybHRAZXNyaS5jb20+IChodHRwOi8vcGF0cmlja2FybHQuY29tKVwiLFxuICAgIFwiSm9obiBHcmF2b2lzIDxqZ3Jhdm9pc0Blc3JpLmNvbT4gKGh0dHA6Ly9qb2huZ3Jhdm9pcy5jb20pXCJcbiAgXSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZXNyaS1sZWFmbGV0XCI6IFwiXjIuMC4zXCIsXG4gICAgXCJsZWFmbGV0XCI6IFwiXjEuMC4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2hhaVwiOiBcIjMuNS4wXCIsXG4gICAgXCJnaC1yZWxlYXNlXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4wLjguNVwiLFxuICAgIFwiaW1hZ2VtaW5cIjogXCJeMy4yLjBcIixcbiAgICBcImlzcGFydGFcIjogXCJeNC4wLjBcIixcbiAgICBcImlzdGFuYnVsXCI6IFwiXjAuNC4yXCIsXG4gICAgXCJrYXJtYVwiOiBcIl4xLjMuMFwiLFxuICAgIFwia2FybWEtY2hhaS1zaW5vblwiOiBcIl4wLjEuM1wiLFxuICAgIFwia2FybWEtY292ZXJhZ2VcIjogXCJeMS4xLjFcIixcbiAgICBcImthcm1hLW1vY2hhXCI6IFwiXjEuMy4wXCIsXG4gICAgXCJrYXJtYS1tb2NoYS1yZXBvcnRlclwiOiBcIl4yLjIuMVwiLFxuICAgIFwia2FybWEtcGhhbnRvbWpzLWxhdW5jaGVyXCI6IFwiXjAuMi4wXCIsXG4gICAgXCJrYXJtYS1zb3VyY2VtYXAtbG9hZGVyXCI6IFwiXjAuMy41XCIsXG4gICAgXCJta2RpcnBcIjogXCJeMC41LjFcIixcbiAgICBcIm1vY2hhXCI6IFwiXjMuMS4wXCIsXG4gICAgXCJub2RlLXNhc3NcIjogXCJeMy4yLjBcIixcbiAgICBcInBhcmFsbGVsc2hlbGxcIjogXCJeMi4wLjBcIixcbiAgICBcInBoYW50b21qc1wiOiBcIl4xLjkuOFwiLFxuICAgIFwicm9sbHVwXCI6IFwiXjAuMjUuNFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1qc29uXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLW5vZGUtcmVzb2x2ZVwiOiBcIl4xLjQuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi11Z2xpZnlcIjogXCJeMC4zLjFcIixcbiAgICBcInNlbWlzdGFuZGFyZFwiOiBcIl45LjAuMFwiLFxuICAgIFwic2lub25cIjogXCJeMS4xMS4xXCIsXG4gICAgXCJzaW5vbi1jaGFpXCI6IFwiMi44LjBcIixcbiAgICBcInNuYXp6eVwiOiBcIl41LjAuMFwiLFxuICAgIFwidWdsaWZ5LWpzXCI6IFwiXjIuNi4xXCIsXG4gICAgXCJ3YXRjaFwiOiBcIl4wLjE3LjFcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvZXNyaS1sZWFmbGV0LWdlb2NvZGVyXCIsXG4gIFwianNuZXh0Om1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanNcIixcbiAgXCJqc3BtXCI6IHtcbiAgICBcInJlZ2lzdHJ5XCI6IFwibnBtXCIsXG4gICAgXCJmb3JtYXRcIjogXCJlczZcIixcbiAgICBcIm1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanNcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJBcGFjaGUtMi4wXCIsXG4gIFwibWFpblwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzXCIsXG4gIFwiYnJvd3NlclwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzXCIsXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdEBnaXRodWIuY29tOkVzcmkvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLmdpdFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJwcmVidWlsZFwiOiBcIm1rZGlycCBkaXN0XCIsXG4gICAgXCJidWlsZFwiOiBcInJvbGx1cCAtYyBwcm9maWxlcy9kZWJ1Zy5qcyAmIHJvbGx1cCAtYyBwcm9maWxlcy9wcm9kdWN0aW9uLmpzICYgbnBtIHJ1biBjc3MgJiBucG0gcnVuIGltZ1wiLFxuICAgIFwiY3NzXCI6IFwibm9kZS1zYXNzIC4vc3JjL2VzcmktbGVhZmxldC1nZW9jb2Rlci5jc3MgLi9kaXN0L2VzcmktbGVhZmxldC1nZW9jb2Rlci5jc3MgLS1vdXRwdXQtc3R5bGUgY29tcHJlc3NlZFwiLFxuICAgIFwiaW1nXCI6IFwiaW1hZ2VtaW4gLi9zcmMvaW1nIC4vZGlzdC9pbWdcIixcbiAgICBcImxpbnRcIjogXCJzZW1pc3RhbmRhcmQgfCBzbmF6enlcIixcbiAgICBcInByZXB1Ymxpc2hcIjogXCJucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV0ZXN0XCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIi4vc2NyaXB0cy9yZWxlYXNlLnNoXCIsXG4gICAgXCJzdGFydC13YXRjaFwiOiBcIndhdGNoIFxcXCJucG0gcnVuIGJ1aWxkXFxcIiBzcmNcIixcbiAgICBcInN0YXJ0XCI6IFwicGFyYWxsZWxzaGVsbCBcXFwibnBtIHJ1biBzdGFydC13YXRjaFxcXCIgXFxcImh0dHAtc2VydmVyIC1wIDU2NzggLWMtMSAtb1xcXCJcIixcbiAgICBcInRlc3RcIjogXCJucG0gcnVuIGxpbnQgJiYga2FybWEgc3RhcnRcIlxuICB9LFxuICBcInNlbWlzdGFuZGFyZFwiOiB7XG4gICAgXCJnbG9iYWxzXCI6IFsgXCJleHBlY3RcIiwgXCJMXCIsIFwiWE1MSHR0cFJlcXVlc3RcIiwgXCJzaW5vblwiLCBcInhoclwiIF1cbiAgfSxcbiAgXCJzdHlsZVwiOiBcIi4vZGlzdC9lc3JpLWxlYWZsZXQtZ2VvY29kZXIuY3NzXCJcbn1cbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGFzaywgVXRpbCB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5pbXBvcnQgeyBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmwgfSBmcm9tICcuLi9Fc3JpTGVhZmxldEdlb2NvZGluZyc7XG5cbmV4cG9ydCB2YXIgR2VvY29kZSA9IFRhc2suZXh0ZW5kKHtcbiAgcGF0aDogJ2ZpbmRBZGRyZXNzQ2FuZGlkYXRlcycsXG5cbiAgcGFyYW1zOiB7XG4gICAgb3V0U3I6IDQzMjYsXG4gICAgZm9yU3RvcmFnZTogZmFsc2UsXG4gICAgb3V0RmllbGRzOiAnKicsXG4gICAgbWF4TG9jYXRpb25zOiAyMFxuICB9LFxuXG4gIHNldHRlcnM6IHtcbiAgICAnYWRkcmVzcyc6ICdhZGRyZXNzJyxcbiAgICAnbmVpZ2hib3Job29kJzogJ25laWdoYm9yaG9vZCcsXG4gICAgJ2NpdHknOiAnY2l0eScsXG4gICAgJ3N1YnJlZ2lvbic6ICdzdWJyZWdpb24nLFxuICAgICdyZWdpb24nOiAncmVnaW9uJyxcbiAgICAncG9zdGFsJzogJ3Bvc3RhbCcsXG4gICAgJ2NvdW50cnknOiAnY291bnRyeScsXG4gICAgJ3RleHQnOiAnc2luZ2xlTGluZScsXG4gICAgJ2NhdGVnb3J5JzogJ2NhdGVnb3J5JyxcbiAgICAndG9rZW4nOiAndG9rZW4nLFxuICAgICdrZXknOiAnbWFnaWNLZXknLFxuICAgICdmaWVsZHMnOiAnb3V0RmllbGRzJyxcbiAgICAnZm9yU3RvcmFnZSc6ICdmb3JTdG9yYWdlJyxcbiAgICAnbWF4TG9jYXRpb25zJzogJ21heExvY2F0aW9ucydcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMudXJsID0gb3B0aW9ucy51cmwgfHwgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsO1xuICAgIFRhc2sucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICB3aXRoaW46IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhib3VuZHMpO1xuICAgIHRoaXMucGFyYW1zLnNlYXJjaEV4dGVudCA9IFV0aWwuYm91bmRzVG9FeHRlbnQoYm91bmRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBuZWFyYnk6IGZ1bmN0aW9uIChsYXRsbmcsIHJhZGl1cykge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMubG9jYXRpb24gPSBsYXRsbmcubG5nICsgJywnICsgbGF0bG5nLmxhdDtcbiAgICB0aGlzLnBhcmFtcy5kaXN0YW5jZSA9IE1hdGgubWluKE1hdGgubWF4KHJhZGl1cywgMjAwMCksIDUwMDAwKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY3VzdG9tUGFyYW0pIHtcbiAgICAgIHRoaXMucGFyYW1zW3RoaXMub3B0aW9ucy5jdXN0b21QYXJhbV0gPSB0aGlzLnBhcmFtcy5zaW5nbGVMaW5lO1xuICAgICAgZGVsZXRlIHRoaXMucGFyYW1zLnNpbmdsZUxpbmU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcHJvY2Vzc29yID0gdGhpcy5fcHJvY2Vzc0dlb2NvZGVyUmVzcG9uc2U7XG4gICAgICB2YXIgcmVzdWx0cyA9ICghZXJyb3IpID8gcHJvY2Vzc29yKHJlc3BvbnNlKSA6IHVuZGVmaW5lZDtcbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHsgcmVzdWx0czogcmVzdWx0cyB9LCByZXNwb25zZSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX3Byb2Nlc3NHZW9jb2RlclJlc3BvbnNlOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2FuZGlkYXRlID0gcmVzcG9uc2UuY2FuZGlkYXRlc1tpXTtcbiAgICAgIGlmIChjYW5kaWRhdGUuZXh0ZW50KSB7XG4gICAgICAgIHZhciBib3VuZHMgPSBVdGlsLmV4dGVudFRvQm91bmRzKGNhbmRpZGF0ZS5leHRlbnQpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICB0ZXh0OiBjYW5kaWRhdGUuYWRkcmVzcyxcbiAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgIHNjb3JlOiBjYW5kaWRhdGUuc2NvcmUsXG4gICAgICAgIGxhdGxuZzogTC5sYXRMbmcoY2FuZGlkYXRlLmxvY2F0aW9uLnksIGNhbmRpZGF0ZS5sb2NhdGlvbi54KSxcbiAgICAgICAgcHJvcGVydGllczogY2FuZGlkYXRlLmF0dHJpYnV0ZXNcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9jb2RlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgR2VvY29kZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2VvY29kZTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5pbXBvcnQgeyBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmwgfSBmcm9tICcuLi9Fc3JpTGVhZmxldEdlb2NvZGluZyc7XG5cbmV4cG9ydCB2YXIgUmV2ZXJzZUdlb2NvZGUgPSBUYXNrLmV4dGVuZCh7XG4gIHBhdGg6ICdyZXZlcnNlR2VvY29kZScsXG5cbiAgcGFyYW1zOiB7XG4gICAgb3V0U1I6IDQzMjYsXG4gICAgcmV0dXJuSW50ZXJzZWN0aW9uOiBmYWxzZVxuICB9LFxuXG4gIHNldHRlcnM6IHtcbiAgICAnZGlzdGFuY2UnOiAnZGlzdGFuY2UnLFxuICAgICdsYW5ndWFnZSc6ICdsYW5nQ29kZScsXG4gICAgJ2ludGVyc2VjdGlvbic6ICdyZXR1cm5JbnRlcnNlY3Rpb24nXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLnVybCA9IG9wdGlvbnMudXJsIHx8IFdvcmxkR2VvY29kaW5nU2VydmljZVVybDtcbiAgICBUYXNrLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gIH0sXG5cbiAgbGF0bG5nOiBmdW5jdGlvbiAobGF0bG5nKSB7XG4gICAgbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGxhdGxuZy5sbmcgKyAnLCcgKyBsYXRsbmcubGF0O1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICBsYXRsbmc6IEwubGF0TG5nKHJlc3BvbnNlLmxvY2F0aW9uLnksIHJlc3BvbnNlLmxvY2F0aW9uLngpLFxuICAgICAgICAgIGFkZHJlc3M6IHJlc3BvbnNlLmFkZHJlc3NcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzdWx0LCByZXNwb25zZSk7XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZUdlb2NvZGUgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBSZXZlcnNlR2VvY29kZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmV2ZXJzZUdlb2NvZGU7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFRhc2ssIFV0aWwgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuaW1wb3J0IHsgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsIH0gZnJvbSAnLi4vRXNyaUxlYWZsZXRHZW9jb2RpbmcnO1xuXG5leHBvcnQgdmFyIFN1Z2dlc3QgPSBUYXNrLmV4dGVuZCh7XG4gIHBhdGg6ICdzdWdnZXN0JyxcblxuICBwYXJhbXM6IHt9LFxuXG4gIHNldHRlcnM6IHtcbiAgICB0ZXh0OiAndGV4dCcsXG4gICAgY2F0ZWdvcnk6ICdjYXRlZ29yeScsXG4gICAgY291bnRyaWVzOiAnY291bnRyeUNvZGUnLFxuICAgIG1heFN1Z2dlc3Rpb25zOiAnbWF4U3VnZ2VzdGlvbnMnXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoIW9wdGlvbnMudXJsKSB7XG4gICAgICBvcHRpb25zLnVybCA9IFdvcmxkR2VvY29kaW5nU2VydmljZVVybDtcbiAgICAgIG9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0ID0gdHJ1ZTtcbiAgICB9XG4gICAgVGFzay5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIHdpdGhpbjogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKGJvdW5kcyk7XG4gICAgYm91bmRzID0gYm91bmRzLnBhZCgwLjUpO1xuICAgIHZhciBjZW50ZXIgPSBib3VuZHMuZ2V0Q2VudGVyKCk7XG4gICAgdmFyIG5lID0gYm91bmRzLmdldE5vcnRoV2VzdCgpO1xuICAgIHRoaXMucGFyYW1zLmxvY2F0aW9uID0gY2VudGVyLmxuZyArICcsJyArIGNlbnRlci5sYXQ7XG4gICAgdGhpcy5wYXJhbXMuZGlzdGFuY2UgPSBNYXRoLm1pbihNYXRoLm1heChjZW50ZXIuZGlzdGFuY2VUbyhuZSksIDIwMDApLCA1MDAwMCk7XG4gICAgdGhpcy5wYXJhbXMuc2VhcmNoRXh0ZW50ID0gVXRpbC5ib3VuZHNUb0V4dGVudChib3VuZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG5lYXJieTogZnVuY3Rpb24gKGxhdGxuZywgcmFkaXVzKSB7XG4gICAgbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGxhdGxuZy5sbmcgKyAnLCcgKyBsYXRsbmcubGF0O1xuICAgIHRoaXMucGFyYW1zLmRpc3RhbmNlID0gTWF0aC5taW4oTWF0aC5tYXgocmFkaXVzLCAyMDAwKSwgNTAwMDApO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSwgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybigndGhpcyBnZW9jb2Rpbmcgc2VydmljZSBkb2VzIG5vdCBzdXBwb3J0IGFza2luZyBmb3Igc3VnZ2VzdGlvbnMnKTtcbiAgICB9XG4gIH1cblxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWdnZXN0IChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgU3VnZ2VzdChvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3VnZ2VzdDtcbiIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuaW1wb3J0IHsgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsIH0gZnJvbSAnLi4vRXNyaUxlYWZsZXRHZW9jb2RpbmcnO1xuaW1wb3J0IGdlb2NvZGUgZnJvbSAnLi4vVGFza3MvR2VvY29kZSc7XG5pbXBvcnQgcmV2ZXJzZUdlb2NvZGUgZnJvbSAnLi4vVGFza3MvUmV2ZXJzZUdlb2NvZGUnO1xuaW1wb3J0IHN1Z2dlc3QgZnJvbSAnLi4vVGFza3MvU3VnZ2VzdCc7XG5cbmV4cG9ydCB2YXIgR2VvY29kZVNlcnZpY2UgPSBTZXJ2aWNlLmV4dGVuZCh7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKG9wdGlvbnMudXJsKSB7XG4gICAgICBTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICB0aGlzLl9jb25maXJtU3VnZ2VzdFN1cHBvcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy51cmwgPSBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmw7XG4gICAgICBvcHRpb25zLnN1cHBvcnRzU3VnZ2VzdCA9IHRydWU7XG4gICAgICBTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfVxuICB9LFxuXG4gIGdlb2NvZGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2VvY29kZSh0aGlzKTtcbiAgfSxcblxuICByZXZlcnNlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJldmVyc2VHZW9jb2RlKHRoaXMpO1xuICB9LFxuXG4gIHN1Z2dlc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyByZXF1aXJlcyBlaXRoZXIgdGhlIEVzcmkgV29ybGQgR2VvY29kaW5nIFNlcnZpY2Ugb3IgYSA8MTAuMyBBcmNHSVMgU2VydmVyIEdlb2NvZGluZyBTZXJ2aWNlIHRoYXQgc3VwcG9ydHMgc3VnZ2VzdC5cbiAgICByZXR1cm4gc3VnZ2VzdCh0aGlzKTtcbiAgfSxcblxuICBfY29uZmlybVN1Z2dlc3RTdXBwb3J0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5tZXRhZGF0YShmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9XG4gICAgICAvLyBwcmUgMTAuMyBnZW9jb2Rpbmcgc2VydmljZXMgZG9udCBsaXN0IGNhcGFiaWxpdGllcyAoYW5kIGRvbnQgc3VwcG9ydCBtYXhMb2NhdGlvbnMpXG4gICAgICAvLyBvbmx5IFNPTUUgaW5kaXZpZHVhbCBzZXJ2aWNlcyBoYXZlIGJlZW4gY29uZmlndXJlZCB0byBzdXBwb3J0IGFza2luZyBmb3Igc3VnZ2VzdGlvbnNcbiAgICAgIGlmICghcmVzcG9uc2UuY2FwYWJpbGl0aWVzKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuY2FwYWJpbGl0aWVzLmluZGV4T2YoJ1N1Z2dlc3QnKSA+IC0xKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnN1cHBvcnRzU3VnZ2VzdCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gd2hldGhlciB0aGUgc2VydmljZSBzdXBwb3J0cyBzdWdnZXN0IG9yIG5vdCwgdXRpbGl6ZSB0aGUgbWV0YWRhdGEgcmVzcG9uc2UgdG8gZGV0ZXJtaW5lIHRoZSBhcHByb3ByaWF0ZSBwYXJhbWV0ZXIgbmFtZSBmb3Igc2luZ2xlIGxpbmUgZ2VvY29kaW5nIHJlcXVlc3RzXG4gICAgICB0aGlzLm9wdGlvbnMuY3VzdG9tUGFyYW0gPSByZXNwb25zZS5zaW5nbGVMaW5lQWRkcmVzc0ZpZWxkLm5hbWU7XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VvY29kZVNlcnZpY2UgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBHZW9jb2RlU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2VvY29kZVNlcnZpY2U7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcblxuZXhwb3J0IHZhciBHZW9zZWFyY2hDb3JlID0gTC5FdmVudGVkLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIHpvb21Ub1Jlc3VsdDogdHJ1ZSxcbiAgICB1c2VNYXBCb3VuZHM6IDEyLFxuICAgIHNlYXJjaEJvdW5kczogbnVsbFxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChjb250cm9sLCBvcHRpb25zKSB7XG4gICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fY29udHJvbCA9IGNvbnRyb2w7XG5cbiAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMucHJvdmlkZXJzIHx8ICFvcHRpb25zLnByb3ZpZGVycy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc3BlY2lmeSBhdCBsZWFzdCBvbmUgcHJvdmlkZXInKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wcm92aWRlcnMgPSBvcHRpb25zLnByb3ZpZGVycztcbiAgfSxcblxuICBfZ2VvY29kZTogZnVuY3Rpb24gKHRleHQsIGtleSwgcHJvdmlkZXIpIHtcbiAgICB2YXIgYWN0aXZlUmVxdWVzdHMgPSAwO1xuICAgIHZhciBhbGxSZXN1bHRzID0gW107XG4gICAgdmFyIGJvdW5kcztcblxuICAgIHZhciBjYWxsYmFjayA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cykge1xuICAgICAgYWN0aXZlUmVxdWVzdHMtLTtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICAgIGFsbFJlc3VsdHMgPSBhbGxSZXN1bHRzLmNvbmNhdChyZXN1bHRzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RzIDw9IDApIHtcbiAgICAgICAgYm91bmRzID0gdGhpcy5fYm91bmRzRnJvbVJlc3VsdHMoYWxsUmVzdWx0cyk7XG5cbiAgICAgICAgdGhpcy5maXJlKCdyZXN1bHRzJywge1xuICAgICAgICAgIHJlc3VsdHM6IGFsbFJlc3VsdHMsXG4gICAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgICAgbGF0bG5nOiAoYm91bmRzKSA/IGJvdW5kcy5nZXRDZW50ZXIoKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuem9vbVRvUmVzdWx0ICYmIGJvdW5kcykge1xuICAgICAgICAgIHRoaXMuX2NvbnRyb2wuX21hcC5maXRCb3VuZHMoYm91bmRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlyZSgnbG9hZCcpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgYWN0aXZlUmVxdWVzdHMrKztcbiAgICAgIHByb3ZpZGVyLnJlc3VsdHModGV4dCwga2V5LCB0aGlzLl9zZWFyY2hCb3VuZHMoKSwgY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3Byb3ZpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBhY3RpdmVSZXF1ZXN0cysrO1xuICAgICAgICB0aGlzLl9wcm92aWRlcnNbaV0ucmVzdWx0cyh0ZXh0LCBrZXksIHRoaXMuX3NlYXJjaEJvdW5kcygpLCBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9zdWdnZXN0OiBmdW5jdGlvbiAodGV4dCkge1xuICAgIHZhciBhY3RpdmVSZXF1ZXN0cyA9IHRoaXMuX3Byb3ZpZGVycy5sZW5ndGg7XG5cbiAgICB2YXIgY3JlYXRlQ2FsbGJhY2sgPSBMLlV0aWwuYmluZChmdW5jdGlvbiAodGV4dCwgcHJvdmlkZXIpIHtcbiAgICAgIHJldHVybiBMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH1cblxuICAgICAgICB2YXIgaTtcblxuICAgICAgICBhY3RpdmVSZXF1ZXN0cyA9IGFjdGl2ZVJlcXVlc3RzIC0gMTtcblxuICAgICAgICBpZiAodGV4dC5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IHN1Z2dlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzdWdnZXN0aW9uc1tpXS5wcm92aWRlciA9IHByb3ZpZGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB3ZSBzdGlsbCBuZWVkIHRvIHVwZGF0ZSB0aGUgVUlcbiAgICAgICAgICB0aGlzLl9jb250cm9sLl9yZW5kZXJTdWdnZXN0aW9ucyhzdWdnZXN0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvdmlkZXIuX2xhc3RSZW5kZXIgIT09IHRleHQgJiYgcHJvdmlkZXIubm9kZXMpIHtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcHJvdmlkZXIubm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm92aWRlci5ub2Rlc1tpXS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbnRyb2wuX3N1Z2dlc3Rpb25zLnJlbW92ZUNoaWxkKHByb3ZpZGVyLm5vZGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwcm92aWRlci5ub2RlcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN1Z2dlc3Rpb25zLmxlbmd0aCAmJiB0aGlzLl9jb250cm9sLl9pbnB1dC52YWx1ZSA9PT0gdGV4dCkge1xuICAgICAgICAgIHRoaXMuX2NvbnRyb2wuY2xlYXJTdWdnZXN0aW9ucyhwcm92aWRlci5ub2Rlcyk7XG5cbiAgICAgICAgICBwcm92aWRlci5fbGFzdFJlbmRlciA9IHRleHQ7XG4gICAgICAgICAgcHJvdmlkZXIubm9kZXMgPSB0aGlzLl9jb250cm9sLl9yZW5kZXJTdWdnZXN0aW9ucyhzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgdGhpcy5fY29udHJvbC5fbm9kZXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0aGlzLl9wZW5kaW5nU3VnZ2VzdGlvbnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcHJvdmlkZXIgPSB0aGlzLl9wcm92aWRlcnNbaV07XG4gICAgICB2YXIgcmVxdWVzdCA9IHByb3ZpZGVyLnN1Z2dlc3Rpb25zKHRleHQsIHRoaXMuX3NlYXJjaEJvdW5kcygpLCBjcmVhdGVDYWxsYmFjayh0ZXh0LCBwcm92aWRlcikpO1xuICAgICAgdGhpcy5fcGVuZGluZ1N1Z2dlc3Rpb25zLnB1c2gocmVxdWVzdCk7XG4gICAgfVxuICB9LFxuXG4gIF9zZWFyY2hCb3VuZHM6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnNlYXJjaEJvdW5kcyAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zZWFyY2hCb3VuZHM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy51c2VNYXBCb3VuZHMgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZU1hcEJvdW5kcyA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2wuX21hcC5nZXRCb3VuZHMoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZU1hcEJvdW5kcyA8PSB0aGlzLl9jb250cm9sLl9tYXAuZ2V0Wm9vbSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udHJvbC5fbWFwLmdldEJvdW5kcygpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIF9ib3VuZHNGcm9tUmVzdWx0czogZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG51bGxJc2xhbmQgPSBMLmxhdExuZ0JvdW5kcyhbMCwgMF0sIFswLCAwXSk7XG4gICAgdmFyIHJlc3VsdEJvdW5kcyA9IFtdO1xuICAgIHZhciByZXN1bHRMYXRsbmdzID0gW107XG5cbiAgICAvLyBjb2xsZWN0IHRoZSBib3VuZHMgYW5kIGNlbnRlciBvZiBlYWNoIHJlc3VsdFxuICAgIGZvciAodmFyIGkgPSByZXN1bHRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gcmVzdWx0c1tpXTtcblxuICAgICAgcmVzdWx0TGF0bG5ncy5wdXNoKHJlc3VsdC5sYXRsbmcpO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgYm91bmRzIGFyZSB2YWxpZCBhbmQgbm90IDAsMC4gc29tZXRpbWVzIGJvdW5kcyBhcmUgaW5jb3JyZWN0IG9yIG5vdCBwcmVzZW50XG4gICAgICBpZiAocmVzdWx0LmJvdW5kcyAmJiByZXN1bHQuYm91bmRzLmlzVmFsaWQoKSAmJiAhcmVzdWx0LmJvdW5kcy5lcXVhbHMobnVsbElzbGFuZCkpIHtcbiAgICAgICAgcmVzdWx0Qm91bmRzLnB1c2gocmVzdWx0LmJvdW5kcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZm9ybSBhIGJvdW5kcyBvYmplY3QgY29udGFpbmluZyBhbGwgY2VudGVyIHBvaW50c1xuICAgIHZhciBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhyZXN1bHRMYXRsbmdzKTtcblxuICAgIC8vIGFuZCBleHRlbmQgaXQgdG8gY29udGFpbiBhbGwgYm91bmRzIG9iamVjdHNcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlc3VsdEJvdW5kcy5sZW5ndGg7IGorKykge1xuICAgICAgYm91bmRzLmV4dGVuZChyZXN1bHRCb3VuZHNbal0pO1xuICAgIH1cblxuICAgIHJldHVybiBib3VuZHM7XG4gIH0sXG5cbiAgX2dldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGF0dHJpYnMgPSBbXTtcbiAgICB2YXIgcHJvdmlkZXJzID0gdGhpcy5fcHJvdmlkZXJzO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwcm92aWRlcnNbaV0ub3B0aW9ucy5hdHRyaWJ1dGlvbikge1xuICAgICAgICBhdHRyaWJzLnB1c2gocHJvdmlkZXJzW2ldLm9wdGlvbnMuYXR0cmlidXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhdHRyaWJzLmpvaW4oJywgJyk7XG4gIH1cblxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9zZWFyY2hDb3JlIChjb250cm9sLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgR2Vvc2VhcmNoQ29yZShjb250cm9sLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2Vvc2VhcmNoQ29yZTtcbiIsImltcG9ydCB7IEdlb2NvZGVTZXJ2aWNlIH0gZnJvbSAnLi4vU2VydmljZXMvR2VvY29kZSc7XG5cbmV4cG9ydCB2YXIgQXJjZ2lzT25saW5lUHJvdmlkZXIgPSBHZW9jb2RlU2VydmljZS5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgbGFiZWw6ICdQbGFjZXMgYW5kIEFkZHJlc3NlcycsXG4gICAgbWF4UmVzdWx0czogNVxuICB9LFxuXG4gIHN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAodGV4dCwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciByZXF1ZXN0ID0gdGhpcy5zdWdnZXN0KCkudGV4dCh0ZXh0KTtcblxuICAgIGlmIChib3VuZHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aGluKGJvdW5kcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb3VudHJpZXMpIHtcbiAgICAgIHJlcXVlc3QuY291bnRyaWVzKHRoaXMub3B0aW9ucy5jb3VudHJpZXMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2F0ZWdvcmllcykge1xuICAgICAgcmVxdWVzdC5jYXRlZ29yeSh0aGlzLm9wdGlvbnMuY2F0ZWdvcmllcyk7XG4gICAgfVxuXG4gICAgLy8gMTUgaXMgdGhlIG1heGltdW0gbnVtYmVyIG9mIHN1Z2dlc3Rpb25zIHRoYXQgY2FuIGJlIHJldHVybmVkXG4gICAgcmVxdWVzdC5tYXhTdWdnZXN0aW9ucyh0aGlzLm9wdGlvbnMubWF4UmVzdWx0cyk7XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXN1bHRzLCByZXNwb25zZSkge1xuICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gW107XG4gICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgIHdoaWxlIChyZXNwb25zZS5zdWdnZXN0aW9ucy5sZW5ndGggJiYgc3VnZ2VzdGlvbnMubGVuZ3RoIDw9ICh0aGlzLm9wdGlvbnMubWF4UmVzdWx0cyAtIDEpKSB7XG4gICAgICAgICAgdmFyIHN1Z2dlc3Rpb24gPSByZXNwb25zZS5zdWdnZXN0aW9ucy5zaGlmdCgpO1xuICAgICAgICAgIGlmICghc3VnZ2VzdGlvbi5pc0NvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgICB0ZXh0OiBzdWdnZXN0aW9uLnRleHQsXG4gICAgICAgICAgICAgIG1hZ2ljS2V5OiBzdWdnZXN0aW9uLm1hZ2ljS2V5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKGVycm9yLCBzdWdnZXN0aW9ucyk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgcmVzdWx0czogZnVuY3Rpb24gKHRleHQsIGtleSwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciByZXF1ZXN0ID0gdGhpcy5nZW9jb2RlKCkudGV4dCh0ZXh0KTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIHJlcXVlc3Qua2V5KGtleSk7XG4gICAgfVxuICAgIC8vIGluIHRoZSBmdXR1cmUgQWRkcmVzcy9TdHJlZXROYW1lIGdlb2NvZGluZyByZXF1ZXN0cyB0aGF0IGluY2x1ZGUgYSBtYWdpY0tleSB3aWxsIGFsd2F5cyBvbmx5IHJldHVybiBvbmUgbWF0Y2hcbiAgICByZXF1ZXN0Lm1heExvY2F0aW9ucyh0aGlzLm9wdGlvbnMubWF4UmVzdWx0cyk7XG5cbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICByZXF1ZXN0LndpdGhpbihib3VuZHMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZm9yU3RvcmFnZSkge1xuICAgICAgcmVxdWVzdC5mb3JTdG9yYWdlKHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UucmVzdWx0cyk7XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gYXJjZ2lzT25saW5lUHJvdmlkZXIgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBBcmNnaXNPbmxpbmVQcm92aWRlcihvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJjZ2lzT25saW5lUHJvdmlkZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGdlb3NlYXJjaENvcmUgfSBmcm9tICcuLi9DbGFzc2VzL0dlb3NlYXJjaENvcmUnO1xuaW1wb3J0IHsgYXJjZ2lzT25saW5lUHJvdmlkZXIgfSBmcm9tICcuLi9Qcm92aWRlcnMvQXJjZ2lzT25saW5lR2VvY29kZXInO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5cbmV4cG9ydCB2YXIgR2Vvc2VhcmNoID0gTC5Db250cm9sLmV4dGVuZCh7XG4gIGluY2x1ZGVzOiBMLkV2ZW50ZWQucHJvdG90eXBlLFxuXG4gIG9wdGlvbnM6IHtcbiAgICBwb3NpdGlvbjogJ3RvcGxlZnQnLFxuICAgIGNvbGxhcHNlQWZ0ZXJSZXN1bHQ6IHRydWUsXG4gICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgIGFsbG93TXVsdGlwbGVSZXN1bHRzOiB0cnVlLFxuICAgIHBsYWNlaG9sZGVyOiAnU2VhcmNoIGZvciBwbGFjZXMgb3IgYWRkcmVzc2VzJyxcbiAgICB0aXRsZTogJ0xvY2F0aW9uIFNlYXJjaCdcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgaWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLnByb3ZpZGVycyB8fCAhb3B0aW9ucy5wcm92aWRlcnMubGVuZ3RoKSB7XG4gICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuICAgICAgb3B0aW9ucy5wcm92aWRlcnMgPSBbIGFyY2dpc09ubGluZVByb3ZpZGVyKCkgXTtcbiAgICB9XG5cbiAgICAvLyBpbnN0YW50aWF0ZSB0aGUgdW5kZXJseWluZyBjbGFzcyBhbmQgcGFzcyBhbG9uZyBvcHRpb25zXG4gICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZSA9IGdlb3NlYXJjaENvcmUodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcHJvdmlkZXJzID0gb3B0aW9ucy5wcm92aWRlcnM7XG5cbiAgICAvLyBidWJibGUgZWFjaCBwcm92aWRlcnMgZXZlbnRzIHRvIHRoZSBjb250cm9sXG4gICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2dlb3NlYXJjaENvcmUuX3Byb3ZpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcHJvdmlkZXJzW2ldLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX3BlbmRpbmdTdWdnZXN0aW9ucyA9IFtdO1xuXG4gICAgTC5Db250cm9sLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwob3B0aW9ucyk7XG4gIH0sXG5cbiAgX3JlbmRlclN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAoc3VnZ2VzdGlvbnMpIHtcbiAgICB2YXIgY3VycmVudEdyb3VwO1xuXG4gICAgaWYgKHN1Z2dlc3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cbiAgICAvLyBzZXQgdGhlIG1heEhlaWdodCBvZiB0aGUgc3VnZ2VzdGlvbnMgYm94IHRvXG4gICAgLy8gbWFwIGhlaWdodFxuICAgIC8vIC0gc3VnZ2VzdGlvbnMgb2Zmc2V0IChkaXN0YW5jZSBmcm9tIHRvcCBvZiBzdWdnZXN0aW9ucyB0byB0b3Agb2YgY29udHJvbClcbiAgICAvLyAtIGNvbnRyb2wgb2Zmc2V0IChkaXN0YW5jZSBmcm9tIHRvcCBvZiBjb250cm9sIHRvIHRvcCBvZiBtYXApXG4gICAgLy8gLSAxMCAoZXh0cmEgcGFkZGluZylcbiAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5tYXhIZWlnaHQgPSAodGhpcy5fbWFwLmdldFNpemUoKS55IC0gdGhpcy5fc3VnZ2VzdGlvbnMub2Zmc2V0VG9wIC0gdGhpcy5fd3JhcHBlci5vZmZzZXRUb3AgLSAxMCkgKyAncHgnO1xuXG4gICAgdmFyIG5vZGVzID0gW107XG4gICAgdmFyIGxpc3Q7XG4gICAgdmFyIGhlYWRlcjtcbiAgICB2YXIgc3VnZ2VzdGlvblRleHRBcnJheSA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWdnZXN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHN1Z2dlc3Rpb24gPSBzdWdnZXN0aW9uc1tpXTtcbiAgICAgIGlmICghaGVhZGVyICYmIHRoaXMuX2dlb3NlYXJjaENvcmUuX3Byb3ZpZGVycy5sZW5ndGggPiAxICYmIGN1cnJlbnRHcm91cCAhPT0gc3VnZ2VzdGlvbi5wcm92aWRlci5vcHRpb25zLmxhYmVsKSB7XG4gICAgICAgIGhlYWRlciA9IEwuRG9tVXRpbC5jcmVhdGUoJ3NwYW4nLCAnZ2VvY29kZXItY29udHJvbC1oZWFkZXInLCB0aGlzLl9zdWdnZXN0aW9ucyk7XG4gICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IHN1Z2dlc3Rpb24ucHJvdmlkZXIub3B0aW9ucy5sYWJlbDtcbiAgICAgICAgaGVhZGVyLmlubmVyVGV4dCA9IHN1Z2dlc3Rpb24ucHJvdmlkZXIub3B0aW9ucy5sYWJlbDtcbiAgICAgICAgY3VycmVudEdyb3VwID0gc3VnZ2VzdGlvbi5wcm92aWRlci5vcHRpb25zLmxhYmVsO1xuICAgICAgICBub2Rlcy5wdXNoKGhlYWRlcik7XG4gICAgICB9XG5cbiAgICAgIGlmICghbGlzdCkge1xuICAgICAgICBsaXN0ID0gTC5Eb21VdGlsLmNyZWF0ZSgndWwnLCAnZ2VvY29kZXItY29udHJvbC1saXN0JywgdGhpcy5fc3VnZ2VzdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3VnZ2VzdGlvblRleHRBcnJheS5pbmRleE9mKHN1Z2dlc3Rpb24udGV4dCkgPT09IC0xKSB7XG4gICAgICAgIHZhciBzdWdnZXN0aW9uSXRlbSA9IEwuRG9tVXRpbC5jcmVhdGUoJ2xpJywgJ2dlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbicsIGxpc3QpO1xuXG4gICAgICAgIHN1Z2dlc3Rpb25JdGVtLmlubmVySFRNTCA9IHN1Z2dlc3Rpb24udGV4dDtcbiAgICAgICAgc3VnZ2VzdGlvbkl0ZW0ucHJvdmlkZXIgPSBzdWdnZXN0aW9uLnByb3ZpZGVyO1xuICAgICAgICBzdWdnZXN0aW9uSXRlbVsnZGF0YS1tYWdpYy1rZXknXSA9IHN1Z2dlc3Rpb24ubWFnaWNLZXk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxpc3QuY2hpbGROb2Rlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIC8vIGlmIHRoZSBzYW1lIHRleHQgYWxyZWFkeSBhcHBlYXJzIGluIHRoZSBsaXN0IG9mIHN1Z2dlc3Rpb25zLCBhcHBlbmQgYW4gYWRkaXRpb25hbCBPYmplY3RJRCB0byBpdHMgbWFnaWNLZXkgaW5zdGVhZFxuICAgICAgICAgIGlmIChsaXN0LmNoaWxkTm9kZXNbal0uaW5uZXJIVE1MID09PSBzdWdnZXN0aW9uLnRleHQpIHtcbiAgICAgICAgICAgIGxpc3QuY2hpbGROb2Rlc1tqXVsnZGF0YS1tYWdpYy1rZXknXSArPSAnLCcgKyBzdWdnZXN0aW9uLm1hZ2ljS2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc3VnZ2VzdGlvblRleHRBcnJheS5wdXNoKHN1Z2dlc3Rpb24udGV4dCk7XG4gICAgfVxuXG4gICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1sb2FkaW5nJyk7XG5cbiAgICBub2Rlcy5wdXNoKGxpc3QpO1xuXG4gICAgcmV0dXJuIG5vZGVzO1xuICB9LFxuXG4gIF9ib3VuZHNGcm9tUmVzdWx0czogZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG51bGxJc2xhbmQgPSBMLmxhdExuZ0JvdW5kcyhbMCwgMF0sIFswLCAwXSk7XG4gICAgdmFyIHJlc3VsdEJvdW5kcyA9IFtdO1xuICAgIHZhciByZXN1bHRMYXRsbmdzID0gW107XG5cbiAgICAvLyBjb2xsZWN0IHRoZSBib3VuZHMgYW5kIGNlbnRlciBvZiBlYWNoIHJlc3VsdFxuICAgIGZvciAodmFyIGkgPSByZXN1bHRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gcmVzdWx0c1tpXTtcblxuICAgICAgcmVzdWx0TGF0bG5ncy5wdXNoKHJlc3VsdC5sYXRsbmcpO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgYm91bmRzIGFyZSB2YWxpZCBhbmQgbm90IDAsMC4gc29tZXRpbWVzIGJvdW5kcyBhcmUgaW5jb3JyZWN0IG9yIG5vdCBwcmVzZW50XG4gICAgICBpZiAocmVzdWx0LmJvdW5kcyAmJiByZXN1bHQuYm91bmRzLmlzVmFsaWQoKSAmJiAhcmVzdWx0LmJvdW5kcy5lcXVhbHMobnVsbElzbGFuZCkpIHtcbiAgICAgICAgcmVzdWx0Qm91bmRzLnB1c2gocmVzdWx0LmJvdW5kcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZm9ybSBhIGJvdW5kcyBvYmplY3QgY29udGFpbmluZyBhbGwgY2VudGVyIHBvaW50c1xuICAgIHZhciBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhyZXN1bHRMYXRsbmdzKTtcblxuICAgIC8vIGFuZCBleHRlbmQgaXQgdG8gY29udGFpbiBhbGwgYm91bmRzIG9iamVjdHNcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlc3VsdEJvdW5kcy5sZW5ndGg7IGorKykge1xuICAgICAgYm91bmRzLmV4dGVuZChyZXN1bHRCb3VuZHNbal0pO1xuICAgIH1cblxuICAgIHJldHVybiBib3VuZHM7XG4gIH0sXG5cbiAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9zdWdnZXN0aW9ucy5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRoaXMuX2lucHV0LnZhbHVlID0gJyc7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbGxhcHNlQWZ0ZXJSZXN1bHQpIHtcbiAgICAgIHRoaXMuX2lucHV0LnBsYWNlaG9sZGVyID0gJyc7XG4gICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fd3JhcHBlciwgJ2dlb2NvZGVyLWNvbnRyb2wtZXhwYW5kZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX21hcC5zY3JvbGxXaGVlbFpvb20uZW5hYmxlZCgpICYmIHRoaXMuX21hcC5vcHRpb25zLnNjcm9sbFdoZWVsWm9vbSkge1xuICAgICAgdGhpcy5fbWFwLnNjcm9sbFdoZWVsWm9vbS5lbmFibGUoKTtcbiAgICB9XG4gIH0sXG5cbiAgY2xlYXJTdWdnZXN0aW9uczogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9ub2Rlcykge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLl9ub2Rlcy5sZW5ndGg7IGsrKykge1xuICAgICAgICBpZiAodGhpcy5fbm9kZXNba10ucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnJlbW92ZUNoaWxkKHRoaXMuX25vZGVzW2tdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfc2V0dXBDbGljazogZnVuY3Rpb24gKCkge1xuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl93cmFwcGVyLCAnZ2VvY29kZXItY29udHJvbC1leHBhbmRlZCcpO1xuICAgIHRoaXMuX2lucHV0LmZvY3VzKCk7XG4gIH0sXG5cbiAgZGlzYWJsZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2lucHV0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWlucHV0LWRpc2FibGVkJyk7XG4gICAgTC5Eb21FdmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLl93cmFwcGVyLCAnY2xpY2snLCB0aGlzLl9zZXR1cENsaWNrLCB0aGlzKTtcbiAgfSxcblxuICBlbmFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9pbnB1dC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9pbnB1dCwgJ2dlb2NvZGVyLWNvbnRyb2wtaW5wdXQtZGlzYWJsZWQnKTtcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX3dyYXBwZXIsICdjbGljaycsIHRoaXMuX3NldHVwQ2xpY2ssIHRoaXMpO1xuICB9LFxuXG4gIGdldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGF0dHJpYnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5fcHJvdmlkZXJzW2ldLm9wdGlvbnMuYXR0cmlidXRpb24pIHtcbiAgICAgICAgYXR0cmlicy5wdXNoKHRoaXMuX3Byb3ZpZGVyc1tpXS5vcHRpb25zLmF0dHJpYnV0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXR0cmlicy5qb2luKCcsICcpO1xuICB9LFxuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgLy8gaW5jbHVkZSAnUG93ZXJlZCBieSBFc3JpJyBpbiBtYXAgYXR0cmlidXRpb25cbiAgICBVdGlsLnNldEVzcmlBdHRyaWJ1dGlvbihtYXApO1xuXG4gICAgdGhpcy5fbWFwID0gbWFwO1xuICAgIHRoaXMuX3dyYXBwZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnZ2VvY29kZXItY29udHJvbCcpO1xuICAgIHRoaXMuX2lucHV0ID0gTC5Eb21VdGlsLmNyZWF0ZSgnaW5wdXQnLCAnZ2VvY29kZXItY29udHJvbC1pbnB1dCBsZWFmbGV0LWJhcicsIHRoaXMuX3dyYXBwZXIpO1xuICAgIHRoaXMuX2lucHV0LnRpdGxlID0gdGhpcy5vcHRpb25zLnRpdGxlO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5leHBhbmRlZCkge1xuICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XG4gICAgICB0aGlzLl9pbnB1dC5wbGFjZWhvbGRlciA9IHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICB0aGlzLl9zdWdnZXN0aW9ucyA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdnZW9jb2Rlci1jb250cm9sLXN1Z2dlc3Rpb25zIGxlYWZsZXQtYmFyJywgdGhpcy5fd3JhcHBlcik7XG5cbiAgICB2YXIgY3JlZGl0cyA9IHRoaXMuX2dlb3NlYXJjaENvcmUuX2dldEF0dHJpYnV0aW9uKCk7XG4gICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5hZGRBdHRyaWJ1dGlvbihjcmVkaXRzKTtcblxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5faW5wdXQsICdmb2N1cycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICB0aGlzLl9pbnB1dC5wbGFjZWhvbGRlciA9IHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlcjtcbiAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl93cmFwcGVyLCAnZ2VvY29kZXItY29udHJvbC1leHBhbmRlZCcpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl93cmFwcGVyLCAnY2xpY2snLCB0aGlzLl9zZXR1cENsaWNrLCB0aGlzKTtcblxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fc3VnZ2VzdGlvbnMsICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIHN1Z2dlc3Rpb25JdGVtID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fZ2VvY29kZShzdWdnZXN0aW9uSXRlbS5pbm5lckhUTUwsIHN1Z2dlc3Rpb25JdGVtWydkYXRhLW1hZ2ljLWtleSddLCBzdWdnZXN0aW9uSXRlbS5wcm92aWRlcik7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX2lucHV0LCAnYmx1cicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgdGV4dCA9IChlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQpLnZhbHVlO1xuXG4gICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fd3JhcHBlciwgJ2dlb2NvZGVyLWNvbnRyb2wtZXhwYW5kZWQnKTtcblxuICAgICAgdmFyIGxpc3QgPSB0aGlzLl9zdWdnZXN0aW9ucy5xdWVyeVNlbGVjdG9yQWxsKCcuJyArICdnZW9jb2Rlci1jb250cm9sLXN1Z2dlc3Rpb24nKTtcbiAgICAgIHZhciBzZWxlY3RlZCA9IHRoaXMuX3N1Z2dlc3Rpb25zLnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKVswXTtcbiAgICAgIHZhciBzZWxlY3RlZFBvc2l0aW9uO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxpc3RbaV0gPT09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgc2VsZWN0ZWRQb3NpdGlvbiA9IGk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAvKlxuICAgICAgICAgICAgaWYgYW4gaXRlbSBoYXMgYmVlbiBzZWxlY3RlZCwgZ2VvY29kZSBpdFxuICAgICAgICAgICAgaWYgZm9jdXMgaXMgb24gdGhlIGlucHV0IHRleHRib3gsIGdlb2NvZGUgb25seSBpZiBtdWx0aXBsZSByZXN1bHRzIGFyZSBhbGxvd2VkIGFuZCBtb3JlIHRoYW4gdHdvIGNoYXJhY3RlcnMgYXJlIHByZXNlbnQsIG9yIGlmIGEgc2luZ2xlIHN1Z2dlc3Rpb24gaXMgZGlzcGxheWVkLlxuICAgICAgICAgICAgaWYgbGVzcyB0aGFuIHR3byBjaGFyYWN0ZXJzIGhhdmUgYmVlbiB0eXBlZCwgYWJvcnQgdGhlIGdlb2NvZGVcbiAgICAgICAgICAqL1xuICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fZ2VvY29kZShzZWxlY3RlZC5pbm5lckhUTUwsIHNlbGVjdGVkWydkYXRhLW1hZ2ljLWtleSddLCBzZWxlY3RlZC5wcm92aWRlcik7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dNdWx0aXBsZVJlc3VsdHMgJiYgdGV4dC5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fZ2VvY29kZSh0aGlzLl9pbnB1dC52YWx1ZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhsaXN0WzBdLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9nZW9jb2RlKGxpc3RbMF0uaW5uZXJIVE1MLCBsaXN0WzBdWydkYXRhLW1hZ2ljLWtleSddLCBsaXN0WzBdLnByb3ZpZGVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgdGhpcy5faW5wdXQuYmx1cigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHNlbGVjdGVkLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBwcmV2aW91c0l0ZW0gPSBsaXN0W3NlbGVjdGVkUG9zaXRpb24gLSAxXTtcblxuICAgICAgICAgIGlmIChzZWxlY3RlZCAmJiBwcmV2aW91c0l0ZW0pIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhwcmV2aW91c0l0ZW0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhsaXN0W2xpc3QubGVuZ3RoIC0gMV0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3Moc2VsZWN0ZWQsICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG5leHRJdGVtID0gbGlzdFtzZWxlY3RlZFBvc2l0aW9uICsgMV07XG5cbiAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgbmV4dEl0ZW0pIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhuZXh0SXRlbSwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKGxpc3RbMF0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gd2hlbiB0aGUgaW5wdXQgY2hhbmdlcyB3ZSBzaG91bGQgY2FuY2VsIGFsbCBwZW5kaW5nIHN1Z2dlc3Rpb24gcmVxdWVzdHMgaWYgcG9zc2libGUgdG8gYXZvaWQgcmVzdWx0IGNvbGxpc2lvbnNcbiAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHRoaXMuX2dlb3NlYXJjaENvcmUuX3BlbmRpbmdTdWdnZXN0aW9ucy5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wZW5kaW5nU3VnZ2VzdGlvbnNbeF07XG4gICAgICAgICAgICBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LmFib3J0ICYmICFyZXF1ZXN0LmlkKSB7XG4gICAgICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX2lucHV0LCAna2V5dXAnLCBMLlV0aWwudGhyb3R0bGUoZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICAgIHZhciB0ZXh0ID0gKGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCkudmFsdWU7XG5cbiAgICAgIC8vIHJlcXVpcmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzIGZvciBzdWdnZXN0aW9uc1xuICAgICAgaWYgKHRleHQubGVuZ3RoIDwgMikge1xuICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1sb2FkaW5nJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhpcyBpcyB0aGUgZXNjYXBlIGtleSBpdCB3aWxsIGNsZWFyIHRoZSBpbnB1dCBzbyBjbGVhciBzdWdnZXN0aW9uc1xuICAgICAgaWYgKGtleSA9PT0gMjcpIHtcbiAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhpcyBpcyBOT1QgdGhlIHVwL2Rvd24gYXJyb3dzIG9yIGVudGVyIG1ha2UgYSBzdWdnZXN0aW9uXG4gICAgICBpZiAoa2V5ICE9PSAxMyAmJiBrZXkgIT09IDM4ICYmIGtleSAhPT0gNDApIHtcbiAgICAgICAgaWYgKHRoaXMuX2lucHV0LnZhbHVlICE9PSB0aGlzLl9sYXN0VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl9sYXN0VmFsdWUgPSB0aGlzLl9pbnB1dC52YWx1ZTtcbiAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWxvYWRpbmcnKTtcbiAgICAgICAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9zdWdnZXN0KHRleHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgNTAsIHRoaXMpLCB0aGlzKTtcblxuICAgIEwuRG9tRXZlbnQuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24odGhpcy5fd3JhcHBlcik7XG5cbiAgICAvLyB3aGVuIG1vdXNlIG1vdmVzIG92ZXIgc3VnZ2VzdGlvbnMgZGlzYWJsZSBzY3JvbGwgd2hlZWwgem9vbSBpZiBpdHMgZW5hYmxlZFxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fc3VnZ2VzdGlvbnMsICdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKG1hcC5zY3JvbGxXaGVlbFpvb20uZW5hYmxlZCgpICYmIG1hcC5vcHRpb25zLnNjcm9sbFdoZWVsWm9vbSkge1xuICAgICAgICBtYXAuc2Nyb2xsV2hlZWxab29tLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHdoZW4gbW91c2UgbW92ZXMgbGVhdmVzIHN1Z2dlc3Rpb25zIGVuYWJsZSBzY3JvbGwgd2hlZWwgem9vbSBpZiBpdHMgZGlzYWJsZWRcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX3N1Z2dlc3Rpb25zLCAnbW91c2VvdXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKCFtYXAuc2Nyb2xsV2hlZWxab29tLmVuYWJsZWQoKSAmJiBtYXAub3B0aW9ucy5zY3JvbGxXaGVlbFpvb20pIHtcbiAgICAgICAgbWFwLnNjcm9sbFdoZWVsWm9vbS5lbmFibGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUub24oJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1sb2FkaW5nJyk7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLl9pbnB1dC5ibHVyKCk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICByZXR1cm4gdGhpcy5fd3JhcHBlcjtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9zZWFyY2ggKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBHZW9zZWFyY2gob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlb3NlYXJjaDtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgRmVhdHVyZUxheWVyU2VydmljZSB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5cbmV4cG9ydCB2YXIgRmVhdHVyZUxheWVyUHJvdmlkZXIgPSBGZWF0dXJlTGF5ZXJTZXJ2aWNlLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBsYWJlbDogJ0ZlYXR1cmUgTGF5ZXInLFxuICAgIG1heFJlc3VsdHM6IDUsXG4gICAgYnVmZmVyUmFkaXVzOiAxMDAwLFxuICAgIGZvcm1hdFN1Z2dlc3Rpb246IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICByZXR1cm4gZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHNbMF1dO1xuICAgIH1cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIEZlYXR1cmVMYXllclNlcnZpY2UucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzID0gW3RoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHNdO1xuICAgIH1cbiAgICB0aGlzLl9zdWdnZXN0aW9uc1F1ZXJ5ID0gdGhpcy5xdWVyeSgpO1xuICAgIHRoaXMuX3Jlc3VsdHNRdWVyeSA9IHRoaXMucXVlcnkoKTtcbiAgfSxcblxuICBzdWdnZXN0aW9uczogZnVuY3Rpb24gKHRleHQsIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLl9zdWdnZXN0aW9uc1F1ZXJ5LndoZXJlKHRoaXMuX2J1aWxkUXVlcnkodGV4dCkpXG4gICAgICAucmV0dXJuR2VvbWV0cnkoZmFsc2UpO1xuXG4gICAgaWYgKGJvdW5kcykge1xuICAgICAgcXVlcnkuaW50ZXJzZWN0cyhib3VuZHMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuaWRGaWVsZCkge1xuICAgICAgcXVlcnkuZmllbGRzKFt0aGlzLm9wdGlvbnMuaWRGaWVsZF0uY29uY2F0KHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMpKTtcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IHF1ZXJ5LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJhdykge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBbXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wdGlvbnMuaWRGaWVsZCA9IHJhdy5vYmplY3RJZEZpZWxkTmFtZTtcbiAgICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSByZXN1bHRzLmZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdmFyIGZlYXR1cmUgPSByZXN1bHRzLmZlYXR1cmVzW2ldO1xuICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgdGV4dDogdGhpcy5vcHRpb25zLmZvcm1hdFN1Z2dlc3Rpb24uY2FsbCh0aGlzLCBmZWF0dXJlKSxcbiAgICAgICAgICAgIG1hZ2ljS2V5OiBmZWF0dXJlLmlkXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIHN1Z2dlc3Rpb25zLnNsaWNlKDAsIHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzKSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfSxcblxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdGhpcy5fcmVzdWx0c1F1ZXJ5O1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgZGVsZXRlIHF1ZXJ5LnBhcmFtcy53aGVyZTtcbiAgICAgIHF1ZXJ5LmZlYXR1cmVJZHMoW2tleV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBxdWVyeS53aGVyZSh0aGlzLl9idWlsZFF1ZXJ5KHRleHQpKTtcbiAgICB9XG5cbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICBxdWVyeS53aXRoaW4oYm91bmRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcXVlcnkucnVuKEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgZmVhdHVyZXMpIHtcbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZlYXR1cmVzLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBmZWF0dXJlID0gZmVhdHVyZXMuZmVhdHVyZXNbaV07XG4gICAgICAgIGlmIChmZWF0dXJlKSB7XG4gICAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuX2ZlYXR1cmVCb3VuZHMoZmVhdHVyZSk7XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgbGF0bG5nOiBib3VuZHMuZ2V0Q2VudGVyKCksXG4gICAgICAgICAgICBib3VuZHM6IGJvdW5kcyxcbiAgICAgICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5mb3JtYXRTdWdnZXN0aW9uLmNhbGwodGhpcywgZmVhdHVyZSksXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBmZWF0dXJlLnByb3BlcnRpZXMsXG4gICAgICAgICAgICBnZW9qc29uOiBmZWF0dXJlXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuXG4gICAgICAgICAgLy8gY2xlYXIgcXVlcnkgcGFyYW1ldGVycyBmb3IgdGhlIG5leHQgc2VhcmNoXG4gICAgICAgICAgZGVsZXRlIHRoaXMuX3Jlc3VsdHNRdWVyeS5wYXJhbXNbJ29iamVjdElkcyddO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzdWx0cyk7XG4gICAgfSwgdGhpcykpO1xuICB9LFxuXG4gIG9yZGVyQnk6IGZ1bmN0aW9uIChmaWVsZE5hbWUsIG9yZGVyKSB7XG4gICAgdGhpcy5fc3VnZ2VzdGlvbnNRdWVyeS5vcmRlckJ5KGZpZWxkTmFtZSwgb3JkZXIpO1xuICB9LFxuXG4gIF9idWlsZFF1ZXJ5OiBmdW5jdGlvbiAodGV4dCkge1xuICAgIHZhciBxdWVyeVN0cmluZyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmaWVsZCA9ICd1cHBlcihcIicgKyB0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzW2ldICsgJ1wiKSc7XG5cbiAgICAgIHF1ZXJ5U3RyaW5nLnB1c2goZmllbGQgKyBcIiBMSUtFIHVwcGVyKCclXCIgKyB0ZXh0ICsgXCIlJylcIik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy53aGVyZSkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy53aGVyZSArICcgQU5EICgnICsgcXVlcnlTdHJpbmcuam9pbignIE9SICcpICsgJyknO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcXVlcnlTdHJpbmcuam9pbignIE9SICcpO1xuICAgIH1cbiAgfSxcblxuICBfZmVhdHVyZUJvdW5kczogZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICB2YXIgZ2VvanNvbiA9IEwuZ2VvSnNvbihmZWF0dXJlKTtcbiAgICBpZiAoZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICB2YXIgY2VudGVyID0gZ2VvanNvbi5nZXRCb3VuZHMoKS5nZXRDZW50ZXIoKTtcbiAgICAgIHZhciBsbmdSYWRpdXMgPSAoKHRoaXMub3B0aW9ucy5idWZmZXJSYWRpdXMgLyA0MDA3NTAxNykgKiAzNjApIC8gTWF0aC5jb3MoKDE4MCAvIE1hdGguUEkpICogY2VudGVyLmxhdCk7XG4gICAgICB2YXIgbGF0UmFkaXVzID0gKHRoaXMub3B0aW9ucy5idWZmZXJSYWRpdXMgLyA0MDA3NTAxNykgKiAzNjA7XG4gICAgICByZXR1cm4gTC5sYXRMbmdCb3VuZHMoW2NlbnRlci5sYXQgLSBsYXRSYWRpdXMsIGNlbnRlci5sbmcgLSBsbmdSYWRpdXNdLCBbY2VudGVyLmxhdCArIGxhdFJhZGl1cywgY2VudGVyLmxuZyArIGxuZ1JhZGl1c10pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZ2VvanNvbi5nZXRCb3VuZHMoKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZUxheWVyUHJvdmlkZXIgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBGZWF0dXJlTGF5ZXJQcm92aWRlcihvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmVhdHVyZUxheWVyUHJvdmlkZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuXG5leHBvcnQgdmFyIE1hcFNlcnZpY2VQcm92aWRlciA9IE1hcFNlcnZpY2UuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIGxheWVyczogWzBdLFxuICAgIGxhYmVsOiAnTWFwIFNlcnZpY2UnLFxuICAgIGJ1ZmZlclJhZGl1czogMTAwMCxcbiAgICBtYXhSZXN1bHRzOiA1LFxuICAgIGZvcm1hdFN1Z2dlc3Rpb246IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICByZXR1cm4gZmVhdHVyZS5wcm9wZXJ0aWVzW2ZlYXR1cmUuZGlzcGxheUZpZWxkTmFtZV0gKyAnIDxzbWFsbD4nICsgZmVhdHVyZS5sYXllck5hbWUgKyAnPC9zbWFsbD4nO1xuICAgIH1cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIE1hcFNlcnZpY2UucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9nZXRJZEZpZWxkcygpO1xuICB9LFxuXG4gIHN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAodGV4dCwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciByZXF1ZXN0ID0gdGhpcy5maW5kKCkudGV4dCh0ZXh0KS5maWVsZHModGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcykucmV0dXJuR2VvbWV0cnkoZmFsc2UpLmxheWVycyh0aGlzLm9wdGlvbnMubGF5ZXJzKTtcblxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJhdykge1xuICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gW107XG4gICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgIHZhciBjb3VudCA9IE1hdGgubWluKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzLCByZXN1bHRzLmZlYXR1cmVzLmxlbmd0aCk7XG4gICAgICAgIHJhdy5yZXN1bHRzID0gcmF3LnJlc3VsdHMucmV2ZXJzZSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICB2YXIgZmVhdHVyZSA9IHJlc3VsdHMuZmVhdHVyZXNbaV07XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHJhdy5yZXN1bHRzW2ldO1xuICAgICAgICAgIHZhciBsYXllciA9IHJlc3VsdC5sYXllcklkO1xuICAgICAgICAgIHZhciBpZEZpZWxkID0gdGhpcy5faWRGaWVsZHNbbGF5ZXJdO1xuICAgICAgICAgIGZlYXR1cmUubGF5ZXJJZCA9IGxheWVyO1xuICAgICAgICAgIGZlYXR1cmUubGF5ZXJOYW1lID0gdGhpcy5fbGF5ZXJOYW1lc1tsYXllcl07XG4gICAgICAgICAgZmVhdHVyZS5kaXNwbGF5RmllbGROYW1lID0gdGhpcy5fZGlzcGxheUZpZWxkc1tsYXllcl07XG4gICAgICAgICAgaWYgKGlkRmllbGQpIHtcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgICB0ZXh0OiB0aGlzLm9wdGlvbnMuZm9ybWF0U3VnZ2VzdGlvbi5jYWxsKHRoaXMsIGZlYXR1cmUpLFxuICAgICAgICAgICAgICBtYWdpY0tleTogcmVzdWx0LmF0dHJpYnV0ZXNbaWRGaWVsZF0gKyAnOicgKyBsYXllclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhlcnJvciwgc3VnZ2VzdGlvbnMucmV2ZXJzZSgpKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICB2YXIgcmVxdWVzdDtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIHZhciBmZWF0dXJlSWQgPSBrZXkuc3BsaXQoJzonKVswXTtcbiAgICAgIHZhciBsYXllciA9IGtleS5zcGxpdCgnOicpWzFdO1xuICAgICAgcmVxdWVzdCA9IHRoaXMucXVlcnkoKS5sYXllcihsYXllcikuZmVhdHVyZUlkcyhmZWF0dXJlSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0ID0gdGhpcy5maW5kKCkudGV4dCh0ZXh0KS5maWVsZHModGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcykubGF5ZXJzKHRoaXMub3B0aW9ucy5sYXllcnMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIGZlYXR1cmVzLCByZXNwb25zZSkge1xuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICBpZiAocmVzcG9uc2UucmVzdWx0cykge1xuICAgICAgICAgIHJlc3BvbnNlLnJlc3VsdHMgPSByZXNwb25zZS5yZXN1bHRzLnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZlYXR1cmVzLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGZlYXR1cmUgPSBmZWF0dXJlcy5mZWF0dXJlc1tpXTtcbiAgICAgICAgICBsYXllciA9IGxheWVyIHx8IHJlc3BvbnNlLnJlc3VsdHNbaV0ubGF5ZXJJZDtcblxuICAgICAgICAgIGlmIChmZWF0dXJlICYmIGxheWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9mZWF0dXJlQm91bmRzKGZlYXR1cmUpO1xuICAgICAgICAgICAgZmVhdHVyZS5sYXllcklkID0gbGF5ZXI7XG4gICAgICAgICAgICBmZWF0dXJlLmxheWVyTmFtZSA9IHRoaXMuX2xheWVyTmFtZXNbbGF5ZXJdO1xuICAgICAgICAgICAgZmVhdHVyZS5kaXNwbGF5RmllbGROYW1lID0gdGhpcy5fZGlzcGxheUZpZWxkc1tsYXllcl07XG5cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICAgIGxhdGxuZzogYm91bmRzLmdldENlbnRlcigpLFxuICAgICAgICAgICAgICBib3VuZHM6IGJvdW5kcyxcbiAgICAgICAgICAgICAgdGV4dDogdGhpcy5vcHRpb25zLmZvcm1hdFN1Z2dlc3Rpb24uY2FsbCh0aGlzLCBmZWF0dXJlKSxcbiAgICAgICAgICAgICAgcHJvcGVydGllczogZmVhdHVyZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICBnZW9qc29uOiBmZWF0dXJlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKGVycm9yLCByZXN1bHRzLnJldmVyc2UoKSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX2ZlYXR1cmVCb3VuZHM6IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgdmFyIGdlb2pzb24gPSBMLmdlb0pzb24oZmVhdHVyZSk7XG4gICAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgdmFyIGNlbnRlciA9IGdlb2pzb24uZ2V0Qm91bmRzKCkuZ2V0Q2VudGVyKCk7XG4gICAgICB2YXIgbG5nUmFkaXVzID0gKCh0aGlzLm9wdGlvbnMuYnVmZmVyUmFkaXVzIC8gNDAwNzUwMTcpICogMzYwKSAvIE1hdGguY29zKCgxODAgLyBNYXRoLlBJKSAqIGNlbnRlci5sYXQpO1xuICAgICAgdmFyIGxhdFJhZGl1cyA9ICh0aGlzLm9wdGlvbnMuYnVmZmVyUmFkaXVzIC8gNDAwNzUwMTcpICogMzYwO1xuICAgICAgcmV0dXJuIEwubGF0TG5nQm91bmRzKFtjZW50ZXIubGF0IC0gbGF0UmFkaXVzLCBjZW50ZXIubG5nIC0gbG5nUmFkaXVzXSwgW2NlbnRlci5sYXQgKyBsYXRSYWRpdXMsIGNlbnRlci5sbmcgKyBsbmdSYWRpdXNdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdlb2pzb24uZ2V0Qm91bmRzKCk7XG4gICAgfVxuICB9LFxuXG4gIF9sYXllck1ldGFkYXRhQ2FsbGJhY2s6IGZ1bmN0aW9uIChsYXllcmlkKSB7XG4gICAgcmV0dXJuIEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgbWV0YWRhdGEpIHtcbiAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH1cbiAgICAgIHRoaXMuX2Rpc3BsYXlGaWVsZHNbbGF5ZXJpZF0gPSBtZXRhZGF0YS5kaXNwbGF5RmllbGQ7XG4gICAgICB0aGlzLl9sYXllck5hbWVzW2xheWVyaWRdID0gbWV0YWRhdGEubmFtZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0YWRhdGEuZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBmaWVsZCA9IG1ldGFkYXRhLmZpZWxkc1tpXTtcbiAgICAgICAgaWYgKGZpZWxkLnR5cGUgPT09ICdlc3JpRmllbGRUeXBlT0lEJykge1xuICAgICAgICAgIHRoaXMuX2lkRmllbGRzW2xheWVyaWRdID0gZmllbGQubmFtZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIF9nZXRJZEZpZWxkczogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2lkRmllbGRzID0ge307XG4gICAgdGhpcy5fZGlzcGxheUZpZWxkcyA9IHt9O1xuICAgIHRoaXMuX2xheWVyTmFtZXMgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsYXllciA9IHRoaXMub3B0aW9ucy5sYXllcnNbaV07XG4gICAgICB0aGlzLmdldChsYXllciwge30sIHRoaXMuX2xheWVyTWV0YWRhdGFDYWxsYmFjayhsYXllcikpO1xuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBTZXJ2aWNlUHJvdmlkZXIgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBNYXBTZXJ2aWNlUHJvdmlkZXIob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcFNlcnZpY2VQcm92aWRlcjtcbiIsImltcG9ydCB7IEdlb2NvZGVTZXJ2aWNlIH0gZnJvbSAnLi4vU2VydmljZXMvR2VvY29kZSc7XG5cbmV4cG9ydCB2YXIgR2VvY29kZVNlcnZpY2VQcm92aWRlciA9IEdlb2NvZGVTZXJ2aWNlLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBsYWJlbDogJ0dlb2NvZGUgU2VydmVyJyxcbiAgICBtYXhSZXN1bHRzOiA1XG4gIH0sXG5cbiAgc3VnZ2VzdGlvbnM6IGZ1bmN0aW9uICh0ZXh0LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gdGhpcy5zdWdnZXN0KCkudGV4dCh0ZXh0KTtcbiAgICAgIGlmIChib3VuZHMpIHtcbiAgICAgICAgcmVxdWVzdC53aXRoaW4oYm91bmRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlcXVlc3QucnVuKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gW107XG4gICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICB3aGlsZSAocmVzcG9uc2Uuc3VnZ2VzdGlvbnMubGVuZ3RoICYmIHN1Z2dlc3Rpb25zLmxlbmd0aCA8PSAodGhpcy5vcHRpb25zLm1heFJlc3VsdHMgLSAxKSkge1xuICAgICAgICAgICAgdmFyIHN1Z2dlc3Rpb24gPSByZXNwb25zZS5zdWdnZXN0aW9ucy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKCFzdWdnZXN0aW9uLmlzQ29sbGVjdGlvbikge1xuICAgICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBzdWdnZXN0aW9uLnRleHQsXG4gICAgICAgICAgICAgICAgbWFnaWNLZXk6IHN1Z2dlc3Rpb24ubWFnaWNLZXlcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBzdWdnZXN0aW9ucyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sodW5kZWZpbmVkLCBbXSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LFxuXG4gIHJlc3VsdHM6IGZ1bmN0aW9uICh0ZXh0LCBrZXksIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxdWVzdCA9IHRoaXMuZ2VvY29kZSgpLnRleHQodGV4dCk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICByZXF1ZXN0LmtleShrZXkpO1xuICAgIH1cblxuICAgIHJlcXVlc3QubWF4TG9jYXRpb25zKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzKTtcblxuICAgIGlmIChib3VuZHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aGluKGJvdW5kcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcXVlc3QucnVuKGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGNhbGxiYWNrKGVycm9yLCByZXNwb25zZS5yZXN1bHRzKTtcbiAgICB9LCB0aGlzKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9jb2RlU2VydmljZVByb3ZpZGVyIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgR2VvY29kZVNlcnZpY2VQcm92aWRlcihvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2VvY29kZVNlcnZpY2VQcm92aWRlcjtcbiIsImV4cG9ydCB7IHZlcnNpb24gYXMgVkVSU0lPTiB9IGZyb20gJy4uL3BhY2thZ2UuanNvbic7XG5leHBvcnQgdmFyIFdvcmxkR2VvY29kaW5nU2VydmljZVVybCA9ICdodHRwczovL2dlb2NvZGUuYXJjZ2lzLmNvbS9hcmNnaXMvcmVzdC9zZXJ2aWNlcy9Xb3JsZC9HZW9jb2RlU2VydmVyLyc7XG5cbi8vIGltcG9ydCB0YXNrc1xuZXhwb3J0IHsgR2VvY29kZSwgZ2VvY29kZSB9IGZyb20gJy4vVGFza3MvR2VvY29kZSc7XG5leHBvcnQgeyBSZXZlcnNlR2VvY29kZSwgcmV2ZXJzZUdlb2NvZGUgfSBmcm9tICcuL1Rhc2tzL1JldmVyc2VHZW9jb2RlJztcbmV4cG9ydCB7IFN1Z2dlc3QsIHN1Z2dlc3QgfSBmcm9tICcuL1Rhc2tzL1N1Z2dlc3QnO1xuXG4vLyBpbXBvcnQgc2VydmljZVxuZXhwb3J0IHsgR2VvY29kZVNlcnZpY2UsIGdlb2NvZGVTZXJ2aWNlIH0gZnJvbSAnLi9TZXJ2aWNlcy9HZW9jb2RlJztcblxuLy8gaW1wb3J0IGNvbnRyb2xcbmV4cG9ydCB7IEdlb3NlYXJjaCwgZ2Vvc2VhcmNoIH0gZnJvbSAnLi9Db250cm9scy9HZW9zZWFyY2gnO1xuXG4vLyBpbXBvcnQgc3VwcG9ydGluZyBjbGFzc1xuZXhwb3J0IHsgR2Vvc2VhcmNoQ29yZSwgZ2Vvc2VhcmNoQ29yZSB9IGZyb20gJy4vQ2xhc3Nlcy9HZW9zZWFyY2hDb3JlJztcblxuLy8gaW1wb3J0IHByb3ZpZGVyc1xuZXhwb3J0IHsgQXJjZ2lzT25saW5lUHJvdmlkZXIsIGFyY2dpc09ubGluZVByb3ZpZGVyIH0gZnJvbSAnLi9Qcm92aWRlcnMvQXJjZ2lzT25saW5lR2VvY29kZXInO1xuZXhwb3J0IHsgRmVhdHVyZUxheWVyUHJvdmlkZXIsIGZlYXR1cmVMYXllclByb3ZpZGVyIH0gZnJvbSAnLi9Qcm92aWRlcnMvRmVhdHVyZUxheWVyJztcbmV4cG9ydCB7IE1hcFNlcnZpY2VQcm92aWRlciwgbWFwU2VydmljZVByb3ZpZGVyIH0gZnJvbSAnLi9Qcm92aWRlcnMvTWFwU2VydmljZSc7XG5leHBvcnQgeyBHZW9jb2RlU2VydmljZVByb3ZpZGVyLCBnZW9jb2RlU2VydmljZVByb3ZpZGVyIH0gZnJvbSAnLi9Qcm92aWRlcnMvR2VvY29kZVNlcnZpY2UnO1xuIl0sIm5hbWVzIjpbIlRhc2siLCJVdGls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RyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEMsQ0FBQSxNQUFNLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEMsQ0FBQSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNoRSxDQUFBLEtBQUssTUFBTTtBQUNYLENBQUEsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyRyxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0FBQzVELENBQUEsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2xCLENBQUEsUUFBUSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7QUFDOUIsQ0FBQSxVQUFVLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN4RCxDQUFBLFNBQVM7QUFDVCxDQUFBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNELENBQUEsVUFBVSxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdDLENBQUEsVUFBVSxLQUFLLEdBQUcsS0FBSyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDOztB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