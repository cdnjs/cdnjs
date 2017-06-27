/* snapper css snap points carousel */
;(function( w, $ ){
	var pluginName = "snapper";
	$.fn[ pluginName ] = function(){
		var testProp = "scroll-snap-type";
		var snapSupported = w.CSS && w.CSS.supports && ( w.CSS.supports( testProp, "mandatory") || w.CSS.supports("-webkit-" + testProp, "mandatory")  || w.CSS.supports("-ms-" + testProp, "mandatory") );

		return this.each(function(){
			var self = this;

			// optional: include overthrow.toss() in your page to get a smooth scroll, otherwise it'll just jump to the slide
			function goto( elem, x ){
				if( typeof w.overthrow !== "undefined" ){
					w.overthrow.toss( elem, { left: x } );
				}
				else {
					elem.scrollLeft = x;
				}
			}
			var $slider = $( "." + pluginName + "_pane", self );
			var $itemsContain = $slider.find( "." + pluginName + "_items" );
			var $items = $itemsContain.children();

			// even if CSS snap is supported, this click binding will allow deep-linking to slides without causing the page to scroll to the carousel container
			$( "a", this ).bind( "click", function( e ){
				var slideID = $( this ).attr( "href" );
				if( slideID.indexOf( "#" ) === -1 ){
					// only local anchor links
					return;
				}
				e.preventDefault();
				var $slide = $( slideID, self );
				goto( $slider[ 0 ], $slide[ 0 ].offsetLeft );
				if( "pushState" in w.history ){
					w.history.pushState( {}, document.title, slideID );
				}
			});

			// apply snapping after scroll, in browsers that don't support CSS scroll-snap
			function polyfillSnap(){
				function snapScroll(){
					var currScroll = $slider[ 0 ].scrollLeft;
					var width = $itemsContain.width();
					var itemWidth = $items.eq(0).width();
					var numItems = $items.length;
					var roundedScroll = Math.round(currScroll/itemWidth)*itemWidth;
					if( roundedScroll > width ){
						roundedScroll = width;
					}
					if( roundedScroll !== currScroll ){
						goto( $slider[ 0 ], roundedScroll );
					}
				}

				var scrollStop;
				$slider.bind( "scroll", function(){
					if( scrollStop ){
						clearTimeout( scrollStop );
					}
					scrollStop = setTimeout( snapScroll, 50 );
				});
			}

			// polyfill if unsupported
			if( !snapSupported ){
				polyfillSnap();
			}
		});
	};

	// auto-init
	$( document ).bind( "enhance", function( e ){
		$( "." + pluginName, e.target ).add( e.target ).filter( "." + pluginName )[ pluginName ]();
	});
}( this, jQuery ));