/**
 * jQuery Internationalization library
 *
 * Copyright (C) 2012 Santhosh Thottingal
 *
 * jquery.i18n is dual licensed GPLv2 or later and MIT. You don't
 * have to do anything special to choose one license or the other and you don't
 * have to notify anyone which license you are using. You are free to use
 * UniversalLanguageSelector in commercial projects as long as the copyright
 * header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
 *
 * @licence GNU General Public Licence 2.0 or later
 * @licence MIT License
 */

(function($, window, document, undefined) {
	"use strict";

	var I18N = function(options) {
		// Load defaults
		this.options = $.extend({}, $.i18n.defaults, options);
		this.messages = {};
		this.sources = {};
		this.parser = this.options.parser;
		this.languages = {};
		this.locale = this.options.locale;
		this.init();
	};

	I18N.prototype = {
		/**
		 * Initialize
		 */
		init : function() {
			var that = this;
			var $links = $("link");
			var linksCount = $links.length;
			this.log( "initializing for "+ this.locale );

			// Check for <link rel="localization" hreflang="xyz"  elements
			while (linksCount--) {
				var $link = $($links[linksCount]);
				var rel = ($link.attr("rel") || "").toLowerCase().split(/\s+/);
				if ($.inArray("localizations", rel) !== -1) {
					// multiple localizations
					that.load($link.attr("href"));
				} else if ($.inArray("localization", rel) !== -1) {
					// single localization
					var localization = {};
					localization[($link.attr("hreflang") || "").toLowerCase()] = $link.attr("href");
					that.load(localization);
				}
			}

			// Override String.localeString method
			String.prototype.toLocaleString = function() {
				var parts = that.locale.toLowerCase().split("-");
				var i = parts.length;
				var value = this.valueOf();
				// Iterate through locales starting at most-specific until localization is found
				do {
					var locale = parts.slice(0, i).join("-");
					// load locale if not loaded
					if (that.sources[locale]) {
						that.loadFormQueue(locale);
					}
					if ( that.messages[locale] && that.messages[locale][value]) {
						return that.messages[locale][value];
					}
				} while (i--);

				return value; // fallback the original string value
			};
			String.locale = this.locale;
		},

		destroy : function() {
			$('body').data('i18n', null);
		},

		/**
		 * General message loading API
		 * This can take a URL string for the json formatted messages.
		 * Eg:
		 *    load( 'path/to/all_localizations.json );
		 *
		 * This can also load a localization file for a locale
		 * Eg:
		 *    load( 'path/to/de-messages.json', 'de' );
		 *
		 * A data object containing message key- message translation mappings can also be passed
		 * Eg:
		 *    load( { 'hello' : 'Hello' }, optionalLocale );
		 * If the data argument is null/undefined/false, all cached messages for the i18n instance
		 * will get reset.
		 *
		 * @param data String|Object|null
		 * @param locale String
		 */
		load : function(data, locale) {
			var that = this,
				hasOwn = Object.prototype.hasOwnProperty;
			if (!data) {
				// reset all localizations
				this.log("Resetting for locale" + locale);
				that.messages = {};
				return;
			}
			var dataType = typeof data;
			if (locale && this.locale !== locale) {
				// queue loading locale if not needed
				if (!(locale in this.sources)) {
					this.sources[locale] = [];
				}
				this.log("Queueing: " + locale);
				this.sources[locale].push(data);
				return;
			}
			if (arguments.length > 0 && dataType !== "number") {
				if (dataType === "string") {
					// This is a URL to the messages file.
					this.log("Loading messages from: " + data);
					jsonMessageLoader(data).done(function(localization, textStatus) {
						that.load(localization, locale);
						delete that.sources[locale];
					});
				} else { // data is Object
					// Extend current localizations instead of completely overwriting them
					var localization = data;
					for (var messageKey in localization) {
						if (!hasOwn.call(localization, messageKey)) {
							continue;
						}
						var messageKeyType = typeof messageKey;
						if (messageKeyType === "string" && locale) {
							that.log("["+locale+"][" + messageKey + "] : "+ localization[messageKey]);
							that.messages[locale] = that.messages[locale] || [];
							that.messages[locale][messageKey] = localization[messageKey];
						} else{
							var passedLocale =  messageKey;
							this.log("Loading locale: " + passedLocale );
							that.load( localization[passedLocale], passedLocale );
						}

					}
				}
			}
		},

		log : function(/* arguments */) {
			var hasConsole = window.console !== undefined ? true : false;
			if (hasConsole) {
				window.console.log.apply(window.console, arguments);
			}
		},

		/**
		 * Load the messages from the source queue for the locale
		 * @param locale String
		 */
		loadFormQueue : function(locale) {
			var that = this,
				queue = that.sources[locale];
			for (var i = 0; i < queue.length; i++) {
				that.load(queue[i], locale);
			}
			delete that.sources[locale];
		},

		parse : function(key, parameters) {
			var message = key.toLocaleString();
			this.parser.language = $.i18n.languages[$.i18n().locale] || $.i18n.languages['default'];
			return this.parser.parse(message, parameters);
		}
	};

	var jsonMessageLoader = function(url) {
		return $.ajax({
			url : url,
			dataType : "json",
			async : false // that is unfortunate
		}).fail(function(jqxhr, settings, exception) {
			throw new Error("Error in loading messages from " + url + " Exception: "+ exception);
		});
	};

	if (!String.locale) {
		String.locale = $('html').attr('lang');
		if (!String.locale) {
			if (typeof window.navigator !== undefined) {
				var nav = window.navigator;
				String.locale = nav.language || nav.userLanguage || "";
			} else {
				String.locale = "";
			}
		}
	}

	$.i18n = function(key, parameter_1 /* [, parameter_2] */) {
		var parameters = [],
			i18n = $('body').data('i18n');
		var options = typeof key === 'object' && key;

		if (options && options.locale && i18n && i18n.locale !== options.locale) {
			String.locale = i18n.locale = options.locale;
		}

		if (!i18n) {
			$('body').data('i18n', (i18n = new I18N(options)));
			$('[data-i18n]').each(function(e) {
				var $this = $(this);
				if ($this.data('i18n')) {
					$this.text($.i18n($this.data('i18n')));
				}
			});
		}

		if (!key) {
			return i18n;
		}

		// Support variadic arguments
		if (parameter_1 !== undefined) {
			parameters = $.makeArray(arguments);
			parameters.shift();
		}

		if (typeof key === 'string') {
			return i18n.parse(key, parameters);
		} else {
			return i18n;
		}
	};

	var defaultParser = {
		parse: function(message, parameters) {
			return message.replace(/\$(\d+)/g, function(str, match) {
				var index = parseInt(match, 10) - 1;
				return parameters[index] !== undefined ? parameters[index] : '$' + match;
			});
		}
	};

	$.i18n.languages = {};

	$.i18n.parser = defaultParser;
	$.i18n.parser.emitter= {};
	$.i18n.defaults = {
		locale : String.locale,
		fallbackLocale : "en",
		parser : $.i18n.parser
	};

	$.i18n.Constructor = I18N;

	/**
	 * Convenient alias
	 */
	window._ = $.i18n;

}(jQuery, window, document));
