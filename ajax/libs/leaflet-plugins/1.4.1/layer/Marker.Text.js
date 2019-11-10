L.Icon.Text = L.Icon.extend({
	initialize: function (text, options) {
		this._text = text;
		L.Icon.prototype.initialize.apply(this, [options]);
	},

	createIcon: function() {
		var el = document.createElement('div');
		el.appendChild(document.createTextNode(this._text));
		this._setIconStyles(el, 'icon');
		el.style.textShadow = '2px 2px 2px #fff';
		return el;
	},

	createShadow: function() { return null; }

});

L.Marker.Text = L.Marker.extend({
	initialize: function (latlng, text, options) {
        	L.Marker.prototype.initialize.apply(this, [latlng, options]);
		this._fakeicon = new L.Icon.Text(text);
	},

	_initIcon: function() {
        	L.Marker.prototype._initIcon.apply(this);

		var i = this._icon, s = this._shadow, obj = this.options.icon;
		this._icon = this._shadow = null;

		this.options.icon = this._fakeicon;
        	L.Marker.prototype._initIcon.apply(this);
		this.options.icon = obj;

		if (s) {
			s.parentNode.removeChild(s);
			this._icon.appendChild(s);
		}
		
		i.parentNode.removeChild(i);
		this._icon.appendChild(i);

		var w = this._icon.clientWidth, h = this._icon.clientHeight;
		this._icon.style.marginLeft = -w / 2 + 'px';
		//this._icon.style.backgroundColor = "red";
		var off = new L.Point(w/2, 0);
		if (L.Browser.webkit) off.y = -h;
		L.DomUtil.setPosition(i, off);
		if (s) L.DomUtil.setPosition(s, off);
	}
});
