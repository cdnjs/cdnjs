'use strict';
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.objectFitImages = factory();
	}
}(this, function () {
	var testElement = document.createElement('i').style;
	var transparentImage = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
	var privateAccessor = transparentImage; // reuse variable

	// only IE is supported via .currentStyle
	var isSupported = !testElement.currentStyle || 'object-fit' in testElement;


	function fixOne (el, src, fit) {
		fit = el.currentStyle['object-fit'];

		// `fill` is the default behavior for <img>
		// Absolutely no work necessary
		if (fit === 'fill') {
			return;
		}
		src = src || el.src;
		el.style.backgroundImage = 'url('+src+')';
		el.style.backgroundSize = fit; // fit=none is ignored by CSS and that's the correct behavior
		el.style.backgroundPosition = el.currentStyle['object-position'];

		// if it hadn't been already activated
		if (!el[privateAccessor]) {
			el.src = transparentImage;
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
	return function fix (imgs, opts) {
		if (isSupported) {
			return;
		}
		opts = opts || {};

		if (!autoModeEnabled && arguments.length) {
			window.addEventListener('DOMNodeInserted', onInsert, false);
			autoModeEnabled = true;
			fixOnResize('img');
		}

		// use imgs as a selector or just select all images
		if (imgs === fix.undefined || typeof imgs === 'string') {
			imgs = document.querySelector( imgs || 'img' );
		} else if (!imgs.length) {
			imgs = [imgs];
		}

		// apply fix to all
		for (var i = 0; i < imgs.length; i++) {
			if (imgs[i].currentStyle['object-fit']) {
				fixOne(imgs[i]);
			}
		}

		// make sure that the value of object-fit doesn't change on different media queries
		if (!autoModeEnabled && opts.onresize === fix.undefined || opts.onresize) {
			fixOnResize(imgs);
		}
	};
}));
