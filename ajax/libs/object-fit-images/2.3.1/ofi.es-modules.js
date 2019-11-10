var ಠ = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; // transparent image, used as accessor and replacing image
var propRegex = /(object-fit|object-position)\s*:\s*([^;$"'\s]+)/g;
var isSupported = 'object-fit' in document.createElement('i').style;
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

function fixOne(el, src) {
	var style = getStyle(el);

	// exit if not set
	// `fill` is the default behavior for <img>
	// Absolutely no work necessary
	if (!style['object-fit'] || style['object-fit'] === 'fill') {
		return;
	}

	// Edge 12 doesn't support currentSrc
	// https://github.com/bfred-it/object-fit-images/blob/gh-pages/detailed-support-tables.md#object-fit-images--srcset
	src = src || el.currentSrc || el.src;

	// remove srcset because it overrides src
	if (el.srcset) {
		el.srcset = '';
	}

	// if it hadn't been already activated
	if (!el[ಠ]) {
		el.src = ಠ;
		keepSrcUsable(el);
	}

	// store info on object for later use
	el[ಠ] = el[ಠ] || { s: src };

	el.style.backgroundImage = 'url(' + src + ')';
	el.style.backgroundPosition = style['object-position'] || 'center';
	el.style.backgroundRepeat = 'no-repeat';

	if (style['object-fit'].indexOf('scale-down') < 0) {
		el.style.backgroundSize = style['object-fit'].replace('none', 'auto');
	} else {
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
			if (el[ಠ].i.naturalWidth) {
				if (el[ಠ].i.naturalWidth > el.width || el[ಠ].i.naturalHeight > el.height) {
					el.style.backgroundSize = 'contain';
				} else {
					el.style.backgroundSize = 'auto';
				}
				return;
			}
			setTimeout(loop, 100);
		})();
	}
}

function keepSrcUsable(el) {
	var definitions = {
		get: function () {
			return el[ಠ].s;
		},
		set: function (v) {
			delete el[ಠ].i; // scale-down's img sizes need to be updated too
			return fixOne(el, v);
		}
	};
	Object.defineProperty(el, 'src', definitions);
	Object.defineProperty(el, 'currentSrc', { get: definitions.get }); // it should be read-only
}

function watchMQ(imgs) {
	window.addEventListener('resize', fix.bind(null, imgs));
}
function onInsert(e) {
	if (e.target.tagName === 'IMG') {
		fixOne(e.target);
	}
}

function fix(imgs, opts) {
	if (isSupported) {
		return false;
	}
	var startAutoMode = !autoModeEnabled && !imgs;
	opts = opts || {};
	imgs = imgs || 'img';

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
		watchMQ(imgs);
	}
}

export default fix;