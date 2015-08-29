/**
 * smooth-scroll v7.0.0
 * Animate scrolling to anchor links, by Chris Ferdinandi.
 * http://github.com/cferdinandi/smooth-scroll
 * 
 * Free to use under the MIT License.
 * http://gomakethings.com/mit/
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.buoy = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

	'use strict';

	// Object for public APIs
	var buoy = {};


	//
	// Methods
	//

	/**
	 * Wait until the DOM is ready before executing code
	 * @param {Function} fn The function to execute when the DOM is ready
	 */
	buoy.ready = function ( fn ) {

		// Sanity check
		if ( typeof fn  !== 'function' ) return;

		// If document is already loaded, run method
		if ( document.readyState === 'complete'  ) {
			return fn();
		}

		// Otherwise, wait until document is loaded
		document.addEventListener( 'DOMContentLoaded', fn, false );

	};

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists.
	 * @author Todd Motto
	 * @link   https://github.com/toddmotto/foreach
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function}              callback   Callback function for each iteration
	 * @param {Array|Object|NodeList} scope      Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	buoy.forEach = function ( collection, callback, scope ) {
		if ( Object.prototype.toString.call( collection ) === '[object Object]' ) {
			for ( var prop in collection ) {
				if ( Object.prototype.hasOwnProperty.call( collection, prop ) ) {
					callback.call( scope, collection[prop], prop, collection );
				}
			}
		} else {
			for ( var i = 0, len = collection.length; i < len; i++ ) {
				callback.call( scope, collection[i], i, collection );
			}
		}
	};

	/**
	 * Merge two or more objects. Returns a new object.
	 * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
	 * @param {Object}   objects  The objects to merge together
	 * @returns {Object}          Merged values of defaults and options
	 */
	buoy.extend = function () {

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
						extended[prop] = buoy.extend( true, extended[prop], obj[prop] );
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
	 * Get the height of an element.
	 * @param  {Node} elem The element to get the height of
	 * @return {Number}    The element's height in pixels
	 */
	buoy.getHeight = function ( elem ) {
		return Math.max( elem.scrollHeight, elem.offsetHeight, elem.clientHeight );
	};

	/**
	 * Get an element's distance from the top of the Document.
	 * @param  {Node} elem The element
	 * @return {Number}    Distance from the top in pixels
	 */
	buoy.getOffsetTop = function ( elem ) {
		var location = 0;
		if (elem.offsetParent) {
			do {
				location += elem.offsetTop;
				elem = elem.offsetParent;
			} while (elem);
		}
		return location >= 0 ? location : 0;
	};

	/**
	 * Get the closest matching element up the DOM tree.
	 * @param  {Element} elem     Starting element
	 * @param  {String}  selector Selector to match against (class, ID, data attribute, or tag)
	 * @return {Boolean|Element}  Returns null if not match found
	 */
	buoy.getClosest = function ( elem, selector ) {

		// Variables
		var firstChar = selector.charAt(0);
		var supports = 'classList' in document.documentElement;
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
				if ( supports ) {
					if ( elem.classList.contains( selector.substr(1) ) ) {
						return elem;
					}
				} else {
					if ( new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test( elem.className ) ) {
						return elem;
					}
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
	 * Get an element's parents.
	 * @param  {Node}   elem     The element
	 * @param  {String} selector Selector to match against (class, ID, data attribute, or tag)
	 * @return {Array}           An array of matching nodes
	 */
	buoy.getParents = function ( elem, selector ) {

		// Variables
		var parents = [];
		var supports = 'classList' in document.documentElement;
		var firstChar, attribute, value;

		// If selector is a data attribute, split attribute from value
		if ( selector ) {
			firstChar = selector.charAt(0);
			if ( firstChar === '[' ) {
				selector = selector.substr(1, selector.length - 2);
				attribute = selector.split( '=' );

				if ( attribute.length > 1 ) {
					value = true;
					attribute[1] = attribute[1].replace( /"/g, '' ).replace( /'/g, '' );
				}
			}
		}

		// Get matches
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( selector ) {

				// If selector is a class
				if ( firstChar === '.' ) {
					if ( supports ) {
						if ( elem.classList.contains( selector.substr(1) ) ) {
							parents.push( elem );
						}
					} else {
						if ( new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test( elem.className ) ) {
							parents.push( elem );
						}
					}
				}

				// If selector is an ID
				if ( firstChar === '#' ) {
					if ( elem.id === selector.substr(1) ) {
						parents.push( elem );
					}
				}

				// If selector is a data attribute
				if ( firstChar === '[' ) {
					if ( elem.hasAttribute( attribute[0] ) ) {
						if ( value ) {
							if ( elem.getAttribute( attribute[0] ) === attribute[1] ) {
								parents.push( elem );
							}
						} else {
							parents.push( elem );
						}
					}
				}

				// If selector is a tag
				if ( elem.tagName.toLowerCase() === selector ) {
					parents.push( elem );
				}

			} else {
				parents.push( elem );
			}

		}

		// Return parents if any exist
		if ( parents.length === 0 ) {
			return null;
		} else {
			return parents;
		}

	};

	/**
	 * Get an element's siblings.
	 * @param  {Node} elem The element
	 * @return {Array}     An array of sibling nodes
	 */
	buoy.getSiblings = function ( elem ) {

		// Variables
		var siblings = [];
		var sibling = elem.parentNode.firstChild;

		// Loop through all sibling nodes
		for ( ; sibling; sibling = sibling.nextSibling ) {
			if ( sibling.nodeType === 1 && sibling !== elem ) {
				siblings.push( sibling );
			}
		}

		return siblings;

	};

	/**
	 * Get data from a URL query string.
	 * @param  {String} field The field to get from the URL
	 * @param  {String} url   The URL to parse
	 * @return {String}       The field value
	 */
	buoy.getQueryString = function ( field, url ) {
		var href = url ? url : window.location.href;
		var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
		var string = reg.exec(href);
		return string ? string[1] : null;
	};


	//
	// Public APIs
	//

	return buoy;

});