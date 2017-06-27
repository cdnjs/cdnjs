//#include "Permalink.js

L.Control.Permalink.include({
	/*
	options: {
		useMarker: true,
		markerOptions: {}
	},
	*/

	initialize_layer: function() {
		this.on('update', this._set_layer, this);
		this.on('add', this._onadd_layer, this);
	},

	_onadd_layer: function(e) {
		this._map.on('layeradd', this._update_layer, this);
		this._map.on('layerremove', this._update_layer, this);
		this._update_layer();
	},

	_update_layer: function() {
		if (!this.options.layers) return;
		var layer = this.options.layers.currentBaseLayer();
		if (layer)
			this._update({layer: layer.name});
	},

	_set_layer: function(e) {
		var p = e.params;
		if (!this.options.layers || !p.layer) return;
		this.options.layers.chooseBaseLayer(p.layer);
	}
});

L.Control.Layers.include({
	chooseBaseLayer: function(name) {
		var layer, obj;
		for (var i in this._layers) {
			if (!this._layers.hasOwnProperty(i))
				continue;
			obj = this._layers[i];
			if (!obj.overlay && obj.name === name)
				layer = obj.layer;
		}
		if (!layer || this._map.hasLayer(layer))
			return;

		for (var j in this._layers) {
			if (!this._layers.hasOwnProperty(j))
				continue;
			obj = this._layers[j];
			if (!obj.overlay && this._map.hasLayer(obj.layer))
				this._map.removeLayer(obj.layer);
		}
		this._map.addLayer(layer);
		this._update();
	},

	currentBaseLayer: function() {
		for (var i in this._layers) {
			if (!this._layers.hasOwnProperty(i))
				continue;
			var obj = this._layers[i];
			if (obj.overlay) continue;
			if (!obj.overlay && this._map.hasLayer(obj.layer))
				return obj;
		}
	}
});

