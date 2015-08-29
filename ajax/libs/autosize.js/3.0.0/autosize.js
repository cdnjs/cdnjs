/*!
	Autosize 3.0.0
	license: MIT
	http://www.jacklmoore.com/autosize
*/
(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod);
		global.autosize = mod.exports;
	}
})(this, function (exports, module) {
	'use strict';

	function assign(ta) {
		if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || ta.hasAttribute('data-autosize-on')) {
			return;
		}var maxHeight;
		var heightOffset;

		function init() {
			var style = window.getComputedStyle(ta, null);

			if (style.resize === 'vertical') {
				ta.style.resize = 'none';
			} else if (style.resize === 'both') {
				ta.style.resize = 'horizontal';
			}

			// Chrome/Safari-specific fix:
			// When the textarea y-over is hidden, Chrome/Safari doesn't reflow the text to account for the space
			// made available by removing the scrollbar. This workaround will cause the text to reflow.
			var width = ta.style.width;
			ta.style.width = '0px';
			// Force reflow:
			/* jshint ignore:start */
			ta.offsetWidth;
			/* jshint ignore:end */
			ta.style.width = width;

			maxHeight = style.maxHeight !== 'none' ? parseFloat(style.maxHeight) : false;

			if (style.boxSizing === 'content-box') {
				heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
			} else {
				heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
			}

			update();
		}

		function update() {
			var startHeight = ta.style.height;
			var htmlTop = document.documentElement.scrollTop;
			var bodyTop = document.body.scrollTop;

			ta.style.height = 'auto';

			var endHeight = ta.scrollHeight + heightOffset;

			if (maxHeight !== false && maxHeight < endHeight) {
				endHeight = maxHeight;
				if (ta.style.overflowY !== 'scroll') {
					ta.style.overflowY = 'scroll';
				}
			} else if (ta.style.overflowY !== 'hidden') {
				ta.style.overflowY = 'hidden';
			}

			ta.style.height = endHeight + 'px';

			// prevents scroll-position jumping
			document.documentElement.scrollTop = htmlTop;
			document.body.scrollTop = bodyTop;

			if (startHeight !== ta.style.height) {
				var evt = document.createEvent('Event');
				evt.initEvent('autosize:resized', true, false);
				ta.dispatchEvent(evt);
			}
		}

		ta.addEventListener('autosize:destroy', (function (style) {
			window.removeEventListener('resize', update);
			ta.removeEventListener('input', update);
			ta.removeEventListener('keyup', update);
			ta.removeAttribute('data-autosize-on');
			ta.removeEventListener('autosize:destroy');

			Object.keys(style).forEach(function (key) {
				ta.style[key] = style[key];
			});
		}).bind(ta, {
			height: ta.style.height,
			overflowY: ta.style.overflowY,
			resize: ta.style.resize
		}));

		// IE9 does not fire onpropertychange or oninput for deletions,
		// so binding to onkeyup to catch most of those events.
		// There is no way that I know of to detect something like 'cut' in IE9.
		if ('onpropertychange' in ta && 'oninput' in ta) {
			ta.addEventListener('keyup', update);
		}

		window.addEventListener('resize', update);
		ta.addEventListener('input', update);
		ta.addEventListener('autosize:update', update);
		ta.setAttribute('data-autosize-on', true);
		ta.style.overflowY = 'hidden';
		init();
	}

	function destroy(ta) {
		if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA') {
			return;
		}var evt = document.createEvent('Event');
		evt.initEvent('autosize:destroy', true, false);
		ta.dispatchEvent(evt);
	}

	function update(ta) {
		if (!(ta && ta.nodeName && ta.nodeName === 'TEXTAREA')) {
			return;
		}var evt = document.createEvent('Event');
		evt.initEvent('autosize:update', true, false);
		ta.dispatchEvent(evt);
	}

	var autosize;

	// Do nothing in IE8 or lower
	if (typeof window.getComputedStyle !== 'function') {
		autosize = function (el) {
			return el;
		};
		autosize.destroy = function (el) {
			return el;
		};
		autosize.update = function (el) {
			return el;
		};
	} else {
		autosize = function (el) {
			if (el && el.length) {
				Array.prototype.forEach.call(el, assign);
			} else if (el && el.nodeName) {
				assign(el);
			}
			return el;
		};
		autosize.destroy = function (el) {
			if (el && el.length) {
				Array.prototype.forEach.call(el, destroy);
			} else if (el && el.nodeName) {
				destroy(el);
			}
			return el;
		};
		autosize.update = function (el) {
			if (el && el.length) {
				Array.prototype.forEach.call(el, update);
			} else if (el && el.nodeName) {
				update(el);
			}
			return el;
		};
	}

	module.exports = autosize;
});