/**
 * gumshoe v1.0.0
 * A simple, framework-agnostic scrollspy script., by Chris Ferdinandi.
 * http://github.com/cferdinandi/gumshoe
 * 
 * Free to use under the MIT License.
 * http://gomakethings.com/mit/
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('gumshoe', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.gumshoe = factory(root);
	}
})(window || this, function (root) {

	'use strict';

	//
	// Variables
	//

	var gumshoe = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var navs = []; // Array for nav elements
	var settings, eventTimeout, docHeight, header, headerHeight, currentNav;

	// Default settings
	var defaults = {
		offset: 0,
		activeClass: 'active',
		callbackBefore: function () {},
		callbackAfter: function () {}
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
	var extend = function ( defaults, options ) {
		var extended = {};
		forEach(defaults, function (value, prop) {
			extended[prop] = defaults[prop];
		});
		forEach(options, function (value, prop) {
			extended[prop] = options[prop];
		});
		return extended;
	};

	/**
	 * Get the document element's height
	 * @private
	 * @returns {Number}
	 */
	var getDocumentHeight = function () {
		return Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);
	};

	/**
	 * Get the height of an element
	 * @private
	 * @param  {Node} elem The element
	 * @return {Number}    The element's height
	 */
	var getHeight = function ( elem ) {
		return Math.max( elem.scrollHeight, elem.offsetHeight, elem.clientHeight );
	};

	/**
	 * Calculate how far from the top of the document an element is
	 * @private
	 * @param {Node} elem The element
	 * @returns {Number}  The distance from the top of the document
	 */
	var getDistance = function ( elem ) {
		var location = 0;
		if (elem.offsetParent) {
			do {
				location += elem.offsetTop;
				elem = elem.offsetParent;
			} while (elem);
		}
		location = location - headerHeight - settings.offset;
		return location >= 0 ? location : 0;
	};

	/**
	 * Arrange nagivation elements from furthest from the top to closest
	 * @private
	 */
	var sortNavs = function () {
		navs.sort( function (a, b) {
			if (a.distance > b.distance) {
				return -1;
			}
			if (a.distance < b.distance) {
				return 1;
			}
			return 0;
		});
	};

	/**
	 * Calculate the distance of elements from the top of the document
	 * @public
	 */
	gumshoe.setDistances = function () {

		// Calculate distances
		docHeight = getDocumentHeight(); // The document
		headerHeight = header ? ( getHeight(header) + getDistance(header) ) : 0; // The fixed header
		forEach(navs, function (nav) {
			nav.distance = getDistance(nav.target); // Each navigation target
		});

		// When done, organization navigation elements
		sortNavs();

	};

	/**
	 * Get all navigation elements and store them in an array
	 * @private
	 */
	var getNavs = function () {

		// Get all navigation links
		var navLinks = document.querySelectorAll( '[data-gumshoe] a' );

		// For each link, create an object of attributes and push to an array
		forEach( navLinks, function (nav) {
			if ( !nav.hash ) return;
			navs.push({
				nav: nav,
				target: document.querySelector( nav.hash ),
				parent: nav.parentNode.tagName.toLowerCase() === 'li' ? nav.parentNode : null,
				distance: 0
			});
		});

	};

	/**
	 * Add the activation class to the currently active navigation element
	 * @private
	 * @param  {Node} nav The currently active nav
	 */
	var activateNav = function ( nav ) {

		// If a current Nav is set, deactivate it
		if ( currentNav ) {
			currentNav.nav.classList.remove( settings.activeClass );
			if ( currentNav.parent ) {
				currentNav.parent.classList.remove( settings.activeClass );
			}
		}

		settings.callbackBefore( nav ); // Callback before methods are run

		// Activate the current target's navigation element
		nav.nav.classList.add( settings.activeClass );
		if ( nav.parent ) {
			nav.parent.classList.add( settings.activeClass );
		}

		settings.callbackAfter( nav ); // Callback after methods are run

		// Set new currentNav
		currentNav = {
			nav: nav.nav,
			parent: nav.parent
		};

	};

	/**
	 * Determine which navigation element is currently active and run activation method
	 * @public
	 */
	gumshoe.getCurrentNav = function () {

		// Get current position from top of the document
		var position = root.pageYOffset;

		// If at the bottom of the page, activate the last nav
		if ( (root.innerHeight + position) >= docHeight ) {
			return activateNav( navs[0] );
		}

		// Otherwise, loop through each nav until you find the active one
		for (var i = 0, len = navs.length; i < len; i++) {
			var nav = navs[i];
			if ( nav.distance < position ) {
				return activateNav( nav );
			}
		}

	};

	/**
	 * If nav element has active class on load, set it as currently active navigation
	 * @private
	 */
	var setInitCurrentNav = function () {
		forEach(navs, function (nav) {
			if ( nav.nav.classList.contains( settings.activeClass ) ) {
				currentNav = {
					nav: nav.nav,
					parent: nav.parent
				};
			}
		});
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	gumshoe.destroy = function () {

		// If plugin isn't already initialized, stop
		if ( !settings ) return;

		// Remove event listeners
		document.removeEventListener('resize', eventHandler, false);
		document.removeEventListener('scroll', eventHandler, false);

		// Reset variables
		navs = [];
		settings = null;
		eventTimeout = null;
		docHeight = null;
		header = null;
		headerHeight = null;
		currentNav = null;

	};

	/**
	 * On window scroll and resize, only run events at a rate of 15fps for better performance
	 * @private
	 * @param  {Function} eventTimeout Timeout function
	 * @param  {Object} settings
	 */
	var eventThrottler = function (event) {
		if ( !eventTimeout ) {
			eventTimeout = setTimeout(function() {

				eventTimeout = null; // Reset timeout

				// If scroll event, get currently active nav
				if ( event.type === 'scroll' ) {
					gumshoe.getCurrentNav();
				}

				// If resize event, recalculate distances and then get currently active nav
				if ( event.type === 'resize' ) {
					gumshoe.setDistances();
					gumshoe.getCurrentNav();
				}

			}, 66);
		}
	};

	/**
	 * Initialize Plugin
	 * @public
	 * @param {Object} options User settings
	 */
	gumshoe.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		gumshoe.destroy();

		// Set variables
		settings = extend( defaults, options || {} ); // Merge user options with defaults
		header = document.querySelector('[data-gumshoe-header]'); // Get fixed header
		getNavs(); // Get navigation elements

		// If no navigation elements exist, stop running gumshoe
		if ( navs.length === 0 ) return;

		// Run init methods
		setInitCurrentNav();
		gumshoe.setDistances();
		gumshoe.getCurrentNav();

		// Listen for events
		root.addEventListener('resize', eventThrottler, false);
		root.addEventListener('scroll', eventThrottler, false);

	};


	//
	// Public APIs
	//

	return gumshoe;

});