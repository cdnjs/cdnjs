'use strict';

var privateAccessor = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; // transparent image, might as well reuse it
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

function fixOne(el, src, style) {
	style = style || getStyle(el);

	// `fill` is the default behavior for <img>
	// Absolutely no work necessary
	if (style['object-fit'] === 'fill') {
		return;
	}

	// Edge 12 doesn't support currentSrc
	// https://github.com/bfred-it/object-fit-images/blob/gh-pages/detailed-support-tables.md#object-fit-images--srcset
	src = src || el.currentSrc || el.src;
	el.style.backgroundImage = 'url(' + src + ')';
	el.style.backgroundPosition = style['object-position'] || 'center';
	el.style.backgroundSize = style['object-fit'].replace('scale-down', 'contain'); // "object-fit: none" automatically maps to "background-size:auto"
	el.style.backgroundRepeat = 'no-repeat';

	// remove srcset because it overrides src
	if (el.srcset) {
		el.srcset = '';
	}

	// if it hadn't been already activated
	if (!el[privateAccessor]) {
		el.src = privateAccessor;
		keepSrcUsable(el);
	}

	// remember real image url
	el[privateAccessor] = src;
}

function keepSrcUsable(el) {
	var definitions = {
		get: function () {
			return el[privateAccessor];
		},
		set: function (v) {
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
		fix(e.target);
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
	var style;
	for (var i = 0; i < imgs.length; i++) {
		style = getStyle(imgs[i]);
		if (style['object-fit']) {
			fixOne(imgs[i], null, style);
		}
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

module.exports = fix;