/*!
 * Kraken v7.6.0: A lightweight front-end boilerplate
 * (c) 2018 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/kraken
 * Open Source Credits: 
 */

;(function (window, document, undefined) {

	'use strict';

	// SVG feature detection
	var supports = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
	if ( !supports ) return;

	// Add `.svg` class to <html> element
	document.documentElement.className += (document.documentElement.className ? ' ' : '') + 'svg';

})(window, document);