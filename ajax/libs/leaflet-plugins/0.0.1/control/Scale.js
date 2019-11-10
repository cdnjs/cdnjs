L.Control.Scale = L.Control.extend({
	options: {
		position: "bottomleft",
		useCanvas: null,
		width: 100
	},

	initialize: function(options) {
		L.Util.setOptions(this, options);
	},

	onAdd: function(map) {
		this._map = map;

		this._container = L.DomUtil.create('div', 'leaflet-control-attribution leaflet-control-scale');
		this._label = L.DomUtil.create('div', null, this._container);
		this._label.style.textAlign = 'right';

		if (!this.options.useCanvas && this.options.useCanvas != false)
			this.options.useCanvas = "HTMLCanvasElement" in window;
		if (this.options.useCanvas) {
			this._canvas = L.DomUtil.create('canvas', 'leaflet-canvas-marker', this._container);
		} else {
			this._canvas = L.DomUtil.create('div', null, this._container);
			this._canvas.style.border = "1px solid black";
			this._canvas.innerHTML = "&nbsp;";
			//this._canvas.style.padding = "none";
			//this._canvas.style.margin = "none";
			//this._canvas.style.width = 100;
			//this._canvas.style.height = 5;
		}
		map.on('zoomend', this._update, this);
		this._update();
		return this._container;
	},

	onRemove: function(map) {
		map._container.removeChild(this._label);
		map._container.removeChild(this._canvas);
		map.off('zoomend', this._reset);
	},

	getPosition: function() {
		return this.options.position;
	},

	getContainer: function() {
		return this._container;
	},

	_update: function() {
		if (!this._map) return;

		var size = this.options.width;

		var b = this._map.getBounds(), pb = this._map.getPixelBounds();
		var width = this._deg_length(b.getNorthEast(), b.getNorthWest());
		width = size * width / (pb.max.x - pb.min.x);
		var iw = this._round(width);

		if (iw >= 1)
			this._label.innerHTML = iw + " km";
		else
			this._label.innerHTML = Math.round(1000 * iw) + " m";

		size = size * iw / width;

		if (this.options.useCanvas) {
			this._canvas.width = size+1;
			this._canvas.height = 10+1;

			var ctx = this._canvas.getContext("2d");
			this._draw(ctx, size, 5);
		} else {
			this._canvas.style.width = size;
			this._canvas.style.height = 5;

		}
	},

	_draw: function(ctx, width, height) {
		ctx.beginPath();
		ctx.fillStyle = ctx.strokeStyle = '#000';
		ctx.lineWidth = 0.5;

		ctx.strokeRect(0, height, width/2, height);
		ctx.fillRect(0, height, width/2, height);
		ctx.strokeRect(width/2, height, width/2, height);

		ctx.moveTo(0, 0);
		ctx.lineTo(0, height);
		ctx.moveTo(width/2, 0);
		ctx.lineTo(width/2, height);
		ctx.moveTo(width, 0);
		ctx.lineTo(width, height);
		ctx.stroke();
	},

	_deg_length : function(p1, p2) {
		var deglen = 111.12 * L.LatLng.RAD_TO_DEG;
		var p1lat = p1.lat * L.LatLng.DEG_TO_RAD,
		    p1lng = p1.lng * L.LatLng.DEG_TO_RAD,
		    p2lat = p2.lat * L.LatLng.DEG_TO_RAD,
		    p2lng = p2.lng * L.LatLng.DEG_TO_RAD;
		return deglen * Math.acos(Math.sin(p1lat) * Math.sin(p2lat) +
				Math.cos(p1lat) * Math.cos(p2lat) * Math.cos(p2lng - p1lng));
	},

	_round : function (x) {
		var div = 1;
		while (div < x) div *= 10;
		while (div > x) div /= 10;
		var s = div;
		while (s < x) s += div;
		if (s > 5 * div) s = 10 * div;
		return s;
	}
});
