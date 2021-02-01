/*
 * Metadata response has `zoomMin`/`zoomMax` properties, that currently (in most cases) are constant: `1`/`21`.
 * But in fact, imagery for 'Aerial*' and (deprecated) 'Road' sets may be absent at high zoom levels,
 * depending on location.
 * This addon is intended to find and apply *real* maximum available zoom (for current location) on layer add.
 * Ref: https://stackoverflow.com/questions/12788245/bing-maps-determine-max-zoom-level-for-static-aerial-map-with-rest-imagery-api
 *
 * @option applyMaxNativeZoom: Boolean|String = 'auto'
 * Determines whether `applyMaxNativeZoom` method will be called on layer add.
 * 'auto' means that option will be active for 'Aerial*' and 'Road' imagery sets
 * (but only if `maxNativeZoom` is not explicitely provided in options).
 *
 * @option applyMaxNativeZoom_validityRadius: Number = 10000000
 * Limits validity of 'measured' max zoom to specified radius.
 * Metadata requests are asynchronous, so when result is ready actual map position can be already changed.
 * if distance between old and new locations is longer than defined by this option,
 * then maxNativeZoom will be recalculated for new position.
 *
 * @method applyMaxNativeZoom(latlng: LatLng): this
 * Try to find maximum available zoom (for current location), and apply it as `maxNativeZoom`.
 * There is no official way, so use heuristic: check `vintageStart` in metadata response.
 * Currently method makes sense for 'Aerial*' and 'Road' imagery sets only.
 *
 * @event maxNativeZoomApplied: Event
 * Fired when applyMaxNativeZoom method succeed.
 * Extends event object with these properties: value, oldValue, latlng.
 */

L.BingLayer.mergeOptions({
        applyMaxNativeZoom: 'auto',
        applyMaxNativeZoom_validityRadius: 10000000
});

L.BingLayer.addInitHook(function () {
	var options = this.options;
	if (options.applyMaxNativeZoom === 'auto' && !options.maxNativeZoom) {
		options.applyMaxNativeZoom = options.imagerySet === 'Road' ||
			options.imagerySet.substring(0,6) === 'Aerial';
	}
	if (options.applyMaxNativeZoom) {
		this.on('add',function () {
			this.applyMaxNativeZoom(this._map.getCenter());
		});
	}
});

L.BingLayer.include({
	applyMaxNativeZoom: function (latlng) {
		var options = this.options;
		// https://docs.microsoft.com/en-us/bingmaps/rest-services/imagery/get-imagery-metadata#basic-metadata-url
		var request = this._makeApiUrl('Imagery/BasicMetadata', L.Util.template('{imagerySet}/{centerPoint}', {
			imagerySet: options.imagerySet,
			centerPoint: L.Util.template('{lat},{lng}', latlng)
		}));
		var zoomOffset = options.zoomOffset || 0;  // detectRetina sideeffects on maxZoom / maxNativeZoom
		this._findVintage(request, options.maxZoom + zoomOffset, function (zoom) {
			if (!zoom || !this._map) { return; }
			var newLatlng = this._map.getCenter();
			var validityRadius = this.options.applyMaxNativeZoom_validityRadius;
			if (newLatlng.distanceTo(latlng) > validityRadius) {
				this.applyMaxNativeZoom(newLatlng); return;
			}
			zoom -= zoomOffset;
			var oldValue = options.maxNativeZoom || options.maxZoom;
			options.maxNativeZoom = zoom;
			var mapZoom = this._map.getZoom();
			if (zoom<oldValue && zoom<mapZoom || zoom>oldValue && mapZoom>oldValue) {
				this._resetView();
			}
			this.fire('maxNativeZoomApplied',{
				latlng: latlng,
				value: zoom,
				oldValue: oldValue
			});
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
	}
});
