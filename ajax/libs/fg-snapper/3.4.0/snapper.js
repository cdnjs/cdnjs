/* snapper css snap points carousel */
;(function( w, $ ){
	var pluginName = "snapper";
	$.fn[ pluginName ] = function(optionsOrMethod){
		var pluginArgs = arguments;
		var scrollListening = true;

		// css snap points feature test.
		// even if this test passes, several behaviors will still be polyfilled, such as snapping after resize, and animated advancing of slides with anchor links or next/prev links
		var testProp = "scroll-snap-type";
		// test latest spec first. then fallback older
		var snapSupported = w.CSS && w.CSS.supports && (w.CSS.supports(testProp, "x mandatory") || w.CSS.supports(testProp, "mandatory") || w.CSS.supports("-webkit-" + testProp, "mandatory") || w.CSS.supports("-ms-" + testProp, "mandatory") );

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

		function outerHeight( $elem ){
			return $elem.height() + parseFloat( $elem.css( "margin-bottom" ) ) + parseFloat( $elem.css( "margin-top" ) );
		}


		// snapEvent dispatches the "snapper.snap" event.
		// The snapper_item elements with left offsets that are inside the scroll viewport are listed in an array in the second callback argument's activeSlides property.
		// use like this: $( ".snapper" ).bind( "snapper.snap", function( event, data ){ console.log( data.activeSlides );	} );
		function snapEvent( elem, x, prefix ){
			prefix = prefix ? prefix + "-" : "";
			var activeSlides = itemsAtOffset( elem, x );
			$( elem ).trigger( pluginName + "." + prefix + "snap", { activeSlides: activeSlides } );
		}

		// optional: include toss() in your page to get a smooth scroll, otherwise it'll just jump to the slide
		function goto( elem, x, nothrow, callback ){
			scrollListening = false;
			$(elem).closest( "." + pluginName ).addClass(pluginName + "-sliding");
			snapEvent( elem, x );

			var after = function(){
				elem.scrollLeft = x;
				$(elem).closest( "." + pluginName ).removeClass( pluginName + "-looping" ).removeClass(pluginName + "-sliding")
				$( elem ).trigger( pluginName + ".after-goto", {
					activeSlides: itemsAtOffset( elem, x )
				});

				if( callback ){ callback(); };
				snapEvent( elem, x, "after" );
				scrollListening = true;
			};

			// backport to old toss for compat
			if( !w.toss && w.overthrow ){
				w.toss = w.overthrow.toss;
			}
			if( typeof w.toss !== "undefined" && !nothrow ){
				w.toss( elem, { left: x, finished: after });
			}
			else {
				elem.scrollLeft = x;
				after();
			}
		}


		var result, innerResult;

		// Loop through snapper elements and enhance/bind events
		result = this.each(function(){
			if( innerResult !== undefined ){
				return;
			}

			var self = this;
			var $self = $( self );
			var addNextPrev = $self.is( "[data-" + pluginName + "-nextprev]" );
			var autoTimeout;
			var $slider = $( "." + pluginName + "_pane", self );
			var enhancedClass = pluginName + "-enhanced";
			var $itemsContain = $slider.find( "." + pluginName + "_items" );
			var $items = $itemsContain.children();
			$items.addClass( pluginName + "_item" );
			var numItems = $items.length;
			var $nav = $( "." + pluginName + "_nav", self );
			var navSelectedClass = pluginName + "_nav_item-selected";
			var useDeepLinking = $self.attr( "data-snapper-deeplinking" ) !== "false";

			if( typeof optionsOrMethod === "string" ){
				var args = Array.prototype.slice.call(pluginArgs, 1);
				var index;
				var itemWidth = ( $itemsContain.width() / numItems );

				switch(optionsOrMethod) {
				case "goto":
					index = args[0] % numItems;

					// width / items * index to make sure it goes
					offset = itemWidth * index;
					goto( $slider[ 0 ], offset, false, function(){
						// snap the scroll to the right position
						snapScroll();

						// invoke the callback if it was supplied
						if( typeof args[1] === "function" ){
							args[1]();
						}
					});
					break;
				case "getIndex":
					// NOTE make the scroll left value large enough to overcome
					// subpixel widths
					innerResult = Math.floor(($slider[ 0 ].scrollLeft + 1)/ itemWidth);
					break;
				case "updateWidths":
					updateWidths();
					break;
				}

				return;
			}

			// avoid double enhance activities
			if( $self.attr("data-" + pluginName + "-enhanced") ) {
				return;
			}

			// NOTE all state manipulation has to come after method invocation to
			// avoid monkeying with the DOM when it's unwarranted
			var $navInner = $nav.find( "." + pluginName + "_nav_inner" );
			if( !$navInner.length ){
				$navInner = $( '<div class="'+ pluginName + '_nav_inner"></div>' ).append( $nav.children() ).appendTo( $nav );
			}

			// give the pane a tabindex for arrow key handling
			$slider.attr("tabindex", "0");

			function getAutoplayInterval() {
				var autoTiming = $self.attr( "data-autoplay" ) || $self.attr( "data-snapper-autoplay" );
				var parseError = false;

				if( autoTiming ) {
					try {
						autoTiming = parseInt(autoTiming, 10);
					} catch(e) {
						parseError = true;
					}

					// if NaN or there was an error throw an exception
					if( !autoTiming || parseError ) {
						var msg = "Snapper: `data-autoplay` must have an natural number value.";
						throw new Error(msg);
					}
				}

				return autoTiming;
			}

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
				var outerItemWidth = itemWidth + itemLeftMargin + itemRightMargin;
				$items.eq(0).attr( "style", itemStyle );
				$itemsContain.attr( "style", itemsContainStyle );
				var parentWidth = numItems / Math.round(sliderWidth / outerItemWidth) * 100;
				var iPercentWidth = itemWidth / sliderWidth * 100;
				var iPercentRightMargin = itemRightMargin / sliderWidth * 100;
				var iPercentLeftMargin = itemLeftMargin / sliderWidth * 100;
				var outerPercentWidth = iPercentWidth + iPercentLeftMargin + iPercentRightMargin;
				var percentAsWidth = iPercentWidth / outerPercentWidth;
				var percentAsRightMargin = iPercentRightMargin / outerPercentWidth;
				var percentAsLeftMargin = iPercentLeftMargin / outerPercentWidth;
				$itemsContain.css( "width", parentWidth + "%");
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
				clearTimeout(autoTimeout);
				var slideID = $( this ).attr( "href" );

				if( $( this ).is( ".snapper_nextprev_next" ) ){
					e.preventDefault();
					return arrowNavigate( true );
				}
				else if( $( this ).is( ".snapper_nextprev_prev" ) ){
					e.preventDefault();
					return arrowNavigate( false );
				}
				// internal links to slides
				else if( slideID.indexOf( "#" ) === 0 && slideID.length > 1 ){
					e.preventDefault();

					var $slide = $( slideID, self );
					if( $slide.length ){
						goto( $slider[ 0 ], $slide[ 0 ].offsetLeft );
						if( useDeepLinking && "replaceState" in w.history ){
							w.history.replaceState( {}, document.title, slideID );
						}
					}
				}
			});

			// arrow key bindings for next/prev
			$( this )
				.bind( "keydown", function( e ){
					if( e.keyCode === 37 || e.keyCode === 38 ){
						clearTimeout(autoTimeout);
						e.preventDefault();
						e.stopImmediatePropagation();
						arrowNavigate( false );
					}
					if( e.keyCode === 39 || e.keyCode === 40 ){
						clearTimeout(autoTimeout);
						e.preventDefault();
						e.stopImmediatePropagation();
						arrowNavigate( true );
					}
				} );

			var snapScrollCancelled = false;

			// snap to nearest slide. Useful after a scroll stops, for polyfilling snap points
			function snapScroll(){
				if(isTouched){
					snapScrollCancelled = true;
					return;
				}

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
						snapEvent( $slider[ 0 ], roundedScroll, "after" );
					}
					else {
						goto( $slider[ 0 ], roundedScroll );
					}
				}

				snapScrollCancelled = false;
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
						$self.addClass( pluginName + "-looping" );
						return first();
					}
					else {
						return next();
					}
				}
				else {
					if( currScroll === 0 ){
						$self.addClass( pluginName + "-looping" );
						return last();
					}
					else {
						return prev();
					}
				}
			}

			// advance slide one full scrollpane's width forward
			function next(){
				goto( $slider[ 0 ], $slider[ 0 ].scrollLeft + ( $itemsContain.width() / numItems ), false, function(){
					$slider.trigger( pluginName + ".after-next" );
				});
			}

			// advance slide one full scrollpane's width backwards
			function prev(){
				goto( $slider[ 0 ], $slider[ 0 ].scrollLeft - ( $itemsContain.width() / numItems ), false, function(){
					$slider.trigger( pluginName + ".after-prev" );
				});
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
				// function for scrolling to the xy of the active thumbnail
				function scrollNav(elem, x, y){
					if( typeof w.toss !== "undefined" ){
						w.toss( elem, { left: x, top:y });
					}
					else {
						elem.scrollLeft = x;
						elem.scrollTop = y;
					}
				}
				var lastActiveItem;
				function activeItem( force ){
					var currTime = new Date().getTime();
					if( !force && lastActiveItem && currTime - lastActiveItem < 200 ){
						return;
					}
					lastActiveItem = currTime;
					var currScroll = $slider[ 0 ].scrollLeft;
					var width = outerWidth( $itemsContain );
					var navWidth = outerWidth( $nav );
					var navHeight = outerHeight( $nav );
					var activeIndex = Math.round( currScroll / width * numItems ) || 0;
					var childs = $nav.find( "a" ).removeClass( navSelectedClass );
					var activeChild = childs.eq( activeIndex ).addClass( navSelectedClass );

					var thumbX = activeChild[ 0 ].offsetLeft - (navWidth/2);
					var thumbY = activeChild[ 0 ].offsetTop - (navHeight/2);

					scrollNav( $navInner[ 0 ], thumbX, thumbY );
				}

				// set active item on init
				activeItem();

				$slider.bind( "scroll", activeItem );
			}

			// apply snapping after scroll, in browsers that don't support CSS scroll-snap
			var scrollStop;
			var scrolling;
			var lastScroll = 0;


			$slider.bind( "scroll", function(e){
				lastScroll = new Date().getTime();
				scrolling = true;
			});

			setInterval(function(){
				if( scrolling && lastScroll <= new Date().getTime() - 150) {
					snapScroll();
					if( activeItem ){
						activeItem( true );
					}
					scrolling = false;
				}
			}, 150);

			var isTouched = false;

			// if a touch event is fired on the snapper we know the user is trying to
			// interact with it and we should disable the auto play
			$slider.bind("touchstart", function(){
				clearTimeout(autoTimeout);

				isTouched = true;
			});

			$slider.bind("touchend", function(){
				isTouched = false;

				if(snapScrollCancelled && !scrolling){
					snapScroll();
					scrolling = false;
				}
			});

			// if the `data-autoplay` attribute is assigned a natural number value
			// use it to make the slides cycle until there is a user interaction
			function autoplay( autoTiming ) {
				if( autoTiming ){
					// autoTimeout is cleared in each user interaction binding
					autoTimeout = setTimeout(function(){
						var timeout = getAutoplayInterval();
						if( timeout ) {
							arrowNavigate(true);
							autoplay( timeout );
						}
					}, autoTiming);
				}
			}

			autoplay( getAutoplayInterval() );
			$self.attr("data-" + pluginName + "-enhanced", true);
		});

		return (innerResult !== undefined ? innerResult : result);
	};
}( this, jQuery ));
