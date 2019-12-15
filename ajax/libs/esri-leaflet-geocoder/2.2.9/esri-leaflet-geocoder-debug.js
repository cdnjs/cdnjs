/* esri-leaflet-geocoder - v2.2.9 - Thu Feb 22 2018 11:55:39 GMT-0800 (PST)
 * Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet'), require('esri-leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet', 'esri-leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Geocoding = global.L.esri.Geocoding || {}),global.L,global.L.esri));
}(this, function (exports,leaflet,esriLeaflet) { 'use strict';

	var version = "2.2.9";

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
	    bounds = leaflet.latLngBounds(bounds);
	    this.params.searchExtent = esriLeaflet.Util.boundsToExtent(bounds);
	    return this;
	  },

	  nearby: function (coords, radius) {
	    var centroid = leaflet.latLng(coords);
	    this.params.location = centroid.lng + ',' + centroid.lat;
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
	        latlng: leaflet.latLng(candidate.location.y, candidate.location.x),
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

	  latlng: function (coords) {
	    var centroid = leaflet.latLng(coords);
	    this.params.location = centroid.lng + ',' + centroid.lat;
	    return this;
	  },

	  run: function (callback, context) {
	    return this.request(function (error, response) {
	      var result;

	      if (!error) {
	        result = {
	          latlng: leaflet.latLng(response.location.y, response.location.x),
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
	    bounds = leaflet.latLngBounds(bounds);
	    bounds = bounds.pad(0.5);
	    var center = bounds.getCenter();
	    var ne = bounds.getNorthWest();
	    this.params.location = center.lng + ',' + center.lat;
	    this.params.distance = Math.min(Math.max(center.distanceTo(ne), 2000), 50000);
	    this.params.searchExtent = esriLeaflet.Util.boundsToExtent(bounds);
	    return this;
	  },

	  nearby: function (coords, radius) {
	    var centroid = leaflet.latLng(coords);
	    this.params.location = centroid.lng + ',' + centroid.lat;
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

	var GeosearchCore = leaflet.Evented.extend({

	  options: {
	    zoomToResult: true,
	    useMapBounds: 12,
	    searchBounds: null
	  },

	  initialize: function (control, options) {
	    leaflet.Util.setOptions(this, options);
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

	    var callback = leaflet.Util.bind(function (error, results) {
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

	    var createCallback = leaflet.Util.bind(function (text, provider) {
	      return leaflet.Util.bind(function (error, suggestions) {
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

	    var nullIsland = leaflet.latLngBounds([0, 0], [0, 0]);
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
	    var bounds = leaflet.latLngBounds(resultLatlngs);

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
	              unformattedText: suggestion.text,
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

	var Geosearch = leaflet.Control.extend({
	  includes: leaflet.Evented.prototype,

	  options: {
	    position: 'topleft',
	    collapseAfterResult: true,
	    expanded: false,
	    allowMultipleResults: true,
	    placeholder: 'Search for places or addresses',
	    title: 'Location Search'
	  },

	  initialize: function (options) {
	    leaflet.Util.setOptions(this, options);

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

	    leaflet.Control.prototype.initialize.call(options);
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
	        header = leaflet.DomUtil.create('span', 'geocoder-control-header', this._suggestions);
	        header.textContent = suggestion.provider.options.label;
	        header.innerText = suggestion.provider.options.label;
	        currentGroup = suggestion.provider.options.label;
	        nodes.push(header);
	      }

	      if (!list) {
	        list = leaflet.DomUtil.create('ul', 'geocoder-control-list', this._suggestions);
	      }

	      if (suggestionTextArray.indexOf(suggestion.text) === -1) {
	        var suggestionItem = leaflet.DomUtil.create('li', 'geocoder-control-suggestion', list);

	        suggestionItem.innerHTML = suggestion.text;
	        suggestionItem.provider = suggestion.provider;
	        suggestionItem['data-magic-key'] = suggestion.magicKey;
	        suggestionItem.unformattedText = suggestion.unformattedText;
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

	    leaflet.DomUtil.removeClass(this._input, 'geocoder-control-loading');

	    nodes.push(list);

	    return nodes;
	  },

	  _boundsFromResults: function (results) {
	    if (!results.length) {
	      return;
	    }

	    var nullIsland = leaflet.latLngBounds([0, 0], [0, 0]);
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
	    var bounds = leaflet.latLngBounds(resultLatlngs);

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
	      leaflet.DomUtil.removeClass(this._wrapper, 'geocoder-control-expanded');
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
	    leaflet.DomUtil.addClass(this._wrapper, 'geocoder-control-expanded');
	    this._input.focus();
	  },

	  disable: function () {
	    this._input.disabled = true;
	    leaflet.DomUtil.addClass(this._input, 'geocoder-control-input-disabled');
	    leaflet.DomEvent.removeListener(this._wrapper, 'click', this._setupClick, this);
	  },

	  enable: function () {
	    this._input.disabled = false;
	    leaflet.DomUtil.removeClass(this._input, 'geocoder-control-input-disabled');
	    leaflet.DomEvent.addListener(this._wrapper, 'click', this._setupClick, this);
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

	  geocodeSuggestion: function (e) {
	    var suggestionItem = e.target || e.srcElement;

	    // make sure and point at the actual 'geocoder-control-suggestion'
	    if (suggestionItem.classList.length < 1) {
	      suggestionItem = suggestionItem.parentNode;
	    }

	    this._geosearchCore._geocode(suggestionItem.unformattedText, suggestionItem['data-magic-key'], suggestionItem.provider);
	    this.clear();
	  },

	  onAdd: function (map) {
	    // include 'Powered by Esri' in map attribution
	    esriLeaflet.Util.setEsriAttribution(map);

	    this._map = map;
	    this._wrapper = leaflet.DomUtil.create('div', 'geocoder-control');
	    this._input = leaflet.DomUtil.create('input', 'geocoder-control-input leaflet-bar', this._wrapper);
	    this._input.title = this.options.title;

	    if (this.options.expanded) {
	      leaflet.DomUtil.addClass(this._wrapper, 'geocoder-control-expanded');
	      this._input.placeholder = this.options.placeholder;
	    }

	    this._suggestions = leaflet.DomUtil.create('div', 'geocoder-control-suggestions leaflet-bar', this._wrapper);

	    var credits = this._geosearchCore._getAttribution();
	    map.attributionControl.addAttribution(credits);

	    leaflet.DomEvent.addListener(this._input, 'focus', function (e) {
	      this._input.placeholder = this.options.placeholder;
	      leaflet.DomUtil.addClass(this._wrapper, 'geocoder-control-expanded');
	    }, this);

	    leaflet.DomEvent.addListener(this._wrapper, 'click', this._setupClick, this);

	    // make sure both click and touch spawn an address/poi search
	    leaflet.DomEvent.addListener(this._suggestions, 'mousedown', this.geocodeSuggestion, this);
	    leaflet.DomEvent.addListener(this._suggestions, 'touchend', this.geocodeSuggestion, this);

	    leaflet.DomEvent.addListener(this._input, 'blur', function (e) {
	      this.clear();
	    }, this);

	    leaflet.DomEvent.addListener(this._input, 'keydown', function (e) {
	      var text = (e.target || e.srcElement).value;

	      leaflet.DomUtil.addClass(this._wrapper, 'geocoder-control-expanded');

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
	            this._geosearchCore._geocode(selected.unformattedText, selected['data-magic-key'], selected.provider);
	            this.clear();
	          } else if (this.options.allowMultipleResults && text.length >= 2) {
	            this._geosearchCore._geocode(this._input.value, undefined);
	            this.clear();
	          } else {
	            if (list.length === 1) {
	              leaflet.DomUtil.addClass(list[0], 'geocoder-control-selected');
	              this._geosearchCore._geocode(list[0].innerHTML, list[0]['data-magic-key'], list[0].provider);
	            } else {
	              this.clear();
	              this._input.blur();
	            }
	          }
	          leaflet.DomEvent.preventDefault(e);
	          break;
	        case 38:
	          if (selected) {
	            leaflet.DomUtil.removeClass(selected, 'geocoder-control-selected');
	          }

	          var previousItem = list[selectedPosition - 1];

	          if (selected && previousItem) {
	            leaflet.DomUtil.addClass(previousItem, 'geocoder-control-selected');
	          } else {
	            leaflet.DomUtil.addClass(list[list.length - 1], 'geocoder-control-selected');
	          }
	          leaflet.DomEvent.preventDefault(e);
	          break;
	        case 40:
	          if (selected) {
	            leaflet.DomUtil.removeClass(selected, 'geocoder-control-selected');
	          }

	          var nextItem = list[selectedPosition + 1];

	          if (selected && nextItem) {
	            leaflet.DomUtil.addClass(nextItem, 'geocoder-control-selected');
	          } else {
	            leaflet.DomUtil.addClass(list[0], 'geocoder-control-selected');
	          }
	          leaflet.DomEvent.preventDefault(e);
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

	    leaflet.DomEvent.addListener(this._input, 'keyup', leaflet.Util.throttle(function (e) {
	      var key = e.which || e.keyCode;
	      var text = (e.target || e.srcElement).value;

	      // require at least 2 characters for suggestions
	      if (text.length < 2) {
	        this._suggestions.innerHTML = '';
	        this._suggestions.style.display = 'none';
	        leaflet.DomUtil.removeClass(this._input, 'geocoder-control-loading');
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
	          leaflet.DomUtil.addClass(this._input, 'geocoder-control-loading');
	          this._geosearchCore._suggest(text);
	        }
	      }
	    }, 50, this), this);

	    leaflet.DomEvent.disableClickPropagation(this._wrapper);

	    // when mouse moves over suggestions disable scroll wheel zoom if its enabled
	    leaflet.DomEvent.addListener(this._suggestions, 'mouseover', function (e) {
	      if (map.scrollWheelZoom.enabled() && map.options.scrollWheelZoom) {
	        map.scrollWheelZoom.disable();
	      }
	    });

	    // when mouse moves leaves suggestions enable scroll wheel zoom if its disabled
	    leaflet.DomEvent.addListener(this._suggestions, 'mouseout', function (e) {
	      if (!map.scrollWheelZoom.enabled() && map.options.scrollWheelZoom) {
	        map.scrollWheelZoom.enable();
	      }
	    });

	    this._geosearchCore.on('load', function (e) {
	      leaflet.DomUtil.removeClass(this._input, 'geocoder-control-loading');
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
	            unformattedText: feature.properties[this.options.searchFields[0]],
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

	    return query.run(leaflet.Util.bind(function (error, features) {
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
	    var geojson = leaflet.geoJson(feature);
	    if (feature.geometry.type === 'Point') {
	      var center = geojson.getBounds().getCenter();
	      var lngRadius = ((this.options.bufferRadius / 40075017) * 360) / Math.cos((180 / Math.PI) * center.lat);
	      var latRadius = (this.options.bufferRadius / 40075017) * 360;
	      return leaflet.latLngBounds([center.lat - latRadius, center.lng - lngRadius], [center.lat + latRadius, center.lng + lngRadius]);
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
	              unformattedText: feature.properties[feature.displayFieldName],
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
	    var geojson = leaflet.geoJson(feature);
	    if (feature.geometry.type === 'Point') {
	      var center = geojson.getBounds().getCenter();
	      var lngRadius = ((this.options.bufferRadius / 40075017) * 360) / Math.cos((180 / Math.PI) * center.lat);
	      var latRadius = (this.options.bufferRadius / 40075017) * 360;
	      return leaflet.latLngBounds([center.lat - latRadius, center.lng - lngRadius], [center.lat + latRadius, center.lng + lngRadius]);
	    } else {
	      return geojson.getBounds();
	    }
	  },

	  _layerMetadataCallback: function (layerid) {
	    return leaflet.Util.bind(function (error, metadata) {
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
	                unformattedText: suggestion.text,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvVGFza3MvR2VvY29kZS5qcyIsIi4uL3NyYy9UYXNrcy9SZXZlcnNlR2VvY29kZS5qcyIsIi4uL3NyYy9UYXNrcy9TdWdnZXN0LmpzIiwiLi4vc3JjL1NlcnZpY2VzL0dlb2NvZGUuanMiLCIuLi9zcmMvQ2xhc3Nlcy9HZW9zZWFyY2hDb3JlLmpzIiwiLi4vc3JjL1Byb3ZpZGVycy9BcmNnaXNPbmxpbmVHZW9jb2Rlci5qcyIsIi4uL3NyYy9Db250cm9scy9HZW9zZWFyY2guanMiLCIuLi9zcmMvUHJvdmlkZXJzL0ZlYXR1cmVMYXllci5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvTWFwU2VydmljZS5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvR2VvY29kZVNlcnZpY2UuanMiLCIuLi9zcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXQtZ2VvY29kZXJcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkVzcmkgR2VvY29kaW5nIHV0aWxpdHkgYW5kIHNlYXJjaCBwbHVnaW4gZm9yIExlYWZsZXQuXCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMi45XCIsXG4gIFwiYXV0aG9yXCI6IFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gIFwiY29udHJpYnV0b3JzXCI6IFtcbiAgICBcIlBhdHJpY2sgQXJsdCA8cGFybHRAZXNyaS5jb20+IChodHRwOi8vcGF0cmlja2FybHQuY29tKVwiLFxuICAgIFwiSm9obiBHcmF2b2lzIDxqZ3Jhdm9pc0Blc3JpLmNvbT4gKGh0dHA6Ly9qb2huZ3Jhdm9pcy5jb20pXCJcbiAgXSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZXNyaS1sZWFmbGV0XCI6IFwiXjIuMC4zXCIsXG4gICAgXCJsZWFmbGV0XCI6IFwiXjEuMC4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2hhaVwiOiBcIjMuNS4wXCIsXG4gICAgXCJnaC1yZWxlYXNlXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4wLjEwLjBcIixcbiAgICBcImltYWdlbWluXCI6IFwiXjMuMi4wXCIsXG4gICAgXCJpc3BhcnRhXCI6IFwiXjQuMC4wXCIsXG4gICAgXCJpc3RhbmJ1bFwiOiBcIl4wLjQuMlwiLFxuICAgIFwia2FybWFcIjogXCJeMS4zLjBcIixcbiAgICBcImthcm1hLWNoYWktc2lub25cIjogXCJeMC4xLjNcIixcbiAgICBcImthcm1hLWNocm9tZS1sYXVuY2hlclwiOiBcIl4yLjIuMFwiLFxuICAgIFwia2FybWEtY292ZXJhZ2VcIjogXCJeMS4xLjFcIixcbiAgICBcImthcm1hLW1vY2hhXCI6IFwiXjEuMy4wXCIsXG4gICAgXCJrYXJtYS1tb2NoYS1yZXBvcnRlclwiOiBcIl4yLjIuMVwiLFxuICAgIFwia2FybWEtc291cmNlbWFwLWxvYWRlclwiOiBcIl4wLjMuNVwiLFxuICAgIFwibWtkaXJwXCI6IFwiXjAuNS4xXCIsXG4gICAgXCJtb2NoYVwiOiBcIl4zLjEuMFwiLFxuICAgIFwibm9kZS1zYXNzXCI6IFwiXjMuMi4wXCIsXG4gICAgXCJwYXJhbGxlbHNoZWxsXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJwaGFudG9tanNcIjogXCJeMS45LjhcIixcbiAgICBcInJvbGx1cFwiOiBcIl4wLjI1LjRcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tanNvblwiOiBcIl4yLjAuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1ub2RlLXJlc29sdmVcIjogXCJeMS40LjBcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tdWdsaWZ5XCI6IFwiXjAuMy4xXCIsXG4gICAgXCJzZW1pc3RhbmRhcmRcIjogXCJeOS4wLjBcIixcbiAgICBcInNpbm9uXCI6IFwiXjEuMTEuMVwiLFxuICAgIFwic2lub24tY2hhaVwiOiBcIjIuOC4wXCIsXG4gICAgXCJzbmF6enlcIjogXCJeNS4wLjBcIixcbiAgICBcInVnbGlmeS1qc1wiOiBcIl4yLjYuMVwiLFxuICAgIFwid2F0Y2hcIjogXCJeMC4xNy4xXCJcbiAgfSxcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9Fc3JpL2VzcmktbGVhZmxldC1nZW9jb2RlclwiLFxuICBcImpzbmV4dDptYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0R2VvY29kaW5nLmpzXCIsXG4gIFwianNwbVwiOiB7XG4gICAgXCJyZWdpc3RyeVwiOiBcIm5wbVwiLFxuICAgIFwiZm9ybWF0XCI6IFwiZXM2XCIsXG4gICAgXCJtYWluXCI6IFwic3JjL0VzcmlMZWFmbGV0R2VvY29kaW5nLmpzXCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiQXBhY2hlLTIuMFwiLFxuICBcIm1haW5cIjogXCJkaXN0L2VzcmktbGVhZmxldC1nZW9jb2Rlci1kZWJ1Zy5qc1wiLFxuICBcImJyb3dzZXJcIjogXCJkaXN0L2VzcmktbGVhZmxldC1nZW9jb2Rlci1kZWJ1Zy5qc1wiLFxuICBcInJlYWRtZUZpbGVuYW1lXCI6IFwiUkVBRE1FLm1kXCIsXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXRAZ2l0aHViLmNvbTpFc3JpL2VzcmktbGVhZmxldC1nZW9jb2Rlci5naXRcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwicHJlYnVpbGRcIjogXCJta2RpcnAgZGlzdFwiLFxuICAgIFwiYnVpbGRcIjogXCJyb2xsdXAgLWMgcHJvZmlsZXMvZGVidWcuanMgJiByb2xsdXAgLWMgcHJvZmlsZXMvcHJvZHVjdGlvbi5qcyAmIG5wbSBydW4gY3NzICYgbnBtIHJ1biBpbWdcIixcbiAgICBcImNzc1wiOiBcIm5vZGUtc2FzcyAuL3NyYy9lc3JpLWxlYWZsZXQtZ2VvY29kZXIuY3NzIC4vZGlzdC9lc3JpLWxlYWZsZXQtZ2VvY29kZXIuY3NzIC0tb3V0cHV0LXN0eWxlIGNvbXByZXNzZWRcIixcbiAgICBcImltZ1wiOiBcImltYWdlbWluIC4vc3JjL2ltZyAuL2Rpc3QvaW1nXCIsXG4gICAgXCJsaW50XCI6IFwic2VtaXN0YW5kYXJkIHwgc25henp5XCIsXG4gICAgXCJwcmVwYXJlXCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicHJldGVzdFwiOiBcIm5wbSBydW4gYnVpbGRcIixcbiAgICBcInJlbGVhc2VcIjogXCIuL3NjcmlwdHMvcmVsZWFzZS5zaFwiLFxuICAgIFwic3RhcnQtd2F0Y2hcIjogXCJ3YXRjaCBcXFwibnBtIHJ1biBidWlsZFxcXCIgc3JjXCIsXG4gICAgXCJzdGFydFwiOiBcInBhcmFsbGVsc2hlbGwgXFxcIm5wbSBydW4gc3RhcnQtd2F0Y2hcXFwiIFxcXCJodHRwLXNlcnZlciAtcCA1Njc4IC1jLTEgLW9cXFwiXCIsXG4gICAgXCJ0ZXN0XCI6IFwibnBtIHJ1biBsaW50ICYmIGthcm1hIHN0YXJ0XCJcbiAgfSxcbiAgXCJzZW1pc3RhbmRhcmRcIjoge1xuICAgIFwiZ2xvYmFsc1wiOiBbXG4gICAgICBcImV4cGVjdFwiLFxuICAgICAgXCJMXCIsXG4gICAgICBcIlhNTEh0dHBSZXF1ZXN0XCIsXG4gICAgICBcInNpbm9uXCIsXG4gICAgICBcInhoclwiXG4gICAgXVxuICB9LFxuICBcInN0eWxlXCI6IFwiLi9kaXN0L2VzcmktbGVhZmxldC1nZW9jb2Rlci5jc3NcIlxufVxuIiwiaW1wb3J0IHtcbiAgbGF0TG5nLFxuICBsYXRMbmdCb3VuZHNcbn0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBUYXNrLCBVdGlsIGFzIEVzcmlVdGlsIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcbmltcG9ydCB7IFdvcmxkR2VvY29kaW5nU2VydmljZVVybCB9IGZyb20gJy4uL0VzcmlMZWFmbGV0R2VvY29kaW5nJztcblxuZXhwb3J0IHZhciBHZW9jb2RlID0gVGFzay5leHRlbmQoe1xuICBwYXRoOiAnZmluZEFkZHJlc3NDYW5kaWRhdGVzJyxcblxuICBwYXJhbXM6IHtcbiAgICBvdXRTcjogNDMyNixcbiAgICBmb3JTdG9yYWdlOiBmYWxzZSxcbiAgICBvdXRGaWVsZHM6ICcqJyxcbiAgICBtYXhMb2NhdGlvbnM6IDIwXG4gIH0sXG5cbiAgc2V0dGVyczoge1xuICAgICdhZGRyZXNzJzogJ2FkZHJlc3MnLFxuICAgICduZWlnaGJvcmhvb2QnOiAnbmVpZ2hib3Job29kJyxcbiAgICAnY2l0eSc6ICdjaXR5JyxcbiAgICAnc3VicmVnaW9uJzogJ3N1YnJlZ2lvbicsXG4gICAgJ3JlZ2lvbic6ICdyZWdpb24nLFxuICAgICdwb3N0YWwnOiAncG9zdGFsJyxcbiAgICAnY291bnRyeSc6ICdjb3VudHJ5JyxcbiAgICAndGV4dCc6ICdzaW5nbGVMaW5lJyxcbiAgICAnY2F0ZWdvcnknOiAnY2F0ZWdvcnknLFxuICAgICd0b2tlbic6ICd0b2tlbicsXG4gICAgJ2tleSc6ICdtYWdpY0tleScsXG4gICAgJ2ZpZWxkcyc6ICdvdXRGaWVsZHMnLFxuICAgICdmb3JTdG9yYWdlJzogJ2ZvclN0b3JhZ2UnLFxuICAgICdtYXhMb2NhdGlvbnMnOiAnbWF4TG9jYXRpb25zJ1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy51cmwgPSBvcHRpb25zLnVybCB8fCBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmw7XG4gICAgVGFzay5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIHdpdGhpbjogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIGJvdW5kcyA9IGxhdExuZ0JvdW5kcyhib3VuZHMpO1xuICAgIHRoaXMucGFyYW1zLnNlYXJjaEV4dGVudCA9IEVzcmlVdGlsLmJvdW5kc1RvRXh0ZW50KGJvdW5kcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgbmVhcmJ5OiBmdW5jdGlvbiAoY29vcmRzLCByYWRpdXMpIHtcbiAgICB2YXIgY2VudHJvaWQgPSBsYXRMbmcoY29vcmRzKTtcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGNlbnRyb2lkLmxuZyArICcsJyArIGNlbnRyb2lkLmxhdDtcbiAgICB0aGlzLnBhcmFtcy5kaXN0YW5jZSA9IE1hdGgubWluKE1hdGgubWF4KHJhZGl1cywgMjAwMCksIDUwMDAwKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY3VzdG9tUGFyYW0pIHtcbiAgICAgIHRoaXMucGFyYW1zW3RoaXMub3B0aW9ucy5jdXN0b21QYXJhbV0gPSB0aGlzLnBhcmFtcy5zaW5nbGVMaW5lO1xuICAgICAgZGVsZXRlIHRoaXMucGFyYW1zLnNpbmdsZUxpbmU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcHJvY2Vzc29yID0gdGhpcy5fcHJvY2Vzc0dlb2NvZGVyUmVzcG9uc2U7XG4gICAgICB2YXIgcmVzdWx0cyA9ICghZXJyb3IpID8gcHJvY2Vzc29yKHJlc3BvbnNlKSA6IHVuZGVmaW5lZDtcbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHsgcmVzdWx0czogcmVzdWx0cyB9LCByZXNwb25zZSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX3Byb2Nlc3NHZW9jb2RlclJlc3BvbnNlOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2FuZGlkYXRlID0gcmVzcG9uc2UuY2FuZGlkYXRlc1tpXTtcbiAgICAgIGlmIChjYW5kaWRhdGUuZXh0ZW50KSB7XG4gICAgICAgIHZhciBib3VuZHMgPSBFc3JpVXRpbC5leHRlbnRUb0JvdW5kcyhjYW5kaWRhdGUuZXh0ZW50KTtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgdGV4dDogY2FuZGlkYXRlLmFkZHJlc3MsXG4gICAgICAgIGJvdW5kczogYm91bmRzLFxuICAgICAgICBzY29yZTogY2FuZGlkYXRlLnNjb3JlLFxuICAgICAgICBsYXRsbmc6IGxhdExuZyhjYW5kaWRhdGUubG9jYXRpb24ueSwgY2FuZGlkYXRlLmxvY2F0aW9uLngpLFxuICAgICAgICBwcm9wZXJ0aWVzOiBjYW5kaWRhdGUuYXR0cmlidXRlc1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2NvZGUgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBHZW9jb2RlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW9jb2RlO1xuIiwiaW1wb3J0IHsgbGF0TG5nIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcbmltcG9ydCB7IFdvcmxkR2VvY29kaW5nU2VydmljZVVybCB9IGZyb20gJy4uL0VzcmlMZWFmbGV0R2VvY29kaW5nJztcblxuZXhwb3J0IHZhciBSZXZlcnNlR2VvY29kZSA9IFRhc2suZXh0ZW5kKHtcbiAgcGF0aDogJ3JldmVyc2VHZW9jb2RlJyxcblxuICBwYXJhbXM6IHtcbiAgICBvdXRTUjogNDMyNixcbiAgICByZXR1cm5JbnRlcnNlY3Rpb246IGZhbHNlXG4gIH0sXG5cbiAgc2V0dGVyczoge1xuICAgICdkaXN0YW5jZSc6ICdkaXN0YW5jZScsXG4gICAgJ2xhbmd1YWdlJzogJ2xhbmdDb2RlJyxcbiAgICAnaW50ZXJzZWN0aW9uJzogJ3JldHVybkludGVyc2VjdGlvbidcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMudXJsID0gb3B0aW9ucy51cmwgfHwgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsO1xuICAgIFRhc2sucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICBsYXRsbmc6IGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICB2YXIgY2VudHJvaWQgPSBsYXRMbmcoY29vcmRzKTtcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGNlbnRyb2lkLmxuZyArICcsJyArIGNlbnRyb2lkLmxhdDtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgdmFyIHJlc3VsdDtcblxuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgbGF0bG5nOiBsYXRMbmcocmVzcG9uc2UubG9jYXRpb24ueSwgcmVzcG9uc2UubG9jYXRpb24ueCksXG4gICAgICAgICAgYWRkcmVzczogcmVzcG9uc2UuYWRkcmVzc1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXN1bHQsIHJlc3BvbnNlKTtcbiAgICB9LCB0aGlzKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXZlcnNlR2VvY29kZSAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IFJldmVyc2VHZW9jb2RlKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCByZXZlcnNlR2VvY29kZTtcbiIsImltcG9ydCB7XG4gIGxhdExuZyxcbiAgbGF0TG5nQm91bmRzXG59IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGFzaywgVXRpbCBhcyBFc3JpVXRpbCB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5pbXBvcnQgeyBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmwgfSBmcm9tICcuLi9Fc3JpTGVhZmxldEdlb2NvZGluZyc7XG5cbmV4cG9ydCB2YXIgU3VnZ2VzdCA9IFRhc2suZXh0ZW5kKHtcbiAgcGF0aDogJ3N1Z2dlc3QnLFxuXG4gIHBhcmFtczoge30sXG5cbiAgc2V0dGVyczoge1xuICAgIHRleHQ6ICd0ZXh0JyxcbiAgICBjYXRlZ29yeTogJ2NhdGVnb3J5JyxcbiAgICBjb3VudHJpZXM6ICdjb3VudHJ5Q29kZScsXG4gICAgbWF4U3VnZ2VzdGlvbnM6ICdtYXhTdWdnZXN0aW9ucydcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmICghb3B0aW9ucy51cmwpIHtcbiAgICAgIG9wdGlvbnMudXJsID0gV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsO1xuICAgICAgb3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QgPSB0cnVlO1xuICAgIH1cbiAgICBUYXNrLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gIH0sXG5cbiAgd2l0aGluOiBmdW5jdGlvbiAoYm91bmRzKSB7XG4gICAgYm91bmRzID0gbGF0TG5nQm91bmRzKGJvdW5kcyk7XG4gICAgYm91bmRzID0gYm91bmRzLnBhZCgwLjUpO1xuICAgIHZhciBjZW50ZXIgPSBib3VuZHMuZ2V0Q2VudGVyKCk7XG4gICAgdmFyIG5lID0gYm91bmRzLmdldE5vcnRoV2VzdCgpO1xuICAgIHRoaXMucGFyYW1zLmxvY2F0aW9uID0gY2VudGVyLmxuZyArICcsJyArIGNlbnRlci5sYXQ7XG4gICAgdGhpcy5wYXJhbXMuZGlzdGFuY2UgPSBNYXRoLm1pbihNYXRoLm1heChjZW50ZXIuZGlzdGFuY2VUbyhuZSksIDIwMDApLCA1MDAwMCk7XG4gICAgdGhpcy5wYXJhbXMuc2VhcmNoRXh0ZW50ID0gRXNyaVV0aWwuYm91bmRzVG9FeHRlbnQoYm91bmRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBuZWFyYnk6IGZ1bmN0aW9uIChjb29yZHMsIHJhZGl1cykge1xuICAgIHZhciBjZW50cm9pZCA9IGxhdExuZyhjb29yZHMpO1xuICAgIHRoaXMucGFyYW1zLmxvY2F0aW9uID0gY2VudHJvaWQubG5nICsgJywnICsgY2VudHJvaWQubGF0O1xuICAgIHRoaXMucGFyYW1zLmRpc3RhbmNlID0gTWF0aC5taW4oTWF0aC5tYXgocmFkaXVzLCAyMDAwKSwgNTAwMDApO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSwgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybigndGhpcyBnZW9jb2Rpbmcgc2VydmljZSBkb2VzIG5vdCBzdXBwb3J0IGFza2luZyBmb3Igc3VnZ2VzdGlvbnMnKTtcbiAgICB9XG4gIH1cblxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWdnZXN0IChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgU3VnZ2VzdChvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3VnZ2VzdDtcbiIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuaW1wb3J0IHsgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsIH0gZnJvbSAnLi4vRXNyaUxlYWZsZXRHZW9jb2RpbmcnO1xuaW1wb3J0IGdlb2NvZGUgZnJvbSAnLi4vVGFza3MvR2VvY29kZSc7XG5pbXBvcnQgcmV2ZXJzZUdlb2NvZGUgZnJvbSAnLi4vVGFza3MvUmV2ZXJzZUdlb2NvZGUnO1xuaW1wb3J0IHN1Z2dlc3QgZnJvbSAnLi4vVGFza3MvU3VnZ2VzdCc7XG5cbmV4cG9ydCB2YXIgR2VvY29kZVNlcnZpY2UgPSBTZXJ2aWNlLmV4dGVuZCh7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKG9wdGlvbnMudXJsKSB7XG4gICAgICBTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICB0aGlzLl9jb25maXJtU3VnZ2VzdFN1cHBvcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy51cmwgPSBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmw7XG4gICAgICBvcHRpb25zLnN1cHBvcnRzU3VnZ2VzdCA9IHRydWU7XG4gICAgICBTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfVxuICB9LFxuXG4gIGdlb2NvZGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2VvY29kZSh0aGlzKTtcbiAgfSxcblxuICByZXZlcnNlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJldmVyc2VHZW9jb2RlKHRoaXMpO1xuICB9LFxuXG4gIHN1Z2dlc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyByZXF1aXJlcyBlaXRoZXIgdGhlIEVzcmkgV29ybGQgR2VvY29kaW5nIFNlcnZpY2Ugb3IgYSA8MTAuMyBBcmNHSVMgU2VydmVyIEdlb2NvZGluZyBTZXJ2aWNlIHRoYXQgc3VwcG9ydHMgc3VnZ2VzdC5cbiAgICByZXR1cm4gc3VnZ2VzdCh0aGlzKTtcbiAgfSxcblxuICBfY29uZmlybVN1Z2dlc3RTdXBwb3J0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5tZXRhZGF0YShmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9XG4gICAgICAvLyBwcmUgMTAuMyBnZW9jb2Rpbmcgc2VydmljZXMgZG9udCBsaXN0IGNhcGFiaWxpdGllcyAoYW5kIGRvbnQgc3VwcG9ydCBtYXhMb2NhdGlvbnMpXG4gICAgICAvLyBvbmx5IFNPTUUgaW5kaXZpZHVhbCBzZXJ2aWNlcyBoYXZlIGJlZW4gY29uZmlndXJlZCB0byBzdXBwb3J0IGFza2luZyBmb3Igc3VnZ2VzdGlvbnNcbiAgICAgIGlmICghcmVzcG9uc2UuY2FwYWJpbGl0aWVzKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuY2FwYWJpbGl0aWVzLmluZGV4T2YoJ1N1Z2dlc3QnKSA+IC0xKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnN1cHBvcnRzU3VnZ2VzdCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gd2hldGhlciB0aGUgc2VydmljZSBzdXBwb3J0cyBzdWdnZXN0IG9yIG5vdCwgdXRpbGl6ZSB0aGUgbWV0YWRhdGEgcmVzcG9uc2UgdG8gZGV0ZXJtaW5lIHRoZSBhcHByb3ByaWF0ZSBwYXJhbWV0ZXIgbmFtZSBmb3Igc2luZ2xlIGxpbmUgZ2VvY29kaW5nIHJlcXVlc3RzXG4gICAgICB0aGlzLm9wdGlvbnMuY3VzdG9tUGFyYW0gPSByZXNwb25zZS5zaW5nbGVMaW5lQWRkcmVzc0ZpZWxkLm5hbWU7XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VvY29kZVNlcnZpY2UgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBHZW9jb2RlU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2VvY29kZVNlcnZpY2U7XG4iLCJpbXBvcnQgeyBFdmVudGVkLCBVdGlsLCBsYXRMbmdCb3VuZHMgfSBmcm9tICdsZWFmbGV0JztcblxuZXhwb3J0IHZhciBHZW9zZWFyY2hDb3JlID0gRXZlbnRlZC5leHRlbmQoe1xuXG4gIG9wdGlvbnM6IHtcbiAgICB6b29tVG9SZXN1bHQ6IHRydWUsXG4gICAgdXNlTWFwQm91bmRzOiAxMixcbiAgICBzZWFyY2hCb3VuZHM6IG51bGxcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoY29udHJvbCwgb3B0aW9ucykge1xuICAgIFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9jb250cm9sID0gY29udHJvbDtcblxuICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5wcm92aWRlcnMgfHwgIW9wdGlvbnMucHJvdmlkZXJzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IGF0IGxlYXN0IG9uZSBwcm92aWRlcicpO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb3ZpZGVycyA9IG9wdGlvbnMucHJvdmlkZXJzO1xuICB9LFxuXG4gIF9nZW9jb2RlOiBmdW5jdGlvbiAodGV4dCwga2V5LCBwcm92aWRlcikge1xuICAgIHZhciBhY3RpdmVSZXF1ZXN0cyA9IDA7XG4gICAgdmFyIGFsbFJlc3VsdHMgPSBbXTtcbiAgICB2YXIgYm91bmRzO1xuXG4gICAgdmFyIGNhbGxiYWNrID0gVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cykge1xuICAgICAgYWN0aXZlUmVxdWVzdHMtLTtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICAgIGFsbFJlc3VsdHMgPSBhbGxSZXN1bHRzLmNvbmNhdChyZXN1bHRzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RzIDw9IDApIHtcbiAgICAgICAgYm91bmRzID0gdGhpcy5fYm91bmRzRnJvbVJlc3VsdHMoYWxsUmVzdWx0cyk7XG5cbiAgICAgICAgdGhpcy5maXJlKCdyZXN1bHRzJywge1xuICAgICAgICAgIHJlc3VsdHM6IGFsbFJlc3VsdHMsXG4gICAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgICAgbGF0bG5nOiAoYm91bmRzKSA/IGJvdW5kcy5nZXRDZW50ZXIoKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuem9vbVRvUmVzdWx0ICYmIGJvdW5kcykge1xuICAgICAgICAgIHRoaXMuX2NvbnRyb2wuX21hcC5maXRCb3VuZHMoYm91bmRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlyZSgnbG9hZCcpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgYWN0aXZlUmVxdWVzdHMrKztcbiAgICAgIHByb3ZpZGVyLnJlc3VsdHModGV4dCwga2V5LCB0aGlzLl9zZWFyY2hCb3VuZHMoKSwgY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3Byb3ZpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBhY3RpdmVSZXF1ZXN0cysrO1xuICAgICAgICB0aGlzLl9wcm92aWRlcnNbaV0ucmVzdWx0cyh0ZXh0LCBrZXksIHRoaXMuX3NlYXJjaEJvdW5kcygpLCBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9zdWdnZXN0OiBmdW5jdGlvbiAodGV4dCkge1xuICAgIHZhciBhY3RpdmVSZXF1ZXN0cyA9IHRoaXMuX3Byb3ZpZGVycy5sZW5ndGg7XG5cbiAgICB2YXIgY3JlYXRlQ2FsbGJhY2sgPSBVdGlsLmJpbmQoZnVuY3Rpb24gKHRleHQsIHByb3ZpZGVyKSB7XG4gICAgICByZXR1cm4gVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RzID0gYWN0aXZlUmVxdWVzdHMgLSAxO1xuXG4gICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdWdnZXN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3VnZ2VzdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zW2ldLnByb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHdlIHN0aWxsIG5lZWQgdG8gdXBkYXRlIHRoZSBVSVxuICAgICAgICAgIHRoaXMuX2NvbnRyb2wuX3JlbmRlclN1Z2dlc3Rpb25zKHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm92aWRlci5fbGFzdFJlbmRlciAhPT0gdGV4dCAmJiBwcm92aWRlci5ub2Rlcykge1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwcm92aWRlci5ub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb3ZpZGVyLm5vZGVzW2ldLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5fY29udHJvbC5fc3VnZ2VzdGlvbnMucmVtb3ZlQ2hpbGQocHJvdmlkZXIubm9kZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHByb3ZpZGVyLm5vZGVzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoICYmIHRoaXMuX2NvbnRyb2wuX2lucHV0LnZhbHVlID09PSB0ZXh0KSB7XG4gICAgICAgICAgdGhpcy5fY29udHJvbC5jbGVhclN1Z2dlc3Rpb25zKHByb3ZpZGVyLm5vZGVzKTtcblxuICAgICAgICAgIHByb3ZpZGVyLl9sYXN0UmVuZGVyID0gdGV4dDtcbiAgICAgICAgICBwcm92aWRlci5ub2RlcyA9IHRoaXMuX2NvbnRyb2wuX3JlbmRlclN1Z2dlc3Rpb25zKHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICB0aGlzLl9jb250cm9sLl9ub2RlcyA9IFtdO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHRoaXMuX3BlbmRpbmdTdWdnZXN0aW9ucyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9wcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwcm92aWRlciA9IHRoaXMuX3Byb3ZpZGVyc1tpXTtcbiAgICAgIHZhciByZXF1ZXN0ID0gcHJvdmlkZXIuc3VnZ2VzdGlvbnModGV4dCwgdGhpcy5fc2VhcmNoQm91bmRzKCksIGNyZWF0ZUNhbGxiYWNrKHRleHQsIHByb3ZpZGVyKSk7XG4gICAgICB0aGlzLl9wZW5kaW5nU3VnZ2VzdGlvbnMucHVzaChyZXF1ZXN0KTtcbiAgICB9XG4gIH0sXG5cbiAgX3NlYXJjaEJvdW5kczogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc2VhcmNoQm91bmRzICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNlYXJjaEJvdW5kcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZU1hcEJvdW5kcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlTWFwQm91bmRzID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udHJvbC5fbWFwLmdldEJvdW5kcygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlTWFwQm91bmRzIDw9IHRoaXMuX2NvbnRyb2wuX21hcC5nZXRab29tKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb250cm9sLl9tYXAuZ2V0Qm91bmRzKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgX2JvdW5kc0Zyb21SZXN1bHRzOiBmdW5jdGlvbiAocmVzdWx0cykge1xuICAgIGlmICghcmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbnVsbElzbGFuZCA9IGxhdExuZ0JvdW5kcyhbMCwgMF0sIFswLCAwXSk7XG4gICAgdmFyIHJlc3VsdEJvdW5kcyA9IFtdO1xuICAgIHZhciByZXN1bHRMYXRsbmdzID0gW107XG5cbiAgICAvLyBjb2xsZWN0IHRoZSBib3VuZHMgYW5kIGNlbnRlciBvZiBlYWNoIHJlc3VsdFxuICAgIGZvciAodmFyIGkgPSByZXN1bHRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gcmVzdWx0c1tpXTtcblxuICAgICAgcmVzdWx0TGF0bG5ncy5wdXNoKHJlc3VsdC5sYXRsbmcpO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgYm91bmRzIGFyZSB2YWxpZCBhbmQgbm90IDAsMC4gc29tZXRpbWVzIGJvdW5kcyBhcmUgaW5jb3JyZWN0IG9yIG5vdCBwcmVzZW50XG4gICAgICBpZiAocmVzdWx0LmJvdW5kcyAmJiByZXN1bHQuYm91bmRzLmlzVmFsaWQoKSAmJiAhcmVzdWx0LmJvdW5kcy5lcXVhbHMobnVsbElzbGFuZCkpIHtcbiAgICAgICAgcmVzdWx0Qm91bmRzLnB1c2gocmVzdWx0LmJvdW5kcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZm9ybSBhIGJvdW5kcyBvYmplY3QgY29udGFpbmluZyBhbGwgY2VudGVyIHBvaW50c1xuICAgIHZhciBib3VuZHMgPSBsYXRMbmdCb3VuZHMocmVzdWx0TGF0bG5ncyk7XG5cbiAgICAvLyBhbmQgZXh0ZW5kIGl0IHRvIGNvbnRhaW4gYWxsIGJvdW5kcyBvYmplY3RzXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXN1bHRCb3VuZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGJvdW5kcy5leHRlbmQocmVzdWx0Qm91bmRzW2pdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9LFxuXG4gIF9nZXRBdHRyaWJ1dGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBhdHRyaWJzID0gW107XG4gICAgdmFyIHByb3ZpZGVycyA9IHRoaXMuX3Byb3ZpZGVycztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocHJvdmlkZXJzW2ldLm9wdGlvbnMuYXR0cmlidXRpb24pIHtcbiAgICAgICAgYXR0cmlicy5wdXNoKHByb3ZpZGVyc1tpXS5vcHRpb25zLmF0dHJpYnV0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXR0cmlicy5qb2luKCcsICcpO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2Vvc2VhcmNoQ29yZSAoY29udHJvbCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IEdlb3NlYXJjaENvcmUoY29udHJvbCwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlb3NlYXJjaENvcmU7XG4iLCJpbXBvcnQgeyBHZW9jb2RlU2VydmljZSB9IGZyb20gJy4uL1NlcnZpY2VzL0dlb2NvZGUnO1xuXG5leHBvcnQgdmFyIEFyY2dpc09ubGluZVByb3ZpZGVyID0gR2VvY29kZVNlcnZpY2UuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIGxhYmVsOiAnUGxhY2VzIGFuZCBBZGRyZXNzZXMnLFxuICAgIG1heFJlc3VsdHM6IDVcbiAgfSxcblxuICBzdWdnZXN0aW9uczogZnVuY3Rpb24gKHRleHQsIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxdWVzdCA9IHRoaXMuc3VnZ2VzdCgpLnRleHQodGV4dCk7XG5cbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICByZXF1ZXN0LndpdGhpbihib3VuZHMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY291bnRyaWVzKSB7XG4gICAgICByZXF1ZXN0LmNvdW50cmllcyh0aGlzLm9wdGlvbnMuY291bnRyaWVzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNhdGVnb3JpZXMpIHtcbiAgICAgIHJlcXVlc3QuY2F0ZWdvcnkodGhpcy5vcHRpb25zLmNhdGVnb3JpZXMpO1xuICAgIH1cblxuICAgIC8vIDE1IGlzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBzdWdnZXN0aW9ucyB0aGF0IGNhbiBiZSByZXR1cm5lZFxuICAgIHJlcXVlc3QubWF4U3VnZ2VzdGlvbnModGhpcy5vcHRpb25zLm1heFJlc3VsdHMpO1xuXG4gICAgcmV0dXJuIHJlcXVlc3QucnVuKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmVzcG9uc2UpIHtcbiAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICB3aGlsZSAocmVzcG9uc2Uuc3VnZ2VzdGlvbnMubGVuZ3RoICYmIHN1Z2dlc3Rpb25zLmxlbmd0aCA8PSAodGhpcy5vcHRpb25zLm1heFJlc3VsdHMgLSAxKSkge1xuICAgICAgICAgIHZhciBzdWdnZXN0aW9uID0gcmVzcG9uc2Uuc3VnZ2VzdGlvbnMuc2hpZnQoKTtcbiAgICAgICAgICBpZiAoIXN1Z2dlc3Rpb24uaXNDb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgdGV4dDogc3VnZ2VzdGlvbi50ZXh0LFxuICAgICAgICAgICAgICB1bmZvcm1hdHRlZFRleHQ6IHN1Z2dlc3Rpb24udGV4dCxcbiAgICAgICAgICAgICAgbWFnaWNLZXk6IHN1Z2dlc3Rpb24ubWFnaWNLZXlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FsbGJhY2soZXJyb3IsIHN1Z2dlc3Rpb25zKTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB0aGlzLmdlb2NvZGUoKS50ZXh0KHRleHQpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgcmVxdWVzdC5rZXkoa2V5KTtcbiAgICB9XG4gICAgLy8gaW4gdGhlIGZ1dHVyZSBBZGRyZXNzL1N0cmVldE5hbWUgZ2VvY29kaW5nIHJlcXVlc3RzIHRoYXQgaW5jbHVkZSBhIG1hZ2ljS2V5IHdpbGwgYWx3YXlzIG9ubHkgcmV0dXJuIG9uZSBtYXRjaFxuICAgIHJlcXVlc3QubWF4TG9jYXRpb25zKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzKTtcblxuICAgIGlmIChib3VuZHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aGluKGJvdW5kcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5mb3JTdG9yYWdlKSB7XG4gICAgICByZXF1ZXN0LmZvclN0b3JhZ2UodHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcXVlc3QucnVuKGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgIGNhbGxiYWNrKGVycm9yLCByZXNwb25zZS5yZXN1bHRzKTtcbiAgICB9LCB0aGlzKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmNnaXNPbmxpbmVQcm92aWRlciAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEFyY2dpc09ubGluZVByb3ZpZGVyKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcmNnaXNPbmxpbmVQcm92aWRlcjtcbiIsImltcG9ydCB7XG4gIENvbnRyb2wsXG4gIERvbUV2ZW50LFxuICBEb21VdGlsLFxuICBFdmVudGVkLFxuICBVdGlsLFxuICBsYXRMbmdCb3VuZHNcbn0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBnZW9zZWFyY2hDb3JlIH0gZnJvbSAnLi4vQ2xhc3Nlcy9HZW9zZWFyY2hDb3JlJztcbmltcG9ydCB7IGFyY2dpc09ubGluZVByb3ZpZGVyIH0gZnJvbSAnLi4vUHJvdmlkZXJzL0FyY2dpc09ubGluZUdlb2NvZGVyJztcbmltcG9ydCB7IFV0aWwgYXMgRXNyaVV0aWwgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuXG5leHBvcnQgdmFyIEdlb3NlYXJjaCA9IENvbnRyb2wuZXh0ZW5kKHtcbiAgaW5jbHVkZXM6IEV2ZW50ZWQucHJvdG90eXBlLFxuXG4gIG9wdGlvbnM6IHtcbiAgICBwb3NpdGlvbjogJ3RvcGxlZnQnLFxuICAgIGNvbGxhcHNlQWZ0ZXJSZXN1bHQ6IHRydWUsXG4gICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgIGFsbG93TXVsdGlwbGVSZXN1bHRzOiB0cnVlLFxuICAgIHBsYWNlaG9sZGVyOiAnU2VhcmNoIGZvciBwbGFjZXMgb3IgYWRkcmVzc2VzJyxcbiAgICB0aXRsZTogJ0xvY2F0aW9uIFNlYXJjaCdcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblxuICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5wcm92aWRlcnMgfHwgIW9wdGlvbnMucHJvdmlkZXJzLmxlbmd0aCkge1xuICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMucHJvdmlkZXJzID0gWyBhcmNnaXNPbmxpbmVQcm92aWRlcigpIF07XG4gICAgfVxuXG4gICAgLy8gaW5zdGFudGlhdGUgdGhlIHVuZGVybHlpbmcgY2xhc3MgYW5kIHBhc3MgYWxvbmcgb3B0aW9uc1xuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUgPSBnZW9zZWFyY2hDb3JlKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX3Byb3ZpZGVycyA9IG9wdGlvbnMucHJvdmlkZXJzO1xuXG4gICAgLy8gYnViYmxlIGVhY2ggcHJvdmlkZXJzIGV2ZW50cyB0byB0aGUgY29udHJvbFxuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuYWRkRXZlbnRQYXJlbnQodGhpcyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX3Byb3ZpZGVyc1tpXS5hZGRFdmVudFBhcmVudCh0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wZW5kaW5nU3VnZ2VzdGlvbnMgPSBbXTtcblxuICAgIENvbnRyb2wucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbChvcHRpb25zKTtcbiAgfSxcblxuICBfcmVuZGVyU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uIChzdWdnZXN0aW9ucykge1xuICAgIHZhciBjdXJyZW50R3JvdXA7XG5cbiAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuICAgIC8vIHNldCB0aGUgbWF4SGVpZ2h0IG9mIHRoZSBzdWdnZXN0aW9ucyBib3ggdG9cbiAgICAvLyBtYXAgaGVpZ2h0XG4gICAgLy8gLSBzdWdnZXN0aW9ucyBvZmZzZXQgKGRpc3RhbmNlIGZyb20gdG9wIG9mIHN1Z2dlc3Rpb25zIHRvIHRvcCBvZiBjb250cm9sKVxuICAgIC8vIC0gY29udHJvbCBvZmZzZXQgKGRpc3RhbmNlIGZyb20gdG9wIG9mIGNvbnRyb2wgdG8gdG9wIG9mIG1hcClcbiAgICAvLyAtIDEwIChleHRyYSBwYWRkaW5nKVxuICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLm1heEhlaWdodCA9ICh0aGlzLl9tYXAuZ2V0U2l6ZSgpLnkgLSB0aGlzLl9zdWdnZXN0aW9ucy5vZmZzZXRUb3AgLSB0aGlzLl93cmFwcGVyLm9mZnNldFRvcCAtIDEwKSArICdweCc7XG5cbiAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICB2YXIgbGlzdDtcbiAgICB2YXIgaGVhZGVyO1xuICAgIHZhciBzdWdnZXN0aW9uVGV4dEFycmF5ID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1Z2dlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc3VnZ2VzdGlvbiA9IHN1Z2dlc3Rpb25zW2ldO1xuICAgICAgaWYgKCFoZWFkZXIgJiYgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcHJvdmlkZXJzLmxlbmd0aCA+IDEgJiYgY3VycmVudEdyb3VwICE9PSBzdWdnZXN0aW9uLnByb3ZpZGVyLm9wdGlvbnMubGFiZWwpIHtcbiAgICAgICAgaGVhZGVyID0gRG9tVXRpbC5jcmVhdGUoJ3NwYW4nLCAnZ2VvY29kZXItY29udHJvbC1oZWFkZXInLCB0aGlzLl9zdWdnZXN0aW9ucyk7XG4gICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IHN1Z2dlc3Rpb24ucHJvdmlkZXIub3B0aW9ucy5sYWJlbDtcbiAgICAgICAgaGVhZGVyLmlubmVyVGV4dCA9IHN1Z2dlc3Rpb24ucHJvdmlkZXIub3B0aW9ucy5sYWJlbDtcbiAgICAgICAgY3VycmVudEdyb3VwID0gc3VnZ2VzdGlvbi5wcm92aWRlci5vcHRpb25zLmxhYmVsO1xuICAgICAgICBub2Rlcy5wdXNoKGhlYWRlcik7XG4gICAgICB9XG5cbiAgICAgIGlmICghbGlzdCkge1xuICAgICAgICBsaXN0ID0gRG9tVXRpbC5jcmVhdGUoJ3VsJywgJ2dlb2NvZGVyLWNvbnRyb2wtbGlzdCcsIHRoaXMuX3N1Z2dlc3Rpb25zKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN1Z2dlc3Rpb25UZXh0QXJyYXkuaW5kZXhPZihzdWdnZXN0aW9uLnRleHQpID09PSAtMSkge1xuICAgICAgICB2YXIgc3VnZ2VzdGlvbkl0ZW0gPSBEb21VdGlsLmNyZWF0ZSgnbGknLCAnZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9uJywgbGlzdCk7XG5cbiAgICAgICAgc3VnZ2VzdGlvbkl0ZW0uaW5uZXJIVE1MID0gc3VnZ2VzdGlvbi50ZXh0O1xuICAgICAgICBzdWdnZXN0aW9uSXRlbS5wcm92aWRlciA9IHN1Z2dlc3Rpb24ucHJvdmlkZXI7XG4gICAgICAgIHN1Z2dlc3Rpb25JdGVtWydkYXRhLW1hZ2ljLWtleSddID0gc3VnZ2VzdGlvbi5tYWdpY0tleTtcbiAgICAgICAgc3VnZ2VzdGlvbkl0ZW0udW5mb3JtYXR0ZWRUZXh0ID0gc3VnZ2VzdGlvbi51bmZvcm1hdHRlZFRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxpc3QuY2hpbGROb2Rlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIC8vIGlmIHRoZSBzYW1lIHRleHQgYWxyZWFkeSBhcHBlYXJzIGluIHRoZSBsaXN0IG9mIHN1Z2dlc3Rpb25zLCBhcHBlbmQgYW4gYWRkaXRpb25hbCBPYmplY3RJRCB0byBpdHMgbWFnaWNLZXkgaW5zdGVhZFxuICAgICAgICAgIGlmIChsaXN0LmNoaWxkTm9kZXNbal0uaW5uZXJIVE1MID09PSBzdWdnZXN0aW9uLnRleHQpIHtcbiAgICAgICAgICAgIGxpc3QuY2hpbGROb2Rlc1tqXVsnZGF0YS1tYWdpYy1rZXknXSArPSAnLCcgKyBzdWdnZXN0aW9uLm1hZ2ljS2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc3VnZ2VzdGlvblRleHRBcnJheS5wdXNoKHN1Z2dlc3Rpb24udGV4dCk7XG4gICAgfVxuXG4gICAgRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9pbnB1dCwgJ2dlb2NvZGVyLWNvbnRyb2wtbG9hZGluZycpO1xuXG4gICAgbm9kZXMucHVzaChsaXN0KTtcblxuICAgIHJldHVybiBub2RlcztcbiAgfSxcblxuICBfYm91bmRzRnJvbVJlc3VsdHM6IGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgaWYgKCFyZXN1bHRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBudWxsSXNsYW5kID0gbGF0TG5nQm91bmRzKFswLCAwXSwgWzAsIDBdKTtcbiAgICB2YXIgcmVzdWx0Qm91bmRzID0gW107XG4gICAgdmFyIHJlc3VsdExhdGxuZ3MgPSBbXTtcblxuICAgIC8vIGNvbGxlY3QgdGhlIGJvdW5kcyBhbmQgY2VudGVyIG9mIGVhY2ggcmVzdWx0XG4gICAgZm9yICh2YXIgaSA9IHJlc3VsdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciByZXN1bHQgPSByZXN1bHRzW2ldO1xuXG4gICAgICByZXN1bHRMYXRsbmdzLnB1c2gocmVzdWx0LmxhdGxuZyk7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSBib3VuZHMgYXJlIHZhbGlkIGFuZCBub3QgMCwwLiBzb21ldGltZXMgYm91bmRzIGFyZSBpbmNvcnJlY3Qgb3Igbm90IHByZXNlbnRcbiAgICAgIGlmIChyZXN1bHQuYm91bmRzICYmIHJlc3VsdC5ib3VuZHMuaXNWYWxpZCgpICYmICFyZXN1bHQuYm91bmRzLmVxdWFscyhudWxsSXNsYW5kKSkge1xuICAgICAgICByZXN1bHRCb3VuZHMucHVzaChyZXN1bHQuYm91bmRzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmb3JtIGEgYm91bmRzIG9iamVjdCBjb250YWluaW5nIGFsbCBjZW50ZXIgcG9pbnRzXG4gICAgdmFyIGJvdW5kcyA9IGxhdExuZ0JvdW5kcyhyZXN1bHRMYXRsbmdzKTtcblxuICAgIC8vIGFuZCBleHRlbmQgaXQgdG8gY29udGFpbiBhbGwgYm91bmRzIG9iamVjdHNcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlc3VsdEJvdW5kcy5sZW5ndGg7IGorKykge1xuICAgICAgYm91bmRzLmV4dGVuZChyZXN1bHRCb3VuZHNbal0pO1xuICAgIH1cblxuICAgIHJldHVybiBib3VuZHM7XG4gIH0sXG5cbiAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9zdWdnZXN0aW9ucy5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRoaXMuX2lucHV0LnZhbHVlID0gJyc7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbGxhcHNlQWZ0ZXJSZXN1bHQpIHtcbiAgICAgIHRoaXMuX2lucHV0LnBsYWNlaG9sZGVyID0gJyc7XG4gICAgICBEb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9tYXAuc2Nyb2xsV2hlZWxab29tLmVuYWJsZWQoKSAmJiB0aGlzLl9tYXAub3B0aW9ucy5zY3JvbGxXaGVlbFpvb20pIHtcbiAgICAgIHRoaXMuX21hcC5zY3JvbGxXaGVlbFpvb20uZW5hYmxlKCk7XG4gICAgfVxuICB9LFxuXG4gIGNsZWFyU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fbm9kZXMpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5fbm9kZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgaWYgKHRoaXMuX25vZGVzW2tdLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5yZW1vdmVDaGlsZCh0aGlzLl9ub2Rlc1trXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX3NldHVwQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICBEb21VdGlsLmFkZENsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XG4gICAgdGhpcy5faW5wdXQuZm9jdXMoKTtcbiAgfSxcblxuICBkaXNhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5faW5wdXQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIERvbVV0aWwuYWRkQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWlucHV0LWRpc2FibGVkJyk7XG4gICAgRG9tRXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5fd3JhcHBlciwgJ2NsaWNrJywgdGhpcy5fc2V0dXBDbGljaywgdGhpcyk7XG4gIH0sXG5cbiAgZW5hYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5faW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBEb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1pbnB1dC1kaXNhYmxlZCcpO1xuICAgIERvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX3dyYXBwZXIsICdjbGljaycsIHRoaXMuX3NldHVwQ2xpY2ssIHRoaXMpO1xuICB9LFxuXG4gIGdldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGF0dHJpYnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5fcHJvdmlkZXJzW2ldLm9wdGlvbnMuYXR0cmlidXRpb24pIHtcbiAgICAgICAgYXR0cmlicy5wdXNoKHRoaXMuX3Byb3ZpZGVyc1tpXS5vcHRpb25zLmF0dHJpYnV0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXR0cmlicy5qb2luKCcsICcpO1xuICB9LFxuXG4gIGdlb2NvZGVTdWdnZXN0aW9uOiBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBzdWdnZXN0aW9uSXRlbSA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuICAgIC8vIG1ha2Ugc3VyZSBhbmQgcG9pbnQgYXQgdGhlIGFjdHVhbCAnZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9uJ1xuICAgIGlmIChzdWdnZXN0aW9uSXRlbS5jbGFzc0xpc3QubGVuZ3RoIDwgMSkge1xuICAgICAgc3VnZ2VzdGlvbkl0ZW0gPSBzdWdnZXN0aW9uSXRlbS5wYXJlbnROb2RlO1xuICAgIH1cblxuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX2dlb2NvZGUoc3VnZ2VzdGlvbkl0ZW0udW5mb3JtYXR0ZWRUZXh0LCBzdWdnZXN0aW9uSXRlbVsnZGF0YS1tYWdpYy1rZXknXSwgc3VnZ2VzdGlvbkl0ZW0ucHJvdmlkZXIpO1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgfSxcblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIC8vIGluY2x1ZGUgJ1Bvd2VyZWQgYnkgRXNyaScgaW4gbWFwIGF0dHJpYnV0aW9uXG4gICAgRXNyaVV0aWwuc2V0RXNyaUF0dHJpYnV0aW9uKG1hcCk7XG5cbiAgICB0aGlzLl9tYXAgPSBtYXA7XG4gICAgdGhpcy5fd3JhcHBlciA9IERvbVV0aWwuY3JlYXRlKCdkaXYnLCAnZ2VvY29kZXItY29udHJvbCcpO1xuICAgIHRoaXMuX2lucHV0ID0gRG9tVXRpbC5jcmVhdGUoJ2lucHV0JywgJ2dlb2NvZGVyLWNvbnRyb2wtaW5wdXQgbGVhZmxldC1iYXInLCB0aGlzLl93cmFwcGVyKTtcbiAgICB0aGlzLl9pbnB1dC50aXRsZSA9IHRoaXMub3B0aW9ucy50aXRsZTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZXhwYW5kZWQpIHtcbiAgICAgIERvbVV0aWwuYWRkQ2xhc3ModGhpcy5fd3JhcHBlciwgJ2dlb2NvZGVyLWNvbnRyb2wtZXhwYW5kZWQnKTtcbiAgICAgIHRoaXMuX2lucHV0LnBsYWNlaG9sZGVyID0gdGhpcy5vcHRpb25zLnBsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIHRoaXMuX3N1Z2dlc3Rpb25zID0gRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdnZW9jb2Rlci1jb250cm9sLXN1Z2dlc3Rpb25zIGxlYWZsZXQtYmFyJywgdGhpcy5fd3JhcHBlcik7XG5cbiAgICB2YXIgY3JlZGl0cyA9IHRoaXMuX2dlb3NlYXJjaENvcmUuX2dldEF0dHJpYnV0aW9uKCk7XG4gICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5hZGRBdHRyaWJ1dGlvbihjcmVkaXRzKTtcblxuICAgIERvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX2lucHV0LCAnZm9jdXMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdGhpcy5faW5wdXQucGxhY2Vob2xkZXIgPSB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXI7XG4gICAgICBEb21VdGlsLmFkZENsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICBEb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl93cmFwcGVyLCAnY2xpY2snLCB0aGlzLl9zZXR1cENsaWNrLCB0aGlzKTtcblxuICAgIC8vIG1ha2Ugc3VyZSBib3RoIGNsaWNrIGFuZCB0b3VjaCBzcGF3biBhbiBhZGRyZXNzL3BvaSBzZWFyY2hcbiAgICBEb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9zdWdnZXN0aW9ucywgJ21vdXNlZG93bicsIHRoaXMuZ2VvY29kZVN1Z2dlc3Rpb24sIHRoaXMpO1xuICAgIERvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX3N1Z2dlc3Rpb25zLCAndG91Y2hlbmQnLCB0aGlzLmdlb2NvZGVTdWdnZXN0aW9uLCB0aGlzKTtcblxuICAgIERvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX2lucHV0LCAnYmx1cicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICBEb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIHRleHQgPSAoZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50KS52YWx1ZTtcblxuICAgICAgRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl93cmFwcGVyLCAnZ2VvY29kZXItY29udHJvbC1leHBhbmRlZCcpO1xuXG4gICAgICB2YXIgbGlzdCA9IHRoaXMuX3N1Z2dlc3Rpb25zLnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgJ2dlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbicpO1xuICAgICAgdmFyIHNlbGVjdGVkID0gdGhpcy5fc3VnZ2VzdGlvbnMucXVlcnlTZWxlY3RvckFsbCgnLicgKyAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpWzBdO1xuICAgICAgdmFyIHNlbGVjdGVkUG9zaXRpb247XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobGlzdFtpXSA9PT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICBzZWxlY3RlZFBvc2l0aW9uID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgIC8qXG4gICAgICAgICAgICBpZiBhbiBpdGVtIGhhcyBiZWVuIHNlbGVjdGVkLCBnZW9jb2RlIGl0XG4gICAgICAgICAgICBpZiBmb2N1cyBpcyBvbiB0aGUgaW5wdXQgdGV4dGJveCwgZ2VvY29kZSBvbmx5IGlmIG11bHRpcGxlIHJlc3VsdHMgYXJlIGFsbG93ZWQgYW5kIG1vcmUgdGhhbiB0d28gY2hhcmFjdGVycyBhcmUgcHJlc2VudCwgb3IgaWYgYSBzaW5nbGUgc3VnZ2VzdGlvbiBpcyBkaXNwbGF5ZWQuXG4gICAgICAgICAgICBpZiBsZXNzIHRoYW4gdHdvIGNoYXJhY3RlcnMgaGF2ZSBiZWVuIHR5cGVkLCBhYm9ydCB0aGUgZ2VvY29kZVxuICAgICAgICAgICovXG4gICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9nZW9jb2RlKHNlbGVjdGVkLnVuZm9ybWF0dGVkVGV4dCwgc2VsZWN0ZWRbJ2RhdGEtbWFnaWMta2V5J10sIHNlbGVjdGVkLnByb3ZpZGVyKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5hbGxvd011bHRpcGxlUmVzdWx0cyAmJiB0ZXh0Lmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9nZW9jb2RlKHRoaXMuX2lucHV0LnZhbHVlLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgRG9tVXRpbC5hZGRDbGFzcyhsaXN0WzBdLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9nZW9jb2RlKGxpc3RbMF0uaW5uZXJIVE1MLCBsaXN0WzBdWydkYXRhLW1hZ2ljLWtleSddLCBsaXN0WzBdLnByb3ZpZGVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgdGhpcy5faW5wdXQuYmx1cigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBEb21FdmVudC5wcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIERvbVV0aWwucmVtb3ZlQ2xhc3Moc2VsZWN0ZWQsICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHByZXZpb3VzSXRlbSA9IGxpc3Rbc2VsZWN0ZWRQb3NpdGlvbiAtIDFdO1xuXG4gICAgICAgICAgaWYgKHNlbGVjdGVkICYmIHByZXZpb3VzSXRlbSkge1xuICAgICAgICAgICAgRG9tVXRpbC5hZGRDbGFzcyhwcmV2aW91c0l0ZW0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIERvbVV0aWwuYWRkQ2xhc3MobGlzdFtsaXN0Lmxlbmd0aCAtIDFdLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBEb21FdmVudC5wcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIERvbVV0aWwucmVtb3ZlQ2xhc3Moc2VsZWN0ZWQsICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG5leHRJdGVtID0gbGlzdFtzZWxlY3RlZFBvc2l0aW9uICsgMV07XG5cbiAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgbmV4dEl0ZW0pIHtcbiAgICAgICAgICAgIERvbVV0aWwuYWRkQ2xhc3MobmV4dEl0ZW0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIERvbVV0aWwuYWRkQ2xhc3MobGlzdFswXSwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gd2hlbiB0aGUgaW5wdXQgY2hhbmdlcyB3ZSBzaG91bGQgY2FuY2VsIGFsbCBwZW5kaW5nIHN1Z2dlc3Rpb24gcmVxdWVzdHMgaWYgcG9zc2libGUgdG8gYXZvaWQgcmVzdWx0IGNvbGxpc2lvbnNcbiAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHRoaXMuX2dlb3NlYXJjaENvcmUuX3BlbmRpbmdTdWdnZXN0aW9ucy5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wZW5kaW5nU3VnZ2VzdGlvbnNbeF07XG4gICAgICAgICAgICBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LmFib3J0ICYmICFyZXF1ZXN0LmlkKSB7XG4gICAgICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG5cbiAgICBEb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9pbnB1dCwgJ2tleXVwJywgVXRpbC50aHJvdHRsZShmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgICAgdmFyIHRleHQgPSAoZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50KS52YWx1ZTtcblxuICAgICAgLy8gcmVxdWlyZSBhdCBsZWFzdCAyIGNoYXJhY3RlcnMgZm9yIHN1Z2dlc3Rpb25zXG4gICAgICBpZiAodGV4dC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBEb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1sb2FkaW5nJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhpcyBpcyB0aGUgZXNjYXBlIGtleSBpdCB3aWxsIGNsZWFyIHRoZSBpbnB1dCBzbyBjbGVhciBzdWdnZXN0aW9uc1xuICAgICAgaWYgKGtleSA9PT0gMjcpIHtcbiAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhpcyBpcyBOT1QgdGhlIHVwL2Rvd24gYXJyb3dzIG9yIGVudGVyIG1ha2UgYSBzdWdnZXN0aW9uXG4gICAgICBpZiAoa2V5ICE9PSAxMyAmJiBrZXkgIT09IDM4ICYmIGtleSAhPT0gNDApIHtcbiAgICAgICAgaWYgKHRoaXMuX2lucHV0LnZhbHVlICE9PSB0aGlzLl9sYXN0VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl9sYXN0VmFsdWUgPSB0aGlzLl9pbnB1dC52YWx1ZTtcbiAgICAgICAgICBEb21VdGlsLmFkZENsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1sb2FkaW5nJyk7XG4gICAgICAgICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fc3VnZ2VzdCh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDUwLCB0aGlzKSwgdGhpcyk7XG5cbiAgICBEb21FdmVudC5kaXNhYmxlQ2xpY2tQcm9wYWdhdGlvbih0aGlzLl93cmFwcGVyKTtcblxuICAgIC8vIHdoZW4gbW91c2UgbW92ZXMgb3ZlciBzdWdnZXN0aW9ucyBkaXNhYmxlIHNjcm9sbCB3aGVlbCB6b29tIGlmIGl0cyBlbmFibGVkXG4gICAgRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fc3VnZ2VzdGlvbnMsICdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKG1hcC5zY3JvbGxXaGVlbFpvb20uZW5hYmxlZCgpICYmIG1hcC5vcHRpb25zLnNjcm9sbFdoZWVsWm9vbSkge1xuICAgICAgICBtYXAuc2Nyb2xsV2hlZWxab29tLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHdoZW4gbW91c2UgbW92ZXMgbGVhdmVzIHN1Z2dlc3Rpb25zIGVuYWJsZSBzY3JvbGwgd2hlZWwgem9vbSBpZiBpdHMgZGlzYWJsZWRcbiAgICBEb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9zdWdnZXN0aW9ucywgJ21vdXNlb3V0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmICghbWFwLnNjcm9sbFdoZWVsWm9vbS5lbmFibGVkKCkgJiYgbWFwLm9wdGlvbnMuc2Nyb2xsV2hlZWxab29tKSB7XG4gICAgICAgIG1hcC5zY3JvbGxXaGVlbFpvb20uZW5hYmxlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLm9uKCdsb2FkJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIERvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWxvYWRpbmcnKTtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMuX2lucHV0LmJsdXIoKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHJldHVybiB0aGlzLl93cmFwcGVyO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlb3NlYXJjaCAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEdlb3NlYXJjaChvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2Vvc2VhcmNoO1xuIiwiaW1wb3J0IHsgVXRpbCwgZ2VvSnNvbiwgbGF0TG5nQm91bmRzIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBGZWF0dXJlTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcblxuZXhwb3J0IHZhciBGZWF0dXJlTGF5ZXJQcm92aWRlciA9IEZlYXR1cmVMYXllclNlcnZpY2UuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIGxhYmVsOiAnRmVhdHVyZSBMYXllcicsXG4gICAgbWF4UmVzdWx0czogNSxcbiAgICBidWZmZXJSYWRpdXM6IDEwMDAsXG4gICAgZm9ybWF0U3VnZ2VzdGlvbjogZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgIHJldHVybiBmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkc1swXV07XG4gICAgfVxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgRmVhdHVyZUxheWVyU2VydmljZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMgPSBbdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkc107XG4gICAgfVxuICAgIHRoaXMuX3N1Z2dlc3Rpb25zUXVlcnkgPSB0aGlzLnF1ZXJ5KCk7XG4gICAgdGhpcy5fcmVzdWx0c1F1ZXJ5ID0gdGhpcy5xdWVyeSgpO1xuICB9LFxuXG4gIHN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAodGV4dCwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciBxdWVyeSA9IHRoaXMuX3N1Z2dlc3Rpb25zUXVlcnkud2hlcmUodGhpcy5fYnVpbGRRdWVyeSh0ZXh0KSlcbiAgICAgIC5yZXR1cm5HZW9tZXRyeShmYWxzZSk7XG5cbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICBxdWVyeS5pbnRlcnNlY3RzKGJvdW5kcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pZEZpZWxkKSB7XG4gICAgICBxdWVyeS5maWVsZHMoW3RoaXMub3B0aW9ucy5pZEZpZWxkXS5jb25jYXQodGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcykpO1xuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gcXVlcnkucnVuKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cywgcmF3KSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIFtdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5pZEZpZWxkID0gcmF3Lm9iamVjdElkRmllbGROYW1lO1xuICAgICAgICB2YXIgc3VnZ2VzdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHJlc3VsdHMuZmVhdHVyZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB2YXIgZmVhdHVyZSA9IHJlc3VsdHMuZmVhdHVyZXNbaV07XG4gICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICB0ZXh0OiB0aGlzLm9wdGlvbnMuZm9ybWF0U3VnZ2VzdGlvbi5jYWxsKHRoaXMsIGZlYXR1cmUpLFxuICAgICAgICAgICAgdW5mb3JtYXR0ZWRUZXh0OiBmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkc1swXV0sXG4gICAgICAgICAgICBtYWdpY0tleTogZmVhdHVyZS5pZFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBzdWdnZXN0aW9ucy5zbGljZSgwLCB0aGlzLm9wdGlvbnMubWF4UmVzdWx0cykpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH0sXG5cbiAgcmVzdWx0czogZnVuY3Rpb24gKHRleHQsIGtleSwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciBxdWVyeSA9IHRoaXMuX3Jlc3VsdHNRdWVyeTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGRlbGV0ZSBxdWVyeS5wYXJhbXMud2hlcmU7XG4gICAgICBxdWVyeS5mZWF0dXJlSWRzKFtrZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcXVlcnkud2hlcmUodGhpcy5fYnVpbGRRdWVyeSh0ZXh0KSk7XG4gICAgfVxuXG4gICAgaWYgKGJvdW5kcykge1xuICAgICAgcXVlcnkud2l0aGluKGJvdW5kcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXJ5LnJ1bihVdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlcykge1xuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmVhdHVyZXMuZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZlYXR1cmUgPSBmZWF0dXJlcy5mZWF0dXJlc1tpXTtcbiAgICAgICAgaWYgKGZlYXR1cmUpIHtcbiAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5fZmVhdHVyZUJvdW5kcyhmZWF0dXJlKTtcblxuICAgICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBsYXRsbmc6IGJvdW5kcy5nZXRDZW50ZXIoKSxcbiAgICAgICAgICAgIGJvdW5kczogYm91bmRzLFxuICAgICAgICAgICAgdGV4dDogdGhpcy5vcHRpb25zLmZvcm1hdFN1Z2dlc3Rpb24uY2FsbCh0aGlzLCBmZWF0dXJlKSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IGZlYXR1cmUucHJvcGVydGllcyxcbiAgICAgICAgICAgIGdlb2pzb246IGZlYXR1cmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG5cbiAgICAgICAgICAvLyBjbGVhciBxdWVyeSBwYXJhbWV0ZXJzIGZvciB0aGUgbmV4dCBzZWFyY2hcbiAgICAgICAgICBkZWxldGUgdGhpcy5fcmVzdWx0c1F1ZXJ5LnBhcmFtc1snb2JqZWN0SWRzJ107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKGVycm9yLCByZXN1bHRzKTtcbiAgICB9LCB0aGlzKSk7XG4gIH0sXG5cbiAgb3JkZXJCeTogZnVuY3Rpb24gKGZpZWxkTmFtZSwgb3JkZXIpIHtcbiAgICB0aGlzLl9zdWdnZXN0aW9uc1F1ZXJ5Lm9yZGVyQnkoZmllbGROYW1lLCBvcmRlcik7XG4gIH0sXG5cbiAgX2J1aWxkUXVlcnk6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgdmFyIHF1ZXJ5U3RyaW5nID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZpZWxkID0gJ3VwcGVyKFwiJyArIHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHNbaV0gKyAnXCIpJztcblxuICAgICAgcXVlcnlTdHJpbmcucHVzaChmaWVsZCArIFwiIExJS0UgdXBwZXIoJyVcIiArIHRleHQgKyBcIiUnKVwiKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLndoZXJlKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLndoZXJlICsgJyBBTkQgKCcgKyBxdWVyeVN0cmluZy5qb2luKCcgT1IgJykgKyAnKSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBxdWVyeVN0cmluZy5qb2luKCcgT1IgJyk7XG4gICAgfVxuICB9LFxuXG4gIF9mZWF0dXJlQm91bmRzOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIHZhciBnZW9qc29uID0gZ2VvSnNvbihmZWF0dXJlKTtcbiAgICBpZiAoZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICB2YXIgY2VudGVyID0gZ2VvanNvbi5nZXRCb3VuZHMoKS5nZXRDZW50ZXIoKTtcbiAgICAgIHZhciBsbmdSYWRpdXMgPSAoKHRoaXMub3B0aW9ucy5idWZmZXJSYWRpdXMgLyA0MDA3NTAxNykgKiAzNjApIC8gTWF0aC5jb3MoKDE4MCAvIE1hdGguUEkpICogY2VudGVyLmxhdCk7XG4gICAgICB2YXIgbGF0UmFkaXVzID0gKHRoaXMub3B0aW9ucy5idWZmZXJSYWRpdXMgLyA0MDA3NTAxNykgKiAzNjA7XG4gICAgICByZXR1cm4gbGF0TG5nQm91bmRzKFtjZW50ZXIubGF0IC0gbGF0UmFkaXVzLCBjZW50ZXIubG5nIC0gbG5nUmFkaXVzXSwgW2NlbnRlci5sYXQgKyBsYXRSYWRpdXMsIGNlbnRlci5sbmcgKyBsbmdSYWRpdXNdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdlb2pzb24uZ2V0Qm91bmRzKCk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVMYXllclByb3ZpZGVyIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRmVhdHVyZUxheWVyUHJvdmlkZXIob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZlYXR1cmVMYXllclByb3ZpZGVyO1xuIiwiaW1wb3J0IHsgVXRpbCwgZ2VvSnNvbiwgbGF0TG5nQm91bmRzIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcblxuZXhwb3J0IHZhciBNYXBTZXJ2aWNlUHJvdmlkZXIgPSBNYXBTZXJ2aWNlLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBsYXllcnM6IFswXSxcbiAgICBsYWJlbDogJ01hcCBTZXJ2aWNlJyxcbiAgICBidWZmZXJSYWRpdXM6IDEwMDAsXG4gICAgbWF4UmVzdWx0czogNSxcbiAgICBmb3JtYXRTdWdnZXN0aW9uOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgcmV0dXJuIGZlYXR1cmUucHJvcGVydGllc1tmZWF0dXJlLmRpc3BsYXlGaWVsZE5hbWVdICsgJyA8c21hbGw+JyArIGZlYXR1cmUubGF5ZXJOYW1lICsgJzwvc21hbGw+JztcbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBNYXBTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fZ2V0SWRGaWVsZHMoKTtcbiAgfSxcblxuICBzdWdnZXN0aW9uczogZnVuY3Rpb24gKHRleHQsIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxdWVzdCA9IHRoaXMuZmluZCgpLnRleHQodGV4dCkuZmllbGRzKHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMpLnJldHVybkdlb21ldHJ5KGZhbHNlKS5sYXllcnModGhpcy5vcHRpb25zLmxheWVycyk7XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXN1bHRzLCByYXcpIHtcbiAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICB2YXIgY291bnQgPSBNYXRoLm1pbih0aGlzLm9wdGlvbnMubWF4UmVzdWx0cywgcmVzdWx0cy5mZWF0dXJlcy5sZW5ndGgpO1xuICAgICAgICByYXcucmVzdWx0cyA9IHJhdy5yZXN1bHRzLnJldmVyc2UoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGZlYXR1cmUgPSByZXN1bHRzLmZlYXR1cmVzW2ldO1xuICAgICAgICAgIHZhciByZXN1bHQgPSByYXcucmVzdWx0c1tpXTtcbiAgICAgICAgICB2YXIgbGF5ZXIgPSByZXN1bHQubGF5ZXJJZDtcbiAgICAgICAgICB2YXIgaWRGaWVsZCA9IHRoaXMuX2lkRmllbGRzW2xheWVyXTtcbiAgICAgICAgICBmZWF0dXJlLmxheWVySWQgPSBsYXllcjtcbiAgICAgICAgICBmZWF0dXJlLmxheWVyTmFtZSA9IHRoaXMuX2xheWVyTmFtZXNbbGF5ZXJdO1xuICAgICAgICAgIGZlYXR1cmUuZGlzcGxheUZpZWxkTmFtZSA9IHRoaXMuX2Rpc3BsYXlGaWVsZHNbbGF5ZXJdO1xuICAgICAgICAgIGlmIChpZEZpZWxkKSB7XG4gICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgdGV4dDogdGhpcy5vcHRpb25zLmZvcm1hdFN1Z2dlc3Rpb24uY2FsbCh0aGlzLCBmZWF0dXJlKSxcbiAgICAgICAgICAgICAgdW5mb3JtYXR0ZWRUZXh0OiBmZWF0dXJlLnByb3BlcnRpZXNbZmVhdHVyZS5kaXNwbGF5RmllbGROYW1lXSxcbiAgICAgICAgICAgICAgbWFnaWNLZXk6IHJlc3VsdC5hdHRyaWJ1dGVzW2lkRmllbGRdICsgJzonICsgbGF5ZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FsbGJhY2soZXJyb3IsIHN1Z2dlc3Rpb25zLnJldmVyc2UoKSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgcmVzdWx0czogZnVuY3Rpb24gKHRleHQsIGtleSwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgdmFyIHJlcXVlc3Q7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICB2YXIgZmVhdHVyZUlkID0ga2V5LnNwbGl0KCc6JylbMF07XG4gICAgICB2YXIgbGF5ZXIgPSBrZXkuc3BsaXQoJzonKVsxXTtcbiAgICAgIHJlcXVlc3QgPSB0aGlzLnF1ZXJ5KCkubGF5ZXIobGF5ZXIpLmZlYXR1cmVJZHMoZmVhdHVyZUlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdCA9IHRoaXMuZmluZCgpLnRleHQodGV4dCkuZmllbGRzKHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMpLmxheWVycyh0aGlzLm9wdGlvbnMubGF5ZXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlcywgcmVzcG9uc2UpIHtcbiAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnJlc3VsdHMpIHtcbiAgICAgICAgICByZXNwb25zZS5yZXN1bHRzID0gcmVzcG9uc2UucmVzdWx0cy5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmZWF0dXJlcy5mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBmZWF0dXJlID0gZmVhdHVyZXMuZmVhdHVyZXNbaV07XG4gICAgICAgICAgbGF5ZXIgPSBsYXllciB8fCByZXNwb25zZS5yZXN1bHRzW2ldLmxheWVySWQ7XG5cbiAgICAgICAgICBpZiAoZmVhdHVyZSAmJiBsYXllciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5fZmVhdHVyZUJvdW5kcyhmZWF0dXJlKTtcbiAgICAgICAgICAgIGZlYXR1cmUubGF5ZXJJZCA9IGxheWVyO1xuICAgICAgICAgICAgZmVhdHVyZS5sYXllck5hbWUgPSB0aGlzLl9sYXllck5hbWVzW2xheWVyXTtcbiAgICAgICAgICAgIGZlYXR1cmUuZGlzcGxheUZpZWxkTmFtZSA9IHRoaXMuX2Rpc3BsYXlGaWVsZHNbbGF5ZXJdO1xuXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICBsYXRsbmc6IGJvdW5kcy5nZXRDZW50ZXIoKSxcbiAgICAgICAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5mb3JtYXRTdWdnZXN0aW9uLmNhbGwodGhpcywgZmVhdHVyZSksXG4gICAgICAgICAgICAgIHByb3BlcnRpZXM6IGZlYXR1cmUucHJvcGVydGllcyxcbiAgICAgICAgICAgICAgZ2VvanNvbjogZmVhdHVyZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzdWx0cy5yZXZlcnNlKCkpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIF9mZWF0dXJlQm91bmRzOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIHZhciBnZW9qc29uID0gZ2VvSnNvbihmZWF0dXJlKTtcbiAgICBpZiAoZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICB2YXIgY2VudGVyID0gZ2VvanNvbi5nZXRCb3VuZHMoKS5nZXRDZW50ZXIoKTtcbiAgICAgIHZhciBsbmdSYWRpdXMgPSAoKHRoaXMub3B0aW9ucy5idWZmZXJSYWRpdXMgLyA0MDA3NTAxNykgKiAzNjApIC8gTWF0aC5jb3MoKDE4MCAvIE1hdGguUEkpICogY2VudGVyLmxhdCk7XG4gICAgICB2YXIgbGF0UmFkaXVzID0gKHRoaXMub3B0aW9ucy5idWZmZXJSYWRpdXMgLyA0MDA3NTAxNykgKiAzNjA7XG4gICAgICByZXR1cm4gbGF0TG5nQm91bmRzKFtjZW50ZXIubGF0IC0gbGF0UmFkaXVzLCBjZW50ZXIubG5nIC0gbG5nUmFkaXVzXSwgW2NlbnRlci5sYXQgKyBsYXRSYWRpdXMsIGNlbnRlci5sbmcgKyBsbmdSYWRpdXNdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdlb2pzb24uZ2V0Qm91bmRzKCk7XG4gICAgfVxuICB9LFxuXG4gIF9sYXllck1ldGFkYXRhQ2FsbGJhY2s6IGZ1bmN0aW9uIChsYXllcmlkKSB7XG4gICAgcmV0dXJuIFV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIG1ldGFkYXRhKSB7XG4gICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9XG4gICAgICB0aGlzLl9kaXNwbGF5RmllbGRzW2xheWVyaWRdID0gbWV0YWRhdGEuZGlzcGxheUZpZWxkO1xuICAgICAgdGhpcy5fbGF5ZXJOYW1lc1tsYXllcmlkXSA9IG1ldGFkYXRhLm5hbWU7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldGFkYXRhLmZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZmllbGQgPSBtZXRhZGF0YS5maWVsZHNbaV07XG4gICAgICAgIGlmIChmaWVsZC50eXBlID09PSAnZXNyaUZpZWxkVHlwZU9JRCcpIHtcbiAgICAgICAgICB0aGlzLl9pZEZpZWxkc1tsYXllcmlkXSA9IGZpZWxkLm5hbWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBfZ2V0SWRGaWVsZHM6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9pZEZpZWxkcyA9IHt9O1xuICAgIHRoaXMuX2Rpc3BsYXlGaWVsZHMgPSB7fTtcbiAgICB0aGlzLl9sYXllck5hbWVzID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMubGF5ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLm9wdGlvbnMubGF5ZXJzW2ldO1xuICAgICAgdGhpcy5nZXQobGF5ZXIsIHt9LCB0aGlzLl9sYXllck1ldGFkYXRhQ2FsbGJhY2sobGF5ZXIpKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwU2VydmljZVByb3ZpZGVyIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgTWFwU2VydmljZVByb3ZpZGVyKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBTZXJ2aWNlUHJvdmlkZXI7XG4iLCJpbXBvcnQgeyBHZW9jb2RlU2VydmljZSB9IGZyb20gJy4uL1NlcnZpY2VzL0dlb2NvZGUnO1xuXG5leHBvcnQgdmFyIEdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIgPSBHZW9jb2RlU2VydmljZS5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgbGFiZWw6ICdHZW9jb2RlIFNlcnZlcicsXG4gICAgbWF4UmVzdWx0czogNVxuICB9LFxuXG4gIHN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAodGV4dCwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IHRoaXMuc3VnZ2VzdCgpLnRleHQodGV4dCk7XG4gICAgICBpZiAoYm91bmRzKSB7XG4gICAgICAgIHJlcXVlc3Qud2l0aGluKGJvdW5kcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgd2hpbGUgKHJlc3BvbnNlLnN1Z2dlc3Rpb25zLmxlbmd0aCAmJiBzdWdnZXN0aW9ucy5sZW5ndGggPD0gKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzIC0gMSkpIHtcbiAgICAgICAgICAgIHZhciBzdWdnZXN0aW9uID0gcmVzcG9uc2Uuc3VnZ2VzdGlvbnMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghc3VnZ2VzdGlvbi5pc0NvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgdGV4dDogc3VnZ2VzdGlvbi50ZXh0LFxuICAgICAgICAgICAgICAgIHVuZm9ybWF0dGVkVGV4dDogc3VnZ2VzdGlvbi50ZXh0LFxuICAgICAgICAgICAgICAgIG1hZ2ljS2V5OiBzdWdnZXN0aW9uLm1hZ2ljS2V5XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayhlcnJvciwgc3VnZ2VzdGlvbnMpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKHVuZGVmaW5lZCwgW10pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB0aGlzLmdlb2NvZGUoKS50ZXh0KHRleHQpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgcmVxdWVzdC5rZXkoa2V5KTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm1heExvY2F0aW9ucyh0aGlzLm9wdGlvbnMubWF4UmVzdWx0cyk7XG5cbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICByZXF1ZXN0LndpdGhpbihib3VuZHMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UucmVzdWx0cyk7XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VvY29kZVNlcnZpY2VQcm92aWRlciAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlb2NvZGVTZXJ2aWNlUHJvdmlkZXI7XG4iLCJleHBvcnQgeyB2ZXJzaW9uIGFzIFZFUlNJT04gfSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuZXhwb3J0IHZhciBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmwgPSAnaHR0cHM6Ly9nZW9jb2RlLmFyY2dpcy5jb20vYXJjZ2lzL3Jlc3Qvc2VydmljZXMvV29ybGQvR2VvY29kZVNlcnZlci8nO1xuXG4vLyBpbXBvcnQgdGFza3NcbmV4cG9ydCB7IEdlb2NvZGUsIGdlb2NvZGUgfSBmcm9tICcuL1Rhc2tzL0dlb2NvZGUnO1xuZXhwb3J0IHsgUmV2ZXJzZUdlb2NvZGUsIHJldmVyc2VHZW9jb2RlIH0gZnJvbSAnLi9UYXNrcy9SZXZlcnNlR2VvY29kZSc7XG5leHBvcnQgeyBTdWdnZXN0LCBzdWdnZXN0IH0gZnJvbSAnLi9UYXNrcy9TdWdnZXN0JztcblxuLy8gaW1wb3J0IHNlcnZpY2VcbmV4cG9ydCB7IEdlb2NvZGVTZXJ2aWNlLCBnZW9jb2RlU2VydmljZSB9IGZyb20gJy4vU2VydmljZXMvR2VvY29kZSc7XG5cbi8vIGltcG9ydCBjb250cm9sXG5leHBvcnQgeyBHZW9zZWFyY2gsIGdlb3NlYXJjaCB9IGZyb20gJy4vQ29udHJvbHMvR2Vvc2VhcmNoJztcblxuLy8gaW1wb3J0IHN1cHBvcnRpbmcgY2xhc3NcbmV4cG9ydCB7IEdlb3NlYXJjaENvcmUsIGdlb3NlYXJjaENvcmUgfSBmcm9tICcuL0NsYXNzZXMvR2Vvc2VhcmNoQ29yZSc7XG5cbi8vIGltcG9ydCBwcm92aWRlcnNcbmV4cG9ydCB7IEFyY2dpc09ubGluZVByb3ZpZGVyLCBhcmNnaXNPbmxpbmVQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL0FyY2dpc09ubGluZUdlb2NvZGVyJztcbmV4cG9ydCB7IEZlYXR1cmVMYXllclByb3ZpZGVyLCBmZWF0dXJlTGF5ZXJQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL0ZlYXR1cmVMYXllcic7XG5leHBvcnQgeyBNYXBTZXJ2aWNlUHJvdmlkZXIsIG1hcFNlcnZpY2VQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL01hcFNlcnZpY2UnO1xuZXhwb3J0IHsgR2VvY29kZVNlcnZpY2VQcm92aWRlciwgZ2VvY29kZVNlcnZpY2VQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL0dlb2NvZGVTZXJ2aWNlJztcbiJdLCJuYW1lcyI6WyJUYXNrIiwibGF0TG5nQm91bmRzIiwiRXNyaVV0aWwiLCJsYXRMbmciLCJTZXJ2aWNlIiwiRXZlbnRlZCIsIlV0aWwiLCJDb250cm9sIiwiRG9tVXRpbCIsIkRvbUV2ZW50IiwiRmVhdHVyZUxheWVyU2VydmljZSIsImdlb0pzb24iLCJNYXBTZXJ2aWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztDQ09PLElBQUksT0FBTyxHQUFHQSxnQkFBSSxDQUFDLE1BQU0sQ0FBQztBQUNqQyxDQUFBLEVBQUUsSUFBSSxFQUFFLHVCQUF1Qjs7QUFFL0IsQ0FBQSxFQUFFLE1BQU0sRUFBRTtBQUNWLENBQUEsSUFBSSxLQUFLLEVBQUUsSUFBSTtBQUNmLENBQUEsSUFBSSxVQUFVLEVBQUUsS0FBSztBQUNyQixDQUFBLElBQUksU0FBUyxFQUFFLEdBQUc7QUFDbEIsQ0FBQSxJQUFJLFlBQVksRUFBRSxFQUFFO0FBQ3BCLENBQUEsR0FBRzs7QUFFSCxDQUFBLEVBQUUsT0FBTyxFQUFFO0FBQ1gsQ0FBQSxJQUFJLFNBQVMsRUFBRSxTQUFTO0FBQ3hCLENBQUEsSUFBSSxjQUFjLEVBQUUsY0FBYztBQUNsQyxDQUFBLElBQUksTUFBTSxFQUFFLE1BQU07QUFDbEIsQ0FBQSxJQUFJLFdBQVcsRUFBRSxXQUFXO0FBQzVCLENBQUEsSUFBSSxRQUFRLEVBQUUsUUFBUTtBQUN0QixDQUFBLElBQUksUUFBUSxFQUFFLFFBQVE7QUFDdEIsQ0FBQSxJQUFJLFNBQVMsRUFBRSxTQUFTO0FBQ3hCLENBQUEsSUFBSSxNQUFNLEVBQUUsWUFBWTtBQUN4QixDQUFBLElBQUksVUFBVSxFQUFFLFVBQVU7QUFDMUIsQ0FBQSxJQUFJLE9BQU8sRUFBRSxPQUFPO0FBQ3BCLENBQUEsSUFBSSxLQUFLLEVBQUUsVUFBVTtBQUNyQixDQUFBLElBQUksUUFBUSxFQUFFLFdBQVc7QUFDekIsQ0FBQSxJQUFJLFlBQVksRUFBRSxZQUFZO0FBQzlCLENBQUEsSUFBSSxjQUFjLEVBQUUsY0FBYztBQUNs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