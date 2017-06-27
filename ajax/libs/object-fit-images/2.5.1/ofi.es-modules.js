var ಠ = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; // transparent image, used as accessor and replacing image
var ಠಠ = ಠ + ಠ; // additional permanent settings accessor
var propRegex = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g;
var testImg = new Image();
var supportsObjectFit = 'object-fit' in testImg.style;
var supportsObjectPosition = 'object-position' in testImg.style;
var supportsCurrentSrc = typeof testImg.currentSrc === 'string';
var nativeGetAttribute = testImg.getAttribute;
var nativeSetAttribute = testImg.setAttribute;
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
	if (el[ಠಠ].parsingSrcset) {
		return;
	}
	var style = getStyle(el);

	// If the fix was already applied, don't try to skip fixing,
	// - because once you go ofi you never go back.
	// - Wait, that doesn't rhyme.
	// - This ain't rap, bro.
	if (!el[ಠ] && !el[ಠಠ].skipTest) {
		if (!style['object-fit'] || // if image doesn't use object-fit
		style['object-fit'] === 'fill' // fill is the default behavior
		) {
				return;
			}

		// Where object-fit is supported and object-position isn't (Safari < 10)
		if (supportsObjectFit && // if browser already supports object-fit
		!style['object-position'] // unless object-position is used
		) {
				return;
			}
	}

	var src = el.currentSrc || el.src;

	if (requestedSrc) {
		// explicitly requested src takes precedence
		src = requestedSrc;
	} else if (el.srcset && !supportsCurrentSrc && window.picturefill) {
		// prevent infinite loop
		// fillImg sets the src which in turn calls fixOne
		el[ಠಠ].parsingSrcset = true;

		// parse srcset with picturefill where currentSrc isn't available
		if (!el[window.picturefill._.ns] || !el[window.picturefill._.ns].evaled) {
			// force synchronous srcset parsing
			window.picturefill._.fillImg(el, { reselect: true });
		}

		var imageData = el[window.picturefill._.ns];
		if (!imageData.curSrc) {
			// force picturefill to parse srcset
			imageData.supported = false;
			window.picturefill._.fillImg(el, { reselect: true });
		}
		delete el[ಠಠ].parsingSrcset;

		// retrieve parsed currentSrc, if any
		src = imageData.curSrc || src;
	}

	// store info on object for later use
	if (el[ಠ]) {
		el[ಠ].s = src;
		if (requestedSrc) {
			// the attribute reflects the user input
			// the property is the resolved URL
			el[ಠ].srcAttr = requestedSrc;
		}
	} else {
		el[ಠ] = {
			s: src,
			srcAttr: requestedSrc || nativeGetAttribute.call(el, 'src'),
			srcsetAttr: el.srcset
		};
		el.src = ಠ;

		// remove srcset because it overrides src
		if (el.srcset) {
			el.srcset = '';

			// restore non-working srcset property
			Object.defineProperty(el, 'srcset', {
				value: el[ಠ].srcsetAttr
			});
		}

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
		el.style.backgroundSize = style['object-fit'].replace('none', 'auto').replace('fill', '100% 100%');
	}
}

function keepSrcUsable(el) {
	var descriptors = {
		get: function () {
			return el[ಠ].s;
		},
		set: function (src) {
			delete el[ಠ].i; // scale-down's img sizes need to be updated too
			fixOne(el, src);
			return src;
		}
	};
	Object.defineProperty(el, 'src', descriptors);
	Object.defineProperty(el, 'currentSrc', { get: descriptors.get }); // it should be read-only
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
	if (!supportsObjectPosition) {
		HTMLImageElement.prototype.getAttribute = function (name) {
			if (this[ಠ] && (name === 'src' || name === 'srcset')) {
				return this[ಠ][name + 'Attr'];
			}
			return nativeGetAttribute.call(this, name);
		};

		HTMLImageElement.prototype.setAttribute = function (name, value) {
			if (this[ಠ] && (name === 'src' || name === 'srcset')) {
				this[name === 'src' ? 'src' : name + 'Attr'] = String(value);
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
	if (supportsObjectPosition && !opts.skipTest) {
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
		imgs[i][ಠಠ] = opts;
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
fix.supportsObjectPosition = supportsObjectPosition;

hijackAttributes();

export default fix;