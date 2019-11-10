/**
 * Kraken v7.0.0
 * A lightweight front-end boilerplate, by Chris Ferdinandi.
 * http://github.com/cferdinandi/kraken
 * 
 * Free to use under the MIT License.
 * http://gomakethings.com/mit/
 */

;(function (window, document, undefined) {

	'use strict';

	// SVG feature detection
	var supports = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
	if ( !supports ) return;

	// Add `.svg` class to <html> element
	document.documentElement.className += (document.documentElement.className ? ' ' : '') + 'svg';

})(window, document);