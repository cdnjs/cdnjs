(function () {

L.Control.FullScreen = L.Control.extend({
	options: {
		position: 'topleft',
		title: 'Full Screen',
		titleCancel: 'Exit Full Screen',
		forceSeparateButton: false,
		forcePseudoFullscreen: false,
		fullscreenElement: false
	},
	
	onAdd: function (map) {
		var className = 'leaflet-control-zoom-fullscreen', container, content = '';
		
		if (map.zoomControl && !this.options.forceSeparateButton) {
			container = map.zoomControl._container;
		} else {
			container = L.DomUtil.create('div', 'leaflet-bar');
		}
		
		if (this.options.content) {
			content = this.options.content;
		} else {
			className += ' fullscreen-icon';
		}

		this._createButton(this.options.title, className, content, container, this.toggleFullScreen, this);

		this._map.on('enterFullscreen exitFullscreen', this._toggleTitle, this);

		return container;
	},
	
	_createButton: function (title, className, content, container, fn, context) {
		this.link = L.DomUtil.create('a', className, container);
		this.link.href = '#';
		this.link.title = title;
		this.link.innerHTML = content;

		L.DomEvent
			.addListener(this.link, 'click', L.DomEvent.stopPropagation)
			.addListener(this.link, 'click', L.DomEvent.preventDefault)
			.addListener(this.link, 'click', fn, context);
		
		L.DomEvent
			.addListener(container, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
			.addListener(container, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
			.addListener(container, fullScreenApi.fullScreenEventName, this._handleEscKey, context);
		
		L.DomEvent
			.addListener(document, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
			.addListener(document, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
			.addListener(document, fullScreenApi.fullScreenEventName, this._handleEscKey, context);

		return this.link;
	},
	
	toggleFullScreen: function () {
		var map = this._map;
		map._exitFired = false;
		if (map._isFullscreen) {
			if (fullScreenApi.supportsFullScreen && !this.options.forcePseudoFullscreen) {
				fullScreenApi.cancelFullScreen(this.options.fullscreenElement ? this.options.fullscreenElement : map._container);
			} else {
				L.DomUtil.removeClass(map._container, 'leaflet-pseudo-fullscreen');
			}
			map.invalidateSize();
			map.fire('exitFullscreen');
			map._exitFired = true;
			map._isFullscreen = false;
		}
		else {
			if (fullScreenApi.supportsFullScreen && !this.options.forcePseudoFullscreen) {
				fullScreenApi.requestFullScreen(this.options.fullscreenElement ? this.options.fullscreenElement : map._container);
			} else {
				L.DomUtil.addClass(map._container, 'leaflet-pseudo-fullscreen');
			}
			map.invalidateSize();
			map.fire('enterFullscreen');
			map._isFullscreen = true;
		}
	},
	
	_toggleTitle: function () {
		this.link.title = this._map._isFullscreen ? this.options.title : this.options.titleCancel;
	},
	
	_handleEscKey: function () {
		var map = this._map;
		if (!fullScreenApi.isFullScreen(map) && !map._exitFired) {
			map.fire('exitFullscreen');
			map._exitFired = true;
			map._isFullscreen = false;
		}
	}
});

L.Map.addInitHook(function () {
	if (this.options.fullscreenControl) {
		this.fullscreenControl = L.control.fullscreen(this.options.fullscreenControlOptions);
		this.addControl(this.fullscreenControl);
	}
});

L.control.fullscreen = function (options) {
	return new L.Control.FullScreen(options);
};

/* 
Native FullScreen JavaScript API
-------------
Assumes Mozilla naming conventions instead of W3C for now

source : http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/

*/

	var 
		fullScreenApi = { 
			supportsFullScreen: false,
			isFullScreen: function () { return false; }, 
			requestFullScreen: function () {}, 
			cancelFullScreen: function () {},
			fullScreenEventName: '',
			prefix: ''
		},
		browserPrefixes = 'webkit moz o ms khtml'.split(' ');
	
	// check for native support
	if (typeof document.exitFullscreen !== 'undefined') {
		fullScreenApi.supportsFullScreen = true;
	} else {
		// check for fullscreen support by vendor prefix
		for (var i = 0, il = browserPrefixes.length; i < il; i++) {
			fullScreenApi.prefix = browserPrefixes[i];
			if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] !== 'undefined') {
				fullScreenApi.supportsFullScreen = true;
				break;
			}
		}
		if (typeof document['msExitFullscreen'] !== 'undefined') {
			fullScreenApi.prefix = 'ms';
			fullScreenApi.supportsFullScreen = true;
		}
	}
	
	// update methods to do something useful
	if (fullScreenApi.supportsFullScreen) {
		if (fullScreenApi.prefix === 'ms') {
			fullScreenApi.fullScreenEventName = 'MSFullscreenChange';
		} else {
			fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
		}
		fullScreenApi.isFullScreen = function () {
			switch (this.prefix) {
				case '':
					return document.fullScreen;
				case 'webkit':
					return document.webkitIsFullScreen;
				case 'ms':
					return document.msFullscreenElement;
				default:
					return document[this.prefix + 'FullScreen'];
			}
		};
		fullScreenApi.requestFullScreen = function (el) {
			switch (this.prefix) {
				case '':
					return el.requestFullscreen();
				case 'ms':
					return el.msRequestFullscreen();
				default:
					return el[this.prefix + 'RequestFullScreen']();
			}
		};
		fullScreenApi.cancelFullScreen = function () {
			switch (this.prefix) {
				case '':
					return document.exitFullscreen();
				case 'ms':
					return document.msExitFullscreen();
				default:
					return document[this.prefix + 'CancelFullScreen']();
			}
		};
	}

	// jQuery plugin
	if (typeof jQuery !== 'undefined') {
		jQuery.fn.requestFullScreen = function () {
			return this.each(function () {
				var el = jQuery(this);
				if (fullScreenApi.supportsFullScreen) {
					fullScreenApi.requestFullScreen(el);
				}
			});
		};
	}

	// export api
	window.fullScreenApi = fullScreenApi;
})();
