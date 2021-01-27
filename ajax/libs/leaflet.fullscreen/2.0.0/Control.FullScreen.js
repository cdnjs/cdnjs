(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['leaflet'], factory);
	} else if (typeof modules === 'object' && module.exports) {
		// define a Common JS module that relies on 'leaflet'
		module.exports = factory(require('leaflet'));
	} else {
		// Assume Leaflet is loaded into global object L already
		factory(L);
	}
}(this, function (L) {
	'use strict';

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
			this._map.fullscreenControl = this;

			this._map.on('enterFullscreen exitFullscreen', this._toggleTitle, this);

			return container;
		},
		
		onRemove: function (map) {
			L.DomEvent
				.off(this.link, 'click', L.DomEvent.stopPropagation)
				.off(this.link, 'click', L.DomEvent.preventDefault)
				.off(this.link, 'click', this.toggleFullScreen, this);
			
			L.DomEvent
				.off(this._container, screenfull.raw.fullscreenchange, L.DomEvent.stopPropagation)
				.off(this._container, screenfull.raw.fullscreenchange, L.DomEvent.preventDefault)
				.off(this._container, screenfull.raw.fullscreenchange, this._handleFullscreenChange, this);
			
			L.DomEvent
				.off(document, screenfull.raw.fullscreenchange, L.DomEvent.stopPropagation)
				.off(document, screenfull.raw.fullscreenchange, L.DomEvent.preventDefault)
				.off(document, screenfull.raw.fullscreenchange, this._handleFullscreenChange, this);
		},
		
		_createButton: function (title, className, content, container, fn, context) {
			this.link = L.DomUtil.create('a', className, container);
			this.link.href = '#';
			this.link.title = title;
			this.link.innerHTML = content;

			this.link.setAttribute('role', 'button');
			this.link.setAttribute('aria-label', title);

			L.DomEvent
				.on(this.link, 'click', L.DomEvent.stopPropagation)
				.on(this.link, 'click', L.DomEvent.preventDefault)
				.on(this.link, 'click', fn, context);
			
			L.DomEvent
				.on(container, screenfull.raw.fullscreenchange, L.DomEvent.stopPropagation)
				.on(container, screenfull.raw.fullscreenchange, L.DomEvent.preventDefault)
				.on(container, screenfull.raw.fullscreenchange, this._handleFullscreenChange, context);
			
			L.DomEvent
				.on(document, screenfull.raw.fullscreenchange, L.DomEvent.stopPropagation)
				.on(document, screenfull.raw.fullscreenchange, L.DomEvent.preventDefault)
				.on(document, screenfull.raw.fullscreenchange, this._handleFullscreenChange, context);

			return this.link;
		},
		
		toggleFullScreen: function () {
			var map = this._map;
			map._exitFired = false;
			if (map._isFullscreen) {
				if (screenfull.isEnabled && !this.options.forcePseudoFullscreen) {
					screenfull.exit();
				} else {
					L.DomUtil.removeClass(this.options.fullscreenElement ? this.options.fullscreenElement : map._container, 'leaflet-pseudo-fullscreen');
					map.invalidateSize();
				}
				map.fire('exitFullscreen');
				map._exitFired = true;
				map._isFullscreen = false;
			}
			else {
				if (screenfull.isEnabled && !this.options.forcePseudoFullscreen) {
					screenfull.request(this.options.fullscreenElement ? this.options.fullscreenElement : map._container);
				} else {
					L.DomUtil.addClass(this.options.fullscreenElement ? this.options.fullscreenElement : map._container, 'leaflet-pseudo-fullscreen');
					map.invalidateSize();
				}
				map.fire('enterFullscreen');
				map._isFullscreen = true;
			}
		},
		
		_toggleTitle: function () {
			this.link.title = this._map._isFullscreen ? this.options.title : this.options.titleCancel;
		},
		
		_handleFullscreenChange: function () {
			var map = this._map;
			map.invalidateSize();
			if (!screenfull.isFullscreen && !map._exitFired) {
				map.fire('exitFullscreen');
				map._exitFired = true;
				map._isFullscreen = false;
			}
		}
	});

	L.Map.include({
		toggleFullscreen: function () {
			this.fullscreenControl.toggleFullScreen();
		}
	});

	L.Map.addInitHook(function () {
		if (this.options.fullscreenControl) {
			this.addControl(L.control.fullscreen(this.options.fullscreenControlOptions));
		}
	});

	L.control.fullscreen = function (options) {
		return new L.Control.FullScreen(options);
	};

  return L;
}));

/*!
* screenfull
* v5.1.0 - 2020-12-24
* (c) Sindre Sorhus; MIT License
*/
(function () {
	'use strict';

	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
	var isCommonjs = typeof module !== 'undefined' && module.exports;

	var fn = (function () {
		var val;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// New WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// Old WebKit
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0; i < val.length; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var eventNameMap = {
		change: fn.fullscreenchange,
		error: fn.fullscreenerror
	};

	var screenfull = {
		request: function (element, options) {
			return new Promise(function (resolve, reject) {
				var onFullScreenEntered = function () {
					this.off('change', onFullScreenEntered);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenEntered);

				element = element || document.documentElement;

				var returnPromise = element[fn.requestFullscreen](options);

				if (returnPromise instanceof Promise) {
					returnPromise.then(onFullScreenEntered).catch(reject);
				}
			}.bind(this));
		},
		exit: function () {
			return new Promise(function (resolve, reject) {
				if (!this.isFullscreen) {
					resolve();
					return;
				}

				var onFullScreenExit = function () {
					this.off('change', onFullScreenExit);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenExit);

				var returnPromise = document[fn.exitFullscreen]();

				if (returnPromise instanceof Promise) {
					returnPromise.then(onFullScreenExit).catch(reject);
				}
			}.bind(this));
		},
		toggle: function (element, options) {
			return this.isFullscreen ? this.exit() : this.request(element, options);
		},
		onchange: function (callback) {
			this.on('change', callback);
		},
		onerror: function (callback) {
			this.on('error', callback);
		},
		on: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.addEventListener(eventName, callback, false);
			}
		},
		off: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.removeEventListener(eventName, callback, false);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = {isEnabled: false};
		} else {
			window.screenfull = {isEnabled: false};
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return Boolean(document[fn.fullscreenElement]);
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		isEnabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return Boolean(document[fn.fullscreenEnabled]);
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();