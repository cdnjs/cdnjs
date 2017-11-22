/* esri-leaflet-geocoder - v2.2.7 - Tue Nov 21 2017 15:39:51 GMT-0600 (Central Standard Time)
 * Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet'), require('esri-leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', 'leaflet', 'esri-leaflet'], factory) :
	(factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Geocoding = global.L.esri.Geocoding || {}),global.L,global.L.esri));
}(this, function (exports,L,esriLeaflet) { 'use strict';

	L = 'default' in L ? L['default'] : L;

	var version = "2.2.7";

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
	    options.url = options.url || WorldGeocodingServiceUrl$1;
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
	      options.url = WorldGeocodingServiceUrl$1;
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
	      options.url = WorldGeocodingServiceUrl$1;
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

	    // make sure both click and touch spawn an address/poi search
	    L.DomEvent.addListener(this._suggestions, 'mousedown', this.geocodeSuggestion, this);
	    L.DomEvent.addListener(this._suggestions, 'touchend', this.geocodeSuggestion, this);

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
	            this._geosearchCore._geocode(selected.unformattedText, selected['data-magic-key'], selected.provider);
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

	var WorldGeocodingServiceUrl$1 = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/';

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
	    options.url = options.url || WorldGeocodingServiceUrl$1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzIiwic291cmNlcyI6WyIuLi9wYWNrYWdlLmpzb24iLCIuLi9zcmMvVGFza3MvUmV2ZXJzZUdlb2NvZGUuanMiLCIuLi9zcmMvVGFza3MvU3VnZ2VzdC5qcyIsIi4uL3NyYy9TZXJ2aWNlcy9HZW9jb2RlLmpzIiwiLi4vc3JjL0NsYXNzZXMvR2Vvc2VhcmNoQ29yZS5qcyIsIi4uL3NyYy9Qcm92aWRlcnMvQXJjZ2lzT25saW5lR2VvY29kZXIuanMiLCIuLi9zcmMvQ29udHJvbHMvR2Vvc2VhcmNoLmpzIiwiLi4vc3JjL1Byb3ZpZGVycy9GZWF0dXJlTGF5ZXIuanMiLCIuLi9zcmMvUHJvdmlkZXJzL01hcFNlcnZpY2UuanMiLCIuLi9zcmMvUHJvdmlkZXJzL0dlb2NvZGVTZXJ2aWNlLmpzIiwiLi4vc3JjL0VzcmlMZWFmbGV0R2VvY29kaW5nLmpzIiwiLi4vc3JjL1Rhc2tzL0dlb2NvZGUuanMiLCIuLi9zcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsie1xuICBcIm5hbWVcIjogXCJlc3JpLWxlYWZsZXQtZ2VvY29kZXJcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkVzcmkgR2VvY29kaW5nIHV0aWxpdHkgYW5kIHNlYXJjaCBwbHVnaW4gZm9yIExlYWZsZXQuXCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMi43XCIsXG4gIFwiYXV0aG9yXCI6IFwiUGF0cmljayBBcmx0IDxwYXJsdEBlc3JpLmNvbT4gKGh0dHA6Ly9wYXRyaWNrYXJsdC5jb20pXCIsXG4gIFwiY29udHJpYnV0b3JzXCI6IFtcbiAgICBcIlBhdHJpY2sgQXJsdCA8cGFybHRAZXNyaS5jb20+IChodHRwOi8vcGF0cmlja2FybHQuY29tKVwiLFxuICAgIFwiSm9obiBHcmF2b2lzIDxqZ3Jhdm9pc0Blc3JpLmNvbT4gKGh0dHA6Ly9qb2huZ3Jhdm9pcy5jb20pXCJcbiAgXSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZXNyaS1sZWFmbGV0XCI6IFwiXjIuMC4zXCIsXG4gICAgXCJsZWFmbGV0XCI6IFwiXjEuMC4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2hhaVwiOiBcIjMuNS4wXCIsXG4gICAgXCJnaC1yZWxlYXNlXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4wLjguNVwiLFxuICAgIFwiaW1hZ2VtaW5cIjogXCJeMy4yLjBcIixcbiAgICBcImlzcGFydGFcIjogXCJeNC4wLjBcIixcbiAgICBcImlzdGFuYnVsXCI6IFwiXjAuNC4yXCIsXG4gICAgXCJrYXJtYVwiOiBcIl4xLjMuMFwiLFxuICAgIFwia2FybWEtY2hhaS1zaW5vblwiOiBcIl4wLjEuM1wiLFxuICAgIFwia2FybWEtY292ZXJhZ2VcIjogXCJeMS4xLjFcIixcbiAgICBcImthcm1hLW1vY2hhXCI6IFwiXjEuMy4wXCIsXG4gICAgXCJrYXJtYS1tb2NoYS1yZXBvcnRlclwiOiBcIl4yLjIuMVwiLFxuICAgIFwia2FybWEtcGhhbnRvbWpzLWxhdW5jaGVyXCI6IFwiXjAuMi4wXCIsXG4gICAgXCJrYXJtYS1zb3VyY2VtYXAtbG9hZGVyXCI6IFwiXjAuMy41XCIsXG4gICAgXCJta2RpcnBcIjogXCJeMC41LjFcIixcbiAgICBcIm1vY2hhXCI6IFwiXjMuMS4wXCIsXG4gICAgXCJub2RlLXNhc3NcIjogXCJeMy4yLjBcIixcbiAgICBcInBhcmFsbGVsc2hlbGxcIjogXCJeMi4wLjBcIixcbiAgICBcInBoYW50b21qc1wiOiBcIl4xLjkuOFwiLFxuICAgIFwicm9sbHVwXCI6IFwiXjAuMjUuNFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1qc29uXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLW5vZGUtcmVzb2x2ZVwiOiBcIl4xLjQuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi11Z2xpZnlcIjogXCJeMC4zLjFcIixcbiAgICBcInNlbWlzdGFuZGFyZFwiOiBcIl45LjAuMFwiLFxuICAgIFwic2lub25cIjogXCJeMS4xMS4xXCIsXG4gICAgXCJzaW5vbi1jaGFpXCI6IFwiMi44LjBcIixcbiAgICBcInNuYXp6eVwiOiBcIl41LjAuMFwiLFxuICAgIFwidWdsaWZ5LWpzXCI6IFwiXjIuNi4xXCIsXG4gICAgXCJ3YXRjaFwiOiBcIl4wLjE3LjFcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0VzcmkvZXNyaS1sZWFmbGV0LWdlb2NvZGVyXCIsXG4gIFwianNuZXh0Om1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanNcIixcbiAgXCJqc3BtXCI6IHtcbiAgICBcInJlZ2lzdHJ5XCI6IFwibnBtXCIsXG4gICAgXCJmb3JtYXRcIjogXCJlczZcIixcbiAgICBcIm1haW5cIjogXCJzcmMvRXNyaUxlYWZsZXRHZW9jb2RpbmcuanNcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJBcGFjaGUtMi4wXCIsXG4gIFwibWFpblwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzXCIsXG4gIFwiYnJvd3NlclwiOiBcImRpc3QvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLWRlYnVnLmpzXCIsXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdEBnaXRodWIuY29tOkVzcmkvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLmdpdFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJwcmVidWlsZFwiOiBcIm1rZGlycCBkaXN0XCIsXG4gICAgXCJidWlsZFwiOiBcInJvbGx1cCAtYyBwcm9maWxlcy9kZWJ1Zy5qcyAmIHJvbGx1cCAtYyBwcm9maWxlcy9wcm9kdWN0aW9uLmpzICYgbnBtIHJ1biBjc3MgJiBucG0gcnVuIGltZ1wiLFxuICAgIFwiY3NzXCI6IFwibm9kZS1zYXNzIC4vc3JjL2VzcmktbGVhZmxldC1nZW9jb2Rlci5jc3MgLi9kaXN0L2VzcmktbGVhZmxldC1nZW9jb2Rlci5jc3MgLS1vdXRwdXQtc3R5bGUgY29tcHJlc3NlZFwiLFxuICAgIFwiaW1nXCI6IFwiaW1hZ2VtaW4gLi9zcmMvaW1nIC4vZGlzdC9pbWdcIixcbiAgICBcImxpbnRcIjogXCJzZW1pc3RhbmRhcmQgfCBzbmF6enlcIixcbiAgICBcInByZXB1Ymxpc2hcIjogXCJucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV0ZXN0XCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIi4vc2NyaXB0cy9yZWxlYXNlLnNoXCIsXG4gICAgXCJzdGFydC13YXRjaFwiOiBcIndhdGNoIFxcXCJucG0gcnVuIGJ1aWxkXFxcIiBzcmNcIixcbiAgICBcInN0YXJ0XCI6IFwicGFyYWxsZWxzaGVsbCBcXFwibnBtIHJ1biBzdGFydC13YXRjaFxcXCIgXFxcImh0dHAtc2VydmVyIC1wIDU2NzggLWMtMSAtb1xcXCJcIixcbiAgICBcInRlc3RcIjogXCJucG0gcnVuIGxpbnQgJiYga2FybWEgc3RhcnRcIlxuICB9LFxuICBcInNlbWlzdGFuZGFyZFwiOiB7XG4gICAgXCJnbG9iYWxzXCI6IFtcbiAgICAgIFwiZXhwZWN0XCIsXG4gICAgICBcIkxcIixcbiAgICAgIFwiWE1MSHR0cFJlcXVlc3RcIixcbiAgICAgIFwic2lub25cIixcbiAgICAgIFwieGhyXCJcbiAgICBdXG4gIH0sXG4gIFwic3R5bGVcIjogXCIuL2Rpc3QvZXNyaS1sZWFmbGV0LWdlb2NvZGVyLmNzc1wiXG59XG4iLCJpbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gJ2VzcmktbGVhZmxldCc7XHJcbmltcG9ydCB7IFdvcmxkR2VvY29kaW5nU2VydmljZVVybCB9IGZyb20gJy4uL0VzcmlMZWFmbGV0R2VvY29kaW5nJztcclxuXHJcbmV4cG9ydCB2YXIgUmV2ZXJzZUdlb2NvZGUgPSBUYXNrLmV4dGVuZCh7XHJcbiAgcGF0aDogJ3JldmVyc2VHZW9jb2RlJyxcclxuXHJcbiAgcGFyYW1zOiB7XHJcbiAgICBvdXRTUjogNDMyNixcclxuICAgIHJldHVybkludGVyc2VjdGlvbjogZmFsc2VcclxuICB9LFxyXG5cclxuICBzZXR0ZXJzOiB7XHJcbiAgICAnZGlzdGFuY2UnOiAnZGlzdGFuY2UnLFxyXG4gICAgJ2xhbmd1YWdlJzogJ2xhbmdDb2RlJyxcclxuICAgICdpbnRlcnNlY3Rpb24nOiAncmV0dXJuSW50ZXJzZWN0aW9uJ1xyXG4gIH0sXHJcblxyXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgIG9wdGlvbnMudXJsID0gb3B0aW9ucy51cmwgfHwgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsO1xyXG4gICAgVGFzay5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xyXG4gIH0sXHJcblxyXG4gIGxhdGxuZzogZnVuY3Rpb24gKGxhdGxuZykge1xyXG4gICAgbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcclxuICAgIHRoaXMucGFyYW1zLmxvY2F0aW9uID0gbGF0bG5nLmxuZyArICcsJyArIGxhdGxuZy5sYXQ7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9LFxyXG5cclxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XHJcbiAgICAgIHZhciByZXN1bHQ7XHJcblxyXG4gICAgICBpZiAoIWVycm9yKSB7XHJcbiAgICAgICAgcmVzdWx0ID0ge1xyXG4gICAgICAgICAgbGF0bG5nOiBMLmxhdExuZyhyZXNwb25zZS5sb2NhdGlvbi55LCByZXNwb25zZS5sb2NhdGlvbi54KSxcclxuICAgICAgICAgIGFkZHJlc3M6IHJlc3BvbnNlLmFkZHJlc3NcclxuICAgICAgICB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzdWx0LCByZXNwb25zZSk7XHJcbiAgICB9LCB0aGlzKTtcclxuICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VHZW9jb2RlIChvcHRpb25zKSB7XHJcbiAgcmV0dXJuIG5ldyBSZXZlcnNlR2VvY29kZShvcHRpb25zKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmV2ZXJzZUdlb2NvZGU7XHJcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQgeyBUYXNrLCBVdGlsIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcclxuaW1wb3J0IHsgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsIH0gZnJvbSAnLi4vRXNyaUxlYWZsZXRHZW9jb2RpbmcnO1xyXG5cclxuZXhwb3J0IHZhciBTdWdnZXN0ID0gVGFzay5leHRlbmQoe1xyXG4gIHBhdGg6ICdzdWdnZXN0JyxcclxuXHJcbiAgcGFyYW1zOiB7fSxcclxuXHJcbiAgc2V0dGVyczoge1xyXG4gICAgdGV4dDogJ3RleHQnLFxyXG4gICAgY2F0ZWdvcnk6ICdjYXRlZ29yeScsXHJcbiAgICBjb3VudHJpZXM6ICdjb3VudHJ5Q29kZScsXHJcbiAgICBtYXhTdWdnZXN0aW9uczogJ21heFN1Z2dlc3Rpb25zJ1xyXG4gIH0sXHJcblxyXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgIGlmICghb3B0aW9ucy51cmwpIHtcclxuICAgICAgb3B0aW9ucy51cmwgPSBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmw7XHJcbiAgICAgIG9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFRhc2sucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICB9LFxyXG5cclxuICB3aXRoaW46IGZ1bmN0aW9uIChib3VuZHMpIHtcclxuICAgIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKGJvdW5kcyk7XHJcbiAgICBib3VuZHMgPSBib3VuZHMucGFkKDAuNSk7XHJcbiAgICB2YXIgY2VudGVyID0gYm91bmRzLmdldENlbnRlcigpO1xyXG4gICAgdmFyIG5lID0gYm91bmRzLmdldE5vcnRoV2VzdCgpO1xyXG4gICAgdGhpcy5wYXJhbXMubG9jYXRpb24gPSBjZW50ZXIubG5nICsgJywnICsgY2VudGVyLmxhdDtcclxuICAgIHRoaXMucGFyYW1zLmRpc3RhbmNlID0gTWF0aC5taW4oTWF0aC5tYXgoY2VudGVyLmRpc3RhbmNlVG8obmUpLCAyMDAwKSwgNTAwMDApO1xyXG4gICAgdGhpcy5wYXJhbXMuc2VhcmNoRXh0ZW50ID0gVXRpbC5ib3VuZHNUb0V4dGVudChib3VuZHMpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSxcclxuXHJcbiAgbmVhcmJ5OiBmdW5jdGlvbiAobGF0bG5nLCByYWRpdXMpIHtcclxuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XHJcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGxhdGxuZy5sbmcgKyAnLCcgKyBsYXRsbmcubGF0O1xyXG4gICAgdGhpcy5wYXJhbXMuZGlzdGFuY2UgPSBNYXRoLm1pbihNYXRoLm1heChyYWRpdXMsIDIwMDApLCA1MDAwMCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9LFxyXG5cclxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XHJcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBlcnJvciwgcmVzcG9uc2UsIHJlc3BvbnNlKTtcclxuICAgICAgfSwgdGhpcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ3RoaXMgZ2VvY29kaW5nIHNlcnZpY2UgZG9lcyBub3Qgc3VwcG9ydCBhc2tpbmcgZm9yIHN1Z2dlc3Rpb25zJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3VnZ2VzdCAob3B0aW9ucykge1xyXG4gIHJldHVybiBuZXcgU3VnZ2VzdChvcHRpb25zKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3VnZ2VzdDtcclxuIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJ2VzcmktbGVhZmxldCc7XHJcbmltcG9ydCB7IFdvcmxkR2VvY29kaW5nU2VydmljZVVybCB9IGZyb20gJy4uL0VzcmlMZWFmbGV0R2VvY29kaW5nJztcclxuaW1wb3J0IGdlb2NvZGUgZnJvbSAnLi4vVGFza3MvR2VvY29kZSc7XHJcbmltcG9ydCByZXZlcnNlR2VvY29kZSBmcm9tICcuLi9UYXNrcy9SZXZlcnNlR2VvY29kZSc7XHJcbmltcG9ydCBzdWdnZXN0IGZyb20gJy4uL1Rhc2tzL1N1Z2dlc3QnO1xyXG5cclxuZXhwb3J0IHZhciBHZW9jb2RlU2VydmljZSA9IFNlcnZpY2UuZXh0ZW5kKHtcclxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICBpZiAob3B0aW9ucy51cmwpIHtcclxuICAgICAgU2VydmljZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xyXG4gICAgICB0aGlzLl9jb25maXJtU3VnZ2VzdFN1cHBvcnQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9wdGlvbnMudXJsID0gV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsO1xyXG4gICAgICBvcHRpb25zLnN1cHBvcnRzU3VnZ2VzdCA9IHRydWU7XHJcbiAgICAgIFNlcnZpY2UucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZW9jb2RlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gZ2VvY29kZSh0aGlzKTtcclxuICB9LFxyXG5cclxuICByZXZlcnNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gcmV2ZXJzZUdlb2NvZGUodGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgc3VnZ2VzdDogZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gcmVxdWlyZXMgZWl0aGVyIHRoZSBFc3JpIFdvcmxkIEdlb2NvZGluZyBTZXJ2aWNlIG9yIGEgPDEwLjMgQXJjR0lTIFNlcnZlciBHZW9jb2RpbmcgU2VydmljZSB0aGF0IHN1cHBvcnRzIHN1Z2dlc3QuXHJcbiAgICByZXR1cm4gc3VnZ2VzdCh0aGlzKTtcclxuICB9LFxyXG5cclxuICBfY29uZmlybVN1Z2dlc3RTdXBwb3J0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLm1ldGFkYXRhKGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcclxuICAgICAgaWYgKGVycm9yKSB7IHJldHVybjsgfVxyXG4gICAgICAvLyBwcmUgMTAuMyBnZW9jb2Rpbmcgc2VydmljZXMgZG9udCBsaXN0IGNhcGFiaWxpdGllcyAoYW5kIGRvbnQgc3VwcG9ydCBtYXhMb2NhdGlvbnMpXHJcbiAgICAgIC8vIG9ubHkgU09NRSBpbmRpdmlkdWFsIHNlcnZpY2VzIGhhdmUgYmVlbiBjb25maWd1cmVkIHRvIHN1cHBvcnQgYXNraW5nIGZvciBzdWdnZXN0aW9uc1xyXG4gICAgICBpZiAoIXJlc3BvbnNlLmNhcGFiaWxpdGllcykge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5zdXBwb3J0c1N1Z2dlc3QgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5jYXBhYmlsaXRpZXMuaW5kZXhPZignU3VnZ2VzdCcpID4gLTEpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0ID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuc3VwcG9ydHNTdWdnZXN0ID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgLy8gd2hldGhlciB0aGUgc2VydmljZSBzdXBwb3J0cyBzdWdnZXN0IG9yIG5vdCwgdXRpbGl6ZSB0aGUgbWV0YWRhdGEgcmVzcG9uc2UgdG8gZGV0ZXJtaW5lIHRoZSBhcHByb3ByaWF0ZSBwYXJhbWV0ZXIgbmFtZSBmb3Igc2luZ2xlIGxpbmUgZ2VvY29kaW5nIHJlcXVlc3RzXHJcbiAgICAgIHRoaXMub3B0aW9ucy5jdXN0b21QYXJhbSA9IHJlc3BvbnNlLnNpbmdsZUxpbmVBZGRyZXNzRmllbGQubmFtZTtcclxuICAgIH0sIHRoaXMpO1xyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VvY29kZVNlcnZpY2UgKG9wdGlvbnMpIHtcclxuICByZXR1cm4gbmV3IEdlb2NvZGVTZXJ2aWNlKG9wdGlvbnMpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZW9jb2RlU2VydmljZTtcclxuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XHJcblxyXG5leHBvcnQgdmFyIEdlb3NlYXJjaENvcmUgPSBMLkV2ZW50ZWQuZXh0ZW5kKHtcclxuXHJcbiAgb3B0aW9uczoge1xyXG4gICAgem9vbVRvUmVzdWx0OiB0cnVlLFxyXG4gICAgdXNlTWFwQm91bmRzOiAxMixcclxuICAgIHNlYXJjaEJvdW5kczogbnVsbFxyXG4gIH0sXHJcblxyXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChjb250cm9sLCBvcHRpb25zKSB7XHJcbiAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuICAgIHRoaXMuX2NvbnRyb2wgPSBjb250cm9sO1xyXG5cclxuICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5wcm92aWRlcnMgfHwgIW9wdGlvbnMucHJvdmlkZXJzLmxlbmd0aCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgYXQgbGVhc3Qgb25lIHByb3ZpZGVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcHJvdmlkZXJzID0gb3B0aW9ucy5wcm92aWRlcnM7XHJcbiAgfSxcclxuXHJcbiAgX2dlb2NvZGU6IGZ1bmN0aW9uICh0ZXh0LCBrZXksIHByb3ZpZGVyKSB7XHJcbiAgICB2YXIgYWN0aXZlUmVxdWVzdHMgPSAwO1xyXG4gICAgdmFyIGFsbFJlc3VsdHMgPSBbXTtcclxuICAgIHZhciBib3VuZHM7XHJcblxyXG4gICAgdmFyIGNhbGxiYWNrID0gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCByZXN1bHRzKSB7XHJcbiAgICAgIGFjdGl2ZVJlcXVlc3RzLS07XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlc3VsdHMpIHtcclxuICAgICAgICBhbGxSZXN1bHRzID0gYWxsUmVzdWx0cy5jb25jYXQocmVzdWx0cyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhY3RpdmVSZXF1ZXN0cyA8PSAwKSB7XHJcbiAgICAgICAgYm91bmRzID0gdGhpcy5fYm91bmRzRnJvbVJlc3VsdHMoYWxsUmVzdWx0cyk7XHJcblxyXG4gICAgICAgIHRoaXMuZmlyZSgncmVzdWx0cycsIHtcclxuICAgICAgICAgIHJlc3VsdHM6IGFsbFJlc3VsdHMsXHJcbiAgICAgICAgICBib3VuZHM6IGJvdW5kcyxcclxuICAgICAgICAgIGxhdGxuZzogKGJvdW5kcykgPyBib3VuZHMuZ2V0Q2VudGVyKCkgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICB0ZXh0OiB0ZXh0XHJcbiAgICAgICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuem9vbVRvUmVzdWx0ICYmIGJvdW5kcykge1xyXG4gICAgICAgICAgdGhpcy5fY29udHJvbC5fbWFwLmZpdEJvdW5kcyhib3VuZHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5maXJlKCdsb2FkJyk7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIGlmIChrZXkpIHtcclxuICAgICAgYWN0aXZlUmVxdWVzdHMrKztcclxuICAgICAgcHJvdmlkZXIucmVzdWx0cyh0ZXh0LCBrZXksIHRoaXMuX3NlYXJjaEJvdW5kcygpLCBjYWxsYmFjayk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3Byb3ZpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RzKys7XHJcbiAgICAgICAgdGhpcy5fcHJvdmlkZXJzW2ldLnJlc3VsdHModGV4dCwga2V5LCB0aGlzLl9zZWFyY2hCb3VuZHMoKSwgY2FsbGJhY2spO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgX3N1Z2dlc3Q6IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICB2YXIgYWN0aXZlUmVxdWVzdHMgPSB0aGlzLl9wcm92aWRlcnMubGVuZ3RoO1xyXG5cclxuICAgIHZhciBjcmVhdGVDYWxsYmFjayA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uICh0ZXh0LCBwcm92aWRlcikge1xyXG4gICAgICByZXR1cm4gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBzdWdnZXN0aW9ucykge1xyXG4gICAgICAgIGlmIChlcnJvcikgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgdmFyIGk7XHJcblxyXG4gICAgICAgIGFjdGl2ZVJlcXVlc3RzID0gYWN0aXZlUmVxdWVzdHMgLSAxO1xyXG5cclxuICAgICAgICBpZiAodGV4dC5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3VnZ2VzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc3VnZ2VzdGlvbnNbaV0ucHJvdmlkZXIgPSBwcm92aWRlcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gd2Ugc3RpbGwgbmVlZCB0byB1cGRhdGUgdGhlIFVJXHJcbiAgICAgICAgICB0aGlzLl9jb250cm9sLl9yZW5kZXJTdWdnZXN0aW9ucyhzdWdnZXN0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJvdmlkZXIuX2xhc3RSZW5kZXIgIT09IHRleHQgJiYgcHJvdmlkZXIubm9kZXMpIHtcclxuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwcm92aWRlci5ub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocHJvdmlkZXIubm9kZXNbaV0ucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2NvbnRyb2wuX3N1Z2dlc3Rpb25zLnJlbW92ZUNoaWxkKHByb3ZpZGVyLm5vZGVzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHByb3ZpZGVyLm5vZGVzID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoICYmIHRoaXMuX2NvbnRyb2wuX2lucHV0LnZhbHVlID09PSB0ZXh0KSB7XHJcbiAgICAgICAgICB0aGlzLl9jb250cm9sLmNsZWFyU3VnZ2VzdGlvbnMocHJvdmlkZXIubm9kZXMpO1xyXG5cclxuICAgICAgICAgIHByb3ZpZGVyLl9sYXN0UmVuZGVyID0gdGV4dDtcclxuICAgICAgICAgIHByb3ZpZGVyLm5vZGVzID0gdGhpcy5fY29udHJvbC5fcmVuZGVyU3VnZ2VzdGlvbnMoc3VnZ2VzdGlvbnMpO1xyXG4gICAgICAgICAgdGhpcy5fY29udHJvbC5fbm9kZXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIHRoaXMpO1xyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5fcGVuZGluZ1N1Z2dlc3Rpb25zID0gW107XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9wcm92aWRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIHByb3ZpZGVyID0gdGhpcy5fcHJvdmlkZXJzW2ldO1xyXG4gICAgICB2YXIgcmVxdWVzdCA9IHByb3ZpZGVyLnN1Z2dlc3Rpb25zKHRleHQsIHRoaXMuX3NlYXJjaEJvdW5kcygpLCBjcmVhdGVDYWxsYmFjayh0ZXh0LCBwcm92aWRlcikpO1xyXG4gICAgICB0aGlzLl9wZW5kaW5nU3VnZ2VzdGlvbnMucHVzaChyZXF1ZXN0KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBfc2VhcmNoQm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnNlYXJjaEJvdW5kcyAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNlYXJjaEJvdW5kcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZU1hcEJvdW5kcyA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy51c2VNYXBCb3VuZHMgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2wuX21hcC5nZXRCb3VuZHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZU1hcEJvdW5kcyA8PSB0aGlzLl9jb250cm9sLl9tYXAuZ2V0Wm9vbSgpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jb250cm9sLl9tYXAuZ2V0Qm91bmRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxuXHJcbiAgX2JvdW5kc0Zyb21SZXN1bHRzOiBmdW5jdGlvbiAocmVzdWx0cykge1xyXG4gICAgaWYgKCFyZXN1bHRzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG51bGxJc2xhbmQgPSBMLmxhdExuZ0JvdW5kcyhbMCwgMF0sIFswLCAwXSk7XHJcbiAgICB2YXIgcmVzdWx0Qm91bmRzID0gW107XHJcbiAgICB2YXIgcmVzdWx0TGF0bG5ncyA9IFtdO1xyXG5cclxuICAgIC8vIGNvbGxlY3QgdGhlIGJvdW5kcyBhbmQgY2VudGVyIG9mIGVhY2ggcmVzdWx0XHJcbiAgICBmb3IgKHZhciBpID0gcmVzdWx0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICB2YXIgcmVzdWx0ID0gcmVzdWx0c1tpXTtcclxuXHJcbiAgICAgIHJlc3VsdExhdGxuZ3MucHVzaChyZXN1bHQubGF0bG5nKTtcclxuXHJcbiAgICAgIC8vIG1ha2Ugc3VyZSBib3VuZHMgYXJlIHZhbGlkIGFuZCBub3QgMCwwLiBzb21ldGltZXMgYm91bmRzIGFyZSBpbmNvcnJlY3Qgb3Igbm90IHByZXNlbnRcclxuICAgICAgaWYgKHJlc3VsdC5ib3VuZHMgJiYgcmVzdWx0LmJvdW5kcy5pc1ZhbGlkKCkgJiYgIXJlc3VsdC5ib3VuZHMuZXF1YWxzKG51bGxJc2xhbmQpKSB7XHJcbiAgICAgICAgcmVzdWx0Qm91bmRzLnB1c2gocmVzdWx0LmJvdW5kcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmb3JtIGEgYm91bmRzIG9iamVjdCBjb250YWluaW5nIGFsbCBjZW50ZXIgcG9pbnRzXHJcbiAgICB2YXIgYm91bmRzID0gTC5sYXRMbmdCb3VuZHMocmVzdWx0TGF0bG5ncyk7XHJcblxyXG4gICAgLy8gYW5kIGV4dGVuZCBpdCB0byBjb250YWluIGFsbCBib3VuZHMgb2JqZWN0c1xyXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXN1bHRCb3VuZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgYm91bmRzLmV4dGVuZChyZXN1bHRCb3VuZHNbal0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBib3VuZHM7XHJcbiAgfSxcclxuXHJcbiAgX2dldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgYXR0cmlicyA9IFtdO1xyXG4gICAgdmFyIHByb3ZpZGVycyA9IHRoaXMuX3Byb3ZpZGVycztcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3ZpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAocHJvdmlkZXJzW2ldLm9wdGlvbnMuYXR0cmlidXRpb24pIHtcclxuICAgICAgICBhdHRyaWJzLnB1c2gocHJvdmlkZXJzW2ldLm9wdGlvbnMuYXR0cmlidXRpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGF0dHJpYnMuam9pbignLCAnKTtcclxuICB9XHJcblxyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW9zZWFyY2hDb3JlIChjb250cm9sLCBvcHRpb25zKSB7XHJcbiAgcmV0dXJuIG5ldyBHZW9zZWFyY2hDb3JlKGNvbnRyb2wsIG9wdGlvbnMpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZW9zZWFyY2hDb3JlO1xyXG4iLCJpbXBvcnQgeyBHZW9jb2RlU2VydmljZSB9IGZyb20gJy4uL1NlcnZpY2VzL0dlb2NvZGUnO1xyXG5cclxuZXhwb3J0IHZhciBBcmNnaXNPbmxpbmVQcm92aWRlciA9IEdlb2NvZGVTZXJ2aWNlLmV4dGVuZCh7XHJcbiAgb3B0aW9uczoge1xyXG4gICAgbGFiZWw6ICdQbGFjZXMgYW5kIEFkZHJlc3NlcycsXHJcbiAgICBtYXhSZXN1bHRzOiA1XHJcbiAgfSxcclxuXHJcbiAgc3VnZ2VzdGlvbnM6IGZ1bmN0aW9uICh0ZXh0LCBib3VuZHMsIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgcmVxdWVzdCA9IHRoaXMuc3VnZ2VzdCgpLnRleHQodGV4dCk7XHJcblxyXG4gICAgaWYgKGJvdW5kcykge1xyXG4gICAgICByZXF1ZXN0LndpdGhpbihib3VuZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuY291bnRyaWVzKSB7XHJcbiAgICAgIHJlcXVlc3QuY291bnRyaWVzKHRoaXMub3B0aW9ucy5jb3VudHJpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2F0ZWdvcmllcykge1xyXG4gICAgICByZXF1ZXN0LmNhdGVnb3J5KHRoaXMub3B0aW9ucy5jYXRlZ29yaWVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAxNSBpcyB0aGUgbWF4aW11bSBudW1iZXIgb2Ygc3VnZ2VzdGlvbnMgdGhhdCBjYW4gYmUgcmV0dXJuZWRcclxuICAgIHJlcXVlc3QubWF4U3VnZ2VzdGlvbnModGhpcy5vcHRpb25zLm1heFJlc3VsdHMpO1xyXG5cclxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJlc3BvbnNlKSB7XHJcbiAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xyXG4gICAgICBpZiAoIWVycm9yKSB7XHJcbiAgICAgICAgd2hpbGUgKHJlc3BvbnNlLnN1Z2dlc3Rpb25zLmxlbmd0aCAmJiBzdWdnZXN0aW9ucy5sZW5ndGggPD0gKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzIC0gMSkpIHtcclxuICAgICAgICAgIHZhciBzdWdnZXN0aW9uID0gcmVzcG9uc2Uuc3VnZ2VzdGlvbnMuc2hpZnQoKTtcclxuICAgICAgICAgIGlmICghc3VnZ2VzdGlvbi5pc0NvbGxlY3Rpb24pIHtcclxuICAgICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgdGV4dDogc3VnZ2VzdGlvbi50ZXh0LFxyXG4gICAgICAgICAgICAgIHVuZm9ybWF0dGVkVGV4dDogc3VnZ2VzdGlvbi50ZXh0LFxyXG4gICAgICAgICAgICAgIG1hZ2ljS2V5OiBzdWdnZXN0aW9uLm1hZ2ljS2V5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjYWxsYmFjayhlcnJvciwgc3VnZ2VzdGlvbnMpO1xyXG4gICAgfSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgcmVzdWx0czogZnVuY3Rpb24gKHRleHQsIGtleSwgYm91bmRzLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIHJlcXVlc3QgPSB0aGlzLmdlb2NvZGUoKS50ZXh0KHRleHQpO1xyXG5cclxuICAgIGlmIChrZXkpIHtcclxuICAgICAgcmVxdWVzdC5rZXkoa2V5KTtcclxuICAgIH1cclxuICAgIC8vIGluIHRoZSBmdXR1cmUgQWRkcmVzcy9TdHJlZXROYW1lIGdlb2NvZGluZyByZXF1ZXN0cyB0aGF0IGluY2x1ZGUgYSBtYWdpY0tleSB3aWxsIGFsd2F5cyBvbmx5IHJldHVybiBvbmUgbWF0Y2hcclxuICAgIHJlcXVlc3QubWF4TG9jYXRpb25zKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzKTtcclxuXHJcbiAgICBpZiAoYm91bmRzKSB7XHJcbiAgICAgIHJlcXVlc3Qud2l0aGluKGJvdW5kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5mb3JTdG9yYWdlKSB7XHJcbiAgICAgIHJlcXVlc3QuZm9yU3RvcmFnZSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xyXG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzcG9uc2UucmVzdWx0cyk7XHJcbiAgICB9LCB0aGlzKTtcclxuICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFyY2dpc09ubGluZVByb3ZpZGVyIChvcHRpb25zKSB7XHJcbiAgcmV0dXJuIG5ldyBBcmNnaXNPbmxpbmVQcm92aWRlcihvcHRpb25zKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXJjZ2lzT25saW5lUHJvdmlkZXI7XHJcbiIsImltcG9ydCBMIGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQgeyBnZW9zZWFyY2hDb3JlIH0gZnJvbSAnLi4vQ2xhc3Nlcy9HZW9zZWFyY2hDb3JlJztcclxuaW1wb3J0IHsgYXJjZ2lzT25saW5lUHJvdmlkZXIgfSBmcm9tICcuLi9Qcm92aWRlcnMvQXJjZ2lzT25saW5lR2VvY29kZXInO1xyXG5pbXBvcnQgeyBVdGlsIH0gZnJvbSAnZXNyaS1sZWFmbGV0JztcclxuXHJcbmV4cG9ydCB2YXIgR2Vvc2VhcmNoID0gTC5Db250cm9sLmV4dGVuZCh7XHJcbiAgaW5jbHVkZXM6IEwuRXZlbnRlZC5wcm90b3R5cGUsXHJcblxyXG4gIG9wdGlvbnM6IHtcclxuICAgIHBvc2l0aW9uOiAndG9wbGVmdCcsXHJcbiAgICBjb2xsYXBzZUFmdGVyUmVzdWx0OiB0cnVlLFxyXG4gICAgZXhwYW5kZWQ6IGZhbHNlLFxyXG4gICAgYWxsb3dNdWx0aXBsZVJlc3VsdHM6IHRydWUsXHJcbiAgICBwbGFjZWhvbGRlcjogJ1NlYXJjaCBmb3IgcGxhY2VzIG9yIGFkZHJlc3NlcycsXHJcbiAgICB0aXRsZTogJ0xvY2F0aW9uIFNlYXJjaCdcclxuICB9LFxyXG5cclxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLnByb3ZpZGVycyB8fCAhb3B0aW9ucy5wcm92aWRlcnMubGVuZ3RoKSB7XHJcbiAgICAgIGlmICghb3B0aW9ucykge1xyXG4gICAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgICAgfVxyXG4gICAgICBvcHRpb25zLnByb3ZpZGVycyA9IFsgYXJjZ2lzT25saW5lUHJvdmlkZXIoKSBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGluc3RhbnRpYXRlIHRoZSB1bmRlcmx5aW5nIGNsYXNzIGFuZCBwYXNzIGFsb25nIG9wdGlvbnNcclxuICAgIHRoaXMuX2dlb3NlYXJjaENvcmUgPSBnZW9zZWFyY2hDb3JlKHRoaXMsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcHJvdmlkZXJzID0gb3B0aW9ucy5wcm92aWRlcnM7XHJcblxyXG4gICAgLy8gYnViYmxlIGVhY2ggcHJvdmlkZXJzIGV2ZW50cyB0byB0aGUgY29udHJvbFxyXG4gICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5hZGRFdmVudFBhcmVudCh0aGlzKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX3Byb3ZpZGVyc1tpXS5hZGRFdmVudFBhcmVudCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9nZW9zZWFyY2hDb3JlLl9wZW5kaW5nU3VnZ2VzdGlvbnMgPSBbXTtcclxuXHJcbiAgICBMLkNvbnRyb2wucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbChvcHRpb25zKTtcclxuICB9LFxyXG5cclxuICBfcmVuZGVyU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uIChzdWdnZXN0aW9ucykge1xyXG4gICAgdmFyIGN1cnJlbnRHcm91cDtcclxuXHJcbiAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIH1cclxuICAgIC8vIHNldCB0aGUgbWF4SGVpZ2h0IG9mIHRoZSBzdWdnZXN0aW9ucyBib3ggdG9cclxuICAgIC8vIG1hcCBoZWlnaHRcclxuICAgIC8vIC0gc3VnZ2VzdGlvbnMgb2Zmc2V0IChkaXN0YW5jZSBmcm9tIHRvcCBvZiBzdWdnZXN0aW9ucyB0byB0b3Agb2YgY29udHJvbClcclxuICAgIC8vIC0gY29udHJvbCBvZmZzZXQgKGRpc3RhbmNlIGZyb20gdG9wIG9mIGNvbnRyb2wgdG8gdG9wIG9mIG1hcClcclxuICAgIC8vIC0gMTAgKGV4dHJhIHBhZGRpbmcpXHJcbiAgICB0aGlzLl9zdWdnZXN0aW9ucy5zdHlsZS5tYXhIZWlnaHQgPSAodGhpcy5fbWFwLmdldFNpemUoKS55IC0gdGhpcy5fc3VnZ2VzdGlvbnMub2Zmc2V0VG9wIC0gdGhpcy5fd3JhcHBlci5vZmZzZXRUb3AgLSAxMCkgKyAncHgnO1xyXG5cclxuICAgIHZhciBub2RlcyA9IFtdO1xyXG4gICAgdmFyIGxpc3Q7XHJcbiAgICB2YXIgaGVhZGVyO1xyXG4gICAgdmFyIHN1Z2dlc3Rpb25UZXh0QXJyYXkgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1Z2dlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBzdWdnZXN0aW9uID0gc3VnZ2VzdGlvbnNbaV07XHJcbiAgICAgIGlmICghaGVhZGVyICYmIHRoaXMuX2dlb3NlYXJjaENvcmUuX3Byb3ZpZGVycy5sZW5ndGggPiAxICYmIGN1cnJlbnRHcm91cCAhPT0gc3VnZ2VzdGlvbi5wcm92aWRlci5vcHRpb25zLmxhYmVsKSB7XHJcbiAgICAgICAgaGVhZGVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnc3BhbicsICdnZW9jb2Rlci1jb250cm9sLWhlYWRlcicsIHRoaXMuX3N1Z2dlc3Rpb25zKTtcclxuICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBzdWdnZXN0aW9uLnByb3ZpZGVyLm9wdGlvbnMubGFiZWw7XHJcbiAgICAgICAgaGVhZGVyLmlubmVyVGV4dCA9IHN1Z2dlc3Rpb24ucHJvdmlkZXIub3B0aW9ucy5sYWJlbDtcclxuICAgICAgICBjdXJyZW50R3JvdXAgPSBzdWdnZXN0aW9uLnByb3ZpZGVyLm9wdGlvbnMubGFiZWw7XHJcbiAgICAgICAgbm9kZXMucHVzaChoZWFkZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWxpc3QpIHtcclxuICAgICAgICBsaXN0ID0gTC5Eb21VdGlsLmNyZWF0ZSgndWwnLCAnZ2VvY29kZXItY29udHJvbC1saXN0JywgdGhpcy5fc3VnZ2VzdGlvbnMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc3VnZ2VzdGlvblRleHRBcnJheS5pbmRleE9mKHN1Z2dlc3Rpb24udGV4dCkgPT09IC0xKSB7XHJcbiAgICAgICAgdmFyIHN1Z2dlc3Rpb25JdGVtID0gTC5Eb21VdGlsLmNyZWF0ZSgnbGknLCAnZ2VvY29kZXItY29udHJvbC1zdWdnZXN0aW9uJywgbGlzdCk7XHJcblxyXG4gICAgICAgIHN1Z2dlc3Rpb25JdGVtLmlubmVySFRNTCA9IHN1Z2dlc3Rpb24udGV4dDtcclxuICAgICAgICBzdWdnZXN0aW9uSXRlbS5wcm92aWRlciA9IHN1Z2dlc3Rpb24ucHJvdmlkZXI7XHJcbiAgICAgICAgc3VnZ2VzdGlvbkl0ZW1bJ2RhdGEtbWFnaWMta2V5J10gPSBzdWdnZXN0aW9uLm1hZ2ljS2V5O1xyXG4gICAgICAgIHN1Z2dlc3Rpb25JdGVtLnVuZm9ybWF0dGVkVGV4dCA9IHN1Z2dlc3Rpb24udW5mb3JtYXR0ZWRUZXh0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGlzdC5jaGlsZE5vZGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAvLyBpZiB0aGUgc2FtZSB0ZXh0IGFscmVhZHkgYXBwZWFycyBpbiB0aGUgbGlzdCBvZiBzdWdnZXN0aW9ucywgYXBwZW5kIGFuIGFkZGl0aW9uYWwgT2JqZWN0SUQgdG8gaXRzIG1hZ2ljS2V5IGluc3RlYWRcclxuICAgICAgICAgIGlmIChsaXN0LmNoaWxkTm9kZXNbal0uaW5uZXJIVE1MID09PSBzdWdnZXN0aW9uLnRleHQpIHtcclxuICAgICAgICAgICAgbGlzdC5jaGlsZE5vZGVzW2pdWydkYXRhLW1hZ2ljLWtleSddICs9ICcsJyArIHN1Z2dlc3Rpb24ubWFnaWNLZXk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHN1Z2dlc3Rpb25UZXh0QXJyYXkucHVzaChzdWdnZXN0aW9uLnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9pbnB1dCwgJ2dlb2NvZGVyLWNvbnRyb2wtbG9hZGluZycpO1xyXG5cclxuICAgIG5vZGVzLnB1c2gobGlzdCk7XHJcblxyXG4gICAgcmV0dXJuIG5vZGVzO1xyXG4gIH0sXHJcblxyXG4gIF9ib3VuZHNGcm9tUmVzdWx0czogZnVuY3Rpb24gKHJlc3VsdHMpIHtcclxuICAgIGlmICghcmVzdWx0cy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBudWxsSXNsYW5kID0gTC5sYXRMbmdCb3VuZHMoWzAsIDBdLCBbMCwgMF0pO1xyXG4gICAgdmFyIHJlc3VsdEJvdW5kcyA9IFtdO1xyXG4gICAgdmFyIHJlc3VsdExhdGxuZ3MgPSBbXTtcclxuXHJcbiAgICAvLyBjb2xsZWN0IHRoZSBib3VuZHMgYW5kIGNlbnRlciBvZiBlYWNoIHJlc3VsdFxyXG4gICAgZm9yICh2YXIgaSA9IHJlc3VsdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgdmFyIHJlc3VsdCA9IHJlc3VsdHNbaV07XHJcblxyXG4gICAgICByZXN1bHRMYXRsbmdzLnB1c2gocmVzdWx0LmxhdGxuZyk7XHJcblxyXG4gICAgICAvLyBtYWtlIHN1cmUgYm91bmRzIGFyZSB2YWxpZCBhbmQgbm90IDAsMC4gc29tZXRpbWVzIGJvdW5kcyBhcmUgaW5jb3JyZWN0IG9yIG5vdCBwcmVzZW50XHJcbiAgICAgIGlmIChyZXN1bHQuYm91bmRzICYmIHJlc3VsdC5ib3VuZHMuaXNWYWxpZCgpICYmICFyZXN1bHQuYm91bmRzLmVxdWFscyhudWxsSXNsYW5kKSkge1xyXG4gICAgICAgIHJlc3VsdEJvdW5kcy5wdXNoKHJlc3VsdC5ib3VuZHMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZm9ybSBhIGJvdW5kcyBvYmplY3QgY29udGFpbmluZyBhbGwgY2VudGVyIHBvaW50c1xyXG4gICAgdmFyIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKHJlc3VsdExhdGxuZ3MpO1xyXG5cclxuICAgIC8vIGFuZCBleHRlbmQgaXQgdG8gY29udGFpbiBhbGwgYm91bmRzIG9iamVjdHNcclxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzdWx0Qm91bmRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGJvdW5kcy5leHRlbmQocmVzdWx0Qm91bmRzW2pdKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYm91bmRzO1xyXG4gIH0sXHJcblxyXG4gIGNsZWFyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9zdWdnZXN0aW9ucy5pbm5lckhUTUwgPSAnJztcclxuICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB0aGlzLl9pbnB1dC52YWx1ZSA9ICcnO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29sbGFwc2VBZnRlclJlc3VsdCkge1xyXG4gICAgICB0aGlzLl9pbnB1dC5wbGFjZWhvbGRlciA9ICcnO1xyXG4gICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fd3JhcHBlciwgJ2dlb2NvZGVyLWNvbnRyb2wtZXhwYW5kZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuX21hcC5zY3JvbGxXaGVlbFpvb20uZW5hYmxlZCgpICYmIHRoaXMuX21hcC5vcHRpb25zLnNjcm9sbFdoZWVsWm9vbSkge1xyXG4gICAgICB0aGlzLl9tYXAuc2Nyb2xsV2hlZWxab29tLmVuYWJsZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNsZWFyU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLl9ub2Rlcykge1xyXG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuX25vZGVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX25vZGVzW2tdLnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnJlbW92ZUNoaWxkKHRoaXMuX25vZGVzW2tdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBfc2V0dXBDbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XHJcbiAgICB0aGlzLl9pbnB1dC5mb2N1cygpO1xyXG4gIH0sXHJcblxyXG4gIGRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2lucHV0LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9pbnB1dCwgJ2dlb2NvZGVyLWNvbnRyb2wtaW5wdXQtZGlzYWJsZWQnKTtcclxuICAgIEwuRG9tRXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5fd3JhcHBlciwgJ2NsaWNrJywgdGhpcy5fc2V0dXBDbGljaywgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgZW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9pbnB1dC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1pbnB1dC1kaXNhYmxlZCcpO1xyXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl93cmFwcGVyLCAnY2xpY2snLCB0aGlzLl9zZXR1cENsaWNrLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBnZXRBdHRyaWJ1dGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGF0dHJpYnMgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3Byb3ZpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5fcHJvdmlkZXJzW2ldLm9wdGlvbnMuYXR0cmlidXRpb24pIHtcclxuICAgICAgICBhdHRyaWJzLnB1c2godGhpcy5fcHJvdmlkZXJzW2ldLm9wdGlvbnMuYXR0cmlidXRpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGF0dHJpYnMuam9pbignLCAnKTtcclxuICB9LFxyXG5cclxuICBnZW9jb2RlU3VnZ2VzdGlvbjogZnVuY3Rpb24gKGUpIHtcclxuICAgIHZhciBzdWdnZXN0aW9uSXRlbSA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcclxuXHJcbiAgICAvLyBtYWtlIHN1cmUgYW5kIHBvaW50IGF0IHRoZSBhY3R1YWwgJ2dlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbidcclxuICAgIGlmIChzdWdnZXN0aW9uSXRlbS5jbGFzc0xpc3QubGVuZ3RoIDwgMSkge1xyXG4gICAgICBzdWdnZXN0aW9uSXRlbSA9IHN1Z2dlc3Rpb25JdGVtLnBhcmVudE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5fZ2VvY29kZShzdWdnZXN0aW9uSXRlbS51bmZvcm1hdHRlZFRleHQsIHN1Z2dlc3Rpb25JdGVtWydkYXRhLW1hZ2ljLWtleSddLCBzdWdnZXN0aW9uSXRlbS5wcm92aWRlcik7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgfSxcclxuXHJcbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcclxuICAgIC8vIGluY2x1ZGUgJ1Bvd2VyZWQgYnkgRXNyaScgaW4gbWFwIGF0dHJpYnV0aW9uXHJcbiAgICBVdGlsLnNldEVzcmlBdHRyaWJ1dGlvbihtYXApO1xyXG5cclxuICAgIHRoaXMuX21hcCA9IG1hcDtcclxuICAgIHRoaXMuX3dyYXBwZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnZ2VvY29kZXItY29udHJvbCcpO1xyXG4gICAgdGhpcy5faW5wdXQgPSBMLkRvbVV0aWwuY3JlYXRlKCdpbnB1dCcsICdnZW9jb2Rlci1jb250cm9sLWlucHV0IGxlYWZsZXQtYmFyJywgdGhpcy5fd3JhcHBlcik7XHJcbiAgICB0aGlzLl9pbnB1dC50aXRsZSA9IHRoaXMub3B0aW9ucy50aXRsZTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmV4cGFuZGVkKSB7XHJcbiAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl93cmFwcGVyLCAnZ2VvY29kZXItY29udHJvbC1leHBhbmRlZCcpO1xyXG4gICAgICB0aGlzLl9pbnB1dC5wbGFjZWhvbGRlciA9IHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlcjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zdWdnZXN0aW9ucyA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdnZW9jb2Rlci1jb250cm9sLXN1Z2dlc3Rpb25zIGxlYWZsZXQtYmFyJywgdGhpcy5fd3JhcHBlcik7XHJcblxyXG4gICAgdmFyIGNyZWRpdHMgPSB0aGlzLl9nZW9zZWFyY2hDb3JlLl9nZXRBdHRyaWJ1dGlvbigpO1xyXG4gICAgbWFwLmF0dHJpYnV0aW9uQ29udHJvbC5hZGRBdHRyaWJ1dGlvbihjcmVkaXRzKTtcclxuXHJcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX2lucHV0LCAnZm9jdXMnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICB0aGlzLl9pbnB1dC5wbGFjZWhvbGRlciA9IHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlcjtcclxuICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMuX3dyYXBwZXIsICdjbGljaycsIHRoaXMuX3NldHVwQ2xpY2ssIHRoaXMpO1xyXG5cclxuICAgIC8vIG1ha2Ugc3VyZSBib3RoIGNsaWNrIGFuZCB0b3VjaCBzcGF3biBhbiBhZGRyZXNzL3BvaSBzZWFyY2hcclxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fc3VnZ2VzdGlvbnMsICdtb3VzZWRvd24nLCB0aGlzLmdlb2NvZGVTdWdnZXN0aW9uLCB0aGlzKTtcclxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fc3VnZ2VzdGlvbnMsICd0b3VjaGVuZCcsIHRoaXMuZ2VvY29kZVN1Z2dlc3Rpb24sIHRoaXMpO1xyXG5cclxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5faW5wdXQsICdibHVyJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLl9pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICB2YXIgdGV4dCA9IChlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQpLnZhbHVlO1xyXG5cclxuICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3dyYXBwZXIsICdnZW9jb2Rlci1jb250cm9sLWV4cGFuZGVkJyk7XHJcblxyXG4gICAgICB2YXIgbGlzdCA9IHRoaXMuX3N1Z2dlc3Rpb25zLnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgJ2dlb2NvZGVyLWNvbnRyb2wtc3VnZ2VzdGlvbicpO1xyXG4gICAgICB2YXIgc2VsZWN0ZWQgPSB0aGlzLl9zdWdnZXN0aW9ucy5xdWVyeVNlbGVjdG9yQWxsKCcuJyArICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJylbMF07XHJcbiAgICAgIHZhciBzZWxlY3RlZFBvc2l0aW9uO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxpc3RbaV0gPT09IHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICBzZWxlY3RlZFBvc2l0aW9uID0gaTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcclxuICAgICAgICBjYXNlIDEzOlxyXG4gICAgICAgICAgLypcclxuICAgICAgICAgICAgaWYgYW4gaXRlbSBoYXMgYmVlbiBzZWxlY3RlZCwgZ2VvY29kZSBpdFxyXG4gICAgICAgICAgICBpZiBmb2N1cyBpcyBvbiB0aGUgaW5wdXQgdGV4dGJveCwgZ2VvY29kZSBvbmx5IGlmIG11bHRpcGxlIHJlc3VsdHMgYXJlIGFsbG93ZWQgYW5kIG1vcmUgdGhhbiB0d28gY2hhcmFjdGVycyBhcmUgcHJlc2VudCwgb3IgaWYgYSBzaW5nbGUgc3VnZ2VzdGlvbiBpcyBkaXNwbGF5ZWQuXHJcbiAgICAgICAgICAgIGlmIGxlc3MgdGhhbiB0d28gY2hhcmFjdGVycyBoYXZlIGJlZW4gdHlwZWQsIGFib3J0IHRoZSBnZW9jb2RlXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX2dlb2NvZGUoc2VsZWN0ZWQudW5mb3JtYXR0ZWRUZXh0LCBzZWxlY3RlZFsnZGF0YS1tYWdpYy1rZXknXSwgc2VsZWN0ZWQucHJvdmlkZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5hbGxvd011bHRpcGxlUmVzdWx0cyAmJiB0ZXh0Lmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX2dlb2NvZGUodGhpcy5faW5wdXQudmFsdWUsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyhsaXN0WzBdLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX2dlb2NvZGUobGlzdFswXS5pbm5lckhUTUwsIGxpc3RbMF1bJ2RhdGEtbWFnaWMta2V5J10sIGxpc3RbMF0ucHJvdmlkZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICB0aGlzLl9pbnB1dC5ibHVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM4OlxyXG4gICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyhzZWxlY3RlZCwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2YXIgcHJldmlvdXNJdGVtID0gbGlzdFtzZWxlY3RlZFBvc2l0aW9uIC0gMV07XHJcblxyXG4gICAgICAgICAgaWYgKHNlbGVjdGVkICYmIHByZXZpb3VzSXRlbSkge1xyXG4gICAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3MocHJldmlvdXNJdGVtLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKGxpc3RbbGlzdC5sZW5ndGggLSAxXSwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQwOlxyXG4gICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyhzZWxlY3RlZCwgJ2dlb2NvZGVyLWNvbnRyb2wtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2YXIgbmV4dEl0ZW0gPSBsaXN0W3NlbGVjdGVkUG9zaXRpb24gKyAxXTtcclxuXHJcbiAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgbmV4dEl0ZW0pIHtcclxuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKG5leHRJdGVtLCAnZ2VvY29kZXItY29udHJvbC1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKGxpc3RbMF0sICdnZW9jb2Rlci1jb250cm9sLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KGUpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIC8vIHdoZW4gdGhlIGlucHV0IGNoYW5nZXMgd2Ugc2hvdWxkIGNhbmNlbCBhbGwgcGVuZGluZyBzdWdnZXN0aW9uIHJlcXVlc3RzIGlmIHBvc3NpYmxlIHRvIGF2b2lkIHJlc3VsdCBjb2xsaXNpb25zXHJcbiAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHRoaXMuX2dlb3NlYXJjaENvcmUuX3BlbmRpbmdTdWdnZXN0aW9ucy5sZW5ndGg7IHgrKykge1xyXG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IHRoaXMuX2dlb3NlYXJjaENvcmUuX3BlbmRpbmdTdWdnZXN0aW9uc1t4XTtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3QgJiYgcmVxdWVzdC5hYm9ydCAmJiAhcmVxdWVzdC5pZCkge1xyXG4gICAgICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5faW5wdXQsICdrZXl1cCcsIEwuVXRpbC50aHJvdHRsZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICB2YXIga2V5ID0gZS53aGljaCB8fCBlLmtleUNvZGU7XHJcbiAgICAgIHZhciB0ZXh0ID0gKGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCkudmFsdWU7XHJcblxyXG4gICAgICAvLyByZXF1aXJlIGF0IGxlYXN0IDIgY2hhcmFjdGVycyBmb3Igc3VnZ2VzdGlvbnNcclxuICAgICAgaWYgKHRleHQubGVuZ3RoIDwgMikge1xyXG4gICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2lucHV0LCAnZ2VvY29kZXItY29udHJvbC1sb2FkaW5nJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBpZiB0aGlzIGlzIHRoZSBlc2NhcGUga2V5IGl0IHdpbGwgY2xlYXIgdGhlIGlucHV0IHNvIGNsZWFyIHN1Z2dlc3Rpb25zXHJcbiAgICAgIGlmIChrZXkgPT09IDI3KSB7XHJcbiAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGlmIHRoaXMgaXMgTk9UIHRoZSB1cC9kb3duIGFycm93cyBvciBlbnRlciBtYWtlIGEgc3VnZ2VzdGlvblxyXG4gICAgICBpZiAoa2V5ICE9PSAxMyAmJiBrZXkgIT09IDM4ICYmIGtleSAhPT0gNDApIHtcclxuICAgICAgICBpZiAodGhpcy5faW5wdXQudmFsdWUgIT09IHRoaXMuX2xhc3RWYWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5fbGFzdFZhbHVlID0gdGhpcy5faW5wdXQudmFsdWU7XHJcbiAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5faW5wdXQsICdnZW9jb2Rlci1jb250cm9sLWxvYWRpbmcnKTtcclxuICAgICAgICAgIHRoaXMuX2dlb3NlYXJjaENvcmUuX3N1Z2dlc3QodGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LCA1MCwgdGhpcyksIHRoaXMpO1xyXG5cclxuICAgIEwuRG9tRXZlbnQuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24odGhpcy5fd3JhcHBlcik7XHJcblxyXG4gICAgLy8gd2hlbiBtb3VzZSBtb3ZlcyBvdmVyIHN1Z2dlc3Rpb25zIGRpc2FibGUgc2Nyb2xsIHdoZWVsIHpvb20gaWYgaXRzIGVuYWJsZWRcclxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fc3VnZ2VzdGlvbnMsICdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBpZiAobWFwLnNjcm9sbFdoZWVsWm9vbS5lbmFibGVkKCkgJiYgbWFwLm9wdGlvbnMuc2Nyb2xsV2hlZWxab29tKSB7XHJcbiAgICAgICAgbWFwLnNjcm9sbFdoZWVsWm9vbS5kaXNhYmxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHdoZW4gbW91c2UgbW92ZXMgbGVhdmVzIHN1Z2dlc3Rpb25zIGVuYWJsZSBzY3JvbGwgd2hlZWwgem9vbSBpZiBpdHMgZGlzYWJsZWRcclxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5fc3VnZ2VzdGlvbnMsICdtb3VzZW91dCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGlmICghbWFwLnNjcm9sbFdoZWVsWm9vbS5lbmFibGVkKCkgJiYgbWFwLm9wdGlvbnMuc2Nyb2xsV2hlZWxab29tKSB7XHJcbiAgICAgICAgbWFwLnNjcm9sbFdoZWVsWm9vbS5lbmFibGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5fZ2Vvc2VhcmNoQ29yZS5vbignbG9hZCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9pbnB1dCwgJ2dlb2NvZGVyLWNvbnRyb2wtbG9hZGluZycpO1xyXG4gICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgIHRoaXMuX2lucHV0LmJsdXIoKTtcclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLl93cmFwcGVyO1xyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2Vvc2VhcmNoIChvcHRpb25zKSB7XHJcbiAgcmV0dXJuIG5ldyBHZW9zZWFyY2gob3B0aW9ucyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdlb3NlYXJjaDtcclxuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCB7IEZlYXR1cmVMYXllclNlcnZpY2UgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xyXG5cclxuZXhwb3J0IHZhciBGZWF0dXJlTGF5ZXJQcm92aWRlciA9IEZlYXR1cmVMYXllclNlcnZpY2UuZXh0ZW5kKHtcclxuICBvcHRpb25zOiB7XHJcbiAgICBsYWJlbDogJ0ZlYXR1cmUgTGF5ZXInLFxyXG4gICAgbWF4UmVzdWx0czogNSxcclxuICAgIGJ1ZmZlclJhZGl1czogMTAwMCxcclxuICAgIGZvcm1hdFN1Z2dlc3Rpb246IGZ1bmN0aW9uIChmZWF0dXJlKSB7XHJcbiAgICAgIHJldHVybiBmZWF0dXJlLnByb3BlcnRpZXNbdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkc1swXV07XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIEZlYXR1cmVMYXllclNlcnZpY2UucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcyA9IFt0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzXTtcclxuICAgIH1cclxuICAgIHRoaXMuX3N1Z2dlc3Rpb25zUXVlcnkgPSB0aGlzLnF1ZXJ5KCk7XHJcbiAgICB0aGlzLl9yZXN1bHRzUXVlcnkgPSB0aGlzLnF1ZXJ5KCk7XHJcbiAgfSxcclxuXHJcbiAgc3VnZ2VzdGlvbnM6IGZ1bmN0aW9uICh0ZXh0LCBib3VuZHMsIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgcXVlcnkgPSB0aGlzLl9zdWdnZXN0aW9uc1F1ZXJ5LndoZXJlKHRoaXMuX2J1aWxkUXVlcnkodGV4dCkpXHJcbiAgICAgIC5yZXR1cm5HZW9tZXRyeShmYWxzZSk7XHJcblxyXG4gICAgaWYgKGJvdW5kcykge1xyXG4gICAgICBxdWVyeS5pbnRlcnNlY3RzKGJvdW5kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pZEZpZWxkKSB7XHJcbiAgICAgIHF1ZXJ5LmZpZWxkcyhbdGhpcy5vcHRpb25zLmlkRmllbGRdLmNvbmNhdCh0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHJlcXVlc3QgPSBxdWVyeS5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXN1bHRzLCByYXcpIHtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIFtdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuaWRGaWVsZCA9IHJhdy5vYmplY3RJZEZpZWxkTmFtZTtcclxuICAgICAgICB2YXIgc3VnZ2VzdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gcmVzdWx0cy5mZWF0dXJlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgdmFyIGZlYXR1cmUgPSByZXN1bHRzLmZlYXR1cmVzW2ldO1xyXG4gICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5mb3JtYXRTdWdnZXN0aW9uLmNhbGwodGhpcywgZmVhdHVyZSksXHJcbiAgICAgICAgICAgIHVuZm9ybWF0dGVkVGV4dDogZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHNbMF1dLFxyXG4gICAgICAgICAgICBtYWdpY0tleTogZmVhdHVyZS5pZFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBzdWdnZXN0aW9ucy5zbGljZSgwLCB0aGlzLm9wdGlvbnMubWF4UmVzdWx0cykpO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICByZXR1cm4gcmVxdWVzdDtcclxuICB9LFxyXG5cclxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgcXVlcnkgPSB0aGlzLl9yZXN1bHRzUXVlcnk7XHJcblxyXG4gICAgaWYgKGtleSkge1xyXG4gICAgICBkZWxldGUgcXVlcnkucGFyYW1zLndoZXJlO1xyXG4gICAgICBxdWVyeS5mZWF0dXJlSWRzKFtrZXldKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHF1ZXJ5LndoZXJlKHRoaXMuX2J1aWxkUXVlcnkodGV4dCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChib3VuZHMpIHtcclxuICAgICAgcXVlcnkud2l0aGluKGJvdW5kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHF1ZXJ5LnJ1bihMLlV0aWwuYmluZChmdW5jdGlvbiAoZXJyb3IsIGZlYXR1cmVzKSB7XHJcbiAgICAgIHZhciByZXN1bHRzID0gW107XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmVhdHVyZXMuZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgZmVhdHVyZSA9IGZlYXR1cmVzLmZlYXR1cmVzW2ldO1xyXG4gICAgICAgIGlmIChmZWF0dXJlKSB7XHJcbiAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5fZmVhdHVyZUJvdW5kcyhmZWF0dXJlKTtcclxuXHJcbiAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgICAgICBsYXRsbmc6IGJvdW5kcy5nZXRDZW50ZXIoKSxcclxuICAgICAgICAgICAgYm91bmRzOiBib3VuZHMsXHJcbiAgICAgICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5mb3JtYXRTdWdnZXN0aW9uLmNhbGwodGhpcywgZmVhdHVyZSksXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IGZlYXR1cmUucHJvcGVydGllcyxcclxuICAgICAgICAgICAgZ2VvanNvbjogZmVhdHVyZVxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAvLyBjbGVhciBxdWVyeSBwYXJhbWV0ZXJzIGZvciB0aGUgbmV4dCBzZWFyY2hcclxuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9yZXN1bHRzUXVlcnkucGFyYW1zWydvYmplY3RJZHMnXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3VsdHMpO1xyXG4gICAgfSwgdGhpcykpO1xyXG4gIH0sXHJcblxyXG4gIG9yZGVyQnk6IGZ1bmN0aW9uIChmaWVsZE5hbWUsIG9yZGVyKSB7XHJcbiAgICB0aGlzLl9zdWdnZXN0aW9uc1F1ZXJ5Lm9yZGVyQnkoZmllbGROYW1lLCBvcmRlcik7XHJcbiAgfSxcclxuXHJcbiAgX2J1aWxkUXVlcnk6IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICB2YXIgcXVlcnlTdHJpbmcgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICB2YXIgZmllbGQgPSAndXBwZXIoXCInICsgdGhpcy5vcHRpb25zLnNlYXJjaEZpZWxkc1tpXSArICdcIiknO1xyXG5cclxuICAgICAgcXVlcnlTdHJpbmcucHVzaChmaWVsZCArIFwiIExJS0UgdXBwZXIoJyVcIiArIHRleHQgKyBcIiUnKVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLndoZXJlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMud2hlcmUgKyAnIEFORCAoJyArIHF1ZXJ5U3RyaW5nLmpvaW4oJyBPUiAnKSArICcpJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBxdWVyeVN0cmluZy5qb2luKCcgT1IgJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgX2ZlYXR1cmVCb3VuZHM6IGZ1bmN0aW9uIChmZWF0dXJlKSB7XHJcbiAgICB2YXIgZ2VvanNvbiA9IEwuZ2VvSnNvbihmZWF0dXJlKTtcclxuICAgIGlmIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcclxuICAgICAgdmFyIGNlbnRlciA9IGdlb2pzb24uZ2V0Qm91bmRzKCkuZ2V0Q2VudGVyKCk7XHJcbiAgICAgIHZhciBsbmdSYWRpdXMgPSAoKHRoaXMub3B0aW9ucy5idWZmZXJSYWRpdXMgLyA0MDA3NTAxNykgKiAzNjApIC8gTWF0aC5jb3MoKDE4MCAvIE1hdGguUEkpICogY2VudGVyLmxhdCk7XHJcbiAgICAgIHZhciBsYXRSYWRpdXMgPSAodGhpcy5vcHRpb25zLmJ1ZmZlclJhZGl1cyAvIDQwMDc1MDE3KSAqIDM2MDtcclxuICAgICAgcmV0dXJuIEwubGF0TG5nQm91bmRzKFtjZW50ZXIubGF0IC0gbGF0UmFkaXVzLCBjZW50ZXIubG5nIC0gbG5nUmFkaXVzXSwgW2NlbnRlci5sYXQgKyBsYXRSYWRpdXMsIGNlbnRlci5sbmcgKyBsbmdSYWRpdXNdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBnZW9qc29uLmdldEJvdW5kcygpO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZUxheWVyUHJvdmlkZXIgKG9wdGlvbnMpIHtcclxuICByZXR1cm4gbmV3IEZlYXR1cmVMYXllclByb3ZpZGVyKG9wdGlvbnMpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmZWF0dXJlTGF5ZXJQcm92aWRlcjtcclxuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xyXG5cclxuZXhwb3J0IHZhciBNYXBTZXJ2aWNlUHJvdmlkZXIgPSBNYXBTZXJ2aWNlLmV4dGVuZCh7XHJcbiAgb3B0aW9uczoge1xyXG4gICAgbGF5ZXJzOiBbMF0sXHJcbiAgICBsYWJlbDogJ01hcCBTZXJ2aWNlJyxcclxuICAgIGJ1ZmZlclJhZGl1czogMTAwMCxcclxuICAgIG1heFJlc3VsdHM6IDUsXHJcbiAgICBmb3JtYXRTdWdnZXN0aW9uOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xyXG4gICAgICByZXR1cm4gZmVhdHVyZS5wcm9wZXJ0aWVzW2ZlYXR1cmUuZGlzcGxheUZpZWxkTmFtZV0gKyAnIDxzbWFsbD4nICsgZmVhdHVyZS5sYXllck5hbWUgKyAnPC9zbWFsbD4nO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICBNYXBTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XHJcbiAgICB0aGlzLl9nZXRJZEZpZWxkcygpO1xyXG4gIH0sXHJcblxyXG4gIHN1Z2dlc3Rpb25zOiBmdW5jdGlvbiAodGV4dCwgYm91bmRzLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIHJlcXVlc3QgPSB0aGlzLmZpbmQoKS50ZXh0KHRleHQpLmZpZWxkcyh0aGlzLm9wdGlvbnMuc2VhcmNoRmllbGRzKS5yZXR1cm5HZW9tZXRyeShmYWxzZSkubGF5ZXJzKHRoaXMub3B0aW9ucy5sYXllcnMpO1xyXG5cclxuICAgIHJldHVybiByZXF1ZXN0LnJ1bihmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdHMsIHJhdykge1xyXG4gICAgICB2YXIgc3VnZ2VzdGlvbnMgPSBbXTtcclxuICAgICAgaWYgKCFlcnJvcikge1xyXG4gICAgICAgIHZhciBjb3VudCA9IE1hdGgubWluKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzLCByZXN1bHRzLmZlYXR1cmVzLmxlbmd0aCk7XHJcbiAgICAgICAgcmF3LnJlc3VsdHMgPSByYXcucmVzdWx0cy5yZXZlcnNlKCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgZmVhdHVyZSA9IHJlc3VsdHMuZmVhdHVyZXNbaV07XHJcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcmF3LnJlc3VsdHNbaV07XHJcbiAgICAgICAgICB2YXIgbGF5ZXIgPSByZXN1bHQubGF5ZXJJZDtcclxuICAgICAgICAgIHZhciBpZEZpZWxkID0gdGhpcy5faWRGaWVsZHNbbGF5ZXJdO1xyXG4gICAgICAgICAgZmVhdHVyZS5sYXllcklkID0gbGF5ZXI7XHJcbiAgICAgICAgICBmZWF0dXJlLmxheWVyTmFtZSA9IHRoaXMuX2xheWVyTmFtZXNbbGF5ZXJdO1xyXG4gICAgICAgICAgZmVhdHVyZS5kaXNwbGF5RmllbGROYW1lID0gdGhpcy5fZGlzcGxheUZpZWxkc1tsYXllcl07XHJcbiAgICAgICAgICBpZiAoaWRGaWVsZCkge1xyXG4gICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgICB0ZXh0OiB0aGlzLm9wdGlvbnMuZm9ybWF0U3VnZ2VzdGlvbi5jYWxsKHRoaXMsIGZlYXR1cmUpLFxyXG4gICAgICAgICAgICAgIHVuZm9ybWF0dGVkVGV4dDogZmVhdHVyZS5wcm9wZXJ0aWVzW2ZlYXR1cmUuZGlzcGxheUZpZWxkTmFtZV0sXHJcbiAgICAgICAgICAgICAgbWFnaWNLZXk6IHJlc3VsdC5hdHRyaWJ1dGVzW2lkRmllbGRdICsgJzonICsgbGF5ZXJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNhbGxiYWNrKGVycm9yLCBzdWdnZXN0aW9ucy5yZXZlcnNlKCkpO1xyXG4gICAgfSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgcmVzdWx0czogZnVuY3Rpb24gKHRleHQsIGtleSwgYm91bmRzLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcclxuICAgIHZhciByZXF1ZXN0O1xyXG5cclxuICAgIGlmIChrZXkpIHtcclxuICAgICAgdmFyIGZlYXR1cmVJZCA9IGtleS5zcGxpdCgnOicpWzBdO1xyXG4gICAgICB2YXIgbGF5ZXIgPSBrZXkuc3BsaXQoJzonKVsxXTtcclxuICAgICAgcmVxdWVzdCA9IHRoaXMucXVlcnkoKS5sYXllcihsYXllcikuZmVhdHVyZUlkcyhmZWF0dXJlSWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVxdWVzdCA9IHRoaXMuZmluZCgpLnRleHQodGV4dCkuZmllbGRzKHRoaXMub3B0aW9ucy5zZWFyY2hGaWVsZHMpLmxheWVycyh0aGlzLm9wdGlvbnMubGF5ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCBmZWF0dXJlcywgcmVzcG9uc2UpIHtcclxuICAgICAgaWYgKCFlcnJvcikge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5yZXN1bHRzKSB7XHJcbiAgICAgICAgICByZXNwb25zZS5yZXN1bHRzID0gcmVzcG9uc2UucmVzdWx0cy5yZXZlcnNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmVhdHVyZXMuZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHZhciBmZWF0dXJlID0gZmVhdHVyZXMuZmVhdHVyZXNbaV07XHJcbiAgICAgICAgICBsYXllciA9IGxheWVyIHx8IHJlc3BvbnNlLnJlc3VsdHNbaV0ubGF5ZXJJZDtcclxuXHJcbiAgICAgICAgICBpZiAoZmVhdHVyZSAmJiBsYXllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9mZWF0dXJlQm91bmRzKGZlYXR1cmUpO1xyXG4gICAgICAgICAgICBmZWF0dXJlLmxheWVySWQgPSBsYXllcjtcclxuICAgICAgICAgICAgZmVhdHVyZS5sYXllck5hbWUgPSB0aGlzLl9sYXllck5hbWVzW2xheWVyXTtcclxuICAgICAgICAgICAgZmVhdHVyZS5kaXNwbGF5RmllbGROYW1lID0gdGhpcy5fZGlzcGxheUZpZWxkc1tsYXllcl07XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgICAgICAgIGxhdGxuZzogYm91bmRzLmdldENlbnRlcigpLFxyXG4gICAgICAgICAgICAgIGJvdW5kczogYm91bmRzLFxyXG4gICAgICAgICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5mb3JtYXRTdWdnZXN0aW9uLmNhbGwodGhpcywgZmVhdHVyZSksXHJcbiAgICAgICAgICAgICAgcHJvcGVydGllczogZmVhdHVyZS5wcm9wZXJ0aWVzLFxyXG4gICAgICAgICAgICAgIGdlb2pzb246IGZlYXR1cmVcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjYWxsYmFjayhlcnJvciwgcmVzdWx0cy5yZXZlcnNlKCkpO1xyXG4gICAgfSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgX2ZlYXR1cmVCb3VuZHM6IGZ1bmN0aW9uIChmZWF0dXJlKSB7XHJcbiAgICB2YXIgZ2VvanNvbiA9IEwuZ2VvSnNvbihmZWF0dXJlKTtcclxuICAgIGlmIChmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcclxuICAgICAgdmFyIGNlbnRlciA9IGdlb2pzb24uZ2V0Qm91bmRzKCkuZ2V0Q2VudGVyKCk7XHJcbiAgICAgIHZhciBsbmdSYWRpdXMgPSAoKHRoaXMub3B0aW9ucy5idWZmZXJSYWRpdXMgLyA0MDA3NTAxNykgKiAzNjApIC8gTWF0aC5jb3MoKDE4MCAvIE1hdGguUEkpICogY2VudGVyLmxhdCk7XHJcbiAgICAgIHZhciBsYXRSYWRpdXMgPSAodGhpcy5vcHRpb25zLmJ1ZmZlclJhZGl1cyAvIDQwMDc1MDE3KSAqIDM2MDtcclxuICAgICAgcmV0dXJuIEwubGF0TG5nQm91bmRzKFtjZW50ZXIubGF0IC0gbGF0UmFkaXVzLCBjZW50ZXIubG5nIC0gbG5nUmFkaXVzXSwgW2NlbnRlci5sYXQgKyBsYXRSYWRpdXMsIGNlbnRlci5sbmcgKyBsbmdSYWRpdXNdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBnZW9qc29uLmdldEJvdW5kcygpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIF9sYXllck1ldGFkYXRhQ2FsbGJhY2s6IGZ1bmN0aW9uIChsYXllcmlkKSB7XHJcbiAgICByZXR1cm4gTC5VdGlsLmJpbmQoZnVuY3Rpb24gKGVycm9yLCBtZXRhZGF0YSkge1xyXG4gICAgICBpZiAoZXJyb3IpIHsgcmV0dXJuOyB9XHJcbiAgICAgIHRoaXMuX2Rpc3BsYXlGaWVsZHNbbGF5ZXJpZF0gPSBtZXRhZGF0YS5kaXNwbGF5RmllbGQ7XHJcbiAgICAgIHRoaXMuX2xheWVyTmFtZXNbbGF5ZXJpZF0gPSBtZXRhZGF0YS5uYW1lO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldGFkYXRhLmZpZWxkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBmaWVsZCA9IG1ldGFkYXRhLmZpZWxkc1tpXTtcclxuICAgICAgICBpZiAoZmllbGQudHlwZSA9PT0gJ2VzcmlGaWVsZFR5cGVPSUQnKSB7XHJcbiAgICAgICAgICB0aGlzLl9pZEZpZWxkc1tsYXllcmlkXSA9IGZpZWxkLm5hbWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIF9nZXRJZEZpZWxkczogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5faWRGaWVsZHMgPSB7fTtcclxuICAgIHRoaXMuX2Rpc3BsYXlGaWVsZHMgPSB7fTtcclxuICAgIHRoaXMuX2xheWVyTmFtZXMgPSB7fTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmxheWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLm9wdGlvbnMubGF5ZXJzW2ldO1xyXG4gICAgICB0aGlzLmdldChsYXllciwge30sIHRoaXMuX2xheWVyTWV0YWRhdGFDYWxsYmFjayhsYXllcikpO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFwU2VydmljZVByb3ZpZGVyIChvcHRpb25zKSB7XHJcbiAgcmV0dXJuIG5ldyBNYXBTZXJ2aWNlUHJvdmlkZXIob3B0aW9ucyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1hcFNlcnZpY2VQcm92aWRlcjtcclxuIiwiaW1wb3J0IHsgR2VvY29kZVNlcnZpY2UgfSBmcm9tICcuLi9TZXJ2aWNlcy9HZW9jb2RlJztcclxuXHJcbmV4cG9ydCB2YXIgR2VvY29kZVNlcnZpY2VQcm92aWRlciA9IEdlb2NvZGVTZXJ2aWNlLmV4dGVuZCh7XHJcbiAgb3B0aW9uczoge1xyXG4gICAgbGFiZWw6ICdHZW9jb2RlIFNlcnZlcicsXHJcbiAgICBtYXhSZXN1bHRzOiA1XHJcbiAgfSxcclxuXHJcbiAgc3VnZ2VzdGlvbnM6IGZ1bmN0aW9uICh0ZXh0LCBib3VuZHMsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnN1cHBvcnRzU3VnZ2VzdCkge1xyXG4gICAgICB2YXIgcmVxdWVzdCA9IHRoaXMuc3VnZ2VzdCgpLnRleHQodGV4dCk7XHJcbiAgICAgIGlmIChib3VuZHMpIHtcclxuICAgICAgICByZXF1ZXN0LndpdGhpbihib3VuZHMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmVxdWVzdC5ydW4oZnVuY3Rpb24gKGVycm9yLCByZXN1bHRzLCByZXNwb25zZSkge1xyXG4gICAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xyXG4gICAgICAgIGlmICghZXJyb3IpIHtcclxuICAgICAgICAgIHdoaWxlIChyZXNwb25zZS5zdWdnZXN0aW9ucy5sZW5ndGggJiYgc3VnZ2VzdGlvbnMubGVuZ3RoIDw9ICh0aGlzLm9wdGlvbnMubWF4UmVzdWx0cyAtIDEpKSB7XHJcbiAgICAgICAgICAgIHZhciBzdWdnZXN0aW9uID0gcmVzcG9uc2Uuc3VnZ2VzdGlvbnMuc2hpZnQoKTtcclxuICAgICAgICAgICAgaWYgKCFzdWdnZXN0aW9uLmlzQ29sbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogc3VnZ2VzdGlvbi50ZXh0LFxyXG4gICAgICAgICAgICAgICAgdW5mb3JtYXR0ZWRUZXh0OiBzdWdnZXN0aW9uLnRleHQsXHJcbiAgICAgICAgICAgICAgICBtYWdpY0tleTogc3VnZ2VzdGlvbi5tYWdpY0tleVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBzdWdnZXN0aW9ucyk7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2FsbGJhY2sodW5kZWZpbmVkLCBbXSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZXN1bHRzOiBmdW5jdGlvbiAodGV4dCwga2V5LCBib3VuZHMsIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgcmVxdWVzdCA9IHRoaXMuZ2VvY29kZSgpLnRleHQodGV4dCk7XHJcblxyXG4gICAgaWYgKGtleSkge1xyXG4gICAgICByZXF1ZXN0LmtleShrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QubWF4TG9jYXRpb25zKHRoaXMub3B0aW9ucy5tYXhSZXN1bHRzKTtcclxuXHJcbiAgICBpZiAoYm91bmRzKSB7XHJcbiAgICAgIHJlcXVlc3Qud2l0aGluKGJvdW5kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcXVlc3QucnVuKGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcclxuICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3BvbnNlLnJlc3VsdHMpO1xyXG4gICAgfSwgdGhpcyk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW9jb2RlU2VydmljZVByb3ZpZGVyIChvcHRpb25zKSB7XHJcbiAgcmV0dXJuIG5ldyBHZW9jb2RlU2VydmljZVByb3ZpZGVyKG9wdGlvbnMpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZW9jb2RlU2VydmljZVByb3ZpZGVyO1xyXG4iLCJleHBvcnQgeyB2ZXJzaW9uIGFzIFZFUlNJT04gfSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xyXG5leHBvcnQgdmFyIFdvcmxkR2VvY29kaW5nU2VydmljZVVybCA9ICdodHRwczovL2dlb2NvZGUuYXJjZ2lzLmNvbS9hcmNnaXMvcmVzdC9zZXJ2aWNlcy9Xb3JsZC9HZW9jb2RlU2VydmVyLyc7XHJcblxyXG4vLyBpbXBvcnQgdGFza3NcclxuZXhwb3J0IHsgR2VvY29kZSwgZ2VvY29kZSB9IGZyb20gJy4vVGFza3MvR2VvY29kZSc7XHJcbmV4cG9ydCB7IFJldmVyc2VHZW9jb2RlLCByZXZlcnNlR2VvY29kZSB9IGZyb20gJy4vVGFza3MvUmV2ZXJzZUdlb2NvZGUnO1xyXG5leHBvcnQgeyBTdWdnZXN0LCBzdWdnZXN0IH0gZnJvbSAnLi9UYXNrcy9TdWdnZXN0JztcclxuXHJcbi8vIGltcG9ydCBzZXJ2aWNlXHJcbmV4cG9ydCB7IEdlb2NvZGVTZXJ2aWNlLCBnZW9jb2RlU2VydmljZSB9IGZyb20gJy4vU2VydmljZXMvR2VvY29kZSc7XHJcblxyXG4vLyBpbXBvcnQgY29udHJvbFxyXG5leHBvcnQgeyBHZW9zZWFyY2gsIGdlb3NlYXJjaCB9IGZyb20gJy4vQ29udHJvbHMvR2Vvc2VhcmNoJztcclxuXHJcbi8vIGltcG9ydCBzdXBwb3J0aW5nIGNsYXNzXHJcbmV4cG9ydCB7IEdlb3NlYXJjaENvcmUsIGdlb3NlYXJjaENvcmUgfSBmcm9tICcuL0NsYXNzZXMvR2Vvc2VhcmNoQ29yZSc7XHJcblxyXG4vLyBpbXBvcnQgcHJvdmlkZXJzXHJcbmV4cG9ydCB7IEFyY2dpc09ubGluZVByb3ZpZGVyLCBhcmNnaXNPbmxpbmVQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL0FyY2dpc09ubGluZUdlb2NvZGVyJztcclxuZXhwb3J0IHsgRmVhdHVyZUxheWVyUHJvdmlkZXIsIGZlYXR1cmVMYXllclByb3ZpZGVyIH0gZnJvbSAnLi9Qcm92aWRlcnMvRmVhdHVyZUxheWVyJztcclxuZXhwb3J0IHsgTWFwU2VydmljZVByb3ZpZGVyLCBtYXBTZXJ2aWNlUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVycy9NYXBTZXJ2aWNlJztcclxuZXhwb3J0IHsgR2VvY29kZVNlcnZpY2VQcm92aWRlciwgZ2VvY29kZVNlcnZpY2VQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL0dlb2NvZGVTZXJ2aWNlJztcclxuIiwiaW1wb3J0IEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCB7IFRhc2ssIFV0aWwgfSBmcm9tICdlc3JpLWxlYWZsZXQnO1xyXG5pbXBvcnQgeyBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmwgfSBmcm9tICcuLi9Fc3JpTGVhZmxldEdlb2NvZGluZyc7XHJcblxyXG5leHBvcnQgdmFyIEdlb2NvZGUgPSBUYXNrLmV4dGVuZCh7XHJcbiAgcGF0aDogJ2ZpbmRBZGRyZXNzQ2FuZGlkYXRlcycsXHJcblxyXG4gIHBhcmFtczoge1xyXG4gICAgb3V0U3I6IDQzMjYsXHJcbiAgICBmb3JTdG9yYWdlOiBmYWxzZSxcclxuICAgIG91dEZpZWxkczogJyonLFxyXG4gICAgbWF4TG9jYXRpb25zOiAyMFxyXG4gIH0sXHJcblxyXG4gIHNldHRlcnM6IHtcclxuICAgICdhZGRyZXNzJzogJ2FkZHJlc3MnLFxyXG4gICAgJ25laWdoYm9yaG9vZCc6ICduZWlnaGJvcmhvb2QnLFxyXG4gICAgJ2NpdHknOiAnY2l0eScsXHJcbiAgICAnc3VicmVnaW9uJzogJ3N1YnJlZ2lvbicsXHJcbiAgICAncmVnaW9uJzogJ3JlZ2lvbicsXHJcbiAgICAncG9zdGFsJzogJ3Bvc3RhbCcsXHJcbiAgICAnY291bnRyeSc6ICdjb3VudHJ5JyxcclxuICAgICd0ZXh0JzogJ3NpbmdsZUxpbmUnLFxyXG4gICAgJ2NhdGVnb3J5JzogJ2NhdGVnb3J5JyxcclxuICAgICd0b2tlbic6ICd0b2tlbicsXHJcbiAgICAna2V5JzogJ21hZ2ljS2V5JyxcclxuICAgICdmaWVsZHMnOiAnb3V0RmllbGRzJyxcclxuICAgICdmb3JTdG9yYWdlJzogJ2ZvclN0b3JhZ2UnLFxyXG4gICAgJ21heExvY2F0aW9ucyc6ICdtYXhMb2NhdGlvbnMnXHJcbiAgfSxcclxuXHJcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgb3B0aW9ucy51cmwgPSBvcHRpb25zLnVybCB8fCBXb3JsZEdlb2NvZGluZ1NlcnZpY2VVcmw7XHJcbiAgICBUYXNrLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XHJcbiAgfSxcclxuXHJcbiAgd2l0aGluOiBmdW5jdGlvbiAoYm91bmRzKSB7XHJcbiAgICBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhib3VuZHMpO1xyXG4gICAgdGhpcy5wYXJhbXMuc2VhcmNoRXh0ZW50ID0gVXRpbC5ib3VuZHNUb0V4dGVudChib3VuZHMpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSxcclxuXHJcbiAgbmVhcmJ5OiBmdW5jdGlvbiAobGF0bG5nLCByYWRpdXMpIHtcclxuICAgIGxhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XHJcbiAgICB0aGlzLnBhcmFtcy5sb2NhdGlvbiA9IGxhdGxuZy5sbmcgKyAnLCcgKyBsYXRsbmcubGF0O1xyXG4gICAgdGhpcy5wYXJhbXMuZGlzdGFuY2UgPSBNYXRoLm1pbihNYXRoLm1heChyYWRpdXMsIDIwMDApLCA1MDAwMCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9LFxyXG5cclxuICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jdXN0b21QYXJhbSkge1xyXG4gICAgICB0aGlzLnBhcmFtc1t0aGlzLm9wdGlvbnMuY3VzdG9tUGFyYW1dID0gdGhpcy5wYXJhbXMuc2luZ2xlTGluZTtcclxuICAgICAgZGVsZXRlIHRoaXMucGFyYW1zLnNpbmdsZUxpbmU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XHJcbiAgICAgIHZhciBwcm9jZXNzb3IgPSB0aGlzLl9wcm9jZXNzR2VvY29kZXJSZXNwb25zZTtcclxuICAgICAgdmFyIHJlc3VsdHMgPSAoIWVycm9yKSA/IHByb2Nlc3NvcihyZXNwb25zZSkgOiB1bmRlZmluZWQ7XHJcbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgZXJyb3IsIHsgcmVzdWx0czogcmVzdWx0cyB9LCByZXNwb25zZSk7XHJcbiAgICB9LCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBfcHJvY2Vzc0dlb2NvZGVyUmVzcG9uc2U6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3BvbnNlLmNhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGNhbmRpZGF0ZSA9IHJlc3BvbnNlLmNhbmRpZGF0ZXNbaV07XHJcbiAgICAgIGlmIChjYW5kaWRhdGUuZXh0ZW50KSB7XHJcbiAgICAgICAgdmFyIGJvdW5kcyA9IFV0aWwuZXh0ZW50VG9Cb3VuZHMoY2FuZGlkYXRlLmV4dGVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlc3VsdHMucHVzaCh7XHJcbiAgICAgICAgdGV4dDogY2FuZGlkYXRlLmFkZHJlc3MsXHJcbiAgICAgICAgYm91bmRzOiBib3VuZHMsXHJcbiAgICAgICAgc2NvcmU6IGNhbmRpZGF0ZS5zY29yZSxcclxuICAgICAgICBsYXRsbmc6IEwubGF0TG5nKGNhbmRpZGF0ZS5sb2NhdGlvbi55LCBjYW5kaWRhdGUubG9jYXRpb24ueCksXHJcbiAgICAgICAgcHJvcGVydGllczogY2FuZGlkYXRlLmF0dHJpYnV0ZXNcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0cztcclxuICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlb2NvZGUgKG9wdGlvbnMpIHtcclxuICByZXR1cm4gbmV3IEdlb2NvZGUob3B0aW9ucyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdlb2NvZGU7XHJcbiIsImV4cG9ydCB7IHZlcnNpb24gYXMgVkVSU0lPTiB9IGZyb20gJy4uL3BhY2thZ2UuanNvbic7XHJcbmV4cG9ydCB2YXIgV29ybGRHZW9jb2RpbmdTZXJ2aWNlVXJsID0gJ2h0dHBzOi8vZ2VvY29kZS5hcmNnaXMuY29tL2FyY2dpcy9yZXN0L3NlcnZpY2VzL1dvcmxkL0dlb2NvZGVTZXJ2ZXIvJztcclxuXHJcbi8vIGltcG9ydCB0YXNrc1xyXG5leHBvcnQgeyBHZW9jb2RlLCBnZW9jb2RlIH0gZnJvbSAnLi9UYXNrcy9HZW9jb2RlJztcclxuZXhwb3J0IHsgUmV2ZXJzZUdlb2NvZGUsIHJldmVyc2VHZW9jb2RlIH0gZnJvbSAnLi9UYXNrcy9SZXZlcnNlR2VvY29kZSc7XHJcbmV4cG9ydCB7IFN1Z2dlc3QsIHN1Z2dlc3QgfSBmcm9tICcuL1Rhc2tzL1N1Z2dlc3QnO1xyXG5cclxuLy8gaW1wb3J0IHNlcnZpY2VcclxuZXhwb3J0IHsgR2VvY29kZVNlcnZpY2UsIGdlb2NvZGVTZXJ2aWNlIH0gZnJvbSAnLi9TZXJ2aWNlcy9HZW9jb2RlJztcclxuXHJcbi8vIGltcG9ydCBjb250cm9sXHJcbmV4cG9ydCB7IEdlb3NlYXJjaCwgZ2Vvc2VhcmNoIH0gZnJvbSAnLi9Db250cm9scy9HZW9zZWFyY2gnO1xyXG5cclxuLy8gaW1wb3J0IHN1cHBvcnRpbmcgY2xhc3NcclxuZXhwb3J0IHsgR2Vvc2VhcmNoQ29yZSwgZ2Vvc2VhcmNoQ29yZSB9IGZyb20gJy4vQ2xhc3Nlcy9HZW9zZWFyY2hDb3JlJztcclxuXHJcbi8vIGltcG9ydCBwcm92aWRlcnNcclxuZXhwb3J0IHsgQXJjZ2lzT25saW5lUHJvdmlkZXIsIGFyY2dpc09ubGluZVByb3ZpZGVyIH0gZnJvbSAnLi9Qcm92aWRlcnMvQXJjZ2lzT25saW5lR2VvY29kZXInO1xyXG5leHBvcnQgeyBGZWF0dXJlTGF5ZXJQcm92aWRlciwgZmVhdHVyZUxheWVyUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVycy9GZWF0dXJlTGF5ZXInO1xyXG5leHBvcnQgeyBNYXBTZXJ2aWNlUHJvdmlkZXIsIG1hcFNlcnZpY2VQcm92aWRlciB9IGZyb20gJy4vUHJvdmlkZXJzL01hcFNlcnZpY2UnO1xyXG5leHBvcnQgeyBHZW9jb2RlU2VydmljZVByb3ZpZGVyLCBnZW9jb2RlU2VydmljZVByb3ZpZGVyIH0gZnJvbSAnLi9Qcm92aWRlcnMvR2VvY29kZVNlcnZpY2UnO1xyXG4iXSwibmFtZXMiOlsiVGFzayIsIldvcmxkR2VvY29kaW5nU2VydmljZVVybCIsIlV0aWwiLCJTZXJ2aWNlIiwiRmVhdHVyZUxheWVyU2VydmljZSIsIk1hcFNlcnZpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Q0NJTyxJQUFJLGNBQWMsR0FBR0EsZ0JBQUksQ0FBQyxNQUFNLENBQUM7QUFDeEMsQ0FBQSxF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RUFBRSxXQUFXLEVBQUUsVUFBVSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtBQUNqRCxDQUFBLElBQUksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTdILENBQUEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRTtBQUN0RCxDQUFBLE1BQU0sSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQzNCLENBQUEsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2xCLENBQUEsUUFBUSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0UsQ0FBQSxRQUFRLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM1QyxDQUFBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN4QyxDQUFBLFVBQVUsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QyxDQUFBLFVBQVUsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFBLFVBQVUsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNyQyxDQUFBLFVBQVUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM5QyxDQUFBLFVBQVUsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDbEMsQ0FBQSxVQUFVLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxDQUFBLFVBQVUsT0FBTyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEUsQ0FBQSxVQUFVLElBQUksT0FBTyxFQUFFO0FBQ3ZCLENBQUEsWUFBWSxXQUFXLENBQUMsSUFBSSxDQUFDO0FBQzdCLENBQUEsY0FBYyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztBQUNyRSxDQUFBLGNBQWMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDO0FBQzNFLENBQUEsY0FBYyxRQUFRLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSztBQUNoRSxDQUFBLGFBQWEsQ0FBQyxDQUFDO0FBQ2YsQ0FBQSxXQUFXO0FBQ1gsQ0FBQSxTQUFTO0FBQ1QsQ0FBQSxPQUFPO0FBQ1AsQ0FBQSxNQUFNLFFBQVEsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDN0MsQ0FBQSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDYixDQUFBLEdBQUc7O0FBRUgsQ0FBQSxFQUFFLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtBQUNsRCxDQUFBLElBQUksSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLENBQUEsSUFBSSxJQUFJLE9BQU8sQ0FBQzs7QUFFaEIsQ0FBQSxJQUFJLElBQUksR0FBRyxFQUFFO0FBQ2IsQ0FBQSxNQUFNLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEMsQ0FBQSxNQUFNLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEMsQ0FBQSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNoRSxDQUFBLEtBQUssTUFBTTtBQUNYLENBQUEsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyRyxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0FBQzVELENBQUEsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2xCLENBQUEsUUFBUSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7QUFDOUIsQ0FBQSxVQUFVLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN4RCxDQUFBLFNBQVM7QUFDVCxDQUFBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNELENBQUEsVUFBVSxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdDLENBQUEsVUFBVSxLQUFLLEdBQUcsS0FBSyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxD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