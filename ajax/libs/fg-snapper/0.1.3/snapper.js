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
			var $nav = $( "." + pluginName + "_nav", self );
			var navSelectedClass = pluginName + "_nav_item-selected";

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
				if( "replaceState" in w.history ){
					w.history.replaceState( {}, document.title, slideID );
				}
			});


			// snap to nearest slide
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

			// retain snapping on resize (necessary even in scroll-snap supporting browsers, unfortunately)
			var startSlide;
			var afterResize;
			function snapStay(){
				var currScroll = $slider[ 0 ].scrollLeft;
				var width = $itemsContain.width();
				var numItems = $items.length;
				if( startSlide === undefined ){
					startSlide = Math.round(  ( currScroll / width * numItems ) );
				}
				if( afterResize ){
					clearTimeout( afterResize );
				}
				afterResize = setTimeout( function(){
					goto( $slider[ 0 ], $items[ startSlide ].offsetLeft );
					startSlide = afterResize = undefined;
				}, 300 );
			}
			$( w ).bind( "resize", snapStay );

			// update thumbnail state on pane scroll
			if( $nav.length ){
				function activeItem(){
					var currScroll = $slider[ 0 ].scrollLeft;
					var activeIndex;
					$items.each(function( i ){
						if( $items[ i ].offsetLeft === currScroll ){
							activeIndex = i;
						}
					});
					// update thumbnail class
					if( activeIndex ){
						$nav
							.children().removeClass( navSelectedClass )
							.eq( activeIndex )
							.addClass( navSelectedClass );
					}
				}
				$slider.bind( "scroll", activeItem );
			}

			// apply snapping after scroll, in browsers that don't support CSS scroll-snap
			function polyfillSnap(){
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
