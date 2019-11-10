/* snapper css snap points carousel */
;(function( w, $ ){
	var pluginName = "snapper";
	$.fn[ pluginName ] = function(){
		// css snap points feature test.
		// even if this test passes, several behaviors will still be polyfilled, such as snapping after resize, and animated advancing of slides with anchor links or next/prev links
		var testProp = "scroll-snap-type";
		var snapSupported = w.CSS && w.CSS.supports && ( w.CSS.supports( testProp, "mandatory") || w.CSS.supports("-webkit-" + testProp, "mandatory")  || w.CSS.supports("-ms-" + testProp, "mandatory") );

		// get the snapper_item elements whose left offsets fall within the scroll pane. Returns a wrapped array.
		function itemsAtOffset( elem, offset ){
			var $childNodes = $( elem ).find( "." + pluginName + "_item" );
			var containWidth = $( elem ).width();
			var activeItems = [];

			$childNodes.each(function( i ){
				if( this.offsetLeft >= offset - 5 && this.offsetLeft < offset + containWidth - 5 ){
					activeItems.push( this );
				}
			});
			return $( activeItems );
		}

		function outerWidth( $elem ){
			return $elem.width() + parseFloat( $elem.css( "margin-left" ) ) + parseFloat( $elem.css( "margin-right" ) );
		}


		// snapEvent dispatches the "snapper.snap" event.
		// The snapper_item elements with left offsets that are inside the scroll viewport are listed in an array in the second callback argument's activeSlides property.
		// use like this: $( ".snapper" ).bind( "snapper.snap", function( event, data ){ console.log( data.activeSlides );  } );
		function snapEvent( elem, x ){
			var activeSlides = itemsAtOffset( elem, x );
			$( elem ).trigger( pluginName + ".snap", { activeSlides: activeSlides } );
		}

		// optional: include overthrow.toss() in your page to get a smooth scroll, otherwise it'll just jump to the slide
		function goto( elem, x, nothrow ){
			snapEvent( elem, x );
			if( typeof w.overthrow !== "undefined" && !nothrow ){
				w.overthrow.toss( elem, { left: x } );
			}
			else {
				elem.scrollLeft = x;
			}
		}

		// Loop through snapper elements and enhance/bind events
		return this.each(function(){
			var self = this;
			var addNextPrev = $( self ).is( "[data-" + pluginName + "-nextprev]" );
			var $slider = $( "." + pluginName + "_pane", self );
			var enhancedClass = pluginName + "-enhanced";
			var $itemsContain = $slider.find( "." + pluginName + "_items" );
			var $items = $itemsContain.children();
			$items.addClass( pluginName + "_item" );
			var numItems = $items.length;
			var $nav = $( "." + pluginName + "_nav", self );
			var navSelectedClass = pluginName + "_nav_item-selected";

			// this function updates the widths of the items within the slider, and their container.
			// It factors in margins and converts those to values that make sense when all items are placed in a long row
			function updateWidths(){
				var itemsContainStyle = $itemsContain.attr( "style" );
				$itemsContain.attr( "style", "" );
				var itemStyle = $items.eq(0).attr( "style" );
				$items.eq(0).attr( "style", "" );
				var sliderWidth = $slider.width();
				var itemWidth = $items.eq(0).width();
				var computed = w.getComputedStyle( $items[ 0 ], null );
				var itemLeftMargin = parseFloat( computed.getPropertyValue( "margin-left" ) );
				var itemRightMargin = parseFloat( computed.getPropertyValue( "margin-right" ) );
				$items.eq(0).attr( "style", itemStyle );
				$itemsContain.attr( "style", itemsContainStyle );
				var iPercentWidth = itemWidth / sliderWidth * 100;
				var iPercentRightMargin = itemRightMargin / sliderWidth * 100;
				var iPercentLeftMargin = itemLeftMargin / sliderWidth * 100;
				var outerPercentWidth = iPercentWidth + iPercentLeftMargin + iPercentRightMargin;
				var percentAsWidth = iPercentWidth / outerPercentWidth;
				var percentAsRightMargin = iPercentRightMargin / outerPercentWidth;
				var percentAsLeftMargin = iPercentLeftMargin / outerPercentWidth;
				$itemsContain.css( "width", Math.ceil(numItems * outerPercentWidth) + "%" );
				$items.css( "width", 100 / numItems * percentAsWidth + "%" );
				$items.css( "margin-left", 100 / numItems * percentAsLeftMargin + "%" );
				$items.css( "margin-right", 100 / numItems * percentAsRightMargin + "%" );
			}

			updateWidths();
			$( self ).addClass( enhancedClass );

			// if the nextprev option is set, add the nextprev nav
			if( addNextPrev ){
				var	$nextprev = $( '<ul class="snapper_nextprev"><li class="snapper_nextprev_item"><a href="#prev" class="snapper_nextprev_prev">Prev</a></li><li class="snapper_nextprev_item"><a href="#next" class="snapper_nextprev_next">Next</a></li></ul>' );
				var $nextprevContain = $( ".snapper_nextprev_contain", self );
				if( !$nextprevContain.length ){
					$nextprevContain = $( self );
				}
				$nextprev.appendTo( $nextprevContain );
			}

			// This click binding will allow deep-linking to slides without causing the page to scroll to the carousel container
			// this also supports click handling for generated next/prev links
			$( "a", this ).bind( "click", function( e ){
				var slideID = $( this ).attr( "href" );
				if( slideID.indexOf( "#" ) === -1 ){
					// only local anchor links
					return;
				}
				e.preventDefault();
				if( $( this ).is( ".snapper_nextprev_next" ) ){
					return arrowNavigate( true );
				}
				else if( $( this ).is( ".snapper_nextprev_prev" ) ){
					return arrowNavigate( false );
				}
				else {
					var $slide = $( slideID, self );
					goto( $slider[ 0 ], $slide[ 0 ].offsetLeft );
					if( "replaceState" in w.history ){
						w.history.replaceState( {}, document.title, slideID );
					}
				}
			});

			// arrow key bindings for next/prev
			$( this )
				.attr( "tabindex", "0" )
				.bind( "keyup", function( e ){
					if( e.keyCode === 37 || e.keyCode === 38 ){
						e.preventDefault();
						arrowNavigate( false );
					}
					if( e.keyCode === 39 || e.keyCode === 40 ){
						e.preventDefault();
						arrowNavigate( true );
					}
				} );

			// snap to nearest slide. Useful after a scroll stops, for polyfilling snap points
			function snapScroll(){
				var currScroll = $slider[ 0 ].scrollLeft;
				var width = $itemsContain.width();
				var itemWidth = $items[ 1 ] ? $items[ 1 ].offsetLeft : outerWidth( $items.eq( 0 ) );
				var roundedScroll = Math.round(currScroll/itemWidth)*itemWidth;
				var maxScroll = width - $slider.width();
				if( roundedScroll > maxScroll ){
					roundedScroll = maxScroll;
				}
				if( currScroll !== roundedScroll ){
					if( snapSupported ){
						snapEvent( $slider[ 0 ], roundedScroll );
					}
					else {
						goto( $slider[ 0 ], roundedScroll );
					}
				}
			}

			// retain snapping on resize (necessary even in scroll-snap supporting browsers currently, unfortunately)
			var startSlide;
			var afterResize;
			function snapStay(){
				var currScroll = $slider[ 0 ].scrollLeft;
				var numItems = $items.length;
				var width = $itemsContain.width();
				if( startSlide === undefined ){
					startSlide = Math.round( currScroll / width * numItems );
				}
				if( afterResize ){
					clearTimeout( afterResize );
				}
				afterResize = setTimeout( function(){
					updateWidths();
					goto( $slider[ 0 ], $items[ startSlide ].offsetLeft, true );
					startSlide = afterResize = undefined;
				}, 50 );
			}
			$( w ).bind( "resize", snapStay );

			// next/prev links or arrows should loop back to the other end when an extreme is reached
			function arrowNavigate( forward ){
				var currScroll = $slider[ 0 ].scrollLeft;
				var width = $itemsContain.width();
				var itemWidth = outerWidth( $slider );
				var maxScroll = width - itemWidth - 5;
				if( forward ){
					if( currScroll >= maxScroll ){
						return first();
					}
					else {
						return next();
					}
				}
				else {
					if( currScroll === 0 ){
						return last();
					}
					else {
						return prev();
					}
				}
			}

			// advance slide one full scrollpane's width forward
			function next(){
				goto( $slider[ 0 ], $slider[ 0 ].scrollLeft + $slider.width() );
			}

			// advance slide one full scrollpane's width backwards
			function prev(){
				goto( $slider[ 0 ], $slider[ 0 ].scrollLeft - $slider.width() );
			}

			// go to first slide
			function first(){
				goto( $slider[ 0 ], 0 );
			}

			// go to last slide
			function last(){
				goto( $slider[ 0 ], $itemsContain.width() - $slider.width() );
			}

			// update thumbnail state on pane scroll
			if( $nav.length ){
				function activeItem(){
					var currScroll = $slider[ 0 ].scrollLeft;
					var width = outerWidth( $itemsContain );
					var activeIndex = Math.round( currScroll / width * numItems );
					$nav
						.children().removeClass( navSelectedClass )
						.eq( activeIndex )
						.addClass( navSelectedClass );
				}
				// set active item on scroll
				$slider.bind( "scroll", activeItem );
				// set active item on init
				activeItem();
			}

			// apply snapping after scroll, in browsers that don't support CSS scroll-snap
			var scrollStop;
			$slider.bind( "scroll", function(e){
				if( scrollStop ){
					clearTimeout( scrollStop );
				}
				scrollStop = setTimeout( snapScroll, 50 );
			});


		});
	};

	// auto-init on enhance
	$( document ).bind( "enhance", function( e ){
		$( "." + pluginName, e.target ).add( e.target ).filter( "." + pluginName )[ pluginName ]();
	});
}( this, jQuery ));
