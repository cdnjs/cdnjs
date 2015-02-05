/**
 * Applies descriptive classes to list items based on their 
 * position relative to their parent lists' scroll state.
 * 
 * Demo: http://lab.hakim.se/scroll-effects/
 * 
 * @author Hakim El Hattab | http://hakim.se
 * @author Paul Irish | http://paulirish.com
 * @author Felix Gnass | http://fgnass.github.com
 */

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
		  window.webkitRequestAnimationFrame ||
		  window.mozRequestAnimationFrame    ||
		  window.oRequestAnimationFrame      ||
		  window.msRequestAnimationFrame     ||
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
})();


var Stroll = {
	bind: function( element ) {

		var items = Array.prototype.slice.apply( element.children );

		// caching some heights so we don't need to go back to the DOM so much
		var listHeight = element.offsetHeight;

		// one loop to get the offsets from the DOM
		for( var i = 0, len = items.length; i < len; i++ ) {
			items[i]._offsetTop = items[i].offsetTop;
			items[i]._offsetHeight = items[i].offsetHeight;
		}

		return (function() {

			(function animloop() {
				requestAnimFrame( animloop );
				update();
			})();

			// Apply past/future classes to list items outside of the viewport
			function update() {
				var scrollTop = element.pageYOffset || element.scrollTop,
					scrollBottom = scrollTop + listHeight;

				// Quit if nothing changed
				if( scrollTop !== element.lastTop ) {
					element.lastTop = scrollTop;

					// One loop to make our changes to the DOM
					for( var i = 0, len = items.length; i < len; i++ ) {
						var item = items[i];

						// Above list viewport
						if( item._offsetTop + item._offsetHeight < scrollTop ) {
							item.classList.add( 'past' );
						}
						// Below list viewport
						else if( item._offsetTop > scrollBottom ) {
							item.classList.add( 'future' );
						}
						// Inside of list viewport
						else {
							item.classList.remove( 'past' );
							item.classList.remove( 'future' );
						}
					}
				}
			}

		})();
	}
};
