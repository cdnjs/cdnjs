/* esri-leaflet-geocoder - v3.1.4 - Thu Feb 23 2023 13:29:24 GMT-0600 (Central Standard Time)
 * Copyright (c) 2023 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet'), require('esri-leaflet')) :
  typeof define === 'function' && define.amd ? define(['exports', 'leaflet', 'esri-leaflet'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Geocoding = {}), global.L, global.L.esri));
})(this, (function (exports, leaflet, esriLeaflet) { 'use strict';

  var version = "3.1.4";

  var WorldGeocodingServiceUrl = 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/';

  var Geocode = esriLeaflet.Task.extend({
    path: 'findAddressCandidates',

    params: {
      outSr: 4326,
      forStorage: false,
      outFields: '*',
      maxLocations: 20
    },

    setters: {
      address: 'address',
      neighborhood: 'neighborhood',
      city: 'city',
      subregion: 'subregion',
      region: 'region',
      postal: 'postal',
      country: 'country',
      text: 'singleLine',
      category: 'category',
      token: 'token',
      apikey: 'apikey',
      key: 'magicKey',
      fields: 'outFields',
      forStorage: 'forStorage',
      maxLocations: 'maxLocations',
      // World Geocoding Service (only works with singleLine)
      countries: 'sourceCountry'
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
      if (radius) {
        this.params.distance = Math.min(Math.max(radius, 2000), 50000);
      }
      return this;
    },

    run: function (callback, context) {
      if (this.options.token) {
        this.params.token = this.options.token;
      }
      if (this.options.apikey) {
        this.params.token = this.options.apikey;
      }
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
      distance: 'distance',
      language: 'langCode',
      intersection: 'returnIntersection',
      apikey: 'apikey'
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
      if (this.options.token) {
        this.params.token = this.options.token;
      }
      if (this.options.apikey) {
        this.params.token = this.options.apikey;
      }
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
      if (radius) {
        this.params.distance = Math.min(Math.max(radius, 2000), 50000);
      }
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
      if (options.apikey) {
        options.token = options.apikey;
      }
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
      var suggestionsLength = 0;

      var createCallback = leaflet.Util.bind(function (text, provider) {
        return leaflet.Util.bind(function (error, suggestions) {
          activeRequests = activeRequests - 1;
          suggestionsLength += suggestions.length;

          if (error) {
            // an error occurred for one of the providers' suggest requests
            this._control._clearProviderSuggestions(provider);

            // perform additional cleanup when all requests are finished
            this._control._finalizeSuggestions(activeRequests, suggestionsLength);

            return;
          }

          if (suggestions.length) {
            for (var i = 0; i < suggestions.length; i++) {
              suggestions[i].provider = provider;
            }
          } else {
            // we still need to update the UI
            this._control._renderSuggestions(suggestions);
          }

          if (provider._lastRender !== text) {
            this._control._clearProviderSuggestions(provider);
          }

          if (suggestions.length && this._control._input.value === text) {
            provider._lastRender = text;
            this._control._renderSuggestions(suggestions);
          }

          // perform additional cleanup when all requests are finished
          this._control._finalizeSuggestions(activeRequests, suggestionsLength);
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

      if (this.options.nearby) {
        // "distance"/"radius" is not supported by the ArcGIS Online Geocoder,
        // so that is intentionally not passed here:
        request.nearby(this.options.nearby);
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

      if (this.options.nearby) {
        // "distance"/"radius" is not supported by the ArcGIS Online Geocoder,
        // so that is intentionally not passed here:
        request.nearby(this.options.nearby);
      }

      if (this.options.countries) {
        request.countries(this.options.countries);
      }

      if (this.options.categories) {
        request.category(this.options.categories);
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
        options.providers = [arcgisOnlineProvider()];
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

      leaflet.Control.prototype.initialize.call(this, options);
    },

    _renderSuggestions: function (suggestions) {
      var currentGroup;

      if (suggestions.length > 0) {
        this._suggestions.style.display = 'block';
      }

      var list;
      var header;
      var suggestionTextArray = [];

      for (var i = 0; i < suggestions.length; i++) {
        var suggestion = suggestions[i];
        if (!header && this._geosearchCore._providers.length > 1 && currentGroup !== suggestion.provider.options.label) {
          header = leaflet.DomUtil.create('div', 'geocoder-control-header', suggestion.provider._contentsElement);
          header.textContent = suggestion.provider.options.label;
          header.innerText = suggestion.provider.options.label;
          currentGroup = suggestion.provider.options.label;
        }

        if (!list) {
          list = leaflet.DomUtil.create('ul', 'geocoder-control-list', suggestion.provider._contentsElement);
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

      // when the geocoder position is either "topleft" or "topright":
      // set the maxHeight of the suggestions box to:
      //  map height
      //  - suggestions offset (distance from top of suggestions to top of control)
      //  - control offset (distance from top of control to top of map)
      //  - 10 (extra padding)
      if (this.getPosition().indexOf('top') > -1) {
        this._suggestions.style.maxHeight = (this._map.getSize().y - this._suggestions.offsetTop - this._wrapper.offsetTop - 10) + 'px';
      }

      // when the geocoder position is either "bottomleft" or "bottomright":
      // 1. set the maxHeight of the suggestions box to:
      //  map height
      //  - corner control container offsetHeight (height of container of bottom corner)
      //  - control offsetHeight (height of geocoder control wrapper, the main expandable button)
      // 2. to move it up, set the top of the suggestions box to:
      //  negative offsetHeight of suggestions box (its own negative height now that it has children elements
      //  - control offsetHeight (height of geocoder control wrapper, the main expandable button)
      //  + 20 (extra spacing)
      if (this.getPosition().indexOf('bottom') > -1) {
        this._setSuggestionsBottomPosition();
      }
    },

    _setSuggestionsBottomPosition: function () {
      this._suggestions.style.maxHeight = (this._map.getSize().y - this._map._controlCorners[this.getPosition()].offsetHeight - this._wrapper.offsetHeight) + 'px';
      this._suggestions.style.top = (-this._suggestions.offsetHeight - this._wrapper.offsetHeight + 20) + 'px';
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
      this._clearAllSuggestions();

      if (this.options.collapseAfterResult) {
        this._input.value = '';
        this._lastValue = '';
        this._input.placeholder = '';
        leaflet.DomUtil.removeClass(this._wrapper, 'geocoder-control-expanded');
      }

      if (!this._map.scrollWheelZoom.enabled() && this._map.options.scrollWheelZoom) {
        this._map.scrollWheelZoom.enable();
      }
    },

    _clearAllSuggestions: function () {
      this._suggestions.style.display = 'none';

      for (var i = 0; i < this.options.providers.length; i++) {
        this._clearProviderSuggestions(this.options.providers[i]);
      }
    },

    _clearProviderSuggestions: function (provider) {
      provider._contentsElement.innerHTML = '';
    },

    _finalizeSuggestions: function (activeRequests, suggestionsLength) {
      // check if all requests are finished to remove the loading indicator
      if (!activeRequests) {
        leaflet.DomUtil.removeClass(this._input, 'geocoder-control-loading');

        // when the geocoder position is either "bottomleft" or "bottomright",
        // it is necessary in some cases to recalculate the maxHeight and top values of the this._suggestions element,
        // even though this is also being done after each provider returns their own suggestions
        if (this.getPosition().indexOf('bottom') > -1) {
          this._setSuggestionsBottomPosition();
        }

        // also check if there were 0 total suggest results to clear the parent suggestions element
        // otherwise its display value may be "block" instead of "none"
        if (!suggestionsLength) {
          this._clearAllSuggestions();
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

      if (
        suggestionItem.classList.contains('geocoder-control-suggestions') ||
        suggestionItem.classList.contains('geocoder-control-header')
      ) {
        return;
      }

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

      // create the main suggested results container element
      this._suggestions = leaflet.DomUtil.create('div', 'geocoder-control-suggestions leaflet-bar', this._wrapper);

      // create a child contents container element for each provider inside of this._suggestions
      // to maintain the configured order of providers for suggested results
      for (var i = 0; i < this.options.providers.length; i++) {
        this.options.providers[i]._contentsElement = leaflet.DomUtil.create('div', null, this._suggestions);
      }

      var credits = this._geosearchCore._getAttribution();

      if (map.attributionControl) {
        map.attributionControl.addAttribution(credits);
      }

      leaflet.DomEvent.addListener(this._input, 'focus', function (e) {
        this._input.placeholder = this.options.placeholder;
        leaflet.DomUtil.addClass(this._wrapper, 'geocoder-control-expanded');
      }, this);

      leaflet.DomEvent.addListener(this._wrapper, 'click', this._setupClick, this);

      // make sure both click and touch spawn an address/poi search
      leaflet.DomEvent.addListener(this._suggestions, 'mousedown', this.geocodeSuggestion, this);

      leaflet.DomEvent.addListener(this._input, 'blur', function (e) {
        // TODO: this is too greedy and should not "clear"
        // when trying to use the scrollbar or clicking on a non-suggestion item (such as a provider header)
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
              this._input.value = selected.innerText;
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
          this._lastValue = this._input.value;
          this._clearAllSuggestions();
          leaflet.DomUtil.removeClass(this._input, 'geocoder-control-loading');
          return;
        }

        // if this is the escape key it will clear the input so clear suggestions
        if (key === 27) {
          this._clearAllSuggestions();
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
      searchMode: 'contain',
      formatSuggestion: function (feature) {
        return feature.properties[this.options.searchFields[0]];
      }
    },

    initialize: function (options) {
      if (options.apikey) {
        options.token = options.apikey;
      }
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
        // if there are 1 or more keys available, use query.featureIds()
        delete query.params.where;
        query.featureIds([key]);
      } else {
        // if there are no keys available, use query.where()
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
        if (this.options.searchMode === 'contain') {
          queryString.push(field + " LIKE upper('%" + text + "%')");
        } else if (this.options.searchMode === 'startWith') {
          queryString.push(field + " LIKE upper('" + text + "%')");
        } else if (this.options.searchMode === 'endWith') {
          queryString.push(field + " LIKE upper('%" + text + "')");
        } else if (this.options.searchMode === 'strict') {
          queryString.push(field + " LIKE upper('" + text + "')");
        } else {
          throw new Error('L.esri.Geocoding.featureLayerProvider: Invalid parameter for "searchMode". Use one of "contain", "startWith", "endWith", or "strict"');
        }
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
      if (options.apikey) {
        options.token = options.apikey;
      }
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

      if (key && !key.includes(',')) {
        // if there is only 1 key available, use query()
        var featureId = key.split(':')[0];
        var layer = key.split(':')[1];
        request = this.query().layer(layer).featureIds(featureId);
      } else {
        // if there are no keys or more than 1 keys available, use find()
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
        callback(null, []);
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

  exports.ArcgisOnlineProvider = ArcgisOnlineProvider;
  exports.FeatureLayerProvider = FeatureLayerProvider;
  exports.Geocode = Geocode;
  exports.GeocodeService = GeocodeService;
  exports.GeocodeServiceProvider = GeocodeServiceProvider;
  exports.Geosearch = Geosearch;
  exports.GeosearchCore = GeosearchCore;
  exports.MapServiceProvider = MapServiceProvider;
  exports.ReverseGeocode = ReverseGeocode;
  exports.Suggest = Suggest;
  exports.VERSION = version;
  exports.WorldGeocodingServiceUrl = WorldGeocodingServiceUrl;
  exports.arcgisOnlineProvider = arcgisOnlineProvider;
  exports.featureLayerProvider = featureLayerProvider;
  exports.geocode = geocode;
  exports.geocodeService = geocodeService;
  exports.geocodeServiceProvider = geocodeServiceProvider;
  exports.geosearch = geosearch;
  exports.geosearchCore = geosearchCore;
  exports.mapServiceProvider = mapServiceProvider;
  exports.reverseGeocode = reverseGeocode;
  exports.suggest = suggest;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=esri-leaflet-geocoder-debug.js.map
