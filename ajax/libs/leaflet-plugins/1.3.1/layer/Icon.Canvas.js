L.Icon.Canvas = L.Icon.extend({
	options: {
		iconSize: new L.Point(20, 20), // Have to be supplied
		/*
		iconAnchor: (Point)
		popupAnchor: (Point)
		*/
		className: 'leaflet-canvas-icon'
	},

	createIcon: function () {
		var e = document.createElement('canvas');
		this._setIconStyles(e, 'icon');
		var s = this.options.iconSize;
		e.width = s.x;
		e.height = s.y;
		this.draw(e.getContext('2d'), s.x, s.y);
		return e;
	},

	createShadow: function () {
		return null;
	},

	draw: function(canvas, width, height) {
	}
});
