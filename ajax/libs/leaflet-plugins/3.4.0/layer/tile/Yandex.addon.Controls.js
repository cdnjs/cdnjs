// https://tech.yandex.com/maps/doc/jsapi/2.1/dg/concepts/controls-docpage/
// This addon allows using of Yandex controls just specify them in options,
// without direct ymaps JSAPI calls.

// @option <controlName>: Boolean or Object
// (where <controlName> should match valid control name)
// Adds a Yandex control on map, optionally with given parameters (as option's value).
// - Valid control `name` values see in api docs:
//   https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.Manager-docpage/#method_detail__add
//   Note that `parameters` is not the same as mentioned there `options`
//   (but `options` can be included in `parameters`)
// - Available `parameters` see in corresponding control docs
//   (`parameters.data`, `parameters.options`, `parameters.state`).
// - Some controls need additional handling to integrate seamlessly into Leaflet map.
//   That is out of scope of this addon, but may be provided in user code.

// @option controlsContainerStyle: Object
// Style applied to ymaps controls container in order to align / prevent overlapping with Leaflet controls.

// @option controlsSeparate: Boolean = undefined
// Separate Yandex 'controls' and 'copyrights' panes from main container
// and put them to Leaflet's controls container.
// (In some cases this can solve issues with controls positioning)

/* global ymaps: true */

L.Yandex.mergeOptions({
	controlsContainerStyle: {
		left: '45px',
		right: '57px',
		top: '3px',
		width: 'auto'
	}
});

L.Yandex.include({
	_addControl: function (name, parameters) {
		if (!this._map) { // ymaps API expects map to be in DOM
			return this.once('add',function () {
				this._addControl(name, parameters);
			});
		}
		var defaults = this._controlOptionsDefault;
		var options = L.extend({}, defaults, defaults[name], parameters.options);
		this._yandex.controls.add(name, options);
		if (typeof parameters === 'object') {
			var control = this._yandex.controls.get(name);
			['data','state'].forEach(function (manager) {
				if (manager in parameters) {
					control[manager].set(parameters[manager]);
				}
			});
		}
	},

	// Some default values to facilitate Yandex controls seamless integration
	_controlOptionsDefault: {
		size: 'small', float: 'right',
		typeSelector: {panoramasItemMode: 'off'}
	}
});

L.Yandex.addInitHook('on', 'load', function () {
	var options = this.options;
	if (options.controlsContainerStyle) {
		this._setStyle(this._yandex.controls.getContainer(), options.controlsContainerStyle);
	}
	for (var key in options) {
		if (ymaps.control.storage.get(key)) { // check if `key` is valid control name
			this._addControl(key, options[key]);
		}
	}

	if (!options.controlsSeparate) { return; }
	this._controls = L.DomUtil.create('div','leaflet-yandex-controls');
	this._controls.appendChild(this._yandex.panes.get('controls').getElement());
	this._controls.appendChild(this._yandex.panes.get('copyrights').getElement());
	this._setStyle(this._controls, {
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: this._isOverlay ? 950 : 900
	})
	function addControls () {
		this._map._controlContainer.appendChild(this._controls);
	}
	this.on('add',addControls);
	if (this._map) { addControls.call(this); }
	this.on('remove',function () {
		this._controls.remove();
	});
});
