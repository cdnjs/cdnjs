/*!
 * @version 1.0.0
 * @author Barin Britva
 * @license The MIT License (MIT) Copyright (c) 2014
 * @link https://github.com/barinbritva/coordinates-picker
 */

(function(global, factory) {
	if (typeof define === 'function' && define.amd) {
		return define(['jquery', 'googlemaps'], factory);
	}
	else {
		return global['BarinBritva.CoordinatesPicker'] = factory(global['jQuery'], global['google']);
	}
})(this, function($, google) {
	/**
	 * @typedef {object} jQuery
	 */

	/**
	 * @typedef {object} google
	 * @property {object} maps
	 * @property {object} maps.LatLng
	 * @property {object} maps.Marker
	 * @property {object} maps.Geocoder
	 */

	/**
	 * @typedef {object} google
	 * @property {object} maps
	 */

	/**
	 * @typedef {object} google.maps
	 * @property {object} LatLng
	 * @property {object} Marker
	 * @property {object} Geocoder
	 */

	/**
	 * @typedef {object} google.maps.LatLng
	 */

	/**
	 * @typedef {object} google.maps.Marker
	 */

	/**
	 * @typedef {object} google.maps.Geocoder
	 */

	/**
	 * @typedef {object} zoomLevels
	 * @property {number} zoomLevels.country
	 * @property {number} zoomLevels.locality
	 * @property {number} zoomLevels.route
	 * @property {number} zoomLevels.street_address
	 */

	if (typeof(BarinBritva) === 'undefined') {
		BarinBritva = {};
	}

	/**
	 * @namespace BarinBritva
	 * @class CoordinatesPicker
	 * @param {object} options
	 * @param {jQuery} options.fields
	 * @param {jQuery} options.container
	 * @param {jQuery} options.coordinates
	 * @param {number[]|google.maps.LatLng} options.center
	 * @param {zoomLevels} options.zooms
	 * @param {object} options.marker
	 * @param {object} options.map
	 * @param {string} options.format
	 * @param {boolean} options.selectValue
	 * @constructor
	 */
	BarinBritva.CoordinatesPicker = function (options) {
		this._construct(options);
	};

	/**
	 *
	 * @typedef {object} BarinBritva.CoordinatesPicker
	 */
	BarinBritva.CoordinatesPicker.prototype = {
		/**
		 * @property {jQuery} _addressFields
		 * @protected
		 */
		_addressFields: null,
		/**
		 * @property {jQuery} _mapContainer
		 * @protected
		 */
		_mapContainer: null,
		/**
		 * @property {jQuery} _coordinateField
		 * @protected
		 */
		_coordinateField: null,
		/**
		 * @property {string} _coordinatesFormat
		 * @protected
		 */
		_coordinatesFormat: 'lng lat',

		/**
		 * @property {google.maps.LatLng} _defaultCoordinates
		 * @protected
		 */
		_defaultCoordinates: new google.maps.LatLng(59.95, 30.317),
		/**
		 * @property {number} _defaultZoom
		 * @protected
		 */
		_defaultZoom: 4,
		/**
		 * @property {zoomLevels} _zoomLevels
		 * @protected
		 */
		_zoomLevels: {
			country: 4,
			locality: 10,
			route: 15,
			street_address: 17
		},
		/**
		 * @property {object} _mapParams
		 * @property {number} _mapParams.mapTypeId
		 * @protected
		 */
		_mapParams: {
			mapTypeId: google.maps.MapTypeId.ROADMAP
		},
		/**
		 * @property {object} _markerParams
		 * @property {boolean} _markerParams.draggable
		 * @property {number} _markerParams.animation
		 * @protected
		 */
		_markerParams: {
			draggable: true,
			animation: google.maps.Animation.DROP
		},
		/**
		 * @property {boolean} _selectValue
		 * @protected
		 */
		_selectValue: false,

		/**
		 * @property {google.maps} _map
		 * @protected
		 */
		_map: null,
		/**
		 * @property {google.maps.Geocoder} _geocoder
		 * @protected
		 */
		_geocoder: new google.maps.Geocoder(),
		/**
		 * @property {google.maps.Marker} _marker
		 */
		_marker: null,

		/**
		 * @property {object} _cache
		 * @protected
		 */
		_cache: {},
		/**
		 * @property {string} _lastAddress
		 * @protected
		 */
		_lastAddress: '',

		/**
		 *
		 * @param {string} type
		 * @returns {number}
		 * @protected
		 */
		_getZoomLevel: function (type) {
			var levels = this._zoomLevels;

			if (typeof levels[type] === 'undefined') {
				var mapZoom = this._map.getZoom();
				return typeof mapZoom === 'undefined' ? this._defaultZoom : mapZoom;
			}
			else {
				return levels[type];
			}
		},

		/**
		 *
		 * @param {object} params
		 * @protected
		 * @constructor
		 */
		_construct: function (params) {
			this._setParams(params);
			delete(params);

			this._initMap();
			this._watchAddress();
		},

		/**
		 *
		 * @param {object} params
		 * @protected
		 */
		_setParams: function(params) {
			var necessary = ['fields', 'container', 'coordinates'];

			for (var key in necessary) {
				var option = params[necessary[key]];
				if (!(option instanceof jQuery) || option.size() == 0) {
					throw new Error('Parameter "'+necessary[key]+'" is empty or not jQuery object.');
				}
			}

			this._addressFields = params.fields;
			this._mapContainer = params.container;
			this._coordinateField = params.coordinates;

			if (typeof(params.format) !== 'undefined') {
				if (typeof(params.format) === 'string') {
					this._coordinatesFormat = params.format;
				}
				else {
					throw new Error('Parameter "format" must be string value.');
				}
			}

			if (typeof(params.selectValue) !== 'undefined') {
				if (typeof(params.selectValue) === 'boolean') {
					this._selectValue = params.selectValue;
				}
				else {
					throw new Error('Parameter "selectValue" must be boolean value.');
				}
			}

			if (typeof(params.center) !== 'undefined') {
				if (params.center instanceof google.maps.LatLng) {
					this._defaultCoordinates = params.center;
				}
				else if (params.center instanceof Array) {
					if (params.center.length !== 2 || isNaN(params.center[0]) || isNaN(params.center[1])) {
						throw new Error('Parameter "center" must have only two numbers.');
					}
					this._defaultCoordinates = new google.maps.LatLng(params.center[0], params.center[1])
				}
				else {
					throw new Error('Parameter "center" is not google.maps.LatLng object or array.');
				}
			}

			if (typeof(params.zooms) !== 'undefined') {
				if (params.zooms instanceof Object) {
					var zooms = params.zooms;
					if (typeof(zooms.initial) !== 'undefined' && !isNaN(zooms.initial)) {
						this._defaultZoom = zooms.initial;
					}

					if (typeof(zooms.country) !== 'undefined' && !isNaN(zooms.country)) {
						this._zoomLevels.country = zooms.country;
					}

					if (typeof(zooms.locality) !== 'undefined' && !isNaN(zooms.locality)) {
						this._zoomLevels.locality = zooms.locality;
					}

					if (typeof(zooms.route) !== 'undefined' && !isNaN(zooms.route)) {
						this._zoomLevels.route = zooms.route;
					}

					if (typeof(zooms.street_address) !== 'undefined' && !isNaN(zooms.street_address)) {
						this._zoomLevels.street_address = zooms.street_address;
					}
				}
				else {
					throw new Error('Parameter "zooms" is not object.');
				}
			}

			if (typeof(params.marker) !== 'undefined' && (params.marker instanceof Object)) {
				for (var key in params.marker) {
					this._markerParams[key] = params.marker[key];
				}
			}

			if (typeof(params.map) !== 'undefined' && (params.map instanceof Object)) {
				for (var key in params.map) {
					this._mapParams[key] = params.map[key];
				}
			}
		},

		/**
		 *
		 * @protected
		 */
		_initMap: function() {
			var params = this._mapParams;
			var map = new google.maps.Map(this._mapContainer[0], params);

			var self = this;
			google.maps.event.addListenerOnce(map, 'idle', function () {
				self._initView();
			});

			this._map = map;
		},

		/**
		 *
		 * @protected
		 */
		_initView: function() {
			var position = this._getPositionFromField();

			if (position instanceof google.maps.LatLng) {
				this._initByCoordinates(position);
			}
			else if (this._hasAddress()) {
				this._initByAddress();
			}
			else {
				this._initByDefault();
			}
		},

		/**
		 *
		 * @returns {boolean|google.maps.LatLng}
		 * @protected
		 */
		_getPositionFromField: function () {
			var position = false;
			var format = this._coordinatesFormat;

			var delimiter = format.replace('lat', '');
			delimiter = delimiter.replace('lng', '');

			var coordinates = this._coordinateField.val().split(delimiter);

			if (coordinates.length == 2 && !isNaN(coordinates[0]) && !isNaN(coordinates[1])) {
				if (format.indexOf('lng') < format.indexOf('lat')) {
					position = new google.maps.LatLng(coordinates[1], coordinates[0]);
				}
				else {
					position = new google.maps.LatLng(coordinates[0], coordinates[1]);
				}
			}

			return position;
		},

		/**
		 *
		 * @returns {boolean}
		 * @protected
		 */
		_hasAddress: function() {
			return (this._getAddressFromFields() != '');
		},

		/**
		 *
		 * @returns {string}
		 * @protected
		 */
		_getAddressFromFields: function() {
			var self = this,
					address = '';

			this._addressFields.each(function () {
				var $this = $(this);

				if ($this.val() != '') {
					var tagName = $this.prop("tagName").toLowerCase();
					if (tagName === 'select' && !self._selectValue) {
						address += $this.find('option:selected').text();
					}
					else {
						address += $this.val();
					}
					address += ',';
				}
			});
			address = address.replace(/\,+$/,'');

			return address;
		},

		/**
		 *
		 * @param {google.maps.LatLng} position
		 * @protected
		 */
		_initByCoordinates: function(position) {
			var zoom = this._getZoomLevel('street_address');

			this._markPlace(position, zoom);
		},

		/**
		 *
		 * @param {google.maps.LatLng} position
		 * @param {number} zoom
		 * @protected
		 */
		_markPlace: function(position, zoom) {
			this._setView(position, zoom);
			this._putMarker(position);
		},

		/**
		 *
		 * @param {google.maps.LatLng} position
		 * @param {number} zoom
		 * @protected
		 */
		_setView: function(position, zoom) {
			this._map.setCenter(position);
			this._map.setZoom(zoom);
			this._burnEvent({type: 'viewchange'});
		},

		/**
		 *
		 * @param {google.maps.LatLng} position
		 * @protected
		 */
		_putMarker: function(position) {
			var marker = this._marker;

			if (marker === null || !this._isEqualCoordinates(marker.getPosition(), position)) {
				this._removeMarker();

				var params = this._markerParams;
				params.position = position;
				params.map = this._map;

				marker = new google.maps.Marker(params);

				this._marker = marker;
				this._setCoordinates(position);

				var self = this;
				google.maps.event.addListener(marker, 'dragend', function (event) {
					self._setCoordinates(event.latLng);
				});
			}
		},

		/**
		 *
		 * @param {google.maps.LatLng} position1
		 * @param {google.maps.LatLng} position2
		 * @returns {boolean}
		 * @protected
		 */
		_isEqualCoordinates: function(position1, position2) {
			return position1.lat() === position2.lat() && position1.lng() === position2.lng();
		},

		/**
		 *
		 * @param {google.maps.LatLng} position
		 * @protected
		 */
		_setCoordinates: function(position) {
			var lat = position.lat(),
					lng = position.lng();

			this._coordinateField.val(this._formatCoordinates(position));
			this._burnCoordinatesChange();
		},

		/**
		 *
		 * @param {google.maps.LatLng} position
		 * @param {string} format
		 * @returns {string}
		 * @protected
		 */
		_formatCoordinates: function(position, format) {
			var coordinates = '';
			format = format || this._coordinatesFormat;

			if (position !== null) {
				coordinates = format.replace('lat', position.lat());
				coordinates = coordinates.replace('lng', position.lng());
			}

			return coordinates;
		},

		/**
		 *
		 * @protected
		 */
		_burnCoordinatesChange: function() {
			var marker = this._marker;
			var data = {
				type: 'coordschange',
				marker: marker
			}

			data.position = this.getPosition();

			this._burnEvent(data);
		},

		/**
		 *
		 * @protected
		 */
		_removeMarker: function() {
			if (this._marker !== null) {
				this._marker.setMap(null);
				this._coordinateField.val('');
			}
		},

		/**
		 *
		 * @protected
		 */
		_initByAddress: function() {
			var self = this;
			this._geocode(this._getAddressFromFields(), function(response) {
				if (response.status == google.maps.GeocoderStatus.OK) {
					self._markPlaceFromGeocoding(response);
				}
				else {
					this._initByDefault();
				}
			});
		},

		/**
		 *
		 * @param {object} response
		 * @param {string} response.status - Google Maps Geocoder status
		 * @param {object} response.results - Google Maps Geocoder results
		 * @protected
		 */
		_markPlaceFromGeocoding: function(response) {
			var position = response.results[0].geometry.location;
			var zoom = this._getZoomLevel(response.results[0].types[0]);

			this._markPlace(position, zoom);
		},

		/**
		 *
		 * @param {string} address
		 * @param {function} callback
		 * @protected
		 */
		_geocode: function(address, callback) {
			this._lastAddress = address;
			var self = this;

			this._burnEvent({
				type: 'geocodingstart',
				address: address
			});

			this._geocoder.geocode({'address': address}, function(results, status) {
				self._burnEvent({
					type: 'geocodingend',
					address: address,
					status: status,
					results: results
				});

				var response = {status: status, results: results};

				self._cache[address] = response;

				callback(response);
			});
		},

		/**
		 *
		 * @protected
		 */
		_initByDefault: function() {
			var position = this._defaultCoordinates;
			var zoom = this._defaultZoom;

			this._setView(position, zoom);
		},

		/**
		 *
		 * @protected
		 */
		_watchAddress: function () {
			var self = this;
			var runGeocode = 0;

			this._addressFields.on('change keyup', function () {
				var address = self._getAddressFromFields();

				if (address !== '' && address !== self._lastAddress) {
					if (runGeocode > 0) {
						clearTimeout(runGeocode);
					}

					runGeocode = setTimeout(function () {
						if (self._isInCache(address)) {
							self._markPlaceFromGeocoding(self._getCachedAddress(address));
						}
						else {
							self._geocode(address, function (response) {
								if (response.status==google.maps.GeocoderStatus.OK) {
									self._markPlaceFromGeocoding(response);
								}
							});
						}
					}, 500);
				}
			});
		},

		/**
		 *
		 * @param {string} address
		 * @returns {boolean}
		 * @protected
		 */
		_isInCache: function(address) {
			return this._cache.hasOwnProperty(address);
		},

		/**
		 *
		 * @param {string} address
		 * @returns {object}
		 * @protected
		 */
		_getCachedAddress: function(address) {
			return this._cache[address];
		},

		/**
		 *
		 * @param {object} data
		 * @param {string} data.type - Event type
		 * @protected
		 */
		_burnEvent: function(data) {
			var customEvent = jQuery.Event(data.type);

			delete(data.type);

			for (var index in data) {
				customEvent[index] = data[index];
			}

			customEvent.map = this._map;
			customEvent.mapCenter = this._map.getCenter();
			customEvent.mapZoom = this._map.getZoom();

			this._mapContainer.trigger(customEvent);
		},

		/**
		 *
		 * @returns {google.maps}
		 */
		getMap: function() {
			return this._map;
		},

		/**
		 *
		 * @returns {null|google.maps.Marker}
		 */
		getMarker: function() {
			return this._marker;
		},

		/**
		 *
		 * @returns {null|google.maps.LatLng}
		 */
		getPosition: function() {
			var marker = this._marker;
			return marker === null ? null : marker.getPosition();
		},

		/**
		 *
		 * @param {string} format
		 * @returns {string}
		 */
		getPoint: function(format) {
			return this._formatCoordinates(this.getPosition(), format);
		}
	}

	return BarinBritva.CoordinatesPicker;
});