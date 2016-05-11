/* global console: true */
L.Control.Distance = L.Control.extend({
	options: {
		position: 'topleft',
		popups: true
	},

	initialize: function (options) {
		L.Util.setOptions(this, options);
		this._line = new L.Polyline([], {editable: true});
		this._line.on('edit', this._update, this);
		this._line.on('click', function(e) {});
		this._active = false;
	},

	getLine: function() { return this._line; },

	onAdd: function(map) {
		var className = 'leaflet-control-distance',
		    container = this._container = L.DomUtil.create('div', className);

		function cb() {
			if (this._active)
				this._calc_disable();
			else
				this._calc_enable();
		}

		var link = this._link = this._createButton('Edit', 'leaflet-control-distance leaflet-control-distance-edit', container, cb, this);
		var del = this._link_delete = this._createButton('Delete', 'leaflet-control-distance leaflet-control-distance-delete', container, this._reset, this);
		var text = this._text = L.DomUtil.create('div', 'leaflet-control-distance-text', container);

		//text.style.display = 'inline';
		//text.style.float = 'right';

		this._map.addLayer(this._line);
		this._calc_disable();
		return container;
	},

	_createButton: function (title, className, container, fn, context) {
		var link = L.DomUtil.create('a', className, container);
		link.href = '#';
		link.title = title;

		L.DomEvent
			.addListener(link, 'click', L.DomEvent.stopPropagation)
			.addListener(link, 'click', L.DomEvent.preventDefault)
			.addListener(link, 'click', fn, context);

		return link;
	},

	onRemove: function(map) {
		this._calc_disable();
	},
	
	_calc_enable: function() {
		this._map.on('click', this._add_point, this);

		this._map.getContainer().style.cursor = 'crosshair';
		//this._map.addLayer(this._line);
		L.DomUtil.addClass(this._link, 'leaflet-control-distance-active');
		this._container.appendChild(this._link_delete);
		this._container.appendChild(this._text);
		this._active = true;
		this._line.editing.enable();
		if (!this._map.hasLayer(this._line))
			this._map.addLayer(this._line);
		this._update();
	},

	_calc_disable: function() {
		this._map.off('click', this._add_point, this);
		//this._map.removeLayer(this._line);
		this._map.getContainer().style.cursor = 'default';
		this._container.removeChild(this._link_delete);
		this._container.removeChild(this._text);
		L.DomUtil.removeClass(this._link, 'leaflet-control-distance-active');
		this._active = false;
		this._line.editing.disable();
	},

	_add_point: function (e) {
		var len = this._line.getLatLngs().length;
		this._line.addLatLng(e.latlng);
		this._line.editing.updateMarkers();
		this._line.fire('edit', {});
	},

	_reset: function(e) {
		this._line.setLatLngs([]);
		this._line.fire('edit', {});
		this._line.redraw();
		this._line.editing.updateMarkers();
	},

	_update: function(e) {
		console.info('Update');
		this._text.textContent = this._d2txt(this._distance_calc());
	},

	_d2txt: function(d) {
		if (d < 2000)
			return d.toFixed(0) + ' m';
		else
			return (d/1000).toFixed(1) + ' km';
	},

	_distance_calc: function(e) {
		var ll = this._line.getLatLngs();
		var d = 0, p = null;
		for (var i = 0; i < ll.length; i++) {
			if (i)
				d += p.distanceTo(ll[i]);
			if (this.options.popups) {
				var m = this._line.editing._markers[i];
				if (m) {
					m.bindPopup(this._d2txt(d));
					m.on('mouseover', m.openPopup, m);
					m.on('mouseout', m.closePopup, m);
				}
				}
			p = ll[i];
		}
		return d;
	}
});
