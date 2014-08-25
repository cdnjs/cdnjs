/*! Swipebox v1.2.9 | Constantin Saguin csag.co | MIT License | github.com/brutaldesign/swipebox */

;( function ( window, document, $, undefined ) {

	$.swipebox = function( elem, options ) {

		// Default options
		var ui,
			defaults = {
				useCSS : true,
				useSVG : true,
				initialIndexOnArray : 0,
				closeBySwipe: true,
				hideBarsOnMobile : true,
				hideBarsDelay : 3000,
				videoMaxWidth : 1140,
				vimeoColor : 'CCCCCC',
				beforeOpen: null,
				afterOpen: null,
				afterClose: null,
                loopAtEnd: false
			},
			
			plugin = this,
			elements = [], // slides array [ { href:'...', title:'...' }, ...],
			$elem,
			selector = elem.selector,
			$selector = $( selector ),
			isMobile = navigator.userAgent.match( /(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i ),
			isTouch = isMobile !== null || document.createTouch !== undefined || ( 'ontouchstart' in window ) || ( 'onmsgesturechange' in window ) || navigator.msMaxTouchPoints,
			supportSVG = !! document.createElementNS && !! document.createElementNS( 'http://www.w3.org/2000/svg', 'svg').createSVGRect,
			winWidth = window.innerWidth ? window.innerWidth : $( window ).width(),
			winHeight = window.innerHeight ? window.innerHeight : $( window ).height(),
			/* jshint multistr: true */
			html = '<div id="swipebox-overlay">\
					<div id="swipebox-slider"></div>\
					<div id="swipebox-caption"></div>\
					<div id="swipebox-action">\
						<a id="swipebox-close"></a>\
						<a id="swipebox-prev"></a>\
						<a id="swipebox-next"></a>\
					</div>\
			</div>';

		plugin.settings = {};
        
        $.swipebox.close = function (){
            ui.closeSlide();  
        };
        
        $.swipebox.extend = function (){
            return ui;   
        }

		plugin.init = function() {

			plugin.settings = $.extend( {}, defaults, options );

			if ( $.isArray( elem ) ) {

				elements = elem;
				ui.target = $( window );
				ui.init( plugin.settings.initialIndexOnArray );

			} else {

				$( document ).on( 'click', selector, function( event ) {

					// console.log( isTouch );

					if ( event.target.parentNode.className === 'slide current' ) {

						return false;

					}
					
					if ( ! $.isArray( elem ) ) {
						ui.destroy();
						$elem = $( selector );
						ui.actions();
					}
					
					elements = [];
					var index , relType, relVal;

					// Allow for HTML5 compliant attribute before legacy use of rel
					if ( ! relVal ) {
						relType = 'data-rel';
						relVal  = $( this ).attr( relType );
					}

					if ( ! relVal ) {
						relType = 'rel';
						relVal = $( this ).attr( relType );
					}

					if ( relVal && relVal !== '' && relVal !== 'nofollow' ) {
						$elem = $selector.filter( '[' + relType + '="' + relVal + '"]' );
					} else {
						$elem = $( selector );
					}

					$elem.each( function() {

						var title = null,
							href = null;
						
						if ( $( this ).attr( 'title' ) ) {
							title = $( this ).attr( 'title' );
						}
							

						if ( $( this ).attr( 'href' ) ) {
							href = $( this ).attr( 'href' );
						}
							
						elements.push( {
							href: href,
							title: title
						} );
					} );

					index = $elem.index( $( this ) );
					event.preventDefault();
					event.stopPropagation();
					ui.target = $( event.target );
					ui.init( index );
				} );
			}
		};

		ui = {

			/**
			 * Initiate Swipebox
			 */
			init : function( index ) {
				if ( plugin.settings.beforeOpen ) {
					plugin.settings.beforeOpen();
				}
				this.target.trigger( 'swipebox-start' );
				$.swipebox.isOpen = true;
				this.build();
				this.openSlide( index );
				this.openMedia( index );
				this.preloadMedia( index+1 );
				this.preloadMedia( index-1 );
				if ( plugin.settings.afterOpen ) {
					plugin.settings.afterOpen();
				}
			},

			/**
			 * Built HTML containers and fire main functions
			 */
			build : function () {
				var $this = this, bg;

				$( 'body' ).append( html );
								
				if ( $this.doCssTrans() ) {
					$( '#swipebox-slider' ).css( {
						'-webkit-transition' : 'left 0.4s ease',
						'-moz-transition' : 'left 0.4s ease',
						'-o-transition' : 'left 0.4s ease',
						'-khtml-transition' : 'left 0.4s ease',
						'transition' : 'left 0.4s ease'
					} );
					$( '#swipebox-overlay' ).css( {
						'-webkit-transition' : 'opacity 1s ease',
						'-moz-transition' : 'opacity 1s ease',
						'-o-transition' : 'opacity 1s ease',
						'-khtml-transition' : 'opacity 1s ease',
						'transition' : 'opacity 1s ease'
					} );
					$( '#swipebox-action, #swipebox-caption' ).css( {
						'-webkit-transition' : '0.5s',
						'-moz-transition' : '0.5s',
						'-o-transition' : '0.5s',
						'-khtml-transition' : '0.5s',
						'transition' : '0.5s'
					} );
				}

				if ( supportSVG && plugin.settings.useSVG === true ) {
					bg = $( '#swipebox-action #swipebox-close' ).css( 'background-image' );
					bg = bg.replace( 'png', 'svg' );
					$( '#swipebox-action #swipebox-prev,#swipebox-action #swipebox-next,#swipebox-action #swipebox-close' ).css( {
						'background-image' : bg
					} );
				}

				if ( isMobile && plugin.settings.hideBarsOnMobile === true ) {
					$( '#swipebox-action, #swipebox-caption' ).hide();
				}
				
				$.each( elements,  function() {
					$( '#swipebox-slider' ).append( '<div class="slide"></div>' );
				} );

				$this.setDim();
				$this.actions();
				
				if ( isTouch ) {
					$this.gesture();
				}
				
				// Devices can have both touch and keyboard input so always allow key events
				$this.keyboard();
				
				$this.animBars();
				$this.resize();
				
			},

			/**
			 * Set dimensions depending on windows width and height
			 */
			setDim : function () {

				var width, height, sliderCss = {};
				
				// Reset dimensions on mobile orientation change
				if ( 'onorientationchange' in window ) {

					window.addEventListener( 'orientationchange', function() {
						if ( window.orientation === 0 ) {
							width = winWidth;
							height = winHeight;
						} else if ( window.orientation === 90 || window.orientation === -90 ) {
							width = winHeight;
							height = winWidth;
						}
					}, false );
					
				
				} else {

					width = window.innerWidth ? window.innerWidth : $( window ).width();
					height = window.innerHeight ? window.innerHeight : $( window ).height();
				}

				sliderCss = {
					width : width,
					height : height
				};

				$( '#swipebox-overlay' ).css( sliderCss );

			},

			/**
			 * Reset dimensions on window resize envent
			 */
			resize : function () {
				var $this = this;
				
				$( window ).resize( function() {
					$this.setDim();
				} ).resize();
			},

			/**
			 * Check if device supports CSS transitions
			 */
			supportTransition : function () {
				
				var prefixes = 'transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition'.split( ' ' ),
					i;
				
				for ( i = 0; i < prefixes.length; i++ ) {
					if ( document.createElement( 'div' ).style[ prefixes[i] ] !== undefined ) {
						return prefixes[i];
					}
				}
				return false;
			},

			/**
			 * Check if CSS transitions are allowed (options + devicesupport)
			 */
			doCssTrans : function () {
				if ( plugin.settings.useCSS && this.supportTransition() ) {
					return true;
				}
			},

			/**
			 * Touch navigation
			 */
			gesture : function () {
				
				var $this = this,
					distance = null,
					vDistance = null,
					vSwipe = false,
					swipMinDistance = 10,
					vSwipMinDistance = 50,
					startCoords = {},
					endCoords = {},

					bars = $( '#swipebox-caption, #swipebox-action' ),
					slider = $( '#swipebox-slider' );

				bars.addClass( 'visible-bars' );
				$this.setTimeout();

				$( 'body' ).bind( 'touchstart', function( event ) {

					$( this ).addClass( 'touching' );

					endCoords = event.originalEvent.targetTouches[0];
					startCoords.pageX = event.originalEvent.targetTouches[0].pageX;
					startCoords.pageY = event.originalEvent.targetTouches[0].pageY;

					$( '.touching' ).bind( 'touchmove',function( event ) {
						event.preventDefault();
						event.stopPropagation();
						endCoords = event.originalEvent.targetTouches[0];

						if ( plugin.settings.closeBySwipe ) {
							vDistance = endCoords.pageY - startCoords.pageY;
							if ( Math.abs( vDistance ) >= vSwipMinDistance || vSwipe ) {
								var opacity = 0.75 - Math.abs(vDistance) / slider.height();

								slider.css( { 'top': vDistance + 'px' } );
								slider.css( { 'opacity': opacity } );

								vSwipe = true;
							}
						}

					} );
	
					return false;

				} ).bind( 'touchend',function( event ) {
					event.preventDefault();
					event.stopPropagation();

					if ( plugin.settings.closeBySwipe ) {
						if ( slider.css( 'opacity' ) <= 0.5) {
							var vOffset = vDistance > 0 ? slider.height() : - slider.height();
							slider.animate( { top: vOffset + 'px', 'opacity': 0 },
								300,
								function () {
									$this.closeSlide();
								} );
						} else {
							slider.animate( { top: 0, 'opacity': 1 }, 300 );
						}

						if ( vSwipe ) {
							vSwipe = false;
							return;
						}
					}
				
					distance = endCoords.pageX - startCoords.pageX;
						
					if ( distance >= swipMinDistance ) {
						
						// swipeLeft
						$this.getPrev();
					
					} else if ( distance <= - swipMinDistance ) {
						
						// swipeRight
						$this.getNext();

					} else {
						// tap
						if ( ! bars.hasClass( 'visible-bars' ) ) {
							$this.showBars();
							$this.setTimeout();
						} else {
							$this.clearTimeout();
							$this.hideBars();
						}
					}

					$( '.touching' ).off( 'touchmove' ).removeClass( 'touching' );
						
				} );

			},

			/**
			 * Set timer to hide the action bars
			 */
			setTimeout: function () {
				if ( plugin.settings.hideBarsDelay > 0 ) {
					var $this = this;
					$this.clearTimeout();
					$this.timeout = window.setTimeout( function() {
							$this.hideBars();
						},
						
						plugin.settings.hideBarsDelay
					);
				}
			},
			
			/**
			 * Clear timer
			 */
			clearTimeout: function () {
				window.clearTimeout( this.timeout );
				this.timeout = null;
			},

			/**
			 * Show navigation and title bars
			 */
			showBars : function () {
				var bars = $( '#swipebox-caption, #swipebox-action' );
				if ( this.doCssTrans() ) {
					bars.addClass( 'visible-bars' );
				} else {
					$( '#swipebox-caption' ).animate( { top : 0 }, 500 );
					$( '#swipebox-action' ).animate( { bottom : 0 }, 500 );
					setTimeout( function() {
						bars.addClass( 'visible-bars' );
					}, 1000 );
				}
			},

			/**
			 * Hide navigation and title bars
			 */
			hideBars : function () {
				var bars = $( '#swipebox-caption, #swipebox-action' );
				if ( this.doCssTrans() ) {
					bars.removeClass( 'visible-bars' );
				} else {
					$( '#swipebox-caption' ).animate( { top : '-50px' }, 500 );
					$( '#swipebox-action' ).animate( { bottom : '-50px' }, 500 );
					setTimeout( function() {
						bars.removeClass( 'visible-bars' );
					}, 1000 );
				}
			},

			/**
			 * Animate navigation and top bars
			 */
			animBars : function () {
				var $this = this,
					bars = $( '#swipebox-caption, #swipebox-action' );
					
				bars.addClass( 'visible-bars' );
				$this.setTimeout();
				
				$( '#swipebox-slider' ).click( function() {
					if ( ! bars.hasClass( 'visible-bars' ) ) {
						$this.showBars();
						$this.setTimeout();
					}
				} );

				$( '#swipebox-action' ).hover( function() {
					$this.showBars();
					bars.addClass( 'visible-bars' );
					$this.clearTimeout();
				
					}, function() {
                        if (plugin.settings.hideBarsDelay > 0){
						bars.removeClass( 'visible-bars' );
						$this.setTimeout();
                        }

					} );

			},

			/**
			 * Keyboard navigation
			 */
			keyboard : function () {
				var $this = this;
				$( window ).bind( 'keyup', function( event ) {
					event.preventDefault();
					event.stopPropagation();
					
					if ( event.keyCode === 37 ) {
						
						$this.getPrev();
					
					} else if ( event.keyCode === 39 ) {
						
						$this.getNext();
					
					} else if ( event.keyCode === 27 ) {
						
						$this.closeSlide();
					
					}
				} );
			},

			/**
			 * Navigation events : go to next slide, go to prevous slide and close
			 */
			actions : function () {
				var $this = this,
					action = 'touchend click'; // Just detect for both event types to allow for multi-input
				
				if ( elements.length < 2 ) {
					
					$( '#swipebox-prev, #swipebox-next' ).hide();
				
				} else {
					$( '#swipebox-prev' ).bind( action, function( event ) {
						event.preventDefault();
						event.stopPropagation();
						$this.getPrev();
						$this.setTimeout();
					} );
					
					$( '#swipebox-next' ).bind( action, function( event ) {
						event.preventDefault();
						event.stopPropagation();
						$this.getNext();
						$this.setTimeout();
					} );
				}

				$( '#swipebox-close' ).bind( action, function() {
					$this.closeSlide();
				} );
			},
			
			/**
			 * Set current slide
			 */
			setSlide : function ( index, isFirst ) {
				isFirst = isFirst || false;
				
				var slider = $( '#swipebox-slider' );
				
				if ( this.doCssTrans() ) {
					slider.css( { left : ( -index*100 )+'%' } );
				} else {
					slider.animate( { left : ( -index*100 )+'%' } );
				}
				
				$( '#swipebox-slider .slide' ).removeClass( 'current' );
				$( '#swipebox-slider .slide' ).eq( index ).addClass( 'current' );
				this.setTitle( index );

				if ( isFirst ) {
					slider.fadeIn();
				}

				$( '#swipebox-prev, #swipebox-next' ).removeClass( 'disabled' );
				
				if ( index === 0 ) {
					$( '#swipebox-prev' ).addClass( 'disabled' );
				} else if ( index === elements.length - 1 && plugin.settings.loopAtEnd != true) {
					$( '#swipebox-next' ).addClass( 'disabled' );
				}
			},
		
			/**
			 * Open slide
			 */
			openSlide : function ( index ) {
				$( 'html' ).addClass( 'swipebox-html' );
				if ( isTouch ) {
					$( 'html' ).addClass( 'swipebox-touch' );
				}
				$( window ).trigger( 'resize' ); // fix scroll bar visibility on desktop
				this.setSlide( index, true );
			},
		
			/**
			 * Set a time out if the media is a video
			 */
			preloadMedia : function ( index ) {
				var $this = this,
					src = null;

				if ( elements[index] !== undefined ) {
					src = elements[index].href;
				}

				if ( ! $this.isVideo( src ) ) {
					setTimeout( function() {
						$this.openMedia( index );
					}, 1000);
				} else {
					$this.openMedia( index );
				}
			},
			
			/**
			 * Open
			 */
			openMedia : function ( index ) {
				var $this = this,
					src = null;

				if ( elements[index] !== undefined ) {
					src = elements[index].href;
				}

				if (index < 0 || index >= elements.length) {
					return false;
				}

				if ( ! $this.isVideo( src ) ) {
					$this.loadMedia( src, function() {
						$( '#swipebox-slider .slide' ).eq( index ).html( this );
					} );
				} else {
					$( '#swipebox-slider .slide' ).eq( index ).html( $this.getVideo( src ) );
				}
				
			},

			/**
			 * Set link title attribute as caption
			 */
			setTitle : function ( index ) {
				var title = null;

				$( '#swipebox-caption' ).empty();

				if ( elements[index] !== undefined ) {
					title = elements[index].title;
				}

				if ( title ) {
					$( '#swipebox-caption' ).append( title );
				}
			},

			/**
			 * Check if the URL is a video
			 */
			isVideo : function ( src ) {

				if ( src ) {
					if ( src.match( /youtube\.com\/watch\?v=([a-zA-Z0-9\-_]+)/) || src.match( /vimeo\.com\/([0-9]*)/ ) || src.match( /youtu\.be\/([a-zA-Z0-9\-_]+)/ ) ) {
						return true;
					}
                    
                    if (src.toLowerCase().indexOf( "swipeboxvideo=1" ) >= 0){
                        
                        return true;
                    }
				}
					
			},

			/**
			 * Get video iframe code from URL
			 */
			getVideo : function( url ) {
				var iframe = '',
					youtubeUrl = url.match( /watch\?v=([a-zA-Z0-9\-_]+)/ ),
					youtubeShortUrl = url.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/),
					vimeoUrl = url.match( /vimeo\.com\/([0-9]*)/ );
				if ( youtubeUrl || youtubeShortUrl) {
					if ( youtubeShortUrl ) {
						youtubeUrl = youtubeShortUrl;
					}
					iframe = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + youtubeUrl[1] + '" frameborder="0" allowfullscreen></iframe>';
				
				} else if ( vimeoUrl ) {

					iframe = '<iframe width="560" height="315"  src="//player.vimeo.com/video/' + vimeoUrl[1] + '?byline=0&amp;portrait=0&amp;color='+plugin.settings.vimeoColor+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
				
				}
                
                if (youtubeShortUrl || youtubeShortUrl || vimeoUrl){
                    
                } else {
                    iframe = '<iframe width="560" height="315" src="' + url + '" frameborder="0" allowfullscreen></iframe>';
                }

				return '<div class="swipebox-video-container" style="max-width:' + plugin.settings.videomaxWidth + 'px"><div class="swipebox-video">'+iframe+'</div></div>';
			},
			
			/**
			 * Load image
			 */
			loadMedia : function ( src, callback ) {
				if ( ! this.isVideo( src ) ) {
					var img = $( '<img>' ).on( 'load', function() {
						callback.call( img );
					} );

					img.attr( 'src', src );
				}
			},
			
			/**
			 * Get next slide
			 */
			getNext : function () {
				var $this = this,
					index = $( '#swipebox-slider .slide' ).index( $( '#swipebox-slider .slide.current' ) );
				if ( index+1 < elements.length ) {
                    var src = $( '#swipebox-slider .slide' ).eq(index).contents().find("iframe").attr("src");
                    $( '#swipebox-slider .slide' ).eq(index).contents().find("iframe").attr("src",src);
					index++;
					$this.setSlide( index );
					$this.preloadMedia( index+1 );
				} else {
					
                    if (plugin.settings.loopAtEnd === true){
                      var src = $( '#swipebox-slider .slide' ).eq(index).contents().find("iframe").attr("src");
                      $( '#swipebox-slider .slide' ).eq(index).contents().find("iframe").attr("src",src);
                      index = 0;
                      $this.preloadMedia( index );
                      $this.setSlide( index );
                      $this.preloadMedia( index + 1 );
                    } else {
					   $( '#swipebox-slider' ).addClass( 'rightSpring' );
					   setTimeout( function() {
						  $( '#swipebox-slider' ).removeClass( 'rightSpring' );
					   }, 500 );
                    }
				}
			},
			
			/**
			 * Get previous slide
			 */
			getPrev : function () {
				var index = $( '#swipebox-slider .slide' ).index( $( '#swipebox-slider .slide.current' ) );
				if ( index > 0 ) {
                    var src = $( '#swipebox-slider .slide' ).eq(index).contents().find("iframe").attr("src");
                    $( '#swipebox-slider .slide' ).eq(index).contents().find("iframe").attr("src",src);
					index--;
					this.setSlide( index );
					this.preloadMedia( index-1 );
				} else {
					   $( '#swipebox-slider' ).addClass( 'leftSpring' );
					      setTimeout( function() {
						  $( '#swipebox-slider' ).removeClass( 'leftSpring' );
					   }, 500 );
                    }
			},

			/**
			 * Close
			 */
			closeSlide : function () {
				$( 'html' ).removeClass( 'swipebox-html' );
				$( 'html' ).removeClass( 'swipebox-touch' );
				$( window ).trigger( 'resize' );
				this.destroy();
			},

			/**
			 * Destroy the whole thing
			 */
			destroy : function () {
				$( window ).unbind( 'keyup' );
				$( 'body' ).unbind( 'touchstart' );
				$( 'body' ).unbind( 'touchmove' );
				$( 'body' ).unbind( 'touchend' );
				$( '#swipebox-slider' ).unbind();
				$( '#swipebox-overlay' ).remove();
				
				if ( ! $.isArray( elem ) ) {
					elem.removeData( '_swipebox' );
				}
					
				if ( this.target ) {
					this.target.trigger( 'swipebox-destroy' );
				}
					
				$.swipebox.isOpen = false;
				
				if ( plugin.settings.afterClose ){
					plugin.settings.afterClose();
				}
			}
		};

		plugin.init();
		
	};

	$.fn.swipebox = function( options ) {

		if ( ! $.data( this, '_swipebox' ) ) {
			var swipebox = new $.swipebox( this, options );
			this.data( '_swipebox', swipebox );
		}
		return this.data( '_swipebox' );
	
	};

}( window, document, jQuery ) );
