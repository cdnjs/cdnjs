this.L = this.L || {};
this.L.Control = this.L.Control || {};
this.L.Control.Geocoder = (function (L) {
'use strict';

L = L && L.hasOwnProperty('default') ? L['default'] : L;

var lastCallbackId = 0;

// Adapted from handlebars.js
// https://github.com/wycats/handlebars.js/
var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};

function escapeChar(chr) {
  return escape[chr];
}

function htmlEscape(string) {
  if (string == null) {
    return '';
  } else if (!string) {
    return string + '';
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = '' + string;

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function jsonp(url, params, callback, context, jsonpParam) {
  var callbackId = '_l_geocoder_' + lastCallbackId++;
  params[jsonpParam || 'callback'] = callbackId;
  window[callbackId] = L.Util.bind(callback, context);
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url + L.Util.getParamString(params);
  script.id = callbackId;
  document.getElementsByTagName('head')[0].appendChild(script);
}

function getJSON(url, params, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState !== 4) {
      return;
    }
    if (xmlHttp.status !== 200 && xmlHttp.status !== 304) {
      callback('');
      return;
    }
    callback(JSON.parse(xmlHttp.response));
  };
  xmlHttp.open('GET', url + L.Util.getParamString(params), true);
  xmlHttp.setRequestHeader('Accept', 'application/json');
  xmlHttp.send(null);
}

function template(str, data) {
  return str.replace(/\{ *([\w_]+) *\}/g, function(str, key) {
    var value = data[key];
    if (value === undefined) {
      value = '';
    } else if (typeof value === 'function') {
      value = value(data);
    }
    return htmlEscape(value);
  });
}

var Nominatim = {
  class: L.Class.extend({
    options: {
      serviceUrl: 'https://nominatim.openstreetmap.org/',
      geocodingQueryParams: {},
      reverseQueryParams: {},
      htmlTemplate: function(r) {
        var a = r.address,
          parts = [];
        if (a.road || a.building) {
          parts.push('{building} {road} {house_number}');
        }

        if (a.city || a.town || a.village || a.hamlet) {
          parts.push(
            '<span class="' +
              (parts.length > 0 ? 'leaflet-control-geocoder-address-detail' : '') +
              '">{postcode} {city} {town} {village} {hamlet}</span>'
          );
        }

        if (a.state || a.country) {
          parts.push(
            '<span class="' +
              (parts.length > 0 ? 'leaflet-control-geocoder-address-context' : '') +
              '">{state} {country}</span>'
          );
        }

        return template(parts.join('<br/>'), a, true);
      }
    },

    initialize: function(options) {
      L.Util.setOptions(this, options);
    },

    geocode: function(query, cb, context) {
      getJSON(
        this.options.serviceUrl + 'search',
        L.extend(
          {
            q: query,
            limit: 5,
            format: 'json',
            addressdetails: 1
          },
          this.options.geocodingQueryParams
        ),
        L.bind(function(data) {
          var results = [];
          for (var i = data.length - 1; i >= 0; i--) {
            var bbox = data[i].boundingbox;
            for (var j = 0; j < 4; j++) bbox[j] = parseFloat(bbox[j]);
            results[i] = {
              icon: data[i].icon,
              name: data[i].display_name,
              html: this.options.htmlTemplate ? this.options.htmlTemplate(data[i]) : undefined,
              bbox: L.latLngBounds([bbox[0], bbox[2]], [bbox[1], bbox[3]]),
              center: L.latLng(data[i].lat, data[i].lon),
              properties: data[i]
            };
          }
          cb.call(context, results);
        }, this)
      );
    },

    reverse: function(location, scale, cb, context) {
      getJSON(
        this.options.serviceUrl + 'reverse',
        L.extend(
          {
            lat: location.lat,
            lon: location.lng,
            zoom: Math.round(Math.log(scale / 256) / Math.log(2)),
            addressdetails: 1,
            format: 'json'
          },
          this.options.reverseQueryParams
        ),
        L.bind(function(data) {
          var result = [],
            loc;

          if (data && data.lat && data.lon) {
            loc = L.latLng(data.lat, data.lon);
            result.push({
              name: data.display_name,
              html: this.options.htmlTemplate ? this.options.htmlTemplate(data) : undefined,
              center: loc,
              bounds: L.latLngBounds(loc, loc),
              properties: data
            });
          }

          cb.call(context, result);
        }, this)
      );
    }
  }),

  factory: function(options) {
    return new L.Control.Geocoder.Nominatim(options);
  }
};

var Control = {
  class: L.Control.extend({
    options: {
      showResultIcons: false,
      collapsed: true,
      expand: 'touch', // options: touch, click, anythingelse
      position: 'topright',
      placeholder: 'Search...',
      errorMessage: 'Nothing found.',
      suggestMinLength: 3,
      suggestTimeout: 250,
      defaultMarkGeocode: true
    },

    includes: L.Evented.prototype || L.Mixin.Events,

    initialize: function(options) {
      L.Util.setOptions(this, options);
      if (!this.options.geocoder) {
        this.options.geocoder = new Nominatim.class();
      }

      this._requestCount = 0;
    },

    onAdd: function(map) {
      var className = 'leaflet-control-geocoder',
        container = L.DomUtil.create('div', className + ' leaflet-bar'),
        icon = L.DomUtil.create('button', className + '-icon', container),
        form = (this._form = L.DomUtil.create('div', className + '-form', container)),
        input;

      this._map = map;
      this._container = container;

      icon.innerHTML = '&nbsp;';
      icon.type = 'button';

      input = this._input = L.DomUtil.create('input', '', form);
      input.type = 'text';
      input.placeholder = this.options.placeholder;

      this._errorElement = L.DomUtil.create('div', className + '-form-no-error', container);
      this._errorElement.innerHTML = this.options.errorMessage;

      this._alts = L.DomUtil.create(
        'ul',
        className + '-alternatives leaflet-control-geocoder-alternatives-minimized',
        container
      );
      L.DomEvent.disableClickPropagation(this._alts);

      L.DomEvent.addListener(input, 'keydown', this._keydown, this);
      if (this.options.geocoder.suggest) {
        L.DomEvent.addListener(input, 'input', this._change, this);
      }
      L.DomEvent.addListener(
        input,
        'blur',
        function() {
          if (this.options.collapsed && !this._preventBlurCollapse) {
            this._collapse();
          }
          this._preventBlurCollapse = false;
        },
        this
      );

      if (this.options.collapsed) {
        if (this.options.expand === 'click') {
          L.DomEvent.addListener(
            container,
            'click',
            function(e) {
              if (e.button === 0 && e.detail !== 2) {
                this._toggle();
              }
            },
            this
          );
        } else if (L.Browser.touch && this.options.expand === 'touch') {
          L.DomEvent.addListener(
            container,
            'touchstart mousedown',
            function(e) {
              this._toggle();
              e.preventDefault(); // mobile: clicking focuses the icon, so UI expands and immediately collapses
              e.stopPropagation();
            },
            this
          );
        } else {
          L.DomEvent.addListener(container, 'mouseover', this._expand, this);
          L.DomEvent.addListener(container, 'mouseout', this._collapse, this);
          this._map.on('movestart', this._collapse, this);
        }
      } else {
        this._expand();
        if (L.Browser.touch) {
          L.DomEvent.addListener(
            container,
            'touchstart',
            function() {
              this._geocode();
            },
            this
          );
        } else {
          L.DomEvent.addListener(
            container,
            'click',
            function() {
              this._geocode();
            },
            this
          );
        }
      }

      if (this.options.defaultMarkGeocode) {
        this.on('markgeocode', this.markGeocode, this);
      }

      this.on(
        'startgeocode',
        function() {
          L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-throbber');
        },
        this
      );
      this.on(
        'finishgeocode',
        function() {
          L.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-throbber');
        },
        this
      );

      L.DomEvent.disableClickPropagation(container);

      return container;
    },

    _geocodeResult: function(results, suggest) {
      if (!suggest && results.length === 1) {
        this._geocodeResultSelected(results[0]);
      } else if (results.length > 0) {
        this._alts.innerHTML = '';
        this._results = results;
        L.DomUtil.removeClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
        for (var i = 0; i < results.length; i++) {
          this._alts.appendChild(this._createAlt(results[i], i));
        }
      } else {
        L.DomUtil.addClass(this._errorElement, 'leaflet-control-geocoder-error');
      }
    },

    markGeocode: function(result) {
      result = result.geocode || result;

      this._map.fitBounds(result.bbox);

      if (this._geocodeMarker) {
        this._map.removeLayer(this._geocodeMarker);
      }

      this._geocodeMarker = new L.Marker(result.center)
        .bindPopup(result.html || result.name)
        .addTo(this._map)
        .openPopup();

      return this;
    },

    _geocode: function(suggest) {
      var requestCount = ++this._requestCount,
        mode = suggest ? 'suggest' : 'geocode',
        eventData = { input: this._input.value };

      this._lastGeocode = this._input.value;
      if (!suggest) {
        this._clearResults();
      }

      this.fire('start' + mode, eventData);
      this.options.geocoder[mode](
        this._input.value,
        function(results) {
          if (requestCount === this._requestCount) {
            eventData.results = results;
            this.fire('finish' + mode, eventData);
            this._geocodeResult(results, suggest);
          }
        },
        this
      );
    },

    _geocodeResultSelected: function(result) {
      this.fire('markgeocode', { geocode: result });
    },

    _toggle: function() {
      if (L.DomUtil.hasClass(this._container, 'leaflet-control-geocoder-expanded')) {
        this._collapse();
      } else {
        this._expand();
      }
    },

    _expand: function() {
      L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-expanded');
      this._input.select();
      this.fire('expand');
    },

    _collapse: function() {
      L.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-expanded');
      L.DomUtil.addClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
      L.DomUtil.removeClass(this._errorElement, 'leaflet-control-geocoder-error');
      this._input.blur(); // mobile: keyboard shouldn't stay expanded
      this.fire('collapse');
    },

    _clearResults: function() {
      L.DomUtil.addClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
      this._selection = null;
      L.DomUtil.removeClass(this._errorElement, 'leaflet-control-geocoder-error');
    },

    _createAlt: function(result, index) {
      var li = L.DomUtil.create('li', ''),
        a = L.DomUtil.create('a', '', li),
        icon = this.options.showResultIcons && result.icon ? L.DomUtil.create('img', '', a) : null,
        text = result.html ? undefined : document.createTextNode(result.name),
        mouseDownHandler = function mouseDownHandler(e) {
          // In some browsers, a click will fire on the map if the control is
          // collapsed directly after mousedown. To work around this, we
          // wait until the click is completed, and _then_ collapse the
          // control. Messy, but this is the workaround I could come up with
          // for #142.
          this._preventBlurCollapse = true;
          L.DomEvent.stop(e);
          this._geocodeResultSelected(result);
          L.DomEvent.on(
            li,
            'click',
            function() {
              if (this.options.collapsed) {
                this._collapse();
              } else {
                this._clearResults();
              }
            },
            this
          );
        };

      if (icon) {
        icon.src = result.icon;
      }

      li.setAttribute('data-result-index', index);

      if (result.html) {
        a.innerHTML = a.innerHTML + result.html;
      } else {
        a.appendChild(text);
      }

      // Use mousedown and not click, since click will fire _after_ blur,
      // causing the control to have collapsed and removed the items
      // before the click can fire.
      L.DomEvent.addListener(li, 'mousedown touchstart', mouseDownHandler, this);

      return li;
    },

    _keydown: function(e) {
      var _this = this,
        select = function select(dir) {
          if (_this._selection) {
            L.DomUtil.removeClass(_this._selection, 'leaflet-control-geocoder-selected');
            _this._selection = _this._selection[dir > 0 ? 'nextSibling' : 'previousSibling'];
          }
          if (!_this._selection) {
            _this._selection = _this._alts[dir > 0 ? 'firstChild' : 'lastChild'];
          }

          if (_this._selection) {
            L.DomUtil.addClass(_this._selection, 'leaflet-control-geocoder-selected');
          }
        };

      switch (e.keyCode) {
        // Escape
        case 27:
          if (this.options.collapsed) {
            this._collapse();
          }
          break;
        // Up
        case 38:
          select(-1);
          break;
        // Up
        case 40:
          select(1);
          break;
        // Enter
        case 13:
          if (this._selection) {
            var index = parseInt(this._selection.getAttribute('data-result-index'), 10);
            this._geocodeResultSelected(this._results[index]);
            this._clearResults();
          } else {
            this._geocode();
          }
          break;
      }
    },
    _change: function() {
      var v = this._input.value;
      if (v !== this._lastGeocode) {
        clearTimeout(this._suggestTimeout);
        if (v.length >= this.options.suggestMinLength) {
          this._suggestTimeout = setTimeout(
            L.bind(function() {
              this._geocode(true);
            }, this),
            this.options.suggestTimeout
          );
        } else {
          this._clearResults();
        }
      }
    }
  }),
  factory: function(options) {
    return new L.Control.Geocoder(options);
  }
};

var Bing = {
  class: L.Class.extend({
    initialize: function(key) {
      this.key = key;
    },

    geocode: function(query, cb, context) {
      jsonp(
        'https://dev.virtualearth.net/REST/v1/Locations',
        {
          query: query,
          key: this.key
        },
        function(data) {
          var results = [];
          if (data.resourceSets.length > 0) {
            for (var i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
              var resource = data.resourceSets[0].resources[i],
                bbox = resource.bbox;
              results[i] = {
                name: resource.name,
                bbox: L.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
                center: L.latLng(resource.point.coordinates)
              };
            }
          }
          cb.call(context, results);
        },
        this,
        'jsonp'
      );
    },

    reverse: function(location, scale, cb, context) {
      jsonp(
        '//dev.virtualearth.net/REST/v1/Locations/' + location.lat + ',' + location.lng,
        {
          key: this.key
        },
        function(data) {
          var results = [];
          for (var i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
            var resource = data.resourceSets[0].resources[i],
              bbox = resource.bbox;
            results[i] = {
              name: resource.name,
              bbox: L.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
              center: L.latLng(resource.point.coordinates)
            };
          }
          cb.call(context, results);
        },
        this,
        'jsonp'
      );
    }
  }),

  factory: function(key) {
    return new L.Control.Geocoder.Bing(key);
  }
};

var MapQuest = {
  class: L.Class.extend({
    options: {
      serviceUrl: 'https://www.mapquestapi.com/geocoding/v1'
    },

    initialize: function(key, options) {
      // MapQuest seems to provide URI encoded API keys,
      // so to avoid encoding them twice, we decode them here
      this._key = decodeURIComponent(key);

      L.Util.setOptions(this, options);
    },

    _formatName: function() {
      var r = [],
        i;
      for (i = 0; i < arguments.length; i++) {
        if (arguments[i]) {
          r.push(arguments[i]);
        }
      }

      return r.join(', ');
    },

    geocode: function(query, cb, context) {
      getJSON(
        this.options.serviceUrl + '/address',
        {
          key: this._key,
          location: query,
          limit: 5,
          outFormat: 'json'
        },
        L.bind(function(data) {
          var results = [],
            loc,
            latLng;
          if (data.results && data.results[0].locations) {
            for (var i = data.results[0].locations.length - 1; i >= 0; i--) {
              loc = data.results[0].locations[i];
              latLng = L.latLng(loc.latLng);
              results[i] = {
                name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
                bbox: L.latLngBounds(latLng, latLng),
                center: latLng
              };
            }
          }

          cb.call(context, results);
        }, this)
      );
    },

    reverse: function(location, scale, cb, context) {
      getJSON(
        this.options.serviceUrl + '/reverse',
        {
          key: this._key,
          location: location.lat + ',' + location.lng,
          outputFormat: 'json'
        },
        L.bind(function(data) {
          var results = [],
            loc,
            latLng;
          if (data.results && data.results[0].locations) {
            for (var i = data.results[0].locations.length - 1; i >= 0; i--) {
              loc = data.results[0].locations[i];
              latLng = L.latLng(loc.latLng);
              results[i] = {
                name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
                bbox: L.latLngBounds(latLng, latLng),
                center: latLng
              };
            }
          }

          cb.call(context, results);
        }, this)
      );
    }
  }),

  factory: function(key, options) {
    return new L.Control.Geocoder.MapQuest(key, options);
  }
};

var Mapbox = {
  class: L.Class.extend({
    options: {
      serviceUrl: 'https://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/',
      geocodingQueryParams: {},
      reverseQueryParams: {}
    },

    initialize: function(accessToken, options) {
      L.setOptions(this, options);
      this.options.geocodingQueryParams.access_token = accessToken;
      this.options.reverseQueryParams.access_token = accessToken;
    },

    geocode: function(query, cb, context) {
      var params = this.options.geocodingQueryParams;
      if (
        typeof params.proximity !== 'undefined' &&
        params.proximity.hasOwnProperty('lat') &&
        params.proximity.hasOwnProperty('lng')
      ) {
        params.proximity = params.proximity.lng + ',' + params.proximity.lat;
      }
      getJSON(this.options.serviceUrl + encodeURIComponent(query) + '.json', params, function(
        data
      ) {
        var results = [],
          loc,
          latLng,
          latLngBounds;
        if (data.features && data.features.length) {
          for (var i = 0; i <= data.features.length - 1; i++) {
            loc = data.features[i];
            latLng = L.latLng(loc.center.reverse());
            if (loc.hasOwnProperty('bbox')) {
              latLngBounds = L.latLngBounds(
                L.latLng(loc.bbox.slice(0, 2).reverse()),
                L.latLng(loc.bbox.slice(2, 4).reverse())
              );
            } else {
              latLngBounds = L.latLngBounds(latLng, latLng);
            }
            results[i] = {
              name: loc.place_name,
              bbox: latLngBounds,
              center: latLng
            };
          }
        }

        cb.call(context, results);
      });
    },

    suggest: function(query, cb, context) {
      return this.geocode(query, cb, context);
    },

    reverse: function(location, scale, cb, context) {
      getJSON(
        this.options.serviceUrl +
          encodeURIComponent(location.lng) +
          ',' +
          encodeURIComponent(location.lat) +
          '.json',
        this.options.reverseQueryParams,
        function(data) {
          var results = [],
            loc,
            latLng,
            latLngBounds;
          if (data.features && data.features.length) {
            for (var i = 0; i <= data.features.length - 1; i++) {
              loc = data.features[i];
              latLng = L.latLng(loc.center.reverse());
              if (loc.hasOwnProperty('bbox')) {
                latLngBounds = L.latLngBounds(
                  L.latLng(loc.bbox.slice(0, 2).reverse()),
                  L.latLng(loc.bbox.slice(2, 4).reverse())
                );
              } else {
                latLngBounds = L.latLngBounds(latLng, latLng);
              }
              results[i] = {
                name: loc.place_name,
                bbox: latLngBounds,
                center: latLng
              };
            }
          }

          cb.call(context, results);
        }
      );
    }
  }),

  factory: function(accessToken, options) {
    return new L.Control.Geocoder.Mapbox(accessToken, options);
  }
};

var What3Words = {
  class: L.Class.extend({
    options: {
      serviceUrl: 'https://api.what3words.com/v2/'
    },

    initialize: function(accessToken) {
      this._accessToken = accessToken;
    },

    geocode: function(query, cb, context) {
      //get three words and make a dot based string
      getJSON(
        this.options.serviceUrl + 'forward',
        {
          key: this._accessToken,
          addr: query.split(/\s+/).join('.')
        },
        function(data) {
          var results = [],
            latLng,
            latLngBounds;
          if (data.hasOwnProperty('geometry')) {
            latLng = L.latLng(data.geometry['lat'], data.geometry['lng']);
            latLngBounds = L.latLngBounds(latLng, latLng);
            results[0] = {
              name: data.words,
              bbox: latLngBounds,
              center: latLng
            };
          }

          cb.call(context, results);
        }
      );
    },

    suggest: function(query, cb, context) {
      return this.geocode(query, cb, context);
    },

    reverse: function(location, scale, cb, context) {
      getJSON(
        this.options.serviceUrl + 'reverse',
        {
          key: this._accessToken,
          coords: [location.lat, location.lng].join(',')
        },
        function(data) {
          var results = [],
            latLng,
            latLngBounds;
          if (data.status.status == 200) {
            latLng = L.latLng(data.geometry['lat'], data.geometry['lng']);
            latLngBounds = L.latLngBounds(latLng, latLng);
            results[0] = {
              name: data.words,
              bbox: latLngBounds,
              center: latLng
            };
          }
          cb.call(context, results);
        }
      );
    }
  }),

  factory: function(accessToken) {
    return new L.Control.Geocoder.What3Words(accessToken);
  }
};

var Google = {
  class: L.Class.extend({
    options: {
      serviceUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
      geocodingQueryParams: {},
      reverseQueryParams: {}
    },

    initialize: function(key, options) {
      this._key = key;
      L.setOptions(this, options);
      // Backwards compatibility
      this.options.serviceUrl = this.options.service_url || this.options.serviceUrl;
    },

    geocode: function(query, cb, context) {
      var params = {
        address: query
      };

      if (this._key && this._key.length) {
        params.key = this._key;
      }

      params = L.Util.extend(params, this.options.geocodingQueryParams);

      getJSON(this.options.serviceUrl, params, function(data) {
        var results = [],
          loc,
          latLng,
          latLngBounds;
        if (data.results && data.results.length) {
          for (var i = 0; i <= data.results.length - 1; i++) {
            loc = data.results[i];
            latLng = L.latLng(loc.geometry.location);
            latLngBounds = L.latLngBounds(
              L.latLng(loc.geometry.viewport.northeast),
              L.latLng(loc.geometry.viewport.southwest)
            );
            results[i] = {
              name: loc.formatted_address,
              bbox: latLngBounds,
              center: latLng,
              properties: loc.address_components
            };
          }
        }

        cb.call(context, results);
      });
    },

    reverse: function(location, scale, cb, context) {
      var params = {
        latlng: encodeURIComponent(location.lat) + ',' + encodeURIComponent(location.lng)
      };
      params = L.Util.extend(params, this.options.reverseQueryParams);
      if (this._key && this._key.length) {
        params.key = this._key;
      }

      getJSON(this.options.serviceUrl, params, function(data) {
        var results = [],
          loc,
          latLng,
          latLngBounds;
        if (data.results && data.results.length) {
          for (var i = 0; i <= data.results.length - 1; i++) {
            loc = data.results[i];
            latLng = L.latLng(loc.geometry.location);
            latLngBounds = L.latLngBounds(
              L.latLng(loc.geometry.viewport.northeast),
              L.latLng(loc.geometry.viewport.southwest)
            );
            results[i] = {
              name: loc.formatted_address,
              bbox: latLngBounds,
              center: latLng,
              properties: loc.address_components
            };
          }
        }

        cb.call(context, results);
      });
    }
  }),

  factory: function(key, options) {
    return new L.Control.Geocoder.Google(key, options);
  }
};

var Photon = {
  class: L.Class.extend({
    options: {
      serviceUrl: 'https://photon.komoot.de/api/',
      reverseUrl: 'https://photon.komoot.de/reverse/',
      nameProperties: ['name', 'street', 'suburb', 'hamlet', 'town', 'city', 'state', 'country']
    },

    initialize: function(options) {
      L.setOptions(this, options);
    },

    geocode: function(query, cb, context) {
      var params = L.extend(
        {
          q: query
        },
        this.options.geocodingQueryParams
      );

      getJSON(
        this.options.serviceUrl,
        params,
        L.bind(function(data) {
          cb.call(context, this._decodeFeatures(data));
        }, this)
      );
    },

    suggest: function(query, cb, context) {
      return this.geocode(query, cb, context);
    },

    reverse: function(latLng, scale, cb, context) {
      var params = L.extend(
        {
          lat: latLng.lat,
          lon: latLng.lng
        },
        this.options.reverseQueryParams
      );

      getJSON(
        this.options.reverseUrl,
        params,
        L.bind(function(data) {
          cb.call(context, this._decodeFeatures(data));
        }, this)
      );
    },

    _decodeFeatures: function(data) {
      var results = [],
        i,
        f,
        c,
        latLng,
        extent,
        bbox;

      if (data && data.features) {
        for (i = 0; i < data.features.length; i++) {
          f = data.features[i];
          c = f.geometry.coordinates;
          latLng = L.latLng(c[1], c[0]);
          extent = f.properties.extent;

          if (extent) {
            bbox = L.latLngBounds([extent[1], extent[0]], [extent[3], extent[2]]);
          } else {
            bbox = L.latLngBounds(latLng, latLng);
          }

          results.push({
            name: this._deocodeFeatureName(f),
            html: this.options.htmlTemplate ? this.options.htmlTemplate(f) : undefined,
            center: latLng,
            bbox: bbox,
            properties: f.properties
          });
        }
      }

      return results;
    },

    _deocodeFeatureName: function(f) {
      var j, name;
      for (j = 0; !name && j < this.options.nameProperties.length; j++) {
        name = f.properties[this.options.nameProperties[j]];
      }

      return name;
    }
  }),

  factory: function(options) {
    return new L.Control.Geocoder.Photon(options);
  }
};

var Mapzen = {
  class: L.Class.extend({
    options: {
      serviceUrl: 'https://search.mapzen.com/v1',
      geocodingQueryParams: {},
      reverseQueryParams: {}
    },

    initialize: function(apiKey, options) {
      L.Util.setOptions(this, options);
      this._apiKey = apiKey;
      this._lastSuggest = 0;
    },

    geocode: function(query, cb, context) {
      var _this = this;
      getJSON(
        this.options.serviceUrl + '/search',
        L.extend(
          {
            api_key: this._apiKey,
            text: query
          },
          this.options.geocodingQueryParams
        ),
        function(data) {
          cb.call(context, _this._parseResults(data, 'bbox'));
        }
      );
    },

    suggest: function(query, cb, context) {
      var _this = this;
      getJSON(
        this.options.serviceUrl + '/autocomplete',
        L.extend(
          {
            api_key: this._apiKey,
            text: query
          },
          this.options.geocodingQueryParams
        ),
        L.bind(function(data) {
          if (data.geocoding.timestamp > this._lastSuggest) {
            this._lastSuggest = data.geocoding.timestamp;
            cb.call(context, _this._parseResults(data, 'bbox'));
          }
        }, this)
      );
    },

    reverse: function(location, scale, cb, context) {
      var _this = this;
      getJSON(
        this.options.serviceUrl + '/reverse',
        L.extend(
          {
            api_key: this._apiKey,
            'point.lat': location.lat,
            'point.lon': location.lng
          },
          this.options.reverseQueryParams
        ),
        function(data) {
          cb.call(context, _this._parseResults(data, 'bounds'));
        }
      );
    },

    _parseResults: function(data, bboxname) {
      var results = [];
      L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng);
        },
        onEachFeature: function(feature, layer) {
          var result = {},
            bbox,
            center;

          if (layer.getBounds) {
            bbox = layer.getBounds();
            center = bbox.getCenter();
          } else {
            center = layer.getLatLng();
            bbox = L.latLngBounds(center, center);
          }

          result.name = layer.feature.properties.label;
          result.center = center;
          result[bboxname] = bbox;
          result.properties = layer.feature.properties;
          results.push(result);
        }
      });
      return results;
    }
  }),

  factory: function(apiKey, options) {
    return new L.Control.Geocoder.Mapzen(apiKey, options);
  }
};

var ArcGis = {
  class: L.Class.extend({
    options: {
      service_url: 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
    },

    initialize: function(accessToken, options) {
      L.setOptions(this, options);
      this._accessToken = accessToken;
    },

    geocode: function(query, cb, context) {
      var params = {
        SingleLine: query,
        outFields: 'Addr_Type',
        forStorage: false,
        maxLocations: 10,
        f: 'json'
      };

      if (this._key && this._key.length) {
        params.token = this._key;
      }

      getJSON(this.options.service_url + '/findAddressCandidates', params, function(data) {
        var results = [],
          loc,
          latLng,
          latLngBounds;

        if (data.candidates && data.candidates.length) {
          for (var i = 0; i <= data.candidates.length - 1; i++) {
            loc = data.candidates[i];
            latLng = L.latLng(loc.location.y, loc.location.x);
            latLngBounds = L.latLngBounds(
              L.latLng(loc.extent.ymax, loc.extent.xmax),
              L.latLng(loc.extent.ymin, loc.extent.xmin)
            );
            results[i] = {
              name: loc.address,
              bbox: latLngBounds,
              center: latLng
            };
          }
        }

        cb.call(context, results);
      });
    },

    suggest: function(query, cb, context) {
      return this.geocode(query, cb, context);
    },

    reverse: function(location, scale, cb, context) {
      var params = {
        location: encodeURIComponent(location.lng) + ',' + encodeURIComponent(location.lat),
        distance: 100,
        f: 'json'
      };

      getJSON(this.options.service_url + '/reverseGeocode', params, function(data) {
        var result = [],
          loc;

        if (data && !data.error) {
          loc = L.latLng(data.location.y, data.location.x);
          result.push({
            name: data.address.Match_addr,
            center: loc,
            bounds: L.latLngBounds(loc, loc)
          });
        }

        cb.call(context, result);
      });
    }
  }),

  factory: function(accessToken, options) {
    return new L.Control.Geocoder.ArcGis(accessToken, options);
  }
};

var HERE = {
  class: L.Class.extend({
    options: {
      geocodeUrl: 'http://geocoder.api.here.com/6.2/geocode.json',
      reverseGeocodeUrl: 'http://reverse.geocoder.api.here.com/6.2/reversegeocode.json',
      app_id: '<insert your app_id here>',
      app_code: '<insert your app_code here>',
      geocodingQueryParams: {},
      reverseQueryParams: {}
    },

    initialize: function(options) {
      L.setOptions(this, options);
    },

    geocode: function(query, cb, context) {
      var params = {
        searchtext: query,
        gen: 9,
        app_id: this.options.app_id,
        app_code: this.options.app_code,
        jsonattributes: 1
      };
      params = L.Util.extend(params, this.options.geocodingQueryParams);
      this.getJSON(this.options.geocodeUrl, params, cb, context);
    },

    reverse: function(location, scale, cb, context) {
      var params = {
        prox: encodeURIComponent(location.lat) + ',' + encodeURIComponent(location.lng),
        mode: 'retrieveAddresses',
        app_id: this.options.app_id,
        app_code: this.options.app_code,
        gen: 9,
        jsonattributes: 1
      };
      params = L.Util.extend(params, this.options.reverseQueryParams);
      this.getJSON(this.options.reverseGeocodeUrl, params, cb, context);
    },

    getJSON: function(url, params, cb, context) {
      getJSON(url, params, function(data) {
        var results = [],
          loc,
          latLng,
          latLngBounds;
        if (data.response.view && data.response.view.length) {
          for (var i = 0; i <= data.response.view[0].result.length - 1; i++) {
            loc = data.response.view[0].result[i].location;
            latLng = L.latLng(loc.displayPosition.latitude, loc.displayPosition.longitude);
            latLngBounds = L.latLngBounds(
              L.latLng(loc.mapView.topLeft.latitude, loc.mapView.topLeft.longitude),
              L.latLng(loc.mapView.bottomRight.latitude, loc.mapView.bottomRight.longitude)
            );
            results[i] = {
              name: loc.address.label,
              bbox: latLngBounds,
              center: latLng
            };
          }
        }
        cb.call(context, results);
      });
    }
  }),

  factory: function(options) {
    return new L.Control.Geocoder.HERE(options);
  }
};

var Geocoder = L.Util.extend(Control.class, {
  Nominatim: Nominatim.class,
  nominatim: Nominatim.factory,
  Bing: Bing.class,
  bing: Bing.factory,
  MapQuest: MapQuest.class,
  mapQuest: MapQuest.factory,
  Mapbox: Mapbox.class,
  mapbox: Mapbox.factory,
  What3Words: What3Words.class,
  what3words: What3Words.factory,
  Google: Google.class,
  google: Google.factory,
  Photon: Photon.class,
  photon: Photon.factory,
  Mapzen: Mapzen.class,
  mapzen: Mapzen.factory,
  ArcGis: ArcGis.class,
  arcgis: ArcGis.factory,
  HERE: HERE.class,
  here: HERE.factory
});

L.Util.extend(L.Control, {
  Geocoder: Geocoder,
  geocoder: Control.factory
});

return Geocoder;

}(L));
//# sourceMappingURL=Control.Geocoder.js.map
