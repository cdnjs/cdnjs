var leafletControlGeocoder = (function (exports, L) {

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return n;
  }

  var L__namespace = /*#__PURE__*/_interopNamespace(L);

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  /**
   * @internal
   */

  function geocodingParams(options, params) {
    return L__namespace.Util.extend(params, options.geocodingQueryParams);
  }
  /**
   * @internal
   */

  function reverseParams(options, params) {
    return L__namespace.Util.extend(params, options.reverseQueryParams);
  }

  /**
   * @internal
   */

  var lastCallbackId = 0; // Adapted from handlebars.js
  // https://github.com/wycats/handlebars.js/

  /**
   * @internal
   */

  var badChars = /[&<>"'`]/g;
  /**
   * @internal
   */

  var possible = /[&<>"'`]/;
  /**
   * @internal
   */

  var escape = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  /**
   * @internal
   */

  function escapeChar(chr) {
    return escape[chr];
  }
  /**
   * @internal
   */


  function htmlEscape(string) {
    if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    } // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.


    string = '' + string;

    if (!possible.test(string)) {
      return string;
    }

    return string.replace(badChars, escapeChar);
  }
  /**
   * @internal
   */

  function jsonp(url, params, callback, context, jsonpParam) {
    var callbackId = '_l_geocoder_' + lastCallbackId++;
    params[jsonpParam || 'callback'] = callbackId;
    window[callbackId] = L__namespace.Util.bind(callback, context);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url + getParamString(params);
    script.id = callbackId;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  /**
   * @internal
   */

  function getJSON(url, params, callback) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState !== 4) {
        return;
      }

      var message;

      if (xmlHttp.status !== 200 && xmlHttp.status !== 304) {
        message = '';
      } else if (typeof xmlHttp.response === 'string') {
        // IE doesn't parse JSON responses even with responseType: 'json'.
        try {
          message = JSON.parse(xmlHttp.response);
        } catch (e) {
          // Not a JSON response
          message = xmlHttp.response;
        }
      } else {
        message = xmlHttp.response;
      }

      callback(message);
    };

    xmlHttp.open('GET', url + getParamString(params), true);
    xmlHttp.responseType = 'json';
    xmlHttp.setRequestHeader('Accept', 'application/json');
    xmlHttp.send(null);
  }
  /**
   * @internal
   */

  function template(str, data) {
    return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
      var value = data[key];

      if (value === undefined) {
        value = '';
      } else if (typeof value === 'function') {
        value = value(data);
      }

      return htmlEscape(value);
    });
  }
  /**
   * @internal
   */

  function getParamString(obj, existingUrl, uppercase) {
    var params = [];

    for (var i in obj) {
      var key = encodeURIComponent(uppercase ? i.toUpperCase() : i);
      var value = obj[i];

      if (!Array.isArray(value)) {
        params.push(key + '=' + encodeURIComponent(String(value)));
      } else {
        for (var j = 0; j < value.length; j++) {
          params.push(key + '=' + encodeURIComponent(value[j]));
        }
      }
    }

    return (!existingUrl || existingUrl.indexOf('?') === -1 ? '?' : '&') + params.join('&');
  }

  /**
   * Implementation of the [ArcGIS geocoder](https://developers.arcgis.com/features/geocoding/)
   */

  var ArcGis = /*#__PURE__*/function () {
    function ArcGis(options) {
      this.options = {
        serviceUrl: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer',
        apiKey: ''
      };
      L__namespace.Util.setOptions(this, options);
    }

    var _proto = ArcGis.prototype;

    _proto.geocode = function geocode(query, cb, context) {
      var params = geocodingParams(this.options, {
        token: this.options.apiKey,
        SingleLine: query,
        outFields: 'Addr_Type',
        forStorage: false,
        maxLocations: 10,
        f: 'json'
      });
      getJSON(this.options.serviceUrl + '/findAddressCandidates', params, function (data) {
        var results = [];

        if (data.candidates && data.candidates.length) {
          for (var i = 0; i <= data.candidates.length - 1; i++) {
            var loc = data.candidates[i];
            var latLng = L__namespace.latLng(loc.location.y, loc.location.x);
            var latLngBounds = L__namespace.latLngBounds(L__namespace.latLng(loc.extent.ymax, loc.extent.xmax), L__namespace.latLng(loc.extent.ymin, loc.extent.xmin));
            results[i] = {
              name: loc.address,
              bbox: latLngBounds,
              center: latLng
            };
          }
        }

        cb.call(context, results);
      });
    };

    _proto.suggest = function suggest(query, cb, context) {
      return this.geocode(query, cb, context);
    };

    _proto.reverse = function reverse(location, scale, cb, context) {
      var params = reverseParams(this.options, {
        location: location.lng + ',' + location.lat,
        distance: 100,
        f: 'json'
      });
      getJSON(this.options.serviceUrl + '/reverseGeocode', params, function (data) {
        var result = [];

        if (data && !data.error) {
          var center = L__namespace.latLng(data.location.y, data.location.x);
          var bbox = L__namespace.latLngBounds(center, center);
          result.push({
            name: data.address.Match_addr,
            center: center,
            bbox: bbox
          });
        }

        cb.call(context, result);
      });
    };

    return ArcGis;
  }();
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link ArcGis}
   * @param options the options
   */

  function arcgis(options) {
    return new ArcGis(options);
  }

  /**
   * Implementation of the [Bing Locations API](https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/)
   */

  var Bing = /*#__PURE__*/function () {
    function Bing(options) {
      this.options = {
        serviceUrl: 'https://dev.virtualearth.net/REST/v1/Locations'
      };
      L__namespace.Util.setOptions(this, options);
    }

    var _proto = Bing.prototype;

    _proto.geocode = function geocode(query, cb, context) {
      var params = geocodingParams(this.options, {
        query: query,
        key: this.options.apiKey
      });
      jsonp(this.options.apiKey, params, function (data) {
        var results = [];

        if (data.resourceSets.length > 0) {
          for (var i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
            var resource = data.resourceSets[0].resources[i],
                bbox = resource.bbox;
            results[i] = {
              name: resource.name,
              bbox: L__namespace.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
              center: L__namespace.latLng(resource.point.coordinates)
            };
          }
        }

        cb.call(context, results);
      }, this, 'jsonp');
    };

    _proto.reverse = function reverse(location, scale, cb, context) {
      var params = reverseParams(this.options, {
        key: this.options.apiKey
      });
      jsonp(this.options.serviceUrl + location.lat + ',' + location.lng, params, function (data) {
        var results = [];

        for (var i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
          var resource = data.resourceSets[0].resources[i],
              bbox = resource.bbox;
          results[i] = {
            name: resource.name,
            bbox: L__namespace.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
            center: L__namespace.latLng(resource.point.coordinates)
          };
        }

        cb.call(context, results);
      }, this, 'jsonp');
    };

    return Bing;
  }();
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Bing}
   * @param options the options
   */

  function bing(options) {
    return new Bing(options);
  }

  var Google = /*#__PURE__*/function () {
    function Google(options) {
      this.options = {
        serviceUrl: 'https://maps.googleapis.com/maps/api/geocode/json'
      };
      L__namespace.Util.setOptions(this, options);
    }

    var _proto = Google.prototype;

    _proto.geocode = function geocode(query, cb, context) {
      var params = geocodingParams(this.options, {
        key: this.options.apiKey,
        address: query
      });
      getJSON(this.options.serviceUrl, params, function (data) {
        var results = [];

        if (data.results && data.results.length) {
          for (var i = 0; i <= data.results.length - 1; i++) {
            var loc = data.results[i];
            var latLng = L__namespace.latLng(loc.geometry.location);
            var latLngBounds = L__namespace.latLngBounds(L__namespace.latLng(loc.geometry.viewport.northeast), L__namespace.latLng(loc.geometry.viewport.southwest));
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
    };

    _proto.reverse = function reverse(location, scale, cb, context) {
      var params = reverseParams(this.options, {
        key: this.options.apiKey,
        latlng: location.lat + ',' + location.lng
      });
      getJSON(this.options.serviceUrl, params, function (data) {
        var results = [];

        if (data.results && data.results.length) {
          for (var i = 0; i <= data.results.length - 1; i++) {
            var loc = data.results[i];
            var center = L__namespace.latLng(loc.geometry.location);
            var bbox = L__namespace.latLngBounds(L__namespace.latLng(loc.geometry.viewport.northeast), L__namespace.latLng(loc.geometry.viewport.southwest));
            results[i] = {
              name: loc.formatted_address,
              bbox: bbox,
              center: center,
              properties: loc.address_components
            };
          }
        }

        cb.call(context, results);
      });
    };

    return Google;
  }();
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Google}
   * @param options the options
   */

  function google(options) {
    return new Google(options);
  }

  /**
   * Implementation of the [HERE Geocoder API](https://developer.here.com/documentation/geocoder/topics/introduction.html)
   */

  var HERE = /*#__PURE__*/function () {
    function HERE(options) {
      this.options = {
        serviceUrl: 'https://geocoder.api.here.com/6.2/',
        app_id: '',
        app_code: '',
        apiKey: '',
        maxResults: 5
      };
      L__namespace.Util.setOptions(this, options);
      if (options.apiKey) throw Error('apiKey is not supported, use app_id/app_code instead!');
    }

    var _proto = HERE.prototype;

    _proto.geocode = function geocode(query, cb, context) {
      var params = geocodingParams(this.options, {
        searchtext: query,
        gen: 9,
        app_id: this.options.app_id,
        app_code: this.options.app_code,
        jsonattributes: 1,
        maxresults: this.options.maxResults
      });
      this.getJSON(this.options.serviceUrl + 'geocode.json', params, cb, context);
    };

    _proto.reverse = function reverse(location, scale, cb, context) {
      var prox = location.lat + ',' + location.lng;

      if (this.options.reverseGeocodeProxRadius) {
        prox += ',' + this.options.reverseGeocodeProxRadius;
      }

      var params = reverseParams(this.options, {
        prox: prox,
        mode: 'retrieveAddresses',
        app_id: this.options.app_id,
        app_code: this.options.app_code,
        gen: 9,
        jsonattributes: 1,
        maxresults: this.options.maxResults
      });
      this.getJSON(this.options.serviceUrl + 'reversegeocode.json', params, cb, context);
    };

    _proto.getJSON = function getJSON$1(url, params, cb, context) {
      getJSON(url, params, function (data) {
        var results = [];

        if (data.response.view && data.response.view.length) {
          for (var i = 0; i <= data.response.view[0].result.length - 1; i++) {
            var loc = data.response.view[0].result[i].location;
            var center = L__namespace.latLng(loc.displayPosition.latitude, loc.displayPosition.longitude);
            var bbox = L__namespace.latLngBounds(L__namespace.latLng(loc.mapView.topLeft.latitude, loc.mapView.topLeft.longitude), L__namespace.latLng(loc.mapView.bottomRight.latitude, loc.mapView.bottomRight.longitude));
            results[i] = {
              name: loc.address.label,
              properties: loc.address,
              bbox: bbox,
              center: center
            };
          }
        }

        cb.call(context, results);
      });
    };

    return HERE;
  }();
  /**
   * Implementation of the new [HERE Geocoder API](https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html)
   */

  var HEREv2 = /*#__PURE__*/function () {
    function HEREv2(options) {
      this.options = {
        serviceUrl: 'https://geocode.search.hereapi.com/v1',
        apiKey: '',
        app_id: '',
        app_code: '',
        maxResults: 10
      };
      L__namespace.Util.setOptions(this, options);
    }

    var _proto2 = HEREv2.prototype;

    _proto2.geocode = function geocode(query, cb, context) {
      var params = geocodingParams(this.options, {
        q: query,
        apiKey: this.options.apiKey,
        limit: this.options.maxResults
      });

      if (!params.at && !params["in"]) {
        throw Error('at / in parameters not found. Please define coordinates (at=latitude,longitude) or other (in) in your geocodingQueryParams.');
      }

      this.getJSON(this.options.serviceUrl + '/discover', params, cb, context);
    };

    _proto2.reverse = function reverse(location, scale, cb, context) {
      var params = reverseParams(this.options, {
        at: location.lat + ',' + location.lng,
        limit: this.options.reverseGeocodeProxRadius,
        apiKey: this.options.apiKey
      });
      this.getJSON(this.options.serviceUrl + '/revgeocode', params, cb, context);
    };

    _proto2.getJSON = function getJSON$1(url, params, cb, context) {
      getJSON(url, params, function (data) {
        var results = [];

        if (data.items && data.items.length) {
          for (var i = 0; i <= data.items.length - 1; i++) {
            var item = data.items[i];
            var latLng = L__namespace.latLng(item.position.lat, item.position.lng);
            var bbox = void 0;

            if (item.mapView) {
              bbox = L__namespace.latLngBounds(L__namespace.latLng(item.mapView.south, item.mapView.west), L__namespace.latLng(item.mapView.north, item.mapView.east));
            } else {
              // Using only position when not provided
              bbox = L__namespace.latLngBounds(L__namespace.latLng(item.position.lat, item.position.lng), L__namespace.latLng(item.position.lat, item.position.lng));
            }

            results[i] = {
              name: item.address.label,
              properties: item.address,
              bbox: bbox,
              center: latLng
            };
          }
        }

        cb.call(context, results);
      });
    };

    return HEREv2;
  }();
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link HERE}
   * @param options the options
   */

  function here(options) {
    if (options.apiKey) {
      return new HEREv2(options);
    } else {
      return new HERE(options);
    }
  }

  /**
   * Parses basic latitude/longitude strings such as `'50.06773 14.37742'`, `'N50.06773 W14.37742'`, `'S 50° 04.064 E 014° 22.645'`, or `'S 50° 4′ 03.828″, W 14° 22′ 38.712″'`
   * @param query the latitude/longitude string to parse
   * @returns the parsed latitude/longitude
   */

  function parseLatLng(query) {
    var match; // regex from https://github.com/openstreetmap/openstreetmap-website/blob/master/app/controllers/geocoder_controller.rb

    if (match = query.match(/^([NS])\s*(\d{1,3}(?:\.\d*)?)\W*([EW])\s*(\d{1,3}(?:\.\d*)?)$/)) {
      // [NSEW] decimal degrees
      return L__namespace.latLng((/N/i.test(match[1]) ? 1 : -1) * +match[2], (/E/i.test(match[3]) ? 1 : -1) * +match[4]);
    } else if (match = query.match(/^(\d{1,3}(?:\.\d*)?)\s*([NS])\W*(\d{1,3}(?:\.\d*)?)\s*([EW])$/)) {
      // decimal degrees [NSEW]
      return L__namespace.latLng((/N/i.test(match[2]) ? 1 : -1) * +match[1], (/E/i.test(match[4]) ? 1 : -1) * +match[3]);
    } else if (match = query.match(/^([NS])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?$/)) {
      // [NSEW] degrees, decimal minutes
      return L__namespace.latLng((/N/i.test(match[1]) ? 1 : -1) * (+match[2] + +match[3] / 60), (/E/i.test(match[4]) ? 1 : -1) * (+match[5] + +match[6] / 60));
    } else if (match = query.match(/^(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([NS])\W*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([EW])$/)) {
      // degrees, decimal minutes [NSEW]
      return L__namespace.latLng((/N/i.test(match[3]) ? 1 : -1) * (+match[1] + +match[2] / 60), (/E/i.test(match[6]) ? 1 : -1) * (+match[4] + +match[5] / 60));
    } else if (match = query.match(/^([NS])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?$/)) {
      // [NSEW] degrees, minutes, decimal seconds
      return L__namespace.latLng((/N/i.test(match[1]) ? 1 : -1) * (+match[2] + +match[3] / 60 + +match[4] / 3600), (/E/i.test(match[5]) ? 1 : -1) * (+match[6] + +match[7] / 60 + +match[8] / 3600));
    } else if (match = query.match(/^(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]\s*([NS])\W*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\s*([EW])$/)) {
      // degrees, minutes, decimal seconds [NSEW]
      return L__namespace.latLng((/N/i.test(match[4]) ? 1 : -1) * (+match[1] + +match[2] / 60 + +match[3] / 3600), (/E/i.test(match[8]) ? 1 : -1) * (+match[5] + +match[6] / 60 + +match[7] / 3600));
    } else if (match = query.match(/^\s*([+-]?\d+(?:\.\d*)?)\s*[\s,]\s*([+-]?\d+(?:\.\d*)?)\s*$/)) {
      return L__namespace.latLng(+match[1], +match[2]);
    }
  }
  /**
   * Parses basic latitude/longitude strings such as `'50.06773 14.37742'`, `'N50.06773 W14.37742'`, `'S 50° 04.064 E 014° 22.645'`, or `'S 50° 4′ 03.828″, W 14° 22′ 38.712″'`
   */

  var LatLng = /*#__PURE__*/function () {
    function LatLng(options) {
      this.options = {
        next: undefined,
        sizeInMeters: 10000
      };
      L__namespace.Util.setOptions(this, options);
    }

    var _proto = LatLng.prototype;

    _proto.geocode = function geocode(query, cb, context) {
      var center = parseLatLng(query);

      if (center) {
        var results = [{
          name: query,
          center: center,
          bbox: center.toBounds(this.options.sizeInMeters)
        }];
        cb.call(context, results);
      } else if (this.options.next) {
        this.options.next.geocode(query, cb, context);
      }
    };

    return LatLng;
  }();
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link LatLng}
   * @param options the options
   */

  function latLng(options) {
    return new LatLng(options);
  }

  /**
   * Implementation of the [Mapbox Geocoding](https://www.mapbox.com/api-documentation/#geocoding)
   */

  var Mapbox = /*#__PURE__*/function () {
    function Mapbox(options) {
      this.options = {
        serviceUrl: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
      };
      L__namespace.Util.setOptions(this, options);
    }

    var _proto = Mapbox.prototype;

    _proto._getProperties = function _getProperties(loc) {
      var properties = {
        text: loc.text,
        address: loc.address
      };

      for (var j = 0; j < (loc.context || []).length; j++) {
        var id = loc.context[j].id.split('.')[0];
        properties[id] = loc.context[j].text; // Get country code when available

        if (loc.context[j].short_code) {
          properties['countryShortCode'] = loc.context[j].short_code;
        }
      }

      return properties;
    };

    _proto.geocode = function geocode(query, cb, context) {
      var _this = this;

      var params = geocodingParams(this.options, {
        access_token: this.options.apiKey
      });

      if (params.proximity !== undefined && params.proximity.lat !== undefined && params.proximity.lng !== undefined) {
        params.proximity = params.proximity.lng + ',' + params.proximity.lat;
      }

      getJSON(this.options.serviceUrl + encodeURIComponent(query) + '.json', params, function (data) {
        var results = [];

        if (data.features && data.features.length) {
          for (var i = 0; i <= data.features.length - 1; i++) {
            var loc = data.features[i];
            var center = L__namespace.latLng(loc.center.reverse());
            var bbox = void 0;

            if (loc.bbox) {
              bbox = L__namespace.latLngBounds(L__namespace.latLng(loc.bbox.slice(0, 2).reverse()), L__namespace.latLng(loc.bbox.slice(2, 4).reverse()));
            } else {
              bbox = L__namespace.latLngBounds(center, center);
            }

            results[i] = {
              name: loc.place_name,
              bbox: bbox,
              center: center,
              properties: _this._getProperties(loc)
            };
          }
        }

        cb.call(context, results);
      });
    };

    _proto.suggest = function suggest(query, cb, context) {
      return this.geocode(query, cb, context);
    };

    _proto.reverse = function reverse(location, scale, cb, context) {
      var _this2 = this;

      var url = this.options.serviceUrl + location.lng + ',' + location.lat + '.json';
      var param = reverseParams(this.options, {
        access_token: this.options.apiKey
      });
      getJSON(url, param, function (data) {
        var results = [];

        if (data.features && data.features.length) {
          for (var i = 0; i <= data.features.length - 1; i++) {
            var loc = data.features[i];
            var center = L__namespace.latLng(loc.center.reverse());
            var bbox = void 0;

            if (loc.bbox) {
              bbox = L__namespace.latLngBounds(L__namespace.latLng(loc.bbox.slice(0, 2).reverse()), L__namespace.latLng(loc.bbox.slice(2, 4).reverse()));
            } else {
              bbox = L__namespace.latLngBounds(center, center);
            }

            results[i] = {
              name: loc.place_name,
              bbox: bbox,
              center: center,
              properties: _this2._getProperties(loc)
            };
          }
        }

        cb.call(context, results);
      });
    };

    return Mapbox;
  }();
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Mapbox}
   * @param options the options
   */

  function mapbox(options) {
    return new Mapbox(options);
  }

  /**
   * Implementation of the [MapQuest Geocoding API](http://developer.mapquest.com/web/products/dev-services/geocoding-ws)
   */

  var MapQuest = /*#__PURE__*/function () {
    function MapQuest(options) {
      this.options = {
        serviceUrl: 'https://www.mapquestapi.com/geocoding/v1'
      };
      L__namespace.Util.setOptions(this, options); // MapQuest seems to provide URI encoded API keys,
      // so to avoid encoding them twice, we decode them here

      this.options.apiKey = decodeURIComponent(this.options.apiKey);
    }

    var _proto = MapQuest.prototype;

    _proto._formatName = function _formatName() {
      return [].slice.call(arguments).filter(function (s) {
        return !!s;
      }).join(', ');
    };

    _proto.geocode = function geocode(query, cb, context) {
      var params = geocodingParams(this.options, {
        key: this.options.apiKey,
        location: query,
        limit: 5,
        outFormat: 'json'
      });
      getJSON(this.options.serviceUrl + '/address', params, L__namespace.Util.bind(function (data) {
        var results = [];

        if (data.results && data.results[0].locations) {
          for (var i = data.results[0].locations.length - 1; i >= 0; i--) {
            var loc = data.results[0].locations[i];
            var center = L__namespace.latLng(loc.latLng);
            results[i] = {
              name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
              bbox: L__namespace.latLngBounds(center, center),
              center: center
            };
          }
        }

        cb.call(context, results);
      }, this));
    };

    _proto.reverse = function reverse(location, scale, cb, context) {
      var params = reverseParams(this.options, {
        key: this.options.apiKey,
        location: location.lat + ',' + location.lng,
        outputFormat: 'json'
      });
      getJSON(this.options.serviceUrl + '/reverse', params, L__namespace.Util.bind(function (data) {
        var results = [];

        if (data.results && data.results[0].locations) {
          for (var i = data.results[0].locations.length - 1; i >= 0; i--) {
            var loc = data.results[0].locations[i];
            var center = L__namespace.latLng(loc.latLng);
            results[i] = {
              name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
              bbox: L__namespace.latLngBounds(center, center),
              center: center
            };
          }
        }

        cb.call(context, results);
      }, this));
    };

    return MapQuest;
  }();
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link MapQuest}
   * @param options the options
   */

  function mapQuest(options) {
    return new MapQuest(options);
  }

  /**
   * Implementation of the [Neutrino API](https://www.neutrinoapi.com/api/geocode-address/)
   */

  var Neutrino = /*#__PURE__*/function () {
    function Neutrino(options) {
      this.options = {
        userId: undefined,
        apiKey: undefined,
        serviceUrl: 'https://neutrinoapi.com/'
      };
      L__namespace.Util.setOptions(this, options);
    } // https://www.neutrinoapi.com/api/geocode-address/


    var _proto = Neutrino.prototype;

    _proto.geocode = function geocode(query, cb, context) {
      var params = geocodingParams(this.options, {
        apiKey: this.options.apiKey,
        userId: this.options.userId,
        //get three words and make a dot based string
        address: query.split(/\s+/).join('.')
      });
      getJSON(this.options.serviceUrl + 'geocode-address', params, function (data) {
        var results = [];

        if (data.locations) {
          data.geometry = data.locations[0];
          var center = L__namespace.latLng(data.geometry['latitude'], data.geometry['longitude']);
          var bbox = L__namespace.latLngBounds(center, center);
          results[0] = {
            name: data.geometry.address,
            bbox: bbox,
            center: center
          };
        }

        cb.call(context, results);
      });
    };

    _proto.suggest = function suggest(query, cb, context) {
      return this.geocode(query, cb, context);
    } // https://www.neutrinoapi.com/api/geocode-reverse/
    ;

    _proto.reverse = function reverse(location, scale, cb, context) {
      var params = reverseParams(this.options, {
        apiKey: this.options.apiKey,
        userId: this.options.userId,
        latitude: location.lat,
        longitude: location.lng
      });
      getJSON(this.options.serviceUrl + 'geocode-reverse', params, function (data) {
        var results = [];

        if (data.status.status == 200 && data.found) {
          var center = L__namespace.latLng(location.lat, location.lng);
          var bbox = L__namespace.latLngBounds(center, center);
          results[0] = {
            name: data.address,
            bbox: bbox,
            center: center
          };
        }

        cb.call(context, results);
      });
    };

    return Neutrino;
  }();
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Neutrino}
   * @param options the options
   */

  function neutrino(options) {
    return new Neutrino(options);
  }

  /**
   * Implementation of the [Nominatim](https://wiki.openstreetmap.org/wiki/Nominatim) geocoder.
   *
   * This is the default geocoding service used by the control, unless otherwise specified in the options.
   *
   * Unless using your own Nominatim installation, please refer to the [Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/).
   */

  var Nominatim = /*#__PURE__*/function () {
    function Nominatim(options) {
      this.options = {
        serviceUrl: 'https://nominatim.openstreetmap.org/',
        htmlTemplate: function htmlTemplate(r) {
          var address = r.address;
          var className;
          var parts = [];

          if (address.road || address.building) {
            parts.push('{building} {road} {house_number}');
          }

          if (address.city || address.town || address.village || address.hamlet) {
            className = parts.length > 0 ? 'leaflet-control-geocoder-address-detail' : '';
            parts.push('<span class="' + className + '">{postcode} {city} {town} {village} {hamlet}</span>');
          }

          if (address.state || address.country) {
            className = parts.length > 0 ? 'leaflet-control-geocoder-address-context' : '';
            parts.push('<span class="' + className + '">{state} {country}</span>');
          }

          return template(parts.join('<br/>'), address);
        }
      };
      L__namespace.Util.setOptions(this, options || {});
    }

    var _proto = Nominatim.prototype;

    _proto.geocode = function geocode(query, cb, context) {
      var _this = this;

      var params = geocodingParams(this.options, {
        q: query,
        limit: 5,
        format: 'json',
        addressdetails: 1
      });
      getJSON(this.options.serviceUrl + 'search', params, function (data) {
        var results = [];

        for (var i = data.length - 1; i >= 0; i--) {
          var bbox = data[i].boundingbox;

          for (var j = 0; j < 4; j++) {
            bbox[j] = +bbox[j];
          }

          results[i] = {
            icon: data[i].icon,
            name: data[i].display_name,
            html: _this.options.htmlTemplate ? _this.options.htmlTemplate(data[i]) : undefined,
            bbox: L__namespace.latLngBounds([bbox[0], bbox[2]], [bbox[1], bbox[3]]),
            center: L__namespace.latLng(data[i].lat, data[i].lon),
            properties: data[i]
          };
        }

        cb.call(context, results);
      });
    };

    _proto.reverse = function reverse(location, scale, cb, context) {
      var _this2 = this;

      var params = reverseParams(this.options, {
        lat: location.lat,
        lon: location.lng,
        zoom: Math.round(Math.log(scale / 256) / Math.log(2)),
        addressdetails: 1,
        format: 'json'
      });
      getJSON(this.options.serviceUrl + 'reverse', params, function (data) {
        var result = [];

        if (data && data.lat && data.lon) {
          var center = L__namespace.latLng(data.lat, data.lon);
          var bbox = L__namespace.latLngBounds(center, center);
          result.push({
            name: data.display_name,
            html: _this2.options.htmlTemplate ? _this2.options.htmlTemplate(data) : undefined,
            center: center,
            bbox: bbox,
            properties: data
          });
        }

        cb.call(context, result);
      });
    };

    return Nominatim;
  }();
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Nominatim}
   * @param options the options
   */

  function nominatim(options) {
    return new Nominatim(options);
  }

  /**
   * Implementation of the [Plus codes](https://plus.codes/) (formerly OpenLocationCode) (requires [open-location-code](https://www.npmjs.com/package/open-location-code))
   */

  var OpenLocationCode = /*#__PURE__*/function () {
    function OpenLocationCode(options) {
      L__namespace.Util.setOptions(this, options);
    }

    var _proto = OpenLocationCode.prototype;

    _proto.geocode = function geocode(query, cb, context) {
      try {
        var decoded = this.options.OpenLocationCode.decode(query);
        var result = {
          name: query,
          center: L__namespace.latLng(decoded.latitudeCenter, decoded.longitudeCenter),
          bbox: L__namespace.latLngBounds(L__namespace.latLng(decoded.latitudeLo, decoded.longitudeLo), L__namespace.latLng(decoded.latitudeHi, decoded.longitudeHi))
        };
        cb.call(context, [result]);
      } catch (e) {
        console.warn(e); // eslint-disable-line no-console

        cb.call(context, []);
      }
    };

    _proto.reverse = function reverse(location, scale, cb, context) {
      try {
        var code = this.options.OpenLocationCode.encode(location.lat, location.lng, this.options.codeLength);
        var result = {
          name: code,
          center: L__namespace.latLng(location.lat, location.lng),
          bbox: L__namespace.latLngBounds(L__namespace.latLng(location.lat, location.lng), L__namespace.latLng(location.lat, location.lng))
        };
        cb.call(context, [result]);
      } catch (e) {
        console.warn(e); // eslint-disable-line no-console

        cb.call(context, []);
      }
    };

    return OpenLocationCode;
  }();
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link OpenLocationCode}
   * @param options the options
   */

  function openLocationCode(options) {
    return new OpenLocationCode(options);
  }

  /**
   * Implementation of the [OpenCage Data API](https://opencagedata.com/)
   */

  var OpenCage = /*#__PURE__*/function () {
    function OpenCage(options) {
      this.options = {
        serviceUrl: 'https://api.opencagedata.com/geocode/v1/json'
      };
      L__namespace.Util.setOptions(this, options);
    }

    var _proto = OpenCage.prototype;

    _proto.geocode = function geocode(query, cb, context) {
      var params = geocodingParams(this.options, {
        key: this.options.apiKey,
        q: query
      });
      getJSON(this.options.serviceUrl, params, function (data) {
        var results = [];

        if (data.results && data.results.length) {
          for (var i = 0; i < data.results.length; i++) {
            var loc = data.results[i];
            var center = L__namespace.latLng(loc.geometry);
            var bbox = void 0;

            if (loc.annotations && loc.annotations.bounds) {
              bbox = L__namespace.latLngBounds(L__namespace.latLng(loc.annotations.bounds.northeast), L__namespace.latLng(loc.annotations.bounds.southwest));
            } else {
              bbox = L__namespace.latLngBounds(center, center);
            }

            results.push({
              name: loc.formatted,
              bbox: bbox,
              center: center
            });
          }
        }

        cb.call(context, results);
      });
    };

    _proto.suggest = function suggest(query, cb, context) {
      return this.geocode(query, cb, context);
    };

    _proto.reverse = function reverse(location, scale, cb, context) {
      var params = reverseParams(this.options, {
        key: this.options.apiKey,
        q: [location.lat, location.lng].join(',')
      });
      getJSON(this.options.serviceUrl, params, function (data) {
        var results = [];

        if (data.results && data.results.length) {
          for (var i = 0; i < data.results.length; i++) {
            var loc = data.results[i];
            var center = L__namespace.latLng(loc.geometry);
            var bbox = void 0;

            if (loc.annotations && loc.annotations.bounds) {
              bbox = L__namespace.latLngBounds(L__namespace.latLng(loc.annotations.bounds.northeast), L__namespace.latLng(loc.annotations.bounds.southwest));
            } else {
              bbox = L__namespace.latLngBounds(center, center);
            }

            results.push({
              name: loc.formatted,
              bbox: bbox,
              center: center
            });
          }
        }

        cb.call(context, results);
      });
    };

    return OpenCage;
  }();
  function opencage(options) {
    return new OpenCage(options);
  }

  /**
   * Implementation of the [Pelias](https://pelias.io/), [geocode.earth](https://geocode.earth/) geocoder (formerly Mapzen Search)
   */

  var Pelias = /*#__PURE__*/function () {
    function Pelias(options) {
      this.options = {
        serviceUrl: 'https://api.geocode.earth/v1'
      };
      this._lastSuggest = 0;
      L__namespace.Util.setOptions(this, options);
    }

    var _proto = Pelias.prototype;

    _proto.geocode = function geocode(query, cb, context) {
      var _this = this;

      var params = geocodingParams(this.options, {
        api_key: this.options.apiKey,
        text: query
      });
      getJSON(this.options.serviceUrl + '/search', params, function (data) {
        cb.call(context, _this._parseResults(data, 'bbox'));
      });
    };

    _proto.suggest = function suggest(query, cb, context) {
      var _this2 = this;

      var params = geocodingParams(this.options, {
        api_key: this.options.apiKey,
        text: query
      });
      getJSON(this.options.serviceUrl + '/autocomplete', params, function (data) {
        if (data.geocoding.timestamp > _this2._lastSuggest) {
          _this2._lastSuggest = data.geocoding.timestamp;
          cb.call(context, _this2._parseResults(data, 'bbox'));
        }
      });
    };

    _proto.reverse = function reverse(location, scale, cb, context) {
      var _this3 = this;

      var params = reverseParams(this.options, {
        api_key: this.options.apiKey,
        'point.lat': location.lat,
        'point.lon': location.lng
      });
      getJSON(this.options.serviceUrl + '/reverse', params, function (data) {
        cb.call(context, _this3._parseResults(data, 'bounds'));
      });
    };

    _proto._parseResults = function _parseResults(data, bboxname) {
      var results = [];
      L__namespace.geoJSON(data, {
        pointToLayer: function pointToLayer(feature, latlng) {
          return L__namespace.circleMarker(latlng);
        },
        onEachFeature: function onEachFeature(feature, layer) {
          var result = {};
          var bbox;
          var center;

          if (layer.getBounds) {
            bbox = layer.getBounds();
            center = bbox.getCenter();
          } else if (layer.feature.bbox) {
            center = layer.getLatLng();
            bbox = L__namespace.latLngBounds(L__namespace.GeoJSON.coordsToLatLng(layer.feature.bbox.slice(0, 2)), L__namespace.GeoJSON.coordsToLatLng(layer.feature.bbox.slice(2, 4)));
          } else {
            center = layer.getLatLng();
            bbox = L__namespace.latLngBounds(center, center);
          }

          result.name = layer.feature.properties.label;
          result.center = center;
          result[bboxname] = bbox;
          result.properties = layer.feature.properties;
          results.push(result);
        }
      });
      return results;
    };

    return Pelias;
  }();
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Pelias}
   * @param options the options
   */

  function pelias(options) {
    return new Pelias(options);
  }
  var GeocodeEarth = Pelias;
  var geocodeEarth = pelias;
  /**
   * r.i.p.
   * @deprecated
   */

  var Mapzen = Pelias;
  /**
   * r.i.p.
   * @deprecated
   */

  var mapzen = pelias;
  /**
   * Implementation of the [Openrouteservice](https://openrouteservice.org/dev/#/api-docs/geocode) geocoder
   */

  var Openrouteservice = /*#__PURE__*/function (_Pelias) {
    _inheritsLoose(Openrouteservice, _Pelias);

    function Openrouteservice(options) {
      return _Pelias.call(this, L__namespace.Util.extend({
        serviceUrl: 'https://api.openrouteservice.org/geocode'
      }, options)) || this;
    }

    return Openrouteservice;
  }(Pelias);
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Openrouteservice}
   * @param options the options
   */

  function openrouteservice(options) {
    return new Openrouteservice(options);
  }

  /**
   * Implementation of the [Photon](http://photon.komoot.de/) geocoder
   */

  var Photon = /*#__PURE__*/function () {
    function Photon(options) {
      this.options = {
        serviceUrl: 'https://photon.komoot.io/api/',
        reverseUrl: 'https://photon.komoot.io/reverse/',
        nameProperties: ['name', 'street', 'suburb', 'hamlet', 'town', 'city', 'state', 'country']
      };
      L__namespace.Util.setOptions(this, options);
    }

    var _proto = Photon.prototype;

    _proto.geocode = function geocode(query, cb, context) {
      var params = geocodingParams(this.options, {
        q: query
      });
      getJSON(this.options.serviceUrl, params, L__namespace.Util.bind(function (data) {
        cb.call(context, this._decodeFeatures(data));
      }, this));
    };

    _proto.suggest = function suggest(query, cb, context) {
      return this.geocode(query, cb, context);
    };

    _proto.reverse = function reverse(latLng, scale, cb, context) {
      var params = reverseParams(this.options, {
        lat: latLng.lat,
        lon: latLng.lng
      });
      getJSON(this.options.reverseUrl, params, L__namespace.Util.bind(function (data) {
        cb.call(context, this._decodeFeatures(data));
      }, this));
    };

    _proto._decodeFeatures = function _decodeFeatures(data) {
      var results = [];

      if (data && data.features) {
        for (var i = 0; i < data.features.length; i++) {
          var f = data.features[i];
          var c = f.geometry.coordinates;
          var center = L__namespace.latLng(c[1], c[0]);
          var extent = f.properties.extent;
          var bbox = extent ? L__namespace.latLngBounds([extent[1], extent[0]], [extent[3], extent[2]]) : L__namespace.latLngBounds(center, center);
          results.push({
            name: this._decodeFeatureName(f),
            html: this.options.htmlTemplate ? this.options.htmlTemplate(f) : undefined,
            center: center,
            bbox: bbox,
            properties: f.properties
          });
        }
      }

      return results;
    };

    _proto._decodeFeatureName = function _decodeFeatureName(f) {
      return (this.options.nameProperties || []).map(function (p) {
        return f.properties[p];
      }).filter(function (v) {
        return !!v;
      }).join(', ');
    };

    return Photon;
  }();
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link Photon}
   * @param options the options
   */

  function photon(options) {
    return new Photon(options);
  }

  /**
   * Implementation of the What3Words service
   */

  var What3Words = /*#__PURE__*/function () {
    function What3Words(options) {
      this.options = {
        serviceUrl: 'https://api.what3words.com/v2/'
      };
      L__namespace.Util.setOptions(this, options);
    }

    var _proto = What3Words.prototype;

    _proto.geocode = function geocode(query, cb, context) {
      //get three words and make a dot based string
      getJSON(this.options.serviceUrl + 'forward', geocodingParams(this.options, {
        key: this.options.apiKey,
        addr: query.split(/\s+/).join('.')
      }), function (data) {
        var results = [];

        if (data.geometry) {
          var latLng = L__namespace.latLng(data.geometry['lat'], data.geometry['lng']);
          var latLngBounds = L__namespace.latLngBounds(latLng, latLng);
          results[0] = {
            name: data.words,
            bbox: latLngBounds,
            center: latLng
          };
        }

        cb.call(context, results);
      });
    };

    _proto.suggest = function suggest(query, cb, context) {
      return this.geocode(query, cb, context);
    };

    _proto.reverse = function reverse(location, scale, cb, context) {
      getJSON(this.options.serviceUrl + 'reverse', reverseParams(this.options, {
        key: this.options.apiKey,
        coords: [location.lat, location.lng].join(',')
      }), function (data) {
        var results = [];

        if (data.status.status == 200) {
          var center = L__namespace.latLng(data.geometry['lat'], data.geometry['lng']);
          var bbox = L__namespace.latLngBounds(center, center);
          results[0] = {
            name: data.words,
            bbox: bbox,
            center: center
          };
        }

        cb.call(context, results);
      });
    };

    return What3Words;
  }();
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link What3Words}
   * @param options the options
   */

  function what3words(options) {
    return new What3Words(options);
  }

  var geocoders = {
    __proto__: null,
    geocodingParams: geocodingParams,
    reverseParams: reverseParams,
    ArcGis: ArcGis,
    arcgis: arcgis,
    Bing: Bing,
    bing: bing,
    Google: Google,
    google: google,
    HERE: HERE,
    HEREv2: HEREv2,
    here: here,
    parseLatLng: parseLatLng,
    LatLng: LatLng,
    latLng: latLng,
    Mapbox: Mapbox,
    mapbox: mapbox,
    MapQuest: MapQuest,
    mapQuest: mapQuest,
    Neutrino: Neutrino,
    neutrino: neutrino,
    Nominatim: Nominatim,
    nominatim: nominatim,
    OpenLocationCode: OpenLocationCode,
    openLocationCode: openLocationCode,
    OpenCage: OpenCage,
    opencage: opencage,
    Pelias: Pelias,
    pelias: pelias,
    GeocodeEarth: GeocodeEarth,
    geocodeEarth: geocodeEarth,
    Mapzen: Mapzen,
    mapzen: mapzen,
    Openrouteservice: Openrouteservice,
    openrouteservice: openrouteservice,
    Photon: Photon,
    photon: photon,
    What3Words: What3Words,
    what3words: what3words
  };

  /**
   * Leaflet mixins https://leafletjs.com/reference-1.7.1.html#class-includes
   * for TypeScript https://www.typescriptlang.org/docs/handbook/mixins.html
   * @internal
   */

  var EventedControl = // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function EventedControl() {// empty
  };

  L__namespace.Util.extend(EventedControl.prototype, L__namespace.Control.prototype);
  L__namespace.Util.extend(EventedControl.prototype, L__namespace.Evented.prototype);
  /**
   * This is the geocoder control. It works like any other [Leaflet control](https://leafletjs.com/reference.html#control), and is added to the map.
   */

  var GeocoderControl = /*#__PURE__*/function (_EventedControl) {
    _inheritsLoose(GeocoderControl, _EventedControl);

    /**
     * Instantiates a geocoder control (to be invoked using `new`)
     * @param options the options
     */
    function GeocoderControl(options) {
      var _this;

      _this = _EventedControl.call(this, options) || this;
      _this.options = {
        showUniqueResult: true,
        showResultIcons: false,
        collapsed: true,
        expand: 'touch',
        position: 'topright',
        placeholder: 'Search...',
        errorMessage: 'Nothing found.',
        iconLabel: 'Initiate a new search',
        query: '',
        queryMinLength: 1,
        suggestMinLength: 3,
        suggestTimeout: 250,
        defaultMarkGeocode: true
      };
      _this._requestCount = 0;
      L__namespace.Util.setOptions(_assertThisInitialized(_this), options);

      if (!_this.options.geocoder) {
        _this.options.geocoder = new Nominatim();
      }

      return _this;
    }

    var _proto = GeocoderControl.prototype;

    _proto.addThrobberClass = function addThrobberClass() {
      L__namespace.DomUtil.addClass(this._container, 'leaflet-control-geocoder-throbber');
    };

    _proto.removeThrobberClass = function removeThrobberClass() {
      L__namespace.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-throbber');
    }
    /**
     * Returns the container DOM element for the control and add listeners on relevant map events.
     * @param map the map instance
     * @see https://leafletjs.com/reference.html#control-onadd
     */
    ;

    _proto.onAdd = function onAdd(map) {
      var _this2 = this;

      var className = 'leaflet-control-geocoder';
      var container = L__namespace.DomUtil.create('div', className + ' leaflet-bar');
      var icon = L__namespace.DomUtil.create('button', className + '-icon', container);
      var form = this._form = L__namespace.DomUtil.create('div', className + '-form', container);
      this._map = map;
      this._container = container;
      icon.innerHTML = '&nbsp;';
      icon.type = 'button';
      icon.setAttribute('aria-label', this.options.iconLabel);
      var input = this._input = L__namespace.DomUtil.create('input', '', form);
      input.type = 'text';
      input.value = this.options.query;
      input.placeholder = this.options.placeholder;
      L__namespace.DomEvent.disableClickPropagation(input);
      this._errorElement = L__namespace.DomUtil.create('div', className + '-form-no-error', container);
      this._errorElement.innerHTML = this.options.errorMessage;
      this._alts = L__namespace.DomUtil.create('ul', className + '-alternatives leaflet-control-geocoder-alternatives-minimized', container);
      L__namespace.DomEvent.disableClickPropagation(this._alts);
      L__namespace.DomEvent.addListener(input, 'keydown', this._keydown, this);

      if (this.options.geocoder.suggest) {
        L__namespace.DomEvent.addListener(input, 'input', this._change, this);
      }

      L__namespace.DomEvent.addListener(input, 'blur', function () {
        if (_this2.options.collapsed && !_this2._preventBlurCollapse) {
          _this2._collapse();
        }

        _this2._preventBlurCollapse = false;
      });

      if (this.options.collapsed) {
        if (this.options.expand === 'click') {
          L__namespace.DomEvent.addListener(container, 'click', function (e) {
            if (e.button === 0 && e.detail !== 2) {
              _this2._toggle();
            }
          });
        } else if (this.options.expand === 'touch') {
          L__namespace.DomEvent.addListener(container, L__namespace.Browser.touch ? 'touchstart mousedown' : 'mousedown', function (e) {
            _this2._toggle();

            e.preventDefault(); // mobile: clicking focuses the icon, so UI expands and immediately collapses

            e.stopPropagation();
          }, this);
        } else {
          L__namespace.DomEvent.addListener(container, 'mouseover', this._expand, this);
          L__namespace.DomEvent.addListener(container, 'mouseout', this._collapse, this);

          this._map.on('movestart', this._collapse, this);
        }
      } else {
        this._expand();

        if (L__namespace.Browser.touch) {
          L__namespace.DomEvent.addListener(container, 'touchstart', function () {
            return _this2._geocode();
          });
        } else {
          L__namespace.DomEvent.addListener(container, 'click', function () {
            return _this2._geocode();
          });
        }
      }

      if (this.options.defaultMarkGeocode) {
        this.on('markgeocode', this.markGeocode, this);
      }

      this.on('startgeocode', this.addThrobberClass, this);
      this.on('finishgeocode', this.removeThrobberClass, this);
      this.on('startsuggest', this.addThrobberClass, this);
      this.on('finishsuggest', this.removeThrobberClass, this);
      L__namespace.DomEvent.disableClickPropagation(container);
      return container;
    }
    /**
     * Sets the query string on the text input
     * @param string the query string
     */
    ;

    _proto.setQuery = function setQuery(string) {
      this._input.value = string;
      return this;
    };

    _proto._geocodeResult = function _geocodeResult(results, suggest) {
      if (!suggest && this.options.showUniqueResult && results.length === 1) {
        this._geocodeResultSelected(results[0]);
      } else if (results.length > 0) {
        this._alts.innerHTML = '';
        this._results = results;
        L__namespace.DomUtil.removeClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
        L__namespace.DomUtil.addClass(this._container, 'leaflet-control-geocoder-options-open');

        for (var i = 0; i < results.length; i++) {
          this._alts.appendChild(this._createAlt(results[i], i));
        }
      } else {
        L__namespace.DomUtil.addClass(this._container, 'leaflet-control-geocoder-options-error');
        L__namespace.DomUtil.addClass(this._errorElement, 'leaflet-control-geocoder-error');
      }
    }
    /**
     * Marks a geocoding result on the map
     * @param result the geocoding result
     */
    ;

    _proto.markGeocode = function markGeocode(event) {
      var result = event.geocode;

      this._map.fitBounds(result.bbox);

      if (this._geocodeMarker) {
        this._map.removeLayer(this._geocodeMarker);
      }

      this._geocodeMarker = new L__namespace.Marker(result.center).bindPopup(result.html || result.name).addTo(this._map).openPopup();
      return this;
    };

    _proto._geocode = function _geocode(suggest) {
      var _this3 = this;

      var value = this._input.value;

      if (!suggest && value.length < this.options.queryMinLength) {
        return;
      }

      var requestCount = ++this._requestCount;

      var cb = function cb(results) {
        if (requestCount === _this3._requestCount) {
          var _event = {
            input: value,
            results: results
          };

          _this3.fire(suggest ? 'finishsuggest' : 'finishgeocode', _event);

          _this3._geocodeResult(results, suggest);
        }
      };

      this._lastGeocode = value;

      if (!suggest) {
        this._clearResults();
      }

      var event = {
        input: value
      };
      this.fire(suggest ? 'startsuggest' : 'startgeocode', event);

      if (suggest) {
        this.options.geocoder.suggest(value, cb);
      } else {
        this.options.geocoder.geocode(value, cb);
      }
    };

    _proto._geocodeResultSelected = function _geocodeResultSelected(geocode) {
      var event = {
        geocode: geocode
      };
      this.fire('markgeocode', event);
    };

    _proto._toggle = function _toggle() {
      if (L__namespace.DomUtil.hasClass(this._container, 'leaflet-control-geocoder-expanded')) {
        this._collapse();
      } else {
        this._expand();
      }
    };

    _proto._expand = function _expand() {
      L__namespace.DomUtil.addClass(this._container, 'leaflet-control-geocoder-expanded');

      this._input.select();

      this.fire('expand');
    };

    _proto._collapse = function _collapse() {
      L__namespace.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-expanded');
      L__namespace.DomUtil.addClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
      L__namespace.DomUtil.removeClass(this._errorElement, 'leaflet-control-geocoder-error');
      L__namespace.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-open');
      L__namespace.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-error');

      this._input.blur(); // mobile: keyboard shouldn't stay expanded


      this.fire('collapse');
    };

    _proto._clearResults = function _clearResults() {
      L__namespace.DomUtil.addClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
      this._selection = null;
      L__namespace.DomUtil.removeClass(this._errorElement, 'leaflet-control-geocoder-error');
      L__namespace.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-open');
      L__namespace.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-error');
    };

    _proto._createAlt = function _createAlt(result, index) {
      var _this4 = this;

      var li = L__namespace.DomUtil.create('li', ''),
          a = L__namespace.DomUtil.create('a', '', li),
          icon = this.options.showResultIcons && result.icon ? L__namespace.DomUtil.create('img', '', a) : null,
          text = result.html ? undefined : document.createTextNode(result.name),
          mouseDownHandler = function mouseDownHandler(e) {
        // In some browsers, a click will fire on the map if the control is
        // collapsed directly after mousedown. To work around this, we
        // wait until the click is completed, and _then_ collapse the
        // control. Messy, but this is the workaround I could come up with
        // for #142.
        _this4._preventBlurCollapse = true;
        L__namespace.DomEvent.stop(e);

        _this4._geocodeResultSelected(result);

        L__namespace.DomEvent.on(li, 'click touchend', function () {
          if (_this4.options.collapsed) {
            _this4._collapse();
          } else {
            _this4._clearResults();
          }
        });
      };

      if (icon) {
        icon.src = result.icon;
      }

      li.setAttribute('data-result-index', String(index));

      if (result.html) {
        a.innerHTML = a.innerHTML + result.html;
      } else if (text) {
        a.appendChild(text);
      } // Use mousedown and not click, since click will fire _after_ blur,
      // causing the control to have collapsed and removed the items
      // before the click can fire.


      L__namespace.DomEvent.addListener(li, 'mousedown touchstart', mouseDownHandler, this);
      return li;
    };

    _proto._keydown = function _keydown(e) {
      var _this5 = this;

      var select = function select(dir) {
        if (_this5._selection) {
          L__namespace.DomUtil.removeClass(_this5._selection, 'leaflet-control-geocoder-selected');
          _this5._selection = _this5._selection[dir > 0 ? 'nextSibling' : 'previousSibling'];
        }

        if (!_this5._selection) {
          _this5._selection = _this5._alts[dir > 0 ? 'firstChild' : 'lastChild'];
        }

        if (_this5._selection) {
          L__namespace.DomUtil.addClass(_this5._selection, 'leaflet-control-geocoder-selected');
        }
      };

      switch (e.keyCode) {
        // Escape
        case 27:
          if (this.options.collapsed) {
            this._collapse();
          } else {
            this._clearResults();
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

        default:
          return;
      }

      L__namespace.DomEvent.preventDefault(e);
    };

    _proto._change = function _change() {
      var _this6 = this;

      var v = this._input.value;

      if (v !== this._lastGeocode) {
        clearTimeout(this._suggestTimeout);

        if (v.length >= this.options.suggestMinLength) {
          this._suggestTimeout = setTimeout(function () {
            return _this6._geocode(true);
          }, this.options.suggestTimeout);
        } else {
          this._clearResults();
        }
      }
    };

    return GeocoderControl;
  }(EventedControl);
  /**
   * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link GeocoderControl}
   * @param options the options
   */

  function geocoder(options) {
    return new GeocoderControl(options);
  }

  /* @preserve
   * Leaflet Control Geocoder
   * https://github.com/perliedman/leaflet-control-geocoder
   *
   * Copyright (c) 2012 sa3m (https://github.com/sa3m)
   * Copyright (c) 2018 Per Liedman
   * All rights reserved.
   */
  L__namespace.Util.extend(GeocoderControl, geocoders);
  L__namespace.Util.extend(L__namespace.Control, {
    Geocoder: GeocoderControl,
    geocoder: geocoder
  });

  exports.Geocoder = GeocoderControl;
  exports.default = GeocoderControl;
  exports.geocoder = geocoder;
  exports.geocoders = geocoders;

  return exports;

}({}, L));
//# sourceMappingURL=Control.Geocoder.js.map
