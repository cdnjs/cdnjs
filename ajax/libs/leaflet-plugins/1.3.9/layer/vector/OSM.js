L.OSM = L.FeatureGroup.extend({
	options: {
		async: true,
		forceAll: false
	},

	initialize: function(url, options) {
		L.Util.setOptions(this, options);
		this._url = url;
		this._layers = {};
		
		if (url) {
			this.addXML(url, options, this.options.async);
		}
	},
	
	loadXML: function(url, cb, options, async) {
		if (async === undefined) async = this.options.async;
		if (options === undefined) options = this.options;

		var req = new window.XMLHttpRequest();
		req.open('GET', url, async);
		req.overrideMimeType('text/xml');
		req.onreadystatechange = function() {
			if (req.readyState !== 4) return;
			if (req.status === 200) cb(req.responseXML, options);
		};
		req.send(null);
	},

	addXML: function(url, options, async) {
		var _this = this;
		var cb = function(xml, options) { _this._addXML(xml, options); };
		this.loadXML(url, cb, options, async);
	},

	_addXML: function(xml, options) {
		var layers = this.parseOSM(xml, options);
		if (!layers) return;
		this.addLayer(layers);
		this.fire('loaded');
	},

	parseOSM: function(xml, options) {
		var i, el, ll, layers = [];
		var nodes = {};
		var ways = {};
		var named = false;

		el = xml.getElementsByTagName('node');
		for (i = 0; i < el.length; i++) {
			var l = this.parse_node(el[i], xml, options);
			if (l === undefined) continue;
			nodes[l.osmid] = l;
			if (!this.options.forceAll && !l.tags.length) continue;
			var m = this.named_node(l, options);
			if (!ll) ll = m.getLatLng();
			if (this.parse_name(m, l, 'Node')) named = true;
			layers.push(m);
		}

		el = xml.getElementsByTagName('way');
		for (i = 0; i < el.length; i++) {
			if (i > 10) break;
			var way = this.parse_way(el[i], nodes, options);
			if (!way) continue;
			if (!ll) ll = way.getLatLngs()[0];
			if (this.parse_name(way, way, 'Way')) named = true;
			layers.push(way);
			ways[way.osmid] = way;
		}

		el = xml.getElementsByTagName('relation');
		for (i = 0; i < el.length; i++) {
			if (i > 10) break;
			var relation = this.parse_relation(el[i], ways, options);
			if (!relation) continue;
			if (!ll) ll = relation.getLatLngs()[0];
			if (this.parse_name(relation, relation, 'Relation')) named = true;
			layers.push(relation);
		}

		if (!layers.length) return;
		var layer = layers[0];
		if (layers.length > 1) 
			layer = new L.FeatureGroup(layers);
		if (!named) this.parse_name(xml, layer);
		layer.focusPoint = ll;
		return layer;
	},

	parse_name: function(layer, obj, obj_name) {
		if (!this.options.forceAll)
			if (!obj.tags || !obj.tags.length) return;
		var i, txt = '<table>';
		for (i = 0; i < obj.tags.length; i++) {
			var t = obj.tags[i];
			txt += '<tr><td>' + t.k + '</td><td>=</td><td>' + t.v + '</td></tr>';
		}
		txt += '</table>';
		txt = '<h2>' + obj_name + ' ' + obj.osmid + '</h2>' + txt;
		if (layer) layer.bindPopup(txt);
		return txt;
	},

	parse_tags: function(line) {
		var tags = [], el = line.getElementsByTagName('tag');
		for (var i = 0; i < el.length; i++)
			tags.push({k: el[i].getAttribute('k'), v: el[i].getAttribute('v')});
		return tags;
	},

	parse_node: function(e) {
		var n = { osmid: e.getAttribute('id'),
			lat:e.getAttribute('lat'),
			lon:e.getAttribute('lon')
		};
		n.ll = new L.LatLng(n.lat, n.lon);
		n.tags = this.parse_tags(e);
		return n;
	},

	parse_way: function(line, nodes, options) {
		var el = line.getElementsByTagName('nd');
		if (!el.length) return;
		var coords = [], tags = [];
		for (var i = 0; i < el.length; i++) {
			var ref = el[i].getAttribute('ref'), n = nodes[ref];
			if (!n) return;
			coords.push(n.ll);
		}
		var layer = new L.Polyline(coords, options);
		layer.tags = this.parse_tags(line);
		layer.osmid = line.getAttribute('id');
		return layer;
	},

	parse_relation: function(line, ways, options) {
		var el = line.getElementsByTagName('member');
		if (!el.length) return;
		var rt, coords = [], tags = this.parse_tags(line);
		var i;
		for (i = 0; i < tags.length; i++)
			if (tags[i].k === 'type') rt = tags[i].v;

		if (rt !== 'multipolygon' && rt !== 'boundary' && rt !== 'waterway')
			return;

		for (i = 0; i < el.length; i++) {
			var mt = el[i].getAttribute('type'), ref = el[i].getAttribute('ref');
			if (mt !== 'way') continue;
			var w = ways[ref];
			if (!w) return;
			coords.push(w);
		}
		if (!coords.length) return;
		var layer = new L.MultiPolyline(coords, options);
		layer.tags = this.parse_tags(line);
		layer.osmid = line.getAttribute('id');
		return layer;
	},

	named_node: function(node, options) {
		var marker = new L.Marker(new L.LatLng(node.lat, node.lon), options);
		return marker;
	}
});
