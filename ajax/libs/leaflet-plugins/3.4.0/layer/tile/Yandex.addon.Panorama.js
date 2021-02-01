// Here is just one of possible ways to integrate
// panoramas player with leaflet map, avoiding controls conflicts.
// It's function is to take player out of map and put it into separate element.

// @option panorama: Boolean or String = undefined
// If true then activates panorama manager using custom handler.
// Set option value to 'enableLookup' in order to enable panorama layer on load.
// Otherwise it's possible to do it later (programmatacally, or with `typeSelector` control).

L.Yandex.addInitHook(function () {
	var defaults = this._controlOptionsDefault;
	if (!this.options.panorama || !defaults) { return; }
	this._controlOptionsDefault = L.extend({}, defaults, {
		typeSelector: L.extend({}, defaults.typeSelector, {panoramasItemMode: 'on'})
	});
});

L.Yandex.addInitHook('on', 'load', function () {
	if (!this.options.panorama) { return; }
	this._yandex.getPanoramaManager().done(function (manager) {
		manager._playerOptions = {
			hotkeysEnabled: true,
			controls: ['closeControl','panoramaName','zoomControl']
		};
		if (this.options.panorama === 'enableLookup') { manager.enableLookup(); }
		manager.events.add('openplayer',function () {
			var leafletKeys = this._map.keyboard;
			if (leafletKeys) { leafletKeys.disable(); }
			var player = manager.getPlayer();
			player._engine._toggleFullscreen();
			player.events.add('fullscreenexit', function () {
				setTimeout(manager.closePlayer.bind(manager));
			});
			if (this._isOverlay) { this._yandex.setType('yandex#map'); }
			player.events.add('destroy', function () {
				if (this._isOverlay) { this._yandex.setType(this._mapType()); }
				this._resyncView();
				if (leafletKeys) { leafletKeys.enable(); }
			},this);
		},this);
	},this);
});
