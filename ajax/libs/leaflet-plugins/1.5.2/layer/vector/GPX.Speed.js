//#include 'GPX.js'

(function () {

function d2h (d) {
	var hex = '0123456789ABCDEF';
	var r = '';
	d = Math.floor(d);
	while (d !== 0) {
		r = hex[d % 16] + r;
		d = Math.floor(d / 16);
	}
	while (r.length < 2) r = '0' + r;
	return r;
}

function gradient (color) {
	// First arc (0, PI) in HSV colorspace
	function f2h (d) { return d2h(256 * d); }
	if (color < 0)
		return '#FF0000';
	else if (color < 1.0/3)
		return '#FF' + f2h(3 * color) + '00';
	else if (color < 2.0/3)
		return '#' + f2h(2 - 3 * color) + 'FF00';
	else if (color < 1)
		return '#00FF' + f2h(3 * color - 2);
	else
		return '#00FFFF';
}

function gpx2time (s) {
	// 2011-09-24T12:07:53Z
	if (s.length !== 10 + 1 + 8 + 1)
		return new Date();
	return new Date(s);
}

L.GPX.include({
	options: {
		maxSpeed: 110,
		chunks: 200
	},

	speedSplitEnable: function (options) {
		L.Util.setOptions(this, options);
		return this.on('addline', this.speed_split, this);
	},

	speedSplitDisable: function () {
		return this.off('addline', this.speed_split, this);
	},

	speed_split: function (e) {
		var l = e.line.pop(), ll = l.getLatLngs();
		var chunk = Math.floor(ll.length / this.options.chunks);
		if (chunk < 3) chunk = 3;
		var p = null;
		for (var i = 0; i < ll.length; i += chunk) {
			var d = 0, t = null;
			if (i + chunk > ll.length)
				chunk = ll.length - i;
			for (var j = 0; j < chunk; j++) {
				if (p) d += p.distanceTo(ll[i+j]);
				p = ll[i + j];
				if (!t) t = gpx2time(p.meta.time);
			}
			p = ll[i + chunk - 1];
			t = (gpx2time(p.meta.time) - t) / (3600 * 1000);
			var speed = 0.001 * d / t;
			var color = gradient(speed / this.options.maxSpeed);
			var poly = new L.Polyline(ll.slice(i, i+chunk+1), {color: color, weight: 2, opacity: 1});
			poly.bindPopup('Dist: ' + d.toFixed() + 'm; Speed: ' + speed.toFixed(2) + ' km/h');
			e.line.push(poly);
		}
	}

});
})();
