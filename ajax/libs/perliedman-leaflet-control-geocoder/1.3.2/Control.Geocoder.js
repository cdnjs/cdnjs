(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
	Nominatim = require('./geocoders/nominatim')["class"];

module.exports = {
	"class": L.Control.extend({
		options: {
			showResultIcons: false,
			collapsed: true,
			expand: 'click',
			position: 'topright',
			placeholder: 'Search...',
			errorMessage: 'Nothing found.'
		},

		_callbackId: 0,

		initialize: function (options) {
			L.Util.setOptions(this, options);
			if (!this.options.geocoder) {
				this.options.geocoder = new Nominatim();
			}
		},

		onAdd: function (map) {
			var className = 'leaflet-control-geocoder',
			    container = L.DomUtil.create('div', className + ' leaflet-bar'),
			    icon = L.DomUtil.create('a', 'leaflet-control-geocoder-icon', container),
			    form = this._form = L.DomUtil.create('form', className + '-form', container),
			    input;

			icon.innerHTML = '&nbsp;';
			icon.href = 'javascript:void(0);';
			this._map = map;
			this._container = container;
			input = this._input = L.DomUtil.create('input');
			input.type = 'text';
			input.placeholder = this.options.placeholder;

			L.DomEvent.addListener(input, 'keydown', this._keydown, this);
			//L.DomEvent.addListener(input, 'onpaste', this._clearResults, this);
			//L.DomEvent.addListener(input, 'oninput', this._clearResults, this);

			this._errorElement = document.createElement('div');
			this._errorElement.className = className + '-form-no-error';
			this._errorElement.innerHTML = this.options.errorMessage;

			this._alts = L.DomUtil.create('ul', className + '-alternatives leaflet-control-geocoder-alternatives-minimized');

			form.appendChild(input);
			this._container.appendChild(this._errorElement);
			container.appendChild(this._alts);

			L.DomEvent.addListener(form, 'submit', this._geocode, this);

			if (this.options.collapsed) {
				if (this.options.expand === 'click') {
					L.DomEvent.addListener(icon, 'click', function(e) {
						// TODO: touch
						if (e.button === 0 && e.detail !== 2) {
							this._toggle();
						}
					}, this);
				} else {
					L.DomEvent.addListener(icon, 'mouseover', this._expand, this);
					L.DomEvent.addListener(icon, 'mouseout', this._collapse, this);
					this._map.on('movestart', this._collapse, this);
				}
			} else {
				L.DomEvent.addListener(icon, 'click', function(e) {
					this._geocode(e);
				}, this);
				this._expand();
			}

			L.DomEvent.disableClickPropagation(container);

			return container;
		},

		_geocodeResult: function (results) {
			L.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-throbber');
			if (results.length === 1) {
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

		_geocode: function(event) {
			L.DomEvent.preventDefault(event);

			L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-throbber');
			this._clearResults();
			this.options.geocoder.geocode(this._input.value, this._geocodeResult, this);

			return false;
		},

		_geocodeResultSelected: function(result) {
			if (this.options.collapsed) {
				this._collapse();
			} else {
				this._clearResults();
			}
			this.markGeocode(result);
		},

		_toggle: function() {
			if (this._container.className.indexOf('leaflet-control-geocoder-expanded') >= 0) {
				this._collapse();
			} else {
				this._expand();
			}
		},

		_expand: function () {
			L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-expanded');
			this._input.select();
		},

		_collapse: function () {
			this._container.className = this._container.className.replace(' leaflet-control-geocoder-expanded', '');
			L.DomUtil.addClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
			L.DomUtil.removeClass(this._errorElement, 'leaflet-control-geocoder-error');
		},

		_clearResults: function () {
			L.DomUtil.addClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
			this._selection = null;
			L.DomUtil.removeClass(this._errorElement, 'leaflet-control-geocoder-error');
		},

		_createAlt: function(result, index) {
			var li = L.DomUtil.create('li', ''),
				a = L.DomUtil.create('a', '', li),
			    icon = this.options.showResultIcons && result.icon ? L.DomUtil.create('img', '', a) : null,
			    text = result.html ? undefined : document.createTextNode(result.name),
			    clickHandler = function clickHandler(e) {
					L.DomEvent.preventDefault(e);
					this._geocodeResultSelected(result);
				};

			if (icon) {
				icon.src = result.icon;
			}

			li.setAttribute('data-result-index', index);

			if (result.html) {
				a.innerHTML = result.html;
			} else {
				a.appendChild(text);
			}

			L.DomEvent.addListener(li, 'click', clickHandler, this);

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
				L.DomEvent.preventDefault(e);
				break;
			// Up
			case 40:
				select(1);
				L.DomEvent.preventDefault(e);
				break;
			// Enter
			case 13:
				if (this._selection) {
					var index = parseInt(this._selection.getAttribute('data-result-index'), 10);
					this._geocodeResultSelected(this._results[index]);
					this._clearResults();
					L.DomEvent.preventDefault(e);
				}
			}
			return true;
		}
	}),
	factory: function(options) {
		return new L.Control.Geocoder(options);
	}
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./geocoders/nominatim":7}],2:[function(require,module,exports){
(function (global){
var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
	Util = require('../util');

module.exports = {
	"class": L.Class.extend({
		initialize: function(key) {
			this.key = key;
		},

		geocode : function (query, cb, context) {
			Util.jsonp('//dev.virtualearth.net/REST/v1/Locations', {
				query: query,
				key : this.key
			}, function(data) {
				var results = [];
				if( data.resourceSets.length > 0 ){
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
			}, this, 'jsonp');
		},

		reverse: function(location, scale, cb, context) {
			Util.jsonp('//dev.virtualearth.net/REST/v1/Locations/' + location.lat + ',' + location.lng, {
				key : this.key
			}, function(data) {
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
			}, this, 'jsonp');
		}
	}),

	factory: function(key) {
		return new L.Control.Geocoder.Bing(key);
	}
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util":11}],3:[function(require,module,exports){
(function (global){
var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
	Util = require('../util');

module.exports = {
	"class": L.Class.extend({
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

			Util.getJSON(this.options.serviceUrl, params, function(data) {
				var results = [],
						loc,
						latLng,
						latLngBounds;
				if (data.results && data.results.length) {
					for (var i = 0; i <= data.results.length - 1; i++) {
						loc = data.results[i];
						latLng = L.latLng(loc.geometry.location);
						latLngBounds = L.latLngBounds(L.latLng(loc.geometry.viewport.northeast), L.latLng(loc.geometry.viewport.southwest));
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

			Util.getJSON(this.options.serviceUrl, params, function(data) {
				var results = [],
						loc,
						latLng,
						latLngBounds;
				if (data.results && data.results.length) {
					for (var i = 0; i <= data.results.length - 1; i++) {
						loc = data.results[i];
						latLng = L.latLng(loc.geometry.location);
						latLngBounds = L.latLngBounds(L.latLng(loc.geometry.viewport.northeast), L.latLng(loc.geometry.viewport.southwest));
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util":11}],4:[function(require,module,exports){
(function (global){
var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
	Util = require('../util');

module.exports = {
	"class": L.Class.extend({
		options: {
			serviceUrl: 'https://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/'
		},

		initialize: function(accessToken, options) {
			L.setOptions(this, options);
			this._accessToken = accessToken;
		},

		geocode: function(query, cb, context) {
			Util.getJSON(this.options.serviceUrl + encodeURIComponent(query) + '.json', {
				access_token: this._accessToken
			}, function(data) {
				var results = [],
				loc,
				latLng,
				latLngBounds;
				if (data.features && data.features.length) {
					for (var i = 0; i <= data.features.length - 1; i++) {
						loc = data.features[i];
						latLng = L.latLng(loc.center.reverse());
						if(loc.hasOwnProperty('bbox'))
						{
							latLngBounds = L.latLngBounds(L.latLng(loc.bbox.slice(0, 2).reverse()), L.latLng(loc.bbox.slice(2, 4).reverse()));
						}
						else
						{
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
			Util.getJSON(this.options.serviceUrl + encodeURIComponent(location.lng) + ',' + encodeURIComponent(location.lat) + '.json', {
				access_token: this._accessToken
			}, function(data) {
				var results = [],
				loc,
				latLng,
				latLngBounds;
				if (data.features && data.features.length) {
					for (var i = 0; i <= data.features.length - 1; i++) {
						loc = data.features[i];
						latLng = L.latLng(loc.center.reverse());
						if(loc.hasOwnProperty('bbox'))
						{
							latLngBounds = L.latLngBounds(L.latLng(loc.bbox.slice(0, 2).reverse()), L.latLng(loc.bbox.slice(2, 4).reverse()));
						}
						else
						{
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
		}
	}),

	factory: function(accessToken, options) {
		return new L.Control.Geocoder.Mapbox(accessToken, options);
	}
};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util":11}],5:[function(require,module,exports){
(function (global){
var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
	Util = require('../util');

module.exports = {
	"class": L.Class.extend({
		options: {
			serviceUrl: '//www.mapquestapi.com/geocoding/v1'
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
			Util.jsonp(this.options.serviceUrl + '/address', {
				key: this._key,
				location: query,
				limit: 5,
				outFormat: 'json'
			}, function(data) {
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
			}, this);
		},

		reverse: function(location, scale, cb, context) {
			Util.jsonp(this.options.serviceUrl + '/reverse', {
				key: this._key,
				location: location.lat + ',' + location.lng,
				outputFormat: 'json'
			}, function(data) {
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
			}, this);
		}
	}),

	factory: function(key, options) {
		return new L.Control.Geocoder.MapQuest(key, options);
	}
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util":11}],6:[function(require,module,exports){
(function (global){
var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
	Util = require('../util');

module.exports = {
	"class": L.Class.extend({
		options: {
			serviceUrl: '//search.mapzen.com/v1',
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
			Util.getJSON(this.options.serviceUrl + "/search", L.extend({
				'api_key': this._apiKey,
				'text': query
			}, this.options.geocodingQueryParams), function(data) {
				cb.call(context, _this._parseResults(data, "bbox"));
			});
		},

		suggest: function(query, cb, context) {
			var _this = this;
			Util.getJSON(this.options.serviceUrl + "/autocomplete", L.extend({
				'api_key': this._apiKey,
				'text': query
			}, this.options.geocodingQueryParams), function(data) {
				if (data.geocoding.timestamp > this._lastSuggest) {
					this._lastSuggest = data.geocoding.timestamp;
					cb.call(context, _this._parseResults(data, "bbox"));
				}
			});
		},

		reverse: function(location, scale, cb, context) {
			var _this = this;
			Util.getJSON(this.options.serviceUrl + "/reverse", L.extend({
				'api_key': this._apiKey,
				'point.lat': location.lat,
				'point.lon': location.lng
			}, this.options.reverseQueryParams), function(data) {
				cb.call(context, _this._parseResults(data, "bounds"));
			});
		},

		_parseResults: function(data, bboxname) {
			var results = [];
			L.geoJson(data, {
				pointToLayer: function (feature, latlng) {
					return L.circleMarker(latlng);
				},
				onEachFeature: function(feature, layer) {
					var result = {};
					result['name'] = layer.feature.properties.label;
					result[bboxname] = layer.getBounds();
					result['center'] = result[bboxname].getCenter();
					result['properties'] = layer.feature.properties;
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util":11}],7:[function(require,module,exports){
(function (global){
var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
	Util = require('../util');

module.exports = {
	"class": L.Class.extend({
		options: {
			serviceUrl: '//nominatim.openstreetmap.org/',
			geocodingQueryParams: {},
			reverseQueryParams: {},
			htmlTemplate: function(r) {
				var a = r.address,
					parts = [];
				if (a.road || a.building) {
					parts.push('{building} {road} {house_number}');
				}

				if (a.city || a.town || a.village) {
					parts.push('<span class="' + (parts.length > 0 ? 'leaflet-control-geocoder-address-detail' : '') +
						'">{postcode} {city} {town} {village}</span>');
				}

				if (a.state || a.country) {
					parts.push('<span class="' + (parts.length > 0 ? 'leaflet-control-geocoder-address-context' : '') +
						'">{state} {country}</span>');
				}

				return Util.template(parts.join('<br/>'), a, true);
			}
		},

		initialize: function(options) {
			L.Util.setOptions(this, options);
		},

		geocode: function(query, cb, context) {
			Util.jsonp(this.options.serviceUrl + 'search', L.extend({
				q: query,
				limit: 5,
				format: 'json',
				addressdetails: 1
			}, this.options.geocodingQueryParams),
			function(data) {
				var results = [];
				for (var i = data.length - 1; i >= 0; i--) {
					var bbox = data[i].boundingbox;
					for (var j = 0; j < 4; j++) bbox[j] = parseFloat(bbox[j]);
					results[i] = {
						icon: data[i].icon,
						name: data[i].display_name,
						html: this.options.htmlTemplate ?
							this.options.htmlTemplate(data[i])
							: undefined,
						bbox: L.latLngBounds([bbox[0], bbox[2]], [bbox[1], bbox[3]]),
						center: L.latLng(data[i].lat, data[i].lon),
						properties: data[i]
					};
				}
				cb.call(context, results);
			}, this, 'json_callback');
		},

		reverse: function(location, scale, cb, context) {
			Util.jsonp(this.options.serviceUrl + 'reverse', L.extend({
				lat: location.lat,
				lon: location.lng,
				zoom: Math.round(Math.log(scale / 256) / Math.log(2)),
				addressdetails: 1,
				format: 'json'
			}, this.options.reverseQueryParams), function(data) {
				var result = [],
				    loc;

				if (data && data.lat && data.lon) {
					loc = L.latLng(data.lat, data.lon);
					result.push({
						name: data.display_name,
						html: this.options.htmlTemplate ?
							this.options.htmlTemplate(data)
							: undefined,
						center: loc,
						bounds: L.latLngBounds(loc, loc),
						properties: data
					});
				}

				cb.call(context, result);
			}, this, 'json_callback');
		}
	}),

	factory: function(options) {
		return new L.Control.Geocoder.Nominatim(options);
	}
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util":11}],8:[function(require,module,exports){
(function (global){
var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
	Util = require('../util');

module.exports = {
	"class": L.Class.extend({
		options: {
			serviceUrl: '//photon.komoot.de/api/',
			reverseUrl: '//photon.komoot.de/reverse/',
			nameProperties: [
				'name',
				'street',
				'suburb',
				'hamlet',
				'town',
				'city',
				'state',
				'country'
			]
		},

		initialize: function(options) {
			L.setOptions(this, options);
		},

		geocode: function(query, cb, context) {
			var params = L.extend({
				q: query
			}, this.options.geocodingQueryParams);

			Util.getJSON(this.options.serviceUrl, params, L.bind(function(data) {
				cb.call(context, this._decodeFeatures(data));
			}, this));
		},

		suggest: function(query, cb, context) {
			return this.geocode(query, cb, context);
		},

		reverse: function(latLng, scale, cb, context) {
			var params = L.extend({
				lat: latLng.lat,
				lon: latLng.lng
			}, this.options.geocodingQueryParams);

			Util.getJSON(this.options.reverseUrl, params, L.bind(function(data) {
				cb.call(context, this._decodeFeatures(data));
			}, this));
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
						center: latLng,
						bbox: bbox,
						properties: f.properties
					});
				}
			}

			return results;
		},

		_deocodeFeatureName: function(f) {
			var j,
				name;
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util":11}],9:[function(require,module,exports){
(function (global){
var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
	Util = require('../util');

module.exports = {
	"class": L.Class.extend({
		options: {
			serviceUrl: 'http://api.what3words.com/'
		},

		initialize: function(accessToken) {
			this._accessToken = accessToken;
		},

		geocode: function(query, cb, context) {
			//get three words and make a dot based string
			Util.getJSON(this.options.serviceUrl +'w3w', {
				key: this._accessToken,
				string: query.split(/\s+/).join('.')
			}, function(data) {
				var results = [], loc, latLng, latLngBounds;
				if (data.position && data.position.length) {
					loc = data.words;
					latLng = L.latLng(data.position[0],data.position[1]);
					latLngBounds = L.latLngBounds(latLng, latLng);
					results[0] = {
						name: loc.join('.'),
						bbox: latLngBounds,
						center: latLng
					};
				}

				cb.call(context, results);
			});
		},

		suggest: function(query, cb, context) {
			return this.geocode(query, cb, context);
		},

		reverse: function(location, scale, cb, context) {
			Util.getJSON(this.options.serviceUrl +'position', {
				key: this._accessToken,
				position: [location.lat,location.lng].join(',')
			}, function(data) {
				var results = [],loc,latLng,latLngBounds;
				if (data.position && data.position.length) {
					loc = data.words;
					latLng = L.latLng(data.position[0],data.position[1]);
					latLngBounds = L.latLngBounds(latLng, latLng);
					results[0] = {
						name: loc.join('.'),
						bbox: latLngBounds,
						center: latLng
					};
				}
				cb.call(context, results);
			});
		}
	}),

	factory: function(accessToken) {
		return new L.Control.Geocoder.What3Words(accessToken);
	}
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util":11}],10:[function(require,module,exports){
(function (global){
var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
	Control = require('./control'),
	Nominatim = require('./geocoders/nominatim'),
	Bing = require('./geocoders/bing'),
	MapQuest = require('./geocoders/mapquest'),
	Mapbox = require('./geocoders/mapbox'),
	What3Words = require('./geocoders/what3words'),
	Google = require('./geocoders/google'),
	Photon = require('./geocoders/photon'),
	Mapzen = require('./geocoders/mapzen');

module.exports = L.Util.extend(Control["class"], {
	Nominatim: Nominatim["class"],
	nominatim: Nominatim.factory,
	Bing: Bing["class"],
	bing: Bing.factory,
	MapQuest: MapQuest["class"],
	mapQuest: MapQuest.factory,
	Mapbox: Mapbox["class"],
	mapbox: Mapbox.factory,
	What3Words: What3Words["class"],
	what3words: What3Words.factory,
	Google: Google["class"],
	google: Google.factory,
	Photon: Photon["class"],
	photon: Photon.factory,
	Mapzen: Mapzen["class"],
	mapzen: Mapzen.factory
});

L.Util.extend(L.Control, {
	Geocoder: module.exports,
	geocoder: Control.factory
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./control":1,"./geocoders/bing":2,"./geocoders/google":3,"./geocoders/mapbox":4,"./geocoders/mapquest":5,"./geocoders/mapzen":6,"./geocoders/nominatim":7,"./geocoders/photon":8,"./geocoders/what3words":9}],11:[function(require,module,exports){
(function (global){
var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
	lastCallbackId = 0,
	htmlEscape = (function() {
		// Adapted from handlebars.js
		// https://github.com/wycats/handlebars.js/
		var badChars = /[&<>"'`]/g;
		var possible = /[&<>"'`]/;
		var escape = {
		  '&': '&amp;',
		  '<': '&lt;',
		  '>': '&gt;',
		  '"': '&quot;',
		  '\'': '&#x27;',
		  '`': '&#x60;'
		};

		function escapeChar(chr) {
		  return escape[chr];
		}

		return function(string) {
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
		};
	})();

module.exports = {
	jsonp: function(url, params, callback, context, jsonpParam) {
		var callbackId = '_l_geocoder_' + (lastCallbackId++);
		params[jsonpParam || 'callback'] = callbackId;
		window[callbackId] = L.Util.bind(callback, context);
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url + L.Util.getParamString(params);
		script.id = callbackId;
		document.getElementsByTagName('head')[0].appendChild(script);
	},

	getJSON: function(url, params, callback) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState !== 4){
				return;
			}
			if (xmlHttp.status !== 200 && xmlHttp.status !== 304){
				callback('');
				return;
			}
			callback(JSON.parse(xmlHttp.response));
		};
		xmlHttp.open('GET', url + L.Util.getParamString(params), true);
		xmlHttp.setRequestHeader('Accept', 'application/json');
		xmlHttp.send(null);
	},

	template: function (str, data) {
		return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
			var value = data[key];
			if (value === undefined) {
				value = '';
			} else if (typeof value === 'function') {
				value = value(data);
			}
			return htmlEscape(value);
		});
	},

	htmlEscape: htmlEscape
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[10]);
