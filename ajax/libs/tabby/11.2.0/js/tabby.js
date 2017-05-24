/*!
 * Tabby v11.2.0: Simple, mobile-first toggle tabs.
 * (c) 2016 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/tabby
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.tabby = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, (function (root) {

	'use strict';

	//
	// Variables
	//

	var tabby = {}; // Object for public APIs
	var supports = 'querySelector' in document && 'addEventListener' in root && 'classList' in document.createElement('_') && 'onhashchange' in root; // Feature test
	var settings, tab;

	// Default settings
	var defaults = {
		selectorToggle: '[data-tab]',
		selectorToggleGroup: '[data-tabs]',
		selectorContent: '[data-tabs-pane]',
		selectorContentGroup: '[data-tabs-content]',
		toggleActiveClass: 'active',
		contentActiveClass: 'active',
		initClass: 'js-tabby',
		stopVideo: true,
		callback: function () {}
	};


	//
	// Methods
	//

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists
	 * @private
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function} callback Callback function for each iteration
	 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	var forEach = function (collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0, len = collection.length; i < len; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function () {

		// Variables
		var extended = {};
		var deep = false;
		var i = 0;
		var length = arguments.length;

		// Check if a deep merge
		if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		var merge = function (obj) {
			for ( var prop in obj ) {
				if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
					// If deep merge and property is an object, merge properties
					if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
						extended[prop] = extend( true, extended[prop], obj[prop] );
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for ( ; i < length; i++ ) {
			var obj = arguments[i];
			merge(obj);
		}

		return extended;

	};

	/**
	 * Get the closest matching element up the DOM tree.
	 * @private
	 * @param  {Element} elem     Starting element
	 * @param  {String}  selector Selector to match against
	 * @return {Boolean|Element}  Returns null if not match found
	 */
	var getClosest = function ( elem, selector ) {

		// Element.matches() polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches =
				Element.prototype.matchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector ||
				Element.prototype.oMatchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				function(s) {
					var matches = (this.document || this.ownerDocument).querySelectorAll(s),
						i = matches.length;
					while (--i >= 0 && matches.item(i) !== this) {}
					return i > -1;
				};
		}

		// Get closest match
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( elem.matches( selector ) ) return elem;
		}

		return null;

	};

	/**
	 * Escape special characters for use with querySelector
	 * @public
	 * @param {String} id The anchor ID to escape
	 * @author Mathias Bynens
	 * @link https://github.com/mathiasbynens/CSS.escape
	 */
	var escapeCharacters = function ( id ) {

			// Remove leading hash
			if ( id.charAt(0) === '#' ) {
				id = id.substr(1);
			}

			var string = String(id);
			var length = string.length;
			var index = -1;
			var codeUnit;
			var result = '';
			var firstCodeUnit = string.charCodeAt(0);
			while (++index < length) {
				codeUnit = string.charCodeAt(index);
				// Note: there’s no need to special-case astral symbols, surrogate
				// pairs, or lone surrogates.

				// If the character is NULL (U+0000), then throw an
				// `InvalidCharacterError` exception and terminate these steps.
				if (codeUnit === 0x0000) {
					throw new InvalidCharacterError(
						'Invalid character: the input contains U+0000.'
					);
				}

				if (
					// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
					// U+007F, […]
					(codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
					// If the character is the first character and is in the range [0-9]
					// (U+0030 to U+0039), […]
					(index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
					// If the character is the second character and is in the range [0-9]
					// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
					(
						index === 1 &&
						codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
						firstCodeUnit === 0x002D
					)
				) {
					// http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
					result += '\\' + codeUnit.toString(16) + ' ';
					continue;
				}

				// If the character is not handled by one of the above rules and is
				// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
				// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
				// U+005A), or [a-z] (U+0061 to U+007A), […]
				if (
					codeUnit >= 0x0080 ||
					codeUnit === 0x002D ||
					codeUnit === 0x005F ||
					codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
					codeUnit >= 0x0041 && codeUnit <= 0x005A ||
					codeUnit >= 0x0061 && codeUnit <= 0x007A
				) {
					// the character itself
					result += string.charAt(index);
					continue;
				}

				// Otherwise, the escaped character.
				// http://dev.w3.org/csswg/cssom/#escape-a-character
				result += '\\' + string.charAt(index);

			}

			return '#' + result;

		};

	/**
	 * Stop YouTube, Vimeo, and HTML5 videos from playing when leaving the slide
	 * @private
	 * @param  {Element} content The content container the video is in
	 * @param  {String} activeClass The class asigned to expanded content areas
	 */
	var stopVideos = function ( content, settings ) {

		// Check if stop video enabled
		if ( !settings.stopVideo ) return;

		// Only run if content container is closed
		if ( content.classList.contains( settings.contentActiveClass ) ) return;

		// Check if the video is an iframe or HTML5 video
		var iframe = content.querySelector( 'iframe');
		var video = content.querySelector( 'video' );

		// Stop the video
		if ( iframe ) {
			var iframeSrc = iframe.src;
			iframe.src = iframeSrc;
		}
		if ( video ) {
			video.pause();
		}

	};

	/**
	 * Add focus to tab
	 * @private
	 * @param  {node}   tab      The content to bring into focus
	 * @param  {object} settings Options
	 */
	var adjustFocus = function ( tab, settings ) {

		if ( tab.hasAttribute( 'data-tab-no-focus' ) ) return;

		// If tab is closed, remove tabindex
		if ( !tab.classList.contains( settings.contentActiveClass ) ) {
			if ( tab.hasAttribute( 'data-tab-focused' ) ) {
				tab.removeAttribute( 'tabindex' );
			}
			return;
		}

		// Get current position on the page
		var position = {
			x: root.pageXOffset,
			y: root.pageYOffset
		};

		// Set focus and reset position to account for page jump on focus
		tab.focus();
		if ( document.activeElement.id !== tab.id ) {
			tab.setAttribute( 'tabindex', '-1' );
			tab.setAttribute( 'data-tab-focused', true );
			tab.focus();
		}
		root.scrollTo( position.x, position.y );

	};

	/**
	 * Toggle tab toggle active state
	 * @private
	 * @param  {Node}   toggle   The toggle element
	 * @param  {Object} settings
	 */
	var toggleToggles = function ( toggle, settings ) {

		// Variables
		var toggleGroup = getClosest( toggle, settings.selectorToggleGroup ); // The parent for the toggle group
		if ( !toggleGroup ) return;
		var toggles = toggleGroup.querySelectorAll( settings.selectorToggle ); // The toggles in the group
		var toggleList;

		// Show or hide each toggle
		// @todo Start here
		forEach(toggles, (function (item) {

			// If this is the selected toggle, activate it
			if ( item.hash === toggle.hash ) {

				// Add active class
				item.classList.add( settings.toggleActiveClass );

				// If toggle is a list item, activate <li> element, too
				toggleList = getClosest( item, 'li' );
				if ( toggleList ) {
					toggleList.classList.add( settings.toggleActiveClass );
				}

				return;

			}

			// Otherwise, deactivate it
			item.classList.remove( settings.toggleActiveClass );
			toggleList = getClosest( item, 'li' );
			if ( toggleList ) {
				toggleList.classList.remove( settings.toggleActiveClass );
			}

		}));

	};

	/**
	 * Toggle tab active state
	 * @private
	 * @param  {String} tabID    The ID of the tab to activate
	 * @param  {Object} settings
	 */
	var toggleTabs = function ( tabID, settings ) {

		// Variables
		var tab = document.querySelector( escapeCharacters( tabID ) ); // The selected tab
		if ( !tab ) return;
		var tabGroup = getClosest( tab, settings.selectorContentGroup ); // The parent for the tab group
		if ( !tabGroup ) return;
		var tabs = tabGroup.querySelectorAll( settings.selectorContent ); // The tabs in the group

		// Show or hide each tab
		forEach(tabs, (function (tab) {

			// If this is the selected tab, show it
			if ( tab.id === tabID.substring(1) ) {
				tab.classList.add( settings.contentActiveClass );
				adjustFocus( tab, settings );
				return;
			}

			// Otherwise, hide it
			tab.classList.remove( settings.contentActiveClass );
			stopVideos( tab, settings );
			adjustFocus( tab, settings );

		}));

	};

	/**
	 * Show a tab and hide all others
	 * @public
	 * @param  {Element} toggle The element that toggled the show tab event
	 * @param  {String}  tabID The ID of the tab to show
	 * @param  {Object}  options
	 */
	tabby.toggleTab = function ( tabID, toggle, options ) {

		// Selectors and variables
		var localSettings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var tabs = document.querySelectorAll( escapeCharacters( tabID ) ); // Get tab content

		// Toggle visibility of the toggles and tabs
		toggleTabs( tabID, localSettings );
		if ( toggle ) {
			toggleToggles(toggle, localSettings);
		}

		// Run callbacks after toggling tab
		localSettings.callback( tabs, toggle );

	};

	/**
	 * Handle has change event
	 * @private
	 */
	var hashChangeHandler = function (event) {

		// Get hash from URL
		var hash = root.location.hash;

		// If clicked tab is cached, reset it's ID
		if ( tab ) {
			tab.id = tab.getAttribute( 'data-tab-id' );
			tab = null;
		}

		// If there's a URL hash, activate tab with matching ID
		if ( !hash ) return;
		var toggle = document.querySelector( settings.selectorToggle + '[href*="' + hash + '"]' );
		tabby.toggleTab( hash, toggle );

	};

	/**
	 * Handle toggle click events
	 * @private
	 */
	var clickHandler = function (event) {

		// Don't run if right-click or command/control + click
		if ( event.button !== 0 || event.metaKey || event.ctrlKey ) return;

		// Check if event target is a tab toggle
		var toggle = getClosest( event.target, settings.selectorToggle );
		if ( !toggle || !toggle.hash ) return;

		// Don't run if toggle points to currently open tab
		if ( toggle.hash === root.location.hash ) {
			event.preventDefault();
			return;
		}

		// Get the tab content
		tab = document.querySelector( toggle.hash );

		// If tab content exists, save the ID as a data attribute and remove it (prevents scroll jump)
		if ( !tab ) return;
		tab.setAttribute( 'data-tab-id', tab.id );
		tab.id = '';

	};

	/**
	 * Handle content focus events
	 * @private
	 */
	var focusHandler = function (event) {

		// Only run if the focused content is in a tab
		tab = getClosest( event.target, settings.selectorContent );
		if ( !tab ) return;

		// Don't run if the content area is already open
		if ( tab.classList.contains( settings.contentActiveClass ) ) return;

		// Store tab ID to variable and remove it from the tab
		var hash = tab.id;
		tab.setAttribute( 'data-tab-id', hash );
		tab.setAttribute( 'data-tab-no-focus', true );
		tab.id = '';

		// Change the hash
		location.hash = hash;

	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	tabby.destroy = function () {
		if ( !settings ) return;
		document.documentElement.classList.remove( settings.initClass );
		document.removeEventListener('click', clickHandler, false);
		document.removeEventListener('focus', focusHandler, true);
		root.removeEventListener('hashchange', hashChangeHandler, false);
		settings = null;
		tab = null;
	};

	/**
	 * Initialize Tabby
	 * @public
	 * @param {Object} options User settings
	 */
	tabby.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		tabby.destroy();

		// Merge user options with defaults
		settings = extend( defaults, options || {} );

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// Listen for all click events
		document.addEventListener('click', clickHandler, false);
		document.addEventListener('focus', focusHandler, true);
		root.addEventListener('hashchange', hashChangeHandler, false);

		// If URL has a hash, activate hashed tab by default
		hashChangeHandler();

	};


	//
	// Public APIs
	//

	return tabby;

}));