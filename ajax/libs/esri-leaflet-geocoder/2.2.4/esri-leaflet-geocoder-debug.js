/* esri-leaflet-geocoder - v2.2.4 - Wed Mar 22 2017 15:48:59 GMT-0700 (PDT)
 * Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet'), require('esri-leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet', 'esri-leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Geocoding = global.L.esri.Geocoding || {}),global.L,global.L.esri));
}(this, function (exports,L,esriLeaflet) { 'use strict';

	L = 'default' in L ? L['default'] : L;

	var version = "2.2.4";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvVGFza3MvR2VvY29kZS5qcyIsIi4uL3NyYy9UYXNrcy9SZXZlcnNlR2VvY29kZS5qcyIsIi4uL3NyYy9UYXNrcy9TdWdnZXN0LmpzIiwiLi4vc3JjL1NlcnZpY2VzL0dlb2NvZGUuanMiLCIuLi9zcmMvQ2xhc3Nlcy9HZW9zZWFyY2hDb3JlLmpzIiwiLi4vc3JjL1Byb3ZpZGVycy9BcmNnaXNPbmxpbmVHZW9jb2Rlci5qcyIsIi4uL3NyYy9Db250cm9scy9HZW9zZWFyY2guanMiLCIuLi9zcmMvUHJvdmlkZXJzL0ZlYXR1cmVMYXllci5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvTWFwU2VydmljZS5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvR2VvY29kZVNlcnZpY2UuanMiLCIuLi9zcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXQtZ2VvY29kZXJcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkVzcmkgR2VvY29kaW5nIHV0aWxpdHkgYW5kIHNlYXJjaCBwbHVnaW4gZm9yIExlYWZsZXQuXCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMi40XCIsXG4gIFwiYXV0aG9yXCI6IFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gIFwiY29udHJpYnV0b3JzXCI6IFtcbiAgICBcIlBhdHJpY2sgQXJsdCA8cGFybHRAZXNyaS5jb20+IChodHRwOi8vcGF0cmlja2FybHQuY29tKVwiLFxuICAgIFwiSm9obiBHcmF2b2lzIDxqZ3Jhdm9pc0Blc3JpLmNvbT4gKGh0dHA6Ly9qb2huZ3Jhdm9pcy5jb20pXCJcbiAgXSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZXNyaS1sZWFmbGV0XCI6IFwiXjIuMC4zXCIsXG4gICAgXCJsZWFmbGV0XCI6IFwiXjEuMC4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2hhaVwiOiBcIjMuNS4wXCIsXG4gICAgXCJnaC1yZWxlYXNlXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4wLjguNVwiLFxuICAgIFwiaW1hZ2VtaW5cIjogXCJeMy4yLjBcIixcbiAgICBcImlzcGFydGFcIjogXCJeNC4wLjBcIixcbiAgICBcImlzdGFuYnVsXCI6IFwiXjAuNC4yXCIsXG4gICAgXCJrYXJtYVwiOiBcIl4xLjMuMFwiLFxuICAgIFwia2FybWEtY2hhaS1zaW5vblwiOiBcIl4wLjEuM1wiLFxuICAgIFwia2FybWEtY292ZXJhZ2VcIjogXCJeMS4xLjFcIixcbiAgICBcImthcm1hLW1vY2hhXCI6IFwiXjEuMy4wXCIsXG4gICAgXCJrYXJtYS1tb2NoYS1yZXBvcnRlclwiOiBcIl4yLjIuMVwiLFxuICAgIFwia2FybWEtcGhhbnRvbWpzLWxhdW5jaGVyXCI6IFwiXjAuMi4wXCIsXG4gICAgXCJrYXJtYS1zb3VyY2VtYXAtbG9hZGVyXCI6IFwiXjAuMy41XCIsXG4gICAgXCJta2RpcnBcIjogXCJeMC41LjFcIixcbiAgICBcIm1vY2hhXCI6IFwiXjMuMS4wXCIsXG4gICAgXCJub2RlLXNhc3NcIjogXCJeMy4yLjBcIixcbiAgICBcInBhcmFsbGVsc2hlbGxcIjogXCJeMi4wLjBcIixcbiAgICBcInBoYW50b21qc1wiOiBcIl4xLjkuOFwiLFxuICAgIFwicm9sbHVwXCI6IFwiXjAuMjUuNFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1qc29uXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLW5vZGUtcmVzb2x2ZVwiOiBcIl4xLjQuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi11Z2xpZnlcIjogXCJeMC4zLjFcIixcbiAgICBcInNlbWlzdGFuZGFyZFwiOiBcIl45LjAuMFwiLFxuICAgIFwic2lub25cIjogXCJeMS4xMS4xXCIsXG4gICAgXCJzaW5vbi1jaGFpXCI6IFwiMi44LjBcIixcbiAgICBcInNuYXp6eVwiOiBcIl41LjAuMFwiLFxuICAgIFwidWdsaWZ5LWpzXCI6IFwiXjIuNi4xXCIsXG4gICAgXCJ3YXRjaFwiOiBcIl4wLjE3LjFcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvZXNyaS1sZWFmbGV0LWdlb2NvZGVyXCIsXG4gIFwianNuZXh0Om1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanNcIixcbiAgXCJqc3BtXCI6IHtcbiAgICBcInJlZ2lzdHJ5XCI6IFwibnBtXCIsXG4gICAgXCJmb3JtYXRcIjogXCJlczZcIixcbiAgICBcIm1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanNcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJBcGFjaGUtMi4wXCIsXG4gIFwibWFpblwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzXCIsXG4gIFwiYnJvd3NlclwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzXCIsXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdEBnaXRodWIuY29tOkVzcmkvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLmdpdFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJwcmVidWlsZFwiOiBcIm1rZGlycCBkaXN0XCIsXG4gICAgXCJidWlsZFwiOiBcInJvbGx1cCAtYyBwcm9maWxlcy9kZWJ1Zy5qcyAmIHJvbGx1cCAtYyBwcm9maWxlcy9wcm9kdWN0aW9uLmpzICYgbnBtIHJ1biBjc3MgJiBucG0gcnVuIGltZ1wiLFxuICAgIFwiY3NzXCI6IFwibm9kZS1zYXNzIC4vc3JjL2VzcmktbGVhZmxldC1nZW9jb2Rlci5jc3MgLi9kaXN0L2VzcmktbGVhZmxldC1nZW9jb2Rlci5jc3MgLS1vdXRwdXQtc3R5bGUgY29tcHJlc3NlZFwiLFxuICAgIFwiaW1nXCI6IFwiaW1hZ2VtaW4gLi9zcmMvaW1nIC4vZGlzdC9pbWdcIixcbiAgICBcImxpbnRcIjogXCJzZW1pc3RhbmRhcmQgfCBzbmF6enlcIixcbiAgICBcInByZXB1Ymxpc2hcIjogXCJucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV0ZXN0XCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIi4vc2NyaXB0cy9yZWxlYXNlLnNoXCIsXG4gICAgXCJzdGFydC13YXRjaFwiOiBcIndhdGNoIFxcXCJucG0gcnVuIGJ1aWxkXFxcIiBzcmNcIixcbiAgICBcInN0YXJ0XCI6IFwicGFyYWxsZWxzaGVsbCBcXFwibnBtIHJ1biBzdGFydC13YXRjaFxcXCIgXFxcImh0dHAtc2VydmVyIC1wIDU2NzggLWMtMSAtb1xcXCJcIixcbiAgICBcInRlc3RcIjogXCJucG0gcnVuIGxpbnQgJiYga2FybWEgc3RhcnRcIlxuICB9LFxuICBcInNlbWlzdGFuZGFyZFwiOiB7XG4gICAgXCJnbG9iYWxzXCI6IFsgXCJleHBlY3RcIiwgXCJMXCIsIFwiWE1MSHR0cFJlcXVlc3RcIiwgXCJzaW5vblwiLCBcInhoclwiIF1cbiAgfSxcbiAgXCJzdHlsZVwiOiBcIi4vZGlzdC9lc3JpLWxlYWZsZXQtZ2VvY29kZXIuY3NzXCJcbn1cbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGFzaywgVXRpbCB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5pbXBvcnQgeyBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmwgfSBmcm9tICcuLi9Fc3JpTGVhZmxldEdlb2NvZGluZyc7XG5cbmV4cG9ydCB2YXIgR2VvY29kZSA9IFRhc2suZXh0ZW5kKHtcbiAgcGF0aDogJ2ZpbmRBZGRyZXNzQ2FuZGlkYXRlcycsXG5cbiAgcGFyYW1zOiB7XG4gICAgb3V0U3I6IDQzMjYsXG4gICAgZm9yU3RvcmFnZTogZmFsc2UsXG4gICAgb3V0RmllbGRzOiAnKicsXG4gICAgbWF4TG9jYXRpb25zOiAyMFxuICB9LFxuXG4gIHNldHRlcnM6IHtcbiAgICAnYWRkcmVzcyc6ICdhZGRyZXNzJyxcbiAgICAnbmVpZ2hib3Job29kJzogJ25laWdoYm9yaG9vZCcsXG4gICAgJ2NpdHknOiAnY2l0eScsXG4gICAgJ3N1YnJlZ2lvbic6ICdzdWJyZWdpb24nLFxuICAgICdyZWdpb24nOiAncmVnaW9uJyxcbiAgICAncG9zdGFsJzogJ3Bvc3RhbCcsXG4gICAgJ2NvdW50cnknOiAnY291bnRyeScsXG4gICAgJ3RleHQnOiAnc2luZ2xlTGluZScsXG4gICAgJ2NhdGVnb3J5JzogJ2NhdGVnb3J5JyxcbiAgICAndG9rZW4nOiAndG9rZW4nLFxuICAgICdrZXknOiAnbWFnaWNLZXknLFxuICAgICdmaWVsZHMnOiAnb3V0RmllbGRzJyxcbiAgICAnZm9yU3RvcmFnZSc6ICdmb3JTdG9yYWdlJyxcbiAgICAnbWF4TG9jYXRpb25zJzogJ21heExvY2F0aW9ucydcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMudXJsID0gb3B0aW9ucy51cmwgfHwgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsO1xuICAgIFRhc2sucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgfSxcblxuICB3aXRoaW46IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhib3VuZHMpO1xuICAgIHRoaXMucGFyYW1zLnNlYXJjaEV4dGVudCA9IFV0aWwuYm91bmRzVG9FeHRlbnQoYm91bmRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBuZWFyYnk6IGZ1bmN0aW9uIChsYXRsbmcsIHJhZGl1cykge1xuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XG4gICAgdGhpcy5wYXJhbXMubG9jYXRpb24gPSBsYXRsbmcubG5nICsgJywnICsgbGF0bG5nLmxhdDtcbiAgICB0aGlzLnBhcmFtcy5kaXN0YW5jZSA9IE1hdGgubWluKE1hdGgubWF4KHJhZGl1cywgMjAwMCksIDUwMDAwKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY3VzdG9tUGFyYW0pIHtcbiAgICAgIHRoaXMucGFyYW1zW3RoaXMub3B0aW9ucy5jdXN0b21QYXJhbV0gPSB0aGlzLnBhcmFtcy5zaW5nbGVMaW5lO1xuICAgICAgZGVsZXRlIHRoaXMucGFyYW1zLnNpbmdsZUxpbmU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcHJvY2Vzc29yID0gdGhpcy5fcHJvY2Vzc0dlb2NvZGVyUmVzcG9uc2U7XG4gICAgICB2YXIgcmVzdWx0cyA9ICghZXJyb3IpID8gcHJvY2Vzc29yKHJlc3BvbnNlKSA6IHVuZGVmaW5lZDtcbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHsgcmVzdWx0czogcmVzdWx0cyB9LCByZXNwb25zZSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgX3Byb2Nlc3NHZW9jb2RlclJlc3BvbnNlOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5jYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2FuZGlkYXRlID0gcmVzcG9uc2UuY2FuZGlkYXRlc1tpXTtcbiAgICAgIGlmIChjYW5kaWRhdGUuZXh0ZW50KSB7XG4gICAgICAgIHZhciBib3VuZHMgPSBVdGlsLmV4dGVudFRvQm91bmRzKGNhbmRpZGF0ZS5leHRlbnQpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICB0ZXh0OiBjYW5kaWRhdGUuYWRkcmVzcyxcbiAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgIHNjb3JlOiBjYW5kaWRhdGUuc2NvcmUsXG4gICAgICAgIGxhdGxuZzogTC5sYXRMbmcoY2FuZGlkYXRlLmxvY2F0aW9uLnksIGNhbmRpZGF0ZS5sb2NhdGlvbi54KSxcbiAgICAgICAgcHJvcGVydGllczogY2FuZGlkYXRlLmF0dHJpYnV0ZXNcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9jb2RlIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgR2VvY29kZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2VvY29kZTtcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5pbXBvcnQgeyBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmwgfSBmcm9tICcuLi9Fc3JpTGVhZmxldEdlb2NvZGluZyc7XG5cbmV4cG9ydCB2YXIgUmV2ZXJzZUdlb2NvZGUgPSBUYXNrLmV4dGVuZCh7XG4gIHBhdGg6ICdyZXZlcnNlR2VvY29kZScsXG5cbiAgcGFyYW1zOiB7XG4gICAgb3V0U1I6IDQzMjYsXG4gICAgcmV0dXJuSW50ZXJzZWN0aW9uOiBmYWxzZVxuICB9LFxuXG4gIHNldHRlcnM6IHtcbiAgICAnZGlzdGFuY2UnOiAnZGlzdGFuY2UnLFxuICAgICdsYW5ndWFnZSc6ICdsYW5nQ29kZScsXG4gICAgJ2ludGVyc2VjdGlvbic6ICdyZXR1cm5JbnRlcnNlY3Rpb24nXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLnVybCA9IG9wdGlvbnMudXJsIHx8IFdvcmxkR2VvY29kaW5nU2VydmljZVVybDtcbiAgICBUYXNrLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gIH0sXG5cbiAgbGF0bG5nOiBmdW5jdGlvbiAobGF0bG5nKSB7XG4gICAgbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGxhdGxuZy5sbmcgKyAnLCcgKyBsYXRsbmcubGF0O1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICBsYXRsbmc6IEwubGF0TG5nKHJlc3BvbnNlLmxvY2F0aW9uLnksIHJlc3BvbnNlLmxvY2F0aW9uLngpLFxuICAgICAgICAgIGFkZHJlc3M6IHJlc3BvbnNlLmFkZHJlc3NcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzdWx0LCByZXNwb25zZSk7XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZUdlb2NvZGUgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBSZXZlcnNlR2VvY29kZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmV2ZXJzZUdlb2NvZGU7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFRhc2ssIFV0aWwgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuaW1wb3J0IHsgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsIH0gZnJvbSAnLi4vRXNyaUxlYWZsZXRHZW9jb2RpbmcnO1xuXG5leHBvcnQgdmFyIFN1Z2dlc3QgPSBUYXNrLmV4dGVuZCh7XG4gIHBhdGg6ICdzdWdnZXN0JyxcblxuICBwYXJhbXM6IHt9LFxuXG4gIHNldHRlcnM6IHtcbiAgICB0ZXh0OiAndGV4dCcsXG4gICAgY2F0ZWdvcnk6ICdjYXRlZ29yeScsXG4gICAgY291bnRyaWVzOiAnY291bnRyeUNvZGUnLFxuICAgIG1heFN1Z2dlc3Rpb25zOiAnbWF4U3VnZ2VzdGlvbnMnXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoIW9wdGlvbnMudXJsKSB7XG4gICAgICBvcHRpb25zLnVybCA9IFdvcmxkR2VvY29kaW5nU2VydmljZVVybDtcbiAgICAgIG9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0ID0gdHJ1ZTtcbiAgICB9XG4gICAgVGFzay5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICB9LFxuXG4gIHdpdGhpbjogZnVuY3Rpb24gKGJvdW5kcykge1xuICAgIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKGJvdW5kcyk7XG4gICAgYm91bmRzID0gYm91bmRzLnBhZCgwLjUpO1xuICAgIHZhciBjZW50ZXIgPSBib3VuZHMuZ2V0Q2VudGVyKCk7XG4gICAgdmFyIG5lID0gYm91bmRzLmdldE5vcnRoV2VzdCgpO1xuICAgIHRoaXMucGFyYW1zLmxvY2F0aW9uID0gY2VudGVyLmxuZyArICcsJyArIGNlbnRlci5sYXQ7XG4gICAgdGhpcy5wYXJhbXMuZGlzdGFuY2UgPSBNYXRoLm1pbihNYXRoLm1heChjZW50ZXIuZGlzdGFuY2VUbyhuZSksIDIwMDApLCA1MDAwMCk7XG4gICAgdGhpcy5wYXJhbXMuc2VhcmNoRXh0ZW50ID0gVXRpbC5ib3VuZHNUb0V4dGVudChib3VuZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG5lYXJieTogZnVuY3Rpb24gKGxhdGxuZywgcmFkaXVzKSB7XG4gICAgbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGxhdGxuZy5sbmcgKyAnLCcgKyBsYXRsbmcubGF0O1xuICAgIHRoaXMucGFyYW1zLmRpc3RhbmNlID0gTWF0aC5taW4oTWF0aC5tYXgocmFkaXVzLCAyMDAwKSwgNTAwMDApO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGVycm9yLCByZXNwb25zZSwgcmVzcG9uc2UpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybigndGhpcyBnZW9jb2Rpbmcgc2VydmljZSBkb2VzIG5vdCBzdXBwb3J0IGFza2luZyBmb3Igc3VnZ2VzdGlvbnMnKTtcbiAgICB9XG4gIH1cblxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWdnZXN0IChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgU3VnZ2VzdChvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3VnZ2VzdDtcbiIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuaW1wb3J0IHsgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsIH0gZnJvbSAnLi4vRXNyaUxlYWZsZXRHZW9jb2RpbmcnO1xuaW1wb3J0IGdlb2NvZGUgZnJvbSAnLi4vVGFza3MvR2VvY29kZSc7XG5pbXBvcnQgcmV2ZXJzZUdlb2NvZGUgZnJvbSAnLi4vVGFza3MvUmV2ZXJzZUdlb2NvZGUnO1xuaW1wb3J0IHN1Z2dlc3QgZnJvbSAnLi4vVGFza3MvU3VnZ2VzdCc7XG5cbmV4cG9ydCB2YXIgR2VvY29kZVNlcnZpY2UgPSBTZXJ2aWNlLmV4dGVuZCh7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKG9wdGlvbnMudXJsKSB7XG4gICAgICBTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICB0aGlzLl9jb25maXJtU3VnZ2VzdFN1cHBvcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy51cmwgPSBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmw7XG4gICAgICBvcHRpb25zLnN1cHBvcnRzU3VnZ2VzdCA9IHRydWU7XG4gICAgICBTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfVxuICB9LFxuXG4gIGdlb2NvZGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2VvY29kZSh0aGlzKTtcbiAgfSxcblxuICByZXZlcnNlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJldmVyc2VHZW9jb2RlKHRoaXMpO1xuICB9LFxuXG4gIHN1Z2dlc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyByZXF1aXJlcyBlaXRoZXIgdGhlIEVzcmkgV29ybGQgR2VvY29kaW5nIFNlcnZpY2Ugb3IgYSA8MTAuMyBBcmNHSVMgU2VydmVyIEdlb2NvZGluZyBTZXJ2aWNlIHRoYXQgc3VwcG9ydHMgc3VnZ2VzdC5cbiAgICByZXR1cm4gc3VnZ2VzdCh0aGlzKTtcbiAgfSxcblxuICBfY29uZmlybVN1Z2dlc3RTdXBwb3J0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5tZXRhZGF0YShmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9XG4gICAgICAvLyBwcmUgMTAuMyBnZW9jb2Rpbmcgc2VydmljZXMgZG9udCBsaXN0IGNhcGFiaWxpdGllcyAoYW5kIGRvbnQgc3VwcG9ydCBtYXhMb2NhdGlvbnMpXG4gICAgICAvLyBvbmx5IFNPTUUgaW5kaXZpZHVhbCBzZXJ2aWNlcyBoYXZlIGJlZW4gY29uZmlndXJlZCB0byBzdXBwb3J0IGFza2luZyBmb3Igc3VnZ2VzdGlvbnNcbiAgICAgIGlmICghcmVzcG9uc2UuY2FwYWJpbGl0aWVzKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vcHRpb25zLmN1c3RvbVBhcmFtID0gcmVzcG9uc2Uuc2luZ2xlTGluZUFkZHJlc3NGaWVsZC5uYW1lO1xuICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5jYXBhYmlsaXRpZXMuaW5kZXhPZignU3VnZ2VzdCcpID4gLTEpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnN1cHBvcnRzU3VnZ2VzdCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VvY29kZVNlcnZpY2UgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBHZW9jb2RlU2VydmljZShvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2VvY29kZVNlcnZpY2U7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcblxuZXhwb3J0IHZhciBHZW9zZWFyY2hDb3JlID0gTC5FdmVudGVkLmV4dGVuZCh7XG5cbiAgb3B0aW9uczoge1xuICAgIHpvb21Ub1Jlc3VsdDogdHJ1ZSxcbiAgICB1c2VNYXBCb3VuZHM6IDEyLFxuICAgIHNlYXJjaEJvdW5kczogbnVsbFxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChjb250cm9sLCBvcHRpb25zKSB7XG4gICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fY29udHJvbCA9IGNvbnRyb2w7XG5cbiAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMucHJvdmlkZXJzIHx8ICFvcHRpb25zLnByb3ZpZGVycy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc3BlY2lmeSBhdCBsZWFzdCBvbmUgcHJvdmlkZXInKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wcm92aWRlcnMgPSBvcHRpb25zLnByb3ZpZGVycztcbiAgfSxcblxuICBfZ2VvY29kZTogZnVuY3Rpb24gKHRleHQsIGtleSwgcHJvdmlkZXIpIHtcbiAgICB2YXIgYWN0aXZlUmVxdWVzdHMgPSAwO1xuICAgIHZhciBhbGxSZXN1bHRzID0gW107XG4gICAgdmFyIGJvdW5kcztcblxuICAgIHZhciBjYWxsYmFjayA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0cykge1xuICAgICAgYWN0aXZlUmVxdWVzdHMtLTtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICAgIGFsbFJlc3VsdHMgPSBhbGxSZXN1bHRzLmNvbmNhdChyZXN1bHRzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZVJlcXVlc3RzIDw9IDApIHtcbiAgICAgICAgYm91bmRzID0gdGhpcy5fYm91bmRzRnJvbVJlc3VsdHMoYWxsUmVzdWx0cyk7XG5cbiAgICAgICAgdGhpcy5maXJlKCdyZXN1bHRzJywge1xuICAgICAgICAgIHJlc3VsdHM6IGFsbFJlc3VsdHMsXG4gICAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgICAgbGF0bG5nOiAoYm91bmRzKSA/IGJvdW5kcy5nZXRDZW50ZXIoKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuem9vbVRvUmVzdWx0ICYmIGJvdW5kcykge1xuICAgICAgICAgIHRoaXMuX2NvbnRyb2wuX21hcC5maXRCb3VuZHMoYm91bmRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlyZSgnbG9hZCcpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgYWN0aXZlUmVxdWVzdHMrKztcbiAgICAgIHByb3ZpZGVyLnJlc3VsdHModGV4dCwga2V5LCB0aGlzLl9zZWFyY2hCb3VuZHMoKSwgY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3Byb3ZpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBhY3RpdmVSZXF1ZXN0cysrO1xuICAgICAgICB0aGlzLl9wcm92aWRlcnNbaV0ucmVzdWx0cyh0ZXh0LCBrZXksIHRoaXMuX3NlYXJjaEJvdW5kcygpLCBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9zdWdnZXN0OiBmdW5jdGlvbiAodGV4dCkge1xuICAgIHZhciBhY3RpdmVSZXF1ZXN0cyA9IHRoaXMuX3Byb3ZpZGVycy5sZW5ndGg7XG5cbiAgICB2YXIgY3JlYXRlQ2FsbGJhY2sgPSBMLlV0aWwuYmluZChmdW5jdGlvbiAodGV4dCwgcHJvdmlkZXIpIHtcbiAgICAgIHJldHVybiBMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH1cblxuICAgICAgICB2YXIgaTtcblxuICAgICAgICBhY3RpdmVSZXF1ZXN0cyA9IGFjdGl2ZVJlcXVlc3RzIC0gMTtcblxuICAgICAgICBpZiAodGV4dC5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IHN1Z2dlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzdWdnZXN0aW9uc1tpXS5wcm92aWRlciA9IHByb3ZpZGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB3ZSBzdGlsbCBuZWVkIHRvIHVwZGF0ZSB0aGUgVUlcbiAgICAgICAgICB0aGlzLl9jb250cm9sLl9yZW5kZXJTdWdnZXN0aW9ucyhzdWdnZXN0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvdmlkZXIuX2xhc3RSZW5kZXIgIT09IHRleHQgJiYgcHJvdmlkZXIubm9kZXMpIHtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcHJvdmlkZXIubm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm92aWRlci5ub2Rlc1tpXS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbnRyb2wuX3N1Z2dlc3Rpb25zLnJlbW92ZUNoaWxkKHByb3ZpZGVyLm5vZGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwcm92aWRlci5ub2RlcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN1Z2dlc3Rpb25zLmxlbmd0aCAmJiB0aGlzLl9jb250cm9sLl9pbnB1dC52YWx1ZSA9PT0gdGV4dCkge1xuICAgICAgICAgIHRoaXMuX2NvbnRyb2wuY2xlYXJTdWdnZXN0aW9ucyhwcm92aWRlci5ub2Rlcyk7XG5cbiAgICAgICAgICBwcm92aWRlci5fbGFzdFJlbmRlciA9IHRleHQ7XG4gICAgICAgICAgcHJvdmlkZXIubm9kZXMgPSB0aGlzLl9jb250cm9sLl9yZW5kZXJTdWdnZXN0aW9ucyhzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgdGhpcy5fY29udHJvbC5fbm9kZXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0aGlzLl9wZW5kaW5nU3VnZ2VzdGlvbnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcHJvdmlkZXIgPSB0aGlzLl9wcm92aWRlcnNbaV07XG4gICAgICB2YXIgcmVxdWVzdCA9IHByb3ZpZGVyLnN1Z2dlc3Rpb25zKHRleHQsIHRoaXMuX3NlYXJjaEJvdW5kcygpLCBjcmVhdGVDYWxsYmFjayh0ZXh0LCBwcm92aWRlcikpO1xuICAgICAgdGhpcy5fcGVuZGluZ1N1Z2dlc3Rpb25zLnB1c2gocmVxdWVzdCk7XG4gICAgfVxuICB9LFxuXG4gIF9zZWFyY2hCb3VuZHM6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnNlYXJjaEJvdW5kcyAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zZWFyY2hCb3VuZHM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy51c2VNYXBCb3VuZHMgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZU1hcEJvdW5kcyA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2wuX21hcC5nZXRCb3VuZHMoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZU1hcEJvdW5kcyA8PSB0aGlzLl9jb250cm9sLl9tYXAuZ2V0Wm9vbSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udHJvbC5fbWFwLmdldEJvdW5kcygpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIF9ib3VuZHNGcm9tUmVzdWx0czogZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG51bGxJc2xhbmQgPSBMLmxhdExuZ0JvdW5kcyhbMCwgMF0sIFswLCAwXSk7XG4gICAgdmFyIHJlc3VsdEJvdW5kcyA9IFtdO1xuICAgIHZhciByZXN1bHRMYXRsbmdzID0gW107XG5cbiAgICAvLyBjb2xsZWN0IHRoZSBib3VuZHMgYW5kIGNlbnRlciBvZiBlYWNoIHJlc3VsdFxuICAgIGZvciAodmFyIGkgPSByZXN1bHRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gcmVzdWx0c1tpXTtcblxuICAgICAgcmVzdWx0TGF0bG5ncy5wdXNoKHJlc3VsdC5sYXRsbmcpO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgYm91bmRzIGFyZSB2YWxpZCBhbmQgbm90IDAsMC4gc29tZXRpbWVzIGJvdW5kcyBhcmUgaW5jb3JyZWN0IG9yIG5vdCBwcmVzZW50XG4gICAgICBpZiAocmVzdWx0LmJvdW5kcyAmJiByZXN1bHQuYm91bmRzLmlzVmFsaWQoKSAmJiAhcmVzdWx0LmJvdW5kcy5lcXVhbHMobnVsbElzbGFuZCkpIHtcbiAgICAgICAgcmVzdWx0Qm91bmRzLnB1c2gocmVzdWx0LmJvdW5kcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZm9ybSBhIGJvdW5kcyBvYmplY3QgY29udGFpbmluZyBhbGwgY2VudGVyIHBvaW50c1xuICAgIHZhciBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhyZXN1bHRMYXRsbmdzKTtcblxuICAgIC8vIGFuZCBleHRlbmQgaXQgdG8gY29udGFpbiBhbGwgYm91bmRzIG9iamVjdHNcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlc3VsdEJvdW5kcy5sZW5ndGg7IGorKykge1xuICAgICAgYm91bmRzLmV4dGVuZChyZXN1bHRCb3VuZHNbal0pO1xuICAgIH1cblxuICAgIHJldHVybiBib3VuZHM7XG4gIH0sXG5cbiAgX2dldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGF0dHJpYnMgPSBbXTtcbiAgICB2YXIgcHJvdmlkZXJzID0gdGhpcy5fcHJvdmlkZXJzO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwcm92aWRlcnNbaV0ub3B0aW9ucy5hdHRyaWJ1dGlvbikge1xuICAgICAgICBhdHRyaWJzLnB1c2gocHJvdmlkZXJzW2ldLm9wdGlvbnMuYXR0cmlidXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhdHRyaWJzLmpvaW4oJywgJyk7XG4gIH1cblxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW9zZWFyY2hDb3JlIChjb250cm9sLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgR2Vvc2VhcmNoQ29yZShjb250cm9sLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2Vvc2VhcmNoQ29yZTtcbiIsImltcG9ydCB7IEdlb2NvZGVTZXJ2aWNlIH0gZnJvbSAnLi4vU2VydmljZXMvR2VvY29kZSc7XG5cbmV4cG9ydCB2YXIgQXJjZ2lzT25saW5lUHJvdmlkZXIgPSBHZW9jb2RlU2VydmljZS5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgbGFiZWw6ICdQbGFjZXMgYW5kIEFkZHJlc3NlcycsXG4gICAgbWF4UmVzdWx0czogNVxuICB9LFxuXG4gIHN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAodGV4dCwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciByZXF1ZXN0ID0gdGhpcy5zdWdnZXN0KCkudGV4dCh0ZXh0KTtcblxuICAgIGlmIChib3VuZHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aGluKGJvdW5kcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb3VudHJpZXMpIHtcbiAgICAgIHJlcXVlc3QuY291bnRyaWVzKHRoaXMub3B0aW9ucy5jb3VudHJpZXMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2F0ZWdvcmllcykge1xuICAgICAgcmVxdWVzdC5jYXRlZ29yeSh0aGlzLm9wdGlvbnMuY2F0ZWdvcmllcyk7XG4gICAgfVxuXG4gICAgLy8gMTUgaXMgdGhlIG1heGltdW0gbnVtYmVyIG9mIHN1Z2dlc3Rpb25zIHRoYXQgY2FuIGJlIHJldHVybmVkXG4gICAgcmVxdWVzdC5tYXhTdWdnZXN0aW9ucyh0aGlzLm9wdGlvbnMubWF4UmVzdWx0cyk7XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXN1bHRzLCByZXNwb25zZSkge1xuICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gW107XG4gICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgIHdoaWxlIChyZXNwb25zZS5zdWdnZXN0aW9ucy5sZW5ndGggJiYgc3VnZ2VzdGlvbnMubGVuZ3RoIDw9ICh0aGlzLm9wdGlvbnMubWF4UmVzdWx0cyAtIDEpKSB7XG4gICAgICAgICAgdmFyIHN1Z2dlc3Rpb24gPSByZXNwb25zZS5zdWdnZXN0aW9ucy5zaGlmdCgpO1xuICAgICAgICAgIGlmICghc3VnZ2VzdGlvbi5pc0NvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgICB0ZXh0OiBzdWdnZXN0aW9uLnRleHQsXG4gICAgICAgICAgICAgIG1hZ2ljS2V5OiBzdWdnZXN0aW9uLm1hZ2ljS2V5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKGVycm9yLCBzdWdnZXN0aW9ucyk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgcmVzdWx0czogZnVuY3Rpb24gKHRleHQsIGtleSwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciByZXF1ZXN0ID0gdGhpcy5nZW9jb2RlKCkudGV4dCh0ZXh0KTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIHJlcXVlc3Qua2V5KGtleSk7XG4gICAgfVxuICAgIC8vIGluIHRoZSBmdXR1cmUgQWRkcmVzcy9TdHJlZXROYW1lIGdlb2NvZGluZyByZXF1ZXN0cyB0aGF0IGluY2x1ZGUgYSBtYWdpY0tleSB3aWxsIGFsd2F5cyBvbmx5IHJldHVybiBvbmUgbWF0Y2hcbiAgICByZXF1ZXN0Lm1heExvY2F0aW9ucyh0aGlzLm9wdGlvbnMubWF4UmVzdWx0cyk7XG5cbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICByZXF1ZXN0LndpdGhpbihib3VuZHMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZm9yU3RvcmFnZSkge1xuICAgICAgcmVxdWVzdC5mb3JTdG9yYWdlKHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UucmVzdWx0cyk7XG4gICAgfSwgdGhpcyk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gYXJjZ2lzT25saW5lUHJvdmlkZXIgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBBcmNnaXNPbmxpbmVQcm92aWRlcihvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJjZ2lzT25saW5lUHJvdmlkZXI7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IGdlb3NlYXJjaENvcmUgfSBmcm9tICcuLi9DbGFzc2VzL0dlb3NlYXJjaENvcmUnO1xuaW1wb3J0IHsgYXJjZ2lzT25saW5lUHJvdmlkZXIgfSBmcm9tICcuLi9Qcm92aWRlcnMvQXJjZ2lzT25saW5lR2VvY29kZXInO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gJ2VzcmktbGVhZmxldCc7XG5cbmV4cG9ydCB2YXIgR2Vvc2VhcmNoID0gTC5Db250cm9sLmV4dGVuZCh7XG4gIGluY2x1ZGVzOiBMLk1peGluLkV2ZW50cyxcblxuICBvcHRpb25zOiB7XG4gICAgcG9zaXRpb246ICd0b3BsZWZ0JyxcbiAgICBjb2xsYXBzZUFmdGVyUmVzdWx0OiB0cnVlLFxuICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICBhbGxvd011bHRpcGxlUmVzdWx0czogdHJ1ZSxcbiAgICBwbGFjZWhvbGRlcjogJ1NlYXJjaCBmb3IgcGxhY2VzIG9yIGFkZHJlc3NlcycsXG4gICAgdGl0bGU6ICdMb2NhdGlvbiBTZWFyY2gnXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblxuICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5wcm92aWRlcnMgfHwgIW9wdGlvbnMucHJvdmlkZXJzLmxlbmd0aCkge1xuICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMucHJvdmlkZXJzID0gWyBhcmNnaXNPbmxpbmVQcm92aWRlcigpIF07XG4gICAgfVxuXG4gICAgLy8gaW5zdGFudGlhdGUgdGhlIHVuZGVybHlpbmcgY2xhc3MgYW5kIHBhc3MgYWxvbmcgb3B0aW9uc1xuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUgPSBnZW9zZWFyY2hDb3JlKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX3Byb3ZpZGVycyA9IG9wdGlvbnMucHJvdmlkZXJzO1xuXG4gICAgLy8gYnViYmxlIGVhY2ggcHJvdmlkZXJzIGV2ZW50cyB0byB0aGUgY29udHJvbFxuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuYWRkRXZlbnRQYXJlbnQodGhpcyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX3Byb3ZpZGVyc1tpXS5hZGRFdmVudFBhcmVudCh0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wZW5kaW5nU3VnZ2VzdGlvbnMgPSBbXTtcblxuICAgIEwuQ29udHJvbC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKG9wdGlvbnMpO1xuICB9LFxuXG4gIF9yZW5kZXJTdWdnZXN0aW9uczogZnVuY3Rpb24gKHN1Z2dlc3Rpb25zKSB7XG4gICAgdmFyIGN1cnJlbnRHcm91cDtcblxuICAgIGlmIChzdWdnZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG4gICAgLy8gc2V0IHRoZSBtYXhIZWlnaHQgb2YgdGhlIHN1Z2dlc3Rpb25zIGJveCB0b1xuICAgIC8vIG1hcCBoZWlnaHRcbiAgICAvLyAtIHN1Z2dlc3Rpb25zIG9mZnNldCAoZGlzdGFuY2UgZnJvbSB0b3Agb2Ygc3VnZ2VzdGlvbnMgdG8gdG9wIG9mIGNvbnRyb2wpXG4gICAgLy8gLSBjb250cm9sIG9mZnNldCAoZGlzdGFuY2UgZnJvbSB0b3Agb2YgY29udHJvbCB0byB0b3Agb2YgbWFwKVxuICAgIC8vIC0gMTAgKGV4dHJhIHBhZGRpbmcpXG4gICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUubWF4SGVpZ2h0ID0gKHRoaXMuX21hcC5nZXRTaXplKCkueSAtIHRoaXMuX3N1Z2dlc3Rpb25zLm9mZnNldFRvcCAtIHRoaXMuX3dyYXBwZXIub2Zmc2V0VG9wIC0gMTApICsgJ3B4JztcblxuICAgIHZhciBub2RlcyA9IFtdO1xuICAgIHZhciBsaXN0O1xuICAgIHZhciBoZWFkZXI7XG4gICAgdmFyIHN1Z2dlc3Rpb25UZXh0QXJyYXkgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3VnZ2VzdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzdWdnZXN0aW9uID0gc3VnZ2VzdGlvbnNbaV07XG4gICAgICBpZiAoIWhlYWRlciAmJiB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wcm92aWRlcnMubGVuZ3RoID4gMSAmJiBjdXJyZW50R3JvdXAgIT09IHN1Z2dlc3Rpb24ucHJvdmlkZXIub3B0aW9ucy5sYWJlbCkge1xuICAgICAgICBoZWFkZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdzcGFuJywgJ2dlb2NvZGVyLWNvbnRyb2wtaGVhZGVyJywgdGhpcy5fc3VnZ2VzdGlvbnMpO1xuICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBzdWdnZXN0aW9uLnByb3ZpZGVyLm9wdGlvbnMubGFiZWw7XG4gICAgICAgIGhlYWRlci5pbm5lclRleHQgPSBzdWdnZXN0aW9uLnByb3ZpZGVyLm9wdGlvbnMubGFiZWw7XG4gICAgICAgIGN1cnJlbnRHcm91cCA9IHN1Z2dlc3Rpb24ucHJvdmlkZXIub3B0aW9ucy5sYWJlbDtcbiAgICAgICAgbm9kZXMucHVzaChoZWFkZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWxpc3QpIHtcbiAgICAgICAgbGlzdCA9IEwuRG9tVXRpbC5jcmVhdGUoJ3VsJywgJ2dlb2NvZGVyLWNvbnRyb2wtbGlzdCcsIHRoaXMuX3N1Z2dlc3Rpb25zKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN1Z2dlc3Rpb25UZXh0QXJyYXkuaW5kZXhPZihzdWdnZXN0aW9uLnRleHQpID09PSAtMSkge1xuICAgICAgICB2YXIgc3VnZ2VzdGlvbkl0ZW0gPSBMLkRvbVV0aWwuY3JlYXRlKCdsaScsICdnZW9jb2Rlci1jb250cm9sLXN1Z2dlc3Rpb24nLCBsaXN0KTtcblxuICAgICAgICBzdWdnZXN0aW9uSXRlbS5pbm5lckhUTUwgPSBzdWdnZXN0aW9uLnRleHQ7XG4gICAgICAgIHN1Z2dlc3Rpb25JdGVtLnByb3ZpZGVyID0gc3VnZ2VzdGlvbi5wcm92aWRlcjtcbiAgICAgICAgc3VnZ2VzdGlvbkl0ZW1bJ2RhdGEtbWFnaWMta2V5J10gPSBzdWdnZXN0aW9uLm1hZ2ljS2V5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsaXN0LmNoaWxkTm9kZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAvLyBpZiB0aGUgc2FtZSB0ZXh0IGFscmVhZHkgYXBwZWFycyBpbiB0aGUgbGlzdCBvZiBzdWdnZXN0aW9ucywgYXBwZW5kIGFuIGFkZGl0aW9uYWwgT2JqZWN0SUQgdG8gaXRzIG1hZ2ljS2V5IGluc3RlYWRcbiAgICAgICAgICBpZiAobGlzdC5jaGlsZE5vZGVzW2pdLmlubmVySFRNTCA9PT0gc3VnZ2VzdGlvbi50ZXh0KSB7XG4gICAgICAgICAgICBsaXN0LmNoaWxkTm9kZXNbal1bJ2RhdGEtbWFnaWMta2V5J10gKz0gJywnICsgc3VnZ2VzdGlvbi5tYWdpY0tleTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN1Z2dlc3Rpb25UZXh0QXJyYXkucHVzaChzdWdnZXN0aW9uLnRleHQpO1xuICAgIH1cblxuICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9pbnB1dCwgJ2dlb2NvZGVyLWNvbnRyb2wtbG9hZGluZycpO1xuXG4gICAgbm9kZXMucHVzaChsaXN0KTtcblxuICAgIHJldHVybiBub2RlcztcbiAgfSxcblxuICBfYm91bmRzRnJvbVJlc3VsdHM6IGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgaWYgKCFyZXN1bHRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBudWxsSXNsYW5kID0gTC5sYXRMbmdCb3VuZHMoWzAsIDBdLCBbMCwgMF0pO1xuICAgIHZhciByZXN1bHRCb3VuZHMgPSBbXTtcbiAgICB2YXIgcmVzdWx0TGF0bG5ncyA9IFtdO1xuXG4gICAgLy8gY29sbGVjdCB0aGUgYm91bmRzIGFuZCBjZW50ZXIgb2YgZWFjaCByZXN1bHRcbiAgICBmb3IgKHZhciBpID0gcmVzdWx0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIHJlc3VsdCA9IHJlc3VsdHNbaV07XG5cbiAgICAgIHJlc3VsdExhdGxuZ3MucHVzaChyZXN1bHQubGF0bG5nKTtcblxuICAgICAgLy8gbWFrZSBzdXJlIGJvdW5kcyBhcmUgdmFsaWQgYW5kIG5vdCAwLDAuIHNvbWV0aW1lcyBib3VuZHMgYXJlIGluY29ycmVjdCBvciBub3QgcHJlc2VudFxuICAgICAgaWYgKHJlc3VsdC5ib3VuZHMgJiYgcmVzdWx0LmJvdW5kcy5pc1ZhbGlkKCkgJiYgIXJlc3VsdC5ib3VuZHMuZXF1YWxzKG51bGxJc2xhbmQpKSB7XG4gICAgICAgIHJlc3VsdEJvdW5kcy5wdXNoKHJlc3VsdC5ib3VuZHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZvcm0gYSBib3VuZHMgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIGNlbnRlciBwb2ludHNcbiAgICB2YXIgYm91bmRzID0gTC5sYXRMbmdCb3VuZHMocmVzdWx0TGF0bG5ncyk7XG5cbiAgICAvLyBhbmQgZXh0ZW5kIGl0IHRvIGNvbnRhaW4gYWxsIGJvdW5kcyBvYmplY3RzXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXN1bHRCb3VuZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGJvdW5kcy5leHRlbmQocmVzdWx0Qm91bmRzW2pdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9LFxuXG4gIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fc3VnZ2VzdGlvbnMuaW5uZXJIVE1MID0gJyc7XG4gICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLl9pbnB1dC52YWx1ZSA9ICcnO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb2xsYXBzZUFmdGVyUmVzdWx0KSB7XG4gICAgICB0aGlzLl9pbnB1dC5wbGFjZWhvbGRlciA9ICcnO1xuICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9tYXAuc2Nyb2xsV2hlZWxab29tLmVuYWJsZWQoKSAmJiB0aGlzLl9tYXAub3B0aW9ucy5zY3JvbGxXaGVlbFpvb20pIHtcbiAgICAgIHRoaXMuX21hcC5zY3JvbGxXaGVlbFpvb20uZW5hYmxlKCk7XG4gICAgfVxuICB9LFxuXG4gIGNsZWFyU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fbm9kZXMpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5fbm9kZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgaWYgKHRoaXMuX25vZGVzW2tdLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5yZW1vdmVDaGlsZCh0aGlzLl9ub2Rlc1trXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX3NldHVwQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fd3JhcHBlciwgJ2dlb2NvZGVyLWNvbnRyb2wtZXhwYW5kZWQnKTtcbiAgICB0aGlzLl9pbnB1dC5mb2N1cygpO1xuICB9LFxuXG4gIGRpc2FibGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9pbnB1dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1pbnB1dC1kaXNhYmxlZCcpO1xuICAgIEwuRG9tRXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5fd3JhcHBlciwgJ2NsaWNrJywgdGhpcy5fc2V0dXBDbGljaywgdGhpcyk7XG4gIH0sXG5cbiAgZW5hYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5faW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWlucHV0LWRpc2FibGVkJyk7XG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl93cmFwcGVyLCAnY2xpY2snLCB0aGlzLl9zZXR1cENsaWNrLCB0aGlzKTtcbiAgfSxcblxuICBnZXRBdHRyaWJ1dGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBhdHRyaWJzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3Byb3ZpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuX3Byb3ZpZGVyc1tpXS5vcHRpb25zLmF0dHJpYnV0aW9uKSB7XG4gICAgICAgIGF0dHJpYnMucHVzaCh0aGlzLl9wcm92aWRlcnNbaV0ub3B0aW9ucy5hdHRyaWJ1dGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJpYnMuam9pbignLCAnKTtcbiAgfSxcblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIC8vIGluY2x1ZGUgJ1Bvd2VyZWQgYnkgRXNyaScgaW4gbWFwIGF0dHJpYnV0aW9uXG4gICAgVXRpbC5zZXRFc3JpQXR0cmlidXRpb24obWFwKTtcblxuICAgIHRoaXMuX21hcCA9IG1hcDtcbiAgICB0aGlzLl93cmFwcGVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2dlb2NvZGVyLWNvbnRyb2wnKTtcbiAgICB0aGlzLl9pbnB1dCA9IEwuRG9tVXRpbC5jcmVhdGUoJ2lucHV0JywgJ2dlb2NvZGVyLWNvbnRyb2wtaW5wdXQgbGVhZmxldC1iYXInLCB0aGlzLl93cmFwcGVyKTtcbiAgICB0aGlzLl9pbnB1dC50aXRsZSA9IHRoaXMub3B0aW9ucy50aXRsZTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZXhwYW5kZWQpIHtcbiAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl93cmFwcGVyLCAnZ2VvY29kZXItY29udHJvbC1leHBhbmRlZCcpO1xuICAgICAgdGhpcy5faW5wdXQucGxhY2Vob2xkZXIgPSB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgdGhpcy5fc3VnZ2VzdGlvbnMgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9ucyBsZWFmbGV0LWJhcicsIHRoaXMuX3dyYXBwZXIpO1xuXG4gICAgdmFyIGNyZWRpdHMgPSB0aGlzLl9nZW9zZWFyY2hDb3JlLl9nZXRBdHRyaWJ1dGlvbigpO1xuICAgIG1hcC5hdHRyaWJ1dGlvbkNvbnRyb2wuYWRkQXR0cmlidXRpb24oY3JlZGl0cyk7XG5cbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX2lucHV0LCAnZm9jdXMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdGhpcy5faW5wdXQucGxhY2Vob2xkZXIgPSB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXI7XG4gICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fd3JhcHBlciwgJ2dlb2NvZGVyLWNvbnRyb2wtZXhwYW5kZWQnKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fd3JhcHBlciwgJ2NsaWNrJywgdGhpcy5fc2V0dXBDbGljaywgdGhpcyk7XG5cbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX3N1Z2dlc3Rpb25zLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBzdWdnZXN0aW9uSXRlbSA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX2dlb2NvZGUoc3VnZ2VzdGlvbkl0ZW0uaW5uZXJIVE1MLCBzdWdnZXN0aW9uSXRlbVsnZGF0YS1tYWdpYy1rZXknXSwgc3VnZ2VzdGlvbkl0ZW0ucHJvdmlkZXIpO1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9pbnB1dCwgJ2JsdXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIHRleHQgPSAoZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50KS52YWx1ZTtcblxuICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XG5cbiAgICAgIHZhciBsaXN0ID0gdGhpcy5fc3VnZ2VzdGlvbnMucXVlcnlTZWxlY3RvckFsbCgnLicgKyAnZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9uJyk7XG4gICAgICB2YXIgc2VsZWN0ZWQgPSB0aGlzLl9zdWdnZXN0aW9ucy5xdWVyeVNlbGVjdG9yQWxsKCcuJyArICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJylbMF07XG4gICAgICB2YXIgc2VsZWN0ZWRQb3NpdGlvbjtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsaXN0W2ldID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgIHNlbGVjdGVkUG9zaXRpb24gPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgLypcbiAgICAgICAgICAgIGlmIGFuIGl0ZW0gaGFzIGJlZW4gc2VsZWN0ZWQsIGdlb2NvZGUgaXRcbiAgICAgICAgICAgIGlmIGZvY3VzIGlzIG9uIHRoZSBpbnB1dCB0ZXh0Ym94LCBnZW9jb2RlIG9ubHkgaWYgbXVsdGlwbGUgcmVzdWx0cyBhcmUgYWxsb3dlZCBhbmQgbW9yZSB0aGFuIHR3byBjaGFyYWN0ZXJzIGFyZSBwcmVzZW50LCBvciBpZiBhIHNpbmdsZSBzdWdnZXN0aW9uIGlzIGRpc3BsYXllZC5cbiAgICAgICAgICAgIGlmIGxlc3MgdGhhbiB0d28gY2hhcmFjdGVycyBoYXZlIGJlZW4gdHlwZWQsIGFib3J0IHRoZSBnZW9jb2RlXG4gICAgICAgICAgKi9cbiAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX2dlb2NvZGUoc2VsZWN0ZWQuaW5uZXJIVE1MLCBzZWxlY3RlZFsnZGF0YS1tYWdpYy1rZXknXSwgc2VsZWN0ZWQucHJvdmlkZXIpO1xuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmFsbG93TXVsdGlwbGVSZXN1bHRzICYmIHRleHQubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX2dlb2NvZGUodGhpcy5faW5wdXQudmFsdWUsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3MobGlzdFswXSwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fZ2VvY29kZShsaXN0WzBdLmlubmVySFRNTCwgbGlzdFswXVsnZGF0YS1tYWdpYy1rZXknXSwgbGlzdFswXS5wcm92aWRlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgIHRoaXMuX2lucHV0LmJsdXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyhzZWxlY3RlZCwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcHJldmlvdXNJdGVtID0gbGlzdFtzZWxlY3RlZFBvc2l0aW9uIC0gMV07XG5cbiAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgcHJldmlvdXNJdGVtKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3MocHJldmlvdXNJdGVtLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3MobGlzdFtsaXN0Lmxlbmd0aCAtIDFdLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHNlbGVjdGVkLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBuZXh0SXRlbSA9IGxpc3Rbc2VsZWN0ZWRQb3NpdGlvbiArIDFdO1xuXG4gICAgICAgICAgaWYgKHNlbGVjdGVkICYmIG5leHRJdGVtKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3MobmV4dEl0ZW0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhsaXN0WzBdLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIHdoZW4gdGhlIGlucHV0IGNoYW5nZXMgd2Ugc2hvdWxkIGNhbmNlbCBhbGwgcGVuZGluZyBzdWdnZXN0aW9uIHJlcXVlc3RzIGlmIHBvc3NpYmxlIHRvIGF2b2lkIHJlc3VsdCBjb2xsaXNpb25zXG4gICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wZW5kaW5nU3VnZ2VzdGlvbnMubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcGVuZGluZ1N1Z2dlc3Rpb25zW3hdO1xuICAgICAgICAgICAgaWYgKHJlcXVlc3QgJiYgcmVxdWVzdC5hYm9ydCAmJiAhcmVxdWVzdC5pZCkge1xuICAgICAgICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9pbnB1dCwgJ2tleXVwJywgTC5VdGlsLnRocm90dGxlKGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIga2V5ID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgICB2YXIgdGV4dCA9IChlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQpLnZhbHVlO1xuXG4gICAgICAvLyByZXF1aXJlIGF0IGxlYXN0IDIgY2hhcmFjdGVycyBmb3Igc3VnZ2VzdGlvbnNcbiAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8IDIpIHtcbiAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9pbnB1dCwgJ2dlb2NvZGVyLWNvbnRyb2wtbG9hZGluZycpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHRoaXMgaXMgdGhlIGVzY2FwZSBrZXkgaXQgd2lsbCBjbGVhciB0aGUgaW5wdXQgc28gY2xlYXIgc3VnZ2VzdGlvbnNcbiAgICAgIGlmIChrZXkgPT09IDI3KSB7XG4gICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHRoaXMgaXMgTk9UIHRoZSB1cC9kb3duIGFycm93cyBvciBlbnRlciBtYWtlIGEgc3VnZ2VzdGlvblxuICAgICAgaWYgKGtleSAhPT0gMTMgJiYga2V5ICE9PSAzOCAmJiBrZXkgIT09IDQwKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbnB1dC52YWx1ZSAhPT0gdGhpcy5fbGFzdFZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5fbGFzdFZhbHVlID0gdGhpcy5faW5wdXQudmFsdWU7XG4gICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1sb2FkaW5nJyk7XG4gICAgICAgICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fc3VnZ2VzdCh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDUwLCB0aGlzKSwgdGhpcyk7XG5cbiAgICBMLkRvbUV2ZW50LmRpc2FibGVDbGlja1Byb3BhZ2F0aW9uKHRoaXMuX3dyYXBwZXIpO1xuXG4gICAgLy8gd2hlbiBtb3VzZSBtb3ZlcyBvdmVyIHN1Z2dlc3Rpb25zIGRpc2FibGUgc2Nyb2xsIHdoZWVsIHpvb20gaWYgaXRzIGVuYWJsZWRcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX3N1Z2dlc3Rpb25zLCAnbW91c2VvdmVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChtYXAuc2Nyb2xsV2hlZWxab29tLmVuYWJsZWQoKSAmJiBtYXAub3B0aW9ucy5zY3JvbGxXaGVlbFpvb20pIHtcbiAgICAgICAgbWFwLnNjcm9sbFdoZWVsWm9vbS5kaXNhYmxlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB3aGVuIG1vdXNlIG1vdmVzIGxlYXZlcyBzdWdnZXN0aW9ucyBlbmFibGUgc2Nyb2xsIHdoZWVsIHpvb20gaWYgaXRzIGRpc2FibGVkXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9zdWdnZXN0aW9ucywgJ21vdXNlb3V0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmICghbWFwLnNjcm9sbFdoZWVsWm9vbS5lbmFibGVkKCkgJiYgbWFwLm9wdGlvbnMuc2Nyb2xsV2hlZWxab29tKSB7XG4gICAgICAgIG1hcC5zY3JvbGxXaGVlbFpvb20uZW5hYmxlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLm9uKCdsb2FkJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9pbnB1dCwgJ2dlb2NvZGVyLWNvbnRyb2wtbG9hZGluZycpO1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgdGhpcy5faW5wdXQuYmx1cigpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXMuX3dyYXBwZXI7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2Vvc2VhcmNoIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgR2Vvc2VhcmNoKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW9zZWFyY2g7XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IEZlYXR1cmVMYXllclNlcnZpY2UgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xuXG5leHBvcnQgdmFyIEZlYXR1cmVMYXllclByb3ZpZGVyID0gRmVhdHVyZUxheWVyU2VydmljZS5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgbGFiZWw6ICdGZWF0dXJlIExheWVyJyxcbiAgICBtYXhSZXN1bHRzOiA1LFxuICAgIGJ1ZmZlclJhZGl1czogMTAwMCxcbiAgICBmb3JtYXRTdWdnZXN0aW9uOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgcmV0dXJuIGZlYXR1cmUucHJvcGVydGllc1t0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzWzBdXTtcbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBGZWF0dXJlTGF5ZXJTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcyA9IFt0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzXTtcbiAgICB9XG4gICAgdGhpcy5fc3VnZ2VzdGlvbnNRdWVyeSA9IHRoaXMucXVlcnkoKTtcbiAgICB0aGlzLl9yZXN1bHRzUXVlcnkgPSB0aGlzLnF1ZXJ5KCk7XG4gIH0sXG5cbiAgc3VnZ2VzdGlvbnM6IGZ1bmN0aW9uICh0ZXh0LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdGhpcy5fc3VnZ2VzdGlvbnNRdWVyeS53aGVyZSh0aGlzLl9idWlsZFF1ZXJ5KHRleHQpKVxuICAgICAgLnJldHVybkdlb21ldHJ5KGZhbHNlKTtcblxuICAgIGlmIChib3VuZHMpIHtcbiAgICAgIHF1ZXJ5LmludGVyc2VjdHMoYm91bmRzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmlkRmllbGQpIHtcbiAgICAgIHF1ZXJ5LmZpZWxkcyhbdGhpcy5vcHRpb25zLmlkRmllbGRdLmNvbmNhdCh0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzKSk7XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBxdWVyeS5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXN1bHRzLCByYXcpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvciwgW10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmlkRmllbGQgPSByYXcub2JqZWN0SWRGaWVsZE5hbWU7XG4gICAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gcmVzdWx0cy5mZWF0dXJlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHZhciBmZWF0dXJlID0gcmVzdWx0cy5mZWF0dXJlc1tpXTtcbiAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5mb3JtYXRTdWdnZXN0aW9uLmNhbGwodGhpcywgZmVhdHVyZSksXG4gICAgICAgICAgICBtYWdpY0tleTogZmVhdHVyZS5pZFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBzdWdnZXN0aW9ucy5zbGljZSgwLCB0aGlzLm9wdGlvbnMubWF4UmVzdWx0cykpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH0sXG5cbiAgcmVzdWx0czogZnVuY3Rpb24gKHRleHQsIGtleSwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciBxdWVyeSA9IHRoaXMuX3Jlc3VsdHNRdWVyeTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGRlbGV0ZSBxdWVyeS5wYXJhbXMud2hlcmU7XG4gICAgICBxdWVyeS5mZWF0dXJlSWRzKFtrZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcXVlcnkud2hlcmUodGhpcy5fYnVpbGRRdWVyeSh0ZXh0KSk7XG4gICAgfVxuXG4gICAgaWYgKGJvdW5kcykge1xuICAgICAgcXVlcnkud2l0aGluKGJvdW5kcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXJ5LnJ1bihMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIGZlYXR1cmVzKSB7XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmZWF0dXJlcy5mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZmVhdHVyZSA9IGZlYXR1cmVzLmZlYXR1cmVzW2ldO1xuICAgICAgICBpZiAoZmVhdHVyZSkge1xuICAgICAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9mZWF0dXJlQm91bmRzKGZlYXR1cmUpO1xuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIGxhdGxuZzogYm91bmRzLmdldENlbnRlcigpLFxuICAgICAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgICAgICB0ZXh0OiB0aGlzLm9wdGlvbnMuZm9ybWF0U3VnZ2VzdGlvbi5jYWxsKHRoaXMsIGZlYXR1cmUpLFxuICAgICAgICAgICAgcHJvcGVydGllczogZmVhdHVyZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgZ2VvanNvbjogZmVhdHVyZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcblxuICAgICAgICAgIC8vIGNsZWFyIHF1ZXJ5IHBhcmFtZXRlcnMgZm9yIHRoZSBuZXh0IHNlYXJjaFxuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9yZXN1bHRzUXVlcnkucGFyYW1zWydvYmplY3RJZHMnXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3VsdHMpO1xuICAgIH0sIHRoaXMpKTtcbiAgfSxcblxuICBvcmRlckJ5OiBmdW5jdGlvbiAoZmllbGROYW1lLCBvcmRlcikge1xuICAgIHRoaXMuX3N1Z2dlc3Rpb25zUXVlcnkub3JkZXJCeShmaWVsZE5hbWUsIG9yZGVyKTtcbiAgfSxcblxuICBfYnVpbGRRdWVyeTogZnVuY3Rpb24gKHRleHQpIHtcbiAgICB2YXIgcXVlcnlTdHJpbmcgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSB0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZmllbGQgPSAndXBwZXIoXCInICsgdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkc1tpXSArICdcIiknO1xuXG4gICAgICBxdWVyeVN0cmluZy5wdXNoKGZpZWxkICsgXCIgTElLRSB1cHBlcignJVwiICsgdGV4dCArIFwiJScpXCIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMud2hlcmUpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMud2hlcmUgKyAnIEFORCAoJyArIHF1ZXJ5U3RyaW5nLmpvaW4oJyBPUiAnKSArICcpJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHF1ZXJ5U3RyaW5nLmpvaW4oJyBPUiAnKTtcbiAgICB9XG4gIH0sXG5cbiAgX2ZlYXR1cmVCb3VuZHM6IGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgdmFyIGdlb2pzb24gPSBMLmdlb0pzb24oZmVhdHVyZSk7XG4gICAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgdmFyIGNlbnRlciA9IGdlb2pzb24uZ2V0Qm91bmRzKCkuZ2V0Q2VudGVyKCk7XG4gICAgICB2YXIgbG5nUmFkaXVzID0gKCh0aGlzLm9wdGlvbnMuYnVmZmVyUmFkaXVzIC8gNDAwNzUwMTcpICogMzYwKSAvIE1hdGguY29zKCgxODAgLyBNYXRoLlBJKSAqIGNlbnRlci5sYXQpO1xuICAgICAgdmFyIGxhdFJhZGl1cyA9ICh0aGlzLm9wdGlvbnMuYnVmZmVyUmFkaXVzIC8gNDAwNzUwMTcpICogMzYwO1xuICAgICAgcmV0dXJuIEwubGF0TG5nQm91bmRzKFtjZW50ZXIubGF0IC0gbGF0UmFkaXVzLCBjZW50ZXIubG5nIC0gbG5nUmFkaXVzXSwgW2NlbnRlci5sYXQgKyBsYXRSYWRpdXMsIGNlbnRlci5sbmcgKyBsbmdSYWRpdXNdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdlb2pzb24uZ2V0Qm91bmRzKCk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVMYXllclByb3ZpZGVyIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgRmVhdHVyZUxheWVyUHJvdmlkZXIob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZlYXR1cmVMYXllclByb3ZpZGVyO1xuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcblxuZXhwb3J0IHZhciBNYXBTZXJ2aWNlUHJvdmlkZXIgPSBNYXBTZXJ2aWNlLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBsYXllcnM6IFswXSxcbiAgICBsYWJlbDogJ01hcCBTZXJ2aWNlJyxcbiAgICBidWZmZXJSYWRpdXM6IDEwMDAsXG4gICAgbWF4UmVzdWx0czogNSxcbiAgICBmb3JtYXRTdWdnZXN0aW9uOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgcmV0dXJuIGZlYXR1cmUucHJvcGVydGllc1tmZWF0dXJlLmRpc3BsYXlGaWVsZE5hbWVdICsgJyA8c21hbGw+JyArIGZlYXR1cmUubGF5ZXJOYW1lICsgJzwvc21hbGw+JztcbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBNYXBTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fZ2V0SWRGaWVsZHMoKTtcbiAgfSxcblxuICBzdWdnZXN0aW9uczogZnVuY3Rpb24gKHRleHQsIGJvdW5kcywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxdWVzdCA9IHRoaXMuZmluZCgpLnRleHQodGV4dCkuZmllbGRzKHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMpLnJldHVybkdlb21ldHJ5KGZhbHNlKS5sYXllcnModGhpcy5vcHRpb25zLmxheWVycyk7XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXN1bHRzLCByYXcpIHtcbiAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICB2YXIgY291bnQgPSBNYXRoLm1pbih0aGlzLm9wdGlvbnMubWF4UmVzdWx0cywgcmVzdWx0cy5mZWF0dXJlcy5sZW5ndGgpO1xuICAgICAgICByYXcucmVzdWx0cyA9IHJhdy5yZXN1bHRzLnJldmVyc2UoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGZlYXR1cmUgPSByZXN1bHRzLmZlYXR1cmVzW2ldO1xuICAgICAgICAgIHZhciByZXN1bHQgPSByYXcucmVzdWx0c1tpXTtcbiAgICAgICAgICB2YXIgbGF5ZXIgPSByZXN1bHQubGF5ZXJJZDtcbiAgICAgICAgICB2YXIgaWRGaWVsZCA9IHRoaXMuX2lkRmllbGRzW2xheWVyXTtcbiAgICAgICAgICBmZWF0dXJlLmxheWVySWQgPSBsYXllcjtcbiAgICAgICAgICBmZWF0dXJlLmxheWVyTmFtZSA9IHRoaXMuX2xheWVyTmFtZXNbbGF5ZXJdO1xuICAgICAgICAgIGZlYXR1cmUuZGlzcGxheUZpZWxkTmFtZSA9IHRoaXMuX2Rpc3BsYXlGaWVsZHNbbGF5ZXJdO1xuICAgICAgICAgIGlmIChpZEZpZWxkKSB7XG4gICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgdGV4dDogdGhpcy5vcHRpb25zLmZvcm1hdFN1Z2dlc3Rpb24uY2FsbCh0aGlzLCBmZWF0dXJlKSxcbiAgICAgICAgICAgICAgbWFnaWNLZXk6IHJlc3VsdC5hdHRyaWJ1dGVzW2lkRmllbGRdICsgJzonICsgbGF5ZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FsbGJhY2soZXJyb3IsIHN1Z2dlc3Rpb25zLnJldmVyc2UoKSk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgcmVzdWx0czogZnVuY3Rpb24gKHRleHQsIGtleSwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgdmFyIHJlcXVlc3Q7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICB2YXIgZmVhdHVyZUlkID0ga2V5LnNwbGl0KCc6JylbMF07XG4gICAgICB2YXIgbGF5ZXIgPSBrZXkuc3BsaXQoJzonKVsxXTtcbiAgICAgIHJlcXVlc3QgPSB0aGlzLnF1ZXJ5KCkubGF5ZXIobGF5ZXIpLmZlYXR1cmVJZHMoZmVhdHVyZUlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdCA9IHRoaXMuZmluZCgpLnRleHQodGV4dCkuZmllbGRzKHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMpLmxheWVycyh0aGlzLm9wdGlvbnMubGF5ZXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlcywgcmVzcG9uc2UpIHtcbiAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnJlc3VsdHMpIHtcbiAgICAgICAgICByZXNwb25zZS5yZXN1bHRzID0gcmVzcG9uc2UucmVzdWx0cy5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmZWF0dXJlcy5mZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBmZWF0dXJlID0gZmVhdHVyZXMuZmVhdHVyZXNbaV07XG4gICAgICAgICAgbGF5ZXIgPSBsYXllciB8fCByZXNwb25zZS5yZXN1bHRzW2ldLmxheWVySWQ7XG5cbiAgICAgICAgICBpZiAoZmVhdHVyZSAmJiBsYXllciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5fZmVhdHVyZUJvdW5kcyhmZWF0dXJlKTtcbiAgICAgICAgICAgIGZlYXR1cmUubGF5ZXJJZCA9IGxheWVyO1xuICAgICAgICAgICAgZmVhdHVyZS5sYXllck5hbWUgPSB0aGlzLl9sYXllck5hbWVzW2xheWVyXTtcbiAgICAgICAgICAgIGZlYXR1cmUuZGlzcGxheUZpZWxkTmFtZSA9IHRoaXMuX2Rpc3BsYXlGaWVsZHNbbGF5ZXJdO1xuXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICBsYXRsbmc6IGJvdW5kcy5nZXRDZW50ZXIoKSxcbiAgICAgICAgICAgICAgYm91bmRzOiBib3VuZHMsXG4gICAgICAgICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5mb3JtYXRTdWdnZXN0aW9uLmNhbGwodGhpcywgZmVhdHVyZSksXG4gICAgICAgICAgICAgIHByb3BlcnRpZXM6IGZlYXR1cmUucHJvcGVydGllcyxcbiAgICAgICAgICAgICAgZ2VvanNvbjogZmVhdHVyZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzdWx0cy5yZXZlcnNlKCkpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIF9mZWF0dXJlQm91bmRzOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIHZhciBnZW9qc29uID0gTC5nZW9Kc29uKGZlYXR1cmUpO1xuICAgIGlmIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcbiAgICAgIHZhciBjZW50ZXIgPSBnZW9qc29uLmdldEJvdW5kcygpLmdldENlbnRlcigpO1xuICAgICAgdmFyIGxuZ1JhZGl1cyA9ICgodGhpcy5vcHRpb25zLmJ1ZmZlclJhZGl1cyAvIDQwMDc1MDE3KSAqIDM2MCkgLyBNYXRoLmNvcygoMTgwIC8gTWF0aC5QSSkgKiBjZW50ZXIubGF0KTtcbiAgICAgIHZhciBsYXRSYWRpdXMgPSAodGhpcy5vcHRpb25zLmJ1ZmZlclJhZGl1cyAvIDQwMDc1MDE3KSAqIDM2MDtcbiAgICAgIHJldHVybiBMLmxhdExuZ0JvdW5kcyhbY2VudGVyLmxhdCAtIGxhdFJhZGl1cywgY2VudGVyLmxuZyAtIGxuZ1JhZGl1c10sIFtjZW50ZXIubGF0ICsgbGF0UmFkaXVzLCBjZW50ZXIubG5nICsgbG5nUmFkaXVzXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZW9qc29uLmdldEJvdW5kcygpO1xuICAgIH1cbiAgfSxcblxuICBfbGF5ZXJNZXRhZGF0YUNhbGxiYWNrOiBmdW5jdGlvbiAobGF5ZXJpZCkge1xuICAgIHJldHVybiBMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIG1ldGFkYXRhKSB7XG4gICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9XG4gICAgICB0aGlzLl9kaXNwbGF5RmllbGRzW2xheWVyaWRdID0gbWV0YWRhdGEuZGlzcGxheUZpZWxkO1xuICAgICAgdGhpcy5fbGF5ZXJOYW1lc1tsYXllcmlkXSA9IG1ldGFkYXRhLm5hbWU7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldGFkYXRhLmZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZmllbGQgPSBtZXRhZGF0YS5maWVsZHNbaV07XG4gICAgICAgIGlmIChmaWVsZC50eXBlID09PSAnZXNyaUZpZWxkVHlwZU9JRCcpIHtcbiAgICAgICAgICB0aGlzLl9pZEZpZWxkc1tsYXllcmlkXSA9IGZpZWxkLm5hbWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBfZ2V0SWRGaWVsZHM6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9pZEZpZWxkcyA9IHt9O1xuICAgIHRoaXMuX2Rpc3BsYXlGaWVsZHMgPSB7fTtcbiAgICB0aGlzLl9sYXllck5hbWVzID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMubGF5ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLm9wdGlvbnMubGF5ZXJzW2ldO1xuICAgICAgdGhpcy5nZXQobGF5ZXIsIHt9LCB0aGlzLl9sYXllck1ldGFkYXRhQ2FsbGJhY2sobGF5ZXIpKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFwU2VydmljZVByb3ZpZGVyIChvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgTWFwU2VydmljZVByb3ZpZGVyKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBTZXJ2aWNlUHJvdmlkZXI7XG4iLCJpbXBvcnQgeyBHZW9jb2RlU2VydmljZSB9IGZyb20gJy4uL1NlcnZpY2VzL0dlb2NvZGUnO1xuXG5leHBvcnQgdmFyIEdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIgPSBHZW9jb2RlU2VydmljZS5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgbGFiZWw6ICdHZW9jb2RlIFNlcnZlcicsXG4gICAgbWF4UmVzdWx0czogNVxuICB9LFxuXG4gIHN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAodGV4dCwgYm91bmRzLCBjYWxsYmFjaykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IHRoaXMuc3VnZ2VzdCgpLnRleHQodGV4dCk7XG4gICAgICBpZiAoYm91bmRzKSB7XG4gICAgICAgIHJlcXVlc3Qud2l0aGluKGJvdW5kcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgd2hpbGUgKHJlc3BvbnNlLnN1Z2dlc3Rpb25zLmxlbmd0aCAmJiBzdWdnZXN0aW9ucy5sZW5ndGggPD0gKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzIC0gMSkpIHtcbiAgICAgICAgICAgIHZhciBzdWdnZXN0aW9uID0gcmVzcG9uc2Uuc3VnZ2VzdGlvbnMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICghc3VnZ2VzdGlvbi5pc0NvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgdGV4dDogc3VnZ2VzdGlvbi50ZXh0LFxuICAgICAgICAgICAgICAgIG1hZ2ljS2V5OiBzdWdnZXN0aW9uLm1hZ2ljS2V5XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayhlcnJvciwgc3VnZ2VzdGlvbnMpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKHVuZGVmaW5lZCwgW10pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB0aGlzLmdlb2NvZGUoKS50ZXh0KHRleHQpO1xuXG4gICAgcmVxdWVzdC5tYXhMb2NhdGlvbnModGhpcy5vcHRpb25zLm1heFJlc3VsdHMpO1xuXG4gICAgaWYgKGJvdW5kcykge1xuICAgICAgcmVxdWVzdC53aXRoaW4oYm91bmRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xuICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3BvbnNlLnJlc3VsdHMpO1xuICAgIH0sIHRoaXMpO1xuICB9XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBHZW9jb2RlU2VydmljZVByb3ZpZGVyKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW9jb2RlU2VydmljZVByb3ZpZGVyO1xuIiwiZXhwb3J0IHsgdmVyc2lvbiBhcyBWRVJTSU9OIH0gZnJvbSAnLi4vcGFja2FnZS5qc29uJztcbmV4cG9ydCB2YXIgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsID0gJ2h0dHBzOi8vZ2VvY29kZS5hcmNnaXMuY29tL2FyY2dpcy9yZXN0L3NlcnZpY2VzL1dvcmxkL0dlb2NvZGVTZXJ2ZXIvJztcblxuLy8gaW1wb3J0IHRhc2tzXG5leHBvcnQgeyBHZW9jb2RlLCBnZW9jb2RlIH0gZnJvbSAnLi9UYXNrcy9HZW9jb2RlJztcbmV4cG9ydCB7IFJldmVyc2VHZW9jb2RlLCByZXZlcnNlR2VvY29kZSB9IGZyb20gJy4vVGFza3MvUmV2ZXJzZUdlb2NvZGUnO1xuZXhwb3J0IHsgU3VnZ2VzdCwgc3VnZ2VzdCB9IGZyb20gJy4vVGFza3MvU3VnZ2VzdCc7XG5cbi8vIGltcG9ydCBzZXJ2aWNlXG5leHBvcnQgeyBHZW9jb2RlU2VydmljZSwgZ2VvY29kZVNlcnZpY2UgfSBmcm9tICcuL1NlcnZpY2VzL0dlb2NvZGUnO1xuXG4vLyBpbXBvcnQgY29udHJvbFxuZXhwb3J0IHsgR2Vvc2VhcmNoLCBnZW9zZWFyY2ggfSBmcm9tICcuL0NvbnRyb2xzL0dlb3NlYXJjaCc7XG5cbi8vIGltcG9ydCBzdXBwb3J0aW5nIGNsYXNzXG5leHBvcnQgeyBHZW9zZWFyY2hDb3JlLCBnZW9zZWFyY2hDb3JlIH0gZnJvbSAnLi9DbGFzc2VzL0dlb3NlYXJjaENvcmUnO1xuXG4vLyBpbXBvcnQgcHJvdmlkZXJzXG5leHBvcnQgeyBBcmNnaXNPbmxpbmVQcm92aWRlciwgYXJjZ2lzT25saW5lUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVycy9BcmNnaXNPbmxpbmVHZW9jb2Rlcic7XG5leHBvcnQgeyBGZWF0dXJlTGF5ZXJQcm92aWRlciwgZmVhdHVyZUxheWVyUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVycy9GZWF0dXJlTGF5ZXInO1xuZXhwb3J0IHsgTWFwU2VydmljZVByb3ZpZGVyLCBtYXBTZXJ2aWNlUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVycy9NYXBTZXJ2aWNlJztcbmV4cG9ydCB7IEdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIsIGdlb2NvZGVTZXJ2aWNlUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVycy9HZW9jb2RlU2VydmljZSc7XG4iXSwibmFtZXMiOlsiVGFzayIsIlV0aWwiLCJTZXJ2aWNlIiwiRmVhdHVyZUxheWVyU2VydmljZSIsIk1hcFNlcnZpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Q0NJTyxJQUFJLE9BQU8sR0FBR0EsZ0JBQUksQ0FBQyxNQUFNLENBQUM7QUFDakMsQ0FBQSxFQUFFLElBQUksRUFBRSx1QkFBdUI7O0FBRS9CLENBQUEsRUFBRSxNQUFNLEVBQUU7QUFDVixDQUFBLElBQUksS0FBSyxFQUFFLElBQUk7QUFDZixDQUFBLElB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QU07QUFDWCxDQUFBLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckcsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtBQUM1RCxDQUFBLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNsQixDQUFBLFFBQVEsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO0FBQzlCLENBQUEsVUFBVSxRQUFRLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDeEQsQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMzRCxDQUFBLFVBQVUsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QyxDQUFBLFVBQVUsS0FBSyxHQUFHLEtBQUssSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzs7QUFFdkQsQ0FBQSxVQUFVLElBQUksT0FBTyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7QUFDOUMsQ0FBQSxZQUFZLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEQsQ0FBQSxZQUFZLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3BDLENBQUEsWUFBWSxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFD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