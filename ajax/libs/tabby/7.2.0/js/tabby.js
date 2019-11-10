/**
 * Tabby v7.2.0
 * Simple, mobile-first toggle tabs., by Chris Ferdinandi.
 * http://github.com/cferdinandi/tabby
 * 
 * Free to use under the MIT License.
 * http://gomakethings.com/mit/
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('tabby', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.tabby = factory(root);
	}
})(this, function (root) {

	'use strict';

	//
	// Variables
	//

	var exports = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test

	// Default settings
	var defaults = {
		toggleActiveClass: 'active',
		contentActiveClass: 'active',
		initClass: 'js-tabby',
		callbackBefore: function () {},
		callbackAfter: function () {}
	};


	//
	// Methods
	//

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function ( defaults, options ) {
		for ( var key in options ) {
			if (Object.prototype.hasOwnProperty.call(options, key)) {
				defaults[key] = options[key];
			}
		}
		return defaults;
	};

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
	 * Get siblings of an element
	 * @private
	 * @param  {Element} elem
	 * @return {NodeList}
	 */
	var getSiblings = function (elem) {
		var siblings = [];
		var sibling = elem.parentNode.firstChild;
		var skipMe = elem;
		for ( ; sibling; sibling = sibling.nextSibling ) {
			if ( sibling.nodeType == 1 && sibling != elem ) {
				siblings.push( sibling );
			}
		}
		return siblings;
	};

	/**
	 * Stop YouTube, Vimeo, and HTML5 videos from playing when leaving the slide
	 * @private
	 * @param  {Element} content The content container the video is in
	 * @param  {String} activeClass The class asigned to expanded content areas
	 */
	var stopVideos = function ( content, activeClass ) {
		if ( !content.classList.contains( activeClass ) ) {
			var iframe = content.querySelector( 'iframe');
			var video = content.querySelector( 'video' );
			if ( iframe ) {
				var iframeSrc = iframe.src;
				iframe.src = iframeSrc;
			}
			if ( video ) {
				video.pause();
			}
		}
	};

	/**
	 * Deactivate all other tab toggles
	 * @private
	 * @param  {NodeList} toggleSiblings Sibling elements to the toggle element
	 * @param  {NodeList} toggleParentSiblings Sibling elements to the toggle's parent element
	 * @param  {Object} settings
	 */
	var deactivateOtherToggles = function ( toggleSiblings, toggleParentSiblings, settings ) {
		forEach(toggleSiblings, function (sibling) {
			sibling.classList.remove( settings.toggleActiveClass );
		});
		forEach(toggleParentSiblings, function (sibling) {
			if ( sibling.tagName.toLowerCase() === 'li' ) {
				sibling.classList.remove( settings.toggleActiveClass );
			}
		});
	};

	/**
	 * Hide all tab content sections
	 * @private
	 * @param  {NodeList} tabSiblings Siblings to current tab content area
	 * @param  {Object} settings
	 */
	var hideOtherTabs = function ( tabSiblings, settings ) {
		forEach(tabSiblings, function (tab) {
			if ( tab.classList.contains( settings.contentActiveClass ) ) {
				stopVideos(tab);
				tab.classList.remove( settings.contentActiveClass );
			}
		});
	};

	/**
	 * Show target tabs
	 * @private
	 * @param  {NodeList} tabs A nodelist of tabs to close
	 * @param  {Object} settings
	 */
	var showTargetTabs = function ( tabs, settings ) {
		forEach(tabs, function (tab) {
			var tabSiblings = getSiblings(tab);
			tab.classList.add( settings.contentActiveClass );
			hideOtherTabs(tabSiblings, settings);
		});
	};

	/**
	 * Show a tab and hide all others
	 * @public
	 * @param  {Element} toggle The element that toggled the show tab event
	 * @param  {String} tabID The ID of the tab to show
	 * @param  {Object} options
	 * @param  {Event} event
	 */
	exports.toggleTab = function ( toggle, tabID, options, event ) {

		// Selectors and variables
		var settings = extend( defaults, options || {} ); // Merge user options with defaults
		var tabs = document.querySelectorAll(tabID); // Get tab content

		// Get other toggle elements
		var toggleParent = toggle.parentNode;
		var toggleSiblings = getSiblings(toggle);
		var toggleParentSiblings = getSiblings(toggleParent);

		// If a link, prevent default click event
		if ( toggle && toggle.tagName.toLowerCase() === 'a' && event ) {
			event.preventDefault();
		}

		settings.callbackBefore( toggle, tabID ); // Run callbacks before toggling tab

		// Set clicked toggle to active. Deactivate others.
		toggle.classList.add( settings.toggleActiveClass );
		if ( toggleParent && toggleParent.tagName.toLowerCase() === 'li' ) {
			toggleParent.classList.add( settings.toggleActiveClass );
		}
		deactivateOtherToggles(toggleSiblings, toggleParentSiblings, settings);

		// Show target tab content. Hide others.
		showTargetTabs(tabs, settings);

		settings.callbackAfter( toggle, tabID ); // Run callbacks after toggling tab

	};

	/**
	 * Initialize Tabby
	 * @public
	 * @param {Object} options User settings
	 */
	exports.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Selectors and variables
		var settings = extend( defaults, options || {} ); // Merge user options with defaults
		var toggles = document.querySelectorAll('[data-tab]'); // Get all tab toggle elements
		document.documentElement.classList.add( settings.initClass ); // Add class to HTML element to activate conditional CSS

		// When tab toggles are clicked, hide/show tab content
		forEach(toggles, function (toggle) {
			toggle.addEventListener('click', exports.toggleTab.bind(null, toggle, toggle.getAttribute('data-tab'), settings), false);
		});

	};


	//
	// Public APIs
	//

	return exports;

});