/* snapper css snap points carousel */
;(function( w, $ ){
	var pluginName = "snapper";
	$.fn[ pluginName ] = function(){
		var testProp = "scroll-snap-type";
		var snapSupported = w.CSS && w.CSS.supports && ( w.CSS.supports( testProp, "mandatory") || w.CSS.supports("-webkit-" + testProp, "mandatory")  || w.CSS.supports("-ms-" + testProp, "mandatory") );

		function itemsAtOffset( elem, offset ){
			var $childNodes = $( elem ).find( "." + pluginName + "_item" );
			var containWidth = $( elem ).width();
			var activeItems = [];
			$childNodes.each(function( i ){
				if( this.offsetLeft >= offset && this.offsetLeft < offset + containWidth ){
					activeItems.push( this );
				}
			});
			return $( activeItems );
		}

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
				$itemsContain.css( "width", numItems * outerPercentWidth + "%" );
				$items.css( "width", 100 / numItems * percentAsWidth + "%" );
				$items.css( "margin-left", 100 / numItems * percentAsLeftMargin + "%" );
				$items.css( "margin-right", 100 / numItems * percentAsRightMargin + "%" );
			}

			updateWidths();
			$( self ).addClass( enhancedClass );


			if( addNextPrev ){
				var	$nextprev = $( '<ul class="snapper_nextprev"><li class="snapper_nextprev_item"><a href="#prev" class="snapper_nextprev_prev">Prev</a></li><li class="snapper_nextprev_item"><a href="#next" class="snapper_nextprev_next">Next</a></li></ul>' );
				$nextprev.appendTo( self );
			}

			// even if CSS snap is supported, this click binding will allow deep-linking to slides without causing the page to scroll to the carousel container
			$( "a", this ).bind( "click", function( e ){
				var slideID = $( this ).attr( "href" );
				var currScroll = $slider[ 0 ].scrollLeft;
				var width = $itemsContain.width();
				var itemWidth = $items.eq(0).outerWidth();

				if( $( this ).is( ".snapper_nextprev_next" ) ){
					e.preventDefault();
					if( currScroll === width - itemWidth ){
						return first();
					}
					else {
						return next();
					}
				}
				if( $( this ).is( ".snapper_nextprev_prev" ) ){
					e.preventDefault();
					if( currScroll === 0 ){
						return last();
					}
					else {
						return prev();
					}
				}
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
				var itemWidth = $items[ 1 ] ? $items[ 1 ].offsetLeft : $items.eq( 0 ).outerWidth();
				var roundedScroll = Math.round(currScroll/itemWidth)*itemWidth;
				if( roundedScroll > width ){
					roundedScroll = width;
				}
				if( roundedScroll !== currScroll ){
					if( snapSupported ){
						snapEvent( $slider[ 0 ], roundedScroll );
					}
					else {
						goto( $slider[ 0 ], roundedScroll );
					}
				}
			}

			// retain snapping on resize (necessary even in scroll-snap supporting browsers, unfortunately)
			var startSlide;
			var afterResize;
			function snapStay(){
				var currScroll = $slider[ 0 ].scrollLeft;
				var numItems = $items.length;
				var width = $itemsContain.width();
				if( startSlide === undefined ){
					startSlide = Math.round(  ( currScroll / width * numItems ) );
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

			function next(){
				goto( $slider[ 0 ], $slider[ 0 ].scrollLeft + $slider[ 0 ].offsetWidth );
			}

			function prev(){
				goto( $slider[ 0 ], $slider[ 0 ].scrollLeft - $slider[ 0 ].offsetWidth );
			}

			function first(){
				goto( $slider[ 0 ], 0 );
			}

			function last(){
				goto( $slider[ 0 ], $itemsContain.width() );
			}

			$( this )
				.attr( "tabindex", "0" )
				.bind( "keyup", function( e ){
					if( e.keyCode === 37 || e.keyCode === 38 ){
						e.preventDefault();
						prev();
					}
					if( e.keyCode === 39 || e.keyCode === 40 ){
						e.preventDefault();
						next();
					}
				} );

			// update thumbnail state on pane scroll
			if( $nav.length ){
				function activeItem(){
					var currScroll = $slider[ 0 ].scrollLeft;
					var width = $itemsContain.width();
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
			$slider.bind( "scroll", function(){
				if( scrollStop ){
					clearTimeout( scrollStop );
				}
				scrollStop = setTimeout( snapScroll, 50 );
			});


		});
	};

	// auto-init
	$( document ).bind( "enhance", function( e ){
		$( "." + pluginName, e.target ).add( e.target ).filter( "." + pluginName )[ pluginName ]();
	});
}( this, jQuery ));
