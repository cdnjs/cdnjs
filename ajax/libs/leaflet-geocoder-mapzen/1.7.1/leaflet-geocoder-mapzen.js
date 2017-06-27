/*
 * leaflet-geocoder-mapzen
 * Leaflet plugin to search (geocode) using Mapzen Search or your
 * own hosted version of the Pelias Geocoder API.
 *
 * License: MIT
 * (c) Mapzen
 */
;(function (factory) { // eslint-disable-line no-extra-semi
  var L;
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['leaflet'], factory);
  } else if (typeof module !== 'undefined') {
    // Node/CommonJS
    L = require('leaflet');
    module.exports = factory(L);
  } else {
    // Browser globals
    if (typeof window.L === 'undefined') {
      throw new Error('Leaflet must be loaded first');
    }
    factory(window.L);
  }
}(function (L) {
  'use strict';

  var MINIMUM_INPUT_LENGTH_FOR_AUTOCOMPLETE = 1;
  var FULL_WIDTH_MARGIN = 20; // in pixels
  var FULL_WIDTH_TOUCH_ADJUSTED_MARGIN = 4; // in pixels
  var RESULTS_HEIGHT_MARGIN = 20; // in pixels
  var API_RATE_LIMIT = 250; // in ms, throttled time between subsequent requests to API

  L.Control.Geocoder = L.Control.extend({

    version: '1.7.1',

    includes: L.Mixin.Events,

    options: {
      position: 'topleft',
      attribution: 'Geocoding by <a href="https://mapzen.com/projects/search/">Mapzen</a>',
      url: 'https://search.mapzen.com/v1',
      placeholder: 'Search',
      title: 'Search',
      bounds: false,
      focus: true,
      layers: null,
      panToPoint: true,
      pointIcon: true, // 'images/point_icon.png',
      polygonIcon: true, // 'images/polygon_icon.png',
      fullWidth: 650,
      markers: true,
      expanded: false,
      autocomplete: true,
      place: false
    },

    initialize: function (apiKey, options) {
      // For IE8 compatibility (if XDomainRequest is present),
      // we set the default value of options.url to the protocol-relative
      // version, because XDomainRequest does not allow http-to-https requests
      // This is set first so it can always be overridden by the user
      if (window.XDomainRequest) {
        this.options.url = '//search.mapzen.com/v1';
      }

      // If the apiKey is omitted entirely and the
      // first parameter is actually the options
      if (typeof apiKey === 'object' && !!apiKey) {
        options = apiKey;
      } else {
        this.apiKey = apiKey;
      }

      // Deprecation warnings
      // If options.latlng is defined, warn. (Do not check for falsy values, because it can be set to false.)
      if (options && typeof options.latlng !== 'undefined') {
        // Set user-specified latlng to focus option, but don't overwrite if it's already there
        if (typeof options.focus === 'undefined') {
          options.focus = options.latlng;
        }
        console.log('[leaflet-geocoder-mapzen] DEPRECATION WARNING:',
          'As of v1.6.0, the `latlng` option is deprecated. It has been renamed to `focus`. `latlng` will be removed in a future version.');
      }

      // Now merge user-specified options
      L.Util.setOptions(this, options);
      this.markers = [];
    },

    /**
     * Resets the geocoder control to an empty state.
     *
     * @public
     */
    reset: function () {
      this._input.value = '';
      L.DomUtil.addClass(this._reset, 'leaflet-pelias-hidden');
      this.removeMarkers();
      this.clearResults();
      this.fire('reset');
    },

    getLayers: function (params) {
      var layers = this.options.layers;

      if (!layers) {
        return params;
      }

      params.layers = layers;
      return params;
    },

    getBoundingBoxParam: function (params) {
      /*
       * this.options.bounds can be one of the following
       * true //Boolean - take the map bounds
       * false //Boolean - no bounds
       * L.latLngBounds(...) //Object
       * [[10, 10], [40, 60]] //Array
      */
      var bounds = this.options.bounds;

      // If falsy, bail
      if (!bounds) {
        return params;
      }

      // If set to true, use map bounds
      // If it is a valid L.LatLngBounds object, get its values
      // If it is an array, try running it through L.LatLngBounds
      if (bounds === true) {
        bounds = this._map.getBounds();
        params = makeParamsFromLeaflet(params, bounds);
      } else if (typeof bounds === 'object' && bounds.isValid && bounds.isValid()) {
        params = makeParamsFromLeaflet(params, bounds);
      } else if (L.Util.isArray(bounds)) {
        var latLngBounds = L.latLngBounds(bounds);
        if (latLngBounds.isValid && latLngBounds.isValid()) {
          params = makeParamsFromLeaflet(params, latLngBounds);
        }
      }

      function makeParamsFromLeaflet (params, latLngBounds) {
        params['boundary.rect.min_lon'] = latLngBounds.getWest();
        params['boundary.rect.min_lat'] = latLngBounds.getSouth();
        params['boundary.rect.max_lon'] = latLngBounds.getEast();
        params['boundary.rect.max_lat'] = latLngBounds.getNorth();
        return params;
      }

      return params;
    },

    getFocusParam: function (params) {
      /**
       * this.options.focus can be one of the following
       * [50, 30]           // Array
       * {lon: 30, lat: 50} // Object
       * {lat: 50, lng: 30} // Object
       * L.latLng(50, 30)   // Object
       * true               // Boolean - take the map center
       * false              // Boolean - No latlng to be considered
       */
      var focus = this.options.focus;

      if (!focus) {
        return params;
      }

      if (focus === true) {
        // If focus option is Boolean true, use current map center
        var mapCenter = this._map.getCenter();
        params['focus.point.lat'] = mapCenter.lat;
        params['focus.point.lon'] = mapCenter.lng;
      } else if (typeof focus === 'object') {
        // Accepts array, object and L.latLng form
        // Constructs the latlng object using Leaflet's L.latLng()
        // [50, 30]
        // {lon: 30, lat: 50}
        // {lat: 50, lng: 30}
        // L.latLng(50, 30)
        var latlng = L.latLng(focus);
        params['focus.point.lat'] = latlng.lat;
        params['focus.point.lon'] = latlng.lng;
      }

      return params;
    },

    // @method getParams(params: Object)
    // Collects all the parameters in a single object from various options,
    // including options.bounds, options.focus, options.layers, the api key,
    // and any params that are provided as a argument to this function.
    // Note that options.params will overwrite any of these
    getParams: function (params) {
      params = params || {};
      params = this.getBoundingBoxParam(params);
      params = this.getFocusParam(params);
      params = this.getLayers(params);

      // Search API key
      if (this.apiKey) {
        params.api_key = this.apiKey;
      }

      var newParams = this.options.params;

      if (!newParams) {
        return params;
      }

      if (typeof newParams === 'object') {
        for (var prop in newParams) {
          params[prop] = newParams[prop];
        }
      }

      return params;
    },

    search: function (input) {
      // Prevent lack of input from sending a malformed query to Pelias
      if (!input) return;

      var url = this.options.url + '/search';
      var params = {
        text: input
      };

      this.callPelias(url, params, 'search');
    },

    autocomplete: throttle(function (input) {
      // Prevent lack of input from sending a malformed query to Pelias
      if (!input) return;

      var url = this.options.url + '/autocomplete';
      var params = {
        text: input
      };

      this.callPelias(url, params, 'autocomplete');
    }, API_RATE_LIMIT),

    place: function (id) {
      // Prevent lack of input from sending a malformed query to Pelias
      if (!id) return;

      var url = this.options.url + '/place';
      var params = {
        ids: id
      };

      this.callPelias(url, params, 'place');
    },

    handlePlaceResponse: function (response) {
      // Placeholder for handling place response
    },

    // Timestamp of the last response which was successfully rendered to the UI.
    // The time represents when the request was *sent*, not when it was recieved.
    maxReqTimestampRendered: new Date().getTime(),

    callPelias: function (endpoint, params, type) {
      params = this.getParams(params);

      L.DomUtil.addClass(this._search, 'leaflet-pelias-loading');

      // Track when the request began
      var reqStartedAt = new Date().getTime();

      AJAX.request(endpoint, params, function (err, results) {
        L.DomUtil.removeClass(this._search, 'leaflet-pelias-loading');

        if (err) {
          var errorMessage;
          switch (err.code) {
            // Error codes.
            // https://mapzen.com/documentation/search/http-status-codes/
            case 403:
              errorMessage = 'A valid API key is needed for this search feature.';
              break;
            case 404:
              errorMessage = 'The search service cannot be found. :-(';
              break;
            case 408:
              errorMessage = 'The search service took too long to respond. Try again in a second.';
              break;
            case 429:
              errorMessage = 'There were too many requests. Try again in a second.';
              break;
            case 500:
              errorMessage = 'The search service is not working right now. Please try again later.';
              break;
            case 502:
              errorMessage = 'Connection lost. Please try again later.';
              break;
            // Note the status code is 0 if CORS is not enabled on the error response
            default:
              errorMessage = 'The search service is having problems :-(';
              break;
          }
          this.showMessage(errorMessage);
          this.fire('error', {
            results: results,
            endpoint: endpoint,
            requestType: type,
            params: params,
            errorCode: err.code,
            errorMessage: errorMessage
          });
        }

        // There might be an error message from the geocoding service itself
        if (results && results.geocoding && results.geocoding.errors) {
          errorMessage = results.geocoding.errors[0];
          this.showMessage(errorMessage);
          this.fire('error', {
            results: results,
            endpoint: endpoint,
            requestType: type,
            params: params,
            errorCode: err.code,
            errorMessage: errorMessage
          });
          return;
        }

        // Autocomplete and search responses
        if (results && results.features) {
          // Check if request is stale:
          // Only for autocomplete or search endpoints
          // Ignore requests if input is currently blank
          // Ignore requests that started before a request which has already
          // been successfully rendered on to the UI.
          if (type === 'autocomplete' || type === 'search') {
            if (this._input.value === '' || this.maxReqTimestampRendered >= reqStartedAt) {
              return;
            } else {
              // Record the timestamp of the request.
              this.maxReqTimestampRendered = reqStartedAt;
            }
          }

          // Placeholder: handle place response
          if (type === 'place') {
            this.handlePlaceResponse(results);
          }

          // Show results
          if (type === 'autocomplete' || type === 'search') {
            this.showResults(results.features, params.text);
          }

          // Fire event
          this.fire('results', {
            results: results,
            endpoint: endpoint,
            requestType: type,
            params: params
          });
        }
      }, this);
    },

    highlight: function (text, focus) {
      var r = RegExp('(' + escapeRegExp(focus) + ')', 'gi');
      return text.replace(r, '<strong>$1</strong>');
    },

    getIconType: function (layer) {
      var pointIcon = this.options.pointIcon;
      var polygonIcon = this.options.polygonIcon;
      var classPrefix = 'leaflet-pelias-layer-icon-';

      if (layer.match('venue') || layer.match('address')) {
        if (pointIcon === true) {
          return {
            type: 'class',
            value: classPrefix + 'point'
          };
        } else if (pointIcon === false) {
          return false;
        } else {
          return {
            type: 'image',
            value: pointIcon
          };
        }
      } else {
        if (polygonIcon === true) {
          return {
            type: 'class',
            value: classPrefix + 'polygon'
          };
        } else if (polygonIcon === false) {
          return false;
        } else {
          return {
            type: 'image',
            value: polygonIcon
          };
        }
      }
    },

    showResults: function (features, input) {
      // Exit function if there are no features
      if (features.length === 0) {
        this.showMessage('No results were found.');
        return;
      }

      var resultsContainer = this._results;

      // Reset and display results container
      resultsContainer.innerHTML = '';
      resultsContainer.style.display = 'block';
      // manage result box height
      resultsContainer.style.maxHeight = (this._map.getSize().y - resultsContainer.offsetTop - this._container.offsetTop - RESULTS_HEIGHT_MARGIN) + 'px';

      var list = L.DomUtil.create('ul', 'leaflet-pelias-list', resultsContainer);

      for (var i = 0, j = features.length; i < j; i++) {
        var feature = features[i];
        var resultItem = L.DomUtil.create('li', 'leaflet-pelias-result', list);

        resultItem.feature = feature;
        resultItem.layer = feature.properties.layer;

        // Deprecated
        // Use L.GeoJSON.coordsToLatLng(resultItem.feature.geometry.coordinates) instead
        // This returns a L.LatLng object that can be used throughout Leaflet
        resultItem.coords = feature.geometry.coordinates;

        var icon = this.getIconType(feature.properties.layer);
        if (icon) {
          // Point or polygon icon
          // May be a class or an image path
          var layerIconContainer = L.DomUtil.create('span', 'leaflet-pelias-layer-icon-container', resultItem);
          var layerIcon;

          if (icon.type === 'class') {
            layerIcon = L.DomUtil.create('div', 'leaflet-pelias-layer-icon ' + icon.value, layerIconContainer);
          } else {
            layerIcon = L.DomUtil.create('img', 'leaflet-pelias-layer-icon', layerIconContainer);
            layerIcon.src = icon.value;
          }

          layerIcon.title = 'layer: ' + feature.properties.layer;
        }

        resultItem.innerHTML += this.highlight(feature.properties.label, input);
      }
    },

    showMessage: function (text) {
      var resultsContainer = this._results;

      // Reset and display results container
      resultsContainer.innerHTML = '';
      resultsContainer.style.display = 'block';

      var messageEl = L.DomUtil.create('div', 'leaflet-pelias-message', resultsContainer);

      // Set text. This is the most cross-browser compatible method
      // and avoids the issues we have detecting either innerText vs textContent
      // (e.g. Firefox cannot detect textContent property on elements, but it's there)
      messageEl.appendChild(document.createTextNode(text));
    },

    removeMarkers: function () {
      if (this.options.markers) {
        for (var i = 0; i < this.markers.length; i++) {
          this._map.removeLayer(this.markers[i]);
        }
        this.markers = [];
      }
    },

    showMarker: function (text, latlng) {
      this._map.setView(latlng, this._map.getZoom() || 8);

      var markerOptions = (typeof this.options.markers === 'object') ? this.options.markers : {};

      if (this.options.markers) {
        var marker = new L.marker(latlng, markerOptions).bindPopup(text); // eslint-disable-line new-cap
        this._map.addLayer(marker);
        this.markers.push(marker);
        marker.openPopup();
      }
    },

    /**
     * Fits the map view to a given bounding box.
     * Mapzen Search / Pelias returns the 'bbox' property on 'feature'. It is
     * as an array of four numbers:
     *   [
     *     0: southwest longitude,
     *     1: southwest latitude,
     *     2: northeast longitude,
     *     3: northeast latitude
     *   ]
     * This method expects the array to be passed directly and it will be converted
     * to a boundary parameter for Leaflet's fitBounds().
     */
    fitBoundingBox: function (bbox) {
      this._map.fitBounds([
        [ bbox[1], bbox[0] ],
        [ bbox[3], bbox[2] ]
      ], {
        animate: true,
        maxZoom: 16
      });
    },

    setSelectedResult: function (selected, originalEvent) {
      var latlng = L.GeoJSON.coordsToLatLng(selected.feature.geometry.coordinates);
      this._input.value = selected.innerText || selected.textContent;
      if (selected.feature.bbox) {
        this.removeMarkers();
        this.fitBoundingBox(selected.feature.bbox);
      } else {
        this.removeMarkers();
        this.showMarker(selected.innerHTML, latlng);
      }
      this.fire('select', {
        originalEvent: originalEvent,
        latlng: latlng,
        feature: selected.feature
      });
      this.blur();

      if (this.options.place) {
        this.place(selected.feature.properties.gid);
      }
    },

    /**
     * Convenience function for focusing on the input
     * A `focus` event is fired, but it is not fired here. An event listener
     * was added to the _input element to forward the native `focus` event.
     *
     * @public
     */
    focus: function () {
      // If not expanded, expand this first
      if (!L.DomUtil.hasClass(this._container, 'leaflet-pelias-expanded')) {
        this.expand();
      }
      this._input.focus();
    },

    /**
     * Removes focus from geocoder control
     * A `blur` event is fired, but it is not fired here. An event listener
     * was added on the _input element to forward the native `blur` event.
     *
     * @public
     */
    blur: function () {
      this._input.blur();
      this.clearResults();
      if (this._input.value === '' && this._results.style.display !== 'none') {
        L.DomUtil.addClass(this._reset, 'leaflet-pelias-hidden');
        if (!this.options.expanded) {
          this.collapse();
        }
      }
    },

    clearResults: function (force) {
      // Hide results from view
      this._results.style.display = 'none';

      // Destroy contents if input has also cleared
      // OR if force is true
      if (this._input.value === '' || force === true) {
        this._results.innerHTML = '';
      }
    },

    expand: function () {
      L.DomUtil.addClass(this._container, 'leaflet-pelias-expanded');
      this.setFullWidth();
      this.fire('expand');
    },

    collapse: function () {
      // 'expanded' options check happens outside of this function now
      // So it's now possible for a script to force-collapse a geocoder
      // that otherwise defaults to the always-expanded state
      L.DomUtil.removeClass(this._container, 'leaflet-pelias-expanded');
      this._input.blur();
      this.clearFullWidth();
      this.clearResults();
      this.fire('collapse');
    },

    // Set full width of expanded input, if enabled
    setFullWidth: function () {
      if (this.options.fullWidth) {
        // If fullWidth setting is a number, only expand if map container
        // is smaller than that breakpoint. Otherwise, clear width
        // Always ask map to invalidate and recalculate size first
        this._map.invalidateSize();
        var mapWidth = this._map.getSize().x;
        var touchAdjustment = L.Browser.touch ? FULL_WIDTH_TOUCH_ADJUSTED_MARGIN : 0;
        var width = mapWidth - FULL_WIDTH_MARGIN - touchAdjustment;
        if (typeof this.options.fullWidth === 'number' && mapWidth >= window.parseInt(this.options.fullWidth, 10)) {
          this.clearFullWidth();
          return;
        }
        this._container.style.width = width.toString() + 'px';
      }
    },

    clearFullWidth: function () {
      // Clear set width, if any
      if (this.options.fullWidth) {
        this._container.style.width = '';
      }
    },

    onAdd: function (map) {
      var container = L.DomUtil.create('div',
          'leaflet-pelias-control leaflet-bar leaflet-control');

      this._body = document.body || document.getElementsByTagName('body')[0];
      this._container = container;
      this._input = L.DomUtil.create('input', 'leaflet-pelias-input', this._container);
      this._input.spellcheck = false;

      // Forwards focus and blur events from input to geocoder
      L.DomEvent.addListener(this._input, 'focus', function (e) {
        this.fire('focus', { originalEvent: e });
      }, this);

      L.DomEvent.addListener(this._input, 'blur', function (e) {
        this.fire('blur', { originalEvent: e });
      }, this);

      // Only set if title option is not null or falsy
      if (this.options.title) {
        this._input.title = this.options.title;
      }

      // Only set if placeholder option is not null or falsy
      if (this.options.placeholder) {
        this._input.placeholder = this.options.placeholder;
      }

      this._search = L.DomUtil.create('a', 'leaflet-pelias-search-icon', this._container);
      this._reset = L.DomUtil.create('div', 'leaflet-pelias-close leaflet-pelias-hidden', this._container);
      this._reset.innerHTML = '×';
      this._reset.title = 'Reset';

      this._results = L.DomUtil.create('div', 'leaflet-pelias-results leaflet-bar', this._container);

      if (this.options.expanded) {
        this.expand();
      }

      L.DomEvent
        .on(this._container, 'click', function (e) {
          // Child elements with 'click' listeners should call
          // stopPropagation() to prevent that event from bubbling to
          // the container & causing it to fire too greedily
          this._input.focus();
        }, this)
        .on(this._input, 'focus', function (e) {
          if (this._input.value && this._results.children.length) {
            this._results.style.display = 'block';
          }
        }, this)
        .on(this._map, 'click', function (e) {
          // Does what you might expect a _input.blur() listener might do,
          // but since that would fire for any reason (e.g. clicking a result)
          // what you really want is to blur from the control by listening to clicks on the map
          this.blur();
        }, this)
        .on(this._search, 'click', function (e) {
          L.DomEvent.stopPropagation(e);

          // Toggles expanded state of container on click of search icon
          if (L.DomUtil.hasClass(this._container, 'leaflet-pelias-expanded')) {
            // If expanded option is true, just focus the input
            if (this.options.expanded === true) {
              this._input.focus();
              return;
            } else {
              // Otherwise, toggle to hidden state
              L.DomUtil.addClass(this._reset, 'leaflet-pelias-hidden');
              this.collapse();
            }
          } else {
            // If not currently expanded, clicking here always expands it
            if (this._input.value.length > 0) {
              L.DomUtil.removeClass(this._reset, 'leaflet-pelias-hidden');
            }
            this.expand();
            this._input.focus();
          }
        }, this)
        .on(this._reset, 'click', function (e) {
          this.reset();
          this._input.focus();
          L.DomEvent.stopPropagation(e);
        }, this)
        .on(this._input, 'keydown', function (e) {
          var list = this._results.querySelectorAll('.leaflet-pelias-result');
          var selected = this._results.querySelectorAll('.leaflet-pelias-selected')[0];
          var selectedPosition;
          var self = this;
          var panToPoint = function (shouldPan) {
            var _selected = self._results.querySelectorAll('.leaflet-pelias-selected')[0];
            if (_selected && shouldPan) {
              if (_selected.feature.bbox) {
                self.removeMarkers();
                self.fitBoundingBox(_selected.feature.bbox);
              } else {
                self.removeMarkers();
                self.showMarker(_selected.innerHTML, L.GeoJSON.coordsToLatLng(_selected.feature.geometry.coordinates));
              }
            }
          };

          var scrollSelectedResultIntoView = function () {
            var _selected = self._results.querySelectorAll('.leaflet-pelias-selected')[0];
            var _selectedRect = _selected.getBoundingClientRect();
            var _resultsRect = self._results.getBoundingClientRect();
            // Is the selected element not visible?
            if (_selectedRect.bottom > _resultsRect.bottom) {
              self._results.scrollTop = _selected.offsetTop + _selected.offsetHeight - self._results.offsetHeight;
            } else if (_selectedRect.top < _resultsRect.top) {
              self._results.scrollTop = _selected.offsetTop;
            }
          };

          for (var i = 0; i < list.length; i++) {
            if (list[i] === selected) {
              selectedPosition = i;
              break;
            }
          }

          // TODO cleanup
          switch (e.keyCode) {
            // 13 = enter
            case 13:
              if (selected) {
                this.setSelectedResult(selected, e);
              } else {
                // perform a full text search on enter
                var text = (e.target || e.srcElement).value;
                this.search(text);
              }
              L.DomEvent.preventDefault(e);
              break;
            // 38 = up arrow
            case 38:
              // Ignore key if there are no results or if list is not visible
              if (list.length === 0 || this._results.style.display === 'none') {
                return;
              }

              if (selected) {
                L.DomUtil.removeClass(selected, 'leaflet-pelias-selected');
              }

              var previousItem = list[selectedPosition - 1];
              var highlighted = (selected && previousItem) ? previousItem : list[list.length - 1]; // eslint-disable-line no-redeclare

              L.DomUtil.addClass(highlighted, 'leaflet-pelias-selected');
              scrollSelectedResultIntoView();
              panToPoint(this.options.panToPoint);
              this.fire('highlight', {
                originalEvent: e,
                latlng: L.GeoJSON.coordsToLatLng(highlighted.feature.geometry.coordinates),
                feature: highlighted.feature
              });

              L.DomEvent.preventDefault(e);
              break;
            // 40 = down arrow
            case 40:
              // Ignore key if there are no results or if list is not visible
              if (list.length === 0 || this._results.style.display === 'none') {
                return;
              }

              if (selected) {
                L.DomUtil.removeClass(selected, 'leaflet-pelias-selected');
              }

              var nextItem = list[selectedPosition + 1];
              var highlighted = (selected && nextItem) ? nextItem : list[0]; // eslint-disable-line no-redeclare

              L.DomUtil.addClass(highlighted, 'leaflet-pelias-selected');
              scrollSelectedResultIntoView();
              panToPoint(this.options.panToPoint);
              this.fire('highlight', {
                originalEvent: e,
                latlng: L.GeoJSON.coordsToLatLng(highlighted.feature.geometry.coordinates),
                feature: highlighted.feature
              });

              L.DomEvent.preventDefault(e);
              break;
            // all other keys
            default:
              break;
          }
        }, this)
        .on(this._input, 'keyup', function (e) {
          var key = e.which || e.keyCode;
          var text = (e.target || e.srcElement).value;

          if (text.length > 0) {
            L.DomUtil.removeClass(this._reset, 'leaflet-pelias-hidden');
          } else {
            L.DomUtil.addClass(this._reset, 'leaflet-pelias-hidden');
          }

          // Ignore all further action if the keycode matches an arrow
          // key (handled via keydown event)
          if (key === 13 || key === 38 || key === 40) {
            return;
          }

          // keyCode 27 = esc key (esc should clear results)
          if (key === 27) {
            // If input is blank or results have already been cleared
            // (perhaps due to a previous 'esc') then pressing esc at
            // this point will blur from input as well.
            if (text.length === 0 || this._results.style.display === 'none') {
              this._input.blur();

              if (!this.options.expanded && L.DomUtil.hasClass(this._container, 'leaflet-pelias-expanded')) {
                this.collapse();
              }
            }

            // Clears results
            this.clearResults(true);
            L.DomUtil.removeClass(this._search, 'leaflet-pelias-loading');
            return;
          }

          if (text !== this._lastValue) {
            this._lastValue = text;

            if (text.length >= MINIMUM_INPUT_LENGTH_FOR_AUTOCOMPLETE && this.options.autocomplete === true) {
              this.autocomplete(text);
            } else {
              this.clearResults(true);
            }
          }
        }, this)
        .on(this._results, 'click', function (e) {
          L.DomEvent.preventDefault(e);
          L.DomEvent.stopPropagation(e);

          var _selected = this._results.querySelectorAll('.leaflet-pelias-selected')[0];
          if (_selected) {
            L.DomUtil.removeClass(_selected, 'leaflet-pelias-selected');
          }

          var selected = e.target || e.srcElement; /* IE8 */
          var findParent = function () {
            if (!L.DomUtil.hasClass(selected, 'leaflet-pelias-result')) {
              selected = selected.parentElement;
              if (selected) {
                findParent();
              }
            }
            return selected;
          };

          // click event can be registered on the child nodes
          // that does not have the required coords prop
          // so its important to find the parent.
          findParent();

          // If nothing is selected, (e.g. it's a message, not a result),
          // do nothing.
          if (selected) {
            L.DomUtil.addClass(selected, 'leaflet-pelias-selected');
            this.setSelectedResult(selected, e);
          }
        }, this)
        .on(this._results, 'mouseover', function (e) {
          // Prevent scrolling over results list from zooming the map, if enabled
          this._scrollWheelZoomEnabled = map.scrollWheelZoom.enabled();
          if (this._scrollWheelZoomEnabled) {
            map.scrollWheelZoom.disable();
          }
        }, this)
        .on(this._results, 'mouseout', function (e) {
          // Re-enable scroll wheel zoom (if previously enabled) after
          // leaving the results box
          if (this._scrollWheelZoomEnabled) {
            map.scrollWheelZoom.enable();
          }
        }, this);

      // Recalculate width of the input bar when window resizes
      if (this.options.fullWidth) {
        L.DomEvent.on(window, 'resize', function (e) {
          if (L.DomUtil.hasClass(this._container, 'leaflet-pelias-expanded')) {
            this.setFullWidth();
          }
        }, this);
      }

      L.DomEvent.on(this._map, 'mousedown', this._onMapInteraction, this);
      L.DomEvent.on(this._map, 'touchstart', this._onMapInteraction, this);

      L.DomEvent.disableClickPropagation(this._container);
      if (map.attributionControl) {
        map.attributionControl.addAttribution(this.options.attribution);
      }
      return container;
    },

    _onMapInteraction: function (event) {
      this.blur();

      // Only collapse if the input is clear, and is currently expanded.
      // Disabled if expanded is set to true
      if (!this.options.expanded) {
        if (!this._input.value && L.DomUtil.hasClass(this._container, 'leaflet-pelias-expanded')) {
          this.collapse();
        }
      }
    },

    onRemove: function (map) {
      map.attributionControl.removeAttribution(this.options.attribution);
    }
  });

  L.control.geocoder = function (apiKey, options) {
    return new L.Control.Geocoder(apiKey, options);
  };

  /*
   * AJAX Utility function (implements basic HTTP get)
   */
  var AJAX = {
    serialize: function (params) {
      var data = '';

      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          var param = params[key];
          var type = param.toString();
          var value;

          if (data.length) {
            data += '&';
          }

          switch (type) {
            case '[object Array]':
              value = (param[0].toString() === '[object Object]') ? JSON.stringify(param) : param.join(',');
              break;
            case '[object Object]':
              value = JSON.stringify(param);
              break;
            case '[object Date]':
              value = param.valueOf();
              break;
            default:
              value = param;
              break;
          }

          data += encodeURIComponent(key) + '=' + encodeURIComponent(value);
        }
      }

      return data;
    },
    http_request: function (callback, context) {
      if (window.XDomainRequest) {
        return this.xdr(callback, context);
      } else {
        return this.xhr(callback, context);
      }
    },
    xhr: function (callback, context) {
      var xhr = new XMLHttpRequest();

      xhr.onerror = function (e) {
        xhr.onreadystatechange = L.Util.falseFn;
        var error = {
          code: xhr.status,
          message: xhr.statusText
        };

        callback.call(context, error, null);
      };

      xhr.onreadystatechange = function () {
        var response;
        var error;

        try {
          response = JSON.parse(xhr.responseText);
        } catch (e) {
          response = null;
          error = {
            code: 500,
            message: 'Parse Error'
          };
        }

        if (xhr.readyState === 4) {
          // Handle all non-200 responses first
          if (xhr.status !== 200) {
            error = {
              code: xhr.status,
              message: xhr.statusText
            };
            callback.call(context, error, response);
          } else {
            if (!error && response.error) {
              error = response.error;
            }

            xhr.onerror = L.Util.falseFn;

            callback.call(context, error, response);
          }
        }
      };

      return xhr;
    },
    xdr: function (callback, context) {
      var xdr = new window.XDomainRequest();

      xdr.onerror = function (e) {
        xdr.onload = L.Util.falseFn;

        // XDRs have no access to actual status codes
        var error = {
          code: 500,
          message: 'XMLHttpRequest Error'
        };
        callback.call(context, error, null);
      };

      // XDRs have .onload instead of .onreadystatechange
      xdr.onload = function () {
        var response;
        var error;

        try {
          response = JSON.parse(xdr.responseText);
        } catch (e) {
          response = null;
          error = {
            code: 500,
            message: 'Parse Error'
          };
        }

        if (!error && response.error) {
          error = response.error;
          response = null;
        }

        xdr.onerror = L.Util.falseFn;
        callback.call(context, error, response);
      };

      return xdr;
    },
    request: function (url, params, callback, context) {
      var paramString = this.serialize(params);
      var httpRequest = this.http_request(callback, context);

      httpRequest.open('GET', url + '?' + paramString);
      if (httpRequest.constructor.name === 'XMLHttpRequest') {
        httpRequest.setRequestHeader('Accept', 'application/json');
      }

      setTimeout(function () {
        httpRequest.send(null);
      }, 0);
    }
  };

  /*
   * throttle Utility function (borrowed from underscore)
   */
  function throttle (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function () {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function () {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

  /*
   * escaping a string for regex Utility function
   * from https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
   */
  function escapeRegExp (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }
}));
