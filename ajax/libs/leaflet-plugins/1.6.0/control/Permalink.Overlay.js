//#include "Permalink.js

L.Control.Permalink.include({

	initialize_overlay: function () {
		this.on('update', this._set_overlays, this);
		this.on('add', this._onadd_overlay, this);
	},

	_onadd_overlay: function () {
		this._map.on('overlayadd', this._update_overlay, this);
		this._map.on('overlayremove', this._update_overlay, this);
		this._update_overlay();
	},

	_update_overlay: function () {
		if (!this.options.layers) return;
		var overlayflags = this.options.layers.overlayFlags();
		if (overlayflags && overlayflags !== '') {
			this._update({overlays: overlayflags});
		}
	},

	_set_overlays: function (e) {
		var p = e.params;
		if (!this.options.layers || !p.overlays) return;
		this.options.layers.setOverlays(p.overlays);
	}
});

L.Control.Layers.include({
	setOverlays: function (overlayflags) {
		var obj, idx=0;
		for (var i in this._layers) {
			if (!this._layers.hasOwnProperty(i)) continue;
			obj = this._layers[i];
			if (obj.overlay) {
				// visible if not specified or flag==T
				var visible = (idx >= overlayflags.length || overlayflags[idx] === 'T');
				idx++;
				if (!visible && this._map.hasLayer(obj.layer)) {
					this._map.removeLayer(obj.layer);
				} else if (visible && !this._map.hasLayer(obj.layer)) {
					this._map.addLayer(obj.layer);
				}
			}
		}
	},

	overlayFlags: function () {
		var flags = '';
		for (var i in this._layers) {
			if (!this._layers.hasOwnProperty(i))
				continue;
			var obj = this._layers[i];
			if (!obj.overlay) continue;
			if (obj.overlay) {
				if (this._map.hasLayer(obj.layer)) {
					flags += 'T';
				} else {
					flags += 'F';
				}
			}
		}
		return flags;
	}
});