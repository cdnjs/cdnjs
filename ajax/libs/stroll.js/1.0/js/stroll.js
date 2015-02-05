/*!
 * stroll.js 1.0 - CSS scroll effects
 * http://lab.hakim.se/scroll-effects
 * MIT licensed
 * 
 * Created by Hakim El Hattab, http://hakim.se
 */
(function(){

	"use strict";

	// All of the lists that are currently bound
	var lists = [];

	// Set to true when there are lists to refresh
	var active = false;

	/**
	 * Updates all currently bound lists.
	 */
	function refresh() {
		if( active ) {
			requestAnimFrame( refresh );
			
			for( var i = 0, len = lists.length; i < len; i++ ) {
				lists[i].update();
			}
		}
	}

	/**
	 * Starts monitoring a list and applies classes to each of 
	 * its contained elements based on its position relative to 
	 * the list's viewport.
	 * 
	 * @param {HTMLElement} list 
	 */
	function add( list ) {
		// Don't allow dupes, only allow ul/ol
		if( contains( list ) || !list.nodeName || /^(ul|li)$/i.test( list.nodeName ) === false ) {
			return false;
		}

		// TODO: Create and measure element if the list is empty.
		
		var items = Array.prototype.slice.apply( list.children );

		// Caching some heights so we don't need to go back to the DOM so much
		var listHeight = list.offsetHeight;

		// One loop to get the offsets from the DOM
		for( var i = 0, len = items.length; i < len; i++ ) {
			items[i]._offsetTop = items[i].offsetTop;
			items[i]._offsetHeight = items[i].offsetHeight;
		}

		// Add this element to the collection
		lists.push( {
			domElement: list,

			// Apply past/future classes to list items outside of the viewport
			update: function( force ) {
				var scrollTop = list.pageYOffset || list.scrollTop,
					scrollBottom = scrollTop + listHeight;

				// Quit if nothing changed
				if( scrollTop !== list.lastTop ) {
					list.lastTop = scrollTop;
					
					// One loop to make our changes to the DOM
					for( var i = 0, len = items.length; i < len; i++ ) {
						var item = items[i];
						var itemClass = item.className;

						// Above list viewport
						if( item._offsetTop + item._offsetHeight < scrollTop ) {
							// Exclusion via string matching improves performance
							if( itemClass.indexOf( 'past' ) === -1 ) {
								item.classList.add( 'past' );
							}
						}
						// Below list viewport
						else if( item._offsetTop > scrollBottom ) {
							// Exclusion via string matching improves performance
							if( itemClass.indexOf( 'future' ) === -1 ) {
								item.classList.add( 'future' );
							}
						}
						// Inside of list viewport
						else if( itemClass.length ) {
							item.classList.remove( 'past' );
							item.classList.remove( 'future' );
						}
					}
				}
			}
		} );

		// Start refreshing if this was the first list to be added
		if( lists.length === 1 ) {
			active = true;
			refresh();
		}
	}

	/**
	 * Stops monitoring a list element and removes any classes 
	 * that were applied to its list items.
	 * 
	 * @param {HTMLElement} list 
	 */
	function remove( list ) {
		for( var i = 0; i < lists.length; i++ ) {
			if( lists[i].domElement == list ) {
				lists.splice( i, 1 );
				i--;

				var items = Array.prototype.slice.apply( list.children );

				for( var j = 0, len = items.length; j < len; j++ ) {
					var item = items[j];

					item.classList.remove( 'past' );
					item.classList.remove( 'future' );
				}
			}
		}

		// Stopped refreshing if the last list was removed
		if( lists.length === 0 ) {
			active = false;
		}
	}

	/**
	 * Checks if the specified element has already been bound.
	 */
	function contains( list ) {
		for( var i = 0, len = lists.length; i < len; i++ ) {
			if( lists[i].domElement == list ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Calls 'method' for each DOM element discovered in 
	 * 'target'.
	 * 
	 * @param target String selector / array of UL elements / 
	 * jQuery object / single UL element
	 * @param method A function to call for each element target
	 */
	function batch( target, method ) {
		var i, len;

		// Selector
		if( typeof target === 'string' ) {
			var targets = document.querySelectorAll( target );

			for( i = 0, len = targets.length; i < len; i++ ) {
				method.call( null, targets[i] );
			}
		}
		// Array (jQuery)
		else if( typeof target === 'object' && typeof target.length === 'number' ) {
			for( i = 0, len = target.length; i < len; i++ ) {
				method.call( null, target[i] );
			}
		}
		// Single element
		else if( target.nodeName ) {
			method.call( null, target );
		}
		else {
			throw 'Stroll target was of unexpected type.';
		}
	}

	/**
	 * Checks if the client is capable of running the library.
	 */
	function isCapable() {
		return !!document.body.classList;
	}

	/**
	 * Public API
	 */
	window.stroll = {
		/**
		 * Binds one or more lists for scroll effects.
		 */
		bind: function( target ) {
			if( isCapable() ) {
				batch( target, add );
			}
		},

		/**
		 * Unbinds one or more lists from scroll effects.
		 */
		unbind: function( target ) {
			if( isCapable() ) {
				batch( target, remove );
			}
		}
	}

	window.requestAnimFrame = (function(){
	   return  window.requestAnimationFrame       ||
	 		  window.webkitRequestAnimationFrame ||
	 		  window.mozRequestAnimationFrame    ||
	 		  window.oRequestAnimationFrame      ||
	 		  window.msRequestAnimationFrame     ||
	 		  function( callback ){
	 			window.setTimeout(callback, 1000 / 60);
	 		  };
	 })()

})();