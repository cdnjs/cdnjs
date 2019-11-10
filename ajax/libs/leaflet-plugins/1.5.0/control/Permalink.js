L.Control.Permalink = L.Control.extend({
	includes: L.Mixin.Events, 

	options: {
		position: 'bottomleft',
		useAnchor: true,
		useLocation: false,
		text: 'Permalink'
	},

	initialize: function(options) {
		L.Util.setOptions(this, options);
		this._params = {};
		this._set_urlvars();
		this.on('update', this._set_center, this);
		for (var i in this) {
			if (typeof(i) === 'string' && i.indexOf('initialize_') === 0)
				this[i]();
		}
	},

	onAdd: function(map) {
		this._container = L.DomUtil.create('div', 'leaflet-control-attribution leaflet-control-permalink');
		L.DomEvent.disableClickPropagation(this._container);
		this._map = map;
		this._href = L.DomUtil.create('a', null, this._container);
		this._href.innerHTML = this.options.text;

		map.on('moveend', this._update_center, this);
		this.fire('update', {params: this._params});
		this._update_center();

		if (this.options.useAnchor && 'onhashchange' in window) {
			var _this = this, fn = window.onhashchange;
			window.onhashchange = function() {
				_this._set_urlvars();
				if (fn) return fn();
			};
		}

		this.fire('add', {map: map});

		return this._container;
	},

	_update_center: function() {
		if (!this._map) return;

		var center = this._round_point(this._map.getCenter());
		this._update({zoom: String(this._map.getZoom()), lat: String(center.lat), lon: String(center.lng)});
	},

	_update_href: function() {
		var params = L.Util.getParamString(this._params);
		var sep = '?';
		if (this.options.useAnchor) sep = '#';
		var url = this._url_base + sep + params.slice(1);
		if (this._href) this._href.setAttribute('href', url);
		if (this.options.useLocation)
			location.replace('#' + params.slice(1));
		return url;
	},

	_round_point : function(point) {
		var bounds = this._map.getBounds(), size = this._map.getSize();
		var ne = bounds.getNorthEast(), sw = bounds.getSouthWest();

		var round = function (x, p) {
			if (p === 0) return x;
			var shift = 1;
			while (p < 1 && p > -1) {
				x *= 10;
				p *= 10;
				shift *= 10;
			}
			return Math.floor(x)/shift;
		};
		point.lat = round(point.lat, (ne.lat - sw.lat) / size.y);
		point.lng = round(point.lng, (ne.lng - sw.lng) / size.x);
		return point;
	},

	_update: function(obj, source) {
		for(var i in obj) {
			if (!obj.hasOwnProperty(i)) continue;
			if (obj[i] !== null && obj[i] !== undefined)
				this._params[i] = obj[i];
			else
				delete this._params[i];
		}

		this._update_href();
	},

	_set_urlvars: function()
	{
		var p;
		if (this.options.useAnchor) {
			p = L.UrlUtil.queryParse(L.UrlUtil.hash());
			this._url_base = window.location.href.split('#')[0];
		} else {
			p = L.UrlUtil.queryParse(L.UrlUtil.query());
			this._url_base = window.location.href.split('#')[0].split('?')[0];
		}
		
		function eq(x, y) {
			for(var i in x)
				if (x.hasOwnProperty(i) && x[i] !== y[i])
					return false;
			return true;
		}
			
		if (eq(p, this._params) && eq(this._params, p))
			return;
		this._params = p;
		this._update_href();
		this.fire('update', {params: this._params});
	},

	_set_center: function(e)
	{
		var params = e.params;
		if (params.zoom === undefined ||
		    params.lat === undefined ||
		    params.lon === undefined) return;
		this._map.setView(new L.LatLng(params.lat, params.lon), params.zoom);
	}
});

L.UrlUtil = {
	queryParse: function(s) {
		var p = {};
		var sep = '&';
		if (s.search('&amp;') !== -1)
			sep = '&amp;';
		var params = s.split(sep);
		for(var i = 0; i < params.length; i++) {
			var tmp = params[i].split('=');
			if (tmp.length !== 2) continue;
			p[tmp[0]] = decodeURI(tmp[1]);
		}
		return p;
	},

	query: function() {
		var href = window.location.href.split('#')[0], idx = href.indexOf('?');
		if (idx < 0)
			return '';
		return href.slice(idx+1);
	},

	hash: function() { return window.location.hash.slice(1); },

	updateParamString: function (q, obj) {
		var p = L.UrlUtil.queryParse(q);
		for (var i in obj) {
			if (obj.hasOwnProperty(i))
				p[i] = obj[i];
		}
		return L.Util.getParamString(p).slice(1);
	}
};
