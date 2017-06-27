//#include "Permalink.js

L.Control.Permalink.include({
	/*
	options: {
		useMarker: true,
		markerOptions: {}
	},
	*/

	initialize_marker: function() {
		//console.info("Initialize marker");
		this.on('update', this._set_marker, this);
	},

	_set_marker: function(e) {
		//console.info("Set marker", e);
		var p = e.params;
		//if (!this.options.useMarker) return;
		if (this._marker) return;
		if (p.marker !== 1) return;
		if (p.mlat !== undefined && p.mlon !== undefined)
			return this._update({mlat: null, mlon: null,
					lat: p.mlat, lon: p.mlon, marker: 1});
		this._marker = new L.Marker(new L.LatLng(p.lat, p.lon),
						this.options.markerOptions);
		this._marker.bindPopup('<a href="' + this._update_href() + '">' + this.options.text + '</a>');
		this._map.addLayer(this._marker);
		this._update({marker: null});
	}
});
