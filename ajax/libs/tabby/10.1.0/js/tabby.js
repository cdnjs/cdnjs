/*!
 * Tabby v10.1.0: Simple, mobile-first toggle tabs.
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
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

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
	 * Get the closest matching element up the DOM tree
	 * @param {Element} elem Starting element
	 * @param {String} selector Selector to match against (class, ID, or data attribute)
	 * @return {Boolean|Element} Returns false if not match found
	 */
	var getClosest = function ( elem, selector ) {

		// Variables
		var firstChar = selector.charAt(0);
		var attribute, value;

		// If selector is a data attribute, split attribute from value
		if ( firstChar === '[' ) {
			selector = selector.substr(1, selector.length - 2);
			attribute = selector.split( '=' );

			if ( attribute.length > 1 ) {
				value = true;
				attribute[1] = attribute[1].replace( /"/g, '' ).replace( /'/g, '' );
			}
		}

		// Get closest match
		for ( ; elem && elem !== document; elem = elem.parentNode ) {

			// If selector is a class
			if ( firstChar === '.' ) {
				if ( elem.classList.contains( selector.substr(1) ) ) {
					return elem;
				}
			}

			// If selector is an ID
			if ( firstChar === '#' ) {
				if ( elem.id === selector.substr(1) ) {
					return elem;
				}
			}

			// If selector is a data attribute
			if ( firstChar === '[' ) {
				if ( elem.hasAttribute( attribute[0] ) ) {
					if ( value ) {
						if ( elem.getAttribute( attribute[0] ) === attribute[1] ) {
							return elem;
						}
					} else {
						return elem;
					}
				}
			}

			// If selector is a tag
			if ( elem.tagName.toLowerCase() === selector ) {
				return elem;
			}

		}

		return null;

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

		// Only run if content container was open
		if ( !content.classList.contains( settings.contentActiveClass ) ) return;

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
		var toggleList = getClosest( toggle, 'li' ); // Toggle list item (if applicable)

		// Hide each toggle
		forEach(toggles, function (toggle) {

			// Toggle class
			toggle.classList.remove( settings.toggleActiveClass );

			// If toggle is a list item, toggle class
			var toggleList = getClosest( toggle, 'li' );
			if ( toggleList ) {
				toggleList.classList.remove( settings.toggleActiveClass );
			}

		});

		// Show the selected toggle
		toggle.classList.add( settings.toggleActiveClass );
		if ( toggleList ) {
			toggleList.classList.add( settings.toggleActiveClass );
		}

	};

	/**
	 * Toggle tab active state
	 * @private
	 * @param  {String} tabID    The ID of the tab to activate
	 * @param  {Object} settings
	 */
	var toggleTabs = function ( tabID, settings ) {

		// Variables
		var tab = document.querySelector( tabID ); // The selected tab
		if ( !tab ) return;
		var tabGroup = getClosest( tab, settings.selectorContentGroup ); // The parent for the tab group
		if ( !tabGroup ) return;
		var tabs = tabGroup.querySelectorAll( settings.selectorContent ); // The tabs in the group

		// Hide each tab
		forEach(tabs, function (tab) {
			stopVideos( tab, settings );
			tab.classList.remove( settings.contentActiveClass );
		});

		// Show the selected tab
		tab.classList.add( settings.contentActiveClass );

	};

	/**
	 * Show a tab and hide all others
	 * @public
	 * @param  {Element} toggle The element that toggled the show tab event
	 * @param  {String}  tabID The ID of the tab to show
	 * @param  {Object}  options
	 */
	tabby.toggleTab = function ( toggle, tabID, options ) {

		// Selectors and variables
		var toggleSettings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var tabs = document.querySelectorAll(tabID); // Get tab content

		// Toggle visibility of the toggles and tabs
		toggleToggles(toggle, toggleSettings);
		toggleTabs( tabID, toggleSettings );

		// Run callbacks after toggling tab
		toggleSettings.callback( toggle, tabID );

	};

	/**
	 * Handle has change event
	 * @private
	 */
	var hashChangeHandler = function () {

		// Get hash from URL
		var hash = root.location.hash;

		// If clicked tab is cached, reset it's ID
		if ( tab ) {
			tab.id = tab.getAttribute( 'data-tab-id' );
			tab = null;
		}

		// If there's a URL hash, activate tab with matching ID
		if ( !hash ) return;
		var toggle = document.querySelector('[data-tab][href*="' + hash + '"]');
		tabby.toggleTab( toggle, hash );

	};

	/**
	 * Handle toggle click events
	 * @private
	 */
	var clickHandler = function (event) {

		// Check if event target is a tab toggle, and that it's not the currently active toggle
		var toggle = getClosest( event.target, settings.selectorToggle );
		if ( !toggle || !toggle.hash ) return;
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
	 * Destroy the current initialization.
	 * @public
	 */
	tabby.destroy = function () {
		if ( !settings ) return;
		document.documentElement.classList.remove( settings.initClass );
		document.removeEventListener('click', clickHandler, false);
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
		root.addEventListener('hashchange', hashChangeHandler, false);

		// If URL has a hash, activate hashed tab by default
		hashChangeHandler();

	};


	//
	// Public APIs
	//

	return tabby;

});