'use strict';

var ಠ = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; // transparent image, used as accessor and replacing image
var propRegex = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g;
var supportsObjectFit = 'object-fit' in document.documentElement.style;
var nativeGetAttribute = document.documentElement.getAttribute;
var nativeSetAttribute = document.documentElement.setAttribute;
var autoModeEnabled = false;

function getStyle(el) {
	var style = getComputedStyle(el).fontFamily;
	var parsed;
	var props = {};
	while ((parsed = propRegex.exec(style)) !== null) {
		props[parsed[1]] = parsed[2];
	}
	return props;
}

function fixOne(el, requestedSrc) {
	var style = getStyle(el);
	console.log(el);

	// exit if not set
	// `fill` is the default behavior for <img>
	// Absolutely no work necessary
	if (!style['object-fit'] || style['object-fit'] === 'fill') {
		return;
	}

	// Edge 12 supports srcset but not currentSrc
	// https://github.com/bfred-it/object-fit-images/blob/gh-pages/detailed-support-tables.md#object-fit-images--srcset
	var src = requestedSrc || el.currentSrc || el.src;

	// remove srcset because it overrides src
	if (el.srcset) {
		el.srcset = '';
	}

	// store info on object for later use
	if (el[ಠ]) {
		el[ಠ].s = src;
		if (requestedSrc) {
			// the attribute reflects the user input
			// the property is the resolved URL
			el[ಠ].a = requestedSrc;
		}
	} else {
		el[ಠ] = {
			s: src,
			a: requestedSrc || nativeGetAttribute.call(el, 'src')
		};
		el.src = ಠ;
		keepSrcUsable(el);
	}

	el.style.backgroundImage = 'url("' + src + '")';
	el.style.backgroundPosition = style['object-position'] || 'center';
	el.style.backgroundRepeat = 'no-repeat';

	if (/scale-down/.test(style['object-fit'])) {
		// `object-fit: scale-down` is either `contain` or `auto`
		if (!el[ಠ].i) {
			el[ಠ].i = new Image();
			el[ಠ].i.src = src;
		}

		// naturalWidth is only available when the image headers are loaded,
		// this loop will poll it every 100ms.
		// There's currently no check to prevent this loop from starting twice
		// as a consequence of calling ofi() twice on the same image, but it's light
		// and causes no issues, so it's not worth ensuring that it doesn't.
		(function loop() {
			// https://bugs.chromium.org/p/chromium/issues/detail?id=495908
			if (el[ಠ].i.naturalWidth) {
				console.log(el[ಠ].i.naturalWidth);
				if (el[ಠ].i.naturalWidth > el.width || el[ಠ].i.naturalHeight > el.height) {
					el.style.backgroundSize = 'contain';
				} else {
					el.style.backgroundSize = 'auto';
				}
				return;
			}
			setTimeout(loop, 100);
		})();
	} else {
		el.style.backgroundSize = style['object-fit'].replace('none', 'auto');
	}
}

function keepSrcUsable(el) {
	var definitions = {
		get: function () {
			return el[ಠ].s;
		},
		set: function (v) {
			delete el[ಠ].i; // scale-down's img sizes need to be updated too
			fixOne(el, v);
			return v;
		}
	};
	Object.defineProperty(el, 'src', definitions);
	Object.defineProperty(el, 'currentSrc', { get: definitions.get }); // it should be read-only
}

function watchMQ(imgs, opts) {
	window.addEventListener('resize', fix.bind(null, imgs, opts));
}
function onInsert(e) {
	if (e.target.tagName === 'IMG') {
		fixOne(e.target);
	}
}

function hijackAttributes() {
	if (!supportsObjectFit) {
		HTMLImageElement.prototype.getAttribute = function (name) {
			if (this[ಠ] && name === 'src') {
				return this[ಠ].a;
			}
			return nativeGetAttribute.call(this, name);
		};

		HTMLImageElement.prototype.setAttribute = function (name, value) {
			if (this[ಠ] && name === 'src') {
				this.src = String(value);
			} else {
				nativeSetAttribute.call(this, name, value);
			}
		};
	}
}

function fix(imgs, opts) {
	var startAutoMode = !autoModeEnabled && !imgs;
	opts = opts || {};
	imgs = imgs || 'img';
	if (supportsObjectFit && !opts.skipTest) {
		return false;
	}

	// use imgs as a selector or just select all images
	if (typeof imgs === 'string') {
		imgs = document.querySelectorAll('img');
	} else if (!imgs.length) {
		imgs = [imgs];
	}

	// apply fix to all
	for (var i = 0; i < imgs.length; i++) {
		fixOne(imgs[i]);
	}

	if (startAutoMode) {
		document.body.addEventListener('load', onInsert, true);
		autoModeEnabled = true;
		imgs = 'img'; // reset to a generic selector for watchMQ
	}

	// if requested, watch media queries for object-fit change
	if (opts.watchMQ) {
		delete opts.watchMQ;
		watchMQ(imgs, opts);
	}
}

fix.supportsObjectFit = supportsObjectFit;

hijackAttributes();

module.exports = fix;