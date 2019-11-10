/**
 * jQuery Internationalization library
 *
 * Copyright (C) 2012 Santhosh Thottingal
 *
 * jquery.i18n is dual licensed GPLv2 or later and MIT. You don't have to do
 * anything special to choose one license or the other and you don't have to
 * notify anyone which license you are using. You are free to use
 * UniversalLanguageSelector in commercial projects as long as the copyright
 * header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
 *
 * @licence GNU General Public Licence 2.0 or later
 * @licence MIT License
 */

( function ( $ ) {
	'use strict';

	var nav,
		slice = Array.prototype.slice;
	/**
	 * @constructor
	 * @param {Object} options
	 */
	var I18N = function ( options ) {
		// Load defaults
		this.options = $.extend( {}, I18N.defaults, options );

		this.parser = this.options.parser;
		this.locale = this.options.locale;
		this.messageStore = this.options.messageStore;
		this.languages = {};

		this.init();
	};

	I18N.prototype = {
		/**
		 * Initialize by loading locales and setting up
		 * String.prototype.toLocaleString and String.locale.
		 */
		init: function () {
			var i18n;

			i18n = this;
			i18n.messageStore.init( i18n.locale );
			// Set locale of String environment
			String.locale = i18n.locale;

			// Override String.localeString method
			String.prototype.toLocaleString = function () {
				var localeParts, messageLocation, localePartIndex, value, locale, fallbackIndex;

				value = this.valueOf();
				locale = i18n.locale;
				fallbackIndex = 0;

				while ( locale ) {
					// Iterate through locales starting at most-specific until
					// localization is found. As in fi-Latn-FI, fi-Latn and fi.
					localeParts = locale.toLowerCase().split( '-' );
					localePartIndex = localeParts.length;

					do {
						var _locale = localeParts.slice( 0, localePartIndex ).join( '-' );

						if ( i18n.options.messageLocationResolver ) {
							messageLocation = i18n.options.messageLocationResolver( _locale, value );

							if ( messageLocation &&
								( !i18n.messageStore.isLoaded( _locale ,messageLocation ) )
							) {
								i18n.messageStore.load( messageLocation, _locale );
							}
						}

						var message = i18n.messageStore.get( _locale, value );

						if ( message ) {
							return message;
						}

						localePartIndex--;
					} while ( localePartIndex );

					if ( locale === 'en' ) {
						break;
					}

					locale = ( $.i18n.fallbacks[i18n.locale] && $.i18n.fallbacks[i18n.locale][fallbackIndex] ) ||
						i18n.options.fallbackLocale;
					i18n.log( 'Trying fallback locale for ' + i18n.locale + ': ' + locale );

					fallbackIndex++;
				}

				// key not found
				return '';
			};
		},

		/*
		 * Destroy the i18n instance.
		 */
		destroy: function () {
			$.removeData( document, 'i18n' );
		},

		/**
		 * General message loading API This can take a URL string for
		 * the json formatted messages.
		 * <code>load('path/to/all_localizations.json');</code>
		 *
		 * This can also load a localization file for a locale <code>
		 * load('path/to/de-messages.json', 'de' );
		 * </code>
		 * A data object containing message key- message translation mappings
		 * can also be passed Eg:
		 * <code>
		 * load( { 'hello' : 'Hello' }, optionalLocale );
		 * </code> If the data argument is
		 * null/undefined/false,
		 * all cached messages for the i18n instance will get reset.
		 *
		 * @param {String|Object|null} data
		 * @param {String} locale Language tag
		 */
		load: function ( data, locale ) {
			this.messageStore.load( data, locale );
		},

		log: function ( /* arguments */ ) {
			if ( window.console && $.i18n.debug ) {
				window.console.log.apply( window.console, arguments );
			}
		},

		/**
		* Does parameter and magic word substitution.
		*
		* @param {string} key Message key
		* @param {Array} parameters Message parameters
		* @return {string}
		*/
		parse: function ( key, parameters ) {
			var message = key.toLocaleString();
			// FIXME: This changes the state of the I18N object,
			// should probably not change the 'this.parser' but just
			// pass it to the parser.
			this.parser.language = $.i18n.languages[$.i18n().locale] || $.i18n.languages['default'];
			if( message === '' ) {
				message = key;
			}
			return this.parser.parse( message, parameters );
		}
	};


	/**
	* Process a message from the $.I18N instance
	* for the current document, stored in jQuery.data(document).
	*
	* @param {string} key Key of the message.
	* @param {string} param1 [param...] Variadic list of parameters for {key}.
	* @return {string|$.I18N} Parsed message, or if no key was given
	* the instance of $.I18N is returned.
	*/
	$.i18n = function ( key, param1 ) {
		var parameters,
			i18n = $.data( document, 'i18n' ),
			options = typeof key === 'object' && key;

		// If the locale option for this call is different then the setup so far,
		// update it automatically. This doesn't just change the context for this
		// call but for all future call as well.
		// If there is no i18n setup yet, don't do this. It will be taken care of
		// by the `new I18N` construction below.
		// NOTE: It should only change language for this one call.
		// Then cache instances of I18N somewhere.
		if ( options && options.locale && i18n && i18n.locale !== options.locale ) {
			String.locale = i18n.locale = options.locale;
		}

		if ( !i18n ) {
			i18n = new I18N( options );
			$.data( document, 'i18n', i18n );
		}

		if ( typeof key === 'string' ) {
			if ( param1 !== undefined ) {
				parameters = slice.call( arguments, 1 );
			} else {
				parameters = [];
			}

			return i18n.parse( key, parameters );
		} else {
			// FIXME: remove this feature/bug.
			return i18n;
		}
	};

	$.fn.i18n = function () {
		var i18n = $.data( document, 'i18n' );
		String.locale = i18n.locale;
		if ( !i18n ) {
			i18n = new I18N( );
			$.data( document, 'i18n', i18n );
		}
		return this.each( function () {
			var $this = $( this );

			if ( $this.data( 'i18n' ) ) {
				var messageKey = $this.data( 'i18n' ),
					message = messageKey.toLocaleString();
				if ( message !== '' ) {
					$this.text( message );
				}
			} else {
				$this.find( '[data-i18n]' ).i18n();
			}
		} );
	};

	String.locale = String.locale || $( 'html' ).attr( 'lang' );

	if ( !String.locale ) {
		if ( typeof window.navigator !== undefined ) {
			nav = window.navigator;
			String.locale = nav.language || nav.userLanguage || '';
		} else {
			String.locale = '';
		}
	}

	$.i18n.languages = {};
	$.i18n.messageStore = $.i18n.messageStore || {};
	$.i18n.parser = {
		// The default parser only handles variable substitution
		parse: function ( message, parameters ) {
			return message.replace( /\$(\d+)/g, function ( str, match ) {
				var index = parseInt( match, 10 ) - 1;
				return parameters[index] !== undefined ? parameters[index] : '$' + match;
			} );
		},
		emitter: {}
	};

	$.i18n.debug = false;

	/* Static members */
	I18N.defaults = {
		locale: String.locale,
		fallbackLocale: 'en',
		parser: $.i18n.parser,
		messageStore: $.i18n.messageStore,
		/* messageLocationResolver - should be a function taking language code as argument and
		 * returning absolute or relative path to the localization file
		 */
		messageLocationResolver: null
	};

	// Expose constructor
	$.I18N = I18N;
}( jQuery ) );
