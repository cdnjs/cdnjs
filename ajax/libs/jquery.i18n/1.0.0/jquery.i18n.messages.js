/**
 * jQuery Internationalization library Message loading , parsing, retrieving utilities
 *
 * Copyright (C) 2012 Santhosh Thottingal
 *
 * jquery.i18n is dual licensed GPLv2 or later and MIT. You don't have to do anything special to
 * choose one license or the other and you don't have to notify anyone which license you are using.
 * You are free to use UniversalLanguageSelector in commercial projects as long as the copyright
 * header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
 *
 * @licence GNU General Public Licence 2.0 or later
 * @licence MIT License
 */

( function ( $, window, undefined ) {
	'use strict';

	var MessageStore = function () {
		this.messages = {};
		this.sources = {};
		this.locale = String.locale;
	};

	MessageStore.prototype = {

		/**
		 * See https://github.com/wikimedia/jquery.i18n/wiki/Specification#wiki-Message_File_Loading
		 *
		 * @param locale
		 */
		init: function ( locale ) {
			var messageStore = this;

			messageStore.locale = locale;
			messageStore.log( 'initializing for ' + locale );

			$( 'link' ).each( function ( index, element ) {
				var $link = $( element ),
					rel = ( $link.attr( 'rel' ) || '' ).toLowerCase().split( /\s+/ );

				if ( $.inArray( 'localizations', rel ) !== -1 ) {
					// multiple localizations
					messageStore.load( $link.attr( 'href' ) );
				} else if ( $.inArray( 'localization', rel ) !== -1 ) {
					// single localization
					messageStore.queue( ( $link.attr( 'hreflang' ) || '' ).toLowerCase(),
						$link.attr( 'href' ) );
				}
			} );
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
			var key = null,
				messageStore = this,
				hasOwn = Object.prototype.hasOwnProperty;

			if ( !data ) {
				// reset all localizations
				messageStore.log( 'Resetting for locale ' + locale );
				messageStore.messages = {};

				return;
			}

			if ( typeof data === 'string' ) {
				// This is a URL to the messages file.
				messageStore.log( 'Loading messages from: ' + data );

				messageStore.jsonMessageLoader( data ).done( function ( localization, textStatus ) {
					messageStore.load( localization, locale );
					messageStore.queue( locale, data );
					messageStore.markLoaded( locale, data );
				} );
			} else {
				// Data is either a group of messages for {locale},
				// or a group of languages with groups of messages inside.
				for ( key in data ) {
					if ( hasOwn.call( data, key ) ) {
						if ( locale ) {

							// Lazy-init the object
							if ( !messageStore.messages[locale] ) {
								messageStore.messages[locale] = {};
							}

							// Update message object keys,
							// don't overwrite the entire object.
							messageStore.messages[locale][key] = data[key];

							messageStore.log(
								'[' + locale + '][' + key + '] : ' + data[key]
							);

							// No {locale} given, assume data is a group of languages,
							// call this function again for each langauge.
						} else {
							messageStore.load( data[key], key );
						}
					}
				}
			}
		},

		log: function ( /* arguments */ ) {
			if ( window.console && $.i18n.debug ) {
				window.console.log.apply( window.console, arguments );
			}
		},

		/**
		 * Mark a message Location for a locale loaded
		 *
		 * @param locale
		 * @param messageLocation
		 */
		markLoaded: function ( locale, messageLocation ) {
			var i,
				queue = this.sources[locale];

			if ( !queue ) {
				this.queue( locale, messageLocation );
				queue = this.sources[locale];
			}

			this.sources[locale] = this.sources[locale] || [];

			for ( i = 0; i < queue.length; i++ ) {
				if ( queue[i].source.url === messageLocation ) {
					queue[i].source.loaded = true;

					return;
				}
			}
		},

		/**
		 * Register the message location for a locale, will be loaded when required
		 *
		 * @param locale
		 * @param messageLocation
		 */
		queue: function ( locale, messageLocation ) {
			var i,
				queue = this.sources[locale];

			this.sources[locale] = this.sources[locale] || [];

			if ( queue ) {
				for ( i = 0; i < queue.length; i++ ) {
					if ( queue[i].source.url === messageLocation ) {
						return;
					}
				}
			}

			this.log( 'Source for: ' + locale + ' is ' + messageLocation + ' registered' );
			this.sources[locale].push( {
				source: {
					url: messageLocation,
					loaded: false
				}
			} );
		},

		/**
		 * Load the messages from the source queue for the locale
		 *
		 * @param {String} locale
		 */
		loadFromQueue: function ( locale ) {
			var i,
				queue = this.sources[locale];

			if ( queue ) {
				for ( i = 0; i < queue.length; i++ ) {
					if ( !queue[i].source.loaded ) {
						this.load( queue[i].source.url, locale );
						this.sources[locale][i].source.loaded = true;
					}
				}
			}
		},

		isLoaded: function ( locale, messageLocation ) {
			var i,
				sources = this.sources[locale],
				result = false;

			if ( sources ) {
				for ( i = 0; i < sources.length; i++ ) {
					if ( sources[i].source.url === messageLocation ) {
						result = true;
					}
				}
			}

			return result;
		},

		jsonMessageLoader: function ( url ) {
			var messageStore = this;

			return $.ajax( {
				url: url,
				dataType: 'json',
				async: false
			// This is unfortunate.
			} ).fail( function ( jqxhr, settings, exception ) {
				messageStore.log( 'Error in loading messages from ' + url + ' Exception: ' + exception );
			} );
		},

		/**
		 *
		 * @param locale
		 * @param messageKey
		 * @returns {Boolean}
		 */
		get: function ( locale, messageKey ) {
			// load locale if not loaded
			if ( !this.messages[locale] ) {
				this.loadFromQueue( locale );
			}

			return this.messages[locale] && this.messages[locale][messageKey];
		}
	};

	$.extend( $.i18n.messageStore, new MessageStore() );

}( jQuery, window ) );
