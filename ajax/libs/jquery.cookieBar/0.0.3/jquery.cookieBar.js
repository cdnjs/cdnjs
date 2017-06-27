/*!
 * jQuery Cookiebar Plugin
 * https://github.com/carlwoodhouse/jquery.cookieBar
 *
 * Copyright 2012-17, Carl Woodhouse. the cookie function is inspired by https://github.com/carhartl/jquery-cookie
 * Disclaimer: if you still get fined for not complying with the eu cookielaw, it's not our fault.
 * Licence: MIT
 */

(function ($) {
	$.cookie = function (key, value, options) {
		if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
			options = $.extend({}, options);

			if (value === null || value === undefined) {
				options.expires = -1;
			}

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = String(value);

			return (document.cookie = [
				encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		}
		options = value || {};
		var decode = options.raw ? function (s) { return s; } : decodeURIComponent;

		var pairs = document.cookie.split('; ');
		for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
			// IE
			if (decode(pair[0]) === key) return decode(pair[1] || '');
		}
		return null;
	};

	$.fn.cookieBar = function (options) {
		var settings = $.extend({
			'closeButton': 'none',
			'hideOnClose': true,
			'secure': false,
			'path': '/',
			'domain': ''
		}, options);

		return this.each(function () {
			var cookiebar = $(this);

			// just in case they didnt hide it by default.
			cookiebar.hide();

			// if close button not defined. define it!
			if (settings.closeButton == 'none') {
				cookiebar.append('<a class="cookiebar-close">Continue</a>');
				$.extend(settings, { 'closeButton': '.cookiebar-close' });
			}

			if ($.cookie('cookiebar') != 'hide') {
				cookiebar.show();
			}

			cookiebar.find(settings.closeButton).click(function () {
				if (settings.hideOnClose) {
					cookiebar.hide();
				}
				$.cookie('cookiebar', 'hide', { path: settings.path, secure: settings.secure, domain: settings.domain, expires: 30 });
				cookiebar.trigger('cookieBar-close');
				return false;
			});
		});
	};

	// self injection init
	$.cookieBar = function (options) {
		$('body').prepend('<div class="ui-widget"><div style="display: none;" class="cookie-message ui-widget-header blue"><p>By using this website you allow us to place cookies on your computer. They are harmless and never personally identify you.</p></div></div>');
		$('.cookie-message').cookieBar(options);
	};
})(jQuery);
