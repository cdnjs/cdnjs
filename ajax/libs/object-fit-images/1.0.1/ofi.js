(function (root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.objectFitImages = factory();
	}
}(this, function () {
	'use strict';
	var privateAccessor = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; // transparent image, might as well reuse it
	var propRegex = /(object-fit|object-position)\s*:\s*([^;$"'\s]+)/g;

	// only IE is supported via .runtimeStyle
	var isSupported = 'object-fit' in document.createElement('i').style;

	function getStyle (el) {
		var style = window.getComputedStyle(el).fontFamily;
		propRegex.lastIndex = 0; // reset regex
		var parsed;
		var props = {};
		while ((parsed = propRegex.exec(style)) !== null) {
		  props[parsed[1]] = parsed[2];
		}
		return props;
	}

	function fixOne (el, src, style) {
		style = style || getStyle(el);

		// `fill` is the default behavior for <img>
		// Absolutely no work necessary
		if (style['object-fit'] === 'fill') {
			return;
		}
		src = src || el.src;
		el.style.background = 'url('+src+') ' + (style['object-position'] || 'center') + '/' + style['object-fit'].replace('none', 'auto').replace('scale-down', 'contain') + ' no-repeat';

		if (!el.style.background) {
			// el.style.background is invalid, don't replace the <img>
			return;
		}

		// if it hadn't been already activated
		if (!el[privateAccessor]) {
			el.src = privateAccessor;
			keepSrcUsable(el);
		}

		// remember real image url
		el[privateAccessor] = src;
	}

	function keepSrcUsable (el) {
		Object.defineProperty(el, 'src', {
			get: function ()  { return el[privateAccessor]; },
			set: function (v) { return fixOne(el, v); }
		});
	}

	function fixOnResize (imgs) {
		window.addEventListener('resize', fix.bind(null, imgs));
	}
	function onInsert (e) {
		if ( e.target.tagName === 'img' ) {
			fix( e.target );
		}
	}

	var autoModeEnabled = false;
	function fix (imgs, opts) {
		if (isSupported) {
			return;
		}
		opts = opts || {};

		if (!autoModeEnabled && !imgs) {
			window.addEventListener('DOMNodeInserted', onInsert, false);
			autoModeEnabled = true;
			fixOnResize('img');
		}

		// use imgs as a selector or just select all images
		if (imgs === fix.undef || typeof imgs === 'string') {
			imgs = document.querySelectorAll( imgs || 'img' );
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

		// make sure that the value of object-fit doesn't change on different media queries
		if (!autoModeEnabled && opts.onresize === fix.undef || opts.onresize) {
			fixOnResize(imgs);
		}
	}
	return fix;
}));
