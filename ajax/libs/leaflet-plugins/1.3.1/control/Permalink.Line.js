//#include "Permalink.js

L.Control.Permalink.include({
	/*
	options: {
		line: null
	},
	*/

	initialize_line: function() {
		this.on('update', this._set_line, this);
		this.on('add', this._onadd_line, this);
	},

	_onadd_line: function(e) {
		if (!this.options.line) return;
		this.options.line.on('edit', this._update_line, this);
		this._update_line();
	},

	_update_line: function() {
		if (!this.options.line) return;
		var line = this.options.line;
		if (!line) return;
		var text = [], coords = line.getLatLngs();
		if (!coords.length)
			return this._update({line: null});
		for (var i in coords)
			text.push(coords[i].lat.toFixed(4) + ',' + coords[i].lng.toFixed(4));
		this._update({line: text.join(';')});
	},

	_set_line: function(e) {
		var p = e.params, l = this.options.line;
		if (!l || !p.line) return;
		var coords = [], text = p.line.split(';');
		for (var i in text) {
			var ll = text[i].split(',');
			if (ll.length !== 2) continue;
			coords.push(new L.LatLng(ll[0], ll[1]));
		}
		if (!coords.length) return;
		l.setLatLngs(coords);
		if (!this._map.hasLayer(l))
			this._map.addLayer(l);
	}
});
