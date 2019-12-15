// Bing maps API: https://docs.microsoft.com/en-us/bingmaps/rest-services/

L.BingLayer = L.TileLayer.extend({
	options: {
		// imagerySet: https://docs.microsoft.com/en-us/bingmaps/rest-services/imagery/get-imagery-metadata#template-parameters
		// supported:
		// - Aerial, AerialWithLabels (Deprecated), AerialWithLabelsOnDemand
		// - Road (Deprecated), RoadOnDemand
		// - CanvasDark, CanvasLight, CanvasGray
		// not supported: Birdseye*, Streetside
		imagerySet: 'Aerial', // to be changed on next major version!!

		// https://docs.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/supported-culture-codes
		culture: '',

		// https://docs.microsoft.com/en-us/bingmaps/articles/custom-map-styles-in-bing-maps#custom-map-styles-in-the-rest-and-tile-services
		style: '',

		// https://blogs.bing.com/maps/2015/02/12/high-ppi-maps-now-available-in-the-bing-maps-ajax-control
		// not documented in REST API docs, but working
		// warning: deprecated imagery sets may not support some values (depending also on zoom level)
		retinaDpi: 'd2',

		attribution: 'Bing',
		minZoom: 1,
		maxZoom: 21,
		// Actual `maxZoom` value may be less, depending on imagery set / coverage area
		// - 19~20 for all 'Aerial*'
		// - 20 for 'Road' (Deprecated)

		applyMaxNativeZoom: 'auto'
		// try to determine maximum available zoom (for current location) on layer add.
		// makes sense only for 'Aerial*' and 'Road' imagery sets.
	},

	initialize: function (key, options) {
		if (typeof key === 'object') {
			options = key;
			key = false;
		}
		L.TileLayer.prototype.initialize.call(this, null, options);

		options = this.options;
		options.key = options.key || options.bingMapsKey;
		options.imagerySet = options.imagerySet || options.type;
		if (key) { options.key = key; }
		if (options.applyMaxNativeZoom === 'auto' && !options.maxNativeZoom) {
			options.applyMaxNativeZoom = options.imagerySet==='Road' ||
				options.imagerySet.substring(0,6)==='Aerial';
		}
	},

	tile2quad: function (x, y, z) {
		var quad = '';
		for (var i = z; i > 0; i--) {
			var digit = 0;
			var mask = 1 << i - 1;
			if ((x & mask) !== 0) { digit += 1; }
			if ((y & mask) !== 0) { digit += 2; }
			quad = quad + digit;
		}
		return quad;
	},

	getTileUrl: function (coords) {
		var data = {
			subdomain: this._getSubdomain(coords),
			quadkey: this.tile2quad(coords.x, coords.y, this._getZoomForUrl()),
			culture: this.options.culture // compatibility for deprecated imagery sets ('Road' etc)
		};
		return L.Util.template(this._url, data);
	},

	callRestService: function (request, callback, context) {
		context = context || this;
		var uniqueName = '_bing_metadata_' + L.Util.stamp(this);
		while (window[uniqueName]) { uniqueName += '_'; }
		request += '&jsonp=' + uniqueName;
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', request);
		window[uniqueName] = function (response) {
			delete window[uniqueName];
			script.remove();
			if (response.errorDetails) {
				throw new Error(response.errorDetails);
			}
			callback.call(context, response);
		};
		document.body.appendChild(script);
	},

	_makeApiUrl: function (restApi, resourcePath, query) {
		var baseAPIparams = {
			version: 'v1',
			restApi: restApi,
			resourcePath: resourcePath
		};
		query = L.extend({
			// errorDetail: true, // seems no effect
			key: this.options.key
		}, query);

		// https://docs.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/base-url-structure
		var template = 'https://dev.virtualearth.net/REST/{version}/{restApi}/{resourcePath}'; // ?queryParameters&key=BingMapsKey
		return L.Util.template(template, baseAPIparams) + L.Util.getParamString(query);
	},

	loadMetadata: function () {
		if (this.metaRequested) { return; }
		this.metaRequested = true;
		var options = this.options;
		// https://docs.microsoft.com/en-us/bingmaps/rest-services/imagery/get-imagery-metadata#complete-metadata-urls
		var request = this._makeApiUrl('Imagery/Metadata', options.imagerySet, {
			UriScheme: 'https',
			include: 'ImageryProviders',
			culture: options.culture,
			style: options.style
		});
		this.callRestService(request, function (meta) {
			var r = meta.resourceSets[0].resources[0];
			if (!r.imageUrl) { throw new Error('imageUrl not found in response'); }
			if (r.imageUrlSubdomains) { options.subdomains = r.imageUrlSubdomains; }
			this._providers = r.imageryProviders ? this._prepAttrBounds(r.imageryProviders) : [];
			this._attributions = [];
			this._url = r.imageUrl;
			if (options.retinaDpi && options.detectRetina && options.zoomOffset) {
				this._url += '&dpi=' + options.retinaDpi;
			}
			this.fire('load', {meta: meta});
			if (this._map) { this._update(); }
		});
	},

	_prepAttrBounds: function (providers) {
		providers.forEach(function (provider) {
			provider.coverageAreas.forEach(function (area) {
				area.bounds = L.latLngBounds(
					[area.bbox[0], area.bbox[1]],
					[area.bbox[2], area.bbox[3]]
				);
			});
		});
		return providers;
	},

	applyMaxNativeZoom: function (latlng) {
		var options = this.options;
		// https://docs.microsoft.com/en-us/bingmaps/rest-services/imagery/get-imagery-metadata#basic-metadata-url
		var request = this._makeApiUrl('Imagery/BasicMetadata', L.Util.template('{imagerySet}/{centerPoint}', {
			imagerySet: options.imagerySet,
			centerPoint: L.Util.template('{lat},{lng}', latlng)
		}));
		var zoomOffset = options.zoomOffset || 0;  // detectRetina sideeffects on maxZoom / maxNativeZoom
		this._findVintage(request, options.maxZoom + zoomOffset, function (zoom) {
			if (zoom) {
				zoom -= zoomOffset;
				var oldValue = options.maxNativeZoom || options.maxZoom;
				options.maxNativeZoom = zoom;
				var mapZoom = this._map && this._map.getZoom();
				if (mapZoom &&
					(zoom<oldValue && zoom<mapZoom || zoom>oldValue && mapZoom>oldValue)) {
					this._resetView();
				}
			}
		});
		return this;
	},

	_findVintage: function (request, zoomLevel, callback, context) {
		// there is no official way, so use heuristic: check `vintageStart` in metadata response
		this.callRestService(request + '&zoomLevel='+zoomLevel, function (meta) {
			if (meta.resourceSets[0].resources[0].vintageStart || zoomLevel === 0) {
				return callback.call(context || this, zoomLevel);
			}
			this._findVintage(request, zoomLevel-1, callback, context);
		});
	},

	_update: function (center) {
		if (!this._url) { return; }
		L.GridLayer.prototype._update.call(this, center);
		this._update_attribution();
	},

	_update_attribution: function (remove) {
		var attributionControl = this._map.attributionControl;
		if (!attributionControl) {
			this._attributions = {}; return;
		}
		var bounds = this._map.getBounds();
		bounds = L.latLngBounds(bounds.getSouthWest().wrap(), bounds.getNorthEast().wrap());
		var zoom = this._getZoomForUrl();
		var attributions = this._providers.map(function (provider) {
			return remove ? false : provider.coverageAreas.some(function (area) {
				return zoom <= area.zoomMax && zoom >= area.zoomMin &&
					bounds.intersects(area.bounds);
			});
		});
		attributions.forEach(function (a,i) {
			if (a == this._attributions[i]) {
				return;
			} else if (a) {
				attributionControl.addAttribution(this._providers[i].attribution);
			} else {
				attributionControl.removeAttribution(this._providers[i].attribution);
			}
		}, this);
		this._attributions = attributions;
	},

	onAdd: function (map) {
		// Note: Metadata could be loaded earlier, on layer initialize,
		//       but according to docs even such request is billable:
		//       https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/understanding-bing-maps-transactions#rest-services
		//       That's why it's important to defer it till BingLayer is actually added to map
		this.loadMetadata();

		if (this.options.applyMaxNativeZoom) {
			this.applyMaxNativeZoom(map.getCenter());
		}
		L.GridLayer.prototype.onAdd.call(this, map);
	},

	onRemove: function (map) {
		this._update_attribution(true);
		L.GridLayer.prototype.onRemove.call(this, map);
	}
});

L.bingLayer = function (key, options) {
	return new L.BingLayer(key, options);
};
